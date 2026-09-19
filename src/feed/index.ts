/**
 * 开源版抖音信息流 — 数据管道。
 *
 * 把 trending + search 两路数据合并去重 → stars 轮转刷新
 * → LLM 批量评分（中文推荐理由）→ star 门槛过滤 → 个性化排序（反馈 loop）
 * → 输出 data/feed.json 供前端刷。
 *
 * bigbros 盖章已全面退役（2026-09-05 拍板：陌生库作者的 star 对访客零价值）：
 * 管道停跑盖章、评分/推荐/通知/前端展示等一切出口清除；字段仅为历史数据兼容保留。
 *
 * 用法（被 index.ts 主流程调用，或独立运行）：
 *   const cards = await generateFeed(config, trendingData);
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import type { TrendingData } from "../trending.ts";
import type { RadarConfig } from "../config.ts";
import { callLlm } from "../report.ts";
import {
  buildFeedScoringPrompt,
  parseScoringResult,
  buildPhase1ScoringPrompt,
  parsePhase1ScoringResult,
  buildRetryPrompt,
  domainKeyOf,
  type Phase1Score,
} from "./prompts.ts";
import { loadPhase1Scores, appendPhase1Scores, selectForProse, type SelectionInput } from "./two-phase.ts";
import { nextReadmeToken, nextRotationToken, getApiTokens } from "../github-tokens.ts";
import {
  loadProfile,
  saveProfile,
  loadFeedback,
  applyFeedbackToProfile,
  rankCards,
  initTagWeights,
} from "./personalize.ts";
import { cardChecks, effLen, detailQualified } from "./checks.ts";
import { cleanV4, isSkeleton, isMirror } from "./stage1.ts";
import { pack, checkBatch, fixAdjacent } from "./stage2.ts";
import { ProductionScheduler, parseMatrix } from "./scheduler.ts";
import { ScheduledLlmExecutor, executorFromMatrix } from "./executor.ts";
import {
  loadTierIndex,
  loadTierProgress,
  saveTierProgress,
  tierCandidates,
  tierProgress,
  estimateRemaining,
} from "./tiers.ts";
import { QuantileNormalizer } from "./normalize.ts";
import type {
  FeedCard,
  FeedCategory,
  FeedMomentum,
  FeedSource,
  RepoForScoring,
  ScoringResult,
  Tag,
  UserProfile,
} from "./types.ts";

export { effLen }; // 兼容既有测试 import（feed-length.test.ts）

const DATA_DIR = "data";
const FEED_PATH = path.join(DATA_DIR, "feed.json");
const BATCH_SIZE = 5;
/** LLM 评分的仓库上限。
 *  **9000→3000（2026-09-06 第三刀实测裁定）**：两段式首跑（海选 9000+精评 800）仍撞 360min 墙
 *  ——免费编队高峰期 zhipu 87% 429（fleet-health 实锤）把有效吞吐打到远低于理论值，
 *  「海选便宜」挡不住「批次数×批时延×冷却」的墙。3000=撞墙轮工作量的 ~33%
 *  （队列次序已保证：pending 优先→trending 优先→search 领域轮询按星降序，砍的是长尾），
 *  未入筛的库下轮随重抓自然回来（不入待补评语义不变）。多账号 key 落地后此 cap 回调。 */
const MAX_LLM_SCORE_REPOS = Number(process.env["SCREEN_CAP"] ?? 3000);
/** 精评（全文案）top-K：每轮只有海选分数最高的 K 张卡才写中文文案。
 *  **800→400（2026-09-06 第三刀）**：与海选 cap 同因同调（撞墙轮 K=800 是精评大头的嫌疑最大，
 *  全文案批是慢批）。400 张 = 80 批 ÷ 32 并发；栗子铁律不变：进 feed 的卡必须全套文案。
 *  K 就是「每天新增完整卡」的产量旋钮，编队扩容后先回 800 再往上。 */
const PROSE_TOP_K = Number(process.env["PROSE_TOP_K"] ?? 400);
/** 评分段总预算（GT-0906-01 连环刀）：海选+精评+逐仓重评共用一条墙钟红线，从海选批跑开始计时。
 *  到线后 retryScoring 直接放弃剩余仓库 → failedThisRound → pending-retry 下轮自动补评。
 *  与 callLlm 的单调用时限（LLM_CALL_DEADLINE_MS）配合，把滴灌小轮时长上界锁回 ≤20 分钟。 */
const SCORING_BUDGET_MS = Number(process.env["SCORING_BUDGET_MS"] ?? 900_000); // 默认 15 min
/** 海选批大小：输出极短（~50 token），20 库/批摊薄 prompt 开销 */
const PHASE1_BATCH_SIZE = 20;
/** LLM 并发批次数 */
// 8→32（09-06 根治放量轮撞墙的另一半）：池里 ~32 个 worker 但只有 8 批在飞 = 3/4 编队吃灰。
// 海选 20 库/批 × 32 并发 ≈ 640 卡/分钟理论值（429 冷却打折后仍数倍于旧 12-15 卡/分钟）。
const SCORE_CONCURRENCY = 32;
/** feed.json 最大保留条目数（超出淘汰最老 + 未收藏；前端互动过的靠本地快照兜底） */
const MAX_FEED_SIZE = 12000;
/** 热门标签阈值（最近已知 stars）。
 *  2000→30000（2026-09-05 重标定）：取材池整体高星化（search 按 stars 排序拉取），
 *  库内 star 中位数 1.28 万、p75≈3.1 万，2000 门槛下 86% 的卡都挂「热门」——徽章与热门频道彻底通胀。
 *  30000≈当前库的 p75，热门回到「头部 1/4 高星库」的本义；取材池继续膨胀时随下次标定上移。 */
const HOT_STAR_THRESHOLD = 30000;
/** 每日标签阈值（今日 star 增长） */
const DAILY_GROWTH_THRESHOLD = 5;
/** 「刚冒头」库龄上限（天）：创建不足 90 天且增速高的新库 */
const RISING_AGE_DAYS = 90;
/** 「刚冒头」日涨星下限（高于 daily 的 5，确保是真实爆发而非缓慢积累） */
const RISING_GROWTH_THRESHOLD = 30;
/** stars 轮转刷新：每天最多刷新的库内 repo 数（rate limit 预算：search ~1050 + 轮转 2000 < 5000/h）。
 *  可用 REFRESH_BATCH 覆盖——**全量建库时必须压低**：star 轮转与 README 拉取共用同一 core 配额，
 *  轮转吃满 5000/h 会让 README 全线 403（2026-09-14 实测：0/60 READMEs，根因=轮转先烧光 core）。
 *  全量档建议 REFRESH_BATCH=200（只保时效信号），把配额让给 README。 */
const REFRESH_BATCH = Number(process.env["REFRESH_BATCH"] ?? 2000);
/** stars 刷新并发 */
const REFRESH_CONCURRENCY = 8;
/** 轮转游标文件（记录下次从哪开始刷新） */
const REFRESH_CURSOR_PATH = path.join(DATA_DIR, ".refresh_cursor");
/** 待补评队列文件：LLM 评分失败的 repo 快照在此兜底保留，下轮强制恢复补评（杜绝「失败卡不进 baseline → 永不补评」丢卡） */
const PENDING_PATH = path.join(DATA_DIR, "pending-retry.json");
/** 待补评队列容量上限（防失控膨胀挤占新卡评分名额） */
const PENDING_MAX = 1000; // 300→1000（2026-09-05 放量：候选池万级后失败队列水位同步抬）
/** 单 repo 最大重试轮数（连败放弃，防僵尸条目长期占位） */
const PENDING_MAX_RETRIES = 7;
/** 评分增量落盘文件（2026-09-05）：scoreBatched 每批成功评分即写这里，
 *  digest 撞超时墙被杀时已评部分不丢（下轮 loadExistingScores 合并续跑）；
 *  管道末尾完整落盘 feed.json 成功后清空。 */
const PARTIAL_SCORES_PATH = path.join(DATA_DIR, "partial-scores.json");

/** 读评分增量缓存（容错：损坏/缺失一律当空）。 */
function loadPartialScores(): Map<string, ScoringResult> {
  const map = new Map<string, ScoringResult>();
  try {
    if (!fs.existsSync(PARTIAL_SCORES_PATH)) return map;
    const raw = JSON.parse(fs.readFileSync(PARTIAL_SCORES_PATH, "utf-8")) as Record<string, ScoringResult>;
    for (const [repo, sc] of Object.entries(raw)) {
      if (sc && sc.repo && sc.reasonCn) map.set(repo, sc);
    }
  } catch (err) {
    console.error(`  [feed/partial] load failed: ${err}`);
  }
  return map;
}

/** 追加评分到增量缓存并立即写盘（每批一次，量小；写失败仅日志）。 */
function appendPartialScores(results: ScoringResult[]): void {
  if (results.length === 0) return;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const existing = loadPartialScores();
    for (const sc of results) existing.set(sc.repo, sc);
    const obj: Record<string, ScoringResult> = {};
    for (const [repo, sc] of existing) obj[repo] = sc;
    fs.writeFileSync(PARTIAL_SCORES_PATH, JSON.stringify(obj), "utf-8");
  } catch (err) {
    console.error(`  [feed/partial] save failed: ${err}`);
  }
}

/** 清空评分增量缓存（完整 feed.json 已落盘后调用）。 */
function clearPartialScores(): void {
  try {
    if (fs.existsSync(PARTIAL_SCORES_PATH)) fs.unlinkSync(PARTIAL_SCORES_PATH);
  } catch (err) {
    console.error(`  [feed/partial] clear failed: ${err}`);
  }
}
// 盖章状态文件与 STAMP_* 常量已随「bigbros 全出口退役」（2026-09-05）移除；盖章调用停跑见 generateFeed 2.7 注释。

// 权威组织/官方仓库 owner 前缀
const AUTHORITATIVE_ORGS = new Set([
  "openai",
  "anthropics",
  "google",
  "google-gemini",
  "google-research",
  "microsoft",
  "meta",
  "facebookresearch",
  "huggingface",
  "nvidia",
  "stabilityai",
  "pytorch",
  "tensorflow",
  "langchain-ai",
  "ollama",
  "vllm-project",
  "ggerganov",
  "QwenLM",
  "deepseek-ai",
  "mistralai",
]);

// 学习资源关键词（学英语/学代码等「我自己学习能用」的资源；大模型学习已被 ai 前置判定拿走）
const LEARNING_KEYWORDS =
  /awesome|tutorial|learn|course|guide|roadmap|面试|interview|study|educat|english|language|leetcode|algorithms|coding|cheatsheet|cheat-sheet|textbook|flashcard|anki|quiz|encyclopedia|math|mathematics|physics|chemistry|biology|编程|英语|学习|教材|数学|物理|化学|生物|百科|速查|题库/i;

