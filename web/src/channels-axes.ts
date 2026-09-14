/**
 * 频道/分区两轴的**唯一定义源**（2026-09-14 抽离，起因：两轴 key 撞车导致功能串台）。
 *
 * 背景（栗子 09-14 实测发现的严重 bug）：
 *   频道轴「乐趣」的 key = `fun`，分区轴「创意」的 key 也 = `fun`
 *   → `activeKey` 无法区分两个按钮（点一个两个都高亮）
 *   → `getSectionCards` 的 `case "fun"`（乐趣的体验轴逻辑）把「创意」tab 也吃了
 *   → 两个入口渲染同一份内容。
 *
 * 修法与纪律：
 *   1. 两轴**命名空间隔离**：频道用裸 key（recommended/hot/daily/fun/following），
 *      分区用前缀 key（`cat:` + 存量 category 值）。
 *   2. 任何新增入口都必须落在本模块的数组里，模块加载即跑 `assertUniqueChannelKeys()`——
 *      撞车当场抛错，而不是静默串台。
 *   3. 分区 tab 与 「存量 category / 新版 zone」三级映射集中在本模块，避免散落各处再漂移。
 */

export interface SectionDef {
  key: string;
  icon: string;
  title: string;
  desc: string;
}

/** 分区 tab key 的命名空间前缀（机制隔离，不可省）。 */
export const CAT_KEY_PREFIX = "cat:";

/** 频道轴（发现组，不互斥）：推荐/热门/每日/乐趣/关注。 */
export const DYNAMIC_SECTIONS: SectionDef[] = [
  { key: "recommended", icon: "sparkles", title: "推荐", desc: "为你挑选" },
  { key: "hot", icon: "flame", title: "热门", desc: "正在被大众发现" },
  { key: "daily", icon: "trending-up", title: "每日", desc: "今天新出/在涨" },
  { key: "fun", icon: "party-popper", title: "乐趣", desc: "好玩得想点开" },
  { key: "following", icon: "heart", title: "关注", desc: "关注创作者的项目" },
];

/** 分区轴的三个身份：tab key（cat:xxx）/ 存量 category 值 / 新版 zone 值。
 *  注：`cat` 与 `zone` 的对应关系是**产品定义的翻译**（不是模型判据的枚举）；
 *  模型判据仍在服务端 prompt（四问判定链），此处只做 key↔词表的等价映射。 */
export const CATEGORY_CHANNELS: {
  cat: string;
  zone: string;
  icon: string;
  title: string;
  desc: string;
}[] = [
  { cat: "ai", zone: "AI", icon: "bot", title: "AI", desc: "AI 技术与智能工具" },
  { cat: "fun", zone: "创意", icon: "gamepad", title: "创意", desc: "玩与创作：游戏 / 脑洞 / 绘画 / 音乐" },
  {
    cat: "tool",
    zone: "工具",
    icon: "wrench",
    title: "工具",
    desc: "干活用的：效率 / 开发 / 数据库 / 自托管",
  },
  { cat: "learning", zone: "资源", icon: "book", title: "资源", desc: "学与看：教程 / 文档 / 数据集" },
];

/** 分区轴（分类组，互斥）：AI / 创意 / 工具 / 资源（key 带 `cat:` 前缀）。 */
export const CATEGORY_SECTIONS: SectionDef[] = CATEGORY_CHANNELS.map((c) => ({
  key: `${CAT_KEY_PREFIX}${c.cat}`,
  icon: c.icon,
  title: c.title,
  desc: c.desc,
}));

export const ALL_SECTIONS: SectionDef[] = [...DYNAMIC_SECTIONS, ...CATEGORY_SECTIONS];

/** 分区 tab key → 存量 category 值（`cat:fun` → `fun`）；非分区 key 返回 null。 */
export function categoryOfKey(key: string): string | null {
  return key.startsWith(CAT_KEY_PREFIX) ? key.slice(CAT_KEY_PREFIX.length) : null;
}

/** 分区 tab key → 服务端 zone（cat:ai→AI / cat:fun→创意 / cat:tool→工具 / cat:learning→资源）。 */
export function sectionZoneOf(key: string): string | null {
  const cat = categoryOfKey(key);
  if (!cat) return null;
  return CATEGORY_CHANNELS.find((c) => c.cat === cat)?.zone ?? null;
}

/**
 * 存量 category 值 → zone 值（`fun` → `创意`）。
 * 修正 2026-09-14 的语义漂移：首屏三选一曾把 category 值当 zone 存进 `preferredZone`
 * （变量名说 zone、存的是 category），导致配额查表键名与语义不符（PREF_QUOTA 的键其实是 category）。
 */
export function zoneForCategory(cat: string): string | null {
  return CATEGORY_CHANNELS.find((c) => c.cat === cat)?.zone ?? null;
}

/** zone 值 → 存量 category 值（`创意` → `fun`）；供按 category 建索引的配额逻辑消费。 */
export function categoryOfZone(zone: string): string | null {
  return CATEGORY_CHANNELS.find((c) => c.zone === zone)?.cat ?? null;
}

/** 唯一性自检：两轴 key 不得撞车（撞车 = activeKey 无法区分入口 = 功能串台）。 */
export function assertUniqueChannelKeys(sections: SectionDef[] = ALL_SECTIONS): void {
  const keys = sections.map((s) => s.key);
  const dup = [...new Set(keys.filter((k, i) => keys.indexOf(k) !== i))];
  if (dup.length > 0) {
    throw new Error(`频道/分区 key 撞车（两轴必须命名空间隔离）: ${dup.join(", ")}`);
  }
}
