/** 与 styles.css 的 `--feed-card-max` / `--feed-row-gap` / `@media (max-width: 768px)` 同步。
 *  ── 2026-10-01 十二轮（块八，栗子口径）：瀑布流重构 ─────────────────────────────────
 *  「卡片几行其实没有太大所谓，卡片多高其实也没有太大所谓，就是因为宽度会变，所以其实定死
 *   没有意义，我的意思是别有空隙你懂吗。」
 *  ⇒ **卡高＝内容自然高度**（无定高/无槽位/无 clamp），本文件不再产出卡高算式；
 *    布局机制＝JS 列式瀑布流（Chrome 153 不支持 grid masonry，探针 D:/tmp/gt-masonry-probe.mjs）。
 *  价值排序＝灵活 › 优雅 › 统一 › 流畅 › 其余；「别有空隙」＝唯一硬验收
 *  （规格＝docs/七轮-空隙口径合成规格-20260925.md「十二轮追加」）。 */

export const FEED_ROW_GAP = 16;
export const FEED_ROW_GAP_MOBILE = 12;
export const FEED_COLS_DESKTOP = 2;
export const FEED_COLS_MOBILE = 1;
export const FEED_MOBILE_MAX_WIDTH = 768;
/** ── 摘要契约 → 布局反推（2026-09-24 四轮，栗子定标准）────────────────────────────
 *  摘要上限是**站内既有标准**：`src/feed/prompts.ts:156` 的评分提示词原文 `summary_cn` 20–35 个汉字。
 *  · 卡宽上限由它反推：**标准字号**（0.98rem）下一行放下 35 字所需的最小卡宽 = 35×16.66 + 69
 *    = **652.1 → 653px**（＝ FEED_COL_MIN）。
 *  · 九轮起摘要字样**流式**收缩（0.98→0.81rem）⇒「一行读完 35 字」的门槛从 653 降到 **551px**。
 *  · 单列档卡宽上限 = 两列档在参照档下的卡宽 = **793**（见 FEED_CARD_MAX 与 styles.css 的
 *    `--feed-card-max`）。
 *  ⚠ `--feed-col-min` 与 `FEED_COL_MIN` 仍是双写契约；`--feed-card-max` 与 `FEED_CARD_MAX` 同理
 *    （都由 lock 单测钉住）。 */
/** 摘要一行的**内容契约**：上限 35 个汉字（＝提示词里的硬性要求）。 */
export const FEED_SUMMARY_MAX = 35;
/** 实测单字宽（17px 根字号、700 字重；与 G9 表「一行容量 = floor((卡宽−69)/16.66)」同式）。 */
export const FEED_CHAR_W = 16.66;
/** 卡内 chrome 实测 69px（卡内距 20×2 + 摘要内距 12×2 + 左边框 3 + 卡边框 1×2）。 */
export const FEED_CARD_CHROME = 69;
export const FEED_COL_MIN = Math.ceil(FEED_SUMMARY_MAX * FEED_CHAR_W + FEED_CARD_CHROME);
/** 参照档的内容网格宽（1920×1080；＝壳上限 1866 − 侧栏 192 − 左右内距，本机实测 1602）。 */
export const FEED_GRID_REF = 1602;
/** 单列档卡宽**上限**（2026-09-25 五轮，栗子：「我理想的单列卡片的极限宽度应该按这个来」）：
 *  (FEED_GRID_REF − FEED_ROW_GAP) / 2 = (1602 − 16) / 2 = **793**。
 *  ⚠ 与 styles.css 的 `--feed-card-max` 双写（由 lock 单测钉住）；单列档由 CSS 在**内容侧**收窄实现。 */
export const FEED_CARD_MAX = Math.floor((FEED_GRID_REF - FEED_ROW_GAP) / 2);
/** 卡宽**下限**（2026-09-26 十轮 T1）：两列把卡压到 460 以下时退回单列。
 *  出处＝K-11 的一行容量下限 24 汉字（24×16.66+69 ≈ 469，取整档 460）。 */
