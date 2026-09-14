/**
 * G-sim 生产端检查器（similarity.ts）测试：
 * 词袋/相似度口径同源、触发条件（1000 卡 / 单 zone 50 卡）、
 * 滚动报告（直方图/超阈值占比）、近重复降权（无排除只降权、强弱判据）。
 */

import { describe, it, expect } from "vitest";
import {
  bagOf,
  jaccard,
  shouldRunGsim,
  similarityReport,
  dedupPenalty,
  GSIM_TRIGGER_TOTAL,
  GSIM_TRIGGER_ZONE,
} from "../feed/similarity.ts";

describe("bagOf / jaccard 口径", () => {
  it("中文 3-gram + 英文词，空文本给空袋", () => {
    expect(bagOf("").size).toBe(0);
    expect(bagOf("   ").size).toBe(0);
    const b = bagOf("推理引擎 OpenAI");
    // 中文「推理引擎」→ 2 个 3-gram（推理引/理引擎）；英文 openai
    expect([...b].some((x) => x.startsWith("w:"))).toBe(true);
    expect([...b].filter((x) => !x.startsWith("w:")).length).toBe(2);
  });

  it("相同文本相似度 1，无关文本接近 0", () => {
    expect(jaccard(bagOf("完全一样的句子内容"), bagOf("完全一样的句子内容"))).toBe(1);
    expect(jaccard(bagOf("完全不一样的甲"), bagOf("毫不相干乙"))).toBe(0);
  });

  it("空袋不参与相似度（返回 0，不除零）", () => {
    expect(jaccard(new Set(), bagOf("内容"))).toBe(0);
  });
});

describe("触发条件（1000 卡 / 单 zone 50 卡）", () => {
  it("低于两个门 → 不触发", () => {
    // 三区各 30/20/20：单区 <50 且总数 <1000 → 两个门都没到
    const cards = [
      ...Array.from({ length: 30 }, () => ({ zone: "AI" })),
      ...Array.from({ length: 20 }, () => ({ zone: "工具" })),
      ...Array.from({ length: 20 }, () => ({ zone: "资源" })),
    ];
    expect(shouldRunGsim(cards).triggered).toBe(false);
  });

  it("单 zone 满 50 → 触发（含原因）", () => {
    const cards = Array.from({ length: 60 }, () => ({ zone: "AI" }));
    const r = shouldRunGsim(cards);
    expect(r.triggered).toBe(true);
    expect(r.reasons.join()).toContain("AI");
    expect(GSIM_TRIGGER_ZONE).toBe(50);
  });

  it("累计满 1000 → 触发（即使各 zone 都 <50）", () => {
    const cards = Array.from({ length: GSIM_TRIGGER_TOTAL }, (_, i) => ({
      zone: `Z${i % 40}`,
    }));
    const r = shouldRunGsim(cards);
    expect(r.triggered).toBe(true);
    expect(r.reasons.some((x) => x.includes("累计卡数"))).toBe(true);
  });

  it("无 zone 字段时用 category 兜底", () => {
    const cards = Array.from({ length: 50 }, () => ({ category: "ai" }));
    expect(shouldRunGsim(cards).triggered).toBe(true);
  });
});

describe("similarityReport 滚动报告", () => {
  const mk = (repo: string, detailCn: string, zone = "AI") => ({ repo, detailCn, zone });

  it("样本不足 2 张 → 空报告（不阻塞生产）", () => {
    const r = similarityReport([mk("a/1", "只有一张卡的正文内容")]);
    expect(r.pairs).toBe(0);
    expect(r.histogram).toEqual([]);
  });

  it("近重复卡进入高相似度桶（阈值以上占比 > 0）", () => {
    const same = "这是一个用来做推理引擎加速的开源项目，支持多种量化方案。";
    const cards = [
      mk("a/1", same),
      mk("a/2", same),
      mk("a/3", same),
      mk("b/1", "完全不同的另一个项目：家庭能源监控面板，读取电表数据。"),
    ];
    const r = similarityReport(cards, { sampleSize: 10 });
    expect(r.pairs).toBe(6);
    expect(r.max).toBe(1);
    expect(r.overRatio).toBeGreaterThan(0);
    expect(r.histogram.length).toBeGreaterThan(0);
  });

  it("全异质 → 超阈值占比为 0", () => {
    const cards = [
      mk("a/1", "推理引擎量化加速"),
      mk("b/1", "家庭能源监控面板"),
      mk("c/1", "音乐播放器本地曲库"),
    ];
    const r = similarityReport(cards, { sampleSize: 10 });
    expect(r.overRatio).toBe(0);
  });

  it("无 detailCn 时回退 summaryCn", () => {
    const r = similarityReport(
      [
        { repo: "a/1", summaryCn: "同样的摘要文本内容在这里" },
        { repo: "a/2", summaryCn: "同样的摘要文本内容在这里" },
      ],
      { sampleSize: 10 },
    );
    expect(r.max).toBe(1);
  });
});

describe("dedupPenalty 近重复降权（无排除只降权）", () => {
  const mk = (repo: string, score: number, detailCn: string) => ({ repo, score, detailCn });

  it("弱的那个降权，强的保持原分；数量不变（不排除）", () => {
    const same = "这是一个用来做推理引擎加速的开源项目，支持多种量化方案。";
    const cards = [
      mk("strong/1", 0.9, same),
      mk("weak/1", 0.4, same),
      mk("other/1", 0.5, "家庭能源监控面板读取电表数据"),
    ];
    const { cards: out, duplicates } = dedupPenalty(cards, { penalty: 0.3, sampleSize: 10 });
    expect(out.length).toBe(3);
    expect(out.find((c) => c.repo === "strong/1")!.score).toBe(0.9);
    expect(out.find((c) => c.repo === "weak/1")!.score).toBeCloseTo(0.28, 5);
    expect(out.find((c) => c.repo === "other/1")!.score).toBe(0.5);
    expect(duplicates.get("weak/1")).toBe(1);
  });

  it("penalty=0 → 只标记不降权", () => {
    const same = "同样的内容文本用于测试降权开关";
    const cards = [mk("a/1", 0.9, same), mk("a/2", 0.4, same)];
    const { cards: out } = dedupPenalty(cards, { penalty: 0, sampleSize: 10 });
    expect(out.find((c) => c.repo === "a/2")!.score).toBe(0.4);
  });

  it("不改原对象（纯函数语义）", () => {
    const same = "同样的内容文本用于测试纯函数";
    const cards = [mk("a/1", 0.9, same), mk("a/2", 0.4, same)];
    dedupPenalty(cards, { penalty: 0.5, sampleSize: 10 });
    expect(cards[1]!.score).toBe(0.4);
  });

  it("无近重复 → 原样返回", () => {
    const cards = [mk("a/1", 0.9, "推理引擎"), mk("b/1", 0.5, "能源监控"), mk("c/1", 0.3, "音乐播放器")];
    const { cards: out, duplicates } = dedupPenalty(cards, { penalty: 0.3, sampleSize: 10 });
    expect(out.map((c) => c.score)).toEqual([0.9, 0.5, 0.3]);
    expect(duplicates.size).toBe(0);
  });
});
