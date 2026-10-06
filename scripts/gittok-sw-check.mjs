/**
 * GitTok Service Worker 闸（二十一轮 N4②「无感加载」，2026-10-06）。
 *
 * SW 必须带失效策略与闸（任务书硬性纪律）。四条行为级判据，全对构建产物 dist 跑：
 *   S1 注册与预缓存：页面加载后 SW 注册成功且 activated；预缓存清单落位（≥5 件）。
 *   S2 二次访问 0 网络等待：禁 HTTP 缓存后 reload，壳层资产（assets/fonts）零服务端命中、
 *      页面照常出卡（=SW 缓存在供，不靠 HTTP 缓存糊弄）。
 *   S3 失效策略：注入一个旧版本假缓存（gittok-precache-stale-fake）→ reload → activate
 *      必须把它清掉；同时新版本缓存仍在。离线 reload 页面仍可打开（缓存壳＋应用层同日数据）。
 *   S4 数据放行：SW 控制下 data/* 请求照常打到服务端（新鲜度归应用层同日缓存语义，
 *      SW 不许吞数据请求做第二真源）。
 *
 * 用法：node scripts/gittok-sw-check.mjs
 * 环境变量与既有闸同族：CHROME_PATH / GITTK_REPO / GITTK_DIST / GITTK_SW_OUT /
 * GITTK_SW_PORT / GITTK_SW_CDP。退出码：有 FAIL → 1。
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
const OUT = process.env.GITTK_SW_OUT || path.join(REPO, "tmp", "sw-check");
const SRV_PORT = Number(process.env.GITTK_SW_PORT || 19232);
const CDP_PORT = Number(process.env.GITTK_SW_CDP || 19442);

const RESULTS = [];
function report(name, ok, detail) {
  RESULTS.push({ name, ok });
  console.log(`[${ok ? "PASS" : "FAIL"}] ${name} ${detail}`);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

/** 按路径计数（data/* 与壳层资产分开数，供 S2/S4 断言）。 */
const hits = { shell: 0, data: 0 };
/** 静态服务 + 按路径计数（data/* 与壳层资产分开数，供 S2/S4 断言）。
 *  swDeploySim=true 时对 sw.js 附加一个注释字节差＝模拟一次新部署（触发浏览器 SW
 *  更新周期 install→activate，让「activate 清旧缓存」的失效策略可被行为级验证）。 */
