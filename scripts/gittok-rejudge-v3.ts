/**
 * 全库 v3 重判驱动（2026-09-14 晚，栗子「从底层拆解」指令的执行层）。
 *
 * 与 `gittok-zone-parallel.ts`（v2.2 回填）的三个区别：
 *  1. **判据换成二分判定树**（`src/feed/taxonomy.ts` 的 ZONE_RULES_V3）：四区不推翻，
 *     但边界改成「三分支二分链」——每步一个是/否，第一个答是的就是结果，三问全否=工具。
 *     互斥性由构造保证（工具区=三问全否，因此工具区的卡不可能属于其余三区）。
 *  2. **输入升级**：喂 detailCn 全文（v2.2 只喂 160 字摘要——detail 与 README 都没进模型），
 *     外加 desc/topics/时间/星数。这是「判据拆到本质」的必要条件。
 *  3. **乐趣六维**：输出 fun_dims（六维各 0/0.5/1），本地按 funFromDims() 合成 fun_score
 *     （公式唯一事实源在 taxonomy.ts，不信模型自己算的算术）。
 *
 * 旧值不丢：写新值前把 v2.2 的 zone/funScore 存进 legacyZone/legacyFunScore 供对照。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-rejudge-v3.ts                      # 全库重判（可续跑）
 *   npx tsx scripts/gittok-rejudge-v3.ts --limit=100 --workers=3 --batch=10
 *   npx tsx scripts/gittok-rejudge-v3.ts --sample=100         # 分层抽样 100 张试跑
 *   npx tsx scripts/gittok-rejudge-v3.ts --dry-run            # 只统计不调模型
 *
 * 环境变量：REJUDGE_FEED / REJUDGE_STATE / REJUDGE_WORKERS / REJUDGE_BATCH / REJUDGE_LIMIT
 */

import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { buildPlan } from "./gittok-fullbuild-lib.ts";
import { loadLaneHealth, recordLaneResult, saveLaneHealth } from "../src/feed/lane-health.ts";
import { ScheduledLlmExecutor } from "../src/feed/executor.ts";
import {
  ZONES,
  ZONE_RULES_V3,
  FUN_RULES_V3,
  FUN_DIMS,
  funFromDims,
  CATEGORY_TO_ZONE,
} from "../src/feed/taxonomy.ts";
import { domainKeyOf } from "../src/feed/prompts.ts";

const FEED = process.env["REJUDGE_FEED"] ?? path.join("data", "feed.json");
const STATE = process.env["REJUDGE_STATE"] ?? path.join("data", "rejudge-v3-state.json");

/** 判据版本指纹：判据改了 → 指纹变 → 已判凭证自动失效（防「用旧判据的成果冒充新判据」）。 */
const JUDGE_VERSION = `v3:${ZONE_RULES_V3.length}:${FUN_RULES_V3.length}`;

export interface Card {
  repo: string;
  owner?: string;
  desc?: string;
  stars?: number;
  language?: string;
  topics?: string[];
  createdAt?: string;
  summaryCn?: string;
  reasonCn?: string;
  detailCn?: string;
  aiDims?: string[];
  aiScore?: number;
  category?: string;
  zone?: string;
  zoneSource?: string;
  zoneReason?: string;
  funScore?: number;
  funScoreSource?: string;
  funDims?: Record<string, number>;
  funReason?: string;
  legacyZone?: string;
  legacyFunScore?: number;
  domainTags?: string[];
  domainKey?: string;
  [k: string]: unknown;
}

interface Verdict {
  repo: string;
  zone: string;
  zone_reason?: string;
  fun_reason?: string;
  fun_dims?: Record<string, number>;
  fun_score?: number;
  tags?: string[];
}

/** detail 截断上限：v3 的输入升级点（v2.2 是 160 字摘要，这里是 detail 全文的头 900 字）。 */
const DETAIL_INPUT_CHARS = 900;

