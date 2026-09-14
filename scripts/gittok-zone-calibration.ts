/**
 * 分区标定复核（G5 / 任务书 C6）：对线上 feed 做「阈值与判据」的量化体检，
 * 不靠体感也不靠拍脑袋——每条都给出数字与判据。
 *
 * 三查：
 *  1. **zone 分布健康度**：四区占比是否被单区压扁（AI 区硬席配额 30% 的机制前提）
 *  2. **funScore 与 zone 的一致性**：乐趣信号是否跨四区（若 funScore 与「创意」强绑定，
 *     说明模型把两个轴混为一谈——这正是栗子实测「乐趣=创意」的病根）
 *  3. **domainTags 覆盖率与细分可用性**：AI 区 domainKey 细分是否成立
 *
 * 用法：npx tsx scripts/gittok-zone-calibration.ts [--file=data/feed.json]
 */

import fs from "node:fs";
import path from "node:path";
import { ALL_ZONES } from "../src/feed/channels.ts";

interface Card {
  repo?: string;
  zone?: string;
  zoneSource?: string;
  funScore?: number;
  domainTags?: string[];
  domainKey?: string;
  category?: string;
}

function argStr(name: string, dflt: string): string {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split("=")[1]! : dflt;
}

const file = argStr("file", path.join("data", "feed.json"));
const cards = JSON.parse(fs.readFileSync(file, "utf-8")) as Card[];
const withZone = cards.filter((c) => c.zone);

console.log(`[标定] file=${file} 卡 ${cards.length}｜有 zone ${withZone.length}`);
if (withZone.length === 0) {
  console.log("  （无 zone 数据，无法标定）");
  process.exit(0);
}

// ── 查 1：四区占比（AI 硬席配额 30% 的机制前提是 AI 区不过分垄断） ──────────────
console.log("\n=== 查 1 · zone 分布健康度 ===");
const byZone = new Map<string, number>();
for (const c of withZone) byZone.set(c.zone!, (byZone.get(c.zone!) ?? 0) + 1);
const rows = ALL_ZONES.map((z) => ({
  zone: z,
  n: byZone.get(z) ?? 0,
  share: (byZone.get(z) ?? 0) / withZone.length,
}));
rows.sort((a, b) => b.share - a.share);
for (const r of rows) {
  const bar = "#".repeat(Math.round(r.share * 80));
  console.log(`  ${r.zone.padEnd(4)} ${String(r.n).padStart(5)}  ${(r.share * 100).toFixed(1)}%  ${bar}`);
}
const top = rows[0]!;
const aiShare = rows.find((r) => r.zone === "AI")?.share ?? 0;
console.log(
  `  判据：最大区「${top.zone}」${(top.share * 100).toFixed(1)}%｜AI 区 ${(aiShare * 100).toFixed(1)}%`,
);
console.log(
  top.share > 0.6
    ? "  ⚠️ 单区占比 >60%：分区被压扁（前端配额机制虽能兜底，但说明判定链倾向单一）"
    : "  ✅ 无单区 >60%，四区都有人口（配额机制仍有意义）",
);
console.log(
  ALL_ZONES.every((z) => (byZone.get(z) ?? 0) > 0) ? "  ✅ 四区皆非空" : "  ⚠️ 存在空区（该区 tab 会没内容）",
);

// ── 查 2：funScore × zone 交叉（乐趣轴是否独立于题材轴） ────────────────────────
console.log("\n=== 查 2 · funScore 与 zone 的一致性（「乐趣≠创意」的量化判据） ===");
const funCards = withZone.filter((c) => typeof c.funScore === "number");
console.log(`  有 funScore ${funCards.length}/${withZone.length}`);
const HI = 0.5;
const hi = funCards.filter((c) => c.funScore! >= HI);
const hiByZone = new Map<string, number>();
for (const c of hi) hiByZone.set(c.zone!, (hiByZone.get(c.zone!) ?? 0) + 1);
console.log(`  高乐趣（funScore ≥ ${HI}）${hi.length} 张，跨区分布：`);
for (const z of ALL_ZONES) {
  const n = hiByZone.get(z) ?? 0;
  console.log(
    `    ${z.padEnd(4)} ${String(n).padStart(5)}  ${((n / Math.max(1, hi.length)) * 100).toFixed(1)}%`,
  );
}
const creShare = (hiByZone.get("创意") ?? 0) / Math.max(1, hi.length);
console.log(
  `  判据：高乐趣卡中「创意」区占比 ${(creShare * 100).toFixed(1)}%` +
    `（若趋近 100% = 两轴被混为一谈=栗子实测的病根）`,
);
console.log(
  creShare >= 0.9
    ? "  ❌ 乐趣与创意几乎重合——模型把体验轴当成了题材轴"
    : creShare >= 0.5
      ? "  ⚠️ 偏集中，但确有跨区（可接受，创意本就高乐趣）"
      : "  ✅ 乐趣信号明显跨区，两轴可区分",
);
// 反向查：创意区里有没有「不高乐趣」的卡（说明创意≠乐趣）
const creAll = funCards.filter((c) => c.zone === "创意");
const creLow = creAll.filter((c) => c.funScore! < HI).length;
console.log(
  `  反向：创意区有 funScore 的 ${creAll.length} 张，其中低乐趣(<${HI}) ${creLow} 张 ` +
    `(${((creLow / Math.max(1, creAll.length)) * 100).toFixed(1)}%)` +
    `——若创意区里全是高乐趣，说明判定链没区分两个轴`,
);

// ── 查 3：domainTags / domainKey 细分可用性 ──────────────────────────────────
console.log("\n=== 查 3 · domainTags / domainKey 细分可用性 ===");
const withTags = withZone.filter((c) => c.domainTags && c.domainTags.length > 0);
console.log(
  `  有 domainTags ${withTags.length}/${withZone.length}（${((withTags.length / withZone.length) * 100).toFixed(1)}%）`,
);
const tagCounts = withTags.map((c) => c.domainTags!.length);
const mean = tagCounts.reduce((a, b) => a + b, 0) / Math.max(1, tagCounts.length);
console.log(
  `  每卡领域词数：均值 ${mean.toFixed(1)}｜min ${Math.min(...tagCounts)}｜max ${Math.max(...tagCounts)}`,
);
const aiCards = withZone.filter((c) => c.zone === "AI");
const aiWithKey = aiCards.filter((c) => c.domainKey);
console.log(
  `  AI 区 ${aiCards.length} 张，其中有 domainKey 细分 ${aiWithKey.length}` +
    `（${((aiWithKey.length / Math.max(1, aiCards.length)) * 100).toFixed(1)}%）`,
);
const keyDist = new Map<string, number>();
for (const c of aiWithKey) keyDist.set(c.domainKey!, (keyDist.get(c.domainKey!) ?? 0) + 1);
const topKeys = [...keyDist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
console.log(`  AI 区 domainKey Top8：${topKeys.map(([k, n]) => `${k}=${n}`).join(" / ")}`);
console.log(
  topKeys.length >= 3
    ? "  ✅ AI 区可细分（≥3 个领域键有实质人口）"
    : "  ⚠️ AI 区细分键过少（细分 tab 会退化成单列表）",
);

console.log(
  "\n[标定声明] 全部为线上数据实测；判据阈值（60% 压扁线 / 0.5 高乐趣线 / 90% 重合线）" +
    "为本轮设定的**可复核线**，不是栗子拍的口径——如需改线，改本文件常量即可复跑。",
);
