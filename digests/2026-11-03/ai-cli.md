# AI CLI 工具社区动态日报 2026-11-03

> 生成时间: 2026-11-03 01:55 UTC | 覆盖工具: 9 个

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
（截至 2026‑11‑03）  

---

## 1. 热门 Skills 排行（评论/关注度最高的 5‑8 条 PR）

| 排名 | PR 编号 & 链接 | 功能概述 | 社区讨论热点 | 当前状态 |
|------|----------------|----------|--------------|----------|
| 1 | **#1742** – <https://github.com/anthropics/skills/pull/1742> | 为 **mcp‑builder** 添加对 `mcp>=2` 的兼容：改用 `streamable_http_client`，并支持自定义 HTTP Header。 | - 兼容性回退导致的构建失败<br>- 对企业内部 MCP 服务的安全 Header 配置需求 | **OPEN** |
| 2 | **#1298** – <https://github.com/anthropics/skills/pull/1298> | 重构 **skill‑creator**：隔离触发器评估，修复 Windows 子进程管道竞争及运行时异常。 | - Windows 环境下的可靠性<br>- 触发器误报导致的优化偏差 | **OPEN** |
| 3 | **#1245** – <https://github.com/anthropics/skills/pull/1245> | **Notion‑Spec‑to‑Implementation**：把产品/技术规格页面自动拆解为 Notion 任务、验收标准与进度跟踪。 | - 文档到执行的端到端工作流<br>- 与 Notion API 的权限管理 | **OPEN** |
| 4 | **#1771** – <https://github.com/anthropics/skills/pull/1771> | **proofcore‑contract‑auditor**：静态分析 Solidity / Rust 合约并把审计证明写入 TON 区块链。 | - Web3 开发者对自动化审计的强烈需求<br>- 零存储 Merkle 证明的安全模型讨论 | **OPEN** |
| 5 | **#1703** – <https://github.com/anthropics/skills/pull/1703> | **md2video‑audio**：零成本将 Markdown 文档直接渲染为带真人配音的 MP4 视频。 | - 内容创作流水线的“文档 → 视频”转换<br>- 语音合成质量与版权风险 | **OPEN** |
| 6 | **#525** – <https://github.com/anthropics/skills/pull/525> | **pyxel**：在 Claude Code 中完整支持 Pyxel 复古游戏开发（创建、调试、帧检查等）。 | - 教育/娱乐类 Skill 的受众增长<br>- 对图形渲染与输入仿真的测试需求 | **OPEN** |
| 7 | **#514** – <https://github.com/anthropics/skills/pull/514> | **document‑typography**：对生成文档进行排版质量检查（孤字、寡行、编号错位等）。 | - 文档可读性与品牌形象的细节要求<br>- 与现有 PDF/Docx 处理链路的兼容性 | **OPEN** |
| 8 | **#1980** – <https://github.com/anthropics/skills/pull/1980> | 移除 **webapp‑testing** 中 `subprocess.Popen(..., shell=True)`，消除命令注入风险。 | - 安全审计与 CWE‑78 防护<br>- 对测试环境隔离的最佳实践讨论 | **OPEN** |

> **备注**：这些 PR 均在列表中出现且评论数（或社区关注度）最高，虽然目前仍标记为 *OPEN*，但已引起多轮技术讨论，预计会在短期内合并。

---

## 2. 社区需求趋势（从 Issues 抽取的热点方向）

| 需求方向 | 关键 Issue（链接） | 需求简述 |
|----------|-------------------|----------|
| **安全与信任边界** | #492 – <https://github.com/anthropics/skills/issues/492> | 防止社区技能冒充官方 `anthropic/` 命名空间，避免权限提升风险。 |
| **组织内部 Skill 共享** | #228 – <https://github.com/anthropics/skills/issues/228> | 提供组织级别的 Skills 库或共享链接，省去手动下载/上传流程。 |
| **工具调用可靠性** | #556 – <https://github.com/anthropics/skills/issues/556> | `run_eval.py` 在评估时几乎不触发任何 Skill，导致自动化评估失效。 |
| **上下文压缩 / 记忆管理** | #1329 – <https://github.com/anthropics/skills/issues/1329> | 引入 **compact‑memory** 以符号化压缩长期记忆，降低上下文占用。 |
| **Token 消耗控制** | #1487 – <https://github.com/anthropics/skills/issues/1487> | `claude‑api` Skill 在单次调用时注入 ~156k Token，耗尽上下文窗口。 |
| **Skill 可用性与迁移** | #62 – <https://github.com/anthropics/skills/issues/62> | 已上传的自定义 Skills 突然消失，导致项目中断。 |
| **文档质量与一致性** | #189 – <https://github.com/anthropics/skills/issues/189> | `document‑skills` 与 `example‑skills` 插件出现重复 Skill，浪费上下文。 |
| **功能细节修正** | #2018 – <https://github.com/anthropics/skills/issues/2018> | `docx/merge_runs.py` 生成无效 XML，破坏文档完整性。 |

**趋势概括**：社区正集中在 **安全/信任、组织协作、运行时可靠性、上下文/Token 效率** 四大核心需求上。

---

## 3. 高潜力待合并 Skills（评论活跃且可能近期落地）

| PR 编号 & 链接 | 关键价值 | 讨论焦点 | 预计合并窗口 |
|----------------|----------|----------|--------------|
| **#1742** – <https://github.com/anthropics/skills/pull/1742> | 兼容最新 MCP 版本，保证企业内部流水线不中断。 | Header 配置安全、向后兼容策略。 | 短期（1‑2 周） |
| **#1298** – <https://github.com/anthropics/skills/pull/1298> | Windows 环境下触发器评估稳定性提升。 | 子进程管道竞争、错误传播。 | 中期（≈1 个月） |
| **#1245** – <https://github.com/anthropics/skills/pull/1245> | 端到端的 Spec → Task 转换，降低需求实现成本。 | Notion 权限、任务粒度定义。 | 中期（1‑2 个月） |
| **#1771** – <https://github.com/anthropics/skills/pull/1771> | Web3 合约审计自动化，填补智能合约安全工具空白。 | 零存储 Merkle 证明的可验证性。 | 中期（≈1 个月） |
| **#1703** – <https://github.com/anthropics/skills/pull/1703> | 文档到视频的“一键”转换，提升内容营销效率。 | 语音合成版权、渲染速度。 | 中期（1‑2 个月） |
| **#525** – <https://github.com/anthropics/skills/pull/525> | 支持 Pyxel 复古游戏全链路开发，拓展教育/娱乐场景。 | 图形帧检查、跨平台运行。 | 中期（≈1 个月） |
| **#514** – <https://github.com/anthropics/skills/pull/514> | 自动排版检查，提升生成文档的专业度。 | 与 PDF/Docx 处理的集成点。 | 短期（1‑2 周） |

