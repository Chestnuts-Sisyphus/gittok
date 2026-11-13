# AI CLI 工具社区动态日报 2026-11-13

> 生成时间: 2026-11-13 00:48 UTC | 覆盖工具: 9 个

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

# Claude Code Skills 社区热点报告  
（数据截至 2026‑11‑13）  

---

## 1️⃣ 热门 Skills 排行（按讨论热度/评论数挑选）

| # | Skill 名称 / PR | 功能概述 | 讨论焦点 | 当前状态 |
|---|----------------|----------|----------|----------|
| **#1742** | **mcp‑builder: 支持 `mcp>=2` 的 `streamable_http_client` 与自定义 Header** | 让 Skills 在新版 MCP（≥ 2.0.0）下能够正确引用 `streamable_http_client`，并通过 `create_mcp_http_client` 配置自定义 HTTP Header。 | 兼容性迁移、跨平台 Header 注入、对已有 MCP‑based Skills 的影响。 | **Open** |
| **#1298** | **skill‑creator：隔离 Trigger 评估 & 兼容 Windows** | 修复 Trigger 评估在并发 worker、Windows 子进程管道以及运行时错误时产生的误报/漏报。 | 稳定性、跨‑OS 兼容、评估准确率提升。 | **Open** |
| **#1245** | **notion‑spec‑to‑implementation** | 将 Notion 中的产品/技术规格自动拆解为可执行的任务、验收标准及进度追踪，供 Claude Code 直接实现。 | 文档‑到‑代码流水线、任务拆解质量、与 Notion API 的权限管理。 | **Open** |
| **#1980** | **webapp‑testing：避免 `shell=True`** | 将 `with_server.py` 中的 `subprocess.Popen(..., shell=True)` 改为安全调用，消除 CWE‑78 命令注入风险。 | 安全审计、测试环境隔离、潜在漏洞修复。 | **Open** |
| **#1792** | **docx：LibreOffice 超时错误处理** | 在 `accept_changes.py` 中检测 `soffice` 超时并返回错误，同时在成功后校验输出 DOCX 是否已真正去除修订标记。 | 文档清理可靠性、错误可追溯性、CI 可靠性。 | **Open** |
| **#1771** | **proofcore‑contract‑auditor** | 为 Web3 开发者提供 Solidity / Rust 合约的静态安全审计，并把加密审计证明锚定到 TON 公链。 | 智能合约安全、链上审计证明、零存储 Merkle 方案。 | **Open** |
| **#1703** | **md2video‑audio** | 将 Markdown 直接编译为带有人声解说的 MP4 视频（基于 Marp + TTS），实现“文档‑即‑视频”。 | 多媒体输出、语音合成质量、渲染速度。 | **Open** |
| **#525** | **pyxel** | 为 Python Retro‑Game 开发提供完整 Skill：代码编写、无头运行、帧检查、状态验证。 | 游戏开发教学、实时画面捕获、跨平台运行。 | **Open** |

> **备注**：这些 PR 在列表中均未标记为已合并（`merged`），但因为评论/关注度最高，已被社区列为重点跟进对象。

---

## 2️⃣ 社区需求趋势（从 Issues 抽取）

| 需求方向 | 关键 Issue（标题/编号） | 需求核心 |
|----------|-----------------------|----------|
| **安全与信任** | #492 **“Community skills distributed under anthropic/ namespace enable trust boundary abuse”** | 防止社区 Skill 冒充官方 Skill，需引入命名空间校验或官方签名机制。 |
| **组织内部协作** | #228 **“Enable org‑wide skill sharing in Claude.ai”** | 支持组织级 Skill 库、共享链接或自动同步，降低手动分发成本。 |
| **评估/Trigger 稳定性** | #556 **“run_eval.py: claude -p never triggers skills/commands”**<br>#1352 **“run_eval.py parallel workers cross‑match skill UUIDs, producing false‑negative trigger rates”** | 修复评估脚本的触发率统计错误，提升 CI / 自动评估可靠性。 |
| **新型记忆/状态压缩** | #1329 **“compact‑memory (symbolic notation for compact agent state)”** | 引入符号化、压缩记忆结构，帮助长运行 Agent 节约上下文。 |
| **治理与质量把关** | #1385 **“Reasoning Quality Gate Pipeline”** | 在任务执行前后加入校准、对抗审查、交付验证三道质量关卡。 |
| **技能元数据一致性** | #1997 **“parse YAML frontmatter scalars correctly”** | 确保 SKILL.md 中的 YAML 与运行时解析保持一致，避免元数据丢失。 |
| **文档/插件冲突** | #189 **“document‑skills and example‑skills plugins install identical content”** | 去重、统一插件发布规范，避免同一 Skill 重复占用上下文。 |
| **资源占用异常** | #1487 **“claude‑api skill eagerly injects ~156k tokens”** | 限制单次 Tool 调用的 token 注入量，防止上下文溢出。 |

**趋势概括**：社区最迫切希望 **提升安全可信、增强组织协作、保证评估可靠性**，并在此基础上探索 **更高效的记忆压缩** 与 **质量把关流水线**。

---

## 3️⃣ 高潜力待合并 Skills（评论活跃、影响面大）

| PR 编号 | Skill | 主要价值 | 预计落地时间线（社区估计） |
|--------|-------|----------|----------------------------|
| **#1742** | mcp‑builder 兼容升级 | 解决新版 MCP 破坏现有 Skills，影响全链路 CI。 | 1‑2 周（已在内部测试） |
| **#1298** | skill‑creator 触发评估隔离 | 大幅提升 Windows 与多 worker 环境的触发准确率。 | 2‑3 周 |
| **#1245** | notion‑spec‑to‑implementation | 把产品规格自动转化为可执行任务，打开 “规格‑即‑代码” 市场。 | 3‑4 周（等待 Notion API 授权审查） |
| **#1771** | proofcore‑contract‑auditor | 为 Web3 安全审计提供链上可验证证据，填补 Claude 在区块链领域的空白。 | 4‑5 周（需审计库审查） |
| **#1703** | md2video‑audio | 文档即视频的“一键生成”方案，受内容创作团队欢迎。 | 2‑3 周（依赖外部 TTS 授权） |
| **#525** | pyxel | 为教育/创客社区提供 Retro‑Game 开发完整工具链。 | 1‑2 周（已通过内部演示） |
| **#1980** | webapp‑testing 安全强化 | 消除潜在命令注入漏洞，提升企业级测试安全性。 | 已进入安全审计阶段，预计 1 周合并 |
| **#1792** | docx 超时错误处理 | 改善文档审校自动化的可靠性，受企业文档团队好评。 | 1‑2 周 |

