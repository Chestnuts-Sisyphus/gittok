# AI 开源趋势日报 2026-11-15

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-14 23:30 UTC

---

# AI 开源趋势日报（2026-11-15）

---

## 1. 今日速览

今日 GitHub AI 开源社区呈现出明显的**“编码 Agent 生态系统工程化”**与**“Agent 运行成本与效能治理”**趋势：
1. **Agent 技能与扩展机制爆破式增长**：围绕 Claude Code、Codex 等新一代终端 Agent 的 Skills（技能包）、Plugins（插件）及辅助 Harness（工具套件）占据了 Trending 榜单的半壁江山。
2. **Token 压缩与成本治理成为刚需**：针对智能体长上下文消耗高昂的问题，社区涌现出通过 Token 极简代理、上下文压缩等手段降低 20%~65% 成本的专用中间件。
3. **大厂重兵布局 Agent 交付与评估**：阿里、腾讯、NVIDIA 等企业纷纷开源了针对 Coding Agent 的多模式代码评审、流水线编排以及智能体技能评估框架，标志着 AI 智能体正全面进入企业级生产交付阶段。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、开发工具、上下文/Token 优化）

* [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)  
  ⭐ 56,270 (+673 today) | TypeScript  
  **一句话说明**：谷歌官方为 AI 编码 Agent 打造的 Chrome DevTools MCP（Model Context Protocol）服务，让智能体可以直接操作和调试浏览器页面。
* [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)  
  ⭐ 120,046 (+227 today) | Go  
  **一句话说明**：一款极简风格的 Agent 提示词与代理工具，通过模仿“原始人（Caveman）”式精简语法表达，帮助 Coding Agent 节省高达 65% 的 Token 消耗。
* [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)  
  ⭐ 79,671 (+93 today) | Python  
  **一句话说明**：专门针对 LLM/RAG/Agent 的工具输出与日志压缩中间件，可在不影响回答质量的前提下减少 20%~95% 的输入 Token。
