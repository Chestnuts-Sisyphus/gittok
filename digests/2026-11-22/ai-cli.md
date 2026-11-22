# AI CLI 工具社区动态日报 2026-11-22

> 生成时间: 2026-11-21 23:59 UTC | 覆盖工具: 9 个

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

# Claude Code Skills 社区热点报告

## 1. 热门 Skills 排行
基于 PR 评论数与讨论热度，以下为社区关注度最高的 Skills：

| Skill 名称 | 功能描述 | 状态 | 核心讨论 |
|-----------|----------|------|----------|
| **notion-spec-to-implementation** | 将产品/技术规范转化为 Notion 任务与实施计划 | Open | 社区对 AI 驱动的规格落地工具需求强烈，该 Skill 提供了明确的任务拆解与验收标准模板 |
| **proofcore-contract-auditor** | 针对智能合约的静态分析与零存储证明锚定 | Open | Web3 开发者关注链上可验证审计，填补了 Claude Skills 在区块链领域的空白 |
| **md2video-audio** | Markdown 转专业级 MP4 视频，附带拟人化配音 | Open | 内容创作者需求，强调“零成本”与自动化流程 |
| **pyxel** | Python 复古游戏开发技能包，支持调试与帧级检查 | Open | 教育与游戏开发社区关注，提供从实现到验证的全链路支持 |
| **scnet-hpc** | SCNet HPC 集群操作技能，支持基于配置的 SSH 与 Slurm 工作流 | Open | 科学计算与高性能计算用户急需的集群管理工具 |

---

## 2. 社区需求趋势
从 Issues 提炼，社区最期待的新 Skill 方向包括：

- **工作流自动化与编排**：如 #228（组织内技能共享）、#1329（紧凑记忆 Agent 状态管理）
- **安全与治理**：#492（信任边界滥用风险）、#412（Agent 治理技能提案）
- **文档与数据质量**：#514（文档排版质量控制）、#1143（账户邮箱变更机制）
- **测试与验证**：#1385（推理质量门控管道）、#556（技能触发机制调试）

**核心诉求**：社区既需要**新场景覆盖**（如 Web3、HPC、视频生成），也亟需**安全与治理增强**，以及**工具链的易用性改进**。

---

## 3. 高潜力待合并 Skills
以下 PR 评论活跃、技术细节清晰，可能近期合并：

- **#1681** - skill-creator 直接执行与路径更新（作者：Kuldeeep18）
  - 修复 `ModuleNotFoundError`，更新 CLI 文档，提升开发体验
- **#1997** - YAML 前置元数据解析修复（作者：BichengWang）
  - 解决字符串截断与转义问题，影响技能评估与描述优化
- **#1792** - DOCX LibreOffice 超时处理（作者：TINGyu123644）
  - 从“静默成功”改为显式错误，增强健壮性
- **#2108** - 文档技能快照状态与同步关系说明（作者：marlonferreira1800-hue）
  - 澄清同步机制，减少用户困惑

---

## 4. Skills 生态洞察
**当前社区在 Skills 层面最集中的诉求是：安全信任边界（如 #492）与工具链健壮性（如 #1681, #1997），同时推动新场景覆盖（Web3、HPC、视频生成）。**

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

**GitHub Copilot CLI 社区动态日报**
**日期**: 2026-11-22
**来源**: github.com/github/copilot-cli

---

### 1. 今日速览
GitHub Copilot CLI 在过去24小时内发布了 **v1.0.115-6** 版本，重点修复了会话插件初始化竞态条件、会话恢复时的权限逻辑以及 Unix 环境下的 Shell 终止问题。社区活跃度持续高企，**权限管理**（特别是持久化权限配置）、**会话管理**（如远程控制、挂起/恢复）以及 **MCP (Model Context Protocol)** 工具集成是当前开发者反馈最集中的三个领域。

---

### 2. 版本发布 (v1.0.115-6)
**发布时间**: 2026-11-21
**更新摘要**:
- **[Fixed]** 修复了插件初始化时的竞态条件，防止新会话被阻塞或现有会话无法恢复。
- **[Fixed]** 修复了 Unix 系统下取消 Shell 命令时的中断问题。
- **[Fixed]** 优化了组织要求插件在策略临时变更后的重试机制，无需等待默认延迟。
- **[Fixed]** 修复了未登录时执行 `/delegate` 命令的行为，现在会提示需要登录。
- **[Fixed]** 修复了在 Windows 上清理 Git 命令、钩子和语言服务器产生的子进程问题。

---

### 3. 社区热点 Issues (Top 10)

**#3192** [OPEN] statusLine.command 不执行或渲染
*   **重要性**: 高 - 影响用户对 CLI 状态栏的自定义体验。
*   **描述**: 当 `footer.showCustom=true` 且设置了自定义命令时，CLI 无法读取配置或执行命令，导致状态栏显示异常。

**#5544** [OPEN] web_fetch 仍拒绝 Surge Fake-IP 地址
*   **重要性**: 极高 - 影响使用 Surge 增强模式的用户访问公共文档。
*   **描述**: 之前的修复未生效，在 CLI 1.0.114 中，`web_fetch` 依然拒绝系统解析为 Fake-IP 的合法域名。

**#5468** [OPEN] GitHub Mobile 和网页端远程控制失败
*   **重要性**: 高 - 阻断跨设备协作。
*   **描述**: 本地会话在 GitHub Mobile 和网页端显示已同步，但无法进行远程控制操作。

