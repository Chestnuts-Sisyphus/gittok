/**
 * 分档队列（tiers.ts）测试：
 * 候选排序（档位优先→星级降序）、进度盘账（覆盖率/当前档）、剩余时间估算。
 */

import { describe, it, expect } from "vitest";
import { tierCandidates, tierProgress, estimateRemaining } from "../feed/tiers.ts";
import type { TierIndexShape } from "../feed/tiers.ts";

const idx = (repos: Record<string, number>): TierIndexShape => ({
  tiers: {},
  repos: Object.fromEntries(
    Object.entries(repos).map(([repo, stars]) => [
      repo,
      { stars, tier: stars >= 10000 ? "t1" : stars >= 5000 ? "t2" : "t3" },
    ]),
  ),
});

describe("tierCandidates 分档候选排序", () => {
  it("档位优先（t1→t2→t3），同档内星级降序；已完成的排除", () => {
    const index = idx({
      "a/low5k": 4000,
      "b/top": 50000,
      "c/mid": 7000,
      "d/high": 12000,
      "e/done": 20000,
    });
    const out = tierCandidates(index, new Set(["e/done"]));
    expect(out.map((r) => r.repo)).toEqual(["b/top", "d/high", "c/mid", "a/low5k"]);
    expect(out.map((r) => r.tier)).toEqual(["t1", "t1", "t2", "t3"]);
  });

  it("limit 截断（海选窗用：只取队首 N 个＝当前档优先）", () => {
    const index = idx({ "x/1": 1000, "y/2": 20000, "z/3": 30000 });
    const out = tierCandidates(index, new Set(), { limit: 2 });
    expect(out.map((r) => r.repo)).toEqual(["z/3", "y/2"]);
  });

  it("索引缺 repos → 空列表（降级不抛）", () => {
    expect(tierCandidates({}, new Set())).toEqual([]);
  });
});

describe("tierProgress 进度盘账", () => {
  it("按档统计 done/total/覆盖率，并指出当前推进档（首个未满档）", () => {
    const index = idx({ "a/1": 20000, "b/2": 30000, "c/3": 6000, "d/4": 1200 });
    const cards = [{ repo: "a/1" }, { repo: "b/2" }]; // t1 两张已完成
    const p = tierProgress(index, cards);
    expect(p.tiers["t1"]).toMatchObject({ total: 2, done: 2, coverage: 1 });
    expect(p.tiers["t2"]).toMatchObject({ total: 1, done: 0, coverage: 0 });
    expect(p.activeTier).toBe("t2"); // t1 完成后轮到 t2
  });

  it("全部完成 → 无 activeTier", () => {
    const index = idx({ "a/1": 20000 });
    const p = tierProgress(index, [{ repo: "a/1" }]);
    expect(p.activeTier).toBeUndefined();
  });

  it("与上轮对比给出本轮增量（lastRunDelta）", () => {
    const index = idx({ "a/1": 20000, "b/2": 30000 });
    const prev = tierProgress(index, [{ repo: "a/1" }]);
    const now = tierProgress(index, [{ repo: "a/1" }, { repo: "b/2" }], prev);
    expect(now.tiers["t1"]!.done).toBe(2);
    expect(now.tiers["t1"]!.lastRunDelta).toBe(1);
  });
});

describe("estimateRemaining 剩余时间估算", () => {
  it("按吞吐线性外推各档剩余时间并合计", () => {
    const index = idx({ "a/1": 20000, "b/2": 30000, "c/3": 6000 });
    const p = tierProgress(index, [{ repo: "a/1" }]); // t1: 1/2, t2: 0/1
    // 每轮 1 卡、每轮 60 分钟 → t1 剩 1 卡 = 1 轮 = 1h；t2 剩 1 卡 = 1h → 合计 2h
    const est = estimateRemaining(p, 1, 60);
    expect(est.hours).toBeCloseTo(2, 5);
    expect(est.text).toContain("t1");
    expect(est.text).toContain("小时");
  });

  it("吞吐为 0（样本不足）→ 不崩、标 ∞", () => {
    const index = idx({ "a/1": 20000 });
    const p = tierProgress(index, []);
    const est = estimateRemaining(p, 0, 30);
    expect(est.text).toContain("∞");
  });
});
