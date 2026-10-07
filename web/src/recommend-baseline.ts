/**
 * 推荐频道排序纯核（二十二代从 App.tsx 原位迁出，逻辑逐行等价——迁移不是重写）。
 *
 * 为什么抽出来：**构建期头片与运行时必须共用同一份排序实现**（vite.config 与 App.tsx
 * 各写一份 = L8「前后端两套排序」事故的复刻）。本模块无 React/浏览器依赖，双端可 import。
 *
 * 与 App.tsx 的关系：App 侧 buildRecommended 只剩「传 now」的薄包装；个性化四层
 * （L0 池过滤 → L2 多因子 → L1 已读系数 → L3 偏好配额 + L4 隐式微调）与 E1 相似度
 * 降权全部在此。会话洗牌（applyJitter）**不在这里**——它依赖会话种子，头片是
 * baseline 序（洗牌前），冻结式头片（二十二-0）的「会话序」由头片本身定义。
 */

import { diversifyRank } from "../../src/feed/similarity.ts";
import { pagedQuotaMerge, RECOMMEND_PAGE_SIZE } from "../../src/feed/channel-policy.ts";
import { categoryOfZone } from "./channels-axes.ts";
import { keepForRecommend } from "./copy-gate.ts";

/** 排序所需的最小结构面（FeedCard 满足；不整卡搬运类型，避免 types.ts 反向依赖）。
 *  zone 与 GsimCard/ChannelCard 同型（string | undefined，不带 null——数据侧 zone 缺失即 undefined）。 */
export interface RecommendCoreCard {
  repo: string;
  owner?: string;
  zone?: string;
  category?: string;
  aiScore?: number;
  starGrowth?: number;
  ts: string;
  pushedAt?: string;
  silentRounds?: number;
  copyOk?: boolean;
}

/** 显式偏好驱动的推荐配额：选区上调 50%，其余三区共享 50%（设置页可改可重置） */
export const PREF_QUOTA: Record<string, [number, number, number, number]> = {
  ai: [0.5, 0.16, 0.18, 0.16], // [ai, fun, tool, learning]
  fun: [0.16, 0.5, 0.18, 0.16],
  tool: [0.16, 0.16, 0.5, 0.18],
  learning: [0.16, 0.18, 0.16, 0.5],
};
export const DEFAULT_QUOTA: [number, number, number, number] = [0.4, 0.2, 0.2, 0.2]; // AI:非AI = 2:3（现状 40/20/20/20）

/** 死内容降权（P1 pushedAt 活动度）：超 1 年未更新的高星库 ×0.6；缺 pushedAt 用 ts 近似 */
export function activityFactor(c: RecommendCoreCard, now: number): number {
  const ts = c.pushedAt ?? c.ts;
  if (!ts) return 1;
  const days = (now - new Date(ts).getTime()) / 86_400_000;
  if (days > 365) return 0.6;
  return 1;
}

/** L2 多因子分：aiScore 相关度 × 星数增长 × 新鲜度 × 活动度（内容基默认流，0 积累也自洽） */
export function multiFactorScore(c: RecommendCoreCard, now: number): number {
  const ai = c.aiScore ?? 0.5;
  const growth = 1 + Math.min((c.starGrowth ?? 0) / 50, 1) * 0.35;
  const daysSince = (now - new Date(c.ts).getTime()) / 86_400_000;
  const freshness = 0.4 + 0.6 * Math.exp(-daysSince / 7); // 半衰期约 5 天
  return ai * growth * freshness * activityFactor(c, now);
}

