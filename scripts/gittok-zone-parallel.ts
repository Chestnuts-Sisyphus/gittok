/**
 * 存量卡内容分区**并行回填**驱动（2026-09-14，G2 主线工具）。
 *
 * 与 `gittok-zone-backfill.ts` 的分工：那个是**串行**单通道版（每批 ~69s，2,428 张 ≈ 2.8 小时）；
 * 本脚本在它之上加**多通道并行**（同一份键池拆成 N 条独立通道，各跑各的批次），
 * 目标是把「存量卡补齐」从「一晚上」压到「一小时级」。
 *
 * 三条纪律（沿袭）：
 *  1. **不冒充来源**：模型真判写 `zoneSource:"model"`；`--derived` 兜底档由存量 category
 *     确定性映射回填并写 `zoneSource:"derived"`（实测两者一致率仅 65%，不等价，必须可区分）。
 *  2. **判定失败不写**（宁缺毋滥）：解析不出/zone 非法 → 该卡保持原样，留给下一轮或 derived。
 *  3. **原子 + 可续跑**：做完的卡记在 data/zone-backfill-state.json，重启自动跳过；
 *     feed.json 每批 merge 一次（临时文件 + rename），中断不丢已完成的。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-zone-parallel.ts                        # 并行回填所有缺 zone 的卡
 *   npx tsx scripts/gittok-zone-parallel.ts --workers=3 --batch=20
 *   npx tsx scripts/gittok-zone-parallel.ts --derived-only         # 不调模型，直接 derived 兜底
 *   npx tsx scripts/gittok-zone-parallel.ts --dry-run              # 只统计
 */

import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { buildPlan } from "./gittok-fullbuild-lib.ts";
import { ScheduledLlmExecutor } from "../src/feed/executor.ts";
import { domainKeyOf } from "../src/feed/prompts.ts";

const FEED = path.join("data", "feed.json");
const STATE = path.join("data", "zone-backfill-state.json");

/** 判定链（与 src/feed/prompts.ts 生产措辞一致；不另造判据） */
const ZONE_RULES =
  "从 [AI, 资源, 工具, 创意] 中选 1 个。判定：人拿它是「学/看」（教程/论文/文档/数据集）→资源；" +
  "它靠智能干活（模型/推理/Agent/框架/AI应用）→AI；人拿它是「玩/创作」（游戏/脑洞/绘画/音乐/剪辑）→创意；" +
  "人拿它「干活」（效率/开发/数据库/自托管/skill）→工具。只选 1 个。";

const ZONES = ["AI", "资源", "工具", "创意"];

/** 存量 category → zone（旧词表→新四区；`derived` 兜底档用，实测与模型一致率 65%） */
const CATEGORY_TO_ZONE: Record<string, string> = {
  ai: "AI",
  learning: "资源",
  tool: "工具",
  fun: "创意",
};

/**
 * aiDims → funScore 兜底（`derived` 档用；诚实标注为规则映射非模型判定）。
 * 口径：游戏/非AI-好玩/创意工具 = 高乐趣信号；正经工程类 = 低。
 */
const FUN_ECHO_DIMS: Array<[RegExp, number]> = [
  [/^游戏$|非AI-游戏|游戏开发/, 0.7],
  [/非AI-好玩/, 0.65],
  [/创意工具/, 0.6],
  [/可视化|绘画|音乐|动漫/, 0.45],
  [/非AI-实用|效率工具|开发者工具|安全工具/, 0.1],
];

interface Card {
  repo: string;
  owner?: string;
  name?: string;
  desc?: string;
  stars?: number;
  language?: string;
  topics?: string[];
  summaryCn?: string;
  reasonCn?: string;
  aiDims?: string[];
  aiDim?: string;
  tags?: string[];
  category?: string;
  zone?: string;
  zoneSource?: "model" | "derived";
  funScore?: number;
  funScoreSource?: "model" | "derived";
  domainTags?: string[];
  domainKey?: string;
  [k: string]: unknown;
}

interface Verdict {
  repo: string;
  zone: string;
  fun_score?: number;
  tags?: string[];
}

/** 原子落盘（临时文件 + rename）——避免中断/并发把主文件写成半截 */
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

