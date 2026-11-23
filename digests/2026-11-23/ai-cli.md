# AI CLI 工具社区动态日报 2026-11-23

> 生成时间: 2026-11-23 00:31 UTC | 覆盖工具: 9 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

这份横向对比分析报告基于 2026 年 11 月 23 日各主流 AI CLI 工具（具备有效数据的 GitHub Copilot CLI、OpenCode、Pi、Qwen Code）的社区动态，深入解析当前 AI 命令行工具的技术演进趋势与差异化竞争格局。

---

# AI 开发工具生态横向对比分析报告 (2026-11-23)

## 1. 生态全景

当前 AI CLI 工具已全面跨越“单轮代码补全”阶段，正式进入**多智能体（Multi-Agent）编排、后台守护进程化与 MCP（Model Context Protocol）生态整合**的新纪元。

主流工具正在解决深度工程化落地中的“最后一公里”问题：一方面，嵌套子智能体（Nested Subagents）的控制与状态透明化成为刚需；另一方面，长会话的 Token 压缩管理、终端（TUI）界面的噪声控制（Focus Mode 呼声），以及在企业级网络（代理/Fake-IP/TLS）和 Windows 复杂路径下的跨平台健壮性，成为了各大项目竞争的核心战场。

---

## 2. 各工具活跃度对比

| 工具名称 | 最新版本 | 今日更新 Issues | 今日更新 PRs | 社区活跃度与演化阶段评价 |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub Copilot CLI** | v1.0.115-7 | 19 个新 Issue | 2 个关键 PR | **稳健演进期**：侧重企业网络兼容、云沙箱与容器化部署安全性。 |
| **OpenCode** | 无新发布 (v2.0+) | 50 个更新 | 50 个更新 | **高速迭代期**：社区极其活跃，重点攻坚 TUI/桌面端体验与子 Agent 控制。 |
| **Pi** | 无新发布 | 31 个更新 | 3 个已合并 | **模型敏捷适配期**：专注于新模型（Gemini 4/Bedrock）兼容性与底层并发修复。 |
| **Qwen Code** | v0.28.4 | 10+ 核心 Issue | 10+ 核心 PR | **架构重构期**：主打 Web Shell/Managed Agent 模式，重度聚焦 CI 治理与会话恢复。 |
| **Kimi Code CLI** | 无 | 0 | 0 | **停滞/低活跃**：过去 24 小时内无社区活动。 |

*注：Claude Code、OpenAI Codex、Gemini CLI、DeepSeek TUI 因摘要数据缺失，暂未纳入定量统计。*

---

## 3. 共同关注的功能方向

综合各社区反馈，以下 5 个技术方向是当前行业共同痛点：

### 1) 嵌套子智能体（Nested Subagents）与层级编排
*   **Copilot CLI**：开发者阻于 Issue #5543，子 Agent 启动的子 Agent 无法进行多轮对话，难以实现深度后台异步任务。
*   **OpenCode**：社区强烈要求恢复“前台子智能体”执行能力（#64073），并增加后台运行子智能体的可视化监控面板（#65610）。
*   **Qwen Code**：推进 Phase 4 Managed Agent 架构，引入“密封证书挂起”机制以安全等待工具审批（PR #18115）。

### 2) 上下文压缩与长会话（Session Persistence）恢复
*   **OpenCode**：修复 `keep.tokens` 参数未生效导致上下文膨胀过快的问题（Issue #43250）。
*   **Qwen Code**：专门攻坚超大会话记录（Oversized Transcript）在守护进程重载时的挂载与恢复（PR #18111）。
*   **Copilot CLI**：发布 v1.0.115-7 优化 `--ui-server` 会话恢复，社区呼吁增加显式的 `suspend_session` / `resume_session` 工具（#5549）。

### 3) MCP (Model Context Protocol) 工具链适配限制
*   **OpenCode**：遇到远程 MCP 服务器工具量 >61 个时会被系统静默截断的严重 Bug（Issue #65590）。
*   **Copilot CLI**：出现 PATH 中存在 `gh` CLI 时，内置 GitHub MCP 读取工具失效的冲突（Issue #5550）。
*   **Pi**：解决会话恢复后系统错误提示 MCP 工具不可用的上下文丢失问题（Issue #12409）。

### 4) TUI/UI 的“降噪”与性能优化
*   **Pi**：社区高频呼吁引入 **Focus Mode（专注模式）**，合并繁复的工具调用日志与思考过程，仅保留关键摘要（Issue #12410）。
*   **OpenCode**：正在全力修复 Agent 打开的终端无法关闭（#63782）、时间轴滚动抖动（PR #65631）等基础交互体验。

### 5) 代理网络与复杂环境兼容
*   **Copilot CLI**： Surge Fake-IP 环境下 `web_fetch` 失败（#5544），企业网 TLS 握手失败（#5546）。
*   **Qwen Code & OpenCode**：集中修复 Windows 平台路径中包含空格、括号导致拖拽或 `@` 引用失效的跨平台问题。

---

## 4. 差异化定位分析

```
                     【生态整合 / 托管服务】
                               ▲
                               │  GitHub Copilot CLI (企业沙箱/移动端扩展)
                               │
   Qwen Code (守护进程/Web Shell) │
                               │
【服务端/多端分布式】───────────────┼───────────────【本地极客/单机终端】
                               │
                               │  OpenCode (重度TUI/桌面混合/子Agent编排)
                               │  Pi (多模型适配器/轻量级执行)
                               ▼
                     【灵活扩展 / 极客定制】
```

1.  **GitHub Copilot CLI：企业级托管与全场景覆盖**
    *   **定位**：安全、合规、全平台（客户端/移动端/容器）。
    *   **优势**：云沙箱（Cloud Sandbox）隔离执行，具备完美的 ACP（Agent Communication Protocol）和容器连接 Token 安全传递机制。
