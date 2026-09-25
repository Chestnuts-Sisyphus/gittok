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
 * 用法（先建 dist；⚠ **不要再 cp data/feed.json 过去**）：
 *   cd D:/AI/QODER/1/os-feed/web && npm run build
 *   ⚠ 本闸以前在这里写着 `cp ../data/feed.json dist/data/feed.json` —— 那是**错的**：
 *     `npm run build` 会在构建期把 `copyOk` 标签打进 `dist/data/feed.json`，
 *     用仓库根的原始 `data/feed.json` 覆盖它会把标签洗掉 → 视觉闸的前置检查
 *     「copyOk 真值 0 张」立刻红（2026-09-24 四轮实操踩到）。CI 里有一条同名 E2 guard 写死这件事：
 *     「if this goes red, the gate is eating untagged data again — do not "fix" it by copying
 *      data/feed.json over dist; fix the build instead.」
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
/**
 * 四轮 T5（块4「植入即红自证」）：把一段 CSS 注入每一档的页面，用来**证明这条闸真的有鉴别力**。
 * 用法：`GITTK_INJECT_CSS=D:/tmp/gt-layout/r4/red-head-alltier.css pnpm responsive:check`
 *   → 该 CSS 应把某条断言打红；不红就说明断言是空转（〇块第 5/6 条的验收动作）。
 * 为什么用「注入 + 同一份断言代码」而不是另写一份探针：**断言只有一份真源**——
 * 另写探针会在闸改判据后失效，于是「自证」变成自欺（三轮 gt-observe-red.mjs 是那种形态的补丁版）。
 */
const INJECT_CSS = process.env.GITTK_INJECT_CSS
  ? fs.readFileSync(process.env.GITTK_INJECT_CSS, "utf8")
  : "";
/** 同上，但注入的是 **JS**（用来做 CSS 做不到的破坏：摘属性、改 DOM 结构）。
 *  用法：`GITTK_INJECT_JS=D:/tmp/gt-layout/r4/red/red-3-no-datacols.js pnpm responsive:check` */
const INJECT_JS = process.env.GITTK_INJECT_JS
  ? fs.readFileSync(process.env.GITTK_INJECT_JS, "utf8")
  : "";
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

/** ── 列数与卡宽的**预期表**（2026-09-24 四轮重写：由摘要契约反推）──────────────────
 *  栗子 09-24 定标准：「在卡片是两列及以上的时候说明屏幕有足够的宽度，这个时候应该保证所有摘要
 *  都能全部展示出来」＋「只要当宽度小于一列的时候，才应该被迫减少摘要的显示宽度」＋
 *  （红框）「这种空隙不允许出现」。
 *  ⇒ 规则不再是「卡宽落在某个区间」，而是两条**结构性不变式**（本节下面的断言直接判这两条）：
 *     R1 列数 ≥ 2 ⇒ 卡宽 ≥ FEED_COL_MIN（653px ＝ 一行放得下 35 字）⇒ 合规摘要必然一行读完；
 *     R2 列数 == 1 ⇒ 卡宽 == 网格宽（右侧零空档；红框那条）。
 *  第三道 R3：频道头/偏好条 == 网格宽（与卡片左右外缘对齐，甲A1 那条的推广）。
 *  预期表只列 cols/cardW（数值来自本机实测，容差 ±1px）；容量不再设「上限」——
 *  上限已由 R1 结构性地保证了（卡宽不会超过「再加一列就低于 653」的那个位置），
 *  故旧的 `capMax ≤ 38` 断言随之退役（那是「卡宽上限 700」时代的产物）。
 *  两列门槛：网格 ≥ 2×653+16 = **1322px**（＝视口 1594）；内容区上限跟顶栏口径 1650px，
 *  超宽屏由「侧栏＋内容整壳 1866px 居中」收边 ⇒ 三点五列以上永不出现，1920/2560 都是两列 793。 */
const FEED_COL_MIN = 653;
/** 单列档卡宽上限（2026-09-25 五轮，栗子「单列卡片的极限宽度按这个来」＝两列档那张卡）。
 *  ＝两列档在参照档（1920×1080、内容网格 1602）下的单卡宽 = (1602−16)/2 = 793。
 *  与 web/src/feed-layout.ts 的 FEED_CARD_MAX、styles.css 的 --feed-card-max 三处同值。 */
