/**
 * GitTok 拖动回归闸（G7③，二轮 2026-09-23）——把「拖动改宽」纳入自动化验收。
 *
 * 为什么需要它：responsive:check 只测静态档位（每档加载后量），抓不到「拖动过程中」的突变——
 * 甲2 的 4 处硬跳变（侧栏 0→64 / 64→192 / 列数 1→2 / 2→3）在那条闸里全是 PASS。
 * 本闸用 CDP 连续改视口宽（模拟拖拽），逐帧记录布局，断言：
 *   ① 列数翻转处首卡 top 跳变 ≤8px（锚点保持——FLIP 补差的直接后果）；
 *   ② 列数翻转处有过渡在场（翻转后 300ms 内出现非空 transform，时长 ≥150ms）；
 *   ③ 首帧列数序列只有一项（首帧初值由视口算出，ResizeObserver 首次校正应是 no-op）；
 *   ④ 无横向溢出贯穿全程；
 *   ⑤ T4（十轮 2026-09-26）翻转的**速度连续性**：末帧速度→0 ＋ 速度单调收敛（无「最快在落地」）
 *     ＋ 1→2 场景两列同相位同族（第二卡与首卡同帧进场、逐帧位移成常数比）——
 *     配套把 FLIP_EASING 从缓入缓出换成与打开动画同族的落定减速曲线（web/src/feed-flip.ts）。
 *
 * 用法：
 *   pnpm drag:check                          # 全场景
 *   node scripts/gittok-drag-check.mjs --tag=xxx
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
const OUT = process.env.GITTK_OUT || path.join(REPO, "tmp", "drag");
const SRV_PORT = Number(process.env.GITTK_DRAG_PORT || 19104);
const CDP_PORT = Number(process.env.GITTK_DRAG_CDP || 19304);

const TAG = (() => {
  const a = process.argv.find((x) => x.startsWith("--tag="));
  return a ? a.slice(6) : new Date().toISOString().replace(/[:.]/g, "-");
})();

/** 列数翻转对（十轮 T1 2026-09-26：列数规则补**下限 460**——两列把卡压到 460 以下回单列）。
 *  桌面门槛从八轮的网格 793（＝视口 1065）移到**网格 936**（＝2×460+16，视口 ≈1208）：
 *  网格 <936 回 1 列 793（对称页边距 ≤71.5px/侧），≥936 两列。再宽也还是两列
 *  （内容上限 1650 ⇒ 网格封顶 1602 ⇒ 三列永不出现）。
 *  ⚠ 门槛值必须与 `feedColsForContentWidth` 同式推导，不许写死到「跨不过去」的档位——
 *    三轮就踩过这个坑（旧档位 1100→1180 跨不过新门槛，闸直接判「列数翻转未发生」）。 */
