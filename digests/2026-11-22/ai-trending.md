# AI 开源趋势日报 2026-11-22

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-21 23:59 UTC

---

# AI 开源趋势日报 | 2026-11-22

---

## 1. 今日速览

今日 GitHub 榜单显示，**Coding Agent 衍生生态（Skill 扩展包与 Harness 调优工具）** 迎来全面爆发，围绕 Claude Code、Cursor、Codex 等智能体平台的特定领域能力补丁与成本调优工具大量登榜。同时，“ Agent 原生基础设施”（如将传统 CLI 转为智能体接口、智能体专属数据采集 API）表现强劲。在大模型与应用层面，消费级显卡上的视频生成优化与超轻量级 LLM 从零训练继续受到个人开发者推崇；谷歌与腾讯等大厂则同步开源了多 Agent 写作与 Agent 交付工作流引擎，推动智能体落地工程化。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- [rtk-ai/rtk](https://github.com/rtk-ai/rtk) 
  ⭐87,416 (+129 today)
  **一句话说明**：单文件 Rust 编写的 CLI 代理工具，可在常用开发命令中降低 60%-90% 的 LLM Token 消耗，是当下极具性价比的开发降本利器。
- [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) 
  ⭐11,412 (+324 today)
  **一句话说明**：Google Labs 开源的 Agent Skills 规范库，专门用于适配 Stitch MCP 服务器，实现跨 Gemini CLI、Claude Code 等 Agent 的技能标准化调用。
- [cursor/plugins](https://github.com/cursor/plugins) 
  ⭐18,098 (+261 today)
  **一句话说明**：Cursor AI 编辑器的官方插件规范与插件库，极大地推动了编码智能体扩展生态的规范化。
- [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) 
  ⭐11,927 (+202 today)
  **一句话说明**：英特尔开源的 AI 推理与部署优化工具包，持续为端侧及异构硬件提供高效的模型加速支持。
- [ollama/ollama](https://github.com/ollama/ollama) 
  ⭐187,790
  **一句话说明**：最受欢迎的本地大模型运行环境之一，支持快速部署与本地交互，已成为大模型开发者基础设施标配。

---

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

- [obra/superpowers](https://github.com/obra/superpowers) 
  ⭐323,708 (+884 today)
  **一句话说明**：面向 Agentic 开发的技能框架与软件开发方法论，解决智能体在复杂软件工程场景中的落地难题。
- [affaan-m/ECC](https://github.com/affaan-m/ECC) 
  ⭐308,366 (+576 today)
  **一句话说明**：针对 Claude Code、Cursor、Codex 的 Agent 运行环境性能调优系统，引入记忆、安全与研究优先的开发机制。
- [anomalyco/opencode](https://github.com/anomalyco/opencode) 
  ⭐228,427 (+211 today)
  **一句话说明**：开源的全功能 Coding Agent 替代方案，旨在为开发者提供完全可控、自托管的编码智能体。
- [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) 
  ⭐62,066 (+767 today)
  **一句话说明**：香港大学数据科学实验室开源项目，旨在将所有传统命令行软件转化为“Agent 原生（Agent-Native）”接口。
- [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) 
  ⭐5,723 (+314 today)
  **一句话说明**：谷歌研究团队开源的多 Agent 协作框架，专注于全自动化 AI 科研论文撰写。
- [Tencent/LoopForge](https://github.com/Tencent/LoopForge) 
  ⭐5,508 (+227)
  **一句话说明**：腾讯开源的 Coding Agent 交付与工作流引擎，支持引入脚本与人工审批闸口对 AI 编写代码进行工程管控。

---

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

- [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) 
  ⭐16,018 (+1,794 today)
  **一句话说明**：针对 Claude Code 开发的漏洞挖掘技能包，内置 82 个技能与 24 类核心漏洞模式，专为红队与安全审计设计。
- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) 
  ⭐196,352 (+775 today)
  **一句话说明**：让 AI Coding Agent 模仿资深极简程序员思考模式的扩展包，主张“最好的代码就是不写的代码”，有效避免大模型过度设计。
- [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) 
  ⭐12,834 (+689 today)
  **一句话说明**：桌面级开源 AI 视频剪辑工具，支持一键将播客与课程长视频自动剪辑为短视频并生成文案与封面。
- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) 
  ⭐71,988 (+566 today)
  **一句话说明**：跨 Reddit、X、YouTube 等平台进行实时趋势调取的 Agent 技能，能自动合成高质量的背景研判摘要。
- [FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo) 
  ⭐4,139 (+410 today)
  **一句话说明**：可在最低 8GB 显存家用电脑上运行 MiniMax H3 的开源本地视频生成推理路径优化工具。
- [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) 
  ⭐13,982 (+450 today)
  **一句话说明**：专注于 CI/CD 流程可靠性管理的开源 SRE（站点可靠性工程）智能体。

---

### 🧠 大模型/训练（模型权重、训练框架、微调与对齐）

- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) 
  ⭐68,138 (+488 today)
  **一句话说明**：极具亲和力的开源教育项目，支持开发者在 2 小时内从零开始训练一个 64M 参数的微型 LLM。
- [p-e-w/heretic](https://github.com/p-e-w/heretic) 
  ⭐42,494 (+138 today)
  **一句话说明**：无需重训练即可对大模型进行运行时修改的工具，可用于解除过度安全限制、减少语言冗余（Slop）及降低“谄媚”响应。
- [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) 
  ⭐147,977
  **一句话说明**：基于节点图的 Diffusion 图像/视频生成 GUI 和后端推理引擎，是开源多媒体大模型工作流的基石。

---

### 🔍 RAG/知识库（向量数据库、检索增强、数据准备）

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) 
  ⭐206,167 (+999 today)
  **一句话说明**：专为 Agent 打造的网络知识基础设施，统一了 550+ 数据源的搜索与抓取 API，解决 Agent 联机数据感知问题。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) 
  ⭐151,611
  **一句话说明**：将代码库、文档与 SQL Schema 转化为可查询知识图谱的扩展插件，完美提升了 Claude Code/Cursor 的架构级上下文理解力。
- [microsoft/markitdown](https://github.com/microsoft/markitdown) 
  ⭐197,525 (+188 today)
  **一句话说明**：微软开源的高效文件转 Markdown 工具，是当前大模型 RAG 预处理阶段首选的文档转换库。

---

## 3. 趋势信号分析

1. **Coding Agent 从“基础生成”向“专用 Skill 插件生态”演进**：今日热榜中，以 `Claude-BugHunter`、`ponytail`、`diagram-design` 为代表的技能包表现极其强眼。社区正在形成围绕特定 API 和平台（如 Claude Code、Cursor、MCP）构建独立技能模块的范式。开发者不再满足于通用的 Agent 提示词，而是为智能体装配涵盖安全审计、架构优化乃至图表生成的专业能力。
2. **“Agent 运行控制层（Harness & Proxy）”爆发**：随着大模型被深入接入生产开发，推理成本与死循环问题显现。以 `rtk`（降低 60-90% Token）和 `ECC`（Agent 环境优化）、`Tencent/LoopForge`（引入人工审批）为代表的项目大幅增加，反映出社区正在全力补齐 AI Agent 在成本控制、确定性与安全交付方面的“工程化短板”。
3. **传统软件的“ Agent 原生（Agent-Native）”重构**：`CLI-Anything` 的大火标志着一种新兴技术趋势——不再让 Agent 艰难地去理解旧有的 GUI 或不规范命令行，而是将既有基础设施和 CLI 全量封装成智能体友好型的声明式接口。

---

## 4. 社区关注热点

- 🛡️ **Claude Code 与 Agent 漏洞挖掘**：关注 [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)，红队与安全开发者正在将 LLM 的深度分析能力结合到漏洞规避与检测中，安全自动化迈入 Agent 时代。
- 📉 **开发成本优化（LLM Token Proxy）**：关注 [rtk-ai/rtk](https://github.com/rtk-ai/rtk)，对于高频使用 Coding Agent 的团队，部署此类极简 Rust 代理能直接大幅削减 API 开支。
- ⚙️ **Agent 原生接口改造**：关注 [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)，探索如何将内部既有系统改造为 AI Agent 能够轻松调用的工具链。
- 🎬 **消费级端侧多媒体生成**：关注 [FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo)，8GB 显存运行 MiniMax H3 级别的短视频生成，为边缘设备与个人创作者提供了极低门槛的本地化技术路径。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*