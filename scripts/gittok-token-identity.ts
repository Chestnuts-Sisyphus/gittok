/**
 * GitHub token 身份/额度判定（2026-09-14）：一次真实调用定位每个 token 的
 * 「账号 + core 剩余额度 + 重置时间」，用于单账号配额调度决策。
 *
 * 判据：403 与 429 都可能是限流；/rate_limit 不耗额度且能给出真实 remaining——
 * 但**未认证**请求的 limit=60，认证=5000（PAT）/15000（App）。认证有效的 token
 * 一次 /rate_limit 即可判定。
 *
 * 用法：npx tsx scripts/gittok-token-identity.ts   （零回显：只显指纹与账号名）
 */

import fs from "node:fs";

const FILES = ["D:/AI/KEY/GITHUB-TOKENS.txt", "D:/AI/KEY/ALL.txt"];

function collect(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const f of FILES) {
    let text = "";
    try {
      text = fs.readFileSync(f, "utf-8");
    } catch {
      continue;
    }
    for (const line of text.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      if (!/^(ghp_|github_pat_|gho_|ghs_)[A-Za-z0-9_]+$/.test(t)) continue;
      if (seen.has(t)) continue;
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

const fp = (t: string) => `${t.slice(0, 5)}…(${t.length})`;

async function probeToken(token: string, label: string): Promise<void> {
  const headers = { Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" };
  try {
    // ① 身份 + 真实 core 额度（/rate_limit 不耗额度）
    const rl = await fetch("https://api.github.com/rate_limit", { headers });
    const body = (await rl.json()) as {
      resources?: { core?: { limit: number; remaining: number; reset: number } };
    };
    const core = body.resources?.core;
    // ② 身份：/user（1 次请求；未认证会 401）
    const me = await fetch("https://api.github.com/user", { headers });
    const meBody = me.ok ? ((await me.json()) as { login?: string; id?: number }) : null;
    const resetIn = core ? Math.max(0, Math.round((core.reset * 1000 - Date.now()) / 60000)) : -1;
    console.log(
      `  ${label} ${fp(token)}: HTTP ${rl.status} login=${meBody?.login ?? "（未认证）"} id=${meBody?.id ?? "-"} ` +
        `core=${core ? `${core.remaining}/${core.limit}` : "?"} resetIn=${resetIn}min`,
    );
  } catch (err) {
    console.log(`  ${label} ${fp(token)}: ERR ${String(err).slice(0, 100)}`);
  }
}

async function main(): Promise<void> {
  const tokens = collect();
  console.log(`[token-id] 共 ${tokens.length} 个候选 token（KEY 文件去重）`);
  await probeToken(process.env["GITHUB_TOKEN"] ?? "", ".env GITHUB_TOKEN");
  for (const t of tokens) await probeToken(t, "KEY-file        ");
}

void main();
