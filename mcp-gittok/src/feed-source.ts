/**
 * GitTok 数据源：多源自动回退，保证「匿名、无 key、大陆直连可用」。
 *
 * 为什么不是单一 URL（2026-09-17 实测，直连不走代理）：
 *   raw.githubusercontent.com   连不通（000）
 *   chestnuts-sisyphus.github.io 121 KB/s（3.5MB 列表要 10s+）
 *   cdn.jsdelivr.net            1.8 MB/s（同文件 1.6s）✅
 * 且仓库里的 data/feed.json 是**全量文件（自带 detailCn）**，站点的是「列表+详情表」两文件协议。
 * 因此默认源链（顺序尝试，任一成功即返回）：
 *   1) jsDelivr 全量 data/feed.json    —— 快；detailCn 内联
 *   2) 站点 feed.json + feed-details.json —— 最权威、最新（GitHub Pages）；detailCn 走详情表
 *   3) raw.githubusercontent.com 全量    —— 兜底
 *
 * 覆写方式（自部署/离线/调试）：
 *   GITTOK_FEED_FILE     本地 data/feed.json（仓库全量文件）
 *   GITTOK_DETAILS_FILE  本地详情表（可选）
 *   GITTOK_FEED_URL      指定单文件源（给了它就不再走默认源链）
 *   GITTOK_DETAILS_URL   与 GITTOK_FEED_URL 搭配成「列表+详情表」两文件源
 *   GITTOK_TIMEOUT_MS    单源超时，默认 30000
 */

import { readFile } from "node:fs/promises";

import type { FeedCard } from "../../web/src/types.ts";

const REPO = "https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master";
export const DEFAULT_FEED_URL = `${REPO}/data/feed.json`;
export const SITE_PAGES = "https://chestnuts-sisyphus.github.io/gittok/data";
export const SITE_LIST_URL = `${SITE_PAGES}/feed.json`;
export const SITE_DETAILS_URL = `${SITE_PAGES}/feed-details.json`;
export const RAW_URL =
  "https://raw.githubusercontent.com/Chestnuts-Sisyphus/gittok/master/data/feed.json";

const USER_AGENT =
  "gittok-mcp/1.0.0 (+https://github.com/Chestnuts-Sisyphus/gittok)";
const DEFAULT_TIMEOUT_MS = 30_000;
/** 内存缓存有效期：站点每天更新几次，10 分钟足够新鲜，且避免 agent 连打时反复拉全量。 */
const DEFAULT_TTL_MS = 10 * 60_000;

export interface FeedBundle {
  cards: FeedCard[];
  details: Record<string, string>;
  /** 实际命中的数据来源（URL 或本地路径），随工具返回给调用方以便反查 */
  source: string;
  /** 数据来源短名：jsdelivr / pages / raw / file / env */
  sourceName: string;
  /** 拉取时间 ISO */
  fetchedAt: string;
  /** 是否来自内存缓存 */
  cached: boolean;
}

/** 数据源不可用（网络/HTTP/JSON 解析失败）——上层转成结构化失败，不抛裸异常给客户端。 */
export class FeedUnavailableError extends Error {
  constructor(
    message: string,
    readonly source: string,
  ) {
    super(message);
    this.name = "FeedUnavailableError";
  }
}

/** 源描述：全量单文件，或「列表 + 详情表」两文件。 */
export interface SourceSpec {
  name: string;
  kind: "full" | "split";
  url?: string;
  listUrl?: string;
  detailsUrl?: string;
  file?: string;
  detailsFile?: string;
}

export interface FeedSourceOptions {
  feedUrl?: string;
  detailsUrl?: string;
  feedFile?: string;
  detailsFile?: string;
  timeoutMs?: number;
  ttlMs?: number;
  fetchImpl?: typeof fetch;
  /** 注入时钟（测试用） */
  now?: () => number;
  /** 注入的日志（stderr），默认 process.stderr */
  log?: (line: string) => void;
}

export function feedSourceOptionsFromEnv(
  env: Record<string, string | undefined> = process.env,
): FeedSourceOptions {
  const timeoutMs = Number(env["GITTOK_TIMEOUT_MS"]);
  return {
    feedUrl: env["GITTOK_FEED_URL"],
    detailsUrl: env["GITTOK_DETAILS_URL"],
    feedFile: env["GITTOK_FEED_FILE"],
    detailsFile: env["GITTOK_DETAILS_FILE"],
    ...(Number.isFinite(timeoutMs) && timeoutMs > 0 ? { timeoutMs } : {}),
  };
}

/** 默认源链（顺序尝试）。 */
export function defaultSourceChain(): SourceSpec[] {
  return [
    { name: "jsdelivr", kind: "full", url: DEFAULT_FEED_URL },
    {
      name: "pages",
      kind: "split",
      listUrl: SITE_LIST_URL,
      detailsUrl: SITE_DETAILS_URL,
    },
    { name: "raw", kind: "full", url: RAW_URL },
  ];
}

