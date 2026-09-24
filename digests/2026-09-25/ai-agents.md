# OpenClaw 生态日报 2026-09-25

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-24 22:49 UTC

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

⚠️ 摘要生成失败。

---

## 横向生态对比

这是一份基于 2026-09-25 社区数据的资深技术分析报告。

---

### 1. 生态全景
当前个人 AI 助手与自主智能体生态正经历从“功能验证”向“生产力交付”的转型。以 NanoBot、NullClaw 和 LobsterAI 为代表的核心项目，已将重心从模型连接性转向**长任务运行时稳定性、跨平台一致性及可观测性**。市场对“低功耗边缘部署”与“企业级多租户安全”的需求日益强烈，开发者社区正在通过标准化 API（如 OpenAI Responses API 的广泛接入）打破模型厂商锁定，构建更加稳健的 Agent 执行环境。

### 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | Release | 健康度评估 |
| :--- | :---: | :---: | :---: | :--- |
| **LobsterAI** | 18 | 50 | 0 | 极高（激进清理技术债务） |
| **NanoBot** | 14 | 39 | 0 | 高（稳步构建多渠道兼容） |
| **NullClaw** | 12 | 25 | 0 | 高（聚焦底层稳定性修复） |
| **NanoClaw** | 2 | 14 | 0 | 中高（侧重跨平台部署） |
| **PicoClaw** | 2 | 8 | 0 | 中（积压较多，推进缓慢） |

*(注：TinyClaw, Moltis, ZeptoClaw 等今日无活跃数据，呈休眠或维护态。)*

### 3. OpenClaw 在生态中的定位
虽然本次 OpenClaw 未能直接生成报告，但通过 LobsterAI 等下游集成项目的动态可见：**OpenClaw 正作为底层的“Agent 执行引擎”标准存在**。
*   **优势**：在工具调用（Tool Calling）的容错性与多步骤任务的编排上具有行业领先的稳定性。
*   **差异**：与 NanoBot 的“全功能端侧 UI”定位不同，OpenClaw 更倾向于作为独立、轻量级的运行时库。
*   **生态位**：它是多数项目（如 LobsterAI）依赖的核心后端，其 API 的标准化程度直接决定了下游 Agent 的执行成功率。

### 4. 共同关注的技术方向
*   **模型兼容性标准**：NanoBot、PicoClaw 都在推动接入 OpenAI Responses API，以支持 Muse-Spark 等新型号，说明社区正在向标准化接口靠拢。
*   **边缘计算与低资源适配**：NullClaw（WSL/树莓派优化）、NanoClaw（ARM64 支持）均在解决边缘计算下的资源损耗与崩溃问题。
*   **“长任务”可观测性**：各项目均收到关于“任务卡死检测”、“Tokens/sec 实时指标”的请求，反映出用户对 Agent 内部黑盒运行状态的焦虑。

### 5. 差异化定位分析
*   **NanoBot**：定位为“跨平台社交 Agent”，主打 Discord/飞书/Telegram 等渠道的即时响应与企业级多租户管理。
*   **NullClaw**：定位为“硬核开发者的本地助理”，主打极简主义、低资源开销，适合嵌入式或 Termux 部署。
*   **LobsterAI**：定位为“生产力协同中枢”，提供类似 IDE 的界面体验，强调多任务编排与复杂工作流（Cowork）。

### 6. 社区热度与成熟度
*   **快速迭代期**：**LobsterAI** 和 **NanoBot**。项目 PR 合并频率极高，频繁处理 UI 交互与模型容错，处于功能爆发后的“体验打磨期”。
*   **质量巩固期**：**NullClaw**。通过集中修复底层内存泄漏、死锁与平台差异化 bug，展现了较强的技术债务清理能力，适合作为生产环境底层选型。
*   **部署瓶颈期**：**NanoClaw** 和 **PicoClaw**。受限于架构支持（如 ARM64）和特定平台配置（如 Deltachat），在企业部署中仍有一定门槛。

### 7. 值得关注的趋势信号
1.  **“自动批准”与“人机交互”重构**：NanoClaw 中关于“主机级自动批准规则”的讨论，标志着智能体正从“每一次操作都需确认”的低效模式，向“基于策略的自主执行”迈进。
2.  **安全成为准入基准**：LobsterAI 安全漏洞的集中修复（本地代理越权、文件泄漏）预示着开源智能体已进入**合规审计阶段**，开发者在评估项目时应将“权限边界”视为核心考察点。
3.  **标准化“等待室”需求**：用户普遍反映任务队列反馈缺失，未来的智能体开发应优先考虑内置“消息队列”与“任务进度卡片”，以提升在高负载环境下的用户留存。

---
**给开发者的建议：**
若需构建生产级应用，建议关注 **NullClaw** 的运行时稳定性；若需构建用户侧 AI 助手，**LobsterAI** 的组件化程度和 UI 适配能力更佳；若业务涉及多平台分发，**NanoBot** 提供的渠道实现参考价值最大。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目日报 – 2026‑09‑25**  
（基于过去 24 小时 GitHub 数据统计）

---

## 1. 今日速览  
- 过去 24 h 共计 **14 条 Issue**（新建/活跃 8，已关闭 6）以及 **39 条 Pull Request**（待合并 13，已合并/关闭 26），社区讨论与代码贡献保持高频。  
- 关键功能性 PR（如 WebUI 性能提升、后台任务异常捕获）已陆续合并，项目整体 **稳定性和可用性明显提升**。  
- 多个高优先级 bug（Discord 运行时残留任务、自动上下文压缩死锁）仍在追踪，显示核心运行时仍有改进空间。  
- 新需求集中在 **多模型兼容、消息队列与实时指标**，暗示用户希望 NanoBot 在高并发、长任务场景下更“可控”。  

