/**
 * 一次性核算（只读）：剩下这 N 张断句违约卡里，有多少能用**确定性回退**修掉
 * （把尾巴截到最后一个句末标点，且结果仍在 100–150）。
 * 用法：npx tsx scripts/gittok-reason-end-trimcheck.ts
 */
import fs from "node:fs";

import { endsWithSentenceEnd, REASON_MIN, REASON_MAX } from "../src/feed/taxonomy.ts";

const cards = JSON.parse(fs.readFileSync("data/feed.json", "utf8")) as Array<Record<string, unknown>>;
const bad = cards.filter((c) => {
  const r = String(c["reasonCn"] ?? "").trim();
  return r.length > 0 && !endsWithSentenceEnd(r);
});
let trimmable = 0;
for (const c of bad) {
  const r = String(c["reasonCn"]).trim();
  const marks = [...r.matchAll(/[。！？…]/g)];
  const last = marks.length ? (marks[marks.length - 1].index as number) : -1;
  const cut = last >= 0 ? r.slice(0, last + 1) : "";
  const ok = cut.length >= REASON_MIN && cut.length <= REASON_MAX && endsWithSentenceEnd(cut);
  if (ok) trimmable++;
  console.log(
    `· ${String(c["repo"])}｜长度 ${r.length}｜回退到句末：${ok ? `可修（→ ${cut.length} 字）` : `不可（→ ${cut.length} 字）`}`,
  );
}
console.log(`共 ${bad.length} 张违约｜**确定性回退可修 ${trimmable} 张**（其余只能模型重写）`);
