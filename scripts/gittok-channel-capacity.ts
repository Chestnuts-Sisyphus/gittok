/**
 * V-C 频道容量与浏览深度验收——报告版。
 *
 * ── 2026-09-24 五轮 T3：把「≥300 张」这个**魔法数**换成可推导口径 ────────────────
 * 来历（栗子 09-24 问「为什么有这样的要求呢，你知道的我最讨厌不完全归纳法」，我溯源过）：
 *   `git log -S "MIN_REACHABLE" -- scripts/gittok-channel-capacity.ts` 只有 `a0f2fca`（2026-09-15
 *   「体系重构」），那一次只加了常量——**没有注释、没有文档、没有任何推导**。全仓唯一提到它的
 *   `docs/equilibrium-decisions.md` 只是**记录**它报出的违例。这正是他讨厌的那种数：
 *   看起来像个标准，其实是拍的。
 *
 * 新口径（可推导，且**契约变则它自动跟着变**）：
 *   要求 = **MIN_SCREENS（要能连续刷多少屏）× 每屏卡数**。
 *   每屏卡数**不是一个数字**，而是从内容契约与版式规则算出来的：
 *     · 内容契约：摘要 20-35 字（`taxonomy.ts` 的 SUMMARY_MIN/MAX）⇒ 一行需 35×16.66+69 = 653px 卡宽；
 *     · 列数规则：`feedColsForContentWidth`（**UI 用的就是这一个函数**，不是另抄一份）；
 *     · 行数规则：`floor(参照视口高 / (卡定高 + 行距))`。
 *   参照视口取**主流桌面档 1920×1080**（本机实测 `D:/tmp/gt-layout/r5/t3t4.json`：该档内容区
 *   正好两列、可见 3 行 ⇒ **6 张/屏**，与四轮「按主流桌面档 6 张/屏」的说法一致）。
 *   ⚠ 顶部 chrome（约 325px 的频道头/偏好条/标签栏）**不计入**：这样算出来的行数是**上界**，
 *     也就是对频道容量的**更严**要求——宁可要求多，不放过少（闸宁可红，不许绿得虚）。
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
// 列数/行高**复用 UI 的同一份规则**（web/src/feed-layout.ts 是纯函数、无 DOM 依赖）：
// 版式一变（摘要上限、卡高、列宽下限），这里的「每屏张数」与要求线自动跟着变。
import { FEED_COL_MIN, FEED_ROW_GAP, FEED_ROW_HEIGHT, feedColsForContentWidth } from "../web/src/feed-layout.ts";

export interface CapCard extends ChannelCard {
  owner?: string;
}

/** 参照视口高（主流桌面档 1920×1080 的高）。只用于把「屏」换算成「张」。 */
export const REF_VIEWPORT_HEIGHT = 1080;
/** 要能连续刷多少屏（栗子 2026-09-24 定稿：40 屏——「刷几十屏不见底」的那句人话）。 */
export const MIN_SCREENS = 40;

/**
 * 一屏几张 = 列数(两列门槛的内容宽) × 行数(参照视口高)。
 * 内容宽取「刚好够两列」＝2×653+16＝1322px ⇒ `feedColsForContentWidth` 返回 2
 * （它取的是「卡宽仍 ≥653 的**最大**列数」，1322 上正好 2）。今日 = 2 × 3 = **6 张/屏**。
 */
export const CARDS_PER_SCREEN: number =
  feedColsForContentWidth(2 * FEED_COL_MIN + FEED_ROW_GAP) * Math.floor(REF_VIEWPORT_HEIGHT / FEED_ROW_HEIGHT);

/** 每核心频道的最低张数 = 屏数 × 每屏张数。今日 = 40 × 6 = **240**（2026-09-24 实测：分区·创意 245 ⇒ 余 5 张）。 */
export const MIN_REACHABLE = MIN_SCREENS * CARDS_PER_SCREEN;

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

export interface Row {
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
    `[V-C] 数据源 data/feed.json｜卡库 ${cards.length} 张｜CHANNEL_CAP=${String(CHANNEL_CAP)}`,
  );
  // 要求线的**推导过程**必须能被人一眼复核（五轮 T3：把魔法数换成可推导口径）
  console.log(
    `[V-C] 口径：每核心频道 ≥ ${MIN_SCREENS} 屏 × ${CARDS_PER_SCREEN} 张/屏 = ${MIN_REACHABLE} 张｜` +
      `每屏 = feedColsForContentWidth(${2 * FEED_COL_MIN + FEED_ROW_GAP}) = ${CARDS_PER_SCREEN / Math.floor(REF_VIEWPORT_HEIGHT / FEED_ROW_HEIGHT)} 列` +
      ` × floor(${REF_VIEWPORT_HEIGHT} / ${FEED_ROW_HEIGHT}) = ${Math.floor(REF_VIEWPORT_HEIGHT / FEED_ROW_HEIGHT)} 行` +
      `（卡定高 ${FEED_ROW_HEIGHT - FEED_ROW_GAP} + 行距 ${FEED_ROW_GAP}；卡宽下限 ${FEED_COL_MIN} 来自摘要 35 字契约）`,
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
    // 2026-09-23 修「只报不拦」：此前这里只 return，脚本恒 exit 0 → CI 里这一步恒绿，
    // 「分区·创意 237<300」这类**真实违例**跑了几个月一次都没拦过（乙10）。
    // 现在与闸的语义对齐：有问题 → 非 0 退出。CI 会因此变红，那是数据侧缺口的真实信号——
    // 不许靠调 MIN_REACHABLE 让它变绿（不许为过闸改标准）。
    process.exitCode = 1;
    return;
  }
  console.log(
    `[V-C] 通过：核心频道可达至少 ${MIN_REACHABLE} 张（${MIN_SCREENS} 屏 × ${CARDS_PER_SCREEN} 张/屏）、无重复卡、` +
      `显示张数等于实际张数、前缀配额合规`,
  );
}

// 只有「被直接执行」时才跑报告：本文件同时被 src/__tests__/channel-capacity-exit.test.ts import，
// 若在 import 时也执行，测试进程会被 report() 置上 exitCode=1（假红风险）。
if (process.argv[1] && /gittok-channel-capacity\.[tj]s$/.test(process.argv[1])) report();
