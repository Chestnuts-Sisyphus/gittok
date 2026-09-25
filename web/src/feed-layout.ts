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
 *       结果是：2 列及以上时，任何合规摘要都必然一行放得下；只有屏幕窄到给不出 653px 卡才退 1 列。
 *     · 单列档不再是「铺满轨道」：09-25 栗子指着两列档那张卡说「单列卡片的极限宽度按这个来」
 *       ⇒ 单列档卡宽上限 = 两列档在参照档下的卡宽 = **793**（见 FEED_CARD_MAX 与 styles.css
 *       的 `--feed-card-max`）。
 *       ⚠ 2026-09-25 七轮「空隙口径合成」——三条历史口径在**中间带**（793 < 内容宽 < 2×653+16）
 *         几何上不可兼得，这里记定论与依据（规格＝`docs/七轮-空隙口径合成规格-20260925.md`）：
 *           · 卡宽 ≤793（09-25 栗子指令）＋ 内容契约不截断（摘要 20–35 一行、理由 100–150 三行，
 *             〇块第 7 条「内容契约优先于版式」）⇒ 卡宽只能落在 **[653, 793]**；
 *           · 中间带里 2 列给出的卡宽是 389–653 ⇒ 摘要被截（实测 606 档 4.7%、432 档 80%）、
 *             理由被截（实测 606 档 38.8%）；1 列给出的卡宽是 793 ⇒ 剩余宽度**必然**成为两侧留白
 *             （最宽 264px/侧）。⇒ 三条口径**不可同时成立**，「提前升 2 列消灭空隙」实测被否。
 *           · 定版：**轨道里不留空**（卡宽 = 轨道宽，09-24 那条继续成立）＋轨道宽度上限由内容
 *             容器承担（793）＋余量作**对称页边距**；并把理由行数按卡宽反推（见 FEED_REASON_MAX），
 *             把 2 列窄档的省略号收掉（实测 1600 档 72/837 → 0）。
 *           · 未尽事项：中间带余量本身**消不掉**（要消就得放弃 793 或放弃内容契约），
 *             三条可选口径与代价见规格文件第三节，等栗子裁。
 *  ⚠ `--feed-col-min` 与 `FEED_COL_MIN` 仍是双写契约（漂移会让虚拟列表垫片按错列数算高度）；
 *    `--feed-card-max` 与 `FEED_CARD_MAX` 同理；`--feed-reason-lines` 与 FEED_REASON_MAX 一族的
 *    反推值同理（都由 lock 单测钉住）。 */
/** 摘要一行的**内容契约**：上限 35 个汉字（＝提示词里的硬性要求）。 */
export const FEED_SUMMARY_MAX = 35;
/** 实测单字宽（17px 根字号、700 字重；与 G9 表「一行容量 = floor((卡宽−69)/16.66)」同式）。 */
export const FEED_CHAR_W = 16.66;
/** 卡内 chrome 实测 69px（卡内距 20×2 + 摘要内距 12×2 + 左边框 3 + 卡边框 1×2）。 */
export const FEED_CARD_CHROME = 69;
/** 多列档最小卡宽 = 一行放下 FEED_SUMMARY_MAX 字 → 35×16.66 + 69 = 652.1 → 653（向上取整留余量）。 */
export const FEED_COL_MIN = Math.ceil(FEED_SUMMARY_MAX * FEED_CHAR_W + FEED_CARD_CHROME);
/** 参照档的内容网格宽（1920×1080；＝壳上限 1866 − 侧栏 192 − 左右内距，本机实测 1602）。
 *  只用于推导 FEED_CARD_MAX，不参与任何布局约束。 */
export const FEED_GRID_REF = 1602;
/** 单列档卡宽**上限**（2026-09-25 五轮，栗子：「我理想的单列卡片的极限宽度应该按这个来」——
 *  他红框圈的是**两列档里的那张卡**）。⇒ 口径＝两列档在参照档下的单卡宽：
 *    (FEED_GRID_REF − FEED_ROW_GAP) / 2 = (1602 − 16) / 2 = **793**。
 *  为什么这个口径是"可推导"而不是又一个拍的数字：参照档是**站内最宽**的档（壳封顶 1866 ⇒
 *  网格封顶 1602），所以两列档的卡宽**永远 ≤ 793** ⇒ 有了这条上限，「任何窗口下卡宽都不超过
 *  我在两列档里看到的那张卡」在全档成立（此前单列档会一路涨到 1228）。
 *  ⚠ 与 styles.css 的 `--feed-card-max` 双写（由 lock 单测钉住）；单列档由 CSS 在**内容侧**收窄实现，
 *    卡片自身仍 width:100%（「卡宽 = 轨道宽」不变量不变）。 */
