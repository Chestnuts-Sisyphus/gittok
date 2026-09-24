#!/usr/bin/env python3
"""GitTok 视觉改造验收脚本（执行者用，本地全量验证）。

用途：验证前端视觉改造是否达标。自动化完成：
1. 软渲染（--disable-gpu，模拟 Tabbit）hover 帧率断言
2. 软渲染滚动帧率断言
3. 关键 CSS 视觉断言（computedStyle）
4. 全页面截图（首页/搜索/我的/创作者/详情/移动端）保存到 shots/
5. GPU 环境 hover 帧率断言

前置（任务书已写明）：
- cd D:/AI/QODER/1/os-feed/web && npm run build
- cp ../data/feed.json dist/data/feed.json（真实数据）
- cp ../data/following.json dist/data/following.json 2>/dev/null

本机跑法（2026-09-23 补齐依赖：此前 `import websocket` → ModuleNotFoundError，
整条视觉闸在本机跑不起来、只跑了响应式闸，视觉面等于没验收）：
    # 依赖装进**仓内 venv**（本机纪律：不许全局 pip install；--system-site-packages 是假隔离，别用）
    python -m venv .venv
    ./.venv/Scripts/python.exe -m pip install websocket-client
    # 本脚本不自带静态服务器，得先起一个（端口与 VISUAL_PORT 一致）
    ./.venv/Scripts/python.exe -m http.server 19101 --directory web/dist &
    ./.venv/Scripts/python.exe scripts/gittok-visual-check.py     # EXIT 0 = 全部 PASS
    # 实测 2026-09-23：7 项全 PASS（软渲染 hover/滚动满帧、GPU-hover、6 项 CSS 断言、6 页截图），EXIT 0
    # 脚本自己一律 --headless=new（含"gpu"那档只是不加 --disable-gpu），不会弹窗抢焦点。

用法：python D:/AI/QODER/1/gittok_accept/accept_visual.py
输出：每项 PASS/FAIL + 最终汇总。全部 PASS = 视觉验收达标。

K-06 CI 化（仓库内正身，workflow 里跑得动）：
    cd web && npm run build          # 构建期打 copyOk 标，**不要再 cp data/feed.json 覆盖 dist**
    python -m http.server 19101 --directory web/dist &
    CHROME_PATH=/usr/bin/google-chrome VISUAL_STRICT=css VISUAL_TMP=/tmp \
      VISUAL_EXTRA_FLAGS="--no-sandbox;--disable-dev-shm-usage" \
      python scripts/gittok-visual-check.py
本机跑法不变（环境变量全部缺省即沿用 Windows 原值，含帧率硬拦）。
"""
import io
import json
import os
import statistics
import subprocess
import sys
import threading
import time
import urllib.request

import websocket

# K-06：CI 化入口（环境变量缺省时**完全等于本机原值**，本机跑法不变）。
#   CHROME_PATH       浏览器可执行文件（CI 上是 /usr/bin/google-chrome）
#   VISUAL_OUT        截图落盘目录
#   VISUAL_PORT       静态站端口（本机 19101 可能被遗留服务器占，CI 上可换）
#   VISUAL_TMP        Chrome user-data-dir 前缀目录
#   VISUAL_EXTRA_FLAGS 追加给 Chrome 的参数（分号分隔；CI 容器需 --no-sandbox）
#   VISUAL_STRICT     all＝本机口径（帧率也拦）；css＝CI 口径（帧率降级为信息项，
#                     六项审美断言与 6 页截图仍硬拦）。CI 的 ubuntu runner 无 GPU，
#                     帧率量的是虚拟化环境不是产品，硬拦只会假红。
CHROME = os.environ.get("CHROME_PATH") or r"C:/Program Files/Google/Chrome/Application/chrome.exe"
OUT_DIR = os.environ.get("VISUAL_OUT") or r"D:/AI/QODER/1/gittok_accept/shots"
SRV_PORT = int(os.environ.get("VISUAL_PORT") or 19101)
CDP_PORT_BASE = int(os.environ.get("VISUAL_CDP_PORT") or 19201)
TMP_BASE = os.environ.get("VISUAL_TMP") or "D:/tmp"
EXTRA_FLAGS = [f for f in (os.environ.get("VISUAL_EXTRA_FLAGS") or "").split(";") if f]
STRICT = os.environ.get("VISUAL_STRICT") or "all"
# 四轮 T5（块4「植入即红自证」）：注入一段 CSS 证明观感清单段有鉴别力。
# 用法：VISUAL_INJECT_CSS=D:/tmp/gt-layout/r4/red-sidebar-text.css ./.venv/Scripts/python.exe scripts/gittok-visual-check.py
# 与 responsive 闸同源的理由：断言只留一份，注入只换页面——否则「自证」会在判据改动后失效。
INJECT_CSS = os.environ.get("VISUAL_INJECT_CSS") or ""
FRAME_NAMES = ("软渲染-hover 满帧", "软渲染-滚动 满帧", "GPU-hover 满帧")

