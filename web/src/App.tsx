import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import type { ChangeEvent } from "react";
import type { FeedCard, Collection } from "./types.ts";
import { FeedCardMemo, CardDetail, GithubAvatar } from "./FeedCard.tsx";
import { CreatorPage } from "./CreatorPage.tsx";
import { AgentPage } from "./AgentPage.tsx";
import { weightedSearch } from "./search.ts";
import { loadSafe, saveDual, migrateLegacyKeys } from "./storage.ts";
import {
  mergeDetail,
  prefetchFeedDetails,
  warmFeedDetails,
  getFeedDetailsIfReady,
  diffDetailKeys,
} from "./feed-payload.ts";
import { loadCachedText, saveCachedText } from "./feed-cache.ts";
import {
  FEED_CARD_HEIGHT,
  FEED_MOBILE_MAX_WIDTH,
  FEED_ROW_GAP,
  FEED_ROW_HEIGHT,
  FEED_SHORT_MAX_HEIGHT,
  feedCardHeightForHeight,
  feedColsForContentWidth,
  feedGridFromMatch,
  feedViewportOf,
  feedWindow,
  isScrollableOverflow,
  nearestScrollRoot,
  sameFeedWindow,
  type FeedWindow,
} from "./feed-layout.ts";
import { measureCards as measureCardsFlip, playCardsFlip, type FlipEntry } from "./feed-flip.ts";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  ChevronRight,
  ExternalLink,
  Folder,
  Gamepad2,
  Heart,
  Home,
  Inbox,
  Menu,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  User,
  UserMinus,
  Wrench,
  X,
  CHANNEL_ICONS,
  GitTokLogo,
} from "./icons.tsx";
import "./styles.css";

// ---------------------------------------------------------------------------
// 常量
// ---------------------------------------------------------------------------

const FEED_URL = "./data/feed.json";
const STORAGE_KEY = "gittok-feedback";
const PREF_KEY = "gittok-preferences";
const COLLECTIONS_KEY = "gittok-collections";
const SEEN_KEY = "gittok-seen";
const INTERACTIONS_KEY = "gittok-interactions";
const FOLLOWING_KEY = "gittok-following";
/** 6 个主数据 key（导出/完全恢复的白名单；导入备份也用它） */
const ALL_STORAGE_KEYS = [STORAGE_KEY, PREF_KEY, COLLECTIONS_KEY, SEEN_KEY, INTERACTIONS_KEY, FOLLOWING_KEY];

// 一次性迁移：旧前缀 key -> 新前缀（模块顶层，任何 load 之前）
migrateLegacyKeys();

/** 备份文件结构（导出/导入共用；keys 存 localStorage 原始字符串） */
interface BackupPayload {
  app: string;
  type: string;
  version: number;
  exportedAt?: string;
  keys: Record<string, string>;
}

/** 合并导入：feedback 并集（likes/dislikes/快照各自并集） */
function mergeFeedbackData(a: Feedback, b: Feedback): Feedback {
  return {
    likes: Array.from(new Set([...a.likes, ...b.likes])),
    dislikes: Array.from(new Set([...a.dislikes, ...b.dislikes])),
    likedSnapshots: { ...a.likedSnapshots, ...b.likedSnapshots },
  };
}

/** 合并导入：collections 按 id 匹配（同 id 的 repos/snapshots 并集，文件独有的新建） */
function mergeCollectionsData(a: Collection[], b: Collection[]): Collection[] {
  const map = new Map<string, Collection>();
  for (const col of a) map.set(col.id, col);
  for (const col of b) {
    const existing = map.get(col.id);
    if (existing) {
      map.set(col.id, {
        ...existing,
        repos: Array.from(new Set([...existing.repos, ...col.repos])),
        snapshots: { ...existing.snapshots, ...col.snapshots },
      });
    } else {
      map.set(col.id, col);
    }
  }
  return Array.from(map.values());
}

