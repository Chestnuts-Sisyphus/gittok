/**
 * 分档队列（2026-09-14）：全量建库的「按档推进 + 进度盘账」。
 *
 * 栗子 09-14 拍板：现有资源撑不起一口气全量 → 分档推进（如 1w+ → 5k+ → 1k+ 全量），
 * 全量完成前 GitTok 要 24 小时不间断运转，并且要知道「各档更新完还要多久」。
 *
 * 机制：
 *  1. 索引 `data/repo-tiers.json`（scripts/gittok-tier-index.ts 产出）：repo → {stars,tier}
 *  2. 本模块把索引**灌进候选池的头部**（按 tier 升序 → 星级降序），配合 `MAX_LLM_SCORE_REPOS`
 *     窗口，天然形成「档间推进」：窗口被当前档填满 → 只在当前档耗尽后才吃到下一档。
 *  3. 进度盘账 `data/tier-progress.json`：每档 total / done（feed.json 里的卡）/ 覆盖率 / 吞吐，
 *     供「还要多久」的估算与对外播报。
 *
 * 纪律：索引缺失/损坏一律降级为「无分档」（返回空），不阻塞原有 trend+search 路径。
 */

import fs from "node:fs";
import path from "node:path";

export interface TierDef {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

/** 默认档位（与 scripts/gittok-tier-index.ts 的 TIERS 一致） */
export const DEFAULT_TIERS: TierDef[] = [
  { id: "t1", label: "10k+", min: 10_000, max: null },
  { id: "t2", label: "5k-10k", min: 5_000, max: 10_000 },
  { id: "t3", label: "1k-5k", min: 1_000, max: 5_000 },
];

export interface TierRepo {
  repo: string;
  stars: number;
  tier: string;
  lang?: string;
}

export interface TierIndexShape {
  generatedAt?: string;
  tiers?: Record<string, { min: number; max: number | null; count: number }>;
  repos?: Record<string, { stars: number; tier: string; lang?: string; pushedAt?: string }>;
}

export interface TierProgressShape {
  updatedAt: string;
  /** 档 → {total, done, coverage, lastRunDelta} */
  tiers: Record<string, { total: number; done: number; coverage: number; lastRunDelta?: number }>;
  /** 本轮之前在跑的档（播报用） */
  activeTier?: string;
}

export const TIER_INDEX_PATH = path.join("data", "repo-tiers.json");
export const TIER_PROGRESS_PATH = path.join("data", "tier-progress.json");

/** 读索引（缺失/损坏 → 空；不抛） */
export function loadTierIndex(file = TIER_INDEX_PATH): TierIndexShape | null {
  try {
    const raw = JSON.parse(fs.readFileSync(file, "utf-8")) as TierIndexShape;
    if (!raw || typeof raw !== "object" || !raw.repos) return null;
    return raw;
  } catch {
    return null;
  }
}

/**
 * 按档位优先排序的候选列表（tier 升序 → 同档内 stars 降序）。
 * `done` = 已产出卡（feed.json）的 repo 集合：已完成的排除，返回的列表即可直接进海选窗。
 */
export function tierCandidates(
  index: TierIndexShape,
  done: Set<string>,
  opts?: { limit?: number; tiers?: TierDef[] },
): TierRepo[] {
  const tiers = opts?.tiers ?? DEFAULT_TIERS;
  const order = new Map(tiers.map((t, i) => [t.id, i]));
  const out: TierRepo[] = [];
  for (const [repo, e] of Object.entries(index.repos ?? {})) {
    if (done.has(repo)) continue;
    out.push({ repo, stars: e.stars, tier: e.tier, lang: e.lang });
  }
  out.sort((a, b) => {
    const ta = order.get(a.tier) ?? 99;
    const tb = order.get(b.tier) ?? 99;
    if (ta !== tb) return ta - tb;
    return b.stars - a.stars;
  });
  return typeof opts?.limit === "number" ? out.slice(0, opts.limit) : out;
}

/** 各档进度：总数（索引）、已完成（feed 里同档的卡数）、覆盖率、当前所在档。 */
export function tierProgress(
  index: TierIndexShape,
  cards: Array<{ repo?: string; stars?: number }>,
  prev?: TierProgressShape | null,
): TierProgressShape {
  // 卡片→档：优先用索引（精确），索引缺失时按 stars 归档
  const repos = index.repos ?? {};
  const doneByTier = new Map<string, number>();
  const totalByTier = new Map<string, number>();
  for (const [repo, e] of Object.entries(repos)) {
    totalByTier.set(e.tier, (totalByTier.get(e.tier) ?? 0) + 1);
    void repo;
  }
  const cardSet = new Set(cards.map((c) => c.repo).filter(Boolean) as string[]);
  for (const cardRepo of cardSet) {
    const e = repos[cardRepo];
    const tier = e?.tier ?? tierOfStars(cardRepo ? cards.find((c) => c.repo === cardRepo)?.stars : undefined);
    if (tier) doneByTier.set(tier, (doneByTier.get(tier) ?? 0) + 1);
  }

  const tiers: TierProgressShape["tiers"] = {};
  let activeTier: string | undefined;
  for (const t of DEFAULT_TIERS) {
    const total = totalByTier.get(t.id) ?? 0;
    const done = Math.min(doneByTier.get(t.id) ?? 0, total || (doneByTier.get(t.id) ?? 0));
    const coverage = total > 0 ? done / total : 0;
    const prevEntry = prev?.tiers?.[t.id];
    tiers[t.id] = {
      total,
      done,
      coverage: Math.round(coverage * 1000) / 1000,
      ...(prev ? { lastRunDelta: done - (prevEntry?.done ?? 0) } : {}),
    };
    if (!activeTier && total > 0 && done < total) activeTier = t.id;
  }
  return { updatedAt: new Date().toISOString(), tiers, ...(activeTier ? { activeTier } : {}) };
}

function tierOfStars(stars: number | undefined): string | null {
  if (typeof stars !== "number") return null;
  for (const t of DEFAULT_TIERS) {
    const upper = t.max === null ? Number.POSITIVE_INFINITY : t.max;
    if (stars >= t.min && stars < upper) return t.id;
  }
  return null;
}

export function loadTierProgress(file = TIER_PROGRESS_PATH): TierProgressShape | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as TierProgressShape;
  } catch {
    return null;
  }
}

