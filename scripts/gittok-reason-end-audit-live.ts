/**
 * 线上反查：把**线上**那份 feed.json 拉下来，用与审计同一个口径（taxonomy.endsWithSentenceEnd）
 * 数一遍断句违约 —— 证「清账真的上线了」，而不是只说本地绿。
 *
 * 用法：npx tsx scripts/gittok-reason-end-audit-live.ts
 */
import { endsWithSentenceEnd } from "../src/feed/taxonomy.ts";

const SITE = "https://chestnuts-sisyphus.github.io/gittok/";
const url = `${SITE}data/feed.json`;

const res = await fetch(url, { redirect: "follow" });
if (!res.ok) {
  console.error(`拉取失败：${res.status} ${url}`);
  process.exit(2);
}
const cards = (await res.json()) as Array<Record<string, unknown>>;
const bad = cards.filter((c) => {
  const r = typeof c["reasonCn"] === "string" ? (c["reasonCn"] as string).trim() : "";
  return r.length > 0 && !endsWithSentenceEnd(r);
});
const lens = bad.map((c) => String(c["reasonCn"]).length).sort((a, b) => a - b);
console.log(`线上 ${url}`);
console.log(`  卡片 ${cards.length} 张｜**断句违约 ${bad.length} 张**（口径＝taxonomy.endsWithSentenceEnd）`);
for (const c of bad.slice(0, 5)) {
  console.log(
    `  · ${String(c["repo"])}（${String(c["reasonCn"]).length} 字）…${String(c["reasonCn"]).trim().slice(-24)}`,
  );
}
console.log(`  长度分布：${lens.length ? `min ${lens[0]} / max ${lens.at(-1)}` : "（无）"}`);
process.exit(bad.length === 0 ? 0 : 1);