// 好玩气质关键词：项目名/描述/topics 里出现「玩」的实锤才算好玩（2026-09-05 兴趣分区收紧）。
// 背景：LLM 会把正经生产力工具随手打成「创意工具」，实测 300 张 fun 卡混入建站器/图标库/UI 库
// 数十张——「创意工具」「可视化」标签必须过这层气质词交叉验证才许进兴趣分区。
const FUN_VIBE =
  /\bgame\b|\bgames\b|\bgaming\b|arcade|\bpuzzle\b|\bemulator|\bretro\b|\bplayable|gameplay|creative[- ]?coding|generative[- ]?art|\bascii\b|pixel[- ]?art|demoscene|\bshader|chiptune|\bmusic\b|\btoy\b|\btoys\b|\bfun\b|\bart\b|\bartists?\b|游戏|模拟器|玩具|沙盒|好玩|创意编程|生成艺术|音游|像素/i;

/** AI 强特征前缀（命中即归 ai 分区） */
const AI_PREFIXES = [
  "AI基础设施",
  "AI Agent",
  "AI应用",
  "AI搜索",
  "AI写作",
  "RAG",
  "推理引擎",
  "大语言模型",
  "多模态",
  "代码助手",
  "Agent",
  "微调",
  "提示工程",
  "向量数据库",
];

/** zone → 旧分区（前端分类 tab 兼容；AI→ai/资源→learning/工具→tool/创意→fun；缺省 null 回退 classifyCategory） */
function zoneToCategory(zone: string | undefined): FeedCategory | null {
  switch (zone) {
    case "AI":
      return "ai";
    case "资源":
      return "learning";
    case "工具":
      return "tool";
    case "创意":
      return "fun";
    default:
      return null;
  }
}

/** 固有标签判定（互斥，每个项目必有其一；tool 为最宽兜底，全覆盖无死角） */
export function classifyCategory(card: Pick<FeedCard, "repo" | "desc" | "topics" | "aiDims">): FeedCategory {
  const repoLower = card.repo.toLowerCase();
  const descLower = card.desc.toLowerCase();
  const topicsLower = card.topics.map((t) => t.toLowerCase());
  const allText = `${repoLower} ${descLower} ${topicsLower.join(" ")}`;
  const dims = card.aiDims || [];

  // 1. 工具：Agent Skill 集合类（repo/topics 含 skill）
  if (repoLower.includes("skill") || topicsLower.some((t) => t.includes("skill"))) {
    return "tool";
  }
  // 2. 兴趣：「非AI-好玩」「游戏」= LLM 气质判定直通；「创意工具」「可视化」须过 FUN_VIBE
  //    气质词交叉验证（防正经生产力工具被随手打的标签拖进兴趣分区，2026-09-05 收紧）
  if (dims.some((d) => d === "非AI-好玩" || d === "游戏")) {
    return "fun";
  }
  if (dims.some((d) => d === "创意工具" || d === "可视化") && FUN_VIBE.test(allText)) {
    return "fun";
  }
  // 3. AI：强特征前缀（收窄，避免泛 AI 全进 ai）
  if (dims.some((d) => AI_PREFIXES.some((p) => d.startsWith(p) || d.includes(p)))) {
    return "ai";
  }
  // 4. 学习：学英语/学代码资源（排在 AI 后，大模型学习已进 ai）
  if (LEARNING_KEYWORDS.test(allText) || topicsLower.includes("awesome")) {
    return "learning";
  }
  // 5. 兜底：工具（最宽泛类别，覆盖一切）
  return "tool";
}

/** 动态标签判定（不互斥，独立命中）+ 每日频道时效热度分 */
export function classifyMomentum(card: Pick<FeedCard, "owner" | "stars" | "starGrowth" | "createdAt">): {
  momentum: FeedMomentum[];
  fromOfficial: boolean;
  heatScore: number;
} {
  const momentum: FeedMomentum[] = [];
  if (card.stars >= HOT_STAR_THRESHOLD) momentum.push("hot");
  // 「刚冒头」：新库（<90 天）+ 高增速，且还没进 hot（总星门槛）——热点提速刀的核心上浮信号
  const ageDays = card.createdAt
    ? (Date.now() - new Date(card.createdAt).getTime()) / (24 * 3600 * 1000)
    : Infinity;
  if (
    card.stars < HOT_STAR_THRESHOLD &&
    ageDays <= RISING_AGE_DAYS &&
    card.starGrowth >= RISING_GROWTH_THRESHOLD
  ) {
    momentum.push("rising");
  }
  // 每日：真·时效热点门槛（日均涨星达标 或 新星爆发），老库低增速不再进每日
  const isDaily = card.starGrowth >= DAILY_GROWTH_THRESHOLD || momentum.includes("rising");
  if (isDaily) momentum.push("daily");

  // 时效热度分（2026-09-05 拍板：涨得快 > 涨得多）：
  // 主轴=相对增速（日均涨星/总星，1k 涨 100 = 10% 完胜 100k 涨 1k = 1%），
  // 托底=绝对增速（防超小库占比虚高，基数下限 50），×建仓加成（新项目爆更猛）。
  const rel = card.starGrowth / Math.max(card.stars, 50);
  const abs = Math.min(card.starGrowth / 100, 1);
  const ageBoost = ageDays <= RISING_AGE_DAYS ? 1.5 : ageDays <= 365 ? 1.2 : 1.0;
  const heatScore = isDaily ? (rel * 3 + abs * 0.3) * ageBoost : 0;

  return {
    momentum,
    fromOfficial: AUTHORITATIVE_ORGS.has(card.owner) && card.stars >= 500,
    heatScore,
  };
}

// ---------------------------------------------------------------------------
// 多样性交错（AI:非AI = 2:3 轮播）
// ---------------------------------------------------------------------------

/** AI 判定前缀（与 classifyCard 的 ai 分区前缀一致；仅用于交错分池，不改任何 score） */
const AI_DIM_PREFIXES = [
  "AI基础设施",
  "AI Agent",
  "AI应用",
  "AI搜索",
  "AI写作",
  "RAG",
  "推理引擎",
  "大语言模型",
  "多模态",
  "代码助手",
  "Agent",
  "微调",
  "提示工程",
  "向量数据库",
];

function isAiCard(card: FeedCard): boolean {
  const dims = card.aiDims && card.aiDims.length > 0 ? card.aiDims : [card.aiDim];
  return dims.some((d) => AI_DIM_PREFIXES.some((p) => d.startsWith(p))) || card.aiScore >= 0.6;
}

/** 交错排序：只改输出顺序，不改任何 score 值。AI:非AI = 2:3 轮播，某池耗尽则余下全用另一池。 */
function diversifyCards(cards: FeedCard[]): FeedCard[] {
  const aiPool = cards.filter(isAiCard).sort((a, b) => b.score - a.score);
  const nonAiPool = cards.filter((c) => !isAiCard(c)).sort((a, b) => b.score - a.score);
  const out: FeedCard[] = [];
  let i = 0;
  let j = 0;
  while (i < aiPool.length || j < nonAiPool.length) {
    for (let k = 0; k < 2 && i < aiPool.length; k++) out.push(aiPool[i++]!);
    for (let k = 0; k < 3 && j < nonAiPool.length; k++) out.push(nonAiPool[j++]!);
  }
  return out;
}

// ---------------------------------------------------------------------------
// 综合标签构建
// ---------------------------------------------------------------------------

/** 从 LLM + GitHub topics + language 构建综合标签列表 */
function buildTags(aiDims: string[], topics: string[], language: string): Tag[] {
  const tagMap = new Map<string, Tag>();

  // LLM 标签：最高权重 1.0
  for (const dim of aiDims) {
    tagMap.set(dim, { name: dim, source: "llm", weight: 1.0 });
  }

  // GitHub topics：权重 0.7
  for (const t of topics) {
    const existing = tagMap.get(t);
    if (!existing || existing.weight < 0.7) {
      tagMap.set(t, { name: t, source: "github", weight: 0.7 });
    }
  }

  // Language：权重 0.5
  if (language) {
    const existing = tagMap.get(language);
    if (!existing) {
      tagMap.set(language, { name: language, source: "language", weight: 0.5 });
    }
  }

  // 去重后按权重降序排列，最多保留 25 个
  return [...tagMap.values()].sort((a, b) => b.weight - a.weight).slice(0, 25);
}

// ---------------------------------------------------------------------------
// 合并中间类型
// ---------------------------------------------------------------------------

interface MergedRepo {
  repo: string;
  desc: string;
  stars: number;
  language: string;
  topics: string[];
  source: FeedSource;
  starGrowth: number;
  /** 跨轮保留的旧增长值（2026-09-16）：滴灌轮只刷新游标窗口内部分卡，未刷新卡沿用
   *  上轮值防热门/每日频道被抽干；刷新成功的卡清掉本字段（真实差值覆盖，防虚高固化） */
  lastStarGrowth?: number;
  /** 仓库创建时间 ISO（rising 判定；search API/轮转刷新携带，trending HTML 无） */
  createdAt?: string;
  /** 原始 README markdown（精评拉取后回写；组装循环 G-source 校验用） */
  readme?: string;
  /** 最后一次 push 时间 ISO（fetchReadmes 同批抓取；pushedAt 全量补齐 P1） */
  pushedAt?: string;
  /** 静默轮数（跨轮累计于 feed.json）：刷新无信号 +1、有信号清零；≥3 退出默认推荐流 */
  silentRounds?: number;
  bigbros: string[];
  ts: string;
  /** 待补评队列恢复的 repo（评分排序优先） */
  pending?: boolean;
}

/**
 * stars 轮转刷新：每天对库内 repo 分批查 GitHub API（游标续跑，4-6 天全覆盖）。
 *
 * starGrowth = 「日均涨星」：(今日 stars − baseline stars) ÷ 距上次真实更新的天数；
 * 间隔 >1 天时摊薄（防停摆 N 天后增量全算到一天头上虚高，2026-09-04）。
 * 返回刷新成功的 repo → 新 stars 映射。
 */
