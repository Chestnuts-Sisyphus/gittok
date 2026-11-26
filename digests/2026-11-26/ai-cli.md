# AI CLI 工具社区动态日报 2026-11-26

> 生成时间: 2026-11-26 02:33 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告**  
*数据截至 2026‑11‑26，来源：anthropics/skills（官方 Skills 仓库）*  

---

## 1️⃣ 热门 Skills 排行（评论/关注度最高的 PR）  

| 排名 | PR 编号 & 链接 | 关键功能 | 社区讨论焦点 | 当前状态 |
|------|----------------|----------|--------------|----------|
| 1 | **#1742** – [fix(mcp-builder): support mcp≥2 streamable_http_client import and custom headers](https://github.com/anthropics/skills/pull/1742) | 兼容 MCP 2+ 版本的 `streamable_http_client`，并在 `create_mcp_http_client` 中统一自定义 HTTP 头部配置 | 迁移成本、向后兼容性、对已有 MCP‑based Skill 的影响 | **Open** |
| 2 | **#1245** – [Add notion‑spec‑to‑implementation & quantitative‑resume‑auditor skills](https://github.com/anthropics/skills/pull/1245) | 将 Notion 需求规格自动转化为实现任务（拆解、验收标准、进度追踪）；简历量化审计（结构化评分） | 能否覆盖多种 Notion 模板、审计结果的可解释性 | **Open** |
| 3 | **#1771** – [feat(skills): add proofcore‑contract‑auditor for smart contract notarization](https://github.com/anthropics/skills/pull/1771) | 静态分析 Solidity / Rust 合约并将零知识审计证明写入 TON 区块链 | 安全性、链上证明的成本与延迟、对不同链的适配性 | **Open** |
| 4 | **#1703** – [Add md2video‑audio skill](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 文档直接编译为带真人语音的 MP4 视频（Marp + TTS） | 视频质量、语音自然度、对大文件的渲染时长 | **Open** |
| 5 | **#525** – [Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525) | 提供完整的 Pyxel 游戏开发、调试、帧检视与状态验证工作流 | 教学材料完整度、跨平台运行（Linux/Windows/macOS） | **Open** |
| 6 | **#514** – [Add document‑typography skill](https://github.com/anthropics/skills/pull/514) | 自动纠正常见排版问题（孤行、寡句、编号错位）以提升 AI 生成文档的可读性 | 与现有文档生成 Skill 的集成方式、对多语言支持的需求 | **Open** |
| 7 | **#1980** – [webapp‑testing: avoid shell=True in with_server.py](https://github.com/anthropics/skills/pull/1980) | 移除 `shell=True`，防止命令注入（CWE‑78） | 安全审计、对已有测试脚本的兼容性 | **Open** |
| 8 | **#1792** – [fix(docx): report LibreOffice timeout as an error and verify the output](https://github.com/anthropics/skills/pull/1792) | DOCX 修订接受脚本在超时或输出异常时返回错误 | 稳定性提升、错误信息可观测性 | **Open** |

> **为什么这些 PR 热度最高？**  
> - **跨领域需求**（文档、代码审计、Web App 测试、媒体生成）覆盖了企业与创意两大用户群。  
> - 多数 PR 解决了**安全/兼容性**痛点，直接关系到生产环境的可靠运行。  
> - 许多 PR 引入了**全新业务场景**（如 Notion‑to‑Implementation、智能合约审计），激发社区对“端到端自动化”的期待。

---

## 2️⃣ 社区需求趋势（从 Issues 中提炼的热点方向）

| 需求方向 | 代表 Issue（链接） | 关键诉求 |
|----------|-------------------|----------|
| **Skill 发布与信任治理** | #492 – *Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse* (46 评论) | 防止社区技能冒充官方技能；建立命名空间或签名机制，提升供应链安全。 |
| **组织内部共享 & 复用** | #228 – *Enable org‑wide skill sharing in Claude.ai* (17 评论) | 一键共享、集中管理组织内部 Skill，免去手动下载/上传流程。 |
| **评估与触发率可靠性** | #556 – *run_eval.py: claude -p never triggers skills/commands* (13 评论) <br> #1352 – *run_eval.py parallel workers cross‑match skill UUIDs, producing false‑negative trigger rates* (6 评论) | 评估框架不稳定导致触发率几乎为 0，需修复评估脚本并提供可靠的触发率统计。 |
| **文档与示例去重、内容一致性** | #189 – *document-skills and example-skills plugins install identical content* (6 评论) | 防止插件之间的 Skill 重复，保持插件职责单一。 |
| **大模型上下文消耗优化** | #1487 – *claude‑api skill eagerly injects ~156k tokens, exhausting the context window* (5 评论) | 减少工具调用时的 token 注入量，避免一次调用耗尽上下文。 |
| **跨平台运行与错误恢复** | #202 – *skill‑creator should be updated to best practice* (8 评论) | 改进 `skill‑creator` 的文档与实现，使其更贴合生产环境的 token 效率与错误恢复需求。 |
| **功能扩展提案** | #1329 – *compact‑memory (symbolic notation for compact agent state)* (10 评论) <br> #1385 – *Reasoning Quality Gate Pipeline* (8 评论) | 新的记忆压缩表示、质量把关流水线，体现对**推理质量与长期记忆**的关注。 |

**总体趋势**：  
- **安全与信任**（命名空间、签名、避免注入）是最大焦点。  
- **组织协作**（共享库、统一管理）需求强烈。  
- **评估可靠性**与**上下文效率**是使用体验的关键痛点。  
- 社区正积极探索**高级工作流**（质量门、记忆压缩）以及**跨领域自动化**（文档、代码、媒体）。

---

## 3️⃣ 高潜力待合并 Skills（评论活跃且仍为 Open 的 PR）

| PR 编号 & 链接 | 主要价值 | 社区关注点 | 预计落地时间（依据活跃度） |
|---------------|----------|------------|----------------------------|
| **#1742** – *mcp‑builder compatibility* | 解决 MCP 2+ 与旧 Skill 的兼容问题，保障大量企业用户的迁移路径。 | 向后兼容、对现有 MCP‑based Skill 的零破坏升级。 | 1‑2 周（已提交两周内多次更新） |
| **#1245** – *Notion‑spec‑to‑implementation* | 将需求文档直接转化为实现任务，极大缩短需求‑实现闭环。 | 支持多模板、生成的任务可追溯性。 | 2‑3 周（已获 10+ 条评审评论） |
| **#1771** – *proofcore‑contract‑auditor* | 为 Web3 开发者提供链上审计证明，填补安全审计在 Skills 生态的空白。 | 费用模型、跨链适配、审计结果可验证性。 | 3‑4 周（安全团队已介入评审） |
| **#1703** – *md2video‑audio* | 一键生成带真人语音的教学/演示视频，打开“文档即媒体”新场景。 | 视频渲染时长、音色自然度、版权音源使用。 | 2‑3 周（已有 5 条实测反馈） |
| **#525** – *pyxel* | 完整的复古游戏开发工作流（代码、帧检查、自动化测试）。 | 示例丰富度、跨平台 CI 支持。 | 2‑4 周（社区演示视频已上传） |
| **#514** – *document‑typography* | 自动排版质量检查，提升 AI 生成报告的专业度。 | 多语言支持、与其他文档生成 Skill 的兼容。 | 1‑2 周（已有 3 条正面评测） |
| **#1980** – *webapp‑testing shell‑injection fix* | 消除安全隐患，提升测试 Skill 的可靠性。 | 是否影响已有测试脚本的兼容性。 | 1 周（安全审计通过） |
| **#1792** – *docx timeout & output verification* | 提高 DOCX 处理的鲁棒性，防止隐藏错误。 | 超时阈值配置、错误信息可观测性。 | 1 周（已通过 CI） |

