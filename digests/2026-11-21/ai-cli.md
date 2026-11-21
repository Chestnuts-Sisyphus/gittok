# AI CLI 工具社区动态日报 2026-11-21

> 生成时间: 2026-11-21 00:59 UTC | 覆盖工具: 9 个

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
**日期**: 2026-11-21  
**分析对象**: openai/codex

---

## 1. 今日速览
今日主要围绕 **macOS 桌面端崩溃问题**（尤其是版本 26.1117.31558）展开密集讨论，多个用户报告在启动时出现 `NSUnknownKeyException`。同时，Windows 平台的 **蓝牙听写功能** 和 **远程连接** 也出现了新问题。在功能层面，MCP（模型上下文协议）插件系统的稳定性与性能优化成为开发者的关注焦点，多个关于插件加载与沙箱机制的 PR 获得批准。

---

## 2. 版本发布
**无** 新发布版本（Release 页面显示为 alpha 版本迭代，未标记为正式版）。

---

## 3. 社区热点 Issues

| Issue ID | 标题 | 重要性 | 社区反应 |
| :--- | :--- | :--- | :--- |
| **#62650** | macOS App 26.1117.31558 在壁纸变暗时崩溃 | 🔴 严重 | 53 评论，16 赞。**Launch-blocking regression**，影响范围极广。 |
| **#57101** | Windows Computer Use 截图后 UI 边框未关闭 | 🟡 高 | 75 评论，13 赞。**Computer Use** 生态的核心 bug，影响自动化体验。 |
| **#62683** | macOS 启动崩溃：NSUnknownKeyException | 🟡 高 | 15 评论。特定版本下的 Objective-C 桥接异常。 |
| **#62733** | Windows 蓝牙听写在更新后失效 | 🟡 中 | 3 评论。音频输入功能中断。 |
| **#62722** | Windows 快速重启失败：Connection for host ID local not found | 🟡 中 | 2 评论。本地主机连接管理问题。 |
| **#62472** | Codex Remote WebSocket 初始化超时（已关闭） | 🟢 低 | 5 评论。远程协作连接问题已修复。 |
| **#61294** | Windows 更新后本地项目消失 | 🟡 中 | 13 评论。数据持久化问题。 |
| **#62170** | macOS 运行 512MiB RPC 预算拒绝后 UI 卡死 | 🟡 中 | 3 评论。RPC 通信异常导致 UI 停滞。 |
| **#59398** | ChatGPT Plus 5小时配额 5分钟内耗尽 | 🟡 中 | 3 评论，4 赞。Pro 用户对配额效率的担忧。 |
| **#62853** | Windows 本地 Work 环境丢失导致扣费 | 🟡 中 | 3 评论。环境连接断开后的计费争议。 |

---

## 4. 重要 PR 进展

| PR ID | 标题 | 内容摘要 | 状态 |
| :--- | :--- | :--- | :--- |
| **#62876** | Prewarm MCP servers during cloud catalog refresh | 在云端目录刷新期间预热 MCP 服务器，减少首次调用延迟。 | Closed |
| **#62871** | Preserve per-image metadata in app-server image generation items | 修复图片生成响应中元数据丢失的问题，确保 app-server 正确传递后端 metadata。 | Closed |
| **#62870** | Use runtime authentication for TUI WebRTC calls | 为 TUI (Terminal User Interface) 的 WebRTC 调用启用运行时身份验证。 | Closed |
| **#62867** | Enable configuration server OAuth during app-server startup | 允许 app-server 在启动时处理配置服务器的 OAuth 授权，解决启动时的权限问题。 | Closed |
| **#62865** | Defer Windows sandbox owner restoration until sign-in | 延迟 Windows 沙箱所有者恢复操作，直到用户登录完成，解决启动时权限校验失败。 | Closed |
| **#62864** | Keep agent concurrency guidance when native tools are disabled | 当禁用原生工具时，保留多代理并发指导，防止并发限制丢失。 | Closed |
| **#62863** | Ask the Responses API to omit the echoed tool catalog | 请求 Responses API 在响应头中排除工具目录，减少数据冗余。 | Closed |
| **#62859** | Define the startup OAuth protocol for config servers | 定义配置服务器的启动 OAuth 协议，规范启动阶段的授权流程。 | Closed |
| **#62858** | Keep Cloud threads current in the Agents overview | 在代理概览中实时更新云端线程状态，解决状态不同步问题。 | Closed |
| **#62854** | Specialize OpenTelemetry providers for HTTP traces and metrics | 针对 HTTP 追踪和指标专门化 OpenTelemetry 提供者，优化性能。 | Closed |

---

## 5. 功能需求趋势

1.  **插件系统优化 (MCP)**: 社区对 Model Context Protocol 的依赖度增加，高频请求集中在插件的预热、状态管理 (`mcpServerStatus/list`) 以及工具调用的错误追踪上。
2.  **远程协作与跨平台体验**: 多个 Issue 询问关于 **Codex Remote** (跨设备控制) 的连接稳定性，以及本地聊天历史在 Windows/macOS 之间的迁移方案。
3.  **性能与资源管理**: 开发者反馈在 **Windows** 平台，长对话结合侧边栏会导致严重的 UI 卡顿（主线程重计算），且高负载下存在进程内存溢出风险。

---

## 6. 开发者关注点

