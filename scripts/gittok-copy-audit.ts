/**
 * 全库文案复检报表（COPY-01/02/03 + GATE-03）——**只报表，不拦停**（退出码恒 0）。
 *
 * 单一事实源：判定直接复用生产闸 `src/feed/checks.ts` 的 `cardChecks`，
 * 本脚本**不写任何一条自己的文案判据**；伪卡组装口径抄 `scripts/gittok-recopy.ts` 的 `gateOf()`（:135-149）：
 * 卡上的 `tags` 是 Tag 对象数组，LLM 域词在 **`domainTags`**——必须传 `domainTags`，
 * 否则 `validateScoringResult` 会把对象当字符串 `.trim()` 直接抛错。
 *
 * 为什么会存在这个脚本：`cardChecks` 只在「LLM 新返回值」上跑（`src/feed/index.ts:1018`、`:1401`），
 * 存量卡走 `loadExistingScores` 白名单原样回灌，永不再过闸 → 全库真实合格率此前**无人知道**。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-copy-audit.ts                        # 本机 data/feed.json
 *   npx tsx scripts/gittok-copy-audit.ts --top=30              # 明细清单长度
 *   npx tsx scripts/gittok-copy-audit.ts --details=data/feed-details.json   # 卡上无 detailCn 时按 repo 回退
 *   npx tsx scripts/gittok-copy-audit.ts --url=https://chestnuts-sisyphus.github.io/gittok/data/feed.json \
 *     --details-url=https://chestnuts-sisyphus.github.io/gittok/data/feed-details.json   # 线上口径
 *
 * 纪律：不改 `cardChecks`、不改 `taxonomy.ts`、不改 `prompts.ts` 行为、不手改 `data/feed.json`。
 */

import fs from "node:fs";
import path from "node:path";
import { cardChecks } from "../src/feed/checks.ts";
import type { ScoringResult } from "../src/feed/types.ts";

interface Card {
  repo: string;
  zone?: string;
  funScore?: number;
  /** 卡上是 Tag 对象数组（{name,source,weight}），**不能**直接喂给闸。 */
  tags?: unknown;
  /** LLM 域词（字符串数组）——`gateOf` 要的是这个。 */
  domainTags?: string[];
  facts?: unknown[];
  summaryCn?: string;
  reasonCn?: string;
  detailCn?: string;
  [k: string]: unknown;
}

/** 失败原因 → 十大类（口径与任务书 A 段基线一一对应；一条 fail 至多归一类）。 */
const CATEGORIES: { name: string; match: (f: string) => boolean }[] = [
  { name: "套话开头", match: (f) => f.includes("禁止套话开头") },
  { name: "摘要与深度解读首段重复", match: (f) => f.includes("深度解读开头重复") },
  { name: "一句话描述字数越界", match: (f) => /^一句话描述 \d+ 字/.test(f) },
  { name: "深度解读超长", match: (f) => f.includes("超过 800 字上限") },
  { name: "段数不在 3-5", match: (f) => /^深度解读 \d+ 段/.test(f) },
  { name: "时效断言（星数/突破）", match: (f) => f.includes("含时效断言") },
  { name: "无上手内容", match: (f) => f.includes("未见安装/上手内容") },
  { name: "深度解读偏短", match: (f) => /^深度解读 \d+ 字（硬性要求 500-800/.test(f) },
  { name: "序号模板痕迹", match: (f) => f.includes("模板痕迹") },
  { name: "简要介绍 effLen<100", match: (f) => f.includes("简要介绍等效长度") },
];

function arg(name: string): string | null {
  const p = process.argv.find((a) => a.startsWith(`--${name}=`));
  return p ? p.slice(name.length + 3) : null;
}

/** 本地路径或 URL 都读成 JSON 数组（线上口径靠 `--url` / `--details-url`）。 */
async function loadJson(target: string | null, label: string): Promise<unknown | null> {
  if (!target) return null;
  if (/^https?:\/\//.test(target)) {
    const res = await fetch(target);
    if (!res.ok) throw new Error(`${label} 拉取失败 HTTP ${res.status}`);
    return (await res.json()) as unknown;
  }
  const abs = path.resolve(process.cwd(), target);
  if (!fs.existsSync(abs)) {
    console.log(`⚠ ${label} 不存在：${abs}（跳过该项）`);
    return null;
  }
  return JSON.parse(fs.readFileSync(abs, "utf-8")) as unknown;
}

