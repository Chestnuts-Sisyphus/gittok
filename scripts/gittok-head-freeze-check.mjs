/**
 * GitTok 冻结式头片闸（二十二-0，2026-10-07）。
 *
 * 背景：栗子 10-07「冷路径加载可感＝真未解决」——feed.json 仍占冷首载 91%（1.2MB gzip 级）。
 * 二十一轮的数据否决否掉的是**朴素热替换**（头片池 n≠全量池 n ⇒ 热替换必重排），不是诉求本身。
 * 本轮正解＝**冻结式头片**：构建期产出推荐频道 baseline top-256（与运行时同一份排序实现
 * recommend-baseline.buildRecommended），冷启动先载头片即时渲染；全量到货只向尾部 append。
 *
 * 硬不变量（为字节让步此不变量的方案不许上）：**全量到货零已渲染区重排**
 * ——head 序=会话序冻结，逐帧探针视口内容位移=0。
 *
 * 判据（对着构建产物 dist 跑，行为级断言；数据类请求 SW 放行语义同线上）：
 *   H0 头片产物（纯 node）：dist/data/feed-head.json 在场、合法 JSON 数组、gzip ≤110KB。
 *   H1 冷启动首屏=头片：网络层首条 data 响应=feed-head.json 且传输字节 ≤110KB 级；
 *      首卡进 DOM 早于 feed.json 响应完成（头片先到先渲染）。
 *   H2 头片序=会话序：冷窗渲染出的卡序列与头片文件序前缀逐位一致（冻结序字面来源）。
 *   H3 全量到货零重排（逐帧探针）：rAF 采样视口指纹（data-repo+offsetTop），从冷窗稳定后
 *      一直采到全量到货落定——所有帧指纹逐位一致（视口内容位移=0）。
 *   H4 append-only＋零重复：到货后首窗序列与冷窗逐位一致；频道张数增长（尾部已接上）；
 *      渲染窗内 data-repo 无重复。
 *   H5 冷窗不渲染残缺序：搜索 tab 在冷窗输入查询 = 加载态（不是「没搜到」/假空态）。
 *
 * 用法：node scripts/gittok-head-freeze-check.mjs
 * 退出码：有 FAIL → 1。环境变量：CHROME_PATH / GITTK_REPO / GITTK_DIST / GITTK_HEAD_OUT /
 * GITTK_HEAD_PORT / GITTK_HEAD_CDP / GITTK_HEAD_DELAY（feed.json 人为延迟 ms）。
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const REPO = process.env.GITTK_REPO || path.resolve(HERE, "..");
const DIST = process.env.GITTK_DIST || path.join(REPO, "web", "dist");
const OUT = process.env.GITTK_HEAD_OUT || path.join(REPO, "tmp", "head-freeze");
const SRV_PORT = Number(process.env.GITTK_HEAD_PORT || 19231);
const CDP_PORT = Number(process.env.GITTK_HEAD_CDP || 19441);
/** feed.json 人为延迟：把冷窗（头片已渲染、全量未到）拉宽到可采样。 */
const FEED_DELAY_MS = Number(process.env.GITTK_HEAD_DELAY || 4000);
const HEAD_GZIP_BUDGET = 110 * 1024;

const RESULTS = [];
function report(name, ok, detail) {
  RESULTS.push({ name, ok });
  console.log(`[${ok ? "PASS" : "FAIL"}] ${name} ${detail}`);
}

/* ── H0 头片产物（纯 node，不起浏览器）────────────────────────────────────────── */
function checkHeadArtifact() {
  const p = path.join(DIST, "data", "feed-head.json");
  if (!fs.existsSync(p)) {
    report("H0 头片产物（dist/data/feed-head.json 在场）", false, "文件不存在——vite prepareFeedPlugin 未发射");
    return null;
  }
  const body = fs.readFileSync(p);
  let head = null;
  try {
    head = JSON.parse(body.toString("utf8"));
  } catch {
    report("H0 头片产物（合法 JSON 数组）", false, "JSON 解析失败");
    return null;
  }
  const gz = zlib.gzipSync(body, { level: 6 }).length;
  const ok = Array.isArray(head) && head.length > 0 && gz <= HEAD_GZIP_BUDGET;
  report(
    "H0 头片产物（top-256 baseline，gzip ≤110KB 预算）",
    ok,
    `cards=${head.length} raw=${(body.length / 1024).toFixed(1)}KB gzip(lv6)=${(gz / 1024).toFixed(1)}KB 预算=${(HEAD_GZIP_BUDGET / 1024).toFixed(0)}KB`,
  );
  return head;
}

