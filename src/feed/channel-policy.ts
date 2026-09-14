/**
 * 频道策略的**唯一定义源**（容量 / 配额 / 价值函数），前后端共用。
 *
 * 为什么单独成文件（2026-09-14 晚，栗子 L8 硬伤）：
 *  v2.2 把频道逻辑写了两份——后端 `src/feed/channels.ts`（只有测试在跑）与前端
 *  `web/src/App.tsx`（真正上线的那份），且两边各自硬编码 `limit = 60`
 *  （前端 getSectionCards 的 hot/daily/fun/following 四处 + 后端三个函数默认值）。
 *  结果：热门池 418 张只展示 60（14.4%）、乐趣池 940 张只展示 60（6.4%）、
 *  全库 2477 张任一频道最多看到 2.4%，而全仓没有任何分页/无限滚动 → 翻到底就是墙。
 *  栗子裁决：**要无限、且左上角必须显示这个频道的真实张数**——「现在都写 60 张
 *  会让用户觉得这个频道只有六十张，哪怕可以无限滚动用户也不知道，这是欺骗」。
 *
 * 修法：容量与配额只在本文件定义一次，两侧 import；且配额从「成员筛选」改成
 * **分块交错**（quotaBlocks）——保证任意前缀都满足配额，同时**不丢任何一张卡**，
 * 所以放开容量后「池子里有多少就能滚到多少」。
 *
 * 纪律：纯函数、零 Node 依赖（web/src 直接 import 本文件，不得引入 fs/path）。
 */

// ---------------------------------------------------------------------------
// 容量（唯一事实源）
// ---------------------------------------------------------------------------

/**
 * 每批渲染张数。语义是「增量加载一次追加多少张」——**不是频道容量上限**。
 * v2.2 的 bug 正是把这两个概念混成了一个 60。
 */
export const CHANNEL_PAGE_SIZE = 60;

/**
 * 频道容量上限：无限（栗子 2026-09-14 拍板「我需要的是无限」）。
 * 显示层必须用 `channelPoolSize()` 的真实值标注频道张数，禁止显示本批/本页张数。
 */
export const CHANNEL_CAP = Number.POSITIVE_INFINITY;

/** 推荐频道每批挑选量（推荐是「为你挑选」语义，但同样不设总量上限）。 */
export const RECOMMEND_PAGE_SIZE = 60;

// ---------------------------------------------------------------------------
// 分区工具（zone 词表唯一定义源在 taxonomy.ts）
// ---------------------------------------------------------------------------

import { ZONES, CATEGORY_TO_ZONE } from "./taxonomy.ts";

/**
 * 频道函数消费的最小字段集。**故意不写索引签名**——写了之后接口类型（如 web 的 FeedCard）
 * 反而不满足约束（TS 只给类型别名隐式索引签名）；不写则两端的卡类型都能直接传进来。
 */
export interface ChannelCard {
  repo: string;
  owner?: string;
  zone?: string;
  /** 旧分区回退（ai/fun/tool/learning） */
  category?: string;
  funScore?: number;
  aiScore?: number;
  stars?: number;
  starGrowth?: number;
  heatScore?: number;
  createdAt?: string;
  ts?: string;
}

export const ALL_ZONES: string[] = [...ZONES];

/** zone 解析：优先 LLM 输出 zone，回退旧 category 映射；无 = null（不参与配额统计）。 */
export function zoneOf(card: ChannelCard): string | null {
  if (card.zone && (ZONES as readonly string[]).includes(card.zone)) return card.zone;
  const mapped = CATEGORY_TO_ZONE[card.category ?? ""];
  return mapped ?? null;
}

/** 规模平滑：min(1, log10(stars)/4)——防小库日均涨星虚高，也防大库只靠存量。 */
export function scaleSmooth(stars: number): number {
  if (stars <= 0) return 0;
  return Math.min(1, Math.log10(stars) / 4);
}

/** 热门动量分：starGrowth × 规模平滑（30 天日均口径）。 */
export function hotMomentum(card: ChannelCard): number {
  return (card.starGrowth ?? 0) * scaleSmooth(card.stars ?? 0);
}

/** 乐趣分：fun_score × (1 + 增长动量)；fun_score 缺失 = 0（无独立信号不开）。 */
export function funScoreOf(card: ChannelCard): number {
  if (card.funScore === undefined || !Number.isFinite(card.funScore)) return 0;
  return card.funScore * (1 + Math.min((card.starGrowth ?? 0) / 50, 1) * 0.35);
}

