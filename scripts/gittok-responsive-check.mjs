/**
 * GitTok 多档适配回归闸（G-16 / GATE-01+GATE-02）——**所有 RESP/A11Y 目标的验收底座**。
 *
 * 为什么需要它：改这个脚本之前，全站适配 **0 自动化覆盖**——`web/src/__tests__/` 是 node 环境纯逻辑断言，
 * 没有一条测试断言过 `@media`、`line-clamp`、溢出或换行；唯一的视觉验收 `accept_visual.py`
 * 固定 1400×900 一档，6 项断言全是审美 token，与尺寸无关。
 *
 * 做什么：用 CDP 起无头 Chrome（本机 GameViewer 虚拟显示器致 GPU 合成失效 → 一律 --disable-gpu，
 * 无窗口不抢焦点），逐档量「横向溢出 / 卡片被 overflow:hidden 吃掉的行 / 逐档实际可见字数
 * （CDP Range 逐字量）/ 侧栏与底栏命中档 / 弹层动作区溢出 / 触摸端按钮可见性 / Agent 页可达 / 整卡是否放得下」，
 * 每档出一张截图，结果同时落 JSON 供改前改后 diff。
 *
 * 用法（先建 dist 并灌真实数据）：
 *   cd D:/AI/QODER/1/os-feed/web && npm run build
 *   cp ../data/feed.json dist/data/feed.json && cp ../data/following.json dist/data/following.json
 *   node scripts/gittok-responsive-check.mjs          # 仓库内正身（pnpm responsive:check 亦走这条）
 *   node D:/AI/QODER/1/gittok_accept/gittok_responsive_check.mjs   # 任务书点名的外部入口壳
 *   node ... --only=390x844        # 只跑一档（调试）
 *   node ... --tag=before          # 结果文件名带标记，便于改前/改后对照
 *
 * 退出码：有 FAIL → 1；全 PASS → 0。
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** 仓库根：脚本本体住在 <repo>/scripts/ 下，故默认由自身位置推导（CI 里也成立）。 */
const HERE = path.dirname(fileURLToPath(import.meta.url));

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const REPO = process.env.GITTK_REPO || path.resolve(HERE, "..");
const DIST = process.env.GITTK_DIST || path.join(REPO, "web", "dist");
const SHOT_DIR = process.env.GITTK_SHOTS || path.join(REPO, "tmp", "responsive", "shots");
const DATA_DIR = process.env.GITTK_OUT || path.join(REPO, "tmp", "responsive");
const SRV_PORT = Number(process.env.GITTK_RESP_PORT || 19102);
const CDP_PORT = Number(process.env.GITTK_RESP_CDP || 19301);
const TAG = (() => {
  const a = process.argv.find((x) => x.startsWith("--tag="));
  return a ? a.slice(6) : new Date().toISOString().replace(/[:.]/g, "-");
})();
const ONLY = (() => {
  const a = process.argv.find((x) => x.startsWith("--only="));
  return a ? a.slice(7) : null;
})();

/** 七档视口：任务书点名的 5 档宽度 + 手机横屏 844×390 + G-11 点名的 667×375（窄高横屏）。
 *  每档出「首页 + 弹层 + 我的页」截图（核心 6 张首页截图即前六档）。 */
const VIEWS = [
  { key: "1920x1080", w: 1920, h: 1080, mobile: false },
  { key: "1400x900", w: 1400, h: 900, mobile: false },
  { key: "1000x800", w: 1000, h: 800, mobile: false },
  { key: "768x1024", w: 768, h: 1024, mobile: false },
  { key: "390x844", w: 390, h: 844, mobile: true },
  { key: "844x390", w: 844, h: 390, mobile: true },
  { key: "667x375", w: 667, h: 375, mobile: true },
];

/** 每档侧栏/底栏/tabs 的期望命中档（照 styles.css 现状：仅 480/768/900 三档宽度断点）。 */
function expectedChrome(w) {
  const mobile = w <= 768;
  return {
    sidebar: !mobile,
    bottomBar: mobile,
    tabs: !mobile,
  };
}

