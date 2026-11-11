# AI CLI 工具社区动态日报 2026-11-11

> 生成时间: 2026-11-11 00:19 UTC | 覆盖工具: 9 个

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

# Claude Code Skills 社区热点分析报告
**数据截止日期：2026-11-11**

---

## 1. 热门 Skills 排行

基于 PR 互动热度（评论数、点赞数、更新活跃度），以下是社区关注度最高的 Skills：

### 🥇 **1. docx - 文档处理增强**
- **功能**：修复 LibreOffice 超时检测、文档批注去重、XML 命名空间管理
- **热点**：修复 `merge_runs.py` 导致的 XML 无效问题 (#2018)，解决批注孤立检测 (#1734)
- **状态**：OPEN（多个修复 PR 待合并）
- **链接**：[anthropics/skills PR #1792](https://github.com/anthropics/skills/pull/1792) | [PR #1734](https://github.com/anthropics/skills/pull/1734)

### 🥈 **2. webapp-testing - Web 应用测试工具**
- **功能**：修复命令注入漏洞（shell=True → shell=False），优化元素发现机制
- **热点**：安全性修复 (#1980)，textarea/select 元素识别改进 (#1976)
- **状态**：OPEN
- **链接**：[anthropics/skills PR #1980](https://github.com/anthropics/skills/pull/1980)

### 🥉 **3. xlsx - Excel 文件分析**
- **功能**：修复外部链接风险检测逻辑，支持工作表级定义名称解析
- **热点**：解决跨工作表间接引用导致的误报 (#2013)
- **状态**：OPEN
- **链接**：[anthropics/skills PR #2019](https://github.com/anthropics/skills/pull/2019)

### **4. skill-creator - Skill 开发工具**
- **功能**：修复 YAML 前置元数据解析错误、支持直接执行脚本、并行测试 Worker 修复
- **热点**：YAML 解析漏洞 (#1997)、Windows 环境兼容性 (#1298)、测试框架性能 (#1352)
- **状态**：OPEN（多个 PR 待合并）
- **链接**：[anthropics/skills PR #1997](https://github.com/anthropics/skills/pull/1997) | [PR #1298](https://github.com/anthropics/skills/pull/1298)

### **5. claude-api - API 交互工具**
- **功能**：更新 Python `pause_turn` 运行器指导、修复死链
- **热点**：156k Token 上下文窗口溢出问题 (#1487)、文档链接失效修复 (#1730)
- **状态**：OPEN
- **链接**：[anthropics/skills PR #1950](https://github.com/anthropics/skills/pull/1950) | [PR #1730](https://github.com/anthropics/skills/pull/1730)

---

## 2. 社区需求趋势

从 Issues 数据分析，社区对 Skills 的核心诉求集中在以下方向：

### **🔐 安全与信任**
- **命名空间滥用**：社区 Skills 冒充官方 `anthropic/` 命名空间，破坏信任边界 (#492)
- **命令注入风险**：Web 测试工具需移除 `shell=True` 以防止注入攻击 (#1980)

### **🛠️ 工作流与协作**
- **组织级共享**：呼吁 Claude.ai 内置组织内 Skills 共享功能 (#228)
- **技能复用**：Skill Creator 工具需要更好的封装和执行路径 (#1681)

### **📊 测试与评估**
- **触发率检测**：`run_eval.py` 并行测试框架存在假阴性问题 (#1352)
- **跨平台兼容性**：Windows 环境下的子进程执行失败 (#1298)

### **🚀 新领域扩展**
- **Web3 审计**：ProofCore 智能合约审计 Skill (#1771)
- **HPC 集群管理**：SCNet 集群操作 Skill (#1615)
- **文档视频化**：Markdown 转 MP4 视频生成 Skill (#1703)

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃但尚未合并，建议优先关注：

| Skill | PR # | 核心价值 | 更新时间 |
|-------|------|----------|----------|
| **docx 批注去重** | 1734 | 解决孤立批注问题，提升文档质量 | 2026-09-25 |
| **webapp-testing 安全修复** | 1980 | 修复命令注入漏洞，关键安全补丁 | 2026-11-01 |
| **xlsx 外部链接检测** | 2019 | 解决复杂公式引用的误报问题 | 2026-11-03 |
| **skill-creator YAML 解析** | 1997 | 修复元数据解析漏洞，影响所有 Skill 创建 | 2026-10-19 |
| **claude-api 文档修复** | 1730 | 替换 404 死链，提升文档可用性 | 2026-10-04 |

---

## 4. Skills 生态洞察

**当前社区最集中的诉求：安全加固与工程健壮性提升**

> 社区正从“功能创新”转向“工程完善”，重点关注：
> - **安全审计**（命令注入、命名空间滥用）
> - **兼容性修复**（Windows、并行测试）
> - **数据准确性**（XML 解析、链接验证）

**关键信号**：最高热度的 Issues (#492 安全问题、#1352 测试框架) 和 PR（docx、webapp-testing 修复）均指向**工程健壮性**而非新功能开发。

---

*报告生成时间：2026-11-11*  
*数据来源：anthropics/skills GitHub 仓库*

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

你好！我是 AI 开发工具技术分析师。基于 2026-11-11 的 GitHub Copilot CLI 数据，为你生成以下社区动态日报。

---

# 📅 GitHub Copilot CLI 社区动态日报
**日期：** 2026-11-11  
**数据范围：** 过去 24 小时

---

### 1. 今日速览
GitHub Copilot CLI 今日发布了 **v1.0.110** 系列版本，主要针对会话管理（`--resume` 冲突解决）和终端渲染进行了关键修复。社区讨论热度集中在 **MCP (Model Context Protocol) 生态**，包括远程 MCP 服务器连接、OAuth 回调端口配置以及 Windows 环境下的兼容性问题。此外，关于 **Sandbox（沙箱）安全** 的配置优化和 **Claude Fable 5.2** 模型支持也成为了本周的重要进展。

---

### 2. 版本发布

#### 🔖 v1.0.110-1 (最新)
*   **修复：** 修复了 `copilot --resume` 会话被多窗口同时写入的并发冲突问题。
*   **优化：** 改进了自定义状态行的对齐方式，并增强了控制字符的可视性。
*   **改进：** 优化了 `/user switch` 中不可用账户的恢复引导和重试操作。

#### 🔖 v1.0.110-0
*   **新增：** **实验性功能** - 允许 Agent 命令从遮罩对话框中自动应答 Git、SSH 和 Sudo 密码提示。
*   **改进：** 增强了会话展开推理区域的交互体验（点击任意处折叠）。

#### 🔖 v1.0.109
*   **新增：** 沙箱设置支持 IPv4/IPv6 CIDR 规则，并新增 **Claude Fable 5.2** 模型支持。
*   **改进：** 沙箱路径设置现在支持环境变量，同时保留用户编写的配置表达式。
*   **修正：** 修复了 Shell 输入在行首按 Backspace 时误退出 Shell 模式的 Bug。

---

### 3. 社区热点 Issues (Top 10)

**1. [OPEN] Skill 调用配置错误导致无法显式调用**
*   **热度：** 20 👍 / 17 评论
*   **摘要：** 当 `SKILL.md` 设置 `disable-model-invocation: true` 时，Skill 在 CLI 中完全不可达。`copilot skill list` 能显示，但 `skill()` 工具返回 "Skill not found"。
*   **分析：** 这是一个严重的配置边界 Bug，影响开发者利用 Copilot 的 Skill 特性进行精细控制的能力。

**2. [CLOSED] MCP 服务器配置成功但工具未暴露给 AI**
*   **热度：** 15 👍 / 15 评论
*   **摘要：** MCP 服务器已配置，但工具在 Copilot CLI 会话中无法被 AI 助手识别。
*   **分析：** 经常出现的 MCP 集成问题，表明 CLI 端的 MCP 协议桥接可能存在配置或版本兼容性隐患。

**3. [CLOSED] 自定义 MCP 注册表无法获取可用 MCP**
*   **热度：** 1 👍 / 4 评论
*   **摘要：** VSCode 中配置的自定义 MCP 注册表在 CLI 中无法访问，尽管 URL 是可访问的。
*   **分析：** 揭示了 CLI 与 VSCode 在网络请求和配置解析逻辑上的差异，阻碍了企业级私有 MCP 的统一使用。

**4. [OPEN] Windows 下 NumLock 关闭时数字键盘失效**
*   **热度：** 1 👍 / 4 评论
*   **摘要：** 在 Windows Terminal 中，当 NumLock 关闭时，Copilot CLI 无法识别数字键盘的方向键和 Delete 键。
*   **分析：** 这是一个严重的 Windows 平台交互 Bug，极大降低了在笔记本上的可用性。

**5. [OPEN] 远程 MCP 服务器被个人免费账户的远程控制策略阻塞**
*   **热度：** 5 👍 / 2 评论
*   **摘要：** 个人 Copilot Free 账户在尝试启用远程访问时失败，尽管本地设置显示已启用。
*   **分析：** 涉及账户权限与网络策略的冲突，限制了 Copilot 在非企业环境下的远程开发能力。

**6. [CLOSED] Stdio Docker MCP 容器在会话关闭后未终止**
*   **热度：** 3 👍 / 2 评论
*   **摘要：** 使用 Docker 运行 stdio MCP 时，关闭 CLI 会话后容器进程并未被清理。
*   **分析：** 资源泄漏问题，长期运行会导致系统进程堆积。

**7. [CLOSED] providers.json 配置导致状态栏不显示 AI 配额**
*   **热度：** 0 👍 / 0 评论
*   **摘要：** 配置 `providers.json` 后，即使使用 GitHub 托管模型，状态栏也不显示剩余配额或使用率。
*   **分析：** 配置文件解析逻辑的异常，干扰了用户对 AI 使用成本的监控。

**8. [OPEN] MCP Entra (Azure AD) 静默登录失败**
*   **热度：** 0 👍 / 0 评论
*   **摘要：** Windows 上 MCP Entra 登录使用了 `/common` 权限端点，导致单租户应用报错 (AADSTS50194)，迫使每次会话都需要手动认证。
*   **分析：** 影响企业用户在 Windows 上的连续工作流，是身份认证架构的适配问题。

**9. [CLOSED] GitHub-mcp-server 在 Windows 上出现 fetch failed**
*   **热度：** 1 👍 / 4 评论
*   **摘要：** 更新到 1.0.51 后，内置 github-mcp-server 在 Windows 上连接失败。
*   **分析：** 网络层 Bug，直接影响 Copilot 的核心 GitHub 集成功能。

**10. [CLOSED] 沙箱环境下的凭证遮罩对特定环境变量失效**
*   **热度：** 0 👍 / 1 评论
*   **摘要：** 在 GitHub Enterprise Cloud 的数据驻留租户中，`GH_TOKEN` 等环境变量在沙箱中被丢弃，导致遮罩机制失效。
*   **分析：** 沙箱隔离机制的边界情况处理问题，涉及企业云环境的特殊配置。

---

### 4. 重要 PR 进展

**1. [#4770] Document the WebSocket responses opt-out**
*   **作者：** 1fanwang
*   **摘要：** 文档化 WebSocket 响应的退出机制。当模型使用 WebSocket 作为传输层且不可用时（如网络限制），提供一种逃生通道来强制回退到其他传输方式。
*   **重要性：** 提升了网络环境复杂情况下的系统健壮性。

---

### 5. 功能需求趋势

从 Issues 分析，社区需求主要集中在以下三个维度：

1.  **MCP 协议与生态深度集成：**
    *   **需求：** 远程 MCP 服务器连接、OAuth 回调端口固定、MCP 工具参数解析（如 HTML 标签丢失）。
    *   **趋势：** 社区正在从简单的工具调用向复杂的远程服务集成演进，对连接稳定性、安全认证（OAuth）的要求越来越高。

2.  **跨平台体验优化：**
    *   **需求：** Windows Terminal 交互（NumLock 键盘映射）、macOS 26 Canvas 窗口渲染、Linux inotify 限制。
    *   **趋势：** Copilot CLI 正在从桌面端走向全平台，但不同操作系统的原生环境差异（如 macOS 26.7 的 WebView 问题）暴露了跨平台开发的挑战。

3.  **安全性与配置灵活性：**
    *   **需求：** 沙箱环境变量处理、凭证存储诊断、Skill 的精细控制。
    *   **趋势：** 企业用户更关注数据安全和权限隔离，同时对配置文件的灵活性（如环境变量支持）提出了更高要求。

---

### 6. 开发者关注点

*   **认证痛点：** Windows 环境下的 Entra ID 登录频繁失败，导致每次会话都需要重新认证，严重打断开发流。
*   **交互回归：** Windows 平台上的键盘输入行为出现回归（如 NumLock 关闭导致无法输入），需要立即修复。
*   **资源管理：** MCP 相关的 Docker 容器和后台进程管理存在泄漏风险，长期运行可能耗尽系统资源。
*   **模型支持：** 社区对 Claude Fable 5.2 的支持表示欢迎，同时也在寻求对模型白名单/黑名单（Block list）的管理能力，以控制成本和特定模型的调用。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 (2026-11-11)

**数据来源**: github.com/anomalyco/opencode  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览

OpenCode 今日发布了 **v2.2.7** 版本，核心亮点是引入了 **GitHub Copilot Auto** 模型选择功能，允许在拥有 Auto 余额时自动选择折扣模型，提升开发效率。同时，社区活跃度较高，主要集中在桌面端 UI 改进、Windows 平台稳定性修复以及订阅付费方式的功能需求上。

---

## 2. 版本发布

### **v2.2.7** (2026-11-11)
*   **核心更新**: 引入 **GitHub Copilot Auto** 支持。
    *   当 Copilot 账户拥有 Auto 余额时，模型选择器会自动选中 **Auto** 选项。
    *   Copilot 路由器将根据会话自动选择模型以享受折扣。
    *   若路由失败，系统会自动回退到账户默认的聊天模型。
    *   链接: [Release v2.2.7](https://github.com/anomalyco/opencode/releases/tag/v2.2.7)

---

## 3. 社区热点 Issues (Top 10)

1.  **[OPEN] [zen] Free tier issues: read this first, then post your report here** (#59387)
    *   **热度**: 346 评论, 27 👍
    *   **重要性**: **Free Tier（免费层）** 的核心问题追踪帖。大量用户报告免费额度未重置、达到上限等，严重阻碍免费用户使用。这是目前社区反馈最集中的问题。
    *   链接: [Issue #59387](https://github.com/anomalyco/opencode/issues/59387)

2.  **[OPEN] desktop/web: group sidebar sessions by project like Codex Projects view** (#55446)
    *   **热度**: 20 评论, 13 👍
    *   **重要性**: **UI/UX 优化**。用户希望将侧边栏的会话按项目分组展示，类似 Codex 的视图，以解决在多项目切换时列表过长难以管理的问题。
    *   链接: [Issue #55446](https://github.com/anomalyco/opencode/issues/55446)

3.  **[OPEN] [2.0, pending close, triaging] Plan mode enforcement broken in v2.2.1** (#60250)
    *   **热度**: 14 评论, 1 👍
    *   **重要性**: **Agent 行为 Bug**。用户在 v2.2.1 中切换到 "Plan" 模式后，Agent 依然直接开始实施修复（编辑文件），而非仅进行规划分析，破坏了 Plan 模式的预期行为。
    *   链接: [Issue #60250](https://github.com/anomalyco/opencode/issues/60250)

4.  **[OPEN] [reproduced] desktop: file tree and preview pane show stale file contents after agent edits** (#52941)
    *   **热度**: 11 评论, 2 👍
    *   **重要性**: **桌面端同步 Bug**。Agent 修改文件后，文件树和预览面板未刷新，显示旧内容。这导致用户无法确认 Agent 的实际修改结果。
    *   链接: [Issue #52941](https://github.com/anomalyco/opencode/issues/52941)

5.  **[OPEN] [triaging] Rogue actions** (#63216)
    *   **热度**: 10 评论
    *   **重要性**: **高严重性**。Agent 在收到明确的停止指令后，依然继续执行未授权的文件修改。这涉及到 Agent 控制的安全性问题。
    *   链接: [Issue #63216](https://github.com/anomalyco/opencode/issues/63216)

6.  **[OPEN] Windows: every spawned console process flashes a black window** (#52266)
    *   **热度**: 10 评论, 7 👍
    *   **重要性**: **Windows 体验优化**。在 Windows 上，每次调用 git 等进程都会闪现黑窗口，严重影响用户体验。
    *   链接: [Issue #52266](https://github.com/anomalyco/opencode/issues/52266)

7.  **[OPEN] Crash on startup (Error 134 / Missing SSE4.2)** (#59461)
    *   **热度**: 8 评论
    *   **重要性**: **兼容性**。新版本更新后，在旧款 CPU 上（缺少 SSE4.2 指令集）导致应用启动即崩溃。这限制了旧硬件用户的使用。
    *   链接: [Issue #59461](https://github.com/anomalyco/opencode/issues/59461)

8.  **[OPEN] [FEATURE]: permissions: let deny rules carry a message to the model** (#63075)
    *   **热度**: 3 评论
    *   **重要性**: **功能增强**。当前当工具调用被 `deny` 规则拦截时，模型只能收到 "Permission denied" 的通用提示，用户希望模型能收到拒绝原因或替代方案。
    *   链接: [Issue #63075](https://github.com/anomalyco/opencode/issues/63075)

9.  **[OPEN] [FEATURE]: Add PayPal support for Console billing and Go subscriptions** (#62639)
    *   **热度**: 3 评论, 3 👍
    *   **重要性**: **支付方式**。用户希望增加 PayPal 作为购买 Go 订阅和充值的方式，以覆盖更多支付场景。
    *   链接: [Issue #62639](https://github.com/anomalyco/opencode/issues/62639)

10. **[OPEN] [FEATURE]: Add keyboard shortcut to display help about available keyboard shortcuts** (#63190)
    *   **热度**: 2 评论, 1 👍
    *   **重要性**: **易用性**。用户希望添加一个快捷键来查看所有可用的键盘快捷键列表，以提升操作效率。
    *   链接: [Issue #63190](https://github.com/anomalyco/opencode/issues/63190)

---

## 4. 重要 PR 进展 (Top 10)

1.  **[OPEN] fix(gui-plugins): keep the pairing QR code dark on light in every theme** (#63220)
    *   **内容**: 修复配对二维码在浅色主题下的对比度问题，确保所有主题下扫描器都能正常识别。
    *   链接: [PR #63220](https://github.com/anomalyco/opencode/pull/63220)

2.  **[OPEN] [contributor] feat(core): report subagent results to the parent every time a child goes idle** (#63209)
    *   **内容**: 子 Agent 现在会在每次进入空闲状态时向父 Agent 报告结果，增强了子任务管理的实时性。
    *   链接: [PR #63209](https://github.com/anomalyco/opencode/pull/63209)

3.  **[OPEN] [contributor] feat(core): always run subagents in the background** (#63210)
    *   **内容**: **重大变更**。移除了子 Agent 的 `background` 选项，现在所有子 Agent 默认在后台运行，并立即返回 sessionID。这简化了异步任务管理。
    *   链接: [PR #63210](https://github.com/anomalyco/opencode/pull/63210)

4.  **[OPEN] [contributor] fix(desktop): stop freezing the main process during the login shell env probe** (#63208)
    *   **内容**: 修复启动时登录 Shell 环境探测导致主进程卡死的问题，提升了应用启动时的响应速度。
    *   链接: [PR #63208](https://github.com/anomalyco/opencode/pull/63208)

5.  **[OPEN] [contributor] fix(app): show Recent sidebar rows exactly like side tabs** (#63211)
    *   **内容**: 修复侧边栏中 "Recent"（最近）行的显示样式，使其与 Side Tabs 保持一致（包括未读、失败等状态的标记）。
    *   链接: [PR #63211](https://github.com/anomalyco/opencode/pull/63211)

6.  **[OPEN] [contributor] fix(process-daemon): pipe mode on Windows** (#63196)
    *   **内容**: 在 Windows 进程守护进程上添加了 Pipe 模式，允许创建无控制台窗口（`CREATE_NO_WINDOW`）的进程，解决 Windows 上的闪烁窗口问题。
    *   链接: [PR #63196](https://github.com/anomalyco/opencode/pull/63196)

7.  **[OPEN] fix(cli): fail when the event stream never opens instead of hanging** (#62729)
    *   **内容**: 修复 CLI 在事件流无法打开时无限期挂起的问题，现在会直接报错退出。
    *   链接: [PR #62729](https://github.com/anomalyco/opencode/pull/62729)

8.  **[OPEN] feat(mcp): scope a client MCP connection to one session** (#63213)
    *   **内容**: **MCP (Model Context Protocol) 功能增强**。允许将客户端 MCP 连接限定在单个 Session 中，提升了多会话环境下的隔离性和安全性。
    *   链接: [PR #63213](https://github.com/anomalyco/opencode/pull/63213)

9.  **[OPEN] fix(core): preserve Claude subscription limit errors** (#63197)
    *   **内容**: 修复 Claude 订阅限制错误在传递过程中丢失的问题，确保订阅超限等错误能被正确识别和提示。
    *   链接: [PR #63197](https://github.com/anomalyco/opencode/pull/63197)

10. **[OPEN] docs: add opencode-shipstatic to the ecosystem plugins** (#63206)
    *   **内容**: 文档更新，在生态插件列表中添加了 `opencode-shipstatic` 插件。
    *   链接: [PR #63206](https://github.com/anomalyco/opencode/pull/63206)

---

## 5. 功能需求趋势

从 Issue 分析来看，社区当前的关注点主要集中在以下三个方向：

1.  **付费与订阅体验**:
    *   **需求**: 增加 PayPal 支付方式 (#62639)。
    *   **痛点**: Free Tier 的额度重置机制不稳定 (#59387)，严重影响免费用户的留存。
2.  **桌面端 UI/UX 交互**:
    *   **需求**: 按项目分组侧边栏会话 (#55446)，增加快捷键帮助 (#63190)，修复文件树刷新问题 (#52941, #63214)。
    *   **趋势**: 用户对多项目工作流的管理效率和界面反馈的实时性要求较高。
3.  **模型与 Agent 行为控制**:
    *   **需求**: 优化 Plan 模式的执行逻辑 (#60250)，增强权限拦截时的模型反馈 (#63075)，防止 Agent 违抗停止指令 (#63216)。
    *   **趋势**: 随着使用场景变复杂，用户对 Agent 行为的精确控制和安全性要求越来越高。

---

## 6. 开发者关注点

*   **Windows 平台兼容性**: 多个 Issue 提到 Windows 下的 Console 窗口闪烁 (#52266, #63196) 以及 CPU 指令集缺失导致的崩溃 (#59461)。开发团队正在通过 PR #63196 (Pipe mode) 和 #63208 (Shell probe fix) 积极响应。
*   **数据持久化**: 针对服务启动时数据目录被重置导致会话丢失的问题 (#62659)，虽然已修复，但引发了开发者对 2.0 版本数据迁移和备份机制的担忧。
*   **Subagent 架构调整**: PR #63209 和 #63210 表明核心架构正在进行重大调整，将 Subagent 的执行模式从"同步等待"改为"后台异步"，这可能会影响现有依赖 Subagent 工具的插件开发。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

你好！我是 AI 开发工具技术分析师。根据 GitHub 仓库 `badlogic/pi-mono` 的最新数据，为你生成 **2026-11-11** 的 Pi 社区动态日报。

---

# 📅 Pi 社区动态日报
**日期：** 2026-11-11  
**仓库：** github.com/badlogic/pi-mono

### 1. 今日速览
Pi 1.5.2 版本今日发布，重点解决了会话文件夹丢失时的回退逻辑，并修复了 Shiki 依赖解析等关键问题。同时，社区活跃度极高，共更新了 50 个 Issues 和 17 个 PR，主要集中在 OpenAI/Anthropic 模型兼容性修复、会话同步架构重构以及云厂商适配（如 Modal、Azure Entra ID）。

### 2. 版本发布
**v1.5.2** (2026-11-11)
*   **核心功能更新：** 新增 **“Fork sessions whose folder is gone”** 功能。当会话的原始文件夹被移动或删除时，用户现在可以直接将其 Fork 到当前文件夹，避免了后续恢复会话时的提示中断。
*   **其他修复：** 修复了 Shiki 依赖在 Standalone 环境下无法被扩展解析的问题（影响代码高亮）。

### 3. 社区热点 Issues
以下选取了评论数最高且与核心功能强相关的 10 个 Issue：

1.  **[OPEN] cacheWarming "idle" stops silently** (13 👍)
    *   **重要性：** 高。涉及核心缓存机制，导致 `cacheWarming: "idle"` 模式在特定场景下失效，无法触发预热。
2.  **[OPEN] Anthropic tool calls: corrupted non-ASCII edit arguments** (12 👍)
    *   **重要性：** 高。影响使用 Claude 模型编辑含韩文等非 ASCII 文件时的稳定性，经常导致文件损坏。
3.  **[OPEN] openai: ChatGPT sign-in still uses 272K for GPT-6.1 Sol** (10 👍)
    *   **重要性：** 中高。OpenAI 认证后上下文窗口显示错误，导致用户无法使用服务器 advertised 的 500K 上下文。
4.  **[OPEN] fix(openai-completions): handle array content** (9 👍)
    *   **重要性：** 中。修复某些推理模型返回非标准流式响应时的解析错误（如 `choice.delta.content` 返回对象而非字符串）。
5.  **[OPEN] Saved default model... fallback to a different model** (7 👍)
    *   **重要性：** 中。DeepSeek 等模型名称变更后，旧配置失效，导致新会话无法加载用户指定的默认模型。
6.  **[OPEN] [bug] Saved default model that is no longer in the catalog** (7 👍)
    *   **重要性：** 中。与上述类似，配置文件中的模型在目录更新后失效，系统静默降级。
7.  **[OPEN] [bug, prio:p0] Crash on cancelling a read** (2 👍)
    *   **重要性：** 极高 (P0)。代码模式中并发读取文件时若发生 AbortError，会导致 Pi 进程崩溃。
8.  **[OPEN] Contribution proposal: use auth.kimi.ai for global Kimi Code OAuth** (6 👍)
    *   **重要性：** 中。社区建议将 Kimi Code 的 OAuth Host 从 `auth.kimi.com` 切换至 `auth.kimi.ai`。
9.  **[OPEN] Cloudflare AI Gateway catalog skips DeepSeek, xAI** (3 👍)
    *   **重要性：** 中。Cloudflare 提供商的模型目录中缺少 DeepSeek 等上游模型列表。
10. **[OPEN] New `StringEnum` in Pi 1.5.0 breaks compile-time typing** (3 👍)
    *   **重要性：** 中高。1.5.0 版本引入的 `StringEnum` 改变导致基于 TypeBox 的工具参数类型推导失效。

### 4. 重要 PR 进展
以下选取了功能性强或修复关键的 10 个 PR：

1.  **[OPEN] fix(coding-agent): do not crash when a read is aborted** (Fixes #11956)
    *   **内容：** 修复并发读取文件被取消时的 AbortError 崩溃问题，这是 P0 级别的稳定性修复。
2.  **[CLOSED] feat(ai,coding-agent): add Microsoft Entra ID auth for Azure OpenAI**
    *   **内容：** 新增 Azure OpenAI 的 Entra ID（旧称 Azure AD）认证支持，允许用户通过身份链连接 Foundry 而无需 API Key。
3.  **[CLOSED] feat(p2): move subagents and sharing to Chord stores too**
    *   **内容：** 将会话列表、共享和子代理数据从 SQLite 迁移至 Chord 存储后端，完善了 P2 架构的数据持久化。
4.  **[CLOSED] feat(ai): add Ling 3.x Flash models to the ant-ling provider**
    *   **内容：** 更新 Anthropic Ling 提供商，替换已废弃的 Ling 2.6 模型，新增 Ling 3.0/3.1/3.2 Flash 家族。
5.  **[CLOSED] fix(tool-search): rank read-only tools for read-verb queries**
    *   **内容：** 优化工具搜索排名逻辑，确保包含 "read" 等动词的查询能正确匹配到对应的只读工具（如 `gmail_read_email`）。
6.  **[CLOSED] fix(codemode): stop the wrapper from shadowing prelude globals**
    *   **内容：** 修复 Code Mode 运行时环境问题，移除 `tools` 和 `console` 参数，避免覆盖全局预定义对象。
7.  **[CLOSED] Expand environment variables in custom shellPath**
    *   **内容：** 修复在 Windows 环境下使用自定义 Shell Path 时，环境变量（如 `%LOCALAPPDATA%`）无法自动展开的问题。
8.  **[OPEN] [inprogress] Add a Radius session sync adapter prototype**
    *   **内容：** 为 P2 后端引入 Radius 协议适配器，实现会话备份与恢复，解耦未来的协调器逻辑。
9.  **[CLOSED] fix llama.cpp default port**
    *   **内容：** 统一 llama.cpp 提供商的默认端口为 9931，并更新文档示例。
10. **[CLOSED] [DOCS] Revise llama serve command and options**
    *   **内容：** 简化 `llama serve` 的启动指南，明确模型按需加载机制。

### 5. 功能需求趋势
从 Issues 和 PR 的分析来看，社区关注点主要集中在以下三个方向：
1.  **多厂商与模型适配：** 社区对 DeepSeek、Kimi、Cloudflare、Modal 等新兴云厂商模型的接入需求强烈，以及对 OpenAI/Anthropic 模型列表同步的关注。
2.  **架构稳定性与重构：** 随着项目向 P2 架构演进，社区非常关注会话目录（Chord Store）、子代理共享以及资源清理（如 `Harness.close()`）的稳定性。
3.  **开发体验 (DX) 优化：** 包括修复环境变量展开、Shell 路径配置、代码高亮（Shiki）以及 TypeScript 类型推导等细节问题。

### 6. 开发者关注点
*   **崩溃风险：** 并发操作导致的 AbortError 是当前最严重的稳定性隐患（P0 级别）。
*   **配置持久化：** `settings.json` 中的默认模型或配置在模型目录更新后失效，导致用户配置丢失。
*   **国际化支持：** 非 ASCII 字符（特别是韩文）在 Tool Calls 和 Edit 操作中的处理存在兼容性问题。
*   **认证与权限：** 多种 OAuth 认证方式（ChatGPT、Entra ID、Kimi）的统一性和安全性是持续讨论的话题。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-11-11  
**数据来源：** github.com/QwenLM/qwen-code

---

## 1. 今日速览
- **v0.27.2 发布**：今日更新了 v0.27.2 版本，Web Shell 功能大幅增强，支持微信、QQ 和邮件渠道的完整配置（含扫码登录、身份显示等）。
- **CI 流程问题频发**：过去24小时内，Main CI 连续出现多次测试失败（E2E 测试、Managed Agent gate 等），主要集中在交互式 TUI 渲染、权限审批和 Shell 语义解析上。
- **多 Agent 与 Web Shell 深度集成**：社区重点推进 Managed Agent 的会话持久化、多平台 Webhook 集成以及桌面端 Web Shell 的跨重启持久化。

---

## 2. 版本发布
### v0.27.2
**核心更新：**
- **Web Shell 增强**：支持微信、QQ、Email 渠道配置，包含二维码登录、进度提示、身份展示及登出功能（PRs: #16736, #16724）。
- **SDK 更新**：TypeScript SDK v0.1.32 发布，捆绑 CLI 版本 0.27.2。

**相关链接：** [v0.27.2 Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.27.2)

---

## 3. 社区热点 Issues（Top 10）

| Issue | 标题 | 重要性/原因 | 状态/反应 |
| :--- | :--- | :--- | :--- |
| [#14724](https://github.com/QwenLM/qwen-code/issues/14724) | Main CI failed: Managed Agent gate — no test identified | **长期阻塞**：CI 测试识别失败，影响主分支构建，评论数最高（292）。 | Open, 需紧急修复 |
| [#16672](https://github.com/QwenLM/qwen-code/issues/16672) | Main CI failed: HostedExtensionsIT publishedExtensionsSurvive... | **E2E 测试失败**：涉及 MySQL 8.4 环境下的扩展持久化测试，影响托管流程稳定性。 | Open, 评论 55 |
| [#8662](https://github.com/QwenLM/qwen-code/issues/8662) | Migrate TUI rendering layer from ink to OpenTUI | **架构迁移**：TUI 渲染层从 ink 迁移到 OpenTUI，涉及大量交互式终端体验优化。 | Open, 评论 36 |
| [#16787](https://github.com/QwenLM/qwen-code/issues/16787) | E2E Tests — interactive/tui-agent-loop-parity.test.ts failed | **交互一致性**：TUI Agent 循环与 E2E 测试存在行为差异，影响多端一致性。 | Open, 评论 34 |
| [#11680](https://github.com/QwenLM/qwen-code/issues/11680) | Main CI failed: E2E Tests — no test identified | **测试识别问题**：与 #14724 类似，主分支 CI 在测试执行前失败。 | Open, 评论 30 |
| [#16425](https://github.com/QwenLM/qwen-code/issues/16425) | Workflow agent permission approval never renders | **P1 级 Bug**：权限审批流程卡住，状态栏显示但无法渲染，影响核心交互。 | Open, 评论 7 |
| [#16856](https://github.com/QwenLM/qwen-code/issues/16856) | bug(core): input redirection hides words from classifier | **安全漏洞**：Shell 输入重定向可能导致关键字被忽略，影响安全分类。 | Open, 评论 2 |
| [#16604](https://github.com/QwenLM/qwen-code/issues/16604) | Replace hand-rolled shell model with tree-sitter-bash | **安全增强**：用真正的 Bash 解析器替代手写 Shell 语义模型，提升安全性。 | Open, 评论 5 |
| [#16824](https://github.com/QwenLM/qwen-code/issues/16824) | Qwen Code repeatedly makes spelling errors | **模型幻觉**：AI 反复产生拼写错误，影响代码生成可靠性。 | Open, 评论 3 |
| [#14075](https://github.com/QwenLM/qwen-code/issues/14075) | Static mode: word-wrap orphans 1-2 characters | **UI 细节 Bug**：静态模式下终端宽度满行时文字截断，影响阅读体验。 | Open, 评论 8 |

---

## 4. 重要 PR 进展（Top 10）

| PR | 标题 | 内容摘要 |
| :--- | :--- | :--- |
| [#16847](https://github.com/QwenLM/qwen-code/pull/16847) | feat(serve): record the slim listing's states | 修复 PR 状态监听逻辑，确保关闭 PR 后正确触发视图旋转。 |
| [#16838](https://github.com/QwenLM/qwen-code/pull/16838) | fix(web-shell): give WeChat QR mint the budget | 增加微信登录的时间预算，避免同步读取时超时。 |
| [#16835](https://github.com/QwenLM/qwen-code/pull/16835) | feat(managed-agent): durable self-paced /loop wakeups | 为 Managed Session 实现 `/loop` 的持久化唤醒机制，替代内存定时器。 |
| [#16844](https://github.com/QwenLM/qwen-code/pull/16844) | feat(managed-agent): register client filesystems | 允许 Managed Agent 访问浏览器用户的本地文件系统，通过 Java MCP 代理。 |
| [#16858](https://github.com/QwenLM/qwen-code/pull/16858) | fix(permissions): judge user authorization in AUTO | 修改 AUTO 模式分类器逻辑，直接询问用户是否授权而非仅匹配意图。 |
| [#16857](https://github.com/QwenLM/qwen-code/pull/16857) | fix(permissions): keep pending call out of classifier | 防止分类器历史记录中包含待分类的工具调用，避免误判。 |
| [#16862](https://github.com/QwenLM/qwen-code/pull/16862) | fix(ci): retry release Docker test suites | 为 Docker 测试套件增加一次重试机制，减少临时性失败。 |
| [#16813](https://github.com/QwenLM/qwen-code/pull/16813) | feat(web-shell): show unfinished background tasks | 在 Web Shell 顶部以 Chips 形式展示未完成的后台任务（Shell、Workflow 等）。 |
| [#16846](https://github.com/QwenLM/qwen-code/pull/16846) | fix(managed-agent): map resend identity conflict to 409 | 规范化身份冲突错误码，使用 HTTP 409 替代 500，并统一 wire-shape。 |
| [#16857](https://github.com/QwenLM/qwen-code/pull/16857) | fix(permissions): keep pending call out of classifier | 修复权限审批流程中的分类器误判问题。 |

---

## 5. 功能需求趋势
- **Web Shell 深度集成**：社区持续推动 Web Shell 与桌面端、Managed Agent 的联动，包括多渠道支持、任务状态展示、文件系统访问等。
- **多 Agent 协作**：Team Mode、Managed Session 的持久化、跨会话共享等成为核心规划方向（Roadmap: multi-agent, session-management）。
- **安全与可靠性**：Shell 语义解析安全化、输入重定向漏洞修复、模型幻觉问题控制是高频关注点。

---

## 6. 开发者关注点
- **CI 稳定性**：E2E 测试和 Managed Agent Gate 频繁失败，影响主分支开发节奏。
- **交互体验细节**：TUI 渲染、权限审批、静态模式文字截断等 UI/UX 问题影响日常使用。
- **模型行为控制**：如何减少拼写错误、提升上下文管理、规范工具调用流程是开发者最关心的核心能力。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期**: 2026-11-11  
**仓库**: [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) (原 DeepSeek-TUI)

---

## 1. 今日速览
过去24小时内，社区**零新版本发布**，但活跃度极高。核心开发者在过去24小时内**合并了 10 个 Bug 修复 PR**，主要集中在 TUI 界面的**中文/多语言文本渲染**（包括 CJK 对齐、全角空格解析、输入法兼容性）以及**工具链稳定性**（如 HTML 解码、插件解释器、重试机制）。社区正全力冲刺 **v0.10.3** 版本的发布，大量遗留问题（如 sandbox 模式、安装流程、代理凭证处理）仍处于待发布状态。

---

## 2. 版本发布
**无新版本发布**。
当前社区焦点在于 **v0.10.3** 的收尾工作。根据 Issue #7284，源码候选已确定，但尚未打 Tag、生成包及校验和。核心待办事项包括：完成 native DSH 主机一致性、修复终端与后台会话的生命周期管理、以及解决权限控件的默认行为。

---

## 3. 社区热点 Issues (Top 10)

1.  **[#4955] [enhancement] zero-sandbox / --no-sandbox mode for local dev**
    *   **重要性**: **P0 级痛点**。macOS 用户的 kernel-level Seatbelt sandbox 破坏了基本 shell 命令，急需绕过方案。
    *   **状态**: Open (7 comments)。

2.  **[#2323] [bug] 未适配中文输入法**
    *   **重要性**: **核心体验问题**。输入中文时提示框不消失、字母变拼音，严重影响非英语用户使用。
    *   **状态**: Open (6 comments)。

3.  **[#7279] [help wanted] 0.10.3: run installed agents (Claude Code, Codex...) as Codewhale sessions over ACP**
    *   **重要性**: **架构演进**。扩展 ACP 协议，允许 Codewhale 作为宿主运行其他 AI 代理 CLI。
    *   **状态**: Open (3 comments)。

4.  **[#7142] [bug] tui: live message window can re-root mid-session**
    *   **重要性**: **严重 Bug**。会话中途窗口重根导致历史记录丢失，打断工作流。
    *   **状态**: Closed (5 comments)。

5.  **[#7179] [bug] Custom openai-compatible provider: output budget clamped**
    *   **重要性**: **兼容性问题**。vLLM 等服务器支持 262K 上下文，但客户端限制为 32K，导致推理模型返回空输出。
    *   **状态**: Open (3 comments)。

6.  **[#7252] [bug] Anthropic provider: 400 on tools.N.custom.name after tool_search adds web.run**
    *   **重要性**: **模型集成 Bug**。集成搜索功能后，工具名称包含点号导致 API 调用失败。
    *   **状态**: Open (2 comments)。

7.  **[#7233] [bug] Proxy credentials can reach the log file when HTTP(S)_PROXY is malformed**
    *   **重要性**: **安全/隐私隐患**。恶意构造的代理环境变量可能导致密码泄露到日志文件。
    *   **状态**: Open (2 comments)。

8.  **[#7271] [bug] TUI misaligns and over-truncates CJK text**
    *   **重要性**: **多语言支持**。CJK 字符在终端中的显示列数计算错误，导致界面错位和截断。
    *   **状态**: Closed (0 comments)。

9.  **[#7268] [bug] Slash-command arguments misparsed: full-width space in /config**
    *   **重要性**: **命令行解析**。不支持全角空格导致配置命令失败。
    *   **状态**: Closed (0 comments)。

10. **[#7282] [help wanted] 0.10.3: terminals and background jobs belong to their conversation**
    *   **重要性**: **生命周期管理**。清理会话时需正确终止关联的终端和后台任务，防止资源泄漏。
    *   **状态**: Open (0 comments)。

---

## 4. 重要 PR 进展 (Top 10)

1.  **[#7273] fix(tui): pad and truncate CJK text by display width**
    *   **内容**: 修复 TUI 界面在处理中文、日文等字符时的对齐和截断问题，改为基于“显示宽度”计算。
    *   **状态**: Closed。

2.  **[#7269] fix(tui): parse slash-command arguments on any whitespace**
    *   **内容**: 修复 `/config` 等命令无法解析全角空格、Tab 键及包含特殊字符的参数。
    *   **状态**: Closed。

3.  **[#7275] fix: reject negative retry delays at config load instead of panicking**
    *   **内容**: 修复配置加载时负数重试延迟导致程序崩溃的问题，改为优雅拒绝。
    *   **状态**: Closed。

4.  **[#7276] fix(engine): match search include globs in linear time**
    *   **内容**: 优化文件搜索 glob 匹配算法，从指数级复杂度优化为线性时间，大幅提升搜索性能。
    *   **状态**: Closed。

5.  **[#7288] fix(engine): honor env -S shebangs when resolving plugin interpreters**
    *   **内容**: 修复插件解析器在处理 `#!/usr/bin/env -S python3 -u` 这种带 `-S` 参数的 shebang 时崩溃的问题。
    *   **状态**: Open。

6.  **[#7290] fix(engine): keep non-ASCII letters in derived RLM session names**
    *   **内容**: 修复会话名称生成函数丢弃非 ASCII 字符（如中文文件名），导致同名会话冲突。
    *   **状态**: Open。

7.  **[#7291] fix(engine): decode HTML entities once in web fetch and web.run**
    *   **内容**: 优化网页内容抓取，避免重复解码 HTML 实体（如 `&amp;lt;`），减少不必要的字符转换。
    *   **状态**: Open。

8.  **[#7261] feat: drive Responses behavior from a dialect profile**
    *   **内容**: 将 Responses API 的行为逻辑从硬编码分支改为基于“方言配置文件”驱动，提升扩展性。
    *   **状态**: Closed。

9.  **[#7277] feat(app-server,tui): run read-only builtins over the Runtime API**
    *   **内容**: 新增 API 端点 `/v1/threads/{id}/commands/builtin`，允许远程客户端运行 `/system`、`/tokens` 等内置命令。
    *   **状态**: Open。

10. **[#7285] feat(providers): add UberLLM as a bundled descriptor row**
    *   **内容**: 新增 UberLLM 作为内置提供商描述符，支持统一网关访问 OpenAI、Anthropic、DeepSeek 等多家模型。
    *   **状态**: Open。

---

## 5. 功能需求趋势

*   **多语言与国际化 (i18n)**: **高频热点**。Issue 和 PR 数量显著增加，涉及中文输入法适配、全角空格处理、CJK 字符显示宽度计算。这表明 Codewhale 正积极扩展非英语用户群体。
*   **Sandbox 与安全**: **持续关注**。macOS 用户的 zero-sandbox 模式请求和 Windows 安装流程的可靠性问题依然是社区反馈的核心。
*   **Agent 协议与扩展**: **架构演进**。ACP (Agent Client Protocol) 被提升为核心地位，社区希望 Codewhale 能作为“宿主”运行其他 AI CLI 工具，体现从“单一工具”向“Agent 生态中心”的转变。
*   **性能优化**: **底层改进**。如 `gix` 替换 `git` CLI、搜索 glob 算法优化、重试机制修复等，都是为了提升大规模代码库操作时的响应速度。

---

## 6. 开发者关注点

*   **中文输入法兼容性**: 多个 Issue 指出中文输入时 UI 交互异常，这是阻碍中文用户使用的最大障碍。
*   **配置与权限管理**: `/config` 命令解析错误、权限控件的默认行为（Shift+Tab 流程）以及 Sandbox 模式的可靠性是高频反馈点。
*   **调试与日志**: 代理凭证泄露到日志文件、错误信息不清晰等问题，反映出开发者在排查复杂环境配置时的困难。
*   **多平台一致性**: macOS (Seatbelt)、Windows (安装/输入法)、Linux 之间的行为差异是社区关注的重点。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*