/* ── 闸服务端：dist 静态 + feed.json 延迟 + 头片 gzip 编码 ──────────────────────── */
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
      // 人为延迟：冷窗可采样。整段延迟（不是 TTFB-only），保证到货时刻清晰。
      setTimeout(() => {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(body);
      }, FEED_DELAY_MS);
      return;
    }
    if (rel === "data/feed-head.json") {
      // gzip 编码传输：与线上 Pages 同语义，H1 的传输字节读数才诚实
      const gz = zlib.gzipSync(body, { level: 6 });
      res.writeHead(200, {
        "content-type": "application/json",
        "content-encoding": "gzip",
        "content-length": gz.length,
      });
      res.end(gz);
      return;
    }
    res.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" });
    res.end(body);
  });
  s.listen(SRV_PORT, "127.0.0.1");
  return s;
}

/* ── 页面初始化注入：网络时刻 + 逐帧视口指纹 ─────────────────────────────────────── */
const PAGE_RECORDER = `
(() => {
  window.__net = { headDoneAt: null, feedDoneAt: null, headBytes: 0 };
  const origFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const u = typeof input === "string" ? input : (input && input.url) || "";
    const r = await origFetch(input, init);
    if (/data\\/feed-head\\.json$/.test(u)) {
      window.__net.headDoneAt = Math.round(performance.now());
      const clone = r.clone();
      clone.arrayBuffer().then((b) => { window.__net.headBytes = b.byteLength; }).catch(() => {});
    } else if (/data\\/feed\\.json$/.test(u)) {
      window.__net.feedDoneAt = Math.round(performance.now());
    }
    return r;
  };
  // 逐帧视口指纹：视口内可视卡的 [data-repo, offsetTop] 序列。采样从首卡 +800ms 起
  //（字体/头像落定），一直采到调用方叫停——覆盖全量到货前后整段。
  window.__frames = [];
  window.__sampling = false;
  const snap = () => Array.from(document.querySelectorAll('.feed-col > .card'))
    .filter((c) => { const r = c.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; })
    .map((c) => c.getAttribute('data-repo') + '@' + Math.round(c.getBoundingClientRect().top));
  const loop = () => {
    if (window.__sampling && document.querySelector('.feed-col > .card')) {
      window.__frames.push({ t: Math.round(performance.now()), fp: snap().join('|') });
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  window.__startSampling = () => { window.__sampling = true; };
})();
`;

/* ── CDP 小客户端（与 detail 闸同族）────────────────────────────────────────────── */
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

async function poll(cdp, expr, { until, interval = 50, timeout = 30000, since = Date.now() }) {
  while (Date.now() - since < timeout) {
    const v = await cdp.eval(expr).catch(() => null);
    if (v !== null && v !== undefined && until(v)) return { value: v, elapsed: Date.now() - since };
    await new Promise((r) => setTimeout(r, interval));
  }
  return { value: null, elapsed: Date.now() - since, timeout: true };
}

