/**
 * 单一事实源 parity 测试（离线、确定性、用打包产物跑）。
 *
 * 目的：证明**打包后的 MCP server**（dist/index.js）的 search/top 排序结果
 * 与站点源码直跑（web/src/search.ts、src/feed/channel-policy.ts）**逐条一致**。
 * 这是「排序/搜索语义复用站点同一套逻辑」这条硬要求的可执行证据——
 * 只要有人偷偷在 MCP 侧另写一套排序，本测试立刻红。
 *
 * 客户端 = 官方 SDK（@modelcontextprotocol/sdk）的 Client + StdioClientTransport，
 * 与真实 MCP 客户端走完全相同的协议路径。
 *
 * 数据 = fixtures/feed.json（列表，无 detailCn）+ fixtures/details.json（详情表），
 * 经 GITTOK_FEED_FILE / GITTOK_DETAILS_FILE 注入，全程不联网。
 */

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE_FEED = path.join(__dirname, "fixtures", "feed.json");
const FIXTURE_DETAILS = path.join(__dirname, "fixtures", "details.json");
const DIST_ENTRY = path.join(__dirname, "..", "dist", "index.js");
const REPO_ROOT = path.join(__dirname, "..", "..");

/** 站点源码直跑（Node ≥ 22.6 类型剥离）——本测试的准绳 */
const { weightedSearch } = await import(
  pathToFileURL(path.join(REPO_ROOT, "web", "src", "search.ts")).href
);
const { hotChannel, funChannel, dailyChannel, channelPoolSize, zoneOf } =
  await import(
    pathToFileURL(path.join(REPO_ROOT, "src", "feed", "channel-policy.ts")).href
  );

const fixtureCards = JSON.parse(await readFile(FIXTURE_FEED, "utf8"));

async function withServer(env, fn) {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [DIST_ENTRY],
    env: { ...process.env, ...env },
    stderr: "pipe",
  });
  const client = new Client({ name: "parity-test", version: "1.0.0" });
  await client.connect(transport);
  try {
    return await fn(client);
  } finally {
    await client.close();
  }
}

/** 调 tool 并把文本内容 parse 回对象 */
async function callTool(client, name, args) {
  const res = await client.callTool({ name, arguments: args });
  const first = res.content?.[0];
  const text = first && first.type === "text" ? first.text : "";
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { _raw: text };
  }
  return { res, parsed };
}

const OFFLINE_ENV = {
  GITTOK_FEED_FILE: FIXTURE_FEED,
  GITTOK_DETAILS_FILE: FIXTURE_DETAILS,
};

test("tools/list 精确暴露 search / top / detail 三个工具", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    assert.deepEqual(names, ["detail", "search", "top"]);
    for (const t of tools) {
      assert.ok(t.description && t.description.length > 10, `${t.name} 缺描述`);
      assert.equal(t.inputSchema.type, "object");
    }
  });
});

test("top(sort=hot) 与站点 hotChannel 逐条一致（顺序 + pool）", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "top", { sort: "hot", limit: 6 });
    assert.equal(parsed.ok, true);
    const expected = hotChannel(fixtureCards).map((c) => c.repo);
    assert.deepEqual(
      parsed.results.map((r) => r.repo),
      expected.slice(0, 6),
      "hot 排序与站点 hotChannel 不一致",
    );
    assert.equal(parsed.pool, channelPoolSize("hot", fixtureCards));
  });
});

test("top(sort=fun) 与站点 funChannel 逐条一致", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "top", { sort: "fun", limit: 5 });
    const expected = funChannel(fixtureCards).map((c) => c.repo);
    assert.deepEqual(parsed.results.map((r) => r.repo), expected.slice(0, 5));
    assert.equal(parsed.pool, channelPoolSize("fun", fixtureCards));
  });
});

test("top(sort=daily) 与站点 dailyChannel 逐条一致", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "top", {
      sort: "daily",
      limit: 4,
    });
    const expected = dailyChannel(fixtureCards).map((c) => c.repo);
    assert.deepEqual(parsed.results.map((r) => r.repo), expected.slice(0, 4));
  });
});

test("top(zone=创意) 只含该分区卡，且顺序 = 站点函数在子集上的结果", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "top", {
      sort: "fun",
      zone: "创意",
      limit: 10,
    });
    assert.equal(parsed.zone, "创意");
    for (const r of parsed.results) assert.equal(r.zone, "创意");
    const subset = fixtureCards.filter((c) => zoneOf(c) === "创意");
    assert.deepEqual(
      parsed.results.map((r) => r.repo),
      funChannel(subset).map((c) => c.repo).slice(0, 10),
    );
    assert.equal(parsed.pool, subset.length);
  });
});