> 这些 PR 均已获得 **10 + 条评论** 或社区多次提及，且功能对多个业务场景（CI、文档、Web3、教育）都有直接价值，预计在下个版本发布周期（2026‑12）前完成合并。

---

## 4️⃣ Skills 生态洞察（一句话总结）

> **社区当前最集中诉求是：构建安全可信、易于组织共享且在评估与运行时表现稳健的 Skills，同时探索压缩记忆与多媒体输出等新型工作流。**

---  

**温馨提示**：若您希望关注上述 PR 的最新进度，建议在对应 Pull Request 页面点击 **“Subscribe”**，或在 Issues 中使用 **“/track”** 机器人指令获取实时通知。  

---  

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**OpenAI Codex 社区动态日报**
**日期：** 2026-11-13
**来源：** github.com/openai/codex

---

### 1. 今日速览
今日社区焦点集中在 **IDE 扩展的会话上下文隔离**（Scope to workspace）、**Windows 环境下的 Computer Use 性能与 UI 滞后** 问题，以及 **Rust 工具链升级** 等维护性工作上。尽管存在多处关于 Windows 桌面端崩溃、浏览器访问及沙箱权限的严重 Bug，但官方在 PR 层面积极修复了大量后端稳定性问题，并新增了 SPIFFE 身份认证支持。

### 2. 版本发布
- **Rust 工具链升级**
  - **版本：** v0.170.0-alpha.4
  - **更新内容：** 发布了最新的 Alpha 版本。同时，PR #61205 显示内部已将 Rust 工具链从 1.95.0 升级至 1.99.1，并更新了 CI/CD 工作流以适配新的 Clippy 代码检查规则。

### 3. 社区热点 Issues

**#25319 [OPEN] Scope Codex VS Code chats to the current workspace/project**
- **重要性：** **⭐⭐⭐⭐⭐ (最高)**
- **摘要：** 这是过去 24 小时内评论数最多的 Enhancement（增强需求）。用户强烈希望在 VS Code 扩展中，将 Codex 聊天上下文严格限定在当前工作区，避免历史会话干扰当前开发。
- **社区反应：** 获得了 134 个点赞，说明这是广大开发者普遍遇到的实际痛点。

**#56941 [OPEN] Windows Computer Use 导致系统级 UI 卡顿**
- **重要性：** **⭐⭐⭐⭐**
- **摘要：** 在使用 Computer Use 功能后，Windows 整个图形界面出现严重滞后，只有杀掉 `codex-computer-use.exe` 进程才能恢复。涉及版本 26.1021.3705.0。

**#57101 [OPEN] Computer Use 截图后黄色边框未关闭**
- **重要性：** **⭐⭐⭐**
- **摘要：** 在 Computer Use 生成截图的回合结束后，屏幕捕获访问和黄色的显示边框仍然保持打开状态，阻碍后续操作。

**#59546 [OPEN] 桌面自动化限制阻塞外部系统监控任务**
- **重要性：** **⭐⭐⭐**
- **摘要：** 内置自动化限制与 Scheduled tasks 文档冲突，导致无法监控外部 Web 系统任务，涉及 macOS 26.6 环境。

**#59931 [OPEN] Windows 桌面 SSH 主机重启后无法自动连接**
- **重要性：** **⭐⭐**
- **摘要：** Windows 桌面端无法在重启后自动连接已启用的 SSH 主机，影响远程开发体验。

**#25015 [OPEN] Codex app-server 泄露 MCP 子代理进程栈**
- **重要性：** **⭐⭐**
- **摘要：** Linux 环境下，app-server 启动子代理后未正确清理 MCP 进程树，导致进程数和内存持续线性增长。

**#41077 [OPEN] readme_toc.py 解析 Tilde 和长 Markdown 代码块错误**
- **重要性：** **⭐**
- **摘要：** 文档工具存在解析 Bug，导致目录生成错误。

**#56620 [OPEN] Windows 桌面更新后组织设置加载失败**
- **重要性：** **⭐**
- **摘要：** 升级后组织设置无法加载，重装无效，严重阻碍用户使用。

**#53560 [OPEN] macOS 桌面工作审批请求立即失败**
- **重要性：** **⭐**
- **摘要：** macOS 桌面端的 Work 审批功能点击“允许”后立即报错，而浏览器端正常。

**#60530 [OPEN] GPT-6.1 Sol 用量限制消耗过快**
- **重要性：** **⭐**
- **摘要：** 用户反馈 GPT-6.1 Sol 模型的 Token 消耗速度远超预期，导致配额迅速耗尽。

### 4. 重要 PR 进展

**#61213, #61212, #61211 (CLOSED)** - **状态行配置持久化**
- **内容：** 实现了 TUI（终端界面）状态行提供者的本地配置持久化，支持默认值和 MCP 服务器选择。解决了部分用户手动配置丢失的问题。

**#61207 (CLOSED)** - **SPIFFE JWT-SVID 身份认证支持**
- **内容：** 为 Unix 工作负载添加了 SPIFFE Workload API 支持，允许通过 SPIFFE 证书获取 OpenAI 身份令牌。这对于企业级安全部署和 Kubernetes 环境集成具有重要意义。

