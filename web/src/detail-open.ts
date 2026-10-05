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
   ① **时长 240ms**（入场 280ms 的 0.86×）。依据：NN/g《Animation Duration》
      「appearing/entering 需要比 disappearing/exiting 略长——弹窗出现 300ms，消失 200–250ms」，
      且同文把模态类变化的推荐带定在 200–300ms、>500ms 开始像拖拽。
      ⚠ **2026-09-26 订正（栗子实测反馈，推翻四轮的 200ms＝0.71×）**：他点出「退场完全不如打开动画，
      像是直接消散了，没有让我感觉它从全屏详情丝滑流畅地回到卡片本身的位置」。
      复核四轮那版的三个参数叠在一起，恰好把「往回走」这件事**抹掉了**：
        · **加速型曲线**（`cubic-bezier(0.2,0,1,0.9)`）——起手快、**落地时速度最大**，
          眼睛跟不到「到达」；入场是弹簧（落地减速 + 微超调）＝有「落定感」，两者语义相反 ⇒ 观感割裂；
        · **飞行末段 40% 透明度归零**（为躲「React 卸载晚 113ms 时迷你弹层停在卡上」那条实拍缺陷）——
          于是最后 80ms 是一块**半透明的鬼影**在最快地飞 ✗ 这就是「消散」的直源；
        · 200ms 本身偏短，「全屏 → 卡片」这么大的位移没有可读的行程。
      ⇒ 订正为：**落地减速**（沿用站内既有 `detailEaseOut`，与 `@keyframes detailEnter` 同一条）、
      240ms、**淡出只留最后 20%**（48ms 内完成交接，仍然挡住那个 113ms 的卸载窗口）。
      落地那一刻面板的几何 = 源卡实时矩形（精确逆，③）⇒ 面板与卡片重合，交接不可见。
   ② **曲线用** `detailEaseOut`＝`cubic-bezier(0.22, 0.61, 0.36, 1)`（站内既有、`detailEnter` 同款），
      **不复用入场的 spring**：spring 有 1.011 的超调（`OPEN_EASING` 实测），超调在「离开」语义上
      会被读成「弹一下再走」＝栗子点名的「拖沓」；入场用 spring（到达感 + 微超调）、
      退场用**减速型** ease-out（到达感、无超调），两条语义都落在「落定」上，仍是同一套时间语言。
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
export const CLOSE_DURATION = 240;
/** 退场曲线：**减速型**（落地慢下来）。与 `@keyframes detailEnter` 同一条，站内既有、不新造。 */
export const CLOSE_EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)";
/** 回退案（源卡不可用）：原地收束。略短于飞回——它没有位移要交代，只把一个「消失」说清楚。 */
export const CLOSE_INPLACE_DURATION = 180;
/** 面板淡出的**占比**：只在最后 20% 化掉（48ms）。前 80% 全程不透明 ⇒ 「同一块东西在往回走」
 *  看得见；末段仍留一段淡出，挡住 React 卸载（实测 313ms）晚于动画的那 100+ms。
 *  ⚠ 四轮那版是 40%（80ms 的半透明鬼影在最快地飞）——那正是栗子说的「消散」。 */
export const CLOSE_FADE_FRACTION = 0.2;
/** ⭐ 十八轮：**背景幽灵**淡出的时长占比——只在前 1/3（240ms→80ms）化完。
 *  取证定案（《GitTok-十八轮-闪影取证报告-20261002.md》）：真机减速摄影实锤「闪影」主因＝
 *  双内容重叠——幽灵 op>0.28 达 80ms（≥5 帧）、>0.1 达 144ms（≥9 帧），副本玻璃底
 *  （--glass-gradient 透 10–14%）透出幽灵正文＋副本下缘条带直达幽灵正文。收到前 1/3 后
 *  残留窗 ≈2 帧、透卡叠影 1 帧内消隐。快消在**前段**，与「末段集中淡出」（v1 消散，
 *  09-26 判死）方向相反，不触防复走表；t=1 时幽灵早已归零，末帧交接像素零变化。 */
export const CLOSE_GHOST_FADE_FRACTION = 1 / 3;

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