RESULTS = []


def report(name, ok, detail=""):
    # VISUAL_STRICT=css：帧率类断言在无 GPU 的 CI 环境降级为信息项，但**原判定一律留在读数里**，
    # 不做假绿；六项审美断言与截图齐全度不受此开关影响。
    if STRICT != "all" and not ok and name in FRAME_NAMES:
        RESULTS.append((f"{name}（信息项：CI 环境不判帧率）", True, f"{detail}｜原判定 FAIL"))
        print(f"[INFO] {name}（信息项）{detail}｜原判定 FAIL")
        return
    RESULTS.append((name, ok, detail))
    print(f"[{'PASS' if ok else 'FAIL'}] {name} {detail}")


class CDP:
    def __init__(self, port):
        for _ in range(20):
            try:
                info = json.load(urllib.request.urlopen(f"http://127.0.0.1:{port}/json", timeout=2))
                break
            except Exception:
                time.sleep(0.5)
        page = next(t for t in info if t["type"] == "page")
        self.ws = websocket.create_connection(page["webSocketDebuggerUrl"], timeout=30)
        self.mid = 0
        self.pending = {}
        threading.Thread(target=self._reader, daemon=True).start()

    def _reader(self):
        while True:
            try:
                m = json.loads(self.ws.recv())
            except Exception:
                return
            if m.get("id") in self.pending:
                self.pending[m["id"]] = m

    def call(self, method, params=None):
        self.mid += 1
        mid = self.mid
        self.pending[mid] = None
        self.ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        for _ in range(200):
            if self.pending.get(mid) is not None:
                return self.pending.pop(mid)
            time.sleep(0.05)
        return {"error": "timeout"}

    def eval(self, expr):
        r = self.call(
            "Runtime.evaluate",
            {"expression": expr, "returnByValue": True, "awaitPromise": True},
        )
        return r.get("result", {}).get("result", {}).get("value")