export function saveTierProgress(p: TierProgressShape, file = TIER_PROGRESS_PATH): void {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(p, null, 2), "utf-8");
  } catch (err) {
    console.error(`  [tier] progress save failed: ${err}`);
  }
}

/**
 * 剩余时间估算（粗算，诚实标注为「按近期吞吐线性外推」）：
 *   remaining / perRoundCards × roundMinutes。样本不足（<2 轮）时只回原始数字。
 */
export function estimateRemaining(
  progress: TierProgressShape,
  perRoundCards: number,
  roundMinutes: number,
): { text: string; hours: number } {
  const rows: string[] = [];
  let totalHours = 0;
  for (const t of DEFAULT_TIERS) {
    const e = progress.tiers[t.id];
    if (!e || e.total === 0) continue;
    const remaining = Math.max(0, e.total - e.done);
    const rounds = perRoundCards > 0 ? remaining / perRoundCards : Number.POSITIVE_INFINITY;
    const hours = (rounds * roundMinutes) / 60;
    if (Number.isFinite(hours)) totalHours += hours;
    rows.push(
      `${t.id}(${t.label}) 剩 ${remaining}/${e.total} 卡，约 ${Number.isFinite(hours) ? hours.toFixed(1) : "∞"} 小时`,
    );
  }
  const text = `按近期吞吐（${perRoundCards} 卡/轮 × ${roundMinutes} 分钟/轮）线性外推：${rows.join("；")}；合计约 ${totalHours.toFixed(1)} 小时`;
  return { text, hours: totalHours };
}
