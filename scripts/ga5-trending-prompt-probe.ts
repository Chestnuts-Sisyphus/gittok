/**
 * GA5 诊断探针（2026-09-22）：量出 trending 日报 prompt 的真实长度。
 *
 * 为什么需要它：GitTok 旗舰日报 `ai-trending` 自 2026-09-06 起连续输出失败占位符。
 * 编队健康账本（data/fleet-health.json，2026-09-21T23:14Z 的 digest 条目）留下了一手证据：
 *   zhipu#5  → `Error: 400 Prompt exceeds max length`
 *   groq#9   → `Error: 413 Request too large for model qwen/qwen3.8-27b ... on tokens per minu…`
 * 本探针把这个"超长"从错误字符串变成一个可复算的数字：真实抓一次数据、按生产代码
 * 同一个 `buildTrendingPrompt` 拼 prompt、报出字符数与分档规模。
 *
 * 跑法：pnpm exec tsx scripts/ga5-trending-prompt-probe.ts
 * 退出码：0 = 量出来了；1 = 抓取失败（不写死任何期望值，纯观测）。
 */
import { fetchTrendingData, type TrendingData } from "../src/trending.ts";
import { buildTrendingPrompt } from "../src/prompts-data.ts";
import { loadConfig } from "../src/config.ts";

async function main(): Promise<number> {
  const dateStr = new Date().toISOString().slice(0, 10);
  // 用生产同一份配置取主题（不 import src/index.ts——那会连整个流水线一起跑起来）
  const data = await fetchTrendingData(loadConfig().trendingTopics);

  const rows: string[] = [];
  for (const lang of ["zh", "en"] as const) {
    const prompt = buildTrendingPrompt(data, dateStr, lang);
    const chars = prompt.length;
    // 粗估 token：CJK 约 1 字 1 token，拉丁约 4 字符 1 token。取保守上限（chars/2）。
    const estTokens = Math.ceil(chars / 2);
    rows.push(
      [
        `lang=${lang}`,
        `chars=${chars}`,
        `est_tokens_upper=${estTokens}`,
        `trending_repos=${data.trendingRepos.length}`,
        `search_repos=${data.searchRepos.length}`,
        `trending_fetch_ok=${data.trendingFetchSuccess}`,
      ].join("  "),
    );
  }

  console.log("=== GA5 trending prompt 长度实测 ===");
  console.log(`date=${dateStr}`);
  for (const r of rows) console.log(r);

  // 预算下限：模板骨架（指令正文）不可裁，总长不可能低于它——把下限也量出来，
  // 免得缩预算阶梯调到比骨架还小时产生"预算兑现不了"的错觉。
  const empty = { trendingRepos: [], searchRepos: [], trendingFetchSuccess: false } as TrendingData;
  for (const lang of ["zh", "en"] as const) {
    const skeleton = buildTrendingPrompt(empty, dateStr, lang, 1);
    console.log(`skeleton lang=${lang} chars=${skeleton.length}`);
  }
  console.log("=== 对照：免费编队的一手报错（来自 data/fleet-health.json 2026-09-21T23:14Z）===");
  console.log("zhipu#5  400 Prompt exceeds max length");
  console.log("groq#9   413 Request too large for model qwen/qwen3.8-27b");
  return 0;
}

main().then(
  (rc) => process.exit(rc),
  (err) => {
    console.error(`探针失败：${err}`);
    process.exit(1);
  },
);
