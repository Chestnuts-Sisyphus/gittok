// @ts-ignore —— 与 open-regression.test.ts 相同：根 vitest 跑 web 测试，node:fs 类型在仓库根
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, expect, it } from "vitest";

/**
 * 可视即可取源码锁（二十一轮 N6，2026-10-06；二十二-1/2/3 扩展，2026-10-07）。
 * 栗子标准：「点开卡片时深度解读和其他内容全部一起出现」→ 预取机制不许回潮成
 * 「点击才取数」或「整表预热」。谁删掉窗口驱动 idle 预取、或把 IntersectionObserver
 * 加回来，谁红。二十二-1 起预取走通用通道 useIdleDetailPrefetch（收藏夹/创作者页/
 * 热门预览三处直接 markup 卡面同通道覆盖）；二十二-2 锁「网络失败不落内存」。
 */
const app = readFileSync(resolve("web/src/App.tsx"), "utf8");
const payload = readFileSync(resolve("web/src/feed-payload.ts"), "utf8");
const main = readFileSync(resolve("web/src/main.tsx"), "utf8");
const hook = readFileSync(resolve("web/src/use-idle-prefetch.ts"), "utf8");
const worker = readFileSync(resolve("web/src/legacy-table-worker.ts"), "utf8");
const creatorPage = readFileSync(resolve("web/src/CreatorPage.tsx"), "utf8");

