/**
 * 通道健康账（D4/D5，2026-09-14）。
 *
 * 问题：矩阵里常驻死通道，靠人肉从日志里发现，发现前一直在吃批次预算。
 * 实测死因（2026-09-14 全量 fleet-health，70 条 worker 记录）**不是代码 bug，是资源/配置问题**：
 *   - `401 令牌已过期或验证不正确`（zhipu 主位 / mistral ×4）→ key 失效
 *   - `404`（gemini#4/#5）→ 模型名不存在/未开通
 *   - `413 Request too large`（groq#3/#6）→ 模型上下文装不下长 prompt
 *   - `402 额度耗尽`（hf ×2）→ 月度额度用完
 *   - `429 free-models-per-day`（openrouter）→ 每日免费额度用完
 *   - `429 insufficient balance`（modelscope ×2）→ **账户余额不足**（不是节流，充值才恢复）
 *
 * 做法：把「发现死通道」从人肉变成机器——
 *  1. 按**错误类别**给退出期（TTL）：配额类明天/下月自然会好，key 失效类要人来换；
 *  2. 退出期内该通道自动跳过（不再吃批次），到期自动复活重试一次；
 *  3. 账本落盘（data/lane-health.json），任何一轮跑完都能被下一轮读到。
 *
 * 纪律：只读密钥指纹（前 5 字符），不落 key 本体。
 */

import fs from "node:fs";
import path from "node:path";

export type LaneFailureClass =
  | "auth" // 401/403：key 失效 → 必须人工换（退出期长）
  | "notfound" // 404：模型名/路径不对 → 必须人工改
  | "quota-daily" // 429 free-models-per-day 类 → 明天会好
  | "quota-exhausted" // 402 / insufficient balance → 额度或余额耗尽
  | "context" // 413：上下文装不下
  | "network" // 超时/连不上
  | "ok";

export interface LaneHealth {
  key: string;
  calls: number;
  ok: number;
  lastError?: string;
  lastClass?: LaneFailureClass;
  /** 退出到期时间（ISO）；未退出 = undefined */
  retiredUntil?: string;
  updatedAt: string;
}

export interface LaneHealthLedger {
  updatedAt: string;
  lanes: Record<string, LaneHealth>;
}

/** 失败分类（按错误文本 → 类别；顺序敏感：先判最具体的）。 */
export function classifyLaneError(err: string | undefined): LaneFailureClass {
  if (!err) return "ok";
  const e = err.toLowerCase();
  if (/insufficient balance|arrears|欠费/.test(e)) return "quota-exhausted";
  if (/402|depleted your monthly|quota exceeded|额度/.test(e)) return "quota-exhausted";
  if (/free-models-per-day|per day|daily/.test(e)) return "quota-daily";
  if (/413|request too large|context length|too many tokens/.test(e)) return "context";
  if (/401|403|令牌已过期|invalid api key|no auth/.test(e)) return "auth";
  if (/404|model not found|no such model/.test(e)) return "notfound";
  if (/timeout|超时|econn|enotfound|fetch failed|socket/.test(e)) return "network";
  if (/429/.test(e)) return "quota-daily";
  return "network";
}

/** 各类别的退出期：配额类短（会自然恢复），配置类长（要人来改）。 */
export const RETIRE_MS: Record<LaneFailureClass, number> = {
  auth: 30 * 24 * 3600_000, // key 失效：人工换 key 前一直跳过
  notfound: 30 * 24 * 3600_000,
  "quota-exhausted": 24 * 3600_000, // 余额/月度额度：明天再试一次
  "quota-daily": 12 * 3600_000, // 每日免费额度：跨天后自动复活
  context: 7 * 24 * 3600_000, // 上下文装不下：除非换模型/缩 prompt
  network: 30 * 60_000, // 网络抖动：半小时后重试
  ok: 0,
};

export function loadLaneHealth(file = path.join("data", "lane-health.json")): LaneHealthLedger {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as LaneHealthLedger;
  } catch {
    return { updatedAt: new Date().toISOString(), lanes: {} };
  }
}

export function saveLaneHealth(ledger: LaneHealthLedger, file = path.join("data", "lane-health.json")): void {
  ledger.updatedAt = new Date().toISOString();
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(ledger, null, 2), "utf-8");
  fs.renameSync(tmp, file);
}

