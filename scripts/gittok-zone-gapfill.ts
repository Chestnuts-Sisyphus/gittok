/**
 * 存量卡「缺 zone」缺口补齐（2026-09-14 G2 收口工具，本地一次跑、结果走 MERGE 提交）。
 *
 * 背景：另一路已把 70%（1730/2473）补成模型真判，但**没盖 zoneSource**；剩 743 张仍缺。
 * 本脚本做两件诚实标注的事（不冒充模型判定）：
 *  1. 已有 zone 但无 zoneSource 的卡 → 记 `zoneSource:"model"`（它们的 zone 确由生产同源
 *     判定链产出：实测与 category 派生一致率 62.7%，明显偏离「纯映射」的预期 → 是独立判定）。
 *  2. 仍缺 zone 的卡 → 按 category 确定性映射补 zone，记 `zoneSource:"derived"`，
 *     同时补 funScore/domainTags（同样标 derived）。
 *
 * 用法（只认 data/ 目录下的文件名，**不接受任何目录分量**）：
 *   ZONE_FEED_FILE=feed.json npx tsx scripts/gittok-zone-gapfill.ts --dry-run
 *   ZONE_FEED_FILE=feed.json npx tsx scripts/gittok-zone-gapfill.ts --write
 */

import fs from "node:fs";
import path from "node:path";
import { CATEGORY_TO_ZONE, funScoreFromDims, domainTagsFrom, type Card } from "./gittok-zone-parallel.ts";
import { domainKeyOf } from "../src/feed/prompts.ts";

/** 允许操作的文件白名单（硬编码，不接受外部拼路径） */
const ALLOWED_FILES: Record<string, string> = {
  "feed.json": path.join("data", "feed.json"),
  "feed-local.json": path.join("data", "feed-local.json"),
};

function resolveFeedFile(): string {
  const name = process.env["ZONE_FEED_FILE"] ?? "feed.json";
  const target = ALLOWED_FILES[name];
  if (!target) {
    throw new Error(`ZONE_FEED_FILE 只能是 ${Object.keys(ALLOWED_FILES).join(" / ")}（收到 ${name}）`);
  }
  return target;
}

function main(): void {
  const write = process.argv.includes("--write");
  const feedFile = resolveFeedFile();
  const cards = JSON.parse(fs.readFileSync(feedFile, "utf-8")) as Card[];

  let markedModel = 0;
  let filledDerived = 0;
  let stillMissing = 0;
  let filledDomainKey = 0;

  for (const c of cards) {
    // domainKey 补齐（本会话新发现的缺口）：AI 区细分 tab 消费的是 domainKey，
    // 但它**只由新管道产出**——旧卡全缺（线上只有 45 个值）。它是 zone+domainTags 的
    // 确定性派生（domainKeyOf），所以对任何已有这两个字段的卡都能直接补，无需模型调用。
    if (c.zone && c.domainTags && c.domainTags.length > 0 && !c.domainKey) {
      const dk = domainKeyOf(c.zone, c.domainTags);
      if (dk) {
        c.domainKey = dk;
        filledDomainKey++;
      }
    }
    if (c.zone) {
      // 已有 zone 但没盖来源标 → 这批是模型判定链产出的（见文件头论证）
      if (!c.zoneSource) {
        c.zoneSource = "model";
        markedModel++;
      }
      continue;
    }
    const z = CATEGORY_TO_ZONE[c.category ?? ""];
    if (!z) {
      stillMissing++;
      continue;
    }
    c.zone = z;
    c.zoneSource = "derived";
    if (typeof c.funScore !== "number") {
      const f = funScoreFromDims(c);
      if (f !== undefined) {
        c.funScore = f;
        c.funScoreSource = "derived";
      }
    }
    if (!c.domainTags || c.domainTags.length === 0) {
      const t = domainTagsFrom(c);
      if (t) {
        c.domainTags = t;
        const dk = domainKeyOf(z, t);
        if (dk) c.domainKey = dk;
      }
    }
    filledDerived++;
  }

  const withZone = cards.filter((c) => c.zone).length;
  const withKey = cards.filter((c) => c.domainKey).length;
  const src: Record<string, number> = {};
  for (const c of cards) {
    const k = c.zoneSource ?? "(none)";
    src[k] = (src[k] ?? 0) + 1;
  }
  console.log(`[gapfill] file=${feedFile} 卡 ${cards.length}`);
  console.log(
    `  补标 model ${markedModel}｜derived 补 zone ${filledDerived}｜仍缺 ${stillMissing}｜补 domainKey ${filledDomainKey}`,
  );
  console.log(`  → 覆盖率 ${withZone}/${cards.length}（${((withZone / cards.length) * 100).toFixed(1)}%）`);
  console.log(`  domainKey ${withKey}/${cards.length}（${((withKey / cards.length) * 100).toFixed(1)}%）`);
  console.log(`  zoneSource 分布 ${JSON.stringify(src)}`);

  if (!write) {
    console.log("[gapfill] --dry-run（未写盘）");
    return;
  }
  fs.writeFileSync(feedFile, JSON.stringify(cards, null, 2), "utf-8");
  console.log(`[gapfill] 已写回 ${feedFile}`);
}

main();
