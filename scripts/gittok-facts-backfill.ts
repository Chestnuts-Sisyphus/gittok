/**
 * K-02（A3）facts 专项补写队列 —— **只补 facts，绝不动已合格文案**。
 *
 * 为什么单开一条队列：`gittok-recopy.ts` 的选单口径是「不过现行生产闸」，而 facts 缺失的卡
 * 里绝大多数文案本身早已合格或不打算在本轮洗白——把它们混进文案队列，等于用洗文案的额度去补事实段，
 * 且会连带重写 summaryCn/reasonCn/detailCn（违反「不动已合格文案」）。本脚本队列＝**facts 为空的全部卡**，
 * 写回字段＝**只有 facts**，一个汉字都不碰文案。
 *
 * 闸：沿用生产溯源闸 `gSourceCheck`（source 必须字面存在于清洗后 README、claim≠source）
 *     + `FACTS_BUDGET`（claim≤40、source≤80、合计≤240 汉字、1-5 条）。**不过闸就不写**（不合格不进池）。
 *
 * ⛔ 不擅自把 facts 纳入必备字段（那是等裁项 C/A3）；本脚本只负责把覆盖率抬上去，
 *    并打印「若纳入必备字段」的影响面，供栗子裁。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-facts-backfill.ts --dry-run            # 只出队列与影响面，不吃额度
 *   npx tsx scripts/gittok-facts-backfill.ts --limit=20 --max-minutes=30
 *
 * 环境变量：FACTS_FEED / FACTS_STATE / FACTS_LIMIT / FACTS_MAX_MINUTES / FACTS_MAX_RETRY
 * 免费通道纪律同 recopy：只挂免费档，08:00 后跑，一次一批（并发会互相覆盖 feed.json）。
 */

import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

import { buildPlan, dropRetiredLanes } from "./gittok-fullbuild-lib.ts";
import { ScheduledLlmExecutor } from "../src/feed/executor.ts";
import { loadLaneHealth, recordLaneResult, saveLaneHealth } from "../src/feed/lane-health.ts";
import { cleanV4 } from "../src/feed/stage1.ts";
import { loadConfig } from "../src/config.ts";
import { FACTS_BUDGET, gSourceCheck } from "../src/feed/prompts.ts";
import type { Fact, RepoForScoring } from "../src/feed/types.ts";

const FEED = process.env["FACTS_FEED"] ?? path.join("data", "feed.json");
const STATE_FILE = process.env["FACTS_STATE"] ?? path.join("data", "facts-backfill-state.json");
const VERSION = "facts-backfill:v1";
const MAX_RETRY = Number(process.env["FACTS_MAX_RETRY"] ?? 2);
const TIMEOUT_MS = 180_000;
const COOLDOWN_WAIT_MS = 20_000;

interface Card {
  repo: string;
  desc?: string;
  stars?: number;
  language?: string;
  topics?: string[];
  createdAt?: string;
  pushedAt?: string;
  facts?: Fact[];
  summaryCn?: string;
  reasonCn?: string;
  detailCn?: string;
  [k: string]: unknown;
}

interface FactsState {
  version: string;
  createdAt: string;
  updatedAt: string;
  done: Record<string, { at: string; n: number; lane: string }>;
  failed: Record<string, { at: string; tries: number; fails: string[]; noReadme?: boolean }>;
}

function hasFacts(c: Card): boolean {
  return Array.isArray(c.facts) && c.facts.length > 0;
}

function loadState(): FactsState {
  const now = new Date().toISOString();
  if (fs.existsSync(STATE_FILE)) {
    try {
      const s = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as FactsState;
      if (s.version === VERSION) return s;
      console.log(`[facts] state 指纹变了（${s.version} → ${VERSION}），旧凭证作废`);
    } catch {
      console.log(`[facts] state 读坏了，重建：${STATE_FILE}`);
    }
  }
  return { version: VERSION, createdAt: now, updatedAt: now, done: {}, failed: {} };
}

