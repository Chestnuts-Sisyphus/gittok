# AI CLI 工具社区动态日报 2026-10-25

> 生成时间: 2026-10-24 22:07 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告**  
*数据截至 2026‑10‑25，来源：anthropics/skills（GitHub）*  

---  

## 1️⃣ 热门 Skills 排行（评论/关注度最高的 5‑8 条 PR）

| # | Skill（PR） | 功能概述 | 社区讨论热点 | 当前状态 |
|---|-------------|----------|--------------|----------|
| **#1245** | **notion‑spec‑to‑implementation**  & **quantitative‑resume‑auditor** | 将 Notion 中的产品/技术规格页面自动拆解为可执行的实现任务（Task‑list、验收标准、进度跟踪），并提供简历量化审计。 | - 如何让 Claude 在 Notion API 鉴权后安全访问企业内部页面<br>- 任务拆解的粒度与可验证性<br>- 与现有 **skill‑creator** 工作流的兼容性 | **OPEN** |
| **#1771** | **proofcore‑contract‑auditor** | 对 Solidity / Rust 智能合约做静态安全分析，并把审计证明写入 TON 区块链的零存储 Merkle 结构。 | - 零知识证明的性能基准<br>- 多链（以太坊、TON）兼容性<br>- 合约审计报告的可读性与可追溯性 | **OPEN** |
| **#1703** | **md2video‑audio** | 零成本将 Markdown 文档直接编译为带人声解说的 MP4 视频（Marp 幻灯 + TTS）。 | - TTS 语音质量与多语言支持<br>- 视频渲染时长 vs. 文档大小<br>- 与 **document‑typography** 的排版协同 | **OPEN** |
| **#525** | **pyxel** | 为 Python 的复古游戏开发框架 Pyxel 提供完整的创建、调试、帧检查与状态验证 Skill。 | - Headless 环境下的图形渲染<br>- 自动化回放与截图比对<br>- 与 **webapp‑testing** 的 UI 测试模型对接 | **OPEN** |
| **#514** | **document‑typography** | 对生成文档执行排版质量检查：孤字、寡行、编号错位等常见排版缺陷。 | - 检测算法的误报率<br>- 与 **docx** / **odt** 转换链的集成点<br>- 是否在多语言文档上保持一致 | **OPEN** |
| **#486** | **odt** | 支持 OpenDocument（.odt/.ods）文件的创建、模板填充、读取与 HTML 转换。 | - LibreOffice‑headless 的跨平台兼容性<br>- 大文件（>10 MB）转化的超时与错误处理<br>- 与 **docx**/ **pdf** Skill 的统一接口 | **OPEN** |
| **#1615** | **scnet‑hpc** | 通过 SSH 与 Slurm 管理 SCNet 高性能计算集群（配置、分区、模块、加速器等）。 | - 多租户凭证管理安全模型<br>- 作业提交、监控、自动重试策略<br>- 与 **mcp‑builder** 的评测管道对接 | **OPEN** |
| **#1997** | **skill‑creator YAML front‑matter parser fix** | 修正 `parse_skill_md` 在 YAML 标量解析时错误剥离引号、拼接换行，确保元数据与 SKILL.md 完全一致。 | - 评估/优化阶段的元数据丢失导致的触发失败<br>- 对所有已有 Skill 的向后兼容性检查 | **OPEN** |

> **说明**：以上 PR 均位于 Issues/PR 列表的前 20 条，且在社区中被频繁提及或有显著的功能创新，故视为“热门”。所有 PR 当前均为 **OPEN**（未合并），但已得到多位贡献者与维护者的关注。  

---  

## 2️⃣ 社区需求趋势（从 Issues 中提炼的热门方向）

