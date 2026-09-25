/**
 * 理由契约批量修复（六轮 G1）——**只重写 `reasonCn`**，逐条过生产闸校验。
 *
 * 背景：提示词硬性要求「少于 100 或多于 150 都不合格」，而闸原先只判下限
 * （`effLen(r) < 100`）。全库 >150 字 518 张漏出去；卡宽收到 793 后每行 53 汉字 × 3 行
 * = 容量 159，于是其中一批露出省略号。容量 159 ≥ 上限 150 ⇒ 收进契约后省略号结构性消失。
 *
 * 纪律（与 `gittok-summary-fix.ts` 同款）：
 *   - 判据不新写：校验调 `cardChecks` + `taxonomy` 的 REASON_MIN/MAX（String.length）。
 *   - **只写 reasonCn**：summaryCn/detailCn/facts 一律不动。
 *   - 接受条件 = ①新理由落在 100–150；②闸失败类别集合只许缩小；不合格不写回。
 *   - 断点续跑：state 落 `data/reason-fix-state.json`。
 *
 * 用法：
 *   npx tsx scripts/gittok-reason-fix.ts --dry-run
 *   npx tsx scripts/gittok-reason-fix.ts --limit=64 --batch=4
 *   npx tsx scripts/gittok-reason-fix.ts --max-minutes=90
 *   npx tsx scripts/gittok-reason-fix.ts --apply-cut          # 超长卡确定性切（不打模型）
 *   npx tsx scripts/gittok-reason-fix.ts --reapply-state
 */

import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

import { buildPlan, dropRetiredLanes } from "./gittok-fullbuild-lib.ts";
import { ScheduledLlmExecutor } from "../src/feed/executor.ts";
import { loadLaneHealth, recordLaneResult, saveLaneHealth } from "../src/feed/lane-health.ts";
import { cardChecks } from "../src/feed/checks.ts";
import { REASON_MIN, REASON_MAX } from "../src/feed/taxonomy.ts";
import { reasonWithinContract, fitReason } from "../src/feed/index.ts";
import type { ScoringResult } from "../src/feed/types.ts";

const ROOT = process.cwd();

function safeJoin(...parts: string[]): string {
  const target = path.resolve(ROOT, ...parts);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
    throw new Error(`拒绝项目目录之外的路径：${target}`);
  }
  return target;
}

const FEED = safeJoin("data", process.env["REASON_FIX_FEED"] ?? "feed.json");
const STATE_FILE = safeJoin("data", process.env["REASON_FIX_STATE"] ?? "reason-fix-state.json");
const BATCH = Number(process.env["REASON_FIX_BATCH"] ?? 4);
const MAX_ROUNDS = 3;
const TIMEOUT_MS = Number(process.env["REASON_FIX_TIMEOUT_MS"] ?? 120_000);
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
  done: Record<string, { at: string; lane: string; from: number; to: number; reason: string }>;
  failed: Record<string, { at: string; tries: number; why: string[] }>;
}

const VERSION = "reason-fix:G1:1";

function loadState(): FixState {
  try {
    const s = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as FixState;
    if (s.version === VERSION) return s;
    console.warn(`[reason-fix] state 指纹不符（${s.version} ≠ ${VERSION}）→ 视为空`);
  } catch {
    /* 首次 */
  }
  return { version: VERSION, updatedAt: new Date().toISOString(), done: {}, failed: {} };
}

function saveState(s: FixState): void {
  s.updatedAt = new Date().toISOString();
  atomicWrite(STATE_FILE, JSON.stringify(s, null, 2));
}

function atomicWrite(file: string, text: string): void {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, file);
}

const pseudo = (c: Card, reasonCn: string): ScoringResult =>
  ({
    repo: c.repo,
    aiDims: [],
    aiDim: "",
    aiScore: 0.5,
    zone: c.zone,
    funScore: c.funScore,
    tags: c.domainTags,
    facts: c.facts,
    summaryCn: c.summaryCn,
    reasonCn,
    detailCn: c.detailCn,
  }) as unknown as ScoringResult;

const failsOf = (c: Card, reasonCn: string): string[] => cardChecks(pseudo(c, reasonCn)).fails;

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

/** 本脚本自己的违约判定（先于闸升级：用 String.length 100–150）。 */
function reasonBad(c: Card): boolean {
  return !reasonWithinContract(c.reasonCn ?? "");
}

