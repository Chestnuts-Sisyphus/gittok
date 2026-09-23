/**
 * GitTok 多档适配回归闸（G-16 / GATE-01+GATE-02）——**所有 RESP/A11Y 目标的验收底座**。
 *
 * 为什么需要它：改这个脚本之前，全站适配 **0 自动化覆盖**——`web/src/__tests__/` 是 node 环境纯逻辑断言，
 * 没有一条测试断言过 `@media`、`line-clamp`、溢出或换行；唯一的视觉验收 `accept_visual.py`
 * 固定 1400×900 一档，6 项断言全是审美 token，与尺寸无关。
 *
 * 做什么：用 CDP 起无头 Chrome（本机 GameViewer 虚拟显示器致 GPU 合成失效 → 一律 --disable-gpu，
 * 无窗口不抢焦点），逐档量「横向溢出 / 卡片被 overflow:hidden 吃掉的行 / 逐档实际可见字数
 * （CDP Range 逐字量）/ **卡宽上限 ≤--feed-card-max 与列数＝预期表（2026-09-23 补，乙2/乙3）** /
 * 侧栏与底栏命中档 / 弹层动作区溢出 / 触摸端按钮可见性 / Agent 页可达 / 整卡是否放得下」，
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
let PAGE_URL = "";

const TAG = (() => {
  const a = process.argv.find((x) => x.startsWith("--tag="));
  return a ? a.slice(6) : new Date().toISOString().replace(/[:.]/g, "-");
})();
const ONLY = (() => {
  const a = process.argv.find((x) => x.startsWith("--only="));
  return a ? a.slice(7) : null;
})();

/** 十六档视口：G-10 验收点名的八档宽度（700/760/900/1000/1200/1400/1600/1920）
 *  + 手机竖屏 390×844 + 两个横屏档 844×390、667×375（G-11）
 *  + 2026-09-23 补两个中间档：1343×900（旧「两列各 524px＝27 字」的挤压档，新设计下应为单列）
 *    与 1100×800（旧「单列占满 820px」的拉伸档）。**769–1342 这段此前一个档都没有**，
 *    而卡宽上限/列数这两类回归恰好只在这段现形（乙2/乙3）。每档出「首页 + 弹层 + 我的页」截图。 */
const VIEWS = [
  { key: "2560x1080", w: 2560, h: 1080, mobile: false },
  { key: "1920x1080", w: 1920, h: 1080, mobile: false },
  { key: "1600x900", w: 1600, h: 900, mobile: false },
  { key: "1400x900", w: 1400, h: 900, mobile: false },
  { key: "1343x900", w: 1343, h: 900, mobile: false },
  // 1275x900：栗子 09-23 截图的窗口档（那一档当时是「单列 640 悬在 996px 网格里」＝他说的"大空档"），
  // 现在必须锁成「两列 490px 填满 996px 网格」。加这一档就是为了这类回归不再复发。
  { key: "1275x900", w: 1275, h: 900, mobile: false },
  { key: "1200x900", w: 1200, h: 900, mobile: false },
  { key: "1100x800", w: 1100, h: 800, mobile: false },
  { key: "1000x800", w: 1000, h: 800, mobile: false },
  { key: "900x800", w: 900, h: 800, mobile: false },
  { key: "768x1024", w: 768, h: 1024, mobile: false },
  { key: "760x900", w: 760, h: 900, mobile: true },
  { key: "700x900", w: 700, h: 900, mobile: true },
  { key: "390x844", w: 390, h: 844, mobile: true },
  { key: "844x390", w: 844, h: 390, mobile: true },
  { key: "667x375", w: 667, h: 375, mobile: true },
];

/** 2026-09-23：卡宽上限与列数预期表（照收尾后的 `--feed-card-max: 640px` / `--feed-col-min: 550px`
 *  ＋本机实测的网格可用宽）。**只列 >768 的档**——≤768 有另一条判据（卡宽 ≥ 视口 88%，G-13）。
 *
 *  为什么改成「预期表」而不是继续用一条阈值：旧判据 `>768` 只查「一行容量 ≥28 字」（现已按可读区间改口径），**没有上限**
 *  （乙2），所以 1920 档卡宽被拉到 710px（38 字）这类回归结构上抓不到。列数同样从来没有断言
 *  （`cols` 只被创作者列表那条用过）。
 *
 *  预期表怎么来的：cardMax 单卡宽上限；capacity 该档一行容量（.summary 隐藏探针实测口径）。
 *  两列门槛＝网格 ≥ 2×550+16 = 1116px（实测：1400 档网格 1120 → 两列；1343 档网格 1063 → 单列）。 */
