// @ts-ignore —— 与 open-regression.test.ts 相同：根 vitest 跑 web 测试，node:fs 类型在仓库根
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, expect, it } from "vitest";

/**
 * ErrorBoundary 源码锁（二十一轮 N5，2026-10-06）。
 * 紫屏（搜索/收藏整树卸载）的类根源兜底：任何渲染崩溃必须落进可恢复 UI 且 console.error
 * 留证据。谁把边界拆掉、或把 console.error 吞掉（空 catch / 静默降级），谁红。
 */
const boundary = readFileSync(resolve("web/src/ErrorBoundary.tsx"), "utf8");
const app = readFileSync(resolve("web/src/App.tsx"), "utf8");
const main = readFileSync(resolve("web/src/main.tsx"), "utf8");

describe("ErrorBoundary 锁（N5：永不紫屏，不吞错误）", () => {
  it("边界组件存在：getDerivedStateFromError 兜底呈现＋componentDidCatch 留证据", () => {
    expect(boundary).toMatch(/getDerivedStateFromError/);
    expect(boundary).toMatch(/componentDidCatch/);
    // 不许吞错误：console.error 必须在场（error + componentStack 全量证据）
    expect(boundary).toMatch(/console\.error\(/);
    expect(boundary).toMatch(/componentStack/);
  });

  it("可恢复 UI：重试（reset）与刷新（reload）两条恢复路径在场", () => {
    expect(boundary).toMatch(/window\.location\.reload\(\)/);
    expect(boundary).toMatch(/this\.setState\(\{ error: null \}\)/);
    expect(boundary).toMatch(/role="alert"/);
  });

  it("主内容区与详情弹层各自有边界（弹层崩溃不许陪葬信息流）", () => {
    expect(app).toMatch(/<ErrorBoundary label="主内容区">/);
    expect(app).toMatch(/<ErrorBoundary label="详情弹层" variant="overlay" onReset=\{closeDetail\}>/);
  });

  it("应用根也有边界（App 本体渲染崩溃落可恢复 UI）", () => {
    expect(main).toMatch(/<ErrorBoundary label="应用根">/);
  });
});
