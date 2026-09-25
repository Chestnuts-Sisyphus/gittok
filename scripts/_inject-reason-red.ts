/**
 * 六轮 G2 植入即红：造一张 reasonCn=151 字的卡，card-invariants 必须硬失败。
 * 复跑：npx tsx scripts/_inject-reason-red.ts
 */
import { checkCardInvariants } from "../src/feed/card-invariants.ts";
import { cardChecks } from "../src/feed/checks.ts";
import { REASON_MAX } from "../src/feed/taxonomy.ts";

const long = "汉".repeat(REASON_MAX + 1);
const short = "短".repeat(50);
const ok = "合".repeat(120);

const base = {
  repo: "inject/reason-red",
  summaryCn: "这是一句在二十到三十五个字范围内的标准摘要文案",
  detailCn: "x".repeat(600),
  zone: "工具",
  funScore: 0.5,
  domainTags: ["a", "b", "c"],
};

const rLong = checkCardInvariants([{ ...base, reasonCn: long }]);
const rShort = checkCardInvariants([{ ...base, reasonCn: short }]);
const rOk = checkCardInvariants([{ ...base, reasonCn: ok }]);

const gateLong = cardChecks({
  ...base,
  reasonCn: long,
  aiDims: [],
  aiDim: "",
  aiScore: 0.5,
  tags: base.domainTags,
} as never);

const longWhy = rLong.issues.filter((i) => i.field === "reasonCn");
const shortWhy = rShort.issues.filter((i) => i.field === "reasonCn");
const okWhy = rOk.issues.filter((i) => i.field === "reasonCn");
const gateHit = gateLong.fails.some((f) => f.includes("151") && f.includes("100-150"));
const pass = longWhy.length >= 1 && shortWhy.length >= 1 && okWhy.length === 0 && gateHit;

console.log(
  JSON.stringify(
    {
      longLen: long.length,
      shortLen: short.length,
      okLen: ok.length,
      invariants: {
        longReasonIssues: longWhy.map((i) => i.why),
        shortReasonIssues: shortWhy.map((i) => i.why),
        okReasonIssues: okWhy.map((i) => i.why),
      },
      gate: { longFails: gateLong.fails.filter((f) => f.startsWith("简要介绍")) },
      pass,
    },
    null,
    2,
  ),
);
process.exit(pass ? 0 : 1);