describe("可视即可取锁（N6）", () => {
  it("feed-payload 暴露批量预取 API，限并发且靠内存/在飞合流去重", () => {
    expect(payload).toMatch(/export function prefetchRepoDetails/);
    expect(payload).toMatch(/PREFETCH_CONCURRENCY/);
    expect(payload).toMatch(/memory\.get\(r\) === undefined && !inflight\.has\(r\)/);
  });

  it("预取 idle 调度收口在通用通道 hook（App 虚拟列表与三处卡面共用，不进 boot 关键路径）", () => {
    expect(hook).toMatch(/requestIdleCallback\(\(\) => prefetchRepoDetails/);
    expect(app).toMatch(/useIdleDetailPrefetch\(visibleIdx\.map\(\(idx\) => cards\[idx\]\.repo\)\)/);
  });

  it("预取覆盖面扩到全部可视卡表面（二十二-1：收藏夹/创作者页/热门预览）", () => {
    expect(app).toMatch(/useIdleDetailPrefetch\(tab === "search" && !searchQuery \? hotPreview\.map/);
    expect(app).toMatch(/useIdleDetailPrefetch\(expandedFolderRepos\)/);
    expect(creatorPage).toMatch(/useIdleDetailPrefetch\(projects\.map\(\(c\) => c\.repo\)\)/);
  });

  it("不引入 IntersectionObserver（open-regression 锁同义；预取清单=visibleIdx 渲染窗口）", () => {
    expect(app).not.toMatch(/IntersectionObserver/);
    expect(app).toMatch(/visibleIdx\.map\(\(idx\) => cards\[idx\]\.repo\)/);
  });

  it("模块顶层零预取调用（boot 载荷纪律：预取只发生在组件 effect 内）", () => {
    // feed-payload 里 prefetchRepoDetails 自己不发起任何顶层请求
    expect(payload).not.toMatch(/^prefetchRepoDetails\(/m);
    // hook 里恰两个调用点（idle 分支 + 无 idle 的超时兜底分支），都必须包在调度回调里
    expect(hook.match(/prefetchRepoDetails\(/g)?.length).toBe(2);
    expect(hook).toMatch(/\(\) => prefetchRepoDetails/);
  });

  it("多源 fallback（N4④）：主源 TTFB 闸＋jsDelivr 镜像＋规范形还原", () => {
    expect(app).toMatch(/FEED_FALLBACK_URLS/);
    expect(app).toMatch(/cdn\.jsdelivr\.net\/gh\/Chestnuts-Sisyphus\/gittok@master\/data\/feed\.json/);
    expect(app).toMatch(/canonicalizeFallbackFeed/);
    expect(app).toMatch(/FEED_TTFB_TIMEOUT_MS/);
  });
});

describe("预取失败投毒防护锁（二十二-2）", () => {
  it("网络失败不落内存：resolveRepoDetail 只在成功路径 memory.set，失败向上抛", () => {
    expect(payload).toMatch(
      /try \{\s*const out = await fetchRepoDetail\(repo\);\s*memory\.set\(repo, out\);/,
    );
  });
  it('整表取数失败抛错，不伪造空表（旧版 catch→"{}" 是投毒上游）', () => {
    expect(payload).not.toMatch(/catch \(\(\) => "\{\}"\)/);
    expect(payload).toMatch(/if \(!r\.ok\) throw new Error\(`HTTP \$\{r\.status\}`\)/);
  });
  it("点击路径保持占位＋有界退避重试，「暂无」只属于确认缺失", () => {
    expect(app).toMatch(/DETAIL_RETRY_ATTEMPTS/);
    expect(app).toMatch(/attemptFetch\(DETAIL_RETRY_ATTEMPTS\)/);
  });
});

describe("legacy 整表 Worker 解析锁（二十二-3）", () => {
  it("解析走 Worker（主线程零 5.9MB JSON.parse），失败退回主线程", () => {
    expect(payload).toMatch(/new Worker\(new URL\("\.\/legacy-table-worker\.ts", import\.meta\.url\)/);
    expect(payload).toMatch(/parseLegacyTableOnMain/);
  });
  it("Worker 内缓存上次解析的表（同日文本不变零重解析）", () => {
    expect(worker).toMatch(/if \(typeof req\.text === "string" && req\.text !== lastText\)/);
  });
});

describe("SW 预缓存锁（N4②）", () => {
  it("注册在 load 之后（不进 boot 关键路径），失败静默降级", () => {
    expect(main).toMatch(/addEventListener\("load", \(\) => \{[\s\S]*serviceWorker\.register/s);
    expect(main).toMatch(/\.catch\(\(err: unknown\) => \{[\s\S]*console\.warn/);
  });

  it("构建期生成 sw.js（清单+版本哈希），预缓存面排除数据类", () => {
    const viteConf = readFileSync(resolve("web/vite.config.ts"), "utf8");
    expect(viteConf).toMatch(/swPrecachePlugin/);
    expect(viteConf).toMatch(/gittok-precache-/);
    expect(viteConf).toMatch(/data\/\*（新鲜度归应用层|caches\.delete\(n\)/);
  });
});

describe("冻结式头片锁（二十二-0）", () => {
  it("构建期与运行时共用同一份推荐排序（recommend-baseline 双端 import，防两套排序）", () => {
    const viteConf = readFileSync(resolve("web/vite.config.ts"), "utf8");
    expect(viteConf).toMatch(/import \{ buildRecommended \} from "\.\/src\/recommend-baseline\.ts"/);
    expect(app).toMatch(/buildRecommended as buildRecommendedBaseline/);
    // App 本地 buildRecommended 只许是传 now 的薄包装，不许再长排序逻辑
    expect(app).toMatch(
      /return buildRecommendedBaseline\(cards, preferences, seen, interactions, followingSet, now\);/,
    );
  });

  it("冷启动先取头片，头片是加速件（失败静默退回等全量）", () => {
    expect(app).toMatch(/const HEAD_URL = "\.\/data\/feed-head\.json"/);
    expect(app).toMatch(/HEAD_TTFB_TIMEOUT_MS = 3000/);
  });

  it("硬不变量：全量到货装「头片冻结序＋尾部 append」，与 setCards 同批提交（零热替换）", () => {
    expect(app).toMatch(
      /setFrozenRec\(\[\.\.\.head, \.\.\.fullRec\.filter\(\(c\) => !headSet\.has\(c\.repo\)\)\]\)/,
    );
  });

  it("冷窗其他面不渲染残缺序：非推荐频道与搜索保持加载态", () => {
    expect(app).toMatch(
      /const coldHeadOnly = !loading && !error && headCards !== null && cards\.length === 0;/,
    );
    expect(app).toMatch(/coldHeadOnly && !activeSection/);
    expect(app).toMatch(/coldHeadOnly \?/);
  });

  it("用户动作解除冻结（改偏好/关注），数据到货永不自动解除", () => {
    expect(app).toMatch(/setFrozenRec\(null\)/);
  });
});