export const FEED_CARD_MAX = Math.floor((FEED_GRID_REF - FEED_ROW_GAP) / 2);
/** 单列档内容容器上限 = 卡宽上限 + 内容衬距（24×2）——CSS 侧写的就是这个算式。 */
export const FEED_CONTENT_MAX_1COL = FEED_CARD_MAX + 48;
/** ── 理由契约 → **显示行数**（2026-09-25 七轮立、八轮扩到 3–7 行）──────────────────
 *  理由的内容契约是 100–150 字（`REASON_MIN/MAX`，与摘要同为内容侧契约，且是**硬闸**）；
 *  显示侧原本固定 3 行（styles.css `.reason-clamped` 的 `-webkit-line-clamp: 3`）——
 *  实测**只对卡宽 ≥766 成立**。全库 837 张扫整条信息流的实测（`D:/tmp/gt-layout/r7/scan-*.json`）：
 *    · 卡宽 793（单列档 / 1920 两列）→ 3 行 0/837 被截；
 *    · 卡宽 706（1700 两列）        → 3 行 **7/837 被截**（0.8%）；
 *    · 卡宽 656（1600 两列）        → 3 行 **72/837 被截**（8.6%）；
 *    · 卡宽 606（八轮起真的会两列） → 3 行 324/836 被截（38.8%），给第 4 行 → 0 被截。
 *  根因：3 行容量 = 3 × floor((卡宽 − chrome) / 理由单字宽)，只对宽卡够。
 *  ⇒ 显示行数由**内容契约反推**：`lines = ceil(REASON_MAX / floor((卡宽 − chrome) / 理由单字宽))`，
 *    下限 3（不因反推把宽卡的行数压低）、**上限 7**（八轮：列数规则保证卡宽 ≥ 389 ⇒ 7 行足够，
 *    见 FEED_REASON_LINES_LONG 与 feedCardShapeFor 的卡高算式）。
 *  ⚠ 与 styles.css 的 `--feed-reason-lines` 双写（由 lock 单测钉住，同 --feed-card-max 的做法）。 */
export const FEED_REASON_MAX = 150;
/** 理由单字宽 = 摘要单字宽 × 字号比（0.82rem ÷ 0.98rem）＝ 16.66 × 0.8367 ≈ **13.94**。
 *  实测区间 13.7–14.5（见上表三档反算），取推导值 13.94（区间内、且是可推导而非拍的数字）。 */
export const FEED_REASON_CHAR_W = FEED_CHAR_W * (0.82 / 0.98);
export const FEED_REASON_LINES_MIN = 3;
/** 理由行数上限：八轮起＝**7**（最窄的 2 列档卡宽 389 ⇒ `ceil(150/22)=7`）。
 *  行数不再受「288 卡高」限制——卡高跟着行数长（`feedCardShapeFor` 的 H 算式），
 *  所以「装不下」不再是物理宿命；这也顺带解掉了六轮 G9① 里「手机档理由必被截」的成因之一。 */
export const FEED_REASON_LINES_MAX = 7;
/** 理由**能完整显示**所需的最小卡宽：让**上限 7 行**装下 REASON_MAX 字所需的卡宽 =
 *  chrome + ceil(150/7) × 单字宽 = 69 + 22 × 13.94 ≈ **376**。
 *  列数规则保证卡宽 ≥ 389（网格 794 时的 2 列卡宽）⇒ 恒 ≥ 此值 ⇒ **理由永远装得下**。 */
export const FEED_REASON_FIT_MIN_CARD_W = Math.ceil(
  FEED_CARD_CHROME + Math.ceil(FEED_REASON_MAX / FEED_REASON_LINES_MAX) * FEED_REASON_CHAR_W,
);
export const FEED_SHORT_MAX_HEIGHT = 560;
export const FEED_CARD_HEIGHT_SHORT = 210;