export function buildPrompt(cards: Card[]): string {
  const items = cards
    .map((c, i) => {
      const detail = (c.detailCn ?? "").replace(/\s+/g, " ").slice(0, DETAIL_INPUT_CHARS);
      const parts = [
        `${i + 1}. ${c.repo}`,
        `语言 ${c.language ?? "未知"}｜${c.stars ?? 0}★｜建于 ${(c.createdAt ?? "").slice(0, 10) || "未知"}`,
        `描述：${(c.desc ?? "无").replace(/\s+/g, " ").slice(0, 200)}`,
      ];
      if (c.topics && c.topics.length > 0) parts.push(`话题：${c.topics.slice(0, 8).join(", ")}`);
      if (c.summaryCn) parts.push(`一句话：${c.summaryCn.replace(/\s+/g, " ").slice(0, 120)}`);
      if (c.reasonCn) parts.push(`简介：${c.reasonCn.replace(/\s+/g, " ").slice(0, 220)}`);
      if (detail) parts.push(`详情全文：${detail}`);
      return parts.join("\n   ");
    })
    .join("\n\n");
  return (
    `给下面 ${cards.length} 个 GitHub 项目各判：内容分区 zone、乐趣六维 fun_dims、领域词 tags。\n\n` +
    `# 分区判定（四区枚举，按二分链依次问，只选第一个答「是」的）\n${ZONE_RULES_V3}\n\n` +
    `# 乐趣判定（六维独立判，再按公式合成）\n${FUN_RULES_V3}\n\n` +
    `# 领域词 tags\n` +
    `3-6 个「这个项目做什么领域」的具体名词（如：国际象棋、实时视频处理、家庭能源监控），` +
    `面向人可读可搜索；不要形容词、不要热度词、不要「AI」「工具」这种空泛词。\n\n` +
    `# 项目列表\n${items}\n\n` +
    `# 输出格式\n` +
    `只输出一个 JSON 数组，不要任何其他文字、不要 markdown 代码块：\n` +
    `[{"repo":"owner/repo","zone":"工具","zone_reason":"一句话依据（20 字内）",` +
    `"fun_dims":{${FUN_DIMS.map((d) => `"${d.key}":0`).join(",")}},` +
    `"fun_reason":"一句话依据（20 字内）","tags":["领域词1","领域词2","领域词3"]}]\n` +
    `fun_dims 每一维只能填 0 / 0.5 / 1 之一。`
  );
}

/** 硬超时包装：任何一路通道挂住都必须能被丢弃，否则整轮回填停摆
 *  （2026-09-14 实测：智谱免费档限流后请求悬住不返回，脚本静默停摆 15 分钟无输出）。 */
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

/** 原子落盘（临时文件 + rename）：防中断/并发把主文件写成半截。 */
function atomicWrite(file: string, text: string): void {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, file);
}

function loadJson<T>(file: string, dflt: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return dflt;
  }
}

/** 容错解析（去代码块标记 + 摘最外层数组 + 只留合法 zone）。 */
export function parseVerdicts(raw: string): Verdict[] {
  let text = raw
    .trim()
    .replace(/```(?:json)?/g, "")
    .replace(/```/g, "");
  const s = text.indexOf("[");
  const e = text.lastIndexOf("]");
  if (s === -1 || e === -1 || e <= s) return [];
  text = text.slice(s, e + 1);
  try {
    const arr = JSON.parse(text) as Verdict[];
    return arr.filter((v) => v && typeof v.repo === "string" && ZONES.includes(v.zone as never));
  } catch {
    return [];
  }
}

/** 六维归一：只接受 0/0.5/1（越界裁剪到 [0,1]），缺维按 0（宁缺毋滥，不猜）。 */
export function normDims(raw: Record<string, number> | undefined): Record<string, number> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const out: Record<string, number> = {};
  let any = false;
  for (const d of FUN_DIMS) {
    const v = raw[d.key];
    if (typeof v === "number" && Number.isFinite(v)) {
      out[d.key] = Math.max(0, Math.min(1, v));
      any = true;
    } else {
      out[d.key] = 0;
    }
  }
  return any ? out : undefined;
}

/** 把一批判定写进卡（返回命中数）。旧值先存 legacy*，再覆盖。 */
export function applyVerdicts(cards: Card[], byRepo: Map<string, Card>, verdicts: Verdict[]): number {
  let n = 0;
  for (const v of verdicts) {
    const card = byRepo.get(v.repo);
    if (!card) continue;
    if (card.zone && card.legacyZone === undefined) card.legacyZone = card.zone;
    if (typeof card.funScore === "number" && card.legacyFunScore === undefined) {
      card.legacyFunScore = card.funScore;
    }
    card.zone = v.zone;
    card.zoneSource = "model";
    if (typeof v.zone_reason === "string" && v.zone_reason.trim()) {
      card.zoneReason = v.zone_reason.trim().slice(0, 40);
    }
    const dims = normDims(v.fun_dims);
    if (dims) {
      card.funDims = dims;
      card.funScore = funFromDims(dims); // 公式本地算（唯一事实源），不信模型算术
      card.funScoreSource = "model";
    } else if (typeof v.fun_score === "number" && Number.isFinite(v.fun_score)) {
      card.funScore = Math.max(0, Math.min(1, v.fun_score));
      card.funScoreSource = "model";
    }
    if (typeof v.fun_reason === "string" && v.fun_reason.trim()) {
      card.funReason = v.fun_reason.trim().slice(0, 40);
    }
    if (Array.isArray(v.tags) && v.tags.length >= 3) {
      const tags = v.tags.filter((t) => typeof t === "string" && t.trim()).slice(0, 6);
      if (tags.length >= 3) {
        card.domainTags = tags;
        const dk = domainKeyOf(v.zone, tags);
        if (dk) card.domainKey = dk;
      }
    }
    n++;
  }
  return n;
}

