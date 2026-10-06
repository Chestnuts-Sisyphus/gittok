// @ts-ignore —— 与 open-regression.test.ts 相同：根 vitest 跑 web 测试，node:fs 类型在仓库根
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, expect, it } from "vitest";

/**
 * 可视即可取源码锁（二十一轮 N6，2026-10-06）。
 * 栗子标准：「点开卡片时深度解读和其他内容全部一起出现」→ 预取机制不许回潮成
 * 「点击才取数」或「整表预热」。谁删掉窗口驱动 idle 预取、或把 IntersectionObserver
 * 加回来，谁红。
 */
const app = readFileSync(resolve("web/src/App.tsx"), "utf8");
const payload = readFileSync(resolve("web/src/feed-payload.ts"), "utf8");
const main = readFileSync(resolve("web/src/main.tsx"), "utf8");

describe("可视即可取锁（N6）", () => {
  it("feed-payload 暴露批量预取 API，限并发且靠内存/在飞合流去重", () => {
    expect(payload).toMatch(/export function prefetchRepoDetails/);
    expect(payload).toMatch(/PREFETCH_CONCURRENCY/);
    expect(payload).toMatch(/memory\.get\(r\) === undefined && !inflight\.has\(r\)/);
  });

  it("预取由虚拟化窗口驱动（exposedKey 触发），idle 调度不进 boot 关键路径", () => {
    // 预取 effect 与曝光 effect 同键语义：窗口实际变化才重触发
    expect(app).toMatch(/prefetchRepoDetails\(repos\)/);
    expect(app).toMatch(/requestIdleCallback\(\(\) => prefetchRepoDetails/);
    expect(app).toMatch(/可视即可取（二十一轮 N6/);
  });

  it("不引入 IntersectionObserver（open-regression 锁同义；预取清单=visibleIdx 渲染窗口）", () => {
    expect(app).not.toMatch(/IntersectionObserver/);
    expect(app).toMatch(/visibleIdx\.map\(\(idx\) => cards\[idx\]\.repo\)/);
  });

  it("模块顶层零预取调用（boot 载荷纪律：预取只发生在组件 effect 内）", () => {
    // feed-payload 里 prefetchRepoDetails 自己不发起任何顶层请求
    expect(payload).not.toMatch(/^prefetchRepoDetails\(/m);
  });

  it("多源 fallback（N4④）：主源 TTFB 闸＋jsDelivr 镜像＋规范形还原", () => {
    expect(app).toMatch(/FEED_FALLBACK_URLS/);
    expect(app).toMatch(/cdn\.jsdelivr\.net\/gh\/Chestnuts-Sisyphus\/gittok@master\/data\/feed\.json/);
    expect(app).toMatch(/canonicalizeFallbackFeed/);
    expect(app).toMatch(/FEED_TTFB_TIMEOUT_MS/);
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
