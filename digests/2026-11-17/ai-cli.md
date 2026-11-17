# AI CLI 工具社区动态日报 2026-11-17

> 生成时间: 2026-11-17 02:41 UTC | 覆盖工具: 9 个

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
**日期**: 2026-11-17  
**来源**: github.com/openai/codex  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
**版本迭代活跃**：过去24小时发布 4 个 Rust 版本（0.170.0-alpha.4.1 至 0.171.0-alpha.10），主要针对沙箱执行和 TUI 界面进行优化。**沙箱与系统稳定性**：Windows 平台沙箱命令执行（如 SSH、Shell）和 macOS 桌面应用的 CPU 性能问题引发大量关注，用户反馈界面卡顿严重。**安全与权限管理**：Guardian 审批流程、MCP 工具链以及 Windows 认证机制是修复重点，涉及会话管理、远程协作和沙箱隔离的复杂性。

---

## 2. 版本发布
本次发布包含 4 个 Rust 版本更新，主要集中在沙箱环境、系统权限和 TUI 界面功能的完善：
*   **rust-v0.170.0-alpha.4.1**: 基础版本更新。
*   **rust-v0.171.0-alpha.8 ~ alpha.10**: 一系列增量更新，涉及沙箱进程管理、会话 ID 继承和文件系统元数据处理。

---

## 3. 社区热点 Issues

1.  **#57101** [Windows Computer Use] 截图后边框残留与捕获权限未释放
    *   **重要性**: 高。Computer Use 是核心功能，此 Bug 影响用户体验和系统资源占用。
    *   **反应**: 42 评论，7 赞。

2.  **#49682** [Dots] 云端文件丢失与桌面终端消失
    *   **重要性**: 高。涉及云协作和数据持久性，影响长期项目运行。
    *   **反应**: 35 评论，10 赞。

3.  **#56941** [Windows] Computer Use 导致全系统 UI 延迟
    *   **重要性**: 极高。严重影响系统可用性，用户反馈需强制杀死进程。
    *   **反应**: 25 评论，3 赞。

4.  **#50728** [macOS] Computer Use 导致输入重复与延迟
    *   **重要性**: 高。跨平台兼容性问题，影响手动操作流。
    *   **反应**: 21 评论，1 赞。

5.  **#2379** [Enhancement] TUI 撤销/重做功能
    *   **重要性**: 中高。长期需求，提升编辑体验。
    *   **反应**: 16 评论，38 赞（社区呼声高）。

6.  **#55654** [Web/App] “No usable execution environment” 阻止跨平台编辑
    *   **重要性**: 中。影响多端协作效率。
    *   **反应**: 13 评论，4 赞。

7.  **#18620** [Windows] 沙箱内 Shell 命令失败
    *   **重要性**: 中高。影响核心开发环境稳定性。
    *   **反应**: 13 评论，6 赞。

8.  **#46129** [Windows] 浏览器请求头策略加载失败
    *   **重要性**: 中。阻碍浏览器扩展功能。
    *   **反应**: 10 评论，0 赞。

9.  **#37849** [macOS] 长对话滚动时文本跳动
    *   **重要性**: 中。UI 渲染体验问题。
    *   **反应**: 10 评论，7 赞。

10. **#56878** [macOS] Daybreak 模型无法选择
    *   **重要性**: 中。特定模型可用性问题。
    *   **反应**: 6 评论，0 赞。

---

## 4. 重要 PR 进展
本次 PR 更新主要针对沙箱安全、权限管理和界面交互进行修复：

1.  **#61947** [Closed] **Mask system SSH config drop-ins**: 修复 Linux 沙箱中 root 权限配置导致的 SSH 连接被拒问题。
2.  **#61946** [Closed] **Include enclosing tool context in nested Guardian approvals**: 修复嵌套 MCP 审批时的上下文丢失，确保 Guardian 审核完整性。
3.  **#61945** [Closed] **Allow host-started forks to inherit the root session ID**: 允许主机启动的子进程继承根会话 ID，改善多线程会话管理。
4.  **#61942** [Closed] **Centralize exec-server launches**: 重构沙箱执行服务启动逻辑，将 Windows 令牌会话准备集中管理。
5.  **#61934** [Closed] **Allow independent app-server thread resumes to overlap**: 允许独立线程恢复操作并行执行，减少阻塞。
6.  **#61928** [Closed] **Encapsulate app-server thread-list locking**: 封装线程列表锁逻辑，防止并发请求冲突。
7.  **#61922** [Closed] **Add conversation files to the TUI sidebar chooser**: TUI 界面侧边栏新增对话文件列表，方便快速导航。
8.  **#61920** [Closed] **Track conversation files for the TUI sidebar**: 优化对话文件跟踪，提升侧边栏信息准确性。
9.  **#61911** [Closed] **Default Statsig metrics exports to Zstandard compression**: 默认启用 Zstandard 压缩，优化遥测数据传输效率。
10. **#61910** [Closed] **Preserve native sandbox executable paths**: 修复非 UTF-8 路径在沙箱中转换时的丢失问题。

---

## 5. 功能需求趋势
*   **跨平台沙箱稳定性**: Windows 和 macOS 的沙箱执行、SSH 连接、Shell 命令是高频故障点。
*   **性能优化**: macOS 下打开 PDF 引发的全局 UI 卡顿以及 Windows 下 Computer Use 导致的系统级延迟。
*   **云协作与持久化**: Dots 功能中的云端工作区状态回滚、文件丢失问题。
*   **TUI 界面增强**: 用户强烈需求 TUI 模式下的撤销/重做、侧边栏文件管理和生成图片预览。