function accept(c: Card, prevFails: string[], next: string): { ok: boolean; why: string[] } {
  const why: string[] = [];
  if (!reasonWithinContract(next)) why.push(`${next.length} 字不在 ${REASON_MIN}-${REASON_MAX}`);
  const before = kindsOf(prevFails);
  const after = kindsOf(failsOf(c, next));
  for (const k of after) if (!before.has(k)) why.push(`引入了新的闸失败「${k}」`);
  // 闸升级前「简介字数」只检下限：超长卡的 before 不含简介字数，after 也不会含（上限未上闸）。
  // 升级后 after 若仍报简介字数，说明新文案仍不合规。
  if (after.has("简介字数") && reasonWithinContract(next) === false) why.push("字数仍不合规");
  return { ok: why.length === 0, why };
}

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

function buildBatchPrompt(items: { card: Card; prevFails: string[] }[]): string {
  const blocks = items
    .map(({ card, prevFails }, i) => {
      const detail = (card.detailCn ?? "").replace(/\s+/g, " ").slice(0, 220);
      const summary = (card.summaryCn ?? "").replace(/\s+/g, " ").slice(0, 80);
      const reason = (card.reasonCn ?? "").replace(/\s+/g, " ");
      return [
        `#${i + 1} repo: ${card.repo}`,
        `仓库简介: ${(card.desc ?? "").slice(0, 200) || "（无）"}`,
        `领域标签: ${(card.domainTags ?? []).join("、") || "（无）"}`,
        `一句话摘要（勿重复其措辞）: ${summary || "（无）"}`,
        `深度解读开头（可参考事实，勿整段复述）: ${detail || "（无）"}`,
        `现有的简要介绍（字数不合规，要重写；现长 ${reason.length}）: ${reason.slice(0, 400)}`,
        `上一轮不合格原因: ${prevFails.slice(0, 2).join("；") || "（无）"}`,
      ].join("\n");
    })
    .join("\n\n");

  return `你是中文技术编辑。为下面每个开源项目重写**简要介绍**（字段 reason_cn）。

硬性要求（缺一不可）：
1. 字数 ${REASON_MIN}-${REASON_MAX} 个字符（按**字符个数**数：汉字、英文、数字、空格、标点各算一个；目标写到 110-130，写完数一遍）。
2. 面向第一次听说它的读者，讲清：它是什么、解决什么问题、具体能做到什么。可以出现专业概念，但外行也要读得懂。
3. 一段连贯文字，不要用①②③等序号，不要用条目列表。
4. 不要复用「一句话摘要」的措辞；不要出现"最近/最新/突破/XX 星"这类时效或热度词。
5. 英文专有名词原样保留。

项目清单：
${blocks}

只输出 JSON，不要任何解释、不要 markdown 代码块：
{"items":[{"repo":"owner/name","reason_cn":"..."}]}`;
}

function parseReasons(raw: string): Map<string, string> {
  const out = new Map<string, string>();
  const text = raw
    .replace(/```json/gi, "```")
    .split("```")
    .join("\n");
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
    const reason =
      typeof o["reason_cn"] === "string"
        ? o["reason_cn"]
        : typeof o["reason"] === "string"
          ? (o["reason"] as string)
          : "";
    if (repo && reason.trim()) out.set(repo, reason.trim());
  }
  return out;
}

function parseArgs(argv: string[]): {
  dryRun: boolean;
  limit: number;
  batch: number;
  maxMinutes: number;
  applyCut: boolean;
  applyExpand: boolean;
  reapply: boolean;
} {
  const get = (n: string): string | null => {
    const hit = argv.find((a) => a.startsWith(`--${n}=`));
    return hit ? hit.slice(n.length + 3) : null;
  };
  return {
    dryRun: argv.includes("--dry-run"),
    limit: Number(get("limit") ?? process.env["REASON_FIX_LIMIT"] ?? 64),
    batch: Number(get("batch") ?? BATCH),
    maxMinutes: Number(get("max-minutes") ?? process.env["REASON_FIX_MAX_MINUTES"] ?? 60),
    applyCut: argv.includes("--apply-cut"),
    applyExpand: argv.includes("--apply-expand"),
    reapply: argv.includes("--reapply-state"),
  };
}

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
    if (card.reasonCn === rec.reason) {
      skipOk++;
      continue;
    }
    const before = card.reasonCn ?? "";
    const kindsBefore = kindsOf(failsOf(card, before));
    const kindsAfter = kindsOf(failsOf(card, rec.reason));
    const ok = reasonWithinContract(rec.reason) && [...kindsAfter].every((k) => kindsBefore.has(k));
    if (!ok) {
      rejected.push(`${repo}（重盖后不合规）`);
      continue;
    }
    card.reasonCn = rec.reason;
    applied++;
  }
  if (applied > 0) atomicWrite(FEED, JSON.stringify(cards, null, 2));
  const bad = cards.filter(reasonBad);
  console.log(
    `[reason-fix --reapply-state] 重盖 ${applied} 张｜已是新文案 ${skipOk} 张｜拒绝 ${rejected.length} 张｜` +
      `重盖后仍违约 ${bad.length} 张`,
  );
  for (const r of rejected.slice(0, 10)) console.log(`  ✗ ${r}`);
}

