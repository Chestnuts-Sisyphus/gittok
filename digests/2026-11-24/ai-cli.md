# AI CLI 工具社区动态日报 2026-11-24

> 生成时间: 2026-11-24 04:30 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告 (截至 2026‑11‑24)**  

---

## 1. 热门 Skills 排行（按讨论热度/评论数挑选的 7 项）

| 排名 | Skill（PR） | 功能概述 | 社区讨论焦点 | 当前状态 |
|------|--------------|----------|--------------|----------|
| 1 | **#1742 – `mcp-builder` – 支持 `mcp≥2` 的 `streamable_http_client` 并可自定义 HTTP 头** | 让 Claude 在使用新版 MCP（Anthropic Model Control Protocol）时能够正确导入新版 `streamable_http_client`，并通过 `create_mcp_http_client` 注入自定义请求头。 | 关注兼容性回归、企业内部 API 代理的安全与可审计性。 | **Open** |
| 2 | **#1245 – `notion-spec-to-implementation`** | 把 Notion 中的产品/技术规格自动拆解为可执行的实现任务（任务列表、接受标准、进度追踪），供 Claude Code 直接驱动实现。 | 期待在需求转实现的链路中减少人工拆解，提升跨团队协作效率。 | **Open** |
| 3 | **#1703 – `md2video‑audio`** | 将 Markdown 文档直接编译为带真人语音的 MP4 视频（Marp 幻灯 + TTS），实现“一键生成教学/演示视频”。 | 讨论生成质量、语音合成版权、渲染速度。 | **Open** |
| 4 | **#1771 – `proofcore‑contract‑auditor`** | 静态分析 Solidity / Rust 合约并把零知识审计证明写入 TON 区块链，提供可验证的合约安全报告。 | 关注链上审计的可信度、费用与执行时长。 | **Open** |
| 5 | **#525 – `pyxel`** | 为 Retro‑Game 开发提供完整的 Pyxel 工作流：创建项目、驱动键盘/鼠标、帧检查、自动化回归测试。 | 讨论游戏画面抓取、跨平台（Web / Desktop）执行方式。 | **Open** |
| 6 | **#514 – `document‑typography`** | 自动检测并纠正文档排版常见问题（孤行、孤段、编号错位等），提升 AI 生成文档的专业度。 | 关注对长文档的性能影响以及对不同语言（中、英）支持情况。 | **Open** |
| 7 | **#1615 – `scnet‑hpc`** | 为 SCNet 高性能计算集群提供统一的 SSH + Slurm 操作界面（集群发现、作业提交、模块加载、资源调度）。 | 期待在科研/企业内部流水线中直接调用，不再手写 Bash 脚本。 | **Open** |

> **注**：所有列出的 PR 目前仍为 **Open**（未合并），但因评论/关注度最高，已被视作社区热点。

---

## 2. 社区需求趋势（从 Issues 中提炼）

| 需求方向 | 代表 Issue | 关键诉求 |
|----------|------------|----------|
| **安全与信任边界** | #492 – “Community skills distributed under `anthropic/` namespace enable trust boundary abuse” | 防止恶意或误导性 skill 冒充官方，需实现命名空间隔离、签名或官方审核流程。 |
| **组织内部 Skill 共享** | #228 – “Enable org‑wide skill sharing in Claude.ai” | 通过组织库或共享链接实现 Skill 的集中分发、版本控制和权限管理，降低手动上传成本。 |
| **评估与触发可靠性** | #556 – “run_eval.py: claude -p never triggers skills/commands”  &  #1352 – “run_eval.py parallel workers cross‑match skill UUIDs, producing false‑negative trigger rates” | 改进 `run_eval.py` 的触发检测、并行执行与 UUID 对齐，确保评估结果可信。 |
| **持久化记忆 / 记忆压缩** | #1329 – “compact‑memory (symbolic notation for compact agent state)” | 为长期运行的 Agent 引入结构化、符号化的记忆表示，减少上下文占用。 |
| **Skill 稳定性与错误可观测** | #62 – “All my skills have disappeared and now I get errors” | 提供 Skill 生命周期可视化、错误日志与迁移工具，避免因路径/版本变动导致的失效。 |
| **文档/示例冲突去重** | #189 – “document‑skills and example‑skills plugins install identical content” | 统一插件内容、去除重复 Skill，避免上下文窗口被冗余 Skill 占满。 |
| **资源消耗控制** | #1487 – “`claude‑api` skill eagerly injects ~156k tokens, exhausting the context window” | 优化大型 Skill（如 `claude‑api`）的 token 注入策略，防止一次调用耗尽上下文。 |

**总体趋势**：**安全‑信任、组织协作、评估可靠性以及大模型上下文消耗** 是当前社区最迫切的痛点。

---

## 3. 高潜力待合并 Skills（评论活跃、技术价值突出）

| PR | 关键亮点 | 可能落地时间点（基于最近更新） |
|----|----------|------------------------------|
| #1742 – `mcp-builder` fix | 解决新版 MCP API 兼容性，直接影响企业内部模型部署与安全网关。 | 已在 2026‑10‑08 更新，预计 1‑2 周内合并。 |
| #1245 – `notion‑spec‑to‑implementation` | 需求转实现的端到端自动化，已收到 10+ 条正向反馈。 | 最近更新 2026‑10‑15，合并窗口可能在 11‑12 月。 |
| #1703 – `md2video‑audio` | 零成本生成教学视频，吸引教育类用户。 | 2026‑09‑15 更新，社区已有 5 条实现测试反馈。 |
| #1771 – `proofcore‑contract‑auditor` | 区块链审计零知识证明，首次在官方 Skill 集合中加入安全审计。 | 2026‑09‑16 更新，合并可能受审计合规审查影响，预计 12 月前完成。 |
| #525 – `pyxel` | 复古游戏开发专用 Skill，已在社区 demo 中展示完整运行。 | 2026‑11‑01 更新，技术成熟度高，预计下周合并。 |
| #514 – `document‑typography` | 文档排版质量控制，适配所有文档生成 Skill。 | 2026‑03‑13 更新，已通过内部审查，等待最终签署。 |
| #1615 – `scnet‑hpc` | HPC 集群自动化，已有 2 家科研机构表达试用意向。 | 2026‑08‑24 更新，合并节奏较慢，预计 Q1 2027 前完成。 |

> **提示**：这些 PR 均标记为 **Open**，但因社区评论量、业务价值及最近一次提交时间较近，属于近期最有可能合并的候选。

---

## 4. Skills 生态洞察

> **一句话总结**：社区正聚焦 **“安全可信、组织协作与高效评估”**，希望通过官方审查、共享机制以及更稳健的触发/评估工具，让 Skills 成为可在企业级工作流中直接落地的可靠插件。  

---  

