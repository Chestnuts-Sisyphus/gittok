/**
 * GitTok 免费矩阵组装库（2026-09-14）：密钥解析 + 矩阵规划。
 * 被启动器（gittok-fullbuild.ts）与通道探针（gittok-lane-probe.ts）共用。
 *
 * 纪律：密钥只从 D:/AI/KEY/ 运行时读取；本文件零凭据字面量；对外只暴露指纹（前 5 字符）。
 */

import fs from "node:fs";
import path from "node:path";
import { loadLaneHealth, isLaneRetired } from "../src/feed/lane-health.ts";

export const KEY_DIR = process.env["KEY_DIR"] ?? "D:/AI/KEY";
export const FREE_FLEET = path.join(KEY_DIR, "FREE-FLEET.txt");
export const PAID_LLM = path.join(KEY_DIR, "PAID-LLM.txt");
export const GITHUB_TOKENS = path.join(KEY_DIR, "GITHUB-TOKENS.txt");

/** 只显前 5 字符的密钥指纹（KEY 协议）。 */
export const fp = (k: string) => `${k.slice(0, 5)}…(${k.length}字符)`;

export interface LanePlan {
  /** 矩阵条目 `provider:model[:quota]` */
  entry: string;
  /** 该通道的附加请求体参数（按源参数纪律） */
  params: Record<string, unknown>;
  /** 键级参数环境变量名（SCHED_PARAMS_<SLUG>）；空串=参数走 provider 内置 */
  paramsEnv: string;
  /** 该通道的 key 列表（>1 = 多账号轮转；executor 用它建多实例池） */
  keys?: string[];
  note: string;
  keyFp: string;
}

export interface PlanResult {
  tail: LanePlan[];
  head: LanePlan[];
  env: NodeJS.ProcessEnv;
  missing: string[];
}

function readKeyFile(p: string): string {
  try {
    return fs.readFileSync(p, "utf-8");
  } catch (err) {
    console.warn(`[matrix] 读不到 ${p}（${err}）`);
    return "";
  }
}

/**
 * 密钥行过滤：密钥文件里「服务商名」标签行也是裸文本行，必须按格式特征剔除，
 * 否则会把标签当 key 注入（实测踩坑：智谱段第一行是「GitTok免费模型」标签）。
 */
export function looksLikeKey(raw: string): boolean {
  const k = raw.trim();
  if (k.length < 16 || /\s/.test(k)) return false;
  return (
    /^[0-9a-f]{32}\.[A-Za-z0-9]{10,32}$/.test(k) || // 智谱 id.secret
    /^sk-[A-Za-z0-9._-]+$/.test(k) || // sk-/sk-or-v1-/sk-ws-（百炼 workspace 键含点）
    /^user_[A-Za-z0-9._-]+$/.test(k) || // Command Code GOAT 订阅键
    /^ms-[A-Za-z0-9._-]+$/.test(k) ||
    /^gsk_[A-Za-z0-9._-]+$/.test(k) ||
    /^hf_[A-Za-z0-9._-]+$/.test(k) ||
    /^csk-[A-Za-z0-9._-]+$/.test(k) ||
    /^AQ\.[A-Za-z0-9._-]+$/.test(k)
  );
}

/** 密钥文件解析：注释行 `# [...【名字】...]` 分节，节内裸 key 行；返回每节的 key 列表。 */
export function parseKeyFile(text: string): Map<string, string[]> {
  const sections = new Map<string, string[]>();
  let current = "";
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("#")) {
      const m = t.match(/【([^】]+)】/);
      if (m) {
        current = m[1]!;
        if (!sections.has(current)) sections.set(current, []);
      }
      continue;
    }
    if (!looksLikeKey(t)) continue; // 服务商名标签行等 → 剔除
    if (current) sections.get(current)!.push(t);
  }
  return sections;
}

/** 收集所有匹配节（大小写不敏感）的 key——智谱双账号要合并两节。 */
export function collectKeys(sections: Map<string, string[]>, ...needles: string[]): string[] {
  const out: string[] = [];
  for (const [name, keys] of sections) {
    const lower = name.toLowerCase();
    if (needles.some((n) => lower.includes(n.toLowerCase()))) out.push(...keys);
  }
  return out;
}

