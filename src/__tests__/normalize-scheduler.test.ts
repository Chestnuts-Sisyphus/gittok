/**
 * 分位归一化（normalize.ts）+ 调度器框架（scheduler.ts）测试。
 * 关键行为锁定：分位对齐/冷启动先验、批粒度路由/额度记账/断点恢复。
 */

import { describe, it, expect, beforeEach } from "vitest";
import { QuantileNormalizer, quantileOf, MIN_SAMPLES } from "../feed/normalize.ts";
import { QuotaLedger, ProductionScheduler, parseMatrix } from "../feed/scheduler.ts";

// ---------------------------------------------------------------------------
// 分位归一化
// ---------------------------------------------------------------------------

describe("QuantileNormalizer 分位归一化", () => {
  it("冷启动（样本不足）→ 先验偏移（高档压降/低档抬升，向 0.5 收拢）", () => {
    const n = new QuantileNormalizer();
    const high = n.normalize("qwen3.7-max", 0.7); // 高档先验 +0.12 → 压降
    const low = n.normalize("qwen-flash", 0.4); // 低档先验 -0.06 → 抬升
    expect(high).toBeLessThan(0.7);
    expect(low).toBeGreaterThan(0.4);
    expect(high).toBeGreaterThan(0.5 - 0.3);
    expect(low).toBeLessThan(0.5 + 0.3);
  });

  it("样本足 → 经验分位对齐（同值跨模型映射到相近分位）", () => {
    const n = new QuantileNormalizer();
    // 模型 A 给分激进（0.6-0.9），模型 B 保守（0.3-0.6）
    for (let i = 0; i < MIN_SAMPLES; i++) {
      n.record("model-a", 0.6 + (i % 30) / 100);
      n.record("model-b", 0.3 + (i % 30) / 100);
    }
    const aMid = n.normalize("model-a", 0.75); // A 的中高
    const bMid = n.normalize("model-b", 0.45); // B 的中高
    expect(aMid).toBeGreaterThan(0.4);
    expect(bMid).toBeGreaterThan(0.4);
    expect(Math.abs(aMid - bMid)).toBeLessThan(0.3); // 对齐后同语义相近
    expect(aMid).toBeGreaterThan(n.normalize("model-a", 0.6)); // 高分位仍高于低分位
  });

  it("纯函数 quantileOf：空样本回 0.5；边界值不越界", () => {
    expect(quantileOf([], 0.5)).toBe(0.5);
    const sorted = [0.1, 0.3, 0.5, 0.7, 0.9];
    expect(quantileOf(sorted, 0.5)).toBeGreaterThan(0.4);
    expect(quantileOf(sorted, 0.9)).toBeGreaterThan(quantileOf(sorted, 0.1));
    expect(quantileOf(sorted, 0.1)).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 调度器：额度记账 + 批粒度路由
// ---------------------------------------------------------------------------

describe("QuotaLedger 额度记账", () => {
  it("注册/记账/耗尽标记", () => {
    const l = new QuotaLedger();
    l.register("flash", "tail", 100);
    l.charge("flash", 60, 50);
    expect(l.nextModel("tail")).toBeNull(); // 110 ≥ 100 耗尽
    expect(l.tierExhausted("tail")).toBe(true);
  });

  it("批粒度路由：头部单卡批走高档，长尾批走 flash；高档耗尽降级", () => {
    const l = new QuotaLedger();
    l.register("high", "head", 0);
    l.register("flash", "tail", 0);
    const headRoute = l.route(1, [20000]);
    expect(headRoute).toEqual({ tier: "head", model: "high" });
    const tailRoute = l.route(5, [100, 100, 100, 100, 100]);
    expect(tailRoute).toEqual({ tier: "tail", model: "flash" });
    // 高档耗尽 → 降级 flash
    l.register("high", "head", 1);
    l.charge("high", 1, 1);
    const degraded = l.route(1, [20000]);
    expect(degraded!.model).toBe("flash");
  });

  it("全池耗尽 → 返回 null（付费兜底语义）并计数", () => {
    const l = new QuotaLedger();
    l.register("flash", "tail", 1);
    l.charge("flash", 1, 1);
    const r = l.route(5, [100, 100, 100]);
    expect(r).toBeNull();
    expect(l.fallbackCount).toBe(1);
  });

  it("快照恢复（断点续跑保留已用 token）", () => {
    const l = new QuotaLedger();
    l.register("flash", "tail", 100);
    l.charge("flash", 30, 20);
    const snap = l.snapshot();
    const l2 = new QuotaLedger();
    l2.restore(snap);
    l2.charge("flash", 40, 20); // 30+20+40+20=110 → 耗尽
    expect(l2.tierExhausted("tail")).toBe(true);
  });
});

describe("parseMatrix 矩阵解析", () => {
  it("从环境变量解析 provider:model:quota", () => {
    const env = {
      SCHED_HEAD_MODELS: "zhipu:glm-5:500000",
      SCHED_TAIL_MODELS: "zhipu:glm-4.5-flash:1000000;groq:qwen3.7-flash",
    };
    const matrix = parseMatrix(env as NodeJS.ProcessEnv);
    expect(matrix).toHaveLength(3);
    expect(matrix[0]).toMatchObject({ provider: "zhipu", model: "glm-5", quotaTokens: 500000, tier: "head" });
    expect(matrix[2]).toMatchObject({ provider: "groq", model: "qwen3.7-flash", quotaTokens: 0 });
  });

  it("模型名含冒号（OR :free 后缀）不被拆坏——末段纯数字才当 quota", () => {
    const env = {
      SCHED_TAIL_MODELS:
        "openrouter:nvidia/nemotron-3-ultra-550b-a55b:free:50000;openrouter:z-ai/glm-4.7-flash:free",
    };
    const matrix = parseMatrix(env as NodeJS.ProcessEnv);
    expect(matrix).toHaveLength(2);
    expect(matrix[0]).toMatchObject({
      provider: "openrouter",
      model: "nvidia/nemotron-3-ultra-550b-a55b:free",
      quotaTokens: 50000,
      tier: "tail",
      key: "openrouter:nvidia/nemotron-3-ultra-550b-a55b:free",
    });
    // 无 quota 的 :free 模型：quota=0（不限额语义），模型名完整
    expect(matrix[1]).toMatchObject({
      provider: "openrouter",
      model: "z-ai/glm-4.7-flash:free",
      quotaTokens: 0,
    });
  });

  it("畸形段丢弃：无 provider 分隔符/空 provider/空模型", () => {
    const env = { SCHED_TAIL_MODELS: "glm-4.7-flash;:model:100;provider:;ok:model:5" };
    const matrix = parseMatrix(env as NodeJS.ProcessEnv);
    expect(matrix).toHaveLength(1);
    expect(matrix[0]).toMatchObject({ provider: "ok", model: "model", quotaTokens: 5 });
  });
});

describe("ProductionScheduler 断点续跑", () => {
  beforeEach(() => {
    // 隔离 state 文件：测试用内存状态注入，不碰真实 data/
  });

  it("构造时可注入状态（续跑语义）", () => {
    const s = new ProductionScheduler({
      done: { "a/done": { card: {}, model: "m", head: false } },
      failed: {},
      ledger: {
        models: [
          {
            model: "flash",
            tier: "tail",
            quotaTokens: 100,
            usedTokens: 50,
            calls: 1,
            cardsOk: 0,
            exhausted: false,
          },
        ],
        fallbackCount: 0,
      },
      updatedAt: "",
    });
    expect(s.doneRepos().has("a/done")).toBe(true);
    // 续跑时已用 token 保留
    s.ledger.charge("flash", 60, 0); // 50+60=110 → 耗尽
    expect(s.ledger.tierExhausted("tail")).toBe(true);
  });
});
