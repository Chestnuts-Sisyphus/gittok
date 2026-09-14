/**
 * G-sim 生产端检查器（2026-09-14，C7 缺口闭合）：把「卡间相似度」从**离线测量**升级为
 * **生产可用**的滚动监控 + 近重复降权，供千人千面阶段前置使用。
 *
 * 缺口原状（任务书 C7）：`gittok-gsim-baseline.ts` 只能**测量**（全库一次性直方图），
 * 生产管道没有任何相似度防线——同质项目（如一批 awesome-list、一批同模板 AI 壳）会
 * 原样进流，千人千面阶段「诚实优先条款」缺少可执行判据。
 *
 * 本模块给三件事（纯函数 + 确定性，无网络/无 IO）：
 *  1. `bagOf` / `jaccard`：词袋与相似度口径**与基线脚本完全同源**（不另造判据）。
 *  2. `similarityReport(cards, opts)`：触发条件判定（累计 ≥1000 卡或单 zone ≥50 卡，
 *     栗子 09-12 定稿）+ 直方图 + 超阈值占比——「滚动相似度监控」的可执行形态。
 *  3. `dedupPenalty(cards, opts)`：近重复对**降权而非丢弃**（策展流理念：无排除只降权），
 *     弱的那个乘 1-penalty；返回同序新数组，调用方决定是否参与排序。
 *
 * 阈值：先验 0.35（与基线同源）；实测直方图切谷底后由调用方覆盖（`threshold` 参数）。
 *
 * 证明等级：词袋/相似度口径为【已实测】单元测试覆盖；「接进推荐流排序」= `diversifyRank`（2026-09-14 晚接线，E1 闭合）——**已接线**：由前端推荐流排序消费
 * （需千人千面阶段落地后回填，任务书已列为该阶段前置）。
 */

/** 词袋：中文 3-gram + 英文/数字词（小写）——与 gittok-gsim-baseline.ts 同源口径 */
export function bagOf(text: string): Set<string> {
  const bag = new Set<string>();
  const t = (text ?? "").trim();
  if (!t) return bag;
  const han = t.replace(/[^\u4e00-\u9fff]+/g, "");
  for (let i = 0; i + 3 <= han.length; i++) bag.add(han.slice(i, i + 3));
  for (const w of t.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []) bag.add(`w:${w}`);
  return bag;
}