export function buildRecommended<T extends RecommendCoreCard>(
  cards: T[],
  preferences: { preferredZone?: string | null },
  seen: Readonly<Record<string, number>>,
  interactions: Readonly<Record<string, { type?: string; ts: number }>>,
  followingSet: ReadonlySet<string> = new Set(),
  now: number = Date.now(),
): T[] {
  // L0 池过滤：点踩排除；沉寂库退场（真沉寂，收藏豁免）；文案不合格卡剔出推荐池（COPY-08，搜索/直达不受影响）
  const pool = cards.filter((c) => {
    if (!keepForRecommend(c)) return false;
    const inter = interactions[c.repo];
    if (inter?.type === "dislike") return false;
    if ((c.silentRounds ?? 0) >= 3 && inter?.type !== "bookmark") return false;
    return true;
  });
  if (pool.length === 0) return [];

  // L2 × L1 合成：多因子分 × 已读系数 + L4 隐式微调（互动加性小 boost，不破坏大序）
  const scoreOf = (c: T): number => {
    const base = multiFactorScore(c, now) * seenPenaltyOf(c, seen, now);
    const inter = interactions[c.repo];
    const micro = inter?.type === "like" || inter?.type === "bookmark" ? 0.1 : 0;
    const followBoost = followingSet.has(c.owner ?? "") ? 0.06 : 0; // 关注轻微抬推荐（2026-09-01 关注解耦）
    return base + micro + followBoost;
  };

  // 按前端分区键分组（zone 优先，回退 category）
  const byCat = new Map<string, T[]>();
  for (const c of pool) {
    // 归到存量 category 键（配额表按 category 建索引）：
    // 新卡有 zone → 用 zone→category 转换；存量卡只有 category → 直接用。
    const key = c.zone ? (categoryOfZone(c.zone) ?? c.category ?? "tool") : c.category || "tool";
    if (!byCat.has(key)) byCat.set(key, []);
    byCat.get(key)!.push(c);
  }

  // L3 显式偏好配额：preferredZone 驱动（默认 2:3；选区上调 50%）。
  // 存量兼容：老版本把 category 值（fun/learning…）存进过同一个字段 → 两种写法都译成 category 再查表。
  const prefCat = preferences.preferredZone
    ? (categoryOfZone(preferences.preferredZone) ?? preferences.preferredZone)
    : null;
  const quota = prefCat ? (PREF_QUOTA[prefCat] ?? DEFAULT_QUOTA) : DEFAULT_QUOTA;
  // 容量无限（栗子 2026-09-14）：席位模型改成**分页配额合并**——每页按偏好配比分配席位，
  // 一页填满开下一页，直到池子见底。**不丢任何一张卡**，所以推荐频道也能一直滚到底，
  // 且每一页都保持偏好配比（旧写法 slice(0, 60) 把尾巴整段砍掉了）。
  const cats = ["ai", "fun", "tool", "learning"];
  const quotaMap: Record<string, number> = {};
  cats.forEach((cat, i) => {
    quotaMap[cat] = quota[i]!;
  });
  const sources = cats.map((cat) => ({
    key: cat,
    list: (byCat.get(cat) ?? []).sort((a, b) => scoreOf(b) - scoreOf(a)),
    scoreOf,
  }));
  const merged = pagedQuotaMerge(sources, quotaMap, RECOMMEND_PAGE_SIZE);
  // E1 接线（2026-09-14）：相似度降权排序——近重复的后来者降权后移，**不排除任何卡**。
  // 之前 similarity.ts 只是检查器、推荐流看不见相似度，连刷三张「AI 宠物」毫无抵抗力。
  // 窗口 80 + 短文本词袋 → 2.5k 张池子是毫秒级。
  return diversifyRank(merged, { scoreOf, penalty: 0.3, window: 80 }).cards;
}

/** 已读系数（与 App.applyJitter 的 seenPenaltyOf 同源同值——看过的平滑衰减不排除）。 */
export function seenPenaltyOf(
  c: { repo: string },
  seen: Readonly<Record<string, number>>,
  now: number,
): number {
  const ts = seen[c.repo];
  if (!ts) return 1;
  const days = (now - ts) / 86_400_000;
  if (days < 1) return 0.45;
  if (days < 3) return 0.65;
  if (days < 7) return 0.85;
  return 1;
}
