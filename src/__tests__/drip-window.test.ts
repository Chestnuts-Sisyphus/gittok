/**
 * 滴灌小轮窗口语义测试（GT-0906-01 连环刀）。
 *
 * 锁三件事（SCREEN_CAP=4 < 池 6 的滴灌形态）：
 * 1. 海选窗口 fresh-filter：已海选未精评的仓库不占窗，窗口每轮推进 cap 数（旧代码只推进 prose 数）；
 * 2. 未进窗仓库（cap 截断）不烧逐仓重评、也不进待补评队列——它们只是排队未轮到；
 * 3. 下轮窗口推进到上轮未进窗的仓库（滴灌链能收敛的核心）。
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import path from "node:path";
import type { RadarConfig } from "../config.ts";
import type { TrendingData } from "../trending.ts";

// 必须在 import index.ts 之前生效：index 模块加载即读环境变量
vi.hoisted(() => {
  process.env["SCREEN_CAP"] = "4";
  process.env["PROSE_TOP_K"] = "4";
  process.env["SCORING_BUDGET_MS"] = "600000";
});

// ---------------------------------------------------------------------------
// 内存文件系统（feed-pending.test.ts 同款）
// ---------------------------------------------------------------------------
const { memFs, prompts } = vi.hoisted(() => ({
  memFs: new Map<string, string>(),
  prompts: [] as string[],
}));

vi.mock("node:fs", () => ({
  default: {
    existsSync: (p: string) => memFs.has(String(p)),
    readFileSync: (p: string, _enc?: string) => {
      const k = String(p);
      if (!memFs.has(k)) throw new Error(`ENOENT: no such file '${k}'`);
      return memFs.get(k);
    },
    writeFileSync: (p: string, data: unknown) => {
      memFs.set(String(p), String(data));
    },
    mkdirSync: () => {},
    unlinkSync: (p: string) => {
      memFs.delete(String(p));
    },
  },
  existsSync: (p: string) => memFs.has(String(p)),
  readFileSync: (p: string, _enc?: string) => {
    const k = String(p);
    if (!memFs.has(k)) throw new Error(`ENOENT: no such file '${k}'`);
    return memFs.get(k);
  },
  writeFileSync: (p: string, data: unknown) => {
    memFs.set(String(p), String(data));
  },
  mkdirSync: () => {},
  unlinkSync: (p: string) => {
    memFs.delete(String(p));
  },
}));

// LLM mock：海选批（无 reason_cn）对 prompt 里点名的仓库逐个给 phase1 JSON；
// 精评批给全文案 JSON。全程记录 prompt 供窗口推进断言。
const { llmMock } = vi.hoisted(() => ({ llmMock: { impl: null as null | ((prompt: string) => string) } }));

vi.mock("../report.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../report.ts")>();
  return {
    ...actual,
    callLlm: vi.fn(async (prompt: string) => {
      prompts.push(prompt);
      if (!llmMock.impl) throw new Error("llmMock.impl not set");
      return llmMock.impl(prompt);
    }),
  };
});

vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 404 })) as unknown as typeof fetch);

import { generateFeed } from "../feed/index.ts";

const cfg: RadarConfig = {
  cliRepos: [],
  skillsRepo: "",
  openclaw: { id: "", repo: "", name: "" },
  openclawPeers: [],
  bigbros: [],
  trendingTopics: [],
  starThreshold: 10,
  interests: {
    ai: 0.5,
    fun: 0.3,
    practical: 0.3,
    aiInterestsText: "AI、好玩、实用",
  },
};

/** 6 仓库池：stars 随序号递增 → 海选窗（cap 4，按星降序）= three/four/five/six，未进窗 = one/two */
function makePool(): TrendingData {
  const names = ["pool/one", "pool/two", "pool/three", "pool/four", "pool/five", "pool/six"];
  return {
    trendingRepos: names.map((fullName, i) => ({
      fullName,
      description: `描述 ${i}`,
      language: "TypeScript",
      todayStars: 5,
      totalStars: 100 + i,
      forks: 10,
      url: `https://github.com/${fullName}`,
    })),
    searchRepos: [],
    trendingFetchSuccess: true,
  };
}

/** 从 prompt 里提取点名的 owner/repo 列表（海选/精评 prompt 的行格式：`N. owner/repo — …`） */
function namedRepos(prompt: string): string[] {
  return [...prompt.matchAll(/^\s*\d+\.\s+(\S+)\s+—/gm)].map((m) => m[1]!);
}

/** 合格 detail 的开头变体（批内每卡互异，避免 G9 批内开头撞车；其余段落共用 500+ 字合格长文） */
const DETAIL_OPENINGS = [
  "这个项目是一个开源的自动化测试框架，它解决的核心问题是让开发者用最少的代码编写可靠、可维护的测试用例，与同类工具相比提供了更简洁的断言语法。",
  "这是一款专注于实时数据处理的开源引擎，它主要解决的问题是让海量数据在毫秒级完成聚合与查询，与同类系统相比拥有更高的吞吐能力。",
  "这个仓库提供了一整套可插拔的插件管理系统，它的核心价值在于让开发者以最少的配置扩展应用能力，与手动维护相比显著减少了重复劳动。",
  "本项目是一套轻量级的命令行工具集合，它最突出的特点是开箱即用且依赖极少，与重量级套件相比占用资源更少、上手更快。",
];

