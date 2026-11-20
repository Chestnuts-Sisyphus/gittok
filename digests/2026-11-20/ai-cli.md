# AI CLI 工具社区动态日报 2026-11-20

> 生成时间: 2026-11-20 01:31 UTC | 覆盖工具: 9 个

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

# 2026-11-20 AI CLI 工具生态横向对比分析报告

**分析师**: AI 开发工具技术分析师
**日期**: 2026-11-20

---

## 1. 生态全景

当前 AI CLI 工具生态已从单纯的功能堆砌进入**深度工程化与生态互联**阶段。各主流工具（OpenAI Codex, GitHub Copilot CLI, Gemini CLI 等）正聚焦于**架构统一化**（如 Managed Agent、TUI 工作区重构）和**协议标准化**（MCP、ACP）。行业竞争焦点已从单一模型能力转向**跨平台稳定性、多会话管理**以及**与外部工具生态（IDE、浏览器、本地进程）的无缝集成**。

---

## 2. 各工具活跃度对比

| 工具名称 | 今日 Issues 数 | 今日 PR 数 | 版本动态 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI Codex** | 10 | 10 | **v0.171.0** (GPT-6.2 Sol 默认) | 高速迭代 |
| **Gemini CLI** | 10 | 10 | **v0.71.0-nightly** (热力图/修复) | 快速迭代 |
| **GitHub Copilot CLI** | 10 | 1 | **v1.0.115-1** (MCP 认证修复) | 稳定维护 |
| **OpenCode** | 10 | 10 | **v2.3.2** (核心稳定性修复) | 核心维护 |
| **Pi (Mono)** | 10 | 10 | 无新版本 (修复信号处理/多模态) | 稳定优化 |
| **Qwen Code** | 10 | 10 | 无新版本 (架构迁移/CI 稳定性) | 架构重构 |
| **Kimi Code** | 0 | 0 | 无活动 | 静默期 |
| **DeepSeek TUI** | N/A | N/A | 摘要生成失败 | 数据缺失 |

---

## 3. 共同关注的功能方向

多款主流工具社区在今日反馈中高度重合，反映出行业共性痛点：

1.  **MCP (Model Context Protocol) 认证与集成**
    *   **涉及工具**: OpenAI Codex, GitHub Copilot CLI, Gemini CLI
    *   **具体诉求**: 非第一方 MCP 服务器的 OAuth 登录流程不稳定（如无弹窗、WSL2 环境下卡顿）、Refresh Token 静默刷新失效、以及非第一方 HTTP 服务器的兼容性问题。

2.  **Agent 架构与状态管理**
    *   **涉及工具**: Gemini CLI, OpenCode, Qwen Code
    *   **具体诉求**:
        *   **子代理稳定性**: Subagent 恢复机制 Bug、挂起问题、错误报告为成功。
        *   **持久化与会话**: ACP 外部集成会话状态丢失、会话状态跨进程重启失败。
        *   **生命周期管理**: Managed Agent 的文件生命周期重构、权限协议状态设计改进。

3.  **TUI/终端体验与跨平台兼容性**
    *   **涉及工具**: OpenAI Codex, Gemini CLI, Pi, Qwen Code
    *   **具体诉求**:
        *   **交互细节**: TUI 复制代码块格式错误、光标闪烁、滚动位置重置。
        *   **平台特定**: Windows Store 更新锁死、PowerShell 权限请求跳过、WSL2 环境下 MCP 登录失败、Wayland 环境兼容性。

4.  **上下文管理与 Token 效率**
    *   **涉及工具**: OpenAI Codex, GitHub Copilot CLI, Pi
    *   **具体诉求**: PDF 上下文估算错误（按字节而非 Token 计算）、Token 使用量日志缺失、Prompt 缓存命中率下降（GPT-6.2）。

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
| :--- | :--- | :--- | :--- |
| **OpenAI Codex** | **全能型**：集成桌面端、Web、TUI、远程控制 (Dots)，强调模型能力切换。 | OpenAI 生态重度用户、企业级开发者。 | 闭源模型 + 官方生态深度绑定。 |
| **GitHub Copilot CLI** | **生态集成型**：强调 IDE 集成、BYOK、MCP 认证流程。 | 企业开发者、使用 Zed/Vim 等编辑器的团队。 | OpenAI 模型 + GitHub 生态 + MCP 协议。 |
| **Gemini CLI** | **Agent 实验型**：专注于 Agent 沙箱、Browser Agent、AST 感知代码库探索。 | 研究 Agent 行为、需要复杂工具调用的开发者。 | Google Gemini 模型 + MCP/ACP 扩展。 |
| **OpenCode** | **客户端增强型**：专注于 Claude Agent 的多账户管理、插件系统、本地文件操作。 | Claude 模型重度用户、个人开发者。 | 开源客户端 + Claude API (Anthropic)。 |
| **Pi (Mono)** | **本地/终端原生型**：强调本地模型支持 (llama.cpp)、多模态输入、跨平台终端体验。 | 硬件极客、隐私敏感开发者、Linux/macOS 终端用户。 | 开源 + 本地推理 + Rust/Node.js。 |
| **Qwen Code** | **基础设施型**：专注于 Managed Agent 架构迁移、CI/CD 稳定性、多语言支持。 | 企业级后端/平台开发者、需要大规模部署的用户。 | 开源 + 云原生 + Java/Go 技术栈。 |

---

## 5. 社区热度与成熟度

*   **最高活跃度**: **OpenAI Codex** 与 **Gemini CLI**。两者今日均有 10 个 Issues 和 10 个 PR，且版本更新频繁（Nightly/Alpha），处于功能快速演进期。
*   **核心维护期**: **GitHub Copilot CLI**。虽然 PR 数量较少（1个），但 Issues 数量均衡，主要集中在稳定性和认证流程的打磨，显示出产品已趋于成熟。
*   **架构重构期**: **Qwen Code**。社区大量讨论集中在架构迁移（Managed Agent）和 CI 稳定性上，表明正处于从旧架构向新架构过渡的关键时期。
*   **静默期**: **Kimi Code**。过去 24 小时无任何活动，可能处于维护版本或无重大更新周期。

---

## 6. 值得关注的趋势信号

1.  **MCP 成为 CLI 工具的“操作系统”**
    *   **信号**: 从 OpenAI Codex 的安全密钥登录到 GitHub Copilot CLI 的 OAuth 认证，再到 Gemini CLI 的 Client Sampling，MCP 协议已不再是附加功能，而是核心交互层。
    *   **参考价值**: 开发者应优先考虑对 MCP 支持良好的工具，或关注 CLI 工具的 MCP Server 生态。

2.  **TUI 交互的工程化挑战**
    *   **信号**: 多个工具（OpenAI Codex, Gemini CLI, Pi）都反馈了 TUI 的复制粘贴、光标控制、跨平台信号处理（SIGTSTP）问题。
    *   **参考价值**: 对于 CLI 工具开发者，终端交互的健壮性（尤其是跨平台）已成为比模型能力更难攻克的“隐形”门槛。

3.  **Agent 行为的可观测性与控制**
    *   **信号**: 社区对 Agent 挂起、Subagent 错误报告、Token 估算错误、权限请求 UX 的关注度极高。
    *   **参考价值**: 用户不再满足于“能跑”，而是要求“可预测”、“可调试”和“可审计”。未来的 CLI 工具必须内置强大的日志和状态查询机制。

4.  **从“模型驱动”向“工具驱动”演进**
    *   **信号**: Gemini CLI 和 Qwen Code 正在探索 AST 感知、原生 Bash 沙箱、Managed Agent 架构。
    *   **参考价值**: CLI 工具正在从单纯的 LLM 喂食器，转变为能够直接操纵文件系统、进程和浏览器环境的智能体。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills 社区热点报告**  
*数据截至 2026‑11‑20 （基于 anthropics/skills 仓库的 PR 与 Issue 列表）*  

---

## 1️⃣ 热门 Skills 排行（评论/关注度最高的 5‑8 条 PR）

