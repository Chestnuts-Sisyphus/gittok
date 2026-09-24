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

// ---------------------------------------------------------------------------
// 五轮 T1：点击**不许等详情表**（线上实测的根因）
// ---------------------------------------------------------------------------
/**
 * 症状（线上必现）：点卡片 → 卡片立刻隐形、弹层长期不出现、无报错。
 * 实测根因（`D:/tmp/gt-r5-open-live.mjs`，线上冷 profile、逐 100ms 轮询到 120s）：
 *   冷点弹层出现 @ **105.4s**（＝ `feed-details.json` 下载完的时刻），
 *   同一张卡数据就位后再点 @ **107ms**。
 * ⇒ 弹层从来没有「被挡住」，它是在**等一份 5.2MB 的详情表**；此前「从不出现」的结论来自 3.5s 观察窗。
 *
 * 这条锁用源码级断言钉住修法：`handleOpenDetail` 必须在拿到详情表**之前**就 `setDetailCard(card)`。
 * 为什么不用行为测试：本仓 vitest 是 node 环境（无 DOM），而 App.tsx 是整棵 React 树；
 * 仓储里对这类「跨不动点」的锁（H-01 单行锁、列数反解锁）都是源码级断言。
 */
describe("handleOpenDetail 不许等详情表（五轮 T1 根因锁）", () => {
  const src = readFileSync(resolve("web/src/App.tsx"), "utf8");
  const body = (() => {
    const start = src.indexOf("const handleOpenDetail = useCallback(");
    expect(start, "App.tsx 里找不到 handleOpenDetail").toBeGreaterThan(-1);
    const end = src.indexOf("\n  }, []);", start);
    return src.slice(start, end);
  })();

  it("先开弹层：setDetailCard(card) 在 prefetchFeedDetails() **之前**出现", () => {
    const atOpen = body.indexOf("setDetailCard(card)");
    const atFetch = body.indexOf("prefetchFeedDetails()");
    expect(atOpen, "缺少「不等详情表就先开弹层」这一跳").toBeGreaterThan(-1);
    expect(atFetch).toBeGreaterThan(-1);
    expect(
      atOpen < atFetch,
      "setDetailCard(card) 必须在 prefetchFeedDetails() 之前 —— 否则又变成「等下载完才开弹层」",
    ).toBe(true);
  });

  it("详情到位后按 repo 补写（不是无条件覆盖：用户可能已关闭或改看了别的卡）", () => {
    expect(body).toMatch(/setDetailCard\(\(prev\)/);
    expect(body).toMatch(/prev\.repo === card\.repo/);
  });
});

describe("详情表直拉合流（五轮 T1：同页不许并发下载同一份 5.2MB）", () => {
  const src = readFileSync(resolve("web/src/feed-payload.ts"), "utf8");
  it("直拉走单一在飞 Promise（directPromise），看门狗不再各发一条 fetch", () => {
    expect(src).toMatch(/let directPromise: Promise<string> \| null = null;/);
    expect(src).toMatch(/function fetchDetailsText\(\)/);
    expect(src).toMatch(/fetchDetailsText\(\)\.then\(resolve\)/);
  });
});
