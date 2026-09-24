/**
 * 摘要契约批量修复（五轮 T2①）——**只重写 `summaryCn`**，逐条过生产闸校验。
 *
 * 为什么不是直接跑 `gittok-recopy.ts`（既有全文案重跑通道）：
 *   本轮要闭环的**只有「摘要字数」这一条契约**，而 recopy 是「summary+reason+detail+facts 全重写」，
 *   它的成功条件是**整卡过闸**（含 detail 500-900 字、3-5 段、facts 溯源）。实测（2026-09-24 22:48Z，
 *   本机三条免费通道 zhipu/glm-4.7-flash + modelscope/deepseek-v4-flash + openrouter/nemotron）：
 *   **连续 8 张全部不过闸**，失败项清一色是 detail 354/362/433/464/247 字、只有 1 段
 *   —— 免费档写不出 500-900 字的合格长文，这条通道今天跑不动（它该由 E-8 的夜间长跑在通道好时推进）。
 *   而本轮的 422 张里 **329 张只差摘要**（其余 93 张另有闸项，属 E-8 既有队列），
 *   所以走「小输出、可批量、逐条校验」的窄通道：一次请求 8 张、每张只要一句 20-35 字的话。
 *
 * 纪律（与 `gittok-recopy.ts` 同款）：
 *   - 判据**不新写**：校验直接调 `src/feed/checks.ts` 的 `cardChecks`（生产闸）＋ `taxonomy.ts` 的契约常量。
 *   - **只写 summaryCn**：reasonCn/detailCn/facts/判据字段一律不动（写回范围最小化）。
 *   - 校验规则 = ①新摘要自己落在 20-35 字（String.length）；②闸的失败**类别集合只许缩小**（不许引入新类别）；
 *     ③原本「摘要与解读开头重复」的，新摘要必须把它消掉（换角度写，不复用解读开场措辞）。
 *     任一不满足 → 该卡进本轮失败名单，随下一批带反馈重试（最多 MAX_ROUNDS 轮）；始终不合格就不写回。
 *   - 断点续跑：state 落 `data/summary-fix-state.json`。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-summary-fix.ts --dry-run                # 只列队列，不打模型
 *   npx tsx scripts/gittok-summary-fix.ts --limit=64 --batch=8     # 跑 64 张（8 张一批）
 *   npx tsx scripts/gittok-summary-fix.ts --max-minutes=30         # 墙钟上限（到点安全停，state 已落盘）
 *   npx tsx scripts/gittok-summary-fix.ts --apply-cut              # 兜底：对残余违约卡做**确定性切**（见下）
 *   npx tsx scripts/gittok-summary-fix.ts --reapply-state          # 语义合并：把 state 里的成果重新盖到当前 feed.json 上
 *
 * `--reapply-state`（多自动写入者专用，2026-09-24 五轮加）：本站的 `data/feed.json` 会被
 * GH Actions 的 drip **整份重写**（一行对不上就是十万行 diff），所以本地清洗成果不能靠 git 合并——
 * 只能**按 repo 键**重新盖回去。本模式读 `state.done` 里记的（已过闸的）新一句话，
 * 逐条对**当前**卡再校验一次（长度 + 不引入新的闸失败类别），合格才写回；不合格记入失败名单并如实打印。
 *
 * `--apply-cut`（最后手段，不打模型）：模型反复改不好的残余卡，用**生成端同一个** `fitSummary()`
 * 把现有一句话切到契约内（切点优先句末 → 分句 → 硬切）。它是「复用已有内容、只切不造」，不是重写：
 *   · 校验放宽一档——只要求 ①落进 20-35 字、②**不引入新的闸失败类别**；
 *     「与深度解读开头重复」允许保留：确定性切法**不可能**消除它（切出来的必然是原文子串，
 *     只有换措辞才能消除），而那属 E-8 全文案重跑的范围，不是摘要字数契约。
 *   · 刻意**不**做 strip 前缀之类的"清洗"：那会改动文案内容，不该由兜底脚本代劳。
 *
 * 环境变量：SUMMARY_FIX_FEED / SUMMARY_FIX_STATE / SUMMARY_FIX_LIMIT / SUMMARY_FIX_BATCH /
 *          SUMMARY_FIX_MAX_MINUTES / SUMMARY_FIX_TIMEOUT_MS
 */

import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

