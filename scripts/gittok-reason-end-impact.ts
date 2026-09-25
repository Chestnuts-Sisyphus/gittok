/**
 * 一次性核算（只读，跑完即删）：九轮 T4 的断句规则若进 `cardChecks`（硬），会让推荐池少多少张？
 * 口径：逐卡跑生产闸，把失败项分成「只因断句」与「另有别的」两类。
 * 用法：npx tsx scripts/gittok-reason-end-impact.ts
 */
import fs from "node:fs";

import { cardChecks } from "../src/feed/checks.ts";
import type { ScoringResult } from "../src/feed/types.ts";

const cards = JSON.parse(fs.readFileSync("data/feed.json", "utf8")) as Array<Record<string, unknown>>;
let onlyEnd = 0;
let otherFail = 0;
let passAll = 0;
for (const c of cards) {
  const pseudo = {
    repo: c["repo"],
    aiDims: [],
    aiDim: "",
    aiScore: 0.5,
    zone: c["zone"],
    funScore: c["funScore"],
    tags: c["domainTags"],
    facts: c["facts"],
    summaryCn: c["summaryCn"],
    reasonCn: c["reasonCn"],
    detailCn: (c["detailCn"] as string) || undefined,
  } as unknown as ScoringResult;
  const fails = cardChecks(pseudo).fails;
  const endOnly = fails.filter((f) => f.includes("结尾不是句末标点"));
  const rest = fails.filter((f) => !f.includes("结尾不是句末标点"));
  if (endOnly.length === 0 && rest.length === 0) passAll++;
  else if (rest.length === 0) onlyEnd++;
  else otherFail++;
}
console.log(
  `全过 ${passAll} 张｜**只因断句被剔 ${onlyEnd} 张**（＝硬闸的净影响）｜另有别的不过 ${otherFail} 张｜合计 ${cards.length}`,
);
