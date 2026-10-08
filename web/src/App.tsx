import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import type { ChangeEvent } from "react";
import type { FeedCard, Collection } from "./types.ts";
import { FeedCardMemo, CardDetail, GithubAvatar } from "./FeedCard.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { CreatorPage } from "./CreatorPage.tsx";
import { AgentPage } from "./AgentPage.tsx";
import { weightedSearch } from "./search.ts";
import { loadSafe, saveDual, migrateLegacyKeys } from "./storage.ts";
import { withRepoDetail, resolveRepoDetail, getRepoDetailIfReady } from "./feed-payload.ts";
import { loadCachedText, saveCachedText } from "./feed-cache.ts";
import {
  FEED_GRID_REF,
  FEED_MOBILE_MAX_WIDTH,
  feedCardShapeFor,
  feedColsForContentWidth,
  feedGridFromMatch,
  feedTierMetricsFor,
  feedViewportOf,
  feedColWindowFromPrefix,
  buildColumnIndex,
  estCardHeightFor,
  sameColWindows,
  isScrollableOverflow,
  nearestScrollRoot,
  type FeedCardShape,
  type FeedColWindow,
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
/** 冻结式头片（二十二-0，2026-10-07）：冷启动先载它即时渲染推荐频道。
 *  构建期生成（vite prepareFeedPlugin），与全量同一份排序实现（recommend-baseline），
 *  gzip ≈107KB（预算 110KB，head-freeze 闸锁）。放 data/ 下 = SW 一律放行（S4 纪律）。 */
const HEAD_URL = "./data/feed-head.json";
/** 头片 TTFB 闸比主源紧：它是加速件，3s 拿不到就静默退回「等全量」的旧行为，
 *  不许拖慢全量的起跑。 */
const HEAD_TTFB_TIMEOUT_MS = 3000;
// ── 多源 fallback（二十一轮 N4④，2026-10-06 实测定案）──
// 主源=站点域名（GitHub Pages）。N4 的「有时候特别慢」直源之一是 Pages 路径偶发滞留
//（二十轮实测一次 33s 级全同域滞留）。备源=jsDelivr 仓库镜像（全球 CDN，国内可达性好）：
// 它服务的是仓库原文件 data/feed.json，带 detailCn 与构建期死字段（实测 14.2MB dec / 3.66MB
// gzip enc），所以 fallback 命中后必须 canonicalize 成站点规范形再渲染/入同日缓存，
// 否则 IDB「feed」缓存会被 3 倍大文本污染、且 revalidate 每次都判不等热替换。
const FEED_FALLBACK_URLS = [
  "https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/data/feed.json",
] as const;
/** 主源只看 TTFB 的闸：8s 还没等到响应头＝滞留（N4 的 33s 卡死形态），切备源。
 *  响应头到了就不再掐——慢网（Slow-3G 1.38MB≈27s）的正文下载必须让它跑完。 */
const FEED_TTFB_TIMEOUT_MS = 8000;

/** 取文本，TTFB 超时即断（正文不限时）。失败抛错由调用方走下一源。 */
async function fetchFeedText(url: string, ttfbTimeoutMs: number = FEED_TTFB_TIMEOUT_MS): Promise<string> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), ttfbTimeoutMs);
  try {
    const r = await fetch(url, { signal: ac.signal });
    clearTimeout(timer);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  } catch (err: unknown) {
    clearTimeout(timer);
    throw err;
  }
}

/** jsDelivr 原始 feed.json → 站点规范形（剔 detailCn 与构建期死字段，vite prepareFeedPlugin 同口径）。 */
function canonicalizeFallbackFeed(text: string): string {
  const cards = JSON.parse(text) as Array<Record<string, unknown>>;
  const DEAD_FIELDS = [
    "detailCn",
    "bigbros",
    "aiDim",
    "score",
    "funDims",
    "facts",
    "zoneReason",
    "funReason",
    "funScoreSource",
    "zoneSource",
    "legacyZone",
    "legacyFunScore",
  ];
  for (const c of cards) for (const f of DEAD_FIELDS) delete c[f];
  return JSON.stringify(cards);
}
const STORAGE_KEY = "gittok-feedback";
/** 二十二-2 点击路径取数失败的重试参数：3 次退避（1.5s 间隔 ≈4.5s 覆盖窗），
 *  重试耗尽保持占位（用户关掉重开=新的一次尝试）；「暂无」只属于确认缺失。 */
