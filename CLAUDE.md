# CLAUDE.md

## Project overview

GitTok (repo: gittok) is an open-source "TikTok" for GitHub — it aggregates the best projects from GitHub and the AI ecosystem daily, scores them with a free LLM, and delivers them as an addictive Chinese card feed (browsing GitHub feels like swiping short videos). A GitHub Actions cron job runs at 20:00 UTC (04:00 CST) and produces bilingual (Chinese + English) digest reports, committed Markdown files, and `data/feed.json` for the React frontend.

## Commands

```bash
pnpm start          # run the full digest + feed pipeline locally
pnpm test           # vitest (unit tests)
pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint
pnpm lint:fix       # ESLint --fix
pnpm format         # Prettier --write src
pnpm format:check   # Prettier --check src
pnpm close-stale    # close open issues older than 1 day (daily-digest.yml step)
```

Required env vars for local runs:

```bash
export GITHUB_TOKEN=ghp_xxxxx
export DIGEST_REPO=owner/repo   # omit to skip GitHub issue creation

# LLM provider (CI uses zhipu)
export LLM_PROVIDER=zhipu   # zhipu | deepseek | openai | anthropic | openrouter | github-copilot | agnes

# Zhipu (default, free: GLM-4.7-Flash, key from https://open.bigmodel.cn)
export ZHIPU_API_KEY=xxxxx
export ZHIPU_MODEL=glm-4.7-flash

# DeepSeek
# export DEEPSEEK_API_KEY=sk-xxxxx

# OpenAI
# export OPENAI_API_KEY=sk-xxxxx

# Anthropic
# export ANTHROPIC_API_KEY=sk-ant-xxxxx

# OpenRouter
# export OPENROUTER_API_KEY=sk-or-xxxxx

# Agnes (legacy fallback)
# export AGNES_API_KEY=sk-xxxxx
```

Local run requires proxy env for GitHub API on this machine (Clash 127.0.0.1:7890):
`export HTTP_PROXY=http://127.0.0.1:7890 HTTPS_PROXY=http://127.0.0.1:7890 NODE_OPTIONS="--use-env-proxy"`

## Architecture

The pipeline has two parts:

**1. Digest reports** (`src/index.ts`, four sequential phases):
1. **`fetchAllData`** — all network I/O in parallel: GitHub API for 23 tracked repos, Claude Code Skills, Anthropic/OpenAI sitemaps, GitHub Trending HTML + Search API, Hacker News Algolia API.
2. **`generateSummaries`** — per-repo LLM calls, serial (LLM_CONCURRENCY = 1), rate-limited by a queue in `src/report.ts`.
3. **Comparisons** — LLM calls for cross-tool CLI comparison and OpenClaw cross-ecosystem comparison.
4. **Save phase** — `buildCliReportContent` / `buildOpenclawReportContent` (in `src/report-builders.ts`) build Markdown strings; `saveWebReport` / `saveTrendingReport` / `saveHnReport` (in `src/report-savers.ts`) call LLM + write file + create GitHub Issue.

**2. Feed generation** (`src/feed/index.ts`):
- Merges fetched repos + LLM scoring + classification + personalization → `data/feed.json` (read by the React frontend).
- Incremental: loads baseline from previous `data/feed.json`, reuses cached scores, only scores new repos. Failed scores go into `data/pending-retry.json` (committed) for retry next run.
- Failed cards never silently drop — see pending-retry queue (cap 300, give up after 7 consecutive failures).

## Source files