/** 当日新入库（createdAt 当天）→ 每日频道段 1 保底席。 */
export function isTodayNew(card: ChannelCard, now: Date): boolean {
  if (!card.createdAt) return false;
  const d = new Date(card.createdAt);
  return (
    d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth() === now.getUTCMonth() &&
    d.getUTCDate() === now.getUTCDate()
  );
}

// ---------------------------------------------------------------------------
// 配额：从「成员筛选」到「前缀上限」
// ---------------------------------------------------------------------------

/** 配额表：key → 该 key 在**任意前缀**里的占比上限（无此 key = 不限）。 */
export type QuotaCaps = Map<string, number>;

/**
 * 前缀配额交错：把「配额」从**成员筛选**改成**顺序约束**，且**不丢任何一张卡**。
 *
 * 算法：按排序结果从前往后走，某张卡如果放进去会让所属 key 在「已产出前缀」里的占比超过
 * 上限（`count+1 <= max(1, floor(prefixLen+1) × cap)`），就先搁进待定区、继续看后面的卡；
 * 全部走完后把待定区按原序追加到末尾。
 *
 * 为什么不是 v2.2 的「按席位挑选」（`aiCapQuota(sorted, limit)`）：
 *  那个模型要在固定的 n 个坑位里分席位，天然会**丢掉**没分到席位的卡——容量一旦放开
 *  （栗子要求「无限」），它就把尾巴整段砍掉或整段堆到后面。改成分块/前缀上限后：
 *  性质 1：输出 = 输入的一个排列（每张卡恰好一次）→ 池子有多少就能滚到多少（V-C 依赖）；
 *  性质 2：**已接受前缀**（= 输出去掉待定尾部那一段）内任意前缀都满足占比上限
 *         → 首屏不会被单一分区淹没（配额的原意保留）；
 *  性质 3：不受限的分区按分数原序出现 → 「其余分区按自身分布混排」自动成立。
 *
 * 诚实边界（数学事实，不是实现妥协）：若**池子本身**某分区占比就超过上限，则不可能既保留
 * 全部卡、又让每个前缀都满足上限——超额的那部分只能退到尾部（仍可见、不丢）。
 * 所以性质 2 只在待定尾部开始之前成立；池子占比不超上限时（常见情况）全域成立。
 * 待定尾部长度可用 `deferredCount()` 单独算出，供验收脚本核对「已接受前缀」的真实长度。
 */
export function interleaveByCap<T>(sorted: T[], keyOf: (c: T) => string | null, caps: QuotaCaps): T[] {
  const out: T[] = [];
  const counts = new Map<string, number>();
  /** 被配额挡下的卡（FIFO，保留分数原序）；一旦配额腾出席位就按序放回去 */
  const deferred: T[] = [];
  const allowedFor = (k: string, prefixLen: number): number =>
    Math.max(1, Math.floor((caps.get(k) ?? 1) * prefixLen));
  /** 尝试放下一张（放得下返回 true）；配额只作用于 caps 里登记过的分区 */
  const tryPlace = (c: T): boolean => {
    const k = keyOf(c);
    if (k === null) {
      out.push(c);
      return true;
    }
    const cap = caps.get(k);
    if (cap === undefined) {
      out.push(c);
      return true;
    }
    if ((counts.get(k) ?? 0) + 1 <= allowedFor(k, out.length + 1)) {
      out.push(c);
      counts.set(k, (counts.get(k) ?? 0) + 1);
      return true;
    }
    return false;
  };

  let i = 0;
  for (;;) {
    // ① 先还债：放回待定区里第一张「现在放得下」的卡（它在分数序上更靠前，优先于新卡）
    let placedDeferred = false;
    for (let d = 0; d < deferred.length; d++) {
      if (tryPlace(deferred[d]!)) {
        deferred.splice(d, 1);
        placedDeferred = true;
        break;
      }
    }
    // ② 再推进一张新卡（放不下就进待定区，等配额腾位）
    let consumedNew = false;
    const c = sorted[i];
    if (c !== undefined) {
      i++;
      consumedNew = true;
      if (!tryPlace(c)) deferred.push(c);
    }
    // 新卡用尽 + 待定区一张也放不下（池子某分区占比超上限）→ 收尾
    if (!consumedNew && !placedDeferred) break;
  }
  // 收尾：超上限的那部分卡在配额下永远放不进前缀 → 按原序追加到尾部（不丢卡）
  if (deferred.length > 0) out.push(...deferred);
  return out;
}