*所有链接均指向对应的 GitHub PR/Issue（示例：`https://github.com/anthropics/skills/pull/1742`）。*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：** 2026-11-24  
**分析师：** AI 开发工具技术分析师

---

## 1. 今日速览
过去24小时内，Codex 仓库发布了 **3 个 Alpha 版本**（v0.174.0-alpha.1, v0.172.0-alpha.2.1, v0.171.0-alpha.13.2），主要聚焦于 **插件签名验证、权限管理优化和终端交互改进**。同时，社区反馈集中在 macOS/Windows 桌面应用的 **沙箱权限 bug** 以及 **模型行为的稳定性** 上，其中 31 条评论的 macOS 桌面权限丢失问题成为今日最热的焦点。

---

## 2. 版本发布
### 最新发布
*   **rust-v0.174.0-alpha.1** (2026-11-24)
    *   新增功能：支持在搜索结果和对话中跳转线程链接，以及按 `Tab` 键补全斜杠命令（如 `/mcp login`）。
*   **rust-v0.172.0-alpha.2.1** (2026-11-24)
    *   继续优化任务组间的跳转体验。
*   **rust-v0.171.0-alpha.13.2** (2026-11-24)
    *   修复细节问题，提升稳定性。

---

## 3. 社区热点 Issues (Top 10)

