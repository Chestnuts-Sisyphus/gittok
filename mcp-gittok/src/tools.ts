/**
 * 三个 MCP tool 的**纯逻辑层**（不依赖 MCP SDK，便于测试与复用）。
 *
 * 单一事实源纪律（任务书 T2 硬要求）：排序/搜索语义**全部复用站点同一套实现**——
 *   search → web/src/search.ts 的 weightedSearch（站点搜索 v2，断层权重）
 *   top    → src/feed/channel-policy.ts 的 hotChannel / funChannel / dailyChannel（站点频道函数）
 *   detail → web/src/payload-split.ts 的 mergeDetail（站点详情表合并协议）
 * 本文件只做「取数 → 调站点函数 → 裁剪输出字段 → 包装边界」，
 * **不得**出现任何自创的排序/打分公式。
 *
 * 边界（逐条有明确返回，均不抛裸异常）：
 *   空查询         → ok:false reason=empty_query
 *   无结果         → ok:true  results:[] + note（不是错误）
 *   repo 不存在    → ok:true  found:false + 近似建议（不是错误）
 *   CJK 查询       → 正常路径（中文子串命中 desc/summaryCn/reasonCn）
 *   feed 拉取失败  → ok:false reason=feed_unavailable（含来源 URL 与排查提示）
 */

import { ZONES, CATEGORY_TO_ZONE } from "../../src/feed/taxonomy.ts";
import {
  hotChannel,
  funChannel,
  dailyChannel,
  channelPoolSize,
  zoneOf,
} from "../../src/feed/channel-policy.ts";
import { weightedSearch } from "../../web/src/search.ts";
import { mergeDetail } from "../../web/src/payload-split.ts";
import { FeedUnavailableError, type FeedBundle } from "./feed-source.ts";
import type { FeedCard } from "../../web/src/types.ts";

/** 与站点搜索 MAX_RESULTS 对齐（web/src/search.ts）。 */
export const MAX_LIMIT = 60;
export const DEFAULT_LIMIT = 10;

export type TopSort = "hot" | "fun" | "daily";
export const TOP_SORTS: readonly TopSort[] = ["hot", "fun", "daily"];

export interface ToolContext {
  load(): Promise<FeedBundle>;
}

export interface ResultMeta {
  /** 数据来源（线上 URL 或本地文件） */
  source: string;
  /** 来源短名：jsdelivr / pages / raw / file / env */
  sourceName: string;
  fetchedAt: string;
  cached: boolean;
  /** 全库张数 */
  total: number;
}

export type ToolFailure = {
  ok: false;
  reason: string;
  message: string;
  hint?: string;
};
export type ToolSuccess<T> = { ok: true; data: T & { meta: ResultMeta } };
export type ToolResult<T> = ToolSuccess<T> | ToolFailure;

/** 结果卡（search/top 用）：够 agent 讲解，不含长文 detailCn（那走 detail）。 */
export interface CardBrief {
  rank?: number;
  repo: string;
  url: string;
  owner: string;
  name: string;
  desc: string;
  summaryCn: string;
  reasonCn: string;
  stars: number;
  starGrowth: number;
  language: string;
  zone: string;
  funScore: number;
  heatScore: number;
  createdAt: string;
  topics: string[];
}

function toBrief(card: FeedCard, rank?: number): CardBrief {
  const brief: CardBrief = {
    repo: card.repo,
    url: card.url ?? `https://github.com/${card.repo}`,
    owner: card.owner,
    name: card.name,
    desc: card.desc,
    summaryCn: card.summaryCn,
    reasonCn: card.reasonCn,
    stars: card.stars,
    starGrowth: card.starGrowth ?? 0,
    language: card.language,
    zone: zoneOf(card) ?? "",
    funScore: card.funScore ?? 0,
    heatScore: card.heatScore ?? 0,
    createdAt: card.createdAt ?? card.ts ?? "",
    topics: card.topics ?? [],
  };
  if (rank !== undefined) brief.rank = rank;
  return brief;
}

