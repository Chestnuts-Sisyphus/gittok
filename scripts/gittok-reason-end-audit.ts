/**
 * 断句收尾清点（九轮 T4 的**可复跑闸**，只读）：
 *   全库 `reasonCn` 有多少张结尾不是句末标点 ⇒ 打印计数 + 尾部样例 + 长度分布。
 *
 * 口径**唯一来源**是 `src/feed/taxonomy.ts` 的 `endsWithSentenceEnd`（不在本脚本里另写正则，
 * 否则又会是「同一内容契约两个口径」那类漂移）。
 *
 * 用法：
 *   npx tsx scripts/gittok-reason-end-audit.ts              # 清点（默认 exit 0，存量欠账只报告）
 *   npx tsx scripts/gittok-reason-end-audit.ts --strict     # 有违约就 exit 1（升 hard 的开关）
 *   npx tsx scripts/gittok-reason-end-audit.ts --example=20 # 多看几条样例
 *
 * 三处同侧同值的关系（〇块第 8 条）：
 *   · 提示词：`src/feed/prompts.ts` reason_cn 段（硬性要求「以句末标点收尾」）
 *   · 生成闸：`src/feed/checks.ts` cardChecks G1-b（**硬**，不合格不写回）
 *   · 库不变量：`src/feed/card-invariants.ts`（**warn**，存量欠账；本脚本 --strict 是升 hard 的入口）
 */
import fs from "node:fs";

import { endsWithSentenceEnd, REASON_MIN, REASON_MAX } from "../src/feed/taxonomy.ts";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const exampleN = Number(args.find((a) => a.startsWith("--example="))?.split("=")[1] ?? 10);
// 固定只读仓内那一份（不接受外部路径：审计对象就是本仓数据，少一个输入面少一类穿越风险）。
const FEED_PATH = "data/feed.json";
const cards = JSON.parse(fs.readFileSync(FEED_PATH, "utf8")) as Array<Record<string, unknown>>;

const bad = cards.filter((c) => {
  const r = typeof c["reasonCn"] === "string" ? (c["reasonCn"] as string) : "";
  return r.trim().length > 0 && !endsWithSentenceEnd(r);
});
const lens = bad.map((c) => String(c["reasonCn"]).length).sort((a, b) => a - b);
const q = (p: number) => (lens.length ? lens[Math.floor(lens.length * p)] : null);

console.log(`断句清点（口径＝taxonomy.endsWithSentenceEnd）：${bad.length}/${cards.length} 张结尾不是句末标点`);
if (bad.length) {
  console.log(
    `  长度分布 min ${lens[0]} / p50 ${q(0.5)} / max ${lens.at(-1)}（契约 ${REASON_MIN}-${REASON_MAX}）` +
      `｜<${REASON_MAX} 字（即不是被上限截的）${lens.filter((l) => l < REASON_MAX).length} 张｜= ${REASON_MAX} 字（被上限截）${
        lens.filter((l) => l === REASON_MAX).length
      } 张`,
  );
  for (const c of bad.slice(0, exampleN)) {
    console.log(`  · ${String(c["repo"])} ｜…${String(c["reasonCn"]).trim().slice(-40)}`);
  }
  if (bad.length > exampleN) console.log(`  …还有 ${bad.length - exampleN} 张`);
}
console.log(
  `  闸的两步走现状：生成端硬拦（checks.cardChecks G1-b）｜库不变量 warn（card-invariants）｜` +
    `本脚本 ${strict ? "--strict（有违约即 exit 1）" : "默认只报告"}`,
);
if (strict && bad.length) process.exit(1);