const FEED_CARD_MAX = 700;
/** 一行容量区间（2026-09-23 第四版）：由**考证的可读区间**定，不再由「某档卡能放多少字」定。
 *  中文行长可读区间 22–38 汉字（Bringhurst 45–75 拉丁字符 ÷ 2；Unicode TR11 全角 1em／半角 1/2em；
 *  WCAG 2.2 SC 1.4.8 只给**上限**「80 chars (40 if CJK)」，且原文声明 "Content is not required to use these values"）。
 *  设计：列宽下限 420px（21 汉字，比下沿低 1 字——实测取舍：每降 20px「单列＋留白」那段就窄 20px）；
 *  单列档上限 700px（37 汉字）；多列区实测卡宽 420–668（两列）/ 430–540（三列），全在区间内。
 *  实测代价（2841 张真实卡 + 真字体度量）：420 卡 71% 摘要被截、640 卡 15.9%、700 卡 0.8%。
 *  所以区间取 [21, 38]：下限＝21（列宽下限 420px 的实测容量），上限＝38（考证上沿，实测最大卡 700px＝37 字）。 */
const FEED_CAPACITY_MIN = 24;
const FEED_CAPACITY_MAX = 38;
/** 列数规则（2026-09-23 第四版，**列数由 JS 单一真源反解、CSS 只认 `--feed-cols`**）：
 *  cols = ceil((可用宽+gap)/(700+gap))，若会把卡片压到 <480px 就减一列 → **卡片宽度永远落在 [480,700]**
 *  （＝24–37 汉字，落在考证的可读区间 22–38 字内）。两列下界 = 网格 976px（＝视口 1255，含侧栏 216/内距 48/滚动条槽 15）；
 *  三列下界 = 网格 1472px（视口 1751）。内容区上限跟顶栏口径 1650px，超宽屏由「侧栏＋内容整壳 1866px 居中」收边
 *  （Bootstrap「容器 ≥1400px 封顶」/ Ant Design「留白到限定值再缩放主内容」同路线），故 1920/2560 都停在三列 523px。
 *  ⚠ 2026-09-23 三轮（甲A4）：最小卡宽 420→**480**——栗子「本来该两列的场景变成了三列窄卡」
 *  （1700 档实测 3×463）。改后 1700 → 2×700；1275 仍两列（硬约束）；1920/2560 三列 523 不变。
 *  ⚠ 同轮 T3：滚动条改回自绘 8px 细条（根因＝`* { scrollbar-color }` 让 Chromium 整块忽略
 *  `::-webkit-scrollbar`），`.app-body` 的 `scrollbar-gutter: stable` 预留槽随之 15→8px
 *  → 多列档可用宽 +7px：1275 卡宽 490→**494**、1343 524→528、1400 553→556、1600 652→656
 *  （单列档卡宽受 700 上限约束、不受影响；1920/2560 由 1866px 外壳封顶、逐像素不变）。
 *  实测（本机无头 Chrome，含/不含 --hide-scrollbars 两遍读数一致——`.app-body` 已 `scrollbar-gutter: stable`）。 */
const EXPECT_DESKTOP = {
  "2560x1080": { cols: 3, cardW: 523, capMin: 27, capMax: 27 },
  "1920x1080": { cols: 3, cardW: 523, capMin: 27, capMax: 27 },
  "1600x900": { cols: 2, cardW: 656, capMin: 35, capMax: 35 },
  "1400x900": { cols: 2, cardW: 556, capMin: 29, capMax: 29 },
  "1343x900": { cols: 2, cardW: 528, capMin: 27, capMax: 27 },
  "1275x900": { cols: 2, cardW: 494, capMin: 25, capMax: 25 },
  // 1200 档：网格 921 < 两列下界 976 → 单列 700（改前是 2×452＝23 字，栗子点名的「窄卡」同族）
  "1200x900": { cols: 1, cardW: 700, capMin: 37, capMax: 37 },
  "1100x800": { cols: 1, cardW: 700, capMin: 37, capMax: 37 },
  "1000x800": { cols: 1, cardW: 700, capMin: 37, capMax: 37 },
  "900x800": { cols: 1, cardW: 700, capMin: 37, capMax: 37 },
  // 844×390 是 mobile:true 但 w>768 —— CSS 媒体查询按**宽度**走，844 用桌面栅格
  // （闸的档位分支同理照 w 判），所以它也归桌面预期表。实测：侧栏此时是 64px 图标栏、单列 700。
  "844x390": { cols: 1, cardW: 700, capMin: 37, capMax: 37 },
};

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

// K-11 / E3：「一行容量」下限是**设计口径**（2026-09-23 起＝24 汉字，对应列宽下限 460px；
// 中文可读行长区间 22–38 汉字，见 EXPECT_DESKTOP 上方注释的引用）。原口径 28 字来自 G-10，
// 那一版把「最宽卡能放多少字」当门限，代价是更多视口掉进「单列 + 两侧大留白」（栗子 09-23 截图）。
// 同一份 CSS 在不同平台因字体度量不同，每行容量实测极差 **14.2%**（8 字族 25.4→29.0 全角字），
// 直接套会在非 Windows 档假红、也可能因字号偏大而假绿。
// 处置：Windows 档判定原样不动；非 Windows 档按漂移上界归一（下限 / 1.142 向上取整）后再判，
// 并把口径写进读数，避免被误读成"标准放宽了"。
const RUN_PLATFORM = process.platform;
const CROSS_PLATFORM_LINE_DRIFT = 1.142;
const SUMMARY_CAPACITY_PASS_MIN =
  RUN_PLATFORM === "win32" ? FEED_CAPACITY_MIN : Math.ceil(FEED_CAPACITY_MIN / CROSS_PLATFORM_LINE_DRIFT);