function detailIndex(raw: unknown): Map<string, string> {
  const m = new Map<string, string>();
  if (Array.isArray(raw)) {
    for (const e of raw) {
      const o = e as { repo?: string; detailCn?: string };
      if (o?.repo && typeof o.detailCn === "string") m.set(o.repo, o.detailCn);
    }
  } else if (raw && typeof raw === "object") {
    for (const [repo, v] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof v === "string") m.set(repo, v);
      else {
        const o = v as { detailCn?: string };
        if (typeof o?.detailCn === "string") m.set(repo, o.detailCn);
      }
    }
  }
  return m;
}

function pct(n: number, total: number): string {
  return `${((n / total) * 100).toFixed(1)}%`;
}

/** 失败文案归一：数字抹成 N 并截断，便于同类合并计数。 */
function normReason(f: string): string {
  return f.replace(/\d+(\.\d+)?/g, "N").slice(0, 52);
}

async function main(): Promise<void> {
  const topN = Number(arg("top") ?? 20);
  const feedTarget = arg("feed") ?? arg("url") ?? "data/feed.json";
  const detailsTarget = arg("details") ?? arg("details-url");

  const feedRaw = await loadJson(feedTarget, "数据源");
  if (!Array.isArray(feedRaw)) throw new Error("数据源不是数组（feed.json 结构异常）");
  const cards = feedRaw as Card[];
  const details = detailIndex(await loadJson(detailsTarget, "详情表"));

  const catHits = new Map<string, string[]>(CATEGORIES.map((c) => [c.name, []]));
  const other = new Map<string, number>();
  const reasonTally = new Map<string, number>();
  const perCard = new Map<string, string[]>();
  let fail = 0;
  let factsMissing = 0;
  let detailKeysMissing = 0;
  let gateThrew = 0;
  let sumOver35 = 0;
  let sumUnder20 = 0;
  let sumMax = 0;
  let sumMaxRepo = "";
  const extremes: { repo: string; len: number }[] = [];

  for (const c of cards) {
    if (!c.repo) continue;
    if (c.facts === undefined) factsMissing++;
    const detailOwn = typeof c.detailCn === "string" ? c.detailCn : "";
    const detail = detailOwn || (details.get(c.repo) ?? "");
    if (!detailOwn && details.size > 0) {
      if (!details.has(c.repo)) detailKeysMissing++;
    }
    const s = c.summaryCn ?? "";
    if (s.length > 35) sumOver35++;
    if (s.length < 20) sumUnder20++;
    if (s.length > sumMax) {
      sumMax = s.length;
      sumMaxRepo = c.repo;
    }
    if (detail.length < 500) extremes.push({ repo: c.repo, len: detail.length });

    const pseudo = {
      repo: c.repo,
      aiDims: [],
      aiDim: "",
      aiScore: 0.5,
      zone: c.zone,
      funScore: c.funScore,
      tags: c.domainTags,
      facts: c.facts as ScoringResult["facts"],
      summaryCn: c.summaryCn,
      reasonCn: c.reasonCn,
      detailCn: detail || undefined,
    } as unknown as ScoringResult;

    let fails: string[];
    try {
      fails = cardChecks(pseudo).fails;
    } catch (e) {
      gateThrew++;
      fail++;
      const k = `闸本身抛错：${(e as Error).message.slice(0, 40)}`;
      other.set(k, (other.get(k) ?? 0) + 1);
      continue;
    }
    if (fails.length === 0) continue;
    fail++;
    perCard.set(c.repo, fails);
    for (const f of fails) {
      const key = normReason(f);
      reasonTally.set(key, (reasonTally.get(key) ?? 0) + 1);
      const cat = CATEGORIES.find((k) => k.match(f));
      if (cat) catHits.get(cat.name)!.push(c.repo);
      else other.set(key, (other.get(key) ?? 0) + 1);
    }
  }

  const total = cards.length;
  console.log(`【GitTok 全库文案复检】数据源 ${feedTarget}`);
  console.log(
    `共 ${total} 张｜不过现行生产闸 ${fail} 张（${pct(fail, total)}）｜合格 ${total - fail}（${pct(total - fail, total)}）`,
  );
  console.log("");
  console.log("—— 十大类失败分布（按命中卡数，一卡可命中多类）——");
  for (const [name, repos] of [...catHits.entries()].sort((a, b) => b[1].length - a[1].length)) {
    const uniq = new Set(repos).size;
    console.log(`${String(uniq).padStart(5)} ${name}（${pct(uniq, total)}）`);
  }
  if (other.size > 0) {
    console.log("");
    console.log("—— 未归入十类其余闸项（代码块/推广词/合法性闸等）——");
    for (const [k, v] of [...other.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`${String(v).padStart(5)} ${k}`);
    }
  }

  console.log("");
  console.log("—— 单条失败原因排行 TOP " + topN + "（数字归一为 N）——");
  for (const [k, v] of [...reasonTally.entries()].sort((a, b) => b[1] - a[1]).slice(0, topN)) {
    console.log(`${String(v).padStart(5)} ${k}`);
  }

  console.log("");
  console.log("—— facts 缺口（COPY-04 单列项）——");
  console.log(`「facts 键缺失」${factsMissing} 张（${pct(factsMissing, total)}）`);
  console.log(
    "  ⚠ 提示：`src/feed/prompts.ts:410` 是 `if (sc.facts !== undefined)`——键缺失即整段 facts 闸被跳过；",
  );
  console.log(
    "     `src/feed/card-invariants.ts:25-62` 三清单亦不含 facts → 结构闸也不看。修复提案见报表末。",
  );

  console.log("");
  console.log("—— 极端卡（「只有一句话」实体）——");
  const buckets = [100, 250, 500];
  for (const b of buckets) {
    console.log(`detailCn <${b} 字：${extremes.filter((e) => e.len < b).length} 张`);
  }
  extremes.sort((a, b) => a.len - b.len);
  console.log(`最短 TOP ${Math.min(25, topN + 5)}：`);
  for (const e of extremes.slice(0, Math.min(25, topN + 5))) {
    console.log(`  ${String(e.len).padStart(5)} 字  ${e.repo}`);
  }
  console.log(
    `summaryCn 最长 ${sumMax} 字（${sumMaxRepo}）｜>35 字 ${sumOver35} 张｜<20 字 ${sumUnder20} 张`,
  );
  if (detailsTarget) {
    console.log(
      `详情表回退：${detailsTarget} 共 ${details.size} 条｜feed 有卡但详情表缺键 ${detailKeysMissing} 张`,
    );
  }

  console.log("");
  console.log(`—— 失败项最多 TOP ${topN} 明细 repo 清单 ——`);
  const worst = [...perCard.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, topN);
  for (const [repo, fails] of worst) {
    console.log(`${repo}（${fails.length} 项）→ ${fails.map((f) => f.slice(0, 30)).join("；")}`);
  }

  console.log("");
  console.log("—— prompts.ts:410 修复提案（**只提案不落地**，改生产闸语义属等裁）——");
  console.log("  把 `if (sc.facts !== undefined)` 改成「缺 facts 键 == 不达标」（push 一条 fail），");
  console.log("  并把 facts 加进 `src/feed/card-invariants.ts` 的 SOFT 清单（软告警不拦停）。");
  console.log(
    `  影响面量化：一旦落地，本机 ${total} 张里 ${factsMissing} 张立刻判不合格（占 ${pct(factsMissing, total)}）→ CI 口径需同步，故必须栗子裁。`,
  );
  console.log("");
  console.log("退出码 0：本脚本先做报表不做拦截（G-01 验收口径）。");
  console.log(`合计核对：不合格 ${fail} 张｜闸抛错 ${gateThrew} 张`);
}

void main();
