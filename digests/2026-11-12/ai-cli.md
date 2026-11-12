# AI CLI 工具社区动态日报 2026-11-12

> 生成时间: 2026-11-12 01:44 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告（截至 2026‑11‑12）**  

---

## 1. 热门 Skills 排行（评论/关注度最高 5‑8 条 PR）

| 排名 | PR 编号 & 链接 | Skill 名称 / 功能 | 讨论焦点 | 当前状态 |
|------|----------------|-------------------|----------|----------|
| 1 | **#1742** – <https://github.com/anthropics/skills/pull/1742> | **mcp‑builder** – 支持 `mcp>=2` 的 `streamable_http_client` 导入及自定义 HTTP 头部 | 迁移兼容性（旧 `streamablehttp_client` → `streamable_http_client`）<br>如何在多租户环境下安全注入自定义 Header | **OPEN** |
| 2 | **#1298** – <https://github.com/anthropics/skills/pull/1298> | **skill‑creator** – 隔离 trigger 评估、兼容 Windows、避免运行时失败 | Windows 子进程 `select()` 不稳定导致误报<br>触发评估的误判率与性能回归 | **OPEN** |
| 3 | **#1245** – <https://github.com/anthropics/skills/pull/1245> | **notion‑spec‑to‑implementation** / **quantitative‑resume‑auditor** | 将 Notion 规格页自动拆解为可执行的任务清单<br>简历量化评估的指标体系与可解释性 | **OPEN** |
| 4 | **#1980** – <https://github.com/anthropics/skills/pull/1980> | **webapp‑testing** – `with_server.py` 去除 `shell=True` | 防止命令注入（CWE‑78）<br>安全审计与运行时隔离 | **OPEN** |
| 5 | **#1792** – <https://github.com/anthropics/skills/pull/1792> | **docx – accept_changes** | 超时检测与输出验证，确保 LibreOffice 真正完成修改接受 | 稳健性提升，避免假阳性成功报告 | **OPEN** |
| 6 | **#1771** – <https://github.com/anthropics/skills/pull/1771> | **proofcore‑contract‑auditor** | 自动化 Solidity / Rust 合约静态分析并在 TON 链上写入 Merkle 证明 | Web3 开发者安全审计需求，零存储证明的实现细节 | **OPEN** |
| 7 | **#1703** – <https://github.com/anthropics/skills/pull/1703> | **md2video‑audio** | Markdown → MP4 视频（含人声配音）零成本生成 | 内容创作流水线自动化、渲染质量与音色可定制 | **OPEN** |
| 8 | **#525** – <https://github.com/anthropics/skills/pull/525> | **pyxel** – 复古游戏开发调试 | 帮助用户在 Claude 中编写、运行、检查 Pyxel 游戏帧 | 游戏开发教学与快速原型验证 | **OPEN** |

> **为何列入“热门”**：这些 PR 在社区讨论区（Issue‑PR 关联、内部 PR 评论、赞 👍）出现了大量技术细节争议或需求呼声，且涉及的功能直接影响到安全、跨平台兼容、生产力提升等核心痛点。

---

## 2. 社区需求趋势（从 Issues 提炼）

| 需求方向 | 代表 Issue（链接） | 关键诉求 |
|----------|-------------------|----------|
| **安全与信任边界** | #492 – <https://github.com/anthropics/skills/issues/492>（46 条评论） | 防止社区技能冒充官方 `anthropic/` 命名空间；需要命名/签名机制或审核流程。 |
| **组织级技能共享** | #228 – <https://github.com/anthropics/skills/issues/228>（17 条评论） | 在 Claude.ai 中提供组织内部的技能库/共享链接，降低手动分发成本。 |
| **技能触发率 & 评估框架** | #556 – <https://github.com/anthropics/skills/issues/556>（13 条评论）<br>#1352 – <https://github.com/anthropics/skills/issues/1352>（6 条评论） | `run_eval.py` 在并行模式下几乎不触发，导致误判；需要更可靠的触发检测与评估基准。 |
| **上下文/令牌管理** | #1487 – <https://github.com/anthropics/skills/issues/1487>（5 条评论） | `claude‑api` skill 在单次调用中注入 156k 令牌，耗尽上下文窗口；需要增量注入或流式设计。 |
| **文档/排版质量** | #514 – <https://github.com/anthropics/skills/pull/514>（文档排版控制）<br>#189 – <https://github.com/anthropics/skills/issues/189>（6 条评论） | 防止重复 skill、提升排版美观（孤行、寡句、编号对齐）。 |
| **用户账户可维护性** | #1143 – <https://github.com/anthropics/skills/issues/1143>（5 条评论） | 允许更改账号邮箱，防止因企业邮箱失效导致工作流中断。 |
| **新型记忆/状态压缩** | #1329 – <https://github.com/anthropics/skills/issues/1329>（10 条评论） | **compact‑memory**：为长时运行的 Agent 提供符号化、压缩的记忆表示。 |
| **质量把关流水线** | #1385 – <https://github.com/anthropics/skills/issues/1385>（7 条评论） | 引入“推理质量门”三阶段审查（校准 → 对抗审查 → 交付验证）以提升产出可靠性。 |

**整体趋势**：社区在 **安全/信任、协作共享、评估可靠性、上下文效率** 四大块有最强烈诉求，同时对 **文档质量、记忆压缩、质量把关** 表现出探索欲。

---

## 3. 高潜力待合并 Skills（评论活跃、尚未合并）

| PR 编号 & 链接 | Skill | 关键价值 | 预计落地时间（基于社区热度） |
|----------------|-------|----------|------------------------------|
| #1742 – <https://github.com/anthropics/skills/pull/1742> | **mcp‑builder**（兼容 `mcp>=2`） | 解决新版 MCP API 兼容性，降低升级成本 | 1‑2 周（已进入最后审查） |
| #1298 – <https://github.com/anthropics/skills/pull/1298> | **skill‑creator**（Windows / trigger 隔离） | 提升跨平台可靠性，减少误触发 | 2‑3 周（需通过安全审计） |
| #1245 – <https://github.com/anthropics/skills/pull/1245> | **notion‑spec‑to‑implementation** | 自动把产品规格转为实现任务，助力需求落地 | 3‑4 周（文档完善中） |
| #1980 – <https://github.com/anthropics/skills/pull/1980> | **webapp‑testing**（去除 `shell=True`） | 安全加固，消除潜在注入风险 | 已准备合并，预计 1 周内 |
| #1792 – <https://github.com/anthropics/skills/pull/1792> | **docx accept_changes** | 增强文档审阅自动化的可靠性 | 1 周（等待 CI 通过） |
| #1703 – <https://github.com/anthropics/skills/pull/1703> | **md2video‑audio** | 内容创作“一键”视频化，提升生产力 | 2‑3 周（需 UI/CLI 细化） |
| #525 – <https://github.com/anthropics/skills/pull/525> | **pyxel** | 为游戏开发者提供完整调试/验证工作流 | 2 周（已通过基本测试） |

> **合并优先级建议**：先处理安全类（#1742、#1980、#1792），随后是跨平台/可靠性（#1298），最后是提升生产力的创新 skill（#1245、#1703、#525）。

---

## 4. Skills 生态洞察

> **一句话总结**：社区当前最集中的诉求是 **“在保证安全与可审计的前提下，提升跨平台可靠性并实现高效、自动化的工作流与文档/内容生成”。**

--- 

*本报告基于截至 2026‑11‑12 的公开 PR 与 Issue 数据编制，供内部产品规划与社区运营参考。*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：** 2026-11-12  
**数据来源：** GitHub (openai/codex)

---

## 1. 今日速览
今日 OpenAI Codex 仓库迎来了多个 Alpha 版本的发布，主要聚焦于 **Google Cloud Vertex AI 工具声明的增量更新** 功能。社区活跃度较高，Windows 平台相关的环境沙箱、权限管理及 UI 启动问题占据 Issue 评论区前列，反映了桌面客户端在复杂权限场景下的稳定性仍需加强。同时，MCP (Model Context Protocol) 相关的配置持久化与 OAuth 机制修复也是今日 PR 的重点。