const serverState = { swDeploySim: false };
function startServer(root) {
  const s = http.createServer((req, res) => {
    const rel = decodeURIComponent((req.url || "/").split("?")[0]).replace(/^\/+/, "");
    const f = path.join(root, rel === "" ? "index.html" : rel);
    if (!f.startsWith(path.resolve(root))) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (rel.startsWith("data/")) hits.data++;
    else hits.shell++;
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404);
      res.end("nf");
      return;
    }
    let body = fs.readFileSync(f);
    if (rel === "sw.js" && serverState.swDeploySim) {
      body = Buffer.concat([body, Buffer.from(`\n// deploy-simulation ${Date.now()}\n`)]);
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
        if ((list || []).some((t) => t.type === "page")) break;
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
  call(m, p = {}, timeoutMs = 30000) {
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
  async eval(e, timeoutMs = 30000) {
    const r = await this.call(
      "Runtime.evaluate",
      { expression: `(() => { ${e} })()`, returnByValue: true, awaitPromise: true },
      timeoutMs,
    );
    if (r?.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 300));
    return r?.result?.value;
  }
}

async function poll(cdp, expr, { until, interval = 100, timeout = 30000, since = Date.now() }) {
  while (Date.now() - since < timeout) {
    const v = await cdp.eval(expr).catch(() => null);
    if (v !== null && v !== undefined && until(v)) return { value: v, elapsed: Date.now() - since };
    await new Promise((r) => setTimeout(r, interval));
  }
  return { value: null, elapsed: Date.now() - since, timeout: true };
}

async function waitCards(cdp, timeout = 60000) {
  return poll(cdp, `return document.querySelectorAll('.feed-col > .card').length`, {
    until: (v) => v >= 4,
    interval: 100,
    timeout,
  });
}

async function main() {
  const swPath = path.join(DIST, "sw.js");
  if (!fs.existsSync(swPath)) {
    console.error(`[FAIL] ${swPath} 不存在 —— 构建必须生成 sw.js（vite swPrecachePlugin）`);
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
    await cdp.call("Network.enable");

    // ── 首访：注册＋激活＋预缓存落位 ──
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    await waitCards(cdp);
    const ready = await poll(
      cdp,
      `return (async () => {
         const reg = await navigator.serviceWorker.getRegistration();
         return reg ? !!reg.active : false;
       })()`,
      { until: (v) => v === true, interval: 100, timeout: 20000 },
    );
    const cacheInfo = await cdp.eval(
      `return (async () => {
         const names = await caches.keys();
         const mine = names.filter(n => n.startsWith("gittok-precache-"));
         const entryCounts = await Promise.all(mine.map(async n => (await (await caches.open(n)).keys()).length));
         return { names: mine, entryCounts };
       })()`,
    );
    const totalCached = (cacheInfo?.entryCounts || []).reduce((a, b) => a + b, 0);
    report(
      "S1 SW 注册激活＋预缓存落位",
      !!ready.value && (cacheInfo?.names?.length || 0) >= 1 && totalCached >= 5,
      `active=${ready.value} 缓存=${JSON.stringify(cacheInfo?.names)} 条目=${totalCached}`,
    );

    // ── S4 数据放行：SW 控制下 data/* 仍打到服务端（应用层预取分片＋显式探针都应到网）──
    const before4 = hits.data;
    const probeStatus = await cdp.eval(
      `return (async () => {
         const r = await fetch(new Request("data/feed.json?swprobe=" + Date.now(), { cache: "no-store" }));
         await r.arrayBuffer();
         return r.status;
       })()`,
    );
    report(
      "S4 数据放行（SW 控制下 data/* 照常到服务端，不做第二数据真源）",
      hits.data > before4 && probeStatus === 200,
      `data 命中 +${hits.data - before4}（探针=200，含应用层预取分片）→ SW 未吞数据请求`,
    );

    // ── S2 二次访问 0 网络等待：禁 HTTP 缓存 + reload，壳层零服务端命中、页面照常出卡 ──
    await cdp.call("Network.setCacheDisabled", { cacheDisabled: true });
    const shellBefore = hits.shell;
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    await waitCards(cdp);
    const shellDelta = hits.shell - shellBefore;
    // 导航本身（index.html network-first）会命中服务端 1 次；壳层资产（js/css/字体）不应有
    const assetHits = await cdp.eval(
      `return performance.getEntriesByType("resource")
        .filter(e => /\\/(assets|fonts)\\//.test(e.name)).length`,
    );
    const assetNetHits = shellDelta - 1; // 减去导航 HTML 本身
    report(
      "S2 二次访问 0 网络等待（禁 HTTP 缓存下 reload：壳层资产零服务端命中，页面照常出卡）",
      shellDelta <= 1 && assetNetHits <= 0 && assetHits >= 2,
      `服务端命中 ${shellDelta}（导航1+资产${assetNetHits}）｜页面资产 ${assetHits} 件（SW 缓存在供）`,
    );

    // ── S3 失效策略：注入旧版本假缓存 → 模拟新部署（sw.js 字节差触发更新周期）
    //    → 新 SW activate 必须清掉全部非当前版本的 gittok-* 缓存；再验证离线可开。 ──
    await cdp.eval(
      `return (async () => {
         const c = await caches.open("gittok-precache-stale-fake");
         await c.put("/stale-probe.txt", new Response("stale"));
         return 1;
       })()`,
    );
    serverState.swDeploySim = true;
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    await waitCards(cdp);
    // 更新周期：首次 reload 触发 install→skipWaiting→activate；给 activate 清理留窗
    await poll(
      cdp,
      `return (async () => { const names = await caches.keys(); return !names.includes("gittok-precache-stale-fake"); })()`,
      { until: (v) => v === true, interval: 200, timeout: 20000 },
    );
    serverState.swDeploySim = false;
    const names3 = await cdp.eval(`return (async () => await caches.keys())()`);
    const staleGone = !(names3 || []).includes("gittok-precache-stale-fake");
    // 离线 reload：缓存壳 + 应用层同日数据 ⇒ 页面仍可打开
    await cdp.call("Network.emulateNetworkConditions", {
      offline: true,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
    });
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    const offlineCards = await waitCards(cdp, 20000);
    await cdp.call("Network.emulateNetworkConditions", {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
    await cdp.call("Network.setCacheDisabled", { cacheDisabled: false });
    report(
      "S3 失效策略（旧版本假缓存被 activate 清除）＋离线可开（缓存壳＋同日数据）",
      staleGone && !offlineCards.timeout,
      `stale 清除=${staleGone} 缓存=${JSON.stringify(names3)} 离线出卡=${offlineCards.timeout ? "FAIL" : "OK"}`,
    );
  } finally {
    chrome.kill();
    server.close();
  }

  fs.writeFileSync(
    path.join(OUT, `sw-check_${new Date().toISOString().replace(/[:.]/g, "-")}.json`),
    JSON.stringify({ at: new Date().toISOString(), hits, results: RESULTS }, null, 2),
  );
  const failed = RESULTS.filter((r) => !r.ok);
  console.log(`\n=== 汇总 ===\n断言 ${RESULTS.length} 项｜FAIL ${failed.length} 项`);
  console.log(failed.length === 0 ? "=== SW 闸全 PASS ===" : "=== 存在 FAIL ===");
  process.exit(failed.length === 0 ? 0 : 1);
}

void main();