> **合并预期**：以上 PR 中，除 **#1771**（涉及链上交互）外，其余均在安全、兼容或生产力提升层面直接满足大量用户需求，预计在本月内陆续合并。

---

## 4️⃣ Skills 生态洞察（一句话总结）

> **社区当前最集中的诉求是：提升 Skills 的安全可信度、跨组织协作能力以及在真实业务工作流（文档、代码审计、媒体生成）中的端到端可靠性。**  

---

*报告编制：Claude Code Skills 社区分析师（2026‑11‑26）*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期**: 2026-11-26  
**分析师**: AI 开发工具技术观察员

---

## 1. 今日速览
OpenAI Codex 仓库今日迎来了一个新的 Alpha 版本 **rust-v0.174.0-alpha.6**，标志着 Rust 后端迭代进入新阶段。社区活跃度极高，过去 24 小时内有 50 个 Issue 更新，其中 Windows 平台的相关 Bug（如死锁、启动崩溃、模型缺失）和 macOS 环境下的沙箱配置问题占据了主导地位，显示出桌面端体验优化仍是开发者的核心诉求。

---

## 2. 版本发布
**rust-v0.174.0-alpha.6** (`0.174.0-alpha.6`)
- **发布时间**: 2026-11-26
- **更新内容**: 新增 Release 版本，具体技术细节暂未在 Release Notes 中详述，通常此类版本涉及 Rust 后端的稳定性修复或性能优化。

---

## 3. 社区热点 Issues
以下为过去 24 小时内评论数最高的 10 个 Issue，反映了当前最严重的用户体验问题：

