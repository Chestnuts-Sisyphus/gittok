// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, it, expect } from "vitest";

/**
 * H-01 / H-02：卡片外部「一句话」必须**在任何内核里都只占一行**的源码级契约。
 *
 * 立论更正（2026-09-19 实测，栗子第四次反馈 + 他给的截图）：
 * 原先的定案是「现代内核有 `-webkit-line-clamp:1` 就物理不可能两行，唯一路径是不支持 clamp 的旧内核折行外溢」——
 * **这条被本机截图推翻**：Chrome 下 clamp:1 与 `max-height` 同用时，第二行的字顶照样会被画进裁切线内
 * （截图 `D:/tmp/h02_summary_now.png`，「智能」两字被削掉半截；改后对照 `D:/tmp/h02_summary_fix2.png`）。
 * 真正的根治是让第二行**根本不被排版**：`white-space: nowrap` + `text-overflow: ellipsis`（所有内核都认），
 * `max-height` 与 clamp 三行保留作第二道锁。本册把这三件事一起钉住。
 *
 * 适配闸（`scripts/gittok-responsive-check.mjs`）里有对应的 computed 版断言（含「半行外露」判据），
 * 但那条**不在 CI 里跑**——删锁要在合并前被拦住，只能靠这里。两份判据同一事实源：styles.css。
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

  it("根治路径在场：white-space:nowrap + text-overflow:ellipsis（第二行根本不被排版，跨内核一致）", () => {
    expect(decl(block, "white-space"), "nowrap 被删 → 超长句会排第二行，裁切线里会留半行字顶").toBe("nowrap");
    expect(decl(block, "text-overflow"), "ellipsis 被删 → 变成硬裁一半句子、没有省略号").toBe("ellipsis");
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
