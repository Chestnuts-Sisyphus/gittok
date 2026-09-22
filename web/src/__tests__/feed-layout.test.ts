// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, it, expect } from "vitest";
import {
  FEED_CARD_HEIGHT,
  FEED_CARD_HEIGHT_SHORT,
  FEED_CARD_MAX,
  FEED_COL_MIN,
  FEED_SHORT_MAX_HEIGHT,
  FEED_COLS_DESKTOP,
  FEED_MOBILE_MAX_WIDTH,
  FEED_OVERSCAN_ROWS,
  FEED_ROW_GAP,
  FEED_ROW_GAP_MOBILE,
  FEED_ROW_HEIGHT,
  feedColsForContentWidth,
  feedColsForWidth,
  feedGridFromMatch,
  feedRowGapForWidth,
  feedViewportOf,
  feedWindow,
  isScrollableOverflow,
  sameFeedWindow,
} from "../feed-layout.ts";

describe("feed 行高契约", () => {
  it("行高 = 卡高 + 行距（与 CSS 锁高一致）", () => {
    expect(FEED_CARD_HEIGHT).toBe(288);
    expect(FEED_ROW_GAP).toBe(16);
    expect(FEED_ROW_GAP_MOBILE).toBe(12);
    expect(FEED_ROW_HEIGHT).toBe(304);
    expect(FEED_MOBILE_MAX_WIDTH).toBe(768);
  });
});

describe("feedGridFromMatch", () => {
  it("桌面两列 16 间距，窄屏一列 12 间距", () => {
    expect(feedGridFromMatch(false)).toEqual({ cols: 2, rowGap: 16 });
    expect(feedGridFromMatch(true)).toEqual({ cols: 1, rowGap: 12 });
    expect(feedColsForWidth(768)).toBe(1);
    expect(feedColsForWidth(769)).toBe(2);
    expect(feedRowGapForWidth(768)).toBe(12);
    expect(feedRowGapForWidth(769)).toBe(16);
  });
});

describe("feedWindow", () => {
  it("未滚动时只挂视口 + overscan，上面不垫", () => {
    const w = feedWindow({
      cardCount: 100,
      cols: FEED_COLS_DESKTOP,
      rowGap: FEED_ROW_GAP,
      listTop: 0,
      viewportHeight: 900,
      overscanRows: 2,
    });
    expect(w.startRow).toBe(0);
    expect(w.startIdx).toBe(0);
    expect(w.topPad).toBe(0);
    expect(w.endRow).toBe(Math.ceil(900 / 304) + 2);
    expect(w.endIdx).toBe(w.endRow * 2);
    expect(w.bottomPad).toBe((50 - w.endRow) * 304);
  });

  it("滚过 10 行后上面垫精确高度，切片从中间开始", () => {
    const w = feedWindow({
      cardCount: 100,
      cols: 2,
      rowGap: 16,
      listTop: -3040,
      viewportHeight: 900,
      overscanRows: 2,
    });
    expect(w.startRow).toBe(8);
    expect(w.startIdx).toBe(16);
    expect(w.topPad).toBe(8 * 304);
    expect(w.endRow).toBe(15);
    expect(w.bottomPad).toBe(35 * 304);
  });

  it("垫片 + 可见行 = 总滚动高（不含最后一行多余 gap）", () => {
    const w = feedWindow({
      cardCount: 87,
      cols: 2,
      rowGap: 16,
      listTop: -1200,
      viewportHeight: 800,
    });
    const rowCount = Math.ceil(87 / 2);
    const visibleRows = w.endRow - w.startRow;
    expect(w.topPad + visibleRows * 304 + w.bottomPad).toBe(rowCount * 304);
    expect(FEED_OVERSCAN_ROWS).toBe(10);
  });

  it("空列表不垫、不切片", () => {
    expect(
      feedWindow({
        cardCount: 0,
        cols: 2,
        rowGap: 16,
        listTop: 0,
        viewportHeight: 900,
      }),
    ).toEqual({ startRow: 0, endRow: 0, startIdx: 0, endIdx: 0, topPad: 0, bottomPad: 0 });
  });

  it("sameFeedWindow 只看切片和垫片", () => {
    const a = feedWindow({
      cardCount: 40,
      cols: 2,
      rowGap: 16,
      listTop: 0,
      viewportHeight: 900,
    });
    expect(sameFeedWindow(a, { ...a })).toBe(true);
    expect(sameFeedWindow(a, { ...a, startIdx: a.startIdx + 2 })).toBe(false);
  });
});

describe("滚动口识别", () => {
  it("只有 auto/scroll 才是滚动口", () => {
    expect(isScrollableOverflow("auto")).toBe(true);
    expect(isScrollableOverflow("scroll")).toBe(true);
    expect(isScrollableOverflow("hidden")).toBe(false);
    expect(isScrollableOverflow("visible")).toBe(false);
  });
});

