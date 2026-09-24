import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  capacityProblems,
  CARDS_PER_SCREEN,
  MIN_REACHABLE,
  MIN_SCREENS,
  REF_VIEWPORT_HEIGHT,
  type Row,
} from "../../scripts/gittok-channel-capacity.ts";
import {
  FEED_COL_MIN,
  FEED_ROW_GAP,
  FEED_ROW_HEIGHT,
  feedColsForContentWidth,
} from "../../web/src/feed-layout.ts";

/**
 * V-C 频道容量闸的「拦截力」契约（2026-09-23 补，对应缺口乙10）。
 *
 * 背景：该闸在 `problems.length > 0` 时原先只 `return`、**没有非 0 退出** → CI 恒绿，
 * 真实违例（分区·创意 237 < 300）跑了几个月一次都没拦过。修法是把退出码置 1。
 * 本文件锁两件事：
 *   ① 结论函数本身：合规行 → 空清单；各类违例 → 逐条点名（纯函数，可复跑）
 *   ② 脚本正身里**确实**在违例分支置了非 0 退出码（源码级锁，防止有人把 process.exitCode 挪走/删掉）
 */
const SRC = readFileSync(resolve("scripts/gittok-channel-capacity.ts"), "utf8");

const ok = (name: string, n: number): Row => ({ name, pool: n, out: n, dup: 0, viol: 0 });

describe("V-C 容量闸结论函数", () => {
  it("全部合规 → 空清单（这条为空是「没有退出码」的前提）", () => {
    const rows = ["热门", "每日", "乐趣", "关注", "分区·AI", "分区·资源", "分区·工具", "分区·创意"].map((n) =>
      ok(n, 400),
    );
    expect(capacityProblems(rows)).toEqual([]);
  });

  it("核心频道不足 300 → 点名；非核心频道（每日/关注）不设 300 约束", () => {
    const p = capacityProblems([
      ok("热门", MIN_REACHABLE - 1),
      ok("分区·创意", 237),
      ok("每日", 12),
      ok("关注", 0),
    ]);
    expect(p).toEqual([
      `热门 只有 ${MIN_REACHABLE - 1} 张（要求至少 ${MIN_REACHABLE}）`,
      `分区·创意 只有 237 张（要求至少 ${MIN_REACHABLE}）`,
    ]);
  });

  it("重复卡 / 显示张数≠实际输出 / 前缀配额违规 三类都要点名", () => {
    const p = capacityProblems([
      { name: "热门", pool: 400, out: 399, dup: 1, viol: 0 },
      { name: "乐趣", pool: 400, out: 400, dup: 0, viol: 3 },
    ]);
    expect(p).toEqual([
      "热门 频道内有重复卡 1 张",
      "热门 显示张数 400 不等于实际输出 399（显示层与频道函数口径不一致）",
      "乐趣 前缀配额违规 3 处",
    ]);
  });
});

describe("V-C 容量闸退出码（源码级锁，防「只报不拦」复发）", () => {
  it("违例分支里有 process.exitCode = 1，且通过分支不打退出码", () => {
    const iProblems = SRC.indexOf("const problems = capacityProblems(rows);");
    expect(iProblems).toBeGreaterThan(0);
    const tail = SRC.slice(iProblems);
    const iExit = tail.indexOf("process.exitCode = 1");
    const iPass = tail.indexOf("通过：核心频道可达至少");
    expect(iExit).toBeGreaterThan(0); // 有置码
    expect(iExit).toBeLessThan(iPass); // 且在「通过」打印之前（即违例分支里）
    expect(tail.slice(0, iPass)).not.toMatch(/process\.exitCode\s*=\s*0/);
  });

  it("阈值不再是拍的数字：由「屏数 × 每屏张数」推导，且每屏张数来自版式规则本身", () => {
    // 五轮 T3（2026-09-24）：栗子问「为什么有这样的要求」，溯源证明 300 **从来没有推导**
    // （`git log -S MIN_REACHABLE` 只有 a0f2fca，只加了常量、无注释、无文档）。
    // ⇒ 这条锁从「数字必须是 300」升级成「数字必须是推导出来的」——**比锁一个值更严**：
    //    谁想把线压低，不能只改一个数字，必须同时改 MAC 版式规则或屏数，而那两个都会在
    //    别处（列数单测/拖拽闸/视觉闸）当场翻车。
    expect(MIN_SCREENS).toBe(40); // 唯一允许直接取值的量：栗子定稿的「刷几屏」
    // 每屏张数 = 列数(两列门槛内容宽) × 行数(参照视口高)，逐项复算
    const expectCols = feedColsForContentWidth(2 * FEED_COL_MIN + FEED_ROW_GAP);
    const expectRows = Math.floor(REF_VIEWPORT_HEIGHT / FEED_ROW_HEIGHT);
    expect(CARDS_PER_SCREEN).toBe(expectCols * expectRows);
    expect(expectCols).toBe(2); // 两列门槛的内容宽必须正好给出两列（653px 卡宽 ×2 + 16 间距 = 1322）
    expect(MIN_REACHABLE).toBe(MIN_SCREENS * CARDS_PER_SCREEN);
    expect(MIN_REACHABLE).toBe(240); // 今日实测值：40 × 6（分区·创意 245 ⇒ 余 5 张）
    // 不许再退回「一个裸常量」
    expect(SRC).toMatch(/export const MIN_REACHABLE = MIN_SCREENS \* CARDS_PER_SCREEN;/);
  });

  it("报告里能看到推导（口径可复核，不是只给结论）", () => {
    expect(SRC).toMatch(/屏 × \$\{CARDS_PER_SCREEN\} 张\/屏/);
  });
});
