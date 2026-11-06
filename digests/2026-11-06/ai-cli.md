# AI CLI 工具社区动态日报 2026-11-06

> 生成时间: 2026-11-06 00:37 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告（截至 2026‑11‑06）**  

---

## 1. 热门 Skills 排行（依据评论/关注度）

| 排名 | PR 编号 | Skill（简要） | 功能概述 | 讨论焦点 | 当前状态 |
|------|--------|--------------|----------|----------|----------|
| 1 | **#1742** | `mcp-builder` ‑ 兼容 mcp ≥ 2 的 HTTP 客户端 | 让 MCP‑builder 在新版 mcp（≥2.0.0）下能够使用 `streamable_http_client` 并支持自定义请求头。 | - API 重命名导致的兼容性破坏<br>- 如何在多租户环境安全注入自定义 Header | **OPEN** |
| 2 | **#1298** | `skill-creator` ‑ 隔离 Trigger Eval & Windows 兼容 | 修复 Trigger 评估在 Windows 上的子进程竞争与管道失效问题，避免误报和负例漏检。 | - 跨平台可靠性<br>- 触发评估误差对模型调优的影响 | **OPEN** |
| 3 | **#1245** | `notion-spec-to-implementation` / `quantitative-resume-auditor` | 将 Notion 中的产品/技术规格自动拆解为可执行的实现任务；简历量化审计提供结构化评分。 | - 业务流程自动化（Spec → Task）<br>- 简历结构化评估的实用性 | **OPEN** |
| 4 | **#1703** | `md2video-audio` | 将 Markdown 文档直接编译为带真实人声的 MP4 视频（基于 Marp+语音合成）。 | - 零成本多媒体生成<br>- 音频合成质量、渲染时长 | **OPEN** |
| 5 | **#1771** | `proofcore-contract-auditor` | 静态分析 Solidity 与 Rust 合约，生成零存储 Merkle 证明并锚定至 TON 区块链。 | - Web3 安全审计自动化<br>- 区块链证明链路的可信度 | **OPEN** |
| 6 | **#525** | `pyxel` | 为 Python Pyxel 库提供游戏开发、调试与帧检查的全套 Skill。 | - 复古游戏创作的端到端支持<br>- UI/帧状态可视化 | **OPEN** |
| 7 | **#1980** | `webapp-testing` ‑ 安全提升 | 移除 `subprocess.Popen(..., shell=True)`，防止命令注入（CWE‑78）。 | - 代码安全审计<br>- 测试脚本的运行安全性 | **OPEN** |
| 8 | **#514** | `document-typography` | 检测并纠正文档中的排版问题（孤行、寡行、编号错位等），提升 AI 生成文档的可读性。 | - 文档质量控制的细粒度需求<br>- 与其他文档 Skill 的兼容性 | **OPEN** |

> **说明**：以上 PR 均在 “按评论数排序” 的前 20 条中出现，评论量（或点赞）虽未显式给出，但它们在列表中的排名表明社区关注度最高。当前均为 **OPEN**（未合并），其中多数已经进入评审阶段。

---

## 2. 社区需求趋势（从 Issues 抽取）

| 方向 | 关键需求 | 代表 Issue |
|------|----------|------------|
| **安全与信任** | 防止社区 Skill 冒充官方 `anthropic/` 命名空间，避免权限提升风险。 | #492（安全：社区 Skills 冒充官方） |
| **组织协作** | 支持在 Claude .ai 内部进行组织级 Skill 共享，省去手动导入/导出环节。 | #228（组织范围的 Skill 共享） |
| **评估与调试工具** | `run_eval.py` 触发率为 0%——需要可靠的自动化评估框架来验证 Skill 是否被模型调用。 | #556（run_eval 触发率为 0%） |
| **文档与知识库** | 解决插件之间的重复 Skill、文档内容同步状态不明确、以及文档技能的快照/同步机制。 | #189、#2108 |
| **性能与资源管理** | `claude-api` Skill 大量预填 Token（≈156k）导致上下文窗口耗尽，需要更高效的 Token 注入策略。 | #1487 |
| **质量门控** | 引入多层次的推理质量检查流水线（校准 → 对抗审查 → 验证），提升输出可靠性。 | #1385 |
| **Bug 与兼容性** | 多个脚本在特定平台（Windows、LibreOffice、XML 命名空间）上的异常表现，需要修复。 | #1792、#2019、#2018 等 |

**总体趋势**：社区正从“单个 Skill 功能实现”转向 **安全可信、组织协同、质量评估以及资源效率** 四大维度的系统性需求。

---

## 3. 高潜力待合并 Skills（评论活跃且仍未合并）

| PR 编号 | Skill | 关键价值 | 近期落地可能性 |
|--------|-------|----------|----------------|
| **#1742** | `mcp-builder` ‑ 新版 HTTP 客户端兼容 | 直接影响使用 MCP‑builder 的大量企业用户，兼容性缺口已导致 CI 失效。 | 高（已在多次更新中修复） |
| **#1298** | `skill-creator` ‑ Trigger Eval 隔离 & Windows 支持 | 解决跨平台触发评估的根本性错误，提升 Skill 开发调试效率。 | 中‑高（涉及底层子进程实现） |
| **#1245** | `notion-spec-to-implementation` / `quantitative-resume-auditor` | 将业务需求与实现任务自动对接，满足“从需求到代码”的闭环需求。 | 中（功能完整度已达 80%） |
| **#1703** | `md2video-audio` | 为内容创作者提供“一键”视频生成，潜在用户基数大。 | 中（依赖外部语音合成服务） |
| **#1771** | `proofcore-contract-auditor` | Web3 安全审计自动化，切入热点领域。 | 中‑低（需链上验证服务） |
| **#1980** | `webapp-testing` ‑ 安全加固 | 消除潜在命令注入，提升测试框架安全性。 | 高（安全修复通常优先） |
| **#514** | `document-typography` | 文档排版质量提升，适用于所有文档生成 Skill。 | 中‑高（实现简单，需求广泛） |