| 需求方向 | 关键 Issue（评论数） | 主要诉求 |
|----------|----------------------|----------|
| **安全 & 信任边界** | #492（46 条评论） – “anthropic/” 命名空间的恶意冒充 | 需要官方机制（命名空间校验、签名或可信发布渠道）防止社区 Skill 冒充官方 Skill。 |
| **组织内部共享** | #228（17 条评论） – “组织范围的 Skill 共享” | 在 Claude.ai UI 中提供 Skill 库、共享链接或组织目录，免去手动下载/上传的繁琐流程。 |
| **评估与触发可靠性** | #556（13 条评论） – “run_eval.py 触发率 0%” | 改进 `run_eval.py` 与 Skill 触发检测逻辑，使自动评估能够真实反映 Skill 可用性。 |
| **内存/状态压缩** | #1329（10 条评论） – “compact‑memory” 提案 | 为长期运行的 Agent 提供紧凑的状态表示（符号化记忆），降低上下文消耗。 |
| **Skill 生命周期管理** | #62（10 条评论） – “Skill 突然消失” | 增强 Skill 上传/重命名后的持久化与版本追踪，防止用户意外丢失已创建的 Skill。 |
| **质量与安全审计** | #83（已合并） – “skill‑quality‑analyzer / skill‑security‑analyzer” | 期待更多自动化的质量/安全分析工具，帮助贡献者在提交前发现潜在缺陷。 |
| **推理质量把关** | #1385（6 条评论） – “Reasoning Quality Gate Pipeline” | 引入多阶段审查（校准 → 对抗评审 → 交付验证）管线，以提升 Agent 输出的可靠性。 |

> **趋势概括**：社区不仅在扩展技能的业务领域（文档、媒体、区块链、HPC 等），更迫切需要 **安全可信、协作共享、评估可观测** 的基础设施支撑。  

---  

## 3️⃣ 高潜力待合并 Skills（评论活跃、技术成熟、落地可能性大）

| PR | 亮点 | 预计落地时间（社区判断） |
|----|------|------------------------|
| **#1245** | 完整的 Notion 规格拆解工作流，已实现页面抓取、任务拆分与进度追踪。 | Q4 2026 |
| **#1771** | 首个面向 TON 链的零存储审计证明，填补区块链安全 Skill 空白。 | Q4 2026 |
| **#1703** | “Markdown → 视频” 已可本地单文件运行，符合零成本需求。 | Q4 2026 |
| **#525** | Pyxel 生态的首个官方 Skill，已通过内部游戏 demo 验证。 | Q4 2026 |
| **#514** | 排版质量检查已在多语言文档上通过单元测试。 | Q4 2026 |
| **#486** | ODT 读写兼容 LibreOffice，已通过跨平台 CI。 | Q4 2026 |
| **#1615** | SCNet HPC 连接脚本已对外发布，支持多租户凭证。 | Q1 2027 |
| **#1997** | 关键的 YAML 解析 bug 修复，直接影响所有 Skill 的评估与触发。 | 已提交评审，预计下周合并 |

> 这些 PR 已在社区内部形成较为明确的使用场景与需求，且大多数已通过 CI、单元测试或内部验证，具备快速合并的技术前提。  

---  

## 4️⃣ Skills 生态洞察（一句话总结）

> **当前社区在 Skills 层面的核心诉求是：在扩展业务场景（文档、媒体、区块链、HPC）同时，构建安全可信、组织可共享、评估可观测的基础设施，以提升 Skill 的可用性与治理水平。**  

---  

*报告编写者：Claude Code 生态技术分析师（2026‑10‑24）*  

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
**日期**: 2026-10-25
**来源**: github.com/github/copilot-cli

---

## 1. 今日速览

GitHub Copilot CLI 今日发布了 **v1.0.104-3** 版本，修复了 "fusion" 模型会话启动、后台任务等待超时等关键问题。社区讨论热度高涨，主要集中在 **后台任务超时**、**MCP 配置监控限制**、**代理环境下的语音功能** 以及 **Windows 平台兼容性** 等技术痛点上。

---

## 2. 版本发布

**v1.0.104-3** (最新发布)
*   **主要更新**:
    *   修复了 "fusion" 模型在 Auto 模式下的会话启动问题，并正确应用 `fusionTier` 设置。
    *   修复了交互式和 SDK 自动驾驶会话的行为：现在会正确等待后台任务完成，不再在 `COPILOT_TASK_WAIT_TIMEOUT_SECONDS` 后停止（除非显式指定 `-p --autopilot`）。

---

## 3. 社区热点 Issues (Top 10)

1.  **Issue #5223: Interactive autopilot stops after 600s while a background subagent is still running (regression in 1.0.102)**
    *   **重要性**: 🔴 严重回归
    *   **摘要**: 自 1.0.102 起，当后台子代理运行超过 600 秒时，交互式自动驾驶会话会强制停止，导致任务未完成。
    *   **社区反应**: 1 个评论，反馈具体版本号及现象。