const FEED_CARD_MAX = 793;
/** ── 理由显示行数（2026-09-25 七轮新增，补的是丙C2「闸不判理由被截」这个漏网）────────
 *  理由的内容契约是 100–150 字（`REASON_MIN/MAX`，硬闸）；显示侧的行数**由卡宽反推**：
 *  `lines = ceil(150 / floor((卡宽 − 69) / 13.94))`，下限 3、上限 4（288 卡高的物理上限）。
 *  与 web/src/feed-layout.ts 的 FEED_REASON_MAX / FEED_REASON_CHAR_W / feedReasonLinesForCard()
 *  双写（lock 单测钉住前两者）。
 *  为什么必须有这条闸：09-25 之前显示侧固定 3 行，而 3 行只对卡宽 ≥766 成立 ⇒
 *  1600 档（卡宽 656）**72/837 张理由被省略号截掉（8.6%）**、1700 档 7/837；
 *  而旧闸只判「.reason 至少一行可见」，并把截断写成「设计内截断，不判」——四道闸全绿却线上真截。 */
const FEED_REASON_MAX = 150;
const FEED_REASON_CHAR_W = 16.66 * (0.82 / 0.98); // ≈13.94：摘要单字宽 × 字号比（0.82rem/0.98rem）
const FEED_CARD_CHROME = 69;
const FEED_REASON_LINES_MAX = 4;
/** 理由**能完整显示**所需的最小卡宽（让 4 行装下 150 字）＝ 69 + ceil(150/4)×13.94 ≈ 599。
 *  窄于它的档（手机档、窄高档）在 288 卡高里物理上装不下 150 字 ⇒ 那条档**不判** 0 截，
 *  但**照实记数**（skip 而不是 pass），免得「没判」被读成「过了」。 */
