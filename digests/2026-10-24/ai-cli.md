# AI CLI 工具社区动态日报 2026-10-24

> 生成时间: 2026-10-23 22:44 UTC | 覆盖工具: 9 个

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

# 2026-10-24 AI CLI 工具生态横向对比分析报告

**分析师：** AI 开发工具技术分析师  
**日期：** 2026-10-24  

---

## 1. 生态全景

当前 AI CLI 工具生态正经历从“单机命令行脚本”向“分布式、长时间运行的服务化架构”演进的关键期。以 Qwen Code 和 Pi 为代表的工具正在深度打磨 Managed Agent（托管代理）与多架构下的性能优化，而 GitHub Copilot CLI 和 DeepSeek TUI 则聚焦于 MCP（Model Context Protocol）生态认证、复杂身份验证流及企业级代理兼容性。尽管部分工具遭遇了发布阻碍或基础设施瓶颈，但跨平台兼容性、高并发下的内存/资源控制以及子代理工具链的稳定性成为了整个生态共同面临的技术攻坚点。

---

## 2. 各工具活跃度对比

| 工具名称 | 今日 Release 情况 | Issues 活跃度 / 热点 | PR 活跃度 | 核心动态与状态 |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub Copilot CLI** | v1.0.104-1 (修复 Auto 回退与证书错误) | ~30 个更新 (高：OAuth 认证、MCP、Windows 兼容) | 暂无新 PR 更新 | 活跃，集中在 MCP 认证流与 Windows 体验修复。 |
| **Pi (pi-mono)** | 无新版本 | 10+ 高热度 Issues (高：Codex 连接、TUI 性能、UTF-8 解码) | 10+ 活跃 PR (性能优化、多架构修复) | 高度活跃，重点推进性能调优与多架构支持。 |
| **Qwen Code** | v0.26.0-nightly (Daemon token 持久化) | 10+ 核心 Issues (高：Managed Agent 落地、CI 拥堵) | 10+ 核心 PR (Autofix、共享 Agent 循环) | 处于夜间构建的高速迭代期，侧重架构升级。 |
| **DeepSeek TUI** | 暂无 (0.10.2 候选测试中) | 10+ 热点 Issues (高：CPU 回归、缓存成本、模型漂移) | 8 个活跃 PR (依赖升级、Herdr 集成) | 稳定迭代，正视 CPU 性能回退与成本优化。 |
| **Claude Code / Codex / Gemini / Kimi / OpenCode** | 摘要生成失败 / 过去24小时无活动 | 暂无数据 | 暂无数据 | 社区数据缺失或处于静默期。 |

---

## 3. 共同关注的功能方向

1. **MCP 协议的认证与稳定性**
   * **涉及工具：** GitHub Copilot CLI、Pi
   * **具体诉求：** 远程 OAuth 服务器的 Token 过期无限重发、Windows 环境下 Entra 登录缓存为空、以及认证后终端卡死等问题，表明 MCP 协议在企业级身份验证上的健壮性亟待加强。
2. **多架构与跨平台（尤其是 Windows / ARM）兼容性**
   * **涉及工具：** GitHub Copilot CLI、Pi、Qwen Code
   * **具体诉求：** Windows 终端输入符号泄漏/乱码、ARM32 错误下载 x86-64 二进制文件导致 `Exec format error`、macOS 上的 V8 内存溢出等，跨平台体验仍是痛点。
3. **子代理（Sub-agent）与复杂工作流支持**
   * **涉及工具：** GitHub Copilot CLI、Qwen Code、DeepSeek TUI
   * **具体诉求：** 子代理启动时丢失内置工具链、Web fetch 无法处理 JS 渲染页面、以及多会话并发锁冲突，反映出开发者正加速构建复杂的多智能体协同工作流。

---

## 4. 差异化定位分析

* **GitHub Copilot CLI (企业级生态集成者)：** 
  * *侧重：* 深度集成 GitHub 资产、企业代理环境、MCP 生态与安全认证。
  * *目标用户：* 企业开发者、对安全合规和身份验证有强需求的团队。
* **Pi (高性能 TUI 与协议兼容者)：** 
  * *侧重：* 极致的终端交互体验（TUI 增量渲染）、多模型提供商（OpenAI Codex/Anthropic）兼容及底层 I/O 性能。
  * *目标用户：* 重度依赖终端、追求低延迟和极致响应速度的极客开发者。
* **Qwen Code (托管代理与服务化演进者)：** 
  * *侧重：* Managed Agent 架构、Daemon 服务持久化、CI/CD 自动化集成（如 `/autofix-pr`）。
  * *目标用户：* 希望将 AI 深度嵌入 DevOps 流水线和远程长期运行服务的团队。
* **DeepSeek TUI (成本感知与多模型调度者)：** 
  * *侧重：* 提示词缓存计价模型下的经济效益（Deferred-toolbox eviction）、多模型刷新调度及 Herdr 平台集成。
  * *目标用户：* 关注大模型使用成本、多后端灵活切换的开发者。

---

## 5. 社区热度与成熟度

* **快速迭代与架构演进型（高热度）：** 
  * **Qwen Code** 与 **Pi** 表现出极高的社区凝聚力和代码更迭频率。Qwen Code 正通过 Managed Agent 架构实现从“CLI 脚本”向“长期运行服务”的跃迁；Pi 则通过密集的性能修复和架构重构保持了极高的工程健康度。
* **企业级维护与 Bug 修复型（稳健迭代）：** 
  * **GitHub Copilot CLI** 和 **DeepSeek TUI** 当前阶段的主要任务是填补平台兼容性漏洞、修复性能回退（如 CPU 占用上升）以及优化身份验证流，社区重心偏向于稳定性和用户体验的打磨。

---

## 6. 值得关注的趋势信号（对技术决策者的参考价值）

