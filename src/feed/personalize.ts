/**
 * 开源版抖音信息流 — 个性化层 v2。
 *
 * 三件事：
 * 1. 用户画像读写（data/profile.json）—— 标签权重向量 + 兴趣描述
 * 2. 用户反馈读写（data/feedback.json）—— 点赞/不感兴趣/收藏的 repo 列表
 * 3. 推荐排序 —— score = aiScore × tagMatch × freshness × bigbro × heat（热点提速刀）
 *
 * 反馈 loop：前端点赞/不感兴趣/收藏 → 写 feedback.json → 下次跑批时
 * applyFeedbackToProfile 据此微调标签权重，实现"越刷越准"。
 */

import fs from "node:fs";
import path from "node:path";
import type { FeedCard, Tag, UserProfile, UserFeedback } from "./types.ts";

const DATA_DIR = "data";
const PROFILE_PATH = path.join(DATA_DIR, "profile.json");
const FEEDBACK_PATH = path.join(DATA_DIR, "feedback.json");

// 默认标签权重（用于未初始化的用户）
const DEFAULT_TAG_WEIGHT = 0.15;

// 兴趣关键词 → 对应标签权重映射
// 注意：initTagWeights 对兴趣文案做 toLowerCase 后做 includes 匹配，
// 英文 keyword 匹配不上中文文案，因此补充中文关键词（"AI" 由小写 "ai" 实际命中）。
const INTEREST_KEYWORD_MAP: Record<string, { tags: string[]; weight: number }> = {
  ai: {
    tags: ["AI基础设施", "AI Agent", "AI应用", "模型与训练", "RAG与知识", "推理引擎", "大语言模型"],
    weight: 0.5,
  },
  AI: {
    tags: ["AI基础设施", "AI Agent", "AI应用", "模型与训练", "RAG与知识", "推理引擎", "大语言模型"],
    weight: 0.5,
  },
  fun: { tags: ["非AI-好玩", "游戏", "创意工具", "可视化"], weight: 0.4 },
  好玩: { tags: ["非AI-好玩", "游戏", "创意工具", "可视化"], weight: 0.4 },
  practical: { tags: ["非AI-实用", "开发者工具", "效率工具", "安全工具"], weight: 0.4 },
  实用: { tags: ["非AI-实用", "开发者工具", "效率工具", "安全工具"], weight: 0.4 },
  learn: { tags: ["学习资源", "教程", "论文"], weight: 0.3 },
  学习: { tags: ["学习资源", "教程", "论文"], weight: 0.3 },
};

// ---------------------------------------------------------------------------
// Profile I/O
// ---------------------------------------------------------------------------

export function loadProfile(fallback: UserProfile): UserProfile {
  try {
    if (fs.existsSync(PROFILE_PATH)) {
      const raw = JSON.parse(fs.readFileSync(PROFILE_PATH, "utf-8"));
      return {
        interests: raw.interests ?? fallback.interests,
        tagWeights: raw.tagWeights ?? (fallback.tagWeights || {}),
        aiInterestsText: raw.aiInterestsText ?? fallback.aiInterestsText,
        followedBigs: raw.followedBigs ?? fallback.followedBigs,
        bookmarks: raw.bookmarks ?? (fallback.bookmarks || []),
        lastActiveTs: raw.lastActiveTs ?? (fallback.lastActiveTs || new Date().toISOString()),
      };
    }
  } catch (err) {
    console.error(`[personalize] load profile failed: ${err}`);
  }
  return fallback;
}