const FEED_REASON_FIT_MIN_CARD_W = Math.ceil(
  FEED_CARD_CHROME + Math.ceil(FEED_REASON_MAX / FEED_REASON_LINES_MAX) * FEED_REASON_CHAR_W,
);
const FEED_SHORT_MAX_HEIGHT = 560;
function feedReasonLinesExpected(cardW) {
  if (!(cardW >= FEED_REASON_FIT_MIN_CARD_W)) return 3; // 手机档：按设计收窄，不按契约反推（待裁）
  const perLine = Math.floor((cardW - FEED_CARD_CHROME) / FEED_REASON_CHAR_W);
  if (!(perLine > 0)) return 3;
  return Math.min(FEED_REASON_LINES_MAX, Math.max(3, Math.ceil(FEED_REASON_MAX / perLine)));
}
const FEED_CAPACITY_MIN = 24;
const EXPECT_DESKTOP = {
  "2560x1080": { cols: 2, cardW: 793, capMin: 43, capMax: 43 },
  "1920x1080": { cols: 2, cardW: 793, capMin: 43, capMax: 43 },
  "1600x900": { cols: 2, cardW: 656, capMin: 35, capMax: 35 },
  "1400x900": { cols: 1, cardW: 793, capMin: 43, capMax: 43 },
  "1343x900": { cols: 1, cardW: 793, capMin: 43, capMax: 43 },
  "1275x900": { cols: 1, cardW: 793, capMin: 43, capMax: 43 },
  "1200x900": { cols: 1, cardW: 793, capMin: 43, capMax: 43 },
  "1100x800": { cols: 1, cardW: 793, capMin: 43, capMax: 43 },
  "1000x800": { cols: 1, cardW: 728, capMin: 39, capMax: 39 },
  "900x800": { cols: 1, cardW: 628, capMin: 33, capMax: 33 },
  // 844×390 是 mobile:true 但 w>768 —— CSS 媒体查询按**宽度**走，844 用桌面栅格。
  "844x390": { cols: 1, cardW: 572, capMin: 30, capMax: 30 },
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
/** 每档 100% 缩放下的几何读数（四轮 T5 缩放档用它做基准比对，必须跨档留存）。 */
const READINGS = {};
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
    // 2026-09-24 四轮 T3：icon-only rail 已整体删除 ⇒ iconMode 恒 false（字段保留只为兼容旧读数）。
    const iconMode = !!sb && sbcs.display!=='none' && sbcs.visibility!=='hidden' && w > 0 && w <= 100;
    const items=[...document.querySelectorAll('.sidebar .side-item')].filter(e=>{
      const s=getComputedStyle(e); return s.display!=='none' && s.visibility!=='hidden';});
    // 四轮 T3 新判据用：每一项的 .side-text 可见宽度（收成 0 宽 = 只有图标没有中文 = 朱子图3 那条）
    const texts=items.map(e=>e.querySelector('.side-text')).filter(Boolean);
    const textW=texts.map(t=>Math.round(t.getBoundingClientRect().width));
    const tcs=texts.length? getComputedStyle(texts[0]):null;
    // 四轮 T2 新判据用：侧栏滚动条占位（定版＝0）与底缘渐隐 mask
    const box=sb? sb.querySelector('.side-group-box'):null;
    return {
      sidebarShown: !!sb && sbcs.display!=='none',
      sidebarW: sb? Math.round(sb.getBoundingClientRect().width):0,
      // 「塌缩态」= 手机档那个 width:0 + visibility:hidden 的形态（既不是 rail，也不该跑侧栏断言）
      collapsed: !!sb && (w === 0 || sbcs.visibility==='hidden'),
      iconMode,
      itemMinH: items.length? Math.min(...items.map(e=>Math.round(e.getBoundingClientRect().height))):0,
      itemsNoName: items.filter(e=>!e.getAttribute('aria-label') && !(e.textContent||'').trim()).length,
      itemsTotal: items.length,
      itemsWithZeroText: textW.filter(x=>x<=0).length,
      minTextW: textW.length? Math.min(...textW): 0,
      textFontSize: tcs? tcs.fontSize: null,
      sidebarSlot: sb? sb.offsetWidth - sb.clientWidth: -1,
      sidebarMaskOk: !!sbcs && String(sbcs.maskImage||sbcs.webkitMaskImage||'none').indexOf('linear-gradient')>=0,
      sidebarRight: sb? Math.round(sb.getBoundingClientRect().right): null,
      boxRight: box? Math.round(box.getBoundingClientRect().right): null,
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
  if (INJECT_CSS) {
    await cdp.call("Runtime.evaluate", { expression: `(()=>{ let s=document.getElementById('gt-red-inject');
      if(!s){ s=document.createElement('style'); s.id='gt-red-inject'; document.head.appendChild(s); }
      s.textContent=${JSON.stringify(INJECT_CSS)}; return s.textContent.length; })()` });
    await new Promise((r) => setTimeout(r, 350));
  }
  if (INJECT_JS) {
    await cdp.call("Runtime.evaluate", { expression: `(()=>{ ${INJECT_JS} })()` });
    await new Promise((r) => setTimeout(r, 350));
  }
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
            // 七轮 R5：理由**被截**要在**全部在 DOM 的卡**上数（不是抽样 12 张）——
            // scrollHeight > clientHeight 是 clamp/overflow:hidden 的确定性判据，且比 Range 逐字快。
            // 分母照实记进读数（〇块第 6 条：无样本 ≠ 通过；这里是「有几张就说几张」）。
            rAll: (()=>{ const els=[...document.querySelectorAll('.reason-clamped')];
              const clip=els.filter(el=>el.scrollHeight>el.clientHeight+1);
              return { n: els.length, clipped: clip.length,
                       lines: [...new Set(els.map(el=>{const lh=parseFloat(getComputedStyle(el).lineHeight)||1;
                              return Math.round(el.scrollHeight/lh);}))].sort((a,b)=>a-b) }; })(),
            reasonVar: (()=>{ const el=document.querySelector('.reason-clamped');
              return el? getComputedStyle(el).getPropertyValue('--feed-reason-lines').trim() : null; })(),
            cardW: cr.width, cardLeftInGrid: Math.round(cr.left-lr.left),
            gridW: list? list.clientWidth: 0, gridRightSlack: Math.round(lr.right-cr.right),
            cueW: cr2? cr2.width: 0, cueDelta: cr2? Math.round(Math.abs(cr2.left-cr.left)): null,
            cueRightDelta: cr2? Math.round(Math.abs(cr2.right-cr.right)): null,
            cols: tracks.length, tracks: tracks.map(t=>Math.round(parseFloat(t))),
            // 四轮 T5（乙B1/乙B2）：选择器/优先级的**生效性**必须读计算值，不能只 grep 源码。
            //   · dataCols：显式属性在不在（乙B2 的脆弱点＝整套分流靠 style 属性串匹配）
            //   · bandTrackOk：单列带「轨道收 700」这条规则**真的生效**了吗——改前它被同优先级
            //     晚写的 .feed-window > .feed-list 覆盖，读计算值是网格宽（928）而不是 700；
            //     视觉上没暴露（卡片自身 max-width:700 + justify-self:start 结果相同），
            //     只有读计算值才抓得到（〇块第 6 条「写了但没生效当缺陷处理」）。
            dataCols: list? list.getAttribute('data-cols'): null,
            bandTrackOk: (()=>{
              if (!list) return null;
              const m0 = tracks[0]? Math.round(parseFloat(tracks[0])): 0;
              const colsN = tracks.length;
              const gap = parseFloat(lcs.columnGap||'0')||0;
              // 多列档：每条轨道 = (网格−(n−1)gap)/n（轨道被 1fr 等分）
              if (colsN > 1) return Math.abs(m0 - (list.clientWidth-(colsN-1)*gap)/colsN) <= 1.5;
              // 单列档（>769）：轨道 = min(网格, 卡宽上限)（2026-09-25 起单列档收轨道到 793，
              // 栗子「单列卡片的极限宽度按这个来」；超出部分是轨道的居中留量，不再算「轨道内空档」）
              return Math.abs(m0 - Math.min(list.clientWidth, ${FEED_CARD_MAX})) <= 1.5;
            })(),
            ruleVars: (()=>{ if (!list) return null; const c=getComputedStyle(list); return {
              colsVar: c.getPropertyValue('--feed-cols').trim(),
              cardMaxVar: c.getPropertyValue('--feed-card-max').trim() }; })(),
           };
  `);
  READINGS[view.key] = m;
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
    // ── 2026-09-25 七轮 R4（加严）：单列档卡宽 **= min(网格, 793)** 且左右留量**对称** ──
    // 五轮的 R4 只有上界（≤793，单边），漏掉两种退化：
    //   ① 取消上限让卡片铺满网格（栗子 09-25 否掉的「太长了」）；
    //   ② 把 793 的卡**左对齐**丢在网格左边（栗子 09-24 明确否掉的「这种空隙不允许出现」，
    //      那时是 700 左对齐留 296px 右空档）。
    // 这条与 R1（多列档 ≥653）配对把卡宽夹在 [653, 793]；留量对称则锁住「余量作页边距」这条定版。
    // 余量本身（deadZone = 网格 − 卡宽）**消不掉**（三条口径不可兼得，见规格文件），
    // 所以它不做 FAIL 判据，只逐档记进读数 —— 让「中间带有多少留白」每次回归都有数，不再假装不存在。
    const deadZone = m.cols === 1 ? Math.round(m.gridW - Math.round(m.cardW)) : 0;
    const slackL = m.cardLeftInGrid;
    const slackR = Math.round(m.gridW - m.cardLeftInGrid - m.cardW);
    const symmetric = m.cols > 1 || Math.abs(slackL - slackR) <= 2;
    // deadZone 进读数（G9 表与规格文件的数字来源；中间带留白每次回归都有数）
    READINGS[view.key] = { ...m, deadZone, slackLeft: slackL, slackRight: slackR };
    report(
      view.key,
      `R4 单列档卡宽 = min(网格, ${FEED_CARD_MAX}) 且左右留量对称（七轮加严）`,
      m.cardW <= FEED_CARD_MAX + 1.5 && symmetric,
      `卡宽 ${Math.round(m.cardW)}px（上限 ${FEED_CARD_MAX}px）` +
        (m.cols > 1
          ? "（多列档由 R1+列数规则管，本档不判）"
          : `｜网格 ${m.gridW}px ⇒ 留量 ${deadZone}px（deadZone，左 ${slackL} / 右 ${slackR}，对称 ${symmetric ? "✓" : "✗"}）`) +
        `｜改前实测：1500 档卡宽 1228（栗子：「这个太长了」）；左对齐 700 留 296px 右空档（栗子 09-24：「这种空隙不允许出现」）`,
    );
    // ── 2026-09-25 七轮 R5：**理由按卡宽反推行数 + 桌面档 0 被截** ──
    // 这是丙C2 的漏网：旧闸只判「.reason 至少一行可见」，把 clamp 截断写成「设计内截断，不判」，
    // 于是 1600/1700 两档理由真被截（72/837、7/837）而四道闸全绿。
    // 两段判法（〇块第 6 条「无样本 ≠ 通过」）：
    //   A 段 该档**装得下**（该档行数 × 每行容量 ≥ 150 且不是窄高档）⇒ 判 0 被截，截一张就红；
    //   B 段 物理上装不下（手机档 / ≤560 窄高档的 2 行）⇒ **不判**，但把张数与行数照实记进读数。
    const reasonExp = feedReasonLinesExpected(m.cardW);
    const perLine = Math.floor((m.cardW - FEED_CARD_CHROME) / FEED_REASON_CHAR_W);
    const reasonCapacity = reasonExp * Math.max(0, perLine);
    const reasonJudgeable = view.h > FEED_SHORT_MAX_HEIGHT && reasonCapacity >= FEED_REASON_MAX;
    const reasonLines = m.rAll?.lines ?? [];
    const reasonFits = reasonLines.length > 0 && Math.max(...reasonLines) <= reasonExp;
    const r5detail =
      `--feed-reason-lines=${m.reasonVar ?? "?"}（期望 ${reasonExp}）｜在 DOM 的理由 ${m.rAll?.n ?? 0} 张，` +
      `被截 ${m.rAll?.clipped ?? "?"} 张｜实占行数 ${JSON.stringify(reasonLines)}` +
      `｜口径：lines = ceil(150 / floor((卡宽−69)/13.94))，上下限 3–4（288 卡高上限）` +
      `｜改前：3 行固定 ⇒ 1600 档 72/837 被截（8.6%）、1700 档 7/837`;
    if (reasonJudgeable) {
      report(view.key, `R5 理由行数按卡宽反推且 0 被截（卡宽 ${Math.round(m.cardW)}px ⇒ ${reasonExp} 行）`, reasonFits && m.rAll.clipped === 0, r5detail);
    } else {
      skip(
        view.key,
        `R5 理由 0 被截（本档不判：${view.h <= FEED_SHORT_MAX_HEIGHT ? `窄高档 ${view.h}px ≤ ${FEED_SHORT_MAX_HEIGHT}，clamp 收到 2 行` : `卡宽 ${Math.round(m.cardW)}px 装不下 150 字`}）`,
        `该档容量 ${reasonExp} 行 × ${perLine} 字 = ${reasonCapacity} 字 < ${FEED_REASON_MAX}｜` + r5detail,
      );
    }
    const exp = EXPECT_DESKTOP[view.key];
    const expCap = exp?.capMax ?? 99;
    // ── 2026-09-24 四轮 R1：列数 ≥ 2 ⇒ 卡宽 ≥ 653（＝一行放得下 35 字） ──
    // 旧闸这里是一条「容量 ≤38 字」的上限（「卡宽上限 700」时代的产物）。四轮把上限改成**结构性**的：
    // 卡宽上限这个概念已删除，宽度只由列数决定，而列数规则保证「再加一列就会掉到 653 以下」——
    // 于是"摘要能不能一行读完"由 R1 直接锁住，不再需要一个人工上限数字（栗子 09-24 的标准）。
    const r1 = m.cols === 1 || m.cardW >= FEED_COL_MIN - 1.5;
    report(
      view.key,
      `R1 多列档卡宽 ≥ ${FEED_COL_MIN}px（＝一行放得下 ${35} 字，栗子 09-24 标准）`,
      r1,
      `列数 ${m.cols}｜卡宽 ${Math.round(m.cardW)}px` +
        (m.cols === 1 ? "（单列档不受此约束）" : `（阈值 ${FEED_COL_MIN}px，余量 ${(m.cardW - FEED_COL_MIN).toFixed(1)}px）`) +
        `｜一行容量 min ${capMin} 字`,
    );
    report(
      view.key,
      `卡宽符合预期表（甲1）`,
      !!exp && Math.abs(m.cardW - exp.cardW) <= 1,
      `卡宽 ${Math.round(m.cardW)}px（预期 ${exp ? exp.cardW : "?"}）` +
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
            : `实测 左缘差 ${m.cueDelta}px、右缘差 ${m.cueRightDelta}px → ${cueAlignsCard ? `对齐 ✓（条与卡同宽 ${Math.round(m.cardW)}px；09-25 起单列档的卡宽上限由**内容容器**承担，超出部分变成左右对称的页边距）` : "❌ 卡片与上面的条错位"}`
          : `多列填满行 ✓`),
    );
    // ── 2026-09-24 四轮 T5（甲A1 / 乙B5）+ 四轮 R3：**头/偏好条 == 网格宽（全档）** ──
    // 这条是本轮图1 的漏网根因：旧闸在多列档只判「列数」，从不判头宽，于是三轮把频道头写成
    // 全档 max-width:700（多列档只剩网格的 43%–71%）时四道闸全绿。
    // 判据（任务书 T1 验收①）：多列档 |cueW − gridW| ≤ 2px；单列档由上面那条「头 ≡ 卡」管。
    if (m.cols > 1) {
      const dHead = m.cueW ? Math.abs(m.cueW - m.gridW) : null;
      report(
        view.key,
        "多列档频道头/偏好条铺满网格（headW == gridW ±2px，甲A1/乙B5）",
        dHead !== null && dHead <= 2,
        m.cueW
          ? `头宽 ${Math.round(m.cueW)}px vs 网格 ${m.gridW}px（差 ${dHead?.toFixed(1)}px）｜列数 ${m.cols}` +
            `｜改前实测：1500×520 头 700/网格 1228（43%）、1600×900 头 700/网格 1328`
          : "本档无频道头/偏好条可测（不判）",
      );
    }
    // ── 2026-09-24 四轮 T5（乙B1/乙B2）：「写了但没生效」类缺陷的计算值级检查 ──
    // 换掉按源码 grep 的判法：读 getComputedStyle 的轨道与 DOM 上的 data-cols，再反算期望值。
    //   ① data-cols 必须存在且与计算出的列数一致（乙B2：不再依赖 React 序列化出的属性串空格）
    //   ② 单列档（>768）轨道必须是 min(700, 网格) —— 乙B1 那条从未生效的规则现在必须生效
    //      （改前 1200 档读数是网格宽 928 而不是 700）
    const dataColsOk = String(m.dataCols) === String(m.cols);
    report(
      view.key,
      "列数分流用显式属性 data-cols（乙B2）+ 轨道规则真的生效（乙B1，读计算值）",
      dataColsOk && m.bandTrackOk === true,
      `data-cols="${m.dataCols}"（列数 ${m.cols}，一致 ${dataColsOk}）｜轨道 ${JSON.stringify(m.tracks)} 网格 ${m.gridW}px` +
        `｜判据轨道 ${m.cols > 1 ? `= (网格−(n−1)gap)/n` : `= 网格宽 ${m.gridW}（单列铺满＝R2）`} →` +
        ` ${m.bandTrackOk ? "生效 ✓" : "❌ 规则被覆盖/未生效（读的是源码还是计算值？）"}` +
        `｜--feed-cols=${m.ruleVars?.colsVar} --feed-card-max=${m.ruleVars?.cardMaxVar}`,
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
    // 四轮 T5：手机档同样纳进「头 ≡ 卡」与「data-cols 在场」两条——三轮「跨 768 无瞬跳」的成果
    // 依赖 ≤768 的头也是 700（与 769 档相同），而 `:has(.feed-list[data-cols="1"])` 正是那个开关：
    // 手机档若丢掉 data-cols，头会从 700 变回满宽（736），跨 768 立刻回到 36–44px 瞬跳。
    const cueCardMobile = m.cueW ? Math.abs(m.cueW - m.cardW) <= 2 : null;
    report(
      view.key,
      "手机档频道头 ≡ 卡片宽（±2px）且 data-cols 在场（跨 768 连续的开关，四轮 T5）",
      String(m.dataCols) === String(m.cols) && cueCardMobile !== false,
      `data-cols="${m.dataCols}"（列数 ${m.cols}）｜头宽 ${m.cueW ? Math.round(m.cueW) : "无"} vs 卡宽 ${Math.round(m.cardW)}px` +
        `｜≤768 的头必须是 700（=卡宽）：这样越过 768 进单列带时头不动 → 无瞬跳`,
    );
    // 七轮：手机档的理由被截**照实记数但不判红**——卡宽 358 下 150 字的理由要 6 行，
    // 而手机档按既有设计收窄（与摘要一行容量 19<20 同类，六轮 G9① 待栗子裁）。
    // 用 skip 而不是 report：这不是「过了」，是「本轮明确不判」——口径写在这里，别当成绿灯。
    skip(
      view.key,
      "理由被截（手机档不判：按设计收窄，六轮 G9① 待裁）",
      `在 DOM 的理由 ${m.rAll?.n ?? 0} 张，被截 ${m.rAll?.clipped ?? "?"} 张｜实占行数 ${JSON.stringify(m.rAll?.lines ?? [])}` +
        `｜--feed-reason-lines=${m.reasonVar ?? "?"}（手机档固定 3 行，不按契约反推）`,
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

  // 4.5 二轮 G3/G4/G5 断言（2026-09-23）：侧栏排版 / 底栏不透明 / 滚动条样式（甲3/甲4/甲5）
  // ── 2026-09-24 四轮 T3：旧断言是「**图标栏**触控 ≥44 / 有可访问名 / 分组短横线」三条，
  //    只在 iconMode（侧栏宽 ≤100px）时跑。T3 删除了 icon-only rail（769–900 改用带文字的
  //    192 侧栏，理由见 styles.css 的「整体删除」注释）⇒ iconMode 恒 false，那三条**永不再执行**。
  //    这正是〇块第 5 条说的「闸漏网＝流程缺口」：形态没了，闸必须跟着换。
  //    新判据直接对着朱子图3 的原话「明明有足够大的空间却没有中文说明只有图标」：
  //      ① 每一项都必须有可见中文（.side-text 宽 > 0）——**任何**桌面档都不许再出现纯图标
  //      ② 侧栏不出条（四轮 T2 定版）且底缘渐隐在场
  //      ③ 触控目标 ≥44 与可访问名保留（既是既有决定，也不许退化）
  const cd = await cdp.eval(`return window.__gt.chromeDetail();`);
  if (cd.sidebarShown && !cd.collapsed) {
    report(
      view.key,
      "侧栏每一项都有可见中文（朱子图3：不许只有图标没有中文，四轮 T3）",
      cd.itemsTotal > 0 && cd.itemsWithZeroText === 0 && cd.minTextW >= 8,
      `项 ${cd.itemsWithZeroText}/${cd.itemsTotal} 项文字宽为 0（要求 0）｜最小文字宽 ${cd.minTextW}px` +
        `｜侧栏宽 ${cd.sidebarW}px｜字号 ${cd.textFontSize}` +
        `｜改前 rail 档（769–900）实测 9/9 项文字宽全为 0（D:/tmp/gt-layout/r4/三图复现.json）`,
    );
    report(
      view.key,
      "侧栏触控目标 ≥44px 且有可访问名称（保留既有决定，不许退化）",
      cd.itemMinH >= 44 && cd.itemsNoName === 0,
      `side-item 最小高 ${cd.itemMinH}px｜无名按钮 ${cd.itemsNoName} 个`,
    );
    // ── 四轮 T2 定版（甲A2）：侧栏**不出条** + 底缘渐隐 ──
    // 旧病象（1500×520 矮视口）：条占 208–216，与玻璃盒右缘 196 只隔 12px，一条亮条站在空档里。
    report(
      view.key,
      "侧栏不出滚动条 + 底缘渐隐在场（甲A2，四轮 T2 定版）",
      cd.sidebarSlot === 0 && cd.sidebarMaskOk,
      `侧栏滚动条占位 ${cd.sidebarSlot}px（定版＝0）｜mask 含 linear-gradient ${cd.sidebarMaskOk}` +
        `｜盒右缘 ${cd.boxRight}｜侧栏右缘 ${cd.sidebarRight}` +
        `｜判据来源：两版注入截图对比（D:/tmp/gt-layout/r4/设计pass/inj-t2v1.json）`,
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

    // ── 6 缩放档（四轮 T5③ / 乙B9）：页面缩放 125%/150% 下几何必须与 100% 档**逐值一致** ──
    // 为什么需要：三轮所有档都在 DPR=1、无缩放的无头环境跑，而朱子的截图来自真实浏览器
    // （可能 125% 缩放）。真实浏览器缩放会把 CSS 视口变小（物理 1500 宽的窗口在 150% 下
    // innerWidth ≈ 1000），媒体查询按 CSS px 走 ⇒ 形态向窄档迁移。这里查的是另一半：
    // 固定 CSS 视口、只改 deviceScaleFactor，几何**不许**变（DPR 只能影响渲染清晰度）。
    // 这一条若挂，说明某处用了设备像素做布局决策 ⇒ 真机缩放下必然错档。
    if (!ONLY) {
      // ⚠ 这段是 cdp.eval 的**函数体**（外层已包 IIFE），不要再自己包一层 IIFE——包了会静默返回 undefined。
      const ZOOM_MEASURE = `const list=document.querySelector('.feed-list');
        const card=document.querySelector('.card');
        const cue=document.querySelector('.feed-content > .channel-head, .feed-content > .pref-prompt, .feed-content > .status');
        const lcs=list? getComputedStyle(list): null;
        const tracks=lcs? lcs.gridTemplateColumns.split(' ').filter(Boolean): [];
        return { cols: tracks.length, gridW: list? list.clientWidth: 0,
                 cardW: card? Math.round(card.getBoundingClientRect().width): 0,
                 cueW: cue? Math.round(cue.getBoundingClientRect().width): 0,
                 dataCols: list? list.getAttribute('data-cols'): null };`;
      for (const z of [{ w: 1600, h: 900, dsf: 1.25 }, { w: 1275, h: 900, dsf: 1.5 }, { w: 900, h: 800, dsf: 1.25 }]) {
        const base = READINGS[`${z.w}x${z.h}`];
        if (!base) continue;
        await cdp.call("Emulation.setDeviceMetricsOverride", {
          width: z.w, height: z.h, deviceScaleFactor: z.dsf, mobile: false,
        });
        await new Promise((r) => setTimeout(r, 700));
        const zm = await cdp.eval(ZOOM_MEASURE);
        const same =
          zm.cols === base.cols &&
          Math.abs(zm.gridW - base.gridW) <= 1 &&
          Math.abs(zm.cardW - Math.round(base.cardW)) <= 1 &&
          Math.abs(zm.cueW - Math.round(base.cueW)) <= 2 &&
          String(zm.dataCols) === String(base.dataCols);
        report(
          `${z.w}x${z.h}@${z.dsf}x`,
          "缩放档几何与 100% 档一致（DPR 不参与布局决策，四轮 T5③/乙B9）",
          same,
          `DPR ${z.dsf}：cols ${zm.cols}(基准 ${base.cols})｜网格 ${zm.gridW}(基准 ${base.gridW})` +
            `｜卡宽 ${zm.cardW}(基准 ${Math.round(base.cardW)})｜头宽 ${zm.cueW}(基准 ${Math.round(base.cueW)})` +
            `｜data-cols ${zm.dataCols}(基准 ${base.dataCols})`,
        );
      }
      await cdp.call("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
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
