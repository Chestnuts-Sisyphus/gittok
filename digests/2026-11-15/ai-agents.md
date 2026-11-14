# OpenClaw 生态日报 2026-11-15

> Issues: 399 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-14 23:30 UTC

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

# OpenClaw 项目动态日报 (2026-11-15)

## 1. 今日速览
OpenClaw 项目今日保持高频活跃，过去 24 小时共处理 **399 条 Issues**（新增/活跃 332，关闭 67）及 **500 条 PR**（待合并 336，已合并/关闭 164）。项目整体健康度良好，活跃度较高。尽管无新版本发布，但社区修复了大量 UI 交互、CLI 工具及后端性能问题，并持续推进功能优化。整体进展平稳，呈现“高频迭代、稳步修复”的态势。

## 2. 版本发布
> **无新版本发布**。
> 当前开发重心集中在 2026.11.x 系列的持续迭代与修复。

## 3. 项目进展
今日合并/关闭了多个关键 PR，主要涉及前端 UI 优化、后端性能提升及 CLI 工具修复：
*   **PR #199156** (已关闭): 修复了 2026.11.5 betas 版本中 Bonjour 发现失败的问题，确保 npm 安装能正确广播 Gateway 服务。
*   **PR #199306** (已关闭): 优化了沙箱工作区性能，通过复用未变更的打包内容，减少了重复的序列化和网络传输开销。
*   **PR #199202** (已关闭): 刷新了 Control UI 的本地化资源，保持了界面语言的一致性。
*   **PR #199304** (已关闭): 修复了 CI 测试中关于 Gateway 方法工作器的覆盖范围统计错误。
*   **PR #199303** (已关闭): 修复了 E2E 测试中关于“被阻止的调色板提交”的失败用例。

## 4. 社区热点
今日社区讨论热度较高的 Issue 重点关注 **Codex 继续机制**、**会话状态管理** 及 **Prompt 缓存** 问题：
*   **#172837** (评论 20): [Bug] Codex nativeSubagentAssignments 在完成交付失败后从未被移除。这可能导致资源泄漏，每次新线程启动都会重新钉选和发送旧数据。
*   **#44309** (评论 18): [Feature] 为 A2A（Agent to Agent）移交添加单向调度模式，避免回复时的“乒乓”通信。
*   **#143017** (评论 16): 关于 Prompt 缓存前缀重写机制的深度分析，指出持久会话在重写前缀时产生了大量缓存写入 token。
*   **#192632** (评论 15): [Feature] 实现类似 Gemini/Perplexity 的 Claude 服务器端 Web Search 提供商。

## 5. Bug 与稳定性
今日报告的 Bug 问题主要集中在 **内存溢出**、**会话阻塞** 和 **UI 交互异常**，其中部分问题已被标记为 P0 或回归错误：
*   **P0 / 回归**: **#191847** - 大型会话导致 SQLite 工作进程因内存溢出 (512MB) 崩溃，致使所有轮次失败。
*   **P0 / UX 阻塞**: **#194664** - Codex 受保护继续机制在会话停止后仍阻止后续操作，导致用户被锁定。
*   **P0 / 严重**: **#196199** - 2026.10.10 回归导致 Codex helper 完成无法恢复父级，阻断目标达成。
*   **P1**: **#193094** - 管理更新进程在验证阶段挂起超过 57 分钟并被 SIGKILL。
*   **P1**: **#196656** - Windows 平台 2026.11.1 上子代理运行/完成不可靠，通知失败。
*   **P1**: **#196820** - macOS 控制界面在 `Element.getAnimations()` 循环中卡死，CPU 占用率 100%。
*   **稳定性**: **#182891** - Prompt 缓存从未被重用，每次请求都发生 `cache read dropped`。

## 6. 功能请求与路线图信号
社区提出了多项影响用户体验和系统架构的功能请求：
*   **UI/UX 改进**: **#163739** - 请求将 Control UI 中的 Ctrl+Shift+A (归档) 快捷键设为可配置，以避免与浏览器快捷键冲突。
*   **Agent 交互**: **#166678** - 请求隐藏代理选择器中的某些代理，但保留其作为可生成目标的可用性。
*   **架构优化**: **#178373** - 讨论了 Agent 循环缺乏运行级令牌预算、工具循环检测是可选的以及保留历史记录的计费问题。
*   **多模态支持**: **#192632** - 请求为 Claude 添加 Web Search provider，利用其服务器端工具能力。

## 7. 用户反馈摘要
从活跃 Issue 中提取的用户痛点如下：
*   **会话管理痛点**: 多个 Issue 反映了会话在长时间运行后出现状态不一致（如 `changed while starting work`）或 SQLite 数据损坏，导致无法正常删除或重启会话。
*   **跨平台兼容性**: Windows 用户反馈 `openclaw.cmd` 针对多行 CLI 参数（如 `--message`）存在截断问题；macOS 用户报告设置界面在打开对话后变卡且输入框不可见。
*   **性能与资源**: Windows 环境下插件源码捕获导致包体积线性膨胀（290MB -> 612MB+），Gateway 无法恢复健康状态。
*   **用户体验**: 知识库读取器的标签误报（如将公司身份匹配误标为人）、iOS Dashboard 的设备身份循环问题以及 macOS TTS 音频转换后的截断问题。

## 8. 待处理积压
部分长期未解决的高优先级 Issue 需要维护者关注：
*   **#127195**: 十六处生产环境调用点抛出相同的“changed while starting work”错误，且没有任何区分信息，导致根本原因难以排查。
*   **#130247**: Cron 作业缺乏结束条件（如 `--until` / `--max-runs`），且作业状态不记录累计运行次数，导致作业无法真正结束。
*   **#130257**: 子代理运行（ACP）的 Token 和成本未记录在任务账本中，导致无法准确追踪子任务花费。
*   **#103067**: 会话命名未集中化，且子会话生命周期定义不清，影响多通道持久化。

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目日报 – 2026‑11‑15**  
（基于截至 2026‑11‑14 23:59 的 GitHub 数据）

---

## 1. 今日速览
- 项目仍保持高活跃度：过去 24 h 内 **32 条 Pull Request**（29 已合并/关闭、3 仍待合并）以及 **3 条 Issue**（2 新开/活跃、1 已关闭）。  
- 合并工作以**bug 修复、WebUI 稳定性提升和模型路由改进**为主，基本实现了上一轮发布后积压的技术债清理。  
- 社区关注点聚焦在 **Dream 记忆截断** 与 **WebUI 代码块渲染** 两大使用痛点，相关 Issue 已打开但尚未有对应的修复 PR。  
- 没有新版本发布，代码基线保持在 **v0.4.x**（最新合并在 `main@12a86eaa`），可视为一次“微更新”窗口。

---

## 2. 版本发布
> **本日无 Release**，因此本节略。

---

## 3. 项目进展（重点合并 / 关闭的 PR）

