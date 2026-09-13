/**
 * 第二环节 stage2 TS 移植测试（对照 Python 版行为：domain_key/pack/G9/fix_adjacent）。
 * 关键行为锁定：确定性装箱（头部单卡批/同键不扎堆）、G9 批内撞车、排列层相邻换位。
 */

import { describe, it, expect } from "vitest";
import {
  coarseClassify,
  assignKeys,
  pack,
  checkBatch,
  g9Feedback,
  fixAdjacent,
  normalizeOpener,
} from "../feed/stage2.ts";

const mkRepo = (
  repo: string,
  stars: number,
  topics: string[] = [],
  desc = "",
): { repo: string; stars: number; topics: string[]; desc: string } => ({
  repo,
  stars,
  topics,
  desc,
});

describe("domain_key", () => {
  it("有 topics → topics[0]（search 桶语义）", () => {
    expect(coarseClassify("a/b", "desc", ["llm"])).toBe("llm");
  });

  it("无 topics → 关键词粗分（学习→好玩→AI→工具兜底）", () => {
    expect(coarseClassify("a/b", "awesome list")).toBe("学习");
    expect(coarseClassify("a/b", "game engine")).toBe("好玩");
    expect(coarseClassify("a/b", "agent framework")).toBe("AI");
    expect(coarseClassify("a/b", "random tool")).toBe("工具");
  });

  it("超占比桶逐轮下拆（20% 上限）", () => {
    const repos = [
      mkRepo("a/1", 100, ["llm", "推理"]),
      mkRepo("a/2", 100, ["llm", "训练"]),
      mkRepo("a/3", 100, ["llm", "RAG"]),
      mkRepo("a/4", 100, ["llm", "Agent"]),
      mkRepo("b/5", 100, ["web"]),
    ];
    const keys = assignKeys(repos, 0.2);
    const counts: Record<string, number> = {};
    for (const k of Object.values(keys)) counts[k] = (counts[k] ?? 0) + 1;
    // llm 桶 4/5=80% 超线 → 拆到细分词；拆后最大桶 ≤2（5×0.2=1，拆不动也摊匀 ≤2）
    expect(Object.values(counts).every((c) => c <= 2)).toBe(true);
    expect(keys["a/1"]).not.toBe("llm"); // 至少一个被拆出 llm 桶
  });
});

describe("pack 确定性装箱", () => {
  it("头部仓（star≥1万）单卡成批", () => {
    const repos = [mkRepo("a/head", 20000), mkRepo("b/tail", 100)];
    const batches = pack(repos, 5, 10000);
    expect(batches).toHaveLength(2);
    expect(batches[0]).toHaveLength(1);
    expect(batches[0]![0]!.repo).toBe("a/head");
  });

  it("同键长尾仓不扎堆（占比≤20% 每批 ≤1 张）", () => {
    const repos = [
      mkRepo("a/1", 100, ["llm"]),
      mkRepo("a/2", 100, ["llm"]),
      mkRepo("b/3", 100, ["web"]),
      mkRepo("c/4", 100, ["game"]),
      mkRepo("d/5", 100, ["tool"]),
      mkRepo("e/6", 100, ["db"]),
    ];
    const batches = pack(repos, 5, 10000, 0.2);
    for (const b of batches) {
      const keys = b.map((r) => coarseClassify(r.repo, r.desc || "", r.topics || []));
      const maxSame = Math.max(...keys.map((k) => keys.filter((x) => x === k).length), 1);
      expect(maxSame).toBeLessThanOrEqual(2); // llm 占 2/6=33%，拆不动也 ≤2（ceil(0.33×5)）
    }
  });

  it("确定性：同样输入同样切批", () => {
    const repos = [mkRepo("a/1", 100, ["llm"]), mkRepo("b/2", 100, ["web"]), mkRepo("c/3", 100, ["game"])];
    expect(pack(repos)).toEqual(pack(repos));
  });

  it("覆盖全部且不重复", () => {
    const repos = Array.from({ length: 12 }, (_, i) => mkRepo(`k/${i}`, 100, [`t${i % 3}`]));
    const batches = pack(repos, 5, 10000, 0.2);
    const flat = batches.flat().map((r) => r.repo);
    expect(new Set(flat).size).toBe(12);
    expect(flat.sort()).toEqual(repos.map((r) => r.repo).sort());
  });
});

describe("G9 批内开头闸", () => {
  it("撞车检测：同批两卡开头共享 ≥6 字汉字 → 命中", () => {
    const cards = [
      { repo: "a/1", detail_cn: "这个项目是一个开源的测试框架，它解决的核心问题。" },
      { repo: "b/2", detail_cn: "这个项目是一个开源的测试框架，不过侧重不同方向。" },
    ];
    const hits = checkBatch(cards, 6);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]!.run.length).toBeGreaterThanOrEqual(6);
  });

  it("短壳放过（5 字内归频次层，G9 只管长借料）", () => {
    const cards = [
      { repo: "a/1", detail_cn: "这是一个项目，第一句内容。" },
      { repo: "b/2", detail_cn: "这是一个引擎，第二句内容。" },
    ];
    expect(checkBatch(cards, 6)).toHaveLength(0); // LCS「这是一个」5 字 < 6
  });

  it("反馈文案包含重复片段与长度", () => {
    const fb = g9Feedback({ i: 0, j: 1, len: 8, run: "这个项目是" });
    expect(fb).toContain("这个项目是");
    expect(fb).toContain("8 字");
  });
});

describe("fixAdjacent 排列层", () => {
  it("相邻同前缀换位消除", () => {
    const cards = [
      { repo: "a/1", detail_cn: "同一个开头甲项目，后续内容不同" },
      { repo: "b/2", detail_cn: "同一个开头乙项目，后续内容不同" },
      { repo: "c/3", detail_cn: "完全不同开头的丙项目" },
    ];
    const out = fixAdjacent(cards);
    const prefixes = out.map((c) => normalizeOpener(c.detail_cn!, []).slice(0, 4));
    for (let i = 1; i < prefixes.length; i++) {
      if (prefixes[i] && prefixes[i - 1]) {
        expect(prefixes[i]).not.toBe(prefixes[i - 1]);
      }
    }
  });

  it("全同前缀无处可换 → 原样保留不崩溃", () => {
    const cards = [
      { repo: "a/1", detail_cn: "同样的开头内容甲" },
      { repo: "b/2", detail_cn: "同样的开头内容乙" },
    ];
    const out = fixAdjacent(cards);
    expect(out).toHaveLength(2);
  });
});
