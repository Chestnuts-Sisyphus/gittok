/**
 * v3 重判结果提升（把工作副本的判定字段合并进正式 feed.json）。
 *
 * 分工：
 *  - 工作副本 `data/rejudge-test.json`：重判驱动（gittok-rejudge-v3.ts）的写入对象，
 *    可以分批、可续跑、可与别的进程隔离；
 *  - 正式 `data/feed.json`：站点数据源，只在整批完成后提升一次，避免半成品上线。
 *
 * 只搬运**判定字段**（zone/funScore/六维/领域词/理由/旧值对照），正文文案原样保留。
 * 提升前后各报一次覆盖率，并调用不变量闸（结构 + 字段回退）做放行判定。
 *
 * 用法（零参数；路径固定）：
 *   npx tsx scripts/gittok-promote-v3.ts
 */

import fs from "node:fs";
import path from "node:path";
import { checkCardInvariants, checkFieldRegression, formatInvariantReport } from "../src/feed/card-invariants.ts";
import { acquireWriteLock } from "../src/feed/file-lock.ts";

const DATA = path.resolve(process.cwd(), "data");
const BASE = path.join(DATA, "feed.json");
const WORK = path.join(DATA, "rejudge-test.json");

/** 判定字段白名单：只搬这些（正文文案不动）。 */
const JUDGE_FIELDS = [
  "zone",
  "zoneSource",
  "funScore",
  "funScoreSource",
  "funDims",
  "legacyZone",
  "legacyFunScore",
  "zoneReason",
  "funReason",
  "domainTags",
  "domainKey",
] as const;

function atomicWrite(file: string, text: string): void {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, file);
}

function coverage(cards: Record<string, unknown>[]): string {
  const n = cards.length;
  const withZone = cards.filter((c) => typeof c["zone"] === "string" && c["zone"]).length;
  const withDims = cards.filter((c) => {
    const d = c["funDims"];
    return d && typeof d === "object" && Object.keys(d as object).length > 0;
  }).length;
  const withLegacy = cards.filter((c) => typeof c["legacyZone"] === "string" && c["legacyZone"]).length;
  return `zone ${withZone}/${n}｜funDims ${withDims}/${n}｜legacyZone ${withLegacy}/${n}`;
}

function main(): boolean {
  // D1：写正式库前拿锁（本地单写入者）。CI 侧靠 workflow 的 concurrency group 串行化。
  const release = acquireWriteLock(path.join(DATA, "feed.json.lock"), {
    label: "promote-v3",
    ttlMs: 10 * 60_000,
  });
  try {
    return run();
  } finally {
    release();
  }
}

function run(): boolean {
  const base = JSON.parse(fs.readFileSync(BASE, "utf-8")) as Record<string, unknown>[];
  const work = JSON.parse(fs.readFileSync(WORK, "utf-8")) as Record<string, unknown>[];
  const byRepo = new Map(work.map((c) => [String(c["repo"]), c] as const));

  console.log(`[promote-v3] 正式 ${base.length} 张｜工作副本 ${work.length} 张`);
  console.log(`  提升前：${coverage(base)}`);

  // 快照（字段回退闸需要上一版对照；同时保底可回滚）
  atomicWrite(path.join(DATA, "feed.prev.json"), JSON.stringify(base, null, 2));

  let moved = 0;
  let skipped = 0;
  for (const c of base) {
    const w = byRepo.get(String(c["repo"]));
    if (!w) {
      skipped++;
      continue;
    }
    // 只有工作副本真的判过（有 funDims 或 zoneReason）才搬，避免把未判卡的空值覆盖进正式库
    const judged = (w["funDims"] && typeof w["funDims"] === "object") || typeof w["zoneReason"] === "string";
    if (!judged) {
      skipped++;
      continue;
    }
    for (const f of JUDGE_FIELDS) {
      if (w[f] !== undefined) c[f] = w[f];
    }
    moved++;
  }
  console.log(`  搬运 ${moved} 张（跳过 ${skipped} 张：工作副本未判或不在库）`);
  console.log(`  提升后：${coverage(base)}`);

  const report = checkCardInvariants(base);
  const regressions = checkFieldRegression(
    JSON.parse(fs.readFileSync(path.join(DATA, "feed.prev.json"), "utf-8")) as Record<string, unknown>[],
    base,
  );
  console.log("");
  console.log(formatInvariantReport(report));
  console.log(`字段回退闸：${regressions.length} 处`);
  for (const r of regressions.slice(0, 10)) console.log(`  x ${r.repo} [${r.field}] ${r.why}`);

  if (!report.ok || regressions.length > 0) {
    console.error("[promote-v3] 不变量闸不通过 → **不写盘**（正式库保持原样）");
    return false;
  }
  atomicWrite(BASE, JSON.stringify(base, null, 2));
  console.log("[promote-v3] 已写盘 data/feed.json（快照在 data/feed.prev.json）");
  return true;
}

if (!main()) throw new Error("[promote-v3] 不通过（见上方 x 行）");
