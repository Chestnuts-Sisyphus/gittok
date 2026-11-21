# AI 开源趋势日报 2026-11-21

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-21 00:59 UTC

---

# 📊 AI 开源趋势日报 | 2026-11-21

---

## 1. 今日速览

今日 GitHub AI 开源社区展现出极强的**“Agent 骨架与技能标准化 (Agent Harness & Skills)”** 爆发态势。围绕 Claude Code、Codex、Cursor 等主流 Coding Agent 的增强工具包、技能（Skills）扩展与基准优化框架大量霸榜；同时，**Agent 的垂直化与企业级编排**（如网络安全红队、SRE 运维、自动化视频剪辑与团队协作）正加速演进。此外，本地低算力部署（如 8GB 显存运行视频生成大模型、极小规模 LLM 训推）同样备受开发者追捧。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具
- [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐ 307,860 (+649 today)
  > **一句话说明**：专注于 Coding Agent（Claude Code, Codex, Cursor 等）的性能与 Harness 优化系统，集成 Memory、Instincts 与安全基准。
- [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | ⭐ 61,385 (+773 today)
  > **一句话说明**：港大开源项目，旨在将所有传统软件转换为 Agent 原生（Agent-Native）可调用的 CLI 接口。
- [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | ⭐ 11,038 (+315 today)
  > **一句话说明**：Google Labs 推出的 Agent Skills 标准化技能库，原生支持 Stitch MCP 服务器，适配 Gemini CLI、Claude 等环境。
- [cursor/plugins](https://github.com/cursor/plugins) | ⭐ 17,847 (+299 today)
  > **一句话说明**：Cursor 官方插件规范与官方插件生态库，标志着 AI 编程编辑器向生态开放迈出关键一步。
- [p-e-w/heretic](https://github.com/p-e-w/heretic) | ⭐ 42,362 (+184 today)
  > **一句话说明**：免训练（Training-free）的模型干预工具，可通过修改 logits 快速降低大模型的安全审查限制、抑制废话（Slop）并减少阿谀奉承（Sycophancy）。

---

### 🤖 AI 智能体/工作流
- [obra/superpowers](https://github.com/obra/superpowers) | ⭐ 322,843 (+890 today)
  > **一句话说明**：一套成熟的 Agentic 技能框架与软件开发方法论，助力构建更高执行力的自治智能体。
- [Tencent/LoopForge](https://github.com/Tencent/LoopForge) | ⭐ 5,276 (+1216 today)
  > **一句话说明**：腾讯开源的自托管 Coding-Agent 交付编排系统，可对 CodeBuddy、Codex 及 Claude Code 进行多脚本编排与人工审批流控制。
- [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) | ⭐ 5,436 (+454 today)
  > **一句话说明**：Google Research 推出的自动化 AI 论文写作多智能体协作框架。
- [multica-ai/multica](https://github.com/multica-ai/multica) | ⭐ 56,941 (+173 today)
  > **一句话说明**：支持自托管的“人机混合”协同平台，将人类开发者与 AI Agent 融入同一个团队敏捷工作流中。
- [anomalyco/opencode](https://github.com/anomalyco/opencode) | ⭐ 228,258 (+247 today)
  > **一句话说明**：高度活跃的开源 AI 编程智能体，致力于成为完全自主控制的闭源替代品。

---

### 📦 AI 应用
- [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | ⭐ 14,277 (+1622 today)
  > **一句话说明**：针对 Claude Code 的红队渗透与漏洞挖掘技能包，内置 82 项技能、15 个斜杠命令与 681 种已知漏洞检测模式。
- [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | ⭐ 12,188 (+979 today)
  > **一句话说明**：开源桌面 AI 视频剪辑工具，支持将播客、访谈等长视频一键切片为短视频并生成文案封面，适配多社交平台。
- [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | ⭐ 13,613 (+466 today)
  > **一句话说明**：面向 CI/CD 与系统可用性（SRE）的开源自动化运维智能体。
- [FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo) | ⭐ 3,807 (+293 today)
  > **一句话说明**：消费级显卡福利！仅需 8GB 显存与 16GB 内存即可在本地运行 MiniMax H3 进行 AI 视频生成。
- [phone-harness/phone-harness](https://github.com/phone-harness/phone-harness) | ⭐ 5,376 (+198 today)
  > **一句话说明**：跨设备端侧 Agent 框架，赋予大模型直接接管和控制手机 GUI 的能力。

---

### 🧠 大模型/训练
- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐ 67,691 (+847 today)
  > **一句话说明**：极其热门的极简大模型教学与实验项目，支持在普通硬件上 2 小时内从 0 手搓并训练出 64M 参数的模型。
- [ollama/ollama](https://github.com/ollama/ollama) | ⭐ 187,763
  > **一句话说明**：本地 LLM 运行与部署标杆工具，对开源模型生态（DeepSeek, Qwen, Kimi 等）提供即插即用支持。

---

### 🔍 RAG/知识库
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | ⭐ 205,275 (+1241 today)
  > **一句话说明**：为 AI Agent 打造的知识基础设施，通过单一 API 聚合搜索、网页解析以及 550+ 数据源接入。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐ 151,186
  > **一句话说明**：代码库知识图谱化工具，将复杂 Codebase、配置与文档解析为确定性 AST 结构图谱，专供 Claude Code/Cursor 检索。
- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | ⭐ 71,451 (+681 today)
  > **一句话说明**：强大的全网信息检索 Agent 技能，支持横跨 Reddit、X、HN、Polymarket 等渠道合成深度研究报告。
- [microsoft/markitdown](https://github.com/microsoft/markitdown) | ⭐ 197,258 (+281 today)
  > **一句话说明**：微软开源的文件转 Markdown 工具，是各类企业级 RAG 方案处理 Office/PDF 杂乱文档的基础预处理利器。

---

## 3. 趋势信号分析

1. **AI Agent 生态进入“技能标准化与 Harness 基础设施”阶段**：
   社区焦点已从单纯的“智能体框架（Framework）”转向“Agent 技能与环境（Skills & Harnesses）”。今日榜单中以 `obra/superpowers`、`affaan-m/ECC`、`google-labs-code/stitch-skills` 为代表的项目暴涨，表明开发者开始建立通用的“Agent 插件/技能”开源标准，并试图提升 Claude Code、Cursor 等基座 Agent 的边界能力。

2. **企业级 Coding-Agent 的“管控与编排”落地需求激增**：
   腾讯开源的 `LoopForge` 今日高调上榜，反映了企业在接入全自动 AI 编写代码（Agentic Coding）时，迫切需要“自托管编排 + 人工审批关卡（Human approval gates）”来保证安全交付与代码合规，而非直接放任 AI 随意提交 commit。

3. **垂直领域安全 & SRE Agent 崛起**：
   `Claude-BugHunter`（红队/漏洞挖掘）与 `opensre`（CI/CD 可用性）增长势头强劲，证明 AI Agent 正在从泛化的“对话与代码补全”快速渗透至安全攻防、运维监控等专业门槛极高的垂直工业场景。

---

## 4. 社区关注热点

- 🛡️ **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**
  - **理由**：安全人员与 AI 开发者必看，展示了如何通过封装 600+ 漏洞模式与专属命令，将 Claude Code 升级为专业的渗透测试工具。
- ⚙️ **[Tencent/LoopForge](https://github.com/Tencent/LoopForge)**
  - **理由**：大厂开源的企业级 Agent 编排系统，对于正在探索如何在团队中落地 CodeBuddy/Codex/Claude Code 交付工作流的架构师很有借鉴意义。
- 🎬 **[FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo)**
  - **理由**：极大地降低了前沿视频生成模型（MiniMax H3）的本地部署门槛（仅需 8GB VRAM），值得端侧/本地生成式 AI 开发者尝试。
- 🕸️ **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**
  - **理由**：解决传统 RAG 无法精准解析大型代码库拓扑的痛点，用代码图谱（Knowledge Graph）充当 Agent 上下文，是增强 Cursor/Claude 代码理解能力的关键方向。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*