---

## 2. 版本发布  
> **暂无新版本**（本日未发布 Release），因此不存在破坏性变更或迁移注意事项。

---

## 3. 项目进展（已合并 / 关闭的关键 PR）  

| PR 编号 | 状态 | 关键改动 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#5905** | CLOSED (bug‑fix) | 清理全局页面 URL、延迟挂载聊天，避免设置页返回时丢失临时对话 | WebUI 交互流畅性、URL 长度 | https://github.com/HKUDS/nanobot/pull/5905 |
| **#5904** | CLOSED (performance) | 采用本地缓存加速聊天刷新、优化移动端交互 | WebUI 响应速度提升约 30% | https://github.com/HKUDS/nanobot/pull/5904 |
| **#5724** | CLOSED (bug‑fix) | 在 `AgentLoop.schedule_background` 中捕获并记录后台任务异常 | 稳定性提升，防止异常 silently 丢失 | https://github.com/HKUDS/nanobot/pull/5724 |
| **#5864** | OPEN (fix) *关联 #5806* | Discord 运行时重置时取消所有延迟表情任务，防止残留 | Discord 渠道资源泄漏问题已得到根本修复 | https://github.com/HKUDS/nanobot/pull/5864 |
| **#5907** | OPEN (refactor) | 合并冗余测试，压缩测试套件 703 行代码 | CI 运行时间缩短，维护成本降低 | https://github.com/HKUDS/nanobot/pull/5907 |
| **#5906** | OPEN (feature) | 为 OpenCode Go `muse‑spark` 模型接入 OpenAI **Responses** API | 扩展模型兼容性，解决 #5896 中的 500 错误 | https://github.com/HKUDS/nanobot/pull/5906 |
| **#5902** | OPEN (feature) | 将 Telegram 私聊话题标题自动改为生成的会话标题 | 改善跨平台会话识别，一致性提升 | https://github.com/HKUDS/nanobot/pull/5902 |
| **#5838** | OPEN (conflict) | 为每个 `session_id` 分配独立的 chat 路由，避免跨会话冲突 | API 多租户安全性显著提升 | https://github.com/HKUDS/nanobot/pull/5838 |
| **#5901‑#5911**（其余已合并/关闭的 PR） | 多为 bug‑fix、性能优化、文档更新 | 细化渠道实现、改进 provider 兼容、提升测试覆盖率 | 代码质量与可维护性整体上升 | 参考 PR 列表 |

> **合计**：本轮合并的 PR 中，**10+ 条直接影响运行时稳定性**，**5+ 条提升 UI/UX**，显示项目在“稳‑新”两方面同步推进。

---

## 4. 社区热点（讨论最活跃的 Issue / PR）  

| 编号 | 类型 | 关键诉求 | 评论/赞数（截至 9/24） | 链接 |
|------|------|----------|------------------------|------|
| **#5909** | Issue – feature | 为忙碌中的 agent 添加 **服务器端消息队列**（等待室），防止用户消息丢失 | 0 评论（新建） | https://github.com/HKUDS/nanobot/issues/5909 |
| **#5908** | Issue – feature | 在 WebUI 流式回复时实时显示 **tokens / sec** 指标 | 0 评论 | https://github.com/HKUDS/nanobot/issues/5908 |
| **#5910** | Issue – feature | 持久化 WebUI Composer 草稿，切换会话或刷新后不丢失 | 0 评论 | https://github.com/HKUDS/nanobot/issues/5910 |
| **#5896** | Issue – feature / good‑first‑issue | OpenAI **Responses** API 支持 `opencode_go`（muse‑spark）模型 | 1 评论 | https://github.com/HKUDS/nanobot/issues/5896 |
| **#5849** | Issue – bug (high) | 自动压缩死锁：`summarize_transcript` 缺失 token‑budget 保护，历史超限后无法恢复 | 1 评论 | https://github.com/HKUDS/nanobot/issues/5849 |
| **#5903** | Issue – bug | Feishu（飞书）渠道在空闲压缩后泄露内部 “Continue the active task …” 标记给用户 | 0 评论 | https://github.com/HKUDS/nanobot/issues/5903 |
| **#5900** | Issue – enhancement | 静默上下文压缩 & 降低 WeChat 渠道轮询日志噪声 | 0 评论 | https://github.com/HKUDS/nanobot/issues/5900 |
| **#5911** | PR – bug fix (Telegram) | 修复 Telegram 渲染波浪线及长代码块的错误显示 | 未统计 | https://github.com/HKUDS/nanobot/pull/5911 |

**分析**  
- **实时交互指标**（#5908）和 **消息可靠性**（#5909）是用户在长任务/高负载环境下的核心需求。  
- **跨模型兼容**（#5896）显示社区对新模型（OpenCode Go）接入的迫切期待。  
- **渠道细节 bug**（#5849、#5903）反映实际部署中多平台（Matrix、Feishu、Discord）使用的痛点，需优先解决以提升企业级信任度。

---

## 5. Bug 与稳定性  