/**
 * ⭐ 十四轮（2026-10-01 晚，栗子第 4 次打回：「终止点看着像是缩小的全景然后突然割裂闪现
 * 变成卡片本身……问题从来没有被解决」）——**container-transform 收场**。
 *
 * 考证结论（为什么 v1~v3 都没治住）：历代修法（reveal 反向淡入 / 淡出占比调参 / clip 收底）
 * 全都在打磨「面板这一块」——但**末帧像素永远是缩小的详情页**，与真卡之间必然存在一次
 * 「详情内容 → 卡片内容」的内容切换；几何再精确，切换本身就是他看到的「割裂闪现」。
 * 开启动画之所以被认可，是因为它**离开**卡片时用户刚点过那张卡、注意力在「打开」上；
 * 关闭则相反——眼睛盯着回来的卡片，末帧不是卡片 = 假。
 *
 * ⇒ v4 定案：飞回去的那一块**必须本来就是卡片**。面板降级为**背景幽灵**（整体溶解），
 * 一张**真卡片组件**（FeedCard 同源渲染，同数据同 props）从面板矩形**布局动画**收敛到
 * 源卡矩形（left/top/width 走 WAAPI 布局属性 = 每帧真实重排；字号恒定后 1200 宽卡与
 * 详情页字号一致 ⇒ 早期交叉过渡无字号跳变）；**t=1 时刻 replica 的像素 == 真卡的像素**
 * （同一组件同一宽度同一位置渲染）⇒ 卸载交接在像素上不可感知。
 * 丁D1：破 v3「clip 收底」（几何对、内容错），换「内容对、几何逐帧收敛」。
 */
export interface CloseContainerMotion {
  /** replica 的**布局盒**＝源卡实时盒：一步定位，动画期间永不改动——零重排的根。 */
  box: { left: number; top: number; width: number };
  /** 初始 transform：把布局在卡盒上的 replica 视觉上盖住面板**当前可见盒**（内联 style 即 from 值）。 */
  from: string;
  /** 终点 transform：identity ⇒ 视觉盒＝布局盒＝真卡盒（t=1 像素=真卡像素）。 */
  to: string;
}
/**
 * ⭐ 十六轮（2026-10-02，栗子验收 v4 整体通过、唯一新问题「关闭时字因卡片变化不停移动→眼花」）——
 * **乙路线：transform 飞行，零重排**。
 *
 * 考证结论（双源实锤）：字移动＝十四轮那版布局动画（left/top/width 走 WAAPI）**逐帧重折行**——
 * real 真机 trace Layout 46 次/110 帧、headless 17 次/38 帧，两种刷新率下「每帧一次 reflow」
 * 双双自洽；帧率无辜（rAF p50=5.5ms 零掉帧=空闲基线）。甲调参**灭不了**（A/B 实证 Layout 次数
 * 不随曲线/时长变，17/19 恒定）。
 *
 * ⇒ 乙定案：replica **一步定位在源卡实时盒**（box=dest，布局宽=卡宽，内容只按卡宽折一次行、
 *   从此永不重折），初始 transform 把它视觉上盖住面板当前可见盒（translate=面板左上−卡左上、
 *   scale=面板宽/卡宽，transform-origin: top left），WAAPI 只动 **transform** → identity。
 *   每一帧都是同一份排版的等比缩放 = 没有字移动；t=1 视觉盒=布局盒=真卡盒 ⇒ 末帧像素=真卡像素
 *   （五轮抗战的末帧无缝交接保全）。
 *   ⚠ 〇16-2 不可能三角（几何连续＋字号连续＋零重排不可兼得）：乙牺牲的是「内容以面板宽度
 *   展开的起始帧」（改为卡内容放大起始），保全几何连续＋末帧字号连续＋零重排。
 *   已知风险（真机复验重点）：①起始帧=卡内容放大 S₀≈面板宽/卡宽 覆盖面板——与已验收的打开
 *   动画首帧（详情内容缩于卡矩形）严格对称；②飞行早期文本轻微发虚（transform 光栅化）随缩放锐化。
 *   两者被否 → 回退序降级甲-S2（280ms＋--ease-standard），不自行发明第三方案。
 *
 * 两端：起点=面板**当前可见盒**（含在飞 transform，Esc 抢跑也能接上——getBoundingClientRect
 * 给的就是视觉盒，scale=当前宽/卡宽、translate=当前左上−卡左上 直接反推），
 * 终点=源卡**实时矩形**（锁⑦：读 DOM 不读估算）。任一端非法尺寸 → null（调用方走回退案）。
 */