> 这些 PR 已获得显著社区关注（多数评论 > 0、涉及安全/兼容性或新业务场景），且均处于 **OPEN** 状态，预计在下一轮合并周期内落地。

---

## 4. Skills 生态洞察

> **一句话总结**：社区当前最聚焦的是 **“提升 Skill 的安全可信、组织协作与上下文效率”，以支撑企业级自动化工作流和新兴业务（如 Web3、内容生成）落地。**

--- 

*报告编制：Claude Code Skills 生态技术分析师（基于 2026‑11‑03 数据）*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期**: 2026-11-03  
**数据来源**: [github.com/openai/codex](https://github.com/openai/codex)

---

### 1. 今日速览
过去24小时内，Codex 生态修复了大量并发与沙箱相关的底层稳定性问题，特别是 MCP (Model Context Protocol) 权限上下文处理与 SQLite 数据库并发锁的优化。同时，桌面端在 macOS 与 Windows 上的文件附件处理（XLSX）以及会话同步问题持续引发关注。社区反馈显示，尽管新版本 (26.102x) 性能有所提升，但 "服务器过载" (server_overloaded) 错误依然频繁打断长任务执行。

---

### 2. 版本发布
**无新版本发布** (截至 2026-11-03)。

---

### 3. 社区热点 Issues
以下是过去24小时内评论数最多且具有代表性的 10 个 Issue：

*   **#49453 [Windows/浏览器权限]** - **浏览器访问被保存的拒绝记录阻塞**
    *   **重要性**: 高。用户明确允许了本地浏览器，但应用仍无法访问，严重影响 Computer Use 功能体验。
    *   **反应**: 41 个评论，3 个点赞，涉及 ChatGPT Pro 订阅用户。

*   **#36454 [iOS/桌面同步]** - **iOS 远程项目列表与桌面端不同步**
    *   **重要性**: 中高。跨平台项目管理的核心痛点，iOS 端未将桌面端视为真理来源。
    *   **反应**: 22 个评论，用户版本为 1.2026.202。

*   **#56645 [Windows/设置]** - **工作设置中本地浏览器使用被禁用**
    *   **重要性**: 高。用户在桌面端试图启用浏览器功能时，被 Work 设置硬性阻断。
    *   **反应**: 20 个评论，版本 26.1016.62342。

*   **#58302 [macOS/附件]** - **macOS 桌面端 XLSX 附件一直处于发送转圈状态**
    *   **重要性**: 高。特定文件格式在桌面端无法处理，但 Web 端正常，定位困难。
    *   **反应**: 16 个评论，版本 26.1027.30824。

*   **#44449 [远程控制/锁死]** - **iOS 视图中的线程在桌面端失败并提示 "已有活动写入者"**
    *   **重要性**: 中。涉及远程控制功能的并发冲突问题，导致桌面端无法操作。
    *   **反应**: 12 个评论，7 个点赞。

*   **#52394 [Windows/长任务]** - **长任务反复报 "服务器过载" (At Capacity)**
    *   **重要性**: 高。尽管使用量仅剩 70%，但任务仍被中断，严重影响生产力。
    *   **反应**: 12 个评论，涉及模型切换尝试。

*   **#56755 [Windows/CUA]** - **IAB 页面渲染成功，但 Computer Use 报告浏览器不可用**
    *   **重要性**: 中。浏览器实例已启动，但 Agent 无法通过 API 连接，典型的连接层问题。
    *   **反应**: 10 个评论，版本 26.1021.31345。

*   **#50879 [云技能]** - **发布后的 Cloud Start Skill 在新任务上下文中缺失**
    *   **重要性**: 中。配置技能后无法在后续任务中调用，影响技能生态的可用性。
    *   **反应**: 9 个评论，版本 26.930.31730。

*   **#58482 [Windows/Computer Use]** - **Windows Computer Use 报告错误的聚焦元素**
    *   **重要性**: 中。影响自动化操作的准确性，特别是在计算器等工具类应用中。
    *   **反应**: 8 个评论。

*   **#51478 [Web/桌面/限流]** - **HTTP 429 重试失败导致 Web 和桌面端无法加载会话**
    *   **重要性**: 高。网络层限流处理不当导致大面积服务不可用。
    *   **反应**: 8 个评论。

---

### 4. 重要 PR 进展
以下是过去24小时内合并 (CLOSED) 的 10 个关键 Pull Requests：

*   **#59028 [MCP 权限]** - **在 Guardian 审查中使用准备好的 MCP 拥有者权限**
    *   **内容**: 修复了 MCP 工具步骤捕获上下文后，权限可能变更导致的安全审查遗漏问题。
*   **#59025 [工具定义]** - **移除 Code Mode Only 中的严格第三方工具延迟**
    *   **内容**: 允许 Code Mode Only 正确处理命名空间排除和动态工具暴露，减少限制。
*   **#59021 [并发安全]** - **允许安装 ID 的并发读取**
    *   **内容**: 解决了安装 ID 文件锁导致的串行化问题，提升启动性能。
*   **#59020 [沙箱上下文]** - **在准备好的 MCP 调用中保留沙箱上下文**
    *   **内容**: 确保权限解析依赖正确的目录上下文，防止权限策略失效。
*   **#59018 [监控]** - **添加带有重新认证标签的 WebSocket 连接指标**
    *   **内容**: 新增 `codex.websocket.connect` 和 `connect.duration_ms` 指标，便于追踪重认证事件。
*   **#59016 [元数据]** - **使观察到的线程元数据写入原子化且可重试**
    *   **内容**: 修复内存模式更新失败可能导致其他元数据变更丢失的问题。
*   **#59015 [数据库]** - **使 SQLite 架构迁移对并发启动安全**
    *   **内容**: 修复 SQLx 的 SQLite 锁在并发场景下的竞态条件，防止数据库损坏。
*   **#59009 [文件系统]** - **集中化文件系统权限解析以进行沙箱强制执行**
    *   **内容**: 统一 Linux 和 macOS 的权限检查逻辑，简化沙箱规则配置。
*   **#59003 [审查框架]** - **在弹性上下文限制下保留 Guardian 审查框架**
    *   **内容**: 确保即使上下文被截断，安全审查的警告和证据依然可见。
*   **#58989 [HTTP 回退]** - **在会话剩余时间内保持 HTTP 回退激活**
    *   **内容**: 一旦 WebSocket 失败回退到 HTTP，后续请求继续使用 HTTP，避免反复重连。

---

### 5. 功能需求趋势
从 Issues 中提炼出的社区关注点：
1.  **跨平台一致性**: iOS 与桌面端的项目列表、会话历史同步问题频繁出现。
2.  **文件处理稳定性**: XLSX 等特定附件格式在桌面端经常出现 pending 或丢失现象。
3.  **资源管理**: "服务器过载" (At Capacity) 错误在长任务中反复出现，用户期望更智能的排队或模型切换机制。
4.  **Computer Use 可靠性**: 浏览器连接、元素聚焦识别等底层自动化能力仍需打磨。

---

### 6. 开发者关注点
*   **性能瓶颈**: 尽管使用量充足，但 `server_overloaded` 错误频繁打断任务，成为最大痛点。
*   **并发安全**: 多设备/多应用同时使用时的状态锁、会话锁管理复杂。
*   **权限管理**: MCP 和沙箱环境的权限上下文传递、Guardian 审查逻辑需要更透明、更准确。
*   **用户体验细节**: 界面上被压缩的文本、隐藏的错误提示、被禁用的功能入口（如浏览器开关）降低了工具的可用性。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-03  
**分析对象**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)  

