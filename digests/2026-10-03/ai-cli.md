# AI CLI 工具社区动态日报 2026-10-03

> 生成时间: 2026-10-02 23:25 UTC | 覆盖工具: 9 个

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



# OpenAI Codex 社区动态日报 — 2026-10-03

---

## 1. 今日速览

过去24小时内，Codex Rust CLI 连续发布7个 alpha 版本（0.162.0-alpha.2 至 alpha.8），持续推进迭代。社区活跃焦点集中在 **Windows 多显示器适配、Computer Use 工具链异常、以及多账号认证需求** 三大方向，高票 Issue #4432 已累积130个点赞。

---

## 2. 版本发布

**Rust CLI v0.162.0 系列连续发布**：

| 版本 | 说明 |
|---|---|
| rust-v0.162.0-alpha.8 | 最新 alpha |
| rust-v0.162.0-alpha.7 | — |
| rust-v0.162.0-alpha.6 | — |
| rust-v0.162.0-alpha.5 | — |
| rust-v0.162.0-alpha.4 | — |
| rust-v0.162.0-alpha.3 | — |
| rust-v0.162.0-alpha.2 | — |

连续快速发布表明团队正处于 0.162.0 的密集打磨期，具体变更细节请参阅各 Release 页面。

- 各版本链接：`openai/codex/releases`

---

## 3. 社区热点 Issues

### 🔥 #4432 — First-class multi-account auth via `--auth-profile`
- **标签**: enhancement, auth | **评论**: 21 | **👍**: 130
- **重要性**: 多账号切换是 CLI 用户最强烈的需求，当前只能手动交换 `CODEX_HOME`，严重影响工作流。
- **社区反应**: 长期高票 Issues，点赞数遥遥领先，反映广泛共鸣。
- **链接**: https://github.com/openai/codex/issues/4432

### 🔥 #25826 — Windows 多显示器下最大化窗口溢出
- **标签**: bug, windows-os | **评论**: 47 | **👍**: 22 | **状态**: CLOSED
- **重要性**: 多显示器用户使用场景常见，溢出影响体验，现已修复关闭。
- **链接**: https://github.com/openai/codex/issues/25826

### 🔥 #49458 — dot-started 本地任务缺少 Computer Use 工具
- **标签**: bug, windows-os, computer-use | **评论**: 30 | **👍**: 14
- **重要性**: dot 启动的本地任务与常规会话工具能力不一致，属于核心功能断点，影响 Work 场景用户。
- **链接**: https://github.com/openai/codex/issues/49458

### 🔥 #49488 — Windows Computer Use 浏览器/桌面工具启动失败
- **标签**: bug, windows-os, mcp, computer-use | **评论**: 18 | **👍**: 6
- **重要性**: MCP 启动失败导致 Computer Use 功能完全不可用，且有持续性（durable）问题。
- **链接**: https://github.com/openai/codex/issues/49488

### 🔥 #49731 — WSL 模式下命令执行失败："No such file or directory"
- **标签**: bug, windows-os, tool-calls | **评论**: 17 | **👍**: 9
- **重要性**: WSL 集成是 Windows 用户核心场景，exec helper 目录被意外删除导致所有命令失败。
- **链接**: https://github.com/openai/codex/issues/49731

### 🔥 #50118 — VS Code 扩展消息排队异常，thread 状态卡在 Streaming
- **标签**: bug, extension, session | **评论**: 11 | **👍**: 6
- **重要性**: 影响 VS Code 扩展的核心交互链路，用户消息无法正常响应。
- **链接**: https://github.com/openai/codex/issues/50118

### 🔥 #49834 — VS Code 扩展 fetch 响应为 undefined，JSON 解析失败
- **标签**: bug, extension | **评论**: 16 | **👍**: 2
- **重要性**: 与 #50118、#50403 属于同一类连接层问题，暗示扩展层存在系统性隐患。
- **链接**: https://github.com/openai/codex/issues/49834

### 🔥 #35446 — Windows 10 Computer Use 截图在 FrameArrived 死锁
- **标签**: bug, windows-os, computer-use | **评论**: 14 | **👍**: 0
- **重要性**: Windows 10 用户的 Computer Use 功能完全不可用，涉及底层截图机制。
- **链接**: https://github.com/openai/codex/issues/35446

### 🔥 #49383 — Windows Computer Use 截图超时失败
- **标签**: bug, windows-os, computer-use | **评论**: 15 | **👍**: 0
- **重要性**: 与 #35446 同类问题，Computer Use 在 Windows 上的截图能力系统性脆弱。
- **链接**: https://github.com/openai/codex/issues/49383

### 🔥 #37153 — Windows 桌面端工作时会闪现命令行窗口
- **标签**: bug, windows-os | **评论**: 10 | **👍**: 6
- **重要性**: 视觉干扰强，且可能引发用户安全疑虑（看起来像未授权活动）。
- **链接**: https://github.com/openai/codex/issues/37153

---

## 4. 重要 PR 进展

