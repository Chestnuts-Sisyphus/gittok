/**
 * 乐趣反馈闭环测试（G-B2①）。
 *
 * 背景：funScore 此前只有产出没有修正——点赞/点踩/收藏只进 localStorage 当推荐权重，
 * **不回写 funScore**，所以「乐趣」这个轴学不到用户的真实口味。修法见 feedback-score.ts。
 *
 * 这里锁死三件事：①方向正确（点赞加、点踩减）②幅度不对称（扣分重于加分）③排序真的会变。
 */

import { describe, it, expect } from "vitest";
import {
  FEEDBACK_DELTA,
  applyFeedbackToFun,
  funScoreDelta,
  funScoreWithFeedback,
} from "../feedback-score.ts";

describe("反馈 → funScore 回写", () => {
  it("方向：点赞/收藏加分，点踩扣分", () => {
    expect(funScoreDelta({ type: "like", ts: 1 })).toBeGreaterThan(0);
    expect(funScoreDelta({ type: "bookmark", ts: 1 })).toBeGreaterThan(0);
    expect(funScoreDelta({ type: "dislike", ts: 1 })).toBeLessThan(0);
    expect(funScoreDelta(undefined)).toBe(0);
  });

  it("不对称：点踩的扣分幅度大于点赞的加分（错判比漏判更烦人）", () => {
    expect(Math.abs(FEEDBACK_DELTA["dislike"]!)).toBeGreaterThan(FEEDBACK_DELTA["like"]!);
  });

  it("夹到 [0,1]：高分卡点赞不越界、低分卡点踩不越界", () => {
    expect(funScoreWithFeedback(0.9, { type: "like", ts: 1 })).toBeLessThanOrEqual(1);
    expect(funScoreWithFeedback(0.1, { type: "dislike", ts: 1 })).toBe(0);
  });

  it("funScore 缺失按 0 处理（不产生 NaN）", () => {
    expect(funScoreWithFeedback(undefined, { type: "like", ts: 1 })).toBe(FEEDBACK_DELTA["like"]);
    expect(Number.isFinite(funScoreWithFeedback(undefined, undefined))).toBe(true);
  });

  it("批量应用返回新数组、不改原对象（React memo 友好）", () => {
    const cards = [
      { repo: "a/1", funScore: 0.4 },
      { repo: "b/2", funScore: 0.5 },
    ];
    const out = applyFeedbackToFun(cards, { "a/1": { type: "like", ts: 1 } });
    expect(out).not.toBe(cards);
    expect(cards[0]!.funScore).toBe(0.4); // 原对象未被就地改
    expect(out[0]!.funScore).toBeCloseTo(0.4 + FEEDBACK_DELTA["like"]!, 5);
    expect(out[1]).toBe(cards[1]); // 无互动的卡原样返回（引用相等，省一次重渲染）
  });

  it("反馈能改变乐趣频道的排序（点踩把高乐趣卡压下去）", () => {
    const cards = [
      { repo: "hi/1", funScore: 0.9, zone: "创意", domainKey: "甲" },
      { repo: "lo/2", funScore: 0.5, zone: "创意", domainKey: "乙" },
    ];
    const adjusted = applyFeedbackToFun(cards, { "hi/1": { type: "dislike", ts: 1 } });
    // 0.9 - 0.3 = 0.6 > 0.5 仍在前面，但差距被大幅压缩——
    // 再加一次点踩就会翻到后面（单次互动不掀翻大秩序，多次互动才翻）
    expect(adjusted[0]!.funScore).toBeCloseTo(0.6, 5);
    const twice = applyFeedbackToFun(adjusted, { "hi/1": { type: "dislike", ts: 1 } });
    expect(twice[0]!.funScore).toBeCloseTo(0.3, 5);
    expect(twice[0]!.funScore).toBeLessThan(adjusted[1]!.funScore!);
  });
});