**#61206 (CLOSED)** - **Linux x32 系统调用限制**
- **内容：** 强化了 Linux 下的 seccomp 安全限制，专门针对 x32 ABI 进行了 syscall 拒绝处理，提升了在 32 位模拟环境下的安全性。

**#61205 (CLOSED)** - **Rust 1.99.1 升级**
- **内容：** 全面升级 Rust 工具链及配套依赖，修复了 Clippy 警告，并更新了原子操作相关代码（如 `try_update`）。

**#61198 (CLOSED)** - **Agent-Tree 暂停与恢复**
- **内容：** 增加了优雅的代理树暂停和恢复机制，确保在挂起期间未完成的回合和子结果不会丢失，提高了长时间运行任务的健壮性。

**#61195 (CLOSED)** - **权限配置跨目录更新**
- **内容：** 在工作目录更新时保留权限配置文件，不再重建，优化了权限管理的性能和一致性。

**#61186 (CLOSED)** - **计划项 ID 唯一性**
- **内容：** 为计划项生成 UUIDv7，解决了多轮重试中计划项 ID 冲突的问题。

**#61183 (CLOSED)** - **TUI 会话重建修复**
- **内容：** 修复了从主会话重建线程会话时，错误携带了其他线程的 fork 父元数据的问题。

**#61182 (CLOSED)** - **云端线程重命名支持**
- **内容：** 支持通过 API 重命名云端线程，无需打开附件。

**#61187 (CLOSED)** - **Bazel CI 认证缓存**
- **内容：** 为 Bazel CI 和发布构建添加了认证的 GCS 缓存，提高了构建效率。

### 5. 功能需求趋势
- **IDE 集成与上下文管理：** 社区对 VS Code 扩展的会话范围控制（Scope to Workspace）需求极高，反映出开发者希望 AI 辅助编程更加聚焦于当前任务。
- **Windows 环境体验：** 大量关于 Windows 的 Bug（Computer Use 卡顿、SSH 连接、浏览器访问）表明桌面端在 Windows 平台上的稳定性仍需加强。
- **安全与认证：** SPIFFE 身份认证的 PR 反映了企业用户对安全性和标准化的需求。
- **远程与跨平台：** SSH 远程连接、Linux 桌面端（Arch Linux）的兼容性问题持续受到关注。

### 6. 开发者关注点
- **性能瓶颈：** Computer Use 导致的系统级 UI 滞后是当前最严重的性能痛点，可能影响用户体验甚至系统使用。
- **配额管理：** GPT-6.1 Sol 模型的配额消耗过快，迫使开发者调整使用策略。
- **进程泄漏：** Linux 下 MCP 进程树的泄漏问题可能导致服务器资源耗尽。
- **配置持久化：** TUI 和状态行配置的缺失让用户每次启动都需要重新设置，降低了工具的易用性。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：** 2026-11-13  
**数据范围：** 过去 24 小时（2026-11-12）

---

## 1. 今日速览
GitHub Copilot CLI 于昨日发布了 **v1.0.110** 版本，重点优化了无障碍支持（屏幕阅读器）和 MCP 认证流程。社区活跃度极高，今日新增 42 个 Issues，主要集中在 **IDE 集成（ACP 模式）**、**MCP 工具缓存内存泄漏** 以及 **会话管理** 等功能性问题上，显示出用户对高阶交互体验的持续探索。

---

## 2. 版本发布
### v1.0.110 (2026-11-12)
本次更新聚焦于用户体验和无障碍支持：
*   **无障碍增强：** 增强了屏幕阅读器对会话列表的支持，能够识别当前会话并播报会话状态（空闲或待处理）。
*   **MCP 认证优化：** 修复了 Microsoft Entra 登录时的冗余错误弹窗；新增 `/experimental` 选项支持从代理命令中通过掩码对话框输入密码。
*   **UI 细节：** 修复了 `/usage` 模型行在终端宽度内的换行显示问题。

---

## 3. 社区热点 Issues (Top 10)
以下 Issues 反映了社区当前最紧迫的痛点和高频需求：

**#5236 - Windows: Entra broker token cache stays 0 bytes after MCP sign-in**
*   **状态：** OPEN (评论 7)
*   **摘要：** Windows 用户在通过 MCP 服务器登录 Entra 后，令牌缓存文件保持为空，导致每次新进程启动都重新弹出账号选择器。
*   **重要性：** 高频阻碍性 Bug，严重影响 Windows 用户的 MCP 体验。

**#5447 - ACP mode never attaches to the IDE**
*   **状态：** OPEN
*   **摘要：** `copilot --acp` 模式无法连接到 IDE，即使从编辑器终端启动且锁文件存在。
*   **重要性：** ACP (Advanced Copilot Protocol) 是面向高级开发者的核心功能，IDE 集成失效是重大功能缺陷。

**#5446 - MCP tool cache grows with temporary workspaces**
*   **状态：** OPEN
*   **摘要：** 每次使用临时工作空间时，MCP 工具快照缓存都会增长，最终导致启动时内存溢出。
*   **重要性：** 性能优化问题，CI/CD 和自动化场景下尤为明显。

**#5443 - Reuse or release inactive worktrees to reduce disk usage**
*   **状态：** OPEN
*   **摘要：** 建议复用或释放不再活跃的 Git Worktree，以减少磁盘占用和缓存累积。
*   **重要性：** 资源管理需求，对于频繁运行会话的开发者至关重要。

**#5436 - CLI masks structured OpenAI-compatible 403 error message**
*   **状态：** OPEN
*   **摘要：** 当自定义 OpenAI 兼容提供商返回 403 错误时，CLI 误将其归类为通用认证失败，掩盖了具体的错误信息。
*   **重要性：** 调试困难，阻碍了开发者排查自定义 Provider 的配置问题。

**#5434 - macOS: copilot-mcp-oauth keychain prompt returns after "Always Allow"**
*   **状态：** OPEN
*   **摘要：** macOS 下 MCP OAuth 认证在点击“始终允许”后仍会重复弹出钥匙串提示。
*   **重要性：** 交互体验问题，频繁的弹窗打断工作流。

