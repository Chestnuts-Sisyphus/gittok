/**
 * 分档规模 + 产能估算（2026-09-14 实测口径版）。
 *
 * 数据来源（全部为 09-14 实测，非假设）：
 *  - 各档规模：GitHub search total_count（scripts/gittok-tier-estimate.ts 实测）
 *  - 单轮产能：1200/300 窗口实跑——约 50 分钟产出 ~29 张新卡（免费档 22% 成功率下）
 *  - 24h 运转：feed-tier-drip 每 2 小时一班 → 12 班/天
 *
 * 输出三档耗时 + 加速情景（Batch 兜底 / OR 充值），全部标注为「线性外推」。
 *
 * 用法：npx tsx scripts/gittok-tier-plan.ts
 */

/** 各档规模（09-14 search 实测；t3 为 1k+ 总数减去前两档） */
const TIERS = [
  { id: "t1", label: "10k+", size: 5_553 },
  { id: "t2", label: "5k-10k", size: 6_989 },
  { id: "t3", label: "1k-5k", size: 52_285 },
];

/** 实测单轮：窗口 1200/300 跑 ~50 分钟 → ~29 张新卡（免费档、zhipu 22% 成功率、含重评损耗） */
const CARDS_PER_ROUND = Number(process.env["PLAN_CARDS_PER_ROUND"] ?? 29);
const ROUND_MINUTES = Number(process.env["PLAN_ROUND_MINUTES"] ?? 50);
/** 24h 运转：每 2h 一班 = 12 班/天（留 1 班余量给维护/冲突重试） */
const ROUNDS_PER_DAY = Number(process.env["PLAN_ROUNDS_PER_DAY"] ?? 11);

/** 加速倍数（相对免费档实测产能） */
const SPEEDUPS = [
  { name: "现状（免费档：智谱双号 + 魔搭 + OR 50/日）", factor: 1 },
  { name: "+ qwen3.7-flash Batch 兜底（全站 ≈¥22.5）", factor: 4.5 },
  { name: "+ OR 充 $10（1000/日）+ Batch 兜底", factor: 6 },
];

function main(): void {
  const perRound = CARDS_PER_ROUND;
  const perDay = perRound * ROUNDS_PER_DAY;
  const total = TIERS.reduce((s, t) => s + t.size, 0);

  console.log(`[plan] 口径（09-14 实测）：${perRound} 卡/轮 × ${ROUNDS_PER_DAY} 轮/天 = ${perDay} 卡/天`);
  console.log(
    `[plan] 单轮 ${ROUND_MINUTES} 分钟 → 每小时约 ${((60 / ROUND_MINUTES) * perRound).toFixed(0)} 卡\n`,
  );

  console.log(`[plan] 各档耗时（线性外推，免费档现状）：`);
  let cum = 0;
  for (const t of TIERS) {
    const days = t.size / perDay;
    cum += days;
    console.log(
      `  ${t.id} (${t.label}): ${t.size.toLocaleString()} 个 → ${days.toFixed(1)} 天（累计 ${cum.toFixed(1)} 天）`,
    );
  }
  console.log(`  ${"=".repeat(52)}`);
  console.log(`  全量 1k+：${total.toLocaleString()} 个 → 约 ${(total / perDay).toFixed(1)} 天\n`);

  console.log(`[plan] 加速情景（同一分解，按产能倍数缩放）：`);
  for (const s of SPEEDUPS) {
    const d = total / (perDay * s.factor);
    console.log(`  ${s.name}: ${(perDay * s.factor).toFixed(0)} 卡/天 → 全量约 ${d.toFixed(1)} 天`);
  }

  console.log(
    `\n[plan] 结论：t1(10k+) 约 ${(TIERS[0]!.size / perDay).toFixed(1)} 天先跑完（头部先全量上线），` +
      `t2 约 ${(TIERS[0]!.size / perDay + TIERS[1]!.size / perDay).toFixed(1)} 天累计，` +
      `t3 需 ${(total / perDay).toFixed(0)} 天——**纯免费档撑不起 t3**（t3 是长尾，允许慢）。`,
  );
  console.log(
    `[plan] 瓶颈不在 GitHub 配额（5000/h 够用），在免费 LLM 的限流（实测 zhipu 22% 成功率、` +
      `569 次空响应重试）——提高产能的唯一途径是加源（Batch 兜底或充值），已列加速情景。`,
  );
}

void main();
