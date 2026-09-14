/**
 * 真实数据上的频道容量断言（V-C）——栗子 L8「频道都只有 60 个」的防回归闸。
 *
 * 为什么单开一个文件：`scripts/gittok-channel-capacity.ts` 负责把数字摊开给人看，
 * 断言必须落在测试里（红了就是红的，不靠人肉读输出）。数据源 = 仓库内 data/feed.json。
 *
 * 历史对照（2026-09-14 修前）：热门池 418 张只见 60（14.4%）、乐趣池 940 张只见 60（6.4%）、
 * 全库 2477 张任一频道最多看到 2.4%。修后：池子有多少就能滚到多少。
 */

import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  hotChannel,
  funChannel,
  categoryChannel,
  channelPoolSize,
  deferredCount,
  aiCapCaps,
  funCaps,
  zoneOf,
  funScoreOf,
  CHANNEL_CAP,
  type ChannelCard,
} from "../feed/channel-policy.ts";

interface Card extends ChannelCard {
  owner?: string;
}

const FEED = path.join(process.cwd(), "data", "feed.json");
const cards: Card[] = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];

function prefixViolations(out: Card[], zoneName: string, cap: number, upto: number): number {
  let bad = 0;
  for (let n = 1; n <= Math.min(upto, out.length); n++) {
    const cnt = out.slice(0, n).filter((c) => zoneOf(c) === zoneName).length;
    if (cnt > Math.max(1, Math.floor(cap * n))) bad++;
  }
  return bad;
}

function dups(list: { repo: string }[]): number {
  return list.length - new Set(list.map((c) => c.repo)).size;
}

describe("V-C 频道容量（真实数据）", () => {
  it("卡库非空（数据源可用）", () => {
    expect(cards.length).toBeGreaterThan(1000);
  });

  it("频道容量无限：热门/乐趣的可达张数远高于 v2.2 的 60", () => {
    expect(CHANNEL_CAP).toBe(Number.POSITIVE_INFINITY);
    const hot = hotChannel(cards);
    const fun = funChannel(cards);
    // 热门池 = starGrowth>0 的卡；乐趣池 = funScore>0 的卡
    expect(hot.length).toBe(channelPoolSize("hot", cards));
    expect(fun.length).toBe(channelPoolSize("fun", cards));
    expect(hot.length).toBeGreaterThanOrEqual(300);
    expect(fun.length).toBeGreaterThanOrEqual(300);
  });

  it("单频道内无重复卡（跨频道重复是设计允许的）", () => {
    expect(dups(hotChannel(cards))).toBe(0);
    expect(dups(funChannel(cards))).toBe(0);
    for (const z of ["AI", "资源", "工具", "创意"]) {
      expect(dups(categoryChannel(cards, z))).toBe(0);
    }
  });

  it("显示张数 = 实际输出张数（防「写着 60 其实更多」这类口径不一致）", () => {
    for (const z of ["AI", "资源", "工具", "创意"]) {
      expect(categoryChannel(cards, z).length).toBe(channelPoolSize("cat", cards, { zone: z }));
    }
  });

  it("前缀配额：热门 AI 不超过 30%、乐趣 创意 不超过 40%（已接受前缀内）", () => {
    const hotPool = cards
      .filter((c) => (c.starGrowth ?? 0) > 0)
      .sort((a, b) => (b.starGrowth ?? 0) - (a.starGrowth ?? 0));
    const hot = hotChannel(cards);
    const hotAccepted = hot.length - deferredCount(hotPool, (c) => zoneOf(c), aiCapCaps([]));
    expect(hotAccepted).toBeGreaterThanOrEqual(300);
    expect(prefixViolations(hot, "AI", 0.3, hotAccepted)).toBe(0);

    const funPool = cards.filter((c) => (c.funScore ?? 0) > 0).sort((a, b) => funScoreOf(b) - funScoreOf(a));
    const fun = funChannel(cards);
    const funAccepted = fun.length - deferredCount(funPool, (c) => zoneOf(c) ?? "工具", funCaps([]));
    expect(prefixViolations(fun, "创意", 0.4, funAccepted)).toBe(0);
  });

  it("四区完备：每张卡恰好落一区（zone 覆盖 100%）", () => {
    const zoned = cards.filter((c) => zoneOf(c) !== null).length;
    expect(zoned).toBe(cards.length);
  });
});
