// ---------------------------------------------------------------------------
// 打开：终态只排一次版。合成器把这一版从卡片位置等比放到阅读位。
// 不用 View Transition：截整页就卡爆，不截根层就闪黑。
// 结算时盒子不能变。关闭立刻卸 DOM。
// 飞行中若藏滚动条：只许 overflow-y:hidden + scrollbar-gutter:stable。
// 禁止 scrollbar-width:none（槽位消失 = 飞/落两套折行）。
// 终态盒必须读详情 DOM，禁止只用视口估算（会偏几像素，飞偏离开卡片）。
// ---------------------------------------------------------------------------

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface SpringPoint {
  t: number;
  p: number;
}

/** App Store 卡片：response 0.28 / damping 0.82，超调约 1%，是靠岸不是弹跳。 */
export const OPEN_SPRING_RESPONSE = 0.28;
export const OPEN_SPRING_DAMPING = 0.82;
/** 先密采，再用 RDP 按曲率留点（Jake Archibald linear() 生成器同款）。 */
export const OPEN_SPRING_SAMPLES = 80;
export const OPEN_SPRING_SIMPLIFY = 0.0005;

/** 欠阻尼弹簧位移 0→1。 */
export function springProgress(
  t: number,
  response = OPEN_SPRING_RESPONSE,
  zeta = OPEN_SPRING_DAMPING,
): number {
  if (t <= 0) return 0;
  const w0 = (2 * Math.PI) / response;
  if (zeta >= 1) {
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  }
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  const env = Math.exp(-zeta * w0 * t);
  return 1 - env * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
}

function perpDist(pt: SpringPoint, a: SpringPoint, b: SpringPoint): number {
  const dx = b.t - a.t;
  const dy = b.p - a.p;
  const len = Math.hypot(dx, dy);
  if (len === 0) return Math.hypot(pt.t - a.t, pt.p - a.p);
  return Math.abs(dy * pt.t - dx * pt.p + b.t * a.p - b.p * a.t) / len;
}

/** Ramer–Douglas–Peucker：曲率大的地方留点，尾巴少留。 */
export function simplifySpringPoints(points: SpringPoint[], epsilon: number): SpringPoint[] {
  if (points.length <= 2) return points;
  const first = points[0];
  const last = points[points.length - 1];
  let maxDist = 0;
  let maxIdx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpDist(points[i], first, last);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }
  if (maxDist > epsilon) {
    const left = simplifySpringPoints(points.slice(0, maxIdx + 1), epsilon);
    const right = simplifySpringPoints(points.slice(maxIdx), epsilon);
    return left.slice(0, -1).concat(right);
  }
  return [first, last];
}

export function sampleLinearEasing(points: SpringPoint[], t: number): number {
  if (points.length === 0) return 0;
  if (t <= 0) return points[0].p;
  if (t >= 1) return points[points.length - 1].p;
  for (let i = 1; i < points.length; i++) {
    if (t <= points[i].t) {
      const a = points[i - 1];
      const b = points[i];
      const span = b.t - a.t;
      const u = span === 0 ? 1 : (t - a.t) / span;
      return a.p + (b.p - a.p) * u;
    }
  }
  return points[points.length - 1].p;
}

function formatLinear(points: SpringPoint[]): string {
  const stops = points.map((pt, i) => {
    const isEnd = i === 0 || i === points.length - 1;
    const p = i === 0 ? "0" : i === points.length - 1 ? "1" : pt.p.toFixed(4);
    if (isEnd) return p;
    return `${p} ${(pt.t * 100).toFixed(1)}%`;
  });
  return `linear(${stops.join(", ")})`;
}

export function createOpenSpring(response = OPEN_SPRING_RESPONSE, zeta = OPEN_SPRING_DAMPING) {
  let settle = response * 1.15;
  const max = response * 1.7;
  for (let t = response; t <= max; t += 0.004) {
    if (Math.abs(1 - springProgress(t, response, zeta)) < 0.01) {
      settle = t;
      break;
    }
  }
  const dense: SpringPoint[] = [];
  for (let i = 0; i <= OPEN_SPRING_SAMPLES; i++) {
    const u = i / OPEN_SPRING_SAMPLES;
    dense.push({ t: u, p: springProgress(u * settle, response, zeta) });
  }
  dense[0] = { t: 0, p: 0 };
  const points = simplifySpringPoints(dense, OPEN_SPRING_SIMPLIFY);
  points[0] = { t: 0, p: 0 };
  points[points.length - 1] = { t: 1, p: 1 };
  return {
    duration: Math.round(settle * 1000),
    easing: formatLinear(points),
    points,
  };
}

const OPEN_SPRING = createOpenSpring();
export const OPEN_DURATION = OPEN_SPRING.duration;
export const OPEN_EASING = OPEN_SPRING.easing;
export const OPEN_SPRING_POINTS = OPEN_SPRING.points;

