/**
 * GitTok 动效闸·动画窗重排判据（16-13，2026-10-02 十六轮）——「字移动」这类问题的根治闸。
 *
 * 背景（十五轮真机取证）：关闭动画 v4 的 replica 用**布局动画**（left/top/width 走 WAAPI）
 * 逐帧重折行——real trace Layout 46 次/110 帧、headless 17 次/38 帧，「每帧一次 reflow」
 * 就是栗子看到的「字因为卡片的改变在不停的移动，这样看着让人眼花」。甲调参灭不了
 * （A/B 实证：Layout 次数不随曲线/时长变）。十六轮乙路线＝replica 一步定位源卡盒＋
 * transform 飞行（零重排）后，动画窗 Layout 降到 0。
 *
 * 判据（四条 + 样本有效性；「无样本 ≠ 通过」09-20 纪律）：
 *   α 机制选型（一类问题根治）：**动画窗内所有在跑的动画**，被动画的属性 ⊆ {transform, opacity}
 *     ——凡动 left/top/width/height/margin/padding/font-size/line-height/… 任一布局属性即 FAIL。
 *     transform 类动效的机制选型判据闸化：想做动画就只许走合成器属性，从源头堵死逐帧重排。
 *   β 零重排直接形态（字不动）：飞行物的**布局坐标**（offsetLeft/Top/Width/Height——transform
 *     打不着它们）逐帧恒定；内容部件（摘要/理由/元信息/标签）的排版坐标同样零漂移。
 *   γ 「动画窗 Layout 增量=0」（具名判据，trace 直读）：devtools.timeline 的 Layout 事件在
 *     点击+30ms..+230ms（全部飞行帧；60/165Hz 下均严格位于 mount 提交与 finished 交接提交之间）
 *     计数 == 0。对照口径：v4 现役该窗 44 次（D:/tmp/gt-layout/r16/real/ 复算可得）。
 *   δ 末帧像素连续（close 场景）：飞行物末帧视觉盒 == 源卡实时盒 ±0.5px（像素交接不破，
 *     十四轮五轮抗战的成果不许丢）。
 *   ε 交接同源（十八轮，2026-10-05）：飞行窗内副本内容 == 真卡内容——innerHTML 逐字节相等、
 *     .card-badge 数相等、owner 元素同标签。根治「副本靠人工枚举 props 重建必漏」（十七轮探针
 *     实锤：徽章 0vs1、owner SPANvsBUTTON、innerHTML 2442vs2826 ⇒ 复验问题①频道徽章交接后才
 *     「闪现」）；十八轮副本改源卡 DOM 快照克隆后此判据由构造保证，闸防回归（禁回手工枚举老路）。
 *
 * 场景：关闭 ×2（P0 主对象）＋打开 ×1（对照——打开动画同为 transform 类，顺带受 α/β/γ 保护）。
 * 用法：pnpm motion:check ｜ node scripts/gittok-motion-reflow-check.mjs --tag=xxx
 * 退出码：有 FAIL → 1。
 * 环境变量与其余闸同族：CHROME_PATH / GITTK_REPO / GITTK_DIST / GITTK_MOTION_OUT / GITTK_MOTION_PORT / GITTK_MOTION_CDP。
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
const OUT = process.env.GITTK_MOTION_OUT || path.join(REPO, "tmp", "motion-reflow");
const SRV_PORT = Number(process.env.GITTK_MOTION_PORT || 19220);
const CDP_PORT = Number(process.env.GITTK_MOTION_CDP || 19420);

const TAG = (() => {
  const a = process.argv.find((x) => x.startsWith("--tag="));
  return a ? a.slice(6) : new Date().toISOString().replace(/[:.]/g, "-");
})();

/** α 的禁集：动画窗内任何动画都不许碰这些（合成器属性之外＝逐帧重排的机制来源）。 */
const FORBID_PROPS = new Set([
  "left", "top", "right", "bottom", "width", "height", "margin", "margin-top", "margin-left",
  "padding", "padding-top", "padding-left", "font-size", "line-height", "letter-spacing",
  "word-spacing", "border-width", "gap", "flex-basis", "grid-template-columns", "column-count",
  "text-indent", "word-break", "overflow-wrap",
]);
/** γ 的动画窗（相对 click 的 ms）：60Hz/165Hz 下均严格含全部飞行帧、避开 mount/finished 两次边界提交。
 *  依据：16-3 实测 close 三次 trial 的 Layout 全部落在 [1.0,1.7]（replica mount 提交）与
 *  [245.8,260.4]（finished→onClose 卸载交接提交）——中段 [30,230] 恒空；v4 同窗 44 次。 */