/**
 * 待定尾部长度：用与 `interleaveByCap` 完全相同的接受规则跑一遍，只数最后**放不回去**的卡。
 * 用途（验收）：核对「已接受前缀」的真实长度 = `pool.length - deferredCount()`——
 * 前缀配额性质只在这段内成立（池子本身占比不超上限时，这个值为 0 = 全域成立）。
 */
export function deferredCount<T>(sorted: T[], keyOf: (c: T) => string | null, caps: QuotaCaps): number {
  const counts = new Map<string, number>();
  const deferred: T[] = [];
  let accepted = 0;
  const allowedFor = (k: string, prefixLen: number): number =>
    Math.max(1, Math.floor((caps.get(k) ?? 1) * prefixLen));
  const tryPlace = (c: T): boolean => {
    const k = keyOf(c);
    const cap = k === null ? undefined : caps.get(k);
    if (k === null || cap === undefined) {
      accepted++;
      return true;
    }
    if ((counts.get(k) ?? 0) + 1 <= allowedFor(k, accepted + 1)) {
      accepted++;
      counts.set(k, (counts.get(k) ?? 0) + 1);
      return true;
    }
    return false;
  };
  let i = 0;
  for (;;) {
    let placedDeferred = false;
    for (let d = 0; d < deferred.length; d++) {
      if (tryPlace(deferred[d]!)) {
        deferred.splice(d, 1);
        placedDeferred = true;
        break;
      }
    }
    let consumedNew = false;
    const c = sorted[i];
    if (c !== undefined) {
      i++;
      consumedNew = true;
      if (!tryPlace(c)) deferred.push(c);
    }
    if (!consumedNew && !placedDeferred) break;
  }
  return deferred.length;
}

/**
 * 计数型多样性交错（防「同族霸榜」）：与 `interleaveByCap` 同思路，但配额按**绝对条数**算——
 * 同一个 key（乐趣频道用 domainKey，即细分领域）在任意前缀里最多
 * `max(minPerKey, floor(ratio × prefixLen))` 张。
 *
 * 为什么乐趣频道需要它：乐趣池的 top 段很容易被同一族的项目占满
 * （实测：像素宠物 / AI 陪玩一类选题在满分档扎堆），栗子看到的就是「一屏都是同一个东西」。
 * 前缀配额（分区维度）管不住这种情况——它们同属一个分区，却来自同一个细分领域。
 */
export function interleaveByCountCap<T>(
  sorted: T[],
  keyOf: (c: T) => string | null,
  opts: { minPerKey?: number; ratio?: number } = {},
): T[] {
  const minPerKey = opts.minPerKey ?? 3;
  const ratio = opts.ratio ?? 0.15;
  const out: T[] = [];
  const deferred: T[] = [];
  const counts = new Map<string, number>();
  const allowedFor = (prefixLen: number): number => Math.max(minPerKey, Math.floor(ratio * prefixLen));
  const tryPlace = (c: T): boolean => {
    const k = keyOf(c);
    if (k === null) {
      out.push(c);
      return true;
    }
    if ((counts.get(k) ?? 0) + 1 <= allowedFor(out.length + 1)) {
      out.push(c);
      counts.set(k, (counts.get(k) ?? 0) + 1);
      return true;
    }
    return false;
  };
  let i = 0;
  for (;;) {
    let placedDeferred = false;
    for (let d = 0; d < deferred.length; d++) {
      if (tryPlace(deferred[d]!)) {
        deferred.splice(d, 1);
        placedDeferred = true;
        break;
      }
    }
    let consumedNew = false;
    const c = sorted[i];
    if (c !== undefined) {
      i++;
      consumedNew = true;
      if (!tryPlace(c)) deferred.push(c);
    }
    if (!consumedNew && !placedDeferred) break;
  }
  if (deferred.length > 0) out.push(...deferred);
  return out;
}

/** 乐趣频道的细分领域配额参数（domainKey 维度）。 */
export const FUN_DOMAIN_MIN_PER_KEY = 3;
export const FUN_DOMAIN_RATIO = 0.15;

/** 热门/每日的配额：AI 占比 ≤ 30%（其余三区不设上限 —— 非 AI 因此自动 ≥ 70%，
 *  即 v2.2 定稿「AI 30% / 其余三区共 70%」在无限容量下的等价写法）。 */
export const AI_CAP = 0.3;

/** 乐趣频道的配额：创意占比 ≤ 40%（防「一屏全是游戏/绘画」；其余三区不限）。 */
export const FUN_CREATIVE_CAP = 0.4;

