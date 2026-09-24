/** 与 styles.css `--feed-card-h` / `--feed-row-gap` / `@media (max-width: 768px)` 同步。
 * 卡片锁高：窗口垫片按这个算，禁止再按内容撑开。 */

export const FEED_CARD_HEIGHT = 288;
export const FEED_ROW_GAP = 16;
export const FEED_ROW_GAP_MOBILE = 12;
export const FEED_ROW_HEIGHT = FEED_CARD_HEIGHT + FEED_ROW_GAP;
export const FEED_COLS_DESKTOP = 2;
export const FEED_COLS_MOBILE = 1;
export const FEED_MOBILE_MAX_WIDTH = 768;
/** ── 摘要契约 → 布局反推（2026-09-24 四轮，栗子定标准）────────────────────────────
 *  栗子原话：「我们必须定好摘要必须小于的字数，然后把所有摘要大于这个字数的都重写」＋
 *  「在卡片是两列及以上的时候说明屏幕有足够的宽度，这个时候应该保证所有摘要都能全部展示出来」
 *  ＋「只要当宽度小于一列的时候，才应该被迫减少摘要的显示宽度」。
 *
 *  ⇒ 第一性依据不是「卡宽应该多少」，而是**这句话能不能一行读完**。所以：
 *     · 摘要上限是**站内既有标准**，不是本轮新造的数——`src/feed/prompts.ts:156` 的评分提示词原文：
 *       `summary_cn`: 面向完全不了解这个项目的人…**20-35 个汉字**（硬性要求：少于 20 字或多于
 *       35 个字都不合格，写完后数一遍字数确认）。`src/feed/card-invariants.ts` 也按同一条线出告警。
 *     · 卡宽由它反推：一行放下 35 字所需的**最小卡宽** = 35×16.66 + 69 = **652.1 → 653px**。
 *     · 列数规则随之改写：取「卡宽仍 ≥ 653」的**最大**列数（旧规则是「最少列数使卡宽 ≤700」）。
 *       结果是：2 列及以上时，任何合规摘要都必然一行放得下；只有屏幕窄到给不出 653px 卡才退 1 列，
 *       而 1 列是**铺满**内容区的（不许留空档——栗子 09-24 红框那条）。
 *     · 「卡宽上限（FEED_CARD_MAX）」这个概念**整个删除**：卡片永远铺满自己的轨道，
 *       宽度只由列数决定；轨道宽由列数规则保证落在 [653, 2×653+16) 内。
 *  ⚠ `--feed-col-min` 与 `FEED_COL_MIN` 仍是双写契约（漂移会让虚拟列表垫片按错列数算高度）。 */
/** 摘要一行的**内容契约**：上限 35 个汉字（＝提示词里的硬性要求）。 */
export const FEED_SUMMARY_MAX = 35;
/** 实测单字宽（17px 根字号、700 字重；与 G9 表「一行容量 = floor((卡宽−69)/16.66)」同式）。 */
export const FEED_CHAR_W = 16.66;
/** 卡内 chrome 实测 69px（卡内距 20×2 + 摘要内距 12×2 + 左边框 3 + 卡边框 1×2）。 */
export const FEED_CARD_CHROME = 69;
/** 多列档最小卡宽 = 一行放下 FEED_SUMMARY_MAX 字 → 35×16.66 + 69 = 652.1 → 653（向上取整留余量）。 */
export const FEED_COL_MIN = Math.ceil(FEED_SUMMARY_MAX * FEED_CHAR_W + FEED_CARD_CHROME);
/** 单列档卡宽的理论上界：再宽就该两列了（2×653+16 = 1322）。
 *  只作**文档与闸的读数参考**，不参与任何约束——约束是「列数由卡宽下限反推」。 */
export const FEED_CARD_MAX = 2 * FEED_COL_MIN + FEED_ROW_GAP;
export const FEED_SHORT_MAX_HEIGHT = 560;
export const FEED_CARD_HEIGHT_SHORT = 210;

export function feedCardHeightForHeight(viewportHeight: number): number {
  return viewportHeight > 0 && viewportHeight <= FEED_SHORT_MAX_HEIGHT
    ? FEED_CARD_HEIGHT_SHORT
    : FEED_CARD_HEIGHT;
}
/** 约 3 屏。快滑也不翻空白，又不把几百张玻璃卡留在 DOM 里。 */
export const FEED_OVERSCAN_ROWS = 10;

export interface FeedGrid {
  cols: number;
  rowGap: number;
}

export interface FeedWindow {
  startRow: number;
  endRow: number;
  startIdx: number;
  endIdx: number;
  topPad: number;
  bottomPad: number;
}

