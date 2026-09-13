/**
 * 调度器执行层（2026-09-14 单线推进刀）：把「路由决策的模型键」变成「真按该模型调用」。
 *
 * 背景：scheduler.ts 已完成批粒度路由 + 额度记账，但评分循环仍在调 `callLlm`（编队 worker 池，
 * 谁有空谁接）——路由决策等于没生效。本模块补上执行层：每个 `provider:model`（矩阵键）对应
 * 一条**独立调用通道**（自己的 provider 实例 + 自己的重试/冷却状态），路由给谁就谁跑。
 *
 * 三条硬约束（栗子纪律）：
 *  1. **参数纪律按源落地**：智谱 `thinking:{type:disabled}`（provider 内置）；魔搭
 *     `enable_thinking:false`（{SLUG}_EXTRA_PARAMS）；OR 推理型 `reasoning:{enabled:false}`
 *     +max_tokens 8192（OPENROUTER_EXTRA_PARAMS）。参数名不写死在源码里，走环境变量注入。
 *  2. **节流防护**（B 会话实测魔搭「同日先正常后空响应 stub」）：空响应/节流作为**该通道**
 *     的失败 → 通道内短退避重试 → 仍失败则该通道熔断（冷却），调用方拿到的错误交给上层
 *     逐仓重评/pending 兜底，绝不污染成「卡内容差」。
 *  3. **零回显**：key 只从环境变量（运行时由启动脚本从 D:/AI/KEY/ 注入）读取，任何日志不打印 key。
 *
 * 兜底语义：矩阵键未注册（或全部熔断）→ `callerFor` 返回 null → 调用方落回 `callLlm` 编队
 * （付费压舱石 qwen3.7-flash 通道），生产不中断。
 */

import type { LlmProvider } from "../providers/types.ts";
import { createProvider } from "../providers/index.ts";
import { OpenRouterProvider } from "../providers/openrouter.ts";
import { CustomProvider } from "../providers/custom.ts";
import { ZhipuProvider } from "../providers/zhipu.ts";
import { is429 } from "../report.ts";

/** 空响应/截断类的节流特征（魔搭节流 stub 实测：200 但 content 为空/极短无 JSON） */
const THROTTLE_HINT = /empty response|Unexpected empty/i;

export function isEmptyResponseError(err: unknown): boolean {
  return THROTTLE_HINT.test(String(err));
}

/** 通道构造参数（显式传入优先于环境变量，便于测试与启动脚本覆盖） */
export interface LaneOpts {
  /** 覆盖 key（默认该源的标准 env key，如 ZHIPU_API_KEY / OPENROUTER_API_KEY） */
  apiKey?: string;
  /** 多 key 轮转（制表符/逗号分隔）：同源多账号分摊限流——智谱双账号=真乘法。
   *  非空时优先于 apiKey；每 key 一个 provider 实例，调用轮转取号。 */
  keys?: string[];
  /** 附加请求体参数（如 {enable_thinking:false}）；不传则由 provider 自己读 env */
  extraParams?: Record<string, unknown>;
}

/** 一个矩阵键（provider:model）= 一条通道 */
export interface LaneSpec extends LaneOpts {
  provider: string;
  model: string;
  /** 通道实例工厂；缺省=按 provider 名造真 provider（测试注入假实现用）。
   *  返回数组 = 多实例池（多 key 轮转）；单实例写单项数组即可。 */
  factory?: () => LlmProvider[];
}

/** 通道运行时状态（供健康报告/诊断） */
export interface LaneHealth {
  key: string;
  calls: number;
  ok: number;
  emptyRetries: number;
  cooldowns: number;
  cooling: boolean;
  lastError?: string;
}

interface Lane {
  key: string;
  provider: string;
  model: string;
  /** 惰性实例化：缺 key 的通道在被首次路由到时才报错跳过（不阻塞其他源入池）。
   *  返回该通道的 provider 序列（多 key=多实例轮转）。 */
  lazy: () => LlmProvider[];
  /** 惰性构造的实例池（跨 caller 复用：冷却状态必须活过单次批调用） */
  pool: LlmProvider[] | null;
  /** 每个账号的冷却截止时间（账号级 429 只冷该账号；跨 caller 累积） */
  instCooldownUntil: number[];
  /** 池内轮转游标（跨 caller 累积） */
  cursor: number;
  calls: number;
  ok: number;
  emptyRetries: number;
  cooldowns: number;
  cooldownUntil: number;
  lastError?: string;
}

