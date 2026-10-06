import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { splitFeedPayload, detailShardPath, detailShardBody } from "./src/payload-split.ts";
import { cardCopyOk, type CopyOkCard } from "../src/feed/copy-ok.ts";

/**
 * 构建前把 data/feed.json 拆成列表 + 详情表。
 * 列表不携带 detailCn（约 80% 体积），首屏只下载刷卡所需字段。
 */
function prepareFeedPlugin(): Plugin {
  return {
    name: "prepare-feed",
    buildStart() {
      const repoRoot = path.resolve(__dirname, "..");
      const outDir = path.join(__dirname, "public", "data");
      fs.mkdirSync(outDir, { recursive: true });

      const srcFeed = path.join(repoRoot, "data", "feed.json");
      const sampleFeed = path.join(outDir, "feed.sample.json");
      const fallbackFeed = path.join(outDir, "feed.json");
      const input = fs.existsSync(srcFeed) ? srcFeed : fs.existsSync(sampleFeed) ? sampleFeed : fallbackFeed;
      if (!fs.existsSync(input)) {
        console.warn("[prepare-feed] no feed.json found, skip");
        return;
      }

      const raw = fs.readFileSync(input, "utf8");
      const parsed: unknown = JSON.parse(raw);
      const cards = Array.isArray(parsed) ? parsed : [];
      // 构建期文案合格打标（COPY-08 呈现闸的数据源）：判据 = 生产闸 cardChecks 本体，
      // 在**未拆 detailCn 的原始卡**上量（闸要看得到全文）。只进构建产物，data/feed.json 不动。
      const copyOkByRepo = new Map<string, boolean>();
      for (const c of cards as CopyOkCard[]) copyOkByRepo.set(c.repo, cardCopyOk(c));
      const { list, details } = splitFeedPayload(cards as Array<{ repo: string; detailCn?: string }>);

      // 加载提速（2026-09-05）：列表剔除前端零消费的死字段。
      // bigbros=盖章退役遗留（7 出口已清）；aiDim=aiDims[0] 的 deprecated 重复；
      // score=组装时恒 0（前端排序早已不用它）。仅剔构建产物，data/feed.json 原样保留兼容。
      //
      // 加载提速二轮（2026-09-23，G7①「首屏关键路径字节数下降」）：再剔 8 个字段。
      // 入选判据＝三条同时成立（逐条实测过，不是"看着像没用"）：
      //   ① web/src 全域零引用（查遍除 __tests__ 外所有 ts/tsx 的 `card.X` 消费点）；
      //   ② docs/API.md「卡片字段（列表接口）」表里没有它们（有合约的字段一个不动：
      //      pushedAt 虽前端读得少，但文档明写「判断今天新收录用这个」，故**保留**）；
      //   ③ MCP（mcp-gittok/src/tools.ts 只读 url/topics/aiDims/domainTags）与
      //      skills/gittok/scripts/hotspots.mjs（只读 pushedAt）都不读它们。
      // 实测体积（2839 张卡，gzip level 6，与线上 Pages 同档）：
      //   基线 raw 5,124,725 / gzip 1,380,144
      //   → 剔后 raw 4,295,277（−16.2%）/ gzip 1,209,026（−12.4%，省 171 KB）
      // 逐字段字节（json 值长度合计，实测）：funDims 196,782｜facts 77,056｜zoneReason 48,766
      //   ｜funReason 41,210｜funScoreSource 19,873｜zoneSource 19,873｜legacyZone 10,452｜legacyFunScore 8,115
      // 语义：前四个是 LLM 判定中间产物（六维分/事实抽取/两段判定理由），后四个是判定溯源标记；
      // 站点一屏都不展示（详情长文走 feed-details.json 的 detailCn，与本批字段无关）。
      // 需要它们的消费者走仓库源文件 data/feed.json 或 API.md 的「全量单文件」CDN 入口（docs/API.md 已同步）。
      const WEB_UNUSED_FIELDS = [
        "funDims",
        "facts",
        "zoneReason",
        "funReason",
        "funScoreSource",
        "zoneSource",
        "legacyZone",
        "legacyFunScore",
      ] as const;
      for (const card of list as unknown as Record<string, unknown>[]) {
        delete card["bigbros"];
        delete card["aiDim"];
        delete card["score"];
        for (const f of WEB_UNUSED_FIELDS) delete card[f];
        card["copyOk"] = copyOkByRepo.get(String(card["repo"])) === true;
      }

      const listPath = path.join(outDir, "feed.json");
      const detailsPath = path.join(outDir, "feed-details.json");
      fs.writeFileSync(listPath, JSON.stringify(list));
      fs.writeFileSync(detailsPath, JSON.stringify(details));

      // 二十轮 C3（2026-10-06）：详情**单卡分片**——点击只拉所需一片（p50 ≈1.7KB），
      // 替代「点击等 5.96MB 整表」。有 detailCn 发正文分片，无 detailCn 发墓碑
      // {"detailCn":null}（确认缺失一次请求有答案）。构建期随 data/feed.json 再生，
      // 目录入 .gitignore（不进仓库，与 feed-details.json 的「构建产物」属性一致）。
      // 路径安全：repo 键来自数据管道，落盘前仍做字符白名单（GitHub owner/repo 名
      // 只含字母数字 - _ .）＋ 解析结果必须落在 detailsDir 内，越界即跳过该卡（fail-closed）。
      // ⚠ 路径必须经 detailShardPath（小写规范键，与运行时取数/闸对账三方同源）——
      // 首版在这里用 split 段原始大小写拼路径，Windows 大小写不敏感让本地闸全绿，
      // Linux 真机（CI/线上）上凡名带大写的分片全部 404（CI P0 当场拦下 missing=1359）。
      const detailsDir = path.join(outDir, "details");
      const safeSeg = (seg: string) => /^[A-Za-z0-9._-]+$/.test(seg) && !seg.startsWith(".");
      let shardCount = 0;
      let shardBytes = 0;
      let shardSkipped = 0;
      fs.mkdirSync(detailsDir, { recursive: true });
      for (const card of cards as Array<{ repo: string; detailCn?: string }>) {
        const [owner, name, ...rest] = card.repo.split("/");
        if (!owner || !name || rest.length > 0 || !safeSeg(owner) || !safeSeg(name)) {
          shardSkipped++;
          continue;
        }
        const cn = typeof card.detailCn === "string" && card.detailCn.length > 0 ? card.detailCn : null;
        const body = detailShardBody(cn);
        // detailShardPath 的契约是「相对 data/ 目录」（返回 details/<owner>/<name>.json），
        // 基准必须用 outDir（=public/data），不是 detailsDir——否则拼出 details/details/ 双层。
        const abs = path.resolve(outDir, detailShardPath(card.repo));
        if (!abs.startsWith(path.resolve(outDir, "details") + path.sep)) {
          shardSkipped++;
          continue;
        }
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        fs.writeFileSync(abs, body);
        shardCount++;
        shardBytes += Buffer.byteLength(body);
      }
      if (shardSkipped > 0)
        console.warn(`[prepare-feed] ${shardSkipped} 张卡 repo 键不安全，分片跳过（该卡线上将显式「暂无」）`);

      const srcFollowing = path.join(repoRoot, "data", "following.json");
      if (fs.existsSync(srcFollowing)) {
        fs.copyFileSync(srcFollowing, path.join(outDir, "following.json"));
      }

      const listBytes = fs.statSync(listPath).size;
      const detailsBytes = fs.statSync(detailsPath).size;
      console.log(
        `[prepare-feed] ${cards.length} cards: list ${(listBytes / 1024).toFixed(0)}KB, details ${(detailsBytes / 1024).toFixed(0)}KB, shards ${shardCount} files ${(shardBytes / 1024).toFixed(0)}KB (source ${(Buffer.byteLength(raw) / 1024).toFixed(0)}KB)`,
      );
    },
  };
}

