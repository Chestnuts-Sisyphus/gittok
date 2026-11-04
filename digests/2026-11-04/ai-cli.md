# AI CLI 工具社区动态日报 2026-11-04

> 生成时间: 2026-11-04 00:16 UTC | 覆盖工具: 9 个

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

## Claude Code Skills 社区热点报告（截至 2026‑11‑04）

### 1️⃣ 热门 Skills 排行（评论/关注度最高的 5‑8 条 PR）

| # | Skill（PR） | 功能简述 | 社区讨论热点 | 当前状态 |
|---|------------|----------|--------------|----------|
| **#1742** | `fix(mcp-builder): support mcp≥2 streamable_http_client import and custom headers` | 为 MCP 2+ 兼容 `streamable_http_client`，并让用户可在 `create_mcp_http_client` 中自定义 HTTP 头部。 | - 兼容性回归导致旧 Skill 失效<br>- 需要在企业内部代理环境下安全注入自定义 Header | **OPEN** |
| **#1298** | `fix(skill-creator): isolate trigger evals and handle Windows and runtime failures` | 改进 `skill-creator`：触发评估独立运行、解决 Windows 子进程 select 失效、避免运行时错误被误判为“未触发”。 | - Windows 开发者报错频发<br>- 评估准确性（false‑miss）受到关注 | **OPEN** |
| **#1245** | `Add notion‑spec‑to‑implementation and quantitative‑resume‑auditor skills` | 将 Notion 规格页面自动拆解为可执行的实现任务；简历量化审计（评分、关键指标提取）。 | - 需求侧对 **需求→实现** 流程自动化兴趣浓厚<br>- 简历评估被 HR/招聘团队标记为高需求 | **OPEN** |
| **#1980** | `webapp‑testing: avoid shell=True in with_server.py` | 删除 `subprocess.Popen(..., shell=True)`，防止命令注入（CWE‑78），改为安全的参数列表调用。 | - 安全审计报告指出高危代码<br>- 期待官方尽快统一安全标准 | **OPEN** |
| **#1792** | `fix(docx): report LibreOffice timeout as an error and verify the output` | 当 LibreOffice 转换超时或生成的 DOCX 仍含修订标记时返回错误，提升文档生成可靠性。 | - 文档生成流水线的稳定性是企业用户关键痛点 | **OPEN** |
| **#1771** | `feat(skills): add proofcore‑contract‑auditor for smart contract notarization` | 静态分析 Solidity / Rust 合约，生成零存储 Merkle 证明并锚定至 TON 区块链。 | - Web3 社区对链上审计、零知证明需求激增<br>- 关注审计结果的可信度与成本 | **OPEN** |
| **#1734** | `Detect orphaned docx comments` | 检测并清除在 DOCX 中失去对应内容的孤立批注，防止文档审阅噪声。 | - 企业文档合规团队要求“无残留批注” | **OPEN** |
| **#1703** | `Add md2video‑audio skill` | 将 Markdown 直接渲染为 MP4 视频，内置真人语音配音，零成本生成教学/宣传视频。 | - 内容创作者希望“一键”生成教学视频<br>- 对渲染质量与配音自然度的讨论活跃 | **OPEN** |

> **注**：列表依据 PR 在 “热门 Pull Requests（按评论数排序）” 中的排名，均为 **OPEN**（尚未合并）且在社区中被频繁提及或点赞。

---

### 2️⃣ 社区需求趋势（从 Issues 中提炼的热点方向）

| 方向 | 代表 Issue | 关键诉求 |
|------|------------|----------|
| **安全 & 信任边界** | #492 – “Community skills distributed under anthropic/ namespace enable trust boundary abuse” | 防止社区 Skill 冒充官方；需要命名空间或签名机制。 |
| **组织内部 Skill 共享** | #228 – “Enable org‑wide skill sharing in Claude.ai” | 直连组织库、共享链接或统一目录，降低手动分发成本。 |
| **Skill 触发可靠性** | #556 – “run_eval.py: claude -p never triggers skills/commands” | 评估框架无法触发 Skill，影响 CI/CD 与基准测试。 |
| **上下文/令牌效率** | #1487 – “claude‑api skill eagerly injects ~156k tokens” | 大量 Token 注入导致上下文窗口耗尽，需要增量或懒加载方案。 |
| **持久记忆/状态压缩** | #1329 – “compact‑memory (symbolic notation for compact agent state)” | 长期运行的 Agent 需要紧凑的记忆表示，降低上下文成本。 |
| **Skill 描述一致性 & 重复** | #189 – “document‑skills and example‑skills plugins install identical content” | 防止插件重复注册同一 Skill，保持技能库清晰。 |
| **可视化安全** | #1394 – “skill‑creator: eval‑viewer XSS” | 评审页面存在 XSS 漏洞，需要安全的 HTML 渲染。 |
| **治理 & 质量门控** | #1385 – “Reasoning Quality Gate Pipeline” | 期待在 Skill 层面加入多阶段质量检查（校准 → 对抗审查 → 验证）。 |

**整体趋势**：**安全/信任、协作共享、触发可靠性以及上下文/记忆效率** 是社区最迫切的需求。

---

### 3️⃣ 高潜力待合并 Skills（评论活跃、问题关联度高，预计近期落地）