/** 容错解析（去代码块 + 摘数组；与生产同款思路） */
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
    return arr.filter((v) => v && typeof v.repo === "string" && ZONES.includes(v.zone));
  } catch {
    return [];
  }
}

export function buildPrompt(cards: Card[]): string {
  const items = cards
    .map((c, i) => {
      const gist = (c.summaryCn ?? c.reasonCn ?? c.desc ?? "").replace(/\s+/g, " ").slice(0, 160);
      return `${i + 1}. ${c.repo}｜${c.language ?? ""}｜${c.stars ?? 0}★｜${gist}`;
    })
    .join("\n");
  return (
    `给下面 ${cards.length} 个 GitHub 项目各判一个内容分区，并给 0-1 的「乐趣强度」和 3-6 个领域词。\n` +
    `分区判定链：${ZONE_RULES}\n` +
    `乐趣强度 fun_score：0=纯工具、1=极好玩（游戏/脑洞/创意玩具）。只看「想点开玩的冲动强度」，` +
    `与实用价值/质量/AI 无关。\n` +
    `领域词 tags：面向人可以看懂的领域词（如 推理引擎/AI Agent/绘画工具），3-6 个，不要泛词。\n\n` +
    `项目列表：\n${items}\n\n` +
    `只输出 JSON 数组，不要任何其他文字：\n` +
    `[{"repo":"owner/repo","zone":"AI","fun_score":0.2,"tags":["词1","词2","词3"]}]`
  );
}