export const FEED_CARD_MIN = 460;
/** 单列档内容容器上限 = 卡宽上限 + 内容衬距（24×2）——CSS 侧写的就是这个算式。 */
export const FEED_CONTENT_MAX_1COL = FEED_CARD_MAX + 48;
/** ── 理由契约（内容侧，硬闸）：100–150 字（REASON_MIN/MAX，`src/feed/checks.ts` G1 族）。
 *  十二轮起理由**不再有显示行数/槽位**——全文自然流展示（块八：几行没有太大所谓）。
 *  这两个常量只服务**估算器**（estCardHeightFor 的行数推算）与内容闸，不再是布局真源。 */
export const FEED_REASON_MAX = 150;
/** 理由单字宽 = 摘要单字宽 × 字号比（0.82rem ÷ 0.98rem）＝ 16.66 × 0.8367 ≈ **13.94**。 */
export const FEED_REASON_CHAR_W = FEED_CHAR_W * (0.82 / 0.98);
/** 理由行高 = 1.7em @ 0.82rem ≈ 23.7px（styles.css `.reason-clamped { line-height: 1.7 }`）。 */
export const FEED_REASON_LINE_H = FEED_REASON_CHAR_W * 1.7;
/** 摘要行高比（styles.css `.summary { line-height: 1.5 }`）与上下内距（padding: 8px 0）。 */
export const FEED_SUMMARY_LINE_RATIO = 1.5;
export const FEED_SUMMARY_PAD_Y = 16;

/** ── 档内卡片形态（十二轮改版）：卡宽 ⇒ (摘要字号 f, 标签槽位 T) ─────────────────────
 *  · 摘要字号：**流式**（窄档 0.98→0.81rem，让「一行 35 字」下探到卡宽 551）——保留，
 *    它服务可读性，与定高无关；行数不再被钳制（自然换行，块八「几行无所谓」）。
 *  · 标签槽位：`floor((卡宽−chrome)/88)` 截到 [2,8]，其余折进 `+N` —— 让标签行**永不换行**
 *    （`.card-tags` 26px 定高 + overflow:hidden 的防半截 chip 机制不变；chip 自身填满该行，
 *    不是死空间）。 */
export const FEED_TAG_SLOT_PX = 88;
export const FEED_TAG_SLOTS_MIN = 2;
export const FEED_TAG_SLOTS_MAX = 8;

/** 根字号：styles.css 的 `html { font-size: 17px }`。所有 rem↔px 换算都用它，别按 16 算。 */
export const FEED_ROOT_FONT_PX = 17;
/** 摘要字号上界（＝0.98rem 标准字号）与下界 0.81rem（推导史见 git blame 九轮版注释）。 */
export const FEED_SUMMARY_FONT_PX_MAX = 0.98 * FEED_ROOT_FONT_PX; // 16.66
export const FEED_SUMMARY_FONT_PX_MIN = 0.81 * FEED_ROOT_FONT_PX; // 13.77
export const FEED_SUMMARY_LINES_MAX = 3;

/** 摘要字号形态：一行放得下 35 字就 1 行的字号，放不下收缩字号（下限 0.81rem），再窄就换行。
 *  十二轮起返回值里的 `lines` 只是**字号推导的中间量**，不再进 CSS（无槽位、无 clamp）。 */
export function feedSummaryShapeForCard(
  cardWidth: number,
  chrome: number = FEED_CARD_CHROME,
): { fontPx: number; lines: number } {
  const innerW = Math.max(0, cardWidth - chrome);
  for (let lines = 1; lines <= FEED_SUMMARY_LINES_MAX; lines++) {
    const perLine = Math.ceil(FEED_SUMMARY_MAX / lines);
    const fontPx = Math.min(FEED_SUMMARY_FONT_PX_MAX, innerW / perLine);
    if (fontPx >= FEED_SUMMARY_FONT_PX_MIN) return { fontPx, lines };
  }
  return { fontPx: FEED_SUMMARY_FONT_PX_MIN, lines: FEED_SUMMARY_LINES_MAX };
}

/** 摘要行数：`feedSummaryShapeForCard` 的行数（字号推导的中间量；十二轮起不进 CSS）。 */
export function feedSummaryLinesForCard(cardWidth: number, chrome: number = FEED_CARD_CHROME): number {
  return feedSummaryShapeForCard(cardWidth, chrome).lines;
}

