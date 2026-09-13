/**
 * 调度器执行层（executor.ts）测试。
 * 关键行为锁定：按矩阵键直连/未注册回退、空响应节流重试+熔断、参数env注入（防再出 :free 冒号类坑）。
 */

import { describe, it, expect } from "vitest";
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

const fast = { emptyRetries: 2, emptyBackoffMs: 1, cooldownMs: 20 };

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
        return fakeProvider([{ text: "ok" }]);
      },
    });
    expect(built).toBe(0); // 注册不实例化
    const caller = ex.callerFor("zhipu:glm-4.7-flash")!;
    expect(built).toBe(0); // 取函数也不实例化
    expect(await caller("p", 100)).toBe("ok");
    expect(built).toBe(1);
    expect(ex.health()[0]).toMatchObject({ key: "zhipu:glm-4.7-flash", calls: 1, ok: 1 });
  });

  it("空响应（魔搭节流 stub）→ 短退避重试；仍败 → 熔断冷却（callerFor 转 null）", async () => {
    // 首次空响应、第二次成功
    const p1 = fakeProvider([{ text: "" }, { text: "recovered" }]);
    const ex = new ScheduledLlmExecutor(
      [{ provider: "custom:modelscope", model: "deepseek-ai/DeepSeek-V4-Flash-0731", factory: () => p1 }],
      fast,
    );
    const caller = ex.callerFor("custom:modelscope:deepseek-ai/DeepSeek-V4-Flash-0731")!;
    expect(await caller("p", 100)).toBe("recovered");
    expect(p1.calls).toBe(2); // provider 实际被调 2 次（1 次空 + 1 次重试成功）
    // health.calls 记「调用方视角的调用次数」（与编队 fleetHealth 口径一致），重试次数单列
    expect(ex.health()[0]).toMatchObject({ calls: 1, ok: 1, emptyRetries: 1 });
  });

  it("连续空响应 → 熔断该通道（冷却期内 callerFor=null），不污染其他通道", async () => {
    const dead = fakeProvider([{ text: "" }]); // 永远空
    const alive = fakeProvider([{ text: "alive" }]);
    const ex = new ScheduledLlmExecutor(
      [
        { provider: "custom:modelscope", model: "m1", factory: () => dead },
        { provider: "zhipu", model: "m2", factory: () => alive },
      ],
      fast,
    );
    const c1 = ex.callerFor("custom:modelscope:m1")!;
    await expect(c1("p", 10)).rejects.toThrow(/empty/i);
    expect(dead.calls).toBe(3); // 1 次 + 2 次重试
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
      [{ provider: "openrouter", model: "x:free", factory: () => p }],
      fast,
    );
    const caller = ex.callerFor("openrouter:x:free")!;
    await expect(caller("p", 10)).rejects.toThrow(/rate limited/);
    expect(ex.callerFor("openrouter:x:free")).toBeNull();
  });

  it("非节流错误（如 401）不重试不熔断，直接上抛", async () => {
    const p = fakeProvider([{ err: "401 Unauthorized" }]);
    const ex = new ScheduledLlmExecutor([{ provider: "zhipu", model: "m", factory: () => p }], fast);
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
});