async function refreshStarsRoundRobin(
  repoMap: Map<string, MergedRepo>,
  baselineStars: Map<string, number>,
  intervalDays = 1,
): Promise<Map<string, number>> {
  const repos = [...repoMap.values()];
  if (repos.length === 0) return new Map();
  let cursor = 0;
  try {
    if (fs.existsSync(REFRESH_CURSOR_PATH)) {
      cursor = parseInt(fs.readFileSync(REFRESH_CURSOR_PATH, "utf-8").trim(), 10) || 0;
    }
  } catch {
    cursor = 0;
  }
  const results = new Map<string, number>();
  let refreshed = 0;
  let scanned = 0;
  /** 连续限流计数：单 token 限流换池内下一个继续；连续打满全池才收工（多 PAT 轮转 2026-09-06） */
  let limitStreak = 0;
  const total = repos.length;
  const queue: { repo: string; idx: number }[] = [];

  // 收集本轮要刷新的 repo（跳过今天已被抓取数据更新过的——已有新鲜 stars 的不重复查）
  const todayUpdated = new Set<string>();
  // 无法精确知道「今天抓过谁」，用 ts 近似：baseline 里的 ts 是历史值，merge 更新会改 ts。
  // 保守做法：全部按游标顺序查（反正有日预算限制）。
  for (let i = 0; i < total && refreshed < REFRESH_BATCH; i++) {
    const idx = (cursor + i) % total;
    const r = repos[idx]!;
    if (todayUpdated.has(r.repo)) continue;
    queue.push({ repo: r.repo, idx });
    refreshed++;
  }
  if (queue.length === 0) {
    console.log("  [feed/refresh] nothing to refresh today");
    return results;
  }

  let qi = 0;
  const worker = async () => {
    while (qi < queue.length) {
      const item = queue[qi++]!;
      scanned++;
      try {
        // 单账号配额调度（2026-09-14）：轮转用非 README 专用 token（多 token 时跳过首个），
        // 避免把 README 的额度吃掉
        const token = nextRotationToken();
        const headers: Record<string, string> = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const resp = await fetch(`https://api.github.com/repos/${item.repo}`, { headers });
        if (!resp.ok) {
          if (resp.status === 403 || resp.status === 429) {
            limitStreak++;
            if (limitStreak >= Math.max(1, getApiTokens().length)) {
              console.error(
                `  [feed/refresh] all ${getApiTokens().length} token(s) rate limited at ${item.repo}, stop for today`,
              );
              break;
            }
            console.error(`  [feed/refresh] token rate limited at ${item.repo}, rotating`);
            continue;
          }
          continue;
        }
        limitStreak = 0;
        const d = (await resp.json()) as { stargazers_count?: number; created_at?: string };
        const newStars = d.stargazers_count ?? 0;
        const m = repoMap.get(item.repo);
        if (m) {
          m.stars = newStars;
          // 本轮拿到真实数据 → 增长值以本轮为准（清除跨轮旧值回退，防虚高固化——既有测试锁定）
          m.lastStarGrowth = undefined;
          if (d.created_at) m.createdAt = d.created_at;
          // 只对「有增长基准」的 repo 计算日均涨星（真实增速信号）：
          // 基准缺失 = 当天新入库的卡，newStars-0 会把总 star 当增长（虚高，见 starGrowth 研讨稿）
          if (baselineStars.has(item.repo)) {
            const oldStars = baselineStars.get(item.repo)!;
            const diff = newStars - oldStars;
            // 同轮内多数据源取大；stars 减少/持平（diff<=0）→ 不动（保留 merge 的 todayStars 或 0）
            if (diff > 0) {
              m.starGrowth = Math.max(m.starGrowth, Math.ceil(diff / intervalDays));
            }
            // 沉寂判定（2026-09-05 拍板「真的沉寂了才退场」）：日均涨星 <2 且无爆发信号 →
            // 静默轮数 +1（跨轮累计在 feed.json）；有信号清零。连续 3 轮 ≈ 数周持续无动静。
            const dailyAvg = Math.ceil(Math.max(diff, 0) / intervalDays);
            const hasSignal =
              dailyAvg >= 2 ||
              m.starGrowth >= DAILY_GROWTH_THRESHOLD ||
              m.starGrowth >= RISING_GROWTH_THRESHOLD;
            m.silentRounds = hasSignal ? 0 : (m.silentRounds ?? 0) + 1;
          }
        }
        results.set(item.repo, newStars);
      } catch (err) {
        console.error(`  [feed/refresh] ${item.repo}: ${err}`);
      }
    }
  };

  // 用 REPRESH_CONCURRENCY 个并发 worker
  const workers = Array.from({ length: REFRESH_CONCURRENCY }, () => worker());
  await Promise.all(workers);

  // 保存游标（本轮最后扫描的位置），下轮从下一个开始
  const lastIdx = queue.length > 0 ? queue[queue.length - 1]!.idx : cursor;
  const nextCursor = (lastIdx + 1) % total;
  try {
    fs.writeFileSync(REFRESH_CURSOR_PATH, String(nextCursor), "utf-8");
  } catch {
    /* ignore */
  }
  console.log(
    `  [feed/refresh] refreshed ${results.size} repos (scan ${scanned}, cursor ${nextCursor}/${total})`,
  );
  return results;
}

// ---------------------------------------------------------------------------
// P0a 长度校验（effLen 定义已移至 checks.ts，此处 re-export 保持测试兼容）
// reasonCn 等效宽度 ≥100 + summaryCn 20-35 字（现行实现=checks.cardChecks 全闸的一部分）
// ---------------------------------------------------------------------------

/**
 * detail 兜底：从 detailCn 截取 reason 用内容（零成本，防重评失败丢卡）。
 * 按 \n\n+ 分段，跳过第一段（与 summary 语义重复，实测重叠度高），
 * 从第二段起累计（段落 join 空格），累计到 effLen ≥100 后继续到最近句号（。！？）
 * 或 effLen 130 封顶截断；第二段起总 effLen <100 时并入第一段尾部再截。
 * 返回必须 effLen ≥100，无法兜底返回 null。
 */
export function fallbackReasonFromDetail(detailCn: string): string | null {
  const segments = detailCn
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (segments.length === 0) return null;
  let body = segments.slice(1).join(" ");
  if (effLen(body) < 100) body = segments.join(" ");
  if (effLen(body) < 100) return null;
  let acc = "";
  let reached = false;
  for (const ch of body) {
    acc += ch;
    if (effLen(acc) >= 100) reached = true;
    if (reached && (/[。！？]/.test(ch) || effLen(acc) >= 130)) break;
  }
  return effLen(acc) >= 100 ? acc : null;
}

/**
 * detail 第一段截取 summary（P0a 兜底收尾：一句话描述从「这是什么」段截 20-35 字句号收尾，
 * 与 reason 用的技术段互补不重复；避免 summary 留空被前端用 reason 首句填充成超长文本）。
 * 返回 effLen 尽量落在 20-35；无法截取返回 ""。
 */
export function summaryFromDetailFirstPara(detailCn: string): string {
  const segments = detailCn
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (segments.length === 0) return "";
  let body = segments[0] ?? "";
  if (effLen(body) < 20) body = segments.join(" ");
  let acc = "";
  let reached = false;
  for (const ch of body) {
    acc += ch;
    if (effLen(acc) >= 20) reached = true;
    if (reached && (/[。！？]/.test(ch) || effLen(acc) >= 35)) break;
  }
  return acc;
}

// ---------------------------------------------------------------------------
// 加载已有评分缓存（避免重复 LLM 调用）
// ---------------------------------------------------------------------------

export function loadExistingScores(feedPath: string = FEED_PATH): {
  scores: Map<string, ScoringResult>;
  detailMap: Map<string, string>;
} {
  try {
    if (!fs.existsSync(feedPath)) {
      // 无 baseline（首次/被杀轮次）时增量缓存仍有效——已评部分不能丢
      const partial = loadPartialScores();
      if (partial.size > 0) {
        console.log(`  [feed/cache] recovered ${partial.size} partial scores (no baseline)`);
        return { scores: partial, detailMap: new Map() };
      }
      return { scores: new Map(), detailMap: new Map() };
    }
    const raw = fs.readFileSync(feedPath, "utf-8");
    const cards = JSON.parse(raw) as FeedCard[];
    const map = new Map<string, ScoringResult>();
    // baseline 每卡的 detailCn（P0a detail 兜底数据源：重评失败 + 有历史 detail → 第二段截取）
    const detailMap = new Map<string, string>();
    for (const c of cards) {
      if (c.detailCn) detailMap.set(c.repo, c.detailCn);
      if (c.reasonCn && c.aiScore !== undefined) {
        map.set(c.repo, {
          repo: c.repo,
          aiDims: c.aiDims || (c.aiDim ? [c.aiDim] : []),
          aiDim: c.aiDim || c.aiDims?.[0] || "其他",
          aiScore: c.aiScore,
          // 判定字段必须带回来（2026-09-14 事故）：漏了 zone/funScore/tags 这三行，
          // 缓存命中卡在重建时会**整片丢掉分区数据**——实测线上 zone 覆盖率 100% → 0.2%
          // （tier-drip 跑一轮即抹平回填成果）。这是「历史卡零重评」铁律的必然推论：
          // **不进 cache 的字段，下一轮重建就没了**。
          zone: c.zone,
          zoneSource: c.zoneSource ?? (c.zone ? "model" : undefined),
          funScore: c.funScore,
          funScoreSource: c.funScoreSource,
          // v3 判定字段（2026-09-14 晚）：六维原始分 / 旧值对照 / 理由。
          // 同一纪律——**不进 cache 的字段，下一轮重建就没了**（见上方事故注释），
          // 所以任何新增的卡片判定字段都必须同时加在这里，并同步扩 feed-cache-zone.test.ts。
          funDims: c.funDims,
          legacyZone: c.legacyZone,
          legacyFunScore: c.legacyFunScore,
          zoneReason: c.zoneReason,
          funReason: c.funReason,
          tags: c.domainTags,
          summaryCn: c.summaryCn,
          reasonCn: c.reasonCn,
          detailCn: c.detailCn || "",
          // 千人千面 v4 的 facts 同样必须带回（2026-09-18 实测事故：v4 上线时漏了这一行，
          // 缓存命中卡重建后 facts 被置空——线上 done 卡 69 张里只剩 25 张有 facts，
          // 且每跑一轮管线就再抹一批。同上方 zone/funScore/tags 事故，同一条纪律）。
          facts: c.facts,
          // GitHub 元数据三元组（2026-09-19 H-04）：同 zone/facts 那条纪律——**不进 cache 的字段，
          // 下一轮重建就没了**。分档（tier）注入仓的 topics/desc 天生为空，历史卡零重评 → 每跑一轮
          // 就把存量卡的 GitHub topics 抹平（线上实测 777 张空 / 1446 张只剩 1 条）。脏数据防御：
          // topics 只认数组，desc/language 空串归一为 undefined（回退由装配端做，不在此造假）。
          topics: Array.isArray(c.topics) ? c.topics : undefined,
          desc: c.desc || undefined,
          language: c.language || undefined,
        });
      }
    }
    console.log(`  [feed/cache] loaded ${map.size} existing scores from ${feedPath}`);
    // 合并评分增量缓存（partial 优先：它是最近一轮可能未完整落盘的新评分）
    const partial = loadPartialScores();
    if (partial.size > 0) {
      for (const [repo, sc] of partial) map.set(repo, sc);
      console.log(`  [feed/cache] merged ${partial.size} partial scores from ${PARTIAL_SCORES_PATH}`);
    }
    return { scores: map, detailMap };
  } catch {
    console.log(`  [feed/cache] no existing feed.json, scoring all repos`);
    // feed.json 缺失/损坏时增量缓存仍有效（被杀轮次的评分不能丢）
    const partial = loadPartialScores();
    if (partial.size > 0) {
      console.log(`  [feed/cache] recovered ${partial.size} partial scores (no baseline)`);
      return { scores: partial, detailMap: new Map() };
    }
    return { scores: new Map(), detailMap: new Map() };
  }
}

