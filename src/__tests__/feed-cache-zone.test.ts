/**
 * 缓存命中卡「判定字段不丢」回归测试（2026-09-14 事故固化）。
 *
 * 事故：`loadExistingScores` 只从 baseline 带回白名单字段（repo/aiDims/aiDim/aiScore/
 * summaryCn/reasonCn/detailCn），**漏了 zone / funScore / domainTags**。
 * 由于「历史卡零重评」铁律，缓存命中卡不会被重新判定 → 下一轮重建 feed 时
 * 这些字段直接消失。实测后果：线上 zone 覆盖率 **100% → 0.2%**
 * （一次 tier-drip 就把回填成果整片抹平）。
 *
 * 本测试锁死行为：凡 baseline 卡带 zone/funScore/domainTags(/来源标)，
 * loadExistingScores 必须原样带回；来源标缺失时按「有 zone ⇒ model」推断。
 */

import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadExistingScores } from "../feed/index.ts";

const tmpFiles: string[] = [];

function writeBaseline(cards: unknown[]): string {
  const p = path.join(os.tmpdir(), `gittok-baseline-${Date.now()}-${Math.random()}.json`);
  fs.writeFileSync(p, JSON.stringify(cards), "utf-8");
  tmpFiles.push(p);
  return p;
}

afterEach(() => {
  for (const f of tmpFiles.splice(0)) {
    try {
      fs.unlinkSync(f);
    } catch {
      /* 忽略清理失败 */
    }
  }
});

const baseCard = (over: Record<string, unknown>) => ({
  repo: "owner/name",
  desc: "d",
  stars: 1000,
  starGrowth: 10,
  language: "TypeScript",
  topics: [],
  aiDims: ["AI应用"],
  aiDim: "AI应用",
  aiScore: 0.8,
  summaryCn: "一句话",
  reasonCn: "简要介绍",
  detailCn: "详情",
  tags: [],
  url: "https://github.com/owner/name",
  ts: "2026-09-14T00:00:00Z",
  category: "ai",
  momentum: [],
  fromOfficial: false,
  ...over,
});

