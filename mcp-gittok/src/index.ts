#!/usr/bin/env node
/**
 * GitTok MCP server（stdio 型）——工具名精确为 search / top / detail。
 *
 * 设计要点（任务书 T2）：
 *   - 数据源 = 线上公开 feed.json（站点匿名直连，无 key、无登录）；
 *   - 排序/搜索语义 100% 复用站点实现（见 src/tools.ts 顶部注释，单一事实源）；
 *   - 边界逐个有明确返回，不抛裸异常；stdio 传输下 stdout 只写 MCP 帧，日志一律走 stderr。
 *
 * 用法：
 *   node dist/index.js              启动 stdio MCP server（客户端接管）
 *   node dist/index.js --selftest   自检：拉线上 feed + 跑三个 tool 各一次，打印摘要后退出
 *   node dist/index.js --version    打印版本
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  feedSourceOptionsFromEnv,
  GittokFeedSource,
} from "./feed-source.ts";
import {
  toolSearch,
  toolTop,
  toolDetail,
  DEFAULT_LIMIT,
  MAX_LIMIT,
  TOP_SORTS,
} from "./tools.ts";

const SERVER_NAME = "gittok";
const SERVER_VERSION = "1.0.0";
const SITE_URL = "https://chestnuts-sisyphus.github.io/gittok/";

const source = new GittokFeedSource(feedSourceOptionsFromEnv());
const ctx = { load: () => source.load() };

/** 统一把纯逻辑层结果转成 MCP content（成功=JSON 文本；失败=isError 文本，不抛异常）。 */
function toContent(result: { ok: boolean } & Record<string, unknown>) {
  if (result.ok) {
    // 成功体也带 ok:true，与失败体的 ok:false 对齐（客户端只需看一个字段判成败）
    const payload = { ok: true, ...(result.data as Record<string, unknown>) };
    return {
      content: [
        { type: "text" as const, text: JSON.stringify(payload, null, 2) },
      ],
    };
  }
  const payload = {
    ok: false,
    reason: result.reason,
    message: result.message,
    ...(result.hint ? { hint: result.hint } : {}),
  };
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
    isError: true,
  };
}

function buildServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
    title: "GitTok",
    websiteUrl: SITE_URL,
  });

  server.registerTool(
    "search",
    {
      title: "Search GitTok",
      description:
        "全文搜索 GitTok 全库开源项目卡片（中文/英文关键词均可）。排序复用站点同一套加权搜索（仓库名断层权重 > 创作者 > 标签 > 文案）。返回概述卡（summaryCn/reasonCn/热度），需要长文用 detail 取完整卡片。",
      inputSchema: {
        query: z
          .string()
          .describe('搜索关键词，支持中文。例如 "绘图"、"next.js"、"向量数据库"'),
        limit: z
          .number()
          .int()
          .optional()
          .describe(`返回条数，默认 ${DEFAULT_LIMIT}，上限 ${MAX_LIMIT}（站点单次搜索上限）`),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async (args) => toContent(await toolSearch(ctx, args)),
  );

  server.registerTool(
    "top",
    {
      title: "Top GitTok projects",
      description:
        "按站点频道排序取前 N 张卡：sort=hot（热度动量，默认）/ fun（乐趣分）/ daily（当日新入库+时效热度）；可选 zone 过滤分区（AI / 资源 / 工具 / 创意）。排序与配额完全复用站点频道函数，返回 pool=该频道真实张数。",
      inputSchema: {
        sort: z
          .enum(["hot", "fun", "daily"])
          .optional()
          .describe("频道排序：hot=热度动量（默认），fun=乐趣，daily=当日新入库+时效热度"),
        limit: z
          .number()
          .int()
          .optional()
          .describe(`返回条数，默认 ${DEFAULT_LIMIT}，上限 ${MAX_LIMIT}`),
        zone: z
          .string()
          .optional()
          .describe("可选分区过滤：AI / 资源 / 工具 / 创意（也接受 ai/fun/tool/learning）"),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async (args) => toContent(await toolTop(ctx, args)),
  );

  server.registerTool(
    "detail",
    {
      title: "Get one GitTok card",
      description:
        "按 repo（owner/name）取 GitTok 的完整卡片，含长文详情 detailCn（站点列表已剥离，本工具按站点同款详情表协议还原）。repo 不在库时返回 found=false 与近似建议。",
      inputSchema: {
        repo: z
          .string()
          .describe('仓库名 owner/name，例如 "huggingface/transformers"'),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async (args) => toContent(await toolDetail(ctx, args)),
  );

  return server;
}

async function selftest(): Promise<number> {
  const say = (s: string) => process.stdout.write(`${s}\n`);
  say(`gittok-mcp ${SERVER_VERSION} selftest — 数据源：线上公开 feed.json（匿名、无 key）`);
  const [s, t, d] = [
    await toolSearch(ctx, { query: "绘图", limit: 3 }),
    await toolTop(ctx, { sort: "hot", limit: 3 }),
    await toolDetail(ctx, { repo: "huggingface/transformers" }),
  ];
  const brief = (r: { ok: boolean } & Record<string, unknown>) => {
    if (!r.ok) return `FAILED reason=${String(r.reason)} msg=${String(r.message)}`;
    const data = r.data as Record<string, unknown>;
    const rows = Array.isArray(data["results"])
      ? (data["results"] as { repo: string }[]).map((x) => x.repo)
      : data["found"] !== undefined
        ? [`found=${String(data["found"])} repo=${String(data["repo"])}`]
        : [];
    const m = data["meta"] as Record<string, unknown> | undefined;
    return `ok (全库 ${String(m?.["total"])} 张) ${rows.join(", ")}`;
  };
  say(`search("绘图", 3)      -> ${brief(s)}`);
  say(`top(sort=hot, 3)        -> ${brief(t)}`);
  say(`detail(transformers)    -> ${brief(d)}`);
  const allOk = s.ok && t.ok && d.ok;
  say(allOk ? "selftest OK" : "selftest FAILED");
  return allOk ? 0 : 1;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.includes("--version")) {
    process.stdout.write(`${SERVER_VERSION}\n`);
    return;
  }
  if (argv.includes("--selftest")) {
    process.exitCode = await selftest();
    return;
  }
  if (argv.includes("--help")) {
    process.stdout.write(
      `gittok-mcp ${SERVER_VERSION}\n\n` +
        "stdio MCP server. Tools: search / top / detail (anonymous, no API key).\n\n" +
        "Usage:\n  node dist/index.js            run as MCP server (stdio)\n" +
        "  node dist/index.js --selftest verify install against the live feed\n" +
        "  node dist/index.js --version\n\n" +
        `Sorts: ${TOP_SORTS.join(", ")}. Env: GITTOK_FEED_URL, GITTOK_DETAILS_URL, GITTOK_FEED_FILE, GITTOK_DETAILS_FILE\n`,
    );
    return;
  }
  const server = buildServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdout 已被 MCP 占用：所有日志走 stderr
  process.stderr.write(
    `[gittok-mcp] ${SERVER_VERSION} ready (stdio). Data: live GitTok feed. Tools: search / top / detail\n`,
  );
}

main().catch((err: unknown) => {
  process.stderr.write(`[gittok-mcp] fatal: ${(err as Error).message}\n`);
  process.exit(1);
});
