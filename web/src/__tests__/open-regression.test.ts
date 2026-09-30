// @ts-ignore —— node:fs / node:path 类型在仓库根；CI web npm ci 没有 @types/node
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { describe, expect, it } from "vitest";

const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
const css = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
const feedCard = readFileSync(resolve("web/src/FeedCard.tsx"), "utf8");
const app = readFileSync(resolve("web/src/App.tsx"), "utf8");
const open = readFileSync(resolve("web/src/detail-open.ts"), "utf8");

describe("打开动效回归锁（修一项不准把旧伤带回来）", () => {
  it("禁止 scrollbar-width:none：会拆掉 gutter，飞/落两套折行", () => {
    expect(css).not.toMatch(/scrollbar-width\s*:\s*none/);
  });

  it("详情始终 scrollbar-gutter:stable；飞行只许 overflow hidden 藏条", () => {
    expect(css).toMatch(/\.detail-card\s*\{[^}]*scrollbar-gutter:\s*stable/s);
    expect(css).toMatch(/\.detail-card\.is-from-card\.is-flying\s*\{[^}]*overflow-y:\s*hidden/s);
  });

  it("不用 View Transition 打开：截整页卡爆，不截根层闪黑", () => {
    expect(open).not.toMatch(/startViewTransition/);
    expect(app).not.toMatch(/startViewTransition|playOpenViewTransition|flushSync/);
    expect(css).not.toMatch(/view-transition-name|::view-transition/);
  });

  it("不整页隐藏信息流（闪黑）", () => {
    expect(css).not.toMatch(/html\.detail-open/);
    expect(feedCard).not.toMatch(/classList\.(add|remove)\("detail-open"\)/);
    expect(app).not.toMatch(/classList\.(add|remove)\("detail-open"\)/);
  });

  it("只有单参数 scale，禁止非等比拉伸正文", () => {
    expect(open).toMatch(/scale\(\$\{s\}\)/);
    expect(open).not.toMatch(/scale\([^)\n]+,/);
  });

  it("落地不 commitStyles（会弹回 from 再闪排版）", () => {
    expect(feedCard).not.toMatch(/commitStyles/);
    expect(open).toMatch(/fill:\s*"forwards"/);
  });

  it("终态盒读 DOM，不用视口估算开飞（会偏几像素）", () => {
    expect(feedCard).toMatch(/destBoxFromElement/);
    expect(feedCard).not.toMatch(/destBoxFromViewport/);
    expect(open).toMatch(/style\.transform = "none"/);
  });

  it("二次开飞前清飞行 transform，避免 identity 假动画", () => {
    expect(feedCard).toMatch(/isVisibleOpenMotion/);
    expect(feedCard).toMatch(/panel\.style\.transform = ""/);
  });

  it("源卡隐藏时关掉 transform 过渡，避免悬停抬起还在暗处滑", () => {
    expect(css).toMatch(/\.card\.is-open-source[\s\S]*?transition:\s*none/);
  });

  it("打开当帧开画，不再 afterPaint 等两帧", () => {
    expect(feedCard).not.toMatch(/afterPaint/);
    expect(feedCard).toMatch(/playOpenMotion/);
  });

  it("信息流用列式窗口虚拟化（十二轮：feedColWindowFromPrefix），不无限追加 DOM，不强制 idle parse", () => {
    expect(app).toMatch(/feedColWindowFromPrefix/);
    expect(app).not.toMatch(/timeout:\s*600/);
    expect(app).not.toMatch(/IntersectionObserver/);
    expect(css).not.toMatch(/content-visibility:\s*auto/);
  });
});