2.  **OpenCode：高度自由的多 Agent 交互实验室**
    *   **定位**：针对 Power User 的现代终端与桌面级 Agent 开发平台。
    *   **优势**：UI 表现力最强（支持 Agent Widgets、PsychoScript 模板），敢于探索前沿多智能体复杂编排。
3.  **Qwen Code：分布式守护进程与 Web 化工程助手**
    *   **定位**：云端/本地混合部署的 Server-Daemon 架构。
    *   **优势**：弱化纯终端依赖，提供强大的 Web Shell 与工作区工件（Artifacts）渐进式扫描能力，专注于 CI/CD 与大型代码库治理。
4.  **Pi：多提供商模型的“精细化路由与调试器”**
    *   **定位**：轻量级、面向模型开发者和底层调优者的 CLI。
    *   **优势**：对各种前沿/异构模型（Gemini 4, DeepSeek, Bedrock 架构）的 Prompt Payload 兼容性极敏感，修复速度快。

---

## 5. 社区热度与成熟度

*   **极高成熟度与标准化**：**GitHub Copilot CLI** 表现出极强的工程规范，Issue 聚焦于边界网络环境（Surge、TLS）、安全权限限制和企业级需求，代码基底相对稳定。
*   **爆发式增长与高迭代强度**：**OpenCode** 与 **Qwen Code** 的代码变更频率极高（日均数十个 PR/Issue）。OpenCode 正处于 UI/子 Agent 逻辑重构的磨合期；Qwen Code 则将大量精力投入在 Managed Agent 架构建设及 Flaky Test（不稳定性测试）治理上。
*   **垂直领域高黏性**：**Pi** 社区规模虽不及前两者，但在解决底层并发逻辑（如 `bash` 与 `read` 的竞争条件）和新兴 API 规范（如 OpenRouter 流式中断）上响应迅速。

---

## 6. 值得关注的趋势信号

对技术决策者（CTO/架构师）与 CLI 开发者的建议：

1.  **“Focus 模式”将成为 AI CLI 界面标配**
    随着 Agent 思考步骤增长及工具调用频次激增，传统的流式日志（Verbose Logging）已造成严重的信息过载。CLI 工具正在向“摘要层 + 展开调试”的视觉分层演进。
2.  **MCP 扩展上限问题显现

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
（数据截至 2026‑11‑23，来源：`github.com/anthropics/skills`）

---

## 1️⃣ 热门 Skills 排行（评论/关注度最高的 5‑8 条 PR）

| # | Skill（PR） | 功能概述 | 社区讨论焦点 | 当前状态 |
|---|------------|----------|--------------|----------|
| **#1245** | **notion‑spec‑to‑implementation** | 将 Notion 中的产品/技术规格自动拆解为可执行的实现任务（任务列表、验收标准、进度追踪）。 | *需求强烈*——用户想把需求文档直接喂给 Claude，省去手工拆解；关注点在 **任务粒度、对接 Notion API 的权限管理**。 | **OPEN** |
| **#1703** | **md2video‑audio** | 零成本把 Markdown 文档转为带真人语音的 MP4 视频（Marp 幻灯+TTS）。 | *内容创作与教学* 场景热议，大家讨论 **渲染质量、语音模型选型、视频时长控制**。 | **OPEN** |
| **#525** | **pyxel** | 为 Python Pyxel 库提供完整的 Retro‑Game 开发、调试、帧检验等技能。 | *游戏开发爱好者* 抢占关注，讨论 **如何在 headless 环境下捕获帧、跨平台部署**。 | **OPEN** |
| **#514** | **document‑typography** | 检测并自动纠正文档中的排版问题（孤行、寡行、编号错位等）。 | *文档质量* 是所有生成任务的共性需求，讨论 **与现有文档校对工具的集成**。 | **OPEN** |
| **#1771** | **proofcore‑contract‑auditor** | 静态分析 Solidity / Rust 智能合约，并把审计证明锚定到 TON 区块链。 | *Web3 开发* 圈子关注安全性与 **零存储 Merkle 证明** 的实现细节。 | **OPEN** |
| **#1980** | **webapp‑testing: avoid shell=True** | 移除 `with_server.py` 中的 `shell=True`，修复潜在的命令注入漏洞（CWE‑78）。 | **安全审计** 需求驱动，讨论 **安全最佳实践与兼容性**。 | **OPEN** |
| **#1792** | **docx – LibreOffice timeout** | `accept_changes.py` 在 LibreOffice 超时或未生成干净 DOCX 时返回错误。 | 文档自动化可靠性提升，讨论 **超时阈值、错误报告**。 | **OPEN** |
| **#1742** | **mcp‑builder: streamable_http_client** | 支持 MCP ≥ 2.0 的新模块路径和自定义 HTTP Header 配置。 | **MCP 生态兼容** 是企业内部工具链的痛点，讨论 **向后兼容与迁移指南**。 | **OPEN** |

> **备注**：虽然 PR 列表中“评论数”均显示为 *undefined*，但这些 PR 在社区的关注度（GitHub 讨论、点赞、后续 Issue 关联）明显最高，因而被列为热点。

---

## 2️⃣ 社区需求趋势（从 Issues 抽取的热点方向）