2.  **Issue #5242: Sessions stop processing when MCP config watch registration hits the inotify limit (ENOSPC)**
    *   **重要性**: 🔴 系统资源限制
    *   **摘要**: 在 Linux 容器或共享主机环境下，当系统 `inotify` 监控数量达到上限时，MCP 配置无法注册，导致会话队列被废弃，后续会话停止处理。
    *   **社区反应**: 0 评论。

3.  **Issue #5245: No STT models behind a corporate proxy since 1.0.101 (Foundry runtime ignores proxy settings)**
    *   **重要性**: 🔴 企业环境阻碍
    *   **摘要**: 自 1.0.101 起，在通过 HTTP 代理（带 TLS 检查）的企业网络中，语音识别（STT）模型无法使用，Foundry 运行时忽略了代理设置。
    *   **社区反应**: 0 评论。

4.  **Issue #5229: ACP mode: expired MCP OAuth access token opens the browser authorization page instead of using the stored refresh token**
    *   **重要性**: 🔴 用户体验问题
    *   **摘要**: 在 ACP 模式下，当 MCP 服务器的 OAuth 访问令牌过期时，CLI 直接跳转到浏览器授权页，而不是自动使用存储的刷新令牌。
    *   **社区反应**: 0 评论。

5.  **Issue #5205: Context window rollover fails: "checkpoint.md is absent for this agent; write it before requesting rollover"**
    *   **重要性**: 🟡 长会话稳定性
    *   **摘要**: 长时间运行的代理会话在上下文窗口填满尝试回滚时崩溃，报错缺少 `checkpoint.md`。
    *   **社区反应**: 1 个评论。

6.  **Issue #5244: Sub-agent detail view in /tasks does not allow expanding tool calls**
    *   **重要性**: 🟡 可观测性
    *   **摘要**: 在 `/tasks` 视图中，无法展开子代理的详情以查看工具调用情况，虽然主会话时间轴支持展开，但子代理详情视图不支持。
    *   **社区反应**: 0 评论。

7.  **Issue #5246: Editing prompt to start with `!` traps user in Shell mode**
    *   **重要性**: 🟡 UX 交互 Bug
    *   **摘要**: 在输入框编辑文本导致以 `!` 开头时，会误触发 Shell 模式，导致用户无法正常退出。
    *   **社区反应**: 0 评论。

8.  **Issue #5243: Subagents started in the same turn as an approved exit_plan_mode get none of the built-in tools (regression after 1.0.95)**
    *   **重要性**: 🔴 核心功能回归
    *   **摘要**: 在 1.0.95 之后，如果在批准 `exit_plan_mode` 的同一回合启动子代理，这些子代理将无法使用任何内置工具（如 bash, view, create 等）。
    *   **社区反应**: 0 评论。

9.  **Issue #5249: Model-Facing `skill()` Tool Registers Plugin Skills Under Bare Names Unless the Name Collides, So `plugin:skill` Fails**
    *   **重要性**: 🟡 插件开发/兼容性
    *   **摘要**: 模型侧的 `skill()` 工具注册插件技能时使用裸名称，导致 `/plugin:skill` 命令无法被识别，除非存在名称冲突。
    *   **社区反应**: 0 评论。

10. **Issue #4381: Bug: Notification badge count persists after all notifications cleared (Windows)**
    *   **重要性**: 🟡 Windows 平台体验
    *   **摘要**: Windows 桌面应用的通知徽章在清除所有通知后仍然存在。
    *   **社区反应**: 1 个评论。

---

## 4. 重要 PR 进展 (Top 10)

*   **无新 Pull Requests 更新** (过去24小时内无 PR 动态)

---

## 5. 功能需求趋势

根据今日更新的 Issues，社区关注的功能方向主要集中在：