/** 把一批判定写进卡（返回命中数） */
function applyVerdicts(cards: Card[], byRepo: Map<string, Card>, verdicts: Verdict[]): number {
  let n = 0;
  for (const v of verdicts) {
    const card = byRepo.get(v.repo);
    if (!card) continue;
    card.zone = v.zone;
    card.zoneSource = "model";
    if (typeof v.fun_score === "number" && Number.isFinite(v.fun_score)) {
      card.funScore = Math.max(0, Math.min(1, v.fun_score));
      card.funScoreSource = "model";
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

function funScoreFromDims(card: Card): number | undefined {
  const dims = card.aiDims ?? (card.aiDim ? [card.aiDim] : []);
  if (dims.length === 0) return undefined;
  for (const [re, score] of FUN_ECHO_DIMS) {
    if (dims.some((d) => re.test(d))) return score;
  }
  return 0.2; // 有气质标签但非乐趣族 → 低乐趣（不是 0：0 留给「模型明确判为纯工具」）
}

/** domainTags 兜底：用 aiDims 里非气质词 + language 组 3 个（`derived` 档） */
function domainTagsFrom(card: Card): string[] | undefined {
  const out: string[] = [];
  for (const d of card.aiDims ?? []) {
    if (["非AI-实用", "非AI-好玩", "非AI-工具", "其他"].includes(d)) continue;
    if (!out.includes(d)) out.push(d);
    if (out.length >= 3) break;
  }
  if (out.length < 3 && card.language && !out.includes(card.language)) out.push(card.language);
  return out.length >= 3 ? out.slice(0, 6) : undefined;
}

interface BackfillState {
  updatedAt: string;
  done: Record<string, "model" | "derived" | "failed">;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const numArg = (name: string, dflt: number): number => {
    const a = argv.find((x) => x.startsWith(`--${name}=`));
    if (a) return Number(a.split("=")[1]);
    // CI 壳用环境变量传参（ZONE_WORKERS / ZONE_BATCH / ZONE_LIMIT）
    const envName = `ZONE_${name.toUpperCase().replace(/-/g, "_")}`;
    const raw = process.env[envName];
    if (raw === undefined || raw === "") return dflt;
    const n = Number(raw);
    return Number.isFinite(n) ? n : dflt;
  };
  const workers = Math.max(1, numArg("workers", 3));
  const batchSize = Math.max(1, numArg("batch", 20));
  const derivedOnly = argv.includes("--derived-only");
  const dryRun = argv.includes("--dry-run");
  const limit = numArg("limit", Number.POSITIVE_INFINITY);
  // derived 兜底默认开；但**带 --limit 的试跑不许触发全库兜底**（否则试跑一次就把全库标成 derived）
  const deriveOk = argv.includes("--derived") || (!Number.isFinite(limit) && !argv.includes("--no-derive"));

  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const byRepo = new Map(cards.map((c) => [c.repo, c] as const));
  const state = loadJson<BackfillState>(STATE, { updatedAt: "", done: {} });
  // 诊断（CI 排查用：state 是否存在、有多少条「已模型真判」凭证）
  console.log(
    `[zone-par] state ${STATE} 存在=${fs.existsSync(STATE)}｜已判凭证 ${
      Object.keys(state.done ?? {}).length
    } 条｜无 zone ${cards.filter((c) => !c.zone).length} 张`,
  );

  // 待办：缺 zone 的优先；`--upgrade-derived` 时把 derived 兜底的卡也排进队（模型质量更高，
  // 实测与 derived 一致率仅 67.8%——derived 只是「先让站点自洽」，不该是终点）。
  const upgradeDerived =
    argv.includes("--upgrade-derived") || (process.env["ZONE_UPGRADE"] ?? "").toLowerCase() === "true";
  const todo = cards
    .filter((c) => {
      if (state.done[c.repo] === "model") return false;
      if (!c.zone) return true;
      return upgradeDerived && c.zoneSource === "derived";
    })
    .slice(0, Number.isFinite(limit) ? limit : undefined);
  console.log(
    `[zone-par] 总卡 ${cards.length}｜有 zone ${cards.filter((c) => c.zone).length}｜` +
      `model ${cards.filter((c) => c.zoneSource === "model").length}｜` +
      `待办 ${todo.length}${upgradeDerived ? "（含 derived 升级）" : ""}｜并行 ${workers} 通道 × 每批 ${batchSize}`,
  );
  if (dryRun || todo.length === 0) return;

  // pending 标记：本轮的待办集（用于统计与续跑）
  const pending = new Set(todo.map((c) => c.repo));
  let doneModel = 0;
  let failed = 0;

  const persist = (): void => {
    state.updatedAt = new Date().toISOString();
    atomicWrite(FEED, JSON.stringify(cards, null, 2));
  };

  const finishDerived = (): void => {
    let d = 0;
    for (const c of cards) {
      if (c.zone) continue;
      const z = CATEGORY_TO_ZONE[c.category ?? ""];
      if (!z) continue;
      c.zone = z;
      c.zoneSource = "derived";
      if (typeof c.funScore !== "number") {
        const f = funScoreFromDims(c);
        if (f !== undefined) {
          c.funScore = f;
          c.funScoreSource = "derived";
        }
      }
      if (!c.domainTags || c.domainTags.length === 0) {
        const t = domainTagsFrom(c);
        if (t) {
          c.domainTags = t;
          const dk = domainKeyOf(z, t);
          if (dk) c.domainKey = dk;
        }
      }
      // 注意：**不写 state.done**——state 的语义是「已模型真判」的凭证（断点续跑的依据）。
      // derived 只是兜底，写进去会让下一轮 upgrade 误判「这卡已完成」而永远不再升级
      //（实测：CI 首跑 derived 兜底后 state 满员 → 升级轮 --upgrade-derived 变成空转）。
      d++;
    }
    return d;
  };

  if (derivedOnly) {
    const d = finishDerived();
    persist();
    console.log(`[zone-par] derived 兜底回填 ${d} 张（zoneSource="derived"，不冒充模型判定）`);
    return;
  }

  // 执行层：与生产同构（免费矩阵优先）
  const { tail, env } = buildPlan();
  const merged: NodeJS.ProcessEnv = { ...process.env, ...env };
  for (const t of tail) if (t.paramsEnv) merged[t.paramsEnv] = JSON.stringify(t.params);
  for (const [k, v] of Object.entries(merged)) if (v !== undefined) process.env[k] = v;

  const laneSpecs = tail.map((t) => {
    const first = t.entry.indexOf(":");
    const last = t.entry.lastIndexOf(":");
    const tailPart = t.entry.slice(last + 1);
    const provider = t.entry.slice(0, first);
    const model = t.entry.slice(first + 1, /^\d+$/.test(tailPart) ? last : undefined);
    return { provider, model, keys: t.keys, extraParams: t.params, key: `${provider}:${model}` };
  });
  const executor = new ScheduledLlmExecutor(laneSpecs);

  /**
   * 通道预筛（2026-09-14 实测教训）：矩阵里常驻**死通道**（modelscope 本机 191ms 即抛
   * `Cannot read properties of null`、openrouter 间歇抛 undefined）——不筛掉就会被它们
   * 反复吃批次（首跑 1,420/2,308 卡就这样被浪费）。发一次极小请求，只留能回的通道。
   */
  const probeLane = async (key: string): Promise<boolean> => {
    const c = executor.callerFor(key);
    if (!c) return false;
    try {
      const out = await c('只回一行 JSON：{"ok":true}', 64);
      return out.trim().length > 0;
    } catch {
      return false;
    }
  };
  const alive: typeof laneSpecs = [];
  for (const lane of laneSpecs) {
    const ok = await probeLane(lane.key);
    console.log(`  [zone-par] 通道预筛 ${ok ? "✓" : "✗"} ${lane.key}`);
    if (ok) alive.push(lane);
  }
  if (alive.length === 0) {
    console.error("[zone-par] 无可用通道，退出（不写盘）");
    process.exit(1);
  }

  // 批次队列**按通道分片**（lane-affine：每条通道只吃自己那一份，互不抢）——
  // 首跑教训：共享队列 + 归还机制会让所有 worker 扑向唯一健康通道，把它打成 429 熔断
  //（`全池 1 账号节流 → 熔断 60s`），有效产能反而低于串行。
  const perLane: Card[][][] = alive.map(() => []);
  for (let i = 0; i < todo.length; i += batchSize) {
    perLane[(i / batchSize) % alive.length]!.push(todo.slice(i, i + batchSize));
  }

  const runWorker = async (laneIdx: number): Promise<void> => {
    const lane = alive[laneIdx]!;
    const queue = perLane[laneIdx]!;
    let idleRounds = 0;
    for (;;) {
      const myBatch = queue.shift();
      if (!myBatch) return;
      const caller = executor.callerFor(lane.key);
      if (!caller) {
        idleRounds++;
        if (idleRounds > 30) return; // 本通道长时间熔断 → 退出，剩余批次交给下一步兜底
        await new Promise((r) => setTimeout(r, 20_000));
        queue.unshift(myBatch); // 原样放回队首（不跨通道搬运）
        continue;
      }
      idleRounds = 0;
      let n = 0;
      try {
        const raw = await caller(buildPrompt(myBatch), 4096);
        const verdicts = parseVerdicts(raw);
        n = applyVerdicts(cards, byRepo, verdicts);
      } catch (err) {
        console.warn(`  [zone-par] ${lane.key} 批失败: ${String(err).slice(0, 90)}`);
      }
      if (n > 0) {
        doneModel += n;
        for (const c of myBatch) {
          if (c.zone) {
            pending.delete(c.repo);
            state.done[c.repo] = "model";
          }
        }
        persist();
        if (doneModel % (batchSize * 5) < batchSize) {
          console.log(`  [zone-par] 模型判定累计 ${doneModel}｜失败 ${failed}｜剩余待办 ${pending.size}`);
        }
      } else {
        failed += myBatch.length;
      }
    }
  };

  const t0 = Date.now();
  // 并行度 = min(worker 上限, 存活通道数)：一条通道一个 worker（lane-affine）
  const lanes = Math.min(workers, alive.length);
  try {
    await Promise.all(Array.from({ length: lanes }, (_, i) => runWorker(i)));
    const mins = ((Date.now() - t0) / 60_000).toFixed(1);
    console.log(
      `[zone-par] 模型判定 ${doneModel} 张，失败/跳过 ${failed} 张，用时 ${mins} 分钟` +
        `（${(doneModel / Math.max(0.01, (Date.now() - t0) / 60_000)).toFixed(1)} 张/分钟）`,
    );
    // 剩余缺口用 derived 兜底（诚实标注），保证站点数据先自洽
    const d = deriveOk ? finishDerived() : 0;
    persist();
    const withZone = cards.filter((c) => c.zone).length;
    console.log(
      `[zone-par] derived 兜底 ${d} 张 → 覆盖率 ${withZone}/${cards.length} ` +
        `(${((withZone / cards.length) * 100).toFixed(1)}%)`,
    );
  } catch (e) {
    console.error(`[zone-par] 异常退出: ${String(e).slice(0, 200)}`);
    persist();
    process.exit(1);
  }
}

void main();
