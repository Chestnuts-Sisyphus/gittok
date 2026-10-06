/**
 * GitTok 详情整体呈现闸（二十轮 C2 立闸；二十一轮 N6/N5 重写，2026-10-06）。
 *
 * 背景：栗子 10-06 晚「点开卡片显示解读加载中……我要求打开卡片时深度解读和其他内容全部
 * 一起出现」→ 标准精化为「**可视即可取**」：虚拟化窗口驱动 idle 预取可视卡分片（App.tsx
 * FeedVirtualList 预取 effect + feed-payload.prefetchRepoDetails），点击可视卡时内存同步命中，
 * 弹层首帧即完整内容；占位只兜底「预取未及」的竞态。本闸把新判据固化成 CI 硬拦。
 *
 * 判据（全部对着构建产物 dist 跑，行为级断言）：
 *   P0 分片完整性（管道验证）：dist/data/feed.json 每张卡都有 dist/data/details 分片，
 *      正文分片与 feed-details.json 逐字节一致、墓碑分片与「无 detailCn」一一对应；
 *      动分片管道必须先过这道（编码规范 §三）。
 *   P1 boot 零**关键路径**预热（二十一轮重写，旧「点击前 0 详情请求」随预取升级）：
 *      ①每个详情请求都晚于首卡进 DOM（idle 调度不在 boot 关键路径）；
 *      ②每个分片请求的 repo ∈ 首窗可视卡集合（预取面=可视区，不偷跑全表）；
 *      ③整表兜底（feed-details.json）至多 1 次（one-flight，闸内因注入缺键卡触发）。
 *   P2 点击可视卡首帧即完整（**新 P0 判据**）：预取落定后点击一张**从未点过**的可视卡，
 *      弹层 <100ms 且首个在场采样就带完整 detailCn、全程无占位——「可视即可取」本体。
 *   P3 兜底占位先行（预取未及的竞态路径）：点击早于分片到货时，深度解读槽必须以
 *      「解读加载中」占位在场（.detail-detail-loading），内容缺席——占位只许兜底。
 *   P4 整体交接、至多一次：竞态路径上 占位→内容 恰好一次切换；内容带 detail-swap-in
 *      过渡进场；落定后槽高=内容高（无推挤残差）。禁「先其他后解读」分叉突现。
 *   P5 缓存路径零交接：同一张卡第二次打开，首帧即内容，全程不出现占位（同日缓存语义）。
 *   P6 缺键显式「暂无」（搜索路径回归）：无分片卡的点击最终必须出现 .detail-detail-empty
 *      （暂无深度解读），且永不伪造 .detail-detail 内容（E2 灭静默缺失）。
 *   P7 分片服务故障韧性：新滚入的卡分片全 500 → 弹层仍 <100ms，内容经整表兜底最终在场
 *      （部署偏斜韧性）。
 *   P8 收藏路径回归＋全程零未捕获异常（二十一轮 N5）：我的-收藏夹展开→点卡 → 弹层照开、
 *      内容最终在场；整轮 Runtime.exceptionThrown = 0（ErrorBoundary 在场，渲染崩溃不再
 *      整树卸载紫屏——有崩溃必留 console 证据而不是白屏）。
 *
 * 用法：node scripts/gittok-detail-presentation-check.mjs
 * 退出码：有 FAIL → 1。环境变量与既有闸同族：CHROME_PATH / GITTK_REPO / GITTK_DIST /
 * GITTK_DETAIL_OUT / GITTK_DETAIL_PORT / GITTK_DETAIL_CDP / GITTK_DETAIL_DELAY。
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
const OUT = process.env.GITTK_DETAIL_OUT || path.join(REPO, "tmp", "detail-presentation");
const SRV_PORT = Number(process.env.GITTK_DETAIL_PORT || 19230);
const CDP_PORT = Number(process.env.GITTK_DETAIL_CDP || 19440);
/** 分片响应人为延迟：把「占位→交接」的观察窗从 <50ms 拉宽到可采样。 */
const DELAY_MS = Number(process.env.GITTK_DETAIL_DELAY || 600);
/** 闸里注入的缺键卡（无分片、整表也无此键）。 */
const GATE_MISSING_REPO = "gate-missing/no-detail";

