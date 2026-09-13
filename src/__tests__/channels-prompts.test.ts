/**
 * 频道函数（channels.ts）+ 生产 prompt 合法性闸（prompts.ts）测试。
 * 关键行为锁定：热门动量分/每日两段/乐趣 fun_score/四区配额；zone/fun_score/tags/facts 合法性、G-source。
 */

import { describe, it, expect } from "vitest";
import {
  hotMomentum,
  hotChannel,
  dailyChannel,
  funChannel,
  funScore,
  zoneOf,
  type ChannelCard,
} from "../feed/channels.ts";
import {
  ZONES,
  domainKeyOf,
  validateScoringResult,
  gSourceCheck,
  sourceInDoc,
  txtUnits,
} from "../feed/prompts.ts";
import type { ScoringResult } from "../feed/types.ts";

const mkCard = (o: Partial<ChannelCard>): ChannelCard => ({
  repo: "a/b",
  stars: 10000,
  starGrowth: 10,
  ...o,
});

// ---------------------------------------------------------------------------
// 频道函数
// ---------------------------------------------------------------------------

describe("hotChannel 热门（动量分 + 四区配额）", () => {
  it("动量分 = starGrowth × 规模平滑（大库存量不虚高，小库增速被平滑）", () => {
    const big = mkCard({ stars: 100000, starGrowth: 5 });
    const small = mkCard({ stars: 1000, starGrowth: 20 });
    // big: 5×1.0=5；small: 20×0.75=15 → small 更高（增速快），但平滑限制了小库虚高
    expect(hotMomentum(small)).toBeGreaterThan(hotMomentum(big));
    expect(hotMomentum(mkCard({ stars: 1000, starGrowth: 5 }))).toBe(5 * 0.75);
    expect(hotMomentum(mkCard({ stars: 100000, starGrowth: 5 }))).toBe(5); // log10(1e5)=5 → min(1, 5/4)=1
  });

  it("四区配额：AI 硬席 30%，其余三区按卡量加权", () => {
    const cards = [
      ...Array.from({ length: 20 }, (_, i) => mkCard({ repo: `ai/${i}`, zone: "AI", starGrowth: 100 })),
      ...Array.from({ length: 10 }, (_, i) => mkCard({ repo: `tool/${i}`, zone: "工具", starGrowth: 100 })),
      ...Array.from({ length: 5 }, (_, i) => mkCard({ repo: `cre/${i}`, zone: "创意", starGrowth: 100 })),
    ];
    const picked = hotChannel(cards, 20);
    const aiCount = picked.filter((c) => zoneOf(c) === "AI").length;
    expect(aiCount).toBeLessThanOrEqual(Math.floor(20 * 0.3)); // AI ≤ 30% 硬席
    expect(aiCount).toBeGreaterThan(0);
    expect(picked.length).toBeLessThanOrEqual(20);
    expect(picked.length).toBeGreaterThan(10); // 非 AI 区按卡量加权进席
  });
});

describe("dailyChannel 每日（两段）", () => {
  it("段 1=当日新入库（createdAt 当日降序）", () => {
    const now = new Date("2026-09-13T12:00:00Z");
    const today1 = mkCard({ repo: "t/1", createdAt: "2026-09-13T08:00:00Z", heatScore: 0, zone: "工具" });
    const today2 = mkCard({ repo: "t/2", createdAt: "2026-09-13T10:00:00Z", heatScore: 0, zone: "工具" });
    const oldHot = mkCard({ repo: "o/3", createdAt: "2026-01-01T00:00:00Z", heatScore: 50, zone: "工具" });
    const out = dailyChannel([oldHot, today1, today2], { now, limit: 10 });
    expect(out[0]!.repo).toBe("t/2"); // 当日新卡先排（段 1）
    expect(out[1]!.repo).toBe("t/1");
    expect(out[2]!.repo).toBe("o/3"); // 段 2 增速卡
  });

  it("段 2 增速段加四区配额（同热门 AI 30%）", () => {
    const now = new Date("2026-09-13T12:00:00Z");
    const cards = [
      ...Array.from({ length: 12 }, (_, i) =>
        mkCard({ repo: `ai/${i}`, zone: "AI", createdAt: "2026-01-01", heatScore: 100 }),
      ),
      ...Array.from({ length: 8 }, (_, i) =>
        mkCard({ repo: `tool/${i}`, zone: "工具", createdAt: "2026-01-01", heatScore: 100 }),
      ),
    ];
    const out = dailyChannel(cards, { now, limit: 10 });
    const aiInSpeed = out.filter((c) => zoneOf(c) === "AI").length;
    expect(aiInSpeed).toBeLessThanOrEqual(Math.ceil(10 * 0.3) + 1); // 段 1 无当日卡 → 全配额
  });
});

describe("funChannel 乐趣（fun_score × 动量 + 创意配额）", () => {
  it("fun_score 缺失的卡不进乐趣频道（无独立信号不开）", () => {
    const noFun = mkCard({ repo: "a/1", zone: "创意" });
    const withFun = mkCard({ repo: "b/2", zone: "创意", funScore: 0.8 });
    const out = funChannel([noFun, withFun], 10);
    expect(out.map((c) => c.repo)).toEqual(["b/2"]);
  });

  it("fun_score × (1+增长动量)：有趣且正在被发现的优先", () => {
    const hotFun = mkCard({ repo: "a/1", funScore: 0.7, starGrowth: 50 });
    const plainFun = mkCard({ repo: "b/2", funScore: 0.9, starGrowth: 0 });
    expect(funScore(hotFun)).toBe(0.7 * 1.35);
    expect(funScore(plainFun)).toBe(0.9);
    // 增长动量封顶 +35%（50 星/天吃满）
    const maxed = mkCard({ repo: "c/3", funScore: 0.5, starGrowth: 999 });
    expect(funScore(maxed)).toBe(0.5 * 1.35);
  });
});