**#5444 - Coordinated child session replies no longer reach coordinator chat**
*   **状态：** OPEN
*   **摘要：** 最新的应用更新后，协调会话中的子会话回复无法返回到主聊天窗口。
*   **重要性：** 多会话协作功能回归问题，影响团队协作场景。

**#5442 - copilot vim mode `:q` and `:model` in normal mode**
*   **状态：** OPEN
*   **摘要：** 请求在 Vim 模式的 Normal 模式下支持 `:q` 和 `:model` 等工具调用。
*   **重要性：** Vim 用户的功能增强需求。

**#5440 - Agent Plugins 1.0 `.instructions.md` files are silently ignored**
*   **状态：** OPEN
*   **摘要：** Agent Plugins 1.0 格式下的规则文件和 `applyTo` 前置声明被忽略。
*   **重要性：** 插件生态建设受阻，影响自定义 Agent 的开发。

**#5437 - Delegated `task` children cannot authenticate HTTP-OAuth MCP servers**
*   **状态：** OPEN
*   **摘要：** 使用原生 task 工具启动的子代理无法可靠使用 HTTP-OAuth MCP 服务器。
*   **重要性：** 子代理架构的认证机制存在缺陷。

---

## 4. 重要 PR 进展
*数据源显示过去 24 小时内无 Pull Requests 更新。*

---

## 5. 功能需求趋势
从今日更新的 Issues 中，社区关注点主要集中在以下三个方向：

1.  **IDE 与 ACP 协议深度集成：** 大量反馈集中在 ACP 模式无法正确发现 IDE 环境以及会话间通信（协调会话）的可靠性上。
2.  **资源管理与性能：** MCP 工具缓存导致的内存溢出问题，以及 Git Worktree 的磁盘占用问题，显示出用户对长期会话或 CI 环境下稳定性的担忧。
3.  **认证与多环境支持：** Windows Entra 缓存、macOS 钥匙串重复提示以及 OAuth 认证在子代理中的失效，是认证层面的高频痛点。

---

