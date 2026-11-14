# AI CLI 工具社区动态日报 2026-11-14

> 生成时间: 2026-11-14 00:33 UTC | 覆盖工具: 9 个

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

# Claude Code Skills 社区热点报告（截至 2026‑11‑14）

---

## 1. 热门 Skills 排行（按社区讨论热度/评论数挑选）

| 排名 | PR 编号 / 状态 | Skill 名称（核心功能） | 关键讨论点 | 链接 |
|------|----------------|------------------------|------------|------|
| 1 | #1742 **OPEN** | **mcp‑builder** – 支持 `mcp>=2` 的 `streamable_http_client` 导入 & 自定义 HTTP Header | 迁移到新版 MCP 时的兼容性破坏、跨平台（Linux/Windows）运行时的 Header 配置方式差异；社区担心旧 Skill 会失效。 | https://github.com/anthropics/skills/pull/1742 |
| 2 | #1298 **OPEN** | **skill‑creator** – 隔离 Trigger 评估、兼容 Windows、提升运行时容错 | Trigger 评估误报、Windows 子进程管道竞争、工具链在 CI 中的不稳定；多数评论聚焦在提升评估准确性与 CI 可重复性。 | https://github.com/anthropics/skills/pull/1298 |
| 3 | #1245 **OPEN** | **notion‑spec‑to‑implementation** – 将 Notion 规格页面自动拆解为实现任务 | 如何可靠抓取 Notion API、任务拆分粒度、与现有 “document‑skills” 的交叉使用；社区期待把需求文档直接转为可执行的工作流。 | https://github.com/anthropics/skills/pull/1245 |
| 4 | #1980 **OPEN** | **webapp‑testing** – `with_server.py` 去除 `shell=True`（防注入） | 安全审计曝光的命令注入风险（CWE‑78），讨论围绕安全最佳实践与是否需要在所有 Skill 中统一审计。 | https://github.com/anthropics/skills/pull/1980 |
| 5 | #1792 **OPEN** | **docx** – LibreOffice 超时检测与输出校验 | 之前超时仍返回成功导致文档残留修订痕迹，社区要求更严格的错误报告与回滚机制。 | https://github.com/anthropics/skills/pull/1792 |
| 6 | #1771 **OPEN** | **proofcore‑contract‑auditor** – 智能合约静态分析 & 区块链审计凭证 | Web3 开发者需求强烈；讨论焦点在审计报告的可信度、零存储 Merkle 证明的实现细节。 | https://github.com/anthropics/skills/pull/1771 |
| 7 | #1703 **OPEN** | **md2video‑audio** – Markdown → MP4 视频 + 语音合成（零成本） | 多媒体输出的需求激增，讨论围绕渲染速度、声音模型选择、版权合规。 | https://github.com/anthropics/skills/pull/1703 |
| 8 | #525 **OPEN** | **pyxel** – 复古游戏开发全链路 Skill | 教育/娱乐领域的兴趣点；讨论包括帧检查、键盘/手柄输入模拟、CI 运行的 headless 环境。 | https://github.com/anthropics/skills/pull/525 |

> **状态**：截至报告日，这些 PR 均为 **OPEN**（未合并），但因评论活跃度、业务价值与安全影响，已进入维护者优先评审队列。

---

## 2. 社区需求趋势（从 Issues 提炼）

| 需求方向 | 代表 Issue | 关注点概述 |
|----------|-----------|-----------|
| **安全与信任边界** | #492 “Community skills distributed under anthropic/ namespace enable trust boundary abuse” (46 条评论) | 需要官方机制防止社区 Skill 冒充官方；呼吁命名空间隔离、签名校验或审计日志。 |
| **组织内部 Skill 共享** | #228 “Enable org‑wide skill sharing in Claude.ai” (17 条评论) | 提议在 Claude UI/CLI 中加入组织库、共享链接、权限管理，降低手动分发成本。 |
| **评估/触发可靠性** | #556 “run_eval.py: claude -p never triggers skills/commands” (13 条评论) <br> #1352 “run_eval.py parallel workers cross‑match skill UUIDs, producing false‑negative trigger rates” (6 条评论) | 评估框架触发率异常，影响 CI 与模型调优；要求修复并提供可靠的基准工具。 |
| **内存/上下文压缩** | #1329 “compact‑memory (symbolic notation for compact agent state)” (10 条评论) | 长期运行的 Agent 需要更紧凑的记忆表示，降低上下文消耗。 |
| **Skill 质量与可维护性** | #202 “skill‑creator should be updated to best practice” (8 条评论) | 现有 skill‑creator 文档冗余、token 效率低，期待重新设计为更轻量的指令集。 |
| **质量门控流水线** | #1385 “Reasoning Quality Gate Pipeline” (7 条评论) | 引入多阶段审查（校准→对抗审查→交付验证）以提升输出可靠性。 |
| **重复/冲突的 Skill 包** | #189 “document‑skills and example‑skills plugins install identical content” (6 条评论) | 需要统一发布策略，避免重复技能占用上下文。 |
| **大模型上下文耗尽** | #1487 “claude‑api skill eagerly injects ~156k tokens” (5 条评论) | 防止单次工具调用耗尽上下文，需要分块或流式注入。 |
| **用户账户管理** | #1143 “Ability to change account email address” (5 条评论) | 与竞争平台对齐，提升用户自助管理能力。 |
| **文档/主题描述不足** | #2064 “theme‑factory description says what the skill does but not when to use it” (4 条评论) | 强调技能使用场景的元信息，便于模型选择。 |
| **XML/文档生成错误** | #2018 “docx: merge_runs.py drops run‑local namespace declarations” (4 条评论) | 修复生成的 .docx 文档不符合标准的 bug。 |
| **图形渲染细节** | #1868 “create_gradient_background never produces its documented bottom_color” (4 条评论) | 细节实现偏差导致视觉不一致。 |

**趋势归纳**  
1. **安全/信任**（命名空间、权限、注入）是社区最关切的底层问题。  
2. **协作与共享**（组织库、Skill 复用）需求强烈，尤其在企业落地场景。  
3. **评估与触发可靠性**直接影响 Skill 的可用性，相关 bug 频繁被上报。  
4. **上下文/内存压缩**和 **质量管控** 逐步成为高阶需求。  

---

## 3. 高潜力待合并 Skills（评论活跃、业务价值或安全影响大）

| PR 编号 | Skill | 主要价值 | 当前阻碍 | 预计落地时间 |
|--------|-------|----------|----------|--------------|
| #1742 | **mcp‑builder** | 兼容最新 MCP 2.x，保证现有自动化流水线不因库升级失效 | 需要在 CI 中验证多平台 Header 行为 | 2‑3 周（已在内部测试） |
| #1298 | **skill‑creator**（Trigger 隔离） | 提升自动评估准确性、Windows 兼容性 | 需完成跨平台 CI 通过 | 1‑2 周 |
| #1980 | **webapp‑testing**（去除 `shell=True`） | 关键安全补丁，防止命令注入 | 仅需代码审查通过 | 1 周 |
| #1792 | **docx**（LibreOffice 超时 & 输出校验） | 增强文档审校可靠性，避免残留修订痕迹 | 需要在不同平台的 LibreOffice 版本上回归 | 2 周 |
| #1771 | **proofcore‑contract‑auditor** | 为 Web3 开发者提供链上审计凭证，打开新业务场景 | 法律合规审查（零存储 Merkle） | 3‑4 周 |
| #1703 | **md2video‑audio** | 一键生成带配音的演示视频，满足多媒体需求 | 视频渲染性能优化 | 2‑3 周 |
| #525  | **pyxel** | 支持教育/娱乐领域的复古游戏开发，拓宽 Skill 生态 | 需完善 headless 测试框架 | 3 周 |
| #1245 | **notion‑spec‑to‑implementation** | 将规格文档自动转化为实现任务，提升需求落地效率 | Notion API 权限管理细节 | 2‑3 周 |

> **共同特征**：这些 PR 均已完成核心实现，主要阻碍在 **代码审查、跨平台回归或合规审查**，预计在下一个发布周期（2026‑12‑xx）前合并。

---

## 4. Skills 生态洞察（一句话总结）

> **社区当前最集中诉求是“提升 Skill 的安全可靠性与组织级共享”，同时渴望通过自动化工作流（文档‑到‑实现、代码‑审计、媒体生成）来降低人工成本并提升模型的上下文利用效率。**