describe("feedViewportOf", () => {
  it("window 根：listTop 就是视口 y", () => {
    expect(feedViewportOf({ getBoundingClientRect: () => ({ top: 80 }) }, { innerHeight: 900 })).toEqual({
      listTop: 80,
      viewportHeight: 900,
    });
  });

  it("元素根：listTop 相对滚动口顶，不含顶栏高度", () => {
    expect(
      feedViewportOf(
        { getBoundingClientRect: () => ({ top: 100 }) },
        { clientHeight: 800, getBoundingClientRect: () => ({ top: 60 }) },
      ),
    ).toEqual({ listTop: 40, viewportHeight: 800 });
  });
});

describe("双写契约（CSS 与 JS 常量不许漂）", () => {
  const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
  it("--feed-col-min === FEED_COL_MIN（G-10 列数最小宽）", () => {
    const cssMin = Number(cssRaw.match(/--feed-col-min:\s*(\d+)px/)?.[1]);
    expect(cssMin).toBe(FEED_COL_MIN);
  });
  it("--feed-card-max === FEED_CARD_MAX（2026-09-23 卡宽上限）", () => {
    const cssMax = Number(cssRaw.match(/--feed-card-max:\s*(\d+)px/)?.[1]);
    expect(cssMax).toBe(FEED_CARD_MAX);
  });
  it("--feed-card-h === FEED_CARD_HEIGHT；窄高档 --feed-card-h === FEED_CARD_HEIGHT_SHORT", () => {
    const vars = [...cssRaw.matchAll(/--feed-card-h:\s*(\d+)px/g)].map((m) => Number(m[1]));
    expect(vars).toContain(FEED_CARD_HEIGHT);
    expect(vars).toContain(FEED_CARD_HEIGHT_SHORT);
    const shortBlock = cssRaw.match(/@media \(max-height: (\d+)px\)[\s\S]*?\}/);
    expect(Number(shortBlock?.[1])).toBe(FEED_SHORT_MAX_HEIGHT);
  });
});

describe("卡宽上限（2026-09-23 栗子：能两列时不要强行拉伸）", () => {
  const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
  const css = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
  const feedList = css.match(/\.feed-list\s*\{[^}]+\}/)?.[0] ?? "";

  it("轨道 max 保持 1fr（写进轨道会让 auto-fill 改用 max 计数 → 少一列）", () => {
    expect(feedList).toMatch(/repeat\(\s*auto-fill\s*,\s*minmax\(min\(var\(--feed-col-min\),\s*100%\),\s*1fr\)\s*\)/);
    expect(feedList).not.toMatch(/minmax\([^)]*var\(--feed-card-max\)/);
  });

  it("卡宽上限只给 >768（手机档靠 1fr 占满，是既有设计）", () => {
    const block = css.match(/@media \(min-width: 769px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
    expect(block).toMatch(/\.feed-list\s*>\s*\.card/);
    expect(block).toMatch(/max-width:\s*var\(--feed-card-max\)/);
    expect(block).toMatch(/justify-self:\s*center/);
    // 只有 max-width 不够：grid item 会收缩成 max-content（实测塌成 36px）
    expect(block).toMatch(/width:\s*100%/);
    const mobileBlock = css.match(/@media \(max-width: 768px\)\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
    expect(mobileBlock).toMatch(/\.feed-list\s*\{[^}]*grid-template-columns:\s*1fr/);
  });
});

describe("列数（照 CSS auto-fill 同式还原）", () => {
  it("实测宽度表：1/2/3 列门槛（2026-09-23 起宽屏可出三列）", () => {
    // 本机无头 Chrome 实测的网格可用宽（各档视口 − 侧栏 216px − 内容内距 48px）
    expect(feedColsForContentWidth(1656)).toBe(3); // 1920 档（闸口径）
    expect(feedColsForContentWidth(1640)).toBe(3); // 三列下限：3×536+2×16
    expect(feedColsForContentWidth(1639)).toBe(2);
    expect(feedColsForContentWidth(1336)).toBe(2); // 1600 档
    expect(feedColsForContentWidth(1136)).toBe(2); // 1400 档
    expect(feedColsForContentWidth(1088)).toBe(2); // 两列下限：2×536+16
    expect(feedColsForContentWidth(1087)).toBe(1);
    expect(feedColsForContentWidth(1079)).toBe(1); // 1343 档
    expect(feedColsForContentWidth(936)).toBe(1); // 1200 档
    expect(feedColsForContentWidth(776)).toBe(1); // 900 档
    expect(feedColsForContentWidth(720)).toBe(1); // 1000 档
    expect(feedColsForContentWidth(629)).toBe(1);
    expect(feedColsForContentWidth(536)).toBe(1);
    // CSS 下限写 min(536px, 100%)：窄于 536 的容器仍算 1 列（不溢出、也不出 0 列）
    expect(feedColsForContentWidth(489)).toBe(1);
    expect(feedColsForContentWidth(0)).toBe(1);
  });

  it("三列不破「一行 ≥28 字」：536px ＝ 28 字的精确反推值", () => {
    // 实测口径：一行容量 = floor((卡宽 − 69) / 16.66)，16.66px 是本机 Windows 全角字宽
    expect(Math.floor((FEED_COL_MIN - 69) / 16.66)).toBeGreaterThanOrEqual(28);
    // 再往下取一档就破了（这就是 1600/1400 档出不了三列的原因）
    expect(Math.floor((FEED_COL_MIN - 1 - 69) / 16.66)).toBe(27);
  });
});
