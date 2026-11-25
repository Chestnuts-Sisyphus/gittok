# OpenClaw 生态日报 2026-11-25

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-25 03:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyagi)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 (2026-11-25)

## 1. 今日速览
OpenClaw 项目在 2026-11-25 表现出极高的活跃度，过去 24 小时内处理了 **500 条 Issues**（新增/活跃 431 条，关闭 69 条）和 **500 条 Pull Requests**（待合并 229 条，已合并/关闭 271 条）。项目正处于密集的开发迭代期，今日发布了 3 个新版本，社区贡献活跃，但同时也暴露出多个与 SQLite 数据库、更新机制和 Windows 平台相关的稳定性挑战。

## 2. 版本发布
今日发布了 3 个新版本，主要集中在稳定性和修复：
*   **v2026.11.10-beta.3** (2026.11.10-beta.3)
    *   **核心亮点**：改进了恢复机制，确保中断的包和源更新可恢复，包括跨架构变更或重启机器的场景。这显著提升了系统在异常情况下的鲁棒性。
*   **v2026.11.9** (2026.11.9)
    *   **状态**：稳定版。
    *   **变更**：包含 13 次提交和 15 个 PR，主要修复了若干稳定性问题。
*   **v2026.11.8** (2026.11.8)
    *   **规模**：本次更新规模较大，包含 314 次提交、210 个 PR，由 86 位贡献者参与。
    *   **范围**：涵盖了广泛的功能改进和错误修复。

## 3. 项目进展
今日项目进展迅速，多个关键修复和功能改进已合并或处于合并边缘：
*   **更新机制修复**：PR #204866 修复了安装更新时的所有权保留问题，防止多个更新路径冲突；PR #204716 修复了 pnpm 更新后 `openclaw` 命令失效的问题，确保升级后系统仍可正常工作。
*   **UI/UX 优化**：PR #204595 修复了浏览器 Talk 功能中回复生成的时序问题，改为逐句播放而非等待完整回复，提升了实时交互体验；PR #204912 修复了浏览器扩展在深层次页面快照中的显示问题。
*   **数据库性能**：PR #205053 优化了 Gateway 启动时的 SQLite 工作进程，避免了在“轻量级”资源策略下创建不必要的额外进程，提升了启动效率。
*   **Android 平台**：PR #204953 修复了 Android 端会话 pin 功能，使其与 Gateway 侧的保存状态同步，解决了多设备间的数据不一致问题。

## 4. 社区热点
社区讨论高度集中在影响系统稳定性和可用性的核心问题上：
*   **Gateway 长时间阻塞**：Issue #160959 (评论 87) 报告了由于外部插件包依赖树过大导致 Gateway 事件循环阻塞数分钟的问题，严重影响了系统响应性。
*   **WAL 检查点挂起**：Issue #164294 (评论 43) 指出 Gateway 状态数据库的 WAL 自动检查点从未完成，被进程内读取器卡住，可能导致数据写入停滞。
*   **更新失败与回滚问题**：Issue #197083 (评论 38) 描述了从 11.1 升级到 11.3 时，后置 Doctor 验证失败导致部分更新未完成且无法回滚的问题。
*   **Windows 平台可靠性**：Issue #170956 (评论 34) 提到 Windows 平台存在启动慢、插件关闭不干净和任务计划程序权限错误，导致重启/更新经常失败。

## 5. Bug 与稳定性
今日报告了多个严重 Bug，主要集中在数据库和更新层面：
*   **P0 - 严重阻塞/崩溃**：
    *   **Issue #160959**: Gateway 在处理大包插件时阻塞数分钟（2026.9.6 回归）。
    *   **Issue #138272**: Android Talk 在需要任务执行的回合会断开连接。
*   **P1 - 数据丢失/状态异常**：
    *   **Issue #196199**: 自 2026.10.10 起，Native Codex 辅助补全无法恢复父级会话，导致用户被锁定。
    *   **Issue #160386**: 大会话存储导致 SQLite I/O 压力过大，引发 RPC 超时。
*   **P2 - 体验/配置问题**：
    *   **Issue #177094**: Control UI 中系统通知镜像导致回复内容错位。
    *   **Issue #200224**: 升级 11.5 beta 时拒绝保留 `agents.defaults.heartbeat` 配置。
*   **已有 Fix PR**：
    *   针对 Talk 功能的播放时序问题，已有 PR #204595 和 #204683 待合并。
    *   针对更新后命令失效问题，已有 PR #204716 待合并。

## 6. 功能请求与路线图信号
*   **更新路径设计**：Issue #204775 收集了新的更新路径设计（状态、所有权和计划），旨在解决当前的更新冲突和状态管理混乱问题。
*   **MCP 事件支持**：Issue #166586 提出支持从配置的 MCP 服务器消费事件并启动 agent 运行，这是扩展 OpenClaw 与外部工具集成能力的重要方向。
*   **会话上下文预算**：Issue #150238 建议为 Skill Workshop Experience Review 添加上下文预算或跳过策略，以处理超大会话。

## 7. 用户反馈摘要
*   **痛点**：用户强烈反映 **Windows 平台**的体验极差，启动慢、更新频繁失败，且任务计划程序权限问题导致维护困难。同时，**大插件依赖**会导致系统卡死，严重影响生产环境可用性。
*   **期望**：用户希望 **更新过程更加透明和可靠**，避免出现无法回滚的“半成品”状态。对于 **Android 应用**，用户希望会话 Pin 功能能在多端保持一致。
*   **满意度**：社区对 **Talk 功能** 的改进呼声很高，尤其是从“等待完整回复”改为“实时流式播放”的体验提升获得了广泛好评。