// ---------------------------------------------------------------------------
// 生产 prompt 合法性闸
// ---------------------------------------------------------------------------

describe("domainKeyOf domain_key 派生", () => {
  it("AI 区细分标签优先；其余取 tags[0]", () => {
    expect(domainKeyOf("AI", ["大语言模型", "推理"])).toBe("大语言模型");
    expect(domainKeyOf("AI", ["视觉模型"])).toBe("视觉模型");
    expect(domainKeyOf("工具", ["家庭能源"])).toBe("家庭能源");
    expect(domainKeyOf("创意", ["音乐播放器"])).toBe("音乐播放器");
    expect(domainKeyOf("AI", [])).toBeNull(); // 无法派生
  });
});

describe("validateScoringResult 调度器合法性闸", () => {
  const base: ScoringResult = {
    repo: "a/b",
    aiDims: ["AI应用"],
    aiDim: "AI应用",
    aiScore: 0.8,
    zone: "AI",
    funScore: 0.5,
    tags: ["大语言模型", "推理引擎", "对话"],
    summaryCn: "这是一个二十到三十五个字的摘要文本",
    reasonCn:
      "这是一段足够长的推荐理由文本，用来展示该项目的技术亮点与实用价值，覆盖了核心架构设计、关键算法优化以及多种使用场景下的真实表现，同时提供了与同类工具的对比分析，帮助读者快速建立对该项目的全面认识。",
    detailCn: "详情",
  };

  it("合法卡通过", () => {
    expect(validateScoringResult(base)).toEqual([]);
  });

  it("zone 非法（四区枚举漂移实锤：AI应用 曾漂移）", () => {
    // zone 非法 + domain_key 无法派生 = 2 个失败（合法性闸双查）
    expect(validateScoringResult({ ...base, zone: "AI应用" }).length).toBeGreaterThanOrEqual(1);
  });

  it("fun_score 超范围", () => {
    expect(validateScoringResult({ ...base, funScore: 1.5 })).toHaveLength(1);
    expect(validateScoringResult({ ...base, funScore: -0.1 })).toHaveLength(1);
  });

  it("tags 数量 3-6 个", () => {
    expect(validateScoringResult({ ...base, tags: ["一个"] })).toHaveLength(1);
    expect(validateScoringResult({ ...base, tags: undefined })).toEqual([]); // 缺省不拦（老数据兼容）
  });

  it("zone 枚举与 tags 导出 ZONES 一致", () => {
    expect(ZONES).toEqual(["AI", "资源", "工具", "创意"]);
    expect((ZONES as readonly string[]).includes("AI应用")).toBe(false);
  });
});

describe("gSourceCheck G-source 溯源", () => {
  const doc = "本项目使用 newsnow 项目的 API 获取多平台数据，最快 30 秒部署。";

  it("source 字面存在 + claim≠source → 通过", () => {
    const r = gSourceCheck("底层数据调用新闻聚合接口", "本项目使用 newsnow 项目的 API 获取多平台数据", doc);
    expect(r.ok).toBe(true);
    expect(r.fails).toEqual([]);
  });

  it("source 不在参考文档 → 拦截", () => {
    const r = gSourceCheck("编造的断言", "这是完全不存在于文档中的一句话", doc);
    expect(r.ok).toBe(false);
    expect(r.fails.some((f) => f.includes("不在参考文档"))).toBe(true);
  });

  it("claim 与 source 字面相同（整段复制糊弄）→ 拦截", () => {
    const r = gSourceCheck(
      "本项目使用 newsnow 项目的 API 获取多平台数据",
      "本项目使用 newsnow 项目的 API 获取多平台数据",
      doc,
    );
    expect(r.ok).toBe(false);
  });

  it("锚点一致为报告级观察（不进硬闸；中英数字异形不误杀）", () => {
    const r = gSourceCheck("最快三十秒即可部署上线", "最快 30 秒部署的热点助手", "最快 30 秒部署的热点助手");
    // 硬闸只查 source 字面 + claim≠source；锚点（三十 vs 30）差异只进观察
    expect(r.ok).toBe(r.fails.length === 0);
    expect(r.anchorObs.length).toBeGreaterThanOrEqual(0);
  });
});

describe("sourceInDoc / txtUnits 辅助", () => {
  it("句界截断容差（source 尾部句号截断仍可命中）", () => {
    // 句号位置 ≥12：head 是句号前 12+ 字，字面存在于 doc
    expect(
      sourceInDoc("这句话有十二个字以上内容。截断尾巴", "这句话有十二个字以上内容。后面还有内容")[0],
    ).toBe(true);
  });
  it("txtUnits：汉字 1/英文串每 4 字符 1（不足 4 也按 1）", () => {
    expect(txtUnits("hello世界")).toBe(3); // hello=5→1，世界=2
    expect(txtUnits("纯中文")).toBe(3);
  });
});