export function saveProfile(profile: UserProfile): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(profile, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Feedback I/O
// ---------------------------------------------------------------------------

export function loadFeedback(): UserFeedback {
  try {
    if (fs.existsSync(FEEDBACK_PATH)) {
      const raw = JSON.parse(fs.readFileSync(FEEDBACK_PATH, "utf-8"));
      return { likes: raw.likes ?? [], dislikes: raw.dislikes ?? [], bookmarks: raw.bookmarks ?? [] };
    }
  } catch (err) {
    console.error(`[personalize] load feedback failed: ${err}`);
  }
  return { likes: [], dislikes: [], bookmarks: [] };
}

export function saveFeedback(fb: UserFeedback): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FEEDBACK_PATH, JSON.stringify(fb, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Tag Weights 初始化（从 aiInterestsText 语义推导）
// ---------------------------------------------------------------------------

/** 从用户兴趣描述文本推导初始标签权重 */
export function initTagWeights(aiInterestsText: string): Record<string, number> {
  const weights: Record<string, number> = {};
  const lower = aiInterestsText.toLowerCase();

  for (const [keyword, { tags, weight }] of Object.entries(INTEREST_KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      for (const tag of tags) {
        weights[tag] = Math.max(weights[tag] ?? 0, weight);
      }
    }
  }

  // 如果没有任何匹配，给所有候选标签均等低权重
  if (Object.keys(weights).length === 0) {
    for (const entry of Object.values(INTEREST_KEYWORD_MAP)) {
      for (const tag of entry.tags) {
        weights[tag] = DEFAULT_TAG_WEIGHT;
      }
    }
  }

  return weights;
}

// ---------------------------------------------------------------------------
// Tag Weights 衰减
// ---------------------------------------------------------------------------

/** 对标签权重应用时间衰减 */
export function decayTagWeights(
  weights: Record<string, number>,
  daysSinceActive: number,
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [tag, w] of Object.entries(weights)) {
    if (w > 0.15) {
      result[tag] = Math.max(0.01, w * Math.pow(0.995, daysSinceActive));
    } else {
      result[tag] = Math.max(0.01, w * Math.pow(0.98, daysSinceActive));
    }
  }

  // 垃圾回收：超过50个标签裁剪最低10%
  const entries = Object.entries(result);
  if (entries.length > 50) {
    entries.sort((a, b) => b[1] - a[1]);
    const keep = entries.slice(0, Math.ceil(entries.length * 0.9));
    const trimmed: Record<string, number> = {};
    for (const [k, v] of keep) trimmed[k] = v;
    return trimmed;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Tag Match 计算
// ---------------------------------------------------------------------------

/**
 * 计算仓库标签与用户偏好的加权重叠度。
 * 使用加权余弦相似度，结果线性变换到 [0.5, 1.0]。
 *
 * @deprecated 2026-09-13 个性化 v2.2：推荐已改为前端四层架构（L0 池过滤 → L2 多因子 → L1 已读 → L3 显式偏好 + L4 隐式微调），
 * 旧 tagScore 加权和由前端 buildRecommended 接管（显式偏好在本机 localStorage）。本函数仅为服务端批跑排序
 * （generateFeed 的 rankCards 输出 score 字段）保留兼容，前端不消费该 score。
 */
export function weightedCosine(cardTags: Tag[], userWeights: Record<string, number>): number {
  let dotProduct = 0;
  let cardNormSq = 0;

  for (const tag of cardTags) {
    const uw = userWeights[tag.name] ?? DEFAULT_TAG_WEIGHT;
    dotProduct += tag.weight * uw;
    cardNormSq += tag.weight * tag.weight;
  }
  const cardNorm = Math.sqrt(cardNormSq);

  // 用户权重向量的L2范数
  let userNormSq = 0;
  for (const tag of cardTags) {
    const uw = userWeights[tag.name] ?? DEFAULT_TAG_WEIGHT;
    userNormSq += uw * uw;
  }
  const userNorm = Math.sqrt(userNormSq);

  if (cardNorm === 0 || userNorm === 0) return 0.5;
  const cosine = dotProduct / (cardNorm * userNorm);
  return 0.5 + 0.5 * cosine;
}

// ---------------------------------------------------------------------------
// 旧版 dimWeight（向后兼容，tagWeights 为空时回退）
// ---------------------------------------------------------------------------

function dimWeight(aiDim: string, interests: UserProfile["interests"]): number {
  if (/^(AI|模型|RAG|推理|向量|大语言|微调|提示|代码助手)/.test(aiDim)) return interests.ai;
  if (aiDim === "非AI-好玩" || aiDim === "游戏" || aiDim === "创意工具") return interests.fun;
  if (aiDim === "非AI-实用" || aiDim === "开发者工具" || aiDim === "效率工具") return interests.practical;
  return (interests.ai + interests.fun + interests.practical) / 3;
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

// ── 热度加权（2026-09-04 热点提速刀；2026-09-05 外源信号剔除）───────
// 两路站内信号归一相加后封顶：涨星速度（50 星/天吃满 +35%）、刚冒头（+60%），
// 总热度上限 +95%——追热点但不掀翻兴趣排序。
const HEAT_GROWTH_NORM = 50;
const HEAT_GROWTH_WEIGHT = 0.35;
const HEAT_RISING_WEIGHT = 0.6;
const HEAT_MAX = 0.95;

/** 热度系数 = 1 + Σ信号（封顶 1 + HEAT_MAX），starGrowth=0 且无标记的卡恒为 1 */
export function heatBoost(card: FeedCard): number {
  let heat = 0;
  if (card.starGrowth > 0) {
    heat += HEAT_GROWTH_WEIGHT * Math.min(card.starGrowth / HEAT_GROWTH_NORM, 1);
  }
  if (card.momentum?.includes("rising")) heat += HEAT_RISING_WEIGHT;
  return 1 + Math.min(heat, HEAT_MAX);
}

/**
 * 计算单张卡片推荐分（v2 标签权重版 + 热度加权）。
 * score = aiScore × tagMatchBoost × freshnessFactor × heatBoost
 * （bigbroBoost 大牛背书已随 bigbros 全出口退役移除，2026-09-05）
 */
export function computeScore(card: FeedCard, profile: UserProfile): number {
  const aiScore = card.aiScore;

  // 标签匹配增强
  let tagMatchBoost: number;
  if (Object.keys(profile.tagWeights).length > 0 && card.tags && card.tags.length > 0) {
    tagMatchBoost = weightedCosine(card.tags, profile.tagWeights);
  } else {
    // 回退到旧三维模型
    tagMatchBoost = dimWeight(card.aiDim, profile.interests);
  }

  // 新鲜度（半衰期约5天）
  const daysSince = (Date.now() - new Date(card.ts).getTime()) / (24 * 3600 * 1000);
  const freshnessFactor = 0.4 + 0.6 * Math.exp(-daysSince / 7);

  return aiScore * tagMatchBoost * freshnessFactor * heatBoost(card);
}

/** 批量打分并按 score 降序排序 */
export function rankCards(cards: FeedCard[], profile: UserProfile): FeedCard[] {
  return cards.map((c) => ({ ...c, score: computeScore(c, profile) })).sort((a, b) => b.score - a.score);
}

// ---------------------------------------------------------------------------
// Feedback -> Profile 更新（反馈 loop v2）
// ---------------------------------------------------------------------------

/**
 * 根据用户反馈更新标签权重向量。
 * 点赞/收藏增加相关标签权重，点踩降低。
 */
export function applyFeedbackToProfile(
  profile: UserProfile,
  feedback: UserFeedback,
  cards: FeedCard[],
): UserProfile {
  const totalFeedback = feedback.likes.length + feedback.dislikes.length + (feedback.bookmarks?.length ?? 0);
  if (totalFeedback === 0) return profile;

  // 确保 tagWeights 已初始化
  let tagWeights = { ...profile.tagWeights };
  if (Object.keys(tagWeights).length === 0) {
    tagWeights = initTagWeights(profile.aiInterestsText);
  }

  const cardMap = new Map<string, FeedCard>();
  for (const c of cards) cardMap.set(c.repo, c);

  // 更新标签权重
  const applyDelta = (repos: string[], delta: number) => {
    for (const repo of repos) {
      const card = cardMap.get(repo);
      if (!card) continue;
      for (const tag of card.tags || []) {
        // 只对 LLM 来源标签做较大调整
        const factor = tag.source === "llm" ? 1.0 : 0.5;
        const current = tagWeights[tag.name] ?? DEFAULT_TAG_WEIGHT;
        tagWeights[tag.name] = Math.max(0.01, Math.min(1.0, current + delta * factor));
      }
      // 同时也更新旧的 interests（向后兼容）
      if (card.aiDim) {
        const old = profile.interests;
        if (/^(AI|模型|RAG|推理)/.test(card.aiDim)) {
          profile.interests.ai = Math.max(0.01, Math.min(0.9, old.ai + delta * 0.3));
        } else if (/非AI-好玩|游戏/.test(card.aiDim)) {
          profile.interests.fun = Math.max(0.01, Math.min(0.9, old.fun + delta * 0.3));
        } else {
          profile.interests.practical = Math.max(0.01, Math.min(0.9, old.practical + delta * 0.3));
        }
      }
    }
  };

  applyDelta(feedback.likes, 0.03);
  applyDelta(feedback.bookmarks ?? [], 0.05);
  applyDelta(feedback.dislikes, -0.05);

  // 时间衰减
  const daysSinceActive = profile.lastActiveTs
    ? Math.floor((Date.now() - new Date(profile.lastActiveTs).getTime()) / (24 * 3600 * 1000))
    : 0;
  tagWeights = decayTagWeights(tagWeights, daysSinceActive);

  return {
    ...profile,
    tagWeights,
    bookmarks: [...new Set([...(profile.bookmarks || []), ...(feedback.bookmarks || [])])],
    lastActiveTs: new Date().toISOString(),
  };
}
