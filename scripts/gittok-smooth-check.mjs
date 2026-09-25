/**
 * GitTok 过渡连续性闸（三轮 T5，2026-09-23）——把「丝滑」变成可复跑的断言。
 *
 * ⚠ 头注：CSS 属性断言 ≠ 观感达标（二轮教训）
 *   二轮三闸全绿（responsive 312 / drag 15 / visual 10）但栗子看图仍然打回：
 *   ①「所有的交接过渡动画都不够流畅丝滑」②③ 图标栏/滚动条「并没有解决」。
 *   闸只能防回归，不能证明好看——**观感类交付必须配「用户视角截图逐张目测」**。
 *   本闸负责其中可量化的那一半：拖动全程**逐帧**没有瞬移。
 *   剩下那一半（构图/间距/优雅）见 gittok-visual-check.py 的「观感清单」段 + 人工目测。
 *
 * 为什么落定态扫描不够（gt-r3-probe 那种）：落定态只能看到「布局函数」有没有台阶——
 * 而台阶是响应式设计固有的（列数/形态边界必然有）。栗子要的是**运动连续**：
 * 状态切换那一帧，元素的**渲染矩形**（含 transform / 含 CSS 过渡中间值）不能瞬移。
 *
 * 判据（两条，都是逐帧的时间域量）：
 *   α 起跳帧连续性：状态切换后第一帧的渲染矩形 vs 切换前落定矩形 ≤ 8px
 *     —— 抓「瞬移」。无动画的硬切会在这里给出几十到几百 px（改前实测：768 档 768px、
 *        900 档 140px、1134 档 157px）。
 *   ⚠ 2026-09-24 四轮追加：列数规则改成「取卡宽 ≥ 653 的最大列数」后，**桌面只剩一个列数门槛**
 *     （网格 1322px ＝视口 1594），所以本闸动态探测到的切换点从 4 处减到 2 处
 *     （768 与 1594，各两方向）——断言数随之为 9 项。这是**规则简化**的结果，不是覆盖退化：
 *     `样本有效性` 的下限已同步为 ≥2 个切换点（探到几个就判几个，点位仍然不写死）。
 *   ⚠ 2026-09-24 四轮 T3：**900 这一档不再是断点**——icon-only rail 删除后，769–900 与 >900
 *     走同一形态（192 侧栏 + 24 边距），跨 900 没有任何几何变化。切换点是动态探测的
 *     （COARSE_FROM..TO 粗扫 + 翻转点定位，不写死点位），故本轮断言数 17→13：消失的正是原
 *     900 zone 的 4 条，剩下的 768(772) / 两列(1252) / 三列(1744) 共 6 个切换点 6/6 全绿。
 *     ⇒ 这不是覆盖退化，而是**断点本身被删掉了**（结构性消除优于逐条补过渡）。
 *     `样本有效性` 的下限同步为 ≥2（实测全部切换点都发生状态切换）。
 *   β 无尖峰：整个采样窗内相邻帧的最大位移 ≤ 该元素本次**总变化量**的 45%
 *     —— 抓「一帧跳完再慢慢爬」。平滑缓动（--ease-geometry＝cubic-bezier(0.4,0,0.2,1)）
 *        峰值约 16–20% 总变化；硬切是 100%。为什么不用「≤8px/帧」：128px 的形变哪怕线性
 *        均匀铺在 200ms 里也是 ~11px/帧，绝对阈值会把正常动画判红。
 *
 * ⚠ 不计入判据的两类：
 *   · 不可见元素（opacity≈0 / display:none / visibility:hidden）——底栏淡出到位后才 display:none、
 *     淡入起点由 @starting-style 给，两者的矩形突变在屏幕上不可见；
 *   · `feedContent` 的高度——它是透明容器，高度＝虚拟列表总高（20 万 px 级），列数一变就减半，
 *     那是滚动条长度不是位移。
 *
 * 用法：pnpm smooth:check   ｜ node scripts/gittok-smooth-check.mjs --tag=xxx
 * 退出码：有 FAIL → 1。
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const REPO = process.env.GITTK_REPO || path.resolve(HERE, "..");
const DIST = process.env.GITTK_DIST || path.join(REPO, "web", "dist");
const OUT = process.env.GITTK_SMOOTH_OUT || path.join(REPO, "tmp", "smooth");
const SRV_PORT = Number(process.env.GITTK_SMOOTH_PORT || 19204);
const CDP_PORT = Number(process.env.GITTK_SMOOTH_CDP || 19404);

const TAG = (() => {
  const a = process.argv.find((x) => x.startsWith("--tag="));
  return a ? a.slice(6) : new Date().toISOString().replace(/[:.]/g, "-");
})();

/** ⚠ 边界点位**不写死**：列数门槛随 `--feed-col-min` 变、滚动条槽随 `--scrollbar-size` 变，
 *  任何写死的派生值都会在某次改型后过期（本轮实测就踩到：1255 已经不是 1→2 列门槛了，
 *  细条把槽从 15px 收到 8px 后门槛整体左移到 ~1248，旧 zone 中心落在切换点之外 → 闸在空转）。
 *  改成：先粗扫（步 12）找**真实的状态变化点**（列数 / 侧栏宽 / 底栏在场），再在变化点±12px
 *  内以 2px 步长密扫。形态边界找得到就采样，找不到就不采（并在「样本有效性」里报出来）。 */
