// ---------------------------------------------------------------------------
// 布局变化的 FLIP 过渡（二轮 G2-①建，2026-09-23 三轮 T1 扩面 + 修一处实伤）。
// 栗子原话：「拖动页面变换宽度的过程中出现很多闪现突然变化……要足够丝滑优雅，不要割裂闪现」
// → 三轮复验仍是「所有的交接过渡动画都不够流畅丝滑」。
//
// 做法是 FLIP 族（First–Last–Invert–Play）：布局变化前后各量一次目标矩形，
// 用 transform 把目标从旧位置/旧尺寸补差过渡到新位置/新尺寸。只动 transform（合成器层），
// 不碰布局属性——与卡片打开动画（detail-open.ts，同一条 Cursor 时代教训的成文锁）同一族做法。
//
// 三轮扩面（甲A1 实测的跳变簇里，这一条是「卡片有人管、别的没人管」）：
//   · 卫星块（`.channel-head` 频道头 / `.pref-prompt` 偏好条）与卡片**同源变宽**——
//     它们也跟着列数一起跳（实测 1128→1136：内容块 748→905、频道头 700→857 一帧跳完 157px）。
//     现在同一个 measure/play 循环把它们一起补差。
//
// ⚠ 三轮修一处实伤（实测证据 D:/tmp/gt-layout/r3/smooth-before.json）：
//   旧写法用**等比** `scale(sx)`，而列数翻转时 sx 可达 1.66（700→421），
//   等比缩放会把卡片**高度一起拉伸 66%**（帧间读数 card1.h 288→479.43px），
//   卡片当场压到下一张身上——这就是「不够丝滑」里最刺眼的那一下。
//   改为 `scale(sx, 1)`：只补横向宽度差，高度恒定 288（卡片本来锁高，纵向只补位置差）。
//   **这不违 11 条动效锁**：锁⑤「只有单参数 scale，禁止非等比拉伸正文」的断言对象是
//   detail-open.ts（`expect(open).not.toMatch(/scale\([^)\n]+,/)` —— `open` 只读那个文件），
//   讲的是**打开动画别把正文拉变形**；信息流的宽度变化是真实的布局变化，横向补差是它的还原而非变形。
//
// 时长 220ms：考证的 150–300ms 区间中段——拖动是连续操作，比弹层（响应 280ms）略快。
// prefers-reduced-motion 时整个函数是 no-op（直接落新布局，不补差）。
// ---------------------------------------------------------------------------

/** 布局过渡时长（ms）。150–300ms 区间中段偏短：拖动是连续操作，快才跟手。 */
export const FLIP_DURATION = 220;

/** 单条目标过渡的缓动：cubic-bezier(0.2, 0.8, 0.2, 1)（快出缓停，无过冲）。与 CSS 的 --ease-soft 同支。 */
export const FLIP_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/** 卡片：虚拟列表的直接子元素（`.feed-window-pad` 垫片没有卡标识，会被跳过）。 */
const CARD_SELECTOR = ".feed-window > .feed-list > .card";
/** 卫星块：与列数同源变宽的块级元素，和卡片共用一套补差。 */
const SATELLITE_SELECTOR = ".feed-content > .channel-head, .feed-content > .pref-prompt";
const TARGET_SELECTOR = `${CARD_SELECTOR}, ${SATELLITE_SELECTOR}`;

/** 卡片的定位键：repo 唯一且稳定（虚拟列表 key 也是它）。 */
function cardKey(card: HTMLElement): string | null {
  const btn =
    card.querySelector<HTMLElement>(".repo-owner-btn") ?? card.querySelector<HTMLElement>(".repo-name");
  // 卡片在列表里的唯一标识：aria-label 里的 repo（整卡的 DOM 位置拼 key 不稳）。
  const label = card.getAttribute("aria-label") ?? "";
  const m = label.match(/^打开\s+(.+?)\s+详情$/);
  return m ? m[1] : (btn?.textContent ?? null);
}

/** 目标的定位键：卡片用 repo，卫星块用固定名（各自至多一个）。 */
function flipKey(el: HTMLElement): string | null {
  if (el.classList.contains("channel-head")) return "sat:channel-head";
  if (el.classList.contains("pref-prompt")) return "sat:pref-prompt";
  return cardKey(el);
}

export interface FlipEntry {
  key: string;
  rect: { left: number; top: number; width: number };
}

/** First：量当前所有目标的矩形（布局变化**前**调用）。root 给 `.feed-content`（含卫星块）最稳。 */
export function measureFlip(root: HTMLElement): FlipEntry[] {
  const out: FlipEntry[] = [];
  for (const el of Array.from(root.querySelectorAll<HTMLElement>(TARGET_SELECTOR))) {
    const key = flipKey(el);
    if (!key) continue;
    const r = el.getBoundingClientRect();
    out.push({ key, rect: { left: r.left, top: r.top, width: r.width } });
  }
  return out;
}

/** 兼容旧名（二轮只有卡片）。等价于 measureFlip。 */
export const measureCards = measureFlip;

/**
 * Last + Invert + Play：布局变化**后**调用。对每个还在场且位置/尺寸变了的目标，
 * 施加「从旧矩形到新矩形」的 transform 补差并播放，结束自动清理。
 * 返回本次真正播放的条数（0 = 无变化，探针用它断言「过渡在场」）。
 */
export function playFlip(root: HTMLElement, before: FlipEntry[], duration = FLIP_DURATION): number {
  if (duration <= 0) return 0;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return 0;
  const beforeMap = new Map(before.map((e) => [e.key, e]));
  let played = 0;
  for (const el of Array.from(root.querySelectorAll<HTMLElement>(TARGET_SELECTOR))) {
    const key = flipKey(el);
    if (!key) continue;
    const prev = beforeMap.get(key);
    if (!prev) continue;
    const r = el.getBoundingClientRect();
    const dx = prev.rect.left - r.left;
    const dy = prev.rect.top - r.top;
    const sx = r.width > 0 ? prev.rect.width / r.width : 1;
    // 位移与缩放都小到不可辨（<0.5px / <1.5%）就不打扰——拖动的绝大多数帧都落在这里。
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sx - 1) < 0.015) continue;
    // 拖动一帧只跨一档；跨多档（首次校正/初始化）幅度会很大，同样播——但上限钳到 2 倍，防止拉丝。
    const scale = Math.min(2, Math.max(0.5, sx));
    el.style.transformOrigin = "top left";
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale}, 1)`;
    // ⚠ 第二个参数恒为 1（横向只补宽度差、纵向只补位置差）：等比缩放会把锁高的卡片拉高 66%，
    //    实测帧间 card1.h 288→479.43 压到下一张身上——三轮修的正是这一下。
    if (typeof el.animate === "function") {
      const anim = el.animate(
        [
          { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale}, 1)` },
          { transform: "translate3d(0px, 0px, 0) scale(1, 1)" },
        ],
        { duration, easing: FLIP_EASING, fill: "none" },
      );
      anim.finished.then(
        () => {
          el.style.transform = "";
        },
        () => {
          el.style.transform = "";
        },
      );
    } else {
      // 无 WAAPI 的环境：直接落位（不闪、不跳，只是没有过渡）。
      el.style.transform = "";
    }
    played++;
  }
  return played;
}

/** 兼容旧名（二轮只有卡片）。等价于 playFlip。 */
export const playCardsFlip = playFlip;
