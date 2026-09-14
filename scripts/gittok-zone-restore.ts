/**
 * zone 数据恢复（2026-09-14 事故修补）：tier-drip 重建 feed.json 时把回填结果整片抹掉。
 *
 * 事故链【已实测】：
 *  1. gittok-zone-gapfill / zone-parallel 把 zone 回填进 data/feed.json（线上 100%）
 *  2. 随后 tier-drip 跑一轮：它从**自己的缓存**重建卡片并整份覆盖 feed.json，
 *     而缓存里没有 zone/funScore/domainTags/domainKey（这些是回填脚本写的、不进缓存）
 *  3. → 线上 zone 覆盖率 100% → 0.2%（2477 张只剩 4 张新卡自带 zone）
 *
 * 本脚本按 repo 为键，把旧提交里的判定字段「盖回」当前 feed（新卡不动、无判定不写）。
 *
 * 用法：
 *   ZONE_SOURCE_COMMIT=904028e npx tsx scripts/gittok-zone-restore.ts --write
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const FEED = path.join("data", "feed.json");
const ALLOWED = /^[0-9a-f]{7,40}$/; // commit 只允许十六进制

interface Card {
  repo: string;
  zone?: string;
  zoneSource?: string;
  funScore?: number;
  funScoreSource?: string;
  domainTags?: string[];
  domainKey?: string;
}

function main(): void {
  const write = process.argv.includes("--write");
  const commit = process.env["ZONE_SOURCE_COMMIT"] ?? "";
  if (!ALLOWED.test(commit)) {
    throw new Error(`ZONE_SOURCE_COMMIT 必须是 git 十六进制哈希（收到「${commit}」）`);
  }

  // execFileSync（非 shell 字符串）+ 已校验的哈希 → 无注入面
  const oldText = execFileSync("git", ["show", `${commit}:data/feed.json`], {
    encoding: "utf-8",
    maxBuffer: 1 << 30,
  });
  const donor = JSON.parse(oldText) as Card[];
  const current = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];

  const donorByRepo = new Map(donor.map((c) => [c.repo, c] as const));
  let restoredZone = 0;
  let restoredFun = 0;
  let restoredTags = 0;
  let restoredKey = 0;
  let keptExisting = 0;

  for (const c of current) {
    const d = donorByRepo.get(c.repo);
    if (!d) continue;
    if (c.zone) {
      keptExisting++; // 当前已有判定（如新卡自带）→ 不覆盖
      continue;
    }
    if (d.zone) {
      c.zone = d.zone;
      c.zoneSource = d.zoneSource;
      restoredZone++;
    }
    if (typeof c.funScore !== "number" && typeof d.funScore === "number") {
      c.funScore = d.funScore;
      c.funScoreSource = d.funScoreSource;
      restoredFun++;
    }
    if ((!c.domainTags || c.domainTags.length === 0) && d.domainTags && d.domainTags.length > 0) {
      c.domainTags = d.domainTags;
      restoredTags++;
    }
    if (!c.domainKey && d.domainKey) {
      c.domainKey = d.domainKey;
      restoredKey++;
    }
  }

  const n = current.length;
  const z = current.filter((c) => c.zone).length;
  const src: Record<string, number> = {};
  for (const c of current) {
    const k = c.zoneSource ?? "(none)";
    src[k] = (src[k] ?? 0) + 1;
  }
  console.log(`[restore] donor=${commit}（${donor.length} 卡） → 当前 feed ${n} 卡`);
  console.log(
    `  恢复 zone ${restoredZone}｜funScore ${restoredFun}｜domainTags ${restoredTags}｜domainKey ${restoredKey}` +
      `｜已有判定保留 ${keptExisting}`,
  );
  console.log(`  → zone 覆盖率 ${z}/${n}（${((z / n) * 100).toFixed(1)}%）`);
  console.log(`  zoneSource 分布 ${JSON.stringify(src)}`);
  console.log(
    `  domainKey ${current.filter((c) => c.domainKey).length}｜funScore ${current.filter((c) => typeof c.funScore === "number").length}`,
  );

  if (!write) {
    console.log("[restore] --dry-run（未写盘）");
    return;
  }
  fs.writeFileSync(FEED, JSON.stringify(current, null, 2), "utf-8");
  console.log(`[restore] 已写回 ${FEED}`);
}

main();
