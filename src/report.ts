/**
 * LLM invocation, file I/O, and GitHub issue creation helpers.
 */

import fs from "node:fs";
import path from "node:path";
import { type Lang, FOOTER, MSG } from "./i18n.ts";
import { sleep } from "./date.ts";
import { buildTrendingPrompt, TRENDING_PROMPT_MAX_CHARS } from "./prompts-data.ts";
import type { TrendingData } from "./trending.ts";

// ---------------------------------------------------------------------------
// LLM token budget constants
// ---------------------------------------------------------------------------

export const LLM_TOKENS_DEFAULT = 4096;
export const LLM_TOKENS_TRENDING = 6144;
export const LLM_TOKENS_WEB = 8192;
export const LLM_TOKENS_ROLLUP = 8192;
import { type LlmProvider, createProvider } from "./providers/index.ts";

// ---------------------------------------------------------------------------
// LLM worker pool — 多免费源并行分摊（2026-09-04 栗子拍板）
// ---------------------------------------------------------------------------

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 30_000; // 30 s, 60 s, 120 s — 免费模型限流为分钟级窗口（智谱 1305 实测），15s 级退避盖不住
const COOLDOWN_MS = 5 * 60_000; // 429 重试拉满后该源冷却 5 分钟，期间请求分摊给其余源，到期自动回归轮转
/** 单次调用跨 worker 轮转的总时限：全队饱和时逐 worker 退避（30+60+120s+冷却 ≈ 3.5min/worker），
 *  36 worker 轮完要 ~2h，远超 90min 作业窗——round1 groq 429 风暴空转 83min 被杀零落盘之鉴（GT-0906-01）。
 *  到点抛普通错误交上层 per-batch/per-repo 兜底（进 pending-retry 下轮自动补评），轮时长上界锁回 ≤20 分钟。 */
const CALL_DEADLINE_MS = Number(process.env["LLM_CALL_DEADLINE_MS"] ?? 360_000); // 默认 6 min

/** 备源环境变量名：逗号分隔 provider 名单，与主源一起并行分摊负载（CI 配 LLM_FALLBACKS=agnes） */
const FALLBACK_ENV = "LLM_FALLBACKS";

/** 解析备源名单为工厂数组（实例化在 createLlmCaller 内做，失败自动跳过该源）。
 *  支持：
 *  - `源@模型`：覆盖默认模型（同 key 多模型=模型级配额叠加，groq/gemini/siliconflow 等）
 *  - `custom:名字`：泛化 OpenAI 兼容源（{NAME}_API_KEY/BASE_URL/MODEL + SSRF 校验）
 *  - 多 key 轮转：{NAME}_API_KEY 逗号分隔多 key，同名条目按出现序号取号
 *    （Groq/Gemini/HF 多账号=真乘法；OpenRouter 全局池无效）
 */
function parseFallbackFactories(): Array<() => LlmProvider> {
  const sameNameCount = new Map<string, number>();
  return (process.env[FALLBACK_ENV] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      // 拆 `源[@模型]`（custom:名字 也可带 @模型）
      let name = entry;
      let model: string | undefined;
      const at = entry.indexOf("@");
      if (at > 0) {
        name = entry.slice(0, at);
        model = entry.slice(at + 1);
      }
      // 多 key 轮转：{NAME}_API_KEY 逗号分隔，同名第 N 次出现取第 N 个 key
      const envName = (name.startsWith("custom:") ? name.slice(7) : name)
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "_");
      const keys = (process.env[`${envName}_API_KEY`] ?? "")
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      const idx = sameNameCount.get(name) ?? 0;
      sameNameCount.set(name, idx + 1);
      const apiKey = keys.length > 0 ? keys[idx % keys.length] : undefined;
      return () => createProvider(name, model, apiKey);
    });
}

export function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
}

/** 单个 LLM worker：一条串行调用链（免费源各自限流，源内不并发）+ 429 冷却截止时间 */
interface LlmWorker {
  name: string;
  /** 健康统计用标签：同名多 worker（groq@模型A、groq@模型B…）按出现序号加 #N 后缀，日志仍用 name */
  label: string;
  call: (prompt: string, maxTokens: number) => Promise<string>;
  queue: Promise<unknown>;
  cooldownUntil: number;
  stats: WorkerStats;
}