import { buildPlan, dropRetiredLanes } from "./gittok-fullbuild-lib.ts";
import { ScheduledLlmExecutor } from "../src/feed/executor.ts";
import { loadLaneHealth, recordLaneResult, saveLaneHealth } from "../src/feed/lane-health.ts";
import { cardChecks } from "../src/feed/checks.ts";
import { SUMMARY_MIN, SUMMARY_MAX } from "../src/feed/taxonomy.ts";
import { summaryWithinContract, fitSummary } from "../src/feed/index.ts";
import type { ScoringResult } from "../src/feed/types.ts";

// ---------------------------------------------------------------------------
// 常量 / 路径
// ---------------------------------------------------------------------------

const ROOT = process.cwd();

/**
 * 路径边界：只允许项目目录内的文件。
 * 环境变量能覆盖文件名是给本地多环境用的，但它同时是一条**可控字符串进文件读写**的链路，
 * 所以统一走这里规范化 + 边界断言（`../` 一律越界报错，不静默）。
 */
function safeJoin(...parts: string[]): string {
  const target = path.resolve(ROOT, ...parts);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
    throw new Error(`拒绝项目目录之外的路径：${target}`);
  }
  return target;
}

const FEED = safeJoin("data", process.env["SUMMARY_FIX_FEED"] ?? "feed.json");
const STATE_FILE = safeJoin("data", process.env["SUMMARY_FIX_STATE"] ?? "summary-fix-state.json");
const BATCH = Number(process.env["SUMMARY_FIX_BATCH"] ?? 8);
const MAX_ROUNDS = 3;
const TIMEOUT_MS = Number(process.env["SUMMARY_FIX_TIMEOUT_MS"] ?? 120_000);
const COOLDOWN_WAIT_MS = 20_000;

interface Card {
  repo: string;
  desc?: string;
  summaryCn?: string;
  reasonCn?: string;
  detailCn?: string;
  domainTags?: string[];
  topics?: string[];
  zone?: string;
  funScore?: number;
  facts?: unknown;
  [k: string]: unknown;
}

interface FixState {
  version: string;
  updatedAt: string;
  done: Record<string, { at: string; lane: string; from: number; to: number; summary: string }>;
  failed: Record<string, { at: string; tries: number; why: string[] }>;
}

const VERSION = "summary-fix:T2:1";

function loadState(): FixState {
  try {
    const s = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as FixState;
    if (s.version === VERSION) return s;
    console.warn(`[summary-fix] state 指纹不符（${s.version} ≠ ${VERSION}）→ 视为空（不沿用旧标准成果）`);
  } catch {
    /* 首次运行 */
  }
  return { version: VERSION, updatedAt: new Date().toISOString(), done: {}, failed: {} };
}

function saveState(s: FixState): void {
  s.updatedAt = new Date().toISOString();
  atomicWrite(STATE_FILE, JSON.stringify(s, null, 2));
}

/** 先写临时文件再 rename：进程被杀也不会留下半截 JSON（feed.json 是站点数据源，不许写坏）。 */
function atomicWrite(file: string, text: string): void {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, file);
}

// ---------------------------------------------------------------------------
// 闸口径（复用生产闸；这里只做「失败项的类别化」，不新增判据）
// ---------------------------------------------------------------------------

const pseudo = (c: Card, summaryCn: string): ScoringResult =>
  ({
    repo: c.repo,
    aiDims: [],
    aiDim: "",
    aiScore: 0.5,
    zone: c.zone,
    funScore: c.funScore,
    tags: c.domainTags,
    facts: c.facts,
    summaryCn,
    reasonCn: c.reasonCn,
    detailCn: c.detailCn,
  }) as unknown as ScoringResult;

const failsOf = (c: Card, summaryCn: string): string[] => cardChecks(pseudo(c, summaryCn)).fails;

/** 失败项 → 类别（字数类会随字数变化，故按类别比集合；⚠ 顺序要紧：G3 的文案也以「一句话描述」开头）。 */
function kind(f: string): string {
  if (f.includes("重复")) return "摘要与解读重复";
  if (f.startsWith("一句话描述")) return "摘要字数";
  if (f.startsWith("简要介绍")) return "简介字数";
  if (f.startsWith("深度解读") && f.includes("字（")) return "解读字数";
  if (f.startsWith("深度解读") && f.includes("段")) return "解读段数";
  if (f.includes("套路话")) return "开场套话";
  if (f.includes("时效断言")) return "时效词";
  if (f.includes("推广")) return "推广词";
  if (f.includes("安装/上手")) return "缺上手段";
  if (f.includes("代码块")) return "解读含代码";
  if (f.includes("序号")) return "解读序号模板";
  if (f.includes("facts") || f.includes("source")) return "facts 溯源";
  return "其它";
}