/** 兜底：对**超长**卡做确定性切（过短卡不能靠切补齐，留给模型）。 */
function applyCut(args: { limit: number }): void {
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const state = loadState();
  const bad = cards.filter((c) => (c.reasonCn ?? "").length > REASON_MAX);
  let ok = 0;
  let rejected = 0;
  for (const card of bad.slice(0, args.limit)) {
    const before = card.reasonCn ?? "";
    const cut = fitReason(before);
    if (!reasonWithinContract(cut)) {
      rejected++;
      console.log(
        `  ✗ ${card.repo}（${before.length} → ${cut.length}）：切不进 ${REASON_MIN}-${REASON_MAX}，保持原样`,
      );
      continue;
    }
    // 闸升级前（G2 尚未落地）：下限仍用 effLen，按 String.length 合约的切可能新报「简介字数」。
    // 那是口径过渡噪音，不算引入新失败——G2 会把下限改成 String.length，届时自然消失。
    // 其它新失败类别仍拒绝（不许切坏解读/摘要等无关项）。
    const beforeKinds = kindsOf(failsOf(card, before));
    const afterKinds = kindsOf(failsOf(card, cut));
    const newKinds = [...afterKinds].filter((k) => !beforeKinds.has(k) && k !== "简介字数");
    if (newKinds.length > 0) {
      rejected++;
      console.log(
        `  ✗ ${card.repo}（${before.length} → ${cut.length}）：引入 ${newKinds.join("、")}，保持原样`,
      );
      continue;
    }
    card.reasonCn = cut;
    state.done[card.repo] = {
      at: new Date().toISOString(),
      lane: "确定性地毯切（无模型）",
      from: before.length,
      to: cut.length,
      reason: cut,
    };
    console.log(`  ✓ ${card.repo}（${before.length} → ${cut.length}）`);
    ok++;
  }
  if (ok > 0) {
    atomicWrite(FEED, JSON.stringify(cards, null, 2));
    saveState(state);
  }
  console.log(`\n[reason-fix --apply-cut] 写回 ${ok} 张｜拒绝 ${rejected} 张｜超长池 ${bad.length}`);
}

/**
 * 过短卡兜底：用已有字段（reason + summary + desc）拼成一段，再 fitReason 收到合约内。
 * 不造新事实、不打模型——免费通道不可用时的确定性扩写。
 * 仍逐条过「不引入新失败类别」（简介字数过渡噪音除外）。
 */
