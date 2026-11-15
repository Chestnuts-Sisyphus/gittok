# AI 开源趋势日报 2026-11-16

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-15 23:38 UTC

---

# AI 开源趋势日报 (2026-11-16)

---

## 1. 今日速览

今日 GitHub 榜单展现出极强的**“Agent 生态链与技能标准化”**导向。围绕 Claude Code、Cursor、Codex 等主流编码智能体（Coding Agents）的专属技能扩展（Skills / MCP Servers）呈现爆发式增长，涵盖了金融交易、网络安全红队攻防、视频编辑等垂直场景。同时，企业级 Agent 编排控制台与人机协同（Human-in-the-Loop）工作流框架（如腾讯开源的 LoopForge）受到高度关注，标志着 AI Agent 正在从“单兵工具”向“企业可控协同流水线”演进。此外，以 AG-UI 为代表的 AI 交互协议及 Chrome 官方 MCP 调试工具的走热，预示着 Agent 与前端/操作系统的融合正步入标准化阶段。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、MCP与协议）

- [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)  
  ⭐56,891 *(今日 +718)*  
  **说明**：Google Chrome 官方推出的 MCP 服务，直接将 Chrome DevTools 暴露给 Coding Agent，赋予 Agent 调试 Web 应用、分析性能与抓取 DOM 的原生能力。
- [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)  
  ⭐17,825 *(今日 +393)*  
  **说明**：Agent-User Interaction (AG-UI) 交互协议，旨在为前端应用提供标准化接口，以打通 UI 组件与后级 Agent 状态的实时无缝通信。
- [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)  
  ⭐9,272 *(今日 +248)*  
  **说明**：Google Labs 开源的 Agent Skills 规范标准库，专为 Stitch MCP 服务打造，兼容 Gemini CLI、Claude Code 等多端 Agent。
- [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi)  
  ⭐52,896 *(今日 +579)*  
  **说明**：统一的 OpenAI 兼容网关，聚合 87 个免费 LLM 提供商与 1,300+ 免费模型端点，提供智能路由与自动故障转移。
- [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates)  
  ⭐33,758 *(今日 +179)*  
  **说明**：Claude Code 组件的开源包管理器与 CLI，支持智能体、自定义命令、MCPs 和模板的快速分发与集成。
- [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator)  
  ⭐1,641 *(今日 +205)*  
  **说明**：NVIDIA 推出的多层级 AI Agent 技能评估框架，包含语义重叠检测、合成测试集生成及实时 Agent 技能影响评估。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、编排）

- [backnotprop/plannotator](https://github.com/backnotprop/plannotator)  
  ⭐11,815 *(今日 +860)*  
  **说明**：专为开发者设计的 Agent 人机协作工作空间，支持一键审查 Agent 生成的代码、制定 Plan、标注反馈并实时干预。
- [Tencent/LoopForge](https://github.com/Tencent/LoopForge)  
  ⭐1,450 *(今日 +484)*  
  **说明**：腾讯开源的自托管 Coding-Agent 交付工作流，可联动 CodeBuddy、Codex 与 Claude Code，并在节点中加入人工审批闸门。
- [affaan-m/ECC](https://github.com/affaan-m/ECC)  
  ⭐303,831  
  **说明**：面向 Claude Code、Cursor、Opencode 等环境的 Agent 运行载体性能优化系统，覆盖技能管理、本能记忆与安全防护。
- [stablyai/orca](https://github.com/stablyai/orca)  
  ⭐125,737  
  **说明**：允许开发者使用自有订阅批量调度与托管 Coding Agent 阵列的协同平台，覆盖桌面端与远程运行时。
- [openclaw/openclaw](https://github.com/openclaw/openclaw)  
  ⭐394,532  
  **说明**：支持跨 OS 和跨平台的通用 Task-Execution Agent 框架，提供高灵活度的底层自动化交互接口。

### 📦 AI 应用与垂直领域 Skill（垂直解决方案、AI 产品）

- [dream-num/univer](https://github.com/dream-num/univer)  
  ⭐25,586 *(今日 +1041)*  
  **说明**：开源 AI Office SDK，为产品无缝集成文档、电子表格计算以及 Agent/人类协作协同处理功能。
- [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills)  
  ⭐5,511 *(今日 +707)*  
  **说明**：面向股票与加密货币交易者的 Claude Code 专属技能集，提供市场分析、技术指标画图及策略开发能力。
- [alibaba/open-code-review](https://github.com/alibaba/open-code-review)  
  ⭐52,035 *(今日 +688)*  
  **说明**：阿里开源的大规模代码评审系统，采用“确定性静态规则 + LLM Agent”混合架构，提供精准行级 Code Review。
- [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)  
  ⭐6,390 *(今日 +221)*  
  **说明**：针对网络安全漏洞挖掘与红队攻防的 Claude 技能包，内嵌 82 个技能与 681 种已知漏洞模式。
- [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill)  
  ⭐5,957 *(今日 +285)*  
  **说明**：为 Claude Code/Cursor 打造的本地视频处理工具包与 MCP 服务器，包含 42 种带有机器可读契约的 FFmpeg 剪辑指令。
- [fqscfqj/Y2A-Auto](https://github.com/fqscfqj/Y2A-Auto)  
  ⭐5,010 *(今日 +99)*  
  **说明**：基于 AI 大模型的跨平台视频自动化搬运与翻译工具，集成字幕生成、内容审核与智能监控。

### 🧠 大模型/训练/Infra（系统设计、模型与基础设施）

- [bojieli/ai-infra-book](https://github.com/bojieli/ai-infra-book)  
  ⭐7,820 *(今日 +151)*  
  **说明**：李博杰《深入理解 AI Infra：量化分析与系统设计》开源书稿，从硬件约束与模型架构出发量化推导 LLM 推训系统。
- [ollama/ollama](https://github.com/ollama/ollama)  
  ⭐187,093  
  **说明**：轻量级本地大模型运行框架，全面支持 Kimi、GLM、DeepSeek 等通用开放权重

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*