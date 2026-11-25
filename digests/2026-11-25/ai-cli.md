# AI CLI 工具社区动态日报 2026-11-25

> 生成时间: 2026-11-25 03:15 UTC | 覆盖工具: 9 个

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

**数据截止日期**: 2026-11-25  
**分析范围**: anthropics/skills 官方仓库

---

## 1. 热门 Skills 排行

基于 Issues 讨论热度与功能关注度，以下为社区最活跃的 Skills：

### 1.1 `mcp-builder` (PR #1742)
- **功能**: MCP (Model Context Protocol) 服务器构建工具，支持自定义 HTTP 头和流式传输
- **社区热点**: 修复 `mcp>=2.0` 升级后的 API 变更（`streamablehttp_client` 重命名为 `streamable_http_client`）
- **状态**: 🟠 Open
- **链接**: [anthropics/skills PR #1742](https://github.com/anthropics/skills/pull/1742)

### 1.2 `skill-creator` (PR #1298)
- **功能**: 自动化 Skill 开发与测试框架
- **社区热点**: 解决 Windows 环境下触发器评估竞争条件与子进程失败处理问题
- **状态**: 🟠 Open
- **链接**: [anthropics/skills PR #1298](https://github.com/anthropics/skills/pull/1298)

### 1.3 `docx` (PR #1792)
- **功能**: Word 文档自动化处理（如接受更改、合并运行）
- **社区热点**: 修复 LibreOffice 超时检测与 XML 验证逻辑
- **状态**: 🟠 Open
- **链接**: [anthropics/skills PR #1792](https://github.com/anthropics/skills/pull/1792)

### 1.4 `webapp-testing` (PR #1980)
- **功能**: Web 应用自动化测试工具
- **社区热点**: 移除 Shell 注入风险（`shell=True` → 参数化调用）
- **状态**: 🟠 Open
- **链接**: [anthropics/skills PR #1980](https://github.com/anthropics/skills/pull/1980)

### 1.5 `xlsx` (PR #2019)
- **功能**: Excel 文件处理与公式验证
- **社区热点**: 修复工作表级命名空间与外部链接检测逻辑
- **状态**: 🟠 Open
- **链接**: [anthropics/skills PR #2019](https://github.com/anthropics/skills/pull/2019)

### 1.6 `md2video-audio` (PR #1703)
- **功能**: Markdown 转 MP4 视频（带语音合成）
- **社区热点**: 新增零成本 Skill，支持 Marp 幻灯片渲染与 AI 语音
- **状态**: 🟠 Open
- **链接**: [anthropics/skills PR #1703](https://github.com/anthropics/skills/pull/1703)

### 1.7 `pyxel` (PR #525)
- **功能**: Python 复古游戏开发框架
- **社区热点**: 支持 Pyxel 引擎的调试与帧级状态检查
- **状态**: 🟠 Open
- **链接**: [anthropics/skills PR #525](https://github.com/anthropics/skills/pull/525)

---

## 2. 社区需求趋势

从 Issues 中提炼出以下核心需求方向：

### 2.1 安全与信任边界
- **议题**: `anthropic/` 命名空间下的社区 Skill 可能被误认为官方 Skill
- **影响**: 用户可能被诱导授予 elevated permissions
- **讨论**: [Issue #492](https://github.com/anthropics/skills/issues/492)

### 2.2 团队协作增强
- **需求**: org-wide 技能共享（如 Slack/Teams 直接分享）
- **痛点**: 当前需手动下载/上传，流程繁琐
- **讨论**: [Issue #228](https://github.com/anthropics/skills/issues/228)

### 2.3 评估框架稳定性
- **问题**: `run_eval.py` 在多 Worker 模式下触发率统计错误（接近 0%）
- **影响**: Skill 开发者无法准确评估触发条件
- **讨论**: [Issue #1352](https://github.com/anthropics/skills/issues/1352)

### 2.4 文档与用户体验
- **需求**: 邮箱地址修改功能（竞品已支持）
- **背景**: Claude 平台账号锁定，数据丢失风险高
- **讨论**: [Issue #1143](https://github.com/anthropics/skills/issues/1143)

---

## 3. 高潜力待合并 Skills

以下 PR 虽未合并但评论活跃，近期可能落地：

| PR | Skill | 核心价值 | 潜在风险 |
|---|---|---|---|
| #1298 | skill-creator | 修复 Windows 触发器评估 | 跨平台兼容性 |
| #1742 | mcp-builder | 支持 MCP 2.0 协议 | 依赖库升级 |
| #1792 | docx | LibreOffice 超时检测 | 外部工具稳定性 |
| #1980 | webapp-testing | 移除 Shell 注入 | 测试覆盖率 |

---

## 4. Skills 生态洞察

**当前社区最集中的诉求是“安全性与稳定性改进”**，尤其在以下领域：

1. **安全加固**: 消除命令注入风险（`webapp-testing`）、防止信任边界滥用（命名空间问题）
2. **跨平台兼容**: Windows 环境下的子进程处理与触发器评估
3. **文档准确性**: 替换死链、修复 YAML 解析错误（`skill-creator`）

> **一句话总结**: 社区正从“功能创新”转向“工程化治理”，聚焦安全、兼容性与可靠性提升。

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

你好！我是专注于 AI 开发工具的技术分析师。以下是针对 GitHub Copilot CLI 项目的 2026-11-25 社区动态日报。

---

# GitHub Copilot CLI 社区动态日报
**日期：** 2026-11-25
**数据来源：** github.com/github/copilot-cli

## 1. 今日速览
- **版本迭代活跃：** 项目在过去24小时内密集发布了 v1.0.116 的三个小版本（-3, -2, -1），主要聚焦于 MCP（Model Context Protocol）服务器的连接管理、Unix 平台的前台任务取消修复以及用户体验细节优化。
- **MCP 生态焦点：** 社区讨论高度集中在 MCP 服务器的连接冲突警告、OAuth 认证以及 sandbox（沙箱）功能的稳定性上，反映出开发者正在深入集成 Copilot CLI 与外部工具链。
- **平台兼容性：** Windows（CRLF 换行符、NumLock 导航）和 macOS（TLS 1.3、Mach 服务）的兼容性问题是目前社区反馈的重点，显示出多平台环境下的适配仍在持续完善中。

## 2. 版本发布
### v1.0.116-3 (最新)
**发布时间：** 2026-11-25 (过去24小时内)
**主要更新：**
- **用户体验 (UX) 优化：** 增加了“Jump to latest”功能，允许用户在全屏时间轴模式下快速返回最新输出并继续跟随。
- **ACP 编辑器兼容性：** 允许用户在不改变保存默认值的情况下，在 ACP 兼容的编辑器中选择模型上下文大小。
- **环境变量配置：** 支持为 Copilot 启动的每个进程设置环境变量（Shell 命令行补全相关）。

### v1.0.116-2
**主要更新：**
- **MCP 冲突检测：** 新增警告功能，当插件和独立 MCP 服务器连接到同一端点时，提示用户如何在 `/mcp` 中禁用其中一个。
- **稳定性修复：** 修复了取消挂起提示时等待活动刷新的问题，以及在重新连接主机后避免显示空闲会话为忙碌状态的问题。同时修复了 Unix 平台取消前台任务时的处理逻辑。

### v1.0.116-1
**主要更新：**
- **重复修复：** 与 v1.0.116-2 相同的 MCP 冲突检测警告及 Unix 平台取消任务修复。

### v1.0.116-0
**主要更新：**
- **MCP 启动体验改进：** 跳过组织管理的 MCP 服务器的单独慢连接和登录警告，但在启动摘要中标记其登录需求；若需要认证，会等待用户执行 `/mcp auth <name>` 后再打开浏览器。

### v1.0.115
**发布时间：** 2026-11-23
**主要更新：**
- **表单支持：** 在支持表单的 ACP 编辑器中启用结构化澄清问题。
- **Sandbox 默认开启：** 默认启用 Windows sandbox 包查询功能（可通过配置禁用）。
- **macOS 权限放宽：** 允许沙箱化命令中使用特定的 macOS Mach 服务查询。

---

## 3. 社区热点 Issues (Top 10)
以下 Issues 在过去24小时内获得最多关注，反映了当前最迫切的需求或严重 Bug。

1.  **[Windows] Copilot CLI 改变文件换行符 (CRLF vs LF)** 🔴
    - **作者/热度：** BillyONeal (8 评论, 9 👍)
    - **重要性：** **严重**。文件换行符的自动转换是跨平台协作中最令人头疼的问题之一，会破坏 Git 历史和 CI/CD 流水线。
    - **详情：** 用户报告在编辑具有 LF 换行符的文件时，Copilot 会将其强制改为 CRLF。

2.  **[Linux] Ubuntu keychain 支持损坏** 🔴
    - **作者/热度：** AndreaPi (7 评论, 23 👍)
    - **重要性：** **高**。认证问题是 CLI 工具使用率下降的主要原因，23个点赞表明许多用户受此困扰。
    - **详情：** 文档说明有误，且当 `secret-tool` 未安装时处理不当。

3.  **[MCP] MCP OAuth Entra ID 回调被拒绝** 🔴
    - **作者/热度：** cmp0xff (4 评论, 1 👍)
    - **重要性：** **高**。涉及企业级集成，阻碍了远程 HTTP MCP 服务器的正常使用。
    - **详情：** Entra ID (Azure AD) 拒绝 `127.0.0.1` 回调，导致 MCP 认证失败。

4.  **[Terminal] macOS TLS 1.3 回归问题** 🟡
    - **作者/热度：** tspearconquest (2 评论)
    - **重要性：** **中**。自 1.0.93 版本以来的网络连接问题，影响所有 macOS 用户。
    - **详情：** 连接到 Jenkins MCP 服务器时 TLS 1.3 连接失败。

5.  **[MCP] 无法重新登录过期的 MCP 服务器** 🟡
    - **作者/热度：** sbroenne (2 评论, 1 👍)
    - **重要性：** **中**。认证流程中的体验断层，导致服务不可用。
    - **详情：** 服务器提示重新登录，但 CLI 中找不到对应的命令或 UI 入口。

6.  **[Configuration] 禁用 Agent Checkpoint Refs (功能请求)** 🟢
    - **作者/热度：** scar20 (7 评论, 5 👍)
    - **重要性：** **中**。性能优化需求。Agent 的 checkpoints 会创建大量 Git 引用，影响仓库性能。
    - **详情：** 请求添加配置选项来禁用这些 refs 的创建。

7.  **[Terminal] macOS 终端渲染：文本截断** 🟡
    - **作者/热度：** steve-edu (0 评论)
    - **重要性：** **中**。长文本输出无法滚动，严重影响大代码库场景下的使用体验。
    - **详情：** 响应内容被截断，滚动条失效。

8.  **[Terminal Rendering] Markdown 渲染缺失** 🟢
    - **作者/热度：** ParkerAtWork (1 评论, 1 👍)
    - **重要性：** **低**。UI 细节问题，影响可读性。
    - **详情：** `ask_user` 提示中的 Markdown 格式（如粗体）显示为纯文本。

9.  **[Windows] NumLock 关闭时数字键导航失效** 🟢
    - **作者/热度：** justcode411 (6 评论, 1 👍)
    - **重要性：** **低**。特定硬件场景下的可用性问题。
    - **详情：** 在 NumLock 关闭时，小键盘方向键无法在 CLI 光标间导航。

10. **[Sandbox] 沙箱中拒绝的文件仍被读取** 🟡
    - **作者/热度：** workschlicht (0 评论)
    - **重要性：** **中**。安全隐私问题。被拒绝访问的文件内容仍可能被读取并缓存。
    - **详情：** 即使文件在 `deniedPaths` 中，`edit` 工具仍会读取并复制其内容。

---

## 4. 重要 PR 进展
**状态：** 过去24小时内无新 Pull Request 更新。

---

## 5. 功能需求趋势
从 Issues 数据分析，社区的关注点主要集中在以下几个方向：

1.  **MCP 生态深度集成：**
    - 这是目前最活跃的领域。社区不仅在测试 MCP 功能，还在推动更细粒度的配置（如上下文大小选择、OAuth 登录流程）。
    - **关键词：** MCP Server, OAuth, Endpoint Conflict, Registry.

2.  **跨平台兼容性与标准：**
    - 开发者主要使用 Windows 和 Linux，两个平台在换行符处理、终端渲染和 Keychain 认证上均存在痛点。
    - **关键词：** CRLF, Windows Terminal, Ubuntu Keychain, Sandbox.

3.  **Agent 与会话管理：**
    - 随着 Agent 能力的增强，如何管理 Agent 的生命周期、检查点以及会话的稳定性成为新的讨论热点。
    - **关键词：** Agent Checkpoint, Session Wedge, Subagent, Default Agent.

---

## 6. 开发者关注点
1.  **认证体验：** Ubuntu Keychain 的失效和 Entra ID 的回调问题导致大量开发者无法正常使用，是阻碍采纳的首要因素。
2.  **终端渲染限制：** macOS 和通用终端环境下的文本截断问题限制了 Copilot CLI 在处理大型代码库时的实用性。
3.  **配置灵活性：** 缺少对 Agent 引用、默认 Agent 选择等高级配置的选项，增加了使用复杂度。
4.  **安全边界：** 沙箱机制下文件被意外读取的问题引发了关于数据隐私和安全性的担忧。

---
*日报生成时间：2026-11-25*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-11-25
**来源：** github.com/anomalyco/opencode

---

## 1. 今日速览

*   **核心功能增强**：社区持续推动核心功能的完善，包括新增移动端推送通知、远程浏览器流量复用优化、以及 MCP 技能 URI 加载能力的修复。
*   **桌面端体验修复**：针对 v2.4.1 版本，大量 Issue 集中反馈了 TUI 滚动卡顿、搜索功能失效、以及剪贴板粘贴问题，开发团队通过一系列 PR 进行了针对性修复。
*   **开发集成呼声高**：官方 VS Code 扩展功能请求热度不减，成为当前评论数最多的 Feature，显示出开发者对无缝 IDE 集成的强烈需求。

---

## 2. 版本发布

*   **OpenCode v2.4.1** (2026-11-24 更新)
    *   **状态**：当前主要讨论和反馈版本。
    *   **主要问题**：该版本在 Linux (WSL2)、Windows 和 macOS 平台上暴露了多个 TUI 和桌面端交互问题（如滚动、搜索、快捷键失效），是今日 Issue 投诉的焦点。

---

## 3. 社区热点 Issues (Top 10)

1.  **[FEATURE] 官方 OpenCode VS Code 扩展** (#11176)
    *   **热度**：🔥🔥🔥🔥🔥 (41 评论, 164 👍)
    *   **重要性**：这是目前社区呼声最高的 Feature，用户希望 OpenCode 能作为原生 VS Code 插件运行，提升开发效率。
2.  **[FEATURE] 恢复前台子代理执行** (#64073)
    *   **热度**：🔥🔥🔥 (27 评论, 12 👍)
    *   **重要性**：涉及核心执行逻辑的优化，可能影响复杂任务链的执行效率。
3.  **[BUG] Go 订阅支付失败 (意大利)** (#52958)
    *   **热度**：🔥🔥🔥 (27 评论, 5 👍)
    *   **重要性**：影响欧洲用户订阅体验的严重 Bug，涉及支付网关兼容性问题。
4.  **[BUG] Windows 桌面版 Ctrl+F 搜索无效** (#65962)
    *   **热度**：🔥🔥 (5 评论)
    *   **重要性**：桌面端最高频的交互痛点，影响用户查找对话内容的能力。
5.  **[BUG] 模型选择器 Sticky 问题** (#66203)
    *   **热度**：🔥 (2 评论)
    *   **重要性**：TUI 界面逻辑 Bug，导致用户无法切换推理模型，严重影响使用。
6.  **[BUG] WSL2 TUI 剪贴板粘贴失效** (#65913)
    *   **热度**：🔥 (3 评论)
    *   **重要性**：跨平台兼容性问题，影响 WSL2 用户在 Windows Terminal 中的体验。
7.  **[BUG] Shell 重定向跳过权限检查** (#66053)
    *   **热度**：🔥 (3 评论)
    *   **重要性**：安全相关 Bug，可能绕过文件系统权限限制。
8.  **[BUG] 旧版会话历史截断** (#61189)
    *   **热度**：🔥 (4 评论, 2 👍)
    *   **重要性**：长期运行会话的 UI 渲染 Bug，数据完整但界面显示异常。
9.  **[BUG] 配置热重载绕过 Provider 拒绝策略** (#52333)
    *   **热度**：🔥 (6 评论)
    *   **重要性**：安全配置绕过，可能导致流量泄露给未授权的第三方 Provider。
10. **[BUG] 模型可用性错误** (#62711)
    *   **热度**：🔥 (5 评论)
    *   **重要性**：Ollama 会话恢复失败，影响本地模型用户的使用。

---

## 4. 重要 PR 进展 (Top 10)

1.  **[CLOSED] 修复 Bun.write 性能瓶颈** (#66242)
    *   **内容**：修复 Code Mode 下 `Bun.write` 遍历整个 Uint8Array 导致的服务器重启问题。
2.  **[NEW] 添加移动端推送通知** (#66130)
    *   **内容**：在服务器端实现移动应用的推送通知功能。
3.  **[NEW] 使用多路复用 WebSocket 传输远程浏览器流量** (#66217)
    *   **内容**：优化远程浏览器流量的传输效率，提升性能。
4.  **[FIX] MCP 技能 URI 加载** (#66220)
    *   **内容**：修复当仅提供 URI 时无法加载 MCP 技能的 Bug。
5.  **[FIX] 桥接 AI SDK V2 到 V3** (#66164)
    *   **内容**：解决 SAP AI Core 等提供商使用 SDK V2 模型时的报错问题。
6.  **[REFACTOR] 重命名媒体生成工具** (#65682)
    *   **内容**：将 `experimental_image_generate` 重命名为 `generate_image`，优化 API 命名。
7.  **[FIX] 区分同名的 MCP 技能** (#66210)
    *   **内容**：修复当 MCP 服务器有两个同名技能时只注册第一个的问题。
8.  **[FIX] 优化阅读器加载策略** (#66033, #66054, #66158)
    *   **内容**：一系列关于阅读器滚动的优化，解决滚动时历史加载不及时、行高变化导致阅读位置丢失等问题。
9.  **[FIX] Find 命令定位准确性** (#66222)
    *   **内容**：修复搜索功能中高亮计数与实际显示不匹配的问题。
10. **[NEW] 增加文件读取的 opt-in scope** (#66206)
    *   **内容**：为 Linux 平台添加原生文件读取的权限控制 Scope，提升安全性。

---

## 5. 功能需求趋势

1.  **IDE 深度集成**：**[FEATURE] 官方 VS Code 扩展** (#11176) 是绝对的热点，社区对无缝集成到 IDE 的需求极高。
2.  **移动端体验**：**[FEATURE] 移动端推送通知** (#66130) 反映了用户对移动办公场景的关注。
3.  **多模态与可视化**：
    *   **图片附件显示** (#21227)：希望在聊天 UI 中直接展示工具返回的图片。
    *   **成本显示本地化** (#66087)：希望桌面端成本显示支持 CNY 等本地货币。
4.  **远程与多平台执行**：关注点集中在远程浏览器流量的优化以及不同平台（Linux/Windows/Mac）下的兼容性。

---

## 6. 开发者关注点

1.  **TUI 滚动与交互体验**：这是 v2.4.1 版本最集中的反馈区域。包括 WSL2 的粘贴问题、Windows 的搜索失效、以及滚动时的定位丢失，开发者急需更流畅的命令行体验。
2.  **安全与配置稳定性**：
    *   **配置热重载漏洞** (#52333) 和 **Provider 拒绝策略绕过** 是安全层面的隐患。
    *   **Shell 权限检查** (#66053) 涉及沙箱安全边界。
3.  **兼容性修复**：
    *   **Go 订阅支付** (#52958) 影响特定地区用户。
    *   **AI SDK 版本桥接** (#66164) 影响特定第三方模型（如 SAP AI Core）的接入。
4.  **模型管理**：关注模型选择的稳定性（如 Sticky 问题）以及不同推理模型的默认行为。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-25
**来源**: GitHub - badlogic/pi-mono

---

## 1. 今日速览
今日 Pi 仓库活跃度极高，**11月24日当天关闭了 16 个 Issue 和 12 个 PR**，主要集中在模型兼容性修复、Windows 环境适配以及协议规范更新。社区对 **GitHub Copilot 生态**（如 Opus 5.5、Luna-Decisions）的集成支持持续加深，同时针对 **MCP (Model Context Protocol)** 的无状态协议升级也进入了实现阶段。

---

## 2. 版本发布
**无新版本发布**（无最新 Releases）。

---

## 3. 社区热点 Issues
**#10956 [OPEN] cacheWarming "idle" 模式失效问题**
*   **重要性**: 高。核心功能缺陷，导致长对话中缓存预热机制无法按预期触发，影响性能优化。
*   **详情**: 在开启 `cacheWarming: "idle"` 后，系统未能在会话稳定后触发预热，且 `/session` 状态显示异常。目前评论数为 17，开发者尚未给出明确修复方案。
*   [查看 Issue](https://github.com/earendil-works/pi/issues/10956)

**#12242 [OPEN] Compaction Summary 无限膨胀 (17k -> 164k chars)**
*   **重要性**: 中高。内存管理问题。摘要长度随 compaction 次数线性爆炸式增长，严重影响长对话的运行效率。
*   **详情**: 经过 9 次压缩，摘要长度从 17k 增长至 164k，第九次压缩耗时长达 588 秒。目前社区正在讨论是否应放宽 "保留所有信息" 的指令。
*   [查看 Issue](https://github.com/earendil-works/pi/issues/12242)

**#12407 [OPEN] gemini-4-neon 模型流式输出中断**
*   **重要性**: 高。特定模型兼容性问题。
*   **详情**: 新模型在流式输出时频繁中途停止。经诊断，OpenRouter 将上游的 `MALFORMED_RESPONSE` 错误错误地标准化为 OpenAI 格式，导致解析失败。
*   [查看 Issue](https://github.com/earendil-works/pi/issues/12407)

**#12445 [OPEN] Durable: 需要从会话中止中返回 withdrawn input IDs**
*   **重要性**: 中。扩展开发 API 稳定性。
*   **详情**: 当前 `Conversation.abort()` 返回 `void`，扩展开发者难以追踪哪些输入被中止移除，导致状态管理困难。
*   [查看 Issue](https://github.com/earendil-works/pi/issues/12445)

**#12147 [OPEN] RPC 模式下无法响应扩展对话框**
*   **重要性**: 中。特定模式下的用户体验问题。
*   **详情**: 在 `--mode rpc` 下，`session_start` 期间弹出的对话框无法被客户端读取响应，导致会话直接退出。
*   [查看 Issue](https://github.com/earendil-works/pi/issues/12147)

---

## 4. 重要 PR 进展
**PR #12505 [OPEN] fix(ai): 在 openai-completions 中回放 GitHub Copilot reasoning_opaque**
*   **修复内容**: 修复了 Copilot 模型流式输出中 `reasoning_opaque` 字段被丢弃的问题。此前只记录了文本推理，导致后续请求无法正确回放完整的推理过程。
*   **状态**: 正在进行中。
*   [查看 PR](https://github.com/earendil-works/pi/pull/12505)

**PR #12495 [CLOSED] fix(ai): 添加 Copilot gpt-6-luna-decisions 并按账户过滤分类器**
*   **修复内容**: 修复了旧版 Copilot 订阅无法使用新决策模型的问题，并修正了分类器模型仅对所有账户显示的错误，现在会根据 `billing.restricted_to` 进行过滤。
*   [查看 PR](https://github.com/earendil-works/pi/pull/12495)

**PR #12489 [CLOSED] fix(ai): 从 Anthropic 模型列表中移除 Claude 思考支持的手动列表**
*   **修复内容**: 修复了 Opus 5.5 和 Sonnet 5.5 在所有主机上拒绝 `thinking: {type: "disabled"}` 的问题。通过移除手写的不完整列表，改为从 `models.dev` 动态读取支持状态。
*   [查看 PR](https://github.com/earendil-works/pi/pull/12489)

**PR #12479 [OPEN] feat(mcp,coding-agent): 支持 MCP 无状态协议 (2026-07-28)**
*   **新增功能**: 引入 MCP 协议的 2026-07-28 版本，即无状态协议。这允许服务器在 HTTP 连接上无需 `initialize` 握手即可运行，解决了旧版协议在无状态场景下的连接开销问题。
*   [查看 PR](https://github.com/earendil-works/pi/pull/12479)

**PR #12486 [OPEN] docs(coding-agent): 整合 NVIDIA RTX 配方到 llama.cpp 指南**
*   **文档优化**: 将本地模型设置指南进行了整合，将 NVIDIA RTX 相关的配置说明折叠进 llama.cpp 指南中，使本地部署配置更加集中和易读。
*   [查看 PR](https://github.com/earendil-works/pi/pull/12486)

---

## 5. 功能需求趋势
1.  **长上下文优化**：社区对 **Compaction (压缩)** 机制的关注度极高，尤其是如何防止摘要无限膨胀以及如何在压缩过程中保留关键信息。
2.  **多模型生态整合**：持续支持 **GitHub Copilot** (Opus 5.5, Luna-Decisions) 和 **Google Gemini** (Neon, Hydrogen) 的原生功能，包括 Thinking 模式和 Function Calling。
3.  **MCP 协议现代化**：开发者开始关注 **MCP 协议的演进**，特别是无状态协议版本，以提升连接效率和扩展性。
4.  **RPC 模式稳定性**：随着 RPC 模式的使用，开发者开始反馈该模式下的扩展交互和会话启动流程存在的问题。

---

## 6. 开发者关注点
*   **Windows 环境适配**：高频反馈 Git Bash 路径检测问题（Issue #12408），要求支持非标准安装路径下的 Git。
*   **错误处理透明度**：开发者希望在扩展开发中能更精确地捕获和处理 HTTP 错误（如 4xx/5xx）以及使用限制错误。
*   **流式数据解析性能**：在处理大型 SSE (Server-Sent Events) 数据流时，如何避免字符串拼接导致的性能下降和内存膨胀（PR #12451）。
*   **OSC 7501 协议兼容**：在终端集成场景下，确保启动对话框能正确报告 `blocked` 或 `idle` 状态。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-11-25
**来源**: GitHub.com/QwenLM/qwen-code

---

## 1. 今日速览
今日社区主要聚焦于 **Managed Agent（托管代理）内核的逐步落地** 与 **CI/CD 稳定性修复**。#17045 追踪了将 1.0 预览版的事件驱动内核逐步迁移至主分支的关键里程碑。同时，#18297 和 #18299 等一系列 PR 正在修复导致 CI 失败的 reproducible（可复现）问题，并优化了 Hooks 报错体验。此外，针对 Web Shell 的功能增强（如支持自定义面板、阿拉伯语 RTL 布局）以及 Memory（记忆）功能的跨工作区共享也在积极推进。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues

| Issue ID | 标题 | 重要性 | 摘要与关注点 |
| :--- | :--- | :--- | :--- |
| **#14724** | Main CI failed: Managed Agent gate — no test identified | 🔴 **P0 高危** | **最热 Bug**。长期未解决的 CI 失败，阻碍了主分支的常规开发与合并，是当前阻塞最大的技术债。 |
| **#17045** | tracking(core): land the 1.0 Preview loop kernel on main | 🟢 **路线图** | **核心架构**。追踪将事件驱动内核逐步迁移至主分支，旨在实现更平滑的 1.0 版本发布，涉及核心会话管理。 |
| **#18252** | Main CI failed: E2E Tests — cli/cron-tools.test.ts | 🔴 **P0 高危** | **端到端测试**。E2E 测试链路持续失败，影响对 CLI 核心功能的信任度。 |
| **#16346** | Main CI failed: ClassSizeRatchetTest.productionClassesStayWithinTheirSizeRatchet | 🔴 **P1 高危** | **代码规范**。持续监控 Java 生产类大小，防止代码膨胀导致维护困难。 |
| **#13113** | Session becomes unopenable: Transcript snapshot is too large | 🟡 **P1 体验** | **数据膨胀**。长会话导致 `.jsonl` 文件指数级增长，超过 256 MiB 限制后无法打开，严重影响长期使用体验。 |
| **#10791** | Balanced content-only <thinking> blocks still leak to user-visible output | 🟡 **P2 稳定性** | **输出泄露**。思考块在特定逻辑下可能泄露到用户可见输出，影响 AI 行为的可预测性。 |
| **#18165** | 会话日志明文记录 API key，存在敏感信息落盘风险 | 🟡 **P2 安全** | **安全合规**。日志中包含完整的 API Key，存在合规与隐私风险，建议进行脱敏处理。 |
| **#17446** | feat(cli): discover models during custom provider setup | 🟢 **P2 功能** | **配置体验**。希望在进行自定义 Provider 配置时，能自动发现并列举可用的模型 ID，减少手动输入。 |
| **#18030** | feat(memory): share project auto-memory between a workspace and its Git worktrees | 🟢 **P2 功能** | **记忆共享**。希望项目记忆能在主工作区和 Git Worktree 之间共享，避免重复学习。 |
| **#18298** | Web Shell renders an unset boolean setting as OFF | 🟢 **P3 体验** | **UI 交互**。Web Shell 对未设置的布尔值默认显示为 OFF，误导用户以为功能已关闭，而非处于“未定义”状态。 |

---

## 4. 重要 PR 进展

| PR ID | 标题 | 类型 | 摘要与进展 |
| :--- | :--- | :--- | :--- |
| **#18297** | fix(ci): repair reproducible main branch failures | 🐛 修复 | **今日最新**。直接修复导致 CI 持续失败的 reproducible 问题，包括 Hosted Harness 身份限制和存储重叠保护，旨在恢复 CI 正常运行。 |
| **#18299** | fix(hooks): warn about hooks that cannot run as written | 🐛 修复 | **用户体验优化**。当 Hook 无法按原样运行时，从调试日志中提取并直接向用户显示警告，而不是让用户在日志中寻找错误。 |
| **#18247** | feat(sdk-java): Add a public Managed Agent client | ✨ 新功能 | **SDK 增强**。为 Java SDK 添加公开的 Managed Agent 客户端，提升开发者在 Java 环境中使用托管代理的能力。 |
| **#18290** | refactor(serve): Split Hosted Harness Session by responsibility | ♻️ 重构 | **架构优化**。将 Hosted Harness 的 Session 按职责拆分，提高代码的可维护性和可测试性。 |
| **#18280** | feat(cli): add guest-exec UDS bridge for microVM review | ✨ 新功能 | **沙箱增强**。为 microVM 审查执行实现 Unix Domain Socket 桥接，在不进行文件系统挂载的情况下实现硬件隔离的代码审查。 |
| **#18257** | fix(core): append effective permission context before model requests | 🐛 修复 | **权限上下文**。在发送给模型的请求前，确保附加有效的权限上下文（批准模式），防止权限策略丢失。 |
| **#18266** | fix(hooks): run UserPromptSubmit once per user message | 🐛 修复 | **逻辑修正**。确保 `UserPromptSubmit` Hook 仅对每个新的用户消息触发一次，避免重复触发导致的问题。 |
| **#18230** | feat(memory): preserve workspace memory across task worktrees | ✨ 新功能 | **记忆持久化**。实现跨工作树的记忆保留，确保在切换分支或 Worktree 时，项目级别的记忆不会丢失。 |
| **#18273** | feat(web-shell): unify Managed question card onto shared AskUserQuestion | ✨ 新功能 | **UI 统一**。将 Managed 会话页面的专用问题表单替换为与 Daemon UI 共享的“问题卡片”组件，统一交互体验。 |
| **#17437** | feat(i18n): add Arabic support for CLI and Web Shell with RTL layout | ✨ 新功能 | **国际化**。为 CLI 和 Web Shell 添加阿拉伯语支持，包括 Web Shell 的 RTL（从右到左）布局支持。 |

---

## 5. 功能需求趋势

1.  **托管代理内核迁移**: 从 Issue #17045 和 PR #18290 可以看出，社区正从旧架构向 1.0 预览版的事件驱动内核过渡，这将是未来一段时间开发的重心。
2.  **记忆与上下文管理**: #13113 和 #18030 暴露了长会话管理的数据膨胀问题，同时 #18030 提出的跨工作区记忆共享是一个高频且实用的需求，旨在提升多分支开发时的效率。
3.  **Web Shell 与多平台体验**: #18159 (自定义面板) 和 #17437 (阿拉伯语 RTL) 显示，开发者不仅关注后端逻辑，也重视 Web Shell 的扩展性和多语言/多平台的兼容性。

---

## 6. 开发者关注点

*   **CI 稳定性是首要任务**: #14724 等高票 Issue 表明，Reproducible CI Failures 是阻碍主分支开发的最大痛点，修复这些问题是当务之急。
*   **资源限制与边界**: #16346 (ClassSizeRatchet) 和 #13113 (Transcript Size) 反映了开发者对系统资源（内存、磁盘）使用边界的担忧，防止系统因单次会话过大而崩溃。
*   **安全性与隐私**: #18165 关于 API Key 明文记录的反馈，提醒开发者必须重视日志脱敏和敏感信息保护。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期**: 2026-11-25  
**来源**: [GitHub: codewhale-hq/Codewhale](https://github.com/Hmbown/DeepSeek-TUI)  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
DeepSeek TUI 项目今日发布了 **v0.10.5** 版本，包含安全加固、工具投影统一设计、MCP 优化及 TUI 界面简化等多项改进。社区活跃度较高，共处理 50 条 Pull Requests 和 32 条 Issues，主要集中在 TUI 渲染、安全策略及新模型支持上。

---

## 2. 版本发布
**v0.10.5** (2026-11-24)
- **核心改进**:
  - **安全加固**: 增强了权限控制、密钥管理及运行时探针的防御能力，修复了潜在的绕过漏洞。
  - **工具投影统一**: 设计了路由特定的工具投影机制，优化了请求分发流程。
  - **MCP 优化**: 改进了 Model Context Protocol 的集成，修复了相关缺陷。
  - **TUI 简化**: 移除了冗余字段，统一了信任源和登录入口，提升了界面一致性。
  - **新模型支持**: 添加了 **Ollama Cloud** 力度梯度的支持，并集成了多个新提供商（如 Onomeo、UberLLM、Synap）。

---

## 3. 社区热点 Issues
以下 Issues 反映了当前最紧急或最具讨论价值的问题：

1. **[Bug] `/undo` 命令在 Windows 上存在严重故障** (#6970)  
   - **重要性**: 影响核心撤销功能的稳定性，特别是在 Windows 平台上。  
   - **状态**: 开放，评论数 10，已追踪修复进度。  
   - [链接](https://github.com/codewhale-hq/Codewhale/issues/6970)

2. **[审计] TUI 界面模块发现 12 个已验证缺陷** (#7474)  
   - **重要性**: 涉及 TUI 核心渲染逻辑，可能影响用户体验。  
   - **状态**: 开放，标签为 `good first issue`。  
   - [链接](https://github.com/codewhale-hq/Codewhale/issues/7474)

3. **[Bug] GNOME Terminal 退出后保留自定义主题颜色** (#7344)  
   - **重要性**: 跨平台兼容性问题，影响 Linux 用户的使用体验。  
   - **状态**: 开放，评论数 5。  
   - [链接](https://github.com/codewhale-hq/Codewhale/issues/7344)

4. **[审计] 多个核心模块发现缺陷** (如 #7464, #7477, #7478)  
   - **重要性**: 涵盖 TUI、沙箱、MCP 等多个模块，影响整体稳定性。  
   - **状态**: 多数已关闭，部分为 `help wanted`。  
   - [链接](https://github.com/codewhale-hq/Codewhale/issues/7464)

5. **[功能需求] 统一路由特定工具投影设计** (#5633)  
   - **重要性**: 长期规划，影响工具调用的架构优化。  
   - **状态**: 开放，讨论中。  
   - [链接](https://github.com/codewhale-hq/Codewhale/issues/5633)

---

## 4. 重要 PR 进展
以下 PR 已合并或即将发布：

1. **[Release] 切割 v0.10.5 版本** (#7560)  
   - **内容**: 整合发布说明，准备打包。  
   - [链接](https://github.com/codewhale-hq/Codewhale/pull/7560)

2. **[安全] 硬化批量权限与密钥管理** (#7555)  
   - **内容**: 修复潜在绕过漏洞，增强运行时安全。  
   - [链接](https://github.com/codewhale-hq/Codewhale/pull/7555)

3. **[TUI] 修复模型选择器与 Ollama Cloud 集成** (#7557)  
   - **内容**: 统一引擎目录解析逻辑，支持新模型力度梯度。  
   - [链接](https://github.com/codewhale-hq/Codewhale/pull/7557)

4. **[TUI] 简化信任源与登录入口** (#7553)  
   - **内容**: 移除冗余字段，统一用户配置管理。  
   - [链接](https://github.com/codewhale-hq/Codewhale/pull/7553)

5. **[Provider] 添加新提供商支持** (如 #7525, #7285)  
   - **内容**: 集成 Onomeo、UberLLM、Synap 等 OpenAI 兼容网关。  
   - [链接](https://github.com/codewhale-hq/Codewhale/pull/7525)

---

## 5. 功能需求趋势
从 Issues 和 PR 中提炼出社区关注的三大方向：
1. **TUI 交互优化**: 渲染一致性、跨平台兼容性、界面简化。
2. **安全与沙箱**: 权限控制、执行策略、密钥管理。
3. **新模型支持**: OpenAI 兼容网关、MCP 协议集成。

---

## 6. 开发者关注点
- **痛点**: `/undo` 命令在 Windows 上的稳定性问题需优先修复。
- **高频需求**: 
  - TUI 模块的审计与修复。
  - 跨平台兼容性（尤其是 Linux GNOME Terminal）。
  - 新模型提供商的快速集成。

---

**数据来源**: GitHub API & 项目仓库  
**更新时间**: 2026-11-25

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*