def launch(url, port, profile, disable_gpu=True):
    args = [
        CHROME,
        "--headless=new",
        f"--remote-debugging-port={port}",
        "--remote-allow-origins=*",
        "--no-first-run",
        "--no-default-browser-check",
        f"--user-data-dir={TMP_BASE}/accept_{profile}",
        "--window-size=1400,900",
        # ⚠ 三轮 T5：**删掉 --hide-scrollbars**。
        #   改前它让本闸对 T3 的主体（滚动条）完全失明：屏幕上看不到条、侧栏也无占位，
        #   于是「观感清单-滚动条」段的截图里根本没有滚动条可看，assert_css 的槽位读数也失真
        #   （实测：app-body 因 scrollbar-gutter:stable 仍读到 8px 的**预留槽**，
        #    而侧栏读到 0 → 误判成「侧栏没有细条」；其实只是条被藏了）。
        #   去掉之后：截图里能看到真实的自绘细条，槽位读数与真实浏览器一致。
        url,
    ]
    if disable_gpu:
        args.insert(3, "--disable-gpu")
    # ── 四轮 T5 补：**必须用干净 profile + 不落盘缓存** ──────────────────────────────
    # 实测到的真伤（2026-09-24 四轮）：本闸原来复用 `{TMP_BASE}/accept_{profile}` 这个**上轮留下的**
    # user-data-dir，于是 Chrome 从磁盘缓存里端出**上一次构建**的 index.html（引用旧 CSS 哈希），
    # 而那时旧 CSS 已在服务器上 404 ⇒ 闸在**旧版本的页面上**跑整段观感断言：
    #   实测读数侧栏宽 64px / `.side-text` max-width 0px / 组容器无背景 —— 全是已删除的旧 rail 形态，
    #   而同一轮里夹在 `location.reload()` 之后的检查读到的却是新形态（slot 0 / mask 在场）。
    # 这类「闸验的不是当轮产物」是**假绿与假红同源**的根因（〇块第 5/6 条同族），必须修在闸里。
    # 修法：每次运行前删掉 profile 目录（含 disk cache），并显式禁掉 http 缓存。
    import shutil
    shutil.rmtree(f"{TMP_BASE}/accept_{profile}", ignore_errors=True)
    args.insert(3, "--disk-cache-size=1")
    for i, f in enumerate(EXTRA_FLAGS):
        args.insert(3 + i, f)
    p = subprocess.Popen(args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(6)
    cdp = CDP(port)
    cdp.call("Runtime.enable")
    cdp.call("Page.enable")
    cdp.call("Emulation.setEmulatedMedia", {
        "features": [{"name": "prefers-color-scheme", "value": "dark"}]
    })
    for _ in range(80):
        r = cdp.eval("JSON.stringify((function(){const c=document.querySelector('.card');if(!c)return false;const r=c.getBoundingClientRect();return r.top>0&&r.width>100;})())")
        if r == "true":
            break
        time.sleep(0.5)
    time.sleep(2)
    return p, cdp


def frames(cdp, dur_s):
    r = cdp.eval(
        f"""(async () => {{
          window.__f = [];
          let last = performance.now();
          const t0 = performance.now();
          await new Promise(res => {{
            const tick = () => {{
              const now = performance.now();
              window.__f.push(now - last);
              last = now;
              if (now - t0 >= {dur_s * 1000}) return res();
              requestAnimationFrame(tick);
            }};
            requestAnimationFrame(tick);
          }});
          return JSON.stringify(window.__f);
        }})()"""
    )
    try:
        return [float(x) for x in json.loads(r)]
    except Exception:
        return []


def card_center(cdp):
    r = cdp.eval("JSON.stringify((function(){const c=document.querySelector('.card');const r=c.getBoundingClientRect();return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};})())")
    try:
        d = json.loads(r)
        return d["x"], d["y"]
    except Exception:
        return 700, 300


def test_hover(cdp, label):
    x, y = card_center(cdp)
    out = []
    for _ in range(3):
        cdp.call("Input.dispatchMouseEvent", {"type": "mouseMoved", "x": 3, "y": 3})
        time.sleep(0.4)
        cdp.call("Input.dispatchMouseEvent", {"type": "mouseMoved", "x": x, "y": y})
        out.extend(frames(cdp, 1.2))
        cdp.call("Input.dispatchMouseEvent", {"type": "mouseMoved", "x": 3, "y": 3})
        time.sleep(0.5)
    if not out:
        return report(label, False, "no frames")
    over = sum(1 for f in out if f > 25)
    p95 = sorted(out)[int(len(out) * 0.95) - 1]
    ok = over == 0 and p95 < 22
    report(label, ok, f"avg={statistics.mean(out):.1f} p95={p95:.1f} 掉帧={over}/{len(out)}")
    return ok


def test_scroll(cdp, label):
    out = []
    for _ in range(2):
        cdp.eval("""(async () => {
          window.__f = [];
          let last = performance.now();
          const t0 = performance.now();
          await new Promise(res => {
            const tick = () => {
              const now = performance.now();
              window.__f.push(now - last);
              last = now;
              if (now - t0 >= 2500) return res();
              requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        })()""")
        for _ in range(25):
            cdp.call("Input.dispatchMouseEvent", {
                "type": "mouseWheel", "x": 700, "y": 450, "deltaX": 0, "deltaY": 420,
            })
            time.sleep(0.1)
        time.sleep(0.3)
        r = cdp.eval("JSON.stringify(window.__f)")
        try:
            out.extend([float(x) for x in json.loads(r)])
        except Exception:
            pass
    if not out:
        return report(label, False, "no frames")
    over = sum(1 for f in out if f > 25)
    p95 = sorted(out)[int(len(out) * 0.95) - 1]
    ok = over == 0 and p95 < 22
    report(label, ok, f"avg={statistics.mean(out):.1f} p95={p95:.1f} 掉帧={over}/{len(out)}")
    return ok


def assert_css(cdp, checks, label):
    fails = []
    for name, expr, expect in checks:
        val = cdp.eval(expr)
        # expect=None ⇒ 只判「量级」不判精确值（用于随内容长短变化的读数：如频道名文字宽）。
        # 四轮 T5 加的这条口径：把「>0」写死成具体数字会在频道改名时假红，
        # 而「有没有中文」这件事只需要知道它非零。
        if expect is None:
            try:
                ok = float(val) > 0
            except (TypeError, ValueError):
                ok = False
            if not ok:
                fails.append(f"{name}: got {val!r}, want >0（量级判）")
            continue
        if val != expect:
            fails.append(f"{name}: got {val!r}, want {expect!r}")
    report(label, not fails, "; ".join(fails) if fails else f"{len(checks)} 项全对")
    return not fails


def shot(cdp, name):
    os.makedirs(OUT_DIR, exist_ok=True)
    r = cdp.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})
    data = r.get("result", {}).get("data")
    if data:
        import base64
        with open(os.path.join(OUT_DIR, name), "wb") as f:
            f.write(base64.b64decode(data))


