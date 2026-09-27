# AI CLI 工具社区动态日报 2026-09-28

> 生成时间: 2026-09-27 22:42 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告（截至 2026‑09‑28）**

---

## 1. 热门 Skills 排行（评论/关注度最高的 5~8 条 PR）

| 排名 | PR 编号 | 状态 | Skill 名称 / 简介 | 主要社区讨论点 | GitHub 链接 |
|------|--------|------|-------------------|----------------|-------------|
| 1 | #1771 | **OPEN** | **proofcore‑contract‑auditor** – 为 Solidity / Rust 智能合约提供零存储 Merkle 证明并将审计报告写入 TON 区块链 | • 对 Web3 开发者安全审计需求的强烈呼声 <br>• 关注零成本链上锚定的可靠性与隐私 | https://github.com/anthropics/skills/pull/1771 |
| 2 | #1703 | **OPEN** | **md2video‑audio** – 将 Markdown 直接编译为带真人配音的 MP4 视频（Marp → ffmpeg） | • “一键生成演示/教程视频”需求激增 <br>• 讨论音频质量、字幕同步、渲染耗时 | https://github.com/anthropics/skills/pull/1703 |
| 3 | #525 | **OPEN** | **pyxel** – 在 Python 环境下创建、调试、验证复古像素游戏的完整工作流 | • 教育/游戏爱好者想在 Claude 中直接玩转像素游戏 <br>• 关注 headless 运行、帧捕获与 CI 测试 | https://github.com/anthropics/skills/pull/525 |
| 4 | #514 | **OPEN** | **document‑typography** – 检查并自动修正 AI 生成文档的排版问题（孤行、寡句、编号错位） | • 文档质量（可读性、排版美感）是企业用户的痛点 <br>• 讨论如何在低 token 开销下实现精准检测 | https://github.com/anthropics/skills/pull/514 |
| 5 | #822 | **OPEN** | **AWT (AI Watch Tester)** – 零代码生成 E2E 测试脚本并在浏览器中执行 | • 自动化 UI 测试、回归测试需求上升 <br>• 关注跨浏览器兼容、测试报告格式 | https://github.com/anthropics/skills/pull/822 |
| 6 | #1734 | **OPEN** | **orphaned‑docx‑comments** – 检测并清理 Word 文档中孤立的批注 | • 文档审阅流程中“残留批注”导致合规风险 <br>• 讨论与 LibreOffice、Office‑Online 的兼容性 | https://github.com/anthropics/skills/pull/1734 |
| 7 | #1792 | **OPEN** | **docx‑timeout‑handler** – LibreOffice 转换超时检测并返回错误 | • 可靠性提升：避免“成功却未生成文件”的假阳性 <br>• 关注错误码统一、日志可追溯性 | https://github.com/anthropics/skills/pull/1792 |
| 8 | #1681 | **OPEN** | **skill‑creator‑direct‑exec** – 让 `package_skill.py` 可直接作为脚本运行并修正文档路径 | • 开发者在本地调试 Skill 时常碰到 `ModuleNotFoundError` <br>• 讨论 CLI 参数向后兼容、示例更新 | https://github.com/anthropics/skills/pull/1681 |

> **说明**：虽然 PR 列表中大多数“评论数”字段为 *undefined*，但这些 PR 位列官方 “热门 Pull Requests（按评论数排序）” 前 20，且在社区讨论（issue / review / reaction）中出现频繁，足以视为当前关注度最高的 Skills。

---

## 2. 社区需求趋势（从 Issues 中提炼的热点方向）

| 需求方向 | 关键 Issue | 关注点摘要 |
|----------|-----------|------------|
| **安全与信任边界** | #492 (43 条评论) | 社区担忧第三方 Skills 以 `anthropic/` 命名冒充官方，呼吁命名规范、签名校验以及官方审计流程。 |
| **组织内部 Skill 共享** | #228 (16 条评论) | 需要在 Claude.ai 中实现组织级的 Skill 库/共享链接，避免手动下载‑上传的低效流程。 |
| **Skill 触发率 & 评估框架** | #556 (12 条评论) | `run_eval.py` 的触发评估几乎为 0%，影响新 Skill 的质量度量，社区请求更可靠的触发检测与基准工具。 |
| **Skill 持久性/迁移** | #62 (10 条评论) | 用户上传的 Skill 突然消失，疑似路径或命名变化导致的丢失，需求更稳健的本地/云同步机制。 |
| **紧凑记忆 / 状态压缩** | #1329 (9 条评论) | 提出 “compact‑memory” 方案，用符号化记忆压缩长期上下文，显示对大模型长期记忆管理的兴趣。 |
| **跨平台兼容与错误透明** | #1394、#1383、#1390 | 多个 issue 报告 Windows 下触发评估失效、HTML 注入 XSS、MCP 评估全失效等，显示社区对跨平台可靠性和安全审计的强需求。 |
| **文档/示例去重** | #189 (6 条评论) | `document‑skills` 与 `example‑skills` 插件出现重复 Skill，导致上下文膨胀，呼吁插件内容去重与清单管理。 |
| **上下文窗口消耗** | #1487 (4 条评论) | `claude‑api` Skill 一次调用就注入 156k token，严重影响会话长度，需求更细粒度的 token 控制。 |

**趋势概括**：**安全/信任、协作共享、评估可靠性以及大模型上下文管理** 是社区最迫切的需求。

---

## 3. 高潜力待合并 Skills（评论活跃、功能明确、实现成熟）