export function closeContainerMotion(current: Box, dest: Box): CloseContainerMotion | null {
  for (const b of [current, dest]) {
    if (!Number.isFinite(b.left) || !Number.isFinite(b.top) || !Number.isFinite(b.width) || b.width <= 0)
      return null;
  }
  const s = current.width / dest.width;
  if (!Number.isFinite(s) || s <= 0) return null;
  return {
    box: { left: dest.left, top: dest.top, width: dest.width },
    from: `translate3d(${current.left - dest.left}px, ${current.top - dest.top}px, 0) scale(${s})`,
    to: "translate3d(0px, 0px, 0) scale(1)",
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
 *   （否则残留的 fill 会在下次打开时把卡片顶成可见——锁⑧同族的坑）。
 *   ⚠ 2026-10-01 十四轮：本函数降级为**回退案**专用（源卡不可用时的原地收束）；主路径见
 *   closeContainerMotion + FeedCard 的 replica（面板作为幽灵的整体溶解用 playCloseGhostMotion）。 */
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

  // 前 80% 保持不透明（让人看清「同一块东西在往回走」，且**落地那一下是实体**），
  // 后 20% 化掉（交接给源卡，落地不留残影）。
  // ⚠ 这里用「delay + 短时淡出」两条独立参数，**不**用带 offset 的三关键帧：
  //   实测（`D:/tmp/gt-layout/r4/exit/轨迹.json`）三关键帧在 Chromium 里没有按 offset 分段——
  //   透明度从第 3 帧（~46ms / 进度 0.6）就已经掉到 0.58，等于整段都在淡出，
  //   "往回走"这件事几乎看不见。换成 delay 语义无歧义。
  // ⚠ 2026-09-26 订正：占比从 40% 收到 20%（见 CLOSE_FADE_FRACTION 注释）——
  //   40% 时最后 80ms 是半透明鬼影在最快地飞，观感就是栗子说的「直接消散」。
  const fadeMs = Math.round(duration * CLOSE_FADE_FRACTION);
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

/**
 * ⭐ 十四轮：**背景幽灵**——面板整体溶解（transform 继续收缩 + 透明度淡出）。
 * 与 playCloseMotion（末段 20% 淡出）的区别：主路径（container-transform）里眼睛盯的是
 * 上层那张 replica 卡片，面板只是「详情页在蒸发」的背景；全程淡出不会产生
 * 「半透明鬼影在最快地飞」（那是末段集中淡出 + 速度峰叠加的产物，09-26 实拍判过死）。
 * ⭐ 十八轮：淡出窗从全程收到**前 1/3**（CLOSE_GHOST_FADE_FRACTION）——真机减速摄影定案
 * 「闪影」主因是双内容重叠（幽灵正文的透卡叠影＋卡下条带在全程淡出下可感 7–9 帧），
 * 幽灵只在前 1/3 可见即消隐（参数依据见 CLOSE_GHOST_FADE_FRACTION 注释与取证报告）。
 * 遮罩 dim 与面板同一条时间线。 */
export function playCloseGhostMotion(
  panel: HTMLElement,
  overlay: HTMLElement | null,
  motion: OpenMotion,
  duration = CLOSE_DURATION,
): { card: Animation; fade: Animation; dim?: Animation } {
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
  const ghostFadeMs = Math.max(1, Math.round(duration * CLOSE_GHOST_FADE_FRACTION));
  const fade = panel.animate([{ opacity: 1 }, { opacity: 0 }], { ...timing, duration: ghostFadeMs });
  if (now != null) fade.startTime = now;
  let dim: Animation | undefined;
  if (overlay && typeof overlay.animate === "function") {
    try {
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
  return { card, fade, dim };
}
