#!/usr/bin/env node
/**
 * GitTok 今日热点包（skill 的取数脚本，零依赖；Node ≥ 18）。
 *
 * 输出一份紧凑 Markdown：当天的策展日报（摘要）+ 当日入库卡片（按站点 heatScore 降序）。
 * **不做二次加权**——heatScore 是站点每日频道用的同一个时效热度分，这里只排序不改造，
 * 排序语义仍归站点（与 MCP server 同一条纪律）。
 *
 * 用法：
 *   node scripts/hotspots.mjs                      # 今天（UTC 日期）
 *   node scripts/hotspots.mjs --date 2026-09-17
 *   node scripts/hotspots.mjs --days 3 --limit 20  # 近 3 天入库、取 20 条
 *   node scripts/hotspots.mjs --json               # 机读输出
 */

const SITE = "https://chestnuts-sisyphus.github.io/gittok";
const JSDELIVR = "https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master";
const TIMEOUT_MS = 30_000;

function parseArgs(argv) {
  const out = { date: null, days: 1, limit: 12, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--date") out.date = argv[++i];
    else if (a === "--days") out.days = Number(argv[++i]) || 1;
    else if (a === "--limit") out.limit = Number(argv[++i]) || 12;
    else if (a === "--json") out.json = true;
    else if (a === "--help" || a === "-h") {
      process.stdout.write(
        "用法: node hotspots.mjs [--date YYYY-MM-DD] [--days N] [--limit N] [--json]\n",
      );
      process.exit(0);
    }
  }
  return out;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "gittok-skill/1.0 (+https://github.com/Chestnuts-Sisyphus/gittok)" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} @ ${url}`);
  return res.text();
}

async function fetchJsonWithFallback(urls) {
  const errors = [];
  for (const url of urls) {
    try {
      const parsed = JSON.parse(await fetchText(url));
      return { data: parsed, url };
    } catch (err) {
      errors.push(`${url}: ${err.message}`);
    }
  }
  throw new Error(`所有数据源均失败：\n${errors.join("\n")}`);
}

const dayOf = (iso) => (typeof iso === "string" ? iso.slice(0, 10) : "");
const prevDay = (date, n) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
};

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const today = new Date().toISOString().slice(0, 10);
  const target = args.date ?? today;
  const windowStart = prevDay(target, Math.max(0, args.days - 1));

  const notes = [];

  // 1) 日报索引 + 当天策展日报
  let digests = [];
  let trendingExcerpt = null;
  try {
    const { data: manifest } = await fetchJsonWithFallback([`${SITE}/manifest.json`]);
    const entry =
      (manifest.dates ?? []).find((d) => d.date === target) ??
      (manifest.dates ?? []).find((d) => d.date <= target);
    if (entry) {
      digests = (entry.reports ?? []).map((r) => ({
        name: r,
        url: `${JSDELIVR}/digests/${entry.date}/${r}.md`,
      }));
      if (entry.date !== target) {
        notes.push(`目标日期 ${target} 尚无日报，已回退到最近一次 ${entry.date}`);
      }
    }
  } catch (err) {
    notes.push(`日报索引拉取失败：${err.message}`);
  }
  if (digests.length > 0) {
    // 日报 markdown 只在仓库镜像（jsDelivr）有，站点不供 .md；
    // 且当天可能有生成失败的日报（内容是「趋势报告生成失败」）——按内容质量挑一篇。
    const preferred = ["ai-agents", "ai-cli", "ai-hn-en", "ai-arxiv", "ai-trending"];
    const order = [
      ...preferred
        .map((n) => digests.find((d) => d.name === n))
        .filter(Boolean),
      ...digests.filter((d) => !d.name.endsWith("-en")),
    ];
    for (const cand of order) {
      try {
        const text = await fetchText(cand.url);
        if (/生成失败|generation failed/i.test(text.slice(0, 500))) {
          notes.push(`日报 ${cand.name} 当天生成失败（内容为空壳），已跳过`);
          continue;
        }
        const lines = text.split("\n");
        const cut = lines.findIndex((l, i) => i > 0 && /^##\s/.test(l));
        const end = cut > 0 ? cut : 40;
        trendingExcerpt = { name: cand.name, url: cand.url, text: lines.slice(0, Math.min(end, 60)).join("\n").trim() };
        break;
      } catch (err) {
        notes.push(`日报正文拉取失败（${cand.url}）：${err.message}`);
      }
    }
  }

  // 2) 卡片列表（jsDelivr 快源 → 站点）
  const { data: cards, url: feedUrl } = await fetchJsonWithFallback([
    `${JSDELIVR}/data/feed.json`,
    `${SITE}/data/feed.json`,
  ]);
  if (!Array.isArray(cards)) throw new Error("feed 顶层不是数组");

  const inWindow = (c) => {
    const d = dayOf(c.pushedAt ?? c.ts ?? c.createdAt);
    return d >= windowStart && d <= target;
  };
  const fresh = cards.filter(inWindow);
  const ranked = [...fresh]
    .sort(
      (a, b) =>
        (b.heatScore ?? 0) - (a.heatScore ?? 0) || (b.starGrowth ?? 0) - (a.starGrowth ?? 0),
    )
    .slice(0, args.limit);

  const pack = {
    date: target,
    windowStart,
    generatedAt: new Date().toISOString(),
    feedUrl,
    totalCards: cards.length,
    freshCount: fresh.length,
    digests,
    trendingExcerpt,
    notes,
    hotspots: ranked.map((c) => ({
      repo: c.repo,
      url: c.url ?? `https://github.com/${c.repo}`,
      zone: c.zone ?? c.category ?? "",
      stars: c.stars,
      starGrowth: c.starGrowth ?? 0,
      heatScore: Number((c.heatScore ?? 0).toFixed(4)),
      summaryCn: c.summaryCn ?? "",
      reasonCn: c.reasonCn ?? "",
      language: c.language ?? "",
      pushedAt: c.pushedAt ?? c.ts ?? "",
    })),
  };

  if (args.json) {
    process.stdout.write(`${JSON.stringify(pack, null, 2)}\n`);
    return;
  }

  const L = [];
  L.push(`# GitTok 今日热点包 · ${target}${args.days > 1 ? `（含近 ${args.days} 天）` : ""}`);
  L.push("");
  L.push(
    `> 数据源：${feedUrl}｜全库 ${pack.totalCards} 张｜窗口内入库 ${pack.freshCount} 张｜生成于 ${pack.generatedAt}`,
  );
  L.push("");
  if (notes.length > 0) {
    L.push("## 注意");
    for (const n of notes) L.push(`- ${n}`);
    L.push("");
  }
  L.push(`## 策展日报（${digests.length} 篇）`);
  if (digests.length === 0) L.push("- （该日期没有日报）");
  for (const d of digests) L.push(`- [${d.name}](${d.url})`);
  L.push("");
  if (trendingExcerpt) {
    L.push(`## 日报摘要（${trendingExcerpt.name}，取自 ${trendingExcerpt.url}）`);
    L.push("");
    L.push(trendingExcerpt.text);
    L.push("");
  }
  L.push(`## 今日入库 · 按时效热度（heatScore）取前 ${ranked.length} 条`);
  L.push("");
  if (ranked.length === 0) {
    L.push("（该窗口内没有新入库卡片——如实告知用户，不要把旧数据说成今天）");
  }
  for (const [i, c] of pack.hotspots.entries()) {
    L.push(
      `${i + 1}. **${c.repo}** ⭐ ${c.stars}（+${c.starGrowth}） · ${c.zone}｜heatScore ${c.heatScore}`,
    );
    if (c.summaryCn) L.push(`   - ${c.summaryCn}`);
    if (c.reasonCn) L.push(`   - ${c.reasonCn.slice(0, 160)}${c.reasonCn.length > 160 ? "…" : ""}`);
    L.push(`   - ${c.url}`);
  }
  L.push("");
  process.stdout.write(`${L.join("\n")}\n`);
}

main().catch((err) => {
  process.stderr.write(`[hotspots] ${err.message}\n`);
  process.exitCode = 1;
});
