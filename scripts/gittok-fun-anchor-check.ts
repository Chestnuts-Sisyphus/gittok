/**
 * V-B1 乐趣判据在锚点集上的复现脚本。
 *
 * 判据体系（六维 + 合成公式）在 src/feed/taxonomy.ts；锚点集在 data/fun-anchors.json。
 * 本脚本读**全库当前判定结果**（data/feed.json 的 funScore / funDims），
 * 算「正锚点判高、负锚点判低」的复现率：
 *
 *   正锚点复现 = funScore ≥ bands.pos（默认 0.7）
 *   负锚点复现 = funScore ≤ bands.neg（默认 0.3）
 *   复现率 = 命中锚点数 / 锚点总数（中间地带不算命中也不算失败）
 *
 * 同时给出 hard=true 难例的单独复现率——普通样本猜对不算本事，难例对得上才说明判据拆到了本质。
 *
 * 用法（零参数；数据源固定 data/feed.json + data/fun-anchors.json）：
 *   npx tsx scripts/gittok-fun-anchor-check.ts
 */

import fs from "node:fs";
import path from "node:path";
import { FUN_DIMS } from "../src/feed/taxonomy.ts";

interface Anchor {
  repo: string;
  label: "pos" | "neg";
  hard?: boolean;
  why: string;
  /** 判据与锚点结论相反、原样保留等栗子裁的条目（不计入「剔除争议」口径） */
  disputed?: boolean;
  dispute?: string;
}

interface AnchorFile {
  bands: { pos: number; neg: number };
  anchors: Anchor[];
}

interface Card {
  repo: string;
  funScore?: number;
  funDims?: Record<string, number>;
  legacyFunScore?: number;
  zone?: string;
  legacyZone?: string;
  funReason?: string;
}

const DATA = path.resolve(process.cwd(), "data");

function readJson<T>(name: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA, name), "utf-8")) as T;
}

/** 验收线：锚点复现率下限（栗子口径）。 */
const MIN_REPRODUCE = 0.85;

function main(): boolean {
  const { bands, anchors } = readJson<AnchorFile>("fun-anchors.json");
  const cards = readJson<Card[]>("feed.json");
  const byRepo = new Map(cards.map((c) => [c.repo, c]));

  let hit = 0;
  let mid = 0;
  let miss = 0;
  // 争议锚点（disputed=true）单独统计：同时报「全量」与「剔除争议」两个口径，
  // 不靠删除锚点来凑指标（任务书：锚点集是提案，栗子删改增补后才定稿）。
  let dTotal = 0;
  let dHit = 0;
  let hardHit = 0;
  let hardTotal = 0;
  const misses: string[] = [];

  for (const a of anchors) {
    const card = byRepo.get(a.repo);
    if (!card) {
      miss++;
      misses.push(`${a.repo}（不在全库里）`);
      continue;
    }
    if (a.hard) hardTotal++;
    if (a.disputed) dTotal++;
    const fun = typeof card.funScore === "number" ? card.funScore : NaN;
    const ok = a.label === "pos" ? fun >= bands.pos : fun <= bands.neg;
    const midBand = a.label === "pos" ? fun >= bands.neg : fun <= bands.pos;
    if (ok) {
      hit++;
      if (a.hard) hardHit++;
      if (a.disputed) dHit++;
    } else if (midBand) {
      // 落在中间地带：判据没有明确表态，不计入复现率分子，也不当失败
      mid++;
    } else {
      miss++;
      if (a.hard) {
        // 难例失败单独记（最值得看的就是这些）
      }
      misses.push(
        `${a.repo} [${a.label}${a.hard ? "/难例" : ""}] fun=${Number.isFinite(fun) ? fun.toFixed(2) : "无"}` +
          `（期望 ${a.label === "pos" ? "≥" : "≤"} ${a.label === "pos" ? bands.pos : bands.neg}）` +
          `${card.funReason ? `｜模型理由：${card.funReason}` : ""}`,
      );
    }
  }

  const judged = anchors.length;
  const rate = judged === 0 ? 0 : hit / judged;
  console.log("[V-B1] 乐趣判据复现（锚点集）");
  console.log(
    `  锚点 ${judged} 张（正 ${anchors.filter((a) => a.label === "pos").length} / 负 ${anchors.filter((a) => a.label === "neg").length}，其中难例 ${hardTotal} 张）`,
  );
  console.log(
    `  命中 ${hit}｜中间地带 ${mid}｜错判 ${miss}｜复现率 ${(rate * 100).toFixed(1)}%（要求 ≥${MIN_REPRODUCE * 100}%）`,
  );
  if (hardTotal > 0) {
    console.log(`  难例复现 ${hardHit}/${hardTotal}（${((hardHit / hardTotal) * 100).toFixed(1)}%）`);
  }
  if (dTotal > 0) {
    const kept = judged - dTotal;
    const keptHit = hit - dHit;
    console.log(
      `  争议锚点 ${dTotal} 条（判据与锚点结论相反，原样保留等栗子裁）｜剔除争议口径：${keptHit}/${kept} = ${((keptHit / kept) * 100).toFixed(1)}%`,
    );
  }
  console.log("");
  console.log(`  六维：${FUN_DIMS.map((d) => d.cn).join(" / ")}`);
  console.log("");

  if (misses.length > 0) {
    console.log(`错判清单（${misses.length} 条）：`);
    for (const m of misses.slice(0, 30)) console.log(`  x ${m}`);
    console.log("");
  }

  if (rate < MIN_REPRODUCE) {
    console.error(`[V-B1] 不通过：复现率 ${(rate * 100).toFixed(1)}% 低于 ${MIN_REPRODUCE * 100}%`);
    return false;
  }
  console.log(`[V-B1] 通过：判据在锚点集上复现率 ${(rate * 100).toFixed(1)}%`);
  return true;
}

if (!main()) throw new Error("[V-B1] 不通过");
