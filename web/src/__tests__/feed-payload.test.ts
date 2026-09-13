// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { describe, it, expect } from "vitest";
import { splitFeedPayload, mergeDetail } from "../feed-payload.ts";

describe("splitFeedPayload", () => {
  it("把 detailCn 从列表剥离并按 repo 建索引", () => {
    const { list, details } = splitFeedPayload([
      { repo: "a/b", name: "b", detailCn: "长文A" },
      { repo: "c/d", name: "d", detailCn: "" },
      { repo: "e/f", name: "f" },
    ]);
    expect(list).toEqual([
      { repo: "a/b", name: "b" },
      { repo: "c/d", name: "d" },
      { repo: "e/f", name: "f" },
    ]);
    expect(list.every((c) => !("detailCn" in c) || c.detailCn === undefined)).toBe(true);
    expect(details).toEqual({ "a/b": "长文A" });
  });

  it("空列表得到空详情表", () => {
    expect(splitFeedPayload([])).toEqual({ list: [], details: {} });
  });
});

describe("mergeDetail", () => {
  it("卡片已有 detailCn 时不覆盖", () => {
    const card = { repo: "a/b", detailCn: "快照" };
    expect(mergeDetail(card, { "a/b": "管道" })).toEqual(card);
  });

  it("列表卡从详情表补全", () => {
    expect(mergeDetail({ repo: "a/b", detailCn: "" }, { "a/b": "长文" })).toEqual({
      repo: "a/b",
      detailCn: "长文",
    });
    expect(mergeDetail({ repo: "a/b" }, { "a/b": "长文" })).toEqual({
      repo: "a/b",
      detailCn: "长文",
    });
  });

  it("详情表缺失时保持原卡", () => {
    const card = { repo: "x/y" };
    expect(mergeDetail(card, {})).toBe(card);
    expect(mergeDetail(card, null)).toBe(card);
  });
});
