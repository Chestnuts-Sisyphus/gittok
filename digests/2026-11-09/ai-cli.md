# AI CLI 工具社区动态日报 2026-11-09

> 生成时间: 2026-11-08 23:17 UTC | 覆盖工具: 9 个

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

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-11-09
**来源**: github.com/github/copilot-cli

---

## 1. 今日速览

今日社区动态主要集中在 **会话管理** 与 **插件系统** 的稳定性上。过去24小时内，GitHub 修复了 Asahi Linux 环境下的静态链接崩溃问题，并针对会话创建、恢复及插件工具的权限请求机制进行了修复。尽管没有新的 Release 发布，但社区在会话上下文管理、Agent 配置及 MCP 服务器的兼容性上提出了多项新需求。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 社区热点 Issues（精选 10）

### 🐛 核心稳定性与 Bug 修复
*   **#4977 - Bundled ripgrep aborts with jemalloc on 16KB-page ARM64 kernels**
    *   **重要性**: **极高**。修复了在 Asahi Linux (ARM64 16KB 页面) 环境下 CLI 的崩溃问题，影响使用该特定硬件环境的开发者。
    *   **社区反应**: 已关闭。1 个👍，表明该问题已解决。
    *   [查看 Issue #4977](https://github.com/github/copilot-cli/issues/4977)

*   **#5219 - Session wedged: task subagent with unknown model id fails**
    *   **重要性**: **高**。长期存在的会话卡死问题，涉及子代理模型调用失败及 Prompt 预算超限，严重影响长对话体验。
    *   **社区反应**: 4 条评论，0 个👍。目前仍处于开放状态，等待修复。
    *   [查看 Issue #5219](https://github.com/github/copilot-cli/issues/5219)

*   **#5100 - Session event delivery permanently fails after host-ack timeout**
    *   **重要性**: **高**。长期会话中偶发的 120 秒主机确认超时错误，导致会话不可用。
    *   **社区反应**: 3 条评论，0 个👍。问题已存在较久（10月创建）。
    *   [查看 Issue #5100](https://github.com/github/copilot-cli/issues/5100)

*   **#5379 - PowerShell approval parser requires full-script review in 1.0.107**
    *   **重要性**: **中**。在 Windows PowerShell 环境下，简单的 Git 命令被错误地要求进行全脚本审查，降低了开发效率。
    *   **社区反应**: 0 条评论，0 个👍。
    *   [查看 Issue #5379](https://github.com/github/copilot-cli/issues/5379)

### 🚀 功能需求与体验优化
*   **#5383 - Allow setting default Agent**
    *   **重要性**: **高**。开发者希望能够在配置中指定默认 Agent，而不是每次开启新会话时都需要手动激活，提升操作流畅度。
    *   **社区反应**: 0 条评论，0 个👍。
    *   [查看 Issue #5383](https://github.com/github/copilot-cli/issues/5383)

*   **#5320 - Support OSC 7501 agent-status reporting for herdr-app**
    *   **重要性**: **中**。增强终端集成体验，支持 Herdr 应用通过 OSC 7501 协议显示 Copilot 会话状态，便于管理多会话。
    *   **社区反应**: 3 条评论，**11 个👍**（目前最热门的功能请求）。
    *   [查看 Issue #5320](https://github.com/github/copilot-cli/issues/5320)

*   **#5374 - Render postToolUse hook messages in Copilot desktop app**
    *   **重要性**: **中**。修复桌面应用中插件 Hook 返回的修改结果或附加上下文无法显示的问题，确保用户能看到工具执行后的反馈。
    *   **社区反应**: 0 条评论，0 个👍。
    *   [查看 Issue #5374](https://github.com/github/copilot-cli/issues/5374)

### 🔌 插件与扩展系统
*   **#5381 - Extension tool permission request waits forever in prompt mode**
    *   **重要性**: **高**。插件工具在 Prompt 模式下请求权限时，系统会无限等待而非拒绝，导致进程卡死。
    *   **社区反应**: 0 条评论，0 个👍。
    *   [查看 Issue #5381](https://github.com/github/copilot-cli/issues/5381)

*   **#5382 - Skills registered through extension disappear after new_context**
    *   **重要性**: **中**。插件定义的 Skill 目录在会话上下文清除后丢失，导致技能不可用。
    *   **社区反应**: 0 条评论，0 个👍。
    *   [查看 Issue #5382](https://github.com/github/copilot-cli/issues/5382)

*   **#5380 - Extensions don't start for sessions created with create_session**
    *   **重要性**: **中**。通过 CLI 工具创建的会话默认不加载插件，直到用户切换到该会话才加载。
    *   **社区反应**: 1 条评论，0 个👍。
    *   [查看 Issue #5380](https://github.com/github/copilot-cli/issues/5380)

*   **#4378 - Cloud agent: MCP registry policy fetch fails on GHEC data residency**
    *   **重要性**: **高**。在 GitHub Enterprise Cloud 数据驻留模式下，MCP 服务器配置被静默丢弃，影响企业级用户的使用。
    *   **社区反应**: 2 条评论，0 个👍。
    *   [查看 Issue #4378](https://github.com/github/copilot-cli/issues/4378)

---

## 4. 重要 PR 进展（精选 10）

*今日无 Pull Requests 更新。*

---

## 5. 功能需求趋势

从最新的 Issues 中可以提炼出以下社区关注的热点方向：

1.  **会话生命周期管理**：这是当前最拥挤的领域。社区关注点包括：**会话恢复**（Resume/Close 逻辑）、**会话状态持久化**（Artifact 存储位置）、以及**会话扩展加载**（Extensions 初始化时机）。开发者希望能更精细地控制会话的创建、切换和恢复。
2.  **终端集成与显示**：除了 OSC 7501 状态报告外，社区还关注**桌面应用中 Hook 消息的渲染**，希望改善工具调用结果的展示体验。
3.  **配置灵活性**：开发者希望减少重复操作，**默认 Agent 设置**和**默认配置项**是高频需求。
4.  **插件稳定性**：随着插件生态发展，**权限请求处理**、**技能注册生命周期**以及**插件工具的兼容性**成为了阻碍使用的关键因素。

---

## 6. 开发者关注点

*   **"Session stuck" (会话卡死)**：长对话场景下，任务代理调用失败或事件确认超时是阻碍用户进行复杂开发工作的最大痛点。
*   **"Context lost" (上下文丢失)**：在执行 `new_context` 或会话恢复时，插件注册的 Skills 和工具丢失，导致功能突然失效。
*   **"Permission blocking" (权限阻塞)**：在非交互模式下（Prompt mode），插件工具的权限请求处理逻辑存在 Bug，导致程序挂起。
*   **"File Storage Location" (文件存储位置)**：会话生成的辅助文件（如审计报告、脚本）存储在 `~/.copilot/` 而非项目工作区，导致文件散落在各处，难以管理。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-11-09  
**数据来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
OpenCode 社区本周重点围绕 **V2 子代理后台任务处理机制** 进行了深入讨论，特别是关于后台工作完成过早导致结果丢失的严重 Bug（#48826）引发了大量关注。同时，**免费层额度重置失效**（#59387）问题依旧占据社区热度榜首，超过 300 条评论。在功能开发方面，团队正在推进 **Venice E2EE 模型支持** 以及 **订阅计费数据的上报**。

---

## 2. 版本发布
*无新版本发布。*

---

## 3. 社区热点 Issues

### 🔥 热门争议
**#59387** [OPEN] [zen] Free tier issues: read this first, then post your report here
*   **重要性**: **社区最高热度**。这是关于免费层额度管理的核心 Issue，涉及额度耗尽、重置失败等基础体验问题。
*   **社区反应**: 333 条评论，25 个点赞。许多用户反馈尽管额度已重置，系统仍显示"已用完"。

**#48826** [OPEN] [reproduced] [BUG] V2: subagent with pending background work marked completed early
*   **重要性**: **核心架构 Bug**。V2 子代理在后台任务未完成时即被标记为"完成"，导致结果永远无法收集。
*   **影响范围**: 影响所有 V2 子代理使用 shell 命令或嵌套子代理的场景。

### 功能建议
**#23655** [OPEN] [FEATURE]: add Responses API support for Go service
*   **重要性**: **API 兼容性增强**。请求为 Go 服务添加对 OpenAI Responses API 的支持。
*   **社区反应**: 31 个点赞，表明开发者对更现代 API 的强烈需求。

**#54375** [OPEN] [FEATURE]: keep the tab's model when switching between plan and build
*   **重要性**: **桌面端 UX 优化**。请求在切换 Plan 和 Build 界面时保持当前选中的模型。
*   **痛点**: 切换后模型丢失导致操作不便。

### 修复确认
**#62213** [CLOSED] [triaging] Subagent writes denied: built-in tester policy 'edit * deny' is appended after agent rules
*   **重要性**: **权限系统修复**。解决了内置测试策略覆盖了用户自定义规则的问题。
*   **修复逻辑**: 采用了"最后匹配优先"的规则调整。

**#62194** [CLOSED] [triaging] V2 cold-start model resolution can select an unavailable catalog provider
*   **重要性**: **启动稳定性**。修复了 V2 冷启动时模型选择错误的潜在问题。

---

## 4. 重要 PR 进展

**#62788** [OPEN] feat(core): report subscription provider token usage to OpenCode Console
*   **内容**: 为订阅提供商添加 Token 使用量上报功能，与 Console 端联动。
*   **状态**: 开发中，预计将提供更透明的计费数据。

**#62786** [OPEN] feat(ai): support Venice end-to-end encrypted models
*   **内容**: 新增对 Venice E2EE（端到端加密）模型的支持。
*   **意义**: 增强隐私保护能力，支持 `e2ee-*` 系列模型。

**#62785** [OPEN] fix(core): capture snapshots when an embedded repository's status fails
*   **内容**: 修复嵌入式仓库状态失败时的快照捕获机制。

**#62784** [OPEN] docs(console): document Watches
*   **内容**: 文档化即将推出的 "Watches" 功能（监控/追踪功能）。
*   **状态**: 暂未合并，等待功能开放。

**#53975** [CLOSED] [automated-pr-cleanup] fix(core): forward unrecognized OpenAI-compatible model settings as body fields
*   **内容**: 修复 OpenAI 兼容提供商的设置转发问题，提升兼容性。

---

## 5. 功能需求趋势

通过对 50+ 个 Issues 的分析，社区关注点主要集中在以下方向：

1.  **IDE 与桌面端体验优化**:
    *   直接编辑文件功能 (#9541)
    *   TUI 界面紧凑化 (#52339)
    *   会话标签页拖拽排序 (#62646)
    *   键盘快捷键 `Ctrl+Alt+K` 功能缺失 (#62650)

2.  **模型与 API 支持扩展**:
    *   Go 服务 Responses API 支持 (#23655)
    *   Venice E2EE 模型支持 (PR #62786)
    *   Gemini `cachedContent` 修复 (#62556)

3.  **数据与配置管理**:
    *   配置文件拆分 (#19353)
    *   会话数据无限增长与清理 (#62214)
    *   插件工具的代理级可见性过滤 (#24953)

---

## 6. 开发者关注点

*   **免费层稳定性**: 绝大多数活跃用户正在反馈免费额度重置机制的 Bug，这直接影响基础用户留存。
*   **后台任务可靠性**: V2 架构下的子代理后台任务管理（Shell 命令执行、嵌套调用）存在严重的逻辑漏洞，导致任务挂起或结果丢失。
*   **多 Provider 路由**: Windows 环境下 OpenAI 兼容提供商的路由逻辑存在 bug，可能导致请求发送到错误的端点 (#62708)。
*   **会话持久化**: 会话数据增长无界且缺乏自动清理机制，可能引发磁盘空间耗尽风险。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-09  
**仓库**: [badlogic/pi-mono](https://github.com/badlogic/pi-mono)  
**数据范围**: 过去 24 小时

---

## 1. 今日速览
过去 24 小时内，Pi 社区活跃度较高，共更新 **22 个 Issue** 和 **4 个 Pull Requests**。主要聚焦于 **MCP (Model Context Protocol) 连接稳定性** 的修复、**Agent 自动重试机制的扩展性** 以及 **视频/音频附件支持** 的讨论。尽管没有新版本发布，但大量 Bug 修复（如 Mintty 终端兼容性、OAuth 认证问题）提升了用户体验。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues (Top 10)

1.  **[OPEN] `getContextUsage()` 在网络重试后严重夸大上下文**
    *   **作者**: WodenJay | **热度**: 2 👍
    *   **摘要**: 在 v0.99.2 版本中，可重试的网络错误导致 `getContextUsage()` 从 42k tokens 跳升至 330,081 tokens，严重影响 Token 预算管理。
    *   **链接**: [Issue #10287](https://github.com/earendil-works/pi/issues/10287)

2.  **[OPEN] Agent 任务因输入图片过多而停止**
    *   **作者**: S1M0N38 | **热度**: 0 👍
    *   **摘要**: Pi Agent 在长时间运行（如 babysitting PR）时，若输入图片数量过多会导致任务中断，破坏了 Agent 的持续工作能力。
    *   **链接**: [Issue #10162](https://github.com/earendil-works/pi/issues/10162)

3.  **[CLOSED] 支持 Video/Audio 附件**
    *   **作者**: rock3r | **热度**: 0 👍
    *   **摘要**: 用户请求支持视频和音频附件，目前 Pi 仅支持图像。这是一个功能增强需求，目前已被关闭（可能因实现复杂或暂缓）。
    *   **链接**: [Issue #2809](https://github.com/earendil-works/pi/issues/2809)

4.  **[CLOSED] Native MCP 服务器连接状态发布**
    *   **作者**: desideratum | **热度**: 0 👍
    *   **摘要**: 请求在自定义页脚中显示 Native MCP 服务器的连接状态，目前该功能已实现。
    *   **链接**: [Issue #10871](https://github.com/earendil-works/pi/issues/10871)

5.  **[CLOSED] `openai-completions` 丢失 OpenRouter 原生诊断信息**
    *   **作者**: pasky | **热度**: 0 👍
    *   **摘要**: 在处理 OpenRouter 错误时，Pi 隐藏了 `native_finish_reason`（如 `MALFORMED_FUNCTION_CALL`），导致错误排查困难。现已修复。
    *   **链接**: [Issue #11931](https://github.com/earendil-works/pi/issues/11931)

6.  **[CLOSED] `shift+enter` 无法换行**
    *   **作者**: zaskara | **热度**: 4 👍
    *   **摘要**: 自安装以来 Shift+Enter 行为与 Enter 一致（直接发送），用户希望它能插入换行符。目前已被修复。
    *   **链接**: [Issue #4918](https://github.com/earendil-works/pi/issues/4918)

7.  **[CLOSED] MCP 重新连接阻塞 2-4 分钟**
    *   **作者**: fezzzza | **热度**: 0 👍
    *   **摘要**: 当配置多个 MCP 服务器并完成一个的认证后，系统会按顺序尝试重连所有服务器（包括未认证的），导致长时间阻塞。现已修复。
    *   **链接**: [Issue #11919](https://github.com/earendil-works/pi/issues/11919)

8.  **[CLOSED] Transient states (如 429) 被误判为永久错误**
    *   **作者**: lee-b | **热度**: 0 👍
    *   **摘要**: 服务器返回 429 (Too Many Requests) 时被错误地标记为红色错误并永久记录，而非暂时的网络波动。现已修复。
    *   **链接**: [Issue #11926](https://github.com/earendil-works/pi/issues/11926)

9.  **[CLOSED] `shift+enter` 在 mintty 中无法搜索上一个结果**
    *   **作者**: Geoffrey-A | **热度**: 0 👍
    *   **摘要**: 在 mintty (Cygwin/MSYS2) 环境下，Shift+Enter 无法切换到上一个搜索结果，现已通过 PR #11934 修复。
    *   **链接**: [Issue #11935](https://github.com/earendil-works/pi/issues/11935)

10. **[CLOSED] 添加保持模型和思考级别的 `/clear` 命令**
    *   **作者**: JackCaster | **热度**: 0 👍
    *   **摘要**: 当前 `/new` 命令会重置模型和思考级别，用户希望有一个 `/clear` 命令仅清空上下文而不改变设置。
    *   **链接**: [Issue #11925](https://github.com/earendil-works/pi/issues/11925)

---

## 4. 重要 PR 进展 (Top 10)

1.  **[CLOSED] tui: decode mintty LF as Shift+Enter**
    *   **作者**: Geoffrey-A
    *   **摘要**: 修复 mintty 终端中 Shift+Enter 无法搜索上一个结果的问题。mintty 将 Shift+Enter 发送为 LF，修复后能正确识别。
    *   **链接**: [PR #11934](https://github.com/earendil-works/pi/pull/11934)

2.  **[CLOSED] docs: fix RFC link in CONTRIBUTING.md**
    *   **作者**: jrzimmerman
    *   **摘要**: 修复 CONTRIBUTING.md 中的 RFC 链接末尾多余的斜杠导致的 404 错误。
    *   **链接**: [PR #11900](https://github.com/earendil-works/pi/pull/11900)

3.  **[CLOSED] feat: prompt cache warming in p2**
    *   **作者**: mitsuhiko
    *   **摘要**: **性能优化**。在 p2 会话中实现 Prompt Cache 预热机制。之前由于缓存未刷新，超过 305 秒的请求会重写整个 Prompt，浪费约 $1,430 并增加 26% 的成本。该 PR 解决了此问题。
    *   **链接**: [PR #11857](https://github.com/earendil-works/pi/pull/11857)

4.  **[CLOSED] fix(codemode): let scripts declare their own tools and console bindings**
    *   **作者**: simplast
    *   **摘要**: 修复代码模式脚本中定义 `tools` 或 `console` 时出现的语法错误 (`invalid redefinition of parameter name`)。原因是 `vm.ts` 的包装方式与顶层声明冲突。
    *   **链接**: [PR #11920](https://github.com/earendil-works/pi/pull/11920)

5.  **[CLOSED] Add a clear-context command that keeps the model and thinking level**
    *   **作者**: JackCaster
    *   **摘要**: 实现了 `/clear` 命令，允许用户在不重置模型和思考级别的情况下清空当前会话上下文。
    *   **链接**: [PR #11925](https://github.com/earendil-works/pi/pull/11925)

6.  **[CLOSED] Extension hook for agent auto-retry: let an extension set the delay or stop the retry**
    *   **作者**: cad0p
    *   **摘要**: **功能扩展**。引入 `auto_retry_decision` 事件钩子，允许扩展程序在 Agent 自动重试计算退避延迟后、开始重试前，动态设置延迟或完全停止重试。
    *   **链接**: [PR #11932](https://github.com/earendil-works/pi/pull/11932)

7.  **[CLOSED] openai-completions: Mistral GLM streams delta.content as content-block arrays**
    *   **作者**: laurensvos
    *   **摘要**: 修复 Mistral 模型返回数组格式 `delta.content` 时，被渲染为 `[object Object]` 的问题。
    *   **链接**: [PR #11916](https://github.com/earendil-works/pi/pull/11916)

8.  **[CLOSED] Select a thinking level when choosing a model**
    *   **作者**: jackalbyte
    *   **摘要**: 优化模型选择流程，允许用户在确认选择模型的同时指定 Thinking Level，而非选择后再手动调整。
    *   **链接**: [PR #11929](https://github.com/earendil-works/pi/pull/11929)

9.  **[CLOSED] `ui_prompt_start` could carry `blocked` for `ui.custom`**
    *   **作者**: moekyo
    *   **摘要**: 扩展 `ui_prompt_start` 事件，使其能够携带由 `ctx.ui.custom` 触发的 `blocked` 状态信息，以便更好地追踪 UI 限制。
    *   **链接**: [PR #11924](https://github.com/earendil-works/pi/pull/11924)

10. **[CLOSED] Re-file of #4529: subpath support for `pi install git:`**
    *   **作者**: Mearman
    *   **摘要**: **功能增强**。支持 `pi install git:github.com/user/repo/path/to/subdir`，允许从 Monorepo 的子目录安装扩展，而不仅仅是根目录。
    *   **链接**: [PR #4851](https://github.com/earendil-works/pi/pull/4851)

---

## 5. 功能需求趋势

*   **MCP 协议集成深化**: 大量 Issue 和 PR 聚焦于 MCP 服务器（特别是 Google Workspace）的连接状态、重连机制、OAuth 认证传递以及工具调用结果。这表明 Pi 正在向更复杂的第三方服务集成发展。
*   **Agent 行为控制精细化**: 社区对 Agent 的控制欲增强，从单纯的 Bug 修复转向对 **自动重试** 机制的扩展（如允许外部插件介入决策）和 **上下文管理**（如 `/clear` 命令）的精细化需求。
*   **性能与成本优化**: `prompt cache warming` 的 PR 反映了社区对 AI Token 成本的高度关注。优化长会话中的 Prompt 重复构建是提升性价比的关键。
*   **多模态支持呼声**: 尽管 Video/Audio 附件支持被关闭，但持续的讨论表明这是用户未来的核心需求。

---

## 6. 开发者关注点

*   **终端兼容性**: 多个 Issue 报告了 **mintty** (Cygwin/MSYS2) 环境下的按键映射问题，开发者在非标准终端下的体验仍有待提升。
*   **错误诊断透明度**: 开发者非常关注错误信息的完整性，特别是 `native_finish_reason` 和 OAuth Token 的传递，认为这些信息对于调试至关重要。
*   **Monorepo 与插件系统**: 对于 `pi install git:` 支持子路径的需求，以及扩展对 Agent 重试流程的 Hook，体现了开发者希望构建更灵活、模块化的开发环境的愿望。
*   **用户体验微调**: 如 `shift+enter` 换行、`/clear` 命令的保留设置等，这些看似微小的 UI/UX 优化能显著提升日常使用效率。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 (2026-11-09)

## 1. 今日速览
今日 Qwen Code 社区发布了 **v0.27.0** 桌面版及 **SDK v0.1.30**，重点优化了 MCP 连接稳定性、Web Shell 交互体验及桌面端持久化能力。同时，CI 系统在 E2E 测试和依赖安全审计方面面临持续挑战，社区正集中精力解决这些基础设施问题。

## 2. 版本发布

### **v0.27.0 (Desktop)**
*   **更新摘要**: 本版本主要修复了 GitHub 频道在特定时间点的评论遗漏问题，并优化了核心测试稳定性。
*   **关键修复**: 修复了 CI 测试中 `GitHub inbound recovery` 在失败读取后的状态保持问题，确保频道恢复机制可靠。
*   **链接**: [GitHub Release](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.27.0)

### **SDK TypeScript v0.1.30**
*   **更新摘要**: 捆绑 CLI 版本升级至 **0.27.0**。
*   **说明**: SDK 内置的命令行工具已同步更新至最新版本。
*   **链接**: [SDK Release](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.30)

### **v0.26.9-nightly.20261107**
*   **更新摘要**: 每日构建版本，包含文档更新及核心 Bug 修复。

## 3. 社区热点 Issues

本次统计中，CI 相关的阻塞问题依然占据主导地位，特别是 E2E 测试和依赖审计的失败。

1.  **#14724 - Main CI failed: Managed Agent gate — no test identified** (277 👍)
    *   **重要性**: 🔴 **严重**。这是目前社区最活跃的 Bug，CI 流水线在测试开始前就报错，导致大量代码提交无法自动验证，严重阻碍开发进度。
    *   **状态**: Open (Autofix/Skip)。

2.  **#13078 - Daily dependency CVE audit failed** (45 👍)
    *   **重要性**: 🔴 **严重**。依赖项中发现高危漏洞，这是生产环境安全的关键风险，必须立即处理。
    *   **状态**: Open (Needs Triage)。

3.  **#11680 - Main CI failed: E2E Tests — no test identified** (12 👍)
    *   **重要性**: 🟠 **高**。端到端测试同样出现测试未识别的致命错误，影响自动化测试流程。
    *   **状态**: Open (Autofix/In-Progress)。

4.  **#16417 - Reject an oversized write_file before generating it** (6 👍)
    *   **重要性**: 🟡 **中高**。用户反馈在处理大文件写入时，系统会先生成完整内容再因 Token 限制拒绝，导致用户工作丢失。
    *   **状态**: Enhancement (Core Scope)。

5.  **#16227 - GitHub channel can silently skip a comment at exact boundary** (5 👍) [CLOSED]
    *   **重要性**: 🟠 **高**。GitHub 频道机器人存在时序 Bug，可能永久错过特定时间点的用户评论，影响协作体验。
    *   **状态**: Closed (Fixed by @wenshao)。

6.  **#15276 - Windows desktop update fails with "Error opening file"** (5 👍) [CLOSED]
    *   **重要性**: 🟠 **高**。Windows 用户在更新桌面客户端时，因 Node 运行时文件被锁定而无法更新，影响用户体验。
    *   **状态**: Closed (Ready for Human)。

7.  **#16683 - Qwen Code Desktop 0.27 fails on Intel x64 Mac** (2 👍)
    *   **重要性**: 🟡 **中**。新版本在 Intel Mac 上出现 Native Crash (Fatal error: Check failed: 12)，属于严重的兼容性问题。
    *   **状态**: Open (Needs Info)。

8.  **#8544 - [ACP] Task list not rendered in JetBrains** (2 👍)
    *   **重要性**: 🟡 **中**。JetBrains IDE 集成中任务列表无法显示，对比 Claude Code 存在功能缺失。
    *   **状态**: Open (Bug)。

9.  **#12160 - MCP tools stay disconnected after turn aborted** (2 👍)
    *   **重要性**: 🟡 **中**。MCP (Model Context Protocol) 工具调用被中断后，连接无法自动修复，导致后续会话失败。
    *   **状态**: Open (Bug)。

10. **#16675 - Render Exec tool calls as JavaScript instead of JSON** (3 👍)
    *   **重要性**: 🟡 **中**。UI 渲染优化请求，希望代码块渲染更符合 JS 语法高亮，提升可读性。
    *   **状态**: Feature Request (UI Scope)。

## 4. 重要 PR 进展

1.  **#16581 - fix(web-shell): keep the turn's real answer when a background ack follows** (2SinceJuly)
    *   **内容**: 修复 Web Shell 中，当后台任务完成时，不应覆盖当前轮次的用户可见答案。
    *   **链接**: [#16581](https://github.com/QwenLM/qwen-code/pull/16581)

2.  **#16511 - fix(core): settle background shell status files left running by a dead CLI** (Sumire-no-kai)
    *   **内容**: 当 CLI 进程意外终止时，清理遗留的后台 Shell 状态文件，防止状态不一致。
    *   **链接**: [#16511](https://github.com/QwenLM/qwen-code/pull/16511)

3.  **#16661 - fix(mcp): repair the MCP connection torn down by an aborted tool call** (2SinceJuly)
    *   **内容**: 修复工具调用被中止时，MCP 连接未被正确修复的问题，确保会话后续可用。
    *   **链接**: [#16661](https://github.com/QwenLM/qwen-code/pull/16661)

4.  **#16500 - feat(managed-agent): add archive and MCP self-service installation** (doudouOUC)
    *   **内容**: 为 Managed Agent 引入归档功能和 MCP 的自助安装流程，支持 Daemon-free 的 ZIP/Tar.gz 部署。
    *   **链接**: [#16500](https://github.com/QwenLM/qwen-code/pull/16500)

5.  **#16679 - fix(acp): surface failed todo_write calls instead of dropping them** (2SinceJuly)
    *   **内容**: 修复 ACP 客户端中任务列表写入失败时静默丢弃的问题，现在会返回明确的失败状态。
    *   **链接**: [#16679](https://github.com/QwenLM/qwen-code/pull/16679)

6.  **#16682 - fix(channels): name the failing dws subcommand in DwsCommandError** (2SinceJuly)
    *   **内容**: 改进 DWS (Data Workspaces) 频道错误日志，明确指出具体失败的子命令，方便调试。
    *   **链接**: [#16682](https://github.com/QwenLM/qwen-code/pull/16682)

7.  **#16681 - feat(web-shell): commit only the selected files from the commit view** (2SinceJuly)
    *   **内容**: Web Shell 的提交视图现在支持选择性提交，允许用户勾选部分未暂存的文件进行提交。
    *   **链接**: [#16681](https://github.com/QwenLM/qwen-code/pull/16681)

8.  **#16439 - fix(core): replay the persisted startup prelude on resume** (MikeWang0316tw)
    *   **内容**: 恢复会话时，重播原始的启动序言，而不是根据当前环境重新构建，保证一致性。
    *   **链接**: [#16439](https://github.com/QwenLM/qwen-code/pull/16439)

9.  **#16488 - feat(managed-agent): add opt-in personal memory backed by Mem0** (doudouOUC)
    *   **内容**: 为 Managed Agent 添加可选的 Mem0 个人记忆存储功能，支持跨会话的记忆持久化。
    *   **链接**: [#16488](https://github.com/QwenLM/qwen-code/pull/16488)

10. **#11854 - feat: add hybrid code mode** (DragonnZhang)
    *   **内容**: 引入混合代码模式，允许普通工具与隔离的 JavaScript `exec` 工具共存。
    *   **链接**: [#11854](https://github.com/QwenLM/qwen-code/pull/11854)

## 5. 功能需求趋势

从 Issues 和 PR 的分析来看，社区关注点主要集中在以下三个方向：

1.  **AI Agent 生态与连接稳定性**:
    *   **趋势**: 社区对 MCP (Model Context Protocol) 的支持力度加大，PR 数量显著增加。
    *   **痛点**: 频繁出现连接中断、工具调用失败后无法自动恢复的问题，开发者急需更健壮的连接管理机制。

2.  **跨平台与 IDE 集成体验**:
    *   **趋势**: 专注于桌面端（Windows/Mac）的兼容性修复以及 JetBrains IDE 集成。
    *   **痛点**: Windows 更新失败、Mac Intel 架构崩溃、IDE 内任务列表渲染缺失，这些直接影响开发者对工具的信任度。

3.  **交互与输出优化**:
    *   **趋势**: 优化流式输出体验、错误信息可读性以及 Web Shell 的操作便捷性。
    *   **痛点**: 大文件写入时的 Token 超限处理、后台任务干扰主任务回复、日志信息不明确。

## 6. 开发者关注点

1.  **CI 流水线可靠性**: 开发者反馈“Main CI failed: no test identified”问题已持续数周，严重阻碍代码提交和合并，是当前最高优先级的阻塞点。
2.  **Windows 兼容性**: Windows 平台（特别是 Git Bash 和桌面端更新）仍是高频报错区域，涉及文件系统路径处理和进程锁定问题。
3.  **大模型输出控制**: 关于 Token 预算和文件写入策略的讨论增多，开发者希望在生成超大内容前进行拦截，而不是生成后丢弃。
4.  **MCP 工具管理**: 随着 MCP 生态发展，工具调用的生命周期管理（特别是中断和重连）成为核心难点。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek‑TUI 社区动态日报（2026‑11‑09）**  

---

## 1. 今日速览  
- 本日社区活跃度保持，5 条新 Issue 均在过去 24 小时内得到更新，其中两条已进入 **awaiting‑release** 状态，显示即将随下个版本修复。  
- 2 条 Pull Request 正在评审，其中一条（#7251）引入可选的模型 HTTP 主机策略，另一条（#7230）已在本日关闭，完成对“任务等待暂停计时”的功能增强。

---

## 2. 版本发布  
> 本日暂无新 Release。  

---

## 3. 社区热点 Issues  

| 编号 | 标题（关键字） | 重要性说明 | 当前状态 / 社区反馈 | 链接 |
|------|----------------|------------|--------------------|------|
| **#2323** | *未适配中文输入法*（bug、windows、v0.10.3） | 中文用户在使用拼音输入时会出现提示消失、字符误写等关键交互问题，直接影响国内用户体验。 | **awaiting‑release**，已有 5 条评论，讨论集中在 UI 隐藏提示与输入法兼容实现方案。 | <https://github.com/codewhale-hq/Codewhale/issues/2323> |
| **#7221** | *clean clipboard‑images*（enhancement、v0.10.3） | 剪贴板图片管理不当会导致会话间资源混乱，提议加入图片分组与清理指令，提升工作空间整洁度。 | **awaiting‑release**，3 条评论，社区认同度高（👍0）。 | <https://github.com/codewhale-hq/Codewhale/issues/7221> |
| **#7252** | *Anthropic provider: 400 on tools.N.custom.name*（tui、mcp、macos） | 使用 Anthropic 模型时，动态添加 `web.run` 工具导致所有后续请求返回 400，阻塞工作流。 | **OPEN**, 0 评论，问题影响跨平台（macOS）用户的工具调用可靠性。 | <https://github.com/codewhale-hq/Codewhale/issues/7252> |
| **#7250** | *proposal(workflow): verified candidate evaluation*（core） | 提议在实验搜索工作流中加入运行时验证的候选评估，以提升搜索结果的可信度，属于核心功能扩展。 | **OPEN**, 0 评论，仍在概念阶段，后续可能演化为正式特性。 | <https://github.com/codewhale-hq/Codewhale/issues/7250> |
| **#7232** | *Remove stale sub‑agent coordination flock*（bug、tui、macos、v0.10.3） | 旧会话残留的子代理锁导致新会话只读并重复报错，严重破坏多会话协作。 | **awaiting‑release**, 0 评论，已关联多个已关闭的相关 Issue（#7042、#5036）。 | <https://github.com/codewhale-hq/Codewhale/issues/7232> |

> **备注**：本日仅有 5 条 Issue，已全部列出并按影响度排序。

---

## 4. 重要 PR 进展  

| 编号 | 标题 | 功能/修复要点 | 影响范围 | 链接 |
|------|------|--------------|----------|------|
| **#7251** | *feat(transport): allow an optional host policy on model HTTP clients* | 为模型 HTTP 客户端加入可选的 `ModelHttpPolicy`，实现内存层面的请求拦截与错误前置检查。 | 所有使用网络模型的插件与工具链，提升安全性与可定制性。 | <https://github.com/codewhale-hq/Codewhale/pull/7251> |
| **#7230** *(已关闭)* | *feat(tasks): pause the task wall clock for answerable human waits* | 将人类等待（如审批、确认）从任务预算中剔除，使模型预算更精准；同时暂停任务看门狗。 | 运行时 API 与任务调度系统，改善长交互场景的资源计量。 | <https://github.com/codewhale-hq/Codewhale/pull/7230> |

> **备注**：当前仅有 2 条 PR 在最近 24 小时内活跃，已全部呈现。

---

## 5. 功能需求趋势  

从本日 Issues（全部 5 条）可以归纳出以下社区关注热点：

1. **本地化与输入法兼容** – Windows 中文输入法导致的交互缺陷（#2323）是首要需求。  
2. **资源清理与会话隔离** – 剪贴板图片管理（#7221）及子代理锁清理（#7232）显示用户对工作空间的“干净”状态有强烈期待。  
3. **跨模型/供应商兼容** – Anthropic 工具调用错误（#7252）表明不同模型提供者的兼容层仍需完善。  
4. **工作流可验证性** – 对搜索/候选评估的运行时验证（#7250）体现了对结果可信度的提升需求。  
5. **网络请求安全/可配置** – PR #7251 引入的 host policy 进一步呼应了对模型请求安全的关注。

总体来看，**本地化、会话资源管理、跨模型稳定性** 是本阶段最突出的大方向。

---

## 6. 开发者关注点  

- **输入法兼容性**：中文（以及其他语言）输入法导致 UI/模型输入异常，是阻碍国内用户采用的关键痛点。  
- **会话残留导致的锁/只读状态**：旧子代理未清理会直接影响新会话的可写性，需在底层实现自动回收。  
- **工具链安全与可定制**：开发者希望在模型 HTTP 通信层加入策略/拦截，以防止意外请求泄漏或错误。  
- **剪贴板/媒体资源管理**：在多会话环境下，图片等二进制资源的组织与清理需求日益增长。  
- **跨供应商兼容**：不同模型提供者的 API 差异导致的运行时错误，需要统一的适配层或更好的错误恢复机制。

---

> **结语**：虽然本日发布节奏相对平稳，但关键的中文输入法适配与子代理锁清理等问题已经进入 **awaiting‑release** 阶段，预计将在近期的 v0.10.4（或后续）中得到解决。开发者可关注对应 Issue 与 PR，以便第一时间获取更新。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*