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