---

## 1. 今日速览
- **版本更新**：发布 v0.67.0-nightly.20261103，修复了 Whisper 模型下载中断导致的状态误判问题。
- **活跃度**：过去24小时内更新了 50 个 Issues 和 21 个 PR，社区讨论集中在代理稳定性、工具执行安全和 IDE 集成优化。
- **主要焦点**：**工具执行安全**（Shell 权限绕过、下载中断处理）和 **代理行为改进**（子代理恢复、超时处理）是当前最高优先级的修复方向。

---

## 2. 版本发布
**v0.67.0-nightly.20261103.g0ac57c029**
- **核心修复**：`fix(core)` - 防止 Whisper 模型下载被中断时被错误标记为已安装（PR #30058）。
- **影响范围**：解决因网络问题导致的模型缓存损坏，避免用户误以为模型已就绪。

---

## 3. 社区热点 Issues（Top 10）

| # | 标题 | 优先级 | 关键词 | 社区反应 |
|---|------|--------|--------|----------|
| **#22323** | Subagent 在 MAX_TURNS 后恢复为 GOAL success，隐藏中断 | P1 | Bug | 13评论，关注子代理状态管理 |
| **#28229** | Google AI Pro 用户 OAuth 登录失败 | P1 | Security | 9评论，涉及身份认证问题 |
| **#21409** | Generalist agent 挂起，文件夹创建等操作无限等待 | P1 | Bug | 8评论，高影响用户 |
| **#19873** | 利用 Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 | Enhancement | 9评论，探索模型原生 Bash 能力 |
| **#21968** | Gemini 未充分使用 Skills 和 Sub-agents | P2 | Bug | 7评论，工具调用效率低 |
| **#29058** | IDE 连接事件记录错误，破坏会话指标 | P2 | Bug | 3评论，影响监控分析 |
| **#29057** | Shell 执行失败时退出处理重复调用 | P2 | Bug | 3评论，资源泄漏风险 |
| **#29927** | 模型重复输出 "[The previous response was interrupted]" | P1 | Bug | 3评论，模型行为异常 |
| **#24246** | 超过 128 个工具时遇到 400 错误 | P2 | Bug | 3评论，工具数量限制 |
| **#23571** | 模型频繁在随机位置创建临时脚本 | P2 | Bug | 3评论，清理负担 |

**重点解读**：
- **#22323** 和 **#21409** 是最高优先级 Bug，直接导致核心功能不可用。
- **#19873** 反映社区对模型原生能力的深度探索需求，涉及安全性权衡。
- **#28229** 和 **#29058** 暴露了身份认证和监控系统的集成问题。

---

## 4. 重要 PR 进展（Top 10）

| # | 标题 | 状态 | 关键内容 |
|---|------|------|----------|
| **#30106** | chore/release: bump version to 0.67.0-nightly | Open | 自动化版本更新 |
| **#30102** | fix(core): log IDE connections with ide_connection event | Open | 修复事件名称错误，统一监控 |
| **#30100** | fix(cli): handle stream failures during extension downloads | Open | 处理下载中断、SSRF 防护 |
| **#30058** | fix(core): prevent interrupted Whisper downloads | Closed | 修复模型状态误判（已合并） |
| **#30095** | fix: prevent Windows git diff permission bypass | Open | 修复 Windows 权限绕过漏洞 |
| **#30051** | fix(cli): kill active shells on headless interruption | Open | 修复 Ctrl+C 导致的僵尸进程 |
| **#30097** | fix(cli): image paste work on WSL2 | Open | 支持 WSLg 剪贴板检测 |
| **#29978** | fix(core): keep oversized/boundary lines in read_background_output | Open | 修复日志读取丢失首行 |
| **#29977** | fix(core): honor cancellation in read_background_output | Open | 支持读取操作的中断取消 |
| **#30094** | fix(cli): show executing subagent tool calls in UI | Open | 改进子代理工具调用的 UI 可见性 |

**重点解读**：
- **#30102** 和 **#30095** 直接解决社区反馈的高频 Bug，提升系统稳定性。
- **#30051** 和 **#30097** 针对跨平台兼容性优化，尤其关注 Windows 和 WSL 环境。
- **#30094** 改善了代理工具调用的透明度，提升用户体验。

---

## 5. 功能需求趋势
从 Issues 中提炼出的核心方向：
1. **代理稳定性**：子代理恢复机制、超时处理、循环检测（如 #21409, #29927）。
2. **安全增强**：Shell 命令验证、权限绕过防护、下载中断处理（如 #30095, #30100）。
3. **工具能力扩展**：原生 Bash 支持、AST 感知文件读取（如 #19873, #22745）。
4. **IDE 集成优化**：事件记录修正、会话指标准确化（如 #29058, #30102）。

---

## 6. 开发者关注点
- **痛点**：
  - **资源泄漏**：Shell 执行失败时进程未清理（#29057）。
  - **状态不一致**：子代理恢复逻辑错误（#22323）。
  - **跨平台问题**：WSL2 剪贴板、Windows 权限绕过。
- **高频需求**：
  - 模型原生 Bash 能力的安全沙箱化。
  - 子代理行为的可观测性（轨迹可见性）。
  - 工具调用限制（>128 工具时的 400 错误）。

> **总结**：社区当前最关注的是**稳定性与安全性**，尤其是代理工具执行的可靠性和跨平台兼容性。新版本修复了 Whisper 模型问题，但仍有多个 P1/P2 Bug 需要跟进。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：** 2026-11-03
**来源：** github.com/github/copilot-cli

---

## 1. 今日速览
GitHub Copilot CLI 今日发布了三个版本（v1.0.106-5, -4, -3），重点修复了 ACP 模式下的 `includeCoAuthoredBy` 配置、会话管理交互以及括号内文件引用的解析问题。社区活跃度极高，今日更新了 48 个 Issue，主要集中在输入队列取消、多模型切换支持、Windows 交互体验以及 MCP OAuth 认证流程等方面。

---

## 2. 版本发布 (v1.0.106-5, v1.0.106-4, v1.0.106-3)

