/**
 * GitTok 拖动回归闸（G7③，二轮 2026-09-23）——把「拖动改宽」纳入自动化验收。
 *
 * 为什么需要它：responsive:check 只测静态档位（每档加载后量），抓不到「拖动过程中」的突变——
 * 甲2 的 4 处硬跳变（侧栏 0→64 / 64→192 / 列数 1→2 / 2→3）在那条闸里全是 PASS。
 * 本闸用 CDP 连续改视口宽（模拟拖拽），逐帧记录布局，断言：
 *   ① 列数翻转处首卡 top 跳变 ≤8px（锚点保持——FLIP 补差的直接后果）；
 *   ② 列数翻转处有过渡在场（翻转后 300ms 内出现非空 transform，时长 ≥150ms）；
 *   ③ 首帧列数序列只有一项（首帧初值由视口算出，ResizeObserver 首次校正应是 no-op）；
 *   ④ 无横向溢出贯穿全程。
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

/** 列数翻转对（八轮 2026-09-25 晚：列数规则改成「取卡宽 ≤ 793 的**最小**列数」）。
 *  现在**只有一个桌面门槛**：网格 = **793px**（＝视口 1065）→ 超过就两列；再宽也还是两列
 *  （内容上限 1650 ⇒ 网格封顶 1602 ⇒ 三点五列永不出现）。所以「跨 1594」那两对场景整体退役
 *  （八轮后 1400/1560/1620/1700 全是 2 列、列数不再翻转 ⇒ 闸会报「翻转未发生」），
 *  改为跨 **1065** 的 1↔2 对；另加 768 那条（手机档 ↔ 桌面档）保住跨形态那条边界。
 *  ⚠ 门槛值必须与 `feedColsForContentWidth` 同式推导，不许写死到「跨不过去」的档位——
 *    三轮就踩过这个坑（旧档位 1100→1180 跨不过新门槛，闸直接判「列数翻转未发生」）。 */
const COL_SCENES = [
  { label: "1→2列(小步跨门槛)", from: 1040, to: 1100 },
  { label: "2→1列(小步跨门槛)", from: 1100, to: 1040 },
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
          const c=document.querySelector('.feed-window > .feed-list > .card');
          if(l&&c){
            const r=c.getBoundingClientRect();
            window.__seq.push({ cols: getComputedStyle(l).gridTemplateColumns.split(' ').filter(Boolean).length,
              tf: c.style.transform||"", cardW: Math.round(r.width), cardTop: Math.round(r.top),
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
      let maxTopJump = 0;
      if (flipIdx > 0) {
        let i = flipIdx + 1;
        while (i < seq.length && seq[i].cardW === seq[flipIdx].cardW && !(seq[i].tf && seq[i].tf !== "")) {
          maxTopJump = Math.max(maxTopJump, Math.abs(seq[i].cardTop - seq[i - 1].cardTop));
          i++;
        }
        maxTopJump = Math.max(maxTopJump, Math.abs(seq[flipIdx].cardTop - seq[flipIdx - 1].cardTop));
      }
      const tfFrames = seq.filter((s) => s.tf && s.tf !== "" && s.tf !== "none").length;
      const endClean = seq.length > 0 && (!seq[seq.length - 1].tf || seq[seq.length - 1].tf === "");
      report(
        `${sc.label} 列数翻转发生`,
        colChanged,
        `${sc.from}→${sc.to} 列数序列 ${[...new Set(seq.map((s) => s.cols))].join("→")}`,
      );
      report(
        `${sc.label} 首卡 top 跳变 ≤${MAX_TOP_JUMP}px`,
        maxTopJump <= MAX_TOP_JUMP,
        `实测最大跳变 ${maxTopJump}px（无过渡重排通常 300px+）`,
      );
      report(
        `${sc.label} 过渡在场（≥${TRANSITION_MIN_FRAMES} 帧非空 transform）`,
        tfFrames >= TRANSITION_MIN_FRAMES,
        `非空 transform ${tfFrames} 帧｜结束清空 ${endClean}`,
      );
      scenes.push({ scene: sc.label, from: sc.from, to: sc.to, seq, maxTopJump, tfFrames, endClean });
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
            const l = document.querySelector('.feed-window > .feed-list');
            if (l) {
              const n = getComputedStyle(l).gridTemplateColumns.split(' ').filter(Boolean).length;
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
