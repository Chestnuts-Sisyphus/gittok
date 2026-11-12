# AI 开源趋势日报 2026-11-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-12 01:44 UTC

---

# 📊 AI 开源趋势日报 (2026-11-12)

---

## 💡 今日速览

今日 AI 开源社区呈现出明显的 **“Agent 体系化”** 与 **“成本/上下文极致优化”** 双重浪潮。Anthropic 官方与社区领袖（如 Addy Osmani）同步推力，使得 **Agent Skill（智能体技能库）与 Harness（驾驭套件）** 成为绝对的热门焦点；同时，面向长会话的上下文压缩技术、模型智能网关及安全沙盒演进迅猛。此外，AI 智能体正在加速渗透至 **网页自动化** 与 **智能家居（MCP 协议）** 等落地场景。

---

## 📌 各维度热门项目

### 🔧 AI 基础工具
* **[meta/astryx](https://github.com/meta/astryx)** [TypeScript]  
  ⭐ 25,064（今日 +2,776）  
  **一句话说明**：完全可定制且天然支持 AI Agent 的开源设计系统，针对 AI 自动生成/理解 UI 界面进行了底层适配。
* **[ranxianglei/billion-context](https://github.com/ranxianglei/billion-context)** [TypeScript]  
  ⭐ 6,853（今日 +710）  
  **一句话说明**：专为月级长会话设计的上下文压缩插件，能在 100K 小窗口下实现十亿级 Token 的会话历史保留，大幅削减 API 成本。
* **[experientiallabs/experiential](https://github.com/experientiallabs/experiential)** [Python]  
  ⭐ 16,580（今日 +589）  
  **一句话说明**：开源无溢价模型网关，支持自托管及 1000+ 市场模型，可通过分析请求流量自适应降低成本并推荐/训练专用模型。
* **[opensandbox-group/OpenSandbox](https://github.com/opensandbox-group/OpenSandbox)** [Go]  
  ⭐ 17,206（今日 +97）  
  **一句话说明**：面向 AI Agent 的安全、高效且易扩展的代码执行沙盒运行时，解决 AI 智能体执行任意代码的安全隐患。
* **[ollama/ollama](https://github.com/ollama/ollama)** [Go]  
  ⭐ 186,705  
  **一句话说明**：轻量级本地大模型运行框架，持续更新对主流开源大语言模型（如 DeepSeek、Qwen、Gemma 等）的一键部署支持。

---

### 🤖 AI 智能体/工作流
* **[anthropics/skills](https://github.com/anthropics/skills)** [Python]  
  ⭐ 193,163（今日 +1,032）  
  **一句话说明**：Anthropic 官方开源的 Agent Skills 公开仓库，定义了生产级智能体所必备的标准动作与扩展技能库。
* **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** [JavaScript]  
  ⭐ 115,979（今日 +787）  
  **一句话说明**：由 Google 工程总监维护，专为 AI 编程 Agent 设计的生产级工程技能（Engineering Skills）集合。
* **[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)** [Rust]  
  ⭐ 49,895（今日 +708）  
  **一句话说明**：Vercel Labs 出品的 Rust 编写高效浏览器自动化 CLI 工具，专为 AI Agent 操作 DOM 和网络请求设计。
* **[browser-use/browser-use](https://github.com/browser-use/browser-use)** [Python]  
  ⭐ 120,743（今日 +172）  
  **一句话说明**：热门的 AI 网页操作智能体 Python 库，配合云端隐匿浏览器与 API 托管服务，实现自动化的复杂 Web 交互。
* **[affaan-m/ECC](https://github.com/affaan-m/ECC)** [JavaScript]  
  ⭐ 301,403  
  **一句话说明**：Agent Harness 性能优化系统，针对 Claude Code、Codex、Cursor 等工具提供技能、记忆与安全策略的深度增强。

---

### 📦 AI 应用与场景解决方案
* **[homeassistant-ai/ha-mcp](https://github.com/homeassistant-ai/ha-mcp)** [Python]  
  ⭐ 7,389（今日 +645）  
  **一句话说明**：借助 MCP 协议，通过 Claude、ChatGPT 等 AI 智能体直接对 Home Assistant 智能家居系统进行自然语言配置与自动化控制。
* **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)** [Python]  
  ⭐ 70,303（今日 +278）  
  **一句话说明**：LLM 驱动的多市场股票智能分析系统，集成多源行情、实时新闻看板与零成本自动化定时推送。
* **[Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI)** [JavaScript]  
  ⭐ 34,154（今日 +238）  
  **一句话说明**：无内容过滤的开源 AI 音视频生成平台，支持 Flux、Midjourney、Kling、Sora 等 600+ 模型自托管部署。
* **[dream-num/univer](https://github.com/dream-num/univer)** [TypeScript]  
  ⭐ 23,194（今日 +138）  
  **一句话说明**：面向人类与 AI Agent 共创的开源办公 SDK，将表格、文档处理与计算能力无缝接入产品中。

---

### 🧠 大模型与基础框架
* **[huggingface/transformers](https://github.com/huggingface/transformers)** [Python]  
  ⭐ 168,881  
  **一句话说明**：开源 AI 界的“基础设施”，提供文本、视觉、音频及多模态 SOTA 模型的统一定义、推理与微调框架。
* **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** [Python]  
  ⭐ 262,743  
  **一句话说明**：Nous Research 针对自研 Hermes 模型族打造的自我演进型 Agent 框架。

---

### 🔍 RAG 与知识管理
* **[Tencent/WeKnora](https://github.com/Tencent/WeKnora)** [Go]  
  ⭐ 37,211（今日 +104）  
  **一句话说明**：腾讯开源的 LLM 知识平台，可将原始文档自动化转化为可查询的 RAG 系统、自决推理 Agent 及自维护 Wiki。
* **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** [Python]  
  ⭐ 146,189  
  **一句话说明**：将代码库、文档、SQL 转换成知识图谱的结构化 Skill 工具，支持 Claude Code 和 Cursor 确定性解析。
* **[langgenius/dify](https://github.com/langgenius/dify)** [Python]  
  ⭐ 160,999  
  **一句话说明**：工业级 Agent 部署与 RAG 工作流编排平台，支持企业从原型快速走向生产环境。

---

## 📈 趋势信号分析

1. **“Agent Skill 标准化”爆发**

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*