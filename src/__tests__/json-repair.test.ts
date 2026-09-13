/**
 * JSON 容错修复测试（2026-09-14）：模型偶发输出「值缺开引号」的畸形 JSON——
 * 实测样本 `"detail_cn":AI编程中充斥着难以…`。修复必须**只补引号、不破坏合法 JSON**。
 */

import { describe, it, expect } from "vitest";
import { quoteUnquotedValues } from "../feed/prompts.ts";

describe("quoteUnquotedValues 引号修复", () => {
  it("值缺开引号 → 补上（实测畸形样本形态）", () => {
    const bad = '{"repo":"a/b","reason_cn":根据文档描述，这个项目解决了一个具体问题, "x":1}';
    const fixed = quoteUnquotedValues(bad);
    const parsed = JSON.parse(fixed) as { reason_cn: string };
    expect(parsed.reason_cn).toContain("根据文档描述");
  });

  it("合法 JSON 不动（数字/布尔/null/已引号值/嵌套对象都不改）", () => {
    const good = '{"n":1,"f":1.5,"t":true,"z":null,"s":"ok","arr":[1,2],"obj":{"k":"v"}}';
    expect(quoteUnquotedValues(good)).toBe(good);
    // 解析结果一致
    expect(JSON.parse(quoteUnquotedValues(good))).toEqual(JSON.parse(good));
  });

  it("多字段缺失引号 → 全部补上", () => {
    const bad = '{"a":第一段文字, "b":第二段文字}';
    const parsed = JSON.parse(quoteUnquotedValues(bad)) as { a: string; b: string };
    expect(parsed.a).toBe("第一段文字");
    expect(parsed.b).toBe("第二段文字");
  });

  it("值里含转义需求（引号/反斜杠）→ 转义后仍是合法 JSON", () => {
    const bad = '{"a":他说"你好"\\ok, "b":2}';
    const parsed = JSON.parse(quoteUnquotedValues(bad)) as { a: string; b: number };
    expect(parsed.a).toContain("你好");
    expect(parsed.b).toBe(2);
  });
});
