/**
 * 第二环节打包与反趋同（stage2 Python 模块移植，2026-09-13 全量前置接线）。
 *
 * 源：D:/AI/RESEARCH/model-trial/stage2/（domain_key/packer/g9/freq_audit）
 * 职责：分级领域键（domain_key 派生）→ 确定性装箱（smooth WRR，头部单卡批）→
 *       批内开头闸 G9 → 频次报告 + 相邻换位。
 * 纪律：与 Python 版行为一致（33 测试锁定的算法原样移植）；纯函数零网络零写盘。
 */

// ---------------------------------------------------------------------------
// 分级领域键（domain_key）
// ---------------------------------------------------------------------------

const COARSE_RULES: [string, string[]][] = [
  [
    "学习",
    [
      "awesome",
      "tutorial",
      "learn",
      "course",
      "guide",
      "roadmap",
      "interview",
      "cheatsheet",
      "cheat-sheet",
      "面试",
      "学习",
      "教程",
      "速查",
    ],
  ],
  [
    "好玩",
    [
      "game",
      "games",
      "gaming",
      "emulator",
      "arcade",
      "puzzle",
      "music",
      "toy",
      "fun",
      "pixel-art",
      "ascii",
      "generative-art",
      "游戏",
      "音乐",
      "玩具",
      "好玩",
    ],
  ],
  [
    "AI",
    [
      "ai",
      "llm",
      "gpt",
      "agent",
      "rag",
      "diffusion",
      "transformer",
      "machine-learning",
      "deep-learning",
      "nlp",
      "stable-diffusion",
      "大模型",
      "深度学习",
      "人工智能",
      "智能体",
    ],
  ],
];
const DEFAULT_KEY = "工具";

export interface DomainRepo {
  repo: string;
  desc?: string;
  topics?: string[];
  stars?: number;
}

/** 单仓粗键：topics 非空时直接返回 topics[0]（search 桶语义），否则关键词粗分。 */
export function coarseClassify(name: string, desc: string, topics: string[] = []): string {
  if (topics.length > 0) return topics[0]!;
  const text = `${name} ${desc || ""}`.toLowerCase();
  for (const [key, words] of COARSE_RULES) {
    for (const w of words) {
      if (text.includes(w)) return key;
    }
  }
  return DEFAULT_KEY;
}

function refineKey(repo: DomainRepo, used: Set<string>): string | null {
  for (const t of repo.topics || []) {
    if (!used.has(t)) return t;
  }
  const text = `${repo.repo} ${repo.desc || ""}`.toLowerCase();
  for (const [, words] of COARSE_RULES) {
    for (const w of words) {
      if (text.includes(w) && !used.has(w)) return w;
    }
  }
  return null;
}

/**
 * 给一批仓库定最终领域键（分级：超占比桶逐轮下拆，maxRounds 封顶保证终止）。
 * 返回 {repo: key}。带 history 防回摆（ai→agent→ai 振荡），状态单调推进必终止。
 */
export function assignKeys(repos: DomainRepo[], maxShare = 0.2, maxRounds = 3): Record<string, string> {
  const keys: Record<string, string> = {};
  const history: Record<string, Set<string>> = {};
  for (const r of repos) {
    const k = coarseClassify(r.repo, r.desc || "", r.topics || []);
    keys[r.repo] = k;
    history[r.repo] = new Set([k]);
  }

  for (let round = 0; round < maxRounds; round++) {
    const n = Object.keys(keys).length;
    if (n === 0) break;
    const counts: Record<string, number> = {};
    for (const k of Object.values(keys)) counts[k] = (counts[k] ?? 0) + 1;
    const overloaded = new Set(
      Object.entries(counts)
        .filter(([, c]) => c / n > maxShare)
        .map(([k]) => k),
    );
    if (overloaded.size === 0) break;
    const byRepo = new Map(repos.map((r) => [r.repo, r] as const));
    let changed = false;
    for (const repo of Object.keys(keys)) {
      if (!overloaded.has(keys[repo]!)) continue;
      const fine = refineKey(byRepo.get(repo)!, history[repo]!);
      if (fine) {
        keys[repo] = fine;
        history[repo]!.add(fine);
        changed = true;
      }
    }
    if (!changed) break; // 全部拆不动 → 接受摊匀
  }
  return keys;
}

// ---------------------------------------------------------------------------
// 确定性装箱（smooth WRR）
// ---------------------------------------------------------------------------

