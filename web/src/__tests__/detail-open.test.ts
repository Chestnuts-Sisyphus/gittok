// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { describe, expect, it } from "vitest";
import {
  CLOSE_DURATION,
  CLOSE_EASING,
  CLOSE_INPLACE_DURATION,
  OPEN_DURATION,
  OPEN_EASING,
  OPEN_SPRING_POINTS,
  OPEN_SPRING_RESPONSE,
  OPEN_SPRING_SAMPLES,
  afterPaint,
  closeInPlaceMotion,
  closeToCardMotion,
  destBoxFromElement,
  destBoxFromViewport,
  isVisibleOpenMotion,
  liveBoxIfUsable,
  openFromCard,
  sampleLinearEasing,
  springProgress,
  uniformScale,
  type Box,
} from "../detail-open.ts";

const src: Box = { left: 120, top: 180, width: 710, height: 288 };
const dest: Box = { left: 120, top: 45, width: 1200, height: 810 };

describe("uniformScale", () => {
  it("只有一个比例，等于卡片宽/详情宽", () => {
    expect(uniformScale(src, dest)).toBeCloseTo(710 / 1200, 6);
  });

  it("非法宽度返回 null", () => {
    expect(uniformScale(src, { ...dest, width: 0 })).toBeNull();
  });
});

describe("destBoxFromElement", () => {
  it("量终态时忽略飞行 transform，量完还原，避免二次开飞变成 identity", () => {
    const flying = "translate3d(217px, 56px, 0) scale(0.4)";
    const el = {
      style: { transform: flying },
      getBoundingClientRect() {
        if (this.style.transform === "none" || this.style.transform === "") {
          return { left: 31, top: 28, width: 1200, height: 511 };
        }
        return { left: 248, top: 84, width: 483, height: 206 };
      },
    };
    expect(destBoxFromElement(el)).toEqual({ left: 31, top: 28, width: 1200, height: 511 });
    expect(el.style.transform).toBe(flying);
    const leftover = destBoxFromElement(el);
    const motion = openFromCard(src, leftover);
    expect(motion).not.toBeNull();
    if (!motion) return;
    expect(isVisibleOpenMotion(motion)).toBe(true);
    expect(openFromCard(src, { left: 248, top: 84, width: 483, height: 206 })?.from).not.toBe(motion.from);
  });
});

describe("isVisibleOpenMotion", () => {
  it("源终态重合的 identity 飞行动画判为不可见", () => {
    const same = { left: 120, top: 45, width: 1200, height: 810 };
    const motion = openFromCard(same, same);
    expect(motion).not.toBeNull();
    if (!motion) return;
    expect(isVisibleOpenMotion(motion)).toBe(false);
  });
});

describe("openFromCard", () => {
  it("from 是 translate3d + 单参数 scale，落到 translate3d(0) scale(1) 而不是 none", () => {
    const t = openFromCard(src, dest);
    expect(t).not.toBeNull();
    if (!t) return;
    expect(t.s).toBeCloseTo(710 / 1200, 6);
    expect(t.from).toBe(`translate3d(0px, 135px, 0) scale(${t.s})`);
    expect(t.to).toBe("translate3d(0px, 0px, 0) scale(1)");
    expect(t.from).not.toMatch(/scale\([^)]+,/);
  });
});

describe("destBoxFromViewport", () => {
  it("宽 = min(1200, 视口-40)，顶距 5vh", () => {
    expect(destBoxFromViewport(1440, 900)).toEqual({ left: 120, top: 45, width: 1200, height: 810 });
    expect(destBoxFromViewport(900, 700)).toEqual({ left: 20, top: 35, width: 860, height: 630 });
  });
});

