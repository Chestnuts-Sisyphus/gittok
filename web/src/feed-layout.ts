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
 *  取值史 500 → 550 → 536 → 460 → 420 → **480**（2026-09-23 傍晚，栗子第三轮验收④）。
 *  420 → 480 的原因（栗子原话）：「卡片在两列甚至两列以上的情况的最小宽度有点小了……
 *  本来我觉得该两列展示的场景结果变成了三列宽度较小的卡片」——1700 档实测 **3 列 × 463px**。
 *  480 的效果（`D:/tmp/gt-layout/r3/t4-矩阵.json` 逐档实测）：
 *    · 1700 → **2 列 × 700**（他点名的场景）；1751 起才转三列 480；
 *    · 1275 仍是两列 490（**硬约束**：栗子已认可的窗口，任何取值让 1275 掉出两列即作废）；
 *    · 1920/2560 仍三列 523，与改前逐像素一致；≤768 手机档不受影响。
 *  480px ＝ **24 汉字**：口径与闸一致（一行容量 = floor((卡宽 − 69) / 16.66)，见
 *  scripts/gittok-responsive-check.mjs 的 1275 档标定 25 字）；考证的可读区间 22–38 汉字
 *  （Bringhurst 45–75 拉丁字符 ÷ 2；Unicode TR11 全角 1em／半角 1/2em；WCAG 2.2 SC 1.4.8
 *  只给上限「80 chars (40 if CJK)」且原文声明非强制）——480 落在区间内。
 *  另两处候选被实测否掉：**500** 会让 1275 掉回单列（=490 正好等于下限，无余量）→ 作废；
 *  460 在 1700 档仍是三列 463（病没治）。
 *  CSS 的轨道下限写的是 `min(var(--feed-col-min), 100%)`——容器窄于下限时轨道退成容器宽、
 *  仍算 1 列，与本函数 `Math.max(1, …)` 同值，故两边在全部实测宽度上一致。 */
export const FEED_COL_MIN = 480;
/** 2026-09-23：卡宽上限 = **700px（37 汉字）**，且它**只在单列档可能生效**——多列区实测从不触顶
 *  （两列区 420–668、三列区 440–539，全在考证的 22–38 汉字区间内）。
 *  栗子 09-23 第二问明确否掉「固定卡片宽度」：所以宽度由**列数**决定，这个常量只兜单列那一档。
 *  ⚠ 与 styles.css 的 `--feed-card-max` 双写，且**只在 >768 生效**（≤768 由
 *  `grid-template-columns: 1fr` 让卡片占满，是既有手机设计）。
 *  它只约束卡片自身（轨道仍是 1fr），所以**不进列数计算** —— `feedColsForContentWidth` 不受它影响。 */
export const FEED_CARD_MAX = 700;
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
  let cols = Math.max(1, Math.ceil((contentWidth + rowGap) / (FEED_CARD_MAX + rowGap)));
  while (cols > 1 && widthAt(cols) < FEED_COL_MIN) cols--;
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
