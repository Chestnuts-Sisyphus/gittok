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

// LLM 调用 mock：失败/成功可控
const { llmMock } = vi.hoisted(() => ({ llmMock: { impl: null as null | ((prompt: string) => string) } }));

vi.mock("../report.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../report.ts")>();
  return {
    ...actual,
    callLlm: vi.fn(async (prompt: string) => {
      if (!llmMock.impl) throw new Error("llmMock.impl not set");
      return llmMock.impl(prompt);
    }),
  };
});

// stars 轮转刷新不打真网络（resp.ok=false → 跳过刷新，无害）
vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 404 })) as unknown as typeof fetch);

import { generateFeed } from "../feed/index.ts";

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

/** v6 全闸合格的 detail（500-800 字 3-5 段，含安装/上手——G1/G4 要求） */
const GOOD_DETAIL = [
  "这个项目是一个开源的自动化测试框架，它解决的核心问题是让开发者用最少的代码编写可靠、可维护的测试用例。与传统测试框架相比，它提供了更简洁的断言语法和更友好的错误信息，让测试代码像文档一样清晰易读，显著降低了团队维护测试的门槛。",
  "技术层面，项目采用模块化架构设计，核心引擎与断言库、报告器完全解耦，用户可以根据需要自由组合不同的插件。它还内置了并行执行能力，能够充分利用多核 CPU 提升测试速度，对于大型项目可以节省数倍的测试时间，这是它与其他同类工具拉开差距的关键特性。",
  "安装与上手非常简单，用户只需执行安装命令即可完成部署，具体命令与配置选项请参见项目文档，从项目仓库获取安装方式即可。项目提供了完整的示例代码和配置模板，几分钟内就能跑通第一个测试用例，同时文档对常见问题给出了详细的排查指引。",
  "这款工具特别适合前端工程师、后端开发者以及测试工程师使用，尤其适合需要持续集成的团队。它能够与主流 CI 系统无缝对接，测试失败时自动生成详细的报告，帮助团队快速定位问题，让工程质量得到持续保障，降低线上故障的风险。",
  "社区生态方面，该项目维护活跃，版本迭代稳定，拥有完善的文档和丰富的示例。它已被多家企业用于生产环境，积累了大量的真实使用反馈，稳定性和实用性都经过了充分验证，是值得长期投入的可靠选择。",
].join("\n\n");

/** 合格 detail 的开头变体（批内每卡互异，避免 G9 批内开头撞车；其余段落共用 500+ 字合格长文） */
const DETAIL_OPENINGS = [
  "这个项目是一个开源的自动化测试框架，它解决的核心问题是让开发者用最少的代码编写可靠、可维护的测试用例，与同类工具相比提供了更简洁的断言语法。",
  "这是一款专注于实时数据处理的开源引擎，它主要解决的问题是让海量数据在毫秒级完成聚合与查询，与同类系统相比拥有更高的吞吐能力。",
  "这个仓库提供了一整套可插拔的插件管理系统，它的核心价值在于让开发者以最少的配置扩展应用能力，与手动维护相比显著减少了重复劳动。",
  "本项目是一套轻量级的命令行工具集合，它最突出的特点是开箱即用且依赖极少，与重量级套件相比占用资源更少、上手更快。",
];

function detailFor(repo: string): string {
  let h = 0;
  for (const ch of repo) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const opening = DETAIL_OPENINGS[h % DETAIL_OPENINGS.length]!;
  return [
    opening,
    "第二段核心技术亮点：包含具体的架构设计与优化手段，比如模块化的组件划分、高效的数据处理流程、统一的内存管理机制，以及与其他同类项目相比的独特之处，内容足够详细扎实，让读者能够理解它为什么厉害，这一段文字要写得足够长，超过一百字的等效宽度，让整段介绍显得更加专业可信。",
    "第三段安装与上手使用说明，用户可以从项目仓库获取安装方式，具体命令参见文档指引，整体流程非常简单直观，无需复杂的配置即可完成部署，几分钟内即可跑通基本功能，同时项目还提供了详细的配置选项说明，帮助用户根据实际需求灵活调整各项参数，快速投入实际使用。",
    "第四段适用人群说明，主要面向需要进行自动化测试的开发者团队，能够显著降低测试脚本的维护成本，并提升整体交付质量，同时提供了丰富的文档与示例帮助快速上手，对于正在搭建持续集成体系的团队来说，这是一款值得认真评估的可靠工具，能够带来长期的效率提升。",
    "第五段社区生态与版本迭代情况，项目保持活跃维护，被多个生产环境采用，积累了大量的反馈与改进，稳定性与实用性都得到了充分验证，值得信赖，未来的版本规划也明确清晰，持续吸收社区建议不断优化功能体验，是值得长期投入的选择。",
  ].join("\n\n");
}

