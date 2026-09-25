import { describe, it, expect, vi, beforeEach } from "vitest";
import path from "node:path";
import type { RadarConfig } from "../config.ts";
import type { TrendingData } from "../trending.ts";

// ---------------------------------------------------------------------------
// 内存文件系统：generateFeed 全程读写 data/ 下的文件，mock 后不碰真实文件
// ---------------------------------------------------------------------------
const { memFs } = vi.hoisted(() => ({ memFs: new Map<string, string>() }));

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
}));

// LLM 调用 mock：失败/成功可控 + 调用次数计数
const { llmMock, callCount } = vi.hoisted(() => ({
  llmMock: { impl: null as null | ((prompt: string) => string) },
  callCount: { n: 0 },
}));

vi.mock("../report.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../report.ts")>();
  return {
    ...actual,
    callLlm: vi.fn(async (prompt: string) => {
      callCount.n++;
      if (!llmMock.impl) throw new Error("llmMock.impl not set");
      return llmMock.impl(prompt);
    }),
  };
});

// stars 轮转刷新不打真网络（resp.ok=false → 跳过刷新，无害）
vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 404 })) as unknown as typeof fetch);

import {
  generateFeed,
  effLen,
  summaryFromDetailFirstPara,
  fitSummary,
  summaryWithinContract,
} from "../feed/index.ts";
import { SUMMARY_MIN, SUMMARY_MAX } from "../feed/taxonomy.ts";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

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

function makeTrendingData(repos: string[]): TrendingData {
  return {
    trendingRepos: repos.map((r, i) => ({
      fullName: r,
      description: `描述 ${i}`,
      language: "TypeScript",
      todayStars: 5,
      totalStars: 100 + i,
      forks: 10,
      url: `https://github.com/${r}`,
    })),
    searchRepos: [],
    trendingFetchSuccess: true,
  };
}

/** reasonCn effLen ≥100 的达标推荐理由（全中文 110 字左右） */
const GOOD_REASON =
  "这是一个足够长的项目推荐理由文本，用来展示该项目的技术亮点与实用价值。它涵盖了核心架构设计、关键算法优化以及多种使用场景下的真实表现，同时提供了与同类工具的对比分析，帮助读者快速建立对该项目的全面认识，从而判断它是否适合引入到自己的工作流程当中。";
/** summaryCn 20-35 字达标摘要 */
const GOOD_SUMMARY = "这是一句在二十到三十五个字范围内的标准摘要文案";
/** detail 500-800 字 3-5 段（v6 全闸 G1/G4 要求；含安装/上手内容） */
const GOOD_DETAIL = [
  "这个项目是一个开源的自动化测试框架，它解决的核心问题是让开发者用最少的代码编写可靠、可维护的测试用例。与传统测试框架相比，它提供了更简洁的断言语法和更友好的错误信息，让测试代码像文档一样清晰易读，显著降低了团队维护测试的门槛。",
  "技术层面，项目采用模块化架构设计，核心引擎与断言库、报告器完全解耦，用户可以根据需要自由组合不同的插件。它还内置了并行执行能力，能够充分利用多核 CPU 提升测试速度，对于大型项目可以节省数倍的测试时间，这是它与其他同类工具拉开差距的关键特性。",
  "安装与上手非常简单，用户只需执行安装命令即可完成部署，具体命令与配置选项请参见项目文档，从项目仓库获取安装方式即可。项目提供了完整的示例代码和配置模板，几分钟内就能跑通第一个测试用例，同时文档对常见问题给出了详细的排查指引。",
  "这款工具特别适合前端工程师、后端开发者以及测试工程师使用，尤其适合需要持续集成的团队。它能够与主流 CI 系统无缝对接，测试失败时自动生成详细的报告，帮助团队快速定位问题，让工程质量得到持续保障，降低线上故障的风险。",
  "社区生态方面，该项目维护活跃，版本迭代稳定，拥有完善的文档和丰富的示例。它已被多家企业用于生产环境，积累了大量的真实使用反馈，稳定性和实用性都经过了充分验证，是值得长期投入的可靠选择。",
].join("\n\n");
/** 不达标的短推荐理由（effLen 远小于 100） */
const SHORT_REASON = "这是一个很简短的推荐理由";
/** 超长摘要（>35 字） */
const LONG_SUMMARY =
  "这是一个远远超过三十五个字限制的超级长摘要文本内容，用来验证超长摘要会被长度校验拦截并触发重评流程确保最终输出符合规范要求";
/** 不达标的短摘要（<20 字） */
const SHORT_SUMMARY = "太短了";

