// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, it, expect } from "vitest";
import {
  FEED_CARD_CHROME,
  FEED_CARD_CHROME_MOBILE,
  FEED_CARD_MAX,
  FEED_CARD_MIN,
  FEED_CHAR_W,
  FEED_COL_MIN,
  FEED_GRID_REF,
  FEED_REASON_CHAR_W,
  FEED_REASON_MAX,
  FEED_SUMMARY_FONT_PX,
  FEED_SUMMARY_MAX,
  FEED_MOBILE_MAX_WIDTH,
  FEED_OVERSCAN_PX,
  FEED_ROW_GAP,
  FEED_ROW_GAP_MOBILE,
  FEED_ROW_HEIGHT,
  buildColumnIndex,
  estCardHeightFor,
  feedCardShapeFor,
  feedCardWidthFor,
  feedColWindowFromPrefix,
  feedColsForContentWidth,
  feedColsForWidth,
  feedGridFromMatch,
  feedRowGapForWidth,
  feedTagSlotsForCard,
  feedTierMetricsFor,
  feedViewportOf,
  isScrollableOverflow,
  sameColWindows,
} from "../feed-layout.ts";

// ── 十二轮（2026-10-01，块八）：瀑布流重构 ─────────────────────────────────────────
// 栗子口径：「卡片几行其实没有太大所谓，卡片多高其实也没有太大所谓，就是因为宽度会变，
// 所以其实定死没有意义，我的意思是别有空隙你懂吗。」
// ⇒ 卡高＝内容自然高度（FEED_CARD_HEIGHT/FEED_CARD_FIXED_H/feedWindow 行制窗口全部退役）；
//   布局＝JS 列式瀑布流（K 等宽列、i%K 轮转入列、列内累计偏移虚拟化）。
//   本册把新架构的几何契约钉住；旧架构的锁（行高/槽位/卡高算式）按块八判废。

describe("feed 几何常量", () => {
  it("行距与断点不变；FEED_ROW_HEIGHT 降级为「参照估算口径」（容量工具的启发式，不再是布局真源）", () => {
    expect(FEED_ROW_GAP).toBe(16);
    expect(FEED_ROW_GAP_MOBILE).toBe(12);
    expect(FEED_MOBILE_MAX_WIDTH).toBe(768);
    expect(FEED_ROW_HEIGHT).toBe(288 + FEED_ROW_GAP);
  });
});

describe("feedGridFromMatch", () => {
  it("桌面两列 16 间距，窄屏一列 12 间距（卡高不再由 JS 出）", () => {
    expect(feedGridFromMatch(false)).toEqual({ cols: 2, rowGap: 16 });
    expect(feedGridFromMatch(true)).toEqual({ cols: 1, rowGap: 12 });
    expect(feedColsForWidth(768)).toBe(1);
    expect(feedColsForWidth(769)).toBe(2);
    expect(feedRowGapForWidth(768)).toBe(12);
    expect(feedRowGapForWidth(769)).toBe(16);
  });
});

describe("列式瀑布流：入列（i%K 轮转）", () => {
  it("卡 i 进列 i%K；列内保持 rank 升序（近序性：卡 i+1 不会跑到卡 i 上方远处）", () => {
    expect(buildColumnIndex(7, 3)).toEqual([
      [0, 3, 6],
      [1, 4],
      [2, 5],
    ]);
    expect(buildColumnIndex(4, 2)).toEqual([
      [0, 2],
      [1, 3],
    ]);
    expect(buildColumnIndex(5, 1)).toEqual([[0, 1, 2, 3, 4]]);
  });
  it("空列表给 K 条空列；cols 钳到 ≥1（0 视口宽等异常输入回单列）", () => {
    expect(buildColumnIndex(0, 3)).toEqual([[], [], []]);
    expect(buildColumnIndex(2, 0)).toEqual([[0, 1]]);
  });
});