/** 构造一张评分完整的旧卡（baseline 用，缓存命中后不评分直接输出） */
function makeOldCard(repo: string): Record<string, unknown> {
  const [owner, ...nameParts] = repo.split("/");
  return {
    repo,
    owner,
    name: nameParts.join("/"),
    desc: "旧卡描述",
    summaryCn: "这是一个二十到三十五个字的测试摘要",
    reasonCn:
      "这是一段用于测试的推荐理由内容，用来满足等效宽度不低于一百的校验要求，所以需要写得足够长，覆盖技术亮点与使用场景，让卡片的三行推荐理由排版饱满不出现空白行，同时避免摘要与理由内容重复，达到长度要求才算合格，这就是一段完整的测试文本。",
    detailCn: GOOD_DETAIL,
    stars: 500,
    starGrowth: 0,
    language: "TypeScript",
    topics: ["llm"],
    aiDims: ["AI Agent"],
    aiDim: "AI Agent",
    tags: [{ name: "AI Agent", weight: 0.5 }],
    aiScore: 0.8,
    source: "trending",
    bigbros: [],
    url: `https://github.com/${repo}`,
    ts: "2026-08-07T00:00:00.000Z",
    score: 0.5,
    category: "tool",
    momentum: ["hot"],
  };
}

/** 构造 LLM 成功响应（可解析的评分 JSON，v6 全闸达标；批内每卡开头互异防 G9 撞车） */
function scoreJson(repo: string): string {
  return JSON.stringify([
    {
      repo,
      ai_dims: ["AI Agent"],
      ai_score: 0.8,
      summary_cn: "这是一个二十到三十五个字的测试摘要",
      reason_cn:
        "这是一段用于测试的推荐理由内容，用来满足等效宽度不低于一百的校验要求，所以需要写得足够长，覆盖技术亮点与使用场景，让卡片的三行推荐理由排版饱满不出现空白行，同时避免摘要与理由内容重复，达到长度要求才算合格，这就是一段完整的测试文本。",
      detail_cn: detailFor(repo),
    },
  ]);
}

function feedPath(): string {
  return path.join("data", "feed.json");
}
function pendingPath(): string {
  return path.join("data", "pending-retry.json");
}

/** 读内存里的 JSON 文件 */
function readJson<T>(path: string): T | null {
  const raw = memFs.get(path);
  if (raw === undefined) return null;
  return JSON.parse(raw) as T;
}

/** 队列里按 repo 找条目 */
function findPending(repo: string): Record<string, unknown> | null {
  const arr = readJson<Record<string, unknown>[]>(pendingPath());
  if (!arr) return null;
  return arr.find((e) => e.repo === repo) ?? null;
}

beforeEach(() => {
  memFs.clear();
  llmMock.impl = null;
});

