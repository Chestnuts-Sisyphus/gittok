/**
 * 全量生产线调度器（方案 B 框架，2026-09-13）。
 *
 * 目标：59,391 卡全量建库的模型编排层——免费矩阵下用不同能力档模型保证生成质量。
 * 三个机制（对应栗子两大约束：吞吐不缩水 / 质量不降档）：
 *  1. 批粒度路由：stage2.pack 产出的「头部单卡批」走高档模型（白赚质量升级），
 *     长尾多卡批走 flash 档（成本主线）；档位=批的属性，不是单卡属性。
 *  2. 额度记账：每模型 token 账本（调用/输出 token/合格卡数），额度耗尽自动切下一家；
 *     重评路由：不合格卡（G 闸失败）自动路由到下一个还有额度的模型重评（重评烧额度不烧钱）。
 *  3. 断点续跑：状态落盘 data/scheduler-state.json，被杀/超时后重启接着跑。
 *
 * 模型矩阵数据（每模型 provider/端点/额度/限速）由并行会话（提示词 B）产出后，
 * 通过环境变量注入（SCHED_HEAD_MODELS / SCHED_TAIL_MODELS），本框架只认
 * 「档位 × 额度」接口，不绑死具体模型名——矩阵到位即用。
 *
 * 纪律：密钥零回显（只读 D:/AI/KEY/PAID-LLM.txt 运行时注入）；不合格卡不上站；
 * 确定性（同队列同状态产出同路由）。
 */

import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// 额度账本（纯内存 + 落盘快照；每模型一桶）
// ---------------------------------------------------------------------------

export type Tier = "head" | "tail";
export type Stage = "screen" | "prose" | "qianren";

export interface ModelLedger {
  /** 模型键（免费矩阵会话产出后：provider/model 组合键） */
  model: string;
  tier: Tier;
  /** 额度（token）；0/缺省=不限额（付费兜底语义） */
  quotaTokens: number;
  usedTokens: number;
  calls: number;
  cardsOk: number;
  exhausted: boolean;
}

export interface LedgerSnapshot {
  models: ModelLedger[];
  fallbackCount: number; // 全池耗尽后走付费兜底的批数
}

/** 路由决策结果 */
export interface Route {
  tier: Tier;
  model: string;
}

/**
 * 额度账本：记账 + 耗尽切换 + 路由。
 * 纯逻辑（无网络/无密钥），路由由调用方执行（现有 callLlm 编队是执行层）。
 */
export class QuotaLedger {
  private models: Map<string, ModelLedger> = new Map();
  fallbackCount = 0;

  /** 注册一个模型桶（矩阵配置）；重复注册=更新额度，不清零已用 token（断点续跑语义）。 */
  register(model: string, tier: Tier, quotaTokens = 0): void {
    const existing = this.models.get(model);
    if (existing) {
      existing.quotaTokens = quotaTokens;
      return;
    }
    this.models.set(model, {
      model,
      tier,
      quotaTokens,
      usedTokens: 0,
      calls: 0,
      cardsOk: 0,
      exhausted: quotaTokens > 0 ? false : false,
    });
  }

  /** 记一笔调用（tokens in+out 合计入账；超额度立即标记耗尽）。 */
  charge(model: string, tin: number, tout: number): void {
    const m = this.models.get(model);
    if (!m) return;
    m.usedTokens += Math.max(0, tin) + Math.max(0, tout);
    m.calls += 1;
    if (m.quotaTokens > 0 && m.usedTokens >= m.quotaTokens) m.exhausted = true;
  }

  /** 记一张合格卡。 */
  markOk(model: string): void {
    const m = this.models.get(model);
    if (m) m.cardsOk += 1;
  }

  /** 取某档位下一个未耗尽的模型（轮转序=注册序，确定性）；无可用 → null。 */
  nextModel(tier: Tier): string | null {
    for (const m of this.models.values()) {
      if (m.tier === tier && !m.exhausted) return m.model;
    }
    return null;
  }

  /** 当前档位是否已耗尽（决定是否走付费兜底/暂停）。 */
  tierExhausted(tier: Tier): boolean {
    return this.nextModel(tier) === null;
  }