---

## 6. 开发者关注点
*   **权限与安全**: Guardian 审批流程的上下文传递、MCP 工具链的权限隔离、Windows 认证策略死锁。
*   **环境隔离**: 沙箱环境下的文件系统映射、进程继承和会话管理。
*   **多端一致性**: 移动端与桌面端执行环境的兼容性问题。
*   **资源管理**: 后台进程残留导致系统资源耗尽的问题。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-17  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
今日社区活跃度较高，主要聚焦于 **Agent 行为稳定性** 与 **安全修复**。两个高优先级 Bug（Subagent 恢复状态错误、Generalist Agent 挂起）获得大量关注，同时针对 **Windows 环境兼容性** 和 **构建优化** 的修复 PR 正在合并。整体趋势显示项目正在加强沙箱安全机制及多平台体验。

---

## 2. 版本发布
**无**（无新 Release）

---

## 3. 社区热点 Issues

### 🔴 P1 优先级（高影响/阻塞）
1. **#22323 Subagent 恢复后状态显示异常**
   * **重要性**: Agent 核心逻辑缺陷。`codebase_investigator` 在达到 `MAX_TURNS` 时错误地报告为 "GOAL success"，导致用户无法察觉中断。
   * **反应**: 13 个评论，2 个点赞，社区认为这严重影响调试和信任度。

2. **#21409 Generalist Agent 永久挂起**
   * **重要性**: 严重阻塞用户体验。Agent 在执行简单文件夹操作时无限期挂起，必须手动指令它不使用子 Agent 才能恢复。
   * **反应**: 8 个评论，8 个点赞，用户反馈强烈。

### 🟡 P2 优先级（重要优化/体验）
3. **#19873 利用模型的 Bash 原生能力**
   * **重要性**: 重大架构提案。建议利用 Zero-Dependency OS Sandboxing 让模型更自然地使用 POSIX 工具，提升效率。
   * **反应**: 9 个评论，关注安全与 UX 的平衡。

4. **#22745 & #22746/47 AST 感知文件读取**
   * **重要性**: 性能与精度优化。探讨使用抽象语法树（AST）工具来减少 Token 消耗和误读，提升代码库探索效率。

5. **#22267 Browser Agent 配置忽略**
   * **重要性**: 配置管理 Bug。Browser Agent 完全忽略 `settings.json` 中的 `maxTurns` 等配置，导致行为不可控。
   * **反应**: 5 个评论。

6. **#22232 Browser Agent 会话恢复**
   * **重要性**: 可靠性增强。解决在持久化会话模式下，Browser Manager 遇到锁时采用 "fail-fast" 策略导致无法恢复的问题。

7. **#22672 Agent 防止破坏性行为**
   * **重要性**: 安全性。防止 Agent 在执行 Git 操作或数据库维护时误用 `--force` 等危险命令。

8. **#22186 输出钩子崩溃**
   * **重要性**: 稳定性。在 `get-shit-done` 输出总结阶段导致 CLI 崩溃。

9. **#24246 工具数量限制 (400+ tools)**
   * **重要性**: 扩展性。当可用工具超过 400 个时触发 400 错误，建议 Agent 优化工具范围选择。

### 🟢 P3 优先级（体验/实验性）
10. **#22232 & #21983** - Browser Agent 在 Wayland 环境下的兼容性问题。

---

## 4. 重要 PR 进展

### 🔒 安全与稳定性修复
1. **#30206 [P1]** 阻止项目 Git 环境注入
   * **内容**: 防止通过 `.env` 加载环境变量影响内部 Git 和 Shell 操作，修复潜在的权限绕过漏洞。
2. **#30095 [P1]** 修复 Windows Git 权限绕过
   * **内容**: 修复 Windows 下可能被误判为安全只读操作的 Git 命令。
3. **#30283** 禁止不安全的 MCP 服务器命令
   * **内容**: 强制检查系统级 MCP 服务器命令的所有权和写入权限。
4. **#30292** 保留后台日志尾部并标记截断
   * **内容**: 修复 `read_background_output` 工具在读取大日志时丢失首行内容的问题，并明确告知模型读取是否被截断。

### 🛠️ 平台与构建优化
5. **#30207** 清理构建缓存以解决发布失败
   * **内容**: 解决 nightly 构建因遗留的 `bundle/` 目录导致发布包过大（106MB）而失败的问题。
6. **#30281** Node 26 环境下的 Fetch 超时配置
   * **内容**: 升级底层库以支持 Node 26 的全局 Fetch API 配置，并修复超时设置问题。
7. **#30315** 修正本地 Git 克隆检测逻辑
   * **内容**: 修复自动更新功能在 `npm link` 或子目录运行时误判为全局安装的问题。

### 📦 依赖与文档
8. **#30321** 更新工作区依赖与沙箱运行时
   * **内容**: 同步更新 `@modelcontextprotocol/sdk` 等依赖，并优化沙箱容器的 Dockerfile 配置。
9. **#30316** 修复自定义模型别名生成设置
   * **内容**: 修复模型别名（如 `flash-lite`）在扩展时无法正确解析的问题。