| PR | 关键价值 | 与 Issue 的关联 |
|----|----------|------------------|
| **#1742** (mcp‑builder) | 解决新版 MCP 与现有 Skill 的兼容性，是企业内部代理调用的基础设施。 | 与 #1390（MCP evaluation 错误）形成呼应。 |
| **#1298** (skill‑creator) | 提升跨平台（Windows）和运行时的评估可靠性，直接缓解 #556 中的触发失败。 | 直接对应 #556。 |
| **#1245** (notion‑spec‑to‑implementation) | 自动化需求到实现的闭环，对产品团队和招聘团队都有强需求。 | 与 #1329（compact‑memory）等“工作流自动化”需求相辅。 |
| **#1980** (webapp‑testing) | 移除 `shell=True`，显著提升安全基线，社区安全议题的热点。 | 与 #492、#1394 等安全议题形成统一方向。 |
| **#1792** (docx) | 增强文档生成可靠性，解决企业合规审计痛点。 | 与 #2018、#1734 等文档质量相关 Issue 形成生态链。 |
| **#1771** (proofcore‑contract‑auditor) | 为 Web3 开发者提供链上审计，填补智能合约安全 Skill 空白。 | 与整体 “安全/审计”需求相呼应。 |
| **#1703** (md2video‑audio) | 一键生成视频的创新工作流，满足内容创作和培训场景。 | 与 #1385（质量门控）等内容生成质量提升议题相契合。 |

> **预估时间**：基于目前的活跃评论与 Issue 关联，这些 PR 在 1‑2 个月内完成审查、合并的概率较高。

---

### 4️⃣ Skills 生态洞察（一句话总结）

> **社区当前最集中的诉求是：提升 Skills 的安全可信、跨平台可靠性，并通过自动化工作流（文档、代码、合约、媒体）降低上下文消耗与人为错误。**

--- 

*所有链接均指向对应的 GitHub PR/Issue，便于进一步跟踪讨论与进度。*

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
**日期**: 2026-11-04
**来源**: github.com/github/copilot-cli

---

## 1. 今日速览
GitHub Copilot CLI 今日发布了 **v1.0.106-7** 版本，主要增强了 Kitty 终端渲染能力并新增了 `/code` 命令与统一设置面板。与此同时，社区活跃度持续高涨，关于 **ACP (Agent Client Protocol) 模式**下的兼容性问题、**企业版沙箱权限**以及 **Skills 配置**的反馈最为集中，显示出社区在深度定制与安全合规方面的探索需求。

---

## 2. 版本发布
**v1.0.106-7** (2026-11-03 更新)

*   **新增功能**:
    *   **Kitty 终端增强**: Rex 终端现在支持使用 Kitty direct placements 直接渲染内联图片。
    *   **VS Code 集成**: 新增 `/code` 命令，可直接在当前会话中打开 VS Code。
    *   **统一配置面板**: 新增 `/settings` 命令，提供跨所有用户的统一仪表盘及全局搜索功能。
*   **改进优化**:
    *   **浏览器插件升级**: 内置 `browser-use` 插件升级至 0.1.0，改善了集成行为。
    *   **交互式反馈**: CLI 报告现在支持在终端中显示程序状态，并在需要用户关注时提供明确反馈。
    *   **MCP 内容过滤**: 修复了仅发送给用户的 MCP 内容可能被意外发送的问题。
*   **修复**:
    *   修复了在 ACP 模式 (`--acp`) 下 `includeCoAuthoredBy: false` 配置被忽略的问题。

---

## 3. 社区热点 Issues (Top 10)

| ID | 标题 | 类型/状态 | 关注点 |
| :--- | :--- | :--- | :--- |
| #4438 | `disable-model-invocation: true` 导致 Skill 不可达 | [OPEN] 功能缺陷 | **Skill 机制**：开启该配置后 Skill 依然会被模型调用，且显式调用报错 "Skill not found"，严重阻碍自定义 Skill 的使用。 |
| #5105 | macOS 沙箱阻止 Gradle daemon 连接 | [CLOSED] Bug | **企业级权限**：即使配置了本地网络允许，macOS 沙箱仍阻断 Gradle 守护进程连接，导致 CLI 在企业环境中无法正常执行构建任务。 |
| #1148 | 编辑文件时 CRLF/LF 转换问题 | [CLOSED] Bug | **平台兼容性**：Copilot CLI 强制将所有文件转换为 CRLF，破坏了原本使用 LF 的项目（如 vcpkg），严重影响跨平台协作。 |
| #1257 | Termux/Android 支持请求 | [OPEN] Feature | **移动端支持**：用户希望在 Android 设备上通过 Termux 运行 Copilot，目前因 `pty.node` 原生模块加载失败受阻。 |
| #5109 | Enterprise 模式下 CLI 不可用 | [OPEN] Bug | **企业部署**：Managed account policy 刷新失败，导致 CLI 在企业环境中反复提示重试，严重影响日常使用。 |
| #5115 | ACP 模式下 `/rename` 命令无效 | [CLOSED] Bug | **ACP 协议**：ACP 客户端收到成功响应但会话未重命名，且响应时间极短（1ms），表明模型未参与处理。 |
| #5171 | Windows 下 NumLock 关闭时导航失效 | [OPEN] Bug | **交互体验**：NumLock 关闭时方向键和删除键在终端中失效，属于回归问题，严重影响无键盘鼠标操作。 |
| #3889 | ACP 模式不支持 stdio transport | [OPEN] Bug | **协议兼容性**：ACP 协议要求支持 stdio transport，但 Copilot CLI 拒绝加载此类服务器，限制了与外部工具的集成。 |
| #5130 | "Managed account policy" 错误提示 | [OPEN] Bug | **用户体验**：该错误消息自 v1.0.94 起持续出现，干扰用户工作流，且日志级别过低难以排查。 |
| #5133 | ACP 模式忽略 `includeCoAuthoredBy` 配置 | [CLOSED] Bug | **ACP 配置**：ACP 模式下提交信息强制添加 Co-authored-by trailer，与普通模式行为不一致。 |

