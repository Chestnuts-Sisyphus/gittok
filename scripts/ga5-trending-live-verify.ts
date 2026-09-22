/**
 * GA5 当日验证：用**生产同一函数**跑一次 trending 日报，看它是否还回落成占位符。
 *
 * 为什么需要它：旗舰日报 `ai-trending` 自 2026-09-06 起连续输出失败占位符（256–265 B）。
 * 根因一手证据在 `data/fleet-health.json` 的 digest 条目（2026-09-21T23:14Z）：
 *   `zhipu#5  Error: 400 Prompt exceeds max length`
 *   `groq#9   Error: 413 Request too large for model qwen/qwen3.8-27b`
 * 修法是给 prompt 加体积预算 + 缩预算重试阶梯（见 `src/report.ts::summarizeTrending`）。
 *
 * 本脚本**不复制任何逻辑**：直接调 `summarizeTrending`（生产函数）与 `saveTrendingReport`
 * （生产落盘函数），所以它跑通＝生产路径跑通。
 *
 * 与生产唯一的两点差别（都写明，不伪装）：
 *   1. 只跑 trending 一条，不跑整条 `pnpm start` 流水线（其余日报不受影响、不必重跑）；
 *   2. `DIGEST_REPO` 置空 → 不建 GitHub issue（避免对外动作）。
 *
 * 跑法：pnpm exec tsx scripts/ga5-trending-live-verify.ts
 * 退出码：0 = 日报 >1KB 且不含"生成失败"；1 = 仍是占位符（附日志里的错误原文）。
 */
import fs from "node:fs";
import { loadConfig } from "../src/config.ts";
import { fetchTrendingData } from "../src/trending.ts";
import { summarizeTrending, autoGenFooter } from "../src/report.ts";
import { saveTrendingReport } from "../src/report-savers.ts";
import { toCstDateStr, toUtcStr } from "../src/date.ts";

const MIN_BYTES = 1024;

async function main(): Promise<number> {
  const now = new Date();
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);

  console.log(`[ga5] 拉取 trending 数据（dateStr=${dateStr}）...`);
  const data = await fetchTrendingData(loadConfig().trendingTopics);
  console.log(
    `[ga5] trendingRepos=${data.trendingRepos.length} searchRepos=${data.searchRepos.length} ` +
      `trendingFetchSuccess=${data.trendingFetchSuccess}`,
  );

  // 生产路径两种语言都出（zh=ai-trending.md / en=ai-trending-en.md），验证也照做，
  // 否则今日中英一对里会留一个占位符。
  let allOk = true;
  for (const lang of ["zh", "en"] as const) {
    const summary = await summarizeTrending(data, dateStr, lang);
    const isPlaceholder = /生成失败|generation failed/.test(summary);
    console.log(`[ga5/${lang}] summary chars=${summary.length} placeholder=${isPlaceholder}`);

    // 落盘走生产函数（DIGEST_REPO 为空 → 不建 issue）
    await saveTrendingReport(data, summary, utcStr, dateStr, "", autoGenFooter(lang), lang);

    const file = `digests/${dateStr}/ai-trending${lang === "en" ? "-en" : ""}.md`;
    const bytes = fs.statSync(file).size;
    const body = fs.readFileSync(file, "utf-8");
    const ok = bytes >= MIN_BYTES && !/生成失败|generation failed/.test(body);
    console.log(`[ga5/${lang}] ${file} = ${bytes} B，判据(>=${MIN_BYTES} 且不含占位符) = ${ok ? "PASS" : "FAIL"}`);
    allOk = allOk && ok;
  }
  return allOk ? 0 : 1;
}

main().then(
  (rc) => process.exit(rc),
  (err) => {
    console.error(`[ga5] 验证失败：${err}`);
    process.exit(1);
  },
);