def click_js(cdp, finder):
    """在页面里点掉第一个匹配 `.tabs .tab` / `.me-tab` / `.creator-item` / `.card` 的元素。"""
    expr = (
        "(() => { const el = document.querySelector('%s');"
        " if (!el) return false; el.scrollIntoView({block:'center'}); el.click(); return true; })()"
    ) % finder
    return cdp.eval(expr)


def click_text(cdp, selector, text):
    expr = (
        "(() => { const el = [].slice.call(document.querySelectorAll('%s'))"
        ".find(e => (e.textContent || '').includes('%s'));"
        " if (!el) return false; el.scrollIntoView({block:'center'}); el.click(); return true; })()"
    ) % (selector, text)
    return cdp.eval(expr)


# docstring 承诺的 6 页截图（GATE-02：此前 :254 只出 01_home.png 一张，名实不符）
PAGE_SHOTS = [
    ("02_search.png", [("click_text", ".tabs .tab", "搜索")]),
    ("03_me.png", [("click_text", ".tabs .tab", "我的")]),
    ("04_creator.png", [("click_text", ".me-tab, .side-item", "关注"), ("click_js", ".creator-item")]),
    ("05_detail.png", [("click_text", ".tabs .tab", "首页"), ("click_js", ".card")]),
]


def nav_shots(cdp):
    """补齐 6 页截图：搜索 / 我的 / 创作者页 / 详情弹层 / 移动端 390×844。"""
    made = ["01_home.png"]
    for name, steps in PAGE_SHOTS:
        for step in steps:
            if step[0] == "click_text":
                click_text(cdp, step[1], step[2])
            else:
                click_js(cdp, step[1])
            time.sleep(1.0)
        shot(cdp, name)
        made.append(name)
    # 详情弹层出完图关掉，再切移动端档
    click_js(cdp, ".detail-close")
    time.sleep(0.6)
    cdp.call("Emulation.setDeviceMetricsOverride",
             {"width": 390, "height": 844, "deviceScaleFactor": 2, "mobile": True})
    time.sleep(1.5)
    shot(cdp, "06_mobile_390.png")
    made.append("06_mobile_390.png")
    cdp.call("Emulation.clearDeviceMetricsOverride")
    time.sleep(0.6)
    missing = [m for m in made if not os.path.exists(os.path.join(OUT_DIR, m))]
    report("截图-6 页齐全", not missing, f"{len(made) - len(missing)}/6" + (f" 缺 {missing}" if missing else ""))
    return made