**#5549** [OPEN] 添加挂起会话和恢复会话的工具
*   **重要性**: 高 - 核心会话管理功能缺失。
*   **描述**: 目前 CLI 无法将运行中的会话挂起或恢复已保存的会话，限制了 Agent 的资源管理能力。

**#5543** [OPEN] 子代理无法进行多轮对话
*   **重要性**: 中 - 限制 Agent 的复杂任务处理能力。
*   **描述**: 由其他子代理启动的子代理无法进入 background 模式并接收后续消息。

**#5550** [OPEN] gh 在 PATH 时无法读取内置 MCP 工具
*   **重要性**: 高 - 阻断 Agent 访问 GitHub 数据。
*   **描述**: 当系统安装了 `gh` CLI 时，自定义 Agent 无法通过内置 MCP 服务器读取 GitHub Issues 等数据。

**#5541** [OPEN] Agent 在 WSL 中执行危险命令导致数据丢失
*   **重要性**: 极高 - 安全性风险。
*   **描述**: 多行脚本在 PowerShell 传递给 WSL 时出现引号和换行错误，导致 Agent 执行了 `rsync -a --delete /` 等破坏性命令，擦除了用户数据。

**#5539** [OPEN] 权限 UX 过于复杂，需要永久性用户级权限
*   **重要性**: 极高 - 提升易用性痛点。
*   **描述**: 用户希望有一个简单的跨会话规则（如允许访问家目录），而不是每次打开新会话都重复授权。

**#5540** [OPEN] MCP 工具调用未发送 Tasks 增强
*   **重要性**: 中 - 功能完整性问题。
*   **描述**: CLI 声称支持 MCP Tasks，但在调用 `taskSupport: "required"` 的工具时未发送必要的增强数据。

**#5537** [OPEN] 在会话列表中显示 AI Credits 使用量
*   **重要性**: 中 - 用户体验优化。
*   **描述**: 用户希望在不打开会话的情况下，直接在列表中查看每个会话消耗的 AI 积分。

---

### 4. 重要 PR 进展 (Top 10)

**#5548** [OPEN] install.sh: 修正预发布版本的安装逻辑
*   **内容**: 修复了 `VERSION=prerelease` 导致安装旧版本的问题。Git 的版本排序逻辑会导致 Stable Release (`v1.0.114`) 排在 Prerelease (`v1.0.114-0`) 前面，此 PR 修正了排序算法，确保优先安装最新的预发布版本。

**#5310** [OPEN] 修复容器烟雾测试工作区权限
*   **内容**: 修复了 CI 环境下容器用户无法访问临时工作区的问题。通过调整工作区的权限模式，确保容器运行时用户（UID 10001）能够正常初始化 Git。

**#1512** [CLOSED] 更新 README 中的默认模型
*   **内容**: 将文档中的默认模型从 Sonnet 4.5 更新为 Sonnet 4.6，保持文档与最新能力同步。

*(注：本次数据中仅更新了 3 个 PR，其中 2 个为安装逻辑修复，1 个为文档更新)*

---

### 5. 功能需求趋势
从 Issue 趋势分析，社区关注点主要集中在以下三个维度：

1.  **权限与安全**:
    *   **高频需求**: 解决 Agent 执行危险命令（如 WSL `rsync` 误删）的防护机制。
    *   **痛点**: 当前权限确认流程繁琐，缺乏"永久授权"的简单配置方案。
2.  **会话生命周期管理**:
    *   **高频需求**: 实现会话的挂起、恢复和远程控制。
    *   **痛点**: 远程控制（尤其是移动端）功能缺失，会话状态同步与控制分离。
3.  **工具集成与网络**:
    *   **高频需求**: MCP (Model Context Protocol) 的完整集成，特别是 GitHub 数据源的读取能力。
    *   **痛点**: 在特殊网络环境（如 Surge Fake-IP）下工具调用失败。

---

### 6. 开发者关注点
*   **稳定性与容错**: 开发者非常关注 Agent 在复杂脚本和跨环境（WSL/Windows）交互时的稳定性，特别是避免因引号转义错误导致的严重数据丢失。
*   **配置复杂度**: `install.sh` 的版本选择逻辑和 CLI 内部的配置文件读取逻辑被视为需要简化的对象。
*   **多轮对话能力**: Agent 之间的嵌套调用和上下文保持能力是提升自动化效率的关键，目前的实现存在限制。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 (2026-11-22)

**数据来源**: anomalyco/opencode
**生成时间**: 2026-11-22

---

## 1. 今日速览
社区活跃度极高，核心组件 `core` 模块迎来大规模重构与修复，重点解决了工具调用解析、权限管理及 Google Antigravity 提供商集成。同时，桌面端和 TUI 面临多起稳定性问题，包括内存占用过高、会话恢复卡死及 TUI 交互逻辑错误，引发大量用户关注与反馈。

---

## 2. 版本发布
**无新版本发布**。
*(注：社区当前处于密集的 Issue 和 PR 修复阶段，尚未有新版本 Release)*

---

## 3. 社区热点 Issues

**#59387 [zen] Free tier issues: read this first, then post your report here**
- **重要性**: 🔥 **最高热度**。作为免费层级问题的总入口，收到 405 条评论，反映了大量用户对免费额度耗尽或重置失效的困扰。
- **摘要**: 集中处理 `Free usage exceeded`、`Free usage limit reached` 等提示信息及重置逻辑问题。