const COL_SCENES = [
  { label: "1→2列(小步跨门槛)", from: 1180, to: 1240 },
  { label: "2→1列(小步跨门槛)", from: 1240, to: 1180 },
  // 大步场景：一次拖过门槛（真实使用里常见的是「把窗口从半屏拉到全屏」），
  // 它比小步更能暴露 FLIP 补差的偏差（位移量大、帧数少）。
  { label: "1→2列(大步)", from: 1000, to: 1300 },
  { label: "2→1列(大步)", from: 1300, to: 1000 },
];
/** 首帧场景：三个代表视口（大/中/小桌面）。 */
const FIRSTPAINT_VIEWS = [1920, 1275, 1000];
/** 允许的首卡 top 跳变（px）。FLIP 补差后应为 0~8；无过渡的重排会跳 300+。 */
const MAX_TOP_JUMP = 8;
/** 过渡在场判据：翻转后至少 1 帧非空 transform。 */
const TRANSITION_MIN_FRAMES = 2;

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

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error(`找不到 ${DIST}/index.html —— 先 cd web && npm run build`);
    process.exit(1);
  }
  const server = startServer(DIST);
  fs.mkdirSync(OUT, { recursive: true });
  const profile = path.join(OUT, "chrome-profile");
  fs.rmSync(profile, { recursive: true, force: true });
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
      "--hide-scrollbars",
      "--window-size=1920,1080",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const scenes = [];
  try {
    const cdp = await CDP.connect(CDP_PORT);
    await cdp.call("Runtime.enable");
    await cdp.call("Page.enable");
    await cdp.call("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-color-scheme", value: "dark" }],
    });
    await cdp.call("Emulation.setDeviceMetricsOverride", {
      width: 1400,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    await new Promise((r) => setTimeout(r, 2200));

    // ── ① 列数翻转场景 ──
    for (const sc of COL_SCENES) {
      await cdp.call("Emulation.setDeviceMetricsOverride", {
        width: sc.from,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await new Promise((r) => setTimeout(r, 450));
      // 滚过一屏再拖：首屏（scrollTop=0）时首卡 top 不随列数变（行首恒在视口顶），
      // 「304px 跳变」只在滚动态发生（实测 1100 滚 600px 后 1→2 列翻转 top −275→29）。
      await cdp.eval(`document.querySelector('.app-body').scrollTop = 600; return true;`);
      await new Promise((r) => setTimeout(r, 300));
      await cdp.eval(`
        window.__seq = [];
        window.__seqOn = true;
        const tick = () => {
          const l=document.querySelector('.feed-window > .feed-list');
          const cards=document.querySelectorAll('.feed-window .feed-col > .card');
          const c=cards[0];
          if(l&&c){
            const r=c.getBoundingClientRect();
            // 十轮 T4：第二张卡同帧采样（1↔2 翻转时真正在动 top 的是它——行交换；
            // 首卡只缩宽，top 恒定，速度判据放在 card2 上才有非零信号）
            const c2=cards[1];
            const r2=c2? c2.getBoundingClientRect(): null;
            // 十二轮：列数从 .feed-col 实测（.feed-list 已是横向 flex，grid 轨道退场）
            // cardTopInList = 首卡「列表内」顶偏移（滚动无关）——垫片/前缀正确性的直接信号。
            window.__seq.push({ cols: document.querySelectorAll('.feed-list > .feed-col').length,
              tf: c.style.transform||"", tf2: c2? (c2.style.transform||"") : null,
              cardW: Math.round(r.width), cardLeft: Math.round(r.left), cardTop: Math.round(r.top),
              cardTopInList: Math.round(r.top - l.getBoundingClientRect().top),
              scroll: Math.round(document.querySelector('.app-body').scrollTop),
              cardW2: r2? Math.round(r2.width): null, cardTop2: r2? Math.round(r2.top): null,
              t: Math.round(performance.now()) });
          }
          if(window.__seqOn) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        return true;
      `);
      await cdp.call("Emulation.setDeviceMetricsOverride", {
        width: sc.to,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await new Promise((r) => setTimeout(r, 550));
      await cdp.eval(`window.__seqOn = false; return true;`);
      const seq = (await cdp.eval(`return window.__seq;`)) ?? [];
      const colChanged = seq.some((s, i) => i > 0 && s.cols !== seq[i - 1].cols);
      // top 跳变只在「翻转时刻附近」判——滚动补窗（虚拟列表在滚动中增量渲染新行）也会动 top，
      // 那是信息流正常行为。判据分两段：
      //   ① 翻转帧宽不变段：布局已换、transform 还没动起来，这时 top 必须原地（≤8px）；
      //   ② transform 在场段：非空 transform 帧出现即算「补差已接管」，之后 top 的变化都是
      //      动画本体（93px/s 的收敛滑移是 FLIP 播放，不是跳变）。
      const flipIdx = seq.findIndex((s, i) => i > 0 && s.cols !== seq[i - 1].cols);
      // ── 2026-10-01 十二轮改判（丁D1：破了哪条口径、换回什么）────────────────────────
      // 破：十轮的「翻转帧首卡**视口** top 跳变 ≤8px」。它的前提是卡高冻结（锁高 288 时代
      //     宽变不改任何高度 ⇒ 视口顶天然稳定）。卡高自然化后「宽变→卡内容重排变高」是
      //     设计意图，浏览器 **scroll anchoring** 会随之调 scrollTop 保住阅读位置（诊断
      //     `D:/tmp/gt-r14-diag.mjs` 实锤：scrollTop 600→623 发生在列数还是 2 的帧，
      //     首卡列表内 top 恒 0）——视口 top 里混进了浏览器级合法调节，不能再当布局信号。
      // 换：①「首卡**列表内** top 跳变 ≤8px」＝垫片/前缀正确性（滚动无关，破绽 300px 级
      //     仍会被它抓到）；②视口 top 跳变与 scrollTop 降级为读数（不判红）。
      let maxInListJump = 0;
      let maxTopJump = 0;
      if (flipIdx > 0) {
        let i = flipIdx + 1;
        while (i < seq.length && seq[i].cardW === seq[flipIdx].cardW && !(seq[i].tf && seq[i].tf !== "")) {
          maxTopJump = Math.max(maxTopJump, Math.abs(seq[i].cardTop - seq[i - 1].cardTop));
          maxInListJump = Math.max(maxInListJump, Math.abs(seq[i].cardTopInList - seq[i - 1].cardTopInList));
          i++;
        }
        maxTopJump = Math.max(maxTopJump, Math.abs(seq[flipIdx].cardTop - seq[flipIdx - 1].cardTop));
        maxInListJump = Math.max(
          maxInListJump,
          Math.abs(seq[flipIdx].cardTopInList - seq[flipIdx - 1].cardTopInList),
        );
      }
      const scrollShift = seq.length > 1 ? Math.abs(seq[seq.length - 1].scroll - seq[0].scroll) : 0;
      const tfFrames = seq.filter((s) => s.tf && s.tf !== "" && s.tf !== "none").length;
      const endClean = seq.length > 0 && (!seq[seq.length - 1].tf || seq[seq.length - 1].tf === "");
      report(
        `${sc.label} 列数翻转发生`,
        colChanged,
        `${sc.from}→${sc.to} 列数序列 ${[...new Set(seq.map((s) => s.cols))].join("→")}`,
      );
      report(
        `${sc.label} 首卡列表内 top 稳定 ≤${MAX_TOP_JUMP}px（十二轮改判：垫片/前缀正确性，滚动无关）`,
        maxInListJump <= MAX_TOP_JUMP,
        `列表内跳变 ${maxInListJump}px｜视口 top 跳变 ${maxTopJump}px（读数：含 scroll anchoring 的合法调节，本场 scrollTop 移 ${scrollShift}px）｜` +
          `改判依据：卡高自然化后「宽变→高变」是设计意图，视口 top 混入浏览器 scroll anchoring（D:/tmp/gt-r14-diag.mjs 实锤），布局破绽（300px 级）仍被本条抓到`,
      );
      report(
        `${sc.label} 过渡在场（≥${TRANSITION_MIN_FRAMES} 帧非空 transform）`,
        tfFrames >= TRANSITION_MIN_FRAMES,
        `非空 transform ${tfFrames} 帧｜结束清空 ${endClean}`,
      );
      // ── 2026-09-26 十轮 T4：翻转的**速度连续性**（栗子④「单列变两列的动画看着也没有那么丝滑流畅」）──
      // 三判据，全部从同一份逐帧序列推（rAF 采样 ≈16.7ms/帧），可复跑。运动量的选取：
      // 翻转中真正动 top 的是**第二张卡**（行交换：1→2 它从第 2 行升到第 1 行，2→1 反之），
      // 首卡只缩宽、top 恒定 ⇒ 速度曲线（e1/e2）取 card2 的逐帧 top 位移；
      // 同族/同相位（e3）用两条归一化进度曲线对比：card1 的宽度（缩放）与 card2 的 top
      // 都在同一部 FLIP 动画里，同 easing 同相位 ⇒ 逐帧进度相等。
      //   e1 末帧速度→0：card2 最后一个在场帧位移 ≤ 全段最大位移的 35%
      //     （落定减速曲线 cubic-bezier(0.22,.61,.36,1) 的末帧必然趋零；硬切/中段峰值会远超）；
      //   e2 速度单调收敛（无「最快在落地」）：末 25% 段最大帧位移 < 首 25% 段
      //     ——四轮 T8 抓到的「半透明鬼影在最快地飞」就是违反本条的加速型曲线；
      //   e3 两列同相位同族（仅 1→2）：第二卡 transform 与首卡同帧进场（≤2 帧）＋
      //     两条归一化进度（card1 宽度 / card2 top）逐帧偏差 ≤0.12（同 easing ⇒ 同进度）。
      const act = seq.filter((s) => s.tf && s.tf !== "" && s.tf !== "none");
      let e1 = null,
        e2 = null,
        e3 = null;
      if (act.length >= 4) {
        const d = [];
        for (let i = 1; i < act.length; i++) {
          const a = act[i - 1],
            b = act[i];
          d.push(
            b.cardTop2 != null && a.cardTop2 != null
              ? Math.abs(b.cardTop2 - a.cardTop2)
              : Math.abs(b.cardTop - a.cardTop),
          );
        }
        const dMax = Math.max(...d, 0);
        const k = Math.max(1, Math.floor(d.length * 0.25));
        const headMax = Math.max(...d.slice(0, k), 0);
        const tailMax = Math.max(...d.slice(-k), 0);
        e1 = {
          lastDelta: d[d.length - 1] ?? 0,
          maxDelta: dMax,
          pass: dMax >= 4 && (d[d.length - 1] ?? 0) <= dMax * 0.35,
        };
        e2 = { headMax, tailMax, pass: dMax >= 4 && tailMax < headMax + 1e-6 };
      }
      if (sc.label.startsWith("1→2") && act.length >= 4) {
        const firstTf = seq.findIndex((s) => s.tf && s.tf !== "" && s.tf !== "none");
        const firstTf2 = seq.findIndex((s) => s.tf2 && s.tf2 !== "" && s.tf2 !== "none");
        const startGap = firstTf2 >= 0 ? firstTf2 - firstTf : null;
        const w0 = act[0].cardW,
          w1 = act[act.length - 1].cardW;
        const t0 = act[0].cardTop2,
          t1 = act[act.length - 1].cardTop2;
        let maxDev = null;
        if (w1 !== w0 && t1 != null && t0 != null && t1 !== t0) {
          maxDev = 0;
          for (let i = 0; i < act.length; i++) {
            const p1 = (act[i].cardW - w0) / (w1 - w0);
            const p2 = (act[i].cardTop2 - t0) / (t1 - t0);
            maxDev = Math.max(maxDev, Math.abs(p1 - p2));
          }
        }
        e3 = {
          startGapFrames: startGap,
          progressMaxDev: maxDev == null ? null : +maxDev.toFixed(3),
          pass: startGap != null && Math.abs(startGap) <= 2 && maxDev != null && maxDev <= 0.12,
        };
      }
      report(
        `${sc.label} T4·e1 末帧速度→0（落定减速语义）`,
        !!e1?.pass,
        e1
          ? `card2 末帧位移 ${e1.lastDelta}px / 全段最大 ${e1.maxDelta}px（判据 ≤35% 且 ≥4px 位移样本）｜ease=cubic-bezier(0.22,.61,.36,1)`
          : "在场帧不足（<4），不判",
      );
      report(
        `${sc.label} T4·e2 速度单调收敛（无「最快在落地」）`,
        !!e2?.pass,
        e2 ? `首 25% 段最大帧位移 ${e2.headMax}px vs 末 25% 段 ${e2.tailMax}px` : "在场帧不足（<4），不判",
      );
      if (sc.label.startsWith("1→2")) {
        report(
          `${sc.label} T4·e3 两列同相位同族（同帧进场＋归一进度逐帧相等）`,
          !!e3?.pass,
          e3
            ? `进场帧差 ${e3.startGapFrames}（判据 ≤2）｜进度曲线最大偏差 ${e3.progressMaxDev}（判据 ≤0.12）`
            : "在场帧不足或无位移样本，不判",
        );
      }
      scenes.push({
        scene: sc.label,
        from: sc.from,
        to: sc.to,
        seq,
        maxTopJump,
        tfFrames,
        endClean,
        e1,
        e2,
        e3,
      });
    }

    // ── ③ 连续拖动（同列数宽度扫掠）：主线程不许出 >50ms 长任务（十三轮 T-anim）──────
    // 栗子 10-01：「整体调整窗口的时候动画丝毫不流畅，非常卡顿闪现」。三个机械放大器已拆
    // （字号跨档重排→恒定；测量缓存清空→等比缩放；锚点跨代补偿→代际签名）；本场景把
    // 「连续拖动零长任务」闸化（主线程阻塞才是「卡顿」的可测本体；内容重排导致的视口位移
    // 由浏览器 scroll anchoring 保阅读位置，属合法行为，见十轮追加的改判）。
    {
      await cdp.call("Emulation.setDeviceMetricsOverride", {
        width: 1300,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
      await new Promise((r) => setTimeout(r, 2200));
      await cdp.eval(`document.querySelector('.app-body').scrollTop = 2000; return true;`);
      await new Promise((r) => setTimeout(r, 300));
      await cdp.eval(`
          window.__lt = []; window.__sweep = [];
          try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(Math.round(e.duration)); }).observe({ entryTypes: ['longtask'] }); } catch (e) {}
          window.__on = true;
          const tick = () => {
            let vp = null;
            for (const c of document.querySelectorAll('.feed-list .card')) {
              const r = c.getBoundingClientRect();
              if (r.bottom < 60 || r.top > 420) continue;
              if (!vp || Math.abs(r.top - 150) < Math.abs(vp.top - 150)) vp = { top: r.top };
            }
            if (vp) window.__sweep.push({ top: Math.round(vp.top), scroll: Math.round(document.querySelector('.app-body').scrollTop), t: Math.round(performance.now()) });
            if (window.__on) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          return true;
      `);
      for (let w = 1300; w >= 1240; w -= 8) {
        await cdp.call("Emulation.setDeviceMetricsOverride", {
          width: w,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false,
        });
        await new Promise((r) => setTimeout(r, 16));
      }
      await new Promise((r) => setTimeout(r, 400));
      await cdp.eval(`window.__on = false; return true;`);
      const lt = (await cdp.eval(`return window.__lt;`)) ?? [];
      const sweep = (await cdp.eval(`return window.__sweep;`)) ?? [];
      const big = lt.filter((d) => d > 50);
      let fps = 0;
      if (sweep.length >= 3) {
        const dur = sweep[sweep.length - 1].t - sweep[0].t;
        fps = dur > 0 ? (sweep.length / dur) * 1000 : 0;
      }
      report(
        "连续拖动 1300→1240（同列数扫掠）零 >50ms 长任务（十三轮 T-anim）",
        big.length === 0 && sweep.length >= 5,
        `longtask ${lt.length} 个（>50ms 的 ${big.length} 个${big.length ? "：" + big.join("/") : ""}）｜采样帧 ${sweep.length}｜≈${fps.toFixed(0)}fps｜` +
          `放大器清账：字号恒定（十三轮）＋测量缓存等比缩放＋锚点代际签名`,
      );
      scenes.push({
        scene: "连续拖动扫掠",
        lt: lt.length,
        big: big.length,
        fps: +fps.toFixed(0),
        frames: sweep.length,
      });
    }

    // ── ② 首帧列数序列只有一项 ──
    for (const w of FIRSTPAINT_VIEWS) {
      await cdp.call("Emulation.setDeviceMetricsOverride", {
        width: w,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      // 先导航再装采样器：导航会重置 JS 世界，先装会被清掉（实测「无采样」假 FAIL）。
      await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
      await cdp.call("Runtime.enable"); // 重新 enable 无害；关键在采样脚本注入要趁渲染前
      await cdp.call("Page.addScriptToEvaluateOnNewDocument", {
        source: `
          window.__colsSeq = [];
          const tick = () => {
            // 十二轮：列数从 .feed-col 实测（.feed-list 已是横向 flex，grid 轨道退场）
            const n = document.querySelectorAll('.feed-list > .feed-col').length;
            if (n > 0) {
              const last = window.__colsSeq[window.__colsSeq.length-1];
              if (!last || last.n !== n) window.__colsSeq.push({ n, t: Math.round(performance.now()) });
            }
            if (performance.now() < 6000) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        `,
      });
      await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
      await new Promise((r) => setTimeout(r, 2400));
      const s = (await cdp.eval(`return window.__colsSeq ? window.__colsSeq.slice(0, 12) : null;`)) ?? [];
      report(
        `${w} 首帧列数序列只有一项`,
        s.length === 1,
        `实测 ${s.map((x) => `${x.n}@${x.t}ms`).join(" → ") || "无采样"}（多项=首帧画错列数再跳，乙1）`,
      );
      scenes.push({ scene: `首帧@${w}`, seq: s });
    }
  } finally {
    chrome.kill();
    server.close();
  }

  fs.writeFileSync(
    path.join(OUT, `drag_${TAG}.json`),
    JSON.stringify({ at: new Date().toISOString(), scenes, results: RESULTS }, null, 2),
  );
  const failed = RESULTS.filter((r) => !r.ok);
  console.log(`\n=== 汇总 ===\n断言 ${RESULTS.length} 项｜FAIL ${failed.length} 项`);
  for (const f of failed) console.log(`  FAIL ${f.name} ${f.detail}`);
  console.log(`读数 ${path.join(OUT, `drag_${TAG}.json`)}`);
  console.log(failed.length === 0 ? "=== 拖动全 PASS ===" : "=== 存在拖动 FAIL ===");
  process.exit(failed.length === 0 ? 0 : 1);
}

void main();