/** 造 provider 实例（按 provider 名分派；custom: 走泛化通道） */
function makeProvider(spec: LaneSpec, apiKey?: string): LlmProvider {
  const { provider, model, extraParams } = spec;
  const key = apiKey ?? spec.apiKey;
  try {
    if (provider === "openrouter") return new OpenRouterProvider({ model, apiKey: key, extraParams });
    if (provider === "zhipu") return new ZhipuProvider({ model, apiKey: key });
    if (provider === "custom") {
      // 矩阵条目 `custom:名字:模型` 经 parseMatrix 后 = provider="custom" + model="名字:模型"
      // （冒号保留在 model 里，:free 类模型名同理）；泛化通道 slug 取第一个冒号前的段。
      const cut = model.indexOf(":");
      const slug = cut > 0 ? model.slice(0, cut) : model;
      const realModel = cut > 0 ? model.slice(cut + 1) : model;
      return new CustomProvider(slug, { model: realModel, apiKey: key, extraParams });
    }
    // 其余源走统一注册表（key 默认读该源标准 env）
    return createProvider(provider, model, key);
  } catch (err) {
    // 构造失败带上指纹（零回显）：生产里能一眼看出是「哪个账号的 key 配错/缺失」
    throw new Error(`${provider}:${model} 通道构造失败（key=${keyFp(key)}）: ${String(err)}`);
  }
}

/** 单条通道使用的 provider 序列：多 key → 多实例轮转（同源多账号分摊限流）。
 *  导出供测试断言「池长度 = key 数」（防逗号串当单 key 的 401 病根复发）。 */
export function buildProviderPool(spec: LaneSpec): LlmProvider[] {
  const keys = spec.keys && spec.keys.length > 0 ? spec.keys : [undefined];
  return keys.map((k) => makeProvider(spec, k));
}

/** 密钥指纹（前 5 字符 + 长度）；诊断用，零回显全量 key。 */
export function keyFp(k: string | undefined): string {
  return k ? `${k.slice(0, 5)}…(${k.length})` : "(env)";
}

/**
 * 执行层：矩阵键 → 独立调用通道。
 *
 * 用法：
 *   const ex = ScheduledLlmExecutor.fromSpecs([...]);
 *   const caller = ex.callerFor(route.model) ?? callLlm;   // null=未注册/熔断 → 编队兜底
 */
export class ScheduledLlmExecutor {
  private readonly lanes = new Map<string, Lane>();
  private readonly opts: {
    emptyRetries: number;
    emptyBackoffMs: number;
    cooldownMs: number;
    waitForCooldown: boolean;
    maxWaitMs: number;
  };

  constructor(
    specs: LaneSpec[] = [],
    opts?: {
      emptyRetries?: number;
      emptyBackoffMs?: number;
      cooldownMs?: number;
      waitForCooldown?: boolean;
      maxWaitMs?: number;
    },
  ) {
    this.opts = {
      emptyRetries: opts?.emptyRetries ?? 2,
      emptyBackoffMs: opts?.emptyBackoffMs ?? 3_000,
      // 熔断时长：魔搭节流是「分钟级窗口」（B 实测同日先正常后空响应）——5 分钟与编队 429 冷却同刻
      cooldownMs: opts?.cooldownMs ?? 5 * 60_000,
      // 降档等待：全池冷却时不立刻熔断失败，而是等到最早账号解冻再试（免费档友好；
      // 30 个并发批撞分钟级窗口时把「熔断-降级」变成「排队慢跑」——实测 32 并发 3 秒打满双账号）
      waitForCooldown: opts?.waitForCooldown ?? true,
      // 等待上限：单次调用最多等这么久（超过则交上层重评/pending；避免把批窗全耗在等待上）
      maxWaitMs: opts?.maxWaitMs ?? 90_000,
    };
    for (const s of specs) this.register(s);
  }