describe("feed pending-retry 队列", () => {
  it("评分失败的新卡不入 feed，但记入待补评队列（快照完整 + retryCount=1）", async () => {
    // 昨天的 baseline：一张旧卡
    memFs.set(feedPath(), JSON.stringify([makeOldCard("old/one")]));
    // 今天新抓一张卡，LLM 全失败
    llmMock.impl = () => {
      throw new Error("Connection error");
    };
    const trending = makeTrendingData(["new/fail"]);

    const cards = await generateFeed(cfg, trending);

    // feed 只含旧卡（新卡评分失败被跳过，符合既有行为）
    expect(cards.map((c) => c.repo)).toEqual(["old/one"]);
    const feed = readJson<Record<string, unknown>[]>(feedPath());
    expect(feed!.map((c) => c.repo)).toEqual(["old/one"]);

    // 失败卡进了队列：快照完整、retryCount=1
    const pe = findPending("new/fail");
    expect(pe).not.toBeNull();
    expect(pe!.repo).toBe("new/fail");
    expect(pe!.stars).toBe(100); // 快照自当天的抓取数据
    expect(pe!.desc).toBe("描述 0");
    expect(pe!.language).toBe("TypeScript");
    expect(pe!.source).toBe("trending");
    expect(pe!.retryCount).toBe(1);
  });

  it("队列中的 repo 即使当天未再被抓取，也会恢复补评；成功后出队", async () => {
    // 昨天队列里有 ghost/repo（1 次失败），今天的数据源里没有它
    memFs.set(
      pendingPath(),
      JSON.stringify([
        {
          repo: "ghost/repo",
          desc: "幽灵卡描述",
          stars: 123,
          language: "Python",
          topics: ["llm"],
          source: "trending",
          starGrowth: 5,
          bigbros: [],
          ts: "2026-08-07T00:00:00.000Z",
          retryCount: 1,
        },
      ]),
    );
    // 今天只抓了一张普通新卡；LLM 对所有 repo 成功
    // 2026-09-06 两段式：先海选批（prompt 无 reason_cn，两 repo 同批）后精评批
    llmMock.impl = (prompt: string) => {
      if (!prompt.includes("reason_cn")) {
        return '[{"repo":"ghost/repo","ai_dims":["AI Agent"],"ai_score":0.9},{"repo":"new/ok","ai_dims":["开发者工具"],"ai_score":0.8}]';
      }
      if (prompt.includes("ghost/repo")) return scoreJson("ghost/repo");
      return scoreJson("new/ok");
    };
    const trending = makeTrendingData(["new/ok"]);

    const cards = await generateFeed(cfg, trending);

    const repos = cards.map((c) => c.repo);
    // 幽灵卡被恢复并补评成功，进了 feed（只增不减 + 不依赖再被抓取）
    expect(repos).toContain("ghost/repo");
    expect(repos).toContain("new/ok");
    // 出队：队列为空
    const arr = readJson<Record<string, unknown>[]>(pendingPath());
    expect(arr).toEqual([]);
  });

  it("队列中部分成功部分失败：成功者出队，失败者留队且 retryCount 递增", async () => {
    memFs.set(
      pendingPath(),
      JSON.stringify([
        {
          repo: "ghost/a",
          desc: "A 描述",
          stars: 100,
          language: "TypeScript",
          topics: [],
          source: "search",
          starGrowth: 0,
          bigbros: [],
          ts: "2026-08-07T00:00:00.000Z",
          retryCount: 2,
        },
        {
          repo: "ghost/b",
          desc: "B 描述",
          stars: 200,
          language: "Go",
          topics: [],
          source: "search",
          starGrowth: 0,
          bigbros: [],
          ts: "2026-08-07T00:00:00.000Z",
          retryCount: 2,
        },
      ]),
    );
    llmMock.impl = (prompt: string) => {
      if (prompt.includes("ghost/a")) return scoreJson("ghost/a");
      throw new Error("network");
    };
    const trending = makeTrendingData([]);

    const cards = await generateFeed(cfg, trending);

    expect(cards.map((c) => c.repo)).toContain("ghost/a");
    expect(cards.map((c) => c.repo)).not.toContain("ghost/b");

    // a 出队，b 留队 retryCount 2→3
    expect(findPending("ghost/a")).toBeNull();
    expect(findPending("ghost/b")!.retryCount).toBe(3);
  });

  it("队列文件损坏时降级为空队列，管道不崩", async () => {
    memFs.set(pendingPath(), "{{{ not json at all");
    llmMock.impl = () => scoreJson("new/ok");
    const trending = makeTrendingData(["new/ok"]);

    const cards = await generateFeed(cfg, trending);

    expect(cards.map((c) => c.repo)).toContain("new/ok");
  });

  it("连败超过上限的条目被放弃，不再恢复补评", async () => {
    memFs.set(
      pendingPath(),
      JSON.stringify([
        {
          repo: "ghost/zombie",
          desc: "僵尸描述",
          stars: 50,
          language: "Rust",
          topics: [],
          source: "search",
          starGrowth: 0,
          bigbros: [],
          ts: "2026-08-07T00:00:00.000Z",
          retryCount: 7, // 已达上限（PENDING_MAX_RETRIES=7）
        },
      ]),
    );
    // 即使 LLM 现在能成功，它也不该再被评分（放弃恢复）
    llmMock.impl = () => scoreJson("ghost/zombie");
    const trending = makeTrendingData([]);

    const cards = await generateFeed(cfg, trending);

    expect(cards.map((c) => c.repo)).not.toContain("ghost/zombie");
    // 队列里也没有它了
    expect(findPending("ghost/zombie")).toBeNull();
  });

  it("队列容量上限：一次性大量失败只保留前 PENDING_MAX 条", async () => {
    // 1100 个新 repo 全失败（PENDING_MAX=1000，2026-09-05 放量 300→1000）
    const many = Array.from({ length: 1100 }, (_, i) => `bulk/fail${i}`);
    llmMock.impl = () => {
      throw new Error("429 rate limited");
    };
    const trending = makeTrendingData(many);

    const cards = await generateFeed(cfg, trending);

    expect(cards.length).toBe(0);
    const arr = readJson<Record<string, unknown>[]>(pendingPath());
    expect(arr!.length).toBe(1000); // PENDING_MAX=1000
    expect(arr![0]!.retryCount).toBe(1);
  });

  it("队列条目若已通过其他路径持有评分（缓存命中）→ 出队，防僵尸残留", async () => {
    // 队列里有 repo，但它已经在 feed.json 里（有旧评分，缓存命中）
    memFs.set(feedPath(), JSON.stringify([makeOldCard("ghost/solved")]));
    memFs.set(
      pendingPath(),
      JSON.stringify([
        {
          repo: "ghost/solved",
          desc: "已解决描述",
          stars: 500,
          language: "TypeScript",
          topics: [],
          source: "search",
          starGrowth: 0,
          bigbros: [],
          ts: "2026-08-07T00:00:00.000Z",
          retryCount: 1,
        },
      ]),
    );
    // 本轮无任何失败
    llmMock.impl = () => scoreJson("new/ok");
    const trending = makeTrendingData(["new/ok"]);

    const cards = await generateFeed(cfg, trending);

    expect(cards.map((c) => c.repo)).toContain("ghost/solved");
    // 队列被清空（条目已解决，不残留）
    const arr = readJson<Record<string, unknown>[]>(pendingPath());
    expect(arr).toEqual([]);
  });

  it("队列条目今天也被抓到 → 用今天新数据评分（不重复恢复），成功则出队", async () => {
    // 队列里有 repo，今天数据源里恰好也抓到它（数据漂移后再次出现）
    memFs.set(
      pendingPath(),
      JSON.stringify([
        {
          repo: "again/repo",
          desc: "旧快照描述",
          stars: 999,
          language: "TypeScript",
          topics: [],
          source: "search",
          starGrowth: 0,
          bigbros: [],
          ts: "2026-08-07T00:00:00.000Z",
          retryCount: 1,
        },
      ]),
    );
    // 今天抓到它：stars 更新为 500、desc 更新
    const trending = makeTrendingData(["again/repo"]);
    llmMock.impl = () => scoreJson("again/repo");

    const cards = await generateFeed(cfg, trending);

    const card = cards.find((c) => c.repo === "again/repo");
    expect(card).toBeDefined();
    // 用的是今天抓取的新数据（stars=100 而非快照 999）
    expect(card!.stars).toBe(100);
    expect(card!.desc).toBe("描述 0");
    // 评分成功 → 出队
    const arr = readJson<Record<string, unknown>[]>(pendingPath());
    expect(arr).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 评分增量落盘（2026-09-05）：撞超时墙被杀时已评部分不丢，下轮缓存命中零成本续跑
// ---------------------------------------------------------------------------

describe("评分增量落盘", () => {
  function partialPath(): string {
    return path.join("data", "partial-scores.json");
  }

  it("被杀轮次的 partial 缓存 → 下轮缓存命中零重评直接组装（无 baseline 也有效）", async () => {
    // 模拟上一轮被杀：partial-scores.json 留着成功评分，feed.json（baseline）缺失
    memFs.set(
      partialPath(),
      JSON.stringify({
        "a/scored": {
          repo: "a/scored",
          aiDims: ["AI Agent"],
          aiDim: "AI Agent",
          aiScore: 0.8,
          summaryCn: "这是一个二十到三十五个字的测试摘要",
          reasonCn:
            "这是一段超过八十个字的推荐理由内容，用来满足长度要求所以需要写长一点，继续补充一些内容让这段文字变得足够长，达到八十个字以上才算合格的长度。",
          detailCn: "详情内容",
        },
      }),
    );
    llmMock.impl = () => {
      throw new Error("不应调用 LLM（partial 缓存命中应零成本续跑）");
    };

    const cards = await generateFeed(cfg, makeTrendingData(["a/scored"]));

    expect(cards.map((c) => c.repo)).toContain("a/scored");
  });

  it("管道完整落盘成功 → partial 缓存清空（防残留累积，历史已并入 feed.json）", async () => {
    llmMock.impl = () => scoreJson("fresh/ok");

    const cards = await generateFeed(cfg, makeTrendingData(["fresh/ok"]));

    expect(cards.length).toBe(1);
    expect(memFs.has(partialPath())).toBe(false);
  });
});