// ---------------------------------------------------------------------------
// 待补评队列：LLM 评分失败的 repo 快照兜底保留（下轮强制恢复补评）
// ---------------------------------------------------------------------------

/** 队列条目：MergedRepo 完整快照 + 已失败轮数 */
interface PendingEntry {
  repo: string;
  desc: string;
  stars: number;
  language: string;
  topics: string[];
  source: FeedSource;
  starGrowth: number;
  createdAt?: string;
  silentRounds?: number;
  bigbros: string[];
  ts: string;
  retryCount: number;
}

/** 加载待补评队列（容错：损坏/缺失一律当空队列，digest 主流程绝不能挂） */
function loadPendingRetries(): Map<string, PendingEntry> {
  try {
    if (!fs.existsSync(PENDING_PATH)) return new Map();
    const arr = JSON.parse(fs.readFileSync(PENDING_PATH, "utf-8"));
    if (!Array.isArray(arr)) return new Map();
    const map = new Map<string, PendingEntry>();
    for (const e of arr) {
      if (!e || typeof e.repo !== "string" || !e.repo.includes("/")) continue;
      // 连败超上限的条目保留在 map 中（用于写盘清理），恢复补评时跳过
      map.set(e.repo, {
        repo: e.repo,
        desc: typeof e.desc === "string" ? e.desc : "",
        stars: typeof e.stars === "number" ? e.stars : 0,
        language: typeof e.language === "string" ? e.language : "",
        topics: Array.isArray(e.topics)
          ? e.topics.filter((t: unknown): t is string => typeof t === "string")
          : [],
        source: e.source === "trending" || e.source === "bigbro" ? e.source : "search",
        starGrowth: typeof e.starGrowth === "number" ? e.starGrowth : 0,
        createdAt: typeof e.createdAt === "string" ? e.createdAt : undefined,
        silentRounds: typeof e.silentRounds === "number" ? e.silentRounds : 0,
        bigbros: Array.isArray(e.bigbros)
          ? e.bigbros.filter((b: unknown): b is string => typeof b === "string")
          : [],
        ts: typeof e.ts === "string" ? e.ts : new Date().toISOString(),
        retryCount: e.retryCount,
      });
    }
    if (map.size > 0) console.log(`  [feed/pending] loaded ${map.size} pending retries from ${PENDING_PATH}`);
    return map;
  } catch (err) {
    console.error(`  [feed/pending] load failed: ${err}, starting with empty queue`);
    return new Map();
  }
}

/** 保存待补评队列（容错：写失败仅日志，不影响主流程；空队列写空数组清盘） */
function savePendingRetries(entries: PendingEntry[]): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(PENDING_PATH, JSON.stringify(entries, null, 2), "utf-8");
    if (entries.length > 0) console.log(`  [feed/pending] saved ${entries.length} repos to ${PENDING_PATH}`);
  } catch (err) {
    console.error(`  [feed/pending] save failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// README 拉取（stage1 输入块数据源；增量模式只拉未评分新卡；URL 固定 https api.github.com）
// ---------------------------------------------------------------------------

const README_FETCH_CONCURRENCY = 8;
/** repo 格式校验（owner/repo，字母数字连字符点；防路径注入，URL 仅 https 固定 host） */
const REPO_RE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

/**
 * 拉取一批仓库的 README（GitHub API raw；token 轮换；失败容错=缺省，prompt 降级一行式）。
 * 空壳/镜像仓库（清洗后 <150 且 desc <40 / topics 或 README 自述 mirror）标记 readme="" 跳过。
 * 同批顺带取 repos API 的 pushed_at（pushedAt 全量补齐，P1；与 README 同批=不额外加轮次）。
 */
async function fetchReadmes(repos: RepoForScoring[]): Promise<void> {
  const todo = repos.filter((r) => r.readme === undefined);
  if (todo.length === 0) return;
  let qi = 0;
  const stats = { skeleton: 0, mirror: 0, noReadme: 0, rateLimited: 0, pushedAt: 0 };
  const worker = async () => {
    while (qi < todo.length) {
      const r = todo[qi++]!;
      if (!REPO_RE.test(r.repo)) {
        r.readme = ""; // 非法 repo 格式：不进输入块
        continue;
      }
      try {
        // README 专用 token（首个 token 保留；轮转不碰）——单账号配额调度：README 永不饿死
        const token = nextReadmeToken();
        const headers: Record<string, string> = {
          Accept: "application/vnd.github.raw",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const resp = await fetch(`https://api.github.com/repos/${r.repo}/readme`, { headers });
        if (!resp.ok) {
          if (resp.status === 403 || resp.status === 429) {
            // 限流与「真无 README」分开计数：403 是配额/滥用闸（可重试），404 才是真无
            console.error(`  [feed/readme] rate limited at ${r.repo}, rotating`);
            stats.rateLimited++;
          }
          r.readme = "";
          stats.noReadme++;
          continue;
        }
        const raw = await resp.text();
        const clean = cleanV4(raw);
        if (isSkeleton(clean, r.description)) {
          r.readme = ""; // 空壳：不进输入块（原材料铁律）
          stats.skeleton++;
        } else if (isMirror(r.topics, clean)) {
          r.readme = ""; // 镜像：不进输入块
          stats.mirror++;
        } else {
          r.readme = raw;
        }
      } catch {
        r.readme = ""; // 拉取失败=无 README，prompt 降级一行式（不阻塞）
        stats.noReadme++;
      }
      // pushed_at（同一 worker 顺带取；失败不影响主流程——pushedAt 缺失时组装回退 ts）
      if (r.pushedAt === undefined) {
        try {
          const token = nextReadmeToken(); // 同属「卡片输入侧」配额，用 README 专用 token
          const headers: Record<string, string> = { "X-GitHub-Api-Version": "2022-11-28" };
          if (token) headers["Authorization"] = `Bearer ${token}`;
          const resp = await fetch(`https://api.github.com/repos/${r.repo}`, { headers });
          if (resp.ok) {
            const meta = (await resp.json()) as { pushed_at?: string };
            if (meta.pushed_at) {
              r.pushedAt = meta.pushed_at;
              stats.pushedAt++;
            }
          }
        } catch {
          // 静默：pushedAt 是 P1 增强，缺失不阻塞
        }
      }
    }
  };
  const workers = Array.from({ length: README_FETCH_CONCURRENCY }, () => worker());
  await Promise.all(workers);
  const withReadme = repos.filter((r) => r.readme).length;
  console.log(
    `  [feed/readme] fetched ${withReadme}/${todo.length} READMEs（空壳 ${stats.skeleton} / 镜像 ${stats.mirror} / 拉取失败 ${stats.noReadme}〔其中限流 ${stats.rateLimited}〕）；pushedAt 补齐 ${stats.pushedAt}/${todo.length}`,
  );
}

// ---------------------------------------------------------------------------
// LLM 批量评分
// ---------------------------------------------------------------------------

/** 海选批跑（两段式第一段）：只打分贴标签，输出极短；批大小 PHASE1_BATCH_SIZE。
 *  缺失不做逐库重试（海选便宜，落下的库下轮经 phase1 缓存补筛），chunk 即落缓存。 */
async function phase1Batched(
  repos: RepoForScoring[],
  aiInterestsText: string,
  scheduler?: ProductionScheduler,
  executor?: ScheduledLlmExecutor,
): Promise<Phase1Score[]> {
  const results: Phase1Score[] = [];
  const batches: RepoForScoring[][] = [];
  for (let i = 0; i < repos.length; i += PHASE1_BATCH_SIZE) {
    const batch = repos.slice(i, i + PHASE1_BATCH_SIZE);
    if (batch.length > 0) batches.push(batch);
  }
  console.log(
    `  [feed/phase1] ${batches.length} batches (${repos.length} repos), concurrency=${SCORE_CONCURRENCY}`,
  );

  for (let i = 0; i < batches.length; i += SCORE_CONCURRENCY) {
    const chunk = batches.slice(i, i + SCORE_CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map(async (batch, idx) => {
        const batchNum = i + idx + 1;
        const route =
          scheduler?.routeBatch(
            batch.length,
            batch.map((r) => r.stars),
          ) ?? null;
        // 执行层：路由给谁就谁跑；未注册/熔断 → 编队兜底（付费压舱石通道，生产不中断）
        const routeCaller = route ? (executor?.callerFor(route.model) ?? null) : null;
        try {
          const prompt = buildPhase1ScoringPrompt(batch, aiInterestsText);
          const raw = routeCaller ? await routeCaller(prompt, 2048) : await callLlm(prompt, 2048);
          const parsed = parsePhase1ScoringResult(raw);
          scheduler?.recordCall(route?.model ?? "legacy", prompt.length, raw.length, parsed.length);
          console.log(
            `  [feed/phase1] batch ${batchNum}/${batches.length}: ${parsed.length}/${batch.length} screened${route ? ` (route=${route.model}${routeCaller ? "" : "·编队"})` : ""}`,
          );
          return parsed;
        } catch (err) {
          console.error(`  [feed/phase1] batch ${batchNum}/${batches.length} failed: ${err}`);
          return [];
        }
      }),
    );
    for (const r of chunkResults) results.push(...r);
    // 海选结果即筛即落缓存：被杀/重跑不重复烧筛分
    appendPhase1Scores(chunkResults.flat());
    scheduler?.persist();
  }
  return results;
}