/** 标签槽位：估算每片约 88px（实测 chip 50–110px，取偏保守值）⇒ 整行放得下、不换行、不半截。 */
export function feedTagSlotsForCard(cardWidth: number, chrome: number = FEED_CARD_CHROME): number {
  const n = Math.floor((cardWidth - chrome) / FEED_TAG_SLOT_PX);
  return Math.min(FEED_TAG_SLOTS_MAX, Math.max(FEED_TAG_SLOTS_MIN, n));
}

/** 档内卡片形态（**唯一读法**）：网格宽 + 列数 ⇒ 卡宽 / 摘要字号 / 标签槽位。
 *  十二轮起**不含卡高/行数**——卡高＝内容自然高度，由浏览器排版决定（0 死空间由闸钉住）。 */
export interface FeedCardShape {
  cardWidth: number;
  /** 摘要字号（px）：窄档收缩（流式），宽档 = 0.98rem。 */
  summaryFontPx: number;
  tagSlots: number;
}
export function feedCardShapeFor(
  contentWidth: number,
  cols: number,
  rowGap: number = FEED_ROW_GAP,
  chrome: number = FEED_CARD_CHROME,
): FeedCardShape {
  const cardWidth = feedCardWidthFor(contentWidth, cols, rowGap);
  return {
    cardWidth,
    summaryFontPx: feedSummaryShapeForCard(cardWidth, chrome).fontPx,
    tagSlots: feedTagSlotsForCard(cardWidth, chrome),
  };
}

/** ── 估算器：**未测量卡**的自然高度估算（虚拟化兜底；测量值优先，见 FeedVirtualList）────
 *  卡盒高 = 卡内距 40 + 头部 50（头像 40 + 下距 10）+ 摘要块（内距 16 + 行数×1.5×f + 下距 8）
 *  + 理由块（行数×23.7 + 下距 10）+ 元信息行 ≈22 + 下距 10 + 标签行 26 + 上距 4 + 卡边框 2。
 *  行数 = ceil(字数 / max(1, floor(内容宽 / 单字宽)))。估算误差由渲染后实测回填收敛
 *  （锚点补偿防跳动）；只求「同数量级 + 单调」，不求逐像素。 */
export const FEED_EST_HEADER_H = 50;
export const FEED_EST_META_H = 32;
export const FEED_EST_CARD_PAD = 42; // 内距 40 + 边框 2
export function estCardHeightFor(
  text: { summary: string; reason: string },
  cardWidth: number,
  chrome: number = FEED_CARD_CHROME,
  summaryFontPx: number = feedSummaryShapeForCard(cardWidth, chrome).fontPx,
): number {
  const innerW = Math.max(1, cardWidth - chrome);
  const sumPerLine = Math.max(1, Math.floor(innerW / Math.max(1, summaryFontPx)));
  const sumLines = Math.max(1, Math.ceil(text.summary.length / sumPerLine));
  const reasonPerLine = Math.max(1, Math.floor(innerW / FEED_REASON_CHAR_W));
  const reasonLines = Math.max(1, Math.ceil(text.reason.length / reasonPerLine));
  return Math.round(
    FEED_EST_CARD_PAD +
      FEED_EST_HEADER_H +
      (FEED_SUMMARY_PAD_Y + sumLines * FEED_SUMMARY_LINE_RATIO * summaryFontPx + 8) +
      (reasonLines * FEED_REASON_LINE_H + 10) +
      FEED_EST_META_H +
      30, // 标签行 26 + margin-top 4
  );
}

/** ── 列式瀑布流虚拟化（十二轮）──────────────────────────────────────────────────
 *  Chrome 153 实测不支持 grid masonry ⇒ JS 列式：K 个等宽列容器（列数=feedColsForContentWidth），
 *  卡片按 **i%K 轮转入列**（近序性：卡 i+1 不会跑到卡 i 上方远处），列内自然堆叠。
 *  虚拟化＝**列内累计偏移**：每列维护高度前缀和，滚动窗口对每列二分。 */
/** 约三屏的越界预渲染余量（px）。旧行制 10 行×304px 的延续；变高卡下按像素语义。 */
export const FEED_OVERSCAN_PX = 3000;