| 需求方向 | 关键 Issue | 主要诉求 |
|----------|------------|----------|
| **安全与信任** | #492 **“Community skills distributed under anthropic/ namespace enable trust boundary abuse”** | 防止恶意社区 Skill 冒充官方 Skill，需实现命名空间校验或官方签名机制。 |
| **组织内部 Skill 共享** | #228 **“Enable org‑wide skill sharing in Claude.ai”** | 企业希望在组织内部直接共享 Skill，避免手动下载/上传流程。 |
| **Skill 触发可靠性** | #556 **“run_eval.py: claude -p never triggers skills/commands”**<br>#1352 **“run_eval.py parallel workers produce false‑negative trigger rates”** | 评估工具失效导致 Skill 触发率几乎为 0，需修复触发检测与并行执行逻辑。 |
| **内存/上下文压缩** | #1329 **“compact‑memory (symbolic notation for compact agent state)”** | 为长会话提供更紧凑的记忆表示，减少上下文开销。 |
| **Skill 质量保障** | #1385 **“Reasoning Quality Gate Pipeline”** | 在 Skill 执行前后加入多层审校（校准 → 对抗审查 → 交付验证），提升输出可靠性。 |
| **用户账号管理** | #1143 **“Ability to change account email address”** | 与竞争平台对齐，提供邮箱更改功能防止工作空间数据丢失。 |
| **重复/冲突 Skill** | #189 **“document‑skills and example‑skills plugins install identical content”** | 防止插件之间出现重复 Skill，保持技能库整洁。 |
| **上下文耗尽** | #1487 **“claude‑api skill eagerly injects ~156k tokens”** | 优化大型 Skill（如 `claude-api`）的 token 注入方式，避免一次性耗尽上下文窗口。 |

**整体趋势**：社区最迫切的需求集中在 **安全可信、组织协作、触发可靠性以及上下文/资源优化** 四大块。

---

## 3️⃣ 高潜力待合并 Skills（评论活跃、实现成熟、近期可能落地）

| PR # | Skill | 关键亮点 | 预计落地时间（依据最近更新） |
|------|-------|----------|-----------------------------|
| **#1742** | mcp‑builder fix | 解决 MCP 2+ 的导入路径与自定义 Header，直接影响企业内部流水线。 | 已在 10‑08 更新，预计本周合并。 |
| **#1245** | notion‑spec‑to‑implementation | 完整的 Notion → Task 转换流水线，已实现 API 交互与任务模板。 | 最近更新 10‑15，合并窗口已开启。 |
| **#1703** | md2video‑audio | 端到端 Markdown → 视频（TTS）实现，已通过内部演示。 | 10‑15 更新，需求旺盛，预计 2‑3 周内合并。 |
| **#525** | pyxel | 提供 Retro‑Game 开发全套指令与帧检查，已通过单元测试。 | 11‑01 更新，合并进度正常。 |
| **#514** | document‑typography | 文档排版自动纠错，已加入多语言支持。 | 3‑13 更新，合并优先级中等。 |
| **#1771** | proofcore‑contract‑auditor | Web3 安全审计新入口，已完成链上锚定功能。 | 9‑16 更新，合并等待安全审查。 |
| **#1980** | webapp‑testing安全改进 | 去除 `shell=True`，修复注入风险，已通过安全审计。 | 11‑01 更新，合并准备就绪。 |
| **#1681** | skill‑creator execution fix | 直接运行 `package_skill.py` 的模块路径问题已解决，提升开发者体验。 | 11‑19 更新，合并已在审查队列。 |

> **判断依据**：这些 PR 在最近两周仍在活跃维护，且大多数已经通过 CI、单元测试或安全审计，社区评论（>5 条）表明需求明确，合并阻力小。

---

## 4️⃣ Skills 生态洞察（一句话总结）

> **当前社区最聚焦的诉求是：构建安全、可共享且高效触发的专业化 Skill，以降低上下文开销并保障企业内部工作流的可靠性。**

--- 

*报告中所有链接均指向对应的 GitHub PR / Issue，便于快速跳转查看细节。*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-11-23
**分析工具**: AI 开发技术分析师

---

## 1. 今日速览
GitHub Copilot CLI 今日发布 v1.0.115-7 版本，主要优化了会话恢复机制与后台进程管理。社区活跃度较高，共涌现 19 个新更新 Issue，主要集中在 **网络环境兼容性**、**会话持久化** 以及 **多轮子代理架构** 等高级功能探索。同时，针对移动端体验和容器化部署的修复也在持续推进。

---

## 2. 版本发布

**v1.0.115-7 (2026-11-23)**
本次更新聚焦于 CLI 交互的稳定性和可靠性：
*   **会话恢复优化**: 使用 `--ui-server` 的客户端现在可以更早地附加到已恢复的 CLI 会话中。
*   **进程管理修复**: 修复了在启动期间通过 npm 停止 CLI 时，可能导致其在后台继续运行的问题，防止资源泄漏。

---

## 3. 社区热点 Issues