/** 单 worker 健康计数（编队健康统计，2026-09-05）：calls=实际发起的调用次数（含重试） */
interface WorkerStats {
  calls: number;
  ok: number;
  err429: number;
  cooldowns: number;
  otherErrors: number;
  lastError?: string;
}

function makeWorker(provider: LlmProvider): LlmWorker {
  return {
    name: provider.name,
    label: provider.name,
    call: (prompt, maxTokens) => provider.call(prompt, maxTokens),
    queue: Promise.resolve(),
    cooldownUntil: 0,
    stats: { calls: 0, ok: 0, err429: 0, cooldowns: 0, otherErrors: 0 },
  };
}

/**
 * 多源并行 LLM 调用器（2026-09-04 升级：备源从「故障接管」升级为「全程并行分摊」）。
 *
 * 背景：智谱免费档高峰 429 code 1305 为分钟级窗口，单源串行（LLM_CONCURRENCY=1）
 * 是 08-20 停摆的根因之一。现在主源 + LLM_FALLBACKS 备源组成 worker 池：
 * 请求轮转分摊到所有健康 worker（吞吐 ≈ N×单源），每个 worker 内部串行 +
 * 429 指数退避，重试拉满仍 429 → 该源冷却 5 分钟（期间负载自动落到其余源，
 * 到期回归轮转）；非 429 错误直接抛给调用方（由 safeLlm/scoreBatched 降级重试）。
 */
export function createLlmCaller(
  primary: LlmProvider,
  fallbackFactories: Array<() => LlmProvider>,
  opts?: { retryBaseMs?: number; maxRetries?: number; cooldownMs?: number; callDeadlineMs?: number },
): LlmCallerWithHealth {
  const retryBaseMs = opts?.retryBaseMs ?? RETRY_BASE_MS;
  const maxRetries = opts?.maxRetries ?? MAX_RETRIES;
  const cooldownMs = opts?.cooldownMs ?? COOLDOWN_MS;
  const callDeadlineMs = opts?.callDeadlineMs ?? CALL_DEADLINE_MS;

  // 主源立即入池；备源实例化失败（如 key 缺失）跳过该源，不影响其余 worker
  const workers: LlmWorker[] = [];
  const nameSeq = new Map<string, number>();
  const pushWorker = (provider: LlmProvider): void => {
    try {
      const w = makeWorker(provider);
      const seq = (nameSeq.get(provider.name) ?? 0) + 1;
      nameSeq.set(provider.name, seq);
      w.label = seq === 1 ? provider.name : `${provider.name}#${seq}`;
      workers.push(w);
    } catch (err) {
      console.error(`[llm] worker init failed, skipping: ${err}`);
    }
  };
  try {
    pushWorker(primary);
  } catch (err) {
    console.error(`[llm] primary init failed: ${err}`);
  }
  for (const factory of fallbackFactories) {
    try {
      pushWorker(factory());
    } catch (err) {
      console.error(`[llm] fallback init failed, skipping: ${err}`);
    }
  }

  if (workers.length === 0) throw new Error("no usable LLM provider");

  let rrCursor = 0; // 轮转游标：健康源之间 round-robin 分摊

  /** 选 worker：优先健康源轮转；全冷却时选冷却最早结束的（乐观重试，冷却只是调度偏好非硬墙） */
  const pickWorker = (): LlmWorker => {
    for (let i = 0; i < workers.length; i++) {
      const w = workers[(rrCursor + i) % workers.length]!;
      if (w.cooldownUntil <= Date.now()) {
        rrCursor = (rrCursor + i + 1) % workers.length;
        return w;
      }
    }
    let best = workers[0]!;
    for (const w of workers) if (w.cooldownUntil < best.cooldownUntil) best = w;
    return best;
  };

  /** 单 worker 内执行一次调用：源内指数退避重试，拉满 429 → 冷却并抛出。
   *  每次实际发起的调用都计入 stats（含重试），供编队健康统计。 */
  const runOnWorker = async (w: LlmWorker, prompt: string, maxTokens: number): Promise<string> => {
    for (let attempt = 0; ; attempt++) {
      w.stats.calls++;
      try {
        const result = await w.call(prompt, maxTokens);
        w.stats.ok++;
        return result;
      } catch (err) {
        w.stats.lastError = String(err).slice(0, 200);
        if (attempt < maxRetries && is429(err)) {
          w.stats.err429++;
          const wait = retryBaseMs * 2 ** attempt;
          console.error(`[llm] ${w.name} 429 — retry ${attempt + 1}/${maxRetries} in ${wait / 1000}s...`);
          await sleep(wait);
          continue;
        }
        if (is429(err)) {
          w.stats.err429++;
          w.stats.cooldowns++;
          w.cooldownUntil = Date.now() + cooldownMs;
          console.error(
            `[llm] ${w.name} 429 exhausted — cooling down ${cooldownMs / 1000}s, load shifts to other providers`,
          );
        } else {
          w.stats.otherErrors++;
        }
        throw err;
      }
    }
  };

  const caller = async function callLlm(prompt: string, maxTokens = LLM_TOKENS_DEFAULT): Promise<string> {
    let lastErr: unknown;
    const tried = new Set<LlmWorker>();
    const start = Date.now();
    for (;;) {
      if (Date.now() - start > callDeadlineMs) {
        // 总时限到：不再乐观重试（全队饱和时换 worker 也只会继续 429）。
        // 抛普通错误（非 429）→ 直接上抛，交上层 per-batch/per-repo 兜底
        throw new Error(
          `llm call deadline exceeded after ${callDeadlineMs}ms across ${tried.size} worker(s)`,
        );
      }
      const w = pickWorker();
      if (tried.has(w)) throw lastErr; // 所有 worker 都试过仍 429 → 抛给上层（safeLlm/scoreBatched 兜底）
      tried.add(w);
      const task = w.queue.then(() => runOnWorker(w, prompt, maxTokens));
      // 链上吞掉 rejection 让串行链不断（错误由返回的 task 交给调用方）
      w.queue = task.then(
        () => undefined,
        () => undefined,
      );
      try {
        return await task;
      } catch (err) {
        lastErr = err;
        if (!is429(err)) throw err; // 非 429 不换源，直接抛
        // 429：该 worker 已被 runOnWorker 冷却，下一轮换其余 worker
      }
    }
  } as LlmCallerWithHealth;

  caller.fleetHealth = (): FleetHealthEntry[] =>
    workers.map((w) => ({
      name: w.label,
      calls: w.stats.calls,
      ok: w.stats.ok,
      err429: w.stats.err429,
      cooldowns: w.stats.cooldowns,
      otherErrors: w.stats.otherErrors,
      cooling: w.cooldownUntil > Date.now(),
      ...(w.stats.lastError ? { lastError: w.stats.lastError } : {}),
    }));
  return caller;
}