/** ── 档内卡片形态（2026-09-25 八轮）：卡宽 ⇒ (摘要行数 S, 理由行数 R, 卡高 H, 标签槽位 T) ──────
 *  栗子八轮定标准：「不允许出现留白…卡片到 793 就到极限、再长就变两列」，于是中间带变成 2 列、
 *  卡宽会掉到 389–793。**窄卡不许靠截断**（用户此前为省略号提过意见），所以让**文字的块高跟着卡宽走**：
 *    · S（摘要行数）：一行放得下 35 字（`floor((卡宽−69)/16.66) ≥ 35`）就 1 行，否则 2 行；
 *    · R（理由行数）：`ceil(150 / floor((卡宽−69)/13.94))`，下限 3、上限 7（更窄的档不再出现：
 *      列数规则保证卡宽 ≥ 389 ⇒ 7 行足够）；
 *    · H（卡高）：`288 + (S−1)×25 + (R−3)×23.7` —— 25 = 摘要行高(1.5em @0.98rem)，
 *      23.7 = 理由行高(1.7em @0.82rem)。**基准 288 里含 27px 卡底余量，加行只加行高、
 *      不动余量** ⇒ 各档卡片节奏一致（栗子：「不够优雅流畅统一」那条的处方）。
 *    · T（标签槽位）：`floor((卡宽−69)/100)` 截到 [2,8]，其余折进 `+N` —— 让标签行**永不换行**，
 *      因而永不出现「半截 chip」（`.card-tags` 是 26px 定高 + overflow:hidden，换行会露出 2px 残片）。
 *  三者都只由卡宽决定 ⇒ **同一档内所有卡共享一组值**，卡片彼此对齐、没有参差。
 *  ⚠ 与 styles.css 的 `--feed-summary-lines` / `--feed-reason-lines` / `--feed-card-h` 双写（lock 单测钉住）。 */
export const FEED_SUMMARY_LINE_H = FEED_CHAR_W * 1.5; // 摘要行高 = 1.5em @ 0.98rem = 25.0px（CSS 同参）
export const FEED_REASON_LINE_H = FEED_REASON_CHAR_W * 1.7; // 理由行高 = 1.7em @ 0.82rem ≈ 23.7px
export const FEED_SUMMARY_LINES_MAX = 2;
export const FEED_TAG_SLOT_PX = 88;
export const FEED_TAG_SLOTS_MIN = 2;
export const FEED_TAG_SLOTS_MAX = 8;

/** 摘要行数：一行放得下 35 字就 1 行，否则 2 行（窄卡靠加行而不是靠省略号）。 */
export function feedSummaryLinesForCard(cardWidth: number): number {
  const perLine = Math.floor((cardWidth - FEED_CARD_CHROME) / FEED_CHAR_W);
  return perLine >= FEED_SUMMARY_MAX ? 1 : FEED_SUMMARY_LINES_MAX;
}

/** 理由行数：由 150 字上限反推（见 FEED_REASON_MAX 注释），下限 3、上限 7。 */
export function feedReasonLinesForCard(cardWidth: number): number {
  const perLine = Math.floor((cardWidth - FEED_CARD_CHROME) / FEED_REASON_CHAR_W);
  if (!(perLine > 0)) return FEED_REASON_LINES_MIN;
  const need = Math.ceil(FEED_REASON_MAX / perLine);
  return Math.min(FEED_REASON_LINES_MAX, Math.max(FEED_REASON_LINES_MIN, need));
}

/** 标签槽位：估算每片约 88px（实测 chip 50–110px，取偏保守值）⇒ 整行放得下、不换行、不半截。
 *  ⚠ CSS（.card-tags）另有兜底：行距 8px 把万一换行出来的第二行推到 26px 裁切线以下。 */
export function feedTagSlotsForCard(cardWidth: number): number {
  const n = Math.floor((cardWidth - FEED_CARD_CHROME) / FEED_TAG_SLOT_PX);
  return Math.min(FEED_TAG_SLOTS_MAX, Math.max(FEED_TAG_SLOTS_MIN, n));
}