function meta(bundle: FeedBundle): ResultMeta {
  return {
    source: bundle.source,
    sourceName: bundle.sourceName,
    fetchedAt: bundle.fetchedAt,
    cached: bundle.cached,
    total: bundle.cards.length,
  };
}

function feedFailure(err: unknown): ToolFailure {
  if (err instanceof FeedUnavailableError) {
    return {
      ok: false,
      reason: "feed_unavailable",
      message: `GitTok 数据源不可用：${err.message}`,
      hint: `来源 ${err.source}。可稍后重试；离线可用环境变量 GITTOK_FEED_FILE 指向本地 data/feed.json。`,
    };
  }
  return {
    ok: false,
    reason: "internal_error",
    message: `内部错误：${(err as Error).message}`,
  };
}

function clampLimit(raw: number | undefined): number {
  if (raw === undefined || !Number.isFinite(raw)) return DEFAULT_LIMIT;
  const n = Math.floor(raw);
  if (n < 1) return 1;
  return Math.min(n, MAX_LIMIT);
}

// ---------------------------------------------------------------------------
// search —— 全库关键词搜索（站点 weightedSearch，中文可用）
// ---------------------------------------------------------------------------

export interface SearchArgs {
  query: string;
  limit?: number;
}

export interface SearchData {
  query: string;
  results: CardBrief[];
  /** 命中的创作者（站点创作者组语义：owner 命中即入列） */
  creators: { owner: string; count: number }[];
  returned: number;
  /** 站点搜索单次上限（超过则截断） */
  siteMaxResults: number;
  note?: string;
}

export async function toolSearch(
  ctx: ToolContext,
  args: SearchArgs,
): Promise<ToolResult<SearchData>> {
  const query = (args.query ?? "").trim();
  if (!query) {
    return {
      ok: false,
      reason: "empty_query",
      message: "query 为空：search 需要一个关键词（支持中文）。",
      hint: '例如 query="绘图"、query="next.js"、query="vector database"。',
    };
  }
  try {
    const bundle = await ctx.load();
    const limit = clampLimit(args.limit);
    const outcome = weightedSearch(bundle.cards, query);
    const results = outcome.results
      .slice(0, limit)
      .map((c, i) => toBrief(c, i + 1));
    const data: SearchData = {
      query,
      results,
      creators: outcome.creators.slice(0, 5),
      returned: results.length,
      siteMaxResults: MAX_LIMIT,
    };
    if (results.length === 0) {
      data.note =
        "全库无命中：换个关键词，或先用 top 浏览当前热门，再用 detail 取某项目的完整卡片。";
    } else if (outcome.results.length > limit) {
      data.note = `命中多于 limit，仅返回前 ${limit} 条（站点搜索单次上限 ${MAX_LIMIT} 条）。`;
    }
    return { ok: true, data: { ...data, meta: meta(bundle) } };
  } catch (err) {
    return feedFailure(err);
  }
}

// ---------------------------------------------------------------------------
// top —— 按热度/乐趣/时效排序取 N（站点频道函数，含站点配额语义）
// ---------------------------------------------------------------------------

export interface TopArgs {
  sort?: TopSort;
  limit?: number;
  /** 可选分区过滤：AI / 资源 / 工具 / 创意（也接受 ai/fun/tool/learning 旧 category 键） */
  zone?: string;
}

export interface TopData {
  sort: TopSort;
  zone: string | null;
  /** 该频道/分区池子的真实张数（与站点左上角同口径：channelPoolSize） */
  pool: number;
  returned: number;
  results: CardBrief[];
}

function normalizeZone(input: string | undefined): string | null | ToolFailure {
  if (input === undefined) return null;
  const raw = input.trim();
  if (!raw) return null;
  if ((ZONES as readonly string[]).includes(raw)) return raw;
  const mapped = CATEGORY_TO_ZONE[raw.toLowerCase()];
  if (mapped) return mapped;
  return {
    ok: false,
    reason: "invalid_zone",
    message: `未知分区：${raw}`,
    hint: `可用分区：${ZONES.join(" / ")}（也接受旧 category 键 ${Object.keys(CATEGORY_TO_ZONE).join(" / ")}）。不传 zone = 全库。`,
  };
}

