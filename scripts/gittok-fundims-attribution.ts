/**
 * K-03（A4）funDims／language 空卡归因 —— 只读取证，不改判据、不写回。
 *
 * 要回答的两个问题：
 *   ① 111 张 funDims 空卡，逐张定性成三类：**新卡未过 v3** / **字段丢失** / **上游无数据**；
 *   ② 「0918 记的 69 张 → 现在 111 张」为什么扩量（增量从哪来）。
 *
 * 判据（全部来自仓库真实产物，不采信文档旧值）：
 *   - v3 重判名单：`data/rejudge-v31-state.json` 的 done（键＝repo）
 *   - 卡的来源：`source`（trending / tier / search / bigbro）与 `funScoreSource`/`zoneSource`
 *   - 「上游无数据」：language 与 desc 同时为空，且 topics 为空 → 连 repo 元数据都没取到
 *   - 「字段丢失」：在 v3 名单里（判过）但 funDims 仍空
 *   - 「新卡未过 v3」：不在 v3 名单里
 *
 * 用法：npx tsx scripts/gittok-fundims-attribution.ts [--out=D:/tmp/k04_fundims_attribution.md]
 */

import fs from "node:fs";
import path from "node:path";

interface Card {
  repo: string;
  language?: string;
  desc?: string;
  topics?: string[];
  funDims?: unknown[];
  funScore?: number;
  funScoreSource?: string;
  zoneSource?: string;
  aiDims?: string[];
  source?: string;
  ts?: string;
  summaryCn?: string;
  [k: string]: unknown;
}

const FEED = process.env["ATTR_FEED"] ?? path.join("data", "feed.json");
const V3_STATE = "data/rejudge-v31-state.json";
const argv = process.argv.slice(2);
const outArg = argv.find((a) => a.startsWith("--out="));
const OUT = outArg ? outArg.slice("--out=".length) : "D:/tmp/k04_fundims_attribution.md";

const empty = (v: unknown): boolean =>
  v === undefined || v === null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0);

function loadJson(p: string): unknown {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), p), "utf-8"));
}

const cards = loadJson(FEED) as Card[];
const v3 = loadJson(V3_STATE) as { updatedAt?: string; judgeVersion?: string; done?: Record<string, unknown> | unknown[] };
const v3done = new Set<string>(
  Array.isArray(v3.done) ? (v3.done as string[]) : Object.keys((v3.done as Record<string, unknown>) ?? {}),
);

const funEmpty = cards.filter((c) => empty(c.funDims));
const langEmpty = cards.filter((c) => empty(c.language));
const funEmptySet = new Set(funEmpty.map((c) => c.repo));
const bothEmpty = funEmpty.filter((c) => empty(c.language));

type Buckets = Record<"未过v3" | "字段丢失" | "上游无数据", Card[]>;
const buckets: Buckets = { 未过v3: [], 字段丢失: [], 上游无数据: [] };
for (const c of funEmpty) {
  if (empty(c.language) && empty(c.desc) && empty(c.topics)) buckets["上游无数据"].push(c);
  else if (v3done.has(c.repo)) buckets["字段丢失"].push(c);
  else buckets["未过v3"].push(c);
}

/** 按来源交叉表：看空卡集中在哪条进货渠道。 */
function bySource(list: Card[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const c of list) m.set(c.source ?? "（无 source）", (m.get(c.source ?? "（无 source）") ?? 0) + 1);
  return new Map([...m.entries()].sort((a, b) => b[1] - a[1]));
}

/** 扩量归因：把空卡按入库时间 ts 分桶，看 09-18 之后新增多少（对齐 69→111 的差值）。 */
function tsSplit(list: Card[]): { before: number; after: number; noTs: number; earliest: string; latest: string } {
  const CUT = "2026-09-18";
  let before = 0;
  let after = 0;
  let noTs = 0;
  const all: string[] = [];
  for (const c of list) {
    if (!c.ts) {
      noTs++;
      continue;
    }
    all.push(c.ts);
    if (c.ts.slice(0, 10) >= CUT) after++;
    else before++;
  }
  all.sort();
  return { before, after, noTs, earliest: all[0] ?? "-", latest: all[all.length - 1] ?? "-" };
}

const langOnly = langEmpty.filter((c) => !funEmptySet.has(c.repo));
const srcTab = bySource(funEmpty);
const ts = tsSplit(funEmpty);
const totalNew = cards.length;

