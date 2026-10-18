# AI CLI 工具社区动态日报 2026-10-19

> 生成时间: 2026-10-18 22:03 UTC | 覆盖工具: 9 个

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



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

作为专注于 Claude Code 生态的技术分析师，我根据 `anthropics/skills` 官方仓库截至 2026 年 10 月 19 日的数据，为您梳理了这份社区热点与生态演进报告。

---

### 一、 热门 Skills 排行（关注度最高的核心 Skills）

以下是社区讨论度最高、衍生修改最频繁的 6 个关键 Skill 及相关 PR：

1. **`skill-creator`（技能创造器与安全硬化）**
   * **功能**：用于编写、验证、打包和优化 Claude Skills 的元技能。
   * **社区热点**：社区围绕其安全性、Windows 兼容性及评估机制展开了大量讨论（如 PR #1961、#1298、#1681）。特别是在 PR #1961 中，社区对 eval viewer 进行了深度安全硬化（防范脚本越狱、跨站 POST 和 DNS 重绑定）。
   * **状态**：`[OPEN]` 多项优化中
   * **相关链接**：[PR #1961](https://github.com/anthropics/skills/pull/1961) | [PR #1298](https://github.com/anthropics/skills/pull/1298)

2. **`mcp-builder`（MCP 服务构建与连接器）**
   * **功能**：辅助开发者构建和测试 Model Context Protocol (MCP) 服务器。
   * **社区热点**：适配 `mcp>=2.0.0` 带来的 API 变更（如 `streamablehttp_client` 重命名及自定义 HTTP 头配置），修复评估框架中因序列化问题导致的“全 0 分”假阴性故障（PR #1742, Issue #1390）。
   * **状态**：`[OPEN]`
   * **相关链接**：[PR #1742](https://github.com/anthropics/skills/pull/1742)

3. **`docx` / `document-typography`（专业文档处理与排版）**
   * **功能**：处理 Word 文档、修订追踪、格式转换及排版质量控制。
   * **社区热点**：社区持续修正文档自动化中的边缘 Case，如 LibreOffice 超时报错、XML 命名空间丢失导致的无效文档（PR #1792, Issue #2018），以及通过 `document-typography` 解决孤行、寡行等 AI 生成文档的排版硬伤（PR #514）。
   * **状态**：`[OPEN]`
   * **相关链接**：[PR #1792](https://github.com/anthropics/skills/pull/1792) | [PR #514](https://github.com/anthropics/skills/pull/514)

4. **`claude-api`（Claude 官方 API 与开发指南）**
   * **功能**：提供 Claude API、Tool Use 概念及 Academy 指南。
   * **社区热点**：近期主要清理死链（PR #1730），并修复了因 eagerly inject 注入过大 token 导致单次调用直接耗尽上下文窗口的严重缺陷（Issue #1487）。
   * **状态**：`[OPEN]`
   * **相关链接**：[PR #1730](https://github.com/anthropics/skills/pull/1730) | [Issue #1487](https://github.com/anthropics/skills/issues/1487)

5. **`harness` / `architecture-advisor`（规格驱动开发与架构顾问套件）**
   * **功能**：引入多 Agent 规格驱动开发（SDD）、派发纪律及对抗性审查流程（PR #2039, #2040）。
   * **社区热点**：作为从成熟开源 SDD 套件提取的生产级工作流，它标志着社区 Skills 正从“单点小工具”向“多 Agent 复杂工程管理”演进。
   * **状态**：`[OPEN]`（最新提交）
   * **相关链接**：[PR #2040](https://github.com/anthropics/skills/pull/2040) | [PR #2039](https://github.com/anthropics/skills/pull/2039)

6. **`md2video-audio`（Markdown 转多媒体视频）**
   * **功能**：零成本将 Markdown 文档直接编译为带有逼真人声配音的专业 MP4 视频（结合 Marp 等工具）。
   * **社区热点**：展示了 Claude Skills 在富媒体内容生成和自动化工作流延伸上的想象力。
   * **状态**：`[OPEN]`
   * **相关链接**：[PR #1703](https://github.com/anthropics/skills/pull/1703)

---

### 二、 社区需求趋势（Issues 反映的新 Skill 方向与痛点）

通过对高热度 Issues 的聚类分析，社区当前最期待和呼吁的新 Skill 方向集中在：

1. **AI 代理治理与安全（Agent Governance & Safety）**
   * 社区强烈呼吁引入诸如 `agent-governance`（Issue #412）和命名空间隔离机制（Issue #492）。随着社区技能激增，防范社区技能伪装成官方 `anthropic/` 命名空间进行特权滥用，以及建立代理行为审计轨迹已成刚需。
2. **长效记忆与状态管理（Long-term Context & Memory）**
   * 开发者频繁遭遇长任务中上下文耗尽的问题。以 `compact-memory`（Issue #1329）为代表的提案呼吁引入符号化状态 notation，以解决大模型在长航时对话中被冗长 prose 吞噬上下文的痛点。
3. **企业级协作与共享（Enterprise Sharing）**
   * 组织内部对便捷分享 Skills 的呼声极高（Issue #228）。目前依赖手动分发 `.skill` 文件的痛点促使社区期待组织级 Skill 共享中心或直链协作。
4. **全生命周期质量网关（Quality Gates & Adversarial Review）**
   * 社区对代码和任务交付提出了更高的工程化标准，如提出的“推理质量网关管道”（Reasoning Quality Gate Pipeline, Issue #1385），涵盖前置校准、对抗性审查和交付验证。

---

### 三、 高潜力待合并 Skills（近期值得关注的 PR）

以下 PR 评论活跃、实用性极高，预计近期有较高落地可能：

* **`notion-spec-to-implementation` & `quantitative-resume-auditor` (PR #1245)**：打通 Notion 产品/技术规格说明书到 Claude Code 具体实现任务的自动化桥梁，极具工程落地价值。[PR #1245](https://github.com/anthropics/skills/pull/1245)
* **`proofcore-contract-auditor` (PR #1771)**：面向 Web3 开发者，提供 Solidity/Rust 智能合约静态分析，并将密码学审计证明锚定到 TON 公链的创新 Web3 安全 Skill。[PR #1771](https://github.com/anthropics/skills/pull/1771)
* **`scnet-hpc` (PR #1615)**：面向高性能计算（HPC）领域，支持通过 SSH 和 Slurm 工作流直接操作 SCNet 集群，扩展了 Claude Code 在科学计算和超算领域的边界。[PR #1615](https://github.com/anthropics/skills/pull/1615)
* **`odt` 格式支持 (PR #486)**：填补了开源/ISO 标准文档（OpenDocument 格式 `.odt`/`.ods`）创建、填充与转换的生态空白。[PR #486](https://github.com/anthropics/skills/pull/486)

---

### 四、 Skills 生态洞察

> **当前社区在 Skills 层面最集中的诉求是：从“实验性单点小工具（Demo-ware）”向“具备企业级安全、多 Agent 流程编排与严密评估网关的生产级基础设施（Production-grade Infrastructure）”加速跃升。**

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 (2026-10-19)

---

### 1. 今日速览
过去 24 小时内，Gemini CLI 社区持续聚焦于**智能体（Agent）行为优化、多模态工具响应稳定性以及终端渲染（Ink/TUI）体验**。官方发布了最新的 Nightly 版本（`v0.66.0-nightly.20261018`），同时开发者提交了大量针对配额回退机制、剪贴板兼容性（WSL2）及模型层级配置保留的修复补丁。

---

### 2. 版本发布
* **v0.66.0-nightly.20261018.ged96faedf**
  * **详情**: 自动生成的每日夜间构建版本，包含过去 24 小时内合并的各项核心与 Agent 优化修复。
  * [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.66.0-nightly.20261017.ged96faedf...v0.66.0-nightly.20261018.ged96faedf)

---

### 3. 社区热点 Issues
以下是近期互动最频繁、最值得关注的 10 个 Issue：

1. **#22323 Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption**
   * **关注点**: 子智能体（`codebase_investigator`）在达到最大轮次限制（MAX_TURNS）后错误地报告状态为 `success` 并终止于 `GOAL`，掩盖了中断事实。
   * [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323) (评论: 13, 👍: 2)
2. **#19873 Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing**
   * **关注点**: 探讨如何利用 Gemini 3 模型天然的 bash 亲和力，通过零依赖的操作系统沙箱和执行后意图路由来优化代码库探索。
   * [Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873) (评论: 9, 👍: 1)
3. **#21409 Generalist agent hangs**
   * **关注点**: 用户反馈当 `gemini-cli` 将任务分发给通用智能体时会出现无限挂起（如创建文件夹操作）。
   * [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409) (评论: 8, 👍: 8)
4. **#22745 Assess the impact of AST-aware file reads, search, and mapping**
   * **关注点**: 评估引入 AST（抽象语法树）感知的文件读取、搜索和代码库映射对降低 Token 消耗和提高准确性的价值。
   * [Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745) (评论: 7, 👍: 1)
5. **#21968 Gemini does not use skills and sub-agents enough**
   * **关注点**: 反馈 Gemini 在默认情况下较少自主调用自定义技能（Skills）和子智能体，往往需要显式提示。
   * [Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968) (评论: 7, 👍: 0)
6. **#22267 Browser Agent ignores settings.json overrides (e.g., maxTurns)**
   * **关注点**: 浏览器智能体完全忽略全局或项目级 `settings.json` 中的配置覆写。
   * [Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267) (评论: 4, 👍: 0)
7. **#21983 browser subagent fails in wayland**
   * **关注点**: 浏览器子智能体在 Wayland 显示服务器环境下运行失败。
   * [Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983) (评论: 4, 👍: 1)
8. **#24246 Gemini CLI encounters 400 error with > 128 tools**
   * **关注点**: 当可用工具超过 128 个时，Gemini CLI 会触发 API 400 错误，促使工具作用域限制机制的改进需求。
   * [Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246) (评论: 3, 👍: 0)
9. **#22672 Agent should stop/discourage destructive behavior**
   * **关注点**: 讨论如何防止模型在复杂的 Git 操作（如 `git reset --force`）或数据库维护中采取破坏性行为。
   * [Issue #22672](https://github.com/google-gemini/gemini-cli/issues/22672) (评论: 3, 👍: 1)
10. **#22186 get-shit-done output hook causes crash**
    * **关注点**: 汇报了当 `get-shit-done` 输出钩子完成并打印用户摘要时导致 CLI 崩溃的 Bug。
    * [Issue #22186](https://github.com/google-gemini/gemini-cli/issues/22186) (评论: 3, 👍: 0)

---

### 4. 重要 PR 进展
以下是近期更新的 10 个重要 Pull Requests：

1. **#29818 feat(cli): improve /skill-name activation prompt and document manual activation**
   * **内容**: 改进了无参数激活技能时的默认提示词，并为手动交互激活提供了更好的文档支持。
   * [PR #29818](https://github.com/google-gemini/gemini-cli/pull/29818)
2. **#29629 fix(cli): cap pending plain text height to reduce streaming flicker**
   * **内容**: 限制流式传输中待处理纯文本的高度，有效解决了响应过高时每帧全屏刷新导致的闪烁问题。
   * [PR #29629](https://github.com/google-gemini/gemini-cli/pull/29629)
3. **#29798 fix(cli): restore approval focus after cancelling editor selection**
   * **内容**: 修复使用 Escape 键关闭外部编辑器选择后，能正确返回至可用的工具批准状态。
   * [PR #29798](https://github.com/google-gemini/gemini-cli/pull/29798)
4. **#29799 fix(cli): preserve quota-interrupted sessions and stop on Escape**
   * **内容**: 确保在配额耗尽或请求取消中断时，保留最新的用户提示和已完成的工具轮次，不会被退出清理逻辑清除。
   * [PR #29799](https://github.com/google-gemini/gemini-cli/pull/29799)
5. **#29801 fix(mcp): pair proxy fetch with its Undici dispatcher**
   * **内容**: 修复 Node 26 下的 HTTP MCP 连接问题，通过正确配对 Undici 调度器来维持授权头和初始化请求。
   * [PR #29801](https://github.com/google-gemini/gemini-cli/pull/29801)
6. **#29762 fix(settings): preserve disk edits when changing authentication**
   * **内容**: 更改设置（包括身份验证方法）时，基于当前磁盘内容写入变更属性，防止覆盖启动后的其他磁盘编辑。
   * [PR #29762](https://github.com/google-gemini/gemini-cli/pull/29762)
7. **#29800 fix(core): fall back across model tiers only when Auto quota is exhausted**
   * **内容**: 重构终端配额处理逻辑，使 Auto 模式在真正耗尽配额时能够在模型层级（Pro ↔ Flash）之间自动无缝路由。
   * [PR #29800](https://github.com/google-gemini/gemini-cli/pull/29800)
8. **#29810 fix(core): keep alias generateContentConfig when a model tier resolves to its own first choice**
   * **内容**: 修复了自定义别名指向模型层级时意外丢失 `generateContentConfig`（如温度、思考级别等）的问题。
   * [PR #29810](https://github.com/google-gemini/gemini-cli/pull/29810)
9. **#29806 fix(cli): support WSL2 clipboard display server fallbacks and non-PNG image formats**
   * **内容**: 增强了图像粘贴（`Alt+V`）功能，支持 WSL2 环境下无 `XDG_SESSION_TYPE` 时的 Display Server 回退以及非 PNG 格式（如 BMP）。
   * [PR #29806](https://github.com/google-gemini/gemini-cli/pull/29806)
10. **#29807 fix(cli): count Thai/Lao SARA AM as one column in string width**
   * **内容**: 修复泰语/老挝语字符在终端宽度计算中的不一致问题，解决了在 tmux 中导致光标不同步和行重复的 Bug。
   * [PR #29807](https://github.com/google-gemini/gemini-cli/pull/29807)

---

### 5. 功能需求趋势
从当前的 Issues 分布来看，社区的主要功能诉求集中在：
* **AST 感知工具链**: 呼吁引入 AST（抽象语法树）感知的文件读取与搜索，减少不必要的 Token 消耗并提升代码定位精度（如 #22745、#22746）。
* **子智能体（Subagent）生态与协同**: 用户期待增强子智能体的背景运行能力（如通过 `Ctrl+B` 后台化 #22741）、共享内存协作（#18287）以及更完善的轨迹分享机制（#22598）。
* **任务追踪持久化**: 推动废弃依赖上下文的 `WriteToDo`，转向基于持久化文件的任务追踪机制（#18836、#21000）。

---

### 6. 开发者关注点
当前开发者反馈较多的痛点与高频需求包括：
1. **流式传输与 TUI 稳定性**: 终端频繁刷新、长文本造成的闪烁、以及在调整窗口大小时的性能表现（#21924, #29629）。
2. **多模态与工具超限报错**: 当工具数量过多时触发 API 400 错误（#24246），以及子智能体多模态返回结果的丢失问题。
3. **环境兼容性**: 针对特定 Linux 发行版（Wayland）和 WSL2 环境下的浏览器子智能体及剪贴板兼容性问题（#21983, #29806）。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期**: 2026-10-19
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览

过去 24 小时内，Copilot CLI 社区主要聚焦于 **Agent 框架迁移带来的兼容性问题**（如权限回归、沙箱超时）以及 **MCP (Model Context Protocol) 协议的集成优化**。同时，基础设施方面出现了多起 Bazel 缓存容器的高可用性警报，但均已恢复。社区对 **外部模型提供商 API** 的支持提出了进一步的规范化需求。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 社区热点 Issues (Top 10)

1.  **[area:permissions] 权限管理回归：手动批准不再提示**
    *   **摘要**: 在 2026 年 10 月的 Copilot agent harness 迁移后，VS Code Copilot Chat 不再在执行仓库修改命令（如 `git add`）前请求明确批准。这是一个严重的回归问题，可能导致用户误操作。
    *   **热度**: 🔴 高危
    *   [链接](https://github.com/github/copilot-cli/issues/5177)

2.  **[area:platform-linux] Linux 沙箱环境：Shell 命令约 10 秒后强制终止**
    *   **摘要**: 在 Linux 上启用沙箱后，执行超过约 10 秒的命令会被 SIGKILL 杀死，且无错误信息。这严重影响了长时间运行任务的可用性。
    *   **热度**: 🔴 关键
    *   [链接](https://github.com/github/copilot-cli/issues/5176)

3.  **[area:models] Claude/Gemini 模型报错 HTTP 400**
    *   **摘要**: 使用 Claude Sonnet 5.5 和 Gemini Argon 模型时，API 返回 "request body is not valid JSON" 错误，而其他模型运行正常。这表明特定模型与 CLI 的请求序列化存在兼容性问题。
    *   **热度**: 🟡 中等
    *   [链接](https://github.com/github/copilot-cli/issues/5139)

4.  **[area:mcp] MCP text/plain 资源返回空内容**
    *   **摘要**: 当 MCP 工具返回 base64 编码的 `text/plain` 资源时，模型无法接收到任何输出，导致工具调用失败。这是 MCP 协议集成的关键 Bug。
    *   **热度**: 🟡 中等
    *   [链接](https://github.com/github/copilot-cli/issues/4916)

5.  **[area:agents] code-review Agent 启动失败**
    *   **摘要**: 使用 `--agent code-review` 时，在推理开始前就报错 "Selected custom agent system prompt callback is unavailable"。这表明内置 Agent 的配置回调机制存在缺陷。
    *   **热度**: 🟡 中等
    *   [链接](https://github.com/github/copilot-cli/issues/5178)

6.  **[triage] 允许批准时附带未来行动的指导**
    *   **摘要**: 用户希望在批准权限提示时，不仅能说 "Yes"，还能附加解释性文本。目前的 "No" 选项支持此功能，"Yes" 不支持。
    *   **热度**: 🟢 功能建议
    *   [链接](https://github.com/github/copilot-cli/issues/5187)

7.  **[area:non-interactive] ACP 模式下任务总结未正确发送**
    *   **摘要**: 在 ACP (Autonomous Coding Pilot) 模式下，当任务结束时，最终的总结仅作为工具调用发送，而非作为 Agent 消息块，导致客户端无法正常接收摘要。
    *   **热度**: 🟡 中等
    *   [链接](https://github.com/github/copilot-cli/issues/5150)

8.  **[area:sessions] 会话中断后无使用记录**
    *   **摘要**: 当 CLI 在流式响应过程中崩溃，不会生成任何 `assistant.usage` 事件，导致计费和账单记录出现缺口。
    *   **热度**: 🟢 基础设施
    *   [链接](https://github.com/github/copilot-cli/issues/5138)

9.  **[triage] macOS Surge Fake-IP 导致 web_fetch 失败**
    *   **摘要**: 在 macOS 使用 Surge 增强模式时，系统 DNS 返回 Fake-IP，导致 Copilot CLI 的 `web_fetch` 无法访问公共文档。
    *   **热度**: 🟢 环境适配
    *   [链接](https://github.com/github/copilot-cli/issues/5180)

10. **[area:models] 提议外部模型提供商 API 规范**
    *   **摘要**: 社区提议明确外部模型提供商的 API 表面，区分 VS Code 扩展 API 和 CLI 运行时 API，以减少混淆并支持 BYOK（自带密钥）。
    *   **热度**: 🟢 架构讨论
    *   [链接](https://github.com/github/copilot-cli/issues/2710)

---

## 4. 重要 PR 进展 (Top 10)

1.  **[OPEN] Update feature_request.yml**
    *   **内容**: 更新了 `feature_request.yml` 工作流，该 PR 旨在自动关闭无效的 PR 写入操作，维护仓库质量。
    *   **状态**: 待审核
    *   [链接](https://github.com/github/copilot-cli/pull/5186)

*(注：过去 24 小时内仅有 1 个 PR 更新，且为维护类更新。更多 PR 详情需结合历史数据补充，此处列出唯一活跃 PR)*

---

## 5. 功能需求趋势

基于今日 Issue 数据，社区关注点集中在以下三个方向：

1.  **Agent 交互体验与安全性**:
    *   **核心痛点**: Agent harness 迁移后的权限管理（审批流）回归、沙箱环境的稳定性（超时/崩溃）。
    *   **需求**: 更精细的权限控制、更长的命令执行时间限制、以及沙箱崩溃时的更友好错误提示。

2.  **多模型与 MCP 协议支持**:
    *   **核心痛点**: 新一代模型（Claude 5.5, Gemini Argon）的集成报错、MCP 资源传输机制（Base64 Blob）失效。
    *   **需求**: 强化对不同模型 API 的兼容性、修复 MCP 协议在文本资源传输上的 Bug。

3.  **高级 Agent 模式 (ACP) 的稳定性**:
    *   **核心痛点**: ACP 模式下任务总结的交付格式错误、内置 Agent（如 code-review）的回调机制缺失。
    *   **需求**: 确保 ACP 模式下完整的 Agent 生命周期管理（输入、处理、输出、总结）。

---

## 6. 开发者关注点

*   **计费与监控**: Issue #5138 指出流式响应中断导致的计费记录缺失，这对企业级用户（需精确核算成本）是一个严重隐患。
*   **Linux 用户体验**: Issue #5176 限制了 Linux 沙箱环境下的命令执行时长，这对需要在 Linux 服务器上进行复杂 CI/CD 或运维任务的开发者构成了阻碍。
*   **代理工具冲突**: Issue #5180 揭示了开发者在使用 Surge 等系统级代理工具时，Copilot CLI 的网络请求会被拦截，这是一个常见的网络配置兼容性问题。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-10-19  
**数据来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
过去24小时内，**免费模型服务出现异常**引发大量用户关注，Windows 平台的 TUI（终端用户界面）频繁崩溃和弹窗问题也导致开发体验下降。与此同时，V2 版本的功能迭代持续推进，包括侧边栏终端管理、语音插件支持和 Gemini 实时语音支持等新特性。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues

### 🔴 [严重] 免费模型服务故障
*   **#56324** [OPEN] Free models fail inside official OpenCode TUI with "free tier can only be used from within OpenCode" (Windows, v2.0.32)
*   **#56488** [CLOSED] "OpenCode's free tier can only be used from within OpenCode..."
*   **#56543** [CLOSED] Free-tier models intermittently fail with "OpenCode's free tier can only be used from within OpenCode"
*   **#56762** [OPEN] Forbidden, OpenCode Free Model Gateway Detect Abuse Traffic
*   **#56552** [CLOSED] Rate limit exceeded. Please try again later.

**分析**: 这是一个高优先级的稳定性问题。多个用户反馈在 Windows 环境下，官方桌面应用和 CLI 无法正常使用免费模型，或直接报错提示“仅限在 OpenCode 内部使用”。这表明 OpenCode 的免费模型网关可能存在验证逻辑错误或滥用检测机制过于敏感，导致大量有效请求被拒绝。

### ⚠️ [体验] TUI 崩溃与弹窗干扰
*   **#56856** [OPEN] TUI crash: e.replace is not a function.
*   **#51887** [OPEN] OpenCode2 CLI Endlessly Pops Up Windows on Windows
*   **#56704** [OPEN] Windows: first TUI launch flashes several console windows

**分析**: TUI 是 OpenCode 的核心交互界面，频繁的崩溃和弹窗严重破坏用户体验。#56856 是一个典型的代码健壮性问题，而 #51887 则是 Windows 平台特有的焦点争夺问题，后台服务不断弹出前台窗口导致用户无法操作。

### 🐛 [功能] 权限管理机制缺陷
*   **#56470** [OPEN] permissions: ask effect is fail-open for shell commands (command runs, client reply gets 404)
*   **#50600** [OPEN] permissions: allow-always is durable and project-scoped with no opt-out or TUI reset

**分析**: V2 版本引入的权限系统存在逻辑漏洞。`ask` 策略在未正确处理用户确认时会导致命令直接执行且客户端无响应；而 `allow-always` 的持久化机制缺乏“撤销”入口，用户一旦误选可能导致长期权限锁定。

### 🧩 [集成] IDE 插件与发现性差
*   **#53799** [CLOSED] acp: session/new via Zed fails, Database is not empty
*   **#52701** [OPEN] skills: newly added skill directories are not discovered until service restart
*   **#56498** [CLOSED] auth: Go API key creation is undiscoverable in the v2 Console

**分析**: 开发者在使用 OpenCode 作为外部 Agent 时，常遇到数据库状态不一致或技能目录无法热加载的问题。此外，v2 控制台的 API 密钥创建流程不直观，阻碍了 Go 等语言 SDK 的快速上手。

---

## 4. 重要 PR 进展

### ✨ 新功能开发
*   **#56659** [OPEN] feat(core): edit saved permissions
    *   **内容**: 允许用户修改或删除已保存的持久化权限（Always Allow），解决了 #50600 提出的无法撤销问题。
*   **#56892** [OPEN] feat(app): open terminals as side panel tabs
    *   **内容**: 将终端从 Dock 拖拽栏移至侧边栏，支持多标签页管理，提升多任务处理效率。
*   **#56888** [OPEN] feat(voice): add Gemini Live ephemeral token support
    *   **内容**: 扩展语音功能支持 Google Gemini Live 模型，解决移动端和 Web 端无法使用 Google 短期语音会话的问题。
*   **#55496** [OPEN] feat(app): add subagents side-panel tab
    *   **内容**: 在侧边栏新增“Subagents”标签页，完善多智能体协作功能的 UI 展示。

### 🐛 关键修复
*   **#56886** [OPEN] fix(client): prevent stale reads from restoring deleted sessions
    *   **内容**: 修复了客户端在同步时可能恢复已删除会话的竞态条件。
*   **#56882** [OPEN] fix(client): preserve live transcript events during sync
    *   **内容**: 修复了在同步过程中丢失实时语音转文字（Live Transcript）事件的问题。
*   **#56873** [OPEN] fix(app): stop menu hover from stealing focus from search inputs
    *   **内容**: 修复了菜单悬停导致搜索框焦点丢失的 UI 交互 Bug。
*   **#56889** [OPEN] fix(nix): preserve root dependency peer context
    *   **内容**: 修复了 Nix 安装环境下的依赖解析问题，确保 `@opentui/core` 主题等核心包正确加载。

---

## 5. 功能需求趋势

从 Issue 数据分析，社区关注点主要集中在以下三个方向：

1.  **跨平台稳定性与 TUI 体验**: Windows 用户的反馈最为集中，涉及 TUI 崩溃、控制台弹窗、内存占用过高以及 ALSA 错误刷屏等问题。社区急需更健壮的跨平台 GUI 底层实现。
2.  **权限与模型网关可靠性**: 免费模型网关的滥用检测和验证逻辑频繁误伤用户，权限系统的“Fail-open”行为和持久化缺乏控制，是高频痛点。
3.  **外部集成与发现性**: 随着 IDE 集成（如 Zed）的深入，OpenCode 需要更完善的数据库迁移、技能热加载机制以及清晰的 API 密钥管理 UI。

---

## 6. 开发者关注点

*   **Windows 体验优化**: 开发者强烈建议优化 TUI 在 Windows 下的渲染逻辑，避免 ALSA 错误干扰，并彻底解决弹窗抢夺焦点的问题。
*   **权限管理人性化**: 现有的权限系统过于刚性（无法撤销），开发者呼吁增加可视化的权限管理面板和灵活的策略调整能力。
*   **插件生态与发现**: 新增的技能目录和插件（如 opencode-chart-tui, opencode-voice-plugin）需要更高效的发现机制，避免必须重启服务。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-10-19)

## 1. 今日速览
今日社区活跃度较高，共更新 36 个 Issues 和 8 个 PR。主要关注点集中在 **Mac OS 高 CPU 占用**、**多模态文件读取与预览** 以及 **上下文压缩** 相关的 Bug 修复与功能增强。值得注意的是，Pi Durable 模块迎来了多个关于任务调度和模型访问控制的重大更新。

## 2. 版本发布
无新版本发布。

## 3. 社区热点 Issues

**#7730 [OPEN] Mac OS 长会话高 CPU 占用**
*   **作者**: gterzian | **评论**: 20
*   **重要性**: ⭐⭐⭐⭐⭐
*   **摘要**: 用户反馈在 Mac OS 上运行 Pi 时，长会话会导致 CPU 占用飙升至 100% 以上，内存占用稳定在 600-800MB，且与上下文大小高度相关。
*   **社区反应**: 高点赞数 (11) 和大量评论表明这是一个普遍且影响体验的严重性能问题。

**#10074 [OPEN] Anthropic 工具调用中非 ASCII 字符被静默丢弃**
*   **作者**: hoonysis | **评论**: 10
*   **重要性**: ⭐⭐⭐⭐
*   **摘要**: 在处理包含韩语等非 ASCII 字符的文件编辑请求时，编辑参数中的 `\uXXXX` 转义序列会被错误修改为控制字符，导致文件损坏和大量重试。
*   **社区反应**: 持续追踪三周，严重影响实际开发效率。

**#9656 [OPEN] Windows + Zellij 全屏模式下鼠标滚轮滚动异常**
*   **作者**: lll9p | **评论**: 8
*   **重要性**: ⭐⭐⭐
*   **摘要**: 在使用 Zellij 作为终端复用器时，全屏模式下鼠标滚轮滚动的是编辑器提示历史而非对话记录，而在原生终端或 tmux 下工作正常。
*   **社区反应**: 指出了终端模拟器集成中的特定兼容性问题。

**#9409 [OPEN] 推理模型在达到上下文限制时永久卡死**
*   **作者**: Sager611 | **评论**: 7
*   **重要性**: ⭐⭐⭐⭐
*   **摘要**: 使用推理模型（如 gpt-4o）时，会话在达到上下文天花板后永久卡死，返回 `stopReason: "length"` 且自动压缩失败，无法恢复。
*   **社区反应**: 涉及核心会话管理机制，影响高级用户的使用。

**#10895 [CLOSED] 系统级配置支持 (MDM)**
*   **作者**: verdverm | **评论**: 11
*   **重要性**: ⭐⭐⭐
*   **摘要**: 建议支持通过 `/etc/pi/models.json` 等系统级路径进行配置，以增强安全性。
*   **状态**: 已关闭 (No Action)，维护者可能认为当前方案已足够。

**#8582 [CLOSED] PowerShell 工具版本检测问题**
*   **作者**: Arteiimis | **评论**: 8
*   **重要性**: ⭐⭐⭐
*   **摘要**: 在交互模式下，内置 PowerShell 工具强制使用 Windows PowerShell 5.1，尽管系统已安装 PowerShell 7 (`pwsh`)。
*   **状态**: 已修复。

**#10976 [OPEN] Microsoft Store 版本 PowerShell 7 检测失败**
*   **作者**: tstager | **评论**: 7
*   **重要性**: ⭐⭐
*   **摘要**: 针对 Microsoft Store 安装的 PowerShell 7 (`pwsh.exe` 路径检测)，工具仍回退到旧版本。
*   **社区反应**: 细节的 Shell 配置兼容性问题。

**#11033 [CLOSED] Pi 订阅登录失败**
*   **作者**: pajikcz | **评论**: 5
*   **重要性**: ⭐⭐
*   **摘要**: Pi 无法授权 ChatGPT 订阅，报错 `3p_delegated_access_policy_denied`，而官方 Codex CLI 工具工作正常。
*   **状态**: 已修复。

**#11110 [CLOSED] 剪贴板粘贴的图片在对话中不显示**
*   **作者**: egkike | **评论**: 1
*   **重要性**: ⭐⭐
*   **摘要**: 通过剪贴板粘贴的图片能正确发送给模型，但对话记录中不显示预览，只显示临时文件路径。
*   **状态**: 已修复。

**#11105 [CLOSED] GLM-5.3 模型循环问题**
*   **作者**: novakovicdavid | **评论**: 1
*   **重要性**: ⭐⭐
*   **摘要**: 使用 Mistral 提供商的 GLM-5.3 模型时，AI 开始无意义地循环调用工具。
*   **状态**: 已修复。

## 4. 重要 PR 进展

**#11109 [CLOSED] 修复 Durable 模式下 `read` 工具丢失图片**
*   **作者**: petercheng
*   **内容**: 修复了在代码模式下嵌套调用 `read` 读取图片时，结果被错误转换为空字符串或纯文本的问题，现在能正确返回图片块。
*   **影响**: 提升了多模态文件处理能力。

**#11108 [CLOSED] 修复全屏模式双击选择丢失 `~` 符号**
*   **作者**: petercheng
*   **内容**: 修复了在全屏模式下双击工作目录路径（如 `~/Downloads`）时，丢失开头的 `~` 符号，导致路径粘贴错误的问题。
*   **影响**: 优化了终端体验细节。

**#11104 [CLOSED] Durable: 为 Host 添加任务级模型访问控制**
*   **作者**: piclaw-bot
*   **内容**: 引入了 `HarnessOptions.taskModels` 回调，允许 Host 返回与特定任务绑定的模型访问权限，增强了多任务环境下的隔离性。

**#11098 [CLOSED] 通过 Responses API 实现服务端压缩**
*   **作者**: plasticchris
*   **内容**: 支持提供商在服务端进行上下文压缩（如 OpenAI 的 context_management），Pi 将结果作为标准压缩条目采纳。
*   **影响**: 减轻客户端压力，提升长会话性能。

**#11079 [CLOSED] Durable: 注入任务休眠计时器**
*   **作者**: christianklotz
*   **内容**: 修复了 `TaskRuntime.sleep()` 依赖进程内 `setTimeout` 导致的内存泄漏问题，现在完全依赖注入的时钟机制。

**#10914 [OPEN] 文档迁移至仓库根目录**
*   **作者**: christianklotz
*   **内容**: 将文档从 `packages/coding-agent/docs` 迁移至 `docs/`，以支持更多子项目（如 pi-durable）的文档结构。

**#10217 [OPEN] 修复可用性检查的超时与并发问题**
*   **作者**: davidbrai
*   **内容**: 计划将可用性检查改为串行执行并增加超时机制，以解决并发检查导致的数据不一致问题。

## 5. 功能需求趋势

1.  **多模态能力增强**: 社区高度关注图片、文件（特别是二进制文件）在 `read` 工具、剪贴板粘贴以及对话预览中的展示与处理。
2.  **终端集成优化**: Windows + Zellij、tmux 等环境下的鼠标交互、光标行为、全屏模式选择等 TUI 细节问题频发。
3.  **性能与稳定性**: Mac OS 高 CPU 占用、推理模型上下文卡死、服务端压缩支持是提升长会话稳定性的核心诉求。
4.  **配置与安全**: 系统级配置（MDM）支持以及订阅登录的权限问题依然存在，是企业级部署的痛点。

## 6. 开发者关注点

*   **Shell 工具兼容性**: PowerShell (Win Store vs MSI) 和 Shell 命令执行（如 `===` 分隔符）的兼容性问题需要持续维护。
*   **扩展机制**: `tool_result` 事件缺失、工具预览文本的样式继承问题，以及 MCP 配置的灵活切换需求，反映了开发者对扩展生态的深度定制需求。
*   **错误处理与重试**: 流式传输中的中断、参数解析失败的处理机制需要更健壮的兜底策略。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-10-19  
**来源：** [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 1. 今日速览
- **版本动态**：项目发布 v0.25.2-nightly 构建快照，主要修复了团队审批日志中断回合的结算逻辑。
- **架构演进**：社区核心讨论集中在 **Managed Agent 双路径架构** 的定义，旨在解耦模型推理与工具环境，并提升会话管理的稳定性。
- **问题修复**：针对 XML 工具调用恢复、会话存储无限增长、CI 流水线性能等关键问题进行了密集修复。

---

## 2. 版本发布
**v0.25.2-nightly.20261017.39c237af3b**
- **更新摘要**：修复了 `managed-agent` 模块中关于团队计划审批（`team_plan_approval`）进入仅日志模式的逻辑，确保中断回合能正确结算。

---

## 3. 社区热点 Issues
以下选取评论数最高及优先级最高的 Issue，反映当前开发重点：

1. **#12380** [P2] Managed Agent 双路径架构提案
   - **重要性**：架构层面的核心设计讨论，定义了如何独立运行模型推理与工具环境，并赋予会话持久所有权。
   - **链接**：[Issue #12380](https://github.com/QwenLM/qwen-code/issues/12380)

2. **#14393** [P2] 租户守卫剩余缺口清理
   - **重要性**：修复了 `tenant_guard_contended` 导致会话冻结的问题，并清理了遗留的设计文本和代码。
   - **链接**：[Issue #14393](https://github.com/QwenLM/qwen-code/issues/14393)

3. **#13492** [P2] XML 工具调用恢复缺陷
   - **重要性**：修复了 XML 工具调用恢复中丢弃包含引号标记的外层调用的问题，影响工具调用的准确性。
   - **链接**：[Issue #13492](https://github.com/QwenLM/qwen-code/issues/13492)

4. **#14537** [P2] 供应链投毒与爬虫工具依赖
   - **重要性**：用户反馈客户端内置爬虫在未安装 `rg` 工具时报错，引发对依赖管理的关注。
   - **链接**：[Issue #14537](https://github.com/QwenLM/qwen-code/issues/14537)

5. **#14492** [P2] Java SDK 集成测试失败
   - **重要性**：CI 流水线在 Java 端的 `HostedExtensionsIT` 测试中持续失败，阻塞了主分支合并。
   - **链接**：[Issue #14492](https://github.com/QwenLM/qwen-code/issues/14492)

6. **#14062** [P2] Hosted Harness 发送消息溢出
   - **重要性**：修复了 `send_message` 在边界条件下导致整个 Turn 失败，而非仅拒绝该请求的问题。
   - **链接**：[Issue #14062](https://github.com/QwenLM/qwen-code/issues/14062)

7. **#14591** [P2] 409 状态码与重试机制
   - **重要性**：修复了死掉的 Writer 的租约返回 409 而非可重试的 503，影响客户端的自动化路由行为。
   - **链接**：[Issue #14591](https://github.com/QwenLM/qwen-code/issues/14591)

8. **#14600** [P2] 桌面端崩溃与重连问题
   - **重要性**：桌面端崩溃后，后端进程未正确清理，导致重连失败或无法恢复会话。
   - **链接**：[Issue #14600](https://github.com/QwenLM/qwen-code/issues/14600)

9. **#14596** [P2] CI Prettier 步骤缺失
   - **重要性**：`docs_only` 快车道跳过 Prettier 格式化，导致文档类 PR 合并后破坏主分支代码风格。
   - **链接**：[Issue #14596](https://github.com/QwenLM/qwen-code/issues/14596)

10. **#14538** [P2] 会话恢复阻塞
    - **重要性**：修复了 `reconcile_run` 在处理崩溃输入时，可能因重叠的唤醒泵操作导致会话恢复阻塞。
    - **链接**：[Issue #14538](https://github.com/QwenLM/qwen-code/issues/14538)

---

## 4. 重要 PR 进展
1. **#14297** - Web Shell 删除消息组功能
   - **内容**：在会话历史中添加了按组删除消息的功能，支持非连续选中。
   - **链接**：[PR #14297](https://github.com/QwenLM/qwen-code/pull/14297)

2. **#14478** - 扩展持有审批租约的容错边界
   - **内容**：放宽了 CI 调度抖动对持有审批租约测试的影响，提高测试稳定性。
   - **链接**：[PR #14478](https://github.com/QwenLM/qwen-code/pull/14478)

3. **#14033** - 扩大工作区锁重试预算
   - **内容**：将跨进程工作区锁的重试预算从 10 次增加到 30 次，避免高频冲突导致的死锁。
   - **链接**：[PR #14033](https://github.com/QwenLM/qwen-code/pull/14033)

4. **#14609** - 修复 Checkstyle 缩进违规
   - **内容**：修复了 `Run Managed Agent Server Checkstyle` 步骤中的 12 处缩进错误，恢复主分支 CI 通过。
   - **链接**：[PR #14609](https://github.com/QwenLM/qwen-code/pull/14609)

5. **#14563** - 限制初始发布守卫等待
   - **内容**：修复了初始发布阶段租户守卫等待无界的问题，引入超时和重试机制。
   - **链接**：[PR #14563](https://github.com/QwenLM/qwen-code/pull/14563)

6. **#14571** - 重构 CSI 运行时标记读取
   - **内容**：共享了 CSI 标记探针和锁定退休检查中的读取逻辑，减少代码重复。
   - **链接**：[PR #14571](https://github.com/QwenLM/qwen-code/pull/14571)

7. **#14590** - 修复 Prettier 步骤与 Hook 测试
   - **内容**：修复了主分支 Prettier 失败问题，并改进了 Hook 取消 fence 测试的稳定性。
   - **链接**：[PR #14590](https://github.com/QwenLM/qwen-code/pull/14590)

8. **#13571** - 内存提取频率优化
   - **内容**：在无操作运行后引入可配置的提取频率跳过机制，减少不必要的内存访问。
   - **链接**：[PR #13571](https://github.com/QwenLM/qwen-code/pull/13571)

9. **#13919** - 移除严格后端的强制工具调用
   - **内容**：允许不强制使用 `tool_choice: "required"`，提高与 OpenAI 兼容后端的兼容性。
   - **链接**：[PR #13919](https://github.com/QwenLM/qwen-code/pull/13919)

10. **#14172** - Linux 剪贴板文本粘贴支持
    - **内容**：在 Linux 终端中实现了 Ctrl+V 粘贴纯文本的功能。
    - **链接**：[PR #14172](https://github.com/QwenLM/qwen-code/pull/14172)

---

## 5. 功能需求趋势
从 Issue 分析中提炼出以下社区关注方向：
- **架构与可观测性**：对 Managed Agent 的双路径架构、会话持久化、恢复机制（Recovery）有强烈需求。
- **CI/CD 体验**：频繁反馈 CI 流水线（特别是 Java 和 Prettier 步骤）的性能与稳定性问题。
- **跨平台与集成**：关注 Windows 打包、MCP 协议支持、以及桌面端崩溃恢复体验。
- **工具链依赖**：用户反馈对本地工具（如 `rg`）的依赖管理需更加健壮。

---

## 6. 开发者关注点
- **稳定性优先**：大量 Bug 反馈集中在会话管理、存储增长、死锁与恢复机制上，表明稳定性是当前核心痛点。
- **自动化与并发**：Hosted Harness、自动化路由、租约管理等后台服务的并发控制是高频讨论点。
- **开发效率**：CI 流水线速度、测试覆盖率、文档生成等工具链体验直接影响开发效率。
- **集成能力**：MCP 协议支持、外部记忆导入等集成需求日益增长，推动平台化发展。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026‑10‑19）

---

## 1️⃣ 今日速览  
- 近期 **CPU 使用率回归**、**沙箱挂载错误** 与 **工具缓存成本** 等关键性能与可靠性问题再次登上议程，社区讨论热度持续上升。  
- 多项 **UI/交互细节**（滚动条、搜索提示、状态栏布局）以及 **模型兼容性**（Claude 5、Haiku 5.5）修复在一天内完成合并，显示维护者对用户体验的快速响应。

---

## 2️⃣ 版本发布  
> **暂无** 24 h 内的新 Release。  

---

## 3️⃣ 社区热点 Issues（共 8 条，全部列出）

| 编号 | 标题 / 关键点 | 重要性说明 | 当前状态 | 链接 |
|------|--------------|-----------|----------|------|
| #6969 | **Deferred‑toolbox eviction 费用为负** | 触及 Prompt‑Cache 计费模型，可能导致成本失控；涉及核心 `ToolActivationCache` 实现。 | 开放 | <https://github.com/codewhale-hq/Codewhale/issues/6969> |
| #6728 | **CPU 使用率回归：v0.9.12 → v0.10.0** | 性能回退在 FreeBSD 环境中显著，影响跨平台用户；已累计 3 条评论，需尽快定位回归点。 | 开放 | <https://github.com/codewhale-hq/Codewhale/issues/6728> |
| #6295 | **Shared‑process `cargo test` 卡死** | CI 可靠性问题，阻塞合并流水线；已在 0.10.1 前重新 triage。 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/issues/6295> |
| #6991 | **新方案大幅降低 Token 消耗** | 提案引入 fastctx 技术，直接关系模型使用成本，社区投票积极。 | 开放 | <https://github.com/codewhale-hq/Codewhale/issues/6991> |
| #6997 | **自定义供应商需 `/responses` 支持** | 为复杂工具链提供更灵活的响应格式，提升插件生态可扩展性。 | 开放 | <https://github.com/codewhale-hq/Codewhale/issues/6997> |
| #7007 | **Linux 沙箱 symlink 挂载失败** | 所有命令在启用 OS‑sandbox 时直接 abort，影响安全执行环境的可用性。 | 开放 | <https://github.com/codewhale-hq/Codewhale/issues/7007> |
| #7021 | **NoNewPrivs 子矩阵测试在容器中失效** | 对容器化部署的安全硬化检查产生误报，阻塞 CI。 | 开放 | <https://github.com/codewhale-hq/Codewhale/issues/7021> |
| #6841 | **Code Mode 文档同步与子目录合成** | 文档与实际实现不一致，影响新手上手与子代理 (subagents) 使用。 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/issues/6841> |

**为何值得关注**  
- **性能与成本**（#6969、#6728、#6991）是当前用户最敏感的指标。  
- **安全/沙箱**（#7007、#7021）直接关系到企业级部署的可靠性。  
- **插件生态**（#6997）和 **文档一致性**（#6841）是提升开发者体验的关键。  

---

## 4️⃣ 重要 PR 进展（共 10 条，全部列出）

| 编号 | 关键改动 | 影响范围 | 状态 | 链接 |
|------|----------|----------|------|------|
| #7024 | 为设置列表添加滚动轨迹 | UI 可视化指示，解决长列表不可见问题 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7024> |
| #7023 | 搜索无结果时显示 “no matches” | 提升 MCP 面板搜索体验，防止误导 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7023> |
| #7022 | 为 `/statusline` 选择器预留 padding 行 | 防止状态栏项被遮挡，提升终端适配性 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7022> |
| #7019 | 捕获并重放 Anthropic “redacted thinking” 块 | 兼容最新 Anthropic 安全策略，避免信息丢失 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7019> |
| #7018 | 在 `TurnComplete` 中保留回合归属信息 | 调试与审计更完整，提升事件追踪准确性 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7018> |
| #7020 | 运行时路由遵循自定义表 `wire` 设置 | 支持自定义响应通道，拓宽供应商集成能力 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7020> |
| #7014 | 为 Claude 5 / Haiku 5.5 移除不支持的采样参数 | 防止 API 调用错误，提升新模型兼容性 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7014> |
| #7017 | 将旧检查点识别范围限定在特定 era | 防止误删历史检查点，提升压缩/恢复稳定性 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7017> |
| #7015 | 修复 Moonshot 工具空 schema 被错误丢弃 | 保障工具链完整性，提升跨模型工具兼容 | 已关闭 | <https://github.com/codewhale-hq/Codewhale/pull/7015> |
| #7016 | CI 同步时跳过缺失 `CNB_GIT_TOKEN` 的镜像 | 防止因 secret 缺失导致的 CI 失败，提升 fork 贡献体验 | 开放 | <https://github.com/codewhale-hq/Codewhale/pull/7016> |

**核心价值**  
- **交互细节**（#7024、#7023、#7022）提升了 TUI 的可用性。  
- **模型兼容**（#7014、#7015、#7019）确保新模型与工具链的平滑对接。  
- **安全与审计**（#7018、#7020）强化了内部事件追踪与自定义路由能力。  
- **CI 稳定性**（#7016）降低了贡献者的入门门槛。

---

## 5️⃣ 功能需求趋势  

| 趋势方向 | 代表 Issue/PR | 说明 |
|----------|----------------|------|
| **成本与性能优化** | #6969、#6728、#6991 | 关注 Prompt‑Cache 成本、CPU 使用回归、Token 消耗压缩。 |
| **安全/沙箱可靠性** | #7007、#7021、#7018 | 保障容器化、NoNewPrivs、沙箱挂载的稳定运行。 |
| **模型兼容性** | #7014、#7019、#6997 | 新模型（Claude 5、Haiku 5.5）与自定义响应通道的适配。 |
| **插件/工具生态** | #6997、#7015、#7020 | 扩展自定义供应商、工具 schema、路由自定义。 |
| **用户交互细节** | #7024、#7023、#7022 | 滚动指示、搜索反馈、状态栏布局等 UI 改进。 |
| **文档与可维护性** | #6841、#6295 | 文档同步、CI 测试可靠性。 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **性能回退** – CPU 使用率在 v0.10.0 之后显著上升，尤其在 FreeBSD 上表现突出，迫切需要定位并修复回归。  
2. **Prompt‑Cache 成本可视化** – 缓存淘汰的负向经济效应被提出，需要在工具层面提供成本监控或更智能的 eviction 策略。  
3. **沙箱挂载兼容** – Linux 下 symlink 目标导致的 `bwrap` 错误阻断所有命令执行，影响安全运行环境的可用性。  
4. **新模型参数限制** – Claude 5 与 Haiku 5.5 不再支持传统采样参数，导致调用错误，需在客户端自动过滤。  
5. **插件响应格式** – 对 `/responses` 的需求表明现有工具链在处理复杂返回时不足，期待更灵活的协议层。  
6. **UI 可视化** – 长列表滚动、搜索空结果提示、状态栏完整展示等细节被多次提及，说明用户对终端交互的可读性和易用性要求提升。  
7. **CI 稳定性** – 缺失 secret 时的同步错误导致 CI 频繁失败，阻碍社区贡献者的快速迭代。  

> **建议**：在下一个里程碑（v0.10.3）中优先解决性能回退与沙箱挂载问题，同时在文档中加入 Prompt‑Cache 成本说明，并为新模型提供自动参数适配层。  

--- 

*本文档基于过去 24 小时内 GitHub 上的 Issues 与 Pull Requests 自动汇总，供 DeepSeek TUI 开发者与社区成员快速了解项目最新动向。*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*