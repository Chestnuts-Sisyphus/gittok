/**
 * V-A1 分区体系正交性验收（栗子 L10：问题不在某张卡分错，而在分类体系本身）。
 *
 * 四条体系判据（栗子拍板的验收口径）：
 *  1. **互斥（构造性）**：四区判定必须是「二分链」——每步一个能用是/否回答的问题，
 *     第一个答「是」的就是结果，三问全否 = 工具（兜底）。工具区因此**在定义上**
 *     不可能属于其余三区；再配判例集把边界钉死（skill→AI、AI 教程→资源、
 *     游戏引擎→工具、AI 绘画→创意 …）。
 *  2. **完备 100%**：全库每张卡都能落入恰好一个区（数据层实测，不靠兜底凑）。
 *  3. **均衡**：无单区占比超过 60%（v2.2 的工具区 48.7% 擦线，且其中 1/3 是错归）。
 *  4. **稳定**：抽样 100 张重判，改动率 ≤15%（同一判据跑两遍的一致率 →
 *     证据文件 data/rejudge-v3-stability.json，由两次 --only 跑批产出）。
 *
 * 数据源固定为仓库内 data/feed.json（零参数、零外部输入）。失败时打印 ✗ 行并抛错。
 */

import fs from "node:fs";
import path from "node:path";
import { ZONES, ZONE_BRANCHES, ZONE_CASES, FALLBACK_ZONE, CATEGORY_TO_ZONE } from "../src/feed/taxonomy.ts";

interface Card {
  repo: string;
  zone?: string;
  legacyZone?: string;
  zoneSource?: string;
}

const FEED = path.join(process.cwd(), "data", "feed.json");
const STABILITY = path.join(process.cwd(), "data", "rejudge-v3-stability.json");

/** 均衡线：单区占比上限（栗子验收口径）。 */
const MAX_ZONE_SHARE = 0.6;
/** 稳定线：重判改动率上限（栗子验收口径）。 */
const MAX_CHANGE_RATE = 0.15;

function load<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return null;
  }
}

/** 判据 1：二分链结构 + 判例集（纯结构断言，不看数据）。 */
function checkMutualExclusion(): string[] {
  const problems: string[] = [];
  // ① 每个分支都是「是 → 一个区」，且三问的目标互不相同、不落在兜底区上
  const yesTargets = ZONE_BRANCHES.map((b) => b.yes);
  if (ZONE_BRANCHES.length !== ZONES.length - 1) {
    problems.push(`二分链分支数 ${ZONE_BRANCHES.length} ≠ 区数-1（${ZONES.length - 1}）`);
  }
  if (new Set(yesTargets).size !== yesTargets.length) {
    problems.push(`分支落点有重复：${yesTargets.join(", ")}`);
  }
  for (const t of yesTargets) {
    if (!(ZONES as readonly string[]).includes(t)) problems.push(`分支落点不在四区枚举内：${t}`);
    if (t === FALLBACK_ZONE) problems.push(`${FALLBACK_ZONE} 是兜底区，不该有自己的「是」分支`);
  }
  // ② 每个分支必须有判据 + 明确的「不算」反例（边界清晰的可判定性）
  for (const b of ZONE_BRANCHES) {
    if (!b.ask.trim() || !b.yesif.trim()) problems.push(`分支「${b.ask}」缺少判据`);
    if (!b.notYes || b.notYes.length === 0) problems.push(`分支「${b.ask}」缺少边界反例（不算的情况）`);
  }
  // ③ 判例集必须覆盖四区（尤其 skill / 读物 / 引擎 三类易错样本）
  const caseZones = new Set(ZONE_CASES.map((c) => c.zone));
  for (const z of ZONES) {
    if (!caseZones.has(z)) problems.push(`判例集没有覆盖 ${z} 区`);
  }
  if (!ZONE_CASES.some((c) => c.case.includes("skill"))) problems.push("判例集缺少 skill 类边界样本");
  // ④ 旧 category ↔ 新 zone 的映射必须是双射（zoneToCategory 往返无损的前提）
  const mapped = Object.values(CATEGORY_TO_ZONE);
  if (new Set(mapped).size !== mapped.length) {
    problems.push(`category→zone 映射不是双射：${mapped.join(", ")}`);
  }
  return problems;
}