describe("列式瀑布流：列内累计偏移窗口（feedColWindowFromPrefix）", () => {
  // 统一卡高 h=100、行距 gap=16 ⇒ prefix = [0, 116, 232, ...]
  const h = 100;
  const gap = 16;
  const n = 50;
  const prefix = [0];
  for (let k = 0; k < n; k++) prefix.push(prefix[k] + h + gap);

  it("未滚动：窗口从头开始，上面不垫", () => {
    const w = feedColWindowFromPrefix(prefix, 0, 900, 200);
    expect(w.startIdx).toBe(0);
    expect(w.topPad).toBe(0);
    expect(w.endIdx).toBe(Math.floor((900 + 200) / (h + gap)) + 1);
    expect(w.bottomPad).toBe(prefix[n] - prefix[w.endIdx]);
  });

  it("滚到中段：切片从中间开始，topPad = 首卡顶偏移", () => {
    const viewTop = 20 * (h + gap);
    const w = feedColWindowFromPrefix(prefix, viewTop, viewTop + 900, 200);
    expect(w.startIdx).toBe(18); // 卡 18 底边(19×116=2204) > 2320−200=2120 ⇒ 从 18 起
    expect(w.topPad).toBe(prefix[18]);
    expect(w.endIdx).toBeGreaterThan(w.startIdx);
    expect(w.bottomPad).toBe(prefix[n] - prefix[w.endIdx]);
  });

  it("垫片 + 可见卡 = 列总高（构造恒等式）", () => {
    for (const viewTop of [0, 500, 2000, 4500, 5600]) {
      const w = feedColWindowFromPrefix(prefix, viewTop, viewTop + 900, 200);
      const visibleH = w.endIdx > w.startIdx ? prefix[w.endIdx] - prefix[w.startIdx] : 0;
      expect(w.topPad + visibleH + w.bottomPad + gap).toBe(prefix[n] + gap);
    }
  });

  it("滚过末尾：窗口收在最后一卡，bottomPad=0", () => {
    const w = feedColWindowFromPrefix(prefix, prefix[n], prefix[n] + 900, 200);
    expect(w.endIdx).toBe(n);
    expect(w.bottomPad).toBe(0);
  });

  it("空列不垫、不切片；overscan 缺省 = FEED_OVERSCAN_PX（≈3 屏语义延续）", () => {
    expect(feedColWindowFromPrefix([0], 0, 900)).toEqual({
      startIdx: 0,
      endIdx: 0,
      topPad: 0,
      bottomPad: 0,
    });
    expect(FEED_OVERSCAN_PX).toBe(3000);
  });

  it("sameColWindows 逐列比较切片与垫片", () => {
    const a: ReturnType<typeof feedColWindowFromPrefix>[] = [
      { startIdx: 0, endIdx: 5, topPad: 0, bottomPad: 100 },
      { startIdx: 1, endIdx: 6, topPad: 116, bottomPad: 50 },
    ];
    expect(
      sameColWindows(
        a,
        a.map((w) => ({ ...w })),
      ),
    ).toBe(true);
    expect(sameColWindows(a, [a[0], { ...a[1], startIdx: 2 }])).toBe(false);
    expect(sameColWindows(a, [a[0]])).toBe(false);
  });
});

describe("estCardHeightFor（未测量卡的估算兜底）", () => {
  const short = { summary: "一句话摘要", reason: "短理由" };
  const long = {
    summary: "七".repeat(35),
    reason: "八".repeat(150),
  };
  it("内容越长越高；恒为正且数量级合理（固定件 ≈ 154 + 文本块）", () => {
    const hShort = estCardHeightFor(short, 793);
    const hLong = estCardHeightFor(long, 793);
    expect(hShort).toBeGreaterThan(150);
    expect(hLong).toBeGreaterThan(hShort);
    // 契约满载（35+150 字）在标准字号 793 宽下：摘要 1 行 + 理由 3 行 ⇒ 与旧版 288 同数量级
    expect(hLong).toBeLessThan(600);
  });
  it("同内容卡越窄越高（每行容量变小 ⇒ 行数变多）", () => {
    const wide = estCardHeightFor(long, 793);
    const narrow = estCardHeightFor(long, 494);
    expect(narrow).toBeGreaterThanOrEqual(wide);
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
    // 三轮 T1 验收②：同一个交互在不同元素上快慢不一，是「过渡不丝滑」的观感来源之一。
    // 允许：transition: none（锁⑨要求它在 .card.is-open-source 上）；`0s linear` 的 visibility 延迟开关。
    const stripped = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
    const decls = [...stripped.matchAll(/transition:\s*([^;}]+)/g)].map((m) =>
      m[1].replace(/\s+/g, " ").trim(),
    );
    expect(decls.length).toBeGreaterThan(20); // 样本有效性：真扫到了声明（避免正则失效后「恒空窗口」假绿）
    const bare = decls.filter((d) => d !== "none" && /\d*\.?\d+m?s|\d+ms/.test(d.replace(/0s/g, "")));
    expect(bare).toEqual([]);
  });

  it("注释外不出现中文破折号行（＝注释漏闭合的指纹）", () => {
    // 三轮实伤：`── … ──` 落在注释的 `*/` 之后 → 浏览器把这段文字当成选择器，紧跟着的规则整条被吞。
    const stripped = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
    const stray = stripped.split("\n").filter((l) => l.includes("──") && !l.trim().startsWith("//"));
    expect(stray).toEqual([]);
  });
});

