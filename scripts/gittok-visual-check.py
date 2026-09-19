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
        "--hide-scrollbars",
        url,
    ]
    if disable_gpu:
        args.insert(3, "--disable-gpu")
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