export function aiCapCaps(_pool: ChannelCard[]): QuotaCaps {
  return new Map([["AI", AI_CAP]]);
}

export function funCaps(_pool: ChannelCard[]): QuotaCaps {
  return new Map([["创意", FUN_CREATIVE_CAP]]);
}

/**
 * 分页配额合并（推荐频道用：它是「每页都要有偏好配比」的策展语义，不是全局前缀约束）。
 *
 * 每页按 `quota` 分配席位（`floor(pageSize × share)`），剩余席从各队列的当前队头里
 * 按分数挑最高的补；一页填满就开下一页，直到所有队列见底。
 *
 * 性质：输出 = 全部输入的一个排列（**不丢卡**）——所以推荐频道放开容量后同样能一直滚到底，
 * 且**每一页**都保持偏好配比（不像前缀上限那样只在头部保证）。
 */
export function pagedQuotaMerge<T>(
  sources: { key: string; list: T[]; scoreOf: (c: T) => number }[],
  quota: Record<string, number>,
  blockSize = CHANNEL_PAGE_SIZE,
): T[] {
  const cursors = sources.map(() => 0);
  const out: T[] = [];
  const total = sources.reduce((s, x) => s + x.list.length, 0);
  if (total === 0) return out;
  for (;;) {
    const block: T[] = [];
    // ① 配额席
    sources.forEach((src, i) => {
      const share = quota[src.key];
      if (share === undefined) return;
      const seats = Math.floor(blockSize * share);
      for (let k = 0; k < seats; k++) {
        const c = src.list[cursors[i]!];
        if (c === undefined) break;
        if (block.length >= blockSize) break;
        block.push(c);
        cursors[i]!++;
      }
    });
    // ② 补席：各队列队头里分数最高的先上（队列内已降序 → 队头即该队列当前最大）
    while (block.length < blockSize) {
      let best = -1;
      let bestScore = -Infinity;
      sources.forEach((src, i) => {
        const c = src.list[cursors[i]!];
        if (c === undefined) return;
        const s = src.scoreOf(c);
        if (s > bestScore) {
          bestScore = s;
          best = i;
        }
      });
      if (best === -1) break;
      const src = sources[best]!;
      block.push(src.list[cursors[best]!]!);
      cursors[best]!++;
    }
    if (block.length === 0) break;
    out.push(...block);
    if (out.length >= total) break;
  }
  return out;
}

// ---------------------------------------------------------------------------
// 频道价值函数（容量无限；排序即体验，配额只约束前缀）
// ---------------------------------------------------------------------------

export interface ChannelOptions {
  /** 容量上限（默认 CHANNEL_CAP = 无限；测试可传小值） */
  limit?: number;
  now?: Date;
  seenPenalty?: (card: ChannelCard) => number;
}

/** 热门（大众验证）：动量分降序 + AI 30% 前缀配额（其余三区按分数原序混排）。 */
export function hotChannel<T extends ChannelCard>(cards: T[], opts: ChannelOptions = {}): T[] {
  const pool = cards.filter((c) => (c.starGrowth ?? 0) > 0);
  pool.sort((a, b) => hotMomentum(b) - hotMomentum(a) || (b.stars ?? 0) - (a.stars ?? 0));
  const out = interleaveByCap(pool, (c) => zoneOf(c), aiCapCaps(pool));
  return capTo(out, opts.limit);
}

/** 每日（时效，两段）：段 1=当日新入库；段 2=heatScore × 已读降权 + 同热门配额。 */
export function dailyChannel<T extends ChannelCard>(cards: T[], opts: ChannelOptions = {}): T[] {
  const now = opts.now ?? new Date();
  const limit = opts.limit ?? CHANNEL_CAP;
  const seenPenalty = opts.seenPenalty ?? (() => 1);
  const newToday = cards
    .filter((c) => isTodayNew(c, now))
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const rest = cards
    .filter((c) => !isTodayNew(c, now) && (c.heatScore ?? 0) > 0)
    .sort((a, b) => (b.heatScore ?? 0) * seenPenalty(b) - (a.heatScore ?? 0) * seenPenalty(a));
  const restQuota = interleaveByCap(rest, (c) => zoneOf(c), aiCapCaps(rest));
  // 段 1 在前（当日新入库天然分散，无需配额），段 2 接在后面；容量放开 = 两段都全给
  return capTo([...newToday, ...restQuota], limit);
}