async function scoreBatched(
  repos: RepoForScoring[],
  aiInterestsText: string,
  scoringDeadline = Number.POSITIVE_INFINITY,
  scheduler?: ProductionScheduler,
  repoMap?: Map<string, MergedRepo>,
  executor?: ScheduledLlmExecutor,
): Promise<ScoringResult[]> {
  const results: ScoringResult[] = [];
  // stage1 输入块数据源：拉 README（增量只拉无 readme 的新卡；空壳/镜像过滤）；回写 repoMap 供组装循环 G-source 校验
  await fetchReadmes(repos);
  if (repoMap) {
    for (const r of repos) {
      const m = repoMap.get(r.repo);
      if (m) m.readme = r.readme;
    }
  }
  // stage2 确定性装箱：头部单卡批（高档模型额度）+ 长尾异质批（flash 档），同键批内 ≤1
  const byRepo = new Map(repos.map((r) => [r.repo, r] as const));
  const packed = pack(
    repos.map((r) => ({ repo: r.repo, desc: r.description, topics: r.topics, stars: r.stars })),
    BATCH_SIZE,
  );
  const batches = packed.map((b) => b.map((x) => byRepo.get(x.repo)!));
  console.log(
    `  [feed/scoring] ${batches.length} batches (${repos.length} repos), concurrency=${SCORE_CONCURRENCY}`,
  );

  // 并行评分：每次 SCORE_CONCURRENCY 个批次同时进行，利用 LLM 并发槽位。
  // 轻语义：只做「解析 + 缺失重试（1 次）+ G9 批内剔除」；G1-G9 全闸裁决在组装循环
  //（那里有带反馈重评 ≤3 次 + detail 兜底 + pending 兜底，是单卡质量裁决的唯一权威点）。
  for (let i = 0; i < batches.length; i += SCORE_CONCURRENCY) {
    const chunk = batches.slice(i, i + SCORE_CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map(async (batch, idx) => {
        const batchNum = i + idx + 1;
        // 调度器：批粒度路由（头部单卡批 → 高档；长尾批 → flash；全池耗尽 → null=付费兜底）
        const route =
          scheduler?.routeBatch(
            batch.length,
            batch.map((r) => r.stars),
          ) ?? null;
        // 执行层：按路由键直连 provider（参数纪律落地）；未注册/熔断 → 编队兜底
        const routeCaller = route ? (executor?.callerFor(route.model) ?? null) : null;
        try {
          const prompt = buildFeedScoringPrompt(batch, aiInterestsText);
          const raw = routeCaller ? await routeCaller(prompt, 8192) : await callLlm(prompt, 8192);
          const parsed = parseScoringResult(raw);
          // 失败重试：如果解析结果太少，拆分批次逐个重试（LLM 长输出易截断）
          if (parsed.length < batch.length) {
            const missing = batch.filter((r) => !parsed.some((p) => p.repo === r.repo));
            console.log(
              `  [feed/scoring] batch ${batchNum}/${batches.length}: ${parsed.length}/${batch.length} scored, retrying ${missing.length} missing...`,
            );
            const retried = await retryScoring(
              missing,
              aiInterestsText,
              1,
              false,
              scoringDeadline,
              undefined,
              scheduler,
              executor,
            );
            parsed.push(...retried);
          }
          const got = parsed.filter((p) => batch.some((r) => r.repo === p.repo));
          // G9 批内（对同批解析成功的卡）：开头撞车 → 剔除（组装循环带 g9Feedback 重评）
          if (got.length >= 2) {
            const batchCards = got.map((sc) => ({ repo: sc.repo, detail_cn: sc.detailCn }));
            for (const hit of checkBatch(batchCards)) {
              const hitRepo = batchCards[hit.i]!.repo;
              const idx2 = got.findIndex((sc) => sc.repo === hitRepo);
              if (idx2 >= 0) got.splice(idx2, 1);
            }
          }
          scheduler?.recordCall(route?.model ?? "legacy", prompt.length, raw.length, got.length);
          const modelKey = route?.model ?? "legacy";
          console.log(
            `  [feed/scoring] batch ${batchNum}/${batches.length}: ${got.length}/${batch.length} scored${route ? ` (route=${route.model}${routeCaller ? "" : "·编队"})` : ""}`,
          );
          return got.map((sc) => ({ ...sc, _model: modelKey }));
        } catch (err) {
          console.error(`  [feed/scoring] batch ${batchNum}/${batches.length} failed: ${err}`);
          return [];
        }
      }),
    );
    for (const r of chunkResults) results.push(...r);
    // 评分增量落盘：每 chunk 成功评分立即写缓存——digest 撞超时墙被杀时
    // 已评部分下轮直接命中缓存零成本续跑（2026-09-05 两轮撞墙零产出之鉴）
    appendPartialScores(chunkResults.flat());
    scheduler?.persist();
  }
  return results;
}

/** 对缺失/不达标的 repo 逐个重试 LLM 评分（单 repo prompt，输出短，成功率更高）。
 *  checkLength=true 时每个 repo 最多重试 maxAttempts 次，每次过 G1-G9 全闸（cardChecks），
 *  带上一轮失败明细（buildRetryPrompt）修正重写；达标即用。
 *  deadline（GT-0906-01 连环刀）：评分段墙钟红线，到线即停——剩余仓库由调用方记入
 *  failedThisRound → pending-retry 下轮自动补评，绝不阻塞轮次。 */