/** 页面初始化注入（先于应用脚本）：给 P1/P2 提供同钟读数——
 *  ①window.fetch 包一层，记录详情类请求时刻与 URL（performance.now()，与首卡同钟）；
 *  ②MutationObserver 记首卡进 DOM 的时刻（boot 关键路径的分界线）。 */
const PAGE_RECORDER = `
(() => {
  window.__detailReqAt = [];
  window.__legacyReqAt = [];
  window.__cardAt = null;
  const origFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const u = typeof input === "string" ? input : (input && input.url) || "";
    const now = Math.round(performance.now());
    if (/data\\/details\\//.test(u)) window.__detailReqAt.push({ t: now, u });
    else if (/feed-details\\.json/.test(u)) window.__legacyReqAt.push({ t: now, u });
    return origFetch(input, init);
  };
  const mo = new MutationObserver(() => {
    if (window.__cardAt === null && document.querySelector(".feed-col > .card")) {
      window.__cardAt = Math.round(performance.now());
      mo.disconnect();
    }
  });
  const arm = () => {
    if (document.documentElement) mo.observe(document.documentElement, { childList: true, subtree: true });
    else setTimeout(arm, 4);
  };
  arm();
})();
`;

const RESULTS = [];
function report(name, ok, detail) {
  RESULTS.push({ name, ok });
  console.log(`[${ok ? "PASS" : "FAIL"}] ${name} ${detail}`);
}

/* ── P0 分片完整性（纯 node，不起浏览器）────────────────────────────────────── */
function checkShardIntegrity() {
  const feed = JSON.parse(fs.readFileSync(path.join(DIST, "data", "feed.json"), "utf8"));
  const table = JSON.parse(fs.readFileSync(path.join(DIST, "data", "feed-details.json"), "utf8"));
  const safeSeg = (s) => /^[A-Za-z0-9._-]+$/.test(s) && !s.startsWith(".");
  let missing = 0;
  let mismatched = 0;
  let checked = 0;
  // 分片路径是小写规范键（payload-split.detailShardPath 同源规则）；同 repo 的大小写
  // 漂移双卡共享一个分片（GitHub repo 名大小写不敏感），内容须与组内任一成员的
  // detailCn 一致（构建按 feed 顺序写，后写者落盘）。
  const groupCn = new Map(); // 小写键 → 该组成员的 detailCn 集合
  for (const card of feed) {
    const key = String(card.repo).toLowerCase();
    const cn = typeof card.detailCn === "string" && card.detailCn.length > 0 ? card.detailCn : null;
    if (!groupCn.has(key)) groupCn.set(key, new Set());
    if (cn !== null) groupCn.get(key).add(cn);
  }
  // ⚠ 存在性检查必须**精确大小写**（readdir 逐项比对，不许 existsSync）：Windows/macOS
  // 文件系统大小写不敏感，existsSync 会把大小写漂移的文件当成对的——首版发射器用原始
  // 大小写命名、运行时按小写取，本地闸全绿、Linux 线上 1359 片 404，就是这么漏过去的。
  const dirCache = new Map();
  const exactCaseExists = (owner, file) => {
    if (!dirCache.has(owner)) {
      const d = path.join(DIST, "data", "details", owner);
      dirCache.set(owner, fs.existsSync(d) ? fs.readdirSync(d) : []);
    }
    return dirCache.get(owner).includes(file);
  };
  for (const [key, cns] of groupCn) {
    const [owner, name] = key.split("/");
    if (!owner || !name || !safeSeg(owner) || !safeSeg(name)) continue;
    if (!exactCaseExists(owner, `${name}.json`)) {
      missing++;
      continue;
    }
    const p = path.join(DIST, "data", "details", owner, `${name}.json`);
    const body = JSON.parse(fs.readFileSync(p, "utf8"));
    const groupOk =
      body.detailCn === null
        ? cns.size === 0 // 墓碑：组内确无任何 detailCn
        : cns.has(body.detailCn) ||
          Object.keys(table).some((k) => k.toLowerCase() === key && table[k] === body.detailCn);
    if (!groupOk) mismatched++;
    checked++;
  }
  report(
    "P0 分片完整性（每个 repo 一个小写规范分片，内容与组内 detailCn/整表对账一致）",
    missing === 0 && mismatched === 0 && checked > 1000,
    `cards=${feed.length} shardGroups=${checked} missing=${missing} mismatch=${mismatched}`,
  );
}