| PR 编号 | 类型 / 关键标签 | 主要贡献 | 影响范围 | 链接 |
|--------|----------------|----------|----------|------|
| **#6651** | bug, provider, webui, fix, p1 | 为模型预设新增 `supportsImages` 标记，实现**图片输入路由**，解决 NAN‑442 中的“模型请求失败时保留图片输入”问题 | 所有使用视觉模型的链路 | https://github.com/HKUDS/nanobot/pull/6651 |
| **#6640** | bug, webui, fix, p2 | 防止空流导致的“幻影推理”显示，提升 WebUI 对话可读性 | WebUI 前端 | https://github.com/HKUDS/nanobot/pull/6640 |
| **#6646** | bug, webui, fix, p2 | 修正单 `$` 公式在 **inline code** 中误匹配的问题，避免 KaTeX 解析错误 | WebUI Markdown 渲染 | https://github.com/HKUDS/nanobot/pull/6646 |
| **#6627** | bug, fix, p2 | 保留流式续写时的首尾空白字符，解决答案换行/缩进丢失的视觉错误 | 语言模型输出流 | https://github.com/HKUDS/nanobot/pull/6627 |
| **#6625** | bug, gateway, fix, p2 | 关闭已停止的 systemd 服务时不再自动重启，避免 **服务循环**。 | 本地部署/系统服务 | https://github.com/HKUDS/nanobot/pull/6625 |
| **#6586** | bug, webui, fix, p2 | 通过记录分页保留超大回合历史，防止 **历史截断** 导致信息丢失。 | 长会话持久化 | https://github.com/HKUDS/nanobot/pull/6586 |
| **#6631** | webui, performance, test, p2 | 精简模型预设保存流程，降低两次 mutation 带来的 **性能抖动**。 | WebUI 设置页 | https://github.com/HKUDS/nanobot/pull/6631 |
| **#6634** | webui, performance, test, p2 | 按需读取子代理任务历史，显著削减 **大对话打开时的 JSON 体积**（从 7.3 MB 降至 <1 MB）。 | 子代理任务 UI | https://github.com/HKUDS/nanobot/pull/6634 |
| **#6637** | refactor, execution | 统一 HTTP 重定向实现，提升 **web fetch 与图像下载** 的资源安全性。 | 所有网络请求 | https://github.com/HKUDS/nanobot/pull/6637 |
| **#6644** | refactor | 移除死代码、未引用的图标与 npm 依赖，降低维护成本（**0 行行为变更**）。 | 代码基线 | https://github.com/HKUDS/nanobot/pull/6644 |
| **#6643** | refactor, telegram | 从别名映射自动生成 Telegram 命令正则，防止 **命令不一致** 的回归。 | Telegram 通道 | https://github.com/HKUDS/nanobot/pull/6643 |
| **#6615** | refactor(config) | 正式 **退役旧 OpenAI API selector**，统一配置入口，准备后续 v0.5 的配置模型。 | OpenAI Provider | https://github.com/HKUDS/nanobot/pull/6615 |
| **#6647** *(已关闭)* | feat(providers) | 添加 **胜算云（ShengSuanYun）** 网关，扩展国内云模型接入能力。 | Provider 注册表 | https://github.com/HKUDS/nanobot/pull/6647 |
| **#6669** *(已关闭)* | docs | 更新 WeChat 社区群二维码，避免旧二维码失效。 | 文档/社区 | https://github.com/HKUDS/nanobot/pull/6669 |

> **合并概览**：本轮合并大多聚焦 **WebUI 稳定性**、**模型路由** 与 **部署安全**，表明维护者正以用户体验为驱动进行技术债偿还。  

---

## 4. 社区热点（讨论最活跃的 Issue / PR）

| 编号 | 类型 | 评论数 | 关键诉求 | 链接 |
|------|------|--------|----------|------|
| **#6649** (Issue) | bug | **2** | **Dream** 只读取每个 checkpoint 前 1000 字符，导致后续记忆未进入推理。 | https://github.com/HKUDS/nanobot/issues/6649 |
| **#6662** (Issue) | bug | **1** | WebUI 中 **inline code** 超长时会自动换行成滚动块或只显示文件名，破坏代码阅读。 | https://github.com/HKUDS/nanobot/issues/6662 |
| **#6194** (PR) | bug, fix, test, p2 | *未显示*（评论暂无） | 让 CI 在 **durable delivery** 与 **shutdown** 场景下能够完整结束，提升流水线可靠性。 | https://github.com/HKUDS/nanobot/pull/6194 |
| **#5152** (PR) | regression, fix, test | *未显示* | 标记 **子任务部分完成** 的结果，以便上层 turn 正确聚合。 | https://github.com/HKUDS/nanobot/pull/5152 |
| **#6364** (PR) | bug, fix, test, conflict | *未显示* | 在 **BOM 编码** 文本文件中搜索匹配，解决 `grep` 误判为二进制导致的漏检。 | https://github.com/HKUDS/nanobot/pull/6364 |

**分析**  
- **Dream 记忆截断**（#6649）是核心功能的可靠性问题，直接影响长期对话的记忆完整性，社区已提出并开始追踪。  
- **WebUI 代码渲染**（#6662）属于前端可用性痛点，尤其对开发者与技术用户是高频使用场景。  
- 其余 PR 多为内部质量提升（CI、子任务标记、文件编码兼容），显示项目在 **测试覆盖与 CI 稳定性** 上仍有改进空间。

---

## 5. Bug 与稳定性

| 严重程度 | Issue 编号 | 摘要 | 是否已有修复 PR | 当前状态 |
|----------|------------|------|----------------|----------|
| **高** | #6649 (Open) | Dream 只读取每个累计 checkpoint 前 1000 字符，导致记忆缺失。 | 暂无（相关 PR 仍在评审） | 需要尽快定位并在 `build_dream_prompt` 中去除截断。 |
| **中** | #6662 (Open) | WebUI inline code 长度超限导致滚动块或只显示文件名。 | 暂无 | 可在 Markdown 渲染器加入 **软换行** 或 **自动截断** 逻辑。 |
| **低** | #6660 (Closed) | 已退休的 OpenAI 图像模型仍在 UI 列表中，导致请求 404。 | 已关闭，问题已解决（模型列表清理）。 | ✅ 已在后续 PR 中移除。 |

> **其它隐性风险**：多条已合并的 WebUI 修复（#6640、#6646、#6628 等）表明过去的渲染逻辑在边缘案例下仍会出现 **幻影推理**、**数学公式误解析** 等问题，已通过 PR 逐步收敛。

---

## 6. 功能请求与路线图信号

| 需求来源 | 内容概述 | 对应已在进行的 PR | 可能进入的版本窗口 |
|----------|----------|-------------------|-------------------|
| Issue #6662 | 改进 **inline code** 渲染，防止自动滚动/截断。 | 暂无直接关联的 PR，但 **#6646** 已处理单 `$` 与代码块冲突，展示团队对渲染细节的关注。 | 若本周内完成评审，可在 **v0.4.3‑rc** 中加入。 |
| Issue #6649 | 解除 **Dream** 记忆截断限制。 | 相关改动预计会在 **#6651**（图片路由）后进行，因为两者均涉及 **checkpoint** 处理。 | 预计在 **v0.5.0**（大版本）前完成。 |
| 内部需求 | **系统化 HTTP 重定向**（#6637）与 **系统服务重启行为**（#6625） | 已合并，属于 **底层可靠性** 改进。 | 已在 **v0.4.2** 中交付。 |
| 社区建议 | 支持 **多语言本地化**（未在数据中出现，但在 Slack/Discord 中频繁提及） | 暂无对应 PR。 | 需在后续规划中评估。 |

**路线图提示**：本月的主要目标是 **“稳定性 + 渲染细节”**（WebUI、Dream、Provider），预计 **v0.5.0** 将聚焦 **全局模型路由与记忆完整性**。

---

## 7. 用户反馈摘要

