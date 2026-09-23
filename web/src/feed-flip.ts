// ---------------------------------------------------------------------------
// 列数变化的 FLIP 过渡（二轮 G2-①，2026-09-23）。
// 栗子原话：「拖动页面变换宽度的过程中出现很多闪现突然变化……要足够丝滑优雅，不要割裂闪现」。
//
// 做法是 FLIP 族（First–Last–Invert–Play）：列数变化前后各量一次每张卡的矩形，
// 用 transform 把卡片从旧位置/旧尺寸补差过渡到新位置/新尺寸。只动 transform（合成器层），
// 不碰布局属性——与卡片打开动画（detail-open.ts，同一条 Cursor 时代教训的成文锁）同一族做法。
//
// ⚠ 11 条动效锁（web/src/__tests__/open-regression.test.ts）全部继续成立：
//   不用 View Transition（锁③）——FLIP 只对 .feed-list 内的卡片做 transform 补差；
//   单参数 scale（锁⑤）——本模块的 scale 是一个参数；不用 commitStyles（锁⑥）——用 fill:none +
//   手动清理（信息流是持续滚动的活列表，锁 ⑥ 的 forwards 语义只适用于弹层终态，这里不能留 fill）；
//   不隐藏信息流（锁④）——过渡全程卡片可见。
//
// 时长 220ms：任务书块1考证的 150–300ms 区间中段——拖动是连续操作，比弹层（响应 0.28s）略快。
// prefers-reduced-motion 时整个函数是 no-op（直接落新布局，不补差）。
// ---------------------------------------------------------------------------

/** 列数过渡时长（ms）。150–300ms 区间中段偏短：拖动是连续操作，快才跟手。 */
export const FLIP_DURATION = 220;

/** 单条卡片过渡的缓动：cubic-bezier(0.2, 0.8, 0.2, 1)（快出缓停，无过冲）。 */
export const FLIP_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";

/** 卡片的定位键：repo 唯一且稳定（虚拟列表 key 也是它）。 */
function cardKey(el: Element): string | null {
  const btn = el.querySelector<HTMLElement>(".repo-owner-btn") ?? el.querySelector<HTMLElement>(".repo-name");
  const card = el.closest<HTMLElement>(".card") ?? (el as HTMLElement);
  // 用整卡的当前 DOM 位置拼 key 不稳；直接用卡片在列表里的唯一标识（aria-label 里的 repo）。
  const label = card.getAttribute("aria-label") ?? "";
  const m = label.match(/^打开\s+(.+?)\s+详情$/);
  return m ? m[1] : btn?.textContent ?? null;
}

export interface FlipEntry {
  key: string;
  rect: { left: number; top: number; width: number };
}

/** First：量当前所有卡的矩形（列数变化**前**调用）。 */
export function measureCards(list: HTMLElement): FlipEntry[] {
  const out: FlipEntry[] = [];
  for (const el of Array.from(list.children)) {
    if (!(el instanceof HTMLElement)) continue;
    const r = el.getBoundingClientRect();
    const key = cardKey(el);
    if (!key) continue;
    out.push({ key, rect: { left: r.left, top: r.top, width: r.width } });
  }
  return out;
}

/**
 * Last + Invert + Play：列数变化**后**调用。对每张还在场且位置/尺寸变了的卡，
 * 施加「从旧矩形到新矩形」的 transform 补差并播放，结束自动清理。
 * 返回本次真正播放的条数（0 = 无变化，探针用它断言「过渡在场」）。
 */
export function playCardsFlip(list: HTMLElement, before: FlipEntry[], duration = FLIP_DURATION): number {
  if (duration <= 0) return 0;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  const beforeMap = new Map(before.map((e) => [e.key, e]));
  let played = 0;
  for (const el of Array.from(list.children)) {
    if (!(el instanceof HTMLElement)) continue;
    const key = cardKey(el);
    if (!key) continue;
    const prev = beforeMap.get(key);
    if (!prev) continue;
    const r = el.getBoundingClientRect();
    const dx = prev.rect.left - r.left;
    const dy = prev.rect.top - r.top;
    const sx = prev.rect.width / r.width;
    // 位移与缩放都小到不可辨（<0.5px / <1.5%）就不打扰——拖动的绝大多数帧都落在这里。
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sx - 1) < 0.015) continue;
    // 拖动一帧只跨一档；跨多档（首次校正/初始化）幅度会很大，同样播——但上限钳到 2 倍，防止拉丝。
    const scale = Math.min(2, Math.max(0.5, sx));
    el.style.transformOrigin = "top left";
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
    // scaleX 只有一个参数（锁⑤）：高度不拉伸——卡片是锁高的，纵向只补位置差。
    if (typeof el.animate === "function") {
      const anim = el.animate(
        [
          { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale})` },
          { transform: "translate3d(0px, 0px, 0) scale(1)" },
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