# 二轮 G7（2026-09-23 乙8）：视觉验收扩到 ≥3 档——图标栏（880×900）、底栏+滚动条（700×620）、
# 全侧栏矮视口（1200×600，两条滚动条同屏）。旧闸只跑 1400×900 一档，
# 图标栏/底栏/滚动条/窄档观感不在任何视觉验收里（甲3/甲4/甲5 的截图盲区）。
# 每档把画面切回首页再截，档位间用 setDeviceMetricsOverride 切换（与 responsive 闸同机制）。
EXTRA_VIEW_SHOTS = [
    ("07_sidebar_880.png", 880, 900, False),
    ("08_bottombar_700.png", 700, 620, True),
    ("09_short_1200.png", 1200, 600, False),
]


def extra_view_shots(cdp):
    made = []
    for name, w, h, mobile in EXTRA_VIEW_SHOTS:
        cdp.call("Emulation.setDeviceMetricsOverride",
                 {"width": w, "height": h, "deviceScaleFactor": 1, "mobile": mobile})
        time.sleep(1.5)
        shot(cdp, name)
        made.append(name)
    cdp.call("Emulation.clearDeviceMetricsOverride")
    missing = [m for m in made if not os.path.exists(os.path.join(OUT_DIR, m))]
    report("截图-3 扩展档齐全（880 带文字侧栏/底栏/矮视口）", not missing,
           f"{len(made) - len(missing)}/3" + (f" 缺 {missing}" if missing else ""))