| # | Skill (PR) | 功能简述 | 社区讨论热点 | 当前状态 |
|---|------------|----------|--------------|----------|
| **#1742** | **mcp‑builder: support `mcp>=2` streamable_http_client import & custom headers** | 让 Claude 在新版 MCP 2.x 中正确加载 `streamable_http_client`，并支持通过 `create_mcp_http_client` 注入自定义 HTTP 头。 | - 兼容性迁移痛点（旧代码在 2.x 上报错）<br>- 安全性讨论：自定义 Header 可能泄露凭证 | **OPEN** |
| **#1298** | **skill‑creator: isolate trigger evals & fix Windows/runtime failures** | 将触发评估逻辑隔离，解决 Windows 子进程 pipe、并发 probe 竞争以及运行时错误导致的误判。 | - 跨平台可靠性（Windows 用户大量报错）<br>- 触发率下降导致的评估偏差 | **OPEN** |
| **#1245** | **Add `notion-spec-to-implementation` & `quantitative-resume-auditor`** | • 把产品/技术规格页面转化为 Notion 任务卡片，生成实现计划、验收标准。<br>• 自动审计简历数据、给出量化改进建议。 | - “把需求直接落地到任务管理”需求强烈<br>- 简历审计被视为招聘/内部晋升的潜在自动化点 | **OPEN** |
| **#1703** | **md2video‑audio** | 将 Markdown 文档一键编译为带真人语音的 MP4 视频（Marp → Slides → FFmpeg + TTS）。 | - 内容创作者想省去手动配音、渲染步骤<br>- 生成质量、语音合成版权问题 | **OPEN** |
| **#1771** | **proofcore‑contract‑auditor** | 静态分析 Solidity / Rust 合约，生成 Merkle‑proof 并锚定至 TON 区块链，提供零存储审计凭证。 | - Web3 开发者对链上审计凭证的安全需求激增<br>- 合约审计与链上证明的可组合性讨论 | **OPEN** |
| **#525** | **pyxel‑skill** | 为 Retro‑Game 开发提供全套指令：创建项目、帧检查、键盘输入模拟、状态断言等。 | - 游戏爱好者希望在 Claude 中直接调试像素游戏<br>- 对“实时渲染+帧对比”实现细节的技术提问 | **OPEN** |
| **#514** | **document‑typography** | 检测并自动纠正常见排版缺陷（孤行、寡段、编号错位），提升 AI 生成文档的可读性。 | - 大量用户反馈生成的报告、提案出现排版碎片<br>- 需求与 “文档美化” 生态插件的兼容性 | **OPEN** |
| **#1980** | **webapp‑testing: avoid `shell=True` in `with_server.py`** | 移除不安全的 `subprocess.Popen(..., shell=True)`，防止命令注入（CWE‑78）。 | - 安全审计重点：工具链本身不应成为攻击面<br>- 讨论是否需要更细粒度的 sandbox 机制 | **OPEN** |

> **为何这些 PR 热度最高？**  
> - **跨平台兼容**（#1742、#1298）直接影响日常开发者的使用体验。  
> - **业务落地**（#1245、#1703、#1771）提供了从需求到产出的一站式自动化，满足企业级工作流需求。  
> - **安全与质量**（#1980、#514）是社区反复提到的底线要求。  

---

## 2️⃣ 社区需求趋势（从 Issues 中提炼的热门方向）

| 需求方向 | 关键 Issue | 需求要点 |
|----------|------------|----------|
| **可信的 Skill 命名空间 / 安全分发** | #492 *“Community skills distributed under anthropic/ namespace enable trust boundary abuse”* | - 防止恶意社区 Skill 冒充官方 Skill<br>- 需要签名、审计或专属命名空间（如 `anthropic-community/`） |
| **组织内部 Skill 共享** | #228 *“Enable org‑wide skill sharing in Claude.ai”* | - 集中管理、一次性分发给团队成员<br>- UI/CLI 支持共享库、权限控制 |
| **Skill 触发率与评估工具可靠性** | #556、#1352、#1997 | - `run_eval.py` 在并行模式下触发率为 0<br>- YAML 前置元数据解析错误导致描述失真<br>- 需要更稳健的自动评估流水线 |
| **文档/代码产出质量控制** | #514、#189、#2108 | - 排版、重复 Skill、快照状态说明等细节问题<br>- 需求统一的文档质量门槛与自动校验 |
| **大型模型上下文消耗优化** | #1487 *“claude‑api skill eagerly injects ~156k tokens”* | - 防止单次 Tool 调用耗尽上下文窗口<br>- 需要增量传输或分块注入的机制 |
| **业务流程自动化（HPC、云资源、合约审计）** | #1615、#1771 | - 统一的 HPC 集群作业提交、资源配置<br>- 区块链合约审计与链上证明的端到端工作流 |

> **整体趋势**：社区正从“**单功能工具**”向 **“安全、可共享、可评估、可组合的业务工作流”** 迁移。  

---

## 3️⃣ 高潜力待合并 Skills（评论活跃且尚未合并）

| PR | 主要价值 | 讨论亮点 | 预计合并时间窗口 |
|----|----------|----------|-------------------|
| **#1742** (mcp‑builder) | 解决新版 MCP 的破坏性改动，保障已有 Skill 继续运行。 | 兼容性与安全 Header 配置的实现细节争论激烈。 | 预计在 2026‑12‑中旬前合并（已有多轮 CI 通过）。 |
| **#1298** (skill‑creator Windows fix) | 提升跨平台触发评估的稳定性，直接影响 `run_eval.py` 的可信度。 | 多位 Windows 开发者提供复现样例，需求迫切。 | 预计 2026‑11‑下旬合并（已提交单元测试）。 |
| **#1245** (Notion Spec → Implementation) | 将需求文档自动拆解为可执行任务，极大降低手工转写成本。 | 产品经理与技术团队对“自动任务生成”表现出浓厚兴趣。 | 预计 2027‑01 左右合并（仍在完善 Notion API 认证流程）。 |
| **#1703** (md2video‑audio) | 内容创作“一键生成视频”，打开新市场（教育、营销）。 | 语音合成版权与渲染质量的讨论热度最高。 | 预计 2026‑12‑初合并（已通过渲染性能基准）。 |
| **#1771** (proofcore‑contract‑auditor) | 为 Web3 开发提供链上审计证明，填补安全审计链上存证空白。 | 社区对零知识 Merkle 证明的实现细节提出多项改进建议。 | 预计 2027‑02 合并（依赖外部链上合约部署）。 |
| **#1980** (webapp‑testing安全修复) | 移除 `shell=True`，直接消除命令注入风险。 | 安全团队强烈推荐立即合并，已在多个内部项目复现。 | 预计本月合并（已通过安全审计）。 |
| **#525** (pyxel‑skill) | 为 Retro‑Game 开发提供完整调试与验证框架。 | 游戏社区对“帧级断言”和“输入回放”需求持续增长。 | 预计 2027‑01 合并（待完成跨平台 CI）。 |

> **共性**：这些 PR 均围绕 **兼容性/安全**、**业务自动化** 与 **高价值内容生成** 三大主题，社区讨论集中在实现细节、跨平台可靠性以及安全审计上，表明它们是近期落地的重点。

---

## 4️⃣ Skills 生态洞察（一句话总结）

> **“社区正聚焦在提升 Skill 的安全可信、跨组织共享以及端到端业务自动化能力上”，尤其是兼容新平台、可靠的触发评估和安全分发机制成为最迫切的需求。  

---  

*如需进一步细化某一方向的实现路线或贡献指南，请随时告知！*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期**: 2026-11-20
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
今日 OpenAI Codex 项目发布了 **v0.171.0** 版本，核心亮点包括引入 GPT-6.2 Sol 作为默认模型，并默认开启支持文档预览、图片预览及子代理记录的 TUI 工作区。同时，社区活跃度高涨，**Windows Store 更新锁死**、**CLI 安全键登录流程**以及 **Windows Dots 远程控制卡顿**成为高频反馈点。

---

## 2. 版本发布
### rust-v0.171.0
**发布时间**: 2026-11-20
**主要更新**:
*   **模型更新**: 将 GPT-6.2 Sol 和 Astra 加入模型目录，Sol 设为默认选择。
*   **TUI 工作区增强**: 默认启用 TUI 界面，支持可搜索的文档预览、图片预览以及子代理转录日志，提供更丰富的上下文展示。
*   **次要更新**: 发布了 0.172.0-alpha.2 及 0.171.0-alpha.13.1 测试版。

