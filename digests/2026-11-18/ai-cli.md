# AI CLI 工具社区动态日报 2026-11-18

> 生成时间: 2026-11-18 01:57 UTC | 覆盖工具: 9 个

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
**日期**: 2026-11-18  
**分析对象**: github.com/github/copilot-cli

---

## 1. 今日速览

社区今日迎来 **v1.0.114-0** 版本更新，重点修复了管理员通过 `features.browserUse` 管理设置在运行会话中禁用内置浏览器功能的控制权问题。与此同时，Windows 平台上的 **Cortex XDR 安全软件** 与 Copilot CLI 的冲突问题引发关注，导致命令行进程被杀。此外，**扩展 SDK 重命名**（`@github/copilot-sdk` → `@microsoft/copilot-sdk`）导致兼容性中断，而 **MCP（模型上下文协议）** 相关的认证、发现及会话恢复问题依旧是开发者反馈的高频领域。

---

## 2. 版本发布

### v1.0.114-0 (2026-11-18)
*   **更新摘要**: 修复了管理功能，允许管理员通过 `features.browserUse` 配置项在运行会话中禁用内置的浏览器使用功能。
*   **影响范围**: 企业级部署管理、会话控制。
*   **发布链接**: [v1.0.114-0](https://github.com/github/copilot-cli/releases/tag/v1.0.114-0)

### v1.0.113-1 (2026-11-17)
*   **更新摘要**: 同步了 v1.0.113 的管理设置修复，确保管理员可以完全控制 `features.browserUse`。
*   **发布链接**: [v1.0.113-1](https://github.com/github/copilot-cli/releases/tag/v1.0.113-1)

---

## 3. 社区热点 Issues

1.  **#5478 - Cortex XDR 杀死 Git 进程** (Windows 平台)
    *   **重要性**: ⭐⭐⭐⭐⭐ (高)
    *   **摘要**: 在包含 Git 仓库的目录中启动 Copilot 时，Cortex XDR 的 `parent_process_spoofing` 检测机制会杀死 `cmd/powershell`。
    *   **原因**: 安全软件将 Copilot 启动的 `git` 命误判为进程欺骗攻击。
    *   **社区反应**: 1 个赞，5 条评论。
    *   **链接**: [Issue #5478](https://github.com/github/copilot-cli/issues/5478)

2.  **#5492 - SDK 包名重命名导致插件崩溃** (Triage)
    *   **重要性**: ⭐⭐⭐⭐⭐ (高)
    *   **摘要**: v1.0.113 将 SDK 从 `@github/copilot-sdk` 重命名为 `@microsoft/copilot-sdk`，且未提供别名或迁移说明，导致现有扩展无法加载。
    *   **社区反应**: 0 个赞，0 条评论。
    *   **链接**: [Issue #5492](https://github.com/github/copilot-cli/issues/5492)

3.  **#4674 - 会话恢复后自定义 Agent 消失** (Closed)
    *   **重要性**: ⭐⭐⭐⭐
    *   **摘要**: 这是一个回归问题，恢复会话时，自定义 Agent 的配置（`mcp-servers` 和 `tools` 允许列表）未重新应用。
    *   **状态**: 已关闭 (Closed)。
    *   **链接**: [Issue #4674](https://github.com/github/copilot-cli/issues/4674)

4.  **#4773 - MCP 工具重复发现报错** (MCP/Tools)
    *   **重要性**: ⭐⭐⭐⭐
    *   **摘要**: 已加载命名空间内的工具，在模型侧重复发现时会错误报告 "Found 0 tools"，导致 Agent 跳过工作流步骤。
    *   **链接**: [Issue #4773](https://github.com/github/copilot-cli/issues/4773)

5.  **#5318 - grep 压缩功能损坏文件名** (Tools)
    *   **重要性**: ⭐⭐⭐
    *   **摘要**: 内置 `rg` 工具的输出压缩功能会将数字文件名后缀或目录组件误判为分隔符，导致文件名和行号错乱。
    *   **状态**: 已关闭 (Closed)。
    *   **链接**: [Issue #5318](https://github.com/github/copilot-cli/issues/5318)

6.  **#5290 - 缺少 `--fusion-tier` 参数** (Configuration)
    *   **重要性**: ⭐⭐⭐
    *   **摘要**: 文档中提到了使用 `--fusion-tier` 配置 `fusionTier`，但实际 CLI 命令中缺失该参数。
    *   **状态**: 已关闭 (Closed)。
    *   **链接**: [Issue #5290](https://github.com/github/copilot-cli/issues/5290)

7.  **#5180 - macOS Surge 代理导致 web_fetch 失败** (Networking)
    *   **重要性**: ⭐⭐⭐
    *   **摘要**: macOS 上开启 Surge 增强模式时，DNS 返回 Fake-IP (198.18.0.0/15)，导致 Copilot CLI 的 `web_fetch` 拒绝公共域名。
    *   **状态**: 已关闭 (Closed)。
    *   **链接**: [Issue #5180](https://github.com/github/copilot-cli/issues/5180)

8.  **#5165 - Enterprise 账户认证失败** (Authentication)
    *   **重要性**: ⭐⭐⭐
    *   **摘要**: Copilot Enterprise 账户路由到 `api.business.githubcopilot.com` 时出现 401 认证失败，尽管 Token 有效。
    *   **状态**: 已关闭 (Closed)。
    *   **链接**: [Issue #5165](https://github.com/github/copilot-cli/issues/5165)

9.  **#5495 - Computer Use 被 OpenAI Codex 拦截** (Windows 平台)
    *   **重要性**: ⭐⭐⭐
    *   **摘要**: Windows 上 Copilot 的 Computer Use 功能被内置安全策略拦截，拒绝访问 ChatGPT 桌面应用。
    *   **链接**: [Issue #5495](https://github.com/github/copilot-cli/issues/5495)

10. **#5496 - Windows 无盘符路径下 Repo 指令文件加载失败** (Triage)
    *   **重要性**: ⭐⭐
    *   **摘要**: 当仓库位于没有盘符的挂载点（Reparse Point）时，Repo 指令文件无法加载。
    *   **链接**: [Issue #5496](https://github.com/github/copilot-cli/issues/5496)

---

## 4. 重要 PR 进展

*   **今日暂无 Pull Requests 更新**。
    *   *注：根据数据源，过去 24 小时内无新的 PR 活动。*

---

## 5. 功能需求趋势

从今日的 Issues 分析来看，社区关注点主要集中在以下几个方向：

1.  **平台兼容性与环境隔离**:
    *   **Windows 特有问题**: 包括 Cortex XDR 杀进程 (#5478)、Surge 代理 (#5180)、无盘符路径 (#5496) 以及 Computer Use 安全策略 (#5495)。
    *   **权限与沙箱**: 本地沙箱认证 (#4804) 和沙箱配置策略 (#4446) 是企业用户关心的重点。

2.  **MCP (Model Context Protocol) 能力增强**:
    *   MCP 依然是热点，涉及 OAuth 认证失败 (#5040)、工具发现错误 (#4773) 以及非交互模式下的采样权限 (#2882)。

3.  **会话与 Agent 管理稳定性**:
    *   会话恢复后配置丢失 (#4674) 和 Agent 热重载缺失 (#3106) 反复出现，说明 Agent 的状态管理机制仍有待完善。

4.  **扩展生态与 SDK**:
    *   SDK 重命名导致的兼容性中断 (#5492) 表明插件开发者急需迁移指南。

---

## 6. 开发者关注点

*   **认证流程**: 用户在非交互模式或沙箱环境下使用 OAuth 时，经常遇到令牌选择错误或回调地址被拒绝的问题。
*   **工具输出解析**: `grep` 等内置工具在处理特定格式（如带数字后缀的文件名）时存在解析 Bug，影响开发效率。
*   **企业管控**: 管理员迫切需要更细粒度的控制手段（如浏览器功能开关、沙箱配置策略）来管控 Copilot CLI 的使用。
*   **反馈机制**: `/feedback` 命令中的 "Save feedback bundle" 术语容易引起歧义，导致用户误操作。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-11-18  
**分析对象**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

### 1. 今日速览
OpenCode 今日迎来了 **v2.3.2 版本发布**，重点修复了 GPT-6.2 模型的 Prompt 缓存机制及超时 Shell 命令处理逻辑。社区在 v2.3.0 升级路径上反馈了多项数据持久化与渲染问题，尤其是会话数据迁移与桌面端国际化渲染的 Bug 引发了较多关注，但核心功能如 Code Mode 工具链与多会话管理的改进仍在稳步推进。

---

### 2. 版本发布

#### **v2.3.2 (2026-11-18)**
*   **核心修复**: 修复 GPT-6.2 模型在 Responses API 路由中不缓存顶层 `instructions` 导致的重复计费问题。OpenCode 现在将其作为前置开发消息发送，确保系统提示被正确缓存。
*   **Shell 命令优化**: 超时后仍在运行的 Shell 命令将转入后台执行，不再被强制终止，从而允许长时构建和测试顺利完成。
*   **桌面端升级体验**: OpenCode 1.0 引入了后台静默下载 OpenCode 2.0 的机制，支持用户在重启、退出时或稍后手动升级，且保留会话、项目和设置。

---

### 3. 社区热点 Issues

1.  **#64543 [Bug] 中文会话标题在英文 UI 下显示乱码**
    *   **重要性**: 严重的国际化渲染 Bug，影响多语言用户的核心交互体验。
    *   **详情**: 当 UI 切换为英文时，会话标签页和面包屑导航中的中文字符出现渲染错误。文本存储正确，问题出在渲染层。目前尚未收到官方明确回复。

2.  **#40524 [Open] 2.0 版本： reconcile provider catalogs with /models endpoints**
    *   **重要性**: 影响模型调用的准确性，核心基础设施问题。
    *   **详情**: v2.0 试图解决模型目录与提供商 `/models` 端点不一致的问题，这会导致模型列表与实际可用模型脱节。

3.  **#64558 [Bug] Subagent 完成时静默跳过通知**
    *   **重要性**: 影响多智能体协作的反馈机制，可能导致用户无法感知子任务完成状态。
    *   **详情**: OpenCode 2.3.0 中，当子 agent 的消息跨越执行周期边界时，完成通知可能被静默跳过，尽管数据已持久化。

4.  **#64416 [Bug] OVHcloud Qwen3.8-27B 缺少 finish_reason**
    *   **重要性**: 具体的模型兼容性问题，阻碍特定云服务商模型的正常使用。
    *   **详情**: 使用 OVHcloud AI 端点时，请求反复失败，提示 "Chat stream ended without finish_reason"，模型在列表中可见但无法生成。

5.  **#64489 [Bug] 模型目录缓存不刷新**
    *   **重要性**: 用户体验问题，导致新发布的模型在一段时间内无法被选择。
    *   **详情**: 模型目录缓存了过时的注册表，可能导致本地服务重启前无法看到新发布的模型。

6.  **#64494 [Bug] 升级后旧会话不可见 & 项目重复创建**
    *   **重要性**: 数据迁移严重 Bug，可能导致用户数据丢失或混乱。
    *   **详情**: 从 v1 升级到 v2 后，旧会话在列表中消失，且导入项目导致 ID 重复，无法正确解析文件夹与项目的对应关系。

7.  **#64539 / #64537 / #64551 [Bug/Feature] 测试与占位 Issue**
    *   **重要性**: 反映社区活跃度与测试流程。
    *   **详情**: 多个由测试账号创建的 Issue，包含 "bug test" 或占位符，属于社区日常维护的一部分。

8.  **#54044 [Bug] Browser 工具暴露问题**
    *   **重要性**: 安全与权限控制问题。
    *   **详情**: 即使在 Agent 级别设置了 "deny browser"，只要启用了 `execute` (Code Mode) 权限，浏览器工具依然会被暴露和调用。

9.  **#64162 [Feature] Plan mode 允许执行 Worktree 操作**
    *   **重要性**: 功能逻辑冲突，违背了 Plan Mode 的设计初衷。
    *   **详情**: 文档声明 Plan Mode 为只读，但 `worktree_create` 等工具在 Plan 模式下仍能成功执行，修改了文件系统状态。

10. **#64563 [Bug] 免费额度提示异常**
    *   **重要性**: 用户首次使用时的挫败感。
    *   **详情**: 用户报告未开始使用即提示今日免费额度用完，涉及计费或缓存逻辑的潜在问题。

---

### 4. 重要 PR 进展

1.  **#64545 [Fix] Timeline 代码块长行换行处理**
    *   **内容**: 修复时间轴代码块中长行被截断且滚动条隐藏的问题。新增了全局设置 `Wrap code blocks` 和单块覆盖选项。
    *   **状态**: Closed

2.  **#64544 [Fix] GPT-6.2 系统提示缓存修复**
    *   **内容**: 将系统提示作为开发消息发送，解决 GPT-6.2 不缓存顶层 `instructions` 导致的重复计费问题。
    *   **状态**: Closed

3.  **#64568 [Fix] 删除 Worktree 时清理终端与管道**
    *   **内容**: 修复在 Windows 上，如果在 Worktree 中打开了终端，删除 Worktree 会因 PTY 和位置服务未释放而失败的问题。
    *   **状态**: Open

4.  **#64567 [Release] v2.3.2 版本发布**
    *   **内容**: 将 v2.3.2 的版本号和变更日志同步回 dev 分支。
    *   **状态**: Open

5.  **#64565 [Fix] New Timeline 崩溃修复**
    *   **内容**: 修复当某行在刷新过程中离开视图时，New Timeline 渲染器崩溃的问题（`effect/match/Match/exhaustive: absurd` 错误）。
    *   **状态**: Open

6.  **#61728 [Feat] 可配置的压缩窗口**
    *   **内容**: 允许在压缩配置中设置 `window`（Token 数），以便自动压缩规划更小的目标窗口。
    *   **状态**: Open

7.  **#64518 [Feat] Code Mode 支持 Bun 文件 API**
    *   **内容**: 在 `full_codemode` 标志后添加 `Bun.file`, `Bun.write` 和 `Bun.Glob`，增强 Code Mode 的文件操作能力。
    *   **状态**: Closed

8.  **#64546 [Feat] 持久化视频任务**
    *   **内容**: 修复视频任务在服务器重启时丢失的问题，确保任务持久化。
    *   **状态**: Open

9.  **#64554 [Fix] 压缩模型不可达时的回退机制**
    *   **内容**: 修复 `agents.compaction.model` 解析后未检查提供商可用性的问题，增加回退逻辑。
    *   **状态**: Open

10. **#64555 [Feat] 读取 Console artifacts**
    *   **内容**: Console artifact provider 现在可以通过新的 API 端点读取构建产物。
    *   **状态**: Open

---

### 5. 功能需求趋势

*   **国际化与多语言支持**: Issue #64543 是当前最活跃的 Bug，反映出社区对多语言环境（特别是中英混用）下的 UI 稳定性有强烈需求。
*   **模型适配与兼容性**: 高频反馈集中在特定模型（如 Qwen3.8, Jev）和云服务商（如 OVHcloud）的集成问题上，说明 OpenCode 正在快速扩展支持的模型生态。
*   **数据迁移与持久化**: v2.0 升级后的数据丢失、项目 ID 冲突问题成为焦点，用户对数据安全性有极高要求。
*   **Code Mode 工具链增强**: 社区对 Bun API 的支持、工作树操作以及更精细的工具权限控制表现出浓厚兴趣。

---

### 6. 开发者关注点

*   **渲染性能与体验**: 代码块滚动条隐藏、文本宽度计算不一致、时间轴渲染崩溃等问题表明，随着功能增加，前端渲染层需要更多优化。
*   **架构稳定性**: 诸如会话列表不可见、后台服务重启导致数据重复注入等 Bug，暴露了 v2.0 重构过程中在数据一致性和状态管理上的挑战。
*   **桌面端集成**: SSH 远程服务启动失败、升级流程卡顿等问题，是桌面应用在复杂网络和本地服务管理方面的典型痛点。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-11-18)

**数据来源**: [earendil-works/pi](https://github.com/earendil-works/pi)  
**统计周期**: 过去 24 小时 (2026-11-17 ~ 2026-11-18)

---

## 1. 今日速览
*   **Windows 支持成为焦点**：Windows 下的 `sink-thread` 使用问题引发广泛关注（97+评论），社区呼吁统一 Windows 运行方式和文档。
*   **稳定性与崩溃修复**：`codemode` 脚本并发读取文件时若发生 AbortError 导致进程崩溃（P0 级 Bug）被紧急修复，同时解决了会话恢复时工具丢失等严重问题。
*   **功能增强**：新增对 Sarvam AI Token Factory 的支持，并修复了 OpenAI 认证时的上下文窗口显示错误。

---

## 2. 版本发布
*   **无新版本发布**

---

## 3. 社区热点 Issues

| # | 标题 | 重要性 | 摘要 & 社区反应 |
| :--- | :--- | :--- | :--- |
| **#7547** | [Windows] sink-thread 使用方式与已知问题 | 🔥 **High** | Windows 用户讨论使用方式的最佳实践。作者指出目前运行方式太多，导致文档维护和核心开发资源难以集中。评论数高达 **97**，表明这是 Windows 用户最头疼的问题。 |
| **#11021** | OpenAI 登录后 GPT-6.1 Sol 上下文窗口显示错误 | ⚠️ **High** | 登录 ChatGPT 后，Pi 报告的上下文窗口（272K）小于服务器实际清单（500K）。这直接影响 AI 的压缩预算和可用性。作者给予了 **8 个赞**，关注度极高。 |
| **#11956** | [P0] 文件打开时取消读取导致崩溃 | 🚨 **Critical** | 在 `codemode` 中，如果一个文件读取失败导致脚本中止，会抛出未捕获的 `AbortError` 导致 Pi 进程崩溃。这是影响开发体验的严重 Bug。 |
| **#12271** | 1.5.2: codemode 并发读取 AbortError 导致崩溃 | 🚨 **Critical** | **今日新增**。与 #11956 类似，但在特定并发场景下（`Promise.all`），读取流中断时未处理的 AbortError 导致进程直接退出。 |
| **#11460** | 会话恢复时丢失内置工具 (ENOSPC) | 🚨 **Critical** | 当会话分支被截断（磁盘空间不足）时，恢复会话会丢失所有内置工具。这导致 AI 失去核心能力。 |
| **#7885** | npm 搜索不索引新发布的 pi 包 | 📦 **Medium** | 新发布的包在 npm 搜索中不可见，导致无法在 `pi.dev` 画廊中找到。作者指出自 8 月以来没有新的包名被索引。 |
| **#12266** | 空闲 Pi 实例追加数据导致会话分叉 | 🔧 **Medium** | 多实例同时操作同一会话文件时，由于 `leafId` 冲突，导致新数据被追加到旧分支而非当前分支，造成会话树混乱。 |
| **#12096** | /login llama.cpp 连接存储不持久 | 🔧 **Medium** | 使用 `--no-models-autoload` 启动时，`/login` 存储的连接信息无法跨会话保持。 |
| **#12070** | Google Vertex AI 连接超时处理缺陷 | 🔧 **Medium** | 在评估中发现 Google Vertex AI 流连接中断时，Pi 会无限挂起或静默失败，未能触发可重试机制。 |
| **#12260** | 默认压缩模型设置 | 🚀 **Feature** | 请求增加一个配置项 `compaction.model`，允许用户固定使用特定模型进行压缩，避免手动切换。 |

---

## 4. 重要 PR 进展

| # | 标题 | 状态 | 摘要 |
| :--- | :--- | :--- | :--- |
| **#12262** | 修复边界草稿压缩事件发射 | ✅ Closed | 修复了通过扩展提交的边界草稿压缩（`turn_end`）只触发 `entry_appended` 而未触发 `session_compact` 的问题。 |
| **#12256** | 修复作用域技能冲突诊断 | ✅ Closed | 优化了技能优先级冲突的警告逻辑，对有意为之的覆盖不再报错，仅对真正歧义的情况发出警告。 |
| **#12249** | 记录流式消息的首字时间延迟 | ✅ Closed | 在 `AssistantMessage` 中新增 `ttftMs` (Time to First Token) 和 `ttfaMs` (Time to First Content) 指标，便于监控性能。 |
| **#12246** | 修复 /login 搜索高亮逻辑 | 🔧 Open | 修复了在 `/login` 或 `/logout` 页面滚动后搜索，高亮索引仍停留在旧位置，导致按回车选错 Provider 的问题。 |
| **#12028** | 延迟发送消息直到压缩结束 | 🔧 Open | 修复了手动压缩进行时触发 `sendMessage` 导致使用了未压缩分支的问题。 |

---

## 5. 功能需求趋势

*   **跨平台体验优化**：Windows 环境下的运行方式、Sink 线程管理以及文件系统操作（并发读/写）是社区最集中的反馈点，反映出 Windows 支持尚不成熟。
*   **高级模型支持**：社区对新型号的支持需求强烈，如 **Sarvam AI Token Factory** (新增集成)、**Gemini 4 Hydrogen** 的 `xhigh` 思考层级、以及 **OpenAI GPT-6.1 Sol** 的上下文窗口适配。
*   **性能与压缩机制**：关于上下文压缩的讨论热度持续，涉及压缩模型选择、压缩过程中的静默终止、以及压缩事件对扩展的影响。

---

## 6. 开发者关注点

1.  **并发安全性**：多个 Pi 进程或子代理并发访问同一会话文件或运行 `npm install` 时出现的竞态条件（Race Condition）和锁缺失问题。
2.  **错误处理与健壮性**：`AbortError` 和 `AbortSignal` 在文件流和工具调用中的未捕获异常处理，以及网络连接中断时的优雅降级。
3.  **配置与持久化**：自定义 `agentDir` 下的凭证路径显示错误，以及模型切换（如改变思考层级）时 Prompt 缓存丢失的问题。
4.  **生态集成**：希望增加对更多 AI 提供商（如 Sarvam、Token Factory）的原生支持，以及解决 npm 包搜索索引同步问题。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-11-18  
**数据来源：** github.com/QwenLM/qwen-code

---

## 1. 今日速览

*   **发布预览版 v0.28.1-preview.0**：修复了全栈 E2E 测试中的调度器循环观察问题，并针对 `verify-pr` 逻辑进行了加固。
*   **关键 CI 失败修复**：核心仓库 CI 失败问题持续引发关注，特别是 `Managed Agent` 相关的测试门禁失败，涉及 Token 消耗和内存管理机制。
*   **SDK Java 大量 Bug 修复**：针对 Java SDK 的内存泄漏、编码问题、JSON-RPC 协议错误及并发写入问题进行了集中修复。

---

## 2. 版本发布

### v0.28.1-preview.0 (Release v0.28.1-preview.0)
*   **主要更新**：
    *   **测试改进**：`test(managed-agent)` - 观察到全栈 E2E 测试中真实的 scheduled /loop 触发。
    *   **稳定性加固**：`fix(verify-pr)` - 增强了 PR 验证监听器的健壮性。
*   **相关链接**：[v0.28.1-preview.0 Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.1-preview.0)

### v0.28.0 (Release v0.28.0)
*   **主要更新**：
    *   **Web Shell**：新增侧边栏工作区过滤器 ([#17244](https://github.com/QwenLM/qwen-code/pull/17244))。
    *   **Managed Agent**：新增钉钉适配器支持。
    *   **SDK**：发布 TypeScript SDK v0.1.35 (捆绑 CLI v0.28.0)。
    *   **Desktop**：发布 Qwen Code Desktop v0.28.0。

---

## 3. 社区热点 Issues

### 🔴 高优先级 / 关键 Bug
1.  **#14724: Main CI failed - Managed Agent gate (431 评论)**
    *   **重要性**：这是目前最热的问题，涉及 CI 门禁持续失败，没有识别到测试用例。这直接影响代码合并流程和自动化测试的有效性。
    *   **状态**：Open，持续更新中。

2.  **#13851: 非交互模式下 Terminal Result 延迟输出**
    *   **重要性**：核心性能问题。在 headless/SDK 模式下，由于托管自动记忆任务（extract + dream）需要较长时间（40s-5分钟），导致用户无法立即获得终端结果，影响开发效率。
    *   **状态**：Open。

3.  **#14104: SDK Java HostedShellLifecycleRecoveryIT 失败**
    *   **重要性**：Java SDK 的生命周期恢复测试失败，涉及资源恢复机制。

### 🛠️ SDK 与集成问题
4.  **#17640 - #17627: Java SDK 连串 Bug (各 3 评论)**
    *   **重要性**：集中暴露了 Java SDK 的严重缺陷，包括进程泄漏、UTF-8 编码损坏、JSON-RPC 请求无作用域等。这些问题可能导致生产环境中的会话失败或数据损坏。
    *   **状态**：Open。

5.  **#10932: 语音识别无法使用 Token Plan ASR**
    *   **重要性**：功能阻断。语音转文字无法调用新的 `qwen-audio-3.0-asr-flash` 模型，因为代码中硬编码了旧的模型 ID。

### 🚀 功能需求
6.  **#15082: Managed Agent 定义容量和空闲回收模型**
    *   **重要性**：架构规划。社区希望引入 Admission Control，限制服务器持有的 Runtime 数量和内存，防止资源耗尽。
    *   **状态**：Ready for discussion。

7.  **#17237: Web Shell Worktree Codex 对齐**
    *   **重要性**：功能增强。旨在完善 Web Shell 中的工作树功能，包括保留快照和可配置根目录。

8.  **#17284: Agent Loop 后续跟进**
    *   **重要性**：架构演进。跟踪 #17045 迁移至共享 Agent Loop 后遗留的设计决策。

9.  **#11945: MCP Apps Amplitude 图表 UI 限制**
    *   **重要性**：用户体验。MCP 应用加载 UI 资源时受 1MB HTML 限制和 10s 超时限制，导致图表无法显示。

10. **#17674: 配置文件 Auto-Update 设置被忽略**
    *   **重要性**：配置错误。用户手动设置 `disableAutoUpdate` 时，如果缺少 `$version` 字段，设置会被覆盖。

---

## 4. 重要 PR 进展

1.  **#17665: feat(managed-agent): add PR-watch bound-session private injection**
    *   **内容**：增强 PR 监听功能，将 PR 的 GitHub 状态变化（如 CI 失败、合并冲突）主动注入到绑定的托管会话中。
2.  **#17533: feat(web-shell): worktree carry metadata + snapshot-then-delete cleanup**
    *   **内容**：实现 Web Shell 工作树的元数据携带和快照清理机制（P6 阶段），解决工作树状态保留问题。
3.  **#17662: feat(serve): unify SSE admission and occupancy across every stream surface**
    *   **内容**：统一 SSE 流的准入控制和占用监控，防止流资源耗尽。
4.  **#17663: feat(web-shell): show the SSE admission cap beside stream occupancy**
    *   **内容**：在 Web Shell 状态对话框中显示 SSE 流的准入上限，提升可视性。
5.  **#17477: fix(core): deliver background async hook output to the model**
    *   **内容**：修复后台异步钩子输出无法传递给模型的问题，确保上下文完整性。
6.  **#17519: fix(channels): address Aone channel deferred review findings**
    *   **内容**：针对 Aone 代码频道插件的审查建议进行修复，包括连接诊断和老化诊断改进。
7.  **#17550: fix(verify-pr): register the watch round ahead of prepare**
    *   **内容**：优化 PR 验证流程的初始化顺序，增强 liveness 检测。
8.  **#17553: test(integration): give the editor-parity waits the shared-pool stall tier**
    *   **内容**：增加集成测试的超时容忍度（从 12s 提升至 30s），解决共享运行时池导致的测试不稳定问题。
9.  **#17437: feat(i18n): add Arabic support for CLI and Web Shell**
    *   **内容**：为 CLI 和 Web Shell 添加完整的阿拉伯语支持，包括 RTL（从右到左）布局。
10. **#17120: fix(cli): dispatch MCP commands with preceding global options**
    *   **内容**：修复 MCP 命令无法正确接收前置全局选项的问题，提升 CLI 参数解析的健壮性。

---

## 5. 功能需求趋势

基于 Issue 和 PR 的分析，社区当前的关注点集中在以下方向：

*   **托管代理架构优化**：
    *   引入 **Admission Control**（准入控制）和 **Capacity Model**（容量模型）来管理 Managed Agent 的资源使用。
    *   完善 **Agent Loop**（代理循环）的架构迁移，确保事件总线和共享循环的稳定性。
*   **多模态与外部集成**：
    *   **钉钉适配器** 的持续跟进与覆盖度提升。
    *   **MCP (Model Context Protocol)** 应用的 UI 限制与资源加载优化。
*   **Web Shell 与工作流增强**：
    *   提升 Web Shell 的 **工作树** 功能，使其具备类似 Codex 的状态管理能力（快照、元数据携带）。
    *   改善 Web Shell 的 **SSE 流** 管理和可视化（显示 admission cap）。
*   **多语言支持**：
    *   **阿拉伯语** 的正式支持，标志着项目国际化程度的提升。

---

## 6. 开发者关注点

1.  **CI 稳定性**：`Managed Agent` 相关的 CI 失败是最大的痛点，直接影响开发者的提交和合并体验。
2.  **Headless 模式性能**：非交互模式下（SDK/Headless）的延迟问题严重影响开发者使用体验，急需优化内存任务的处理机制。
3.  **SDK 生态健壮性**：Java SDK 的多个底层 Bug 反映出 SDK 层面的健壮性仍需打磨，尤其是进程管理和编码处理。
4.  **配置管理**：Settings 文件的解析逻辑存在边缘情况（如缺少 version 字段导致配置被重写），需要更严格的校验。
5.  **并发与资源竞争**：多线程环境下的 JSONL 边界损坏、锁竞争（append locks）等问题表明在处理高并发流式输出时需要更精细的同步机制。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑11‑18**  

---

## 1. 今日速览
- TUI 在新回合启动时出现长时间卡死的 **freeze** bug（#7357）再次被社区聚焦；对应的修复 PR（#7360）已在审阅中。  
- 多条针对 **终端快照、焦点恢复、模型列表** 的 bug 修复 PR 同步推进，显示项目进入快速迭代的阶段。  
- 依赖升级（actions/setup‑java）和 CI 分片演练的 Draft PR 继续保持项目的 CI/CD 稳健性。

---

## 2. 版本发布
> **暂无** 新的 Release 发布。

---

## 3. 社区热点 Issues（全部 3 条）

| 编号 | 标题 / 关键标签 | 重要性说明 | 社区反馈 | 链接 |
|------|----------------|-----------|----------|------|
| **#7357** | `bug: the TUI freezes for the whole next turn when a save‑snapshot is requested as a new turn starts`  *(area:tui, area:install, area:core, area:state)* | 影响所有使用 **保存快照** 功能的用户，导致终端卡死数分钟，严重破坏交互体验。 | 创建者提供复现日志（209 秒卡死），已收到 3 条评论，暂无点赞。 | https://github.com/codewhale-hq/Codewhale/issues/7357 |
| **#7282** | `0.10.3: terminals and background jobs belong to their conversation` *(area:runtime-api, tracking, v0.10.3, area:core, area:state, status:awaiting-release)* | 关系到 **会话生命周期** 与 **后台任务** 的正确回收，直接影响资源管理和安全性。 | 最近一次更新 2026‑11‑17，只有 1 条评论，仍在等待正式发布。 | https://github.com/codewhale-hq/Codewhale/issues/7282 |
| **#7365** | `opencode-zen: free model rows are listed in the picker, but the provider rejects every non‑OpenCode client (429 FreeUsageLimitError)` *(area:tui, os:linux, area:core, area:state)* | 新增 **opencode‑zen** 免费模型展示，但调用被限流导致所有非官方客户端均无法使用，阻断了模型接入的首要体验。 | 刚创建（2026‑11‑18），暂无评论。 | https://github.com/codewhale-hq/Codewhale/issues/7365 |

> **备注**：由于本周期仅有 3 条活跃 Issue，全部列出以供关注。

---

## 4. 重要 PR 进展（共 8 条）

| 编号 | 标题 | 关键改动 | 当前状态 | 链接 |
|------|------|----------|----------|------|
| **#7358** | `ci(cw-8178): sharded PR CI proof run (draft)` | 演示分片 CI 的 `pull_request` 触发机制；后续改动会走主线合并。 | **已关闭（Draft）** | https://github.com/codewhale-hq/Codewhale/pull/7358 |
| **#7360** | `fix(tui): bound terminal snapshot wait` | 将终端快照等待绑定至 Engine 的 2 秒快照等待，避免在新回合启动时 UI 冻结。 | **打开，待审阅** | https://github.com/codewhale-hq/Codewhale/pull/7360 |
| **#7364** | `fix(models): keep MCP tools with null‑default optionals on the Moonshot route` | 修复 Moonshot（Kimi）模型在参数为 `None` 时工具被错误剔除的问题。 | **打开** | https://github.com/codewhale-hq/Codewhale/pull/7364 |
| **#7363** | `fix(tui): recapture focus without erasing the viewport` | 将焦点恢复与视口清除分离，避免在不支持 DEC 2026 的终端出现短暂空白。 | **打开** | https://github.com/codewhale-hq/Codewhale/pull/7363 |
| **#7362** | `fix(engine): avoid rereading history for named‑turn undo` | 复用已加载的历史记录，减少长会话撤销时的二次磁盘读取，提高性能。 | **打开** | https://github.com/codewhale-hq/Codewhale/pull/7362 |
| **#7361** | `fix(tui): bound completed‑turn session snapshot waits` *(已关闭，重复 #7360)* | 同步快照等待逻辑的旧实现，已被 #7360 覆盖。 | **已关闭** | https://github.com/codewhale-hq/Codewhale/pull/7361 |
| **#7359** | `fix(subagent): inherit the session's reviewed memory in child prompts` | 子代理现在会继承父会话的已审阅记忆与 “Memory Hygiene” 提示，提升子任务上下文一致性。 | **已关闭** | https://github.com/codewhale-hq/Codewhale/pull/7359 |
| **#7335** | `chore(deps): bump actions/setup-java from 6.1.0 to 6.2.0` | 更新 GitHub Actions 中的 Java 环境依赖，包含安全修复与性能改进。 | **打开** | https://github.com/codewhale-hq/Codewhale/pull/7335 |

> 这些 PR 大多聚焦 **TUI 稳定性、模型兼容、历史撤销性能**，显示社区当前的主要技术痛点已进入修复阶段。

---

## 5. 功能需求趋势

从当前 Issue（3 条）与 PR（8 条）可以提炼出以下几大趋势：

1. **交互流畅性 & 稳定性**  
   - TUI 冻结、焦点恢复、视口擦除等问题频繁出现，表明用户对实时响应的需求极高。  

2. **会话与资源生命周期管理**  
   - 终端与后台作业随会话结束而自动清理（#7282）是资源安全与用户预期的重要方向。  

3. **模型接入与供应商兼容**  
   - 免费模型列表误展示导致 429 错误（#7365）以及 Moonshot 模型工具参数兼容（#7364）体现了 **多供应商模型生态** 的适配需求。  

4. **快照与历史回滚**  
   - 保存快照时的卡死（#7357）以及撤销历史的性能优化（#7362）显示用户希望能够 **可靠且高效地回溯会话**。  

5. **CI/CD 稳健性**  
   - 分片 CI 演练（#7358）和依赖升级（#7335）说明社区在 **持续集成、自动化测试** 上仍在积极投入。

---

## 6. 开发者关注点（痛点 & 高频需求）

| 痛点 | 具体表现 | 影响范围 |
|------|----------|----------|
| **TUI 卡死** | 新回合启动时快照请求导致整轮卡死（209 s） | 所有使用交互式终端的用户 |
| **快照等待逻辑不统一** | 需要在 Engine 与 TUI 之间统一超时策略 | 影响会话流畅度与调试体验 |
| **模型列表/调用不一致** | 免费模型展示但实际不可用，导致 429 错误 | 新模型接入者、opencode‑zen 用户 |
| **后台作业残留** | 删除会话后后台 shell 仍在运行 | 资源泄漏、隐私安全 |
| **撤销性能** | 长会话撤销时重复读取历史，导致卡顿 | 大规模对话、科研实验 |
| **焦点恢复闪烁** | 部分终端出现短暂空白 | 终端 UI 视觉体验 |
| **CI 分片调试** | 需要专门的 Draft PR 验证分片 CI | 开发者 CI 维护成本 |

**建议**：优先合并 #7360（快照等待绑定）和 #7363（焦点恢复优化），随后跟进 #7357 的根因定位。同步推动 #7282 的实现，以确保会话结束时资源能够彻底回收。

--- 

**祝您开发顺利，期待下一轮社区更新！**

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*