const RESULTS = [];
function report(view, name, ok, detail) {
  RESULTS.push({ view, name, ok, detail });
  console.log(`[${ok ? "PASS" : "FAIL"}] ${view} — ${name} ${detail}`);
}
function skip(view, name, detail) {
  RESULTS.push({ view, name, ok: null, detail });
  console.log(`[SKIP] ${view} — ${name} ${detail}`);
}

// ---------------------------------------------------------------------------
// 无窗口静态服务器（只读 dist，端口不抢 19101/5173/4173）
// ---------------------------------------------------------------------------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
function startServer(root) {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent((req.url || "/").split("?")[0]).replace(/^\/+/, "");
    const file = path.join(root, rel === "" ? "index.html" : rel);
    if (!file.startsWith(path.resolve(root)) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(fs.readFileSync(file));
  });
  server.listen(SRV_PORT, "127.0.0.1");
  return server;
}

// ---------------------------------------------------------------------------
// 极简 CDP 客户端（Node 24 内置 WebSocket，不引第三方依赖）
// ---------------------------------------------------------------------------
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.mid = 0;
    this.pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        this.pending.get(msg.id)(msg);
        this.pending.delete(msg.id);
      }
    });
  }
  static async connect(port) {
    let list;
    for (let i = 0; i < 60; i++) {
      try {
        list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
        if (list.some((t) => t.type === "page")) break;
      } catch {
        /* chrome 还没起来 */
      }
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
  call(method, params = {}) {
    const id = ++this.mid;
    return new Promise((resolve) => {
      this.pending.set(id, (msg) => resolve(msg.result ?? msg));
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const r = await this.call("Runtime.evaluate", {
      expression: `(() => { ${expression} })()`,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r?.exceptionDetails) {
      throw new Error("页面内异常：" + JSON.stringify(r.exceptionDetails?.exception?.message || ""));
    }
    return r?.result?.value;
  }
}

/** 注入页内的量测工具：可见字数（Range 逐字量）、溢出元素、卡片吃行。 */
const PAGE_TOOLS = `
window.__gt = {
  textNodes(el){
    const out=[]; const w=document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n; while((n=w.nextNode())) out.push(n); return out;
  },
  measure(sel, limit){
    const els=[...document.querySelectorAll(sel)];
    return els.slice(0, limit ?? 8).map((el)=>{
      const r=el.getBoundingClientRect();
      const range=document.createRange();
      let visible=0, total=0; const tops=new Set(), vtops=new Set();
      for(const node of window.__gt.textNodes(el)){
        const data=node.data;
        for(let i=0;i<data.length;i++){
          const ch=data[i];
          if(/\\s/.test(ch)) continue;
          range.setStart(node,i); range.setEnd(node,i+1);
          const rects=[...range.getClientRects()];
          if(!rects.length) continue;
          const q=rects[0];
          if(q.width<=0 && q.height<=0) continue;
          total++; tops.add(Math.round(q.top));
          const inside=q.top>=r.top-1 && q.bottom<=r.bottom+1 && q.left>=r.left-1 && q.right<=r.right+1;
          if(inside){ visible++; vtops.add(Math.round(q.top)); }
        }
      }
      const clampRaw=getComputedStyle(el).webkitLineClamp;
      const clamp=clampRaw && clampRaw!=='none' ? Number(clampRaw) : 0;
      return { total, visible, lines: tops.size, visibleLines: vtops.size, clamp,
               clipped: vtops.size < tops.size, width: Math.round(r.width), height: Math.round(r.height) };
    });
  },
  overflow(){
    const doc=document.scrollingElement||document.documentElement;
    const bad=[], truncated=[];
    for(const el of document.querySelectorAll('body *')){
      const cs=getComputedStyle(el);
      if(cs.position==='fixed'||cs.display==='none'||cs.visibility==='hidden') continue;
      if(el.scrollWidth<=el.clientWidth+1 || el.clientWidth<=0) continue;
      const sel=el.className? '.'+String(el.className).split(' ')[0] : el.tagName;
      const intentional = cs.textOverflow==='ellipsis' || (cs.webkitLineClamp && cs.webkitLineClamp!=='none');
      const rec={sel, sw:el.scrollWidth, cw:el.clientWidth};
      const bucket = intentional? truncated : bad;
      if(!bucket.some(x=>x.sel===sel)) bucket.push(rec);
    }
    bad.sort((a,b)=>(b.sw-b.cw)-(a.sw-a.cw));
    return { docScrollWidth: doc.scrollWidth, docClientWidth: doc.clientWidth,
             pageOverflow: doc.scrollWidth>doc.clientWidth+1, offenders: bad.slice(0,5),
             truncatedCount: truncated.length, truncated: truncated.slice(0,4) };
  },
  cardClip(){
    const cards=[...document.querySelectorAll('.card')].slice(0,8);
    const out=[];
    for(const c of cards){
      const cr=c.getBoundingClientRect();
      for(const kid of c.querySelectorAll('.card-body *')){
        const kr=kid.getBoundingClientRect();
        if(kr.height>0 && kr.bottom>cr.bottom+1){
          out.push({cls:String(kid.className).split(' ')[0], over: Math.round(kr.bottom-cr.bottom)});
          break;
        }
      }
    }
    return { checked: cards.length, clipped: out.slice(0,6), cardH: cards[0]? Math.round(cards[0].getBoundingClientRect().height):0 };
  },
  chrome(){
    const vis=(sel)=>{const e=document.querySelector(sel); if(!e) return null;
      const cs=getComputedStyle(e); return cs.display!=='none' && cs.visibility!=='hidden';};
    return { sidebar: vis('.sidebar'), bottomBar: vis('.bottom-bar'), tabs: vis('.tabs'),
             hoverNone: matchMedia('(hover: none)').matches, coarse: matchMedia('(pointer: coarse)').matches };
  },
  opacity(sel){ const e=document.querySelector(sel); if(!e) return null;
    const cs=getComputedStyle(e); const r=e.getBoundingClientRect();
    return { opacity: cs.opacity, visibility: cs.visibility, display: cs.display, w: Math.round(r.width), h: Math.round(r.height) }; },
  gridCols(sel){ const e=document.querySelector(sel); if(!e) return null;
    const cs=getComputedStyle(e);
    return { cols: cs.gridTemplateColumns.split(' ').filter(Boolean).length,
             sw: e.scrollWidth, cw: e.clientWidth }; },
  clickText(sel, text){
    const els=[...document.querySelectorAll(sel)];
    const el=text? els.find(e=>(e.textContent||'').includes(text)) : els[0];
    if(!el) return false;
    el.scrollIntoView({block:'center'}); el.click(); return true;
  },
};
`;

async function setView(cdp, view) {
  await cdp.call("Emulation.setDeviceMetricsOverride", {
    width: view.w,
    height: view.h,
    deviceScaleFactor: 1,
    mobile: view.mobile,
  });
  await cdp.call("Emulation.setTouchEmulationEnabled", {
    enabled: view.mobile,
    maxTouchPoints: view.mobile ? 5 : 0,
  });
  await cdp.call("Emulation.setEmitTouchEventsForMouse", {
    enabled: view.mobile,
    configuration: view.mobile ? "mobile" : "none",
  });
}

async function waitCards(cdp) {
  for (let i = 0; i < 40; i++) {
    const n = await cdp.eval(`return document.querySelectorAll('.card').length;`);
    if (n > 3) return n;
    await new Promise((r) => setTimeout(r, 400));
  }
  return 0;
}

function seedScript() {
  const collections = [
    { id: "gt-check", name: "测台收藏夹", repos: [], createdAt: new Date().toISOString(), isAuto: false },
  ];
  return `
    localStorage.setItem('gittok-collections', ${JSON.stringify(JSON.stringify(collections))});
    return true;
  `;
}

async function shot(cdp, name) {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  const r = await cdp.call("Page.captureScreenshot", { format: "png", fromSurface: true });
  if (r?.data) fs.writeFileSync(path.join(SHOT_DIR, name), Buffer.from(r.data, "base64"));
  return path.join(SHOT_DIR, name);
}

/** 单档全量检查。 */
async function checkView(cdp, view) {
  await setView(cdp, view);
  await new Promise((r) => setTimeout(r, 900));
  const n = await waitCards(cdp);
  if (n === 0) {
    report(view.key, "页面就绪", false, "一张卡都没渲染出来");
    return;
  }

  // 1 横向溢出
  const ov = await cdp.eval(`return window.__gt.overflow();`);
  report(
    view.key,
    "无横向溢出",
    !ov.pageOverflow,
    `doc ${ov.docScrollWidth}/${ov.docClientWidth}` +
      (ov.offenders.length
        ? `｜内部溢出 ${ov.offenders.map((o) => `${o.sel}(${o.sw}>${o.cw})`).join(" ")}`
        : "") +
      (ov.truncatedCount ? `｜另有 ${ov.truncatedCount} 类为 ellipsis/clamp 有意截断` : ""),
  );

  // 2 卡片不被 overflow:hidden 吃行
  const clip = await cdp.eval(`return window.__gt.cardClip();`);
  report(
    view.key,
    "卡片不被吃行",
    clip.clipped.length === 0,
    `查 ${clip.checked} 张 卡高 ${clip.cardH}px` +
      (clip.clipped.length ? `｜被裁：${clip.clipped.map((c) => `.${c.cls}+${c.over}px`).join(" ")}` : ""),
  );

  // 3 逐档实际可见字数
  const m = await cdp.eval(
    `return {s: window.__gt.measure('.summary', 12), r: window.__gt.measure('.reason-clamped', 12)};`,
  );
  const sVis = m.s.map((x) => x.visible);
  const sMin = Math.min(...sVis);
  const sClip = m.s.filter((x) => x.visible < x.total).length;
  report(
    view.key,
    ".summary 整句可见（20-35 字规格）",
    sClip === 0,
    `min 可见 ${sMin} 字（采样 ${m.s.length} 张，卡宽 ${m.s[0]?.width}px）｜掉字 ${sClip} 张`,
  );
  const eaten = m.r.filter((x) => x.clamp > 0 && x.visibleLines < x.clamp);
  const byDesign = m.r.filter((x) => x.clamp > 0 && x.visible < x.total).length;
  report(
    view.key,
    ".reason 可见行数达 clamp 声明（不被定高吃行）",
    eaten.length === 0,
    `clamp ${m.r[0]?.clamp ?? "?"} 行，实测可见行数 ${[...new Set(m.r.map((x) => x.visibleLines))].join("/")}｜被吃行 ${eaten.length} 张` +
      (byDesign ? `（另有 ${byDesign} 张文本超出 clamp 属设计内截断）` : ""),
  );

  // 4 侧栏/底栏/tabs 命中档
  const ch = await cdp.eval(`return window.__gt.chrome();`);
  const want = expectedChrome(view.w);
  const chromeOk = ch.sidebar === want.sidebar && ch.bottomBar === want.bottomBar && ch.tabs === want.tabs;
  report(
    view.key,
    "侧栏/底栏/tabs 命中档",
    chromeOk,
    `侧栏 ${ch.sidebar}(want ${want.sidebar}) 底栏 ${ch.bottomBar}(want ${want.bottomBar}) tabs ${ch.tabs}(want ${want.tabs})`,
  );

  // 5 整卡放得下（横屏/窄高档：卡片必须完整落在顶栏之下、底栏之上）
  const fit = await cdp.eval(`
    const c=document.querySelector('.card'); const r=c.getBoundingClientRect();
    const hd=document.querySelector('.header'); const hh=hd? hd.getBoundingClientRect().height : 0;
    const bb=document.querySelector('.bottom-bar');
    const bh=bb && getComputedStyle(bb).display!=='none' ? bb.getBoundingClientRect().height : 0;
    return {cardH: Math.round(r.height), top: Math.round(r.top), bottom: Math.round(r.bottom),
            band: Math.round(window.innerHeight - bh), headerH: Math.round(hh),
            inner: Math.round(window.innerHeight)};
  `);
  report(
    view.key,
    "整卡放得下（顶栏下、底栏上的可视带内）",
    fit.top >= fit.headerH - 1 && fit.bottom <= fit.band + 1,
    `卡 ${fit.top}→${fit.bottom}，可视带 ${fit.headerH}→${fit.band}（视口高 ${fit.inner}）｜卡高 ${fit.cardH}`,
  );

  // 6 详情弹层：动作区与弹层本体不破相
  await cdp.eval(`return window.__gt.clickText('.card');`);
  await new Promise((r) => setTimeout(r, 800));
  const detail = await cdp.eval(`
    const a=document.querySelector('.detail-actions');
    const card=document.querySelector('.detail-card');
    const ds=document.querySelector('.detail-summary');
    return {
      actions: a? {sw:a.scrollWidth, cw:a.clientWidth} : null,
      detail: card? {sw:card.scrollWidth, cw:card.clientWidth} : null,
      summaryLines: ds? window.__gt.measure('.detail-summary',1)[0] : null,
    };
  `);
  if (detail.actions) {
    report(
      view.key,
      "弹层动作区无横向溢出",
      detail.actions.sw <= detail.actions.cw + 1,
      `scrollWidth ${detail.actions.sw} / clientWidth ${detail.actions.cw}`,
    );
  } else {
    skip(view.key, "弹层动作区无横向溢出", "未找到 .detail-actions");
  }
  if (detail.detail) {
    report(
      view.key,
      "弹层本体无横向溢出",
      detail.detail.sw <= detail.detail.cw + 1,
      `scrollWidth ${detail.detail.sw} / clientWidth ${detail.detail.cw}`,
    );
  }
  await shot(cdp, `${view.key}_02_detail.png`);
  await cdp.eval(`
    const b=document.querySelector('.detail-close'); if(b) b.click();
    return true;
  `);
  await new Promise((r) => setTimeout(r, 500));

  // 7 触摸端：收藏夹删除/移出按钮必须看得见（G-05）
  if (view.mobile || view.w <= 768) {
    await cdp.eval(`return window.__gt.clickText('.bottom-item', '我的');`);
    await new Promise((r) => setTimeout(r, 600));
    await cdp.eval(
      `return window.__gt.clickText('.me-tab', '收藏') || window.__gt.clickText('.side-item', '收藏');`,
    );
    await new Promise((r) => setTimeout(r, 600));
    const op = await cdp.eval(`return window.__gt.opacity('.folder-delete');`);
    if (!ch.hoverNone) {
      skip(
        view.key,
        "触摸端删除按钮可见（hover:none 兜底）",
        `该档未命中 hover:none（桌面 hover 行为按 G-05 不改），.folder-delete opacity ${op?.opacity}`,
      );
    } else if (op) {
      report(
        view.key,
        "触摸端删除按钮可见（hover:none 兜底）",
        Number(op.opacity) > 0 && op.visibility !== "hidden",
        `opacity ${op.opacity} visibility ${op.visibility}`,
      );
    } else {
      skip(view.key, "触摸端删除按钮可见（hover:none 兜底）", "页面上没有 .folder-delete（收藏夹未渲染）");
    }
    await shot(cdp, `${view.key}_03_me.png`);

    // 8 创作者条（G-08）
    const cl = await cdp.eval(`
      window.__gt.clickText('.me-tab','关注') || window.__gt.clickText('.side-item','关注');
      return null;
    `);
    void cl;
    await new Promise((r) => setTimeout(r, 600));
    const grid = await cdp.eval(`return window.__gt.gridCols('.creator-list');`);
    if (grid) {
      report(
        view.key,
        "创作者条 ≤768 变 1 列且不溢出",
        view.w <= 768 ? grid.cols === 1 && grid.sw <= grid.cw + 1 : grid.sw <= grid.cw + 1,
        `列数 ${grid.cols} scrollWidth ${grid.sw} / clientWidth ${grid.cw}`,
      );
    } else {
      skip(view.key, "创作者条 ≤768 变 1 列且不溢出", "无 .creator-list（关注列表为空）");
    }

    // 9 Agent 页可达（G-09）
    const reach = await cdp.eval(`
      let via = null;
      const items=[...document.querySelectorAll('.bottom-item')];
      const fourth = items.find(e=>(e.textContent||'').includes('Agent'));
      if(fourth){ fourth.click(); via='底栏第 4 项'; }
      else {
        const t=document.querySelector('.drawer-toggle');
        if(t) t.click();
        const inDrawer=[...document.querySelectorAll('.drawer .side-item, .drawer button')].find(e=>(e.textContent||'').includes('Agent'));
        if(inDrawer){ inDrawer.click(); via='抽屉'; }
        else {
          const tab=[...document.querySelectorAll('.tabs .tab')]
            .filter(e=>getComputedStyle(e.parentElement).display!=='none')
            .find(e=>(e.textContent||'').includes('Agent'));
          if(tab){ tab.click(); via='顶栏 tabs（该档未隐藏）'; }
        }
      }
      return { via };
    `);
    await new Promise((r) => setTimeout(r, 900));
    const agentOk = await cdp.eval(
      `return !!document.querySelector('[class^="agent-"], [class*=" agent-"]');`,
    );
    report(
      view.key,
      "Agent 页可达",
      !!agentOk,
      reach.via
        ? `入口「${reach.via}」→ .agent- 元素 ${agentOk}`
        : "底栏、抽屉、可见顶栏 tabs 三处都没有 Agent 入口",
    );
    await cdp.eval(`return window.__gt.clickText('.bottom-item','首页');`);
    await new Promise((r) => setTimeout(r, 500));
  }

  await shot(cdp, `${view.key}_01_home.png`);
}

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error(
      `找不到 ${DIST}/index.html —— 先跑：cd web && npm run build && cp ../data/feed.json dist/data/feed.json`,
    );
    process.exit(1);
  }
  const feedPath = path.join(DIST, "data", "feed.json");
  const feedLen = JSON.parse(fs.readFileSync(feedPath, "utf-8")).length;
  console.log(`dist 数据规模 ${feedLen} 张｜静态服务器 http://127.0.0.1:${SRV_PORT}/`);
  if (feedLen < 1000) {
    console.error("dist feed.json 不足 1000 张（未 cp 真实数据），拒绝出绿");
    process.exit(1);
  }
  const server = startServer(DIST);
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const profile =
    process.env.GITTK_PROFILE ||
    path.join(DATA_DIR, "chrome-profile"); /* 落仓库 tmp（已 gitignore），不上 C 盘 */
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

  try {
    const cdp = await CDP.connect(CDP_PORT);
    await cdp.call("Runtime.enable");
    await cdp.call("Page.enable");
    await cdp.call("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-color-scheme", value: "dark" }],
    });
    const url = `http://127.0.0.1:${SRV_PORT}/`;
    await cdp.call("Page.navigate", { url });
    await new Promise((r) => setTimeout(r, 1500));
    await cdp.eval(seedScript());
    // 收藏夹里放几张真实卡，让 .folder-card-remove 也能渲染出来
    await cdp.eval(`
      const list = JSON.parse(localStorage.getItem('gittok-collections'));
      return fetch('./data/feed.json').then(r=>r.json()).then(cards=>{
        list[0].repos = cards.slice(0,6).map(c=>c.repo);
        localStorage.setItem('gittok-collections', JSON.stringify(list));
        const byOwner = {};
        for (const c of cards) byOwner[c.owner] = (byOwner[c.owner] || 0) + 1;
        const top3 = Object.keys(byOwner).sort((a,b)=>byOwner[b]-byOwner[a]).slice(0,3);
        localStorage.setItem('gittok-following', JSON.stringify(top3));
        return top3;
      });
    `);
    await cdp.call("Page.navigate", { url });
    await new Promise((r) => setTimeout(r, 1200));
    await cdp.call("Runtime.evaluate", { expression: PAGE_TOOLS });
    await new Promise((r) => setTimeout(r, 300));

    for (const view of VIEWS) {
      if (ONLY && ONLY !== view.key) continue;
      await checkView(cdp, view);
    }
  } finally {
    chrome.kill();
    server.close();
  }

  const rows = RESULTS.filter((r) => r.ok !== null);
  const failed = rows.filter((r) => !r.ok);
  fs.writeFileSync(
    path.join(DATA_DIR, `responsive_${TAG}.json`),
    JSON.stringify(
      { at: new Date().toISOString(), views: VIEWS.map((v) => v.key), results: RESULTS },
      null,
      2,
    ),
  );
  console.log("");
  console.log("=== 汇总 ===");
  console.log(`断言 ${rows.length} 项（跳过 ${RESULTS.length - rows.length} 项）｜FAIL ${failed.length} 项`);
  for (const f of failed) console.log(`  FAIL ${f.view} — ${f.name} ${f.detail}`);
  console.log(`截图目录 ${SHOT_DIR}｜读数 ${path.join(DATA_DIR, `responsive_${TAG}.json`)}`);
  console.log(failed.length === 0 ? "=== 多档适配全 PASS ===" : "=== 存在适配 FAIL ===");
  process.exit(failed.length === 0 ? 0 : 1);
}

void main();