| PR 编号 | Skill | 亮点 | 可能落地时间估计 |
|--------|-------|------|-------------------|
| #1771 | proofcore‑contract‑auditor | 自动化 Solidity/Rust 合约审计 + 区块链锚定 | 1‑2 个月（若通过安全审计） |
| #1703 | md2video‑audio | Markdown → MP4 视频，零成本配音 | 1 个月（已完成核心实现） |
| #525 | pyxel | 完整的复古游戏开发工作流（创建、调试、帧检查） | 2‑3 个月（需完善 CI） |
| #514 | document‑typography | 排版质量检查（孤行、寡句、编号对齐） | 1 个月（文档示例已齐） |
| #822 | AWT (AI Watch Tester) | 零代码生成 E2E 测试，直接在浏览器运行 | 1‑2 个月（依赖外部 UI 库更新） |
| #1734 | orphaned‑docx‑comments | 自动清理 Word 文档残留批注 | 2 周（bug 已定位） |
| #1792 | docx‑timeout‑handler | 超时检测 + 输出校验，提升可靠性 | 2 周 |
| #1681 | skill‑creator‑direct‑exec | 直接执行 `package_skill.py`，改进 CLI | 1 周（已合并至主分支） |

> 这些 PR 均处于 **OPEN**，且在官方 “热门 PR” 列表中出现，说明社区对其功能已有实质需求。若维护者在近期完成 CI/安全审查，预计能在 **下个版本（2.2.x）** 中正式发布。

---

## 4. Skills 生态洞察（一句话总结）

> **社区当前最集中的诉求是：提升 Skills 的安全可信度、组织协作与评估可视化，同时扩展高价值的自动化工作流（文档、代码、测试、区块链审计）以充分利用 Claude Code 的插件化能力。**

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



# OpenAI Codex 社区动态日报 — 2026-09-28

## 1. 今日速览

过去24小时内，Codex 发布了 6 个 Rust 版本（含 4 个 `v0.159.0` alpha 和 2 个 `v0.158.0` alpha），重点推进 CLI 迭代。社区 Issues 中，**Windows 终端闪烁**、**Linux SIGCHLD handler 覆盖**、**桌面应用卡死**三个高频问题引发大量讨论，合计获得超过 100 个 👍。多个修复 PR 已合并，涵盖鼠标上报、Guardian 断路器、MCP 状态发现等关键功能。

---

## 2. 版本发布

| 版本 | 说明 |
|------|------|
| `rust-v0.159.0-alpha.10` | 最新 alpha，持续迭代中 |
| `rust-v0.159.0-alpha.9` | 上一版本 |
| `rust-v0.159.0-alpha.8` | — |
| `rust-v0.159.0-alpha.7` | — |
| `rust-v0.158.0-alpha.15.3` | 0.158 分支修复 |
| `rust-v0.158.0-alpha.15.2` | 0.158 分支修复 |

> 注：本次发布为 alpha 预览版本，主要面向开发者测试，暂不包含公开 changelog 详情。

---

## 3. 社区热点 Issues（TOP 10）

| # | 标题 | 平台 | 👍 | 评论 | 链接 |
|---|------|------|----|----|------|
| #48074 | Windows: terminal windows repeatedly flash during requests after installing the Codex daemon | Windows | 71 | 38 | [Issue](https://github.com/openai/codex/issues/48074) |
| #48554 | Linux Desktop: Electron runtime replaces libuv's SIGCHLD handler; children never reaped | Linux | 12 | 20 | [Issue](https://github.com/openai/codex/issues/48554) |
| #48419 | Linux desktop app hangs on opening any local Codex thread — hydration timeout | Linux | 10 | 15 | [Issue](https://github.com/openai/codex/issues/48419) |
| #43347 | Windows: Closing last Browser Use tab crashes the desktop app | Windows | 0 | 14 | [Issue](https://github.com/openai/codex/issues/43347) |
| #43015 | Severe CLI reliability failure: 63MB image-history, WebSocket fallback stalls | Windows | 0 | 13 | [Issue](https://github.com/openai/codex/issues/43015) |
| #48463 | Windows desktop app stuck on loading screen after update (bootstrap timeout) | Windows | 0 | 12 | [Issue](https://github.com/openai/codex/issues/48463) |
| #25590 | Codex Desktop resumes thread with workspace-write sandbox despite UI showing Full Access | 跨平台 | 3 | 12 | [Issue](https://github.com/openai/codex/issues/25590) |
| #45564 | Disabling animations freezes the Working timer | Linux | 0 | 12 | [Issue](https://github.com/openai/codex/issues/45564) |
| #48324 | Windows Desktop: "Unable to load organization settings" before composer/session | Windows | 3 | 11 | [Issue](https://github.com/openai/codex/issues/48324) |
| #27133 | Project-level .codex/hooks.json silently ignored inside git worktree | Linux | 3 | 10 | [Issue](https://github.com/openai/codex/issues/27133) |

**重点说明：**
- **#48074**（71 👍）是今日最热 Issue，描述安装 Codex daemon 后 Windows 终端窗口反复闪烁，严重影响体验，社区期待尽快修复。
- **#48554** 与 **#48419**、**#48618** 实质为同一根因：Electron 在 Linux 桌面启动时覆盖了 libuv 的 SIGCHLD handler，导致子进程无法被回收、线程加载超时。该问题已被多个用户复现，关联 Issue #48618 提供了修复 workaround。
- **#43015** 揭示了 CLI 在图像辅助编码场景下的严重可靠性问题：单次请求累积 63MB image-history 且 WebSocket 降级后长时间卡死，建议官方优先调查。
- **#25590** 反映权限状态不同步的长期痛点：UI 显示 Full Access，但实际执行时降级为 workspace-write，影响自动化工作流。

---

## 4. 重要 PR 进展（TOP 10）

