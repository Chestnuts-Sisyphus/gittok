/**
 * V-C 频道容量与浏览深度验收（栗子 L8）——报告版（骨架，分段补全）。
 */

import fs from "node:fs";
import path from "node:path";
import {
  hotChannel,
  dailyChannel,
  funChannel,
  followingChannel,
  categoryChannel,
  channelPoolSize,
  deferredCount,
  aiCapCaps,
  funCaps,
  zoneOf,
  CHANNEL_CAP,
  funScoreOf,
  type ChannelCard,
} from "../src/feed/channel-policy.ts";
import { ZONES } from "../src/feed/taxonomy.ts";

export interface CapCard extends ChannelCard {
  owner?: string;
}

export const MIN_REACHABLE = 300;

export const FEED_FILE = path.join(process.cwd(), "data", "feed.json");

export function loadCards(): CapCard[] {
  return JSON.parse(fs.readFileSync(FEED_FILE, "utf-8")) as CapCard[];
}

void hotChannel;
void dailyChannel;
void funChannel;
void followingChannel;
void categoryChannel;
void channelPoolSize;
void deferredCount;
void aiCapCaps;
void funCaps;
void zoneOf;
void CHANNEL_CAP;
void funScoreOf;
void ZONES;

/** 前缀配额违规数（0 = 合规）；只查到「已接受前缀」长度为止（尾部超额卡不受配额约束）。 */
export function prefixViolations(out: CapCard[], zoneName: string, cap: number, upto: number): number {
  let bad = 0;
  for (let n = 1; n <= Math.min(upto, out.length); n++) {
    const cnt = out.slice(0, n).filter((c) => zoneOf(c) === zoneName).length;
    if (cnt > Math.max(1, Math.floor(cap * n))) bad++;
  }
  return bad;
}

export function dupCount(list: { repo: string }[]): number {
  return list.length - new Set(list.map((c) => c.repo)).size;
}

/** 与频道函数同一套排序（只为算「已接受前缀」长度；不改动输出）。 */
export function hotSorted(cards: CapCard[]): CapCard[] {
  return cards
    .filter((c) => (c.starGrowth ?? 0) > 0)
    .sort((a, b) => (b.starGrowth ?? 0) - (a.starGrowth ?? 0));
}

export function funSorted(cards: CapCard[]): CapCard[] {
  return cards.filter((c) => (c.funScore ?? 0) > 0).sort((a, b) => funScoreOf(b) - funScoreOf(a));
}

interface Row {
  name: string;
  pool: number;
  out: number;
  dup: number;
  /** 前缀配额违规数（0 = 合规） */
  viol: number;
}

/** 单频道一行实测：池子（显示张数）/ 实际输出 / 重复 / 配额违规。 */
function rowOf(name: string, pool: number, out: CapCard[], viol = 0): Row {
  return { name, pool, out: out.length, dup: dupCount(out), viol };
}

/** 逐频道实测（返回表格行；纯计算，无 IO 副作用）。 */
export function capacityRows(cards: CapCard[]): Row[] {
  const now = new Date();
  // 从 following.json 读取真实关注列表（避免 feed.json owner 字段缺失导致假行）
  const followingData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "following.json"), "utf-8")) as any;
  const followingUsers = followingData.users || {};
  const allOwners = new Set(Object.keys(followingUsers).filter(Boolean));

  const hotPool = hotSorted(cards);
  const hot = hotChannel(cards);
  const hotViol = prefixViolations(
    hot,
    "AI",
    0.3,
    hot.length - deferredCount(hotPool, (c) => zoneOf(c), aiCapCaps([])),
  );

  const funPool = funSorted(cards);
  const fun = funChannel(cards);
  const funViol = prefixViolations(
    fun,
    "创意",
    0.4,
    fun.length - deferredCount(funPool, (c) => zoneOf(c) ?? "工具", funCaps([])),
  );

  const rows: Row[] = [
    rowOf("热门", channelPoolSize("hot", cards), hot, hotViol),
    rowOf("每日", channelPoolSize("daily", cards, { now }), dailyChannel(cards, { now })),
    rowOf("乐趣", channelPoolSize("fun", cards), fun, funViol),
    rowOf(
      "关注",
      channelPoolSize("following", cards, { followingOwners: allOwners }),
      followingChannel(cards.filter((c) => allOwners.has(c.owner ?? ""))),
    ),
  ];
  for (const z of ZONES) {
    rows.push(rowOf(`分区·${z}`, channelPoolSize("cat", cards, { zone: z }), categoryChannel(cards, z)));
  }
  return rows;
}

/** 结论行：返回问题清单（空 = 通过）。 */
export function capacityProblems(rows: Row[]): string[] {
  const problems: string[] = [];
  // 扩展 core 频道集合：分区·资源/创意也需满足≥300 约束（避免假行）
  const core = ["热门", "乐趣", "分区·AI", "分区·工具", "分区·资源", "分区·创意"];
  for (const r of rows) {
    if (r.dup > 0) problems.push(`${r.name} 频道内有重复卡 ${r.dup} 张`);
    if (r.pool !== r.out) {
      problems.push(`${r.name} 显示张数 ${r.pool} 不等于实际输出 ${r.out}（显示层与频道函数口径不一致）`);
    }
    if (core.includes(r.name) && r.out < MIN_REACHABLE) {
      problems.push(`${r.name} 只有 ${r.out} 张（要求至少 ${MIN_REACHABLE}）`);
    }
    if (r.viol > 0) problems.push(`${r.name} 前缀配额违规 ${r.viol} 处`);
  }
  return problems;
}

/** 控制台报告（数字摊开给人看；断言在 channel-capacity-real.test.ts 里）。 */
function report(): void {
  const cards = loadCards();
  const rows = capacityRows(cards);
  console.log(
    `[V-C] 数据源 data/feed.json｜卡库 ${cards.length} 张｜CHANNEL_CAP=${String(CHANNEL_CAP)}｜单频道要求至少 ${MIN_REACHABLE} 张`,
  );
  console.log("");
  console.log("频道       池子(显示)  实际输出  重复  前缀配额违规");
  console.log("-------------------------------------------------------");
  for (const r of rows) {
    const line = [
      r.name.padEnd(9),
      String(r.pool).padStart(9),
      String(r.out).padStart(9),
      String(r.dup).padStart(5),
      String(r.viol),
    ];
    console.log(line.join("  "));
  }
  console.log("");
  const problems = capacityProblems(rows);
  if (problems.length > 0) {
    console.error("[V-C] 不通过：");
    for (const p of problems) console.error(`  x ${p}`);
    return;
  }
  console.log(
    `[V-C] 通过：核心频道可达至少 ${MIN_REACHABLE} 张、无重复卡、显示张数等于实际张数、前缀配额合规`,
  );
}

report();
