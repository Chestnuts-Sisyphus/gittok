/**
 * 频道函数（标签分区 v2.2 落地，2026-09-13）。
 *
 * 频道=价值函数不是集合：每频道 = 过滤（池子）× 排序（价值函数）× 配额（防霸榜）。
 * 五频道（+分类 tab 由调用方按 zone 分组）：
 *  - 热门（大众验证）：动量分 = starGrowth × 规模平滑（min(1, log10(stars)/4)），
 *    四区配额 AI 30% / 其余三区共 70%（按各自卡量加权）——动量不是存量。
 *  - 每日（时效）：两段——上半段=当日新入库（createdAt 当日降序），下半段=heatScore × 已读降权；
 *    增速段加四区配额（同热门 AI 30%）。
 *  - 关注（关系）：repo 发布时间降序（createdAt），不掺降权（关系流=全量看到）。
 *  - 乐趣（体验）：fun_score × (1 + 增长动量)，跨四区；创意 40% / 其余三区各 20%。
 *    fun_score 缺失的卡不进乐趣频道（无独立信号不开——失败方案 9）。
 *  - 推荐（匹配度）：四层合成在个性化 v2.2（personalize.ts / 前端 buildRecommended），
 *    本文件不重复实现，只导出推荐频道消费的字段辅助。
 *
 * 纪律：纯函数；zone 缺省回退 category（ai→AI/learning→资源/tool→工具/fun→创意）；
 * 配额是强制组件（AI 区在 1k 星线占比极高，不加配额必被淹没）。
 */

export interface ChannelCard {
  repo: string;
  zone?: string;
  /** 旧分区回退（ai/fun/tool/learning） */
  category?: string;
  funScore?: number;
  aiScore?: number;
  stars: number;
  starGrowth: number;
  heatScore?: number;
  createdAt?: string;
  silentRounds?: number;
  [k: string]: unknown;
}

export const ZONE_AI = "AI";
export const ZONE_RES = "资源";
export const ZONE_TOOL = "工具";
export const ZONE_CRE = "创意";
export const ALL_ZONES = [ZONE_AI, ZONE_RES, ZONE_TOOL, ZONE_CRE];

const CATEGORY_TO_ZONE: Record<string, string> = {
  ai: ZONE_AI,
  learning: ZONE_RES,
  tool: ZONE_TOOL,
  fun: ZONE_CRE,
};

/** zone 解析：优先 LLM 输出 zone，回退旧 category 映射；无 = null（不进配额统计）。 */
export function zoneOf(card: ChannelCard): string | null {
  if (card.zone && ALL_ZONES.includes(card.zone)) return card.zone;
  const mapped = CATEGORY_TO_ZONE[card.category ?? ""];
  return mapped ?? null;
}

/** 规模平滑：min(1, log10(stars)/4)——防小库日均涨星虚高，也防大库只靠存量。 */
export function scaleSmooth(stars: number): number {
  if (stars <= 0) return 0;
  return Math.min(1, Math.log10(stars) / 4);
}

/** 热门动量分：starGrowth × 规模平滑（30 天日均口径由 starGrowth 的差分天然覆盖）。 */
export function hotMomentum(card: ChannelCard): number {
  return (card.starGrowth ?? 0) * scaleSmooth(card.stars ?? 0);
}

// ---------------------------------------------------------------------------
// 配额机制（统一：四区固定席）
// ---------------------------------------------------------------------------

export interface ZoneQuota {
  /** zone → 权重（0-1；不必和为 1，取 floor 后剩余按卡量补） */
  weights: Record<string, number>;
}

export const FUN_QUOTA: ZoneQuota = {
  weights: { [ZONE_CRE]: 0.4, [ZONE_AI]: 0.2, [ZONE_RES]: 0.2, [ZONE_TOOL]: 0.2 },
};

/**
 * 按 zone 配额取头（确定性；适用「每 zone 比例独立且和 ≤1」的配额，如乐趣 40/20/20/20）：
 * 每 zone 权重 × limit 取 floor 席位 → 剩余席位按「该 zone 在池中卡量占比」降序补
 * → 合并后按原排序（得分降序）。
 */
