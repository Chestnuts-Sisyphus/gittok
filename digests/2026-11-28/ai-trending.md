# AI 开源趋势日报 2026-11-28

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-28 02:22 UTC

---

# AI 开源趋势日报（2026-11-28）

## 1. 今日速览

今日 GitHub AI 开源社区表现出极其强烈**以 Agent 扩展能力（Skills）和工作流基础设施为核心**的演进趋势。基于 Claude Code、Cursor、Codex 等 Coding Agent 的模块化 Skill 技能包迎来爆炸式增长，从网络安全渗透（BugHunter）到学术研究、UI/UX 设计及泛互联网信息检索，模块化 Agent 能力正迅速标准化。此外，**Token 效率优化**与**软件 Agent 原生化（CLI-Anything）**成为新热点，开源社区正加速让 AI Agent 从简单的代码补全转向对复杂系统、GUI 工具和现实场景的全盘操纵。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具
*   [microsoft/markitdown](https://github.com/microsoft/markitdown)
    *   **Stars**: ⭐198,768 (+167 today)
    *   **一句话说明**: 微软官方开源的文件与 Office 文档转 Markdown 提取工具，为 RAG 和大模型上下文管道提供极简高效的数据预处理支持。
*   [t8y2/dbx](https://github.com/t8y2/dbx)
    *   **Stars**: ⭐31,727 (+163 today)
    *   **一句话说明**: 仅 25MB 的轻量级跨平台多数据库客户端，原生集成了 AI 助手与 MCP (Model Context Protocol) Server，极大降低了 Agent 直接交互数据库的门槛。
*   [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)
    *   **Stars**: ⭐123,330
    *   **一句话说明**: 针对 Coding Agent 的上下文/Token 精简代理工具，通过精简 Prompt 与工具输出降低上下文消耗，解决大模型生成冗余废话的问题。
*   [superdesigndev/treg](https://github.com/superdesigndev/treg)
    *   **Stars**: ⭐9,798 (+282 today)
    *   **一句话说明**: 称作“Agent 工具界的 OpenRouter”，聚合并路由各类 Agent 工具调用的统一 API 抽象层。
*   [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino)
    *   **Stars**: ⭐12,961 (+151 today)
    *   **一句话说明**: Intel 开源的高性能 AI 推理与模型优化工具包，持续为边缘侧及 CPU/GPU 混合推理场景提供底座支持。

### 🤖 AI 智能体/工作流
*   [obra/superpowers](https://github.com/obra/superpowers)
    *   **Stars**: ⭐328,356 (+922 today)
    *   **一句话说明**: 专为软件开发设计的 Agentic Skills 框架与工程方法论，帮助开发者快速为 Agent 注入高级软件工程方法体系。
*   [affaan-m/ECC](https://github.com/affaan-m/ECC)
    *   **Stars**: ⭐311,902 (+570 today)
    *   **一句话说明**: 针对 Claude Code、Cursor、Opencode 等 Coding Agent 的性能优化框架，覆盖 Skill 调度、记忆机制与安全防护。
*   [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)
    *   **Stars**: ⭐26,168 (+1608 today)
    *   **一句话说明**: 专为 Claude Code 设计的网络安全与红队测试技能包，内置 85 项 Skill、16 个斜杠命令及 681 种已知漏洞模式。
*   [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)
    *   **Stars**: ⭐67,037 (+666 today)
    *   **一句话说明**: 香港大学开源项目，旨在将任意传统 GUI 软件一键转化为 Agent 原生可调用的 CLI 接口，打通 Agent 操控桌面软件的最后一步。
*   [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)
    *   **Stars**: ⭐13,607 (+311 today)
    *   **一句话说明**: Google Labs 推出的 Stitch MCP 服务器 Agent 技能库，遵循 Agent Skills 开放标准，兼容 Gemini CLI、Claude 等多种 Agent。
*   [anomalyco/opencode](https://github.com/anomalyco/opencode)
    *   **Stars**: ⭐229,638 (+277 today)
    *   **一句话说明**: 全开源 Coding Agent 框架，提供纯净可控的本地代码 Agent 替代方案。

### 📦 AI 应用
*   [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)
    *   **Stars**: ⭐17,629 (+718 today)
    *   **一句话说明**: 开源本地 AI 视频剪辑工具（OpusClip 开源替代品）兼 MCP 服务，支持输入单个长视频链接自动剪辑短视频、生成字幕与发布文案。
*   [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)
    *   **Stars**: ⭐76,391 (+675 today)
    *   **一句话说明**: 强大的 Agent 搜索技能，可一键跨 Reddit、X、HN、YouTube、Polymarket 抓取并汇总特定话题的最新信息。
*   [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre)
    *   **Stars**: ⭐16,153 (+328 today)
    *   **一句话说明**: 专注于 CI/CD 运维可靠性的开源 AI Agent，自动监控与修复流水线异常。
*   [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills)
    *   **Stars**: ⭐58,859 (+162 today)
    *   **一句话说明**: 适配 Claude Code 的学术研究全流程技能包，涵盖从文献检索、撰写到 Peer Review 与修订的自动化支持。
*   [phone-harness/phone-harness](https://github.com/phone-harness/phone-harness)
    *   **Stars**: ⭐6,146 (+187 today)
    *   **一句话说明**: 允许 AI Agent 接管并自动化操控移动手机设备的端到端控制框架。

### 🧠 大模型/训练
*   [jingyaogong/minimind](https://github.com/jingyaogong/minimind)
    *   **Stars**: ⭐72,235 (+660 today)
    *   **一句话说明**: 主打极低门槛教学的大模型项目，支持开发者在 2 小时内从 0 手训一个 64M 体量的微型 LLM。
*   [ollama/ollama](https://github.com/ollama/ollama)
    *   **Stars**: ⭐188,330
    *   **一句话说明**: 本地运行与管理主流大模型（Qwen、DeepSeek、GLM 等）的核心部署工具。

### 🔍 RAG/知识库
*   [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
    *   **Stars**: ⭐211,719 (+822 today)
    *   **一句话说明**: 为 AI Agent 打造的知识抓取基础设施，统一搜索、爬取与接入 550+ 数据源的 API 平台。
*   [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)
    *   **Stars**: ⭐154,292
    *   **一句话说明**: 可将代码库、文档、SQL 模版及 PDF 转化为可查询知识图谱的 Agent 插件，适配 Claude Code 与 Cursor。
*   [langgenius/dify](https://github.com/langgenius/dify)
    *   **Stars**: ⭐162,029
    *   **一句话说明**: 高度可视化的 Agentic 自动化工作流与 RAG 引擎一站式开发平台。

---

## 3. 趋势信号分析

1. **“Agent Skills 模块化”标准生态确立**：
   今日增长最为迅猛的项目普遍集中在“Agent 技能/Skill 包”（如 `Claude-BugHunter` 单日大涨 1600+ stars，`superpowers` 大涨 920+ stars）。开源界正从“构建统一的全局 Agent Prompt”快速向“基于开放标准（如 Agent Skills open standard、MCP 服务）按需加载专有技能包”转变。这一趋势表明开发者开始重视领域专有知识（如安全红队测试、学术写作、UI 设计）在 Agent 框架中的解耦与复用。

2. **从“生成更多代码”转向“Token 减碳与高质输出”**：
   项目如 `caveman`（通过过滤废话降低 Token 消耗）与 `diagram-design`（主张消除 Mermaid 冗余格式，提供纯净 HTML/SVG）的流行，反映出开发者对现有 Agent 输出质量和上下文成本的反思。消除大模型生成中的“冗余噪声”（Slop）正成为工具链优化的新方向。

3. ** Agent 边界突破：软件生态的原生 Agent 化（Agent-Native）**：
   以 `HKUDS/CLI-Anything` 和 `phone-harness` 为代表的项目登榜，显示社区正在把传统软件（GUI 工具、手机 App）强制转译为 CLI 或 API，以便 AI Agent 能无缝接管。Agent 不再局限于浏览器与代码编辑器，正在全面渗透系统级运维与自动化操作。

---

## 4. 社区关注热点

*   **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**
    *   *推荐理由*: 今日热度最高（+1608 stars）。展示了当 LLM/Agent 能力与网络安全专业知识相结合时的巨大威力，为自动化红队演练和漏洞排查树立了可复用的技能包范式。
*   **[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)**
    *   *推荐理由*: 提出了 "Making ALL Software Agent-Native" 的概念，巧妙解决了传统软件没有 API 无法被 Agent 调用的痛点，值得自动化领域开发者重点关注。
*   **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)**
    *   *推荐理由*: 单日增长 822 stars。在 Agent 极度依赖最新上下文的背景下，它作为 Agent 的基础设施（数据抓取与实时检索 API）正在成为 RAG/Agent 开发的标准配置之一。
*

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*