## 6. 开发者关注点
*   **认证体验：** Windows 和 macOS 下的重复弹窗及缓存失效是干扰最大的问题。
*   **交互模式：** Vim 模式的工具调用支持、屏幕阅读器无障碍支持等 UI/UX 细节被明确提及。
*   **调试能力：** 对 403 错误信息的掩盖使得开发者难以排查自定义 Provider 的配置错误。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期**: 2026-11-13  
**关注仓库**: [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 1. 今日速览
尽管过去24小时内没有发布新版本，但社区在代码贡献方面依然活跃。最引人注目的是 PR #1777 的合并，该 PR 引入了一个“三级规则系统”，旨在通过更精细的配置机制提升 CLI 工具的灵活性。目前社区反馈较少，整体处于技术迭代的平稳期。

---

## 2. 版本发布
**无新版本发布**

---

## 3. 社区热点 Issues
**暂无活跃 Issue 更新**。

---

## 4. 重要 PR 进展

| 序号 | PR 标题 | 状态 | 描述 | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **feat: three-tier rules system** | **已合并** | 提出了一个分层规则系统，旨在解决当前规则配置过于单一的问题，提供更细粒度的控制能力。 | [MoonshotAI/kimi-cli PR #1777](https://github.com/MoonshotAI/kimi-cli/pull/1777) |

---

## 5. 功能需求趋势
基于当前 PR 数据，社区正从单一的配置优化向**架构级增强**演进。本次合并的“三级规则系统”表明开发者不仅关注 CLI 的易用性，更开始探索如何通过分层架构来支持更复杂的场景配置。

---

## 6. 开发者关注点
*   **配置架构优化**: 开发者正在尝试通过引入“三级”架构来重构现有的规则逻辑，以支持更灵活的配置管理。
*   **代码质量与规范**: PR 提交信息中强调了遵循贡献规范，包括与维护者讨论后再提交 Pull Request，这反映出社区对代码质量和协作流程的重视。

---
*注：由于过去24小时内没有活跃的 Issues 更新，功能需求趋势部分基于 PR 内容进行推测。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-11-13
**来源：** github.com/anomalyco/opencode

---

## 1. 今日速览

今日 OpenCode 社区活跃度较高，主要集中在 **V2 版本的稳定性改进**与 **新工具功能的探索**。核心团队修复了 `tool` 调用相关的多处 Bug，解决了 Git Polling 导致的高 CPU 占用问题，并新增了 "Advisor" 工具以支持多模型协作。此外，社区对 Go 服务的自动配额平衡以及 Linux 平台的 Wayland 图形交互问题表现出了浓厚兴趣。

---

## 2. 版本发布

*   **无新版本发布**：过去24小时内未发布新的 Release。

---

## 3. 社区热点 Issues (Top 10)

**#2242 - Is there a way to sandbox the agent?**
*   **热度：** 115 评论 / 84 👍
*   **重要性：** ⭐⭐⭐⭐⭐
*   **摘要：** 用户强烈关注 **Agent 安全沙箱** 问题，询问如何限制 Agent 访问终端命令或编辑文件，特别是在 macOS 上寻求类似 `seatbelt` 的机制。
*   **反应：** 高热度讨论，涉及权限控制和系统隔离机制。

**#785 - Is there a way to disable streaming mode?**
*   **热度：** 37 评论 / 40 👍
*   **重要性：** ⭐⭐⭐⭐
*   **摘要：** 部分用户反馈代理提供商不支持流式传输，导致连接失败。
*   **反应：** 用户迫切需要非流式模式的选项以兼容不同的后端服务。

**#63506 - desktop: prompt footer keeps stale model after a command sets its own model**
*   **热度：** 6 评论
*   **重要性：** ⭐⭐⭐⭐
*   **摘要：** V2 版本中，当 Slash Command 指定了模型，Session 模型会切换，但 **TUI 界面底部的提示栏仍显示旧模型**，造成显示与实际运行不一致。
*   **反应：** 影响用户体验，UI 状态同步问题。

**#63212 - GitLab Duo workflow models can't call tools in v2**
*   **热度：** 3 评论
*   **重要性：** ⭐⭐⭐⭐
*   **摘要：** 在 V2 版本中，GitLab Duo 模型无法调用工具，且没有报错。
*   **反应：** 暴露了 V2 版本在特定 Provider 集成上的缺失。

**#61504 - Timeouts for permission requests**
*   **热度：** 6 评论
*   **重要性：** ⭐⭐⭐
*   **摘要：** 针对 `ask` 权限规则的请求往往会导致会话永久阻塞，因为没有人为在场确认。
*   **反应：** 建议增加超时机制以防止会话死锁。

**#63483 - web: untracked folder expansion uses main checkout instead of active worktree**
*   **热度：** 5 评论
*   **重要性：** ⭐⭐⭐
*   **摘要：** Web 界面在处理 Linked Git Worktree 时，未跟踪文件夹的展开逻辑有误，导致无法预览新文件。
*   **反应：** Web 端功能缺陷反馈。

**#59806 - mcp: opencode_console 403 - console refused access to the workspace**
*   **热度：** 4 评论
*   **重要性：** ⭐⭐⭐
*   **摘要：** MCP 服务器出现 403 错误，导致控制台反复断开重连，且没有明确的错误提示。
*   **反应：** 插件生态集成稳定性问题。

**#62948 - server: git polling loop saturates CPU on large worktrees**
*   **热度：** 4 评论
*   **重要性：** ⭐⭐⭐
*   **摘要：** 在拥有 130 万文件的大型工作区中，Git Polling 机制导致 CPU 占用极高。
*   **反应：** 性能优化需求，特别是针对大仓库场景。

**#63252 - BUG: context hook messages drop metadata**
*   **热度：** 3 评论
*   **重要性：** ⭐⭐⭐
*   **摘要：** V2 版本重构后，Context Hook 接收的消息对象丢失了 `metadata` 字段，导致插件无法附加特定上下文。
*   **反应：** API 变更导致的兼容性问题。

**#63567 - tui: image paste from clipboard does nothing on Wayland (GNOME)**
*   **热度：** 2 评论
*   **重要性：** ⭐⭐
*   **摘要：** 在 GNOME Wayland 环境下，TUI 无法通过 Ctrl+V 粘贴截图。
*   **反应：** 平台特定兼容性问题。

---

## 4. 重要 PR 进展 (Top 10)

**#63637 - feat: add an advisor tool the session model can consult**
*   **作者：** gsottnick
*   **内容：** 新增 **Advisor 工具**，允许主模型在调用工具前咨询第二个模型（如 Claude），类似于 Claude Code 的功能。
*   **关联：** 关联 Issue #63631。

**#63354 - feat(core): auto-balance opencode go accounts by usage**
*   **作者：** xirothedev
*   **内容：** 新增实验性配置，Go 服务将根据使用量自动选择账户，而非手动切换，并缓存使用数据。
*   **影响：** 优化 Go 服务的计费和资源管理。

**#63641 - fix(ai): a structured answer replays instead of "Tool result missing"**
*   **作者：** kitlangton
*   **内容：** 修复 AI 返回结构化数据时的逻辑错误，现在结构化回答会正确地回放到请求中，而不是显示为 "Tool result missing"。

**#63640 - fix(ai): report a repeated stop instead of a new step**
*   **作者：** kitlangton
*   **内容：** 修复 Provider 发送重复 Stop 信号时的错误报告机制，使其显示为重复结束而非未开始的步骤。

**#63590 - fix(core): pass stored message metadata to session request hooks**
*   **作者：** rekram1-node
*   **内容：** 修复 PR #63252 中的问题，确保 Session 请求 Hook 能接收到存储的消息元数据。
*   **关联：** 修复 Issue #63252。

**#63612 - feat(tui): unload a local model on /clear and /exit**
*   **作者：** OmarAlaaeldein
*   **内容：** 在 TUI 中执行 `/clear` 和 `/exit` 命令时，主动卸载本地加载的模型以释放资源。

**#63634 - refactor(ai): remove Gemini Veo and Runway video protocols**
*   **作者：** rekram1-node
*   **内容：** 移除不再支持的 `google-video` 和 `runway-video` 协议。
*   **原因：** Google 已关闭相关服务。

**#63227 - feat(core): bound subagent concurrency**
*   **作者：** darkmatter2222
*   **内容：** 为 Session 中的子代理（Subagent）设置并发上限，防止资源耗尽。
*   **关联：** 关联 Issue #63303。

**#63627 - docs(console): Go Teams 2-member minimum, and Go workspaces can invite teammates**
*   **作者：** adamdotdevin
*   **内容：** 更新 Go 服务的文档，明确 Go Teams 的 2 人最小配置以及工作区邀请机制。

**#63542 - fix(ssh): recover when the remote service port is taken**
*   **作者：** ai-nikolai
*   **内容：** 修复 SSH 连接断开后重连失败的问题，即使 SSH 本身连接正常。

---

## 5. 功能需求趋势

1.  **Agent 安全与沙箱**：这是目前社区最高频的讨论点，用户极度关注 Agent 如何隔离环境、限制文件访问权限。
2.  **V2 版本集成与稳定性**：大量 Issue 集中在 V2 的 UI 状态同步、API 兼容性（如 GitLab Duo）以及特定平台（Linux/Wayland）的 bug 修复。
3.  **多模态支持**：视频协议的移除和音频附件支持（PR #54496）表明社区正在持续跟进多模态能力的演进。
4.  **服务治理与计费**：Go 服务的自动配额平衡功能（PR #63354）反映了团队对大规模部署下成本控制和资源分配的关注。

---

## 6. 开发者关注点

*   **权限阻塞问题**：用户反馈权限请求往往无人响应导致会话挂起，建议增加超时机制是当前最迫切的体验优化需求。
*   **大仓库性能**：拥有百万级文件的项目中，Git Polling 导致的 CPU 饱和问题严重影响了开发效率。
*   **桌面端体验**：TUI 的模型切换状态显示不一致、Wayland 下无法粘贴截图等问题，影响了桌面客户端的易用性。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

**Pi 社区动态日报**
**日期：** 2026-11-13
**来源：** github.com/badlogic/pi-mono

---

### 1. 今日速览
过去24小时内，Pi 社区活跃度较高，共更新了 50 个 Issue 和 27 个 PR。核心进展集中在 **TUI（终端用户界面）渲染与交互** 的稳定性修复（如 Overlay 覆盖层、终端图像处理）以及 **AI 提供商适配** 的优化（如 Neon AI Gateway 新增、Google Gemini 自定义 Fetch 支持、GitHub Copilot 思考模式支持）。此外，针对 Linux 环境的文件搜索路径（`find` 工具）和会话管理（`/resume` 选择逻辑）也进行了重要修复。

---

### 2. 版本发布
**无新版本发布。**

---

### 3. 社区热点 Issues

1.  **#2870 [CLOSED] Linux 环境配置文件路径标准化**
    *   **摘要：** 修复应用在 Linux 上过度污染主目录的问题，强制遵循 XDG Base Directory 标准（使用 `$XDG_CONFIG_HOME` 而非默认的 `$HOME`）。
    *   **重要性：** 提升了在 Linux 发行版（如 Arch Linux）下的系统整洁度和开发体验，是环境配置的最佳实践。

2.  **#10628 [OPEN] tmux 全屏模式下 OSC 52 复制功能被吞没**
    *   **摘要：** 当 pi 运行在 tmux 中时，全屏 TUI 的复制功能（OSC 52）会被 tmux 消耗而无法传递给客户端。
    *   **重要性：** 影响使用 SSH + tmux 的开发者体验，是终端集成场景下的高频痛点。

3.  **#12019 [OPEN] GitHub Copilot 模型不支持 `reasoning_effort` 参数**
    *   **摘要：** Copilot 使用的 Gemini 模型（如 gemini-4-argon）从未收到 `reasoning_effort` 参数，导致 `--thinking` 标志无效。
    *   **重要性：** 影响复杂推理任务的体验，属于 P0 级别优先级问题。

4.  **#11026 [OPEN] pi-durable 存储中永久删除会话的需求**
    *   **摘要：** 请求增加 API 以在存储中永久删除会话，并处理运行中会话的拒绝逻辑。
    *   **重要性：** 涉及数据持久化管理的核心功能，对长期使用的用户和开发者工具集成至关重要。

5.  **#10618 [OPEN] GNU screen 下 TUI 颜色丢失**
    *   **摘要：** 由于 `COLORTERM` 继承覆盖了 screen 的颜色限制，导致 TUI 渲染全黑。
    *   **重要性：** 严重破坏多显示器和远程开发环境下的视觉体验。

6.  **#12118 [CLOSED] v1.5.2 会话中流读取被中止时导致进程崩溃**
    *   **摘要：** 修复了在会话结束或流被中止时，未捕获的 `AbortError` 导致整个 pi 进程意外终止的问题。
    *   **重要性：** 系统稳定性修复，防止意外崩溃导致工作丢失。

7.  **#12066 [CLOSED] find 工具路径匹配溢出问题**
    *   **摘要：** 修复了 `find` 工具使用 `--full-path` 时，匹配路径不仅限于当前搜索目录，还可能匹配上级目录文件的问题。
    *   **重要性：** 安全性相关的文件系统访问修复，防止意外泄露文件。

8.  **#10585 [OPEN] bash 临时文件流错误导致 ENOSPC/权限错误崩溃**
    *   **摘要：** 当 `/tmp` 分区满或权限不足时，未正确处理的错误会导致 pi 进程崩溃。
    *   **重要性：** 边缘情况下的健壮性修复，防止因环境资源问题导致程序僵死。

9.  **#7740 [OPEN] /reload 后工具注册失效问题**
    *   **摘要：** 在 `/reload` 命令后，注册在 `session_start` 事件上的工具无法正确渲染。
    *   **重要性：** 影响扩展系统的热重载体验和 MCP（Model Context Protocol）工具的可用性。

10. **#12098 [OPEN] Anthropic 线程重发时思考块丢失**
    *   **摘要：** 在某些参数类型转换场景下，Anthropic 的 thinking blocks 会被 `prefix_binding_mismatch` 错误丢弃。
    *   **重要性：** 影响流式对话的连贯性和上下文完整性。

---

### 4. 重要 PR 进展

1.  **#12116 [CLOSED] 修复 find 工具路径匹配范围**
    *   **内容：** 修改正则和 glob 逻辑，确保 `find` 仅匹配当前搜索路径下的文件，防止匹配上级目录。
    *   **状态：** 已合并。

2.  **#12109 [CLOSED] 修复 TUI Overlay 遮挡终端图像**
    *   **内容：** 修改 `compositeTuiLine` 逻辑，确保当 Overlay 遮挡终端图像时，图像行不被透传，保持视觉层级正确。
    *   **状态：** 已合并。

3.  **#12110 [OPEN] 支持发送 reasoning_effort 到 GitHub Copilot**
    *   **内容：** 移除 Copilot 目录中硬编码的 `supportsReasoningEffort: false`，从 `models.dev` 动态获取，支持 gemini-4-carbon 等模型。
    *   **状态：** 开发中。

4.  **#12108 & #12103 [CLOSED] 支持自定义 Fetch 到 Google GenAI SDK**
    *   **内容：** 允许 Google Generative AI 和 Vertex 适配器接收自定义 `fetch` 函数，以支持 HTTP 代理和请求拦截。
    *   **状态：** 已合并。

5.  **#12111 [CLOSED] 修复 /resume 选择逻辑**
    *   **内容：** 在会话列表渐进式重载时，保持当前选中的会话索引不变，防止删除或重命名后选中了错误的会话。
    *   **状态：** 已合并。

6.  **#12112 [CLOSED] 迁移千问 Token Plan 到新网关**
    *   **内容：** 更新 Qwen Token Plan 的默认网关地址，统一国际版和国内版（千问 AI 平台）的配置。
    *   **状态：** 已合并。

7.  **#12107 [CLOSED] 修复扩展 session_shutdown 导致挂起**
    *   **内容：** 绑定 `session_shutdown` 事件分发，防止 Quit 时进程未完全退出。
    *   **状态：** 已合并。

8.  **#12094 [CLOSED] 新增 Neon AI Gateway 提供商**
    *   **内容：** 添加对 Neon AI Gateway 的内置支持，通过环境变量配置 Token 和 Base URL。
    *   **状态：** 已合并。

9.  **#12089 [CLOSED] 修复 exec 命令信号终止被误判为成功**
    *   **内容：** 修正对进程信号终止（如 SIGSEGV）的退出码映射，正确报告失败状态。
    *   **状态：** 已合并。

10. **#11966 [CLOSED] 修复 TUI 运行时的终端竞态条件**
    *   **内容：** 修复在 TUI 绘制时其他进程写入 stdout/stderr 导致的屏幕绘制错误和残留字符。
    *   **状态：** 已合并。

---

### 5. 功能需求趋势

*   **终端交互与可视化优化：** 社区高度关注 TUI 在复杂环境（tmux, screen, Kitty/iTerm2 图像）下的渲染稳定性，特别是 Overlay 层级和颜色支持。
*   **AI 模型推理深度支持：** 对“思考”和“推理”功能的关注度上升，包括 `reasoning_effort` 参数传递、长上下文保留以及与 Anthropic Threads 的兼容性。
*   **本地化与多环境适配：** Linux 环境下的 XDG 标准化以及不同终端模拟器的兼容性成为高频需求。
*   **代理与网络层灵活性：** 开发者强烈需要更灵活的 HTTP 请求控制（自定义 Fetch、代理支持），以适应企业内网和特定网络策略。

---

### 6. 开发者关注点

*   **进程健壮性：** 如何优雅地处理 AbortSignal、资源耗尽（ENOSPC）以及流读取的中断，避免进程崩溃是核心痛点。
*   **会话与状态管理：** `/resume` 列表选择、会话删除后的索引映射、以及会话持久化存储的清理机制需要更加透明和可控。
*   **工具安全性：** `find` 和 `grep` 等文件系统工具必须严格限制搜索范围，防止意外的目录遍历或敏感文件泄露。
*   **扩展系统稳定性：** 工具注册时机（如 `session_start`）和生命周期管理在热重载场景下的表现直接影响插件的可用性。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑11‑13**  
（来源：<https://github.com/Hmbown/DeepSeek-TUI>）

---

## 1️⃣ 今日速览  
- 本日社区活跃度高，**26 条 PR** 与 **17 条 Issue** 均在过去 24 小时内有更新，重点围绕 **沙箱安全、国际化、中文本地化以及 ACP（Agent Client Protocol）集成**。  
- 多项关键缺陷（如 MCP/LSP 客户端误把服务器请求当回复、非 ASCII 路径显示错误）已在 PR 中得到修复，提升了 TUI 稳定性与可用性。  

---

## 2️⃣ 版本发布  
> 本日无新 Release。

---

## 3️⃣ 社区热点 Issues（挑选 10 条）

| 编号 | 标题（简述） | 关键价值 | 社区反馈 | 链接 |
|------|-------------|----------|----------|------|
| #7279 | **运行已安装的外部 Agent（Claude Code、Codex、Kimi 等）作为 Codewhale 会话** | 为 ACP 第一次完整落地提供实验路径，直接把外部 CLI 纳入 Codewhale 工作流。 | 4 条评论，讨论实现细节与安全沙箱限制。 | <https://github.com/codewhale-hq/Codewhale/issues/7279> |
| #7174 | **Prompt fixtures 在装有可选工具的机器上全部失效** | 影响 CI/测试的可重复性，涉及跨平台兼容性。 | 2 条评论，已有人提供临时 fix。 | <https://github.com/codewhale-hq/Codewhale/issues/7174> |
| #7305 | **Deny 规则未覆盖 `-p / zsh` 等重绑定、别名经 `eval` 逃逸** | 沙箱安全核心，防止用户绕过策略执行危险命令。 | 开始聚焦安全审计，后续 PR 正在跟进。 | <https://github.com/codewhale-hq/Codewhale/issues/7305> |
| #7302 | **网络 deny 条目使用国际化域名时失效** | 国际化 DNS（IDN）是全球用户必备，错误导致策略失效。 | 讨论集中在 punycode 处理方式。 | <https://github.com/codewhale-hq/Codewhale/issues/7302> |
| #7328 | **Provider 失效时诊断日志缺失，错误卡片丢失代码** | 对运维调试至关重要，提升错误可追溯性。 | 已有 0 条评论，但被标记为 “high priority”。 | <https://github.com/codewhale-hq/Codewhale/issues/7328> |
| #7324 | **Git status 隐藏工作区外的 rename 源** | 影响文件追踪与冲突检测，尤其在大仓库中。 | 0 条评论，但关联多个 UI 报告。 | <https://github.com/codewhale-hq/Codewhale/issues/7324> |
| #7304 | **中文 UI（zh‑Hans）标签错位、英文残留** | 本地化体验直接影响中文用户的使用感受。 | 0 条评论，已被列入本轮 UI 改进计划。 | <https://github.com/codewhale-hq/Codewhale/issues/7304> |
| #7301 | **Secret redaction 在 CJK 文本旁的密钥未被遮蔽** | 直接关系到凭证泄露风险，安全性关键。 | 0 条评论，已触发安全审查。 | <https://github.com/codewhale-hq/Codewhale/issues/7301> |
| #7309 | **Git status 对非 ASCII 原路径的 rename 触发 panic** | 稳定性缺陷，导致 UI 崩溃。 | 0 条评论，已被列入紧急修复。 | <https://github.com/codewhale-hq/Codewhale/issues/7309> |
| #7300 | **ANSI 转义剥离错误导致残留 ESC 字节** | 影响终端渲染，可能出现乱码或显示错位。 | 0 条评论，已在 PR 中修复。 | <https://github.com/codewhale-hq/Codewhale/issues/7300> |

> **挑选依据**：涉及安全沙箱、国际化、本地化以及关键的稳定性/可用性缺陷，且多数为 **Open** 状态或刚刚关闭但影响范围大。

---

## 4️⃣ 重要 PR 进展（挑选 10 条）

| 编号 | 类型 & 目标 | 关键改动 | 当前状态 | 链接 |
|------|------------|----------|----------|------|
| #7294 | **enhancement – workflow：在隔离的 host oracle 上验证 sealed candidate** | 引入可选的“验证评估器”，提升工作流安全与可复现性。 | Open | <https://github.com/codewhale-hq/Codewhale/pull/7294> |
| #7321 | **bug – sandbox deny 规则强化** | 拦截 `rebinding`, `screen`, `at` 等 launcher，防止规则逃逸。 | Open | <https://github.com/codewhale-hq/Codewhale/pull/7321> |
| #7318 | **bug – sanitize：掩码 CJK 文本旁的 provider keys** | 修正 `redact_secrets` 对全角标点的识别，避免凭证泄漏。 | Open | <https://github.com/codewhale-hq/Codewhale/pull/7318> |
| #7320 | **bug – net：匹配国际化域名的 deny 条目** | 将 `normalize_host` 统一为 punycode，确保策略生效。 | Open | <https://github.com/codewhale-hq/Codewhale/pull/7320> |
| #7325 | **bug – app‑server：展示工作区外 rename 的来源** | 在 Git 状态面板中补全 `deleted` 行的原路径，提升可视化。 | Open | <https://github.com/codewhale-hq/Codewhale/pull/7325> |
| #7317 | **bug – tui：非 ASCII 路径在 /diff、@git、@diff 中正确显示** | 采用 octal‑escape 解析后恢复原始 Unicode，避免乱码。 | Closed | <https://github.com/codewhale-hq/Codewhale/pull/7317> |
| #7322 | **bug – tui：会话标题计数改为字符而非字节** | 修正中文标题长度判断，避免误报 “标题过长”。 | Closed | <https://github.com/codewhale-hq/Codewhale/pull/7322> |
| #7319 | **bug – MCP/LSP：服务器请求被误当作回复** | 两个 commit 修正 JSON‑RPC 消息分流逻辑，恢复双向交互。 | Closed | <https://github.com/codewhale-hq/Codewhale/pull/7319> |
| #7316 | **bug – state/snapshot：防止 torn line 丢失索引 & 调整 prune 天数** | 追加写入保护、改进 `prune` 上限，确保历史完整。 | Closed | <https://github.com/codewhale-hq/Codewhale/pull/7316> |
| #7315 | **bug – config：读取所有 env 别名链** | 让空值环境变量不再遮蔽旧别名，提升配置兼容性。 | Closed | <https://github.com/codewhale-hq/Codewhale/pull/7315> |

> **挑选原则**：覆盖安全沙箱、国际化、UI/UX 本地化、核心协议（MCP/LSP）以及状态持久化等核心模块，且多数 PR 已合并或处于活跃审阅阶段。

---

## 5️⃣ 功能需求趋势  

| 需求方向 | 典型 Issue / PR 体现 | 说明 |
|----------|----------------------|------|
| **安全沙箱 & 策略强化** | #7305、#7321、#7328 | 多数讨论集中在 deny 规则、Provider 错误诊断与日志可观测性。 |
| **国际化与本地化** | #7302、#7304、#7314、#7318 | 对 IDN、中文全角标点、CJK 文本下的密钥遮蔽需求明显。 |
| **ACP / 外部 Agent 集成** | #7279、#7294、#7326 | 期待更完整的外部模型（Claude、Copilot、Qwen 等）在 TUI 中即插即用。 |
| **Git 工作流兼容** | #7300、#7309、#7310/#7323 | 处理非 ASCII 路径、ANSI 逃逸以及工作树侧 rename 的正确展示。 |
| **会话/状态持久化** | #7298、#7303、#7316 | 防止因异常退出导致的快照丢失或索引损坏。 |
| **性能/资源限制** | #7174（prompt fixtures） | 测试套件在多工具环境下的可靠性，暗示对资源使用的关注。 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **安全策略易被绕过** – 多条 Issue 报告 deny 规则在别名、重绑定、国际化域名等场景失效，迫切需要统一的 “策略验证” 流程。  
2. **中文本地化细节缺失** – UI 中全角/半角标点混用、标签错位、字符计数错误直接影响中文用户体验。  
3. **外部模型/Agent 的统一接入** – 开发者希望通过 ACP 直接在 TUI 中启动并交互 Claude、Copilot、Qwen 等模型，降低部署复杂度。  
4. **Git 兼容性** – 非 ASCII 文件名、工作树侧 rename、ANSI 转义等导致 UI 崩溃或信息缺失，是日常使用的高频阻塞。  
5. **状态可靠性** – Session 快照与索引在异常关闭时容易出现 “torn line” 或 “snapshot prune” 失效，需要更健壮的持久化机制。  

> **建议**：在下一个迭代里，优先合并安全沙箱（deny 规则、Provider 诊断）与国际化（IDN、CJK 红色遮蔽）相关的 PR；同步推进外部 Agent 注册表的完善（Copilot、Qwen、UberLLM），并在文档中提供 ACP 接入示例，以提升社区的使用黏性和贡献动力。

--- 

> **备注**：所有链接均指向对应的 GitHub Issue 或 Pull Request，供进一步追踪。祝大家编码愉快！

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*