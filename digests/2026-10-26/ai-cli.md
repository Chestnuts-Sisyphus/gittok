# AI CLI 工具社区动态日报 2026-10-26

> 生成时间: 2026-10-25 22:10 UTC | 覆盖工具: 9 个

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
*数据截止：2026‑10‑26*  

---

## 1️⃣ 热门 Skills 排行（按社区讨论热度/评论数）  

| # | Skill (PR) | 功能概述 | 讨论焦点 | 当前状态 |
|---|------------|----------|----------|----------|
| **1** | **#1742 – `mcp-builder` streamable_http_client fix** | 为 MCP ≥ 2.0 提供兼容的 `streamable_http_client` 导入，并让用户可以通过 `create_mcp_http_client` 自定义 HTTP 头部。 | - 兼容性回归（旧代码在新版 MCP 中失效）<br>- 业务系统在跨域/安全头部配置上的需求 | **OPEN** |
| **2** | **#1298 – `skill-creator` Windows/Runtime 防护** | 将触发条件（trigger eval）隔离，修复 Windows 下 `select()` 管道竞争及运行时错误导致的误报。 | - Windows 环境可靠性<br>- 评估流程误判导致的优化偏差 | **OPEN** |
| **3** | **#1245 – `notion-spec-to-implementation` & `quantitative-resume-auditor`** | *Notion Spec → Implementation*：把产品/技术规格页面自动拆解为 Notion 任务；*Resume Auditor*：量化简历评估并给出改进建议。 | - 自动化需求工程<br>- 人力资源/招聘自动化的兴趣激增 | **OPEN** |
| **4** | **#1771 – `proofcore-contract-auditor`** | 静态分析 Solidity 与 Rust 智能合约，生成零存储 Merkle 证明并锚定至 TON 区块链。 | - Web3 安全审计需求<br>- 区块链审计可追溯性的讨论 | **OPEN** |
| **5** | **#1703 – `md2video-audio`** | 零成本将 Markdown 文档直接渲染为 MP4 视频，配有人声朗读（Marp + TTS）。 | - 内容创作自动化<br>- 生成式媒体（文档 → 视频）的使用场景 | **OPEN** |
| **6** | **#1980 – `webapp-testing` shell‑execution hardening** | 移除 `subprocess.Popen(..., shell=True)`，防止命令注入（CWE‑78），并实现安全的服务器启动脚本。 | - 安全审计与渗透测试<br>- 代码执行安全的最佳实践 | **OPEN** |
| **7** | **#1792 – `docx` accept‑changes robustness** | 当 LibreOffice 超时或未真正接受修订时返回错误，并在成功后验证 DOCX 中不再出现 `<w:ins>/<w:del>` 等修订标记。 | - 文档处理可靠性<br>- 超时与错误报告的改进 | **OPEN** |
| **8** | **#525 – `pyxel` retro‑game development** | 为 Claude Code 引入 Pyxel 引擎，支持创建、调试、帧检查以及游戏状态验证的完整工作流。 | - 创意/游戏开发工具需求<br>- 教育/入门级游戏编程的兴趣 | **OPEN** |

> **备注**：上述 PR 均为 **OPEN**（尚未合并）。它们在 Issues / PR 评论区出现了大量讨论，表明社区对对应功能的需求十分迫切。

---

## 2️⃣ 社区需求趋势（从 Issues 抽象的热点方向）

| 方向 | 代表 Issue | 关键诉求 |
|------|------------|----------|
| **安全与信任边界** | #492 – “Community skills distributed under `anthropic/` namespace enable trust boundary abuse” | 防止恶意或误导性社区 Skill 冒充官方 Skill，需 **命名空间隔离、签名验证或官方审查机制**。 |
| **组织级 Skill 共享** | #228 – “Enable org‑wide skill sharing in Claude.ai” | 通过内部库或共享链接实现 **跨团队、跨用户的 Skill 分发**，降低手动上传成本。 |
| **Skill 触发率与评估框架** | #556 – “run_eval.py: claude -p never triggers skills/commands” | 提升 **Skill/Command 触发率**、改进 **评估脚本的可靠性**，确保自动化测试能真实反映使用情况。 |
| **内存/上下文压缩** | #1329 – “compact‑memory (symbolic notation for compact agent state)” | 为长期运行的 Agent 提供 **紧凑的记忆表示**，降低上下文消耗。 |
| **文档质量控制** | #514 – “document‑typography skill” (PR) & #189 – “duplicate skills from document‑skills & example‑skills” | 自动化 **排版、排版错误检测**、消除 **插件重复**，提升文档可读性。 |
| **错误恢复与兼容性** | #1390 – “mcp‑builder evaluation scores 0/N” & #1997 – “parse YAML frontmatter scalars correctly” | 改进 **Skill‑Creator、MCP‑Builder** 的错误信息与 YAML 解析，提升 **跨平台/跨版本兼容性**。 |
| **生成式媒体 & 多模态** | #1703 – `md2video-audio` (PR) | 将文字内容直接转成 **视频+语音**，满足内容创作者“一键生成”需求。 |
| **Web3 与安全审计** | #1771 – `proofcore-contract-auditor` (PR) | 对 **智能合约** 提供自动化、可验证的审计报告，满足区块链开发者安全需求。 |

**趋势概括**：**安全/信任、协作共享、评估可靠性、上下文压缩以及多模态生成** 是社区最关注的四大方向。

---

## 3️⃣ 高潜力待合并 Skills（评论活跃、需求匹配度高）  

