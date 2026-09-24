/**
 * Loads and validates GitTok configuration from config.yml.
 * Falls back to built-in defaults if the file is missing or a section is absent.
 */

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { RepoConfig } from "./github.ts";
import { assertNoParentTraversal } from "./safe-path.ts";

// ---------------------------------------------------------------------------
// Schema types
// ---------------------------------------------------------------------------

interface RawRepoEntry {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}

interface RawConfig {
  cli_repos?: RawRepoEntry[];
  skills_repo?: string;
  openclaw?: RawRepoEntry;
  openclaw_peers?: RawRepoEntry[];
  bigbros?: string[];
  following_user?: string;
  trending_topics?: { q: string; label: string; quota?: number }[];
  star_threshold?: number;
  interests?: { ai?: number; fun?: number; practical?: number; ai_interests_text?: string };
}

export interface TrendingTopic {
  q: string;
  label: string;
  quota?: number;
}

export interface InterestProfile {
  ai: number;
  fun: number;
  practical: number;
  aiInterestsText: string;
}

export interface RadarConfig {
  cliRepos: RepoConfig[];
  skillsRepo: string;
  openclaw: RepoConfig;
  openclawPeers: RepoConfig[];
  bigbros: string[];
  /** 用于自动同步关注名单的 GitHub 账号（其 follow 列表 ∪ bigbros 构成大牛名单） */
  followingUser?: string;
  trendingTopics: TrendingTopic[];
  starThreshold: number;
  interests: InterestProfile;
}

// ---------------------------------------------------------------------------
// Defaults (mirrors the original hard-coded values)
// ---------------------------------------------------------------------------

const DEFAULT_CLI_REPOS: RepoConfig[] = [
  { id: "claude-code", repo: "anthropics/claude-code", name: "Claude Code" },
  { id: "codex", repo: "openai/codex", name: "OpenAI Codex" },
  { id: "gemini-cli", repo: "google-gemini/gemini-cli", name: "Gemini CLI" },
  { id: "copilot-cli", repo: "github/copilot-cli", name: "GitHub Copilot CLI" },
  { id: "kimi-cli", repo: "MoonshotAI/kimi-cli", name: "Kimi Code CLI" },
  { id: "opencode", repo: "anomalyco/opencode", name: "OpenCode" },
  { id: "qwen-code", repo: "QwenLM/qwen-code", name: "Qwen Code" },
];

const DEFAULT_SKILLS_REPO = "anthropics/skills";

const DEFAULT_OPENCLAW: RepoConfig = {
  id: "openclaw",
  repo: "openclaw/openclaw",
  name: "OpenClaw",
  paginated: true,
};

const DEFAULT_OPENCLAW_PEERS: RepoConfig[] = [
  { id: "nanobot", repo: "HKUDS/nanobot", name: "NanoBot", paginated: true },
  { id: "hermes-agent", repo: "nousresearch/hermes-agent", name: "Hermes Agent" },
  { id: "picoclaw", repo: "sipeed/picoclaw", name: "PicoClaw", paginated: true },
  { id: "nanoclaw", repo: "qwibitai/nanoclaw", name: "NanoClaw" },
  { id: "nullclaw", repo: "nullclaw/nullclaw", name: "NullClaw" },
  { id: "ironclaw", repo: "nearai/ironclaw", name: "IronClaw" },
  { id: "lobsterai", repo: "netease-youdao/LobsterAI", name: "LobsterAI" },
  { id: "tinyclaw", repo: "TinyAGI/tinyclaw", name: "TinyClaw" },
  { id: "copaw", repo: "agentscope-ai/CoPaw", name: "CoPaw" },
  { id: "moltis", repo: "moltis-org/moltis", name: "Moltis" },
  { id: "zeptoclaw", repo: "qhkm/zeptoclaw", name: "ZeptoClaw" },
  { id: "easyclaw", repo: "gaoyangz77/easyclaw", name: "EasyClaw" },
  { id: "zeroclaw", repo: "zeroclaw-labs/zeroclaw", name: "ZeroClaw" },
];

// ---------------------------------------------------------------------------
// Defaults — 开源版抖音信息流扩展
// ---------------------------------------------------------------------------

const DEFAULT_TRENDING_TOPICS: TrendingTopic[] = [
  // AI 核心（保留）
  { q: "topic:llm", label: "llm", quota: 50 },
  { q: "topic:ai-agent", label: "ai-agent", quota: 50 },
  { q: "topic:rag", label: "rag", quota: 50 },
  { q: "topic:vector-database", label: "vector-db", quota: 50 },
  { q: "topic:large-language-model", label: "llm-model", quota: 50 },
  { q: "topic:machine-learning", label: "ml", quota: 50 },
  // 非 AI 领域（内容多样性扩容）
  { q: "topic:game", label: "game", quota: 50 },
  { q: "topic:database", label: "database", quota: 50 },
  { q: "topic:security", label: "security", quota: 50 },
  { q: "topic:devops", label: "devops", quota: 50 },
  { q: "topic:frontend", label: "frontend", quota: 50 },
  { q: "topic:backend", label: "backend", quota: 50 },
  { q: "topic:self-hosted", label: "self-hosted", quota: 50 },
  { q: "topic:developer-tools", label: "developer-tools", quota: 50 },
  { q: "topic:command-line", label: "command-line", quota: 50 },
  { q: "topic:automation", label: "automation", quota: 50 },
  { q: "topic:design", label: "design", quota: 50 },
  { q: "topic:mobile", label: "mobile", quota: 50 },
  { q: "topic:desktop", label: "desktop", quota: 50 },
  { q: "topic:data-visualization", label: "data-visualization", quota: 50 },
  { q: "topic:web-framework", label: "web-framework", quota: 50 },
];

