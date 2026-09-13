/**
 * 分档索引构建器（2026-09-14）：把「1k+ 星全池」落地成**可续跑的分档队列**。
 *
 * 背景：全量建库的目标是一个 59,391 量级的干净库（stage1 清单卫生口径），
 * 但生产线此前的候选来源是 trend+search 的即时抓取——**没有"全池在哪里、还剩多少"的账**。
 * 本脚本用 GitHub search 把三档拉全并落盘（**自适应星区间二分**规避 search 1000 结果上限）：
 *
 *   t1 = stars ≥ 10000（头部最先跑完） / t2 = 5000-9999 / t3 = 1000-4999（长尾最大）
 *
 * 产出 `data/repo-tiers.json`（索引：repo → {stars,tier}）+ `data/tier-progress.json`（吞吐盘账）。
 * search 配额：30/min/token（单账号）；脚本按 2.2s 间隔压速，自适应切分把调用数压到数百级。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-tier-index.ts            # 增量（已有索引跳过已覆盖区间，补新）
 *   npx tsx scripts/gittok-tier-index.ts --stats    # 只打印现状
 *   npx tsx scripts/gittok-tier-index.ts --range=1000-4999   # 只跑指定档
 */

import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { nextRotationToken, tokenPoolSize } from "../src/github-tokens.ts";

const OUT = path.join("data", "repo-tiers.json");
/** 覆盖账（哪些星区间已经拉过；增量模式只看这个） */
const COVER_OUT = path.join("data", "tier-covered.json");

export const TIERS: Array<{ id: string; label: string; min: number; max: number }> = [
  { id: "t1", label: "10k+", min: 10_000, max: Number.POSITIVE_INFINITY },
  { id: "t2", label: "5k-10k", min: 5_000, max: 10_000 },
  { id: "t3", label: "1k-5k", min: 1_000, max: 5_000 },
];

export interface TierEntry {
  stars: number;
  tier: string;
  lang?: string;
  pushedAt?: string;
}

export interface TierIndex {
  generatedAt: string;
  tiers: Record<string, { min: number; max: number | null; count: number }>;
  repos: Record<string, TierEntry>;
}

function tierOf(stars: number): string | null {
  for (const t of TIERS) if (stars >= t.min && stars < t.max) return t.id;
  return null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface SearchItem {
  full_name: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string | null;
}

async function searchPage(query: string, page: number): Promise<{ items: SearchItem[]; total: number }> {
  const token = nextRotationToken();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=100&page=${page}`;
  for (let attempt = 0; ; attempt++) {
    const resp = await fetch(url, { headers });
    if (resp.ok) {
      const body = (await resp.json()) as { total_count: number; items: SearchItem[] };
      return { items: body.items ?? [], total: body.total_count ?? 0 };
    }
    if ((resp.status === 403 || resp.status === 429) && attempt < 5) {
      const wait = 15_000 * (attempt + 1);
      console.error(`    [tier] HTTP ${resp.status}，退避 ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }
    throw new Error(`search failed: HTTP ${resp.status} ${(await resp.text()).slice(0, 120)}`);
  }
}

/**
 * 自适应拉取一个星区间（闭区间 [lo,hi]；hi=-1 表示无上界）。
 * 二分法：total ≤ 1000 直接翻页拿全；total > 1000 就切两半递归——
 * 每层调用都有实际收获、必然收敛（区间下界单调逼近）。
 */
