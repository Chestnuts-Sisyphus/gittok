/**
 * 全库文案重跑（E8 + E5 合并）——**断点续跑批处理**（免费通道，宁缺毋滥）。
 *
 * 目标：把存量卡按 v6 生产定版标准重跑文案（summary_cn / reason_cn / detail_cn）
 * 与千人千面段（facts：claim+source 两阶段），**过闸才写回**；不过闸的重试后仍不过就不写（不合格不上站）。
 *
 * 与既有脚本的分工（各司其职，不重复造轮子）：
 *   - `gittok-rejudge-v3.ts`：判据重判（zone/funScore）——本脚本**不动判据字段**
 *   - `gittok-gapfill-detail.ts`：只补 detailCn 空卡——本脚本做全量文案重跑
 *   - 本脚本：文案 + facts；**写回范围严格限定 summaryCn / reasonCn / detailCn / facts**
 *     （zone / funScore / tags / aiDims 一律保持现状——判据层变更要等栗子裁，见 V-B1 决策包）
 *
 * 单一事实源：prompt 用 `src/feed/prompts.ts` 的 buildFeedScoringPrompt / buildRetryPrompt，
 * 闸用 `src/feed/checks.ts` 的 cardChecks（含 G1-G9 + 调度器合法性闸 + G-source 溯源）。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-recopy.ts --dry-run            # 只统计：多少张不过闸、待跑量
 *   npx tsx scripts/gittok-recopy.ts --limit=20           # 首批：跑 20 张不过闸的卡（可反复跑续跑）
 *   npx tsx scripts/gittok-recopy.ts --all --limit=50     # 全库口径（含已过闸）重跑
 *   npx tsx scripts/gittok-recopy.ts --repo=owner/name    # 只跑指定 repo（调试）
 *   npx tsx scripts/gittok-recopy.ts --max-minutes=30     # 墙钟上限（到点安全停，state 已落盘）
 *   npx tsx scripts/gittok-recopy.ts --only-summary       # 只跑「摘要契约违约卡」（五轮 T2 收窄队列，见下）
 *   npx tsx scripts/gittok-recopy.ts --only-reason-end    # 只跑「理由断句违约卡」（九轮 T4 收窄队列，见下）
 *
 * `--only-summary`（2026-09-24 五轮 T2）：把队列收窄到 `SUMMARY_MIN`–`SUMMARY_MAX` 之外的卡。
 * 为什么需要它：E-8 的既有队列是「**所有**不过闸的卡」（今天 1940 张），而五轮 P0-2 要闭环的
 * 只有「摘要字数」这一条——不新增选项就只能排队等 E-8 跑完，或凭空扩大写入面。
 * 它**不放松任何判据**：仍然逐卡过 `cardChecks` 全闸、仍然只写回四类文案字段；
 * 只是把「先跑谁」从文件顺序改成「摘要违约优先」。
 *
 * `--only-reason-end`（2026-09-25 九轮 T4）：把队列收窄到「`reasonCn` 结尾不是句末标点」的卡
 * （实测 577/2958）。为什么单列一支：断句违约**长度合规**（139 字的半句话完全在 100–150 里），
 * 长度闸抓不到；九轮把提示词与 `cardChecks` G1-b 都改成「必须以句末标点收尾」之后，
 * 这批卡自然落进「不过闸」队列，但 E-8 的队列里还有 1600+ 张别的欠账——不单列就轮不到它们。
 * 同 `--only-summary`：不放松判据，只决定先跑谁；生成端已硬拦，库侧不变量先 warn（见 taxonomy）。
 *
 * 环境变量：RECOPY_FEED / RECOPY_STATE / RECOPY_LIMIT / RECOPY_TIMEOUT_MS / RECOPY_MAX_RETRY / RECOPY_MAX_MINUTES
 *
 * 断点续跑：state 落 `data/recopy-state.json`；state 里记指纹（prompt/闸版本）——
 * 改了 prompt 或闸，指纹变，旧凭证自动失效（防「用旧标准的成果冒充新标准」）。
 */