// ---------------------------------------------------------------------------
// 编队健康统计（2026-09-05 拆 job 刀配套）：每 worker 成功/429/冷却计数
// ---------------------------------------------------------------------------

/** 单 worker 健康快照行 */
export interface FleetHealthEntry {
  /** worker 标签（同名多 worker 带 #N 序号） */
  name: string;
  calls: number;
  ok: number;
  err429: number;
  cooldowns: number;
  otherErrors: number;
  /** 统计时刻是否处于 429 冷却中 */
  cooling: boolean;
  lastError?: string;
}

/** fleet-health.json 单 job 条目（digest/feed 两进程先后写同一文件，按 job upsert） */
export interface FleetHealthFileEntry {
  job: string;
  at: string;
  workers: FleetHealthEntry[];
}

/** createLlmCaller 返回的调用函数 + 健康快照钩子 */
type LlmCallerWithHealth = ((prompt: string, maxTokens?: number) => Promise<string>) & {
  fleetHealth?: () => FleetHealthEntry[];
};

const callLlmImpl = createLlmCaller(createProvider(), parseFallbackFactories()) as LlmCallerWithHealth;

/** digest 全管道统一 LLM 入口（主源 + LLM_FALLBACKS 并行分摊 + 429 冷却轮转） */
export async function callLlm(prompt: string, maxTokens = LLM_TOKENS_DEFAULT): Promise<string> {
  return callLlmImpl(prompt, maxTokens);
}