function detailFor(opening: string): string {
  return [
    opening,
    "第二段核心技术亮点：包含具体的架构设计与优化手段，比如模块化的组件划分、高效的数据处理流程、统一的内存管理机制，以及与其他同类项目相比的独特之处，内容足够详细扎实，让读者能够理解它为什么厉害，这一段文字要写得足够长，超过一百字的等效宽度，让整段介绍显得更加专业可信。",
    "第三段安装与上手使用说明，用户可以从项目仓库获取安装方式，具体命令参见文档指引，整体流程非常简单直观，无需复杂的配置即可完成部署，几分钟内即可跑通基本功能，同时项目还提供了详细的配置选项说明，帮助用户根据实际需求灵活调整各项参数，快速投入实际使用。",
    "第四段适用人群说明，主要面向需要进行自动化测试的开发者团队，能够显著降低测试脚本的维护成本，并提升整体交付质量，同时提供了丰富的文档与示例帮助快速上手，对于正在搭建持续集成体系的团队来说，这是一款值得认真评估的可靠工具，能够带来长期的效率提升。",
    "第五段社区生态与版本迭代情况，项目保持活跃维护，被多个生产环境采用，积累了大量的反馈与改进，稳定性与实用性都得到了充分验证，值得信赖，未来的版本规划也明确清晰，持续吸收社区建议不断优化功能体验，是值得长期投入的选择。",
  ].join("\n\n");
}

function scoreJson(repo: string, variant = 0): string {
  return JSON.stringify([
    {
      repo,
      ai_dims: ["AI Agent"],
      ai_score: 0.8,
      summary_cn: "这是一个二十到三十五个字的测试摘要",
      reason_cn:
        "这是一段用于测试的推荐理由内容，用来满足等效宽度不低于一百的校验要求，所以需要写得足够长，覆盖技术亮点与使用场景，让卡片的三行推荐理由排版饱满不出现空白行，同时避免摘要与理由内容重复，达到长度要求才算合格，这就是一段完整的测试文本。",
      detail_cn: detailFor(DETAIL_OPENINGS[variant % DETAIL_OPENINGS.length]!),
    },
  ]);
}

function phase1Json(names: string[]): string {
  return JSON.stringify(names.map((repo) => ({ repo, ai_dims: ["AI Agent"], ai_score: 0.8 })));
}

beforeEach(() => {
  memFs.clear();
  prompts.length = 0;
  llmMock.impl = (prompt: string) => {
    const names = namedRepos(prompt);
    if (!prompt.includes("reason_cn")) return phase1Json(names);
    return names.map((r, i) => scoreJson(r, i)).join("");
  };
});

describe("滴灌小轮海选窗口（SCREEN_CAP=4 < 池 6）", () => {
  it("首轮：只有进窗的 4 个仓库被海选/精评；未进窗仓库不烧 LLM、不进待补评", async () => {
    const cards = await generateFeed(cfg, makePool());

    // 只产出进窗仓库的卡
    expect(cards.map((c) => c.repo).sort()).toEqual(["pool/five", "pool/four", "pool/six", "pool/three"]);
    // 所有 prompt 都不包含未进窗仓库（不烧逐仓重评）
    const all = prompts.join("\n");
    expect(all).not.toContain("pool/one");
    expect(all).not.toContain("pool/two");
    // 未进窗仓库不进待补评队列（它们不是失败，只是排队未轮到）
    expect(memFs.has(path.join("data", "pending-retry.json"))).toBe(false);
    // 海选缓存只有进窗的 4 个（two-phase.ts 的缓存路径是正斜杠字面量，不能用 path.join 读）
    const p1 = JSON.parse(memFs.get("data/phase1-scores.json")!) as Record<string, unknown>;
    expect(Object.keys(p1).sort()).toEqual(["pool/five", "pool/four", "pool/six", "pool/three"]);
  });

  it("次轮：窗口推进到上轮未进窗的仓库（fresh-filter 语义，链能收敛的核心）", async () => {
    await generateFeed(cfg, makePool());
    prompts.length = 0;

    const cards = await generateFeed(cfg, makePool());

    // 上轮未进窗的 one/two 本轮进窗并被精评；四张旧卡缓存命中零重评
    expect(cards.map((c) => c.repo).sort()).toEqual([
      "pool/five",
      "pool/four",
      "pool/one",
      "pool/six",
      "pool/three",
      "pool/two",
    ]);
    const round2 = prompts.join("\n");
    expect(round2).toContain("pool/one");
    expect(round2).toContain("pool/two");
    // 全池 6 个都有海选分
    const p1 = JSON.parse(memFs.get("data/phase1-scores.json")!) as Record<string, unknown>;
    expect(Object.keys(p1)).toHaveLength(6);
  });
});