import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

import { buildPlan, dropRetiredLanes } from "./gittok-fullbuild-lib.ts";
import { ScheduledLlmExecutor } from "../src/feed/executor.ts";
import {
  loadLaneHealth,
  recordLaneResult,
  saveLaneHealth,
} from "../src/feed/lane-health.ts";
import {
  buildFeedScoringPrompt,
  buildRetryPrompt,
  parseScoringResult,
  BATCH_MAX_TOKENS,
} from "../src/feed/prompts.ts";
import { cardChecks, effLen } from "../src/feed/checks.ts";
import { summaryWithinContract } from "../src/feed/index.ts";
import { endsWithSentenceEnd } from "../src/feed/taxonomy.ts";
import { cleanV4 } from "../src/feed/stage1.ts";
import { loadConfig } from "../src/config.ts";
import type { Fact, RepoForScoring, ScoringResult } from "../src/feed/types.ts";

// ---------------------------------------------------------------------------
// 常量与 state
// ---------------------------------------------------------------------------

const FEED = process.env["RECOPY_FEED"] ?? path.join("data", "feed.json");
const STATE_FILE = process.env["RECOPY_STATE"] ?? path.join("data", "recopy-state.json");
/** 指纹：prompt 与闸的版本变了 → 旧完成凭证作废（与 rejudge 的 JUDGE_VERSION 同思路）。 */
const VERSION = "recopy:v6-copy+facts:1";
const MAX_RETRY = Number(process.env["RECOPY_MAX_RETRY"] ?? 2);
const TIMEOUT_MS = Number(process.env["RECOPY_TIMEOUT_MS"] ?? 240_000);

interface StateEntry {
  at: string;
  lane?: string;
  fails?: string[];
  noReadme?: boolean;
  /**
   * 第几次尝试（含本次）。旧 state 无此字段 → 读时按 1 次算。
   * 追加而非改指纹：`at` 每次覆盖，没有 tries 就分不出「失败 2 次」与「失败 20 次」，
   * 「恒不过闸」因此不可判定。纯追加字段不动 VERSION，既有 done 凭证不作废。
   */
  tries?: number;
}
interface RecopyState {
  version: string;
  createdAt: string;
  updatedAt: string;
  /** 通过闸并写回的卡 */
  done: Record<string, StateEntry>;
  /** 跑过但未通过闸（下轮可重试，指数退避语义由调度器与人工决定） */
  failed: Record<string, StateEntry>;
}

function loadState(): RecopyState {
  const now = new Date().toISOString();
  if (fs.existsSync(STATE_FILE)) {
    try {
      const s = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as RecopyState;
      if (s.version === VERSION) return s;
      console.log(`[recopy] state 指纹不符（${s.version} ≠ ${VERSION}）→ 作废重开`);
    } catch {
      console.warn("[recopy] state 解析失败 → 重开");
    }
  }
  return { version: VERSION, createdAt: now, updatedAt: now, done: {}, failed: {} };
}

function atomicWrite(file: string, text: string): void {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, file);
}

function saveState(s: RecopyState): void {
  s.updatedAt = new Date().toISOString();
  atomicWrite(STATE_FILE, JSON.stringify(s, null, 2));
}

// ---------------------------------------------------------------------------
// 卡片与选卡
// ---------------------------------------------------------------------------

interface Card {
  repo: string;
  desc?: string;
  language?: string;
  topics?: string[];
  stars?: number;
  createdAt?: string;
  pushedAt?: string;
  summaryCn?: string;
  reasonCn?: string;
  detailCn?: string;
  zone?: string;
  funScore?: number;
  /** 卡上的 `tags` 是 Tag 对象数组（{name,source,weight}）；LLM 域词在 **domainTags**（字符串数组）——
   *  gateOf 必须传 domainTags，否则 validateScoringResult 会把对象当字符串 .trim() 直接抛错。 */
  tags?: { name: string }[];
  domainTags?: string[];
  facts?: Fact[];
  [k: string]: unknown;
}