| PR | 功能 | 关键价值 | 近期落地可能性 |
|----|------|----------|----------------|
| **#1742** – `mcp-builder`兼容修复 | 支持 MCP 2+ 与自定义 HTTP 头部 | 直接解决现有 MCP 使用者的兼容性阻塞 | 已有明确 Issue #1668，维护者活跃，预计 1‑2 周内合并 |
| **#1298** – `skill-creator` Windows/Runtime 防护 | 提升 Windows 环境下触发评估的可靠性 | 多数企业用户在 Windows 上运行 Claude Code，需求迫切 | 与 Issue #1390、#1997 形成共振，合并概率大 |
| **#1245** – Notion‑Spec‑to‑Implementation & Resume Auditor | 自动将规格文档拆解为可执行任务；量化简历审查 | 跨部门需求（产品、HR）广泛，已有多次社区演示 | PR 已更新 10‑+ 天，社区已给出使用案例，合并可望在下个里程碑 |
| **#1703** – `md2video-audio` | Markdown → MP4 + TTS，零成本媒体生成 | 内容创作者、教育培训需求强劲，已有 30+ star 的社区实验 | PR 通过 CI，缺少仅文档细节，预计下周审查完成 |
| **#1980** – `webapp-testing` Shell‑hardening | 消除 `shell=True` 引入的命令注入风险 | 安全审计是企业级部署的硬性要求 | 代码改动简洁，已通过安全审计工具检查，合并概率高 |
| **#525** – `pyxel` retro‑game skill | 完整的游戏开发、调试、帧检查工作流 | 教育、创意编程社区需求上升，已有教学视频示例 | 代码已通过单元测试，缺少唯一性描述，预计下月合并 |

---

## 4️⃣ Skills 生态洞察（一句话总结）

> **社区当前最集中的诉求是：提升 Skills 的安全可信、跨团队共享与自动化可靠性，同时扩展到多模态生成与专业化工作流（如文档、代码审计、Web3 安全）**。  

---

**链接汇总**（便于快速访问）

- PRs:  
  - #1742 → <https://github.com/anthropics/skills/pull/1742>  
  - #1298 → <https://github.com/anthropics/skills/pull/1298>  
  - #1245 → <https://github.com/anthropics/skills/pull/1245>  
  - #1771 → <https://github.com/anthropics/skills/pull/1771>  
  - #1703 → <https://github.com/anthropics/skills/pull/1703>  
  - #1980 → <https://github.com/anthropics/skills/pull/1980>  
  - #1792 → <https://github.com/anthropics/skills/pull/1792>  
  - #525 → <https://github.com/anthropics/skills/pull/525>  

- Issues:  
  - #492 → <https://github.com/anthropics/skills/issues/492>  
  - #228 → <https://github.com/anthropics/skills/issues/228>  
  - #556 → <https://github.com/anthropics/skills/issues/556>  
  - #1329 → <https://github.com/anthropics/skills/issues/1329>  
  - #514 → <https://github.com/anthropics/skills/issues/514> (related to doc‑typography)  
  - #1390 → <https://github.com/anthropics/skills/issues/1390>  
  - #1997 → <https://github.com/anthropics/skills/issues/1997>  

---  

*Prepared by the Claude Code Skills Analyst – Oct 2026*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**OpenAI Codex 社区动态日报 – 2026‑10‑26**

---

### 1. 今日速览  
- **Windows 桌面与 IDE 集成**持续出现多项崩溃/功能失效，影响日常使用。  
- **性能与资源管理**成为热点：多位用户报告 Agent 运行缓慢、频繁 429/429 错误。  
- **功能请求**集中在 **可视化报告**、**CLI 脚本化**与 **rate‑limit 反馈** 上。

---

### 2. 版本发布  
> **无新 Release**（过去 24 h 仅有 Issue 与 PR 活动）。

---

### 3. 社区热点 Issues  

| 号 | 标题 | 重要性 | 社区反应 |
|---|---|---|---|
| **#41290** | Windows WSL 下 Project 创建/删除失败 | **高** – 影响大多数 Windows 用户的项目管理 | 84 条评论，54 👍，多次重现与官方建议迭代 |
| **#49383** | Windows Screenshot 捕获 FrameArrived timeout | **高** – 电脑使用功能失效 | 37 条评论，2 👍，已在 26.928 版修正 |
| **#56691** | VS Code 1.143.1 Windows 下 Codex UI 启动失败 | **高** – IDE 集成核心功能失效 | 29 条评论，14 👍，开发者已提交回滚方案 |
| **#36718** | 任务完成报告提供结构化 evidence‑backed 结果 | **中** – 需求强烈但实现复杂 | 27 条评论，无点赞，社区讨论持续 |
| **#50171** | Windows 远程 dot 任务因 CloudThreadNotFoundError 终止 | **中** – 远程编程流程中断 | 19 条评论，1 👍，多位开发者标记为 “高优先级” |
| **#56264** | Windows 更新后会话恢复失败（MXC 无 SYSTEMROOT） | **中** – 影响持续使用者 | 16 条评论，3 👍，已提交补丁 |
| **#17541** | Azure 上 mid‑conversation 模型切换导致加密错误 | **中** – 影响云端多模型使用 | 15 条评论，10 👍，已在 Azure 版修复 |
| **#20093** | GitHub @codex 直接评论缺失环境信息 | **中** – 影响 PR 评审流程 | 12 条评论，6 👍，已在 26.101 版修复 |
| **#56771** | VS Code Remote SSH 下 Codex webview never ready | **高** – 远程开发者核心体验受阻 | 9 条评论，无👍，已列入 26.103 版计划 |
| **#50969** | Windows 26.930 版多次渲染崩溃、界面重启 | **高** – 频繁导致工作中断 | 8 条评论，无👍，已提交崩溃日志 |

> **链接**: `https://github.com/openai/codex/issues/<issue-number>`

---

### 4. 重要 PR 进展  
> **无 PR**（过去 24 h 无更新）。

---