/** 档内卡片形态：卡宽的**唯一**读法（列数、摘要/理由行数、卡高、标签槽位都从这里出）。 */
export interface FeedCardShape {
  cardWidth: number;
  summaryLines: number;
  reasonLines: number;
  cardHeight: number;
  tagSlots: number;
}
export function feedCardShapeFor(
  contentWidth: number,
  cols: number,
  rowGap: number = FEED_ROW_GAP,
): FeedCardShape {
  const cardWidth = feedCardWidthFor(contentWidth, cols, rowGap);
  const summaryLines = feedSummaryLinesForCard(cardWidth);
  const reasonLines = feedReasonLinesForCard(cardWidth);
  // 取整：卡高要同时喂给 CSS（--feed-card-h）与虚拟列表垫片，两者必须逐像素同值。
  const cardHeight = Math.round(
    FEED_CARD_HEIGHT +
      (summaryLines - 1) * FEED_SUMMARY_LINE_H +
      (reasonLines - FEED_REASON_LINES_MIN) * FEED_REASON_LINE_H,
  );
  return { cardWidth, summaryLines, reasonLines, tagSlots: feedTagSlotsForCard(cardWidth), cardHeight };
}

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
 * 2026-09-25 八轮（栗子当日第二次定标准）：**列数由「卡宽不得超过 793」反解**——
 *   「首先不允许出现留白……第一张图片的那个卡片长度就是卡片极限长度了，再长就要变成两列」
 *   ⇒ 取**最小**列数 n 使 cardW(n) ≤ FEED_CARD_MAX(793)：给不出 ≤793 的卡就加列（轨道铺满、零留白）。
 *   与七轮那版（「取卡宽 ≥653 的最大列数」）的差别只有一条：**中间带不再退化成带页边距的单列**。
 *   ⇒ 内容宽 ∈ (793, 1602] 一律 2 列，卡宽 389–793；>1602 才可能出现第 3 列
 *     （内容壳封顶 1650 ⇒ 网格封顶 1602 ⇒ 实际只会有 1/2 列；1920/2560 仍是两列 793 ✓ 与旧口径一致）。
 *
 * ⚠ 为什么敢让卡宽掉到 389：**窄卡不是靠截断，而是靠「档内自适应」**——卡宽决定
 *   摘要行数（S）、理由行数（R）与卡高（H），三者与卡宽同源（feedCardShapeFor 唯一算式），
 *   档内所有卡共享同一组 S/R/H ⇒ 卡片彼此严丝合缝、行行对齐（栗子：「不够统一」那条）。
 *   代价表：卡宽 606 时 S=2、R=4、H=337；卡宽 389 时 S=2、R=7、H=403（都不截断）。
 *
 * ⚠ 单一真源：本函数是列数的**唯一**来源，App 把结果写进 CSS 变量 `--feed-cols`
 * （`.feed-list { grid-template-columns: repeat(var(--feed-cols,1), minmax(0,1fr)) }`），
 * 虚拟列表垫片也用同一个值——2026-09-23 之前那套「CSS auto-fill 与 JS 双写常量」的漂移隐患就此消除。
 * 参考的另一组可读区间（22–38 汉字）见下面 FEED_COL_MIN 的取值史。
 */
export function feedColsForContentWidth(contentWidth: number, rowGap: number = FEED_ROW_GAP): number {
  if (!(contentWidth > 0)) return 1;
  const widthAt = (n: number) => (contentWidth - (n - 1) * rowGap) / n;
  // 取**最小**列数，使卡宽 ≤ 上限 793。单列档本来就是「卡宽 = min(网格, 793)」（CSS 收轨道），
  // 所以这里对内容宽 ≤ 793 一律返回 1；一旦网格宽过 793，就加列把卡压回上限内 ⇒ 永不出现对称页边距。
  let cols = 1;
  while (widthAt(cols) > FEED_CARD_MAX) cols++;
  return cols;
}

export function feedRowGapForWidth(width: number): number {
  return width <= FEED_MOBILE_MAX_WIDTH ? FEED_ROW_GAP_MOBILE : FEED_ROW_GAP;
}

/**
 * 某个内容宽 + 列数下，**卡片实际有多宽**（＝CSS 计算值的 JS 同式）。
 * 这是「卡宽」的**唯一算式**：列数规则、理由行数、L 形闸的期望值都从这里取，
 * 不要再各写一份（同一几何量只许有一个真源）。
 *   · 多列档：轨道 = (内容宽 − (n−1)×行距) / n，卡片 width:100% 铺满它 ⇒ 卡宽 = 轨道宽；
 *   · 单列档：CSS 用 `minmax(0, var(--feed-card-max))` 收轨道 ⇒ 卡宽 = min(内容宽, 793)。
 */
export function feedCardWidthFor(contentWidth: number, cols: number, rowGap: number = FEED_ROW_GAP): number {
  const n = Math.max(1, cols | 0);
  if (!(contentWidth > 0)) return 0;
  const track = (contentWidth - (n - 1) * rowGap) / n;
  return n === 1 ? Math.min(track, FEED_CARD_MAX) : track;
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
