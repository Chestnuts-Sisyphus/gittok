# GitTok — 开源版抖音信息流，用中文刷 GitHub 好项目

[English](./README.md) | **中文**

> GitTok 每天自动聚合 GitHub 与全球 AI 生态的好项目，用中文推荐、分类、评分——刷 GitHub 像刷短视频一样上瘾有趣：每天都有新发现，越刷越懂你。

## ✨ 特性

- 🃏 **上瘾卡片流**：卡片式浏览 + 个性化推荐，刷 GitHub 像刷短视频一样上瘾；点赞/点踩/收藏
- 🧠 **AI 中文推荐**：LLM 自动评分（智谱 GLM-4.7-Flash，免费），为每个项目写中文总结
- 🗂️ **智能分区**：动态频道（推荐 / 热门 / 每日 / 乐趣 / 关注）+ 分区（AI / 资源 / 工具 / 创意）
- 👤 **个性化**：你的点赞点踩会训练专属推荐（localStorage，无需账号）
- ⭐ **关注**：关注你喜欢的创作者，TA 的项目和 TA star 过的库内项目进你的「关注」频道（关注保存在本机浏览器，无需账号）
- 🔍 **搜索**：全库搜索，加权排序
- 📱 **移动端适配**：小屏底栏导航 + 频道抽屉
- 🌍 **多数据源**：GitHub Trending + Search、Hacker News、Product Hunt、ArXiv、Hugging Face、Dev.to、Lobsters、Anthropic/OpenAI

## 🚀 在线体验

**🌐 [https://chestnuts-sisyphus.github.io/gittok/](https://chestnuts-sisyphus.github.io/gittok/)**

无需登录，每天 08:00 CST 自动更新数据。

## 🏗️ 架构

```
GitHub Actions (daily-digest.yml) 每天 08:00 CST
  ├─ 并行抓取 10+ 数据源（GitHub/HN/PH/ArXiv/HF/Dev.to/...）
  ├─ LLM 中文评分（智谱 GLM-4.7-Flash，免费）
  ├─ 生成 digests/ 日报 + data/feed.json（信息流数据）
  ├─ 自动提交 + 部署 GitHub Pages
  └─ 推送 Telegram / 飞书 / RSS
```

| 模块 | 说明 |
|------|------|
| `src/` | 数据管道（抓取 / LLM 评分 / feed 生成） |
| `web/` | React 前端（信息流 UI） |
| `data/feed.json` | 信息流数据（前端读取） |
| `digests/` | 每日日报 Markdown |
| `.github/workflows/` | 每日流水线 + Pages 部署 |

## 📦 本地开发

```bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量（复制 .env.example 为 .env）
cp .env.example .env
# 填入 ZHIPU_API_KEY（免费档：https://open.bigmodel.cn 智谱开放平台 → API 密钥）
# 填入 GITHUB_TOKEN（可选，用于搜索 API 提额）

# 3. 跑完整数据管道
LLM_PROVIDER=zhipu pnpm start

# 4. 前端开发
cd web && pnpm install && pnpm dev
```

## 🔑 环境变量

| 变量 | 必填 | 说明 |
|------|------|------|
| `LLM_PROVIDER` | 否 | `zhipu`（CI 已配置）。其他可选：`deepseek` / `openai` / `anthropic` / `openrouter` / `github-copilot` |
| `ZHIPU_API_KEY` | 是 | 智谱 API Key（GLM-4.7-Flash 永久免费） |
| `ZHIPU_MODEL` | 否 | 默认 `glm-4.7-flash` |
| `GITHUB_TOKEN` | 否 | GitHub Token（提高 API 限额） |
| `DIGEST_REPO` | 否 | 日报推送的仓库（默认本仓库） |

## 📄 数据源

| 来源 | 类型 | 数据 |
|------|------|------|
| [GitHub Search](https://github.com/search) | REST API | 21 个主题查询（AI + 游戏/数据库/安全/DevOps/...） |
| [GitHub Trending](https://github.com/trending) | HTML | 每日热门仓库 |
| [GitHub Stars](https://docs.github.com/rest/activity/starring) | REST API | 库内创作者的 star 盖章（给已有卡片加背书，不新增卡片） |
| [Hacker News](https://news.ycombinator.com) | Algolia API | Top AI 热帖 |
| [Product Hunt](https://www.producthunt.com) | GraphQL API | 昨日 AI 产品 |
| [ArXiv](https://arxiv.org) | ArXiv API | cs.AI/cs.CL/cs.LG 最新论文 |
| [Hugging Face](https://huggingface.co) | Hub API | 热门模型 |
| [Dev.to](https://dev.to) | Forem API | AI/LLM 热门文章 |
| [Lobste.rs](https://lobste.rs) | JSON API | AI/ML 内容 |
| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Sitemap | 新文章（增量抓取） |

## 🎯 「Tok」是什么意思？

GitTok 不是全屏沉浸的 TikTok 复制品——**「Tok」是那种感觉**：刷 GitHub 项目应该像刷短视频一样上瘾有趣。GitTok 用算法驱动的卡片流实现这种感觉：个性化推荐、每个项目的中文解读、每天都有新精选。刷 GitHub 像刷短视频一样上头，但保留信息流的密度。

## 📜 技术栈

- **后端**：Node.js + TypeScript，GitHub Actions 定时驱动
- **前端**：React + Vite，GitHub Pages 部署
- **LLM**：智谱 GLM-4.7-Flash（OpenAI 兼容端点，永久免费）

## 📝 许可证

MIT License

---

*项目前身为 [agents-radar](https://github.com/duanyytop/agents-radar)，由 [Chestnuts-Sisyphus](https://github.com/Chestnuts-Sisyphus) 改造为 GitTok 信息流产品。*