/** 用生产闸判「这张卡现有文案是否已达标」（facts 缺失也算不达标 = 需要 E5 段）。
 *  ⚠ 九轮 T4 加一条**脚本侧**判据：断句收尾（必须以使句末标点结尾）。
 *  为什么加在这里而不是生产闸 `cardChecks`：生产闸被 `src/feed/copy-ok.ts` 复用去打建站期
 *  `copyOk` 标 ⇒ 一硬就会把「只因断句不合格」的 296 张一次性剔出推荐池（实测见
 *  `scripts/gittok-reason-end-impact.ts`）。两步走的第一步＝**写回闸先硬**（防新的写进来）、
 *  库侧 `card-invariants` 记 warn（存量可见）、生产闸等存量清完再升。 */
function gateOf(card: Card): string[] {
  const pseudo: ScoringResult = {
    repo: card.repo,
    aiDims: [],
    aiDim: "",
    aiScore: 0.5,
    zone: card.zone,
    funScore: card.funScore,
    tags: card.domainTags,
    facts: card.facts,
    summaryCn: card.summaryCn,
    reasonCn: card.reasonCn,
    detailCn: card.detailCn,
  };
  const fails = cardChecks(pseudo).fails;
  if (!endsWithSentenceEnd(card.reasonCn ?? "")) {
    fails.push(`简要介绍结尾不是句末标点（须以 。！？… 收尾；当前结尾「…${String(card.reasonCn ?? "").trim().slice(-8)}」）`);
  }
  return fails;
}

/** 短卡口径（任务书点名的 21 张那条线）：reasonCn 等效长度 <80。 */
export function isShortCard(card: Card): boolean {
  return effLen(card.reasonCn ?? "") < 80;
}

function pickTodo(
  cards: Card[],
  opts: { all: boolean; repo: string | null; onlySummary: boolean; onlyReasonEnd: boolean; state: RecopyState },
): { todo: Card[]; gateFail: number; summaryFail: number; reasonEndFail: number; shortCount: number } {
  const shortCount = cards.filter(isShortCard).length;
  let gateFail = 0;
  let summaryFail = 0;
  let reasonEndFail = 0;
  const todo: Card[] = [];
  for (const c of cards) {
    if (opts.repo && c.repo !== opts.repo) continue;
    if (opts.state.done[c.repo]) continue; // 已过闸并写回 → 跳过（续跑核心）
    const summaryBad = !summaryWithinContract(c.summaryCn ?? "");
    if (summaryBad) summaryFail++;
    const reasonEndBad = !endsWithSentenceEnd(c.reasonCn ?? "");
    if (reasonEndBad) reasonEndFail++;
    const fails = gateOf(c);
    if (fails.length > 0) gateFail++;
    if (opts.onlySummary) {
      if (summaryBad) todo.push(c);
    } else if (opts.onlyReasonEnd) {
      if (reasonEndBad) todo.push(c);
    } else if (opts.all || fails.length > 0) {
      todo.push(c);
    }
  }
  return { todo, gateFail, summaryFail, reasonEndFail, shortCount };
}

// ---------------------------------------------------------------------------
// README 拉取（facts 的 G-source 闸需要参考文档；拉不到就降级一行式，不阻断）
// ---------------------------------------------------------------------------

/** 出网目标白名单校验（安全约束：只允许 https + api.github.com）。 */
function assertGithubApiUrl(u: string): void {
  const parsed = new URL(u);
  if (parsed.protocol !== "https:") throw new Error(`拒绝非 https 目标：${u}`);
  if (parsed.hostname !== "api.github.com") throw new Error(`拒绝非白名单 host：${parsed.hostname}`);
}

