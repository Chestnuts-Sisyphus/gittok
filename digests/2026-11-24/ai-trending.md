# AI 开源趋势日报 2026-11-24

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-24 04:30 UTC

---

# AI 开源趋势日报（2026-11-24）

---

### 1. 今日速览

今日 GitHub AI 开源社区呈现出明显的**“Agent 技能生态化（Agent Skills）与工具链原生化”**趋势。以 Anthropic Claude Code、Codex 等 Coding Agent 为核心的插件与技能库（如安全红队、学术研究、图形设计技能）占据了热榜半壁江山；腾讯、Google 等大厂相继开源了 Agent 编排框架与 MCP 扩展标准；同时，低显存极简微调模型与本地化多媒体生成工具（如 MiniMax H3 显存优化加速）再次刷新了消费级硬件的使用上限。

---

### 2. 各维度热门项目

#### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

*   [earendil-works/pi](https://github.com/earendil-works/pi)
    *   **Stars**: ⭐123,554（今日 +193）
    *   **一句话说明**: 极简的 AI Agent 开发工具包，集成统一的 LLM API、Agent 运行循环、命令行终端 UI（TUI）与 Coding Agent 工具链。
*   [p-e-w/heretic](https://github.com/p-e-w/heretic)
    *   **Stars**: ⭐42,850（今日 +194）
    *   **一句话说明**: 训练无感的大语言模型行为修改工具，无需重新微调即可实现模型去审查、抑制废话输出（Slop）以及降低谄媚性。
*   [cursor/plugins](https://github.com/cursor/plugins)
    *   **Stars**: ⭐18,875（今日 +397）
    *   **一句话说明**: Cursor IDE 官方开源的插件规范及其标准插件库，加速构建与第三方 AI 插件的集成。
*   [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino)
    *   **Stars**: ⭐12,316（今日 +184）
    *   **一句话说明**: Intel 开源的高性能 AI 推理引擎与优化工具包，广泛用于跨平台边缘侧及服务端 AI 模型部署。

#### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

*   [obra/superpowers](https://github.com/obra/superpowers)
    *   **Stars**: ⭐325,220（今日 +840）
    *   **一句话说明**: 专注于 AI 编程智能体的“技能（Skills）框架”与 Agent 软件开发方法论，提升智能体解决复杂工程的能力。
*   [affaan-m/ECC](https://github.com/affaan-m/ECC)
    *   **Stars**: ⭐309,659（今日 +664）
    *   **一句话说明**: Agent 运行环境性能优化系统，针对 Claude Code、Codex 等 Agent 提供统一的技能、直觉记忆、安全与研发编排。
*   [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)
    *   **Stars**: ⭐63,859（今日 +790）
    *   **一句话说明**: 港大开源的 Agent 原生工具链，旨在一键将传统命令行工具与软件解构为 Agent 可直接调用的标准接口。
*   [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)
    *   **Stars**: ⭐20,022（Top 1 新增 +2029）
    *   **一句话说明**: 专门针对 Claude Code 的红队漏洞挖掘技能包，内置 84 项 Skill、15 个斜杠指令与 681 种已知漏洞攻击模式。
*   [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)
    *   **Stars**: ⭐12,370（今日 +422）
    *   **一句话说明**: 谷歌实验室基于 MCP 标准开源的扩展技能库，适用于 Gemini CLI、Claude Code 等兼容 Agent 系统的集成。
*   [Tencent/LoopForge](https://github.com/Tencent/LoopForge)
    *   **Stars**: ⭐5,897（今日 +235）
    *   **一句话说明**: 腾讯开源的私有化 Coding Agent 交付工作流，可编排 CodeBuddy、Codex 与 Claude Code 协同完成自动化开发与人工拦截复核。

#### 📦 AI 应用（具体应用产品、垂直场景解决方案）

*   [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)
    *   **Stars**: ⭐73,559（今日 +797）
    *   **一句话说明**: 全网热点研究 Agent 技能，可跨 Reddit、X、YouTube、HN 及 Polymarket 等渠道检索并自动生成事实总结。
*   [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills)
    *   **Stars**: ⭐58,299（今日 +160）
    *   **一句话说明**: 专为学术科研打造的 Claude Code 组合技能库，全流程覆盖论文“检索→撰写→评审→修改→定稿”。
*   [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre)
    *   **Stars**: ⭐14,886（Widely Trending +436）
    *   **一句话说明**: 聚焦 CI/CD 可靠性与 DevOps 自动化治理的开源 SRE 运维智能体。
*   [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)
    *   **Stars**: ⭐14,611（今日 +907）
    *   **一句话说明**: 基于 AI 的长视频自动切片与二次创作桌面工具，一键生成字幕、文案与短视频，适配各类主流短视频平台。
*   [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)
    *   **Stars**: ⭐6,180（今日 +241）
    *   **一句话说明**: 谷歌研究院开源的多 Agent 论文撰写协作框架，用于自动化科研文献梳理与草案生成。

#### 🧠 大模型/训练（模型权重、训练框架、微调工具）

*   [jingyaogong/minimind](https://github.com/jingyaogong/minimind)
    *   **Stars**: ⭐69,617（今日 +828）
    *   **一句话说明**: 极简的大模型教学与实战项目，支持开发者在 2 小时内使用普通消费级显卡从零训练出一个 64M 参数的大模型。
*   [FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo)
    *   **Stars**: ⭐4,749（今日 +304）
    *   **一句话说明**: 消费级显卡极简视频生成方案，通过硬件自适应路径优化，在 8GB 显存 / 16GB 内存上即可流畅本地运行 MiniMax H3 模型。

#### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

*   [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
    *   **Stars**: ⭐208,071（今日 +924）
    *   **一句话说明**: 面向 AI Agent 的数据采集基础设施，通过单 API 整合全网 550+ 数据源与网页清洗，大幅提升 RAG 检索质量。
*   [microsoft/markitdown](https://github.com/microsoft/markitdown)
    *   **Stars**: ⭐198,107（今日 +246）
    *   **一句话说明**: 微软官方推出的文档解析工具，快速将各类 Office 文档与富文本文件转换为 Markdown，便于 Agent 与 RAG 系统索引。
*   [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)
    *   **Stars**: ⭐152,588
    *   **一句话说明**: 将代码库、SQL 模式和文档一键转化为可查询知识图谱（Knowledge Graph）的开源 Agent 插件。

---

### 3. 趋势信号分析

从今日榜单的数据分布来看，开源 AI 社区正在经历**从“构建单个通用 Agent”向“围绕通用模型构建专业化 Agent 技能包（Agent Skills）与基础设施”的范式转移**。

1.  **“Agent Skill（技能模块）”爆发**: 以 `Claude-BugHunter`（今日增长超 2000 stars）、`last30days-skill`、`stitch-skills` 为代表的项目暴增。社区开发者不再重造 Agent 框架轮子，而是将精力集中于将垂直领域的领域知识（如安全红队攻防、学术撰写、设计图谱）封装为标准化的 Agent 技能包，直接赋能 Claude Code、Codex 等底层 Agent。
2.  **软件生态的 Agent 原生化改造**: `CLI-Anything` 与腾讯 `LoopForge` 的热榜亮眼表现表明，企业与开源社区正在加速把已有软件基础设施（如命令行工具、CI/CD 交付流水线）转化为“Agent 原生可感知/可操作”的接口，人机协作工作流进入了系统集成阶段。
3.  **多媒体模型轻量化落地**: `FreeVideo` 使得 MiniMax H3 级别的视频大模型可以在 8GB 显存消费级设备上运行，标志着高算力门槛的视频生成模型正通过极致的推理加速策略（硬件自适应）快速普及到个人开发者端。

---

### 4. 社区关注热点

*   🎯 **Claude Code 技能生态（Skills Ecosystem）**: 关注 `Claude-BugHunter` 与 `ECC`，Agent 技能的标准化封装正在成为下一代 AI 应用

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*