const COARSE_FROM = 700;
const COARSE_TO = 1900;
const COARSE_STEP = 12;
const STEP = 2;
const STEPS_PER_ZONE = 13; // 2026-09-24 四轮：6 → 13（细扫窗 ±12px）。
// 为什么加宽：粗扫步长 12px ⇒ 它报出的翻转点最多偏离真翻转点 12px（四轮实测：列数真翻转在视口 1594，
// 粗扫报 1600，而细扫窗原本只覆盖 1596–1606 ⇒ **真翻转整个落在窗外**，那一档于是"没有任何元素在动"，
// 「无尖峰」判据 0/0 假绿（已被下面新增的"必须有采样"判据打红）。窗加宽到 ±12px 后覆盖真翻转点。
const SAMPLE_MS = 380;
/** α 阈值（px）：切换当帧允许的位移。2px 的驱动步长 + 6px 余量。 */
const MAX_FLIP_DELTA = 8;
/** β 阈值：单帧位移 / 本次总变化量。平滑缓动峰值 ~20%，硬切 100%。
 *  ⚠ 只在总变化 ≥ 12px 的元素/字段上判（见 analyse 里的说明）。 */
const MAX_PEAK_RATIO = 0.45;
const PEAK_MIN_TOTAL = 12;

const RESULTS = [];
function report(name, ok, detail) {
  RESULTS.push({ name, ok, detail });
  console.log(`[${ok ? "PASS" : "FAIL"}] ${name} ${detail}`);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
function startServer(root) {
  const s = http.createServer((req, res) => {
    const rel = decodeURIComponent((req.url || "/").split("?")[0]).replace(/^\/+/, "");
    const f = path.join(root, rel === "" ? "index.html" : rel);
    if (!f.startsWith(path.resolve(root)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404);
      res.end("nf");
      return;
    }
    res.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" });
    res.end(fs.readFileSync(f));
  });
  s.listen(SRV_PORT, "127.0.0.1");
  return s;
}
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.mid = 0;
    this.pending = new Map();
    ws.addEventListener("message", (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && this.pending.has(m.id)) {
        this.pending.get(m.id)(m);
        this.pending.delete(m.id);
      }
    });
  }
  static async connect(port) {
    let list;
    for (let i = 0; i < 60; i++) {
      try {
        list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
        if (list.some((t) => t.type === "page")) break;
      } catch {}
      await new Promise((r) => setTimeout(r, 500));
    }
    const page = list.find((t) => t.type === "page");
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener("open", res, { once: true });
      ws.addEventListener("error", rej, { once: true });
    });
    return new CDP(ws);
  }
  call(m, p = {}) {
    const id = ++this.mid;
    return new Promise((res) => {
      this.pending.set(id, (msg) => res(msg.result ?? msg));
      this.ws.send(JSON.stringify({ id, method: m, params: p }));
    });
  }
  async eval(e) {
    const r = await this.call("Runtime.evaluate", {
      expression: `(() => { ${e} })()`,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r?.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 300));
    return r?.result?.value;
  }
}