const kindsOf = (fails: string[]): Set<string> => new Set(fails.map(kind));

/** 新摘要是否被接受：长度合规 + 失败类别只许缩小 + 重复项必须消掉。 */
function accept(c: Card, prevFails: string[], next: string): { ok: boolean; why: string[] } {
  const why: string[] = [];
  if (!summaryWithinContract(next)) why.push(`${next.length} 字不在 ${SUMMARY_MIN}-${SUMMARY_MAX}`);
  const before = kindsOf(prevFails);
  const after = kindsOf(failsOf(c, next));
  for (const k of after) if (!before.has(k)) why.push(`引入了新的闸失败「${k}」`);
  if (after.has("摘要字数")) why.push("字数仍不合规");
  if (after.has("摘要与解读重复")) why.push("与深度解读开头重复未消除（必须换个角度写）");
  return { ok: why.length === 0, why };
}

// ---------------------------------------------------------------------------
// 通道（与 recopy 同一套：只用免费档，带 ledger 记账）
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
// 提示词：小输出、可批量、给足每张卡的自身素材
// ---------------------------------------------------------------------------

function buildBatchPrompt(items: { card: Card; prevFails: string[] }[]): string {
  const blocks = items
    .map(({ card, prevFails }, i) => {
      const detail = (card.detailCn ?? "").replace(/\s+/g, " ").slice(0, 140);
      const reason = (card.reasonCn ?? "").replace(/\s+/g, " ").slice(0, 200);
      return [
        `#${i + 1} repo: ${card.repo}`,
        `仓库简介: ${(card.desc ?? "").slice(0, 200) || "（无）"}`,
        `领域标签: ${(card.domainTags ?? []).join("、") || "（无）"}`,
        `简要介绍（已有，可参考）: ${reason || "（无）"}`,
        `深度解读开头（**禁止复用其措辞**）: ${detail || "（无）"}`,
        `现有的一句话（字数不合规，要重写）: ${card.summaryCn ?? ""}`,
        `上一轮不合格原因: ${prevFails.slice(0, 2).join("；") || "（无）"}`,
      ].join("\n");
    })
    .join("\n\n");

  return `你是中文技术编辑。为下面每个开源项目写**一句话摘要**（字段 summary_cn）。

硬性要求（缺一不可）：
1. 字数 ${SUMMARY_MIN}-${SUMMARY_MAX} 个字符（按**字符个数**数：汉字、英文、数字、空格、标点各算一个字符；写完数一遍）。
2. 面向完全不了解这个项目的人，一句话说清：它是什么、能做什么、有什么特别之处。
3. **不得复用「深度解读开头」里的措辞**——必须换一个角度、换一套说法（同一句意思重复两遍是最常见的退回原因）。
4. 只写这一句话，不要罗列功能清单，不要用①②③，不要出现"最近/最新/突破/XX 星"这类时效或热度词，不要用推广口吻。
5. 英文专有名词（如 IDE、API、LLM）原样保留，不要翻译。

项目清单：
${blocks}

只输出 JSON，不要任何解释、不要 markdown 代码块：
{"items":[{"repo":"owner/name","summary_cn":"..."}]}`;
}