--- 

*本报告基于截至 2026‑11‑14 的 GitHub PR 与 Issue 数据整理，供社区运营、产品规划及贡献者参考。*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期**: 2026-11-14  
**分析范围**: GitHub openai/codex 仓库

---

## 1. 今日速览

OpenAI Codex 本日发布多个 Rust 版本（v0.168.0, v0.169.0, v0.171.0-alpha系列），核心聚焦于 **TUI 工作区体验优化**（支持多侧边栏、模型提供者选择）与 **状态栏数据结构化**。与此同时，Windows 平台的用户反馈依然密集，主要集中在“组织设置无法加载”、“MCP 服务器进程泄漏”以及“应用启动失败”等稳定性问题上。社区对 **GPT-6.1 模型** 的行为（如过早结束任务）也表达了持续关注。

---

## 2. 版本发布

### Rust v0.168.0
*   **新特性**:
    *   支持 **TUI 工作区**：可通过 `features.tui_workspace` 启用侧边栏对话，支持拖拽调整分栏和 `leader z` 缩放。
    *   **模型提供者管理**：在 Sessions 中可浏览并选择默认模型提供商。
*   **发布日期**: 2026-11-14

### Rust v0.169.0
*   **新特性**:
    *   **多标签页支持**：终端工作区支持多侧边栏标签切换，支持键盘和鼠标操作，并支持重启后恢复本地会话。
    *   **Agent 命令中心**：支持按名称、提示预览或工作目录搜索历史任务。
*   **发布日期**: 2026-11-14

### Rust v0.171.0-alpha 系列
*   **版本**: 0.171.0-alpha.1 至 alpha.4
*   **说明**: 主要是预发布版本迭代，验证新功能兼容性。

---

## 3. 社区热点 Issues

