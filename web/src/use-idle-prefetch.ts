import { useEffect } from "react";
import { prefetchRepoDetails } from "./feed-payload.ts";

/**
 * 可视即可取的通用 idle 预取通道（二十二-1，2026-10-07）。
 *
 * FeedVirtualList 的窗口驱动预取只覆盖走虚拟列表的卡面；收藏夹展开网格、创作者页、
 * 搜索空态热门预览是**直接 markup**（不可视卡集合不走虚拟化），点击原本只能走占位竞态
 * ——与「可视即可取」P0 标准冲突。本 hook 把二十一轮 N6 的 idle 调度抽成通用通道：
 * 同一个 requestIdleCallback（无观察器 API，open-regression 锁兼容）、同一份内存合流。
 *
 * 触发键 = repos 序列化：内容实际变化才重触发（与虚拟列表的 exposedKey 同语义）。
 * 纪律：boot 零关键路径预热不回退——请求只发生在 effect 的 idle 调度里；不可见的
 * 卡面传空数组 = 零请求（detail 闸 P1「预取 ⊆ 可视卡集合」同样约束这些卡面）。
 */
export function useIdleDetailPrefetch(repos: readonly string[]): void {
  const key = repos.join("|");
  useEffect(() => {
    if (key.length === 0) return;
    const list = key.split("|");
    if (typeof window.requestIdleCallback === "function") {
      const h = window.requestIdleCallback(() => prefetchRepoDetails(list), { timeout: 1500 });
      return () => window.cancelIdleCallback(h);
    }
    const t = window.setTimeout(() => prefetchRepoDetails(list), 120);
    return () => window.clearTimeout(t);
  }, [key]);
}