/**
 * trending 日报专用调用：**体积预算 + 缩预算重试阶梯**（GA5，2026-09-22）。
 *
 * 为什么不能只用上层那个"吞错误返回占位符"的包装：trending 的失败恰好是可诊断、
 * 可退让的——一手证据在 `data/fleet-health.json` 的 digest 条目里：
 *   `zhipu#5  Error: 400 Prompt exceeds max length`
 *   `groq#9   Error: 413 Request too large for model qwen/qwen3.8-27b`
 * 实测（`scripts/ga5-trending-prompt-probe.ts`）主题搜索结果曾膨胀到 5930 个仓库、
 * prompt 达 1,184,043 字符——任何免费档都吃不下，于是必然回落成占位符。
 *
 * 少列一些仓库仍能产出合格日报，回落成占位符才是纯损失。所以这里按 1 → 1/2 → 1/4
 * 的预算依次重试，每次失败都把错误原文打进日志（Actions log 可查），全败才回落占位符。
 * 放在 report.ts 而不是 index.ts：这样它可被验证脚本直接复用，不必复制逻辑。
 */
export async function summarizeTrending(data: TrendingData, dateStr: string, lang: Lang): Promise<string> {
  const budgets = [
    TRENDING_PROMPT_MAX_CHARS,
    Math.floor(TRENDING_PROMPT_MAX_CHARS / 2),
    Math.floor(TRENDING_PROMPT_MAX_CHARS / 4),
  ];
  let lastErr = "";
  for (const budget of budgets) {
    const prompt = buildTrendingPrompt(data, dateStr, lang, budget);
    console.log(`  [trending] Calling LLM (budget=${budget}, actual chars=${prompt.length})...`);
    try {
      const out = await callLlm(prompt, LLM_TOKENS_TRENDING);
      if (out.trim()) return out;
      lastErr = "empty response";
      console.error(`  [trending] Empty response at budget=${budget}`);
    } catch (err) {
      lastErr = String(err);
      console.error(`  [trending] LLM call failed at budget=${budget}: ${err}`);
    }
  }
  console.error(`  [trending] All budgets exhausted; falling back to placeholder. last error: ${lastErr}`);
  return MSG.trendingFailed[lang];
}

/** 当前进程 LLM 编队健康快照（未跑过任何调用时返回空数组） */
export function fleetHealthSummary(): FleetHealthEntry[] {
  return callLlmImpl.fleetHealth?.() ?? [];
}

/** 纯函数：按 job 名 upsert 条目（digest 与 feed 两 job 先后写同一文件互不覆盖） */
export function upsertFleetHealthEntry(
  list: FleetHealthFileEntry[],
  entry: FleetHealthFileEntry,
): FleetHealthFileEntry[] {
  return [...list.filter((e) => e.job !== entry.job), entry];
}

/**
 * 落盘本进程编队健康到 data/fleet-health.json（按 job upsert 合并已有条目），
 * 并打印终端摘要（Actions log 可读）。文件随 data/ 入仓，git 历史即健康趋势。
 */
export function recordFleetHealth(job: string): void {
  try {
    const entry: FleetHealthFileEntry = { job, at: new Date().toISOString(), workers: fleetHealthSummary() };
    const filepath = path.join("data", "fleet-health.json");
    let list: FleetHealthFileEntry[] = [];
    if (fs.existsSync(filepath)) {
      try {
        list = JSON.parse(fs.readFileSync(filepath, "utf-8")) as FleetHealthFileEntry[];
      } catch {
        list = []; // 文件损坏不阻塞主流程，重写
      }
    }
    if (!Array.isArray(list)) list = [];
    fs.mkdirSync("data", { recursive: true });
    fs.writeFileSync(filepath, JSON.stringify(upsertFleetHealthEntry(list, entry), null, 2), "utf-8");
    console.log(`[fleet-health] ${job} 编队健康（已写入 ${filepath}）:`);
    for (const w of entry.workers) {
      const okRate = w.calls > 0 ? `${Math.round((w.ok / w.calls) * 100)}%` : "-";
      console.log(
        `  ${w.name}: calls=${w.calls} ok=${w.ok}(${okRate}) 429=${w.err429} cooldown=${w.cooldowns} otherErr=${w.otherErrors}${w.cooling ? " [冷却中]" : ""}${w.lastError ? ` last=${w.lastError.slice(0, 80)}` : ""}`,
      );
    }
  } catch (err) {
    console.error(`[fleet-health] record failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// File output
// ---------------------------------------------------------------------------

export function saveFile(content: string, ...segments: string[]): string {
  const filepath = path.join("digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

export function autoGenFooter(lang: Lang = "zh"): string {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) return "";
  return `\n\n---\n*${FOOTER.autoGen[lang]} [GitTok](https://github.com/${digestRepo})${lang === "en" ? "." : " 自动生成。"}*`;
}
