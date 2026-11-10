# AI CLI 工具社区动态日报 2026-11-10

> 生成时间: 2026-11-10 02:27 UTC | 覆盖工具: 9 个

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

⚠️ Skills 摘要生成失败。

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：** 2026-11-10
**来源：** github.com/openai/codex

---

### 1. 今日速览
今日社区动态显示，**版本发布**主要集中在 Rust 核心库的 Alpha 测试版迭代（0.169.0-alpha 系列），反映了底层引擎的持续优化。**社区热点**主要集中在 Windows 平台的 **Computer Use**（计算机使用）功能稳定性上，包括浏览器窗口捕获失败和截图超时等问题。同时，大量关于 **MCP（Model Context Protocol）服务器进程泄漏** 和 **计费/配额异常** 的 Bug 报告引发了开发者的广泛讨论。

---

### 2. 版本发布
本次发布集中在 Rust 核心库（`rust-v0.169.0-alpha.7`, `alpha.6`, `0.167.0-alpha.4.1`），主要包含：
*   **0.169.0-alpha.7**：最新 Alpha 版本迭代。
*   **0.167.0-alpha.4.1**：包含特定的热修复版本。

> **技术洞察**：持续发布 Alpha 版本表明 Codex 正在为即将到来的稳定版本进行深度的底层重构和稳定性打磨。

---

### 3. 社区热点 Issues
以下是目前评论数最高且热度最高的 10 个 Issue：