---

## 4. 重要 PR 进展 (Top 10)

| ID | 标题 | 状态 | 内容概要 |
| :--- | :--- | :--- | :--- |
| #5339 | **Feature** 添加只读 Agent 监控 TUI (Graph + Timeline) | [OPEN] | 开发了一个独立的 `tools/agent-monitor` 终端查看器，旨在可视化展示 Agent 的调用关系、等待链路和工具执行详情。 |
| #5348 | **Feature** 在 ask_user 中支持图片粘贴 | [OPEN] | 请求允许用户在 `ask_user` 对话框中粘贴截图，目前只能在普通聊天中粘贴，限制了 UI 交互的丰富性。 |
| #5345 | **Bug** 修复 background agent 失败后 `read_agent` 返回空 | [OPEN] | 修复了后台 Agent 失败或会话恢复后，`read_agent` 仅返回错误信息而不返回历史消息或命令的 bug。 |
| #5346 | **Bug** Managed settings 端点返回 422 错误 | [OPEN] | 自 11月3日起，Managed settings 轮询持续返回 422 验证失败，疑似为服务器端回归。 |
| #5347 | **Bug** Connectors 加载失败警告 | [OPEN] | 交互模式下持续打印 "Connected Connectors could not be loaded" 警告，但在 headless 模式下成功。 |
| #5342 | **Bug** Managed settings fetch 返回 "Expected string, received object" | [OPEN] | 企业账号下 CLI 启动时反复提示策略刷新失败，日志显示模型字段类型不匹配。 |
| #5337 | **Bug** MCP OAuth 资源路径尾部斜杠问题 | [CLOSED] | 修复了远程 HTTP MCP 服务器 OAuth 认证时，请求 URL 带斜杠而元数据不带斜杠导致的授权失败。 |
| #5293 | **Bug** ACP 模式下 bash shell 导致客户端假死 | [CLOSED] | 修复了 ACP 模式下，Agent 启动异步 shell 后，客户端 `session/prompt` 响应被阻塞直到 shell 退出的问题。 |
| #5268 | **Bug** ACP 模式下 session 删除/清理失败 | [CLOSED] | 修复了 ACP 客户端调用 `/session delete` 等命令时收到空响应的问题。 |
| #5269 | **Bug** ACP 模式下插件 Skills 不可用 | [CLOSED] | 修复了插件加载了 Agent 但其 Skills 未在 `available_commands_update` 中广播的问题。 |

---

## 5. 功能需求趋势

基于过去24小时的 Issue 分析，社区关注点主要集中在以下三个维度：

1.  **ACP (Agent Client Protocol) 协议深度集成**:
    *   社区正在大量探索 ACP 模式的边界。从 Issues #5115, #5293, #5268, #5269 可以看出，用户不仅在尝试使用 ACP，还在发现其与 stdio transport、Session 管理、以及 Plugin Skills 集成时的兼容性问题。这表明 ACP 正从实验性功能向核心生产工具演进。
2.  **企业级安全与权限控制**:
    *   #5105, #5109, #5285, #5346 等问题集中在 macOS 沙箱、Windows 企业策略以及 Managed Account Policy 上。这显示用户群体中企业级用户比例增加，他们对 CLI 在受控环境下的网络访问和权限管理有较高要求。
3.  **跨平台与移动端支持**:
    *   #1257 (Termux) 和 #1148 (CRLF/LF) 显示，Copilot CLI 正面临更广泛的操作系统兼容性挑战。开发者希望在不同环境（WSL, Windows Terminal, Android Termux）下保持一致的体验。

---

## 6. 开发者关注点

