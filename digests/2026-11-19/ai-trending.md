# AI 开源趋势日报 2026-11-19

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-19 01:34 UTC

---

# AI 开源趋势日报 (2026-11-19)

---

## 1. 今日速览

今日 GitHub AI 开源社区展现出**“Agent Skill（智能体技能扩展）爆发”**与**“Agent 工程化交付工具落地”**两大核心趋势：
1. **Agent 技能与 MCP 生态剧烈喷发**：围绕 Claude Code、Codex、Cursor 等核心 Coding Agent 的技能扩展项目（如 `ECC`、`ffmpeg-skill`、`last30days-skill`）占据今日热榜半壁江山，生态正在快速模块化。
2. **大厂与社区加速布局 Agent 人机协作与交付架构**：Google Research 开源了论文写作多智能体框架 `paper-orchestra`，腾讯开源了编码 Agent 交付与人工审核工作流引擎 `LoopForge`，阿里推出了结合 LLM 的代码审查工具 `open-code-review`。
3. **模型可控性与极轻量化尝试升温**：轻量级训练项目 `minimind` 和无训练模型干预工具 `heretic` 获得了较高的社区关注度。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具
* [pingdotgg/t3code](https://github.com/pingdotgg/t3code) ⭐65,275 (+1,220 today)
  * **一句话说明**：跨设备控制 Claude Code、Codex 等 AI 编码代理的统一交互前端。
* [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) ⭐20,444 (+513 today)
  * **一句话说明**：Agent-User 交互协议（AG-UI），用于将 Agent 规范化集成到各类前端应用中。
* [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) ⭐59,774 (+389 today)
  * **一句话说明**：将传统软件命令行转化为“Agent 原生（Agent-Native）”交互接口的基础设施。
* [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) ⭐3,733 (+312 today)
  * **一句话说明**：NVIDIA 开源的 Agent 技能与插件评估框架，包含语义重叠检测与活体 Agent 评估机制。
* [ollama/ollama](https://github.com/ollama/ollama) ⭐187,552
  * **一句话说明**：主流本地大模型一键部署与推理引擎，支持 Kimi、GLM、Qwen、DeepSeek 等模型。

### 🤖 AI 智能体/工作流
* [affaan-m/ECC](https://github.com/affaan-m/ECC) ⭐306,534 (+1,108 today)
  * **一句话说明**：针对 Claude Code、Codex、Cursor 等 Agent 的性能优化、技能与记忆增强框架。
* [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) ⭐4,314 (+1,524 today)
  * **一句话说明**：Google Research 推出的自动化 AI 学术论文撰写多智能体系统。
* [obra/superpowers](https://github.com/obra/superpowers) ⭐321,340 (+822 today)
  * **一句话说明**：面向软件开发全流程的 Agent 技能框架与 Agentic 方法论。
* [Tencent/LoopForge](https://github.com/Tencent/LoopForge) ⭐3,817 (+821 today)
  * **一句话说明**：腾讯开源的自托管 Coding Agent 交付工作流引擎，支持引入脚本与人工审批流。
* [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) ⭐70,042 (+1,059 today)
  * **一句话说明**：跨 Reddit、X、YouTube、HN 等平台的 Agent 综合信息检索与汇总技能包。
* [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) ⭐8,032 (+338 today)
  * **一句话说明**：基于 MCP 协议的本地视频剪辑 Agent 技能，向 Claude Code/Cursor 提供 FFmpeg 自动化处理能力。

### 📦 AI 应用
* [dream-num/univer](https://github.com/dream-num/univer) ⭐29,891 (+1,152 today)
  * **一句话说明**：可无缝集成 AI Agent 协同编辑、计算与文件处理功能的开源 Office SDK。
* [alibaba/open-code-review](https://github.com/alibaba/open-code-review) ⭐54,178 (+622 today)
  * **一句话说明**：阿里出品的确定性规则 + LLM Agent 混合架构代码审查工具，支持精确行级评审。
* [backnotprop/plannotator](https://github.com/backnotprop/plannotator) ⭐13,463 (+392 today)
  * **一句话说明**：专为开发者设计的 Agent 人工反馈工作台，支持对 Agent 的计划、代码与决策进行标注和一键反馈。
* [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) ⭐144,504
  * **一句话说明**：基于大模型与自动化工作流的一键式短视频自动生成工具。

### 🧠 大模型/训练
* [jingyaogong/minimind](https://github.com/jingyaogong/minimind) ⭐66,496 (+687 today)
  * **一句话说明**：支持 2 小时内从零开始训练一个 64M 微型大语言模型的教育级极轻量训练项目。
* [p-e-w/heretic](https://github.com/p-e-w/heretic) ⭐41,986 (+515 today)
  * **一句话说明**：无需重新训练的模型修改工具，可在推理阶段去除模型审查、减少迎合性（Sycophancy）与文本冗余（Slop）。

### 🔍 RAG/知识库
* [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐150,187
  * **一句话说明**：将代码库、文档、SQL 与 PDF 转化为 Agents 可直接查询的知识图谱技能工具。
* [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) ⭐203,214
  * **一句话说明**：专为 Agent 打造的网页数据爬取、搜索与多数据源整合的基础设施 API。

---

## 3. 趋势信号分析

1. **Agent Skill（技能扩展）标准化与生态繁荣**：
   今日热榜展现出极强的“智能体模块化”特征。从底层协议（`ag-ui`）、评价体系（`SkillEvaluator`）到高阶技能扩展（`ffmpeg-skill`、`taste-skill`、`stitch-skills`），开发者正在从单纯“调用 LLM API”迅速转向“为 Claude Code/Cursor 等核心 Agent 编写专属能力扩展包”。与 MCP（Model Context Protocol）生态关联的技能仓库正在迎来爆发。

2. **企业级 AI 编码交付向“人机协同门禁（Human-in-the-loop）”演进**：
   腾讯开源的 `LoopForge`、阿里的 `open-code-review` 以及社区的 `plannotator` 集中登榜，表明大厂与社区都在解决“如何让 Agent 的代码真正安全落地”的问题。单纯的自动生成代码已无法满足生产要求，具备**确定性规则过滤 + LLM 审查 + 人工审批流程 Gate** 的混合架构正成为企业级 AI 编程落地的标配。

3. **模型微型化学习与“免训练干预”并行**：
   以 `minimind` 为代表的极小模型训练项目持续吸粉，反映出开发者对模型底层机制探索的热情；而 `heretic` 这类免训练（Training-free）的模型对齐/偏见修改工具上升趋势明显，意味着用户希望通过更低成本的方式纠正商业模型在推理阶段的“过度审查”或“迎合偏见”。

---

## 4. 社区关注热点

* **Coding Agent 技能生态 (`affaan-m/ECC`, `google-labs-code/stitch-skills`, `kajisho5/ffmpeg-skill`)**
  * **理由**：随着 Claude Code 与 Cursor 等终端 Agent 工具成为标准生产力，开发针对特定垂直场景（视频处理、UI 美化、数据检索）的 Agent Skill / MCP Server 正在成为新型开源热门赛道。
* **Agent 人工干预与评审工作流 (`Tencent/LoopForge`, `backnotprop/plannotator`)**
  * **理由**：彻底解决全自动 Agent “放任自流”带来的代码质量与安全隐患，为团队提供精准可控的 Agent 代码审批机制。
* **免训练模型修正工具 (`p-e-w/heretic`)**
  * **理由**：探索无需消耗高昂算力微调即可在推理侧消除 LLM“阿谀奉承（Sycophancy）”与“无效唠叨”的新范式，具备极高的实操性价比。
* **AI 原生办公 SDK (`dream-num/univer`)**
  * **理由**：将协同文档、电子表格与 AI Agent 深度结合，为下一代 AI 办公应用开发提供了高度可定制的开源基座。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*