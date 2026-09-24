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

  it("卡宽上限**全档统一**（三轮：跨 768 连续 + 修可读性越界），手机档仍 1fr 占满", () => {
    // 三轮把上限从 `@media (min-width:769px)` 提成基础规则，两个原因：
    //   ① 跨 768 连续：手机档原先无上限（768 档卡宽 744 ＝ 40.5 汉字，超考证区间上沿 38），
    //      一越界上限就生效 → 切换当帧 36–44px 瞬跳（实测 smooth-after-v2.json）；
    //   ② 上限统一后 768 两侧几何相同，该簇消失；≤768「卡宽 ≥ 视口 88%」仍成立（700/768 = 91.1%）。
    const base = css.match(/\n\.feed-list\s*>\s*\.card\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(base).toMatch(/max-width:\s*var\(--feed-card-max\)/);
    expect(base).toMatch(/justify-self:\s*start/); // 与左对齐的频道头对齐（center 会错开最多 22px）
    // 只有 max-width 不够：grid item 会收缩成 max-content（实测塌成 36px）
    expect(base).toMatch(/width:\s*100%/);
    // 手机档仍是 1fr 占满（≤768 的块文件里有多个，取**含 .feed-list 的那个**）
    const mobileBlocks = [...css.matchAll(/@media \(max-width:\s*768px\)\s*\{[\s\S]*?\n\}/g)].map((m) => m[0]);
    const mobileBlock = mobileBlocks.find((b) => /\.feed-list\s*\{/.test(b)) ?? "";
    expect(mobileBlock).toMatch(/\.feed-list\s*\{[^}]*grid-template-columns:\s*1fr/);
  });
});

