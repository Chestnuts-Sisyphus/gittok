/**
 * 线上 e2e：真实 MCP 客户端（官方 SDK）↔ 打包产物 dist/index.js ↔ 线上 GitTok feed。
 *
 * 与 parity.test.mjs 的分工：parity 判「语义是否与站点一致」（离线、确定性）；
 * 本脚本判「线上跑得通、数据是真的、边界都有明确返回」并**落盘留证**。
 *
 * 运行：npm run test:live   （产出 test/e2e-live-output.txt）
 */

import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_ENTRY = path.join(__dirname, "..", "dist", "index.js");
const OUT_FILE = path.join(__dirname, "e2e-live-output.txt");

const lines = [];
const say = (s) => {
  lines.push(s);
  process.stdout.write(`${s}\n`);
};

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [DIST_ENTRY],
  env: { ...process.env },
  stderr: "pipe",
});
const client = new Client({ name: "gittok-e2e-live", version: "1.0.0" });

async function call(name, args) {
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

function clip(obj, n = 240) {
  return JSON.stringify(obj).slice(0, n);
}

let failures = 0;
async function check(label, fn) {
  try {
    await fn();
    say(`PASS  ${label}`);
  } catch (err) {
    failures++;
    say(`FAIL  ${label} :: ${err.message}`);
  }
}

await client.connect(transport);
say(`# GitTok MCP 线上 e2e 留证`);
say(`# 时间：${new Date().toISOString()}`);
say(`# 入口：node ${path.relative(path.join(__dirname, "..", ".."), DIST_ENTRY)}`);
say("");

// 1. tools/list
const { tools } = await client.listTools();
say(`## tools/list → ${tools.map((t) => t.name).join(", ")}`);
say("");
await check("tools/list 恰好三个工具且名为 search/top/detail", () => {
  assert.deepEqual(
    tools.map((t) => t.name).sort(),
    ["detail", "search", "top"],
  );
});

// 2. search 中文
const s1 = await call("search", { query: "绘图", limit: 5 });
say(`## search(query="绘图", limit=5)`);
say(clip(s1.parsed, 700));
say("");
await check("search 中文命中非空且全库张数 ≥2000", () => {
  assert.equal(s1.parsed.ok, true);
  assert.ok(s1.parsed.results.length > 0);
  assert.ok(s1.parsed.meta.total >= 2000, `total=${s1.parsed.meta.total}`);
});

// 3. search 英文
const s2 = await call("search", { query: "vector database", limit: 3 });
say(`## search(query="vector database", limit=3) → ${s2.parsed.results?.map((r) => r.repo).join(", ")}`);
say("");

// 4. top hot
const t1 = await call("top", { sort: "hot", limit: 5 });
say(`## top(sort=hot, limit=5)  pool=${t1.parsed.pool}`);
say(clip(t1.parsed.results?.map((r) => ({ rank: r.rank, repo: r.repo, starGrowth: r.starGrowth, zone: r.zone })), 600));
say("");
await check("top(hot) 热门池 ≥300 且返回 5 条带 rank", () => {
  assert.equal(t1.parsed.ok, true);
  assert.ok(t1.parsed.pool >= 300, `pool=${t1.parsed.pool}`);
  assert.equal(t1.parsed.results.length, 5);
  assert.deepEqual(
    t1.parsed.results.map((r) => r.rank),
    [1, 2, 3, 4, 5],
  );
});

// 5. top fun
const t2 = await call("top", { sort: "fun", limit: 3 });
say(`## top(sort=fun, limit=3)  pool=${t2.parsed.pool} → ${t2.parsed.results?.map((r) => r.repo).join(", ")}`);
say("");

// 6. top daily
const t3 = await call("top", { sort: "daily", limit: 3 });
say(`## top(sort=daily, limit=3)  pool=${t3.parsed.pool} → ${t3.parsed.results?.map((r) => r.repo).join(", ")}`);
say("");

// 7. top zone
const t4 = await call("top", { sort: "hot", zone: "创意", limit: 3 });
say(`## top(sort=hot, zone=创意, limit=3)  pool=${t4.parsed.pool} → ${t4.parsed.results?.map((r) => r.repo).join(", ")}`);
say("");
await check("top(zone=创意) 结果全为该分区", () => {
  assert.equal(t4.parsed.zone, "创意");
  assert.ok(t4.parsed.results.length > 0);
  for (const r of t4.parsed.results) assert.equal(r.zone, "创意");
});

// 8. detail 命中
const d1 = await call("detail", { repo: "huggingface/transformers" });
say(`## detail(repo="huggingface/transformers")`);
say(
  clip({
    ok: d1.parsed.ok,
    found: d1.parsed.found,
    detailSource: d1.parsed.detailSource,
    detailCnLen: d1.parsed.card?.detailCn?.length,
    summaryCn: d1.parsed.card?.summaryCn,
    stars: d1.parsed.card?.stars,
    zone: d1.parsed.card?.zone,
  }),
);
say("");
await check("detail 命中完整卡片且含 detailCn 长文", () => {
  assert.equal(d1.parsed.found, true);
  assert.ok((d1.parsed.card?.detailCn?.length ?? 0) > 100, "detailCn 长度应 >100");
});

// 9. detail 不存在
const d2 = await call("detail", { repo: "not/a-real-repo-xyz" });
say(`## detail(repo="not/a-real-repo-xyz") → found=${d2.parsed.found}, suggestions=${d2.parsed.suggestions?.length ?? 0}`);
say("");
await check("detail 不存在 → found:false 且不报错", () => {
  assert.equal(d2.res.isError, undefined);
  assert.equal(d2.parsed.found, false);
});

// 10. 空查询
const e1 = await call("search", { query: "  " });
say(`## search(query="  ") → isError=${e1.res.isError} reason=${e1.parsed.reason}`);
say("");
await check("空查询 → isError + empty_query", () => {
  assert.equal(e1.res.isError, true);
  assert.equal(e1.parsed.reason, "empty_query");
});

// 11. 无结果
const e2 = await call("search", { query: "zzzz-no-such-thing-xyz" });
say(`## search(no-hit) → ok=${e2.parsed.ok} results=${e2.parsed.results?.length} note=${e2.parsed.note ? "有" : "无"}`);
say("");
await check("无结果 → ok:true + 空列表 + note", () => {
  assert.equal(e2.parsed.ok, true);
  assert.equal(e2.parsed.results.length, 0);
  assert.ok(e2.parsed.note);
});

await client.close();

say("");
say(`# 结论：${failures === 0 ? "ALL PASS" : `${failures} FAIL`}`);
say(`# 数据来源：${s1.parsed.meta?.source}`);
say(`# 全库张数：${s1.parsed.meta?.total}（拉取于 ${s1.parsed.meta?.fetchedAt}）`);

await writeFile(OUT_FILE, `${lines.join("\n")}\n`, "utf8");
process.stdout.write(`\n[e2e] 留证已写入 ${OUT_FILE}\n`);
process.exit(failures === 0 ? 0 : 1);
