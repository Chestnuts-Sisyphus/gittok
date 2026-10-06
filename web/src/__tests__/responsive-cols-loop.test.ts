// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { describe, expect, it } from "vitest";
// @ts-ignore
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";

/**
 * 搜索页白屏回归锁（二十轮实修，2026-10-06）。
 *
 * 症状（线上旧 bundle 同样复现的既有生产 bug）：点开「搜索」标签 → React error #185
 * （Maximum update depth exceeded）→ **整棵 App 树被卸载，整页白屏**。
 * 根因（dev 模式组件栈实锤）：`useResponsiveCols` 的 ref 是**内联箭头**——每次渲染换身份，
 * React 每渲染 detach/reattach → 重挂即 measure → `setShape(feedCardShapeFor(...))` 每次都是
 * **新对象**（永不 bail）→ 再渲染 → 再重挂……在内联渲染的子树（搜索空态）里死循环打满
 * 嵌套更新上限。主信息流此前不炸只是因为它的 ref 消费者被 memo 挡住——同一颗雷埋在
 * 任何未来的内联消费者脚下。
 *
 * 修法两条（都在 useResponsiveCols）：
 *   ① ref 用 `useCallback([])` 稳定——重挂路径结构性消失；
 *   ② setShape 逐字段相等还旧引用（shallowEqShape）——同形测量零重渲染。
 * 本锁用源码级断言钉住，谁把内联箭头 ref 或无 bail 的 setShape 加回来谁红。
 */
describe("useResponsiveCols 白屏回归锁（二十轮）", () => {
  const src = readFileSync(resolve("web/src/App.tsx"), "utf8");
  const hook = (() => {
    const start = src.indexOf("function useResponsiveCols(");
    expect(start, "App.tsx 里找不到 useResponsiveCols").toBeGreaterThan(-1);
    const end = src.indexOf("function useIsMobile(", start);
    return src.slice(start, end > -1 ? end : start + 4000);
  })();

  it("ref 必须 useCallback 稳定（内联箭头 ref = 每渲染重挂 = measure 死循环源）", () => {
    expect(hook).toMatch(/const ref = useCallback\(/);
    // 旧写法的返回体里不得再出现内联箭头 ref
    expect(hook).not.toMatch(/ref:\s*\(el: HTMLElement \| null\)\s*=>\s*\{/);
  });

  it("setShape 必须带逐字段 bail（新对象永不 bail = 重渲染风暴）", () => {
    expect(hook).toMatch(/setShape\(\(prev\)\s*=>/);
    expect(hook).toMatch(/shallowEqShape\(prev,\s*nextShape\)\s*\?\s*prev\s*:\s*nextShape/);
    expect(src).toMatch(/function shallowEqShape\(/);
  });

  it("ref 回调里仍保留挂载即首测（条件渲染下 effect 已跑过的老约束不许丢）", () => {
    expect(hook).toMatch(/elRef\.current = el;\s*if \(el\) measureRef\.current\(\);/);
  });
});
