/**
 * aiScore/fun_score 分位归一化（全量前置缺口 4，多模型混产前提）。
 *
 * 背景：免费模型矩阵下不同能力档模型打分尺度不同（高档模型给分激进、低档模型保守），
 * 直接比较 aiScore/fun_score 会让分数高低变成「哪个模型评的」而非「项目本身如何」。
 *
 * 机制：
 *  1. 样本积累：按模型收集历史评分（aiScore/fun_score 各一桶）；
 *  2. 分位对齐：目标刻度 = 全模型混合分布的分位；对每个模型学单调映射
 *     f_m(v) = P(X_m ≤ v)（经验分位），归一化后所有模型的分数统一到 [0,1] 分位刻度；
 *  3. 冷启动（参数保守化，不依赖全站数据）：样本 < MIN_SAMPLES 时用档位先验偏移
 *     （启发式：高档模型先验压降、低档模型先验抬升，压向 0.5 中位），
 *     样本足后自然过渡到经验分位——G9 同款直方图法的精神，不预设全局分布。
 *
 * 纪律：纯函数/纯内存状态（管道侧落盘由调用方做）；确定性。
 */

/** 样本不足时的档位先验（模型名前缀匹配；未命中=中等档 0 偏移）。
 *  数值含义：该档模型的先验偏差方向（高档给分偏高 → 归一化时向 0.5 压）。
 *  高档=头部批（qwen3.7-max/deepseek-v4-pro/kimi/glm 高档）；低档=flash/小模型。 */
const TIER_PRIORS: [string, number][] = [
  ["qwen3.7-max", 0.12],
  ["deepseek-v4-pro", 0.1],
  ["kimi", 0.08],
  ["glm-5", 0.08],
  ["glm-4", 0.06],
  ["qwen3.7-flash", 0.0],
  ["qwen3-30b", 0.0],
  ["qwen3.5-flash", -0.02],
  ["qwen-flash", -0.06],
  ["qwen3-14b", -0.08],
];

/** 经验分位所需最小样本数（不足走先验偏移） */
export const MIN_SAMPLES = 50;

/** 归一化刻度：0=最保守，1=最激进；0.5=中位 */
export type NormalizedScore = number;

function tierPrior(model: string): number {
  const m = model.toLowerCase();
  for (const [key, off] of TIER_PRIORS) {
    if (m.includes(key)) return off;
  }
  return 0;
}

/** 单个模型的分数样本桶（排序数组 + 脏标记） */
class SampleBucket {
  private values: number[] = [];
  private sorted: number[] = [];
  private dirty = false;

  add(v: number): void {
    if (!Number.isFinite(v)) return;
    this.values.push(v);
    this.dirty = true;
  }

  get size(): number {
    return this.values.length;
  }

  private ensureSorted(): void {
    if (this.dirty) {
      this.sorted = [...this.values].sort((a, b) => a - b);
      this.dirty = false;
    }
  }

  /** 经验分位：value 在此模型历史分布中的位置 (rank+1)/(n+1)。 */
  quantile(value: number): number {
    this.ensureSorted();
    if (this.sorted.length === 0) return 0.5;
    const n = this.sorted.length;
    let lo = 0;
    let hi = n - 1;
    let pos = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (this.sorted[mid]! <= value) {
        pos = mid + 1;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return (pos + 1) / (n + 2); // (rank+1)/(n+1) 的保守变体，避免 0/1 极值
  }

  snapshot(): number[] {
    this.ensureSorted();
    return [...this.sorted];
  }
}

/**
 * 分位归一化器（每字段一个实例；模型粒度分桶）。
 * 用法：
 *   const aiNorm = new QuantileNormalizer();
 *   aiNorm.record(model, rawAiScore);          // 生产过程中边评边记
 *   const out = aiNorm.normalize(model, raw);  // 组装排序前归一化
 */
export class QuantileNormalizer {
  private buckets = new Map<string, SampleBucket>();
  private fallbacks = new Map<string, number>(); // 冷启动计数：model → 已用先验次数

  /** 记录一次原始分数（无论是否用于归一化，先积累样本）。 */
  record(model: string, value: number): void {
    if (!model || !Number.isFinite(value)) return;
    let b = this.buckets.get(model);
    if (!b) {
      b = new SampleBucket();
      this.buckets.set(model, b);
    }
    b.add(value);
  }

  /** 冷启动期先验偏移：把原始分压向 0.5（高档 0.7→0.58，低档 0.4→0.46）。 */
  private priorNormalize(model: string, value: number): number {
    const off = tierPrior(model);
    const clamped = Math.max(0, Math.min(1, value));
    const shifted = clamped - off;
    // 向 0.5 收拢（先验不自信 → 压缩到中位附近，防冷启动期单点噪声放大）
    return 0.5 + (shifted - 0.5) * 0.6;
  }

  /**
   * 归一化：样本足 → 经验分位；不足 → 先验偏移。
   * 返回统一 [0,1] 分位刻度。样本不足时连续使用先验的模型会在样本足后平滑切换（单调性近似保持）。
   */
  normalize(model: string, value: number): NormalizedScore {
    if (!Number.isFinite(value)) return 0.5;
    const b = this.buckets.get(model);
    if (!b || b.size < MIN_SAMPLES) {
      this.fallbacks.set(model, (this.fallbacks.get(model) ?? 0) + 1);
      return this.priorNormalize(model, value);
    }
    return b.quantile(Math.max(0, Math.min(1, value)));
  }

  /** 每模型的样本量与归一化方式统计（遥测/报告用）。 */
  stats(): Record<string, { samples: number; mode: "prior" | "quantile"; priorOffset: number }> {
    const out: Record<string, { samples: number; mode: "prior" | "quantile"; priorOffset: number }> = {};
    for (const [model, b] of this.buckets) {
      out[model] = {
        samples: b.size,
        mode: b.size < MIN_SAMPLES ? "prior" : "quantile",
        priorOffset: tierPrior(model),
      };
    }
    return out;
  }
}

/** 纯函数：单值分位归一化（测试/离线用；无状态版）。 */
export function quantileOf(sortedSamples: number[], value: number): NormalizedScore {
  if (sortedSamples.length === 0) return 0.5;
  let lo = 0;
  let hi = sortedSamples.length - 1;
  let pos = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (sortedSamples[mid]! <= value) {
      pos = mid + 1;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return (pos + 1) / (sortedSamples.length + 2);
}