/* ═══ Service Worker 预缓存生成（二十一轮 N4②「无感加载」，2026-10-06）═══
 * closeBundle 时扫描 dist 构建产物 → 生成 dist/sw.js（内容含预缓存清单＋版本哈希）。
 * 预缓存面＝带内容指纹的构建产物（assets/*.js|css）＋ 同源静态件（fonts/*.woff2、favicon.svg）。
 * **明确不预缓存**：index.html（导航走 network-first，新部署立即生效，缓存只作离线兜底）、
 * data/*（新鲜度归应用层同日 IndexedDB 语义，SW 不做第二套缓存真源）、
 * digests/、agent/、feed.xml、manifest.json（公开接口按 HTTP 缓存语义走）。
 * 失效策略＝版本化缓存名：清单内容 sha256 → 缓存名 `gittok-precache-<hash>`；任何部署产物
 * 变化 ⇒ 新缓存名 ⇒ activate 删除全部旧 `gittok-*` 缓存；hash 资产 URL 本身自带指纹，
 * sw.js 自身被 HTTP 缓存 max-age=600 拖后时，cache-first 未命中的新资产也会走网络并回填
 * （自愈窗 ≤10min）。判据闸：scripts/gittok-sw-check.mjs（二次访问 0 网络/离线可开/旧缓存清理/
 * 数据放行四条）。 */