**#65371 [CLOSED] Server dies with V8 heap OOM (SIGABRT) while session warming is active**
- **重要性**: ⚠️ **稳定性严重故障**。导致服务器频繁崩溃。
- **摘要**: 开发者在开启 `warming` 模式时，服务器遭遇 4 次 JavaScript 堆内存溢出 (OOM)，导致服务中断。

**#65496 [OPEN] [BUG]: RAM Usage Through the Roof**
- **重要性**: ⚠️ **性能瓶颈**。用户反馈 CLI 内存占用过高，严重影响使用体验。
- **摘要**: 在 OpenCode v2.2.5 中，CLI 被指消耗过多 RAM，用户认为这不符合其作为 API 薄包装器的定位。

**#65438 [OPEN] shell: background tool part keeps status "running" after its completion notice**
- **重要性**: 🐛 **TUI 逻辑 Bug**。影响后台任务状态展示。
- **摘要**: Shell 调用完成后，在持久化的工具部分中状态卡在 "running"，导致用户无法正确看到任务结束。

**#65456 [OPEN] tui: Escape stops dismissing dialogs and composer**
- **重要性**: 🐛 **交互体验问题**。严重影响 TUI 使用。
- **摘要**: 在 V2 TUI 中，Esc 键失效，导致命令面板和子代理编辑器无法关闭，严重影响操作效率。

**#65400 [OPEN] V1→V2 migration silently drops prompt caching for OpenAI-compatible Claude endpoints**
- **重要性**: 🐛 **配置兼容性 Bug**。影响成本控制和配置迁移。
- **摘要**: 从 V1 迁移到 V2 时，OpenAI 兼容端点的 Prompt 缓存控制 (`cache_control`) 被静默丢弃，导致每次轮次都按未缓存计算费用。

**#65473 [OPEN] mcp: remote server fails with 'Unexpected content type: null' when a server returns 202**
- **重要性**: 🐛 **MCP 协议兼容性**。影响工具集成。
- **摘要**: MCP 服务器返回标准 HTTP 202 Accepted 时，OpenCode 报错 `Unexpected content type: null`，导致连接失败。

**#65447 [CLOSED] Subagent silently retries a connection-refused provider for ~80 s (10 doomed backoff attempts)**
- **重要性**: 🐛 **错误处理机制**。改进了连接失败的反馈速度。
- **摘要**: 子代理在遇到 `ECONNREFUSED` 时会进行长达 80 秒的死循环重试，现已修复，能更快暴露错误。

**#48411 [OPEN] [FEATURE]: Better execution permissions and sandboxing**
- **重要性**: 🚀 **安全功能需求**。社区持续关注沙箱隔离。
- **摘要**: 建议改进权限模式访问方式及沙箱隔离机制，防止 Agent 在无提示下执行破坏性命令。

**#65248 [CLOSED] Interactive TUI silently allows `ask` permissions; the same rule creates a real request for `opencode run`**
- **重要性**: 🐛 **权限逻辑不一致**。修复了交互式会话中权限请求被忽略的问题。

---

## 4. 重要 PR 进展

**#65494 [OPEN] fix(core): run calls renamed into Code Mode and follow a renamed execute**
- **进展**: 修复了工具调用名称解析逻辑，将 `bash` 别名修复回输入修复插件，解决了相关的两个 Bug。
- **状态**: 代码重构与 Bug 修复。

**#65467 [OPEN] fix(core): never save a bare escalation wildcard from Always allow**
- **进展**: 修复了 "Always allow" 点击时的逻辑漏洞，防止保存错误的通配符权限规则。
- **状态**: 安全性修复。

**#65489 [OPEN] feat(core): add the Google Antigravity provider**
- **进展**: 实现了 Google Antigravity 认证提供商，作为对之前 Google OAuth 功能的补充。
- **状态**: 新功能实现。

**#65261 [OPEN] [contributor] feat(core): agent widgets**
- **进展**: 引入了 Agent Widgets 功能，允许在会话中展示 PsychoScript 模板和 JSON 数据，提升交互性。
- **状态**: 新功能实现。

**#65472 [OPEN] fix(core): spell Claude variants for Bedrock application inference profile ARNs**
- **进展**: 修复了 AWS Bedrock 上 Claude 变体的拼写错误，确保能正确识别模型 ID。
- **状态**: Bug 修复。

**#65492 [OPEN] fix(core): disable Copilot PDF input on /chat/completions**
- **进展**: 修复了路由错误，防止 Copilot 模型在特定端点接收 PDF 输入时触发 HTTP 400 错误。
- **状态**: Bug 修复。

**#65493 [CLOSED] fix(codemode): show pinned tools' full descriptions in the catalog**
- **进展**: 修复了代码模式目录中工具描述被截断的问题，现在能完整显示工具描述。
- **状态**: 代码质量改进。

**#63982 [CLOSED] feat(core): add configurable editing tool selection**
- **进展**: 实现了可配置的编辑工具选择逻辑，允许用户自定义使用 `patch`、`edit` 或 `write` 工具。
- **状态**: 功能已合并。

**#65487 [CLOSED] test(core): remove a duplicate Agent import**
- **进展**: 清理了测试文件中的重复导入，提升了代码整洁度。
- **状态**: 代码清理。

**#61478 [CLOSED] feat(i18n): finish the German dictionary**
- **进展**: 完成了德语字典的翻译工作，丰富了国际化支持。
- **状态**: 国际化功能已合并。

---