function envInt(name: string, fallback: number, env: NodeJS.ProcessEnv): number {
  const raw = env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

/** 键级参数环境变量名（与 executor.matrixEnvKey 同规则，避免循环依赖这里复写一份） */
export function matrixEnvKey(provider: string, model: string): string {
  const slug = `${provider}_${model}`.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  return `SCHED_PARAMS_${slug}`;
}

/**
 * 组装矩阵：按**实际拿到的 key** 决定哪些源进矩阵（缺 key 的源不进 → 路由自然跳过，不一路 401）。
 * quotaTokens 默认按 B 会话实测日额折算，可用 SCHED_QUOTA_* 覆盖。
 *
 * key 来源优先序（本地 = KEY 文件；CI/线上 = Secrets 注入的环境变量）：
 *  1. 环境变量（GH Actions Secrets 直灌，如 ZHIPU_API_KEY / MODELSCOPE_API_KEY）——
 *     存在则直接用，**不读本地文件**（CI 机器上没有 D:/AI/KEY）。
 *  2. 本地 KEY 文件（D:/AI/KEY/FREE-FLEET.txt 等）——开发机默认路径。
 */
export function buildPlan(env: NodeJS.ProcessEnv = process.env): PlanResult {
  const fleet = parseKeyFile(readKeyFile(FREE_FLEET));
  const paid = parseKeyFile(readKeyFile(PAID_LLM));
  const outEnv: NodeJS.ProcessEnv = {};
  const tail: LanePlan[] = [];
  const head: LanePlan[] = [];
  const missing: string[] = [];

  /** 环境变量优先（逗号分隔多 key），缺省回退 KEY 文件解析结果。 */
  const resolveKeys = (envName: string, fileKeys: string[]): string[] => {
    const fromEnv = (env[envName] ?? "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    return fromEnv.length > 0 ? fromEnv : fileKeys;
  };

  // ① 智谱 GLM-4.7-Flash（免费主力，双账号分摊 429；thinking disabled 走 provider 内置）
  const zhipuKeys = resolveKeys("ZHIPU_API_KEY", collectKeys(fleet, "智谱 GLM", "BigModel"));
  if (zhipuKeys.length > 0) {
    outEnv["ZHIPU_API_KEY"] = zhipuKeys.join(",");
    tail.push({
      entry: `zhipu:glm-4.7-flash:${envInt("SCHED_QUOTA_ZHIPU", 1_000_000, env)}`,
      params: {},
      paramsEnv: "",
      keys: zhipuKeys,
      note: `海选/长尾；${zhipuKeys.length} 账号轮转分摊 429（thinking disabled 走 provider 内置）`,
      keyFp: fp(zhipuKeys[0]!),
    });
  } else {
    missing.push("智谱 GLM key（ZHIPU_API_KEY 或 FREE-FLEET.txt）");
  }

  // ② 魔搭 DeepSeek-V4-Flash-0731（免费档最能打；250 次/日；须 enable_thinking:false）
  const msKeys = resolveKeys("MODELSCOPE_API_KEY", collectKeys(fleet, "魔搭", "ModelScope"));
  if (msKeys.length > 0) {
    outEnv["MODELSCOPE_API_KEY"] = msKeys.join(",");
    outEnv["MODELSCOPE_BASE_URL"] = "https://api-inference.modelscope.cn/v1";
    outEnv["MODELSCOPE_MODEL"] = "deepseek-ai/DeepSeek-V4-Flash-0731";
    outEnv["MODELSCOPE_EXTRA_PARAMS"] = '{"enable_thinking":false}';
    const model = "deepseek-ai/DeepSeek-V4-Flash-0731";
    tail.push({
      entry: `custom:modelscope:${model}:${envInt("SCHED_QUOTA_MODELSCOPE", 250_000, env)}`,
      params: { enable_thinking: false },
      paramsEnv: matrixEnvKey("custom:modelscope", model),
      keys: msKeys,
      note: "精评/千人千面主力；节流 stub → 执行层空响应重试+熔断",
      keyFp: fp(msKeys[0]!),
    });
  } else {
    missing.push("魔搭 ModelScope key（MODELSCOPE_API_KEY 或 FREE-FLEET.txt）");
  }

  // ③ OpenRouter nemotron-3-ultra-550b:free（免费次选；50/日，充$10→1000；
  //    推理型须 reasoning disabled + max_tokens 8192，否则思考吃爆预算 → JSON 截断）
  const orKeys = resolveKeys("OPENROUTER_API_KEY", collectKeys(fleet, "OpenRouter"));
  if (orKeys.length > 0) {
    outEnv["OPENROUTER_API_KEY"] = orKeys.join(",");
    const model = "nvidia/nemotron-3-ultra-550b-a55b:free";
    tail.push({
      entry: `openrouter:${model}:${envInt("SCHED_QUOTA_OPENROUTER", 50_000, env)}`,
      params: { reasoning: { enabled: false }, max_tokens: 8192 },
      paramsEnv: matrixEnvKey("openrouter", model),
      keys: orKeys,
      note: "免费次选（50/日；充$10→1000/日 待栗子支付）",
      keyFp: fp(orKeys[0]!),
    });
  } else {
    missing.push("OpenRouter key（OPENROUTER_API_KEY 或 FREE-FLEET.txt）");
  }

  // ④ 付费兜底压舱石：百炼 qwen3.7-flash（Batch 半价 ¥22.5 全站）——作编队主源用，
  //    不进矩阵（quota=0 语义为不限额，不该给付费源挂 unlimited）。
  const wsKeys = resolveKeys("BAILIAN_API_KEY", collectKeys(paid, "百炼", "bailian", "DashScope"));
  if (wsKeys.length > 0) {
    outEnv["BAILIAN_API_KEY"] = wsKeys[0]!;
  } else {
    missing.push("百炼 qwen3.7-flash key（BAILIAN_API_KEY 或 PAID-LLM.txt）——付费兜底通道");
  }

  // ⑤ 编队其它通道（env 优先；本地从 FREE-FLEET 补）
  const agnesKeys = resolveKeys("AGNES_API_KEY", collectKeys(fleet, "AGNES"));
  if (agnesKeys.length > 0) outEnv["AGNES_API_KEY"] = agnesKeys[0]!;
  const hfKeys = resolveKeys("HF_TOKEN", collectKeys(fleet, "Hugging Face"));
  if (hfKeys.length > 0) outEnv["HF_TOKEN"] = hfKeys[0]!;

  // ⑥ GitHub PAT 池（README 拉取 + search + stars 轮转共用 core 配额）。
  //    实测（2026-09-14）：KEY 文件里 5 个 token **同属一个账号**（login 相同）——
  //    共享同一个 5000/h 桶，多 token ≠ 多额度；真正的让位手段是 REFRESH_BATCH。
  //    另实测：.env 的 GITHUB_TOKEN 已失效（/user 401）→ 必须用 KEY 文件的 token 覆盖主位，
  //    否则主请求位（nextApiToken 池首）是坏 token，README 全 403。
  const envPats = (env["EXTRA_GITHUB_PATS"] ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const ghText = readKeyFile(GITHUB_TOKENS);
  const ghTokens: string[] = [...envPats];
  for (const line of ghText.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    if (!/^(ghp_|github_pat_|gho_|ghs_)[A-Za-z0-9_]+$/.test(t)) continue;
    if (!ghTokens.includes(t)) ghTokens.push(t);
  }
  if (ghTokens.length > 0) {
    // 主位（GITHUB_TOKEN）用池内首个有效 token：覆盖 .env 里可能已失效的旧值
    outEnv["GITHUB_TOKEN"] =
      env["GITHUB_TOKEN"] && env["GITHUB_TOKEN"].length > 0 && envPats.includes(env["GITHUB_TOKEN"]!)
        ? env["GITHUB_TOKEN"]
        : ghTokens[0]!;
    outEnv["EXTRA_GITHUB_PATS"] = ghTokens.join(",");
  } else {
    missing.push("GitHub PAT 池（GITHUB-TOKENS.txt）——README 拉取配额");
  }

  return { tail, head, env: outEnv, missing };
}

/** 从矩阵条目 `provider:model[:quota]` 取通道键（与 executor 的 lane key 同构）。 */
export function laneKeyOf(entry: string): string {
  const first = entry.indexOf(":");
  if (first === -1) return entry;
  const last = entry.lastIndexOf(":");
  const tailPart = entry.slice(last + 1);
  const model = entry.slice(first + 1, /^\d+$/.test(tailPart) ? last : undefined);
  return `${entry.slice(0, first)}:${model}`;
}

/**
 * 死通道摘除（D4，2026-09-14）：把仍处在退出期内的通道从矩阵里摘掉。
 *
 * 动机：矩阵里常驻死通道（实测：modelscope 余额不足、openrouter 每日额度耗尽、mistral 令牌失效、
 * hf 额度耗尽），它们会持续吃批次预算，而人肉从日志里发现总是滞后的。
 * TTL 分档见 src/feed/lane-health.ts（配额类跨天自动复活，key 失效类等人工换 key）。
 * 逃生口：`SCHED_IGNORE_LANE_HEALTH=1` 时不做摘除（排查「是不是账本误杀」）。
 */
export function dropRetiredLanes(plan: PlanResult): PlanResult {
  if ((process.env["SCHED_IGNORE_LANE_HEALTH"] ?? "") === "1") return plan;
  const ledger = loadLaneHealth();
  const before = plan.tail.length;
  const kept = plan.tail.filter((t) => {
    if (isLaneRetired(ledger, laneKeyOf(t.entry))) {
      console.log(`  [matrix] 摘除退出期通道 ${t.entry}（见 data/lane-health.json）`);
      return false;
    }
    return true;
  });
  if (kept.length !== before) {
    console.log(`  [matrix] 死通道摘除：${before} → ${kept.length} 条在岗通道`);
    plan.tail = kept;
  }
  return plan;
}