  register(spec: LaneSpec): void {
    const key = `${spec.provider}:${spec.model}`;
    this.lanes.set(key, {
      key,
      provider: spec.provider,
      model: spec.model,
      lazy: spec.factory ?? (() => buildProviderPool(spec)),
      pool: null,
      instCooldownUntil: [],
      cursor: 0,
      calls: 0,
      ok: 0,
      emptyRetries: 0,
      cooldowns: 0,
      cooldownUntil: 0,
    });
  }

  /** 该矩阵键是否有可用通道（未注册/熔断中 → false） */
  has(key: string): boolean {
    const lane = this.lanes.get(key);
    return !!lane && lane.cooldownUntil <= Date.now();
  }

  get size(): number {
    return this.lanes.size;
  }

  /**
   * 取某矩阵键的调用函数；未注册或熔断中返回 null（调用方落编队兜底）。
   * 返回的函数语义与 `callLlm(prompt, maxTokens)` 一致：失败抛错。
   *
   * 多 key 池语义（2026-09-14 首跑实测补充）：**账号级 429 只冷却该账号**，
   * 下一个请求换池内其它账号；全池冷却才熔断整条通道——「同源多账号=分摊限流」，
   * 单账号打满不该拖停整条免费通道（首跑里 zhipu 3 连 429 即全线熔断 = 掉在这一点上）。
   */
  callerFor(key: string): ((prompt: string, maxTokens: number) => Promise<string>) | null {
    const lane = this.lanes.get(key);
    if (!lane) return null;
    if (lane.cooldownUntil > Date.now()) return null;
    return async (prompt: string, maxTokens: number): Promise<string> => {
      if (!lane.pool) {
        lane.pool = lane.lazy(); // 首次调用才实例化（缺 key 在这里抛错 → 上层兜底）
        lane.instCooldownUntil = lane.pool.map(() => 0);
      }
      const pool = lane.pool;
      lane.calls++;
      let lastErr: unknown;
      let sawThrottle = false;
      let emptyRetried = 0;
      // 两档节流分开处理：
      //  - 空响应（魔搭节流 stub）：同账号短退避重试 ≤ emptyRetries 次（账号没问题，重试可能恢复）
      //  - 429（账号限流）：该账号进入冷却，换池内下一个账号；全池冷却才熔断整条通道
      for (let guard = 0; guard < pool.length + this.opts.emptyRetries + 1; guard++) {
        const now = Date.now();
        let idx = -1;
        for (let i = 0; i < pool.length; i++) {
          const cand = (lane.cursor + i) % pool.length;
          if (lane.instCooldownUntil[cand]! <= now) {
            idx = cand;
            break;
          }
        }
        if (idx < 0) {
          // 池内全冷却：优先**降档等待**（等到最早账号解冻再试），而不是立刻熔断失败。
          // 免费档友好（把「熔断-降级到编队」变成「排队慢跑」）；waitForCooldown=false 时保持旧语义。
          const earliest = Math.min(...lane.instCooldownUntil);
          const wait = earliest - Date.now();
          if (this.opts.waitForCooldown && wait > 0 && wait <= this.opts.maxWaitMs) {
            await new Promise((r) => setTimeout(r, wait + 50));
            continue; // 重入循环（此时已有账号解冻）
          }
          break; // 超出等待上限 → 熔断判定
        }
        lane.cursor = idx + 1;
        const inst = pool[idx]!;
        try {
          const text = await inst.call(prompt, maxTokens);
          if (!text || !text.trim()) throw new Error(`Unexpected empty response from ${lane.key}`);
          lane.ok++;
          return text;
        } catch (err) {
          lastErr = err;
          lane.lastError = String(err).slice(0, 200);
          const empty = isEmptyResponseError(err);
          const throttled = empty || is429(err);
          if (!throttled) throw err; // 非节流（401/内容错）直接上抛
          sawThrottle = true;
          if (empty && emptyRetried < this.opts.emptyRetries) {
            // 同账号重试（不冷却账号：stub 是瞬时故障）
            emptyRetried++;
            lane.emptyRetries++;
            await new Promise((r) => setTimeout(r, this.opts.emptyBackoffMs));
            lane.cursor = idx; // 下一轮仍优先该账号
            continue;
          }
          // 429（或空重试耗尽）→ 该账号冷却，换下一个
          lane.instCooldownUntil[idx] = Date.now() + this.opts.cooldownMs;
          lane.emptyRetries++;
        }
      }
      if (sawThrottle && lane.instCooldownUntil.every((t) => t > Date.now())) {
        // 全池冷却 → 通道级熔断（交上层重评 + pending 兜底，不污染成内容差）
        lane.cooldowns++;
        lane.cooldownUntil = Date.now() + this.opts.cooldownMs;
        console.error(
          `[executor] ${lane.key} 全池 ${pool.length} 账号节流 —— 通道熔断 ${this.opts.cooldownMs / 1000}s`,
        );
      }
      throw lastErr ?? new Error(`${lane.key} 不可用`);
    };
  }

