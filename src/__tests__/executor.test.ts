/**
 * 调度器执行层（executor.ts）测试。
 * 关键行为锁定：按矩阵键直连/未注册回退、空响应节流重试+熔断、参数env注入（防再出 :free 冒号类坑）。
 */

import { describe, it, expect, vi } from "vitest";
import { ScheduledLlmExecutor, matrixEnvKey, executorFromMatrix } from "../feed/executor.ts";
import type { LlmProvider } from "../providers/types.ts";

/** 假 provider：按脚本返回/抛错，记录调用次数 */
function fakeProvider(script: Array<{ text?: string; err?: string }>): LlmProvider & { calls: number } {
  const p = {
    name: "fake",
    calls: 0,
    async call(_prompt: string, _maxTokens: number): Promise<string> {
      const step = script[Math.min(p.calls, script.length - 1)]!;
      p.calls++;
      if (step.err) throw new Error(step.err);
      return step.text ?? "";
    },
  };
  return p;
}

// 测试预设：全池冷却即熔断（waitForCooldown=false，专测硬失败路径）；
// 降档等待语义（生产默认）另用 downshift 预设测。
const fast = { emptyRetries: 2, emptyBackoffMs: 1, cooldownMs: 20, waitForCooldown: false };

describe("ScheduledLlmExecutor 通道路由", () => {
  it("未注册键 → callerFor 返回 null（调用方走编队兜底）", () => {
    const ex = new ScheduledLlmExecutor([]);
    expect(ex.callerFor("zhipu:glm-4.7-flash")).toBeNull();
    expect(ex.size).toBe(0);
  });

  it("注册键 → callerFor 返回可调用函数，且惰性实例化（注册不建 provider）", async () => {
    let built = 0;
    const ex = new ScheduledLlmExecutor([], fast);
    ex.register({
      provider: "zhipu",
      model: "glm-4.7-flash",
      factory: () => {
        built++;
        return [fakeProvider([{ text: "ok" }])];
      },
    });
    expect(built).toBe(0); // 注册不实例化
    const caller = ex.callerFor("zhipu:glm-4.7-flash")!;
    expect(built).toBe(0); // 取函数也不实例化
    expect(await caller("p", 100)).toBe("ok");
    expect(built).toBe(1);
    expect(ex.health()[0]).toMatchObject({ key: "zhipu:glm-4.7-flash", calls: 1, ok: 1 });
  });

  it("空响应（魔搭节流 stub）→ 换实例/短退避重试；单实例池重试后仍空 → 抛错", async () => {
    // 首次空响应、第二次成功
    const p1 = fakeProvider([{ text: "" }, { text: "recovered" }]);
    const ex = new ScheduledLlmExecutor(
      [{ provider: "custom:modelscope", model: "deepseek-ai/DeepSeek-V4-Flash-0731", factory: () => [p1] }],
      // emptyRetries=1：单实例池内最多再试 1 轮（首轮 + 1 次重试）
      { emptyRetries: 1, emptyBackoffMs: 1, cooldownMs: 20 },
    );
    const caller = ex.callerFor("custom:modelscope:deepseek-ai/DeepSeek-V4-Flash-0731")!;
    expect(await caller("p", 100)).toBe("recovered");
    expect(p1.calls).toBe(2); // 实际调 2 次（1 次空 + 1 次重试成功）
    // health.calls 记「调用方视角的调用次数」（与编队 fleetHealth 口径一致），重试次数单列
    expect(ex.health()[0]).toMatchObject({ calls: 1, ok: 1, emptyRetries: 1 });
  });

  it("多账号池：账号 A 节流 → 自动换账号 B（不熔断整条通道）", async () => {
    const a = fakeProvider([{ err: "429 rate limited" }]); // A 恒节流
    const b = fakeProvider([{ text: "from-b" }]);
    const ex = new ScheduledLlmExecutor([], { emptyRetries: 1, emptyBackoffMs: 1, cooldownMs: 2000 });
    ex.register({
      provider: "zhipu",
      model: "glm-4.7-flash",
      factory: () => [a, b], // 池：k1→A、k2→B
    });
    const caller = ex.callerFor("zhipu:glm-4.7-flash")!;
    expect(await caller("p", 10)).toBe("from-b"); // A 429 → 换 B 接住
    expect(a.calls).toBe(1); // A 只被打中一次（429 后进冷却，不重试）
    expect(b.calls).toBe(1);
    // 账号 A 冷却，但通道未熔断；新 caller 也必须继承冷却状态（状态挂在 lane 上，非闭包）
    expect(ex.callerFor("zhipu:glm-4.7-flash")).not.toBeNull();
    expect(ex.health()[0]!.cooldowns).toBe(0);
    expect(await ex.callerFor("zhipu:glm-4.7-flash")!("p", 10)).toBe("from-b");
    expect(a.calls).toBe(1); // A 仍在冷却窗口内，未被再试（跨 caller 状态保持）
  });

  it("全池账号节流 → 通道熔断（冷却期内 callerFor=null），不污染其他通道", async () => {
    const dead = fakeProvider([{ text: "" }]); // 永远空（单实例池）
    const alive = fakeProvider([{ text: "alive" }]);
    const ex = new ScheduledLlmExecutor(
      [
        { provider: "custom:modelscope", model: "m1", factory: () => [dead] },
        { provider: "zhipu", model: "m2", factory: () => [alive] },
      ],
      fast,
    );
    const c1 = ex.callerFor("custom:modelscope:m1")!;
    await expect(c1("p", 10)).rejects.toThrow(/empty/i);
    expect(ex.callerFor("custom:modelscope:m1")).toBeNull(); // 熔断
    // 其他通道不受影响
    const c2 = ex.callerFor("zhipu:m2")!;
    expect(await c2("p", 10)).toBe("alive");
    expect(ex.health().find((h) => h.key === "custom:modelscope:m1")).toMatchObject({
      cooldowns: 1,
      cooling: true,
    });
  });

  it("429 同样触发节流重试与熔断（与编队耗尽语义一致）", async () => {
    const e429 = Object.assign(new Error("rate limited"), { status: 429 });
    const p = {
      name: "fake429",
      calls: 0,
      async call(): Promise<string> {
        p.calls++;
        throw e429;
      },
    };
    const ex = new ScheduledLlmExecutor(
      [{ provider: "openrouter", model: "x:free", factory: () => [p] }],
      fast,
    );
    const caller = ex.callerFor("openrouter:x:free")!;
    await expect(caller("p", 10)).rejects.toThrow(/rate limited/);
    expect(ex.callerFor("openrouter:x:free")).toBeNull();
  });

  it("降档等待（生产默认）：账号 429 冷却 → 等到解冻继续跑（不熔断）", async () => {
    let aCalls = 0;
    const a = {
      name: "a",
      async call(): Promise<string> {
        aCalls++;
        if (aCalls === 1) throw Object.assign(new Error("429 rate limited"), { status: 429 });
        return "after-wait";
      },
    };
    const ex = new ScheduledLlmExecutor([], {
      emptyRetries: 1,
      emptyBackoffMs: 1,
      cooldownMs: 60,
      waitForCooldown: true,
      maxWaitMs: 5_000,
    });
    ex.register({ provider: "zhipu", model: "m", keys: ["k1"], factory: () => [a] });
    const caller = ex.callerFor("zhipu:m")!;
    // 单账号池：429 → 该账号冷却 → 降档等待解冻 → 重试成功（一次调用内完成）
    expect(await caller("p", 10)).toBe("after-wait");
    expect(aCalls).toBe(2);
    expect(ex.health()[0]!.cooldowns).toBe(0); // 全程未熔断
  });

  it("降档等待上限：等待超过 maxWaitMs → 交上层（抛错，不无限挂）", async () => {
    const dead = fakeProvider([{ err: "429 rate limited" }]);
    const ex = new ScheduledLlmExecutor([], {
      emptyRetries: 0,
      emptyBackoffMs: 1,
      cooldownMs: 5_000,
      waitForCooldown: true,
      maxWaitMs: 50, // 远小于 cooldownMs
    });
    ex.register({ provider: "zhipu", model: "m", keys: ["k1"], factory: () => [dead] });
    const caller = ex.callerFor("zhipu:m")!;
    await expect(caller("p", 10)).rejects.toThrow(/429/);
    // 通道已熔断（等待超限后走熔断判定）
    expect(ex.health()[0]!.cooldowns).toBe(1);
  });

  it("非节流错误（如 401）不重试不熔断，直接上抛", async () => {
    const p = fakeProvider([{ err: "401 Unauthorized" }]);
    const ex = new ScheduledLlmExecutor([{ provider: "zhipu", model: "m", factory: () => [p] }], fast);
    const caller = ex.callerFor("zhipu:m")!;
    await expect(caller("p", 10)).rejects.toThrow(/401/);
    expect(p.calls).toBe(1); // 未重试
    expect(ex.callerFor("zhipu:m")).not.toBeNull(); // 未熔断
  });
});