export function feedGridFromMatch(mobile: boolean): FeedGrid {
  return mobile
    ? { cols: FEED_COLS_MOBILE, rowGap: FEED_ROW_GAP_MOBILE }
    : { cols: FEED_COLS_DESKTOP, rowGap: FEED_ROW_GAP };
}

export function feedColsForWidth(width: number): number {
  return width <= FEED_MOBILE_MAX_WIDTH ? FEED_COLS_MOBILE : FEED_COLS_DESKTOP;
}

/**
 * 2026-09-23 第四版：**列数由「卡片宽度必须落在 [FEED_COL_MIN, FEED_CARD_MAX]」反解**，
 * 不再用 CSS `auto-fill`（它只会按 min 取「最多列」＝卡片一路变窄）。
 *
 * 规则（栗子 09-23 第二问的字面实现：「不要固定卡片的宽度…任何窗口都不要大片空隙或过大卡片」）：
 *   1. 先取「能让卡片不超上限」的最少列数：cols = ceil((可用宽 + 间距) / (上限 + 间距))；
 *   2. 若该列数会把卡片压到下限以下，就减一列（直到 1 列）——宁可单列也不出「挤成一条」的窄卡。
 * 两个边界都来自考证的可读区间 22–38 汉字（Bringhurst 45–75 拉丁字符 ÷ 2；Unicode TR11
 * 全角 1em／半角 1/2em；WCAG 2.2 SC 1.4.8 只给上限「80 chars (40 if CJK)」）：
 *   下限 480px＝24 汉字（2026-09-23 傍晚由 420 上调，见 FEED_COL_MIN 的取值史）、
 *   上限 700px＝37 汉字（区间内、且低于 WCAG 的 40）。
 *
 * ⚠ 单一真源：本函数是列数的**唯一**来源，App 把结果写进 CSS 变量 `--feed-cols`
 * （`.feed-list { grid-template-columns: repeat(var(--feed-cols,1), minmax(0,1fr)) }`），
 * 虚拟列表垫片也用同一个值——2026-09-23 之前那套「CSS auto-fill 与 JS 双写常量」的漂移隐患就此消除。
 */
export function feedColsForContentWidth(contentWidth: number, rowGap: number = FEED_ROW_GAP): number {
  if (!(contentWidth > 0)) return 1;
  const widthAt = (n: number) => (contentWidth - (n - 1) * rowGap) / n;
  // 取「卡宽仍 ≥ FEED_COL_MIN（＝一行放得下 35 字的卡宽）」的**最大**列数。
  // 为什么是最大而不是最少：栗子 09-24「在卡片是两列及以上的时候说明屏幕有足够的宽度，
  // 这个时候应该保证所有摘要都能全部展示出来」——列数只能加到一个"摘要仍然读得完整"的上限为止；
  // 能两列就别三列（三列会让卡宽掉到 35 字以下 ≙ 摘要被截），屏幕不够宽就老实一列铺满（不留空档）。
  let cols = 1;
  while (widthAt(cols + 1) >= FEED_COL_MIN) cols++;
  return cols;
}

export function feedRowGapForWidth(width: number): number {
  return width <= FEED_MOBILE_MAX_WIDTH ? FEED_ROW_GAP_MOBILE : FEED_ROW_GAP;
}

export function feedWindow(opts: {
  cardCount: number;
  cols: number;
  rowGap: number;
  listTop: number;
  viewportHeight: number;
  overscanRows?: number;
  /** G-11：窄高档（视口高 ≤560）CSS 把卡高降到 240，垫片必须用同一个值。 */
  cardHeight?: number;
}): FeedWindow {
  const cols = Math.max(1, opts.cols | 0);
  const rowH = (opts.cardHeight ?? FEED_CARD_HEIGHT) + opts.rowGap;
  const rowCount = opts.cardCount > 0 ? Math.ceil(opts.cardCount / cols) : 0;
  const overscan = opts.overscanRows ?? FEED_OVERSCAN_ROWS;
  const viewTop = -opts.listTop;
  const startRow = Math.max(0, Math.floor(viewTop / rowH) - overscan);
  const endRow = Math.min(
    rowCount,
    Math.max(startRow, Math.ceil((viewTop + opts.viewportHeight) / rowH) + overscan),
  );
  return {
    startRow,
    endRow,
    startIdx: Math.min(opts.cardCount, startRow * cols),
    endIdx: Math.min(opts.cardCount, endRow * cols),
    topPad: startRow * rowH,
    bottomPad: Math.max(0, (rowCount - endRow) * rowH),
  };
}

export function sameFeedWindow(a: FeedWindow, b: FeedWindow): boolean {
  return (
    a.startIdx === b.startIdx && a.endIdx === b.endIdx && a.topPad === b.topPad && a.bottomPad === b.bottomPad
  );
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
