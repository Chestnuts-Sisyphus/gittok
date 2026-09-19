/**
 * 卡片级不变量闸的 CLI 入口（D2）——CI 与本地共用。
 *
 * 两道闸：
 *  ① 结构闸：每张卡的必备字段齐全、取值域合法（checkCardInvariants）；
 *  ② **字段回退闸**：与上一版快照差分，凡「上一版有值、这一版丢了」一律拒绝提交
 *     （这一道直接对着 zone 100%→0.2% 那次事故设计：字段清单是全的，问题是值丢了）。
 *
 * 硬失败即抛错（非零退出 → CI 红）。
 * 数据源固定（**零命令行参数**）：
 *   - 当前版本：data/feed.json
 *   - 上一版快照：data/feed.prev.json（存在就对比，不存在则跳过第二道闸）
 * 两个环境变量入口（K-07 新增，CI 不用、本地钩子用）：
 *   - INVARIANTS_PREV：显式指定对照物路径（钩子用它把 HEAD 里已提交的 feed.json 现取现比）
 *   - INVARIANTS_PREV_MAX_HOURS：默认对照物的新鲜度上限（默认 72h；超龄只报不拦，防拿旧快照造假回退）
 */

import fs from "node:fs";
import path from "node:path";
import {
  checkCardInvariants,
  checkFieldRegression,
  formatInvariantReport,
} from "../src/feed/card-invariants.ts";

const DATA_DIR = path.resolve(process.cwd(), "data");
const CURRENT = path.join(DATA_DIR, "feed.json");
const PREVIOUS = process.env["INVARIANTS_PREV"] ?? path.join(DATA_DIR, "feed.prev.json");
/** K-07 新鲜度上限：默认对照物 `data/feed.prev.json` 只有 promote-v3 会写，超龄拿它比＝大面积假回退。 */
const PREV_MAX_AGE_HOURS = Number(process.env["INVARIANTS_PREV_MAX_HOURS"] ?? 72);

function ageHours(p: string): number {
  return (Date.now() - fs.statSync(p).mtimeMs) / 3_600_000;
}

function main(): boolean {
  const cards = JSON.parse(fs.readFileSync(CURRENT, "utf-8")) as Record<string, unknown>[];
  const report = checkCardInvariants(cards);
  console.log(formatInvariantReport(report));

  if (fs.existsSync(PREVIOUS)) {
    const age = ageHours(PREVIOUS);
    if (age > PREV_MAX_AGE_HOURS && !process.env["INVARIANTS_PREV"]) {
      console.log(
        `\n字段回退闸：对照物陈旧→跳过并提示（${path.basename(PREVIOUS)} 已 ${age.toFixed(1)}h 未更新，上限 ${PREV_MAX_AGE_HOURS}h）。` +
          `\n  拿两天前的库比只会造出假回退；本地提交请走 .husky/pre-commit（它现取 HEAD 版当对照物），` +
          `\n  或显式指定：INVARIANTS_PREV=<路径> npx tsx scripts/gittok-card-invariants.ts`,
      );
    } else {
      const prev = JSON.parse(fs.readFileSync(PREVIOUS, "utf-8")) as Record<string, unknown>[];
      const regressions = checkFieldRegression(prev, cards);
      const label = process.env["INVARIANTS_PREV"] ? path.basename(PREVIOUS) : "feed.prev.json";
      console.log(`\n字段回退闸（对比 ${label}）：${regressions.length} 处回退`);
      for (const r of regressions.slice(0, 20)) console.log(`  ✗ ${r.repo} [${r.field}] ${r.why}`);
      if (regressions.length > 0) return false;
    }
  } else {
    console.log("\n字段回退闸：data/feed.prev.json 不存在，跳过（管道会在重建前落一份快照）");
  }

  if (!report.ok) {
    console.error(`\n[D2 不变量闸] 不通过：${report.hardCount} 处硬失败——该有的字段不在卡片上，拒绝提交。`);
    return false;
  }
  console.log(
    `\n[D2 不变量闸] 通过：${report.total} 张卡的必备字段齐全（告警 ${report.warnCount} 条不拦提交）`,
  );
  return true;
}

if (!main()) throw new Error("[D2 不变量闸] 不通过");
