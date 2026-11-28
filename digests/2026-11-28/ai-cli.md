# AI CLI 工具社区动态日报 2026-11-28

> 生成时间: 2026-11-28 02:22 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告（截至 2026‑11‑28）**  

---

## 1️⃣ 热门 Skills 排行（按讨论热度/评论数挑选）

| 排名 | PR 编号 | Skill 名称 / 核心功能 | 社区讨论热点 | 当前状态 |
|------|--------|----------------------|--------------|----------|
| 1 | **#1742** | **mcp‑builder** – 支持 `mcp>=2` 的 `streamable_http_client` 导入与自定义 HTTP 头 | 迁移到新版 MCP 后的兼容性、跨平台（Linux/Windows）构建脚本的可靠性 | **OPEN** |
| 2 | **#1298** | **skill‑creator** – 隔离 trigger 评估、兼容 Windows、捕获运行时异常 | 触发评估误报、Windows 子进程管道失效、工具链健壮性 | **OPEN** |
| 3 | **#1245** | **notion‑spec‑to‑implementation** – 将 Notion 规格页面自动拆解为实现任务、验收标准 | 业务需求转化、自动生成可追踪的任务列表、与项目管理工具的对接 | **OPEN** |
| 4 | **#1980** | **webapp‑testing** – `with_server.py` 去除 `shell=True`，防止命令注入 | 安全风险（CWE‑78）修复、在测试服务器启动脚本中使用安全子进程调用 | **OPEN** |
| 5 | **#1792** | **docx** – LibreOffice 超时检测并验证输出，确保修订标记已清除 | 文档审阅自动化、错误检测、输出完整性验证 | **OPEN** |
| 6 | **#1771** | **proofcore‑contract‑auditor** – 静态分析 Solidity / Rust 合约并将审计证明写入 TON 区块链 | Web3 开发者的安全审计、零存储 Merkle 证明、链上可验证性 | **OPEN** |
| 7 | **#1703** | **md2video‑audio** – Markdown → MP4 视频 + 人声配音（零成本） | 内容创作流水线、自动化视频生成、跨媒体输出 | **OPEN** |
| 8 | **#525** | **pyxel** – 复古游戏开发、帧检查、状态验证 | 游戏开发教学、交互式可视化调试、教学/娱乐双重场景 | **OPEN** |

