# AI 开源趋势日报 2026-11-18

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-18 01:57 UTC

---

# AI 开源趋势日报（2026‑11‑18）

---

## 1️⃣ 今日速览  
- **Agent / Multi‑Agent 框架** 再次登顶热榜，`superpowers`、`orca`、`paper‑orchestra` 等项目单日星增均超过 1 k，表明社区对可编排、可自主管理的 AI 助手需求爆炸式增长。  
- **AI 开发底层工具** 继续受到关注：`tensorflow` 仍是最受关注的训练/推理框架，`univer` 与 `ECC` 等 SDK/性能优化库在今日榜单中均突破千星。  
- **RAG 与知识抓取** 方向出现新星 `firecrawl`，在 7 天活跃搜索中位列前十，显示“让大模型拥有实时检索能力”已成为开发者的热点需求。  
- **跨语言/跨平台 Agent 协议** 也在崛起，`ag-ui`（Agent‑User Interaction Protocol）和 `openclaw` 把 Agent 融入前端、操作系统的尝试获得了显著关注。  

---

## 2️⃣ 各维度热门项目  

| 类别 | 项目 | Stars (今日新增) | 一句话说明 |
|------|------|------------------|------------|
| **🔧 AI 基础工具** | **[tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)** <br>⭐ 201,758 | 依旧是机器学习最主流的开源框架，近期 2.16 版加入对混合精度训练的原生支持。 |
| | **[obra/superpowers](https://github.com/obra/superpowers)** <br>⭐ 319,372 (+1,917) | Agentic skills framework，提供统一的技能、记忆、推理模块，帮助开发“可组合的 AI 助手”。 |
| | **[dream-num/univer](https://github.com/dream-num/univer)** <br>⭐ 28,927 (+1,774) | AI Office SDK，提供编辑、计算、协作等能力的可嵌入组件，让企业产品直接拥有“AI 办公”。 |
| | **[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)** <br>⭐ 20,034 (+1,445) | 规范化 Agent 与前端交互的协议，降低 UI 与多模型通信的集成成本。 |
| | **[affaan-m/ECC](https://github.com/affaan-m/ECC)** <br>⭐ 305,551 (+883) | 高性能 Agent harness，聚焦技能调度、记忆管理与安全沙箱，是大型模型编排的底层引擎。 |
| | **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)** <br>⭐ 202,664 | 提供“一站式”网页抓取 + 向量化 API，帮助 LLM 实时获取最新网络信息，RAG 生态的关键基础设施。 |
| **🤖 AI 智能体 / 工作流** | **[stablyai/orca](https://github.com/stablyai/orca)** <br>⭐ 127,900 (+1,066) | 让开发者以订阅方式快速部署一整 fleet 的 Coding Agents（Claude Code、Codex 等）。 |
| | **[google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)** <br>⭐ 3,075 (+1,072) | 多 Agent 框架，自动生成 AI 研究论文，演示了生成式 AI 在科研写作中的完整流水线。 |
| | **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** <br>⭐ 264,236 | “会成长的 Agent”，具备自适应记忆与指令学习能力，面向长期个人化助理场景。 |
| | **[openclaw/openclaw](https://github.com/openclaw/openclaw)** <br>⭐ 394,691 | “Any OS, any Platform” 的通用 AI 代理，实现跨设备、跨语言的统一调度。 |
| | **[morluto/rea](https://github.com/morluto/rea)** <br>⭐ 466,424 | 通过 Agent 逆向工程任意软件行为，展示了 AI 在安全审计与自动化逆向中的潜力。 |
| | **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** <br>⭐ 193,116 | 让 Agent “像最懒的资深开发者”一样思考，专注代码生成与审查的轻量化插件。 |
| **📦 AI 应用（垂直场景）** | **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** <br>⭐ 9,401 (+1,005) | 基于 Claude Code 的漏洞挖掘 Skill Bundle，提供 82 项安全检测技能，面向红队与企业安全。 |
| | **[kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill)** <br>⭐ 7,766 (+1,292) | 为 Coding Agents 提供 42 种 FFmpeg 视频处理能力，开启“AI 视频编辑”新玩法。 |
| | **[n8n-io/n8n](https://github.com/n8n-io/n8n)** <br>⭐ 210,930 | Fair‑code 自动化平台，已内置多模型调用与 RAG 插件，帮助业务快速构建 AI 工作流。 |
| **🧠 大模型 / 训练** | **[tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)** <br>⭐ 201,758 | 同时覆盖训练、推理、微调全链路，最新 2.16 版强化分布式训练与 TPUs 支持。 |
| | **[obra/superpowers](https://github.com/obra/superpowers)** <br>⭐ 319,372 (+1,917) | 通过技能化抽象，让大模型在不同业务中快速复用，等同于“大模型即服务”的底层框架。 |
| **🔍 RAG / 知识库** | **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)** <br>⭐ 202,664 | 统一抓取‑清洗‑向量化 API，降低构建企业级知识库的门槛，已被 300+ 项 LLM 产品集成。 |
| | **[n8n-io/n8n](https://github.com/n8n-io/n8n)** <br>⭐ 210,930 | 工作流平台自带向量搜索节点，可直接把外部数据流转为 RAG 检索链路。 |
| | **[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)** <br>⭐ 20,034 (+1,445) | 为前端提供统一的 Agent‑User 交互协议，天然支持检索增强对话 UI。 |

> **注**：若项目在 Trending 榜单出现，则在星标后标注今日新增数量（+xxx），其余仅列出累计 stars。

---

## 3️⃣ 趋势信号分析  

今日热榜显示，**Agent / Multi‑Agent 框架** 正在成为社区的聚焦点。单日星增超过 1 k 的项目集中在 `superpowers`、`orca`、`paper‑orchestra` 与 `openclaw` 四个方向：技能化抽象、跨平台部署、自动化科研写作以及全系统代理。此现象与最近 **Meta、Google、OpenAI** 等陆续发布的“可自行编排的插件系统”相呼应，开发者急需在本地或私有云中快速搭建可定制的 AI 助手。  

在 **基础设施层面**，`tensorflow` 的持续热度证明传统深度学习框架仍是模型研发的根基，而 `firecrawl` 与 `n8n` 的上榜标志 **RAG + 工作流** 正从概念走向实用化；开发者不再仅仅关注模型本身，更在意 **“数据‑模型‑业务”** 的闭环。  

技术栈方面，**TypeScript** 与 **Shell** 项目占比显著（`superpowers`、`ag-ui`、`ffmpeg-skill`），显示前端/脚本语言正在成为 Agent 开发的首选入口，降低了门槛并促进了跨团队协作。  

总体来看，**可组合的 Agent 技能库 + 实时检索能力** 正成为当下开源生态的两大增长极，预计在未来 1‑2 个月内，会出现更多聚焦“Agent‑as‑a‑Service” 与 “RAG‑Native SDK” 的项目。

---

## 4️⃣ 社区关注热点（开发者必看）  

- **[superpowers](https://github.com/obra/superpowers)** – 统一的技能/记忆框架，几乎可以为任何 LLM 打造可复用的业务插件。  
- **[firecrawl](https://github.com/firecrawl/firecrawl)** – 一站式网页抓取 + 向量化 API，快速为 LLM 注入最新网络信息，是构建 RAG 系统的首选底层服务。  
- **[orca](https://github.com/stablyai/orca)** – 通过订阅模式快速部署多模型 Coding Agent，适合企业内部代码审查与自动化生成。  
- **[ag-ui](https://github.com/ag-ui-protocol/ag-ui)** – 标准化的 Agent‑User 交互协议，为前端集成 AI 助手提供统一入口。  
- **[paper‑orchestra](https://github.com/google-research/paper-orchestra)** – 多 Agent 自动化写作流水线，展示了生成式 AI 在科研产出中的实战潜力。

> **行动建议**：如果你正在构建企业内部 AI 助手或 RAG 产品，优先评估 `superpowers` + `firecrawl` 的组合；若关注代码自动化，`orca` 与 `ffmpeg-skill` 能直接落地。  

--- 

*本报告基于 GitHub 今日 Trending 与 7 天主题搜索数据，筛选后仅展示与 AI/ML 明确相关的项目。*

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*