> **建议**：优先审阅 **#1742、#1298、#1980**，因为它们涉及兼容性与安全性，直接影响现有用户的生产环境。

---

## 4. Skills 生态洞察（一句话）

> **当前社区最集中的诉求是：在保证安全可信的前提下，提升 Skills 的跨组织协作、自动化评估与资源效率，以支撑更大规模的业务工作流自动化。**  

---  

*所有链接均指向对应的 GitHub PR/Issue 页面，供进一步跟进。*  

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-06
**来源**: google-gemini/gemini-cli

---

## 1. 今日速览
Gemini CLI 社区今日活跃度较高，主要聚焦于 **Agent 行为稳定性** 的修复。核心开发团队修复了 macOS 沙盒环境下的文件信任问题以及流式重试导致的文本拼接错误，显著提升了跨平台安全性。同时，社区对 **AST（抽象语法树）感知工具** 和 **Bash 原生能力** 的增强表现出浓厚兴趣，这预示着 CLI 代理将更智能地处理代码库，减少 token 消耗。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues (Top 10)

1.  **Subagent 恢复逻辑错误 (Priority: P1)**
    *   **问题**: `codebase_investigator` subagent 在达到最大轮次限制后，错误地报告为“GOAL 成功”而非中断，导致任务状态掩盖。
    *   **链接**: [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2.  **通用 Agent 挂起 (Priority: P1)**
    *   **问题**: 使用 `gemini-cli` 时，通用 Agent 经常永久挂起，即使是简单的文件夹创建操作也会卡顿。
    *   **链接**: [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3.  **AST 感知工具评估 (Priority: P2)**
    *   **问题**: 评估 AST 感知工具对文件读取、搜索和代码库映射的影响，旨在减少 token 消耗并提高精度。
    *   **链接**: [Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)

4.  **Bash 亲和性与沙箱 (Priority: P2)**
    *   **问题**: 利用模型对 Bash 的原生亲和性，通过零依赖 OS 沙箱和执行后意图路由来增强安全性与效率。
    *   **链接**: [Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)

5.  **Agent 技能使用不足 (Priority: P2)**
    *   **问题**: 报告称 Gemini CLI 自身不常使用自定义 Skills 和 Sub-agents，即使任务高度相关也倾向于独立处理。
    *   **链接**: [Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)

6.  **Browser Agent 配置覆盖失效 (Priority: P2)**
    *   **问题**: Browser Agent 完全忽略 `settings.json` 中的配置覆盖（如 `maxTurns`）。
    *   **链接**: [Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)

7.  **浏览器 Agent Wayland 失败 (Priority: P1)**
    *   **问题**: Browser subagent 在 Wayland 环境下失败。
    *   **链接**: [Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983)

8.  **工具数量限制 (Priority: P2)**
    *   **问题**: 当可用工具超过 128 个时，CLI 遇到 400 错误，期望 Agent 能更智能地限制工具范围。
    *   **链接**: [Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)

9.  **Agent 自我感知增强 (Priority: P3)**
    *   **问题**: 增强 Agent 的自我意识，使其能准确提供关于自身 CLI 标志、热键和执行机制的准确信息。
    *   **链接**: [Issue #21432](https://github.com/google-gemini/gemini-cli/issues/21432)

10. **破坏性行为抑制 (Priority: P2)**
    *   **问题**: 在复杂 Git 操作中，Agent 可能意外使用 `git reset` 或 `--force`，需要增加停止或抑制破坏性行为的逻辑。
    *   **链接**: [Issue #22672](https://github.com/google-gemini/gemini-cli/issues/22672)

---

## 4. 重要 PR 进展 (Top 10)

1.  **修复 macOS 沙盒文件信任 (Priority: P1)**
    *   **内容**: 修复了在 macOS Seatbelt 沙盒中访问 `trustedFolders.json` 的问题，解决了启动崩溃后的残留错误。
    *   **链接**: [PR #30164](https://github.com/google-gemini/gemini-cli/pull/30164)

2.  **修复流式重试文本拼接 (Priority: P2)**
    *   **内容**: 修复了 ACP 模式下，流式重试导致部分文本和工具调用被拼接和执行的问题。
    *   **链接**: [PR #30165](https://github.com/google-gemini/gemini-cli/pull/30165)

3.  **新增 gemini-2.5-flash-image 模型支持**
    *   **内容**: 在模型注册表中添加了 `gemini-2.5-flash-image` 配置，使其可在 CLI 中作为内置图像生成模型使用。
    *   **链接**: [PR #30159](https://github.com/google-gemini/gemini-cli/pull/30159)

4.  **独立主题配置文件支持**
    *   **内容**: 解耦主题定义，允许使用独立的 `theme.json` 文件，而非硬编码在 `settings.json` 中。
    *   **链接**: [PR #30119](https://github.com/google-gemini/gemini-cli/pull/30119)

5.  **修复 stdin 管道数据丢失与进程销毁**
    *   **内容**: 修复了慢速管道导致的数据丢失问题，并避免了在读取标准输入时销毁进程流。
    *   **链接**: [PR #30163](https://github.com/google-gemini/gemini-cli/pull/30163)

6.  **修复 Windows PowerShell 命令替换误报**
    *   **内容**: 修复了 v0.63.0 引入的严重回归，防止 PowerShell 中的命令替换（如 `$HOME`）被误判为恶意脚本注入。
    *   **链接**: [PR #30110](https://github.com/google-gemini/gemini-cli/pull/30110)

7.  **支持符号链接的 Agent 加载**
    *   **内容**: 修复了 Agent 目录中 `.md` 文件如果是符号链接时无法被加载的问题。
    *   **链接**: [PR #30122](https://github.com/google-gemini/gemini-cli/pull/30122)

8.  **修复工具确认时外部编辑器的状态保留**
    *   **内容**: 修复了当用户选择“外部编辑器”修改文件时，未能正确保留待确认的工具状态。
    *   **链接**: [PR #30147](https://github.com/google-gemini/gemini-cli/pull/30147)

9.  **增强 Windows PowerShell 模板注入安全性**
    *   **内容**: 修复了 CI 工作流中的模板注入漏洞，防止 GitHub Actions 表达式被错误地注入到 bash 脚本中。
    *   **链接**: [PR #30162](https://github.com/google-gemini/gemini-cli/pull/30162)

10. **防止循环引用的 JSON 序列化错误**
    *   **内容**: 修复了 `safeJsonStringify` 在处理非循环对象时错误地替换为 `[Circular]` 的问题。
    *   **链接**: [PR #30157](https://github.com/google-gemini/gemini-cli/pull/30157)

---

## 5. 功能需求趋势

*   **性能与 Token 优化**: 社区对 **AST 感知工具** 和 **“战术提取”** 的需求激增。开发者希望 Agent 能更智能地读取代码，减少上下文轮次和 token 消耗。
*   **Agent 行为稳定性**: 高优先级的 Bug 反馈集中在 Agent 的死锁、状态报告错误（如将超时误报为成功）以及配置覆盖失效上。
*   **原生能力集成**: 讨论 `gemini-2.5-flash-image` 等新模型支持，以及如何让 Agent 更好地利用 Bash 原生能力，减少中间层封装。
*   **跨平台与安全**: Windows PowerShell 兼容性问题以及 macOS 沙盒下的文件系统访问权限依然是高频痛点。

---

## 6. 开发者关注点

*   **配置管理**: 开发者希望将主题配置与行为配置分离，并支持符号链接管理 Agent 文件，以提高灵活性。
*   **交互体验**: 在 Vite 创建等场景下，Agent 停留在交互式提示符的问题影响严重，需要改进提示词策略或自动跳过机制。
*   **错误处理**: 输出 Hook 崩溃、stdin 管道处理不当以及浏览器 Agent 在特定桌面环境下的兼容性是阻碍使用的主要障碍。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-11-06  
**来源**: github.com/github/copilot-cli

---

## 1. 今日速览
过去24小时内，Copilot CLI 发布了两个预发布版本 (v1.0.106-10, v1.0.106-11)，主要改进了 Windows/macOS 的 Microsoft Entra 登录体验，并优化了提示词管理功能。社区方面，22个 Issue 被更新，主要集中在 **MCP (Model Context Protocol) 工具调用故障**、**会话恢复问题** 以及 **终端集成体验** 的改进需求上。

---

## 2. 版本发布
### v1.0.106-11 (Pre-release)
- **改进**: 修复了在 Ctrl+U/Ctrl+K/Ctrl+W 删除图片或恢复历史记录后，相关提示词不再随消息发送的问题；粘贴包含特殊换行符 (NEL, Unicode separators) 的文本时，会正确填充为多行。
- **修复**: 修复了特定提示词操作后的状态管理问题。

### v1.0.106-10 (Pre-release)
- **改进**: 在 Windows 和 macOS 上，将 Microsoft Entra (旧称 Azure AD) 登录路径默认更改为 OneAuth；优化了启动时的 Agent 选择体验，保持静默恢复。
- **修复**: 修复了 MCP Entra 认证失败时回退到 VS Code 注册流程的问题。

---

## 3. 社区热点 Issues (Top 10)

1. **[OPEN] #3333 Android/Termux 支持在 v1.0.48+ 中损坏** (5 👍)
   - **摘要**: v1.0.48 引入的 Rust 原生插件依赖 glibc，而 Termux 使用 Bionic libc，导致无法运行。
   - **重要性**: 核心平台兼容性问题，阻碍了 Android 用户使用最新功能。

2. **[OPEN] #5279 终端集成的前景会话变更钩子** (0 👍)
   - **摘要**: 需要一个权威的前台会话变更钩子，以解决终端插件（如 tmux, herdr）关联正确会话的问题。
   - **重要性**: 关乎多窗口/多会话场景下的用户体验。

3. **[OPEN] #5220 Claude 模型的 1 小时缓存 TTL** (8 👍)
   - **摘要**: 交互式使用中 5 分钟的默认缓存 TTL 太短，建议增加 1 小时选项以降低成本并提升速度。
   - **重要性**: 直接影响开发者成本和交互流畅度。

4. **[OPEN] #5354 ACP 未展示 Copilot Fusion** (2 👍)
   - **摘要**: 在交互模式下可用 Fusion 时，ACP (Advanced Chat Platform) 仍显示为 "Auto" 模型，导致客户端无法展示 Fusion 功能。
   - **重要性**: 企业级集成功能缺失。

5. **[OPEN] #5353 在时间线中渲染提交消息的 Markdown** (0 👍)
   - **摘要**: 用户提交的消息显示为纯文本，未像 AI 回复一样渲染 Markdown 格式（列表、代码块等）。
   - **重要性**: 视觉一致性和可读性改进。

6. **[OPEN] #5362 模型自动替换垃圾工具结果** (0 👍)
   - **摘要**: 允许模型在工具调用返回垃圾数据时，自动将其替换为一行摘要，以节省 Token 成本并保持上下文清洁。
   - **重要性**: 优化上下文窗口利用和成本控制。

7. **[OPEN] #5358 支持无副作用的设备登录** (0 👍)
   - **摘要**: 需要一种不启动浏览器或修改剪贴板的设备码登录模式，以满足某些受限环境的安全策略。
   - **重要性**: 在企业/受限网络环境下的可用性关键。

8. **[OPEN] #5359 MCP 工具引用在会话恢复后失效** (0 👍)
   - **摘要**: 恢复会话后，所有请求报错 "Tool reference not found"，即使该工具在之前的搜索中是可用的。
   - **重要性**: 会话状态管理稳定性问题。

9. **[OPEN] #5367 Agent 定期丢失 MCP 工具 Schema** (0 👍)
   - **摘要**: 每次回到会话时，Agent 无法访问某些 MCP 工具，必须使用 `/compact` 命令才能恢复。
   - **重要性**: 上下文记忆机制缺陷。

10. **[OPEN] #5356 Windows npm 版本中多分钟卡顿** (0 👍)
    - **摘要**: 使用 `npx copilot --yolo` 在 Windows 上交互时，某些回合会长时间无响应，需要取消并继续。
    - **重要性**: 核心交互体验稳定性问题。

---

## 4. 重要 PR 进展
> 当前 24 小时内无新的 Pull Requests 更新。

---

## 5. 功能需求趋势
基于 Issues 分析，社区关注点主要集中在以下三个方向：
1.  **MCP (Model Context Protocol) 生态与集成**: 社区对 MCP 的深度集成需求极高，涵盖了工具发现、OAuth 认证、工具 Schema 管理、以及 OSC 7501 状态报告协议的支持。
2.  **会话管理与上下文**: 如何高效恢复会话、保持上下文一致性（如 `/compact` 的使用）、以及处理长会话（5小时限制）后的状态重置是高频痛点。
3.  **企业级与受限环境支持**: 包括设备码登录（无浏览器/剪贴板操作）、多会话终端集成、以及特定平台（Android/Termux, WSL2）的兼容性支持。

---

## 6. 开发者关注点
*   **成本与性能**: 开发者强烈呼吁增加 Prompt Cache 的 TTL 时间（特别是针对 Claude 模型），以避免重复计算和成本浪费。
*   **终端体验**: 用户希望用户提交的消息也能像 AI 回复一样渲染 Markdown，以提升阅读体验。
*   **错误处理**: 在企业环境中，Managed sandbox 政策变更、权限错误以及 I/O 失败时的错误提示和重试机制需要更加透明和健壮。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期**: 2026-11-06
**来源**: GitHub [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

### 1. 今日速览
社区今日保持平静，无新版本发布。仅有一个关于“知识平面”开发的 Pull Request 已被维护者关闭，可能意味着该功能方向已通过内部讨论或被搁置。

### 2. 版本发布
*无*

### 3. 社区热点 Issues
*无活跃 Issues 更新*

### 4. 重要 PR 进展
由于过去24小时内仅更新了 1 个 PR，且该 PR 已被关闭，以下是相关详情：

**#2606 [CLOSED] Dev/knowledge plane**
*   **作者**: SoMiReMiReDo
*   **摘要**: 提交了一个名为“知识平面”的开发分支，旨在实现特定功能。
*   **状态**: **已关闭 (CLOSED)**
*   **原因**: 根据 PR 模板要求，贡献者在未获得维护者确认的情况下提交 PR 可能会被忽略或关闭。此 PR 可能未通过内部代码审查或讨论流程。

### 5. 功能需求趋势
*无新数据*

### 6. 开发者关注点
*无新数据*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-11-06
**来源：** github.com/anomalyco/opencode

---

### 1. 今日速览
*   **核心发布：** 项目发布 `process-daemon` v0.5.0，更新了 `opencode-pty` 依赖，支持协议 v8，这对底层交互能力有重要影响。
*   **热点聚焦：** 关于免费层使用限制的讨论（Issue #59387）持续发酵，累计评论数超 300，成为当前社区最关注的问题，涉及订阅和重置机制。
*   **功能迭代：** 官网重构持续推进，多组 PR 陆续合并，旨在提供全新的品牌展示和文档体验。

---

### 2. 版本发布
*   **process-daemon v0.5.0**
    *   **摘要：** 发布了 `opencode-pty` 0.5.0 (protocol 8)，作为 `packages/process-daemon` 的一部分发布到 npm (`@opencode/pty`)。
    *   **影响：** 这是底层协议栈的重要升级，可能涉及终端模拟器或进程管理的性能优化或新特性支持。

---

### 3. 社区热点 Issues (Top 10)
*以下 Issues 展示了社区当前面临的主要挑战和需求：*

1.  **[zen] Free tier issues: read this first (#59387)**
    *   **评论数：** 302
    *   **重要性：** **最高优先级**。这是关于免费层问题的主线程，涵盖了订阅失败、额度未重置等严重体验问题。大量用户聚集于此反馈，是产品运营和后端修复的焦点。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/59387)

2.  **[Billing] OpenCode Go subscription: all payment methods declined from Italy (EU) (#52958)**
    *   **评论数：** 16
    *   **重要性：** 涉及区域支付网关问题。意大利用户无法订阅付费版，阻碍了新用户的付费转化，属于典型的全球支付兼容性问题。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/52958)

3.  **service: hardcoded default port locks out second client (#50672)**
    *   **评论数：** 13
    *   **重要性：** **严重 Bug**。后台服务硬编码端口导致同一机器上的第二个客户端无法连接，影响多任务处理场景。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/50672)

4.  **ai: OpenAI Chat tool-content guard aborts session drain (#55271)**
    *   **评论数：** 9
    *   **重要性：** AI 模型调用失败。当请求降低错误发生时，系统无法正确处理会话数据流，导致会话意外中断。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/55271)

5.  **OpenCode Tool Result Processing Error - Invalid ID Field Format (#62215)**
    *   **评论数：** 7
    *   **重要性：** API 解析错误。当 API 返回非字符串 ID 时，工具结果处理失败，属于数据解析层面的稳定性问题。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/62215)

6.  **Subagent writes denied: built-in tester policy overrides agent rules (#62213)**
    *   **评论数：** 6
    *   **重要性：** 权限控制逻辑缺陷。子代理被错误地阻止写入，因为内置策略覆盖了用户定义的允许规则。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/62213)

7.  **gemini-4-argon returns 403 Endpoint is unavailable (#61845)**
    *   **评论数：** 6
    *   **重要性：** 特定模型故障。Gemini 模型在 OpenCode 环境下不可用，但通过其他聚合器正常，可能是配置或网关问题。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/61845)

8.  **agent: tool calls intermittently rejected with "expected object" (#54792)**
    *   **评论数：** 6
    *   **重要性：** 工具调用不稳定。约一半的工具调用在解析阶段失败，导致 Agent 意外停止，严重影响生产力。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/54792)

9.  **[FEATURE]: Load configured ./gui-experimental plugins in the web app (#60976)**
    *   **评论数：** 6
    *   **重要性：** **功能需求**。用户希望将 Desktop 端支持的 GUI 插件迁移到 Web 端，以获得跨平台的一致体验。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/60976)

10. **[reproduced] Failed to drain Session: one malformed tool result wedges the whole session (#50775)**
    *   **评论数：** 4
    *   **重要性：** 会话阻塞。单条格式错误的数据会导致整个会话永久卡死，这是导致数据丢失的高危 Bug。
    *   [查看详情](https://github.com/anomalyco/opencode/issues/50775)

---

### 4. 重要 PR 进展 (Top 10)
*以下 PR 展示了开发团队近期的修复和新功能开发方向：*

1.  **[contributor] feat(site): bring services/site up to date with the latest site work (#62219)**
    *   **状态：** Open
    *   **内容：** 更新网站服务，同步 David 的最新站点工作成果，调整 Cloudflare 配置和媒体路径。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/62219)

2.  **[contributor] fix(core): lead every shell result with its exit code (#62141)**
    *   **状态：** Open
    *   **内容：** 优化 Shell 结果输出格式，在输出前显示退出码和超时信息，提升用户体验。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/62141)

3.  **[contributor] feat(app): add a session media panel (#62217)**
    *   **状态：** Open
    *   **内容：** 新增会话侧边栏的“媒体”选项卡，方便用户集中查看会话中分享的图片、视频和文件链接。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/62217)

4.  **fix(mcp): refresh stored OAuth tokens before they expire (#62200)**
    *   **状态：** Open
    *   **内容：** 修复 MCP OAuth 令牌刷新机制，防止令牌过期导致 403 权限错误。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/62200)

5.  **fix(tui): render prompt links as clickable hyperlinks (#61784)**
    *   **状态：** Open
    *   **内容：** 修复 TUI 中链接在流式输出时的闪烁问题，将其渲染为可点击的超链接。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/61784)

6.  **feat(console): add the new home and product pages (#62163)**
    *   **状态：** Open
    *   **内容：** 重构官网首页和产品页面，包含新的品牌展示和文档代码块组件。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/62163)

7.  **fix(cli): rewrite noninteractive run and remove the V1 bridge (#61911)**
    *   **状态：** Closed
    *   **内容：** 重写非交互式运行逻辑，移除 V1 桥接层，解决相关 Bug。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/61911)

8.  **feat(www): serve the config schemas and well-known files (#62203)**
    *   **状态：** Closed
    *   **内容：** 合并 `services/meta` 到 `www`，使网站直接托管配置模式和 Well-Known 文件，移除中间层。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/62203)

9.  **feat(mcp): trust private-network server certificates on first use (#60041)**
    *   **状态：** Open
    *   **内容：** 支持首次使用时信任私有网络 MCP 服务器的自签名证书，增强安全性。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/60041)

10. **fix(app): let swipes scroll the mobile tab drawer (#61407)**
    *   **状态：** Open
    *   **内容：** 修复移动端 Tab Drawer 滑动冲突问题，增加 250ms 延迟以区分拖拽和滚动操作。
    *   [查看详情](https://github.com/anomalyco/opencode/pull/61407)

---

### 5. 功能需求趋势
基于 Issues 分析，社区目前关注的核心方向包括：

1.  **支付与订阅系统 (Billing)**
    *   这是当前社区焦虑的源头，涉及多地区支付失败（如意大利）、免费额度重置机制失效以及订阅流程的稳定性。
2.  **会话管理与数据持久化**
    *   频繁出现会话卡死、会话导入后不显示、会话过期过快等问题，用户对长会话的稳定性需求强烈。
3.  **工具权限与安全性**
    *   `write`/`edit` 工具的权限控制逻辑存在争议（子代理权限被误杀），以及对远程 MCP 服务器证书信任机制的改进需求。
4.  **Web 与 Desktop 体验一致性**
    *   希望将 Desktop 端的 GUI 插件和特定功能迁移到 Web 端，实现跨平台体验的统一。

---

### 6. 开发者关注点
*   **终端与 TUI 交互：** 在 tmux 等终端复用器下的通知显示、链接渲染闪烁、以及进程挂起功能的稳定性。
*   **API 兼容性与解析：** 针对 OpenAI 兼容接口的 ID 长度限制、工具调用参数格式解析错误（JSON root 类型不匹配）。
*   **多模型支持：** 某些特定模型（如 Gemini-4-Argon）在 OpenCode 环境下的端点不可用问题。
*   **CLI 工具健壮性：** 非交互模式下的参数解析错误、无效目录参数的错误提示友好度问题。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-06  
**来源**: [earendil-works/pi](https://github.com/badlogic/pi-mono)

## 1. 今日速览
过去 24 小时内，Pi 仓库活跃度较高，发布了 25 个 PR 和 50 个 Issues。开发者社区主要关注**跨平台兼容性**（Windows/Linux/macOS）、**编码问题修复**（UTF-16/非 UTF-8 文件处理）以及**会话管理**（会话切换、持久化）。值得注意的是，**GitHub Actions 发布流程**和**Prompt 缓存优化**（减少重复计算成本）也在议程中。

## 2. 版本发布
**暂无新版本发布**。

## 3. 社区热点 Issues

1.  **[OPEN] Mac OS 高 CPU 占用问题** [#7730](https://github.com/badlogic/pi-mono/issues/7730)
    *   **重要性**: 影响用户体验的核心性能问题。
    *   **详情**: 用户反馈在 Mac OS 上，长会话期间 CPU 占用率波动在 50%-110%，内存占用约 600-800MB。目前怀疑与上下文大小或会话长度有关。
    *   **社区反应**: 12 个点赞，热度最高。

2.  **[CLOSED] npm 搜索索引失效** [#7885](https://github.com/badlogic/pi-mono/issues/7885)
    *   **重要性**: 影响包发现和分发。
    *   **详情**: 新发布的 `pi-affix-prompt` 包无法在 npm 搜索和 pi.dev 画廊中显示。Gallery 似乎镜像 npm 搜索，导致 49/50 包无法被发现。
    *   **社区反应**: 1 个点赞。

3.  **[OPEN] Groq Qwen3.8 模型调用失败** [#10741](https://github.com/badlogic/pi-mono/issues/10741)
    *   **重要性**: 新模型支持与 API 兼容性。
    *   **详情**: 在 Pi 1.1.0 中调用 Groq 的 `qwen3.8-27b` 时报错 HTTP 400，提示 "Unexpected message role"，怀疑是 Pi 发送的 `developer` 角色不被接受。

4.  **[OPEN] 上下文使用量估算错误** [#10287](https://github.com/badlogic/pi-mono/issues/10287)
    *   **重要性**: 影响上下文管理逻辑。
    *   **详情**: 在发生可重试的网络错误后，`getContextUsage()` 方法严重高估了上下文使用量（从 42k tokens 跳升至 330,081 tokens），导致上下文管理异常。

5.  **[OPEN] pi.exec 在 Windows 扩展中失效** [#10616](https://github.com/badlogic/pi-mono/issues/10616)
    *   **重要性**: 跨平台命令执行能力。
    *   **详情**: 编写扩展时调用 `pi.exec("npm", ...)` 在 Windows 下返回 exit 1 且无输出，但在 bash 工具中正常，问题出在 exec 路径。

6.  **[CLOSED] MCP OAuth 登录后卡死** [#11311](https://github.com/badlogic/pi-mono/issues/11311)
    *   **重要性**: 服务器集成体验。
    *   **详情**: 登录成功后 Pi 卡在 "Connecting..." 状态 2-3 分钟，Ctrl+C 无效。

7.  **[CLOSED] Windows 自更新崩溃** [#11814](https://github.com/badlogic/pi-mono/issues/11814)
    *   **重要性**: 安装维护。
    *   **详情**: Win11 下运行 `pi self-update` 时崩溃，错误为 `spawn /bin/sh ENOENT`，因为 Windows 环境下不存在该命令。

8.  **[CLOSED] 终端 TUI 输入乱码** [#11802](https://github.com/badlogic/pi-mono/issues/11802)
    *   **重要性**: 终端交互体验。
    *   **详情**: 在 Ghostty 1.4.0 和 Alacritty 等终端中，输入时产生原始 CSI 转义序列，导致 Enter/quit/quit 命令失效。

9.  **[CLOSED] 编码文件读写损坏** [#11379](https://github.com/badlogic/pi-mono/issues/11379)
    *   **重要性**: 数据完整性。
    *   **详情**: 更新 v1.3.0 后，复制输出内容时会导致正在输入的 prompt 丢失。

10. **[CLOSED] 会话切换时 Agent 中断** [#4846](https://github.com/badlogic/pi-mono/issues/4846)
    *   **重要性**: 会话管理逻辑。
    *   **详情**: 用户希望切换会话时能保持 Agent 运行，而不是被杀死。

## 4. 重要 PR 进展

1.  **[OPEN] 修复 Windows 下 bash 进程树清理** [#11854](https://github.com/badlogic/pi-mono/pull/11854)
    *   **内容**: 修复 Windows 下 `taskkill` 命令无法清理父进程已退出的子进程的问题，确保完全清理进程树。

2.  **[OPEN] 优化编辑工具的换行符处理** [#11751](https://github.com/badlogic/pi-mono/pull/11751)
    *   **内容**: 编辑工具现在只修改变动区域的换行符，保留未修改行的原有格式。

3.  **[CLOSED] 延迟流式工具参数解析** [#9461](https://github.com/badlogic/pi-mono/pull/9461)
    *   **内容**: 避免在每次流式数据更新时重新解析完整的 JSON，提升性能。

4.  **[CLOSED] 修复工具搜索中的本地 Schema 引用** [#11850](https://github.com/badlogic/pi-mono/pull/11850)
    *   **内容**: 修复 `tool_search` 在处理包含 `$ref` 的 MCP Schema 时遗漏参数描述的问题。

5.  **[CLOSED] Prompt 缓存预热功能** [#11857](https://github.com/badlogic/pi-mono/pull/11857)
    *   **内容**: 在 p2 模式下实现 prompt 缓存预热，避免 5 分钟超时后重复发送整个 prompt，预计节省约 26% 的 Token 成本（约 $1430）。

6.  **[CLOSED] 修复非 UTF-8 文件读写** [#11811](https://github.com/badlogic/pi-mono/pull/11811)
    *   **内容**: 添加 `file-encoding.ts` 辅助工具，使 `read` 和 `edit` 工具能够正确处理 UTF-16 和非 UTF-8 编码文件，防止数据损坏。

7.  **[CLOSED] 重构发布标签流程** [#11686](https://github.com/badlogic/pi-mono/pull/11686)
    *   **内容**: 修复 CI 构建问题，确保发布标签能被正确构建并部署到 `pkg.earendil.com`。

8.  **[CLOSED] 会话持久化与复制** [#11696](https://github.com/badlogic/pi-mono/pull/11696)
    *   **内容**: 添加实验性的会话同步功能，允许设备间上传和拉取会话提交。

9.  **[CLOSED] TUI 组件崩溃修复** [#11818](https://github.com/badlogic/pi-mono/pull/11818)
    *   **内容**: 修复当工具渲染器返回 `undefined` 时导致 TUI 崩溃的问题。

10. **[CLOSED] 修复 Windows 自更新路径** [#11834](https://github.com/badlogic/pi-mono/pull/11834)
    *   **内容**: 修复构建脚本中许可证目录读取错误，确保 Vite 构建流程正常。

## 5. 功能需求趋势

*   **跨平台健壮性**: Windows (Cmd, PowerShell, npm/npx, Self-update) 和 Linux/macOS 的兼容性问题占据了 Issue 的很大比例，特别是进程管理和文件编码。
*   **编码处理**: 针对非 UTF-8 (特别是 UTF-16) 文件的读写支持是高频需求。
*   **会话与持久化**: 会话切换时是否保持 Agent 运行、会话在不同设备间的同步（Durable Storage Replication）是社区讨论的热点。
*   **性能优化**: 减少 Token 成本（Prompt Cache）和降低 CPU 占用是性能优化的核心方向。

## 6. 开发者关注点

*   **稳定性与崩溃**: TUI 崩溃、Agent 中断、OAuth 卡死等问题严重影响了开发体验。
*   **编码兼容性**: 在处理国际化项目或特殊编码文件时，Pi 目前表现不稳定。
*   **工具扩展性**: 扩展加载失败导致程序退出，以及扩展内的文件读写和进程管理存在边界情况问题。
*   **运维与发布**: 发布流程的自动化和标签管理是维护团队关注的重点。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑11‑06**  

---

## 1️⃣ 今日速览  
- 本日社区活跃度高，22 条 PR 在过去 24 小时内有更新，重点围绕 **WeCom 桥接增强、子代理安全路径校验、TUI 剪贴板图片处理** 等核心功能。  
- 仍未有新的正式 Release，所有改动均处于 PR 合并或关闭阶段。  

---

## 2️⃣ 版本发布  
> 本日暂无 Release 公告，后续请关注 `Releases` 页面。

---

## 3️⃣ 社区热点 Issues （全部 2 条）

| # | 标题 | 关键点 | 社区反馈 | 链接 |
|---|------|--------|----------|------|
| **7214** | **Proposal: preserve case‑sensitive model IDs in the provider picker** | 提议在模型提供者选择器中保持模型 ID 的大小写，以避免在跨平台（尤其是 Windows）上因大小写不敏感导致的模型误匹配。 | 作者已自行搜索确认未重复，讨论仅 1 条评论，说明需求尚在萌芽阶段。 | <https://github.com/codewhale-hq/Codewhale/issues/7214> |
| **7221** | **clean clipboard‑images** | 讨论是否对剪贴板图片进行会话分组并新增清理指令，涉及 TUI 对图片的管理与资源回收。 | 1 条评论，关注度与 **PR #7217 / #7218** 中的图片粘贴实现直接相关。 | <https://github.com/codewhale-hq/Codewhale/issues/7221> |

*注：目前仅有上述两条 Issue，后续若有新需求请及时关注。*

---

## 4️⃣ 重要 PR 进展（挑选 10 条）

| # | 标题 | 功能/修复概要 | 影响范围 | 链接 |
|---|------|--------------|----------|------|
| **7212** | `feat(bridges): accept media and voice messages on the WeCom bridge` | 让 WeCom 桥接能够接收图片、视频、语音等非文本消息，提升移动端使用体验。 | WeCom 机器人、跨平台聊天 | <https://github.com/codewhale-hq/Codewhale/pull/7212> |
| **7209** | `fix(bridges): cap WeCom reply chunks by UTF‑8 bytes` | 按 UTF‑8 字节数（4096 B）分片回复，防止中文长回复被截断。 | 所有 WeCom 对话 | <https://github.com/codewhale-hq/Codewhale/pull/7209> |
| **7224** | `fix(subagent): only scan nested repositories at the worktree anchor` | 子代理在遍历工作树时仅扫描真实的子仓库，避免跨目录误检，提高安全性和性能。 | 子代理文件系统访问 | <https://github.com/codewhale-hq/Codewhale/pull/7224> |
| **7213** | `fix(engine): report file_search results from the workspace root` | `file_search` 现在统一基于工作区根目录返回相对路径，解决多层目录搜索结果错位问题。 | 文件检索、代码补全 | <https://github.com/codewhale-hq/Codewhale/pull/7213> |
| **7217** | `feat(tui): paste clipboard images and preview every attachment` | 在 Windows Terminal 中实现 `Ctrl+V` 粘贴图片并即时预览，解决长期缺失的图片粘贴功能。 | TUI UI/UX | <https://github.com/codewhale-hq/Codewhale/pull/7217> |
| **7228** | `fix(subagent): report follow‑up delivery truthfully and follow the answering successor` | 子代理在多轮交互中准确报告是否已交付并追踪真正回答的后继代理，提升对话链路可追溯性。 | 任务调度、子代理协同 | <https://github.com/codewhale-hq/Codewhale/pull/7228> |
| **7226** | `fix(vision): accept absolute image paths that resolve inside the workspace` | 视觉工具现在接受工作区内部的绝对路径，消除路径写法不一致导致的加载失败。 | 图像分析、Vision 工具 | <https://github.com/codewhale-hq/Codewhale/pull/7226> |
| **7225** | `fix(localization): sweep stale mode‑jump and rail copy from non‑English packs` | 清理非英文本地化包中已废弃的快捷键描述，避免用户误导。 | 多语言 UI | <https://github.com/codewhale-hq/Codewhale/pull/7225> |
| **7230** | `feat(tasks): pause the task wall clock for answerable human waits` | 任务计时在等待用户人工确认时暂停，防止超时误判，提升人机协作体验。 | 任务调度、预算管理 | <https://github.com/codewhale-hq/Codewhale/pull/7230> |
| **7205** | `fix(tui): keep the draft when the command palette inserts a command` | 在命令面板中插入命令时保持已有草稿不被清空，提升编辑流畅度。 | TUI 编辑器 | <https://github.com/codewhale-hq/Codewhale/pull/7205> |

> 其余 PR（如 #7207、#7218、#7211、#7210、#7208 等）同样重要，已在上表中略作归类，感兴趣的开发者可自行查看完整列表。

---

## 5️⃣ 功能需求趋势  

从当前 Issue 与 PR 讨论中可提炼出以下社区热点方向：

| 趋势 | 具体表现 |
|------|----------|
| **跨平台剪贴板与媒体支持** | Issue #7221 与 PR #7217、#7218 共同指向 Windows 环境下的图片粘贴、会话分组与清理需求。 |
| **WeCom（企业微信）桥接可靠性** | 多个 PR（#7212、#7209、#7208、#7210、#7211）聚焦消息类型、分片、错误信息可视化以及长轮询的可靠性提升。 |
| **子代理路径安全校验** | PR #7224、#7226、#7227 等集中在“绝对路径合法性”和“工作树扫描限制”，体现对安全沙盒的关注。 |
| **任务调度与人机交互预算** | PR #7230 以及 #7209 等显示社区在**任务预算**与**人类等待时间**的精准计量上有强烈需求。 |
| **多语言本地化与 UI 稳定性** | PR #7225、#7205 等针对非英文包的 stale 文案、快捷键行为进行清理，说明本地化质量仍是关注点。 |
| **模型 ID 大小写一致性** | Issue #7214 提出在 Provider Picker 中保持模型 ID 大小写，这关联到模型管理与跨平台一致性。 |

---

## 6️⃣ 开发者关注点  

| 痛点 / 高频需求 | 说明 |
|----------------|------|
| **图片/媒体粘贴不完整** | Windows 终端对剪贴板图片的捕获存在多层缺陷，导致用户无法直接粘贴。PR #7217、#7218 正在修复。 |
| **长文本截断与错误信息缺失** | WeCom 对消息大小的硬限制导致中文长回复被截断，且错误信息被渲染为 `[object Object]`，影响排查。已通过 #7209、#7208 两个 PR 改进。 |
| **子代理文件路径安全** | 绝对路径或跨工作树的写入/读取被错误拦截，带来开发者调试成本。相关 PR #7224、#7226、#7227 已逐步解决。 |
| **命令面板交互体验** | 插入命令时草稿被清空，导致用户输入丢失。#7205 已提供保留草稿的方案。 |
| **模型选择一致性** | 大小写敏感的模型 ID 在不同平台表现不一致，可能导致选错模型。Issue #7214 提出需求，后续可能进入 PR 阶段。 |

---

**结语**：本日社区围绕 **跨平台媒体交互**、**企业微信桥接可靠性** 与 **子代理安全** 三大块展开大量 PR，表明 DeepSeek TUI 正在快速迭代以提升生产力和安全性。建议开发者关注上述 PR 的合并进度，及时在本地分支同步最新改动。祝开发顺利 🚀

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*