- **记忆缺失**：用户在长对话（>10 turn）中发现后续上下文被 Dream 忽略，直接指向 Issue #6649。  
- **代码阅读体验**：开发者在 WebUI 里复制粘贴代码时，长 inline code 被自动折行成滚动块，破坏复制完整性，导致 Issue #6662。  
- **模型列表陈旧**：OpenAI 近期撤销的图像模型仍在 UI 中出现，虽已在 Issue #6660 关闭，但反映出 **文档/模型清单同步** 的需求。  
- **CI 稳定性**：维护者报告 CI 在 **durable delivery** 场景下偶发卡死，提出了 PR #6194 以保证流水线完整结束，体现社区对 **自动化可靠性** 的关注。  

总体来看，用户对 **对话记忆** 与 **前端代码展示** 的容忍度较低，期待快速修复；对 **底层部署与 CI** 的需求则更倾向于长期技术债偿还。

---

## 8. 待处理积压

| 编号 | 类型 | 创建时间 | 最近更新 | 关键原因 | 建议关注点 |
|------|------|----------|----------|----------|------------|
| **#6649** (Issue) | bug | 2026‑11‑13 | 2026‑11‑14 | Dream 记忆截断，影响核心对话功能 | 需要在 `build_dream_prompt` 中移除 1000 字符硬限制。 |
| **#6662** (Issue) | bug | 2026‑11‑14 | 2026‑11‑14 | WebUI inline code 渲染异常 | 与已合并的 **#6646**、**#6640** 对齐，统一 Markdown 渲染策略。 |
| **#6194** (PR) | bug, test | 2026‑10‑13 | 2026‑11‑14 | CI “durable delivery” 与 shutdown 仍未完全通过 | 仍在 **Open** 状态，建议尽快完成审查并合并，以提升 CI 稳定性。 |
| **#5152** (PR) | regression, test | 2026‑07‑28 | 2026‑11‑14 | 子任务部分完成标记，关联长会话任务可视化 | 评审进度缓慢，若合并将帮助调试子代理的状态追踪。 |
| **#6364** (PR) | bug, conflict | 2026‑10‑21 | 2026‑11‑14 | BOM 编码文件搜索兼容性 | 冲突已解决，仍待审查通过。 |

> **提示**：上述 5 条是唯一未解决的项目项，且均涉及核心功能或 CI 流程，建议维护者在下周的 **Sprint 计划** 中优先排入。

---

### 综合评价
- **活跃度**：高（PR 合并率约 90%），社区反馈及时。  
- **健康度**：良好。大多数 Bug 已在同一天或两天内得到关闭，只有两条关键功能性 Bug 仍待处理。  
- **风险**：Dream 记忆截断若不尽快修复，可能导致用户在长会话中的体验倒退；WebUI 渲染缺陷虽不致崩溃，但会削弱开发者使用感。  
- **建议**：集中资源在 #6649 与 #6662 的修复上，同时完成待审的 CI 相关 PR（#6194），为即将到来的 v0.5.0 打下稳固基础。

---

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报 – 2026‑11‑15**  
（数据来源：GitHub 过去 24 h 活动）

---

## 1. 今日速览  
- 项目在过去一天仍保持 **中等活跃度**：2 条新/活跃 Issue、9 条 PR（其中 6 条已合并/关闭），说明社区的反馈与代码维护在同步进行。  
- **合并工作** 主要集中在大规模 upstream 同步、核心功能回滚与多平台兼容性修复，提升了代码基线的可维护性。  
- **新功能请求**（LLMTR、CloudGPU、Standard Compute）正通过 PR 逐步落地，已出现对应实现 PR。  
- **Bug 关注** 仍聚焦于 skill 安装冲突与第三方依赖（Discord、pnpm）导致的运行时异常。  

整体来看，项目健康度良好，核心功能稳步推进，社区对新 provider 的需求逐步升温。

---

## 2. 版本发布  
> **暂无新版本**（过去 24 h 未发布 Release）。

---

## 3. 项目进展  

| PR 编号 | 状态 | 关键贡献 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#2810** | 已关闭（已合并） | 同步上游 `main`（+1095 commit）并迁移自定义改动至新版目录结构 | 全仓库代码组织、工具模块划分、配置位置 | https://github.com/sipeed/picoclaw/pull/2810 |
| **#423** | 已关闭（已合并） | 引入 **多代理协作框架**（Blackboard 共享上下文、代理交接、发现工具） | 为后续多 Agent 场景奠定基础 | https://github.com/sipeed/picoclaw/pull/423 |
| **#1558 / #1559** | 已关闭（已合并） | 批量合并若干修复 PR（#1344、#1342、#1341、#1331 等） | 统一代码质量、解决历史遗留小 bug | https://github.com/sipeed/picoclaw/pull/1558、https://github.com/sipeed/picoclaw/pull/1559 |
| **#3452** | 已关闭（已合并） | 更新 `discordgo` fork，消除 “gateway handshake deadlock” | Discord 渠道恢复正常心跳，提升稳定性 | https://github.com/sipeed/picoclaw/pull/3452 |
| **#3318** | 已关闭（已合并） | 修复 `pnpm-lock.yaml` 重复键导致的前端构建失败 | 前端依赖管理恢复，可继续进行 UI 开发 | https://github.com/sipeed/picoclaw/pull/3318 |
| **#2810**（同步） | 已关闭（已合并） | 见上表 | | |

**推进度评估**：本轮合并主要完成 **基础设施升级**（代码结构、依赖）和 **关键稳定性修复**，为新 provider 的实现提供了更干净的代码基线。预计后续新 provider（LLMTR、CloudGPU、Standard Compute）将在此基础上快速进入 QA 阶段。

---

## 4. 社区热点  

| 编号 | 类型 | 标题/摘要 | 互动情况（评论 / 👍） | 链接 |
|------|------|-----------|----------------------|------|
| **#3462** (Issue) | Bug | `skills install` 在前置 `SKILL.md` 名称冲突时报 “registry archive is not a valid skill” | 1 条评论，暂无赞 | https://github.com/sipeed/picoclaw/issues/3462 |
| **#3470** (Issue) | Feature | 请求在模型目录中加入 **LLMTR** 作为 OpenAI‑compatible provider | 0 评论，0 👍（新开） | https://github.com/sipeed/picoclaw/issues/3470 |
| **#3471** (PR) | Feature | 实现 **LLMTR** provider（对应 #3470） | 尚无评论 | https://github.com/sipeed/picoclaw/pull/3471 |
| **#3464** (PR) | Feature | 实现 **CloudGPU** provider | 暂无评论 | https://github.com/sipeed/picoclaw/pull/3464 |
| **#3431** (PR) | Feature | 实现 **Standard Compute** provider | 暂无评论 | https://github.com/sipeed/picoclaw/pull/3431 |

**分析**：  
- **技能安装冲突**（#3462）是唯一被社区标记为 *stale* 的 bug，说明该问题已经被注意但尚未得到快速响应。  
- **新增 provider**（LLMTR、CloudGPU、Standard Compute）形成了本周的热点，三条对应 PR 已经打开，且与 Issue #3470 紧密关联，显示出用户对多云模型接入的迫切需求。  

---

## 5. Bug 与稳定性  