function swPrecachePlugin(): Plugin {
  return {
    name: "sw-precache",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      if (!fs.existsSync(path.join(distDir, "index.html"))) {
        console.warn("[sw-precache] dist/index.html 不存在，跳过 SW 生成");
        return;
      }
      // 目录名是固定白名单（assets/fonts），文件名经 readdirSync 取自构建产物本身（无外部输入）。
      const files: string[] = [];
      for (const dir of ["assets", "fonts"]) {
        const d = path.join(distDir, dir);
        if (!fs.existsSync(d)) continue;
        for (const f of fs.readdirSync(d)) {
          if (dir === "assets" && !/\.(js|css)$/.test(f)) continue;
          if (dir === "fonts" && !/\.(woff2?|ttf)$/.test(f)) continue;
          files.push(`./${dir}/${f}`);
        }
      }
      if (fs.existsSync(path.join(distDir, "favicon.svg"))) files.push("./favicon.svg");
      // index.html 必须入预缓存：导航虽走 network-first，但离线/网络故障时 SW 的回退
      // 只能落到缓存壳——不预缓存它，离线 reload 就是无壳白屏（sw 闸会拦这一条）。
      if (fs.existsSync(path.join(distDir, "index.html"))) files.unshift("./index.html");
      files.sort();
      const version = crypto
        .createHash("sha256")
        .update(JSON.stringify(files))
        .digest("hex")
        .slice(0, 16);
      const sw = `/* GitTok Service Worker —— 构建期生成（vite swPrecachePlugin），勿手改。
 * 二十一轮 N4②「无感加载」（2026-10-06）：静态壳层预缓存 → 二次访问 0 网络等待。
 * 失效策略＝版本化缓存名（gittok-precache-…）：部署产物一变即换名，
 * activate 清全部旧 gittok-* 缓存；导航请求 network-first（新部署立即生效）。
 * 数据类请求（data/* 等）**一律放行**：新鲜度归应用层同日 IndexedDB 语义（feed-cache.ts），
 * SW 不做第二套数据真源。 */
const VERSION = "${version}";
const PRECACHE = "gittok-precache-" + VERSION;
const PRECACHE_URLS = ${JSON.stringify(files)};
const SHELL = "index.html";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(PRECACHE);
    await cache.addAll(PRECACHE_URLS);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.filter((n) => n.startsWith("gittok-") && n !== PRECACHE).map((n) => caches.delete(n)),
    );
    await self.clients.claim();
  })());
});

const isShellAsset = (url) =>
  url.pathname.includes("/assets/") ||
  url.pathname.includes("/fonts/") ||
  url.pathname.endsWith("/favicon.svg");

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(PRECACHE);
          cache.put(SHELL, fresh.clone()).catch(() => {});
          return fresh;
        } catch (err) {
          const cache = await caches.open(PRECACHE);
          return (await cache.match(SHELL)) || (await cache.match("./index.html")) || Response.error();
        }
      })(),
    );
    return;
  }
  if (isShellAsset(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(PRECACHE);
        const hit = await cache.match(req);
        if (hit) return hit;
        const fresh = await fetch(req);
        if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
        return fresh;
      })(),
    );
    return;
  }
  /* 其余（data/*、agent/*、digests/*、feed.xml、manifest.json、sw.js）：放行 */
});
`;
      fs.writeFileSync(path.join(distDir, "sw.js"), sw);
      console.log(`[sw-precache] sw.js 生成：${files.length} 个预缓存件，版本 ${version}`);
    },
  };
}

// base: "./" 让构建产物用相对路径，适配 GitHub Pages 子路径部署
export default defineConfig({
  plugins: [react(), prepareFeedPlugin(), swPrecachePlugin()],
  base: "./",
  define: {
    // 构建标识：boot 日志 + N5 复验协议第一步「先看 bundle 新旧」（main.tsx 消费）
    __BUILD_ID__: JSON.stringify(`b${new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14)}`),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