test("top 兼容旧 category 键（zone=learning → 资源）", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "top", {
      sort: "hot",
      zone: "learning",
      limit: 5,
    });
    assert.equal(parsed.zone, "资源");
    for (const r of parsed.results) assert.equal(r.zone, "资源");
  });
});

test("search 中文查询与站点 weightedSearch 逐条一致", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "search", {
      query: "数据库",
      limit: 10,
    });
    const expected = weightedSearch(fixtureCards, "数据库").results.map(
      (c) => c.repo,
    );
    assert.ok(expected.length > 0, "夹具应至少命中一张中文卡");
    assert.deepEqual(parsed.results.map((r) => r.repo), expected);
    assert.equal(parsed.meta.sourceName, "file");
  });
});

test("search 宽松键（next js ⇔ next.js ⇔ next_js）与站点一致且仓库名优先", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const forAscii = await callTool(client, "search", {
      query: "next js",
      limit: 10,
    });
    const expected = weightedSearch(fixtureCards, "next js").results.map(
      (c) => c.repo,
    );
    assert.deepEqual(forAscii.parsed.results.map((r) => r.repo), expected);
    // 名字层断层权重：首条必须是名字命中者
    assert.ok(
      forAscii.parsed.results[0].repo.includes("next"),
      "首条应为名字命中",
    );
  });
});

test("search 空查询 → 结构化错误（不抛裸异常）", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { res, parsed } = await callTool(client, "search", { query: "   " });
    assert.equal(res.isError, true);
    assert.equal(parsed.reason, "empty_query");
    assert.ok(parsed.hint);
  });
});

test("search 无结果 → ok:true + 空列表 + note（不是错误）", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { res, parsed } = await callTool(client, "search", {
      query: "zzz-no-such-thing-xyz",
    });
    assert.notEqual(res.isError, true);
    assert.deepEqual(parsed.results, []);
    assert.ok(parsed.note);
  });
});

test("search limit 上限截断到站点上限 60", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "search", {
      query: "a",
      limit: 500,
    });
    assert.ok(parsed.returned <= 60);
    assert.equal(parsed.siteMaxResults, 60);
  });
});

test("detail 命中 → 完整卡片 + detailCn 来自详情表（mergeDetail 协议）", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "detail", {
      repo: "acme/awesome-db",
    });
    assert.equal(parsed.found, true);
    assert.equal(parsed.card.repo, "acme/awesome-db");
    assert.equal(parsed.detailSource, "details-table");
    assert.ok(parsed.card.detailCn.startsWith("awesome-db 的完整长文详情"));
    // 完整卡片应带列表没有的长文与全字段
    assert.equal(parsed.card.stars, 12000);
  });
});

test("detail 大小写不敏感命中", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { parsed } = await callTool(client, "detail", {
      repo: "ACME/Next-JS-Toolkit",
    });
    assert.equal(parsed.found, true);
    assert.equal(parsed.card.repo, "acme/next-js-toolkit");
  });
});

test("detail repo 不存在 → ok:true + found:false + 近似建议", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { res, parsed } = await callTool(client, "detail", {
      repo: "acme/pixl-pet",
    });
    assert.notEqual(res.isError, true);
    assert.equal(parsed.found, false);
    assert.ok(Array.isArray(parsed.suggestions));
  });
});

test("detail 空 repo → 结构化错误", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { res, parsed } = await callTool(client, "detail", { repo: "" });
    assert.equal(res.isError, true);
    assert.equal(parsed.reason, "empty_repo");
  });
});

test("top 非法 sort → 明确拒绝（isError + 输入校验消息），且 server 不崩", async () => {
  await withServer(OFFLINE_ENV, async (client) => {
    const { res, parsed } = await callTool(client, "top", { sort: "bogus" });
    assert.equal(res.isError, true);
    assert.match(
      parsed._raw ?? "",
      /validation error|Invalid enum value|Input validation/i,
      "非法 enum 应由输入校验明确拒绝",
    );
    const after = await callTool(client, "top", { sort: "hot", limit: 2 });
    assert.equal(after.parsed.ok, true);
  });
});

test("数据源不可用 → 结构化 feed_unavailable，而不是裸异常/挂死", async () => {
  await withServer(
    {
      GITTOK_FEED_URL: "http://127.0.0.1:9/definitely-not-listening.json",
      GITTOK_TIMEOUT_MS: "2000",
    },
    async (client) => {
      const { res, parsed } = await callTool(client, "top", { sort: "hot" });
      assert.equal(res.isError, true);
      assert.equal(parsed.reason, "feed_unavailable");
      assert.ok(parsed.hint.includes("GITTOK_FEED_FILE"));
    },
  );
});