  /** 通道健康快照（编队健康统计同款；无 key 字段，零回显） */
  health(): LaneHealth[] {
    const now = Date.now();
    return [...this.lanes.values()].map((l) => ({
      key: l.key,
      calls: l.calls,
      ok: l.ok,
      emptyRetries: l.emptyRetries,
      cooldowns: l.cooldowns,
      cooling: l.cooldownUntil > now,
      ...(l.lastError ? { lastError: l.lastError } : {}),
    }));
  }

  /** 打印健康摘要（生产日志可读；Actions log 用） */
  logHealth(): void {
    for (const h of this.health()) {
      const rate = h.calls > 0 ? `${Math.round((h.ok / h.calls) * 100)}%` : "-";
      console.log(
        `  [executor] ${h.key}: calls=${h.calls} ok=${h.ok}(${rate}) 空响应重试=${h.emptyRetries} 熔断=${h.cooldowns}${h.cooling ? " [冷却中]" : ""}${h.lastError ? ` last=${h.lastError.slice(0, 80)}` : ""}`,
      );
    }
  }
}

// ---------------------------------------------------------------------------
// 从调度器矩阵构建执行层（生产接线点）
// ---------------------------------------------------------------------------

/**
 * 由矩阵条目建执行层。extraParams 用**键级**环境变量注入（SCED_ 不写死模型名）：
 *   `SCHED_PARAMS_<PROVIDER>_<MODEL 大写化>` = JSON 对象字面量
 * 例：`SCHED_PARAMS_CUSTOM_MODELSCOPE={"enable_thinking":false}`、
 *     `SCHED_PARAMS_OPENROUTER={"reasoning":{"enabled":false},"max_tokens":8192}`
 * 按模型名区分参数（同 provider 不同模型可挂不同参数），未命中回退该 provider 的全局 EXTRA_PARAMS。
 */
export function matrixEnvKey(provider: string, model: string): string {
  const slug = `${provider}_${model}`.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  return `SCHED_PARAMS_${slug}`;
}

/** 多 key 池环境变量名（同一 SLUG 规则，互不冲突）。 */
export function matrixKeysEnvKey(provider: string, model: string): string {
  const slug = `${provider}_${model}`.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  return `SCHED_KEYS_${slug}`;
}

export function executorFromMatrix(
  entries: Array<{ provider: string; model: string }>,
  env: NodeJS.ProcessEnv = process.env,
): ScheduledLlmExecutor {
  const specs: LaneSpec[] = entries.map((e) => {
    const raw = env[matrixEnvKey(e.provider, e.model)];
    let extraParams: Record<string, unknown> | undefined;
    if (raw && raw.trim()) {
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        throw new Error(`${matrixEnvKey(e.provider, e.model)} 必须是 JSON 对象`);
      }
      extraParams = parsed as Record<string, unknown>;
    }
    // 多 key 轮转池（SCHED_KEYS_<SLUG>，逗号分隔）：同源多账号分摊限流。
    // 注意：{NAME}_API_KEY 里的逗号在多 key 场景下**不能**直接当单 key 用（会整个当 Bearer 串），
    // 必须经此池拆分成独立实例。
    const keysRaw = env[matrixKeysEnvKey(e.provider, e.model)];
    const keys = keysRaw
      ? keysRaw
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : undefined;
    return { provider: e.provider, model: e.model, extraParams, keys };
  });
  return new ScheduledLlmExecutor(specs);
}