/** 关注（关系视图）：repo 发布时间降序（createdAt），不掺降权、不掺配额——全量看到。 */
export function followingChannel<T extends ChannelCard>(cards: T[], opts: ChannelOptions = {}): T[] {
  const out = [...cards].sort((a, b) => (b.createdAt ?? b.ts ?? "").localeCompare(a.createdAt ?? a.ts ?? ""));
  return capTo(out, opts.limit);
}

/**
 * 乐趣（体验轴）：fun_score × (1+增长动量) 降序 + 创意 40% 配额。
 * 池子口径（F3 修正）：`funScore > 0` 才算进池——v3 六维判据下「正经生产力工具」整卡得 0，
 * 所以 >0 等于「至少命中一维乐趣」；旧口径要求 ≥0.5 会让池子人为缩水。
 */
/**
 * 乐趣（体验轴）：fun_score × (1+增长动量) 降序 + **两级配额**。
 *  ① 分区维度：创意 ≤40% 前缀配额（防一屏全是游戏/绘画）；
 *  ② 细分领域维度：同一个 domainKey ≤ max(3, 15%×前缀)（防同族霸榜，G-B2③）。
 * 池子口径（F3 修正）：`funScore > 0` 才算进池——v3 六维判据下「正经生产力工具」整卡得 0，
 * 所以 >0 等于「至少命中一维乐趣」；旧口径要求 ≥0.5 会让池子人为缩水。
 */
export function funChannel<T extends ChannelCard>(cards: T[], opts: ChannelOptions = {}): T[] {
  const pool = cards.filter((c) => (c.funScore ?? 0) > 0).sort((a, b) => funScoreOf(b) - funScoreOf(a));
  const zoned = interleaveByCap(pool, (c) => zoneOf(c) ?? "工具", funCaps(pool));
  const diversified = interleaveByCountCap(zoned, (c) => domainKeyOfCard(c), {
    minPerKey: FUN_DOMAIN_MIN_PER_KEY,
    ratio: FUN_DOMAIN_RATIO,
  });
  return capTo(diversified, opts.limit);
}

/** 细分领域键：优先 domainKey（服务端派生），回退 domainTags[0]，都没有则不参与多样性配额。 */
function domainKeyOfCard(c: ChannelCard): string | null {
  const dk = (c as { domainKey?: unknown }).domainKey;
  if (typeof dk === "string" && dk.trim()) return dk.trim();
  const dt = (c as { domainTags?: unknown }).domainTags;
  if (Array.isArray(dt) && typeof dt[0] === "string" && dt[0].trim()) return dt[0].trim();
  return null;
}

/** 分区 tab（AI/资源/工具/创意）：按 aiScore 策展排序，同分看涨星势头。容量同样无限。 */
export function categoryChannel<T extends ChannelCard>(
  cards: T[],
  zone: string,
  opts: ChannelOptions = {},
): T[] {
  const out = cards
    .filter((c) => zoneOf(c) === zone)
    .sort((a, b) => (b.aiScore ?? 0.5) - (a.aiScore ?? 0.5) || (b.starGrowth ?? 0) - (a.starGrowth ?? 0));
  return capTo(out, opts.limit);
}

/**
 * 频道池大小（显示层用）：**这个频道一共有多少张**，与当前渲染了多少张无关。
 * 栗子 2026-09-14：「不能告诉用户这个频道只有 60 张，这是欺骗」——
 * 所以左上角的数字必须来自这里，而不是当前批/当前页的长度。
 */
export function channelPoolSize(
  sectionKey: string,
  cards: ChannelCard[],
  opts: { zone?: string; now?: Date; followingOwners?: ReadonlySet<string> } = {},
): number {
  const now = opts.now ?? new Date();
  switch (sectionKey) {
    case "hot":
      return cards.filter((c) => (c.starGrowth ?? 0) > 0).length;
    case "daily":
      return cards.filter((c) => isTodayNew(c, now) || (c.heatScore ?? 0) > 0).length;
    case "fun":
      return cards.filter((c) => (c.funScore ?? 0) > 0).length;
    case "following":
      return opts.followingOwners
        ? cards.filter((c) => opts.followingOwners!.has(c.owner ?? "")).length
        : cards.length;
    default:
      return opts.zone ? cards.filter((c) => zoneOf(c) === opts.zone).length : cards.length;
  }
}

/** 容量上限（默认无限；非有限值一律当无限）。 */
function capTo<T>(list: T[], limit?: number): T[] {
  if (limit === undefined || !Number.isFinite(limit) || limit >= list.length) return list;
  return list.slice(0, Math.max(0, Math.floor(limit)));
}
