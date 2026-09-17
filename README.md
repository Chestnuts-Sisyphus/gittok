# GitTok — An open-source "TikTok" for GitHub, in Chinese

**English** | [中文](./README.zh.md)

> GitTok automatically aggregates the best projects from GitHub and the global AI ecosystem every day — with LLM-powered Chinese summaries, classification, and scoring. Browsing GitHub feels like swiping short videos: fun, addictive, and always something new.

## ✨ Features

- 🃏 **Addictive card feed**: card-based browsing with personalized recommendations — the thrill of short videos, the density of a real feed. Like / dislike / bookmark
- 🧠 **AI Chinese recommendations**: LLM scoring (Zhipu GLM-4.7-Flash, free) writes a Chinese summary for every project
- 🗂️ **Smart sections**: Dynamic channels (Recommended / Hot / Daily / Fun / Following) + Zones (AI / Resources / Tools / Creative)
- 👤 **Personalization**: your likes and dislikes train a personal feed (localStorage, no account needed)
- ⭐ **Following**: follow creators you like — their projects and in-library repos they starred land in your Following channel (stored in your browser, no account needed)
- 🔍 **Search**: full-library search with weighted ranking
- 📱 **Mobile-ready**: bottom navigation + channel drawer on small screens
- 🌍 **Multi-source**: GitHub Trending + Search, Hacker News, Product Hunt, ArXiv, Hugging Face, Dev.to, Lobsters, Anthropic/OpenAI

## 🚀 Live demo

**🌐 [https://chestnuts-sisyphus.github.io/gittok/](https://chestnuts-sisyphus.github.io/gittok/)**

No login required. Data updates automatically every day at 08:00 CST.

## 🏗️ Architecture

```
GitHub Actions (daily-digest.yml) — daily 08:00 CST
  ├─ Fetch 10+ sources in parallel (GitHub / HN / PH / ArXiv / HF / Dev.to / ...)
  ├─ LLM scoring in Chinese (Zhipu GLM-4.7-Flash, free)
  ├─ Generate digests/ daily reports + data/feed.json (feed data)
  ├─ Auto commit + deploy to GitHub Pages
  └─ Push to Telegram / Feishu / RSS
```

| Module | Description |
|------|------|
| `src/` | Data pipeline (fetch / LLM scoring / feed generation) |
| `web/` | React frontend (feed UI) |
| `data/feed.json` | Feed data (read by the frontend) |
| `digests/` | Daily digest reports (Markdown) |
| `.github/workflows/` | Daily pipeline + Pages deployment |

## 📦 Local development

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment (copy .env.example to .env)
cp .env.example .env
# Fill in ZHIPU_API_KEY (free tier: https://open.bigmodel.cn — Zhipu AI console → API Keys)
# Fill in GITHUB_TOKEN (optional, raises API rate limits)

# 3. Run the full pipeline
LLM_PROVIDER=zhipu pnpm start

# 4. Frontend
cd web && pnpm install && pnpm dev
```

## 🔑 Environment variables

| Variable | Required | Description |
|------|------|------|
| `LLM_PROVIDER` | No | `zhipu` (used in CI). Other options: `deepseek` / `openai` / `anthropic` / `openrouter` / `github-copilot` |
| `ZHIPU_API_KEY` | Yes | Zhipu AI API key (GLM-4.7-Flash is permanently free) |
| `ZHIPU_MODEL` | No | Default `glm-4.7-flash` |
| `GITHUB_TOKEN` | No | GitHub token (raises API rate limits) |
| `DIGEST_REPO` | No | Repo receiving digest reports (default: this repo) |

## 📄 Data sources

| Source | Type | Data |
|------|------|------|
| [GitHub Search](https://github.com/search) | REST API | 21 topic queries (AI + games / database / security / devops / ...) |
| [GitHub Trending](https://github.com/trending) | HTML | Daily trending repositories |
| [GitHub Stars](https://docs.github.com/rest/activity/starring) | REST API | In-library creators' starred repos stamp existing cards (endorsements, no new cards) |
| [Hacker News](https://news.ycombinator.com) | Algolia API | Top AI stories |
| [Product Hunt](https://www.producthunt.com) | GraphQL API | Yesterday's AI products |
| [ArXiv](https://arxiv.org) | ArXiv API | Latest cs.AI / cs.CL / cs.LG papers |
| [Hugging Face](https://huggingface.co) | Hub API | Trending models |
| [Dev.to](https://dev.to) | Forem API | Popular AI/LLM articles |
| [Lobste.rs](https://lobste.rs) | JSON API | AI/ML content |
| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Sitemap | New articles (incremental crawl) |

## 🎯 What does "Tok" mean?

GitTok is not a fullscreen clone of TikTok. **"Tok" is the feeling**: browsing GitHub projects should be as fun and addictive as scrolling short videos. GitTok delivers that with an algorithm-driven card feed — personalized recommendations, Chinese summaries for every project, and fresh picks every day. Swipe through GitHub like short videos, with the density of a real feed.

## 📜 Tech stack

- **Backend**: Node.js + TypeScript, driven by GitHub Actions cron
- **Frontend**: React + Vite, deployed on GitHub Pages
- **LLM**: Zhipu GLM-4.7-Flash (OpenAI-compatible endpoint, permanently free)

## 📝 License

MIT License

---

*Forked from [agents-radar](https://github.com/duanyytop/agents-radar), reimagined as GitTok by [Chestnuts-Sisyphus](https://github.com/Chestnuts-Sisyphus).*