function saveState(s: FactsState): void {
  s.updatedAt = new Date().toISOString();
  const tmp = `${STATE_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(s, null, 2), "utf-8");
  fs.renameSync(tmp, STATE_FILE);
}

/** 出网白名单：只允许 https + api.github.com（同 recopy 纪律）。 */
function assertGithubApiUrl(u: string): void {
  const parsed = new URL(u);
  if (parsed.protocol !== "https:") throw new Error(`拒绝非 https 目标：${u}`);
  if (parsed.hostname !== "api.github.com") throw new Error(`拒绝非白名单 host：${parsed.hostname}`);
}

function assertRepoName(repo: string): void {
  if (!/^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/.test(repo)) throw new Error(`repo 名不合法：${repo}`);
  const [owner, ...rest] = repo.split("/");
  if (rest.length !== 1) throw new Error(`repo 名不合法（段数≠2）：${repo}`);
  for (const seg of [owner, rest[0]]) if (seg === "." || seg === "..") throw new Error(`repo 名含相对路径段：${repo}`);
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
        "user-agent": "gittok-facts-backfill",
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
  // ⛔ 不挂付费通道（栗子硬规：GitTok 只用免费模型）
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
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

/** facts 专项 prompt：只索要 facts 数组，明确禁止重写文案（与生产 QIANREN_SPEC 同口径的字段规格）。 */
function buildFactsPrompt(repo: RepoForScoring, doc: string): string {
  return (
    `下面是项目 ${repo.repo} 的基本信息与它的自述参考文档（README 清洗后）。\n\n` +
    `# 项目自述参考文档\n${doc.slice(0, 12000)}\n\n` +
    `# 任务\n` +
    `只做一件事：从上面的参考文档里找出 3-5 条**独有事实**——这个项目区别于其他同类项目的具体细节，` +
    `不要写任何同类项目都有的泛泛描述。每条事实写成两个字段：\n` +
    `- claim：你自己的归纳断言，不超过 ${FACTS_BUDGET.claim} 个汉字，不得与 source 字面相同，不得整句照抄参考文档；\n` +
    `- source：从参考文档**原样复制**的一句话证据（含关键数字或专名的原句，不超过 ${FACTS_BUDGET.source} 个汉字，可在句号处截断）；\n` +
    `整个 facts 数组（所有 claim 与 source 合计）不超过 ${FACTS_BUDGET.total} 个汉字，` +
    `装不下就如实写 ${FACTS_BUDGET.minFacts}-2 条，不要硬凑。\n` +
    `文档里确实没有可查证细节时，宁可只写 1 条也不要编。\n\n` +
    `# 输出格式\n只返回一个 JSON 对象，不要任何其他文字、不要 markdown 代码块标记。结构：\n` +
    `{"repo":"${repo.repo}","facts":[{"claim":"…","source":"…"}]}`
  );
}

function parseFacts(raw: string): Fact[] | undefined {
  const t = raw
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start < 0 || end <= start) return undefined;
  try {
    const obj = JSON.parse(t.slice(start, end + 1)) as { facts?: unknown };
    if (!Array.isArray(obj.facts)) return undefined;
    return obj.facts
      .filter((x): x is Fact => !!x && typeof (x as Fact).claim === "string" && typeof (x as Fact).source === "string")
      .map((x) => ({ claim: String(x.claim).trim(), source: String(x.source).trim() }));
  } catch {
    return undefined;
  }
}

/** facts 闸：条数 + 预算 + 逐条溯源（生产同闸）。 */
function factsGate(facts: Fact[], doc: string): string[] {
  const fails: string[] = [];
  if (facts.length < FACTS_BUDGET.minFacts) fails.push(`facts 只有 ${facts.length} 条（要求至少 ${FACTS_BUDGET.minFacts} 条）`);
  if (facts.length > FACTS_BUDGET.maxFacts) fails.push(`facts ${facts.length} 条（超过 ${FACTS_BUDGET.maxFacts} 条上限）`);
  let total = 0;
  facts.forEach((f, i) => {
    total += f.claim.length + f.source.length;
    if (f.claim.length > FACTS_BUDGET.claim) fails.push(`fact${i + 1} claim ${f.claim.length} 字（超过 ${FACTS_BUDGET.claim}）`);
    if (f.source.length > FACTS_BUDGET.source) fails.push(`fact${i + 1} source ${f.source.length} 字（超过 ${FACTS_BUDGET.source}）`);
    const g = gSourceCheck(f.claim, f.source, doc);
    if (!g.ok) fails.push(`fact${i + 1} 溯源不过：${g.fails.join("；")}`);
  });
  if (total > FACTS_BUDGET.total) fails.push(`facts 合计 ${total} 汉字（超过 ${FACTS_BUDGET.total} 预算）`);
  return fails;
}