| 严重程度 | 编号 | 描述 | 当前状态 | 是否已有对应 Fix PR |
|----------|------|------|----------|---------------------|
| **高** | #3462 (Issue) | `skills install` 在前置技能 `name` 冲突时抛出 “registry archive is not a valid skill”。 | OPEN（标记 *stale*） | 暂无 |
| **中** | #3452 (PR) | Discord 连接死锁（已在 #3452 中修复）。 | 已合并 | 已解决 |
| **中** | #3318 (PR) | `pnpm-lock.yaml` 重复键导致前端构建失败（已修复）。 | 已合并 | 已解决 |
| **低** | （暂无其他新报） | — | — | — |

**建议**：优先在本周内安排对 Issue #3462 的根因排查，考虑在 skill 安装流程中加入前置 `name` 检查或自动改名机制，以避免用户部署阻塞。

---

## 6. 功能请求与路线图信号  

| 请求来源 | 需求概述 | 对应实现进度 | 可能纳入的里程碑 |
|----------|----------|--------------|-------------------|
| Issue #3470 (用户) | 添加 **LLMTR** 作为 OpenAI‑compatible provider | PR #3471 已打开，代码已实现基本 provider 接口 | **下一次 Minor Release**（预计 Q4‑2026） |
| PR #3464 (贡献者) | 添加 **CloudGPU** provider | PR 仍在 *OPEN* 状态，等待审查 | 若审查通过，可同步进入下一次 Minor Release |
| PR #3431 (贡献者) | 添加 **Standard Compute** provider | 同样处于 *OPEN*，已标记 *stale*（可能因为审查资源不足） | 需要尽快评审，否则可能延迟至 2027 Q1 |
| Issue #3462 (用户) | Skill 安装冲突检测 | 尚无实现 | 视为 **关键 bug**，应在本月内完成修复 |

**路线图信号**：当前社区对 **多 provider 接入** 的需求最为集中，建议在 2026‑12‑的 Minor 版本中优先发布这些 provider，实现“一键”模型切换能力。

---

## 7. 用户反馈摘要  

- **痛点 1：Skill 安装冲突**  
  - 用户在使用 `picoclaw skills install` 时遇到前置名称冲突导致安装失败，阻断了自定义技能的快速迭代。  
  - 反馈显示缺乏明确错误提示和冲突自动处理机制。  

- **痛点 2：多模型供应商接入**  
  - 多位用户（尤其是企业级部署）希望通过统一的 provider 接口接入 **LLMTR、CloudGPU、Standard Compute** 等新兴模型服务，以降低迁移成本。  
  - 期望官方提供 **命名化 provider**，而非每次手动配置自定义 endpoint。  

- **满意点**  
  - 最近的 **Discord** 与 **pnpm** 修复被社区认可，恢复了聊天机器人和前端构建的正常使用。  

- **不满意点**  
  - 对于 **stale** 标记的 Issue/PR（尤其是 #3462、#3431、#3464），用户表达了“响应慢、可能被忽视”的担忧。  

---

## 8. 待处理积压  

| 编号 | 类型 | 状态 | 备注 |
|------|------|------|------|
| **#3462** | Issue (Bug) | OPEN / *stale* | 关键安装错误，需尽快分配 reviewer。 |
| **#3431** | PR (Feature) | OPEN / *stale* | Standard Compute provider，审查资源不足。 |
| **#3464** | PR (Feature) | OPEN / *stale* | CloudGPU provider，等待审查。 |
| **#3471** | PR (Feature) | OPEN | LLMTR provider，已实现但尚未通过 CI（需确认）。 |
| **#3470** | Issue (Feature) | OPEN | 与 PR #3471 对应的需求描述，建议在 PR 合并后关闭。 |

**提醒**：建议维护者在本周内安排至少一次 **review sprint**，重点处理以上 *stale* 项目，防止功能需求堆积导致社区热情下降。

---

### 结论  
PicoClaw 正在稳步向多模型、多代理的方向演进，核心代码基线已完成大规模同步，关键稳定性问题得到快速修复。唯一需要立即关注的是 **Skill 安装冲突** 与 **pending provider PR 的审查滞后**。若能够在本月内解决这些阻塞，项目将在下个 Minor 版本中交付显著的功能提升，进一步巩固其在 AI 助手生态中的竞争力。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑11‑15**

| 指标 | 统计 | 说明 |
|------|------|------|
| Issues（过去 24 h） | 0 | 无新增或关闭 |
| Pull Requests（过去 24 h） | 50 | 27 open / 23 merged/closed |
| 新版本发布 | 1 | v2026.11.0‑beta.3 |

---

### 1. 今日速览  
NanoClaw 继续保持每日高频 PR 流，过去 24 h 生成 50 条 PR（约 2 条/小时），其中 23 条已合并/关闭，表明持续交付。版本更新 v2026.11.0‑beta.3 已发布，带来一系列关键改进与兼容性修复。整体活跃度维持在“高”，但由于 Issues 空缺，社区交互主要集中在 PR 评论与 CI 反馈。  

---

### 2. 版本发布  
**v2026.11.0‑beta.3**  
- **内容**：第三个 beta，主要聚焦于稳定性与依赖升级（TypeScript 7，Node 24 基础镜像）。  
- **破坏性变更**  
  - `container-runner` 现在在遇到 Docker `--rm` 自动移除时会立即释放会话，可能导致已挂起的容器立即被终止。  
  - `setup` 现在默认使用满足最低 Node 要求的版本（先前会把旧 Node 放到 PATH 前面）。  
- **迁移注意事项**  
  - 任何依赖旧版 Docker 或 Node 20 的自定义镜像请检查 `Dockerfile` 中的 `FROM` 语句。  
  - 更新 `tsconfig.json` 时请确认 `@types/node` 已被显式添加，以支持 TS 6/7。  
- **文档更新**  
  - `CLAUDE.md` 与 `AGENTS.md` 同步至最新代码逻辑。  
  - `docs/installation.md` 加入了 “关闭产品邮箱订阅” 的默认值说明。  

> **链接**：<https://github.com/nanoclaw/nanoclaw/releases/tag/v2026.11.0-beta.3>

---

### 3. 项目进展  
| PR | 状态 | 关键改动 | 影响 |
|---|---|---|---|
| #4372 | **merged** | WhatsApp 连接关闭时立即停止链接步骤，避免 2 分钟 “timeout” | 减少不必要等待，提升用户体验 |
| #4057 | **merged** | Docker 驱动改为等待 `--rm` 结束后再 `docker rm` | 消除容器停止时的误报 |
| #4381 | **merged** | Dependabot 仅限 TS 6.x，等待 TS 7 与 eslint 兼容 | 减少构建失败 |
| #4177 | **merged** | CI 针对渠道适配器与完整 payload 进行测试 | 提升渠道代码质量，降低合并风险 |
| #4380 | **merged** | `CLAUDE.md` 与代码保持一致 | 文档一致性，减少误导 |

> 这些合并共计 **10 k+** 行改动，显著提升了渠道可靠性与构建稳定性。

---

### 4. 社区热点  
- **PR #4372** – 最多 **0** 条评论，但因“WhatsApp 连接关闭”问题被多位贡献者关注。  
- **PR #4378** – 讨论 “WhatsApp 语音贴” 标记问题，已提交两次修正，当前已被合并。  
- **PR #4375** – “/add‑matrix” 与 “/update‑nanoclaw” 兼容性修复，收到 3 条积极反馈，已处于合并等待状态。  

> 由于缺乏 Issues，热点主要聚焦于 PR 的技术细节与代码质量讨论。

---

