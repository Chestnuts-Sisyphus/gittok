# AI 开源趋势日报 2026-11-26

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-26 02:33 UTC

---

# AI 开源趋势日报（2026-11-26）

---

## 1. 今日速览

今日 GitHub AI 开源领域展现出极其鲜明的**“智能体生态扩展（Agent Skills）与 Token 成本管控”**双重驱动特征。以 Claude Code、Cursor、Gemini CLI 等 Coding Agents 为核心的辅助技能插件（Agent Skills）迎来全面爆发，覆盖了安全渗透、图表生成、学术研究和代码审计等多个垂直领域。同时，开发者对 AI Agent 运行成本敏感度显著上升，降低 Token 消耗的 CLI 代理中间件和模型免训练修改工具获得了社区的高频增长关注。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）
*   [rtk](https://github.com/rtk-ai/rtk) ⭐87,849 (+125 today)
    *   **说明**：极简单文件 Rust 编写的 CLI 代理工具，可在日常开发命令中减少 60-90% 的大模型 Token 消耗，成为降低 Agent 交互成本的利器。
*   [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) ⭐122,883
    *   **说明**：专为 Coding Agent 打造的本地代理与技能框架，通过压缩 Agent 输出和工具调用文本，极大节省开发者 API 费用。
*   [openvino](https://github.com/openvinotoolkit/openvino) ⭐12,667 (+191 today)
    *   **说明**：英特尔开源的高性能 AI 推理引擎套件，持续升级优化多端边缘设备及 CPU/GPU 架构上的大模型推理效率。
*   [earendil-works/pi](https://github.com/earendil-works/pi) ⭐123,909 (+173 today)
    *   **说明**：全功能 AI Agent 工具包，整合了统一 LLM API 接口、Agent 循环逻辑、终端 TUI 及命令行 Coding 助手。
*   [cursor/plugins](https://github.com/cursor/plugins) ⭐19,559 (+416 today)
    *   **说明**：Cursor 编辑器官方插件规范与官方扩展库，推动 AI 辅助编程环境生态的模块化发展。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
*   [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) ⭐65,732 (+1106 today)
    *   **说明**：香港大学开源的“将所有软件转为 Agent 原生”的框架，让传统 GUI/CLI 软件能够直接被 AI 智能体无缝调度。
*   [obra/superpowers](https://github.com/obra/superpowers) ⭐326,674 (+903 today)
    *   **说明**：高赞的 Agent 技能框架与软件开发方法论，提供系统化的 Agent 技能组织与协作标准。
*   [affaan-m/ECC](https://github.com/affaan-m/ECC) ⭐310,769 (+573 today)
    *   **说明**：Agent 运行环境性能优化系统，为 Claude Code、Cursor、Opencode 等代理提供技能、记忆、安全与研发调优。
*   [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) ⭐13,003 (+355 today)
    *   **说明**：Google Labs 推出的 Agent 技能库，兼容 Stitch MCP 服务器以及 Antigravity、Gemini CLI 等主流编程 Agent。
*   [anomalyco/opencode](https://github.com/anomalyco/opencode) ⭐229,213 (+226 today)
    *   **说明**：全开源的 Coding Agent 框架，作为商业化 AI 编程助手的有力替代品，持续保持高热度。
*   [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) ⭐6,430 (+121 today)
    *   **说明**：Google Research 打造的多智能体写作框架，支持自动化进行 AI 研究论文的撰写与整合。

### 📦 AI 应用（垂直场景解决方案与技能包）
*   [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) ⭐23,118 (+1652 today)
    *   **说明**：面向 Claude Code 的红队安全与漏洞挖掘技能包，内含 85 种 Skill、16 种斜杠指令和 681 种已知漏洞检测模式。
*   [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) ⭐73,104 (+1141 today)
    *   **说明**：专为 Claude Code、Cursor、Copilot 等 AI 助手设计的编辑级图表生成 Skill，支持 52 种纯粹 HTML+SVG 图表格式。
*   [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) ⭐75,159 (+945 today)
    *   **说明**：跨平台的 AI 调研 Agent 技能，自动抓取 Reddit、X、YouTube、HN 等渠道全网近30天信息并生成有根有据的摘要。
*   [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) ⭐16,238 (+880 today)
    *   **说明**：开源 AI 桌面剪辑工具，一键将播客、访谈等长视频自动剪成适配小红书、TikTok 等平台的高清短视频与文案。
*   [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) ⭐15,546 (+348 today)
    *   **说明**：面向 DevOps/SRE 领域的开源 AI 智能体，专注于自动排查并提高 CI/CD 流程的可靠性。
*   [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) ⭐58,568 (+153 today)
    *   **说明**：针对 Claude Code 的学术研究全流程技能包，覆盖“调研→写作→审稿→修改→定稿”自动化闭环。

### 🧠 大模型/训练（模型微调、训练框架、轻量化）
*   [jingyaogong/minimind](https://github.com/jingyaogong/minimind) ⭐71,030 (+826 today)
    *   **说明**：极简大模型教学项目，支持在 2 小时内从零开始训练出一个 64M 参数的微型 LLM，今日星数增幅显著。
*   [p-e-w/heretic](https://github.com/p-e-w/heretic) ⭐43,207 (+206 today)
    *   **说明**：无需重训练的模型后处理工具，通过激活干预直接移除 LLM 的安全审核限制、废话输出（Slop）与阿谀奉承倾向。
*   [huggingface/transformers](https://github.com/huggingface/transformers) ⭐169,337
    *   **说明**：机器学习与大模型领域的基石级开源框架，提供最新 SOTA 多模态模型的统一定义与推理接口。

### 🔍 RAG/知识库（检索增强、数据处理、知识图谱）
*   [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) ⭐210,117 (+1135 today)
    *   **说明**：为 AI Agent 打造的网络知识接入基础设施，通过单 API 整合网页抓取、实时搜索及 550+ 数据源接入。
*   [microsoft/markitdown](https://github.com/microsoft/markitdown) ⭐198,493 (+207 today)
    *   **说明**：微软开源的数据预处理工具，可将各种 Office 文档与文件高效转化为 Markdown，专为 RAG 与大模型上下文注入设计。
*   [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐153,414
    *   **说明**：将任意代码库、文档和 SQL 结构转化为可查询知识图谱的 Agent 技能，支持 AST 本地确定性解析。

---

## 3. 趋势信号分析

1.  **“Agent Skill (智能体技能包)” 标准化生态全面崛起**
    今日榜单中以 `Claude-BugHunter`、`diagram-design`、`last30days-skill`、`stitch-skills` 为代表的项目迎来高爆发。开发者不再仅仅满足于基础模型调优，而是转向针对特定终端（Claude Code、Cursor、Gemini CLI）构建可复用的标准化 Skill。这种模块化生态极大降低了特定领域（如红队攻防、图表绘制、文献检索）的 AI 使用门槛。

2.  **降低 Agent Token 溢价成为刚需痛点**
    随着 Agentic Loop（智能体自治循环）的深入使用，频繁的上下文环境轮询导致 API 费用暴涨。今日榜单中 `rtk`（Token 节省代理）、`caveman`（输出压缩代理）以及 `DietrichGebert/ponytail` 等项目的爆火，标志着** Token 瘦身与响应压缩**已正式成为 Agent 工具链中的关键基础设施。

3.  **Agent Native（智能体原生化）改造加速**
    以 `CLI-Anything` 和 `firecrawl` 为代表的项目表明，传统软件与互联网数据接口正在经历一轮“Agent 亲和度”改造。通过将非结构化网页或传统 CLI 工具封装为符合 Agent 协议的标准接口，软件生态正在向“AI 驱动自治”加速演进。

---

## 4. 社区关注热点

*   [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)：**软件 Agent 原生化**。让普通命令行软件快速具备被 Agent 协同调用的能力，推荐关注其软件接口抽象思路。
*   [rtk-ai/rtk

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*