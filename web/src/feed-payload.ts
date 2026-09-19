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

/** 解析详情表。打开弹窗前调用，保证第一帧就是完整内容（含深度解读）。 */
export function prefetchFeedDetails(): Promise<Record<string, string>> {
  warmFeedDetails();
  if (parsed) return Promise.resolve(parsed);
  return (textPromise ?? Promise.resolve("{}")).then((text) => {
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