/** 采样器：每帧记关键元素的渲染矩形（含 transform）与可见性；同页跑，Node 侧只驱动视口。 */
const RECORDER = `
  window.__smooth = (() => {
    const pick = () => {
      const out = [];
      const add = (name, el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const vis = cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.02 ? 1 : 0;
        out.push({ k: name, x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2), vis });
      };
      const sb = document.querySelector('.sidebar');
      if (sb) add('sidebar', sb);
      const fc = document.querySelector('.feed-content');
      add('feedContent', fc);
      add('cue', document.querySelector('.feed-content > .channel-head, .feed-content > .pref-prompt'));
      add('card1', document.querySelector('.feed-window > .feed-list > .card'));
      add('bottomBar', document.querySelector('.bottom-bar'));
      const list = document.querySelector('.feed-window > .feed-list');
      out.push({ k: 'cols', x: list ? getComputedStyle(list).gridTemplateColumns.split(' ').filter(Boolean).length : 0, y: 0, w: 0, h: 0, vis: 0 });
      out.push({ k: 'sbw', x: sb ? Math.round(sb.getBoundingClientRect().width) : 0, y: 0, w: 0, h: 0, vis: 0 });
      return out;
    };
    let frames = [], on = false, raf = 0;
    const loop = () => { if (!on) return; try { frames.push({ t: performance.now(), s: pick() }); } catch (e) {} raf = requestAnimationFrame(loop); };
    window.__pick = pick;
    return {
      start(ms) { frames = []; on = true; raf = requestAnimationFrame(loop);
        return new Promise((r) => setTimeout(() => { on = false; cancelAnimationFrame(raf); r(frames.length); }, ms)); },
      take() { return frames; },
    };
  })();
  return 1;
`;

const SKIP = new Set(["cols", "sbw"]);
const FIELDS_OF = (k) => (k === "feedContent" ? ["x", "w"] : ["x", "y", "w", "h"]);