10. **#30305** 修正扩展文档中的 `excludeTools` 示例
    * **内容**: 修复文档中示例代码无效的问题，明确告知作者该配置目前无法匹配工具名称。

---

## 5. 功能需求趋势

根据 Issues 数据，社区关注点主要集中在以下三个方向：

1.  **Agent 智能与行为控制**
    *   **关键词**: AST 感知读取、减少 Token 消耗、子 Agent 自主性、Self-Awareness。
    *   **趋势**: 社区希望 Agent 能更"聪明"地选择工具（如只读取 AST 节点而非全文），并具备更强的自我认知能力（知道自己的 Hotkeys 和限制）。

2.  **安全与可靠性**
    *   **关键词**: 沙箱隔离、破坏性行为阻止、会话恢复、配置覆盖。
    *   **趋势**: 在增强 Agent 权力的同时，开发者对防止误删文件、防止环境变量注入以及会话崩溃的恢复机制需求极高。

3.  **多平台兼容性**
    *   **关键词**: WSLg 图像粘贴、Wayland 支持、Windows Shell 描述。
    *   **趋势**: 项目正在积极修复 Linux (WSL) 和 Windows 环境下的边缘兼容性问题，提升跨平台体验。

---

## 6. 开发者关注点

*   **配置管理痛点**: `settings.json` 的配置（如 `maxTurns`）经常被忽略，特别是 Browser Agent，导致用户难以控制 Agent 行为。
*   **日志与调试**: 当 Agent 执行复杂任务（如创建 Vite App）或处理大量工具时，CLI 容易挂起或输出日志截断，导致难以排查问题。
*   **上下文记忆**: 现有的 `WriteToDo` 工具严重依赖对话上下文，导致长期会话中"记忆丢失"，社区提议使用持久化文件追踪任务。

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

# OpenCode 社区动态日报 (2026-11-17)

## 1. 今日速览
*   **PTY 守护进程修复发布**：`opencode-pty` v0.6.0 发布，修复了 Linux 下子进程僵死（zombie）导致系统资源泄漏的严重 Bug。
*   **活跃开发**：过去 24 小时内，社区提交了 50 个 Issues 和 50 个 PR，主要集中在 v2.3.0 的功能调整、TUI 改进及 Code Mode 的执行逻辑优化。
*   **功能演进**：Code Mode 获得重大更新，支持后台慢脚本执行，并简化了 Shell 工具的使用方式；同时“自动化”功能从实验性阶段正式整合进核心。

---

## 2. 版本发布
**process-daemon v0.6.0**
*   **内容**：发布到 npm 包 `@opencode/pty@0.6.0`。
*   **关键点**：协议版本升级至 v9，主要修复了 Linux 环境下的子进程管理问题（详见下方 PR #64251）。

---