const DETAIL_RETRY_ATTEMPTS = 3;
const DETAIL_RETRY_DELAY_MS = 1500;
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
import { useIdleDetailPrefetch } from "./use-idle-prefetch.ts";
import {
  buildRecommended as buildRecommendedBaseline,
  seenPenaltyOf as seenPenaltyBaseline,
} from "./recommend-baseline.ts";
import {
  DYNAMIC_SECTIONS,
  CATEGORY_SECTIONS,
  ALL_SECTIONS,
  categoryOfKey,
  sectionZoneOf,
  zoneForCategory,
  assertUniqueChannelKeys,
} from "./channels-axes.ts";
// 频道价值函数 / 容量 / 配额：**唯一定义源**在服务端 src/feed/channel-policy.ts，前后端共用。
// 起因（栗子 L8）：v2.2 前后端各写一份，且各自硬编码 60 → 热门池 418 张只展示 60、
// 全库 2477 张任一频道最多看到 2.4%。这里只 import，不再复制任何一份。
// （推荐频道排序本体二十二代起在 recommend-baseline.ts，同样共用一份。）
import {
  hotChannel,
  dailyChannel,
  funChannel,
  followingChannel,
  categoryChannel,
  interleaveByCap,
  aiCapCaps,
  funCaps,
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
 * （实现在 recommend-baseline.ts，与构建期头片共用一份——二十二代起不许再出现两套排序。）
 */
const seenPenaltyOf = seenPenaltyBaseline;

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
// 二十二代起实现本体在 recommend-baseline.ts（构建期头片与运行时共用一份排序，
// 防「前后端两套排序」的 L8 事故复刻）；这里只留传 now 的薄包装。
// ---------------------------------------------------------------------------

function buildRecommended(
  cards: FeedCard[],
  preferences: Preferences,
  seen: Record<string, number>,
  interactions: Record<string, InteractionRecord>,
  followingSet: ReadonlySet<string> = new Set(),
  now: number = Date.now(),
): FeedCard[] {
  return buildRecommendedBaseline(cards, preferences, seen, interactions, followingSet, now);
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
function useResponsiveCols(): {
  ref: (el: HTMLElement | null) => void;
  cols: number;
  shape: FeedCardShape;
} {
  const mobile = useIsMobile();
  const { rowGap, chrome } = feedTierMetricsFor(mobile);
  const elRef = useRef<HTMLElement | null>(null);
  const [cols, setCols] = useState(1);
  // 八轮：形态与列数**同一次测量**里算出来，一起写进 CSS 变量。
  // 九轮：手机档（≤768）也走同一条反推（chrome 61），不再有「按设计收窄」那支。
  // 十二轮：形态只剩（卡宽/摘要字号/标签槽位）——卡高＝内容自然高度，不再由算式产出。
  const [shape, setShape] = useState<FeedCardShape>(() => feedCardShapeFor(0, 1, rowGap, chrome));
  // 条件渲染下（搜索空态/收藏夹展开只在特定视图存在），ref 挂上时 effect 已经跑过了——
  // 所以 ref callback 里直接触发首次测量，不能指望 effect。
  const measureRef = useRef<() => void>(() => {});
  useEffect(() => {
    measureRef.current = () => {
      const el = elRef.current;
      if (!el) return;
      const list = el.querySelector<HTMLElement>(".feed-list") ?? el;
      const w = list.clientWidth;
      const next = feedColsForContentWidth(w, rowGap);
      setCols(next);
      setShape((prev) => {
        const nextShape = feedCardShapeFor(w, next, rowGap, chrome);
        // 形状逐字段相等就还旧引用：setShape 每次都给新对象 = 永不 bail = 重渲染风暴
        //（搜索空态实测打出 React #185 整树卸载白屏，见本 hook 尾注）。
        return shallowEqShape(prev, nextShape) ? prev : nextShape;
      });
    };
    measureRef.current();
    const ro = new ResizeObserver(() => measureRef.current());
    if (elRef.current) ro.observe(elRef.current);
    const roRef = ro;
    return () => roRef.disconnect();
  }, [rowGap, chrome]);
  // ⭐ 二十轮实修（2026-10-06，线上旧 bundle 同样复现的既有生产 bug）：ref 必须 **useCallback 稳定**。
  // 旧实现每渲染返回一个新箭头 → React 每渲染 detach/reattach → 重挂即 measure → setShape(新对象)
  // → 再渲染 → 再重挂……在内联渲染的子树（搜索空态 `.search-empty-unified`）里这就是死循环，
  // 打满嵌套更新上限后 React #185 把整棵 App 卸掉（现象：点开「搜索」页整页白屏）。
  // 主信息流此前不炸只是因为它的 ref 消费者被 memo 挡住了——同一颗雷埋在全站任何内联消费者脚下。
  const ref = useCallback((el: HTMLElement | null) => {
    elRef.current = el;
    if (el) measureRef.current();
  }, []);
  return { cols, shape, ref };
}

/** FeedCardShape 逐字段相等（防 setShape 新对象风暴的 bail 判据；字段集与 feed-layout 对齐）。 */
function shallowEqShape(a: FeedCardShape, b: FeedCardShape): boolean {
  return a.cardWidth === b.cardWidth && a.summaryFontPx === b.summaryFontPx && a.tagSlots === b.tagSlots;
}

/** 手机档（≤768）的**唯一**真源：列数、行距、chrome、理由行数上限都吃它。
 *  八轮那版还在 FeedVirtualList 里自己 matchMedia 一次、secondary 列表另按 FEED_ROW_GAP 算——
 *  九轮手机档纳入自适应后，那两处会各算出一套形态（chrome 差 8px ⇒ 摘要行数/卡高都不同）。 */
function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(`(max-width: ${FEED_MOBILE_MAX_WIDTH}px)`).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${FEED_MOBILE_MAX_WIDTH}px)`);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

function useFeedGrid() {
  const mobile = useIsMobile();
  // 十二轮：窄高档（≤560）的「卡高压 210」特例随定高一并退场——自然高度本身就是该档的正确值。
  return { ...feedGridFromMatch(mobile), mobile };
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

/** 十一轮：把「会不会改变渲染」折成一个签名——resize 的 RO 每 tick 都跑 measure，
 *  签名不变就不再 setState（防全量重渲风暴）。十二轮：卡高/行数退场（自然高度），
 *  签名只剩卡宽取整/标签槽位/摘要字号。 */
function feedShapeSig(s: { cardWidth: number; tagSlots: number; summaryFontPx: number }): string {
  return `${Math.round(s.cardWidth)}|${s.tagSlots}|${s.summaryFontPx.toFixed(2)}`;
}

const EMPTY_COL_WIN: FeedColWindow = { startIdx: 0, endIdx: 0, topPad: 0, bottomPad: 0 };

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
  const { cols: gridCols, rowGap, mobile } = useFeedGrid();
  // 档位常数（chrome）与列数同源：手机档换一套几何常数（见 feedTierMetricsFor）。
  const { chrome } = feedTierMetricsFor(mobile);
  const wrapRef = useRef<HTMLDivElement>(null);
  // 十一轮：形态签名缓存——resize 的 RO 每 tick 都跑 measure，签名不变就不再 setState
  //（渲染宽由 CSS 列宽算式天然跟手；state 只在卡宽/槽位/字号真变时更新）。
  const shapeSigRef = useRef("");
  // G-10 / 2026-09-23 第四版：列数是**单一真源**——由本组件量出网格可用宽、按 feedColsForContentWidth
  // 反解（规则见 feed-layout.ts：卡宽落在 [460, 793]），然后同时喂给两处：
  // ① CSS 变量 `--feed-cols`（.feed-list 的列宽算式）② 瀑布流入列（i%K）。
  // 二轮甲2/乙1（2026-09-23）：首帧列数**初值直接由视口宽按同一套门槛算出**——
  // 可用宽 ≈ 视口 − 侧栏(216) − 内距(48) − 滚动条槽(8)。
  // ── 2026-09-24 四轮 T3：offset 的分档**必须跟着形态走**（历史：76 是已删 icon-rail 的缩进）──
  // ── 八轮（2026-09-25）：形态与列数**同源同帧**（列数规则见 feed-layout.ts 注释）──
  // ── 九轮（2026-09-25 第二轮）：**手机档也走同一算式**（首帧估算给值，防「首帧画错再跳」）──
  // ── 十轮 T1：offset 收正为 272；门槛移到网格 936 后 8px 误差会闪变，实测定案 ──
  const [contentW, setContentW] = useState(() =>
    typeof window === "undefined"
      ? 0
      : window.innerWidth <= FEED_MOBILE_MAX_WIDTH
        ? Math.max(0, window.innerWidth - 32)
        : Math.min(window.innerWidth - 272, FEED_GRID_REF),
  );
  const [cols, setCols] = useState(() => {
    if (typeof window === "undefined") return gridCols;
    const vw = window.innerWidth;
    if (vw <= FEED_MOBILE_MAX_WIDTH) return 1;
    return feedColsForContentWidth(Math.min(vw - 272, FEED_GRID_REF), rowGap);
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
      const w = list.clientWidth;
      const next = feedColsForContentWidth(w, rowGap);
      // 形态与列数同源同帧：网格宽 + 列数 ⇒ {卡宽, 摘要字号, 标签槽位}。
      // ── 2026-09-30（十一轮）：形态签名不变就不再 setState（防 resize 重渲风暴）──
      const sig = feedShapeSig(feedCardShapeFor(w, next, rowGap, chrome));
      if (sig === shapeSigRef.current) return;
      shapeSigRef.current = sig;
      setContentW(w);
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
  }, [rowGap, chrome]);
  // 列数落进 DOM 后的同一帧：用上一步量的旧矩形做 FLIP 补差（Last→Invert→Play）。
  useLayoutEffect(() => {
    const before = beforeRef.current;
    beforeRef.current = null;
    if (!before || reducedMotionRef.current) return;
    const wrap = wrapRef.current;
    if (wrap) playCardsFlip(flipRoot(wrap), before);
  });
  // ── 十二轮：列式瀑布流（Chrome 153 无 grid masonry ⇒ JS 列式）──────────────────
  // 档内形态（唯一读法）：网格宽 + 列数 ⇒ 卡宽/摘要字号/标签槽位。卡高＝内容自然高度。
  const shape = useMemo(
    () => feedCardShapeFor(contentW, cols, rowGap, chrome),
    [contentW, cols, rowGap, chrome],
  );
  const cardWidth = shape.cardWidth;
  // 高度缓存：渲染后实测回填（键=repo）。⭐ 十三轮改「**缩放**」不「清空」：
  //   旧版在卡宽代际切换时把整个缓存清掉 ⇒ 宽度拖动的每一 tick 都要先按**估算**渲染一帧
  //   （垫片偏差 = 视口上方各卡的估算误差累加，十几 px 级）再被实测拉回——两次渲染两次跳，
  //   正是栗子「拖动卡顿闪现」的机制之一。现在：代际切换时把每条实测高度按
  //   `est(新宽)/est(旧宽)` 等比缩放（估算器对同一张卡是可复算纯函数），垫片在切换帧
  //   就近乎正确（缩放残差 = 估算模型的非线性误差，个位 px），随后实测回填收敛。
  interface MeasuredEntry {
    h: number;
    est: number;
  }
  const measuredRef = useRef(new Map<string, MeasuredEntry>());
  const measuredGenRef = useRef(-1);
  const [heightGen, setHeightGen] = useState(0);
  // repo → card 查找表（缩放回填用；cards 换批才重建）。
  const cardByRepoLocal = useMemo(() => new Map(cards.map((c) => [c.repo, c])), [cards]);
  if (measuredGenRef.current !== Math.round(cardWidth)) {
    if (measuredGenRef.current > 0) {
      for (const [repo, entry] of measuredRef.current) {
        const card = cardByRepoLocal.get(repo);
        if (!card) continue;
        const estNew = estCardHeightFor(
          { summary: card.summaryCn ?? "", reason: card.reasonCn ?? "" },
          cardWidth,
          chrome,
        );
        if (entry.est > 0 && estNew > 0) {
          entry.h = Math.max(80, (entry.h / entry.est) * estNew);
          entry.est = estNew;
        }
      }
    }
    measuredGenRef.current = Math.round(cardWidth);
  }
  // 列式布局：i%K 轮转入列（近序性：卡 i+1 不会跑到卡 i 上方远处）+ 列内前缀和
  //（测量优先、estCardHeightFor 估算兜底；heightGen bump = 实测回填 ⇒ 前缀重算）。
  const layout = useMemo(() => {
    const colIdx = buildColumnIndex(cards.length, cols);
    const cache = measuredRef.current;
    const prefix = colIdx.map((idxs) => {
      const p = new Array<number>(idxs.length + 1);
      p[0] = 0;
      for (let k = 0; k < idxs.length; k++) {
        const card = cards[idxs[k]];
        const entry = cache.get(card.repo);
        const h =
          entry?.h ??
          estCardHeightFor({ summary: card.summaryCn ?? "", reason: card.reasonCn ?? "" }, cardWidth, chrome);
        p[k + 1] = p[k] + h + rowGap;
      }
      return p;
    });
    return { colIdx, prefix };
    // measuredRef/heightGen 故意不进 deps：cache 在 ref 里，heightGen 变化即重算（见下）。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, cols, cardWidth, chrome, rowGap, heightGen]);
  const listKey = `${channel ?? ""}:${cards[0]?.repo ?? ""}:${cards.length}:${cols}:${rowGap}:${Math.round(cardWidth)}`;
  const [winKey, setWinKey] = useState(listKey);
  const initWin = () =>
    layout.prefix.map((p) =>
      feedColWindowFromPrefix(p, 0, typeof window !== "undefined" ? window.innerHeight : 900),
    );
  const [win, setWin] = useState<FeedColWindow[]>(initWin);
  if (winKey !== listKey) {
    // 数据/频道/列数/卡宽变了：窗口按新布局重置（滚动位置由调用方复位）。
    setWinKey(listKey);
    setWin(initWin());
  }
  // 滚动/resize → 每列对前缀和二分出窗口（overscan ≈3 屏）。
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const root = nearestScrollRoot(el);
    const update = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const { listTop, viewportHeight } = feedViewportOf(wrap, root);
      const viewTop = -listTop;
      const next = layout.prefix.map((p) => feedColWindowFromPrefix(p, viewTop, viewTop + viewportHeight));
      setWin((prev) => (sameColWindows(prev, next) ? prev : next));
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
  }, [layout, listKey]);
  // ── 实测回填 + 滚动锚定（绘制前完成，肉眼无跳）────────────────────────────────
  // 每次渲染后读每张在 DOM 的卡的真实盒高；与缓存差 >0.5px 就回填并 bump heightGen。
  // 回填会改列内前缀（尤其视口上方的卡从估算换实测）⇒ 先记「视口顶压住的那张卡」为锚，
  // 下一帧用锚点新旧顶偏移的差值补偿 scrollTop。
  // ⚠ 补偿只服务「同一布局代际内的估算→实测收敛」。代际＝卡宽×列数（measuredGen×cols）：
  //   列数翻转/宽度换档时布局**合法重排**（卡片换列、位置按新算式落位），视口稳定由 FLIP
  //   逐卡补差负责，**不许**再动 scrollTop——否则翻转帧整个视口被平移一次（CI drag 闸
  //   「首卡 top 跳变 26px」的根因，2026-10-01 修：锚点带代际签名，跨代不补偿）。
  const anchorRef = useRef<{ repo: string; top: number; gen: string } | null>(null);
  const layoutGen = `${measuredGenRef.current}x${cols}`;
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    // ① 补偿上一轮回填造成的位移（仅同代际；跨代际＝翻版重排，跳过）。
    const anchor = anchorRef.current;
    if (anchor) {
      anchorRef.current = null;
      if (anchor.gen === layoutGen) {
        let newTop: number | null = null;
        outer: for (let c = 0; c < layout.colIdx.length; c++) {
          const idxs = layout.colIdx[c];
          for (let k = 0; k < idxs.length; k++) {
            if (cards[idxs[k]].repo === anchor.repo) {
              newTop = layout.prefix[c][k];
              break outer;
            }
          }
        }
        if (newTop !== null) {
          const delta = newTop - anchor.top;
          if (Math.abs(delta) >= 0.5) {
            const root = nearestScrollRoot(wrap);
            if (root instanceof Window) window.scrollBy(0, delta);
            else root.scrollTop += delta;
          }
        }
      }
    }
    // ② 量本帧所有在 DOM 的卡（连同当时的估算值一起存，宽度代际切换时按比例缩放）。
    const els = wrap.querySelectorAll<HTMLElement>(".feed-list > .feed-col > .card");
    let changed = false;
    for (const el of els) {
      const repo = el.dataset.repo;
      if (!repo) continue;
      const h = el.getBoundingClientRect().height;
      const card = cardByRepoLocal.get(repo);
      const est = card
        ? estCardHeightFor({ summary: card.summaryCn ?? "", reason: card.reasonCn ?? "" }, cardWidth, chrome)
        : h;
      const prev = measuredRef.current.get(repo);
      if (prev === undefined || Math.abs(prev.h - h) > 0.5 || Math.abs(prev.est - est) > 0.5) {
        measuredRef.current.set(repo, { h, est });
        changed = true;
      }
    }
    if (!changed) return;
    // ③ 记锚卡（各列最后一张顶边 ≤ 视口顶的卡里，顶偏移最大者＝最贴近视口顶）再 bump。
    const root = nearestScrollRoot(wrap);
    const { listTop } = feedViewportOf(wrap, root);
    const viewTop = -listTop;
    let best: { repo: string; top: number; gen: string } | null = null;
    for (let c = 0; c < layout.colIdx.length; c++) {
      const p = layout.prefix[c];
      const n = p.length - 1;
      if (n <= 0) continue;
      let lo = 0;
      let hi = n - 1;
      let pos = 0;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if ((p[mid] ?? 0) <= viewTop) {
          pos = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }
      const idx = layout.colIdx[c][pos];
      if (idx === undefined) continue;
      const cand = { repo: cards[idx].repo, top: p[pos], gen: layoutGen };
      if (!best || cand.top > best.top) best = cand;
    }
    if (best) anchorRef.current = best;
    setHeightGen((g) => g + 1);
  });
  // 数据换了：清掉不在新数据里的缓存条目（防长会话内存涨）。
  useEffect(() => {
    const keep = new Set(cards.map((c) => c.repo));
    const m = measuredRef.current;
    for (const key of Array.from(m.keys())) if (!keep.has(key)) m.delete(key);
  }, [cards]);

  const visibleWin = layout.colIdx.map((_, c) => win[c] ?? EMPTY_COL_WIN);
  // 窗口内卡的并集（列内切片按列游走，rank 序 = 各列拼起来排序）。
  const visibleIdx: number[] = [];
  layout.colIdx.forEach((idxs, c) => {
    const w = visibleWin[c];
    for (const idx of idxs.slice(w.startIdx, w.endIdx)) visibleIdx.push(idx);
  });
  visibleIdx.sort((a, b) => a - b);

  // 曝光即看过：渲染窗口内的卡上报父组件记 seen（降权依据）。
  // key=窗口位次+频道+首卡：滚动/切频道/数据变化时增量触发，不依赖 onExpose 引用稳定。
  const exposedKey = `${listKey}:${visibleWin.map((w) => `${w.startIdx}:${w.endIdx}`).join("|")}`;
  const onExposeRef = useRef(onExpose);
  onExposeRef.current = onExpose;
  useEffect(() => {
    if (!onExposeRef.current || visibleIdx.length === 0) return;
    onExposeRef.current(visibleIdx.map((idx) => cards[idx].repo));
    // visibleIdx 每渲染重算（内容不变时同值），以 exposedKey 为触发键。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exposedKey]);

  // ── 可视即可取（二十一轮 N6，栗子「点开卡片不能才加载」）────────────────────────
  // 预取清单＝虚拟化渲染窗口（visibleIdx），不需要任何观察器 API（open-regression 锁兼容）。
  // idle 调度保证 boot 关键路径零详情请求（detail 闸 P1 钉「首卡绘制前 0 请求」）；
  // 单片 p50≈1.7KB、首屏 24 卡≈42KB，boot 载荷不变。预取落定后点击可视卡：内存同步命中
  // ⇒ 弹层首帧即完整内容；占位只兜底「预取未及」的竞态路径（detail 闸 P3）。
  // 二十二-1：idle 调度抽成通用通道 useIdleDetailPrefetch——收藏夹/创作者页/热门预览
  // 三处直接 markup 卡面走同一通道补齐覆盖面。
  useIdleDetailPrefetch(visibleIdx.map((idx) => cards[idx].repo));

  return (
    <div ref={wrapRef} className={entering ? "feed-window channel-entering" : "feed-window"}>
      {/* data-cols：列数分流用**显式属性**（CSS 侧 `[data-cols="1"]` 读它）。
          `--feed-cols` 保留：它是 CSS 变量，.feed-col 的列宽算式按它取列数，JS 入列也读它。
          十三轮：摘要字号恒定 0.98rem（CSS 字面量），JS 不再写任何形态变量。 */}
      <div className="feed-list" data-cols={cols} style={{ "--feed-cols": cols } as React.CSSProperties}>
        {layout.colIdx.map((idxs, c) => {
          const w = visibleWin[c];
          return (
            <div className="feed-col" key={c}>
              {w.topPad > 0 && (
                <div className="feed-window-pad" style={{ height: w.topPad }} aria-hidden="true" />
              )}
              {idxs.slice(w.startIdx, w.endIdx).map((idx) => (
                <FeedCardMemo
                  key={cards[idx].repo}
                  card={cards[idx]}
                  liked={likedSet.has(cards[idx].repo)}
                  ignored={dislikedSet.has(cards[idx].repo)}
                  onOpen={onOpen}
                  channel={channel}
                  onOpenCreator={onOpenCreator}
                  tagSlots={shape.tagSlots}
                />
              ))}
              {w.bottomPad > 0 && (
                <div className="feed-window-pad" style={{ height: w.bottomPad }} aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
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
  // ── 冻结式头片（二十二-0，2026-10-07）────────────────────────────────────────
  // headCards＝冷启动先到的 baseline top-256（构建期与运行时同一份排序实现产出）。
  // frozenRec＝全量到货时安装的「头片冻结序 + 尾部 append」：本会话推荐频道定序就此冻结，
  // 不再随 memo 重算洗牌——硬不变量＝全量到货零已渲染区重排（会话内定序字面保全）。
  // 用户主动改偏好/关注时清空 frozenRec（回到原重算管线——那是用户动作，不是数据到货热替换）。
  const [headCards, setHeadCards] = useState<FeedCard[] | null>(null);
  const headCardsRef = useRef<FeedCard[] | null>(null);
  const [frozenRec, setFrozenRec] = useState<FeedCard[] | null>(null);
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
    // 冻结式头片：用户主动改偏好 → 解除冻结（回到原重算管线）。这是用户动作，
    // 不是数据到货热替换，与「全量到货零重排」硬不变量不冲突。
    setFrozenRec(null);
    setShowPrefPrompt(false);
  };
  const [interactions] = useState<Record<string, InteractionRecord>>(loadInteractions);
  const interactionsRef = useRef(interactions);
  const [collections, setCollections] = useState<Collection[]>(loadCollections);
  // 到货时刻冻结序计算用的现行值（ref 渲染期同步，与 prefsRef 同一纪律）
  const collectionsRef = useRef(collections);
  collectionsRef.current = collections;
  // 关注列表（纯前端，localStorage 持久化；只影响关注频道/我的-关注）
  // 2026-09-01 关注解耦：关注集只认本机 localStorage（不再并入 data/following.json，
  // 路人打开关注为空）；2026-09-05：关注频道只认 owner 匹配，bigbros 全出口退役
  const [following, setFollowing] = useState<string[]>(loadFollowing);
  const followingSet = useMemo(() => new Set(following), [following]);
  const followingSetRef = useRef(followingSet);
  followingSetRef.current = followingSet;
  // 创作者页栈（整页替换式子页面：push 进入更深层级，pop 逐级返回；
  // 栈顶即当前创作者页；pop 到空数组回原 tab 原频道——tab/feedChannel 状态不动）
  const [viewStack, setViewStack] = useState<{ owner: string }[]>([]);
  const currentCreator = viewStack.length > 0 ? viewStack[viewStack.length - 1].owner : null;
  const [seen] = useState<Record<string, number>>(loadSeen);
  const seenRef = useRef(seen);
  const [expandedCols, setExpandedCols] = useState<Record<string, boolean>>({});
  // 二轮 G6：收藏夹展开的卡片网格与主信息流同一条列数反解。多个收藏夹共用同一容器宽
  // （.folder-cards 全宽），列数相同——一个 hook 量「我的页内容区」即可。
  const { cols: folderCols, shape: folderShape, ref: folderColsRef } = useResponsiveCols();
  const [searchQuery, setSearchQuery] = useState("");
  const [detailCard, setDetailCard] = useState<FeedCard | null>(null);
  // ── 二十轮 N1「详情整体呈现」（2026-10-06，栗子：深度解读不许后到闪现）──
  // detailState 是弹层「深度解读」槽的呈现代码：pending=占位（解读加载中）、
  // ready=内容、missing=显式「暂无」。它只描述当前打开的这张卡；
  // 换卡/关闭由 detailOpenRepoRef 守卫（迟到的分片响应不许写进别人的弹层）。
  const [detailState, setDetailState] = useState<"pending" | "ready" | "missing">("ready");
  const detailOpenRepoRef = useRef<string | null>(null);
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
    detailOpenRepoRef.current = null;
    setDetailCard(null);
  }, []);

  // 加载 feed.json：同日 IndexedDB 缓存命中 → 缓存文本立即渲染（秒开），后台再拉最新
  // 版本校验，有变化才热替换（2026-09-05 加载提速：数据每天 digest 一次，日内刷新几乎全命中）
  // ── 十二轮 T3「按需详情」：boot 不再预热 5.6MB 的 feed-details.json（旧 warmFeedDetails +
  //    idle prefetch 已删）——详情表只在**首次打开详情**时拉取（弹层即时开、detailCn 到位补渲、
  //    看门狗与同日 IndexedDB 缓存延续，见 feed-payload.ts / handleOpenDetail）。
  // ── 冻结式头片（二十二-0，2026-10-07）：冷启动（无同日缓存）先取头片（gzip ≈107KB）
  //    即时渲染推荐频道——冷路径数据字节从 1.2MB 级降到 ≤110KB 级。顺序取数是有意的：
  //    头片独享带宽窗口先到（五轮 T1 教训：大小件并行小件饿死），全量随后后台走完
  //    主源/镜像链；到货时推荐频道装「头片冻结序 + 尾部 append」，与 setCards 同一批
  //    提交（不存在「先按全量重排再冻结」的中间帧）。
  useEffect(() => {
    let cancelled = false;
    const applyData = (data: FeedCard[]) => {
      setCards((Array.isArray(data) ? data : []).map(normalizeCard));
      setLoading(false);
    };
    (async () => {
      const cachedText = await loadCachedText("feed");
      if (cancelled) return;
      if (cachedText) {
        try {
          const list = JSON.parse(cachedText) as FeedCard[];
          applyData(list);
        } catch {
          /* 缓存损坏 → 落回网络路径 */
        }
      }
      if (!cachedText) {
        // 冷启动：头片先行。失败静默——它是加速件不是必需件，退回「等全量」的旧行为。
        try {
          const headText = await fetchFeedText(HEAD_URL, HEAD_TTFB_TIMEOUT_MS);
          const headList = JSON.parse(headText) as FeedCard[];
          if (!cancelled && Array.isArray(headList) && headList.length > 0) {
            headCardsRef.current = headList.map(normalizeCard);
            setHeadCards(headCardsRef.current);
            setLoading(false);
          }
        } catch (headErr: unknown) {
          console.warn(
            "[gittok] 头片不可用（冷启动等全量，行为同旧）：",
            headErr instanceof Error ? headErr.message : headErr,
          );
        }
      }
      // ── 二十一轮 N4④ 多源 fallback：主源 TTFB 滞留 8s / 失败 → jsDelivr 镜像 ──
      let text: string | null = null;
      let fromFallback = false;
      try {
        text = await fetchFeedText(FEED_URL);
      } catch (primaryErr: unknown) {
        console.warn(
          "[gittok] 主源 feed.json 失败/滞留，切 jsDelivr 镜像：",
          primaryErr instanceof Error ? primaryErr.message : primaryErr,
        );
        for (const url of FEED_FALLBACK_URLS) {
          try {
            text = await fetchFeedText(url, FEED_TTFB_TIMEOUT_MS * 1.5);
            fromFallback = true;
            break;
          } catch (err: unknown) {
            console.warn("[gittok] 镜像源也失败：", url, err instanceof Error ? err.message : err);
          }
        }
      }
      try {
        if (text !== null) {
          if (cancelled) return;
          if (fromFallback) text = canonicalizeFallbackFeed(text);
          if (text !== cachedText) {
            void saveCachedText("feed", text);
            const list = (JSON.parse(text) as FeedCard[]).map(normalizeCard);
            // ── 冻结式头片：冷路径全量到货**不热替换**。推荐频道定序 =
            //    头片（冻结会话序）+ 尾部（全量会话序剔除头片成员后的相对序，append-only）。
            //    去重按 repo：保证全量成员恰好出现一次；头片成员次序字面保全。
            const head = headCardsRef.current;
            if (head && head.length > 0) {
              const now = Date.now();
              const fullRec = applyJitter(
                buildRecommended(
                  applyFilter(
                    list.filter((c) => c.reasonCn && c.reasonCn.length > 0),
                    seenRef.current,
                    interactionsRef.current,
                    collectionsRef.current,
                  ),
                  prefsRef.current,
                  seenRef.current,
                  interactionsRef.current,
                  followingSetRef.current,
                  now,
                ),
                sessionSeedRef.current,
                seenRef.current,
                now,
                0.2,
              );
              const headSet = new Set(head.map((c) => c.repo));
              setFrozenRec([...head, ...fullRec.filter((c) => !headSet.has(c.repo))]);
            }
            applyData(list);
          }
        }
      } catch (err: unknown) {
        // 数据损坏（解析失败）：缓存已渲染时静默（旧数据可刷）；无缓存才报错
        if (!cachedText) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
        return;
      }
      // 全部源都失败：缓存已渲染时后台刷新失败静默（旧数据可刷）；无缓存才报错
      if (text === null && !cachedText) {
        setError("主源与镜像源均不可达");
        setLoading(false);
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
      // 十二轮：卡高自然化后「行高」不再是真源——按滚动口实际高度翻页（PageDown=3 屏、空格=1 屏）。
      scroller.scrollBy({ top: rows * scroller.clientHeight * 0.85, behavior: "auto" });
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
    detailOpenRepoRef.current = card.repo;
    // 快照卡（收藏夹留存）可能自带 detailCn：内容已在卡上，首帧即终态。
    if (card.detailCn) {
      setDetailState("ready");
      setDetailCard(card);
      return;
    }
    const ready = getRepoDetailIfReady(card.repo);
    if (ready !== undefined) {
      // 同步命中（内存缓存，含确认缺失）：弹层首帧就是终态，没有任何交接。
      setDetailState(ready === null ? "missing" : "ready");
      setDetailCard(ready === null ? card : withRepoDetail(card, ready));
      return;
    }
    // ── 五轮 T1（线上实测的根因就在这里）───────────────────────────────────────────
    // 症状：线上点卡片 → 卡片立刻隐形、弹层**长期不出现**、无报错。
    // 实测（`D:/tmp/gt-r5-open-live.mjs`，线上冷 profile）：弹层**确实会开**，但要等
    // **105.4 秒**——那一刻正是 `feed-details.json` 下载完的时刻；同一张卡在数据就位后再点
    // 只要 **107ms**。此前「弹层从不出现」的结论来自 3.5s 的观察窗，是探针窗口太短。
    // 所以根因不是渲染被挡住，而是：**点击路径在等一个 5.2MB 的详情表下载**，
    // 而源卡已经被标成隐形 ⇒ 用户看到的就是「点一下卡片没了，什么都没打开」。
    //
    // 修法（保序不变）：**点击立刻开弹层**（用列表卡自身的数据），任何 await 之前。
    // ── 二十轮 N1（2026-10-06，栗子「详情内容必须作为整体展现」）────────────────────
    // 五轮的取舍有个副作用：detailCn 到位后「从无到有插入」（补渲无交接）＝他说的
    // 「先加载出来其他东西，然后深度解读才闪现」。正解不是回退成「等数据才开弹层」，
    // 而是编排：**开弹层（即时）→ 深度解读槽位占位 → 数据到位整体交接（高度过渡＋淡入）**。
    // 数据侧同族件（C3）：整表 5.96MB 拆成单卡分片（p50 ≈1.7KB），点击只拉所需一片；
    // 同日 IndexedDB 分片缓存语义不变（feed-payload.ts）。缺键卡显式「暂无深度解读」，
    // 灭掉 E2 的静默缺失。呈现判据已闸化（scripts/gittok-detail-presentation-check.mjs）。
    setDetailCard(card);
    setDetailState("pending");
    // ── 二十二-2 投毒防护（2026-10-07）：resolveRepoDetail 网络失败=未知（不落内存、
    //    Promise 拒绝）。弹层保持占位 + 有界退避重试——「暂无」只留给确认缺失，
    //    网络恢复后重试链路把内容接进来（detail 闸 P13 锁行为）。
    const attemptFetch = async (left: number): Promise<void> => {
      try {
        const detailCn = await resolveRepoDetail(card.repo);
        // 迟到的响应守卫：用户可能已关闭或换看了别的卡——不许写进别人的弹层。
        if (detailOpenRepoRef.current !== card.repo) return;
        setDetailState(detailCn === null ? "missing" : "ready");
        setDetailCard((prev) => (prev && prev.repo === card.repo ? withRepoDetail(prev, detailCn) : prev));
        // G-04 可观测性（十二轮自 boot 预热处迁来，按需详情的伴生检查）：分片与整表都无此键
        // ⇒ 深度解读确认缺失；UI 有显式「暂无」态，控制台仍记账以便管道侧追查。
        if (detailCn === null) {
          console.warn(`[feed-details] ${card.repo} 缺深度解读（分片墓碑/整表均无此键）`);
        }
      } catch (err: unknown) {
        if (detailOpenRepoRef.current !== card.repo) return;
        console.warn(
          `[feed-details] ${card.repo} 取数失败（保持占位${left > 0 ? `，${Math.round(DETAIL_RETRY_DELAY_MS / 1000)}s 后重试` : "，重试窗结束"}）：`,
          err instanceof Error ? err.message : err,
        );
        if (left <= 0) return;
        await new Promise((r) => setTimeout(r, DETAIL_RETRY_DELAY_MS));
        if (detailOpenRepoRef.current !== card.repo) return;
        await attemptFetch(left - 1);
      }
    };
    void attemptFetch(DETAIL_RETRY_ATTEMPTS);
  }, []);

  // 关注/取关（影响关注频道与我的-关注；推荐序里 followBoost 随关注集重算）
  const toggleFollow = useCallback((owner: string) => {
    setFollowing((prev) => {
      const next = prev.includes(owner) ? prev.filter((o) => o !== owner) : [...prev, owner];
      saveFollowing(next);
      return next;
    });
    // 冻结式头片：关注影响推荐序（followBoost）→ 用户动作解除冻结，与改偏好同理
    setFrozenRec(null);
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
  // ── 冻结式头片（二十二-0）推荐频道三态定序 ──
  // ① frozenRec（冷路径全量已到货）：头片冻结序＋尾部 append，本会话推荐定序冻结；
  // ② 冷窗（头片在场、全量未到）：头片 baseline 序即会话序（首访者无偏好＝零软化；
  //    回访者个性化深度受限＝软化②，docs 待追认；applyFilter 只剔除不重排，序仍冻结）；
  // ③ 常规（暖路径/头片失败/用户解除冻结）：原个性化管线原样。
  const sections = useMemo(() => {
    const seed = sessionSeedRef.current;
    const now = Date.now();
    const headOnly =
      headCards !== null && cards.length === 0
        ? applyFilter(
            headCards.filter((c) => c.reasonCn && c.reasonCn.length > 0),
            seen,
            interactions,
            collections,
          )
        : null;
    const all = ALL_SECTIONS.map((s) => ({
      ...s,
      cards:
        s.key === "recommended"
          ? (frozenRec ??
            headOnly ??
            applyJitter(
              buildRecommended(visibleCards, preferences, seen, interactions, followingSet),
              seed,
              seen,
              now,
              0.2,
            ))
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
  }, [visibleCards, preferences, seen, interactions, followingSet, frozenRec, headCards, cards, collections]);

  // 当前频道内容（单频道独立渲染；点踩消失的卡不再渲染）
  const activeSection = useMemo(() => {
    const sec = sections.find((s) => s.key === feedChannel);
    if (!sec || sec.cards.length === 0) return null;
    return sec;
  }, [sections, feedChannel]);

  // 冻结式头片冷窗（二十二-0）：头片已渲染、全量未到。此窗口里只有推荐频道有数据——
  // 其他频道/搜索保持加载态（不渲染残缺序，验收④），推荐频道照常可刷可点。
  const coldHeadOnly = !loading && !error && headCards !== null && cards.length === 0;

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
  const { cols: hotCols, shape: hotShape, ref: hotColsRef } = useResponsiveCols();

  // ── 二十二-1 预取覆盖面（2026-10-07）────────────────────────────────────────
  // 三处「直接 markup」卡面接入通用 idle 预取通道（不可见时传空数组=零请求，
  // detail 闸 P1「预取 ⊆ 可视卡集合」同样约束这些卡面）。
  // ① 搜索空态热门预览（仅搜索 tab 且空 query 时在场上）
  useIdleDetailPrefetch(tab === "search" && !searchQuery ? hotPreview.map((c) => c.repo) : []);
  // ② 收藏夹展开网格（我的-收藏 且夹子展开时在场上）
  const expandedFolderRepos = useMemo(() => {
    if (tab !== "me" || meView !== "collections") return [];
    const out: string[] = [];
    for (const col of collections) {
      if (!(expandedCols[col.id] ?? false)) continue;
      for (const repo of col.repos) {
        // 与渲染口径一致：快照或当天数据里有卡才会上屏，才值得预取
        if (col.snapshots?.[repo] || cardByRepo.has(repo)) out.push(repo);
      }
    }
    return out;
  }, [tab, meView, collections, expandedCols, cardByRepo]);
  useIdleDetailPrefetch(expandedFolderRepos);

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

  // 非 feed 上下文点频道（搜索/Agent/创作者页的常驻侧栏、移动端抽屉）：先回首页再切频道
  const pickChannelGoFeed = useCallback(
    (key: string) => {
      setTab("feed");
      switchFeedChannel(key);
    },
    [switchFeedChannel],
  );

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
        {/* N5（二十一轮）：主内容区边界——信息流/搜索/创作者页任何渲染崩溃都落进
            可恢复错误 UI（重试/刷新），永不整树卸载紫屏；console.error 留证据不吞错。 */}
        <ErrorBoundary label="主内容区">
          {/* 二十三代追加（2026-10-08）：main-feed 恒开。四个 tab 与创作者页统一住同一个
              1866 居中壳（侧栏 192＋内容 1650，agent/creator 的 1200 阅读列在内容区内居中，
              三档口径保留）——tab 切换不再翻转 .main 的 padding/max-width，栗子 10-08 报的
              「agent→我的 / agent→搜索→首页 进入时宽度变化动画」从机制上消失（此前是
              .main-feed 的 padding 过渡在类翻转时播放）。.main-feed 的 padding 过渡只剩
              768 断点跨越一个职责（media 查询改 padding 仍走过渡，三轮甲A1 判据保留）。 */}
          <main className="main main-feed">
            {/* === 创作者页栈：内容区整页替换（壳与侧栏常驻——与四 tab 同一几何，返回逐级 pop 后恢复原 tab 原频道） === */}
            {viewStack.length > 0 && currentCreator ? (
              <div className="feed-layout">
                <aside className="sidebar">
                  <ChannelNav sections={sections} activeKey={feedChannel} onPick={pickChannelGoFeed} />
                </aside>
                <div className="feed-content">
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
                </div>
              </div>
            ) : (
              <>
                {/* === Agent 接入 tab（四条路径 / 服务自检 / 三步接入）——与四 tab 同壳同几何 === */}
                {tab === "agent" && (
                  <div className="feed-layout">
                    <aside className="sidebar">
                      <ChannelNav sections={sections} activeKey={feedChannel} onPick={pickChannelGoFeed} />
                    </aside>
                    <div className="feed-content">
                      <AgentPage />
                    </div>
                  </div>
                )}

                {/* === 首页 tab（壳与侧栏常驻：加载/错误/空态也在壳内，本 tab 几何从首帧起恒定） === */}
                {tab === "feed" && (
                  <div className="feed-layout">
                    {/* 左侧边栏：目的地导航（发现组 + 分类组；移动端移入抽屉，桌面保持现状） */}
                    <aside className="sidebar">
                      <ChannelNav sections={sections} activeKey={feedChannel} onPick={switchFeedChannel} />
                    </aside>
                    <div className="feed-content">
                      {loading && (
                        <div className="status">
                          <div className="spinner" />
                          <p>正在加载好项目…</p>
                        </div>
                      )}
                      {error && (
                        <div className="status error">
                          <p>
                            <AlertTriangle size={16} className="icon" />
                            加载失败: {error}
                          </p>
                        </div>
                      )}
                      {!loading && !error && sections.length === 0 && (
                        <div className="status">
                          <p>
                            <Inbox size={16} className="icon" />
                            暂无内容
                          </p>
                        </div>
                      )}
                      {!loading && !error && sections.length > 0 && (
                        <>
                          {showPrefPrompt && feedChannel === "recommended" && (
                            <div className="pref-prompt">
                              <p className="pref-title">
                                想让推荐更懂你？选一个更想看的类别（随时可在设置里改）
                              </p>
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
                          {/* 冻结式头片冷窗：切到尚无数据的频道 = 加载态（不渲染残缺序） */}
                          {tab === "feed" && coldHeadOnly && !activeSection && (
                            <div className="status">
                              <div className="spinner" />
                              <p>正在加载好项目…</p>
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
                                          {/* 十二轮：列式容器——i%K 轮转入列（与主信息流同构） */}
                                          {buildColumnIndex(colCards.length, folderCols).map((idxs, c) => (
                                            <div className="feed-col" key={c}>
                                              {idxs.map((i) => {
                                                const card = colCards[i];
                                                return (
                                                  <div key={card.repo} className="folder-card-wrapper">
                                                    <FeedCardMemo
                                                      card={card}
                                                      liked={feedback.likes.includes(card.repo)}
                                                      ignored={dislikedSet.has(card.repo)}
                                                      onOpen={handleOpenDetail}
                                                      onOpenCreator={openCreator}
                                                      tagSlots={folderShape.tagSlots}
                                                    />
                                                    <button
                                                      className="folder-card-remove"
                                                      onClick={() =>
                                                        handleRemoveFromCollection(col.id, card.repo)
                                                      }
                                                      title="移出收藏夹"
                                                    >
                                                      <X size={16} />
                                                    </button>
                                                  </div>
                                                );
                                              })}
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

                {/* === 搜索 tab（与四 tab 同壳同几何；冷窗/空态/结果全部在壳内容区内） === */}
                {tab === "search" && (
                  <div className="feed-layout">
                    <aside className="sidebar">
                      <ChannelNav sections={sections} activeKey={feedChannel} onPick={pickChannelGoFeed} />
                    </aside>
                    <div className="feed-content">
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

                      {coldHeadOnly ? (
                        /* 冻结式头片冷窗：搜索吃全量数据——到货前保持加载态，不渲染残缺序 */
                        <div className="status">
                          <div className="spinner" />
                          <p>正在加载好项目…</p>
                        </div>
                      ) : (
                        <>
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
                                  {/* 十二轮：列式容器——i%K 轮转入列（与主信息流同构） */}
                                  {buildColumnIndex(hotPreview.length, hotCols).map((idxs, c) => (
                                    <div className="feed-col" key={c}>
                                      {idxs.map((i) => {
                                        const card = hotPreview[i];
                                        return (
                                          <FeedCardMemo
                                            key={card.repo}
                                            card={card}
                                            liked={feedback.likes.includes(card.repo)}
                                            ignored={dislikedSet.has(card.repo)}
                                            onOpen={handleOpenDetail}
                                            onOpenCreator={openCreator}
                                            tagSlots={hotShape.tagSlots}
                                          />
                                        );
                                      })}
                                    </div>
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
                                <button
                                  className="creator-toggle"
                                  onClick={() => setShowAllCreators((v) => !v)}
                                >
                                  {showAllCreators
                                    ? "收起创作者"
                                    : `展开其余 ${searchCreators.length - 4} 位创作者`}
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
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </ErrorBoundary>

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
            pickChannelGoFeed(key);
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

      {/* 详情弹窗（N5：弹层独立边界——崩溃只塌弹层，「返回列表」回信息流；console.error 留证据） */}
      {detailCard && (
        <ErrorBoundary label="详情弹层" variant="overlay" onReset={closeDetail}>
          <CardDetail
            key={detailCard.repo}
            card={detailCard}
            detailState={detailState}
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
        </ErrorBoundary>
      )}
    </div>
  );
}