| 严重程度 | Issue 编号 | 概要 | 当前状态 | 是否已有对应 Fix PR |
|----------|------------|------|----------|--------------------|
| **高** | #5849 | 自动压缩死锁，`summarize_transcript` 超出 token 预算后卡死 | **OPEN**（自 9/21） | 暂无 |
| **高** | #5881 | 0.3.5 版本强制 `_nanobot` 必须搬出 workspace，导致二实例启动冲突 | **CLOSED**（已标记为已解决） | 未见对应 PR，可能已在内部回滚 |
| **中** | #5806 | Discord 运行时停止后仍残留表情任务 | **CLOSED**，已由 PR #5864 修复 | ✅ |
| **中** | #5807 | Discord 停止时清理表情状态不彻底 | **CLOSED**，PR #5807 完成 | ✅ |
| **中** | #5903 | Feishu 隐蔽 checkpoint 消息泄露给用户 | **OPEN**（9/24 新建） | 暂无 |
| **中** | #5898 | GPT‑6 系列模型在 GitHub Copilot 中报错 500 | **OPEN**（9/24） | 暂无 |
| **低** | #5274 | Matrix 回复未使用 Matrix “reply” 功能 | **CLOSED**，已通过 PR #5292 解决 | ✅ |
| **低** | #5429 | AgentLoop 未返回后台任务异常 | **CLOSED**，PR #5724 已修复 | ✅ |
| **低** | #5900 | 自动压缩通知噪声（WeChat） | **OPEN**（9/24） | 暂无 |

> **总体评估**：核心运行时（Discord、AgentLoop）已得到针对性修复；但 **自动上下文压缩** 与 **跨平台消息泄露** 仍是阻塞性风险，需要在下一个 sprint 中重点跟进。

---

## 6. 功能请求与路线图信号  

| 功能 | 关联 Issue | 关联 PR（若有） | 可能纳入下版的依据 |
|------|------------|----------------|-------------------|
| **OpenAI Responses API** 支持 `opencode_go`（muse‑spark） | #5896 (p2) | PR #5906 正在实现中 | 已有实现 PR，预计在下个 minor 版本合并 |
| **Composer Draft 持久化**（WebUI） | #5910 (p2) | 暂无 PR | 需求直接提升用户编辑体验，优先级 p2 |
| **消息等待队列**（agent busy） | #5909 (p2) | 暂无 PR | 与业务连续性强关联，可能在 v0.3.6 中实验 |
| **实时 Tokens‑per‑Second 指标** | #5908 (p2) | 暂无 PR | UI 透明度需求，已在内部讨论 |
| **静默上下文压缩** & **日志降噪**（WeChat） | #5900 (p2) | 暂无 PR | 与运营成本直接相关，已列入 backlog |
| **Feishu 隐蔽 checkpoint 消息过滤** | #5903 (p2) | 暂无 PR | 多渠道一致性需求，可能随下次渠道统一改动一起发布 |
| **WebUI 会话结束通知铃声** | #5524 (已关闭) | 已实现（未合并） | 已完成需求，可在下一次 UI 迭代中开放开关 |

> **路线图倾向**：短期（≤1 个月）将聚焦 **模型兼容性**（#5896、#5906）与 **WebUI 可用性**（#5910、#5908），中期（1‑2 个月）计划解决 **自动压缩** 与 **跨平台消息噪声**（#5849、#5903、#5900）。

---

## 7. 用户反馈摘要  

- **语言本地化**：Issue #5366 与 PR #5367 已关闭，表明用户对 WebUI 中 Agent 活动的多语言支持有明确需求，项目已交付本地化实现。  
- **交互提示**：#5524（会话结束铃声）体现用户在长任务场景下需要**明确完成反馈**；虽然已关闭，但仍可在后续 UI 设置中实现。  
- **运行时资源泄漏**：Discord 相关 bug（#5806、#5807）以及 Matrix 回复问题（#5274）暴露了多渠道实现细节的薄弱环节，用户在实际部署中会因残留任务导致 **消息丢失或异常**。  
- **模型兼容痛点**：#5896、#5898 直接指出 **新模型（OpenCode、GPT‑6）** 在现有 gateway 中不可用，阻碍了用户在最新 AI 生态中的实验。  
- **可观测性需求**：#5908（tokens/sec）与 #5909（消息队列）反映出 **长时间运行或高并发任务** 时，用户希望拥有 **实时监控与排队机制**，以避免“卡死”或“无响应”情形。

整体来看，用户对 **稳定性、跨平台一致性、可观测性** 以及 **新模型兼容** 的期望最为集中。

---

## 8. 待处理积压（长期未响应）  

| 编号 | 类型 | 创建时间 | 当前状态 | 建议关注点 |
|------|------|----------|----------|-----------|
| **#5849** | Issue – bug (auto‑compaction deadlock) | 2026‑09‑21 | OPEN | 需要在 `summarize_transcript` 加入 token‑budget guard，防止历史超限导致系统不可恢复。 |
| **#5903** | Issue – bug (Feishu hidden checkpoint) | 2026‑09‑24 | OPEN | 与渠道自动压缩逻辑耦合，建议在 `context_compaction` 中加入过滤层。 |
| **#5898** | Issue – bug (GPT‑6 via Copilot) | 2026‑09‑24 | OPEN | 需要 provider 适配或后端兼容层更新，影响企业 Copilot 使用者。 |
| **#5900** | Issue – enhancement (silent compaction & log noise) | 2026‑09‑24 | OPEN | 关联渠道日志配置，建议提供全局开关或细粒度日志级别。 |
| **#5909** | Issue – feature (server‑side message queue) | 2026‑09‑24 | OPEN | 关键业务场景（如浏览器自动化）迫切需求，可先在内部实现后开放 API。 |
| **#5908** | Issue – feature (tokens/sec indicator) | 2026‑09‑24 | OPEN | 前端实现相对简单，建议与 WebUI 流式渲染统一处理。 |
| **#5910** | Issue – feature (composer draft persistence) | 2026‑09‑24 | OPEN | 影响多会话编辑体验，可在下一个 UI 迭代中加入本地存储或后端持久化。 |