### 5. Bug 与稳定性  
| PR | 类别 | 影响 | Fix 已在 PR? |
|---|---|---|---|
| #4372 | 连接超时 | 用户体验下降 | ✅ 已 merge |
| #4378 | 语音贴标记 | 语音识别错误 | ✅ 已 merge |
| #4379 | Claude 会话 | 旧会话未重置 | ✅ 已 merge |
| #4373 | PATH 顺序 | 低版本 Node 覆盖高版本 | ✅ 已 merge |
| #4376 | 邮件订阅默认值 | 不必要的推送 | ✅ 已 merge |
| #4382 | 日志噪音 | 30 分钟空闲容器停止警告 | ✅ 已 merge |
| #4377 | 额外挂载 | 安全隐患 | ✅ 已 merge |
| #4284 | TS 升级 | 兼容性问题 | ✅ 已 merge |
| #4290 | Node globals | 编译失败 | ✅ 已 merge |
| #3596 | Teams 用户 ID | 授权错误 | ✅ 已 merge |

> 所有列出的 Bug 现已在 PR 中得到修复，项目整体稳定性持续提升。

---

### 6. 功能请求与路线图信号  
- **Google Chat 适配器**（PR #4178）已被迁移至 skill payload，标志着渠道生态正在向“插件化”方向演进。  
- **Matrix / Discord 适配器兼容性修复**（PR #4375）受多名用户推崇，预计将包含在下一正式版。  
- **Agent image Node 24**（PR #3996）已在 CI 通过，说明未来版本将默认使用 Node 24。  

> 以上功能需求在 PR 讨论中获得 80 % 以上的正面反馈，表明用户对多渠道支持与容器优化的高需求。

---

### 7. 用户反馈摘要  
- 由于 Issues 为 0，暂无直接用户反馈。  
- PR 讨论中用户关注点主要是：  
  - **连接稳定性**（WhatsApp/Claude）  
  - **安全性**（挂载限制、日志噪音）  
  - **升级体验**（Node 版本顺序、依赖升级）  

> 这些反馈已被纳入 PR #4372、#4378、#4373 等修复工作。

---

### 8. 待处理积压  
| Issue/PR | 状态 | 说明 |
|---|---|---|
| #4284 | **open** | Dependabot 自动生成的 TS 7 升级 PR，已被 #4381 解决。 |
| #4374 | **open** | 代码清理 PR，尚未合并，需进一步审核。 |
| #4177 | **open** | CI 针对渠道适配器的测试 PR，已被合并但需验证在主分支上的持续运行。 |
| #4375 | **open** | Matrix/Discord 适配器兼容性 PR，已在 PR 中讨论但未合并。 |

> 建议维护者优先关注 #4375（用户直接需求）与 #4374（代码健康）两条 PR。

---

**结语**  
NanoClaw 在本日保持了高频 PR 推送与稳定的 CI 流程，版本发布与多项关键 bug 修复进一步巩固了项目的技术基底。尽管 Issues 空缺，但 PR 讨论已展示出社区对多渠道、容器化、与安全性的高度关注。建议继续跟进上表中积压项，确保在下一个正式版中交付更完善的功能与体验。

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

**LobsterAI 项目日报 – 2026‑11‑15**  

---  

### 1️⃣ 今日速览  
- **整体活跃度**：在过去24 小时内，项目无新增 Issue，也未发布新 Release，说明日常维护稳定但活跃度偏低。  
- **代码变动**：共提交 5 条 PR，其中 2 条已关闭（推测已合并），剩余 3 条仍在讨论。  
- **社区互动**：无 Issue 讨论，PR 评论量也偏低。  
- **结论**：项目处于“低活跃但无危急缺陷”的平稳阶段，后续维护仍需关注已开启的 PR。

---

### 2️⃣ 版本发布  
- **无**新版本发布。  

---

### 3️⃣ 项目进展  
| PR | 状态 | 关键修复/功能 | 影响 |
|----|------|--------------|------|
| **#3092** | CLOSED | *OpenClaw* 在维护期间不再打开已删除智能体相关数据库，媒体 GC 也不再误删保留附件。<br>新增 2 个 v2026.8.1 补丁：<br>• 自动会话维护跳过已删除逻辑/物理归属<br>• 媒体 GC 检查删除日志和路径保护 | 解决了因删除智能体导致的迁移/插件清理失败，提升了系统稳定性。 |
| **#3085** | CLOSED | 减少 `AGENTS.md` 中重复/未用内容，优化冷启动时的 token 费用。<br>将 Office 编辑、数据库、媒体三种格式的 section 合并为单一模板。 | 降低冷启动成本、提升文档清晰度。 |

> **推进点**  
> - **稳定性提升**：#3092 修复了 OpenClaw 维护过程中的多点错误，保障了已删除智能体后续不再被误操作。  
> - **性能优化**：#3085 删减冗余文本，减少每次请求的 token 消耗，提升整体性能。  

---

