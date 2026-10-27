# AI CLI 工具社区动态日报 2026-10-28

> 生成时间: 2026-10-27 23:21 UTC | 覆盖工具: 9 个

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

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**GitHub Copilot CLI 社区动态日报**
**日期**: 2026-10-28
**分析师**: AI 开发工具技术分析师

---

### 1. 今日速览
GitHub Copilot CLI 发布了 v1.0.105 系列版本，重点修复了 Fusion 模型选择及后台任务等待逻辑；社区活跃度较高，关于模型切换（特别是 BYOK 和本地模型）、长会话稳定性以及 ACP（Agent Control Protocol）模式下的会话管理问题引发了大量讨论。

---

### 2. 版本发布
**v1.0.105-1** (2026-10-28)
*   **修复内容**: 修复了 `/model` 命令在长上下文会话中选择 Fusion High 或 Max 模型的问题；修复了交互式和 SDK Autopilot 会话在遇到后台任务超时后的等待逻辑，防止会话过早中断。
*   **更新内容**: 优化了托管模型 "fusion" 在 Auto 模式下的会话启动及配置应用。

**v1.0.105-0** (2026-10-28)
*   **修复内容**: 修复了此前版本中关于模型选择和会话配置的具体行为。

---

### 3. 社区热点 Issues (Top 10)
以下 Issues 反映了当前社区最迫切的需求和已知的严重问题：

1.  **[OPEN] #3709: 允许 /model 在单次会话中切换多个模型（含 BYOK）**
    *   **重要性**: 🔥 **核心功能**。BYOK（自带密钥）模式下，`/model` 仅显示 GitHub 托管模型，无法切换用户配置的本地模型，限制了私有化部署的灵活性。
    *   **反应**: 👍 34, 12 条评论。社区强烈希望能在不重启会话的情况下切换底层模型提供商。

2.  **[CLOSED] #2760: 实现针对 HTTP 429 (Rate Limit) 的重试逻辑**
    *   **重要性**: 🛠️ **稳定性**。旧版本在遇到限流时重试过快，导致连接循环，现已修复。
    *   **反应**: 👍 2, 10 条评论。

3.  **[OPEN] #3260: SSH + tmux + Windows Server 2025 环境下复制粘贴失效**
    *   **重要性**: ⚠️ **跨平台兼容性**。特定环境组合下的输入交互问题，影响远程开发体验。
    *   **反应**: 👍 1, 9 条评论。

4.  **[OPEN] #310: 长提示词导致频繁网络连接错误**
    *   **重要性**: 🛠️ **稳定性**。当上下文过长时，CLI 偶尔会出现 "Connection error"，需手动 `/clear` 重试。
    *   **反应**: 👍 1, 7 条评论。

5.  **[OPEN] #1869: gpt-5-mini 模型设置无法持久化**
    *   **重要性**: 🐛 **配置持久化**。用户手动指定模型后，关闭 CLI 重启即恢复默认，影响生产力。
    *   **反应**: 👍 1, 7 条评论。

6.  **[OPEN] #5197: WSL2 更新后语音服务崩溃**
    *   **重要性**: 🐛 **特定平台 Bug**。v1.0.100 引入的语音运行时导致 WSL2 环境下进程崩溃，语音功能不可用。
    *   **反应**: 👍 2, 5 条评论。

7.  **[OPEN] #4026: Windows 平台 CLI 频繁崩溃**
    *   **重要性**: ⚠️ **严重稳定性**。自 2026 年 5 月以来，Windows 原生运行时在交互使用中频繁崩溃，影响广泛。
    *   **反应**: 👍 0, 5 条评论。

8.  **[OPEN] #4994: ACP 模式下 MCP OAuth 授权循环触发**
    *   **重要性**: 🛠️ **自动化集成**。每次启动 ACP 会话都弹出 OAuth 页面，即使 Token 有效，阻碍脚本化使用。
    *   **反应**: 👍 3, 4 条评论。

9.  **[OPEN] #5270: GPT-6.1 Sol 模型卡在 Plan 阶段**
    *   **重要性**: 🐛 **模型兼容性**。新模型在从计划模式切换到实现模式时出现死锁。
    *   **反应**: 👍 0, 3 条评论。

10. **[OPEN] #4989: 企业 MCP 白名单配置失效**
    *   **重要性**: 🏢 **企业级功能**。`allowedMcpServers` 配置使用 `serverName` 规则时完全不生效，导致企业策略失效。
    *   **反应**: 👍 0, 3 条评论。

---

### 4. 重要 PR 进展
*注：过去24小时内无新的 Pull Requests 更新。*

---

### 5. 功能需求趋势
从 Issue 数据分析，社区关注点主要集中在以下三个方向：