> **链接示例**：[#1742](https://github.com/anthropics/skills/pull/1742) … 其余 PR 同理，均可在仓库的 Pull Requests 页面查阅。

---

## 2️⃣ 社区需求趋势（从 Issues 提炼）

| 需求方向 | 关键 Issue | 需求背后的痛点 |
|----------|------------|----------------|
| **安全与信任边界** | #492 – “Community skills distributed under `anthropic/` namespace enable trust boundary abuse” | 官方与社区技能混淆导致权限提升风险，期待命名空间或签名机制。 |
| **组织级 Skill 共享** | #228 – “Enable org‑wide skill sharing in Claude.ai” | 当前只能手动上传 `.skill` 文件，缺少共享库或一键分发功能。 |
| **Skill 触发率评估 & 并行跑分** | #556、#1352 – “run_eval.py never triggers” / “parallel workers produce false‑negative trigger rates” | 自动评估脚本不可靠，影响新 Skill 的质量把控。 |
| **持久化记忆/上下文压缩** | #1329 – “compact‑memory (symbolic notation for compact agent state)” | 长期运行的 Agent 在上下文中占用大量 token，需更紧凑的记忆表示。 |
| **文档质量与排版** | #514 – “document‑typography skill” 与 #189 – “duplicate skills from document‑skills & example‑skills” | 自动排版、避免重复 Skill、提升生成文档的可读性。 |
| **质量门控流水线** | #1385 – “Reasoning Quality Gate Pipeline” | 需要多阶段审查（校准、对抗审查、交付验证）来提升任务输出可靠性。 |
| **账号与数据安全** | #1143 – “Ability to change account email address” | 与竞争平台对齐的账号管理功能，防止工作空间数据因邮箱失效而丢失。 |
| **Skill 失踪/同步问题** | #62 – “All my skills have disappeared and now I get errors” | 本地同步/缓存机制不稳定，导致已上传的 Skill 突然不可用。 |

> **总体趋势**：社区最迫切的需求围绕 **安全/可信任机制、组织协作、质量评估与上下文压缩**，以及 **文档/内容生成的专业化**。

---

## 3️⃣ 高潜力待合并 Skills（活跃讨论但仍未合并）

| PR 编号 | Skill | 关键改进点 | 关注度（评论数/👍） | 预计落地时间 |
|--------|-------|------------|-------------------|--------------|
| #1742 | mcp‑builder | 兼容新 MCP 版本、支持自定义 HTTP Header | 评论数未显式给出，但被标记为 “Fixes #1668”，涉及核心构建流程 | 短期（已在 10‑月更新） |
| #1298 | skill‑creator | 隔离 trigger 评估、Windows 子进程兼容、运行时错误捕获 | 与 #556、#1352 评估问题直接相关，社区热议 | 中期（需完整回归测试） |
| #1245 | notion‑spec‑to‑implementation | 规格→任务自动拆解、进度追踪 | 业务流程自动化的热门需求 | 中期（文档完善后可合并） |
| #1980 | webapp‑testing | 移除 `shell=True`，防止命令注入 | 安全性提升，受到安全 Issue #492 的呼应 | 短期（安全补丁） |
| #1792 | docx | 超时错误处理、输出校验 | 文档处理质量提升，受 Issue #2018 等文档 bug 关注 | 中期 |
| #1771 | proofcore‑contract‑auditor | 链上审计证明、Zero‑storage Merkle | Web3 社区需求增长，已有外部合作伙伴支持 | 中期 |
| #1703 | md2video‑audio | Markdown → 视频 + 语音，零成本 | 内容创作自动化热点，已有初步用户反馈 | 短期 |
| #525 | pyxel | 复古游戏开发、帧检查、状态验证 | 教育/娱乐双向需求，社区活跃度高 | 中期 |

> 以上 PR 均为 **OPEN**（未合并），但因评论、关联 Issue 以及跨领域价值，被视为近期可能落地的高潜力技能。

---

## 4️⃣ Skills 生态洞察（一句话总结）

> **当前社区在 Skills 层面的核心诉求是：提升安全可信赖的共享与执行机制，同时通过自动化工作流、质量评估与上下文压缩来强化大规模、跨团队的生产力。**

--- 

*本报告基于 GitHub 上公开的 Pull Requests 与 Issues 数据，旨在帮助社区快速捕捉热点、把握需求走向。*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期**: 2026-11-28  
**来源**: github.com/openai/codex  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
本周社区活跃度较高，主要集中在 Windows 平台的桌面应用稳定性问题。尽管版本号更新至 `26.1103`，但用户反馈在应用更新后频繁出现本地项目丢失、权限异常及沙箱安全错误。同时，Rust CLI 正式版 `0.174.0-alpha.9` 的发布标志着核心代码库的重大迭代，大量关于沙箱隔离、TUI 渲染及远程连接的 PR 已合并。

## 2. 版本发布
*   **Rust CLI v0.174.0-alpha.9** (最新)
    *   **摘要**: 此次 Alpha 版本主要聚焦于 CLI 核心功能的完善与沙箱安全性的提升，修复了子代理历史记录持久化及 TUI 渲染引擎的渲染逻辑问题。

## 3. 社区热点 Issues (Top 10)

1.  **[Windows] Local projects disappear after app update and switching accounts** (#59895)
    *   **热度**: 74 评论 | 19 👍
    *   **重要性**: **高**。影响 Windows 用户的核心体验，涉及账户切换后的数据持久化逻辑。
    *   **社区反应**: 用户反馈在从个人账户切换回本地项目时，所有项目列表消失，严重阻碍工作流。

2.  **[Windows] Cannot send messages in new Work threads — Send button remains disabled** (#54564)
    *   **热度**: 35 评论 | 1 👍
    *   **重要性**: **高**。工作线程功能存在严重阻塞，用户无法正常发起对话。

3.  **[Windows] Browser reports disabled while Browser toggle is enabled** (#54989)
    *   **热度**: 35 评论 | 1 👍
    *   **重要性**: **中**。自动化工具调用受限，影响依赖本地浏览器的任务执行。

4.  **[Windows] Auto-hidden taskbar cannot be revealed by mouse while maximized** (#45369)
    *   **热度**: 23 评论 | 9 👍
    *   **重要性**: **中**。桌面端 UI 交互 Bug，影响多任务处理体验。

5.  **[MacOS] "ChatGPT hit a snag" error repeatedly on home screen** (#63869)
    *   **热度**: 18 评论 | 7 👍
    *   **重要性**: **中**。应用崩溃提示频繁出现，尽管版本为 26.1120，但问题复现率高。

6.  **[Windows] CreateProcessSecurityEnvironment 0x8007000F blocks local commands** (#59941)
    *   **热度**: 11 评论
    *   **重要性**: **高**。**安全错误**。更新后导致系统级命令执行失败，属于高危漏洞。

7.  **[Windows] New threads lose permission selector and cannot establish SSH** (#61120)
    *   **热度**: 11 评论
    *   **重要性**: **中**。远程开发能力受损，SSH 连接无法建立。

8.  **[CLI] migrate-rollouts leaves persisted subagent threads with empty projected history** (#38762)
    *   **热度**: 11 评论
    *   **重要性**: **中**。涉及 CLI 版本迁移的数据一致性 Bug。

9.  **[Windows] Severe Kernel Nonpaged Pool Memory Leak** (#55812)
    *   **热度**: 8 评论
    *   **重要性**: **中**。性能问题，长期运行会导致系统内存溢出。

10. **[Remote] Remote Control repeatedly shows HTTP 400 WebSocket errors** (#64394)
    *   **热度**: 2 评论
    *   **重要性**: **中**。远程控制协议不稳定，影响远程开发效率。

## 4. 重要 PR 进展 (Top 10)

1.  **[CLOSED] Seal synthetic mounts in read-restricted Linux sandboxes** (#64398)
    *   **内容**: 修复 Linux 沙箱中合成文件系统挂载点的权限漏洞，防止命令修改受限制目录外的文件。
2.  **[CLOSED] Fix TUI Markdown line breaks before inline code** (#64400)
    *   **内容**: 修复 CLI 终端界面在渲染列表项时，内联代码与标题换行逻辑错误的问题。
3.  **[CLOSED] Interrupt running commands promptly when approval is canceled** (#64368)
    *   **内容**: 优化命令审批流程，当用户取消审批时，能更及时地中断正在运行的后台进程，防止资源浪费。
4.  **[CLOSED] Preserve command approval items through turn interruption** (#64349)
    *   **内容**: 解决会话中断时，命令审批记录可能丢失或不同步的问题，确保审计日志完整性。
5.  **[CLOSED] Fix lifecycle hook dispatch for hosted subagents** (#64310)
    *   **内容**: 修复托管子代理（Hosted Subagents）的生命周期钩子分发错误，防止主会话误触发子会话的启动/停止事件。
6.  **[CLOSED] Clean up unused TUI image paste files on exit** (#64382)
    *   **内容**: 优化文件系统清理逻辑，确保退出 CLI 时删除未成功上传的临时图片文件，避免磁盘占用。
7.  **[CLOSED] Respect sandbox read restrictions in remote plugin approvals** (#64369)
    *   **内容**: 强化远程插件审批的安全性，确保审批逻辑严格遵循沙箱的只读权限策略。
8.  **[CLOSED] Fit the Agent Command Center grouping header to the panel** (#64411)
    *   **内容**: UI 优化，调整 Agent 命令中心面板的标题布局，防止在窄屏下内容被截断。
9.  **[CLOSED] Drain unified exec launch failure events before session shutdown** (#64346)
    *   **内容**: 修复会话关闭时的竞态条件，确保所有启动失败的命令事件在会话销毁前被正确处理和记录。
10. **[CLOSED] Share tool approval logic across initial attempts and retries** (#64355)
    *   **内容**: 重构审批逻辑，统一初始请求和重试请求的处理流程，提升代码复用率和稳定性。

## 5. 功能需求趋势

*   **跨平台稳定性与 Windows 适配**: 超过 50% 的活跃 Issue 涉及 Windows 平台（桌面端及 CLI），反映出目前 Windows 生态下的沙箱安全机制、任务栏交互及本地命令执行存在较多兼容性问题。
*   **远程开发与连接性**: 针对远程会话（Remote Control）、SSH 连接及 WebSocket 通信的反馈增多，社区对稳定连接的需求日益迫切。
*   **权限与沙箱精细化控制**: 从 Issue #64398 及 PR #64369 可以看出，开发者对沙箱的读写权限隔离、安全审批流程的准确性要求极高。

## 6. 开发者关注点

*   **数据持久化异常**: Windows 桌面应用在账户切换或更新后，本地项目列表消失是最高频的痛点。
*   **自动化工具阻塞**: 浏览器工具禁用、Send 按钮失效等问题直接阻碍了 Agent 的自主执行能力。
*   **系统资源占用**: Kernel Nonpaged Pool Memory Leak（内核内存泄漏）问题在长时间运行后会导致系统卡顿，属于严重性能隐患。
*   **模型与功能边界**: 尽管大部分是 Bug 报告，但仍有个别 Issue 提及模型行为边界（如 #61857），表明社区正在深入测试 Codex 的复杂任务处理能力。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：** 2026-11-28
**来源：** google-gemini/gemini-cli

---

## 1. 今日速览
今日 **Gemini CLI** 生态保持活跃，主要集中在 **Agent（智能体）稳定性与安全性** 的修复上。核心团队处理了多个高优先级的 Bug，包括通才 Agent 挂起、沙箱权限检测以及浏览器 Agent 的配置问题。同时，社区对“原生 Bash 集成”与“AST 感知代码分析”等高级功能表现出浓厚兴趣，推动了代码库探索效率的提升。

---

## 2. 版本发布
*   **无新版本发布**（无更新记录）

---

## 3. 社区热点 Issues (Top 10)

1.  **#22323: Subagent 恢复逻辑错误（P1）**
    *   **摘要：** `codebase_investigator` 子代理在达到最大轮次限制时，错误地报告为“GOAL 成功”而非中断，导致任务状态误导。
    *   **重要性：** P1 级 Bug，直接影响复杂代码库调查任务的准确性。

2.  **#21409: Generalist Agent 永久挂起（P1）**
    *   **摘要：** 当代理使用子代理时，Gemini CLI 经常永久挂起（如创建文件夹操作），需手动取消，禁用子代理可解决。
    *   **重要性：** P1 级严重阻塞问题，严重影响用户交互体验。

3.  **#19873: 利用模型原生 Bash 能力（P2）**
    *   **摘要：** 提议通过零依赖沙箱和执行后意图路由，利用 Gemini 3 模型对 POSIX 工具的原生亲和力，在不牺牲安全性的前提下提升效率。
    *   **重要性：** 极具前瞻性的架构优化方向，旨在释放模型潜力。

4.  **#22267: Browser Agent 忽略配置覆盖（P2）**
    *   **摘要：** `settings.json` 中的配置（如 `maxTurns`）被浏览器代理完全忽略，导致行为不可控。
    *   **重要性：** 配置管理失效，影响用户对自动化行为的控制。

5.  **#21968: 子代理与技能使用不足（P2）**
    *   **摘要：** 模型倾向于不主动调用自定义技能（如 git/gradle），除非显式指示，导致工具链潜力未发挥。
    *   **重要性：** 指出当前 Agent 推理策略的局限性。

6.  **#21983: Browser Agent 在 Wayland 下失败（P1）**
    *   **摘要：** 在 Wayland 显示服务器环境下，浏览器子代理无法正常工作。
    *   **重要性：** 特定 Linux 桌面环境的兼容性问题。

7.  **#24246: 工具数量超过 128 时的 400 错误（P2）**
    *   **摘要：** 当可用工具过多时，CLI 遇到 API 400 错误。建议 Agent 智能限制工具范围。
    *   **重要性：** 随着功能增加，上下文管理和工具过滤成为瓶颈。

8.  **#22672: Agent 应停止/劝阻破坏性行为（P2）**
    *   **摘要：** 在执行 git reset 或数据库修改等操作时，Agent 倾向于使用危险命令，缺乏安全护栏。
    *   **重要性：** 自动化操作的安全性是核心关注点。

9.  **#22232: 浏览器会话自动接管与恢复（P2）**
    *   **摘要：** 建议增强 `browser_agent` 对锁定会话的容错能力，实现自动接管。
    *   **重要性：** 提升自动化测试/浏览任务的稳定性。

10. **#22186: get-shit-done 输出钩子导致崩溃（P1）**
    *   **摘要：** 在输出用户摘要阶段，CLI 进程崩溃。
    *   **重要性：** P1 级稳定性问题，影响特定工作流。

---

## 4. 重要 PR 进展 (Top 10)

1.  **#30277: 改进沙箱权限检测与不支持环境处理（Closed）**
    *   **内容：** 修复了容器化或受限执行环境中的权限拒绝识别问题。
    *   **价值：** 提升了跨环境（如 CI/CD）的执行稳定性。

2.  **#30268: 尊重 YOLO 模式（Closed）**
    *   **内容：** 修复了在自动/无头模式下，安全检查因缺少确认提示或硬拒绝而中断的问题。
    *   **价值：** 完善了自动化流程的安全与便捷性平衡。

3.  **#30273: 统一退出码映射（Closed）**
    *   **内容：** 集中处理 CLI 核心的致命错误退出码，修复了代码中的硬编码错误。
    *   **价值：** 提升了错误处理的一致性和可调试性。

4.  **#30281: 兼容 Node 26 的 Fetch 超时设置（Closed）**
    *   **内容：** 升级 Undici 库以支持 Node 26 的新内置 Fetch API 符号，并修复超时问题。
    *   **价值：** 确保了在最新 Node.js 版本上的兼容性。

5.  **#30279: 修复函数调用名前后的空格导致 400 错误（Closed）**
    *   **内容：** 修复了模型生成的函数调用名带有前后空格时，API 调用失败的问题。
    *   **价值：** 提升了模型与工具调用的鲁棒性。

6.  **#30493: 统一支持 GOOGLE_CLOUD_PROJECT_ID 回退机制**
    *   **内容：** 在 CLI、Core 和 a2a-server 中统一支持环境变量回退，并优化了 Vertex AI 错误提示。
    *   **价值：** 改善了 GCP 环境下的配置灵活性和用户体验。

7.  **#30496: 保留历史记录并停止恢复时的重放（Open）**
    *   **内容：** 当检查点恢复失败时，保留当前 UI 和历史记录，防止 CLI 进入死循环重放工具。
    *   **价值：** 防止故障恢复过程中的数据丢失和程序卡死。

8.  **#30489: 标准化 CRLF 换行符处理**
    *   **内容：** 在计算文件差异时统一处理 CRLF 换行符，避免 Windows 环境下的误报。
    *   **价值：** 修复跨平台协作中的文件差异显示问题。

9.  **#30368: 支持 ACP 会话关闭**
    *   **内容：** 实现了 ACP 协议的 `session/close` 能力，允许客户端在进程退出前释放资源。
    *   **价值：** 完善了长连接服务的资源管理。

10. **#30498: 在后台输出读取中支持 AbortSignal（Open）**
    *   **内容：** 修复了后台任务无法被 Ctrl+C 正确中断的问题。
    *   **价值：** 改善了用户对长时间运行任务的终止控制。

---

## 5. 功能需求趋势

1.  **AST 感知代码分析**
    *   社区对利用抽象语法树（AST）进行文件读取、搜索和映射表现出极大兴趣（如 Issue #22745, #22746）。这旨在通过更精准的语法理解减少 Token 消耗和噪音，提升代码库调查效率。

2.  **原生 Bash 集成与沙箱**
    *   随着模型能力的演进，利用模型对 bash 的原生亲和力（#19873）成为趋势，同时强调零依赖沙箱的安全性，以在效率与安全之间取得平衡。

3.  **子代理轨迹可视化**
    *   开发者希望能通过 `/chat share` 等功能更方便地查看和分享子代理的执行轨迹（#22598），以便于调试和评估 Agent 行为。

---

## 6. 开发者关注点

*   **稳定性是核心痛点：** Generalist Agent 挂起（#21409）和特定环境下的崩溃（#21983, #22186）是最高频的报错，表明目前的 Agent 推理和资源管理逻辑仍需大量打磨。
*   **配置管理混乱：** `settings.json` 配置被部分模块忽略（#22267），以及符号链接 Agent 识别问题（#20079），反映了配置系统与各个子模块之间的解耦不足。
*   **安全性护栏缺失：** Agent 在执行 git reset 等危险命令时缺乏自我约束（#22672），如何在不干预用户意愿的前提下防止误操作是当前开发的难点。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：** 2026-11-28  
**分析对象：** github.com/github/copilot-cli

---

## 1. 今日速览

过去24小时内，Copilot CLI 发布了 **v1.0.118-2** 及其补丁版本，重点修复了 **MCP (Model Context Protocol)** 服务器配置管理中的并发冲突问题，以及沙箱环境下的 CA 证书信任路径显示。与此同时，社区活跃度保持高位，**32 个 Issue** 获得更新，主要集中在 **Agent 插件配置的兼容性**、**ACP (Advanced Chat Protocol)** 模式下的 Fusion 功能支持、以及 **Windows/macOS 环境下的权限与沙箱稳定性** 等核心体验优化上。

---

## 2. 版本发布

### **v1.0.118-2** (最新)
- **修复重点：** 优化了交互式搜索历史导航，修复了 `copilot mcp enable/disable` 命令在并发运行时可能导致的配置冲突问题。

### **v1.0.118-1**
- **修复重点：** 解决了 MCP 服务器切换时的状态保留问题，确保不同服务器的配置变更互不干扰。

### **v1.0.118-0**
- **修复重点：** 
  - 修复了沙箱 `/sandbox policy` 中未显示额外 CA 证书路径的问题（包括托管设置中的证书）。
  - 改进了子代理启动时的上下文显示，增加了推理努力程度和上下文层级的可见性。

### **v1.0.117** (发布于 2026-11-27)
- **新增功能：** 
  - 支持在用户或托管设置中添加 `sandbox.userPolicy.network.extraCaCertificates`，允许通过 TLS 拦截代理信任自定义 CA 证书。
  - 增加了显式的工具暴露机制，允许自定义代理选择性地启用工具。
- **Bug 修复：** 修复了在固定提示符下使用 Page Down 时出现卡顿的问题。

---

## 3. 社区热点 Issues

### **#5354: ACP 模式未正确识别 Copilot Fusion**
- **重要性：** 🔴 **核心功能缺失**
- **摘要：** 在交互模式下 Copilot Fusion 可用，但 ACP (ACP clients such as T3 Code) 仅路由为 "Auto" 模式，导致客户端无法展示 Fusion 的高级层级选择器。
- **状态：** Open (12 👍)

### **#5283: 个人 Free 账号无法启用远程环境**
- **重要性：** 🔴 **权限与部署障碍**
- **摘要：** 个人 Copilot Free 账号在未加入组织的情况下，无法启用远程环境，尽管本地设置显示已开启。
- **状态：** Open (9 👍)

### **#5589: CLI 忽略提交指令与规则提醒**
- **重要性：** 🟡 **Agent 行为逻辑**
- **摘要：** 用户明确拒绝 `Co-authored-by` 提交后，CLI 仍会再次提议，且在拒绝后未能正确读取 `.instructions.md` 中的规则。
- **状态：** Open

### **#5571: GHE.com 登录时更新器失败**
- **重要性：** 🟡 **认证与安装问题**
- **摘要：** 使用 GitHub Enterprise Cloud 账号登录时，更新器报错 "GitHub credential owner did not provide a token"。
- **状态：** Open

### **#5593: 本地沙箱阻止 git submodule 更新**
- **重要性：** 🔴 **构建兼容性**
- **摘要：** 启用本地沙箱后，即使子模块已处于正确版本，`git submodule update` 也会被阻止，导致构建脚本失败。
- **状态：** Open

### **#5588: Cypress 在 macOS 沙箱中崩溃**
- **重要性：** 🔴 **测试环境兼容性**
- **摘要：** Cypress 组件测试在 Copilot CLI 的 macOS 沙箱环境中触发 SIGSEGV 崩溃，尽管给予了缓存目录读写权限。
- **状态：** Open

### **#5604: ACP 模式忽略 Fusion Tier 配置**
- **重要性：** 🔴 **配置路由错误**
- **摘要：** 设置 `fusionTier=high` 后，`copilot -p` 能正确路由至 HydraFusion，但 `copilot --acp` 仍使用默认的 Standard 路由。
- **状态：** Open

### **#5440: Agent Plugins 1.0 配置文件被忽略**
- **重要性：** 🟡 **插件开发体验**
- **摘要：** 使用 Agent Plugins 1.0 格式时，`rules/` 目录下的 `.instructions.md` 和 `applyTo` 前置属性被静默忽略。
- **状态：** Open

### **#5591: Windows 凭据管理器被大量垃圾条目填满**
- **重要性：** 🟡 **系统资源管理**
- **摘要：** CLI 在 Windows 上不断创建 `copilot-mcp-oauth` 条目且从不清理，导致其他应用（如 `az devops login`）无法写入凭据。
- **状态：** Open

### **#5590: Gemini 4 Neon 模型工具调用超时**
- **重要性：** 🟡 **新模型支持**
- **摘要：** 大型工具调用（>60s）导致 `/chat/completions` 空闲超时，出现 "Unexpected EOF" 错误。
- **状态：** Open

---

## 4. 重要 PR 进展
*(注：过去24小时内无 PR 更新)*

---

## 5. 功能需求趋势

通过对更新 Issue 的分析，社区关注点主要集中在以下几个技术方向：

1.  **Agent 插件与配置体系**
    - **趋势：** 社区正在深度使用 Agent Plugins 1.0，并反馈配置文件（如 `.instructions.md`）和工具暴露机制存在误读或遗漏。
    - **关键词：** `applyTo`, `rules`, `mcp.json`, `extension startup`.

2.  **ACP (Advanced Chat Protocol) 适配**
    - **趋势：** 随着第三方客户端（如 T3 Code）的兴起，ACP 模式下的功能对等性成为焦点，特别是如何让 ACP 也能感知到高级模型（如 Fusion）的能力。
    - **关键词：** `fusionTier`, `account quota`, `routing model`.

3.  **沙箱安全与构建隔离**
    - **趋势：** 沙箱功能虽然提升了安全性，但引入了新的兼容性问题，特别是在处理 Git 子模块、Cypress 测试和复杂文件路径时。
    - **关键词：** `sandbox`, `git submodule`, `Cypress`, `permissions`.

4.  **跨平台与认证健壮性**
    - **趋势：** Windows 环境下的凭据管理、macOS 上的 MSAL Keychain 保存问题以及远程环境连接的稳定性是高频反馈点。
    - **关键词：** `Windows Credential Manager`, `MSAL`, `remote-control`, `GHE.com`.

---

## 6. 开发者关注点

- **痛点 1：并发配置冲突**
  开发者在管理多个 MCP 服务器时，发现 `enable/disable` 命令同时执行可能导致状态混乱，这是 v1.0.118-1 重点修复的问题。

- **痛点 2：交互式体验不一致**
  用户反馈 CLI 在收到明确指令（如"不要添加 Co-authored-by"）后，仍会重复执行，且无法正确读取自定义规则文件，这严重影响了 Agent 的可信度。

- **痛点 3：上下文记忆与窗口管理**
  在处理大量推理 Token 时，上下文窗口的压缩逻辑导致模型能力被意外压缩（#5607），这影响了复杂任务的执行效果。

- **痛点 4：工具调用的可观测性**
  开发者希望获得更细粒度的工具执行反馈，例如区分工具是被正常完成、被拒绝还是因异常退出，以便更好地调试 Agent 工作流。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期**: 2026-11-28  
**数据来源**: anomalyco/opencode  
**分析师**: AI 开发技术分析师

---

## 1. 今日速览

今日社区动态集中在 **v2.x 版本回归问题修复** 与 **核心架构优化**。开发者普遍反馈 v2.4.x 版本在 TUI（终端界面）交互和会话管理上存在严重缺陷（如权限弹窗失效、ESC 中断导致数据丢失）。与此同时，PR #66919 成功实现了工具链的相互调用，标志着 OpenCode 核心能力向更复杂的编排架构迈进。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 社区热点 Issues（Top 10）

**1. [OPEN] Free tier issues: read this first** (#59387)
*   **重要性**: 🔥 **社区最热**
*   **摘要**: 关于免费层（Free Tier）的集中反馈区，包含使用量超限、重置失败等高频问题。当前有 416 条评论，获赞 31 次。
*   **链接**: [anomalyco/opencode Issue #59387](https://github.com/anomalyco/opencode/issues/59387)

**2. [OPEN] Official - OpenCode VS Code extension** (#11176)
*   **重要性**: 🌟 **功能需求**
*   **摘要**: 请求将 OpenCode 作为官方 VS Code 扩展发布，以获得原生运行体验。虽创建于 2026-01，但近期热度不减，获赞 166 次。
*   **链接**: [anomalyco/opencode Issue #11176](https://github.com/anomalyco/opencode/issues/11176)

**3. [CLOSED] TUI: "ask" permissions silently allowed** (#66861)
*   **重要性**: 🐛 **严重 Bug**
*   **摘要**: v2.4.x 版本中，Shell 和 WebFetch 工具的 `ask` 权限规则失效，不再弹出确认提示，这是从 v2.3.2 回归的严重安全问题。
*   **链接**: [anomalyco/opencode Issue #66861](https://github.com/anomalyco/opencode/issues/66861)

**4. [CLOSED] TUI: hitting Esc to interrupt deletes multiple messages** (#66824)
*   **重要性**: 🐛 **严重 Bug**
*   **摘要**: 在 v2.4.2 中，按 ESC 中断会话可能导致删除大量历史消息，破坏会话连续性。
*   **链接**: [anomalyco/opencode Issue #66824](https://github.com/anomalyco/opencode/issues/66824)

**5. [OPEN] Critical Regression** (#66555)
*   **重要性**: 🐛 **严重 Bug**
*   **摘要**: v2.0 版本引入的回归问题，强制所有子代理进入后台模式导致父代理频繁唤醒、上下文污染。这是 v2.0 的重要架构变更引发的争议。
*   **链接**: [anomalyco/opencode Issue #66555](https://github.com/anomalyco/opencode/issues/66555)

**6. [OPEN] ChatGPT subscription-sharing limit error** (#62529)
*   **重要性**: ⚙️ **订阅配置**
*   **摘要**: OpenCode 2.2.5 在 macOS 上报错“使用量超限”，尽管 ChatGPT 后台显示仍有配额，且导出的日志显示 `subscription_sharing_usage_limit_exceeded`。
*   **链接**: [anomalyco/opencode Issue #62529](https://github.com/anomalyco/opencode/issues/62529)

**7. [OPEN] subagents: explore agent denied free tier** (#49723)
*   **重要性**: 🤖 **Agent 行为**
*   **摘要**: 内置 `explore` 子代理在 CLI 模式下无法使用免费层级，且报错逻辑不一致。
*   **链接**: [anomalyco/opencode Issue #49723](https://github.com/anomalyco/opencode/issues/49723)

**8. [OPEN] agents: browser tools exposed despite deny** (#54044)
*   **重要性**: 🤖 **Agent 安全**
*   **摘要**: 一个明确在 Frontmatter 中拒绝浏览器工具的子代理，在获得 `execute` 权限时依然能调用浏览器命名空间（44个工具）。
*   **链接**: [anomalyco/opencode Issue #54044](https://github.com/anomalyco/opencode/issues/54044)

**9. [OPEN] tui: /sessions drops pinned sessions** (#66534)
*   **重要性**: 🎨 **TUI 体验**
*   **摘要**: 升级到 v2.4.2 后，TUI 会话管理器丢失了 v1.x 的置顶会话功能，且 Ctrl+F 无法跟随置顶行。
*   **链接**: [anomalyco/opencode Issue #66534](https://github.com/anomalyco/opencode/issues/66534)

**10. [OPEN] shell: permission scanner misses nested-shell quote mangling** (#66771)
*   **重要性**: 🔒 **Shell 安全**
*   **摘要**: Windows 环境下，模型生成的包含嵌套引号的 Shell 命令（如 `cmd /c "rmdir /s /q \"$p\""`）会被错误解析为递归删除根目录的命令。
*   **链接**: [anomalyco/opencode Issue #66771](https://github.com/anomalyco/opencode/issues/66771)

---

## 4. 重要 PR 进展（Top 10）

**1. feat(core): let tools call other tools through context.tool.call** (#66919)
*   **内容**: 实现了工具链的相互调用能力。现在工具可以通过 `context.tool.call` 直接调用其他工具，解决了之前工具间无法交互的架构限制。
*   **链接**: [anomalyco/opencode PR #66919](https://github.com/anomalyco/opencode/pull/66919)

**2. fix(core): keep the MCP SDK out of startup** (#66915)
*   **内容**: 优化启动性能。修复了即使未配置 MCP 服务器，`@modelcontextprotocol/client` 也会在启动时被加载的问题。
*   **链接**: [anomalyco/opencode PR #66915](https://github.com/anomalyco/opencode/pull/66915)

**3. fix(core): share pooled MCP connections across equivalent configs** (#66914)
*   **内容**: 优化 MCP 连接池。确保不同配置但等效的服务器共享连接池，避免重复连接开销。
*   **链接**: [anomalyco/opencode PR #66914](https://github.com/anomalyco/opencode/pull/66914)

**4. fix(simulation): make @opentui/core an optional peer** (#66917)
*   **内容**: 解决依赖兼容性问题。将 `@opentui/core` 设为可选依赖，允许在 Node 24 环境下安装 SDK，而不强制要求 Node >= 26.4。
*   **链接**: [anomalyco/opencode PR #66917](https://github.com/anomalyco/opencode/pull/66917)

**5. fix(core): bound the wait for a background compaction summary** (#66913)
*   **内容**: 修复后台压缩等待问题。为自动压缩时的后台摘要写入添加了超时绑定，防止会话长时间卡死。
*   **链接**: [anomalyco/opencode PR #66913](https://github.com/anomalyco/opencode/pull/66913)

**6. feat(core): support native Windows machine workers on the home** (#66912)
*   **内容**: 增强跨平台支持。为 Windows 环境添加了本地机器工作器支持，解决了路径硬编码和 Shell 配置问题。
*   **链接**: [anomalyco/opencode PR #66912](https://github.com/anomalyco/opencode/pull/66912)

**7. refactor(core): cache the normalized models.dev catalog** (#66214)
*   **内容**: 性能优化。缓存模型目录的规范化结果，避免每次进程启动时重复解析和计算。
*   **链接**: [anomalyco/opencode PR #66214](https://github.com/anomalyco/opencode/pull/66214)

**8. fix(session-ui): keep subagent cards apart** (#66918)
*   **内容**: UI 修复。修复子代理卡片在时间线中布局重叠的问题，提升了会话界面的可读性。
*   **链接**: [anomalyco/opencode PR #66918](https://github.com/anomalyco/opencode/pull/66918)

**9. fix(app): keep chevron from wrapping messages** (#66761)
*   **内容**: UI 修复。修复触摸设备上消息气泡的 Chevron（箭头）导致文本换行的问题。
*   **链接**: [anomalyco/opencode PR #66761](https://github.com/anomalyco/opencode/pull/66761)

**10. feat(mcp): trust private-network server certificates** (#60041)
*   **内容**: 安全增强。支持在首次使用时信任私有网络 MCP 服务器的自签名证书。
*   **链接**: [anomalyco/opencode PR #60041](https://github.com/anomalyco/opencode/pull/60041)

---

## 5. 功能需求趋势

1.  **IDE/桌面端集成**: **VS Code 官方扩展** (#11176) 依然是社区呼声最高的功能需求，显示出用户希望将 OpenCode 深度集成到主流开发环境中的强烈愿望。
2.  **多代理协同**: **Agent Teams** (#12711) 和 **工具链调用** (#66919) 反映了社区对多模型并行工作、复杂任务拆解和协作能力的关注。
3.  **订阅与计费**: **Free Tier 问题** (#59387) 和 **ChatGPT 订阅共享错误** (#62529) 持续占据热门位置，表明用户对付费模型和免费额度管理的体验高度敏感。

---

## 6. 开发者关注点

1.  **v2.4.x 回归问题**: 开发者集中反馈 v2.4.2 在 **权限控制** (#66861) 和 **会话中断** (#66824) 上出现了严重回归，严重影响生产力。
2.  **TUI 交互体验**: Windows 平台下的 **终端界面渲染** (#54173, #66534) 和 **快捷键行为** (#66824) 是高频痛点，特别是在非标准终端环境下。
3.  **多进程/并发稳定性**: **数据库锁定** (#53879) 和 **子会话阻塞** (#62636) 问题表明，在多进程或 CLI 模式下，OpenCode 的并发处理仍有优化空间。
4.  **依赖管理**: **Node 版本兼容性** (#62854) 和 **插件热重载** (#52240) 反映了在复杂开发环境（如 Bun、Node 24/26）下的集成稳定性问题。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期：** 2026-11-28  
**数据来源：** [badlogic/pi-mono](https://github.com/badlogic/pi-mono)

---

## 1. 今日速览
Pi 社区在 **v1.7.0** 版本中迎来了 **终端会话恢复** 这一核心功能，允许兼容终端在重启后恢复原有会话配置。同时，针对多模态 LLM 的支持（视频/音频输入）成为开发者最迫切的需求，多个高热度 Issue 正在讨论如何增强 Prompt 命令的 multimodal 能力。此外，针对 Windows 平台和 NixOS 环境的兼容性修复，以及性能优化（如解决 Codemode 嵌套调用导致的 OOM）也是本周关注的重点。

---

## 2. 版本发布：v1.7.0
*   **新特性：**
    *   **Terminal session resume (终端会话恢复)：** 兼容的终端现在可以在重启后恢复当前 Pi 会话，保留原有的配置文件、工具限制和指令上下文。这是本次版本最大的亮点，极大提升了 CLI 交互的稳定性。
*   **链接：** [Release v1.7.0](https://github.com/badlogic/pi-mono/releases/tag/v1.7.0)

---

## 3. 社区热点 Issues (Top 10)
以下 Issues 反映了社区最活跃的讨论方向和当前的技术痛点：

1.  **[OPEN] Support video/audio content in prompt command** (#3200)
    *   **重要性：** 高。社区希望扩展 `prompt` RPC 命令以支持视频和音频，以配合 GPT-4o、Gemma 4 等多模态模型。
    *   **社区反应：** 13个评论，8个点赞。讨论热烈，主要涉及如何在现有 `images` 结构中扩展多模态字段。

2.  **[OPEN] Normalize optional object tool schemas for OpenAI-compatible providers** (#7010)
    *   **重要性：** 高。AI 插件开发者关注。当前 `@earendil-works/pi-ai` 在转发工具 Schema 时未正确处理 `required` 字段，可能导致与 OpenAI 兼容接口调用失败。
    *   **社区反应：** 9个评论，1个点赞。

3.  **[OPEN] Failed auto-compaction resumes work and retries indefinitely** (#12483)
    *   **重要性：** 极高（P0）。在处理大上下文（如 DeepSeek Flash）时，自动压缩功能出现死循环，可能导致内存溢出。
    *   **社区反应：** 3个评论。用户反馈严重影响了长会话的使用体验。

4.  **[OPEN] On Windows, bash timeout kill leaves pipeline processes orphaned** (#9129)
    *   **重要性：** 中高。Windows 环境下的 bash 超时处理存在进程孤儿问题，可能残留后台任务。
    *   **社区反应：** 5个评论，涉及 MSYS2 和 Git Bash 的具体环境差异。

5.  **[OPEN] Compaction fails permanently when the char-based token estimate undercounts** (#12572)
    *   **重要性：** 高。针对 CJK 字符和超大 `maxTokens` 场景，字符数估算方法会导致压缩永久失败。

6.  **[OPEN] Expose public MCP extension hooks for host-managed file transfers** (#12600)
    *   **重要性：** 中。关于 MCP (Model Context Protocol) 扩展的 API 开放性讨论，旨在支持更灵活的文件传输能力。

7.  **[OPEN] Optional wrap width for assistant prose only** (#12607)
    *   **重要性：** 中。关于文本换行宽度的需求，希望像 Claude Code 一样在保持代码块宽度的同时优化 prose 阅读体验。

8.  **[CLOSED] Backward character jump stops at the start of a line** (#12636)
    *   **重要性：** 低（UI Bug）。TUI 编辑器中光标回跳功能的逻辑缺陷，已修复。

9.  **[CLOSED] Optional wrap width for assistant prose only** (#12607)
    *   **重要性：** 低。需求未被采纳，社区反馈较少。

10. **[CLOSED] Virtual model can trigger compaction on an empty session** (#12632)
    *   **重要性：** 中。虚拟模型的上下文阈值检查逻辑修复。

---

## 4. 重要 PR 进展 (Top 10)
以下 PR 展示了项目的最新开发方向和 bug 修复：

1.  **[OPEN] fix(chord,p3): process locks on macOS and the BSDs** (#12635)
    *   **内容：** 修复了 macOS 和 BSD 上 Chord 进程锁的文件残留问题，解决因进程被信号杀死后锁文件未清理导致的后续锁定失败。

2.  **[OPEN] Google AI plan** (#12614)
    *   **内容：** 新增 Google AI 计划支持（推测为新的 Provider 集成）。

3.  **[CLOSED] fix(coding-agent): keep $ in exported HTML** (#12609)
    *   **内容：** 修复了导出 HTML 时成本显示丢失美元符号（`$`）的问题，通过修复 `String.prototype.replace` 的逻辑实现。

4.  **[CLOSED] fix(coding-agent): detect WSL without the WSL environment variables** (#12634)
    *   **内容：** 统一并优化了 WSL 环境的检测逻辑，解决依赖不同环境变量导致的检测不一致问题。

5.  **[CLOSED] feat(ai): add pi-image API** (#12535)
    *   **内容：** 新增 `pi-image` 通用图像生成协议，提供与 `pi-messages` 和 `pi-decision` 类似的统一接口。

6.  **[CLOSED] Add CTYUN Token Plan provider** (#12611)
    *   **内容：** 添加腾讯云 Token Plan 计划作为内置 Provider，支持 OpenAI 兼容的七种模型。

7.  **[CLOSED] feat(interactive): auto-reload resources on file change** (#12610)
    *   **内容：** 增强交互体验，当本地资源（扩展、主题等）文件发生变化时，无需手动执行 `/reload` 即可自动重载。

8.  **[CLOSED] fix(ai): GitHub Copilot mai-code models don't support temperature** (#12604)
    *   **内容：** 修复了 GitHub Copilot 专用模型不支持 `temperature` 参数导致的错误。

9.  **[CLOSED] docs(p3): link reference artifacts** (#12628)
    *   **内容：** 更新了 P3 (Pi Project 3) 的文档，添加了“参考工件”部分，补充了 Discord 上分享的产品规格文档链接。

10. **[CLOSED] support AGENTS.local.md in the coding agent** (#12543)
    *   **内容：** 增强编码智能体对本地配置文件 `AGENTS.local.md` 的支持，完善了配置文件的加载优先级逻辑。

---

## 5. 功能需求趋势
根据 Issues 和 PR 的分析，社区当前的开发趋势主要集中在：
*   **多模态增强：** 极力推动 `prompt` 命令支持视频和音频输入，以适配最新的 LLM 能力。
*   **性能与稳定性：** 针对 Windows 环境下的进程管理、大上下文压缩机制以及长会话的内存管理进行深度优化。
*   **协议与集成：** 加速 MCP (Model Context Protocol) 的落地，特别是文件传输等扩展功能的 API 开放。
*   **本地化与兼容性：** 添加更多国内云服务商（如 CTYUN）和本地模型（llama.cpp）的 Provider 支持。

---

## 6. 开发者关注点
从高频反馈中总结出的痛点：
1.  **Windows 平台体验：** bash 超时杀进程、环境变量检测、NixOS 的 Node 版本锁定等问题是 Windows/Linux 特定环境下的主要困扰。
2.  **上下文管理：** 当会话很长时，自动压缩功能的准确性（特别是针对 CJK 字符）直接决定了工具是否能持续运行。
3.  **API 细节：** 开发者在构建插件时，经常遇到 OpenAI 兼容接口的字段不匹配（如 `streamFunctionCallArguments`、Tool Schema normalization）问题。
4.  **UI/UX 细节：** TUI 的时间戳显示、消息跳转、换行宽度等细节功能需求频繁出现，说明用户对交互体验有较高期待。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-11-28  
**来源：** [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 1. 今日速览
- **版本更新**：TypeScript SDK 发布 v0.1.39，捆绑 CLI 版本至 0.28.7，包含预编译的 CLI 二进制文件。
- **CI 状态**：昨日 CI 失败较多，主要集中在 E2E 测试和 Managed Agent（托管代理）相关的 MySQL 集成测试上，目前已有部分失败被标记为“临时性”。
- **关键进展**：Managed Agent 的 Pull Scheduling（拉取调度）设计文档已发布，这是对托管会话工作流的重要优化，旨在通过 HTTP 长轮询让 Harness 实例主动获取任务。

---

## 2. 版本发布
**sdk-typescript-v0.1.39**
- **摘要**：SDK 发布了 v0.1.39 版本，该版本捆绑了 CLI v0.28.7。
- **更新内容**：CLI 版本直接从源码构建，与 SDK 处于同一分支/引用，确保了工具链的一致性。
- **链接**：[sdk-typescript-v0.1.39](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.39)

---

## 3. 社区热点 Issues

### 🔴 高优先级 / 影响稳定性
1. **#18258 Main CI failed: Managed Agent gate — HostedMonitorRunFaultGatesIT...**
   - **重要性**：高。涉及托管代理的进程故障门控测试，是核心功能的自动化验证。
   - **状态**：Open，评论数 37。
   - **链接**：[Issue #18258](https://github.com/QwenLM/qwen-code/issues/18258)

2. **#18489 bug(serve): v0.28.7 worktree retention freezes event loop**
   - **重要性**：极高。v0.28.7 引入了一个严重的性能问题，在处理 30 万文件快照时导致事件循环冻结 6-8 分钟，严重影响服务可用性。
   - **反馈**：由核心维护者 wenshao 提交，社区高度关注。
   - **链接**：[Issue #18489](https://github.com/QwenLM/qwen-code/issues/18489)

3. **#17489 Windows: project settings created after startup are never hot-reloaded**
   - **重要性**：高。Windows 平台下的配置热重载失效，导致用户无法动态添加 MCP 服务器。
   - **状态**：Ready for Agent。
   - **链接**：[Issue #17489](https://github.com/QwenLM/qwen-code/issues/17489)

### 🟡 中优先级 / 功能请求
4. **#18514 proposal(managed-agent): Enable pull scheduling for Hosted Harness**
   - **重要性**：中。关于托管 Harness 的 Pull Scheduling（拉取调度）功能提案，允许 Harness 通过 HTTP 长轮询获取任务，优化资源利用。
   - **状态**：Need Discussion。
   - **链接**：[Issue #18514](https://github.com/QwenLM/qwen-code/issues/18514)

5. **#18486 Desktop AppImage: gray window on current Mesa**
   - **重要性**：中。Linux 桌面端 AppImage 在较新的 Mesa 驱动下出现渲染问题（灰色窗口）。
   - **链接**：[Issue #18486](https://github.com/QwenLM/qwen-code/issues/18486)

6. **#18524 Developer guide still uses npm install...**
   - **重要性**：中。文档中的开发指南未使用 pnpm，与 CI 环境不一致。
   - **链接**：[Issue #18524](https://github.com/QwenLM/qwen-code/issues/18524)

7. **#18492 Ink TUI forgets checked options when scrolling**
   - **重要性**：中。CLI 界面在滚动时丢失用户的选择和输入内容，影响交互体验。
   - **链接**：[Issue #18492](https://github.com/QwenLM/qwen-code/issues/18492)

8. **#18508 fix(web-shell): opening Artifacts should show the list**
   - **重要性**：中。Web Shell 打开工件时 UI 逻辑错误，应显示列表而非恢复预览标签。
   - **链接**：[Issue #18508](https://github.com/QwenLM/qwen-code/issues/18508)

9. **#18553 fix(web-shell): surface branch sourceWarnings**
   - **重要性**：中。Web Shell 在分支切换失败或中止时未正确显示警告信息。
   - **链接**：[Issue #18553](https://github.com/QwenLM/qwen-code/issues/18553)

10. **#18527 fix(web-shell): restore secondary session color groups**
    - **重要性**：中。Web Shell 在非主工作区下无法正确恢复会话颜色分组。
    - **链接**：[Issue #18527](https://github.com/QwenLM/qwen-code/issues/18527)

---

## 4. 重要 PR 进展

1. **#18561 docs(managed-agent): Design Harness pull for released Sessions**
   - **内容**：发布 Pull Scheduling（拉取调度）的设计文档（含中英文），详细说明了 P1 阶段的实现方案。
   - **状态**：Open。
   - **链接**：[PR #18561](https://github.com/QwenLM/qwen-code/pull/18561)

2. **#18511 fix(core): resolve Hugging Face router ids with a provider suffix**
   - **内容**：修复 Hugging Face 路由 ID 解析逻辑，支持带 provider 后缀的模型 ID。
   - **状态**：Open。
   - **链接**：[PR #18511](https://github.com/QwenLM/qwen-code/pull/18511)

3. **#18549 feat(verify-pr): add destructive-diff adversarial protocol...**
   - **内容**：增强 PR 验证流程，引入对抗性验证协议和机械发布守卫，防止数据丢失。
   - **状态**：Open。
   - **链接**：[PR #18549](https://github.com/QwenLM/qwen-code/pull/18549)

4. **#18573 test(core): freeze the keyframe timeout clock**
   - **内容**：修复视频关键帧提取测试的时钟问题，确保测试的确定性。
   - **状态**：Open。
   - **链接**：[PR #18573](https://github.com/QwenLM/qwen-code/pull/18573)

5. **#18528 fix(core): ask DashScope to stream tool-call arguments**
   - **内容**：修复 DashScope 模型的工具调用参数流式传输问题。
   - **状态**：Open。
   - **链接**：[PR #18528](https://github.com/QwenLM/qwen-code/pull/18528)

6. **#18535 fix(serve): fail closed on unreadable worktree sidecars**
   - **内容**：修复会话删除时未正确处理不可读的 worktree sidecar，防止残留。
   - **状态**：Open。
   - **链接**：[PR #18535](https://github.com/QwenLM/qwen-code/pull/18535)

7. **#18570 fix(core): skip incomplete worktree snapshot pairs**
   - **内容**：修复历史 worktree 恢复时的快照对完整性检查逻辑。
   - **状态**：Open。
   - **链接**：[PR #18570](https://github.com/QwenLM/qwen-code/pull/18570)

8. **#18572 fix(core): recognize extension Mod metadata in hook validation**
   - **内容**：修复扩展 Mod 在 Hook 验证时对 metadata 的识别问题。
   - **状态**：Open。
   - **链接**：[PR #18572](https://github.com/QwenLM/qwen-code/pull/18572)

9. **#18543 feat(web-shell): decouple ChatEditor daemon toolbar...**
   - **内容**：Web Shell 前端重构，解耦编辑器和上传逻辑，减少对 daemon 的依赖。
   - **状态**：Open。
   - **链接**：[PR #18543](https://github.com/QwenLM/qwen-code/pull/18543)

10. **#18568 test(integration): keep the distribution process observer off the PTY loop**
    - **内容**：优化集成测试中的进程观察器逻辑，避免阻塞 PTY 事件循环。
    - **状态**：Open。
    - **链接**：[PR #18568](https://github.com/QwenLM/qwen-code/pull/18568)

---

## 5. 功能需求趋势
1. **Managed Agent 优化**：社区对托管代理的自动化调度、资源管理和故障门控测试高度关注，相关 PR 和 Issue 占据了很大比例。
2. **Web Shell 交互改进**：多个 Issue 提到了 Web Shell 的 UI 逻辑错误（如 Artifacts 显示、颜色分组、警告提示），反映了前端体验的改进需求。
3. **跨平台兼容性**：Windows 配置热重载失效和 Linux AppImage 渲染问题表明跨平台支持仍需加强。
4. **CLI 体验**：Ink TUI 的交互 bug 提示了命令行工具在复杂场景下的稳定性问题。

---

## 6. 开发者关注点
- **性能问题**：v0.28.7 版本引入的 6-8 分钟事件循环冻结是当前最紧急的痛点，直接影响生产环境稳定性。
- **CI 失败率**：Managed Agent 相关的 MySQL 测试失败较多，可能需要调整测试策略或优化数据库连接。
- **文档与工具链**：文档中使用的 `npm install` 与 CI 的 `pnpm` 不一致，可能导致开发者踩坑。
- **测试稳定性**：多个测试被标记为 flaky（不稳定），需要进一步排查根本原因。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026‑11‑28）

## 1. 今日速览
- 过去 24 小时内没有新 Release，社区主要围绕 **依赖升级** 与 **bug 修复** 进行活跃。  
- 关键 Issue **#7562**（compaction 逻辑缺陷）已在昨日关闭，标志着历史压缩模块的可靠性提升。  
- 10 条依赖升级 PR（sha2、qrcode、lru、ahash、gix 等）已进入审阅阶段，为后续性能和安全性奠定基础。  

---

## 2. 版本发布
> **无**（过去 24 小时内未发布新版本）

---

## 3. 社区热点 Issues（本期仅 1 条）

| # | 标题 / 简要 | 重要性 | 当前状态 | 关键讨论 | 链接 |
|---|------------|--------|----------|----------|------|
| 7562 | **compaction: loose scan can delete a user turn that pastes the summary header** | 高 – 影响历史压缩时用户消息的完整性，可能导致重要对话被误删 | 已关闭（2026‑11‑27） | 讨论聚焦在 **provenance‑stamped checkpoint** 的实现细节，社区普遍认同该修复是必须的。 | https://github.com/codewhale-hq/Codewhale/issues/7562 |

> **说明**：虽然本期仅有一条 Issue，但它直接关系到核心引擎的可靠性，已得到快速响应并在当天关闭，展现了维护团队的响应速度。

---

## 4. 重要 PR 进展（挑选 10 条）

| # | 标题 | 类型 | 关键改动 | 影响范围 | 链接 |
|---|------|------|----------|----------|------|
| 7573 | **build(deps): bump sha2 from 0.10.9 to 0.11.1** | 依赖升级 | 更新 `sha2` 哈希库至最新安全版本 | 全库安全性提升 | https://github.com/codewhale-hq/Codewhale/pull/7573 |
| 7572 | **build(deps): bump qrcode from 0.14.1 to 0.15.0** | 依赖升级 | 升级二维码生成库，包含 bug 修复 | TUI 中的二维码展示更可靠 | https://github.com/codewhale-hq/Codewhale/pull/7572 |
| 7571 | **build(deps): bump lru from 0.19.0 to 0.19.2** | 依赖升级 | 小幅提升 LRU 缓存实现，修复已知内存泄漏 | 缓存层性能/内存占用 | https://github.com/codewhale-hq/Codewhale/pull/7571 |
| 7570 | **build(deps): bump publish action** | CI 依赖升级 | 更新 GitHub Action 脚本至最新提交 | CI 稳定性提升 | https://github.com/codewhale-hq/Codewhale/pull/7570 |
| 7569 | **build(deps): bump ahash from 0.8.12 to 0.8.13** | 依赖升级 | 引入 `ahash` 性能改进与安全补丁 | 哈希计算更快、更安全 | https://github.com/codewhale-hq/Codewhale/pull/7569 |
| 7568 | **build(deps): bump gix from 0.90.0 to 0.91.0** | 依赖升级 | Gix（Gitoxide）升级，包含破坏性 API 调整 | 与 Git 交互的插件受益 | https://github.com/codewhale-hq/Codewhale/pull/7568 |
| 7567 | **build(deps): bump actions/create-github-app-token from 3.3.0 to 3.4.0** | CI 依赖升级 | 更新 GitHub App Token Action，修复 token 失效问题 | CI 认证更稳健 | https://github.com/codewhale-hq/Codewhale/pull/7567 |
| 7566 | **build(deps): bump codewhale-hq/Codewhale** | CI 依赖升级 | 同步主仓库的最新 CI 脚本 | CI 流程统一化 | https://github.com/codewhale-hq/Codewhale/pull/7566 |
| 7565 | **fix(engine): preserve pasted summary headers during compaction** | Bug 修复 | 让压缩过程保留用户粘贴的摘要头部，避免误删 | 直接解决 Issue #7562 中的问题 | https://github.com/codewhale-hq/Codewhale/pull/7565 |
| 7563 | **fix(tui): open inline skill completion after CJK text** | Bug 修复 | 修复中文/日文环境下技能自动补全失效的情况 | 国际化使用体验提升 | https://github.com/codewhale-hq/Codewhale/pull/7563 |

> **总体评估**：本轮 PR 以 **依赖安全/性能升级** 为主，说明项目正通过持续的供应链维护来提升整体稳定性；两项关键 bug 修复（#7565、#7563）分别针对核心压缩逻辑和 CJK 文本交互，直接提升了用户在中文环境的使用感受。

---

## 5. 功能需求趋势

从本期 Issue 与 PR（主要是依赖升级）中可以提炼出社区关注的几个方向：

| 趋势 | 具体表现 |
|------|----------|
| **安全/依赖维护** | 大量 Dependabot PR 表明社区对第三方库的安全更新保持高度警觉。 |
| **历史压缩可靠性** | Issue #7562 与 PR #7565 关注 *compaction* 时的消息保留，暗示用户对长对话保存的需求在增长。 |
| **多语言交互** | PR #7563 解决 CJK 文本下的技能弹窗，体现对 **中文/日文** 用户体验的重视。 |
| **CI/发布流程自动化** | 多条 CI 相关依赖升级 PR（actions、publish 脚本）显示社区希望 **持续集成** 更加稳健、可追溯。 |

---

## 6. 开发者关注点

1. **依赖安全与兼容性**  
   - 连续 9 条 Dependabot PR 说明开发者担心旧版库的安全漏洞与兼容性问题，期待官方快速合并更新。  

2. **历史数据完整性**  
   - Compaction 过程中可能误删用户消息的 bug 获得快速响应，表明**对对话历史的完整保存**是关键需求。  

3. **国际化交互**  
   - CJK 文本下的技能自动补全失效被及时修复，反映出中文社区对 **自然语言交互** 的期待日益提升。  

4. **CI 稳定性**  
   - 多个 CI 依赖的升级 PR 表明开发者在意 **构建、发布流水线的可靠性**，希望减少因工具链变动导致的构建失败。  

5. **插件生态与本地化**  
   - 虽然本期未出现新插件需求，但在 PR #7445 中提到的 **maintainer gate 与 regression stage** 暗示社区正在为插件质量把关制定更严格的流程。  

---

> **结语**：今天的社区活动展示了 DeepSeek TUI 在 **安全、可靠性** 与 **跨语言体验** 三个核心维度的持续投入。随着依赖升级的陆续合并和关键 bug 的快速修复，项目的技术基础正变得更加稳固，为后续功能扩展（如 IDE 集成、模型切换）提供了可靠的支撑。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*