*   **崩溃与稳定性**: 26.1117 版本在 macOS 上的崩溃率显著上升，特别是涉及 Objective-C 桥接 (`NSUnknownKeyException`) 和壁纸渲染 (`wallpaper tint fallback`) 的场景。
*   **权限管理**: Windows 平台的沙箱权限恢复机制不稳定，导致应用启动受阻；macOS 下的全权限控制有时在创建会话后会意外消失。
*   **开发工具集成**: 针对 **VS Code Remote SSH** 的断线重连体验仍有改进空间，特别是涉及多代理会话时的状态同步。
*   **计费与配额**: Pro 用户的配额消耗速度（如 5 分钟耗尽 5 小时配额）引发对后端计费逻辑和资源分配公平性的关注。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：** 2026-11-21  
**分析对象：** github.com/github/copilot-cli

---

## 1. 今日速览

GitHub Copilot CLI 于今日（11月21日）发布了 **v1.0.115-3** 版本，主要修复了 `@` 提及选择器关闭后的交互逻辑问题，并默认启用了 Windows 沙盒包查询。社区关注点集中在 **MCP (Model Context Protocol) 生态的稳定性**、**远程会话控制体验** 以及 **权限管理的复杂性** 上。目前，关于 Claude 模型缓存时长和远程控制失败的反馈热度较高。

---

## 2. 版本发布

### v1.0.115-3 (2026-11-21)
*   **修复**：解决了 `Ctrl+Y` 和 `Tab` 键在提及选择器关闭后无法恢复正常操作的问题，确保选择器在搜索未完成前保持可见。
*   **变更**：默认启用 Windows 沙盒包查询功能；新增通过配置项 `sandbox.userPolicy.capabilities` 和 `sandbox.userPolicy.seatbelt.extraMachLookups` 支持特定的 macOS Mach 服务查询，无需开启 Keychain 访问权限。

---

## 3. 社区热点 Issues

### 🔴 高优先级 / 稳定性问题

