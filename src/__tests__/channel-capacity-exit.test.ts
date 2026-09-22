import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { capacityProblems, MIN_REACHABLE, type Row } from "../../scripts/gittok-channel-capacity.ts";

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

  it("阈值是栗子定稿的 300，不被顺手改小", () => {
    expect(MIN_REACHABLE).toBe(300);
    expect(SRC).toMatch(/export const MIN_REACHABLE = 300;/);
  });
});