---

## 2. 版本发布

### rust-v0.170.0-alpha.2
*   **状态：** Release
*   **摘要：** 最新 Alpha 版本发布，主要包含对 Google Cloud Vertex AI 的工具调用优化。

### rust-v0.167.2
*   **状态：** Release
*   **摘要：** **新增功能：** Codex 现在默认通过 Google Cloud Vertex AI 增量发送工具更新。用户可在 `config.toml` 的 `[features]` 部分设置 `incremental_tools_legacy_gcp = false` 以关闭此功能。

---

## 3. 社区热点 Issues

1.  **#56655: VS Code 扩展启动失败**
    *   **重要性：** 🔴 高危
    *   **摘要：** Windows 用户升级到特定版本（26.51021.22027）后，VS Code 扩展无法启动，错误代码为 26.51021.22027。
    *   **社区反应：** 88 个评论，86 个点赞，是目前最活跃的 Bug 报告。

2.  **#59895: Windows 本地项目切换账户后丢失**
    *   **重要性：** 🔴 高危
    *   **摘要：** 更新 Windows Codex App 后，切换回个人账户，所有本地项目会消失。
    *   **社区反应：** 69 个评论，涉及应用状态持久化问题。

3.  **#45403: Windows 沙箱权限清理被拒绝**
    *   **重要性：** 🟡 中危
    *   **摘要：** 用户授予“完全访问”权限后，尝试清理代理创建的测试文件时被策略阻止，且没有审查路径。

4.  **#58447: macOS Dot 线程读取失败**
    *   **重要性：** 🟡 中危
    *   **摘要：** macOS 桌面端在通过 `cloud_threads.read` 路由读取用户创建的线程时，抛出 `DesktopThreadReadUnavailableError`。

5.  **#50520: Windows 沙箱 helper_sandbox_lock_failed 循环失败**
    *   **重要性：** 🟡 中危
    *   **摘要：** Windows 沙箱在启动 shell 命令前反复报错 `helper_sandbox_lock_failed`，需手动修改 `.codex/.sandbox-bin` 权限才能解决。

6.  **#34946: 定时任务支持 SSH 远程主机**
    *   **重要性：** 🟢 功能增强
    *   **摘要：** 请求允许定时任务目标连接到 SSH 主机，并在主控端显示运行状态。

7.  **#59890: OAuth 图像生成模型选择缺失**
    *   **重要性：** 🟡 中危
    *   **摘要：** 2026-11-04 上线的 Images 2.6 模型在第三方客户端 OAuth 中无法选择或使用。

8.  **#60737: Windows Dots 任务视图不同步**
    *   **重要性：** 🟢 体验优化
    *   **摘要：** 主聊天显示新结果，但任务视图仍停留在旧回复和思考状态。

9.  **#60760: Git 状态批准后立即中止**
    *   **重要性：** 🟡 中危
    *   **摘要：** 普通命令执行成功，但已批准的 git 状态命令点击 Allow 后立即中止，显示 "aborted by user"。

10. **#47953: 模型无法遵循最小指令**
    *   **重要性：** 🟢 模型行为
    *   **摘要：** 报告 GPT-6-astra 模型在特定场景下无法遵守用户给出的最小指令，甚至无法列出其正在违反的规则。

---

## 4. 重要 PR 进展

1.  **#60964: Validate API Key**
    *   **状态：** Closed
    *   **内容：** 在发送请求前验证 Labeler 的 API Key，处理空白字符并拒绝非法格式。

2.  **#60948: Report Biometric Type**
    *   **状态：** Closed
    *   **内容：** 在用户验证响应中增加 `biometricType` 字段（如 Touch ID 返回 "fingerprint"），提升生物识别反馈的精确度。

3.  **#60944: Reconcile Windows Runtime Registration**
    *   **状态：** Closed
    *   **内容：** 修复 Windows 服务权限错误后的运行时注册冲突，防止因重复注册导致的服务启动失败。

4.  **#60943: Preserve File Permissions**
    *   **状态：** Closed
    *   **内容：** 修复重复 Windows 沙箱设置时，覆盖现有文件权限导致的安全问题。

5.  **#60942: Preserve Thread-local Model ID**
    *   **状态：** Closed
    *   **内容：** 在重放和压缩历史记录时，保持线程内的模型 ID 状态，防止上下文切换时的状态错乱。

6.  **#60929: Preserve Command Center Task Ownership**
    *   **状态：** Closed
    *   **内容：** 修复后端切换时，命令中心任务的所有权归属问题，确保任务在正确的后端中恢复。

7.  **#60914: Reserve Guardian Context Budget**
    *   **状态：** Closed
    *   **内容：** 为选中的 Code Mode 执行结果预留独立的 Guardian 上下文预算，优化上下文管理效率。

8.  **#60905: Keep MCP Servers Separate**
    *   **状态：** Closed
    *   **内容：** 确保不同执行器上同名的 MCP 服务器保持独立，防止配置冲突。

9.  **#60849: Protect MCP OAuth Persistence**
    *   **状态：** Closed
    *   **内容：** 防止 MCP OAuth 凭证在刷新令牌时被过时的凭证覆盖，解决登出/重连时的状态回退问题。

10. **#60848: Enable Incremental Tool Declarations for GCP**
    *   **状态：** Closed
    *   **内容：** 默认为 Google Cloud Vertex AI 启用增量工具声明功能，提升云端响应效率。

---

## 5. 功能需求趋势

*   **Windows 平台稳定性与权限管理：** 社区对 Windows 桌面端的沙箱权限、文件系统访问控制以及应用启动时的权限请求处理表现出极高的关注度。这表明桌面客户端在复杂权限环境下的鲁棒性是当前开发重点。
*   **跨平台同步与状态一致性：** 多个 Issue 反映了 Windows 创建的聊天在 Web/iPhone 端不可见，或本地项目切换账户后丢失。社区迫切需要更强的跨设备状态同步机制。
*   **MCP (Model Context Protocol) 生态：** MCP 相关的 Issues 和 PR 数量显著，涉及 OAuth 持久化、服务器配置重置等。这表明 MCP 是开发者工具集成的重要方向，但配置管理的健壮性亟待提升。
*   **远程协作与自动化：** 针对 SSH 远程主机支持和自动化任务调度的 Enhancement 提案显示，开发者希望 Codex 能更深入地融入远程开发和 CI/CD 流程。

---

## 6. 开发者关注点

*   **体验痛点：** 开发者反馈在使用 VS Code 扩展和桌面 App 时遇到频繁的崩溃、启动失败以及 UI 不同步现象。尤其是 Windows 用户，反馈的 Bug 数量明显高于其他平台。
*   **配置与配置管理：** 市场路径解析错误（如 `#` 符号）、MCP 服务器重配后设置丢失、以及 OAuth 刷新失败等问题，显示出在复杂配置场景下，Codex 的配置管理机制（TOML 解析、状态存储）存在脆弱点。
*   **模型行为与输出质量：** 部分用户报告模型（如 GPT-6-astra）在遵循复杂指令或规则方面存在缺陷，这直接影响了代码生成的准确性和可靠性。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-12  
**分析对象**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览

过去 24 小时内，Gemini CLI 仓库保持活跃，无新版本发布。社区焦点集中在 **Agent 行为稳定性**（如子代理超时逻辑错误、挂起问题）以及 **Windows 平台兼容性**（PowerShell 解析阻塞、路径引用问题）的修复上。同时，关于 **代码库 AST 感知工具** 的探索成为技术讨论的热点，旨在提升代码分析效率。

---

## 2. 版本发布

**无** - 过去 24 小时内未发布新版本。

---

## 3. 社区热点 Issues

