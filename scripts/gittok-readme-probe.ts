/**
 * README 拉取诊断探针（2026-09-14）：定位「fetched 0/N」的真因。
 * 对 /repos/{owner}/{repo}/readme 直发请求，打印 status + 关键响应头（零回显 token，只显指纹）。
 *
 * 用法：npx tsx scripts/gittok-readme-probe.ts [owner/repo]
 */

import { buildPlan } from "./gittok-fullbuild-lib.ts";

const TARGET = process.argv.find((a) => a.includes("/") && !a.startsWith("--")) ?? "microsoft/vscode";

function fp(t: string): string {
  return t ? `${t.slice(0, 5)}…(${t.length})` : "(空)";
}

async function probe(url: string, token: string, accept: string): Promise<void> {
  const headers: Record<string, string> = { Accept: accept, "X-GitHub-Api-Version": "2022-11-28" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  try {
    const resp = await fetch(url, { headers });
    const interesting = [
      "x-ratelimit-remaining",
      "x-ratelimit-limit",
      "retry-after",
      "x-ratelimit-reset",
      "x-ratelimit-resource",
    ]
      .map((h) => `${h}=${resp.headers.get(h) ?? "-"}`)
      .join(" ");
    const body = resp.ok ? "" : ` body=${(await resp.text()).slice(0, 120).replace(/\s+/g, " ")}`;
    console.log(`  ${resp.status} ${url.replace("https://api.github.com", "")} ${interesting}${body}`);
  } catch (err) {
    console.log(`  ERR ${url}: ${String(err).slice(0, 120)}`);
  }
}

async function main(): Promise<void> {
  const { env } = buildPlan();
  const primary = process.env["GITHUB_TOKEN"] ?? "";
  const extra = (env["EXTRA_GITHUB_PATS"] ?? "").split(",").filter(Boolean);
  const tokens = [primary, ...extra].filter(Boolean);
  console.log(`[readme-probe] 目标 ${TARGET}；token 池 ${tokens.length} 个`);

  // ① 主 token 的 core 额度
  await probe("https://api.github.com/rate_limit", primary, "application/vnd.github+json");
  // ② README（raw accept，与生产同）
  await probe(`https://api.github.com/repos/${TARGET}/readme`, primary, "application/vnd.github.raw");
  // ③ 每个池内 token 各试一次 README
  for (const t of tokens) {
    console.log(`  -- token ${fp(t)}:`);
    await probe(`https://api.github.com/repos/${TARGET}/readme`, t, "application/vnd.github.raw");
  }
  // ④ 同一 token 连发 3 次（看是否 secondary limit 突发触发）
  console.log("  -- 连发 3 次（同主 token，观察是否瞬时突触）：");
  for (let i = 0; i < 3; i++) {
    await probe(`https://api.github.com/repos/${TARGET}/readme`, primary, "application/vnd.github.raw");
  }
}

void main();