/** 列 → 卡片下标（i%K 轮转）。纯函数，闸与单测可复算。 */
export function buildColumnIndex(count: number, cols: number): number[][] {
  const k = Math.max(1, cols | 0);
  const out: number[][] = Array.from({ length: k }, () => []);
  for (let i = 0; i < count; i++) {
    const col = out[i % k];
    if (col) col.push(i);
  }
  return out;
}

/** 一列的渲染窗口：startIdx/endIdx 为该列卡数组的闭开区间，topPad/bottomPad 为像素垫片。 */
export interface FeedColWindow {
  startIdx: number;
  endIdx: number;
  topPad: number;
  bottomPad: number;
}

/** 由高度前缀和（prefix[k] = 第 k 张卡顶边的列内偏移，长度 n+1，末位=列总高）二分出窗口。 */
export function feedColWindowFromPrefix(
  prefix: number[],
  rangeTop: number,
  rangeBottom: number,
  overscanPx: number = FEED_OVERSCAN_PX,
): FeedColWindow {
  const n = prefix.length - 1;
  if (n <= 0) return { startIdx: 0, endIdx: 0, topPad: 0, bottomPad: 0 };
  const lo = rangeTop - overscanPx;
  const hi = rangeBottom + overscanPx;
  // 第一个底边越过 lo 的卡（prefix[k+1] > lo）
  let a = 0;
  let b = n;
  while (a < b) {
    const mid = (a + b) >> 1;
    if ((prefix[mid + 1] ?? 0) > lo) b = mid;
    else a = mid + 1;
  }
  const startIdx = a;
  // 第一个顶边 ≥ hi 的卡（prefix[k] ≥ hi）
  a = startIdx;
  b = n;
  while (a < b) {
    const mid = (a + b) >> 1;
    if ((prefix[mid] ?? 0) >= hi) b = mid;
    else a = mid + 1;
  }
  const endIdx = a;
  return {
    startIdx,
    endIdx,
    topPad: prefix[startIdx] ?? 0,
    bottomPad: Math.max(0, (prefix[n] ?? 0) - (prefix[endIdx] ?? 0)),
  };
}

export function sameColWindows(a: FeedColWindow[], b: FeedColWindow[]): boolean {
  return (
    a.length === b.length &&
    a.every((w, i) => {
      const v = b[i];
      return (
        v !== undefined &&
        w.startIdx === v.startIdx &&
        w.endIdx === v.endIdx &&
        w.topPad === v.topPad &&
        w.bottomPad === v.bottomPad
      );
    })
  );
}

export function feedGridFromMatch(mobile: boolean): { cols: number; rowGap: number } {
  return mobile
    ? { cols: FEED_COLS_MOBILE, rowGap: FEED_ROW_GAP_MOBILE }
    : { cols: FEED_COLS_DESKTOP, rowGap: FEED_ROW_GAP };
}

export function feedColsForWidth(width: number): number {
  return width <= FEED_MOBILE_MAX_WIDTH ? FEED_COLS_MOBILE : FEED_COLS_DESKTOP;
}

/**
 * 2026-09-25 八轮（栗子当日第二次定标准）：**列数由「卡宽不得超过 793」反解**——
 *   「首先不允许出现留白……第一张图片的那个卡片长度就是卡片极限长度了，再长就要变成两列」。
 * 2026-09-26 十轮 T1：**补上下限 460**——两列会把卡压到 460 以下时退回单列
 *   （单列档卡宽 = min(网格, 793)，余量成左右对称页边距）。
 * 十二轮：**规则原样不变**（块八只动「高」，不动「宽」）；它同时是瀑布流的列数 K。
 *
 * ⚠ 单一真源：本函数是列数的**唯一**来源，App 把结果写进 CSS 变量 `--feed-cols`
 * （`.feed-list` 的列宽算式读它），瀑布流入列也用同一个值。
 */
export function feedColsForContentWidth(contentWidth: number, rowGap: number = FEED_ROW_GAP): number {
  if (!(contentWidth > 0)) return 1;
  const widthAt = (n: number) => (contentWidth - (n - 1) * rowGap) / n;
  for (let n = 1; n <= 3; n++) {
    const w = n === 1 ? contentWidth : widthAt(n);
    if (w <= FEED_CARD_MAX && w >= FEED_CARD_MIN) return n;
  }
  return 1;
}

