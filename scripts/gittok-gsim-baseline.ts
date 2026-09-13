/**
 * G-sim 相似度基线测量（2026-09-14）：给「卡间开头/正文相似度」做直方图，
 * 供后续阈值标定（与 G9 同款「直方图切谷底」方法）。
 *
 * 现状（证明等级标注）：G-sim 是千人千面阶段的**设计件**（沉淀 §3 P1「G-sim 1000 卡标定」），
 * 生产管道当前不产出该阶段的专用字段（facts 已有产但入库裁剪）；本脚本先给「可复算的基线」：
 *   - 全库 detailCn 首句两两 Jaccard 直方图（按分桶采样，避免 O(n²) 爆炸）
 *   - 词袋 Jaccard（3-gram 汉字 + 英文词），先验阈值 0.35 参考线
 * 1000 卡批次上跑完即可用同一脚本重算并切谷底。
 *
 * 用法：npx tsx scripts/gittok-gsim-baseline.ts [--sample=300] [--bin=0.05]
 */

import fs from "node:fs";

const FEED = "data/feed.json";

interface Card {
  repo: string;
  detailCn?: string;
  zone?: string;
}

/** 词袋：中文 3-gram + 英文/数字词（小写） */
export function bagOf(text: string): Set<string> {
  const bag = new Set<string>();
  const t = (text ?? "").trim();
  if (!t) return bag;
  const han = t.replace(/[^\u4e00-\u9fff]+/g, "");
  for (let i = 0; i + 3 <= han.length; i++) bag.add(han.slice(i, i + 3));
  for (const w of t.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []) bag.add(`w:${w}`);
  return bag;
}

/** Jaccard 相似度 */
export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  for (const x of small) if (big.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

function argNum(name: string, dflt: number): number {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return dflt;
  const n = Number(hit.split("=")[1]);
  return Number.isFinite(n) && n > 0 ? n : dflt;
}

function main(): void {
  const sampleSize = argNum("sample", 300);
  const binW = argNum("bin", 0.05);
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const withDetail = cards.filter((c) => c.detailCn && c.detailCn.trim().length > 0);
  // 确定性抽样（步长抽样，非随机——同输入同输出）
  const step = Math.max(1, Math.floor(withDetail.length / sampleSize));
  const sample = withDetail.filter((_, i) => i % step === 0).slice(0, sampleSize);
  console.log(
    `[g-sim] 全库 ${cards.length} 卡，含 detail ${withDetail.length}，抽样 ${sample.length}（步长 ${step}）`,
  );

  const bags = sample.map((c) => bagOf(c.detailCn!));
  const bins = new Map<number, number>();
  let pairs = 0;
  let sum = 0;
  let max = 0;
  let over035 = 0;
  for (let i = 0; i < bags.length; i++) {
    for (let j = i + 1; j < bags.length; j++) {
      const s = jaccard(bags[i]!, bags[j]!);
      pairs++;
      sum += s;
      if (s > max) max = s;
      if (s >= 0.35) over035++;
      const b = Math.floor(s / binW);
      bins.set(b, (bins.get(b) ?? 0) + 1);
    }
  }
  console.log(`[g-sim] 对数 ${pairs}，均值 ${(sum / pairs).toFixed(4)}，最大 ${max.toFixed(4)}`);
  console.log(`[g-sim] ≥0.35（先验阈值）占比 ${((over035 / pairs) * 100).toFixed(3)}%`);
  console.log(`[g-sim] 直方图（bin=${binW}）：`);
  const keys = [...bins.keys()].sort((a, b) => a - b);
  for (const k of keys) {
    const lo = (k * binW).toFixed(2);
    const hi = ((k + 1) * binW).toFixed(2);
    const n = bins.get(k)!;
    const bar = "#".repeat(Math.min(60, Math.round((n / pairs) * 600)));
    console.log(`  ${lo}-${hi}  ${String(n).padStart(6)}  ${bar}`);
  }
  console.log("[g-sim] 提示：找「低谷 bin」= 阈值落点（G9 同款方法）。全库数据仅用于定标，不参与卡片生成。");
}

main();