async function fillOne(
  card: Card,
  executor: ScheduledLlmExecutor,
  laneKeys: string[],
  ledger: ReturnType<typeof loadLaneHealth>,
  deadline: number,
): Promise<{ ok: boolean; facts?: Fact[]; fails: string[]; lane: string; noReadme: boolean }> {
  const readme = await fetchReadme(card.repo);
  const doc = readme ? cleanV4(readme) : "";
  if (!doc) return { ok: false, fails: ["README 取不到（上游无自述）"], lane: laneKeys[0] ?? "（无通道）", noReadme: true };
  const repo: RepoForScoring = {
    repo: card.repo,
    description: card.desc ?? "",
    stars: card.stars ?? 0,
    language: card.language ?? "",
    topics: card.topics ?? [],
    createdAt: card.createdAt,
    pushedAt: card.pushedAt,
    readme,
  };
  let fails: string[] = [];
  let attemptsLeft = MAX_RETRY + 1;
  let lastLane = laneKeys[0] ?? "（无通道）";
  while (attemptsLeft > 0) {
    if (Date.now() > deadline) return { ok: false, fails: ["到墙钟上限"], lane: lastLane, noReadme: false };
    let called = false;
    for (const laneKey of laneKeys) {
      const caller = executor.callerFor(laneKey);
      if (!caller) continue;
      lastLane = laneKey;
      called = true;
      const prompt =
        attemptsLeft === MAX_RETRY + 1
          ? buildFactsPrompt(repo, doc)
          : `${buildFactsPrompt(repo, doc)}\n\n# 上一次被判不合格，必须改掉\n${fails.map((f) => `- ${f}`).join("\n")}`;
      let raw = "";
      try {
        raw = await withTimeout(caller(prompt, 2048), TIMEOUT_MS, `facts ${card.repo}`);
        recordLaneResult(ledger, laneKey, { calls: 1, ok: 1 });
        saveLaneHealth(ledger);
      } catch (err) {
        const why = String(err).slice(0, 160);
        recordLaneResult(ledger, laneKey, { calls: 1, ok: 0, lastError: why });
        saveLaneHealth(ledger);
        fails = [`通道失败：${why}`];
        continue;
      }
      const parsed = parseFacts(raw);
      if (!parsed) {
        fails = ["输出解析失败（无合法 facts）"];
        break;
      }
      const gate = factsGate(parsed, doc);
      if (gate.length === 0) return { ok: true, facts: parsed, fails: [], lane: laneKey, noReadme: false };
      fails = gate;
      break;
    }
    if (!called) {
      const left = Math.round((deadline - Date.now()) / 1000);
      console.log(`  … ${card.repo}：免费通道全部冷却，等 ${COOLDOWN_WAIT_MS / 1000}s（剩余 ${left}s）`);
      if (Date.now() + COOLDOWN_WAIT_MS > deadline) return { ok: false, fails: ["通道冷却且墙钟不足"], lane: lastLane, noReadme: false };
      await sleep(COOLDOWN_WAIT_MS);
      continue;
    }
    attemptsLeft--;
  }
  return { ok: false, fails, lane: lastLane, noReadme: false };
}

/** 「若把 facts 纳入必备字段」影响面（等裁材料，本脚本不擅自纳入）。 */
function impactReport(cards: Card[]): void {
  const empty = cards.filter((c) => !hasFacts(c));
  const passCopy = empty.filter((c) => !!c.summaryCn && !!c.reasonCn && !!c.detailCn);
  console.log(`\n—— 若把 facts 纳入必备字段：影响面（等裁，不擅自纳入）——`);
  console.log(`  全库 ${cards.length} 张｜facts 空 ${empty.length} 张（${((empty.length / cards.length) * 100).toFixed(1)}%）`);
  console.log(`  其中文案三段齐全＝${passCopy.length} 张：纳入必备字段后这些卡会**当场从合格变不合格**`);
  console.log(`  → 公开面后果：推荐池剔 copyOk=false 的卡，合格池会按同比例收缩，需先补完 facts 再谈纳入`);
}

