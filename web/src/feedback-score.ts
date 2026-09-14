/**
 * 乐趣反馈闭环（G-B2①）：把「点赞 / 点踩 / 收藏」回写到乐趣分。
 *
 * 问题（栗子 2026-09-14）：funScore 只有产出没有修正——点赞/点踩/收藏只进了 localStorage
 * 当推荐权重，**不影响 funScore 本身**，所以「乐趣」这个轴永远学不到栗子的口味。
 *
 * 做法（**轻量、纯本地**）：
 *  - 在**排序时**叠加一个反馈增量（不改数据文件、不写云端）：funScoreEff = funScore + Δ，
 *    再夹到 [0,1]；
 *  - Δ 的取值：点赞/收藏**加分**、点踩**扣分**，且扣分幅度大于加分（错判比漏判更烦人）；
 *  - 点踩的卡本来就会被 applyFilter 过滤掉 7 天，这里的扣分是给「7 天后放回来」的第二道；
 *  - 云端回写**未做**：站点是 GitHub Pages 静态站，没有后端可写（栗子没要求注册/充值，
 *    也不该为一个偏好信号去搭服务）。要上云端得先有账号体系，属于产品决策，不在本轮范围。
 *
 * 纪律：纯函数、可测（见 web/src/__tests__/feedback-score.test.ts）。
 */

/** 互动记录（与 App.tsx 的 InteractionRecord 同形；这里自带一份，避免模块循环依赖）。 */
export interface FeedbackRecord {
  type: "like" | "dislike" | "bookmark" | string;
  ts: number;
}

/** 反馈增量表（可调参数；数值取「够改变排序、不掀翻大秩序」的量级）。 */
export const FEEDBACK_DELTA: Record<string, number> = {
  like: 0.15,
  bookmark: 0.1,
  dislike: -0.3,
};

/** 单张卡的反馈增量；无互动 = 0。 */
export function funScoreDelta(interaction: FeedbackRecord | undefined): number {
  if (!interaction) return 0;
  return FEEDBACK_DELTA[interaction.type] ?? 0;
}

/** 叠加反馈后的乐趣分（夹到 [0,1]；funScore 缺失按 0 处理）。 */
export function funScoreWithFeedback(
  funScore: number | undefined,
  interaction: FeedbackRecord | undefined,
): number {
  const base = typeof funScore === "number" && Number.isFinite(funScore) ? funScore : 0;
  const v = base + funScoreDelta(interaction);
  return Math.max(0, Math.min(1, v));
}

/**
 * 批量应用：返回**新数组**（不改原卡对象——React 里就地改会破坏 memo 比较）。
 * 只改 `funScore` 一个字段，供乐趣频道排序消费。
 */
export function applyFeedbackToFun<T extends { repo: string; funScore?: number }>(
  cards: T[],
  interactions: Record<string, FeedbackRecord>,
): T[] {
  return cards.map((c) => {
    const inter = interactions[c.repo];
    if (!inter) return c;
    const next = funScoreWithFeedback(c.funScore, inter);
    return next === c.funScore ? c : { ...c, funScore: next };
  });
}