**#5478** [OPEN] Cortex XDR 杀死 Copilot CLI 启动的 Shell
*   **重要性**：**高危**。涉及企业安全软件的冲突，导致 Copilot 在受控环境中无法正常运行。
*   **摘要**：当 Copilot CLI 在包含 Git 仓库的目录启动时，Cortex XDR 会通过 `parent_process_spoofing` 规则终止 PowerShell 进程，导致 Copilot 崩溃。
*   **链接**：[github.com/github/copilot-cli Issue #5478](https://github.com/github/copilot-cli/issues/5478)

**#5468** [OPEN] 远程控制失败：GitHub Mobile 和网页端无法控制本地会话
*   **重要性**：**高**。核心功能缺陷，严重影响跨设备协作体验。
*   **摘要**：本地会话已同步，但通过 GitHub Mobile 或网页端无法发送控制指令，报错 `relay connect failed`。
*   **链接**：[github.com/github/copilot-cli Issue #5468](https://github.com/github/copilot-cli/issues/5468)

**#5541** [OPEN] Agent 在 WSL 中执行 `rsync` 导致用户数据被清空
*   **重要性**：**严重**。涉及数据丢失风险，需引起高度警惕。
*   **摘要**：Agent 在 WSL 中执行多行 Bash 脚本时，由于引号和换行符处理错误，导致 `rsync` 命令被错误解析，可能擦除用户驱动器数据。
*   **链接**：[github.com/github/copilot-cli Issue #5541](https://github.com/github/copilot-cli/issues/5541)

### 🟡 功能增强 / 体验优化

**#5220** [OPEN] Claude 模型缓存 TTL 建议改为 1 小时
*   **重要性**：**中高**。提升长对话场景下的性能和成本效益。
*   **摘要**：当前默认 5 分钟的缓存 TTL 在正常交互（阅读、思考、输入）中太短，导致对话上下文反复重新计算，建议增加 1 小时缓存选项。
*   **社区反应**：获得 17 个 👍，反映用户对长上下文处理的需求。
*   **链接**：[github.com/github/copilot-cli Issue #5220](https://github.com/github/copilot-cli/issues/5220)

**#5066** [OPEN] 辅助权限模式回归问题
*   **重要性**：**中**。频繁的权限弹窗降低开发效率。
*   **摘要**：用户反馈辅助权限模式最近对许多正常命令（如查找文件）也要求审批，感觉机制发生了变化。
*   **链接**：[github.com/github/copilot-cli Issue #5066](https://github.com/github/copilot-cli/issues/5066)

**#4203** [OPEN] 远程 MCP OAuth 令牌过期应自动刷新而非强制重登
*   **重要性**：**中**。改善远程工具的可用性。
*   **摘要**：当缓存的有效 `refresh_token` 存在但 `access_token` 过期时，应使用静默刷新流程，而非强制用户进行交互式登录。
*   **链接**：[github.com/github/copilot-cli Issue #4203](https://github.com/github/copilot-cli/issues/4203)

---

## 4. 重要 PR 进展

*(注：过去 24 小时内无新的 Pull Requests 更新，以下为基于 Issues 关联的已知修复进展)*

*   **#4793** [CLOSED] MCP OAuth 回调端口不匹配问题
    *   **进展**：已修复。Copilot CLI 之前声明的固定回环回调端口与实际发送的临时端口不一致，现已统一。
    *   **链接**：[github.com/github/copilot-cli PR #4793](https://github.com/github/copilot-cli/pull/4793)
*   **#4916** [CLOSED] MCP `resource.blob` 返回空内容
    *   **进展**：已修复。MCP 服务器返回的 base64 编码文本在 Copilot CLI 中未能正确传递给模型。
    *   **链接**：[github.com/github/copilot-cli PR #4916](https://github.com/github/copilot-cli/pull/4916)
*   **#5039** [CLOSED] MCP 登录版本协商失败
    *   **进展**：已修复。服务器拒绝协议版本时，CLI 现在支持回退到旧版本，不再直接报 400 错误。
    *   **链接**：[github.com/github/copilot-cli PR #5039](https://github.com/github/copilot-cli/pull/5039)

---

## 5. 功能需求趋势

通过对 44 条更新 Issues 的分析，社区当前的功能需求主要集中在以下三个方向：

1.  **MCP 生态深度集成与稳定性**：
    *   社区正在大量测试和构建基于 MCP 的插件。目前的痛点包括：OAuth 登录流程的复杂性、服务器启动失败的处理（CI 场景）、以及特定资源类型的解析（如 `resource.blob`）。
2.  **长上下文与性能优化**：
    *   **缓存策略**：用户强烈要求 Claude 模型的 Prompt 缓存时长延长（从 5 分钟到 1 小时）。
    *   **会话管理**：关于会话列表的列展示（如 AI 信用额度）、会话恢复（`unrevivable` sessions）以及远程控制同步的需求激增。
3.  **权限与沙盒安全性**：
    *   开发者对权限管理的“复杂性”感到困扰，希望简化配置（如永久允许特定目录读取权限）。同时，Windows 沙盒和 macOS 的安全策略（Cortex XDR, Seatbelt）对 Copilot 的影响成为企业用户关注的焦点。

---

## 6. 开发者关注点

*   **企业级部署障碍**：Windows 环境下的杀毒软件（如 Cortex XDR）拦截 Copilot CLI 的 git 进程是最高频的阻碍，需要更细致的进程白名单策略或兼容性模式。
*   **远程协作体验**：用户期待在移动端或网页端能够无缝控制本地终端，目前的断连和无法控制问题严重影响了“随处工作”的愿景。
*   **Agent 执行安全性**：Agent 在执行复杂脚本（如 WSL 下的 rsync）时的引号处理和上下文隔离问题，是导致不可逆错误的主要原因，开发者急需更严格的输入验证和回滚机制。
*   **MCP 协议标准化**：随着 MCP 生态的成熟，社区关注点已从“是否支持”转向“支持的质量”，包括错误处理、资源读取和版本兼容性。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-11-21
**数据范围：** 过去24小时

---

## 1. 今日速览
OpenCode 社区活跃度较高，主要集中在 **v2.3.2 版本的维护与修复**。今日共有 50 个 Issue 更新，其中 30 个处于开放状态；PR 领域则有 50 条更新，包含多个核心功能的修复与重构。社区热点集中在 **Code Mode 工具调用追踪、MCP 协议支持优化、以及桌面端交互体验** 的改进上。

---

## 2. 版本发布
**无新版本发布**。
*当前社区主要活跃于 v2.3.2 版本（发布于 2026-11-20）。*

---

## 3. 社区热点 Issues

1.  **[FEATURE] Restore Foreground Subagent Execution** (#64073)
    *   **重要性：** 🔥 架构级功能需求。
    *   **摘要：** 请求恢复前台子代理执行功能，此前该功能可能被移除或表现不佳，目前社区已有 7 个点赞。
    *   [链接](https://github.com/anomalyco/opencode/issues/64073)

2.  **[BUG] Qwen2.5-Coder 1.5B 返回空 analyze 工具调用** (#65156)
    *   **重要性：** 🔴 核心模型兼容性问题。
    *   **摘要：** 在 Ollama 上使用 Qwen2.5-Coder 1.5B 模型时，助手有时会返回空的工具调用而非正常响应，影响代码生成能力。
    *   [链接](https://github.com/anomalyco/opencode/issues/65156)

3.  **[BUG] 网络问题 / 403 错误** (#65200)
    *   **重要性：** 🔴 严重阻断性 Bug。
    *   **摘要：** 用户报告出现网络连接问题，疑似涉及 API Key 或地区限制相关的 403 错误。
    *   [链接](https://github.com/anomalyco/opencode/issues/65200)

4.  **[BUG] Windows shell tool 返回空输出** (#65214)
    *   **重要性：** 🔴 Windows 平台严重 Bug。
    *   **摘要：** 在 OpenCode Desktop 2.3.2 (Windows) 上，shell 工具对于包含路径参数的命令返回空输出，严重影响文件检查与语法分析。
    *   [链接](https://github.com/anomalyco/opencode/issues/65214)

5.  **[BUG] CLI 首次消息无限挂起** (#65245)
    *   **重要性：** 🔴 CLI 严重稳定性问题。
    *   **摘要：** 用户在 CLI 中输入 "hi" 等简单消息后，出现无限加载转圈，既无响应也无错误，Agent 无法正常初始化。
    *   [链接](https://github.com/anomalyco/opencode/issues/65245)

6.  **[BUG] 快照捕获包含 Git 忽略的大文件** (#65127)
    *   **重要性：** ⚠️ 性能与存储问题。
    *   **摘要：** 快照功能捕获了 Git 忽略的目录，导致快照存储激增 90GB，可能严重影响磁盘空间和性能。
    *   [链接](https://github.com/anomalyco/opencode/issues/65127)

7.  **[BUG] Cmd shell 转义双引号** (#64573)
    *   **重要性：** 🛠️ 平台兼容性 Bug。
    *   **摘要：** 在 Windows 上使用 `shell: "cmd"` 时，OpenCode 会过度转义命令中的双引号，导致参数解析错误。
    *   [链接](https://github.com/anomalyco/opencode/issues/64573)

8.  **[BUG] Windows 11 NumPad Home/End 键失效** (#65158)
    *   **重要性：** 🛠️ 用户体验问题。
    *   **摘要：** 在 Windows Terminal 中，NumLock 关闭时的 NumPad Home/End 键无法移动光标，尽管绑定已正确配置。
    *   [链接](https://github.com/anomalyco/opencode/issues/65158)

9.  **[BUG] TUI 删除会话后列表自动滚动回顶部** (#65250)
    *   **重要性：** 🛠️ TUI 交互 Bug。
    *   **摘要：** 在 TUI 会话列表中删除会话后，下一次导航会导致视图滚动到顶部，导致选中的行移出可视区域。
    *   [链接](https://github.com/anomalyco/opencode/issues/65250)

10. **[BUG] CLI 升级命令挂起** (#65253)
    *   **重要性：** 🔴 安装升级问题。
    *   **摘要：** 使用 `opencode upgrade` 命令时挂起，涉及 curl 下载超时设置问题。
    *   [链接](https://github.com/anomalyco/opencode/issues/65253)

---

## 4. 重要 PR 进展

1.  **fix(core): bound code mode tool call traces** (#65291)
    *   **内容：** 修复 Code Mode 工具调用追踪问题，限制最近 128 个嵌套调用和活跃调用的保留，防止追踪信息无限膨胀。
    *   [链接](https://github.com/anomalyco/opencode/pull/65291)

2.  **fix(core): machine review fixes** (#65295)
    *   **内容：** 修复机器审查功能，解决在所有连接机器上自动批准文件的问题，防止误操作。
    *   [链接](https://github.com/anomalyco/opencode/pull/65295)

3.  **feat(core): enable automations by default on every channel** (#65293)
    *   **内容：** 将自动化功能默认开启，减少用户手动配置的步骤。
    *   [链接](https://github.com/anomalyco/opencode/pull/65293)

4.  **feat(core): agent widgets** (#65261)
    *   **内容：** 新增 Agent 小部件功能，允许 Agent 在会话中渲染 PsychoScript 模板和 JSON 数据，提升交互丰富度。
    *   [链接](https://github.com/anomalyco/opencode/pull/65261)

5.  **fix(core): ask to reconnect ChatGPT when token rejected** (#65289)
    *   **内容：** 修复 ChatGPT 登录态问题，当刷新令牌被拒绝时，引导用户重新连接。
    *   [链接](https://github.com/anomalyco/opencode/pull/65289)

6.  **fix(core): watch PRs and pushes after shell exitCode rename** (#65283)
    *   **内容：** 修复因 shell 工具 `exit` 字段重命名为 `exitCode` 导致的 Console 监控功能失效问题。
    *   [链接](https://github.com/anomalyco/opencode/pull/65283)

7.  **feat(mcp): follow the MCP Events beta for push delivery** (#65271)
    *   **内容：** 升级 MCP Events 客户端至 beta 状态，支持推送交付机制，提升事件响应效率。
    *   [链接](https://github.com/anomalyco/opencode/pull/65271)

8.  **feat: add an advisor tool** (#63637)
    *   **内容：** 新增 `advisor` 工具，允许会话模型咨询用户指定的另一个模型，类似 Claude Code 的功能。
    *   [链接](https://github.com/anomalyco/opencode/pull/63637)

9.  **fix(core): run Code Mode tools called at the top level** (#65193)
    *   **内容：** 修复弱模型在顶层调用 Code Mode 工具时的执行逻辑，确保工具能正确执行。
    *   [链接](https://github.com/anomalyco/opencode/pull/65193)

10. **fix(cli): allow slower curl upgrades** (#65284)
    *   **内容：** 增加升级下载的超时时间，允许在下载速度较慢的机器上进行升级。
    *   [链接](https://github.com/anomalyco/opencode/pull/65284)

---

## 5. 功能需求趋势

*   **Code Mode 工具调用稳定性**：多个 Issue 和 PR 涉及工具调用的追踪、执行逻辑和边界处理，显示社区对复杂工作流执行能力的关注。
*   **MCP 协议深度集成**：PR 频繁更新 MCP 相关功能，包括事件推送、协议协商和 Beta 支持，表明 MCP 正成为 OpenCode 的核心扩展标准。
*   **桌面端体验优化**：大量反馈集中在 Windows/macOS 的 UI 渲染、快捷键映射和 spellcheck 上，强调了对本地 IDE 体验的极致追求。
*   **多模型与跨平台兼容性**：针对 Qwen、Ollama 以及不同操作系统的兼容性修复是当前的热点，确保工具在不同环境下的可用性。

---

## 6. 开发者关注点

*   **性能与存储**：`snapshots` 机制导致存储膨胀的问题引发担忧，社区期待更智能的文件过滤和清理机制。
*   **调试与可观测性**：开发者反馈 `session.interrupt` 事件的可观测性不足，难以追踪中断原因，希望增强日志和错误上下文。
*   **工具链集成**：CLI 的升级挂起和 Windows 环境下的特定工具缺陷（如 shell、cmd 转义）是阻碍生产环境使用的主要痛点。
*   **国际化与本地化**：部分 Issue 提及 UI 翻译键缺失导致显示问题，提示开发者在多语言支持上需加强测试覆盖。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-21  
**来源**: GitHub [badlogic/pi-mono](https://github.com/badlogic/pi-mono)  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
- **核心发布**: v1.6.0 正式上线，引入 **GPT-6.2 Sol** 模型并成为默认选择，支持 OpenAI、Azure 和 OpenAI Codex 三个提供商。
- **社区活跃**: 过去24小时内社区修复了 30 个 Bug，并针对 Windows 环境下的 Bash 命令截断、Prompt 缓存读取等高频痛点进行了大量修复。
- **技术焦点**: 新版发布后，社区高度关注 **GPT-6 系列模型的推理能力（Reasoning Effort）** 以及 **Gemini 4 Hydrogen** 的新特性支持。

---

## 2. 版本发布

### **v1.6.0 (2026-11-20)**
**核心更新**:
- **默认模型变更**: `GPT-6.2 Sol` 现已作为 `openai`、`azure` 和 `openai-codex` 提供商的默认模型。
- **文档支持**: 更新了 Providers 文档，详细说明了新模型在各平台的配置情况。

> [GitHub Release](https://github.com/badlogic/pi-mono/releases/tag/v1.6.0) | [Providers 文档](https://github.com/earendil-works/pi/blob/v1.6.0/packages/coding-agent/docs/providers.md)

---

## 3. 社区热点 Issues

| # | 标题 | 重要性 | 摘要 |
|---|------|--------|------|
| **12184** | [prio:p0] Google adapters reject Gemini 4 Hydrogen's advertised xhigh level | **P0 级** | 新模型支持：Gemini 4 Hydrogen 支持 `xhigh` 级别思考，但 Google 适配器拒绝该级别，导致无法使用。 |
| **12318** | [prio:p0] Anthropic /login fails on Claude Team/Enterprise seats | **P0 级** | 身份验证故障：在 Claude 团队/企业席位下登录时，出现 "Unknown scope" 错误，阻止授权流程。 |
| **12361** | [prio:p0] openai-codex 1.6.0: --thinking high/xhigh gets less reasoning | **P0 级** | 新模型 Bug：GPT-6 系列模型在设置 `reasoning.effort: "high"` 或 `"xhigh"` 时，实际发送的请求仍为 `"medium"`。 |
| **12308** | [prio:p0] OpenAI service tier pricing: ultrafast bills at 1x, Codex misses fast tiers | **P0 级** | 计费 Bug：`ultrafast` 服务层级计费错误，且 Codex 缺少 `fast` 层级，导致成本计算不准确。 |
| **12167** | [CLOSED] Uncaught AbortError when codemode cancels sibling file reads | **高** | 运行时错误：在 Codemode 中取消读取文件时，触发未捕获的 `AbortError`，导致进程崩溃。 |
| **12340** | [prio:p0] Windows Git Bash silently truncates long RPC bash commands | **高** | 平台兼容性：Windows Git Bash 长命令被截断，导致 RPC 调用失败。 |
| **12353** | [bug] Bedrock requests hang with HTTPS_PROXY set | **高** | 网络配置：设置 `HTTPS_PROXY` 后，AWS Bedrock 请求挂起，超时时间长达 120-400 秒。 |
| **12265** | [bug] compaction.modelOverrides ignored for routed model | **中** | 配置失效：在路由虚拟模型时，`compaction.modelOverrides` 设置被忽略。 |
| **11383** | [bug] Pasted ANSI leaves escape-sequence corpses | **中** | TUI 组件问题：粘贴包含 ANSI 转义序列的文本会导致提示词污染，且未终止的括号粘贴会卡死编辑器。 |
| **12150** | [bug] Invalid codemode call poisons session | **中** | 数据完整性：模型发出格式错误的 `codemode` 工具调用，导致会话数据损坏。 |

> **链接**: [GitHub Issues](https://github.com/earendil-works/pi/issues?q=is:issue+is:open+sort:comments-desc)

---

## 4. 重要 PR 进展

| # | 标题 | 类型 | 摘要 |
|---|------|------|------|
| **12371** | fix(ai): Gemini 3+ detection for prefixed Google model IDs | **修复** | 修复了带有 `gemini-` 前缀的模型 ID（如 `google/gemini-4-argon`）被误判为旧版 Gemini 的问题，并启用了 `strict` 模式支持。 |
| **12365** | fix(ai): resolve Bedrock SSO credentials through HTTPS_PROXY | **修复** | 修复了 AWS Bedrock 在使用 `HTTPS_PROXY` 时，SSO 凭证链无法正确获取的问题。 |
| **12366** | fix(ai): merge createProvider model catalog once per publish | **性能优化** | 修复了模型目录合并的 **O(n²)** 复杂度问题，将合并操作从每次 `getModels()` 调用移至发布时执行一次。 |
| **12360** | fix(coding-agent): load sessions with very many entries after compaction | **稳定性** | 修复了会话在最后一次压缩后包含 >120k 条目时无法加载的问题（`RangeError: Maximum call stack size exceeded`）。 |
| **12355** | fix(coding-agent): show the end of an over-long line in bash output | **UI 修复** | 修复了 Bash 工具在输出超过 200KB 时只显示换行符的问题，现在能正确显示完整日志。 |
| **12352** | fix(ai): retry gateway provider-unavailable and partial-response errors | **稳定性** | 增强了网关提供商的容错能力，正确处理 SSE 流中的错误事件（如 "provider temporarily unavailable"）。 |
| **12348** | fix(ai): remove abort listeners after retry backoff | **资源管理** | 修复了重试退避机制中 abort 事件监听器未正确清理的问题，防止内存泄漏和信号状态污染。 |
| **12370** | fix(tui): move repeated prompts to the front of editor history | **UX 修复** | 修复了通过 `/tree` 导航时，历史记录重复添加相同 Prompt 的问题。 |
| **12369** | fix(coding-agent): pass Windows bash commands in an environment variable | **平台兼容** | 解决了 Windows Git Bash 对长命令（>8KB）的截断问题，将命令放入环境变量传递。 |
| **12358** | fix(ai): report OpenAI Decisions cache read and write tokens | **功能增强** | 修复了 GPT-6 Luna 分类器 API 返回的 `cached_tokens` 和 `cache_write_tokens` 未被正确解析和统计的问题。 |

> **链接**: [GitHub Pull Requests](https://github.com/earendil-works/pi/pulls?q=is:pr+is:merged+sort:updated-desc)

---

## 5. 功能需求趋势

基于过去24小时的热点 Issues 和 PR，社区关注点集中在以下方向：

1. **新模型适配**:
   - **Gemini 4 Hydrogen**: 社区迫切需要支持其新的 `xhigh` 思考层级。
   - **GPT-6 系列**: 需要验证 `reasoning.effort` 在 `high` 和 `xhigh` 模式下的实际效果。

2. **平台兼容性**:
   - **Windows Git Bash**: 长命令截断是高频痛点，社区急需解决方案。
   - **AWS Bedrock Proxy**: SSO 凭证在代理环境下的获取是关键网络配置问题。

3. **性能与稳定性**:
   - **Prompt 缓存**: 修复缓存读取、写入 token 统计，以及空闲缓存预热配置。
   - **会话管理**: 修复超大规模会话（>120k 条目）的加载和压缩问题。

4. **错误处理与诊断**:
   - **AbortError**: Codemode 中的取消操作需更健壮的错误处理。
   - **Prompt 反馈**: Google 适配器需正确区分被拒绝的 Prompt 和不完整的流。

---

## 6. 开发者关注点

- **高频痛点**: Windows Git Bash 长命令截断、Prompt 缓存配置、超大规模会话加载。
- **新特性支持**: Gemini 4 Hydrogen 的 `xhigh` 思考层级、GPT-6 的推理能力优化。
- **平台特定问题**: AWS Bedrock SSO 凭证在代理环境下的获取、Anthropic 团队席位登录。

> **分析师总结**: v1.6.0 的发布标志着 Pi 在模型生态上的进一步扩展，但社区反馈显示，新模型的支持、跨平台兼容性以及大规模会话的稳定性仍是当前开发的核心挑战。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-11-21  
**数据来源**: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 1. 今日速览
- **CI 稳定性问题持续发酵**：今日有 3 个高优先级 CI 失败问题处于活跃状态（#11680, #11678, #14724），主要涉及 E2E 测试和 SDK Java 测试，其中 #11680 评论量已破百，显示社区对核心测试链路中断的担忧。
- **Managed Agent 功能持续迭代**：v0.28.1-preview.1 发布，重点修复了 E2E 测试中的调度器逻辑，并引入了 Runtime 状态目录创建的优化（PR #17964）。
- **依赖安全审计告警**：每日依赖 CVE 审计再次触发 (#13078)，提示项目需关注 npm 生态的高危漏洞。

---

## 2. 版本发布
### v0.28.1-preview.1 (2026-11-21)
- **更新内容**：
  - 修复全栈 E2E 测试中真实 `/loop` 调度的观察逻辑（PR #17506）。
  - 硬化 PR 验证流程的监控机制（fix(verify-pr)）。
- **链接**: [Release Notes](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.1-preview.1)

---

## 3. 社区热点 Issues

| # | 标题 | 优先级 | 状态 | 摘要与社区反应 |
|---|------|--------|------|----------------|
| **#11680** | Main CI failed: E2E Tests — no test identified | Bug | 🔴 Open | **评论 100+**：E2E 测试在 Linux 环境下完全无法识别测试用例，导致主分支 CI 失败。作者建议按提交追踪问题，社区关注点在于修复后是否能恢复测试覆盖率。 |
| **#14724** | Main CI failed: Managed Agent gate — no test identified | Bug | 🔴 Open | **评论 505+**：Managed Agent 测试门禁完全失效，且无测试结果报告。这是目前最严重的问题，严重阻碍 PR 合并。 |
| **#13078** | Daily dependency CVE audit failed | Security | 🔴 Open | **评论 57**：npm 审计端点不可用或发现新高危漏洞。社区需关注依赖库的更新策略。 |
| **#11678** | Main CI failed: Qwen Code CI — no test identified | Bug | 🔴 Open | **评论 51**：Windows 环境下的测试生成步骤失败，影响跨平台 CI 稳定性。 |
| **#17934** | E2E Tests: session recovery after daemon SIGKILL | Bug | 🔴 Open | **评论 14**：测试验证 daemon 被强制终止后的会话恢复逻辑，目前处于待定状态。 |
| **#17957** | Managed Agent: RuntimeProviderPluginsTest 失败 | Bug | 🔴 Open | **评论 9**：Java SDK 测试中插件可选性验证失败，可能与环境配置有关。 |
| **#17167** | PR #15450 审核 stalled 72h | Review | 🟡 In-Review | QQ 频道富媒体发送工具 PR 已就绪但审核停滞，社区关注维护者响应速度。 |
| **#15486** | 自动压缩导致 token 计数错误 | Bug | 🔴 Open | **评论 7**：工具结果未完成时压缩会导致下一轮请求大小估算错误，触发 `max_tokens: 1` 截断。 |
| **#17237** | Web Shell worktree Codex 语义对齐 | Feature | 🟡 Blocked | Web Shell 工作树功能的需求被阻塞，社区关注 Git 集成体验的完善。 |
| **#17523** | Pre-admission load 消耗重试预算 | Bug | 🔴 Open | **评论 4**：预准入加载失败仍消耗正常重试预算，可能影响资源利用率。 |

---

## 4. 重要 PR 进展

| # | 标题 | 作者 | 状态 | 摘要 |
|---|------|------|------|------|
| **#17964** | Move ephemeral Runtime state directory creation | wenshao | 🔵 Open | **核心修复**：将 Runtime 状态目录创建从工厂迁移到单点 chokepoint，解决资源初始化时序问题。 |
| **#17951** | Resume partial release instead of refusing retry | yiliang114 | 🔵 Open | **CI/CD 优化**：修复 npm 发布部分失败时的重试逻辑，避免因分支已存在而拒绝重试。 |
| **#17956** | Close watch liveness windows and resolve capture deps | wenshao | 🔵 Open | **测试增强**：解决 PR 验证流程中的可靠性漏洞，包括工作目录依赖解析和终端捕获优化。 |
| **#17910** | Retain oversized transcript indexes in bounded cache | wenshao | 🔵 Open | **性能优化**：为超大索引引入独立的 256MiB 缓存类，避免每次请求拒绝准入。 |
| **#17902** | Correct usage token accounting across dashboard | wenshao | 🔵 Open | **数据准确性**：修复仪表盘和统计视图中的 token 计数错误，改用本地请求账本。 |
| **#17935** | Update sidebar logo for dark theme | wenshao | 🔵 Open | **UI 优化**：仅修改 Web Shell 深色模式下的侧边栏 Logo。 |
| **#17903** | Gate Teams channel on npm publishing bootstrap | qwen-code-dev-bot | 🔵 Open | **发布控制**：将 Microsoft Teams 渠道发布与一次性引导发布绑定，避免发布失败。 |
| **#17884** | Deflake chat transcript document test | qwen-code-review-bot | 🟢 Closed | **测试修复**：通过重跑验证测试为非确定性失败，现已关闭。 |
| **#17885** | Fix Windows 32767 char capture limit | wenshao | 🟢 Closed | **Windows 修复**：解决 32780 字符捕获负载通过 argv 传递导致超限的问题。 |
| **#17553** | Give editor-parity waits shared-pool stall tier | qwen-code-dev-bot | 🔵 Open | **测试稳定性**：提升交互式编辑器测试的轮询超时时间（12s→30s），解决 Runner Pool 瓶颈。 |

---

## 5. 功能需求趋势
- **Managed Agent 优化**：社区持续关注 Runtime 资源管理、预准入逻辑和会话恢复能力（如 #17964, #17523）。
- **Web Shell 体验**：工作树语义对齐、环境面板滚动和 UI 细节优化是高频需求（#17237, #17963）。
- **测试覆盖率与稳定性**：E2E 测试和 CI 门禁的可靠性被反复强调（#11680, #17934）。
- **模型兼容性**：DeepSeek 系列模型的输出限制问题引发关注（#17188）。

---

## 6. 开发者关注点
- **CI/CD 失败率**：高优先级的 CI 失败问题（#11680, #14724）严重阻碍开发流程，需优先修复。
- **资源管理**：Token 计数错误、大文件扫描性能和缓存策略是性能优化的重点（#15486, #17910）。
- **跨平台兼容性**：Windows 环境下的测试失败和字符限制问题需要针对性修复（#17885）。
- **审核效率**：部分 PR 因审核停滞导致合并延迟，社区呼吁维护者加快响应（#17167）。

--- 
**日报生成时间**: 2026-11-21 00:00 UTC  
**分析工具**: AI 开发技术分析师

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑11‑21**  

---  

### 1️⃣ 今日速览  
- 本日 **execpolicy** 与 **TUI** 相关的安全与交互缺陷得到多项关键修复（如 `stdin_piped` 传播、动态 flag/verb 检测、`tmux` 额外执行动词）。  
- 多个长期悬而未决的 **read‑only 工具分类** 与 **paste‑burst 截断** 问题已在 Issue 中提出并得到关注，社区讨论热烈。  

---  

### 2️⃣ 版本发布  
> **暂无** 新的 Release，所有改动仍在 PR 评审与 Issue 讨论阶段。  

---  

### 3️⃣ 社区热点 Issues（精选 10 条）  

| 编号 | 标题 / 关键点 | 重要性说明 | 社区反馈 |
|------|---------------|------------|----------|
| **#7343** | TUI 在不支持 DEC 2026 的终端（gnome‑terminal/VTE）聚焦时全屏擦除并重绘，导致闪烁 | 影响大量 Linux 桌面用户的可视体验，已被 **CLOSED** 但留下实现方案讨论 | 2 条评论，提出后续兼容方案 |
| **#7344** | GNOME Terminal 退出后仍保留自定义 Nord 主题配色 | UI 状态恢复不完整，直接影响用户日常使用感受 | 2 条评论，期待恢复原配置的实现 |
| **#7354** | 会话 admission 锁在 fork 准备阶段未释放，阻塞无关线程 | 可能导致高并发下的性能瓶颈 | 1 条评论，已标记为高优先级 |
| **#7403** | `PASTE_BURST_MAX_BYTES = 64 KiB` silently truncates large raw pastes（尤其是 CJK） | 数据截断导致用户粘贴内容丢失，影响编辑体验 | 1 条评论，已提出增大阈值或警告机制 |
| **#7412** | `find -delete` 未被 execpolicy 识别为破坏性 payload | 关键安全检测盲点，可能被绕过 | 1 条评论，呼吁快速修补 |
| **#7414** | 二次 Enter 键在命令上下文释放后仍被错误捕获 | 交互细节错误导致误提交或需手动撤销 | 0 条评论，但已被标记为 bug |
| **#7415** | execpolicy 未覆盖 tmux 的若干执行动词（display‑popup、confirm‑before 等） | 影响在 tmux 环境下的安全策略完整性 | 0 条评论，已列入待实现列表 |
| **#7408** | 动态 flag/verb 全词匹配绕过扫描（如 `su $(echo -c)`） | 安全审计漏洞，能导致任意命令执行 | 0 条评论，已形成后续改进计划 |
| **#7432** | Skills 索引默认值异常、子目录不可见 | 影响插件/工具发现的可用性，用户找不到已安装的 skill | 0 条评论，已确认为回归 |
| **#7433** | 提议在 **agent 工作前** 加入维护者 gate、执行后进行回归检查 | 为提升 CI/agent 可靠性提供流程化方案 | 0 条评论，已在文档中草案化 |

> 所有 Issue 均可通过链接直接访问，便于跟踪进展。

---  

### 4️⃣ 重要 PR 进展（精选 10 条）  

| 编号 | 标题 / 关键修复 | 主要内容 | 状态 |
|------|----------------|----------|------|
| **#7429** | fix(execpolicy): tighten `stdin_piped` propagation & `numactl --strict` | 修正 `||` 与 `|` 的管道标记差异，防止误判 `stdin_piped`，并强化 `numactl` 参数检查 | **已合并** |
| **#7430** | fix(execpolicy): scan static `awk` / `sed` payloads | 为静态脚本中的 `system`/`s///e` 添加安全扫描，阻止隐藏的 deny‑list 命令 | **已合并** |
| **#7431** | fix(engine): classify read‑only deferred tools as **Safe** | 完善 `get_tool_category()`，使 16+ 只读工具不再被误判为 `Unknown`，提升 Auto‑Review 正确性 | **已合并** |
| **#7428** | fix(execpolicy): model additional `tmux` execution verbs | 为 `tmux display-popup`、`confirm-before`、`command-prompt`、`bind-key`、`source-file` 增加语义模型，防止绕过安全策略 | **打开** |
| **#7427** | fix(execpolicy): reject whole‑word dynamic flag/verb names | 检测运行时解析的完整 flag/verb，确保动态生成的命令仍受 deny‑rule 约束 | **打开** |
| **#7424** | fix(execpolicy): propagate dynamic bit on nix/launcher flags | 解决 `nix develop -c$(echo rm)` 等情形下 flag 被错误标记为静态的漏洞 | **打开** |
| **#7426** | fix(execpolicy): bound repeated `--` deny‑target expansion | 优化 `--` 分隔符的扩展逻辑，防止指数级扫描导致的性能崩溃 | **已合并** |
| **#7393** | lane 8 batch 2: stop repeated `--` stall | 同上，针对 0.10.3‑lane 8 的性能回退做了根本性改进 | **已合并** |
| **#7392** | feat(plugins): land 0.10.3 DSH parity & asset fix | 引入 DSH 插件兼容层，提升插件生态的统一性 | **已合并** |
| **#7380** | ci(mirror): sync CNB & GitCode on every release | 自动化镜像同步，确保国内外用户获取最新构建 | **已合并** |

> 以上 PR 均已在过去 24 小时内有更新，建议关注其最终合并状态与后续发布计划。  

---  

### 5️⃣ 功能需求趋势  

从本日全部 **17 条 Issue** 中提炼，社区最关注的方向如下：

| 趋势 | 具体需求 |
|------|----------|
| **交互稳定性** | 窗口聚焦闪烁、Enter 键重复捕获、粘贴截断等 UI 细节问题 |
| **安全审计** | execpolicy 对 `find -delete`、`awk/sed`、动态 flag/verb、tmux 动词的全覆盖检测 |
| **工具分类与自动审查** | 只读工具的正确归类、Agent 工作前的维护者 gate、回归检测阶段 |
| **多终端兼容** | 对不支持 DEC 2026 的终端（gnome‑terminal/VTE）进行兼容处理 |
| **技能/插件可发现性** | Skills 索引默认值与子目录展示问题、DSH 插件兼容性提升 |
| **CI/CD 与镜像同步** | 自动化国内镜像同步、依赖升级（parking_lot、zeroize 等）确保构建一致性 |

---  

### 6️⃣ 开发者关注点（痛点 & 高频需求）  

1. **安全策略盲点** – 多个 Issue 指出 execpolicy 在动态生成命令、特定 flag/verb 以及 `find -delete` 上的检测缺失，开发者迫切希望一次性补全。  
2. **粘贴与输入体验** – `PASTE_BURST_MAX_BYTES` 触发的截断以及 Enter 键的双重捕获，直接影响编辑效率，被视为高优先级 bug。  
3. **工具分类不准确** – 只读工具被误归为 `Unknown` 导致 Auto‑Review 走向错误路径，影响 CI 通过率。  
4. **终端兼容性** – 对老旧或不完整的 DEC 2026 支持的终端出现闪烁与配色残留问题，需在渲染层提供回退方案。  
5. **技能/插件发现** – Skills 索引默认值异常与子目录不可见导致用户难以定位已安装的插件/skill，需求明确的 UI/CLI 改进。  

> **建议**：在下一个里程碑（0.10.4 预备）中优先合并 execpolicy 安全增强与 TUI 输入/渲染修复，以提升整体用户体验与系统安全性。  

---  

**温馨提醒**：所有链接均指向对应的 GitHub Issue / PR 页面，点击即可查看详细讨论与代码改动。祝大家编码愉快！  

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*