export function applyZoneQuota<T extends ChannelCard>(sorted: T[], limit: number, quota: ZoneQuota): T[] {
  if (limit <= 0 || sorted.length === 0) return [];
  const byZone = new Map<string, T[]>();
  for (const c of sorted) {
    const z = zoneOf(c);
    if (!z) continue;
    if (!byZone.has(z)) byZone.set(z, []);
    byZone.get(z)!.push(c);
  }
  const zones = [...byZone.keys()];
  if (zones.length === 0) return [];

  const n = Math.min(limit, sorted.length);
  const picks = new Map<string, T[]>();
  let allocated = 0;
  for (const z of zones) {
    const w = quota.weights[z] ?? 0;
    const k = Math.min(byZone.get(z)!.length, Math.floor(n * w));
    picks.set(z, byZone.get(z)!.slice(0, k));
    allocated += k;
  }
  // 剩余席位：按「zone 卡量占比」降序补（卡量加权语义）
  let rest = n - allocated;
  if (rest > 0) {
    const poolShare = [...zones].sort(
      (a, b) => byZone.get(b)!.length - byZone.get(a)!.length || a.localeCompare(b),
    );
    for (const z of poolShare) {
      if (rest <= 0) break;
      const take = Math.min(rest, byZone.get(z)!.length - picks.get(z)!.length);
      if (take > 0)
        picks.get(z)!.push(...byZone.get(z)!.slice(picks.get(z)!.length, picks.get(z)!.length + take));
      rest -= take;
    }
  }
  const merged: T[] = [];
  for (const z of zones) merged.push(...(picks.get(z) ?? []));
  // 合并后保持全局排序（得分降序；跨 zone 稳定）
  const order = new Map(sorted.map((c, i) => [c.repo, i] as const));
  return merged.sort((a, b) => order.get(a.repo)! - order.get(b.repo)! || 0);
}

/**
 * 热门/每日增速段专用配额：AI 硬席 30%，其余三区共享 70% 按各自卡量加权
 * （标签分区定稿 §3.2「AI 30% / 其余三区共 70%（按各自卡量加权）」）。
 * 无 zone/无 category 的卡不参与配额（不进任何区）。
 */
function aiCapQuota<T extends ChannelCard>(sorted: T[], limit: number): T[] {
  if (limit <= 0 || sorted.length === 0) return [];
  const zoned = sorted.filter((c) => zoneOf(c) !== null);
  const ai = zoned.filter((c) => zoneOf(c) === ZONE_AI);
  const rest = zoned.filter((c) => zoneOf(c) !== ZONE_AI);
  const aiSeats = Math.min(ai.length, Math.floor(limit * 0.3));
  const restSeats = limit - aiSeats;
  const picks: T[] = [...ai.slice(0, aiSeats)];
  if (restSeats > 0 && rest.length > 0) {
    const byZone = new Map<string, T[]>();
    for (const c of rest) {
      const z = zoneOf(c)!;
      if (!byZone.has(z)) byZone.set(z, []);
      byZone.get(z)!.push(c);
    }
    const zones = [...byZone.keys()].sort(
      (a, b) => byZone.get(b)!.length - byZone.get(a)!.length || a.localeCompare(b),
    );
    const totalW = zones.reduce((s, z) => s + byZone.get(z)!.length, 0);
    const seats = new Map(zones.map((z) => [z, Math.floor(restSeats * (byZone.get(z)!.length / totalW))]));
    let allocated = 0;
    for (const z of zones) {
      const k = Math.min(byZone.get(z)!.length, seats.get(z)!);
      picks.push(...byZone.get(z)!.slice(0, k));
      allocated += k;
    }
    // 剩余席按卡量降序补
    let remaining = restSeats - allocated;
    for (const z of zones) {
      if (remaining <= 0) break;
      const from = seats.get(z)!;
      const take = Math.min(remaining, byZone.get(z)!.length - from);
      if (take > 0) picks.push(...byZone.get(z)!.slice(from, from + take));
      remaining -= take;
    }
  }
  const order = new Map(sorted.map((c, i) => [c.repo, i] as const));
  return picks.sort((a, b) => order.get(a.repo)! - order.get(b.repo)! || 0);
}