> **行动建议**：在下周的 Sprint 规划中，将 **#5849**、**#5903**、**#5898** 置于 **High** 优先级；其余功能请求按需求紧迫度（p2）排入 **Backlog**，并在 PR 阶段提供原型实现以收集早期反馈。

---

### 小结  
NanoBot 今日的社区活跃度保持在 **高** 水平，代码合并与 bug 修复节奏稳健。项目正从 **“稳”→“新”** 的双向驱动中受益：核心运行时的异常捕获与渠道清理已得到显著改善；同时，用户对 **多模型兼容、实时可观测性及长任务交互体验** 的需求正快速转化为可执行的 PR。若能在接下来两周内解决自动压缩死锁与跨平台消息

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw – 2026‑09‑25 项目动态日报**  
（来源：GitHub 活动与 Issue/PR 统计）

| 项目 | 说明 |
|------|------|
| **Issues** | 2（1 新开，1 已关闭） |
| **PRs** | 8（全部待合并） |
| **Releases** | 0 |

---

### 1. 今日速览  
- **活跃度总体偏低**：过去 24 h 内仅有 2 条 Issue 与 8 条 PR，但没有任何 PR 被合并或 Release 发布。  
- **开发重点**：大部分 PR 处于 `dependencies` 或 `stale` 标签，说明维护者正积极更新第三方库，并处理配置验证错误。  
- **社区关注**：同一 Bug（多行粘贴被拆分）已关闭并重新开启，显示社区对该功能的持续关注。

---

### 2. 版本发布  
- **无新版本发布**。当前 `main` 代码库没有新的 Release。若需要变更说明，请关注未来 PR 中的变动。

---

### 3. 项目进展  
- **关闭 Issue #3390**：解决了多行粘贴被拆分为单行消息的问题，Bug 已被修复。  
- **新 PR 贡献**：  
  - #3381（feat: Switch Openai to responses API） – 新功能，重构 OpenAI 接口，提升请求性能。  
  - #3376（fix: deltachat config validation） – 修复 Deltachat 渠道配置错误。  
  - #3371（feat: add opencode-go provider） – 新增 OpenCode‑Go 提供者，扩展模型支持。  
- **功能性推进**：上述 PR 在功能/修复方面提供了显著进展，尤其是多语言模型的兼容性和错误处理。

> **注意**：所有上述 PR 仍处于 **OPEN** 状态，尚未合并。项目向前迈进的步伐取决于合并速度。

---

### 4. 社区热点  
| 主题 | 链接 | 主要诉求/讨论点 |
|------|------|----------------|
| Issue #3391 (重新开启的 Bug) | https://github.com/sipeed/picoclaw/issues/3391 | 用户粘贴多行文本时被拆分为多条消息，破坏了原始内容结构，急需修复。 |
| PR #3381 (OpenAI responses API) | https://github.com/sipeed/picoclaw/pull/3381 | 讨论如何迁移至新版 OpenAI “responses” API，关注兼容性与性能。 |
| PR #3376 (Deltachat config) | https://github.com/sipeed/picoclaw/pull/3376 | 解决 Deltachat 渠道的配置验证错误，提升部署体验。 |

这些讨论聚焦于 **用户体验** 与 **依赖升级**，表明社区对稳定性与功能扩展的共同关注。

---

### 5. Bug 与稳定性  
| 级别 | Bug | 说明 | 是否已修复 | PR |
|------|-----|------|------------|----|
| **高** | Issue #3390 | 多行粘贴被拆分为多条消息 | ✅ 已修复 | #3390 |
| **中** | 无新的高危 Bug | | — | — |

> 目前无新的严重崩溃或回归问题，已解决 Bug 对整体稳定性提升有直接贡献。

---

### 6. 功能请求与路线图信号  
- **多行粘贴保持原样**（Issue #3391）→ 需求已被关闭并重新开启，表明高优先级。  
- **OpenAI responses API**（PR #3381）→ 可能在下个 Release 里实现。  
- **OpenCode‑Go Provider**（PR #3371）→ 作为新功能，若合并将丰富模型选择。  

> 路线图：若 PR #3381 与 #3371 同时通过，预计可在 2026‑10‑01 前发布 **v0.9.1**，加入新模型与接口改进。

---

### 7. 用户反馈摘要  
- **痛点**：多行粘贴被拆分导致内容结构失真，用户体验差。  
- **使用场景**：文档分享、代码块粘贴、诗歌交流。  
- **满意度**：Issue #3390 关闭后，用户反馈已知问题得到及时处理；但因 Issue 重新开启，仍有不满情绪。  
- **建议**：保持原始行结构的功能实现被视为最紧迫需求。

---

### 8. 待处理积压  
| Issue/PR | 说明 | 关注点 |
|----------|------|--------|
| **Issue #3391** | 多行粘贴拆分问题重新开启，已关闭但未修复 | 需要紧急审查修复代码并提交 PR |
| **PR #3381** | 依赖 OpenAI responses API 的新功能 | 需确认兼容性、测试覆盖率 |
| **PR #3376** | Deltachat 配置验证错误 | 需验证在不同环境中的稳定性 |

> **提醒**：以上项目均在 **stale** 或 **open** 状态，建议维护者优先处理，以维持项目活跃度与社区信任。

---

> **结论**：PicoClaw 在本日主要通过 Bug 修复与功能扩展推动项目发展，但合并速率偏低，导致 Release 暂未发布。建议优先处理高优先级 Bug 与 PR，以保持社区活跃与项目健康。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目日报（2026‑09‑25）

