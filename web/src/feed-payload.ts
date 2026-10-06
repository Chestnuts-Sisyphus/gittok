/**
 * feed 详情运行时（浏览器）：**单卡分片**取数 ＋ 同日缓存 ＋ 整表兜底。
 * 纯函数拆在 payload-split.ts（构建层 vite.config 共用，无浏览器依赖）。
 *
 * ⭐ 二十轮 C3（2026-10-06，栗子「详情内容必须作为整体展现」的数据侧同族件）：
 * 旧运行时是 5.96MB 整表（feed-details.json）：点击要么等整表下载（线上冷实测 724ms /
 * 传输 2.57MB），要么整表没到就补渲闪现。分片后每个 repo 一个小文件（单卡 p50 ≈1.7KB），
 * 点击只拉所需一片：
 *   ① 会话内存 Map（同步命中 ⇒ 弹层首帧即终态，零交换）；
 *   ② IndexedDB 同日分片缓存（`d:<repo>` 键，命中即回；后台 revalidate 只更新缓存，
 *      不碰打开中的弹层——闸判据「在场⇄缺席至多一次切换」不允许二次改写）；
 *   ③ 网络分片（`data/details/<owner>/<name>.json`，墓碑 {"detailCn":null}＝确认缺失）；
 *   ④ 兜底：分片 404（部署偏斜：新列表 × 旧 dist）或网络失败 → legacy 整表
 *      （同日 IDB 'details' → one-flight 网络 fetchDetailsText）。
 * boot 零预热不变（十二轮 T3）：本模块在首次点击详情前不发任何请求。
 */

import { loadCachedText, saveCachedText } from "./feed-cache.ts";
import {
  splitFeedPayload,
  mergeDetail,
  diffDetailKeys,
  withRepoDetail,
  detailShardPath,
  detailShardBody,
  parseDetailShard,
} from "./payload-split.ts";

export {
  splitFeedPayload,
  mergeDetail,
  diffDetailKeys,
  withRepoDetail,
  detailShardPath,
  detailShardBody,
  parseDetailShard,
};

const SHARD_URL = (repo: string) => `./data/${detailShardPath(repo)}`;
/** legacy 整表（构建产物仍在，兜底期保留；技能/MCP/API.md 的公开接口不动它）。 */
const DETAILS_URL = "./data/feed-details.json";
/** 单卡分片很小（p50 1.7KB），8s 足够跨过最差的 CDN 抖动；超时转兜底而不是永远「加载中」。 */
const SHARD_TIMEOUT_MS = 8000;
/** 兜底整表同样给上限：弹层宁可显式「暂无」也不能永久挂在「加载中」（五轮 T1 的教训）。 */
const LEGACY_TIMEOUT_MS = 20000;

/** 会话内存：repo → detailCn（string）｜null＝确认缺失。undefined＝未知（未取过）。 */
const memory = new Map<string, string | null>();
/** 每 repo 至多一条在飞取数；结算即清。 */
const inflight = new Map<string, Promise<string | null>>();

/** 同步命中检查：string＝内容就绪（弹层首帧即终态）；null＝确认缺失（首帧即「暂无」）；
 *  undefined＝未知（调用方走 pending 占位）。 */
export function getRepoDetailIfReady(repo: string): string | null | undefined {
  return memory.get(repo);
}

/** 取单卡详情（内容｜null=确认缺失）。同 repo 并发合流、结果入内存。 */
export function resolveRepoDetail(repo: string): Promise<string | null> {
  const hit = memory.get(repo);
  if (hit !== undefined) return Promise.resolve(hit);
  const running = inflight.get(repo);
  if (running) return running;
  const p = (async () => {
    const out = await fetchRepoDetail(repo);
    memory.set(repo, out);
    inflight.delete(repo);
    return out;
  })();
  inflight.set(repo, p);
  return p;
}

async function fetchRepoDetail(repo: string): Promise<string | null> {
  // ① 同日 IDB 分片缓存：命中即回（详情数据每天 digest 一次，日内点击零网络等待）。
  //    后台 revalidate 供当日 drip 补写场景，只更新缓存/内存，调用方拿到的值不再变。
  const cached = await loadCachedText(`d:${repo}`);
  if (cached !== null) {
    const v = parseDetailShard(cached);
    if (v !== undefined) {
      void revalidateRepoDetail(repo, cached);
      return v;
    }
  }
  // ② 网络分片
  try {
    const r = await fetch(SHARD_URL(repo), { signal: AbortSignal.timeout(SHARD_TIMEOUT_MS) });
    if (r.ok) {
      const text = await r.text();
      void saveCachedText(`d:${repo}`, text);
      const v = parseDetailShard(text);
      if (v !== undefined) return v;
      console.warn(`[feed-details] ${repo} 分片体畸形（视作缺失）`);
      return null;
    }
    if (r.status !== 404) {
      console.warn(`[feed-details] ${repo} 分片 HTTP ${r.status}（转整表兜底）`);
    }
  } catch (err: unknown) {
    console.warn(
      `[feed-details] ${repo} 分片取数失败（转整表兜底）`,
      err instanceof Error ? err.message : err,
    );
  }
  // ③ 兜底：整表（部署偏斜窗口内新卡的分片还不存在；或分片服务整体异常）。
  return legacyDetailLookup(repo);
}

/** 后台 revalidate：同日缓存命中后核对最新分片，有变化只更新缓存与内存（不惊动打开中的弹层）。 */
async function revalidateRepoDetail(repo: string, cached: string): Promise<void> {
  try {
    const r = await fetch(SHARD_URL(repo), { signal: AbortSignal.timeout(SHARD_TIMEOUT_MS) });
    if (!r.ok) return;
    const text = await r.text();
    if (text === cached) return;
    void saveCachedText(`d:${repo}`, text);
    const v = parseDetailShard(text);
    if (v !== undefined && !inflight.has(repo)) memory.set(repo, v);
  } catch {
    /* revalidate 失败静默：缓存只影响下次速度 */
  }
}

/* ═══ legacy 整表兜底 ═══
 * ⚠ 2026-09-24 五轮 T1 实测（保留的机制教训）：整表下载必须**全页至多一条在飞**——
 * 原先预热＋两个调用点各一条 = 同一份 5.2MB 同时下 3 遍，窄带下互相抢带宽谁都不先到。
 * 结算即清（成功/失败都清）。二十轮起它只服务兜底路径，不再是点击主路径。 */
let directPromise: Promise<string> | null = null;
function fetchDetailsText(): Promise<string> {
  if (!directPromise) {
    directPromise = fetch(DETAILS_URL, { signal: AbortSignal.timeout(LEGACY_TIMEOUT_MS) })
      .then((r) => (r.ok ? r.text() : "{}"))
      .catch(() => "{}")
      .then((text) => {
        directPromise = null;
        return text;
      });
  }
  return directPromise;
}

async function legacyDetailLookup(repo: string): Promise<string | null> {
  const cached = await loadCachedText("details");
  if (cached) {
    try {
      const table = JSON.parse(cached) as Record<string, string>;
      if (typeof table[repo] === "string" && table[repo]) return table[repo];
    } catch {
      /* 缓存损坏 → 走网络 */
    }
  }
  const text = await fetchDetailsText();
  try {
    const table = JSON.parse(text) as Record<string, string>;
    const v = table[repo];
    return typeof v === "string" && v ? v : null;
  } catch {
    return null;
  }
}
