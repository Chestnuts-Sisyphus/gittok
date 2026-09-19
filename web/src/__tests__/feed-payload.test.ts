// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { splitFeedPayload, mergeDetail, diffDetailKeys } from "../feed-payload.ts";

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

describe("diffDetailKeys（G-04 详情表缺键可观测点）", () => {
  it("卡上无 detailCn 且详情表无该键 → 报缺", () => {
    const miss = diffDetailKeys([{ repo: "a/b" }, { repo: "c/d", detailCn: "有" }], {});
    expect(miss).toEqual(["a/b"]);
  });

  it("详情表整表拿不到（404 兜成空对象）→ 全列缺键", () => {
    expect(diffDetailKeys([{ repo: "a/b" }, { repo: "c/d" }], null)).toEqual(["a/b", "c/d"]);
  });

  it("详情表补齐后不报缺", () => {
    expect(diffDetailKeys([{ repo: "a/b", detailCn: "" }], { "a/b": "长文" })).toEqual([]);
  });

  it("真实数据拆表后，凡有详情的卡都能从详情表取回（G-04）", () => {
    // 不读 web/public/data/*：那是构建产物，其中 feed-details.json 并未入库，
    // 拿它做断言等于把测试挂在「本机跑过 build」上，CI 直接 ENOENT。
    const cards = JSON.parse(readFileSync(resolve("data/feed.json"), "utf-8")) as {
      repo: string;
      detailCn?: string;
    }[];
    expect(cards.length).toBeGreaterThan(1000);
    const withDetail = cards.filter((c) => typeof c.detailCn === "string" && c.detailCn.length > 0);
    const { details } = splitFeedPayload(cards);
    expect(diffDetailKeys(withDetail, details)).toEqual([]);
    expect(Object.keys(details).length).toBe(withDetail.length);
  });
});
