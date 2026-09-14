/**
 * E1 接线测试：相似度降权排序（diversifyRank）。
 *
 * 缺口原状：similarity.ts 只是检查器（能算近重复直方图），**没有任何生产路径消费它**——
 * 推荐流排序里看不见相似度。本测试锁死接线后的行为：
 *  ① 近重复的后来者被降权后移；② **不排除任何卡**（策展流理念）；③ 非同质卡不被误伤。
 */

import { describe, it, expect } from "vitest";
import { diversifyRank } from "../feed/similarity.ts";

const mk = (repo: string, text: string, score: number) => ({ repo, summaryCn: text, score });

describe("E1 diversifyRank 相似度降权排序", () => {
  it("近重复的后来者被后移（不排除，仍在列表里）", () => {
    const dupText = "把 AI 智能体变成像素宠物陪你写代码的桌面小精灵";
    const cards = [
      mk("a/1", dupText, 1.0),
      mk("b/2", "一个分布式数据库的高可用方案", 0.95),
      mk("c/3", dupText, 0.9), // 与 a/1 近重复，分数再高也该让位
      mk("d/4", "终端里的 ASCII 地球仪，零依赖", 0.85),
    ];
    const { cards: out, demoted } = diversifyRank(cards, { penalty: 0.5, threshold: 0.35 });
    expect(demoted).toBe(1);
    expect(out).toHaveLength(4); // 一张不丢
    expect(out.map((c) => c.repo)).toEqual(["a/1", "b/2", "d/4", "c/3"]);
  });

  it("非同质卡原序不变（不误伤）", () => {
    const cards = [
      mk("a/1", "分布式数据库高可用", 1),
      mk("b/2", "像素风地下城冒险游戏", 0.9),
      mk("c/3", "家庭能源监控面板", 0.8),
    ];
    const { cards: out, demoted } = diversifyRank(cards, { penalty: 0.3 });
    expect(demoted).toBe(0);
    expect(out.map((c) => c.repo)).toEqual(["a/1", "b/2", "c/3"]);
  });

  it("penalty=0 时只标记不降权（同序）", () => {
    const dupText = "一模一样的两张卡文本内容在这里";
    const cards = [mk("a/1", dupText, 1), mk("b/2", dupText, 0.5)];
    const { cards: out } = diversifyRank(cards, { penalty: 0 });
    expect(out.map((c) => c.repo)).toEqual(["a/1", "b/2"]);
  });

  it("窗口参数生效：只与最近 K 张比（性能护栏）", () => {
    const dupText = "同一个模板生成的 AI 助手项目介绍文本";
    // 中间夹一段**彼此也互不相似**的卡（否则它们自己就会互相判重，测不出窗口的作用）
    const distinct = [
      "国际象棋在线对弈平台的后端",
      "家庭能源监控面板与用电账单分析",
      "复古像素风地下城冒险游戏",
      "把卫星影像渲染成三维地图的浏览器工具",
      "轻量级分布式键值数据库",
      "命令行视频下载器，支持上百个站点",
      "实时协作白板，基于 WebRTC",
      "给摄影师用的批量水印工具",
      "开源电子病历系统",
      "把 PDF 转成结构化数据的解析库",
    ];
    const cards = [
      mk("a/1", dupText, 1),
      ...distinct.map((t, i) => mk(`x/${i}`, t, 0.9 - i * 0.01)),
      mk("z/1", dupText, 0.5),
    ];
    const narrow = diversifyRank(cards, { penalty: 0.3, window: 1 });
    expect(narrow.demoted).toBe(0); // 窗口=1：只跟前一张比，前面的同质卡已被隔远
    const wide = diversifyRank(cards, { penalty: 0.3, window: 80 });
    expect(wide.demoted).toBe(1); // 窗口够大才看得见 a/1 与 z/1 是近重复
  });
});