1.  **[macOS Desktop] Full access control disappears after chat creation** (#58677)
    *   **重要性：** 🔴 **严重**。涉及核心沙箱权限逻辑，影响开发者对本地文件的访问能力。
    *   **反应：** 31条评论，7个点赞。用户反馈在创建新对话后，系统强制限制会话权限，导致工具无法正常工作。
2.  **[Windows] Permissions selector disappears after sending first message** (#62975)
    *   **重要性：** 🔴 **严重**。Windows 桌面端权限机制存在严重缺陷。
    *   **反应：** 20条评论，8个点赞。用户在发送第一条消息后无法切换回本地模式，严重影响工作流。
3.  **[macOS] Local Work ignores Full access / Seatbelt profile** (#63270)
    *   **重要性：** 🔴 **严重**。与 #58677 类似，涉及 macOS 安全机制（Seatbelt）与 Codex Work 模式的冲突。
    *   **反应：** 5条评论，1个点赞。即使选择了 Full access，工具仍被限制在受限的工作区，无法写入文件。
4.  **[Desktop] Archived Codex cloud tasks have no Delete action** (#46182)
    *   **重要性：** 🟡 **中**。UI/UX 遗留问题，影响长期使用后的数据清理。
    *   **反应：** 16条评论，15个点赞。用户无法彻底删除已归档的任务，只能通过“取消归档”恢复，存在数据泄露风险。
5.  **[Windows] Desktop app closes and reopens on Send** (#62901)
    *   **重要性：** 🟡 **中**。应用稳定性问题，打断用户操作。
    *   **反应：** 8条评论。涉及 JavaScript 错误 `Peer closed MessagePort connection`。
6.  **[macOS] Bluetooth dictation fails after update** (#62733)
    *   **重要性：** 🟡 **中**。输入法兼容性问题。
    *   **反应：** 14条评论。更新至 26.1117.3838.0 后，Windows 蓝牙耳机语音输入失效。
7.  **[macOS] Regression: enabled local skills disappear from slash menu** (#62700)
    *   **重要性：** 🟡 **中**。功能回归，影响技能调用。
    *   **反应：** 10条评论，9个点赞。从 26.1117.31558 升级后，本地技能菜单不可见。
8.  **[CLI] Pasting is really slow on Windows** (#14099)
    *   **重要性：** 🟡 **中**。CLI 性能痛点。
    *   **反应：** 8条评论，2个点赞。长期存在的 Windows 剪贴板粘贴延迟问题。
9.  **[Goals] Repetitive response loop after context compaction** (#47707)
    *   **重要性：** 🟡 **中**。模型行为逻辑 Bug，影响复杂任务处理。
    *   **反应：** 4条评论。长对话在自动压缩上下文后出现死循环。
10. **[Windows] Missing /plan and local workspace features** (#63292)
    *   **重要性：** 🟡 **中**。Windows 客户端功能缺失。
    *   **反应：** 3条评论。用户反馈 Windows 版本无法使用 `/plan` 命令或切换本地工作区。

---

## 4. 重要 PR 进展 (Top 10)

1.  **#63537** - Reap idle local code-mode hosts after five seconds
    *   **内容：** 优化资源管理，在空闲5秒后回收本地代码模式主机进程，释放资源。
2.  **#63533** - Refresh the model catalog from Responses WebSocket handshakes
    *   **内容：** 解决模型列表缓存过期问题，确保 WebSocket 握手时能获取最新的 `x-models-etag`。
3.  **#63532** - Let extensions supply per-request authentication for MCP servers
    *   **内容：** 增强 MCP 服务器扩展能力，允许扩展在每次请求时动态提供认证凭据。
4.  **#63528** - Verify eval plugin archives with scoped signing keys
    *   **内容：** 修复插件签名验证逻辑，确保能正确使用 `eval_keys` 进行归档校验。
5.  **#63525** - Require thread stores to provide a session model ID store
    *   **内容：** 改进线程存储的模型管理，要求持久化存储在会话重启后保持模型别名一致。
6.  **#63523** - Preserve accepted prompts when turn setup is interrupted
    *   **内容：** 提升健壮性，防止在扩展设置或 Git 根目录发现被中断时丢失已接受的提示词。
7.  **#63520** - Wait for foreground terminal ownership before resuming the TUI
    *   **内容：** 修复 `Ctrl-Z` 后恢复 TUI 时的终端所有权冲突问题，防止 shell 设置干扰。
8.  **#63516** - Avoid panics when TUI recovery diagnostics fail to write
    *   **内容：** 增强错误处理，防止在 stderr 关闭时因写入失败导致 panic。
9.  **#63497** - Connect Codex Desktop MCP over Unix sockets
    *   **内容：** 修复 SSH 转发场景下的 MCP 连接问题，确保连接指向正确的监听器。
10. **#63487** - Add signature verification for Plugin Service archives
    *   **内容：** 新增基于 SHA-256 签名的 Plugin Service 归档验证机制，防止文件替换攻击。

---

## 5. 功能需求趋势

*   **IDE 集成与权限管理：** 社区高度关注桌面端（尤其是 macOS 和 Windows）的沙箱权限控制。用户强烈要求在 Work 模式下正确继承“Full Access”设置，并希望能在 IDE 或桌面应用中彻底删除归档的任务。
*   **插件与扩展生态：** 随着 MCP (Model Context Protocol) 的普及，社区关注点转向插件的安全验证、认证机制的灵活性以及扩展的签名管理。
*   **终端交互体验：** TUI (Terminal User Interface) 的稳定性受到关注，特别是 Windows 下的剪贴板粘贴速度、Ctrl-Z 挂起恢复以及终端标题管理。

---

## 6. 开发者关注点

*   **稳定性与崩溃：** Windows 桌面应用在发送消息时崩溃（`Peer closed MessagePort`）以及 macOS 蓝牙输入失效是近期的高频报错。
*   **模型行为：** 长期运行的任务在自动上下文压缩后出现“跑圈”行为（重复回复），影响了复杂代码任务的执行效率。
*   **配置一致性：** 配置的审批策略和权限设置在不同会话或重启后未能正确保持（例如 `codex exec` 强制覆盖审批策略），增加了手动配置的工作量。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-24
**数据来源**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 1. 今日速览
Gemini CLI 今天的开发重心集中在 **v0.71.x 系列的补丁维护**（v0.71.1）以及 **v0.72.0-preview.0 的新功能预览**。社区活跃度较高，共更新了 34 个 Pull Request 和 50 个 Issues。技术团队正在积极修复 **Web 搜索工具的挂起问题**、**认证机制的安全性**以及 **扩展管理的细节**，同时针对 Subagent（子代理）和浏览器代理的稳定性改进呼声较高。

---

## 2. 版本发布

### v0.71.1 (Patch Release)
*   **发布时间**: 2026-11-24
*   **关键内容**: 自动补丁版本，旨在修复 v0.71.0 中的关键问题并创建一个稳定的 v0.71.x 分支。
*   **主要变动**: 自动 cherry-pick 了特定提交以修复 v0.71.0 的已知问题。

### v0.72.0-preview.0 (Preview Release)
*   **发布时间**: 2026-11-24
*   **关键内容**: 下一代版本的预览，引入了更强大的认证机制和扩展包管理改进。
*   **主要变动**:
    *   **安全增强**: A2A 服务器强制执行 Bearer Token 认证，并加强请求输入验证。
    *   **扩展管理**: 扩展的安装和更新许可机制现在会详细描述所有添加的内容（不仅仅是清单字段），并在更新时进行对比。

### v0.71.0-nightly.20261124.gaafdfdfb5 (Nightly Build)
*   **发布时间**: 2026-11-24
*   **关键内容**: 修复了 A2A 服务器认证和请求验证的夜间构建版本。

---

## 3. 社区热点 Issues (Top 10)

1.  **[P1 Bug] Subagent 恢复机制错误报告**
    *   **问题**: `codebase_investigator` 子代理在达到 MAX_TURNS 限制时，错误地报告为 GOAL success，导致中断被隐藏。
    *   **重要性**: P1 级别 Bug，直接影响核心代码调查功能的准确性。
    *   **链接**: [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2.  **[P1 Bug] Generalist Agent 永久挂起**
    *   **问题**: `gemini-cli` 在使用 Generalist Agent 时会无限期挂起，甚至简单的文件夹创建操作也会卡住。
    *   **重要性**: 严重影响用户日常使用体验，用户反馈需等待一小时。
    *   **链接**: [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3.  **[P2 Feature] 利用模型的 Bash 原生能力**
    *   **问题**: 如何在零依赖沙箱和执行后意图路由中利用 Gemini 3 模型对 Bash 的亲和性，以安全地使用 POSIX 工具探索代码库。
    *   **重要性**: 涉及 Agent 行为模式和安全性的重大架构讨论。
    *   **链接**: [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)

4.  **[P2 Bug] Browser Agent 忽略配置覆盖**
    *   **问题**: Browser Agent 完全忽略 `settings.json` 中的配置覆盖（如 `maxTurns`）。
    *   **重要性**: 配置灵活性降低，可能导致 Agent 行为不可控。
    *   **链接**: [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)

5.  **[P2 Feature] AST 感知文件读取与映射**
    *   **问题**: 探讨 AST 感知工具在读取方法边界、减少 Token 噪音方面的价值。
    *   **重要性**: 针对长上下文窗口优化的关键技术方向。
    *   **链接**: [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)

6.  **[P2 Bug] Agent 未充分利用 Skills 和 Sub-agents**
    *   **问题**: 模型在执行相关任务时，往往不会主动调用自定义 Skills，必须手动指令。
    *   **重要性**: 涉及 Agent 智能度和自动化程度的提升。
    *   **链接**: [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)

7.  **[P2 Bug] Browser Agent Wayland 平台兼容性**
    *   **问题**: Browser Subagent 在 Wayland 显示服务器环境下失败。
    *   **重要性**: 影响非 X11 Linux 用户的可用性。
    *   **链接**: [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)

8.  **[P2 Bug] 超过 128 个工具时的 400 错误**
    *   **问题**: 当可用工具超过 128 个时，CLI 会遇到 400 错误。
    *   **重要性**: 限制了大中型项目中的工具集成能力。
    *   **链接**: [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)

9.  **[P2 Bug] Agent 需要停止/劝阻破坏性行为**
    *   **问题**: Agent 在处理 Git 操作或数据库维护时，偶尔会使用 `git reset --force` 等危险命令。
    *   **重要性**: 生产环境中的安全性和数据保护问题。
    *   **链接**: [#22672](https://github.com/google-gemini/gemini-cli/issues/22672)

10. **[P2 Bug] get-shit-done 输出钩子导致崩溃**
    *   **问题**: 当 `get-shit-done` 输出接近完成时，CLI 崩溃。
    *   **重要性**: 影响特定工作流（如容器化应用启动）的稳定性。
    *   **链接**: [#22186](https://github.com/google-gemini/gemini-cli/issues/22186)

---

## 4. 重要 PR 进展 (Top 10)

1.  **[PR #30420] fix(a2a-server): enforce bearer token authentication and request input validation**
    *   **状态**: Closed
    *   **内容**: 在 A2A 服务器中配置环境变量认证，并在 HTTP 层、任务创建和 restore 命令中实施一致的请求输入验证。这是 v0.72.0-preview 版本安全性的重要基石。

2.  **[PR #30441] fix(cli): cover all extension content in install and update consent**
    *   **状态**: Open
    *   **内容**: 改进扩展安装和更新的许可流程，现在会描述扩展添加的所有内容（包括 hooks、context 文件），并在更新时进行对比确认。

3.  **[PR #30415] fix(core): add a time limit to web search and stop retries on abort**
    *   **状态**: Open
    *   **内容**: 解决 Web Search 工具无限制等待的问题。添加超时限制，防止 Agent 在请求卡住或服务器返回可重试错误时无限期挂起。

4.  **[PR #30423] chore(deps): bump the npm-dependencies group**
    *   **状态**: Open
    *   **内容**: 更新了 69 个依赖包，包括 `simple-git`, `@octokit/rest`, `@vitest` 等，旨在提升包的安全性和性能。

5.  **[PR #30438] chore(deps): bump vite from 7.3.2 to 7.3.8**
    *   **状态**: Closed
    *   **内容**: 依赖升级，修复潜在的构建问题。

6.  **[PR #30437] chore(deps): bump markdown-it**
    *   **状态**: Closed
    *   **内容**: 依赖升级，用于处理 Markdown 文档。

7.  **[PR #30436] chore(deps): bump @vitest/mocker, vitest and @vitest/coverage-v8**
    *   **状态**: Closed
    *   **内容**: 更新测试框架核心依赖。

8.  **[PR #30435] chore(deps): bump body-parser from 2.2.2 to 2.4.0**
    *   **状态**: Closed
    *   **内容**: 依赖升级，包含安全更新。

9.  **[PR #30429] fix(patch): cherry-pick aafdfdf to release/v0.71.0-pr-30420**
    *   **状态**: Closed
    *   **内容**: 自动将修复补丁应用到 v0.71.0 分支以生成 v0.71.1。

10. **[PR #30428] chore(release): bump version to 0.73.0-nightly.20261123**
    *   **状态**: Closed
    *   **内容**: 版本号自动更新，准备下一轮 nightly 构建。

---

## 5. 功能需求趋势

*   **Agent 行为优化与稳定性**: 社区对 **Subagent (子代理)** 的挂起、恢复机制以及 **Generalist Agent** 的智能度提出了大量反馈。特别是 Agent 在达到最大轮数时的状态报告错误，是当前的高优先级修复目标。
*   **安全性与沙箱**: 如何让 Agent 在利用原生 Bash 能力的同时保持安全，以及防止 Agent 执行破坏性操作（如 `git reset --force`），是核心讨论话题。
*   **长上下文与性能优化**: 关于 **AST 感知文件读取** 和 **Token 节流** 的讨论表明，社区关注如何在处理大型代码库时减少 Token 消耗并提高效率。
*   **跨平台兼容性**: **Wayland** 平台下的 Browser Agent 兼容性以及 **Windows** 相关的扩展安装问题也在持续改进中。

---

## 6. 开发者关注点

1.  **工具限制**: 当项目集成了超过 128 个工具时，CLI 会报错，开发者需要 Agent 智能地限制工具范围。
2.  **配置覆盖失效**: 用户发现 `settings.json` 中的配置（如 `maxTurns`）经常被 Browser Agent 忽略，导致行为不可预测。
3.  **环境依赖**: 越来越多的开发者报告在 Linux (Wayland) 和 Windows 环境下使用 CLI 遇到特定 bug。
4.  **日志与调试**: 用户希望能在 Bug Report 中获得 Subagent 的内部上下文，以便更准确地定位问题。
5.  **依赖安全**: 依赖包的频繁更新反映了社区对依赖库安全性的关注，特别是涉及 Zod 和 Body-parser 的安全补丁。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：** 2026-11-24
**数据范围：** 过去 24 小时更新

---

## 1. 今日速览
今日 Copilot CLI 社区活跃度较高，核心团队发布了 v1.0.115-8 版本，重点优化了子代理使用统计和权限审查流程。社区反馈主要集中在 **MCP (Model Context Protocol)** 协议的稳定性、会话恢复机制以及 Windows 平台的权限冲突上。此外，多个关于云沙盒会话中断和 Android 移动端连接断开的问题引发了开发者的广泛关注。

---

## 2. 版本发布
**v1.0.115-8** (2026-11-24)
本次更新聚焦于用户体验和运行时稳定性：
*   **子代理统计优化**：`--usage-output-file` 现在按配置名称聚合子代理使用情况，而非调用 ID，并报告每个子代理的启动次数。
*   **权限辅助改进**：Assisted Permissions 在审查模型挂起或失败时，会尝试切换到备用模型，以减少不必要的审批弹窗。

---

## 3. 社区热点 Issues (Top 10)

1.  **Linux x86_64 CLI 崩溃** 🐛
    *   **摘要**：在 Arch Linux 上，长生命周期交互会话导致 CLI 在 `cli-native.node` 中触发 `SIGABRT`。
    *   **重要性**：影响核心交互体验，导致会话意外终止。
    *   [GitHub Issue #5561](https://github.com/github/copilot-cli/issues/5561)

2.  **Windows 权限与 MCP 锁冲突** 🐛
    *   **摘要**：Windows 上，以管理员身份运行的会话创建了 `.mcp-writer.lock`，导致后续普通权限会话无法启动 MCP 服务器。
    *   **重要性**：跨权限级别的会话隔离问题，阻碍普通用户使用高级功能。
    *   [GitHub Issue #5255](https://github.com/github/copilot-cli/issues/5255)

3.  **云沙盒会话无法重连** 🐛
    *   **摘要**：执行完工具调用后，云沙盒会话停止接受实时连接，且重试机制失效，仅保留只读历史。
    *   **重要性**：严重破坏了实时交互流，用户无法继续对话。
    *   [GitHub Issue #5552](https://github.com/github/copilot-cli/issues/5552)

4.  **Android 移动端会话丢失** 🐛
    *   **摘要**：在 GitHub Mobile Android 应用中，当应用进入后台 2-3 分钟，云会话连接断开，且重启失败。
    *   **重要性**：移动端用户体验重大缺陷，影响随时随地开发。
    *   [GitHub Issue #5553](https://github.com/github/copilot-cli/issues/5553)

5.  **Windows 插件卸载失败** 🐛
    *   **摘要**：在 Windows 上卸载插件时出现 "Access is denied" 错误，影响插件管理。
    *   **重要性**：阻碍了开发者扩展 Copilot 的能力。
    *   [GitHub Issue #5119](https://github.com/github/copilot-cli/issues/5119)

6.  **ACp 模式推理摘要缺失** 🐛
    *   **摘要**：自 1.0.110 起，`--acp` 模式不再发送 `agent_thought_chunk`，导致 ACP 客户端看不到思考过程。
    *   **重要性**：影响集成 Copilot 的外部工具的可观测性。
    *   [GitHub Issue #5556](https://github.com/github/copilot-cli/issues/5556)

7.  **会话“无法复活”** 🐛
    *   **摘要**：崩溃的主机留下的 `inuse.<pid>.lock` 锁文件导致保存的会话无法重新打开。
    *   **重要性**：数据丢失风险，用户无法从崩溃中恢复上下文。
    *   [GitHub Issue #4805](https://github.com/github/copilot-cli/issues/4805)

8.  **MCP Tasks 扩展支持缺失** 🐛
    *   **摘要**：Copilot CLI 声明了 MCP Tasks 支持，但在调用标记为 `taskSupport: "required"` 的工具时未发送任务增强信息。
    *   **重要性**：核心 MCP 协议兼容性问题。
    *   [GitHub Issue #5540](https://github.com/github/copilot-cli/issues/5540)

9.  **交互模式下的工具权限卡死** 🐛
    *   **摘要**：在 prompt 模式下，扩展工具的权限请求会无限等待，且无法通过 `--allow-tool` 指定。
    *   **重要性**：自动化脚本运行受阻，无法正常使用扩展工具。
    *   [GitHub Issue #5381](https://github.com/github/copilot-cli/issues/5381)

10. **MCP 配置文件不支持注释** 🐛
    *   **摘要**：`.mcp.json` 文件解析为严格 JSON，注释会导致整个配置被跳过。
    *   **重要性**：配置维护困难，无法使用标准 JSON 注释习惯。
    *   [GitHub Issue #4323](https://github.com/github/copilot-cli/issues/4323)

---

## 4. 重要 PR 进展 (Top 10)

1.  **[CLOSED] 本地 SDK 连接令牌生成** 🔧
    *   **内容**：为 CLI 容器添加可选的连接令牌生成功能 (`COPILOT_CONNECTION_TOKEN_GENERATE=true`)，允许本地 SDK 在没有宿主机密钥的情况下先连接。
    *   [GitHub PR #5554](https://github.com/github/copilot-cli/pull/5554)

*(注：过去24小时内仅更新了1条PR，其余为历史或未更新的条目，故展示最新动态)*

---

## 5. 功能需求趋势

从 Issue 数据分析，社区当前最关注的功能方向如下：

*   **MCP (Model Context Protocol) 稳定性**：占据大量 Issue，包括协议扩展支持（如 Tasks）、OAuth 认证流程、配置解析以及远程服务器的连接问题。这表明 MCP 生态正在快速集成，但兼容性和稳定性是瓶颈。
*   **跨平台与权限管理**：Windows 平台（包括管理员/非管理员权限冲突、插件卸载）和移动端（Android 后台断连）的问题频发，显示平台适配仍是重点。
*   **会话管理与上下文恢复**：如何处理崩溃后的会话恢复、锁文件清理以及长生命周期会话的心跳维持是高频痛点。
*   **配置与工具链**：Worktrees 的使用体验、MCP 配置文件的易用性（注释支持）以及移动端的无障碍体验。

---

## 6. 开发者关注点

*   **“断连恐惧”**：云沙盒会话和 Android 应用在后台或操作后容易断连，且难以自动恢复，这是开发者反馈最强烈的问题之一。
*   **MCP 协议细节**：社区开发者正在深入调试 MCP 协议的细节（如 `CreateTaskResult` 处理、动态 Header 生成），希望能更好地与自定义 MCP 服务器集成。
*   **权限模型**：Windows 下的权限隔离问题（管理员与非管理员互斥）以及交互模式下的权限拒绝机制，需要更细粒度的控制策略。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-11-24  
**来源：** [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
OpenCode 发布了 **v2.4.1** 版本，重点修复了 macOS 12 上的 SQLite 会话保存问题，并优化了配置中仅设置的 Provider 模型展示。社区活跃度高，今日新增 50 个 Issues 和 50 个 PR，主要集中在桌面端体验优化（如侧边栏、文件树、Git 集成）以及 TUI 和后端服务的稳定性改进。

---

## 2. 版本发布
**v2.4.1** (2026-11-24)
- **macOS 12 Session Fix**: 修复了 macOS 12 自带的旧版 SQLite 无法保存助手消息的问题 ([#65771](https://github.com/anomalyco/opencode/pull/65771))。
- **Config-Only Providers 显示**: 仅在配置文件中设置的 Provider（如 Ollama）现在也能在界面上显示其可用模型。

---

## 3. 社区热点 Issues
以下为今日评论数最多且具有代表性的 Issues：

1.  **#54267 [Service Relaunch Fail]**
    *   **描述**: 重启服务时报错“Managed service port already in use”，当旧的后台服务未完全退出时触发。
    *   **重要性**: 核心后端稳定性问题，影响用户日常重启操作。
    *   **反应**: 14 次评论，4 个点赞，已进入调试阶段。

2.  **#57849 [DeepSeek V4.1 Flash 性能]**
    *   **描述**: 在高上下文（241k-607k）且高缓存命中率下，首字生成时间（TTFT）极长（21.7s-178.2s）。
    *   **重要性**: 涉及推理模型性能瓶颈，影响大上下文场景体验。
    *   **反应**: 12 次评论，1 个点赞，正在收集更多数据。

3.  **#65946 [Desktop: 右键链接在浏览器面板打开]**
    *   **描述**: 希望在消息中右键点击链接，能直接在应用内的浏览器面板中打开并让 Agent 处理。
    *   **重要性**: 桌面端增强集成度，提升 Agent 交互体验。
    *   **反应**: 8 次评论，新 Feature 请求。

4.  **#43758 [Session-scoped Terminals]**
    *   **描述**: 建议为每个会话分配独立的终端上下文，而不是全局共享。
    *   **重要性**: 解决多任务并行时的环境隔离痛点。
    *   **反应**: 8 次评论，1 个点赞。

5.  **#59052 [Clipboard Racing]**
    *   **描述**: macOS 上 TUI 复制文本时，Alacritty 报告 NSPasteboard 写入失败。
    *   **重要性**: 平台特定的剪贴板兼容性问题。
    *   **反应**: 6 次评论，新 Bug 报告。

6.  **#65424 [Git Worktree 路径显示]**
    *   **描述**: 切换 Worktree 后，TUI 底部状态栏只显示路径，丢失了分支信息。
    *   **重要性**: Git 工作流显示细节缺失。
    *   **反应**: 4 次评论，新 Bug 报告。

7.  **#65959 [Desktop: 项目名称显示混乱与删除选项]**
    *   **描述**: 切换项目后界面显示的项目名未更新，且缺少删除项目的入口。
    *   **重要性**: 用户管理混乱，影响项目切换体验。
    *   **反应**: 3 次评论，新 Bug 报告。

8.  **#65966 [opencode-go TTFT 随长度增长]**
    *   **描述**: 请求头延迟随 Prompt 长度线性增长，且流量被路由到远程 IAD。
    *   **重要性**: 涉及 Go 推理服务器的端到端性能问题。
    *   **反应**: 3 次评论，新 Bug 报告。

9.  **#65928 [Free Tier 无法使用]**
    *   **描述**: 报告免费额度已用尽，尽管已经一周未使用。
    *   **重要性**: 用户体验与计费逻辑问题。
    *   **反应**: 3 次评论，社区求助。

10. **#62145 [Goal 服务器重启]**
    *   **描述**: 在同一数据库上启动第二个服务器会暂停所有正在运行的目标。
    *   **重要性**: 多实例部署下的并发逻辑缺陷。
    *   **反应**: 2 次评论，重现报告。

---

## 4. 重要 PR 进展
以下为今日评论数较多或功能重要的 PR：

1.  **#65976 [Fix: Artifact 背景样式]**
    *   **内容**: 修复了纯文本和代码文件在 Artifact 视图中继承了错误的背景色和样式。
    *   **状态**: Open (Contributor)

2.  **#63669 [Feat: Agent 指令与 Plan 模式]**
    *   **内容**: 实现了 Agent 指令功能，并将其用于 Plan 模式，解决了 Plan 模式下重复添加 Reminder 导致的循环唤醒问题。
    *   **状态**: Open

3.  **#65915 [Fix: 高并发下的后台服务稳定性]**
    *   **内容**: 修复了在多工作区、多 Agent 并发情况下后台服务频繁重启的问题（6小时内重启97次）。
    *   **状态**: Open

4.  **#65914 [Fix: Tab Strip 性能优化]**
    *   **内容**: 消除了 Tab Strip 中每个标签页更新时的 O(n) 二次方级性能开销，优化了多标签页体验。
    *   **状态**: Open

5.  **#65961 [Feat: 侧边栏会话管理]**
    *   **内容**: 实现了在侧边栏固定“收件箱”会话，并增加“归档”按钮和对话框。
    *   **状态**: Open

6.  **#65948 [Fix: Workerd WebSocket 支持]**
    *   **内容**: 在 Cloudflare Durable Object 的 `workerd` 服务器中接受机器 WebSocket 链接。
    *   **状态**: Closed (Merged)

7.  **#65967 [Fix: PDF 检测]**
    *   **内容**: 修复了由于 PDF 头部不在字节 0 导致的无法读取错误。
    *   **状态**: Closed (Merged)

8.  **#65957 [Fix: 子 Agent 面板显示]**
    *   **内容**: 修复了打开子 Agent 时侧边栏显示为空白“新标签页”的问题。
    *   **状态**: Closed (Merged)

9.  **#63599 [Feat: OS 级 Shell 沙箱]**
    *   **内容**: 为 Linux 和 macOS 添加了可选的 OS 级 Shell 沙箱支持（bubblewrap/sandbox-exec）。
    *   **状态**: Closed (Merged)

10. **#65965 [Fix: Copilot Free Auto 检测]**
    *   **内容**: 修复了无法正确检测 Copilot Free Auto 模型的问题（因 `billing.auto_discount` 字段变更）。
    *   **状态**: Open

---

## 5. 功能需求趋势
从今日 Issues 中提炼出的社区关注焦点：

1.  **桌面端 IDE 化体验**：
    *   **文件树与项目管理**：强烈需求类似 IntelliJ 的项目树、Git 历史和 Worktree 管理器。
    *   **侧边栏优化**：需要更清晰的会话分组、归档功能以及工作会话的区分。
    *   **Diff 与文件操作**：希望能在 Diff 视图中直接复制路径、在资源管理器中打开文件。

2.  **Agent 与会话交互**：
    *   **上下文隔离**：请求 Session-scoped terminals 以避免环境冲突。
    *   **浏览器集成**：希望在消息中右键链接能直接在应用内打开并供 Agent 读取。

3.  **模型与推理性能**：
    *   **大上下文优化**：关注 DeepSeek V4.1 Flash 在高并发和长上下文下的延迟问题。
    *   **模型选择控制**：要求避免自动切换图像生成模型，并希望显示路由的底层模型。

---

## 6. 开发者关注点
1.  **稳定性与并发**：后台服务在多 Agent 并发下的稳定性（#65915）以及多实例部署下的 Goal 冲突（#62145）是核心痛点。
2.  **平台兼容性**：macOS 12 的 SQLite 兼容性以及 Linux 下的 TUI 和 Clipboard 问题频繁出现。
3.  **插件系统**：插件热重载时的工具列表同步问题（#64464）以及插件事件流的作用域问题（#65846）。
4.  **计费与免费额度**：Free Tier 的额度重置机制（#65928）引发用户困惑。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-11-24)

**数据来源**: [pi-mono](https://github.com/badlogic/pi-mono)  
**分析师**: AI 开发工具技术团队

---

### 1. 今日速览
过去24小时 Pi 社区活跃度极高，共更新 50 个 Issues 和 27 个 PR。**核心修复集中在稳定性与兼容性**：修复了 Bash 临时文件流错误导致进程崩溃、解决 WSL 与 Windows 安装冲突、以及修复了 Mermaid 图表和剪贴板在特定环境下的渲染问题。同时，针对 OpenRouter 和 OpenAI 的模型兼容性进行了多项清理工作。

### 2. 版本发布
**无**新版本发布。

### 3. 社区热点 Issues (Top 10)

1.  **#10956** - `cacheWarming "idle"` 热点失效
    *   **原因**：当扩展处理 `turn_end` 且上下文包含自定义/压缩消息时，空闲预热机制会静默停止。
    *   **影响**：导致 `continuationProbability` 始终为 1，无法触发缓存预热，会话状态异常。

2.  **#10585** - Bash 临时文件流错误导致崩溃 (p0)
    *   **原因**：磁盘空间满 (`ENOSPC`) 或权限问题 (`EACCES`) 时，未捕获的异常导致 Pi 进程直接退出，丢失运行中的会话。
    *   **影响**：极高优先级，严重破坏用户体验，导致工作流中断。

3.  **#12242** - 摘要压缩体积无限膨胀
    *   **现象**：在长会话中，压缩摘要字符数从 17k 飙升至 164k。
    *   **影响**：性能急剧下降，第九次压缩耗时 588 秒，影响响应速度。

4.  **#12444** - OpenAI Codex WebSocket 断连与参数重置
    *   **原因**：`max_output_tokens` 限制导致 WebSocket 续传失败，强制重置为发送完整输入，丢失了 Prompt Cache。
    *   **影响**：长对话中频繁重置输入，成本增加且上下文丢失。

5.  **#12224** - MCP SSE 流处理性能问题
    *   **原因**：`consumeSseStream` 使用 `+=` 追加字符串导致 V8 堆内存碎片化，大事件处理效率低。
    *   **影响**：在处理大型 MCP 事件时性能瓶颈明显。

6.  **#12164** - API Key 配置状态显示错误
    *   **原因**：`auth.json` 中的 `!command` 密钥管理器失效后，`/login` 仍显示为“已配置”。
    *   **影响**：误导用户，导致后续请求因“未找到 Key”而失败。

7.  **#12317** - Windows 终端 EIO/EPIPE 导致 Agent 崩溃
    *   **原因**：Windows 下切换标签页或休眠唤醒导致 stdin/stdout 出现临时错误，触发 `emergencyTerminalExit`。
    *   **影响**：非致命错误导致 Agent 立即退出，打断工作流。

8.  **#12407** - Gemini-4-Neon 流式输出中断
    *   **原因**：OpenRouter 将 `"MALFORMED_RESPONSE"` 规范化为 OpenAI 格式，导致模型流式停止。
    *   **影响**：新模型可用性不稳定。

9.  **#12035** - 虚拟模型上下文窗口阈值错误
    *   **原因**：使用虚拟模型时 `_modelForMessage()` 返回 `undefined`，导致阈值检查逻辑失效。
    *   **影响**：压缩触发时机不准确。

10. **#12383** - 恢复会话无法加载工具
    *   **原因**：恢复的会话无法从 provider payload 中读取工具定义。
    *   **影响**：恢复会话功能受限，模型无法调用必要工具。

### 4. 重要 PR 进展 (Top 10)

1.  **#12461** - 修复 Bash 输出文件回退逻辑
    *   **内容**：修复 `readFullOutput` 中截断标记和 `truncated: true` 状态的误判。
    *   **状态**：Closed (已合并)

2.  **#12451** - MCP SSE 流读取线性化优化
    *   **内容**：解决大事件流读取时的性能瓶颈，避免字符串拼接导致的内存碎片。
    *   **状态**：Open (修复 #12224)

3.  **#12452** - 阻止临时文件写入失败导致崩溃
    *   **内容**：为 `WriteStream` 添加错误监听器，防止 `ENOSPC` 或权限错误导致未捕获异常。
    *   **状态**：Closed (修复 #10585)

4.  **#12455** - 修正 `finish_reason: "error"` 重试机制
    *   **内容**：将错误分类从 Provider 消息层移至重试分类器，确保 Copilot 等流式错误能被正确重试。
    *   **状态**：Closed (修复 #12206)

5.  **#12457** - 阻止 WSL 运行 Windows 安装更新
    *   **内容**：在 WSL 环境中检测到 Windows `pi` 安装时，阻止运行 Linux 版本的更新脚本。
    *   **状态**：Closed (修复 #12172)

6.  **#12454** - 报告未解析的存储密钥
    *   **内容**：修复 `/login` 显示，当 `!command` 密钥失效时应显示为“未配置”。
    *   **状态**：Closed (修复 #12164)

7.  **#12453** - 清理已下线的 Groq 模型
    *   **内容**：在 Groq Provider 中启用 `skipDeprecated: true`，移除已关停的模型列表。
    *   **状态**：Closed

8.  **#12437** - 固定 Codex 初始思考层级
    *   **内容**：修复 1.6.0 版本中 `high` 思考层级被重置为 `medium` 的问题。
    *   **状态**：Closed (修复 #12361)

9.  **#12441** - 支持 Gemini `xhigh` 思考层级
    *   **内容**：修复在 `gemini-4-neon` 上选择 `xhigh` 思考层级时的 API 映射错误。
    *   **状态**：Closed

10. **#12434** - 重试速率限制错误
    *   **内容**：增加对 OpenAI 429 `slow_down` 错误的重试逻辑。
    *   **状态**：Closed

### 5. 功能需求趋势
*   **模型兼容性维护**：社区高频反馈已下线模型仍出现在列表中，需求集中在自动化清理废弃模型和修复新模型（如 Gemini-4 系列）的 API 兼容性。
*   **稳定性与健壮性**：Bash 流处理、临时文件管理、以及 Windows 环境下的终端信号处理是开发者的核心痛点。
*   **缓存与性能优化**：Prompt Cache 的正确性以及摘要压缩体积的膨胀问题备受关注，直接影响长会话的运行成本。

### 6. 开发者关注点
*   **会话恢复机制**：恢复会话后工具列表丢失、工具执行结果缺失等问题频发，严重阻碍了断点续传功能的实际使用。
*   **环境兼容性**：WSL 与 Windows 共存环境下的安装管理、Wayland 剪贴板 MIME 类型推断、以及不同终端下的信号处理是环境适配的难点。
*   **用户体验细节**：图表渲染失败无提示、登录界面密钥状态显示错误等 UI 细节问题虽然不影响核心功能，但显著降低了用户信任度。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-11-24  
**数据来源：** github.com/QwenLM/qwen-code  
**分析师：** AI 开发工具技术分析师

---

## 1. 今日速览

Qwen Code 仓库在过去 24 小时内保持了活跃的开发节奏。**核心功能演进**方面，主要聚焦于 Agent 生命周期管理（如 Action Parking 和 Managed Agent 的稳定化）以及上下文压缩的健壮性修复。**Web Shell 与 CLI** 体验持续优化，新增了内置显示翻译和会话历史跨设备同步功能。同时，社区对 **MCP (Model Context Protocol) 支持的增强**以及 **会话隐私安全**（API Key 持久化脱敏）表现出了强烈关注。

---

## 2. 版本发布

**无新版本发布。** 仓库目前处于活跃开发状态，所有更新均通过 Pull Request 流程合并至主分支。

---

## 3. 社区热点 Issues

以下 10 个 Issue 在过去 24 小时内获得了最多关注，反映了当前社区最迫切的技术需求：

1.  **[OPEN] Tracking the 1.0 Preview loop kernel on main** (#17045)
    *   **重要性：** **核心架构路线图**。这是关于将 v1.0 Preview 中的事件驱动内核逐步迁移到主分支的关键追踪 Issue。涉及核心组件的重构，是未来版本稳定性的基石。
    *   **社区反应：** 评论数 24 条，讨论热烈。

2.  **[OPEN] 会话日志明文记录 API Key 风险** (#18165)
    *   **重要性：** **严重安全漏洞**。用户报告在更换 Token Plan API Key 时，敏感信息会被明文记录到会话日志文件中，存在敏感数据落盘风险。
    *   **社区反应：** 高度关注，涉及用户隐私安全。

3.  **[OPEN] 自动压缩后大小估算错误导致请求中断** (#15486)
    *   **重要性：** **核心稳定性 Bug**。自动压缩机制在处理工具结果时的估算逻辑存在缺陷，可能导致下一个请求被错误地限制为 `max_tokens: 1`，阻断会话。

4.  **[OPEN] MCP 客户端支持 Elicitation 能力** (#17316)
    *   **重要性：** **MCP 协议增强**。当前 MCP 客户端不支持服务器发起的结构化用户输入请求，限制了与依赖交互式输入的 MCP 服务器的兼容性。

5.  **[OPEN] Windows 下 /cd 命令路径补全区分大小写** (#18162)
    *   **重要性：** **跨平台体验**。Windows 用户在切换目录时遇到路径补全失效的问题，影响 CLI 的易用性。

6.  **[OPEN] Web Shell 文件链接跨工作区打开失败** (#18198)
    *   **重要性：** **Web Shell 交互 Bug**。在多工作区场景下，点击链接无法正确解析目标工作区，导致 ENOENT 错误。

7.  **[OPEN] Windows 环境下 MCP Server 测试清理失败** (#18204)
    *   **重要性：** **CI/CD 与环境兼容性**。Windows 平台下的单元测试在 teardown 阶段因资源清理问题（EBUSY/EPERM）持续失败。

8.  **[OPEN] Ctrl+X 外部编辑器退出后 TUI 界面乱码** (#18202)
    *   **重要性：** **终端交互体验**。使用 nano/vim 等编辑器后，终端界面无法恢复，需要强制杀进程，严重影响 CLI 使用体验。

9.  **[OPEN] Managed Agent 取消操作卡死在清理阶段** (#18127)
    *   **重要性：** **Agent 状态管理**。在处理 Agent 取消逻辑时，由于前一个回合的清理记录未确认，导致后续取消操作无限挂起。

10. **[OPEN] Web Shell 移动端单行输入框体验优化** (#18191)
    *   **重要性：** **移动端适配**。针对 iPad 和手机的单行输入框布局进行了改进，旨在提升触摸操作的发现性和聚焦体验。

---

## 4. 重要 PR 进展

以下 10 个 PR 在过去 24 小时内更新或合并，代表了主要的功能开发方向：

1.  **[OPEN] feat(serve): keep managed Skills and extensions stable within a prompt** (#18210)
    *   **内容：** 确保 Managed Agent 在多轮 Prompt 之间稳定地保持 Skill 文件和扩展的版本，支持跨 Daemon 的会话连续性。
    *   **链接：** [PR #18210](https://github.com/QwenLM/qwen-code/pull/18210)

2.  **[OPEN] fix(core): prevent compression deadlocks from unsigned thoughts** (#18209)
    *   **内容：** 修复长推理会话在接近上下文窗口限制时，压缩机制可能死锁的问题，通过处理未签名的推理块来解决。
    *   **链接：** [PR #18209](https://github.com/QwenLM/qwen-code/pull/18209)

3.  **[OPEN] feat(cli): add built-in display translation for replies and thoughts** (#18175)
    *   **内容：** 新增 `general.displayLanguage` 设置，支持在 TUI 和 Web Shell 中自动翻译模型的回复和思维链为简体中文或英文。
    *   **链接：** [PR #18175](https://github.com/QwenLM/qwen-code/pull/18175)

4.  **[OPEN] fix(core): keep text out of Gemini functionResponse.parts** (#18220)
    *   **内容：** 修复发送给 Gemini 模型的工具响应数据结构，确保文本内容不被错误地放入只允许媒体数据的字段中。
    *   **链接：** [PR #18220](https://github.com/QwenLM/qwen-code/pull/18220)

5.  **[OPEN] feat(verify-pr): add executable hardware microVM round orchestrator** (#18221)
    *   **内容：** 完成硬件隔离 `/verify-pr` 验证流程的后端编排层，引入令牌管理和模型代理，增强代码验证的安全性。
    *   **链接：** [PR #18221](https://github.com/QwenLM/qwen-code/pull/18221)

6.  **[OPEN] feat(web-shell): share workspace input history across devices** (#18120)
    *   **内容：** 将 Web Shell 的输入历史持久化移至本地 Daemon，实现桌面和移动端在相同工作区下的输入历史共享。
    *   **链接：** [PR #18120](https://github.com/QwenLM/qwen-code/pull/18120)

7.  **[OPEN] feat(managed-agent): park channel and pr_event Turns' approval waits** (#18203)
    *   **内容：** 完成第 2 阶段 "Action Parking" 功能，允许通过 Channel 或事件触发的 Turn 在等待工具批准时进入暂停状态。
    *   **链接：** [PR #18203](https://github.com/QwenLM/qwen-code/pull/18203)

8.  **[OPEN] feat(web-shell): enable per-workspace management from sidebar menu** (#18140)
    *   **内容：** 允许用户直接通过 Web Shell 侧边栏菜单管理和切换本地工作区，而不仅仅是只读预览。
    *   **链接：** [PR #18140](https://github.com/QwenLM/qwen-code/pull/18140)

9.  **[OPEN] fix(core,cli,web-shell): support oversized session transcripts** (#18111)
    *   **内容：** 增强 Daemon 对超大会话记录的处理能力，防止因记录过大导致会话无法恢复或崩溃。
    *   **链接：** [PR #18111](https://github.com/QwenLM/qwen-code/pull/18111)

10. **[OPEN] perf(daemon): reduce session catalog scan I/O** (#18146)
    *   **内容：** 优化 Daemon 扫描会话目录的性能，通过限制读取范围减少不必要的磁盘 I/O 操作。
    *   **链接：** [PR #18146](https://github.com/QwenLM/qwen-code/pull/18146)

---

## 5. 功能需求趋势

从今日更新的 Issue 和 PR 中，可以提炼出以下社区关注的功能方向：

1.  **Agent 生命周期与状态管理 (State Management)**
    *   **趋势：** 社区正从简单的 Agent 运行转向复杂的生命周期管理（如 Parking、Cold Recovery、Identity Join）。
    *   **关键词：** Managed Agent, Action Parking, Session Resumption.

2.  **上下文性能与压缩优化**
    *   **趋势：** 随着对话轮次增加，如何高效压缩历史记录并保持模型对细节的访问能力成为核心痛点。
    *   **关键词：** Compaction, Transcript, Context Window, Deadlocks.

3.  **跨平台与移动端体验**
    *   **趋势：** Web Shell 和 CLI 的移动端适配需求显著增加，特别是在触摸交互和输入体验上。
    *   **关键词：** Web Shell, Mobile, Touch, TUI, Windows.

4.  **安全性与隐私保护**
    *   **趋势：** 随着工具调用和数据持久化的深入，API Key 等敏感信息的脱敏和权限控制被反复强调。
    *   **关键词：** API Key Masking, Logs, Permissions.

5.  **MCP 协议深度集成**
    *   **趋势：** 社区不再满足于基础的 MCP 连接，而是开始探索高级特性，如 Elicitation（交互式提示）和资源版本控制。
    *   **关键词：** MCP, Elicitation, Tool Emission.

---

## 6. 开发者关注点

*   **崩溃与死锁风险：** 多个 Issue 报告了在特定场景（如长对话压缩、并发取消、资源清理）下系统可能死锁或崩溃的问题，开发者急需针对这些边界情况的修复。
*   **CI/CD 环境一致性：** Windows 平台下的测试失败（MCP Server 测试清理问题）表明跨平台 CI 环境存在兼容性挑战。
*   **多工作区/多会话管理：** 在复杂的工作流中，如何正确处理跨工作区的链接跳转、会话恢复以及历史同步，是目前开发者和用户反馈的难点。
*   **UI/UX 细节：** 从 Web Shell 的布局遮挡问题到 CLI 的编辑器退出乱码，开发者在追求功能完备的同时，也在强调交互细节的打磨。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*