import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { splitFeedPayload } from "./src/payload-split.ts";
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

      const srcFollowing = path.join(repoRoot, "data", "following.json");
      if (fs.existsSync(srcFollowing)) {
        fs.copyFileSync(srcFollowing, path.join(outDir, "following.json"));
      }

      const listBytes = fs.statSync(listPath).size;
      const detailsBytes = fs.statSync(detailsPath).size;
      console.log(
        `[prepare-feed] ${cards.length} cards: list ${(listBytes / 1024).toFixed(0)}KB, details ${(detailsBytes / 1024).toFixed(0)}KB (source ${(Buffer.byteLength(raw) / 1024).toFixed(0)}KB)`,
      );
    },
  };
}

// base: "./" 让构建产物用相对路径，适配 GitHub Pages 子路径部署
export default defineConfig({
  plugins: [react(), prepareFeedPlugin()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