describe("时长与缓动", () => {
  it("弹簧先密采再按曲率写进 linear()，总时长在卡片展开窗口", () => {
    expect(OPEN_EASING.startsWith("linear(")).toBe(true);
    expect(OPEN_EASING).toMatch(/\d%\s*,/);
    expect(OPEN_SPRING_SAMPLES).toBeGreaterThanOrEqual(60);
    expect(OPEN_SPRING_POINTS.length).toBeGreaterThanOrEqual(16);
    expect(OPEN_DURATION).toBeGreaterThanOrEqual(240);
    expect(OPEN_DURATION).toBeLessThanOrEqual(400);
  });

  it("linear() 折线相对真弹簧的误差小于一帧观感", () => {
    const settle = OPEN_DURATION / 1000;
    let maxErr = 0;
    for (let i = 0; i <= 100; i++) {
      const u = i / 100;
      const err = Math.abs(springProgress(u * settle) - sampleLinearEasing(OPEN_SPRING_POINTS, u));
      if (err > maxErr) maxErr = err;
    }
    expect(maxErr).toBeLessThan(0.012);
  });
});

describe("springProgress", () => {
  it("前段比匀速快，不是 S 形慢启动", () => {
    const t = OPEN_SPRING_RESPONSE * 0.3;
    expect(springProgress(t)).toBeGreaterThan(0.45);
    expect(springProgress(t)).toBeGreaterThan(t);
  });

  it("收尾贴近 1，超调不超过 2.5%", () => {
    expect(springProgress(OPEN_SPRING_RESPONSE)).toBeGreaterThan(0.88);
    expect(springProgress(OPEN_SPRING_RESPONSE * 1.5)).toBeGreaterThan(0.97);
    expect(springProgress(OPEN_SPRING_RESPONSE * 0.7)).toBeLessThan(1.025);
  });
});

describe("afterPaint", () => {
  it("第二帧才回调；cancel 之后不再调用", () => {
    const queued: FrameRequestCallback[] = [];
    const origRaf = globalThis.requestAnimationFrame;
    const origCancel = globalThis.cancelAnimationFrame;
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
      queued.push(cb);
      return queued.length;
    };
    globalThis.cancelAnimationFrame = (id: number) => {
      queued[id - 1] = () => undefined;
    };
    try {
      let n = 0;
      afterPaint(() => {
        n += 1;
      });
      expect(n).toBe(0);
      queued[0](0);
      expect(n).toBe(0);
      queued[1](0);
      expect(n).toBe(1);

      afterPaint(() => {
        n += 10;
      })();
      queued[2]?.(0);
      queued[3]?.(0);
      expect(n).toBe(1);
    } finally {
      globalThis.requestAnimationFrame = origRaf;
      globalThis.cancelAnimationFrame = origCancel;
    }
  });
});

