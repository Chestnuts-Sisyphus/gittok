// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { describe, it, expect } from "vitest";
import {
  FEED_CARD_HEIGHT,
  FEED_COLS_DESKTOP,
  FEED_MOBILE_MAX_WIDTH,
  FEED_OVERSCAN_ROWS,
  FEED_ROW_GAP,
  FEED_ROW_GAP_MOBILE,
  FEED_ROW_HEIGHT,
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
