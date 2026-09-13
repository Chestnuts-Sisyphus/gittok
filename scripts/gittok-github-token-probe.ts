/**
 * GitHub token 探针（2026-09-14）：全量建库前置——README 拉取依赖 GitHub API 配额，
 * 令牌耗尽会让全部卡片退化成「无 README」输入（质量降级，v6 判词明确 = 无 README 是降级路径）。
 *
 * 用法：npx tsx scripts/gittok-github-token-probe.ts
 * 零回显：只显 token 前 5 字符与剩余额度。
 */

import fs from "node:fs";

const TOKEN_FILES = ["D:/AI/KEY/GITHUB-TOKENS.txt", "D:/AI/KEY/ALL.txt"];
const GITHUB_REST = "https://api.github.com/rate_limit";

function looksLikeGithubToken(line: string): boolean {
  return /^(ghp_|github_pat_|gho_|ghs_)[A-Za-z0-9_]+$/.test(line.trim());
}

function collectTokens(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const file of TOKEN_FILES) {
    let text = "";
    try {
      text = fs.readFileSync(file, "utf-8");
    } catch {
      continue;
    }
    for (const line of text.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      if (!looksLikeGithubToken(t)) continue;
      if (seen.has(t)) continue;
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

async function main(): Promise<void> {
  const tokens = collectTokens();
  console.log(`[gh-probe] 找到 ${tokens.length} 个 GitHub token（GITHUB-TOKENS.txt + ALL.txt 去重）`);
  for (const tok of tokens) {
    try {
      const resp = await fetch(GITHUB_REST, {
        headers: { Authorization: `Bearer ${tok}`, "X-GitHub-Api-Version": "2022-11-28" },
      });
      if (!resp.ok) {
        console.log(`  ✗ ${tok.slice(0, 5)}…(${tok.length}): HTTP ${resp.status}`);
        continue;
      }
      const body = (await resp.json()) as {
        resources?: { core?: { limit: number; remaining: number; reset: number } };
      };
      const core = body.resources?.core;
      if (!core) {
        console.log(`  ? ${tok.slice(0, 5)}…(${tok.length}): 无 core 额度信息`);
        continue;
      }
      const resetIn = Math.max(0, Math.round((core.reset * 1000 - Date.now()) / 60000));
      console.log(
        `  ✓ ${tok.slice(0, 5)}…(${tok.length}): ${core.remaining}/${core.limit} 剩余，${resetIn} 分钟后重置`,
      );
    } catch (err) {
      console.log(`  ✗ ${tok.slice(0, 5)}…(${tok.length}): ${String(err).slice(0, 120)}`);
    }
  }
}

void main();