/** 判据 2/3：数据层完备 + 均衡。 */
function checkCoverageAndBalance(cards: Card[]): {
  problems: string[];
  dist: Map<string, number>;
  legacy: Map<string, number>;
} {
  const problems: string[] = [];
  const dist = new Map<string, number>();
  const legacy = new Map<string, number>();
  for (const c of cards) {
    const z = c.zone ?? "(无)";
    dist.set(z, (dist.get(z) ?? 0) + 1);
    legacy.set(c.legacyZone ?? z, (legacy.get(c.legacyZone ?? z) ?? 0) + 1);
  }
  const total = cards.length;
  const noZone = cards.filter((c) => !c.zone).length;
  if (noZone > 0) problems.push(`有 ${noZone} 张卡没有 zone（完备性不达标，要求 100%）`);
  for (const [z, n] of dist) {
    if (!(ZONES as readonly string[]).includes(z) && z !== "(无)")
      problems.push(`非法的 zone 值：${z}（${n} 张）`);
  }
  const sum = [...dist.values()].reduce((a, b) => a + b, 0);
  if (sum !== total) problems.push(`分区计数合计 ${sum} ≠ 总卡数 ${total}`);
  for (const z of ZONES) {
    const share = (dist.get(z) ?? 0) / total;
    if (share > MAX_ZONE_SHARE) {
      problems.push(`${z} 区占比 ${(share * 100).toFixed(1)}% 超过 ${MAX_ZONE_SHARE * 100}%（兜底漏斗）`);
    }
  }
  return { problems, dist, legacy };
}

/** 判据 4：稳定性证据（改判率）。 */
function checkStability(): string[] {
  const ev = load<{ sample?: number; changed?: number; rate?: number }>(STABILITY);
  if (!ev || typeof ev.rate !== "number") {
    return [`缺少稳定性证据 data/rejudge-v3-stability.json（跑两次 --only=<抽样 100 张> 后生成）`];
  }
  if (ev.rate > MAX_CHANGE_RATE) {
    return [`重判改动率 ${(ev.rate * 100).toFixed(1)}% 超过 ${MAX_CHANGE_RATE * 100}% 上限（判据不稳定）`];
  }
  return [];
}

function main(): boolean {
  const cards = load<Card[]>(FEED) ?? [];
  if (cards.length === 0) throw new Error("[V-A1] 读不到 data/feed.json");

  console.log("[V-A1] 分区体系正交性验收");
  console.log("");
  console.log("① 二分链（互斥性由构造保证）：");
  for (const b of ZONE_BRANCHES) {
    console.log(`   ${b.ask}`);
    console.log(`     → 是 = ${b.yes}｜判据：${b.yesif.slice(0, 40)}…`);
    console.log(`     → 否 = 继续下一问`);
  }
  console.log(`   ${FALLBACK_ZONE}｜三问全否的兜底区（自身没有「是」分支 → 不可能属于其余三区）`);
  console.log("");
  console.log("② 判例集（边界样本）：");
  for (const c of ZONE_CASES) console.log(`   ${c.zone.padEnd(4)} ${c.case} —— ${c.why}`);
  console.log("");

  const structural = checkMutualExclusion();
  const { problems: coverage, dist, legacy } = checkCoverageAndBalance(cards);
  const stability = checkStability();

  console.log("③ 数据层实测：");
  const total = cards.length;
  for (const z of [...ZONES, "(无)"]) {
    const n = dist.get(z) ?? 0;
    if (n === 0 && z === "(无)") continue;
    const old = legacy.get(z) ?? 0;
    console.log(
      `   ${z.padEnd(4)} ${String(n).padStart(5)} 张 ${((n / total) * 100).toFixed(1).padStart(5)}%` +
        (z === "(无)" ? "" : `   （v2.2 旧值 ${String(old).padStart(5)} 张）`),
    );
  }
  console.log("");

  const problems = [...structural, ...coverage, ...stability];
  if (problems.length > 0) {
    console.error("[V-A1] 不通过：");
    for (const p of problems) console.error(`  x ${p}`);
    return false;
  }
  console.log(
    `[V-A1] 通过：二分链互斥（构造性）+ 判例集齐 + 完备 100% + 无单区超过 ${MAX_ZONE_SHARE * 100}% + 重判改动率不超过 ${MAX_CHANGE_RATE * 100}%`,
  );
  return true;
}

if (!main()) throw new Error("[V-A1] 不通过（见上方 x 行）");