interface RejudgeState {
  updatedAt: string;
  judgeVersion: string;
  done: Record<string, string>; // repo → judgeVersion
}

function numArg(argv: string[], name: string, dflt: number, envPrefix = "REJUDGE"): number {
  const a = argv.find((x) => x.startsWith(`--${name}=`));
  if (a) return Number(a.split("=")[1]);
  const raw = process.env[`${envPrefix}_${name.toUpperCase().replace(/-/g, "_")}`];
  if (raw === undefined || raw === "") return dflt;
  const n = Number(raw);
  return Number.isFinite(n) ? n : dflt;
}

/** 分层抽样：每个旧 zone 按比例抽，且保证「边界易错族」（skill/引擎/清单/AI 框架）必被抽中。
 *  抽样是**确定性**的（FNV-1a 哈希排序，不用随机数）：同样的输入永远得到同样的样本，
 *  试跑结果可复现、可对比（随机抽样会让「上一轮怎么判的」无法复盘）。 */
export function stratifiedSample(cards: Card[], n: number): Card[] {
  const keyRe = /skill|engine|awesome|framework|agent|tutorial|games|list/i;
  const rank = (s: string): number => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) % 100000;
  };
  const out: Card[] = [];
  const taken = new Set<string>();
  // 先保证边界族：按哈希序抽一半
  const edge = cards
    .filter((c) => keyRe.test(`${c.repo} ${c.desc ?? ""} ${c.topics?.join(" ") ?? ""}`))
    .sort((a, b) => rank(a.repo) - rank(b.repo));
  for (const c of edge) {
    if (out.length >= Math.floor(n * 0.5)) break;
    out.push(c);
    taken.add(c.repo);
  }
  // 其余按旧 zone 轮转补齐（每区内部按哈希序）
  const byLegacy = new Map<string, Card[]>();
  for (const c of cards) {
    const k = c.legacyZone ?? c.zone ?? "(无)";
    if (!byLegacy.has(k)) byLegacy.set(k, []);
    byLegacy.get(k)!.push(c);
  }
  const zones = [...byLegacy.keys()].sort();
  for (const z of zones) byLegacy.get(z)!.sort((a, b) => rank(a.repo) - rank(b.repo));
  let i = 0;
  let guard = 0;
  while (out.length < n && zones.length > 0 && guard++ < n * 100) {
    const z = zones[i % zones.length]!;
    const pool = byLegacy.get(z)!;
    const next = pool.find((c) => !taken.has(c.repo));
    if (next) {
      out.push(next);
      taken.add(next.repo);
    }
    i++;
  }
  return out.slice(0, n);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const workers = Math.max(1, numArg(argv, "workers", 3));
  const batchSize = Math.max(1, numArg(argv, "batch", 10));
  const rawLimit = numArg(argv, "limit", Number.POSITIVE_INFINITY);
  const limit = rawLimit > 0 ? rawLimit : Number.POSITIVE_INFINITY;
  const sampleN = numArg(argv, "sample", 0);
  const dryRun = argv.includes("--dry-run");
  /** --force-all：无视 state 凭证、全库重判（判据大改后用一次） */
  const forceAll = argv.includes("--force-all");
  /** --only=repo1,repo2：只重判指定的卡（锚点集验证用） */
  const only = (argv.find((x) => x.startsWith("--only="))?.split("=")[1] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const byRepo = new Map(cards.map((c) => [c.repo, c] as const));
  const state = loadJson<RejudgeState>(STATE, { updatedAt: "", judgeVersion: JUDGE_VERSION, done: {} });
  const stateUsable = state.judgeVersion === JUDGE_VERSION;

  let todo: Card[];
  if (only.length > 0) {
    todo = only.map((r) => byRepo.get(r)).filter((c): c is Card => !!c);
  } else if (sampleN > 0) {
    todo = stratifiedSample(cards, sampleN).slice(0, Number.isFinite(limit) ? limit : undefined);
  } else {
    todo = cards
      .filter((c) => {
        if (forceAll || !stateUsable) return true;
        return state.done[c.repo] !== JUDGE_VERSION;
      })
      .slice(0, Number.isFinite(limit) ? limit : undefined);
  }
  console.log(
    `[rejudge-v3] 总卡 ${cards.length}｜judge ${JUDGE_VERSION}｜state 可用=${stateUsable}` +
      `（凭证 ${Object.keys(state.done ?? {}).length}）｜待办 ${todo.length}｜${workers} 通道 × 每批 ${batchSize}`,
  );
  if (dryRun || todo.length === 0) return;

  const ledger = loadLaneHealth();
  // 注意（2026-09-15 实测踩坑）：**这里不能用 dropRetiredLanes 直接摘**——健康账是「上一轮的经验」，
  // 而配额类退出期（每日额度）跨天就会自然恢复。先摘再探会把恢复了的通道永久挡在门外
  // （实测：modelscope/openrouter 额度已恢复、探针 ✓，却因账本里的退出期没被探到而"无可用通道"）。
  // 正确顺序：**先探全部通道**（探针是事实，账本是经验）→ 探针成功即撤销退出期 → 只保留探活通道。
  const { tail, env } = buildPlan();
  // 附加通道（**仅本脚本**，不动生产矩阵）：
  //  `--agnes`：免费附加源，但实测它在「多张 × detail 900 字」的长输入上会悬住不返回
  //            → 默认关（见下方免费-only 纪律）。
  const extra: typeof tail = [];
  if (argv.includes("--agnes")) {
    const agnesKey = env["AGNES_API_KEY"] ?? process.env["AGNES_API_KEY"] ?? "";
    if (agnesKey.length > 0) {
      extra.push({
        entry: "agnes:agnes-2.0-flash:0",
        params: {},
        paramsEnv: "",
        keys: [agnesKey],
        note: "免费附加通道（仅回填脚本）",
        keyFp: "",
      });
    }
  }
  // ⛔ 付费 / 订阅通道一律不用（栗子 2026-09-15 硬性规则：**GitTok 只允许免费模型**）。
  // 之前为赶全库重判临时挂过 GOAT 订阅与百炼付费键，现已移除；余额/订阅额度都不再属于可用资源。
  // 免费档被限流时的正确姿势：等配额跨天自然恢复（通道健康账会自动复活），或减小 batch 慢慢跑。
  // 附：全库重判在纯免费档下的实测吞吐 ≈ 11-21 张/分钟（智谱 GLM-4.7-Flash 单/双账号），
  //     2477 张 ≈ 2-3.5 小时，可断点续跑（state 记凭证，重启自动跳过已判卡）。

  const lanes = [...tail, ...extra];
  const merged: NodeJS.ProcessEnv = { ...process.env, ...env };
  for (const t of lanes) if (t.paramsEnv) merged[t.paramsEnv] = JSON.stringify(t.params);
  for (const [k, v] of Object.entries(merged)) if (v !== undefined) process.env[k] = v;

  const laneSpecs = lanes.map((t) => {
    const first = t.entry.indexOf(":");
    const last = t.entry.lastIndexOf(":");
    const tailPart = t.entry.slice(last + 1);
    const provider = t.entry.slice(0, first);
    const model = t.entry.slice(first + 1, /^\d+$/.test(tailPart) ? last : undefined);
    return { provider, model, keys: t.keys, extraParams: t.params, key: `${provider}:${model}` };
  });
  const executor = new ScheduledLlmExecutor(laneSpecs);

  // 通道预筛：只留真能回的通道（死通道会反复吃批次，v2.2 实测浪费 1,420 张）
  // `--skip-lanes=a,b`：跳过指定通道的预筛（已知死掉的通道别再花 45s 探一次——
  // 2026-09-14 实测：智谱免费档被限流、魔搭/OpenRouter 熔断，三个死通道每次启动白烧 2 分半）
  const skipLanes = (argv.find((x) => x.startsWith("--skip-lanes="))?.split("=")[1] ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const alive: typeof laneSpecs = [];
  for (const lane of laneSpecs) {
    if (skipLanes.some((s) => lane.key.includes(s))) {
      console.log(`  [rejudge-v3] 通道预筛 - ${lane.key} —— 按 --skip-lanes 跳过`);
      continue;
    }
    const c = executor.callerFor(lane.key);
    let ok = false;
    let why = "未注册";
    if (c) {
      try {
        // 探针 token 预算必须给够：推理型模型（muse 一类）会把 64 token 全花在思考上，
        // 返回空 content → 被误判成死通道（2026-09-14 实测：推理型通道 64 token 探针
        // 拿不到内容而判 ✗，把预算提到 1024 就能过）。
        ok =
          (await withTimeout(c('只回一行 JSON：{"ok":true}', 1024), 45_000, `预筛 ${lane.key}`)).trim()
            .length > 0;
        why = ok ? "" : "空响应";
      } catch (err) {
        ok = false;
        why = String(err).slice(0, 120);
      }
    }
    console.log(`  [rejudge-v3] 通道预筛 ${ok ? "✓" : "✗"} ${lane.key}${ok ? "" : ` —— ${why}`}`);
    // 探针结果写回健康账：成功 = 撤销退出期（配额跨天恢复后自动复活，不用人工改账本）
    recordLaneResult(ledger, lane.key, { calls: 1, ok: ok ? 1 : 0, lastError: ok ? undefined : why });
    if (ok) alive.push(lane);
  }
  saveLaneHealth(ledger);
  if (alive.length === 0) {
    console.error("[rejudge-v3] 无可用通道，退出（不写盘）");
    process.exit(1);
  }

  // 批次按通道分片（lane-affine：每条通道只吃自己那份，互不抢出 429）
  const perLane: Card[][][] = alive.map(() => []);
  for (let i = 0; i < todo.length; i += batchSize) {
    perLane[(i / batchSize) % alive.length]!.push(todo.slice(i, i + batchSize));
  }

  const persist = (): void => {
    state.updatedAt = new Date().toISOString();
    state.judgeVersion = JUDGE_VERSION;
    atomicWrite(FEED, JSON.stringify(cards, null, 2));
    atomicWrite(STATE, JSON.stringify(state, null, 2));
  };

  const maxFailures = Math.max(1, numArg(argv, "max-failures", 4));
  let doneModel = 0;
  let failedBatches = 0;

  const runWorker = async (laneIdx: number): Promise<void> => {
    const lane = alive[laneIdx]!;
    const queue = perLane[laneIdx]!;
    let consecutiveFail = 0;
    let idleRounds = 0;
    for (;;) {
      const myBatch = queue.shift();
      if (!myBatch) return;
      if (consecutiveFail >= maxFailures) return; // 通道认输，剩余批次留给其它通道/下一轮
      const caller = executor.callerFor(lane.key);
      if (!caller) {
        idleRounds++;
        if (idleRounds > 30) return;
        queue.unshift(myBatch);
        await new Promise((r) => setTimeout(r, 20_000));
        continue;
      }
      idleRounds = 0;
      let n = 0;
      try {
        // 8192：推理型通道（muse）思考会吃掉 3-4 倍预算，给足才不会 JSON 截断
        const raw = await withTimeout(
          caller(buildPrompt(myBatch), 8192),
          Number(process.env["REJUDGE_BATCH_TIMEOUT_MS"] ?? 200_000),
          `批次 ${lane.key}`,
        );
        const verdicts = parseVerdicts(raw);
        n = applyVerdicts(cards, byRepo, verdicts);
        for (const v of verdicts) state.done[v.repo] = JUDGE_VERSION;
      } catch (err) {
        console.warn(`  [rejudge-v3] ${lane.key} 批失败: ${String(err).slice(0, 90)}`);
      }
      if (n > 0) {
        consecutiveFail = 0;
        doneModel += n;
        persist();
        console.log(`  [rejudge-v3] ${lane.key} ✓ ${n} 张（累计 ${doneModel}/${todo.length}）`);
      } else {
        consecutiveFail++;
        failedBatches++;
        if (consecutiveFail < maxFailures)
          queue.push(myBatch); // 放回队尾重试
        else console.warn(`  [rejudge-v3] ${lane.key} 连败 ${consecutiveFail} 次，通道退出`);
      }
    }
  };

  await Promise.all(alive.map((_, i) => runWorker(i)));
  persist();
  const legacied = cards.filter((c) => c.legacyZone).length;
  const dimed = cards.filter((c) => c.funDims).length;
  console.log(
    `[rejudge-v3] 完成：本轮模型判定 ${doneModel} 张，失败批 ${failedBatches}｜` +
      `全库 legacyZone ${legacied}｜funDims ${dimed}｜凭证 ${Object.keys(state.done).length}`,
  );
  void CATEGORY_TO_ZONE; // 保留导出引用（v2.2 兜底档仍可能用到）
}

// 直接执行（被 import 时不跑）
const invokedDirectly = process.argv[1]?.includes("gittok-rejudge-v3") ?? false;
if (invokedDirectly) {
  main().catch((err) => {
    console.error("[rejudge-v3] 致命错误:", err);
    process.exit(1);
  });
}