export function uniformScale(src: Box, dest: Box): number | null {
  if (src.width < 1 || dest.width < 1) return null;
  const s = src.width / dest.width;
  return Number.isFinite(s) && s > 0 ? s : null;
}

/**
 * 读详情面板的布局终态盒。量之前必须拿掉飞行 transform，
 * 否则二次 effect（Strict Mode / 清理后再跑）会把「已经缩到源卡上的视觉盒」
 * 当成终点，openFromCard 变成 identity，看起来像没动画。
 */
export function destBoxFromElement(el: {
  style: { transform: string };
  getBoundingClientRect: () => { left: number; top: number; width: number; height: number };
}): Box {
  const prev = el.style.transform;
  el.style.transform = "none";
  const r = el.getBoundingClientRect();
  el.style.transform = prev;
  return { left: r.left, top: r.top, width: r.width, height: r.height };
}

export function isVisibleOpenMotion(motion: { s: number; from: string; to: string }): boolean {
  return motion.from !== motion.to && Number.isFinite(motion.s) && Math.abs(motion.s - 1) > 0.04;
}

/** 仅供对照 CSS 合同。动画终态盒必须读 DOM，不能用这个开飞。 */
export function destBoxFromViewport(viewportWidth: number, viewportHeight: number): Box {
  const width = Math.round(Math.min(1200, viewportWidth - 40));
  return {
    left: Math.round((viewportWidth - width) / 2),
    top: Math.round(viewportHeight * 0.05),
    width,
    height: Math.round(viewportHeight * 0.9),
  };
}

/** 只有 translate + 一个 scale。不要 clip-path，不要改盒子宽度。 */
export function openFromCard(src: Box, dest: Box) {
  const s = uniformScale(src, dest);
  if (s == null) return null;
  const dx = src.left - dest.left;
  const dy = src.top - dest.top;
  return {
    s,
    from: `translate3d(${dx}px, ${dy}px, 0) scale(${s})`,
    to: "translate3d(0px, 0px, 0) scale(1)",
  };
}

export interface OpenMotion {
  from: string;
  to: string;
}

/** 卡片和遮罩共用同一条时间线，避免两套节奏。 */
export function playOpenMotion(
  panel: HTMLElement,
  overlay: HTMLElement | null,
  motion: OpenMotion,
): { card: Animation; dim?: Animation } {
  panel.style.transformOrigin = "top left";
  panel.style.transform = motion.from;
  const timing: KeyframeAnimationOptions = {
    duration: OPEN_DURATION,
    easing: OPEN_EASING,
    fill: "forwards",
  };
  const card = panel.animate([{ transform: motion.from }, { transform: motion.to }], timing);
  const now = document.timeline?.currentTime;
  if (now != null) card.startTime = now;

  let dim: Animation | undefined;
  if (overlay && typeof overlay.animate === "function") {
    try {
      dim = overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
        ...timing,
        fill: "both",
        pseudoElement: "::before",
      });
      if (now != null) dim.startTime = now;
      overlay.classList.add("is-open-playing");
    } catch {
      dim = undefined;
    }
  }
  return { card, dim };
}

/** 等两帧：第一帧把 from 栅格进合成层，第二帧再开 WAAPI。打开路径不再用——会觉得点下去先停一拍。 */
export function afterPaint(cb: () => void): () => void {
  let inner = 0;
  let cancelled = false;
  const outer = requestAnimationFrame(() => {
    inner = requestAnimationFrame(() => {
      if (!cancelled) cb();
    });
  });
  return () => {
    cancelled = true;
    cancelAnimationFrame(outer);
    cancelAnimationFrame(inner);
  };
}