export async function toolTop(
  ctx: ToolContext,
  args: TopArgs,
): Promise<ToolResult<TopData>> {
  const sort = (args.sort ?? "hot") as TopSort;
  if (!TOP_SORTS.includes(sort)) {
    return {
      ok: false,
      reason: "invalid_sort",
      message: `未知排序：${String(args.sort)}`,
      hint: `可用排序：${TOP_SORTS.join(" / ")}（hot=热度动量，fun=乐趣，daily=当日新入库+时效热度）。`,
    };
  }
  const zone = normalizeZone(args.zone);
  if (zone !== null && typeof zone === "object") return zone;
  try {
    const bundle = await ctx.load();
    const limit = clampLimit(args.limit);
    const pool = zone
      ? bundle.cards.filter((c) => zoneOf(c) === zone)
      : bundle.cards;
    let ranked: FeedCard[];
    switch (sort) {
      case "fun":
        ranked = funChannel(pool);
        break;
      case "daily":
        ranked = dailyChannel(pool, { now: new Date() });
        break;
      default:
        ranked = hotChannel(pool);
    }
    const results = ranked.slice(0, limit).map((c, i) => toBrief(c, i + 1));
    const poolSize = zone
      ? pool.length
      : channelPoolSize(sort, bundle.cards);
    const data: TopData = {
      sort,
      zone,
      pool: poolSize,
      returned: results.length,
      results,
    };
    return { ok: true, data: { ...data, meta: meta(bundle) } };
  } catch (err) {
    return feedFailure(err);
  }
}

// ---------------------------------------------------------------------------
// detail —— 按 repo 取完整卡片（含 detailCn）
// ---------------------------------------------------------------------------

export interface DetailArgs {
  repo: string;
}

export type DetailData =
  | {
      repo: string;
      found: true;
      /** 完整卡片（含 detailCn 长文；站点列表已剥离，此处按站点同款详情表协议还原） */
      card: FeedCard;
      /** detailCn 来源：inline=卡内自带 / details-table=站点详情表 / missing=两边都没有 */
      detailSource: "inline" | "details-table" | "missing";
    }
  | {
      repo: string;
      found: false;
      suggestions: { repo: string; summaryCn: string }[];
      note: string;
    };

export async function toolDetail(
  ctx: ToolContext,
  args: DetailArgs,
): Promise<ToolResult<DetailData>> {
  const repoRaw = (args.repo ?? "").trim();
  if (!repoRaw) {
    return {
      ok: false,
      reason: "empty_repo",
      message: "repo 为空：detail 需要 owner/name 形式的仓库名。",
      hint: '例如 repo="huggingface/transformers"。先用 search 或 top 拿到准确 repo。',
    };
  }
  try {
    const bundle = await ctx.load();
    const key = repoRaw.toLowerCase();
    const card =
      bundle.cards.find((c) => c.repo === repoRaw) ??
      bundle.cards.find((c) => c.repo.toLowerCase() === key);
    if (!card) {
      const suggestions = weightedSearch(bundle.cards, repoRaw)
        .results.slice(0, 3)
        .map((c) => ({ repo: c.repo, summaryCn: c.summaryCn }));
      return {
        ok: true,
        data: {
          repo: repoRaw,
          found: false,
          suggestions,
          note: "全库没有这个 repo（GitTok 只收录抓取范围内的项目）。建议用 search 再确认一次仓库名。",
          meta: meta(bundle),
        },
      };
    }
    const inline = typeof card.detailCn === "string" && card.detailCn.length > 0;
    const merged = mergeDetail(card, bundle.details);
    return {
      ok: true,
      data: {
        repo: card.repo,
        found: true,
        card: merged,
        detailSource: inline
          ? "inline"
          : merged.detailCn
            ? "details-table"
            : "missing",
        meta: meta(bundle),
      },
    };
  } catch (err) {
    return feedFailure(err);
  }
}
