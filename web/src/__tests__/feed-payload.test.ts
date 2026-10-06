// @ts-ignore —— 与 storage.test.ts 相同：根 vitest 跑 web 测试
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  splitFeedPayload,
  mergeDetail,
  diffDetailKeys,
  withRepoDetail,
  detailShardPath,
  detailShardBody,
  parseDetailShard,
} from "../feed-payload.ts";

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

// ---------------------------------------------------------------------------
// 分片纯函数（二十轮 C3）：路径/文件体/三态解析/单卡合并
// ---------------------------------------------------------------------------
describe("detailShardPath", () => {
  it("repo 键 → data/details 相对路径（两段小写规范键）", () => {
    expect(detailShardPath("facebook/react")).toBe("details/facebook/react.json");
    expect(detailShardPath("owner/rust.lib.name")).toBe("details/owner/rust.lib.name.json");
    expect(detailShardPath("Hmbown/Codewhale")).toBe("details/hmbown/codewhale.json");
  });
  it("大小写漂移双卡共享同一分片（GitHub repo 名大小写不敏感，实测数据有此例）", () => {
    expect(detailShardPath("Hmbown/Codewhale")).toBe(detailShardPath("Hmbown/CodeWhale"));
  });
  it("无斜杠的畸形键也有确定路径（不抛错）", () => {
    expect(detailShardPath("weird")).toBe("details/weird/index.json");
  });
});

describe("detailShardBody / parseDetailShard", () => {
  it("正文分片往返一致", () => {
    const body = detailShardBody("长文内容");
    expect(parseDetailShard(body)).toBe("长文内容");
  });
  it("墓碑分片解析为 null（确认缺失）", () => {
    expect(detailShardBody(null)).toBe('{"detailCn":null}');
    expect(parseDetailShard(detailShardBody(null))).toBeNull();
  });
  it("畸形体解析为 undefined（调用方走兜底）", () => {
    expect(parseDetailShard("not json")).toBeUndefined();
    expect(parseDetailShard('{"detailCn":42}')).toBeUndefined();
    expect(parseDetailShard('{"detailCn":""}')).toBeUndefined();
  });
});

describe("withRepoDetail（单卡合并）", () => {
  it("补写 detailCn", () => {
    expect(withRepoDetail({ repo: "a/b" }, "长文")).toEqual({ repo: "a/b", detailCn: "长文" });
  });
  it("卡上已有 detailCn 不覆盖（快照卡优先）", () => {
    const card = { repo: "a/b", detailCn: "快照" };
    expect(withRepoDetail(card, "分片")).toBe(card);
  });
  it("null（确认缺失）原样返回，不造空串", () => {
    const card = { repo: "a/b" };
    expect(withRepoDetail(card, null)).toBe(card);
  });
});

// ---------------------------------------------------------------------------
// G-04 详情表缺键可观测点（历史原锁保留：二十轮起缺键走墓碑/「暂无」态，此核对继续管整表）
// ---------------------------------------------------------------------------
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
// 五轮 T1：点击**不许等详情**（线上实测的根因锁；二十轮 N1 沿用并扩到分片路径）
// ---------------------------------------------------------------------------
/**
 * 症状（线上必现）：点卡片 → 卡片立刻隐形、弹层长期不出现、无报错。
 * 实测根因（线上冷 profile、逐 100ms 轮询到 120s）：
 *   冷点弹层出现 @ **105.4s**（＝ `feed-details.json` 下载完的时刻），
 *   同一张卡数据就位后再点 @ **107ms**。
 * ⇒ 弹层从来没有「被挡住」，它是在**等一份 5.2MB 的详情表**；此前「从不出现」的结论来自 3.5s 观察窗。
 *
 * 这条锁用源码级断言钉住修法：`handleOpenDetail` 必须在拿到详情**之前**就 `setDetailCard(card)`。
 * 二十轮起详情侧是单卡分片（resolveRepoDetail），锁名随调用点更新，「先开弹层后取数」的
 * 保序语义一字未改。为什么不用行为测试：本仓 vitest 是 node 环境（无 DOM），而 App.tsx 是
 * 整棵 React 树；仓储里对这类「跨不动点」的锁（H-01 单行锁、列数反解锁）都是源码级断言。
 */
describe("handleOpenDetail 不许等详情（五轮 T1 根因锁，二十轮分片沿用）", () => {
  const src = readFileSync(resolve("web/src/App.tsx"), "utf8");
  const body = (() => {
    const start = src.indexOf("const handleOpenDetail = useCallback(");
    expect(start, "App.tsx 里找不到 handleOpenDetail").toBeGreaterThan(-1);
    const end = src.indexOf("\n  }, []);", start);
    return src.slice(start, end);
  })();

  it("先开弹层：setDetailCard(card) 在 resolveRepoDetail() **之前**出现", () => {
    const atOpen = body.indexOf("setDetailCard(card)");
    const atFetch = body.indexOf("resolveRepoDetail(");
    expect(atOpen, "缺少「不等详情就先开弹层」这一跳").toBeGreaterThan(-1);
    expect(atFetch).toBeGreaterThan(-1);
    expect(
      atOpen < atFetch,
      "setDetailCard(card) 必须在 resolveRepoDetail() 之前 —— 否则又变成「等下载完才开弹层」",
    ).toBe(true);
  });

  it("详情到位后按 repo 补写（不是无条件覆盖：用户可能已关闭或改看了别的卡）", () => {
    expect(body).toMatch(/setDetailCard\(\(prev\)/);
    expect(body).toMatch(/prev\.repo === card\.repo/);
  });

  it("boot 零详情预热不许回退（十二轮 T3）：取数调用只许活在 handleOpenDetail 点击路径里", () => {
    const outside = src.replace(body, "");
    expect(outside).not.toMatch(/resolveRepoDetail\(/);
    expect(outside).not.toMatch(/getRepoDetailIfReady\(/);
  });
});

describe("详情分片运行时（二十轮 C3）", () => {
  const src = readFileSync(resolve("web/src/feed-payload.ts"), "utf8");
  it("整表兜底走单一在飞 Promise（directPromise），不再各发一条 fetch", () => {
    expect(src).toMatch(/let directPromise: Promise<string> \| null = null;/);
    expect(src).toMatch(/function fetchDetailsText\(\)/);
    expect(src).toMatch(/directPromise = null;/);
  });

  it("每 repo 至多一条在飞取数（inflight 合流），结果入会话内存", () => {
    expect(src).toMatch(/const inflight = new Map<string, Promise<string \| null>>\(\);/);
    expect(src).toMatch(/inflight\.set\(repo, p\)/);
    expect(src).toMatch(/inflight\.delete\(repo\)/);
  });

  it("分片与兜底都有超时上限：弹层宁可显式「暂无」也不能永久挂在「加载中」", () => {
    expect(src).toMatch(/AbortSignal\.timeout\(SHARD_TIMEOUT_MS\)/);
    expect(src).toMatch(/AbortSignal\.timeout\(LEGACY_TIMEOUT_MS\)/);
  });
});
