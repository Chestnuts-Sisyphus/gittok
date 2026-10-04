# AI CLI 工具社区动态日报 2026-10-05

> 生成时间: 2026-10-04 22:37 UTC | 覆盖工具: 9 个

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



# OpenAI Codex 社区动态日报 — 2026-10-05

## 1. 今日速览

过去 24 小时，Codex Rust CLI 连续发布 `v0.162.0-alpha.12/13` 两个 alpha 版本，持续迭代核心功能。社区热点集中在 Windows 桌面应用的稳定性问题（权限、渲染器崩溃、路径解析）以及 Remote Control 跨端线程冲突，共收获数十条高互动反馈。多项 TUI/遥测/功能标志相关 PR 已合并，反映团队正系统性修复 Windows 端体验并完善遥测体系。

---

## 2. 版本发布

| 版本 | 类型 | 链接 |
|------|------|------|
| `rust-v0.162.0-alpha.13` | Rust CLI Alpha | [GitHub](https://github.com/openai/codex/releases) |
| `rust-v0.162.0-alpha.12` | Rust CLI Alpha | [GitHub](https://github.com/openai/codex/releases) |

> 注：仅标签发布，无详细 Release Notes。

---

## 3. 社区热点 Issues

| # | 标题 | 亮点 | 链接 |
|---|------|------|------|
| #49532 | 恢复 Branch 选择功能 | 69 👍，35 评论，社区强烈呼吁回归分支选择 UI | [Issue](https://github.com/openai/codex/issues/49532) |
| #37403 | macOS Remote Control 线程锁定回归 | 45 👍，63 评论，移动端续接 CLI 线程时抛 `already has an active writer` | [Issue](https://github.com/openai/codex/issues/37403) |
| #49988 | VS Code 扩展消息丢失 | 47 👍，47 评论，更新后 Enter 提交但消息不出现 | [Issue](https://github.com/openai/codex/issues/49988) |
| #48554 | Linux SIGCHLD handler 为空 | 44 评论，子进程无法回收，导致 shell/env 超时 | [Issue](https://github.com/openai/codex/issues/48554) |
| #50428 | Windows 路径反序列化失败 | 17 评论，durable chat 和 fork 因 `AbsolutePathBuf` 无 base path 而失败 | [Issue](https://github.com/openai/codex/issues/50428) |
| #49477 | Windows 持久任务跟进失败 | 13 评论，同上路径问题，混合路径与权限profile相关 | [Issue](https://github.com/openai/codex/issues/49477) |
| #29639 | WSL 下 Browser Use Node REPL 失败 | 27 评论，sandboxCwd 未映射导致工具调用失败 | [Issue](https://github.com/openai/codex/issues/29639) |
| #43347 | 关闭最后一个 Browser Use 标签崩溃 | 21 评论，Windows 端应用整体崩溃 | [Issue](https://github.com/openai/codex/issues/43347) |
| #48414 | macOS Option+L 无法输入 ł | 20 评论，Polish Pro 键盘布局特殊字符失效 | [Issue](https://github.com/openai/codex/issues/48414) |
| #50451 | 10/2 全局重置未到达付费账号 | 6 评论，用户反馈速率限制重置未生效 | [Issue](https://github.com/openai/codex/issues/50451) |

---

## 4. 重要 PR 进展

| # | 标题 | 类型 | 链接 |
|---|------|------|------|
| #50964 | 在轮次遥测中追踪工具变更 | 遥测 | [PR](https://github.com/openai/codex/pull/50964) |
| #50962 | 环境工具暴露加功能标志控制 | 功能标志 | [PR](https://github.com/openai/codex/pull/50962) |
| #50943 | 将工具变更纳入现有轮次分析 | 遥测 | [PR](https://github.com/openai/codex/pull/50943) |
| #50940 | 安全恢复 Windows deny-read ACL 损坏状态 | Windows 修复 | [PR](https://github.com/openai/codex/pull/50940) |
| #50913 | 使用服务端模型默认值进行 TUI 新会话启动 | TUI 改进 | [PR](https://github.com/openai/codex/pull/50913) |
| #50811 | TUI 新线程遵循服务端 reasoning summary 默认值 | TUI 改进 | [PR](https://github.com/openai/codex/pull/50811) |
| #50808 | 清理 TUI 快照并整合行为测试 | 测试 | [PR](https://github.com/openai/codex/pull/50808) |
| #50804 | 保留审查生命周期顺序（含失败场景） | TUI 修复 | [PR](https://github.com/openai/codex/pull/50804) |
| #50803 | 使用托管守护进程启动 eligible remote-control | Remote Control | [PR](https://github.com/openai/codex/pull/50803) |
| #50802 | Windows 守护进程 junction 更新被拒绝时降级 mklink | Windows 修复 | [PR](https://github.com/openai/codex/pull/50802) |

> 其余 PR：#50788（Vim Normal 模式斜杠命令）、#50786（Command Center 分组持久化）、#50782（Windows 守护进程发布重试）、#50781（限制 TUI MCP 通知范围）、#50764（运行中允许 `/archive`）、#50756（侧边对话显示不可用命令）、#50741（环境工具跨就绪状态保持暴露）。

---

## 5. 功能需求趋势

1. **分支选择 UI 回归** — Issue #49532 以 69 👍 成为最高支持需求，用户强烈期望恢复 Branch 选择入口。
2. **Remote Control 跨端稳定性** — Issue #37403、#44449 均反映移动端/桌面端线程锁冲突，用户依赖此工作流进行跨设备协作。
3. **Windows 路径与权限处理** — #50428、#49477、#40583、#27553 集中暴露 WSL 和 Windows 原生环境下路径解析、ACL、工具调用等系统性问题。
4. **上下文压缩与 Token 统计准确性** — #39767、#49961、#49026、#32483 均指出 reasoning tokens 被重复计算导致过早 compaction。
5. **遥测与可观测性增强** — 多项 PR（#50964、#50943）正在补齐工具变更追踪能力。

---

## 6. 开发者关注点

- **Windows 桌面稳定性**：渲染器崩溃（#50969）、UI 卡顿（#43726）、路径反序列化（#50428/#49477）、Browser Use 崩溃（#43347）高频出现，是近期反馈最密集的痛点。
- **WSL 集成**：工作区命令执行失败（#27553）、Node REPL sandboxCwd 未映射（#29639）、原生 WSL arg0 映射回归（#40583）形成集群式反馈。
- **macOS 本地化与快捷键**：Polish Pro 键盘特殊字符（#48414）及 Command+L 快捷键冲突（#29772）反映国际化输入支持仍需完善。
- **Rate Limit 重置同步**：付费用户反馈 10/2 全局重置延迟（#50451），影响体验预期管理。
- **TUI 行为一致性**：多 PR 聚焦 TUI 模型默认值、审查流程、MCP 通知范围等，说明团队正系统性收拢 TUI 体验问题。

---

*数据来源：github.com/openai/codex，统计周期 2026-10-04 ~ 2026-10-05*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报 | 2026-10-05

## 1. 今日速览
过去 24 小时无新版本发布，社区活跃于 Agent 子系统的多项 bug 修复与性能优化。高优先级 Issue 集中在 subagent 恢复、通用 agent 挂起及 browser agent 异常等问题；PR 方面则聚焦核心调度器健壮性、安全加固（命令注入防护）及 JSON 序列化修复。

---

## 2. 版本发布
无新版本发布。

---

## 3. 社区热点 Issues

| # | Issue | 优先级 | 评论/👍 | 重要性 |
|---|-------|--------|---------|--------|
| #22323 | Subagent recovery after MAX_TURNS reported as GOAL success | P1 Bug | 13/2 | subagent 达到最大轮次后误报成功，隐藏了实际中断状态，影响调试与任务可靠性 |
| #21409 | Generalist agent hangs | P1 Bug | 8/8 | 通用 agent 在执行简单任务（如创建文件夹）时永久挂起，社区关注度最高（8 👍） |
| #21983 | browser subagent fails in Wayland | P1 Bug | 4/1 | Linux Wayland 环境下 browser agent 完全不可用，是桌面端用户的重大障碍 |
| #22267 | Browser Agent ignores settings.json overrides | P2 Bug | 4/0 | browser agent 不读取配置文件覆盖（如 maxTurns），导致用户预期行为失效 |
| #22186 | get-shit-done output hook causes crash | P1 Bug | 3/0 | 任务完成钩子在打印摘要时触发崩溃，影响工作流稳定性 |
| #24246 | 400 error with > 128 tools | P2 Bug | 3/0 | 工具数量超过阈值时报 400 错误，限制大型项目的工具扩展能力 |
| #23571 | Model creates tmp scripts in random spots | P2 Bug | 3/0 | 模型在任意目录生成临时脚本，造成工作区清理负担 |
| #22672 | Agent should stop/discourage destructive behavior | P2 Feature | 3/1 | 用户希望 agent 在执行 git reset --force 等危险操作时主动预警或拒绝 |
| #22745 | Assess AST-aware file reads and search | P2 Feature | 7/1 | 探索基于 AST 的代码读取/搜索工具，可减少 token 浪费并提升代码理解精度 |
| #19873 | Zero-Dependency OS Sandboxing via bash affinity | P2 Enhancement | 9/1 | 利用 Gemini 3 的 bash 原生能力实现无依赖沙箱，是架构级优化方向 |

---

## 4. 重要 PR 进展

| # | PR | 状态 | 内容 |
|---|----|------|------|
| #29432 | fix(core): settle queued tool calls on scheduler disposal | OPEN | 调度器销毁时正确取消排队中的工具调用，避免悬挂请求 |
| #29431 | fix(core): skip invalid TOML policy rules | OPEN | 跳过已产生验证错误的 TOML 策略规则，防止空工具名导致启动崩溃 |
| #29629 | fix(cli): cap pending plain text height | OPEN | 限制流式文本高度以避免终端全屏重绘闪烁 |
| #29505 | fix: support rootless Podman with keep-id | OPEN | 修复无 root Podman 沙箱启动问题，正确保留宿主机 UID/GID |
| #29536 | fix(grep): prevent CLI option injection | OPEN | 使用 `-e` 分隔符加固 grep 模块，防止命令注入（CWE-88） |
| #29552 | fix(core): report ripgrep execution failures | OPEN | 将 ripgrep 执行失败记录为工具调用错误，提升错误可观测性 |
| #29626 | fix(core): preserve shared references in JSON | OPEN | 修复 `safeJsonStringify` 将共享引用误判为循环引用的 bug |
| #29510 | fix(editor): harden Windows subprocess quoting | OPEN | 加固 Windows 下 subprocess 参数引号处理，防止命令注入 |
| #29404 | feat(cli): add 'gemini models list' with JSON | **CLOSED** | 新增 `gemini models list -o json` 子命令，支持外部工具集成 |
| #29411 | fix(cli): resolve resume latest to most recent session | **CLOSED** | 修复 `--resume` 默认选中最新启动时间而非最新活跃会话的 bug |

---

## 5. 功能需求趋势
- **Agent 子系统健壮性**：subagent 恢复、通用 agent 挂起、browser agent 异常等 bug 高频出现，社区迫切期待稳定性提升
- **安全性增强**：命令注入防护（grep、Windows subprocess）、危险操作预警、策略规则校验等方向持续获得关注
- **AST 感知工具**：多个 Issue 探索基于 AST 的代码读取/搜索，目标是减少 token 消耗并提升代码理解精度
- **容器化沙箱**：rootless Podman 支持及零依赖 OS 沙箱方案是长期技术方向
- **可观测性**：bugreport 缺失 subagent 上下文、执行失败报告不完整等问题推动调试体验改进

---

## 6. 开发者关注点

**核心痛点：**
- Subagent 未充分利用自定义 skills 和工具，需显式指令才触发（#21968）
- Generalist agent 在简单操作（创建目录等）时永久挂起（#21409）
- Browser agent 在 Wayland 及配置覆盖场景下行为异常（#21983、#22267）
- 工具数量超过 128 个时 API 返回 400 错误（#24246）
- JSON 序列化错误处理：共享引用被误标为循环引用（#29626、#29407）
- `--resume` 语义与用户预期不符，应优先匹配最新活跃会话（#29411）
- 临时脚本散落工作区，增加清理负担（#23571）

---

*数据来源：github.com/google-gemini/gemini-cli | 统计周期：2026-10-04 00:00 ~ 2026-10-05 00:00*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-10-05  
**来源**: github.com/github/copilot-cli  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
2026年10月5日，GitHub Copilot CLI 发布了 **v1.0.92-4** 版本，主要优化了启动性能和配置管理能力。社区动态显示，**会话管理**（如 Session ID 验证）和 **MCP 服务器集成**（如 macOS 设备 ID 绑定、Cloudflare 认证）是当前最活跃的讨论领域，同时关于 **多仓库上下文加载** 和 **模型路由** 的功能需求也在增长。

---

## 2. 版本发布
### v1.0.92-4 (2026-10-04)
**新增功能**:
- 新增 `copilot config` 子命令，支持列表查看、读取、设置和移除配置项。

**性能改进**:
- 优化首次运行启动体验，将捆绑的 CLI 包提取到子进程中执行。
- 改善连接多个 MCP 服务器时的启动响应速度。
- Canvas 操作现在支持返回图片。

---

## 3. 社区热点 Issues

### 🔴 高优先级 / 严重 Bug
1. **[CLOSED] #640 Session ID 无效错误** 
   - **作者**: yassineMouttalib | **更新**: 2026-10-04
   - **摘要**: `read_bash` 命令持续抛出 `Invalid session ID: read_sql_files`，导致会话读取失败。
   - **影响**: 用户无法正常读取 bash 会话输出。
   - **反应**: 24 条评论，10 个点赞，社区普遍反映该问题影响使用体验。

2. **[CLOSED] #5008 认证启动竞态条件**
   - **作者**: versegeek | **更新**: 2026-10-04
   - **摘要**: 1.0.89 版本启动时报 `Not authenticated` 错误，但登录后功能正常。
   - **影响**: 新会话启动不稳定，用户体验受损。
   - **反应**: 7 条评论，5 个点赞。

3. **[CLOSED] #4966 1.0.88 回归导致会话挂起**
   - **作者**: heshihao0813 | **更新**: 2026-10-04
   - **摘要**: `joinSession()` 在扩展启动时阻塞，导致 30 秒超时。
   - **影响**: SDK 扩展无法正常初始化。

4. **[CLOSED] #2950 自定义 Agent 忽略配置模型**
   - **作者**: kevinhagenaars | **更新**: 2026-10-04
   - **摘要**: 调用自定义 Agent 时忽略 `agent.md` 中配置的模型，始终使用默认模型。
   - **影响**: 无法按需切换 Agent 模型。

### ⚠️ 开发者关注 / 功能建议
5. **[OPEN] #4998 macOS 更新后设备 ID 绑定失效**
   - **作者**: erebor | **更新**: 2026-10-04
   - **摘要**: 安全更新后 `.mcp-writer.binding` 持久化旧设备 ID，导致 MCP 会话无法处理提示。
   - **影响**: 升级后 Copilot CLI 不可用。
   - **反应**: 8 条评论，7 个点赞。

6. **[OPEN] #5042 HydraFusion 模型切换导致上下文丢失**
   - **作者**: zekariasasaminew | **更新**: 2026-10-04
   - **摘要**: 模型返回 400 错误后，会话被路由到小上下文模型，无法加载静态提示，工具集变更。
   - **影响**: 长会话稳定性问题。

7. **[OPEN] #5011 多仓库上下文加载需求**
   - **作者**: pade43 | **更新**: 2026-10-04
   - **摘要**: 请求在单次会话中加载多个仓库的 `.github/copilot-instructions.md`，以支持全栈开发。
   - **反应**: 0 条评论（新 Issue），符合全栈开发者需求。

8. **[OPEN] #5050 MCP 命令不区分大小写匹配**
   - **作者**: EvanBasalik | **更新**: 2026-10-04
   - **摘要**: `/mcp myserver` 无法匹配名称为 `MyServer` 的 MCP 服务器。
   - **影响**: 命令行交互不便。

9. **[OPEN] #5010 HEIC 图片附件不可见**
   - **作者**: ArlindNocaj | **更新**: 2026-10-04
   - **摘要**: 通过 `--attachment` 传入 HEIC 文件时，助手无法识别，而 PNG 正常工作。
   - **影响**: 图片辅助功能受限。

10. **[OPEN] #5051 会话超时问题**
    - **作者**: AdamKlob | **更新**: 2026-10-04
    - **摘要**: 使用外部提供商时，约 20 分钟后提示超时并重试。
    - **影响**: 长时间任务中断。

---

## 4. 重要 PR 进展
*(无新 PR 更新)*

---

## 5. 功能需求趋势
从 Issues 分析，社区关注点集中在以下方向：
1. **会话管理稳定性**: Session ID 验证、会话挂起、上下文迁移问题。
2. **MCP 服务器集成**: macOS 设备 ID 绑定、Cloudflare 认证、大小写匹配、Worker 生命周期管理。
3. **模型与 Agent**: 自定义 Agent 模型配置、HydraFusion 路由稳定性、Agent 状态显示。
4. **多仓库与全栈**: 单会话多仓库上下文加载、跨语言项目支持。
5. **终端体验**: 复制粘贴、Pending 状态渲染、附件格式支持（HEIC）。

---

## 6. 开发者关注点
- **认证与授权**: 持续出现认证错误、凭证过期、启动竞态等问题。
- **性能优化**: MCP 服务器连接响应、长会话超时、启动速度。
- **跨平台兼容**: macOS 更新后的设备 ID 绑定失效、Windows 插件可用性问题。
- **工具链集成**: 插件市场验证、HEIC 图片支持、多仓库配置加载。

> **链接汇总**: [GitHub Copilot CLI Issues](https://github.com/github/copilot-cli/issues)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-10-05  
**数据范围**: 过去 24 小时更新

---

## 1. 今日速览
OpenCode 社区本周活跃度持续高涨，主要聚焦于 **2.0 版本的稳定性提升**（如修复会话状态管理、TUI 交互问题）以及 **多模态模型适配**（Gemma 4 工具调用、DeepSeek 计费归属）。同时，针对 **Desktop 客户端与 WSL 环境的兼容性** 及 **文件系统资源限制** 的讨论热度上升，反映出随着生态扩展，底层基础设施的健壮性成为焦点。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues

### 🔴 高优先级 / 稳定性
*   **#53146** [session]: 双服务器共享数据库导致会话 ID 冲突
    *   **原因**: `opencode serve` 与 TUI 内嵌服务器共享同一数据库时，各自使用独立的内存计数器分配 `seq`，导致主键冲突。
    *   **影响**: 会话无法持久化，用户重启后可能丢失数据。
*   **#51346** [Bug]: 上下文压缩导致无限重发循环
    *   **原因**: 当附件文件超过上下文限制时，系统在压缩和重试时未正确中断，导致死循环。
*   **#52555** [Bug]: 进程泄漏导致磁盘被占满
    *   **原因**: 每次启动 `opencode` 都会解压一个 13.7MB 的原生库到 `/tmp` 且不清理，长期运行会填满磁盘。

### 🟠 交互体验 / 2.0 特性
*   **#52566** [tui]: 服务重启后消息静默丢失
    *   **痛点**: TUI 在服务器重启后仍接收输入，但不发送也不报错，导致用户以为 AI 僵死。
*   **#53239** [FEATURE]: V2 桌面端支持固定最后一条用户消息
    *   **需求**: 用户希望在滚动浏览长对话时，能固定看到当前正在输入或关注的最后一条消息。
*   **#14187** [FEATURE]: Markdown 预览侧边栏开关
    *   **需求**: 在文件查看器中直接预览 Markdown 渲染效果，而不是看原始代码。

### 🟡 模型适配 / 兼容性
*   **#20995** [CLOSED] Gemma 4 (e4b) 工具调用流式解析失败
    *   **问题**: 通过 Ollama 使用 Gemma 4 时，流式返回的 `tool_calls` 无法被 OpenCode 正确识别。
*   **#52579** [billing] DeepSeek 使用量计费错误
    *   **问题**: OpenCode Zen 计划下的 DeepSeek 模型被错误地扣除了 Go 计划的配额。
*   **#52205** [Bug]: Windows Desktop 传递 WSL 路径导致崩溃
    *   **环境**: Desktop 传递 UNC 路径给 Linux 后端，引发 HTTP 500 错误。

---

## 4. 重要 PR 进展

### 🔧 核心修复
*   **#53241** [contributor] 重构客户端服务决策逻辑
    *   **内容**: 消除重复代码，统一 `ensure()` 函数中的服务匹配逻辑，提高可维护性。
*   **#53238** [fix] 修复空闲会话清理误杀活跃会话
    *   **内容**: 优化空闲超时机制，确保正在运行的长轮询会话不会被误判为空闲而关闭。
*   **#47353** [feat] 支持托管 OTLP 导出器设置
    *   **内容**: 为托管部署增加了可观测性配置，允许自定义 OTLP 端点。

### 📝 生态与文档
*   **#28050** [docs] 添加 opencode-telegram-bot 生态项目
    *   **内容**: 完善了社区项目列表，方便用户发现第三方集成工具。
*   **#47314** [docs] 添加 temporal-context 插件文档
    *   **内容**: 补充了时间上下文插件的说明。

---

## 5. 功能需求趋势

从 Issue 分析来看，当前社区需求主要集中在以下三个方向：

1.  **精细化的会话管理**：
    *   **去队列** (#4821): 用户希望能够手动取消已排队的消息，而不是只能全部重置。
    *   **会话状态同步** (#53146): 多进程/多客户端场景下的状态一致性是 2.0 适配期的痛点。
2.  **桌面端体验优化**：
    *   **路径兼容性** (#52205): Windows WSL 环境下的路径映射是高频报错点。
    *   **TUI 交互细节** (#52566, #53239): 重启后的状态恢复和消息可见性是提升用户信任的关键。
3.  **模型能力增强**：
    *   **多模态工具调用** (#20995): 随着新模型发布（如 Gemma 4, Opus 5.5），工具调用的解析逻辑需要快速迭代。
    *   **细粒度权限** (#47337): 随着插件生态发展，工具权限的颗粒度控制变得愈发重要。

---

## 6. 开发者关注点

*   **并发与资源限制**：`EMFILE: too many open files` (#50566) 和进程内存泄漏 (#52555) 提示开发者需要关注生产环境下的资源监控和进程管理策略。
*   **Serverless/托管部署**：#53235 关于从 `/models` API 自动填充上下文限制的请求，显示出开发者在使用自建 API 网关或兼容服务时的需求。
*   **测试与合规**：#53176 (#53206) 等带有 `[needs:compliance]` 标签的 Issue，表明社区对隐私、合规性以及 Mod 化（游戏模组化）的讨论逐渐增多。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-10-05  
**项目**: pi-mono (earendil-works/pi)

---

## 1. 今日速览
今日社区活跃度极高，共处理 43 个 Issues 并更新 4 个 PR。**v1.0.2 版本** 发布，引入了基于思维层级的采样参数配置，增强了模型控制的灵活性。同时，社区在 **TUI 交互体验**、**CLI 自动压缩**、**Bedrock 图像处理**以及 **多平台兼容性**（如 Windows 和 Linux 标准目录）方面提出了大量修复建议，显示项目正在积极优化用户体验和底层稳定性。

---

## 2. 版本发布
### **v1.0.2** (最新)
- **核心特性**: 引入 `samplingParamsByThinkingLevel` 配置。
- **更新内容**: 允许用户在 `models.json` 中针对 OpenAI 兼容 API 的不同思维层级设置独立的采样参数（如 `temperature` 和 `top_p`），实现了更精细的模型行为控制。
- **链接**: [Release v1.0.2](https://github.com/badlogic/pi-mono/releases/tag/v1.0.2)

---

## 3. 社区热点 Issues (Top 10)

1.  **[CLOSED] Follow XDG Base Directory** (mks-h, 24 评论)
    *   **重要性**: Linux 用户痛点。应用目前将配置文件散落在用户主目录，违反了 Linux 桌面标准，容易造成环境杂乱。
    *   **状态**: 已关闭。

2.  **[OPEN] Bedrock: OpenAI models reject images nested in toolResult.content** (YuvalSarel1, 10 评论)
    *   **重要性**: 阻断性 Bug。在 Bedrock 上使用 OpenAI 模型时，工具结果中的图片无法被正确处理，导致功能失效。
    *   **状态**: 待修复。

3.  **[OPEN] Reconsider Home/End defaults in fullscreen mode?** (SorinGFS, 9 评论)
    *   **重要性**: TUI 交互体验优化。用户认为全屏模式下的 Home/End 键行为与旧版编辑器不一致，影响了光标定位体验。

4.  **[CLOSED] Opt-in package namespace (pi.namespace)** (maskshell, 8 评论)
    *   **重要性**: 扩展生态规范。旨在为技能和提示模板提供统一的命名空间前缀，解决资源解析冲突，提升包管理的结构化程度。

5.  **[OPEN] Can't interleave compaction requests with prompts** (aryzing, 7 评论)
    *   **重要性**: 核心功能缺陷。在提示队列中混合使用压缩指令（`/compact`）时，会导致会话意外重置或中断。

6.  **[OPEN] Anthropic adapter silently drops root anyOf from custom tool schemas** (Tolasmond, 6 评论)
    *   **重要性**: 架构兼容性问题。自定义工具的 `anyOf` 约束在传递给 Anthropic 模型时被静默丢弃，可能导致工具调用失败或参数验证错误。

7.  **[OPEN] Auto-compaction does not start in CLI mode** (parasyte, 6 评论)
    *   **重要性**: 模式支持不完整。在命令行模式下（`--mode json`），Agent 循环无法自动执行压缩，限制了自动化场景的使用。

8.  **[OPEN] CMD mode ignores outputPad setting** (spamcop, 6 评论)
    *   **重要性**: UI 细节 Bug。CMD 模式下输出内容即使在设置中关闭了内边距，依然会输出前导空格，与 Chat 模式表现不一致。

9.  **[CLOSED] OpenAI subscription refresh repeatedly fails** (kwo, 4 评论)
    *   **重要性**: 认证稳定性。OpenAI 订阅刷新时频繁出现 `refresh_token_invalidated` 错误，需要用户手动重新登录。

10. **[CLOSED] Support Stateless MCP (2026-07-28)** (SamMorrowDrums, 3 评论)
    *   **重要性**: 协议版本迭代。项目正积极跟进最新的无状态 MCP (Model Context Protocol) 标准，确保与最新生态的兼容性。

---

## 4. 重要 PR 进展 (Top 10)

1.  **[CLOSED] docs(coding-agent): document resources_discover event** (aliou)
    *   **内容**: 补充了 `resources_discover` 事件文档，并增加了示例，方便开发者理解扩展资源发现机制。

2.  **[CLOSED] fix(coding-agent): route stdin dead-terminal errors** (zichen0116)
    *   **内容**: 修复了在 SSH、tmux 或窗口关闭导致 stdin 断开时，程序未正确捕获错误并优雅退出的严重 Bug。

3.  **[CLOSED] Per thinking sampling parameters** (mrexodia)
    *   **内容**: 实现了基于思维层级的采样参数配置（对应 v1.0.2 新特性），允许针对不同思维深度使用不同的温度和参数。

4.  **[CLOSED] Export a side-effect-free Bun runtime-shim registration** (Wirasm)
    *   **内容**: 提供了一个无副作用的 Bun 运行时注册接口，方便 SDK 嵌入者（如打包成二进制的应用）在 OAuth 流程和 Bedrock 提供商中复用注册逻辑。

5.  **[CLOSED] SDK: expose raw auth/provider settlement** (piclaw-bot)
    *   **内容**: 暴露了原始的认证和提供商结算确认，用于模型请求认证和提供者执行，增加了 SDK 的透明度。

6.  **[CLOSED] Footer: make extension-status rendering...** (5hiri)
    *   **内容**: 优化了交互式底部的扩展状态渲染，增加了“截断”与“换行”的可配置选项，解决状态信息溢出问题。

7.  **[CLOSED] Provide a shared, structured diagnostic logging API** (radioflyer28)
    *   **内容**: 提供了一个核心与扩展共用的结构化日志 API，便于调试和追踪跨模式（TUI/JSON/RPC）的执行流程。

8.  **[CLOSED] Extension API: display-only assistant text transforms** (3ae3ae)
    *   **内容**: 允许扩展通过 RPC 修改助手文本的展示形式，而不影响底层的 Agent 消息或会话历史，增加了 TUI 之外的模式灵活性。

9.  **[CLOSED] [Windows] Alt-screen viewport jumps to top...** (Dinnerb0ne2)
    *   **内容**: 修复了 Windows 终端中 Alt-screen 视口自动跳回顶部且键盘输入失灵的问题。

10. **[CLOSED] codemode: abstract over execution backend** (fu5ha)
    *   **内容**: 对 code 模式的执行后端进行了抽象化设计，未来允许在不修改核心代码的情况下替换底层引擎（如从 QuickJS 切换到 Monty）。

---

## 5. 功能需求趋势

*   **多模式兼容性**: 社区高度关注 **CLI 模式** 与 **TUI 模式** 下的行为一致性，特别是在自动压缩、快捷键响应和输入处理方面。
*   **协议与模型适配**: 随着 MCP (Model Context Protocol) 和 Bedrock 等新模型/协议的普及，社区对 **图片处理**、**自定义工具 Schema** 以及 **无状态认证** 的支持提出了迫切需求。
*   **用户体验 (UX) 细节**: 开发者对 **全屏模式交互**（Home/End 键）、**输出格式化**（outputPad）以及 **XDG 标准** 的支持表现出强烈兴趣，这些直接影响日常使用体验。

---

## 6. 开发者关注点

*   **调试与日志**: 开发者强烈呼吁提供更完善的 **结构化日志 API** 和 **诊断工具**，以便在复杂的扩展开发和 RPC 交互中快速定位问题。
*   **错误处理**: 多个 Bug 反馈涉及网络重试、终端断开、Token 刷新失败等边缘情况，显示项目在 **健壮性** 和 **错误恢复** 机制上仍有改进空间。
*   **扩展开发**: 社区关注点从单纯的 Bug 修复转向 **架构抽象**（如执行后端抽象、认证流程解耦）和 **API 完善**，表明 Pi 的插件生态正在走向成熟。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-10-05
**来源**: GitHub.com/QwenLM/qwen-code

---

## 1. 今日速览
Qwen Code 0.24.7-nightly 版本发布，重点修复了代码模式文本对齐、权限审批及并发会话管理等核心问题。社区活跃度高，围绕多代理并发、会话持久化、MCP 连接稳定性及 Web Shell UI 优化展开了密集讨论。

## 2. 版本发布
**v0.24.7-nightly.20261004.9915c7ff8f** (2026-10-04 发布)
*   **更新内容**: 修复了核心代码模式文本与工具发现逻辑的对齐问题，并完善了权限审批机制，确保系统行为更加一致。

## 3. 社区热点 Issues

**1. #13333 [P1 Bug] ≥8 并发 Turns 在中端硬件上卡死**
*   **重要性**: P1 级别严重 Bug，影响系统并发性能。
*   **摘要**: 在托管代理中，当并发会话数达到 8 个及以上时，模型回答后系统会发生死锁。问题定位为 Store 路径中的锁 convoy 现象。

**2. #9693 [Closed] Windows 上 MCP 连接失败**
*   **重要性**: 跨平台兼容性痛点。
*   **摘要**: Qwen Desktop 在 Windows 上启动时即使未激活 MCP，也会报错 `Connection closed`。官方 `filesystem` 和 `sequential-thinking` 服务器均受影响。

**3. #13369 [Feature] H2.5：托管 Hooks 的加固**
*   **重要性**: 多代理架构演进的关键一步。
*   **摘要**: 在 H2 和 H3 之间引入 H2.5 阶段，旨在加固托管 Hooks 的健壮性，防止 Owner 泄漏等边缘情况，为后台 Shell 和监控做准备。

**4. #13413 [P1 Bug] 托管会话存储短暂中断导致永久卡死**
*   **重要性**: 系统可靠性核心问题。
*   **摘要**: 如果托管会话存储在写入 Turn 时短暂不可达，Harness 将停止写入该会话，导致 Turn 永远无法完成或取消，临时故障变为永久故障。

**5. #13392 [Bug] PreToolUse updatedInput 在 Desktop/ACP 0.24.7 中被忽略**
*   **重要性**: 扩展集成兼容性问题。
*   **摘要**: MCP 集成无法通过 host hook 可靠传递传输参数，因为 `PreToolUse` hook 返回的 `updatedInput` 被模型原始参数覆盖。

**6. #13387 [Bug] 自定义命令误解析文件内容为模板**
*   **重要性**: CLI 交互体验问题。
*   **摘要**: 当自定义命令引用 `@{file}` 时，文件内容会被重新解释为命令模板语法，导致字面量被替换。

**7. #13280 [Bug] 内存发现从 Git 根目录的父级加载文件**
*   **重要性**: 配置管理边界问题。
*   **摘要**: 系统错误地从 Git 根目录的上一级加载 `QWEN.md` 和 `AGENTS.md`，可能造成配置污染。

**8. #12878 [Bug] Ollama 拒绝零参数工具**
*   **重要性**: 本地模型兼容性。
*   **摘要**: 通过 OpenAI 认证类型连接本地 Ollama 时，所有工具调用失败，因为参数字段被省略导致 JSON Schema 错误。

**9. #13393 [Feature] 推理努力等级的标准化**
*   **重要性**: 模型能力配置管理。
*   **摘要**: 推理努力等级目前硬编码在多处，建议像限制和模态一样，将其从 models.dev 目录中暴露出来以便统一管理。

**10. #13396 [Feature] Web Shell 内存面板展示**
*   **重要性**: Web UI 功能增强。
*   **摘要**: Web Shell 的内存面板目前仅展示上下文文件，缺乏对托管自动内存和切换开关的展示入口。

## 4. 重要 PR 进展

**1. #13291 [Durable Tool Outcomes] M5b 本地运行时工具结果持久化**
*   **内容**: 确保 Local Managed Session 中每个 Runtime 工具的结果在离开 Host 前都持久化存储，保证数据一致性。

**2. #13402 [Performance] 使用 Condition 替代 Monitor 优化 SSE 订阅**
*   **内容**: 将托管代理服务器中 per-session 事件缓冲区的热点从 `Object.wait` 改为 `ReentrantLock`/`Condition`，提升并发性能。

**3. #13265 [H3 Runtime] 后台 Shell 和 Monitor 运行时**
*   **内容**: 实现 H3 分支，允许在 Managed 路径上运行后台 Shell 和 Monitor，是架构演进的重要里程碑。

**4. #13355 [Critical Fixes] 修复 H0c 评审后的三个 Critical 问题**
*   **内容**: 修复 Broker 记录执行映射的 Claim 生成问题，以及会话管理的相关健壮性缺陷。

**5. #13400 [Feature] 读取有界审批输入预览**
*   **内容**: 为 Hosted 审批输入添加 Java Reader 阶段，允许返回可选的精确存储输入预览（限制 8192 字节），用于 API 列表和详情接口。

**6. #13343 [Docs] 修复 R2 评审中的文档问题**
*   **内容**: 修复托管代理文档中的 6 个问题（1 Critical + 5 Suggestion），并修正 README 中的路径冲突。

**7. #13352 [H5c] 证明 Shell 进程组停止机制**
*   **内容**: 实现 M5c 物理停止切片，通过 Worker Ledger 记录进程组，确保 Shell 进程能被正确终止。

**8. #13166 [Feature] 在新托管工作区配置中支持 Glob**
*   **内容**: 为 Hosted Workspace 添加只读文件发现能力，支持 `/2` 配置文件，并防止 Session Profile 冲突。

**9. #13406 [Security] 在权限处理前拒绝外部 Host 工具**
*   **内容**: 增强安全边界，违反原生限制的 Agent Host 工具在权限检查前即返回可恢复的拒绝，防止未授权访问。

**10. #12943 [UI] 自适应导航栏与统一 Live 设置**
*   **内容**: 改进 Web Shell UI，根据 Host 配置动态调整侧边栏宽度（Rail vs Column），优化布局体验。

## 5. 功能需求趋势

1.  **多代理并发与会话管理**: 这是目前最核心的讨论方向。社区极度关注并发会话数限制（如 8 个并发）、会话存储的稳定性、以及多会话在单一 Workspace 上的挂载与冲突处理。
2.  **跨平台与本地模型兼容性**: Windows 平台上的 MCP 连接和 Ollama 本地模型支持是高频反馈点，开发者希望 Qwen Code 在非 Linux 环境下能更稳定地工作。
3.  **Web Shell UI 体验**: 从 Issue #13396 和 PR #12943 可以看出，社区对 Web Shell 的界面布局、自适应能力以及内存面板的可视化提出了明确需求。
4.  **模型能力配置化**: Issue #13393 提议将推理努力等模型参数从硬编码迁移到 models.dev 目录，表明社区倾向于更灵活、可配置的模型管理。

## 6. 开发者关注点

*   **死锁与并发瓶颈**: #13333 和 #13374 涉及数据库锁、间隙锁等底层并发问题，是资深开发者正在攻坚的难点。
*   **CI/CD 稳定性**: 多个 Issue 提到 CI 测试不稳定（Flaky tests），特别是涉及 Java SDK 和 MySQL 环境的测试，影响了代码合并和发布。
*   **调试体验**: #13387 和 #13392 涉及自定义命令和 Hook 的行为不符合预期，开发者反馈在调试复杂交互逻辑时存在困难。
*   **文档与错误信息**: #13044 和 #13343 强调了文档修复的重要性，开发者希望错误信息和文档能更准确地反映系统行为。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑10‑05**  
（数据来源：GitHub 仓库 **Hmbown/DeepSeek‑TUI**）

---

## 1️⃣ 今日速览  
- 社区聚焦 **Engine 持久化与恢复** 机制的多条 Issue 与 PR，标志着底层执行框架正向“可恢复、可中断”方向快速迭代。  
- Windows 环境的 **UTF‑8 编码兼容** 与 **node.exe 进程异常终止** 两大痛点获得补丁或讨论，提升跨平台使用体验。  
- 代码库迎来 **0.10.1** 版的集成准备（Engine 收敛、Ratatui UI 调整），为后续正式发布奠定基础。

---

## 2️⃣ 版本发布  
> **（过去 24 h 无新 Release）**  
> *注：即将推出的 0.10.1 版已在 PR #6815 中完成主要功能集成，预计本周内发布。*

---

## 3️⃣ 社区热点 Issues（共 8 条，全部列出）  

| # | 标题 | 关键价值 | 社区反响 / 进展 | 链接 |
|---|------|----------|----------------|------|
| 6827 | **Windows (npm install)：kill node.exe 直接终止 Codewhale，缺失清理** | 关系到 Windows 用户的稳定性，防止进程异常导致资源泄漏。 | 仅 1 条评论，仍 **OPEN**，需要在退出钩子中加入安全清理。 | https://github.com/Hmbown/Codewhale/issues/6827 |
| 6838 | **Engine：从持久化意图与结果中恢复模型与工具步骤** | 为长时会话提供“断点续跑”能力，是持久化路线的核心需求。 | 新建未有讨论，标记 **needs‑triage**。 | https://github.com/Hmbown/Codewhale/issues/6838 |
| 6836 | **Engine durability：进程重启后恢复已接受的工作** | 让已提交的 Turn 在崩溃后不必重新执行，提高效率与可靠性。 | 与 #6838 同属持久化议题，仍 **OPEN**。 | https://github.com/Hmbown/Codewhale/issues/6836 |
| 6841 | **[documentation] Code Mode：子目录保留可组合权限并同步文档** | 文档同步是新手上手与高级用户协作的关键入口。 | 已创建但未有评论，等待文档维护者审阅。 | https://github.com/Hmbown/Codewhale/issues/6841 |
| 6840 | **Engine：持久化子任务完成交付与拥有者确认** | 解决子任务结果丢失或未被上层确认的情形，提升任务链的完整性。 | 新建，暂无反馈。 | https://github.com/Hmbown/Codewhale/issues/6840 |
| 6839 | **Engine：持久化人工等待与续期截止时间并提供显式重启策略** | 为需要人工干预的长流程提供可恢复的等待机制。 | 与持久化系列同属，仍待讨论。 | https://github.com/Hmbown/Codewhale/issues/6839 |
| 6837 | **Engine：原子提交执行检查点（含 transcript 与结果）** | 关键的事务性保障，防止半途失败导致状态不一致。 | 同上，待评审。 | https://github.com/Hmbown/Codewhale/issues/6837 |
| 6303 | **“一键安装”三入口统一（网站、插件、市集）** | 直接影响用户首次接触的门槛，涉及跨平台打包与分发。 | 最近一次更新 10‑04，仍 **OPEN**，已收到多位用户反馈安装不一致。 | https://github.com/Hmbown/Codewhale/issues/6303 |

**为何这些 Issue 重要**  
- **持久化/恢复**（#6836‑#6839、#6837、#6838）是本轮迭代的技术核心，决定 DeepSeek TUI 在生产环境下的可靠性。  
- **跨平台兼容**（#6827、#6834）直接关系到 Windows 与 macOS 用户的日常使用。  
- **用户入口统一**（#6303）是社区增长的关键，解决安装碎片化问题可以显著提升新手转化率。  
- **文档同步**（#6841）则是提升开发者体验的软实力。

---

## 4️⃣ 重要 PR 进展（共 6 条，全部列出）  

| # | 标题 | 功能/修复概述 | 影响范围 | 状态 | 链接 |
|---|------|--------------|----------|------|------|
| 6815 | **0.10.1 integration：Engine 收敛、TypeScript 改动、Ratatui UI** | 将 Rust Engine、TS 前端、Ratatui 交互统一，铺设 0.10.1 发行版基础。 | 核心执行、UI、插件生态 | **OPEN**（最近更新 10‑04） | https://github.com/Hmbown/Codewhale/pull/6815 |
| 6835 | **docs(web)：添加社区 VS Code GUI** | 在官网“Where you can use Codewhale”页面加入社区维护的 VS Code GUI 链接。 | 文档 & 社区可视化入口 | **CLOSED**（已合并） | https://github.com/Hmbown/Codewhale/pull/6835 |
| 6833 | **[contribution‑gate] fix(tui)：更新 12 种语言的帮助摘要（英文）** | 将超过 60 列的帮助文字改为单行展示，统一英文帮助风格；同步中文（简体/繁体）。 | TUI 命令帮助可读性 | **CLOSED** | https://github.com/Hmbown/Codewhale/pull/6833 |
| 6834 | **[contribution‑gate] fix(tui)：Windows 下保留 UTF‑8 Python 输出** | 在子进程启动时强制 `PYTHONIOENCODING=utf-8`，避免中文输出乱码；新增回归测试。 | 跨平台 Python 交互 | **CLOSED** | https://github.com/Hmbown/Codewhale/pull/6834 |
| 6832 | **refactor(commands)：采用可移植的 config 策略与状态形状（FEAT‑027）** | 重构 `/permissions`、`/status` 为共享 Shape，提升命令的可移植性与插件兼容性。 | 命令体系、插件开发 | **OPEN** | https://github.com/Hmbown/Codewhale/pull/6832 |
| 6805 | **[contribution‑gate] feat(plugins)：支持已审查的 OAuth AI 提供商** | 插件可声明兼容 OpenAI‑style 的 AI Provider 与 OAuth 客户端，统一模型目录与聊天流。 | 插件生态、AI 模型接入 | **OPEN** | https://github.com/Hmbown/Codewhale/pull/6805 |

**关键亮点**  
- **0.10.1** 的底层统一（#6815）是本月最重要的里程碑，涉及执行引擎、前端 TS 与终端 UI 的深度融合。  
- **跨平台编码**（#6834）直接解决了中文用户在 Windows 上的痛点。  
- **插件 OAuth 支持**（#6805）为第三方 AI 模型接入打开了标准化渠道，预示生态将进一步多元化。  
- 文档与帮助信息的细化（#6835、#6833）提升了新手上手体验。

---

## 5️⃣ 功能需求趋势（从所有 Issue 中提炼）  

| 趋势 | 具体表现 | 对产品路线的意义 |
|------|----------|-------------------|
| **执行持久化 & 可恢复** | 多条 Engine 相关 Issue（#6836‑#6839、#6837、#6838）聚焦 “restart‑policy、checkpoint、human‑wait” 等机制。 | 让 DeepSeek TUI 能在长时会话、异常崩溃后保持状态，是向企业级使用迈进的必备特性。 |
| **跨平台兼容性** | Windows 进程清理（#6827） 与 UTF‑8 编码（#6834）问题。 | 提升 Windows 用户的可靠性，降低平台差异导致的使用门槛。 |
| **统一安装体验** | Issue #6303 讨论三入口统一（Web、Marketplace、GitHub）。 | 改善新用户 onboarding，直接推动社区规模增长。 |
| **插件与外部 AI Provider 接入** | PR #6805 引入 OAuth AI Provider；Issue 中无直接需求但在 PR 中已出现。 | 为生态合作伙伴提供标准化入口，增强平台竞争力。 |
| **文档/可视化入口** | PR #6835、#6841 对文档与 GUI 链接的补充。 | 降低学习曲线，提升社区活跃度。 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）  

1. **进程异常与资源清理** – Windows 环境下 `node.exe` 被外部杀死导致 Codewhale 无法自行回收，需在底层加入 “守护进程/退出钩子”。  
2. **持久化机制缺失** – 多个 Issue 提出 “恢复已提交的 Turn、子任务、人工等待”等需求，表明当前 Engine 在进程崩溃后会丢失状态。  
3. **跨平台编码一致性** – 中文输出在 Windows 被错误解码，已通过 PR #6834 修复，显示编码兼容仍是常见痛点。  
4. **统一安装渠道** – 从网站、插件市场、源码三条路径的差异导致用户困惑，需要统一打包与签名流程。  
5. **文档与帮助信息可读性** – 帮助摘要过长、语言不统一导致 CLI 使用不友好，已在 PR #6833 中改进。  
6. **插件生态标准化** – 对 OAuth AI Provider 的需求表明开发者希望在插件层面快速接入多家大模型供应商，而不必自行实现协议。  

> **建议**：在下一个里程碑（0.10.1）中重点交付 **Engine 持久化层**、**Windows 退出清理** 与 **统一安装脚本**，并同步更新文档与帮助信息，以最大化当前社区热度并降低新手流失率。

--- 

*本日报基于公开 Issue/PR 数据撰写，后续若有新动态请关注官方仓库或社区渠道。*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*