describe("loadExistingScores 必须带回判定字段（防「重建即丢分区」事故复发）", () => {
  it("zone / funScore / domainTags 原样往返（缺来源标时 zone ⇒ model 推断）", () => {
    const p = writeBaseline([
      baseCard({ zone: "创意", funScore: 0.72, domainTags: ["绘画工具", "创意编程", "绘图"] }),
    ]);
    const { scores } = loadExistingScores(p);
    const sc = scores.get("owner/name");
    expect(sc).toBeDefined();
    expect(sc!.zone).toBe("创意");
    expect(sc!.funScore).toBe(0.72);
    expect(sc!.tags).toEqual(["绘画工具", "创意编程", "绘图"]);
    expect(sc!.zoneSource).toBe("model"); // 有 zone 无来源标 → 推断 model
  });

  it("显式来源标优先保留（derived 不被改写成 model）", () => {
    const p = writeBaseline([
      baseCard({
        repo: "a/derived",
        zone: "工具",
        zoneSource: "derived",
        funScore: 0.1,
        funScoreSource: "derived",
      }),
    ]);
    const { scores } = loadExistingScores(p);
    const sc = scores.get("a/derived")!;
    expect(sc.zoneSource).toBe("derived");
    expect(sc.funScoreSource).toBe("derived");
  });

  it("无判定字段的卡不产生假来源标", () => {
    const p = writeBaseline([baseCard({ repo: "b/plain" })]);
    const sc = loadExistingScores(p).scores.get("b/plain")!;
    expect(sc.zone).toBeUndefined();
    expect(sc.zoneSource).toBeUndefined();
    expect(sc.tags).toBeUndefined();
  });

  it("多卡混合：带判定与不带的都各归各位", () => {
    const p = writeBaseline([
      baseCard({ repo: "c/1", zone: "AI", funScore: 0.4, domainTags: ["AI Agent", "RAG", "LangChain"] }),
      baseCard({ repo: "c/2" }),
      baseCard({ repo: "c/3", zone: "资源", funScore: 0, domainTags: ["教程", "文档", "入门"] }),
    ]);
    const { scores } = loadExistingScores(p);
    expect(scores.get("c/1")!.zone).toBe("AI");
    expect(scores.get("c/2")!.zone).toBeUndefined();
    expect(scores.get("c/3")!.zone).toBe("资源");
    expect(scores.get("c/3")!.funScore).toBe(0); // 0 是有效值，不能被当成 falsy 丢掉
  });

  it("detailCn 仍进 detailMap（原有行为不回归）", () => {
    const p = writeBaseline([baseCard({ repo: "d/1", detailCn: "很长的详情文本" })]);
    const { detailMap } = loadExistingScores(p);
    expect(detailMap.get("d/1")).toBe("很长的详情文本");
  });

  it("facts 原样往返（2026-09-18 事故固化：v4 上线漏了这行，重建即被置空）", () => {
    const facts = [
      { claim: "内置名为 Captain 的 AI 助手", source: "Captain helps you" },
      { claim: "支持多渠道接入", source: "WhatsApp, email, web" },
    ];
    const p = writeBaseline([baseCard({ repo: "e/1", facts })]);
    const sc = loadExistingScores(p).scores.get("e/1")!;
    expect(sc.facts).toEqual(facts);
  });

  it("无 facts 的卡不产生空数组（保持 undefined，避免假数据）", () => {
    const p = writeBaseline([baseCard({ repo: "e/plain" })]);
    const sc = loadExistingScores(p).scores.get("e/plain")!;
    expect(sc.facts).toBeUndefined();
  });

  it("topics / desc / language 原样带回（H-04：2026-09-19 补的白名单缺项，同一条纪律）", () => {
    const p = writeBaseline([
      baseCard({ repo: "f/1", topics: ["cli", "rust", "grep"], desc: "a line searcher", language: "Rust" }),
    ]);
    const sc = loadExistingScores(p).scores.get("f/1")!;
    expect(sc.topics).toEqual(["cli", "rust", "grep"]);
    expect(sc.desc).toBe("a line searcher");
    expect(sc.language).toBe("Rust");
  });

  it("topics 非数组的脏数据不夹带（宁缺毋滥，回退由装配端处理）", () => {
    const p = writeBaseline([baseCard({ repo: "f/2", topics: undefined })]);
    const sc = loadExistingScores(p).scores.get("f/2")!;
    expect(sc.topics ?? []).toEqual([]);
  });

  /**
   * 装配端契约锁（源码字符串契约，同 chrome-layout / open-regression 的风格）。
   *
   * 为什么只测 loadExistingScores 不够：2026-09-18 的 facts 事故是**半修**——白名单补了、
   * `partialCard` 那行没补，重建照样丢。topics 这一轮同时改两端，故把「装配端必须回退 cache」
   * 也钉成可跑断言：将来有人把兜底改回 `m.topics` 单源，这里立刻红。
   */
  it("装配端 partialCard 对 desc/language/topics 三处都有 cache 兜底（防「只补白名单」的半修）", () => {
    const src = fs.readFileSync(path.join(__dirname, "..", "feed", "index.ts"), "utf-8");
    const assembly = src.slice(src.indexOf("const partialCard = {"), src.indexOf("cards.push({"));
    const preamble = src.slice(src.indexOf("const [owner = "), src.indexOf("const partialCard = {"));
    expect(preamble).toContain("m.desc || sc.desc");
    expect(preamble).toContain("m.language || sc.language");
    expect(preamble).toContain("m.topics?.length");
    expect(preamble).toContain("sc.topics");
    // 装配字段与 buildTags 都必须吃解析后的局部变量，不能再直读 m.*（否则兜底形同虚设）
    expect(assembly).toMatch(/^\s*desc,\s*$/m);
    expect(assembly).toMatch(/^\s*language,\s*$/m);
    expect(assembly).toMatch(/^\s*topics,\s*$/m);
    expect(assembly).toContain("buildTags(sc.aiDims, topics, language)");
  });
});