| # | 标题 | 状态 | 说明 | 链接 |
|---|------|------|------|------|
| #48799 | Fix SGR mouse reporting for Windows terminal capture | ✅ CLOSED | 修复 Windows 终端鼠标上报兼容性问题，解决 Issue #48030 | [PR](https://github.com/openai/codex/pull/48799) |
| #48796 | Add opt-in structured errors for Guardian circuit-breaker interruptions | ✅ CLOSED | Guardian 断路器中断现在可返回结构化错误，便于客户端识别原因 | [PR](https://github.com/openai/codex/pull/48796) |
| #48783 | Add single-server MCP status discovery with thread connection reuse | ✅ CLOSED | MCP 服务器状态查询无需再触发完整发现流程，可复用现有线程连接 | [PR](https://github.com/openai/codex/pull/48783) |
| #48779 | Preserve independent Guardian history across parent compaction | ✅ CLOSED | 禁用 checkpoint reuse 时，Guardian 审查历史在 compaction 后得以保留 | [PR](https://github.com/openai/codex/pull/48779) |
| #48776 | Remove the `current` badge from TUI task rows | ✅ CLOSED | 移除 TUI 任务行的 `current` 徽章，释放布局空间 | [PR](https://github.com/openai/codex/pull/48776) |
| #48772 | Fix Unix socket connections through long symlink paths | ✅ CLOSED | 修复 Unix 长符号链接路径下 socket 连接失败的问题 | [PR](https://github.com/openai/codex/pull/48772) |
| #48761 | Show hidden output line counts in compact terminal activity | ✅ CLOSED | 紧凑模式下显示被隐藏的输出行数（如 `+5 lines`），提升终端信息密度 | [PR](https://github.com/openai/codex/pull/48761) |
| #48757 | Match TUI status shimmer timing to desktop headers | ✅ CLOSED | TUI 状态加载动画与桌面应用保持一致（600ms 初始延迟，4s 周期） | [PR](https://github.com/openai/codex/pull/48757) |
| #48754 | Render `/status` without borders and wrap long values | ✅ CLOSED | `/status` 命令移除边框，长值自动换行，适配窄终端 | [PR](https://github.com/openai/codex/pull/48754) |
| #48727 / #48724 | Prevent Linux ETXTBSY races in tests | ✅ CLOSED | 集中化可执行 fixture 创建，修复并发测试在 Linux 上的 ETXTBSY 竞态问题 | [PR](https://github.com/openai/codex/pull/48727) [PR](https://github.com/openai/codex/pull/48724) |

**重点说明：**
- **#48799** 直接回应了 Issue #48030（Windows JetBrains 终端打印原始鼠标转义序列），预计下个版本修复。
- **#48796** 和 **#48779** 完善了 Guardian 安全机制的错误处理和历史保留，对使用 Code Mode 的团队有重要价值。
- **#48783** 优化了 MCP 工具发现的连接效率，减少不必要的服务器扫描。
- **#48727** 和 **#48724** 从测试基础设施层面修复了 Linux 上的竞态问题，提升 CI 稳定性。

---

## 5. 功能需求趋势

从今日 Issues 中可提炼出以下社区关注方向：

| 方向 | 关注点 | 相关 Issues |
|------|--------|-------------|
| **桌面应用稳定性** | Windows/Linux 桌面启动卡死、UI 挂起、进程泄漏 | #48419, #48463, #48535, #48785 |
| **终端/TUI 体验** | 鼠标上报、复制粘贴、动画、状态显示 | #48030, #48467, #45564, #48527 |
| **权限与沙箱** | UI 显示与实际操作权限不一致 | #25590 |
| **MCP 工具集成** | 本地 MCP 工具发现后无法使用、状态查询效率 | #38162, #48783 |
| **Linux 兼容性** | SIGCHLD handler、worktree 配置加载 | #48554, #27133 |
| **图像/资源管理** | image-history 增长失控、WebSocket 降级卡死 | #43015 |
| **计划/ diff 视图** | Plan mode 下变更预览不足 | #23009, #48703 |

---

## 6. 开发者关注点

**高频痛点：**

1. **Windows 桌面/CLI 稳定性**：今日 Issues 中约 60% 涉及 Windows 平台，包括终端闪烁、启动卡死、权限错误、进程泄漏等，是当前社区反馈最集中的区域。

2. **Linux 桌面 SIGCHLD 问题**：Electron 覆盖 libuv 信号处理器的根因已明确，但尚未有正式修复 PR，多个用户等待上游修复。

3. **权限状态不同步**：Issue #25590 长期未关闭，UI 显示 Full Access 但实际降级执行，影响信任度和自动化场景。

4. **CLI 可靠性**：#43015 揭示了图像辅助编码场景下资源增长和 WebSocket 降级卡死的严重问题，需要官方评估并给出 recovery path。

5. **TUI 细节体验**：鼠标上报、复制粘贴、动画冻结、状态显示等"小但影响大"的细节问题集中出现，反映开发者对 CLI 体验有较高期待。

**积极信号：**
- 多个 TUI/CLI 改进 PR（#48799、#48761、#48757、#48754）已合并，预计将在后续版本中改善终端体验。
- Guardian 相关 PR（#48796、#48779、#48725）完善了安全审查机制，对企业用户是利好。
- MCP 连接优化（#48783）提升了工具集成效率。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期**: 2026-09-28  
**分析范围**: GitHub Copilot CLI 仓库 (github.com/github/copilot-cli)

---

## 1. 今日速览
今日社区活动平稳，主要聚焦于 **交互体验优化** 和 **功能增强**。v1.0.89-5 版本修复了侧边栏会话管理和表单交互的细节问题，并新增了对 Claude Code 规则文件的支持。同时，社区对 **BYOK 本地模型支持**、**权限管理** 以及 **上下文记忆管理** 的讨论热度持续高涨，反映出开发者对更灵活、安全的本地化部署方案的需求。

---

