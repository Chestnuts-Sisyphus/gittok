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

/* ═══ 详情表分片（二十轮 C3，2026-10-06）═══
 * 详情表 5.96MB 单文件是「首点深度解读慢」的数据侧根源：点击要么等整表下载，
 * 要么整表缓存未到就补渲闪现。分片后构建期把每个 repo 的 detailCn 落成独立小文件
 * （实测 3381 键单卡 p50 1703B / p90 2169B），点击只拉所需一片 ≈2KB。
 * 约定（与 vite.config prepareFeedPlugin、运行时 feed-payload 三处共享，纯函数落此处）：
 *   - 有 detailCn → 文件体 {"detailCn":"…"}；
 *   - 无 detailCn → 墓碑 {"detailCn":null}（让「确认缺失」一次请求就有答案，不用走兜底）；
 *   - 404 只可能来自部署偏斜（新版列表 × 旧版 dist），运行时再走整表兜底。
 *   - 路径 data/details/<owner>/<name>.json，**两段一律小写**：GitHub 的 owner/repo 名
 *     本身大小写不敏感（实测数据里有 Hmbown/Codewhale 与 Hmbown/CodeWhale 两条大小写
 *     漂移双卡），同 repo 理应共享同一分片；构建与运行时都经本函数取路径，天然一致，
 *     也顺带消灭大小写变体的路径穿越面。GitHub 名只含字母数字 - _ . ，无需编码变换。 */

/** repo 键 → 分片相对路径（相对 data/ 目录；两段小写规范键）。 */
export function detailShardPath(repo: string): string {
  const i = repo.indexOf("/");
  const owner = (i === -1 ? repo : repo.slice(0, i)).toLowerCase();
  const name = (i === -1 ? "index" : repo.slice(i + 1)).toLowerCase();
  return `details/${owner}/${name}.json`;
}

/** 分片文件体：有内容为 {"detailCn":"…"}，无内容为墓碑 {"detailCn":null}。 */
export function detailShardBody(detailCn: string | null): string {
  return JSON.stringify({ detailCn });
}

/** 解析分片体。三态：string＝取到内容；null＝墓碑（确认缺失）；undefined＝畸形体（调用方走兜底）。 */
export function parseDetailShard(text: string): string | null | undefined {
  try {
    const v = (JSON.parse(text) as { detailCn?: unknown }).detailCn;
    if (typeof v === "string" && v.length > 0) return v;
    if (v === null) return null;
    return undefined;
  } catch {
    return undefined;
  }
}

/** 单卡合并（分片到货后的写回）：卡上已有 detailCn 不覆盖；null（缺失）原样返回。 */
export function withRepoDetail<T extends { repo: string; detailCn?: string }>(
  card: T,
  detailCn: string | null,
): T {
  if (card.detailCn || detailCn === null) return card;
  return { ...card, detailCn };
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