function summaryCapacityPass(capMin) {
  return capMin >= SUMMARY_CAPACITY_PASS_MIN;
}

/** 一行容量**上限**（2026-09-23 新增判据）的跨平台折算：上限是「行太长」的判据，
 *  与单字宽**成反比**，所以非 Windows 档要**放大**而不是缩小。
 *  实测（2026-09-23，两端都是同一份 CSS/同 640px 卡/同 571px 内容宽）：
 *    Windows 本机无头 Chrome 单字宽 16.66px → 34 字；
 *    CI ubuntu runner 无头 Chrome（CJK 走回退字体）单字宽 13.0px → 44 字，比 **1.29**；
 *    1400 档 552px 卡：Windows 28 字 ↔ Linux 37 字，比 **1.32**。
 *  取 1.35 留余量。首跑就是漏了这一步，CI 上 9 档全红（卡宽/列数两条**平台无关、两端都过**）。
 *  ⚠ 与上面那条 1.142 不是同一对样本（那条量的是 mac/Android 的字族差 25.4→29.0），别互相套用：
 *  非 Windows 档「行容量」这个量本身跨平台差异很大，真正的硬保证是**卡宽上限**（几何量，与字体无关）。 */
const CROSS_PLATFORM_CAP_SCALE = 1.35;
const SUMMARY_CAPACITY_PASS_MAX =
  RUN_PLATFORM === "win32" ? FEED_CAPACITY_MAX : Math.ceil(FEED_CAPACITY_MAX * CROSS_PLATFORM_CAP_SCALE);

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
  /** 二轮 G3/G4/G5 断言（2026-09-23）：导航形态内部排版、底栏底色、滚动条样式。
   *  旧闸只断言 sidebar/bottomBar 的 display 命中档——图标栏 64px 排版、底栏半透明、
   *  滚动条样式全在盲区（乙3/乙4），甲3/甲4/甲5 因此能长期存在。 */
  chromeDetail(){
    const sb=document.querySelector('.sidebar');
    const bb=document.querySelector('.bottom-bar');
    const hd=document.querySelector('.header');
    const cs=(e)=>e? getComputedStyle(e):null;
    const sbcs=cs(sb), bbcs=cs(bb), hdcs=cs(hd);
    const w = sb ? Math.round(sb.getBoundingClientRect().width) : 0;
    // 2026-09-23 三轮：≤768 的侧栏从 display:none 改成「塌缩态」（width:0 + visibility:hidden）——
    // 它仍在渲染树里，但**不是**图标栏。判定必须带上可见性与宽度，否则会在手机档误跑图标栏断言
    // （实测：side-item 全被 visibility 过滤 → itemMinH 0 → 5 档假红）。
    const iconMode = !!sb && sbcs.display!=='none' && sbcs.visibility!=='hidden' && w > 0 && w <= 100;
    const items=[...document.querySelectorAll('.sidebar .side-item')].filter(e=>{
      const s=getComputedStyle(e); return s.display!=='none' && s.visibility!=='hidden';});
    return {
      sidebarShown: !!sb && sbcs.display!=='none',
      sidebarW: sb? Math.round(sb.getBoundingClientRect().width):0,
      iconMode,
      itemMinH: items.length? Math.min(...items.map(e=>Math.round(e.getBoundingClientRect().height))):0,
      itemsNoName: items.filter(e=>!e.getAttribute('aria-label') && !(e.textContent||'').trim()).length,
      groupBars: document.querySelectorAll('.sidebar .side-group').length,
      bottomShown: !!bb && bbcs.display!=='none',
      bottomBg: bb? bbcs.backgroundColor:null,
      headerBg: hd? hdcs.backgroundColor:null,
    };
  },
  /** 滚动条：Chromium 无头里 ::-webkit-scrollbar 是 shadow DOM 里的伪元素，读不到计算样式；
   *  但「占位宽度」可以直接从滚动容器 clientWidth−offsetWidth 之类量出（--hide-scrollbars 时恒 0），
   *  scrollbar-color 可从容器 computedStyle 读到（本闸显式声明它，断言样式 token 在场）。 */
  scrollbarInfo(sel){
    const e=document.querySelector(sel); if(!e) return null;
    const cs=getComputedStyle(e);
    return { color: cs.scrollbarColor, gutter: cs.scrollbarGutter,
             slot: e.offsetWidth - e.clientWidth - (parseFloat(cs.borderLeftWidth)||0) - (parseFloat(cs.borderRightWidth)||0) };
  },
  opacity(sel){ const e=document.querySelector(sel); if(!e) return null;
    const cs=getComputedStyle(e); const r=e.getBoundingClientRect();
    return { opacity: cs.opacity, visibility: cs.visibility, display: cs.display, w: Math.round(r.width), h: Math.round(r.height) }; },
  gridCols(sel){ const e=document.querySelector(sel); if(!e) return null;
    const cs=getComputedStyle(e);
    return { cols: cs.gridTemplateColumns.split(' ').filter(Boolean).length,
             sw: e.scrollWidth, cw: e.clientWidth }; },
  boxOverflow(sel, limit){
    return [...document.querySelectorAll(sel)].slice(0, limit ?? 8)
      .map((e)=>({ sw: e.scrollWidth, cw: e.clientWidth, sh: e.scrollHeight, ch: e.clientHeight }));
  },
  /** H-01 防御锁量测：一句话盒的 clamp 本体三件 + 盒高是否被钉死在一行 + 文本实占几行。
   *  删 max-height、改 display、动 line-clamp 都会在这里现形（配合 checkView 里的断言复红）。 */
  summaryLock(sel, limit){
    return [...document.querySelectorAll(sel)].slice(0, limit ?? 8).map((el)=>{
      const cs=getComputedStyle(el);
      const rect=el.getBoundingClientRect();
      const px=(v)=>{const n=parseFloat(v); return Number.isFinite(n)? +n.toFixed(1) : null;};
      const lineH=parseFloat(cs.lineHeight)||0;
      const padY=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
      const range=document.createRange(); const tops=new Set(); const vtops=new Set();
      let sliver=0; let sliverPx=0; let hOverflow=0;
      for(const node of window.__gt.textNodes(el)){
        for(let i=0;i<node.data.length;i++){
          if(/\\s/.test(node.data[i])) continue;
          range.setStart(node,i); range.setEnd(node,i+1);
          const rs=[...range.getClientRects()].filter(q=>q.width>0||q.height>0);
          if(!rs.length) continue;
          const q=rs[0];
          tops.add(Math.round(q.top));
          if(q.top>=rect.top-1 && q.bottom<=rect.bottom+1 && q.left>=rect.left-1 && q.right<=rect.right+1){
            vtops.add(Math.round(q.top));
          } else if(q.bottom>rect.bottom+1 && q.top>rect.top+1){
            // 纵向被切：底边越过盒底、顶边还在盒内 = 半行字顶露在裁切线外（栗子 09-19 截图那种）
            sliver++;
            sliverPx=Math.max(sliverPx, +(q.bottom-rect.top).toFixed(1));
          } else if(q.right>rect.right+1 || q.left<rect.left-1){
            // 横向被裁：nowrap + 省略号的正常行为，只计信息量不判红
            hOverflow++;
          }
        }
      }
      return { display: cs.display, clamp: String(cs.webkitLineClamp), overflow: cs.overflow,
               whiteSpace: cs.whiteSpace, textOverflow: cs.textOverflow,
               maxH: cs.maxHeight==='none'? null : px(cs.maxHeight),
               minH: cs.minHeight==='none'? null : px(cs.minHeight),
               oneLine: +(lineH+padY).toFixed(1), boxH: +rect.height.toFixed(1),
               visLines: vtops.size, lines: tops.size, sliver, sliverPx, hOverflow };
    });
  },
  /** 一行容量：用隐藏探针（复制该元素字体相关计算样式 + 10 个全角字）量单字宽，
   *  再看内容宽能塞几个字。不拿卡上真实文本量——首串含拉丁词或标点会把单字宽算歪。 */
  capacity(sel, limit){
    return [...document.querySelectorAll(sel)].slice(0, limit ?? 8).map((el)=>{
      const cs=getComputedStyle(el);
      const inner=el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const probe=document.createElement('span');
      ['fontFamily','fontSize','fontWeight','fontStyle','letterSpacing','textTransform'].forEach(k=>{
        probe.style[k]=cs[k];
      });
      probe.style.position='absolute'; probe.style.visibility='hidden';
      probe.style.whiteSpace='nowrap'; probe.textContent='国国国国国国国国国国';
      document.body.appendChild(probe);
      const charW=probe.getBoundingClientRect().width/10;
      probe.remove();
      if(!(charW>0) || inner<=0) return { cap: 0, width: Math.round(inner), charW: 0 };
      return { cap: Math.floor(inner/charW), width: Math.round(inner), charW: +charW.toFixed(1) };
    });
  },
  clickText(sel, text){
    const els=[...document.querySelectorAll(sel)];
    const el=text? els.find(e=>(e.textContent||'').includes(text)) : els[0];
    if(!el) return false;
    el.scrollIntoView({block:'center'}); el.click(); return true;
  },
};
`;

const KEY_CODES = { Enter: 13, Escape: 27, ArrowDown: 40, ArrowUp: 38, PageDown: 34, PageUp: 33, " ": 32 };

/** 发一次真实按键（CDP Input 域，不是 JS 合成事件）。 */
async function key(cdp, k, code) {
  const keyCode = KEY_CODES[k] ?? 0;
  const text = k.length === 1 ? k : "";
  for (const type of ["rawKeyDown", "keyUp"]) {
    await cdp.call("Input.dispatchKeyEvent", {
      type,
      key: k,
      code: code || k,
      windowsKeyCode: keyCode,
      nativeVirtualKeyCode: keyCode,
      text,
      unmodifiedText: text,
    });
  }
}

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
  // 每档都从「重新加载首页」开始：上一档的点选与滚动会把页面留在非首屏状态，
  // 那样量到的「首卡」其实是列表中段的卡，读数不可信。
  await cdp.call("Page.navigate", { url: PAGE_URL });
  await new Promise((r) => setTimeout(r, 1200));
  const n = await waitCards(cdp);
  if (n === 0) {
    report(view.key, "页面就绪", false, "一张卡都没渲染出来");
    return;
  }
  await cdp.call("Runtime.evaluate", { expression: PAGE_TOOLS });
  await new Promise((r) => setTimeout(r, 300));

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

  // 3 逐档实际可见字数（口径：桌面档一行容量落在 [24,34] 字；2026-09-23 加上限与卡宽/列数；
  //   G-13 窄档卡宽 ≥ 视口 88%）
  const m = await cdp.eval(`
    const list=document.querySelector('.feed-list');
    const card=document.querySelector('.card');
    const lcs=list? getComputedStyle(list): null;
    const tracks=lcs? lcs.gridTemplateColumns.split(' ').filter(Boolean): [];
    const cr=card.getBoundingClientRect();
    const lr=list? list.getBoundingClientRect(): cr;
    // 三轮 T3/甲1 新判据用：单列档「频道头/偏好条」的左右缘必须与卡片一致
    //（旧判据拿网格盒宽当代理——三轮把「收块」换成「轨道收 700 + 块满宽」后，
    // 网格盒宽不再代表可见内容宽，代理失效；直接比可见矩形才是那条要求的本义）。
    const cue=document.querySelector('.feed-content > .channel-head, .feed-content > .pref-prompt, .feed-content > .status');
    const cr2=cue? cue.getBoundingClientRect(): null;
    return {s: window.__gt.measure('.summary', 12), cap: window.__gt.capacity('.summary', 12),
            r: window.__gt.measure('.reason-clamped', 12), t: window.__gt.boxOverflow('.card-tags', 12),
            cardW: cr.width, cardLeftInGrid: Math.round(cr.left-lr.left),
            gridW: list? list.clientWidth: 0, gridRightSlack: Math.round(lr.right-cr.right),
            cueW: cr2? cr2.width: 0, cueDelta: cr2? Math.round(Math.abs(cr2.left-cr.left)): null,
            cueRightDelta: cr2? Math.round(Math.abs(cr2.right-cr.right)): null,
            cols: tracks.length, tracks: tracks.map(t=>Math.round(parseFloat(t)))};
  `);
  const sClip = m.s.filter((x) => x.visible < x.total).length;
  const capMin = Math.min(...m.cap.map((x) => x.cap));
  // 单列档「频道头与卡片左右缘对齐」：判左右缘各 ≤4px（浮动取整余量）
  const cueAlignsCard = m.cueDelta !== null && m.cueDelta <= 4 && m.cueRightDelta <= 4;
  if (view.w > 768) {
    report(
      view.key,
      `.summary 一行容量 ≥${FEED_CAPACITY_MIN} 字（可读区间下限）`,
      summaryCapacityPass(capMin),
      `容量 min ${capMin} 字（单字宽 ${m.cap[0]?.charW}px / 内容宽 ${m.cap[0]?.width}px）｜采样整句可见 ${m.s.length - sClip}/${m.s.length}` +
        `｜口径：${RUN_PLATFORM === "win32" ? `Windows 基准 ${FEED_CAPACITY_MIN} 字（=列宽下限 420px＝21 汉字）` : `非 Windows（${RUN_PLATFORM}）按 14.2% 跨平台漂移归一，下限 ${SUMMARY_CAPACITY_PASS_MIN} 字`}`,
    );
    // ── 2026-09-23 新增（乙2：旧闸只有下限、没有上限，710px 拉伸回归抓不到） ──
    const exp = EXPECT_DESKTOP[view.key];
    report(
      view.key,
      `.summary 一行容量 ≤${FEED_CAPACITY_MAX} 字（上限，与卡宽上限同源）`,
      capMin <= SUMMARY_CAPACITY_PASS_MAX,
      `容量 min ${capMin} 字（本档上限 ${SUMMARY_CAPACITY_PASS_MAX} 字；Windows 标定值 ${FEED_CAPACITY_MAX} 字` +
        `${RUN_PLATFORM === "win32" ? "" : `，非 Windows（${RUN_PLATFORM}）按实测单字宽比 ×${CROSS_PLATFORM_CAP_SCALE} 折算`}）` +
        `｜区间 [${FEED_CAPACITY_MIN}, ${FEED_CAPACITY_MAX}] 字：下限＝420px 列的 21 汉字（中文可读区间 22–38 汉字，实测取舍低 1 字），上限＝栗子 2026-09-22「不要强行拉伸」`,
    );
    report(
      view.key,
      `卡宽 ≤ ${FEED_CARD_MAX}px 且符合预期表（甲1）`,
      !!exp && m.cardW <= FEED_CARD_MAX + 1 && Math.abs(m.cardW - exp.cardW) <= 1,
      `卡宽 ${Math.round(m.cardW)}px（预期 ${exp ? exp.cardW : "?"}，上限 ${FEED_CARD_MAX}）` +
        `｜轨道 ${JSON.stringify(m.tracks)}｜网格 ${m.gridW}px｜居中余量 左 ${m.cardLeftInGrid} 右 ${m.gridRightSlack}`,
    );
    report(
      view.key,
      `列数 = 预期表 且单列档频道头与卡片左右缘对齐（甲3/栗子 09-23 截图那条）`,
      !!exp && m.cols === exp.cols && (m.cols > 1 || cueAlignsCard),
      `列数 ${m.cols}（预期 ${exp ? exp.cols : "?"}）｜网格 ${m.gridW}px，卡宽 ${Math.round(m.cardW)}px` +
        `｜单列档要求「频道头 ≡ 卡片」左右缘：` +
        (m.cols === 1
          ? m.cueDelta === null
            ? "本档无频道头/偏好条可测（不判）"
            : `实测 左缘差 ${m.cueDelta}px、右缘差 ${m.cueRightDelta}px → ${cueAlignsCard ? "对齐 ✓（条与卡同宽 700，留白在右侧作页面边距）" : "❌ 卡片与上面的条错位"}`
          : `多列填满行 ✓`),
    );
  } else {
    // ≤768 的「占满」判据**只适用于手机档**：这里是 480/768 两档断点下的既定设计（G-13），
    // 卡宽不被 --feed-card-max 约束（上限规则写在 @media (min-width: 769px) 里）。
    // 769–1342 那段「单列但不该占满」由上面的卡宽上限/列数两条断言管，两条判据方向相反、各管一段。
    report(
      view.key,
      "卡宽 ≥ 视口 88%（G-13，仅 ≤768 手机档适用）",
      m.cardW >= view.w * 0.88,
      `卡宽 ${Math.round(m.cardW)}px = 视口 ${((m.cardW / view.w) * 100).toFixed(1)}%｜一行容量 min ${capMin} 字` +
        `｜本判据为**占满型**设计，与 769+ 的「卡宽 ≤ 上限」方向相反，互不适用`,
    );
  }
  const noReason = m.r.filter((x) => x.visibleLines === 0);
  report(
    view.key,
    ".reason 至少一行可见（定高不吃光）",
    noReason.length === 0,
    `clamp ${m.r[0]?.clamp ?? "?"} 行，可见行数 ${[...new Set(m.r.map((x) => x.visibleLines))].join("/")}｜一行不见 ${noReason.length} 张` +
      `（文本超出 clamp 被省略号截断 ${m.r.filter((x) => x.visible < x.total).length} 张，属设计内截断，判据见「卡片不被吃行」）`,
  );
  const tagsCut = m.t.filter((x) => x.sw > x.cw + 1);
  report(
    view.key,
    ".card-tags 单行不被裁（+N 计数可见）",
    tagsCut.length === 0,
    `采样 ${m.t.length} 张` +
      (tagsCut.length ? `｜被裁 ${tagsCut.map((x) => `${x.sw}>${x.cw}`).join(" ")}` : ""),
  );

  // 3.5 H-01：一句话单行防御锁回归断言（改坏 styles.css 的 max-height / clamp 必须复红）
  // 口径注：display 不做 FAIL 条件——Chrome 把 computed `display:-webkit-box` 归一报成 "flow-root"
  // （实测 12/12 张），拿它判红必假红；display 的源码契约由 web/src/__tests__/summary-single-line.test.ts 拦。
  const lk = await cdp.eval(`return window.__gt.summaryLock('.summary', 12);`);
  const lkBad = {
    "clamp 失效（line-clamp≠1 或 overflow≠hidden）": lk.filter((x) => x.clamp !== "1" || x.overflow !== "hidden"),
    "max-height 缺失或不等于一行高": lk.filter((x) => x.maxH === null || Math.abs(x.maxH - x.oneLine) > 1),
    "min-height 缺失或不等于一行高": lk.filter((x) => x.minH === null || Math.abs(x.minH - x.oneLine) > 1),
    "max≠min（钉死失效）": lk.filter((x) => x.maxH === null || x.minH === null || Math.abs(x.maxH - x.minH) > 0.6),
    "盒高越出一行": lk.filter((x) => x.boxH > x.oneLine + 1),
    "可见文本占了两行": lk.filter((x) => x.visLines > 1),
    // 栗子 09-19 截图证实的形态：clamp 不生效时文本自然折行，max-height 只裁掉半行 → 字顶残留
    "半行字顶外露（裁切线切在行中）": lk.filter((x) => x.sliver > 0),
  };
  const lkWhy = Object.entries(lkBad)
    .filter(([, v]) => v.length)
    .map(([k, v]) => `${k} ${v.length} 张（如 ${JSON.stringify(v[0])}）`)
    .join("｜");
  const lkClipped = lk.filter((x) => x.lines > x.visLines).length;
  report(
    view.key,
    "一句话单行防御锁（H-01：max==min==一行高、盒高不越行、可见文本不占两行）",
    lk.length > 0 && lkWhy === "",
    `采样 ${lk.length} 张｜一行应有高 ${lk[0]?.oneLine ?? "?"}px（line-height+padding）` +
      `｜max/min ${lk[0]?.maxH}/${lk[0]?.minH}｜盒高 max ${Math.max(...lk.map((x) => x.boxH))}` +
      `｜可见行数 ${[...new Set(lk.map((x) => x.visLines))].join("/")}｜display ${lk[0]?.display} clamp ${lk[0]?.clamp}` +
      `｜white-space ${lk[0]?.whiteSpace} text-overflow ${lk[0]?.textOverflow}` +
      `｜半行外露 ${lk.reduce((s, x) => s + (x.sliver ? 1 : 0), 0)} 张（最多露 ${Math.max(0, ...lk.map((x) => x.sliverPx || 0))}px）` +
      (lkClipped ? `｜另有 ${lkClipped} 张超长句被裁掉的整行仍在布局（盒内不可见）` : "") +
      (lkWhy ? `｜❌ ${lkWhy}` : ""),
  );

  // 4 侧栏/底栏/tabs 命中档
  const grad = await cdp.eval(`
    const bi=getComputedStyle(document.body,'::before').backgroundImage||'';
    return bi.includes('linear-gradient');
  `);
  report(
    view.key,
    "固定渐变底仍在（body::before，09-05 性能拍板）",
    grad === true,
    `body::before backgroundImage ${grad ? "含 linear-gradient" : "不含 linear-gradient"}`,
  );
  const ch = await cdp.eval(`return window.__gt.chrome();`);
  const want = expectedChrome(view.w);
  const chromeOk = ch.sidebar === want.sidebar && ch.bottomBar === want.bottomBar && ch.tabs === want.tabs;
  report(
    view.key,
    "侧栏/底栏/tabs 命中档",
    chromeOk,
    `侧栏 ${ch.sidebar}(want ${want.sidebar}) 底栏 ${ch.bottomBar}(want ${want.bottomBar}) tabs ${ch.tabs}(want ${want.tabs})`,
  );

  // 4.5 二轮 G3/G4/G5 断言（2026-09-23）：图标栏排版 / 底栏不透明 / 滚动条样式（甲3/甲4/甲5）
  const cd = await cdp.eval(`return window.__gt.chromeDetail();`);
  if (cd.iconMode) {
    // 图标栏（769–900 与 844 横屏）：触控 ≥44、无「无名按钮」、分组表达在场（accent 短横线）
    report(
      view.key,
      "图标栏触控目标 ≥44px（甲3）",
      cd.itemMinH >= 44,
      `side-item 最小高 ${cd.itemMinH}px（样式 ≥44 判）`,
    );
    report(
      view.key,
      "图标栏按钮有可访问名称（甲3：aria-label/title）",
      cd.itemsNoName === 0,
      `无名按钮 ${cd.itemsNoName}/${cd.itemMinH ? "" : ""}`,
    );
    report(
      view.key,
      "图标栏分组表达在场（甲3：side-group 短横线）",
      cd.groupBars > 0,
      `.side-group 元素 ${cd.groupBars} 个（发现/分类 两组标题以横线形式保留）`,
    );
  }
  if (cd.bottomShown && cd.headerBg) {
    // 底栏与顶栏同一不透明底色（甲4：rgba(26,22,44,.72) → var(--header-bg)）
    report(
      view.key,
      "底栏底色 = 顶栏且不透明（甲4）",
      cd.bottomBg === cd.headerBg,
      `底栏 ${cd.bottomBg} vs 顶栏 ${cd.headerBg}（一致判；旧值 rgba(26, 22, 44, 0.72) 会透出正文）`,
    );
  }
  if (ch.sidebar || ch.bottomBar) {
    // 滚动条样式 token 在场（甲5）：scrollbar-color 由 G5 的 * 规则声明；gutter stable 只在 .app-body
    const sbInfo = await cdp.eval(`return window.__gt.scrollbarInfo('.app-body');`);
    // 2026-09-23 三轮 T3：判据从「scrollbar-color 非 auto」改成**「自绘细条在场（非系统回退）」**。
    // 为什么换：Chromium 里 `scrollbar-color` 一非 auto，`::-webkit-scrollbar` 整块被忽略
    // （实测三格对照：只写 webkit→自绘 20px 生效；两者都写→回落系统 15px）。
    // 所以三轮流行的做法是把标准属性关进 `@supports not selector(::-webkit-scrollbar)`（Firefox 专用）,
    // Chromium 侧 scrollbar-color 的 computed 值**本来就该是 auto**——旧断言把「修好了」判成红。
    // 新判据量的是「渲染结果」：槽位宽度必须等于自绘声明的 8px（系统回退是 15px）。
    const sizeOk = !!sbInfo && sbInfo.slot === 8;
    report(
      view.key,
      "滚动条样式：自绘细条在场、非系统回退（甲5/三轮 T3）",
      sizeOk,
      `app-body 槽位 ${sbInfo?.slot ?? "?"}px（自绘声明 8px；系统回退会是 15px）` +
        `｜scrollbar-color ${sbInfo?.color ?? "未声明"}（Chromium 走 ::-webkit-scrollbar 自绘，故为 auto；Firefox 由 @supports 分支接管）` +
        `｜gutter ${sbInfo?.gutter ?? "?"}`,
    );
  }

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
    "整卡放得下（可视带高 ≥ 卡高）",
    fit.band - fit.headerH >= fit.cardH,
    `可视带高 ${fit.band - fit.headerH}（顶栏 ${fit.headerH}→底栏上沿 ${fit.band}，视口 ${fit.inner}）｜卡高 ${fit.cardH}｜首卡 top ${fit.top}`,
  );

  // 5.5 键盘与读屏（G-14）
  const roles = await cdp.eval(`
    const c=document.querySelector('.card');
    return { role: c.getAttribute('role'), tabIndex: c.getAttribute('tabindex'),
             ariaLabel: (c.getAttribute('aria-label')||'').slice(0,20) };
  `);
  report(
    view.key,
    "卡片可聚焦（role=button + tabIndex + aria-label）",
    roles.role === "button" && roles.tabIndex === "0" && !!roles.ariaLabel,
    `role=${roles.role} tabindex=${roles.tabIndex} aria-label="${roles.ariaLabel}…"`,
  );
  await cdp.eval(`document.querySelector('.card').focus(); return true;`);
  await key(cdp, "Enter", "Enter");
  await new Promise((r) => setTimeout(r, 700));
  const dlg = await cdp.eval(`
    const d=document.querySelector('.detail-card');
    return { exists: !!d, role: d && d.getAttribute('role'), modal: d && d.getAttribute('aria-modal'),
             focusIn: !!(document.activeElement && document.activeElement.closest && document.activeElement.closest('.detail-card')),
             closeFocused: !!(document.activeElement && document.activeElement.classList.contains('detail-close')),
             closeLabel: (()=>{const b=document.querySelector('.detail-close'); return b? b.getAttribute('aria-label'):null;})() };
  `);
  report(
    view.key,
    "Enter 打开弹层 + dialog 语义 + 焦点收拢",
    !!dlg.exists && dlg.role === "dialog" && dlg.modal === "true" && dlg.focusIn && dlg.closeFocused,
    `role=${dlg.role} aria-modal=${dlg.modal} 焦点在弹层=${dlg.focusIn}（落在关闭按钮=${dlg.closeFocused}，aria-label="${dlg.closeLabel}"）`,
  );
  await key(cdp, "Escape", "Escape");
  await new Promise((r) => setTimeout(r, 600));
  const back = await cdp.eval(`
    return { gone: !document.querySelector('.detail-card'),
             onCard: !!(document.activeElement && document.activeElement.classList.contains('card')) };
  `);
  report(
    view.key,
    "Escape 关闭后焦点归还卡片",
    !!back.gone && !!back.onCard,
    `弹层已关=${back.gone} 焦点回卡片=${back.onCard}`,
  );
  if (view.w > 768) {
    const before = await cdp.eval(
      `const b=document.querySelector('.app-body'); return b? b.scrollTop : window.scrollY;`,
    );
    await key(cdp, "ArrowDown", "ArrowDown");
    await new Promise((r) => setTimeout(r, 400));
    const after = await cdp.eval(
      `const b=document.querySelector('.app-body'); return b? b.scrollTop : window.scrollY;`,
    );
    report(
      view.key,
      "方向键逐行刷（G-14）",
      after > before,
      `scrollTop ${before} → ${after}（增 ${after - before}px）`,
    );
  }

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
  // 前置：dist 里的 CSS 必须不比源码旧。踩过一次 build 失败但 dist 是旧的，
  // 测台照样跑完并给出「看似有效」的读数——那种绿/红都不可信。
  const srcCss = path.join(REPO, "web", "src", "styles.css");
  const distCss = fs
    .readdirSync(path.join(DIST, "assets"))
    .filter((f) => f.endsWith(".css"))
    .map((f) => path.join(DIST, "assets", f))[0];
  if (distCss && fs.existsSync(srcCss) && fs.statSync(distCss).mtimeMs < fs.statSync(srcCss).mtimeMs) {
    console.error(
      `dist 里的 CSS（${path.basename(distCss)}）比 web/src/styles.css 旧 —— 先重新 npm run build（注意看退出码），再跑本闸`,
    );
    process.exit(1);
  }
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
      // 二轮 G7（2026-09-23 乙3）：去掉 --hide-scrollbars——旧闸对滚动条整体失明，
      // 甲5（系统条 vs 自绘条）、乙11（槽位策略）在旧口径下结构上测不到。
      // 样式化滚动条（10px 细条）占位与系统条不同，但 scrollbar-gutter:stable 让
      // 布局对两者都确定（改前实测含/不含两遍读数一致），所以去掉不影响其余断言口径。
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
    PAGE_URL = `http://127.0.0.1:${SRV_PORT}/`;
    await cdp.call("Page.navigate", { url: PAGE_URL });
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