| PR | 状态 | 摘要 |
|---|---|---|
| [#50458](https://github.com/openai/codex/pull/50458) | CLOSED | 截断分页历史中过大的 MCP 结果，限制为 64 KiB 预览预算，避免持久化多 MB 负载 |
| [#50446](https://github.com/openai/codex/pull/50446) | CLOSED | 将 rollout 附件打包为 gzip tar 归档，控制上传大小 |
| [#50427](https://github.com/openai/codex/pull/50427) | CLOSED | 分页历史中命令输出上限 64 KiB，防止历史膨胀 |
| [#50447](https://github.com/openai/codex/pull/50447) | CLOSED | 移除工具命名空间的 provider capability gate，简化工具注册机制 |
| [#50406](https://github.com/openai/codex/pull/50406) | CLOSED | 将 0.159.3 的修复 cherry-pick 到 0.159.0-alpha 热修分支，保留 PowerShell 兼容 |
| [#50454](https://github.com/openai/codex/pull/50454) | CLOSED | 测量 rollout 持久化体积缩减效果，新增遥测指标 |
| [#50437](https://github.com/openai/codex/pull/50437) | CLOSED | 新增 `codex sandbox uninstall` CLI 命令，清理遗留 Windows 沙箱账户和网络规则 |
| [#50418](https://github.com/openai/codex/pull/50418) | CLOSED | 在 Responses 事件失败时遵守 `Retry-After` 响应头，避免与限流消息冲突 |
| [#50434](https://github.com/openai/codex/pull/50434) | CLOSED | TUI 转录中增加键盘复制选择，支持 `j`/`k`/`g`/`G` 导航 |
| [#50402](https://github.com/openai/codex/pull/50402) | CLOSED | 将命令执行的 `stdout`/`stderr` 合并到统一的 `aggregated_output` 字段，简化数据模型 |

---

## 5. 功能需求趋势

基于 Issues 分析，社区当前最关注的方向：

1. **多账号/多租户支持** — Issue #4432（130👍）、#31778 持续高票，CLI 和桌面端均需原生支持多账号切换。
2. **Windows 平台稳定性** — 约 **60%** 的热度 Issue 集中在 Windows，涉及多显示器、WSL、Computer Use 截图、沙箱等多个子系统。
3. **Computer Use 工具链可靠性** — 多个独立 Issue 指向 Windows 上 Computer Use 的截图、浏览器、桌面控制等能力不稳定。
4. **VS Code 扩展连接稳定性** — 消息排队、JSON 解析失败、Thinking 无限挂起等问题形成系列 bug cluster。
5. **持久化与性能优化** — PR 层面正在推进 MCP 结果截断、rollout 归档压缩、历史大小控制，说明团队在回应存储膨胀问题。

---

## 6. 开发者关注点

- **Windows 是最大痛点区域**：多显示器窗口溢出、Computer Use 截图死锁/超时、WSL 命令执行失败、沙箱升级 ACL 锁定、PowerShell 兼容性等问题高度集中，建议优先关注 Windows 端的回归测试覆盖。
- **扩展层连接问题有系统性特征**：#49834、#50118、#50403、#50404 均涉及消息发送锁和 JSON 解析异常，可能指向同一底层竞态或序列化 bug。
- **多账号需求长期未满足**：#4432 自2025年9月开启，至今仍是最高票 enhancement，CLI 用户对此期待极高。
- **dot/Cloud 场景出现协调故障**：#49682、#50077、#50388 反映 dot 云电脑的文件持久化和任务协调存在间歇性问题，需关注云-端状态同步机制。
- **速率限制重置存在延迟反馈**：#50451 报告付费账户在官方宣布重置后仍未收到限额刷新，运营透明度有待改善。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报
**日期：2026-10-03** | 数据来源：github.com/google-gemini/gemini-cli

---

## 1. 今日速览

Gemini CLI 发布 v0.64.0-nightly，核心修复了 `ChatRecordingService` 的追加只写与有界历史窗口机制，以及 CLI 状态的原子持久化与损坏恢复能力。社区方面，子代理（subagent）行为的稳定性问题持续成为关注焦点，包括达到最大轮次后错误报告成功状态、一般代理挂起、以及 Wayland 环境下浏览器代理失败等多个 P1 级 Bug。

---

## 2. 版本发布

### v0.64.0-nightly.20261002.gc9096a847

| 修复项 | 说明 | PR |
|--------|------|-----|
| `ChatRecordingService` 核心修复 | 实现追加只写 delta patching 与有界历史窗口机制，防止历史记录无限增长 | [#29568](https://github.com/google-gemini/gemini-cli/pull/29568) |
| CLI 状态持久化 | 支持原子写入状态并在损坏时从备份恢复 | [#29568](https://github.com/google-gemini/gemini-cli/pull/29568) |

---

## 3. 社区热点 Issues

### 🔥 P1 级 Bug（高优先级）

**1. Subagent 达到 MAX_TURNS 后错误报告 GOAL 成功 [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)**
- **作者**: matei-anghel | 评论: 13 | 👍: 2 | 更新于 2026-10-02
- **摘要**: `codebase_investigator` 子代理在达到最大轮次限制前未完成分析，却报告 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了实际中断情况。
- **关注度**: 高，影响子代理可靠性评估

**2. Generalist Agent 永久挂起 [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)**
- **作者**: turmanticant | 评论: 8 | 👍: 8 | 更新于 2026-10-02
- **摘要**: 调用 generalist agent 时永远挂起，简单操作如文件夹创建也会触发，等待超1小时后需手动取消。
- **关注度**: 高，用户主动放弃使用 subagent 作为临时解决方案

**3. Browser Agent 忽略 settings.json 配置覆盖 [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)**
- **作者**: hsm207 | 评论: 4 | 更新于 2026-10-02
- **摘要**: Browser Agent 完全忽略全局或项目级 `settings.json` 中的配置覆盖（如 `maxTurns`），尽管 `AgentRegistry` 正确读取了设置。
- **关注度**: 影响配置管理的可预测性

**4. Wayland 环境下浏览器子代理失败 [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)**
- **作者**: sigmaSd | 评论: 4 | 👍: 1 | 更新于 2026-10-02
- **摘要**: 在 Wayland 显示服务器上，browser subagent 执行失败，终止原因为 GOAL。
- **关注度**: Linux Wayland 用户的关键兼容性问题

**5. 工具数量超过 128 时触发 400 错误 [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)**
- **作者**: gundermanc | 评论: 3 | 更新于 2026-10-02
- **摘要**: 当可用工具超过 400 个时，Gemini CLI 遇到 400 错误，期望 agent 更智能地限制工具范围。
- **关注度**: 影响扩展性，大量自定义 skill 场景下必然触发

### 🛠 功能与增强

**6. 利用模型的 Bash 亲和力：零依赖 OS 沙箱与执行后意图路由 [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)**
- **作者**: abhipatel12 | 评论: 9 | 更新于 2026-10-02
- **摘要**: Gemini 3 模型训练为原生 bash 操作者，提案通过零依赖沙箱和利用 POSIX 工具链来发挥模型原生能力，同时保障安全。
- **关注度**: 大型增强提案，涉及架构层面改进

**7. AST 感知文件读取、搜索与代码库映射评估 [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)**
- **作者**: gundermanc | 评论: 7 | 更新于 2026-10-02
- **摘要**: 评估 AST 感知工具的价值：更精确读取方法边界、减少轮次、降低 token 噪音、导航代码库。
- **关注度**: 性能与成本优化方向，追踪中

**8. 浏览器代理会话接管与锁恢复增强 [#22232](https://github.com/google-gemini/gemini-cli/issues/22232)**
- **作者**: hsm207 | 评论: 4 | 更新于 2026-10-02
- **摘要**: 当前 `BrowserManager` 在遇到锁定的浏览器配置文件时采用"快速失败"策略，提案增加自动会话接管能力。
- **关注度**: 提升 persistent session 模式的健壮性

**9. 通过 `/chat share` 展示子代理轨迹 [#22598](https://github.com/google-gemini/gemini-cli/issues/22598)**
- **作者**: abhipatel12 | 评论: 2 | 👍: 1 | 更新于 2026-10-02
- **摘要**: 子代理轨迹已通过 chat recording service 保存，但难以访问，需通过 `/chat share` 更易查看和分享。
- **关注度**: 调试和评估便利性

**10. 替代 WriteToDo：基于持久化文件的任务追踪 (CRUD) [#18836](https://github.com/google-gemini/gemini-cli/issues/18836)**
- **作者**: anj-s | 评论: 2 | 更新于 2026-10-02
- **摘要**: 当前 `WriteToDo` 依赖上下文内任务追踪，存在"上下文腐烂"、高 token 成本和跨会话记忆丢失问题，提案用持久化文件 CRUD 替代。
- **关注度**: 长期存在的架构改进需求

---

## 4. 重要 PR 进展

| PR | 标题 | 优先级 | 面积 | 说明 |
|----|------|--------|------|------|
| [#29618](https://github.com/google-gemini/gemini-cli/pull/29618) | 修复会话恢复时重复 tool response turn | P1 | core | 解决 `convertSessionToClientHistory` 在恢复记录会话时重复反序列化 `functionResponse` turn 的问题 |
| [#29616](https://github.com/google-gemini/gemini-cli/pull/29616) | OAuth 回调 iss 参数验证对齐 RFC 9207 | P1 | security | 与 [RFC 9207](https://www.rfc-editor.org/rfc/rfc9207) 及 MCP 授权规范对齐 |
| [#29617](https://github.com/google-gemini/gemini-cli/pull/29617) | 跳过 `@<directory>` 的递归文件读取 | P1 | cli | 目录引用解析为相对工作区路径，不再 eager 展开为递归 `**/*` |
| [#29582](https://github.com/google-gemini/gemini-cli/pull/29582) | 优化忽略过滤与子树剪枝 | P1 | core | 引入分层目录级状态缓存、通配符目录模式扩展及内存符号链接缓存，解决大型仓库多秒阻塞 |
| [#29546](https://github.com/google-gemini/gemini-cli/pull/29546) | 非交互模式支持 `/skill-name` 激活 skill | P2 | agent | 在 non-interactive slash command 路径注册 `SkillCommandLoader`，修复未处理 tool 结果类型导致的崩溃 |
| [#29457](https://github.com/google-gemini/gemini-cli/pull/29457) | 用 glob 匹配替换模糊子串逻辑 | P1 | core | 修复 `read-many-files` 中二进制文件被误判为"显式请求"的 context bloat bug (#29045) |
| [#29612](https://github.com/google-gemini/gemini-cli/pull/29612) | 强制终端用户 turn 不变量 | P1 | agent | 确保发给 Gemini API 的对话历史始终以包含非空 content parts 的有效用户 turn 结尾 |
| [#29584](https://github.com/google-gemini/gemini-cli/pull/29584) | 防止快速退出时删除恢复的会话历史 | P1 | core | 修复 critical data-loss bug：恢复会话后快速退出（Ctrl+C 或 /exit）会永久删除历史文件 |
| [#29611](https://github.com/google-gemini/gemini-cli/pull/29611) | 支持点分 Gemini 3 模型的 multimodal 函数响应 | - | core | 解决 `gemini-3.8-flash` 等模型将 multimodal 工具输出（如图片）作为无效 sibling parts  emitted 的问题 |
| [#29608](https://github.com/google-gemini/gemini-cli/pull/29608) | Web 搜索 30 秒超时 | P1 | agent | 修复 `GoogleSearch`/`WebFetch` 工具因底层 LLM 调用永不 settled 导致 agent 永久卡在 `Thinking...` 状态的问题 |

---

## 5. 功能需求趋势

1. **子代理系统稳定性** — 高频 Bug 集中在 subagent 生命周期管理（MAX_TURNS 处理、挂起恢复、轨迹可见性），是社区最迫切的改进方向。

2. **性能与 token 效率** — AST 感知工具、忽略过滤优化、子树剪枝、上下文精简（避免 large file read 导致的 context bloat）持续受到关注。

3. **安全与沙箱** — gVisor/runsc 沙箱的 IPC 回退、零依赖 OS 沙箱提案、OAuth RFC 9207 对齐，反映用户对安全隔离的深入需求。

4. **跨平台兼容性** — Wayland 浏览器代理失败、Windows IDE 终端键盘协议问题，推动多平台适配投入。

5. **持久化与状态管理** — 会话恢复数据丢失、任务追踪从上下文转向持久化文件，显示用户对数据可靠性的重视。

---

## 6. 开发者关注点

| 痛点 | 涉及 Issue/PR | 说明 |
|------|---------------|------|
| **子代理行为不可预测** | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | 子代理达到上限后误报成功、generalist agent 挂起、不主动使用 skills/subagent，影响多代理工作流的可靠性 |
| **会话恢复数据丢失** | [#29584](https://github.com/google-gemini/gemini-cli/pull/29584) | 恢复会话后快速退出会永久删除历史，是严重的数据风险 |
| **浏览器代理平台兼容** | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267), [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Wayland 失败、配置覆盖被忽略、锁处理策略过于激进 |
| **工具/上下文膨胀** | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246), [#29457](https://github.com/google-gemini/gemini-cli/pull/29457) | 超过 128 工具触发 400 错误；二进制文件误判导致 context bloat |
| **Web 搜索无超时保护** | [#29608](https://github.com/google-gemini/gemini-cli/pull/29608) | LLM 调用永不返回时 agent 永久卡在 Thinking 状态，用户只能手动 Esc |

---

*日报生成时间：2026-10-03 | 分析模型：Agnes-2.0-Flash (Sapiens AI)*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期**: 2026-10-03  
**分析师**: AI 开发工具技术分析师  
**仓库**: github/github/copilot-cli

---

## 1. 今日速览

今日 GitHub Copilot CLI 发布了 **v1.0.92-3** 版本，主要修复了交互响应性、沙盒命令代理绕过以及 Windows 临时文件处理等关键问题。社区活跃度较高，共有 35 个 Issues 更新，主要集中在 MCP（模型上下文协议）服务器连接、BYOK（自带密钥）配置兼容性以及 Agent 行为优化等方面。

---

## 2. 版本发布

### v1.0.92-3 (2026-10-03)
**新增**
- **环境切换功能**: 增加了一个 `Ctrl+E` 环境选择器，允许用户在本地运行和云端运行之间快速切换。

**修复**
- **交互响应性**: 修复了键盘、粘贴和鼠标输入在快速交互时可能出现的乱序或无响应问题。
- **沙盒网络绕过**: 当代理阻止目标地址时，沙盒 shell 命令现在会提示用户是否绕过网络限制。

---

## 3. 社区热点 Issues

以下为过去 24 小时内更新且评论数最高的 10 个 Issue：

**1. [OPEN] disable-model-invocation: true 使技能不可达 (#4438)**
- **热度**: 12 👍 / 11 评论
- **重要性**: 核心功能缺陷。配置了 `disable-model-invocation: true` 的项目技能在 CLI 中无法被显式调用，虽然列表中显示存在，但模型工具返回 "Skill not found"。
- **链接**: [github/copilot-cli Issue #4438](https://github.com/github/copilot-cli/issues/4438)

**2. [CLOSED] Workspace .mcp.json 在 CLI 1.0.83 中从未加载 (#4832)**
- **热度**: 0 👍 / 4 评论
- **重要性**: MCP 配置加载失败。用户报告 `.mcp.json` 被忽略，导致 `copilot mcp list` 无法显示 Workspace 组，且相关服务器无法启动。
- **链接**: [github/copilot-cli Issue #4832](https://github.com/github/copilot-cli/issues/4832)

**3. [CLOSED] 奇怪的 "Somebody else is owning the clipboard" 消息 (#3172)**
- **热度**: 13 👍 / 4 评论
- **重要性**: 终端渲染与剪贴板同步问题。在右键复制后，状态栏会出现奇怪的剪贴板所有权提示并破坏布局，影响用户体验。
- **链接**: [github/copilot-cli Issue #3172](https://github.com/github/copilot-cli/issues/3172)

**4. [OPEN] BYOK Copilot CLI 不再支持 Deepseek (#4840)**
- **热度**: 1 👍 / 3 评论
- **重要性**: BYOK 配置兼容性。使用 Deepseek 时出现 400 错误，提示 `tools[4].type: unknownvariant 'custom'`，表明模型协议解析出现了变化。
- **链接**: [github/copilot-cli Issue #4840](https://github.com/github/copilot-cli/issues/4840)

**5. [CLOSED] BYOK 配置中 reasoning effort 不支持 "glm-5.2:cloud" (#4012)**
- **热度**: 23 👍 / 3 评论
- **重要性**: 参数传递 Bug。在 BYOK 配置中传递 `--reasoning-effort max` 时被错误拒绝，尽管模型配置本身是有效的。
- **链接**: [github/copilot-cli Issue #4012](https://github.com/github/copilot-cli/issues/4012)

**6. [CLOSED] 空输入 Schema 破坏 Copilot CLI (#1825)**
- **热度**: 10 👍 / 3 评论
- **重要性**: 工具定义 Bug。MCP 工具若使用空 JSON Schema 作为输入参数，会导致 CLI 在任何提示下都拒绝工具调用。
- **链接**: [github/copilot-cli Issue #1825](https://github.com/github/copilot-cli/issues/1825)

**7. [OPEN] GitHub Mobile 保持 "Queued for Copilot" (#4569)**
- **热度**: 0 👍 / 2 评论
- **重要性**: 跨端同步问题。远程 CLI 已响应，但 GitHub Mobile 端仍显示排队状态，无法刷新会话。
- **链接**: [github/copilot-cli Issue #4569](https://github.com/github/copilot-cli/issues/4569)

**8. [OPEN] allowed_directories 不抑制路径警告 (#4482)**
- **热度**: 0 👍 / 2 评论
- **重要性**: 权限配置失效。在 `permissions-config.json` 中声明了 `allowed_directories`，但 shell 命令仍会提示路径不在允许列表中。
- **链接**: [github/copilot-cli Issue #4482](https://github.com/github/copilot-cli/issues/4482)

**9. [CLOSED] 允许对工具权限进行白名单 shell 命令模式 (#3032)**
- **热度**: 2 👍 / 2 评论
- **重要性**: 权限管理优化。用户希望对特定命令模式进行预批准，而不仅仅是使用 `/allow-all`。
- **链接**: [github/copilot-cli Issue #3032](https://github.com/github/copilot-cli/issues/3032)

**10. [OPEN] MCP 重载后复用启动时的配置 (#5034)**
- **热度**: 0 👍 / 1 评论
- **重要性**: MCP 热重载 Bug。`.github/mcp.json` 修改后，重新加载 MCP 服务器仍使用旧配置，导致初始化失败。
- **链接**: [github/copilot-cli Issue #5034](https://github.com/github/copilot-cli/issues/5034)

---

## 4. 重要 PR 进展

*注：过去 24 小时内暂无新的 Pull Request 更新。*

---

## 5. 功能需求趋势

从今日更新的 Issues 中，可以提炼出以下社区关注的功能方向：

1.  **MCP (Model Context Protocol) 服务器集成与稳定性**:
    *   MCP 配置加载、重载、Token 缓存以及与 Figma 等远程服务器的连接问题频繁出现。
    *   **趋势**: 社区正在深度探索 MCP 的生态，并希望 CLI 在服务器断连、配置变更时具有更好的容错和热更新能力。

2.  **Agent 与技能系统 (Agents & Skills)**:
    *   `disable-model-invocation` 配置导致的技能不可达是一个严重 Bug。
    *   **趋势**: 用户对 Agent 的精细控制（如是否允许模型调用技能、任务完成后的总结行为）需求增加。

3.  **BYOK (Bring Your Own Key) 配置灵活性**:
    *   Deepseek 等新模型支持以及 reasoning effort 参数的支持问题。
    *   **趋势**: 企业用户希望自定义模型配置更加灵活，能够支持更广泛的模型供应商和参数调整。

4.  **交互体验与终端渲染**:
    *   剪贴板冲突、分页器键盘导航、图像粘贴丢失等问题。
    *   **趋势**: 开发者越来越关注 CLI 的交互细节，特别是当使用 Vim 风格或非鼠标操作时的体验。

---

## 6. 开发者关注点

1.  **沙盒与网络权限**: 开发者在使用沙盒命令时，频繁遇到代理拦截或网络访问受限的问题，需要更明确的提示和绕过机制。
2.  **跨设备同步**: GitHub Mobile 与 CLI 的会话同步存在延迟或状态不同步的问题。
3.  **工具定义规范**: MCP 工具的 JSON Schema 定义（特别是空 Schema）需要更严格的校验，以避免 CLI 崩溃。
4.  **Commit 签名与 Co-authorship**: Agent 生成的 Commit 信息格式偶发错误（如 `Copilot-Session` 字段位置不当），影响 Git 历史。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-10-03  
**来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
过去24小时内，**OpenCode 社区活跃度较高**，共处理了 50 条 Issues 和 50 条 Pull Requests。核心开发者在 **Nix 构建系统**和 **TypeScript 代码质量检查**上取得了显著进展，修复了多个阻碍 v2 版本发布的构建缺陷。同时，关于 **CLI 工具稳定性**（如 `Esc` 中断、Shell 状态管理）和 **Prompt Cache 性能**的反馈持续受到关注。

---

## 2. 版本发布
**暂无新版本发布**。

---

## 3. 社区热点 Issues

以下是过去24小时内评论数较高且具有重要意义的 Issue：

1.  **[PAYMENT] 订阅支付被拒** (Issue #45278)
    *   **重要性**: 影响用户续费的核心体验。
    *   **摘要**: 用户反映现有支付方式在续费时突然被拒，尽管卡片和银行均无异常。这可能与 OpenCode 的计费系统或第三方网关有关。

2.  **[FEATURE] 新增 Qwen3.8-27B 模型支持** (Issue #42729)
    *   **重要性**: 满足社区对开源大模型接入的强烈需求。
    *   **摘要**: 用户请求将 Qwen3.8-27B 开源权重模型添加到 OpenCode Go 订阅目录中。

3.  **[BUG] V2 环境中断失效** (Issue #42960)
    *   **重要性**: 影响交互式工作流的稳定性。
    *   **摘要**: 在 CLI 中使用 `Esc` 中断后重启会话，发现之前的任务仍在后台运行，导致状态混乱。

4.  **[BUG] Prompt Cache 读取失败** (Issue #51993)
    *   **重要性**: 涉及成本优化和推理性能。
    *   **摘要**: 在 `deepseek-v4.1-flash` 模型中，新增图片时 Prompt Cache 仅缓存到第一张图，后续图片未命中缓存导致重复计算。

5.  **[BUG] SQLite 数据库满错误导致工具卡死** (Issue #52796)
    *   **重要性**: 阻断核心功能的关键 Bug。
    *   **摘要**: 当本地工具写入数据库失败（如磁盘满）时，系统未正确处理错误，导致后续请求发送无结果的 `tool_use`，被 Anthropic 拒绝。

6.  **[FEATURE] 命名工具执行前的确定性控制** (Issue #52837)
    *   **重要性**: 提升工具调用的可控性。
    *   **摘要**: 请求在 `tool.execute.before` 钩子中增加 `skip` 字段，允许开发者决定是否跳过某些工具的执行。

7.  **[BUG] Shell 工具状态异常** (Issue #50424)
    *   **重要性**: 影响自动化任务的可靠性。
    *   **摘要**: 某些快速退出且无后代进程的 Shell 命令会导致工具状态永久卡在 `running`。

8.  **[BUG] Claude 思考块无法修改** (Issue #52628)
    *   **重要性**: 影响长上下文模型的连续性。
    *   **摘要**: 在会话压缩后，Claude 的 `thinking` 块被截断，导致后续请求无法继续修改该块而报错。

9.  **[BUG] 桌面环境面板缺失** (Issue #48252)
    *   **重要性**: 影响桌面端用户体验。
    *   **摘要**: 用户无法在 Desktop 界面直观查看当前加载的 Skills、Plugins 和上下文成本，仍需阅读配置文件。

10. **[FEATURE] 尊重提供商报告的成本** (Issue #43818)
    *   **重要性**: 提升计费透明度。
    *   **摘要**: 目前 OpenCode 仅支持硬编码的计费方式，请求支持从 LLM 网关（如 OpenRouter）读取提供商报告的真实成本数据。

---

## 4. 重要 PR 进展

1.  **[PR #52868] feat(gui-extensions): 添加类型化组合与生命周期原语**
    *   **内容**: 在 Effect 运行时之外实现扩展系统的类型安全组合，检查依赖冲突和窗口 IPC，允许并行激活扩展。

2.  **[PR #52869] feat(tui): 让 /tui/select-session 锁定单个 TUI**
    *   **内容**: 修复会话选择功能，允许用户专注于控制特定打开的 TUI 实例，而非切换目录作用域。

3.  **[PR #52866] fix(ai): 修复原生流在分帧事件下的停滞问题**
    *   **内容**: 修复 AI SDK 的原生 HTTP 传输在处理分帧事件时的停滞 bug，关联了多个相关的 Issue。

4.  **[PR #52865] fix(cli): 更新 Scoop 的 opencode2 安装路径检测**
    *   **内容**: 改进在 Windows Scoop 环境下的版本检测和更新逻辑，避免混淆 V1 和 V2。

5.  **[PR #52861] fix(acp): 传递 API 错误的提供商状态和响应头**
    *   **内容**: 改进 API 错误在 ACP 客户端中的传递，不再仅返回 `-32603` 服务错误码，而是包含更详细的 `service` 和 `errorName`。

6.  **[PR #52143] chore(nix): 在 v2 分支运行 nix eval 工作流**
    *   **内容**: 修复 Nix 构建系统的关键缺陷，确保 v2 分支的 Flake 能被正确评估，防止构建缺陷被合并。

7.  **[PR #52129] fix(nix): 移除 x86_64-darwin 目标并解除 nixpkgs 26.11 阻塞**
    *   **内容**: 移除已被 nixpkgs 26.11 废弃的 macOS 架构支持，解决构建哈希失效问题。

8.  **[PR #52858] chore(ai/core): 启用 noUnusedLocals 检查**
    *   **内容**: 强制启用 TypeScript 的未使用局部变量检查，清理了 `ai` 和 `core` 包中的冗余代码。

9.  **[PR #52850] chore: 启用多个包的 noUnusedLocals**
    *   **内容**: 对 `schema`, `server`, `sdk` 等包进行了代码清理，移除了未被引用的导入和变量。

10. **[PR #51891] fix(nix): 修复 v2 分支的三个打包缺陷**
    *   **内容**: 修复了 `opencode.nix` 调用已移除的子命令、Nix 构建路径解析错误等导致构建失败的问题。

---

## 5. 功能需求趋势

从 Issues 数据分析，社区关注点主要集中在以下三个方向：

1.  **新模型接入与生态支持**: 高频出现对 **Qwen (千问)** 等开源模型的支持请求，以及 **CommandCode** 等第三方服务的集成需求。
2.  **成本控制与性能优化**: 对 **Prompt Cache**（提示词缓存）在多模态场景下的失效问题反馈强烈，同时呼吁系统支持 **Provider 报告的真实成本**，以实现更精确的预算管理。
3.  **桌面端体验增强**: 多个反馈指出桌面环境缺乏可视化的配置管理面板，用户希望在不修改 JSON 文件的情况下了解当前加载的插件和上下文状态。

---

## 6. 开发者关注点

1.  **CLI 稳定性**: `Esc` 中断功能失效、Shell 进程状态管理异常是高频 Bug，严重影响开发者的日常交互体验。
2.  **数据库与存储**: **SQLite 错误处理**（如磁盘满）未能正确传递给模型，导致会话中断，是潜在的严重稳定性隐患。
3.  **构建与发布流程**: 开发者（特别是维护者）非常关注 **Nix 构建系统**的完善，确保 v2 版本能顺利打包并避免构建缺陷合并到主干。
4.  **代码质量**: 社区贡献者正在积极推动在所有包中启用 `noUnusedLocals`，这表明项目正在向更严格的代码规范迈进。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-10-03)

**数据来源**: [github.com/badlogic/pi-mono](https://github.com/earendil-works/pi)

---

## 1. 今日速览

Pi 社区在 2026-10-03 的活跃度极高，共处理了 50 个 Issues 和 19 个 PR。最显著的趋势是 **Pi 1.0.0 版本升级引发的兼容性问题**（特别是 `pi-agent-core` 导出结构变更导致子代理崩溃）以及 **大量针对 TUI 性能和渲染的修复**。同时，社区对 **Windows 平台的支持** 和 **Azure Foundry 的接入** 表现出浓厚兴趣。

---

## 2. 版本发布

**无**：过去 24 小时内无新 Release。

---

## 3. 社区热点 Issues

**1. [Windows] How do you use Pi on windows?** (#7547)
*   **重要性**: 🔥 **最高热度**。这是 Pi 在 Windows 平台上的核心讨论帖，获得 72 个评论。
*   **社区反应**: 用户反馈 Windows 上 Pi 的运行方式过于碎片化，不知道该优先修复哪类 Bug 或完善文档。这反映了 Windows 用户群体的巨大潜力与当前体验之间的落差。
*   **链接**: [Issue #7547](https://github.com/earendil-works/pi/issues/7547)

**2. [bug] High CPU usage on Mac OS with long session** (#7730)
*   **重要性**: ⚠️ **性能痛点**。涉及 Mac 用户在长会话下 CPU 占用飙升至 100% 的问题。
*   **社区反应**: 提到可能与上下文大小或会话长度有关，影响了长时间使用的稳定性。
*   **链接**: [Issue #7730](https://github.com/earendil-works/pi/issues/7730)

**3. [bug] CMD mode ignores outputPad setting** (#9946)
*   **重要性**: ⚠️ **配置一致性问题**。CMD 模式下的输出格式设置未被正确应用。
*   **社区反应**: 用户在设置 `outputPad: 0` 后仍看到行首空格，而普通 Chat 消息则遵循设置。
*   **链接**: [Issue #9946](https://github.com/earendil-works/pi/issues/9946)

**4. [bug] ChatGPT OAuth Error 400 when signing in** (#10258)
*   **重要性**: 🔐 **认证故障**。新增 OpenAI Provider 时出现 `invalid_grant` 错误。
*   **社区反应**: 该问题影响用户登录，且某些旧版提供商（如 open-codex）未受影响，推测为特定版本或环境问题。
*   **链接**: [Issue #10258](https://github.com/earendil-works/pi/issues/10258)

**5. [bug] 0.99.x: terminal color query replies leak into prompt** (#10256)
*   **重要性**: 🐛 **UI 渲染 Bug**。Windows 终端环境下，颜色查询代码泄漏到提示词中，并意外触发外部编辑器。
*   **社区反应**: 用户指出 0.87.1 版本正常，0.99.x 受影响，且特定终端（mintty）表现明显。
*   **链接**: [Issue #10256](https://github.com/earendil-works/pi/issues/10256)

**6. [bug] TuiMainScreen: full-screen redraw storm** (#9255)
*   **重要性**: 🐛 **长会话渲染卡顿**。长对话记录导致全屏重绘风暴，出现文字跳动或加倍显示。
*   **社区反应**: 开发者提到当思考尾部超出视口时，每一帧都会触发全量重绘。
*   **链接**: [Issue #9255](https://github.com/earendil-works/pi/issues/9255)

**7. [bug] Too many input images stop the agent task** (#10162)
*   **重要性**: 🛠️ **Agent 稳定性**。当输入图片过多时，自动代理任务会中断。
*   **社区反应**: 代理通常能长时间运行，但图片输入似乎触发了某种资源限制或处理逻辑错误。
*   **链接**: [Issue #10162](https://github.com/earendil-works/pi/issues/10162)

**8. [bug] Prompt text contributed in before_agent_start is dropped** (#10267)
*   **重要性**: 🔌 **扩展 API**。扩展在 `before_agent_start` 中注入的提示词在某些场景（如后台任务、重试）下丢失。
*   **社区反应**: 这可能导致扩展注入的系统指令在特定执行路径下失效。
*   **链接**: [Issue #10267](https://github.com/earendil-works/pi/issues/10267)

**9. [bug] Extensions: console output writes over the interactive TUI** (#10002)
*   **重要性**: 🛠️ **扩展交互冲突**。扩展的 `console.error` 输出会覆盖 Pi 的 TUI 渲染层。
*   **社区反应**: 这会导致屏幕视觉混乱，直到触发重绘。
*   **链接**: [Issue #10002](https://github.com/earendil-works/pi/issues/10002)

**10. [bug] Pi 1.0.0 Upgrade drops ./node export** (#10360)
*   **重要性**: ⚠️ **破坏性变更**。升级到 1.0.0 后，`pi-agent-core` 的子路径导出（如 `./node`）丢失，导致子代理运行失败。
*   **社区反应**: 这是一个严重的兼容性问题，阻碍了现有扩展和脚本的迁移。
*   **链接**: [Issue #10360](https://github.com/earendil-works/pi/issues/10360)

---

## 4. 重要 PR 进展

**1. perf(tui): diff raw lines so unchanged lines keep pointer equality** (#10383)
*   **内容**: 优化 TUI 渲染性能。通过保持未改变行的指针相等性，避免了全缓冲字符串比较，大幅提升长会话的滚动和输入响应速度。
*   **链接**: [PR #10383](https://github.com/earendil-works/pi/pull/10383)

**2. feat(coding-agent): use llama.cpp classifier models natively** (#10382)
*   **内容**: 为编码代理添加对 llama.cpp 分类模型的原生支持。决策模型将作为 System One 分类器列出，优化模型识别流程。
*   **链接**: [PR #10382](https://github.com/earendil-works/pi/pull/10382)

**3. feat(ai): support Azure Foundry Chat Completions deployments** (#9714)
*   **内容**: 扩展 Azure 提供商支持，使其兼容 Foundry 部署（如 DeepSeek V4 Pro），此前该部署仅支持 Responses API。
*   **链接**: [PR #9714](https://github.com/earendil-works/pi/pull/9714)

**4. fix(coding-agent): preserve multiline syntax highlighting** (#10361)
*   **内容**: 修复多行语法高亮丢失的问题。确保分割后的每一行都能正确应用 ANSI 样式。
*   **链接**: [PR #10361](https://github.com/earendil-works/pi/pull/10361)

**5. feat(cpp): add Bazel build foundation** (#10372)
*   **内容**: 为 C++ 核心骨架引入 Bazel 8 构建。包含模块宏、风格检查器、Clang-Tidy 配置及基础模块接口。
*   **链接**: [PR #10372](https://github.com/earendil-works/pi/pull/10372)

**6. fix(ai): add long-context pricing tier to OpenAI models on Bedrock** (#10329)
*   **内容**: 修复 Bedrock 上 OpenAI 模型的定价计算。确保超过 272k 输入 token 的请求使用长上下文费率，而非短上下文费率。
*   **链接**: [PR #10329](https://github.com/earendil-works/pi/pull/10329)

**7. fix(coding-agent): keep hidden tool guidance out of rules** (#10368)
*   **内容**: 修复隐藏工具的指导信息泄露问题。确保 `<rules>` 和技能提示仅包含可见工具的定义，避免模型看到不可见的工具指令。
*   **链接**: [PR #10368](https://github.com/earendil-works/pi/pull/10368)

**8. fix(ai): fold disjoint streaming `reasoning_tokens`** (#10365)
*   **内容**: 修复 OpenAI 兼容网关中推理 Token 的流式输出处理不一致问题，将不连续的推理 Token 合并到输出中。
*   **链接**: [PR #10365](https://github.com/earendil-works/pi/pull/10365)

**9. fix(coding-agent): reject oversized WebP EXIF chunk lengths** (#10346)
*   **内容**: 修复 WebP EXIF 解析漏洞。防止恶意构造的大尺寸 EXIF 段导致解析器死循环。
*   **链接**: [PR #10346](https://github.com/earendil-works/pi/pull/10346)

**10. feat(ai): add Cloudflare Clef classifiers** (#10316, #10322)
*   **内容**: 为 Workers AI 添加 Cloudflare Clef 决策模型（27B 和 9B 版本），提供高性价比的分类能力。
*   **链接**: [PR #10316](https://github.com/earendil-works/pi/pull/10316)

---

## 5. 功能需求趋势

根据 Issue 分析，社区当前关注的功能方向主要集中在：

*   **跨平台体验优化 (Windows 优先)**: 大量讨论集中在 Windows 平台，涉及终端集成、OAuth 登录、TUI 渲染和安装依赖的复杂性。这是目前用户反馈最密集的领域。
*   **性能与长上下文**: 多个 Issue 指出长会话下的 CPU 占用过高和 TUI 渲染卡顿。这表明 Pi 在处理大量消息（800+）时的性能优化是刚需。
*   **扩展生态稳定性**: 用户报告了扩展 API 在特定场景下的行为不一致（如 `before_agent_start` 掉用、Console 输出干扰 TUI）。开发者需要更稳定且符合直觉的扩展钩子。

---

## 6. 开发者关注点

*   **API 变更的向后兼容性**: #10360 和 #10359 紧急报告了 1.0.0 升级导致的导出结构破坏，这提示在版本升级时必须严格审查 API 兼容性，特别是涉及到子路径导出时。
*   **配置一致性**: CMD 模式与普通 Chat 模式在 `outputPad` 等设置上的不一致，显示了配置系统在不同模块间的同步难度。
*   **渲染层复杂性**: TUI 的渲染逻辑非常复杂，涉及 Diff 算法、多行高亮、图片渲染和终端兼容性（mintty/ConPTY），是 Bug 高发的“深水区”。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-10-03
**数据来源**: github.com/QwenLM/qwen-code

---

## 1. 今日速览
过去24小时社区主要聚焦于 **Managed Agent 架构的演进** 与 **会话管理稳定性修复**。核心开发团队在推进多代理会话持久化、权限流与沙箱隔离的关键路径。同时，针对 Web Shell 体验、Linux 端 TLS 连接及内存管理的性能优化需求也较为集中。

---

## 2. 版本发布
**v0.24.7-nightly.20261002.a011f66944**
- 更新内容：修复了 Core 层 Code Mode 文本对齐问题；优化了权限流程的处理逻辑，确保已批准的操作能被正确执行。

---

## 3. 社区热点 Issues

### 🔥 高热度 Feature Request
**#12380 - Managed Agent 双路径架构提案** (42评论)
- **重要性**: **核心路线图**。这是整个项目的长期架构设计，旨在将模型推理与环境工具供应解耦，并赋予会话持久所有权。
- **社区反应**: 讨论热烈，开发者们正在逐步拆解 Stage G（外部化权威会话历史）等具体阶段的实现。

### 🔧 高频 Bug 报告
**#12091 - 删除活跃会话导致文件头损坏** (6评论)
- **重要性**: **严重数据丢失风险**。当会话仍在运行时删除，会导致 `chats` 文件被破坏，进而导致会话无法恢复（auto-continue disabled）。

**#13130 - Qwen Code Desktop 工作区突然变为不可信** (5评论)
- **重要性**: **影响使用体验**。所有工作区突然变为只读，UI 缺乏有效的恢复机制，导致工具完全不可用。

**#13122 - Agent Host 重新注册后残留过期凭证** (5评论)
- **重要性**: **安全与状态一致性**。重新注册 Host 后，旧的凭证行未被清理，可能导致权限验证混乱。

**#13208 - Side Query 请求 Token 超过模型上下文窗口** (4评论)
- **重要性**: **性能与资源浪费**。Side query 未正确计算上下文窗口限制，可能导致输出预算溢出或请求失败。

**#13177 - Web Shell 内存面板编辑时破坏 CRLF 换行符** (4评论)
- **重要性**: **跨平台兼容性**。在 Web Shell 中编辑文件时，行尾符被错误转换，可能导致版本控制冲突或文件解析错误。

---

## 4. 重要 PR 进展

### 核心架构修复
**#13195 - fix(serve): 仅释放所有权的 Hook Runtimes** (wenshao)
- **内容**: 修复 Hosted Hook 会话的生命周期管理，确保只有 Harness 创建的 Runtime 拥有者才会被释放，防止资源泄漏。

**#13241 - fix(agents): 区分已接受的 Host 结果与终端运行** (yiliang114)
- **内容**: 修复了关于 Host 结果处理的竞态条件，确保只有匹配持久化 receipt 的重试请求才会被确认，防止重复计费或状态混乱。

**#13214 - fix(runtime-broker): 关闭跨进程释放竞态并加固调度** (wenshao)
- **内容**: 在单次事务中完成 Release 和 Admission 检查，消除了高优先级的释放竞态问题，提升了调度器的稳定性。

### 体验与功能增强
**#13247 - feat(managed-agent): 允许创建者修改绑定 Session 的目录** (wenshao)
- **内容**: 实现 #12380 提案中的 W2 片段，允许在授权 Workspace 内安全地移动 Managed Session 的相对目录，且操作具备幂等性。

**#13156 - fix(memory): 保持 MEMORY.md 索引链接目标可解析** (yiliang114)
- **内容**: 修复了内存索引文件在截断时可能破坏链接路径的问题，确保 `MEMORY.md` 中的链接依然有效。

**#13243 - fix(cli): 限制托管函数钩子模块评估并修复测试导入** (wenshao)
- **内容**: 修复了未限制的 `await import()` 可能导致的无限等待问题，并修正了测试中的模块导入错误。

### 性能与优化
**#13242 - perf(ci): 将可信 PR 流量路由至空闲 ECS 池** (wenshao)
- **内容**: 优化 CI/CD 流程，将无需容器托管的可信 PR 测试路由到闲置的 ECS 实例上，降低成本并提升效率。

**#13214 - fix(runtime-broker): ...** (wenshao)
- **内容**: 详见上方 Issue 部分，涉及底层调度逻辑的健壮性提升。

---

## 5. 功能需求趋势
从 Issues 和 PR 的分析来看，社区需求主要集中在以下几个方向：

1.  **Managed Agent 持久化与迁移**: 随着架构演进，如何安全地移动会话目录、管理会话历史快照成为高频需求（Issue #12380, #12952, #13247）。
2.  **会话管理与数据完整性**: 防止运行时删除会话导致的数据损坏、修复会话恢复机制（Issue #12091, #13124）。
3.  **Web Shell 体验优化**: 增加键盘快捷键（如 Session Overview 切换）、修复长行不换行、修复 CRLF 换行符问题（Issue #13175, #13248, #13177）。
4.  **跨平台兼容性与安全**: Linux 端 TLS 连接问题、工作区信任机制、权限流的正确性（Issue #13130, #13122, #13234）。

---

## 6. 开发者关注点
- **稳定性第一**: 开发者高度关注“运行时删除会话”、“权限流阻塞”等可能导致数据丢失或应用崩溃的 Bug。
- **上下文窗口管理**: Token 预算的计算（Side Query、Memory Index）存在漏洞，影响大模型场景下的成本控制和请求成功率。
- **Web Shell 的专业度**: 随着该功能逐渐成熟，开发者对交互细节（如快捷键、行尾符处理、Diff 显示）提出了更高的工程化要求。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026‑10‑03）

---

## 1️⃣ 今日速览
- 社区焦点集中在 **Codewhale 0.10.1** 的功能发布与 ChatGPT 登录整合，以及 **跨平台性能回归**（CPU 使用率）和 **Windows npm 安装** 的异常终止问题。  
- 多条依赖升级 PR 以及一项关于 **插件 OAuth 支持** 的重大改动在过去 24 小时内陆续提交，标志着底层安全与可扩展性的同步提升。

---

## 2️⃣ 版本发布
> **暂无新 Release**（过去 24 h 未检测到正式标签发布）。  
> 请关注即将到来的 **v0.10.1**（已在 PR #6815 中预览），预计本周内正式打标签。

---

## 3️⃣ 社区热点 Issues（精选 8 条，全部列出）

| # | 标题 | 关键点 | 社区反响 | 链接 |
|---|------|--------|----------|------|
| 5316 | EPIC-005: CodeWhale TUI Crate Decomposition (Umbrella) | 大型重构任务，涉及模块化拆分与公共 API 设计；已有 **31 条评论**，表明需求强烈。 | 高度关注，讨论集中在拆分粒度与向后兼容性。 | https://github.com/Hmbown/Codewhale/issues/5316 |
| 6728 | CPU Usage Regression: v0.9.12 → v0.9.13 → v0.10.0 | 在 FreeBSD 上发现 CPU 空闲占用从 **轻微 → 中度 → 严重** 的回归，涉及底层调度器。 | 仅 1 条评论，但已触发 **needs‑triage**，需尽快定位。 | https://github.com/Hmbown/Codewhale/issues/6728 |
| 6827 | Windows (npm install): killing node.exe instantly terminates Codewhale | Windows 环境下 `npm install` 启动的 `node.exe` 被外部进程杀掉时，未完成清理导致会话泄漏。 | 新建 Issue，暂无回复，属于关键跨平台兼容性问题。 | https://github.com/Hmbown/Codewhale/issues/6827 |
| 6818 | Add the complete Ratatui component explorer to the Codewhale website | 将 Ratatui 组件浏览器完整集成到官网，提升 UI 可视化与文档体验。 | 已通过 CI，等待后续合并。 | https://github.com/Hmbown/Codewhale/issues/6818 |
| 6814 | **已关闭** Complete codewhale‑ratatui component catalogue and rendered README gallery | 完成组件目录与 README 画廊的生成，验证了前端渲染管线。 | 已闭合，标志功能完成。 | https://github.com/Hmbown/Codewhale/issues/6814 |
| 6816 | Migrate local ChatGPT plan access to the official open‑source Sign in with ChatGPT contract | 将本地 ChatGPT 计划登录迁移到官方开源协议，实现统一身份管理。 | 新需求，已在 PR #6815 中实现。 | https://github.com/Hmbown/Codewhale/issues/6816 |
| 6328 | Schedule list UI for watches and heartbeat | 为 Agent 的 **watch** 与 **heartbeat** 提供 UI 列表，提升可视化调度管理。 | 已打开，待核心 Cron 路由支持。 | https://github.com/Hmbown/Codewhale/issues/6328 |
| 6582 | **已关闭** hooks: structured execution receipt on stdin for shell tool_call_after | 为 `shell` 工具提供结构化执行回执，提升插件可追踪性。 | 已关闭，功能已合并到主线。 | https://github.com/Hmbown/Codewhale/issues/6582 |

> **说明**：当前仓库仅有 8 条近期更新的 Issue，已全部列出并标记重点。

---

## 4️⃣ 重要 PR 进展（精选 10 条）

| # | 标题 | 关键改动 | 价值说明 | 链接 |
|---|------|----------|----------|------|
| 6815 | **0.10.1: ChatGPT sign‑in, extension capabilities, and native terminal adoption** | 集成官方 ChatGPT 登录、扩展插件框架、原生终端适配。 | 为即将发布的 0.10.1 打下核心功能基座。 | https://github.com/Hmbown/Codewhale/pull/6815 |
| 6819 | fix(cli): 修复配置诊断对 HTTP(S) 协议大小写的误判 | `config doctor` 现在对协议大小写不敏感，避免误报。 | 提升用户配置体验，降低因大小写错误导致的启动失败。 | https://github.com/Hmbown/Codewhale/pull/6819 |
| 6820 | docs(rfc): evaluate consolidating Python and JavaScript tools into Shell | 提出将 `code_execution` (Python) 与 `js_execution` 合并到统一 Shell 工具的 RFC。 | 有望简化插件生态，降低重复实现成本。 | https://github.com/Hmbown/Codewhale/pull/6820 |
| 6817 | feat(runtime‑api): read what one tool call changed, from the snapshots around it | 为运行时 API 增加 **文件变更快照对比** 能力。 | 客户端可直观看到单次工具调用的文件影响，提升调试效率。 | https://github.com/Hmbown/Codewhale/pull/6817 |
| 6805 | feat(plugins): support reviewed OAuth AI providers | 新增插件声明 **OAuth 兼容 AI 提供者** 的机制。 | 扩展生态接入 OpenAI‑compatible 服务的门槛。 | https://github.com/Hmbown/Codewhale/pull/6805 |
| 6807 | feat(pet): draw the Watch whale with the desktop's whale v2 contour | 为桌面宠物功能加入 **Watch Whale** 视觉元素。 | 增强用户粘性与社区娱乐性。 | https://github.com/Hmbown/Codewhale/pull/6807 |
| 6739 | fix(context): render rule and chain‑segment source labels repo‑relative | 将规则与链段的源路径改为相对路径，避免因仓库搬迁导致的提示错误。 | 提升可迁移性与 prompt 可读性。 | https://github.com/Hmbown/Codewhale/pull/6739 |
| 6826 | build(deps): bump uuid from 1.26.0 to 1.26.1 | 依赖 **uuid** 小幅升级，修复安全漏洞。 | 维护安全基线。 | https://github.com/Hmbown/Codewhale/pull/6826 |
| 6825 | build(deps): bump dtolnay/rust‑toolchain | 更新 Rust 工具链指向最新稳定版。 | 保证 CI 与本地构建使用统一编译器。 | https://github.com/Hmbown/Codewhale/pull/6825 |
| 6824 | build(deps): bump encoding_rs from 0.8.41 to 0.8.42 | 升级字符编码库，解决已知的 UTF‑8 边界错误。 | 提升跨语言交互的可靠性。 | https://github.com/Hmbown/Codewhale/pull/6824 |

> 其余依赖升级 PR（#6823、#6822、#6821）虽重要，但相对功能改动影响较小，未列入前 10。

---

## 5️⃣ 功能需求趋势

| 方向 | 体现的 Issue / PR | 说明 |
|------|------------------|------|
| **跨平台稳定性** | Issue #6728（CPU 回归）、#6827（Windows npm 终止） | 社区对 Linux、FreeBSD 与 Windows 的一致行为期待提升，尤其是资源占用与进程管理。 |
| **身份统一与多账户管理** | Issue #6816、PR #6815、PR #6715 | 多账户登录、ChatGPT / xAI 切换、统一 OAuth 机制成为热点。 |
| **插件与扩展生态** | PR #6805、#6820、#6817 | 通过标准化插件接口、OAuth 提供者以及运行时快照，降低第三方集成成本。 |
| **UI/UX 可视化** | Issue #6818、#6328、PR #6807、#6739 | 对组件浏览器、调度列表、宠物动画以及路径标签的可视化需求持续增长。 |
| **安全与依赖维护** | 多个依赖升级 PR（#6826‑#6824 等） | 及时跟进上游库的安全补丁，确保发行版的安全基线。 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **性能回归** – CPU 使用率在新版本中出现显著提升，尤其在 FreeBSD 环境。需要快速定位并回滚或修复。  
2. **Windows 兼容性** – `npm install` 启动的 `node.exe` 被意外杀掉时，导致会话残留，影响企业级部署。  
3. **多账户登录** – 开发者常用多个 OpenAI / xAI 账户，当前登录流程缺乏切换与状态可视化。  
4. **插件 OAuth 支持** – 社区希望通过统一声明方式接入各种 AI Provider，避免重复实现授权流程。  
5. **配置诊断** – 对协议大小写的误判导致的启动失败，显示配置校验逻辑仍需强化。  
6. **可视化调度管理** – 对 watch / heartbeat 的 UI 支持不足，影响监控与调试体验。  

> **建议**：优先安排 **CPU 回归** 与 **Windows 进程清理** 两大性能/兼容性问题的专项排查；同步推进 **多账户登录 UI** 与 **OAuth 插件框架**，以满足日益增长的企业级使用场景。

--- 

*本日报基于 GitHub 上 24 h 内的 Issue 与 PR 活动生成，供 DeepSeek TUI 开发者与社区成员快速把握项目动态。*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*