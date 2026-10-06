/**
 * GitTok 详情整体呈现闸（二十轮 C2「把偏好变成闸」，2026-10-06）。
 *
 * 背景：栗子 10-06「打开卡片先加载出来其他东西，然后深度解读才闪现……卡片的详情内容
 * 应该作为一个整体展现」。旧实现 detailCn 到位后区块从无到有插入（补渲无交接）；缺键卡
 * 连占位都没有（E2 静默缺失）。二十轮落码＝占位＋整体交接（App.tsx handleOpenDetail /
 * FeedCard.tsx DeepReadSlot），本闸把「整体呈现」判据固化成 CI 硬拦，同类一劳永逸。
 *
 * 判据（全部对着构建产物 dist 跑，行为级断言）：
 *   P0 分片完整性（管道验证）：dist/data/feed.json 每张卡都有 dist/data/details 分片，
 *      正文分片与 feed-details.json 逐字节一致、墓碑分片与「无 detailCn」一一对应；
 *      动分片管道必须先过这道（编码规范 §三）。
 *   P1 boot 零详情预热：页面加载到首次点击之间，0 个 data/details|feed-details 请求
 *      （十二轮 T3「按需详情」不许回退）。
 *   P2 响应性不回退（五轮 T1）：点击→.detail-card 在场 <100ms。
 *   P3 占位先行：详情分片被闸服务端延迟（DELAY_MS）时，弹层打开后、分片到货前，
 *      深度解读槽必须以「解读加载中」占位在场（.detail-detail-loading），内容缺席。
 *   P4 整体交接、至多一次：观察窗内 占位→内容 恰好一次切换；内容带 detail-swap-in
 *      过渡进场；落定后槽高=内容高（无推挤残差）。禁「先其他后解读」分叉突现。
 *   P5 缓存路径零交接：同一张卡第二次打开，首帧即内容，全程不出现占位（同日缓存语义）。
 *   P6 缺键显式「暂无」：无分片卡的点击最终必须出现 .detail-detail-empty（暂无深度解读），
 *      且永不伪造 .detail-detail 内容（E2 灭静默缺失）。
 *   P7 弹层响应在分片服务故障时也不回退：分片全 500 → 弹层仍 <100ms，内容经整表
 *      兜底最终在场（部署偏斜韧性）。
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
  for (const [key, cns] of groupCn) {
    const [owner, name] = key.split("/");
    if (!owner || !name || !safeSeg(owner) || !safeSeg(name)) continue;
    const p = path.join(DIST, "data", "details", owner, `${name}.json`);
    if (!fs.existsSync(p)) {
      missing++;
      continue;
    }
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
    const detailReqs = [];
    cdp.handlers.push((m) => {
      if (m.method === "Network.requestWillBeSent") {
        const u = m.params?.request?.url || "";
        if (/data\/details\//.test(u) || /feed-details\.json/.test(u)) detailReqs.push(u.slice(-80));
      }
    });
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    await poll(cdp, `return document.querySelectorAll('.feed-col > .card').length`, {
      until: (v) => v >= 4,
      interval: 100,
      timeout: 60000,
    });

    // P1 boot 零预热：从导航到此刻，详情类请求必须为 0
    report(
      "P1 boot 零详情预热（点击前无 details 请求）",
      detailReqs.length === 0,
      `实测 ${detailReqs.length} 个`,
    );

    // 目标卡：真实卡（排除注入的缺键卡），取 DOM 里第一张
    const targetRepo = await cdp.eval(
      `return Array.from(document.querySelectorAll('.feed-col > .card'))
        .map(c => c.getAttribute('data-repo'))
        .find(r => r && r !== '${GATE_MISSING_REPO}')`,
    );
    if (!targetRepo) throw new Error("找不到可点击的真实卡");

    // P2 响应性：点击→弹层在场 <100ms（分片延迟不影响弹层）
    const t0 = Date.now();
    await cdp.eval(`(() => { document.querySelector('[data-repo="${targetRepo}"]').click(); return 1; })()`);
    const popup = await poll(cdp, `return !!document.querySelector('.detail-card')`, {
      until: (v) => v === true,
      interval: 10,
      timeout: 10000,
      since: t0,
    });
    report(
      "P2 点击→弹层在场 <100ms（响应性不回退）",
      !popup.timeout && popup.elapsed < 100,
      `${popup.elapsed}ms`,
    );

    // P3 占位先行：分片延迟窗内，深度解读槽必须是「加载中」占位、内容缺席
    const phase = await cdp.eval(
      `return { loading: !!document.querySelector('.detail-deep-slot .detail-detail-loading'),
                 content: !!document.querySelector('.detail-deep-slot .detail-detail'),
                 empty: !!document.querySelector('.detail-deep-slot .detail-detail-empty'),
                 label: !!document.querySelector('.detail-card .detail-label') }`,
    );
    report(
      "P3 占位先行（延迟窗内：占位在场、内容缺席、槽与声明位常驻）",
      phase.loading === true && phase.content === false && phase.empty === false && phase.label === true,
      JSON.stringify(phase),
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

    // P5 缓存路径零交接：同卡第二次打开，首帧即内容、全程无占位
    await cdp.eval(`(() => { document.querySelector('.detail-close').click(); return 1; })()`);
    await new Promise((r) => setTimeout(r, 500));
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

    // P7 分片服务故障：弹层照开（<100ms），内容经整表兜底最终在场
    serverState.shardMode = "fail500";
    // P6 结束时停在搜索页：回首页信息流再选一张真实卡
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
    const t7 = Date.now();
    const repo7 = await cdp.eval(
      `return Array.from(document.querySelectorAll('.feed-col > .card'))
        .map(c => c.getAttribute('data-repo'))
        .find(r => r && r !== '${GATE_MISSING_REPO}' && r !== ${JSON.stringify(targetRepo)})`,
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