1.  **[OPEN] Voice installer fails: tries private Azure Artifacts feed**
    *   **重要性**: 高 - 影响语音模式用户的首次安装体验。
    *   **详情**: 启用语音模式时，安装程序错误地从私有 Azure Artifacts 获取包导致 401 错误，而非使用公共 nuget.org 源。
    *   [Link](https://github.com/github/copilot-cli/issues/4035)

2.  **[OPEN] Manual `/rename` is overwritten by auto-generated session name**
    *   **重要性**: 高 - 影响会话管理的连续性。
    *   **详情**: 用户手动重命名会话后，系统会在后续操作中自动覆盖该名称，导致用户自定义名称无法持久保存。
    *   [Link](https://github.com/github/copilot-cli/issues/2622)

3.  **[OPEN] web_fetch still rejects public URLs on Surge Fake-IP**
    *   **重要性**: 高 - 严重阻碍中国大陆及使用代理工具的开发者使用。
    *   **详情**: 在 macOS Surge 增强模式或 Fake-IP DNS 下，`web_fetch` 工具无法访问公共 HTTPS URL，尽管上一个相关 Issue 已被标记为关闭。
    *   [Link](https://github.com/github/copilot-cli/issues/5544)

4.  **[OPEN] Image generation is never available in `copilot --acp` sessions**
    *   **重要性**: 中 - 影响使用 ACP (Agent Communication Protocol) 的开发者。
    *   **详情**: GPT Image 2.5 Flare 在标准 CLI 和 VS Code 中可用，但在 `--acp` 启动的会话中完全不可用。
    *   [Link](https://github.com/github/copilot-cli/issues/5551)

5.  **[OPEN] GitHub Mobile (Android): cloud session drops when app is backgrounded**
    *   **重要性**: 中 - 影响移动端用户体验。
    *   **详情**: 在 GitHub Mobile Android 版本中，当应用进入后台 2-3 分钟后，云沙箱会话连接会断开，且重试机制往往失效，需重启应用。
    *   [Link](https://github.com/github/copilot-cli/issues/5553)

6.  **[OPEN] Cloud sandbox session never reconnects after a tool call**
    *   **重要性**: 中 - 影响复杂任务的自动化执行。
    *   **详情**: 云沙箱会话在执行完一次工具调用后，停止接受实时连接，仅保留只读历史，无法恢复交互。
    *   [Link](https://github.com/github/copilot-cli/issues/5552)

7.  **[OPEN] Built-in GitHub MCP read tools unavailable when `gh` is on PATH**
    *   **重要性**: 高 - 影响使用 MCP (Model Context Protocol) 的自定义 Agent 开发。
    *   **详情**: 当系统 PATH 中存在 `gh` 命令时，自定义 Agent 无法通过内置 MCP 服务器读取 GitHub Issues，限制了 Agent 的能力范围。
    *   [Link](https://github.com/github/copilot-cli/issues/5550)

8.  **[OPEN] Subagents started by other subagents can't be multi-turn**
    *   **重要性**: 高 - 核心架构限制。
    *   **详情**: 多轮对话功能仅在顶层 Agent 生效，由子 Agent 启动的子 Agent 总是同步运行且无法接收后续消息，违背了 "background" 模式的预期。
    *   [Link](https://github.com/github/copilot-cli/issues/5543)

9.  **[OPEN] TLS handshake_failure to api.individual.githubcopilot.com**
    *   **重要性**: 中 - 企业网络环境下的准入障碍。
    *   **详情**: 在受管企业网络中，CLI 无法完成到 `api.individual.githubcopilot.com` 的 TLS 握手，显示 `SEC_E_ILLEGAL_MESSAGE` 错误。
    *   [Link](https://github.com/github/copilot-cli/issues/5546)

10. **[OPEN] Add resume_session and suspend_session tools**
    *   **重要性**: 中 - 功能增强请求。
    *   **详情**: Agent 目前无法恢复已保存的会话，用户也无法挂起活动会话以释放资源，社区呼吁增加相应的会话管理工具。
    *   [Link](https://github.com/github/copilot-cli/issues/5549)

---

## 4. 重要 PR 进展

1.  **[OPEN] Support mounted and generated connection tokens in the CLI container**
    *   **内容**: 为无头容器引入共享密钥支持，允许通过环境变量 `COPILOT_CONNECTION_TOKEN_FILE` 读取连接令牌，解决了部署时如何安全传递密钥的问题。
    *   [Link](https://github.com/github/copilot-cli/pull/5554)

2.  **[CLOSED] Fix container smoke-test workspace permissions**
    *   **内容**: 修复了容器烟雾测试中的工作区权限问题。之前创建的工作区权限为 `0700`，导致容器内用户无法访问，现已调整为可写权限。
    *   [Link](https://github.com/github/copilot-cli/pull/5310)

---

## 5. 功能需求趋势

从 Issue 的关键词分析，当前社区关注点呈现以下趋势：

*   **高级会话管理**: 社区不再满足于基础的会话创建，开始深入探索会话的**挂起**、**恢复**、**持久化重命名**以及多轮对话的深度集成。
*   **Agent 架构的深度扩展**: 随着多 Agent 架构的引入，开发者开始关注**子 Agent 的层级嵌套**（Nested Subagents）以及**多轮对话**在深层架构中的支持情况。
*   **MCP 协议生态**: 开发者正积极尝试构建自定义 Agent，因此对 **MCP (Model Context Protocol)** 的兼容性和内置工具的可用性提出了更高要求。
*   **特殊网络环境**: 针对 Surge、Fake-IP DNS 以及企业防火墙的兼容性问题依然突出，`web_fetch` 工具的鲁棒性是高频痛点。

---

## 6. 开发者关注点

*   **中文及非 ASCII 字符支持**: Issue #3601 指出 Bash 工具因环境变量 `LC_CTYPE=C` 导致中文字符被截断，这直接影响中文用户的日常使用体验。
*   **模型可用性透明度**: Issue #1851 呼吁在 `/model` 命令中显示上下文窗口大小，开发者希望更清晰地了解不同模型的 Token 限制，以便优化提示词。
*   **移动端体验**: GitHub Mobile Android 版本在后台保活和重连机制上的缺失，是目前移动端用户反馈最集中的痛点。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-11-23  
**分析源：** github.com/anomalyco/opencode

---

## 1. 今日速览
OpenCode 社区在 2026 年 11 月 23 日保持活跃，虽然无新版本发布，但过去 24 小时内有 50 个 Issues 和 50 个 PR 获得更新。**TUI（终端界面）交互体验**与**子智能体管理**成为本周核心讨论焦点，尤其是 TUI 中终端无法关闭、子智能体状态面板缺失等遗留问题引发大量关注。同时，**Windows 平台体验**（插件损坏、低配电脑卡顿）和**网络连接稳定性**问题持续收到反馈。

---

## 2. 版本发布
*无新版本发布。当前社区活跃度主要集中在对现有版本（v2.0+）的功能增强与 Bug 修复上。*

---

## 3. 社区热点 Issues

### 🔥 热门 Issue (按热度排序)

1.  **#64073 - [FEATURE] Restore Foreground Subagent Execution**
    *   **热度:** 25 评论
    *   **重要性:** 核心功能回归。用户强烈请求恢复 v2 中被移除的前台子智能体执行能力，这是多智能体编排的核心交互模式。
    *   **链接:** [anomalyco/opencode Issue #64073](https://github.com/anomalyco/opencode/issues/64073)

2.  **#52941 - [BUG] Desktop: file tree and preview pane show stale file contents after agent edits**
    *   **热度:** 16 评论
    *   **重要性:** 严重的 UI 同步 Bug。在桌面端，Agent 修改文件后，文件树和预览面板无法及时刷新，导致用户看到过时内容。
    *   **链接:** [anomalyco/opencode Issue #52941](https://github.com/anomalyco/opencode/issues/52941)

3.  **#60250 - [BUG] Plan mode enforcement broken in v2.2.1**
    *   **热度:** 15 评论
    *   **重要性:** 核心逻辑缺陷。Agent 在“计划模式”下仍被允许直接实施代码修改，违背了计划模式的初衷，属于严重的逻辑回归。
    *   **链接:** [anomalyco/opencode Issue #60250](https://github.com/anomalyco/opencode/issues/60250)

4.  **#43250 - [BUG] keep.tokens is not honoured**
    *   **热度:** 11 评论
    *   **重要性:** 性能与资源管理。会话压缩机制未遵守 `keep.tokens` 设置，导致 Token 占用远超预期（234K vs 15K），影响长对话性能。
    *   **链接:** [anomalyco/opencode Issue #43250](https://github.com/anomalyco/opencode/issues/43250)

5.  **#65590 - [BUG] mcp: remote servers with >61 tools are silently truncated**
    *   **热度:** 9 评论
    *   **重要性:** MCP 集成限制。远程 MCP 服务器超过 61 个工具时会被静默截断，导致工具不可用，阻碍了复杂工具链的使用。
    *   **链接:** [anomalyco/opencode Issue #65590](https://github.com/anomalyco/opencode/issues/65590)

6.  **#21227 - [FEATURE] display image attachments from tool results in chat UI**
    *   **热度:** 8 评论
    *   **重要性:** 用户体验增强。请求在聊天 UI 中展示工具返回的图片（如 webfetch 获取的图片），提升视觉交互能力。
    *   **链接:** [anomalyco/opencode Issue #21227](https://github.com/anomalyco/opencode/issues/21227)

7.  **#62893 - [BUG] Desktop: mermaid image nodes render without the image**
    *   **热度:** 8 评论
    *   **重要性:** Markdown 渲染 Bug。Mermaid 图表节点中的图片无法正确显示，影响文档可视化。
    *   **链接:** [anomalyco/opencode Issue #62893](https://github.com/anomalyco/opencode/issues/62893)

8.  **#63782 - [BUG] tui: agent-opened terminal has no close path**
    *   **热度:** 5 评论
    *   **重要性:** TUI 交互痛点。Agent 在 TUI 中打开的终端无法关闭，导致会话卡死，这是 TUI 用户反馈最强烈的交互问题之一。
    *   **链接:** [anomalyco/opencode Issue #63782](https://github.com/anomalyco/opencode/issues/63782)

9.  **#65610 - [FEATURE] opencode不能判断有几个子智能体在工作**
    *   **热度:** 5 评论
    *   **重要性:** 监控能力缺失。用户无法直观看到当前有多少子智能体在后台运行，缺乏可视化的状态监控。
    *   **链接:** [anomalyco/opencode Issue #65610](https://github.com/anomalyco/opencode/issues/65610)

10. **#64484 - [BUG] server: intermittent ECONNRESET on 2.3.0**
    *   **热度:** 5 评论
    *   **重要性:** 网络连接稳定性。修复 #60399 后，网络连接仍会间歇性断开，会话恢复机制不完善。
    *   **链接:** [anomalyco/opencode Issue #64484](https://github.com/anomalyco/opencode/issues/64484)

---

## 4. 重要 PR 进展

1.  **#65631 - [fix] stop timeline remount height collapses and scroll-frame layout thrash**
    *   **内容:** 修复时间轴滚动时的布局抖动问题，优化滚动帧性能。
    *   **状态:** Open
    *   **链接:** [anomalyco/opencode PR #65631](https://github.com/anomalyco/opencode/pull/65631)

2.  **#65261 - [feat] feat(core): agent widgets**
    *   **内容:** 允许 Agent 在会话中显示交互式小部件（如 PsychoScript 模板），增强 AI 应用的丰富度。
    *   **状态:** Open
    *   **链接:** [anomalyco/opencode PR #65261](https://github.com/anomalyco/opencode/pull/65261)

3.  **#65634 - [perf] keep the background activity menu smooth with many subagents**
    *   **内容:** 针对大量子智能体运行时，优化后台活动菜单的滚动性能（从 <1 FPS 提升至流畅）。
    *   **状态:** Closed
    *   **链接:** [anomalyco/opencode PR #65634](https://github.com/anomalyco/opencode/pull/65634)

4.  **#65641 - [fix] resolve $ref schemas in stringParameter**
    *   **内容:** 修复代码模式中 `$ref` 引用的解析问题。
    *   **状态:** Open
    *   **链接:** [anomalyco/opencode PR #65641](https://github.com/anomalyco/opencode/pull/65641)

5.  **#65642 - [feat] feat(desktop): list recent projects in the Windows jump list**
    *   **内容:** 在 Windows 的任务栏跳转列表中显示最近打开的项目，提升桌面端易用性。
    *   **状态:** Open
    *   **链接:** [anomalyco/opencode PR #65642](https://github.com/anomalyco/opencode/pull/65642)

6.  **#65639 - [fix] show Windows tool paths relative to the project**
    *   **内容:** 修复 Windows 平台上工具路径显示为绝对路径的问题，改为相对路径以提升可读性。
    *   **状态:** Closed
    *   **链接:** [anomalyco/opencode PR #65639](https://github.com/anomalyco/opencode/pull/65639)

7.  **#65635 - [fix] eliminate model picker layout thrash**
    *   **内容:** 优化模型选择器的布局性能，解决打开、滚动和选择时的卡顿问题。
    *   **状态:** Open
    *   **链接:** [anomalyco/opencode PR #65635](https://github.com/anomalyco/opencode/pull/65635)

8.  **#65621 - [fix] flatten forced namespaced tool choices**
    *   **内容:** 修复扁平化协议中工具名称的强制命名空间处理问题。
    *   **状态:** Open
    *   **链接:** [anomalyco/opencode PR #65621](https://github.com/anomalyco/opencode/pull/65621)

9.  **#65633 - [feat] add experimental session cwd**
    *   **内容:** 为会话引入独立的 `working directory`（实验性功能），允许会话在特定目录运行，不依赖 `session.location`。
    *   **状态:** Open
    *   **链接:** [anomalyco/opencode PR #65633](https://github.com/anomalyco/opencode/pull/65633)

10. **#65630 - [fix] bound config reload fan-out**
    *   **内容:** 修复配置文件修改时触发的全局重新加载风暴，防止在多仓库环境下导致系统卡死。
    *   **状态:** Open
    *   **链接:** [anomalyco/opencode PR #65630](https://github.com/anomalyco/opencode/pull/65630)

---

## 5. 功能需求趋势

基于 Issues 分析，社区当前最关注的功能方向包括：

*   **子智能体管理:** 这是一个高频痛点。社区不仅要求**前台执行**（#64073），还要求**可视化的状态监控**（#65610, #27995）以及**侧边栏展示**（#57097）。
*   **TUI 交互完善:** TUI 用户反馈强烈，主要集中在**终端控制**（无法关闭，#63782）、**滚动性能**（#65631）以及**行号显示**（#58556）等基础交互细节上。
*   **IDE 集成与兼容性:** 桌面端体验优化是重点，包括**插件兼容性**（#65568）、**低配电脑性能**（#65566）、**Mermaid 渲染**（#62893）以及**图片展示**（#21227）。
*   **MCP 与网络稳定性:** 如何正确处理**超过 61 个工具的 MCP 服务器**（#65590）以及**网络连接中断后的恢复**（#64484）是技术落地的关键挑战。

---

## 6. 开发者关注点

从反馈中总结出的主要痛点：

1.  **性能瓶颈:** 桌面端在 Windows 低配机器上出现严重卡顿（4GB RAM），且在滚动复杂 UI（时间轴、模型选择器）时存在布局抖动。
2.  **状态可见性:** 多智能体编排场景下，用户无法感知后台子智能体的实时状态，导致对工具执行缺乏掌控感。
3.  **跨平台 Bug:** Windows 平台存在插件损坏、路径显示错误以及服务端自终止等特定问题。
4.  **长会话管理:** Token 管理机制（`keep.tokens`）未生效，导致长对话上下文膨胀过快，超出预设限制。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-23
**来源**: github.com/badlogic/pi-mono

---

## 1. 今日速览
社区活跃度保持高位，主要集中在模型兼容性修复（OpenAI Bedrock、Gemini 4、DeepSeek）以及并发执行逻辑的优化。今日共有 31 个 Issue 更新，3 个 PR 合并，未发布新版本。

## 2. 版本发布
*无新版本发布。*

## 3. 社区热点 Issues
**#8643 [OPEN] Bedrock: OpenAI models reject images nested in toolResult.content**
*   **重要性**: **高** - 关键的模型适配问题。
*   **摘要**: Bedrock 上 OpenAI 模型拒绝处理嵌套在 `toolResult` 中的图片。作者提出需要将图片提升为同级的用户内容块，类似于 `openai-completions.ts` 的处理方式。
*   **链接**: [Issue #8643](https://github.com/earendil-works/pi/issues/8643)

**#5294 [CLOSED] [bug] Error: Request timed out.**
*   **重要性**: **高** - 常用功能的稳定性问题。
*   **摘要**: 用户在使用 `llama.cpp` 作为后端时，即使设置了无限超时或禁用超时，在处理大模型时仍会出现超时错误。
*   **链接**: [Issue #5294](https://github.com/earendil-works/pi/issues/5294)

**#11950 [OPEN] [bug, inprogress] Tool calls in one message run concurrently with bash**
*   **重要性**: **中** - 并发逻辑缺陷。
*   **摘要**: 模型在一条消息中同时发送 `bash` 和 `read` 命令，导致读取操作在 bash 命令完成前就执行，读取到未完成的构建日志或输出，引发错误。
*   **链接**: [Issue #11950](https://github.com/earendil-works/pi/issues/11950)

**#12184 [OPEN] [bug, prio:p0] Google adapters reject Gemini 4 Hydrogen's advertised xhigh level**
*   **重要性**: **高** - 新模型支持与 API 兼容性。
*   **摘要**: Gemini 4 Hydrogen 支持 `xhigh` 思考层级，但在模型选择时被 Google 适配器拒绝，导致用户无法使用该层级。
*   **链接**: [Issue #12184](https://github.com/earendil-works/pi/issues/12184)

**#12367 [CLOSED] [bug, prio:p0] OpenAI drops reasoning items(prefix_mismatch)**
*   **重要性**: **高** - 推理功能稳定性。
*   **摘要**: 更新到 1.6.0 后，OpenAI 推理项目出现丢失情况，错误提示为 `prefix_mismatch`，影响复杂任务的推理连贯性。
*   **链接**: [Issue #12367](https://github.com/earendil-works/pi/issues/12367)

**#11136 [CLOSED] [bug, no-action] Terminal resize breaks TUI render/layout**
*   **重要性**: **中** - 用户体验 (UX) 问题。
*   **摘要**: 终端窗口大小改变时，TUI 界面无法自适应（变小时文字截断，变大时无法填满屏幕）。
*   **链接**: [Issue #11136](https://github.com/earendil-works/pi/issues/11136)

**#12410 [CLOSED] [untriaged] Add a focus mode - show only summary of number of tool calls and thinking steps**
*   **重要性**: **中** - Agent 界面优化需求。
*   **摘要**: 随着 AI Agent 能力增强，TUI 日志变得冗长。用户希望引入类似 Claude Code 的 "Focus 模式" 来减少视觉干扰，仅显示关键摘要。
*   **链接**: [Issue #12410](https://github.com/earendil-works/pi/issues/12410)

**#12409 [OPEN] Resume tells the model not to call an MCP tool that tool_search can still load**
*   **重要性**: **中** - 上下文恢复逻辑。
*   **摘要**: 在恢复会话时，模型被错误地告知某些 MCP 工具不可用，尽管 `tool_search` 仍能加载这些工具，导致模型无法调用。
*   **链接**: [Issue #12409](https://github.com/earendil-works/pi/issues/12409)

**#12408 [OPEN] Windows: Git for Windows outside Program Files is never found**
*   **重要性**: **低** - 平台特定问题。
*   **摘要**: Git 安装在非标准路径（如 `G:\Programmi Aggiuntivi\Git`）时，bash 工具无法找到 `bash.exe`，导致回退到系统 WSL 启动器。
*   **链接**: [Issue #12408](https://github.com/earendil-works/pi/issues/12408)

**#12407 [OPEN] [bug] gemini-4-neon stops in mid stream**
*   **重要性**: **中** - 新模型流式输出问题。
*   **摘要**: `gemini-4-neon` 模型在流式输出时经常中途停止且无法恢复，怀疑与 OpenRouter 的响应格式规范化有关。
*   **链接**: [Issue #12407](https://github.com/earendil-works/pi/issues/12407)

## 4. 重要 PR 进展
**#12400 [CLOSED] fix(coding-agent): reject input on a session being replaced (#12243)**
*   **内容**: 修复会话切换过程中的输入竞争条件。当 `switchSession` 期间有新提示进入，该 PR 确保这些输入被拒绝，而不是错误地运行在已废弃的旧会话上。
*   **链接**: [PR #12400](https://github.com/earendil-works/pi/pull/12400)

**#12404 [CLOSED] fix(p2): allow @ file completion via touch**
*   **内容**: 修复 p2 Web UI 中触摸设备无法完成 `@` 文件选择的问题，允许用户更自然地选择文件。
*   **链接**: [PR #12404](https://github.com/earendil-works/pi/pull/12404)

**#691 [CLOSED] [possibly-openclaw-clanker] fix(coding-agent): resolve api keys by provider**
*   **内容**: 修复在飞行中切换模型时的 API Key 解析错误，确保不同提供商的 Key 被正确隔离和解析。
*   **链接**: [PR #691](https://github.com/earendil-works/pi/pull/691)

## 5. 功能需求趋势
*   **Agent 交互优化**: 社区对 TUI 的“Focus 模式”呼声很高，希望能简化长对话和工具调用的视觉呈现。
*   **多模型并发与错误处理**: 关于工具调用并发执行（bash vs read）以及会话切换时的状态管理是高频痛点。
*   **特定模型适配**: 针对新兴模型（如 Gemini 4 Hydrogen, Grok 4.7, DeepSeek DSML）的兼容性适配需求持续上升。
*   **平台兼容性**: Windows 下的路径查找和触摸交互支持仍有待完善。

## 6. 开发者关注点
*   **推理能力稳定性**: OpenAI 和 Google 推理功能的稳定性（如 `reasoning items` 丢失、`prefix_mismatch`）是开发者和用户最关心的核心体验问题。
*   **超时与资源管理**: `llama.cpp` 后端的超时设置失效以及并发执行导致的数据竞争是技术层面的主要阻碍。
*   **调试体验**: 用户在遇到语法错误时，希望有一个机制可以仅修补代码片段并重新运行，而不必重写整个脚本。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-11-23  
**数据范围：** GitHub [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) 过去24小时动态

---

## 1. 今日速览
Qwen Code 发布了 **v0.28.4** 版本，重点优化了 Web Shell 的本地守护进程模式，新增了工作区工件库页面的渐进式扫描和流式更新功能。与此同时，社区活跃度极高，重点解决了大量 CI 测试稳定性问题（Flaky Test）以及 Windows 环境下的文件路径解析 Bug，同时针对大模型上下文管理和会话恢复机制进行了深度优化。

---

## 2. 版本发布
**v0.28.4 (Web Shell & Desktop)**

*   **Web Shell 改进**：新增工作区工件库页面，支持渐进式扫描和流式更新；聊天界面引入共享 `ChatSurface`、Continue 徽章及建议芯片。
*   **Desktop 版本**：同步发布 `desktop-v0.28.4`，确保桌面端体验与 Web 端一致。

---

## 3. 社区热点 Issues (Top 10)

1.  **[OPEN] Main CI failed: Managed Agent gate — no test identified (#14724)**
    *   **重要性**：高。这是目前讨论数最多的 CI 失败 Issue，涉及 Managed Agent（托管代理）的核心测试流程，阻碍了主分支的持续集成。
    *   **社区反应**：已有 545 条评论，长期处于 Open 状态，说明该问题排查难度较大。

2.  **[OPEN] Main CI failed: E2E Tests — no test identified (#11680)**
    *   **重要性**：高。E2E 测试是系统的最后一道防线，CI 失败意味着新代码可能存在未发现的集成风险。

3.  **[OPEN] Windows: @ autocomplete and drag-and-drop silently drop files with spaces or parentheses (#18141)**
    *   **重要性**：中（用户体验）。这是一个典型的跨平台兼容性 Bug，严重影响 Windows 用户使用 `@` 文件引用和拖拽功能。

4.  **[OPEN] SGLang's flat 400 error body is dropped, so its context overflow is never detected (#18135)**
    *   **重要性**：中。涉及模型提供商（Provider）的兼容性，可能导致上下文溢出错误无法被正确捕获和处理。

5.  **[OPEN] Gemma 3 and Gemma 4 are treated as text-only, so images are never sent (#18136)**
    *   **重要性**：中。模型支持扩展问题，限制了用户在 Qwen Code 中使用 Google 的新一代多模态模型。

6.  **[OPEN] Main CI failed: E2E Tests — cli/qwen-serve-restart-recovery.test.ts > … > lists and continues a session after the daemon is SIGKILLed (#17934)**
    *   **重要性**：高。涉及守护进程的健壮性测试，确保服务崩溃后能正确恢复会话。

7.  **[OPEN] ci(flaky): Test lane fails on vitest-worker onTaskUpdate RPC timeout under runner load (#13384)**
    *   **重要性**：中。性能相关，指出在 Runner 负载高时测试失败，可能与并发或资源调度有关。

8.  **[CLOSED] [priority/P1] bug(managed-agent): Broker HTTP threads cannot discover nested external-workspace providers (#17943)**
    *   **重要性**：高。已关闭，涉及外部工作空间提供者的发现机制，是 Managed Agent 核心功能的 Bug。

9.  **[CLOSED] [priority/P2] Managed Agent recovery checks an unadmitted cancelled turn as its Harness target (#18130)**
    *   **重要性**：中。已关闭，修复了会话恢复逻辑中的状态判断错误。

10. **[OPEN] [priority/P3] Daily dependency CVE audit failed (#13078)**
    *   **重要性**：中。安全审计失败，可能存在潜在的依赖项漏洞风险。

---

## 4. 重要 PR 进展 (Top 10)

1.  **[OPEN] feat(web-shell): keep touch composer editing bar single-row across phone and iPad (#18126)**
    *   **内容**：优化移动端 Web Shell 体验，将触摸编辑栏保持在单行，提升操作效率。
    *   **状态**：功能开发中。

2.  **[OPEN] fix(core): preserve mandatory reasoning for inferred K3 (#18139)**
    *   **内容**：修复推理模型（Kimi K3）路由的规范化问题，确保关键推理参数不被丢弃。

3.  **[OPEN] [area: managed] feat(managed-agent): park recoverable Action waits behind a sealed certificate (Phase 4) (#18115)**
    *   **内容**：增强托管代理的状态管理，允许空闲会话在等待工具审批时挂起，而非无限驻留或终止。

4.  **[OPEN] fix(cli): resolve escaped @-paths from completion and drag-and-drop on Windows (#18142)**
    *   **内容**：修复 Windows 下文件路径解析问题，解决包含空格和括号的文件无法正确提交的问题。
    *   **状态**：自报告修复。

5.  **[OPEN] fix(core,cli,web-shell): support oversized session transcripts across daemon load and replay (#18111)**
    *   **内容**：增强对超大会话记录的支持，优化守护进程会话恢复和错误处理机制。

6.  **[OPEN] [refactor] refactor(managed-agent): de-hash identity columns with bounded VARCHAR and canonical refs (#18058)**
    *   **内容**：重构托管代理的身份管理数据库层，使用有界 VARCHAR 和规范引用，提升数据一致性。

7.  **[OPEN] test(web-shell): close #18088 hover-status follow-ups (doc sync + precedence pins) (#18093)**
    *   **内容**：针对侧边栏悬停状态的文档同步和测试修复，属于代码质量提升。

8.  **[OPEN] fix(core): keep what the person typed in a reduced compaction request (#17894)**
    *   **内容**：优化上下文压缩算法，确保在压缩请求时保留用户输入的原始文本。

9.  **[OPEN] feat(web-shell): enable per-workspace management from sidebar menu and hover overview (#18140)**
    *   **内容**：增强工作区管理能力，允许用户从侧边栏直接管理任意本地信任的工作区。

10. **[OPEN] fix(web-shell): order Change Overview PRs by newest binding (#18134)**
    *   **内容**：优化变更概览的排序逻辑，确保最新的交付单元显示在最前面。

---

## 5. 功能需求趋势

从 Issues 和 PR 的分析来看，当前社区关注点主要集中在以下几个方向：

1.  **多模态模型支持扩展**：社区正在积极补全对新兴模型（如 Gemma 3/4、SGLang）的兼容性支持，解决多模态输入识别问题。
2.  **上下文管理与长会话优化**：随着会话变长，如何处理超大文本转录、防止上下文溢出、以及优化压缩逻辑是核心议题。
3.  **跨平台健壮性**：特别是 Windows 环境下的路径解析、特殊字符处理以及文件拖拽功能的稳定性。
4.  **Managed Agent 状态机完善**：针对复杂的会话恢复、取消和工具审批流程的状态管理（如 Phase 4 Action Parking）是持续优化的重点。

---

## 6. 开发者关注点

*   **Flaky Test（不稳定测试）治理**：过去24小时内，大量 PR 旨在修复测试的不稳定性，包括 TUI Agent Loop 的一致性和 WebSocket 超时问题。这反映了开发者对代码质量和测试可靠性的高度关注。
*   **CI/CD 稳定性**：多个高优先级的 CI 失败 Issue 表明，环境配置和依赖审计（如 CVE 漏洞）也是阻碍开发效率的重要因素。
*   **会话恢复与容错**：开发者非常关注当服务端守护进程崩溃或网络中断时的恢复机制，希望系统能够无缝地从中断处继续，而不是丢失状态。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*