/** 构造 LLM 成功响应 */
function scoreJson(
  repo: string,
  reason: string = GOOD_REASON,
  summary: string = GOOD_SUMMARY,
  detail = GOOD_DETAIL,
): string {
  return JSON.stringify([
    {
      repo,
      ai_dims: ["AI Agent"],
      ai_score: 0.8,
      summary_cn: summary,
      reason_cn: reason,
      detail_cn: detail,
    },
  ]);
}

function pendingPath(): string {
  return path.join("data", "pending-retry.json");
}

/** 读内存里的 JSON 文件 */
function readJson<T>(p: string): T | null {
  const raw = memFs.get(p);
  if (raw === undefined) return null;
  return JSON.parse(raw) as T;
}

beforeEach(() => {
  memFs.clear();
  llmMock.impl = null;
  callCount.n = 0;
});

describe("P0a 长度校验（effLen / 重评 / detail 兜底 / pending）", () => {
  it('effLen：全角算 1、半角算 0.5（"中文abc中" = 4.5；8 全角+1 半角 = 8.5）', () => {
    expect(effLen("中文abc中")).toBe(4.5);
    expect(effLen("中中中中中中中中a")).toBe(8.5);
    expect(effLen("")).toBe(0);
    expect(effLen("GitHub 开源项目")).toBe(7.5); // 6 半角 + 空格 + 4 全角
  });

  it("不达标（reason 短）触发重评：重评达标后进 feed", async () => {
    // 新卡：批量评分第一次返回短 reason，重评返回达标
    llmMock.impl = (_prompt: string) => {
      if (callCount.n === 1) return scoreJson("new/short", SHORT_REASON);
      return scoreJson("new/short");
    };
    const trending = makeTrendingData(["new/short"]);

    const cards = await generateFeed(cfg, trending);

    const card = cards.find((c) => c.repo === "new/short");
    expect(card).toBeDefined();
    expect(card!.reasonCn.length).toBeGreaterThanOrEqual(100);
    expect(card!.reasonCn.length).toBeLessThanOrEqual(150);
    // 重评被触发（批量 1 次 + 重评 ≥1 次）
    expect(callCount.n).toBeGreaterThanOrEqual(2);
  });

  it("重评成功替换不达标内容：最终 reasonCn 是重评返回值", async () => {
    llmMock.impl = (_prompt: string) => {
      if (callCount.n === 1) return scoreJson("new/replace", SHORT_REASON);
      // 九轮 T4：重评返回的文案也要守「以句末标点收尾」——fixture 原来结尾停在半个短语上，
      // 会被新增的 G1-b 拦下（那正是该闸的本义）；补齐句号才代表"达标的重评输出"。
      return scoreJson("new/replace", GOOD_REASON + "重评补充的技术细节与具体能力说明。");
    };
    const trending = makeTrendingData(["new/replace"]);

    const cards = await generateFeed(cfg, trending);

    const card = cards.find((c) => c.repo === "new/replace");
    expect(card).toBeDefined();
    // 被替换为重评的达标内容（含重评补充标记，不含短 reason）
    expect(card!.reasonCn).toContain("重评补充的技术细节与具体能力说明");
    expect(card!.reasonCn).not.toContain(SHORT_REASON);
    expect(card!.reasonCn.length).toBeGreaterThanOrEqual(100);
    expect(card!.reasonCn.length).toBeLessThanOrEqual(150);
  });

  it("重评失败 + 有 detail → detail 第二段兜底（String.length 100–150 且跳过第一段）", async () => {
    const detail = [
      "第一段开场白概述：用大白话说清楚这个项目解决什么问题，与摘要内容高度重复，同时介绍了项目的基本架构与设计理念，让读者对项目有一个整体的初步认识，这一段的文字需要写得稍微长一些才能让整体结构看起来更加饱满充实，避免出现段落过短的问题。",
      "第二段核心技术亮点：包含具体的架构设计与优化手段，比如模块化的组件划分、高效的数据处理流程、统一的内存管理机制，以及与其他同类项目相比的独特之处，内容足够详细扎实，让读者能够理解它为什么厉害，这一段文字要写得足够长，超过一百字的等效宽度，让整段介绍显得更加专业可信。",
      "第三段安装与上手使用说明，用户可以从项目仓库获取安装方式，具体命令参见文档指引，整体流程非常简单直观，无需复杂的配置即可完成部署，几分钟内即可跑通基本功能，同时项目还提供了详细的配置选项说明，帮助用户根据实际需求灵活调整各项参数，快速投入实际使用。",
      "第四段适用人群说明，主要面向需要进行自动化测试的开发者团队，能够显著降低测试脚本的维护成本，并提升整体交付质量，同时提供了丰富的文档与示例帮助快速上手，对于正在搭建持续集成体系的团队来说，这是一款值得认真评估的可靠工具，能够带来长期的效率提升。",
      "第五段社区生态与版本迭代情况，项目保持活跃维护，被多个生产环境采用，积累了大量的反馈与改进，稳定性与实用性都得到了充分验证，值得信赖，未来的版本规划也明确清晰，持续吸收社区建议不断优化功能体验，是值得长期投入的选择。",
    ].join("\n\n");
    // 批量与重评都返回短 reason + 长 detail（重评永远不达标 → 3 次失败）
    llmMock.impl = () => scoreJson("new/fallback", SHORT_REASON, GOOD_SUMMARY, detail);
    const trending = makeTrendingData(["new/fallback"]);

    const cards = await generateFeed(cfg, trending);

    const card = cards.find((c) => c.repo === "new/fallback");
    expect(card).toBeDefined();
    // 兜底值落在 100–150（String.length）且跳过第一段（与 summary 重复）
    expect(card!.reasonCn.length).toBeGreaterThanOrEqual(100);
    expect(card!.reasonCn.length).toBeLessThanOrEqual(150);
    expect(card!.reasonCn).not.toContain("第一段开场白概述");
    expect(card!.reasonCn).toContain("核心技术亮点");
    // detail 保留
    expect(card!.detailCn).toBe(detail);
  });

  it("重评失败 + 无 detail → 入 pending 队列（本轮不进 feed）", async () => {
    // LLM 全失败：批量失败 + 重评 3 次失败，且无任何历史 detail
    llmMock.impl = () => {
      throw new Error("Connection error");
    };
    const trending = makeTrendingData(["new/nodetail"]);

    const cards = await generateFeed(cfg, trending);

    expect(cards.map((c) => c.repo)).not.toContain("new/nodetail");
    const arr = readJson<Record<string, unknown>[]>(pendingPath());
    const pe = arr?.find((e) => e.repo === "new/nodetail");
    expect(pe).toBeDefined();
    expect(pe!.retryCount).toBe(1);
  });

  it("summary 超长（>35 字）触发重评：重评达标后 summary 落在 20-35", async () => {
    llmMock.impl = (_prompt: string) => {
      if (callCount.n === 1) return scoreJson("new/longsum", GOOD_REASON, LONG_SUMMARY);
      return scoreJson("new/longsum");
    };
    const trending = makeTrendingData(["new/longsum"]);

    const cards = await generateFeed(cfg, trending);

    const card = cards.find((c) => c.repo === "new/longsum");
    expect(card).toBeDefined();
    expect(card!.summaryCn.length).toBeGreaterThanOrEqual(20);
    expect(card!.summaryCn.length).toBeLessThanOrEqual(35);
    expect(callCount.n).toBeGreaterThanOrEqual(2);
  });

  it("达标卡不触发重评（两段式：海选 1 次 + 精评 1 次，无重试）", async () => {
    llmMock.impl = () => scoreJson("new/ok");
    const trending = makeTrendingData(["new/ok"]);

    const cards = await generateFeed(cfg, trending);

    const card = cards.find((c) => c.repo === "new/ok");
    expect(card).toBeDefined();
    expect(card!.reasonCn.length).toBeGreaterThanOrEqual(100);
    expect(card!.reasonCn.length).toBeLessThanOrEqual(150);
    // 2026-09-06 两段式：正常路径 = 海选批 1 次 + 精评批 1 次；>2 说明触发了重评
    expect(callCount.n).toBe(2);
  });

  it("summaryFromDetailFirstPara：从第一段截 20-35 字（**按 String.length**）且句末收尾", () => {
    const detail =
      "简单来说，这是一个帮你本地跑大模型的神器，不需要昂贵的显卡。\n\n技术上，它用纯 C++ 实现推理内核。\n\n安装很简单，一行命令搞定。";
    const s = summaryFromDetailFirstPara(detail);
    expect(s.length).toBeGreaterThanOrEqual(SUMMARY_MIN);
    expect(s.length).toBeLessThanOrEqual(SUMMARY_MAX);
    expect(s.startsWith("简单来说")).toBe(true);
    expect(s.endsWith("。")).toBe(true);
    // 空输入 → ""
    expect(summaryFromDetailFirstPara("")).toBe("");
  });

  // 五轮 T2②：**产出后校验**锁。这条线的立论 = 闸只拦「交给它判的」，
  // 而兜底装配路径不经过 cardChecks ⇒ 生成端必须自己判，且判据必须与闸同口径（String.length）。
  // 回归事故：这里原先按 effLen 收 35、闸按 length 判 35 → 全库 418 张「生成端合规/闸超字」漏出去。
  it("fitSummary：任何输入都切到 ≤35（含 ASCII 膨胀的卡），且不硬切在单词中间", () => {
    // ASCII 膨胀：raw 45 / effLen 仅 ~24 —— 旧实现（effLen 口径）会原样放过
    const asciiHeavy = "一个终端里的AI编程搭档，支持Claude GPT Deepseek等300多个模型任你选";
    expect(asciiHeavy.length).toBeGreaterThan(SUMMARY_MAX);
    const cut = fitSummary(asciiHeavy);
    expect(cut.length).toBeLessThanOrEqual(SUMMARY_MAX);
    expect(cut.length).toBeGreaterThanOrEqual(SUMMARY_MIN);
    // 切点落在分句标点上（不是「…等300」这种硬切）
    expect(cut.endsWith("等")).toBe(true);

    // 长句里没有分句标点 → 硬切，但仍必须 ≤35（不许出现「…的 Pyth」那种超界）
    const noPunct = "The open source agent harness runtime layer that turns an LLM into a workable agent";
    const hard = fitSummary(noPunct);
    expect(hard.length).toBe(SUMMARY_MAX);
    expect(hard.startsWith("The open source")).toBe(true);

    // 已合规的原文原样返回（不主动改写合格内容）
    expect(fitSummary("短摘要")).toBe("短摘要");
  });

  it("summaryFromDetailFirstPara：截不出合规的一句时返回空串（不再产出超字/欠字）", () => {
    // 第一段与整篇都短于 20 字 → 空串（调用方按「不合格不上站」处理）
    expect(summaryFromDetailFirstPara("太短了。")).toBe("");
    expect(summaryFromDetailFirstPara("短。\n\n也短。")).toBe("");
    // 每一条产出都必须自己过契约
    const cases = [
      "第一段：想象一下，平常需要上百美元的云 GPU 才能跑的大语言模型，现在只要一台笔记本就够了。",
      "Genetic Drawing 是一个诞生于 2017 年的 Python 玩具项目，其核心创意在于用遗传算法复刻图片，整个过程可视化且充满随机性。",
      "全球最大的GPT Image 2 prompt库，提供丰富的图像生成提示。",
    ];
    for (const c of cases) {
      const s = summaryFromDetailFirstPara(c);
      expect(s === "" || summaryWithinContract(s), `产出不满足契约：${s.length} 字「${s}」`).toBe(true);
    }
  });

  it("重评失败 + 有 detail → 兜底构造的卡 summary 非空且 20-35 字（不再留空被前端填充）", async () => {
    llmMock.impl = () => {
      throw new Error("mock llm unavailable"); // 批量 + 重评全失败
    };
    const trending = makeTrendingData(["new/fallback-sum"]);
    // 预置 baseline feed（含该卡 detailCn，走「无评分 + detailMap 兜底」路径）
    const prevFeed = [
      {
        repo: "new/fallback-sum",
        owner: "new",
        name: "fallback-sum",
        detailCn:
          "这是一个测试项目：用来验证兜底时一句话描述也能生成，它提供了完整的示例与配置模板，整体架构清晰简洁，这一段的文字需要写得稍微充实一些，让整个项目的介绍看起来更加完整可信，避免出现段落过短的问题。\n\n技术上它测试若干边界情况，包括内存管理、并发处理与数据索引优化，并且提供了友好的 REST 与 gRPC 接口，让开发者可以快速接入并处理大规模向量数据，这一段需要写得足够长以满足一百等效宽度的兜底要求，同时确保后续段落的内容也可以被正确截取与复用，这是整个兜底流程能否成功的关键所在。\n\n安装无要求，用户可以从项目仓库获取安装方式，具体命令参见文档指引，整体流程非常简单直观，无需复杂的配置即可完成部署，几分钟内即可跑通基本功能，同时项目还提供了详细的配置选项说明，帮助用户根据实际需求灵活调整各项参数。\n\n它适合需要处理复杂数据的开发者团队，能够显著降低接入成本，并提供了丰富的文档与示例帮助快速上手，同时社区保持活跃维护，稳定性经过了充分验证，值得长期投入与信赖。\n\n社区方面，该项目保持着活跃的维护节奏，版本迭代稳定，文档完善，示例丰富，已经被多家企业用于生产环境，积累了大量的真实使用反馈，稳定性与实用性都经过了充分的检验，是值得长期投入的可靠选择。",
        reasonCn: "",
        aiScore: 0,
      },
    ];
    memFs.set(path.join("data", "feed.json"), JSON.stringify(prevFeed));

    const cards = await generateFeed(cfg, trending);

    const card = cards.find((c) => c.repo === "new/fallback-sum");
    expect(card).toBeDefined();
    // 五轮 T2②：兜底产出的 summary 现在必须**整段落在契约内**（不是「≥10 字就行」）
    expect(card!.summaryCn.length).toBeGreaterThanOrEqual(SUMMARY_MIN);
    expect(card!.summaryCn.length).toBeLessThanOrEqual(SUMMARY_MAX);
    expect(card!.summaryCn.startsWith("这是一个测试项目")).toBe(true);
  });

  it("批量评分成功但 summary 短 + 重评失败 → else 分支兜底：summary 从 detail 第一段截取达标", async () => {
    // 复现 2026-08-13 线上真实漏网：批量评分成功（sc 有值）但 summary<20 字，
    // 重评 3 次均不达标 → 走「rescore failed, fallback reason from detail」else 分支，
    // 该分支曾只兜 reasonCn、漏 summaryCn（修复后 summary 一并从 detail 第一段截取）
    const detail = [
      "这个测试项目专门用来验证摘要兜底，它提供了完整的功能演示和示例配置，第一段内容到此为止，同时介绍了项目的基本架构与整体设计理念，让读者对项目有一个初步而完整的认识，这一段文字需要写得稍微充实一些，避免段落过短导致整体结构看起来单薄。",
      "第二段核心技术亮点：包含具体的架构设计与优化手段，比如模块化的组件划分、高效的数据处理流程、统一的内存管理机制，以及与其他同类项目相比的独特之处，内容足够详细扎实，让读者能够理解它为什么厉害，这一段文字要写得足够长，超过一百字的等效宽度，让整段介绍显得更加专业可信。",
      "第三段安装与上手使用说明，用户可以从项目仓库获取安装方式，具体命令参见文档指引，整体流程非常简单直观，无需复杂的配置即可完成部署，几分钟内即可跑通基本功能，同时项目还提供了详细的配置选项说明，帮助用户根据实际需求灵活调整各项参数，快速投入实际使用。",
      "第四段适用人群说明，主要面向需要进行自动化测试的开发者团队，能够显著降低测试脚本的维护成本，并提升整体交付质量，同时提供了丰富的文档与示例帮助快速上手，对于正在搭建持续集成体系的团队来说，这是一款值得认真评估的可靠工具，能够带来长期的效率提升。",
      "第五段社区生态与版本迭代情况，项目保持活跃维护，被多个生产环境采用，积累了大量的反馈与改进，稳定性与实用性都得到了充分验证，值得信赖，未来的版本规划也明确清晰，持续吸收社区建议不断优化功能体验，是值得长期投入的选择。",
    ].join("\n\n");
    // 批量 + 重评全部返回「短 reason + 短 summary + 长 detail」→ 每次长度校验均失败
    llmMock.impl = () => scoreJson("new/fallback-shortsum", SHORT_REASON, SHORT_SUMMARY, detail);
    const trending = makeTrendingData(["new/fallback-shortsum"]);

    const cards = await generateFeed(cfg, trending);

    const card = cards.find((c) => c.repo === "new/fallback-shortsum");
    expect(card).toBeDefined();
    // reason 走 detail 第二段兜底达标
    expect(card!.reasonCn.length).toBeGreaterThanOrEqual(100);
    expect(card!.reasonCn.length).toBeLessThanOrEqual(150);
    expect(card!.reasonCn).toContain("核心技术亮点");
    // 关键断言：summary 不再是不达标的短值，而是从 detail 第一段截取的 20-35 字
    expect(card!.summaryCn).not.toBe(SHORT_SUMMARY);
    expect(card!.summaryCn.length).toBeGreaterThanOrEqual(20);
    expect(card!.summaryCn.length).toBeLessThanOrEqual(35);
    expect(card!.summaryCn.startsWith("这个测试项目专门用来验证摘要兜底")).toBe(true);
    // detail 保留
    expect(card!.detailCn).toBe(detail);
    // 重评确实被触发（批量 1 次 + 重评 ≥1 次）
    expect(callCount.n).toBeGreaterThanOrEqual(2);
  });
});