  /**
   * 批粒度路由（纯函数语义）：头部单卡批（batchSize=1 且星数达阈值）走高档，
   * 其余走 flash 档。高档耗尽 → 降级 flash；flash 耗尽 → 返回 null（调用方走付费兜底）。
   */
  route(
    batchSize: number,
    stars: number[],
    opts: { headStarThreshold?: number; allowHeadDegrade?: boolean } = {},
  ): Route | null {
    const threshold = opts.headStarThreshold ?? 10_000;
    const isHead = batchSize === 1 && (stars[0] ?? 0) >= threshold;
    const tier: Tier = isHead ? "head" : "tail";
    let model = this.nextModel(tier);
    if (!model && tier === "head" && opts.allowHeadDegrade !== false) {
      model = this.nextModel("tail"); // 高档耗尽 → 长尾档续跑（不阻塞生产）
    }
    if (!model) {
      this.fallbackCount += 1;
      return null;
    }
    return { tier, model };
  }

  snapshot(): LedgerSnapshot {
    return { models: [...this.models.values()], fallbackCount: this.fallbackCount };
  }

  /** 从快照恢复（断点续跑：保留 usedTokens/exhausted）。 */
  restore(snap: LedgerSnapshot): void {
    if (!snap || !Array.isArray(snap.models)) return;
    for (const m of snap.models) {
      this.models.set(m.model, { ...m });
    }
    this.fallbackCount = snap.fallbackCount ?? 0;
  }
}

// ---------------------------------------------------------------------------
// 断点续跑状态（data/scheduler-state.json）
// ---------------------------------------------------------------------------

export interface SchedulerState {
  /** repo → 已完成（有全套文案+已过闸） */
  done: Record<string, { card: unknown; model: string; head: boolean }>;
  /** repo → 最后一次失败明细（重评反馈续用） */
  failed: Record<string, string[]>;
  /** 账本快照 */
  ledger: LedgerSnapshot;
  updatedAt: string;
}

const STATE_PATH = path.join("data", "scheduler-state.json");

export function loadSchedulerState(): SchedulerState {
  try {
    if (fs.existsSync(STATE_PATH)) {
      const raw = JSON.parse(fs.readFileSync(STATE_PATH, "utf-8")) as Partial<SchedulerState>;
      return {
        done: raw.done ?? {},
        failed: raw.failed ?? {},
        ledger: raw.ledger ?? { models: [], fallbackCount: 0 },
        updatedAt: raw.updatedAt ?? "",
      };
    }
  } catch (err) {
    console.error(`  [scheduler] state load failed: ${err}`);
  }
  return { done: {}, failed: {}, ledger: { models: [], fallbackCount: 0 }, updatedAt: "" };
}