async function main(): Promise<number> {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const limitArg = argv.find((a) => a.startsWith("--limit="));
  const minArg = argv.find((a) => a.startsWith("--max-minutes="));
  const repoArg = argv.find((a) => a.startsWith("--repo="));
  const limit = Number(process.env["FACTS_LIMIT"] ?? limitArg?.slice("--limit=".length) ?? 20);
  const maxMinutes = Number(process.env["FACTS_MAX_MINUTES"] ?? minArg?.slice("--max-minutes=".length) ?? 30);

  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const state = loadState();
  const queueAll = cards.filter((c) => !hasFacts(c) && (!repoArg || c.repo === repoArg.slice("--repo=".length)));
  const pending = queueAll.filter((c) => !state.done[c.repo]);
  const coverageBefore = cards.length - queueAll.length;
  console.log(`【facts 专项补写｜${VERSION}】`);
  console.log(`全库 ${cards.length} 张｜facts 覆盖 ${coverageBefore} 张（${((coverageBefore / cards.length) * 100).toFixed(1)}%）｜待补 ${pending.length} 张`);
  impactReport(cards);
  if (dryRun) {
    console.log(`\n[dry-run] 未出网、未花额度。队列头 10 张：${pending.slice(0, 10).map((c) => c.repo).join(" ")}`);
    return 0;
  }

  const { executor, keys } = pickLanes();
  const ledger = loadLaneHealth();
  const deadline = Date.now() + maxMinutes * 60_000;
  const queue = pending.slice(0, limit);
  console.log(`本次队列 ${queue.length} 张｜通道 ${keys.length} 条（免费）｜墙钟上限 ${maxMinutes} 分钟\n`);

  let wrote = 0;
  let laneFail = 0;
  for (const card of queue) {
    if (Date.now() > deadline) {
      console.log(`[facts] 到墙钟上限，安全停（state 已落盘，续跑即可）`);
      break;
    }
    const out = await fillOne(card, executor, keys, ledger, deadline);
    if (out.ok && out.facts) {
      const target = cards.find((c) => c.repo === card.repo)!;
      // 写回纪律：**只写 facts**，文案与判据字段一个都不动
      target.facts = out.facts;
      state.done[card.repo] = { at: new Date().toISOString(), n: out.facts.length, lane: out.lane };
      delete state.failed[card.repo];
      wrote++;
      console.log(`  ✅ ${card.repo}：补 ${out.facts.length} 条 facts（${out.lane}）｜文案未动`);
    } else {
      const prev = state.failed[card.repo];
      const tries = (prev?.tries ?? 0) + 1;
      state.failed[card.repo] = { at: new Date().toISOString(), tries, fails: out.fails, noReadme: out.noReadme };
      if (out.fails.some((f) => f.startsWith("通道失败") || f.includes("墙钟") || f.includes("冷却"))) laneFail++;
      console.log(`  ❌ ${card.repo}（第 ${tries} 次）：${out.fails.slice(0, 3).join("；")}`);
    }
    saveState(state);
    // 原子写：与 gittok-recopy.ts 同纪律，避免并发读者读到半份 feed.json
    const tmp = `${FEED}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(cards, null, 2), "utf-8");
    fs.renameSync(tmp, FEED);
  }

  const coverageAfter = cards.filter(hasFacts).length;
  console.log(`\n—— facts 专项收口 ——`);
  console.log(`写回 ${wrote} 张（失败 ${Object.keys(state.failed).length} 张，其中通道类 ${laneFail}）`);
  console.log(`facts 覆盖 ${coverageBefore} → ${coverageAfter}（${((coverageAfter / cards.length) * 100).toFixed(1)}%）`);
  console.log(`文案字段（summaryCn/reasonCn/detailCn）本脚本**一次都没写**；判据字段未动。`);
  return 0;
}

main().then((code) => process.exit(code));