/* ══════════════════════════════════════════════════════════════════════════════
   退场（2026-09-24 四轮 T8②：栗子「可以加，但是前提是要优雅、舒适、丝滑、不拖沓，
   而且还要符合我们网站的整体审美风格」）

   ── 定版规格（先规格后实现；两版实拍对比见 D:/tmp/gt-layout/r4/exit/）──
   ① **时长 200ms**＝入场 280ms 的 0.71×。依据：NN/g《Animation Duration》
      「appearing/entering 需要比 disappearing/exiting 略长——弹窗出现 300ms，消失 200–250ms」，
      且同文把模态类变化的推荐带定在 200–300ms、>500ms 开始像拖拽。0.71 落在 200/300 的区间内。
   ② **曲线用加速型** `cubic-bezier(0.2, 0, 1, 0.9)`（IBM Carbon 的 `motion(exit, productive)`），
      **不复用入场的 spring**：spring 有 1.011 的超调（`OPEN_EASING` 实测），超调在「离开」语义上
      会被读成「弹一下再走」＝栗子点名的「拖沓」；入场用 spring（到达感）、退场用加速（离开感），
      两条语义分工，仍是同一套时间语言。
   ③ **几何＝入场的精确逆**：translate3d + **单参数** scale（锁⑤禁非等比），transformOrigin top left。
      起点取**当前可见盒**（含正在飞的 transform，于是「打开动画没跑完就按 Esc」也能无缝接上），
      终点取**源卡实时矩形**（锁⑦：读 DOM 不读视口估算）。
   ④ **回退案**：源卡已被卸载或与视口不相交 → 「原地收束」（scale→0.985 + opacity→0，遮罩同步淡出
      180ms）。绝不飞向一个看不见的矩形——那会让人以为"飞错地方了"。
   ⑤ 遮罩与面板**同一条时间线**（同 duration/easing + startTime 对齐）。
   ⑥ 首帧即动（锁⑩）；连点只跑一次；`prefers-reduced-motion` 直接瞬时；
      **禁** `commitStyles`（锁⑥）与 View Transition（锁③）；飞行期沿用 `is-flying`
      （`.detail-card` 只许 `overflow:hidden` 藏条、槽位靠 `scrollbar-gutter:stable` 留着，锁②）。
   ══════════════════════════════════════════════════════════════════════════ */
export const CLOSE_DURATION = 200;
export const CLOSE_EASING = "cubic-bezier(0.2, 0, 1, 0.9)";
/** 回退案（源卡不可用）：原地收束。略短于飞回——它没有位移要交代，只把一个「消失」说清楚。 */
export const CLOSE_INPLACE_DURATION = 180;

/**
 * 源卡还活着吗？活着且与视口相交 → 返回它的**实时**矩形；否则 null（调用方走回退案）。
 * 为什么不是直接用打开时存下的 `sourceRect`：那是快照。虚拟列表可能已把那张卡卸载
 * （`isConnected=false`，矩形退化成 0），也可能因页面滚动而移出视口——此时飞过去＝飞向空气。
 *
 * ⚠ 入参用**结构化类型**而不是 `Element`：本仓的 vitest 是 node 环境（无 DOM），
 * 用 `Element` 就没法给这几个分支写单测，而它们恰恰是"飞错地方"这类事故的唯一防线。
 * `HTMLElement` 结构上满足这个接口，调用方不需要改。
 */
export interface SourceLike {
  isConnected: boolean;
  getBoundingClientRect(): {
    left: number;
    top: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
  };
}

export function liveBoxIfUsable(
  el: SourceLike | null,
  viewportWidth: number,
  viewportHeight: number,
): Box | null {
  if (!el || !el.isConnected) return null;
  const r = el.getBoundingClientRect();
  if (!(r.width > 0.5 && r.height > 0.5)) return null;
  const visible = r.bottom > 0 && r.top < viewportHeight && r.right > 0 && r.left < viewportWidth;
  if (!visible) return null;
  return { left: r.left, top: r.top, width: r.width, height: r.height };
}

/** 退场几何：`layout` 是面板**无 transform 的布局盒**（＝destBoxFromElement 的读数）。
 *  ⚠ 守卫必须判 `Number.isFinite` 而不是 `> 0`：布局宽为 0 时 `w/0` 得 `Infinity`，
 *  而 `Infinity > 0` 是**真**——只判正数会放进一个 `scale(Infinity)` 的 transform，
 *  整条动画作废（单测 `非法尺寸返回 null` 就是这条的锁）。 */
export function closeToCardMotion(current: Box, layout: Box, dest: Box) {
  const sFrom = current.width / layout.width;
  const sTo = dest.width / layout.width;
  if (!Number.isFinite(sFrom) || !Number.isFinite(sTo) || sFrom <= 0 || sTo <= 0) return null;
  return {
    s: sTo,
    from: `translate3d(${current.left - layout.left}px, ${current.top - layout.top}px, 0) scale(${sFrom})`,
    to: `translate3d(${dest.left - layout.left}px, ${dest.top - layout.top}px, 0) scale(${sTo})`,
  };
}

/** 回退案几何：原地收束（只有透明度 + 一点点缩，没有位移）。 */
export function closeInPlaceMotion(current: Box, layout: Box) {
  const sFrom = current.width / layout.width;
  if (!Number.isFinite(sFrom) || sFrom <= 0) return null;
  const sTo = sFrom * 0.985;
  return {
    s: sTo,
    from: `translate3d(${current.left - layout.left}px, ${current.top - layout.top}px, 0) scale(${sFrom})`,
    to: `translate3d(${current.left - layout.left}px, ${current.top - layout.top}px, 0) scale(${sTo})`,
  };
}