/** 一个步长的读数：α（起跳帧）、β（尖峰比）。 */
function analyse(frames, baseline) {
  const out = { flip: { value: 0 }, peak: { ratio: 0 }, cols: [], sbw: [] };
  const baseMap = Object.fromEntries((baseline ?? []).map((e) => [e.k, e]));
  const first = frames[0];
  if (first) {
    for (const e of first.s) {
      const b = baseMap[e.k];
      if (!b || !e.vis || !b.vis) continue;
      for (const fld of FIELDS_OF(e.k)) {
        const d = Math.abs(e[fld] - b[fld]);
        if (d > out.flip.value)
          out.flip = { value: +d.toFixed(2), el: e.k, field: fld, from: b[fld], to: e[fld] };
      }
    }
  }
  // 每条元素/字段的轨迹：起点（第一帧）、终点（最后一帧）、相邻帧最大位移
  const last = frames[frames.length - 1];
  if (first && last) {
    for (const e0 of first.s) {
      if (SKIP.has(e0.k) || !e0.vis) continue;
      const e1 = last.s.find((x) => x.k === e0.k);
      if (!e1 || !e1.vis) continue;
      for (const fld of FIELDS_OF(e0.k)) {
        const total = Math.abs(e1[fld] - e0[fld]);
        // 只在「确实该有动画」的量级上判 β：小于 12px 的变化（＝拖动驱动步长 2px 的若干倍）
        // 一帧到位本来就是正确行为，拿它算比值只会得到 100% 的假红（实测：764 档 feedContent.w 总变 2px）。
        if (total < 12) continue;
        let mx = 0;
        for (let i = 1; i < frames.length; i++) {
          const a = frames[i - 1].s.find((x) => x.k === e0.k);
          const b = frames[i].s.find((x) => x.k === e0.k);
          if (!a || !b || !a.vis || !b.vis) continue;
          mx = Math.max(mx, Math.abs(b[fld] - a[fld]));
        }
        const ratio = mx / total;
        if (ratio > out.peak.ratio)
          out.peak = {
            ratio: +ratio.toFixed(3),
            el: e0.k,
            field: fld,
            maxFrame: +mx.toFixed(2),
            total: +total.toFixed(2),
          };
      }
    }
  }
  out.cols = frames.map((f) => f.s.find((e) => e.k === "cols")?.x);
  out.sbw = frames.map((f) => f.s.find((e) => e.k === "sbw")?.x);
  return out;
}

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error(`找不到 ${DIST}/index.html —— 先 cd web && npm run build`);
    process.exit(1);
  }
  const server = startServer(DIST);
  fs.mkdirSync(OUT, { recursive: true });
  const profile = path.join(OUT, "chrome-profile");
  fs.rmSync(profile, { recursive: true, force: true });
  // ⚠ 不带 --hide-scrollbars：滚动条占位会改可用宽（T3 之后是 8px），拖动读数必须与真实一致
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      `--remote-debugging-port=${CDP_PORT}`,
      "--remote-allow-origins=*",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
      "--window-size=1920,1080",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const zones = [];
  try {
    const cdp = await CDP.connect(CDP_PORT);
    await cdp.call("Runtime.enable");
    await cdp.call("Page.enable");
    await cdp.call("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-color-scheme", value: "dark" }],
    });
    await cdp.call("Emulation.setDeviceMetricsOverride", {
      width: 1400,
      height: 760,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    await new Promise((r) => setTimeout(r, 2400));
    await cdp.eval(RECORDER);

    // ── 粗扫：找真实状态变化点（列数 / 侧栏宽 / 底栏在场） ──
    const coarse = [];
    const stateAt = async (w) => {
      await cdp.call("Emulation.setDeviceMetricsOverride", {
        width: w,
        height: 760,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await new Promise((r) => setTimeout(r, 260));
      return cdp.eval(`
        const list=document.querySelector('.feed-window > .feed-list');
        const sb=document.querySelector('.sidebar');
        const bb=document.querySelector('.bottom-bar');
        return { cols: list? getComputedStyle(list).gridTemplateColumns.split(' ').filter(Boolean).length: 0,
                 sbw: sb? Math.round(sb.getBoundingClientRect().width): 0,
                 bot: bb? (getComputedStyle(bb).display!=='none' ? 1:0): 0 };
      `);
    };
    for (let w = COARSE_FROM; w <= COARSE_TO; w += COARSE_STEP) coarse.push({ w, ...(await stateAt(w)) });
    const flips = [];
    for (let i = 1; i < coarse.length; i++) {
      const a = coarse[i - 1],
        b = coarse[i];
      if (a.cols !== b.cols || a.sbw !== b.sbw || a.bot !== b.bot) {
        flips.push({
          w: b.w,
          why: [
            a.cols !== b.cols ? `列 ${a.cols}→${b.cols}` : null,
            a.sbw !== b.sbw ? `侧栏宽 ${a.sbw}→${b.sbw}` : null,
            a.bot !== b.bot ? `底栏 ${a.bot}→${b.bot}` : null,
          ]
            .filter(Boolean)
            .join("；"),
        });
      }
    }
    console.log(`粗扫找到 ${flips.length} 个状态变化点：` + flips.map((f) => `${f.w}(${f.why})`).join("｜"));
    const ZONES = flips.map((f) => f.w);

    for (const zone of ZONES) {
      for (const dir of [1, -1]) {
        const startW = dir > 0 ? zone - STEPS_PER_ZONE : zone + STEPS_PER_ZONE;
        await cdp.call("Emulation.setDeviceMetricsOverride", {
          width: startW,
          height: 760,
          deviceScaleFactor: 1,
          mobile: false,
        });
        await new Promise((r) => setTimeout(r, 900));
        const rec = { zone, dir, steps: [], stateChanged: false };
        for (let k = 1; k <= STEPS_PER_ZONE; k++) {
          const w = startW + dir * STEP * k;
          const baseline = await cdp.eval("return window.__pick();");
          const p = cdp.eval(`return window.__smooth.start(${SAMPLE_MS});`);
          await cdp.call("Emulation.setDeviceMetricsOverride", {
            width: w,
            height: 760,
            deviceScaleFactor: 1,
            mobile: false,
          });
          await p;
          const frames = await cdp.eval("return window.__smooth.take();");
          const a = analyse(frames, baseline);
          rec.steps.push({
            w,
            n: frames.length,
            flip: a.flip,
            peak: a.peak,
            cols: [...new Set(a.cols)],
            sbw: [...new Set(a.sbw)],
          });
          if (a.cols.length > 1 || a.sbw.length > 1) rec.stateChanged = true;
        }
        zones.push(rec);
      }
    }
  } finally {
    chrome.kill();
    server.close();
  }

  // ── 判定 ──
  const FLIP_OK = [],
    PEAK_OK = [];
  for (const z of zones) {
    const tag = `${z.zone}(${z.dir > 0 ? "放大" : "缩小"})`;
    let worstFlip = { value: 0 },
      worstPeak = { ratio: 0 };
    // 采样有效性（含卡高）：只要**任何字段**（w/top/left/h）在窗内动过，就说明这一档真的发生了重排。
    let anySample = false;
    let heightOnlyMoved = false;
    for (const s of z.steps) {
      // ⚠ 八轮：**卡高 h 不参与这两条判据**。卡高从常量变成「档内推导值」（加行就加高），
      //   跨形态/行数阈值时必然单帧变化（手机↔桌面 288↔312、1↔2 列 288↔408）——
      //   那是设计要的（不允许留白 ＋ 窄卡不许截断），而「每个元素都有路径」的本义是
      //   **位置与宽度**有路径（w/top/left 由列数与形态直接决定，FLIP 必须补得上）。
      //   卡高是否正确由 responsive 闸 R7（卡高 == 算式值）+ lock 单测各自守。
      if (s.flip.value > 0 || s.peak.ratio > 0) anySample = true;
      if (s.flip.field === "h" || s.peak.field === "h") heightOnlyMoved = true;
      if (s.flip.value > worstFlip.value && s.flip.field !== "h") {
        worstFlip = { ...s.flip, step: s.w };
      }
      if (s.peak.ratio > worstPeak.ratio && s.peak.field !== "h") {
        worstPeak = { ...s.peak, step: s.w };
      }
    }
    FLIP_OK.push({ tag, ...worstFlip, changed: z.stateChanged });
    PEAK_OK.push({ tag, ...worstPeak, changed: z.stateChanged });
    report(
      `边界 ${tag} 起跳帧连续性 ≤${MAX_FLIP_DELTA}px`,
      worstFlip.value <= MAX_FLIP_DELTA,
      `实测 ${worstFlip.value}px（${worstFlip.el ?? "-"}.${worstFlip.field ?? "-"} @${worstFlip.step ?? "-"}）` +
        (heightOnlyMoved && !worstFlip.el
          ? "｜本 zone 只有卡高在动（八轮起卡高＝档内推导值，按设计放行）"
          : "") +
        `｜该 zone ${z.stateChanged ? "发生" : "未发生"}形态/列数切换`,
    );
    // ⚠ 「无样本 ≠ 通过」（09-20 纪律 · 恒空窗口那一条）：本 zone 若一个元素的变化都没采到
    //   （anySample=false），说明这一档的采样窗里**没有任何元素在动**，此时 ratio ≤ 阈值
    //   是假绿而非通过 —— 四轮实测踩到：1594 边界「放大」方向 0.0%（-.- 单帧 -px）。
    //   判据：必须有采样才允许判通过；没有采样就是 FAIL。
    //   ⚠ 八轮：采样有效性看**任意字段**（含 h），但判据只看 w/top/left —— 两个问题分开：
    //   「这一档到底有没有重排」与「重排的路径连不连续」。
    const peakSampled = !!worstPeak.el;
    report(
      `边界 ${tag} 无尖峰（单帧 ≤${MAX_PEAK_RATIO * 100}% 总变化）`,
      anySample && (!peakSampled || worstPeak.ratio <= MAX_PEAK_RATIO),
      (peakSampled
        ? `实测峰值比 ${(worstPeak.ratio * 100).toFixed(1)}%（${worstPeak.el}.${worstPeak.field} ` +
          `单帧 ${worstPeak.maxFrame ?? "-"}px / 总变化 ${worstPeak.total ?? "-"}px @${worstPeak.step ?? "-"}）`
        : anySample
          ? "本 zone 只有卡高在动（h 按八轮口径不进判据；卡高正确性由 R7 守）"
          : `❌ 本 zone **无采样**（没有任何元素的矩形在采样窗内变化）——恒空窗口不能判通过`) +
        `｜该 zone ${z.stateChanged ? "发生" : "未发生"}形态/列数切换`,
    );
  }
  // 样本有效性：至少 4 个状态切换点被采到（768/900/两列/三列 四条），否则闸在空转
  //（「无样本 ≠ 通过」——09-20 纪律：报数分三态，恒空窗口不能当绿）。
  const changed = zones.filter((z) => z.stateChanged).length;
  report(
    "样本有效性：≥2 个切换点实测发生状态切换",
    changed >= 2,
    `发生切换的切换点 ${changed}/${zones.length}`,
  );

  fs.writeFileSync(
    path.join(OUT, `smooth_${TAG}.json`),
    JSON.stringify({ at: new Date().toISOString(), zones, flip: FLIP_OK, peak: PEAK_OK }, null, 2),
  );
  const failed = RESULTS.filter((r) => !r.ok);
  console.log(`\n=== 汇总 ===\n断言 ${RESULTS.length} 项｜FAIL ${failed.length} 项`);
  for (const f of failed) console.log(`  FAIL ${f.name} ${f.detail}`);
  console.log(`读数 ${path.join(OUT, `smooth_${TAG}.json`)}`);
  console.log(failed.length === 0 ? "=== 过渡连续性全 PASS ===" : "=== 存在 FAIL ===");
  process.exit(failed.length === 0 ? 0 : 1);
}

void main();