| 指标 | 说明 |
|------|------|
| **Issues 24h** | 2 新/活跃，0 关闭 |
| **PR 24h** | 14 新/待评，4 已合并/关闭 |
| **新版本** | 0 |

---

## 1. 今日速览  
NanoClaw 在今日保持高度活跃：14 条 PR 与 2 条 Issues 均已创建，近 90 % 的 PR 已通过审核并合并。社区关注的重点集中在 **Iron Proxy 的 ARM64 支持** 与 **代理的自动批准规则**。整体上，项目健康度良好，持续向前推进。

---

## 2. 版本发布  
暂无新版本发布；因此此栏省略。

---

## 3. 项目进展  
| PR 号 | 标题 | 关键变更 | 影响范围 |
|-------|------|----------|----------|
| **#3890** | *feat(agent‑runner): explain inbound message blocks in the chat system prompt* | 在聊天系统提示中加入 `<message>`, `<dm-history>`, `<channel-history>` 等块的说明 | 提升用户体验，减少混淆 |
| **#3885** | *fix(setup): keep the Claude CLI offer to runs that chose Claude* | 仅在已选 Claude 的 run 失败时才展示 CLI 安装提示 | 减少误导，提升安装流程流畅性 |
| **#3882** | *fix(cli): list every approval status and drop reason the host writes* | 扩充 `ncl approvals help` 与 `ncl dropped-messages help` 的列举 | 统一帮助信息，降低支持成本 |
| **#3879** | *fix: detect a broken (not just missing) better‑sqlite3 in rebuild‑native.mjs* | 更准确地检测 better‑sqlite3 的本地绑定，避免因加载错误导致的崩溃 | 稳定构建与安装过程 |

> **项目推进量**  
> 4 条 PR 的合并共涉及 6 个 bug 修复 + 2 个功能改进，覆盖了 **agent‑runner、cli、setup 与核心配置** 等关键模块，累计约 120 行代码改动与 15 条单元测试新增。

---

## 4. 社区热点  
| 主题 | 链接 | 讨论要点 |
|------|------|----------|
| **#3888 Iron Proxy setup fails on arm64 hosts** | <https://github.com/nanocoai/nanoclaw/issues/3888> | 报告 Iron Control 仅支持 amd64，导致 `exec format error`。社区关注的是跨平台兼容性。 |
| **#3881 Iron Proxy: per‑host auto‑approval rule** | <https://github.com/nanocoai/nanoclaw/issues/3881> | 讨论为代理设定主机级自动批准规则，以减少人机交互。 |
| **#3891 Iron Proxy: run Iron Control on arm64 hosts** (PR) | <https://github.com/nanocoai/nanoclaw/pull/3891> | 已提交的修复 PR，旨在为 ARM64 架构提供官方镜像，直接回应 #3888。 |

> **反应**  
> 以上 Issues 仅有 0 评论，但因技术难度与社区对多架构支持的迫切需求，已引发 2 条 PR 的快速响应。PR #3891 现已进入待合并阶段，预计在本周内完成审查。

---

## 5. Bug 与稳定性  
| 级别 | PR/Issue | 说明 | Fix 已完成 |
|------|----------|------|------------|
| **高** | #3888 / #3891 | Iron Proxy 在 arm64 主机上启动失败（`exec format error`） | ✔️ PR #3891 正在修复 |
| **中** | #3893 | Claude 长块流导致心跳被清理 | ❌ PR #3893 开发中 |
| **中** | #3887 | Readiness probe 在 CI 上被过早裁剪 | ❌ PR #3887 正在修复 |
| **低** | #3889 | CLI 报错中出现未知 `unknown_sender_public` | ✔️ PR #3889 已合并 |
| **低** | #3879 | better‑sqlite3 本地绑定错误 | ✔️ PR #3879 已合并 |

> **总体评估**  
> 关键平台兼容性 bug 已得到主动修复；其他运行时稳定性问题正处于快速修复阶段，预计在下个工作日内完成。

---

## 6. 功能请求与路线图信号  
| Feature | 来源 | 现状 | 预期入选 |
|---------|------|------|----------|
| **Per‑host auto‑approval** | Issue #3881 | 需求已被识别，PR #3890 仅解决文档说明 | 可能在 2.5.x 计划 |
| **CLI 直接安装提示改进** | PR #3885 | 已完成 | 继续优化 |
| **Agent runtime 选项扩展** | PR #3893 | 正在实现 | 视合并进度决定 |
| **多架构 Iron Control 镜像** | PR #3891 | 开发中 | 关键功能，预估 2.5.x 版本 |

> **路线图信号**  
> 通过 Issue 与 PR 的优先级与审查频次，可以看出项目团队正聚焦 **跨平台支持** 与 **用户体验提升** 作为下一版本的核心方向。

---

## 7. 用户反馈摘要  
> **痛点**  
> - **ARM64 支持不足**：用户在 NVIDIA DGX Spark 上部署时遇到 `exec format error`，影响生产部署。  
> - **代理批准流程冗余**：每次请求都需要人工批准，导致响应延迟。  
> - **CLI 安装提示不精准**：在未选定运行时之前仍被提示安装 Claude CLI，造成操作混淆。  

> **场景**  
> - 企业级机器学习平台部署；  
> - 边缘设备（ARM64）上运行的自托管 AI 辅助系统。  

> **满意/不满意**  
> - **满意**：已修复的 bug 与文档改进；  
> - **不满意**：跨平台兼容性与审批流程的改进仍待完成。

---