// ---------------------------------------------------------------------------
// 热门频道（大众验证视角）
// ---------------------------------------------------------------------------

/**
 * 热门：动量分（starGrowth × 规模平滑）降序 + AI 30% 硬席配额（其余三区按卡量加权）。
 * 边界：30 天持续动量（starGrowth 日均口径）vs 每日 24h 即时动量。
 */
export function hotChannel<T extends ChannelCard>(cards: T[], limit = 60): T[] {
  const pool = cards.filter((c) => (c.starGrowth ?? 0) > 0);
  const sorted = pool.sort((a, b) => hotMomentum(b) - hotMomentum(a) || (b.stars ?? 0) - (a.stars ?? 0));
  return aiCapQuota(sorted, Math.min(limit, sorted.length));
}

// ---------------------------------------------------------------------------
// 每日频道（时效视角，两段）
// ---------------------------------------------------------------------------

/** 当日新入库（createdAt 当天）→ 保底席；显示「今天 GitTok 新发现了什么」。 */
export function isTodayNew(card: ChannelCard, now: Date): boolean {
  if (!card.createdAt) return false;
  const d = new Date(card.createdAt);
  return (
    d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth() === now.getUTCMonth() &&
    d.getUTCDate() === now.getUTCDate()
  );
}

export interface DailyOptions {
  now?: Date;
  seenPenalty?: (card: ChannelCard) => number;
  limit?: number;
}

/**
 * 每日：段 1=当日新入库（createdAt 当日降序，天然分散无需配额）；
 * 段 2=24h 增速头部（heatScore × 已读降权）+ AI 30% 硬席配额（同热门）。
 */
export function dailyChannel<T extends ChannelCard>(cards: T[], opts: DailyOptions = {}): T[] {
  const now = opts.now ?? new Date();
  const limit = opts.limit ?? 60;
  const seenPenalty = opts.seenPenalty ?? (() => 1);
  const newToday = cards
    .filter((c) => isTodayNew(c, now))
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const rest = cards.filter((c) => !isTodayNew(c, now) && (c.heatScore ?? 0) > 0);
  const sortedRest = rest.sort(
    (a, b) => (b.heatScore ?? 0) * seenPenalty(b) - (a.heatScore ?? 0) * seenPenalty(a),
  );
  const speed = aiCapQuota(sortedRest, Math.max(0, limit - newToday.length));
  return [...newToday, ...speed].slice(0, limit);
}

// ---------------------------------------------------------------------------
// 关注频道（关系视角）
// ---------------------------------------------------------------------------

/**
 * 关注：repo 发布时间降序（createdAt；缺 createdAt 用 ts 回退），不掺降权
 * （关系流语义=全量看到）。调用方负责 owner 过滤。
 */
export function followingChannel<T extends ChannelCard>(cards: T[], limit = 60): T[] {
  const ts = (c: T): string => c.createdAt ?? (c.ts as string | undefined) ?? "";
  return [...cards].sort((a, b) => ts(b).localeCompare(ts(a))).slice(0, limit);
}

// ---------------------------------------------------------------------------
// 乐趣频道（体验视角）
// ---------------------------------------------------------------------------

/**
 * 乐趣：fun_score × (1 + 增长动量) 降序 + 跨四区配额（创意 40%）。
 * fun_score 缺失的卡不进（无独立信号不开）；增长动量=starGrowth 归一（50 星/天吃满 +35%）。
 */
export function funScore(card: ChannelCard): number {
  if (card.funScore === undefined || !Number.isFinite(card.funScore)) return 0;
  const growth = Math.min((card.starGrowth ?? 0) / 50, 1) * 0.35;
  return card.funScore * (1 + growth);
}

export function funChannel<T extends ChannelCard>(cards: T[], limit = 60, quota: ZoneQuota = FUN_QUOTA): T[] {
  const pool = cards.filter((c) => c.funScore !== undefined && Number.isFinite(c.funScore));
  const sorted = pool.sort((a, b) => funScore(b) - funScore(a));
  return applyZoneQuota(sorted, Math.min(limit, sorted.length), quota);
}