export function saveSchedulerState(state: SchedulerState): void {
  try {
    fs.mkdirSync("data", { recursive: true });
    fs.writeFileSync(
      STATE_PATH,
      JSON.stringify({ ...state, updatedAt: new Date().toISOString() }, null, 2),
      "utf-8",
    );
  } catch (err) {
    console.error(`  [scheduler] state save failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// 模型矩阵配置（环境变量约定；免费模型会话产出后注入）
// ---------------------------------------------------------------------------

/**
 * 解析模型矩阵配置。
 * 约定（提示词 B 会话产出后按此注入）：
 *   SCHED_HEAD_MODELS="provider:model[:quotaTokens];provider:model[:quotaTokens]"
 *   SCHED_TAIL_MODELS="..."
 * quotaTokens 缺省=0（不限额，付费兜底语义）。
 *
 * 模型名可含冒号（OpenRouter 免费档 `nvidia/nemotron-3-ultra-550b-a55b:free`），
 * 因此**不做三段等分**：只有「最后一段是纯数字」时才把它当 quota 摘出，
 * 其余整段（含冒号）归模型名；provider 取第一个冒号前的段。
 * 示例：`openrouter:nvidia/nemotron-3-ultra-550b-a55b:free:50000`
 *   → provider=openrouter, model=nvidia/nemotron-3-ultra-550b-a55b:free, quotaTokens=50000。
 */
export interface MatrixEntry {
  provider: string;
  model: string;
  quotaTokens: number;
  tier: Tier;
  key: string;
}

export function parseMatrix(env: NodeJS.ProcessEnv = process.env): MatrixEntry[] {
  const out: MatrixEntry[] = [];
  const parse = (raw: string | undefined, tier: Tier): void => {
    if (!raw) return;
    for (const part of raw.split(";")) {
      const seg = part.trim();
      if (!seg) continue;
      const first = seg.indexOf(":");
      if (first <= 0) continue; // 没有 provider 分隔符（或 provider 为空）→ 丢弃
      const provider = seg.slice(0, first);
      let rest = seg.slice(first + 1);
      // 末段为纯数字才视为 quota（模型名里的 :free / :nitro 等后缀不受影响）
      let quotaTokens = 0;
      const last = rest.lastIndexOf(":");
      if (last >= 0) {
        const tail = rest.slice(last + 1).trim();
        if (/^\d+$/.test(tail)) {
          quotaTokens = Math.max(0, parseInt(tail, 10) || 0);
          rest = rest.slice(0, last);
        }
      }
      const model = rest.trim();
      if (!model) continue;
      out.push({ provider, model, quotaTokens, tier, key: `${provider}:${model}` });
    }
  };
  parse(env["SCHED_HEAD_MODELS"], "head");
  parse(env["SCHED_TAIL_MODELS"], "tail");
  return out;
}

/** 把矩阵注册进账本（幂等；重复调用保留已用 token——断点续跑）。 */
export function applyMatrix(ledger: QuotaLedger, matrix: MatrixEntry[]): void {
  for (const e of matrix) ledger.register(e.key, e.tier, e.quotaTokens);
}

// ---------------------------------------------------------------------------
// 调度器主编排（阶段感知：海选/精评/千人千面共用一条记账，批粒度路由）
// ---------------------------------------------------------------------------

/**
 * 生产调度器：编排一批仓库的 LLM 调用（模型路由 + 记账 + 重评路由）。
 * 调用层由调用方注入（现有 callLlm 编队是执行层；矩阵到位后可按 key 直连 provider）。
 */
export class ProductionScheduler {
  readonly ledger: QuotaLedger;
  private state: SchedulerState;

  constructor(state?: SchedulerState) {
    this.ledger = new QuotaLedger();
    this.state = state ?? loadSchedulerState();
    this.ledger.restore(this.state.ledger);
    applyMatrix(this.ledger, parseMatrix());
  }

  /** 当前进度（断点续跑用：跳过已完成）。 */
  doneRepos(): Set<string> {
    return new Set(Object.keys(this.state.done));
  }

  /** 取待重评反馈（续跑时带上一轮失败明细）。 */
  feedbackFor(repo: string): string[] {
    return this.state.failed[repo] ?? [];
  }

  markDone(repo: string, card: unknown, model: string, head: boolean): void {
    this.state.done[repo] = { card, model, head };
    delete this.state.failed[repo];
  }

  markFailed(repo: string, fails: string[]): void {
    this.state.failed[repo] = fails;
  }

  /** 批次路由（头部单卡批走高档；返回 null=全池耗尽走付费兜底）。 */
  routeBatch(batchSize: number, stars: number[]): Route | null {
    return this.ledger.route(batchSize, stars);
  }

  /** 批次完成记账。 */
  recordCall(model: string, tin: number, tout: number, cardsOk: number): void {
    this.ledger.charge(model, tin, tout);
    for (let i = 0; i < cardsOk; i++) this.ledger.markOk(model);
  }

  /** 记一张合格卡（逐仓重评路径：调用与合格在两次调用间分离时补记）。 */
  markOk(model: string): void {
    this.ledger.markOk(model);
  }

  /** 保存断点（每 chunk 后调用；幂等）。 */
  persist(): void {
    this.state.ledger = this.ledger.snapshot();
    saveSchedulerState(this.state);
  }
}