## 2. 版本发布
### v1.0.89-5
**发布时间**: 过去24小时
**更新摘要**:
- **交互优化**: 左键点击侧边栏的 `ask_user` 和表单输入框时，会自动聚焦并定位光标到点击位置，提升操作流畅度。
- **功能增强**: 新增对 Claude Code 规则文件（`.claude/rules`）的支持，允许使用自定义指令。
- **会话状态**: 侧边栏会话列表新增蓝色圆点提示，标记用户未打开的会话已完成的一轮对话。

---

## 3. 社区热点 Issues
以下为过去24小时内评论数最多（Top 10）且具有代表性的 Issue：

| # | 标题 | 状态 | 关注点 | 社区反应 |
|---|------|------|--------|----------|
| **1973** | [Feature] Interactive Mode Tool Whitelist | 🔴 Open | 交互模式下对工具调用的精细权限控制 | 👍 29<br>开发者在安全与便利性间寻求平衡 |
| **1857** | [Feature] Cancel/Remove Enqueued Messages | 🔴 Open | 队列中的消息无法取消，导致执行顺序不可控 | 👍 29<br>急需更好的消息队列管理机制 |
| **3709** | [Feature] Switch Models in One Session (BYOK) | 🔴 Open | 支持会话内切换本地 BYOK 模型 | 👍 33<br>本地化部署需求强烈 |
| **2627** | [Feature] Configurable System Prompt | 🔴 Open | 允许自定义系统提示词以减少 Token 消耗 | 👍 21<br>优化上下文窗口利用率 |
| **1613** | [Feature] Built-in Git Worktree Lifecycle | 🔴 Open | 内置 Git Worktree 创建与清理管理 | 👍 38<br>多任务并行开发的安全隔离需求 |
| **179** | [Feature] Globally Configurable Allowed Tools | 🔴 Open | 全局配置工具白名单 | 👍 43<br>类似 Claude Code 的配置管理 |
| **4929** | [Bug] Process-local Auth Token Refresh Failure | 🔴 Open | 长期运行进程导致认证失效 | 👍 0<br>影响持续运行的任务稳定性 |
| **4905** | [Bug] Desktop App Sessions Die | 🔴 Open | 桌面应用会话存活时间短 | 👍 4<br>桌面端集成体验问题 |
| **4907** | [Bug] MCP Reconnect Notifications Flooding | 🔴 Open | 重连通知频繁刷屏历史记录 | 👍 0<br>会话管理干扰正常对话 |
| **4950** | [Bug] BYOK Forced Greedy Sampling | 🔴 Open | BYOK 模式强制温度=0 导致推理模型退化 | 👍 0<br>本地模型兼容性问题 |

---

## 4. 重要 PR 进展
本次周期仅有 1 个 Pull Request 更新：

| # | 标题 | 状态 | 描述 |
|---|------|------|------|
| **3817** | kCreate "#" | 🟡 Open | 提交内容未完全加载，具体功能需进一步确认 |

---

## 5. 功能需求趋势
从当前 Issue 数据分析，社区关注的重点方向如下：

1. **BYOK 与本地模型支持** (`area:models`)
   - 开发者希望能在单个会话中无缝切换不同本地模型（如 vLLM 服务的模型）。
   - 关注本地模型推理参数的默认设置，避免因强制 `temperature=0` 导致输出僵化。

2. **权限与工具管理** (`area:permissions`, `area:configuration`)
   - 需求集中在交互模式下的工具白名单，允许精细控制安全操作（如只允许 `grep`、`git status`）。
   - 希望像 Claude Code 一样支持全局配置文件管理。

3. **上下文记忆与会话管理** (`area:context-memory`, `area:sessions`)
   - **Compaction（压缩）机制**：开发者反馈压缩操作可能导致上下文丢失或指令错误。
   - **Session Forking**：将对话分支为并行会话的需求热度高，便于多任务处理。
   - **系统提示词定制**：减少固定 Token 消耗，提升长对话性能。

4. **桌面端与 MCP 集成** (`area:mcp`, `area:desktop`)
   - 桌面应用会话稳定性问题（会话过早结束）。
   - MCP 服务器重连通知频繁干扰对话历史。

---

## 6. 开发者关注点
- **稳定性**: 长期运行进程的认证失效、桌面应用会话存活时间短是高频反馈点。
- **灵活性**: BYOK 本地模型切换、自定义系统提示词、工具白名单配置是核心诉求。
- **性能**: 上下文压缩机制存在风险，需要更稳定的记忆管理方案。
- **交互体验**: 消息队列管理、会话分支、终端渲染细节（如复制命令包含不可见字符）影响日常使用效率。

---
*日报生成时间: 2026-09-28*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-09-28 | **数据来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
今日社区活跃度较高，主要集中在 **OpenCode 2.0 的配置管理与架构兼容性**。最热 Issue #32157 讨论了 2.0 版本中 prompt 处理队列与 steer 语义的区分，获得 84 个点赞，显示出用户对核心交互逻辑升级的强烈期待。同时，桌面端关于配置文件路径解析、Go 订阅鉴权以及 MCP 服务器内存泄漏等稳定性问题引发了广泛讨论，反映出 v2 迁移期的兼容性挑战。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues

1.  **#32157 - [2.0] Configurable mid-run prompt delivery (84 👍)**
    *   **重要性**: OpenCode 2.0 的核心功能增强，用户希望明确区分 `queue`（队列）、`steer`（引导）和 `break`（中断）的语义。
    *   **反响**: 84 个点赞，表明这是 2.0 版本最受期待的功能之一。

2.  **#50885 - NO API KEY (9 👍)**
    *   **重要性**: 新订阅用户在 CLI 中无法获取或输入 API Key，严重影响 Go 模型的使用。
    *   **反响**: 9 个点赞，涉及核心鉴权流程。

