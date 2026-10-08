/**
 * GitTok 宽度冻结闸（二十三代 N3b，2026-10-07）。
 *
 * 背景：栗子 10-07「点开主页有时候还是会出现自动的宽度变化」。归因（线上真机探针
 * gt-r23 width-live-r23 实测三源交叉）：唯一跳变＝**Lora 600 字重换装**——
 *   ①时刻对账：跳变 @1565ms ≈ Lora 600 批次 loadingdone @1546ms（±20ms）；
 *   ②量级对账：旧 size-adjust(600)=95.24% vs 实测 98.11%，+2.87pp×300px≈+5px＝观测 295→300；
 *   ③机制对账：二十一轮只 preload 400 ⇒ 500/600/700 走 swap 异步晚到换装。
 * 修复＝①四字重全 preload（换装窗统一压到字体早期）②NSC 族 size-adjust 四档按线上实测
 * 中位重写（400:94.92/500:96.13/600:98.11/700:96.38）。
 *
 * 判据（对构建产物 dist 跑；行为级）：
 *   W1 装载窗零换装跳：fonts 状态变 loaded 后（+500ms 落定）宽度时间线零跳变
 *      （四个 slot：body.scrollWidth／latin 基准串／feed-col 宽／卡宽）。
 *   W2 换装窗至多一跳且量级 ≤8px：字体 loading 期间允许度量交接一帧（兜底→Lora 的
 *      校准残差），超过一帧或 >8px = 兜底校准坏档（与线上实证的 5px 跳同型）。
 *   W3 数据到货零宽度跳：feed.json 响应完成后 settle 3s 内宽度时间线零跳变
 *      （冻结式头片姊妹不变量：数据到货不改任何已渲染盒宽）。
 *   W4 四字重在 loadingdone 集内：Lora 400/500/600/700 的 @font-face 必须全部注册
 *      （少一档 = 该档换装窗回到异步晚到，二十轮 600 档错档复活的温床）。
 *   W5 tab 切换几何一致（二十三代 N3b）：同视口下 首页↔我的 两 tab 的外壳/内容区
 *      x/width 逐位一致（2026-09-23 居中壳漏 me 的同类缺口：2560 实测切换跳 334px）。
 *
 * 用法：node scripts/gittok-width-freeze-check.mjs
 * 环境变量：CHROME_PATH / GITTK_REPO / GITTK_DIST / GITTK_WIDTH_OUT / GITTK_WIDTH_PORT /
 * GITTK_WIDTH_CDP / GITTK_WIDTH_FEED_DELAY（feed.json 延迟 ms，把数据到货窗拉宽可采样）。
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
const OUT = process.env.GITTK_WIDTH_OUT || path.join(REPO, "tmp", "width-freeze");
const SRV_PORT = Number(process.env.GITTK_WIDTH_PORT || 19232);
const CDP_PORT = Number(process.env.GITTK_WIDTH_CDP || 19442);
const FEED_DELAY_MS = Number(process.env.GITTK_WIDTH_FEED_DELAY || 3000);

const RESULTS = [];
function report(name, ok, detail) {
  RESULTS.push({ name, ok });
  console.log(`[${ok ? "PASS" : "FAIL"}] ${name} ${detail}`);
}

const RECORDER = `
(() => {
  window.__W = [];
  window.__FE = [];
  window.__feedDoneAt = 0;
  const origFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const u = typeof input === "string" ? input : (input && input.url) || "";
    const r = await origFetch(input, init);
    if (/data\\/feed\\.json$/.test(u)) window.__feedDoneAt = Math.round(performance.now());
    return r;
  };
  const probe = document.createElement("span");
  probe.textContent = "GitHub 0123 stars 56.7k react-vite-http2";
  probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;font-size:16px;font-family:var(--font-serif)";
  const arm = () => document.body ? document.body.appendChild(probe) : setTimeout(arm, 4);
  arm();
  let frames = 0;
  const tick = () => {
    if (window.__W.length < 20000) {
      const col = document.querySelector('.feed-col');
      const card = document.querySelector('.feed-col > .card');
      window.__W.push([
        Math.round(performance.now()),
        document.body ? document.body.scrollWidth : -1,
        probe.offsetWidth,
        col ? Math.round(col.getBoundingClientRect().width) : -1,
        card ? Math.round(card.getBoundingClientRect().width) : -1,
        document.fonts ? document.fonts.status : "?",
      ]);
      frames++;
      if (frames < 20000) requestAnimationFrame(tick);
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(tick));
  else requestAnimationFrame(tick);
  if (document.fonts) {
    for (const ev of ["loadingstart", "loadingdone"]) {
      document.fonts.addEventListener(ev, (e) => {
        window.__FE.push({ ev, t: Math.round(performance.now()),
          faces: (e.fontfaces || []).map(f => f.family + " " + f.weight) });
      });
    }
  }
})();
`;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
function startServer(root) {
  const s = http.createServer((req, res) => {
    const rel = decodeURIComponent((req.url || "/").split("?")[0]).replace(/^\/+/, "");
    const f = path.join(root, rel === "" ? "index.html" : rel);
    if (!f.startsWith(path.resolve(root))) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404);
      res.end("nf");
      return;
    }
    const body = fs.readFileSync(f);
    if (rel === "data/feed.json") {
      setTimeout(() => {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(body);
      }, FEED_DELAY_MS);
      return;
    }
    res.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" });
    res.end(body);
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
    const page = (list || []).find((t) => t.type === "page");
    if (!page) throw new Error("CDP 页面未就绪");
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener("open", res, { once: true });
      ws.addEventListener("error", rej, { once: true });
    });
    return new CDP(ws);
  }
  call(m, p = {}, timeoutMs = 20000) {
    const id = ++this.mid;
    return new Promise((res, rej) => {
      const t = setTimeout(() => {
        this.pending.delete(id);
        rej(new Error(`CDP 超时: ${m}`));
      }, timeoutMs);
      this.pending.set(id, (msg) => {
        clearTimeout(t);
        msg.error ? rej(new Error(`${m}: ${msg.error.message}`)) : res(msg.result ?? msg);
      });
      this.ws.send(JSON.stringify({ id, method: m, params: p }));
    });
  }
  async eval(e, timeoutMs = 20000) {
    const r = await this.call(
      "Runtime.evaluate",
      { expression: `(() => { ${e} })()`, returnByValue: true, awaitPromise: true },
      timeoutMs,
    );
    if (r?.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 300));
    return r?.result?.value;
  }
}

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error(`找不到 ${DIST}/index.html —— 先 cd web && npm run build`);
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });
  const server = startServer(DIST);
  const profile = path.join(OUT, "chrome-profile");
  fs.rmSync(profile, { recursive: true, force: true });
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--remote-debugging-port=${CDP_PORT}`,
      "--remote-allow-origins=*",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
      "--window-size=1400,900",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  try {
    const cdp = await CDP.connect(CDP_PORT);
    await cdp.call("Runtime.enable");
    await cdp.call("Page.enable");
    await cdp.call("Page.addScriptToEvaluateOnNewDocument", { source: RECORDER });
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    // node 侧短轮询等 4 卡（服务器 feed.json 延迟 FEED_DELAY_MS；头片先到应立即出卡）
    let cards = 0;
    for (let i = 0; i < 90; i++) {
      try { cards = (await cdp.eval(`return document.querySelectorAll('.feed-col > .card').length`)) || 0; } catch {}
      if (cards >= 4) break;
      await new Promise((r) => setTimeout(r, 500));
    }
    if (cards < 4) throw new Error("首窗卡未出现");
    // 等字体 loaded + 数据到货 + 落定（覆盖换装窗与到货窗）
    let fontsLoaded = false, feedDone = 0;
    for (let i = 0; i < 90; i++) {
      try {
        fontsLoaded = (await cdp.eval(`return document.fonts ? document.fonts.status === "loaded" : false`)) === true;
        feedDone = (await cdp.eval(`return window.__feedDoneAt || 0`)) || 0;
      } catch {}
      if (fontsLoaded && feedDone > 0) break;
      await new Promise((r) => setTimeout(r, 500));
    }
    await new Promise((r) => setTimeout(r, 4000)); // 落定窗（loaded+500ms、到货+3s settle）

    const w = (await cdp.eval(`return window.__W || []`)) || [];
    const fe = (await cdp.eval(`return window.__FE || []`)) || [];
    const slots = ["body.scrollWidth", "latin 基准串", "feed-col 宽", "卡盒宽"];
    const jumps = [];
    for (let i = 1; i < w.length; i++) {
      const a = w[i - 1], b = w[i];
      for (let s = 1; s <= 4; s++) {
        if (a[s] > 0 && b[s] > 0 && Math.abs(b[s] - a[s]) > 0.5) {
          jumps.push({ t: b[0], slot: slots[s - 1], from: a[s], to: b[s], fontState: a[5] });
          break;
        }
      }
    }
    // W4：四字重注册集（只收 "Lora <w>" 本体；"Lora FB NSC/TNR <w>" 是兜底面不算）
    const loadedFaces = fe.filter((e) => e.ev === "loadingdone").flatMap((e) => e.faces);
    const loraWeights = new Set(
      loadedFaces
        .filter((f) => /^Lora \d+$/.test(f))
        .map((f) => Number(f.split(" ")[1])),
    );
    const w4ok = [400, 500, 600, 700].every((x) => loraWeights.has(x));
    report(
      "W4 Lora 四字重全部注册换装集（少一档=该档回到异步晚到换装）",
      w4ok,
      `loadingdone faces 含 Lora 字重=${[...loraWeights].sort().join("/")}`,
    );

    // W1：fonts loaded 之后的帧零跳变
    const loadedAt = fe.filter((e) => e.ev === "loadingdone").map((e) => e.t);
    const lastLoaded = loadedAt.length ? Math.max(...loadedAt) : 0;
    const afterLoaded = jumps.filter((j) => j.t > lastLoaded);
    report(
      "W1 装载窗后零宽度跳变（fonts loaded 起四个 slot 全零跳）",
      afterLoaded.length === 0,
      `loaded@${lastLoaded}ms 后跳变 ${afterLoaded.length}${afterLoaded.length ? " " + JSON.stringify(afterLoaded.slice(0, 3)) : ""}`,
    );

    // W2：换装窗（loading 期间）至多一跳且 ≤8px（度量交接单帧）
    const swapWindow = jumps.filter((j) => j.t <= lastLoaded);
    const worstSwap = swapWindow.reduce((m, j) => Math.max(m, Math.abs(j.to - j.from)), 0);
    report(
      "W2 换装窗至多一跳且 ≤8px（度量交接单帧；>1 跳/>8px=兜底校准错档）",
      swapWindow.length <= 1 && worstSwap <= 8,
      `换装窗跳变 ${swapWindow.length}（${swapWindow.map((j) => `${j.slot} ${j.from}→${j.to}@${j.t}`).join("；") || "无"}），最大 ${worstSwap}px`,
    );

    // W3：数据到货窗零宽度跳变（feed.json done 前后各 1s 的帧全零跳）
    const arrivalJumps = jumps.filter((j) => Math.abs(j.t - feedDone) <= 1000);
    report(
      "W3 数据到货零宽度跳变（冻结式头片姊妹不变量）",
      arrivalJumps.length === 0,
      `feed.json@${feedDone}ms ±1s 跳变 ${arrivalJumps.length}${arrivalJumps.length ? " " + JSON.stringify(arrivalJumps) : ""}`,
    );

    // W5：tab 切换几何一致（二十三代 N3b 根修判据）：首页↔我的 外壳/内容区 x/width 逐位一致
    //（cdp.eval 会把表达式再包一层 IIFE——这里只给语句体，return 由包裹层承接）
    const snapGeo = `
      const shell = document.querySelector('.feed-layout, .me-layout');
      const content = document.querySelector('.feed-content');
      return { shellX: shell ? Math.round(shell.getBoundingClientRect().x) : -1,
               shellW: shell ? Math.round(shell.getBoundingClientRect().width) : -1,
               contX: content ? Math.round(content.getBoundingClientRect().x) : -1,
               contW: content ? Math.round(content.getBoundingClientRect().width) : -1 };`;
    const feedGeo = await cdp.eval(snapGeo);
    await cdp.eval(
      `(() => { const t = Array.from(document.querySelectorAll('.tabs .tab')).find(b => b.textContent.includes('我的')); if (t) t.click(); return 1; })()`,
    );
    await new Promise((r) => setTimeout(r, 1200));
    const meGeo = await cdp.eval(snapGeo);
    await cdp.eval(
      `(() => { const t = Array.from(document.querySelectorAll('.tabs .tab')).find(b => b.textContent.includes('首页')); if (t) t.click(); return 1; })()`,
    );
    const geoOk =
      feedGeo.shellX === meGeo.shellX &&
      feedGeo.shellW === meGeo.shellW &&
      feedGeo.contX === meGeo.contX &&
      feedGeo.contW === meGeo.contW;
    report(
      "W5 tab 切换几何一致（首页↔我的外壳/内容区逐位同值，居中壳轮同类缺口根修）",
      geoOk,
      `feed=${JSON.stringify(feedGeo)} me=${JSON.stringify(meGeo)}`,
    );

    fs.writeFileSync(
      path.join(OUT, `width-freeze_${new Date().toISOString().replace(/[:.]/g, "-")}.json`),
      JSON.stringify({ at: new Date().toISOString(), frames: w.length, jumps, fontEvents: fe, results: RESULTS }, null, 2),
    );
  } finally {
    chrome.kill();
    server.close();
  }

  const failed = RESULTS.filter((r) => !r.ok);
  console.log(`\n=== 汇总 ===\n断言 ${RESULTS.length} 项｜FAIL ${failed.length} 项`);
  console.log(failed.length === 0 ? "=== 宽度冻结判据全 PASS ===" : "=== 存在 FAIL ===");
  process.exit(failed.length === 0 ? 0 : 1);
}

void main();
