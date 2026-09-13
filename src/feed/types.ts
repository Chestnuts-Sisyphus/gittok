/**
 * 开源版抖音信息流 — 数据类型。
 *
 * FeedCard 是信息流里的一张项目卡片，由 trending/search/bigbro 数据
 * 经 LLM 打分+生成中文推荐理由后聚合而成。
 */

/** 项目进入信息流的来源 */
export type FeedSource = "trending" | "bigbro" | "search";

/** 标签来源 */
export type TagSource = "llm" | "github" | "language";

/** 大牛 star 采集结果（与 src/bigbro-stars.ts 同步；Starred API 自带 repo 详情，免二次 fetch） */
export interface BigbroStar {
  /** owner/repo */
  repo: string;
  /** star 了该项目的大牛列表 */
  bigbros: string[];
  /** 最近一次 star 的 ISO 时间（Starred API 不带 star 时间，用 repo pushed_at 近似） */
  ts: string;
  /** 项目描述 */
  desc?: string;
  /** star 数 */
  stars?: number;
  /** 主语言 */
  language?: string;
  /** topics */
  topics?: string[];
}

/** 综合标签（多来源融合） */
export interface Tag {
  /** 标签文本 */
  name: string;
  /** 来源 */
  source: TagSource;
  /** 来源权重 0-1（llm=1.0, github=0.7, language=0.5） */
  weight: number;
}

/** 待 LLM 评分的项目（采集层产出的统一中间格式） */
export interface RepoForScoring {
  /** owner/repo */
  repo: string;
  description: string;
  stars: number;
  language: string;
  topics: string[];
  /** 原始 README markdown（stage1 输入块用；缺省时 prompt 降级为一行式列表） */
  readme?: string;
  /** 仓库创建时间 ISO（输入块元数据展示/每日频道新卡段） */
  createdAt?: string;
  /** 最后一次 push 时间 ISO（GitHub repos API pushed_at；P1 全量补齐，与 README 同批抓取） */
  pushedAt?: string;
}

/** 千人千面独有事实（claim=独立归纳断言，source=参考文档原句证据） */
export interface Fact {
  claim: string;
  source: string;
}

/** LLM 评分结果（JSON 解析） */
export interface ScoringResult {
  repo: string;
  /** AI 维度分类（多个标签，1-3个，按相关度降序） */
  aiDims: string[];
  /** @deprecated 等于 aiDims[0]，向后兼容 */
  aiDim: string;
  /** 与用户兴趣的相关度 0-1 */
  aiScore: number;
  /** 内容分区（AI/资源/工具/创意，判定链四问输出；v6 新增） */
  zone?: string;
  /** 乐趣强度 0-1（体验轴信号：让人想点开玩的冲动；标签分区 v2.2 新增） */
  funScore?: number;
  /** 领域标签 3-6 个（LLM 自由出的领域词，面向人可读；替代 topics 噪音） */
  tags?: string[];
  /** 千人千面独有事实（claim/source 两阶段输出） */
  facts?: Fact[];
  /** 一句话通俗概括 */
  summaryCn: string;
  /** 简要介绍（两三行，含专业术语） */
  reasonCn: string;
  /** 详情介绍（长文，兼顾通俗+专业+细致） */
  detailCn: string;
  /** 内部字段：评分模型键（分位归一化按模型分桶用；不落盘 feed.json） */
  _model?: string;
}

/** 固有分区标签（互斥，每个项目必有其一；tool 为最宽兜底） */
export type FeedCategory = "ai" | "fun" | "tool" | "learning";

/** 动态热度标签（不互斥，可有可无；可同时命中多个） */
export type FeedMomentum = "hot" | "daily" | "rising";

/** 信息流卡片 —— 前端消费的最终格式 */
export interface FeedCard {
  /** owner/repo */
  repo: string;
  owner: string;
  name: string;
  /** 原始描述（可能英文） */
  desc: string;
  /** 一句话通俗概括（大白话，有趣，让用户一眼看懂） */
  summaryCn: string;
  /** 简要介绍（两三行，含专业术语但精炼） */
  reasonCn: string;
  /** 详情介绍（长文，兼顾通俗+专业+细致，深度解读） */
  detailCn: string;
  stars: number;
  /** 日均 star 增长（trending 用 todayStars；refresh 用差分÷距上次更新天数，间隔>1 天摊薄防虚高；search 用 0） */
  starGrowth: number;
  /** 每日频道时效热度分（相对增速为主轴+绝对增速托底，×建仓加成；越大越靠前，2026-09-05 拍板：涨得快 > 涨得多） */
  heatScore?: number;
  /** 静默轮数：刷新时日均涨星<2 且无其他信号则 +1，有信号清零；≥3 = 真沉寂，退出默认推荐流（底库/收藏不受影响） */
  silentRounds?: number;
  /** 仓库创建时间 ISO（search API / 轮转刷新携带；trending HTML 无此字段）——rising「新星」判定依据 */
  createdAt?: string;
  language: string;
  topics: string[];
  /** LLM 多维度标签（1-3个） */
  aiDims: string[];
  /** @deprecated 等于 aiDims[0]，向后兼容 */
  aiDim: string;
  /** 内容分区（AI/资源/工具/创意，LLM 判定链输出；前端只读不猜，废止正则推导 category） */
  zone?: string;
  /** 乐趣强度 0-1（乐趣频道信号；体验轴，与 zone 题材轴正交） */
  funScore?: number;
  /** 领域标签（LLM 自由领域词 3-6 个，展示/搜索/千人千面素材；计算侧走 domainKey） */
  domainTags?: string[];
  /** 确定性领域键（从 zone+domainTags 派生，聚合计算/打包同键/配额统计用） */
  domainKey?: string;
  /** 最近活动时间 ISO（默认流死内容过滤：超 1 年未更新的高星库降权，P1） */
  pushedAt?: string;
  /** 综合标签（LLM + GitHub topics + language 融合） */
  tags: Tag[];
  aiScore: number;
  source: FeedSource;
  /** @deprecated bigbros 盖章已全面退役（2026-09-05，管道停跑+出口全删）：字段仅为解析历史数据保留 */
  bigbros: string[];
  url: string;
  /** ISO 时间戳 */
  ts: string;
  /** 推荐排序分（个性化层计算） */
  score: number;
  /** 固有分区标签（ai/fun/tool/learning 之一） */
  category: FeedCategory;
  /** 动态热度标签（hot/daily，不互斥，可为空数组） */
  momentum: FeedMomentum[];
  /** 动态权威标记（官方组织出品） */
  fromOfficial: boolean;
}

/** 用户画像（个性化层） */
export interface UserProfile {
  /** @deprecated AI/好玩/实用 三维权重（迁移到 tagWeights） */
  interests: { ai: number; fun: number; practical: number };
  /** 标签权重向量：key=标签名, value=偏好权重 0-1 */
  tagWeights: Record<string, number>;
  /** 自然语言兴趣描述（喂给 AI 打分） */
  aiInterestsText: string;
  /** 关注的大牛 GitHub 用户名 */
  followedBigs: string[];
  /** 收藏的 repo 列表 */
  bookmarks: string[];
  /** 最后活跃时间 ISO */
  lastActiveTs: string;
}

/** 用户反馈（点赞/不感兴趣/收藏），用于更新画像 */
export interface UserFeedback {
  likes: string[];
  dislikes: string[];
  bookmarks: string[];
}