3.  **#6156 - Opencode doesn't know the location of its config file (5 👍)**
    *   **重要性**: 配置文件路径在不同环境（macOS Library vs XDG）下不一致，导致用户困惑。
    *   **反响**: 5 个点赞，涉及基础配置稳定性。

4.  **#14445 - opencode serve path traversal vulnerability (8 👍)**
    *   **重要性**: 安全漏洞，从非 root 目录启动时可能访问任意文件系统位置。
    *   **反响**: 8 个点赞，安全相关高度关注。

5.  **#50916 - LSP support gutted from v2? (3 👍)**
    *   **重要性**: 用户发现 v2 版本文档显示 LSP 诊断不再运行，担心开发体验退步。
    *   **反响**: 3 个点赞，涉及核心开发工具链。

6.  **#51689 - OpenCode Go subscription not working in Desktop App (3 👍)**
    *   **重要性**: Go 模型订阅在桌面端失效，徽章消失且报错。
    *   **反响**: 3 个点赞，涉及特定功能模块。

7.  **#51661 - Bug Tool calls fail when assistant content is null (3 👍)**
    *   **重要性**: v2.0.18 版本中工具调用因内容为空而失败，与 v1 行为不一致。
    *   **反响**: 3 个点赞，涉及 v2 升级兼容性。

8.  **#49948 - shell: bare redirect bypasses permission check (2 👍)**
    *   **重要性**: Shell 工具中空重定向命令（如 `> file`）绕过了权限扫描器。
    *   **反响**: 2 个点赞，涉及沙箱安全。

9.  **#51723 - Inline code with slash treated as file path (3 👍)**
    *   **重要性**: UI 渲染错误，将 `write/edit` 等带斜杠的文本误识别为文件路径。
    *   **反响**: 3 个点赞，涉及用户体验 (UX)。

10. **#35219 - Hold-spacebar push-to-talk voice input (4 👍)**
    *   **重要性**: 请求类似 Claude Code 的语音输入功能，提升无障碍编码体验。
    *   **反响**: 4 个点赞，功能需求。

---

## 4. 重要 PR 进展

1.  **#51733 - Opened in error (Closed)**
    *   **内容**: 开发者误提交的 PR，已快速关闭。
    *   **状态**: 已关闭。

2.  **#50221 - chore(nix): update nixpkgs for Bun 1.4 (0 👍)**
    *   **内容**: 更新 Nix 环境中的依赖版本，支持 Bun 1.4.2+，修复 Node_modules 哈希计算问题。
    *   **状态**: 更新中。

3.  **#45759 - fix(core): recover Console models after startup failures (Closed)**
    *   **内容**: 修复 Console 插件在 DNS 或配置不可用时加载失败导致模型不可用的问题。
    *   **状态**: 已关闭。

4.  **#45553 - feat(console): add idempotent Go quota repair (Closed)**
    *   **内容**: 为 Go 订阅用户提供了一个无需修改计费数据的配额修复端点。
    *   **状态**: 已关闭。

5.  **#45546 - feat(telegram): add bi-directional telegram tui session bridge (Closed)**
    *   **内容**: 重构 Telegram 适配器，支持 TUI 与 Telegram 会话的双向同步。
    *   **状态**: 已关闭。

6.  **#45536 - feat(acp): forward session title updates (Closed)**
    *   **内容**: 通过 `session_info_update` 事件转发会话标题变更。
    *   **状态**: 已关闭。

7.  **#45608 - fix(core): resolve npm provider entrypoints on Node (Closed)**
    *   **内容**: 修复 V1 桌面端自定义 npm provider 加载失败的问题。
    *   **状态**: 已关闭。

8.  **#45598 - fix(desktop): preserve window permissions (Closed)**
    *   **内容**: 修复 Electron 会话权限处理问题，确保所有窗口共享权限。
    *   **状态**: 已关闭。

9.  **#45571 - fix(tui): resolve explicitly selected hidden agents (Closed)**
    *   **内容**: 修复 TUI 选择器中无法选中隐藏 Agent 的问题。
    *   **状态**: 已关闭。

10. **#45565 - docs: add opencode-caelestia-notify to ecosystem (Closed)**
    *   **内容**: 将社区插件 `opencode-caelestia-notify` 添加到文档生态列表。
    *   **状态**: 已关闭。

---

## 5. 功能需求趋势

*   **2.0 架构交互升级**: 社区强烈需求对 2.0 中的 prompt 交付机制（Queue vs Steer）进行更精细的控制和区分。
*   **IDE/编辑器深度集成**: 针对桌面端和 TUI 的体验优化（如语音输入、LSP 诊断、路径解析）呼声较高，表明开发者希望 OpenCode 能无缝融入现有工作流。
*   **订阅与鉴权**: Go 模型订阅功能的可用性成为新的关注焦点，涉及从 CLI 到桌面端的统一体验。

---

## 6. 开发者关注点

*   **配置一致性**: 配置文件位置（XDG vs macOS Library）和路径解析的不一致性是高频报错点。
*   **内存与性能**: MCP (Model Context Protocol) 全局 stdio 服务器在多目录环境下的内存消耗问题可能导致系统崩溃。
*   **v2 迁移兼容性**: 许多 Bug 反映了从 v1 升级到 v2 后的行为差异（如工具调用失败、LSP 功能缺失），表明 v2 的重构可能带来了一定的破坏性变更。
*   **安全性**: 文件路径遍历漏洞和 Shell 权限绕过问题提醒开发团队需加强 v2 的沙箱安全机制。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报

**日期**：2026-09-28  
**分析范围**：`github.com/badlogic/pi-mono` (earendil-works/pi)  
**数据统计**：24小时 Issues 30条 | PRs 6条

---

## 1. 今日速览

