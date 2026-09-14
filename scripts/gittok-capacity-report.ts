/**
 * 产能实测复算（G4 / 任务书 V4）：用**真实运行记录**算产能，不用拍的数。
 *
 * 数据源（全部可复跑、可复核）：
 *  1. data/fleet-health.json —— 编队每轮的 calls/ok/err429（判断有效成功率）
 *  2. data/tier-progress.json —— 分档推进的每轮增量（lastRunDelta）
 *  3. GPU/CI 运行时长 —— 由调用方通过 --minutes/--cards 传入（gh run list 口径），
 *     或读 data/zone-backfill-state.json 的凭证数当分子。
 *
 * 用法：
 *   npx tsx scripts/gittok-capacity-report.ts                     # 用仓库内状态文件
 *   npx tsx scripts/gittok-capacity-report.ts --minutes=12 --cards=2308   # 传 CI 实测轮次
 */

import fs from "node:fs";
import path from "node:path";

interface FleetWorker {
  name: string;
  calls: number;
  ok: number;
  err429: number;
  otherErrors: number;
  cooling?: boolean;
}
interface FleetJob {
  job: string;
  at: string;
  workers: FleetWorker[];
}

function argNum(name: string, dflt: number): number {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  if (!a) return dflt;
  const n = Number(a.split("=")[1]);
  return Number.isFinite(n) ? n : dflt;
}

function load<T>(p: string, dflt: T): T {
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
  } catch {
    return dflt;
  }
}

const health = load<FleetJob[]>(path.join("data", "fleet-health.json"), []);
const progress = load<{
  tiers: Record<string, { total: number; done: number; coverage: number; lastRunDelta?: number }>;
  activeTier?: string;
}>(path.join("data", "tier-progress.json"), { tiers: {} });

console.log("=== ① 编队有效产能（最近一轮 feed job 实测） ===");
// fleet-health 是「每轮一条」的数组；取最后一条 feed
const feedJobs = health.filter((h) => h.job === "feed" || h.job === "zone-backfill" || h.job === "tier");
const last = feedJobs.length > 0 ? feedJobs[feedJobs.length - 1] : health[health.length - 1];
if (last) {
  const w = last.workers ?? [];
  const calls = w.reduce((s, x) => s + (x.calls ?? 0), 0);
  const ok = w.reduce((s, x) => s + (x.ok ?? 0), 0);
  const r429 = w.reduce((s, x) => s + (x.err429 ?? 0), 0);
  const alive = w.filter((x) => (x.ok ?? 0) > 0).length;
  console.log(`  轮次 ${last.at}｜通道实例 ${w.length} 个，其中**有产出的 ${alive} 个**`);
  console.log(`  调用 ${calls}｜成功 ${ok}（${((ok / Math.max(1, calls)) * 100).toFixed(1)}%）｜429 ${r429}`);
  console.log(`  → 死通道占比 ${(((w.length - alive) / Math.max(1, w.length)) * 100).toFixed(1)}%（401/402/404 等硬失败）`);
}

console.log("\n=== ② 分档队列实况（data/tier-progress.json） ===");
const tiers = Object.entries(progress.tiers ?? {});
if (tiers.length === 0) console.log("  （无进度记录）");
for (const [id, e] of tiers) {
  console.log(
    `  ${id}: ${e.done}/${e.total}（覆盖 ${(e.coverage * 100).toFixed(1)}%）` +
      `｜本轮增量 ${e.lastRunDelta ?? "n/a"}`,
  );
}
console.log(`  当前档 ${progress.activeTier ?? "（无）"}`);

console.log("\n=== ③ 单轮产能（可传参覆盖） ===");
const minutes = argNum("minutes", 0);
const cards = argNum("cards", 0);
if (minutes > 0) {
  console.log(`  实测：${cards} 卡 / ${minutes} 分钟 = ${(cards / minutes).toFixed(1)} 卡/分钟`);
  const perDay = (cards / minutes) * 60 * 24;
  console.log(`  折算 24h 满载上限 ${perDay.toFixed(0)} 卡/天（仅当额度不饱和时成立）`);
} else {
  console.log("  （未传 --minutes/--cards：跳过单轮折算；传参即算）");
}

console.log("\n=== ④ 各档 ETA（按上面产能线性外推，诚实标注为外推） ===");
const perMin = minutes > 0 && cards > 0 ? cards / minutes : 0;
if (perMin <= 0) {
  console.log("  （需要 --minutes/--cards 才能算 ETA）");
} else {
  const perDay = perMin * 60 * 24;
  let cum = 0;
  for (const [id, e] of tiers) {
    const remain = Math.max(0, e.total - e.done);
    const days = remain / perDay;
    cum += days;
    console.log(`  ${id}: 剩 ${remain} 卡 → ${days.toFixed(1)} 天（累计 ${cum.toFixed(1)} 天）`);
  }
  console.log(`  ========================================`);
  console.log(`  全量合计约 ${cum.toFixed(1)} 天（口径：${perDay.toFixed(0)} 卡/天，24h 满载）`);
}
console.log(
  "\n[口径声明] 全部数字来自上面两个状态文件 + 传入的 CI 实测轮次；满载折算假设「额度不饱和」，" +
    "饱和时段（429/死通道）已在 ① 列明，属实测。",
);