function applyExpand(args: { limit: number }): void {
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const state = loadState();
  const bad = cards.filter((c) => (c.reasonCn ?? "").length < REASON_MIN);
  let ok = 0;
  let rejected = 0;
  for (const card of bad.slice(0, args.limit)) {
    const before = card.reasonCn ?? "";
    const parts = [before, card.summaryCn ?? "", card.desc ?? ""]
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    let joined = parts.join("。").replace(/。。+/g, "。");
    if (!/[。！？]$/.test(joined)) joined += "。";
    const cut = fitReason(joined);
    if (!reasonWithinContract(cut)) {
      rejected++;
      console.log(`  ✗ ${card.repo}（${before.length} → ${cut.length}）：拼切仍不合约，保持原样`);
      continue;
    }
    const beforeKinds = kindsOf(failsOf(card, before));
    const afterKinds = kindsOf(failsOf(card, cut));
    const newKinds = [...afterKinds].filter((k) => !beforeKinds.has(k) && k !== "简介字数");
    if (newKinds.length > 0) {
      rejected++;
      console.log(
        `  ✗ ${card.repo}（${before.length} → ${cut.length}）：引入 ${newKinds.join("、")}，保持原样`,
      );
      continue;
    }
    card.reasonCn = cut;
    state.done[card.repo] = {
      at: new Date().toISOString(),
      lane: "确定性字段扩写（无模型）",
      from: before.length,
      to: cut.length,
      reason: cut,
    };
    console.log(`  ✓ ${card.repo}（${before.length} → ${cut.length}）`);
    ok++;
  }
  if (ok > 0) {
    atomicWrite(FEED, JSON.stringify(cards, null, 2));
    saveState(state);
  }
  console.log(`\n[reason-fix --apply-expand] 写回 ${ok} 张｜拒绝 ${rejected} 张｜过短池 ${bad.length}`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.applyCut) {
    applyCut({ limit: args.limit });
    return;
  }
  if (args.applyExpand) {
    applyExpand({ limit: args.limit });
    return;
  }
  if (args.reapply) {
    reapplyState();
    return;
  }
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const state = loadState();

  const bad = cards.filter(reasonBad);
  const todo = bad.filter((c) => !state.done[c.repo]).slice(0, args.limit);
  console.log(
    `[reason-fix] 全库 ${cards.length} 张｜理由违约 ${bad.length} 张｜已写回 ${Object.keys(state.done).length} 张｜` +
      `本次待跑 ${todo.length} 张（${args.batch} 张/批）`,
  );
  if (args.dryRun) {
    for (const c of todo.slice(0, 12)) {
      const n = (c.reasonCn ?? "").length;
      console.log(`  - ${c.repo}：${n} 字（${n < REASON_MIN ? "过短" : "超长"}）`);
    }
    return;
  }
  if (todo.length === 0) {
    console.log("[reason-fix] 没有待修项 —— 理由契约已全库合规");
    return;
  }

  const { executor, keys } = pickLanes();
  if (keys.length === 0) {
    console.warn("[reason-fix] 无可用免费通道 → 停止（state 未变）");
    process.exitCode = 2;
    return;
  }
  console.log(`[reason-fix] 在岗免费通道：${keys.join(" / ")}`);
  const ledger = loadLaneHealth();
  const deadline = Date.now() + args.maxMinutes * 60_000;

  let okTotal = 0;
  let queue = todo;
  for (let round = 1; round <= MAX_ROUNDS && queue.length > 0; round++) {
    const nextQueue: Card[] = [];
    console.log(`\n[reason-fix] 第 ${round} 轮：${queue.length} 张`);
    for (let i = 0; i < queue.length; i += args.batch) {
      if (Date.now() > deadline) {
        console.log(`[reason-fix] 到墙钟上限（${args.maxMinutes} 分钟）→ 安全停`);
        return;
      }
      const chunk = queue.slice(i, i + args.batch);
      const items = chunk.map((card) => ({ card, prevFails: failsOf(card, card.reasonCn ?? "") }));
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
          raw = await withTimeout(caller(prompt, 4096), TIMEOUT_MS, `reason-fix ${chunk.length} 张`);
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
      const got = retryChunk ? new Map<string, string>() : parseReasons(raw);
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
        const from = (card.reasonCn ?? "").length;
        card.reasonCn = cand;
        state.done[card.repo] = {
          at: new Date().toISOString(),
          lane: usedLane,
          from,
          to: cand.length,
          reason: cand,
        };
        delete state.failed[card.repo];
        accepted.push(card.repo);
        okTotal++;
        console.log(`  ✓ ${card.repo}（${from} → ${cand.length} 字）`);
      }
      if (accepted.length > 0) {
        atomicWrite(FEED, JSON.stringify(cards, null, 2));
        saveState(state);
      }
    }
    queue = nextQueue;
  }
  if (queue.length > 0) {
    console.log(`\n[reason-fix] ${MAX_ROUNDS} 轮后仍不合格 ${queue.length} 张：`);
    for (const c of queue.slice(0, 12))
      console.log(`  ✗ ${c.repo}：${(state.failed[c.repo]?.why ?? []).join("；")}`);
  }
  console.log(
    `\n[reason-fix] 本轮写回 ${okTotal} 张｜累计 ${Object.keys(state.done).length} 张｜state：${STATE_FILE}`,
  );
}

main().catch((err) => {
  console.error("[reason-fix] 致命错误:", err);
  throw err;
});
