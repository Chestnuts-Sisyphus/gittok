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
      for (const card of list as unknown as Record<string, unknown>[]) {
        delete card["bigbros"];
        delete card["aiDim"];
        delete card["score"];
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
