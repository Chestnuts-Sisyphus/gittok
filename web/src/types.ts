/**
 * 前端 FeedCard 类型 —— 与后端 src/feed/types.ts 的 FeedCard 接口一致。
 * 前端独立定义避免引入 Node 依赖。
 */

export type FeedCategory = "ai" | "fun" | "tool" | "learning";

/** 动态热度标签（不互斥，可同时命中多个；rising=新星） */
export type FeedMomentum = "hot" | "daily" | "rising";

/** 标签来源 */
export type TagSource = "llm" | "github" | "language";

/** 综合标签（多来源融合） */
export interface Tag {
  name: string;
  source: TagSource;
  weight: number;
}

/** 收藏夹 */
export interface Collection {
  id: string;
  name: string;
  repos: string[];
  createdAt: string;
  isAuto: boolean;
  sourceTag?: string;
  /** 卡片快照（repo → 卡片本体）。收藏时留存，避免数据每日更新后匹配不到 */
  snapshots?: Record<string, FeedCard>;
}

export interface FeedCard {
  repo: string;
  owner: string;
  name: string;
  desc: string;
  /** 一句话通俗概括（大白话，有趣） */
  summaryCn: string;
  /** 简要介绍（两三行，含专业术语） */
  reasonCn: string;
  /** 详情介绍（长文，兼顾通俗+专业+细致） */
  detailCn: string;
  /** 文案生产闸复检结果。构建期打标（web/vite.config.ts → src/feed/copy-ok.ts），
   *  false = 不过现行 cardChecks，推荐池剔除（web/src/copy-gate.ts）；缺键按合格处理。 */
  copyOk?: boolean;
  stars: number;
  starGrowth: number;
  /** 每日频道时效热度分（相对增速主轴，涨得快>涨得多） */
  heatScore?: number;
  /** 静默轮数：≥3 = 真沉寂，默认推荐流退场（底库/收藏不受影响） */
  silentRounds?: number;
  /** 仓库创建时间 ISO（建仓时间显示依据） */
  createdAt?: string;
  language: string;
  topics: string[];
  /** LLM 多维度标签 */
  aiDims: string[];
  /** @deprecated 等于 aiDims[0]；构建 payload 已剔除，仅为历史数据解析保留 */
  aiDim?: string;
  /** 内容分区（AI/资源/工具/创意，LLM 判定链输出；前端只读不猜，废止正则推导 category） */
  zone?: string;
  /** 乐趣强度 0-1（乐趣频道信号；体验轴，与 zone 题材轴正交） */
  funScore?: number;
  /** 领域标签（LLM 自由领域词 3-6 个，展示/搜索用） */
  domainTags?: string[];
  /** 确定性领域键（从 zone+domainTags 派生，聚合计算用） */
  domainKey?: string;
  /** 最近活动时间 ISO（默认流死内容过滤） */
  pushedAt?: string;
  /** 综合标签（LLM + GitHub topics + language） */
  tags: Tag[];
  aiScore: number;
  /** 数据来源：bigbro=旧「大牛灌卡」历史存量（语义 2026-09-05 退役，仅中性展示为「收录」） */
  source: "trending" | "bigbro" | "search";
  /** @deprecated bigbros 盖章已全面退役（2026-09-05）：构建 payload 已剔除，任何出口不得渲染/加权 */
  bigbros?: string[];
  url: string;
  ts: string;
  /** @deprecated 组装时恒 0，前端排序已不用；构建 payload 已剔除 */
  score?: number;
  category: FeedCategory;
  /** 动态热度标签（hot/daily，不互斥，可为空） */
  momentum?: FeedMomentum[];
  /** 动态权威标记（官方出品） */
  fromOfficial?: boolean;
}
