# AI 开源趋势日报 2026-11-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-14 00:33 UTC

---

# AI 开源趋势日报 | 2026-11-14

---

## 1. 今日速览

今日 GitHub AI 开源生态呈现出极其明显的**“Agent 技能化（Agent Skills）与安全治理（Agent Security）”爆炸式增长趋势**。

围绕 Claude Code、Codex、OpenCode 等新一代终端 AI 编程智能体，开源社区正掀起一场“能力增强插件（Skills）”与“Agent Harness（智能体运行宿主/优化器）”的生态建设浪潮。与此同时，大厂（NVIDIA、OpenAI、Alibaba、Tencent）高度关注智能体安全与落地应用，同日推出了涵盖 Agent 技能安全扫描、代码漏洞检测和多智能体协同落地的重磅开源工具。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具与运行环境
> 专注于模型推理、终端 CLI、基础开发 SDK 及运行宿主

- **[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**
  - **Stars**: 30,120 *(今日 +462)*
  - **说明**: 通义千问开源的终端级 AI 编程智能体 CLI，直接运行在命令行，支持深度代码理解与自主重构。
- **[farion1231/cc-switch](https://github.com/farion1231/cc-switch)**
  - **Stars**: 154,231 *(今日 +315)*
  - **说明**: 跨平台 AI 编程助手调度终端，支持一键切换与统一管理 Claude Code、Codex、OpenCode 以及 DeepSeek Harness。
- **[PurpleDoubleD/locally-uncensored](https://github.com/PurpleDoubleD/locally-uncensored)**
  - **Stars**: 4,191 *(今日 +148)*
  - **说明**: 开箱即用的桌面级开源本地 AI 工作站，零依赖部署对话、图文/视频生成与本地 Coding Agent。
- **[ollama/ollama](https://github.com/ollama/ollama)**
  - **Stars**: 186,896 *(今日 +141)*
  - **说明**: 本地大模型轻量化运行引擎，持续更新支持 DeepSeek、Qwen、Gemma 等最新模型栈。
- **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)**
  - **Stars**: 201,584
  - **说明**: 专为 AI Agent 设计的高效 Web 网页解析与数据抓取工具，解决智能体数据输入的清洗难题。

---

### 🤖 AI 智能体与工作流 (Agent & Workflow)
> 智能体框架、Agent Skills 能力扩展包、多智能体协同及安全治理

- **[affaan-m/ECC](https://github.com/affaan-m/ECC)**
  - **Stars**: 302,460 *(今日 +559)*
  - **说明**: 智能体宿主（Harness）性能优化系统，提供针对 Claude Code、Codex 等主流智能体的本能、记忆、技能与安全性优化。
- **[NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector)**
  - **Stars**: 25,895 *(攻防热门，今日 +190)*
  - **说明**: NVIDIA 开源的 Agent Skills 安全扫描器，能在智能体加载插件前深度检测 Prompt 注入、数据泄露及供应链风险。
- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)**
  - **Stars**: 117,143 *(今日 +591)*
  - **说明**: Google 工程总监 Addy Osmani 维护的工程级 AI 智能体技能集，涵盖代码审查、架构设计等标准化规范。
- **[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)**
  - **Stars**: 115,046 *(今日 +795)*
  - **说明**: 为 AI 编程智能体注入“审美品味”的 Skill 拓展包，解决传统 AI 生成网页同质化、缺乏设计感的问题。
- **[CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot)**
  - **Stars**: 12,111 *(今日 +674)*
  - **说明**: 具有独立虚拟电脑操作权限（浏览器、文件系统、CLI）的数字员工/AI Coworkers 框架。
- **[Tencent/LoopForge](https://github.com/Tencent/LoopForge)**
  - **Stars**: 670 *(今日 +174)*
  - **说明**: 腾讯开源的私有化部署 Agent 交付工作流，可对 Codex、Claude Code 等进行脚本化编排与人工审查校验。

---

### 📦 AI 应用与垂直解决方案
> 基于 LLM / Agent 打造的场景化产品与生产力工具

- **[openai/codex-security](https://github.com/openai/codex-security)**
  - **Stars**: 13,124 *(今日 +751)*
  - **说明**: OpenAI 推出的 Codex Security CLI，利用 LLM 自主查找、验证并修复代码库中的安全漏洞。
- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)**
  - **Stars**: 50,613 *(今日 +215)*
  - **说明**: 阿里开源的企业级混合架构 Code Review 工具，结合确定性静态检查与 LLM Agent 进行精确到行级别的审查。
- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)**
  - **Stars**: 71,584 *(今日 +256)*
  - **说明**: 大模型驱动的多市场股票智能分析系统，集成实时新闻、行情看板与零成本自动化分析推送。
- **[kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill)**
  - **Stars**: 5,433 *(今日 +168)*
  - **说明**: 将 FFmpeg 工具链包装成符合 MCP 协议的 Agent Skill，允许 AI 智能体直接调用本地视频剪辑能力。

---

### 🧠 大模型与生成式 AI (Models & Generative AI)
> 模型架构、多模态应用与生成引擎

- **[Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI)**
  - **Stars**: 146,692
  - **说明**: 基于节点图的扩散模型（Diffusion Models）推理框架，图像与视频生成的行业标准工作流。
- **[Likely7/Veyra-NRVideo](https://github.com/Likely7/Veyra-NRVideo)**
  - **Stars**: 1,616 *(今日 +256)*
  - **说明**: 结合 DLSS 5 原理与 AI 超分辨率算法的实时视频增强工具，支持视频与采集卡画面的实时插帧与超分。
- **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)**
  - **Stars**: 143,300
  - **说明**: 基于大模型与自动化工作流的一键高清短视频全自动生成工具。

---

### 🔍 RAG 与知识管理 (RAG & Knowledge base)
> 知识检索增强、代码库知识图谱化

- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**
  - **Stars**: 147,293
  - **说明**: 代码库/文档知识图谱转换器，将 AST 语法树、配置文件和文档转换为大模型可精准查询的 Graph-RAG，完美支持 Claude Code 等智能体拓展。
- **[langgenius/dify](https://github.com/langgenius/dify)**
  - **Stars**: 161,119
  - **说明**: 企业级 Agentic RAG 与 AI 工作流开发平台，支持可视化部署与多模型编排。

---

## 3. 趋势信号分析

从今日 GitHub Trending 榜单与热度分布来看，社区呈现出三大极其显著的趋势信号：

1. **“Agent 技能 (Skills) 标准化”正式爆发**：过去 AI 开发者聚焦于 Agent 本身的 Base 框架（如 LangChain），而今天以 `taste-skill`、`agent-skills`、`ffmpeg-skill` 为代表的项目异军突起。社区正倾向于将领域能力（UI 审美、视频剪辑、营销 SEO、AST 解析）解耦并封装为具备 Schema 合约的 **Skills/MCP 服务**，以被各类 Coding Agent 动态加载。
2. **智能体安全（Agent Security）升至最高优先级**：随着智能体获得越来越多的系统级终端权限，安全隐患剧增。OpenAI 发布 `codex-security`、NVIDIA 发布 `SkillSpector`，二者分别代表了“利用 Agent 进行安全审计”以及“防止 Agent 技能被恶意注入”两大防线，预示着 AI 生产力工具正快速走向合规与工程化安全阶段。
3. **终端级 Harness 的标准化竞争**：`affaan-m/ECC` 和 `farion1231/cc-switch` 的极高增长，反映出开发者对“统一管理多大模型智能体终端”的强需求。用户不再满足于单一平台，而是寻求能够跨平台调配 Claude Code、Codex、DeepSeek 等不同模型的控制面板。

---

## 4. 社区关注热点

- 🛡️ **[NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector)**：**强烈建议关注**。AI Agent Skills 生态的大爆发势必带来供应链攻击与 Prompt 注入危机，NVIDIA 推出的安全检查器是未来构建安全智能体系统的必备基础设施。
- ⚙️ **[affaan-m/ECC](https://github.com/affaan-m/ECC)**：**当前宿主优化热门**。如果你在频繁使用 AI Coding Agents，ECC 提供了记忆、本能和运行性能的综合调优方案。
- 🌐 **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**：**新一代代码库 RAG 标准**。放弃简单的 Chunk 切分，利用 AST 本地确定性解析将工程构建为 Graph-RAG，大幅提升 Agent 阅读超大型代码库的准确率。
- 🤖 **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)**：**工业级应用落地范例**。完美结合“确定性管道代码规制（NPE分析）”与“LLM Agent”的混合架构，是企业内部落地 AI Code Review 的极佳参考标准。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*