1.  **模型管理增强 (Model Management)**
    *   **趋势**: 对 `/model` 命令的呼声极高。
    *   **具体诉求**:
        *   支持会话内动态切换模型（#3709）。
        *   支持本地 BYOK 提供商的模型选择（#3709）。
        *   模型选择的持久化（#1869）。
        *   Auto 模型下的 Reasoning Effort 配置（#4560）。

2.  **ACP (Agent Control Protocol) 与自动化集成**
    *   **趋势**: 随着非交互式场景增加，ACP 模式的健壮性成为焦点。
    *   **具体诉求**:
        *   会话管理命令（如 `/rename`, `/session delete`）在 ACP 下的行为修复（#5115, #5268）。
        *   插件 Skills 在 ACP 中不可用的功能缺失（#5269）。
        *   MCP OAuth 流程的静默化（#4994）。

3.  **企业级与高级功能**
    *   **趋势**: 企业用户关注策略配置和权限控制。
    *   **具体诉求**:
        *   组织级自定义 Agent 的可见性问题（#3572）。
        *   MCP 服务器提示词支持（#505）。
        *   BYOK 凭证命令配置的灵活性（#4936）。

---

### 6. 开发者关注点
*   **稳定性**: Windows 平台的原生崩溃和特定环境（SSH+tmux）下的输入输出问题仍需持续关注。
*   **网络与重试**: HTTP 429 限流处理是网络层优化的重点，直接影响 API 调用成功率。
*   **长上下文**: 随着模型上下文窗口增大，长会话中的事件确认超时（#5100）和状态保持是新的挑战。
*   **企业合规**: MCP 服务器的企业白名单机制和 BYOK 凭证管理需要更精细的控制粒度。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 (2026-10-28)

## 1. 今日速览
OpenCode 发布了 **v2.2.0** 版本，重点引入了**桌面端插件系统**的实验性支持，扩展了其插件生态。与此同时，社区活跃度极高，围绕 **Todo 支持**、**MCP 服务器管理**以及 **Git 2.45+ 兼容性** 修复等核心功能展开了激烈讨论。此外，针对 **Bun 运行时**（SSE4.2 支持）导致的启动崩溃问题也引发了广泛关注。

## 2. 版本发布
**v2.2.0 (Experimental)**
- **桌面端插件支持**：新增了 `@opencode-ai/plugin/gui`，允许开发者创建、安装和共享桌面插件（GUI 扩展），这是继 TUI 插件 API 之后的重大扩展。
- **文档更新**：更新了构建 GUI 插件的相关文档。

## 3. 社区热点 Issues (Top 10)