export function feedRowGapForWidth(width: number): number {
  return width <= FEED_MOBILE_MAX_WIDTH ? FEED_ROW_GAP_MOBILE : FEED_ROW_GAP;
}

/** ── 参照行高（**估算口径**，不再是布局真源）────────────────────────────────────
 *  十二轮前它是虚拟列表垫片的真源（卡定高 288 + 行距 16）；定高退场后只服务
 *  `gittok-channel-capacity.ts` 的「每屏卡数」估算（约 3.5 屏量级的启发式，误差可容忍）。
 *  任何布局代码不得再消费它。 */
export const FEED_ROW_HEIGHT = 288 + FEED_ROW_GAP;

/** 手机档（≤768）卡内 chrome：`.card` 的内距降为 16px（桌面 20px）⇒ 16×2 + 摘要内距 12×2 + 左边框 3
 *  + 卡边框 1×2 = **61**（桌面 69）。由浏览器实测复核：390 档卡宽 358 / 内容宽 297 = 61 ✓。 */
export const FEED_CARD_CHROME_MOBILE = 61;

/** 档位常数打包（行距 / 卡内 chrome）：桌面与手机各一套。十二轮起不再带理由行数上限
 *  （无 clamp 就没有行数真源；估算器按文本长度自算）。 */
export function feedTierMetricsFor(mobile: boolean): { rowGap: number; chrome: number } {
  return mobile
    ? { rowGap: FEED_ROW_GAP_MOBILE, chrome: FEED_CARD_CHROME_MOBILE }
    : { rowGap: FEED_ROW_GAP, chrome: FEED_CARD_CHROME };
}

/**
 * 某个内容宽 + 列数下，**卡片实际有多宽**（＝CSS 计算值的 JS 同式）。
 *   · 多列档：列 = (内容宽 − (n−1)×行距) / n，列内卡片 width:100% ⇒ 卡宽 = 列宽；
 *   · 单列档：CSS 用 `max-width: var(--feed-card-max)` 收 ⇒ 卡宽 = min(内容宽, 793)。
 */
export function feedCardWidthFor(contentWidth: number, cols: number, rowGap: number = FEED_ROW_GAP): number {
  const n = Math.max(1, cols | 0);
  if (!(contentWidth > 0)) return 0;
  const track = (contentWidth - (n - 1) * rowGap) / n;
  return n === 1 ? Math.min(track, FEED_CARD_MAX) : track;
}

/** overflow-y:auto/scroll 才是真正的滚动口；visible/hidden 只是裁切。 */
export function isScrollableOverflow(overflowY: string): boolean {
  return overflowY === "auto" || overflowY === "scroll";
}

/** 从列表节点往上找最近的滚动口；找不到就退回 window。 */
export function nearestScrollRoot(el: Element | null): HTMLElement | Window {
  let node: HTMLElement | null = el instanceof HTMLElement ? el.parentElement : null;
  while (node) {
    if (isScrollableOverflow(getComputedStyle(node).overflowY)) return node;
    node = node.parentElement;
  }
  return window;
}

type RectTop = { top: number };
type ListBox = { getBoundingClientRect: () => RectTop };
type WindowLike = { innerHeight: number; getBoundingClientRect?: undefined };
type ElementLike = { clientHeight: number; getBoundingClientRect: () => RectTop };

/**
 * 把列表顶边换成「相对滚动口顶」的坐标。
 * window 滚：顶边就是视口 y；元素滚：减去滚动口顶，避免把顶栏高度算进已滚距离。
 */
export function feedViewportOf(
  listEl: ListBox,
  root: WindowLike | ElementLike,
): { listTop: number; viewportHeight: number } {
  if (
    typeof (root as WindowLike).innerHeight === "number" &&
    typeof root.getBoundingClientRect !== "function"
  ) {
    return {
      listTop: listEl.getBoundingClientRect().top,
      viewportHeight: (root as WindowLike).innerHeight,
    };
  }
  const box = root as ElementLike;
  return {
    listTop: listEl.getBoundingClientRect().top - box.getBoundingClientRect().top,
    viewportHeight: box.clientHeight,
  };
}