### v1.0.106-5 (最新)
*   **修复:** 在 ACP 模式 (`copilot --acp`) 中，`includeCoAuthoredBy: false` 配置现已生效，ACP 客户端不再指令代理添加 `Co-authored-by` trailer。
*   **改进:** 目标化的 `/settings` 命令现在会立即显示所选设置。
*   **修复:** 在恢复会话时，若未启用遥测，系统现在会发出警告。

### v1.0.106-4
*   **修复:** 空会话不再在消失前闪烁进入会话选择器。
*   **修复:** 写在括号、引号或反引号内的 `@file` 提及现在会正确附加文件并在 `!` shell 命令中展开，而非被静默忽略。
*   **改进:** 优化了会话管理工具和本地会话的 opt-in 功能。

### v1.0.106-3
*   **新增:** 增加可选的会话管理工具和 opt-in 本地会话的 `@mentions` 支持。
*   **改进:** Managed 账户策略刷新警告现在包含 Policy Helper 的发现结果，并在策略解决后自动清除。

---

## 3. 社区热点 Issues (Top 10)

1.  **[OPEN] Allow users to cancel or remove enqueued messages** (#1857)
    *   **热度:** 15 评论, 33 👍
    *   **摘要:** 用户无法取消或移除通过 `Ctrl+Q` / `Ctrl+Enter` 队列的消息，一旦队列满，Agent 忙碌时这些消息会自动按顺序执行，影响体验。
    *   **重要性:** 交互体验的核心痛点，高优先级需求。

2.  **[OPEN] Allow /model to switch between multiple models, including BYOK/local providers** (#3709)
    *   **热度:** 14 评论, 34 👍
    *   **摘要:** BYOK 模式将会话固定到单一模型，`/model` 选择器仅显示 GitHub 托管模型，无法选择本地 BYOK 提供商的模型。
    *   **重要性:** 满足企业级用户和高级开发者对本地私有模型和多模型切换的需求。

3.  **[CLOSED] includeCoAuthoredBy: false is ignored in ACP mode** (#5133)
    *   **热度:** 2 评论, 1 👍
    *   **摘要:** ACP 模式下忽略 `includeCoAuthoredBy` 配置，导致提交仍带有 Copilot trailer。该问题已在 v1.0.106-5 中修复。
    *   **重要性:** **已解决**，反映了社区对 ACP 工作流的关注。

4.  **[OPEN] Support OSC 7501 program status in the interactive CLI** (#5112)
    *   **热度:** 5 评论, 11 👍
    *   **摘要:** 请求在交互式 CLI 中支持 OSC 7501 协议，向终端报告 Agent 状态（工作/阻塞），以提升终端集成体验。
    *   **重要性:** 终端渲染和状态反馈的高级特性需求。

5.  **[OPEN] NumLock-off numpad navigation and Delete are ignored** (#5171)
    *   **热度:** 2 评论, 1 👍
    *   **摘要:** Windows 11 下 NumLock 关闭时，小键盘方向键和 Delete 键被忽略，影响无 NumLock 键的笔记本用户。
    *   **重要性:** 平台特定体验的回归 Bug，影响广泛用户群。

6.  **[OPEN] Authorization header dropped on JSON-RPC tools/call** (#3015)
    *   **热度:** 2 评论, 2 👍
    *   **摘要:** 使用 Streamable HTTP + OAuth 2.1 流程后，`initialize` 成功但后续 `tools/list` 和 `tools/call` 请求丢失 Authorization header。
    *   **重要性:** MCP (Model Context Protocol) 集成的底层稳定性问题。

7.  **[CLOSED] Ctrl+C while copying selected text cancels and declines confirmation** (#4789)
    *   **热度:** 1 评论
    *   **摘要:** 在确认对话框中高亮复制文本时按 Ctrl+C 会取消对话框而非仅复制，这是一个 UX Bug。
    *   **重要性:** **已解决**，属于交互逻辑的细节优化。

8.  **[OPEN] `/keep-alive` in WSL2 does not prevent the Windows host from sleeping** (#5304)
    *   **热度:** 2 评论
    *   **摘要:** WSL2 内运行的 Copilot CLI 无法阻止 Windows 主机休眠，导致长任务中断。
    *   **重要性:** 跨平台（WSL2）稳定性关键问题。

9.  **[OPEN] ACP: plugin skills aren't available in ACP sessions** (#5269)
    *   **热度:** 1 评论
    *   **摘要:** 在 ACP 模式下，插件加载了 Agent，但技能列表 (`available_commands_update`) 中没有插件技能。
    *   **重要性:** 插件生态在 ACP 工作流中的可用性问题。

10. **[OPEN] Repeated HTTP 422 cybersecurity-risk flags block legitimate local flaky-test debugging** (#5335)
    *   **热度:** 1 评论
    *   **摘要:** 安全扫描误报导致合法的本地测试调试请求被连续阻断。
    *   **重要性:** 安全策略与开发效率之间的平衡问题。

---

## 4. 重要 PR 进展 (Top 10)

1.  **[OPEN] Add read-only agent monitor TUI (Graph + Timeline)** (#5339)
    *   **内容:** 新增 `tools/agent-monitor` 工具，提供可视化的 Agent 监控界面，展示 Agent 启动关系、等待依赖等时序信息。
    *   **价值:** 极大提升了开发者调试和观察 Agent 行为的能力。

2.  **[OPEN] Add ADJU PHONE CAMERA Windows app** (#5321)
    *   **内容:** 一个 Windows 桌面应用，允许 Android/iPhone 通过本地 Wi-Fi 将摄像头画面传输给 PC，使用 WebRTC 点对点连接。
    *   **价值:** 这是一个非常独特的“工具扩展”PR，展示了社区对 Copilot CLI 交互方式的创新探索。

3.  **[CLOSED] ACP drops subagent source identity** (#4106)
    *   **内容:** 修复 ACP 模式下并行子代理输出时丢失源身份标识的问题。
    *   **价值:** **已解决**，提升了 ACP 并行处理的可追溯性。

4.  **[CLOSED] ACP: /session delete, cleanup and prune fail** (#5268)
    *   **内容:** 修复 ACP 模式下会话管理命令失败的问题。
    *   **价值:** **已解决**，增强了 ACP 会话管理的健壮性。

5.  **[CLOSED] `skillDirectories` setting from `settings.json` is not honored in ACP mode** (#4700)
    *   **内容:** 修复 ACP 模式下忽略自定义技能目录配置的问题。
    *   **价值:** **已解决**，恢复了配置文件的灵活性。

6.  **[CLOSED] CLI 1.0.97 starts a model outside the exact repository allowlist** (#5166)
    *   **内容:** 修复特定版本在 Prompt 模式下启动模型超出仓库允许列表的严重安全问题。
    *   **价值:** **已解决**，属于安全修复。

7.  **[CLOSED] Duplicate skills load from repository and installed plugin** (#4430)
    *   **内容:** 修复技能重复加载导致描述界面翻倍的问题。
    *   **价值:** **已解决**，优化了插件系统的资源管理。

8.  **[CLOSED] Terminal output is clipped after resize/reflow** (#3497)
    *   **内容:** 修复终端调整大小时输出被截断且无法通过滚动条访问的问题。
    *   **价值:** **已解决**，提升长输出场景的可读性。

9.  **[CLOSED] MCP OAuth: authorize request sends resource with a trailing slash** (#5337)
    *   **内容:** 修复 MCP OAuth 授权请求中资源 URL 尾随斜杠不一致的问题。
    *   **价值:** **已解决**，确保了 OAuth 流程的兼容性。

10. **[OPEN] userPromptTransformed hook is skipped for steering messages** (#4640)
    *   **内容:** 修复 Agent 处理中 Steering 消息跳过 `userPromptTransformed` 钩子的问题。
    *   **价值:** 影响自定义 Hook 的功能完整性，特别是注入固定指令的场景。

---

## 5. 功能需求趋势

*   **多模型与 BYOK 支持:** 社区强烈要求打破 BYOK 模式下单一模型的限制，允许在会话内或 Picker 中切换本地/第三方模型（如 DeepSeek）。
*   **交互与输入队列:** 如何优雅地取消或移除已排队的消息，以及优化输入框的交互细节（如括号引用、NumLock 兼容性），是高频反馈点。
*   **Agent 可观测性:** 新增的 Agent Monitor TUI PR 反映了社区对理解 Agent 内部工作流（Graph + Timeline）的迫切需求。
*   **ACP 模式深度集成:** 随着非交互式模式的普及，关于 ACP 模式下插件技能不可用、配置不生效、会话管理失败的问题占据了很大比例。

---

## 6. 开发者关注点

*   **稳定性与崩溃:** Windows 环境下的进程崩溃（0xc0000005）、WSL2 休眠问题以及长输出终端重排问题依然困扰着用户。
*   **MCP 认证流程:** OAuth 2.1 + DCR 流程中的 Header 丢失、资源 URL 格式不匹配以及 Entra 认证并发拒绝问题，阻碍了外部 MCP 服务器的集成。
*   **会话管理体验:** 从统一的会话浏览器切换带来的“空会话闪烁”、“信任提示误触”以及 `--resume` 无 ID 时行为异常，显著影响了日常使用流。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-11-03
**来源**: github.com/anomalyco/opencode

---

## 1. 今日速览
今日 OpenCode 社区动态活跃，主要集中在 **免费层限流问题** 的集中反馈上（单条 Issue 获 213+ 评论），同时修复了多个影响用户体验的关键 Bug，包括 TUI 记忆管理、会话配置选项回显错误以及支付与 Claude Agent 计费异常。此外，新增了模型使用情况展示和 MCP 服务器集成等实用功能。

---

## 2. 版本发布
无新版本发布。

---

## 3. 社区热点 Issues

| ID | 标题 | 状态 | 重要性/反应 | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| **#59387** | **Free tier issues: read this first** | OPEN | 🔥 **极高热度**：免费层用户集中反馈，涉及限流重置异常、额度显示错误等核心体验问题。 | [Link](https://github.com/anomalyco/opencode/issues/59387) |
| **#43250** | keep.tokens is not honoured | OPEN | **高关注度**：Agent 会话 Token 数量远超设置上限，导致上下文污染。 | [Link](https://github.com/anomalyco/opencode/issues/43250) |
| **#55446** | group sidebar sessions by project | OPEN | **功能需求**：用户希望像 Codex 一样按项目分组会话，提升 TUI 管理效率。 | [Link](https://github.com/anomalyco/opencode/issues/55446) |
| **#52958** | Payment methods declined from Italy | CLOSED | **支付问题**：意大利地区订阅支付失败，涉及多种支付方式。 | [Link](https://github.com/anomalyco/opencode/issues/52958) |
| **#61303** | New project resolves to C:\ root | OPEN | **Bug 报告**：Windows 下创建项目时路径解析异常，选中了根目录而非当前文件夹。 | [Link](https://github.com/anomalyco/opencode/issues/61303) |
| **#61304** | OpenbotJR closes issues prematurely | OPEN | **自动化问题**：机器人回复不及时或误判，导致用户反馈被强制关闭。 | [Link](https://github.com/anomalyco/opencode/issues/61304) |
| **#60753** | opencode-go gateway invalid JSON | CLOSED | **稳定性**：Zen 提供商间歇性返回无效 JSON，导致会话“卡死”无法恢复。 | [Link](https://github.com/anomalyco/opencode/issues/60753) |
| **#61072** | Claude Agent drains limit faster | CLOSED | **计费异常**：Claude Agent 的计费速度比官方 TUI 快 1.8 倍，疑似 SDK 标签问题。 | [Link](https://github.com/anomalyco/opencode/issues/61072) |
| **#61110** | provider whitelist has no effect | CLOSED | **配置问题**：Provider 白名单/黑名单设置对内置提供商无效。 | [Link](https://github.com/anomalyco/opencode/issues/61110) |
| **#61313** | transcript memory scales fully | OPEN | **性能优化**：TUI 保留完整会话日志，未应用压缩窗口限制，可能导致内存溢出。 | [Link](https://github.com/anomalyco/opencode/issues/61313) |

---

## 4. 重要 PR 进展

| ID | 标题 | 类型 | 摘要 | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| **#61311** | feat(app): show model usage in settings | New Feature | 在设置中展示每个模型的实际使用情况，帮助用户追踪配额。 | [Link](https://github.com/anomalyco/opencode/pull/61311) |
| **#61312** | docs: add TrendsAGI MCP server to ecosystem | Docs | 在文档中集成 TrendsAGI 托管的只读 MCP 服务器，提供 13 个工具。 | [Link](https://github.com/anomalyco/opencode/pull/61312) |
| **#58061** | fix(tui): allow configuring tab title marquee speed | Feature | 允许用户通过 `cli.json` 配置会话标签页跑马灯的速度。 | [Link](https://github.com/anomalyco/opencode/pull/58061) |
| **#55261** | feat(tui): add prompt history scope setting | Feature | 新增 `prompt.history_scope` 配置，支持在“全局”和“会话”级别过滤历史提示词。 | [Link](https://github.com/anomalyco/opencode/pull/55261) |
| **#59803** | fix(core): price Copilot long-context tiers | Bug Fix | 修复长会话中 Copilot 计费严重偏低的问题，确保成本核算准确。 | [Link](https://github.com/anomalyco/opencode/pull/59803) |
| **#57556** | fix(core): preserve valid env substitutions | Bug Fix | 修复环境变量替换在回退机制中的干扰问题，保持变量有效性。 | [Link](https://github.com/anomalyco/opencode/pull/57556) |
| **#57555** | fix(core): preserve undo on conflicting compaction | Bug Fix | 解决手动压缩冲突时的撤销/重做栈丢失问题，防止数据损坏。 | [Link](https://github.com/anomalyco/opencode/pull/57555) |
| **#60698** | feat(server): add experimental job list endpoint | Feature | 暴露 `/api/jobs` 端点，允许 CLI 和 SDK 调用者查看后台任务状态。 | [Link](https://github.com/anomalyco/opencode/pull/60698) |
| **#61300** | fix(cli): serialize plugin config updates | Bug Fix | 修复插件配置读写时的竞态条件，确保文件锁的原子性。 | [Link](https://github.com/anomalyco/opencode/pull/61300) |
| **#58846** | fix(core): repair V1 global sessions | Bug Fix | 修复 V1 升级遗留的全局会话修复逻辑，确保导入后数据完整性。 | [Link](https://github.com/anomalyco/opencode/pull/58846) |

---

## 5. 功能需求趋势

从 Issue 和 PR 的分析来看，社区当前最关注的方向包括：

1.  **会话管理与组织**：用户强烈要求改进 TUI 的会话列表组织方式（如按项目分组、区分全局与本地会话），以及 Prompt 历史记录的过滤范围。
2.  **性能与资源控制**：针对 Agent 会话的 Token 溢出（`keep.tokens` 失效）和 TUI 内存无限制增长问题，社区急需更严格的上下文压缩和内存限制机制。
3.  **支付与订阅体验**：意大利等地区的支付失败问题持续引发关注，同时订阅计费逻辑（如 Claude Agent 的计费速度）的准确性也是痛点。
4.  **工具与生态集成**：社区正在积极扩展 MCP 生态，新增 MCP 服务器文档和浏览器扩展控制功能，体现了对 Agent 自主操作能力的追求。

---

## 6. 开发者关注点

*   **稳定性与健壮性**：频繁出现的支付失败、会话卡死（JSON 无效）、配置选项不生效等问题，严重影响了开发者的日常使用信心。
*   **自动化交互体验**：OpenbotJR 机器人过于激进的自动关闭行为，导致开发者无法正常跟进问题，呼吁改进自动化逻辑。
*   **API 与配置透明度**：开发者希望更清晰地了解配额使用情况（如模型用量展示）以及 API 的版本兼容性，以更好地集成和调试。
*   **跨平台兼容性**：ARM64 (Debian XFCE) 和 Windows 路径解析的兼容性问题依然存在，需要开发团队在底层逻辑上加强测试。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-11-03)

## 1. 今日速览
Pi 项目于今日正式发布 **v1.5.0** 版本，核心亮点是引入了扩展更新日志功能，允许包作者自定义变更日志路径，并在启动时展示变更详情。与此同时，社区活跃度极高，过去24小时内共有 50 个 Issues 和 15 个 PR 更新，主要集中在 Mac OS 高 CPU 占用、OpenRouter 集成错误修复以及 Nix 包构建问题的解决上。

## 2. 版本发布
**v1.5.0** (2026-11-03)
*   **新功能**:
    *   **扩展更新日志**: 现在用户可以在更新扩展后的首次启动中查看已安装扩展包的变更日志。包作者可以选择变更日志路径，并使用 `collapseChangelog` 参数来折叠通知详情。
    *   相关文档: [Show a changelog](https://github.com/earendil-works/pi/bl)

## 3. 社区热点 Issues

1.  **[OPEN] High CPU usage on Mac OS with long session (#7730)**
    *   **重要性**: 核心性能问题，影响用户体验。
    *   **摘要**: 用户报告在 Mac OS 上，当会话上下文较大时，CPU 占用率飙升至 100% 以上，内存占用 600-800MB。初步推测与上下文大小或会话长度有关。
    *   **链接**: [Issue #7730](https://github.com/earendil-works/pi/issues/7730)

2.  **[CLOSED] npm search not indexing newly published pi-packages (#7885)**
    *   **重要性**: 影响包发现与生态扩展。
    *   **摘要**: 发布新包（如 `pi-affix-prompt`）后，在 npm 搜索和 pi.dev 画廊中无法显示。作者发现画廊镜像了 npm 搜索结果，导致 49/50 的包找不到。
    *   **链接**: [Issue #7885](https://github.com/earendil-works/pi/issues/7885)

3.  **[OPEN] Large transcripts re-render every frame (#9549)**
    *   **重要性**: 界面渲染性能瓶颈。
    *   **摘要**: 在 Windows 11 双核环境下，处理大篇幅转录内容时，渲染消耗导致 CPU 1 核饱和。每次调整窗口大小都会重新渲染整个转录内容，造成卡顿。
    *   **链接**: [Issue #9549](https://github.com/earendil-works/pi/issues/9549)

4.  **[OPEN] Anthropic adapter silently drops root anyOf from custom tool schemas (#9134)**
    *   **重要性**: API 适配层兼容性问题。
    *   **摘要**: 当自定义工具参数使用根级别的 `anyOf` 限制时，Anthropic 适配器会静默删除该限制，导致模型端面的输入模式不完整，可能影响工具调用。
    *   **链接**: [Issue #9134](https://github.com/earendil-works/pi/issues/9134)

5.  **[CLOSED] OpenRouter Error: 400 (#10497)**
    *   **重要性**: 第三方 API 集成稳定性。
    *   **摘要**: 在使用 OpenRouter 时，通过扩展注入文件内容时偶尔收到 400 错误，提示上下文长度超出限制（1048576 tokens）。
    *   **链接**: [Issue #10497](https://github.com/earendil-works/pi/issues/10497)

6.  **[OPEN] openai: ChatGPT sign-in still uses 272K for GPT-6.1 Sol (#11021)**
    *   **重要性**: 上下文窗口配置错误。
    *   **摘要**: 使用 ChatGPT 登录时，Pi 1.3.0 报告的 GPT-6.1 Sol 上下文窗口为 272K，而实际账户目录显示为 500K，导致压缩预算不足。
    *   **链接**: [Issue #11021](https://github.com/earendil-works/pi/issues/11021)

7.  **[CLOSED] The grep tool with context lines can cause OOM (#9276)**
    *   **重要性**: 资源管理/内存泄漏。
    *   **摘要**: 当 grep 工具带有 context 行数参数时，会读取匹配文件的整个内容进行分割，导致内存溢出（OOM），特别是在处理大文件时。
    *   **链接**: [Issue #9276](https://github.com/earendil-works/pi/issues/9276)

8.  **[OPEN] Bedrock: a new BedrockRuntimeClient is created for every request (#11527)**
    *   **重要性**: 资源消耗与连接效率。
    *   **摘要**: 每次模型调用都会创建新的 AWS Bedrock 客户端，导致凭证轮询开销和 HTTP/2 会话重建，影响性能。
    *   **链接**: [Issue #11527](https://github.com/earendil-works/pi/issues/11527)

9.  **[CLOSED] OpenCode Go Claude (anthropic-messages): 400 on replayed thinking block (#10954)**
    *   **重要性**: 复杂会话场景下的 API 兼容性。
    *   **摘要**: 在工具列表变更后，重放思考块时出现 400 错误，涉及 `block_binding` 传输问题。
    *   **链接**: [Issue #10954](https://github.com/earendil-works/pi/issues/10954)

10. **[CLOSED] Tool calls fail with basispoints_tool_arguments_stalled after upgrading to 1.5.0 (#11687)**
    *   **重要性**: 新版本兼容性 Bug。
    *   **摘要**: 升级到 v1.5.0 后，工具调用参数生成失败，错误提示参数停止进展（连续空白字符问题）。
    *   **链接**: [Issue #11687](https://github.com/earendil-works/pi/issues/11687)

## 4. 重要 PR 进展

1.  **[CLOSED] fix(ai): leave room for OpenRouter's input overcount (#11712)**
    *   **内容**: 修复了在限制最大 Token 时，因 OpenRouter 的分词器比 Provider 多算约 12% 的输入 Token，导致模型被拒绝的问题。调整了预留空间，解决了 DeepSeek Flash 等模型的拒绝问题。
    *   **链接**: [PR #11712](https://github.com/earendil-works/pi/pull/11712)

2.  **[CLOSED] feat(coding-agent): list updated packages with version changes in pi update (#11707)**
    *   **内容**: 增强了 `pi update` 命令的输出，现在会明确列出哪些扩展包进行了版本更新，解决了批量安装时无法查看具体变更的痛点。
    *   **链接**: [PR #11707](https://github.com/earendil-works/pi/pull/11707)

3.  **[CLOSED] fix(coding-agent): preserve indentation in rendered diffs (#9274)**
    *   **内容**: 修复了编辑工具在渲染差异时丢失缩进的问题，特别是在插入文本前删除原有内容时，导致代码块格式错乱。
    *   **链接**: [PR #9274](https://github.com/earendil-works/pi/pull/9274)

4.  **[CLOSED] fix(coding-agent): apply context edits to branch summary input (#11680)**
    *   **内容**: 修复了分支摘要功能在自动重试失败后，未能正确应用 `context_edit` 隐藏失败尝试的问题，防止废弃内容被带入新分支。
    *   **链接**: [PR #11680](https://github.com/earendil-works/pi/pull/11680)

5.  **[CLOSED] fix(coding-agent): report the installed version after npm, pnpm, yarn, and bun self-updates (#11629)**
    *   **内容**: 修复了当包管理器（npm, pnpm, yarn, bun）自更新后，`pi update` 无法正确报告实际安装版本的问题，解决了元数据缓存导致的误报。
    *   **链接**: [PR #11629](https://github.com/earendil-works/pi/pull/11629)

6.  **[CLOSED] feat(ai): add Microsoft-Decision-1 classifier to GitHub Copilot (#11679)**
    *   **内容**: 在 GitHub Copilot 提供商中添加了 `microsoft-decision-1` 模型分类器，支持 32768 上下文窗口和特定定价。
    *   **链接**: [PR #11679](https://github.com/earendil-works/pi/pull/11679)

7.  **[CLOSED] fix(coding-agent): only report packages as up to date when pi update checked them (#11711)**
    *   **内容**: 修正了包更新状态报告的逻辑，确保只有当 Pi 实际检查过更新时才报告“已更新”，避免因 npm 缓存导致的虚假状态。
    *   **链接**: [PR #11711](https://github.com/earendil-works/pi/pull/11711)

8.  **[CLOSED] fix(coding-agent): take grep context lines from ripgrep instead of reading matched files (#11705)**
    *   **内容**: 优化了 Grep 工具的性能，不再读取匹配文件的全部内容，而是利用 ripgrep 的原生能力提取上下文行，显著降低内存消耗。
    *   **链接**: [PR #11705](https://github.com/earendil-works/pi/pull/11705)

9.  **[OPEN] feat(storage): replication (#11696)**
    *   **内容**: 提案阶段，正在进行存储复制功能的工作，用于数据冗余和容灾。
    *   **链接**: [PR #11696](https://github.com/earendil-works/pi/pull/11696)

10. **[CLOSED] fix(coding-agent): serve catalogs without version redirect (#11690)**
    *   **内容**: 修复了模型目录服务的协议，停止了 pi.dev 对发布客户端的版本重定向，直接提供目录服务，提升了稳定性。
    *   **链接**: [PR #11690](https://github.com/earendil-works/pi/pull/11690)

## 5. 功能需求趋势
从 Issues 分析来看，社区关注点主要集中在以下三个方向：
*   **上下文管理与性能优化**: 无论是 OpenRouter 的 Token 计数差异、Mac 上的高 CPU 占用，还是大文件的 Grep 内存溢出，都反映出社区对 Pi 处理长上下文和大数据量时的性能敏感度极高。
*   **多平台与多工具集成**: 关于 Anthropic API 的 JSON Schema 兼容性、Bedrock 连接开销以及 Windows Terminal 的 RTL 渲染问题，显示社区在构建跨平台（尤其是 Windows/macOS）和跨后端（OpenAI, Anthropic, Bedrock）的集成体验。
*   **包管理与扩展生态**: 关于 npm 搜索索引缺失、扩展更新日志显示以及 Nix 包构建失败的问题，表明扩展生态系统正在快速发展，对工具链的健壮性提出了更高要求。

## 6. 开发者关注点
*   **版本兼容性**: v1.5.0 刚刚发布，部分开发者反馈升级后出现工具调用参数 stalled 等新 Bug，社区正在快速排查和修复。
*   **资源消耗**: 开发者在使用 Pi 进行深度编码或处理长日志时，频繁遇到内存溢出（OOM）和 CPU 饱和问题，亟需底层渲染和内存管理优化。
*   **API 适配细节**: 细微的 API 字段差异（如 `anyOf`, `$id` 解析）会导致工具无法运行，开发者需要更严格的 Schema 校验和调试能力。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-11-03  
**分析对象：** [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 1. 今日速览

社区在 11 月 2 日迎来了 **v0.26.6** 版本发布，重点修复了 Web Shell 配置同步机制并优化了 Managed Runtime 的资源管理。同时，项目面临一系列 CI 流水线（E2E、Managed Agent gate）的稳定性挑战，尤其是关于会话挂起、僵尸进程和性能瓶颈的反馈较为集中，反映出在复杂并发场景下的技术打磨需求。

---

## 2. 版本发布

### v0.26.6
**发布时间：** 2026-11-02 (过去24小时)
- **核心变更：**
  - 修复 Web Shell 配置同步逻辑，将配置顺序建立机制绑定到会话附件而非事件流，解决配置写入可能晚于元数据获取的问题。
  - 优化 Managed Runtime Worker，避免在 `run_shell_command` 执行后无谓地记录 `record_artifact` 提示，减少内存占用（约 166 MiB）。
  - **Bundled CLI:** 0.26.6 (SDK TypeScript 0.1.27)。

---

## 3. 社区热点 Issues

以下选取了评论数最高且更新频繁的 10 个 Issue，反映当前开发的核心痛点：

1. **#14724: Main CI failed: Managed Agent gate — no test identified** (155 comments)
   - **重要性：** CI 系统核心故障，导致测试流水线失效。
   - **状态：** 开放，长期积压。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/14724)

2. **#15173: Main CI failed: E2E Tests — no test identified** (36 comments)
   - **重要性：** 端到端测试环境不稳定，影响代码合并质量。
   - **状态：** 开放，持续更新。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/15173)

3. **#15052: ci: preserve independent main E2E validation when pending runs are replaced** (16 comments)
   - **重要性：** 针对 CI 并发策略的优化请求，旨在保证每个 Main 分支 SHA 的独立验证结果。
   - **状态：** 准备就绪，等待人工审核。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/15052)

4. **#15165: Shell safety parser triggers ~1.6 GiB transient WASM compiler allocation** (7 comments)
   - **重要性：** 性能瓶颈，在 Node 24.16.0 下调用 Shell 安全解析器会触发巨大的内存峰值。
   - **状态：** 开放，性能优化需求。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/15165)

5. **#16169: Messages queued while tools run are silently lost when SIGHUP** (5 comments)
   - **重要性：** 会话管理稳定性问题，终端关闭时挂起的消息队列丢失，影响用户体验。
   - **状态：** 开放，刚更新。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/16169)

6. **#16171: Web Shell session open is very slow: live replay retains full file contents** (4 comments)
   - **重要性：** Web Shell 性能问题，特定会话打开缓慢，可能与全量文件回放有关。
   - **状态：** 开放，刚更新。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/16171)

7. **#16144: GitHub and GitLab channels created from Web Shell start open to anyone** (4 comments)
   - **重要性：** 安全漏洞，Web Shell 创建的渠道默认权限过于宽松，可能暴露敏感仓库。
   - **状态：** 开放，需要讨论。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/16144)

8. **#12970: invalid_tool_params failures are misdiagnosed as max_tokens truncation** (4 comments)
   - **重要性：** 核心工具调用逻辑 Bug，导致无效参数被误判为截断，引发无效重试。
   - **状态：** 开放。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/12970)

9. **#14288: Zombie (defunct) session child processes accumulate under long-running sessions** (5 comments)
   - **重要性：** 资源泄漏问题，长时间挂起的会话会产生僵尸进程，占用系统资源。
   - **状态：** 开放。
   - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/14288)

10. **#6721: Keep deferred tool discovery from invalidating prompt cache prefixes** (7 comments)
    - **重要性：** 缓存一致性设计，防止工具发现过程破坏提示词缓存的前缀结构。
    - **状态：** 已关闭。
    - **链接：** [GitHub Issue](https://github.com/QwenLM/qwen-code/issues/6721)

---

## 4. 重要 PR 进展

以下选取了活跃度高、涉及核心功能修复或架构优化的 PR：

1. **#16148: fix(serve): keep record_artifact guidance out of Managed Runtime worker results**
   - **内容：** 修复 Managed Runtime Worker 返回结果中的冗余提示，优化内存使用。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16148)

2. **#16170: fix(web-shell): bind config sync to the attachment, not the SSE stream**
   - **内容：** 重构 Web Shell 配置同步逻辑，绑定到会话附件而非事件流，提升配置一致性。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16170)

3. **#16121: refactor(managed-agent): narrow the four deferred store consumers to their role interfaces**
   - **内容：** 代码重构，将延迟存储消费者限制在其角色接口，提升代码解耦度。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16121)

4. **#16174: test(managed-agent): reserve Hosted gate ports below the ephemeral range**
   - **内容：** 测试优化，为 Hosted 集成测试分配低于系统临时端口范围的端口，避免冲突。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16174)

5. **#16110: fix(managed-agent): refuse every URL fetch refuses and say why a health probe failed**
   - **内容：** 增强 URL 拒绝逻辑，明确报告健康探针失败原因，提升调试能力。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16110)

6. **#16117: feat(channels): deliver GitHub events to PR-bound sessions**
   - **内容：** 新增功能，将 GitHub 事件精准投递到与 PR 绑定的会话中。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16117)

7. **#16172: fix(acp-bridge): compact live tool-result displays for session replay**
   - **内容：** 优化工具结果展示，在会话回放时压缩大文件编辑结果，提升性能。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16172)

8. **#16106: feat(web-shell): show a Channel event timeline**
   - **内容：** 新增功能，在 Web Shell 中展示 Channel 的事件时间线，增强可观测性。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16106)

9. **#16156: fix(cli): stop Agent Host disconnects being undone and report unsaved joins**
   - **内容：** 修复 Agent Host 断开连接被撤销的问题，并报告未保存的连接状态。
   - **状态：** 开放。
   - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16156)

10. **#16024: fix(core): make persisted session pagination safe for equal mtimes**
    - **内容：** 修复持久化会话分页逻辑，处理相同修改时间的文件排序问题，防止重复遍历。
    - **状态：** 开放。
    - **链接：** [GitHub PR](https://github.com/QwenLM/qwen-code/pull/16024)

---

## 5. 功能需求趋势

从 Issues 和 PR 的分析来看，社区关注点主要集中在以下方向：

1. **会话管理与稳定性**：高频反馈关于 SIGHUP 处理、僵尸进程清理、消息队列丢失等问题，显示出对长时间运行和并发场景的重视。
2. **Web Shell 体验优化**：配置同步、性能瓶颈（打开慢）、事件展示等需求，表明 Web Shell 作为主要交互界面的迭代需求迫切。
3. **Managed Runtime 优化**：资源管理（内存占用）、测试环境稳定性、工具记录逻辑的简化是当前重点。
4. **多模型支持与兼容性**：针对 Ollama、OpenRouter、Bedrock 等模型 ID 解析的 Bug 反馈较多，反映出对多样化模型生态的支持需求。
5. **CI/CD 稳定性**：E2E 测试失败和并发策略问题是阻碍合并的主要障碍，社区呼吁更健壮的测试框架。

---

## 6. 开发者关注点

- **性能瓶颈**：Shell 安全解析器的内存峰值（1.6 GiB）和 Web Shell 会话回放的性能问题需要尽快优化。
- **资源泄漏**：僵尸进程的积累和锁文件处理不当（`proper-lockfile`）可能导致长期运行的系统不稳定。
- **安全与权限**：Web Shell 渠道权限过于宽松、Shell 拒绝重定向目标的解析漏洞需要立即修复。
- **工具调用逻辑**：`invalid_tool_params` 的误判问题会导致大量无效重试，影响效率。
- **跨平台兼容性**：Linux 下的 VS Code Companion SIGSEGV 问题以及 Windows 桌面更新失败问题，表明跨平台支持仍需加强。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*