## 5. 功能需求趋势

1.  **安全与沙箱隔离**:
    *   **关键词**: `permissions`, `sandboxing`, `subagent`, `plan mode`
    *   **趋势**: 开发者极度关注 Agent 在计划模式下是否越权执行命令（如 Issue #53955），以及对更细粒度的权限控制需求（Issue #48411）。

2.  **桌面端稳定性与体验**:
    *   **关键词**: `Desktop`, `SQLite`, `RAM usage`, `TUI`
    *   **趋势**: 反馈集中在 Windows 平台的桌面应用性能（高内存占用）、睡眠恢复后的服务卡死（SQLite I/O 错误）以及 TUI 交互的按键响应问题。

3.  **提供商与模型支持**:
    *   **关键词**: `Mistral`, `Google Antigravity`, `MCP`, `Claude`
    *   **趋势**: 社区积极请求新的模型提供商（如 Google Antigravity）和 MCP (Model Context Protocol) 集成，同时对特定模型（如 GLM-5.x）的兼容性 Bug 保持高度关注。

4.  **配置迁移与兼容性**:
    *   **关键词**: `V1→V2 migration`, `prompt caching`, `free tier`
    *   **趋势**: 随着向 V2 迁移，用户担心配置丢失（如 Prompt Caching 被丢弃）以及免费层级的计费/重置逻辑异常。

---

## 6. 开发者关注点

*   **性能优化**: 开发者强烈抱怨 CLI 的内存占用过高，认为这违背了工具轻量化的初衷。
*   **错误反馈机制**: 多个 Issue 指出系统在遇到错误（如连接被拒绝、供应商挂起）时反馈过于静默，导致用户长时间不知道发生了什么。
*   **工具交互逻辑**: 需求集中在改进 Agent 与用户交互的方式，包括更清晰的权限请求、工具描述的完整性展示以及后台任务的状态管理。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-11-22)

**发布时间**: 2026-11-22  
**分析工具**: GitHub API (earendil-works/pi)  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
过去24小时社区活动平稳，**12个 Issue 被关闭**，主要集中在 **UI/UX 交互细节**（如 Dock 高度变化、图片渲染）以及 **上下文管理机制**（如摘要预算调整）。同时，社区对 **MCP 服务器** 和 **OpenAI 提供商** 的稳定性反馈活跃。无新版本发布。

---

## 2. 版本发布
*   **无新版本发布**

---

## 3. 社区热点 Issues (Top 10)

**1. #11021 [OPEN] ChatGPT 登录后上下文窗口显示错误**
*   **重要性**: 🔴 高
*   **摘要**: 使用 ChatGPT 登录时，Pi 1.3.0 报告的 `gpt-6.1-sol` 上下文窗口仅为 272K，而服务器实际广告为 500K。这导致 Pi 拥有比服务器承诺更小的上下文压缩预算。
*   **社区反应**: 获得 8 个点赞，关注模型兼容性准确性。

**2. #12238 [OPEN] Headless 模式下 stdio MCP 服务器挂起进程**
*   **重要性**: 🔴 高
*   **摘要**: 在 `pi -p` (headless) 模式下，如果 stdio MCP 服务器保持连接，Pi 进程会挂起直到被手动终止。
*   **社区反应**: 3 个评论，影响开发者自动化工作流。

**3. #12165 [OPEN] searchTools 耗费大量上下文**
*   **重要性**: 🟠 中
*   **摘要**: 在一次长会话中，`searchTools` 调用了 73 次，消耗了约 950KB 的上下文，占整个线程的 25%。原因是 `discover()` 返回了完整的工具描述。
*   **社区反应**: 2 个评论，关注性能优化。

**4. #12242 [OPEN] 摘要膨胀问题**
*   **重要性**: 🟠 中
*   **摘要**: 在长会话中，摘要字符数从 17k 膨胀至 164k，第九次压缩耗时 588 秒。提示词要求“保留所有信息”可能是导致膨胀的原因。
*   **社区反应**: 2 个评论，关注持久化存储效率。

**5. #12156 [OPEN] codemode schemaToType 忽略数组限制**
*   **重要性**: 🟠 中
*   **摘要**: 在渲染数组时，`schemaToType` 方法忽略了数组项的限制，仅显示了数组本身的限制，可能导致生成的类型定义不准确。

**6. #8834 [CLOSED] 选项性包命名空间**
*   **重要性**: 🟡 中
*   **摘要**: 建议在 package.json 中添加 `pi.namespace` 字段，用于统一管理 skills 和 prompt templates 的加载路径。
*   **社区反应**: 17 个评论，已关闭但无操作，可能被合并。

**7. #7885 [CLOSED] npm search 索引问题**
*   **重要性**: 🟡 中
*   **摘要**: 自 8 月 4 日以来新发布的包未被 npm search 索引，导致 pi.dev 画廊无法显示。
*   **社区反应**: 18 个评论，已关闭。

**8. #12389 [CLOSED] TUI 未闭合的 "$" 导致文本渲染错误**
*   **重要性**: 🟢 低 (UI Bug)
*   **摘要**: 当回复包含货币符号如 "+$50" 时，段落中后续的粗体文本会变成原始 markdown (`**text**`)，直到流结束。
*   **社区反应**: 1 个评论。

**9. #12387 [CLOSED] 扩展工具名冲突处理**
*   **重要性**: 🟢 低 (架构)
*   **摘要**: 当两个扩展注册相同的工具名时，Pi 原本会失败。修复方案是检测碰撞，并将它们注册为 `<plugin>__<tool>` 格式，而不暴露裸名给模型。