const DEFAULT_BIGBROS: string[] = [];

const DEFAULT_FOLLOWING_USER = "";

const DEFAULT_STAR_THRESHOLD = 100;

const DEFAULT_INTERESTS: InterestProfile = {
  ai: 0.4,
  fun: 0.3,
  practical: 0.3,
  aiInterestsText: "AI、好玩的、实用的、各行各业的开源项目都想看",
};

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

export function toRepoConfig(e: RawRepoEntry): RepoConfig {
  return { id: e.id, repo: e.repo, name: e.name, ...(e.paginated ? { paginated: true } : {}) };
}

export function loadConfig(configPath = "config.yml"): RadarConfig {
  // 五轮 T7 乙B4：**读**路径的两道边界。这里刻意**不**做「必须在项目目录内」的无条件硬限制——
  // 绝对路径是既有用法（单测 `loadConfig("/nonexistent/config.yml")` 钉着「找不到就回落默认值」，
  // 命令行显式传路径也是产品行为）；能改这个入参的人已经能在这台机器上执行命令了。
  // 规则：① 任何形式都禁「上级目录段」；② **相对**路径解析后必须落在工作目录内
  //      （相对路径越界只可能是 `..` 或环境异常，没有正当用法）。由见 src/safe-path.ts。
  assertNoParentTraversal(configPath, "configPath");
  const resolved = path.resolve(configPath);
  const root = process.cwd();
  if (!path.isAbsolute(configPath) && resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error(`config 相对路径越出工作目录：${resolved}`);
  }

  if (!fs.existsSync(resolved)) {
    console.log(`[config] ${configPath} not found — using built-in defaults.`);
    return {
      cliRepos: DEFAULT_CLI_REPOS,
      skillsRepo: DEFAULT_SKILLS_REPO,
      openclaw: DEFAULT_OPENCLAW,
      openclawPeers: DEFAULT_OPENCLAW_PEERS,
      bigbros: DEFAULT_BIGBROS,
      followingUser: DEFAULT_FOLLOWING_USER,
      trendingTopics: DEFAULT_TRENDING_TOPICS,
      starThreshold: DEFAULT_STAR_THRESHOLD,
      interests: DEFAULT_INTERESTS,
    };
  }

  const raw = yaml.load(fs.readFileSync(resolved, "utf-8")) as RawConfig;

  const cliRepos =
    Array.isArray(raw?.cli_repos) && raw.cli_repos.length > 0
      ? raw.cli_repos.map(toRepoConfig)
      : DEFAULT_CLI_REPOS;

  const skillsRepo =
    typeof raw?.skills_repo === "string" && raw.skills_repo.trim()
      ? raw.skills_repo.trim()
      : DEFAULT_SKILLS_REPO;

  const openclaw = raw?.openclaw?.id && raw.openclaw.repo ? toRepoConfig(raw.openclaw) : DEFAULT_OPENCLAW;

  const openclawPeers =
    Array.isArray(raw?.openclaw_peers) && raw.openclaw_peers.length > 0
      ? raw.openclaw_peers.map(toRepoConfig)
      : DEFAULT_OPENCLAW_PEERS;

  const trendingTopics =
    Array.isArray(raw?.trending_topics) && raw.trending_topics.length > 0
      ? raw.trending_topics.map((t) => ({
          q: t.q,
          label: t.label,
          ...(t.quota !== undefined ? { quota: t.quota } : {}),
        }))
      : DEFAULT_TRENDING_TOPICS;

  const configBigbros = Array.isArray(raw?.bigbros)
    ? raw.bigbros.filter((b): b is string => typeof b === "string" && b.trim() !== "")
    : DEFAULT_BIGBROS;

  // 环境变量 BIGBROS（逗号分隔）优先，便于在 Actions Secrets 里覆盖
  const envBigbros =
    process.env["BIGBROS"]
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  const bigbros = envBigbros.length > 0 ? envBigbros : configBigbros;

  // following_user：config.yml 配置 + 环境变量 FOLLOWING_USER 覆盖（env 优先，模式同 BIGBROS）
  const configFollowingUser =
    typeof raw?.following_user === "string" && raw.following_user.trim()
      ? raw.following_user.trim()
      : DEFAULT_FOLLOWING_USER;
  const envFollowingUser = process.env["FOLLOWING_USER"]?.trim() ?? "";
  const followingUser = envFollowingUser !== "" ? envFollowingUser : configFollowingUser;

  const starThreshold = typeof raw?.star_threshold === "number" ? raw.star_threshold : DEFAULT_STAR_THRESHOLD;

  const interests: InterestProfile = {
    ai: raw?.interests?.ai ?? DEFAULT_INTERESTS.ai,
    fun: raw?.interests?.fun ?? DEFAULT_INTERESTS.fun,
    practical: raw?.interests?.practical ?? DEFAULT_INTERESTS.practical,
    aiInterestsText: raw?.interests?.ai_interests_text ?? DEFAULT_INTERESTS.aiInterestsText,
  };

  console.log(
    `[config] Loaded from ${configPath}: ` +
      `${cliRepos.length} CLI repos, ${openclawPeers.length} OpenClaw peers, ` +
      `${trendingTopics.length} trending topics, ${bigbros.length} bigbros, ` +
      `following_user=${followingUser || "(none)"}`,
  );

  return {
    cliRepos,
    skillsRepo,
    openclaw,
    openclawPeers,
    bigbros,
    followingUser,
    trendingTopics,
    starThreshold,
    interests,
  };
}
