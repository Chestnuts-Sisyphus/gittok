/**
 * 覆盖账单元测试（D6）。
 *
 * 事故：`coveredPrev` 从 data/tier-covered.json 读出来只打了条日志，**从未参与判断**——
 * 所谓「增量模式」是假的，每轮都把整个星数域重新抓一遍（白烧 GitHub search 配额）。
 * 这里锁死判断函数的行为，防止再退化回「只读不判」。
 */

import { describe, it, expect } from "vitest";
import { isRangeCovered, mergeRanges } from "../../scripts/gittok-tier-index.ts";

describe("D6 覆盖账：区间已覆盖判断", () => {
  const ranges: Array<[number, number | null]> = [
    [0, 999],
    [1000, 4999],
    [5000, null], // 上界开放（抓到顶）
  ];

  it("完全包含在已覆盖区间内 → 跳过", () => {
    expect(isRangeCovered(0, 999, ranges)).toBe(true);
    expect(isRangeCovered(1200, 3000, ranges)).toBe(true);
  });

  it("开放上界覆盖一切更高的区间", () => {
    expect(isRangeCovered(5000, -1, ranges)).toBe(true);
    expect(isRangeCovered(999_999, -1, ranges)).toBe(true);
  });

  it("未覆盖的区间不跳过（否则会漏抓）", () => {
    expect(isRangeCovered(500, 1500, ranges)).toBe(false); // 跨两个区间的缝
    expect(isRangeCovered(0, 1000, ranges)).toBe(false); // 超出 [0,999]
    expect(isRangeCovered(2000, 6000, ranges)).toBe(false); // 跨 [1000,4999]/[5000,∞) 边界但起点在中间
  });

  it("空账 → 一律不跳过（首次全量）", () => {
    expect(isRangeCovered(0, 999, [])).toBe(false);
  });
});

describe("D6 覆盖账：区间合并", () => {
  it("相邻/重叠区间并起来（防账本无限膨胀）", () => {
    expect(
      mergeRanges(
        [
          [0, 499],
          [500, 999],
        ],
        [],
      ),
    ).toEqual([[0, 999]]);
    expect(mergeRanges([[0, 600]], [[500, 999]])).toEqual([[0, 999]]);
  });

  it("不相邻的区间保持分开", () => {
    expect(mergeRanges([[0, 100]], [[200, 300]])).toEqual([
      [0, 100],
      [200, 300],
    ]);
  });

  it("开放上界（null）吸收右侧一切", () => {
    expect(mergeRanges([[5000, null]], [[6000, 9000]])).toEqual([[5000, null]]);
  });
});