| File | Responsibility |
|------|---------------|
| `src/index.ts` | Orchestration: repo config, phase functions, `main()` |
| `src/i18n.ts` | Centralized bilingual strings: `Lang` type, report titles, issue labels, footer text, `REPORT_LABELS`, `NOTIFY_LABELS` |
| `src/github.ts` | GitHub API helpers: `fetchRecentItems`, `fetchRecentReleases`, `fetchSkillsData`, `createGitHubIssue`, `closeStaleIssues`; shared `RepoFetch` type |
| `src/prompts.ts` | LLM prompt builders for repo reports: `buildCliPrompt`, `buildPeerPrompt`, `buildComparisonPrompt`, `buildPeersComparisonPrompt`, `buildSkillsPrompt` |
| `src/prompts-data.ts` | LLM prompt builders for data-source reports: `buildTrendingPrompt`, `buildWebReportPrompt`, `buildHnPrompt`, `buildWeeklyPrompt`, `buildMonthlyPrompt` |
| `src/report.ts` | `callLlm` (with concurrency limiter), `saveFile`, `autoGenFooter` (uses i18n), LLM token budget constants |
| `src/report-builders.ts` | `buildCliReportContent`, `buildOpenclawReportContent` — assemble final Markdown strings for CLI and OpenClaw reports |
| `src/report-savers.ts` | `saveWebReport`, `saveTrendingReport`, `saveHnReport` — LLM call + file save + optional GitHub issue |
| `src/feed/index.ts` | Feed generation: merge, LLM scoring, classification, incremental baseline, pending-retry queue |
| `src/feed/personalize.ts` | Personalization sorting (feedback loop) |
| `src/feed/prompts.ts` | LLM scoring prompt (Chinese summaries, 20-35 char summary / 100-150 char reason) |
| `src/date.ts` | Date and timing utilities: `toCstDateStr`, `toUtcStr`, `sleep` |
| `src/rollup.ts` | Weekly and monthly rollup report generator |
| `src/providers/types.ts` | `LlmProvider` interface, `ProviderName` type, `VALID_PROVIDER_NAMES` |
| `src/providers/openai-compatible.ts` | `OpenAICompatibleProvider` — shared base class for OpenAI-compatible providers |
| `src/providers/zhipu.ts` | `ZhipuProvider` — Zhipu AI (open.bigmodel.cn), OpenAI-compatible, default model `glm-4.7-flash` |
| `src/providers/agnes.ts` | `AgnesProvider` — legacy agnès free gateway (kept for one-line rollback) |
| `src/providers/anthropic.ts` | `AnthropicProvider` — Anthropic SDK wrapper |
| `src/providers/openai.ts` | `OpenAIProvider` — extends `OpenAICompatibleProvider` |
| `src/providers/github-copilot.ts` | `GitHubCopilotProvider` — extends `OpenAICompatibleProvider` |
| `src/providers/openrouter.ts` | `OpenRouterProvider` — extends `OpenAICompatibleProvider` |
| `src/providers/deepseek.ts` | `DeepSeekProvider` — extends `OpenAICompatibleProvider` |
| `src/providers/index.ts` | `createProvider` factory + barrel re-exports |
| `src/web.ts` | Sitemap-based web content fetching; state persisted to `digests/web-state.json` |
| `src/trending.ts` | GitHub Trending HTML scraper + Search API topic queries |
| `src/hn.ts` | Hacker News top AI stories via Algolia HN Search API |
| `src/bigbro-stars.ts` | In-library star stamping fetcher (Starred API; stamps existing cards only, no new cards) |
| `src/generate-manifest.ts` | Generates `manifest.json` and `feed.xml` (RSS 2.0 feed) |

## Report outputs

Files written to `digests/YYYY-MM-DD/`:

| File | Label | Notes |
|------|-------|-------|
| `ai-cli.md` | `digest` | Always generated |
| `ai-agents.md` | `openclaw` | Always generated |
| `ai-web.md` | `web` | Skipped if no new sitemap content |
| `ai-trending.md` | `trending` | Skipped if both data sources fail |
| `ai-hn.md` | `hn` | Skipped if Algolia fetch fails |

## Tracked sources

- **CLI_REPOS** (9): claude-code, codex, gemini-cli, copilot-cli, kimi-cli, opencode, pi, qwen-code, deepseek-tui
- **OPENCLAW** + **OPENCLAW_PEERS** (13): openclaw/openclaw + 12 peer projects (sorted by stars)
- **CLAUDE_SKILLS_REPO**: anthropics/skills — no date filter, sorted by popularity
- **Web**: anthropic.com + openai.com via sitemap, state in `digests/web-state.json`
- **Trending**: github.com/trending (HTML) + GitHub Search API (21 topic queries, 7-day window)
- **In-library star stamping**: the pipeline pulls each in-library GitHub **User** owner's latest starred page and stamps matching existing cards with `bigbros` (no new cards, no LLM); state in `data/stamped-owners.json`
- **HN**: Algolia HN Search API — 6 parallel queries, top-30 AI stories by points, last 24h