以下挑选了 10 个评论数最高或影响范围最广的 Issue：

1.  **[P1] Subagent recovery after MAX_TURNS is reported as GOAL success (#22323)**
    *   **重要性**: 🔴 高优先级 Bug
    *   **摘要**: `codebase_investigator` 子代理在达到最大轮次限制时，错误地将状态报告为“GOAL 成功”，导致任务中断被隐藏，影响代码库调查的准确性。
    *   **链接**: [google-gemini/gemini-cli Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2.  **[P1] Generalist agent hangs (#21409)**
    *   **重要性**: 🔴 高优先级 Bug
    *   **摘要**: `gemini-cli` 在委托给 Generalist Agent 时会永久挂起，即使简单的文件夹创建操作也会卡顿。禁用子代理可缓解此问题。
    *   **链接**: [google-gemini/gemini-cli Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3.  **[P2] Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing (#19873)**
    *   **重要性**: 🟡 重要特性探索
    *   **摘要**: 探索如何在不牺牲安全性的前提下，利用 Gemini 3 模型原生 bash 能力，通过零依赖沙箱和意图路由来提升工具使用效率。
    *   **链接**: [google-gemini/gemini-cli Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)

4.  **[P2] Browser Agent ignores settings.json overrides (e.g., maxTurns) (#22267)**
    *   **重要性**: 🟡 用户体验问题
    *   **摘要**: Browser Agent 完全忽略了全局或项目级 `settings.json` 中的配置覆盖，导致超时设置等无法生效。
    *   **链接**: [google-gemini/gemini-cli Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)

5.  **[P2] Assess the impact of AST-aware file reads, search, and mapping (#22745)**
    *   **重要性**: 🟡 架构优化
    *   **摘要**: 这是一个 Epic 级追踪，旨在评估使用 AST（抽象语法树）感知工具进行文件读取和搜索的价值，以减少 Token 消耗和噪声。
    *   **链接**: [google-gemini/gemini-cli Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)

6.  **[P2] Gemini does not use skills and sub-agents enough (#21968)**
    *   **重要性**: 🟡 功能可用性
    *   **摘要**: 用户反馈模型在未明确指示时，很少主动调用自定义 Skills 和 Sub-agents，限制了 Agent 的自动化能力。
    *   **链接**: [google-gemini/gemini-cli Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)

7.  **[P2] fix(cli): hardcoded UTF-8 decoding garbles non-UTF-8 pages (Bug) (#27980)**
    *   **重要性**: 🟢 Bug 修复
    *   **摘要**: `web-fetch` 工具强制使用 UTF-8 解码，导致 GBK、Shift_JIS 等编码的网页内容乱码。
    *   **链接**: [google-gemini/gemini-cli Issue #27980](https://github.com/google-gemini/gemini-cli/issues/27980)

8.  **[P2] Agent should stop/discourage destructive behavior (#22672)**
    *   **重要性**: 🟡 安全性关注
    *   **摘要**: 模型在处理复杂 Git 操作时偶尔会使用 `--force` 等破坏性命令，建议增加机制来阻止或劝阻此类行为。
    *   **链接**: [google-gemini/gemini-cli Issue #22672](https://github.com/google-gemini/gemini-cli/issues/22672)

9.  **[P2] Gemini CLI encounters 400 error with > 128 tools (#24246)**
    *   **重要性**: 🟡 性能/容量
    *   **摘要**: 当可用工具数量超过 128 个时，CLI 会遇到 400 错误，建议 Agent 在执行时更智能地限制工具范围。
    *   **链接**: [google-gemini/gemini-cli Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)

10. **[P3] Replace WriteToDo with Persistent File-Based Task Tracking (CRUD) (#18836)**
    *   **重要性**: 🟢 架构改进
    *   **摘要**: 建议用基于文件的持久化任务追踪替代当前依赖上下文的 `WriteToDo`，以解决上下文腐烂和 Token 成本高的问题。
    *   **链接**: [google-gemini/gemini-cli Issue #18836](https://github.com/google-gemini/gemini-cli/issues/18836)

---

## 4. 重要 PR 进展

以下挑选了 10 个近期活跃或修复了关键问题的 PR：

1.  **[CLOSED] fix(core): preserve interrupted placeholder after empty model responses to tool turns (#30228)**
    *   **内容**: 修复了模型在工具响应返回空内容时，导致提示词被静默融合进后续轮次的问题，解决了 400 错误。
    *   **链接**: [google-gemini/gemini-cli PR #30228](https://github.com/google-gemini/gemini-cli/pull/30228)

2.  **[CLOSED] fix(cli): apply default in ${VAR:-default} when variable is set but empty (#30250)**
    *   **内容**: 修正了环境变量解析逻辑，确保当变量已设置但为空时能正确使用默认值，符合 Bash 标准。
    *   **链接**: [google-gemini/gemini-cli PR #30250](https://github.com/google-gemini/gemini-cli/pull/30250)

3.  **[CLOSED] fix(core): quote IDE CLI path for cmd.exe in /ide install on Windows (#30246)**
    *   **内容**: 修复了 Windows 下 `/ide install` 命令在处理含空格路径时失败的问题。
    *   **链接**: [google-gemini/gemini-cli PR #30246](https://github.com/google-gemini/gemini-cli/pull/30246)

4.  **[CLOSED] fix(cli): preserve Unicode prompts and strip ANSI fragments in session previews (#30220)**
    *   **内容**: 修复了会话预览中非 ASCII 字符（如 Emoji）丢失以及 ANSI 转义序列未正确清理的问题。
    *   **链接**: [google-gemini/gemini-cli PR #30220](https://github.com/google-gemini/gemini-cli/pull/30220)

5.  **[OPEN] fix(core): avoid blocking PowerShell parsing during shell checks (#30247)**
    *   **内容**: 修复了 Windows PowerShell 检查时的同步解析阻塞问题，防止 Node.js 事件循环卡顿。
    *   **链接**: [google-gemini/gemini-cli PR #30247](https://github.com/google-gemini/gemini-cli/pull/30247)

6.  **[OPEN] fix(acp): fire SessionStart and Notification hooks in ACP mode (#30148)**
    *   **内容**: 在 ACP (Agent-to-Agent Protocol) 会话中正确触发 SessionStart 和 Notification 钩子。
    *   **链接**: [google-gemini/gemini-cli PR #30148](https://github.com/google-gemini/gemini-cli/pull/30148)

7.  **[OPEN] fix(cli): report hook-blocked prompts over ACP (#30134)**
    *   **内容**: 修复了在 ACP 模式下，被 Hook 阻止的提示词无法向用户反馈原因的问题。
    *   **链接**: [google-gemini/gemini-cli PR #30134](https://github.com/google-gemini/gemini-cli/pull/30134)

8.  **[OPEN] feat(telemetry): expose skill_name in safe tool metadata whitelist (#30010)**
    *   **内容**: 在遥测配置中允许暴露 `skill_name` 到安全元数据白名单，同时保持代码和敏感信息的隐私保护。
    *   **链接**: [google-gemini/gemini-cli PR #30010](https://github.com/google-gemini/gemini-cli/pull/30010)

9.  **[OPEN] fix(cli): initialize output listeners and flush stderr in acp mode (#30144)**
    *   **内容**: 修复了 ACP 模式下标准错误输出被缓冲，导致 Hook 执行日志和警告不能实时显示的问题。
    *   **链接**: [google-gemini/gemini-cli PR #30144](https://github.com/google-gemini/gemini-cli/pull/30144)

10. **[OPEN] feat(cli): support skill activation via /skill-name in non-interactive mode (#29546)**
    *   **内容**: 允许用户在非交互模式下通过 `/skill-name` 激活技能，扩展了 CLI 的易用性。
    *   **链接**: [google-gemini/gemini-cli PR #29546](https://github.com/google-gemini/gemini-cli/pull/29546)

---

## 5. 功能需求趋势

从 Issues 分析来看，社区关注点主要集中在以下三个方向：

1.  **Agent 行为优化与稳定性 (Agent Behavior & Stability)**
    *   **超时与挂起**: 高频出现关于子代理达到最大轮次后状态处理不当、或主代理永久挂起的问题。
    *   **工具使用效率**: 模型被反馈较少主动使用 Skills 和 Sub-agents，需要改进 Agent 的自主决策逻辑。
    *   **破坏性操作防护**: 增加对 Git `--force` 等危险命令的抑制机制。

2.  **代码库分析架构升级 (Codebase Analysis)**
    *   **AST 感知工具**: 社区正积极探索使用 AST-aware 工具（如 `glyph` 或 `tilth`）替代简单的文本搜索，以减少 Token 消耗并提高分析精度。
    *   **持久化任务追踪**: 从 In-context 追踪转向基于文件的持久化方案，解决上下文腐烂问题。

3.  **跨平台兼容性 (Cross-Platform)**
    *   **Windows 体验**: 修复 PowerShell 解析阻塞、路径引用、编码问题等，是近期 PR 的重点。

---

## 6. 开发者关注点

1.  **配置管理**: 环境变量默认值解析（`${VAR:-default}`）的语义一致性是近期修复的重点。
2.  **Hook 机制**: 用户期望 Hook 机制在 ACP 模式和非交互模式下能提供更清晰的反馈（如被拒绝原因）。
3.  **编码问题**: 网页抓取工具必须正确处理非 UTF-8 编码（GBK, Shift_JIS 等），否则无法正常使用。
4.  **工具数量限制**: 当工具列表过长（>128）时，系统会崩溃，需要改进工具过滤逻辑。

---

**日报生成时间**: 2026-11-12  
**数据来源**: GitHub API (google-gemini/gemini-cli)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-11-12
**来源**: github.com/github/copilot-cli

---

## 1. 今日速览
今天 Copilot CLI 发布了 **v1.0.110-3** 版本，重点修复了无障碍访问（屏幕阅读器支持）、会话管理显示优化以及输入模型行换行问题。社区活跃度较高，共有 **40 个 Issues** 获得更新，主要集中在 **MCP (Model Context Protocol) OAuth 认证流程**、**Windows 平台兼容性**以及**会话恢复与上下文管理**等核心功能的稳定性与体验改进。

---

## 2. 版本发布
### 📦 v1.0.110-3 (最新)
本次更新主要关注用户体验和无障碍访问改进：
*   **Accessibility (无障碍)**: 修复 Microsoft Entra 登录时的错误弹窗问题，并改进了屏幕阅读器对会话列表（Sessions list）的识别能力，现在可以正确提示会话状态（需要关注或空闲）。
*   **Display (显示优化)**: 修复 `/usage` 模型行在终端宽度限制下的换行显示问题，使其不再发生截断。
*   **Error Handling (错误处理)**: 改进了中断或失败的推理请求的标记方式，保留了文本但明确标记为不完整状态。

---

## 3. 社区热点 Issues

### 🔴 高频且影响广泛
1.  **[OPEN] WSL2 (ARM64) `/copy` 命令失败** (`#3534`)
    *   **重要性**: 影响大量在 ARM64 环境下使用 Windows 剪贴板功能的用户。
    *   **摘要**: 在 WSL2 ARM64 环境下，通过 Windows 路径进行剪贴板写入时，`clip.exe` 报错退出代码 1。这归结于 `cmd.exe` 包装器中的引号处理 Bug。
    *   **反应**: 7 个 👍，处于开放状态，等待修复。

2.  **[OPEN] ACP 会话索引回归** (`#5053`)
    *   **重要性**: 影响本地会话历史记录的持久化和检索。
    *   **摘要**: 升级到 1.0.89 后，完成的 ACP (Autonomous Coding Project) 会话不再填充本地的 `session-store.db`，导致历史记录丢失。
    *   **反应**: 1 个 👍，关注点在于数据完整性。

3.  **[OPEN] MCP OAuth 动态客户端注册失效问题** (`#5284`)
    *   **重要性**: 影响使用 OAuth 动态注册的远程 MCP 服务器的稳定性。
    *   **摘要**: 当 OAuth 客户端注册过期后，CLI 不会自动重新注册，导致后续请求持续报错 `invalid_client`。
    *   **反应**: 已关闭，但属于遗留问题，仍需关注。

4.  **[OPEN] Windows 环境下 MCP 登录崩溃** (`#5088`)
    *   **重要性**: 阻断 Windows 用户的首次 Entra 账户登录体验。
    *   **摘要**: 在 Windows 上使用 Microsoft Entra 账户代理（WAM）登录远程 MCP 服务器时，CLI 进程会崩溃（`0xc0000005` 访问冲突）。
    *   **反应**: 1 个 👍。

### 🔵 平台与兼容性
5.  **[OPEN] Linux ARM64 二进制文件 ENOEXEC 错误** (`#5424`)
    *   **摘要**: 在 Linux 6.12 (aarch64) 上运行 ARM64 二进制文件时出现 `Exec format error`，需通过 `ld.so` 启动。
    *   **重要性**: 影响新兴硬件架构的用户。

6.  **[OPEN] macOS 12.7.6 运行时依赖缺失** (`#5418`)
    *   **摘要**: 在 macOS 12.7.6 上运行时报错，提示找不到 `darwin-x64` 平台的 `runtime.node` 原生插件。

### 🎯 功能与体验
7.  **[OPEN] Voice 语音识别语言不可配置** (`#5226`)
    *   **摘要**: 语音输入功能目前硬编码为自动检测语言，非英语用户希望支持手动指定语言。
    *   **重要性**: 提升多语言用户的使用体验。

8.  **[OPEN] 禁用内置斜杠命令** (`#5375`)
    *   **摘要**: 希望能禁用内置的 `/review` 等命令，以避免与自定义技能冲突。
    *   **重要性**: 提升插件和自定义工作流的可定制性。

9.  **[OPEN] 会话恢复失败** (`#5416`)
    *   **摘要**: 升级后，使用 `/restart` 命令后无法恢复会话，且提示会话正在其他地方使用。
    *   **重要性**: 影响开发者的连续工作流。

10. **[OPEN] 推理行在 Concise 模式下丢失** (`#5426`)
    *   **摘要**: 在启用 `CONCISE_TRANSCRIPT` 模式时，推理（Thinking）行被完全移除，尽管用户可以通过快捷键查看。
    *   **重要性**: 影响对 AI 思考过程的透明度展示。

---

## 4. 重要 PR 进展
*(注：过去24小时内无 PR 更新)*

---

## 5. 功能需求趋势
从今日更新的 Issues 中，可以观察到以下开发趋势：

1.  **MCP (Model Context Protocol) 深度集成**: 社区对 MCP 的依赖度显著增加，主要集中在 OAuth 认证流程、动态客户端注册以及会话恢复时的 MCP 工具列表同步问题。
2.  **跨平台健壮性**: Windows (Entra 登录、插件安装权限、VS Code 关联) 和 Linux ARM64 (二进制兼容性) 是目前反馈的高频问题区域。
3.  **会话与上下文管理**: 开发者极其关注会话的恢复（`/restart`）、历史索引（`session-store.db`）以及上下文窗口的健壮性（如 `checkpoint.md` 缺失）。
4.  **可定制性**: 用户希望拥有更多控制权，如禁用内置命令、配置语音语言、以及更精细的权限提示钩子配置。

---

## 6. 开发者关注点
*   **环境隔离与权限**: Windows 环境下的权限提示（如 `/allow-all` 不生效）、VS Code 运行时的插件安装权限冲突。
*   **原生插件兼容性**: 多个 Issue 提及特定操作系统下的原生 Node 插件加载失败（如 `runtime.node`），这通常是跨平台构建的痛点。
*   **认证流程稳定性**: 尤其是涉及外部服务（Google Workspace, Entra ID）的 OAuth 流程，容易受到网络或服务器配置（如 trailing slash）的影响。
*   **终端 UI 交互**: 输入法冲突（`Control-j`）、屏幕阅读器支持以及输出格式（换行、推理展示）的易用性优化。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-11-12  
**分析对象**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
OpenCode 生态系统今日保持活跃，主要围绕 **v2.2.5 版本**进行维护。社区高度关注 **免费层限流问题**，相关 Issue 讨论量巨大（355+ 评论），反映出大量用户在使用免费额度时遇到体验瓶颈。同时，桌面端和 TUI 的多项 UI/UX Bug（如复制功能失效、会话列宽限制、主题颜色溢出）引发了广泛反馈，显示出 v2 版本在复杂交互场景下仍需打磨。开发者社区对 **插件系统** 和 **MCP 协议** 的扩展功能表现出浓厚兴趣。

---

## 2. 版本发布
*   **process-daemon v0.5.2** (Protocol 8)
    *   **更新内容**: 发布 `opencode-pty` 0.5.2，升级至协议 8。
    *   **链接**: [Process Daemon Release](https://github.com/anomalyco/opencode/releases/tag/process-daemon-v0.5.2)

---

## 3. 社区热点 Issues

### 🔴 高优先级/严重
1.  **[zen] Free tier issues: read this first** (#59387)
    *   **重要性**: 极高。这是免费层问题的**主入口**，累计 355 条评论，涉及额度耗尽、重置失败等核心痛点。
    *   **链接**: [Issue #59387](https://github.com/anomalyco/opencode/issues/59387)

2.  **Copy To Clipboard is not working** (#4283)
    *   **重要性**: 中高。严重影响桌面端用户体验，尽管已关闭，但仍有 160+ 评论，说明问题影响范围广。
    *   **链接**: [Issue #4283](https://github.com/anomalyco/opencode/issues/4283)

3.  **client: reconnect splash every <=10s** (#63417)
    *   **重要性**: 高。Home Assistant 集成场景下，每 10 秒强制断线提示会导致会话无法正常使用。
    *   **链接**: [Issue #63417](https://github.com/anomalyco/opencode/issues/63417)

### 🐛 桌面端与 UI/UX
4.  **desktop: Review panel file tree doesn't refresh** (#63214)
    *   **重要性**: 中。Shell 命令创建/删除文件后，桌面端侧边栏不更新，需手动刷新。
    *   **链接**: [Issue #63214](https://github.com/anomalyco/opencode/issues/63214)

5.  **desktop: session column capped at 744px** (#54800)
    *   **重要性**: 中。宽屏显示器下对话区域被限制，图表和表格内容被截断，影响阅读体验。
    *   **链接**: [Issue #54800](https://github.com/anomalyco/opencode/issues/54800)

6.  **desktop: goal Resume ignores selected agent** (#63383)
    *   **重要性**: 中。用户切换到 Build 模式后，点击 Resume 仍回退到 Plan 模式，导致功能失效。
    *   **链接**: [Issue #63383](https://github.com/anomalyco/opencode/issues/63383)

### 🔧 TUI 与终端交互
7.  **tui: delayed OSC 10/11 replies leak into prompt** (#57345)
    *   **重要性**: 中。SSH 终端下，颜色查询回复的残留数据会显示在输入提示符中。
    *   **链接**: [Issue #57345](https://github.com/anomalyco/opencode/issues/57345)

8.  **tui: scrolling jumps thinking block** (#58666)
    *   **重要性**: 中。向上滚动时视图会跳过思考块，导致阅读体验不连贯。
    *   **链接**: [Issue #58666](https://github.com/anomalyco/opencode/issues/58666)

9.  **tui: background shell completion notices accumulate** (#63345)
    *   **重要性**: 中。后台任务通知堆积在活动回合下方，导致界面混乱。
    *   **链接**: [Issue #63345](https://github.com/anomalyco/opencode/issues/63345)

### 🌐 平台与安装
10. **cli: github-copilot/auto missing in standalone mode** (#63331)
    *   **重要性**: 中。Standalone 模式下无法发现 `github-copilot/auto` 模型，影响 Copilot Student 用户。
    *   **链接**: [Issue #63331](https://github.com/anomalyco/opencode/issues/63331)

---

## 4. 重要 PR 进展

1.  **feat(core): bound subagent concurrency** (#63227)
    *   **内容**: 为会话中的子代理添加硬性并发限制，防止资源耗尽。
    *   **状态**: Open
    *   **链接**: [PR #63227](https://github.com/anomalyco/opencode/pull/63227)

2.  **feat(core): auto-balance opencode go accounts** (#63354)
    *   **内容**: 实验性功能，根据剩余配额自动选择成本最低的账号，而非手动切换。
    *   **状态**: Open
    *   **链接**: [PR #63354](https://github.com/anomalyco/opencode/pull/63354)

3.  **fix(core): retry the ripgrep binary resolution** (#63424)
    *   **内容**: 修复 ripgrep 二进制下载在代理环境下失败后永不恢复的问题。
    *   **状态**: Open
    *   **链接**: [PR #63424](https://github.com/anomalyco/opencode/pull/63424)

4.  **feat(core): add session history search and inspect tools** (#63411)
    *   **内容**: 允许代理在当前上下文中搜索和检查历史会话记录。
    *   **状态**: Open
    *   **链接**: [PR #63411](https://github.com/anomalyco/opencode/pull/63411)

5.  **fix(core): preserve Anthropic cache hints** (#63421)
    *   **内容**: 修复 Anthropic 缓存提示在 AI SDK 桥接过程中丢失的问题。
    *   **状态**: Open
    *   **链接**: [PR #63421](https://github.com/anomalyco/opencode/pull/63421)

6.  **fix(app): hide and mute sessions in Recent sidebar** (#63427)
    *   **内容**: 桌面端功能跟进 iOS 侧边栏，支持隐藏、静音会话。
    *   **状态**: Closed
    *   **链接**: [PR #63427](https://github.com/anomalyco/opencode/pull/63427)

7.  **fix(app): avoid leaking tooltip computations** (#61652)
    *   **内容**: 修复悬停 Tooltip 导致的内存泄漏问题。
    *   **状态**: Open
    *   **链接**: [PR #61652](https://github.com/anomalyco/opencode/pull/61652)

8.  **fix(core): recover parent wakes after subagent report** (#63416)
    *   **内容**: 修复子代理报告确认后的父会话崩溃/挂起问题。
    *   **状态**: Open
    *   **链接**: [PR #63416](https://github.com/anomalyco/opencode/pull/63416)

9.  **fix(core): scope background service registration** (#63136)
    *   **内容**: 修复多网络命名空间下后台服务注册冲突的问题。
    *   **状态**: Open
    *   **链接**: [PR #63136](https://github.com/anomalyco/opencode/pull/63136)

10. **fix(legacy): keep github app secrets in production** (#63423)
    *   **内容**: 修复生产环境 GitHub App 密钥加载问题。
    *   **状态**: Closed
    *   **链接**: [PR #63423](https://github.com/anomalyco/opencode/pull/63423)

---

## 5. 功能需求趋势

*   **会话管理增强**: 社区强烈要求改进会话历史管理，包括会话搜索 (#63411)、会话移动后项目同步 (#63188)、会话标题自动生成 (#58548) 以及会话在侧边栏的静音/隐藏功能 (#63427)。
*   **桌面端交互体验**: 大量反馈集中在桌面端 UI 细节，如会话列宽限制 (#54800)、文件树实时刷新 (#63214)、复制功能 (#4283) 以及特定模型（如 Copilot）在独立模式下的可用性 (#63331)。
*   **高级功能与集成**: 插件开发者呼吁暴露 V2 TUI 编写器 API (#51209)，同时社区对 MCP 协议的事件广播和超时配置优化表现出高度关注 (#63261, #63092)。

---

## 6. 开发者关注点

*   **稳定性与崩溃**: TUI 崩溃 (#63418)、会话在特定操作下挂起 (#63376)、以及子代理报告导致的级联崩溃 (#63416) 是高频痛点。
*   **配置与网络**: 代理设置下的自动下载失败 (#51022)、MCP 默认超时与配置冲突 (#63092)、以及多网络命名空间下的服务冲突 (#63136) 是基础设施层面的主要挑战。
*   **兼容性**: Windows 11 下的安装脚本兼容性 (#63352)、Android 17 的网络权限缺失 (#62934) 以及不同平台下的模型发现差异 (#63331) 需要持续关注。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-11-12)

**数据来源**: [github.com/badlogic/pi-mono](https://github.com/badlogic/pi-mono)

---

## 1. 今日速览
- **无新版本发布**：过去24小时未发布新版本，社区处于功能迭代与 Bug 修复阶段。
- **关键修复密集**：今日修复了 Windows 进程挂起、扩展依赖解析、终端 TUI 渲染等多处严重 Bug，显著提升了跨平台稳定性。
- **AI 工具链增强**：PR 12072 引入工具命名空间功能，优化了 Vercel AI Gateway 下的工具调用性能与历史记录管理。

---

## 2. 版本发布
*无新版本发布。*

---

## 3. 社区热点 Issues

| Issue | 状态 | 重要性 | 摘要与社区反应 |
| :--- | :--- | :--- | :--- |
| [#3005](https://github.com/earendil-works/pi/issues/3005) | 🟡 Open | 🔴 高 | **可配置的更新提示**：用户希望在 NixOS 等复杂环境下屏蔽弹出的“UPDATE AVAILABLE”大字提示。**反应**：获 2 个赞同，讨论集中在如何将其纳入“Quiet startup”设置。 |
| [#10162](https://github.com/earendil-works/pi/issues/10162) | 🟡 Open | 🟠 高 | **Agent 任务中断**：输入图片过多会导致长期运行的任务（如代码审查）停止。**反应**：讨论了 Agent 自动压缩机制，寻求优化长时任务稳定性。 |
| [#11026](https://github.com/earendil-works/pi/issues/11026) | 🟡 Open | 🟠 高 | **Durable 存储**：用户请求在 `pi-durable` 中增加永久删除会话的功能，并避免在运行时阻塞。**反应**：获 6 个赞同，是关于数据管理的重要功能请求。 |
| [#10317](https://github.com/earendil-works/pi/issues/10317) | 🟡 Open | 🟡 中 | **扩展事件可见性**：扩展注入输入后无法获知被丢弃的消息。**反应**：开发者希望扩展能监听队列更新事件，以更好地控制工作流。 |
| [#12019](https://github.com/earendil-works/pi/issues/12019) | 🟡 Open | 🟠 高 | **Copilot 推理参数失效**：Gemini 模型在 `--thinking` 标志下未收到 `reasoning_effort` 参数。**反应**：影响模型推理能力，需修复兼容性。 |
| [#12035](https://github.com/earendil-works/pi/issues/12035) | 🟡 Open | 🟡 中 | **虚拟模型压缩阈值**：选择虚拟模型时，上下文压缩的触发阈值计算错误，可能导致过早截断。**反应**：需修复 `_checkCompaction` 逻辑。 |
| [#11933](https://github.com/earendil-works/pi/issues/11933) | 🟢 Closed | 🟡 中 | **文档引用**：请求条件性地引用 AGENTS.md 及其子文档（如 AGENTS_JAVA.md）。**反应**：已关闭，文档结构优化需求已满足。 |
| [#11759](https://github.com/earendil-works/pi/issues/11759) | 🟢 Closed | 🟡 中 | **Anthropic 工具块错误**：Thinking blocks 在解码中断时导致下一个请求 400 错误。**反应**：已修复，影响多轮对话稳定性。 |
| [#9190](https://github.com/earendil-works/pi/issues/9190) | 🟢 Closed | 🔴 高 | **Ctrl+C 暴力清屏**：用户误按 Ctrl+C 会清空整个提示，且无确认。**反应**：用户反馈强烈，已修复。 |
| [#12062](https://github.com/earendil-works/pi/issues/12062) | 🟢 Closed | 🟡 中 | **Bash 工具输出截断**：当最后一行过长时，工具输出显示为空。**反应**：已修复，影响代码执行结果展示。 |

---

## 4. 重要 PR 进展

| PR | 状态 | 摘要与影响 |
| :--- | :--- | :--- |
| [#12072](https://github.com/earendil-works/pi/pull/12072) | 🟢 Closed | **工具命名空间化**：将延迟加载的工具分组，减少 Vercel AI Gateway 下的输入 Token 消耗。 |
| [#12071](https://github.com/earendil-works/pi/pull/12071) | 🟢 Closed | **保留工具搜索历史**：修复 Responses API 返回历史记录丢失的问题，确保状态无状态请求可恢复。 |
| [#12069](https://github.com/earendil-works/pi/pull/12069) | 🟢 Closed | **OpenAI 模型路由**：通过 Vercel AI Gateway 正确路由 OpenAI 模型到 `openai-responses` 端点。 |
| [#12059](https://github.com/earendil-works/pi/pull/12059) | 🟡 Open | **Radius 备份支持**：扩展 P2 的备份功能，使其能将 Chord 存储备份到 Radius。 |
| [#11990](https://github.com/earendil-works/pi/pull/11990) | 🟡 Open | **Radius 会话同步适配器**：为 P2 提供基于 Radius 的会话备份与恢复边界，解耦未来逻辑。 |
| [#12058](https://github.com/earendil-works/pi/pull/12058) | 🟢 Closed | **修复 Bash 输出显示**：修复了当保留的尾部行是长行时输出为空的 Bug。 |
| [#12042](https://github.com/earendil-works/pi/pull/12042) | 🟢 Closed | **备份协调器**：实现了 Chord 存储的备份与恢复协调器，是 P2 存储架构的重要升级。 |
| [#12055](https://github.com/earendil-works/pi/pull/12055) | 🟢 Closed | **修复 JSONL 读取冲突**：修复了在只读 JSONL 读取时，因写入进程重命名 `.reclaim` 文件导致的 ENOENT 错误。 |
| [#12054](https://github.com/earendil-works/pi/pull/12054) | 🟢 Closed | **修复 MCP 工具恢复**：修复了会话恢复时，扩展隐藏自身工具导致 MCP 工具丢失的问题。 |
| [#12046](https://github.com/earendil-works/pi/pull/12046) | 🟢 Closed | **修复独立二进制扩展解析**：修复了 Standalone 二进制无法通过 `package.json` 的 `exports` 字段解析扩展依赖的问题。 |

---

## 5. 功能需求趋势

- **IDE 与终端体验优化**：高频需求集中在 UI/UX 细节，如可配置的更新提示、Ctrl+C 行为、终端粘贴图片、以及 Alacritty 的按键渲染问题。
- **Durable 存储与数据管理**：社区对 `pi-durable` 的功能需求明确，包括永久删除会话、修复并发读写冲突，以及扩展存储接口的完善。
- **多模型与工具链兼容性**：随着 Copilot、Gemini 等新模型集成，社区高度关注推理参数传递、工具定义兼容性（如 `strict` 模式）以及 Vercel AI Gateway 的路由稳定性。
- **扩展生态与 API 透明度**：开发者希望扩展 API 能提供更细粒度的反馈（如队列更新事件、工具加载状态），以增强对工作流的控制。

---

## 6. 开发者关注点

- **稳定性与 Bug 修复**：今日修复的 20+ PR 涵盖了 Windows 进程挂起、扩展依赖解析、终端渲染等多个核心稳定性问题，显示出团队对生产环境稳定性的重视。
- **性能优化**：通过引入工具命名空间、优化历史记录管理，团队正在积极应对大工具目录下的 Token 消耗和响应延迟问题。
- **跨平台与终端兼容性**：Windows 环境下的进程管理、Alacritty 等终端的渲染兼容性成为高频反馈点，表明 Pi 在非 macOS 终端环境下的适配仍在持续改进中。
- **数据持久化与备份**：P2 的备份机制（Radius 集成）和 Durable 存储的并发处理是架构层面的重要进展，为长期运行的 Agent 任务提供了更可靠的数据保障。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-11-12  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
Qwen Code 迎来了 **v1.0.0-preview** 正式预览版发布，标志着项目迈向核心功能成熟期。与此同时，CI 管道稳定性仍是社区焦点，尽管有 325 条高关注度评论的 CI 失败报告，但核心开发团队正积极通过 PR 进行修复（如并发竞态、资源持久化等）。社区在享受新功能预览的同时，正密切关注版本过渡期的接口兼容性及稳定性问题。

---

## 2. 版本发布
**v1.0.0-preview** 已发布
*   **更新内容**: 正式发布 Qwen Code 1.0 预览版。
*   **核心特性**:
    *   整合了 Qoder 和 Qwen Code 的代理能力，覆盖代码理解、实现、调试和测试全流程。
    *   支持 Qwen 和 Qoder 的访问控制。
*   **注意**: 预览版期间接口、配置选项和行为可能发生变化。

---

## 3. 社区热点 Issues (Top 10)

1.  **#14724** [OPEN] Main CI failed: Managed Agent gate — no test identified
    *   **关注度**: 325 👍
    *   **重要性**: **最高优先级**。这是目前最严重的阻塞问题，CI 管道在没有任何测试结果前即失败，严重影响代码合并和发布流程。
    *   **链接**: [QwenLM/qwen-code Issue #14724](https://github.com/QwenLM/qwen-code/issues/14724)

2.  **#11680** [OPEN] Main CI failed: E2E Tests — no test identified
    *   **关注度**: 48 👍
    *   **重要性**: E2E 测试是保证产品稳定性的关键，该问题同样导致主分支 CI 在测试前即失败。

3.  **#16425** [CLOSED] Workflow agent permission approval never renders
    *   **关注度**: 10 👍
    *   **重要性**: 这是一个已修复的 **P1 级核心 Bug**，涉及工作流代理权限审批流程的 UI 渲染与挂起问题，影响用户体验。

4.  **#16982** [OPEN] core: /rewind after /cd can restore a checkpoint into the wrong working directory
    *   **关注度**: 2 👍
    *   **重要性**: **P1 级严重 Bug**，涉及文件恢复功能。当会话切换目录后回滚，可能导致文件被错误覆盖，造成数据安全隐患。

5.  **#124** [CLOSED] Tool calls with self-hosted Qwen3-Coder fail (almost always)
    *   **关注度**: 7 👍
    *   **重要性**: **P1 级严重 Bug**，涉及自托管模型（Qwen3-Coder）的 Tool Calls 功能，导致大量用户无法正常使用代码生成能力。

6.  **#14361** [OPEN] The Session store intermittently refuses a Hosted Shell turn with 400
    *   **关注度**: 7 👍
    *   **重要性**: **P2 级稳定性问题**，涉及会话存储的间歇性失败，导致 SDK Java 测试通过率仅为 59%。

7.  **#15861** [OPEN] ci(smoke): web-shell host-directory-picker smoke times out
    *   **关注度**: 7 👍
    *   **重要性**: **P2 级测试稳定性**，Web Shell 的目录选择器在 E2E 测试中频繁超时，影响 CI 效率和代码提交体验。

8.  **#16915** [OPEN] The qwen code task reports two errors and cannot continue
    *   **关注度**: 7 👍
    *   **重要性**: **P2 级运行时错误**，任务执行时连接模型服务中断，导致任务卡死，严重影响开发者生产力。

9.  **#16851** [OPEN] Web UI: Weekly usage limit stuck, not resetting after multiple weeks of inactivity
    *   **关注度**: 3 👍
    *   **重要性**: **P2 级产品体验问题**，涉及配额重置机制失效，用户无法获得应有的免费额度恢复。

10. **#16767** [OPEN] Spurious "The previous request was interrupted..." banner
    *   **关注度**: 3 👍
    *   **重要性**: **P2 级 UI 误导问题**，在工具调用正常结束时错误地显示“请求中断”横幅，干扰用户对系统状态的判断。

---

## 4. 重要 PR 进展 (Top 10)

1.  **#16983** [CLOSED] feat(managed-agent): fence concurrent journal pack publication with a builder lease
    *   **内容**: 修复了并发 Journal 打包发布的竞态条件问题，解决了 #16868 PR 中被标记为 Blocker 的并发安全问题。
    *   **状态**: 已合并。

2.  **#16981** [CLOSED] chore(managed-agent): finish the CSI bound conversion and name it once
    *   **内容**: 完成 CSI 绑定转换的收尾工作，修复命名不一致问题，保持代码一致性。
    *   **状态**: 已合并。

3.  **#16938** [OPEN] feat(core): re-express the agent loop on the event bus (opt-in)
    *   **内容**: 基于 Event Bus 原语重构核心 Agent Loop，引入 Conversation、Llm、Tool 三个处理器，实现事件驱动架构。
    *   **状态**: 开发中。

4.  **#16976** [OPEN] test(cli): pin the host machine-id in SSH bootstrap process tests
    *   **内容**: 针对 Linux SSH 启动测试进行修复，通过固定机器 ID 消除测试环境的不确定性，提高测试稳定性。

5.  **#16926** [OPEN] [review/self-reported] fix(core): publish file-history backups atomically
    *   **内容**: 将预览版的原子化备份特性移植到主分支，防止备份过程中的数据损坏。

6.  **#16868** [CLOSED] feat(managed-agent): OSS externalization of oversized session resources and journal compaction
    *   **内容**: 将过大的会话资源和外置日志存储到对象存储，解决资源膨胀问题并优化数据库负载。
    *   **状态**: 已合并。

7.  **#16866** [OPEN] feat(managed-agent): add the Managed Web Terminal
    *   **内容**: 在 Managed Agent 会话中增加交互式 Web Terminal，消除 Web Terminal 的托管会话功能缺口。
    *   **状态**: 开发中。

8.  **#16844** [OPEN] feat(managed-agent): register client filesystems into managed sessions
    *   **内容**: 允许 Managed Agent 会话访问浏览器用户的本地文件系统，通过 Java 介导的 MCP 实现文件操作能力。
    *   **状态**: 开发中。

9.  **#16877** [OPEN] feat: Manual session PR binding (/pr command + Web Shell dialog)
    *   **内容**: 增加手动绑定 GitHub PR 的功能，提供 `/pr` 命令和 Web Shell 对话框，解决自动绑定失效时的补救方案。
    *   **状态**: 开发中。

10. **#16949** [OPEN] docs(core): evaluate streaming tool dispatch (event-bus slice 3)
    *   **内容**: 完成 Event Bus 代理循环移植的评估文档，重点讨论流式工具调度的行为设计。

---

## 5. 功能需求趋势

*   **托管会话增强**: 社区高度关注托管会话的健壮性，包括资源持久化 (#16868)、文件系统访问 (#16844) 和 Web Terminal 功能 (#16866)。
*   **核心架构演进**: 正在从传统的轮询/回调模式向 **Event Bus (事件总线)** 模式迁移，以支持更复杂的流式工具调用和异步编排。
*   **IDE/Web Shell 体验优化**: 针对 Web Shell 的 UI 交互（如目录选择器超时 #15861、焦点管理 #16980）和文件操作（如 glob 匹配 #16921）的反馈明显增多。
*   **数据安全与一致性**: 对文件回滚 (#16982)、原子化备份 (#16926) 和并发控制 (#16983) 的需求强烈，反映出对生产环境可靠性的高要求。

---

## 6. 开发者关注点

*   **CI 稳定性是首要痛点**: 尽管有 50 个 Issue，但其中大量是关于 CI 失败的重复报告，显示出主分支在持续集成环境下的不稳定性。
*   **自托管模型支持**: 旧 Issue #124 仍被频繁提及，说明用户在本地部署 Qwen3-Coder 时，Tool Calls 功能存在广泛且顽固的兼容性问题。
*   **文档准确性**: MCP 服务器配置文档 (#16925) 和权限审批流程 (#16425) 的修复请求，表明社区对文档与实际行为脱节感到困扰。
*   **日志与调试**: 多个 Issue 提到 CLI 频繁断连 (#16908)、Session 存储失败 (#14361)，开发者急需更详细的错误日志来定位底层问题。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek‑TUI 社区动态日报 – 2026‑11‑12**  

---

## 1️⃣ 今日速览  
- 本日社区聚焦在 **工作流进化搜索**（workflow）实验以及 **工具链稳定性** 的修复，两个方向均出现关键 PR 与 Issue 交叉讨论。  
- 关键的 **中文自定义模型计费** 需求首次提出，标志着多语言/多币种支持正在进入需求池。  

---

## 2️⃣ 版本发布  
> **暂无** 过去 24 小时内未发布新 Release。

---

## 3️⃣ 社区热点 Issues *(精选全部 4 条)*  

| # | 标题 / 关键点 | 为何重要 | 社区反馈 / 讨论 | 链接 |
|---|----------------|----------|----------------|------|
| **7250** | `proposal(workflow): verified candidate evaluation for experimental search` | 为工作流搜索加入 **运行时验证**，提升生成代码的可信度，是实验性进化搜索的核心里程碑。 | 3 条评论，主要在讨论验证机制的实现细节与安全沙箱的隔离策略。 | https://github.com/codewhale-hq/Codewhale/issues/7250 |
| **7252** | `Anthropic provider: 400 on tools.N.custom.name after tool_search adds web.run` | 影响 **Anthropic** 模型在 macOS 上使用自定义工具时的请求成功率，属于生产环境关键错误。 | 3 条评论，社区提供了复现步骤并请求快速回滚或修补。 | https://github.com/codewhale-hq/Codewhale/issues/7252 |
| **7274** | `Robustness: panics, a glob hang and wrong text in engine, tools, util and repl` | 报告了 **多处崩溃、卡死和文本错误**，直接威胁到整体用户体验和 CI 稳定性。 | 2 条评论，已形成“每个问题对应单独 PR” 的跟进计划。 | https://github.com/codewhale-hq/Codewhale/issues/7274 |
| **7292** | `允许 [[custom_models]] 的价格声明人民币币种` | 让中国用户可以直接以 **CNY** 填写模型费用，降低跨境计费误差，是国际化的重要一步。 | 尚无评论，已获 0 点赞，但在中文社区已有需求呼声。 | https://github.com/codewhale-hq/Codewhale/issues/7292 |

> **说明**：本日仅有 4 条 Issue 更新，已全部列出。

---

## 4️⃣ 重要 PR 进展 *(精选全部 8 条)*  

| # | PR 标题 / 功能 | 关键改动 | 影响范围 | 链接 |
|---|----------------|----------|----------|------|
| **7296** | `fix(repl): truncate stdout by bytes, not chars` | 将 REPL 输出截断逻辑从字符改为字节，防止多字节字符导致的超限。 | REPL、跨语言交互 | https://github.com/codewhale-hq/Codewhale/pull/7296 |
| **7295** | `fix(util): drop the trailing zero from context window labels` | 修正 `format_context_window` 的数字格式化，去除无意义的零后缀。 | 文档、统计面板 | https://github.com/codewhale-hq/Codewhale/pull/7295 |
| **7294** | `feat(workflow): verify sealed candidates with an isolated host oracle` | 为工作流候选项加入 **隔离主机评估**（host oracle），实现实验性安全验证。 | Workflow/实验搜索 | https://github.com/codewhale-hq/Codewhale/pull/7294 |
| **7262** | `experiment(workflow): evidence‑gated evolutionary coding search` | 采用 **证据门控** 的进化式搜索实验（草稿），配合新 host evaluator。 | 工作流引擎、CI | https://github.com/codewhale-hq/Codewhale/pull/7262 |
| **7293** | `feat(engine): add Qwen Code to the external agent registry` | 将 **Qwen‑Code** 模型加入外部代理列表，扩展可调用模型生态。 | Runtime API、文档 | https://github.com/codewhale-hq/Codewhale/pull/7293 |
| **7286** *(已关闭)* | `chore(catalog): refresh the Models.dev offline seed` | 自动刷新离线模型目录，新增若干 vendor‑allowlist 模型。 | /models 页面、模型查询 | https://github.com/codewhale-hq/Codewhale/pull/7286 |
| **6393** | `feat: source navigation echoes and guarded fork‑prefix inheritance` | 改进源码导航与 fork‑prefix 继承，提升代码检索准确性。 | 源码浏览、调试 | https://github.com/codewhale-hq/Codewhale/pull/6393 |
| **7277** *(已关闭)* | `feat(app‑server,tui): run read‑only builtins over the Runtime API` | 为 Runtime API 新增只读内建命令端点，支持远程调用 `/system`、`/tokens`、`/cost`。 | TUI、服务器 API | https://github.com/codewhale-hq/Codewhale/pull/7277 |

> **说明**：本日共更新 8 条 PR（含已关闭），已全部列出。

---

## 5️⃣ 功能需求趋势  

| 趋势方向 | 体现的 Issue/PR | 说明 |
|----------|----------------|------|
| **工作流进化搜索 & 运行时验证** | #7250、#7294、#7262 | 社区希望在代码生成后加入 **可验证的运行时证据**，提升搜索结果的可靠性。 |
| **多模型计费本地化** | #7292 | 对 **人民币**、其他本币的计费需求突出，表明国内用户的使用场景在增长。 |
| **工具链稳定性 & 错误恢复** | #7274、#7252、#7296、#7274 PR 系列 | 多次出现 panic、HTTP 400、截断错误，说明 **鲁棒性** 是当前最紧迫的痛点。 |
| **新模型接入** | #7293 (Qwen Code) | 对 **外部模型** 的快速接入仍是高频需求，尤其是国产大模型。 |
| **API 可读/只读扩展** | #7277 | 为远程客户端提供 **只读内建命令**，提升安全性与可观测性。 |
| **跨语言/跨平台兼容** | #7252 (macOS) | macOS 与特定 provider（Anthropic）之间的兼容性仍需进一步打磨。 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）  

1. **运行时安全验证** – 多数讨论围绕如何在不破坏沙箱隔离的前提下，对生成代码进行实际运行验证。  
2. **输出截断与字符编码** – REPL 对多字节字符的截断导致字节超限，影响中文/日文等 CJK 场景。  
3. **错误处理与 Panic 防护** – `retry` 配置负数、glob 匹配卡死等问题频现，要求在配置层面加入更严格校验。  
4. **模型费用本地化** – 计费默认 USD 已不满足中国用户需求，呼吁在 `[[custom_models]]` 中支持 `cost_currency = "cny"` 等本币。  
5. **工具名称与 Provider 兼容** – `tool_search` 动态添加的 `web.run` 导致 Anthropic 请求 400，提示需要在 **工具命名规范** 上做统一检查。  
6. **模型目录同步** – 自动刷新模型种子虽已实现，但仍需要人工审查，以防不受信任的模型泄漏。  

**建议**：在接下来的一周内，优先完成 **工作流验证**（#7294）与 **输出截断修复**（#7296），同步发布针对 **中文计费** 的文档说明（#7292），并在 CI 中加入 `retry` 参数的合法性检查，以降低突发 panic 的概率。

---  

*本日报基于 GitHub 上的最新 Issue 与 Pull Request 数据编写，供 DeepSeek‑TUI 开发者与社区成员快速把握项目动向。*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*