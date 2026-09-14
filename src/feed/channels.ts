/**
 * 频道函数（兼容层，2026-09-14 v3）。
 *
 * ⚠️ 实现全部搬到了 `src/feed/channel-policy.ts`（**容量与配额的唯一定义源**，前后端共用）——
 * 起因：v2.2 前后端各写一份频道逻辑、各自硬编码 `limit = 60`（栗子 L8：频道只有 60 张），
 * 且两边的默认值/措辞已经开始漂移。本文件从此只做两件事：
 *  1. 把旧签名（位置参数 `limit`）转成新签名（`options`），让既有调用方与测试不必改；
 *  2. 保留历史导出名，避免下游 import 断裂。
 *
 * 新增代码请直接 import `channel-policy.ts`，不要在这里加逻辑。
 */

import {
  CHANNEL_CAP,
  CHANNEL_PAGE_SIZE,
  RECOMMEND_PAGE_SIZE,
  AI_CAP,
  FUN_CREATIVE_CAP,
  interleaveByCap,
  zoneOf as policyZoneOf,
  scaleSmooth as policyScaleSmooth,
  hotMomentum as policyHotMomentum,
  funScoreOf,
  isTodayNew as policyIsTodayNew,
  hotChannel as policyHot,
  dailyChannel as policyDaily,
  followingChannel as policyFollowing,
  funChannel as policyFun,
  categoryChannel,
  channelPoolSize,
  type ChannelCard as PolicyCard,
  type QuotaCaps,
} from "./channel-policy.ts";
import { ZONES, CATEGORY_TO_ZONE } from "./taxonomy.ts";

export { CHANNEL_CAP, CHANNEL_PAGE_SIZE, RECOMMEND_PAGE_SIZE, categoryChannel, channelPoolSize };
export type { QuotaCaps };

export type ChannelCard = PolicyCard;

export const ZONE_AI = "AI";
export const ZONE_RES = "资源";
export const ZONE_TOOL = "工具";
export const ZONE_CRE = "创意";
export const ALL_ZONES = [ZONE_AI, ZONE_RES, ZONE_TOOL, ZONE_CRE];

/** zone 解析（唯一实现在 channel-policy；此处保留导出名）。 */
export function zoneOf(card: ChannelCard): string | null {
  return policyZoneOf(card);
}

export function scaleSmooth(stars: number): number {
  return policyScaleSmooth(stars);
}

export function hotMomentum(card: ChannelCard): number {
  return policyHotMomentum(card);
}

export function isTodayNew(card: ChannelCard, now: Date): boolean {
  return policyIsTodayNew(card, now);
}

/** 乐趣分（fun_score × 增长动量）；导出名沿用旧写法 `funScore`。 */
export function funScore(card: ChannelCard): number {
  return funScoreOf(card);
}

/** 分区配额（旧接口）：权重表 → 前缀上限表。
 *  @deprecated 新代码请用 `interleaveByCap` + `aiCapCaps`/`funCaps`；保留仅为兼容旧调用。 */
export interface ZoneQuota {
  weights: Record<string, number>;
}

export const FUN_QUOTA: ZoneQuota = {
  weights: { [ZONE_CRE]: 0.4, [ZONE_AI]: 0.2, [ZONE_RES]: 0.2, [ZONE_TOOL]: 0.2 },
};

/** @deprecated 见 ZoneQuota 说明。 */
export function applyZoneQuota<T extends ChannelCard>(sorted: T[], limit: number, quota: ZoneQuota): T[] {
  const caps: QuotaCaps = new Map(Object.entries(quota.weights));
  const out = interleaveByCap(sorted, (c) => policyZoneOf(c), caps);
  return Number.isFinite(limit) && limit < out.length ? out.slice(0, Math.max(0, limit)) : out;
}

/**
 * 热门频道。`limit` 省略/非有限值 = **无限容量**（栗子 2026-09-14：频道要无限）。
 * 旧调用方传的 60 会被当成容量上限 60 —— 那是 v2.2 的回归写法，新代码别传。
 */
export function hotChannel<T extends ChannelCard>(cards: T[], limit: number = CHANNEL_CAP): T[] {
  return policyHot(cards, { limit });
}

export interface DailyOptions {
  now?: Date;
  seenPenalty?: (card: ChannelCard) => number;
  limit?: number;
}

export function dailyChannel<T extends ChannelCard>(cards: T[], opts: DailyOptions = {}): T[] {
  return policyDaily(cards, { now: opts.now, limit: opts.limit, seenPenalty: opts.seenPenalty });
}

export function followingChannel<T extends ChannelCard>(cards: T[], limit: number = CHANNEL_CAP): T[] {
  return policyFollowing(cards, { limit });
}

export function funChannel<T extends ChannelCard>(cards: T[], limit: number = CHANNEL_CAP): T[] {
  return policyFun(cards, { limit });
}

// 导出 zone 词表（唯一源在 taxonomy.ts；这里转发，避免下游再 import 一份）
export { ZONES, CATEGORY_TO_ZONE };
export { AI_CAP, FUN_CREATIVE_CAP };