async function retryScoring(
  repos: RepoForScoring[],
  aiInterestsText: string,
  maxAttempts = 3,
  checkLength = true,
  deadline = Number.POSITIVE_INFINITY,
  initialFails?: string[],
  scheduler?: ProductionScheduler,
  executor?: ScheduledLlmExecutor,
): Promise<ScoringResult[]> {
  const results: ScoringResult[] = [];
  // 重评前补 README（2026-09-14 实测修正）：批量评分路径会先 fetchReadmes，但重评路径
  // （pending 恢复的老候选、批量失败后逐仓补评）此前直接进模型——没 README 的卡会被
  // facts 的 G-source 硬闸判「source 不在参考文档」而空转 3 次、烧光预算。
  // 这里补一道：本轮还没取到 README 的先取（走 README 专用 token，与首轮共用预算）。
  await fetchReadmes(repos);
  for (const repo of repos) {
    if (Date.now() > deadline) {
      console.warn(
        `  [feed/scoring] scoring budget exhausted at ${repo.repo} — ${repos.length - results.length} repo(s) deferred to pending-retry`,
      );
      break;
    }
    // 逐仓重评也走矩阵：单卡批 → 头部档（star≥1万）/长尾档；额度耗尽自动降级
    const route = scheduler?.routeBatch(1, [repo.stars]) ?? null;
    const routeCaller = route ? (executor?.callerFor(route.model) ?? null) : null;
    let prevFails = initialFails;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (Date.now() > deadline) break;
      try {
        const base = buildFeedScoringPrompt([repo], aiInterestsText);
        const prompt = prevFails && prevFails.length > 0 ? buildRetryPrompt(base, prevFails) : base;
        const raw = routeCaller ? await routeCaller(prompt, 4096) : await callLlm(prompt, 4096);
        scheduler?.recordCall(route?.model ?? "legacy", prompt.length, raw.length, 0);
        const parsed = parseScoringResult(raw);
        const sc = parsed[0];
        if (sc) {
          const doc = repo.readme ? cleanV4(repo.readme) : undefined;
          const { ok, fails } = cardChecks(sc, doc);
          if (!checkLength || ok) {
            results.push({ ...sc, _model: route?.model ?? "retry" });
            scheduler?.markOk(route?.model ?? "legacy");
            break;
          }
          prevFails = fails;
          console.log(
            `  [feed/scoring] retry ${repo.repo} attempt ${attempt + 1}: ${fails.slice(0, 3).join("；")}`,
          );
        }
      } catch (err) {
        console.error(`  [feed/scoring] retry ${repo.repo} attempt ${attempt + 1} failed: ${err}`);
      }
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// 主管道
// ---------------------------------------------------------------------------

/**
 * 距上次管道真实更新的天数：git log 查 data/feed.json 最后一次 commit 时间。
 * （文件 mtime 会被 checkout 刷新不可靠；git commit 日期才是数据的真实更新时间。）
 * 用于 starGrowth 差分归一：间隔 >1 天时把增量摊薄成日均，防停摆后虚高。
 * 失败（无 git/异常）回退 1 天（= 原「今日增长」语义）。clamp 到 [1, 30] 天。
 */
export async function detectRunIntervalDays(): Promise<number> {
  try {
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const out = await promisify(execFile)("git", ["log", "-1", "--format=%cI", "--", "data/feed.json"], {
      timeout: 10_000,
    });
    const lastCommit = new Date(out.stdout.trim()).getTime();
    if (Number.isNaN(lastCommit)) return 1;
    const days = (Date.now() - lastCommit) / (24 * 3600 * 1000);
    return Math.min(Math.max(days, 1), 30);
  } catch {
    return 1;
  }
}

export async function generateFeed(
  config: RadarConfig,
  trendingData: TrendingData,
  opts?: { runIntervalDays?: number },
): Promise<FeedCard[]> {
  const now = new Date().toISOString();
  const runStartedAt = Date.now(); // 轮时长基准（分档剩余时间估算用）
  console.log("[feed] merging trending + search (incremental, bigbro stamping inside)...");

  // 调度器（方案 B 框架：批粒度路由/额度记账/断点续跑）+ 分位归一化（多模型混产前提）
  const scheduler = new ProductionScheduler();
  const aiNorm = new QuantileNormalizer();
  const funNorm = new QuantileNormalizer();
  // 执行层（2026-09-14）：矩阵键 → 独立调用通道（参数纪律 + 节流熔断）；缺 key 的通道不阻塞其余源
  let executor: ScheduledLlmExecutor;
  try {
    executor = executorFromMatrix(parseMatrix());
  } catch (err) {
    console.error(`  [feed] executor init failed, falling back to fleet for all routes: ${err}`);
    executor = new ScheduledLlmExecutor([]);
  }
  if (executor.size > 0) {
    console.log(
      `  [feed] executor lanes: ${scheduler.ledger
        .snapshot()
        .models.map((m) => m.model)
        .join(" | ")}`,
    );
  } else {
    console.log("  [feed] executor lanes: 空（SCHED_*_MODELS 未注入）→ 全部走 callLlm 编队");
  }

  // 增长差分的摊薄间隔：默认按 git 历史自动探测（停摆 N 天 → 增量摊成日均），测试可注入固定值
  const runIntervalDays = opts?.runIntervalDays ?? (await detectRunIntervalDays());
  if (runIntervalDays > 1) {
    console.log(
      `  [feed] last real update was ${runIntervalDays.toFixed(1)} days ago — starGrowth normalized to daily average`,
    );
  }

  // 1. 合并三路数据（增量模式：baseline = 上次 feed.json，只增不减）
  const repoMap = new Map<string, MergedRepo>();
  const baselineStars = new Map<string, number>();
  if (fs.existsSync(FEED_PATH)) {
    try {
      const raw = fs.readFileSync(FEED_PATH, "utf-8");
      const cards = JSON.parse(raw) as FeedCard[];
      for (const c of cards) {
        if (!c.repo) continue;
        baselineStars.set(c.repo, c.stars);
        repoMap.set(c.repo, {
          repo: c.repo,
          desc: c.desc,
          stars: c.stars,
          language: c.language,
          topics: c.topics,
          source: c.source,
          starGrowth: 0, // 本轮真实值入口：trending 代理值/refresh 差值会覆盖；未刷新卡组装时回退 lastStarGrowth
          lastStarGrowth: c.starGrowth ?? 0, // 跨轮保留旧增长值（2026-09-16 修复）：滴灌轮只刷新游标窗口
          // 内约 screen_cap 张卡，其余卡若每轮强制归 0，热门/每日频道会在两轮完整刷新之间被
          // 一轮轮抽干（实测线上热门 403→57、V-C 不通过）。刷新成功的卡由 refresh 清除本字段、
          // 用真实差值覆盖（既有「虚高自愈」测试锁定）；未刷新卡沿用上轮值，直到下一轮刷新。
          createdAt: c.createdAt,
          silentRounds: c.silentRounds ?? 0,
          bigbros: c.bigbros,
          ts: c.ts,
        });
      }
      console.log(`  [feed] baseline loaded ${cards.length} existing cards`);
    } catch (err) {
      console.error(`  [feed] baseline load failed: ${err}, starting fresh`);
    }
  }

  // 1.5 恢复待补评队列：LLM 评分失败的 repo 兜底保留——即使今天未再被抓取也强制补评
  //     （修复「失败卡不进 baseline → 永不补评」丢卡缺陷；今天已抓到的用新数据覆盖）
  const pendingRetries = loadPendingRetries();
  if (pendingRetries.size > 0) {
    let restored = 0;
    for (const [repo, pe] of pendingRetries) {
      if (pe.retryCount >= PENDING_MAX_RETRIES) continue; // 连败超上限：放弃恢复（防僵尸长期占位）
      if (repoMap.has(repo)) continue; // 今天已抓到 → 保留今天的新数据
      repoMap.set(repo, {
        repo: pe.repo,
        desc: pe.desc,
        stars: pe.stars,
        language: pe.language,
        topics: pe.topics,
        source: pe.source,
        starGrowth: 0, // 快照值可能已虚高，从 0 重算（refresh 用真实差值覆盖）
        lastStarGrowth: pe.starGrowth ?? 0, // 恢复待补评卡也保留旧增长值（未刷新时回退，防热门塌缩）
        createdAt: pe.createdAt,
        silentRounds: pe.silentRounds ?? 0,
        bigbros: pe.bigbros,
        ts: pe.ts,
        pending: true,
      });
      baselineStars.set(repo, pe.stars); // 增长基准 = 快照 stars（防 starGrowth 虚高）
      restored++;
    }
    console.log(
      `  [feed/pending] restored ${restored}/${pendingRetries.size} repos for retry (${repoMap.size} total)`,
    );
  }

  for (const t of trendingData.trendingRepos) {
    repoMap.set(t.fullName, {
      repo: t.fullName,
      desc: t.description,
      stars: t.totalStars,
      language: t.language,
      // 止漏（09-19 栗子裁 A 案）：trending 源天生无 topics，整条 set 会抹掉 baseline 已有的真 topics
      topics: repoMap.get(t.fullName)?.topics ?? [],
      source: "trending",
      starGrowth: t.todayStars,
      bigbros: [],
      ts: now,
    });
  }

  for (const s of trendingData.searchRepos) {
    const ex = repoMap.get(s.fullName);
    if (ex) {
      // 合并：补 topics（searchQuery 作为 topic）
      if (!ex.topics.includes(s.searchQuery)) ex.topics.push(s.searchQuery);
      // 取较新的 ts
      if (s.pushedAt > ex.ts) ex.ts = s.pushedAt;
      // search API 自带 createdAt：trending 来源缺失时补上（rising 判定用）
      if (!ex.createdAt && s.createdAt) ex.createdAt = s.createdAt;
    } else {
      repoMap.set(s.fullName, {
        repo: s.fullName,
        desc: s.description ?? "",
        stars: s.stargazersCount,
        language: s.language ?? "",
        topics: [s.searchQuery],
        source: "search",
        starGrowth: 0,
        createdAt: s.createdAt,
        bigbros: [],
        ts: s.pushedAt,
      });
    }
  }

  // 2.5 stars 轮转刷新：库内 repo 分批查最新 stars（游标续跑），只增不减数据的每日标签依赖它
  await refreshStarsRoundRobin(repoMap, baselineStars, runIntervalDays);
  console.log(`  [feed] after refresh: ${repoMap.size} unique repos`);

  // 2.7 库内 star 盖章已停跑（2026-09-05 拍板：陌生库作者的 star 对访客零价值，bigbros 全出口退役）。
  //     盖章每天烧上千 GitHub API 配额却只产出无人消费的 bigbros 数据；bigbro-stars.ts 与
  //     loadStampState 系保留（不删文件），如需恢复语义在此处重新接线即可。

  // 3. LLM 批量评分（增量模式：跳过已有缓存的仓库，只给新仓库评分）
  const { scores: existingScores, detailMap } = loadExistingScores();
  // 评分队列均衡：trending 来源优先（保证今日热门不被 search 淹没）；
  // search 组内按领域（searchQuery label = topics[0]）分桶、桶内按 star 降序、桶间轮询合并，
  // 保证每个领域都有代表进入评分队列（否则高星 AI 会挤掉低星非 AI，非 AI 拿不到评分就进不了 feed）
  // 3.0 分档队列（2026-09-14 栗子拍板）：索引里「尚未产出卡」的仓库按 档位→星级 排序，
  //     直接插到候选池头部——配合 cap 窗口形成「先把 t1 档吃完、再吃 t2、最后 t3」的推进。
  //     索引缺失时整段跳过（降级为原有 trend+search 路径，不阻塞）。
  const tierIndex = loadTierIndex();
  if (tierIndex) {
    const doneSet = new Set(existingScores.keys());
    const candidates = tierCandidates(tierIndex, doneSet);
    const tierOfRepo = tierIndex.repos ?? {};
    let injected = 0;
    for (const c of candidates) {
      if (repoMap.has(c.repo)) continue; // 今天已抓到（trend/search 更鲜）→ 保留新数据
      const e = tierOfRepo[c.repo];
      repoMap.set(c.repo, {
        repo: c.repo,
        desc: "",
        stars: c.stars,
        language: c.lang ?? "",
        topics: [],
        source: "tier",
        starGrowth: 0,
        createdAt: undefined,
        pushedAt: e?.pushedAt,
        bigbros: [],
        ts: now,
        // readme 留 undefined（**不是空串**）：空串会被 fetchReadmes 的「已处理」判定跳过，
        // 导致分档仓永远拿不到输入块（facts 的 G-source 闸随之不可满足）——实测踩坑。
      });
      injected++;
    }
    console.log(`  [feed/tier] injected ${injected} 未完成仓库（索引 ${Object.keys(tierOfRepo).length} 条）`);
  }

  const notScored = [...repoMap.values()].filter((m) => !existingScores.has(m.repo));
  // 待补评恢复的 repo 排最前（它们已经等了一轮，先补评）
  const pendingFirst = notScored.filter((m) => m.pending);
  const rest = notScored.filter((m) => !m.pending);
  // 非 search 新卡（trending；pending 恢复的 source=bigbro 旧快照也在此路径补评）
  // 2026-09-01 关注解耦：不再有 bigbro 新卡，旧的 MAX_BIGBRO_SCORE 配额随灌卡语义一并退役
  // 分档仓（source=tier）单列且排最前：它们是「全量建库」的主队列，优先于 trend/search
  const tierFirst = rest.filter((m) => m.source === "tier").sort((a, b) => b.stars - a.stars);
  const nonTier = rest.filter((m) => m.source !== "tier");
  const nonSearch = nonTier.filter((m) => m.source !== "search").sort((a, b) => b.stars - a.stars);
  const searchBuckets = new Map<string, MergedRepo[]>();
  for (const m of nonTier) {
    if (m.source !== "search") continue;
    const key = m.topics[0] ?? "unknown";
    if (!searchBuckets.has(key)) searchBuckets.set(key, []);
    searchBuckets.get(key)!.push(m);
  }
  for (const arr of searchBuckets.values()) arr.sort((a, b) => b.stars - a.stars);
  const bucketKeys = [...searchBuckets.keys()].sort();
  const roundRobin: MergedRepo[] = [];
  let depth = 0;
  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const k of bucketKeys) {
      const arr = searchBuckets.get(k)!;
      if (depth < arr.length) {
        roundRobin.push(arr[depth]!);
        hasMore = true;
      }
    }
    depth++;
  }
  // 3.1 两段式评分 · 第一段「海选」（2026-09-06）：只打分不写文案，全量筛；
  //     入库队列次序（pending 优先/trending 优先/search 领域轮询）原样保留，只是消费方
  //     从「全文案队列」变成「海选队列」——领域多样性在筛分入口保底。
  const phase1Cache = loadPhase1Scores();
  // 海选窗口 fresh-filter（GT-0906-01 连环刀）：pending 补评永远在队首，其余只取「尚未海选」的仓库。
  // 已海选未精评的仓库本轮已消费过 prose 机会，不再占窗——否则窗口每轮只推进 prose 数（~60）而非
  // cap 数（400），万级池要 100+ 轮才筛得完；fresh 过滤后窗口每轮推进 cap 数，~20 轮筛完全池。
  // cap ≥ 全池（完整轮）时 fresh 过滤即空操作，语义与旧管道一致。
  // 分档仓（source=tier）已在 tierFirst（按星级降序）→ 直接接在海选窗尾部：
  // tier 队列优先于 trend/search（全量建库的主队列），但 pending 补评仍最前。
  const screenQueue: RepoForScoring[] = [
    ...pendingFirst,
    ...tierFirst.filter((m) => !phase1Cache.has(m.repo)),
    ...nonSearch.filter((m) => !phase1Cache.has(m.repo)),
    ...roundRobin.filter((m) => !phase1Cache.has(m.repo)),
  ]
    .slice(0, MAX_LLM_SCORE_REPOS)
    .map((m) => ({
      repo: m.repo,
      description: m.desc,
      stars: m.stars,
      language: m.language,
      topics: m.topics,
    }));
  const needScreen = screenQueue.filter((r) => !phase1Cache.has(r.repo));
  console.log(
    `[feed] ${existingScores.size} prose-cached, ${phase1Cache.size} phase1-cached, screening ${needScreen.length}/${screenQueue.length} repos (cap ${MAX_LLM_SCORE_REPOS})...`,
  );
  // 评分段总预算（GT-0906-01 连环刀）：从海选批跑到逐仓重评共用一条墙钟红线，
  // 到线后重评放弃 → failedThisRound → pending-retry，轮时长上界锁回 ≤20 分钟
  const scoringDeadline = Date.now() + SCORING_BUDGET_MS;
  const freshPhase1 =
    needScreen.length > 0
      ? await phase1Batched(needScreen, config.interests.aiInterestsText, scheduler, executor)
      : [];
  const freshMap = new Map(freshPhase1.map((p) => [p.repo, p] as const));

  // 3.2 第二段「精评」top-K 选择：海选分最高的 K 张卡才写中文文案。
  //     铁律（栗子 2026-09-06 拍板）：出现在 GitTok 的卡必须有全套文案——
  //     所以精评在落盘前完成，未入选的卡根本不进 feed（无需文案），不违反铁律。
  const screened: SelectionInput[] = [];
  for (const r of screenQueue) {
    const p1 = phase1Cache.get(r.repo) ?? freshMap.get(r.repo);
    if (p1) {
      const m = repoMap.get(r.repo);
      screened.push({
        repo: r.repo,
        aiScore: p1.aiScore,
        starGrowth: (m?.starGrowth || m?.lastStarGrowth) ?? 0,
        stars: m?.stars ?? 0,
      });
    }
  }
  const screenedSet = new Set(screened.map((s) => s.repo));
  const screenQueueSet = new Set(screenQueue.map((s) => s.repo));
  const proseSelected = selectForProse(screened, PROSE_TOP_K);
  const reposNeedingScore: RepoForScoring[] = screenQueue.filter((r) => proseSelected.has(r.repo));
  console.log(
    `[feed] phase1 screened ${screened.length}, prose top-K ${reposNeedingScore.length} (K=${PROSE_TOP_K})...`,
  );
  const newScoringResults =
    reposNeedingScore.length > 0
      ? await scoreBatched(
          reposNeedingScore,
          config.interests.aiInterestsText,
          scoringDeadline,
          scheduler,
          repoMap,
          executor,
        )
      : [];
  const scoringMap = new Map<string, ScoringResult>([
    ...existingScores,
    ...newScoringResults.map((r) => [r.repo, r] as const),
  ]);

  // 4. 组装 FeedCard（只保留 LLM 评分成功的仓库，不使用模板兜底）
  const cards: FeedCard[] = [];
  let llmCount = 0;
  /** 本轮评分失败（或未轮到评分）的 repo——记入待补评队列，下轮强制恢复补评 */
  const failedThisRound: MergedRepo[] = [];
  for (const m of repoMap.values()) {
    let sc = scoringMap.get(m.repo);
    // 缓存命中的存量卡原样输出：增量管道「历史卡缓存命中零重评」铁律（既有测试锁定，历史卡零 LLM 成本）。
    // P0a 长度校验只作用于本轮新评分/恢复补评的卡；存量短卡由任务 2 清 reasonCn 失效后走新评分路径收敛。
    const cachedHit = existingScores.has(m.repo);
    if (!cachedHit) {
      // 只有精评入选者走下方评分/兜底路径，其余仓库分类处置（GT-0906-01 连环刀）：
      // ① 在本轮海选窗内但海选失败（无 phase1 分，LLM 全灭/单批失败）→ 记入待补评
      //    （retryCount+1，下轮 pendingFirst 优先恢复重筛），不烧逐仓重评——
      //    旧代码对这类仓库逐仓 retryScoring×3，饱和时段足以拖爆作业窗；
      // ② 海选已筛未入选 top-K：主动筛掉，不是评分失败——不进 feed（无文案不出现，栗子铁律），
      //    也不进待补评（进队列会变僵尸：分数在 phase1 缓存里，永不入选却每轮 +1 重试计数）；
      // ③ 未进本轮海选窗（滴灌 cap 截断的仓库）：不是失败，只是排队未轮到——旧代码会落到
      //    逐仓 retryScoring×3（6000+ 仓库 × 3 次 LLM 调用 = 小轮爆窗的另一真根源），现在
      //    直接跳过，下轮海选窗口自然推进到它们。完整轮 cap ≥ 全池时③类为空，语义不变。
      if (!proseSelected.has(m.repo)) {
        // 持有历史 detail 的仓库例外：detail 兜底是零 LLM 成本防丢卡路径（既有测试锁定），
        // 不在此跳过，落到下方质量分支走「重评失败 → detail 兜底」
        if (!detailMap.has(m.repo)) {
          // ① 在本轮海选窗内但海选失败（无 phase1 分，LLM 全灭/单批失败）→ 入待补评
          //    （retryCount+1，下轮 pendingFirst 优先恢复重筛），不烧逐仓重评；
          // ②③ 已筛未入选（主动淘汰）/ 未进本轮窗（滴灌排队未轮到）→ 直接跳过，
          //    下轮海选窗口自然推进。完整轮 cap ≥ 全池时③类为空，语义不变。
          if (!screenedSet.has(m.repo) && screenQueueSet.has(m.repo)) {
            failedThisRound.push(m);
          }
          continue;
        }
      }
      // 全闸裁决（G1-G9 + 调度器合法性闸，2026-09-13 v6 全闸进生产）：
      // reason/summary/detail 长度、开头黑名单、覆盖度、序号模板、时效/推广词、zone/fun_score/tags/facts 合法性
      // 不达标 → 带反馈单 repo 重评 ≤3 次（每次过全闸，达标即用）
      let gateFails: string[] = [];
      if (sc) {
        const doc = m.readme ? cleanV4(m.readme) : undefined;
        const gate = cardChecks(sc, doc);
        if (!gate.ok) gateFails = gate.fails;
      }
      if (!sc || gateFails.length > 0) {
        const retryRepo: RepoForScoring = {
          repo: m.repo,
          description: m.desc,
          stars: m.stars,
          language: m.language,
          topics: m.topics,
          readme: m.readme,
        };
        const retried = await retryScoring(
          [retryRepo],
          config.interests.aiInterestsText,
          3,
          true,
          scoringDeadline,
          gateFails.length > 0 ? gateFails : undefined,
          scheduler,
          executor,
        );
        if (retried.length > 0) {
          sc = retried[0]!;
          // 重评内补拉的 README 回写 repoMap：后续装配/闸校验与下一轮都受益（零额外成本）
          const refetched = retryRepo.readme;
          if (refetched && !m.readme) m.readme = refetched;
        } else {
          const detail = sc?.detailCn || detailMap.get(m.repo) || "";
          // 兜底条件：detail 自身合格（detailQualified：500-800 字/3-5 段/无黑词/无代码块）
          // 且（① 纯长度类失败——reason/summary 字数；② 无评分但有历史合格 detail——防丢卡）。
          // 从合格 detail 截取 reason/summary = 复用合格内容，非掩盖不合格；
          // zone/fun_score/tags/facts 等合法性失败不可被兜底掩盖（宁缺毋滥）。
          const lengthOnly =
            gateFails.length > 0 &&
            gateFails.every((f) => f.startsWith("一句话描述") || f.startsWith("简要介绍"));
          const detailUsable = detail.length > 0 && detailQualified(detail) && (lengthOnly || !sc);
          if (detailUsable) {
            // 重评仍失败 + 有历史/本轮 detail + 纯长度失败 → detail 第二段兜底（零成本，防丢卡）
            const fallback = fallbackReasonFromDetail(detail);
            if (fallback) {
              console.log(
                `  [feed/scoring] ${m.repo}: rescore failed, fallback reason from detail (effLen=${effLen(fallback).toFixed(1)})`,
              );
              if (!sc) {
                // 本轮评分失败 + 历史 detail 兜底：构造最小评分（summary 从 detail 第一段截 20-35 字，
                // 防前端用 reason 首句填充成超长文本——P0a 收尾）
                sc = {
                  repo: m.repo,
                  aiDims: [],
                  aiDim: "其他",
                  aiScore: 0.5,
                  summaryCn: summaryFromDetailFirstPara(detail),
                  reasonCn: fallback,
                  detailCn: detail,
                };
              } else {
                // sc 有值（本轮批量评分成功）但长度不达标 + 重评失败：reason 用 detail 兜底的同时，
                // summary 若不达标也一并从 detail 第一段截取（与 reason 用的第二段互补，零重复风险）
                const summaryOk = sc.summaryCn && sc.summaryCn.length >= 20 && sc.summaryCn.length <= 35;
                sc = {
                  ...sc,
                  reasonCn: fallback,
                  detailCn: detail,
                  summaryCn: summaryOk ? sc.summaryCn : summaryFromDetailFirstPara(detail),
                };
              }
            } else {
              // 纯长度失败但 detail 兜底不可用（detail 异常短）→ 不合格不上站（宁缺毋滥）
              failedThisRound.push(m);
              continue;
            }
          } else {
            // 非纯长度失败（内容/合法性闸失败）或无可兜底 detail → 不合格不上站，进待补评
            failedThisRound.push(m);
            continue;
          }
        }
      }
    }
    // 评分失败（重评/兜底均不可用）的仓库直接跳过，不进信息流（但记入待补评队列兜底，杜绝永久丢失）
    if (!sc || !sc.reasonCn) {
      failedThisRound.push(m);
      continue;
    }
    // 分位归一化（多模型混产前提）：只作用于本轮新评分卡（缓存命中卡保持历史值——增量「历史卡零重评」铁律）
    if (!cachedHit) {
      const modelKey = sc._model ?? "legacy";
      aiNorm.record(modelKey, sc.aiScore);
      if (sc.funScore !== undefined) funNorm.record(modelKey, sc.funScore);
      sc = {
        ...sc,
        aiScore: aiNorm.normalize(modelKey, sc.aiScore),
        funScore: sc.funScore !== undefined ? funNorm.normalize(modelKey, sc.funScore) : sc.funScore,
        // 本轮新产出的判定 = 模型判定（覆盖任何历史 provenance 标）
        zoneSource: sc.zone ? "model" : undefined,
        funScoreSource: sc.funScore !== undefined ? "model" : undefined,
      };
    }
    const [owner = "", ...nameParts] = m.repo.split("/");
    const name = nameParts.join("/") || m.repo;
    llmCount++;
    // H-04 装配端兜底（与 loadExistingScores 白名单成对，缺一即半修）：本轮窗口没抓到元数据
    // （分档注入仓的 topics 恒为 []、desc 恒为 ""）→ 回退缓存卡上的原值，不再重建即丢。
    const topics = m.topics?.length ? m.topics : (sc.topics ?? []);
    const language = m.language || sc.language || "";
    const desc = m.desc || sc.desc || "";
    const partialCard = {
      repo: m.repo,
      owner,
      name,
      desc,
      summaryCn: sc.summaryCn,
      reasonCn: sc.reasonCn,
      detailCn: sc.detailCn,
      // 卡片组装同样必须带上 facts（2026-09-18 三处补齐之一）：只补 cache 白名单不够，
      // 这里漏了照样丢——assembly 是「重建即丢」链上的最后一环。
      facts: sc.facts,
      stars: m.stars,
      starGrowth: m.starGrowth || (m.lastStarGrowth ?? 0), // 未刷新卡回退上轮增长值（热门/每日频道不塌缩）
      createdAt: m.createdAt,
      silentRounds: m.silentRounds,
      language,
      topics,
      aiDims: sc.aiDims,
      aiDim: sc.aiDim,
      zone: sc.zone,
      zoneSource: sc.zoneSource,
      funScore: sc.funScore,
      funScoreSource: sc.funScoreSource,
      funDims: sc.funDims,
      legacyZone: sc.legacyZone,
      legacyFunScore: sc.legacyFunScore,
      zoneReason: sc.zoneReason,
      funReason: sc.funReason,
      domainTags: sc.tags,
      domainKey:
        sc.zone && sc.tags && sc.tags.length > 0 ? (domainKeyOf(sc.zone, sc.tags) ?? undefined) : undefined,
      pushedAt: m.pushedAt ?? m.ts, // 真实 pushed_at（fetchReadmes 同批抓）；缺失回退 ts
      tags: buildTags(sc.aiDims, topics, language),
      aiScore: sc.aiScore,
      source: m.source,
      // bigbros 截断 10：防名单膨胀后数组体积失控（前端展示前 3 个是既有逻辑）
      bigbros: m.bigbros.slice(0, 10),
      url: `https://github.com/${m.repo}`,
      ts: m.ts,
      score: 0,
    };
    cards.push({
      ...partialCard,
      // 分区信号：zone（LLM 判定链）优先，缺省回退 classifyCategory（存量兼容）
      category: zoneToCategory(sc.zone) ?? classifyCategory(partialCard),
      ...classifyMomentum(partialCard),
    });
  }
  console.log(`  [feed] ${llmCount}/${repoMap.size} repos have LLM content (rest skipped)`);

  // 4.5 更新待补评队列：本轮评分成功的移出（历史缓存命中卡本来就不在队列）；
  //     本轮失败/未轮到评分的入队（retryCount+1）；连败超上限放弃；cap 防失控膨胀
  if (failedThisRound.length > 0 || pendingRetries.size > 0) {
    const retryMap = new Map(pendingRetries);
    const scoredNow = new Set(newScoringResults.filter((r) => r.reasonCn).map((r) => r.repo));
    for (const repo of scoredNow) retryMap.delete(repo);
    // 已通过其他路径持有评分的（缓存命中 = 已解决）→ 出队（防僵尸条目残留）
    for (const repo of [...retryMap.keys()]) {
      if (existingScores.has(repo)) retryMap.delete(repo);
    }
    // 海选已筛且未入选的 pending 条目 → 出队：分数已在 phase1 缓存，不是丢失；
    // 留着会变僵尸（永不入选却永占队列名额）
    for (const repo of [...retryMap.keys()]) {
      if (screenedSet.has(repo) && !proseSelected.has(repo)) retryMap.delete(repo);
    }
    for (const m of failedThisRound) {
      const prev = retryMap.get(m.repo);
      retryMap.set(m.repo, {
        repo: m.repo,
        desc: m.desc,
        stars: m.stars,
        language: m.language,
        topics: m.topics,
        source: m.source,
        starGrowth: m.starGrowth || (m.lastStarGrowth ?? 0),
        createdAt: m.createdAt,
        silentRounds: m.silentRounds ?? 0,
        bigbros: m.bigbros,
        ts: m.ts,
        retryCount: (prev?.retryCount ?? 0) + 1,
      });
    }
    const abandoned = [...retryMap.values()].filter((pe) => pe.retryCount >= PENDING_MAX_RETRIES).length;
    const entriesBeforeCap = [...retryMap.values()].filter((pe) => pe.retryCount < PENDING_MAX_RETRIES);
    const truncated = Math.max(0, entriesBeforeCap.length - PENDING_MAX);
    const nextEntries = entriesBeforeCap.sort((a, b) => a.repo.localeCompare(b.repo)).slice(0, PENDING_MAX);
    savePendingRetries(nextEntries);
    if (abandoned > 0) {
      console.log(
        `  [feed/pending] abandoned ${abandoned} repos after ${PENDING_MAX_RETRIES} failed retries`,
      );
    }
    if (truncated > 0) {
      console.log(`  [feed/pending] truncated ${truncated} repos over queue cap (${PENDING_MAX})`);
    }
  }

  // 5. star 门槛过滤
  const filtered = cards.filter((c) => c.stars >= config.starThreshold);
  console.log(
    `  [feed] ${filtered.length}/${cards.length} repos passed star threshold (>= ${config.starThreshold})`,
  );

  // 6. 个性化：加载画像 → 初始化标签权重 → 应用反馈 → 排序 → 保存画像
  const fallbackProfile: UserProfile = {
    interests: {
      ai: config.interests.ai,
      fun: config.interests.fun,
      practical: config.interests.practical,
    },
    tagWeights: initTagWeights(config.interests.aiInterestsText),
    aiInterestsText: config.interests.aiInterestsText,
    followedBigs: config.bigbros,
    bookmarks: [],
    lastActiveTs: new Date().toISOString(),
  };
  let profile = loadProfile(fallbackProfile);
  const feedback = loadFeedback();
  profile = applyFeedbackToProfile(profile, feedback, filtered);
  saveProfile(profile);
  const twCount = Object.keys(profile.tagWeights).length;
  console.log(
    `  [feed] profile updated: ${twCount} tag weights, ai=${profile.interests.ai.toFixed(2)} fun=${profile.interests.fun.toFixed(2)} practical=${profile.interests.practical.toFixed(2)}`,
  );

  const ranked = rankCards(filtered, profile);

  // 6.5 多样性交错：AI:非AI = 2:3 轮播（只改输出顺序，不改 score 值）
  const diversified = diversifyCards(ranked);

  // 6.6 排列层（stage2.fix_adjacent 移植）：相邻展示卡开头前缀互异（撞了就近换位；只改顺序零成本）
  const fixed = fixAdjacent(
    diversified.map((c) => ({ card: c, repo: c.repo, detail_cn: c.detailCn, language: c.language })),
  );
  const diversifiedFinal = fixed.map((x) => x.card);

  // 7. 内容淘汰：只增不减（不做年龄硬淘汰——历史项目永久保留）；
  //    容量上限 MAX_FEED_SIZE：超出后淘汰最老 + 未收藏（profile.bookmarks 豁免，互动过的靠前端快照兜底）
  const pruned = diversifiedFinal.filter((c) => {
    if (c.score < 0.01) return false;
    return true;
  });
  if (pruned.length < ranked.length) {
    console.log(`  [feed] pruned ${ranked.length - pruned.length} cards (score < 0.01)`);
  }
  let final = pruned;
  if (pruned.length > MAX_FEED_SIZE) {
    const bookmarked = new Set(profile.bookmarks);
    const keepBookmarked = pruned.filter((c) => bookmarked.has(c.repo));
    const rest = pruned
      .filter((c) => !bookmarked.has(c.repo))
      .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    final = [...keepBookmarked, ...rest].slice(0, MAX_FEED_SIZE);
    console.log(
      `  [feed] trimmed to ${MAX_FEED_SIZE} from ${pruned.length} (${keepBookmarked.length} bookmarked kept)`,
    );
  }

  // 8. 写 data/feed.json
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FEED_PATH, JSON.stringify(final, null, 2), "utf-8");
  console.log(`  [feed] saved ${final.length} cards to ${FEED_PATH}`);
  // 完整落盘成功 → 评分增量缓存已完成历史使命，清空（下轮从干净状态开始）
  clearPartialScores();

  // 调度器收尾：额度账本落盘（同日重跑接着记账，不重复吃免费额度）+ 通道健康摘要
  scheduler.persist();
  executor.logHealth();

  // 分档进度盘账（2026-09-14）：索引存在时按档统计覆盖率 + 剩余时间估算（线性外推，如实标注）
  if (tierIndex) {
    const prev = loadTierProgress();
    const progress = tierProgress(tierIndex, final, prev);
    saveTierProgress(progress);
    const perRound = final.length - (prev ? sumTierDone(prev) : 0);
    const roundMinutes = Math.max(1, Math.round((Date.now() - runStartedAt) / 60_000));
    console.log(
      `  [feed/tier] 进度：${Object.entries(progress.tiers)
        .map(([k, v]) => `${k}=${v.done}/${v.total}(${(v.coverage * 100).toFixed(1)}%)`)
        .join(" ")}${progress.activeTier ? ` 当前档=${progress.activeTier}` : " 全部完成"}`,
    );
    if (perRound > 0) {
      const est = estimateRemaining(progress, perRound, roundMinutes);
      console.log(`  [feed/tier] 估算：${est.text}`);
    }
  }

  return final;
}

/** 上一轮各档 done 之和（用于算「本轮新增了几张卡」） */
function sumTierDone(p: { tiers: Record<string, { done: number }> }): number {
  return Object.values(p.tiers).reduce((s, v) => s + (v.done ?? 0), 0);
}

// ---------------------------------------------------------------------------
// 独立运行入口：tsx src/feed/index.ts
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  if (!process.env["GITHUB_TOKEN"]) throw new Error("GITHUB_TOKEN required");
  const { loadConfig } = await import("../config.ts");
  const { fetchTrendingData } = await import("../trending.ts");
  const config = loadConfig();
  const trendingData = await fetchTrendingData(config.trendingTopics);
  await generateFeed(config, trendingData);
  console.log("Done!");
}

// 仅当直接运行时执行（被 import 时不执行）
const isDirectRun =
  process.argv[1]?.replace(/\\/g, "/").includes("feed/index.ts") ||
  process.argv[1]?.endsWith("feed/index.ts");
if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
