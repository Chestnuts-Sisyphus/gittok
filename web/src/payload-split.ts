/**
 * feed payload 纯函数（无浏览器依赖）——构建层（vite.config）与运行时共用。
 * 列表/详情表拆分：首屏只下载刷卡所需字段，detailCn 按需加载。
 */

export function splitFeedPayload<T extends { repo: string; detailCn?: string }>(
  cards: T[],
): { list: Array<Omit<T, "detailCn"> & { detailCn?: never }>; details: Record<string, string> } {
  const details: Record<string, string> = {};
  const list = cards.map((card) => {
    const { detailCn, ...rest } = card;
    if (typeof detailCn === "string" && detailCn.length > 0) {
      details[card.repo] = detailCn;
    }
    return rest as Omit<T, "detailCn"> & { detailCn?: never };
  });
  return { list, details };
}

export function mergeDetail<T extends { repo: string; detailCn?: string }>(
  card: T,
  details: Record<string, string> | null | undefined,
): T {
  if (card.detailCn) return card;
  const detailCn = details?.[card.repo];
  return detailCn ? { ...card, detailCn } : card;
}

/**
 * 详情表完整性核对：返回「卡上无有效 detailCn，且详情表里也没有该 repo 键」的清单。
 * 背景（G-04）：详情表 404 或漏键时 UI 静默不渲染深度解读（连读代码的人都会被误导成
 * 「线上字段丢了」），故先把缺键变成可观测项；是否给 UI 空态占位属审美拍板，此处不加。
 */
export function diffDetailKeys(
  list: readonly { repo: string; detailCn?: string }[],
  details: Record<string, string> | null | undefined,
): string[] {
  return list
    .filter((c) => !(typeof c.detailCn === "string" && c.detailCn.length > 0) && !details?.[c.repo])
    .map((c) => c.repo);
}
