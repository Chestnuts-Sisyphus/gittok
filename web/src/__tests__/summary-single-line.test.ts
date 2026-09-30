// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { readFileSync } from "node:fs";
// @ts-ignore
import { resolve } from "node:path";
// @ts-ignore
import { describe, it, expect } from "vitest";

/**
 * .summary 摘要块的**源码级契约**（十二轮改版，2026-10-01）。
 *
 * 历史（防复踩，别把锁写回去）：
 * · H-01/H-02 时代（09-19）：摘要锁一行——clamp:1 + nowrap + ellipsis + max/min-height 槽位。
 * · 九轮～十一轮：槽位按档分流（data-sum-lines 1–3 行）、流式字号、槽内垂直居中。
 * · **十二轮（块八，栗子口径）**：「卡片几行其实没有太大所谓……定死没有意义，我的意思是
 *   别有空隙」⇒ 槽位（min/max-height）、clamp、nowrap/ellipsis **全部退场**，文字自然流：
 *   摘要 ≤35 字（内容契约）＋ 流式字号（0.98→0.81rem）＋ 自然换行 ⇒ 永不截断、0 死空间
 *   （R-D1 闸钉卡盒高 = 内容栈高）。text-wrap: balance 保留（多行时配平断点＝优雅）。
 *
 * 本册钉住的是「退场必须退干净」：谁把定高/槽位/clamp 加回 .summary，这里红。
 * 适配闸（scripts/gittok-responsive-check.mjs）里有对应的 computed 版断言（R-D1 全 DOM），
 * 两份判据同一事实源：styles.css。
 */
function summaryBlock(): string {
  const css = readFileSync(resolve("web/src/styles.css"), "utf8");
  const m = css.match(/^\.summary\s*\{([^}]*)\}/m);
  if (!m) throw new Error("styles.css 里找不到 .summary 规则块");
  return m[1];
}

function reasonBlock(): string {
  const css = readFileSync(resolve("web/src/styles.css"), "utf8");
  const m = css.match(/^\.reason-clamped\s*\{([^}]*)\}/m);
  if (!m) throw new Error("styles.css 里找不到 .reason-clamped 规则块");
  return m[1];
}

function decl(block: string, prop: string): string | null {
  // 先剥注释：属性可能跟在 /* ... */ 之后而不与 `;` 相邻
  const stripped = block.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const d of stripped.split(";")) {
    const m = d.match(/^\s*([\w-]+)\s*:\s*(\S[\s\S]*)$/);
    if (m && m[1].toLowerCase() === prop.toLowerCase()) return m[2].trim();
  }
  return null;
}

describe(".summary 摘要块自然流契约（十二轮块八：几行没有太大所谓，别有空隙）", () => {
  const block = summaryBlock();

  it("槽位/钳制退干净：无 min/max-height、无 -webkit-line-clamp、无 nowrap/ellipsis（谁加回来谁红）", () => {
    expect(decl(block, "min-height"), "min-height 槽位回潮 = 死空间回潮（R-D1 会红）").toBeNull();
    expect(decl(block, "max-height"), "max-height 槽位回潮 = 截断回潮").toBeNull();
    expect(decl(block, "-webkit-line-clamp"), "clamp 回潮 = 定行数回潮").toBeNull();
    expect(decl(block, "white-space"), "nowrap 回潮 = 超契约摘要被省略号硬截").toBeNull();
    expect(decl(block, "text-overflow"), "ellipsis 回潮 = 硬裁回潮").toBeNull();
  });

  it("优雅件在场：text-wrap: balance（多行配平断点）+ 流式字号变量 --feed-summary-font", () => {
    expect(decl(block, "text-wrap")).toBe("balance");
    expect(decl(block, "font-size")).toBe("var(--feed-summary-font, 0.98rem)");
  });
});

describe(".reason-clamped 理由块自然流契约（十二轮：行数/槽位真源退役）", () => {
  const block = reasonBlock();

  it("槽位退干净：无 min-height（按 150 字上限算行数的槽位正是三轮「异常空隙」的根因）", () => {
    expect(decl(block, "min-height"), "min-height 槽位回潮 = 09-26～09-30 空档问题复发").toBeNull();
    expect(decl(block, "-webkit-line-clamp")).toBeNull();
    expect(decl(block, "line-height"), "行高 1.7 是理由块排版的几何依据").toBe("1.7");
  });
});