const WIN_FROM_MS = 30;
const WIN_TO_MS = 230;
const MIN_REPLICA_FRAMES = 8;

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
  call(m, p = {}, timeoutMs = 15000) {
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
  onEvent(h) {
    this.handlers.push(h);
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

/** 采样器：逐帧记飞行物的视觉盒＋布局坐标＋子树动画属性审计（α 的输入）。
 *  ⚠ META 名单必须**内联在页面侧**——本串在浏览器里求值，引用 Node 侧常量会
 *  ReferenceError 被 catch 吞掉、keys 恒空（16-13 首跑踩过，α 假红）。 */
const RECORDER = `
  window.__motion = (() => {
    const META = new Set(['offset', 'easing', 'composite', 'computedOffset', 'progress']);
    let frames = [], on = false, raf = 0, rootSel = '';
    const pick = () => {
      const root = document.querySelector(rootSel);
      if (!root) return null;
      const r = root.getBoundingClientRect();
      const rec = {
        t: performance.now(),
        vis: { l: +r.left.toFixed(2), t: +r.top.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
        lay: { l: root.offsetLeft, t: root.offsetTop, w: root.offsetWidth, h: root.offsetHeight },
        props: {},
      };
      // 内容排版坐标（transform 打不着）：部件相对各自 offsetParent 的布局值
      rec.parts = ['.summary', '.detail-summary', '.reason-clamped', '.detail-reason', '.card-meta', '.detail-meta', '.card-tags', '.detail-topics', '.card-header', '.detail-header']
        .map((s) => { const el = root.querySelector(s); return el ? [s, el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight] : null; })
        .filter(Boolean);
      // α：子树上所有在跑的动画，逐条记被动画属性
      for (const a of document.getAnimations()) {
        const tgt = a.effect && a.effect.target;
        if (!tgt || (tgt !== root && !root.contains(tgt))) continue;
        let keys = [];
        try { keys = (a.effect.getKeyframes ? a.effect.getKeyframes() : []).flatMap((k) => Object.keys(k).filter((x) => !META.has(x))); } catch {}
        const name = String(tgt.className || tgt.nodeName).slice(0, 32);
        rec.props[name] = Array.from(new Set([...(rec.props[name] || []), ...keys]));
      }
      return rec;
    };
    return {
      start(sel) { rootSel = sel; frames = []; on = true; raf = requestAnimationFrame(function loop() { if (!on) return; const r = pick(); if (r) frames.push(r); raf = requestAnimationFrame(loop); }); },
      stop() { on = false; cancelAnimationFrame(raf); return frames; },
    };
  })();
  return 1;
`;

/** trace 段：Layout 事件计数（γ 判据）。 */
function mkTrace(cdp) {
  const chunks = [];
  let complete = 0;
  cdp.onEvent((m) => {
    if (m.method === "Tracing.dataCollected" && m.params?.value) chunks.push(...m.params.value);
    if (m.method === "Tracing.tracingComplete") complete++;
  });
  return {
    async start() {
      chunks.length = 0;
      await cdp.call("Tracing.start", {
        traceConfig: { recordMode: "recordContinuously", includedCategories: ["devtools.timeline"] },
      });
    },
    async stop() {
      const base = complete;
      await cdp.call("Tracing.end");
      for (let i = 0; i < 75 && complete === base; i++) await new Promise((r) => setTimeout(r, 200));
      if (complete === base) throw new Error("tracingComplete 超时");
      return chunks.slice();
    },
  };
}

/** 真实鼠标点击（CDP Input）——trace 里留下 EventDispatch(click)，γ 用它锚定动画窗时钟。 */
async function realClick(cdp, selector) {
  const r = await cdp.eval(
    `const el = document.querySelector('${selector}'); if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.left + b.width / 2), y: Math.round(b.top + b.height / 2) };`,
  );
  if (!r) throw new Error(`找不到 ${selector}`);
  await cdp.call("Input.dispatchMouseEvent", { type: "mousePressed", x: r.x, y: r.y, button: "left", clickCount: 1 });
  await cdp.call("Input.dispatchMouseEvent", { type: "mouseReleased", x: r.x, y: r.y, button: "left", clickCount: 1 });
}

/** γ：动画窗 Layout 计数。窗锚＝trace 内最后一次 EventDispatch(click) 的 ts。 */
function layoutInWindow(evs, fromMs, toMs) {
  const xs = evs.filter((e) => e.ph === "X" && typeof e.dur === "number");
  const clicks = xs.filter((e) => e.name === "EventDispatch" && e.args?.data && /click/i.test(e.args.data.type || ""));
  if (!clicks.length) return { error: "trace 内无 EventDispatch(click)——锚点缺失，判据不成立" };
  const anchor = clicks[clicks.length - 1].ts;
  const layouts = xs.filter((e) => e.name === "Layout");
  const rel = layouts.map((l) => (l.ts - anchor) / 1000);
  return {
    anchorFound: true,
    total: layouts.length,
    relMs: rel.map((x) => +x.toFixed(1)),
    inWindow: rel.filter((x) => x >= fromMs && x <= toMs).length,
  };
}

const diffMax = (a, b, keys) => Math.max(...keys.map((k) => Math.abs((a?.[k] ?? 0) - (b?.[k] ?? 0))));

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
      "--force-device-scale-factor=1",
      `--remote-debugging-port=${CDP_PORT}`,
      "--remote-allow-origins=*",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
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
    await cdp.call("Emulation.setDeviceMetricsOverride", {
      width: 1400,
      height: 760,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.call("Page.navigate", { url: `http://127.0.0.1:${SRV_PORT}/` });
    for (let i = 0; i < 60; i++) {
      const n = await cdp.eval(`return document.querySelectorAll('.feed-col > .card').length;`).catch(() => 0);
      if (n >= 4) break;
      await new Promise((r) => setTimeout(r, 500));
    }
    await cdp.eval(RECORDER);

    const scenarios = [
      { name: "关闭", open: true, clickSel: ".detail-close", rootSel: ".close-replica", endSel: ".feed-col > .card", trials: 2 },
      { name: "打开", open: false, clickSel: ".feed-col > .card", rootSel: ".detail-mover", endSel: ".detail-mover", trials: 1 },
    ];

    for (const sc of scenarios) {
      for (let trial = 0; trial < sc.trials; trial++) {
        const tag = `${sc.name}-${trial}`;
        if (sc.open) {
          await cdp.eval(`(() => { const c = document.querySelectorAll('.feed-col > .card')[0]; if (c) c.click(); return true; })()`);
          await new Promise((r) => setTimeout(r, 1200));
          // 关闭前：源卡实时盒（δ 的对照物）
          var liveBox = await cdp.eval(`
            const c = document.querySelector('.feed-col > .card');
            const r = c.getBoundingClientRect();
            return { l: +r.left.toFixed(2), t: +r.top.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
          `);
        }
        const trace = mkTrace(cdp);
        await trace.start();
        await cdp.eval(`window.__motion.start('${sc.rootSel}'); return true;`);
        await realClick(cdp, sc.clickSel);
        // ε 交接同源（close 场景）：副本只在飞行 240ms 内存在——点击后立即轮询抓首个在场
        // 样本，与仍处 is-open-source 的源卡逐项对账（源卡在交接提交前一直挂着该类，可按
        // 类引用采样；末帧「类移除与卸载之间的微任务窗」失明问题只影响 END 采样，不影响这里）。
        let eps = null;
        if (sc.open) {
          for (let i = 0; i < 40 && !eps; i++) {
            eps = await cdp
              .eval(`
                const rep = document.querySelector('.close-replica > .card');
                const src = document.querySelector('.feed-col > .card.is-open-source');
                if (!rep || !src) return null;
                const badges = (el) => el.querySelectorAll('.card-badge').length;
                const ownerTag = (el) => el.querySelector('.repo-owner-btn')?.tagName || null;
                return { inner: rep.innerHTML === src.innerHTML, repLen: rep.innerHTML.length, srcLen: src.innerHTML.length,
                         repBadges: badges(rep), srcBadges: badges(src), repOwner: ownerTag(rep), srcOwner: ownerTag(src) };
              `)
              .catch(() => null);
            if (!eps) await new Promise((r) => setTimeout(r, 15));
          }
        }
        await new Promise((r) => setTimeout(r, 900));
        const frames = await cdp.eval(`return window.__motion.stop();`);
        let evs = [];
        try {
          evs = await trace.stop();
        } catch (e) {
          report(`${tag} trace 采集`, false, String(e).slice(0, 120));
          continue;
        }
        fs.writeFileSync(path.join(OUT, `frames-${tag}.json`), JSON.stringify(frames, null, 1), "utf8");

        // 样本有效性
        report(`${tag} 样本有效性（飞行帧 ≥${MIN_REPLICA_FRAMES}）`, frames.length >= MIN_REPLICA_FRAMES, `实测 ${frames.length} 帧`);

        // α 机制选型：动画窗内所有在跑动画的被动画属性 ⊆ {transform, opacity}
        const union = new Map();
        for (const f of frames)
          for (const [k, v] of Object.entries(f.props || {}))
            union.set(k, Array.from(new Set([...(union.get(k) || []), ...v])));
        const bad = [];
        for (const [k, v] of union) for (const p of v) if (FORBID_PROPS.has(p)) bad.push(`${k}:${p}`);
        const propSet = Array.from(new Set([...union.values()].flat()));
        report(
          `α ${tag} 动画窗被动画属性 ⊆ {transform, opacity}（机制选型）`,
          propSet.length > 0 && bad.length === 0,
          `属性集=${JSON.stringify(propSet)}${bad.length ? "｜违规=" + JSON.stringify(bad) : ""}`,
        );

        // β 零重排：布局盒＋内容排版坐标逐帧恒定
        let layDrift = 0, partDrift = 0;
        const f0 = frames[0];
        for (const f of frames) {
          layDrift = Math.max(layDrift, diffMax(f.lay, f0.lay, ["l", "t", "w", "h"]));
          for (let i = 0; i < Math.min(f.parts.length, f0.parts.length); i++)
            for (let j = 1; j <= 4; j++) partDrift = Math.max(partDrift, Math.abs((f.parts[i]?.[j] ?? 0) - (f0.parts[i]?.[j] ?? 0)));
        }
        report(`β ${tag} 飞行物布局盒逐帧恒定（零重排）`, frames.length > 1 && layDrift === 0, `布局漂移最大=${layDrift}px`);
        report(`β ${tag} 内容排版坐标逐帧恒定（字不动）`, frames.length > 1 && partDrift === 0, `内容布局漂移最大=${partDrift}px`);

        // γ 动画窗 Layout 增量=0（trace 直读）
        const g = layoutInWindow(evs, WIN_FROM_MS, WIN_TO_MS);
        if (g.error) {
          report(`γ ${tag} 动画窗(${WIN_FROM_MS}–${WIN_TO_MS}ms) Layout 增量=0`, false, g.error);
        } else {
          report(
            `γ ${tag} 动画窗(${WIN_FROM_MS}–${WIN_TO_MS}ms) Layout 增量=0`,
            g.inWindow === 0,
            `窗内 ${g.inWindow} 次｜全 trace ${g.total} 次（相对点击 ms：${JSON.stringify(g.relMs)}）`,
          );
        }

        // δ 末帧像素连续（close 场景）
        if (sc.open) {
          const last = frames[frames.length - 1];
          const d = last && liveBox ? { l: Math.abs(last.vis.l - liveBox.l), t: Math.abs(last.vis.t - liveBox.t), w: Math.abs(last.vis.w - liveBox.w), h: Math.abs(last.vis.h - liveBox.h) } : null;
          report(
            `δ ${tag} 末帧视觉盒==源卡实时盒 ±0.5px`,
            !!d && d.l <= 0.5 && d.t <= 0.5 && d.w <= 0.5 && d.h <= 0.5,
            d ? `Δ=${JSON.stringify(d)}` : "无对照盒",
          );

          // ε 交接同源：副本内容==真卡（innerHTML 逐字节＋徽章数＋owner 标签）
          report(
            `ε ${tag} 副本内容==真卡（innerHTML/徽章/owner）`,
            !!eps && eps.inner && eps.repBadges === eps.srcBadges && eps.repOwner === eps.srcOwner,
            eps
              ? `innerHTML ${eps.repLen}vs${eps.srcLen}｜徽章 ${eps.repBadges}vs${eps.srcBadges}｜owner ${eps.repOwner || "-"}vs${eps.srcOwner || "-"}`
              : "未抓到飞行窗样本（副本缺席或轮询未命中）",
          );
        }
      }
    }
  } finally {
    chrome.kill();
    server.close();
  }

  fs.writeFileSync(
    path.join(OUT, `motion_${TAG}.json`),
    JSON.stringify({ at: new Date().toISOString(), results: RESULTS }, null, 2),
  );
  const failed = RESULTS.filter((r) => !r.ok);
  console.log(`\n=== 汇总 ===\n断言 ${RESULTS.length} 项｜FAIL ${failed.length} 项`);
  for (const f of failed) console.log(`  FAIL ${f.name} ${f.detail}`);
  console.log(`读数 ${path.join(OUT, `motion_${TAG}.json`)}`);
  console.log(failed.length === 0 ? "=== 动效重排判据全 PASS ===" : "=== 存在 FAIL ===");
  process.exit(failed.length === 0 ? 0 : 1);
}

void main();