function assertRepoName(repo: string): void {
  if (!/^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/.test(repo)) throw new Error(`repo 名不合法：${repo}`);
  // 正则挡不住相对路径段：字符类含 `.`，所以 "a/.." 与 "../x" 都能通过。
  const [owner, ...rest] = repo.split("/");
  if (rest.length !== 1) throw new Error(`repo 名不合法（段数≠2）：${repo}`);
  for (const seg of [owner, rest[0]]) {
    if (seg === "." || seg === "..") throw new Error(`repo 名含相对路径段：${repo}`);
  }
}

async function fetchReadme(repo: string): Promise<string | undefined> {
  assertRepoName(repo);
  const url = `https://api.github.com/repos/${repo}/readme`;
  assertGithubApiUrl(url);
  const token = process.env["GITHUB_TOKEN"] ?? process.env["GH_TOKEN"];
  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/vnd.github.raw+json",
        "user-agent": "gittok-recopy",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return undefined;
    const text = await res.text();
    return text.trim() ? text : undefined;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// lane / executor（与 gittok-gapfill-detail.ts 同款：只取免费通道）
// ---------------------------------------------------------------------------

function pickLanes(): { executor: ScheduledLlmExecutor; keys: string[] } {
  const { tail, env } = dropRetiredLanes(buildPlan());
  const merged: NodeJS.ProcessEnv = { ...process.env, ...env };
  for (const [k, v] of Object.entries(merged)) if (v !== undefined) process.env[k] = v;
  const specs = tail.map((t) => {
    const first = t.entry.indexOf(":");
    const last = t.entry.lastIndexOf(":");
    const tailPart = t.entry.slice(last + 1);
    const provider = t.entry.slice(0, first);
    const model = t.entry.slice(first + 1, /^\d+$/.test(tailPart) ? last : undefined);
    return { provider, model, keys: t.keys, extraParams: t.params, key: `${provider}:${model}` };
  });
  // ⛔ 不挂订阅/付费通道（栗子 2026-09-15 硬规：GitTok 只用免费模型）
  return { executor: new ScheduledLlmExecutor(specs), keys: specs.map((s) => s.key) };
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

/** 冷却等待的步长与上限（免费档高峰常整点限流；等到墙钟用尽为止，不因熔断直接判死）。 */
const COOLDOWN_WAIT_MS = 20_000;

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} 超时 ${ms}ms`)), ms);
    p.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e: unknown) => {
        clearTimeout(timer);
        reject(e instanceof Error ? e : new Error(String(e)));
      },
    );
  });
}

// ---------------------------------------------------------------------------
// 单卡：生成 → 闸 → 不过则带反馈重试 → 过则写回（只写文案 + facts）
// ---------------------------------------------------------------------------

interface RecopyOutcome {
  ok: boolean;
  sc?: ScoringResult;
  fails: string[];
  lane: string;
  noReadme: boolean;
}

async function recopyOne(
  card: Card,
  executor: ScheduledLlmExecutor,
  laneKeys: string[],
  interestsText: string,
  ledger: ReturnType<typeof loadLaneHealth>,
  deadlineMs: number,
): Promise<RecopyOutcome> {
  const readme = await fetchReadme(card.repo);
  const doc = readme ? cleanV4(readme) : undefined;
  const repo: RepoForScoring = {
    repo: card.repo,
    description: card.desc ?? "",
    stars: card.stars ?? 0,
    language: card.language ?? "",
    topics: card.topics ?? [],
    createdAt: card.createdAt,
    pushedAt: card.pushedAt,
    ...(readme ? { readme } : {}),
  };
  let fails: string[] = [];
  let attemptsLeft = MAX_RETRY + 1;
  let lastLane = laneKeys[0] ?? "（无通道）";
  while (attemptsLeft > 0) {
    if (Date.now() > deadlineMs) {
      return { ok: false, fails: ["到墙钟上限（未及完成本卡）"], lane: lastLane, noReadme: !readme };
    }
    let calledThisRound = false;
    for (const laneKey of laneKeys) {
      const caller = executor.callerFor(laneKey);
      if (!caller) continue; // 该通道冷却/熔断 → 换下一条
      lastLane = laneKey;
      calledThisRound = true;
      const basePrompt = buildFeedScoringPrompt([repo], interestsText);
      const prompt = attemptsLeft === MAX_RETRY + 1 ? basePrompt : buildRetryPrompt(basePrompt, fails);
      let raw = "";
      try {
        raw = await withTimeout(caller(prompt, BATCH_MAX_TOKENS), TIMEOUT_MS, `recopy ${card.repo}`);
        recordLaneResult(ledger, laneKey, { calls: 1, ok: 1 });
        saveLaneHealth(ledger);
      } catch (err) {
        const why = String(err).slice(0, 160);
        recordLaneResult(ledger, laneKey, { calls: 1, ok: 0, lastError: why });
        saveLaneHealth(ledger);
        fails = [`通道失败：${why}`];
        continue; // 换下一条通道
      }
      const parsedResults = parseScoringResult(raw);
      const parsed = parsedResults.find((s) => s.repo === card.repo) ?? parsedResults[0];
      if (!parsed) {
        fails = ["输出解析失败（无合法 JSON）"];
        break; // 换一轮（带反馈重试）
      }
      const gate = cardChecks(parsed, doc);
      if (gate.ok) return { ok: true, sc: parsed, fails: [], lane: laneKey, noReadme: !readme };
      fails = gate.fails;
      break; // 闸不过 → 带反馈进下一轮
    }
    if (!calledThisRound) {
      // 所有免费通道都在冷却期：等到有通道可用为止（硬边界是墙钟，不是熔断）
      const left = Math.round((deadlineMs - Date.now()) / 1000);
      console.log(`  … ${card.repo}：免费通道全部冷却中，等 ${COOLDOWN_WAIT_MS / 1000}s（剩余预算 ${left}s）`);
      if (Date.now() + COOLDOWN_WAIT_MS > deadlineMs) {
        return { ok: false, fails: ["免费通道全部冷却且墙钟预算不足"], lane: lastLane, noReadme: !readme };
      }
      await sleep(COOLDOWN_WAIT_MS);
      continue; // 等待不消耗重试次数
    }
    attemptsLeft--;
  }
  return { ok: false, fails, lane: lastLane, noReadme: !readme };
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): {
  all: boolean;
  dryRun: boolean;
  limit: number;
  repo: string | null;
  maxMinutes: number;
  onlySummary: boolean;
  onlyReasonEnd: boolean;
} {
  const get = (name: string): string | null => {
    const hit = argv.find((a) => a.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : null;
  };
  return {
    all: argv.includes("--all"),
    dryRun: argv.includes("--dry-run"),
    limit: Number(get("limit") ?? process.env["RECOPY_LIMIT"] ?? 20),
    repo: get("repo"),
    maxMinutes: Number(get("max-minutes") ?? process.env["RECOPY_MAX_MINUTES"] ?? 60),
    onlySummary: argv.includes("--only-summary"),
    onlyReasonEnd: argv.includes("--only-reason-end"),
  };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const state = loadState();
  const { todo, gateFail, summaryFail, reasonEndFail, shortCount } = pickTodo(cards, {
    all: args.all,
    repo: args.repo,
    onlySummary: args.onlySummary,
    onlyReasonEnd: args.onlyReasonEnd,
    state,
  });

  console.log(
    `[recopy] 全库 ${cards.length} 张｜不过闸 ${gateFail} 张｜摘要违约 ${summaryFail} 张｜断句违约 ${reasonEndFail} 张｜短卡(reasonCn<80) ${shortCount} 张｜` +
      `已写回 ${Object.keys(state.done).length} 张｜本次待跑 ${Math.min(todo.length, args.limit)}/${todo.length} 张` +
      `${args.onlySummary ? "（--only-summary 口径）" : args.onlyReasonEnd ? "（--only-reason-end 口径，九轮 T4）" : ""}`,
  );
  console.log(`[recopy] state：${STATE_FILE}（指纹 ${state.version}）`);
  if (args.dryRun) {
    for (const c of todo.slice(0, 10)) {
      console.log(`  - ${c.repo}：${gateOf(c).slice(0, 2).join("；")}`);
    }
    return;
  }
  if (todo.length === 0) {
    console.log("[recopy] 待跑为 0 —— 全库文案已过闸（或 --repo 指定项已写回）");
    return;
  }

  const { executor, keys } = pickLanes();
  if (keys.length === 0) {
    console.warn("[recopy] 无可用 lane（免费编队为空）→ 停止，state 未变");
    process.exitCode = 2;
    return;
  }
  console.log(`[recopy] 在岗免费通道：${keys.join(" / ")}`);
  const ledger = loadLaneHealth();
  const interestsText = loadConfig().interests.aiInterestsText;

  const deadline = Date.now() + args.maxMinutes * 60_000;
  let ok = 0;
  let fail = 0;
  for (const card of todo.slice(0, args.limit)) {
    if (Date.now() > deadline) {
      console.log(`[recopy] 到墙钟上限（${args.maxMinutes} 分钟）→ 安全停（state 已落盘，可续跑）`);
      break;
    }
    const out = await recopyOne(card, executor, keys, interestsText, ledger, deadline);
    if (out.ok && out.sc) {
      // 写回范围纪律：只写文案 + facts（判据层字段一律不动）
      card.summaryCn = out.sc.summaryCn;
      card.reasonCn = out.sc.reasonCn;
      card.detailCn = out.sc.detailCn;
      if (out.sc.facts) card.facts = out.sc.facts;
      atomicWrite(FEED, JSON.stringify(cards, null, 2));
      state.done[card.repo] = {
        at: new Date().toISOString(),
        lane: out.lane,
        tries: (state.failed[card.repo]?.tries ?? 0) + 1,
        ...(out.noReadme ? { noReadme: true } : {}),
      };
      delete state.failed[card.repo];
      saveState(state);
      ok++;
      console.log(
        `  ✓ ${card.repo}（summary ${out.sc.summaryCn.length} / reason ${effLen(out.sc.reasonCn).toFixed(0)} / detail ${out.sc.detailCn.length}${out.noReadme ? " / 无README" : ""}）`,
      );
    } else {
      state.failed[card.repo] = {
        at: new Date().toISOString(),
        lane: out.lane,
        fails: out.fails.slice(0, 4),
        tries: (state.failed[card.repo]?.tries ?? 0) + 1,
        ...(out.noReadme ? { noReadme: true } : {}),
      };
      saveState(state);
      fail++;
      console.log(`  ✗ ${card.repo}：${out.fails.slice(0, 2).join("；")}`);
    }
  }
  console.log(
    `[recopy] 本轮完成：写回 ${ok} 张 / 未过闸 ${fail} 张｜累计已写回 ${Object.keys(state.done).length} 张｜state：${STATE_FILE}`,
  );

  // 恒不过闸候选：仅「内容类」原因才算数（通道类是额度/墙，不是卡的问题）。
  // 纪律：连续 ≥3 轮 + 内容类 + 队列已收敛，三条同时满足才叫恒不过闸。
  const stubborn = Object.entries(state.failed)
    .filter(([, v]) => (v.tries ?? 1) >= 3)
    .sort((a, b) => (b[1].tries ?? 1) - (a[1].tries ?? 1));
  if (stubborn.length > 0) {
    const CHANNELY = /通道|墙|超时|额度|429|40[124]|未拿到成品回包/;
    console.log(`\n[recopy] 恒不过闸候选（tries≥3）${stubborn.length} 张：`);
    for (const [repo, v] of stubborn.slice(0, 12)) {
      const why = (v.fails ?? [])[0] ?? "（无原因记录）";
      const kind = CHANNELY.test(why) ? "通道类·不计数" : "内容类·待人工判";
      console.log(`  ${String(v.tries ?? 1).padStart(2)} 次 [${kind}] ${repo}：${why}`);
    }
  }
}

main().catch((err) => {
  console.error("[recopy] 致命错误:", err);
  throw err;
});
