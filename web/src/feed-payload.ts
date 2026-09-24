/**
 * feed 详情表运行时（浏览器）：同日缓存 + 懒加载 + 解析。
 * 纯函数拆在 payload-split.ts（构建层 vite.config 共用，无浏览器依赖）。
 */

import { loadCachedText, saveCachedText } from "./feed-cache.ts";
import { splitFeedPayload, mergeDetail, diffDetailKeys } from "./payload-split.ts";

export { splitFeedPayload, mergeDetail, diffDetailKeys };

const DETAILS_URL = "./data/feed-details.json";

let textPromise: Promise<string> | null = null;
let parsed: Record<string, string> | null = null;

/** 详情表若已 parse 完则同步返回，让点击当帧就能打开（不等微任务）。 */
export function getFeedDetailsIfReady(): Record<string, string> | null {
  return parsed;
}

/** 只下载详情文件，不 JSON.parse。列表出来后就开始，不占滚动主线程。
 *  同日 IndexedDB 缓存命中 → 缓存即终态（详情数据每天 digest 一次才变，打开弹窗零网络
 *  等待）；后台仍拉新版本比对更新缓存供下次，失败静默。 */
export function warmFeedDetails(): void {
  if (textPromise) return;
  textPromise = (async () => {
    const cached = await loadCachedText("details");
    if (cached) {
      void fetch(DETAILS_URL)
        .then((r) => (r.ok ? r.text() : ""))
        .then((text) => {
          if (text && text !== cached) void saveCachedText("details", text);
        })
        .catch(() => {});
      return cached;
    }
    try {
      const r = await fetch(DETAILS_URL);
      const text = r.ok ? await r.text() : "{}";
      void saveCachedText("details", text);
      return text;
    } catch {
      return "{}";
    }
  })();
}

/**
 * 解析详情表。打开弹窗前调用，保证第一帧就是完整内容（含深度解读）。
 *
 * ⚠ 2026-09-24 四轮：**加了看门狗**。原来直接 `return textPromise.then(...)`——只要预热那条链
 * 有任何一步不落地（见 `feed-cache.ts` 的 `loadCachedText`：缺 `tx.onabort` 出口时 Promise
 * 会永久挂起），本函数就永远不 resolve；而调用方是 `handleOpenDetail` 里的
 * `prefetchFeedDetails().then(() => setDetailCard(...))` ⇒ **弹层永远不出现**，
 * 源卡却已被标成隐形（现场：点一下卡片没了、什么都没打开；线上必现、本地同 bundle 不复现）。
 * 看门狗：预热超过 `WARM_DEADLINE_MS` 还没落地，就直接自己拉一次详情表（不走缓存、不写缓存），
 * 再失败也给 `{}` —— 弹层至少能开，内容是可见的降级，而不是**静默卡死**。
 */
const WARM_DEADLINE_MS = 1500;

export function prefetchFeedDetails(): Promise<Record<string, string>> {
  if (parsed) return Promise.resolve(parsed);
  warmFeedDetails();
  const warm: Promise<string> = (textPromise ?? Promise.resolve("{}")).then((t) => t);
  const watchdog = new Promise<string>((resolve) => {
    const timer = setTimeout(() => {
      fetch(DETAILS_URL)
        .then((r) => (r.ok ? r.text() : "{}"))
        .then(resolve)
        .catch(() => resolve("{}"));
    }, WARM_DEADLINE_MS);
    const clear = () => clearTimeout(timer);
    void warm.then(clear, clear);
  });
  return Promise.race([warm, watchdog]).then((text) => {
    if (!parsed) {
      try {
        parsed = JSON.parse(text) as Record<string, string>;
      } catch {
        parsed = {};
      }
    }
    return parsed;
  });
}