1.  **[OPEN] add todo support for v2**
    *   **重要性**：V2 版本移除了原生 TODO 工具，导致模型无法管理本地待办事项，严重影响开发流。
    *   **反应**：35 个评论，10 个点赞，是当前最热门的功能缺失反馈。
    *   [GitHub Issue #42421](https://github.com/anomalyco/opencode/issues/42421)

2.  **[OPEN] session: two server processes sharing one opencode.db**
    *   **重要性**：涉及多进程会话共享数据库时的序列号冲突，可能导致会话数据损坏或丢失。
    *   **反应**：8 个评论，技术细节深入。
    *   [GitHub Issue #53146](https://github.com/anomalyco/opencode/issues/53146)

3.  **[OPEN] desktop: file tree and preview pane show stale file contents**
    *   **重要性**：桌面端 UI 渲染与后端工具执行不同步，用户看到的文件内容是旧的，严重影响编辑体验。
    *   **反应**：7 个评论，明确标记为 "reproduced"（可复现）。
    *   [GitHub Issue #52941](https://github.com/anomalyco/opencode/issues/52941)

4.  **[OPEN] edit: numeric replacements duplicate the changed value**
    *   **重要性**：`edit` 工具在处理数值替换时存在严重的 Bug（如 `640` 变成 `900900`），可能导致代码被破坏。
    *   **反应**：7 个评论，属于高危 Bug。
    *   [GitHub Issue #53011](https://github.com/anomalyco/opencode/issues/53011)

5.  **[OPEN] desktop: Crash on startup (Error 134 / Missing SSE4.2)**
    *   **重要性**：由于新版依赖 Bun 运行时，在较老的 CPU 上会直接崩溃，限制了用户的使用环境。
    *   **反应**：3 个评论，属于破坏性变更反馈。
    *   [GitHub Issue #59461](https://github.com/anomalyco/opencode/issues/59461)

6.  **[OPEN] Duplicate MCP servers accumulate under one opencode process**
    *   **重要性**：MCP 服务器进程泄漏导致内存占用激增（约 6GB），严重影响系统稳定性。
    *   **反应**：5 个评论，性能问题。
    *   [GitHub Issue #52965](https://github.com/anomalyco/opencode/issues/52965)

7.  **[OPEN] snapshot: fails on git < 2.45**
    *   **重要性**：Git 版本兼容性问题，导致快照/检查点功能在旧版本 Git 上完全失效。
    *   **反应**：5 个评论。
    *   [GitHub Issue #52953](https://github.com/anomalyco/opencode/issues/52953)

8.  **[OPEN] ACP: support mid-turn steering**
    *   **重要性**：ACP (Agent Control Protocol) 缺乏中途转向能力，限制了外部工具对 Agent 行为的干预。
    *   **反应**：3 个评论，功能增强请求。
    *   [GitHub Issue #53042](https://github.com/anomalyco/opencode/issues/53042)

9.  **[OPEN] V2: MCP discovery can starve chat reads**
    *   **重要性**：MCP 发现机制可能阻塞聊天请求队列，导致用户交互延迟或无响应。
    *   **反应**：4 个评论，架构级性能问题。
    *   [GitHub Issue #53049](https://github.com/anomalyco/opencode/issues/53049)

10. **[OPEN] UI breaking with no pattern**
    *   **重要性**：UI 界面出现随机崩溃或异常，缺乏明确的复现路径，属于严重的稳定性问题。
    *   **反应**：3 个评论，附带截图。
    *   [GitHub Issue #52939](https://github.com/anomalyco/opencode/issues/52939)

## 4. 重要 PR 进展 (Top 10)

1.  **[OPEN] feat(ai): make provider model() settings optional**
    *   **内容**：重构 Provider 配置，使 `model()` 设置更加灵活，统一了配置类型。
    *   [PR #59765](https://github.com/anomalyco/opencode/pull/59765)

2.  **[OPEN] feat(core): add /goal with a client-side done check**
    *   **内容**：新增 `/goal` 命令，提供客户端端的完成检查机制，替代了之前的服务端事件方案。
    *   [PR #59437](https://github.com/anomalyco/opencode/pull/59437)

3.  **[OPEN] feat(tui): add /interrupt slash command**
    *   **内容**：为 TUI 添加 `/interrupt` 斜杠命令，提供更直观的中断会话方式。
    *   [PR #59757](https://github.com/anomalyco/opencode/pull/59757)

4.  **[OPEN] fix(core): recover sessions after HTTP 413 payload rejections**
    *   **内容**：修复 HTTP 413 错误处理逻辑，确保包含图片的会话在自动压缩后能继续执行。
    *   [PR #53107](https://github.com/anomalyco/opencode/pull/53107)

5.  **[CLOSED] fix(codemode): fail fast instead of hanging**
    *   **内容**：修复 Code Mode 中 `await` 无法解析的 Promise 导致会话无限挂起的问题。
    *   [PR #59463](https://github.com/anomalyco/opencode/pull/59463)

6.  **[CLOSED] fix(update): only apply minimum versions on stable channels**
    *   **内容**：修复更新逻辑，仅在稳定频道应用最小版本限制，防止开发版意外回退。
    *   [PR #59761](https://github.com/anomalyco/opencode/pull/59761)

7.  **[OPEN] fix(process-daemon): wait for readiness instead of polling**
    *   **内容**：改进进程守护机制，使用等待而非轮询的方式提高性能和稳定性（来自 opencode-pty 修复）。
    *   [PR #59701](https://github.com/anomalyco/opencode/pull/59701)

8.  **[OPEN] fix(client): reconcile session.sync results into the store**
    *   **内容**：修复会话同步结果与前端 Store 的数据不一致问题，提升客户端状态同步的准确性。
    *   [PR #57093](https://github.com/anomalyco/opencode/pull/57093)

9.  **[OPEN] fix(app): keep the inbox Working shelf in a stable order**
    *   **内容**：修复收件箱中 "Working" 书架在消息流更新时频繁乱序的问题，改为保持到达顺序。
    *   [PR #59692](https://github.com/anomalyco/opencode/pull/59692)

10. **[CLOSED] fix(changelog): keep line breaks in code blocks**
    *   **内容**：修复 `/changelog` 命令中代码块换行显示异常的问题。
    *   [PR #59762](https://github.com/anomalyco/opencode/pull/59762)

## 5. 功能需求趋势
从 Issue 数据分析，社区关注点主要集中在以下三个方向：
1.  **编辑器/桌面端集成增强**：如 Todo 列表支持、插件 UI 适配、文件树实时同步。
2.  **模型与工具链稳定性**：MCP 服务器管理、Git 版本兼容性、文件编辑器的数值替换 Bug。
3.  **性能与架构优化**：进程守护机制、请求队列阻塞、多进程会话冲突。

## 6. 开发者关注点
- **运行时依赖升级**：Bun 运行时带来的 SSE4.2 指令集要求导致旧硬件用户无法启动，是当前最紧急的兼容性问题。
- **插件生态成熟度**：虽然 v2.2.0 发布了 GUI 插件，但缺乏基本的辅助功能（如文本转换），社区正在反馈如何更好地展示模型输出。
- **会话状态管理**：多进程环境下的数据库冲突和会话同步问题依然是高频技术难点。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-10-28)

## 1. 今日速览
Pi 社区在今日保持了活跃的迭代节奏，主要集中在 **Bug 修复与稳定性提升**（如 TUI 渲染、编码器解析、OpenAI/Codex 登录兼容性）以及 **Durable Object 与会话管理** 的健壮性优化。值得注意的是，针对 `vite+` 包管理器的安装检测逻辑进行了修复，解决了二进制安装冲突问题。此外，文档团队也恢复了完整的扩展指南，提升了开发者体验。

## 2. 版本发布
**无新版本发布。**

## 3. 社区热点 Issues

*   **#10953 [CLOSED] OpenAI 登录失败问题 (评论数: 11)**
    *   **重要性:** 影响企业级用户使用，涉及核心的身份验证流程。
    *   **摘要:** ChatGPT Business 工作区用户在登录时遇到 `3p_delegated_access_policy_denied` 错误，而使用 Legacy Codex 登录则正常。社区已找到解决方案，该问题已关闭。

*   **#9409 [OPEN] Reasoning 模型上下文墙问题 (评论数: 10)**
    *   **重要性:** 影响长上下文推理任务，可能导致会话永久卡死。
    *   **摘要:** 推理模型（如 GPT-4o 等）在达到上下文限制时会永久卡在 `stopReason: "length"`，自动压缩恢复失败。这是处理复杂代码任务时的严重稳定性隐患。

*   **#10390 [OPEN] Anthropic SSE 解析器解析错误 (评论数: 7)**
    *   **重要性:** 影响与 Claude 模型的通信稳定性。
    *   **摘要:** 当 CRLF 换行符被拆分到两个网络数据包时，解析器会报错 "Unexpected end of JSON input"，导致对话中断。这是网络环境下的底层协议兼容性问题。

*   **#11376 [OPEN] 运行时工具引用解析失败 (评论数: 4)**
    *   **重要性:** 影响动态加载插件时的稳定性。
    *   **摘要:** 扩展在会话中间重新加载并注销工具后，后续请求会持续报错 `tool_reference_unresolved`。这暴露了会话状态与动态工具注册之间的同步缺陷。

*   **#11460 [CLOSED] 会话恢复时内置工具丢失 (评论数: 4)**
    *   **重要性:** 核心功能缺陷，可能导致会话恢复后能力大幅下降。
    *   **摘要:** 在会话分支被截断或磁盘空间不足（ENOSPC）时，`resume` 操作会丢失所有内置工具。该问题在 1.4.0 版本中已修复。

*   **#11472 [CLOSED] RPC 模式下本地模型运行失败 (评论数: 3)**
    *   **重要性:** 影响本地大模型用户的体验。
    *   **摘要:** 在使用 `--mode rpc` 运行本地 `openai-completions` 提供商时，运行会在用户消息后立即因找不到持久化条目 ID 而终止。该问题已修复。

*   **#11415 [CLOSED] OpenAI Function Call 命名空间问题 (评论数: 3)**
    *   **重要性:** 跨模型兼容性问题。
    *   **摘要:** 当使用 `additional_tools` 时，OpenAI 对非命名空间的工具引用报错 400。修复确保了不同工具列表模式下的正确性。

*   **#11489 [CLOSED] `pi update` 在 vite+ 环境下误判安装方式 (评论数: 2)**
    *   **重要性:** 包管理器集成与安装一致性。
    *   **摘要:** 当通过 `vite+` 安装时，`pi update` 错误地将其识别为 `npm` 并执行了重复安装。修复逻辑现在能正确识别 `vite+` 的安装路径。

*   **#11423 [CLOSED] Grep 在启用上下文时损坏 UTF-16 文本 (评论数: 3)**
    *   **重要性:** 特定文件编码下的数据处理 Bug。
    *   **摘要:** 对于带 BOM 的 UTF-16LE 文件，`grep` 在请求上下文行时会返回损坏的数据。该问题已解决。

*   **#11433 [OPEN] `pi-env` 执行管道线程启动失败挂起 (评论数: 2)**
    *   **重要性:** 系统资源受限时的错误处理。
    *   **摘要:** 当 cgroup 任务限制导致管道线程启动失败时，`pi-env` 进程会直接挂起（Panic），而不是优雅地返回错误。这需要改进错误传播机制。

## 4. 重要 PR 进展

*   **#11498 [CLOSED] 恢复完整的扩展文档 (作者: christianklotz)**
    *   **内容:** 修复了文档刷新导致的 API 参考丢失问题，将 `docs/extensions.md` 恢复至约 3100 行，并修正了源码一致性。
    *   **链接:** [PR #11498](https://github.com/badlogic/pi-mono/pull/11498)

*   **#11496 [CLOSED] 限制 OpenRouter 推理 Token (作者: mathiasbourgoin)**
    *   **内容:** 优化了 OpenRouter 接口调用，将推理 Token 限制作为嵌套参数发送，并确保至少保留 1024 个 Token 用于回答，防止模型超时。

*   **#11494 [CLOSED] 识别 LiteLLM 上下文溢出错误 (作者: robopipi[bot])**
    *   **内容:** 添加了对 `ContextWindowExceededError` 的特殊处理逻辑，防止因上下文超限导致的静默失败。

*   **#11491 [CLOSED] 修复 vite+ 全局安装的更新检测 (作者: ebendler)**
    *   **内容:** 增强了 `detectInstallMethod` 函数，通过检测 `/.vite-plus/` 路径组件，确保从 vite+ 安装时正确更新，而不是触发 npm 冲突安装。

*   **#11487 [CLOSED] 修复 TUI 数学公式渲染溢出 (作者: robopipi[bot])**
    *   **内容:** 当显示数学公式宽度超过内容宽度时，不再仅对溢出行进行换行，而是回退到原始 LaTeX 渲染，防止布局错乱。

*   **#11486 [CLOSED] 修复文件写入失败时的会话内存一致性 (作者: robopipi[bot])**
    *   **内容:** 解决了在写入会话条目失败（如磁盘满）时，内存中已追加的条目与磁盘状态不一致的问题，防止恢复时出现孤儿父 ID。

*   **#11482 [CLOSED] 传递 Thinking Level 到分支摘要 (作者: robopipi[bot])**
    *   **内容:** 修复了 `/tree` 的 "Summarize" 功能未正确传递 `thinkingLevel` 参数的问题，确保推理模型在总结时也能启用推理能力。

*   **#11471 [CLOSED] 允许自定义组件报告阻塞状态 (作者: robopipi[bot])**
    *   **内容:** 扩展了 `ctx.ui.custom()` 的能力，允许其通过 OSC 7501 协议报告 `blocked` 状态，解决了自定义对话框（如审批弹窗）显示为 "working" 的问题。

*   **#11469 [CLOSED] 跳过 npm audit 和 fund 输出 (作者: robopipi[bot])**
    *   **内容:** 在安装 Pi 扩展时跳过 `npm audit` 和 `fund` 输出，避免终端噪音，并防止用户盲目执行 `npm audit fix` 造成安全隐患。

*   **#11477 [CLOSED] 优化 TUI 滚动条渲染性能 (作者: micktaiwan)**
    *   **内容:** 通过跳过不必要的图元分段处理，显著降低了滚动条渲染时的 CPU 消耗，特别是在长文本列表中。

## 5. 功能需求趋势

*   **多包管理器支持:** 社区对 `vite+` (VoidZero) 等非标准包管理器的支持需求增加，要求 `pi update` 能够智能识别安装环境。
*   **本地与边缘计算:** 开发者对本地模型运行（如 llama.cpp over openai-completions）和 RPC 模式的稳定性有极高关注，特别是错误恢复机制。
*   **文档与可发现性:** 恢复完整的扩展 API 文档是当前社区讨论的热点，开发者需要详细的工具指导和参考。

## 6. 开发者关注点

*   **会话持久化健壮性:** 频繁出现的会话恢复、分支截断导致的数据丢失或工具丢失问题，是开发者最核心的痛点。
*   **网络流处理容错:** SSE 流解析对 CRLF 拆包、网络超时的处理能力直接影响使用体验，尤其是在不稳定的网络环境下。
*   **IDE 集成与扩展生态:** 随着动态工具加载功能的普及，扩展插件的加载时机、生命周期管理以及与主会话的交互逻辑变得日益复杂。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-10-28
**来源**: github.com/QwenLM/qwen-code

---

## 1. 今日速览
Qwen Code 在过去 24 小时内发布了 `v0.26.3-preview.0`，主要修复了 XML 解析性能问题并简化了 Web Shell 控制。社区活跃度高，发布了 50 个 PR 和 48 个 Issue，重点关注多代理架构、CI/CD 稳定性、Shell 交互体验以及 MCP（Model Context Protocol）工具支持。

---

## 2. 版本发布
### v0.26.3-preview.0 (刚刚发布)
*   **更新内容**:
    *   **feat(memory)**: 优化内存提取频率，支持按需提取。
    *   **fix(core)**: 恢复带引号 `ca` 的外层 XML 调用（可能指 Call Assembly 或类似机制）。
    *   **fix(managed-agent)**: 简化 Web Shell 控制，弃用 `cwd` 提交，提升架构稳定性。
*   **影响**: 这是一次针对核心解析引擎和托管代理管理层的修复预览版本，预计将提升大模型交互场景下的响应速度和稳定性。

---

## 3. 社区热点 Issues (Top 10)

| ID | 标题 | 重要性 | 关键词 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **#12380** | Proposal: Define Managed Agent dual-path architecture | 🔴 **高** | 多代理架构、阶段交付 | Open (72 comments) |
| **#14724** | Main CI failed: Managed Agent gate — no test identified | 🔴 **高** | CI 失败、自动化测试 | Open (68 comments) |
| **#13787** | XML recovery repeats prefix scans on large responses | 🟡 **中** | 性能优化、XML 解析 | Open (11 comments) |
| **#15686** | Active Goal holds user input until Goal leaves active | 🟡 **中** | 交互体验、UI | Open (6 comments) |
| **#13749** | feat(mods): add a Claude Code-style Mod runtime | 🟡 **中** | 扩展生态、兼容性 | Open (6 comments) |
| **#13024** | Provider preset for IO Intelligence (io.net) | 🟢 **低** | API 支持、新模型 | Open (5 comments) |
| **#15675** | sed edit simulation: `.` does not match `\r` | 🟢 **低** | Shell 工具、跨平台 | Open (5 comments) |
| **#15741** | MCP: duplicate tool names discard the entire server | 🟢 **低** | MCP 协议、工具管理 | Open (2 comments) |
| **#15738** | Team mode: teammate messages never delivered to leader | 🟢 **低** | 多代理、ACP 模式 | Open (2 comments) |
| **#15742** | native api.anthropic.com session 400s forever | 🟢 **低** | Anthropic 集成 | Open (2 comments) |

**为何重要**:
*   **#12380 & #14724**: 涉及 Qwen Code 核心的多代理管理架构，是项目长期发展的关键基础设施，目前 CI 测试存在瓶颈。
*   **#13787**: 针对大量并发调用时的性能瓶颈，直接影响复杂任务的执行效率。
*   **#15686**: 涉及终端交互的细节体验，影响用户在 Web Shell 下的操作流畅度。

---

## 4. 重要 PR 进展 (Top 10)

| ID | 标题 | 类型 | 核心内容 |
| :--- | :--- | :--- | :--- |
| **#15718** | feat(managed-agent): support opt-in same-context Java embedding | Feature | 允许在现有 JVM/Spring 应用中无感知嵌入 Managed Agent。 |
| **#15743** | fix(cli): forward workflow switches into the CLI sandbox | Fix | 修复 CLI 沙箱环境未正确传递工作流开关配置的问题。 |
| **#15734** | fix(ci): pin PR retries to the triggering head SHA | Fix | 修复 CI 重复运行时可能因 HEAD 变化导致的不确定性。 |
| **#15557** | feat(web-shell): move archived conversations into Settings | Feature | 将归档对话从侧边栏移至设置页面，优化界面布局。 |
| **#15466** | feat(serve): add user-scope Skill activation routes | Feature | 新增用户级技能的启用/禁用 API 路由，支持批量管理。 |
| **#15060** | fix(web-shell): reset follow pause when session changes | Fix | 修复会话切换时阅读暂停未重置的问题，避免交互错乱。 |
| **#14577** | fix(web-shell): prune split panes whose session left active | Fix | 修复分屏视图会话归档后仍保留空 Pane 的问题。 |
| **#14230** | feat(web-shell): browse managed auto-memory in /memory | Feature | 在 Web Shell 的 /memory 面板中新增自动记忆浏览功能。 |
| **#14179** | feat(web-shell): keyboard shortcuts for Overview | Feature | 为会话概览和分屏视图添加键盘快捷键支持。 |
| **#15275 & #15286** | fix(ci): lock scope for SDK Java tests | Fix | 优化 Java SDK 测试的 Maven 锁竞争，提升 CI 并发能力。 |

---

## 5. 功能需求趋势

1.  **多代理与托管架构**:
    *   **热度**: 极高。围绕 `Managed Agent` 的双路径架构设计（Issue #12380）和 Java 嵌入支持（PR #15718）是本周最核心的讨论点。
    *   **趋势**: 社区正在探索如何让 Qwen Code 更好地集成到企业级应用（如 Spring Boot）中，以及如何通过架构设计解决多 Agent 协作中的通信和状态管理问题。

2.  **Web Shell 交互体验优化**:
    *   **热度**: 高。大量 Issue 和 PR 聚焦于 UI 布局（归档对话移位）、输入阻塞（Active Goal 问题）以及键盘快捷键支持。
    *   **趋势**: 开发者越来越关注 Web 终端的“拟真感”和操作效率，项目正在从基础功能向精细化交互体验演进。

3.  **扩展生态与兼容性**:
    *   **热度**: 中。支持 Claude Code 风格的 Mod 运行时（Issue #13749）以及 MCP 工具管理的改进。
    *   **趋势**: 项目致力于构建一个开放的插件生态，通过兼容 Claude 的 API 或标准 MCP 协议来降低用户迁移成本。

---

## 6. 开发者关注点

1.  **CI/CD 稳定性**:
    *   **痛点**: 多个 Issue（#14724, #13078, #15697, #15677）报告 CI 流水线不稳定，包括依赖漏洞审计失败、测试超时以及特定平台（ARM64, macOS Intel）的兼容性问题。
    *   **需求**: 开发者急需更稳定的自动化测试环境和更快的构建反馈。

2.  **Shell 工具与文件操作的准确性**:
    *   **痛点**: Issue #15675 指出本地 `sed` 模拟器与真实命令行行为不一致（如 `\r` 匹配问题），影响跨平台脚本执行的可靠性。
    *   **需求**: 需要更精确地模拟底层 Shell 行为，特别是在处理特殊字符和 emoji 时。

3.  **跨平台兼容性**:
    *   **痛点**: Homebrew 安装在 macOS 上出现的动态库重写问题（Issue #15690），以及不同架构下的性能差异。
    *   **需求**: 重视打包分发流程，特别是对 Apple Silicon 和 Intel 架构的统一支持。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI (Codewhale) 社区动态日报

**日期**: 2026-10-28  
**数据源**: [github.com/Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)

---

## 1. 今日速览

过去24小时内，DeepSeek TUI (Codewhale) 社区主要聚焦于 **v0.10.3 版本的稳定性修复与本地模型集成优化**。开发团队解决了大量由 Windows 状态根路径、本地 Ollama 模型识别及安装脚本重复下载引发的问题。同时，针对非英语用户的本地化改进以及性能回归问题也进入了密集的修复阶段。

---

## 2. 版本发布

**无新版本发布** (Latest Release: 无)

---

## 3. 社区热点 Issues

以下选取了过去24小时内更新且关注度较高的 10 个 Issue：

1.  **[CLOSED] Context compression failed** (#6981)
    *   **摘要**: 用户报告上下文压缩功能在建立新会话时失败，报错 `Chat API response missing choices`。该问题已在近期修复。
    *   **重要性**: 核心功能 Bug，影响多轮对话的上下文管理。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/6981)

2.  **[OPEN] CPU Usage Regression: v0.9.12 → v0.10.0** (#6728)
    *   **摘要**: 在 FreeBSD 15.0 上，v0.10.0 版本的 CPU 占用率显著高于 v0.9.12（从 idle 到 heavy）。
    *   **重要性**: **性能回归**，直接影响用户体验和硬件成本，开发团队需排查资源泄漏。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/6728)

3.  **[OPEN] Conversation history is lost** (#7095)
    *   **摘要**: 在执行长任务时，输入框中出现内容错位，随后对话历史丢失。
    *   **重要性**: 数据丢失风险，属于严重可靠性问题。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/7095)

4.  **[OPEN] Ollama 32K local models fail on the second turn** (#7113)
    *   **摘要**: 本地 Ollama 模型在第二轮对话时失败，`input budget` 约为 5K，疑似回归了之前的 #5820 问题。
    *   **重要性**: 本地模型支持是 DeepSeek TUI 的关键特性，该 Bug 阻碍了用户使用本地算力。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/7113)

5.  **[OPEN] Session journal has no bound** (#6842)
    *   **摘要**: 会话日志无上限，压缩虽然会退役消息，但会保留每个被替换版本的副本在 RAM 中，导致内存泄漏。
    *   **重要性**: **内存泄漏**，长时间运行会导致程序崩溃。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/6842)

6.  **[OPEN] Black text on black background** (#7043)
    *   **摘要**: 在某些主题配置下，文本显示为黑色背景上的黑色，导致无法阅读。
    *   **重要性**: **UI/UX Bug**，影响基本可用性。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/7043)

7.  **[OPEN] exec and doctor ignore the TUI's keyless Ollama adoption** (#7115)
    *   **摘要**: TUI 启动时可以自动切换到无 Key 的 Ollama，但 `exec` 和 `doctor` 命令仍强制要求 DeepSeek Key。
    *   **重要性**: 命令行工具的一致性问题，影响自动化脚本使用。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/7115)

8.  **[OPEN] install.sh downloads the same binary twice** (#7102)
    *   **摘要**: 安装脚本 `install.sh` 会重复下载 `codewhale` 和 `codew` 两个同名二进制文件。
    *   **重要性**: **安装效率**问题，浪费带宽和时间。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/7102)

9.  **[OPEN] zh-Hans localization: hardcoded English strings** (#7071)
    *   **摘要**: 中文（及所有非英语）环境下，`/undo`、`/diff` 等命令的反馈文本仍为英文。
    *   **重要性**: **国际化** 需求，影响非英语用户的体验。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/7071)

10. **[OPEN] Skills description caps at 400 chars** (#7073)
    *   **摘要**: 技能描述被硬编码限制在 400 字符，且无配置选项。
    *   **重要性**: 功能限制，限制了技能的详细描述能力。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/issues/7073)

---

## 4. 重要 PR 进展

过去24小时内，社区提交了 17 个 PR，其中 5 个已关闭，12 个进行中。以下是关键进展：

1.  **fix(catalog): read the token limits a live model listing states** (#7105)
    *   **内容**: 修复了非特定路由（如 OrcaRouter）在获取模型列表时无法读取 Token 限制的问题。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7105)

2.  **fix(tui): stop a finished turn from blocking its session save** (#7100)
    *   **内容**: 修复了会话保存可能因线程阻塞而停止更新的问题，确保流式响应中断后能正确处理重试。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7100)

3.  **fix(installer): avoid downloading identical codew asset twice** (#7107)
    *   **内容**: 优化安装脚本，避免重复下载相同的二进制文件，提升安装速度。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7107)

4.  **fix(tui): keep the workspace folder in view when /context shortens its path** (#7103)
    *   **内容**: 修复了 `/context` 命令缩短路径时导致工作区文件夹名被截断的 UI 问题。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7103)

5.  **fix(tui): resolve the state root before opening session-side state** (#7097)
    *   **内容**: **[已关闭]** 修复了当状态根目录（如 Windows Junction）被移动时导致会话保存失败的严重 Bug。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7097)

6.  **fix(tui): shed to the folder name before clipping the launch card's path** (#7112)
    *   **内容**: 修复了启动卡片路径裁剪逻辑，防止将当前工作文件夹截断。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7112)

7.  **fix(commands): localize diff feedback** (#7101)
    *   **内容**: 将 `/diff` 命令的输出信息国际化，支持所有 15 种语言包。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7101)

8.  **fix(tui): only say "Model set to" when the model changes** (#7094)
    *   **内容**: 优化模型切换反馈，仅在模型实际变更时显示提示，避免重复刷屏。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7094)

9.  **fix(ci): preserve DSH receipt bytes on Windows** (#7099)
    *   **内容**: **[已关闭]** 修复了 Windows 环境下源代码校验文件（DSH receipt）的换行符问题，确保 CI 通过。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7099)

10. **feat(context): per-scope instruction budgets with visible truncation** (#7086)
    *   **内容**: **[已关闭]** 实现了针对不同作用域的指令 Token 预算管理，并提供了可视化的截断反馈。
    *   [查看详情](https://github.com/Hmbown/DeepSeek-TUI/pull/7086)

---

## 5. 功能需求趋势

从 Issues 和 PR 的分析来看，当前社区关注点集中在以下方向：

1.  **本地模型支持与兼容性**:
    *   随着本地 LLM（如 Ollama）的普及，用户反馈了关于本地模型识别、第二轮对话失败、Embedding 模型被误选为默认聊天模型等具体问题。
    *   **趋势**: 优化本地模型的路由逻辑和配置体验。

2.  **稳定性与内存管理**:
    *   高频出现关于“会话保存失败”、“内存无限增长”、“CPU 占用回归”的反馈。
    *   **趋势**: 加强 Rust 后端对并发和内存的健壮性，特别是针对长会话的压缩机制。

3.  **国际化 (i18n)**:
    *   针对中文等非英语环境的硬编码问题反馈较多。
    *   **趋势**: 完善所有 15 种语言包的本地化，包括 TUI 字符串、命令反馈和 Markdown 渲染。

4.  **跨平台体验**:
    *   Windows 环境下的 Junction/Symlink 路径处理、CRLF 换行符问题、NSIS 卸载器完善是重点。
    *   **趋势**: 确保在 Windows 上的安装、卸载和文件系统操作符合原生体验。

---

## 6. 开发者关注点

1.  **安装脚本优化**: PR #7107 和 Issue #7102 表明，开发者正在致力于优化安装体验，减少不必要的下载。
2.  **CI/CD 兼容性**: PR #7099 修复了 Windows CI 环境下的文件校验问题，显示团队在构建流程上投入了大量精力。
3.  **架构层面的修复**: 如 #7097 解决了“状态根目录”这一架构层面的痛点，说明项目正在解决更深层次的配置管理问题。
4.  **本地化贡献**: 社区成员积极提交 PR 来修复本地化问题（如 #7101），显示出开源社区的活跃度。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*