/** 记录一轮结果：成功清零退出期；连续零成功且错误可分类 → 记退出期。 */
export function recordLaneResult(
  ledger: LaneHealthLedger,
  key: string,
  res: { calls: number; ok: number; lastError?: string },
): void {
  const name = canonicalLaneName(key);
  const prev = ledger.lanes[name] ?? { key: name, calls: 0, ok: 0, updatedAt: "" };
  const calls = prev.calls + res.calls;
  const ok = prev.ok + res.ok;
  const cls = res.ok > 0 ? "ok" : classifyLaneError(res.lastError);
  const entry: LaneHealth = {
    key: name,
    calls,
    ok,
    lastError: res.lastError ?? prev.lastError,
    lastClass: cls,
    updatedAt: new Date().toISOString(),
  };
  if (cls !== "ok" && res.ok === 0 && res.calls > 0) {
    entry.retiredUntil = new Date(Date.now() + RETIRE_MS[cls]).toISOString();
  } else if (res.ok > 0) {
    // 成功即撤销退出期（通道恢复）
    delete entry.retiredUntil;
  }
  ledger.lanes[name] = entry;
}

/**
 * 通道名的**规范形**（账本与矩阵两套命名的桥）：
 *  - 矩阵侧 lane key 形如 `custom:modelscope:deepseek-ai/DeepSeek-V4-Flash-0731`、`zhipu:glm-4.7-flash`；
 *  - fleet-health 侧 worker 名形如 `custom-modelscope#2`、`zhipu`、`hf#3`。
 * 两边都要能落到同一个键（`modelscope` / `zhipu` / `hf`），否则账本记的退出期管不到矩阵上的通道
 * （2026-09-14 实测踩过：账本里 `custom-modelscope` 已退出，矩阵里 `custom:modelscope:...` 照样在跑）。
 */
export function canonicalLaneName(raw: string): string {
  const base = (raw.split("#")[0] ?? "").trim().toLowerCase();
  if (!base) return raw;
  if (base.includes(":")) {
    const parts = base.split(":").filter(Boolean);
    const provider = parts[0] ?? base;
    if (provider === "custom") return parts[1] ?? provider;
    return provider;
  }
  const parts = base.split(/[-_]/).filter(Boolean);
  return parts[parts.length - 1] ?? base;
}

/** 该通道此刻是否处于退出期（true = 应跳过）。 */
export function isLaneRetired(ledger: LaneHealthLedger, key: string, now = Date.now()): boolean {
  const h = ledger.lanes[canonicalLaneName(key)];
  if (!h?.retiredUntil) return false;
  return new Date(h.retiredUntil).getTime() > now;
}

/** 人类可读摘要（验收/日志共用）。 */
export function laneHealthSummary(ledger: LaneHealthLedger, now = Date.now()): string {
  const rows = Object.values(ledger.lanes).sort((a, b) => a.key.localeCompare(b.key));
  const retired = rows.filter((r) => r.retiredUntil && new Date(r.retiredUntil).getTime() > now);
  // 有效死通道比（D4 口径）：**仍会被调用的**通道里，零成功的有几条。
  // 退出期内的通道已经不会再被调用，不计入分母——否则「摘除」这个动作在指标上永远看不出来。
  const active = rows.filter((r) => !r.retiredUntil || new Date(r.retiredUntil).getTime() <= now);
  const activeDead = active.filter((r) => r.calls >= 1 && r.ok === 0);
  const lines = [
    `通道健康账：${rows.length} 条｜退出期中 ${retired.length} 条｜**在岗通道里死通道 ${activeDead.length}/${active.length} = ${((activeDead.length / Math.max(1, active.length)) * 100).toFixed(1)}%**（D4 口径：退出期内的已摘除、不再被调用）`,
  ];
  for (const r of rows) {
    const ret =
      r.retiredUntil && new Date(r.retiredUntil).getTime() > now
        ? `退出至 ${r.retiredUntil.slice(0, 16)}`
        : "在岗";
    lines.push(
      `  ${r.key.padEnd(46)} calls=${String(r.calls).padStart(4)} ok=${String(r.ok).padStart(4)} ${ret}${r.lastClass && r.lastClass !== "ok" ? ` [${r.lastClass}]` : ""}`,
    );
  }
  return lines.join("\n");
}