describe("列数（照 CSS auto-fill 同式还原）", () => {
  it("列数反解（第四版规则：卡片宽度永在 [480, 700]）", () => {
    // 规则：cols = ceil((A+gap)/(700+gap))，若卡片被压到 <480 就减一列。用实测网格宽逐点锁。
    expect(feedColsForContentWidth(1602)).toBe(3); // 1920/2560 档 → (1602−32)/3 = 523
    expect(feedColsForContentWidth(1481)).toBe(3); // 1760 档 → 483
    expect(feedColsForContentWidth(1472)).toBe(3); // 三列的下界：(1472−32)/3 = 480（正好到下限）
    expect(feedColsForContentWidth(1471)).toBe(2); // 再窄 1px 就会压到 479.67 → 退两列（宁可两列不挤窄卡）
    expect(feedColsForContentWidth(1421)).toBe(2); // **1700 档 → 两列 700**（栗子点名的场景，改前是 3×463）
    expect(feedColsForContentWidth(1416)).toBe(2); // 旧两列下界（M=420 时代）：此时两列 700
    expect(feedColsForContentWidth(1352)).toBe(2); // 1631 档 → 668
    expect(feedColsForContentWidth(1321)).toBe(2); // 1600 档 → 652（改前 auto-fill 会排三列各 430＝21 汉字）
    expect(feedColsForContentWidth(1221)).toBe(2); // 1500 档 → 603
    expect(feedColsForContentWidth(1121)).toBe(2); // 1400 档 → 553
    expect(feedColsForContentWidth(1001)).toBe(2); // 1280 档 → 493
    expect(feedColsForContentWidth(996)).toBe(2); // **1275 档 → 490（硬约束：已认可窗口，必须两列）**
    expect(feedColsForContentWidth(976)).toBe(2); // 两列的新下界：(976−16)/2 = 480（正好到下限）
    expect(feedColsForContentWidth(975)).toBe(1); // 再窄 1px 就会压到 479.5 → 退回单列（宁可单列不挤窄卡）
    expect(feedColsForContentWidth(921)).toBe(1); // 1200 档 → 单列 700（改前是 2×453）
    expect(feedColsForContentWidth(861)).toBe(1); // 1140 档 → 单列 700（改前 2×423）
    expect(feedColsForContentWidth(856)).toBe(1); // 旧两列下界（M=420）：现在按 480 判已是单列
    expect(feedColsForContentWidth(748)).toBe(1); // 单列带（内容块收到 748）
    expect(feedColsForContentWidth(721)).toBe(1); // 1000 档
    expect(feedColsForContentWidth(661)).toBe(1); // 940 档（卡片填满）
    expect(feedColsForContentWidth(480)).toBe(1);
    expect(feedColsForContentWidth(366)).toBe(1); // ≤768 手机档：1 列填满
    expect(feedColsForContentWidth(0)).toBe(1);
  });

  it("列宽下限 480px＝24 汉字、单列档上限 700px＝37 汉字（考证区间的实测取舍）", () => {
    // 实测口径：一行容量 = floor((卡宽 − 69) / 16.66)（与闸的 1275 档标定 25 字同式）
    expect(FEED_COL_MIN).toBe(480);
    expect(Math.floor((FEED_COL_MIN - 69) / 16.66)).toBe(24);
    // 考证的可读区间 22–38 汉字（Bringhurst 45–75 拉丁字符 ÷ 2；Unicode TR11 全角 1em／半角 1/2em；
    // WCAG 2.2 SC 1.4.8 只给上限「80 chars (40 if CJK)」，原文声明非强制）——480 落在区间内。
    expect(Math.floor((FEED_COL_MIN - 69) / 16.66)).toBeGreaterThanOrEqual(22);
    // 上限 700＝37 汉字，落在 22–38 区间内（WCAG 的 CJK 上限 40）
    expect(FEED_CARD_MAX).toBe(700);
    expect(Math.floor((FEED_CARD_MAX - 69) / 16.66)).toBe(37);
  });

  it("单列带由列数驱动、与像素边界解耦（乙B6），且规则**排在主规则之后**（乙B1）", () => {
    // 旧写法把 1134 写死在 @media 里（＝2×420+16+216+48+15−1 的派生值）；改 M 就会过期。
    const cssNoComment = readFileSync(resolve("web/src/styles.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    expect(cssNoComment).not.toMatch(/max-width:\s*1134px/);
    expect(cssNoComment).not.toMatch(/max-width:\s*calc\(var\(--feed-card-max\) \+ 48px\)/);
    // 收边作用在「不参与列数反解」的元素上：单列档收网格轨道（>768 内）+ 频道头/偏好条/空态
    const band = cssNoComment.match(/@media \(min-width: 769px\)\s*\{[\s\S]*?\n\}/g)?.join("\n") ?? "";
    // 四轮 T1（乙B2）：列数开关从 [style*="--feed-cols: 1"] 改成显式属性 [data-cols="1"]
    //（属性串匹配依赖 React 序列化出「含空格」的 --feed-cols: 1;，序列化策略一变就静默失效）
    expect(band).toMatch(/\.feed-list\[data-cols="1"\]\s*\{[^}]*minmax\(0, var\(--feed-card-max\)\)/);
    expect(band).toMatch(/justify-content:\s*start/);
    // 四轮 T1（甲A1）：频道头/偏好条/空态改成**按列数分流**——只有单列档限宽 700，多列档铺满网格。
    // 这条同时是「图1 回归」的源码级指纹（改前是全档 max-width，多列档头只占网格 43%–71%）。
    expect(cssNoComment).toMatch(
      /\.feed-content:has\(\.feed-list\[data-cols="1"\]\)\s*>\s*\.channel-head,[\s\S]{0,220}?max-width:\s*var\(--feed-card-max\)/,
    );
    expect(cssNoComment).not.toMatch(/\.feed-content\s*>\s*\.channel-head\s*\{[^}]*max-width:\s*var\(--feed-card-max\)/);
    // ⚠ 自锁回归锁：`.feed-content` 自己**不许**再被收窄——列数是从 .feed-list 的 clientWidth 反解的，
    //    收窄它会让反解永远得到 1 列（实测 900–1751 全档 cols 恒为 1）。
    expect(cssNoComment).not.toMatch(
      /\.feed-content:has\(\.feed-list\[[^\]]*\]\)\s*\{[^}]*max-width/s,
    );
    // 四轮 T1（乙B1）：单列带规则**必须排在主规则之后**（同优先级晚者胜）。
    // 改前它写在主规则之前 ⇒ 从未生效（读计算值：1200 档轨道 928px 而非 700px）。
    // 这里只能守源码顺序；「真的生效」由 scripts/gittok-responsive-check.mjs 读计算值断言。
    const iMain = cssNoComment.indexOf("grid-template-columns: repeat(var(--feed-cols, 1), minmax(0, 1fr))");
    const iBand = cssNoComment.indexOf('.feed-list[data-cols="1"] {');
    expect(iMain).toBeGreaterThan(-1);
    expect(iBand).toBeGreaterThan(-1);
    expect(iBand).toBeGreaterThan(iMain);
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
