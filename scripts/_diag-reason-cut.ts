import { cardChecks, effLen } from "../src/feed/checks.ts";
import { fitReason, reasonWithinContract } from "../src/feed/index.ts";
import fs from "fs";

const cards = JSON.parse(fs.readFileSync("data/feed.json", "utf8"));
const repos = [
  "anywhere-labs/dsh-desktop",
  "henrygd/beszel",
  "BerriAI/litellm",
  "Jakubantalik/Libraries.dev",
];
function kind(f: string): string {
  if (f.includes("重复")) return "摘要与解读重复";
  if (f.startsWith("一句话描述")) return "摘要字数";
  if (f.startsWith("简要介绍")) return "简介字数";
  if (f.startsWith("深度解读") && f.includes("字（")) return "解读字数";
  if (f.startsWith("深度解读") && f.includes("段")) return "解读段数";
  if (f.includes("套路话")) return "开场套话";
  if (f.includes("时效断言")) return "时效词";
  if (f.includes("推广")) return "推广词";
  if (f.includes("安装/上手")) return "缺上手段";
  return "其它";
}
for (const repo of repos) {
  const c = cards.find((x: { repo: string }) => x.repo === repo) as Record<string, unknown> | undefined;
  if (!c) {
    console.log(repo, "MISSING");
    continue;
  }
  const before = String(c.reasonCn || "");
  const cut = fitReason(before);
  const pb = {
    repo: c.repo,
    aiDims: [],
    aiDim: "",
    aiScore: 0.5,
    zone: c.zone,
    funScore: c.funScore,
    tags: c.domainTags,
    facts: c.facts,
    summaryCn: c.summaryCn,
    reasonCn: before,
    detailCn: c.detailCn,
  };
  const pa = { ...pb, reasonCn: cut };
  const fb = cardChecks(pb as never).fails;
  const fa = cardChecks(pa as never).fails;
  const kb = new Set(fb.map(kind));
  const ka = new Set(fa.map(kind));
  const newK = [...ka].filter((k) => !kb.has(k));
  console.log(
    JSON.stringify({
      repo,
      beforeLen: before.length,
      cutLen: cut.length,
      cutEff: +effLen(cut).toFixed(1),
      within: reasonWithinContract(cut),
      newK,
      fa: fa.slice(0, 4),
      fb: fb.slice(0, 4),
    }),
  );
}