**10. #12384 [CLOSED] 多张图片在工具结果中堆叠**
*   **重要性**: 🟢 低 (UI Bug)
*   **摘要**: 当单个工具结果包含多张图片时，所有图片会堆叠在同一个锚点，覆盖聊天记录。单张图片单独显示则正常。

---

## 4. 重要 PR 进展 (Top 10)

**1. #12380 [CLOSED] fix(durable): 调整压缩摘要预算计算逻辑**
*   **内容**: 修改了 `CompactionTask` 的输出大小计算方式。从固定的 `0.8 × reserveTokens` 改为 `max(1, min(10% × contextWindow, model.maxTokens))`。这确保了摘要预算与模型上下文窗口更好地对齐。

**2. #12378 [CLOSED] fix(coding-agent): 修复基于使用量估算的上下文计算**
*   **内容**: 修复了 `estimateProjectedContextTokens` 函数。之前任何比当前助手回复更新的 `context_edit`（包括压缩）都会丢弃 provider 测量的使用量估算。现在仅在编辑仅用于恢复失败的溢出尝试时才丢弃。

**3. #12382 [CLOSED] isContextOverflow 错误码处理优化**
*   **内容**: 修复了 `NON_OVERFLOW_PATTERNS` 正则表达式。之前仅排除 "rate limit" 等模式，现在新增了对 429/5xx/Quota 错误的正确分类，不再将其误判为上下文溢出。

**4. #12381 [CLOSED] durable: 固定压缩摘要预算**
*   **内容**: 修复了 `CompactionSettings.reserveTokens` 的双重用途问题。确保摘要预算不会超过模型自身的输出限制，无论上下文窗口大小如何。

**5. #12376 [CLOSED] pi-ai 错误码报告修复**
*   **内容**: 修复了某些 HTTP 错误码未正确报告的问题，这对于扩展开发者诊断和教育工作流至关重要。

**6. #12377 [CLOSED] feat(coding-agent): 添加只读 /context 检查器**
*   **内容**: 新增 `/context` 命令，允许用户查看会话中 tokens 的详细分布（系统提示、工具、历史记录等），解决了长会话难以监控的问题。

**7. #12379 [CLOSED] Anthropic 目录模型标签修复**
*   **内容**: 修复了目录中将 4.5 别名标记为 "(latest)" 的问题，导致用户可能选择过时的模型。

**8. #12386 [CLOSED] SessionManager 磁盘写入修复**
*   **内容**: 修复了当写入因磁盘空间不足（ENOSPC/EDQUOT）被截断后，同一进程内的下一次追加操作会错误地粘附到上一个片段上，导致数据丢失的问题。

**9. #12388 [CLOSED] prepareArguments 返回值优化**
*   **内容**: 修改了 `prepareArguments` 的行为，允许抛出包含完整工具结果的错误，而不是将其转换为无详情的错误对象。

**10. #12383 [CLOSED] Kimi 会话恢复工具选择问题**
*   **内容**: 修复了在恢复 Kimi 会话时，无法选择 provider payload 中存在的工具的问题。

---

## 5. 功能需求趋势