1.  **#35446 [Windows死锁] Windows 10 Computer Use 死锁于 SoftwareBitmap 转换**
    *   **评论**: 70 | **状态**: OPEN
    *   **重要性**: 严重。涉及 Computer Use 核心功能的死锁问题，导致自动化操作完全卡死。
    *   **链接**: [openai/codex#35446](https://github.com/openai/codex/issues/35446)

2.  **#62650 [macOS崩溃] Codex App 在壁纸淡入回退时启动崩溃**
    *   **评论**: 59 | **状态**: OPEN
    *   **重要性**: 高。影响大量 macOS 用户的正常启动，属于严重的回归 Bug。
    *   **链接**: [openai/codex#62650](https://github.com/openai/codex/issues/62650)

3.  **#44343 [会话管理] 删除的会话仍留在侧边栏且无法归档**
    *   **评论**: 15 | **状态**: OPEN
    *   **重要性**: 中。影响 UI 清洁度和用户体验。
    *   **链接**: [openai/codex#44343](https://github.com/openai/codex/issues/44343)

4.  **#60799 [iOS远程] 应用重启后项目/任务列表为空**
    *   **评论**: 14 | **状态**: OPEN
    *   **重要性**: 中。影响远程协作功能的连续性。
    *   **链接**: [openai/codex#60799](https://github.com/openai/codex/issues/60799)

5.  **#52197 [Dots工具] 对现有可见 Dot 报错 "thread not found"**
    *   **评论**: 13 | **状态**: OPEN
    *   **重要性**: 中。桌面与远程工具集成的关键通信问题。
    *   **链接**: [openai/codex#52197](https://github.com/openai/codex/issues/52197)

6.  **#63270 [macOS沙箱] ChatGPT Work 忽略“完全访问”权限**
    *   **评论**: 10 | **状态**: OPEN
    *   **重要性**: 高。安全沙箱配置失效，可能导致 AI 无法按预期执行文件系统操作。
    *   **链接**: [openai/codex#63270](https://github.com/openai/codex/issues/63270)

7.  **#62187 [模型缺失] Windows 桌面端 GPT-6.2 Astra/Sol 在刷新后消失**
    *   **评论**: 8 | **状态**: OPEN
    *   **重要性**: 中。新模型发布后的本地同步延迟问题。
    *   **链接**: [openai/codex#62187](https://github.com/openai/codex/issues/62187)

8.  **#63822 [TUI] FenceTracker 在引用行误关闭代码块**
    *   **评论**: 7 | **状态**: CLOSED
    *   **重要性**: 低（已修复）。CLI/TUI 渲染解析器的边缘情况 Bug。
    *   **链接**: [openai/codex#63822](https://github.com/openai/codex/issues/63822)

9.  **#63627 [Xcode MCP] 服务器发现工具错误导致初始化失败**
    *   **评论**: 6 | **状态**: OPEN
    *   **重要性**: 中。IDE 集成插件的兼容性问题。
    *   **链接**: [openai/codex#63627](https://github.com/openai/codex/issues/63627)

10. **#60790 [Windows执行] 启动前拒绝执行且无策略审查路径**
    *   **评论**: 4 | **状态**: OPEN
    *   **重要性**: 中。Windows 安全策略拦截问题。
    *   **链接**: [openai/codex#60790](https://github.com/openai/codex/issues/60790)

---

## 4. 重要 PR 进展
过去 24 小时内，社区提交了 50 个 PR，其中 10 个已合并并关闭，主要集中在 TUI（终端界面）、MCP（模型上下文协议）集成和错误处理优化：

1.  **#64052 [CLOSED]** - 尊重每个执行器的插件设置。
    *   **内容**: 解决多环境插件隔离问题。
    *   **链接**: [openai/codex#64052](https://github.com/openai/codex/pull/64052)

2.  **#64026 [CLOSED]** - 在 TUI 中显示无目标的子代理等待状态。
    *   **内容**: 改善终端用户对异步任务进度的感知。
    *   **链接**: [openai/codex#64026](https://github.com/openai/codex/pull/64026)

3.  **#64024 [CLOSED]** - 支持在 TUI 中显示焦点窗格的快捷键提示。
    *   **内容**: 修复键盘交互逻辑，防止快捷键误判。
    *   **链接**: [openai/codex#64024](https://github.com/openai/codex/pull/64024)

4.  **#64023 [CLOSED]** - 在 TUI 中支持 MCP 的数字字段。
    *   **内容**: 修复 MCP 交互表单无法输入数值的问题。
    *   **链接**: [openai/codex#64023](https://github.com/openai/codex/pull/64023)

5.  **#64018 [CLOSED]** - 在 TUI 流式输出期间保持中断提示可见。
    *   **内容**: 提升流式响应时的用户体验。
    *   **链接**: [openai/codex#64018](https://github.com/openai/codex/pull/64018)

6.  **#64016 [CLOSED]** - 在发布版本中捆绑 Statsig 客户端密钥。
    *   **内容**: 确保遥测功能在生产环境正常工作。
    *   **链接**: [openai/codex#64016](https://github.com/openai/codex/pull/64016)

7.  **#64015 [CLOSED]** - 在 TUI 中显示后台命令启动和延迟结果。
    *   **内容**: 改善后台任务的状态反馈机制。
    *   **链接**: [openai/codex#64015](https://github.com/openai/codex/pull/64015)

8.  **#64014 [CLOSED]** - 在 TUI 中显示会话查找错误。
    *   **内容**: 增强错误诊断能力，不再默默忽略会话元数据错误。
    *   **链接**: [openai/codex#64014](https://github.com/openai/codex/pull/64014)

9.  **#64013 [CLOSED]** - 在 Windows PowerShell 钩子中保留原生退出码。
    *   **内容**: 修复 PowerShell 环境下工具调用的退出码传递问题。
    *   **链接**: [openai/codex#64013](https://github.com/openai/codex/pull/64013)

10. **#64010 [CLOSED]** - 为自定义状态行添加内联徽章。
    *   **内容**: 增强终端 UI 的视觉表达能力。
    *   **链接**: [openai/codex#64010](https://github.com/openai/codex/pull/64010)

---

## 5. 功能需求趋势
从 Issue 数据分析，社区关注点集中在以下三个维度：

1.  **跨平台稳定性**:
    *   **Windows**: 痛点包括启动崩溃、模型列表同步延迟、权限策略拒绝以及音量控制异常。Windows 用户反馈最为密集，特别是与系统权限和硬件交互相关的 Bug。
    *   **macOS**: 痛点集中在沙箱配置（ChatGPT Work 的权限管理）、壁纸渲染回退导致的崩溃以及系统睡眠机制干扰。

2.  **远程与移动端协作**:
    *   iOS 和 macOS 之间的远程连接（Codex Remote）存在会话列表不同步、项目列表为空等问题，显示出跨设备数据一致性仍需加强。

3.  **IDE 与 MCP 集成**:
    *   Xcode MCP 集成出现兼容性回归，表明第三方开发工具的接入正在变得复杂，需要更健壮的错误处理和回退机制。

---

## 6. 开发者关注点
*   **权限与安全**: `ChatGPT Work` 的沙箱模式被频繁诟病，即使勾选了“完全访问”，实际运行时仍被限制在只读模式或受限网络，阻碍了自动化开发流程。
*   **性能与内存**: Windows 环境下的死锁问题（`SoftwareBitmap`）和 CLI/TUI 中的内存分配问题（`apply_patch` 重复分配字符串）表明底层资源管理需要优化。
*   **交互体验**: TUI（终端界面）的细节体验受到关注，包括快捷键提示、状态显示和 Markdown 渲染（如引用行的代码块解析），显示出开发者对 CLI 工具的易用性有较高要求。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-26  
**来源**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 1. 今日速览
过去24小时社区活跃度保持高位，主要聚焦于 **Agent（智能体）稳定性优化** 与 **MCP（Model Context Protocol）安全加固**。尽管没有新的 Release，但开发者们高度关注 Subagent 恢复逻辑、AST 感知工具链以及针对特定环境（如 Wayland、PowerShell）的兼容性修复。同时，MCP OAuth 令牌管理和 SSRF（服务器端请求伪造）漏洞修复成为了安全领域的高优先级议题。

---

## 2. 版本发布
*无新版本发布。*

---

## 3. 社区热点 Issues (Top 10)

1.  **#22323 Subagent 恢复逻辑错误**
    *   **重要性**: P1 级别 Bug
    *   **摘要**: 当 Subagent 达到 `MAX_TURNS` 限制时，系统错误地将其报告为 "GOAL success"，导致任务中断被掩盖。
    *   **社区反应**: 获得最多关注 (14 👍)，反映了开发者对复杂任务流中 Agent 生命周期管理的迫切需求。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)

2.  **#21409 Generalist Agent 永久挂起**
    *   **重要性**: P1 级别稳定性问题
    *   **摘要**: 当 Generalist Agent 被调用时，系统会无限期挂起（如创建文件夹等简单操作），禁用 Subagent 可缓解该问题。
    *   **社区反应**: 8 👍，这是影响日常使用体验的核心阻塞问题。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21409)

3.  **#19873 利用模型原生 Bash 能力**
    *   **重要性**: P2 级别架构增强
    *   **摘要**: 探讨如何利用 Gemini 3 模型对 POSIX 工具（grep, cat 等）的原生偏好，通过 Zero-Dependency OS Sandboxing 提升效率。
    *   **社区反应**: 9 评论，涉及未来 Agent 执行策略的重大方向。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/19873)

4.  **#22267 Browser Agent 忽略配置覆盖**
    *   **重要性**: P2 级别配置 Bug
    *   **摘要**: Browser Agent 完全忽略了 `settings.json` 中的 `maxTurns` 等配置项，导致行为不可控。
    *   **社区反应**: 5 评论，影响自动化测试和脚本化任务。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22267)

5.  **#21968 Gemini 未充分利用 Skills 和 Subagents**
    *   **重要性**: P2 级别能力缺失
    *   **摘要**: 开发者反馈模型在执行相关任务时，很少主动调用自定义的 Gradle 或 Git Skills，需手动指令。
    *   **社区反应**: 7 评论，涉及模型自主决策能力的改进。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21968)

6.  **#21983 Browser Agent 在 Wayland 下失败**
    *   **重要性**: P1 级别兼容性
    *   **摘要**: 在 Wayland 显示服务器环境下，Browser Subagent 无法正常工作。
    *   **社区反应**: 4 👍，Linux 平台用户体验的关键痛点。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21983)

7.  **#24246 工具数量超过 128 个时的 400 错误**
    *   **重要性**: P2 级别性能限制
    *   **摘要**: 当可用工具超过 128 个时，CLI 遇到 400 错误。建议 Agent 应更智能地限制工具范围。
    *   **社区反应**: 3 👍，针对大型代码库或复杂配置环境的性能优化。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/24246)

8.  **#22672 防止 Agent 执行破坏性操作**
    *   **重要性**: P2 级别安全与稳定性
    *   **摘要**: 在执行 Git reset 或 DB 操作时，模型偶尔使用 `--force` 等危险命令，建议增加护栏。
    *   **社区反应**: 3 👍，强调在自动化执行中的安全性。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22672)

9.  **#22465 创建 Vite App 时交互提示卡死**
    *   **重要性**: P2 级别交互 Bug
    *   **摘要**: 在创建 Vite 应用时，Agent 会卡在交互式提示符中，需调整 Prompt 逻辑修复。
    *   **社区反应**: 2 👍，前端开发工作流中的常见场景。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22465)

10. **#22745/22746/22747 AST 感知文件读取与搜索**
    *   **重要性**: P2/P3 级别架构探索
    *   **摘要**: 一系列 Epic 跟踪是否应引入 AST（抽象语法树）感知工具来更精确地读取文件和映射代码库。
    *   **社区反应**: 多个相关 Issue 互相关联，涉及未来 Token 优化和代码理解效率。
    *   [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22745) / [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22746)

---

## 4. 重要 PR 进展 (Top 10)

1.  **#30454** (CLOSED) [P1] 强制 MCP OAuth 流程中的 Origin 一致性
    *   **内容**: 修复了 MCP OAuth 认证流程中，存储的令牌可能被错误复用到不同服务器的问题，并强制检查 Endpoint Origin，防止安全漏洞。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30454)

2.  **#30477** [L] 修复 SSRF 攻击风险
    *   **内容**: 防止 Web Fetch 功能中的 SSRF 攻击（R5），通过阻断通过 DNS 重定向或代理进行的私有 IP 访问。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30477)

3.  **#30478** [L] 修复 MCP 工具审批绑定错误
    *   **内容**: 确保用户对特定 MCP 工具的"总是允许"审批，与该工具的特定定义绑定，而不是仅绑定名称，防止旧审批覆盖新工具。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30478)

4.  **#30475** [L] 修复 MCP OAuth 令牌与服务器 URL 绑定
    *   **内容**: 确保存储的 OAuth 令牌仅用于当初颁发它的服务器 URL，防止令牌重放攻击。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30475)

5.  **#30476** [M] 防止受信任工作区设置重定向遥测
    *   **内容**: 修复了一个安全/隐私漏洞：克隆的受信任工作区可能覆盖用户的遥测导出设置，PR 禁止这种行为。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30476)

6.  **#30473** [M] 修复二进制数据字节预算计算错误
    *   **内容**: 修复了在处理 `read_file` 返回的图片/视频二进制数据时，因计算历史大小不当导致的大文件读取失败问题。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30473)

7.  **#30353** [L] 标准化 ACP 模式下的 Token 使用追踪
    *   **内容**: 解决了在 ACP（Agent Communication Protocol）客户端中，取消或中断的回合丢失 Token 使用统计的问题。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30353)

8.  **#30362** [M] 修复 ACP 中 Agent 停止原因报告
    *   **内容**: 确保当 Agent 被停止时，客户端能收到明确的停止原因，而不是静默结束对话。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30362)

9.  **#30349** [M] Bolt 组件优化工具参数清理热路径
    *   **内容**: 通过预编译正则表达式和标准化敏感模式，优化了复制粘贴敏感信息时的性能。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30349)

10. **#30479** [XL] 解决 Issue #30474
    *   **内容**: 提交了一个针对特定 Bug 的修复，具体细节需查看关联 Issue。
    *   [查看 PR](https://github.com/google-gemini/gemini-cli/pull/30479)

---

## 5. 功能需求趋势

*   **Agent 架构演进**:
    *   **Subagent 生命周期管理**: 如何处理超时、恢复、状态报告是核心讨论点（如 #22323, #21409）。
    *   **工具调用效率**: 社区对如何让 Agent 更精准地调用工具（AST-aware）以减少 Token 消耗表现出浓厚兴趣（#19873, #22745）。
    *   **自主性与安全性**: 提升模型自主调用 Skills 的能力，同时增加防止破坏性操作（如 `git reset --force`）的护栏（#21968, #22672）。

*   **平台兼容性**:
    *   **Linux 原生支持**: Wayland 环境下的 Browser Agent 失败问题 (#21983) 和 PowerShell 的 Shell 解析卡顿 (#30247) 是开发者反馈的痛点。

*   **MCP 与集成**:
    *   **安全与权限**: MCP OAuth 令牌管理、工具审批绑定 (#30478, #30475) 和 SSRF 防护 (#30477) 成为近期最热门的安全议题。
    *   **多环境支持**: 解决 SSRF、Origin 统一性和 Windows 环境下的路径处理问题。

---

## 6. 开发者关注点

1.  **稳定性是第一要务**: 无论是 Generalist Agent 永久挂起 (#21409) 还是 Subagent 状态报告错误 (#22323)，开发者对工具在极端情况下的表现非常敏感。
2.  **配置管理复杂度**: 随着工具数量增加（>128），以及 Agent 配置覆盖（#22267），如何管理复杂的 Agent 行为变得至关重要。
3.  **性能与 Token 成本**: 减少不必要的 Token 消耗（如通过 AST 工具优化）和避免上下文膨胀（Context Bloat）是长期的技术方向。
4.  **安全与隐私**: 针对自动化 Agent 的安全加固（防 SSRF、防 Token 重放）正在成为开发者的新关注点。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-11-26  
**来源**: github.com/github/copilot-cli  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览

GitHub Copilot CLI 今日发布 v1.0.117-2 版本，重点修复了扩展加载机制、内置搜索功能以及模型选择器的用户体验问题。社区层面，**多根工作区支持**、**插件系统优化**以及 **MCP 协议兼容性** 是当前最受关注的技术方向，反映出开发者对 CLI 工具在生产环境中复杂配置场景的强烈需求。

---

## 2. 版本发布

### v1.0.117-2 (2026-11-25 发布)
**核心更新**：
- **扩展加载机制修复**：`copilot help extensions` 不再错误提示插件扩展加载，明确只有通过 `--allow-all-tools` 或 `--yolo` 等方式批准的扩展才会启动。
- **内置搜索修复**：修复了 Copilot 发送行号等标志时内置搜索失败的问题。
- **模型选择器改进**：在 `/model` 选择器中显示服务通知，并高亮标记即将停用的模型，帮助用户提前规避风险。

**下载地址**: [GitHub Release](https://github.com/github/copilot-cli/releases)

---

## 3. 社区热点 Issues (Top 10)

| Issue ID | 标题 | 状态 | 重要性分析 |
| :--- | :--- | :--- | :--- |
| **#1826** | [Feature] Support multi-root workspaces via .code-workspace | Open | **多根工作区支持**是 VS Code/IDE 集成场景的核心痛点，涉及上下文加载和指令文件读取，高赞 22。 |
| **#5323** | [Feature] Add setting to disable agent checkpoint refs | Open | **上下文内存管理**问题，大量 agent 产生的 refs 会污染仓库，高赞 6。 |
| **#2073** | [Bug] Request failed due to a transient API error | Open | **模型请求稳定性**问题，频繁的 API 超时重试影响开发体验，高赞 13。 |
| **#5354** | [Bug] ACP does not advertise Copilot Fusion tier config | Open | **Agent Context Protocol (ACP)** 与 Fusion 模型的集成问题，阻碍了高级付费功能的 UI 展示，高赞 11。 |
| **#5440** | [Bug] Agent Plugins 1.0 `.instructions.md` ignored | Open | **插件生态**格式兼容性问题，影响开发者自定义 Agent 的能力，高赞 1。 |
| **#4683** | [Bug] Spurious errors in PowerShell ConstrainedLanguage mode | Open | **企业级部署**痛点，Windows AppLocker/WDAC 环境下的兼容性问题，影响合规部署。 |
| **#4755** | [Bug] Session wedges permanently when queue ends | Open | **会话管理**稳定性问题，会话卡死无响应，需要强制杀进程恢复，严重影响自动化流程。 |
| **#2753** | [Bug] Plugin skills not included in available_skills | Open | **插件系统**深度集成问题，插件技能无法注入到 Agent 系统提示中。 |
| **#5581** | [Bug] Copilot Fusion never routes to local OpenAI server | Open | **本地模型支持**问题，用户配置的本地 vLLM 服务器在 Fusion 模式下被忽略。 |
| **#5578** | [Bug] Plugin skill slash command fails with arguments | Open | **插件命令行**交互问题，带参数的技能命令无法调用，仅支持无参调用。 |

---

## 4. 重要 PR 进展 (Top 10)

由于 PR 数据量较少且多为文档配置类更新，此处选取具有代表性的 2 个：

| PR ID | 标题 | 状态 | 说明 |
| :--- | :--- | :--- | :--- |
| **#4316** | Create devcontainer.json | **Closed** | 创建开发容器配置，辅助开发者快速搭建本地 Copilot CLI 开发环境。 |
| **#4428** | Add initial devcontainer configuration | **Closed** | 添加初始开发容器配置，完善 CI/CD 集成支持。 |

*(注：过去24小时内活跃 PR 数量较少，主要集中在文档和配置完善)*

---

## 5. 功能需求趋势

从 Issues 数据分析，社区关注点主要集中在以下三个方向：

1.  **IDE 集成与复杂工作区支持**
    *   **多根工作区 (.code-workspace)**：这是当前最高优先级的 Feature Request，反映开发者希望在大型 monorepo 或跨仓库协作时能获得一致的上下文支持。
    *   **ACP 协议完善**：关于 ACP 与 Fusion 模型、本地模型的集成问题持续存在，说明 ACP 作为通用协议正在被更多第三方编辑器（如 Zed）采用，但适配层仍需优化。

2.  **插件生态与 Agent 系统深度集成**
    *   **插件技能注入**：开发者期望插件不仅能提供工具，还能深度影响 Agent 的决策逻辑（如注入自定义系统提示）。
    *   **Agent 状态管理**：包括 checkpoint refs 的清理、会话状态的持久化与恢复，是维护长期开发会话稳定性的关键。

3.  **企业级与合规部署**
    *   **MCP 协议兼容性**：解决旧版 MCP 协议与新版 SDK 的握手问题，确保第三方 MCP 服务器能顺利连接。
    *   **受限环境支持**：针对 Windows PowerShell ConstrainedLanguage 模式的兼容性修复，表明 Copilot CLI 正在向企业内网环境渗透。

---

## 6. 开发者关注点

1.  **稳定性痛点**：Session wedged (卡死)、频繁的 API 超时重试以及 PowerShell 环境下的噪音错误，严重影响了自动化脚本和长期会话的可靠性。
2.  **配置复杂性**：用户需要在模型选择器中识别即将停用的模型，或者在 Fusion 模式下手动配置本地 Provider，增加了学习成本。
3.  **插件开发门槛**：Agent Plugins 1.0 格式下的配置项（如 `.instructions.md`）被忽略，使得自定义 Agent 的规则难以生效。

---
**日报生成时间**: 2026-11-26

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-11-26
**数据来源：** github.com/anomalyco/opencode

---

## 1. 今日速览
OpenCode 社区今日迎来 **v2.4.2 版本发布**，重点修复了 GPT-6.2 系统提示词、桌面端启动流程及 Windows 环境下的 Bash 工具安全漏洞。与此同时，核心架构正在进行大规模重构，包括后台 Fiber 生命周期管理、环境隔离以及 OAuth 流程优化，为未来的多环境支持打下基础。

---

## 2. 版本发布：v2.4.2
*   **核心系统更新**：更新 GPT-6.2 Sol 和 Astra 模型及其别名，使其使用专门针对 GPT-6.2 定制的系统提示词。
*   **桌面端启动修复**：解决了连接 OpenCode 后模型选择器无法正确显示 "OpenCode Go" 的问题。
*   **环境安全**：修复了 Windows 平台下 Bash 工具执行 `rd /s /q` 命令时因转义错误导致意外删除整个驱动器根目录的严重 Bug。
*   **插件系统**：优化了插件在长生命周期服务进程中的会话钩子行为。

> [GitHub Release: v2.4.2](https://github.com/anomalyco/opencode/releases/tag/v2.4.2)

---

## 3. 社区热点 Issues (Top 10)

1.  **#64073 [FEATURE]: Restore Foreground Subagent Execution**
    *   **重要性**：高。涉及多代理系统的并行执行与控制，是处理复杂任务的核心功能。
    *   **状态**：Open (30 评论, 13 👍)。用户希望恢复在当前前台会话中执行子代理的能力，以替代现有的串行执行模式。

2.  **#12711 [DESIGN]: Agent Teams — flat teams with named messaging**
    *   **重要性**：高。旨在解决多代理协作问题，允许代理并行工作、通信和协调。
    *   **状态**：Closed (17 评论, 24 👍)。设计已获批准，社区期待该功能在后续版本落地。

3.  **#33704 [FEATURE]: Add GUI Options to Edit Custom Providers**
    *   **重要性**：中。针对本地模型（如 LM Studio）的易用性优化。
    *   **状态**：Open (13 评论, 4 👍)。用户希望能在 GUI 中直接管理自定义提供商，而无需通过配置文件。

4.  **#66299 [BUG]: plugins session prompt hook stops firing after plugin re-boot**
    *   **重要性**：高。插件开发者反馈的功能中断问题，影响 Prompt 转换类插件（如脱敏）的正常运行。
    *   **状态**：Closed (9 评论)。已确认并修复。

5.  **#61899 [BUG]: Desktop Ctrl+C does not interrupt process in terminal**
    *   **重要性**：中。桌面端终端体验的关键痛点，影响开发者调试流程。
    *   **状态**：Open (7 评论, 0 👍)。在集成终端中强制停止 Python 等后台进程目前需要系统级命令。

6.  **#59293 [BUG]: subagent sessionID continuation fails**
    *   **重要性**：中。子代理会话延续功能失效，阻碍了复杂对话的连续性。
    *   **状态**：Open (7 评论, 1 👍)。无论传入什么 `sessionID`，工具始终接收 `"ses"` 导致会话丢失。

7.  **#60702 [BUG]: Copilot models fail to sync in shared service**
    *   **重要性**：中。涉及共享后台服务与桌面端的模型同步问题。
    *   **状态**：Open (6 评论, 0 👍)。在 `serve --service` 模式下，Copilot 模型经常出现间歇性丢失或无法连接。

8.  **#66449 [BUG]: Windows bash tool "rd /s /q" deleted entire drive root**
    *   **重要性**：极高（安全相关）。Windows 环境下的严重安全漏洞，模型生成的命令可能因转义处理不当导致数据丢失。
    *   **状态**：Open (6 评论, 0 👍)。建议尽快在 v2.4.2 之外进行紧急修复。

9.  **#61221 [BUG]: Desktop chat markdown ignores theme colors**
    *   **重要性**：中。UI 渲染问题，导致 Markdown 输出在桌面端呈现单色，与 TUI 端不一致。
    *   **状态**：Open (5 评论, 2 👍)。CSS 变量 `--markdown-*` 未被正确应用。

10. **#56973 [BUG]: iOS dictation Russian recognition produces Latin text**
    *   **重要性**：中。iOS 移动端语音输入体验问题。
    *   **状态**：Open (4 评论, 1 👍)。俄语语音识别错误地输出拉丁字母转写。

> [查看全部 Issues](https://github.com/anomalyco/opencode/issues?q=is:issue+is:open)

---

## 4. 重要 PR 进展 (Top 10)

1.  **#66487 [release]: v2.4.2**
    *   **内容**：将 v2.4.2 版本的版本号和变更日志合并回 `dev` 分支。
    *   **状态**：Open (已准备发布)。

2.  **#66498 [refactor(core)]: gate VCS, Snapshot on Environment**
    *   **内容**：将版本控制、快照、工作树和项目操作限制在 `Environment` 内部，防止远程工作区探测主机磁盘。**这是核心安全重构。**
    *   **状态**：Open。

3.  **#66502 [refactor(core)]: scope background fibers**
    *   **内容**：将 `Shell`、`Watcher` 和 `PersistentPty` 中的后台 Fiber 限制在特定的 `FiberSet` 运行时中，确保它们在销毁时能正确停止。
    *   **状态**：Open。

4.  **#66499 [feat(desktop)]: quit notice and stop service setting**
    *   **内容**：添加“退出时停止服务”的设置，解决用户关闭桌面端后后台服务仍在运行的问题。
    *   **状态**：Open。

5.  **#66497 [feat(core)]: add read_terminal tool**
    *   **内容**：新增可选的只读工具 `read_terminal`，允许模型读取会话的可见终端内容。
    *   **状态**：Closed。

6.  **#66481 [docs(providers)]: show how to run Hugging Face model by ID**
    *   **内容**：补充文档，说明如何在 V2 中通过 Hugging Face ID 运行模型。
    *   **状态**：Open。

7.  **#66492 [docs(ecosystem)]: add opencode-win-guard and opencode-crew-mail**
    *   **内容**：在生态系统插件列表中新增两个条目。
    *   **状态**：Open。

8.  **#66486 [fix(terminal)]: honor cursor shape escapes**
    *   **内容**：修复终端光标形状（如 Neovim 的块光标）显示问题。
    *   **状态**：Open (关闭 #66256)。

9.  **#66469 [feat(server)]: expose feature flags at /api/experimental/flag**
    *   **内容**：新增 API 端点，用于查询当前生效的实验性功能标志。
    *   **状态**：Closed。

10. **#66217 [feat(browser)]: stream remote browser traffic multiplexed**
    *   **内容**：优化远程浏览器流量的传输性能，显著提升了加载速度和并发处理能力。
    *   **状态**：Closed。

> [查看全部 PRs](https://github.com/anomalyco/opencode/pulls?q=is:pr+is:open)

---

## 5. 功能需求趋势

从当前的 Issue 和 PR 流向来看，社区关注点主要集中在以下几个方向：

*   **多代理协作**：**#64073** 和 **#12711** 表明用户迫切需要“团队式”的 Agent 架构，即多个 Agent 能并行工作并相互通信，而不仅仅是串行执行。
*   **桌面端体验优化**：大量 Issue 集中在桌面端（如 **#61899** 终端中断、**#61221** Markdown 样式、**#66491** 侧边栏项目菜单），反映出桌面应用作为主要使用场景，其 UI/UX 的细节打磨仍有很大空间。
*   **安全与隔离**：**#66449** 的 Windows 删除根目录 Bug 和 **#66498** 的环境隔离重构，显示社区对 Agent 执行命令的安全性非常敏感。
*   **IDE 集成与配置**：**#33704** 关于自定义提供商的 GUI 支持，以及 **#60379** 关于文件树独立预览的需求，体现了用户希望通过更接近原生 IDE 的方式与 OpenCode 交互。

---

## 6. 开发者关注点

*   **会话管理**：**#63518** 提议增加会话的归档/取消归档功能，以及 **#64249** 提议的“暂停会话”功能，说明用户有大量历史会话需要更高效的管理方式。
*   **模型兼容性**：**#65315** 提到 OpenAI 兼容流式错误字段格式的问题，以及 **#64792** 关于 Anthropic 协议边界处理的问题，显示在适配各种第三方 Provider 时仍存在兼容性挑战。
*   **远程开发**：**#60665** 反复提到远程 SSH 连接在更新后频繁中断，是远程开发者的一大痛点。

> [OpenCode GitHub](https://github.com/anomalyco/opencode)

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-11-26)

## 1. 今日速览
Pi 项目今日发布 **v1.6.1** 版本，重点增强了 **Codemode** 的决策模型调用能力，支持 GitHub Copilot 的 `gpt-6-luna-decisions` 和 Radius 模型。同时，社区活跃度极高，过去 24 小时新增 50 个 Issues 和 26 个 PR，主要集中在 **Windows 终端控制、模型缓存机制、以及 Anthropic/GitHub Copilot 集成的稳定性**上。

---

## 2. 版本发布
**v1.6.1**
*   **核心新特性**：在 Codemode 中引入决策模型支持。开发者现在可以直接通过 `models.classify()` 调用 GitHub Copilot 的 `gpt-6-luna-decisions` 和 Radius 决策模型，返回结果中包含响应 ID，便于追踪。
*   *参考链接：[GitHub Release](https://github.com/badlogic/pi-mono)*

---

## 3. 社区热点 Issues
以下是过去 24 小时内评论数最多的 10 个 Issues，反映了当前最迫切的修复需求：

1.  **[Windows] 终端控制权残留问题** (#12133)
    *   **重要性**：P0 级 Bug。在 Windows Terminal 中退出 Pi 后，鼠标和 Kitty 输入报告功能未被关闭，导致 PowerShell 提示符被杂乱的 SGR 鼠标代码污染，影响用户体验。
    *   **反应**：11 条评论，用户反馈严重。

2.  **[Anthropic] SSE 解析器错误处理缺陷** (#10390)
    *   **重要性**：P0 级 Bug。当 CRLF 换行符跨网络数据包传输时，解析器会报错导致对话中断，影响与 Claude 模型的长对话稳定性。
    *   **反应**：11 条评论，技术细节讨论深入。

3.  **[OpenAI API Key] GPT-6 请求参数配置错误** (#12464)
    *   **重要性**：P0 级 Bug。使用 API Key 认证时，GPT-6 模型请求仍错误地发送了 `medium effort` 和 `configuration_update`，且 `additional_tools` 会抑制推理过程。
    *   **反应**：10 条评论，开发者反馈影响直接 API 调用。

4.  **[Anthropic /login] 企业版登录失败** (#12318)
    *   **重要性**：P0 级 Bug。使用 Claude Team/Enterprise 账户登录时，OAuth 请求被拒绝，报错 "Unknown scope"。
    *   **反应**：5 条评论，涉及企业级用户。

5.  **[Bug] Windows 全局安装失败** (#4399)
    *   **重要性**：高。在 Windows 11 上使用 npm/pnpm 全局安装 Pi Agent 时，由于 Node 26.1 环境依赖问题导致安装失败且无明确报错。
    *   **反应**：9 条评论，涉及新版本 Node 环境适配。

6.  **[Bug] 转换时丢失 UI 原型方法** (#8829)
    *   **重要性**：SDK 级 Bug。`wrapUIPromptContext` 使用展开语法复制对象时，丢失了继承的 prototype 方法，影响 TUI 和 RPC 组件。
    *   **反应**：7 条评论，涉及底层架构。

7.  **[Bug] ANSI 转义序列粘贴导致编辑器卡死** (#11383)
    *   **重要性**：P0 级 Bug。粘贴包含 ANSI 转义序列的终端输出会导致括号粘贴模式未正确终止，使编辑器无法接受任何输入（Ctrl+C 无效）。
    *   **反应**：5 条评论，严重影响终端使用。

8.  **[Durable] 工具批量调用指导** (#12471)
    *   **重要性**：功能增强需求。社区建议在 CodingTools 中增加系统提示，指导模型在输入已知且无依赖时批量调用工具，以减少延迟。
    *   **反应**：4 条评论，针对性能优化。

9.  **[Bug] 缓存预热超时配置缺失** (#11127)
    *   **重要性**：配置优化。当前缓存预热固定为 30 分钟，社区建议增加可配置的空闲缓存预热时长，以更好地配合提示词缓存 TTL。
    *   **反应**：6 条评论，针对缓存策略。

10. **[Bug] Kitty 图片显示与滚动条问题** (#12548)
    *   **重要性**：终端渲染 Bug。图片未完全适配屏幕底部时会被截断，且触发回退重绘时导致终端滚动条被清空。
    *   **反应**：4 条评论，涉及特定终端（Kitty）。

---

## 4. 重要 PR 进展
过去 24 小时有 26 个 PR 更新，以下是 10 个关键 PR：

1.  **[Durable] 删除对话功能** (#12562) - **OPEN**
    *   **内容**：新增 `Harness.deleteConversations` 方法，支持彻底删除对话及其子代理任务，解决历史数据残留问题。
2.  **[AI] GitHub Copilot 推理缓存修复** (#12539) - **CLOSED**
    *   **内容**：修复在 GitHub Copilot 中切换思考模式或工具时丢失 Prompt Cache 的问题，确保缓存一致性。
3.  **[AI] 修复 OpenAI Copilot 推理流解析** (#12505) - **CLOSED**
    *   **内容**：修复 `reasoning_opaque` delta 在 `openai-completions` 流中被忽略的问题，确保推理过程可重放。
4.  **[AI] 停止向 Bedrock Kimi K3 发送旧推理** (#12555) - **CLOSED**
    *   **内容**：修复 Bedrock Kimi K3 模型的推理发送逻辑，避免发送不支持的旧格式数据。
5.  **[AI] 修复 Bedrock Kimi 思考级别发送** (#12551) - **CLOSED**
    *   **内容**：修复 Kimi K3.1 模型无法正确设置 `thinkingLevelMap` 的问题，现已支持完整级别选择。
6.  **[Coding Agent] Windows Ctrl+Break 优雅退出** (#12553) - **CLOSED**
    *   **内容**：新增对 Windows SIGBREAK 的监听，防止 Ctrl+Break 导致进程崩溃且终端状态残留。
7.  **[Docs] 恢复终端崩溃后的恢复指南** (#12554) - **CLOSED**
    *   **内容**：更新文档，补充当 Pi 被强制杀掉（kill -9）后如何重置终端状态的说明。
8.  **[Docs] 解释 OpenAI 无缓存原因** (#12558) - **CLOSED**
    *   **内容**：在模型目录中记录说明，解释为何 OpenAI 模型不支持 Prompt Cache warming。
9.  **[AI] 更新 Ant Ling 模型兼容性** (#11800) - **CLOSED**
    *   **内容**：移除 Ling 2.6/Ring 2.6，更新至 Ling 3.0/3.1，统一 API 兼容性。
10. **[Nix] 更新 Node.js 版本依赖** (#12549) - **CLOSED**
    *   **内容**：将 Nix 配置从固定 Node 版本改为跟随 nixpkgs 当前版本，解决插件兼容性问题。

---

## 5. 功能需求趋势
从 Issues 和 PR 分析，社区关注点主要集中在以下三个方向：

1.  **多模型与集成稳定性**：
    *   随着更多模型（如 Kimi K3.1、GPT-6、Ant Ling 3.x）接入，**参数解析、缓存策略和特定模型限制**的适配成为高频话题。
    *   GitHub Copilot 集成的稳定性（如 OAuth 登录、缓存保留）是重点优化对象。
2.  **终端交互与渲染优化**：
    *   **Windows Terminal 适配**和 **ANSI 转义序列处理** 是最大的痛点，涉及底层 IO 控制。
    *   Kitty 等特定终端的渲染兼容性（图片、滚动条）需要持续改进。
3.  **性能与资源管理**：
    *   **缓存预热策略**的灵活配置（Issue #11127）。
    *   **工具调用优化**（Issue #12471），即如何让模型更高效地批量执行独立任务。

---

## 6. 开发者关注点
*   **Windows 环境体验**：大量反馈集中在 Windows 11 + PowerShell 的终端残留问题，以及 Node 26.x 环境下的安装问题。
*   **调试与错误信息**：当发生错误（如 SSE 解析失败、API Key 认证错误）时，社区希望能获得更清晰的错误日志和诊断信息。
*   **资源泄漏**：在长时间运行的会话中，`AgentSession` 和 `ExtensionRunner` 的内存释放问题被指出会导致 OOM（内存溢出）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期**：2026-11-26
**分析工具**：AI 开发工具技术分析师

---

## 1. 今日速览
Qwen Code 项目今日迎来关键版本更新 **v1.0.0-preview.2**，正式引入 **Qwen4-Max** 模型支持，提供 1M 上下文窗口及多模态输入能力。同时，项目正在积极解决持续集成中的大量 E2E 测试失败问题，并推进订阅系统的功能完善。

## 2. 版本发布
### v1.0.0-preview.2
*   **核心更新**：在 Qwen 订阅目录中新增 **Qwen4-Max** 模型，支持 **1M 上下文窗口**，并具备**图片与视频输入**能力。
*   **订阅体验优化**：当订阅额度耗尽时，增加**重置倒计时**提示，并新增 `/upgrade` 命令一键跳转订阅计划页面。
*   **其他**：Qwen 订阅请求现在携带 `QwenCode` 用户信息（部分摘要截断）。

## 3. 社区热点 Issues

1.  **[OPEN] Main CI failed: E2E Tests (Issue #18252)**
    *   **重要性**：🔴 **最高优先级**。这是目前评论数最多的 Bug，表明主分支的端到端测试大规模失败，严重影响代码质量保证。
    *   **摘要**：`cli/cron-tools.test.ts` 等测试用例失败，怀疑是 CI 环境不稳定或新代码引入的回归问题。

2.  **[OPEN] 会话日志明文记录 API key，存在敏感信息落盘风险 (Issue #18165)**
    *   **重要性**：🔴 **安全问题**。涉及用户隐私与安全合规。
    *   **摘要**：在更换 Token Plan API Key 时，日志中未脱敏完整 Key，且文件权限偏宽，存在泄露风险。

3.  **[OPEN] Active Goal holds ordinary user input (Issue #15686)**
    *   **重要性**：🟡 **交互体验**。影响核心交互流程。
    *   **摘要**：当 Goal 处于激活状态时，用户通过 Enter 键发送的普通消息会被阻塞，直到 Goal 离开活跃状态，导致响应延迟。

4.  **[OPEN] Windows: project settings created after startup are never hot-reloaded (Issue #17489)**
    *   **重要性**：🟡 **跨平台兼容性**。影响 Windows 用户的使用体验。
    *   **摘要**：Windows 平台上，启动后创建的项目设置文件无法被运行中的会话热重载。

5.  **[OPEN] bug(core): FileChangedWatcher permanently misses a file (Issue #16708)**
    *   **重要性**：🟡 **文件监控**。影响文件操作工具的准确性。
    *   **摘要**：`FileChangedWatcher` 可能会永久遗漏写入到新建子目录中的文件，而非仅仅是延迟通知。

6.  **[OPEN] `qwen -p` without `--approval-mode` reads files outside the workspace (Issue #18379)**
    *   **重要性**：🔴 **安全漏洞**。
    *   **摘要**：在无头模式下（`-p`），系统读取了 `--approval-mode=default` 会拒绝的外部文件，存在越权风险。

7.  **[OPEN] Web Shell: Archived conversations panel lacks search and filters (Issue #17772)**
    *   **重要性**：🟡 **UI 功能缺失**。随着归档会话增多，面板变得难以使用。
    *   **摘要**：归档会话列表缺少搜索、工作区筛选和排序功能。

8.  **[OPEN] Web Shell: filter workspaces by name (Issue #17142)**
    *   **重要性**：🟡 **UI 功能缺失**。
    *   **摘要**：Web Shell 中的工作区选择器和侧边栏无法按名称过滤工作区列表。

9.  **[OPEN] bug(web-shell): Keyboard repeat can cancel a prompt immediately (Issue #18374)**
    *   **重要性**：🟡 **交互体验**。
    *   **摘要**：提交提示后，键盘自动重复功能可能立即将按钮状态从“发送”变为“停止”，导致取消操作。

10. **[OPEN] bug(feishu): resource HTTP 401 retains a warm tenant token cache (Issue #13845)**
    *   **重要性**：🟡 **集成稳定性**。
    *   **摘要**：飞书资源返回 401 时未正确清除缓存的租户令牌，可能导致后续请求复用无效 Token。

## 4. 重要 PR 进展

1.  **#18390** [OPEN] fix(managed-agent): preserve inherited approval modes
    *   **内容**：修复了在处理主机提供的 Definition 时，未区分“未提供批准模式”和“明确提供批准模式”的逻辑差异，确保权限继承机制正常工作。

2.  **#18393** [OPEN] test(verify-pr): use reaped child PIDs for torn-down worker fixtures
    *   **内容**：修复 Linux 单元测试在 CI 环境中的失败问题，确保 Worker 实例被正确销毁。

3.  **#18351** [CLOSED] feat(qwen): add the Qwen Code CLI package on the Harness kernel
    *   **内容**：成功将 Qwen Code CLI 产品层添加到 Harness kernel 上，完成了 CLI 的核心架构集成。

4.  **#18378** [OPEN] fix(managed-agent): isolate embedded startup failures
    *   **内容**：隔离嵌入式启动失败，防止 Managed Agent 初始化错误影响主机的其他运行路径。

5.  **#18377** [CLOSED] fix(web-shell): keep private core imports out of published declarations
    *   **内容**：修复了发布 Web Shell 包时泄露私有核心导入的问题，解决了构建失败。

6.  **#14335** [OPEN] feat(serve): auto-remove completed sub-sessions after a configurable TTL
    *   **内容**：新增可配置的子会话自动清理功能，默认永久保留，可设置 TTL 自动清理过期会话。

7.  **#18317** [OPEN] fix(core): explain how to recover from a repeated-tool-call rejection
    *   **内容**：改进模型拒绝重复工具调用的错误提示，增加用户恢复操作的具体说明。

8.  **#18346** [OPEN] fix(core): point at the JSON error when a tool arg arrives as broken text
    *   **内容**：当工具参数以无效 JSON 文本传入时，增强错误信息，精确标记 JSON 解析失败的位置。

9.  **#17271** [OPEN] fix(web-shell, cli): localize Goal budget stop-reason
    *   **内容**：实现 Goal 预算耗尽时的错误原因本地化，让用户看到的提示与终端语言一致。

10. **#17299** [OPEN] feat(web-shell): show pending loop wakeups in scheduled tasks
    *   **内容**：在 Web Shell 和 API 中展示待处理的循环唤醒任务，提高会话状态的可视性。

## 5. 功能需求趋势
*   **多模态与长上下文**：社区对 Qwen4-Max (1M Context) 及视频/图片输入的支持高度期待，这是项目 v1.0 的核心卖点。
*   **订阅与计费系统**：随着订阅功能上线，社区反馈集中在订阅额度提示、升级流程优化以及 API Key 安全性（脱敏/权限）上。
*   **跨平台与桌面体验**：Windows 平台的设置热重载、Web Shell 的归档筛选和键盘交互是高频痛点。

## 6. 开发者关注点
*   **CI/CD 稳定性**：过去 24 小时内出现大量 CI 失败报告（E2E Tests, Managed Agent gate），说明代码合并前需要更严格的测试保障。
*   **安全合规**：API Key 明文记录和权限绕过问题引发关注，开发者呼吁加强对敏感信息的处理和严格的权限校验。
*   **架构演进**：项目正在从单一的 CLI 向基于 Harness kernel 的架构演进，社区在适应新架构带来的变化（如权限继承、嵌入式隔离）。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报（2026‑11‑26）**

---

## 1️⃣ 今日速览
- 本日社区活动以 **代码质量提升** 为主，核心库的若干 R5 审计缺口已在 PR #7561 中得到修复。  
- 近期的 **发行准备** 工作继续推进，0.10.5 版本已在 PR #7560 完成预备工作。  
- 两条近期 Issue 中，一条已关闭（GNOME Terminal 颜色恢复），另一条（历史压缩导致摘要缺失）仍在讨论，显示出对 **状态持久化与回滚** 的关注。

---

## 2️⃣ 版本发布
> **（暂无新 Release）**  
> 最近的 **0.10.5** 版本已在内部准备完成（PR #7560），但尚未正式发布，等待创始人确认后才会在 GitHub 上打标。

---

## 3️⃣ 社区热点 Issues（全部 2 条）

| # | 标题 & 链接 | 关键点 | 社区反响 |
|---|------------|--------|----------|
| **7344** | **tui: GNOME Terminal background stays custom Nord theme color after exit**  \[<https://github.com/codewhale-hq/Codewhale/issues/7344>\] | 解决在 GNOME Terminal 中使用 DeepSeek TUI 后，终端配色未恢复的 UI 问题。涉及跨平台终端状态恢复，影响 Linux 桌面用户体验。 | 已在 2026‑11‑25 关闭，讨论中有 6 条评论，主要围绕实现方式（恢复原 profile、使用 `dconf`）以及对其他终端的兼容性。 |
| **7562** | **compaction: loose scan can delete a user turn that pastes the summary header**  \[<https://github.com/codewhale-hq/Codewhale/issues/7562>\] | 代码压缩（history compaction）过程中，若缺少 provenance‑stamped checkpoint，可能导致用户输入被错误删除，影响对话完整性。 | 2026‑11‑26 新建，已收到 1 条评论，社区担心该 bug 会在大模型对话长会话中导致信息丢失，呼吁尽快在下一次 release 中加入防护。 |

> **备注**：仓库当前仅有上述 2 条近期活跃 Issue，故本栏目展示全部。若后续出现更多 Issue，后续日报将补齐至 10 条。

---

## 4️⃣ 重要 PR 进展（全部 3 条）

| # | 标题 & 链接 | 主要贡献 | 影响范围 |
|---|------------|----------|----------|
| **7561** | **fix(util,engine): resolve remaining R5 durability, grep timeout cancel, and bounded review read defects**  \[<https://github.com/codewhale-hq/Codewhale/pull/7561>\] | - 完成 R5‑L10‑01、R5‑L10‑02、R5‑L10‑03 三项审计缺口修复<br>- 改进 `grep` 超时取消逻辑，防止阻塞<br>- 增加对 bounded review 读取的回归测试 | 直接提升核心引擎的可靠性与安全审计合规性，所有使用 `engine` 与 `util` 的用户受益。 |
| **7560** | **chore(release): cut 0.10.5**  \[<https://github.com/codewhale-hq/Codewhale/pull/7560>\] | - 将 `Unreleased` 区块迁入正式的 **0.10.5** 发行说明<br>- 更新 `Cargo.toml` 中的版本号与依赖 | 为即将上线的 0.10.5 做好发布准备，属于发布流程的关键步骤。 |
| **7340** | **feat(providers): add Synap descriptor**  \[<https://github.com/codewhale-hq/Codewhale/pull/7340>\] | - 为 Codewhale 引入 Synap 大模型提供者<br>- 支持 `https://synap402.com/v1` 的 OpenAI‑compatible ChatCompletions 接口<br>- 新增环境变量 `SYNAP_API_KEY` 与默认模型 `qwen3-coder-30b` | 扩展了平台的模型生态，用户可直接在 TUI 中调用 Synap，提升多模型选择灵活性。 |

> **备注**：当前仅有 3 条近期 PR，已全部列出。后续如有更多 PR 将补足至 10 条。

---

## 5️⃣ 功能需求趋势（从 Issues 抽取）

| 趋势 | 具体表现 | 价值 |
|------|----------|------|
| **终端/IDE 集成的状态恢复** | Issue #7344 关注 GNOME Terminal 颜色恢复，暗示用户在不同终端间切换时希望保持一致的 UI/UX。 | 提升跨平台使用体验，降低用户手动恢复配置的成本。 |
| **历史压缩与对话完整性** | Issue #7562 报告压缩过程中可能丢失用户回合，体现对 **长会话持久化** 与 **可回滚** 的需求。 | 对企业级、科研等需要完整审计记录的场景尤为关键。 |
| **多模型支持** | PR #7340 引入 Synap，显示社区对 **模型生态多样化** 的强烈期待。 | 为不同算力、成本、功能需求的用户提供灵活选择。 |
| **安全审计合规** | PR #7561 重点修复 R5 审计缺口，表明社区对 **代码安全、审计合规** 有持续关注。 | 有助于在企业级部署时满足合规要求，提升项目可信度。 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **跨终端 UI 一致性** – 开发者希望 DeepSeek TUI 能够在退出后自动恢复原终端配色/设置，避免手动干预。  
2. **对话历史可靠性** – 在压缩/清理历史时不应误删用户输入，尤其是摘要标题等关键元信息。  
3. **模型生态扩展** – 期待官方或社区快速集成更多第三方模型（如 Synap、Claude、Gemini），并提供统一的配置方式。  
4. **审计与稳定性** – R5 类审计缺口的持续修复表明，代码质量、异常恢复（如 `grep` 超时）是开发者关注的重点。  
5. **发布流程透明** – 0.10.5 仍处于 “准备中” 状态，开发者希望看到明确的发布时间表与变更日志。  

--- 

> **结语**：本日报基于最近 24 小时的 GitHub 活动，聚焦代码质量提升、发布准备以及对终端体验与模型多样性的需求。建议关注 PR #7561 的合并进度以及 Issue #7562 的后续讨论，以便及时获取关键修复信息。祝开发顺利！

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*