const lines: string[] = [];
lines.push(`# K-03 funDims／language 空卡归因（只读，判据未动）`);
lines.push(``);
lines.push(`- 生成时间：${new Date().toISOString()}`);
lines.push(`- 数据源：\`${FEED}\`（${totalNew} 张）｜v3 名单：\`${V3_STATE}\`（done ${v3done.size} 条，judgeVersion ${v3.judgeVersion ?? "?"}，updatedAt ${v3.updatedAt?.slice(0, 16) ?? "?"}）`);
lines.push(``);
lines.push(`## 一、基数（本机实测，勿引文档旧值）`);
lines.push(``);
lines.push(`| 项 | 张数 | 占比 |`);
lines.push(`|---|---|---|`);
lines.push(`| funDims 空 | ${funEmpty.length} | ${((funEmpty.length / totalNew) * 100).toFixed(1)}% |`);
lines.push(`| language 空 | ${langEmpty.length} | ${((langEmpty.length / totalNew) * 100).toFixed(1)}% |`);
lines.push(`| 二者同时空（交集） | ${bothEmpty.length} | ${((bothEmpty.length / totalNew) * 100).toFixed(1)}% |`);
lines.push(`| 只 language 空、funDims 有 | ${langOnly.length} | ${((langOnly.length / totalNew) * 100).toFixed(1)}% |`);
lines.push(``);
lines.push(`## 二、111 张逐张定性（三类）`);
lines.push(``);
lines.push(`| 类别 | 判据 | 张数 |`);
lines.push(`|---|---|---|`);
lines.push(`| 新卡未过 v3 | 不在 \`${V3_STATE}\` 的 done 名单 | ${buckets["未过v3"].length} |`);
lines.push(`| 字段丢失 | 在 v3 名单里（判过）但 funDims 仍空 | ${buckets["字段丢失"].length} |`);
lines.push(`| 上游无数据 | language＋desc＋topics 三者同时空（连 repo 元数据都没取到） | ${buckets["上游无数据"].length} |`);
lines.push(``);
lines.push(`## 三、来源渠道交叉（空卡集中在哪条进货路）`);
lines.push(``);
for (const [s, n] of srcTab) lines.push(`- \`${s}\`：${n} 张`);
lines.push(``);
lines.push(`## 四、「69 → 111 为何扩量」`);
lines.push(``);
lines.push(`- 空卡按入库时间 ts 分桶：09-18 之前入库 ${ts.before} 张｜09-18 及之后 ${ts.after} 张｜无 ts ${ts.noTs} 张`);
lines.push(`- 空卡 ts 区间：${ts.earliest} ～ ${ts.latest}`);
lines.push(`- 全库现 ${totalNew} 张；0919-03 册收工口径记的是 2724 张、更早的 0918 记 69 张空。`);
lines.push(`  **结论看「09-18 及之后」这一桶**：若其数量 ≈ 111−69=42，则扩量原因是「CI 滴灌新卡天生不过 v3 重判」，不是存量字段在掉。`);
lines.push(`  注：\`data/feed.prev.json\` 是 09-17 03:14 的旧模式快照（其 2613 张 funDims **全空**，字段本身尚未落进该快照），`);
lines.push(`  **不能**拿它当 69 张的对照物——这一点本轮实测更正。`);
lines.push(``);
lines.push(`## 五、挂账清单（不补判，等裁；补判属判定链产物）`);
lines.push(``);
for (const [k, list] of Object.entries(buckets)) {
  lines.push(`### ${k}（${list.length} 张）`);
  lines.push(``);
  for (const c of list.slice(0, 120)) {
    lines.push(`- \`${c.repo}\`｜source=${c.source ?? "-"}｜funScoreSource=${c.funScoreSource ?? "-"}｜language=${c.language || "空"}｜ts=${c.ts?.slice(0, 10) ?? "-"}`);
  }
  if (list.length > 120) lines.push(`- …另有 ${list.length - 120} 张同类`);
  lines.push(``);
}
lines.push(`## 六、处置建议（不动手）`);
lines.push(``);
lines.push(`- 「新卡未过 v3」＝进货管线缺口：新卡在 \`src/feed/index.ts\` 的装配链里没走 v3 判定，或走了但没落 funDims。`);
lines.push(`  补法＝跑 \`scripts/gittok-rejudge-v3.ts\`（现行判据，不改 \`taxonomy.ts\`、不动 \`JUDGE_VERSION\`）；`);
lines.push(`  但该脚本写判定产物，按任务书「K-02/K-03 触判定链产物 → 只读评估先行，任何 JUDGE_VERSION 相关一律先等裁」，本轮**未跑**。`);
lines.push(`- 「字段丢失」＝要按 facts 事故同款路子查装配白名单（\`index.ts\` 缓存重建清单），属生产管线改动，等裁。`);
lines.push(`- 「上游无数据」＝非缺陷，标成已尽调即可（同 H-04 的 290 张口径）。`);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join("\n"), "utf-8");
console.log(lines.slice(0, 40).join("\n"));
console.log(`\n完整报告（含逐张挂账清单）→ ${OUT}`);