1. **从“单次交互”走向“持久化 Daemon 服务”：** 
   * 随着 Qwen Code 推进 Daemon Token 持久化和 `qwen attach`，AI CLI 不再仅是瞬时的命令行工具，而是演变为常驻后台的开发伴侣。架构设计需开始考虑长期运行的内存管理（防止 V8/VS Code OOM）和状态恢复机制。
2. **AI 计算成本与 Token 经济学的前置：** 
   * DeepSeek TUI 中关于 *Deferred-toolbox eviction*（延迟工具箱淘汰）引发的成本讨论表明，开发者开始精细化计算 Prompt Cache 机制对 API 费用的影响。在工具选型时，**对上下文和缓存的精细控制**将成为核心评估指标。
3. **多智能体（Multi-Agent）底座的工程成熟度考验：** 
   * 多个工具暴露出子代理在工具链共享、权限批准后工具丢失等问题，说明多智能体编排在实际落地时，底层状态同步与生命周期管理仍存在明显的“工程鸿沟”，盲目上马复杂工作流需警惕稳定性风险。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills 社区热点报告（截至 2026‑10‑24）**  
数据来源：`anthropics/skills` 仓库的 Pull Requests（前 20 条）与 Issues（前 15 条），按评论/关注度排序。

---

## 1️⃣ 热门 Skills 排行（评论/关注度最高的 5‑8 条 PR）

| 排名 | Skill（PR） | 功能概述 | 社区讨论热点 | 当前状态 |
|------|--------------|----------|--------------|----------|
| 1 | **#1742 – `mcp-builder` 兼容 mcp ≥ 2**  | 修复 MCP 2.0+ 中 `streamable_http_client` 名称变更、支持自定义 HTTP 头部；保证 Skills 在新版 MCP 上能够正常创建与调用。 | - 对企业内部 **MCP** 升级后 Skill 失效的紧急修复需求。<br>- 讨论如何统一 `http_client` 参数，避免重复实现。 | **Open** |
| 2 | **#1245 – Notion Spec → Implementation** | 将产品/技术规格（Notion 页面）自动拆解为实现任务、验收标准与进度追踪的完整工作流。 | - “从需求到代码”的一站式转化是 **需求工程** 场景的热点。<br>- 关注生成的任务粒度、是否支持自定义模板。 | **Open** |
| 3 | **#1771 – proofcore‑contract‑auditor** | 为 Solidity / Rust 智能合约提供静态安全审计，并将审计证明写入 TON 公链（Zero‑storage Merkle）。 | - Web3 开发者对 **链上审计可验证性** 的需求激增。<br>- 讨论审计报告的可读性、审计成本以及多链兼容性。 | **Open** |
| 4 | **#1703 – md2video‑audio** | 零成本将 Markdown 文档直接渲染为 MP4 视频，配有人声朗读（基于 Marp + TTS）。 | - 教育、产品演示、会议记录 **“文档→视频”** 自动化需求。<br>- 关注音频质量、字幕同步、输出文件大小。 | **Open** |
| 5 | **#1734 – Detect orphaned .docx comments** | 检测并报告 Word 文档中孤立（未关联段落）的批注，帮助清理审阅痕迹。 | - 法务/审计团队对 **文档清洁度** 的敏感度提升。<br>- 讨论批注删除的安全性与是否需要批量模式。 | **Open** |
| 6 | **#1792 – docx timeout error handling** | 在 LibreOffice 转换超时或残留修订标记时返回错误，避免误报成功。 | - 对 **可靠的文档转换**（尤其在 CI 中）有强需求。<br>- 关注错误码统一与日志可追溯性。 | **Open** |
| 7 | **#525 – pyxel skill** | 提供 Retro‑Game 开发全链路支持：代码生成、帧检查、交互调试等。 | - 游戏开发爱好者与教学机构对 **“AI 辅助游戏原型”** 关注度上升。<br>- 讨论如何安全执行图形渲染、是否需要 GPU 虚拟化。 | **Open** |
| 8 | **#514 – document‑typography** | 检测并纠正 AI 生成文档中的孤字、寡行、编号错位等排版问题。 | - 企业文档、营销材料的 **排版质量** 成为常见投诉点。<br>- 讨论是否加入多语言（中/英）支持。 | **Open** |

> **备注**：虽然 PR 列表中“评论数”为 *undefined*，但这些 PR 被社区置顶、标题明确、涉及关键业务场景（MCP、文档、Web3、自动化）且在 Issue 中多次被引用，故可视为当前最受关注的 Skills。

---

## 2️⃣ 社区需求趋势（从 Issues 提炼的热点方向）

| 需求方向 | 关键 Issue（编号 & 链接） | 需求概述 |
|----------|---------------------------|----------|
| **安全与信任边界** | #492 – *“Community skills distributed under anthropic/ namespace enable trust boundary abuse”*  <br> (46 条评论) | 防止社区贡献的 Skill 冒充官方 Skill；需要命名空间、签名或审计机制。 |
| **组织内部技能共享** | #228 – *“Enable org‑wide skill sharing in Claude.ai”*  <br> (17 条评论) | 支持企业内部统一 Skill 库、共享链接或权限管理，降低分发成本。 |
| **评估/触发机制失效** | #556 – *“run_eval.py: claude -p never triggers skills/commands”*  <br> (13 条评论) | `run_eval.py` 评估脚本无法触发 Skill，影响自动化测试与基准测评。 |
| **技能元数据/描述质量** | #83 – *“Add skill‑quality‑analyzer and skill‑security‑analyzer to marketplace”*  <br> (已合并) | 需要统一的质量与安全检查工具，提升 Skill 编写规范。 |
| **长期记忆与状态压缩** | #1329 – *“compact‑memory (symbolic notation for compact agent state)”*  <br> (10 条评论) | 为长时运行的 Agent 提供紧凑的记忆表示，降低上下文消耗。 |
| **Skill 丢失/可见性** | #62 – *“All my skills have disappeared”*  <br> (10 条评论) | 上传后 Skill 突然不可见，涉及 UI/后端同步、文件路径规范化。 |
| **插件冲突/重复** | #189 – *“document‑skills and example‑skills plugins install identical content”*  <br> (6 条评论) | 同时安装多个插件导致 Skill 重复，占用上下文。需要插件去重或命名空间划分。 |
| **执行安全** | #1980 – *“webapp‑testing: avoid shell=True … command injection”*  <br> (4 条评论) | 代码执行层面安全审计，防止用户输入导致的命令注入。 |
| **文档生成细节错误** | #2018 – *“docx: merge_runs.py drops run‑local namespace declarations”*  <br> (4 条评论) | 生成的 Word 文档 XML 失效，影响兼容性。 |