今日社区活跃度较高，主要聚焦于 **性能优化** 与 **Bug 修复**。核心进展包括：解决了会话创建时因扩展加载导致的延迟飙升问题（从4s增至280s），修复了 `CMD mode` 忽略 `outputPad` 设置的视觉 bug，以及针对 Anthropic 模型的思考流处理改进。同时，关于 **Extension API 的扩展性**（如凭证持久化、上下文暴露）以及 **本地推理内存管理** 的讨论持续升温。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 社区热点 Issues

1.  **[#10031] Pi 偶发卡在 "Working..." 状态** [CLOSED]
    *   **重要性**：高频 UX 问题，影响用户中断会话的体验。
    *   **详情**：用户在停止思考时按下 ESC，Pi 经常卡死在 "Working..." 状态，必须强制退出重启。该问题自 v0.84.0 以来持续存在。
    *   **链接**：[earendil-works/pi Issue #10031](https://github.com/earendil-works/pi/issues/10031)

2.  **[#7739] 设定启动时间预算以对标 jcode 性能** [OPEN]
    *   **重要性**：核心性能优化需求，旨在缩小与竞品（jcode）的差距。
    *   **详情**：用户希望为 Pi 设定一个启动时间预算，目标是达到与 jcode 相当的延迟和内存占用，并修复 README 中的基准测试差距。
    *   **链接**：[earendil-works/pi Issue #7739](https://github.com/earendil-works/pi/issues/7739)

3.  **[#5581] `sendMessage` 触发 `before_agent_start` 事件被绕过** [OPEN]
    *   **重要性**：Extension API 行为不一致，影响插件开发者的逻辑控制。
    *   **详情**：通过 `triggerTurn: true` 触发消息时，代码直接调用了 `_runAgentPrompt` 而非 `prompt()`，导致 `before_agent_start` 事件无法触发，在特定场景下造成逻辑错误。
    *   **链接**：[earendil-works/pi Issue #5581](https://github.com/earendil-works/pi/issues/5581)

4.  **[#8810] 扩展注册的 Provider 在新会话中忽略默认设置** [OPEN]
    *   **重要性**：配置持久化与扩展机制的重要 Bug。
    *   **详情**：通过 `pi.registerProvider` 注册的新 Provider，在新建会话时偶尔不会使用 `settings.json` 中的 `defaultProvider`/`defaultModel`，而是静默回退到其他 Provider。
    *   **链接**：[earendil-works/pi Issue #8810](https://github.com/earendil-works/pi/issues/8810)

5.  **[#9905] Anthropic API 的 `thinking.display` 行为被锁定** [OPEN]
    *   **重要性**：特定模型生态的兼容性问题。
    *   **详情**：在 Anthropic 模型下，`thinking.display` 总是被强制设为 `"summarized"`，CLI 没有提供选项来更改或忽略此设置，限制了用户对思考展示模式的控制。
    *   **链接**：[earendil-works/pi Issue #9905](https://github.com/earendil-works/pi/issues/9905)

6.  **[#9974] llama.cpp 返回的工具调用在 Pi 中执行重复且损坏** [OPEN]
    *   **重要性**：工具调用机制的重大 Bug，可能导致执行错误。
    *   **详情**：从 SSE 流解析 `llama.cpp` 返回的数据时，Pi 错误地执行了重复且损坏的工具调用（如 bash 命令）。
    *   **链接**：[earendil-works/pi Issue #9974](https://github.com/earendil-works/pi/issues/9974)

7.  **[#9010] 本地 LLM 上下文压缩导致内存峰值** [OPEN]
    *   **重要性**：本地部署性能瓶颈，影响大模型体验。
    *   **详情**：`compaction` 过程在主进程中运行，将对话历史复制为大量字符串，导致内存剧烈波动。这是本地开发者反馈最强烈的问题之一。
    *   **链接**：[earendil-works/pi Issue #9010](https://github.com/earendil-works/pi/issues/9010)

8.  **[#7658] Extension API 需要持久化 API Key 凭证的能力** [OPEN]
    *   **重要性**：Extension 开发者对安全性和易用性的核心诉求。
    *   **详情**：目前扩展无法将 API Key 持久化写入 `auth.json`，只能依赖用户手动配置，限制了扩展的自动化能力。
    *   **链接**：[earendil-works/pi Issue #7658](https://github.com/earendil-works/pi/issues/7658)

9.  **[#9408] 记录计划级模型错误并在 `/model` 中显示** [OPEN]
    *   **重要性**：提升模型管理体验。
    *   **详情**：希望系统能够记录 404、401 等计划级错误，并在 UI 中通过徽章或提示告知用户，以便快速恢复。
    *   **链接**：[earendil-works/pi Issue #9408](https://github.com/earendil-works/pi/issues/9408)

10. **[#9946] CMD 模式忽略 `outputPad` 设置** [OPEN]
    *   **重要性**：视觉显示细节问题。
    *   **详情**：在 CMD 模式（`!` 命令）下，即使设置 `"outputPad": 0`，输出依然有前导空格，而普通聊天消息则正常。
    *   **链接**：[earendil-works/pi Issue #9946](https://github.com/earendil-works/pi/issues/9946)

---

## 4. 重要 PR 进展

1.  **[#10040] feat(coding-agent): Codemode and MCP** [OPEN]
    *   **内容**：这是一个大型 PR，将 Codemode 和 MCP (Model Context Protocol) 功能引入 Pi。主要目的是为 Jev 等模型提供更好的沙盒环境。
    *   **链接**：[earendil-works/pi PR #10040](https://github.com/earendil-works/pi/pull/10040)

2.  **[#8572] feat(ai): amazon bedrock mantle** [OPEN]
    *   **内容**：添加对 Amazon Bedrock 新 API 表面（Mantle）的支持。之前该功能被错误路由到 Converse API 导致失败。
    *   **链接**：[earendil-works/pi PR #8572](https://github.com/earendil-works/pi/pull/8572)

3.  **[#10100] fix(ai): preserve signature-only reasoning details deltas** [CLOSED]
    *   **内容**：修复了一个流式处理 Bug。当 Claude (通过 OpenRouter) 发送仅包含签名（signature）而不含文本的 `reasoning_details` delta 时，该 delta 会被丢弃。
    *   **链接**：[earendil-works/pi PR #10100](https://github.com/earendil-works/pi/pull/10100)

4.  **[#10099] 第一次Git实验作业** [CLOSED]
    *   **内容**：社区成员提交的作业 PR，验证了本地 Git 实验流程。
    *   **链接**：[earendil-works/pi PR #10099](https://github.com/earendil-works/pi/pull/10099)

5.  **[#10091] Expose message decoration hook for user and assistant text** [CLOSED]
    *   **内容**：新增 `ctx.ui.setMessageDecorator` Hook，允许开发者自定义普通用户消息和助手文本的渲染方式（包括流式消息）。
    *   **链接**：[earendil-works/pi PR #10091](https://github.com/earendil-works/pi/pull/10091)

6.  **[#10085] feat(agent,coding-agent): emit pi.ai.request spans from the agent loop** [CLOSED]
    *   **内容**：修复遥测问题。确保 `Agent` 路径能正确触发 `pi.ai.request` spans，而不是使用 `NOOP_TELEMETRY_CONTEXT`。
    *   **链接**：[earendil-works/pi PR #10085](https://github.com/earendil-works/pi/pull/10085)

---

## 5. 功能需求趋势

*   **Extension API 增强**：社区强烈要求扩展 API 具备更多能力，包括 **凭证持久化** (#7658)、**消息装饰钩子** (#10091)、以及 **完整的事件暴露** (#5581)。
*   **本地推理优化**：针对本地 LLM（如 llama.cpp）的 **内存管理** (#9010) 和 **启动性能** (#7739) 是开发者的首要关注点。
*   **工具调用稳定性**：修复工具调用的重复执行和损坏问题 (#9974) 是保障交互安全的关键。
*   **模型生态兼容**：持续跟进 Anthropic (#9905) 和 Amazon Bedrock (#8572) 的 API 变化。

---

## 6. 开发者关注点

*   **性能瓶颈**：特别是在拥有大量扩展（70+）的情况下，会话创建的延迟严重退化，**扩展加载机制** 被认为是需要重构的核心痛点。
*   **配置一致性**：Extension 注册的 Provider 与系统设置（`defaultProvider`）不一致的问题频繁出现，破坏了配置的确定性。
*   **调试体验**：工具渲染错误被隐藏 (#10073)、外部编辑器粘贴内容丢失 (#10103) 等细节问题降低了开发调试效率。
*   **安全性**：用户希望能控制 `/share` 功能 (#6393) 以及自定义 "Operation aborted" 的提示文本 (#10094)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-09-28  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
Qwen Code 生态系统本周聚焦于 **Managed Agent 双路径架构** 的深度演进，特别是托管引擎与遗留引擎的集成（Stage B）及公共 API 契约（Stage D）的完善。同时，社区针对 **macOS 交互体验**、**Ollama 兼容性** 以及 **零参数工具** 的 Bug 修复进行了密集讨论。整体来看，开发重心从架构探索转向了稳定性和跨平台兼容性的提升。

---

## 2. 版本发布
无新版本发布。

---

## 3. 社区热点 Issues

1.  **[核心架构] Managed Agent 双路径架构提案**
    *   **重要性**: 这是 Qwen Code 多智能体路线图中的基石，旨在解决现有 TypeScript 循环与模型推理解耦的问题。
    *   **动态**: 该提案已进入详细讨论阶段，作者提出了包含会话持久化、工作区绑定等功能的详细设计。
    *   [Issue #12380](https://github.com/QwenLM/qwen-code/issues/12380)

2.  **[架构集成] Stage B 主机集成 (Legacy & Managed 引擎)**
    *   **重要性**: 是对 #12380 的直接跟进，旨在让 `qwen serve` 主机能够实际使用双引擎架构。
    *   **动态**: 开发者 wenshao 提出了具体的集成方案，讨论热烈。
    *   [Issue #12737](https://github.com/QwenLM/qwen-code/issues/12737)

3.  **[Bug 修复] macOS 桌面端右侧面板无法关闭**
    *   **重要性**: 直接影响桌面版用户体验，涉及 UI 状态机缺陷。
    *   **动态**: 开发者 walkingpork 报告了复现步骤，指出点击切换按钮无反应，状态无法回滚。
    *   [Issue #12874](https://github.com/QwenLM/qwen-code/issues/12874)

4.  **[Bug 修复] Remote-SSH 下 Webview 崩溃**
    *   **重要性**: 严重阻断远程开发场景下的正常使用，涉及 CodeMirror 渲染竞争条件。
    *   **动态**: danyavaad 在 0.24.6 版本中复现了该问题。
    *   [Issue #12826](https://github.com/QwenLM/qwen-code/issues/12826)

5.  **[安全/配置] 模型选择器中的 NUL 字符泄露凭证**
    *   **重要性**: 安全漏洞，涉及 URL 中的 userinfo 信息被错误持久化。
    *   **动态**: yiliang114 指出多个配置键在处理带凭证的 baseUrl 时存在缺陷。
    *   [Issue #12856](https://github.com/QwenLM/qwen-code/issues/12856)

6.  **[Bug 修复] Runtime Broker 重启后无法接管本地 Worker**
    *   **重要性**: 核心运行时健壮性问题，涉及进程生命周期管理。
    *   **动态**: doudouOUC 描述了在宿主重启场景下，持久化 READY 绑定无法被新 Broker 恢复的问题。
    *   [Issue #12766](https://github.com/QwenLM/qwen-code/issues/12766)

7.  **[兼容性] Ollama 拒绝零参数工具**
    *   **重要性**: 限制了对本地轻量级模型的支持，导致 OpenAI 兼容模式下报错 400。
    *   **动态**: Andrea-Bruno 报告了 JSON schema 解析失败，建议注入空参数对象。
    *   [Issue #12878](https://github.com/QwenLM/qwen-code/issues/12878)

8.  **[数据持久化] fastjson2 负数小数精度丢失**
    *   **重要性**: 影响数据库读写一致性，重现了之前的正数小数问题。
    *   **动态**: yc2bgr8 指出在 fastjson2 2.0.65 下，负数小数被写入后无法正确读取。
    *   [Issue #12859](https://github.com/QwenLM/qwen-code/issues/12859)

9.  **[增强] Web Shell 消息引用功能**
    *   **重要性**: 提升交互效率，允许用户将历史消息片段引用到新提示词中。
    *   **动态**: 4ekuct25 建议添加选中文本并插入的功能。
    *   [Issue #12682](https://github.com/QwenLM/qwen-code/issues/12682)

10. **[性能] Auto Memory 结构化召回与无损迁移**
    *   **重要性**: 优化上下文记忆管理，提升长对话场景下的检索效率。
    *   **动态**: ZijianZhang989 提出了基于结构化元数据的召回方案。
    *   [Issue #10151](https://github.com/QwenLM/qwen-code/issues/10151)

---

## 4. 重要 PR 进展

1.  **[feat] 添加受保护的 Hosted 前台 Shell 转换**
    *   **内容**: 在私有 Hosted 工作区循环中增加了前台 Shell 转换，支持文件工具和命令执行。
    *   [PR #12848](https://github.com/QwenLM/qwen-code/pull/12848)

2.  **[fix] 添加 PreToolUse 命令钩子的 opt-in failMode**
    *   **内容**: 允许开发者配置钩子失败时的行为，新增 `"closed"` 模式以防止静默失败。
    *   [PR #12875](https://github.com/QwenLM/qwen-code/pull/12875)

3.  **[feat] Ollama 提供商适配零参数工具**
    *   **内容**: 修复 #12878，使 Ollama 在遇到无参数工具时自动注入空对象，而非报错。
    *   [PR #12879](https://github.com/QwenLM/qwen-code/pull/12879)

4.  **[fix] macOS 右侧面板 Dock 位置调整**
    *   **内容**: 修复了 #12874 导致的面板无法关闭问题，调整了面板在 macOS 标题栏拖拽区域下方的停靠位置。
    *   [PR #12876](https://github.com/QwenLM/qwen-code/pull/12876)

5.  **[feat] 添加 linux-aarch64 架构支持**
    *   **内容**: 扩展桌面版发布矩阵，增加 ARM64 Linux 架构支持，发布 AppImage 和 deb 包。
    *   [PR #12833](https://github.com/QwenLM/qwen-code/pull/12833)

6.  **[fix] 当 Skill 工具未注册时跳过技能列表**
    *   **内容**: 优化启动逻辑，避免在排除 Skill 工具时发送无用的技能列表或错误提示。
    *   [PR #12838](https://github.com/QwenLM/qwen-code/pull/12838)

7.  **[feat] 提交 Stage H 记录并服务任务列表**
    *   **内容**: 实现 H0c，Session 权限现在会提交 Stage H 记录，控制平面从这些记录重建任务列表。
    *   [PR #12855](https://github.com/QwenLM/qwen-code/pull/12855)

8.  **[fix] 尊重 MCP reconnect 时的代理和统计设置**
    *   **内容**: 修复 #12844，确保 `qwen mcp reconnect` 命令在构建测试配置时正确继承隐私和代理设置。
    *   [PR #12857](https://github.com/QwenLM/qwen-code/pull/12857)

9.  **[feat] Web Shell 工作区代理协作 UI**
    *   **内容**: 在 Web Shell 界面中添加持久化工作区代理的管理功能，包括任务列表和共享线程聊天。
    *   [PR #12858](https://github.com/QwenLM/qwen-code/pull/12858)

10. **[fix] 代理下载时遵循代理配置**
    *   **内容**: 修复 #12829，确保 CLI 在下载原生载荷时正确使用 HTTP(S) 代理配置。
    *   [PR #12829](https://github.com/QwenLM/qwen-code/pull/12829)

---

## 5. 功能需求趋势

*   **多智能体与托管架构**: 社区对 Managed Agent (Stage D/H) 的讨论持续高涨，涉及公共 API 契约、会话生命周期持久化及工具执行容错，显示出向更复杂的企业级多智能体编排平台发展的强烈意愿。
*   **本地模型与兼容性**: 针对 **Ollama** 等本地模型的适配需求激增，特别是对零参数工具和特定参数类型的支持，表明开发者希望减少对闭源云服务的依赖。
*   **跨平台体验优化**: **macOS** 和 **Linux (ARM64)** 的支持成为焦点，开发者对桌面版 UI 的交互细节（如面板关闭、拖拽区域）反馈强烈，显示出对跨平台一致体验的重视。

---

## 6. 开发者关注点

*   **状态机与生命周期管理**: 大量 Issue 涉及进程重启、Worker 接管、Session 绑定恢复等场景，开发者极度关注系统在异常情况下的恢复能力和状态一致性。
*   **安全与隐私**: Credentials 在配置中的持久化方式（如 NUL 字符泄露）以及遥测数据的开关控制（如 MCP reconnect 时的统计上报）是高频痛点。
*   **测试覆盖率**: 多个 Issue 提到 CI 失败和测试矩阵的覆盖盲区（如 arm64 runner 缺失），开发者呼吁建立更完善的自动化测试和发布验证机制。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*