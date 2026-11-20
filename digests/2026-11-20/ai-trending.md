# AI 开源趋势日报 2026-11-20

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-20 01:31 UTC

---

# AI 开源趋势日报 | 2026-11-20

---

## 1. 今日速览

今日 GitHub AI 开源社区呈现出极度聚焦的**“智能体技能化（Agent Skills）与工具链集成”**爆发趋势。以 Claude Code、Cursor、Opencode 等终端/编程 Agent 为核心的技能库与性能优化套件占据了 Trending 榜单半壁江山。此外，多智能体协同科研论文撰写、垂直领域的漏洞自动化挖掘，以及无训练干预模型输出（如去谄媚、去审查）等技术方向表现优异，标志着 AI 开源社区正从“通用大模型应用”迅速迈向“高度专业化、标准化技能封装的 Agent 生产力时代”。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）
- [earendil-works/pi](https://github.com/earendil-works/pi) [TypeScript] ⭐122,936 (+194 today)
  **一句话说明**：轻量级 AI Agent 工具包，集成了统一的 LLM API 接入、Agent 执行循环、TUI 与命令行交互能力。
- [microsoft/markitdown](https://github.com/microsoft/markitdown) [Python] ⭐197,039 (+434 today)
  **一句话说明**：微软开源的文件与 Office 文档转 Markdown 工具，专注于为 LLM/RAG 提供干净的高质量文本解析。
- [p-e-w/heretic](https://github.com/p-e-w/heretic) [Python] ⭐42,198 (+252 today)
  **一句话说明**：无需重训练的大语言模型行为修改工具，用于消除模型安全审查过度的“废话”、降低谄媚（sycophancy）倾向。
- [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++] ⭐11,571 (+246 today)
  **一句话说明**：Intel 开源的高性能 AI 推理引擎，专为优化和跨平台部署深度学习模型设计。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
- [obra/superpowers](https://github.com/obra/superpowers) [Shell] ⭐322,105 (+2028 today)
  **一句话说明**：今日热度第一！专注于软件开发方法论的 Agentic Skills 规范框架，大幅提升编程 Agent 的自动化能力。
- [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) [Python] ⭐5,058 (+1196 today)
  **一句话说明**：谷歌研究团队开源的多智能体协同框架，专门用于端到端自动化 AI 学术论文撰写。
- [affaan-m/ECC](https://github.com/affaan-m/ECC) [JavaScript] ⭐307,304 (+959 today)
  **一句话说明**：专为 Claude Code、Cursor、Codex 等打造的 Agent 性能优化与 Harness 系统，包含记忆、安全与本能机制。
- [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python] ⭐12,569 (+1349 today)
  **一句话说明**：专为红队与漏洞挖掘打造的 Claude Code 技能包，包含 82 个技能和 15 个斜杠命令。
- [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) [TypeScript] ⭐10,725 (+302 today)
  **一句话说明**：Google Labs 推出的标准 Agent Skill 库，配合 Stitch MCP 服务器使用，兼容多种命令行编程 Agent。
- [Tencent/LoopForge](https://github.com/Tencent/LoopForge) [Go] ⭐4,063 (+276 today)
  **一句话说明**：腾讯开源的私有化 Coding-Agent 交付工作流，可编排 CodeBuddy、Codex 与 Claude Code 并集成人工审批门禁。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
- [morluto/rea](https://github.com/morluto/rea) [TypeScript] ⭐470,053
  **一句话说明**：利用 AI 智能体对应用行为及原生二进制文件进行自动逆向工程的硬核安全应用。
- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) [Python] ⭐123,182
  **一句话说明**：基于多智能体大模型的金融量化交易与市场决策分析框架。
- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) [Python] ⭐144,717
  **一句话说明**：利用 AI 大模型和自动化工作流，根据主题一键自动生成短视频的极速创作工具。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python] ⭐66,897 (+238 today)
  **一句话说明**：极其适合教学与极客实验的开源项目，支持在 2 小时内从零开始训练出一个 64M 参数的微型 LLM。
- [ollama/ollama](https://github.com/ollama/ollama) [Go] ⭐187,672
  **一句话说明**：本地大模型运行与管理事实上的标准工具，支持 DeepSeek、Qwen、Gemma 等最新模型生态。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript] ⭐204,255 (+825 today)
  **一句话说明**：为 AI Agent 打造的知识抓取基础设施，通过统一 API 提供实时网页搜索、爬取与 550+ 数据源接入。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) [Python] ⭐150,667
  **一句话说明**：可将整个代码库、文档及 SQL 格式转化为可查询的知识图谱，作为 Claude Code/Cursor 的代码感知扩展。
- [langgenius/dify](https://github.com/langgenius/dify) [Python] ⭐161,526
  **一句话说明**：主流的开源 Agentic 工作流与 RAG 开发平台，支持可视化编排与私有化部署。

---

## 3. 趋势信号分析

1. **“Agent Skills (智能体技能)”成为新的生态标准**：
   今日 Trending 榜单几乎被 Agent Skill/Bundle 类项目覆盖（如 `superpowers`、`Claude-BugHunter`、`stitch-skills`、`last30days-skill`）。开发者不再只满足于让 Agent “会写代码”，而是通过开放标准（如 MCP / Open Agent Skills standard）赋予 Agent 专业领地的具体能力（如漏洞排查、文献搜集、UI/UX 规范）。**“给 Agent 穿装备/挂技能”正取代“提示词工程”成为热门新趋势。**

2. **Coding Agent 进入“企业级交付与多 Agent 编排”阶段**：
   腾讯开源的 `LoopForge` 以及 `affaan-m/ECC` 等项目的高赞登榜表明，企业与开发者正极力改善单体 Coding Agent 的可靠度与安全性问题。通过引入本地人工审批门禁、性能 Harness 体系以及针对多 Agent 的协同调用，编程 Agent 正在向标准的 DevOps 和 CI/CD 流程落地。

3. **模型无训练即时对齐与反向纠偏思潮**：
   `p-e-w/heretic` 解决了一个长期困扰开发者的痛点：商业/主流开源 LLM 普遍存在的“过审废话”和“盲目谄媚”。这种利用推理期激活干预（Inference-time modification）的技术，免去了成本高昂的 RLHF/DPO 微调，开辟了让模型输出更客观实用的新路线。

---

## 4. 社区关注热点

- 🌟 **[obra/superpowers](https://github.com/obra/superpowers)**：今日爆火的 Agentic 技能框架，将现代软件开发工程规范重构成 Agent 可执行的 Skills，是使用 Claude Code / Cursor 开发者的必备插件。
- 🔬 **[google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)**：谷歌出品的多 Agent 自动化论文写作框架，展示了专业多智能体系统在极具挑战的学术写作场景下的应用突破。
- 🛡️ **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**：AI 驱动网络安全的典型范例，内置 681 种已知漏洞模式，成功把 Agent 带入白帽黑客与自动化代码审计实战。
- 🕸️ **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**：突破传统 Vector RAG 在代码检索上的局限，将复杂代码库解析为知识图谱（AST 决定论解析），有效降低了大型项目开发中 LLM 的幻觉率。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*