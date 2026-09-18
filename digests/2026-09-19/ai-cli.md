# AI CLI 工具社区动态日报 2026-09-19

> 生成时间: 2026-09-18 22:03 UTC | 覆盖工具: 9 个

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



# OpenAI Codex 社区动态日报 — 2026-09-19

---

## 1. 今日速览

v0.155.1 紧急热修复上线，修复本地 TUI 会话因默认启用 reasoning summaries 导致部分模型提供方拒绝请求的问题。社区最关注的仍是 Windows 平台的数据丢失与沙箱异常问题（#46022、#44696），以及 macOS 端 Computer Use 功能在新应用窗口定位上的不稳定性。

---

## 2. 版本发布

### v0.155.1（热修复）
- **Bug Fix**: 本地 TUI 会话默认禁用 `reasoning-summary` 请求，修复了不支持该特性的模型提供方返回拒绝的问题。显式配置的 `auto`/`concise`/`detailed` 选项仍按预期工作。
- 🔗 [Changelog](https://github.com/openai/codex/compare/rust-v0.155.0...rust-v0.155.1)

### v0.156.0-alpha 系列（测试版）
- 连续发布 alpha.1 ~ alpha.4，为下一正式版做准备，暂无重大功能变更公告。

### v0.155.0（上一版本回顾）
- 新增实验性 `/voice` 语音对话，支持实时转录和麦克风控制（需通过 `/experimental` 启用）。
- TUI 状态栏新增实时推理摘要和完成时间戳显示。

---

## 3. 社区热点 Issues（Top 10）

| # | 标题 | 关注点 | 评论/👍 | 链接 |
|---|------|--------|---------|------|
| #3355 | MacBook 睡眠后请求失败 | 网络连接稳定性问题，高热度 | 56 / 31 | [链接](https://github.com/openai/codex/issues/3355) |
| #33624 | 要求批量/主目录删除硬确认与恢复门控 | 安全增强需求，防止误删 | 35 / 0 | [链接](https://github.com/openai/codex/issues/33624) |
| #46022 | **Windows 数据大量丢失** | 严重 bug，数百 GB 文件被误删 | 23 / 0 | [链接](https://github.com/openai/codex/issues/46022) |
| #25826 | Windows 多显示器窗口溢出 | UI 布局 bug | 22 / 19 | [链接](https://github.com/openai/codex/issues/25826) |
| #37856 | VS Code 扩展线程锁定阻塞聊天 | IDE 集成稳定性 | 18 / 11 | [链接](https://github.com/openai/codex/issues/37856) |
| #45626 | Windows Desktop 后续消息发送禁用 | 交互阻塞 bug | 13 / 1 | [链接](https://github.com/openai/codex/issues/45626) |
| #16994 | Windows/WSL 自动化任务无产物 | 自动化功能异常 | 12 / 5 | [链接](https://github.com/openai/codex/issues/16994) |
| #17541 | Azure 模型切换解密失败 | Azure 订阅稳定性 | 10 / 8 | [链接](https://github.com/openai/codex/issues/17541) |
| #46398 | 意外参数导致 HTTP 400 | 参数校验问题 | 9 / 6 | [链接](https://github.com/openai/codex/issues/46398) |
| #35253 | MCP OAuth DCR 范围请求错误 | 认证与 MCP 集成问题 | 7 / 1 | [链接](https://github.com/openai/codex/issues/35253) |

**重点关注**：#46022 为最高优先级安全 bug，用户报告 Codex 在 Windows 上超出项目范围大量删除文件，涉及数百 GB 数据，需尽快调查。

---

## 4. 重要 PR 进展（Top 10）

| # | 标题 | 内容摘要 | 链接 |
|---|------|----------|------|
| #46467 | 恢复 TUI reasoning summary 默认值为 none | 修复 v0.155 引入的提供方拒绝问题，同时保留显式配置支持 | [链接](https://github.com/openai/codex/pull/46467) |
| #46335 | MCP 策略评估与轮次环境保持一致 | 防止环境设置变更影响当前轮次的 MCP 工具可用性 | [链接](https://github.com/openai/codex/pull/46335) |
| #46334 | 跨路径/网络/沙箱共享平台标识 | 统一 Platform 元数据解析和原生平台检测 | [链接](https://github.com/openai/codex/pull/46334) |
| #46333 | 清理时处理已禁用的 Windows 沙箱账户 | 确保禁用账户在清理后恢复禁用状态，避免权限残留 | [链接](https://github.com/openai/codex/pull/46333) |
| #46332 | TUI 对话摘要淡化样式 | 改善 UI 视觉层次，移除 Next 标签的 cyan 颜色 | [链接](https://github.com/openai/codex/pull/46332) |
| #46331 | 延迟网络策略验证至组合完成后 | 避免配置覆盖前误判无效条目 | [链接](https://github.com/openai/codex/pull/46331) |
| #46330 | 将重试退避移至 `codex-async-utils` | 公共化工具库，供 `codex-cloud-config` 复用 | [链接](https://github.com/openai/codex/pull/46330) |
| #46328 | 非项目目录不持久化项目信任 | 防止在无项目根目录时错误保存信任配置 | [链接](https://github.com/openai/codex/pull/46328) |
| #46324 | 扩展压缩回退至当前模型 | 模型切换后压缩失败可回退到当前模型，而非仅使用上一模型 | [链接](https://github.com/openai/codex/pull/46324) |
| #46318 | 为模型提供商网关添加 OAuth 凭证管理 | 支持 PKCE 浏览器登录、循环回调、缓存 Token 及自动刷新 | [链接](https://github.com/openai/codex/pull/46318) |

---

## 5. 功能需求趋势

1. **Windows 平台稳定性**：近期 Issue 中 Windows 相关问题占比最高，涉及沙箱异常、文件操作越界、`exec_command` 挂起、窗口布局等多个维度，是社区最大痛点。
2. **安全与权限加固**：#33624 和 #46022 反映出社区对删除操作安全门控的强烈需求，以及 Sandbox 权限边界需进一步收紧。
3. **MCP 集成完善**：多个 Issue 和 PR 涉及 MCP 工具 schema 传播、OAuth 范围、策略评估一致性，表明 MCP 扩展生态正在快速迭代。
4. **多平台 GUI 一致性**：macOS Computer Use 窗口定位、Windows 多显示器布局、Linux/Wayland 语音悬浮窗等问题凸显跨平台桌面体验仍需打磨。
5. **身份认证兼容性**：Azure 订阅、高级账户安全（AAS）与 MFA 的兼容性问题持续出现，企业用户对此敏感。

---

## 6. 开发者关注点

- **数据安全保障**：Windows 用户报告 Codex 在 Full Access 模式下误删项目外文件，社区呼吁增加二次确认和快照回滚机制。
- **连接稳定性**：MacBook 合盖睡眠后恢复、Windows Desktop 任务无响应超时等问题影响连续工作流体验。
- **IDE 集成体验**：VS Code 扩展线程锁定导致聊天阻塞，开发者期望更健壮的会话管理和断线重连。
- **模型切换可靠性**：Azure 场景下模型中途切换导致加密内容解密失败，影响多模型切换工作流。
- **沙箱与工具链**：Windows 沙箱 helper 初始化失败、`exec_command` 挂起、stdout 丢失等问题阻碍 Windows 上的自动化任务。

---

*报告生成时间：2026-09-19 | 数据来源：github.com/openai/codex*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报 | 2026-09-19

## 1. 今日速览
今日社区核心聚焦于 **Agent 可靠性与上下文管理**。官方发布 v0.62.0 夜间构建修复 OAuth 令牌与 UI 渲染问题，同时多条关键 PR 正着力解决子 Agent 挂起、会话中断后上下文污染及调度器指令拦截等痛点。开发者对 AST 感知工具、持久化任务追踪及 Auto Memory 安全性的诉求显著上升。

## 2. 版本发布
**v0.62.0-nightly.20260918.g9450ade79**
- 修复 OAuth 刷新令牌保留逻辑，并使凭证删除操作具备幂等性。
- 修复 UI 边框渲染中因负尺寸导致的布局异常。
🔗 [Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260918.g9450ade79) | [PR #29339](https://github.com/google-gemini/gemini-cli

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期**: 2026-09-19  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览

GitHub Copilot CLI 发布了 v1.0.87-0 版本，重点优化了会话交互体验，包括连续引导提示合并与历史记录编辑功能。社区活跃度较高，共更新 33 个 Issues，主要集中在 **MCP (Model Context Protocol) 服务器兼容性**、**会话管理** 以及 **跨平台配置支持** 等方面，反映出开发者对 AI 助手在企业级环境中的稳定性与组织能力有强烈需求。

---

## 2. 版本发布

**v1.0.87-0** (2026-09-18 更新)
*   **交互体验增强**:
    *   连续的引导提示在相同模式下会自动合并为一条待处理消息，用户可通过在空输入框按 `Up` 键回退编辑（包括粘贴的文本）。
*   **自动路由层级改进**:
    *   为 Auto routing tier 添加了用户和托管默认设置，支持严格策略和可覆盖的组织策略。

---

## 3. 社区热点 Issues

### 🔴 高热度与活跃讨论
1.  **#1632**: [Plugins] Support subfolders for skills to better organize them
    *   **热度**: 24 👍 / 12 评论
    *   **摘要**: 用户希望对 Skills 进行子目录组织以解决扁平化结构混乱问题。
    *   **重要性**: 技能管理是自定义 Copilot 行为的核心，组织性问题直接影响开发者的使用体验。

2.  **#4870**: [MCP] Figma remote server fails to load
    *   **热度**: 11 👍 / 6 评论
    *   **摘要**: Figma MCP 服务器认证成功但工具未注册，CLI 将 `-32601` 错误视为致命失败。
    *   **重要性**: MCP 是连接外部数据源的关键协议，此问题阻碍了 Figma 等设计工具与 Copilot 的集成。

3.  **#1285**: [Agents] Organisation level Agent not showing up
    *   **热度**: 13 👍 / 10 评论
    *   **摘要**: 企业级 Agent 未在 CLI 或 VS Code 中显示，涉及命名空间与模板配置问题。
    *   **重要性**: Agent 的组织级展示是企业级部署的核心功能，直接影响团队协作效率。

### 🟡 稳定性与配置问题
4.  **#4905**: [Desktop] Desktop app sessions die after spawn
    *   **热度**: 2 👍 / 3 评论
    *   **摘要**: 桌面应用启动后几分钟内会话即失效，导致 GitHub 凭证状态失效。
    *   **重要性**: 影响桌面客户端的长期运行稳定性。

5.  **#4900**: [Config] config.json managed state lost on concurrent sessions
    *   **热度**: 0 👍 / 1 评论
    *   **摘要**: 多会话并发写入导致 `trustedFolders` 等配置丢失。
    *   **重要性**: 涉及数据一致性问题，可能导致权限策略失效。

6.  **#4765**: [Config] Fails to read config from non-repo root working directory
    *   **热度**: 0 👍 / 4 评论
    *   **摘要**: 非 Git 仓库根目录下的 `.mcp.json` 配置文件无法被读取。
    *   **重要性**: 影响非 Monorepo 项目的配置加载，限制了解决方案的灵活性。

### 🟢 关键 Bug 修复
7.  **#1824**: [Models] Default model selection (已关闭)
    *   **热度**: 3 👍 / 6 评论
    *   **摘要**: 用户希望设置默认模型，避免每次启动默认为 Claude Sonnet。
    *   **重要性**: 修复了模型选择的不一致性。

8.  **#1086**: [Platform-Windows] Do not enforce PowerShell on Windows (已关闭)
    *   **热度**: 2 👍 / 4 评论
    *   **摘要**: 修复了在 Windows CMD 中无法运行需要批处理文件的命令的问题。
    *   **重要性**: 提升了 Windows 用户的兼容性。

9.  **#3858**: [Input] Ctrl+Backspace doesn't work on Windows (已关闭)
    *   **热度**: 6 👍 / 2 评论
    *   **摘要**: 修复了 Windows 下删除前一个单词快捷键不工作的问题。
    *   **重要性**: 改善了基础输入体验。

10. **#4264**: [Plugins] Extensions slash command firing multiple times (已关闭)
    *   **热度**: 1 👍 / 1 评论
    *   **摘要**: 修复了 Slash 命令触发多次重复执行的问题。
    *   **重要性**: 修复了功能实现的 Bug。

---

## 4. 重要 PR 进展

*   **无** (过去24小时内无 Pull Requests 更新)。

---

## 5. 功能需求趋势

从 Issues 分析，社区关注的三大核心方向如下：

1.  **MCP 生态与集成 (MCP Integration)**:
    *   出现了多个关于 Figma、Atlassian OAuth、以及通用 MCP 服务器连接的问题。开发者正积极尝试将外部工具（如设计工具、项目管理工具）接入 Copilot 生态，对连接的稳定性要求极高。

2.  **企业级组织与管理**:
    *   企业级 Agent 显示、组织策略、配置文件管理等问题占据高位。这表明 Copilot CLI 正从个人开发工具向企业协作平台演进，组织者需要精细的控制权。

3.  **会话与上下文管理**:
    *   会话同步、会话合并、会话过期、会话元数据一致性等问题频发。随着使用场景变复杂，开发者需要更可靠的会话持久化和状态管理机制。

---

## 6. 开发者关注点

*   **跨平台兼容性**: Windows CMD 环境下的工具执行和键盘交互仍是痛点。
*   **配置文件管理**: 特别是 `.mcp.json` 和 `.copilot` 目录下的符号链接、多会话并发写入时的数据一致性。
*   **性能与 UI 响应**: 会话同步的延迟、UI 线程阻塞（如敏感信息过滤）、以及桌面应用会话的生命周期管理。
*   **交互细节**: 快捷键支持（如 Ctrl+Backspace）、参数解析（如带 `-` 开头的 prompt 处理）等基础体验优化。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期**: 2026-09-19  
**来源**: GitHub.com/MoonshotAI/kimi-cli

---

## 1. 今日速览
过去 24 小时内，Kimi Code CLI 社区活跃度平稳。**1 个新 Issue (macOS 图片粘贴偶发失败)** 和 **1 个 PR (Hooks 提取逻辑修复)** 引发关注。**13 个旧 Issue 获得开发者响应并关闭**，主要集中在代理配置、脚本安装、VSCode 字体调节及终端通知等体验优化方面。社区反馈显示，用户对 **macOS 2.0.0 新版本的回归问题**（图片粘贴）表示担忧。

---

## 2. 版本发布
**无** 新版本发布。

---

## 3. 社区热点 Issues

### 🔴 紧急/高频
*   **#2652 macOS 2.0.0 粘贴图片偶发静默失败** (Open)
    *   **摘要**: 用户升级至 `kimi 2.0.0` 后，在 macOS 上按 `Ctrl+V` 粘贴图片偶发完全无反应，不显示占位符。这是从 0.43.x Python 版本的回归问题。
    *   **重要性**: 影响核心交互体验，用户反馈强烈。

### 🐛 稳定性/配置
*   **#1234 环境变量代理在 `kimi login` 中失效** (Closed)
    *   **摘要**: 在使用 `kimi login` 时，基于环境变量的代理配置因 `aiohttp` 默认设置无法生效。
    *   **重要性**: 阻碍国内用户或企业用户进行网络连接。
*   **#1107 安装的 sh 脚本有 bug** (Closed)
    *   **摘要**: 安装脚本在检测不到 `uv` 时可能存在逻辑问题。
    *   **重要性**: 影响新用户安装成功率。
*   **#1459 Kimi 自身配置问题** (Closed)
    *   **摘要**: 用户反馈让 AI 自行配置 MCP 时的体验不够直观。
    *   **重要性**: 提升工具易用性。

### 💻 IDE 集成与 UI
*   **#1680 VSCode 中独立调节 Kimi 窗口字体** (Open)
    *   **摘要**: 用户强烈建议在 VSCode 插件中增加独立调节 Kimi 对话窗口字体大小的功能，以避免调整整体字体大小影响其他窗口。
    *   **重要性**: 提升多任务工作流中的用户体验细节。
*   **#1302 Web UI 项目路径与 Diff 视图重叠** (Closed)
    *   **摘要**: Kimi Code Web UI 中的项目路径视图与 diff 文件视图发生重叠，影响查看。
    *   **重要性**: Web 界面布局体验优化。

### 🖥️ 终端体验
*   **#1342 添加任务完成的终端通知** (Closed)
    *   **摘要**: Kimi CLI 目前不发送 OSC 转义序列，导致终端复用器（如 iTerm2, Kitty）无法弹出任务完成的桌面通知。
    *   **重要性**: 增强后台运行时的状态感知能力。

---

## 4. 重要 PR 进展

*   **#2176 fix(hooks): extract text from ContentPart for UserPromptSubmit hook** (Open)
    *   **摘要**: 修复了 `UserPromptSubmit` hook 在处理 `list[ContentPart]` 类型的输入时，无法正确提取 `prompt` 和 `matcher_value` 的问题。此前代码仅处理了字符串类型。
    *   **重要性**: 关键修复，确保了自定义 Hook 在新版本中的可用性，防止正则匹配失效。

---

## 5. 功能需求趋势

1.  **交互精细化**: 用户不再满足于整体 UI 调整，开始要求针对特定窗口（如 VSCode 中的 Kimi 窗口）进行独立配置（字体大小、布局）。
2.  **配置自动化与容错**: 反复出现关于自动检测依赖（如 `uv`）、自动配置 MCP 以及环境变量代理配置的问题，表明社区需要更健壮的安装和运行机制。
3.  **跨平台兼容性**: 随着新版本发布，用户对 macOS (Darwin) 平台的兼容性回归（图片粘贴）极为敏感。

---

## 6. 开发者关注点

*   **Hook 机制兼容性**: 开发者反馈在处理复杂输入类型（如 `ContentPart`）时，现有的 Hook 提取逻辑存在缺陷，限制了插件的扩展能力。
*   **终端集成深度**: 社区对终端复用器的深度集成（如 OSC 通知）有明确需求，这属于进阶开发者关注的功能点。
*   **Web UI 布局**: 前端开发者在反馈 Web 界面的布局遮挡问题，显示 UI 团队需要持续关注响应式设计。

---
*数据截止时间: 2026-09-18 23:59*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-09-19
**来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
过去 24 小时内，社区主要聚焦于 **OpenCode 免费层模型的使用限制问题**，导致大量用户在 MonoCode 前端和原生桌面端遇到 "can only be used from within OpenCode" 错误。同时，多个关于 **TUI 界面交互（Tab 键切换、快捷键失焦）** 和 **后台高 CPU 占用** 的 Bug 反馈较为集中。开发团队在 PR 中积极修复了主题系统重构、SDK 支持以及 Bedrock 缓存点处理的底层问题。

---

## 2. 版本发布
无新版本发布。

---

## 3. 社区热点 Issues

### 🔴 高优先级 / 影响面广
**#49433, #49580, #49590, #49678, #49723** - **Free Tier 模型使用限制错误**
*   **作者**: GooseOb, yanhenrique-dev 等
*   **摘要**: 多个 Issue 指出 OpenCode 的免费层（Muse Spark 1.3 Free 等）在 MonoCode 前端或 CLI 中运行时，会突然报错 "can only be used from within OpenCode"。这导致用户无法使用免费额度，且官方桌面端似乎也未能幸免。
*   **评论数**: 41 - 54
*   **链接**: [Issue #49433](https://github.com/anomalyco/opencode/issues/49433) | [Issue #49580](https://github.com/anomalyco/opencode/issues/49580)

**#30086** - **高 CPU 占用**
*   **作者**: DenisSilent
*   **摘要**: 自约一周前更新以来，OpenCode 的 CPU 使用率大幅飙升。用户报告称在运行 3 个会话时系统已卡顿，鼠标反应迟钝。
*   **评论数**: 54
*   **链接**: [Issue #30086](https://github.com/anomalyco/opencode/issues/30086)

### 🟡 界面与交互 Bug
**#49133** - **TUI Tab 键无法切换 Agent**
*   **作者**: gontadu
*   **摘要**: 在 OpenCode v2 中，Tab 键无法切换 Agent，反而是 Shift+Tab 有效。这是 TUI 交互中的一个功能性 Bug。
*   **评论数**: 6
*   **链接**: [Issue #49133](https://github.com/anomalyco/opencode/issues/49133)

**#49743** - **设置页面快捷键搜索框失焦**
*   **作者**: ysm-dev
*   **摘要**: 在 Settings → Shortcuts 页面，输入第一个字符后搜索框就会失去焦点，导致无法正常搜索快捷键配置。
*   **评论数**: 1
*   **链接**: [Issue #49743](https://github.com/anomalyco/opencode/issues/49743)

**#49721** - **Web UI 权限自动批准设置无效**
*   **作者**: hibikiwtnb
*   **摘要**: 在 Web UI 的设置页面中，点击 "Auto-approve permissions" 开关没有任何反应，导致每次请求仍需手动批准。
*   **评论数**: 1
*   **链接**: [Issue #49721](https://github.com/anomalyco/opencode/issues/49721)

### 🔵 性能与兼容性
**#48747** - **Windows AMD 显卡启动崩溃**
*   **作者**: systems-raghu
*   **摘要**: Windows 用户在安装 OpenCode Desktop 后，GPU 进程反复崩溃（exitCode -2147483645），导致应用无法正常启动。
*   **评论数**: 4
*   **链接**: [Issue #48747](https://github.com/anomalyco/opencode/issues/48747)

**#49014** - **Go 模型 5 小时限制影响所有模型**
*   **作者**: smogunovandrey66
*   **摘要**: 当某个 Go 模型达到 5 小时使用上限后，OpenCode 会错误地向所有其他模型返回相同的 "5-hour usage limit reached" 错误。
*   **评论数**: 4
*   **链接**: [Issue #49014](https://github.com/anomalyco/opencode/issues/49014)

---

## 4. 重要 PR 进展

**#49857** - **修复子进程 stdio 挂起问题**
*   **作者**: alaminopu
*   **内容**: 修复了当子进程持有 stdio 管道时进程无法正常退出的 Bug，这通常发生在后台服务器或 detached 进程中。
*   **状态**: Open
*   **链接**: [PR #49857](https://github.com/anomalyco/opencode/pull/49857)

**#49853, #49855, #49846** - **主题系统重构 (V2)**
*   **作者**: jlongster
*   **内容**: 一系列 PR 完成了 TUI 主题系统的重构。包括移除显式的版本号 discriminator，改为通过字段检测（如 `base` 字段）来识别 V2 主题，并注册了原生的 V2 `opencode` 主题。
*   **状态**: Closed
*   **链接**: [PR #49853](https://github.com/anomalyco/opencode/pull/49853) | [PR #49855](https://github.com/anomalyco/opencode/pull/49855)

**#49810** - **SDK 支持原生 Node ESM 导入**
*   **作者**: kitlangton
*   **内容**: 修复了 `@opencode/sdk` 包无法被 Node.js 或 Vitest 正确导入的问题（由扩展名丢失导致），现在支持原生 ESM 解析。
*   **状态**: Closed
*   **链接**: [PR #49810](https://github.com/anomalyco/opencode/pull/49810)

**#49849** - **修复 OpenAI OAuth 认证**
*   **作者**: jhsu
*   **内容**: 修复了使用 Zen API key 时，OpenAI ChatGPT OAuth 请求认证错误的 Bug。
*   **状态**: Open
*   **链接**: [PR #49849](https://github.com/anomalyco/opencode/pull/49849)

**#49305** - **等待子代理背景工作完成**
*   **作者**: Ploppy3
*   **内容**: 修复了子代理在后台工作（shell 或嵌套子代理）未完成时就结束回合的竞态条件。
*   **状态**: Open
*   **链接**: [PR #49305](https://github.com/anomalyco/opencode/pull/49305)

---

## 5. 功能需求趋势
从 Issues 和 PR 的分析来看，社区关注点主要集中在以下几个方向：
1.  **插件生态与架构**: 社区对插件工具域的扩展（如 `list()` 工具）以及配置加载机制的完善（如 `--pure` 模式）表现出了浓厚兴趣。
2.  **模型提供商兼容性**: 用户正在积极测试新的模型提供商（如 Bedrock 的 reasoning block 支持、Zen API 的 stream corruption 问题），并反馈兼容性细节。
3.  **多模型并发与限流**: 关于不同模型提供商之间互斥限制（如 Go 模型限制影响其他模型）的讨论反映了用户对并发使用策略的探索。

---

## 6. 开发者关注点
*   **稳定性**: 开发者最痛恨的是 "Can only be used from within OpenCode" 这种模糊的错误提示，以及高 CPU 占用导致的设备卡顿。
*   **交互细节**: TUI 的 Tab 键失效、快捷键输入失焦等微交互问题虽然看似小，但严重降低了 CLI 体验，社区反馈强烈。
*   **多端一致性**: MonoCode 前端与 OpenCode 后端的兼容性问题（Free Tier 错误）显示了开发者在使用非官方工具时的痛点。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-09-19  
**分析范围**: github.com/badlogic/pi-mono  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
过去24小时内，Pi 社区活跃度极高，共处理 **70** 个社区动态（50 个 Issues + 20 个 PR）。核心修复集中在 **TUI 交互体验**（如全屏模式滚动、快捷键配置）和 **Azure Foundry 部署支持**。同时，社区对 **Claude 新模型兼容性** 和 **跨项目会话管理** 的讨论热度不减。

---

## 2. 版本发布
> 无

---

## 3. 社区热点 Issues (Top 10)

| ID | 标题 | 状态 | 重要性 | 社区反应 |
|---|---|---|---|---|
| **#6278** | New Claude models work poorly with Pi's edit tool | 🟢 CLOSED | ⭐⭐⭐⭐⭐ | **高热度** - 25条评论，10个点赞。Claude 新模型编辑功能失败率高达20%，严重影响生产使用。 |
| **#7730** | High CPU usage on Mac OS with long session | 🟡 OPEN | ⭐⭐⭐⭐ | 16条评论，提及与上下文长度强相关。Mac 用户反馈严重，影响多轮对话流畅度。 |
| **#8684** | `PI_OFFLINE` undocumented behavior | 🟡 OPEN | ⭐⭐⭐⭐ | 11条评论。指出 `PI_OFFLINE` 环境变量不仅禁用更新检查，还禁用了所有提供商的模型发现，与文档不符。 |
| **#9652** | Compaction failed by Anthropic Claude Fable | 🟡 OPEN | ⭐⭐⭐⭐ | 6条评论。Claude Fable 模型对思考块转录的处理导致会话压缩失败，阻碍长对话场景。 |
| **#9616** | GLM Coding Plan catalog inconsistency | 🟢 CLOSED | ⭐⭐⭐ | 6条评论。智谱 GLM 计划精简模型后，Pi 内置目录仍列出旧模型，导致静默路由。 |
| **#9725** | OpenRouter baseUrl override regression | 🟢 CLOSED | ⭐⭐⭐ | 6条评论。0.85.1 版本破坏了 baseUrl 自定义功能，影响自定义代理配置。 |
| **#9549** | Large transcripts re-render every frame | 🟡 OPEN | ⭐⭐⭐ | 5条评论。提及 1 核饱和，性能瓶颈明显。Windows Terminal 环境下尤为严重。 |
| **#8827** | Legacy font switches force raw fallback | 🟡 OPEN | ⭐⭐⭐ | 6条评论。数学公式渲染问题，`\rm` 等旧命令导致整块回退为源码，影响代码审查体验。 |
| **#9753** | Worktree session fork confusion | 🟢 CLOSED | ⭐⭐⭐ | 2条评论。Git Worktree 场景下，同一仓库不同检出点误判为跨项目，导致不必要的 Fork 询问。 |
| **#9062** | Tool-call parsing quadratic complexity | 🟡 OPEN | ⭐⭐⭐ | 4条评论。流式响应解析算法存在 O(N²) 复杂度，长对话下性能衰减明显。 |

---

## 4. 重要 PR 进展 (Top 10)

| PR | 标题 | 状态 | 内容摘要 |
|---|---|---|---|
| **#9762** | fix: guard TUI against tool results without content array | 🟢 CLOSED | **关键修复**：防止扩展工具返回非标准格式（如 `{output: "..."}`）导致 TUI 崩溃。 |
| **#9754** | fix: treat same-repo worktrees as one project | 🟢 CLOSED | **会话管理优化**：解决 Git Worktree 场景下跨检出点误判为跨项目 Fork 的问题。 |
| **#9749** | feat: allow SDK callers to customize resume command | 🟢 CLOSED | **IDE 集成增强**：允许 SDK 调用者自定义交互式恢复命令，方便嵌入应用（如 Patooie）。 |
| **#9744** | feat: add /retry command for abandoned turns | 🟢 CLOSED | **交互性提升**：新增 `/retry` 命令，允许用户手动重试因网络问题中断的回合。 |
| **#9742** | feat: show shell durations in hours/minutes/seconds | 🟢 CLOSED | **用户体验**：修复 #9628，将工具执行耗时格式化从秒扩展为支持小时/分钟。 |
| **#9720** | fix: drive Mistral reasoning via thinkingLevelMap | 🟢 CLOSED | **模型支持**：修复 Mistral 推理分发逻辑，新增 `zai-glm-5-3` 模型支持。 |
| **#9736** | fix: retry stream cut before terminal event | 🟢 CLOSED | **稳定性修复**：修复流式响应过早结束时的重试逻辑，覆盖 OpenAI 和 Anthropic SDK。 |
| **#9724** | fix: fallback to exponential backoff for malformed dates | 🟢 CLOSED | **错误处理**：修复 `Retry-After` 日期解析失败导致 429 错误立即重试的问题。 |
| **#9722** | fix: retry opaque 4xx errors without body | 🟢 CLOSED | **重试策略**：扩展可重试的 4xx 错误范围（如无体 400），避免误判为非临时性错误。 |
| **#9719** | feat: make tool shell vertical padding configurable | 🟢 CLOSED | **TUI 个性化**：新增 `toolShellPaddingY` 配置项，默认 1，允许调整工具执行区高度。 |

---

## 5. 功能需求趋势

1. **模型兼容性适配**
   - **Claude 新模型 (Fable)**：编辑工具验证失败、思考块转录冲突。
   - **Azure Foundry**：DeepSeek V4 Pro 需要支持 Chat Completions API（PR #9714）。
   - **GLM / Qwen**：智谱 GLM 5.3 和通义千问 Token Plan 的本地化支持（PR #9720, #7989）。

2. **性能与稳定性**
   - **长会话性能**：Mac CPU 高占用、大文本量下的渲染性能（#7730, #9549）。
   - **流式解析优化**：工具调用参数解析的 O(N²) 复杂度问题（#9062）。

3. **交互体验优化**
   - **全屏模式**：滚动速度慢、输入框固定、快捷键行为不统一（#9052, #9758）。
   - **会话管理**：Git Worktree 场景下的会话识别、会话恢复命令的自定义（#9753, #9749）。

---

## 6. 开发者关注点

1. **环境变量与文档一致性**
   - `PI_OFFLINE` 的实际行为超出文档描述，可能导致意外的网络禁用。

2. **跨平台兼容性**
   - NixOS / Alpine (musl) 环境下动态链接库缺失（#9033）。
   - Wayland 剪贴板读取失败导致渲染崩溃（#9011）。

3. **错误处理与重试机制**
   - 部分无体 4xx 错误被错误分类，导致过早失败或静默忽略。
   - 流式响应中断时的重试逻辑需要更健壮的覆盖。

4. **扩展生态**
   - 扩展工具返回格式不统一（`{output}` vs `{content}`）导致 TUI 崩溃风险。
   - 扩展无法安全地向会话系统提示词追加内容（#9434 待合并）。

---

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*