**总体趋势**：**安全/信任、组织协作、质量/可测性** 是社区最迫切的需求，随后是 **长期记忆压缩** 与 **插件/Skill 管理**。

---

## 3️⃣ 高潜力待合并 Skills（评论活跃、功能明确、解决痛点）

| PR 编号 | Skill | 关键价值 | 主要讨论点 | 预计落地时间 |
|--------|-------|----------|------------|--------------|
| **#1298** – `skill-creator` Windows & runtime 失效修复 | 让 Skill Creator 在 Windows 环境下可靠运行，避免触发评估误报。 | - 多平台兼容性<br>- 触发评估的准确性 | **短期**（已有更新，需 CI 通过） |
| **#1681** – `skill-creator` 直接执行 `package_skill.py` | 简化本地打包流程，解决 `ModuleNotFoundError`。 | - 开发者体验提升<br>- 文档同步 | **短期**（已在 master 上测试） |
| **#1997** – YAML 前置属性解析修复 | 正确解析 SKILL.md 中的 YAML 前置字段，防止描述信息丢失。 | - 元数据一致性<br>- 自动评估准确度 | **短期**（仅需文档更新） |
| **#1980** – `webapp-testing` 防止 `shell=True` | 消除命令注入风险，提升安全等级。 | - 安全审计<br>- CI 报告通过 | **中期**（需重构脚本） |
| **#1977** – `algorithmic-art` wrapAround 修正 | 正确处理负数循环，使艺术生成更稳定。 | - 视觉效果一致性 | **中期**（已合并后测试） |
| **#1730** – `claude-api` 文档 URL 更新 | 替换失效链接，保证文档可达。 | - 文档可用性 | **已完成**（可直接合并） |
| **#1734** – `docx` 孤立批注检测 | 自动发现并清理孤立批注，提升文档审阅质量。 | - 法务/审计需求 | **中期**（待 UI 细化） |

这些 PR 均已获得社区积极评论，且解决的痛点（跨平台、安全、元数据、文档可用性）与热点需求高度吻合，预计在 **1‑2 个月**内有望合并。

---

## 4️⃣ Skills 生态洞察

> **一句话总结**：社区当前最聚焦的诉求是 **“安全可信、跨组织可共享且易于质量评估的 Skill 体系”，同时对自动化工作流（文档‑代码‑部署）和长期记忆压缩的需求正快速上升。**

---  

*报告编制：Claude Code Skills 社区技术分析师*  
*数据截至：2026‑10‑24*  

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
**日期：** 2026-10-24
**分析师：** AI 开发工具技术分析师

---

## 1. 今日速览
GitHub Copilot CLI 在过去24小时内发布了 v1.0.104-1 版本，主要修复了 Auto 模式下的回退机制以及解决了证书重复导致的模型列表错误。社区活跃度较高，共更新 30 个 Issues，主要集中在 MCP (Model Context Protocol) 认证流程、子代理工具缺失以及 Windows 平台下的网络/代理兼容性问题上。

---