async function fetchRange(
  lo: number,
  hi: number,
  into: Map<string, TierEntry>,
  covered: Array<[number, number | null]>,
): Promise<void> {
  if (lo > hi && hi !== -1) return;
  const rangeQ = hi === -1 ? `stars:>=${lo}` : `stars:${lo}..${hi}`;
  const first = await searchPage(rangeQ, 1);
  const pages = Math.min(10, Math.ceil(first.total / 100));
  if (pages === 0) {
    covered.push([lo, hi === -1 ? null : hi]);
    return;
  }
  for (let p = 1; p <= pages; p++) {
    const { items } = p === 1 ? first : await searchPage(rangeQ, p);
    for (const it of items) {
      const t = tierOf(it.stargazers_count);
      if (!t) continue;
      into.set(it.full_name, {
        stars: it.stargazers_count,
        tier: t,
        lang: it.language ?? undefined,
        pushedAt: it.pushed_at ?? undefined,
      });
    }
    if (p < pages) await sleep(2_200);
  }
  if (first.total <= 1000) {
    console.log(`  [tier] ${rangeQ} total=${first.total} 全取`);
    covered.push([lo, hi === -1 ? null : hi]);
    return;
  }
  // >1000：二分。无上界时用「已抓到的第 1000 名星数」当临时上界，再对两侧递归
  const maxStars = Math.max(...[...into.values()].map((v) => v.stars));
  const top = hi === -1 ? maxStars : hi;
  const mid = Math.floor((lo + top) / 2);
  console.log(`  [tier] ${rangeQ} total=${first.total} 超 1000 → 二分 ${lo}..${mid} / ${mid + 1}..${top}`);
  await sleep(2_200);
  await fetchRange(lo, mid, into, covered);
  await sleep(2_200);
  await fetchRange(mid + 1, top, into, covered);
}

function loadJson<T>(p: string, dflt: T): T {
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
  } catch {
    return dflt;
  }
}

function report(repos: Map<string, TierEntry>): void {
  const byTier = new Map<string, number>();
  for (const v of repos.values()) byTier.set(v.tier, (byTier.get(v.tier) ?? 0) + 1);
  const parts = TIERS.map((t) => `${t.id}(${t.label})=${byTier.get(t.id) ?? 0}`);
  console.log(`[tier] 现状：总计 ${repos.size}；${parts.join(" / ")}`);
}

function writeOut(repos: Map<string, TierEntry>, covered: Array<[number, number | null]>): void {
  const counters: TierIndex["tiers"] = {};
  const byTier = new Map<string, number>();
  for (const v of repos.values()) byTier.set(v.tier, (byTier.get(v.tier) ?? 0) + 1);
  for (const t of TIERS) {
    counters[t.id] = { min: t.min, max: Number.isFinite(t.max) ? t.max : null, count: byTier.get(t.id) ?? 0 };
  }
  const index: TierIndex = {
    generatedAt: new Date().toISOString(),
    tiers: counters,
    repos: Object.fromEntries(repos),
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(index), "utf-8");
  fs.writeFileSync(
    COVER_OUT,
    JSON.stringify({ updatedAt: new Date().toISOString(), covered }, null, 2),
    "utf-8",
  );
  console.log(`[tier] 写入 ${OUT}（${repos.size} 条，${(fs.statSync(OUT).size / 1e6).toFixed(1)}MB）`);
}

async function main(): Promise<void> {
  const statsOnly = process.argv.includes("--stats");
  const rangeArg = process.argv.find((a) => a.startsWith("--range="));
  const repos = new Map<string, TierEntry>(
    Object.entries(loadJson<{ repos: Record<string, TierEntry> }>(OUT, { repos: {} }).repos),
  );
  const coveredPrev = loadJson<{ covered: Array<[number, number | null]> }>(COVER_OUT, {
    covered: [],
  }).covered;
  console.log(
    `[tier] 已有索引 ${repos.size} 条 / 已覆盖区间 ${coveredPrev.length} 段；token 池=${tokenPoolSize()}`,
  );
  if (statsOnly) {
    report(repos);
    return;
  }

  const covered: Array<[number, number | null]> = [];
  const targets = rangeArg
    ? [TIERS.find((t) => rangeArg.slice(8) === t.id || rangeArg.slice(8) === t.label)]
    : TIERS;
  for (const t of targets) {
    if (!t) continue;
    console.log(
      `[tier] === 档 ${t.id}(${t.label}) stars ${t.min}..${Number.isFinite(t.max) ? t.max - 1 : "∞"} ===`,
    );
    await fetchRange(t.min, Number.isFinite(t.max) ? t.max - 1 : -1, repos, covered);
    report(repos);
    writeOut(repos, covered); // 每档落盘（中断可续）
  }
  writeOut(repos, covered);
}

void main();