/** 面板 + 遮罩同一条时间线跑退场；返回面板动画（调用方等它 finished 再卸 DOM）。
 *
 * ⚠ 「落地上还要化掉」这条是**实拍抓出来的**（四轮 T8② 逐帧胶片 `D:/tmp/gt-layout/r4/exit/screencast/`）：
 *   第一版只动 transform，飞到终点＝一个缩小的弹层刚好盖在源卡上；而 React 卸载要等
 *   `setDetailCard(null)` 提交（实测**点击→DOM 卸载 313ms**，比动画的 200ms 多 113ms），
 *   于是那 113ms 里用户看到「迷你弹层停在卡片上」＝一眼假的破绽（f12_238ms 那帧就是）。
 *   修法不是去抢 React 的提交时间，而是**让面板在飞行末段透明度归零**——落地即不可见，
 *   卸载晚多久都不影响观感。这条也顺手把「落点硬切」消掉（否则着陆是一次 pop）。
 *   曲线用 `cubic-bezier(0.2,0.8,0.2,1)`：与遮罩 `fadeIn` 同一条（站内既有），不是新造曲线。
 *
 * ⚠ 2026-09-24 第二轮修（栗子：「退场动画的结尾出现了卡片原有位置闪现的问题」）：
 *   第一版只做了「面板化掉」，源卡在整个退场期间仍是隐形的（`is-open-source`＝opacity 0），
 *   直到动画结束后 `closeDetail()` 摘掉那个 class → **卡片从无到有地"啪"一下出现**＝他看到的闪现。
 *   修法：把源卡的显形也做成一段过渡——`reveal` 参数接一个元素，让它与面板的化掉**同一窗口**
 *   反向淡入（面板 1→0、卡片 0→1），于是"弹层落回卡片"是一次交接而不是一次跳变。
 *   动画用 `fill: "forwards"` 顶住 CSS 的 `opacity:0`；调用方在摘掉 class 的**同一帧**取消它
 *   （否则残留的 fill 会在下次打开时把卡片顶成可见——锁⑧同族的坑）。 */
export function playCloseMotion(
  panel: HTMLElement,
  overlay: HTMLElement | null,
  motion: OpenMotion,
  duration = CLOSE_DURATION,
  reveal?: HTMLElement | null,
): { card: Animation; fade: Animation; revealAnim?: Animation; dim?: Animation } {
  panel.style.transformOrigin = "top left";
  panel.style.transform = motion.from;
  const timing: KeyframeAnimationOptions = {
    duration,
    easing: CLOSE_EASING,
    fill: "forwards",
  };
  const card = panel.animate([{ transform: motion.from }, { transform: motion.to }], timing);
  const now = document.timeline?.currentTime;
  if (now != null) card.startTime = now;

  // 前 60% 保持不透明（让人看清「同一块东西在往回走」），后 40% 化掉（落地不留残影）。
  // ⚠ 这里用「delay + 短时淡出」两条独立参数，**不**用带 offset 的三关键帧：
  //   实测（`D:/tmp/gt-layout/r4/exit/轨迹.json`）三关键帧在 Chromium 里没有按 offset 分段——
  //   透明度从第 3 帧（~46ms / 进度 0.6）就已经掉到 0.58，等于整段都在淡出，
  //   "往回走"这件事几乎看不见。换成 delay 语义无歧义：120ms 内一动不动，最后 80ms 化掉。
  const fadeMs = Math.round(duration * 0.4);
  const fadeTiming: KeyframeAnimationOptions = {
    duration: fadeMs,
    delay: duration - fadeMs,
    easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", // 与遮罩 fadeIn 同一条（站内既有曲线）
    fill: "forwards",
  };
  const fade = panel.animate([{ opacity: 1 }, { opacity: 0 }], fadeTiming);
  if (now != null) fade.startTime = now;

  // 源卡显形（同一窗口反向淡入）：面板 1→0 的同时卡片 0→1 ⇒ 「落回卡片」是一次交接
  let revealAnim: Animation | undefined;
  if (reveal && typeof reveal.animate === "function") {
    revealAnim = reveal.animate([{ opacity: 0 }, { opacity: 1 }], fadeTiming);
    if (now != null) revealAnim.startTime = now;
  }

  let dim: Animation | undefined;
  if (overlay && typeof overlay.animate === "function") {
    try {
      // 沿用打开时的 `is-open-playing`（它把 CSS 的 fadeIn 关掉）→ 退场期间遮罩的透明度
      // 只有一个来源＝这条 WAAPI，不会在 fill 之外被 CSS 动画顶回 opacity 1（闪一下）。
      overlay.classList.add("is-open-playing");
      dim = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
        ...timing,
        fill: "both",
        pseudoElement: "::before",
      });
      if (now != null) dim.startTime = now;
    } catch {
      dim = undefined;
    }
  }
  return { card, fade, revealAnim, dim };
}