---

## 3. 社区热点 Issues

1.  **#62212 - [APP][BUG] Desktop app: unsupported audio tool output causes HTTP 400**
    *   **重要性**: 高危 Bug，影响桌面端用户的基础对话功能。
    *   **详情**: 某些音频工具输出不支持时，会导致后续纯文本回合返回 HTTP 400 错误，阻断会话。
    *   [查看详情](https://github.com/openai/codex/issues/62212)

2.  **#25737 - [CLI][AUTH] Codex CLI login forces SMS OTP on security-key-only accounts**
    *   **重要性**: 认证流程体验问题，影响安全密钥用户的 CLI 使用。
    *   **详情**: 即使账户仅启用了 FIDO2/CTAP2 硬件密钥，CLI 登录仍会强制跳转至手机 OTP 步骤，而浏览器登录能正确处理。
    *   [查看详情](https://github.com/openai/codex/issues/25737)

3.  **#25770 - [APP][BUG] Windows Store Codex update fails (MSIX locked)**
    *   **重要性**: 平台特定 Bug，阻碍 Windows 用户更新至最新版。
    *   **详情**: Windows Store 安装包更新时因旧包被锁定而反复失败。
    *   [查看详情](https://github.com/openai/codex/issues/25770)

4.  **#47041 - [APP][BUG] GPT-5.6 Sol/GPT-6 Astra reject harmless prompts**
    *   **重要性**: 新模型行为异常，影响开发者的代码生成效率。
    *   **详情**: 桌面端新模型对无害提示词报错 `invalid_prompt`。
    *   [查看详情](https://github.com/openai/codex/issues/47041)

5.  **#61836 - [APP][BUG] Windows Dots connected but commands stall**
    *   **重要性**: 远程控制功能故障，影响跨设备协作。
    *   **详情**: Dots 显示连接成功，但执行列表浏览器标签页或 PowerShell 命令时卡死。
    *   [查看详情](https://github.com/openai/codex/issues/61836)

6.  **#58507 - [APP][BUG] Default permissions ignored, no selector in composer**
    *   **重要性**: 权限管理配置失效，可能导致意外的系统访问风险。
    *   **详情**: 新线程总是默认使用 `workspaceWrite`，配置文件中的 `default_permissions` 和 `sandbox_mode` 被忽略。
    *   [查看详情](https://github.com/openai/codex/issues/58507)

7.  **#33581 - [TUI][BUG] TUI copies left padding spaces from code blocks**
    *   **重要性**: CLI 复制粘贴体验问题，影响脚本执行。
    *   **详情**: 终端 TUI 复制代码块时包含多余的左侧空格，导致 shell 脚本或 YAML 格式错误。
    *   [查看详情](https://github.com/openai/codex/issues/33581)

8.  **#30417 - [iOS][BUG] ChatGPT mobile blocks Codex Cloud when Remote Control disabled**
    *   **重要性**: 移动端功能逻辑缺陷。
    *   **详情**: 即使启用了 Codex Cloud，在移动端被禁用远程控制权限后也无法访问。
    *   [查看详情](https://github.com/openai/codex/issues/30417)

9.  **#4929 - [ENHANCEMENT] Add MCP Client Sampling Support**
    *   **重要性**: 架构扩展需求，连接 MCP 协议生态。
    *   **详情**: 请求在 CLI 中支持 MCP 规范的 Client Sampling，允许 MCP 服务器通过 CLI 调用 AI 模型。
    *   [查看详情](https://github.com/openai/codex/issues/4929)

10. **#33189 - [ENHANCEMENT] Log token usage and cost per request**
    *   **重要性**: 成本控制需求，对开发者至关重要。
    *   **详情**: 请求在 CLI 的 JSON 输出中增加每轮请求的 Token 使用量和总成本日志。
    *   [查看详情](https://github.com/openai/codex/issues/33189)

---

## 4. 重要 PR 进展
*注：今日大量 PR 被 [copyberry[bot]](https://github.com/copyberry) 自动合并，主要集中在性能优化和架构重构。*

1.  **#62636 - Reduce rollout scanning overhead** (已合并)
    *   **内容**: 使用缓冲读取器扫描发布记录，移除不必要的异步解析，大幅提升列表线程的性能。
    *   [查看 PR](https://github.com/openai/codex/pull/62636)

2.  **#62635 - Centralize request and prefix ID handling** (已合并)
    *   **内容**: 将请求 ID 和前缀处理逻辑集中在 `ThreadContextIds`，简化 ID 生成流程。
    *   [查看 PR](https://github.com/openai/codex/pull/62635)

3.  **#62633 - Centralize thread context ID allocation** (已合并)
    *   **内容**: 统一响应项 ID 和上下文窗口 ID 的分配器，统一管理会话历史和推理的 ID 生成。
    *   [查看 PR](https://github.com/openai/codex/pull/62633)

4.  **#62627 - Retry Guardian model discovery in the background** (已合并)
    *   **内容**: 在后台异步进行模型目录获取，避免在工具调用时因获取失败而阻塞工具执行。
    *   [查看 PR](https://github.com/openai/codex/pull/62627)

5.  **#62615 - Split in-memory execution policy rules** (已合并)
    *   **内容**: 将执行策略规则从主代码库拆分到独立的 `codex-execpolicy` crate，改善代码结构和依赖管理。
    *   [查看 PR](https://github.com/openai/codex/pull/62615)

6.  **#62609 - Apply backpressure to app-server request replay** (已合并)
    *   **内容**: 在恢复会话时对服务器请求回放应用背压机制，防止因客户端读取缓慢导致连接队列溢出。
    *   [查看 PR](https://github.com/openai/codex/pull/62609)

7.  **#62599 - Stream app-server `fs/readFile` responses over stdio** (已合并)
    *   **内容**: 优化大文件读取性能，直接流式传输文件字节而非先构建完整字符串再编码，减少内存占用。
    *   [查看 PR](https://github.com/openai/codex/pull/62599)

8.  **#62588 - Support a host-selected inference provider for Guardian** (已合并)
    *   **内容**: 允许 Guardian 组件使用与宿主不同的推理提供商，解决多提供商环境下的策略路由问题。
    *   [查看 PR](https://github.com/openai/codex/pull/62588)

9.  **#62624 - Share slash command argument range mapping in TUI** (已合并)
    *   **内容**: 统一斜杠命令参数的偏移量计算逻辑，确保聊天编辑器和命令分发器对参数范围的处理一致。
    *   [查看 PR](https://github.com/openai/codex/pull/62624)

10. **#30963 - Validate approval responses against pending authority** (开放中)
    *   **内容**: 修复权限审批响应验证逻辑，防止响应 ID 匹配错误导致审批边界失效。
    *   [查看 PR](https://github.com/openai/codex/pull/30963)

---

## 5. 功能需求趋势
从 Issue 和 PR 的分析来看，社区关注点主要集中在以下三个方向：
1.  **跨平台与移动端集成**: 无论是 Windows Store 更新锁死、iOS Remote Control 逻辑错误，还是跨设备上下文共享，都显示出用户对多端一致性的极高要求。
2.  **模型能力与稳定性**: 随着新模型 (GPT-6, GPT-5.6) 的引入，开发者对其准确性和鲁棒性（如 `invalid_prompt`、音频工具输出错误）提出了大量反馈。
3.  **生态连接**: MCP (Model Context Protocol) 相关的增强需求（如 Client Sampling）在社区中热度上升，表明开发者希望 Codex 能更无缝地接入外部工具生态。

---

## 6. 开发者关注点
*   **性能瓶颈**: macOS 桌面端在导航大型会话时出现渲染卡顿，以及 Windows 上 WSLg 日志积累导致的磁盘空间耗尽。
*   **权限与沙箱**: 沙盒权限选择器消失、默认权限覆盖配置、以及 Windows 沙盒登录策略错误，都是影响安全性的关键点。
*   **远程控制体验**: Windows Dots 功能的卡顿和连接稳定性问题，直接影响依赖 Codex 进行远程开发的用户体验。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期**: 2026-11-20  
**来源**: google-gemini/gemini-cli

---

## 1. 今日速览

今日主要发布了 **v0.71.0-nightly** 和 **v0.71.0-preview.0** 版本。新版本重点修复了模板替换中 `$` 字符的保留问题，并新增了用于展示每日 Token 使用量的 `/stats heatmap` 子命令。同时，社区在 Agent 稳定性、沙箱安全（如 bash affinity）以及 AST 感知代码库探索方面提出了大量需求与反馈，显示出项目正从功能完善向深层工程优化迈进。

---

## 2. 版本发布

### v0.71.0-nightly.20261120.gd4cb1713f (最新 Nightly)
*   **核心修复**: 修复了在模板占位符替换过程中意外丢失字面量 `$` 字符的问题。
*   **新功能**: 新增 `/stats heatmap` 子命令，支持可视化展示每日 Token 使用情况。

### v0.71.0-preview.0
*   **更新日志**: 自动生成 v0.70.0-preview.0 及 v0.69.0 的更新日志。

### v0.70.0 & v0.69.0 (稳定版)
*   **v0.70.0**: 包含 v0.68.0 的更新日志及版本号升级。
*   **v0.69.0**: 同样包含 `$` 字符修复及 Token 统计热力图功能。

---

## 3. 社区热点 Issues (Top 10)

1.  **[P1] Subagent 恢复机制 Bug (#22323)**
    *   **摘要**: `codebase_investigator` 子代理在达到 MAX_TURNS 时，错误地报告为 "GOAL success" 而非中断，导致结果被隐藏。
    *   **重要性**: P1 级严重 Bug，影响代码库调查功能的核心可靠性。
    *   **链接**: [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2.  **[P1] Generalist Agent 挂起问题 (#21409)**
    *   **摘要**: 当 `gemini-cli` 转向 Generalist Agent 时会无限期挂起，即使在创建文件夹等简单操作时也会发生。
    *   **重要性**: 影响基础交互体验，用户反馈需等待长达一小时。
    *   **链接**: [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3.  **[P2] 利用模型原生 Bash 能力与零依赖沙箱 (#19873)**
    *   **摘要**: 建议利用 Gemini 3 模型原生 Bash 能力，通过零依赖 OS 沙箱和执行后意图路由来提升安全性与效率。
    *   **重要性**: 涉及 Agent 架构的根本性优化方向，强调安全与性能平衡。
    *   **链接**: [Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)

4.  **[P2] Browser Agent 配置覆盖失效 (#22267)**
    *   **摘要**: Browser Agent 完全忽略 `settings.json` 中的全局或项目级配置覆盖（如 `maxTurns`）。
    *   **重要性**: 用户无法通过配置文件灵活控制浏览器代理的行为。
    *   **链接**: [Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)

5.  **[P2] Browser Agent 在 Wayland 下失败 (#21983)**
    *   **摘要**: Browser subagent 在 Wayland 环境下运行失败。
    *   **重要性**: 影响使用 Linux 桌面环境的开发者体验。
    *   **链接**: [Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983)

6.  **[P2] Agent 未充分利用 Skills (#21968)**
    *   **摘要**: Gemini 在独立运行时很少主动使用自定义 Skills（如 Gradle, Git），需手动指令。
    *   **重要性**: 限制了 Agent 自主能力的发挥，影响自动化效率。
    *   **链接**: [Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)

7.  **[P2] 工具数量超过 128 个时报 400 错误 (#24246)**
    *   **摘要**: 当可用工具超过 128 个时，CLI 遇到 400 错误。
    *   **重要性**: 随着生态丰富，Agent 需要更智能的工具过滤机制。
    *   **链接**: [Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)

8.  **[P2] Agent 的破坏性行为控制 (#22672)**
    *   **摘要**: 在复杂 Git 操作或数据库维护时，Agent 偶尔会使用 `git reset --force` 等危险命令。
    *   **重要性**: 安全性关注点，防止 Agent 造成不可逆的数据丢失。
    *   **链接**: [Issue #22672](https://github.com/google-gemini/gemini-cli/issues/22672)

9.  **[P3] AST 感知的文件读取与搜索 (#22745)**
    *   **摘要**: 评估使用 AST 感知工具进行文件读取和搜索的价值，旨在减少 Token 消耗并提高精度。
    *   **重要性**: 潜在的重大性能优化方向，减少上下文噪音。
    *   **链接**: [Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)

10. **[P3] Subagent 轨迹可见性 (#22598)**
    *   **摘要**: 希望通过 `/chat share` 命令让 Subagent 的执行轨迹变得可见且易于分享。
    *   **重要性**: 提升调试和评估 Agent 行为的便利性。
    *   **链接**: [Issue #22598](https://github.com/google-gemini/gemini-cli/issues/22598)

---

## 4. 重要 PR 进展 (Top 10)

1.  **[Core] 修复 Git 忽略规则中的嵌套否定逻辑 (#30370)**
    *   **内容**: 修复了在 `dir/**` 匹配下，嵌套 `.gitignore` 文件中的 `!keep.txt` 规则失效的问题。
    *   **链接**: [PR #30370](https://github.com/google-gemini/gemini-cli/pull/30370)

2.  **[CLI] 修复 Windows 下波浪号路径解析 (#30376)**
    *   **内容**: 修复了 `resolvePath()` 无法正确处理 Windows 特有的 `~\` 路径格式，导致配置加载失败的问题。
    *   **链接**: [PR #30376](https://github.com/google-gemini/gemini-cli/pull/30376)

3.  **[Agent] 添加工具调用超时配置 (#30212)**
    *   **内容**: 新增 `tools.callTimeout` 设置，允许用户为单个工具调用设置超时，防止死锁。
    *   **状态**: 等待反馈。
    *   **链接**: [PR #30212](https://github.com/google-gemini/gemini-cli/pull/30212)

4.  **[ACP] 支持 ACP Session 关闭 (#30368)**
    *   **内容**: 实现了 `session/close` 能力，允许客户端在进程退出前释放会话资源。
    *   **链接**: [PR #30368](https://github.com/google-gemini/gemini-cli/pull/30368)

5.  **[Core] 防止 PowerShell 命令解析导致 UI 冻结 (#30334)**
    *   **内容**: 修复了在 Windows 上解析 PowerShell 命令时导致 UI 旋转器和计时器停止更新的问题。
    *   **链接**: [PR #30334](https://github.com/google-gemini/gemini-cli/pull/30334)

6.  **[Core] 修复 SSH 命令被覆盖为空字符串 (#30335)**
    *   **内容**: 修复了 `getSafeGitEnv()` 将 `core.sshCommand` 设置为空字符串，导致 Git 操作失败的问题。
    *   **链接**: [PR #30335](https://github.com/google-gemini/gemini-cli/pull/30335)

7.  **[Core] 避免在托管历史中重复提示 (#30363)**
    *   **内容**: 优化了提示历史处理逻辑，防止重复发送原始提示，提升上下文管理的健壮性。
    *   **链接**: [PR #30363](https://github.com/google-gemini/gemini-cli/pull/30363)

8.  **[ACP] 报告 Agent 停止原因 (#30362)**
    *   **内容**: 修复了 ACP 在处理 Agent 停止事件时导致对话突然结束且无提示的问题。
    *   **链接**: [PR #30362](https://github.com/google-gemini/gemini-cli/pull/30362)

9.  **[Docs] 修复内部文档链接 (#30375)**
    *   **内容**: 修复了文档中缺失 `.md` 后缀或锚点错误的链接。
    *   **链接**: [PR #30375](https://github.com/google-gemini/gemini-cli/pull/30375)

10. **[Dependencies] 大规模依赖更新 (#30360)**
    *   **内容**: 依赖项自动更新（如 octokit, vitest 等），涉及 67 个包的升级。
    *   **链接**: [PR #30360](https://github.com/google-gemini/gemini-cli/pull/30360)

---

## 5. 功能需求趋势

*   **AST 感知与代码探索**: 多个 Issue (#22745, #22746, #22747) 正在讨论引入 AST（抽象语法树）工具来替代传统的文本搜索。目标是实现更精准的代码读取、减少 Token 消耗并提升 Agent 理解代码结构的能力。
*   **Agent 沙箱与原生 Bash**: 社区强烈建议利用模型的原生 Bash 能力，但同时也需要更安全的零依赖沙箱机制，以防止 Agent 产生破坏性文件操作。
*   **多模态与浏览器 Agent**: 针对浏览器 Agent 的改进需求持续存在，包括会话恢复、配置覆盖支持以及在特定桌面环境（如 Wayland）下的兼容性修复。
*   **内部评估体系**: 为了提高内部评估的可靠性和一致性，社区正在推动相关测试的稳定化工作 (#23166)。

---

## 6. 开发者关注点

*   **稳定性**: Generalist Agent 挂起和 Subagent 错误报告为成功是开发者最头疼的问题，直接影响开发效率。
*   **配置管理**: 用户反馈 Agent 忽略配置文件设置（如 `maxTurns`），这限制了工具的灵活性。
*   **跨平台兼容性**: Windows 下的路径解析（`~\`）和 PowerShell 解析导致的 UI 卡顿是 Windows 用户的主要痛点。
*   **资源清理**: Agent 频繁生成临时脚本到随机位置，导致清理工作困难，增加维护负担。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-11-20  
**来源**: github.com/github/copilot-cli

---

## 1. 今日速览
今日社区聚焦于 **MCP (Model Context Protocol) 认证流程的稳定性**，特别是非第一方 HTTP 服务器的 OAuth 登录失败问题。同时，**会话状态持久化**（ACP 外部集成）和 **上下文记忆管理**（PDF 解析、Token 估算）的缺陷引发了开发者的广泛关注。随着版本迭代，插件系统和 Windows 平台兼容性也成为高频反馈点。

---

## 2. 版本发布
**v1.0.115-1** (发布于过去24小时)
*   **核心修复**：修复了 MCP 登录时，当服务器授予所需权限但遗漏自动请求的 `refresh-token` 作用域时，流程可能中断的问题。
*   **工作流优化**：改进了直接工作流执行逻辑，确保其能等待项目扩展工作流完成注册，提升初始化成功率。

---

## 3. 社区热点 Issues (Top 10)

**1. MCP OAuth 登录失败与无反馈 (#4017)**
*   **状态**: CLOSED
*   **关注点**: 非第一方 HTTP MCP 服务器（如 Atlassian）在设置中开启后，**无浏览器弹窗、无报错、无法连接**。这是目前 MCP 集成体验最大的痛点。
*   **链接**: [github.com/github/copilot-cli Issue #4017](https://github.com/github/github/copilot-cli/issues/4017)

**2. 过期 Token 强制交互式登录而非静默刷新 (#4203)**
*   **状态**: OPEN
*   **关注点**: 当缓存访问令牌过期时，系统未能尝试使用缓存的 `refresh_token` 进行静默刷新，而是强制用户进行交互式登录，严重影响 ACP 外部代理的使用效率。
*   **链接**: [github.com/github/copilot-cli Issue #4203](https://github.com/github/copilot-cli/issues/4203)

**3. 会话状态未持久化导致重启后失败 (#5501)**
*   **状态**: OPEN
*   **关注点**: 在 Zed 编辑器等 ACP 集成场景下，某些会话的 `events.jsonl` 在重启后丢失，导致 `session/load` 请求直接报错 `-32002`，破坏了会话连续性。
*   **链接**: [github.com/github/copilot-cli Issue #5501](https://github.com/github/copilot-cli/issues/5501)

**4. PDF 上下文估算错误导致不必要的压缩 (#5517)**
*   **状态**: OPEN
*   **关注点**: 粘贴 PDF 后，上下文估算按**编码大小**计算（如 620k），而非实际 Token 消耗（31k），导致系统过早触发不必要的数据压缩，影响上下文完整性。
*   **链接**: [github.com/github/copilot-cli Issue #5517](https://github.com/github/copilot-cli/issues/5517)

**5. Windows Vim 编辑器 Backspace 输入异常 (#3374)**
*   **状态**: CLOSED
*   **关注点**: 在 Windows 11 + Vim 环境下，通过 `Ctrl+G` 调用编辑器时，`Backspace` 键输入的是 `⌂` (0x7F) 而非删除字符，严重影响编辑体验。
*   **链接**: [github.com/github/copilot-cli Issue #3374](https://github.com/github/copilot-cli/issues/3374)

**6. 上下文记忆 User Scope 404 错误 (#5516)**
*   **状态**: OPEN
*   **关注点**: `store_memory` 在无法获取用户级记忆时仍提示提供 `user` scope，导致所有用户级存储请求均返回 404，用户无法保存个人偏好。
*   **链接**: [github.com/github/copilot-cli Issue #5516](https://github.com/github/copilot-cli/issues/5516)

**7. 5MB 限制后 /compact 无法恢复会话 (#4424)**
*   **状态**: CLOSED
*   **关注点**: 当 CAPI 请求达到 5MB 上限且 `/compact` 失败后，系统无法通过任何方式减少上下文，导致会话永久“卡死”。
*   **链接**: [github.com/github/copilot-cli Issue #4424](https://github.com/github/copilot-cli/issues/4424)

**8. BYOK 模型认证在 v1.0.107+ 破坏 (#5519)**
*   **状态**: CLOSED
*   **关注点**: 升级到 1.0.107+ 后，使用 BYOK（自带密钥）连接本地模型时，无法验证模型目录所有权，导致工具补全功能失效。
*   **链接**: [github.com/github/copilot-cli Issue #5519](https://github.com/github/copilot-cli/issues/5519)

**9. 交互式 MCP OAuth 代码交换失败 (#5350)**
*   **状态**: CLOSED
*   **关注点**: 在 WSL2 环境下，Azure DevOps 等 Entra ID MCP 服务器的交互式登录完成浏览器跳转后，**代码交换环节卡在 "Connecting"**。
*   **链接**: [github.com/github/copilot-cli Issue #5350](https://github.com/github/copilot-cli/issues/5350)

**10. Windows MCP Worker 进程僵尸问题 (#4972)**
*   **状态**: CLOSED
*   **关注点**: 通过包装器启动的 MCP Worker 进程在会话退出后未正确终止，导致僵尸进程残留。
*   **链接**: [github.com/github/copilot-cli Issue #4972](https://github.com/github/copilot-cli/issues/4972)

---

## 4. 重要 PR 进展 (Top 10)

**1. PR #2957: 修复扩展启动路径不匹配**
*   **状态**: CLOSED
*   **内容**: 修复了 macOS 和 Windows 上扩展加载失败的问题。错误源于 `index.js` 期望的安全检查路径（SEA 二进制目录）与 `app.js` 传入的 pkg 缓存路径不一致。
*   **链接**: [github.com/github/copilot-cli Pull Request #2957](https://github.com/github/copilot-cli/pull/2957)

*(注：过去24小时内仅有 1 条 PR 更新，其余高价值 PR 为历史重要更新)*

---

## 5. 功能需求趋势

1.  **MCP 认证与集成体验 (MCP Authentication)**
    *   **占比**: 极高
    *   **趋势**: 社区对 MCP 的 HTTP 服务器支持、OAuth 3LO 流程、以及非第一方服务的兼容性有大量反馈。**静默刷新** 和 **错误反馈** 是核心诉求。
2.  **上下文管理与性能优化**
    *   **趋势**: 关注点集中在 PDF 等特殊格式文件的 Token 估算准确性，以及 5MB 上下文限制后的恢复机制。开发者希望 CLI 能更智能地管理上下文，而不是盲目压缩。
3.  **ACP (External Agent) 持久化**
    *   **趋势**: 随着与 Zed 等编辑器集成，会话状态能否跨进程重启保持是开发者最关心的问题之一。

---

## 6. 开发者关注点

*   **Windows 平台兼容性**: Vim 编辑器、MCP Worker 进程管理、Sandbox 限制等 Windows 特有问题的修复速度直接影响 Windows 用户的体验。
*   **WSL2 环境支持**: 多数 MCP 登录失败案例发生在 WSL2 环境下，开发者急需针对 Linux 子系统的浏览器流和 Entra ID 集成支持。
*   **配置与文档**: 社区呼吁更清晰的配置文档（如 Global Instructions、AGENTS.md 的使用规则）以及 Sandbox 配置的灵活性，以减少配置错误。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期**：2026-11-20  
**数据来源**：[GitHub: anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览

OpenCode 社区今日活跃度极高，主要围绕 **V2 版本（2.3.2）** 的核心稳定性与 Claude Agent 的模型切换机制进行修复。同时，社区提出了关于 **多会话管理**、**权限请求 UX** 及 **交互式终端工具** 的新功能需求，显示出开发者在追求更流畅体验方面的持续探索。

---

## 2. 版本发布

**无新版本发布**  
当前最新稳定版为 **2.3.2**，社区正在进行大量针对 V2 的 Bug 修复与功能优化（PR 数量显著）。

---

## 3. 社区热点 Issues

以下选取了评论数最高及最受关注的 10 个 Issue，反映当前社区最迫切的需求：

1. **[CLOSED] Copy To Clipboard is not working (#4283)** - *评论 161*
   - **重要性**：核心功能故障，影响所有用户。
   - **摘要**：终端中无法复制 AI 回复的文本，尽管 Issue 已关闭，但修复可能仍在验证中。

2. **[OPEN] Expose the V2 TUI composer to plugins (#51209)** - *评论 15*
   - **重要性**：插件生态扩展的关键。
   - **摘要**：希望 V2 插件能像 V1 一样直接操作 TUI 编写器，提升插件能力。

3. **[OPEN] core: edit tool hangs indefinitely (#64869)** - *评论 11*
   - **重要性**：V2 核心编辑功能的稳定性问题。
   - **摘要**：特定路径下编辑工具在后台服务中无限挂起，而 `write` 操作正常。

4. **[OPEN] claude-agent: model list flips between `fable` and `claude-fable-5-2` (#64746)** - *评论 3*
   - **重要性**：Claude Agent 提供商的模型标识问题。
   - **摘要**：模型 ID 频繁切换导致旧会话失效，PR #65032 正在修复此问题。

5. **[OPEN] auth: per-project credential activation (#51152)** - *评论 4*
   - **重要性**：多项目管理与计费隔离。
   - **摘要**：当前凭证切换是全局的，建议实现按项目/文件夹激活凭证。

6. **[OPEN] [FEATURE]: Improve shell command permission request UX (#38526)** - *评论 4*
   - **重要性**：提升安全性与易用性。
   - **摘要**：请求展示的 Shell 命令过长，影响用户判断是否授权。

7. **[OPEN] Lost scroll position when switch Markdown views in Web (#61033)** - *评论 3*
   - **重要性**：Web 界面体验问题。
   - **摘要**：切换标签页时 Markdown 视图滚动位置重置。

8. **[OPEN] Shell permission ask is skipped for PowerShell script invocation on Windows (#65008)** - *评论 3*
   - **重要性**：Windows 平台特定安全漏洞。
   - **摘要**：PowerShell 脚本执行未触发权限请求，可能被滥用。

9. **[OPEN] [FEATURE]: find sessions by session ID in the picker (#65023)** - *评论 1*
   - **重要性**：会话管理效率提升。
   - **摘要**：通过会话 ID 搜索会话，方便从日志或 URL 复制后快速恢复。

10. **[OPEN] [FEATURE]: add interactive pty tool for retained REPL, debugger... (#65017)** - *评论 2*
    - **重要性**：增强对交互式工具的支持。
    - **摘要**：希望原生支持 PTY，以便驱动 Python REPL、调试器等。

---

## 4. 重要 PR 进展

以下选取了最具技术价值的 10 个 PR，涵盖核心修复与功能开发：

1. **fix(core): keep every listed Claude model ID working when Claude Code renames a model (#65032)**
   - **内容**：修复 Claude Code 模型重命名导致 OpenCode 会话失效的问题。
   - **状态**：开放中

2. **feat(core): rotate between Claude accounts when one hits its usage limit (#65035)**
   - **内容**：实现 Claude Agent 多账户轮转，自动切换到下一个有额度的账户。
   - **状态**：开放中

3. **feat(core): machine keys and one-use join strings (#65031)**
   - **内容**：核心功能，支持生成一次性加入字符串，实现无网络代码的计算机间协作。
   - **状态**：开放中

4. **fix(core): recover a machine filename with POSIX rules on a Windows server (#65022)**
   - **内容**：修复跨机器文件名在 Windows 服务器上的兼容性问题。
   - **状态**：已关闭

5. **fix(ai): pass safety settings on Google Interactions (#65036)**
   - **内容**：修复 Google AI 交互时静默丢弃安全设置的问题。
   - **状态**：开放中

6. **fix(core): use <system-update> for instruction updates in every prompt (#65034)**
   - **内容**：统一指令更新的传递方式，优化核心逻辑。
   - **状态**：开放中

7. **feat(core): send mid-conversation tool changes in place (#64381)**
   - **内容**：支持会话中途动态变更可用工具，提升 MCP 与插件交互的灵活性。
   - **状态**：开放中

8. **feat(tui): find sessions by ID (#65024)**
   - **内容**：实现通过会话 ID 快速查找会话，解决当前仅支持标题搜索的痛点。
   - **状态**：开放中

9. **refactor(codemode): use the psychoscript package for the language (#65011)**
   - **内容**：重构 Code Mode 的语言支持，将其迁移至 `psychoscript` 包，提升可维护性。
   - **状态**：开放中

10. **release: promote dev to production (#64784)**
    - **内容**：将 `dev` 分支合并至 `production`，包含 Tidepool Alpha Free 与 Gemini 4 Neon 的相关文档与核心更新。
    - **状态**：已关闭

---

## 5. 功能需求趋势

从 Issue 数据中提炼出社区关注的三大方向：

1. **多账户与多项目隔离**：
   - 关注点：Claude Agent 的多账户轮转 (#65035)、按项目激活凭证 (#51152)。
   - 趋势：用户需要更精细的计费与项目管理控制。

2. **交互式工具支持**：
   - 关注点：原生 PTY 工具 (#65017)、Shell 权限 UX (#38526)。
   - 趋势：开发者希望 OpenCode 能更原生地支持 REPL、调试器等交互式环境。

3. **模型与提供商稳定性**：
   - 关注点：Claude 模型重命名 (#64746)、Gemini MCP schema 兼容性 (#63762)、Google AI 安全设置 (#65036)。
   - 趋势：随着提供商 API 变更频繁，OpenCode 需要更强的适配与容错能力。

---

## 6. 开发者关注点

- **核心编辑与后台服务稳定性**：`edit` 工具在特定路径挂起 (#64869) 以及后台会话自动恢复导致的 Token 浪费 (#56032) 是高频痛点。
- **跨平台与跨协议兼容性**：Windows 下的 PowerShell 权限 (#65008) 和 macOS 下的 OSC 8 超链接 (#64683) 显示平台特定问题仍需关注。
- **插件与 MCP 生态**：V2 TUI 编写器暴露 (#51209)、MCP 工具变更实时同步 (#64381) 是插件开发者最关心的功能。

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-11-20
**来源**: [pi-mono](https://github.com/badlogic/pi-mono)

---

## 1. 今日速览
*   **SIGTSTP 信号处理重大修复**: PR #12339 和 #12336 解决了 `kill -TSTP` 导致终端状态残留和鼠标跟踪失效的问题，提升了跨平台交互体验。
*   **视觉体验优化**: 多项 TUI (终端界面) PR 修复了光标闪烁、滚动回溯重绘和选择器交互等视觉和操作体验问题。
*   **多模型兼容性更新**: 修复了 OpenAI Codex 的提示词缓存失效问题，并更新了 qwen-token-plan 和 GitHub Copilot 模型列表，支持更多新模型。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues

1.  **[Windows] 如何在 Windows 上使用 Pi？遇到哪些问题？** (#7547)
    *   **重要性**: 这是一个高热度的基础体验问题。讨论了 Pi 在 Windows 上的多种运行方式，开发者呼吁明确优先级（如文档、开箱即用 vs 核心功能），以降低 Windows 用户的入门门槛。
    *   **链接**: [Issue #7547](https://github.com/badlogic/pi-mono/issues/7547)

2.  **[XDG Base Directory] 应用不应在主目录产生混乱** (#2870)
    *   **重要性**: Linux 开发者关注的标准合规性问题。用户抱怨配置文件散落在 `~` 下，希望应用遵循 XDG 标准将配置和状态存放在 `$XDG_CONFIG_HOME` 或 `$XDG_DATA_HOME`，以保持环境整洁。
    *   **链接**: [Issue #2870](https://github.com/badlogic/pi-mono/issues/2870)

3.  **[Fullscreen] 大量转录文本渲染导致性能瓶颈** (#9549)
    *   **重要性**: 性能优化问题。在 Windows 11 上，大量文本会耗尽 CPU 核心，因为每次调整大小或渲染都会重绘整个转录文本，缺乏高效的增量渲染机制。
    *   **链接**: [Issue #9549](https://github.com/badlogic/pi-mono/issues/9549)

4.  **[Durable] 持久化存储的会话删除功能缺失** (#11026)
    *   **重要性**: 数据管理功能需求。用户希望在 `pi-durable` 中提供 API 以永久删除会话，防止旧会话数据无限堆积，特别是当运行中的会话被中断时。
    *   **链接**: [Issue #11026](https://github.com/badlogic/pi-mono/issues/11026)

5.  **[Anthropic] 企业级账号登录失败：未知 Scope** (#12318)
    *   **重要性**: 企业级集成痛点。使用 Claude Team/Enterprise 账号登录时，OAuth 授权请求被拒绝，阻止了付费用户或团队使用该功能。
    *   **链接**: [Issue #12318](https://github.com/badlogic/pi-mono/issues/12318)

6.  **[llama.cpp] 决策分类器忽略图片输入** (#12282)
    *   **重要性**: 多模态支持 Bug。本地模型（如 Clef-Flash-GGUF）虽然支持图片输入，但 Pi 仍将其视为纯文本模型，导致图片分类请求被拒绝。
    *   **链接**: [Issue #12282](https://github.com/badlogic/pi-mono/issues/12282)

7.  **[DevContainer] 复制粘贴功能失效** (#11273)
    *   **重要性**: 开发环境兼容性。在 DevContainer 中，由于缺少 `wl-clipboard` 或 Wayland 权限问题，Pi 的复制功能无法工作，影响开发流。
    *   **链接**: [Issue #11273](https://github.com/badlogic/pi-mono/issues/11273)

8.  **[OpenAI] GPT-6.2 缓存命中率显著下降** (#12264)
    *   **重要性**: 模型性能对比。开发者发现 GPT-6.2 Sol 在缓存复用率上远低于 GPT-6.1，这直接增加了 API 调用成本。
    *   **链接**: [Issue #12264](https://github.com/badlogic/pi-mono/issues/12264)

9.  **[Copilot] 企业管理员开启的模型重启后隐藏** (#11006)
    *   **重要性**: 企业级管理 Bug。管理员通过 GitHub Copilot Enterprise 开启的模型，在 Pi 重启后不会出现在模型选择器中，导致模型不可用。
    *   **链接**: [Issue #11006](https://github.com/badlogic/pi-mono/issues/11006)

10. **[ACPI] Pi Durable 的 JetBrains IDE 集成适配缺失** (#10389)
    *   **重要性**: IDE 集成趋势。开发者希望为 Pi Durable 引入 ACP (Agent Client Protocol) 适配器，以便在 JetBrains IDE 中通过 ACP 协议调用持久化功能。
    *   **链接**: [Issue #10389](https://github.com/badlogic/pi-mono/issues/10389)

---

## 4. 重要 PR 进展

1.  **[PR #12339] fix(tui): Keep the SIGTSTP listener tied to terminal ownership**
    *   **内容**: 修复了外部 `SIGTSTP` 信号导致终端状态残留的问题。确保 TUI 在启动前和停止后正确绑定和释放终端所有权。
    *   **链接**: [PR #12339](https://github.com/badlogic/pi-mono/pull/12339)

2.  **[PR #12336] fix(coding-agent): Flush stdout before exiting after stopping a TUI**
    *   **内容**: 修复了在 TUI 停止并退出时，stdout 缓冲区未刷新导致终端控制序列（如关闭鼠标跟踪）丢失的问题。
    *   **链接**: [PR #12336](https://github.com/badlogic/pi-mono/pull/12336)

3.  **[PR #12335] fix(coding-agent): Send images to llama.cpp decision classifiers**
    *   **内容**: 修复了多模态支持 Bug。现在支持将图片发送给报告支持图片输入的 llama.cpp 模型（如 Clef），解决了之前的拒绝错误。
    *   **链接**: [PR #12335](https://github.com/badlogic/pi-mono/pull/12335)

4.  **[PR #12332] feat(ai): Send strict tools to Claude on GitHub Copilot**
    *   **内容**: 增强了与 GitHub Copilot 的兼容性。现在 Pi 会将工具的 `strict` 模式发送给 Copilot 上的 Claude 模型，以获得更严格的 JSON 采样。
    *   **链接**: [PR #12332](https://github.com/badlogic/pi-mono/pull/12332)

5.  **[PR #12329] fix(ai): Send strict on GitHub Copilot Responses tools**
    *   **内容**: 修复了 Copilot Responses 模型的工具调用问题。之前 Copilot 的 18 个 Responses 模型因为缺少 `supportsStrictMode` 标志而没有发送严格模式。
    *   **链接**: [PR #12329](https://github.com/badlogic/pi-mono/pull/12329)

6.  **[PR #12313] fix(ai): Add qwen4-max-preview to qwen-token-plan-individual models**
    *   **内容**: 更新了模型列表。将 `qwen4-max-preview` 添加到 `qwen-token-plan-individual` 和 `qwen-token-plan-individual-cn` 提供商的允许列表中。
    *   **链接**: [PR #12313](https://github.com/badlogic/pi-mono/pull/12313)

7.  **[PR #12319] fix(ai): Make Codex system prompts cacheable**
    *   **内容**: 修复了提示词缓存失效问题。将 OpenAI Codex 的系统提示词从不可缓存的顶层 `instructions` 字段移至可缓存的上下文前缀，以降低成本。
    *   **链接**: [PR #12319](https://github.com/badlogic/pi-mono/pull/12319)

8.  **[PR #12325] fix(ai): Keep GitHub Copilot's available models up to date**
    *   **内容**: 修复了模型列表刷新问题。确保在 Token 刷新和模型刷新时，正确更新 Copilot 的 `availableModelIds`，防止管理员开启的模型被隐藏。
    *   **链接**: [PR #12325](https://github.com/badlogic/pi-mono/pull/12325)

9.  **[PR #12334] fix(coding-agent,tui): Cursor keys in selector search keep the selection**
    *   **内容**: 优化了搜索交互体验。在搜索框中使用左右光标键时，不再重置选择器的高亮，保持当前选中的最佳匹配。
    *   **链接**: [PR #12334](https://github.com/badlogic/pi-mono/pull/12334)

10. **[PR #12304] fix(coding-agent): Smoke-test managed updates with the launcher's Node.js**
    *   **内容**: 修复了依赖库冲突导致的启动崩溃。在 CachyOS 系统更新 `simdjson` 后，Pi 的 Node.js 运行时无法加载新的共享库。
    *   **链接**: [PR #12304](https://github.com/badlogic/pi-mono/pull/12304)

---

## 5. 功能需求趋势

*   **IDE 集成**: 高频提及 JetBrains IDE 集成（ACPI 协议适配），以及 DevContainer 的兼容性问题。
*   **Linux 标准化**: 强烈呼吁遵循 XDG Base Directory 标准，改善 Linux 下的环境整洁度。
*   **多模态能力**: 社区开始关注本地模型（如 llama.cpp）和 AI 服务商（如 Gemini 4）的图片输入支持。
*   **企业级管理**: 关注 GitHub Copilot Enterprise 的模型管理和权限同步问题。

---

## 6. 开发者关注点

*   **跨平台稳定性**: Windows 下的终端控制、SIGTSTP 信号处理和鼠标跟踪是主要痛点。
*   **性能优化**: 大量文本流式渲染导致的 CPU 饱和问题需要优化渲染逻辑。
*   **成本控制**: GPT-6.2 的低缓存命中率直接影响了 API 调用成本，社区希望修复缓存机制。
*   **复制粘贴体验**: 在 Wayland/DevContainer 环境下的剪贴板操作存在阻碍。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-11-20  
**分析工具：** AI 开发技术分析师  
**数据来源：** github.com/QwenLM/qwen-code

---

## 1. 今日速览
**CI 稳定性告急**：今日 GitHub Actions 频繁报错，其中 `Main CI failed` 相关的 Issues 数量激增，尤其是与 Java SDK 和 E2E 测试相关的失败。**Managed Agent 架构迁移**正在加速推进，大量 PR 专注于简化生命周期和修复遗留问题。**Web Shell 多端体验**成为新焦点，新增了 iOS Safari 键盘遮挡问题的修复及 Arabic（阿拉伯语）支持。

---

## 2. 版本发布
*无新版本发布。*

---

## 3. 社区热点 Issues

**#15486 [P1] 自动压缩导致 Token 计数错误，阻断请求**
*   **重要性**：P1 级别 Bug，直接导致核心对话功能无法正常进行或被截断。
*   **原因**：自动压缩在处理待处理的工具结果时，会导致下一轮请求的 Token 估算错误（重复计数并增加 20K 填充），从而触发 `max_tokens: 1` 截断。
*   **社区反应**：6 个评论，处于 `ready-for-agent` 状态。

**#17039 [P1] Managed Agent Gate 稳定性问题，影响所有 PR**
*   **重要性**：基础设施级故障，导致凡是涉及 Java SDK 的 PR 都可能通过 Gate 但遗留 Bug。
*   **原因**：PR #17006 合并时 Java 测试失败，但 Gate 未阻断合并，导致后续所有 PR 继承该问题。
*   **社区反应**：4 个评论，亟需将 Gate 设为 Required。

**#17851 [P1] Managed Agent Full Tier 长期运行超时**
*   **重要性**：核心功能 E2E 测试在 Linux 环境下长期失败（自 11 月 11 日起）。
*   **原因**：`Hosted failover E2E --big-output` 在第二回合出现 `runtime_preparation_timeout`，与代码变更无关，属于环境或配置问题。

**#17854 [P1] MCP AUTO 模式信任绕过漏洞**
*   **重要性**：安全漏洞，新工具可能以零审核状态执行。
*   **原因**：服务器级别的 `trust` 配置绕过了 LLM 分类器，导致已添加的工具无需审查即可运行。

**#17832 [P2] MCP 连接状态识别错误**
*   **重要性**：影响开发者工具集成体验。
*   **原因**：VS Code companion 报告正在启动的服务器（如 playwright）为失败，导致后续工具无法被模型调用。

**#17859 [P2] iOS Safari 键盘遮挡发送按钮**
*   **重要性**：移动端 Web Shell 体验重大缺陷。
*   **原因**：在 iOS Safari 的欢迎界面，键盘工具栏覆盖了发送按钮，导致用户需要双击才能发送消息。

**#17188 / #17189 [P2] DeepSeek V3 和 Ollama Llama4 模型配置错误**
*   **重要性**：影响第三方模型接入。
*   **原因**：DeepSeek 模型输出限制未正确识别，Ollama 模型 ID 规范化丢失了图像输入能力。

**#17834 / #17884 [P2] 测试环境不稳定**
*   **重要性**：阻碍 CI 流水线通过。
*   **原因**：DingTalk 适配器和聊天记录导出的 E2E 测试被标记为 Flaky（随机失败），需要重新运行验证。

**#17715 [P2] 权限协议状态设计改进**
*   **重要性**：架构层面的设计优化。
*   **原因**：提案将“不可检查的权限主体”作为协议状态，而非布局意外，旨在提升权限决策的透明度。

**#17284 [P2] Agent Loop 后续待办事项追踪**
*   **重要性**：架构演进路线图。
*   **原因**：追踪 #17045 之后的遗留设计决策，确保架构冻结前无遗漏。

---

## 4. 重要 PR 进展

**#17890 [autofix] ACP 后台异步钩子输出交付**
*   **内容**：修复了 Legacy Round 阶段收集但未发送后台异步钩子输出的问题，确保所有上下文信息都能到达模型。
*   **链接**：[qwen-code PR #17890](https://github.com/QwenLM/qwen-code/pull/17890)

**#17886 [autofix] Managed Agent 终端恢复逻辑修复**
*   **内容**：当控制平面副本不持有 Harness 附件时，从持久化状态恢复视图，解决终端事件投影失败问题。
*   **链接**：[qwen-code PR #17886](https://github.com/QwenLM/qwen-code/pull/17886)

**#17862 [perf] ACP Bridge 合并背景回合文本块**
*   **内容**：在后台回合中合并 `agent_message_chunk` 和 `agent_thought_chunk`，减少事件碎片，提升性能。
*   **链接**：[qwen-code PR #17862](https://github.com/QwenLM/qwen-code/pull/17862)

**#17892 [UX] Web Shell 移动端模型选择器优化**
*   **内容**：修复 iOS Safari 下模型选择器底部弹窗的触摸尺寸，确保行高和搜索框符合 44px 标准。
*   **链接**：[qwen-code PR #17892](https://github.com/QwenLM/qwen-code/pull/17892)

**#17871 [refactor] Managed Agent 文件生命周期重构**
*   **内容**：简化 Files-on-v2 生命周期，放松公共子进程限制，适配新的 /loop profile。
*   **链接**：[qwen-code PR #17871](https://github.com/QwenLM/qwen-code/pull/17871)

**#17795 [feature] Managed Agent Web UI 对齐与终端连接**
*   **内容**：新增“Managed Capabilities”对话框，统一展示所有 35 个 Daemon 表面，并完成本地终端的物理连接。
*   **链接**：[qwen-code PR #17795](https://github.com/QwenLM/qwen-code/pull/17795)

**#17437 [feature] CLI 与 Web Shell 支持 Arabic（阿拉伯语）**
*   **内容**：完整添加阿拉伯语支持，包括 RTL 布局，这是多语言支持的重要扩展。
*   **链接**：[qwen-code PR #17437](https://github.com/QwenLM/qwen-code/pull/17437)

**#17893 [test] 限定工作区工件索引断言范围**
*   **内容**：修复 CI 失败，将索引访问断言限定在测试自己的数据库模式中，避免跨数据库干扰。
*   **链接**：[qwen-code PR #17893](https://github.com/QwenLM/qwen-code/pull/17893)

**#17519 [fix] Aone Channel 延迟审查问题修复**
*   **内容**：针对已合并的 Aone 插件进行二次审查修复，优化连接时的诊断信息和老化检测。
*   **链接**：[qwen-code PR #17519](https://github.com/QwenLM/qwen-code/pull/17519)

**#17533 [feature] Web Shell Worktree 元数据与快照清理**
*   **内容**：实现 Worktree 的元数据携带和保留/快照阶段，提升会话工作区的状态管理能力。
*   **链接**：[qwen-code PR #17533](https://github.com/QwenLM/qwen-code/pull/17533)

---

## 5. 功能需求趋势

1.  **Managed Agent (托管代理) 统一化**：社区大量关注点集中在将分散的 Agent 逻辑迁移到共享的 Event-bus Kernel，包括 DingTalk/GitHub 适配器的绑定、文件生命周期重构以及 Web UI 的能力对齐。
2.  **多语言与移动端体验**：新增了对 **Arabic (阿拉伯语)** 的全面支持，以及针对 **iOS Safari** 的交互细节修复（键盘遮挡、触摸尺寸），显示出产品对全球化和移动端用户体验的重视。
3.  **MCP (Model Context Protocol) 生态安全**：随着 MCP 工具的引入，关于工具审核机制（P1 级漏洞）和连接状态管理的讨论显著增加，表明开发者对引入外部工具的安全边界保持高度警惕。
4.  **Token 上下文管理**：频繁出现关于自动压缩、Token 估算以及长对话窗口性能的讨论，说明在处理超长上下文时，系统的内存管理和压缩策略仍需持续优化。

---

## 6. 开发者关注点

*   **CI/CD 基础设施**：`hz3` 节点的磁盘 inode 耗尽、Java 测试 Gate 的阻断失效以及 E2E 测试的不稳定性，是阻碍开发效率的主要瓶颈。
*   **第三方模型支持**：开发者急需解决 DeepSeek 和 Ollama 等流行模型在配置上的不兼容问题，特别是输出限制和视觉输入功能的缺失。
*   **LSP (语言服务器协议) 集成**：虽然 PR #14507 已关闭，但关于在桌面客户端启用 LSP 的 Feature Request 依然存在，说明开发者期待更高级的代码智能提示功能。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*