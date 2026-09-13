/**
 * 分档规模 + 吞吐估算（2026-09-14）：回答「各档多大、按现有资源要跑多久」。
 *
 * 只用几次 search 调用（`total_count` 不用翻页）测各星级门槛以上的仓库数，
 * 再按实测吞吐（卡/轮 × 轮时长）线性外推到各档完成时间——**明确标注是外推**。
 *
 * 用法：npx tsx scripts/gittok-tier-estimate.ts
 */

import "dotenv/config";
import { nextRotationToken } from "../src/github-tokens.ts";

/** 星级门槛采样点（覆盖分档边界与若干参考值） */
const THRESHOLDS = [100_000, 50_000, 20_000, 10_000, 7_000, 5_000, 3_000, 2_000, 1_000];

/** 实测吞吐（可读环境变量覆盖；默认取 09-14 点火跑实据：60 精评卡 / 45 分钟窗口） */
const CARDS_PER_ROUND = Number(process.env["EST_CARDS_PER_ROUND"] ?? 60);
/** 24h 稳态运转：每天实际能跑的轮数（每 2h 一班 = 12 班/天；留 1 班给维护） */
const ROUNDS_PER_DAY = Number(process.env["EST_ROUNDS_PER_DAY"] ?? 11);

async function countAbove(min: number): Promise<number> {
  const token = nextRotationToken();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(`stars:>=${min}`)}&per_page=1`;
  const resp = await fetch(url, { headers });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${(await resp.text()).slice(0, 120)}`);
  const body = (await resp.json()) as { total_count: number };
  return body.total_count;
}

async function main(): Promise<void> {
  console.log(
    `[est] 吞吐假设（外推参数，可用 EST_* 覆盖）：${CARDS_PER_ROUND} 卡/轮 × ${ROUNDS_PER_DAY} 轮/天`,
  );
  const counts = new Map<number, number>();
  for (const t of THRESHOLDS) {
    await new Promise((r) => setTimeout(r, 2_200)); // search 30/min
    const n = await countAbove(t);
    counts.set(t, n);
    console.log(`  [est] stars >= ${t.toLocaleString()} → ${n.toLocaleString()} 个仓库`);
  }

  const at = (t: number) => counts.get(t) ?? 0;
  const tiers: Array<{ label: string; size: number }> = [
    { label: "t1 (10k+)", size: at(10_000) },
    { label: "t2 (5k-10k)", size: Math.max(0, at(5_000) - at(10_000)) },
    { label: "t3 (1k-5k)", size: Math.max(0, at(1_000) - at(5_000)) },
  ];

  const perDay = CARDS_PER_ROUND * ROUNDS_PER_DAY;
  const full = at(1_000);
  console.log(`\n[est] 各档规模（GitHub 实时口径）：`);
  let cumDays = 0;
  for (const t of tiers) {
    const days = t.size / perDay;
    cumDays += days;
    console.log(
      `  ${t.label}: ${t.size.toLocaleString()} 个 → 约 ${days.toFixed(1)} 天（累计 ${cumDays.toFixed(1)} 天）`,
    );
  }
  console.log(
    `\n[est] 全量（1k+ 合计 ${full.toLocaleString()} 个）≈ ${(full / perDay).toFixed(1)} 天 ` +
      `（口径：${perDay} 卡/天 = ${CARDS_PER_ROUND} 卡/轮 × ${ROUNDS_PER_DAY} 轮/天）`,
  );

  // 加速情景（只用现有资源可选的两种）
  const scenarios: Array<{ name: string; perDay: number }> = [
    { name: "现状（免费档：智谱双号 + 魔搭 250 + OR 50）", perDay },
    { name: "免费 + qwen3.7-flash Batch 兜底（全站 ≈¥22.5）", perDay: perDay * 4.5 },
    { name: "免费 + OR 充 $10（1000/日）+ Batch 兜底", perDay: perDay * 6 },
  ];
  console.log(`\n[est] 全量耗时按产能档（线性外推，未计重评/弃卡损耗）：`);
  for (const s of scenarios) {
    console.log(`  ${s.name}: ${s.perDay.toFixed(0)} 卡/天 → 约 ${(full / s.perDay).toFixed(1)} 天`);
  }
  console.log(
    `\n[est] 说明：t1(10k+) 体量小、可先跑完（${tiers[0]!.size.toLocaleString()} 个）——` +
      `分档的意义就是先让头部全量上线，长尾随 24h 运转慢慢吃。`,
  );
}

void main();