async function main() {
  const head = checkHeadArtifact();
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error(`找不到 ${DIST}/index.html —— 先 cd web && npm run build`);
    process.exit(1);
  }
  if (!head) process.exit(1);
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
    // 传输字节（H1b）：页面内读到的 body 是解码后体积，wire 字节必须走 Network 域
    const netFrames = new Map(); // requestId → { url, encodedDataLength }
    cdp.ws.addEventListener("message", (ev) => {
      const m = JSON.parse(ev.data);
      if (m.method === "Network.responseReceived") {
        const { requestId, response } = m.params;
        netFrames.set(requestId, { url: response.url, encodedDataLength: response.encodedDataLength ?? 0 });
      } else if (m.method === "Network.loadingFinished") {
        const f = netFrames.get(m.params.requestId);
        if (f) f.encodedDataLength = m.params.encodedDataLength ?? f.encodedDataLength;
      }
    });
    await cdp.call("Page.addScriptToEvaluateOnNewDocument", { source: PAGE_RECORDER });
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });

    // 冷窗：头片渲染（feed.json 被闸延迟 FEED_DELAY_MS，此时不可能到货）
    const cards0 = await poll(cdp, `return document.querySelectorAll('.feed-col > .card').length`, {
      until: (v) => v >= 4,
      interval: 50,
      timeout: 15000,
    });
    const net0 = await cdp.eval(`return window.__net`);
    const headRepos = head.map((c) => String(c.repo).toLowerCase());

    // H1 冷启动首屏=头片：网络首条 data 响应=头片（feed.json 尚未完成）；首卡早于全量
    const headFirst = net0.headDoneAt !== null && net0.feedDoneAt === null;
    report(
      "H1 冷启动首屏=头片（头片响应先完成、首卡先于全量渲染）",
      !!cards0.value && headFirst,
      `cards=${cards0.value} headDone=${net0.headDoneAt}ms feedDone=${net0.feedDoneAt}ms`,
    );

    // H1b 关键路径数据字节 ≤110KB 级（冷窗内数据传输=头片一份；wire 字节读 Network 域）
    let headWire = 0;
    for (const [, f] of netFrames) {
      if (/data\/feed-head\.json$/.test(f.url)) headWire += f.encodedDataLength || 0;
    }
    report(
      "H1b 冷窗数据字节 ≤110KB 级（对照现状 feed.json 1.2MB gzip）",
      headFirst && headWire > 0 && headWire <= HEAD_GZIP_BUDGET,
      `head wire 传输 ${headWire}B / 预算 ${HEAD_GZIP_BUDGET}B`,
    );

    // H2 头片序=会话序：DOM 是**列优先**容器（i%K 入列，buildColumnIndex 同构）——
    // 按每列实际卡序把渲染窗解码回会话序，再与头片文件序前缀逐位比对。
    const captureColumns = `return Array.from(document.querySelectorAll('.feed-col'))
      .map(col => Array.from(col.querySelectorAll('.card')).map(c => c.getAttribute('data-repo')))`;
    const decodeFlat = (columns) => {
      const k = Math.max(1, columns.length);
      const rows = Math.max(0, ...columns.map((c) => c.length));
      const flat = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < k; c++) {
          const repo = columns[c]?.[r];
          if (repo) flat.push(repo);
        }
      }
      return flat;
    };
    const cols0 = await cdp.eval(captureColumns);
    const flat0 = decodeFlat(cols0);
    const lower = (s) => s.toLowerCase();
    const prefixLen = Math.min(flat0.length, headRepos.length);
    let orderOk = prefixLen > 0;
    let firstMismatch = -1;
    for (let i = 0; i < prefixLen; i++) {
      if (lower(flat0[i]) !== headRepos[i]) {
        orderOk = false;
        firstMismatch = i;
        break;
      }
    }
    report(
      "H2 头片序=会话序（冷窗解码回会话序 = 头片文件序前缀，逐位一致）",
      orderOk,
      `cols=${cols0.length} 比对 ${prefixLen} 张${firstMismatch >= 0 ? `，首位失配 @${firstMismatch}（DOM=${flat0[firstMismatch]} 头片=${headRepos[firstMismatch]}）` : ""}`,
    );

    // H5 冷窗不渲染残缺序：搜索 tab 输入查询 → 加载态（不是假空态/「没搜到」）
    await cdp.eval(
      `(() => {
        const tabs = Array.from(document.querySelectorAll('.tabs .tab'));
        const t = tabs.find(b => b.textContent.includes('搜索'));
        if (t) t.click();
        return 1;
      })()`,
    );
    await poll(cdp, `return !!document.querySelector('input.search-input')`, {
      until: (v) => v === true,
      interval: 50,
      timeout: 10000,
    });
    await cdp.eval(
      `(() => {
        const input = document.querySelector('input.search-input');
        const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        set.call(input, 'react');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        return 1;
      })()`,
    );
    await new Promise((r) => setTimeout(r, 300));
    const coldSearch = await cdp.eval(
      `return { loading: !!document.querySelector('.status .spinner'),
                 noResult: (document.body.textContent || '').includes('没搜到'),
                 cards: document.querySelectorAll('.feed-col > .card').length }`,
    );
    report(
      "H5 冷窗搜索=加载态（不渲染残缺序、不出假「没搜到」）",
      coldSearch.loading === true && coldSearch.noResult === false && coldSearch.cards === 0,
      JSON.stringify(coldSearch),
    );

    // 回首页信息流，等冷窗稳定后开始逐帧采样（覆盖全量到货前后整段）
    await cdp.eval(
      `(() => {
        const tabs = Array.from(document.querySelectorAll('.tabs .tab'));
        const t = tabs.find(b => b.textContent.includes('首页'));
        if (t) t.click();
        return 1;
      })()`,
    );
    await poll(cdp, `return document.querySelectorAll('.feed-col > .card').length`, {
      until: (v) => v >= 4,
      interval: 50,
      timeout: 10000,
    });
    const preFrames = await cdp.eval(
      `return { repos: Array.from(document.querySelectorAll('.feed-col > .card')).map(c => c.getAttribute('data-repo')),
                 count: (document.querySelector('.ch-count') || { textContent: '' }).textContent }`,
    );
    await cdp.eval(`window.__startSampling(); return 1;`);

    // 等全量到货（feed.json 延迟 FEED_DELAY_MS + 解析/冻结序安装）
    const full = await poll(cdp, `return window.__net.feedDoneAt`, {
      until: (v) => typeof v === "number" && v > 0,
      interval: 100,
      timeout: FEED_DELAY_MS + 20000,
    });
    await new Promise((r) => setTimeout(r, 2500)); // 到货落定（冻结序安装+渲染+字体/头像已稳）
    await cdp.eval(`window.__sampling = false; return 1;`);

    // H3 逐帧零重排（硬不变量）：单一视口指纹必须**横跨到货时刻**（到货前 1s 起 → 结束
    // 同一指纹）——即全量到货对视口内容零位移；冷窗早期测量落定允许（在到货前 1s 之前）。
    const frames = (await cdp.eval(`return window.__frames`)) || [];
    const feedDoneAt = full.value ?? 0;
    const tail = frames.filter((f) => f.t >= feedDoneAt - 1000 && f.fp !== "");
    const byFp = new Map();
    for (const f of tail) {
      if (!byFp.has(f.fp)) byFp.set(f.fp, { first: f.t, last: f.t, n: 0 });
      const e = byFp.get(f.fp);
      e.last = f.t;
      e.n++;
    }
    const distinct = [...byFp.entries()].sort((a, b) => a[1].first - b[1].first);
    const lastFp = frames.length ? frames[frames.length - 1].fp : "";
    const spanning =
      distinct.length === 1 &&
      distinct[0][0] === lastFp &&
      distinct[0][1].first <= feedDoneAt - 100 &&
      distinct[0][1].last >= feedDoneAt + 500;
    const framesOk = frames.length >= 10 && spanning;
    const diag = distinct
      .map(([fp, e], i) => `fp${i}:${e.first}-${e.last}ms×${e.n}(${fp.slice(0, 60)}…)`)
      .join(" | ");
    report(
      "H3 全量到货零已渲染区重排（逐帧视口指纹横跨到货时刻不变，硬不变量）",
      framesOk,
      `采样 ${frames.length} 帧 / 到货@${feedDoneAt}ms / 横跨=${spanning}｜${diag}`,
    );

    // H4 append-only：解码回会话序后「冷窗序 是 到货序的逐位前缀」＋张数增长＋渲染窗零重复
    const post = await cdp.eval(
      `return { cols: Array.from(document.querySelectorAll('.feed-col'))
                 .map(col => Array.from(col.querySelectorAll('.card')).map(c => c.getAttribute('data-repo'))),
                 count: (document.querySelector('.ch-count') || { textContent: '' }).textContent }`,
    );
    const flatPost = decodeFlat(post.cols);
    const preCount = Number((preFrames.count.match(/共 (\d+) 张/) || [])[1] ?? 0);
    const postCount = Number((post.count.match(/共 (\d+) 张/) || [])[1] ?? 0);
    const prefixOk =
      flat0.length > 0 && flatPost.length >= flat0.length && flat0.every((r, i) => lower(r) === lower(flatPost[i]));
    const allRepos = post.cols.flat();
    const noDup = new Set(allRepos.map(lower)).size === allRepos.length;
    report(
      "H4 尾部 append-only（冷窗会话序=到货序逐位前缀＋张数增长＋渲染窗零重复）",
      prefixOk && postCount > preCount && preCount > 0 && noDup,
      `首窗 ${flat0.length}→${flatPost.length} 张前缀保持=${prefixOk}｜共 ${preCount}→${postCount} 张｜重复=${!noDup}`,
    );
  } finally {
    chrome.kill();
    server.close();
  }

  fs.writeFileSync(
    path.join(OUT, `head-freeze_${new Date().toISOString().replace(/[:.]/g, "-")}.json`),
    JSON.stringify({ at: new Date().toISOString(), results: RESULTS }, null, 2),
  );
  const failed = RESULTS.filter((r) => !r.ok);
  console.log(`\n=== 汇总 ===\n断言 ${RESULTS.length} 项｜FAIL ${failed.length} 项`);
  console.log(failed.length === 0 ? "=== 冻结式头片判据全 PASS ===" : "=== 存在 FAIL ===");
  process.exit(failed.length === 0 ? 0 : 1);
}

void main();