# ── 三轮 T5（2026-09-23）：观感清单段 ───────────────────────────────────────────
# ⚠ 头注（二轮教训，写进闸里防止再犯）：
#   二轮三闸全绿（responsive 312 / drag 15 / visual 10）但栗子看图仍然打回——
#   **CSS 属性断言 ≠ 审美达标**。闸只能防回归，不能证明好看。
#   所以「观感类」交付的过关方式有两条腿，缺一不可：
#     ① 本段这类**可断言**的设计不变量（形态/间距/态色/自绘条）——防回归；
#     ② 每轮交付必须出**整页截图集**并逐张目测（或 visual-judge 子代理），
#        过关标准是「他看一眼不皱眉」，不是「断言为真」。截图随本段一并落盘，
#        交付前必须逐张看（10/10b/11/11b 四张是三轮 T2/T3 的首跑样本）。
#   判据来源：三轮块1「先量后改」的定版——图标栏取 V2 去框极简式、滚动条取自绘 8px 细条。
# ── 四轮 T3/T5（2026-09-24）：观感清单段的**侧栏**组整段重写 ──
# 旧清单是「图标栏 11 项」（880×900 的 icon-only rail：去框组容器 / 44×44 指示器 / 20×1 分组线 /
# 轨道条隐藏 …）。四轮 T3 **删除了 icon-only rail**（769–900 改用带文字的 192 侧栏，理由见
# styles.css 的「整体删除」注释：朱子图3「明明有足够大的空间却没有中文说明只有图标」）。
# 形态没了，清单必须跟着换——否则这 11 条会全部变成**恒真的空断言**（selector 匹配不到 → 抛错或恒过），
# 正是〇块第 5 条「闸漏网＝流程缺口」的另一种写法。
# 新清单直接对着朱子那条诉求与四轮两张定版：① 中文必须在场 ② 玻璃盒形态在 ③ 侧栏不出条。
OBSERVE_CHECKS_SIDEBAR = [
    # ① 「有中文」——这项是朱子图3 的原话，也是本轮 T3 的全部意义
    ("侧栏-第一项文字宽 >0（不许只有图标）",
     "String((function(){var t=document.querySelector('.sidebar .side-item .side-text');return Math.round(t.getBoundingClientRect().width);})())",
     None),  # None = 只做「>0」的量级判，精确值随频道名长短变，写死会假红
    ("侧栏-文字不透明（opacity=1）",
     "getComputedStyle(document.querySelector('.sidebar .side-item .side-text')).opacity", "1"),
    ("侧栏-文字未收宽（max-width 是 200px 而非 0）",
     "getComputedStyle(document.querySelector('.sidebar .side-item .side-text')).maxWidth", "200px"),
    ("侧栏-项宽填满玻璃盒（≥120px，说明真的用了可用宽）",
     "String((function(){var e=document.querySelector('.sidebar .side-item');return Math.round(e.getBoundingClientRect().width)>=120;})())", "true"),
    ("侧栏-宽 192px（769–900 与 >900 同形态）",
     "String((function(){var sb=document.querySelector('.sidebar');return Math.round(sb.getBoundingClientRect().width);})())", "192"),
    # ② 玻璃盒形态（宽档既有决定，T3 选「取消 rail」后 769–900 也用这套）
    ("侧栏-组容器是玻璃盒（有背景图）",
     "String(getComputedStyle(document.querySelector('.sidebar .side-group-box')).backgroundImage.indexOf('linear-gradient')>=0)", "true"),
    ("侧栏-组容器圆角 18px",
     "getComputedStyle(document.querySelector('.sidebar .side-group-box')).borderTopLeftRadius", "18px"),
    ("侧栏-组容器边框 1px",
     "getComputedStyle(document.querySelector('.sidebar .side-group-box')).borderTopWidth", "1px"),
    # 旧 rail 的分组是「一条 20×1 细线」（font-size:0 + ::before 画线）；新形态必须有文字。
    # ⚠ 判「非 0」而不是写死 px：字号是 0.95rem（html 17px → 16.15px），随 rem 变，
    #   写死会在有人调根字号时假红，而这条要守的是「有没有文字」。
    ("侧栏-分组标题有文字（font-size ≠ 0，旧 rail 是细线）",
     "String(getComputedStyle(document.querySelector('.sidebar .side-group')).fontSize !== '0px')", "true"),
    ("侧栏-激活态是渐变药丸（宽档形态，与旧 rail 的低饱和指示器不同）",
     "String(getComputedStyle(document.querySelector('.sidebar .side-item.active')).backgroundImage.indexOf('linear-gradient')>=0)", "true"),
    # ③ 四轮 T2 定版：侧栏**不出条**（旧清单这里断言的是 rail 的「条隐藏」，现在扩到全档）
    ("侧栏-不出滚动条（占位 0px）",
     "String((function(){var sb=document.querySelector('.sidebar');return sb.offsetWidth-sb.clientWidth;})())", "0"),
    ("侧栏-底缘渐隐在场（不出条的可见性补偿）",
     "String(getComputedStyle(document.querySelector('.sidebar')).maskImage.indexOf('linear-gradient')>=0)", "true"),
]
OBSERVE_CHECKS_SCROLLBAR = [
    # 自绘细条（T3 根因：`* { scrollbar-color }` 非 auto 会让 Chromium 整块忽略 ::-webkit-scrollbar）
    ("滚动条-自绘 8px 在场（系统回退是 15px）", "String((function(){var a=document.querySelector('.app-body');return a.offsetWidth-a.clientWidth;})())", "8"),
    ("滚动条-宽度 token=8px（与 --scrollbar-size 同源）", "getComputedStyle(document.documentElement).getPropertyValue('--scrollbar-size').trim()", "8px"),
    ("滚动条-槽位策略：app-body 常驻预留（列数不摆动）", "getComputedStyle(document.querySelector('.app-body')).scrollbarGutter", "stable"),
]


def _shot_clip(cdp, name, clip):
    os.makedirs(OUT_DIR, exist_ok=True)
    r = cdp.call("Page.captureScreenshot", {"format": "png", "fromSurface": True, "clip": clip})
    data = r.get("result", {}).get("data")
    if not data:
        report(f"截图-{name}", False, "无数据")
        return
    import base64
    with open(os.path.join(OUT_DIR, name), "wb") as f:
        f.write(base64.b64decode(data))
    report(f"截图-{name}", True, name)


