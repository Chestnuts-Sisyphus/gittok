/**
 * 频道容量与配额的回归测试（2026-09-14 v3，栗子 L8）。
 *
 * 事故背景：v2.2 前后端各写一份频道逻辑、各自硬编码 `limit = 60` → 热门池 418 张只展示 60
 * （14.4%）、乐趣池 940 张只展示 60（6.4%）、全库 2477 张任一频道最多看到 2.4%，
 * 而全仓没有任何分页/无限滚动 → 翻到底就是墙。栗子：「我需要的是无限，而且每个频道
 * 左上角会写多少张……你不能告诉用户这个频道只有 60 张，这是欺骗」。
 *
 * 本文件锁死三件事：
 *  1. 频道函数**不再有容量上限**（默认无限；池子里有多少就给多少，不丢卡）；
 *  2. 配额从「成员筛选」改成「前缀上限」后，**输出必须是输入的排列**（不重不漏）；
 *  3. 任意前缀都满足占比上限（AI ≤30% / 创意 ≤40%）——首屏不被单一分区淹没。
 */

import { describe, it, expect } from "vitest";
import {
  CHANNEL_CAP,
  CHANNEL_PAGE_SIZE,
  interleaveByCap,
  deferredCount,
  hotChannel,
  funChannel,
  followingChannel,
  categoryChannel,
  channelPoolSize,
  aiCapCaps,
  funCaps,
  pagedQuotaMerge,
  zoneOf,
  type ChannelCard,
} from "../feed/channel-policy.ts";

const mk = (repo: string, o: Partial<ChannelCard> = {}): ChannelCard => ({
  repo,
  stars: 10_000,
  starGrowth: 10,
  ...o,
});

/** 构造一个「AI 在头部集群」的池子：配额测试要的就是这种情况（AI 卡分数最高）。
 *  starGrowth 必须保持正数（热门池的入池条件是 starGrowth > 0）。 */
function aiHeavyPool(n: number, aiRatio: number): ChannelCard[] {
  const ai = Math.round(n * aiRatio);
  const cards: ChannelCard[] = [];
  for (let i = 0; i < n; i++) {
    cards.push(
      mk(i < ai ? `ai/${i}` : `other/${i}`, {
        zone: i < ai ? "AI" : "工具",
        starGrowth: 1000 - i, // AI 在前 = 分数最高（配额必然被触发）
        heatScore: 1000 - i,
      }),
    );
  }
  return cards;
}

/** 前缀配额断言：只在该断言成立的前缀范围内检查（尾部超额卡不受配额约束，见诚实边界）。 */
function assertPrefixCap(out: ChannelCard[], cap: number, zoneName: string, upto: number): void {
  for (let n = 1; n <= upto; n++) {
    const cnt = out.slice(0, n).filter((c) => zoneOf(c) === zoneName).length;
    expect(cnt).toBeLessThanOrEqual(Math.max(1, Math.floor(cap * n)));
  }
}

describe("频道容量：无限（v2.2 的硬编码 60 是回归，不是设计）", () => {
  it("默认容量 = 无限，热门诊不砍尾巴（500 张池子 → 500 张）", () => {
    const pool = aiHeavyPool(500, 0.4);
    const out = hotChannel(pool);
    expect(out).toHaveLength(500);
    expect(CHANNEL_CAP).toBe(Number.POSITIVE_INFINITY);
    expect(CHANNEL_PAGE_SIZE).toBeGreaterThan(0);
  });

  it("乐趣频道不砍尾巴：funScore>0 的池子全给（140 张 → 140 张）", () => {
    const pool: ChannelCard[] = [];
    for (let i = 0; i < 140; i++) {
      pool.push(mk(`r/${i}`, { zone: i % 2 ? "创意" : "工具", funScore: (i % 10) / 10 + 0.1 }));
    }
    expect(funChannel(pool)).toHaveLength(140);
  });

  it("关注频道全量看到（不掺配额、不砍尾巴）", () => {
    const pool = Array.from({ length: 300 }, (_, i) =>
      mk(`f/${i}`, { createdAt: `2026-01-${String((i % 28) + 1).padStart(2, "0")}T00:00:00Z` }),
    );
    expect(followingChannel(pool)).toHaveLength(300);
  });

  it("分区 tab 同样是整区容量（>60 的区不被截断）", () => {
    const pool = Array.from({ length: 220 }, (_, i) => mk(`z/${i}`, { zone: "资源", aiScore: 0.5 }));
    expect(categoryChannel(pool, "资源")).toHaveLength(220);
  });

  it("limit 只在显式传入时生效（测试/分页用），非有限值一律当无限", () => {
    const pool = aiHeavyPool(100, 0.4);
    expect(hotChannel(pool, { limit: 60 })).toHaveLength(60);
    expect(hotChannel(pool, { limit: Number.NaN })).toHaveLength(100);
    expect(hotChannel(pool, { limit: Number.POSITIVE_INFINITY })).toHaveLength(100);
  });
});