describe("双写契约（CSS 与 JS 常量不许漂；十二轮退场变量必须退干净）", () => {
  const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
  const css = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");
  it("--feed-card-max === FEED_CARD_MAX（单列档列宽上限，JS 同式）", () => {
    const cssMax = Number(css.match(/--feed-card-max:\s*(\d+)px/)?.[1]);
    expect(cssMax).toBe(FEED_CARD_MAX);
  });
  it("定高/槽位时代的变量退场：--feed-card-h / --feed-col-min / --feed-summary-lines / --feed-reason-lines 不许再出现", () => {
    // 谁把定高（--feed-card-h）或行数槽位（--feed-*-lines）加回 CSS，这里红——
    // 它们是「卡高算式/槽位空档」时代的开关，块八判废（规格十二轮追加 §一.2）。
    expect(css).not.toMatch(/--feed-card-h\s*:/);
    expect(css).not.toMatch(/--feed-col-min\s*:/);
    expect(css).not.toMatch(/--feed-summary-lines\s*:/);
    expect(css).not.toMatch(/--feed-reason-lines\s*:/);
  });
  it("手机档行距 12px 仍在（--feed-row-gap @≤768）", () => {
    expect(css).toMatch(/--feed-row-gap:\s*12px/);
  });
});

describe("列式容器（.feed-list/.feed-col 的结构契约）", () => {
  const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8");
  const css = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");

  it(".feed-list = 横向 flex + 居中 + 行距 gap；列宽算式与 feedCardWidthFor 同式", () => {
    const feedList = css.match(/^\.feed-list\s*\{([^}]*)\}/m)?.[1] ?? "";
    expect(feedList).toMatch(/display:\s*flex/);
    expect(feedList).toMatch(/justify-content:\s*center/);
    expect(feedList).toMatch(/gap:\s*var\(--feed-row-gap\)/);
    const col = css.match(/\.feed-list\s*>\s*\.feed-col\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(col).toMatch(
      /width:\s*calc\(\(100%\s*-\s*\(var\(--feed-cols,\s*1\)\s*-\s*1\)\s*\*\s*var\(--feed-row-gap\)\)\s*\/\s*var\(--feed-cols,\s*1\)\)/,
    );
    expect(col).toMatch(/min-width:\s*0/);
    expect(col).toMatch(/flex-direction:\s*column/);
    // 旧 grid 语义不许回流（瀑布流列由 flex 承担）
    expect(css).not.toMatch(/\.feed-list[^{]*\{[^}]*grid-template-columns/);
  });

  it("卡片铺满自己的列（卡宽 = 列宽）：.feed-col .card { width:100% }；.card 不许有 height/定高", () => {
    const cardInCol = css.match(/\.feed-col\s+\.card\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(cardInCol).toMatch(/width:\s*100%/);
    const card = css.match(/^\.card\s*\{([^}]*)\}/m)?.[1] ?? "";
    expect(card, "卡片不许再锁高（块八：该多高就多高）").not.toMatch(/(^|[^-])height:\s/);
    expect(card).toMatch(/overflow:\s*hidden/); // BFC：子 margin 不穿出 ⇒ R-D1 的 0 死空间由构造保证
    // 上限只许落在列（单列档）与头/偏好条上，不许落在卡片身上
    expect(card).not.toMatch(/max-width/);
    expect(css, "不许用 justify-self 把卡片挤到一边（四轮红框那条的根因）").not.toMatch(
      /justify-self:\s*(start|end|left|right)/,
    );
  });

  it("单列档**铺满网格**（十三轮：793 不再收单列，两侧空隙零容忍）；上限断点机制不许回潮", () => {
    // 十三轮（2026-10-01，栗子「两侧的空隙不允许，以后不允许再看到」）：
    // 09-25「单列极限 793 + 对称页边距」与十轮 R4b 一并作废；793 只剩多列档列数反解上界的语义。
    expect(css, "单列档列宽上限规则不许回潮").not.toMatch(
      /\.feed-list\[data-cols="1"\][^{]*\.feed-col[^{]*\{[^}]*max-width/,
    );
    expect(css, "头/偏好条收宽规则不许回潮（头≡卡=网格宽，天然成立）").not.toMatch(
      /\.feed-layout:has\([^)]*\)[^{]*\.channel-head[^{]*\{[^}]*max-width/,
    );
    // ⚠ 不许用视口断点当开关：断点与 JS 列数切换不同帧 ⇒ 头宽先行跳、FLIP 追不上（实测踩到）
    expect(css).not.toMatch(/@media \(min-width: 769px\) and \(max-width: 1593px\)/);
  });

  it("槽位时代的机制退干净：data-sum-lines 分流与 .clamp-text 不许再出现", () => {
    expect(css).not.toMatch(/data-sum-lines/);
    expect(css).not.toMatch(/\.clamp-text/);
    const src = readFileSync(resolve("web/src/FeedCard.tsx"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    expect(src, "FeedCard 里不许再包 .clamp-text（摘要/理由直接自然流）").not.toMatch(/clamp-text/);
    expect(src, "卡片必须带 data-repo（虚拟列表实测回填的定位键）").toMatch(/data-repo=\{card\.repo\}/);
  });
});

describe("列数（十轮定案规则原样：卡宽 ∈ [460, 793] 的最小列数）", () => {
  it("列数反解全档可复算", () => {
    // 阈值来源：上限 793 ＝ 两列档在参照档（1920）下的单卡宽；下限 460 ＝ K-11 一行容量 24 字同源档。
    expect(FEED_CARD_MAX).toBe(793);
    expect(FEED_CARD_MIN).toBe(460);
    expect(FEED_SUMMARY_MAX).toBe(35);
    expect(FEED_COL_MIN).toBe(Math.ceil(FEED_SUMMARY_MAX * FEED_CHAR_W + FEED_CARD_CHROME));
    // 实测档位（本机 dist 逐档读计算值，见 scripts/gittok-responsive-check.mjs 的 EXPECT 表）
    expect(feedColsForContentWidth(1602)).toBe(2); // 1920/2560 档 → 2 列 × 793
    expect(feedColsForContentWidth(1328)).toBe(2); // 1600 档 → 2 × 656
    expect(feedColsForContentWidth(1003)).toBe(2); // 1275 档 → 2 × 494
    expect(feedColsForContentWidth(936)).toBe(2); // 十轮门槛：两列恰好 460（网格 936 ＝ 视口 1208）
    expect(feedColsForContentWidth(935)).toBe(1); // 459.5 < 460 ⇒ 回单列 793
    expect(feedColsForContentWidth(793)).toBe(1); // 恰好 793 ⇒ 单列（卡宽 = 网格 = 793）
    expect(feedColsForContentWidth(0)).toBe(1);
  });

  it("全档两条不变式：两列档零留白；**单列档卡宽 = 网格宽（铺满，十三轮）**；多列档卡宽 ∈ [460, 793]", () => {
    for (const w of [793, 794, 828, 900, 935, 936, 1003, 1128, 1228, 1328, 1428, 1602]) {
      const n = feedColsForContentWidth(w);
      const cardW = feedCardWidthFor(w, n, FEED_ROW_GAP);
      if (n >= 2) {
        expect(n * cardW + (n - 1) * FEED_ROW_GAP, `内容宽 ${w} 两列档有留白`).toBeCloseTo(w, 6);
        expect(cardW, `内容宽 ${w} 两列档卡宽超上限`).toBeLessThanOrEqual(FEED_CARD_MAX + 1e-9);
        expect(cardW, `内容宽 ${w} 两列档卡宽低于下限`).toBeGreaterThanOrEqual(FEED_CARD_MIN - 1e-9);
      } else {
        // 十三轮：单列卡宽 = 网格宽（两侧空隙零容忍；793 上限不再收单列）
        expect(cardW, `内容宽 ${w} 单列档卡宽`).toBe(w);
      }
    }
  });

  it("多列档单卡宽上界 = 两列档在参照档下的单卡宽（09-25 推导保留；十三轮起仅约束列数反解）", () => {
    expect(FEED_CARD_MAX).toBe(Math.floor((FEED_GRID_REF - FEED_ROW_GAP) / 2));
    expect(feedColsForContentWidth(FEED_GRID_REF)).toBe(2);
    expect(FEED_CARD_MAX).toBeGreaterThan(FEED_COL_MIN);
  });
});

describe("档内形态（十三轮改版：字号恒定 / 标签槽位 T；行数与卡高退役）", () => {
  it("形态逐档可复算：卡宽（单列铺满）+ 恒定字号 + 标签槽位（不含卡高/行数）", () => {
    const table: Array<[number, number, number, number]> = [
      // 内容宽, 列数, 卡宽, 标签槽位
      [1602, 2, 793, 8], // 参照档（1920/2560 两列）
      [1328, 2, 656, 6], // 1600 档
      [1128, 2, 556, 5], // 1400 档（十三轮起字号恒 16.66，不再收缩到 13.91）
      [1003, 2, 494, 4], // 1275 档（摘要自然换 2 行，字号恒定）
      [928, 1, 928, 8], // 1200 档（十三轮：单列铺满，不再收 793；槽位钳到上限 8）
      [828, 1, 828, 8], // 1100 档（同上）
      [728, 1, 728, 7], // 1000 档
    ];
    for (const [w, cols, cardW, T] of table) {
      const s = feedCardShapeFor(w, cols, FEED_ROW_GAP);
      expect(Math.round(s.cardWidth), `内容宽 ${w} 卡宽`).toBe(cardW);
      expect(s.summaryFontPx, `内容宽 ${w} 摘要字号恒定`).toBeCloseTo(FEED_SUMMARY_FONT_PX, 3);
      expect(s.tagSlots, `内容宽 ${w} 标签槽位`).toBe(T);
      expect((s as unknown as Record<string, unknown>).cardHeight, "卡高不许再由算式产出").toBeUndefined();
    }
  });

  it("摘要字号恒定 0.98rem（十三轮：流式收缩退役——「某些宽度字体异常变小」的根治）", () => {
    expect(FEED_SUMMARY_FONT_PX).toBeCloseTo(16.66, 6);
    // 全档全 chrome 同一个字号（跨档不跳、宽窄卡一致）
    const widths = [288, 320, 358, 389, 406, 456, 494, 528, 556, 606, 656, 706, 728, 736, 793, 928];
    for (const w of widths) {
      const s = feedCardShapeFor(w, 1, FEED_ROW_GAP);
      expect(s.summaryFontPx, `卡宽 ${w} 字号漂移`).toBeCloseTo(16.66, 6);
    }
    // CSS 侧也是字面量（不许再有变量间接层）
    const cssRaw = readFileSync(resolve("web/src/styles.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    const sum = cssRaw.match(/^\.summary\s*\{([^}]*)\}/m)?.[1] ?? "";
    expect(sum).toMatch(/font-size:\s*0\.98rem\s*;/);
    expect(cssRaw, "流式字号变量不许回潮").not.toMatch(/--feed-summary-font\s*:/);
  });

  it("手机档常数（chrome 61）与档位打包", () => {
    expect(FEED_CARD_CHROME_MOBILE).toBe(61);
    expect(feedTierMetricsFor(true)).toEqual({
      rowGap: FEED_ROW_GAP_MOBILE,
      chrome: FEED_CARD_CHROME_MOBILE,
    });
    expect(feedTierMetricsFor(false)).toEqual({ rowGap: FEED_ROW_GAP, chrome: FEED_CARD_CHROME });
  });
});

describe("标签槽位（八～九轮机制原样：槽位预算 + `+N` 让位）", () => {
  it("槽位估算逐档可复算", () => {
    expect(feedTagSlotsForCard(793)).toBe(8);
    expect(feedTagSlotsForCard(494)).toBe(4);
    expect(feedTagSlotsForCard(358, FEED_CARD_CHROME_MOBILE)).toBe(3);
  });

  it("九轮：`+N` 片也占一个槽位（八轮把它漏在预算外 ⇒ 1343 档 9/837 张标签行换行）", () => {
    // 本条是**源码级锁**（本仓没有 React 渲染测试）：真实渲染片数与换行由 responsive 闸
    // 的标签断言（tagSlotsUsed ≤ 槽位、tagWrapRows 全 1）与全库探针守。
    const src = readFileSync(resolve("web/src/FeedCard.tsx"), "utf8");
    expect(src, "FeedCard 里找不到「要出 +N 就先让一个槽位」的算式").toMatch(
      /truncated\s*\?\s*Math\.max\(0,\s*tagSlots\s*-\s*1\)\s*:\s*tagSlots/,
    );
    expect(src, "`+N` 的计数必须按实际渲染的片数算（不许再按槽位数算）").toMatch(
      /card\.tags\.length\s*-\s*shownTags\.length/,
    );
  });
});

describe("理由契约（内容侧，硬闸）：显示侧退场后只剩估算用常数", () => {
  it("REASON_MAX=150 与单字宽推导不变（estCardHeightFor 的行数推算依据）", () => {
    expect(FEED_REASON_MAX).toBe(150);
    expect(FEED_REASON_CHAR_W).toBeCloseTo(FEED_CHAR_W * (0.82 / 0.98), 6);
  });
});