/** 导出备份：6 个主 key 原始字符串 → JSON 下载（含损坏现场原文，不解析不加工；无值 key 导出空串保证全量） */
function exportBackup(): void {
  const keys: Record<string, string> = {};
  for (const k of ALL_STORAGE_KEYS) {
    try {
      const raw = localStorage.getItem(k);
      keys[k] = raw ?? "";
    } catch (e) {
      console.warn(`[gittok-storage] 导出读取 ${k} 失败:`, e);
      keys[k] = "";
    }
  }
  const payload: BackupPayload = {
    app: "gittok",
    type: "backup",
    version: 1,
    exportedAt: new Date().toISOString(),
    keys,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  a.href = url;
  a.download = `gittok-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

type Tab = "feed" | "search" | "agent" | "me";

interface Feedback {
  likes: string[];
  dislikes: string[];
  /** 喜欢过的卡片快照（repo → 卡片本体）。点赞时留存，列表展示不依赖当天数据 */
  likedSnapshots?: Record<string, FeedCard>;
}

interface Preferences {
  tagWeights: Record<string, number>;
  lastUpdateTs: string;
  /** 显式偏好（个性化 v2.2 L3）：首屏三选一/设置页选择；null=跳过/未设置。驱动推荐配额 */
  preferredZone?: string | null;
}

type InteractionType = "like" | "dislike" | "bookmark";

interface InteractionRecord {
  type: InteractionType;
  ts: number;
}

const SNAPSHOT_CAP = 1000; // 喜欢/收藏快照总条数上限（~1KB/张，1MB 内安全；超出后新操作只记 repo 名）

// 频道/分区两轴的唯一定义源抽到 channels-axes.ts（可单测、模块加载即自检 key 唯一性——
// 2026-09-14 栗子实测发现「乐趣」与「创意」共用 key=fun 导致串台，此为该 bug 的机制性修法）。
import { applyFeedbackToFun } from "./feedback-score.ts";
import { diversifyRank } from "../../src/feed/similarity.ts";
import { keepForRecommend } from "./copy-gate.ts";
import {
  DYNAMIC_SECTIONS,
  CATEGORY_SECTIONS,
  ALL_SECTIONS,
  categoryOfKey,
  sectionZoneOf,
  zoneForCategory,
  categoryOfZone,
  assertUniqueChannelKeys,
} from "./channels-axes.ts";
// 频道价值函数 / 容量 / 配额：**唯一定义源**在服务端 src/feed/channel-policy.ts，前后端共用。
// 起因（栗子 L8）：v2.2 前后端各写一份，且各自硬编码 60 → 热门池 418 张只展示 60、
// 全库 2477 张任一频道最多看到 2.4%。这里只 import，不再复制任何一份。
import {
  RECOMMEND_PAGE_SIZE,
  hotChannel,
  dailyChannel,
  funChannel,
  followingChannel,
  categoryChannel,
  interleaveByCap,
  aiCapCaps,
  funCaps,
  pagedQuotaMerge,
  zoneOf as zoneOfPolicy,
} from "../../src/feed/channel-policy.ts";

assertUniqueChannelKeys();

/** 频道图标渲染（按 SECTIONS icon 字段查 map，找不到渲染 null） */
function SectionIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const Icon = CHANNEL_ICONS[icon];
  return Icon ? <Icon size={size} /> : null;
}

/**
 * 频道导航列表（发现组 + 分类组）：桌面侧栏与移动端抽屉共用。
 * 渲染结构与原侧栏内联版完全一致（side-group-box/side-group/side-item），
 * 避免双份维护漂移。onPick 由调用方决定是否附带额外动作（如关抽屉）。
 */
function ChannelNav({
  sections,
  activeKey,
  onPick,
}: {
  sections: { key: string; icon: string; title: string; desc: string; cards: FeedCard[] }[];
  activeKey: string;
  onPick: (key: string) => void;
}) {
  return (
    <>
      <div className="side-group-box">
        <div className="side-group">发现</div>
        {DYNAMIC_SECTIONS.filter((s) => s.key === "following" || sections.some((x) => x.key === s.key)).map(
          (s) => (
            <button
              key={s.key}
              className={`side-item${activeKey === s.key ? " active" : ""}`}
              onClick={() => onPick(s.key)}
              aria-label={s.title}
              title={s.title}
            >
              <span className="side-icon">
                <SectionIcon icon={s.icon} size={18} />
              </span>
              <span className="side-text">{s.title}</span>
            </button>
          ),
        )}
      </div>
      <div className="side-group-box">
        <div className="side-group">分类</div>
        {CATEGORY_SECTIONS.filter((s) => sections.some((x) => x.key === s.key)).map((s) => (
          <button
            key={s.key}
            className={`side-item${activeKey === s.key ? " active" : ""}`}
            onClick={() => onPick(s.key)}
            aria-label={s.title}
            title={s.title}
          >
            <span className="side-icon">
              <SectionIcon icon={s.icon} size={18} />
            </span>
            <span className="side-text">{s.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// 注：前端不需要「每批多少张」这个常量——虚拟列表按视口窗口渲染（feedWindow），
// 容量与配额全部由 channel-policy 决定。CHANNEL_PAGE_SIZE 只服务于偏好配比的分页语义。

/** AI 强特征前缀（与后端 classifyCategory 一致；用于推荐配额与分类兜底） */
const AI_PREFIXES = [
  "AI基础设施",
  "AI Agent",
  "AI应用",
  "AI搜索",
  "AI写作",
  "RAG",
  "推理引擎",
  "大语言模型",
  "多模态",
  "代码助手",
  "Agent",
  "微调",
  "提示工程",
  "向量数据库",
];

/** 学习资源关键词（学英语/学代码；大模型学习已被 ai 前置判定拿走） */
const LEARNING_RE =
  /awesome|tutorial|learn|course|guide|roadmap|interview|study|educat|english|language|leetcode|algorithms|coding|编程|英语|学习/i;

// ---------------------------------------------------------------------------
// localStorage
// ---------------------------------------------------------------------------

function loadFeedback(): Feedback {
  const parsed = loadSafe<Partial<Feedback>>(STORAGE_KEY, {});
  return {
    likes: parsed.likes ?? [],
    dislikes: parsed.dislikes ?? [],
    likedSnapshots: parsed.likedSnapshots ?? {},
  };
}

function saveFeedback(fb: Feedback): void {
  // bak 轻量版：只存列表不存快照（~10KB 内）；恢复后快照由迁移逻辑用当天数据重补
  saveDual(STORAGE_KEY, fb, { likes: fb.likes, dislikes: fb.dislikes });
}

function loadPreferences(): Preferences {
  return loadSafe<Preferences>(PREF_KEY, { tagWeights: {}, lastUpdateTs: "" });
}

function savePreferences(prefs: Preferences): void {
  saveDual(PREF_KEY, prefs);
}

function loadCollections(): Collection[] {
  return loadSafe<Collection[]>(COLLECTIONS_KEY, []);
}

function saveCollections(cols: Collection[]): void {
  saveDual(
    COLLECTIONS_KEY,
    cols,
    cols.map((c) => ({ id: c.id, name: c.name, repos: c.repos })),
  );
}

function loadFollowing(): string[] {
  const parsed = loadSafe<unknown>(FOLLOWING_KEY, []);
  if (Array.isArray(parsed)) return parsed.filter((o): o is string => typeof o === "string");
  return [];
}

function saveFollowing(list: string[]): void {
  saveDual(FOLLOWING_KEY, list);
}

function loadSeen(): Record<string, number> {
  return loadSafe<Record<string, number>>(SEEN_KEY, {});
}

function saveSeen(s: Record<string, number>): void {
  saveDual(SEEN_KEY, s);
}

function loadInteractions(): Record<string, InteractionRecord> {
  return loadSafe<Record<string, InteractionRecord>>(INTERACTIONS_KEY, {});
}

function saveInteractions(ints: Record<string, InteractionRecord>): void {
  saveDual(INTERACTIONS_KEY, ints);
}

// ---------------------------------------------------------------------------
// 前端内容过滤
// ---------------------------------------------------------------------------

function applyFilter(
  cards: FeedCard[],
  seen: Record<string, number>,
  interactions: Record<string, InteractionRecord>,
  collections: Collection[],
): FeedCard[] {
  const now = Date.now();
  const DAY_MS = 86_400_000;
  const bookmarkedRepos = new Set(collections.flatMap((c) => c.repos));

  const filterFn = (maxSeenAgeDays: number): FeedCard[] => {
    return cards.filter((card) => {
      // 收藏的项目永久保留
      if (bookmarkedRepos.has(card.repo)) return true;

      const interaction = interactions[card.repo];
      if (interaction?.type === "dislike") {
        const daysSince = (now - interaction.ts) / DAY_MS;
        // 7天内点踩的过滤
        if (daysSince < 7) return false;
        // >= 7天：给二次机会
      }

      const seenTs = seen[card.repo];
      // 看过但未互动，超过阈值则过滤
      if (seenTs && !interaction) {
        const daysSinceSeen = (now - seenTs) / DAY_MS;
        if (daysSinceSeen > maxSeenAgeDays) return false;
      }

      return true;
    });
  };

  let filtered = filterFn(30);
  // 硬保底：至少 1000 张
  if (filtered.length < 1000) {
    filtered = filterFn(90);
  }
  return filtered;
}

// ---------------------------------------------------------------------------
// 向后兼容：旧数据没有 summaryCn / category，或 reasonCn 带 ①②③
// ---------------------------------------------------------------------------

const AUTHORITATIVE_ORGS = new Set([
  "openai",
  "anthropics",
  "google",
  "google-gemini",
  "google-research",
  "microsoft",
  "meta",
  "facebookresearch",
  "huggingface",
  "nvidia",
  "stabilityai",
  "pytorch",
  "tensorflow",
  "langchain-ai",
  "ollama",
  "vllm-project",
  "ggerganov",
  "QwenLM",
  "deepseek-ai",
  "mistralai",
]);

function normalizeCard(card: FeedCard): FeedCard {
  if (card.reasonCn) {
    card.reasonCn = card.reasonCn.replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, "");
  }
  if (!card.summaryCn || card.summaryCn.length === 0) {
    if (card.reasonCn) {
      const cleaned = card.reasonCn.replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, "");
      const match = cleaned.match(/^[^。！？\n]*[。！？]?/);
      card.summaryCn = match ? match[0].trim() : cleaned.slice(0, 40);
    } else {
      card.summaryCn = card.name;
    }
  }
  if (!card.detailCn) card.detailCn = "";
  // 向后兼容：补 aiDims / tags
  if (!card.aiDims || card.aiDims.length === 0) {
    card.aiDims = card.aiDim ? [card.aiDim] : [];
  }
  if (!card.tags) card.tags = [];
  // 动态标签默认值（老数据没有）：momentum 默认空；fromOfficial 按官方组织兜底
  if (!card.momentum) card.momentum = [];
  if (card.fromOfficial === undefined) {
    card.fromOfficial = AUTHORITATIVE_ORGS.has(card.owner) && card.stars >= 500;
  }
  // 固有标签兜底（与后端 classifyCategory 一致：互斥，tool 最宽兜底，全覆盖）
  if (!card.category) {
    const repoLower = card.repo.toLowerCase();
    const descLower = card.desc.toLowerCase();
    const topicsLower = card.topics.map((t) => t.toLowerCase());
    const allText = `${repoLower} ${descLower} ${topicsLower.join(" ")}`;
    const dims = card.aiDims || [];
    if (repoLower.includes("skill") || topicsLower.some((t) => t.includes("skill"))) {
      card.category = "tool";
    } else if (dims.some((d) => d === "非AI-好玩" || d === "游戏" || d === "创意工具")) {
      card.category = "fun";
    } else if (dims.some((d) => AI_PREFIXES.some((p) => d.startsWith(p) || d.includes(p)))) {
      card.category = "ai";
    } else if (LEARNING_RE.test(allText) || topicsLower.includes("awesome")) {
      card.category = "learning";
    } else {
      card.category = "tool";
    }
  }
  // 老数据兼容：旧 category 值映射到新体系（旧 feed.json 的值域与新类型不重叠，需 cast 判断）
  const legacyCategory = card.category as string;
  if (legacyCategory === "skill") card.category = "tool";
  if (
    legacyCategory === "rising" ||
    legacyCategory === "hot" ||
    legacyCategory === "daily" ||
    legacyCategory === "authoritative"
  ) {
    card.category = "tool";
  }
  return card;
}

// ---------------------------------------------------------------------------
// 分区卡片选取
// ---------------------------------------------------------------------------

/** 确定性抖动：hash(repo+seed) → [0,1)，同会话内稳定、跨会话不同 */
function jitterRank(repo: string, seed: number): number {
  let h = 2166136261;
  const s = `${repo}:${seed}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

/**
 * 会话洗牌 v4（2026-09-05 四次拍板；v2 教训：乘性抖动拿 c.score 当骨架，存量卡 score=0
 * →抖动完全失效恒序。骨架必须与数据字段无关）：
 * 骨架=位次衰减分（第 1 名 2.0 线性降到末尾 1.0）
 * × 新鲜度降权（seenPenaltyOf：看过的平滑衰减不排除）× 会话种子抖动（±strength/2）。
 * 三力合成：大秩序不破坏、看过的自然让位、每次刷新头部成员真实轮换。
 * 每日频道（热度语义）与关注频道（动态时间序）不走抖动，每日单乘降权。
 */
function applyJitter(
  cards: FeedCard[],
  seed: number,
  seen: Record<string, number>,
  now: number,
  strength = 0.18,
): FeedCard[] {
  const n = cards.length;
  if (n <= 1) return cards;
  return cards
    .map((c, idx) => ({
      c,
      j: (2 - idx / n) * seenPenaltyOf(c, seen, now) * (1 + strength * (jitterRank(c.repo, seed) - 0.5)),
    }))
    .sort((a, b) => b.j - a.j)
    .map((x) => x.c);
}

/**
 * 新鲜度降权 v4（2026-09-05 四次拍板：沉底太极端，「我连点开看的卡片都没让他彻底消失」）。
 * GitTok 是策展流不是消耗流：任何内容都不被排除，看过的只降权——
 * 按看过的久远程度平滑衰减（当天 ×0.45 / 3 天内 ×0.65 / 7 天内 ×0.85），
 * 让没看过的自然排前面，看过的仍在流中随时可能回来。
 * seen 的写入点=卡片进入渲染窗口（曝光即看过）+打开详情，跨会话持久化。
 */
function seenPenaltyOf(c: { repo: string }, seen: Record<string, number>, now: number): number {
  const ts = seen[c.repo];
  if (!ts) return 1;
  const days = (now - ts) / 86_400_000;
  if (days < 1) return 0.45;
  if (days < 3) return 0.65;
  if (days < 7) return 0.85;
  return 1;
}

// ---------------------------------------------------------------------------
// 频道函数 v2.2（标签分区定稿落地：热门动量/每日两段/乐趣 fun_score/四区配额）
// 前端只读不猜：zone 字段优先，回退旧 category 映射；配额是频道强制组件
// ---------------------------------------------------------------------------

// 频道价值函数 v3（2026-09-14）：**全部实现搬到 src/feed/channel-policy.ts**（前后端共用一份）。
// 这里只留薄别名，函数名沿用旧写法，避免全文件改名；新增代码请直接用 import 进来的本体。

/** 卡的内容分区（服务端 zone 中文四区；回退旧 category 映射；唯一实现在 channel-policy） */
const zoneOfCard = zoneOfPolicy;

/**
 * 频道取卡：**全部委托给 src/feed/channel-policy.ts**（容量/配额/价值函数的唯一实现）。
 * 本函数只剩「频道 key → 该用哪个价值函数」这一层路由 + 会话洗牌后的配额复检。
 *
 * v2.2 的四处硬编码 `60` 在这里被删除：频道容量 = CHANNEL_CAP（无限，栗子 2026-09-14 拍板），
 * 每批只决定「一次渲染多少张」（CHANNEL_PAGE_SIZE），由虚拟列表负责。
 */
function getSectionCards(
  cards: FeedCard[],
  sectionKey: string,
  followingSet: Set<string> = new Set(),
  seen: Record<string, number> = {},
  now = Date.now(),
  interactions: Record<string, InteractionRecord> = {},
): FeedCard[] {
  switch (sectionKey) {
    case "hot":
      // 热门（大众验证）：动量分降序 + AI ≤30% 前缀配额；容量无限
      return hotChannel(cards);
    case "daily":
      // 每日（时效，两段）：段 1=当日新入库；段 2=heatScore × 已读降权（同一份配额）
      return dailyChannel(cards, { now: new Date(now), seenPenalty: (c) => seenPenaltyOf(c, seen, now) });
    case "fun":
      // 乐趣（体验轴）：fun_score × 增长动量降序 + 创意 ≤40% 前缀配额；fun_score=0 不进（无信号不开）
      // 反馈闭环（G-B2①）：点赞/收藏加、点踩减——排序前先把互动回写进 funScore，
      // 乐趣轴因此能跟着栗子的口味走（此前互动只进推荐权重，funScore 永不修正）。
      return funChannel(applyFeedbackToFun(cards, interactions));
    case "following":
      // 关注（关系视图）：repo 发布时间降序，不掺降权、不掺配额（关系流=全量看到）
      return followingChannel(cards.filter((c) => followingSet.has(c.owner)));
    default: {
      // 分区 tab（cat:xxx）：按 zone 取该区全部卡，按 aiScore 策展排序；容量无限
      // 数据侧双兼容：有 zone 按四区判（新卡），只有旧 category 的按 category 判（存量卡）。
      const cat = categoryOfKey(sectionKey);
      const zone = sectionZoneOf(sectionKey);
      const pool = cards.filter((c) => (c.zone ? zoneOfCard(c) === (zone ?? "") : c.category === cat));
      return categoryChannel(pool, zone ?? "");
    }
  }
}

/** 洗牌后复检配额：applyJitter 按位次打分会把配额压到队尾的卡重新抖回前排，
 *  所以洗牌完再跑一次前缀配额，保证「任意前缀都满足配额」这条性质不被洗牌破坏。 */
function recapped(cards: FeedCard[], sectionKey: string): FeedCard[] {
  if (sectionKey === "fun") {
    return interleaveByCap<FeedCard>(cards, (c) => zoneOfCard(c) ?? "工具", funCaps([]));
  }
  if (sectionKey === "hot" || sectionKey === "daily") {
    return interleaveByCap<FeedCard>(cards, (c) => zoneOfCard(c), aiCapCaps([]));
  }
  return cards;
}

// ---------------------------------------------------------------------------
// 推荐分区 v2.2（个性化四层：L0 池过滤 → L2 多因子分 → L1 已读系数 → L3 显式偏好配额 + L4 隐式微调）
// 替换旧 tagScore 加权和（weightedCosine 服务端死代码同步作废；「千人百面」边界：领域级可区分）
// ---------------------------------------------------------------------------

/** 显式偏好驱动的推荐配额：选区上调 50%，其余三区共享 50%（设置页可改可重置） */
const PREF_QUOTA: Record<string, [number, number, number, number]> = {
  ai: [0.5, 0.16, 0.18, 0.16], // [ai, fun, tool, learning]
  fun: [0.16, 0.5, 0.18, 0.16],
  tool: [0.16, 0.16, 0.5, 0.18],
  learning: [0.16, 0.18, 0.16, 0.5],
};
const DEFAULT_QUOTA: [number, number, number, number] = [0.4, 0.2, 0.2, 0.2]; // AI:非AI = 2:3（现状 40/20/20/20）

/** 死内容降权（P1 pushedAt 活动度）：超 1 年未更新的高星库 ×0.6；缺 pushedAt 用 ts 近似 */
function activityFactor(c: FeedCard, now: number): number {
  const ts = c.pushedAt ?? c.ts;
  if (!ts) return 1;
  const days = (now - new Date(ts).getTime()) / 86_400_000;
  if (days > 365) return 0.6;
  return 1;
}

/** L2 多因子分：aiScore 相关度 × 星数增长 × 新鲜度 × 活动度（内容基默认流，0 积累也自洽） */
function multiFactorScore(c: FeedCard, now: number): number {
  const ai = c.aiScore ?? 0.5;
  const growth = 1 + Math.min((c.starGrowth ?? 0) / 50, 1) * 0.35;
  const daysSince = (now - new Date(c.ts).getTime()) / 86_400_000;
  const freshness = 0.4 + 0.6 * Math.exp(-daysSince / 7); // 半衰期约 5 天
  return ai * growth * freshness * activityFactor(c, now);
}

function buildRecommended(
  cards: FeedCard[],
  preferences: Preferences,
  seen: Record<string, number>,
  interactions: Record<string, InteractionRecord>,
  followingSet: ReadonlySet<string> = new Set(),
): FeedCard[] {
  const now = Date.now();
  // L0 池过滤：点踩排除；沉寂库退场（真沉寂，收藏豁免）；文案不合格卡剔出推荐池（COPY-08，搜索/直达不受影响）
  const pool = cards.filter((c) => {
    if (!keepForRecommend(c)) return false;
    const inter = interactions[c.repo];
    if (inter?.type === "dislike") return false;
    if ((c.silentRounds ?? 0) >= 3 && inter?.type !== "bookmark") return false;
    return true;
  });
  if (pool.length === 0) return [];

  // L2 × L1 合成：多因子分 × 已读系数 + L4 隐式微调（互动加性小 boost，不破坏大序）
  const scoreOf = (c: FeedCard): number => {
    const base = multiFactorScore(c, now) * seenPenaltyOf(c, seen, now);
    const inter = interactions[c.repo];
    const micro = inter?.type === "like" || inter?.type === "bookmark" ? 0.1 : 0;
    const followBoost = followingSet.has(c.owner) ? 0.06 : 0; // 关注轻微抬推荐（2026-09-01 关注解耦）
    return base + micro + followBoost;
  };

  // 按前端分区键分组（zone 优先，回退 category）
  const byCat = new Map<string, FeedCard[]>();
  for (const c of pool) {
    // 归到存量 category 键（配额表按 category 建索引）：
    // 新卡有 zone → 用 zone→category 转换；存量卡只有 category → 直接用。
    const key = c.zone ? (categoryOfZone(c.zone) ?? c.category ?? "tool") : c.category || "tool";
    if (!byCat.has(key)) byCat.set(key, []);
    byCat.get(key)!.push(c);
  }

  // L3 显式偏好配额：preferredZone 驱动（默认 2:3；选区上调 50%）。
  // 存量兼容：老版本把 category 值（fun/learning…）存进过同一个字段 → 两种写法都译成 category 再查表。
  const prefCat = preferences.preferredZone
    ? (categoryOfZone(preferences.preferredZone) ?? preferences.preferredZone)
    : null;
  const quota = prefCat ? (PREF_QUOTA[prefCat] ?? DEFAULT_QUOTA) : DEFAULT_QUOTA;
  // 容量无限（栗子 2026-09-14）：席位模型改成**分页配额合并**——每页按偏好配比分配席位，
  // 一页填满开下一页，直到池子见底。**不丢任何一张卡**，所以推荐频道也能一直滚到底，
  // 且每一页都保持偏好配比（旧写法 slice(0, 60) 把尾巴整段砍掉了）。
  const cats = ["ai", "fun", "tool", "learning"];
  const quotaMap: Record<string, number> = {};
  cats.forEach((cat, i) => {
    quotaMap[cat] = quota[i]!;
  });
  const sources = cats.map((cat) => ({
    key: cat,
    list: (byCat.get(cat) ?? []).sort((a, b) => scoreOf(b) - scoreOf(a)),
    scoreOf,
  }));
  const merged = pagedQuotaMerge(sources, quotaMap, RECOMMEND_PAGE_SIZE);
  // E1 接线（2026-09-14）：相似度降权排序——近重复的后来者降权后移，**不排除任何卡**。
  // 之前 similarity.ts 只是检查器、推荐流看不见相似度，连刷三张「AI 宠物」毫无抵抗力。
  // 窗口 80 + 短文本词袋 → 2.5k 张池子是毫秒级。
  return diversifyRank(merged, { scoreOf, penalty: 0.3, window: 80 }).cards;
}

// ---------------------------------------------------------------------------
// 信息流：原生 CSS 网格 + 上下垫片窗口。
// 不用 TanStack / transform 估高——那是「刷着卡」的根因。
// 卡高锁死之后，垫片可以按精确行高算，只挂视口附近的玻璃卡。
// ---------------------------------------------------------------------------

/**
 * 二轮 G6（2026-09-23 乙2）：次级列表（搜索页热门预览、收藏夹展开）与主信息流**同一条列数规则**。
 * 旧况：它们走 `.feed-list` 兜底的 CSS auto-fill（按 min 取最多列）——同一视口主信息流 2×653、
 * 预览 3×502，两套口径并存（实测 1600/1400 两档）。改法：一样量容器宽、按 feedColsForContentWidth
 * 反解、写进同一个 `--feed-cols`；CSS 用 `.feed-list[style*="--feed-cols"]` 不行——直接给容器
 * 加 style 即可，`.feed-window >` 那条主规则继续只管虚拟列表。
 */
function useResponsiveCols(rowGap: number): { ref: (el: HTMLElement | null) => void; cols: number } {
  const elRef = useRef<HTMLElement | null>(null);
  const [cols, setCols] = useState(1);
  // 条件渲染下（搜索空态/收藏夹展开只在特定视图存在），ref 挂上时 effect 已经跑过了——
  // 所以 ref callback 里直接触发首次测量，不能指望 effect。
  const measureRef = useRef<() => void>(() => {});
  useEffect(() => {
    measureRef.current = () => {
      const el = elRef.current;
      if (!el) return;
      const list = el.querySelector<HTMLElement>(".feed-list") ?? el;
      setCols(feedColsForContentWidth(list.clientWidth, rowGap));
    };
    measureRef.current();
    const ro = new ResizeObserver(() => measureRef.current());
    if (elRef.current) ro.observe(elRef.current);
    const roRef = ro;
    return () => roRef.disconnect();
  }, [rowGap]);
  return {
    cols,
    ref: (el: HTMLElement | null) => {
      elRef.current = el;
      if (el) measureRef.current();
    },
  };
}

function useFeedGrid() {  const [mobile, setMobile] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(`(max-width: ${FEED_MOBILE_MAX_WIDTH}px)`).matches,
  );
  // G-11：横屏窄高（≤560）时 CSS 把卡高降到 240，垫片档位必须同步，否则虚拟列表错位
  const [cardHeight, setCardHeight] = useState(() =>
    typeof window === "undefined" ? FEED_CARD_HEIGHT : feedCardHeightForHeight(window.innerHeight),
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${FEED_MOBILE_MAX_WIDTH}px)`);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    const shortQ = window.matchMedia(`(max-height: ${FEED_SHORT_MAX_HEIGHT}px)`);
    const onHeight = () => setCardHeight(feedCardHeightForHeight(window.innerHeight));
    shortQ.addEventListener("change", onHeight);
    return () => {
      mq.removeEventListener("change", onChange);
      shortQ.removeEventListener("change", onHeight);
    };
  }, []);
  return { ...feedGridFromMatch(mobile), cardHeight };
}

interface FeedVirtualListProps {
  cards: FeedCard[];
  likedSet: Set<string>;
  dislikedSet: Set<string>;
  onOpen: (card: FeedCard, sourceEl?: HTMLElement) => void;
  onEndHint?: string;
  channel?: string;
  onOpenCreator?: (owner: string) => void;
  entering?: boolean;
  /** 曝光回调：进入渲染窗口的卡视为「已刷过」（新鲜度降权依据），由父组件持久化 */
  onExpose?: (repos: string[]) => void;
}

function FeedVirtualList({
  cards,
  likedSet,
  dislikedSet,
  onOpen,
  onEndHint,
  channel,
  onOpenCreator,
  entering = false,
  onExpose,
}: FeedVirtualListProps) {
  const { cols: gridCols, rowGap, cardHeight } = useFeedGrid();
  const wrapRef = useRef<HTMLDivElement>(null);
  // G-10 / 2026-09-23 第四版：列数是**单一真源**——由本组件量出网格可用宽、按 feedColsForContentWidth
  // 反解（规则：先取让卡片不超上限 700px 的最少列数，若会把卡片压到下限 420px 以下再减一列），
  // 然后同时喂给两处：① CSS 变量 `--feed-cols`（.feed-list 的轨道数）② 这里的垫片计算。
  // 这样 CSS 与 JS 不再各存一份列宽常量（旧版双写常量的漂移会让垫片错位，见 2026-09-22 乙4）。
  // G-10 / 2026-09-23 第四版：列数是**单一真源**——由本组件量出网格可用宽、按 feedColsForContentWidth
  // 反解（规则：先取让卡片不超上限 700px 的最少列数，若会把卡片压到下限 420px 以下再减一列），
  // 然后同时喂给两处：① CSS 变量 `--feed-cols`（.feed-list 的轨道数）② 这里的垫片计算。
  // 这样 CSS 与 JS 不再各存一份列宽常量（旧版双写常量的漂移会让垫片错位，见 2026-09-22 乙4）。
  // 二轮甲2/乙1（2026-09-23）：首帧列数**初值直接由视口宽按同一套门槛算出**——
  // 可用宽 ≈ 视口 − 侧栏(216) − 内距(48) − 滚动条槽(8)。
  // ── 2026-09-24 四轮 T3：offset 的分档**必须跟着形态走** ──
  //   改前是 `vw <= 900 ? 76 : 280`——76 是已删除的 icon-only rail 的缩进（64＋12）。
  //   rail 删除后 769–900 与 >900 同形态（192 侧栏 + 24 边距），所以那一档也要用 280。
  //   这是个**潜在的首帧错档**：826 档旧式算 750（<976 → 1 列），实际网格 554（也是 1 列）——
  //   本机逐档核对下来 769–900 的两种算法恰好都得 1 列，所以没暴露；但只要将来该档的
  //   网格越过 976，旧式就会首帧画 1 列、随后 FLIP 跳到 2 列（正是二轮乙1 修掉的那种闪变）。
  const [cols, setCols] = useState(() => {
    if (typeof window === "undefined") return gridCols;
    const vw = window.innerWidth;
    if (vw <= FEED_MOBILE_MAX_WIDTH) return 1;
    // 桌面档只有一个侧栏形态（192 + 24 边距）→ offset 只有一个值
    return feedColsForContentWidth(vw - 280, rowGap);
  });
  // FLIP 的量测根：`.feed-content`（卡片在它内部的 .feed-window 里，频道头/偏好条是它的直接子元素）。
  // 拿不到时退回 .feed-window（只有卡片参与，退化到二轮的行为）。
  const flipRoot = (el: HTMLElement): HTMLElement => el.closest<HTMLElement>(".feed-content") ?? el;
  const beforeRef = useRef<FlipEntry[] | null>(null);
  const reducedMotionRef = useRef(false);
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const list = wrap.querySelector<HTMLElement>(".feed-list");
      if (!list) return;
      const next = feedColsForContentWidth(list.clientWidth, rowGap);
      setCols((prev) => {
        if (prev === next) return prev;
        // 列数真的要变：先把旧布局矩形量下来，等 DOM 重排后按 FLIP 补差。
        // 三轮 T1：量测根从 `.feed-list` 提到 `.feed-content`——频道头/偏好条与卡片同源变宽，
        // 一起补差（它们原先没人管，实测一帧跳 157px）。
        if (!reducedMotionRef.current) beforeRef.current = measureCardsFlip(flipRoot(wrap));
        return next;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [rowGap]);
  // 列数落进 DOM 后的同一帧：用上一步量的旧矩形做 FLIP 补差（Last→Invert→Play）。
  useLayoutEffect(() => {
    const before = beforeRef.current;
    beforeRef.current = null;
    if (!before || reducedMotionRef.current) return;
    const wrap = wrapRef.current;
    if (wrap) playCardsFlip(flipRoot(wrap), before);
  });
  const listKey = `${channel ?? ""}:${cards[0]?.repo ?? ""}:${cards.length}:${cols}:${rowGap}:${cardHeight}`;
  const [winKey, setWinKey] = useState(listKey);
  const [win, setWin] = useState<FeedWindow>(() =>
    feedWindow({
      cardCount: cards.length,
      cols,
      rowGap,
      cardHeight,
      listTop: 0,
      viewportHeight: typeof window !== "undefined" ? window.innerHeight : 900,
    }),
  );
  if (winKey !== listKey) {
    setWinKey(listKey);
    setWin(
      feedWindow({
        cardCount: cards.length,
        cols,
        rowGap,
        cardHeight,
        listTop: 0,
        viewportHeight: typeof window !== "undefined" ? window.innerHeight : 900,
      }),
    );
  }

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const root = nearestScrollRoot(el);
    const update = () => {
      const list = wrapRef.current;
      if (!list) return;
      const { listTop, viewportHeight } = feedViewportOf(list, root);
      const next = feedWindow({
        cardCount: cards.length,
        cols,
        rowGap,
        cardHeight,
        listTop,
        viewportHeight,
      });
      setWin((prev) => (sameFeedWindow(prev, next) ? prev : next));
    };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };
    update();
    const scrollTarget: EventTarget = root instanceof Window ? window : root;
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cards.length, cards[0]?.repo, channel, cols, rowGap, cardHeight]);

  const visible = cards.slice(win.startIdx, win.endIdx);

  // 曝光即看过：渲染窗口内的卡上报父组件记 seen（降权依据）。
  // key=窗口位次+频道+首卡：滚动/切频道/数据变化时增量触发，不依赖 onExpose 引用稳定。
  const exposedKey = `${channel ?? ""}:${cards[0]?.repo ?? ""}:${cards.length}:${win.startIdx}:${win.endIdx}`;
  const onExposeRef = useRef(onExpose);
  onExposeRef.current = onExpose;
  useEffect(() => {
    if (!onExposeRef.current || win.endIdx <= win.startIdx) return;
    onExposeRef.current(cards.slice(win.startIdx, win.endIdx).map((c) => c.repo));
  }, [exposedKey, cards, win.startIdx, win.endIdx]);

  return (
    <div ref={wrapRef} className={entering ? "feed-window channel-entering" : "feed-window"}>
      {win.topPad > 0 && (
        <div className="feed-window-pad" style={{ height: win.topPad }} aria-hidden="true" />
      )}
      {/* data-cols：列数分流用**显式属性**（CSS 侧 `[data-cols="1"]` 读它）。
          四轮 T1（乙B2）：此前 CSS 靠 `[style*="--feed-cols: 1"]` 匹配 React 序列化出的
          `--feed-cols: 1;` 字符串——依赖「含空格」这一个隐含约定，序列化策略一变就静默失效。
          `--feed-cols` 保留：它是 CSS 变量，主规则按它取轨道数，JS 垫片也读它。 */}
      <div className="feed-list" data-cols={cols} style={{ "--feed-cols": cols } as React.CSSProperties}>
        {visible.map((card) => (
          <FeedCardMemo
            key={card.repo}
            card={card}
            liked={likedSet.has(card.repo)}
            ignored={dislikedSet.has(card.repo)}
            onOpen={onOpen}
            channel={channel}
            onOpenCreator={onOpenCreator}
          />
        ))}
      </div>
      {win.bottomPad > 0 && (
        <div className="feed-window-pad" style={{ height: win.bottomPad }} aria-hidden="true" />
      )}
      {onEndHint && <div className="section-end-hint">{onEndHint}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 主组件
// ---------------------------------------------------------------------------

export default function App() {
  // 初始 tab 支持 #agent 深链（Agent 接入页可被 llms.txt / 文档指到）
  const [tab, setTabState] = useState<Tab>(() =>
    typeof window !== "undefined" && window.location.hash === "#agent" ? "agent" : "feed",
  );
  const setTab = useCallback((t: Tab) => {
    setTabState(t);
    try {
      history.replaceState(null, "", t === "feed" ? "#" : `#${t}`);
    } catch {
      // 非浏览器/受限环境不报错，仅状态切换
    }
  }, []);
  // 我的页子视图（喜欢/收藏/关注；关注体系在任务书 B）
  const [meView, setMeView] = useState<"liked" | "collections" | "following">("liked");
  const [cards, setCards] = useState<FeedCard[]>([]);
  const cardByRepo = useMemo(() => {
    const map = new Map<string, FeedCard>();
    for (const c of cards) map.set(c.repo, c);
    return map;
  }, [cards]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(loadFeedback);
  // 已点赞集合（供卡片 ❤️ 标记；点赞不重排，仅此集合驱动小图标）
  const likedSet = useMemo(() => new Set(feedback.likes), [feedback.likes]);
  const dislikedSet = useMemo(() => new Set(feedback.dislikes), [feedback.dislikes]);
  // 权重/交互只写 localStorage，不触发重渲染（交互零重排核心：点赞/点踩不重算 sections）
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences);
  const prefsRef = useRef(preferences);
  // 首屏三选一引导（个性化 v2.2 L3 显式偏好）：preferredZone 未设置（首次/未跳过）时显示
  const [showPrefPrompt, setShowPrefPrompt] = useState<boolean>(
    () => preferences.preferredZone === undefined,
  );
  const pickPreferredZone = (zone: string | null) => {
    const next = { ...prefsRef.current, preferredZone: zone, lastUpdateTs: new Date().toISOString() };
    prefsRef.current = next;
    savePreferences(next);
    setPreferences(next);
    setShowPrefPrompt(false);
  };
  const [interactions] = useState<Record<string, InteractionRecord>>(loadInteractions);
  const interactionsRef = useRef(interactions);
  const [collections, setCollections] = useState<Collection[]>(loadCollections);
  // 关注列表（纯前端，localStorage 持久化；只影响关注频道/我的-关注）
  // 2026-09-01 关注解耦：关注集只认本机 localStorage（不再并入 data/following.json，
  // 路人打开关注为空）；2026-09-05：关注频道只认 owner 匹配，bigbros 全出口退役
  const [following, setFollowing] = useState<string[]>(loadFollowing);
  const followingSet = useMemo(() => new Set(following), [following]);
  // 创作者页栈（整页替换式子页面：push 进入更深层级，pop 逐级返回；
  // 栈顶即当前创作者页；pop 到空数组回原 tab 原频道——tab/feedChannel 状态不动）
  const [viewStack, setViewStack] = useState<{ owner: string }[]>([]);
  const currentCreator = viewStack.length > 0 ? viewStack[viewStack.length - 1].owner : null;
  const [seen] = useState<Record<string, number>>(loadSeen);
  const seenRef = useRef(seen);
  const [expandedCols, setExpandedCols] = useState<Record<string, boolean>>({});
  // 二轮 G6：收藏夹展开的卡片网格与主信息流同一条列数反解。多个收藏夹共用同一容器宽
  // （.folder-cards 全宽），列数相同——一个 hook 量「我的页内容区」即可。
  const { cols: folderCols, ref: folderColsRef } = useResponsiveCols(FEED_ROW_GAP);
  const [searchQuery, setSearchQuery] = useState("");
  const [detailCard, setDetailCard] = useState<FeedCard | null>(null);
  const sourceRectRef = useRef<DOMRect | null>(null);
  const sourceElRef = useRef<HTMLElement | null>(null);
  const appBodyRef = useRef<HTMLDivElement>(null);
  const [feedChannel, setFeedChannel] = useState<string>("recommended");
  const [channelEnter, setChannelEnter] = useState(false);
  // 会话随机种子：每次打开应用重新生成——同一次会话内各卡相对顺序稳定（滚动不跳变），
  // 刷新/重开后顺序在相关性骨架内重新洗牌（TikTok 式新鲜感，2026-09-05 拍板：刷新不能每次都一模一样）
  const sessionSeedRef = useRef<number>(Math.floor(Math.random() * 2 ** 31));
  // 搜索结果创作者折叠：默认只展开前 4 位，防几十个创作者把项目卡挤没（2026-09-05）
  const [showAllCreators, setShowAllCreators] = useState(false);
  useEffect(() => {
    setShowAllCreators(false);
  }, [searchQuery]);
  // 移动端频道抽屉开关（<768px 由 ☰ 打开；选中频道或点遮罩关闭，桌面无感）
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDetail = useCallback(() => {
    sourceElRef.current?.classList.remove("is-open-source");
    sourceElRef.current = null;
    setDetailCard(null);
  }, []);

  // 加载 feed.json：同日 IndexedDB 缓存命中 → 缓存文本立即渲染（秒开），后台再拉最新
  // 版本校验，有变化才热替换（2026-09-05 加载提速：数据每天 digest 一次，日内刷新几乎全命中）
  useEffect(() => {
    let cancelled = false;
    const idle = window.requestIdleCallback
      ? (cb: () => void) => window.requestIdleCallback(cb)
      : (cb: () => void) => window.setTimeout(cb, 2000);
    const applyData = (data: FeedCard[]) => {
      setCards((Array.isArray(data) ? data : []).map(normalizeCard));
      setLoading(false);
    };
    const warmDetails = (list: FeedCard[]) => {
      warmFeedDetails();
      idle(() => {
        void prefetchFeedDetails().then((details) => {
          const missing = diffDetailKeys(list, details);
          if (missing.length > 0) {
            console.warn(
              `[feed-details] ${missing.length} 张卡在详情表缺键（深度解读将静默缺失）：${missing.slice(0, 10).join("、")}`,
            );
          }
        });
      });
    };
    (async () => {
      const cachedText = await loadCachedText("feed");
      if (cancelled) return;
      if (cachedText) {
        try {
          const list = JSON.parse(cachedText) as FeedCard[];
          applyData(list);
          warmDetails(list);
        } catch {
          /* 缓存损坏 → 落回网络路径 */
        }
      }
      try {
        const r = await fetch(FEED_URL);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const text = await r.text();
        if (cancelled) return;
        if (text !== cachedText) {
          void saveCachedText("feed", text);
          const list = JSON.parse(text) as FeedCard[];
          applyData(list);
          warmDetails(list);
        }
      } catch (err: unknown) {
        // 缓存已渲染时后台刷新失败静默（旧数据可刷）；无缓存才报错
        if (!cachedText) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Esc 的关闭已移进 CardDetail（四轮 T8②）：Esc / 点 X / 点遮罩 对用户是同一件事
  // 「关掉它回列表」，三条路径必须走同一条退场，否则会被读成「有的地方卡一下」。
  // 溯源：这里原先那条「ESC 立刻关弹窗，不播反向收回」是 b55bca5 描述「当时没有退场动画」的状态，
  // 不是裁决（该提交同时把 setDetailCard(null) 换成了 closeDetail()）。

  // G-14：键盘逐行刷（A11Y-01：此前全站只有 Escape 一个键能用）
  useEffect(() => {
    if (detailCard) return;
    const STEP: Record<string, number> = {
      ArrowDown: 1,
      ArrowUp: -1,
      PageDown: 3,
      PageUp: -3,
      " ": 1,
    };
    const handler = (e: KeyboardEvent) => {
      const rows = STEP[e.key];
      if (!rows || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const body = document.querySelector<HTMLElement>(".app-body");
      const scroller =
        body && isScrollableOverflow(getComputedStyle(body).overflowY)
          ? body
          : (document.scrollingElement as HTMLElement | null);
      if (!scroller) return;
      e.preventDefault();
      scroller.scrollBy({ top: rows * FEED_ROW_HEIGHT, behavior: "auto" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [detailCard]);

  // 反馈操作 — 更新标签权重（只写 localStorage + ref，不触发重渲染）
  const updateTagWeights = useCallback(
    (repos: string[], delta: number) => {
      const tw = { ...prefsRef.current.tagWeights };
      for (const repo of repos) {
        const card = cardByRepo.get(repo);
        if (!card) continue;
        for (const tag of card.tags || []) {
          const factor = tag.source === "llm" ? 1.0 : 0.5;
          tw[tag.name] = Math.max(0.01, Math.min(1.0, (tw[tag.name] ?? 0.15) + delta * factor));
        }
      }
      const next = { tagWeights: tw, lastUpdateTs: new Date().toISOString() };
      prefsRef.current = next;
      savePreferences(next);
    },
    [cardByRepo],
  );

  const handleLike = useCallback(
    (repo: string) => {
      setFeedback((prev) => {
        const likes = prev.likes.includes(repo)
          ? prev.likes.filter((r) => r !== repo)
          : [...prev.likes, repo];
        const dislikes = prev.dislikes.filter((r) => r !== repo);
        // 点赞时留存卡片快照（列表展示不依赖当天数据）；超容量上限则只记 repo 名
        const likedSnapshots = { ...(prev.likedSnapshots ?? {}) };
        if (likes.includes(repo) && !likedSnapshots[repo]) {
          const card = cardByRepo.get(repo);
          if (card && Object.keys(likedSnapshots).length < SNAPSHOT_CAP) {
            likedSnapshots[repo] = card;
          }
        }
        const next = { likes, dislikes, likedSnapshots };
        saveFeedback(next);
        return next;
      });
      // 记录交互（只写 localStorage + ref，不触发重渲染/重排）
      interactionsRef.current = {
        ...interactionsRef.current,
        [repo]: { type: "like" as InteractionType, ts: Date.now() },
      };
      saveInteractions(interactionsRef.current);
      // 权重累加（原逻辑保留），排序在下次页面加载/刷新时生效 —— 不触发 sections 重算
      updateTagWeights([repo], 0.03);
    },
    [updateTagWeights, cardByRepo],
  );

  const handleDislike = useCallback(
    (repo: string) => {
      let addedDislike = false;
      setFeedback((prev) => {
        const undoing = prev.dislikes.includes(repo);
        const dislikes = undoing ? prev.dislikes.filter((r) => r !== repo) : [...prev.dislikes, repo];
        const likes = prev.likes.filter((r) => r !== repo);
        if (undoing) {
          const ints = { ...interactionsRef.current };
          delete ints[repo];
          interactionsRef.current = ints;
        } else {
          addedDislike = true;
          interactionsRef.current = {
            ...interactionsRef.current,
            [repo]: { type: "dislike" as InteractionType, ts: Date.now() },
          };
        }
        saveInteractions(interactionsRef.current);
        const next = { likes, dislikes };
        saveFeedback(next);
        return next;
      });
      if (addedDislike) updateTagWeights([repo], -0.05);
    },
    [updateTagWeights],
  );

  const handleUpdateCollections = useCallback(
    (newCols: Collection[]) => {
      const prevBookmarked = detailCard ? collections.some((c) => c.repos.includes(detailCard.repo)) : false;
      const newBookmarked = detailCard ? newCols.some((c) => c.repos.includes(detailCard.repo)) : false;
      // 收藏时留存卡片快照（收藏夹展示不依赖当天数据；超容量上限则只记 repo 名）
      let colsWithSnapshots = newCols;
      if (detailCard && !prevBookmarked && newBookmarked) {
        colsWithSnapshots = newCols.map((c) => {
          if (!c.repos.includes(detailCard.repo)) return c;
          const snapshots = { ...(c.snapshots ?? {}) };
          if (!snapshots[detailCard.repo] && Object.keys(snapshots).length < SNAPSHOT_CAP) {
            snapshots[detailCard.repo] = detailCard;
          }
          return { ...c, snapshots };
        });
      }
      setCollections(colsWithSnapshots);
      saveCollections(colsWithSnapshots);
      if (detailCard && newBookmarked !== prevBookmarked) {
        updateTagWeights([detailCard.repo], newBookmarked ? 0.05 : -0.05);
      }
    },
    [collections, detailCard, updateTagWeights],
  );

  // 曝光即看过（2026-09-05）：渲染窗口内的卡记 seen 并持久化（idle 节流）。
  // seen 是不可变 state——本会话流不重排，下次刷新这些卡按新鲜度降权（不排除）。
  const handleExpose = useCallback((repos: string[]) => {
    let changed = false;
    for (const repo of repos) {
      if (!seenRef.current[repo]) {
        seenRef.current[repo] = Date.now();
        changed = true;
      }
    }
    if (!changed) return;
    const persist = () => saveSeen(seenRef.current);
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(persist, { timeout: 1500 });
    } else {
      window.setTimeout(persist, 800);
    }
  }, []);

  const handleCreateCollection = useCallback(() => {
    const name = prompt("收藏夹名称：");
    if (!name?.trim()) return;
    const newCol: Collection = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: name.trim(),
      repos: [],
      createdAt: new Date().toISOString(),
      isAuto: false,
    };
    setCollections((prev) => {
      const next = [...prev, newCol];
      saveCollections(next);
      return next;
    });
    setExpandedCols((prev) => ({ ...prev, [newCol.id]: true }));
  }, []);

  const handleDeleteCollection = useCallback((colId: string) => {
    if (!confirm("确定删除这个收藏夹？")) return;
    setCollections((prev) => {
      const next = prev.filter((c) => c.id !== colId);
      saveCollections(next);
      return next;
    });
  }, []);

  const handleRemoveFromCollection = useCallback((colId: string, repo: string) => {
    setCollections((prev) => {
      const next = prev.map((c) => {
        if (c.id !== colId) return c;
        const snapshots = c.snapshots ? { ...c.snapshots } : undefined;
        if (snapshots) delete snapshots[repo];
        return { ...c, repos: c.repos.filter((r) => r !== repo), snapshots };
      });
      saveCollections(next);
      return next;
    });
  }, []);

  const handleOpenDetail = useCallback((card: FeedCard, sourceEl?: HTMLElement) => {
    sourceElRef.current?.classList.remove("is-open-source");
    sourceElRef.current = sourceEl ?? null;
    sourceRectRef.current = sourceEl?.getBoundingClientRect() ?? null;
    sourceEl?.classList.add("is-open-source");
    seenRef.current[card.repo] = Date.now();
    const persistSeen = () => saveSeen(seenRef.current);
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(persistSeen, { timeout: 800 });
    } else {
      window.setTimeout(persistSeen, 500);
    }
    const ready = getFeedDetailsIfReady();
    if (ready) {
      setDetailCard(mergeDetail(card, ready));
      return;
    }
    void prefetchFeedDetails().then((details) => {
      setDetailCard(mergeDetail(card, details));
    });
  }, []);

  // 关注/取关（只影响关注频道与我的-关注，不触发 feed 重排）
  const toggleFollow = useCallback((owner: string) => {
    setFollowing((prev) => {
      const next = prev.includes(owner) ? prev.filter((o) => o !== owner) : [...prev, owner];
      saveFollowing(next);
      return next;
    });
  }, []);

  const openCreator = useCallback(
    (owner: string) => {
      // 关详情弹窗（overlay 与页面栈独立；从弹窗进入创作者页时先收起弹窗）
      closeDetail();
      // push：创作者页内点其他 owner 会叠第二层，返回逐级回退
      setViewStack((prev) => [...prev, { owner }]);
      appBodyRef.current?.scrollTo(0, 0);
    },
    [closeDetail],
  );

  const closeCreator = useCallback(() => {
    setViewStack((prev) => prev.slice(0, -1));
  }, []);

  // === P0b 数据备份/恢复 ===
  const [pendingImport, setPendingImport] = useState<BackupPayload | null>(null);

  /** 选择备份文件 → 解析校验（app/type）→ 弹导入方式选择 */
  const handleImportFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 允许重复选择同一文件
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result ?? "")) as BackupPayload;
        if (!parsed || typeof parsed !== "object" || parsed.app !== "gittok" || parsed.type !== "backup") {
          alert("不是有效的 GitTok 备份文件（app/type 标识校验失败）");
          return;
        }
        setPendingImport(parsed);
      } catch {
        alert("备份文件解析失败：不是有效的 JSON");
      }
    };
    reader.onerror = () => {
      alert("备份文件读取失败");
    };
    reader.readAsText(file);
  }, []);

  /** 执行导入：merge=合并（只并集三个用户数据 key，行为数据忽略）｜restore=完全恢复（先备份当前再覆盖） */
  const applyImport = useCallback(
    (mode: "merge" | "restore") => {
      if (!pendingImport) return;
      const fileKeys = pendingImport.keys ?? {};
      if (mode === "restore") {
        // ① 先把当前 6 个主 key 原文导出到 gittok-backup-<ts>（防误操作）
        const current: Record<string, string> = {};
        for (const k of ALL_STORAGE_KEYS) {
          try {
            const raw = localStorage.getItem(k);
            if (raw !== null) current[k] = raw;
          } catch (e) {
            console.warn(`[gittok-storage] 恢复前导出 ${k} 失败:`, e);
          }
        }
        const ts = new Date().toISOString().replace(/[:.]/g, "-");
        try {
          localStorage.setItem(`gittok-backup-${ts}`, JSON.stringify(current));
        } catch (e) {
          console.warn("[gittok-storage] 导入前备份（gittok-backup）失败:", e);
        }
        // ② 用文件内容覆盖（白名单主 key；文件缺的 key 不动）
        for (const k of ALL_STORAGE_KEYS) {
          if (typeof fileKeys[k] === "string") {
            try {
              localStorage.setItem(k, fileKeys[k]);
            } catch (e) {
              console.warn(`[gittok-storage] 完全恢复写 ${k} 失败:`, e);
            }
          }
        }
        window.location.reload();
        return;
      }
      // 合并导入：只并集 feedback/collections/following；preferences/seen/interactions 忽略（行为数据，合并无意义）
      try {
        const fileFb = JSON.parse(fileKeys[STORAGE_KEY] ?? "null") as Feedback | null;
        if (
          fileFb &&
          typeof fileFb === "object" &&
          Array.isArray(fileFb.likes) &&
          Array.isArray(fileFb.dislikes)
        ) {
          saveFeedback(
            mergeFeedbackData(
              {
                likes: feedback.likes,
                dislikes: feedback.dislikes,
                likedSnapshots: feedback.likedSnapshots ?? {},
              },
              { likes: fileFb.likes, dislikes: fileFb.dislikes, likedSnapshots: fileFb.likedSnapshots ?? {} },
            ),
          );
        } else {
          console.warn("[gittok-storage] 合并导入：feedback 文件数据无效，跳过");
        }
      } catch (e) {
        console.warn("[gittok-storage] 合并导入 feedback 失败:", e);
      }
      try {
        const fileCols = JSON.parse(fileKeys[COLLECTIONS_KEY] ?? "null") as Collection[] | null;
        if (Array.isArray(fileCols)) {
          saveCollections(mergeCollectionsData(collections, fileCols));
        } else {
          console.warn("[gittok-storage] 合并导入：collections 文件数据无效，跳过");
        }
      } catch (e) {
        console.warn("[gittok-storage] 合并导入 collections 失败:", e);
      }
      try {
        const fileFollowing = JSON.parse(fileKeys[FOLLOWING_KEY] ?? "null") as unknown;
        if (Array.isArray(fileFollowing)) {
          const merged = Array.from(
            new Set([...following, ...fileFollowing.filter((o): o is string => typeof o === "string")]),
          );
          saveFollowing(merged);
        } else {
          console.warn("[gittok-storage] 合并导入：following 文件数据无效，跳过");
        }
      } catch (e) {
        console.warn("[gittok-storage] 合并导入 following 失败:", e);
      }
      window.location.reload();
    },
    [pendingImport, feedback, collections, following],
  );

  // 历史数据迁移：feed 加载完成后——
  // 1) 为旧的 likes/收藏（只有 repo 名）补快照：repo 还在当天数据里的自动补上
  // 2) 清理无数据记录：无快照且不在当天数据的（历史遗留无法找回），从列表中移除，避免「N 个喜欢 0 个可展示」
  useEffect(() => {
    if (cards.length === 0) return;
    setFeedback((prev) => {
      let changed = false;
      const likedSnapshots = { ...(prev.likedSnapshots ?? {}) };
      // 1) 补快照
      for (const repo of prev.likes) {
        if (!likedSnapshots[repo] && Object.keys(likedSnapshots).length < SNAPSHOT_CAP) {
          const card = cardByRepo.get(repo);
          if (card) {
            likedSnapshots[repo] = card;
            changed = true;
          }
        }
      }
      // 2) 清理无数据记录（有快照的保留——快照是主要数据源，不依赖当天数据）
      const keptLikes = prev.likes.filter((repo) => likedSnapshots[repo] || cardByRepo.has(repo));
      if (keptLikes.length !== prev.likes.length) changed = true;
      if (!changed) return prev;
      const next = { ...prev, likes: keptLikes, likedSnapshots };
      saveFeedback(next);
      return next;
    });
    setCollections((prev) => {
      let changed = false;
      const next = prev.map((col) => {
        const snapshots = { ...(col.snapshots ?? {}) };
        // 1) 补快照
        for (const repo of col.repos) {
          if (!snapshots[repo] && Object.keys(snapshots).length < SNAPSHOT_CAP) {
            const card = cardByRepo.get(repo);
            if (card) {
              snapshots[repo] = card;
              changed = true;
            }
          }
        }
        // 2) 清理无数据记录
        const keptRepos = col.repos.filter((repo) => snapshots[repo] || cardByRepo.has(repo));
        if (keptRepos.length !== col.repos.length) changed = true;
        return { ...col, repos: keptRepos, snapshots };
      });
      if (!changed) return prev;
      saveCollections(next);
      return next;
    });
  }, [cardByRepo]);

  // 过滤不感兴趣 + 过滤无中文描述的卡片 + 内容淘汰
  const visibleCards = useMemo(() => {
    const withContent = cards.filter((c) => c.reasonCn && c.reasonCn.length > 0);
    if (tab === "search") return withContent;
    return applyFilter(withContent, seen, interactions, collections);
  }, [cards, tab, seen, interactions, collections]);

  // 分区数据：推荐 = 前端个性化生成；其余频道按各自语义排序后套会话洗牌。
  // 新鲜度=温和降权不排除（2026-09-05 四次拍板，策展流理念）：看过的卡乘
  // seenPenaltyOf 平滑衰减（当天 ×0.45/3 天 ×0.65/7 天 ×0.85），自然让位给没看过的，
  // 但仍在流中随时可能回来——推荐/热门/分类乘在抖动骨架上，每日乘在热度分上，关注纯时间序不掺
  // 关注频道豁免空分区过滤：未关注任何人时侧栏仍保留「关注」项，内容区显示引导
  const sections = useMemo(() => {
    const seed = sessionSeedRef.current;
    const now = Date.now();
    const all = ALL_SECTIONS.map((s) => ({
      ...s,
      cards:
        s.key === "recommended"
          ? applyJitter(
              buildRecommended(visibleCards, preferences, seen, interactions, followingSet),
              seed,
              seen,
              now,
              0.2,
            )
          : s.key === "daily" || s.key === "following"
            ? getSectionCards(visibleCards, s.key, followingSet, seen, now, interactions)
            : recapped(
                applyJitter(
                  getSectionCards(visibleCards, s.key, followingSet, seen, now, interactions),
                  seed,
                  seen,
                  now,
                  0.18,
                ),
                s.key,
              ),
    })).filter((s) => s.key === "following" || s.cards.length > 0);
    return all;
  }, [visibleCards, preferences, seen, interactions, followingSet]);

  // 当前频道内容（单频道独立渲染；点踩消失的卡不再渲染）
  const activeSection = useMemo(() => {
    const sec = sections.find((s) => s.key === feedChannel);
    if (!sec || sec.cards.length === 0) return null;
    return sec;
  }, [sections, feedChannel]);

  // 喜欢的卡片（快照优先，其次匹配当天数据；快照缺失且当天数据也没有的——旧记录无法找回）
  const likedCards = useMemo(() => {
    const snapshots = feedback.likedSnapshots ?? {};
    return feedback.likes
      .map((repo) => snapshots[repo] ?? cardByRepo.get(repo))
      .filter((c): c is FeedCard => !!c);
  }, [feedback.likes, feedback.likedSnapshots, cardByRepo]);

  // 搜索结果（加权 AND：多词必须全命中，repo/name/owner 权重优先；owner 命中进创作者组）
  const { results: searchResults, creators: searchCreators } = useMemo(
    () => weightedSearch(visibleCards, searchQuery),
    [visibleCards, searchQuery],
  );

  // 搜索空状态：推荐搜索词 chips（cards 统计 topics 频率 top 12，去重过滤空）
  const topicChips = useMemo(() => {
    const freq = new Map<string, number>();
    for (const c of cards) {
      for (const t of c.topics ?? []) {
        const k = t.trim();
        if (!k) continue;
        freq.set(k, (freq.get(k) ?? 0) + 1);
      }
    }
    return [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([t]) => t);
  }, [cards]);

  // 搜索空状态：热门项目预览（momentum 含 hot，score 降序前 8）
  const hotPreview = useMemo(
    () =>
      cards
        .filter((c) => c.momentum?.includes("hot"))
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .slice(0, 8),
    [cards],
  );
  // 二轮 G6：热门预览与主信息流同一条列数反解（不再是 CSS auto-fill 的另一套口径）
  const { cols: hotCols, ref: hotColsRef } = useResponsiveCols(FEED_ROW_GAP);

  // 创作者页项目列表（栈顶 owner 过滤，score 降序）
  const creatorCards = useMemo(() => {
    if (!currentCreator) return [];
    return cards.filter((c) => c.owner === currentCreator).sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }, [cards, currentCreator]);

  // 我的-关注：关注的创作者（只认本机 localStorage）；count = TA 的项目数
  // （旧 starCount「TA star 过的库内项目」已随 bigbros 全出口退役移除，2026-09-05）
  const followedCreators = useMemo(() => {
    const ownerCount = new Map<string, number>();
    for (const c of cards) {
      ownerCount.set(c.owner, (ownerCount.get(c.owner) ?? 0) + 1);
    }
    return following
      .map((owner) => ({ owner, count: ownerCount.get(owner) ?? 0 }))
      .sort((a, b) => b.count - a.count);
  }, [following, cards]);

  // 频道切换（侧边栏目的地导航，无取消态）
  const switchFeedChannel = useCallback(
    (key: string) => {
      if (key !== feedChannel) setChannelEnter(true);
      setFeedChannel(key);
      appBodyRef.current?.scrollTo(0, 0);
    },
    [feedChannel],
  );

  useEffect(() => {
    if (!channelEnter) return;
    const t = window.setTimeout(() => setChannelEnter(false), 400);
    return () => window.clearTimeout(t);
  }, [channelEnter]);

  const stats = useMemo(
    () => ({
      total: cards.length,
      sections: sections.length,
    }),
    [cards, sections],
  );

  // -----------------------------------------------------------------------
  // 渲染
  // -----------------------------------------------------------------------

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">
            <GitTokLogo />
          </h1>
          <nav className="tabs">
            <button className={`tab${tab === "feed" ? " active" : ""}`} onClick={() => setTab("feed")}>
              <Home size={16} />
              首页
            </button>
            <button className={`tab${tab === "search" ? " active" : ""}`} onClick={() => setTab("search")}>
              <Search size={16} />
              搜索
            </button>
            <button className={`tab${tab === "agent" ? " active" : ""}`} onClick={() => setTab("agent")}>
              <Bot size={16} />
              Agent
            </button>
            <button className={`tab${tab === "me" ? " active" : ""}`} onClick={() => setTab("me")}>
              <User size={16} />
              我的
            </button>
          </nav>
          {/* 移动端频道抽屉开关（桌面 display:none；桌面 grid 第三列自动落位） */}
          <button
            className="drawer-toggle"
            onClick={() => setDrawerOpen(true)}
            aria-label="打开频道"
            title="频道"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div className="app-body" ref={appBodyRef}>
        <main className={`main${tab === "feed" || tab === "me" ? " main-feed" : ""}`}>
          {/* === 创作者页栈：整页替换（feed/我的/搜索全部让位）；返回逐级 pop 后恢复原 tab 原频道 === */}
          {viewStack.length > 0 && currentCreator ? (
            <CreatorPage
              owner={currentCreator}
              projects={creatorCards}
              likedSet={likedSet}
              dislikedSet={dislikedSet}
              isFollowing={followingSet.has(currentCreator)}
              onToggleFollow={toggleFollow}
              onOpen={handleOpenDetail}
              onOpenCreator={openCreator}
              onBack={closeCreator}
            />
          ) : (
            <>
              {/* === Agent 接入 tab（四条路径 / 服务自检 / 三步接入） === */}
              {tab === "agent" && <AgentPage />}

              {/* === 首页 tab === */}
              {tab === "feed" && loading && (
                <div className="status">
                  <div className="spinner" />
                  <p>正在加载好项目…</p>
                </div>
              )}
              {tab === "feed" && error && (
                <div className="status error">
                  <p>
                    <AlertTriangle size={16} className="icon" />
                    加载失败: {error}
                  </p>
                </div>
              )}
              {tab === "feed" && !loading && !error && sections.length === 0 && (
                <div className="status">
                  <p>
                    <Inbox size={16} className="icon" />
                    暂无内容
                  </p>
                </div>
              )}
              {tab === "feed" && !loading && !error && sections.length > 0 && (
                <div className="feed-layout">
                  {/* 左侧边栏：目的地导航（发现组 + 分类组；移动端移入抽屉，桌面保持现状） */}
                  <aside className="sidebar">
                    <ChannelNav sections={sections} activeKey={feedChannel} onPick={switchFeedChannel} />
                  </aside>
                  <div className="feed-content">
                    {showPrefPrompt && feedChannel === "recommended" && (
                      <div className="pref-prompt">
                        <p className="pref-title">想让推荐更懂你？选一个更想看的类别（随时可在设置里改）</p>
                        <div className="pref-options">
                          <button onClick={() => pickPreferredZone(zoneForCategory("ai"))}>
                            <Bot size={16} /> AI
                          </button>
                          <button onClick={() => pickPreferredZone(zoneForCategory("fun"))}>
                            <Gamepad2 size={16} /> 创意
                          </button>
                          <button onClick={() => pickPreferredZone(zoneForCategory("tool"))}>
                            <Wrench size={16} /> 工具
                          </button>
                          <button onClick={() => pickPreferredZone(zoneForCategory("learning"))}>
                            <BookOpen size={16} /> 资源
                          </button>
                        </div>
                        <button className="pref-skip" onClick={() => pickPreferredZone(null)}>
                          先随便看看
                        </button>
                      </div>
                    )}
                    {feedChannel === "following" && !activeSection && (
                      <div className="status">
                        <p>
                          <Heart size={16} className="icon" />
                          还没有关注任何人
                        </p>
                        <p className="hint">
                          去项目卡片上点创作者名即可关注；关注保存在这台浏览器，TA 的项目和 TA star
                          过的库内项目会出现在关注频道
                        </p>
                      </div>
                    )}
                    {activeSection && (
                      <>
                        {/* 频道头：**每个频道都显示**（含推荐）。张数 = 这个频道里真实可看的张数
                            （池子长度），不是本批渲染数——栗子 2026-09-14：「现在都写 60 张会让
                            用户觉得这个频道只有六十张，这是欺骗」。无限滚动 + 真实张数缺一不可。 */}
                        <div className="channel-head">
                          <span className="ch-icon">
                            <SectionIcon icon={activeSection.icon} size={18} />
                          </span>
                          <span className="ch-title">{activeSection.title}</span>
                          <span className="ch-count">
                            共 {activeSection.cards.length} 张 · {activeSection.desc}
                          </span>
                        </div>
                        <FeedVirtualList
                          cards={activeSection.cards}
                          likedSet={likedSet}
                          dislikedSet={dislikedSet}
                          onOpen={handleOpenDetail}
                          channel={feedChannel}
                          onOpenCreator={openCreator}
                          entering={channelEnter}
                          onExpose={handleExpose}
                          onEndHint={`已加载全部 ${activeSection.cards.length} 个项目`}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* === 我的 tab（侧栏式：左侧 喜欢/收藏/关注，右侧内容） === */}
              {tab === "me" && (
                <div className="me-layout">
                  <aside className="sidebar me-sidebar">
                    <div className="side-group-box">
                      <button
                        className={`side-item${meView === "liked" ? " active" : ""}`}
                        onClick={() => setMeView("liked")}
                        aria-label="喜欢"
                        title="喜欢"
                      >
                        <span className="side-icon">
                          <ThumbsUp size={18} />
                        </span>
                        <span className="side-text">喜欢</span>
                      </button>
                      <button
                        className={`side-item${meView === "collections" ? " active" : ""}`}
                        onClick={() => setMeView("collections")}
                        aria-label="收藏"
                        title="收藏"
                      >
                        <span className="side-icon">
                          <Star size={18} />
                        </span>
                        <span className="side-text">收藏</span>
                      </button>
                      <button
                        className={`side-item${meView === "following" ? " active" : ""}`}
                        onClick={() => setMeView("following")}
                        aria-label="关注"
                        title="关注"
                      >
                        <span className="side-icon">
                          <Heart size={18} />
                        </span>
                        <span className="side-text">关注</span>
                      </button>
                    </div>
                  </aside>
                  <div className="me-content feed-content">
                    {/* 移动端我的页子视图标签（桌面隐藏；替代 me-sidebar） */}
                    <div className="me-tabs">
                      <button
                        className={`me-tab${meView === "liked" ? " active" : ""}`}
                        onClick={() => setMeView("liked")}
                      >
                        <ThumbsUp size={15} />
                        喜欢
                      </button>
                      <button
                        className={`me-tab${meView === "collections" ? " active" : ""}`}
                        onClick={() => setMeView("collections")}
                      >
                        <Star size={15} />
                        收藏
                      </button>
                      <button
                        className={`me-tab${meView === "following" ? " active" : ""}`}
                        onClick={() => setMeView("following")}
                      >
                        <Heart size={15} />
                        关注
                      </button>
                    </div>
                    {meView === "liked" && (
                      <>
                        <div className="collections-header">
                          <span className="collections-stats">
                            <ThumbsUp size={14} className="icon" />共 {feedback.likes.length} 个喜欢的项目
                          </span>
                        </div>
                        {likedCards.length === 0 ? (
                          <div className="status">
                            <p>
                              <Inbox size={16} className="icon" />
                              还没有喜欢的项目
                            </p>
                            <p className="hint">在项目详情中点赞即可开始喜欢</p>
                          </div>
                        ) : (
                          <FeedVirtualList
                            cards={likedCards}
                            likedSet={likedSet}
                            dislikedSet={dislikedSet}
                            onOpen={handleOpenDetail}
                            onOpenCreator={openCreator}
                          />
                        )}
                      </>
                    )}

                    {meView === "collections" && (
                      <>
                        <div className="collections-header">
                          <span className="collections-stats">
                            <Folder size={14} className="icon" />共 {collections.length} 个收藏夹 ·{" "}
                            {collections.reduce((sum, c) => sum + c.repos.length, 0)} 个项目
                          </span>
                        </div>

                        {collections.length === 0 && (
                          <div className="status">
                            <p>
                              <Inbox size={16} className="icon" />
                              还没有收藏夹
                            </p>
                            <p className="hint">在项目详情中点击收藏按钮即可收藏</p>
                          </div>
                        )}

                        <div ref={folderColsRef} data-cols-root="folders">
                          {collections.map((col) => {
                          const expanded = expandedCols[col.id] ?? false;
                          const colCards = expanded
                            ? col.repos
                                .map((repo) => col.snapshots?.[repo] ?? cardByRepo.get(repo))
                                .filter((c): c is FeedCard => !!c)
                            : [];
                          return (
                            <div key={col.id} className="collection-folder">
                              <div
                                className="folder-header"
                                onClick={() =>
                                  setExpandedCols((prev) => ({ ...prev, [col.id]: !prev[col.id] }))
                                }
                              >
                                <span className={`folder-chevron${expanded ? " open" : ""}`}>
                                  <ChevronRight size={14} />
                                </span>
                                <span className="folder-icon">
                                  <Folder size={18} />
                                </span>
                                <span className="folder-name">{col.name}</span>
                                <span className="folder-count">({col.repos.length}个)</span>
                                <button
                                  className="folder-delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCollection(col.id);
                                  }}
                                  title="删除收藏夹"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              {expanded && (
                                <div className="folder-cards">
                                  {colCards.length === 0 && (
                                    <p className="folder-empty">暂未匹配到项目卡片（数据可能已更新）</p>
                                  )}
                                  {colCards.length > 0 && (
                                    <div
                                      className="feed-list"
                                      data-cols={folderCols}
                                      style={{ "--feed-cols": folderCols } as React.CSSProperties}
                                      data-cols-root="folder"
                                    >
                                      {colCards.map((card) => (
                                        <div key={card.repo} className="folder-card-wrapper">
                                          <FeedCardMemo
                                            card={card}
                                            liked={feedback.likes.includes(card.repo)}
                                            ignored={dislikedSet.has(card.repo)}
                                            onOpen={handleOpenDetail}
                                            onOpenCreator={openCreator}
                                          />
                                          <button
                                            className="folder-card-remove"
                                            onClick={() => handleRemoveFromCollection(col.id, card.repo)}
                                            title="移出收藏夹"
                                          >
                                            <X size={16} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        </div>

                        <button className="collection-create-btn" onClick={handleCreateCollection}>
                          + 新建收藏夹
                        </button>
                      </>
                    )}

                    {meView === "following" && (
                      <>
                        <div className="collections-header">
                          <span className="collections-stats">
                            <Heart size={14} className="icon" />共 {following.length} 位关注的创作者
                          </span>
                        </div>
                        {following.length === 0 ? (
                          <div className="status">
                            <p>还没有关注任何人</p>
                            <p className="hint">
                              去项目卡片上点创作者名即可关注；关注保存在这台浏览器，TA
                              之后的新项目会出现在关注频道
                            </p>
                          </div>
                        ) : (
                          <div className="creator-list">
                            {followedCreators.map(({ owner, count }) => (
                              <div
                                key={owner}
                                className="creator-item"
                                title={`查看 ${owner} 的创作者页`}
                                onClick={() => openCreator(owner)}
                              >
                                <GithubAvatar owner={owner} size={56} className="creator-item-avatar" />
                                <span className="creator-item-name">{owner}</span>
                                <span className="creator-item-count">{count} 个项目</span>
                                <a
                                  className="creator-item-github"
                                  href={`https://github.com/${owner}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="GitHub 主页"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={16} />
                                </a>
                                <button
                                  className="creator-item-unfollow"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFollow(owner);
                                  }}
                                >
                                  <UserMinus size={14} />
                                  取关
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {/* === P0b 数据备份/恢复工具区 === */}
                    <div className="storage-tools">
                      <div className="storage-tools-header">
                        <span className="storage-tools-title">数据备份</span>
                      </div>
                      <p className="storage-tools-hint">
                        收藏 / 点赞 /
                        关注数据保存在本浏览器。换浏览器或清理缓存前先备份；「恢复数据」可把备份迁移到新设备。
                      </p>
                      <div className="storage-tools-buttons">
                        <button className="storage-tool-btn" onClick={exportBackup}>
                          备份数据
                        </button>
                        <label className="storage-tool-btn storage-tool-btn-secondary">
                          恢复数据
                          <input
                            type="file"
                            accept="application/json,.json"
                            className="storage-tool-file-input"
                            onChange={handleImportFile}
                          />
                        </label>
                      </div>
                      {pendingImport && (
                        <div className="storage-import-panel">
                          <p className="storage-import-info">
                            已读取备份文件
                            {pendingImport.exportedAt ? `（导出时间 ${pendingImport.exportedAt}）` : ""}
                            ，请选择导入方式：
                          </p>
                          <div className="storage-import-actions">
                            <button className="storage-tool-btn" onClick={() => applyImport("merge")}>
                              合并导入（默认）
                            </button>
                            <button
                              className="storage-tool-btn storage-tool-btn-danger"
                              onClick={() => applyImport("restore")}
                            >
                              完全恢复
                            </button>
                            <button
                              className="storage-tool-btn storage-tool-btn-ghost"
                              onClick={() => setPendingImport(null)}
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* === 搜索 tab === */}
              {tab === "search" && (
                <>
                  <div className="search-bar">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="搜项目名、描述、标签…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    {/* 二轮 G6：搜索空态的热门预览套进与主信息流**同一个内容容器**
                        （.feed-content 同宽）——同视口下预览与主信息流的列数/卡宽从机制上一致，
                        而不是「同一规则、不同容器宽」的貌合神离（预览容器没有侧栏，1600 档会多出一列）。 */}
                    {searchQuery && (
                      <button className="search-clear" onClick={() => setSearchQuery("")}>
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* 空状态：推荐搜索词 + 分类直达 + 热门项目预览（G6：与主信息流同一内容容器与内距口径） */}
                  {!searchQuery && (
                    <div className="search-empty search-empty-unified">
                      <div className="search-chips">
                        <div className="search-empty-title">试试搜索</div>
                        <div className="chip-row">
                          {topicChips.map((t) => (
                            <button key={t} className="search-chip" onClick={() => setSearchQuery(t)}>
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="search-cats">
                        <div className="search-empty-title">分类直达</div>
                        <div className="cat-row">
                          {CATEGORY_SECTIONS.map((s) => (
                            <button
                              key={s.key}
                              className="search-cat"
                              onClick={() => {
                                setTab("feed");
                                switchFeedChannel(s.key);
                              }}
                            >
                              <span className="cat-icon">
                                <SectionIcon icon={s.icon} size={18} />
                              </span>
                              <span className="cat-text">{s.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="search-hot">
                        <div className="search-empty-title">热门项目</div>
                        <div
                          className="feed-list"
                          ref={hotColsRef}
                          data-cols={hotCols}
                          style={{ "--feed-cols": hotCols } as React.CSSProperties}
                        >
                          {hotPreview.map((card) => (
                            <FeedCardMemo
                              key={card.repo}
                              card={card}
                              liked={feedback.likes.includes(card.repo)}
                              ignored={dislikedSet.has(card.repo)}
                              onOpen={handleOpenDetail}
                              onOpenCreator={openCreator}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 创作者分组（结果顶部；默认只展开前 4 位防霸屏，点卡片打开创作者页） */}
                  {searchQuery && searchCreators.length > 0 && (
                    <div className="search-creators">
                      <div className="search-group-title">创作者</div>
                      <div className="creator-list">
                        {(showAllCreators ? searchCreators : searchCreators.slice(0, 4)).map(
                          ({ owner, count }) => (
                            <div
                              key={owner}
                              className="creator-item"
                              title={`查看 ${owner} 的创作者页`}
                              onClick={() => openCreator(owner)}
                            >
                              <GithubAvatar owner={owner} size={56} className="creator-item-avatar" />
                              <span className="creator-item-name">{owner}</span>
                              <span className="creator-item-count">{count} 个项目</span>
                            </div>
                          ),
                        )}
                      </div>
                      {searchCreators.length > 4 && (
                        <button className="creator-toggle" onClick={() => setShowAllCreators((v) => !v)}>
                          {showAllCreators ? "收起创作者" : `展开其余 ${searchCreators.length - 4} 位创作者`}
                        </button>
                      )}
                    </div>
                  )}

                  {/* 项目分组 */}
                  {searchQuery && searchResults.length > 0 && (
                    <>
                      <div className="search-group-title">项目</div>
                      <FeedVirtualList
                        cards={searchResults}
                        likedSet={likedSet}
                        dislikedSet={dislikedSet}
                        onOpen={handleOpenDetail}
                        onOpenCreator={openCreator}
                      />
                    </>
                  )}

                  {searchQuery && searchResults.length === 0 && searchCreators.length === 0 && (
                    <div className="status">
                      <p>
                        <Search size={16} className="icon" />
                        没搜到，换个关键词试试？
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>

        <footer className="footer">
          <span>
            {stats.total} 个项目 · {stats.sections} 个分区 ·{" "}
          </span>
          <span>
            <ThumbsUp size={14} className="icon" /> {feedback.likes.length} ·{" "}
            <ThumbsDown size={14} className="icon" /> {feedback.dislikes.length}
          </span>
        </footer>
      </div>

      {/* 移动端频道抽屉（<768px；☰ 打开，选中频道或点遮罩关闭；桌面 display:none） */}
      {drawerOpen && <div className="drawer-mask" onClick={() => setDrawerOpen(false)} />}
      <div className={`drawer${drawerOpen ? " open" : ""}`}>
        <ChannelNav
          sections={sections}
          activeKey={feedChannel}
          onPick={(key) => {
            switchFeedChannel(key);
            setDrawerOpen(false);
          }}
        />
      </div>

      {/* 移动端底部导航（<768px；首页/搜索/我的，替代顶栏 tabs） */}
      <nav className="bottom-bar">
        <button className={`bottom-item${tab === "feed" ? " active" : ""}`} onClick={() => setTab("feed")}>
          <Home size={18} />
          <span>首页</span>
        </button>
        <button
          className={`bottom-item${tab === "search" ? " active" : ""}`}
          onClick={() => setTab("search")}
        >
          <Search size={18} />
          <span>搜索</span>
        </button>
        <button className={`bottom-item${tab === "agent" ? " active" : ""}`} onClick={() => setTab("agent")}>
          <Bot size={18} />
          <span>Agent</span>
        </button>
        <button className={`bottom-item${tab === "me" ? " active" : ""}`} onClick={() => setTab("me")}>
          <User size={18} />
          <span>我的</span>
        </button>
      </nav>

      {/* 详情弹窗 */}
      {detailCard && (
        <CardDetail
          key={detailCard.repo}
          card={detailCard}
          liked={feedback.likes.includes(detailCard.repo)}
          disliked={feedback.dislikes.includes(detailCard.repo)}
          collections={collections}
          sourceRect={sourceRectRef.current}
          sourceEl={sourceElRef.current}
          onLike={handleLike}
          onDislike={handleDislike}
          onUpdateCollections={handleUpdateCollections}
          onClose={closeDetail}
          onOpenCreator={openCreator}
        />
      )}
    </div>
  );
}
