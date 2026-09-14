/**
 * 通道健康账脚本（D4/D5）。
 *
 * 两个模式（零外部输入，路径固定）：
 *   1. **归档**：读 data/fleet-health.json（管道每轮落盘的 worker 统计），按错误类别归档到
 *      data/lane-health.json（含退出期），并打印死通道比例——这就是「死通道摘除」的账。
 *   2. **报告**：只打印当前账本（不归档）。
 *
 * 归档时同时给出**建议人工处理**的清单（key 失效/模型名错这类机器改不了的）。
 *
 * 用法：
 *   npx tsx scripts/gittok-lane-health.ts            # 归档 + 报告
 *   npx tsx scripts/gittok-lane-health.ts --report   # 只报告
 */

import fs from "node:fs";
import path from "node:path";
import {
  classifyLaneError,
  loadLaneHealth,
  saveLaneHealth,
  recordLaneResult,
  laneHealthSummary,
  type LaneHealthLedger,
} from "../src/feed/lane-health.ts";

const FLEET_HEALTH = path.join(process.cwd(), "data", "fleet-health.json");

interface FleetWorker {
  name: string;
  calls?: number;
  ok?: number;
  lastError?: string;
  cooling?: boolean;
}

function archive(ledger: LaneHealthLedger): void {
  if (!fs.existsSync(FLEET_HEALTH)) {
    console.log("[D4] 没有 data/fleet-health.json，跳过归档（管道跑一轮后才有）");
    return;
  }
  const jobs = JSON.parse(fs.readFileSync(FLEET_HEALTH, "utf-8")) as {
    job: string;
    workers?: FleetWorker[];
  }[];
  let recorded = 0;
  for (const job of jobs) {
    for (const w of job.workers ?? []) {
      const calls = w.calls ?? 0;
      if (calls === 0) continue;
      // worker 名形如 `zhipu#2`（多账号）——按 name 归并到同一条通道账
      const key = w.name.split("#")[0]!;
      const ok = w.ok ?? 0;
      recordLaneResult(ledger, key, {
        calls,
        ok,
        lastError: ok === 0 ? w.lastError : undefined,
      });
      recorded++;
    }
  }
  console.log(`[D4] 归档 ${recorded} 条 worker 记录到通道健康账`);
}

function main(): boolean {
  const ledger = loadLaneHealth();
  if (!process.argv.includes("--report")) archive(ledger);
  saveLaneHealth(ledger);

  console.log("");
  console.log(laneHealthSummary(ledger));
  console.log("");

  // 必须人工处理的（机器改不了）：key 失效 / 模型名错
  const manual = Object.values(ledger.lanes).filter(
    (l) => l.lastClass === "auth" || l.lastClass === "notfound" || l.lastClass === "context",
  );
  if (manual.length > 0) {
    console.log("需人工处理（机器改不了，从矩阵/密钥里摘掉或替换）：");
    for (const l of manual) {
      const advice =
        l.lastClass === "auth"
          ? "换 key（令牌失效）"
          : l.lastClass === "notfound"
            ? "改模型名 / 开通该模型"
            : "缩小 batch 或换长上下文模型";
      console.log(`  ✗ ${l.key} — ${advice}｜最后错误：${(l.lastError ?? "").slice(0, 80)}`);
    }
    console.log("");
  }

  // D4 口径：分母是**在岗通道**（退出期内的已被摘除、不会再被调用，不该继续计入分母——
  // 否则「摘除」这个动作在指标上永远看不出来，指标就失去了指导意义）。
  const now = Date.now();
  const rows = Object.values(ledger.lanes);
  const active = rows.filter((l) => !l.retiredUntil || new Date(l.retiredUntil).getTime() <= now);
  const dead = active.filter((l) => l.calls >= 1 && l.ok === 0);
  const retiredN = rows.length - active.length;
  const ratio = active.length === 0 ? 0 : dead.length / active.length;
  console.log(
    `[D4] 死通道比例（在岗通道中零成功）= ${dead.length}/${active.length} = ${(ratio * 100).toFixed(1)}%（验收线 <15%）｜已摘除（退出期）${retiredN} 条`,
  );
  for (const d of dead) {
    console.log(`  · ${d.key} [${classifyLaneError(d.lastError)}] calls=${d.calls}`);
  }
  return ratio < 0.15;
}

if (!main()) {
  console.log("\n[D4] 未达 <15%：上表「需人工处理」的条目必须从矩阵里摘掉（机器改不了）");
}