/** 从模型输出里抠出 {repo: summary}（容忍 ```json 围栏与前后废话）。 */
function parseSummaries(raw: string): Map<string, string> {
  const out = new Map<string, string>();
  const text = raw.replace(/```json/gi, "```").split("```").join("\n");
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return out;
  let parsed: unknown;
  try {
    parsed = JSON.parse(text.slice(start, end + 1));
  } catch {
    return out;
  }
  const items = (parsed as { items?: unknown }).items;
  if (!Array.isArray(items)) return out;
  for (const it of items) {
    if (!it || typeof it !== "object") continue;
    const o = it as Record<string, unknown>;
    const repo = typeof o["repo"] === "string" ? o["repo"] : "";
    const sum =
      typeof o["summary_cn"] === "string"
        ? o["summary_cn"]
        : typeof o["summary"] === "string"
          ? (o["summary"] as string)
          : "";
    if (repo && sum.trim()) out.set(repo, sum.trim());
  }
  return out;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): {
  dryRun: boolean;
  limit: number;
  batch: number;
  maxMinutes: number;
  applyCut: boolean;
  reapply: boolean;
} {
  const get = (n: string): string | null => {
    const hit = argv.find((a) => a.startsWith(`--${n}=`));
    return hit ? hit.slice(n.length + 3) : null;
  };
  return {
    dryRun: argv.includes("--dry-run"),
    limit: Number(get("limit") ?? process.env["SUMMARY_FIX_LIMIT"] ?? 64),
    batch: Number(get("batch") ?? BATCH),
    maxMinutes: Number(get("max-minutes") ?? process.env["SUMMARY_FIX_MAX_MINUTES"] ?? 30),
    applyCut: argv.includes("--apply-cut"),
    reapply: argv.includes("--reapply-state"),
  };
}

/** 语义合并：把 state 里记的成果重新盖到**当前** feed.json 上（drip 整份重写后用）。 */
function reapplyState(): void {
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const state = loadState();
  const byRepo = new Map(cards.map((c) => [c.repo, c]));
  let applied = 0;
  let skipOk = 0;
  const rejected: string[] = [];
  for (const [repo, rec] of Object.entries(state.done)) {
    const card = byRepo.get(repo);
    if (!card) {
      rejected.push(`${repo}（上游已无此卡）`);
      continue;
    }
    if (card.summaryCn === rec.summary) {
      skipOk++;
      continue;
    }
    const before = card.summaryCn ?? "";
    const kindsBefore = kindsOf(failsOf(card, before));
    const kindsAfter = kindsOf(failsOf(card, rec.summary));
    const ok = summaryWithinContract(rec.summary) && [...kindsAfter].every((k) => kindsBefore.has(k));
    if (!ok) {
      rejected.push(`${repo}（重盖后不合规）`);
      continue;
    }
    card.summaryCn = rec.summary;
    applied++;
  }
  if (applied > 0) atomicWrite(FEED, JSON.stringify(cards, null, 2));
  const bad = cards.filter((c) => !summaryWithinContract(c.summaryCn ?? ""));
  console.log(
    `[summary-fix --reapply-state] 重盖 ${applied} 张｜已是新文案 ${skipOk} 张｜拒绝 ${rejected.length} 张｜` +
      `重盖后仍违约 ${bad.length} 张`,
  );
  for (const r of rejected.slice(0, 10)) console.log(`  ✗ ${r}`);
  if (bad.length > 0) for (const c of bad.slice(0, 10)) console.log(`  ! ${c.repo}（${(c.summaryCn ?? "").length} 字）`);
}

/** 兜底：确定性切（复用生成端同一个 fitSummary），只要求长度达标 + 不引入新的闸失败类别。 */
function applyCut(args: { limit: number }): void {
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const state = loadState();
  const bad = cards.filter((c) => !summaryWithinContract(c.summaryCn ?? ""));
  let ok = 0;
  let rejected = 0;
  for (const card of bad.slice(0, args.limit)) {
    const before = card.summaryCn ?? "";
    const cut = fitSummary(before);
    const accepted = summaryWithinContract(cut) && [...kindsOf(failsOf(card, cut))].every((k) => kindsOf(failsOf(card, before)).has(k));
    if (!accepted) {
      rejected++;
      console.log(`  ✗ ${card.repo}（${before.length} → ${cut.length}）：切不进去或引入新失败，保持原样`);
      continue;
    }
    card.summaryCn = cut;
    state.done[card.repo] = {
      at: new Date().toISOString(),
      lane: "确定性地毯切（无模型）",
      from: before.length,
      to: cut.length,
      summary: cut,
    };
    console.log(`  ✓ ${card.repo}（${before.length} → ${cut.length}）${cut}`);
    ok++;
  }
  if (ok > 0) {
    atomicWrite(FEED, JSON.stringify(cards, null, 2));
    saveState(state);
  }
  console.log(`\n[summary-fix --apply-cut] 写回 ${ok} 张｜拒绝 ${rejected} 张`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.applyCut) {
    applyCut(args);
    return;
  }
  if (args.reapply) {
    reapplyState();
    return;
  }
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const state = loadState();

  const bad = cards.filter((c) => !summaryWithinContract(c.summaryCn ?? ""));
  const todo = bad.filter((c) => !state.done[c.repo]).slice(0, args.limit);
  console.log(
    `[summary-fix] 全库 ${cards.length} 张｜摘要违约 ${bad.length} 张｜已写回 ${Object.keys(state.done).length} 张｜` +
      `本次待跑 ${todo.length} 张（${args.batch} 张/批）`,
  );
  if (args.dryRun) {
    for (const c of todo.slice(0, 8)) console.log(`  - ${c.repo}：${(c.summaryCn ?? "").length} 字`);
    return;
  }
  if (todo.length === 0) {
    console.log("[summary-fix] 没有待修项 —— 摘要契约已全库合规");
    return;
  }

  const { executor, keys } = pickLanes();
  if (keys.length === 0) {
    console.warn("[summary-fix] 无可用免费通道 → 停止（state 未变）");
    process.exitCode = 2;
    return;
  }
  console.log(`[summary-fix] 在岗免费通道：${keys.join(" / ")}`);
  const ledger = loadLaneHealth();
  const deadline = Date.now() + args.maxMinutes * 60_000;

  let okTotal = 0;
  let queue = todo;
  for (let round = 1; round <= MAX_ROUNDS && queue.length > 0; round++) {
    const nextQueue: Card[] = [];
    console.log(`\n[summary-fix] 第 ${round} 轮：${queue.length} 张`);
    for (let i = 0; i < queue.length; i += args.batch) {
      if (Date.now() > deadline) {
        console.log(`[summary-fix] 到墙钟上限（${args.maxMinutes} 分钟）→ 安全停（可续跑）`);
        return;
      }
      const chunk = queue.slice(i, i + args.batch);
      const items = chunk.map((card) => ({ card, prevFails: failsOf(card, card.summaryCn ?? "") }));
      const prompt = buildBatchPrompt(items);

      let raw = "";
      let usedLane = "（无）";
      let called = false;
      let retryChunk = false;
      for (const laneKey of keys) {
        const caller = executor.callerFor(laneKey);
        if (!caller) continue;
        usedLane = laneKey;
        called = true;
        try {
          raw = await withTimeout(caller(prompt, 2048), TIMEOUT_MS, `summary-fix ${chunk.length} 张`);
          recordLaneResult(ledger, laneKey, { calls: 1, ok: 1 });
          saveLaneHealth(ledger);
          break;
        } catch (err) {
          const why = String(err).slice(0, 160);
          recordLaneResult(ledger, laneKey, { calls: 1, ok: 0, lastError: why });
          saveLaneHealth(ledger);
          console.warn(`  ! 通道 ${laneKey} 失败：${why}`);
        }
      }
      if (!called) {
        console.log(`  … 免费通道全在冷却，等 ${COOLDOWN_WAIT_MS / 1000}s`);
        await sleep(COOLDOWN_WAIT_MS);
        retryChunk = true;
      }
      const got = retryChunk ? new Map<string, string>() : parseSummaries(raw);
      const accepted: string[] = [];
      for (const { card, prevFails } of items) {
        const cand = got.get(card.repo);
        if (!cand) {
          nextQueue.push(card);
          continue;
        }
        const v = accept(card, prevFails, cand);
        if (!v.ok) {
          state.failed[card.repo] = {
            at: new Date().toISOString(),
            tries: (state.failed[card.repo]?.tries ?? 0) + 1,
            why: v.why,
          };
          nextQueue.push(card);
          continue;
        }
        const from = (card.summaryCn ?? "").length;
        card.summaryCn = cand;
        state.done[card.repo] = {
          at: new Date().toISOString(),
          lane: usedLane,
          from,
          to: cand.length,
          summary: cand,
        };
        delete state.failed[card.repo];
        accepted.push(card.repo);
        okTotal++;
        console.log(`  ✓ ${card.repo}（${from} → ${cand.length} 字）${cand}`);
      }
      // 每批写回一次（原子写）：进程被杀也只丢一批未落盘的成果
      if (accepted.length > 0) {
        atomicWrite(FEED, JSON.stringify(cards, null, 2));
        saveState(state);
      }
    }
    queue = nextQueue;
  }
  if (queue.length > 0) {
    console.log(`\n[summary-fix] ${MAX_ROUNDS} 轮后仍不合格 ${queue.length} 张（已记入 state.failed，不写回）：`);
    for (const c of queue.slice(0, 12)) console.log(`  ✗ ${c.repo}：${(state.failed[c.repo]?.why ?? []).join("；")}`);
  }
  console.log(
    `\n[summary-fix] 本轮写回 ${okTotal} 张｜累计 ${Object.keys(state.done).length} 张｜state：${STATE_FILE}`,
  );
}

main().catch((err) => {
  console.error("[summary-fix] 致命错误:", err);
  throw err;
});
