/**
 * 线上反查（栗子纪律：每个「完成」必须附线上反查证据，否则视为未完成）。
 *
 * 两件事：
 *  ① **数据面**：拉线上 `data/feed.json`，断言 v3 判定字段真的上线了
 *     （zone 覆盖 / funDims 覆盖 / legacyZone 对照 / 乐趣池张数）；
 *  ② **代码面**：拉线上首页 → 取 bundle → 断言「频道头显示真实张数」的新文案在产物里
 *     （构建产物压缩过，但中文字面量保留 → 用它当版本指纹）。
 *
 * 只查本站常量地址（不接受任何外部输入）；失败抛错（非零退出）。
 */

import { FUN_DIMS } from "../src/feed/taxonomy.ts";

/** 站点根（常量：本站 GitHub Pages）。 */
const SITE = "https://chestnuts-sisyphus.github.io/gittok/";
/** 数据文件（常量）。 */
const FEED_URL = `${SITE}data/feed.json`;

interface Card {
  repo: string;
  zone?: string;
  funScore?: number;
  funDims?: Record<string, number>;
  legacyZone?: string;
  legacyFunScore?: number;
}

/** 验收线。 */
const MIN_CARDS = 2000;
const MIN_ZONE_COVERAGE = 1.0; // 100%
const MIN_FUN_DIMS_COVERAGE = 0.95;
const MIN_LEGACY_COVERAGE = 0.9;

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "user-agent": "GitTok-verify/1.0" } });
  if (!res.ok) throw new Error(`线上反查失败：${res.status} ${url}`);
  return res.text();
}

/** 从首页 HTML 里取第一个 assets/*.js 相对路径（简单字符串扫描，不用正则 exec）。 */
function firstBundlePath(html: string): string | null {
  const parts = html.split('"');
  for (const p of parts) {
    if (p.includes("assets/") && p.endsWith(".js")) return p;
  }
  return null;
}

function distribution(cards: Card[], keyOf: (c: Card) => string): Record<string, number> {
  const dist: Record<string, number> = {};
  for (const c of cards) {
    const k = keyOf(c);
    dist[k] = (dist[k] ?? 0) + 1;
  }
  return dist;
}

async function main(): Promise<boolean> {
  console.log("[线上反查] " + FEED_URL);
  const cards = JSON.parse(await fetchText(FEED_URL)) as Card[];
  const zoneCov = cards.filter((c) => c.zone).length / cards.length;
  const dimsCov =
    cards.filter((c) => c.funDims && Object.keys(c.funDims).length > 0).length / cards.length;
  const legacyCov = cards.filter((c) => c.legacyZone).length / cards.length;
  const funPositive = cards.filter((c) => (c.funScore ?? 0) > 0).length;

  console.log(`  卡数 ${cards.length}`);
  console.log(
    `  zone 覆盖 ${(zoneCov * 100).toFixed(1)}%｜funDims 覆盖 ${(dimsCov * 100).toFixed(1)}%｜legacyZone 对照 ${(legacyCov * 100).toFixed(1)}%`,
  );
  console.log(`  乐趣池（funScore>0）${funPositive} 张`);
  console.log(
    `  分区分布 ${Object.entries(distribution(cards, (c) => c.zone ?? "(无)"))
      .map(([k, v]) => `${k}=${v}`)
      .join(" / ")}`,
  );
  console.log(
    `  v2.2 旧分布（对照） ${Object.entries(distribution(cards, (c) => c.legacyZone ?? "(无)"))
      .map(([k, v]) => `${k}=${v}`)
      .join(" / ")}`,
  );
  console.log(`  六维字段：${FUN_DIMS.map((d) => d.key).join(" / ")}`);

  const html = await fetchText(SITE);
  const bundlePath = firstBundlePath(html);
  let codeOk = false;
  if (bundlePath) {
    const bundleUrl = new URL(bundlePath, SITE).toString();
    const bundle = await fetchText(bundleUrl);
    codeOk = bundle.includes("张 ·") && bundle.includes("共 ");
    console.log(`  首页 bundle ${bundleUrl.split("/").pop()}｜新频道头文案 ${codeOk ? "在" : "不在"}`);
  } else {
    console.log("  首页未找到 bundle 引用（构建可能失败）");
  }

  const problems: string[] = [];
  if (cards.length < MIN_CARDS) problems.push(`卡数 ${cards.length} 少于 ${MIN_CARDS}`);
  if (zoneCov < MIN_ZONE_COVERAGE) problems.push(`zone 覆盖 ${(zoneCov * 100).toFixed(1)}% 未达 100%`);
  if (dimsCov < MIN_FUN_DIMS_COVERAGE) {
    problems.push(`funDims 覆盖 ${(dimsCov * 100).toFixed(1)}% 低于 ${MIN_FUN_DIMS_COVERAGE * 100}%`);
  }
  if (legacyCov < MIN_LEGACY_COVERAGE) {
    problems.push(`legacyZone 对照覆盖 ${(legacyCov * 100).toFixed(1)}% 低于 ${MIN_LEGACY_COVERAGE * 100}%`);
  }
  if (!codeOk) problems.push("线上 bundle 里没有新的频道头文案（前端未部署或未构建）");
  if (problems.length > 0) {
    console.error("[线上反查] 不通过：");
    for (const p of problems) console.error(`  x ${p}`);
    return false;
  }
  console.log("[线上反查] 通过：数据面 v3 字段在线 + 代码面新频道头已部署");
  return true;
}

if (!(await main())) throw new Error("[线上反查] 不通过（见上方 x 行）");