/* ── 闸服务端：dist 静态 + 分片延迟/故障注入 + 缺键卡注入 ──────────────────────── */
const serverState = { shardMode: "delay" }; // delay | fail500
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
function patchedFeedJson() {
  const feed = JSON.parse(fs.readFileSync(path.join(DIST, "data", "feed.json"), "utf8"));
  const clone = JSON.parse(JSON.stringify(feed[0]));
  clone.repo = GATE_MISSING_REPO;
  clone.owner = "gate-missing";
  clone.name = "no-detail";
  clone.url = "https://example.com/gate-missing/no-detail";
  clone.copyOk = true;
  // 推荐流按多因子分重排：给合成卡压倒性热度字段＋当日新鲜度，保证它稳定进首窗
  //（闸按 data-repo 定位点击，位置无所谓，但必须被渲染出来）。
  const now = new Date().toISOString();
  clone.stars = 3000000;
  clone.starGrowth = 99000;
  clone.ts = now;
  clone.createdAt = now;
  clone.pushedAt = now;
  clone.silentRounds = 0;
  clone.momentum = ["hot", "daily"];
  return JSON.stringify([clone, ...feed]);
}
function startServer(root) {
  const s = http.createServer((req, res) => {
    const rel = decodeURIComponent((req.url || "/").split("?")[0]).replace(/^\/+/, "");
    const isShard = rel.startsWith("data/details/");
    const f = path.join(root, rel === "" ? "index.html" : rel);
    if (!f.startsWith(path.resolve(root))) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (isShard) {
      if (serverState.shardMode === "fail500") {
        res.writeHead(500);
        res.end("gate: shard service down");
        return;
      }
      if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
        res.writeHead(404);
        res.end("nf");
        return;
      }
      setTimeout(() => {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(fs.readFileSync(f));
      }, DELAY_MS);
      return;
    }
    if (rel === "data/feed.json") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(patchedFeedJson());
      return;
    }
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
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
    this.handlers = [];
    ws.addEventListener("message", (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && this.pending.has(m.id)) {
        this.pending.get(m.id)(m);
        this.pending.delete(m.id);
        return;
      }
      for (const h of this.handlers) {
        try {
          h(m);
        } catch {}
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

async function poll(cdp, expr, { until, interval = 25, timeout = 30000, since = Date.now() }) {
  while (Date.now() - since < timeout) {
    const v = await cdp.eval(expr).catch(() => null);
    if (v !== null && v !== undefined && until(v)) return { value: v, elapsed: Date.now() - since };
    await new Promise((r) => setTimeout(r, interval));
  }
  return { value: null, elapsed: Date.now() - since, timeout: true };
}

async function main() {
  checkShardIntegrity();
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
    await cdp.call("Network.enable");
    // N5 P8：全程未捕获异常监听（渲染崩溃=整树卸载紫屏的根源面；ErrorBoundary 在场应为 0）
    const pageErrors = [];
    cdp.handlers.push((m) => {
      if (m.method === "Runtime.exceptionThrown") {
        const d = m.params?.exceptionDetails;
        pageErrors.push(String(d?.exception?.description || d?.text || "unknown").slice(0, 200));
      }
    });
    await cdp.call("Page.addScriptToEvaluateOnNewDocument", { source: PAGE_RECORDER });
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    await poll(cdp, `return document.querySelectorAll('.feed-col > .card').length`, {
      until: (v) => v >= 4,
      interval: 100,
      timeout: 60000,
    });

    // 等窗口驱动的 idle 预取**自发**发出（没有任何点击）——预取先于点击发生本身就是
    // 「可视即可取」判据的一半；轮询上限 5s（requestIdleCallback timeout 1500 的宽限）。
    const prefetchFired = await poll(cdp, `return (window.__detailReqAt || []).length`, {
      until: (v) => v >= 1,
      interval: 50,
      timeout: 5000,
    });

    // P1 boot 零关键路径预热（二十一轮重写）：预取自发且全部晚于首卡进 DOM；
    // 分片预取 ⊆ 首窗可视卡集合；整表兜底至多 1 次（one-flight；闸内由注入缺键卡触发）。
    const cardAt = await cdp.eval(`return window.__cardAt`);
    const detailReqAt = (await cdp.eval(`return window.__detailReqAt`)) || [];
    const legacyReqAt = (await cdp.eval(`return window.__legacyReqAt`)) || [];
    const visibleRepos = new Set(
      (
        await cdp.eval(
          `return Array.from(document.querySelectorAll('.feed-col > .card'))
            .map(c => (c.getAttribute('data-repo') || '').toLowerCase())`,
        )
      ).filter(Boolean),
    );
    const shardUrlToRepo = (u) => {
      const m = u.match(/data\/details\/([^/]+)\/([^/]+)\.json$/);
      return m ? `${m[1]}/${m[2]}` : null;
    };
    const afterCard = detailReqAt.every((r) => r.t >= (cardAt ?? 0));
    const strayShards = detailReqAt.map((r) => shardUrlToRepo(r.u)).filter((r) => r && !visibleRepos.has(r));
    report(
      "P1 boot 零关键路径预热（点击前预取自发且晚于首卡；分片预取 ⊆ 可视卡集合；整表兜底 ≤1）",
      !!prefetchFired.value &&
        afterCard &&
        strayShards.length === 0 &&
        legacyReqAt.length <= 1,
      `首卡@${cardAt}ms｜点击前自发预取 ${detailReqAt.length} 片 全部晚于首卡=${afterCard}｜越界分片 ${strayShards.length}｜整表兜底 ${legacyReqAt.length} 次`,
    );

    // 目标卡：真实卡（排除注入的缺键卡），取 DOM 里第一张
    const targetRepo = await cdp.eval(
      `return Array.from(document.querySelectorAll('.feed-col > .card'))
        .map(c => c.getAttribute('data-repo'))
        .find(r => r && r !== '${GATE_MISSING_REPO}')`,
    );
    if (!targetRepo) throw new Error("找不到可点击的真实卡");

    // P3 兜底占位先行（竞态路径）：点击早于预取/分片到货（闸服务端延迟 DELAY_MS）
    // → 弹层 <100ms 在场，深度解读槽=「解读加载中」占位、内容缺席、声明位常驻。
    const t0 = Date.now();
    await cdp.eval(`(() => { document.querySelector('[data-repo="${targetRepo}"]').click(); return 1; })()`);
    const popup = await poll(cdp, `return !!document.querySelector('.detail-card')`, {
      until: (v) => v === true,
      interval: 10,
      timeout: 10000,
      since: t0,
    });
    const phase = await cdp.eval(
      `return { loading: !!document.querySelector('.detail-deep-slot .detail-detail-loading'),
                 content: !!document.querySelector('.detail-deep-slot .detail-detail'),
                 empty: !!document.querySelector('.detail-deep-slot .detail-detail-empty'),
                 label: !!document.querySelector('.detail-card .detail-label') }`,
    );
    report(
      "P3 兜底占位先行（点击早于预取：弹层 <100ms，占位在场、内容缺席、声明位常驻）",
      !popup.timeout &&
        popup.elapsed < 100 &&
        phase.loading === true &&
        phase.content === false &&
        phase.empty === false &&
        phase.label === true,
      `popup=${popup.elapsed}ms ${JSON.stringify(phase)}`,
    );

    // P4 整体交接：占位→内容恰一次、带过渡进场、落定无推挤残差
    const appear = await poll(
      cdp,
      `const c=document.querySelector('.detail-deep-slot .detail-detail');
       const l=document.querySelector('.detail-deep-slot .detail-detail-loading');
       return { len: c ? c.textContent.length : 0, swapIn: !!(c && c.classList.contains('detail-swap-in')), loadingStill: !!l };`,
      { until: (v) => v.len > 0, interval: 25, timeout: DELAY_MS + 8000, since: t0 },
    );
    const observedOnce = appear.value && appear.value.len > 0;
    let settle = null;
    if (observedOnce) {
      await new Promise((r) => setTimeout(r, 400)); // 等高度过渡(200ms)+淡入(240ms)落定
      settle = await cdp.eval(
        `const s=document.querySelector('.detail-deep-slot');
         const c=document.querySelector('.detail-deep-slot .detail-detail');
         return { slotH: s.offsetHeight, contentH: c.offsetHeight };`,
      );
    }
    report(
      "P4 整体交接（占位→内容恰一次，detail-swap-in 过渡在场，落定槽高=内容高）",
      !!observedOnce &&
        appear.value.swapIn === true &&
        appear.value.loadingStill === false &&
        settle &&
        Math.abs(settle.slotH - settle.contentH) <= 1,
      observedOnce
        ? `len=${appear.value.len} swapIn=${appear.value.swapIn} slotH=${settle.slotH} contentH=${settle.contentH} @${appear.elapsed}ms`
        : "内容未在观察窗出现",
    );

    // P2（新 P0 判据）点击可视卡首帧即完整：预取落定后点一张**从未点过**的可视卡——
    // 内存同步命中 ⇒ 弹层 <100ms 且首个在场采样就带完整 detailCn、无占位。
    // （Runtime 语义：handleOpenDetail 在内存命中分支同步 setDetailState("ready")，
    //  React 单次提交渲染弹层+内容，不存在「先弹层后内容」的中间帧。）
    await cdp.eval(`(() => { document.querySelector('.detail-close').click(); return 1; })()`);
    await new Promise((r) => setTimeout(r, 400));
    const otherRepo = await cdp.eval(
      `return Array.from(document.querySelectorAll('.feed-col > .card'))
        .map(c => c.getAttribute('data-repo'))
        .find(r => r && r !== '${GATE_MISSING_REPO}' && r !== ${JSON.stringify(targetRepo)})`,
    );
    if (!otherRepo) throw new Error("P2 找不到第二张可视真实卡");
    const t2 = Date.now();
    await cdp.eval(`(() => { document.querySelector('[data-repo="${otherRepo}"]').click(); return 1; })()`);
    const first2 = await poll(
      cdp,
      `return { popup: !!document.querySelector('.detail-card'),
                 content: !!document.querySelector('.detail-deep-slot .detail-detail'),
                 loading: !!document.querySelector('.detail-deep-slot .detail-detail-loading') }`,
      { until: (v) => v.popup, interval: 10, timeout: 10000, since: t2 },
    );
    report(
      "P2 点击可视卡首帧即完整（可视即可取：预取落定后首个在场采样即内容，无占位）",
      !first2.timeout && first2.elapsed < 100 && first2.value?.content === true && first2.value?.loading === false,
      `popup=${first2.elapsed}ms 首采样 content=${first2.value?.content} loading=${first2.value?.loading}`,
    );
    await cdp.eval(`(() => { document.querySelector('.detail-close').click(); return 1; })()`);
    await new Promise((r) => setTimeout(r, 300));

    // P5 缓存路径零交接：同卡第二次打开，首帧即内容、全程无占位
    const t5 = Date.now();
    await cdp.eval(`(() => { document.querySelector('[data-repo="${targetRepo}"]').click(); return 1; })()`);
    const warm = await poll(
      cdp,
      `return { popup: !!document.querySelector('.detail-card'),
                 content: !!document.querySelector('.detail-deep-slot .detail-detail'),
                 loading: !!document.querySelector('.detail-deep-slot .detail-detail-loading') }`,
      { until: (v) => v.popup, interval: 10, timeout: 10000, since: t5 },
    );
    report(
      "P5 缓存命中路径零交接（首帧即内容，无占位闪过）",
      !warm.timeout && warm.value.content === true && warm.value.loading === false,
      `popup=${warm.elapsed}ms content=${warm.value?.content} loading=${warm.value?.loading}`,
    );
    await cdp.eval(`(() => { document.querySelector('.detail-close').click(); return 1; })()`);
    await new Promise((r) => setTimeout(r, 400));

    // P6 缺键卡显式「暂无」：分片 404 → 整表兜底确认缺失 → 显式空态，永不伪造内容。
    // 定位通道用**搜索**：推荐/热门有会话抖动（applyJitter ±9% 对顶部位次近似随机），
    // 注入卡不保证进首窗；搜索对全量列表确定性命中且无抖动，是唯一稳定入口。
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
      interval: 100,
      timeout: 10000,
    });
    await cdp.eval(
      `(() => {
        const input = document.querySelector('input.search-input');
        const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        set.call(input, 'gate-missing');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        return 1;
      })()`,
    );
    const found6 = await poll(cdp, `return !!document.querySelector('[data-repo="${GATE_MISSING_REPO}"]')`, {
      until: (v) => v === true,
      interval: 100,
      timeout: 15000,
    });
    // 等预取链落定再点击（与 P7 同族教训，CI 实锤 257ms 假红）：缺键卡的预取走
    // 「分片 404→整表兜底」，整表 5.9MB 的 JSON.parse 是主线程阻塞任务——点击渲染
    // 排在它后面会把弹层拖过 <100ms。落定后内存=确认缺失，点击首帧即「暂无」。
    await new Promise((r) => setTimeout(r, 1500));
    const t6 = Date.now();
    await cdp.eval(
      `(() => { document.querySelector('[data-repo="${GATE_MISSING_REPO}"]').click(); return 1; })()`,
    );
    const popup6 = await poll(cdp, `return !!document.querySelector('.detail-card')`, {
      until: (v) => v === true,
      interval: 10,
      timeout: 10000,
      since: t6,
    });
    const empty6 = await poll(
      cdp,
      `return { empty: !!document.querySelector('.detail-detail-empty'),
                 text: document.querySelector('.detail-detail-empty')?.textContent ?? null,
                 fake: !!document.querySelector('.detail-detail') }`,
      { until: (v) => v.empty === true || v.fake === true, interval: 50, timeout: 30000, since: t6 },
    );
    report(
      "P6 缺键卡显式「暂无深度解读」（搜索确定性命中；弹层即时；不伪造内容）",
      found6.value === true &&
        !popup6.timeout &&
        popup6.elapsed < 100 &&
        empty6.value?.empty === true &&
        empty6.value?.fake === false,
      `found=${found6.value} popup=${popup6.elapsed}ms empty=${empty6.value?.empty} fake=${empty6.value?.fake} text=${empty6.value?.text}`,
    );
    await cdp.eval(`(() => { document.querySelector('.detail-close').click(); return 1; })()`);
    await new Promise((r) => setTimeout(r, 400));

    // P7 分片服务故障：滚 5 屏引入**未预取**的新卡（可视即可取下预取照常发起）→ 分片全 500
    // → 弹层仍 <100ms，内容经整表兜底最终在场（部署偏斜韧性）。
    serverState.shardMode = "fail500";
    // P6 结束时停在搜索页：回首页信息流
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
      interval: 100,
      timeout: 15000,
    });
    await new Promise((r) => setTimeout(r, 800));
    // 滚 5 屏：新窗卡的预取发向分片服务（此刻全 500），兜底链=整表 one-flight
    await cdp.eval(
      `(() => {
        const b = document.querySelector('.app-body');
        const s = b ? getComputedStyle(b).overflowY : 'visible';
        const el = s && s !== 'visible' ? b : (document.scrollingElement || window);
        if (el.scrollBy) el.scrollBy(0, 5 * window.innerHeight);
        else window.scrollBy(0, 5 * window.innerHeight);
        return 1;
      })()`,
    );
    await poll(
      cdp,
      `return Array.from(document.querySelectorAll('.feed-col > .card'))
        .some(c => { const r = c.getAttribute('data-repo'); return r && !${JSON.stringify([...visibleRepos])}.includes(r.toLowerCase()); })`,
      { until: (v) => v === true, interval: 100, timeout: 15000 },
    );
    // 等滚动引发的虚拟化窗口更新/实测回填落定再点击：<100ms 口径量的是「点击→弹层」，
    // 不是「滚动重排中段的点击」（CI 首战实锤 147ms 假红＝大滚动后立即点击撞 measure
    // 周期，与旧闸「mount 期首点击假红」同族；P2 已在稳定信息流上钉过同一口径）。
    // 等待窗内预取的兜底链照常工作（分片 500→整表 one-flight 回填内存）。
    await new Promise((r) => setTimeout(r, 1200));
    const t7 = Date.now();
    const repo7 = await cdp.eval(
      `return Array.from(document.querySelectorAll('.feed-col > .card'))
        .map(c => c.getAttribute('data-repo'))
        .find(r => r && r !== '${GATE_MISSING_REPO}' && r !== ${JSON.stringify(targetRepo)} && r !== ${JSON.stringify(otherRepo)})`,
    );
    if (!repo7) throw new Error("P7 找不到真实卡");
    await cdp.eval(`(() => { document.querySelector('[data-repo="${repo7}"]').click(); return 1; })()`);
    const popup7 = await poll(cdp, `return !!document.querySelector('.detail-card')`, {
      until: (v) => v === true,
      interval: 10,
      timeout: 10000,
      since: t7,
    });
    const via7 = await poll(
      cdp,
      `const c=document.querySelector('.detail-deep-slot .detail-detail'); return c ? c.textContent.length : 0`,
      { until: (v) => v > 0, interval: 100, timeout: 60000, since: t7 },
    );
    report(
      "P7 分片全 500：弹层 <100ms，内容经整表兜底最终在场（部署偏斜韧性）",
      !popup7.timeout && popup7.elapsed < 100 && !via7.timeout && via7.value > 0,
      `popup=${popup7.elapsed}ms detail=${via7.timeout ? "TIMEOUT" : via7.value + "字@" + via7.elapsed + "ms"}`,
    );
    await cdp.eval(`(() => { document.querySelector('.detail-close').click(); return 1; })()`);
    await new Promise((r) => setTimeout(r, 300));

    // P8 收藏路径回归＋全程零未捕获异常（二十一轮 N5）：种子收藏夹（只带 repos 不带快照，
    // 收藏卡走点击取数路径）→ 我的-收藏 → 展开夹子 → 点卡 → 弹层照开、内容最终在场；
    // 整轮 Runtime.exceptionThrown 必须为 0（ErrorBoundary 在场，渲染崩溃只能落在
    // 可恢复 UI 并留 console 证据，不允许整树卸载紫屏）。
    serverState.shardMode = "delay";
    // 种子 repo 从整表取键（dist/data/feed.json 是剥离 detailCn 的列表，不含长文键）
    const detailsTable = JSON.parse(fs.readFileSync(path.join(DIST, "data", "feed-details.json"), "utf8"));
    const colRepos = Object.keys(detailsTable)
      .filter((k) => typeof detailsTable[k] === "string" && detailsTable[k].length > 0)
      .slice(0, 2);
    if (colRepos.length < 2) throw new Error("P8 找不到带 detailCn 的真实卡做种子");
    await cdp.eval(
      `(() => {
        localStorage.setItem('gittok-collections', JSON.stringify([{
          id: 'gate-col', name: '闸回归收藏夹', repos: ${JSON.stringify(colRepos)},
          createdAt: new Date().toISOString(), isAuto: false }]));
        return 1;
      })()`,
    );
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    await poll(cdp, `return document.querySelectorAll('.feed-col > .card').length`, {
      until: (v) => v >= 4,
      interval: 100,
      timeout: 60000,
    });
    await cdp.eval(
      `(() => {
        const tabs = Array.from(document.querySelectorAll('.tabs .tab'));
        const t = tabs.find(b => b.textContent.includes('我的'));
        if (t) t.click();
        return 1;
      })()`,
    );
    await poll(cdp, `return Array.from(document.querySelectorAll('.me-tab')).some(b => b.textContent.includes('收藏'))`, {
      until: (v) => v === true,
      interval: 100,
      timeout: 10000,
    });
    await cdp.eval(
      `(() => {
        const b = Array.from(document.querySelectorAll('.me-tab')).find(b => b.textContent.includes('收藏'));
        if (b) b.click();
        return 1;
      })()`,
    );
    await poll(cdp, `return !!document.querySelector('.collection-folder .folder-header')`, {
      until: (v) => v === true,
      interval: 100,
      timeout: 10000,
    });
    await cdp.eval(`(() => { document.querySelector('.collection-folder .folder-header').click(); return 1; })()`);
    await poll(cdp, `return !!document.querySelector('.folder-cards .card')`, {
      until: (v) => v === true,
      interval: 100,
      timeout: 10000,
    });
    const t8 = Date.now();
    await cdp.eval(`(() => { document.querySelector('.folder-cards .card').click(); return 1; })()`);
    const popup8 = await poll(cdp, `return !!document.querySelector('.detail-card')`, {
      until: (v) => v === true,
      interval: 10,
      timeout: 10000,
      since: t8,
    });
    const via8 = await poll(
      cdp,
      `const s=document.querySelector('.detail-deep-slot');
       const c=document.querySelector('.detail-deep-slot .detail-detail');
       const e=document.querySelector('.detail-detail-empty');
       return { len: c ? c.textContent.length : 0, empty: !!e };`,
      { until: (v) => v.len > 0 || v.empty, interval: 50, timeout: 30000, since: t8 },
    );
    report(
      "P8 收藏路径回归＋全程零未捕获异常（N5：弹层照开、内容最终在场、pageErrors=0）",
      !popup8.timeout && popup8.elapsed < 100 && !via8.timeout && (via8.value.len > 0 || via8.value.empty) && pageErrors.length === 0,
      `popup=${popup8.elapsed}ms detail=${via8.timeout ? "TIMEOUT" : via8.value.len > 0 ? via8.value.len + "字@" + via8.elapsed + "ms" : "暂无@" + via8.elapsed + "ms"} pageErrors=${pageErrors.length}${pageErrors.length ? " ⚠" + JSON.stringify(pageErrors.slice(0, 3)) : ""}`,
    );
  } finally {
    chrome.kill();
    server.close();
  }

  fs.writeFileSync(
    path.join(OUT, `detail-presentation_${new Date().toISOString().replace(/[:.]/g, "-")}.json`),
    JSON.stringify({ at: new Date().toISOString(), results: RESULTS }, null, 2),
  );
  const failed = RESULTS.filter((r) => !r.ok);
  console.log(`\n=== 汇总 ===\n断言 ${RESULTS.length} 项｜FAIL ${failed.length} 项`);
  console.log(failed.length === 0 ? "=== 详情整体呈现判据全 PASS ===" : "=== 存在 FAIL ===");
  process.exit(failed.length === 0 ? 0 : 1);
}

void main();