describe("配额：前缀上限（不丢卡）", () => {
  it("interleaveByCap 的输出是输入的排列（不重不漏）", () => {
    const pool = aiHeavyPool(200, 0.5);
    const out = interleaveByCap(pool, (c) => zoneOf(c), aiCapCaps(pool));
    expect(out).toHaveLength(pool.length);
    expect(new Set(out.map((c) => c.repo)).size).toBe(pool.length);
    expect([...out.map((c) => c.repo)].sort()).toEqual([...pool.map((c) => c.repo)].sort());
  });

  it("任意前缀满足 AI ≤30%（AI 集群在头部也不淹没首屏）", () => {
    // 池子 AI 占比 25% < 上限 30% → 无超额、无待定尾部 → 全域前缀都该满足
    const pool = aiHeavyPool(300, 0.25);
    const out = interleaveByCap(pool, (c) => zoneOf(c), aiCapCaps(pool));
    expect(deferredCount(pool, (c) => zoneOf(c), aiCapCaps(pool))).toBe(0);
    assertPrefixCap(out, 0.3, "AI", out.length);
  });

  it("池子占比超上限时：已接受前缀仍满足上限，超额卡退到尾部但一张不丢", () => {
    const pool = aiHeavyPool(300, 0.5); // AI 占 50%，远超 30%
    const caps = aiCapCaps(pool);
    const deferred = deferredCount(pool, (c) => zoneOf(c), caps);
    expect(deferred).toBeGreaterThan(0);
    const out = interleaveByCap(pool, (c) => zoneOf(c), caps);
    expect(out).toHaveLength(300); // 不丢卡
    const accepted = out.length - deferred;
    expect(accepted).toBeGreaterThanOrEqual(60); // 首屏一定在「已接受前缀」内
    assertPrefixCap(out, 0.3, "AI", accepted);
    // 首屏 60 张单独断言（产品口径：第一屏不被 AI 淹没）
    assertPrefixCap(out, 0.3, "AI", 60);
  });

  it("任意前缀满足创意 ≤40%（乐趣频道防同族霸榜）", () => {
    const pool: ChannelCard[] = [];
    for (let i = 0; i < 200; i++) {
      pool.push(mk(`x/${i}`, { zone: i < 150 ? "创意" : "工具", funScore: 0.9 }));
    }
    const caps = funCaps(pool);
    const out = interleaveByCap(pool, (c) => zoneOf(c) ?? "工具", caps);
    const accepted = out.length - deferredCount(pool, (c) => zoneOf(c) ?? "工具", caps);
    assertPrefixCap(out, 0.4, "创意", accepted);
    expect(out).toHaveLength(200); // 超配额的创意卡被推到尾部，但一张不丢
  });
});

describe("频道池大小（显示层真实张数）", () => {
  it("channelPoolSize 报的是池子总量，不是本页/本批张数", () => {
    const now = new Date("2026-09-14T12:00:00Z");
    const cards: ChannelCard[] = [
      ...Array.from({ length: 418 }, (_, i) => mk(`h/${i}`, { starGrowth: 5, heatScore: 5 })),
      mk("n/1", { starGrowth: 0, heatScore: 0 }),
    ];
    expect(channelPoolSize("hot", cards)).toBe(418);
    expect(
      channelPoolSize("fun", [
        { repo: "a", funScore: 0 },
        { repo: "b", funScore: 0.5 },
      ]),
    ).toBe(1);
    expect(channelPoolSize("daily", cards, { now })).toBe(418);
  });
});

describe("推荐频道分页配额合并", () => {
  it("每页保持配比，且输出是全部输入的排列（不丢卡）", () => {
    const mkList = (prefix: string, n: number) =>
      Array.from({ length: n }, (_, i) => ({ repo: `${prefix}/${i}`, score: n - i }));
    const sources = [
      { key: "ai", list: mkList("ai", 100), scoreOf: (c: { score: number }) => c.score },
      { key: "tool", list: mkList("tool", 100), scoreOf: (c: { score: number }) => c.score },
      { key: "fun", list: mkList("fun", 40), scoreOf: (c: { score: number }) => c.score },
      { key: "learning", list: mkList("le", 20), scoreOf: (c: { score: number }) => c.score },
    ];
    const quota = { ai: 0.4, fun: 0.2, tool: 0.2, learning: 0.2 };
    const out = pagedQuotaMerge(sources, quota, 60);
    expect(out).toHaveLength(260);
    expect(new Set(out.map((c) => c.repo)).size).toBe(260);
    // 第一页里 ai 的比例不低于配额的一半（席位被填满，允许补席带来偏差）
    const page1 = out.slice(0, 60);
    const aiInPage1 = page1.filter((c) => c.repo.startsWith("ai/")).length;
    expect(aiInPage1).toBeGreaterThanOrEqual(20);
  });
});
