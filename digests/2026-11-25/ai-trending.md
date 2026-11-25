# AI 开源趋势日报 2026-11-25

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-25 03:15 UTC

---

# AI 开源趋势日报（2026-11-25）

---

## 1. 今日速览

今日 GitHub AI 开源社区呈现出明显的**“Agent 模块化与技能扩展（Agent Skills）”爆发态势**。随着 Claude Code、Cursor、Codex 等终端 Coding Agent 的普及，开发者的关注点正在从“构建 Agent 框架”快速转向“为 Agent 注入专业 Skill、性能调优与安全能力”（如 BugHunter、ECC、Superpowers）。此外，低门槛的本地多媒体生成（如 FreeVideo 支持 8G 显存运行 MiniMax 视频模型）以及让传统软件实现 Agent 原生接口（CLI-Anything）等方向，展现了 AI 工程化落地的强劲动能。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具
*   [earendil-works/pi](https://github.com/earendil-works/pi)
    *   **Stars**：123,733（今日 +204）
    *   **一句话说明**：轻量级 AI Agent 工具包，集成了统一的多模型 LLM API、Agent 循环机制、终端 UI（TUI）和 Code Agent 命令行工具。
*   [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)
    *   **Stars**：12,710（今日 +403）
    *   **一句话说明**：Google Labs 开源的 Agent Skills 开放标准扩展库，完美适配 Stitch MCP 服务端以及 Claude Code、Gemini CLI 等终端智能体。
*   [cursor/plugins](https://github.com/cursor/plugins)
    *   **Stars**：19,264（今日 +360）
    *   **一句话说明**：Cursor 编辑器的官方插件规范与插件生态库，进一步丰富了代码生成 Agent 的扩展能力。
*   [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino)
    *   **Stars**：12,488（今日 +185）
    *   **一句话说明**：Intel 开源的高性能 AI 推理与部署优化工具包，适用于多平台设备上的深度学习模型加速。

### 🤖 AI 智能体/工作流
*   [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)
    *   **Stars**：21,626（今日 +1,826）
    *   **一句话说明**：专为 Claude Code 打造的安全与红队测试 Skill 集合，内含 84 个专业技能和 681 种已知漏洞检测模式。
*   [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)
    *   **Stars**：64,922（今日 +1,074）
    *   **一句话说明**：香港大学开源的“Agent 原生化”转换工具，旨在将所有传统软件通过命令行接口转换为 AI 智能体可直接调用的 API。
*   [obra/superpowers](https://github.com/obra/superpowers)
    *   **Stars**：325,901（今日 +1,003）
    *   **一句话说明**：面向 Agentic 开发的技能扩展框架与软件开发方法论，为编码 Agent 提供结构化的思维与执行能力。
*   [affaan-m/ECC](https://github.com/affaan-m/ECC)
    *   **Stars**：310,248（今日 +675）
    *   **一句话说明**：针对 Claude Code、Cursor 等 Agent 容器的性能优化与技能增强系统，提升 Agent 的记忆、安全与研发效率。
*   [Tencent/LoopForge](https://github.com/Tencent/LoopForge)
    *   **Stars**：6,014（今日 +133）
    *   **一句话说明**：腾讯开源的私有化 Coding Agent 工作流编排系统，支持对 Claude Code、Codex 和 CodeBuddy 进行自动化脚本调度与人工审批流控制。

### 📦 AI 应用
*   [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)
    *   **Stars**：15,477（今日 +980）
    *   **一句话说明**：开源 AI 视频剪辑桌面工具，输入长视频或链接即可自动提炼短视频切片，并自动生成字幕、封面与社交媒体发布文案。
*   [FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo)
    *   **Stars**：4,909（今日 +285）
    *   **一句话说明**：消费级显卡本地运行 AI 视频生成的工具，低至 8GB VRAM 即可平稳运行 MiniMax H3 视频生成模型。
*   [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre)
    *   **Stars**：15,221（今日 +398）
    *   **一句话说明**：专注于 CI/CD 自动化与系统可靠性运维（SRE）的开源 AI Agent。
*   [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)
    *   **Stars**：6,316（今日 +160）
    *   **一句话说明**：Google Research 开源的多智能体协同框架，能够自动化进行学术调研与学术论文撰写。

### 🧠 大模型/训练
*   [jingyaogong/minimind](https://github.com/jingyaogong/minimind)
    *   **Stars**：70,342（今日 +727）
    *   **一句话说明**：极其适合教学与极客实验的大模型开源项目，支持在普通硬件上 2 小时内从零训练出一个 64M 参数的 LLM。
*   [p-e-w/heretic](https://github.com/p-e-w/heretic)
    *   **Stars**：43,055（今日 +207）
    *   **一句话说明**：无需重新训练的模型后处理修改工具，可通过调整权重激活空间移除安全审查过度限制、减少模型套话与谄媚行为。

### 🔍 RAG/知识库
*   [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
    *   **Stars**：209,035（今日 +991）
    *   **一句话说明**：为 AI Agent 打造的知识采集基础设施，支持通过单一 API 实时检索、抓取全网 550+ 数据源。
*   [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)
    *   **Stars**：74,309（今日 +703）
    *   **一句话说明**：跨平台 Agent 调研技能，能同时检索 Reddit、X、HN、Polymarket 等平台最新 30 天动态，生成有据可查的 RAG 总结。
*   [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)
    *   **Stars**：153,039（主题高赞）
    *   **一句话说明**：利用 AST 局部解析技术，将任意代码库、文档、SQL 配置等一键转换为可供 Agent 深度查询的知识图谱。

---

## 3. 趋势信号分析

1.  **Agent 开发者生态爆发：从“做 Agent”走向“增强 Agent”**
    今日榜单中最瞩目的现象是 **Agent Skill / Harness 机制的全面流行**。社区不再执着于重造通用 Agent 框架，而是围绕现有领先的 Coding Agent（如 Claude Code、Cursor、Opencode）打造专门能力扩展包。例如 `Claude-BugHunter`（红队安全）、`last30days-skill`（实时全网检索）和 `ECC`（Agent 性能调优），标志着 Agent 生态迎来了“应用商店/技能插件”时代。
2.  **黑客与逆向工程 AI 化趋势明显**
    逆向工程工具 `morluto/rea` 与自动化安全测试工具 `Claude-BugHunter` 的高关注度，反映出 AI 智能体在红队安全、二进制分析以及代码审计领域的实用性迎来了跨越式提升。
3.  **大模型“轻量化落地”与“免训练后处理”**
    视频生成领域 `FreeVideo` 展示了将 MiniMax 等高参数模型极致压缩至 8GB VRAM 运行的落地能力；同时 `heretic` 这类免训练（Training-free）的模型对齐/去审查技术兴起，代表了开发者对大模型后处理和可控性改造的极高热情。

---

## 4. 社区关注热点

*   [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)：**AI 红队安全必备**。将 Claude Code 转化为专业的漏洞挖掘助手，对于网络安全人员和 DevOps 团队极具实用价值。
*   [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)：**传统软件 Agent Native 化的新范式**。解决了当前大量桌面/服务端软件缺乏 AI 接口的痛点，值得关注其底层包装协议。
*   [FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo)：**消费级显卡用户的福利**。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*