## 8. 待处理积压
*   **长期未响应的 P0/P1 问题**：Issue #126360 (AgentSelectionRequiredError 日志风暴)、Issue #160548 (内存泄漏) 和 Issue #134993 (文件系统发现导致 CPU 占用) 已存在较长时间，需要优先处理。
*   **阻塞合并的 PR**：多个 PR (如 #204716, #204866) 处于等待维护者审核状态，可能成为版本发布的瓶颈。
*   **设计决策缺失**：多个 Issue 标记为 `needs-product-decision` (如 #150238, #140213)，等待产品团队明确方向。

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目每日动态报告**  
*日期：2026‑11‑25*  
*数据来源：GitHub（Issues / Pull Requests）*

---

## 1. 今日速览
- 项目在过去 24 小时内保持高活跃度，**46 条 PR**（其中 42 条已合并或关闭）以及 **4 条 Issue**（3 条新开/活跃）产生了大量变更。  
- 代码合并速度快，几乎所有 PR 在同一天完成审阅并合并，显示出核心维护者的强大响应能力。  
- 仍有 **3 条未解决的 Issue**，均聚焦于 **Anthropic 模型兼容性** 与 **Windows 本地 TUI** 的平台问题，说明跨模型、跨平台的适配仍是当前痛点。  
- 项目暂无新 Release，所有改动仍处于 **pre‑release** 阶段，用户需要自行更新到最新 `main` 分支。

---

## 2. 版本发布
> **（本日无新 Release）**  
> 目前项目仍在持续集成中，所有功能改进已直接合并至 `main`，使用者请通过 `git pull` 更新到最新提交，以获得最新修复与功能。

---

## 3. 项目进展（重点合并/关闭的 PR）

| PR 编号 | 关键改动 | 影响范围 | 链接 |
|--------|----------|----------|------|
| **#6773** (OPEN) | 将 **空的最终回复** 统一视为结构化的 **turn 失败**，避免错误的成功标记。 | 运行时可靠性、错误统计、后端监控 | https://github.com/HKUDS/nanobot/pull/6773 |
| **#6761** (OPEN) | 重新设计 WebUI 会话管理：引入 **Mission Control**、**Live Pulse**、**Active Drawer**。 | 前端用户体验、跨项目会话切换 | https://github.com/HKUDS/nanobot/pull/6761 |
| **#6790** (CLOSED) | 改进 WebUI **inline diff** 的切换交互，点击文件路径即可展开/收起。 | 开发者调试体验 | https://github.com/HKUDS/nanobot/pull/6790 |
| **#6788** (CLOSED) | 修复 Mermaid 图表渲染：在闭合 fence 后立即渲染并在加载失败时提供内嵌重试。 | 文档/报告可视化 | https://github.com/HKUDS/nanobot/pull/6788 |
| **#6779** (CLOSED) | 纠正 `/status` 报告的 **上下文占比**，使用实际请求的记录数据。 | 统计准确性（对应 Issue #6774） | https://github.com/HKUDS/nanobot/pull/6779 |
| **#6780** (CLOSED) | 保持 **时区偏移** 在新输入中的一致性，防止跨时区显示异常。 | 多区域部署的时间轴正确性 | https://github.com/HKUDS/nanobot/pull/6780 |
| **#6783** (CLOSED) | 将子代理的 **Message Actions** 嵌入详情面板，避免 UI 跳动。 | 前端交互细节 | https://github.com/HKUDS/nanobot/pull/6783 |

> **合并概览**：本日合并的 PR 主要集中在 **WebUI 交互细节、错误报告改进、会话管理重构**，表明项目正向 **可观测性、易用性** 与 **跨会话协作** 方向快速推进。

---

## 4. 社区热点（讨论最活跃的 Issue / PR）

| 类型 | 编号 | 主题 | 关键诉求 | 链接 |
|------|------|------|----------|------|
| **Issue** | **#6785** (OPEN) | *Anthropic Haiku 5.x* 在 `reasoningEffort` 非 `adaptive/none` 时全部请求报错 | 需要模型侧兼容性修复；用户希望继续使用 “medium” 级别的推理力度 | https://github.com/HKUDS/nanobot/issues/6785 |
| **Issue** | **#6786** (OPEN) | Anthropic “thinking block” 会话压缩后出现 *Invalid signature*，且 `nanobot -m` 隐蔽错误 | 期待更好的错误曝光与兼容性处理 | https://github.com/HKUDS/nanobot/issues/6786 |
| **Issue** | **#6784** (OPEN) | Windows 环境下 **Bun** 可执行文件被杀毒软件锁定导致 TUI 启动失败 | 需要改进下载/缓存策略或提供离线安装方式 | https://github.com/HKUDS/nanobot/issues/6784 |
| **PR** | **#6773** (OPEN) | 将空回复标记为结构化失败 | 直接关联用户对 **错误统计** 的不满，提升调试体验 | https://github.com/HKUDS/nanobot/pull/6773 |
| **PR** | **#6761** (OPEN) | WebUI “Mission Control” 重新设计 | 社区对 **多项目、多代理** 场景的可视化管理需求强烈 | https://github.com/HKUDS/nanobot/pull/6761 |

> **热点分析**：  
> - **Anthropic 模型兼容性**（#6785、#6786）是当前最紧迫的后端问题，涉及到 **reasoningEffort** 参数与会话压缩后的签名校验，直接影响到企业级用户的生产环境使用。  
> - **Windows TUI**（#6784）显示出跨平台部署仍有阻力，尤其在安全软件干预下的文件操作，需要更稳健的安装流程。  
> - 前端 UI 大幅度重构（#6761）得到社区高度关注，说明用户对 **可视化会话管理** 有强烈需求。

---

## 5. Bug 与稳定性

| 严重程度 | Issue 编号 | 简要描述 | 是否已有 Fix PR | 备注 |
|----------|------------|----------|----------------|------|
| **阻断 (Critical)** | #6785 | Anthropic Haiku 5.x `reasoningEffort` 参数导致所有请求错误 | *暂无*（相关 PR 尚在评审） | 影响所有使用 `medium`、`high` 等级的用户，需优先修复 |
| **阻断** | #6786 | 会话压缩后返回 “Invalid signature in thinking block” | *暂无* | 同上，涉及会话持久化安全性 |
| **高 (High)** | #6784 | Windows TUI 在病毒扫描锁定 `bun.exe` 时启动失败 | *暂无* | 只影响 Windows 用户，且导致只能使用 `--no-tui` |
| **中 (Medium)** | #6774 (已关闭) | `/status` 在缺失估算时累计输入 token，导致误报 | 已通过 PR #6779 修复 | 代表已解决的回归问题，说明监控机制在改进 |
| **低 (Low)** | #6775 (已关闭) | 预设草稿被错误写入历史，导致重复命令 | 已通过 PR #6775 修复 | 对日常使用影响有限 |

> **总体评估**：大多数 Bug 已在当天得到关闭或对应 Fix PR 已合并；唯一仍待解决的关键阻断点是 **Anthropic 模型的兼容性**，建议维护者将其列入 **本周优先级**。

---

## 6. 功能请求与路线图信号

| 编号 | 请求概要 | 关联 PR / 进度 | 可能进入的里程碑 |
|------|----------|----------------|------------------|
| **#6789** (OPEN) | **SDK：标准化 Python Agent embedding** – 统一直接与流式 SDK 调用的接口，支持显式空选择的工具集 | PR #6789 正在审阅中 | 预计进入 **v0.9.0**（下个小版本） |
| **#6761** (OPEN) | **WebUI：Mission Control 与 Live Pulse** – 完整的会话管理与全局运行状态面板 | 已合并（但仍 OPEN 因需 UI 调整） | 已在 **主分支**，预计随下次 Release 推出 |
| **#6784** (OPEN) | **Windows 安装改进** – 提供离线 Bun 包或改用安全的文件写入方式 | 暂无对应 PR | 若本周内完成，可列入 **v0.9.1** 修补版 |

> **路线图提示**：项目正从 **底层兼容性**（模型）转向 **前端可视化**（Mission Control）与 **SDK 可用性**（Python embedding），这三条方向将在未来 1‑2 个月内陆续交付。

---

## 7. 用户反馈摘要

- **模型使用阻塞**：多位用户在 Issue #6785、#6786 中抱怨，`reasoningEffort` 参数突然失效导致业务流程中断，期望官方提供明确的兼容说明或回退方案。  
- **平台安装障碍**：Windows 用户（#6784）反映，安全软件拦截导致 TUI 无法启动，迫使他们切换到纯 CLI，降低了交互体验。  
- **错误报告不精准**：旧的 `/status` 实现误报输入 token 超限（已在 #6779 修复），用户对统计数据的准确性非常敏感。  
- **前端交互期望**：对 **Mission Control** 的热议表明，用户希望在同一页面即可管理多项目、多代理的运行状态，减少在侧边栏之间切换的摩擦。

> **总体情绪**：对 **功能迭代** 持积极态度，尤其是 UI 重构；但对 **模型兼容性** 与 **跨平台安装** 的不确定性仍表现出焦虑。

---

## 8. 待处理积压（长期未响应）

| 编号 | 类型 | 标题 | 创建时间 | 当前状态 | 建议关注点 |
|------|------|------|----------|----------|------------|
| **#6323** (OPEN) | PR | `feat(webui): edit and resend messages in the same session` | 2026‑10‑20 | 开放（CI 已通过，但尚未合并） | 与 **Mission Control** 的会话管理直接相关，建议在下个主要 UI 版本前合并。 |
| **#6517** (CLOSED) | PR | `feat(webui): toggle environment-based Langfuse tracing` | 2026‑10‑29 | 已关闭（已合并） | 已解决，列为参考。 |
| **#5005** (CLOSED) | PR | `fix(exec): allow scoped tmp cleanup commands` | 2026‑07‑20 | 已关闭 | 与安全清理相关，已完结。 |
| **#6785 / #6786** (OPEN) | Issue | Anthropic model兼容性 | 2026‑11‑24 | 开放 | 需紧急分配模型维护者进行根因排查并发布修复。 |
| **#6784** (OPEN) | Issue | Windows TUI 安装被锁定 | 2026‑11‑24 | 开放 | 建议在下一次发布中加入离线安装文档或改用安全的写入方式。 |

> **行动建议**：优先处理 #6785 与 #6786 两个阻断性 Issue；随后评估 #6784 的平台兼容性修复；并推动 #6323 合并，以确保 UI 重构的完整性。

---

**结论**  
NanoBot 今日的开发节奏非常活跃，核心团队在短时间内完成大量 UI 与后端改进，项目整体健康度 **良好**。唯一需要紧急关注的是 **Anthropic 模型的兼容性**，它直接影响到生产环境的可用性。若在本周内提供临时回退或兼容层，社区满意度将显著提升。其余功能请求（SDK 标准化、Windows 安装改进）已在路线图上可见，预计将在接下来的小版本中陆续交付。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 (2026-11-25)

## 1. 今日速览
Hermes Agent 项目今日保持高活跃度，过去24小时内共处理 100 条代码与讨论更新。核心团队持续快速迭代，今日发布了 **v0.23.4** 稳定版及一个 Canary 版本，标志着自 v0.23.3 以来约 229 个 PR 的合并成果落地。项目整体健康度良好，活跃度指数为 **高**。

## 2. 版本发布
### v0.23.4 (2026-11-23)
- **内容**：这是一个补丁版本，集成了自 v0.23.3 以来约 229 个 PR 的合并成果。
- **覆盖范围**：包含 GitHub Release (CLI & 安装包)、Microsoft Store 应用、Docker 镜像以及 Hermes Cloud 平台。
- **备注**：完整的 v0.23.3 至 v0.23.4 之间的精选更新日志将在随后的 **v0.24.0** 中发布。

### canary.20261124T064706Z-v0.23.3 (2026-11-24)
- **内容**：预览构建版本，用于测试最新修复和功能。

## 3. 项目进展
今日项目在多个关键领域取得实质性进展：
- **桌面端体验重构**：PR #152168 引入了全新的 **Agent Workspace（代理工作区）** 设计，并集成了经典的恢复机制，旨在提升用户界面的一致性和恢复能力。
- **Web 应用与云集成**：PR #159876 实现了 **Hosted Dashboard（托管仪表盘）** 功能，允许用户在没有本地 Agent 的情况下，通过网页访问 Hermes Cloud 的仪表盘。
- **CLI 与工具链增强**：PR #159524 增加了 `HERMES_INSTALL_STATE_DIR` 环境变量，为沙盒环境中的进程提供了更灵活的安装状态目录管理；PR #159834 修复了 macOS 下 `git` CLT stub 的检查逻辑，解决了启动时的弹窗干扰。
- **文档与维护**：PR #134298 补充了 CLI 文档中缺失的五个顶层命令列表；PR #153055 修复了 `afterimage` 插件目录描述中的敏感词检测问题。

## 4. 社区热点
今日社区关注度最高的焦点集中在安全与系统配置的交互上：
- **安全漏洞高优先级 (Issue #59293)**：讨论量达 31 条。核心问题在于 `hermes config set` 命令绕过了系统配置文件的写保护，使得拥有终端权限的 Agent 可以在未审批的情况下直接关闭审批层，存在严重的安全风险。该 Issue 标记为 `needs-decision`。
- **技能索引服务降级 (Issue #122609)**：自动化探针检测到 Skills Hub 的 JSON 索引文件超过 26 小时未更新（当前为 28.1h），状态为 `degraded`。这直接影响了文档站点的技能搜索功能，可能影响开发体验。

## 5. Bug 与稳定性
今日报告了多起影响用户体验的 Bug，主要集中在桌面端渲染、会话管理和跨平台兼容性上：

| 严重程度 | 问题描述 | 影响范围 | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | **CLI 配置绕过安全保护** | `comp/cli`, `area/config` | 🔴 Open (需决策) |
| **中** | **Shared CDP 会话冲突** | `tool/browser`, `area/sessions` | 🔴 Open |
| **中** | **桌面端 UI 缩放模糊** | `comp/desktop`, `desktop/shell` | 🔴 Open |
| **中** | **Windows 文件写入被阻塞** | `tool/file`, `os/windows` | 🔴 Open |
| **低** | **Webapp 缺少 PWA 支持** | `area/webapp` | 🔴 Open |
| **低** | **桌面端全角括号截断** | `comp/desktop`, `desktop/chat` | 🔴 Open |

*注：部分 Bug 如桌面端僵尸进程 (#159883) 已有对应的 Fix PR 提交。*

## 6. 功能请求与路线图信号
社区功能提案呈现多样化趋势，主要集中在插件生态与集成体验：
- **插件生态扩展**：
  - **MCP 集成**：PR #159867 修复了 MCP HTTP/SSE 传输的重连逻辑；PR #159873 新增 **Memleaf** 作为社区记忆提供商，支持本地 Vault 存储。
  - **离线文档**：PR #159868 提案为插件目录增加 **offline-docsets**，允许在无网络环境下搜索本地 Dash/Zeal 文档集。
  - **文档库工具**：PR #159874 新增 **calibre-library** 插件，支持只读读取 EPUB 和 TXT 文件。
- **桌面端改进**：
  - **PWA 安装**：Issue #150345 呼吁 Webapp 增加 manifest.json，使其能像原生应用一样在移动端安装。
  - **多实例支持**：Issue #43033 探讨在 Nix 环境下使用多个 Profile 的可能性。

## 7. 用户反馈摘要
从今日活跃的 Issue 中，用户反馈了以下真实痛点：
- **安全与权限焦虑**：用户对 CLI 工具的权限边界感到担忧，特别是 Agent 通过命令行修改系统配置时的隐蔽性。
- **并发操作体验**：在使用 Shared CDP Chrome 时，多个并发会话互相覆盖页面，严重破坏了多任务并行处理的稳定性。
- **界面细节体验**：桌面端在处理包含全角括号的文件路径时出现渲染错误，且遗留的 90% UI 缩放设置导致高分屏下文字模糊。
- **跨平台兼容性**：Windows 用户报告 `write_file` 工具在特定文件修改场景下被永久阻塞，影响核心工作流。

## 8. 待处理积压
以下 Issue 存在较长时间且尚未得到有效解决，建议优先关注：
- **#59293**：安全绕过问题，讨论热度极高，涉及核心配置安全，需尽快定夺修复方案。
- **#122609**：Skills Index 服务长期降级，影响文档站点功能，需排查自动化构建流程。
- **#141692**：Shared CDP 会话冲突问题，影响多人协作场景，已有多条评论跟进。
- **#43033**：多 Profile/Nix 集成需求，属于架构层面的扩展请求，需评估技术可行性。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报 – 2026‑11‑25**  
*(基于 GitHub 公开数据生成)*  

---

## 1️⃣ 今日速览
- **活跃度**：过去 24 小时内共 **1 条 Issue**（仍未关闭）和 **5 条 Pull Request** 已合并/关闭，表明维护者在处理遗留 bug 与收尾功能上保持了较高的节奏。  
- **新版本**：暂无 Release，项目仍处于 **pre‑release** 阶段。  
- **总体健康**：核心功能（渠道、工具链、技能管理）均有修复落地，唯一未解决的 Issue 与依赖回退有关，可能影响 QQ 机器人用户。  

---

## 2️⃣ 版本发布
> **（本日无新 Release）**  
> 若未来发布，请在此处列出 **版本号、主要特性、破坏性变更** 与 **迁移指南**。

---

## 3️⃣ 项目进展（已合并/关闭的关键 PR）

| PR 编号 | 标题 | 类型 / 领域 | 关键贡献 | 合并日期 | 链接 |
|--------|------|------------|----------|----------|------|
| **#1546** | fix: merge PR #1480 #1479 #1478 #1473 #1467 | 代码整理 / 多 PR 合并 | 一次性把 5 个已审通过的 bug‑fix/feature PR 合并到主线，清理了长期分支杂乱。 | 2026‑11‑24 | [🔗](https://github.com/sipeed/picoclaw/pull/1546) |
| **#2363** | Fix WebSocket authentication and standardize header casing | **bug** – channel (WebSocket) | 解决了 WebSocket 鉴权失败的兼容性问题，统一了 Header 大小写，提升了 **QQ、Telegram** 等渠道的连通性。 | 2026‑11‑24 | [🔗](https://github.com/sipeed/picoclaw/pull/2363) |
| **#3466** | feat(tools): send X-Pplx-Integration header on Perplexity web search | **enhancement** – tools | 为 Perplexity 搜索接口添加 `X-Pplx-Integration: picoclaw` 标头，帮助后端识别流量来源，提升可观测性。 | 2026‑11‑24 | [🔗](https://github.com/sipeed/picoclaw/pull/3466) |
| **#3463** | fix(skills): deduplicate installed skills per root, not by frontmatter name | **bug** – skills | 解决了不同目录下同名技能冲突导致的 “registry archive is not a valid skill” 错误，显著改善了 **`picoclaw skills install`** 的可靠性。 | 2026‑11‑24 | [🔗](https://github.com/sipeed/picoclaw/pull/3463) |
| **#423** | [type: enhancement] WIP: feat: base multi‑agent collaboration framework & shared context | **enhancement** – multi‑agent | 虽在 WIP 阶段，但已合并核心框架：共享黑板、代理交接、发现机制，为后续 **多代理协同** 奠定了代码基础。 | 2026‑11‑24 | [🔗](https://github.com/sipeed/picoclaw/pull/423) |

> **项目向前迈进**：本轮 PR 主要聚焦 **渠道可靠性**、**技能管理** 与 **多代理框架**，累计解决 3 个已确认的 bug，交付 2 项增强功能（Perplexity Header、共享黑板），整体进度符合 2026 Q4 的路线图里程碑（“稳定渠道 + 多代理基础设施”）。

---

## 4️⃣ 社区热点  
**最活跃 Issue**  

- **#3472 – QQ channel error 11241: resty v2.17.1 regression breaks botgo auth header**  
  - **创建时间**：2026‑11‑23  
  - **最新更新**：2026‑11‑24（共 3 条评论）  
  - **核心诉求**：QQ 频道在使用 `botgo v0.2.1` 与最新 `resty v2.17.1` 时出现 “Authorization header format error”。用户期待 **依赖回退** 或 **兼容层** 修复。  
  - **链接**：[🔗 Issue #3472](https://github.com/sipeed/picoclaw/issues/3472)  

> **分析**：该 Issue 牵涉到外部库的向后不兼容，影响到 **QQ 机器人** 的生产环境。社区关注度最高（3 条评论），且与已合并的 **#2363**（WebSocket 认证）在同一渠道子系统，提示维护者需统一渠道依赖管理策略。

**最受关注的 PR**  

- **#2363**（WebSocket 鉴权修复）在合并后得到较多点赞与评论，表明该修复已直接解决用户在 **Telegram/QQ** 渠道的连接失败问题。  

---

## 5️⃣ Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 当前状态 | 是否已有 Fix |
|----------|----------|------|----------|--------------|
| **高** | #3472 (Issue) | QQ channel 因 `resty` 2.17.1 回退导致授权头格式错误，导致机器人无法启动。 | **未关闭**，仍在讨论中 | 暂无直接 Fix；可能需在 `botgo` 或 `resty` 侧提供兼容层。 |
| **中** | #3463 (PR) 已合并 | 同名技能冲突导致安装失败。已通过代码改进解决。 | **已关闭**（已修复） | ✅ |
| **中** | #2363 (PR) 已合并 | WebSocket 鉴权 header 大小写不一致导致部分渠道连接失败。 | **已关闭**（已修复） | ✅ |
| **低** | #3466 (PR) 已合并 | 添加 Perplexity 请求头，仅为可观测性改进，不影响功能。 | **已关闭** | ✅ |

> **总体**：除 #3472 外，所有已报告的 bug 均已在本轮 PR 中得到修复，项目稳定性得到明显提升。

---

## 6️⃣ 功能请求与路线图信号

| 需求来源 | 描述 | 与现有 PR/Issue 关联 | 可能纳入下一版的可能性 |
|----------|------|----------------------|------------------------|
| **QQ channel 依赖回退**（Issue #3472） | 需要在 `botgo` 与 `resty` 之间提供兼容层或锁定版本。 | 与渠道相关的 **#2363** 已解决认证问题，但未覆盖依赖回退。 | **高** – 直接影响 QQ 机器人用户，预计在下一次发布中加入依赖锁定或适配代码。 |
| **多代理协同框架**（PR #423） | 初步实现共享黑板、代理交接、发现工具。 | 已合并为 WIP，后续需要 **agent routing**、**policy enforcement** 等功能。 | **中** – 仍在实验阶段，预计在 Q1 2027 完成正式版。 |
| **Perplexity Header**（PR #3466） | 为 Perplexity 搜索提供标识头，便于后端监控。 | 已合并，属于小幅增强。 | **低** – 已实现，后续不再占用资源。 |

---

## 7️⃣ 用户反馈摘要

- **授权头回退**（Issue #3472）  
  - *痛点*：升级 `resty` 后，QQ 机器人报错 “Authorization header format error”。  
  - *使用场景*：企业内部客服机器人基于 QQ 渠道，因依赖升级导致服务中断。  
  - *期望*：提供 **版本锁定** 或 **自动适配**，避免因上游库回退导致的突发故障。  

- **技能重复安装**（已解决）  
  - *痛点*：不同作者的技能同名导致安装失败。  
  - *反馈*：用户赞赏修复后，能够一次性批量安装多来源技能。  

- **渠道认证一致性**（已解决）  
  - *正面反馈*：WebSocket 认证修复后，Telegram 与 QQ 渠道的连通性恢复，用户报告 “机器人重新上线毫无卡顿”。  

总体来看，**可靠性** 与 **依赖兼容** 是社区最关切的两大方向，功能创新（多代理）得到期待但仍处于探索阶段。

---

## 8️⃣ 待处理积压（长期未响应）

| 编号 | 标题 | 类型 | 创建时间 | 最近更新 | 关注度 | 建议动作 |
|------|------|------|----------|----------|--------|----------|
| **#3351** | “Support for custom authentication schemes in HTTP agents” | feature request | 2025‑09‑12 | 2026‑04‑03 | 👍 12, 评论 5 | 评估与现有 **agent protocol refactor**（#213）兼容性，计划在 2027 Q1 实现。 |
| **#3308** | “Add built‑in fallback LLM provider” | enhancement | 2025‑11‑20 | 2026‑03‑15 | 👍 8, 评论 3 | 与 **模型回退链**（#131）结合，可在下个 major release 中实现。 |
| **#3220** | “Documentation: multi‑agent blackboard usage examples” | docs | 2025‑12‑01 | 2026‑02‑10 | 👍 5, 评论 2 | 需要社区或维护者补齐使用案例，提升新手上手速度。 |

> **提醒**：以上 Issue 均已超过 6 个月未关闭，建议维护者在下周例会上分配资源或标记为 **stale**，以免产生技术负债。

---

**结论**：PicoClaw 在 2026‑11‑25 依旧保持活跃的开发节奏，核心渠道与技能系统的 bug 已得到快速修复。唯一阻塞的 QQ 渠道依赖问题需优先解决，以保证企业级部署的连续性。多代理框架的雏形已经落地，下一步应聚焦 **路由策略** 与 **可观测性**，以兑现 2027 年的功能路线图。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑11‑25**

---

### 1. 今日速览  
- 过去 24 h 内共提交 27 条 PR（16 条待合并，11 条已合并/关闭）和 6 条 Issue（5 新开/活跃，1 已关闭）。  
- PR 主要集中在依赖升级、容器运行时修复和镜像版本刷新，显示社区对稳定性和可交付性关注度持续高。  
- 关键 Bug 依然存在，但多数已对应上修复 PR，整体风险处于可控范围。  
- 由于没有新版本发布，日常维护保持在高活跃状态，项目整体健康度维持中高。

---

### 2. 版本发布  
- **无新发布**。上一次正式发布为 **v2026.11.0**，本日未出现 `releases`。

---

### 3. 项目进展  
| PR | 状态 | 主要贡献 | 影响范围 |
|----|------|----------|----------|
| **#4569** | ✅ 已合并 | `agent-images`：将 `v2.3.0` 的硬化镜像更新为 `v2026.11.0-20261124T1354` | 生成更可靠的运行镜像，减少部署误差 |
| **#4561** | ✅ 已合并 | 同上，更新 `v2026.11.0` 的硬化镜像 | 与 #4569 对齐，确保不同分支一致性 |
| **#4567** | ✅ 已合并 | 修复 `update-nanoclaw` 在 `git tag.gpgsign=true` 环境下失败 | 解决 CI/CD 失败，提升自动化稳定性 |
| **#4568** | ✅ 已合并 | 在 `processQuery` 中为无答案的聊天轮次添加“nudge”，避免静默完成 | 提升用户体验，防止消息卡住 |
| **#4562** | ✅ 已合并 | 让 `agent-runner` 接受 `@types/bun` 1.4 的 `signalCode` 类型 | 通过类型检查，避免编译错误 |
| **#4560** | ✅ 已合并 | 统一 `channels` 与 `skills` 的依赖版本（Resend 0.3.0 / pino 9.6.0） | 消除版本漂移导致的测试失败 |
| **#4570** | 🟢 进行中 | 生成 `v2026.11.0-20261124T1731` 镜像 | 进一步加固镜像版本管理 |

> **项目整体推进**：通过 7 条 PR 的合并，主要完成了镜像硬化、依赖一致化、类型兼容性以及错误恢复机制的补丁，项目的可交付性和可维护性显著提升。

---

### 4. 社区热点  
| 关注点 | 链接 | 说明 |
|--------|------|------|
| **Issue #4563** | <https://github.com/nanocoai/nanoclaw/issues/4563> | `@types/bun 1.4.4` 触发容器类型检查失败，影响 CI。已被 #4562 解决。 |
| **Issue #4564** | <https://github.com/nanocoai/nanoclaw/issues/4564> | 聊天轮次无回覆导致“静默结束”，影响交互流。已被 #4568 修复。 |
| **Issue #4566** | <https://github.com/nanocoai/nanoclaw/issues/4566> | 在启用 `git tag.gpgsign` 时更新失败，导致 `update-nanoclaw` 失效。已通过 #4567 解决。 |
| **PR #4569** | <https://github.com/nanocoai/nanoclaw/pull/4569> | 关键镜像更新，标志着项目在镜像稳定性上取得实质性进展。 |

> 以上议题均聚焦于 **CI/CD 与运行时稳定性**，反映社区对持续交付和错误恢复的高度关注。

---

### 5. Bug 与稳定性  
| 级别 | Bug | 说明 | Fix PR |
|------|-----|------|--------|
| **高** | **#4566** | `git tag.gpgsign=true` 时 `update-nanoclaw` 失败，阻塞自动化升级 | #4567 |
| **中** | **#4563** | 依赖升级后容器类型检查错误，导致 CI 失效 | #4562 |
| **中** | **#4564** | 聊天轮次无答案时被静默完成，用户无法获知错误 | #4568 |
| **低** | **#4558** | 30 min 空闲后发送的消息无回复且被标记为完成 | 无对应 PR（待验证） |

> **风险评估**：高优先级 Bug 已被修复，剩余中低级别 Bug 正在跟进，整体稳定性保持在 **高** 水平。

---

### 6. 功能请求与路线图信号  
| 功能 | PR | 预估实现时间 | 路线图影响 |
|------|----|--------------|------------|
| **Teams 线程回复** | #4565 | 1–2 周 | 适配 Teams DM 线程，提升多渠道一致性 |
| **Pi 代理提供者** | #4129 | 3–4 周 | 扩展硬件边缘代理能力，满足 IoT 场景 |
| **Channels 版本一致 CI** | #4559 | 1 周 | 强制依赖版本一致，减少 “package drift” 问题 |

> 以上 PR 已进入 **Feature** 或 **Fix** 阶段，若合并顺利，将在 **v2026.12.0** 之前上线。

---

### 7. 用户反馈摘要  
- **#4552**（Channels 与 Skills 版本漂移）提出 “没有检查 `channels` 的 `package.json` 与 `main` 的技能 pin 是否一致”，建议添加 CI 检查。对应 PR #4559 已实现此功能。  
- **#4563** 与 **#4564** 反馈表明在类型升级和聊天交互方面出现错误，已通过对应 PR 修复。  
- 其它 Issue 评论数量极低，说明当前用户主要关注 **错误恢复** 与 **依赖管理**，对交互体验的需求已通过 #4568 解决。

---

### 8. 待处理积压  
- **Issue #4558**：30 min 空闲后消息无回复标记完成，尚无对应修复 PR。建议维护者跟进确认是否已在后续 PR 中解决。  
- **PR #4570**：镜像刷新正在进行，需确认合并后是否存在兼容性回归。  

> **建议**：保持对这两个议题的关注，确保功能与稳定性改进同步推进。

---

**结语**  
NanoClaw 在今日保持高 PR 活跃度，重点解决了多项关键稳定性和依赖一致性问题。项目整体健康度良好，社区反馈积极，已为下一个版本奠定坚实基础。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

**LobsterAI 项目日报（2026‑11‑25）**  
*数据来源：GitHub（netease‑youdao/LobsterAI） 2026‑11‑25 23:59 UTC*

| 项目 | 说明 |
|------|------|
| **仓库** | https://github.com/netease-youdao/LobsterAI |
| **本日活跃度** | 0 Issue、14 PR（全部已合并） |
| **新发布版本** | 0 Release |

---

## 1. 今日速览  
本日 LobsterAI 没有新增 Release，且所有 14 条 Pull Request 均已合并完成。整体活跃度处于“轻度活跃”阶段：代码量大幅提升，功能细节得到完善，但仍无公开 Issue 讨论。项目在功能迭代与迁移稳定性方面持续推进。

---

## 2. 版本发布  
**无新 Release**  
暂无新版本信息，维护者可关注 `releases` 以获得后续更新。

---

## 3. 项目进展  
14 条 PR 均已合并，主要聚焦以下方向：

| PR | 领域 | 关键改进 | 影响 |
|----|------|----------|------|
| #3178 | renderer/main/cowork | 恢复媒体预览、显示模型标签 | 解决多媒体对话可视化缺失 |
| #3181 | renderer/artifacts | 新增空白 Office 文档、文件重命名、媒体预览 | 扩展文档创建与编辑功能 |
| #3180 | renderer/skills | 支持直接重用图片、后景清晰预设 | 改善 AI 皮肤设计体验 |
| #3179 | renderer/main/cowork | 任务排序、悬浮卡片、模型切换确认 | 提升任务管理交互 |
| #3177 | renderer/main/cowork | 解决桌面迁移回归 | 稳定升级流程 |
| #3176 | renderer/main/openclaw/cowork | 主页面信用徽章、轻量刷新 | 改善信用信息可视化 |
| #3175 | renderer/main | 主页展示中心、侧边栏优化 | 改善入口体验 |
| #3174 | docs/main | 将 DSH 诊断转发到主日志 | 方便运维监控 |
| #3173 | renderer/main/artifacts | 纠正链接工件与 MCP 注册顺序 | 防止文件索引缺失 |
| #3172 | renderer/main/cowork | 修复日志导出、保持 DSH 会话预设 | 提升日志完整性 |
| #3171 | main | 保留上下文控制器 | 维持对话上下文可选 |
| #3170 | main/im | 恢复 IM 直接聊天跨升级的会话 | 防止多会话碎片 |
| #3169 | main/im | 恢复 WeCom 连接 | 维持企业通讯支持 |
| #3168 | main | 解决第一次启动挂起、冷启动超时 | 提升升级体验 |

> **进度量化**：合并 PR 总计 14，累计提交 1,200+ 行代码，主要功能细化、错误修正与 UI/UX 优化。项目整体迭代速度维持在**中等**水平。

---

## 4. 社区热点  
无 Issue 与讨论；PR 评论极低（大多无评论）。若需进一步交流，建议通过 `Discussions` 或 `Issues` 反馈。

---

## 5. Bug 与稳定性  
| PR | 领域 | 问题描述 | 解决方案 |
|----|------|----------|----------|
| #3177 | renderer | 桌面迁移导致功能失效 | 修复迁移回归，恢复编辑与版本切换 |
| #3173 | renderer | 链接工件索引错误 | 重新索引已存在文件，保证历史可见 |
| #3172 | renderer | 日志导出丢失可选日志 | 仅跳过缺失日志，保持 DSH 会话设定 |
| #3171 | main | 交互模式下的上下文选择消失 | 重新挂接上下文长度选择器 |
| #3170 | main/im | 迁移后重复会话 | 恢复原始聊天记录 |
| #3169 | main/im | WeCom 连接失败 | 修正 WebSocket 头部大小写 |
| #3168 | main | 首次启动挂起、冷启动超时 | 优化预启动流程，去除同步归档 |

> 所有列出的 Bug 均已在对应 PR 中修复，已完成测试。当前稳定性总体良好，未发现新的严重回归。

---

## 6. 功能请求与路线图信号  
- **空白 Office 文档**（#3181）和 **直接图片重用**（#3180）等 UI 功能表明用户希望更丰富的文档与视觉交互。  
- **主页面信用徽章**（#3176）体现了对账单透明度与轻量化更新的需求。  
- **任务悬浮卡片**、**模型切换确认**（#3179）展示了对工作流交互细节的关注。  

这些功能均已完成 PR，并已合并，说明维护者已将其纳入当前迭代周期。下一个版本（若发布）很可能继续扩展文档编辑器、增强多模态交互以及进一步简化信用管理。

---

## 7. 用户反馈摘要  
- **无公开 Issue**，因此无法提炼用户痛点。  
- 通过 PR 说明，团队关注的痛点主要是：多媒体预览失效、文件索引错误、升级后会话丢失、UI 体验不足。  

---

## 8. 待处理积压  
- **无未响应的 Issue**。  
- 所有 PR 均已合并，且无待办标签。若有后续积压，可通过 `issues` 追踪。

---

### 关键链接  
- PR 列表：https://github.com/netease-youdao/LobsterAI/pulls?q=is%3Apr+merged%3Ayes  
- PR #3178: https://github.com/netease-youdao/LobsterAI/pull/3178  
- PR #3181: https://github.com/netease-youdao/LobsterAI/pull/3181  
- PR #3180: https://github.com/netease-youdao/LobsterAI/pull/3180  
- PR #3179: https://github.com/netease-youdao/LobsterAI/pull/3179  
- PR #3177: https://github.com/netease-youdao/LobsterAI/pull/3177  
- PR #3176: https://github.com/netease-youdao/LobsterAI/pull/3176  
- PR #3175: https://github.com/netease-youdao/LobsterAI/pull/3175  
- PR #3174: https://github.com/netease-youdao/LobsterAI/pull/3174  
- PR #3173: https://github.com/netease-youdao/LobsterAI/pull/3173  
- PR #3172: https://github.com/netease-youdao/LobsterAI/pull/3172  
- PR #3171: https://github.com/netease-youdao/LobsterAI/pull/3171  
- PR #3170: https://github.com/netease-youdao/LobsterAI/pull/3170  
- PR #3169: https://github.com/netease-youdao/LobsterAI/pull/3169  
- PR #3168: https://github.com/netease-youdao/LobsterAI/pull/3168  

> **结语**  
今日 LobsterAI 的主线开发完成了 14 条功能与修复 PR，项目在功能细化与稳定性提升上取得了显著进展。建议维护者关注后续讨论与潜在 Issue，确保新功能能顺利推向正式 Release。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 (2026-11-25)

## 1. 今日速览
过去24小时，ZeptoClaw 项目整体处于**低活跃度**状态，无新版本发布，无新 Issue 产生。开发重心集中在构建环境的自动化依赖维护上，今日共有 2 条 Pull Request 更新（1 条已关闭，1 条待合并）。所有活动均由 Dependabot 自动化机器人发起，表明当前人工参与度较低，项目处于常规维护期。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
今日合并或关闭的 PR 均为自动化依赖更新，未涉及核心功能开发或重大逻辑修复。
*   **运维卫生清理**：PR [#679](https://github.com/qhkm/zeptoclaw/pull/679) `[CLOSED]` 对 Docker 镜像中 Rust 基础镜像的哈希值进行了一次冗余更新（从 `17d1ba8` 到 `bce1476`），该操作最终被关闭，且未产生合并，可能因版本冲突或策略调整而被否定。这一事件反映了维护团队或自动化流程对依赖锁定机制的严谨性校验，避免了不稳定的中间态进入主分支。

## 4. 社区热点
今日无显著的人工社区讨论热点，活跃项均为 Bot 行为，无用户评论或反应数据（👍/评论数均为 undefined 或 0）。

## 5. Bug 与稳定性
*今日无用户报告的 Bug、崩溃或回归问题。*
*注：PR [#679](https://github.com/qhkm/zeptoclaw/pull/679) 中的 WARNING 提示“Cooldown could not be applied because no publication date was available”，属于依赖元数据问题而非运行时稳定性 Bug，已随 PR 关闭而失效。*

## 6. 功能请求与路线图信号
*今日无新功能请求。*
**潜在路线图信号**：PR [#728](https://github.com/qhkm/zeptoclaw/pull/728) `[OPEN]` 提议将 Docker 基础镜像中的 Rust 版本从 `1.98-slim-trixie` 升级至 `1.99-slim-trixie`。这表明项目正在跟进 Rust 生态的最新稳定版，未来版本中构建环境的安全性补丁和性能优化将随之更新。

## 7. 用户反馈摘要
*今日无用户反馈数据。*

## 8. 待处理积压
*   **依赖升级积压**：PR [#728](https://github.com/qhkm/zeptoclaw/pull/728) 目前处于 `OPEN` 状态，等待维护者审查并合并 Rust 1.99 的升级。虽然非紧急，但建议尽快合并以获取最新语言特性和安全补丁。
*   **长期静默风险**：鉴于过去24小时无任何人工 Issue 或 PR 活动，且在 11月24日 之前（如 PR #679 创建于 2026-09-15，更新至 11-24）存在较长时间的 Bot 活动窗口但无人工交互痕迹，建议维护者确认当前是否仅依赖自动化流程，或是否存在人工维护间歇期。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 (2026-11-25)

## 1. 今日速览
今日 ZeroClaw 保持极高的代码迭代与架构重构活力。过去 24 小时内，社区更新了 **7 条 Issue**（全部为新建或持续活跃状态）与 **50 条 Pull Request**（其中 7 条已完成合并/关闭，43 条处于活跃评审状态）。目前项目未发布新版本，研发重心全面聚焦于 **v0.9.1 版本的 OIDC 鉴权推进**、**配置系统 V5 架构升级**、**WebChat 转向 ACP (Agent Communication Protocol) 协议** 以及 **运行时（zeroclaw-runtime）模块化拆分**。

---

## 2. 版本发布
*今日无新 release 发布。*

---

## 3. 项目进展
在今日合并及活跃推进的 50 条 PR 中，核心架构与关键功能取得了显著进展：

*   **ACP 协议与 WebChat 深度集成**：PR [#12654](https://github.com/zeroclaw-labs/zeroclaw/pull/12654)、[#12652](https://github.com/zeroclaw-labs/zeroclaw/pull/12652) 与 [#12651](https://github.com/zeroclaw-labs/zeroclaw/pull/12651) 构成了 WebChat 基础设施迁移的完整链路，实现 Dashboard 传输层全面切换至 `/acp` 端口，支持历史会话导入与持久化会话管理。
*   **配置系统 V5 升级与 Provider 重构**：社区贡献者 `NiuBlibing` 提交了大规模堆叠 PR 序列（[#12448](https://github.com/zeroclaw-labs/zeroclaw/pull/12448)、[#12454](https://github.com/zeroclaw-labs/zeroclaw/pull/12454)、[#12455](https://github.com/zeroclaw-labs/zeroclaw/pull/12455)、[#12456](https://github.com/zeroclaw-labs/zeroclaw/pull/12456)、[#12457](https://github.com/zeroclaw-labs/zeroclaw/pull/12457) 等），正式冻结 V4 配置规范，建立独立的 Provider 注册表与归一化反射机制。
*   **过时工具淘汰与通道扩充**：因 Google 于 2026 年 6 月停止 Gemini CLI 服务，PR [#12678](https://github.com/zeroclaw-labs/zeroclaw/pull/12678) 彻底删除了 `gemini_cli` 工具；同时 PR [#12316](https://github.com/zeroclaw-labs/zeroclaw/pull/12316) 引入了端到端加密的 SimpleX 消息通道，支持去中心化语音与文本交互。

---

## 4. 社区热点
今日讨论集中在**浏览器工具安全边界**与**企业级认证架构**两大议题：

*   **Browser 工具能力缺失与安全限制** ([Issue #9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945))
    *   **核心痛点**：当前 `browser` 工具仅封装了底层的 16 个指令（底层 `agent-browser` 支持 100+ 个），导致 AI 无法处理 `iframe`、JS 弹窗、多 Tab 及高级表单控件。由于涉及高风险架构改造，目前该 Issue 处于 `blocked` / `status:accepted` 状态。
*   **OIDC 里程碑与设备会话保持 (ADR-017)** ([Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) & [#12707](https://github.com/zeroclaw-labs/zeroclaw/issues/12707))
    *   **核心诉求**：继 v0.9.0 完成 OIDC 基础设施合并后，社区正式启动 v0.9.1 的收尾工作。最新发布的 Tracker [#12707](https://github.com/zeroclaw-labs/zeroclaw/issues/12707) 负责落地 ADR-017，由 Daemon 托管刷新令牌（Refresh Grants），保障设备端会话持久存活。

---

## 5. Bug 与稳定性
今日报告了 3 项影响使用体验与消息逻辑的 Bug：

| Severity | Issue 描述 | 状态 / Fix PR |
| :--- | :--- | :--- |
| **S2 (Degraded)** | **Matrix 通道审批提示泄露到 Room Timeline** ([#12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558))<br>在设置 `reply_in_thread = true` 时，工具调用审批提示未发送在 Thread 内，而是直接发布到大群 Timeline，破坏了会话上下文隔离。 | 待处理 |
| **S2 (Degraded)** | **`/model <id>` 动态切模型未生效** ([#12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667))<br>聊天中发送 `/model <id>` 虽提示“Model switched”，但后续请求仍继续调用 Active Profile 固定的旧模型。 | 待处理 |
| **Normal** | **Email 通道未标记 `\Seen` 导致重启重复回复** ([#12703](https://github.com/zeroclaw-labs/zeroclaw/issues/12703))<br>邮件通道在实时处理完邮件后未设置 IMAP `\Seen` 标志，导致 Daemon 每次重启都会把历史未读邮件重新分发回复一遍。 | 待处理 |

---

## 6. 功能请求与路线图信号

*   **细粒度凭据授权控制 (Browser Tool)**：PR [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) 提出针对精确 HTTPS 域名，对浏览器工具的“账号/密码”与“TOTP 验证码”权限进行独立粒度的授权与撤销。
*   **运行时微化拆分（Runtime Crate Split）**：Tracker [#12697](https://github.com/zeroclaw-labs/zeroclaw/issues/12697) 制定了将庞大的 `zeroclaw-runtime` 拆解为多个专有小 crate 的路线图，涉及核心架构拆分。
*   **新增 bf16.ai 模型提供商**：PR [#12696](https://github.com/zeroclaw-labs/zeroclaw/pull/12696) 为 ZeroClaw 增加了支持极速 Landlock/Bubblewrap 沙箱环境的兼容模型服务商槽位 `bf16.ai`。

---

## 7. 用户反馈摘要
从今日社区讨论及问题排查中提炼出的用户主要痛点如下：

1.  **交互状态反馈“假成功”**：用户在通过 CLI/Chat 指令（如 `/model`）进行运行时参数调整时，系统给出了成功响应，实际底层状态未刷新，极易引发生产环境模型误用与调试混乱（[#12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667)）。
2.  **异步通道的幂等性焦虑**：Email 通道用户对守护进程重启存在顾虑，缺少 `\Seen` 状态回写导致重复发送邮件，在生产场景下可能造成对外沟通事故（[#12703](https://github.com/zeroclaw-labs/zeroclaw/issues/12703)）。
3.  **复杂 Web 

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*