describe("退场几何（四轮 T8②）", () => {
  const layout: Box = { left: 100, top: 45, width: 1200, height: 810 };
  const card: Box = { left: 340, top: 320, width: 556, height: 288 };

  it("closeToCardMotion 是 openFromCard 的精确逆：终点 = 卡宽/布局宽，位移 = 卡位−布局位", () => {
    const m = closeToCardMotion(layout, layout, card);
    expect(m).not.toBeNull();
    expect(m!.s).toBeCloseTo(556 / 1200, 6);
    // 落点：translate = 卡左上 − 布局左上
    expect(m!.to).toBe(`translate3d(${340 - 100}px, ${320 - 45}px, 0) scale(${556 / 1200})`);
    // 起点（无在飞 transform 时）= identity
    expect(m!.from).toBe("translate3d(0px, 0px, 0) scale(1)");
    // 与打开那条同一个终点盒：openFromCard(card, layout).from 与 closeToCardMotion(...).to 应当互为同一几何
    const open = openFromCard(card, layout)!;
    expect(open.from).toBe(m!.to);
  });

  it("起点取「当前可见盒」：打开动画没跑完就关，也从中途那个位置接着走", () => {
    // 模拟入场进行到一半：面板当前只放大到 700 宽、位置在 (140,90)
    const mid: Box = { left: 140, top: 90, width: 700, height: 470 };
    const m = closeToCardMotion(mid, layout, card)!;
    expect(m.from).toBe(`translate3d(${140 - 100}px, ${90 - 45}px, 0) scale(${700 / 1200})`);
    // 位移方向仍是「从当前位置向卡片收」，不是从布局盒起跳（那会先瞬移一下）
    const dxFrom = 140 - 100,
      dxTo = 340 - 100;
    expect(Math.sign(dxTo - dxFrom)).toBe(Math.sign(dxTo - 0));
  });

  it("回退案只有微缩没有位移（源卡不可用时不许飞向看不见的矩形）", () => {
    const m = closeInPlaceMotion(layout, layout)!;
    expect(m.s).toBeCloseTo(0.985, 6);
    expect(m.from.slice(0, 16)).toBe(m.to.slice(0, 16)); // 位移部分逐字相同
    expect(m.to).toContain("scale(0.985)");
  });

  it("非法尺寸返回 null（不许对 0 宽做除法，NaN 会让整条 transform 作废）", () => {
    expect(closeToCardMotion(layout, { ...layout, width: 0 }, card)).toBeNull();
    expect(closeInPlaceMotion(layout, { ...layout, width: 0 })).toBeNull();
  });

  it("时长与曲线：退场比入场短（NN/g 0.67–0.83 区间）、曲线是加速型且与入场 spring 不同", () => {
    const ratio = CLOSE_DURATION / OPEN_DURATION;
    expect(ratio).toBeGreaterThanOrEqual(0.6);
    expect(ratio).toBeLessThanOrEqual(0.85);
    // 增量：这是「退场不拖沓」的判据来源——入场 280ms 是弹簧，退场用独立曲线（不能复用弹簧，
    // 它的 1.011 超调在「离开」语义里会被读成弹一下再走）
    expect(CLOSE_EASING).toBe("cubic-bezier(0.2, 0, 1, 0.9)");
    expect(CLOSE_EASING).not.toBe(OPEN_EASING);
    expect(CLOSE_INPLACE_DURATION).toBeLessThanOrEqual(CLOSE_DURATION);
  });
});

describe("liveBoxIfUsable（源卡还活着吗）", () => {
  // 结构化替身（node 环境无 DOM）：够 liveBoxIfUsable 用，也照样能表达「已卸载 / 已移出视口」
  const mk = (
    rect: Partial<{
      left: number;
      top: number;
      width: number;
      height: number;
      right: number;
      bottom: number;
    }>,
    connected = true,
  ) => ({
    isConnected: connected,
    getBoundingClientRect: () => ({
      left: 0,
      top: 0,
      width: 100,
      height: 50,
      right: 100,
      bottom: 50,
      ...rect,
    }),
  });
  it("在视口内 → 返回实时矩形（而不是打开时那份快照）", () => {
    const b = liveBoxIfUsable(mk({ left: 200, top: 300, right: 300, bottom: 350 }), 1200, 900);
    expect(b).toEqual({ left: 200, top: 300, width: 100, height: 50 });
  });
  it("已从 DOM 摘掉（虚拟列表回收）→ null", () => {
    expect(liveBoxIfUsable(mk({}, false), 1200, 900)).toBeNull();
  });
  it("滚出视口 → null", () => {
    expect(liveBoxIfUsable(mk({ left: 200, top: -400, right: 300, bottom: -350 }), 1200, 900)).toBeNull();
    expect(liveBoxIfUsable(mk({ left: 200, top: 2000, right: 300, bottom: 2050 }), 1200, 900)).toBeNull();
  });
  it("尺寸退化成 0（元素还在但已不渲染）→ null", () => {
    expect(liveBoxIfUsable(mk({ width: 0, height: 0, right: 0, bottom: 0 }), 1200, 900)).toBeNull();
  });
  it("null 元素 → null（没传 sourceEl 时走回退案）", () => {
    expect(liveBoxIfUsable(null, 1200, 900)).toBeNull();
  });
});