1.  **上下文管理与压缩优化**: 多个 Issue (#12165, #12242, #12381) 提及了上下文膨胀和压缩效率问题。社区希望更精细的预算控制（如 10% 规则）和更高效的摘要策略。
2.  **UI/UX 细节打磨**: 多个 Bug 反馈集中在 TUI 渲染、图片布局和 Dock 交互上 (#12389, #12384, #12368)。开发者对体验的稳定性要求提高。
3.  **模型兼容性与配置**: 针对特定模型（如 GPT-6.1, Claude 4.5）的配置准确性以及错误码报告的完整性是高频需求。

---

## 6. 开发者关注点

*   **Headless 模式的稳定性**: `pi -p` 模式下 MCP 服务器连接导致的进程挂起是一个阻碍自动化的严重痛点。
*   **扩展开发体验**: 扩展开发者需要更清晰的错误反馈（如 #12376）和更完善的文档/工具支持。
*   **会话持久化**: 在磁盘空间受限环境下的写入安全性和数据完整性是关键关注点。

---
**数据来源**: [github.com/badlogic/pi-mono](https://github.com/badlogic/pi-mono)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 (2026-11-22)

## 1. 今日速览
今日发布版本 **v0.28.3**，重点修复了 Web Shell 的任务管理体验（支持暂停任务创建、显示负载条）并增强了 Web Shell 的交互功能（支持移动端触摸建议、改进会话反馈保存）。社区方面，尽管整体活跃度高，但 **Main CI** 仍存在大量失败，主要集中在 Managed Agent 和 E2E 测试的不稳定性上，尤其是重启恢复测试的抖动问题。同时，关于 **权限管理（UNC 路径）** 和 **主题命令** 的功能需求正在积极讨论中。

---

## 2. 版本发布
**v0.28.3**
*   **Web Shell 体验增强**：在 Web Shell 侧边栏新增负载预警条，当守护进程过载时会自动暂停任务创建并提示原因。
*   **移动端交互优化**：Web Shell 支持在移动端触摸输入框时直接接受建议内容，简化了手机操作流程。
*   **测试稳定性改进**：修复了 `qwen serve` 重启恢复测试中的随机失败问题，并改进了媒体引用拒绝消息的命名。

---

## 3. 社区热点 Issues
以下是过去 24 小时内评论数最多且最值得关注的 Issue：

1.  **Main CI 失败：Managed Agent Gate** ([#14724](https://github.com/QwenLM/qwen-code/issues/14724))
    *   **重要性**：极高。该 Issue 跟踪了主分支 CI 持续失败，且没有测试结果识别的问题，影响开发效率。
2.  **Main CI 失败：E2E 测试** ([#11680](https://github.com/QwenLM/qwen-code/issues/11680))
    *   **重要性**：高。E2E 测试是产品质量的最后一道防线，持续失败表明可能存在严重的集成问题。
3.  **Main CI 失败：Qwen Code CI** ([#11678](https://github.com/QwenLM/qwen-code/issues/11678))
    *   **重要性**：高。涉及 Windows 环境下的测试失败，需要跨平台兼容性修复。
4.  **Subagent 后台任务通知缺失** ([#15748](https://github.com/QwenLM/qwen-code/issues/15748))
    *   **重要性**：中。这是一个架构/UX 问题，子 Agent 启动后台任务时仅通知顶层 Agent，可能导致内存溢出或混淆。
5.  **qwen serve SSE 耗尽与端口重复** ([#17479](https://github.com/QwenLM/qwen-code/issues/17479))
    *   **重要性**：中高。描述了守护进程存活但不可达的严重 Bug，可能导致服务完全不可用。
6.  **true "disable auto-compaction" 开关** ([#12597](https://github.com/QwenLM/qwen-code/issues/12597))
    *   **重要性**：中。这是一个配置需求，用户希望完全控制内存压缩策略，避免误操作。
7.  **Windows UNC 路径权限规则保存错误** ([#18059](https://github.com/QwenLM/qwen-code/issues/18059))
    *   **重要性**：中。Windows 网络路径和 WSL 路径的权限规则保存错误，影响文件访问控制。
8.  **iOS Safari 键盘遮挡问题** ([#17859](https://github.com/QwenLM/qwen-code/issues/17859))
    *   **重要性**：低。移动端 UI 细节 Bug，影响特定设备体验。
9.  **共享工作区与 Git Worktree 的内存共享** ([#18030](https://github.com/QwenLM/qwen-code/issues/18030))
    *   **重要性**：中。关于项目自动记忆在多工作区间的共享策略，涉及架构设计。
10. **/theme 命令参数支持** ([#18061](https://github.com/QwenLM/qwen-code/issues/18061))
    *   **重要性**：低。CLI 交互体验优化，目前 `/theme` 后的参数被忽略。

---

## 4. 重要 PR 进展
以下是过去 24 小时内活跃的重要 PR：

1.  **feat(web-shell): 暂停任务创建并显示过载条** ([#18054](https://github.com/QwenLM/qwen-code/pull/18054))
    *   **内容**：在 Web Shell 任务侧边栏直接反映守护进程负载状态，当过载时阻止新建任务。
2.  **test(cli): 修复 SIGKILL 重启恢复测试** ([#18057](https://github.com/QwenLM/qwen-code/pull/18057))
    *   **内容**：通过增加等待条件，使测试在杀死守护进程前确保提示持久化，解决随机失败问题。
3.  **fix(cli): 保留 Ink 历史记录中的粘贴文本** ([#18032](https://github.com/QwenLM/qwen-code/pull/18032))
    *   **内容**：修复剪贴板粘贴内容在历史记录回溯时丢失的问题，确保发送原始内容。
4.  **fix(permissions): 保留 UNC 路径根目录** ([#18060](https://github.com/QwenLM/qwen-code/pull/18060))
    *   **内容**：修复 Windows 下 "Always Allow" 网络路径规则保存错误，确保规则能正确匹配文件。
5.  **fix(web-shell): 保存并发会话的反馈** ([#18026](https://github.com/QwenLM/qwen-code/pull/18026))
    *   **内容**：修复保存助手评分时，可能覆盖其他会话或旧会话反馈的问题。
6.  **feat(cli): /theme 命令支持参数** ([#18062](https://github.com/QwenLM/qwen-code/pull/18062))
    *   **内容**：让 `/theme <name>` 直接切换主题，类似 `/model` 命令的使用体验。
7.  **feat(cli): 属性化 Managed Agent 会话** ([#18022](https://github.com/QwenLM/qwen-code/pull/18022))
    *   **内容**：在遥测数据中区分 Managed Agent 会话和普通守护进程流量，便于分析。
8.  **test(web-shell): 增强工件面板测试** ([#17783](https://github.com/QwenLM/qwen-code/pull/17783))
    *   **内容**：增加 DOM 测试用例，修复工件列表展示的序列化/反序列化问题。
9.  **fix(core): 修复媒体拒绝消息中的模型名称** ([#16185](https://github.com/QwenLM/qwen-code/pull/16185))
    *   **内容**：改进无法接受图片/音频时的错误提示，明确指出是哪个模型拒绝的。
10. **feat(i18n): 添加阿拉伯语支持** ([#17437](https://github.com/QwenLM/qwen-code/pull/17437))
    *   **内容**：为 CLI 和 Web Shell 添加 RTL（从右到左）布局支持。

---

## 5. 功能需求趋势
从 Issue 和 PR 分析，当前社区关注点主要集中在以下几个方向：

*   **测试稳定性与 CI 质量**：大量 Issue 聚焦于 `Main CI` 失败和测试抖动。社区迫切需要一个稳定、快速的 CI 流程，特别是针对重启恢复、并行任务处理的测试。
*   **移动端与跨平台体验**：Web Shell 的 iOS 键盘问题、移动端触摸交互、以及 Windows UNC 路径权限问题，显示出用户正在使用非标准环境（移动设备、WSL、网络路径）。
*   **权限与安全模型**：改进文件访问权限的保存规则（特别是网络路径）和记忆管理（Auto Memory）的共享策略，反映了用户对数据安全和上下文管理的需求。
*   **CLI 交互增强**：社区希望 CLI 命令更加直观，例如 `/theme` 参数化、历史记录粘贴保留等，以提升命令行工具的可用性。

---

## 6. 开发者关注点
*   **CI 阻塞**：Main CI 的持续失败是当前最大的痛点，许多开发者可能无法顺利合并代码。
*   **Daemon 崩溃/不可达**：`qwen serve` 在特定场景下（如长时间运行、SSE 耗尽）表现出的不可达性，是导致用户体验下降的关键因素。
*   **工作区记忆管理**：如何在多个 Git Worktree 之间共享上下文记忆，是一个需要架构设计来解决的复杂问题。
*   **自动化测试维护**：大量的 `deflake`（去抖动） PR 表明，开发者正在投入大量精力来维护测试套件的稳定性。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报**  
*2026‑11‑22*  

---

## 1. 今日速览
- TUI 核心层面的多项 bug 修复（粘贴截断、卡片渲染、运行时状态分类）在最近的 PR 中陆续合并，提升了交互可靠性。  
- 社区对 Windows 环境的兼容性（中文输入法、/undo 命令）以及执行策略（execpolicy）安全性仍然聚焦，相关 Issue 讨论活跃。

---

## 2. 版本发布  
> **无**（过去 24 h 内暂无新 Release）

---

## 3. 社区热点 Issues（挑选 10 条）

| # | 标题 / 关键标签 | 重要性阐述 | 社区反应（评论 / 👍） | 链接 |
|---|----------------|-----------|----------------------|------|
| 6970 | **bug** · os:windows · v0.10.3 – `/undo` 触发严重错误 | 影响 Windows 用户的撤销功能，直接导致会话不可恢复，属于阻断性缺陷。 | 8 条评论，讨论修复方案，暂无赞。 | https://github.com/codewhale-hq/Codewhale/issues/6970 |
| 7279 | **help wanted** · good first issue · area:sandbox · v0.10.3 – ACP 接入 | 目标把已安装的多模型代理（Claude Code、Codex、Kimi 等）封装为 Codewhale 会话，打开插件化生态的关键入口。 | 7 条评论，热度高，期待社区贡献。 | https://github.com/codewhale-hq/Codewhale/issues/7279 |
| 2323 | **bug** · area:localization · area:tui · os:windows – 中文输入法未适配 | 中文输入时提示消失、拼音误写等问题，直接影响国内用户体验。 | 7 条评论，1 赞，已提出 UI 与输入法层面改进建议。 | https://github.com/codewhale-hq/Codewhale/issues/2323 |
| 7403 | **bug** · area:tui – 粘贴阈值 64 KiB 静默截断 | 大块粘贴（尤其 CJK）会被裁剪，导致数据丢失，影响编辑效率。 | 2 条评论，已引发后续 PR（#7444）验证。 | https://github.com/codewhale-hq/Codewhale/issues/7403 |
| 7454 | **area:tui, area:core** – “live reasoning card” 位置错位 | 推理卡片在工具卡之上不断增长，破坏交互顺序，属于 UI 关键 bug。 | 0 评论，已被标记为高优先级。 | https://github.com/codewhale-hq/Codewhale/issues/7454 |
| 7401 | **bug** · area:sandbox – execpolicy 动态 flag 替换隐藏 payload | 动态 flag 替换导致安全策略失效，潜在风险大。已在 PR 中修复（#7424），但仍需社区确认。 | 0 评论，已关闭。 | https://github.com/codewhale-hq/Codewhale/issues/7401 |
| 7411 | **area:sandbox** – 未建模的执行器 (oc、vagrant、op…) | 执行器绕过 deny‑rule，安全审计缺口。已在 PR（#7425）中加入模型。 | 0 评论，已关闭。 | https://github.com/codewhale-hq/Codewhale/issues/7411 |
| 7415 | **execpolicy** – tmux 额外执行动词未建模 | 同上，涉及常用 tmux 操作，影响企业内部脚本安全。 | 0 评论，已关闭。 | https://github.com/codewhale-hq/Codewhale/issues/7415 |
| 7408 | **execpolicy** – 整词动态 flag 绕过扫描 | 动态生成的完整 flag/verb 被安全扫描忽略，潜在攻击向量。 | 0 评论，已关闭。 | https://github.com/codewhale-hq/Codewhale/issues/7408 |
| 7416 | **execpolicy** – stdin_piped 标记误判 | 细粒度管道标记错误会导致误拦或漏拦，影响策略准确性。 | 0 评论，已关闭。 | https://github.com/codewhale-hq/Codewhale/issues/7416 |

> **挑选原则**：兼顾阻断性 bug、跨平台兼容、核心安全（execpolicy）以及对中文用户的本地化需求。

---

## 4. 重要 PR 进展（挑选 10 条）

| # | PR 标题 / 关键标签 | 功能/修复要点 | 影响范围 | 链接 |
|---|-------------------|--------------|----------|------|
| 7455 | **bug** · area:tui – “open a new reasoning card below a tool” | 修正 `ActiveCell` 渲染顺序，使新推理卡始终位于后续工具卡之后。 | TUI 交互一致性 | https://github.com/codewhale-hq/Codewhale/pull/7455 |
| 7452 | **bug** · area:tui – “keep a streamed delta in the cell its own kind owns” | 防止跨块文本流混乱，保证同类型块内部增量正确归属。 | 连续流式推理/代码生成 | https://github.com/codewhale-hq/Codewhale/pull/7452 |
| 7451 | **bug** · area:tui·core – “session switch adopt populated Runtime store” | 支持在切换会话时保留已有运行时历史，提升多任务切换体验。 | 多会话工作流 | https://github.com/codewhale-hq/Codewhale/pull/7451 |
| 7449 | **bug** · area:tui·core – “compact diagnostic late‑usage receipts” | 诊断日志不再占满 1 MiB 边界，防止因日志写入失败导致功能中断。 | 稳定性 / 日志系统 | https://github.com/codewhale-hq/Codewhale/pull/7449 |
| 7448 | **area:tui·core** – “Show request transmission on provider errors” | 将底层请求信息保留在错误历史，便于调试 LLM 提供商错误。 | 错误可观测性 | https://github.com/codewhale-hq/Codewhale/pull/7448 |
| 7444 | **test** · area:tui – “guard all four paste‑burst chunk‑flush sites” | 完整覆盖粘贴块的四个 flush 点，防止 #7403 中的字符丢失问题再次出现。 | 粘贴可靠性 | https://github.com/codewhale-hq/Codewhale/pull/7444 |
| 7445 | **enhancement** · area:localization·plugins·ci·core – “feat(ci): add maintainer gate and regression stage” | 引入 CI 维护者门禁与回归阶段，提升代码审查质量与安全。 | CI 流程 | https://github.com/codewhale-hq/Codewhale/pull/7445 |
| 7447 | **cleanup** – “chore(catalog): refresh Models.dev offline seed” | 自动刷新离线模型目录，确保 `/models` 页面及时展示新模型。 | 模型生态 | https://github.com/codewhale-hq/Codewhale/pull/7447 |
| 7446 | **performance** · area:core – “cache the item index across processes” | 跨进程共享索引缓存，显著降低首次加载时的磁盘 I/O。 | 启动性能 | https://github.com/codewhale-hq/Codewhale/pull/7446 |
| 7424 | **bug** · area:sandbox – “propagate flag‑word dynamic bit on nix and launcher flags” | 修复动态 flag 在 nix、其他 launcher 中未标记的问题，提升 execpolicy 的安全覆盖。 | 安全策略 | https://github.com/codewhale-hq/Codewhale/pull/7424 |

> **挑选原则**：涵盖 TUI 交互修复、运行时状态管理、日志与错误可观测性、CI/安全策略以及性能提升等核心维度。

---

## 5. 功能需求趋势

| 趋势 | 体现的 Issue / PR | 说明 |
|------|-------------------|------|
| **跨平台兼容（尤其 Windows）** | #6970、#2323、#7279、#7403 | 中文输入法、粘贴截断、撤销命令等在 Windows 上表现不佳。 |
| **执行策略安全（execpolicy）深化** | #7401、#7411、#7415、#7408、#7416 以及对应 PR #7424‑#7429 | 社区持续关注动态 flag、管道标记、未建模的 launcher/verb，以防止策略绕过。 |
| **TUI 交互与可视化** | #7454、#7403、#7455‑#7452‑#7444 | 推理卡、粘贴、流式增量等 UI 细节被大量报告并快速修复。 |
| **本地化与中文友好** | #2323、#7455（中文提交） | 输入法兼容、错误信息本地化成为热点。 |
| **模型/提供商生态扩展** | PR #7450（LLMTR 支持） | 新的 OpenAI‑兼容提供商接入，体现对多模型生态的需求。 |
| **CI/质量门禁** | PR #7445 | 引入维护者门禁与回归阶段，显示对代码质量、审计合规的重视。 |

---

## 6. 开发者关注点（痛点 & 高频需求）

1. **Windows 兼容性**：中文输入法、粘贴、撤销等核心交互在 Windows 上频繁失效，导致本地用户工作流受阻。  
2. **安全执行策略**：动态生成的 flag/verb、管道标记等细节仍可逃逸 deny‑rule，社区要求更细粒度的模型与审计。  
3. **UI 稳定性**：推理卡片、粘贴块、流式增量的渲染顺序错误会直接影响使用感受，开发者期望“一次性”修复而非临时补丁。  
4. **多模型集成**：对 ACP 接口的期待以及新增 OpenAI‑兼容提供商（如 LLMTR）表明用户希望在同一 TUI 中自由切换不同模型。  
5. **性能启动**：跨进程缓存、日志压缩等改进被高度赞赏，说明启动与运行时的性能仍是关键关注点。  
6. **本地化**：提示隐藏、拼音误写等问题凸显中文用户体验仍有提升空间，期待官方提供更完整的本地化支持。  

---

**结语**  
今天的社区活动表明，DeepSeek TUI 正在快速迭代关键 UI 与安全功能，且对 Windows 用户的兼容性与本地化需求给予了显著关注。随着 execpolicy 的持续加固和模型生态的扩展，后续版本有望在安全、性能与跨平台体验上实现更大突破。  

---  

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*