## 3. 社区热点 Issues
1.  **[zen] 免费层级问题汇总 (#59387)**
    *   **重要性**：🔥 **高热度**，是免费用户反馈问题的集散地。
    *   **摘要**：关于免费额度耗尽、每日重置失效等问题的集中讨论，涉及大量用户（385+ 评论）。
    *   [链接](https://github.com/anomalyco/opencode/issues/59387)
2.  **[v2.3.0] Linux 下 Shell 命令产生僵尸进程 (#63817)**
    *   **重要性**：🐛 **严重 Bug**，影响系统稳定性。
    *   **摘要**：升级到 v2.3.0 后，所有完成的 Shell 命令都会变成僵尸进程，直到进程重启。此问题在 v2.2.7 中不存在。
    *   [链接](https://github.com/anomalyco/opencode/issues/63817)
3.  **[v2.3.0] opencode-pty 守护进程僵尸进程泄漏 (#63976)**
    *   **重要性**：🐛 **严重 Bug**，与 #63817 相关。
    *   **摘要**：确认僵尸进程呈无限制增长，仅在单个守护进程 PID 下增长，建议升级至 v0.6.0。
    *   [链接](https://github.com/anomalyco/opencode/issues/63976)
4.  **[FEATURE] 恢复前台子代理执行 (#64073)**
    *   **重要性**：⭐ **功能请求**，用户反馈 2.3.0 变更导致体验下降。
    *   **摘要**：用户希望保留在 v2.3.0 之前运行子代理时作为阻塞调用的能力。
    *   [链接](https://github.com/anomalyco/opencode/issues/64073)
5.  **[FEATURE] 子代理始终后台运行 (#64096)**
    *   **重要性**：⭐ **功能请求**，与 #64073 紧密相关。
    *   **摘要**：既然 2.3.0 强制后台运行，请保留一种方式让子代理调用表现为阻塞调用（同步返回）。
    *   [链接](https://github.com/anomalyco/opencode/issues/64096)
6.  **Desktop "Add server" 对话框字段不可编辑 (#38193)**
    *   **重要性**：🐛 **UI Bug**，影响新用户配置。
    *   **摘要**：添加服务器时，服务器名称、用户名和密码字段无法输入，仅地址可编辑。
    *   [链接](https://github.com/anomalyco/opencode/issues/38193)
7.  **TUI 中 Ctrl+C 无法中断进程 (#61899)**
    *   **重要性**：🐛 **交互 Bug**，影响开发体验。
    *   **摘要**：集成终端中 Ctrl+C 无法中断正在运行的子进程（如 Python 服务器），需强制 kill。
    *   [链接](https://github.com/anomalyco/opencode/issues/61899)
8.  **MCP 服务器推送通知丢失 (#48855)**
    *   **重要性**：🔌 **生态问题**，影响 MCP 生态集成。
    *   **摘要**：除了特定通知外，MCP 服务器到客户端的自定义通知（如 termgram、progress）被丢弃。
    *   [链接](https://github.com/anomalyco/opencode/issues/48855)
9.  **Android 文本选择意外打开侧边栏 (#63530)**
    *   **重要性**：🐛 **移动端 Bug**，影响移动端使用。
    *   **摘要**：长按选择文本时，左侧侧边栏也会被意外触发。
    *   [链接](https://github.com/anomalyco/opencode/issues/63530)
10. **配置 V1 权限块在 V2 中被忽略 (#64253)**
    *   **重要性**：⚠️ **兼容性回归**。
    *   **摘要**：项目级 V1 权限配置在 v2.3.0 中被静默忽略，未进行迁移。
    *   [链接](https://github.com/anomalyco/opencode/issues/64253)

---

## 4. 重要 PR 进展
1.  **feat(core): background slow Code Mode scripts (#64343)**
    *   **内容**：开启 `full_codemode` 后，执行超过 10 秒的脚本会自动转为后台任务，防止阻塞会话。
    *   [链接](https://github.com/anomalyco/opencode/pull/64343)
2.  **fix(core): avoid WAL on Linux NFS databases (#64340)**
    *   **内容**：修复 Linux NFS 环境下数据库启动失败的问题，涉及 WAL（预写日志）处理。
    *   [链接](https://github.com/anomalyco/opencode/pull/64340)
3.  **fix(core): pin @opencode/pty 0.6.0 and use protocol 9 (#64251)**
    *   **内容**：将核心依赖升级至修复僵尸进程的 `@opencode/pty@0.6.0`，解决 v2.3.0 的系统泄漏问题。
    *   [链接](https://github.com/anomalyco/opencode/pull/64251)
4.  **feat(core): make shell the only Code Mode shell tool (#64335)**
    *   **内容**：在 Code Mode 中简化 Shell 工具，仅保留 `tools.shell`，移除了 `shell_status` 和 `shell_wait`。
    *   [链接](https://github.com/anomalyco/opencode/pull/64335)
5.  **fix(tui): keep older pinned sessions visible (#64339)**
    *   **内容**：修复会话列表只显示最近 50 个会话导致旧置顶会话消失的问题。
    *   [链接](https://github.com/anomalyco/opencode/pull/64339)
6.  **fix(core): let plugins rename calls to unknown tools in Code Mode (#64329)**
    *   **内容**：允许插件在 Code Mode 程序内部重命名工具调用，即使目标工具不存在。
    *   [链接](https://github.com/anomalyco/opencode/pull/64329)
7.  **fix(core): return a renamed tool's structured output in Code Mode (#64333)**
    *   **内容**：修复插件重命名工具后，Code Mode 获取结构化输出的错误问题。
    *   [链接](https://github.com/anomalyco/opencode/pull/64333)
8.  **feat(core): turn experimental schedules into automations (#64160)**
    *   **内容**：将实验性的“计划/调度”功能整合为正式的“自动化”功能，支持定时器和 MCP 事件触发。
    *   [链接](https://github.com/anomalyco/opencode/pull/64160)
9.  **feat(ai): add mid-conversation tool changes (#64166)**
    *   **内容**：允许 AI 在对话中途动态添加、删除或重新定义工具。
    *   [链接](https://github.com/anomalyco/opencode/pull/64166)
10. **fix(core): drop the null result line before logs (#64344)**
    *   **内容**：优化 Code Mode 执行结果输出，移除无意义的 `null` 开头行，仅展示日志内容。
    *   [链接](https://github.com/anomalyco/opencode/pull/64344)

---

## 5. 功能需求趋势
1.  **Code Mode 执行策略调整**：社区对 v2.3.0 强制后台执行子代理的变更反应强烈（#64073, #64096），反馈希望保留同步阻塞执行的模式，或改进后台任务的交互反馈。
2.  **自动化与调度**：`#64160` 的 PR 表明“自动化”功能已从实验阶段进入核心，社区对此类无需模型介入的轻量级后台任务需求增加。
3.  **MCP 生态深度集成**：随着 MCP 支持的完善，用户开始关注 MCP 服务器通知机制的完整性（#48855），特别是自定义通知和进度反馈。
4.  **移动端体验优化**：Android 端的交互 Bug（#63530）显示出社区对移动端使用场景的持续关注。

---

## 6. 开发者关注点
*   **稳定性与资源管理**：Linux 下的僵尸进程问题（#63817, #63976）是当前最紧急的痛点，直接导致系统资源耗尽。
*   **兼容性与迁移**：v2.3.0 版本更新频繁，导致部分 V1 配置项被忽略（#64253），增加了用户升级时的配置维护负担。
*   **终端交互体验**：Ctrl+C 不生效、终端挂起等问题严重影响开发者的调试效率（#61899）。
*   **权限与认证**：Free tier 的使用限制和认证流程（#59387, #64269, #64277）是阻碍用户使用的主要障碍。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

你好！我是 AI 开发工具技术分析师。基于 GitHub 仓库 `earendil-works/pi-mono` 的最新数据，为你生成 2026-11-17 的 Pi 社区动态日报。

---

# Pi 社区动态日报 (2026-11-17)

## 1. 今日速览
- **核心修复密集日**：社区集中修复了 RPC 模式下 `session_start` 事件重复触发、Codex WebSocket 60分钟连接超时限制以及 SSE 流处理性能问题。
- **依赖安全升级**：核心依赖 `undici` 从 8.12.3 升级至 8.12.4，以修复安全漏洞。
- **功能增强**：新增对 DeepInfra、Nebius 等云推理提供商的支持，并完善了系统指令角色的默认设置。

## 2. 版本发布
- **无新版本发布**：当前社区活跃于对 v1.5.2 版本的修复和优化。

## 3. 社区热点 Issues

1.  **#9549 [OPEN] [inprogress] Large transcripts re-render every frame; every resize re-emits the whole transcript (1 core saturated)**
    *   **重要性**：性能瓶颈。在大规模会话中，全屏滚动和窗口调整会导致整个 transcript 重新渲染，造成 CPU 占用饱和。
    *   **社区反应**：高关注度 (18 👍)，涉及 TUI 渲染机制优化。

2.  **#11950 [OPEN] [bug, inprogress, prio:p0] Tool calls in one message run concurrently with bash, so a read can run before the command finishes**
    *   **重要性**：严重逻辑 Bug。当模型在单条消息中同时发送 bash 命令和读取指令时，读取操作可能获取到未完成的命令输出，导致错误。
    *   **社区反应**：高优先级 (p0)，严重影响工具调用的准确性。

3.  **#11527 [OPEN] Bedrock: a new BedrockRuntimeClient is created for every request**
    *   **重要性**：资源开销与性能问题。每次请求都创建新的客户端导致不必要的凭证轮询和 HTTP/2 会话建立。
    *   **社区反应**：关注 AWS Bedrock 集成的稳定性。

4.  **#12060 [OPEN] [inprogress, prio:p0] openai-codex: SSE requests get 400 {"detail":"Bad Request"} when zstd-compressed**
    *   **重要性**：传输协议兼容性。Zstandard 压缩导致 SSE 请求失败，影响长会话稳定性。
    *   **社区反应**：高优先级 (p0)，关联长会话中断问题。

5.  **#12244 [CLOSED] [bug, untriaged] Issues encountered when using qwen4-max**
    *   **重要性**：新模型兼容性。阿里云通义千问 4-Max 模型在流式传输中因内容安全策略被意外中断。
    *   **社区反应**：已关闭，可能通过更新模型列表或安全策略解决。

6.  **#12124 [CLOSED] [bug] hitting codex websocket 60min connection limit intra-turn**
    *   **重要性**：连接管理。长时间连续思考（无工具调用）会导致 WebSocket 超时断开。
    *   **社区反应**：已修复 (PR #12229)，需确保长思考会话的连接保活。

7.  **#11226 [OPEN] [bug] A codemode script fails before it runs when it declares a top-level variable named `tools`**
    *   **重要性**：命名冲突。脚本中定义 `tools` 变量导致脚本执行失败。
    *   **社区反应**：API 兼容性问题。

8.  **#12242 [CLOSED] [bug, untriaged] Compaction summary grows on every update**
    *   **重要性**：上下文管理。摘要管理器在压缩时未能有效清理旧数据，导致内存/存储膨胀。
    *   **社区反应**：已关闭，涉及长会话的上下文维护。

9.  **#12241 [CLOSED] [bug, untriaged] pi -p (headless) still does not exit on 1.5.2 even with zero MCP servers**
    *   **重要性**：CLI 进程管理。Headless 模式在加载扩展后无法正常退出，影响自动化脚本执行。
    *   **社区反应**：已修复，影响开发者自动化工作流。

10. **#12200 [CLOSED] Approval request: undici 8.12.4 dependency fix**
    *   **重要性**：安全补丁。核心 HTTP 客户端依赖的安全漏洞修复，确保网络通信安全。
    *   **社区反应**：依赖维护的关键更新。

## 4. 重要 PR 进展

1.  **#12198 [CLOSED] fix(coding-agent): bump undici to 8.12.4**
    *   **内容**：修复 `undici` 依赖的安全漏洞，提升 HTTP 客户端稳定性。
    *   **状态**：已合并。

2.  **#12230 [CLOSED] fix(coding-agent): emit session_start once on RPC session replacement**
    *   **内容**：修复 RPC 模式下 `new_session` 等操作导致 `session_start` 事件重复触发的问题。
    *   **状态**：已合并，解决扩展回调混乱问题。

3.  **#12229 [CLOSED] fix(ai): recover from the Codex websocket 60-minute connection limit**
    *   **内容**：实现 WebSocket 超时后的自动重连机制，避免长会话中断。
    *   **状态**：已合并。

4.  **#12236 [CLOSED] fix(coding-agent): capture git and npm output while the interactive TUI runs**
    *   **内容**：修复 TUI 交互模式下 Git/NPM 输出被覆盖或丢失的问题，提升交互体验。
    *   **状态**：已合并。

5.  **#12235 [CLOSED] fix(p2): device- and platform-aware gesture and key hints**
    *   **内容**：优化 Web UI 的提示，区分鼠标操作和触摸操作，区分 Cmd/Ctrl 键位。
    *   **状态**：已合并，提升跨平台用户体验。

6.  **#11968 [CLOSED] fix(tui,coding-agent): make fullscreen scroll frames O(viewport)**
    *   **内容**：优化全屏模式下的滚动性能，将渲染复杂度从 O(n) 降低到 O(viewport)。
    *   **状态**：已合并，直接回应 #9549 中的性能痛点。

7.  **#12233 [CLOSED] fix(coding-agent): report pi.events handler errors like other extension errors**
    *   **内容**：统一错误处理机制，确保 `pi.events` 中的错误能被正确捕获和报告。
    *   **状态**：已合并。

8.  **#11370 [OPEN] feat(ai,coding-agent): add DeepInfra, Nebius, Ollama Cloud, Scaleway, SiliconFlow, and StepFun providers**
    *   **内容**：新增多个云推理提供商支持，扩展模型获取渠道。
    *   **状态**：开发中，增加模型生态丰富度。

9.  **#12234 [CLOSED] fix(coding-agent): report model fallback after /resume and in every mode**
    *   **内容**：修复会话恢复或 fork 后，模型不可用时的降级提示机制。
    *   **状态**：已合并。

10. **#12228 [CLOSED] docs(coding-agent): hosted gateway worked example and pitfalls in models.md**
    *   **内容**：完善托管网关的使用文档，提供具体示例。
    *   **状态**：已合并，降低用户集成门槛。

## 5. 功能需求趋势

- **模型生态扩展**：社区持续推动支持更多云端推理提供商（如 DeepInfra, Nebius, StepFun），以降低用户使用门槛。
- **长上下文性能优化**：针对大 transcript 的渲染性能、摘要压缩效率以及 WebSocket 长连接稳定性有明确的技术攻关需求。
- **跨平台交互细节**：Web UI 的手势和快捷键适配（Cmd vs Ctrl）以及 RPC 模式的稳定性是高频讨论点。

## 6. 开发者关注点

- **稳定性优先**：在 RPC 模式、长会话流式传输以及复杂工具调用链路中的竞态条件和资源泄漏问题被重点排查。
- **依赖管理**：核心依赖 `undici` 的版本升级和安全补丁是维持系统安全运行的关键。
- **错误反馈机制**：开发者强烈要求改进错误提示的透明度，特别是在模型降级、会话替换和扩展执行失败时的反馈。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-11-17
**来源**: GitHub QwenLM/qwen-code

---

## 1. 今日速览
Qwen Code 今日发布了 v0.27.4-nightly 预览版，重点优化了 Web Shell 侧边栏工作区过滤功能，并新增了飞书适配器。社区开发焦点集中在 **1.0 版本核心内核迁移** 的遗留工作及 **CI 稳定性** 提升。虽然新版 Nightly 修复了多项漏洞，但主分支 CI 仍存在多个持续性的测试失败，其中包含 400+ 条评论的长期 Bug 追踪。

---

## 2. 版本发布
**v0.27.4-nightly.20261116.eb3a599ef3**
*   **更新内容**:
    *   **feat(web-shell)**: 新增侧边栏工作区过滤器，方便用户快速筛选会话。
    *   **feat(managed-agent)**: 新增飞书 适配器，完善企业级消息接入能力。

---

## 3. 社区热点 Issues

1.  **#14724 [BUG] Main CI failed: Managed Agent gate (413 comments)**
    *   **重要性**: 🔴 **极高**。这是目前最活跃的追踪问题，涉及 CI 管道在主分支运行时未能识别测试用例，导致构建失败。
    *   **社区反应**: 开发者持续报告该问题，已存在数周，可能影响新代码的合并流程。

2.  **#13078 [CI-CD] Daily dependency CVE audit failed (54 comments)**
    *   **重要性**: 🟠 **高**。依赖项的每日安全审计失败，可能引入新的高危漏洞，需立即排查。

3.  **#17045 [ROADMAP] 1.0 Preview loop kernel land (22 comments)**
    *   **重要性**: 🟠 **高**。核心路线图，追踪将 1.0 版本的基于事件的内核逐步迁移到主分支，涉及架构层面的重大调整。

4.  **#17371 [SECURITY] Verify PR residual risks (5 comments)**
    *   **重要性**: 🟠 **高**。安全相关，追踪 PR #17185 通过 `land-with-residual-risk` 决策后遗留的风险，涉及信任边界的验证。

5.  **#17258 [BUG] Token budget conflict (3 comments)**
    *   **重要性**: 🟡 **中**。订阅模式下的参数冲突问题，`max_completion_tokens` 小于 `thinking_budget` 导致功能失效。

6.  **#17350 [BUG] Windows shell output padding (3 comments)**
    *   **重要性**: 🟡 **中**。Windows 环境下 Shell 命令输出尾部出现大量空格，导致约 26-34% 的 Token 浪费。

7.  **#17467 [BUG] managed-config_install missing (3 comments)**
    *   **重要性**: 🟡 **中**。Session Store 引用容器缺失，可能导致配置提交后无法正确关联资源。

8.  **#17383 [BUG] Managed Runtime Broker stuck (3 comments)**
    *   **重要性**: 🟡 **中**。Managed Runtime 会话创建超时后无法恢复，用户缺乏手动恢复路径。

9.  **#16204 [DOCS] Add Keenable to web search docs (3 comments)**
    *   **重要性**: 🟢 **低**。文档更新，请求在支持的 MCP Web 搜索服务列表中添加 Keenable。

10. **#17284 [DISCUSS] Agent loop follow-up (2 comments)**
    *   **重要性**: 🟢 **低**。讨论 #17045 的遗留工作，规划后续架构迭代。

---

## 4. 重要 PR 进展

1.  **#17442 [feat] Aone Code channel plugin**
    *   **内容**: 添加 Aone Code 频道插件，支持轮询事件流接入。
    *   **作者**: wenshao

2.  **#17500 [feat] Native screen-reader presentation**
    *   **内容**: 为屏幕阅读器会话添加原生纯文本展示，提升无障碍体验。
    *   **作者**: chiga0

3.  **#17440 [fix] Harden watch-state shape guard**
    *   **内容**: 强化 watch-state 的形状守卫，修复潜在的安全验证漏洞。
    *   **作者**: wenshao

4.  **#17502 [fix] Serve SSE listener headroom**
    *   **内容**: 修复 SSE 连接监听器资源耗尽问题，默认回收停滞的写入流。
    *   **作者**: wenshao

5.  **#17228 [feat] Web Shell Codex worktree parity**
    *   **内容**: 实现类似 Codex 的 Managed Worktree 会话，默认创建隔离分支，支持分支切换和交接。
    *   **作者**: wenshao

6.  **#17447 [feat] Activity date session grouping**
    *   **内容**: Web Shell 侧边栏新增按活动日期分组功能，优化会话列表浏览体验。
    *   **作者**: callmeYe

7.  **#17449 [feat] Public API parity slice 4a/4b**
    *   **内容**: 完成 Managed Agent 公共 REST API 迁移，并推动 Web Shell 消费者全面迁移至新 API。
    *   **作者**: doudouOUC

8.  **#17468 [fix] Close over resources in config_install**
    *   **内容**: 修复 `managed-config_install` 资源引用丢失问题，确保提交时正确闭包资源。
    *   **作者**: yiliang114

9.  **#17377 [feat] Model availability tracking (Qoder port)**
    *   **内容**: 迁移 Qoder 线路的模型可用性追踪机制，为回退链提供模型健康状态管理。
    *   **作者**: wenshao

10. **#17482 [fix] Bun on macOS polling watchers**
    *   **内容**: 修复 Bun 运行时在 macOS 下的文件系统监听不稳定问题，改用轮询模式。
    *   **作者**: chiga0

---

## 5. 功能需求趋势
*   **Web Shell 体验升级**: 侧边栏分组、工作区过滤、活动日期视图等 UI 改进需求显著增加。
*   **企业集成深度化**: 飞书、企业微信、Aone Code 等企业协作工具的适配器建设加速。
*   **Managed Agent 稳定性**: 社区对托管代理会话的会话管理、错误恢复、资源清理机制有大量反馈。
*   **无障碍与可访问性**: 原生屏幕阅读器支持是本次社区反馈的新热点。

---

## 6. 开发者关注点
*   **CI/CD 稳定性**: 多个 CI 失败问题（Managed Agent gate、E2E Tests、依赖审计）是阻碍开发效率的最大痛点。
*   **Windows 兼容性**: Windows 环境下的 Shell 输出格式问题导致 Token 浪费，影响模型效果。
*   **配置与依赖管理**: Session Store 的资源引用机制、配置安装的闭包逻辑是核心稳定性隐患。
*   **架构迁移过渡**: 从旧版循环向新版事件驱动内核迁移过程中，遗留的兼容性和过渡性问题需要持续处理。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑11‑17**  

---

### 1. 今日速览
- 多个关键 **bug**（TUI 冻结、会话持久化失败、Windows `/undo` 崩溃）在昨日被报告，已进入高优先级修复列队。  
- 0.10.3 版本的 **Agent Client Protocol（ACP）** 集成需求持续发酵，社区积极贡献实现思路。  
- 代码库依赖更新和若干功能性 PR（如 GitHub Copilot CLI 注册、源码导航增强）在过去 24 小时内活跃推进。

---

### 2. 版本发布
> **暂无** 新版 Release（过去 24 小时未检测到 Release）。

---

### 3. 社区热点 Issues（精选 10 条）

| # | 标题 / 关键点 | 为什么重要 | 当前状态 / 讨论 |
|---|---------------|------------|----------------|
| **7357** | `bug: the TUI freezes for the whole next turn when a save‑snapshot is requested as a new turn starts` | 直接导致用户终端卡死，影响所有平台的交互体验。 | **OPEN**，已收集 1 条评论，等待复现信息。 |
| **7356** | `bug: a session whose late‑usage ledger hits 1 MiB can no longer be saved` | 会话持久化失效，长会话用户数据会丢失。 | **OPEN**，暂无评论，已标记 **area:state**。 |
| **7355** | `Named‑turn undo reads the whole turn store twice before forking` | 性能瓶颈（2 倍 IO），在大规模对话中显著拖慢。 | **OPEN**，暂无讨论。 |
| **7354** | `Session admission is held across the whole fork preparation, blocking unrelated threads` | 线程阻塞导致并发会话相互影响，破坏多用户场景。 | **OPEN**，暂无评论。 |
| **7274** | `Robustness: panics, a glob hang and wrong text in engine, tools, util and repl` | 多处 panic 与挂起，涉及核心模块，风险极高。 | **OPEN**，已列出具体子项，社区准备逐一 PR。 |
| **7279** | `0.10.3: run installed agents (Claude Code, Codex, Kimi …) as Codewhale sessions over ACP` | 为 **ACP** 打通外部模型/代理提供关键路径，关系生态扩展。 | **OPEN**，标记 **help wanted**、**good first issue**。 |
| **6970** | `A serious bug occurs when using the /undo command on Windows` | Windows 用户的关键回滚功能失效，跨平台一致性受损。 | **OPEN**，近期更新，已有 7 条评论。 |
| **7174** | `conformance: prompt fixtures fail on any host that has the optional tools` | CI/测试套件失效，阻碍发布流程与跨平台兼容性验证。 | **OPEN**，标记 **status:awaiting-release**。 |
| **7270** | `Dead‑code candidates that need a maintainer decision` | 代码膨胀影响编译时间与维护成本，需要尽快清理或实现。 | **OPEN**，社区已提供 grep 结果。 |
| **7305** *(已关闭，但值得关注)* | `Deny rules miss hash -p / zsh …` | 细粒度安全策略实现细节，影响 sandbox 可靠性。 | **CLOSED**，已在本次迭代中修正。 |

**链接示例**：  
- Issue #7357 → <https://github.com/codewhale-hq/Codewhale/issues/7357>  
（其余 Issue 链接同理，使用相同前缀加 Issue 编号）

---

### 4. 重要 PR 进展（精选 10 条）

| # | PR 标题 / 核心改动 | 价值概述 |
|---|-------------------|----------|
| **7358** | `ci(cw-8178): sharded PR CI proof run (draft)` | 验证 CI 分片机制，为大规模 PR 提供可伸缩测试环境。 |
| **6393** | `feat: source navigation echoes and guarded fork‑prefix inheritance` | 新增源码导航回显、fork 前缀保护，提高调试与复现效率。 |
| **7349** | `fix(client): decide the reasoning dialect by endpoint, not by model id` | 修正模型推理方言选择，提升多模型兼容性。 |
| **7352** | `fix(app‑server): preserve named provider in web picker` | Web 客户端能够正确使用自定义 Provider，提升 UI/UX。 |
| **7353** | `fix(engine): log safe provider failure diagnostics` | 为 provider 超时/传输错误添加结构化日志，便于运维定位。 |
| **7326** | `feat(engine): add GitHub Copilot CLI to the external agent registry` | 将 Copilot CLI 纳入外部代理库，扩展可接入的 AI 工具。 |
| **7294** | `feat(workflow): verify sealed candidates with an isolated host oracle` | 引入隔离式主机 Oracle，提升安全评估工作流的可靠性。 |
| **7351** | `fix(engine): honor native usage journal capacity fallback` | 解决使用日志容量回退的边缘 case，防止异常中止。 |
| **7342** | `fix(core): keep assignments inside CLI argument values literal` | 修正 CLI 参数解析误判，防止错误的工具参数注入。 |
| **7333** | `chore(deps): bump docker/login‑action from 4.7.0 to 4.8.0` | 更新 CI Docker 登录 Action，确保安全凭证管理。 |

**链接示例**：  
- PR #6393 → <https://github.com/codewhale-hq/Codewhale/pull/6393>  
（其余 PR 同理）

---

### 5. 功能需求趋势

| 趋势 | 主要来源（Issue/PR） | 说明 |
|------|---------------------|------|
| **会话持久化 & 状态管理** | #7356、#7357、#7355、#7354 | 多条 bug 报告聚焦在快照、ledger、undo、fork 的可靠性。 |
| **跨平台兼容（Windows）** | #6970、#7279、#7357 | Windows 环境下的特定崩溃与性能问题仍是热点。 |
| **Agent / 模型集成（ACP）** | #7279、#7326、#6393 | 通过 ACP 运行外部代理、Copilot、源码导航等是社区期待的关键功能。 |
| **性能与测试可重复性** | #7174、#7355、#7354 | Prompt conformance 失效、重复加载导致的 IO 开销，引发对 CI/benchmark 的关注。 |
| **代码质量 & 清理** | #7270、#7274 | 死代码与 panic/hang 报告提示需要一次系统性的代码审计与重构。 |

---

### 6. 开发者关注点（痛点汇总）

1. **TUI 冻结与卡死** – 关键交互在保存快照或新回合启动时失效，直接影响使用体验。  
2. **Undo/Redo 机制的低效与崩溃** – Windows 上 `/undo` 导致 panic，且实现存在双重读取、阻塞等性能问题。  
3. **会话日志容量上限** – 超过 1 MiB 后无法保存，导致长会话数据丢失。  
4. **跨平台一致性** – Windows 特有 bug 与 macOS/Linux 差异显著，需要统一的回归测试。  
5. **Agent 接入难度** – 社区期待更完善的 ACP 接口和外部模型/工具的即插即用方案。  
6. **代码膨胀 & 稳定性** – 多处 panic、挂起和死代码仍未清理，增加维护成本。  

> **建议**：优先安排会话持久化与 `/undo` 相关的修复（#7356、#7355、#7354、#6970），并同步在 CI 中加入 Windows 环境的回归测试；随后推动 ACP 相关的功能实现（#7279），配合代码清理任务（#7270、#7274）提升整体代码基线质量。

--- 

**祝大家编码愉快，期待明日的更进一步！**

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*