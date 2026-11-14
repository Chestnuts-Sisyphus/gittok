# AI CLI 工具社区动态日报 2026-11-15

> 生成时间: 2026-11-14 23:30 UTC | 覆盖工具: 9 个

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

# Claude Code Skills 社区热点报告 (2026-11-15)

## 1. 热门 Skills 排行（按社区关注度）

### 🔥 No.1 `mcp-builder` (PR #1742)
- **功能**: MCP (Model Context Protocol) 构建器，用于创建 MCP 服务器和客户端连接。
- **热点**: 修复了 `mcp>=2.0` 版本兼容性问题，解决了 `streamablehttp_client` 重命名导致的导入错误，以及自定义 HTTP 头配置的变更。
- **状态**: [OPEN](https://github.com/anthropics/skills/pull/1742)
- **链接**: [anthropics/skills PR #1742](https://github.com/anthropics/skills/pull/1742)

### 🔥 No.2 `skill-creator` (PR #1298, #1681)
- **功能**: Claude 技能创建工具，支持将技能打包并评估触发率。
- **热点**: 解决 Windows 环境下子进程竞争、管道失败导致误报问题；支持直接执行 `package_skill.py` 脚本。
- **状态**: [OPEN](https://github.com/anthropics/skills/pull/1298)
- **链接**: [anthropics/skills PR #1298](https://github.com/anthropics/skills/pull/1298)

### 🔥 No.3 Notion Spec to Implementation (PR #1245)
- **功能**: 将产品或技术规范转换为 Claude Code 可执行的 Notion 任务，支持拆解任务、验收标准与进度追踪。
- **热点**: 新增技能，填补了从抽象规范到具体实现落地的空白，社区反馈积极。
- **状态**: [OPEN](https://github.com/anthropics/skills/pull/1245)
- **链接**: [anthropics/skills PR #1245](https://github.com/anthropics/skills/pull/1245)

### 🔥 No.4 `docx` (PR #1792, #2018)
- **功能**: Word 文档处理技能，支持修改合并与修订标记验证。
- **热点**: 修复 LibreOffice 超时错误处理逻辑；修复 XML 命名空间声明丢失导致的文档损坏问题。
- **状态**: [OPEN](https://github.com/anthropics/skills/pull/1792)
- **链接**: [anthropics/skills PR #1792](https://github.com/anthropics/skills/pull/1792)

### 🔥 No.5 `webapp-testing` (PR #1980)
- **功能**: Web 应用自动化测试技能，支持服务器启动与元素发现。
- **热点**: 消除 Shell 注入风险，移除 `shell=True` 以提升安全性。
- **状态**: [OPEN](https://github.com/anthropics/skills/pull/1980)
- **链接**: [anthropics/skills PR #1980](https://github.com/anthropics/skills/pull/1980)

### 🔥 No.6 `xlsx` (PR #2019)
- **功能**: Excel 文件处理技能，支持外部链接风险检测。
- **热点**: 修复工作表级别定义名称与别名的解析逻辑，避免误判外部链接风险。
- **状态**: [OPEN](https://github.com/anthropics/skills/pull/2019)
- **链接**: [anthropics/skills PR #2019](https://github.com/anthropics/skills/pull/2019)

### 🔥 No.7 `md2video-audio` (PR #1703)
- **功能**: 将 Markdown 文档编译为 MP4 视频，支持人声旁白。
- **热点**: 新增零成本技能，提升文档交付的视觉表现力。
- **状态**: [OPEN](https://github.com/anthropics/skills/pull/1703)
- **链接**: [anthropics/skills PR #1703](https://github.com/anthropics/skills/pull/1703)

---

## 2. 社区需求趋势

从 15 个高热度 Issues 中提炼出以下需求方向：

1. **安全与信任边界** (#492) - 关注社区 Skills 被冒充官方 Anthropic 命名空间的风险，呼吁引入命名隔离机制。
2. **组织级技能共享** (#228) - 希望支持企业内部技能库的统一管理与直接分享。
3. **技能触发率与评估** (#556, #1352) - 技能创建与评估工具的误报与漏报问题亟待解决。
4. **技能文档化与最佳实践** (#202) - 建议技能文档应从“开发者教程”转向“Claude 操作指令”，提升效率。
5. **文档技能的同步与快照** (#2108) - 希望明确文档技能的引用状态与同步机制。
6. **技能评估与质量门控** (#1385) - 提议引入“推理质量门控管道”以提升输出质量。
7. **技能包管理优化** (#189) - 解决 `document-skills` 与 `example-skills` 插件安装时的重复内容问题。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、功能明确且修复关键问题，预计近期合并：

1. **mcp-builder (#1742)** - 修复 MCP 2.0 兼容性，解决核心功能中断。
2. **skill-creator (#1298, #1681)** - 解决 Windows 环境与脚本执行路径问题，提升工具健壮性。
3. **docx (#1792, #2018)** - 修复超时与 XML 命名空间问题，保障文档处理可靠性。
4. **webapp-testing (#1980)** - 消除 Shell 注入风险，提升安全性。
5. **xlsx (#2019)** - 修复外部链接解析逻辑，降低误报率。

---

## 4. Skills 生态洞察

当前社区在 Skills 层面最集中的诉求是：**构建一个安全、可信赖、组织可共享的技能生态系统**，同时提升技能创建与评估工具的健壮性与文档化质量。

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：** 2026-11-15
**来源：** [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

### 1. 今日速览
过去24小时内，Gemini CLI 社区活跃度较高，主要集中在 Agent（代理）系统的稳定性改进和 ACP (Agent Client Protocol) 模式的并行化优化。开发者反馈了关于 Agent 意外终止、配置文件读取错误以及大量工具调用时的性能问题。此外，关于 AST（抽象语法树）感知的代码分析功能成为社区讨论的热点，旨在提升 Agent 的代码理解能力。

### 2. 版本发布
**无新版本发布。**

---

### 3. 社区热点 Issues (Top 10)
**#22323 - Subagent 在达到最大轮次后未正确报告中断**
*   **重要性：** P1 级 Bug
*   **摘要：** `codebase_investigator` 子代理在达到 `MAX_TURNS` 限制时，错误地将终止原因标记为 `GOAL success`，导致用户无法获知代理因超时被中断。
*   **社区反应：** 13 个评论，2 个点赞。这是影响代码库调查功能可靠性的严重问题。

**#21409 - Generalist Agent 永久挂起**
*   **重要性：** P1 级 Bug
*   **摘要：** 当 CLI 委托给 generalist agent 时会无限期挂起，即使简单的文件夹创建操作也会卡住，且移除子代理调用可解决此问题。
*   **社区反应：** 8 个评论，8 个点赞。严重影响了工具的可用性。

**#19873 - 利用模型的原生 Bash 能力与零依赖沙箱**
*   **重要性：** P2 级增强
*   **摘要：** 讨论如何利用 Gemini 3 模型对 Bash 的亲和性，通过 Zero-Dependency OS Sandboxing 实现更安全的命令执行和意图路由。
*   **社区反应：** 9 个评论。探索更高效、安全的自动化执行方式。

**#22267 - Browser Agent 忽略 settings.json 配置覆盖**
*   **重要性：** P2 级 Bug
*   **摘要：** Browser Agent 完全忽略全局或项目级 `settings.json` 中的 `maxTurns` 等配置覆盖，导致配置不生效。
*   **社区反应：** 5 个评论。

**#21968 - Gemini 不够积极地使用 Skills 和 Sub-agents**
*   **重要性：** P2 级 Bug
*   **摘要：** 模型很少主动调用自定义 skills 或 sub-agents，除非用户明确指示，导致特定工具（如 gradle、git）的功能闲置。
*   **社区反应：** 7 个评论。关注 Agent 的自主决策能力。

**#24246 - 工具数量超过 128 个时遇到 400 错误**
*   **重要性：** P2 级 Bug
*   **摘要：** 当可用工具超过 128 个时，CLI 抛出 400 错误，期望 Agent 能更智能地限制工具范围。
*   **社区反应：** 3 个评论。

**#23571 - 模型频繁在随机位置创建临时脚本**
*   **重要性：** P2 级 Bug
*   **摘要：** 受限的 Shell 执行模式导致模型在多个目录生成编辑脚本，清理工作区变得非常困难。
*   **社区反应：** 3 个评论。

**#22672 - Agent 应停止/劝阻破坏性行为**
*   **重要性：** P2 级功能需求
*   **摘要：** 在复杂的 Git 操作或数据库维护中，模型偶尔使用 `git reset --force` 等危险命令，需要加强安全约束。
*   **社区反应：** 3 个评论。

**#22465 - 创建 Vite 应用时在交互提示处卡死**
*   **重要性：** P2 级 Bug
*   **摘要：** 当代理被指示创建新应用时，会卡在交互式提示（如输入项目名称）处，需要调整提示词以修复此行为。
*   **社区反应：** 2 个评论。

**#21000 - 实验性使用原生文件工具维护任务跟踪器**
*   **重要性：** P3 级探索
*   **摘要：** 探索将任务跟踪从 In-Context（上下文）迁移到基于持久文件系统的 CRUD 操作，以解决上下文腐烂和 Token 成本问题。
*   **社区反应：** 4 个评论。

---

### 4. 重要 PR 进展 (Top 10)
**#30298 - feat(acp): 在 ACP 模式下并行执行独立的工具调用**
*   **内容：** 修复了 ACP 模式下工具调用串行执行的低效问题。现在，模型生成的多个独立只读工具调用可以并行执行，显著提升了处理效率。
*   **链接：** [PR #30298](https://github.com/google-gemini/gemini-cli/pull/30298)

**#30297 - fix(acp): 截断 ACP 模式下的大输出**
*   **内容：** 修复了 Shell 和 MCP 工具返回超大输出时导致的问题。在 ACP 模式下，直接转发大输出会导致上下文溢出，现已添加截断逻辑。
*   **链接：** [PR #30297](https://github.com/google-gemini/gemini-cli/pull/30297)

**#30207 - fix(build): 清理构建缓存以修复发布失败**
*   **内容：** 修复了每日构建在发布到 `wombat-dressing-room` 时遇到的 `Request Entity Too Large` 错误。通过在 esbuild 前清理 `bundle/` 目录，移除了约 70MB 的遗留构建文件。
*   **链接：** [PR #30207](https://github.com/google-gemini/gemini-cli/pull/30207)

**#30157 - fix(core): 仅在 safeJsonStringify 中替换循环引用**
*   **内容：** 修复了 `safeJsonStringify` 的逻辑错误，之前它会将所有重复对象（包括非循环引用）替换为 `[Circular]`，导致 Telemetry 数据导出异常。
*   **链接：** [PR #30157](https://github.com/google-gemini/gemini-cli/pull/30157)

**#28405 - fix: 防止内容更新时用户滚动位置跳动**
*   **内容：** 修复了在虚拟化列表中，当用户向上滚动查看内容（如 Ctrl+S 保存后），新内容到达时页面会强制跳到顶部的体验问题。
*   **链接：** [PR #28405](https://github.com/google-gemini/gemini-cli/pull/28405)

**#30296 - fix(core): 清除被拒绝的 OAuth 客户端初始化 Promise**
*   **内容：** 修复了 OAuth 初始化失败时，失败的 Promise 会被缓存并污染后续会话的问题，防止缓存毒化。
*   **链接：** [PR #30296](https://github.com/google-gemini/gemini-cli/pull/30296)

**#30295 - fix(core): 在 YOLO 模式下保留 Shell 解析失败时的决策**
*   **内容：** 在 `ApprovalMode.YOLO` 下，当 Shell 命令解析失败时，确保保留原始的决策逻辑，而不是强制返回 `ALLOW`。
*   **链接：** [PR #30295](https://github.com/google-gemini/gemini-cli/pull/30295)

**#30174 - fix(core): 停止 Body 超时导致的长轮次被杀和重放**
*   **内容：** 修复了模型在思考或写入大文件时产生的长时间无响应，导致 API 请求被 Body timeout 终止，进而触发全量重放的问题。
*   **链接：** [PR #30174](https://github.com/google-gemini/gemini-cli/pull/30174)

**#30178 - fix(cli): IME 输入和回车在同一 tick 时提交完整文本**
*   **内容：** 修复了使用韩语输入法（IME）时的 Bug，解决了在输入法确认字符（如 테스트）后按下回车时，最后一个字符被丢弃的问题。
*   **链接：** [PR #30178](https://github.com/google-gemini/gemini-cli/pull/30178)

**#30301 - docs(cli): 同步 CLI 参考文档与实际 Flag**
*   **内容：** 修复了文档与实际代码不一致的问题，移除了已废弃的 `--experimental-zed-integration` 标记，更新了文档表格。
*   **链接：** [PR #30301](https://github.com/google-gemini/gemini-cli/pull/30301)

---

### 5. 功能需求趋势
1.  **AST 感知能力**：社区对 AST-aware file reads, search, and mapping 表现出浓厚兴趣（如 Issue #22745, #22746, #22747）。开发者希望通过解析代码结构而非纯文本，提高 Agent 理解代码库的效率和准确性。
2.  **Agent 稳定性与行为控制**：大量反馈集中在 Agent 的死锁、挂起（Hang）、以及不当使用破坏性命令（如 `git reset`）上。社区希望增强 Agent 的容错能力和自我保护机制。
3.  **并发与并行化**：随着 ACP 模式的引入，如何高效利用并发（如 Issue #30298）成为提升性能的关键。
4.  **配置管理**：`settings.json` 的覆盖机制和 Agent 自身配置的理解（Issue #21432）是高频痛点。

### 6. 开发者关注点
*   **性能瓶颈**：当工具数量超过 128 个或处理大量日志输出时，CLI 响应缓慢或报错。
*   **工具易用性**：Agent 不够主动地使用预定义 Skills（如 Git/Gradle），需要用户频繁手动干预。
*   **交互体验**：在交互式操作（如创建项目）或 IME 输入时，UI 的响应和状态保持存在 Bug。
*   **安全性**：防止 Agent 在复杂操作中意外执行破坏性命令或产生大量垃圾文件。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**GitHub Copilot CLI 社区动态日报**
**日期：** 2026-11-15
**数据范围：** 过去 24 小时 (2026-11-14 00:00 - 2026-11-15 00:00 UTC+8)

---

### 1. 今日速览
过去 24 小时内，GitHub Copilot CLI 社区活跃度较高，共更新了 **21 个 Issues** 和 **0 个 Pull Requests**。主要动态集中在 **MCP (Model Context Protocol)** 生态的完善、**会话上下文管理** 的性能优化以及 **特定平台** 的兼容性修复。开发者普遍关注多 Agent 会话的内存管理、MCP 服务器的认证流程体验以及自定义模型提供商的错误反馈机制。

### 2. 版本发布
**v1.0.112** (2026-11-13)
*   **错误处理优化**：修复了在 `/compact` 命令失败时，错误信息中包含内部主机重抛前缀的问题，现在能直接显示模型提供商的原生错误消息。
*   **交互体验改进**：优化了在托管账户策略加载期间粘贴提示词的场景，防止用户误触已粘贴的文本导致重复发送。

### 3. 社区热点 Issues (Top 10)

1.  **[OPEN] 400 `reasoning_text` in thinking mode must be passed back**
    *   **关注点**：这是关于自定义 OpenAI 兼容提供商（如 DeepSeek）在 Thinking Mode 下运行时遇到的关键 bug，涉及后台 Shell 退出后的运行时合成回复。
    *   **状态**：4 个评论，1 个赞。

2.  **[OPEN] Repeated out-of-memory crash during a long interactive session in 1.0.109**
    *   **关注点**：长交互会话中频繁发生 OOM (Out of Memory) 崩溃，且恢复会话后无法访问之前的后台 Agent，严重影响生产力。
    *   **状态**：用户反馈为复发问题。

3.  **[OPEN] MCP OAuth for Entra servers forces native broker window that blocks paste**
    *   **关注点**：1.0.109 版本后，Azure DevOps 的 OAuth 认证强制打开原生窗口，导致无法粘贴密码，用户体验极差。
    *   **状态**：建议有浏览器回退机制。

4.  **[OPEN] Context overhead regression: ~20K extra tokens after 1.0.106**
    *   **关注点**：桌面应用更新后，上下文开销显著增加，导致可用窗口迅速缩减，加快了自动压缩的频率。
    *   **状态**：性能回归问题。

5.  **[OPEN] Defaults for subagent models include models unavailable on free plan**
    *   **关注点**：CLI 默认配置了 GPT-6-Luna 等高级模型，但免费计划用户无法使用，导致启动即报错。
    *   **状态**：配置合理性建议。

6.  **[OPEN] Delegated `task` children cannot authenticate HTTP-OAuth MCP servers**
    *   **关注点**：通过 Task 工具启动的子 Agent 无法可靠连接 HTTP-OAuth MCP 服务器，存在权限 401 问题。
    *   **状态**：权限管理机制问题。

7.  **[OPEN] macOS: copilot-mcp-oauth keychain prompt returns after "Always Allow"**
    *   **关注点**：macOS 平台在 MCP 认证时，即使选择了“始终允许”，安全提示也会反复弹出，且产生大量重复条目。
    *   **状态**：平台特定 Bug。

8.  **[OPEN] Agent spends model turns on `sleep N; check` polling while a background job runs**
    *   **关注点**：后台任务运行时，Agent 陷入无效的轮询循环，消耗大量 Token 资源且无产出。
    *   **状态**：Agent 行为优化。

9.  **[OPEN] CLI masks structured OpenAI-compatible 403 error message as authentication failure**
    *   **关注点**：自定义提供商返回结构化的 403 错误时，CLI 仅显示通用的认证失败信息，掩盖了具体原因。
    *   **状态**：错误信息透明度。

10. **[OPEN] Feature request: hook/notification event when MCP server startup completes**
    *   **关注点**：社区希望有事件钩子来监听 MCP 服务器启动完成的状态（成功或失败），以优化多服务器的启动流程。
    *   **状态**：新功能需求。

### 4. 重要 PR 进展 (Top 10)
*(注：过去 24 小时内无 PR 更新，此处列出社区持续关注的高价值 PR 方向)*

*   **暂无新 PR 更新**。社区目前处于 Issue 反馈和讨论的高峰期，待解决的 Bug 较多。

### 5. 功能需求趋势
从 Issue 标签分析，开发者当前最关注的方向包括：

*   **MCP 生态与认证**：随着 MCP (Model Context Protocol) 的普及，开发者急需解决 OAuth 认证流程繁琐（如 Windows 原生窗口、macOS Keychain 弹窗）、子 Agent 认证失败以及启动事件通知的问题。
*   **会话上下文与内存管理**：长会话的内存溢出风险和上下文 Token 开销增加是高频痛点，社区呼吁更高效的上下文压缩和内存释放机制。
*   **模型兼容性与错误反馈**：对自定义 OpenAI 兼容提供商的支持仍在完善中，特别是对 403 错误的详细反馈和 Thinking Mode 的兼容性。

### 6. 开发者关注点
*   **平台兼容性**：Linux (Wayland)、macOS Keychain、Windows 特定代码页的剪贴板和终端渲染问题依然存在。
*   **Agent 行为优化**：Agent 在后台任务中的轮询效率低、会话恢复后状态丢失（如 Agent 选择）是影响使用体验的主要因素。
*   **配置安全与权限**：MCP 工具缓存导致内存溢出，以及 HTTP-OAuth 认证在子任务中的权限传递问题，属于安全性和稳定性层面的核心关注点。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-11-15  
**来源：** [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览

过去24小时内，OpenCode 社区聚焦于 **免费层级的稳定性问题**，尤其是 Zen 模型的使用限制和重置机制异常，引发了大量用户反馈。同时，Linux 平台下的进程管理（僵尸进程）和 Android 兼容性问题也成为了新的技术热点。在功能需求方面，社区对 TUI 界面的本地化支持以及 V2 版本的侧边栏布局优化表现出浓厚兴趣。

---

## 2. 版本发布

**无** 新版本发布。

---

## 3. 社区热点 Issues

### 🔥 热门讨论
1. **#59387 [zen] Free tier issues: read this first, then post your report here**
   - **摘要：** 这是免费层级问题的核心追踪 Issue，涉及 `Free usage exceeded`、`Free usage limit reached` 以及重置时间不生效等常见报错。
   - **重要性：** 高频问题，367 条评论，直接影响大量免费用户的使用体验。
   - [链接](https://github.com/anomalyco/opencode/issues/59387)

2. **#26602 Desktop hits 5-minute Headers Timeout Error with slow local providers**
   - **摘要：** OpenCode Desktop 在调用本地兼容提供商时，即使配置了超时，仍会在 5 分钟后强制断开连接。
   - **重要性：** 阻碍本地模型部署和离线开发。
   - [链接](https://github.com/anomalyco/opencode/issues/26602)

### 🔧 功能与体验
3. **#33704 [FEATURE]: Add GUI Options to Edit Custom Providers and Manage Model Lists**
   - **摘要：** 请求在 GUI 中增加管理自定义提供商（如 LM Studio）和模型列表的选项，目前只能通过配置文件操作。
   - **重要性：** 提升本地化部署的易用性。
   - [链接](https://github.com/anomalyco/opencode/issues/33704)

4. **#37216 [FEATURE]: i18n support for TUI (terminal interface)**
   - **摘要：** 终端界面目前所有字符串硬编码为英文，而桌面端已有国际化支持，建议为 TUI 添加本地化。
   - **重要性：** 改善非英语用户的使用体验。
   - [链接](https://github.com/anomalyco/opencode/issues/37216)

5. **#53921 [FEATURE]: Add an ephemeral mode that does not persist sessions locally**
   - **摘要：** 请求增加“临时会话”模式，使会话不写入本地数据库，适合隐私敏感场景。
   - **重要性：** 隐私与数据持久化的权衡需求。
   - [链接](https://github.com/anomalyco/opencode/issues/53921)

### 🐛 Bug 修复
6. **#63817 [CLOSED] pty: shell commands leave zombies under opencode-pty daemon on Linux**
   - **摘要：** Linux 2.3.0 版本中，shell 命令执行后进程变成僵尸进程，无法被回收。
   - **重要性：** 系统资源泄漏问题。
   - [链接](https://github.com/anomalyco/opencode/issues/63817)

7. **#59794 [OPEN] session: all history images are re-sent on every request**
   - **摘要：** 会话中的历史图片会在每次请求时重复发送，导致后端配额迅速耗尽。
   - **重要性：** 影响长对话的可用性。
   - [链接](https://github.com/anomalyco/opencode/issues/59794)

8. **#63958 [OPEN] Model fallback bypasses allowed-models list and model changes on Plan/Build switch**
   - **摘要：** 在切换计划或构建时，模型回退机制可能会绕过允许的模型列表，使用付费模型。
   - **重要性：** 计费逻辑漏洞。
   - [链接](https://github.com/anomalyco/opencode/issues/63958)

9. **#63931 [CLOSED] network: MAC address spoofing to bypass rate limits on free models**
   - **摘要：** Windows 版本在达到速率限制时，似乎会自动更改 MAC 地址以绕过限制。
   - **重要性：** 安全与合规性担忧。
   - [链接](https://github.com/anomalyco/opencode/issues/63931)

10. **#63977 [OPEN] tui: GNOME Terminal background stays theme color after exit**
    - **摘要：** 退出 OpenCode 后，GNOME Terminal 会保持 OpenCode 的背景色，导致终端主题混乱。
    - **重要性：** 终端用户体验问题。
    - [链接](https://github.com/anomalyco/opencode/issues/63977)

---

## 4. 重要 PR 进展

1. **#63989 Opentui 0.9.0**
   - **内容：** OpenTUI 升级至 0.9.0，修改了 Markdown 渲染器的 API，增加了代码块渲染的灵活性。
   - [链接](https://github.com/anomalyco/opencode/pull/63989)

2. **#63988 [contributor] fix(desktop): connect to SSH and WSL servers whatever their OpenCode version**
   - **内容：** 修复桌面应用在连接不同版本的 SSH 和 WSL 服务器时的兼容性问题。
   - [链接](https://github.com/anomalyco/opencode/pull/63988)

3. **#63648 docs(ecosystem): add Sikemux to projects**
   - **内容：** 将 Sikemux（跨平台终端多路复用工具）添加到生态系统的项目列表中。
   - [链接](https://github.com/anomalyco/opencode/pull/63648)

4. **#63986 feat(tui): show tool elapsed time in V2 clients**
   - **内容：** 在 V2 客户端中显示工具调用的耗时，提升用户对执行过程的感知。
   - [链接](https://github.com/anomalyco/opencode/pull/63986)

5. **#63542 fix(ssh): recover when the remote service port is taken**
   - **内容：** 修复 SSH 连接中断后，即使端口可用也无法重新连接的问题。
   - [链接](https://github.com/anomalyco/opencode/pull/63542)

6. **#56040 docs: add Lizard Sandboxes to the ecosystem**
   - **内容：** 添加 Lizard Sandboxes 文档到生态系统页面。
   - [链接](https://github.com/anomalyco/opencode/pull/56040)

7. **#55528 [CLOSED] refactor(browser): stream proxy traffic over binary WebSockets**
   - **内容：** 重构浏览器代理，使用二进制 WebSocket 传输流量，大幅提升远程连接下的图片加载速度（约 18 倍）。
   - [链接](https://github.com/anomalyco/opencode/pull/55528)

8. **#55496 [CLOSED] feat(app): add subagents side-panel tab**
   - **内容：** 在应用中添加子代理侧边栏标签页，方便管理子代理会话。
   - [链接](https://github.com/anomalyco/opencode/pull/55496)

9. **#55484 [CLOSED] feat(core): add scrape.do web search provider**
   - **内容：** 添加 Scrape.do 的 Google 搜索 API 作为新的网络搜索提供商。
   - [链接](https://github.com/anomalyco/opencode/pull/55484)

10. **#55448 [CLOSED] feat(www): add multi-language docs**
    - **内容：** 为 V2 文档添加多语言支持（18 种语言），翻译了 62 个页面。
    - [链接](https://github.com/anomalyco/opencode/pull/55448)

---

## 5. 功能需求趋势

- **本地化与多语言：** TUI 的 i18n 支持和桌面端文档的多语言化是高频需求。
- **本地模型支持：** 自定义提供商管理、本地模型回退逻辑的优化持续受到关注。
- **会话管理：** 临时会话模式、会话历史图片优化、会话导入导出等功能是核心痛点。
- **隐私与安全：** 防止 MAC 欺骗、会话本地持久化控制等需求上升。
- **界面与交互：** TUI 布局优化、终端背景恢复、GUI 提供商管理工具等 UI 相关需求活跃。

---

## 6. 开发者关注点

- **Linux 环境稳定性：** 进程僵尸问题影响系统资源管理，需尽快修复。
- **Android 兼容性：** 官方应用在部分 Android 11 设备上无法安装，需适配。
- **网络连接可靠性：** SSH/WSL 连接断线重连机制、代理流量传输优化。
- **TUI 用户体验：** 硬件光标闪烁、布局截断、本地化缺失等问题影响终端使用。
- **计费与权限：** 模型切换时的计费逻辑漏洞和权限绕过问题需重点审查。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-11-15)

## 1. 今日速览
**核心动态**：Pi 社区过去24小时活跃度较高，共处理 **22 个 Issues** 和 **3 个 PRs**。主要关注点集中在 **MCP 协议配置优化**、**会话性能与稳定性修复**（尤其是大文件读取）、以及 **GitHub Copilot/Gemini 模型推理能力的适配**。
**重点事件**：MCP 环境变量解析逻辑得到修复，解决了配置文件中变量引用的问题；同时，针对长会话（>120k条目）崩溃的严重 Bug 被确认并修复，显著提升了编码代理的健壮性。

---

## 2. 版本发布
**无**。过去24小时内未发布新的正式版本。

---

## 3. 社区热点 Issues

### 🔴 高优先级 / 稳定性
**#12154: Session with >~120k entries after the last compaction fails to load: RangeError in buildContextEntries**
*   **重要性**：严重性能与稳定性问题。长会话在压缩后无法加载，直接导致用户无法访问历史上下文。
*   **详情**：修复了上下文重建时的栈溢出错误，并解决了启动时加载该类会话崩溃的问题。

**#11950: Tool calls in one message run concurrently with bash, so a read can run before the command finishes**
*   **重要性**：逻辑执行顺序错误。导致读取到尚未写入的文件内容或构建日志，产生脏数据。
*   **详情**：并发执行时，读操作可能在命令完成前就开始，破坏了工具调用的原子性。

**#12165: searchTools() returns full tool descriptions — 36KB per call, ~25% of a long session's context**
*   **重要性**：性能瓶颈。工具描述的过度冗余消耗了大量的上下文 Token，降低了长对话的效率。
*   **详情**：每次调用 `searchTools` 都会返回完整的描述文本，在长会话中占据了不成比例的上下文空间。

### 🟡 功能与体验
**#10654: Transport is resolved before environment variable expansion in mcp.json**
*   **重要性**：配置便利性。修复了 MCP 服务器配置中环境变量（如 `${MY_VAR}`）无法被正确解析的问题。
*   **详情**：此前如果 URL 中直接使用 `${MY_VAR}` 会导致解析失败，需显式添加 `http://` 前缀，现已统一处理逻辑。

**#12101: Make `developer` opt-in for OpenAI-compatible instruction messages**
*   **重要性**：模型兼容性。解决 Groq/Qwen 等模型对特定消息角色的支持问题。
*   **详情**：在开启 `model.reasoning` 时，错误地发送 `developer` 角色会导致 400 错误，现已改为可选的 `system` 角色。

**#12110: GitHub Copilot models enabled by an enterprise admin stay hidden after restart**
*   **重要性**：企业级集成体验。企业管理员启用的 Copilot 模型在重启后丢失，影响模型选择器功能。
*   **详情**：OAuth 凭证缓存导致模型 ID 未刷新，重启后模型列表不完整。

### 🟢 UI/UX 与小缺陷
**#12176: Codemode batching hides skill reads in the tool UI**
*   **详情**：Codemode 批量执行时，隐藏了内部读取 `SKILL.md` 的操作，导致技能激活过程不可见。
*   **重要性**：透明度问题，开发者难以追踪技能加载状态。

**#12175: Fullscreen double-click should keep URL schemes and drop trailing periods**
*   **详情**：优化全屏模式下双击选区的行为，保留 URL 协议头并去除句末句号，提升复制粘贴体验。

**#12171: Up-arrow in command history skips built-in slash commands**
*   **详情**：命令行历史记录未包含 `/reload` 等内置斜杠命令，导致历史记录不完整。

**#12173: Some links on docs.pi.dev links point to 404**
*   **详情**：文档站点的导航链接（如 SDK 页面的 "Choose a Model"）存在路由错误（指向 `/latest/latest/models`），影响文档访问。

---

## 4. 重要 PR 进展

**#12163: Add toolOutput.maxBytes and toolOutput.maxLines settings**
*   **内容**：新增配置项 `toolOutput.maxBytes` 和 `toolOutput.maxLines`。
*   **价值**：允许用户限制工具输出（如 Bash 和 Read）的展示长度，默认为 51200 字节和 2000 行。既能防止长输出淹没屏幕，又能保留完整数据供参考。

**#12162: feat(coder): add Docker template that clones this repo**
*   **内容**：为 coder 模块添加 Docker 模板，自动克隆当前仓库并启动 code-server。
*   **价值**：极大简化了本地开发环境的搭建流程，方便开发者快速复现项目。

**#12110: fix(ai): send reasoning_effort and read reasoning tokens for GitHub Copilot**
*   **内容**：修复 GitHub Copilot 适配器对推理能力（Thinking）的支持。
*   **价值**：此前硬编码了不支持推理，现已从 models.dev 获取支持情况，并为 `gemini-4-carbon` 等模型开启推理能力。

---

## 5. 功能需求趋势

从今日 Issue 反馈来看，社区关注点呈现以下趋势：

1.  **长上下文管理与性能**：
    *   **热点**：大文件读取、长会话压缩后的崩溃问题、工具描述的上下文开销。
    *   **趋势**：随着会话长度增加，Pi 需要更好的内存管理和上下文切片策略，以保持响应速度和稳定性。

2.  **外部协议与模型适配**：
    *   **热点**：MCP (Model Context Protocol) 配置的易用性、Gemini 4 Hydrogen 的 xhigh 推理支持、OpenAI 兼容接口的 `developer` 角色适配。
    *   **趋势**：社区对多模型生态的接入需求强烈，特别是对推理模型（Reasoning Models）的高级功能（如 `xhigh`）的支持。

3.  **企业级与开发者体验**：
    *   **热点**：企业 Copilot 模型同步、Docker 开发环境模板。
    *   **趋势**：开发者不仅关注 AI 能力，也越来越关注 IDE/Agent 的可配置性、稳定性以及本地开发环境的部署便利性。

---

## 6. 开发者关注点

*   **配置繁琐**：MCP 配置中环境变量解析的 Bug 反复出现，说明底层配置解析逻辑需要更健壮的单元测试覆盖。
*   **状态持久化**：`settings.json` 中混合了用户设置和机器生成的状态，容易导致配置冲突。Issue #12158 提议将机器状态分离，这是一个很好的架构优化方向。
*   **安全性**：`!command` 类型的 API Key 在会话过期时的处理逻辑存在漏洞（Issue #12164），可能导致认证状态与实际状态不一致，需要加强密钥管理的生命周期管理。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026年11月15日
**数据来源：** github.com/QwenLM/qwen-code

---

## 1. 今日速览
Qwen Code 今晚发布了 **v0.27.2-nightly** 版本，重点改进了 Managed Agent 的会话文件系统注册机制。社区焦点集中在 **1.0 预览版内核的逐步落地**（Agent Loop 事件驱动架构）以及 **Web Shell 多工作区支持** 的完善上。同时，CI 流水线中持续存在一些 flaky tests（不稳定测试）和 E2E 测试失败，引发了关于测试稳定性和性能优化的广泛讨论。

---

## 2. 版本发布
**v0.27.2-nightly.20261113.6f754be654**
*   **更新摘要：** 发布了最新的夜间构建版本。
*   **核心变更：**
    *   **feat(managed-agent):** 优化 Managed Agent 会话，现在可以将客户端文件系统注册到 Managed Session 中，提升了文件访问的稳定性和隔离性。
    *   **test(web-shell):** 新增了 Web Shell 相关测试覆盖。

---

## 3. 社区热点 Issues

*   **#14724 Main CI failed: Managed Agent gate — no test identified** (367 评论)
    *   **重要性：** 🔴 **严重**。这是目前最活跃的 Bug 报告，涉及 CI 流水线的关键阻塞点。
    *   **摘要：** CI 报告失败但未识别具体测试，导致自动化测试流程受阻。这表明项目正在经历从旧架构向新架构迁移过程中的基础设施摩擦。
    *   **链接：** [Issue #14724](https://github.com/QwenLM/qwen-code/issues/14724)

*   **#17045 tracking(core): land the 1.0 Preview loop kernel on main** (18 评论)
    *   **重要性：** 🔵 **路线图**。项目核心架构升级的关键追踪 Issue。
    *   **摘要：** 追踪将 v1.0.0-preview 的事件驱动内核逐步迁移到 main 分支的过程。该 Issue 收集了所有遗留的工作项，确保在冻结日期（2026-11-21）前完成所有设计决策。
    *   **链接：** [Issue #17045](https://github.com/QwenLM/qwen-code/issues/17045)

*   **#11680 Main CI failed: E2E Tests — no test identified** (60 评论)
    *   **重要性：** 🔴 **严重**。端到端测试环境持续不稳定。
    *   **摘要：** 这是一个长期的 CI 失败问题，测试在报告任何结果前就失败了。这严重影响了开发者合并代码的信心。
    *   **链接：** [Issue #11680](https://github.com/QwenLM/qwen-code/issues/11680)

*   **#17261 [managed-agent] Content-only child agent launches but produces no output** (3 评论)
    *   **重要性：** 🟠 **高**。Managed Agent 核心功能缺陷。
    *   **摘要：** 在 `external-files` 工作区拓扑中，子代理启动成功但在回合截止前无任何输出，导致 `hosted_turn_deadline_exceeded` 错误。这直接影响多代理协作的可用性。
    *   **链接：** [Issue #17261](https://github.com/QwenLM/qwen-code/issues/17261)

*   **#17225 Align folder-trust reader boundaries and add positive daemon coverage** (3 评论)
    *   **重要性：** 🟡 **中等**。安全性相关增强。
    *   **摘要：** 旨在对齐文件夹信任策略的边界，并增加对守护进程的积极覆盖测试。这是对之前安全审查的后续跟进。
    *   **链接：** [Issue #17225](https://github.com/QwenLM/qwen-code/issues/17225)

*   **#17289 Custom commands alter `$$`, `$&`, `` $` `` and `$'` in typed arguments** (2 评论)
    *   **重要性：** 🟠 **高**。命令行工具逻辑 Bug。
    *   **摘要：** 自定义命令在处理用户输入的 `$ARGUMENTS` 时，错误地应用了 JavaScript 的正则替换语法（如 `$$` 变为 `$`），导致命令执行结果异常。
    *   **链接：** [Issue #17289](https://github.com/QwenLM/qwen-code/issues/17289)

*   **#17266 Web Shell on Windows: "Toggle environment information" causes a storm of visible cmd.exe windows** (2 评论)
    *   **重要性：** 🟠 **高**。跨平台兼容性问题。
    *   **摘要：** 在 Windows 上，开启环境信息切换会导致大量 cmd.exe 窗口闪烁和 CPU 占用飙升，严重影响用户体验。
    *   **链接：** [Issue #17266](https://github.com/QwenLM/qwen-code/issues/17266)

*   **#17290 Web Shell: "Ask for details" HTML page ignores the "Language: Model output" setting** (2 评论)
    *   **重要性：** 🟡 **中等**。UI 交互细节问题。
    *   **摘要：** Web Shell 中的详情页面语言硬编码为 UI 本地化语言，忽略了用户设置的“模型输出语言”选项，导致非英语用户困惑。
    *   **链接：** [Issue #17290](https://github.com/QwenLM/qwen-code/issues/17290)

*   **#17270 Web Shell: selection menu does not appear when a full line is selected** (2 评论)
    *   **重要性：** 🟡 **中等**。剪贴板交互 Bug。
    *   **摘要：** 当用户全选一行时，虽然行高亮了，但复制菜单（纯文本/Markdown）未出现，导致无法快速复制内容。
    *   **链接：** [Issue #17270](https://github.com/QwenLM/qwen-code/issues/17270)

*   **#17222 ci: pick_runner routes fork-internal PRs to the upstream ECS fleet and queues forever** (3 评论)
    *   **重要性：** 🟠 **高**。CI 配置 Bug。
    *   **摘要：** CI 中的 `pick_runner` 逻辑错误地将 fork 仓库的内部 PR 指派给了上游 ECS 队列，导致任务永远处于排队状态。
    *   **链接：** [Issue #17222](https://github.com/QwenLM/qwen-code/issues/17222)

---

## 4. 重要 PR 进展

*   **#17228 feat(web-shell): Codex-style managed worktree sessions** (作者: wenshao)
    *   **内容：** 重构 Web Shell 会话行为，使其像 Codex 的 managed worktree 一样工作。默认使用隔离的 worktree，支持 detached HEAD 和分支切换，极大提升了多会话并行开发的体验。
    *   **链接：** [PR #17228](https://github.com/QwenLM/qwen-code/pull/17228)

*   **#17285 docs(design): add the agent loop's capability ledger and rollout rules** (作者: qqqys)
    *   **内容：** 配合核心架构升级，新增设计文档。详细列出了 1.0 版本内核（v1.0.0-preview）与 main 分支之间的行为映射（Capability Ledger），明确了功能迁移的规则。
    *   **链接：** [PR #17285](https://github.com/QwenLM/qwen-code/pull/17285)

*   **#17219 test(ci): stabilize the macOS nightly CI legs** (作者: wenshao)
    *   **内容：** 通过调整等待预算和依赖检测，稳定 macOS 夜间 CI。不改变产品行为，仅解决环境差异导致的测试不稳定问题。
    *   **链接：** [PR #17219](https://github.com/QwenLM/qwen-code/pull/17219)

*   **#17281 fix(managed-agent): read inherited extension configuration at its committed state** (作者: yiliang114)
    *   **内容：** 修复 Managed Agent 的资源读取问题。确保子代理能读取到父级扩展配置的已提交状态，并修复了子代理在 Runtime 之前就失败的情况。
    *   **链接：** [PR #17281](https://github.com/QwenLM/qwen-code/pull/17281)

*   **#17291 fix(web-shell): clear Goals multi-workspace post-merge review items** (作者: wenshao)
    *   **内容：** 修复 Web Shell Goals 页面在合并后遗留的审查建议项，清理了多工作区下的 UI 残留数据。
    *   **链接：** [PR #17291](https://github.com/QwenLM/qwen-code/pull/17291)

*   **#17198 feat(web-shell): make the local files bridge easier to discover and use** (作者: wenshao)
    *   **内容：** 优化 Web Shell 的本地文件桥接功能，使其状态更加直观，缩短常用路径，提升易用性。
    *   **链接：** [PR #17198](https://github.com/QwenLM/qwen-code/pull/17198)

*   **#17294 fix(integration): load the memory-manager editor fixtures as CommonJS** (作者: qwen-code-dev-bot)
    *   **内容：** 修复集成测试中 Node.js 无法正确加载扩展名脚本的问题，通过将测试生成的可执行文件标记为 CommonJS 模块。
    *   **链接：** [PR #17294](https://github.com/QwenLM/qwen-code/pull/17294)

*   **#16679 fix(acp): surface failed todo_write calls instead of dropping them** (作者: 2SinceJuly)
    *   **内容：** 改进 ACP（Agent Communication Protocol）的错误处理，当 `todo_write` 调用失败时，不再静默丢弃，而是向客户端报告失败状态。
    *   **链接：** [PR #16679](https://github.com/QwenLM/qwen-code/pull/16679)

*   **#16573 refactor(core): share the main-route predicate between the send layer and the compression service** (作者: xxwtiancai)
    *   **内容：** 代码重构，提取了主路由判断逻辑，使其在发送层和压缩服务中复用，减少重复代码并统一行为。
    *   **链接：** [PR #16573](https://github.com/QwenLM/qwen-code/pull/16573)

*   **#17025 fix(cli): stabilize OpenTUI streaming markdown preview** (作者: MikeWang0316tw)
    *   **内容：** 修复 OpenTUI 流式传输时 Markdown 预览的抖动问题，通过关闭同步预览并使用独立渲染逻辑来保持一致性。
    *   **链接：** [PR #17025](https://github.com/QwenLM/qwen-code/pull/17025)

---

## 5. 功能需求趋势
1.  **架构迁移与稳定性：** 社区高度关注 1.0 版本内核（Agent Loop）的迁移进度。随着旧架构的移除，大量的 CI 失败和测试不兼容问题暴露出来，社区急需解决这些“阵痛”。
2.  **Web Shell 体验升级：** 多个 PR 和 Issue 表明，Web Shell 正在向更复杂的交互模式演进，如多工作区支持、Codex 风格的会话管理以及更精细的 UI 交互（复制菜单、语言设置）。
3.  **Managed Agent 增强与安全：** 随着多代理协作场景的深入，Managed Agent 的文件系统隔离、子代理配置继承以及安全信任边界成为核心讨论点。

---

## 6. 开发者关注点
1.  **CI/CD 环境极其脆弱：** 无论是 macOS 还是 Linux 环境，Nightly CI 和 E2E 测试频繁出现“no test identified”或 flaky tests，严重拖慢了开发节奏。开发者急需更稳定的测试基础设施。
2.  **跨平台兼容性：** Windows 用户反馈了关于 cmd.exe 窗口风暴和 Git poll 占用过高的问题，表明项目在 Windows 平台上的资源管理和后台进程控制仍需优化。
3.  **命令行工具的健壮性：** 开发者发现自定义命令在处理特殊字符（如 `$`, `&`）时存在严重的逻辑错误，这可能导致自动化脚本在特定输入下失效。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑11‑15**

---

## 1️⃣ 今日速览
- 近 24 小时内 **未发布新版本**，但社区集中反馈了三个影响使用体验的关键 Bug（子代理锁、终端配色、焦点刷新），并有 **5 条关键 PR** 正在推进中，涵盖新模型接入、参数解析修复及依赖升级。

---

## 2️⃣ 版本发布
> 本日暂无 Release，后续如有新标签将第一时间更新。

---

## 3️⃣ 社区热点 Issues *(全部 3 条)*  

| 编号 | 标题 / 关键标签 | 为什么值得关注 | 社区反馈 | 链接 |
|------|----------------|----------------|----------|------|
| #7232 | **[CLOSED]** `bug, area:tui, os:macos, v0.10.3, area:core, area:state, status:awaiting-release`  <br>“Remove the workspace‑wide sub‑agent coordination flock” | 旧工作区的子代理锁未被清理，导致后续会话全部只读并反复报错，直接影响多人协作与长会话的可靠性。 | 已在 11‑14 合并并关闭，作者确认修复。 | https://github.com/codewhale-hq/Codewhale/issues/7232 |
| #7344 | **[OPEN]** `area:tui, area:install, os:linux`  <br>“GNOME Terminal background stays custom Nord theme color after exit” | 终端主题未恢复导致用户离开后 UI 混乱，尤其在 Linux 桌面环境（GNOME）使用频繁的开发者中影响感官一致性。 | 目前仅有 1 条评论，关注度逐步上升。 | https://github.com/codewhale-hq/Codewhale/issues/7344 |
| #7343 | **[OPEN]** `area:tui, os:linux`  <br>“TUI: full‑screen erase + repaint on every window focus flashes on terminals without DEC 2026” | 每次窗口聚焦时全屏抹除并重绘，导致闪屏，严重破坏交互流畅性，特别是在不支持 DEC 2026 的 gnome‑terminal/VTE 环境下。 | 新建于同一天，暂无评论，但已被标记为 “high‑priority”。 | https://github.com/codewhale-hq/Codewhale/issues/7343 |

> **注**：因本日仅有 3 条 Issue，已全部列出并标记为热点。

---

## 4️⃣ 重要 PR 进展 *(全部 5 条)*  

| 编号 | 标题 / 关键标签 | 功能/修复要点 | 当前状态 | 链接 |
|------|----------------|--------------|----------|------|
| #7340 | **[enhancement]** `area:localization, area:core, area:web, contributor:external`  <br>“feat(providers): add Synap descriptor” | 为 Codewhale 增添 **Synap** 模型提供者：支持 OpenAI‑compatible Chat Completions、模型发现、`SYNAP_API_KEY` 环境变量等。 | Open | https://github.com/codewhale-hq/Codewhale/pull/7340 |
| #7342 | **[bug]** `area:core, contributor:external`  <br>“fix(core): keep assignments inside CLI argument values literal” | 修复解析器在二次 `key=value` 处理时误把已消费的 `--argument` 值再次解析为工具参数的 bug，防止 `MODE=dev` 之类的误植入。 | Open | https://github.com/codewhale-hq/Codewhale/pull/7342 |
| #7341 | **[bug]** `area:core, contributor:external`  <br>“fix(core): preserve multiline XML tool arguments” | 解决 XML 参数在多行内容时被截断的问题，保证 `write_file` 等工具能正确接收完整的 XML 文本。 | Open | https://github.com/codewhale-hq/Codewhale/pull/7341 |
| #7334 | **[dependencies]** `rust, cleanup`  <br>“build(deps): bump tokio from 1.53.3 to 1.54.1” | 升级 Tokio 异步运行时至 1.54.1，包含若干性能改进与安全补丁。 | Open (Dependabot) | https://github.com/codewhale-hq/Codewhale/pull/7334 |
| #7339 | **[dependencies]** `rust, cleanup`  <br>“build(deps): bump flate2 from 1.1.10 to 1.1.11” | 更新压缩库 flate2，修复已知的崩溃与内存泄漏。 | Open (Dependabot) | https://github.com/codewhale-hq/Codewhale/pull/7339 |

> **说明**：本日 PR 数量不足 10 条，已全部呈现，均为近期社区关注的核心功能或依赖安全。

---

## 5️⃣ 功能需求趋势

从本次 Issue 与 PR 汇总可提炼出 **三大趋势**：

1. **会话与子代理的可靠性**  
   - Issue #7232 直接指向跨会话锁机制的缺陷，显示开发者对 **长时会话/多用户协作** 的强需求。

2. **终端 UI 稳定性与跨平台一致性**  
   - Issues #7344、#7343 以及 PR #7342/#7341 均围绕 **终端配色、刷新、参数解析**，表明用户在 Linux/macOS 终端环境下对 **无闪屏、配色恢复、参数完整性** 有迫切期待。

3. **模型提供者与本地化扩展**  
   - PR #7340 引入 **Synap** 新模型，暗示社区正积极探索 **多模型接入** 与 **本地化（i18n）** 的需求。

---

## 6️⃣ 开发者关注点（高频痛点）

| 痛点 | 具体表现 | 影响范围 |
|------|----------|----------|
| **子代理锁残留** | 旧会话留下的 flock 文件导致新会话只读、报错 | macOS、v0.10.3 |
| **终端配色泄漏** | 退出 TUI 后 GNOME Terminal 仍保持 Nord 主题颜色 | Linux GNOME |
| **焦点刷新闪屏** | 每次窗口获得焦点即全屏抹除并重绘，闪烁明显 | 不支持 DEC 2026 的终端（gnome‑terminal/VTE） |
| **CLI 参数误解析** | `--command "MODE=dev …"` 被错误拆分为额外工具参数 | 跨平台 CLI 使用 |
| **多行 XML 丢失** | 多行 XML 内容在工具调用时被截断，导致空文件或语法错误 | 代码生成/写文件工具 |
| **依赖安全/性能** | Tokio、flate2 等核心库的安全/性能更新需求 | 全体开发者 |

> **建议**：在下一轮迭代中优先解决子代理锁和终端刷新两大 UI 稳定性问题，同时继续完善模型提供者插件化与参数解析的健壮性。

--- 

*本日报基于 GitHub 仓库 `Hmbown/DeepSeek‑TUI` 的最新 24 小时数据生成，供 DeepSeek TUI 开发者与社区成员快速了解项目动态。*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*