*   **配置一致性**: 开发者最痛恨的是配置在不同模式（Interactive vs ACP）下表现不一致，例如 `includeCoAuthoredBy` 在 ACP 中被忽略 (#5133)。
*   **调试困难**: 在 ACP 模式下，如果 Agent 出现问题，开发者往往只能看到空响应或极短的结束信号，缺乏详细的调试信息 (#5115, #5293)。
*   **终端渲染体验**: Windows 下的 NumLock 问题 (#5171) 以及 Markdown 表格渲染 (#2826) 影响了在 Windows Terminal 中的实际操作流畅度。
*   **Agent 可观测性**: #5339 PR 和 #5345 Issue 提示，随着 Agent 变得越来越复杂，开发者迫切需要一个可视化的界面来监控 Agent 的内部状态和执行链路。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-11-04  
**来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
今日社区活跃度较高，主要围绕 **OpenCode v2.2.x 的稳定性与模型架构重构** 展开讨论。高频问题集中在 **免费层额度异常**、**MCP 工具权限管理** 以及 **2.0 版本的 UI/UX 改进** 上。开发侧，AI 模块正在进行大规模重构，试图用单一 `Model` 类替代原有的 7 个模型类，同时新增了桌面端语音功能支持。

---

## 2. 版本发布
**暂无新版本发布**。
*注：社区讨论多集中在 v2.2.5 版本，目前处于 Bug 修复与功能完善阶段。*

---

## 3. 社区热点 Issues

### 🔥 高优先级/高频
1. **#59387: 免费层使用超限与重置异常** (246 👍)
   *   **重要性**: 涉及核心免费服务的稳定性，影响大量用户。
   *   **反馈**: 用户报告重置时间不生效，额度耗尽后无法正常恢复。这是过去 24 小时内热度最高的 Issue。

2. **#48882: 恢复遗留 UI 风格** (40 👍)
   *   **重要性**: 2.0 版本 Sidebar 重构导致布局变化，大量用户不适应。
   *   **反馈**: 请求将经典双面板布局（持久左侧边栏 + 会话面板）作为可选功能保留。

3. **#60250: v2.2.1 计划模式失效** (13 👍)
   *   **重要性**: 核心功能 Bug，Plan Agent 本应只分析不执行，却直接开始改代码。
   *   **反馈**: 用户在切换到 Plan Agent 时，模型行为不符合预期，直接开始实施修复而非规划。

4. **#51504: MCP 工具权限规则静默降级** (5 👍)
   *   **重要性**: 安全性相关 Bug，`effect: "ask"` 规则未弹出确认框，直接执行工具。
   *   **反馈**: 权限控制机制失效，可能导致用户误操作。

5. **#61481: Windows 11 模型列表完全为空** (5 👍)
   *   **重要性**: 关键 UI 功能缺失，影响模型选择。
   *   **反馈**: 设置中模型已开启，但在聊天界面无法找到模型列表，持续出现 503 错误。

### 其他重要 Issue
6. **#43179: V2 版本切换 Agent 后模型未变** (7 👍) - 指出切换主 Agent 后，会话仍沿用旧模型。
7. **#61507: TUI 恢复会话时忽略 --model 参数** (3 👍) - 命令行指定模型无效。
8. **#61523: OpenAI 兼容流解析错误** (3 👍) - 某些模型流式响应格式不兼容导致会话中断。
9. **#53019: 插件缺乏文本转换钩子** (12 👍) - 请求允许插件在助手回复展示前或完成后进行文本处理。
10. **#61310: 请求被重复处理** (2 👍) - 用户反馈 API 请求被双重执行，导致计费翻倍。

---

## 4. 重要 PR 进展

1. **#61528: 修复 MCP 服务器指令可见性** (新增)
   *   **内容**: 修复了通过客户端 MCP Socket 附加的服务器的指令在 Agent 端不可见的问题。

2. **#61522: 发布流程自动化** (新增)
   *   **内容**: 将 `dev` 分支合并至 `production`，包含从 AWS ECS 迁移至 Cloudflare Workflow 的统计同步更新。

3. **#61527: 为插件 UI 添加设置组件** (新增)
   *   **内容**: 向 `ctx.ui` 添加了 `settings-row`、`select` 和 `menu-row`，允许第三方插件原生构建设置界面。

4. **#60880: 重构基准测试** (新增)
   *   **内容**: 使用 [strobe](https://github.com/Hona/strobe) 工具统一了所有基准测试，大幅减少了样板代码（净减少 1 万行代码）。

5. **#61185: MCP 连接池优化** (新增)
   *   **内容**: 实现跨位置的 MCP 连接共享，解决了多目录场景下连接数爆炸的问题，提升了性能。

6. **#61492 - #61501: AI 模块架构重构** (系列 PR)
   *   **内容**: 一系列 PR 正在将 7 个独立的模型类替换为一个自描述的 `Model` 类。这将极大简化模型配置、能力声明和 API 兼容性处理。

7. **#61491: TUI 显示活跃技能** (新增)
   *   **内容**: 在会话侧边栏新增 `Active Skills` 面板，仅显示当前对话中已激活的技能。

8. **#61526: 修复 Goal Reviewer 循环** (新增)
   *   **内容**: 修复了使用弱模型作为 Reviewer 时，任务完成后仍可能无限循环的问题。

9. **#61478: 德语本地化完成** (新增)
   *   **内容**: 完成了德语翻译字典的填充工作。

10. **#61514 & #61520: 链接可点击性修复** (已关闭)
    *   **内容**: 修复了 TUI 和 App UI 中问题、MCP 提示及错误信息中的 URL 无法点击的问题。

---

## 5. 功能需求趋势

1. **遗留 UI 回归**: 社区对 OpenCode 2.0 的大面积 UI 改动（特别是侧边栏）存在强烈抵触，要求保留旧版布局。
2. **IDE 深度集成**: 多个 Issue 提及希望 AI 看起来像独立的开发者（Issue #54670），这暗示了对 IDE 内部身份归属和集成深度的需求。
3. **权限与安全**: `effect: "ask"` 机制的失效以及 MCP 工具的静默执行，反映了社区对 AI 自主执行力的安全担忧。
4. **桌面端体验**: 语音功能的加入以及 UI 细节（链接点击、设置面板）的完善，显示出向桌面原生体验优化的趋势。

---

## 6. 开发者关注点

*   **稳定性优先**: 目前社区情绪偏向于修复 Bug，特别是涉及计费、权限和关键功能（如 Plan Agent、Session Compaction）的异常。
*   **配置复杂度**: 随着新模型和 MCP 协议的加入，配置文件和连接管理变得复杂，开发者急需更清晰的文档和更友好的 UI 指引。
*   **多环境兼容**: Linux 下的 OAuth 回调超时问题以及 Windows 下的模型列表加载失败，提示跨平台兼容性仍是挑战。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-04  
**仓库**: [badlogic/pi-mono](https://github.com/badlogic/pi-mono)  
**分析者**: AI 开发工具技术分析师

---

## 1. 今日速览
Pi 项目在 11 月 3 日迎来了密集的修复与开发活动，主要解决了 **RPC 模式下的会话管理、TUI 渲染中的 HTML 注释泄露、以及编码工具中的内存与边界问题**。同时，社区对 **Modular AI 提供商的集成**表达了强烈兴趣。整体上，项目正处于稳定期（v1.5.0 之后），重点转向边缘场景的健壮性和跨平台兼容性优化。

---

## 2. 版本发布
**无** - 仓库在过去 24 小时内未发布新版本。

---

## 3. 社区热点 Issues

### 🔴 高优先级 / 影响范围广
1. **[OPEN] #10256**: `0.99.x` 版本终端颜色查询泄露至提示符且 BEL 键打开外部编辑器
   *   **重要性**: 影响所有使用 mintty/ConPTY 的 Windows 用户，导致提示符污染。
   *   **社区反应**: 22 个评论，4 个赞。涉及主题渲染和终端配置问题。

2. **[OPEN] #9656**: Windows + Zellij 全屏模式下鼠标滚轮滚动提示符历史而非对话记录
   *   **重要性**: 在多路复用器（Multiplexer）环境下的交互体验严重受损。
   *   **社区反应**: 13 个评论，5 个赞。Linux 下 tmux 正常，问题特定于 Windows 原生终端路径。

3. **[OPEN] #10605**: ChatGPT/OpenAI OAuth 403 错误 (用户不符合订阅共享资格)
   *   **重要性**: 直接阻断 API 认证流程，影响 Plus 用户的日常使用。
   *   **社区反应**: 12 个评论。

### 🔵 中优先级 / 功能体验
4. **[OPEN] #11021**: OpenAI 认证下 GPT-6.1 Sol 模型上下文窗口显示为 272K 而非 500K
   *   **重要性**: 影响模型压缩预算的计算准确性。
   *   **社区反应**: 7 个评论，7 个赞。

5. **[OPEN] #9262**: `find` 工具在 Windows 路径分隔符下静默失败
   *   **重要性**: 工具链在 Windows 环境下的可用性问题。
   *   **社区反应**: 6 个评论。

6. **[OPEN] #11547**: 请求将 Modular 作为内置提供商
   *   **重要性**: 社区对托管推理服务（Modular Cloud）集成的迫切需求。
   *   **社区反应**: 2 个评论。

### 🟢 修复确认 / 状态
7. **[CLOSED] #11693**: PI_STARTUP_BENCHMARK 不清理会话运行时
8. **[CLOSED] #11703**: 预发布版本下扩展更新日志重复显示
9. **[CLOSED] #11708**: Codex SSE 重试机制遗留 Abort 监听器
10. **[CLOSED] #11731**: codemode 超时计时器在等待确认对话框时不停

---

## 4. 重要 PR 进展

### 🔧 核心工具链修复
11. **#11751**: **fix(coding-agent): edit preserves untouched bytes**
    *   **内容**: 修复编辑工具在替换文本时意外修改行尾符和编码的问题。
12. **#11750**: **fix(coding-agent): stream the read tool instead of loading whole files**
    *   **内容**: `read` 工具改为流式读取，避免大文件（如 200MB 日志）导致内存爆炸。
13. **#11747**: **fix(coding-agent): find and ls limit edge cases**
    *   **内容**: 修复 `limit` 参数为 0 或负数时的逻辑错误。
14. **#11757**: **fix(coding-agent): do not split surrogate pairs when truncating text**
    *   **内容**: 修复在截断文本时破坏 Emoji 等代理对字符的 UTF-8/UTF-16 问题。

### 🎨 UI 与渲染优化
15. **#11755**: **fix(tui): hide HTML comments in Markdown rendering**
    *   **内容**: 彻底修复 TUI Markdown 组件打印 `<!-- ... -->` 注释的问题，现已合并。
16. **#11756**: **feat(coding-agent): let Markdown transformers opt into more surfaces**
    *   **内容**: 允许 Markdown 转换器应用于更多界面（如技能块、压缩摘要），提升扩展性。

### 🌐 通信与协议
17. **#11749**: **fix(mcp): apply maxMessageBytes to Streamable HTTP JSON responses**
    *   **内容**: 修复 MCP 协议中 JSON 响应未校验消息大小限制的安全隐患。
18. **#11735**: **fix(mcp): cancel SSE response streams that fail the message-size limit**
    *   **内容**: 修复 SSE 流超限后未正确取消 HTTP 连接导致资源泄漏的问题。

### 📦 构建与基础设施
19. **#11726**: **fix(schema): apply a relative root $id only once when resolving references**
    *   **内容**: 修复 JSON Schema 解析器在处理相对 `$id` 时的重复解析 Bug。
20. **#11685**: **fix(nix): pack pi-schema from the checkout in the Nix package**
    *   **内容**: 修复 Nix 打包构建失败的问题，确保内部依赖 `pi-schema` 被正确打包。

---

## 5. 功能需求趋势

1.  **多路复用器兼容性**: 
    *   随着开发者转向 Zellij 等现代终端复用器，**Windows + Zellij** 的兼容性成为高频痛点。
2.  **内存与性能优化**: 
    *   **大文件流式处理**（如 #11750）和 **上下文压缩**（#11021）是当前性能优化的核心方向。
3.  **模型提供商扩展**: 
    *   社区对 **Modular AI** 和 **Concentrate** 等新提供者的集成呼声很高，表明用户希望接入更多兼容 OpenAI 格式的第三方模型。
4.  **安全性校验**: 
    *   **消息大小限制**（maxMessageBytes）的校验正在被强化，防止恶意或超大的响应导致服务崩溃或内存溢出。

---

## 6. 开发者关注点

*   **Windows 终端生态**: 
    *   开发者反馈主要集中在 Windows 下的特定行为（mintty、ConPTY、Zellij），Linux/Unix 环境下的体验相对良好。
*   **RPC 模式稳定性**: 
    *   关于 `ctx.shutdown()` 和 `session_start` 事件触发的 Bug 反复出现，说明异步关闭和状态管理的复杂性是开发难点。
*   **工具链健壮性**: 
    *   `edit`、`find`、`read` 等核心工具在处理边缘情况（如特殊字符、零限制、大文件）时仍需加强鲁棒性测试。
*   **配置与同步**: 
    *   用户希望减少配置文件的冗余同步工作（如 `lastChangelogVersion` 的移动）。

---
*数据截止时间: 2026-11-04*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-11-04  
**来源**: [GitHub QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 1. 今日速览
- **CI 流水线面临严峻挑战**：`Managed Agent` 和 `E2E Tests` 流水线出现大量失败（如 Issue #14724, #15173），主要涉及测试识别、并发控制及 Docker 沙箱超时问题，导致开发效率受影响。
- **性能与资源优化成为焦点**：社区高度关注 Managed Runtime 的内存占用问题（Issue #16234），以及 GitHub Token 速率限制导致 CI 阻塞的问题（Issue #16188）。
- **安全与集成功能持续迭代**：针对 Windows 平台的杀毒误报（#16249）、IDE 集成文档补充（#16233）以及权限系统完善（#15775）均有活跃讨论。

---

## 2. 版本发布
**无最新发布**。当前开发分支 (`main`) 仍处于活跃修复阶段，前序版本 0.26.x 仍有相关构建失败问题（如 #16039, #16162）。

---

## 3. 社区热点 Issues (Top 10)

| Issue # | 标题 | 重要性 | 摘要与影响 |
| :--- | :--- | :--- | :--- |
| **#14724** | Main CI failed: Managed Agent gate — no test identified | 🔴 **高** | **严重阻塞**：CI 流水线持续失败，导致 PR 无法通过自动测试，涉及 Managed Agent 的核心功能。 |
| **#15173** | Main CI failed: E2E Tests — no test identified | 🔴 **高** | **严重阻塞**：端到端测试失败，影响用户对核心交互流程的信心，主要涉及 sandbox:docker 环境。 |
| **#16234** | perf(managed-agent): Managed Runtime worker idles at 91 MiB | 🟡 **中** | **资源浪费**：Managed Runtime Worker 即使空闲也占用约 91 MiB 内存（vs Node 的 7.7 MiB），影响大规模部署成本。 |
| **#16188** | ci: bot workflow burst exhausts GITHUB_TOKEN rate limit | 🟡 **中** | **CI 阻塞**：自动修复和审查机器人过度消耗 Token，导致无关的 CI 任务因速率限制失败。 |
| **#16214** | ci: E2E "sandbox:docker" leg hits its 60-minute cap | 🟡 **中** | **稳定性**：Docker 沙箱构建耗时过长，频繁触发超时导致测试取消，是 E2E 测试不稳定的主因。 |
| **#14746** | [Security] Project hooks run without approval | 🔴 **高** | **安全漏洞**：克隆仓库中的 hooks 在默认设置下无需信任确认即可运行，存在潜在风险。 |
| **#16249** | Windows Bitdefender detects Gen:Variant.Barys.381847 | 🟡 **中** | **分发问题**：Windows 官方驱动安装包被杀毒软件误报为病毒，影响用户体验和下载率。 |
| **#16227** | GitHub channel can silently skip a comment at boundary | 🟡 **中** | **集成 Bug**：GitHub 机器人可能因时间戳边界问题永久遗漏用户评论，导致上下文丢失。 |
| **#16207** | durable scheduled tasks silently die after daemon restart | 🟡 **中** | **可靠性**：持久化任务在守护进程重启后因会话丢失而静默失败，缺乏错误捕获和恢复机制。 |
| **#16244** | Qwen2-VL treated as text-only when catalog has no entry | 🟡 **中** | **模型支持**：新模型家族在目录缺失时被错误识别为纯文本模型，影响多模态能力。 |

---

## 4. 重要 PR 进展 (Top 10)

| PR # | 标题 | 状态 | 摘要与影响 |
| :--- | :--- | :--- | :--- |
| **#16254** | test(integration): keep ACP parity runtime state out of workspace | 🟡 **中** | **测试修复**：将 ACP 代理状态隔离在临时目录，防止污染测试工作区，提升测试隔离性。 |
| **#16231** | fix(channels): scope the poll cursor file to the workspace | 🟡 **中** | **集成修复**：将 GitHub/GitLab 等频道轮询游标文件移至工作区私有目录，防止多工作区冲突。 |
| **#15775** | fix(permissions): surface malformed rules to operators | 🟢 **低** | **权限系统**：让配置错误的权限规则在 UI 中显式标记为“无效”，便于用户排查配置问题。 |
| **#16239** | feat(web-shell): collapse channel editor tuning behind advanced settings | 🟢 **低** | **UI 优化**：简化 Web Shell 频道编辑器界面，将不常用的调优项隐藏在高级设置中。 |
| **#16200** | fix(web-shell): close managed host integration gaps left by host mount entry | 🟢 **低** | **功能修复**：修复托管主机挂载后未正确处理后端地址缺失的边界情况。 |
| **#16225** | perf(managed-agent): take session commands off the tenant lock | 🟢 **低** | **性能优化**：将部分会话命令操作从租户锁中移除，减少并发竞争，提升多会话性能。 |
| **#16224** | test(integration): give the ACP parity rig a scratch runtime directory | 🟢 **低** | **测试修复**：确保 ACP 代理循环测试使用独立的运行时目录，避免状态污染。 |
| **#16241** | fix(serve): read PR sidecars directly for the bindings snapshot | 🟢 **低** | **后端修复**：优化守护进程对 PR 绑定的查找逻辑，直接读取 sidecar 文件而非分页列表。 |
| **#16216** | refactor(managed-agent): narrow EmbeddedRuntimeBroker to SessionQueryStore | 🟢 **低** | **代码重构**：简化嵌入式运行时代理的数据依赖，使其仅依赖会话查询存储。 |
| **#16116** | fix(managed-agent): prove A3 rewritten command recovery without Hook rerun | 🟢 **低** | **逻辑修复**：完善 Hook 重写命令的恢复逻辑，确保被 Hook 修改的命令被视为新步骤而非继承旧权限。 |

---

## 5. 功能需求趋势

1. **IDE 集成与体验优化**
   - 社区持续关注 Web Shell 的 UI 交互细节（如频道编辑器简化、加载短语自定义）。
   - 请求补充第三方 IDE 集成文档（如 **Bellows**），显示对跨平台桌面应用的友好度提升。

2. **性能与资源管理**
   - **内存优化**：高频反馈 Managed Runtime 的内存占用过高（#16234），是当前最热门的性能话题。
   - **并发与锁优化**：PR #16225 展示了开发者对减少锁竞争、提升多会话并发的关注。

3. **模型与多模态支持**
   - 关注点集中在 **Qwen2-VL** 等视觉语言模型在目录缺失时的回退行为（#16244）。
   - 对 **OpenRouter** 和 **Anthropic** 模型的上下文窗口和工具调用支持仍有待完善。

---

## 6. 开发者关注点

- **CI/CD 稳定性**：`E2E Tests` 和 `Managed Agent` 流水线频繁失败是开发者的主要痛点，特别是 Docker 沙箱超时（#16214）和测试识别问题（#14724）。
- **错误反馈机制**：多起 Issue 指出系统在失败时缺乏清晰的警告或日志（如 #16207, #16227），导致问题排查困难。
- **安全与权限**：默认设置下的安全漏洞（#14746）和权限规则的可视化问题（#15775）是社区关注的安全热点。
- **第三方工具兼容**：开发者希望获得更完善的集成指南，以便在 VS Code、JetBrains、Zed 和 Bellows 等工具中顺畅使用 Qwen Code。

---

**数据截止时间**: 2026-11-04  
**链接**: [GitHub QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 – 2026‑11‑04  

---

## 1️⃣ 今日速览
- 本日社区活动异常活跃，**15 条 PR**、**6 条 Issue**在过去 24 小时内更新，重点集中在 TUI 渲染细节、工作空间管理以及自定义 provider 的兼容性问题。  
- 多项关键 UI 修复（如命令面板草稿保留、数学公式渲染、路径解析）已通过 PR 合并，显著提升了终端交互体验。  

---

## 2️⃣ 版本发布  
> **暂无新 Release**（过去 24 小时内未发现 Tag）。

---

## 3️⃣ 社区热点 Issues（共 6 条，全部列出）

| 编号 | 标题 & 关键标签 | 重要性说明 | 社区热度（评论数） | 链接 |
|------|----------------|------------|-------------------|------|
| #5316 | **EPIC‑005：CodeWhale TUI Crate Decomposition** (cleanup, tui, tracking) | 关联 CodeWhale 项目的大型重构计划，决定 TUI 代码库的模块化与可维护性。 | 35 条评论 | https://github.com/codewhale-hq/Codewhale/issues/5316 |
| #5915 | **Fleet models: save‑in‑role from the workers view** (enhancement, subagents, ux, providers) | 关注模型角色持久化与运维视图的交互细节，直接影响多模型编排体验。 | 4 条评论 | https://github.com/codewhale-hq/Codewhale/issues/5915 |
| #7179 | **[BUG] Custom openai‑compatible provider: output budget clamped** (bug, needs‑triage) | 关键兼容性缺陷：自定义 OpenAI 兼容服务在大模型（qwen3.8‑27b）上被错误截断，导致推理中断。 | 2 条评论 | https://github.com/codewhale-hq/Codewhale/issues/7179 |
| #7203 | **auth chatgpt: token signature verification failed** (needs‑triage) | Windows 环境下 ChatGPT 登录后验证失败，阻断了最常用的身份认证路径。 | 1 条评论 | https://github.com/codewhale-hq/Codewhale/issues/7203 |
| #7206 | **opt‑in incremental, cache‑stable context fold for long sessions** (enhancement, needs‑triage) | 提议为长会话提供增量缓存与上下文折叠，能显著降低内存占用并提升交互流畅度。 | 1 条评论 | https://github.com/codewhale-hq/Codewhale/issues/7206 |
| #6303 | **Computer Use: one install story across website app, marketplace plugin and source checkout** (enhancement, plugins, packaging, macos) *(已关闭)* | 统一跨平台安装体验的长期需求，虽已关闭但为后续 0.11 版本的包装目标。 | 1 条评论 | https://github.com/codewhale-hq/Codewhale/issues/6303 |

> **趋势提示**：从 Issue 关键词可看到社区当前最关心 **模型持久化/角色管理、跨平台身份认证、长会话缓存、以及 TUI 渲染细节**。

---

## 4️⃣ 重要 PR 进展（精选 10 条）

| 编号 | 标题 & 关键标签 | 功能/修复要点 | 状态 | 链接 |
|------|----------------|--------------|------|------|
| #7205 | **fix(tui): keep the draft when the command palette inserts a command** (contribution‑gate) | 解决命令面板插入后草稿丢失的问题，提升编辑连续性。 | OPEN | https://github.com/codewhale-hq/Codewhale/pull/7205 |
| #7204 | **fix(ci): qualify session ownership and terminal regressions after #7138** (contribution‑gate) | CI 中会话所有权检查与终端回归修复，确保 CI 稳定运行。 | OPEN | https://github.com/codewhale-hq/Codewhale/pull/7204 |
| #7207 | **fix(workspace): stop a home workspace from refusing its own junctioned state directory** | 让 `~/.codewhale` 作为工作空间时不再被错误拒绝，提升本地开发体验。 | OPEN | https://github.com/codewhale-hq/Codewhale/pull/7207 |
| #7200 | **fix(tui): resolve /save and /load paths against the workspace** | `/save` 与 `/load` 路径统一解析，防止跨目录保存/加载出错。 | CLOSED | https://github.com/codewhale-hq/Codewhale/pull/7200 |
| #7199 | **fix(engine): read text files that start with BM as text** | 修复 `read` 工具误将以 “BM” 开头的文本识别为 bitmap 的 bug。 | CLOSED | https://github.com/codewhale-hq/Codewhale/pull/7199 |
| #7198 | **fix(tui): stop math with non‑ASCII text from crashing the TUI** | 防止 LaTeX 环境中出现非 ASCII 字符导致 TUI 崩溃。 | CLOSED | https://github.com/codewhale-hq/Codewhale/pull/7198 |
| #7197 | **fix(tui): size table columns from their content** | 表格列宽自适应内容，提升终端阅读体验。 | CLOSED | https://github.com/codewhale-hq/Codewhale/pull/7197 |
| #7196 | **fix(tui): stop treating dollar amounts as inline math** | 解决普通金额符号被误解析为数学公式的问题。 | CLOSED | https://github.com/codewhale-hq/Codewhale/pull/7196 |
| #7195 | **docs(harmonyos): describe how Codewhale runs there today** | 补全 HarmonyOS 运行文档，降低跨平台上手门槛。 | CLOSED | https://github.com/codewhale-hq/Codewhale/pull/7195 |
| #7138 | **feat(engine): observe background run completion** | 为后台任务提供完成观察能力，为后续 UI/插件交互提供统一事件。 | CLOSED | https://github.com/codewhale-hq/Codewhale/pull/7138 |

> **重点**：本轮 PR 主要聚焦 **TUI 渲染细节**（命令面板、表格、数学、路径）以及 **工作空间与 CI** 的稳健性提升。

---

## 5️⃣ 功能需求趋势（从所有 Issue 提炼）

| 方向 | 具体需求 | 体现的 Issue |
|------|----------|--------------|
| **模型角色与持久化** | 保存模型在特定角色/工作流中的状态，支持跨会话恢复 | #5915、#7206 |
| **跨平台身份认证** | Windows、浏览器等多环境下的 ChatGPT / OpenAI 登录兼容性 | #7203 |
| **自定义 Provider 兼容性** | 大模型（如 qwen3.8‑27b）输出预算不被错误裁剪 | #7179 |
| **长会话上下文管理** | 增量缓存、上下文折叠以降低内存占用 | #7206 |
| **TUI 交互细节** | 命令面板草稿保留、数学公式渲染、表格列宽、路径解析等 | #7205、#7200、#7196‑#7199 |
| **跨平台安装/包装** | 统一 Windows、macOS、HarmonyOS 的安装体验 | #6303、#7195 |

> **总体趋势**：社区正从“功能完整性”转向“细节体验”和“跨平台稳健性”，尤其关注 **大模型兼容** 与 **终端 UI 的可用性**。

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **UI 渲染不一致**：数学公式、美元符号、HTML 实体等在终端中被错误解析或直接丢失。多条 PR 已针对这些问题做出修复。  
2. **路径与工作空间混淆**：`/save`、`/load`、以及工作空间目录的判定导致的文件操作错误，需要统一解析规则。  
3. **自定义 Provider 预算限制**：大模型的 token/预算上限被错误硬性限制，导致推理中断。  
4. **身份认证不稳定**：Windows 环境下 ChatGPT 登录后 token 验证失败，影响日常使用。  
5. **长会话性能**：缺少增量缓存与上下文折叠导致内存占用随会话增长而失控。  
6. **跨平台包装**：用户希望一次安装即可在网站、插件市场、源码三端使用，当前仍存在碎片化流程。  

**建议**：后续迭代可优先在 **TUI 渲染层**（字符转义、数学/表格）和 **模型提供层**（budget 传递、身份校验）两大块做系统性回归测试，同时在 **长会话缓存** 上引入增量存储方案，以满足日益增长的企业级使用需求。

---  

*本日报基于 DeepSeek‑TUI（codewhale-hq/Codewhale）最近 24 小时的 GitHub 活动整理，供技术开发者快速把握社区脉动。*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*