export function buildSourceChain(opts: FeedSourceOptions): SourceSpec[] {
  if (opts.feedFile) {
    return [
      {
        name: "file",
        kind: "full",
        file: opts.feedFile,
        ...(opts.detailsFile ? { detailsFile: opts.detailsFile } : {}),
      },
    ];
  }
  if (opts.feedUrl) {
    return opts.detailsUrl
      ? [
          {
            name: "env",
            kind: "split",
            listUrl: opts.feedUrl,
            detailsUrl: opts.detailsUrl,
          },
        ]
      : [{ name: "env", kind: "full", url: opts.feedUrl }];
  }
  return defaultSourceChain();
}

export class GittokFeedSource {
  private cache: { bundle: FeedBundle; at: number } | null = null;
  private readonly chain: SourceSpec[];
  private readonly timeoutMs: number;
  private readonly log: (line: string) => void;

  constructor(private readonly opts: FeedSourceOptions = {}) {
    this.chain = buildSourceChain(opts);
    this.timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.log =
      opts.log ?? ((line: string) => process.stderr.write(`${line}\n`));
  }

  private now(): number {
    return this.opts.now ? this.opts.now() : Date.now();
  }

  /** 拉取（带 TTL 内存缓存 + 源链回退）。全部源失败才抛 FeedUnavailableError。 */
  async load(force = false): Promise<FeedBundle> {
    const ttl = this.opts.ttlMs ?? DEFAULT_TTL_MS;
    if (!force && this.cache && this.now() - this.cache.at < ttl) {
      return { ...this.cache.bundle, cached: true };
    }
    const failures: string[] = [];
    for (const spec of this.chain) {
      try {
        const bundle = await this.loadFrom(spec);
        this.cache = { bundle, at: this.now() };
        return bundle;
      } catch (err) {
        const msg = `[gittok-mcp] source "${spec.name}" failed: ${(err as Error).message}`;
        failures.push(msg);
        this.log(msg);
      }
    }
    throw new FeedUnavailableError(
      `所有数据源都失败：\n${failures.join("\n")}`,
      this.chain.map((s) => s.url ?? s.listUrl ?? s.file).join(" | "),
    );
  }

  private async loadFrom(spec: SourceSpec): Promise<FeedBundle> {
    const fetchedAt = new Date(this.now()).toISOString();
    if (spec.kind === "full") {
      if (spec.file) {
        const text = await readFile(spec.file, "utf8").catch(
          (err: unknown) => {
            throw new FeedUnavailableError(
              `无法读取本地 feed 文件：${(err as Error).message}`,
              spec.file!,
            );
          },
        );
        let details: Record<string, string> = {};
        if (spec.detailsFile) {
          const dtext = await readFile(spec.detailsFile, "utf8").catch(
            () => null,
          );
          if (dtext) details = parseDetails(dtext) ?? {};
        }
        return {
          cards: parseCards(text, spec.file),
          details,
          source: spec.file,
          sourceName: spec.name,
          fetchedAt,
          cached: false,
        };
      }
      const url = spec.url!;
      const cards = parseCards(await this.fetchText(url), url);
      // 全量文件通常自带 detailCn；若没有（例如站点列表被当作单文件传入），details 留空
      return {
        cards,
        details: {},
        source: url,
        sourceName: spec.name,
        fetchedAt,
        cached: false,
      };
    }
    // split：列表 + 详情表；详情表失败不致命（detail 工具退化为无 detailCn 并注明）
    const listUrl = spec.listUrl!;
    const detailsUrl = spec.detailsUrl!;
    const [listText, details] = await Promise.all([
      this.fetchText(listUrl),
      this.fetchText(detailsUrl)
        .then((t) => parseDetails(t))
        .catch(() => null),
    ]);
    return {
      cards: parseCards(listText, listUrl),
      details: details ?? {},
      source: details
        ? `${listUrl} + ${detailsUrl}`
        : `${listUrl} (details unavailable)`,
      sourceName: spec.name,
      fetchedAt,
      cached: false,
    };
  }

  private async fetchText(url: string): Promise<string> {
    const doFetch = this.opts.fetchImpl ?? fetch;
    let res: Response;
    try {
      res = await doFetch(url, {
        headers: { "user-agent": USER_AGENT, accept: "application/json,*/*" },
        signal: AbortSignal.timeout(this.timeoutMs),
        redirect: "follow",
      });
    } catch (err) {
      throw new FeedUnavailableError(`请求失败：${(err as Error).message}`, url);
    }
    if (!res.ok) {
      throw new FeedUnavailableError(`HTTP ${res.status}`, url);
    }
    try {
      return await res.text();
    } catch (err) {
      throw new FeedUnavailableError(
        `响应读取失败：${(err as Error).message}`,
        url,
      );
    }
  }
}

function parseCards(text: string, source: string): FeedCard[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new FeedUnavailableError(
      `feed JSON 解析失败：${(err as Error).message}`,
      source,
    );
  }
  if (!Array.isArray(parsed)) {
    throw new FeedUnavailableError("feed JSON 顶层不是数组", source);
  }
  return parsed as FeedCard[];
}

function parseDetails(text: string): Record<string, string> | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
    return null;
  } catch {
    return null;
  }
}