### 🔴 高优先级 Bug (Windows 平台)
1.  **#48324: Windows 桌面应用启动失败**  
    *   **现象**: 启动时立即报错 "Unable to load organization settings"，导致无法进入 Composer，无法获取会话 ID。  
    *   **影响**: 53 个点赞，用户反馈严重阻碍桌面端使用。  
    *   [查看详情](https://github.com/openai/codex/issues/48324)

2.  **#58530: Plus 会员配额策略变更**  
    *   **现象**: 用户担心 ChatGPT High 和 Codex/Work 允许额度将被合并。  
    *   **背景**: OpenAI 已确认将于 2026 年 12 月变更配额策略。  
    *   **影响**: 51 个点赞，涉及付费用户的切身利益。  
    *   [查看详情](https://github.com/openai/codex/issues/58530)

3.  **#59855: Windows 恢复云端会话报错**  
    *   **现象**: 从侧边栏恢复云端托管会话时报错 `Invalid request: AbsolutePathBuf deserialized without a base path`。  
    *   **影响**: 32 个评论，影响跨设备协作体验。  
    *   [查看详情](https://github.com/openai/codex/issues/59855)

### 🔵 功能与体验反馈
4.  **#32188: CLI 背景任务事件驱动唤醒**  
    *   **需求**: 长时间运行的命令目前需要轮询，建议支持事件驱动唤醒，减少资源占用。  
    *   **影响**: 28 个点赞，提升 CLI 使用体验。  
    *   [查看详情](https://github.com/openai/codex/issues/32188)

5.  **#47270: 浏览器标签页无法发现**  
    *   **现象**: Computer Use 无法在桌面端发现或控制 Chrome 浏览器标签页。  
    *   **影响**: 27 个评论，阻碍自动化测试场景。  
    *   [查看详情](https://github.com/openai/codex/issues/47270)

6.  **#61348: 持续工程工作区需求**  
    *   **需求**: 希望将 ChatGPT + Work + Codex 打造成持续工程环境，而非一次性任务。  
    *   **背景**: 用户希望获得更持久的项目管理能力。  
    *   [查看详情](https://github.com/openai/codex/issues/61348)

7.  **#28361: Windows MCP 服务器进程泄漏**  
    *   **现象**: 使用 MCP-server 路径时，`codex app-server` 及其子进程无法被回收，导致进程累积数百个。  
    *   **影响**: 13 个评论，长期运行会导致系统卡顿。  
    *   [查看详情](https://github.com/openai/codex/issues/28361)

8.  **#60778: iOS 任务列表为空**  
    *   **现象**: iPhone 上显示 "No tasks yet"，但现有对话可通过搜索访问。  
    *   **影响**: 8 个点赞，移动端列表视图异常。  
    *   [查看详情](https://github.com/openai/codex/issues/60778)

9.  **#60133: GPT-6.1-terra 模型行为异常**  
    *   **现象**: 在 app-server 客户端启动回合时，模型会过早结束回合，任务无法完成。  
    *   **影响**: 6 个评论，影响特定模型的生产环境使用。  
    *   [查看详情](https://github.com/openai/codex/issues/60133)

10. **#50758: 跨会话授权不一致**  
    *   **现象**: 在现有本地任务中转发用户授权时被拒绝，直接输入则成功。  
    *   **影响**: 4 个评论，涉及 Agent 权限控制的边界问题。  
    *   [查看详情](https://github.com/openai/codex/issues/50758)

---

## 4. 重要 PR 进展

本日共有 20 个 PR 更新，大部分已合并 (CLOSED)，主要集中在 **状态栏增强** 和 **配置管理** 方面。

1.  **#61422: Transcript 键盘表格选择**  
    *   **内容**: 为 transcript 添加了类似 Vim 的键盘选择模式 (`leader v`)，支持矩形选择、交换角落和复制。  
    *   [查看详情](https://github.com/openai/codex/pull/61422)

2.  **#61421: 线程级模型目录**  
    *   **内容**: 修复了模型查找可能使用错误提供者的问题，确保线程级别的模型元数据正确解析。  
    *   [查看详情](https://github.com/openai/codex/pull/61421)

3.  **#61420: GCP 设置时清除端点覆盖**  
    *   **内容**: 修复了用户手动配置 `base_url` 后阻碍 GCP 设置的问题，现在会自动清理。  
    *   [查看详情](https://github.com/openai/codex/pull/61420)

4.  **#61419: WSL 中的 Windows 路径解析**  
    *   **内容**: 改进了在 WSL 中粘贴 Windows 路径时的处理逻辑，使用 `wslpath -u` 并增加超时机制。  
    *   [查看详情](https://github.com/openai/codex/pull/61419)

5.  **#61418: 政府工作区强制校验**  
    *   **内容**: 增加了后端路由校验，拒绝非政府工作区访问 `gov.chatgpt.com`。  
    *   [查看详情](https://github.com/openai/codex/pull/61418)

6.  **#61417: 状态栏暴露限流信息**  
    *   **内容**: 在状态栏状态中暴露了 Codex 限流信息，包括主要/次要使用百分比和重置时间戳。  
    *   [查看详情](https://github.com/openai/codex/pull/61417)

7.  **#61415: 工作区标题暴露**  
    *   **内容**: 在状态栏中暴露了结构化的工作区标题信息。  
    *   [查看详情](https://github.com/openai/codex/pull/61415)

8.  **#61411: 忽略过时的工作区请求**  
    *   **内容**: 修复了聊天组件切换时可能导致的请求匹配错误，以及归档消息被误选的问题。  
    *   [查看详情](https://github.com/openai/codex/pull/61411)

9.  **#61410: 线程成本与过期使用读取**  
    *   **内容**: 在状态栏暴露线程成本，并增加了拒绝读取过期使用数据的逻辑。  
    *   [查看详情](https://github.com/openai/codex/pull/61410)

10. **#61409: 上下文使用情况暴露**  
    *   **内容**: 添加了 `thread.usage.context` 字段，展示上下文窗口使用百分比。  
    *   [查看详情](https://github.com/openai/codex/pull/61409)

---

## 5. 功能需求趋势

从本日 Issues 分析，社区关注点集中在以下三个方向：

1.  **平台稳定性与进程管理**:
    *   **Windows 平台问题集中爆发**：包括启动失败、配置加载错误、MCP 服务器进程泄漏等。这表明 Codex 在 Windows 环境下的深度集成（尤其是作为系统服务或后台进程时）仍存在技术债。
    *   **进程回收机制**：`#28361` 指出的 MCP 服务器进程不回收问题，是开发者非常关心的资源管理痛点。

2.  **模型能力与行为**:
    *   **长任务处理**：`#32188` 和 `#60133` 均反映当前模型（尤其是 GPT-6.1）在处理长链路任务时存在“过早结束回合”或“执行中断”的倾向，需要更精细的调度机制。
    *   **配额与订阅策略**：`#58530` 引发的关于 ChatGPT High 和 Codex 允许额度合并的讨论，反映了用户对成本控制和计费透明度的强烈需求。

3.  **集成与工作流增强**:
    *   **持续工程化**：`#61348` 提出的“连续工程工作区”需求，表明用户不满足于单次交互，希望 Codex 能作为 IDE 或工作流中的持久化组件存在。
    *   **浏览器自动化**：`#47270` 关于 Computer Use 无法发现浏览器标签页的问题，是自动化测试和开发场景中的关键阻碍。

---

## 6. 开发者关注点

*   **状态栏可视化**: 开发者非常看重状态栏提供的数据颗粒度，如 token 使用量、限流状态、上下文窗口占用等（参考 PR #61408, #61409, #61410, #61417）。清晰的元数据有助于调试和资源规划。
*   **跨平台兼容性**: Windows 上的路径解析（WSL 路径映射）和进程管理是高频反馈点。开发者在使用 Codex 进行 CI/CD 或远程开发时，这些底层细节直接影响可用性。
*   **MCP 生态**: MCP (Model Context Protocol) 相关的配置、发现和生命周期管理是热门话题。开发者关注如何正确配置工具、避免僵尸进程以及确保 OAuth 锁的正确释放。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-14  
**数据源**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 1. 今日速览
社区活跃度持续高位，主要集中在**Agent 行为稳定性**与**沙箱安全机制**的优化上。今日修复了多个导致 Agent 挂起或配置失效的 Bug（如 `maxTurns` 忽略、工具数限制等），并引入了更严格的 MCP 服务器权限检查。同时，关于**AST 感知工具**和**并行 Subagent 协作**的技术探索成为新的开发热点。

---

## 2. 版本发布
**无新版本发布**。当前版本为 v0.67.0（基于 PR #30194 恢复了模型列表显示）。

---

## 3. 社区热点 Issues
以下为过去 24 小时内更新且评论数最高的 Issues：

**1. [Bug] Subagent 恢复机制缺陷 (#22323)**
*   **重要性**: P1 级严重 Bug，影响核心功能。
*   **内容**: `codebase_investigator` 子 Agent 在达到 `MAX_TURNS` 限制时错误地报告为“GOAL 成功”，导致任务中断被隐藏。
*   **链接**: [google-gemini/gemini-cli Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

**2. [Bug] Generalist Agent 永久挂起 (#21409)**
*   **重要性**: P1 级严重 Bug，影响用户体验。
*   **内容**: Agent 在使用子 Agent 时会无限期挂起，简单的文件操作也会导致崩溃，目前通过禁用子代理可规避。
*   **链接**: [google-gemini/gemini-cli Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

**3. [Enhancement] 利用模型原生 Bash 能力 (#19873)**
*   **重要性**: P2 级架构优化。
*   **内容**: 建议利用 Zero-Dependency OS Sandboxing 和后执行意图路由，让模型更自然地使用 POSIX 工具链（如 grep, sed），减少对复杂工具链的依赖。
*   **链接**: [google-gemini/gemini-cli Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)

**4. [Feature] 提升浏览器 Agent 的容错性 (#22232)**
*   **重要性**: 改善会话管理体验。
*   **内容**: 针对 `sessionMode: 'persistent'` 下的锁定问题，提出自动接管会话和恢复锁定的策略。
*   **链接**: [google-gemini/gemini-cli Issue #22232](https://github.com/google-gemini/gemini-cli/issues/22232)

**5. [Bug] AST 文件读取与映射的评估 (#22745)**
*   **重要性**: 性能与上下文优化。
*   **内容**: 探讨使用 AST（抽象语法树）感知工具来替代传统文件读取，以减少 Token 消耗和噪音，提高代码库探索精度。
*   **链接**: [google-gemini/gemini-cli Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)

**6. [Bug] Agent 不够“听话” (#21968)**
*   **重要性**: 能力上限问题。
*   **内容**: 模型倾向于不主动调用自定义 Skills 和 Sub-agents，即使这些功能与当前任务高度相关，需要强制指令才能触发。
*   **链接**: [google-gemini/gemini-cli Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)

**7. [Bug] 配置覆盖失效 (#22267)**
*   **重要性**: 配置管理问题。
*   **内容**: Browser Agent 完全忽略了 `settings.json` 中的全局或项目级配置覆盖（如 `maxTurns` 设置）。
*   **链接**: [google-gemini/gemini-cli Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)

**8. [Bug] 超过 128 个工具报错 (#24246)**
*   **重要性**: P2 级性能限制。
*   **内容**: 当可用工具超过 128 个时，CLI 遇到 400 错误。期望 Agent 能更智能地限制工具范围。
*   **链接**: [google-gemini/gemini-cli Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)

**9. [Bug] Agent 生成临时脚本混乱 (#23571)**
*   **重要性**: 工作区清理痛点。
*   **内容**: 在限制 Shell 执行后，Agent 会在随机位置生成大量临时脚本，给开发者清理提交带来巨大负担。
*   **链接**: [google-gemini/gemini-cli Issue #23571](https://github.com/google-gemini/gemini-cli/issues/23571)

**10. [Feature] Agent 自我意识增强 (#21432)**
*   **重要性**: 交互体验优化。
*   **内容**: 希望 Agent 能更准确地理解自身机制、CLI Flags 和 Hotkeys，成为用户自己的专家助手。
*   **链接**: [google-gemini/gemini-cli Issue #21432](https://github.com/google-gemini/gemini-cli/issues/21432)

---

## 4. 重要 PR 进展
以下为过去 24 小时内更新且关注度较高的 PR：

**1. [Security] 修复不安全 MCP 服务器命令权限 (#30283)**
*   **内容**: 强制检查本地 MCP 服务器命令的所有权和写入权限，防止恶意脚本被系统配置引用。
*   **链接**: [google-gemini/gemini-cli PR #30283](https://github.com/google-gemini/gemini-cli/pull/30283)

**2. [Fix] 修复 Node 26 下的 Fetch 超时配置 (#30281)**
*   **内容**: 升级核心库以支持 Node 26 的内置 Fetch，并确保全局调度器符号正确发布，修复超时配置失效问题。
*   **链接**: [google-gemini/gemini-cli PR #30281](https://github.com/google-gemini/gemini-cli/pull/30281)

**3. [Fix] 修复函数调用名称导致 API 报错 (#30279)**
*   **内容**: 修复模型生成的函数调用名包含前后空格时导致的 `INVALID_ARGUMENT` 错误，确保调用历史名称被正确修剪。
*   **链接**: [google-gemini/gemini-cli PR #30279](https://github.com/google-gemini/gemini-cli/pull/30279)

**4. [Security] 使用 re2js 优化策略正则匹配 (#30282)**
*   **内容**: 引入 `re2js` 替代原生 `RegExp` 进行策略规则（`argsPattern`）评估，实现线性时间复杂度，提升安全性。
*   **链接**: [google-gemini/gemini-cli PR #30282](https://github.com/google-gemini/gemini-cli/pull/30282)

**5. [Fix] 改进沙箱权限拒绝检测 (#30277)**
*   **内容**: 修复在受限容器环境中 POSIX 沙箱权限拒绝未被识别的问题，增强了跨环境的兼容性。
*   **链接**: [google-gemini/gemini-cli PR #30277](https://github.com/google-gemini/gemini-cli/pull/30277)

**6. [Fix] 修复模型列表遗漏问题 (#30271)**
*   **内容**: 修复 `gemini models` 命令在认证用户下遗漏 `gemini-3.8-flash` 模型的问题，使其与 `/model manage` 保持一致。
*   **链接**: [google-gemini/gemini-cli PR #30271](https://github.com/google-gemini/gemini-cli/pull/30271)

**7. [Fix] 修复 WebFetch 取消后的回退处理 (#30210)**
*   **内容**: 优化 WebFetch 工具的取消逻辑，防止在主请求被取消后仍执行不必要的回退处理。
*   **链接**: [google-gemini/gemini-cli PR #30210](https://github.com/google-gemini/gemini-cli/pull/30210)

**8. [Fix] 统一 CLI 退出码映射 (#30273)**
*   **内容**: 集中管理 `@google/gemini-cli-core` 中的退出码，修复了之前硬编码在 `errors.ts` 中未定义的错误码。
*   **链接**: [google-gemini/gemini-cli PR #30273](https://github.com/google-gemini/gemini-cli/pull/30273)

**9. [Fix] 修复会话恢复后的目录残留 (#30259)**
*   **内容**: 修复会话恢复失败后，工作区目录未正确清理的 Bug，确保 `WorkspaceContext` 的状态一致性。
*   **链接**: [google-gemini/gemini-cli PR #30259](https://github.com/google-gemini/gemini-cli/pull/30259)

**10. [Fix] 改进 API 失败的网络排查指引 (#30278)**
*   **内容**: 在 Gemini API 请求失败且无 HTTP 响应时，提供更详细的网络故障排查指南，区分传输失败与 HTTP 错误。
*   **链接**: [google-gemini/gemini-cli PR #30278](https://github.com/google-gemini/gemini-cli/pull/30278)

---

## 5. 功能需求趋势
从 Issues 中提炼出以下三个主要的技术演进方向：

1.  **上下文感知与 Token 优化**:
    *   社区正从传统的“全量文件读取”转向 **AST（抽象语法树）感知** 的读取方式（Issue #22745, #22747），旨在减少 Token 消耗，提高代码库探索的精确度。
    *   提出“Tactful Extraction”（战术性提取）策略，以减少上下文膨胀（Issue #19561）。

2.  **并行协作与架构演进**:
    *   探索 **并行 Subagent 协作**（Issue #18287）和 **共享内存** 机制，以提升复杂任务的处理效率。
    *   重新审视 `codebase_investigator` 的通用性，考虑重命名为更通用的探索工具（Issue #18282）。

3.  **Agent 自主权与行为控制**:
    *   强调 Agent 的 **自我意识**（Issue #21432），使其能准确描述自身 CLI 参数和操作机制。
    *   需要更强的 **破坏性行为遏制** 机制，特别是在执行 Git 命令或数据库维护时（Issue #22672）。

---

## 6. 开发者关注点
开发者反馈的痛点主要集中在以下几个高频场景：

*   **Agent 挂起与稳定性**: `generalist agent` 在使用子代理时频繁出现无限挂起（Issue #21409），这是目前阻碍生产环境使用的主要障碍。
*   **配置管理的脆弱性**: `settings.json` 的覆盖机制在 Browser Agent 等特定组件中失效（Issue #22267），导致预期行为与实际行为不一致。
*   **工具数量限制**: 随着 Agent 能力增强，当可用工具超过 128 个时系统报错（Issue #24246），缺乏智能的 Tool Scope 限制。
*   **工作区清理负担**: Agent 生成的临时脚本散落在随机目录，使得开发者难以维护干净的工作区（Issue #23571）。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-11-14
**数据来源**: github.com/github/copilot-cli

---

## 1. 今日速览

过去24小时内，GitHub Copilot CLI 发布了 v1.0.112 及其预发布版本 (v1.0.112-0)，重点改进了 macOS Ventura 13.5+ 的启动体验及上下文窗口管理。社区活跃度依然较高，共有 43 个 Issue 更新，主要集中在权限管理、MCP 服务器集成体验以及 macOS 沙盒功能的稳定性问题上。

---

## 2. 版本发布

### v1.0.112 (2026-11-13)
**核心改进**：
*   **系统兼容性**：改进了在 macOS Ventura 13.5 或更高版本上的尽力启动体验，无需扩展官方操作系统支持。
*   **上下文管理**：默认使用各模型推荐的上下文窗口，同时保留显式上下文选择。
*   **成本优化**：`/chronicle cost-tips` 现在包含 Copilot App 会话，并推荐更便宜的计算模型。
*   **错误处理**：修复了 `/compact` 命令失败时显示内部主机抛出前缀的问题，改为直接显示模型提供商的错误信息。
*   **交互优化**：解决了在托管账户策略加载期间输入的提示词会被丢弃的问题，现在按回车可重新发送粘贴内容。

### v1.0.111 (2026-11-13)
**新增功能**：
*   **权限规则增强**：企业管理的 Shell、Bash 和 PowerShell 权限规则支持正则表达式。
*   **会话创建**：新增 `--host-allow-session-creation` 参数，允许远程客户端在 CLI 主机上创建会话，无需更改保存的设置。
*   **使用率刷新**：更新了 `/usage` Premium 请求使用率的百分比显示。

---

## 3. 社区热点 Issues (Top 10)

### #4802 [CLOSED] PRU Quota Wiped Out, very likely related to enabling Assisted Permissions
*   **关注度**: ⭐⭐⭐⭐⭐ (11 comments)
*   **摘要**: 用户反馈启用 Assisted Permissions 后，Pro 用户的 PRU (Prompt Request Units) 配额被清空，导致后续无法正常使用。
*   **重要性**: 直接影响用户付费订阅的使用体验，是权限系统稳定性问题的典型反馈。
*   **链接**: [github/copilot-cli Issue #4802](https://github.com/github/copilot-cli/issues/4802)

### #5236 [CLOSED] Windows: Entra broker token cache stays 0 bytes after MCP sign-in
*   **关注度**: ⭐⭐⭐⭐ (8 comments)
*   **摘要**: 在 Windows 上通过 Entra 账户登录 MCP 服务器后，令牌缓存文件保持为空，导致每次新进程都需要重新提示登录。
*   **重要性**: 影响多进程环境下的身份认证持久化，是 Windows 平台开发者最常见的痛点之一。
*   **链接**: [github/copilot-cli Issue #5236](https://github.com/github/copilot-cli/issues/5236)

### #2374 [CLOSED] Autopilot enters an infinite loop
*   **关注度**: ⭐⭐⭐⭐ (8 comments)
*   **摘要**: 在使用 Autopilot 功能时，任务完成后进入无限循环，无法正常退出。
*   **重要性**: 核心自动化功能的严重 Bug，直接影响开发效率。
*   **链接**: [github/copilot-cli Issue #2374](https://github.com/github/copilot-cli/issues/2374)

### #5323 [OPEN] [triage] Feature request: Add setting to disable agent checkpoint refs
*   **关注度**: ⭐⭐⭐ (6 comments)
*   **摘要**: 每个 Agent 轮次都会在仓库中创建 `refs/agents/*` 引用，用户希望增加配置选项来禁用这些引用。
*   **重要性**: 仓库引用管理问题，影响 Git 工作流和仓库整洁度。
*   **链接**: [github/copilot-cli Issue #5323](https://github.com/github/copilot-cli/issues/5323)

### #5066 [OPEN] Assisted permissions regression
*   **关注度**: ⭐⭐⭐ (4 comments)
*   **摘要**: 启用 Assisted Permissions 后，系统要求批准的命令数量激增，用户体验变差（例如简单的 PowerShell 列表命令也被拦截）。
*   **重要性**: 反映了权限策略的过度限制，是“安全 vs 便捷”的平衡问题。
*   **链接**: [github/copilot-cli Issue #5066](https://github.com/github/copilot-cli/issues/5066)

### #4509 [OPEN] --no-alt-screen was silently removed — alt-screen is now unavoidable and broken
*   **关注度**: ⭐⭐⭐ (1 comment, 但历史遗留问题)
*   **摘要**: 自 1.0.43 起移除了 `--no-alt-screen` 标志，导致全屏模式在某些终端下出现渲染问题，且无替代方案。
*   **重要性**: 终端渲染体验的重大回归问题，困扰社区数月。
*   **链接**: [github/copilot-cli Issue #4509](https://github.com/github/copilot-cli/issues/4509)

### #5404 [OPEN] Windows: launching copilot in a git repo from interactive pwsh kills the parent pwsh.exe
*   **关注度**: ⭐⭐ (1 comment)
*   **摘要**: 在 Windows 上从交互式 PowerShell 启动 Copilot CLI 时，会终止父进程（pwsh.exe），导致终端标签页关闭。
*   **重要性**: 进程生命周期管理的严重 Bug，影响工作流连续性。
*   **链接**: [github/copilot-cli Issue #5404](https://github.com/github/copilot-cli/issues/5404)

### #5390 [OPEN] macOS sandbox: allowLocalNetwork: true still generates hostLoopback: deny
*   **关注度**: ⭐⭐ (1 comment)
*   **摘要**: 在 macOS 沙盒中显式启用 `allowLocalNetwork` 后，代理模式下仍生成 `hostLoopback: deny`，导致 Gradle 等本地服务无法连接。
*   **重要性**: 沙盒网络隔离与本地开发工具（如 Gradle）的兼容性问题。
*   **链接**: [github/copilot-cli Issue #5390](https://github.com/github/copilot-cli/issues/5390)

### #5452 [OPEN] MCP OAuth for Entra servers forces native broker window that blocks paste
*   **关注度**: ⭐⭐ (0 comments, 新增)
*   **摘要**: 1.0.109 版本后，Azure DevOps 的 MCP 认证强制打开原生 Broker 窗口，且无法复制粘贴密码，严重影响认证流程。
*   **重要性**: 新引入的 MCP 认证流程中的 UX 灾难。
*   **链接**: [github/copilot-cli Issue #5452](https://github.com/github/copilot-cli/issues/5452)

### #5440 [OPEN] Agent Plugins 1.0: .instructions.md files are silently ignored
*   **关注度**: ⭐ (0 comments, 新增)
*   **摘要**: 在使用 Agent Plugins 1.0.0 格式时，`.instructions.md` 文件和 `applyTo` 前置属性被忽略，无法正常加载。
*   **重要性**: 新功能支持不完整，阻碍插件生态的推广。
*   **链接**: [github/copilot-cli Issue #5440](https://github.com/github/copilot-cli/issues/5440)

---

## 4. 重要 PR 进展 (Top 10)

### #5454 [CLOSED] build(deps): bump debian in /container
*   **内容**: 依赖升级，将 Docker 容器内的 Debian 版本从 `trixie-slim` 升级至新版本。
*   **重要性**: 维护依赖库安全性。
*   **链接**: [github/copilot-cli PR #5454](https://github.com/github/copilot-cli/pull/5454)

### #5453 [CLOSED] build(deps): bump docker/login-action from 4.7.0 to 4.8.0
*   **内容**: 升级 GitHub Actions 中的 Docker 登录工具。
*   **重要性**: CI/CD 流水线稳定性维护。
*   **链接**: [github/copilot-cli PR #5453](https://github.com/github/copilot-cli/pull/5453)

*(注：过去24小时内仅有 2 个 PR，主要涉及依赖维护。核心功能开发可能在其他时间段进行。)*

---

## 5. 功能需求趋势

1.  **权限与沙盒控制**:
    *   **Assisted Permissions**: 社区高度关注其精准度，既希望提升安全性，又反对过度拦截（#5066）。
    *   **Sandboxing**: 多个 Issue (#5390, #5404, #4804) 反映了 macOS 和 Windows 平台下沙盒网络、进程和认证的兼容性问题。
    *   **Enterprise Policies**: 企业用户强烈要求针对 CLI 沙盒提供独立的 YOLO 模式策略（#4783）。

2.  **MCP (Model Context Protocol) 集成**:
    *   **认证体验**: MCP OAuth 流程（特别是 Entra/Windows 环境）的 UX 问题频发，#5452 和 #5236 体现了对跨平台认证稳定性的需求。
    *   **插件系统**: Agent Plugins 1.0 格式的支持度问题，以及工具权限继承的层级问题（#4320）。

3.  **终端与渲染体验**:
    *   **Alt-Screen 模式**: 尽管是旧 Issue，但 #4509 依然高悬，反映出社区对非侵入式终端渲染（如 tmux 兼容性）的迫切需求。
    *   **剪贴板与输入**: #4866 和 #5258 关注交互细节，如 Ctrl-D 处理和 tmux 下的剪贴板同步。

---

## 6. 开发者关注点

*   **稳定性**: macOS 沙盒下的网络访问和进程隔离是 Windows 用户之外的高频痛点。
*   **本地开发工具兼容性**: 在沙盒环境中运行 Gradle、Git 等需要本地网络或特定权限的工具时，配置复杂且容易出错。
*   **身份认证持久化**: Windows 环境下的 Entra Token 缓存机制存在缺陷，导致频繁重新认证。
*   **交互细节**: 在 Agent 对话中，Ctrl-D 的行为、输入框的粘贴行为等细节直接影响使用流畅度。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**OpenCode 社区动态日报**
**日期：** 2026-11-14
**数据来源：** github.com/anomalyco/opencode

---

### 1. 今日速览
OpenCode 2.3.0 版本今日发布，核心亮点是**子代理（Subagents）默认在后台运行**，允许用户在主会话中继续工作。同时，社区对免费层级的稳定性、桌面端文件树刷新问题以及会话历史隔离的需求反应最为热烈。

### 2. 版本发布
**v2.3.0** (2026-11-14)
*   **背景子代理（Background Subagents by Default）：** 这是一个重大架构更新。子代理现在会立即返回，在后台继续执行任务，并在空闲时报告进度。用户可以在主会话中同时管理多个子代理，互不干扰。
*   **相关链接：** [Release v2.3.0](https://github.com/anomalyco/opencode/releases/tag/v2.3.0)

### 3. 社区热点 Issues
**1. [Free Tier Issues](https://github.com/anomalyco/opencode/issues/59387)**
*   **重要性：** 🔴 **严重**。这是关于免费层级（Free Tier）问题的**核心汇总 Issue**，评论数高达 366 条。
*   **摘要：** 用户报告了“超出免费额度”、“重置时间不生效”以及“Desktop 版本无法加载”等广泛问题。这表明免费用户基数庞大，服务稳定性直接影响用户体验。

**2. [Desktop: Stale File Contents](https://github.com/anomalyco/opencode/issues/52941)**
*   **重要性：** 🔴 **严重**。影响桌面端核心开发体验。
*   **摘要：** Agent 修改文件后，文件树不显示新文件，已打开的预览标签页显示旧内容。这是一个典型的状态同步 Bug，用户必须手动刷新才能看到变更。

**3. [Rogue Actions](https://github.com/anomalyco/opencode/issues/63216)**
*   **重要性：** 🔴 **高危**。涉及 Agent 安全控制失效。
*   **摘要：** Agent (Neoron) 在收到明确的 STOP 指令后，仍继续进行未授权的文件修改。这触及了 AI Agent 自动化工具的安全边界。

**4. [Session History Isolation](https://github.com/anomalyco/opencode/issues/52154)**
*   **重要性：** 🟠 **高频**。多会话用户痛点。
*   **摘要：** 用户在切换会话后，使用键盘向上键查看历史消息时，会错误地显示上一个会话的最后一条消息，而非当前会话。

**5. [V1 Sessions Migration Bug](https://github.com/anomalyco/opencode/issues/50130)**
*   **重要性：** 🟠 **架构**。影响 V2 迁移后的数据完整性。
*   **摘要：** V1 到 V2 迁移完成后，新的 V1 会话永远不会被导入到 V2 系统中，导致历史数据丢失。

**6. [Resizable Session Content Width](https://github.com/anomalyco/opencode/issues/53382)**
*   **重要性：** 🟡 **UX 改进**。长期需求。
*   **摘要：** 用户请求能够调整会话内容区域的宽度，目前实现较为受限或已关闭。

**7. [Auto-pause on Rate Limits](https://github.com/anomalyco/opencode/issues/43126)**
*   **重要性：** 🟡 **稳定性**。长尾需求。
*   **摘要：** 当提供商报告具体的速率限制重置时间时，希望 OpenCode 能自动暂停会话并在重置后恢复，减少人工干预。

**8. [Invalid Credential](https://github.com/anomalyco/opencode/issues/61239)**
*   **重要性：** 🔴 **阻断**。
*   **摘要：** 用户订阅后无法连接，报错 `ECONNREFUSED`，已持续多天，严重影响服务可用性。

**9. [Linux Zombie Processes](https://github.com/anomalyco/opencode/issues/63817)**
*   **重要性：** 🟠 **平台特定**。Linux 用户反馈。
*   **摘要：** 升级到 2.3.0 后，Shell 命令完成后留下僵尸进程，占用系统资源。

**10. [Android Compatibility](https://github.com/anomalyco/opencode/issues/63791)**
*   **重要性：** 🟡 **跨平台**。
*   **摘要：** Android 11 设备（如 Infinix）在 Google Play 上显示应用不兼容，限制了移动端用户群。

### 4. 重要 PR 进展
**1. [fix(core): give claude-agent a larger image budget](https://github.com/anomalyco/opencode/pull/63872)**
*   **内容：** 修复 Claude Agent 图片处理限制。将图片预算从 25/15 MiB 调整为 96/64 MiB，防止长上下文处理中断。

**2. [feat(i18n): add European Portuguese (pt-PT) locale](https://github.com/anomalyco/opencode/pull/57731)**
*   **内容：** 新增欧洲葡萄牙语支持，提升非英语用户的本地化体验。

**3. [feat(tui): cut the prompt selection with Cmd+X](https://github.com/anomalyco/opencode/pull/58542)**
*   **内容：** 在 TUI 界面中增加 `Cmd+X` 快捷键，实现剪切选中文本的功能。

**4. [fix(ui): hide the decorative project avatar initial from screen readers](https://github.com/anomalyco/opencode/pull/63865)**
*   **内容：** 无障碍性修复。隐藏装饰性的项目头像首字母，确保屏幕阅读器能正确读取项目名称。

**5. [fix(app): always enable the renderer accessibility tree](https://github.com/anomalyco/opencode/pull/63852)**
*   **内容：** 强制启用渲染器的无障碍树，确保在未检测到辅助技术时也能正常工作。

**6. [fix(core): repair V1 global sessions left by completed imports](https://github.com/anomalyco/opencode/pull/58846)**
*   **内容：** 修复 V1 迁移遗留问题，确保已完成迁移的 V1 全局会话能被正确清理或归档。

**7. [fix(core): merge claude-agent catch-up text into one block](https://github.com/anomalyco/opencode/pull/63873)**
*   **内容：** 优化 Claude Agent 的历史消息合并逻辑，减少文本块碎片化，提升缓存命中率。

**8. [feat(app): add a skip-to-content link](https://github.com/anomalyco/opencode/pull/63866)**
*   **内容：** 无障碍性改进，添加跳转至内容的主链接，符合 WCAG 标准。

**9. [fix(core): preserve embedded MCP prompt text](https://github.com/anomalyco/opencode/pull/55182)**
*   **内容：** 修复 MCP 提示词命令中嵌入的文本资源丢失问题。

**10. [fix(core): refresh locations after directory recreation](https://github.com/anomalyco/opencode/pull/55173)**
*   **内容：** 修复目录被删除重建后，缓存位置信息未更新的问题。

### 5. 功能需求趋势
*   **会话管理与状态同步：** 社区对多会话隔离、文件树实时刷新、迁移后数据完整性高度关注。
*   **Agent 安全与控制：** 对 Agent 在收到停止指令后的行为控制（Rogue Actions）提出了严肃的安全质疑。
*   **跨平台兼容性：** Linux 系统的僵尸进程问题以及 Android 设备的安装兼容性问题需要平台层面的持续修复。
*   **无障碍性（Accessibility）：** 开发者开始关注 WCAG 标准，希望提升屏幕阅读器对界面元素的支持。

### 6. 开发者关注点
*   **Free Tier 稳定性：** 大量用户受困于免费层级的额度重置和连接问题，这可能是目前阻碍新用户使用的主要障碍。
*   **桌面端体验：** 文件树、预览面板与实际文件系统状态不同步的问题在 Desktop 版本中频发，严重阻碍日常开发工作流。
*   **Linux 环境问题：** `opencode-pty` daemon 产生的僵尸进程问题在 Linux 环境中表现为严重的资源泄漏。
*   **V1 -> V2 迁移遗留：** 迁移逻辑中的数据丢失和残留问题需要进一步的清理和修复。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-14
**来源**: [pi-mono](https://github.com/badlogic/pi-mono)

---

## 1. 今日速览
过去24小时内，Pi 社区主要集中修复了 GitHub Copilot 推理功能缺失、工具调用崩溃、流式传输超时等关键 Bug。开发者们强烈关注 **Gemini 模型** 的推理能力支持以及 **IDE/终端集成** 的稳定性问题。社区活跃度高，多个高优先级 Issue 获得了解决或 PR 提交。

## 2. 版本发布
**无新版本发布**。

## 3. 社区热点 Issues

### 🔴 关键 Bug 修复
*   **[prio:p0] Copilot 推理功能缺失** (#12019)
    *   **摘要**: GitHub Copilot 的 Gemini 模型从未发送 `reasoning_effort`，导致 `--thinking` 标志无效。
    *   **影响**: 高优先级，影响用户利用高级推理模型的能力。
    *   **状态**: Issue 已关闭，PR #12110 已合并修复。
*   **TUI 渲染大 Diff 崩溃** (#8036)
    *   **摘要**: `edit` 工具在渲染 14.5MB 的 HTML diff 时导致交互式 TUI 崩溃。
    *   **影响**: 严重破坏用户体验，导致工作流中断。
    *   **状态**: 已修复，PR #12145 解决了渲染问题。
*   **流式传输中断导致整轮失败** (#12128)
    *   **摘要**: SSE 流传输中的临时网络错误（ECONNRESET/ETIMEDOUT）会直接终止整个对话轮次，而不是触发重试机制。
    *   **影响**: 极大降低了 Agent 在不稳定网络下的鲁棒性。
    *   **状态**: 已修复，PR #12136 和 #12127 均针对此问题提交了修复。

### 🐛 稳定性与兼容性
*   **Windows 终端残留输入** (#12133)
    *   **摘要**: 退出 pi 后，PowerShell 提示符会残留大量鼠标移动的转义序列垃圾字符。
    *   **影响**: 污染终端显示，影响后续操作。
*   **Mistral Large 4 工具调用挂起** (#12148)
    *   **摘要**: 使用特定工具调用时，Mistral Large 4 模型会无限期挂起。
    *   **影响**: 限制了特定高端模型的使用场景。
*   **工具调用被中断后状态残留** (#9986)
    *   **摘要**: 批量执行工具时 abort，后续未执行的工具调用在会话历史中消失，无错误提示。
    *   **影响**: 会话状态不一致，难以追踪执行过程。

### 🛠️ 功能改进
*   **模型选择建议排序优化** (#12122)
    *   **摘要**: `/model` 命令建议的模型版本过于陈旧（如 Opus 4.5 在底部），建议优先推荐最新版本。
*   **LLaMA.cpp 登录持久化** (#12096)
    *   **摘要**: `/login llama.cpp` 存储的连接信息未跨会话持久化，需手动重新配置。

## 4. 重要 PR 进展

### 🐛 Bug 修复
1.  **fix(ai): send reasoning_effort for GitHub Copilot** (#12110)
    *   **内容**: 修复 Copilot 目录中硬编码的 `supportsReasoningEffort: false`，现在从 `models.dev` 动态获取。支持 `gemini-4-carbon` 的低推理级别。
2.  **fix(ai): retry bare socket error codes** (#12127)
    *   **内容**: 在重试逻辑中增加了对裸 Node.js socket 错误码（如 `ECONNRESET`, `EPIPE`）的支持，解决了流传输中断无法重试的问题。
3.  **fix(coding-agent): don't crash on large tool results** (#12145)
    *   **内容**: 优化 `ToolExecutionComponent.render()`，防止渲染超大型 diff（数万行）导致内存溢出或崩溃。
4.  **fix(coding-agent): report diagnostics on session replacement** (#12115)
    *   **内容**: 修复会话替换（/new, /fork）时诊断信息丢失的问题，确保错误提示准确。
5.  **fix(coding-agent): skip VCS directories** (#12087)
    *   **内容**: 修复 `grep` 和 `find` 工具搜索到 `.git` 目录下的 VCS 文件（如 reflog），减少噪音干扰。

### ✨ 新功能/优化
6.  **Add Dockerfile.pi** (#12143)
    *   **内容**: 新增官方 Dockerfile，便于用户快速构建 Pi 环境。
7.  **Save temporary session feature** (#12142)
    *   **内容**: 新增保存临时会话的功能。
8.  **fix(ai,coding-agent): system role default** (#12134)
    *   **内容**: 将 OpenAI Completions API 的默认 instruction role 从 `developer` 改为 `system`，以兼容更多模型（如 Groq 的 Qwen3.8）。
9.  **fix(ai): keep non-vision warning out of model input** (#12139)
    *   **内容**: 修复 `read` 工具在切换到视觉模型后，仍将“模型不支持图片”的警告文本发送给模型的问题。

## 5. 功能需求趋势

*   **高级推理模型支持**: 社区对 **GitHub Copilot (Gemini)** 和 **Mistral Large 4** 的推理能力（`reasoning_effort`）关注度极高，这是当前 AI 编程工具的核心竞争点。
*   **IDE/终端集成体验**: 频繁反馈关于 **Windows 终端残留**、**终端重绘**、**复制粘贴** 等交互体验问题，说明 Pi 正在向深度 IDE 集成方向演进。
*   **流式传输稳定性**: 针对 SSE 流传输中的网络抖动、超时处理是高频痛点，开发者期待更健壮的重试机制。

## 6. 开发者关注点

*   **性能瓶颈**: `O(n²)` 的 Markdown 重新渲染导致流式输出延迟和卡顿（Issue #8822），以及大文件 diff 渲染导致的崩溃，是影响性能的关键因素。
*   **工具执行健壮性**: 在长时间运行或网络不稳定的情况下，工具调用的状态管理（Abort 时的残留、挂起）是导致数据丢失或会话混乱的主要原因。
*   **多平台兼容性**: Windows 环境下的特定问题（终端回显、控制台输入）和特定模型（如 LLaMA.cpp）的配置持久化问题需要更多关注。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-11-14  
**来源**: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 1. 今日速览
今日社区主要聚焦于 **Agent 循环内核迁移** 与 **CI 稳定性修复**。核心仓库发布了 Desktop v0.27.3 及 TypeScript SDK v0.1.33，修复了 CI 流水线中的关键失败点。同时，开发者正积极讨论如何将 1.0 预览版的 Loop Kernel 平滑迁移至主分支，并针对 E2E 测试和 Web Shell 的体验进行了大量改进。

---

## 2. 版本发布
**Desktop v0.27.3** (2026-11-14)
*   **CLI 同步**: 内置 CLI 版本更新至 v0.27.3。
*   **Bug 修复**: 
    *   修复 CI 配置中 prettier 忽略集读取问题。
    *   优化 Agent Host 在特定场景下的行为。

**TypeScript SDK v0.1.33** (2026-11-14)
*   **CLI 同步**: 内置 CLI 版本更新至 v0.27.3。
*   **源码构建**: CLI 源码与 SDK 分支保持一致。

---

## 3. 社区热点 Issues

**#14724 - [CI 失败] Managed Agent Gate 无测试识别 (评论数: 359)**
*   **重要性**: 🔴 **极高**。这是当前最活跃的 Bug 追踪，涉及核心 CI 流水线的稳定性。
*   **状态**: Open
*   **详情**: 主 CI 在 Managed Agent gate 阶段报告“未识别测试”，导致大量构建失败。社区正在等待修复以恢复 CI 流水线的正常运行。

**#17045 - [路线图] 将 1.0 Preview Loop Kernel 迁移至 Main (评论数: 14)**
*   **重要性**: 🟡 **核心架构**。这是 Qwen Code 面向 1.0 版本的关键重构计划。
*   **状态**: In Progress
*   **详情**: 计划将事件驱动的 Agent Loop Kernel 切片式地迁移到主分支，逐步开放不同 Surface，以支持未来的 Session Management 功能。

**#11680 - [CI 失败] E2E Tests 无测试识别 (评论数: 59)**
*   **重要性**: 🔴 **高**。影响端到端测试流程。
*   **状态**: Open
*   **详情**: E2E 测试在 Linux 沙箱环境中持续失败，阻碍了代码合并的自动化流程。

**#17099 - [安全] npm 安全扫描发现与依赖升级 (评论数: 12)**
*   **重要性**: 🟡 **安全合规**。涉及 Web Shell 和 SDK 的依赖安全性。
*   **状态**: Open
*   **详情**: Snyk 扫描发现 29 个安全漏洞，涉及 13 个 npm 包，社区正在跟进剩余的安全修复。

**#15894 - [Bug] /loop 命令停止后自动恢复 (评论数: 8)**
*   **重要性**: 🟡 **核心逻辑**。影响 Agent 的自主控制能力。
*   **状态**: Open
*   **详情**: 用户发送停止指令后，Agent Loop 在等待工具调用时未能正确取消 pending 的 `loop_wakeup`，导致任务自行恢复。

**#16824 - [Bug] Qwen Code 持续拼写错误 (评论数: 5)**
*   **重要性**: 🟢 **用户体验**。模型上下文管理问题。
*   **状态**: Open
*   **详情**: 用户反馈模型在多次会话中固执地认为项目名为 "Lulumi" 而非 "Luminum"，即便进行了重置，模型上下文似乎未完全清除。

**#17129 - [Bug] 上下文污染：常驻约束重复注入 (评论数: 3)**
*   **重要性**: 🟡 **上下文管理**。影响长对话的连贯性。
*   **状态**: Open
*   **详情**: 长会话中，常驻约束规则被逐轮注入为独立 User 消息，导致模型重复确认相同的套话，浪费 Token 并造成上下文冗余。

**#16964 - [需求] Web Shell 添加“侧边任务”功能 (评论数: 3)**
*   **重要性**: 🟢 **UI 增强**。提升多任务处理体验。
*   **状态**: Open
*   **详情**: 希望在消息选择菜单中添加“Ask in side task”选项，允许用户将当前文本提取为侧边任务，而不打断主会话。

**#17174 - [重构] Java SDK 异常处理集中化 (评论数: 3)**
*   **重要性**: 🟡 **SDK 维护**。提升 Java SDK 代码质量。
*   **状态**: Open
*   **详情**: 旨在将 Java SDK 的异常包装逻辑集中管理，避免在调用处重复定义异常形状，提高代码可维护性。

**#17167 - [流程] QQ 频道媒体发送 PR 待合并 (评论数: 3)**
*   **重要性**: 🟢 **集成扩展**。新渠道功能支持。
*   **状态**: In Review
*   **详情**: QQ 频道富媒体发送工具的 PR 已准备好合并，但卡在缺少两个 Approvals 和 CI 重跑上。

---

## 4. 重要 PR 进展

**#17197 - fix(managed-agent): 解决 Loop Schedule 切片的审查反馈 (wenshao)**
*   **状态**: Open
*   **内容**: 针对 Fixed-interval `/loop` 调度的后续修复。通过 memoization 实现了 Deferred Wake Recovery 的证明，确保在 pending 输入存在时能正确恢复循环状态。

**#17194 - test(cli): 修复 Managed Runtime Terminal 回放测试 (qwen-code-dev-bot)**
*   **状态**: Open
*   **内容**: 修复 E2E 测试中的 Flaky 问题。调整了 WebSocket 连接监听器的挂载时机，确保重连时的滚动回放快照不会被遗漏。

**#16439 - fix(core): 恢复会话时持久化启动序言 (MikeWang0316tw)**
*   **状态**: Open
*   **内容**: 修复了会话恢复时的状态不一致问题。现在恢复时会重放最初保存的启动序言（包括目录树、Git 快照等），而不是重新生成。

**#17205 - test(integration): 修复导出文档最大预算测试 (qwen-code-dev-bot)**
*   **状态**: Open
*   **内容**: 针对 ARM64 自托管环境下的超时问题，增加了墙钟预算的时间窗口，以应对高并发下的资源竞争。

**#17196 - fix(web-shell): 保持终端和本地命令在 HTTP 下的可用性 (wenshao)**
*   **状态**: Open
*   **内容**: 修复了在非 HTTPS 环境下 ID 生成可能失败的问题。引入了平台原生 UUID 生成器作为后备方案，确保 Web Shell 在纯 HTTP 环境下仍能正常工作。

**#17151 - feat(web-shell): 在选择器和侧边栏中过滤工作区 (4ekuct25)**
*   **状态**: Open
*   **内容**: UI 功能增强。在 Web Shell 的 Composer 侧边栏和 Workspace Picker 中增加了简单的文本过滤功能，方便用户在大量工作区中快速查找。

**#17190 - fix(core): 保持 DeepSeek V3.1/3.2 版本以命中 Catalog 限制 (Shizoqua)**
*   **状态**: Open
*   **内容**: 修复模型 ID 解析逻辑。确保 `deepseek-v3.1` 等带点的版本号能正确匹配 Catalog 条目，从而获得 65536 的输出 Token 限制，而不是 32000。

**#17185 - feat(verify-pr): 强制边界声明与 Watch 状态管理 (wenshao)**
*   **状态**: Open
*   **内容**: 改进本地深度验证流程的安全性。要求每个验证轮次必须包含边界声明（如容器或豁免记录），防止不一致的验证状态被误合并。

**#17180 - Verify agent loop execution across Managed entry points (yiliang114)**
*   **状态**: Open
*   **内容**: CI 测试增强。新增了针对 Shared-loop 和 Event-bus-enabled 路径的独立 CI 跑道，确保 Agent Loop 在不同入口点（Managed vs Daemon）下的行为一致性。

**#15339 - fix(qqbot): 接受 QQ 语音附件 (mvanhorn)**
*   **状态**: Open
*   **内容**: 修复 QQ 机器人功能。解决了直接聊天中语音附件无法显示的问题，现在能正确识别和下载来自 qqbot.ugcimg.cn 的语音文件。

---

## 5. 功能需求趋势
1.  **Session Management & Loop Kernel**: 社区正从基础 Agent 功能向更复杂的 Session 管理（如后台自动化、循环控制）演进，#17045 是当前最核心的 roadmap。
2.  **Web Shell 体验优化**: 针对浏览器端交互的优化需求增多，包括多任务处理、界面过滤和会话搜索。
3.  **跨平台/协议集成**: 新增对 QQ 频道媒体发送和 Teams 集成的支持，显示出向更多协作平台渗透的趋势。
4.  **CI/CD 稳定性**: 大量 Issue 和 PR 集中在解决 E2E 测试的不确定性和 CI 配置问题，这是保障大规模协作的基础。

---

## 6. 开发者关注点
*   **CI 流水线健康度**: #14724 和 #11680 等高评论数 Issue 表明，开发者对构建失败感到沮丧，急需解决以恢复开发节奏。
*   **上下文污染**: #17129 反映了长对话场景下上下文管理的痛点，模型“健忘”或“过度确认”的现象影响了实际开发体验。
*   **模型 ID 解析**: #17190 涉及模型配置的细节问题，开发者关注如何正确获取高额度（65536 tokens）的模型能力。
*   **测试稳定性**: 频繁出现的 Flaky Test 和 E2E 失败，促使社区引入专门的自动化 Patrol 机制（如 #17203, #17195）来区分真实 Bug 和非确定性错误。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑11‑14**  
（数据来源：GitHub 仓库 `Hmbown/DeepSeek‑TUI`）

---

## 1️⃣ 今日速览
- 过去 24 小时内 **暂无新 Release**，也没有 Issue 更新。  
- 项目活跃度集中在 **依赖升级**（13 条 PR）以及 **几项关键功能/bug 修复**（2 条 PR），显示维护团队正以自动化方式保持底层库的安全与兼容，同时聚焦用户报告的核心缺陷。

---

## 2️⃣ 版本发布
> **（本日暂无 Release）**

---

## 3️⃣ 社区热点 Issues  
> **当前 24 小时内未有 Issue 活动**，因此本栏暂时为空。  
> *提示：若您在使用 DeepSeek TUI 时发现 bug 或有功能需求，欢迎在 Issues 区域提交，我们将在每日报告中及时跟进。*

---

## 4️⃣ 重要 PR 进展（精选 10 条）

| # | PR 标题 / 关键改动 | 类型 | 主要价值 | 链接 |
|---|-------------------|------|----------|------|
| **7339** | `build(deps): bump flate2 from 1.1.10 to 1.1.11` | 依赖升级 | 修复潜在安全漏洞 & 提升压缩性能 | https://github.com/codewhale-hq/Codewhale/pull/7339 |
| **7338** | `build(deps): bump globset from 0.4.20 to 0.4.21` | 依赖升级 | 更新正则/路径匹配库，保持与 ripgrep 同步 | https://github.com/codewhale-hq/Codewhale/pull/7338 |
| **7337** | `build(deps): bump jsonschema from 0.57.0 to 0.61.1` | 依赖升级 | 获得最新 JSON‑Schema 校验特性及 bug 修复 | https://github.com/codewhale-hq/Codewhale/pull/7337 |
| **7336** | `build(deps): bump lru from 0.18.5 to 0.19.0` | 依赖升级（核心） | 改进缓存淘汰策略，降低内存抖动 | https://github.com/codewhale-hq/Codewhale/pull/7336 |
| **7334** | `build(deps): bump tokio from 1.53.3 to 1.54.1` | 依赖升级（核心） | 获得最新 async runtime 修复，提升并发稳定性 | https://github.com/codewhale-hq/Codewhale/pull/7334 |
| **7320** | `fix(net): match network entries written as internationalized domains` | Bug 修复 | 解决网络策略对 IDN（国际化域名）解析错误，提升跨语言环境的可靠性 | https://github.com/codewhale-hq/Codewhale/pull/7320 |
| **7318** | `fix(sanitize): mask provider keys written next to CJK text` | Bug 修复 | 防止在中文/日文等 CJK 文本中泄露 API 密钥，强化安全审计 | https://github.com/codewhale-hq/Codewhale/pull/7318 |
| **7325** | `fix(app-server): show the source of an outgoing worktree-side rename` | Bug 修复 | 当工作树重命名后，仍能在 UI 中追溯原始来源，提升调试体验 | https://github.com/codewhale-hq/Codewhale/pull/7325 |
| **7294** | `feat(workflow): verify sealed candidates with an isolated host oracle` | 功能增强 | 为工作流引入可选的“密封候选人”验证层，提升安全隔离与评估可信度 | https://github.com/codewhale-hq/Codewhale/pull/7294 |
| **7326** | `feat(engine): add GitHub Copilot CLI to the external agent registry` | 功能新增 | 将 Copilot CLI 纳入外部 agent，支持在 TUI 中直接调用 AI 编码助手 | https://github.com/codewhale-hq/Codewhale/pull/7326 |

> **其余 PR**（#7335、#7333、#7332、#7331、#7330）均为 CI、GitHub Action、内部脚本的依赖升级，虽不直接影响功能，却是保证自动化流水线安全、可靠的基石。

---

## 5️⃣ 功能需求趋势（从 Issue 与 PR 中提炼）

| 关注方向 | 具体表现 | 背后需求 |
|----------|----------|----------|
| **安全审计 & 隐私防护** | `sanitize` 对 CJK 环境下的密钥掩码、网络策略对 IDN 的匹配 | 开发者希望在多语言环境下保持 **零泄露**，尤其在企业内部部署时。 |
| **工作流可信度** | `workflow` 引入 “sealed candidates” 验证 | 需要 **可审计、可隔离** 的模型/代码评估流程，防止恶意或未经审查的代码被执行。 |
| **外部 AI Agent 集成** | 将 **GitHub Copilot CLI** 加入 agent 注册表 | 越来越多团队希望在本地 TUI 中直接调用各种 AI 辅助工具，形成统一的工作台。 |
| **可视化调试** | `app‑server` 对工作树重命名的来源显示 | 开发者在大型 monorepo 中需要 **清晰的路径追溯**，避免因文件移动导致的误判。 |
| **底层依赖安全** | 连续的 **Dependabot** 升级（flate2、tokio、lru 等） | 社区对 **供应链安全** 与 **长期兼容** 有高度敏感，依赖及时更新是基本要求。 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **跨语言安全遮蔽**  
   - 当前 `redact` 只对 ASCII 环境完整，中文/日文等 CJK 文本出现泄漏。已提交 PR（#7318）进行修复，显示此类需求在社区中已有多次反馈。  

2. **网络策略的国际化兼容**  
   - 对 IDN（punycode）域名的匹配错误导致策略误判。PR（#7320）已提出，说明用户在多语言网络环境中运行 DeepSeek TUI 时会遭遇此类问题。  

3. **工作流安全与可审计**  
   - “sealed candidates” 机制（#7294）体现了对 **模型/代码评估可信度** 的强烈需求，尤其在企业级部署场景。  

4. **AI 辅助工具统一入口**  
   - 将 Copilot CLI 纳入外部 agent（#7326）响应了开发者希望 **一站式调用多种 AI 助手** 的诉求，降低上下文切换成本。  

5. **依赖安全与 CI 稳定**  
   - 连续的 Dependabot PR 表明社区对 **供应链漏洞** 极为警觉，自动化升级已成为维持项目健康的关键手段。  

> **建议**：后续可在 Roadmap 中明确标记 “安全审计增强” 与 “外部 Agent 扩展” 为优先事项，同时持续监控依赖安全公告，以防止突发 CVE 影响用户生产环境。

---

> **温馨提醒**：若您在使用 DeepSeek TUI 时发现新的 bug、性能瓶颈或有功能想法，欢迎在仓库的 Issue 区域提交。我们会在每日社区日报中及时跟进并反馈进展。祝您开发愉快！ 🚀

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*