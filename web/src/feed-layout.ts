/** 与 styles.css `--feed-card-h` / `--feed-row-gap` / `@media (max-width: 768px)` 同步。
 * 卡片锁高：窗口垫片按这个算，禁止再按内容撑开。 */

export const FEED_CARD_HEIGHT = 288;
export const FEED_ROW_GAP = 16;
export const FEED_ROW_GAP_MOBILE = 12;
export const FEED_ROW_HEIGHT = FEED_CARD_HEIGHT + FEED_ROW_GAP;
export const FEED_COLS_DESKTOP = 2;
export const FEED_COLS_MOBILE = 1;
export const FEED_MOBILE_MAX_WIDTH = 768;
/** G-10：每列最小宽度。⚠ 与 styles.css 的 `--feed-col-min` 双写，改一处必须改两处，
 *  否则 CSS 实际列数与垫片按列数算出的高度失配 → 虚拟列表错位（同 `FEED_CARD_HEIGHT` 那条纪律）。
 *  2026-09-23：500 → 550 → **536**（536 是「一行 28 字」的精确反推值：floor((536−69)/16.66)=28）。
 *  取 536 而非 550 是为了让 1920 档出三列（三列需网格 3×536+2×16=1640px，550 需 1682px 放不下）。
 *  CSS 的轨道下限写的是 `min(536px, 100%)`——容器窄于 536 时轨道退成容器宽、仍算 1 列，
 *  与本函数 `Math.max(1, …)` 同值，故两边在全部实测宽度上一致（489/629/720/936/1079/1136/1336/1640/1656 逐档比对过）。 */
export const FEED_COL_MIN = 536;
/** 2026-09-23：卡宽上限（栗子：「能两列的时候不要强行拉伸这么长的宽度」）。
 *  ⚠ 与 styles.css 的 `--feed-card-max` 双写，且**只在 >768 生效**（≤768 由
 *  `grid-template-columns: 1fr` 让卡片占满，是既有手机设计）。
 *  它只约束卡片自身（轨道仍是 1fr），所以**不进列数计算** —— `feedColsForContentWidth` 不受它影响。
 *  一行容量：640px → floor((640 − 69) / 16.66) = 34 字（下限 550px → 28 字）。 */
export const FEED_CARD_MAX = 640;
/** G-11：视口高 ≤560（横屏手机）时 CSS 把 `--feed-card-h` 降到 210px。
 *  ⚠ 同样是双写契约：垫片行高必须跟着降，否则滚动高度与内容不符。 */
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
 * G-10：列数不再由视口宽决定，而要照 CSS `repeat(auto-fill, minmax(min(FEED_COL_MIN, 100%), 1fr))`
 * 用**网格自身可用宽度**还原（视口宽推不出列数——侧栏、内距、1500px 上限都吃宽度）。
 * 与浏览器同式：列数 = floor((可用宽 + 间距) / (最小列宽 + 间距))，至少 1 列。
 * 轨道 max 保持 `1fr`（非确定）是前提：CSS 的 auto-fill 计数在 max 确定为长度时会改用 max 计数，
 * 那样 1120px 网格会塌成一列而本函数仍算两列 → 垫片错位。卡宽上限（FEED_CARD_MAX）只约束卡片自身，
 * 不参与列数，故本函数与上限无关。
 */
export function feedColsForContentWidth(contentWidth: number, rowGap: number = FEED_ROW_GAP): number {
  if (!(contentWidth > 0)) return 1;
  return Math.max(1, Math.floor((contentWidth + rowGap) / (FEED_COL_MIN + rowGap)));
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