/** Jaccard 相似度 */
export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  for (const x of small) if (big.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

/** 触发条件（栗子 09-12 定稿）：累计 ≥1000 卡 或 单 zone ≥50 卡 */
export const GSIM_TRIGGER_TOTAL = 1000;
export const GSIM_TRIGGER_ZONE = 50;
export const GSIM_DEFAULT_THRESHOLD = 0.35;

export interface GsimOptions {
  /** 相似度阈值（≥ 判为近重复） */
  threshold?: number;
  /** 直方图分桶宽度 */
  binWidth?: number;
  /** 抽样上限（两两对比 O(n²)，默认 300 与基线一致） */
  sampleSize?: number;
}

export interface GsimReport {
  /** 是否达到触发条件 */
  triggered: boolean;
  /** 触发原因（可读） */
  reasons: string[];
  /** 参与对比的卡数 */
  sampled: number;
  /** 两两对数 */
  pairs: number;
  /** 相似度均值 */
  mean: number;
  /** 相似度最大 */
  max: number;
  /** ≥阈值的对数占比 */
  overRatio: number;
  /** 直方图：bin 下界 → 对数 */
  histogram: Array<{ lo: number; hi: number; count: number }>;
}

/** 是否满足触发条件（滚动监控的「该看一看了」门） */
export function shouldRunGsim(cards: Array<{ zone?: string; category?: string }>): {
  triggered: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  if (cards.length >= GSIM_TRIGGER_TOTAL) reasons.push(`累计卡数 ${cards.length} ≥ ${GSIM_TRIGGER_TOTAL}`);
  const byZone = new Map<string, number>();
  for (const c of cards) {
    const z = c.zone ?? c.category;
    if (!z) continue;
    byZone.set(z, (byZone.get(z) ?? 0) + 1);
  }
  for (const [z, n] of byZone) {
    if (n >= GSIM_TRIGGER_ZONE) reasons.push(`单 zone「${z}」${n} 卡 ≥ ${GSIM_TRIGGER_ZONE}`);
  }
  return { triggered: reasons.length > 0, reasons };
}

/** 确定性抽样（步长抽样，非随机——同输入同输出） */
function sampleDeterministic<T>(items: T[], size: number): T[] {
  if (items.length <= size) return items;
  const step = Math.max(1, Math.floor(items.length / size));
  return items.filter((_, i) => i % step === 0).slice(0, size);
}

/** 文本字段：首句优先（与基线同款：detailCn 首句；无 detail 退 summaryCn） */
export interface GsimCard {
  /** 卡唯一键（近重复判定以它锚定「弱的那张」） */
  repo: string;
  zone?: string;
  category?: string;
  detailCn?: string;
  summaryCn?: string;
  score?: number;
  stars?: number;
}

function textOf(card: GsimCard): string {
  const d = card.detailCn?.trim();
  if (d) {
    const cut = d.split(/[。！？!?]/)[0];
    return cut && cut.length >= 8 ? cut : d.slice(0, 120);
  }
  return card.summaryCn?.trim() ?? "";
}

/**
 * 滚动相似度报告（生产端调用：攒够触发量就跑一次，结论进健康账/播报）。
 * 样本不足（<2 张可比文本）→ 返回 triggered=false 的空报告（不阻塞生产）。
 */
export function similarityReport(cards: GsimCard[], opts: GsimOptions = {}): GsimReport {
  const threshold = opts.threshold ?? GSIM_DEFAULT_THRESHOLD;
  const binW = opts.binWidth ?? 0.05;
  const sampleSize = opts.sampleSize ?? 300;
  const { triggered, reasons } = shouldRunGsim(cards);
  const withText = cards.filter((c) => textOf(c).length >= 8);
  const sample = sampleDeterministic(withText, sampleSize);
  const empty: GsimReport = {
    triggered,
    reasons,
    sampled: sample.length,
    pairs: 0,
    mean: 0,
    max: 0,
    overRatio: 0,
    histogram: [],
  };
  if (sample.length < 2) return empty;

  const bags = sample.map((c) => bagOf(textOf(c)));
  const bins = new Map<number, number>();
  let pairs = 0;
  let sum = 0;
  let max = 0;
  let over = 0;
  for (let i = 0; i < bags.length; i++) {
    for (let j = i + 1; j < bags.length; j++) {
      const s = jaccard(bags[i]!, bags[j]!);
      pairs++;
      sum += s;
      if (s > max) max = s;
      if (s >= threshold) over++;
      const b = Math.floor(s / binW);
      bins.set(b, (bins.get(b) ?? 0) + 1);
    }
  }
  const histogram = [...bins.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([k, count]) => ({ lo: k * binW, hi: (k + 1) * binW, count }));
  return {
    triggered,
    reasons,
    sampled: sample.length,
    pairs,
    mean: pairs > 0 ? sum / pairs : 0,
    max,
    overRatio: pairs > 0 ? over / pairs : 0,
    histogram,
  };
}

export interface DedupOptions extends GsimOptions {
  /** 降权系数（0-1）：近重复对里「弱的那张」乘 (1-penalty)。0=只标记不降权。 */
  penalty?: number;
  /** 强弱判据（默认取 score；缺省用 stars 兜底） */
  strengthOf?: (c: GsimCard) => number;
}

export interface DedupResult<T> {
  cards: T[];
  /** repo → 被判定为近重复的次数（诊断用） */
  duplicates: Map<string, number>;
}

/**
 * 相似度降权排序（E1：**接进推荐流排序**，2026-09-14 晚接线）。
 *
 * 为什么需要：`similarityReport` / `dedupPenalty` 之前只是**检查器**（能算出「库里有多少近重复」
 * 并给弱的那张乘系数），但没有任何生产路径消费它的结论——推荐流排序里完全看不见相似度，
 * 于是连着刷到三张「AI 宠物」或三张「像素游戏复刻」时毫无抵抗力。
 *
 * 算法（MMR-lite，确定性、单趟插入）：
 *  1. 按传入顺序（调用方已排好序）逐张处理；每张先算它与**已接受的前 K 张**的最大 Jaccard；
 *  2. 相似度 ≥ threshold → 这张的**有效分**乘 (1 − penalty)，插到对应的位置（不改成员、只改顺序）；
 *  3. K 窗口 + 短文本词袋把复杂度从 O(n²) 压到 O(n·K)（推荐池 2.5k 张 × K=80 = 毫秒级）。
 *
 * 纪律：策展流理念——**不排除任何一张卡**，只改出现顺序（栗子 09-05 拍板：沉底被否）。
 */
export interface DiversifyOptions<T extends GsimCard = GsimCard> extends GsimOptions {
  /** 降权系数（0-1）：近重复的后来者乘 (1-penalty)；0 = 只标记不降权 */
  penalty?: number;
  /** 比对窗口：只与已接受的前 K 张比（默认 80）——性能与效果折中 */
  window?: number;
  /** 卡的原分值（用于插回顺序），默认用 score/stars */
  scoreOf?: (c: T) => number;
}

export interface DiversifyResult<T> {
  cards: T[];
  /** 因近重复被降权的张数（诊断/验收用） */
  demoted: number;
}

export function diversifyRank<T extends GsimCard>(
  cards: T[],
  opts: DiversifyOptions<T> = {},
): DiversifyResult<T> {
  const threshold = opts.threshold ?? GSIM_DEFAULT_THRESHOLD;
  const penalty = opts.penalty ?? 0.3;
  const windowSize = Math.max(1, opts.window ?? 80);
  const scoreOf =
    opts.scoreOf ?? ((c: T): number => (typeof c.score === "number" ? c.score : (c.stars ?? 0)));
  if (cards.length < 2 || penalty <= 0) return { cards: [...cards], demoted: 0 };

  const out: T[] = [];
  const effScores: number[] = [];
  const bags: Set<string>[] = [];
  let demoted = 0;
  for (const c of cards) {
    const bag = bagOf(textOf(c));
    let maxSim = 0;
    const from = Math.max(0, bags.length - windowSize);
    for (let i = from; i < bags.length; i++) {
      const sim = jaccard(bag, bags[i]!);
      if (sim > maxSim) maxSim = sim;
    }
    const dup = maxSim >= threshold && bag.size > 0;
    if (dup) demoted++;
    const eff = dup ? scoreOf(c) * (1 - penalty) : scoreOf(c);
    // 插到「有效分不小于自己」的最后一张之后（同分保持原相对顺序）
    let pos = out.length;
    while (pos > 0 && effScores[pos - 1]! < eff) pos--;
    out.splice(pos, 0, c);
    effScores.splice(pos, 0, eff);
    bags.splice(pos, 0, bag);
  }
  return { cards: out, demoted };
}

/**
 * 近重复降权（策展流理念：**无排除，只降权**）。
 * 对抽样范围内的近重复对，把「弱的那张」的 `score` 乘 (1-penalty)；
 * 返回**同序新数组**（不改原对象），未参与抽样的卡原样返回。
 */
export function dedupPenalty<T extends GsimCard>(cards: T[], opts: DedupOptions = {}): DedupResult<T> {
  const threshold = opts.threshold ?? GSIM_DEFAULT_THRESHOLD;
  const sampleSize = opts.sampleSize ?? 300;
  const penalty = opts.penalty ?? 0.3;
  const strengthOf =
    opts.strengthOf ?? ((c: T): number => (typeof c.score === "number" ? c.score : (c.stars ?? 0)));

  const sample = sampleDeterministic(cards, sampleSize);
  const duplicates = new Map<string, number>();
  if (sample.length >= 2 && penalty > 0) {
    const bags = sample.map((c) => bagOf(textOf(c)));
    const weaker = new Set<string>();
    for (let i = 0; i < sample.length; i++) {
      for (let j = i + 1; j < sample.length; j++) {
        if (jaccard(bags[i]!, bags[j]!) < threshold) continue;
        const a = sample[i]!;
        const b = sample[j]!;
        const win = strengthOf(a) >= strengthOf(b) ? b : a;
        weaker.add(win.repo);
        duplicates.set(win.repo, (duplicates.get(win.repo) ?? 0) + 1);
      }
    }
    if (weaker.size === 0) return { cards: [...cards], duplicates };
    return {
      cards: cards.map((c) => {
        if (!weaker.has(c.repo)) return c;
        const cur = typeof c.score === "number" ? c.score : (c.stars ?? 0);
        return { ...c, score: cur * (1 - penalty) };
      }),
      duplicates,
    };
  }
  return { cards: [...cards], duplicates };
}