### 5. 功能需求趋势  
| 方向 | 关键表现 | 典型 Issue |
|------|----------|------------|
| **IDE / Remote 集成** | VS Code、Remote SSH、CLI 远程控制 | #56691, #56771, #29186 |
| **Windows 桌面稳定性** | 渲染崩溃、进程恢复、系统变量缺失 | #50969, #56264, #52012 |
| **性能 & 资源管理** | Agent 启动慢、HTTP 429、rate‑limit 反馈 | #54004, #55443, #56209 |
| **可视化与报告** | Evidence‑backed 任务完成、rate‑limit UI | #36718, #56209 |
| **CLI/脚本化** | Cloud 环境发现、任务生命周期、模型切换 | #24777, #56350, #56951 |
| **安全与合规** | 浏览器安全策略、插件工具调用 | #49569, #54645 |

---

### 6. 开发者关注点  
- **Windows 桌面**: 频繁崩溃、渲染重启、系统环境缺失导致 Agent 无法恢复。  
- **IDE 集成**: VS Code Webview、Remote SSH 失效，影响远程编码与调试。  
- **性能瓶颈**: 429 错误、Agent 启动慢、缓存/回滚机制不足。  
- **功能可视化**: 需要更直观的任务完成与 rate‑limit 信息展示。  
- **脚本化与自动化**: CLI 对 Cloud 资源、模型、任务生命周期的支持尚不完整。  
- **安全/合规**: 浏览器安全策略导致外部访问受阻，插件工具调用失效。  

---

> **备注**: 所有链接均指向 `openai/codex` 仓库，内容已同步至 2026‑10‑25。请关注对应 Issue 以获取最新讨论与修复进度。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期**: 2026-10-26  
**数据范围**: 2026-10-25 过去24小时更新

---

## 1. 今日速览

社区今日主要关注点集中在 **ACPI 模式功能完善**（如会话重命名、上下文窗口显示）和 **多平台兼容性问题**（Asahi Linux 16KB 页面、Windows Entra 令牌缓存）。同时，关于减少固定上下文注入的优化需求也引发了广泛讨论，社区期望提升会话启动效率。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 社区热点 Issues

