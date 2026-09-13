/**
 * GitHub API token 池（2026-09-06 多 PAT 轮转，栗子提供第二 PAT 后立项）。
 *
 * 背景：Search 30/min 与 core 5000/h 的限额都按 token 计——N 个 token = N 倍额度。
 * GITHUB_TOKEN 为主，EXTRA_GITHUB_PATS（逗号分隔追加）轮转使用；
 * 同一请求只消耗一个 token 的额度，按调用序号轮换取号。
 * 凭据只走环境变量/Secrets，本模块零硬编码。
 */

import "dotenv/config";

let counter = 0;

/** 全部可用 token（主 + 追加，去重去空）。无任何 token 返回空数组（调用方退化匿名行为）。 */
export function getApiTokens(): string[] {
  const tokens = [process.env["GITHUB_TOKEN"] ?? "", ...(process.env["EXTRA_GITHUB_PATS"] ?? "").split(",")]
    .map((t) => t.trim())
    .filter(Boolean);
  return [...new Set(tokens)];
}

/** 轮换取一个 token；池为空返回 ""（调用方按「无 token」处理，与原单 token 行为一致）。 */
export function nextApiToken(): string {
  const tokens = getApiTokens();
  if (tokens.length === 0) return "";
  return tokens[counter++ % tokens.length]!;
}

/**
 * 取一个 **README 专用** token（2026-09-14：单账号配额调度）。
 *
 * 背景：README 拉取与 stars 轮转共用同一账号 core 配额（5000/h 按 token 计）。
 * 实测首跑：轮转先把配额吃干 → README 全线 403（卡输入降级 + facts 闸不可满足）。
 * 该账号名下所有 token 共用一个 5000/h 桶（403 body 的 user id 相同），所以真正让位的
 * 是「压低轮转量」（REFRESH_BATCH）；本函数做第二道保险——**多 token 时固定首个 token
 * 专供 README**（轮转不碰它），避免两个消费方互相把对方的额度用光时把 README 饿死。
 */
export function nextReadmeToken(): string {
  const tokens = getApiTokens();
  if (tokens.length === 0) return "";
  return tokens[0]!; // 首个 token 专供 README（轮转侧跳过它）
}

/**
 * 轮转（stars 刷新等批量读）用 token；**跳过 README 专用 token**（池 ≥2 时）。
 * 池只有 1 个 token 时两边共用（此时靠 REFRESH_BATCH 控制总需求）。
 */
export function nextRotationToken(): string {
  const tokens = getApiTokens();
  if (tokens.length <= 1) return tokens[0] ?? "";
  const rotation = tokens.slice(1); // 首个专供 README
  return rotation[counter++ % rotation.length]!;
}

/** 当前 token 池大小（诊断/日志用；零回显）。 */
export function tokenPoolSize(): number {
  return getApiTokens().length;
}