**1. [#41220] 异常的 Codex 配额消耗与计费不一致** (85 评论)
*   **重要性**：高。影响所有付费用户，涉及订阅余额在无预期操作下突然耗尽。
*   **摘要**：用户报告订阅配额或购买的积分消耗速度远超预期，且有时会出现突然的消耗激增，本地 Token 记录与实际计费不符。

**2. [#51524] Windows Computer Use 无法确定浏览器 URL (Chrome/Edge)** (81 评论)
*   **重要性**：高。核心功能故障，阻断自动化操作。
*   **摘要**：`sky.get_window_state` 在 Windows 上立即停止，导致无法点击或输入，尽管应用/窗口枚举成功。

**3. [#30408] MCP 服务器进程泄漏 (RSS > 9GB)** (70 评论)
*   **重要性**：高。严重的性能与资源泄漏问题。
*   **摘要**：Codex app-server 为每个线程/对话生成 MCP 进程，但从不清理，导致僵尸进程无限累积，内存占用巨大。

**4. [#59895] Windows 应用更新后本地项目消失** (42 评论)
*   **重要性**：中。严重的用户体验问题，数据丢失风险。
*   **摘要**：切换个人账户或应用更新后，所有本地项目在侧边栏消失，且存在“Show more”按钮无法复原的 Bug。

**5. [#36454] iOS 远程项目列表未与桌面端同步** (25 评论)
*   **重要性**：中。跨平台协作体验问题。
*   **摘要**：iOS 端的“远程项目”列表未使用桌面端作为单一事实来源，导致数据不同步。

**6. [#47270] Desktop 浏览器无法发现或控制标签页** (23 评论)
*   **重要性**：中。浏览器自动化功能失效。
*   **摘要**：即使配置了允许访问，Browser Use 仍无法发现或控制 Chrome 和内置浏览器标签页。

**7. [#50771] Codex 提前停止任务** (19 评论)
*   **重要性**：中。任务执行逻辑缺陷。
*   **摘要**：AI 经常同意修改建议但随即停止，需要用户手动发送“继续”指令才能恢复工作流。

**8. [#45369] Windows 自动隐藏任务栏无法被鼠标唤醒** (17 评论)
*   **重要性**：低。UI 交互细节 Bug。
*   **摘要**：当 Codex 桌面应用最大化时，无法通过鼠标悬停唤醒 Windows 的自动隐藏任务栏。

**9. [#51049] dot 创建的任务无法执行 follow-up** (17 评论)
*   **重要性**：中。特定场景下的命令执行失败。
*   **摘要**：通过 `.` 命令创建的 Windows 任务在执行 follow-up 时报错 `invalid turn/start params`。

**10. [#23152] 移动端远程连接遗漏 Mac 线程** (8 评论)
*   **重要性**：低。远程协作体验。
*   **摘要**：Mac Codex App 的线程未在移动端远程连接的项目列表中显示。

---

### 4. 重要 PR 进展
以下是近期（过去24小时）评论数最多的 20 个 PR，其中大部分已关闭（Closed），显示了解决特定问题的快速响应：

**1. [#60498] [CLOSED] 统一 Guardian 上下文准备** (Bot)
*   **内容**：统一异步和同步 Guardian 收集方式，确保请求时的配置文件和心跳消息一致性。
*   **链接**：[openai/codex PR #60498](https://github.com/openai/codex/pull/60498)

**2. [#60496] [CLOSED] 保留 typed gRPC 代码模式会话准入错误** (Bot)
*   **内容**：修复会话开启失败时的错误处理，现在返回具体的 `GrpcSessionOpenError` 类型，而非通用字符串，便于调试。

**3. [#60487] [CLOSED] 默认启用不可信上下文工具输出** (Bot)
*   **内容**：将 `untrusted_as_tool_output` 标记为稳定功能并默认开启，使浏览器信息等非可信上下文能作为函数输出传递给模型。

**4. [#60482] [CLOSED] 一致处理跨响应传输的上下文长度错误** (Bot)
*   **内容**：优化 HTTP 400 (context_length_exceeded) 和流式错误的处理逻辑，确保上下文窗口恢复机制正确工作。

**5. [#60480] [CLOSED] 将工作区访问拒绝视为终端错误** (Bot)
*   **内容**：识别 `403` 错误中的 `codex_workspace_access_denied`，防止错误的重试或回退。

**6. [#60479] [CLOSED] 将内容策略违规视为终端错误** (Bot)
*   **内容**：统一处理内容策略违规错误，将其视为不可重试的终端错误，防止无限重试循环。

**7. [#60476] [CLOSED] 将访问程序拒绝视为终端错误** (Bot)
*   **内容**：识别 `access_program_not_enabled` 错误，确保遇到权限问题时立即停止请求。

**8. [#60475] [CLOSED] 停止重试明确的无效工作区错误** (Bot)
*   **内容**：修复 `invalid_workspace_selected` 错误被误判为意外状态错误并尝试重试的问题。

**9. [#60473] [CLOSED] 在本地压缩期间尊重错误重试策略** (Bot)
*   **内容**：优化本地压缩逻辑，使其能正确读取服务器的 `Retry-After` 指示并使用正确的重试延迟。

**10. [#60461] [CLOSED] 在执行器能力发现中尊重权限授予范围** (Bot)
*   **内容**：确保文件系统访问权限仅在授予的有效期内使执行器技能可用，防止权限滥用。

**11. [#60457] [OPEN] 热修复：将旧版增量工具移植到 0.167.0-alpha.4** (akira-oai)
*   **内容**：为 Desktop 热修复版本移植了增量工具功能，解决原生 Amazon Bedrock 提供商的工具更新和恢复问题。
*   **链接**：[openai/codex PR #60457](https://github.com/openai/codex/pull/60457)

**12. [#60456] [OPEN] 热修复：将旧版增量工具移植到 0.167.0-alpha.3.2** (akira-oai)
*   **内容**：为 CLI 版本移植增量工具，解决 Mantle 和 Bedrock Runtime 会话的声明问题。

---

### 5. 功能需求趋势
从 Issue 数据分析，社区最关注的方向如下：

*   **跨平台稳定性与同步**：
    *   Windows 平台的 Computer Use（浏览器控制）是当前最大的痛点，大量用户反馈截图超时和窗口状态获取失败。
    *   iOS 与桌面端的项目列表同步问题频发，用户希望桌面端作为“单一事实来源”。
*   **资源管理与性能**：
    *   **MCP 服务器泄漏** 是高频技术问题，涉及进程管理、线程生命周期和内存控制。
    *   **计费/配额异常** 是影响付费用户留存的核心体验问题。
*   **任务执行逻辑**：
    *   AI 提前停止任务（Premature Termination）是一个普遍存在的模型行为问题，用户需要频繁手动干预。

---

### 6. 开发者关注点
*   **进程生命周期管理**：开发者最担心的是后台服务（如 MCP 服务器、app-server）在会话关闭后没有正确清理，导致内存泄漏和磁盘空间占用。
*   **Windows 自动化兼容性**：在 Windows 10/11 环境下，特别是使用 Edge 浏览器和某些特定应用（如 Bambu Studio）时，Computer Use 的截图和交互能力不稳定。
*   **错误处理透明度**：用户和开发者都希望看到更清晰的错误信息（如具体的 gRPC 错误码），而不是模糊的 "Bad Request" 或通用错误。
*   **数据持久化与迁移**：切换账户或更新应用时，本地项目列表的丢失或重置是开发者最焦虑的数据安全问题。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-10  
**来源**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 1. 今日速览
- **Agent 稳定性是焦点**：今日社区反馈集中在于 Agent（特别是子代理）在达到最大轮次限制时的状态报告错误、挂起以及配置覆盖失效等问题。
- **平台与工具安全加固**：针对 macOS 沙箱、Git 命令注入风险及 IDE 集成连接日志进行了多项修复。
- **架构演进探索**：社区开始探索基于 AST（抽象语法树）的代码读取与搜索工具，以提升代码库分析精度和效率。

---

## 2. 版本发布
**无新 Release**。

---

## 3. 社区热点 Issues (Top 10)

| # | 标题 | 重要性/类型 | 关键描述 |
|---|------|-------------|----------|
| #22323 | Subagent 恢复机制报告错误 | **P1 Bug** | `codebase_investigator` 子代理在达到 `MAX_TURNS` 后错误地报告为 `GOAL success`，掩盖了中断状态。 |
| #21409 | Generalist Agent 挂起 | **P1 Bug** | Generalist Agent 在调用子代理或执行简单文件夹操作时会永久挂起，需要显式禁用子代理才能工作。 |
| #19873 | 利用模型原生 Bash 能力 | **P2 Enhancement** | 探索零依赖 OS 沙箱和执行后意图路由，以最大化利用模型对 POSIX 工具（grep, sed等）的原生偏好。 |
| #22745 | AST 感知文件读取的影响 | **P2 Investigation** | 评估使用 AST 工具进行代码映射的收益，旨在通过更精确的读取减少 Token 消耗和噪音。 |
| #21968 | Agent 对 Skills 使用不足 | **P2 Bug** | Agent 很少主动调用自定义 Skills 和子代理，即使在不使用它们会导致任务失败时也是如此。 |
| #22267 | Browser Agent 配置失效 | **P2 Bug** | Browser Agent 完全忽略 `settings.json` 中的配置覆盖（如 `maxTurns`）。 |
| #21983 | Browser Agent 在 Wayland 失败 | **P1 Bug** | Browser 子代理在 Wayland 环境下出现异常终止。 |
| #24246 | 工具数量过多导致 400 错误 | **P2 Bug** | 当可用工具超过 128 个时，CLI 会遇到 400 错误，希望 Agent 能更智能地限制工具范围。 |
| #22672 | Agent 阻止破坏性行为 | **P2 Enhancement** | Agent 在执行 Git 或数据库操作时应更谨慎，避免使用 `--force` 等危险命令。 |
| #22186 | get-shit-done 输出钩子崩溃 | **P1 Bug** | 输出摘要阶段频繁导致 CLI 崩溃。 |

---

## 4. 重要 PR 进展 (Top 10)

| # | 标题 | 状态 | 核心内容 |
|---|------|------|----------|
| #30185 | 防止 Shell 模式下递归会话 | **Closed** | 修复了在 Shell 模式下出现无限递归调用 CLI 的问题，并拒绝不支持的后台子命令。 |
| #30189 | MessageBus 请求立即拒绝 | **Closed** | 修复了 `MessageBus.request()` 在发布失败时等待超时的问题，现在会立即拒绝并释放资源。 |
| #30204 | 处理 Headless 模式下的信号 | **Closed** | 改进了非交互模式下进程终止的处理，确保清理后台子进程并正确记录取消工具。 |
| #30211 | 修复二进制资源误内联 | **Closed** | 修复了 `read-many-files` 在匹配广泛目录时将二进制文件（图片、PDF）错误内联为 Base64 的问题。 |
| #30164 | macOS 沙箱信任文件夹 | **Closed** | 修复了在 macOS Seatbelt 沙箱中无法访问 `~/.gemini/trustedFolders.json` 的问题。 |
| #30095 | 修复 Windows Git 权限绕过 | **Open** | 提取了 Git 命令安全验证逻辑，防止在 Windows 上通过参数注入执行危险操作。 |
| #30214 | 识别 TortoiseGitPlink | **Open** | 识别 TortoiseGit 的 SSH 客户端为 PuTTY 家族，确保正确插入 `-batch` 参数。 |
| #30212 | 可配置的工具调用超时 | **Open** | 添加了 `tools.callTimeout` 设置，允许为单个工具调用设置超时，防止长时间阻塞。 |
| #30109 | 限制 Grep 输出大小 | **Open** | 限制 `grep_search` 的输出大小并引导模型缩小搜索范围，防止发送过多文本导致 Token 飙升。 |
| #30102 | 修正 IDE 连接日志事件 | **Open** | 将 IDE 连接日志从 `start_session` 改为 `ide_connection` 事件，避免统计错误。 |

---

## 5. 功能需求趋势

1. **Agent 架构与体验优化**
   - **子代理行为控制**：社区强烈要求改进 Agent 对子代理和 Skills 的主动使用能力。
   - **轨迹可见性**：提出通过 `/chat share` 功能共享子代理轨迹，以便更好地评估和调试 Agent 行为。
   - **并行协作探索**：正在探索共享内存或并行子代理协作的可能性。

2. **代码库分析效率**
   - **AST 工具集成**：正在积极评估将 AST 感知的 CLI 工具（如 glyph, tilth）集成到代码库调查器中，以减少 Token 消耗并提高精度。

3. **安全性与鲁棒性**
   - **破坏性行为抑制**：开发者希望 Agent 能够理解并主动避免使用 `git reset --force` 等可能导致数据丢失的操作。
   - **配置覆盖修复**：急需修复 Browser Agent 等组件对全局配置的读取失效问题。

---

## 6. 开发者关注点

- **稳定性优先**：高频 Bug 报告集中在 Agent 挂起、状态报告错误以及非交互模式下的崩溃上，这对生产环境使用是主要阻碍。
- **工具与配置管理**：如何管理大量工具（>128）、如何通过配置文件灵活控制 Agent 行为（如超时、最大轮次）是开发者关注的重点。
- **工作流与沙箱**：在 macOS 沙箱、Windows 权限控制以及跨平台兼容性方面的改进需求持续存在。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期：** 2026-11-10  
**数据来源：** github.com/anomalyco/opencode

---

## 1. 今日速览

本周社区活跃度极高，围绕 **免费额度 Bug** 的讨论占据主导地位，核心问题集中在免费模型重置异常和额度耗尽提示上，引发了大量用户反馈。同时，**v2.2.6 版本**的发布带来了多项性能优化（如 Windows 线程阻塞修复）和功能更新（如桌面端浏览器持久化），但部分用户反馈新版本存在启动崩溃和模型不可用的问题。

---

## 2. 版本发布

**OpenCode Desktop 2.2.6** (2026-11-09 发布)
*   **性能优化：** 修复了在 Windows 上启动 Git 和 Shell 工具命令时的线程阻塞问题，显著降低了高并发场景下的响应延迟。
*   **功能增强：** 桌面端浏览器工具现在支持跨屏幕锁定保持会话，并在侧边栏引入了持久的浏览器配置文件，改善了多标签页的登录状态管理。
*   **文档更新：** 新增 MiniMax M3.1 Flash Free 模型支持，并修复了 MCP OAuth 令牌过期前的刷新机制。

---

## 3. 社区热点 Issues

以下 Issues 反映了当前最严重的用户体验问题和功能需求：

| # | 标题 | 状态 | 关键词 | 重要性 |
| :--- | :--- | :--- | :--- | :--- |
| #59387 | **Free tier issues: read this first** | OPEN | 免费额度、重置、Bug | 🔴 极高<br>核心功能失效，339+ 评论 |
| #58302 | OpenCode刚打开就提示免费额度耗尽 | CLOSED | 免费额度、系统Bug | 🟠 高<br>新版本疑似引入的问题 |
| #63001 | OpenCode Desktop window crashes on startup | OPEN | 崩溃、Windows、v2.2.6 | 🟠 高<br>新版本严重稳定性问题 |
| #62991 | Claude is not responding anymore | OPEN | 无响应、服务故障 | 🟠 高<br>特定模型或服务连接异常 |
| #62948 | server: git polling loop saturates CPU | OPEN | 性能、CPU占用、大仓库 | 🟠 中<br>大型项目性能瓶颈 |
| #62923 | code mode: execute tool returns null | OPEN | Code Mode、工具调用、Bug | 🟠 中<br>核心代码执行功能失效 |
| #62447 | tui: model picker shows only subset of models | OPEN | TUI、模型选择、Ollama | 🟡 中<br>自定义提供商支持不完整 |
| #62441 | notebooklm-mcp fails to start on Node 26 | CLOSED | MCP、Node.js、兼容性 | 🟡 中<br>依赖版本兼容性问题 |
| #62872 | Whole-config rejection without fallback | OPEN | 配置、并发写入、数据安全 | 🟡 中<br>配置文件并发写入风险 |
| #62934 | Android 0.3.0: can't connect to LAN servers | OPEN | Android、网络权限、17 | 🟡 中<br>移动端网络连接限制 |

**社区反应摘要：**
*   **免费额度风暴：** #59387 作为主贴被频繁引用，大量用户（#58302, #58687, #62803, #62783）报告免费额度在短时间内耗尽或重置时间异常，普遍质疑系统计费逻辑或服务器状态。
*   **新版本信任危机：** 随着用户升级到 v2.2.6，关于启动崩溃 (#63001) 和模型加载失败 (#62781) 的反馈显著增加，社区呼吁开发者在发布新版本时需加强回归测试。

---

## 4. 重要 PR 进展

| # | 标题 | 类型 | 状态 | 核心内容 |
| :--- | :--- | :--- | :--- | :--- |
| #62832 | feat(ai): add embedding models with OpenAI protocol | Feature | CLOSED | 新增对主流大模型 Embedding 协议的支持，完善了 AI 嵌入能力。 |
| #63011 | refactor(ai): remove ImageResponse.image shortcut | Refactor | OPEN | 简化 API 设计，引导开发者直接访问 `images` 数组。 |
| #63008 | fix(core): refresh MCP OAuth tokens before expire | Bug Fix | OPEN | 修复 MCP 认证令牌过期问题，避免首次请求失败。 |
| #63007 | test(core): capture variant requests after config edits | Test | OPEN | 新增配置修改后的模型变体请求测试，提升配置变更的稳定性。 |
| #62997 | feat(core): add GitHub Copilot Auto and model resolve hook | Feature | OPEN | 引入 GitHub Copilot Auto 模型及实验性的会话钩子系统。 |
| #63002 | feat(desktop): one persistent browser profile | Feature | OPEN | 桌面端浏览器持久化，用户无需每次重新登录。 |
| #62984 | feat(codemode): rank tool search with BM25 | Refactor | OPEN | 使用 BM25 算法优化 Code Mode 工具搜索，减少无关结果干扰。 |
| #63003 | fix(site): link the status page at opencode.ai/status | Docs | OPEN | 统一状态页面 URL，改善文档结构。 |
| #62995 | feat(vscode): add a sidebar UI to vscode | Feature | OPEN | 为 VS Code 扩展添加侧边栏视图，提升 IDE 集成体验。 |
| #62963 | feat(desktop): keep browser tools across screen lock | Feature | OPEN | 修复锁屏后浏览器工具断连的问题。 |

**技术摘要：**
*   **AI 能力扩展：** 开发者正在积极扩展 AI 模型支持，近期合并了 OpenAI 协议的 Embedding 模型，并新增了 Google 和 Vertex 的支持。
*   **工具搜索优化：** PR #62984 试图通过引入 BM25 算法解决 Code Mode 中工具搜索结果过于泛滥的问题，这表明社区对开发效率工具有更高的精度要求。

---

## 5. 功能需求趋势

从 Issues 和 PR 的分析来看，开发者社区的三大关注点如下：

1.  **计费与稳定性（首要矛盾）：** “免费额度”相关 Issue 数量激增，且集中在重置时间错误和异常扣费上。用户对 OpenCode 的商业模式信任度受到考验。
2.  **IDE 集成与跨平台体验：** PR #62995（VSCode 侧边栏）和桌面端浏览器持久化 (#63002) 显示，开发者希望 OpenCode 能无缝融入工作流，减少登录和操作负担。
3.  **本地模型与 MCP 支持：** 关于 Ollama (#62447)、LM Studio (#51570) 以及 MCP 服务器兼容性 (#62441) 的反馈表明，用户倾向于在本地或私有网络环境中部署，对兼容性和性能有硬性要求。

---

## 6. 开发者关注点

*   **并发与配置安全：** Issue #62872 提及在多人协作或自动配置更新场景下，`opencode.jsonc` 文件可能被并发写入导致整个配置失效，缺乏“回滚”机制是一个潜在的数据安全风险。
*   **大仓库性能：** Issue #62948 指出在包含百万级文件的 Git 仓库中，Git 轮询机制会极度消耗 CPU。这提示 OpenCode 需要针对大型 monorepo 或全盘扫描场景进行更智能的文件监听优化。
*   **Web 与桌面端体验割裂：** 许多 Feature Request（如 Android MIT 授权、语音输入支持）集中在移动端或桌面端体验的补全上，开发者希望在所有平台上都能获得一致的高级交互体验。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-10
**分析对象**: earendil-works/pi-mono

---

## 1. 今日速览

Pi 1.5.1 版本今日发布，重点引入了无需会话的 CLI 认证功能（`pi auth login/logout`），提升了在 CI/CD 和自动化场景下的使用便利性。同时，社区在 Windows 环境下的体验优化（包括环境变量解析、PowerShell 兼容性及文件编码）成为今日开发者的主要关注点。

---

## 2. 版本发布

### **v1.5.1** (2026-11-10)
- **新功能**:
    - **Shell 登录/登出**: 新增 `pi auth login <provider>` 和 `pi auth logout <provider>` 命令。支持使用 API Key 进行无浏览器登录，无需启动交互式会话。
    - **凭证命令**: 完善了 CLI 凭证管理的文档。

---

## 3. 社区热点 Issues

### **#7547**: [Windows] Pi on Windows 使用指南与痛点汇总
- **热度**: 96 评论 ⭐ 2
- **重要性**: **高**。这是 Windows 用户最大的求助帖，汇总了当前在 Windows 平台上遇到的各种兼容性和配置问题。
- **摘要**: 作者指出 Windows 上运行 Pi 的方式繁多（Git Bash, WSL, Mintty 等），导致文档维护困难。作者呼吁社区聚焦于“开箱即用”的体验，并希望将非核心功能（如特定的 shell 交互）移交至扩展社区。

### **#3200**: [possibly-openclaw-clanker] 支持视频/音频内容在 Prompt 命令中
- **热度**: 12 评论 ⭐ 8
- **重要性**: **高**。响应多模态模型（如 GPT-4o, Gemma 4）的需求。
- **摘要**: 请求扩展 `prompt` RPC 命令，使其不仅能处理图片，还能转发视频和音频内容，以便利用多模态大模型的感知能力。

### **#9216**: [last-read] Ollama qwen3.8:27b 流式传输错误与自动压缩失效
- **热度**: 4 评论 ⭐ 1
- **重要性**: **中**。涉及本地模型运行的稳定性。
- **摘要**: 反馈在通过 Agentic Session 使用 Ollama 本地模型时，出现 `stream 'terminated'` 错误，且在重试后自动压缩功能失效，导致输出截断。

### **#11026**: [durable] 永久删除持久化会话
- **热度**: 6 评论 ⭐ 5
- **重要性**: **中**。针对持久化存储管理的功能需求。
- **摘要**: 希望增加 API 以永久删除会话（`harness.deleteConversation`），要求在活动运行中拒绝删除，并在完成后清理存储、文档等所有关联状态。

### **#11773**: [inprogress, prio:p0] 升级千问 AI 平台兼容性设置
- **热度**: 4 评论 ⭐ 0
- **重要性**: **中**。平台集成与默认配置。
- **摘要**: 将 Token Plan 的默认配置升级为千问 AI 平台（中国版和国际版）的兼容模式，更新了相应的网关设置。

### **#11892**: [bug] pi-durable 1.5.0 任务卡在等待或完成状态
- **热度**: 3 评论 ⭐ 0
- **重要性**: **高**。影响核心存储模块稳定性。
- **摘要**: 在 1.5.0 版本中，任务在所有依赖完成或子任务结束后仍卡在 `waiting` 或 `completing` 状态，经测试与 `MemoryStorage` 有关。

### **#11869**: [bug, prio:p0] New `StringEnum` 在 1.5.0 中破坏编译时类型
- **热度**: 2 评论 ⭐ 3
- **重要性**: **高**。影响开发者工具链和类型安全。
- **摘要**: `registerTool` 依赖 `typebox` 的 `TSchema`，但 `@earendil-works/pi-ai` 1.5.0 中的 `StringEnum` 不再使用 typebox，导致工具参数中的枚举字段类型变为 `unknown`。

### **#11921**: [fix-available] tool_search 无法识别已声明的直接 MCP 工具
- **热度**: 2 评论 ⭐ 0
- **重要性**: **中**。MCP (Model Context Protocol) 工具发现机制问题。
- **摘要**: 直接声明的 MCP 工具在 prompt 中被列出，但 `tool_search` 返回 "No matching tools found"，导致模型误以为工具不可用。

### **#11954**: [untriaged] Claude 5.5 叙述块渲染为隐藏思考
- **热度**: 2 评论 ⭐ 0
- **重要性**: **中**。特定模型输出解析问题。
- **摘要**: Claude 5.5 的工具调用前的文本常被解析为 `thinking` 块而非 `text` 块，导致正文内容丢失。

### **#11979**: [untriaged] settings.json 中的 shellPath 不支持环境变量
- **热度**: 2 评论 ⭐ 0
- **重要性**: **中**。配置便利性。
- **摘要**: `shellPath` 配置项直接传给 `fs.accessSync`，不支持 `%VAR%` 或 `$VAR` 等环境变量引用，导致无法使用标准路径（如 `%LOCALAPPDATA%`）。

---

## 4. 重要 PR 进展

### **#11978**: [CLOSED] Expand environment variables in custom shellPath
- **状态**: 已合并
- **内容**: 修复了自定义 Shell 路径无法识别环境变量的问题，现在支持 `%VAR%` (Windows) 和 `$VAR` (Unix)。

### **#11975**: [CLOSED] fix(coding-agent): offer fork when a session cwd no longer exists
- **状态**: 已合并
- **内容**: 修复了会话文件夹被重命名或移动后，每次启动都询问 Cwd 的问题。现在会保存用户的选择。

### **#11974**: [CLOSED] fix(coding-agent): do not start fd after find was aborted
- **状态**: 已合并
- **内容**: 修复了 `find` 工具在查找 `.git` 目录时被中断后，仍继续启动 `fd` 进程导致资源泄漏的问题。

### **#11972**: [CLOSED] fix(coding-agent): match Windows find path patterns with every fd version
- **状态**: 已合并
- **内容**: 修复了 Windows 下 `fd` 工具的路径匹配问题，确保无论使用哪个版本的 `fd`，都能正确解析路径模式。

### **#11973**: [OPEN] fix(coding-agent): report model scope warnings as startup diagnostics
- **状态**: 进行中
- **内容**: 修复了模型 Scope 警告仅在运行时显示的问题，将其移至启动诊断阶段，以便用户在启动时立即发现配置错误。

### **#11970**: [CLOSED] fix(ai): bump Claude Code user-agent version for Fable 5.2
- **状态**: 已合并
- **内容**: 修复了 Anthropic 拒绝请求 Fable 5.2 模型的问题。将 User-Agent 版本从 2.1.280 升级至 2.1.321 以满足模型要求。

### **#11966**: [OPEN] fix(coding-agent): stop writing to the terminal while the TUI draws on it
- **状态**: 进行中
- **内容**: 修复了 TUI 绘制期间，后台进程输出覆盖 TUI 屏幕内容导致的显示混乱问题。

### **#11961**: [OPEN] fix(durable): clean up provider resources when a harness closes
- **状态**: 进行中
- **内容**: 修复了 `Harness.close()` 后未释放 `pi-ai` provider session 资源的问题，确保进程能正常退出。

### **#11957**: [OPEN] fix(coding-agent): report already-declared MCP tools in tool_search results
- **状态**: 进行中
- **内容**: 修复了 `tool_search` 对已加载的直接 MCP 工具返回空结果的问题，确保工具列表准确。

### **#11949**: [CLOSED] fix(ai): keep long-context price tier for Azure OpenAI models
- **状态**: 已合并
- **内容**: 修复了 Azure OpenAI 模型复制时丢失长上下文（>272K tokens）价格层级的问题。

---

## 5. 功能需求趋势

1.  **多模态增强**: 社区对 Prompt 命令支持视频和音频内容有强烈需求，表明 Pi 正在向更复杂的 Agentic 视觉/听觉交互场景演进。
2.  **本地模型兼容**: 针对 Ollama 本地运行（特别是 qwen 系列模型）的稳定性反馈增多，说明本地部署场景日益重要。
3.  **持久化存储管理**: `pi-durable` 模块频繁出现关于会话删除、任务状态卡死的 Issue，反映出社区对长时间运行 Agent 的存储管理机制有更深层次的需求。
4.  **MCP 工具发现**: 关于 MCP 工具在 Prompt 中的可见性和搜索准确性问题被反复提出，表明 MCP 协议的集成正在成为核心特性。

---

## 6. 开发者关注点

*   **Windows 生态兼容性**: 无论是 PowerShell 5.1 的 stderr 处理、Git Bash 的路径检测，还是 UTF-16 文件编码，Windows 平台的兼容性问题占据了 Issue 的很大比例。
*   **配置与脚本化**: `settings.json` 缺少环境变量支持和 CLI 认证功能是阻碍开发者进行自动化部署和脚本编写的主要障碍。
*   **类型安全与错误处理**: 新版本 1.5.0 引入的 `StringEnum` 变更破坏了 TypeScript 类型推断，这提醒开发者在升级依赖时需注意类型系统的潜在破坏性变更。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报（2026‑11‑10）**  

---

## 1️⃣ 今日速览  
- Windows 平台的 `/undo` 命令仍然出现严重回滚错误，已形成高优先级 bug；  
- 多项与模型身份验证、工具名称兼容性以及安装/卸载流程相关的阻塞 issue 正在聚焦修复；  
- 社区贡献者持续提交一批细节修复 PR，主要集中在 TUI 中文提及、行范围传递以及错误信息准确化。

---

## 2️⃣ 版本发布  
> **（本日暂无新 Release）**  

---

## 3️⃣ 社区热点 Issues（共 7 条，全部列出）

| 编号 | 标题 & 关键标签 | 重要性说明 | 社区反馈 |
|------|----------------|------------|----------|
| #6970 | **[bug, os:windows] `/undo` 导致严重回滚** | Windows 用户在使用撤销命令时会导致会话状态不可恢复，是生产环境的关键功能失效。 | 作者 luestr 发起后累计 5 条评论，讨论集中在回滚机制的 UUID 绑定实现，期待快速修复。 |
| #7203 | **[release‑blocker, v0.10.3] ChatGPT token 验证失败** | 0.10.2 版在 Windows 上成功浏览器登录后，身份签名校验失败，阻止 0.10.3 正式发布。 | d‑onistack 报告后已得到 5 条跟进，涉及 OpenAI‑Codex token 解析与跨平台兼容性。 |
| #6992 | **[bug] 0.10.1 ACP sandbox_mode/ask 被忽略** | ACP（安全执行环境）回归导致 sandbox 模式失效，影响企业级审计与安全合规。 | harryvizcaino‑oss 指出 7 种 macOS 场景仍出现 “Ask/default denial”，社区要求尽快恢复沙箱行为。 |
| #7091 | **[enhancement, area:install] 完整、可验证的卸载流程** | 0.10.3 计划加入跨平台卸载清理（Archive, npm, NSIS, WinGet 等），防止残留文件导致后续冲突。 | Hmbown 提出后得到 3 条技术讨论，已列入即将到来的 0.10.3 RC 验收清单。 |
| #7252 | **[area:tui, os:macos] Anthropic provider 在 tool_search 后 400 错误** | 只在 macOS 环境下出现，涉及工具名称含点（`web.run`）导致 API 400，影响 Anthropic 模型的工具调用链。 | ychu824 报告后社区已确认无重复，正追踪底层 `tools.N.custom.name` 规范化。 |
| #7194 | **[needs‑triage] 上游复用审计（reasoning tiers、provider facts 等）** | 对 DeepSeek‑TUI 与 CodeWhale 引擎的功能复用进行审计，关系到后续模块化与插件化的可行性。 | asto18089 发起审计报告，社区对复用收益表示关注，暂无明确结论。 |
| #7250 | **[enhancement, area:core] proposal(workflow): 实验性 search 的候选评估** | 提出在 `workflows/operate_best_of_n.workflow.js` 中加入 **运行时验证** 的候选搜索机制，提升搜索质量与安全性。 | axobase001 仅有 1 条评论，但该方向被视为提升模型自检能力的潜在路径。 |

> **链接示例**：`https://github.com/Codewhale-HQ/Codewhale/issues/6970`（请自行替换为真实 URL）

---

## 4️⃣ 重要 PR 进展（共 8 条，全部列出）

| 编号 | 标题 & 关键标签 | 功能/修复要点 | 当前状态 |
|------|----------------|--------------|----------|
| #7258 | **fix(tui): 识别紧随中文/日文文本的 @ 提及** | 解决中文/日文无空格情况下 `@src/main.rs` 无法被解析为文件提及的问题。 | OPEN |
| #7259 | **fix(tui): 同文件多次行范围提及全部传递** | 修复 `compare @file:1-1 with @file:4-4` 只发送第一段范围的缺陷。 | OPEN |
| #7257 | **fix(engine): 编辑回退模糊匹配时保留行尾内容** | 当 `edit` 的旧文本经 NFKC 正规化后匹配，确保原行其他字符不被意外丢弃。 | OPEN |
| #7256 | **fix(tui): 替换 transcript 时移除残余 token 估算** | `/load` 小会话后底部上下文计量仍显示旧会话大小，现已同步更新。 | OPEN |
| #7251 | **feat(transport): 可选的模型 HTTP 客户端主机策略** | 为嵌入式使用者提供 `ModelHttpPolicy` Hook，可在构建时拦截或自定义 HTTP 配置。 *(已合并 – CLOSED)* | CLOSED |
| #7253 | **fix(engine): 将 provider 超时错误显示为真实时长** | 将 “after 0ns” 替换为实际超时耗时，提升调试可读性。 *(已合并 – CLOSED)* | CLOSED |
| #7255 | **fix(tui): 发送失败后保留已输入草稿** | 发送异常时恢复编辑区内容，防止用户输入丢失。 *(已合并 – CLOSED)* | CLOSED |
| #7254 | **fix(engine): 限制嵌套大括号展开与重复 globstar** | 修正 `matches_glob` 中的嵌套括号与星号展开上限，防止路径匹配爆炸。 *(已合并 – CLOSED)* | CLOSED |

> **链接示例**：`https://github.com/Codewhale-HQ/Codewhale/pull/7258`（请自行替换为真实 URL）

---

## 5️⃣ 功能需求趋势  

从本周期 Issue 内容可以提炼出以下社区关注热点：

| 趋势方向 | 具体需求 | 影响范围 |
|----------|----------|----------|
| **跨平台稳定性** | Windows `/undo` 回滚、macOS Anthropic 工具名兼容、完整卸载流程 | 所有平台用户 |
| **身份验证与安全** | ChatGPT token 签名校验失败、ACP sandbox 失效 | 企业/安全敏感用户 |
| **IDE/编辑器集成** | 中文/日文 `@` 提及、行范围多次提及、草稿恢复 | 开发者日常交互体验 |
| **模型/工具兼容性** | Anthropic `tool_search` 添加带点名称导致 400、搜索工作流候选验证 | 多模型生态 |
| **性能与可观测性** | 超时错误显示真实时长、上下文 token 计量准确性 | 调试与资源管理 |
| **可扩展插件化** | 上游复用审计、可选 HTTP 主机策略 | 嵌入式与第三方集成 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **平台回滚与状态一致性**  
   - Windows 环境的撤销 (`/undo`) 失效直接影响会话恢复，是当前最紧迫的 BUG。  
2. **身份验证链路不透明**  
   - ChatGPT token 验证失败导致新版本发布受阻，说明对外部身份提供者的兼容层仍需加强。  
3. **中文/日文编辑体验**  
   - 缺少对 CJK 文字后直接出现的 `@` 提及的解析，导致文件/行号引用失效，已成为多个 PR 的焦点。  
4. **工具名称与 API 兼容**  
   - Anthropic `tool_search` 引入含点 (`.`) 的工具名触发 400 错误，暴露了内部工具名称正则的局限。  
5. **安装/卸载一致性**  
   - 多种包管理方式（Archive、npm、NSIS、WinGet）在卸载后残留文件的问题被列为 0.10.3 必做检查。  
6. **错误信息可读性**  
   - “after 0ns” 的超时提示让排错困难，已在 PR 中得到修正，表明社区对可观测性有强需求。  
7. **搜索工作流的运行时验证**  
   - 现有搜索仅提供生成/审阅证据，开发者希望引入 **runtime‑verified** 的候选评估，以提升安全性与结果可靠性。  

---

**结语**：本日社区聚焦在平台兼容性与安全验证两大块，同时对编辑器交互细节（中文提及、行范围）进行大量细粒度修复。后续版本（预计 0.10.3）将重点解决 Windows 回滚、完整卸载以及模型身份校验等阻塞问题，建议关注对应 Issue 与 PR 的最新进展。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*