* [affaan-m/ECC](https://github.com/affaan-m/ECC)  
  ⭐ 303,029 | JavaScript  
  **一句话说明**：面向 Claude Code、Codex、Cursor 等 Agent 的 Harness 性能优化与记忆/安全管理系统。
* [ollama/ollama](https://github.com/ollama/ollama)  
  ⭐ 186,975 | Go  
  **一句话说明**：最流行的本地大模型运行引擎，全面支持 Kimi、GLM、Qwen、DeepSeek 等主流开源模型快速部署。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

* [alibaba/open-code-review](https://github.com/alibaba/open-code-review)  
  ⭐ 51,403 (+897 today) | Go  
  **一句话说明**：阿里开源的混合架构代码审查工具，结合确定性检查流水线与 LLM Agent，实现精准到行级的自动化 Code Review。
* [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)  
  ⭐ 117,557 (+419 today) | JavaScript  
  **一句话说明**：Google 工程总监 Addy Osmani 主导的生产级 AI 编码 Agent 技能库。
* [Tencent/LoopForge](https://github.com/Tencent/LoopForge)  
  ⭐ 883 (+101 today) | Go  
  **一句话说明**：腾讯开源的 Coding-Agent 交付编排框架，支持对 CodeBuddy、Codex 和 Claude Code 进行自动化脚本与人工审批流的联合编排。
* [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator)  
  ⭐ 1,250 (+168 today) | Python  
  **一句话说明**：NVIDIA 推出的多层级 AI Agent 技能评估框架，支持语义重叠检测、合成测试集生成及实时 Agent 能力评估。
* [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)  
  ⭐ 30,313 (+116 today) | TypeScript  
  **一句话说明**：通义千问官方开源的终端原生 AI 编码 Agent。
* [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)  
  ⭐ 47,299 (+137 today) | Python  
  **一句话说明**：Anthropic 官方维护的高质量 Claude Code 插件目录。

### 📦 AI 应用（垂直场景解决方案、生产力应用）

* [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills)  
  ⭐ 4,774 (+556 today) | Python  
  **一句话说明**：专为股票投资者和交易员打造的 Claude Code 技能集，覆盖市场分析、技术图表绘制及策略开发。
* [dream-num/univer](https://github.com/dream-num/univer)  
  ⭐ 24,462 (+495 today) | TypeScript  
  **一句话说明**：面向人机协同的开源 AI 办公套件 SDK，可轻松将电子表格、文档和幻灯片处理能力集成至 Agent 中。
* [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)  
  ⭐ 5,839 (+127 today) | Python  
  **一句话说明**：面向网络安全与红队测试的 Claude Code 技能包，内置 82 个技能与 681 种已知漏洞攻击模式。
* [Likely7/Veyra-NRVideo](https://github.com/Likely7/Veyra-NRVideo)  
  ⭐ 2,208 (+423 today) | C++  
  **一句话说明**：集成了 DLSS 5 超分辨率技术的 Windows 实时视频增强与采集卡处理工具。
* [FujiwaraChoki/supoclip](https://github.com/FujiwaraChoki/supoclip)  
  ⭐ 3,103 (+91 today) | Python  
  **一句话说明**：开源的 OpusClip 替代品，基于 AI 自动截取长视频中的精华切片生成短视频。

### 🔍 RAG/知识库（检索增强、数据提取、图知识库）

* [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)  
  ⭐ 147,752 | Python  
  **一句话说明**：可将任意代码库、文档、SQL 模版及 PDF 转化为可查询知识图谱的工具，专为 Claude Code、Cursor 等 Agent 提供精准上下文支持。
* [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)  
  ⭐ 201,810 | TypeScript  
  **一句话说明**：为 AI Agent 打造的网络数据抓取与清洗引擎，可将任意网页转换为适合大模型消耗的 Clean Markdown。
* [langgenius/dify](https://github.com/langgenius/dify)  
  ⭐ 161,165 | Python  
  **一句话说明**：支持 Agentic 工作流与工业级 RAG 管道的可视化开发与部署平台。

---

## 3. 趋势信号分析

1. **终端 AI 编码工具竞争白热化，生态扩展（Skill/Plugin）成为胜负手**  
   从今日榜单来看，单纯的对话式 AI 界面热度正在让位于命令行终端 Agent（如 `qwen-code`、`goose`、`Claude Code`）。与之相伴的是“Agent Skill/Plugin”这一新形态的爆发：社区开始大量涌现针对金融交易（`claude-trading-skills`）、安全渗透（`Claude-BugHunter`）、前端开发（`modern-web-guidance-src`）的专业技能包。智能体生态的竞争正从模型基座能力演化为**“技能生态的丰富度”**。

2. **Agent 治理基础设施（Agent Ops）迎来第一波高潮**  
   智能体在自治执行任务时带来的 Token 爆炸和安全失控问题日益显现。今日榜单中出现了专门用于压缩工具输出的 `headroom`、精简提示词语法的 `caveman`，以及 NVIDIA 开源的智能体能力评估框架 `SkillEvaluator` 和阿里的混合 Code Review 工具 `open-code-review`。**上下文压缩、中间代理、安全审计与技能量化评估**正在快速形成标准化的基础设施层。

3. **MCP（模型上下文协议）与标准生态接轨**  
   Google 官方推出的 `chrome-devtools-mcp` 表明，传统软件巨头正在全面适配 MCP 协议。将浏览器、编辑器、IDE 以及底层 OS 的控制权标准化暴露给 Agent，正从社区草案变为行业事实标准。

---

## 4. 社区关注热点

- **Coding Agent 技能化（Agent Skills Paradigm）**  
  *理由*：以 `addyosmani/agent-skills` 和 `anthropics/claude-plugins-official` 为代表，开发者应重点关注如何将领域知识打包为 Agent 可调用的模块化技能。
- **上下文 Token 压缩代理（Context & Token Compression）**  
  *理由*：在长任务 Agent 场景下，Token 成本是阻碍落地的核心瓶颈。`headroom` 和 `caveman` 等低侵入式的 Agent Proxy/中间件模式极具工程实用价值。
- **企业级 AI 代码审查与编排（Enterprise Agent Orchestration）**  
  *理由*：阿里 `open-code-review` 与腾讯 `LoopForge` 显示出国内大厂在“确定性规则 + AI Agent”混合架构上的落地思路，适合寻求 AI 落地 CI/CD 流程的架构师参考。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*