## Key conventions

- All bilingual strings (titles, labels, footers, messages) are centralized in `src/i18n.ts`. Use the `Lang` type (`"zh" | "en"`) and `Record<Lang, string>` maps. Do not add inline bilingual ternaries elsewhere.
- LLM prompt builders are split across two files: `src/prompts.ts` (repo-level prompts) and `src/prompts-data.ts` (data-source and rollup prompts). Each report type has its own builder function.
- `callLlm(prompt, maxTokens?)` defaults to 4096 tokens. Web report uses 8192, trending uses 6144. HN report uses the default 4096.
- On 429 rate-limit errors `callLlm` retries up to 3 times with exponential backoff (15 s / 30 s / 60 s); the concurrency slot is released during the wait.
- The concurrency limiter (`LLM_CONCURRENCY = 1`) prevents 429s — the free Zhipu tier rate-limits hard at higher concurrency. Do not bypass it by calling SDK clients directly.
- LLM provider is selected via `LLM_PROVIDER` env var (CI sets `zhipu`). Valid values: `zhipu`, `deepseek`, `openai`, `anthropic`, `openrouter`, `github-copilot`, `agnes`.
- Provider implementations live in `src/providers/`. Each file implements the `LlmProvider` interface. The factory in `src/providers/index.ts` validates the provider name and logs only the provider name — never API keys or endpoint URLs.
- GitHub issue label colors are defined in `LABEL_COLORS` in `src/github.ts`. Add new labels there.
- `sampleNote(total, sampled)` in `src/prompts.ts` formats the "(共 N 条，展示前 M 条)" note. Reuse it — do not inline the same string format.
- Web state (`digests/web-state.json`) is committed to git on every run. It is the source of truth for which URLs have been seen. Do NOT gitignore it — CI runs from a clean checkout and an empty state forces a full re-crawl every run.
- Feed data (`data/feed.json`, `data/pending-retry.json`, `data/stamped-owners.json`, `digests/web-state.json`) is committed by the digest workflow. Local pipeline runs write `data/` — always `git checkout -- data/` after local runs. (`data/following.json` is retired — the frontend no longer reads it.)

## Web UI & RSS Feed

- Web UI: `web/` is a React + Vite app (not the legacy `index.html`). It reads `data/feed.json` and renders a virtualized card feed with sections (Recommended / Hot / Daily / Following + AI / Fun / Tools / Learning), like/dislike/bookmark with localStorage snapshots, weighted search, and a creator page.
- RSS Feed: `feed.xml` at the repo root. Generated by `src/generate-manifest.ts` in the same `pnpm manifest` step. Contains the latest 30 items (newest first) across all report types. Item links use hash routing: `https://chestnuts-sisyphus.github.io/gittok/#YYYY-MM-DD/report`.
- Both `manifest.json` and `feed.xml` are committed together in the "Commit manifest and feed" GHA step.
- The `REPORT_LABELS` map in `src/i18n.ts` must be kept in sync with the `LABELS` object when adding new report types.

## Adding a new report type

1. Create a data fetcher (or add to an existing one).
2. Add a `buildXxxPrompt` function in `src/prompts-data.ts` (for data-source prompts) or `src/prompts.ts` (for repo-level prompts).
3. Add bilingual strings (titles, labels, issue title function) to `src/i18n.ts`.
4. Add a `saveXxxReport` function in `src/report-savers.ts`.
5. Wire into `fetchAllData`, `generateSummaries`, and the save phase in `src/index.ts`.
6. Add a label color entry in `LABEL_COLORS` in `src/github.ts`.
7. Add the report ID and label to `REPORT_LABELS` in `src/i18n.ts` and `LABELS` in `index.html`.
8. Add the report file name to `REPORT_FILES` in `src/generate-manifest.ts`.
9. Update both README files and this file.
