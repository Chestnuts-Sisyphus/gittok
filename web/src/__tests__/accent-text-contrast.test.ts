// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, it, expect } from "vitest";

/**
 * H-06：文字用色必须走 `--accent-text`，且**不许靠改审美 token 本身**来过 AA。
 *
 * 为什么要有这一册：09-19 把 12 处纯文字 `color: var(--accent)` 换成 `var(--accent-text)` 之后，
 * 这件事没有任何机械判据盯着——下一次有人在 hover 里顺手写回 `var(--accent)`，
 * 文字就会在玻璃卡上掉回 4.1:1（AA 线下）而全绿通过。本册同时封两条退路：
 * ① 写回 `--accent`（→ 用例 1 复红）；② 把 `--accent` 本身调亮来「过线」（那是全站视觉标准变更，属禁区，→ 用例 2 复红）。
 *
 * 判据口径与本会话真机量一致：正文一律按 WCAG AA 4.5:1（图标同口径，不放宽到 3:1，宁严勿宽）。
 * 真机前后值台账见**仓库外**交接册 0919-03「块五·补记一」（个人工作目录路径不入公开仓）。
 */

const css = () => readFileSync(resolve("web/src/styles.css"), "utf8");

/** 剥掉注释后逐条声明取 `color:`（必须行首锚：`border-color`/`accent-color` 同含 "color:"，子串污染过）。 */
function colorDeclarations(source: string): string[] {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split(/[;\n]/)
    .map((l) => l.trim())
    .filter((l) => /^color\s*:/.test(l));
}

function token(name: string): string | null {
  const m = css().match(new RegExp(`--${name}\\s*:\\s*(#[0-9a-fA-F]{3,8})`));
  return m ? m[1] : null;
}

function hexToRgb(h: string): [number, number, number] {
  const x = h.replace("#", "");
  const full =
    x.length === 3
      ? x
          .split("")
          .map((c) => c + c)
          .join("")
      : x.slice(0, 6);
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
}

/** WCAG 相对亮度与对比度。 */
function contrast(fg: string, bg: string): number {
  const lum = (h: string) => {
    const a = hexToRgb(h).map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };
  const l1 = lum(fg);
  const l2 = lum(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/**
 * 真机量过的落底色（本轮 CDP 沿 backdrop 链把半透明玻璃合成后的实测值，不是猜的）：
 * rgb(8,6,14) 页面底 / rgb(19,16,29) 搜索空态卡底 / rgb(19,18,41) 玻璃卡与详情底 /
 * rgb(21,18,36) 底栏 / rgb(19,20,31) 创作者页卡底 / rgb(29,30,56) 我的-关注列表底 / rgb(30,28,61) Agent 页底。
 */
const MEASURED_BACKDROPS = ["#08060e", "#13101d", "#131229", "#151224", "#13141f", "#1d1e38", "#1e1c3d"];

describe("H-06 文字用色（accent → accent-text）", () => {
  it("styles.css 里不许再有纯文字 color: var(--accent)", () => {
    const bad = colorDeclarations(css()).filter((d) => /^color\s*:\s*var\(\s*--accent\s*\)\s*$/.test(d));
    // 非文字用途（border-color / outline-color / accent-color / fill / stroke）不在此列——它们走 3:1 那条口径
    expect(bad, `纯文字用色回退到 --accent：${bad.join(" | ")}`).toEqual([]);
  });

  it("审美 token 本体不许漂移：--accent 仍 #6366f1，--accent-text 仍 #818cf8", () => {
    // 「靠把 --accent 调亮来过 AA」= 全站标准变更，不在文字清盘的授权范围内（禁区条款：提亮只换引用不动值）
    expect(token("accent")?.toLowerCase()).toBe("#6366f1");
    expect(token("accent-text")?.toLowerCase()).toBe("#818cf8");
  });

  it("--accent-text 在真机量过的全部落底色上均过 AA 4.5:1，而 --accent 在最坏底上不过（证明本轮换色非形式主义）", () => {
    const text = token("accent-text") as string;
    const accent = token("accent") as string;
    const perBg = MEASURED_BACKDROPS.map((bg) => ({
      bg,
      ok: +contrast(text, bg).toFixed(2),
      old: +contrast(accent, bg).toFixed(2),
    }));
    for (const r of perBg)
      expect(r.ok, `--accent-text 在 ${r.bg} 上只有 ${r.ok}:1`).toBeGreaterThanOrEqual(4.5);
    const worst = Math.min(...perBg.map((r) => r.ok));
    const worstOld = Math.min(...perBg.map((r) => r.old));
    expect(worstOld, "改前若已全过，说明本册前提不成立，应连用例 1 一起重新论证").toBeLessThan(4.5);
    expect(worst).toBeGreaterThan(worstOld);
  });
});
