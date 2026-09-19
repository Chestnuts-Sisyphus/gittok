/**
 * 不合格存量卡的推荐池呈现闸（COPY-08，2026-09-19 栗子口径：站内展示内容必须符合要求与标准）。
 *
 * 策略（代裁记录见 D:/tmp/lizi_answers_0919.md §4）：
 *  `copyOk === false` 的卡**不进推荐池**；搜索、直达、收藏/关注等其他消费路径不受影响，
 *  数据一行不删——G-17 重跑洗白后自动回流。
 * 一键回退 = 把开关改 false（改一行，另附单测锁行为）。
 *
 * fail-open：`copyOk` 缺键（老构建产物 / sample 数据 / skip 分支）一律视作可推荐，
 * 呈现闸只挡「明确判过而不合格」的卡，绝不因构建没打标而把全站的流掐死。
 */

export const EXCLUDE_NONCOMPLIANT_FROM_RECOMMEND = true;

export function keepForRecommend(c: { copyOk?: boolean }): boolean {
  if (!EXCLUDE_NONCOMPLIANT_FROM_RECOMMEND) return true;
  return c.copyOk !== false;
}