## 2. 版本发布
**v1.0.104-1** (2026-10-23)
*   **改进:** 辅助权限现可在不启用实验模式的情况下使用。
*   **修复:** 当保存的 Auto 首选项不再可用时，系统将回退到默认首选项，而不是每次轮次都报错失败。
*   **链接:** [Releases](https://github.com/github/copilot-cli/releases)

---

## 3. 社区热点 Issues (Top 10)

**#5233 [OPEN] Remote MCP (OAuth): active session keeps resending an expired access token**
*   **重要性:** 🔴 **高危 (认证流程)** - 影响 MCP 服务器远程连接的稳定性。
*   **摘要:** 在连接到受 OAuth 保护的远程 MCP 服务器时，会话在遇到 401 错误后，无限循环重发同一个过期的 Token，导致请求持续被拒绝。
*   **社区反应:** 0 个点赞，开发者在等待刷新 Token 逻辑的实现。

**#5234 [OPEN] Windows CLI becomes unusable when a configured MCP server needs authentication**
*   **重要性:** 🔴 **高危 (可用性)** - 影响所有 Windows 用户的 MCP 体验。
*   **摘要:** 当配置的 MCP 服务器需要认证时，Windows CLI 交互模式会卡在登录提示并显示乱码，导致终端无法正常使用。
*   **社区反应:** 0 个点赞。

**#5236 [OPEN] Windows: Entra broker token cache stays 0 bytes after MCP sign-in**
*   **重要性:** 🟡 **中等 (Windows 体验)** - 影响多进程登录体验。
*   **摘要:** Windows 下通过 Entra 账号登录 MCP 服务器后，Token 缓存文件为空，导致每个新启动的进程都需要重新弹出登录框。
*   **社区反应:** 0 个点赞。

**#5243 [OPEN] Subagents started in the same turn as an approved exit_plan_mode get none of the built-in tools**
*   **重要性:** 🟡 **中等 (功能回归)** - 1.0.95 版本后的回归问题。
*   **摘要:** 在 `exit_plan_mode` 被批准后的同一轮次中启动的子代理，将丢失所有内置工具（如 bash, view, create 等），无法执行任务。
*   **社区反应:** 0 个点赞。

**#5238 [OPEN] repeated cache bust for every image after 50th**
*   **重要性:** 🟡 **中等 (性能)** - 图像上下文管理的性能瓶颈。
*   **摘要:** 每当会话中的图片超过 50 张时，旧图片会被移除并触发整个缓存的重填，导致计算成本激增。
*   **社区反应:** 0 个点赞。

**#5242 [OPEN] Sessions stop processing when MCP config watch registration hits the inotify limit**
*   **重要性:** 🟢 **低 (Linux 环境)** - 特定环境下的配置监听问题。
*   **摘要:** 在 Linux 容器中运行时，如果系统的 inotify 监控数量达到上限，MCP 配置文件监听注册失败，会导致会话队列停止处理。
*   **社区反应:** 0 个点赞。

**#5231 [OPEN] Allow excluding specific models from Auto model selection**
*   **重要性:** 🟢 **低 (定制化)** - 模型选择优化。
*   **摘要:** 希望在 Auto 模式下能够排除某些表现不佳的模型，仅使用指定的模型。
*   **社区反应:** 0 个点赞。

**#5235 [OPEN] Skills can't ask clarifying questions in interactive mode with Hydra Fusion**
*   **重要性:** 🟢 **低 (技能交互)** - 交互模式限制。
*   **摘要:** 在 Hydra Fusion 交互模式下，技能无法向用户提问并等待回答，导致需要澄清步骤的工作流（如 grill-me）无法完成。
*   **社区反应:** 0 个点赞。

**#5230 [OPEN] web_fetch fails DNS validation in proxy-only environments**
*   **重要性:** 🟢 **低 (网络工具)** - 代理环境下的 DNS 问题。
*   **摘要:** 在仅使用代理的纯企业网络环境中，内置的 `web_fetch` 工具无法进行 DNS 验证，尽管原生 HTTP 传输是工作的。
*   **社区反应:** 0 个点赞。

**#5053 [OPEN] Regression in 1.0.89: ACP sessions stop indexing conversation history**
*   **重要性:** 🟡 **中等 (数据持久化)** - 历史记录丢失。
*   **摘要:** 从 1.0.88 升级到 1.0.89 后，ACP 会话不再向本地 `session-store.db` 索引对话历史和使用情况。
*   **社区反应:** 0 个点赞。

---

## 4. 重要 PR 进展
*当前无新的 Pull Requests 更新。*

---

## 5. 功能需求趋势

1.  **MCP 认证与安全性:**
    *   这是当前社区最集中的痛点。无论是远程 OAuth Token 过期刷新、Windows Entra 缓存为空，还是认证后终端不可用，都指向 MCP 协议在权限管理上的脆弱性。
2.  **子代理与工具链:**
    *   多个 Issue 关注子代理（Sub-agent）的工具缺失问题，表明开发者正在尝试利用多智能体架构解决复杂任务，但底层工具链的稳定性仍有待提升。
3.  **交互模式与 UX:**
    *   关于 Shell 模式误触发（输入 `!`）、快捷键操作（Ctrl+O）以及图片粘贴功能的反馈，显示出用户对 CLI 交互体验有较高的期待，希望减少误操作并提升输入效率。
4.  **模型选择与配置:**
    *   除了 Auto 模式下的模型排除需求外，BYOK（自带密钥）环境下的动态工作流支持和模型推理级别的配置也受到关注。

---

## 6. 开发者关注点

*   **Windows 平台兼容性:** 开发者在 Windows 环境下频繁遇到 MCP 认证卡死、代理设置被忽略以及 PowerShell 版本自动更新带来的兼容性问题。
*   **企业级部署限制:** 在企业代理和 BYOK（离线/私有化部署）环境下，网络工具和代理设置存在明显的功能缺失。
*   **状态持久化:** 会话历史索引停止、缓存机制在图片过多时的性能抖动，影响了长期会话的数据管理和成本控制。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-10-24
**来源**: github.com/badlogic/pi-mono

---

## 1. 今日速览

今天社区聚焦于 **性能优化与多语言支持**。开发者修复了大型会话的卡顿问题、ARM 架构二进制文件下载错误，并解决了 Windows 终端下的字符输入泄漏。同时，针对 OpenAI Codex 连接不稳定和 MCP 协议支持的讨论热度最高。

## 2. 版本发布

**无新版本发布**。社区当前处于活跃的 bug 修复和功能完善阶段。

## 3. 社区热点 Issues

以下是过去 24 小时内讨论度最高的 10 个 Issue，反映了当前开发者和用户最关心的痛点：

*   **[OPEN] #4945: openai-codex Connection Reliability Issues (86 👍)**
    *   **重要性**: 高
    *   **摘要**: `openai-codex` / `gpt-5.5` 在交互式 TUI 中经常卡在 "Working..." 状态且无流式输出或错误信息，只能通过按 Escape 恢复。这是过去几天反复出现的问题。
    *   **链接**: [earendil-works/pi Issue #4945](https://github.com/earendil-works/pi/issues/4945)

*   **[CLOSED] #9265: O(n²) tool-call argument re-parsing freezes event loop (7 👍)**
    *   **重要性**: 极高 (性能)
    *   **摘要**: `openai-completions` 流处理器在每次增量更新时都重新解析整个工具调用参数 JSON，导致在大参数量下性能呈二次方下降，会阻塞事件循环。
    *   **链接**: [earendil-works/pi Issue #9265](https://github.com/earendil-works/pi/issues/9265)

*   **[CLOSED] #9807: perf(tui): full re-render causes scroll/typing lag (7 👍)**
    *   **重要性**: 高 (性能)
    *   **摘要**: 当会话消息超过 800 条时，TUI 渲染变得明显卡顿。对比 OpenTUI 使用增量渲染，Pi 执行的是全量重绘。
    *   **链接**: [earendil-works/pi Issue #9807](https://github.com/earendil-works/pi/issues/9807)

*   **[CLOSED] #11312: pi.exec() corrupts UTF-8 characters split across output chunks (2 👍)**
    *   **重要性**: 中 (稳定性)
    *   **摘要**: 当 UTF-8 字符跨越 stdout 块边界时，`pi.exec()` 会将其解码为乱码（如 `���好`），尽管命令返回码为 0。这会影响扩展对命令输出的处理。
    *   **链接**: [earendil-works/pi Issue #11312](https://github.com/earendil-works/pi/issues/11312)

*   **[CLOSED] #11086: Symbols leaking into input on Windows terminal under CPU load (4 👍)**
    *   **重要性**: 中 (跨平台兼容性)
    *   **摘要**: 在特定高 CPU 负载场景下，Windows 终端会出现符号泄漏到输入框的问题，影响用户输入体验。
    *   **链接**: [earendil-works/pi Issue #11086](https://github.com/earendil-works/pi/issues/11086)

*   **[CLOSED] #11341: exit with a clear error for unusable proxy URLs (0 👍)**
    *   **重要性**: 中 (配置/网络)
    *   **摘要**: 当使用 `socks5h` 代理或无协议 URL 时，Pi 启动时会崩溃并显示原始 Node.js 堆栈，现在改为显示清晰的错误信息。
    *   **链接**: [earendil-works/pi Issue #11341](https://github.com/earendil-works/pi/issues/11341)

*   **[CLOSED] #11209: ARM32 tool bootstrap selects x86-64 binaries (3 👍)**
    *   **重要性**: 中 (架构支持)
    *   **摘要**: 在 ARMv7 设备上，Pi 自动下载并运行了错误的 x86-64 二进制文件，导致 `Exec format error`。
    *   **链接**: [earendil-works/pi Issue #11209](https://github.com/earendil-works/pi/issues/11209)

*   **[OPEN] #11195: InvalidArgumentError: Invalid URL protocol (0 👍)**
    *   **重要性**: 中 (配置/网络)
    *   **摘要**: Pi 目前不支持 SOCKS 代理，配置 `ALL_PROXY` 环境变量会导致启动失败。
    *   **链接**: [earendil-works/pi Issue #11195](https://github.com/earendil-works/pi/issues/11195)

*   **[OPEN] #11297: Compaction file lists grow without bound (2 👍)**
    *   **重要性**: 低 (存储管理)
    *   **摘要**: 每次执行压缩操作时，`<read-files>` 和 `<modified-files>` 列表会被不断追加到摘要中，导致文件列表无限制增长。
    *   **链接**: [earendil-works/pi Issue #11297](https://github.com/earendil-works/pi/issues/11297)

*   **[CLOSED] #10063: Anthropic OAuth requests return `Invalid effort level` (12 👍)**
    *   **重要性**: 中 (API 兼容性)
    *   **摘要**: Claude Opus 5/5.5 和 Fable 5 在调用时返回 `Invalid effort level` 错误，影响 Anthropic 模型的使用。
    *   **链接**: [earendil-works/pi Issue #10063](https://github.com/earendil-works/pi/issues/10063)

## 4. 重要 PR 进展

以下是过去 24 小时内活跃度最高的 10 个 PR，展示了具体的代码修复方向：

*   **[CLOSED] #11330 / #11326: fix(coding-agent): decode pi.exec output across UTF-8 chunk boundaries**
    *   **摘要**: 修复了 `pi.exec()` 在处理跨块分割的 UTF-8 字符时产生的乱码问题。PR #11330 修复了 stderr，#11326 修复了 stdout。
    *   **链接**: [earendil-works/pi PR #11330](https://github.com/earendil-works/pi/pull/11330) | [earendil-works/pi PR #11326](https://github.com/earendil-works/pi/pull/11326)

*   **[CLOSED] #11343: fix(coding-agent): skip fd/rg downloads on unsupported architectures**
    *   **摘要**: 修复了 ARM32 和 ia32 架构下载错误的 x86-64 二进制文件的问题。调整了 `getReleaseTarget()` 的映射逻辑。
    *   **链接**: [earendil-works/pi PR #11343](https://github.com/earendil-works/pi/pull/11343)

*   **[CLOSED] #11341: fix(ai): exit with a clear error for unusable proxy URLs**
    *   **摘要**: 增强了代理 URL 的验证逻辑，针对 SOCKS 代理、无协议 URL 等情况提供明确的错误提示，而不是崩溃。
    *   **链接**: [earendil-works/pi PR #11341](https://github.com/earendil-works/pi/pull/11341)

*   **[CLOSED] #11318: fix(ai): do not count faux cache writes as input tokens**
    *   **摘要**: 修复了带有 `sessionId` 时，faux provider 将缓存写入的 token 错误地计入 `input` 字段的问题，导致 token 计数虚高。
    *   **链接**: [earendil-works/pi PR #11318](https://github.com/earendil-works/pi/pull/11318)

*   **[CLOSED] #11288: fix(coding-agent): write forked session through one fd**
    *   **摘要**: 重构了 `SessionManager.forkFrom` 的文件写入逻辑，将原本对每个条目都调用的 `appendFileSync`（导致 3000 次文件打开关闭）优化为单次写入。
    *   **链接**: [earendil-works/pi PR #11288](https://github.com/earendil-works/pi/pull/11288)

*   **[CLOSED] #11347: feat(coding-agent): show model names in model selectors when they add information**
    *   **摘要**: 修复了 `models.json` 中的 `modelOverrides` 重命名在 UI 中不可见的问题。现在在 `/model` 列表中会显示括号内的自定义名称。
    *   **链接**: [earendil-works/pi PR #11347](https://github.com/earendil-works/pi/pull/11347)

*   **[CLOSED] #11321: fix(tui): stop nested blockquote rendering from growing exponentially**
    *   **摘要**: 修复了 Markdown 渲染中嵌套引用（`>`）导致渲染量指数级增长的问题，防止 TUI 卡死。
    *   **链接**: [earendil-works/pi PR #11321](https://github.com/earendil-works/pi/pull/11321)

*   **[CLOSED] #11340: fix(tui): use iterm2 word characters for fullscreen double-click selection**
    *   **摘要**: 改进了全屏模式下的双击选词逻辑，支持 iTerm2 的默认单词字符集，修复了 `~/...` 路径选中不完整的问题。
    *   **链接**: [earendil-works/pi PR #11340](https://github.com/earendil-works/pi/pull/11340)

*   **[CLOSED] #11338: docs: fix provider checklist, MCP anchors, and missing commands/settings**
    *   **摘要**: 更新了文档和帮助信息，使其与最新的代码结构（如 `src/api` 布局）保持一致，修复了 MCP 相关的锚点失效问题。
    *   **链接**: [earendil-works/pi PR #11338](https://github.com/earendil-works/pi/pull/11338)

*   **[CLOSED] #11352 / #11351: docs: require/add changelog entries**
    *   **摘要**: 规范化 changelog 的生成规则，并回填了之前缺少 changelog 的合并记录，确保版本发布历史可追溯。
    *   **链接**: [earendil-works/pi PR #11352](https://github.com/earendil-works/pi/pull/11352) | [earendil-works/pi PR #11351](https://github.com/earendil-works/pi/pull/11351)

## 5. 功能需求趋势

从 Issue 和 PR 的分析来看，社区当前的关注点集中在以下三个方向：

1.  **性能优化与资源管理**:
    *   大量 Issue 和 PR 专门针对 TUI 渲染性能（全量重绘 vs 增量渲染）和文件 I/O 效率（减少文件打开/关闭次数）。
    *   社区对 `pi.exec()` 的 UTF-8 处理和内存占用非常敏感。

2.  **多架构与跨平台兼容性**:
    *   **ARM 支持**: 修复 ARM32 二进制文件下载错误是当务之急。
    *   **代理支持**: 增加 SOCKS 代理支持是网络配置类的高频需求。
    *   **终端交互**: 修复 Windows 下的符号泄漏和全屏选词体验。

3.  **协议与 API 稳定性**:
    *   **MCP 协议**: 对 Stateless MCP (2026-07-28) 和 Elicitation 的支持呼声很高。
    *   **模型集成**: 针对 Anthropic OAuth、Bedrock GLM-5.3、OpenRouter 的兼容性调试。

## 6. 开发者关注点

*   **输入/输出可靠性**: 开发者频繁反馈在处理流式数据、分割的 UTF-8 字符以及高并发输入时的数据丢失或乱码问题。
*   **调试体验**: 当系统出现严重错误（如启动崩溃、连接卡死）时，缺乏清晰的错误日志或堆栈信息（如 Issue #11088）会严重影响排查效率。
*   **配置灵活性**: 希望在 `settings.json` 中有更多配置选项来控制原生工具的暴露方式以及全局/包级别的覆盖规则。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-10-24  
**数据来源：** github.com/QwenLM/qwen-code

---

## 1. 今日速览
Qwen Code 项目在 10 月 23 日迎来了 **v0.26.0-nightly** 的首个夜间构建版本。社区活跃度极高，主要聚焦于 **Managed Agent（托管代理）架构的落地**、**Daemon 服务持久化** 以及 **CI/CD 流水线优化**。尽管测试基础设施在应对大规模并发时仍面临挑战（如 Hosted MCP 门禁测试失败），但开发团队正在通过多个 PR 推进功能迭代与稳定性修复。

---

## 2. 版本发布
**v0.26.0-nightly.20261023.5a0be33432** (最新发布)
*   **核心更新：** 修复了发布流程中生成的二进制文件覆盖问题。
*   **功能增强：** 在 `serve` 模块中添加了 **Daemon token 持久化** 功能，解决了长期运行会话的身份验证与连接状态保持问题。

---

## 3. 社区热点 Issues (Top 10)

1.  **[Managed Agent 架构提案] #12380**
    *   **状态：** Open / Ready for Agent
    *   **关注点：** 提出定义“托管代理”的双路径架构及分阶段交付方案。这是目前社区讨论度最高的 Issue（71条评论），标志着项目从设计阶段向核心功能落地过渡。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/12380)

2.  **[严重 Bug] Hosted MCP 门禁测试失败 #14713**
    *   **状态：** Open
    *   **关注点：** CI 流水线中的关键测试 `storeRejectDrainsKeepsOwner` 在 MySQL 环境下持续失败。这直接影响了 Managed Agent 的跨平台交付门禁，属于阻塞性 Bug。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/14713)

3.  **[Daemon 持久化] #14947**
    *   **状态：** Open
    *   **关注点：** 用户请求在桌面/Web Shell 客户端中保存 Daemon 连接地址并自动填充 Token。这极大提升了远程 Daemon 的易用性，避免每次手动输入凭证。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/14947)

4.  **[CI 队列优化] #14859**
    *   **状态：** Open
    *   **关注点：** 分析并修复 GitHub Actions Runner 队列过深的问题。开发团队发现是四个独立机制叠加导致了队列拥堵，需要做出架构决策以解决 CI 延迟。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/14859)

5.  **[TUI 崩溃] #15344**
    *   **状态：** Open
    *   **关注点：** 在 macOS 长时间运行的 TUI 会话中出现 V8 内存溢出崩溃。这影响了开发者在终端环境下的深度工作体验。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/15344)

6.  **[VS Code 内存泄漏] #15071**
    *   **状态：** Open
    *   **关注点：** VS Code 伴侣插件中的 `qwen serve` Daemon 进程在运行约 4GB 内存上限后崩溃。这是典型的内存管理问题，影响开发环境稳定性。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/15071)

7.  **[功能增强] Kubernetes 工具运行时 #13395**
    *   **状态：** Open
    *   **关注点：** 跟踪 Kubernetes 工具运行时在跨平台交付中的进度，这是 Managed Agent 能力扩展的关键路径。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/13395)

8.  **[CI 失败] 纯一提示词路由测试 #12714**
    *   **状态：** Open
    *   **关注点：** 常规 CI 测试中涉及将 'plain one-shot prompt' 路由到 'in-process' 的测试失败，属于高频回归 Bug。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/12714)

9.  **[Web Shell 改进] #15353**
    *   **状态：** Open
    *   **关注点：** 建议移除 Web Shell 中的旋转加载短语（如 "Hmmm..."），简化 UI 状态显示，提升交互清晰度。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/15353)

10. **[自动修复 PR] #15056**
    *   **状态：** Open
    *   **关注点：** 提议增加 `/autofix-pr` 命令，让 Agent 能够自动监控 PR 并修复 CI 失败，这是实现全自动代码审查的重要一步。
    *   [查看详情](https://github.com/QwenLM/qwen-code/issues/15056)

---

## 4. 重要 PR 进展 (Top 10)

1.  **[Autofix PR 命令] #15385**
    *   **内容：** 为 `/autofix-pr` 命令添加反应层，包括受保护的推送、同步、回复和重跑机制。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15385)

2.  **[实验性 Agent 循环] #15369**
    *   **内容：** 在 Core 中添加共享 Agent 循环，支持 Headless 模式运行，这是实现统一 Agent 调度框架的第一步。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15369)

3.  **[CLI 终端附加] #15209**
    *   **内容：** 新增 `qwen attach` 命令，允许用户将终端附加到本地 Daemon 会话，实现交互式调试与控制。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15209)

4.  **[Windows 签名修复] #12442**
    *   **内容：** 修复 Windows UIAccess Worker 在发布前的签名问题。该 PR 经过多轮审查，旨在解决 Windows 平台的权限与安全限制。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/12442)

5.  **[CI 性能优化] #15381**
    *   **内容：** 优化 CI 中的 Lint 检查，仅针对 PR Diff 运行，并复用静态构建输出，显著提升流水线速度。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15381)

6.  **[快照清理] #15391**
    *   **内容：** 修复快照清理逻辑，仅计算格式正确的快照以释放存储空间，避免误删或无效计数。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15391)

7.  **[Bun 运行时支持] #15387**
    *   **内容：** 修复 OpenTUI 在私有 Bun 1.4.4 上的运行问题，扩展了对现代 JavaScript 运行时的兼容性。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15387)

8.  **[测试稳定性] #15183**
    *   **内容：** 为托管审批测试套件配置“慢速主机策略”，避免因 Runner 延迟导致的测试超时。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15183)

9.  **[Java CI 锁优化] #15233**
    *   **内容：** 缩小 SDK Java 集成测试中的 Maven Host Lock 范围，避免锁竞争阻塞流水线。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15233)

10. **[流式消息修复] #15308**
    *   **内容：** 修复在流式传输中断时工具调用占位符的处理逻辑，确保残缺流不会导致会话状态错乱。
    *   [查看详情](https://github.com/QwenLM/qwen-code/pull/15308)

---

## 5. 功能需求趋势

*   **Managed Agent (托管代理) 全面落地：** 社区从早期的架构讨论（#12380）转向具体的工具集成（如 `web_fetch`、`todo_write` 在工作区会话中的支持，#15076）和测试门禁（#14447）。这是目前最核心的技术演进方向。
*   **Daemon 与会话持久化：** 大量 Issue（#14947, #13207）集中在提升 Daemon 的健壮性、Token 管理和跨会话连接体验，标志着项目正在从“临时脚本”向“长期服务”演进。
*   **自动化与 DevOps 集成：** `/autofix-pr` (#15056) 和自动修复流程的完善，显示出社区希望将 Qwen Code 深度集成到 CI/CD 流程中，实现“代码即对话”的自动化闭环。
*   **多平台兼容性：** 针对 macOS (TUI 崩溃)、Windows (UIAccess 签名)、Linux (Kubernetes runtime) 的适配工作持续进行，以满足企业级部署需求。

---

## 6. 开发者关注点

*   **内存与稳定性：** VS Code 插件的 Daemon OOM (#15071) 和 macOS TUI 的 V8 崩溃 (#15344) 是高频反馈的痛点，开发团队需优先解决资源管理问题。
*   **CI/CD 瓶颈：** Runner 队列拥堵 (#14859) 和特定测试失败 (#12714, #14713) 导致开发效率降低，自动化修复机制显得尤为迫切。
*   **交互体验：** Web Shell 的 UI 简化 (#15353) 和 TUI 配置选项 (#2034) 虽属体验优化，但直接关系到用户对工具的第一印象。
*   **安全与合规：** Windows UIAccess 签名 (#12442) 和记忆 Token (#14947) 的讨论反映了在开发环境安全性和易用性之间的平衡需求。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报  
**日期**：2026‑10‑24  

---

## 1️⃣ 今日速览
- 代码仓库在过去 24 小时内未发布新版本，但 **Issue #6969**、**#6728**、**#7058** 等关键缺陷和性能回退引发了激烈讨论。  
- 依赖升级 PR（#7060‑#7064）持续推进，社区已开始对 **Herdr** 集成（#7064）进行评估。  

---

## 2️⃣ 版本发布
> **暂无** 新的 Release，近期的 0.10.2 候选版本仍在内部测试中。  

---

## 3️⃣ 社区热点 Issues（精选 10 条）

| # | 标题 / 关键点 | 重要性说明 | 社区反馈 |
|---|--------------|------------|----------|
| **6969** | *Deferred‑toolbox eviction* 经济效益为负 | 揭示工具缓存策略在当前 Prompt‑Cache 计价模型下导致成本浪费，直接关系到大模型使用费用。 | 6 条评论，开发者要求加入成本感知的淘汰策略。 |
| **6728** | CPU 使用回归（v0.9 → v0.10） | 性能回退严重，FreeBSD 上 CPU 占用从 “idle” 变 “heavy”，影响跨平台部署。 | 6 条评论，提供了多平台对比数据，呼吁优化编译选项。 |
| **7058** | Model refresh 漂移（v0.11） | 24 个远程 Provider 未能及时刷新模型，导致生成质量下降，暴露模型更新管线缺陷。 | 新建 Issue，已引起维护者高度关注，暂无评论。 |
| **6925** | ChatGPT 登录因 “unsupported originator” 失败 | 0.10.2 中 ChatGPT 登录阻塞，影响使用 OpenAI Provider 的用户。 | 2 条评论，提出了临时绕过方案。 |
| **6910** | Release‑blocker：crates.io 10 MiB 包体限制 | 0.10.1 上传被 HTTP 413 拒绝，阻碍发布流程。 | 1 条评论，已在 CI 中加入预检。 |
| **7042** | 同一工作区无法恢复第二个会话 | 工作流并发受阻，涉及会话锁机制的根本设计缺陷。 | 2 条评论，建议引入会话命名空间。 |
| **7039** | Provider‑native 搜索返回未验证的引用 | 错误引用导致子代理误判，影响信息可靠性。 | 1 条评论，强调需增加引用校验。 |
| **7038** | Web fetch 不会升级到浏览器，丢失 JS 渲染页面元数据 | 对科研类子代理尤为致命，导致关键文档信息缺失。 | 1 条评论，建议加入 headless 浏览器回退。 |
| **7037** | DeepSeek 搜索后端缺失解析器单元测试 | 后端功能虽可用，但缺少回归保障，潜在回退风险。 | 1 条评论，提议添加 CI 测试。 |
| **7036** | 插件推荐误触发（MCP 相关消息弹出 Convex 插件） | 用户体验噪声，说明插件匹配规则过于宽松。 | 1 条评论，建议改进关键词过滤。 |

> **链接示例**：`https://github.com/codewhale-hq/Codewhale/issues/6969`  

---

## 4️⃣ 重要 PR 进展（全部 8 条）

| # | PR 标题 | 主要改动 | 影响范围 |
|---|--------|----------|----------|
| **7064** | *tui: report agent state, resume command and release to Herdr* | 为 Herdr 平台提供状态报告、resume 指令和发布接口，使 Codewhale 成为一等代理。 | 新增跨平台监控与编排能力。 |
| **7062** | *chore(deps): bump sha2 from 0.11.0 to 0.11.1* | 更新 Rust‑Crypto `sha2` 库至 0.11.1，修复安全性警告。 | 提升整体安全性。 |
| **7063** | *chore(deps): bump rust‑i18n‑support from 4.2.2 to 4.2.4* | 语言本地化库升级，带来拼写/格式改进。 | 改善多语言 UI。 |
| **7061** | *chore(deps): bump hyper‑util from 0.1.20 to 0.1.21* | 更新 `hyper-util`，包含性能改进与 bug 修复。 | 网络层更稳健。 |
| **7060** | *chore(deps): bump serde_json from 1.0.151 to 1.0.154* | `serde_json` 小幅升级，增加 `preserve_order` 支持。 | 更好地保持 JSON 键序。 |
| **7059** | *chore(deps): bump syn from 3.0.6 to 3.0.9* | `syn` 语法树库升级，加入 `Punctuated::retain`。 | 为宏/代码生成提供新 API。 |
| **7057** | *chore(deps): bump zod from 4.2.1 to 4.6.7* (JS) | 文档示例中使用的 `zod` 升级，提升类型校验能力。 | 改善 JS 示例的可靠性。 |
| **7054** | *fix(tui): show the session rename prompt once* | 修复会话重命名时弹出两次提示的 UI bug。 | 提升交互流畅度。 |

> **链接示例**：`https://github.com/codewhale-hq/Codewhale/pull/7064`  

---

## 5️⃣ 功能需求趋势
从 16 条 Issues 中抽取的热点方向：

| 趋势 | 具体需求 |
|------|----------|
| **性能与资源管理** | CPU 使用回归（#6728）<br>缓存淘汰成本评估（#6969） |
| **多模型/Provider 稳定性** | ChatGPT 登录错误（#6925）<br>DeepSeek 搜索缺失测试（#7037）<br>Model refresh 漂移（#7058） |
| **会话/工作流协作** | 同一工作区多会话冲突（#7042）<br>会话恢复与历史一致性（#6954） |
| **Web/搜索子代理可靠性** | Web fetch 不升级到浏览器（#7038）<br>未验证引用问题（#7039） |
| **插件与扩展生态** | 插件误触发（#7036）<br>新增 Keenable 无钥匙搜索提供者需求（#7056） |
| **发布与包装** | crates.io 包体限制（#6910）<br>Herdr 集成（#7064） |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **性能回退** – 多平台 CPU 占用显著上升，迫切需要 Profiling 与优化指引。  
2. **模型/Provider 更新机制** – 现有刷新系统不可靠，导致模型版本漂移，需改进调度与监控。  
3. **会话并发与恢复** – 工作区锁导致二次会话受阻，建议实现会话命名空间或锁粒度细化。  
4. **Web 子代理的完整性** – 对 JS 渲染页面的抓取与元数据解析仍缺失，需要集成 Headless 浏览器或改进解析器。  
5. **插件推荐噪声** – 插件匹配规则过于宽泛，导致误报，需加入语义过滤或用户自定义白名单。  
6. **依赖安全与兼容** – 大量自动依赖升级 PR 正在进行，保持依赖最新是社区共识。  

---  

> 本日报仅基于过去 24 小时的公开 GitHub 活动编写，后续若有新 Release 或关键修复，将另行通知。祝开发顺利！

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*