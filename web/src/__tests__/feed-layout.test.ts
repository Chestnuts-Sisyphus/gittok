// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, it, expect } from "vitest";
import {
  FEED_CARD_CHROME,
  FEED_CARD_HEIGHT,
  FEED_CARD_HEIGHT_SHORT,
  FEED_CARD_MAX,
  FEED_CHAR_W,
  FEED_COL_MIN,
  FEED_SUMMARY_MAX,
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

describe("CSS 结构自检（三轮踩过的坑：注释没闭合会把下一条规则整条吃掉）", () => {
  const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
  it("注释配平（/* 与 */ 数量相等）", () => {
    expect((cssRaw.match(/\/\*/g) ?? []).length).toBe((cssRaw.match(/\*\//g) ?? []).length);
  });
  it("花括号配平", () => {
    const stripped = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
    expect((stripped.match(/\{/g) ?? []).length).toBe((stripped.match(/\}/g) ?? []).length);
  });
  it("全站 transition 不许出现裸时长（必须走 motion token）", () => {
    // 三轮 T1 验收②：改前 38 处 `transition:` 里混着 0.15/0.2/0.25/0.28/0.3s——
    // 同一个交互在不同元素上快慢不一，是「过渡不丝滑」的观感来源之一。
    // 现在统一走 --motion-fast/base/slow + --ease-*，这条断言把「裸值」钉死为红。
    // 允许：transition: none（锁⑨要求它在 .card.is-open-source 上）；`0s linear` 的 visibility 延迟开关。
    const stripped = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
    const decls = [...stripped.matchAll(/transition:\s*([^;}]+)/g)].map((m) => m[1].replace(/\s+/g, " ").trim());
    expect(decls.length).toBeGreaterThan(20); // 样本有效性：真扫到了声明（避免正则失效后「恒空窗口」假绿）
    const bare = decls.filter((d) => d !== "none" && /\d*\.?\d+m?s|\d+ms/.test(d.replace(/0s/g, "")));
    expect(bare).toEqual([]);
  });

  it("注释外不出现中文破折号行（＝注释漏闭合的指纹）", () => {
    // 三轮实伤：新写的一段 `── … ──` 落在注释的 `*/` 之后 → 浏览器把这段文字当成选择器，
    // 紧跟着的 `.feed-content { … }` 整条被吞 → 内容区宽度/内距全失效（实测网格 1602→1650、
    // 卡宽 523→539、拖动闸四条列数翻转全丢）。这条断言是那次的直接指纹。
    const stripped = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
    const stray = stripped.split("\n").filter((l) => l.includes("──") && !l.trim().startsWith("//"));
    expect(stray).toEqual([]);
  });
});

describe("双写契约（CSS 与 JS 常量不许漂）", () => {
  const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
  it("--feed-col-min === FEED_COL_MIN（G-10 列数最小宽）", () => {
    const cssMin = Number(cssRaw.match(/--feed-col-min:\s*(\d+)px/)?.[1]);
    expect(cssMin).toBe(FEED_COL_MIN);
  });
  it("--feed-col-min === FEED_COL_MIN（由摘要契约反推；「卡宽上限」常量已删除）", () => {
    // 四轮：卡宽上限这个概念整个删除——卡宽只由列数决定，所以 CSS 里不该再有 --feed-card-max。
    const cssMin = Number(cssRaw.match(/--feed-col-min:\s*(\d+)px/)?.[1]);
    expect(cssMin).toBe(FEED_COL_MIN);
    expect(cssRaw).not.toMatch(/--feed-card-max\s*:/);
  });
  it("--feed-card-h === FEED_CARD_HEIGHT；窄高档 --feed-card-h === FEED_CARD_HEIGHT_SHORT", () => {
    const vars = [...cssRaw.matchAll(/--feed-card-h:\s*(\d+)px/g)].map((m) => Number(m[1]));
    expect(vars).toContain(FEED_CARD_HEIGHT);
    expect(vars).toContain(FEED_CARD_HEIGHT_SHORT);
    const shortBlock = cssRaw.match(/@media \(max-height: (\d+)px\)[\s\S]*?\}/);
    expect(Number(shortBlock?.[1])).toBe(FEED_SHORT_MAX_HEIGHT);
  });
});

describe("卡片铺满轨道（四轮：卡宽上限已删除，宽度只由列数决定）", () => {
  const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
  const css = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
  const cssNoCommentAll = css;
  const feedList = css.match(/\.feed-list\s*\{[^}]+\}/)?.[0] ?? "";

  it("轨道 max 保持 1fr（写进轨道会让 auto-fill 改用 max 计数 → 少一列）", () => {
    expect(feedList).toMatch(/repeat\(\s*auto-fill\s*,\s*minmax\(min\(var\(--feed-col-min\),\s*100%\),\s*1fr\)\s*\)/);
    expect(feedList).not.toMatch(/minmax\([^)]*var\(--feed-card-max\)/);
  });

  it("卡片**铺满自己的轨道**（四轮：无卡宽上限；单列档＝网格宽＝右侧零空档）", () => {
    // 四轮 2026-09-24：栗子两条——「2 列及以上时所有摘要都要能完整展示」→ 卡宽 ≥ 一行 35 字的宽度；
    // 「（红框）这种空隙不允许出现」→ 单列档铺满。两条合起来把「卡宽上限」这个概念消灭了：
    // 卡宽 = 轨道宽，轨道宽由列数规则保证落在 [653, 2×653+16)。
    const base = css.match(/\.feed-list\s*>\s*\.card\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(base).toMatch(/width:\s*100%/);          // 不带它会塌成 max-content（历史实测 36px）
    expect(base).not.toMatch(/max-width/);           // 上限概念已删
    expect(cssNoCommentAll).not.toMatch(/var\(--feed-card-max\)/);
    // 单列档不再收轨道（旧「单列带」规则已删除）：不该再有 data-cols="1" 的轨道收边规则
    expect(cssNoCommentAll).not.toMatch(/\.feed-list\[data-cols="1"\]\s*\{/);
    // 手机档仍是 1fr 占满
    const mobileBlocks = [...css.matchAll(/@media \(max-width:\s*768px\)\s*\{[\s\S]*?\n\}/g)].map((m) => m[0]);
    const mobileBlock = mobileBlocks.find((b) => /\.feed-list\s*\{/.test(b)) ?? "";
    expect(mobileBlock).toMatch(/\.feed-list\s*\{[^}]*grid-template-columns:\s*1fr/);
  });
});

describe("列数（照 CSS auto-fill 同式还原）", () => {
  const cssRawCols = readFileSync(resolve("web/src/styles.css"), "utf8");
  const cssNoCommentAll = cssRawCols.replace(/\/\*[\s\S]*?\*\//g, "");
  it("列数反解（四轮规则：取卡宽仍 ≥ 653 的**最大**列数 ⇒ 2 列及以上必然一行读得完 35 字）", () => {
    // 阈值来源：FEED_SUMMARY_MAX(35) × FEED_CHAR_W(16.66) + FEED_CARD_CHROME(69) = 652.1 → 653。
    expect(FEED_COL_MIN).toBe(653);
    expect(FEED_SUMMARY_MAX).toBe(35);
    expect(FEED_COL_MIN).toBe(Math.ceil(FEED_SUMMARY_MAX * FEED_CHAR_W + FEED_CARD_CHROME));
    // 实测档位（本机 dist 逐档读计算值，见 scripts/gittok-responsive-check.mjs 的 EXPECT 表）
    expect(feedColsForContentWidth(1602)).toBe(2); // 1920/2560 档 → 2 列 × 793（43 字）
    expect(feedColsForContentWidth(1322)).toBe(2); // 两列下界：(1322−16)/2 = 653（正好到线）
    expect(feedColsForContentWidth(1321)).toBe(1); // 再窄 1px → 652.5 < 653 ⇒ 退单列（宁可一列铺满，不挤窄卡）
    expect(feedColsForContentWidth(1472)).toBe(2); // 1744 档 → 2 × 728（39 字）
    expect(feedColsForContentWidth(1428)).toBe(2); // 1700 档 → 2 × 706（38 字）
    expect(feedColsForContentWidth(1328)).toBe(2); // 1600 档 → 2 × 656（35 字，正好一行放下上限）
    expect(feedColsForContentWidth(1228)).toBe(1); // 1500 档 → 1 × 1228（铺满，右侧零空档）
    expect(feedColsForContentWidth(1128)).toBe(1); // 1400 档 → 1 × 1128
    expect(feedColsForContentWidth(1003)).toBe(1); // 1275 档 → 1 × 1003
    expect(feedColsForContentWidth(975)).toBe(1);  // 1240 档（栗子红框那张）→ 1 × 975，无空档
    expect(feedColsForContentWidth(928)).toBe(1);  // 1200 档 → 1 × 928
    expect(feedColsForContentWidth(728)).toBe(1);  // 1000 档 → 1 × 728
    expect(feedColsForContentWidth(0)).toBe(1);
  });

  it("摘要契约（20–35 字）是布局的第一性依据：653px 卡宽 → 一行恰好 35 字", () => {
    // 上限出处：src/feed/prompts.ts 的评分提示词「20-35 个汉字（硬性要求）」，不是本轮新造的数。
    expect(FEED_SUMMARY_MAX).toBe(35);
    // 653px 卡宽的一行容量（口径 = floor((卡宽−69)/16.66)，与 G9 表/闸同式）
    expect(Math.floor((FEED_COL_MIN - FEED_CARD_CHROME) / FEED_CHAR_W)).toBe(35);
    // 结构性不变式：多列档卡宽 ≥ 653 ⇒ 任何合规摘要一行读完（R1）；单列档铺满（R2）。
    const grid = 1602, cols = feedColsForContentWidth(grid);
    const cardW = (grid - (cols - 1) * FEED_ROW_GAP) / cols;
    expect(cols).toBe(2);
    expect(Math.floor((cardW - FEED_CARD_CHROME) / FEED_CHAR_W)).toBeGreaterThanOrEqual(FEED_SUMMARY_MAX);
  });

  it("单列带机制已**整体删除**（四轮）：不该再有收轨道 / 收头宽的规则", () => {
    // 历史：二/三轮为让单列档「卡与头左右缘对齐」把轨道收到 700 并左对齐，代价是右侧 28–228px 空档。
    // 四轮改成「单列铺满 + 卡宽由列数规则保证」，对齐成了布局的结果而不是补丁 ⇒ 那两条规则都删掉。
    // 本测试是**反向锁**：任何人把旧规则加回来都会红。
    expect(cssNoCommentAll).not.toMatch(/\.feed-list\[data-cols="1"\]/);
    expect(cssNoCommentAll).not.toMatch(/\.feed-content:has\(/);
    expect(cssNoCommentAll).not.toMatch(/max-width:\s*1134px/);
    expect(cssNoCommentAll).not.toMatch(/max-width:\s*calc\(var\(--feed-card-max\) \+ 48px\)/);
    // 正向：主规则仍在（列数＝唯一真源）
    expect(cssNoCommentAll).toMatch(/grid-template-columns:\s*repeat\(var\(--feed-cols, 1\), minmax\(0, 1fr\)\)/);
  });
});

describe("侧栏形态（四轮 T3/T2：朱子 09-24 图3「有空间却没有中文」＋图2「滚动条不够优雅」）", () => {
  const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
  const cssNoComment = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");

  it("不许再出现把导航文字收成 0 宽的规则（icon-only rail 的机制，图3 的根因）", () => {
    // 三轮那条 rail 靠 `.side-text { max-width: 0; opacity: 0 }` 把 9 项文字全部收掉
    // （实测 769–900 全档文字宽 0）。四轮 T3 删除该形态 ⇒ 这条规则不许再回来。
    // ⚠ 这是源码级锁；「每一项真的有中文」由 scripts/gittok-responsive-check.mjs 读 DOM 实测
    //   （`itemsWithZeroText === 0`）与视觉闸的观感清单共同守。
    const sideTextBlocks = [...cssNoComment.matchAll(/\.side-text\s*\{([^}]*)\}/g)].map((m) => m[1]);
    expect(sideTextBlocks.length).toBeGreaterThan(0); // 样本有效性：真扫到了这条规则
    const collapsed = sideTextBlocks.filter((b) => /max-width:\s*0(px)?\b/.test(b));
    expect(collapsed).toEqual([]);
  });

  it("侧栏一律不出条 + 底缘渐隐（四轮 T2 定版），且不落 scrollbar-width:none（锁①）", () => {
    // 定版依据：两版注入截图对比（D:/tmp/gt-layout/r4/设计pass/inj-t2v1.json 不出条 /
    // inj-t2v2.json 内缩 20px）——取「不出条 + 底缘渐隐」：导航列不参与折行。
    const sb = cssNoComment.match(/\.sidebar\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(sb).toMatch(/mask-image:\s*linear-gradient/);
    expect(sb).toMatch(/scrollbar-width:\s*auto/);
    expect(cssNoComment).toMatch(/\.sidebar::-webkit-scrollbar\s*\{[^}]*width:\s*0/);
    expect(cssNoComment).not.toMatch(/scrollbar-width:\s*none/);
  });
});