### 🔥 核心功能优化
1. **[OPEN] #4233 Emit `usage_update` in `--acp` mode**  
   - **重要性**: 提升非交互模式下的用户体验，允许客户端显示上下文窗口和 AI 信用额度。  
   - **状态**: 目前仅交互模式支持，社区已有 4 个点赞支持。  
   - [链接](https://github.com/github/copilot-cli/issues/4233)

2. **[OPEN] #5115 ACP: /rename reports success but doesn't rename the session**  
   - **重要性**: ACP 模式下会话重命名功能存在 Bug，影响多会话管理。  
   - **状态**: 2 条评论，等待修复。  
   - [链接](https://github.com/github/copilot-cli/issues/5115)

3. **[OPEN] #5198 [ACP] Support mid-turn steering in --acp mode**  
   - **重要性**: 请求在 ACP 模式下支持中途转向，以匹配交互模式的能力。  
   - **状态**: 新需求，暂无评论。  
   - [链接](https://github.com/github/copilot-cli/issues/5198)

### 🐛 平台兼容性问题
4. **[OPEN] #4977 Bundled ripgrep aborts with jemalloc on 16KB-page ARM64 kernels**  
   - **重要性**: Asahi Linux 用户遇到 CLI 启动崩溃，影响 Apple Silicon 用户。  
   - **状态**: 0 个点赞，需重新编译 ripgrep 二进制。  
   - [链接](https://github.com/github/copilot-cli/issues/4977)

5. **[OPEN] #5236 Windows: Entra broker token cache stays 0 bytes after MCP sign-in**  
   - **重要性**: Windows 上 MCP 登录后令牌缓存为空，导致每次启动重复提示登录。  
   - **状态**: 1 条评论，影响企业用户。  
   - [链接](https://github.com/github/copilot-cli/issues/5236)

6. **[OPEN] #5250 macOS: Entra-broker MCP servers fail at startup**  
   - **重要性**: macOS 上同时使用 Azure DevOps 和 WorkIQ 插件时，Entra 登录并发问题。  
   - **状态**: 新 Bug，0 个点赞。  
   - [链接](https://github.com/github/copilot-cli/issues/5250)

### ⚙️ 性能与架构优化
7. **[OPEN] #5251 / #5252 Reduce fixed injected context per session**  
   - **重要性**: 每次会话注入 40k tokens 固定上下文，浪费资源，社区呼吁自适应加载。  
   - **状态**: #5252 已关闭，#5251 仍在讨论中。  
   - [链接](https://github.com/github/copilot-cli/issues/5251)

8. **[OPEN] #5201 Prompt-budget rejection is not machine-identifiable**  
   - **重要性**: 请求超限时错误信息不明确，缺乏机器可解析的错误码。  
   - **状态**: 1 条评论，影响自动化处理。  
   - [链接](https://github.com/github/copilot-cli/issues/5201)

### 🔧 其他重要 Issues
9. **[OPEN] #5147 /restart fails when launched with --new-session-id**  
   - **重要性**: 传递自定义会话 ID 后，/restart 命令冲突报错。  
   - **状态**: 1 条评论。  
   - [链接](https://github.com/github/copilot-cli/issues/5147)

10. **[OPEN] #5226 Voice: make transcription language configurable**  
    - **重要性**: 语音输入语言硬编码为 "auto"，非英语用户首句识别可能不准。  
    - **状态**: 0 个点赞，功能需求。  
    - [链接](https://github.com/github/copilot-cli/issues/5226)

---

## 4. 重要 PR 进展

**过去24小时无新 PR 更新**。

---

## 5. 功能需求趋势

从 Issues 中提炼出以下社区关注方向：
- **ACPI 模式完善**: 会话管理、上下文显示、中途转向等非交互模式功能补全。
- **多平台适配**: ARM64 (Asahi Linux)、Windows Entra 令牌、macOS 并发登录。
- **性能优化**: 减少固定上下文注入、自适应工具加载。
- **语音与输入**: 语音转录语言配置、键盘输入优化。

---

## 6. 开发者关注点

- **企业用户痛点**: Windows Entra 令牌缓存问题、企业策略刷新失败 (#5130)。
- **IDE 集成**: VS Code SDK 中 HOME 覆盖触发脚本检测 (#5107)。
- **远程控制**: 会话列表数据滞后问题 (#5202)。
- **工具生态**: MCP 服务器可用性、技能工具发现 (#4401, #5208)。

--- 

**数据来源**: [GitHub Copilot CLI](https://github.com/github/copilot-cli)  
**分析师**: AI 开发工具技术分析师

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-10-26
**来源：** [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

### 1. 今日速览
今日社区活跃度极高，核心痛点集中在 **免费模型配额管理** 上的严重 Bug（如 IP 绕过漏洞、配额未重置、倒计时异常），导致大量用户（尤其是免费用户）无法正常使用。同时，桌面端 UI 的文件树显示功能、子代理通信机制以及插件工具调用稳定性也引发了广泛的用户反馈。

### 2. 版本发布
*   **无**：过去 24 小时内无新版本发布。

### 3. 社区热点 Issues (Top 10)

1.  **[高危漏洞] Unlimited usage Exploit on opencode models**
    *   **重要性**：严重的安全漏洞，攻击者可利用 VPN 绕过免费模型的 IP 限制，导致无限使用。
    *   **反应**：评论数最高 (56)，作者已通过自动化 VPN 旋转确认了该漏洞的存在。
    *   [链接](https://github.com/anomalyco/opencode/issues/34344)

2.  **[桌面端体验] Free Usage Exceeded on all free models in OpenCode Desktop 1.19.4**
    *   **重要性**：影响几乎所有桌面端免费用户，所有免费模型突然失效。
    *   **反应**：13 条评论，9 个点赞，用户强烈要求在不订阅付费计划的情况下继续使用。
    *   [链接](https://github.com/anomalyco/opencode/issues/58781)

3.  **[配额机制] Free quota time out never recovers**
    *   **重要性**：配额倒计时在达到 0 后异常跳回，导致用户陷入死循环无法使用。
    *   **反应**：5 条评论，社区反馈“每天都这样”。
    *   [链接](https://github.com/anomalyco/opencode/issues/58831)

4.  **[功能逻辑] Delegated subagent write silently denied on "ask" permission**
    *   **重要性**：OpenCode 2.0 中子代理的权限管理出现逻辑错误，导致写操作被静默拒绝。
    *   **反应**：5 条评论，对比 v1 的正常表现与 v2 的异常。
    *   [链接](https://github.com/anomalyco/opencode/issues/57603)

5.  **[功能逻辑] Plugin tools in catalog cannot be invoked directly**
    *   **重要性**：V2 插件注册的工具在目录中显示，但无法直接调用，报错 "No tool named"。
    *   **反应**：6 条评论，涉及工具前缀命名空间的配置问题。
    *   [链接](https://github.com/anomalyco/opencode/issues/50312)

6.  **[UI Bug] desktop: file tree toggle is disabled**
    *   **重要性**：桌面端文件树 UI 无法通过按钮或命令打开，处于禁用状态。
    *   **反应**：2 条评论，用户反馈“开箱即用”体验极差。
    *   [链接](https://github.com/anomalyco/opencode/issues/59047)

7.  **[插件系统] BUG NpmInstallFailedError with "An unknown git error occurred"**
    *   **重要性**：加载本地插件时 npm install 失败，阻碍了插件的开发与使用。
    *   **反应**：3 条评论，涉及 Git 权限或网络环境的兼容性问题。
    *   [链接](https://github.com/anomalyco/opencode/issues/58728)

8.  **[性能/稳定性] Reverting a message restores the whole worktree**
    *   **重要性**：撤销操作（Undo）的范围错误，不仅撤销自身修改，还破坏了其他会话的未提交更改。
    *   **反应**：5 条评论，涉及工作区管理的严重 Bug。
    *   [链接](https://github.com/anomalyco/opencode/issues/54026)

9.  **[数据限制] Free usage limit doesn't reset for 2+ days**
    *   **重要性**：免费配额在超过 2 天后仍未重置，导致用户无法开始新会话。
    *   **反应**：5 条评论，用户反馈每天尝试使用都会失败。
    *   [链接](https://github.com/anomalyco/opencode/issues/58814)

10. **[API 问题] Pro Subscription – API Inference Unavailable (HTTP 503)**
    *   **重要性**：付费订阅用户的 API 调用持续返回 503 错误，严重影响付费体验。
    *   **反应**：2 条评论，涉及后端服务可用性问题。
    *   [链接](https://github.com/anomalyco/opencode/issues/58806)

### 4. 重要 PR 进展 (Top 10)

1.  **PR #58843: fix(ai): accept fully-identified tool calls after the finish reason**
    *   **内容**：修复 AI 工具调用的识别逻辑，确保在模型结束响应后仍能正确处理工具调用。
    *   [链接](https://github.com/anomalyco/opencode/pull/58843)

2.  **PR #58498: fix(session-ui): reveal generic tool inputs and output**
    *   **内容**：修复 UI 显示问题，确保插件和 MCP 工具的输入输出详情在没有专用渲染器时也能正确展开。
    *   [链接](https://github.com/anomalyco/opencode/pull/58498)

3.  **PR #59071: fix(app): realign composer menu height**
    *   **内容**：修复桌面端 Beta 版本中的 UI 布局回归，调整了历史选择器和作曲家菜单的高度，确保测试通过。
    *   [链接](https://github.com/anomalyco/opencode/pull/59071)

4.  **PR #59064: feat(ui): add sortable primitive**
    *   **内容**：引入自定义的拖拽排序组件，替换旧的 `@dnd-kit` 依赖，并支持队列面板的键盘排序。
    *   [链接](https://github.com/anomalyco/opencode/pull/59064)

5.  **PR #59061: feat(app): open session deep links**
    *   **内容**：支持通过 `opencode://` 协议打开特定会话，允许外部应用（如任务看板）直接唤起 OpenCode。
    *   [链接](https://github.com/anomalyco/opencode/pull/59061)

6.  **PR #57224: fix(app): smooth timeline row motion**
    *   **内容**：优化会话时间轴的动画效果，确保提示流、工作状态等元素的移动和切换更加平滑。
    *   [链接](https://github.com/anomalyco/opencode/pull/57224)

7.  **PR #51384: fix(codemode): enumerate inherited keys...**
    *   **内容**：修复代码模式中的性能隐患，防止内存分配无界和递归深度失控导致的超时。
    *   [链接](https://github.com/anomalyco/opencode/pull/51384)

8.  **PR #51272: fix(schema): validate canonical base64**
    *   **内容**：优化 Base64 校验的正则表达式，避免回溯攻击，提升 Schema 验证的性能和安全性。
    *   [链接](https://github.com/anomalyco/opencode/pull/51272)

9.  **PR #51255: feat(cli): add session prune command**
    *   **内容**：在 v2 CLI 中添加了 `session prune` 命令，用于清理过期的会话数据，保持系统整洁。
    *   [链接](https://github.com/anomalyco/opencode/pull/51255)

10. **PR #51281: fix(core): recover worktree removal blocked by cached locations**
    *   **内容**：修复了 Windows 平台下因缓存位置导致的 Worktree 删除失败问题。
    *   [链接](https://github.com/anomalyco/opencode/pull/51281)

### 5. 功能需求趋势

*   **UI/UX 交互增强**：社区对桌面端的**文件树可视化**、**会话标签页管理**（Sidebar request）、以及**时间轴动画**有强烈需求，要求提升操作流畅度和信息展示效率。
*   **IDE/工具集成**：频繁出现关于 **Deep Links**（深链接）的讨论，期望能像 VS Code 一样支持外部任务管理器唤起编辑器会话。
*   **权限与协作**：**子代理权限管理**（Ask/Write 模式）和 **工作区锁定**（Workspace Lock）是核心需求，旨在防止 AI 误操作破坏文件系统或意外覆盖他人工作。

### 6. 开发者关注点

*   **免费额度信任危机**：这是当前最核心的痛点。无论是 IP 绕过漏洞、倒计时异常还是配额不重置，都严重打击了用户对免费服务的信任。
*   **插件生态稳定性**：本地插件的加载失败（Git 错误）和工具调用失败，限制了开发者的自定义能力。
*   **多会话冲突管理**：撤销操作影响整个工作树、子代理互相干扰等问题，反映出在多会话并发处理上的技术挑战。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-10-26  
**来源**: [pi-mono](https://github.com/badlogic/pi-mono)

---

## 1. 今日速览
过去24小时内，Pi 社区活跃度较高，共处理了 50 个 Issue 更新和 9 个 PR 合并。本周主要聚焦于 **MCP (Model Context Protocol)** 功能的增强与修复，包括 HTTP JSON 响应限制、OAuth 登录挂起问题以及原生 stdio 服务器的环境隔离配置。同时，针对 `llama.cpp` 集成中的上下文溢出检测、系统提示词导出缺失以及路径解析等底层问题进行了密集修复。

---

## 2. 版本发布
**无** 最新版本发布。

---

## 3. 社区热点 Issues

**1. [P0] Anthropic 工具引用错误：会话中途移除工具导致后续请求失败** [#11376](https://github.com/badlogic/pi-mono/issues/11376)
*   **重要性**: 极高
*   **详情**: 扩展在会话中途重新加载导致部分工具注销，后续对 `claude-opus-5-5` 的所有请求均返回 `tool_reference_unresolved` 错误。这是一个影响核心对话能力的严重 Bug。

**2. MCP OAuth 登录后挂起：连接状态卡死且无法取消** [#11311](https://github.com/badlogic/pi-mono/issues/11311)
*   **重要性**: 高
*   **详情**: 用户在 MCP 服务器登录成功后，界面仍显示“Connecting...”长达数分钟，且 `Ctrl+C` 无效。这严重影响了第三方服务的接入体验。

**3. Cache Warming "idle" 模式失效：自定义上下文消息导致事件不触发** [#10956](https://github.com/badlogic/pi-mono/issues/10956)
*   **重要性**: 中
*   **详情**: 开启 `cacheWarming: "idle"` 后，在会话结束且上下文包含自定义消息时，预热事件会静默停止。这导致缓存策略在特定场景下不可用。

**4. OSC 52 复制在 TUI 和 Tmux 中被吞没** [#10628](https://github.com/badlogic/pi-mono/issues/10628)
*   **重要性**: 中
*   **详情**: 在全屏 TUI 中，pi 内嵌于 tmux 时，`Ctrl+Shift+C` 复制的原始 OSC 52 序列被 tmux 截获并处理，导致无法正确粘贴到剪贴板。

**5. llama.cpp 上下文溢出未检测：自动压缩失效** [#10885](https://github.com/badlogic/pi-mono/issues/10885)
*   **重要性**: 中
*   **详情**: 当 llama.cpp 服务器的 KV 池满载时返回“Context size exceeded”错误，但 pi 未捕获此错误，导致自动压缩机制失效。

**6. MCP HTTP JSON 响应绕过 maxMessageBytes 限制** [#11335](https://github.com/badlogic/pi-mono/issues/11335)
*   **重要性**: 中
*   **详情**: 通过 HTTP 传输的 MCP JSON-RPC 响应（如 `tools/list`）能够超过消息字节限制，而 SSE 传输则被拦截。这可能导致服务端响应过大造成客户端崩溃。

**7. 紧凑化文件列表无限制增长** [#11297](https://github.com/badlogic/pi-mono/issues/11297)
*   **重要性**: 中
*   **详情**: 每次紧凑化操作都会追加文件列表，导致摘要文件体积随时间无限制膨胀，影响性能和日志可读性。

**8. OpenRouter 签名推理块被丢弃** [#9534](https://github.com/badlogic/pi-mono/issues/9534)
*   **重要性**: 中
*   **详情**: 通过 OpenRouter 使用 Claude 模型时，签名推理块被静默丢弃，可能影响对模型思维链的完整展示。

**9. `-e npm` 包缓存机制失效：无法更新** [#11375](https://github.com/badlogic/pi-mono/issues/11375)
*   **重要性**: 中
*   **详情**: 临时扩展安装模式 (`pi -e npm:<pkg>`) 错误地复用了缓存，导致即使指定了 `@latest` 也无法获取最新版本。

**10. 上下文窗口配置错误导致恢复后再次溢出** [#11387](https://github.com/badlogic/pi-mono/issues/11387)
*   **重要性**: 中
*   **详情**: 本地 vLLM 服务器的 `contextWindow` 配置值高于实际服务限制，导致每次恢复压缩后，上下文仍然超出服务器的硬限制。

---

## 4. 重要 PR 进展

**1. 修复 provider/id 包含斜杠时的模型引用解析** [#11393](https://github.com/badlogic/pi-mono/pull/11393)
*   **内容**: 修复了 `--model "<provider>/<model-id>"` 在 provider id 包含 `/`（如 URL 格式 `llama-server=http://...`）时解析失败的问题。

**2. 修复路径解析在 Windows 下的分隔符问题** [#11399](https://github.com/badlogic/pi-mono/pull/11399)
*   **内容**: 修正了 `check-entry-graphs` 脚本在 Windows 上使用 `path.relative()` 返回 `\` 而非 `/` 导致的模式匹配失败。

**3. 修复 pi.exec 在跨块 UTF-8 字符输出时的乱码** [#11330](https://github.com/badlogic/pi-mono/pull/11330)
*   **内容**: 为 stdout 和 stderr 引入独立的 `StringDecoder`，解决了当 UTF-8 字符跨数据块边界时显示乱码的问题。

**4. 修复会话选择时的 AbortError 崩溃** [#9879](https://github.com/badlogic/pi-mono/issues/9879) (Closed by PR #11396)
*   **内容**: 当 agent 目录是符号链接时，确保传递给 npm 的前缀是真实路径，修复了 npm lock 文件写入错误。

**5. 支持 Kimi Coding K3.1 Pro 模型** [#11355](https://github.com/badlogic/pi-mono/pull/11355)
*   **内容**: 通过解析 effort 元数据动态派生 K3 线路预设，支持 K3.1 Pro 及 K3.1 Pro Highspeed 的推理能力。

**6. 修复系统提示词在 HTML 导出中缺失** [#10718](https://github.com/badlogic/pi-mono/pull/10718)
*   **内容**: 修复了 `pi --export` 命令生成的 HTML 中缺少 `system` prompt 的问题，确保导出的会话记录完整性。

**7. 修复 HTTP Idle Timeout 被错误实现为总请求超时** [#11388](https://github.com/badlogic/pi-mono/issues/11388) (Closed by PR #11395)
*   **内容**: 修正了 `httpIdleTimeoutMs` 的实现逻辑，使其真正控制空闲超时而非总请求时间，并更新了测试脚本以清除所有环境变量。

**8. 修复本地路径包在启动列表中显示名称错误** [#11392](https://github.com/badlogic/pi-mono/issues/11392) (Closed by PR #11396)
*   **内容**: 修复了从本地路径安装的包在 `[Extensions]` 启动列表中显示目录名而非包名的问题。

**9. 添加源码学习路线与规范文档** [#11408](https://github.com/badlogic/pi-mono/pull/11408)
*   **内容**: 新增中文文档，为开发者提供源码学习路径和编码规范，旨在降低贡献门槛。

**10. 修复工具参数验证器对字符串化数组的类型转换** [#11389](https://github.com/badlogic/pi-mono/issues/11389) (Closed by PR #11397)
*   **内容**: 修复了 `validateToolArguments` 在处理小米 OpenAI 兼容端点时，无法将字符串化的 JSON 参数（如 `null`）自动转换为对象/数组的问题。

---

## 5. 功能需求趋势

*   **MCP (Model Context Protocol) 生态增强**: 社区对 MCP 的关注度显著上升。需求集中在 OAuth 认证流程的稳定性、HTTP 与 SSE 传输协议的一致性、以及原生 stdio 服务器的环境隔离能力。
*   **多模型适配与兼容性**: 针对本地部署模型（如 llama.cpp、vLLM）和特定云服务商（Kimi, OpenRouter）的兼容性修复是高频需求，特别是上下文窗口溢出检测和推理块丢失的问题。
*   **TUI 与终端交互优化**: 修复了 OSC 序列处理（如 OSC 52 复制）、Prompt 标记冲突以及全屏模式下的剪贴板行为，体现了对终端用户体验的精细化打磨。

---

## 6. 开发者关注点

*   **稳定性优先**: 开发者反馈了大量关于崩溃（AbortError）、状态挂起（OAuth 连接卡死）和数据丢失（复制时丢失正在输入的 Prompt）的严重 Bug。
*   **配置与路径解析**: 在跨平台（特别是 Windows）和特殊文件系统结构（符号链接）下的路径解析问题反复出现，是维护者需要重点解决的底层痛点。
*   **开发与贡献**: 出现了关于如何学习源码和贡献规范的文档需求，表明社区正在从使用阶段向贡献阶段过渡，需要更清晰的引导。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-10-26  
**数据来源**: GitHub.com/QwenLM/qwen-code

---

## 1. 今日速览

今日 Qwen Code 社区活跃度较高，**核心功能迭代**与**稳定性修复**并行推进。重点进展包括：Kubernetes 部署实验性支持落地、会话上下文管理优化、以及针对 CLI 和 Web Shell 的多项用户体验改进。同时，团队持续处理 CI/CD 流程中的超时与锁竞争问题，确保构建效率。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 社区热点 Issues

### 🚨 稳定性与性能 (3个)
1. **#13395** - Kubernetes tool runtime 进度与跨平台交付
   - **重要性**: 核心功能路线图，涉及跨平台交付的关键门禁。
   - **进展**: 正在处理 S1 修复与 CI 失败问题，状态为 in-progress。

2. **#15486** - 自动压缩后请求大小估算错误
   - **重要性**: 高优先级 P1 级别，可能导致上下文截断或 token 限制失效。
   - **影响**: 自动压缩与工具结果待处理时的计算溢出问题。

3. **#15552** - 保留目录快照可能覆盖去重机制
   - **重要性**: 核心架构层面的状态管理问题，影响用户输入去重。
   - **详情**: PR #14129 引入的机制存在竞态条件。

### 🐛 Bug 修复 (3个)
4. **#13492** - XML 工具调用恢复丢失外部调用
   - **重要性**: 影响复杂工具调用的正确性，已部分修复。

5. **#15567** - MCP 启动失败缺少 stderr 诊断
   - **重要性**: 影响开发者调试 MCP 服务器集成问题。

6. **#15499** - Managed runtime v0.26.1 发布被阻塞
   - **重要性**: 发布流程问题，导致 SDK 版本未能正常发布。

### 🎨 功能需求 (4个)
7. **#15545** - 上下文阈值触发交接继续机制
   - **重要性**: 优化长周期自主运行中的上下文质量。

8. **#15056** - 本地 `/autofix-pr` 命令
   - **重要性**: 提升开发者修复 CI 失败的自动化水平。

9. **#15247** - HTTP 后端外部 Runtime 提供商
   - **重要性**: 支持外部服务托管 Session 工具 Worker。

10. **#15513** - CLI 头部模式显示重试分类
    - **重要性**: 增强无交互模式下的可观测性。

---

## 4. 重要 PR 进展

1. **#15492** - 添加实验性 Kubernetes 部署
   - **内容**: Helm 一键安装 Managed Agent 控制平面及 MySQL，支持 LOCAL 执行模式。

2. **#15556** - 修复快照后钩子上下文去重
   - **内容**: 确保在内存目录快照后仍能正确识别已提交的用户提示。

3. **#15509** - ACP 共享代理循环
   - **内容**: 将 ACP 用户提示轮次移至共享代理循环，支持 `experimental.unifiedAgentLoop`。

4. **#15538** - PR 审查模型分流
   - **内容**: 按照优先级分流 PR 审查任务，使用独立模型。

5. **#15388** - 限制接管命令的轮次预算
   - **内容**: 防止 `/takeover` 命令无限循环，提供安全边界。

6. **#15030** - 提升工作区技能安装限制
   - **内容**: 分离传输限制与磁盘限制，支持更大的技能包。

7. **#15435** - Web Shell 展开显示工具参数
   - **内容**: 增强工具调用的可读性，显示详细参数与结果。

8. **#14237** - 跨项目 Todos 页面
   - **内容**: 整合所有会话的待办事项，提供多视图支持。

9. **#15441** - 持久化 ACP 转录嵌入资源
   - **内容**: 改进离线转录回放体验。

10. **#12585** - 支持精确版本更新
    - **内容**: 支持 `qwen update --target-version` 跳过 npm 发现流程。

---

## 5. 功能需求趋势

1. **跨平台与容器化部署** - Kubernetes 部署支持（#15492, #13395）。
2. **上下文与内存管理优化** - 自动压缩、交接机制、快照去重（#15545, #15552, #15486）。
3. **开发体验增强** - 本地自动修复、更好的 CLI 可观测性、Web Shell 交互改进（#15056, #15513, #14237）。
4. **外部集成与扩展** - MCP 支持、外部 Runtime 提供商（#15247, #15567）。

---

## 6. 开发者关注点

- **CI/CD 效率**: Maven 下载超时、锁竞争问题（#15499, #15465, #15546）。
- **测试稳定性**: Flaky 测试与并发场景下的断言失败（#14724, #15173, #15341）。
- **模型兼容性**: Anthropic 模型的 JSON 侧查询兼容性问题（#15542）。
- **文档与隐私**: 使用统计收集与隐私设置的明确化（#15554）。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报**
**日期**: 2026-10-26  
**数据来源**: github.com/Hmbown/DeepSeek-TUI (Codewhale)

---

### 1. 今日速览
过去24小时内，项目经历了**大规模的 Issue/PR 批量清理**，共关闭 **24 个 Issue** 和 **14 个 PR**。社区主要聚焦于 **v0.10.2 版本的后端修复**（如 `git commit-tree` 失败、Windows 安装问题、编码格式 CRLF/LF 修复）以及 **v0.10.3 的预览功能**（如跨作用域指令预算、技能描述截断优化、UI 本地化改进）。社区活跃度极高，开发者在 Boat VM 环境下完成了大量回归测试修复。

---

### 2. 版本发布
*   **无新 Release**：当前处于版本迭代过渡期，v0.10.2 已发布，v0.10.3 的修复正在通过 PR 合并中。

---

### 3. 社区热点 Issues (Top 10)

| Issue ID | 标题 | 状态 | 关键词 | 重要性分析 |
| :--- | :--- | :--- | :--- | :--- |
| #6978 | Turn snapshots fail with "git commit-tree failed" since 0.10.0 | CLOSED | Bug, Windows | **严重稳定性问题**：自 0.10.0 回滚至 0.10.1 后，Windows 用户的会话快照功能失效，导致核心数据持久化失败。 |
| #6976 | cargo install codewhale-cli --locked --force always installs 0.10.0 | CLOSED | Bug, Windows | **安装阻碍**：用户强制更新时无法安装最新的 0.10.1/0.10.2，严重影响版本升级体验。 |
| #7071 | zh-Hans locale: common TUI strings are hardcoded English | OPEN | Bug, Localization | **用户体验痛点**：简体中文环境下大量 UI 字符串（如 `/undo`, `/diff`, 审批选项）未翻译，影响中文用户使用。 |
| #7068 | Plan→Work handoff seeds a malformed To-do | OPEN | Bug, Workflow | **工作流 Bug**：从 Plan 模式切换到 Work 模式时，生成的 To-do 任务标题格式错误（Markdown 行被合并），导致任务无法完成。 |
| #7067 | codewhale review: Low-risk 4000-token cap starves reasoning models | OPEN | Bug, Context | **模型支持缺陷**：Review 功能的 Token 限制过低（4k），导致高推理强度的模型（DeepSeek High Effort）无法正常工作。 |
| #7049 | Composer: more room to edit pasted text before sending | CLOSED | UX, Enhancement | **输入体验优化**：用户在粘贴长文本后无法在发送前进行中间修改，急需增加编辑缓冲区。 |
| #7070 | write silently restores CRLF despite explicit LF request | CLOSED | Bug, Encoding | **编码兼容性**：尽管用户明确请求保存为 LF，但静默写入功能仍强制使用 CRLF，引发跨平台兼容问题。 |
| #7066 | skills: first-class control over bundled install, per-skill disable | OPEN | Enhancement, Config | **配置灵活性**：技能包安装缺乏细粒度控制，无法按需禁用或显式安装，限制了自定义配置能力。 |
| #7073 | skills: the ambient index caps descriptions at 400 chars | OPEN | Enhancement, Context | **上下文管理**：技能描述被硬编码截断在 400 字符，且无配置选项，可能导致 AI 丢失关键指令信息。 |
| #7088 | Professional Medical Billing Solutions Across California | CLOSED | Spam/Unrelated | **社区维护**：典型的垃圾/广告 Issue，社区迅速响应并关闭，保持了 Issue 列表的清洁。 |

---

### 4. 重要 PR 进展 (Top 10)

| PR ID | 标题 | 状态 | 类型 | 核心内容 |
| :--- | :--- | :--- | :--- | :--- |
| #7086 | feat(context): per-scope instruction budgets with visible truncation | OPEN | Feature | **功能增强**：实现按作用域（Project, Global, Rules）分配指令预算，并显示被截断的内容，解决指令过长导致的上下文溢出。 |
| #7081 | feat(config): optional knobs for the standing-instruction budget | CLOSED | Feature | **配置增强**：允许用户自定义“站立指令”的硬编码上限，提供更灵活的配置选项。 |
| #7075 | fix(skills): the ambient index caps descriptions at 400 chars | CLOSED | Bug Fix | **Bug 修复**：移除技能描述的 400 字符硬编码限制，确保完整指令传递给模型。 |
| #7078 | feat(tui): more room to edit pasted text before sending | CLOSED | Feature | **UX 优化**：大幅扩展 Composer 的编辑缓冲区，允许用户在发送前对粘贴的长文本进行修改。 |
| #7076 | fix(tui): write silently restores CRLF despite explicit LF request | CLOSED | Bug Fix | **Bug 修复**：修复文件写入时的编码不一致问题，严格遵循用户配置的换行符设置（LF/CRLF）。 |
| #7074 | feat(runtime): show a turn's cost and context while it runs | CLOSED | Feature | **透明度提升**：在 AI 运行过程中实时显示 Token 消耗和上下文大小，解决“长时间运行后突然跳变”带来的困惑。 |
| #7084 | feat(tui): consider Ctrl+C clearing a non-empty composer before exit | CLOSED | UX Feature | **交互优化**：改进 Ctrl+C 的行为，如果编辑器中有内容，先清除再退出，符合用户肌肉记忆。 |
| #7083 | feat(engine): soft model-facing context notice while auto-compaction | CLOSED | Feature | **上下文管理**：在自动压缩开启时，向模型提供软性的上下文压力信号，提升上下文处理的智能度。 |
| #7077 | fix(/balance): cannot be used for providers.deepseek | CLOSED | Bug Fix | **支付集成修复**：修复 DeepSeek 提供商无法使用 `/balance` 命令查询余额的问题。 |
| #7080 | CPU Usage Regression: v0.9.12 → v0.10.0 | CLOSED | Performance | **性能回归修复**：解决 v0.10.0 版本引入的 CPU 占用过高问题（Idle 状态下的重度占用）。 |

---

### 5. 功能需求趋势
从 Issue 数据分析，社区对以下三个方向的需求最为迫切：
1.  **配置与可控性**：用户不再满足于硬编码的限制，强烈要求对指令预算、技能包安装、技能描述长度进行可配置化调整（如 #6526, #7066, #7073）。
2.  **跨平台与本地化体验**：Windows 环境下的安装和编码问题，以及简体中文界面的完全本地化（#6976, #7071），是阻碍新用户的关键因素。
3.  **交互细节优化**：针对 Composer 编辑、Ctrl+C 行为、以及任务生成格式的精细化打磨（#7049, #7068），体现了用户对“手感”的高要求。

---

### 6. 开发者关注点
*   **Session 恢复与快照**：删除供应商后无法恢复历史会话 (#6996) 以及 Git 快照失败 (#6978)，直接威胁用户数据安全。
*   **Reasoning 模型支持**：DeepSeek 的 High Effort 模型在当前限制下被 4k Token 限制卡死 (#7067)，限制了高端模型的实际使用。
*   **环境隔离**：Composer 历史记录与 `CODEWHALE_HOME` 环境变量隔离失效 (#7069)，导致多环境配置混乱。

---

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*