function smoothSchedule(counts: Record<string, number>): string[] {
  const cw: Record<string, number> = {};
  for (const k of Object.keys(counts)) cw[k] = 0;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const schedule: string[] = [];
  for (let step = 0; step < total; step++) {
    let best: string | null = null;
    for (const k of Object.keys(counts).sort()) {
      cw[k]! += counts[k]!;
      if (best === null || cw[k]! > cw[best]!) best = k;
    }
    schedule.push(best!);
    cw[best!]! -= total;
  }
  return schedule;
}

/**
 * 确定性装箱（第二环节定稿 D2）：头部单卡批 + 分桶平滑加权轮转切批；批序=批内最小原始队列位。
 * 行为保证：批内同键张数 ≤ max(1, ceil(键占比×批大小))；确定性；无随机数。
 */
export function pack(
  repos: DomainRepo[],
  batchSize = 5,
  headThreshold = 10_000,
  maxShare = 0.2,
): DomainRepo[][] {
  if (batchSize <= 0) throw new Error("batch_size 必须 ≥1");
  const keys = assignKeys(repos, maxShare);

  const head: [number, DomainRepo][] = [];
  const tail: [number, DomainRepo][] = [];
  for (let i = 0; i < repos.length; i++) {
    const entry: [number, DomainRepo] = [i, repos[i]!];
    if ((repos[i]!.stars ?? 0) >= headThreshold) head.push(entry);
    else tail.push(entry);
  }

  // 分桶（桶名排序=确定性；桶内保持队列序）
  const buckets = new Map<string, [number, DomainRepo][]>();
  for (const [i, r] of tail) {
    const k = keys[r.repo]!;
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k)!.push([i, r]);
  }

  // 平滑加权轮转得流
  const counts: Record<string, number> = {};
  for (const [k, v] of buckets) counts[k] = v.length;
  const schedule = smoothSchedule(counts);
  const iters = new Map(buckets);
  const stream: [number, DomainRepo][] = [];
  for (const k of schedule) {
    const list = iters.get(k)!;
    stream.push(list.shift()!);
  }

  const dealt: [number, DomainRepo][][] = [];
  for (let j = 0; j < stream.length; j += batchSize) dealt.push(stream.slice(j, j + batchSize));
  const batches = [...dealt, ...head.map((h) => [h])];
  batches.sort((a, b) => Math.min(...a.map((x) => x[0])) - Math.min(...b.map((x) => x[0])));
  return batches.map((b) => b.map((x) => x[1]));
}

// ---------------------------------------------------------------------------
// G9 批内开头闸
// ---------------------------------------------------------------------------

const SENT_SPLIT = /^(.*?[。！？])/s;
const OPEN_CAP = 60; // 开头截断上限：两两 DP 成本 O(len²)，60 字封顶

/** 深度解读第一段的第一句（到第一个句末标点含）；无句读则取首段前 OPEN_CAP 字。 */
export function firstSentence(detail: string): string {
  if (!detail || !detail.trim()) return "";
  const para = detail.trim().split(/\n\n+/)[0] ?? "";
  const m = para.match(SENT_SPLIT);
  const s = m ? m[1]! : para;
  return s.slice(0, OPEN_CAP);
}

/** 归一化：剔专名（元数据现成）→ 只留汉字（剔英文/数字/标点）。可能返回空串（纯英文开头）。 */
export function normalizeOpener(detail: string, stripNames: Iterable<string> = []): string {
  let s = firstSentence(detail);
  const names = [...new Set([...stripNames].filter(Boolean))].sort((a, b) => b.length - a.length);
  for (const name of names) s = s.split(name).join("");
  return [...s].filter((ch) => ch >= "\u4e00" && ch <= "\u9fff").join("");
}

/** 最长公共连续子串（字级 DP）。返回 [长度, 子串]；空输入返回 [0, ""]。 */
export function longestCommonRun(a: string, b: string): [number, string] {
  if (!a || !b) return [0, ""];
  const prev = new Array(b.length + 1).fill(0);
  let best = 0;
  let bestEnd = 0;
  for (let i = 1; i <= a.length; i++) {
    const cur = new Array(b.length + 1).fill(0);
    const ca = a[i - 1]!;
    for (let j = 1; j <= b.length; j++) {
      if (ca === b[j - 1]) {
        cur[j] = prev[j - 1]! + 1;
        if (cur[j]! > best) {
          best = cur[j]!;
          bestEnd = i;
        }
      }
    }
    prev.splice(0, prev.length, ...cur);
  }
  return [best, best ? a.slice(bestEnd - best, bestEnd) : ""];
}