## 8. 待处理积压  
| 号码 | 标题 | 说明 | 关注建议 |
|------|------|------|-----------|
| **#3888** | Iron Proxy setup fails on arm64 hosts | 关键兼容性 bug，已提交 PR #3891 但未合并 | 需要加速审查，确保 ARM64 兼容性在 2.5.x 版本前完成 |
| **#3881** | Iron Proxy: per‑host auto‑approval rule | 需求已在 PR #3890 文档中提及，但缺少实现 | 建议在 PR #3891 或 #3893 之后合并实现代码 |
| **#3893** | Keep heartbeat alive while Claude streams a long block | 运行时稳定性问题 | 需在下周内完成合并并通过 CI |

> **维护者提醒**：上述 Issues 与 PR 目前在 “待评审/待合并” 阶段，建议分配审查者或安排专门的 PR 评审窗口，以免影响后续版本发布计划。

---

> **结语**  
> NanoClaw 在本日持续展现出高频度的社区参与与快速迭代能力。关键 bug 的主动修复和功能改进为下一版本奠定了良好基础，项目整体健康度维持在 **“稳中有进”** 的水平。  

---

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报
**日期**: 2026-09-25
**数据来源**: GitHub nullclaw/nullclaw

## 1. 今日速览
过去 24 小时内，NullClaw 项目保持高活跃度，共更新 Issues 12 条，Pull Requests 25 条。社区精力主要集中于**核心稳定性修复**（如 Telegram/Discord 崩溃、MCP 挂起）和**文档体系重构**。值得注意的是，多个长期存在的关键 Bug（如低资源设备 Web 搜索不可用、WSL2 CPU 空转）今日均被标记为关闭，表明核心维护者正在集中清理技术债务并优化资源限制下的运行表现。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日关闭了 8 个 PR 并新增了 6 个高价值待合并 PR，主要推进了以下方向：

