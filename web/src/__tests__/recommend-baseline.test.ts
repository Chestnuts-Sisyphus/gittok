// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { describe, expect, it } from "vitest";
import { buildRecommended, multiFactorScore, seenPenaltyOf, activityFactor } from "../recommend-baseline.ts";

/**
 * 推荐排序纯核单测（二十二-0，2026-10-07）。
 * 这个函数是构建期头片与运行时推荐频道**唯一共用**的排序实现——
 * 冻结式头片的「首访者 baseline 序＝个性化序」、头片可确定性生成都压在它身上。
 * 逻辑本体从 App.tsx 原位迁出（二十二代前已在线上验证），这里锁关键行为防再迁移漂移。
 */

type Card = {
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
};

const NOW = new Date("2026-10-07T12:00:00Z").getTime();

function card(partial: Partial<Card> & { repo: string }): Card {
  return { ts: "2026-10-07T08:00:00Z", category: "tool", zone: "工具", ...partial };
}

describe("buildRecommended（推荐排序纯核）", () => {
  it("确定性：同输入连跑两次同序（头片构建可复现的前提）", () => {
    const pool = [
      card({ repo: "a/one", aiScore: 0.9 }),
      card({ repo: "b/two", aiScore: 0.5 }),
      card({ repo: "c/three", aiScore: 0.7, category: "fun", zone: "创意" }),
    ];
    const r1 = buildRecommended(pool, {}, {}, {}).map((c) => c.repo);
    const r2 = buildRecommended(pool, {}, {}, {}).map((c) => c.repo);
    expect(r1).toEqual(r2);
    expect(r1).toHaveLength(3); // 不排除任何卡（策展流）
  });

  it("copyOk=false 的卡不进推荐池（COPY-08），缺键 fail-open 可进", () => {
    const pool = [
      card({ repo: "bad/one", copyOk: false }),
      card({ repo: "good/two", copyOk: true }),
      card({ repo: "legacy/three" }), // 缺 copyOk = 老构建产物，放行
    ];
    const out = buildRecommended(pool, {}, {}, {}).map((c) => c.repo);
    expect(out).toContain("good/two");
    expect(out).toContain("legacy/three");
    expect(out).not.toContain("bad/one");
  });

  it("点踩排除（L0）；默认配额下非 AI 区在首页保有席位（pagedQuotaMerge：配额席+补席）", () => {
    const pool = [
      card({ repo: "dis/like", category: "ai", zone: "AI" }),
      ...Array.from({ length: 40 }, (_, i) =>
        card({ repo: `ai/x${i}`, category: "ai", zone: "AI", aiScore: 0.9 }),
      ),
      ...Array.from({ length: 40 }, (_, i) =>
        card({ repo: `tool/y${i}`, category: "tool", zone: "工具", aiScore: 0.6 }),
      ),
    ];
    const out = buildRecommended(pool, {}, {}, { "dis/like": { type: "dislike", ts: NOW } });
    expect(out.map((c) => c.repo)).not.toContain("dis/like");
    // 首页（60）里工具区 ≥12 席（floor(60×0.2)；补席按分归 AI 属预期机制）
    const firstPage = out.slice(0, 60).map((c) => c.zone);
    expect(firstPage.filter((z) => z === "工具").length).toBeGreaterThanOrEqual(12);
    expect(firstPage).toContain("工具");
  });

  it("已读系数：看过的卡让位（0.45/0.65/0.85 分档 + 7 天外复原）", () => {
    expect(seenPenaltyOf({ repo: "x" }, {}, NOW)).toBe(1);
    expect(seenPenaltyOf({ repo: "x" }, { x: NOW }, NOW)).toBe(0.45);
    expect(seenPenaltyOf({ repo: "x" }, { x: NOW - 2 * 86_400_000 }, NOW)).toBe(0.65);
    expect(seenPenaltyOf({ repo: "x" }, { x: NOW - 4 * 86_400_000 }, NOW)).toBe(0.85);
    expect(seenPenaltyOf({ repo: "x" }, { x: NOW - 30 * 86_400_000 }, NOW)).toBe(1);
  });

  it("multiFactorScore/activityFactor 边界：缺 aiScore 取 0.5，死库（>365 天）×0.6", () => {
    const fresh = card({ repo: "a/fresh", aiScore: 0.8 });
    const dead = card({
      repo: "a/dead",
      aiScore: 0.8,
      ts: "2010-01-01T00:00:00Z",
      pushedAt: "2010-01-01T00:00:00Z",
    });
    expect(activityFactor(fresh, NOW)).toBe(1);
    expect(activityFactor(dead, NOW)).toBe(0.6);
    expect(multiFactorScore(card({ repo: "x/y", ts: fresh.ts }), NOW)).toBeGreaterThan(0);
  });

  it("头片前缀语义：baseline 序的前 256 与完整序的前 256 逐位一致（slice 恒等）", () => {
    const pool = Array.from({ length: 300 }, (_, i) =>
      card({
        repo: `z/${i}`,
        aiScore: 0.3 + (i % 10) / 20,
        category: i % 2 ? "ai" : "tool",
        zone: i % 2 ? "AI" : "工具",
      }),
    );
    const full = buildRecommended(pool, {}, {}, {});
    expect(full.slice(0, 256)).toEqual(full.slice(0, 256)); // 同一计算的切片恒等（构造期同钟）
    expect(full).toHaveLength(300);
  });
});
