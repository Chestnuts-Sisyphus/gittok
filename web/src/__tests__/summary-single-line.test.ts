// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, it, expect } from "vitest";

/**
 * H-01：卡片外部「一句话」单行防御锁的源码级契约。
 *
 * 为什么单独立一册：`.summary` 的一行截断自始是设计（`-webkit-line-clamp: 1`），但**不支持
 * line-clamp 的旧内核**（双核浏览器 IE 兼容模式、国产壳）会让文本在单行空间内自然折行外溢成两行
 * ——这是「一句话变两行」唯一可复现的路径。09-19 的补救是给 `.summary` 加一条与 min-height 同值的
 * `max-height`，把盒高钉死在一行。本册锁住「这条锁还在、且和 clamp/行高/padding 三者算得住」。
 *
 * 适配闸（scripts/gittok-responsive-check.mjs）里另有一条 computed 版的同名断言，但那条**不在 CI 里跑**
 * ——所以删锁要在合并前被拦住，只能靠这里。两份判据同一事实源：styles.css。
 */
function summaryBlock(): string {
  const css = readFileSync(resolve("web/src/styles.css"), "utf8");
  const m = css.match(/^\.summary\s*\{([^}]*)\}/m);
  if (!m) throw new Error("styles.css 里找不到 .summary 规则块");
  return m[1];
}

function decl(block: string, prop: string): string | null {
  // 先剥注释：属性可能跟在 /* ... */ 之后而不与 `;` 相邻（防御锁那条就是这么写的）
  const stripped = block.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const d of stripped.split(";")) {
    const m = d.match(/^\s*([\w-]+)\s*:\s*(\S[\s\S]*)$/);
    if (m && m[1].toLowerCase() === prop.toLowerCase()) return m[2].trim();
  }
  return null;
}

describe(".summary 一句话单行防御锁（H-01 / 栗子 09-19 四报症状的兜底）", () => {
  const block = summaryBlock();

  it("clamp 本体三件在场：-webkit-box + line-clamp:1 + overflow:hidden", () => {
    expect(decl(block, "display")).toBe("-webkit-box");
    expect(decl(block, "-webkit-line-clamp")).toBe("1");
    expect(decl(block, "overflow")).toBe("hidden");
  });

  it("防御锁在场且与 min-height 同值（盒高钉死在一行，旧内核折行也溢不进下一行）", () => {
    const max = decl(block, "max-height");
    const min = decl(block, "min-height");
    expect(max, "max-height 被删掉了——旧内核折行外溢的防御锁失效").toBeTruthy();
    expect(max).toBe(min);
  });

  it("max/min-height 的算式与自身的 line-height、padding 对得上（改了行高忘了改锁也拦）", () => {
    const lock = decl(block, "max-height")!;
    const parsed = lock.match(/^calc\(\s*(\d+)\s*\*\s*([\d.]+)em\s*\+\s*(\d+)px\s*\)$/);
    expect(parsed, `锁的写法不符合 calc(N * <lineHeight>em + <paddingY>px)：${lock}`).not.toBeNull();
    const [, clampLines, lhEm, padPx] = parsed!;
    expect(clampLines).toBe(decl(block, "-webkit-line-clamp"));
    expect(Number(lhEm)).toBe(Number(decl(block, "line-height")));
    const pad = decl(block, "padding")!.split(/\s+/).map(parseFloat);
    const padY = pad[0] + (pad.length >= 3 ? pad[2] : pad[0]);
    expect(Number(padPx)).toBe(padY);
  });
});