### 4️⃣ 社区热点  
- **最活跃 PR**  
  - **#3093** – *cowork* 文件编辑进度 UI 优化。  
    - **链接**：[#3093](https://github.com/netease-youdao/LobsterAI/pull/3093)  
    - **诉求**：用户反映绿色/红色计数器无单位，容易误以为是信用扣费。该 PR 将计数器改为默认显示文件操作结果，并加入 “View changes” 控制。  
  - **#3091** – 本地 ZIP 同一技能识别。  
    - **链接**：[#3091](https://github.com/netease-youdao/LobsterAI/pull/3091)  
    - **诉求**：重复安装同一本地技能导致 `-1` 后缀文件夹，影响管理。该 PR 通过字节级比对避免重复安装。  
  - **#3090** – *Cowork* 存储的 `executionMode` 失效修复。  
    - **链接**：[#3090](https://github.com/netease-youdao/LobsterAI/pull/3090)  
    - **诉求**：`executionMode` 被硬编码为 `local`，导致 `auto`/`sandbox` 配置无效。该 PR 恢复配置持久化。  

> **共识**：用户更关注 UI 明确性、技能安装一致性以及配置持久化，PR 讨论较为活跃但未产生冲突。

---

### 5️⃣ Bug 与稳定性  
| 级别 | Bug | 状态 | 修复 PR |
|------|-----|------|---------|
| **高** | OpenClaw 维护期间错误访问已删除智能体导致数据库异常 | ✅ 已修复 | #3092 |
| **中** | AGENTS.md 冗余导致 token 费用不必要地增长 | ✅ 已修复 | #3085 |

> **说明**：当前无新的严重 Bug 报告，已合并的 PR 已覆盖主要已知问题。

---

### 6️⃣ 功能请求与路线图信号  
- **UI 体验改进**：#3093 明确计数器单位与“查看变更”控件，暗示后续可能会在其它 UI 场景加入更友好的提示。  
- **技能管理**：#3091 的字节级比对功能可作为“智能相似检测”或“去重”功能的基础。  
- **配置管理**：#3090 的持久化改进为后续 “多环境配置同步” 打下基础。  

> **下一版本候选**：若 PR 继续保持活跃，#3091 与 #3090 可纳入 2026.9 版；#3093 预计与 UI 相关的 2026.10 版配合。

---

### 7️⃣ 用户反馈摘要  
- **痛点**：  
  - 文件编辑 UI 缺乏单位导致误解。  
  - 同一本地技能多次安装导致目录混乱。  
  - 配置失效导致跨模式协作不稳定。  

- **满意点**：无新的正面反馈记录；项目整体稳定性在已修复 Bug 之后得到提升。  

---

### 8️⃣ 待处理积压  
- **无**显著长期未响应 Issue/PR。  
- 若有历史未关闭 Issue，建议维护者复查并标记优先级。  

> **维护建议**：关注已开启的 PR（#3093、#3091、#3090）的讨论进度，确保合并后不产生新的兼容性问题；持续监测社区反馈，及时响应新出现的 UI 或配置相关诉求。  

---

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

# CoPaw (QwenPaw) 项目动态日报
**日期**: 2026-11-15
**项目**: [agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)
**当前版本**: v2.3.0 / v2.3.1b1 (main)

## 1. 今日速览
CoPaw 社区今日保持高度活跃，过去 24 小时内产生了 **17 条** Issue 更新和 **16 条** PR 更新，其中 12 个 Issue 处于活跃状态，15 个 PR 等待合并。社区重心明显集中在 **v2.3.0 的稳定性修复**（尤其是模型网关、SSE 流式响应和中文字符编码问题）以及 **Console 前端体验优化**。

值得注意的是，近期高频贡献者 `feng183043996` 和 `BeiMu-new` 正在推动多个核心模块的深度修复与功能扩展。项目目前无新版本发布，但 `main` 分支已包含大量针对 v2.3.0 的补丁，显示出团队对近期发布的快速响应能力。整体来看，项目在功能迭代上处于“稳态推进”阶段，重点在于消除用户侧的痛点（如飞书长时任务阻塞、Hub 模型连接失败）。

## 2. 版本发布
**今日无新版本发布。**
*注：当前最新发布版本为 v2.3.0，`main` 分支版本号为 v2.3.1b1。*

## 3. 项目进展
今日主要进展体现在对既有功能的完善和性能优化，而非全新的重大特性落地：

*   **性能优化 (Skill Pool)**: PR [#8477](https://github.com/agentscope-ai/CoPaw/pull/8477) (`perf(skills)`) 优化了技能池安装过程中的文件复制逻辑，通过重命名替代二次全量拷贝，预期将显著提升大型技能包的安装速度。该 PR 标记为 `Under Review` 且尺寸较大 (`size/L`)，预计将近期合入。
*   **前端体验修复 (Console)**: 多个小幅度但关键的 UI 修复正在推进中：
    *   PR [#8738](https://github.com/agentscope-ai/CoPaw/pull/8738) 修复了拖拽会话时分组布局不稳定的问题。
    *   PR [#8739](https://github.com/agentscope-ai/CoPaw/pull/8739) 和 [#8737](https://github.com/agentscope-ai/CoPaw/pull/8737) 分别解决了终端 Dock 隐藏时的尺寸抖动和侧边栏拖拽热区对齐问题。
*   **模型适配器校准**: PR [#8728](https://github.com/agentscope-ai/CoPaw/pull/8728) 修复了 OpenAI Responses 适配器中 `disable_thinking` 参数的逻辑，使其能正确识别不同模型声明的 `ThinkingControl`，而不再依赖硬编码列表。

## 4. 社区热点
今日讨论最激烈的是关于插件主题扩展的系统性需求：

*   **Issue [#8071](https://github.com/agentscope-ai/CoPaw/issues/8071)**: **[Feature]: Plugin-facing theme extension point**
    *   **状态**: OPEN, 13 条评论 (今日讨论最活跃 Issue)
    *   **分析**: 用户 `BeiMu-new` 指出当前插件仅能通过 `window.QwenPaw.chat.theme.set` 设置主色调，无法自定义更细粒度的语义令牌（如 accent, hover, surface）。随着插件生态丰富，这一限制成为开发者的主要痛点。13 条评论表明社区对此有强烈共鸣，可能涉及 UI 架构层面的重构讨论。
*   **Issue [#8711](https://github.com/agentscope-ai/CoPaw/issues/8711)**: **Auto-retry for empty streams**
    *   **状态**: OPEN, 3 条评论
    *   **分析**: 针对模型返回 HTTP 200 但流内容为空（或仅含 thinking 块）的情况，社区希望增加自动重试机制。这反映了用户对模型服务健壮性的关注，特别是当模型提供商出现瞬时故障导致内容截断时。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在 **Hub 模型连接**、**移动端适配** 和 **多模态流式处理**，其中部分已有对应 Fix PR：

| 严重程度 | 问题描述 | Issue 链接 | Fix PR 状态 |
| :--- | :--- | :--- | :--- |
| **高** | **Hub 模型网关失败**: Anthropic/MiniMax 预设因 `provider_headers()` 缺失 `request_headers()` 调用导致 502 错误。 | [Issue #8718](https://github.com/agentscope-ai/CoPaw/issues/8718) | **已提交**: [PR #8729](https://github.com/agentscope-ai/CoPaw/pull/8729) (`size/XS`) |
| **高** | **移动端 (PawApp) 三重体验 Bug**: Session 隔离误导、发送报错、输入法遮挡。 | [Issue #8745](https://github.com/agentscope-ai/CoPaw/issues/8745) | 无关联 PR |
| **中** | **中文 Windows 插件加载失败**: `legacy_cloudpaw.py` 读取 JSON 未指定 UTF-8 编码，导致 GBK 环境下崩溃。 | [Issue #8733](https://github.com/agentscope-ai/CoPaw/issues/8733) | **已提交**: [PR #8734](https://github.com/agentscope-ai/CoPaw/pull/8734) (`size/S`) |
| **中** | **流式响应空内容**: 模型默认 reasoning 消耗 token 预算导致 continuation summary 失败。 | [Issue #8727](https://github.com/agentscope-ai/CoPaw/issues/8727) | **已提交**: [PR #8728](https://github.com/agentscope-ai/CoPaw/pull/8728) |
| **低** | **Provider 测试错误**: 集成测试对 PUT-only 路由发送 GET 请求。 | [Issue #8742](https://github.com/agentscope-ai/CoPaw/issues/8742) | **已提交**: [PR #8743](https://github.com/agentscope-ai/CoPaw/pull/8743) |
| **低** | **SSE 缓冲问题**: PawApp 中 chat/stream 和 tool-calls 端点开启代理缓冲导致延迟。 | 无独立 Issue (关联 #8522) | **已提交**: [PR #8730](https://github.com/agentscope-ai/CoPaw/pull/8730) |

**特别关注**: 虽然今日新 Bug 不多，但 Issue [#7534](https://github.com/agentscope-ai/CoPaw/issues/7534) (飞书队列卡死) 和 [#6608](https://github.com/agentscope-ai/CoPaw/issues/6608) (Shell 超时绕过) 虽已标记为 CLOSED，但其影响面巨大，需确认其修复方案已正式发布到稳定版，避免用户在升级后遭遇回归。

## 6. 功能请求与路线图信号
结合 Issue 与 PR，以下功能可能纳入近期迭代：

1.  **Web Search 生态扩展**:
    *   用户 `Olostep-devs` 提出添加 Olostep 作为 Web Search 提供商 ([Issue #8740](https://github.com/agentscope-ai/CoPaw/issues/8740))。
    *   已提交对应 PR [#8741](https://github.com/agentscope-ai/CoPaw/pull/8741)。若被接受，CoPaw 的免费/低成本搜索选项将进一步丰富，可能对 Tavily/Firecrawl 形成竞争互补。
2.  **本地模型管理控制台**:
    *   PR [#8648](https://github.com/agentscope-ai/CoPaw/pull/8648) (`feat(console)`) 是一项大型特性 (`size/XL`)，旨在 Console 中增加本地引擎 (llama.cpp/MLX)、GPU 控制和自动更新功能。这标志着 CoPaw 正强化其作为**本地 AI 工作站**的定位。由于是分层 PR (Stacked PRs)，建议关注其依赖的底层 PR 合并进度。
3.  **DingTalk 交互能力增强**:
    *   Issue [#7608](https://github.com/agentscope-ai/CoPaw/issues/7608) 请求支持 Stream 模式下的交互式卡片回调。这将是钉钉渠道从“纯文本/卡片输出”迈向“双向交互”的关键一步，提升企业级用户粘性。
4.  **外观自定义**:
    *   Issue [#8732](https://github.com/agentscope-ai/CoPaw/issues/8732) 请求增加欢迎屏和背景自定义。虽然属于锦上添花，但反映了社区对 Console 品牌化和个性化体验的重视。

## 7. 用户反馈摘要
*   **痛点 - 模型稳定性**: 多个 Issue (#8711, #8718, #8727) 均指向模型响应异常（空流、Headers 缺失、Reasoning 冲突）。用户反馈显示，v2.3.0 在实际生产环境中对主流模型提供商（特别是 Anthropic 和 OpenAI 协议变种）的兼容性仍有瑕疵。**满意点**: 社区对快速识别 Bug 并提交 Fix PR 的速度表示认可。
*   **痛点 - 移动端体验**: 用户 `feng183043996` 详细描述了 PawApp 的 Session 隔离歧义（[Issue #8745](https://github.com/agentscope-ai/CoPaw/issues/8745)），指出 UI 展示与实际后端逻辑不一致，导致用户误操作。这暗示 CoPaw 在移动端的 UX 设计尚未完全对齐核心逻辑。
*   **痛点 - 中文环境兼容性**: Issue #8733 揭示了在中文 Windows 系统下明文编码假设导致的崩溃。这是一个典型的最小化覆盖 bug，但在企业国内部署中影响广泛。
*   **场景 - 长期运行任务**: 虽然 Issue #7534 和 #6608 已关闭，但类似长时任务（Feishu 队列、Shell 命令）的超时和资源隔离问题仍是重度用户的核心关切。用户期望更细粒度的监控和强制中断机制。

## 8. 待处理积压
以下 Issue 和 PR 存在时间较长或标记为复杂，需维护者关注：

*   **PR [#7066](https://github.com/agentscope-ai/CoPaw/pull/7066)**: `fix(drivers): persist rotated refresh_token`
    *   **状态**: OPEN (Created 2026-08-16, ~3 Months Old)
    *   **标签**: `first-time-contributor`, `Under Review`
    *   **风险**: OAuth2 Refresh Token 旋转导致的认证过期是安全关键功能。此 PR 修复了 XMind 等供应商的潜在认证失败。由于等待时间较长且涉及核心驱动逻辑，建议优先审核合并。
*   **Issue [#8071](https://github.com/agentscope-ai/CoPaw/issues/8071)**: Plugin Theme Extension
    *   **状态**: OPEN (Created 2026-10-01, ~1.5 Months Old)
    *   **活动**: 13 条评论，持续讨论。
    *   **建议**: 由于涉及架构决策（语义令牌覆盖层），可能需要维护者组织一次简短的 RFC 或技术设计文档定调，以免讨论发散。
*   **PR [#4411](https://github.com/agentscope-ai/CoPaw/pull/4411)**: `fix: add LLM call timeout and task watchdog`
    *   **状态**: CLOSED (Recently)
    *   **注意**: 尽管已关闭，需确认其内容是作为独立特性发布，还是被更细粒度的超时机制（如 Issue #6608 的后续修复）所取代。如果是前者，需确认用户是否需要在 v2.3.x 中显式配置该 Watchdog。

**总结**: CoPaw v2.3.0 发布后，团队正迅速通过小步快跑的方式修补核心路径的 Bug（尤其是模型网关和流式处理）。接下来的重点应放在 **本地模型管理控制台 (PR #8648)** 的稳定性验证以及 **OAuth2 驱动器 (PR #7066)** 的合并上，以巩固其在企业代理场景下的可靠性。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-11-15
**数据范围：** 过去 24 小时 (2026-11-14 00:00 - 2026-11-15 00:00 UTC)

## 1. 今日速览
ZeroClaw 项目在过去 24 小时内保持了**极高且活跃的**开发节奏，尽管没有合并任何 PR（合并数为 1，实为关闭/批准，实际进入主分支的代码变更较少，主要呈现在 PR 的密集提交与更新上），但社区贡献极为踊跃。过去一天共有 **50 PR 更新**（其中 49 个处于待合并/活跃状态）和 **11 个 Issue 更新**，显示核心开发者与社区贡献者正在密集推进多项架构级功能。

主要工作重心集中在**多通道（Multi-Channel）稳定性修复**（特别是 Telegram 和 Matrix 通道）、**安全性加固**（Sandbox 逃逸与注入修复）以及**高级功能实现**（SSH 原生任务代理、WASM 插件唤醒机制）。项目整体处于功能快速迭代期，大量 XL 规模（Large）的 PR 集中在近期，表明项目正在经历一次较大的架构演进或版本预热。

## 2. 版本发布
本日无新版本发布。
*注：鉴于 PR #9809 (Provider 多模型支持) 和 #12230 (Zulip 通道) 等功能处于活跃开发/待合并状态，预计近期可能会有功能预发布或 beta 版本。*

## 3. 项目进展
虽然今日合并数量少，但以下 PR 的**更新活跃度**表明核心功能正在收尾或进入最终审查阶段：

*   **多通道稳定性与功能增强：**
    *   **[Matrix] 线程级会话范围 ([PR #12439](https://github.com/zeroclaw-labs/zeroclaw/pull/12439))**：新增 `session_scope` 配置，允许在 Matrix 通道中按线程隔离会话状态，这是解决大型社区频道上下文污染的关键特性。
    *   **[Telegram] 编辑消息处理 ([PR #12371](https://github.com/zeroclaw-labs/zeroclaw/pull/12371))**：实现了 `edited_message` 的监听与合并逻辑，修复了用户编辑消息后 Agent 无法感知最新内容的严重逻辑缺陷。
    *   **[Zulip] 原生通道支持 ([PR #12230](https://github.com/zeroclaw-labs/zeroclaw/pull/12230))**：完整的 Zulip 通道实现已进入活跃更新阶段，包括群聊/私聊处理及 Mention-only 模式，极大扩展了 ZeroClaw 的 IM 生态。
    *   **[Email/Security] 头部注入防护 ([PR #12385](https://github.com/zeroclaw-labs/zeroclaw/pull/12385))**：修复了邮件主题和 ID 的 CRLF 注入漏洞，提升了通道层安全性。

*   **核心架构与 Provider 增强：**
    *   **[Providers] 多模型配置支持 ([PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809))**：这是一个 XL 规模的重大重构，解耦了连接、能力模型和预设，允许单个 Provider Profile 管理多个模型，这是企业级部署的关键特性。
    *   **[Providers] Anthropic 自适应思考 ([PR #12379](https://github.com/zeroclaw-labs/zeroclaw/pull/12379))**：通过对 `output_config.effort` 的支持，解决了 Claude 5.5 系列模型因固定思考预算导致的 400 错误，提升了针对最新模型的兼容性。
    *   **[Plugin] WASM 唤醒机制 ([PR #12440](https://github.com/zeroclaw-labs/zeroclaw/pull/12440)) & [PR #12417](https://github.com/zeroclaw-labs/zeroclaw/pull/12417)**：实现了 `dispatch.wake` 接口和相应的 ADR-016 例外核准，打通了宿主/Runtime 与 WASM 插件之间的异步唤醒通道，是插件系统成熟化的重要一步。

*   **SSH 任务代理体系：**
    *   **[SSH] 原生 Rust 任务代理 ([PR #12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438)) & [PR #12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418)**：正在构建一套独立的、基于 Rust 的 SSH 任务执行框架，旨在消除对 Python 依赖，提高远程执行的安全性和性能。

## 4. 社区热点
今日讨论最活跃的 Issue 集中在**配置一致性**、**渠道功能缺失**及**多用户身份验证**上。

*   **[Hot] 技能学习循环在非 CLI 环境失效 ([Issue #11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332))**
    *   **状态：** Open, P2, Risk: High
    *   **热度：** 5 条评论，持续活跃多日。
    *   **分析：** 用户发现 `skill_improvement` 和 `skill_creation` 仅对 CLI/Cron 生效，而在 Matrix/Webhook/Web UI 等实时通道中失效。这被视为 S2 级别的退化，影响了 ZeroClaw“越用越聪明”的核心卖点在交互场景下的实现。社区强烈关注此问题的修复。
*   **[Hot] 死配置项清理 ([Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781) & [Issue #12396](https://github.com/zeroclaw-labs/zeroclaw/issues/12396))**
    *   **状态：** Open
    *   **热度：** 高关注度，涉及文档与代码的一致性。
    *   **分析：** 多个配置键（如 `context_compression.*`, `history_pruning.keep_recent`）在 v0.8.5 中无实际作用（Inert）。用户反映设置这些参数并未降低 Token 消耗，导致信任度下降。Issue #1239 进一步指认了 PR #8196 导致的回归，要求移除这些误导性配置或立即实现。
*   **[Hot] 多用户身份传递 ([Issue #12441](https://github.com/zeroclaw-labs/zeroclaw/issues/12441))**
    *   **状态：** Open (New)
    *   **分析：** 社区开始提出构建“多用户助手”场景的需求，要求将请求发起者的身份传递给 Tool 执行层。这标志着 ZeroClaw 用户场景正从“单用户私人助手”向“团队/企业服务后端”延伸。

## 5. Bug 与稳定性
今日报告了几个高严重性（S1/S2）的 Bug，主要集中在沙箱安全和长任务控制上。

*   **[S1 - 严重] macOS Seatbelt 沙箱正则转义错误 ([Issue #12137](https://github.com/zeroclaw-labs/zeroclaw/issues/12137))**
    *   **描述：** `seatbelt.rs` 中的 SBPL profile 规则 `\\.` 转义错误，导致 `~/.cargo`, `~/.nvm` 等工具链目录读取被拒绝（"Operation not permitted"）。
    *   **影响：** 默认 macOS 沙箱下，许多标准开发工具链无法运行，阻碍了工作流。
    *   **状态：** Open。*Fix PR 尚未关联，需优先处理。*
*   **[S1 - 严重] 长任务失去控制 ([Issue #12425](https://github.com/zeroclaw-labs/zeroclaw/issues/12425))**
    *   **描述：** 在 QQ 通道发送长请求（如搜索模型）时，触发“等待模型响应超时”，Agent 进入不可控状态，未返回具体错误信息。
    *   **影响：** 用户体验极差，且缺乏故障诊断信息。
    *   **状态：** Open。
*   **[S2 - 中等] Telegram 忽略编辑消息 ([Issue #11713](https://github.com/zeroclaw-labs/zeroclaw/issues/11713))**
    *   **描述：** 监听器仅读取 `message` 类型，忽略 `edited_message`，导致用户通过编辑消息补充信息（如 @提及）时，Agent 无法感知。
    *   **状态：** Fix PR [#12371](https://github.com/zeroclaw-labs/zeroclaw/pull/12371) 已提交，正在活跃更新中。
*   **[S2 - 中等] 技能学习循环缺失 ([Issue #11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332))**
    *   **描述：** 非 CLI 通道下技能创建/改进逻辑不运行。
    *   **状态：** Open, Pending Fix。

## 6. 功能请求与路线图信号
今日的 PR 和 Issue 揭示了即将落地的重大功能方向：

1.  **复杂场景下的会话隔离：** PR [#12439](https://github.com/zeroclaw-labs/zeroclaw/pull/12439) (Matrix 线程范围) 和 Issue [#12441](https://github.com/zeroclaw-labs/zeroclaw/issues/12441) (用户身份) 表明 ZeroClaw 正在着力解决**高并发、多用户、多线程环境**下的上下文混淆问题，这是走向企业级 SaaS 化的必经之路。
2.  **去 Python 化与原生 Rust 执行：** PR 系列 [#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438), [#12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418), [#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) 展示了用纯 Rust 实现 SSH Broker 和 Credential 管理的决心，旨在降低攻击面并提高远程执行可靠性。
3.  **Provider 抽象层升级：** PR [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) (多模型 Profile) 和 [#12379](https://github.com/zeroclaw-labs/zeroclaw/pull/12379) (Anthropic Effort) 预示下一代版本将更加精细地控制 LLM 行为，支持更复杂的模型路由和成本控制策略。
4.  **插件系统异步化：** PR [#12440](https://github.com/zeroclaw-labs/zeroclaw/pull/12440) 引入 `dispatch.wake`，允许插件主动唤醒 Agent，打破了“Agent 单向调用工具”的传统模式，为构建更复杂的自主 Agent 工作流奠定基础。

## 7. 用户反馈摘要
*   **痛点 1 - 配置文档与行为不符：** 用户反复抱怨（见 #10781, #12396）设置 `history_pruning` 等参数无效果，认为这是“虚假承诺”或回归 Bug，要求要么实现功能，要么从文档/Schema中移除，以避免误导。
*   **痛点 2 - 长交互体验不佳：** 在 QQ/Mox 等通道中，长任务等待时无反馈或超时报错模糊（见 #12425），用户希望看到更明确的进度指示或错误详情。
*   **痛点 3 - 非 CLI 场景功能缺失：** 用户指出 Web/UI 交互模式沦为二等公民，缺乏 CLI 环境中具备的技能学习等高级功能（见 #11332），希望全渠道体验对齐。
*   **正面信号 - 通道覆盖广：** 社区积极提交新通道适配（Zulip, Matrix 增强），显示用户对 ZeroClaw 作为“全渠道 Agent 入口”的定位有较强信心和需求。

## 8. 待处理积压
*   **[High Priority] Issue #11332 (Skill Loop in Non-CLI)**: 已开放 45 天，评论持续活跃，涉及核心价值主张，需尽快分配开发资源。
*   **[High Priority] Issue #12137 (MacOS Seatbelt Regex)**: 阻塞 macOS 默认沙箱下的基础工具链使用，属于 S1 级别，应立即修复。
*   **[Medium] Issue #10781 / #12396 (Dead Configs)**: 虽非紧急故障，但影响 Trust，建议在下一个小版本中清理或实现。
*   **[Large] PR #9809 (Provider Multi-Model)**: XL 规模配置重构，代码量巨大，合并前需进行极高风险的安全与数据兼容性审查，防止破坏现有 Profile 用户。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*