def apply_inject(cdp):
    """把 VISUAL_INJECT_CSS 的 CSS 注入当前页面（供「植入即红自证」用）。
    ⚠ 必须**每次 reload 之后重新注入**——本段中间有一次 `location.reload()` 回到首页
    （「两条滚动条同屏」是首页形态），reload 会把注入的 <style> 一起冲掉；
    2026-09-24 四轮实测踩到：只在开头注入时，安装在 reload 之后的那条断言（宽档侧栏不出条）
    对注入完全免疫 → 自证假绿。"""
    if not INJECT_CSS:
        return
    css = io.open(INJECT_CSS, encoding="utf-8").read()
    cdp.eval("(function(){var s=document.getElementById('gt-red-inject');"
             "if(!s){s=document.createElement('style');s.id='gt-red-inject';document.head.appendChild(s);}"
             f"s.textContent={json.dumps(css)};return s.textContent.length;}})()")
    time.sleep(0.4)


def observe_checklist(cdp):
    """观感清单段：侧栏 880×900（四轮 T3 起是**带文字**形态）+ 矮视口两条滚动条 1200×600。
    两张特写一并落盘——**交付前必须逐张目测**（断言只防回归，不证明好看）。"""
    apply_inject(cdp)
    cdp.call("Emulation.setDeviceMetricsOverride", {"width": 880, "height": 900, "deviceScaleFactor": 1, "mobile": False})
    time.sleep(1.5)
    assert_css(cdp, OBSERVE_CHECKS_SIDEBAR, "观感清单-侧栏带文字（880×900，四轮 T3 新形态）")
    shot(cdp, "10_observe_sidebar_880.png")
    _shot_clip(cdp, "10b_observe_sidebar_zoom.png", {"x": 0, "y": 60, "width": 260, "height": 540, "scale": 2})
    # 先回首页重载：本段位于 nav_shots/extra_view_shots 之后，页面停在别的 tab 上，
    # 而「两条滚动条同屏」是**首页**的形态（别的页侧栏内容少、不溢出 → 没有第二条）。重载消除这个变量。
    cdp.eval("location.reload(); 1")
    time.sleep(2.5)
    apply_inject(cdp)  # reload 冲掉 <style> → 这里必须重新注入（否则本段剩下的断言对注入免疫）
    cdp.call("Emulation.setDeviceMetricsOverride", {"width": 1200, "height": 600, "deviceScaleFactor": 1, "mobile": False})
    time.sleep(1.5)
    assert_css(cdp, OBSERVE_CHECKS_SCROLLBAR, "观感清单-滚动条（1200×600 矮视口两条同屏）")
    # 宽档侧栏：**溢出时**必须用同一套 8px 自绘细条（两条同屏观感统一）；
    # 内容不高的频道侧栏不溢出＝不占位，那是正常态（不做「恒 8」的假判据）。
    # ── 四轮 T2 定版（甲A2）：宽档侧栏**不出条**（旧判据是「溢出时用同一套 8px 自绘细条」，
    #    那个规格在三轮只处理了 rail 档、宽档一直没动——朱子 09-24 图2 说的就是这个：
    #    条占 208–216、与玻璃盒右缘 196 只隔 12px，一条亮条站在空档里。
    #    定版依据＝两版注入截图对照（D:/tmp/gt-layout/r4/设计pass/inj-t2v1.json 不出条 /
    #    inj-t2v2.json 内缩 20px），选「不出条 + 底缘渐隐」：导航列不参与折行，锁①本义不适用。
    #    新判据＝溢出与否，占位都必须是 0（恒真的量，不看溢出量）。──
    sb = cdp.eval(
        "(function(){var b=document.querySelector('.sidebar');var cs=getComputedStyle(b);"
        "return [b.scrollHeight-b.clientHeight, b.offsetWidth-b.clientWidth, Math.round(b.getBoundingClientRect().width),"
        "cs.visibility, window.innerWidth, cs.overflowY, cs.scrollbarWidth, cs.maskImage.slice(0,24),"
        "document.querySelectorAll('.sidebar').length, (b.parentElement||{}).className];})()"
    ) or [False, 0, 0, "?", 0]
    report(
        "观感清单-宽档侧栏不出条（四轮 T2 定版；底缘渐隐在场）",
        sb[1] == 0,
        f"滚动条占位 {sb[1]}px（定版＝0）｜侧栏溢出量 {sb[0]}px｜侧栏宽 {sb[2]}px｜visibility {sb[3]}｜视口 {sb[4]}"
        f"｜overflowY {sb[5]}｜scrollbarWidth {sb[6]}（必须 auto，锁① 禁 none）｜mask {sb[7]}"
        f"｜.sidebar 个数 {sb[8]}｜父类 {sb[9]}",
    )
    shot(cdp, "11_observe_scroll_1200.png")
    _shot_clip(cdp, "11b_observe_scrollbar_zoom.png", {"x": 1188, "y": 60, "width": 12, "height": 540, "scale": 6})
    cdp.call("Emulation.clearDeviceMetricsOverride")