1.  **后台任务管理与超时控制**: 多个 Issue (#5223, #4946, #1616) 报告了后台任务处理、令牌消耗和超时机制的 Bug，显示出用户对长时间运行复杂任务的稳定性需求。
2.  **MCP 与扩展生态**: 关于 MCP 配置文件监控限制 (#5242)、插件工具注册 (#5249) 以及 OAuth 令牌刷新 (#5229) 的问题表明，社区正在深入使用 MCP 协议进行插件开发，对扩展机制的健壮性有较高要求。
3.  **企业级环境支持**: 代理设置 (#5245) 和 Assisted Permissions (#4802) 相关的问题，反映出用户在受限网络环境下的使用痛点。
4.  **终端渲染与交互体验**: 关于输入框位置 (#5227) 和 Shell 模式误触 (#5246) 的反馈，表明用户对长时间会话的舒适度和易用性非常关注。

---

## 6. 开发者关注点

*   **Linux 容器/共享主机环境**: `inotify` 监控上限问题可能导致服务在容器化部署时完全失效，这是一个需要系统级配置调整的痛点。
*   **企业代理环境**: 语音识别功能的代理兼容性问题限制了 Copilot CLI 在大型企业的普及。
*   **会话恢复与状态管理**: `--resume` 命令在无 ID 情况下的行为异常 (#5228) 以及上下文窗口回滚 (#5205) 是长会话场景下的关键稳定性问题。
*   **Windows 平台兼容性**: PowerShell 版本自动更新 (#5247) 和通知徽章残留 (#4381) 影响了 Windows 用户的体验。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-10-25
**来源**: anomalyco/opencode

---

## 1. 今日速览
近期社区活跃度较高，主要集中在 **免费额度限制 Bug** 的修复与优化。多起关于“免费额度异常”和“速率限制”的问题引发了大量关注，反映出 API 配额管理机制存在不稳定因素。同时，桌面端功能增强（系统托盘、媒体 Blob 存储）与后端性能优化（缓存机制、连接预热）是开发团队的重点推进方向。

---

## 2. 版本发布
**无最新 Releases**。

---

## 3. 社区热点 Issues

**🚨 关键 Bug 修复**
*   **#58536**: 用户在控制台显示 0 使用量时，仍被提示“免费额度已用尽”。这是导致免费用户无法使用的核心阻塞问题。
*   **#58781**: OpenCode Desktop 1.19.4 版本突然导致所有免费模型失效，用户无法继续使用免费服务，社区反应强烈。
*   **#58724**: 会话手动压缩时若缺少 `recent` 字段，会导致会话永久损坏且无法恢复，属于严重的 Session 数据一致性 Bug。

**⚡ 性能与稳定性**
*   **#52925**: CLI `opencode api get` 命令在通过管道传输时输出被截断，导致 JSON 解析失败，影响自动化脚本使用。
*   **#58354**: Shell 工具输出包含 NUL (空字节) 时会导致服务崩溃，属于输入验证缺失导致的稳定性问题。

**🎨 用户体验优化**
*   **#58516**: Windows 用户请求添加系统托盘图标和退出按钮，以便能便捷地停止后台服务，无需打开任务管理器。
*   **#58762**: Web 应用显示本地图片时，错误地将图片所在的父文件夹注册为项目根目录，可能引发路径解析混乱。
*   **#58764**: Desktop 版本中，选择 Agent 后会全局生效，导致不同项目无法使用各自的默认 Agent。

**🔧 配置与集成**
*   **#58766**: ACP 桥接实现 `_session/steering` 扩展，以支持 Zed、Codeg 等编辑器的交互模式。
*   **#58533**: 自定义 Provider 对话框写入 V1 格式配置，导致 V2 服务器无法识别，功能失效。

> 更多详情请查看 [GitHub Issues](https://github.com/anomalyco/opencode/issues)

---

## 4. 重要 PR 进展

**🚀 性能优化**
*   **#58798**: 核心工具 Schema 仅转换一次并复用，大幅减少 CPU 消耗（特别是在长时间会话中）。
*   **#58616**: 通过元数据指纹缓存 `git` 发现过程，将重复查找耗时从 21ms 降低至 0.35ms。
*   **#58800**: 检测集成列表变更，仅在必要时重建，减少不必要的资源加载。
*   **#58803**: 在提示准入阶段预热模型提供者连接，避免每次请求时重复进行 DNS/TLS 握手。

**🛠️ 功能开发**
*   **#58656 / #58741 / #58742 / #58657 / #58743**: **媒体 Blob 存储**。重构了媒体附件的处理方式，将图片转为 `media:<hash>` 引用存储在独立表中，并实现离线回填和实验性 API 端点，旨在支持长会话中的截图存储。
*   **#57917**: 使插件激活预算可配置，避免因等待插件加载导致的 5 秒超时问题。

**🐛 Bug 修复**
*   **#51044**: 修复 TUI 中会话在其他窗口被删除时，当前标签页未同步关闭的问题。
*   **#51040**: 修复 Meta API 对工具 Schema 嵌套深度的限制，防止请求被拒绝。
*   **#58804**: 修复本地图片读取时错误设置 Session Location 的问题。

> 更多详情请查看 [GitHub Pull Requests](https://github.com/anomalyco/opencode/pulls)

---

## 5. 功能需求趋势

*   **IDE 集成深度**: 社区对 Zed、Neovim 等编辑器的 ACP (Agent Communication Protocol) 集成支持非常关注，如 `#58766` 和 `#58527`。
*   **桌面端体验**: Windows/macOS 用户频繁反馈桌面应用的后台服务管理（托盘、退出）以及项目隔离问题。
*   **数据处理**: 随着会话变长，对媒体附件（截图、图片）的高效存储和检索需求日益增加（PR #58656 系列）。
*   **稳定性与性能**: 减少 JSON Schema 转换开销、优化 Git 仓库扫描速度以及修复并发请求导致的数据损坏是高频优化点。

---

## 6. 开发者关注点

*   **免费额度管理**: 多位用户反馈免费模型的使用限制机制存在误判（如 #58781, #58713），这是目前最影响用户体验的痛点。
*   **CLI 工具健壮性**: `opencode api get` 的输出截断问题直接影响了依赖该 CLI 的自动化工具链，需要尽快修复。
*   **配置兼容性**: V1 与 V2 配置格式的混淆（#58533）以及权限规则匹配的拼写敏感问题（#58775），增加了用户配置的门槛。
*   **会话数据持久化**: 会话压缩后的数据损坏风险以及插件加载的超时问题，都指向了核心数据层和集成层的稳定性建设。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-10-25  
**来源**: [badlogic/pi-mono](https://github.com/badlogic/pi-mono)

---

## 1. 今日速览
今日 Pi 社区呈现**性能优化与多模型支持并行**的态势。**openai-codex** 的连接可靠性与 TUI 渲染性能（尤其是长会话下的 CPU 占用）引发广泛讨论；同时，**Google Vertex AI** 与 **DeepInfra** 等云服务商的集成 PR 正在快速推进，标志着 Pi 在模型生态上的持续扩张。

---

## 2. 版本发布
无新版本发布。

---

## 3. 社区热点 Issues (Top 10)

| # | 标题 | 重要性 | 状态 | 社区反应 |
|---|------|--------|------|----------|
| **#4945** | openai-codex Connection Reliability Issues | 🔴 高 | Open | **88 评论**。交互式 TUI 卡死、流式输出中断，严重影响使用体验，开发者呼吁修复。 |
| **#7730** | High CPU usage on Mac OS with long session | 🟠 中 | Open | **22 评论**。长会话下 CPU 占用飙升至 110%，可能与上下文长度或渲染机制有关。 |
| **#6665** | TUI pins a full core while streaming | 🟠 中 | Open | **15 评论**。渲染循环中的 `Intl.Segmenter` 未缓存导致单核满载，长会话卡顿主因。 |
| **#8643** | Bedrock: OpenAI models reject images nested in toolResult.content | 🟠 中 | Open | **14 评论**。图像在工具结果中的嵌套格式与 OpenAI 兼容性冲突，需调整 payload 结构。 |
| **#8810** | Extension-registered providers ignore defaults | 🟠 中 | Open | **9 评论**。扩展注册的默认提供者被忽略，导致新会话意外切换到其他模型。 |
| **#10157** | Gemini tool-call thought signatures dropped | 🟠 中 | Open | **8 评论**。通过 Google AI Studio 连接时，工具调用的思考签名丢失。 |
| **#9265** | O(n²) tool-call argument re-parsing freezes event loop | 🟠 中 | Closed | **7 评论**。流式处理中重复解析 JSON 导致性能问题，已修复。 |
| **#10390** | Anthropic SSE parser mishandles CRLF split across chunks | 🟠 中 | Open | **6 评论**。网络分块导致的换行符解析错误引发 JSON 解析失败。 |
| **#11157** | Extensions at `session_start` turn every session into legacy | 🟠 中 | Open | **3 评论**。`pi-memory` 等扩展在会话启动时插入消息，破坏了 Anthropic 的系统消息结构。 |
| **#11221** | Pi doesn't pick up refreshed AWS credentials | 🟠 中 | Open | **2 评论**。长时间运行的会话无法刷新 AWS 凭证，导致 `ExpiredTokenException`。 |

---

## 4. 重要 PR 进展 (Top 10)

| # | 标题 | 类型 | 状态 | 关键内容 |
|---|------|------|------|----------|
| **#11370** | feat(ai,coding-agent): add DeepInfra, Nebius, Ollama Cloud, Scaleway, SiliconFlow, and StepFun providers | 功能 | Open | 新增 6 家云服务商支持，覆盖 74+ 模型，为用户提供更多低成本推理选择。 |
| **#11369** | feat(ai): add Alibaba Model Studio and Z.AI pay-as-you-go providers | 功能 | Open | 整合阿里云与智谱 AI，支持国际与国内双端 API 密钥配置。 |
| **#11371** | feat(ai): serve Claude models on Google Vertex AI | 功能 | Open | 通过 Vertex AI Anthropic Messages API 代理 13 个 Claude 模型。 |
| **#11372** | fix(ai): route Bedrock Mantle models correctly | 修复 | Open | 修复 Bedrock Mantle 端点上的模型路由，解决 GPT-5.4~6.1 等模型返回 400 错误的问题。 |
| **#11368** | feat(ai): refactor provider definitions | 重构 | Open | 基于模型定义重构提供者结构，统一模型家族规则，提升可维护性。 |
| **#11355** | fix(ai): support Kimi Coding K3.1 Pro models | 修复 | Open | 适配月之暗面 K3.1 Pro 模型，支持推理强度配置与动态工具加载。 |
| **#9329** | fix(tui): detect Orca terminals as Kitty-image capable | 修复 | Open | 在 Orca 终端中启用 Kitty 风格的内联图像渲染与真彩色支持。 |
| **#11363** | Add fullscreenCopyTarget setting for primary selection buffer | 优化 | Closed | 新增配置项，允许通过中键粘贴（Primary Buffer）替代剪贴板复制。 |
| **#10135** | fix(coding-agent): normalise compaction usage to prevent footer crash | 修复 | Closed | 修复会话恢复时底部栏崩溃问题，规范化压缩数据的持久化。 |
| **#11341** | fix(coding-agent): exit with clear error for unusable proxy URLs | 修复 | Closed | 增强代理 URL 校验，对无效的 `socks5h` 或无路径 URL 提供明确的启动错误提示。 |

---

## 5. 功能需求趋势

1. **长会话性能优化**：TUI 渲染与 Markdown 解析（特别是 `Intl.Segmenter`）的性能瓶颈是当前最集中的讨论点，涉及 CPU 占用与滚动/打字延迟。
2. **多模型云服务集成**：社区对 DeepInfra、Nebius、Alibaba 等新增提供商的 PR 响应积极，反映了用户对模型生态多样性的需求。
3. **扩展兼容性**：`session_start` 钩子对系统消息结构的破坏、扩展注册的默认配置失效等问题，凸显了扩展生态的稳定性挑战。

---

## 6. 开发者关注点

- **可靠性**：openai-codex 的 WebSocket 断线重连与 SSE 回退机制尚未完善。
- **资源管理**：长会话下的内存与 CPU 释放机制（如凭证刷新、会话压缩）仍需改进。
- **终端适配**：Alacritty 等 IME 多字符提交的兼容性问题影响中文用户输入体验。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-10-25  
**来源：** github.com/QwenLM/qwen-code

---

## 1. 今日速览
Qwen Code 0.26.1 版本已发布，主要修复了会话隔离和桌面端更新流程的稳定性问题。社区在 CI/CD 容量管理、Kubernetes 工具运行时以及多工作区内存管理等方面持续投入开发。同时，针对工具调用丢失、Web Shell 国际化兼容性等关键 Bug 的修复和讨论也在进行中。

---

## 2. 版本发布

### v0.26.1 (2026-10-25)
本次更新修复了 `qqbot` 模块在多线程作用域下的会话隔离问题，确保了跨群组会话的稳定性。此外，桌面端应用更新流程得到优化，防止了更新安装期间运行时 daemon 的资源冲突。

*   **下载链接:** [GitHub Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.1)
*   **相关 PR:** [#13882](https://github.com/QwenLM/qwen-code/pull/13882)

---

## 3. 社区热点 Issues

以下是过去 24 小时内更新且评论数较多的 10 个重要 Issue：

1.  **#13395: Kubernetes 工具运行时进度与跨平台交付**
    *   **重要性:** 核心功能路线图。开发者报告了 Kubernetes 工具运行时（Runtime）在跨平台交付中的验收进展，涉及根因修复和 ACK 复测。
    *   **状态:** 进行中 (OPEN)
    *   **链接:** [Issue #13395](https://github.com/QwenLM/qwen-code/issues/13395)

2.  **#15446: CI 失败 - Managed Agent Gate**
    *   **重要性:** 基础设施稳定性。主分支 CI 在托管代理门禁测试中持续失败，影响了代码提交的验证流程。
    *   **状态:** 待分类 (OPEN)
    *   **链接:** [Issue #15446](https://github.com/QwenLM/qwen-code/issues/15446)

3.  **#14859: CI 容量追踪与独立验证**
    *   **重要性:** 开发效率。旨在解决 CI 运行器容量不足导致主分支验证机会丢失的问题，确保 PR 合并质量。
    *   **状态:** 进行中 (OPEN)
    *   **链接:** [Issue #14859](https://github.com/QwenLM/qwen-code/issues/14859)

4.  **#13113: 会话无法打开 - 转录快照过大**
    *   **重要性:** 严重 Bug。长会话导致 `.jsonl` 转录文件指数级增长，触及硬编码的 256 MiB 限制，导致会话完全无法加载。
    *   **状态:** 准备人工处理 (OPEN)
    *   **链接:** [Issue #13113](https://github.com/QwenLM/qwen-code/issues/13113)

5.  **#15297: 0.26.0 工具输出丢失**
    *   **重要性:** 严重 Bug。约 1/40 的工具调用结果被静默丢弃，虽然代码修改已应用，但需要复测确认。
    *   **状态:** 准备人工处理 (OPEN)
    *   **链接:** [Issue #15297](https://github.com/QwenLM/qwen-code/issues/15297)

6.  **#15056: 本地 `/autofix-pr` 命令功能请求**
    *   **重要性:** 生产力工具。社区希望增加一个本地命令，自动监控 PR 并修复 CI 失败、解决冲突，实现“一键修复”。
    *   **状态:** 准备人工处理 (OPEN)
    *   **链接:** [Issue #15056](https://github.com/QwenLM/qwen-code/issues/15056)

7.  **#15479: 自动内存与多工作区支持**
    *   **重要性:** 范围管理。Auto-memory 默认绑定启动目录，导致多项目工作区无法正确保存记忆到各自的项目存储中。
    *   **状态:** 准备人工处理 (OPEN)
    *   **链接:** [Issue #15479](https://github.com/QwenLM/qwen-code/issues/15479)

8.  **#15445: Web Shell 非英语浏览器兼容性**
    *   **重要性:** 用户体验。Web Shell 在非英语浏览器下完全无法加载，控制台报错 `desktopRelay i18n lookup`。
    *   **状态:** 需要重测 (OPEN)
    *   **链接:** [Issue #15445](https://github.com/QwenLM/qwen-code/issues/15445)

9.  **#10879: 发布主机竞争 PR CI 资源**
    *   **重要性:** 资源调度。发布流程与 PR CI 共享托管运行器资源，导致发布队列阻塞。
    *   **状态:** 准备人工处理 (OPEN)
    *   **链接:** [Issue #10879](https://github.com/QwenLM/qwen-code/issues/10879)

10. **#13895: 模型回退链错误分类**
    *   **重要性:** 错误处理。当 Provider 返回 429 错误且 `error.code` 不在预定义列表时，模型回退链被跳过，导致 Fail-Fast。
    *   **状态:** 需要讨论 (OPEN)
    *   **链接:** [Issue #13895](https://github.com/QwenLM/qwen-code/issues/13895)

---

## 4. 重要 PR 进展

以下是过去 24 小时内更新且值得关注的 PR：

1.  **#15473: 桌面端更新前停止运行时**
    *   **内容:** 修复 Windows 下更新安装时，daemon 仍持有 Node 二进制映射的问题，确保更新安全。
    *   **链接:** [PR #15473](https://github.com/QwenLM/qwen-code/pull/15473)

2.  **#15482: 序列化重叠清理重试**
    *   **内容:** 修复 Session 后台清理逻辑，防止多个重叠的重试请求并发执行导致状态不一致。
    *   **链接:** [PR #15482](https://github.com/QwenLM/qwen-code/pull/15482)

3.  **#15384: 保留 OpenTUI 会话回放与倒带**
    *   **内容:** 增强 CLI 体验，确保恢复的 OpenTUI 会话能保留文本、图像和工具结果，并支持对话倒带。
    *   **链接:** [PR #15384](https://github.com/QwenLM/qwen-code/pull/15384)

4.  **#15368: 匹配绑定索引预算的内存建议**
    *   **内容:** 优化内存索引溢出时的用户提示，使其与绑定行和字符预算保持一致，提供更精准的诊断。
    *   **链接:** [PR #15368](https://github.com/QwenLM/qwen-code/pull/15368)

5.  **#15361: 通过 Git URL 创建工作区**
    *   **内容:** Web Shell 新增功能，允许用户直接粘贴 Git URL 克隆代码并创建工作区，无需离开浏览器。
    *   **链接:** [PR #15361](https://github.com/QwenLM/qwen-code/pull/15361)

6.  **#15289: 将 SDK Java 测试移出主机锁**
    *   **内容:** 通过本地 Maven 仓库缓存优化 Java 测试流程，消除自我托管运行器上的全局锁竞争。
    *   **链接:** [PR #15289](https://github.com/QwenLM/qwen-code/pull/15289)

7.  **#15161: 提议 Managed MCP 实时选择容量**
    *   **内容:** 针对 MCP（Model Context Protocol）连接管理进行优化，提议限制历史连接数并启用活跃连接数。
    *   **链接:** [PR #15161](https://github.com/QwenLM/qwen-code/pull/15161)

8.  **#14231: 模型端点白名单与内置认证**
    *   **内容:** 新增 `model.allowedBaseUrls` 设置，允许开发者精确控制模型端点的访问权限。
    *   **链接:** [PR #14231](https://github.com/QwenLM/qwen-code/pull/14231)

9.  **#15455: 恢复模块与 CLI 路线 (已关闭)**
    *   **内容:** 修复 #15448 导致的 Managed Agent 模块和 CLI 测试失败，更新了 schema 测试的预期列数。
    *   **状态:** 已合并
    *   **链接:** [PR #15455](https://github.com/QwenLM/qwen-code/pull/15455)

10. **#14129: 跳过未改变的 Hook 上下文注入**
    *   **内容:** 优化 Hook 机制，当 `additionalContext` 未变化时跳过重复注入，减少不必要的消息体膨胀。
    *   **链接:** [PR #14129](https://github.com/QwenLM/qwen-code/pull/14129)

---

## 5. 功能需求趋势

从 Issues 和 PR 中提取出的主要关注方向：

*   **自动化与自我修复:** 社区对自动化修复 CI 失败、解决冲突的本地工具（如 `/autofix-pr`）需求强烈。
*   **资源调度与隔离:** 多工作区场景下的内存管理（#15479）和 CI 运行器容量分配（#14859）是架构层面的重要挑战。
*   **Web Shell 能力增强:** 从基础的会话管理向更复杂的 Git 集成（#15361）和 Auto Memory 可视化（#14230）扩展。
*   **工具调用可靠性:** 工具结果的完整性（#15297）和模型回退策略（#13895）是提升 Agent 稳定性的关键。

---

## 6. 开发者关注点

*   **CI/CD 稳定性:** 多个 Issue 聚焦于 CI 失败的根因分析和资源竞争问题，说明基础设施维护是团队当前的重点。
*   **多语言支持:** Web Shell 的国际化缺失（#15445）提醒团队在国际化（i18n）方面存在盲区，需要增加 fallback 机制。
*   **长生命周期会话管理:** 如何处理无限增长的会话数据（#13113）和跨会话的上下文共享，是提升用户体验的核心痛点。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*