/** 剔专名名单：仓库全名/名部/owner/语言。 */
export function stripNames(card: { repo?: string; language?: string }): Set<string> {
  const parts = (card.repo || "").split("/");
  const names = new Set<string>([card.repo || "", ...parts, card.language || ""]);
  names.delete("");
  return names;
}

export interface G9Card {
  repo?: string;
  detail_cn?: string;
  language?: string;
}

export interface G9Hit {
  i: number;
  j: number;
  len: number;
  run: string;
}

/** 批内两两比对。cards=[{"repo","detail_cn",...}]（同批）。返回撞车对列表；空前缀卡跳过。 */
export function checkBatch(cards: G9Card[], threshold = 6): G9Hit[] {
  const openers = cards.map((c) => normalizeOpener(c.detail_cn || "", stripNames(c)));
  const hits: G9Hit[] = [];
  for (let i = 0; i < openers.length; i++) {
    for (let j = i + 1; j < openers.length; j++) {
      if (!openers[i] || !openers[j]) continue;
      const [n, run] = longestCommonRun(openers[i]!, openers[j]!);
      if (n >= threshold) hits.push({ i, j, len: n, run });
    }
  }
  return hits;
}

/** 带反馈重评用的失败明细。 */
export function g9Feedback(hit: G9Hit): string {
  return (
    `你的开头与同批另一张卡重复（重复片段「${hit.run}」共 ${hit.len} 字）。` +
    "换一种切入方式重写第一句，不要与同批任何卡同壳。"
  );
}

// ---------------------------------------------------------------------------
// 频次闸（短吸引子）+ 排列层（相邻换位）
// ---------------------------------------------------------------------------

const PREFIX_LENS = [2, 3, 4];

/** 一个开头的 2-4 字前缀 token（不足长则跳过该档）。 */
export function openerPrefixes(detail: string, stripNamesList: Iterable<string> = []): string[] {
  const o = normalizeOpener(detail, stripNamesList);
  return PREFIX_LENS.filter((k) => o.length >= k).map((k) => o.slice(0, k));
}

/**
 * 频次闸：cards=[{"repo","detail_cn",...}]（一轮产出的全集）。
 * 返回 [[前缀, 张数, 占比]] 按占比降序。只报告不拦截；
 * 被更长冒头前缀覆盖的短前缀归约掉（这玩/这玩意/这玩意让 → 只报最长）。
 */
export function findAttractors(cards: G9Card[], maxRate = 0.1, minCards = 5): [string, number, number][] {
  const n = cards.length;
  if (n === 0) return [];
  const counts = new Map<string, number>();
  for (const c of cards) {
    const names = stripNames(c);
    for (const p of openerPrefixes(c.detail_cn || "", names)) {
      counts.set(p, (counts.get(p) ?? 0) + 1);
    }
  }
  const flagged: [string, number, number][] = [];
  for (const [p, c] of counts) {
    if (c / n > maxRate && c >= minCards) flagged.push([p, c, c / n]);
  }
  flagged.sort((a, b) => b[0].length - a[0].length);
  const out: [string, number, number][] = [];
  for (const [p, c, r] of flagged) {
    if (!out.some(([q]) => q.startsWith(p) && q !== p)) out.push([p, c, r]);
  }
  return out.sort((a, b) => b[2] - a[2] || a[0].localeCompare(b[0]));
}

function adjKey(card: G9Card, prefixLen = 4): string {
  return normalizeOpener(card.detail_cn || "", []).slice(0, prefixLen);
}

/**
 * 排列层：相邻展示卡开头前缀互异；撞了与后方最近的不同前缀卡换位。
 * 返回新列表（不改入参）；确定性；全同前缀无处可换则原样保留。
 */
export function fixAdjacent<T extends G9Card>(cards: T[], prefixLen = 4): T[] {
  const out = [...cards];
  for (let i = 1; i < out.length; i++) {
    const prevK = adjKey(out[i - 1]!, prefixLen);
    const curK = adjKey(out[i]!, prefixLen);
    if (curK && prevK && curK === prevK) {
      for (let j = i + 1; j < out.length; j++) {
        const kj = adjKey(out[j]!, prefixLen);
        if (kj && kj !== curK) {
          const tmp = out[i]!;
          out[i] = out[j]!;
          out[j] = tmp;
          break;
        }
      }
    }
  }
  return out;
}