def main():
    url = f"http://127.0.0.1:{SRV_PORT}/"
    # 检查 dist 数据规模
    try:
        d = json.load(urllib.request.urlopen(f"{url}data/feed.json", timeout=10))
        if len(d) < 1000:
            report("前置-数据规模", False, f"dist feed 只有 {len(d)} 张，未 cp 真实数据")
            sys.exit(1)
        okn = sum(1 for c in d if c.get("copyOk") is True)
        badn = sum(1 for c in d if c.get("copyOk") is False)
        # E2：过去本机把 data/feed.json 直接 cp 进 dist，会把构建期打的 copyOk 标抹平
        # → COPY-08「不合格卡不进推荐池」这条线上行为在本地等于没测。现在把它变成硬断言。
        if okn == 0:
            report("前置-copyOk 打标", False, f"dist 数据 copyOk 真值 0 张（合格 {okn}/不合格 {badn}）——闸没吃到构建期打标数据，COPY-08 未被覆盖")
            sys.exit(1)
        report("前置-数据规模", True, f"{len(d)} 张")
        report("前置-copyOk 打标", True, f"合格 {okn} 张 / 不合格 {badn} 张（COPY-08 覆盖到位）")
    except Exception as e:
        report("前置-数据规模", False, f"feed.json 读取失败 {e}，先起服务器并 cp 数据")
        sys.exit(1)

    # 软渲染主测试
    p, cdp = launch(url, CDP_PORT_BASE, "soft", disable_gpu=True)
    try:
        test_hover(cdp, "软渲染-hover 满帧")
        test_scroll(cdp, "软渲染-滚动 满帧")
        assert_css(cdp, [
            ("body 背景渐变", "JSON.stringify((function(){var b=getComputedStyle(document.body).backgroundImage;return b.indexOf('linear-gradient')>=0 || getComputedStyle(document.body,'::before').backgroundImage.indexOf('linear-gradient')>=0;})())", "true"),
            ("侧栏透明", "getComputedStyle(document.querySelector('.sidebar')).backgroundColor", "rgba(0, 0, 0, 0)"),
            ("侧栏无边框", "getComputedStyle(document.querySelector('.sidebar')).borderRightWidth", "0px"),
            ("分组块圆角", "getComputedStyle(document.querySelector('.side-group-box')).borderRadius", "18px"),
            ("卡片无 blur", "getComputedStyle(document.querySelector('.card')).backdropFilter", "none"),
            ("顶栏无 blur", "getComputedStyle(document.querySelector('.header')).backdropFilter", "none"),
        ], "视觉断言-首页")
        shot(cdp, "01_home.png")
        nav_shots(cdp)
        extra_view_shots(cdp)
        observe_checklist(cdp)
    finally:
        p.kill()

    # GPU 环境
    p2, cdp2 = launch(url, CDP_PORT_BASE + 1, "gpu", disable_gpu=False)
    try:
        test_hover(cdp2, "GPU-hover 满帧")
    finally:
        p2.kill()

    # 汇总
    print()
    print("=== 汇总 ===")
    all_ok = all(ok for _, ok, _ in RESULTS)
    for name, ok, detail in RESULTS:
        print(f"  {'PASS' if ok else 'FAIL'} {name} {detail}")
    print("=== 全部 PASS ===" if all_ok else "=== 存在 FAIL ===")
    sys.exit(0 if all_ok else 1)


if __name__ == "__main__":
    main()