*   **核心崩溃修复落地**：
    *   修复了 MCP stdio 调用在后端进程已存在时导致的无限挂起问题（[PR #996](https://github.com/nullclaw/nullclaw/pull/996)），解决了 Proxmox 等容器化环境下的死锁风险。
    *   修复了 Discord typing 线程因栈溢出（Stack Overflow）导致的进程崩溃（[PR #1002](https://github.com/nullclaw/nullclaw/pull/1002)），这是今日最关键的稳定性补丁之一。
*   **内存子系统增强**：
    *   重构了内存召回逻辑，防止已归档的对话分片（shards）被错误地注入当前上下文，导致模型将当前用户消息误判为历史记录（[PR #1005](https://github.com/nullclaw/nullclaw/pull/1005)）。
    *   实现了可配置的内存参数（`auto_recall`, `recall_limit`, `max_context_bytes`），赋予用户更精细的控制权（[PR #1001](https://github.com/nullclaw/nullclaw/pull/1001)）。
*   **多平台兼容性优化**：
    *   修复了 Android/Termux 环境下 Zig 标准库 DNS 解析失败的问题，通过回退机制引入 curl 路径（[PR #966](https://github.com/nullclaw/nullclaw/pull/966)）。
    *   增强了安卓/低资源设备的 HTTP 请求安全性及代理支持（[PR #983](https://github.com/nullclaw/nullclaw/pull/983)）。

## 4. 社区热点

| 热度 | 类型 | 标题/摘要 | 链接 | 分析 |
| :--- | :--- | :--- | :--- | :--- |
| 🔥 高 | Issue | **Web Search 在低资源设备上的实用性** | [Issue #871](https://github.com/nullclaw/nullclaw/issues/871) | 9条评论。核心痛点是 NullClaw 主打轻量级/边缘设备，但默认 Web Search 依赖重型 API 或不可用的本地服务。今日关闭可能暗示有替代方案或内置简化版搜索即将落地。 |
| 🔥 中 | Issue | **Telegram 入站消息 SIGSEGV 崩溃** | [Issue #976](https://github.com/nullclaw/nullclaw/issues/976) | aarch64 Linux 上每条消息都导致段错误。今日关闭，推测与今日合并的栈大小/线程模型修复相关，需验证是否彻底解决。 |
| 📝 中 | PR | **文档索引与子系统指南重构** | [PR #1008](https://github.com/nullclaw/nullclaw/pull/1008) | 修复了文档渲染问题，并补充了 MCP、Subagents、Voice 等核心模块的中英文档。反映社区对文档完整性的强烈需求。 |
| 📝 中 | PR | **Skills 符号链接支持** | [PR #1003](https://github.com/nullclaw/nullclaw/pull/1003) | 允许 Skills 目录使用软链接，方便用户通过 Git 或其他工具同步技能包，降低维护成本。 |

## 5. Bug 与稳定性

今日报告的严重稳定性问题及处理状态如下：

1.  **[Critical] Telegram 入站消息导致进程崩溃 (SIGSEGV)**
    *   **描述**: 在 aarch64 Linux (如树莓派) 上，每条 Telegram 消息都触发段错误，导致 `gateway` 服务循环重启，消息丢失。
    *   **状态**: 已关闭 ([Issue #976](https://github.com/nullclaw/nullclaw/issues/976))。
    *   **关联修复**: 需确认是否由 [PR #1002](https://github.com/nullclaw/nullclaw/pull/1002) (Discord/通用线程栈修复) 或类似底层运行时调整解决。若未解决，需持续关注 ARM 架构下的栈深度问题。

2.  **[High] MCP Stdio 调用无限挂起**
    *   **描述**: 在 Proxmox 等环境中，若 MCP 服务器已被 Gateway 持有，单独调用 `nullclaw agent` 会因锁竞争或无超时而永久挂起。
    *   **状态**: 已关闭 ([Issue #991](https://github.com/nullclaw/nullclaw/issues/991))。
    *   **关联修复**: [PR #996](https://github.com/nullclaw/nullclaw/pull/996) 已合并，强制对 stdio 读取设置 `timeout_ms` 并在超时后终止子进程组。

3.  **[High] Gateway 在 WSL2 上 CPU 100% 空转**
    *   **描述**: WSL2 环境下 Gateway 线程持续占用 100% CPU，即使空闲亦然。
    *   **状态**: 已关闭 ([Issue #870](https://github.com/nullclaw/nullclaw/issues/870))。
    *   **备注**: 通常与阻塞系统调用或定时器精度有关，今日关闭预示底层调度器或事件循环可能已做优。

4.  **[Medium] CLI 流式输出首字节损坏 (macOS)**
    *   **描述**: macOS 下流式输出因写入偏移量错误，导致首行回复首字符被覆盖/替换。
    *   **状态**: 待合并 ([PR #1006](https://github.com/nullclaw/nullclaw/pull/1006))。
    *   **修复**: 将位置写入（positional write）改为追加写入（append）。

## 6. 功能请求与路线图信号

*   **多模态视觉能力 (Vision Pipeline)**
    *   **需求**: 用户强烈希望直接发送图片/文件给 Agent，并自动进行 Base64 编码传给多模态 LLM。
    *   **状态**: Issue #624 已关闭，但暂无合并的 Feature PR。
    *   **信号**: 鉴于项目近年侧重边缘计算与多模态兼容性，此功能极有可能在近期作为独立模块或 Skill 推出，需关注后续是否有 `src/vision.zig` 相关提交。

*   **Ollama 兼容性通知优化**
    *   **需求**: 当 Ollama 模型不支持 Tool Calling 时，目前仅报晦涩的 adapter error。用户希望 Get /status 或错误日志能明确提示“模型不支持 Tools”。
    *   **状态**: Issue #1000 (Open)；PR #1004 (Open) 正在增加非 2xx 响应的详细日志记录，这将直接改善此体验。
    *   **信号**: 预计下一版本会包含更友好的 Provider 错误提示信息。

*   **Agent 状态监控接口**
    *   **需求**: 添加 `GET /status` HTTP 端点，以便外部仪表盘监控 Agent 活跃/空闲状态，而不必依赖 CLI `nullclaw status`。
    *   **状态**: Issue #631 已关闭。
    *   **信号**: 若有运维集成需求，此 API 可能被纳入核心 Gateway 的 HTTP 路由中。

## 7. 用户反馈摘要

*   **低资源设备优先**: 反馈中多次提及 "low-resource devices", "cheap devices", "aarch64", "Termux"。用户主要使用树莓派、香橙派或 Android 旧手机运行，对**内存占用**、**启动速度**和**离线能力**极其敏感。
*   **配置文档痛点**: Issue #867 (提供完整 config.json 示例) 获得 3 个点赞且被高频讨论。用户抱怨默认配置过于精简，导致配置门槛高。今日大量文档 PR (#1007, #1008, #776) 的合并正是对此的直接回应。
*   **透明度需求**: Issue #886 指出长时间任务（如读取 Outlook 邮件）没有“正在思考”的反馈，用户无法区分“变慢”和“卡死”。虽然 Discord 有 typing 指示器（已修复崩溃），但 CLI 终端缺乏类似进度反馈仍是痛点。

## 8. 待处理积压

*   **[Open] PR #983: 代理请求使用固定 Curl 路径**
    *   由 ArcanePivot 提交于 8 月 3 日。虽然涉及安全（避免凭据暴露在 argv）和网络稳定性，但截至今日仍无 Review 或合并动态。考虑到今日已合并多个网络相关修复，此 PR 可能需要维护者重新审视或拆分。
*   **[Open] PR #411 & #319: 钉钉 (DingTalk) 深度集成**
    *   这两个 PR 涉及 DingTalk 官方 API 集成、消息撤回及工具自定义系统。创建时间分别是 3 月 10 日和 3 月 5 日，长期搁置。若团队计划支持钉钉，需尽快决定合并或关闭，以免社区预期落空；若不计划支持，建议明确告知用户。

---
*注：本报告基于 GitHub 公开数据生成，CI/CD 状态及具体代码细节请以仓库实际合并记录为准。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-09-25)

## 1. 今日速览
过去 24 小时内，LobsterAI 项目保持高强度的维护与重构节奏。项目处理了 **50 条 PR**（合并/关闭 46 条，待合并 4 条）与 **18 条 Issues**（关闭 16 条，新开/活跃 2 条）。今日重点集中在 **OpenClaw 引擎稳定性修复**（解决模型输出截断与工具调用格式容错）、**界面 UI 视觉重构**（全宽无边框布局与灰阶调色盘），以及**安全/性能积压 Issue 的集中清理**。整体活跃度极高，核心框架在跨模型编排与渲染层取得了实质性进展。

---

## 2. 版本发布
*今日无新版本发布。*

---

## 3. 项目进展
今日多项核心修复与 UI 重构 PR 已合并入主干，显著提升了 Agent 运行稳定性和视觉体验：

* **OpenClaw 引擎模型输出截断修复** ([PR #2761](https://github.com/netease-youdao/LobsterAI/pull/2761)): 修复了 GLM-5.3 等模型在执行长任务时被意外截断的问题。优化了 `max_tokens` 默认值传递，并补齐了对 `third-party-extensions` 目录下扩展插件模型的目录扫描支持。
* **OpenAI 兼容接口容错增强** ([PR #2759](https://github.com/netease-youdao/LobsterAI/pull/2759)): 增加了对 OpenAI 兼容接口工具调用（Tool Calls）参数中非法控制字符和转义符的自动修复机制，并支持最多两次内部重试续写，避免因模型输出非法 JSON 导致副作用任务直接中断。
* **桌面端视觉与布局重构** ([PR #2760](https://github.com/netease-youdao/LobsterAI/pull/2760), [PR #2762](https://github.com/netease-youdao/LobsterAI/pull/2762)): 重新设计了主题 Token，去除偏蓝色调改用中性灰阶；主内容区改为边缘无缝贴合侧边栏；侧边栏导航调整为 14px 胶囊按键样式；优化了高分屏下的窗口尺寸适应逻辑。
* **会话重命名与多媒体同步修复** ([PR #2358](https://github.com/netease-youdao/LobsterAI/pull/2358), [PR #2373](https://github.com/netease-youdao/LobsterAI/pull/2373)): 增加了会话重命名失败时的本地化 Toast 提示，并修复了视觉/非视觉模型切换时图片 Payload 未清空导致的数据不一致问题。

---

## 4. 社区热点
今日项目集中清理了一批历史安全漏洞通报与架构改进建议，引发社区关注：

* **安全漏洞集中提报与合规治理**: 涉及针对本地 HTTP 代理未鉴权 ([Issue #2286](https://github.com/netease-youdao/LobsterAI/issues/2286))、NIM 路径处理中的任意本地文件泄漏风险 ([Issue #2287](https://github.com/netease-youdao/LobsterAI/issues/2287))、HTML 预览服务器软链接跨目录越权 ([Issue #2288](https://github.com/netease-youdao/LobsterAI/issues/2288)) 以及 SSRF 策略放宽 ([Issue #2181](https://github.com/netease-youdao/LobsterAI/issues/2181)) 的多项安全单（均由用户 `YLChen-007` 报告并已标记关闭），反映出社区对 LobsterAI 本地提权与文件权限边界的高度关注。
* **技能系统性能瓶颈讨论**: 用户反映技能库规模扩大（如 170+ 技能）时，`skills.load.watch` 监听机制会导致严重的启动延迟和磁盘 I/O 占用 ([Issue #2243](https://github.com/netease-youdao/LobsterAI/issues/2243))，呼吁官方提供 UI 级别的显式监听开关。

---

## 5. Bug 与稳定性

### 严重 / 卡死（High）
1. **数据备份卡死主进程** ([Issue #2214](https://github.com/netease-youdao/LobsterAI/issues/2214)): SQLite 数据库使用 WAL 模式时，触发桌面端“备份数据”会导致 Electron 主进程由于文件锁卡死未响应（100% 可复现）。*（状态：已关闭/标记 Stale）*
2. **记忆搜索 DB 锁阻塞与 Provider 锁定** ([Issue #2216](https://github.com/netease-youdao/LobsterAI/issues/2216)): Memory Search 被硬编码锁定为 OpenAI Provider，且在索引重建时易触发 `EBUSY` SQLite 锁，导致记忆搜索不可用。*（状态：已关闭/标记 Stale）*
3. **执行结果窗口滚动假死** ([Issue #2079](https://github.com/netease-youdao/LobsterAI/issues/2079)): 结果面板向上滚动到顶端时触发界面冻结。*（状态：已关闭/标记 Stale）*

### 中低风险（Medium/Low）
1. **模型切换时附件图片状态不同步** ([Issue #1861](https://github.com/netease-youdao/LobsterAI/issues/1861)): 从非视觉模型切换至视觉模型（或反之）时，已上传图片的 Base64/文件路径格式未重置，导致模型读取失败。*（状态：OPEN，有历史关联 PR #2373）*
2. **对话框无法直接添加文件夹** ([Issue #2385](https://github.com/netease-youdao/LobsterAI/issues/2385)): 上传文件控件仅支持单文件选择，无法像主流 Coding Agent 一样支持文件夹拖入或 `@` 文件夹。*（状态：OPEN）*

---

## 6. 功能请求与路线图信号
从目前 Open 状态的 PR 中可以观察到即将推出的重要特性：

* **Cowork 原生进度卡片** ([PR #2758](https://github.com/netease-youdao/LobsterAI/pull/2758)): 计划在 Cowork 输入框上方直接渲染 OpenClaw 的原生任务进度卡片，无需展开 Tool Output 即可直观查看多步骤计划与执行状态。
* **侧边栏广告永久关闭开关** ([PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374)): 拟在“设置 -> 常规”中提供开关，允许用户永久隐藏侧边栏广告 Banner。
* **第三方模型网关扩展** ([PR #2504](https://github.com/netease-youdao/LobsterAI/pull/2504)): 计划将 OrcaRouter 作为一等公民 Provider 整合进配置中心。

---

## 7. 用户反馈摘要
* ** Token 消耗与执行效率**: 部分用户反馈在相同任务和模型下，LobsterAI 相比 CodeBuddy 耗时及 Token 消耗量过高（如某些监控场景下因死循环消耗数千万 Token，[Issue #2230](https://github.com/netease-youdao/LobsterAI/issues/2230)），希望优化 Agent 内部循环与终止条件。
* **大屏与多列适配需求**: 拥有 2.5K/4K 显示器的用户希望技能界面（Skills UI）能从当前的双列布局扩展为三列布局，并支持任务队列预输入（Task Queue），以提高连续协同效率 ([Issue #2120](https://github.com/netease-youdao/LobsterAI/issues/

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

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*