describe("executorFromMatrix 矩阵参数注入", () => {
  it("matrixEnvKey 大写化+非法字符转下划线（:free / / 都安全）", () => {
    expect(matrixEnvKey("openrouter", "nvidia/nemotron-3-ultra-550b-a55b:free")).toBe(
      "SCHED_PARAMS_OPENROUTER_NVIDIA_NEMOTRON_3_ULTRA_550B_A55B_FREE",
    );
  });

  it("按模型级 env 注入 extraParams（reasoning/max_tokens 类参数不写死源码）", () => {
    const env = {
      SCHED_PARAMS_OPENROUTER_NVIDIA_NEMOTRON_3_ULTRA_550B_A55B_FREE:
        '{"reasoning":{"enabled":false},"max_tokens":8192}',
    } as NodeJS.ProcessEnv;
    const ex = executorFromMatrix(
      [{ provider: "openrouter", model: "nvidia/nemotron-3-ultra-550b-a55b:free" }],
      env,
    );
    expect(ex.size).toBe(1);
    expect(ex.has("openrouter:nvidia/nemotron-3-ultra-550b-a55b:free")).toBe(true);
  });

  it("矩阵条目 `custom:名字:模型` → 通道键与路由键一致（provider=custom，名字+模型在 model 侧）", () => {
    // parseMatrix 出来的形态：provider=custom, model=modelscope:deepseek-...
    const ex = executorFromMatrix(
      [{ provider: "custom", model: "modelscope:deepseek-ai/DeepSeek-V4-Flash-0731" }],
      {},
    );
    expect(ex.size).toBe(1);
    // 路由键 = `${provider}:${model}`（与 scheduler 的 MatrixEntry.key 同构）
    expect(ex.has("custom:modelscope:deepseek-ai/DeepSeek-V4-Flash-0731")).toBe(true);
  });

  it("非法 JSON / 非对象 → 抛错（fail-fast，不静默降级）", () => {
    const bad = { SCHED_PARAMS_ZHIPU_GLM: "{oops" } as NodeJS.ProcessEnv;
    expect(() => executorFromMatrix([{ provider: "zhipu", model: "glm" }], bad)).toThrow(/JSON/);
    const arr = { SCHED_PARAMS_ZHIPU_GLM: "[1,2]" } as NodeJS.ProcessEnv;
    expect(() => executorFromMatrix([{ provider: "zhipu", model: "glm" }], arr)).toThrow(/JSON 对象/);
  });

  it("多 key 池：SCHED_KEYS_<SLUG> 拆成独立实例（防「逗号串当单 key」401 病根复发）", async () => {
    // 病根实测（2026-09-14 首跑）：executorFromMatrix 未传 keys → 单实例拿到逗号串 → 整串当
    // Bearer → 全线 401。修法 = 按 SCHED_KEYS_* 拆池：每 key 一个独立实例。
    vi.stubEnv("ZHIPU_API_KEY", "unit-test-placeholder");
    const { buildProviderPool } = await import("../feed/executor.ts");
    const pool = buildProviderPool({ provider: "zhipu", model: "m", keys: ["k1", "k2"] });
    expect(pool.length).toBe(2); // 拆池：不是 1 个实例拿逗号串
    for (const p of pool) expect(p.name).toContain("zhipu");
    // 单 key 也走同一条路（池长 1）；无 keys → 走 env（池长 1）
    expect(buildProviderPool({ provider: "zhipu", model: "m", keys: ["k1"] }).length).toBe(1);
    expect(buildProviderPool({ provider: "zhipu", model: "m" }).length).toBe(1);
    vi.unstubAllEnvs();
  });

  it("executorFromMatrix 读 SCHED_KEYS_* 建池（键名与启动器注入一致）", () => {
    const env = { SCHED_KEYS_ZHIPU_M: "k1,k2,k3" } as NodeJS.ProcessEnv;
    const ex = executorFromMatrix([{ provider: "zhipu", model: "m" }], env);
    expect(ex.size).toBe(1);
    expect(ex.has("zhipu:m")).toBe(true); // 注册成功；惰性构造，调用时才建 provider
    expect(ex.callerFor("zhipu:m")).not.toBeNull();
  });
});
