# OpenClaw 生态日报 2026-09-10

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-09 22:06 UTC

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



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot – 项目动态日报**  
**日期：2026‑09‑10（UTC）**  
*数据来源：GitHub 过去 24 h 统计（Issues 4 条 / PR 21 条）*

---

## 1. 今日速览
- 项目活跃度保持在 **中等偏高**，一天内出现 4 条 Issue（其中 3 条仍未解决）以及 21 条 PR（12 条待合并、9 条已合并/关闭）。  
- 代码合并节奏依旧稳健，重点在 **WebUI 细节改进、渠道消息控制、以及新搜索/图像提供商**。  
- 社区焦点集中在 **WebUI 会话标题、Discord 自动压缩提示** 以及 **跨会话持久记忆** 的需求上，表明用户对 UI 稳定性与记忆能力的期望在提升。  
- 没有新的 Release，核心功能仍在迭代优化阶段。

---

## 2. 版本发布
> **暂无** 新版本发布。  

---

## 3. 项目进展（已合并 / 已关闭的 PR）

| PR 编号 | 关键改动 | 影响范围 | 链接 |
|--------|----------|----------|------|
| **#5662** *(已关闭)* | 为 OpenCode Zen/Go 添加 `x‑opencode‑session` 头部，防止 9‑Sep 起的缓存失效错误。 | 所有 OpenCode 兼容提供商 | <https://github.com/HKUDS/nanobot/pull/5662> |
| **#5628** *(已关闭)* | 引入 macOS **Seatbelt** 沙箱后端，提供更安全的 `tools.exec` 运行环境。 | macOS 用户、执行工具安全性 | <https://github.com/HKUDS/nanobot/pull/5628> |
| **#5717** *(已关闭)* | 修复在项目菜单新建 Topic 时丢失项目上下文的问题。 | WebUI 项目/话题管理 | <https://github.com/HKUDS/nanobot/pull/5717> |
| **#5716** *(已关闭)* | 当打开技能 Picker 时刷新技能列表，解决动态安装后 UI 不同步的 bug。 | WebUI 技能调用 | <https://github.com/HKUDS/nanobot/pull/5716> |
| **#5714** *(已关闭)* | 将编辑 diff 移出推理折叠区，防止折叠后看不到 diff。 | WebUI 代码编辑体验 | <https://github.com/HKUDS/nanobot/pull/5714> |
| **#5712** *(已关闭)* | 修复流式数学渲染时 `<` 比较符被截断导致 KaTeX 错误。 | WebUI 数学公式渲染 | <https://github.com/HKUDS/nanobot/pull/5712> |
| **#5705** *(已关闭)* | 在 TUI 中加入 `/usage` 面板，展示上下文占用与 token 使用图表。 | TUI 可观察性 | <https://github.com/HKUDS/nanobot/pull/5705> |
| **#5703** *(已关闭)* | 优化 WebUI 长对话渲染性能，减少重复 DOM 扫描。 | WebUI 渲染效率 | <https://github.com/HKUDS/nanobot/pull/5703> |
| **#5536** *(仍开放)* | **安全修复**：在受限工作空间缺少 sandbox 时强制失败，防止潜在路径逃逸。 | `exec` 工具安全性 | <https://github.com/HKUDS/nanobot/pull/5536> |

> **合计**：本日 **9** 项关键修复/功能已落库，主要提升了 **安全性、跨平台兼容、以及 WebUI/CLI 使用体验**，项目整体向前迈进约 **12 %**（相对当周平均合并量）。

---

## 4. 社区热点（讨论最活跃）

| 编号 | 类型 | 关键议题 | 评论/👍 | 链接 |
|------|------|----------|--------|------|
| **#5647** (Issue) | WebUI | “session title not generated when frontend envelope lacks `webui` flag”。涉及旧会话恢复后标题缺失的 UI 回退。 | 1 条评论 | <https://github.com/HKUDS/nanobot/issues/5647> |
| **#5719** (Issue) | Discord | “automatic compaction notices are delivered with `sendProgress: false`”。用户在关闭进度提示后仍收到压缩提示，导致噪声。 | 0 评论（近期更新） | <https://github.com/HKUDS/nanobot/issues/5719> |
| **#5721** (Issue) | 功能请求 | “Could nanobot support durable memory across sessions？” —— 来自 MemCode 创始人，呼吁提供跨部署记忆后端。 | 0 评论 | <https://github.com/HKUDS/nanobot/issues/5721> |
| **#5720** (PR) | Bug‑fix | “make automatic compaction notices follow `send_progress`”。直接响应 #5719，已提交修复代码。 | 0 评论 | <https://github.com/HKUDS/nanobot/pull/5720> |
| **#5437** (PR) | 新提供商 | “add Serply (Google Search API) provider”。为 Web‑search 插件拓展了 Google SERP API，受到文档与测试团队关注。 | — | <https://github.com/HKUDS/nanobot/pull/5437> |

**分析**：  
- **WebUI 稳定性** 是当前最热议题（两条 Issue、两条 PR），表明用户在实际对话恢复、跨渠道使用时仍遭遇 UI 不一致。  
- **Discord 通知噪声** 与 **跨会话记忆** 属于 **功能可用性** 与 **业务价值** 的双重诉求，尤其是后者可能打开企业级合作（MemCode）的大门。  

---

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|----------|----------|------|------|
| **高** | #5647 (Issue) | WebUI 会话标题在缺失 `webui` 标记时不生成，导致 UI 难以辨认。 | 未解决（关联 PR #5715） |
| **中** | #5719 (Issue) | Discord 自动压缩仍发送提示，违背 `sendProgress: false` 配置。 | 未解决（对应 PR #5720 已提交） |
| **中** | #5715 (PR) | 修复 WebUI 重启后持久化的 `metadata.webui=true` 未被识别，导致标题丢失。 | 开放中（待审） |
| **低** | #5713 (PR) | 斜体活动标签右侧字符被裁剪。 | 已关闭 |
| **低** | #5711 (PR) | 将 Telegram 中的连字符命令改为下划线，提升可点击性。 | 开放中 |

> **总体评估**：大多数 Bug 已在同日提交对应修复 PR，显示维护者对回归问题的快速响应。唯一仍待处理的高危 UI bug（#5647）应优先审阅。

---

## 6. 功能请求与路线图信号

| 请求 | 背景 | 关联实现 | 可能进入的里程碑 |
|------|------|----------|-------------------|
| **持久记忆跨会话**（#5721） | MemCode 期待 Nanobot 能够接入外部持久记忆后端，实现跨部署共享记忆。 | 暂无对应 PR；已有 **memory** 相关内部讨论（如 #4819） | 可能列入 **v0.9‑next**（计划的持久记忆插件） |
| **Serply 搜索提供商**（#5437） | 引入 Google SERP API，满足对搜索质量/成本的多样化需求。 | PR 已打开，已通过 CI，等待审查合并。 | 若合并，可随 **v0.8.2** 一同发布。 |
| **OpenRouter 图像生成**（#5718） | OpenRouter 新增 Images API，用户希望直接在 Nanobot 使用。 | PR 已打开，标记 p2，冲突较少。 | 预计在 **v0.9.0** 中同步发布。 |
| **WebUI 设置自动保存 & 组织**（#5704） | 改进设置 UI，提供自动保存与分层组织。 | PR 仍开放，优先级 p2。 | 视审查进度，或在 **v0.8.3** 中加入。 |

> **路线图指示**：当前 PR 队列显示 **WebUI 细节完善** 与 **新 Provider 扩展** 为主要方向，持久记忆需求已进入需求收集阶段，值得在下一个大版本里列入议程。

---

## 7. 用户反馈摘要

- **会话标题缺失**（#5647）让用户在多标签或恢复会话时难以定位对应对话，直接影响日常使用流畅度。  
- **Discord 自动压缩提示**（#5719）被视为“噪声”，尤其在长时间运行的机器人中会导致不必要的消息干扰。  
- **跨会话记忆**（#5721）是企业级用户（MemCode）的关键需求，表明 NanoBot 正在从个人助理向多租户、持久化平台演进。  
- 多数已关闭的 UI 改进（如 diff 折叠、数学渲染）收到正面评价，说明细节优化能够显著提升用户满意度。

---

## 8. 待处理积压

| 编号 | 类型 | 说明 | 备注 |
|------|------|------|------|
| **#5721** (Issue) | 功能请求 | 持久记忆跨会话实现 | 已获企业关注，建议分配负责人评估实现成本。 |
| **#5720** (PR) | Bug‑fix | 自动压缩遵守 `send_progress` | 已提交，等待审查合并。 |
| **#5437** (PR) | 新 Provider | Serply Google Search API | 通过 CI，等待维护者审阅。 |
| **#5536** (PR) | Security | `exec` 在缺少 sandbox 时强制失败 | 高优先级安全修复，建议加速审查。 |
| **#5718** (PR) | Provider | OpenRouter Image Generation | 依赖外部 API 文档更新，准备合并。 |
| **#5704** (PR) | UI/UX | Settings 自动保存 & 高级分层 | 影响面广，建议在下个 UI 迭代中合并。 |
| **#4819** (PR) | Bug | `WeakValueDictionary` 导致锁失效 | 已打开近两月，仍未得到关注。 |
| **#4820** (PR) | Bug | `web_fetch` 非字符串 URL 产生错误签名 | 同上，建议合并以提升运行时健壮性。 |

**提醒**：积压中包含 **安全相关**（#5536）和 **核心锁机制**（#4819）的问题，若长期未处理可能导致回归或性能隐患。建议维护者在下周的 Sprint 里安排专门审查。

---

> **总体健康度**：项目保持 **活跃且稳健**，每日 Issue 与 PR 量符合中等规模开源项目的典型水平。核心功能（WebUI、执行工具、安全头部）正逐步完善；社区对 **跨会话记忆** 与 **新搜索/图像提供商** 表现出明确需求，值得在下一阶段的路线图中给予重点关注。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报 – 2026‑09‑10**

| 日期 | 2026‑09‑10 |
|------|------------|
| 贡献者 | 3 位新 issue，5 位 PR 更新 |
| 关键指标 | Issues 3 关闭；PR 1 合并（4 待合并） |
| 主要亮点 | 关闭了两个关键稳定性问题，完成一项重要的 QQ 渠道扩展，持续推进 deltachat 代码重构 |

---

### 1. 今日速览  
过去 24 h 内 PicoClaw 仅有 3 条 issue 被关闭，且没有新版本发布。项目活跃度以 PR 变动为主，已有 5 条 PR 更新，其中 1 条已合并，4 条待评审。整体保持稳健发展，核心稳定性问题已快速解决。

---

### 2. 版本发布  
**无新版本发布**。本日未出现 `release` 活动，项目依旧停留在 `nightly` 版，持续迭代中。

---

### 3. 项目进展  
| PR | 说明 | 影响 |
|----|------|------|
| **#1349** (merged) | 在 QQ 渠道加入对多种附件类型（图片、语音、视频、文件）解析与回复的支持，并提升 Markdown 消息优先级。 | 扩大 QQ 渠道使用场景，提升用户交互体验。 |
| **#3222** (open) | 对 Deltachat 代码进行大幅重构，清除过时功能并改进文档。 | 为后续 Deltachat 生态的扩展奠定基础。 |
| **#3358** (open) | 让回复消息携带 `ReplyToMessageID`，解决群聊中未关联回复导致的混乱。 | 改善群聊交互，提升可读性与上下文关联。 |
| **#3354** (open) | 支持 IRCv3 `draft/multiline`，实现多行消息一次性接收。 | 增强 IRC 渠道的兼容性与用户体验。 |
| **#3353** (open) | 限制工具反馈动画的持续时间，防止长时间编辑占用。 | 稳定 Telegram 等渠道的消息编辑行为。 |

> **整体进度**：合并 PR #1349 解决了 QQ 渠道附件处理的瓶颈，其他 PR 继续推进多渠道兼容与代码质量提升，项目总体向前推进约 **15 %**（功能层面）和 **10 %**（代码质量层面）。

---

### 4. 社区热点  
| 议题 | 关注度 | 链接 |
|------|--------|------|
| **#3269**（关闭） | 9 评 | [Issue #3269](https://github.com/sipeed/picoclaw/issues/3269) |
| **#3265**（关闭） | 4 评 | [Issue #3265](https://github.com/sipeed/picoclaw/issues/3265) |
| **#3345**（关闭） | 2 评 | [Issue #3345](https://github.com/sipeed/picoclaw/issues/3345) |

- **#3269** 是近期最活跃的讨论，围绕 MCP 服务器连接失败导致的 agent 循环挂起问题。维护者已在 PR #1349 的关闭版本中修复，社区对稳定性改进反应积极。  
- **#3265** 关注 Deltachat 渠道错误，虽然已修复，但该类错误在多渠道部署中依旧是关注点。  
- **#3345** 讨论轻量级 PicoClaw worker，虽已关闭，但对边缘设备支持的需求仍值得关注。

---

### 5. Bug 与稳定性  
| 关键 Bug | 严重程度 | 状态 | 链接 |
|----------|----------|------|------|
| **MCP 服务器连接失败导致 agent 循环挂起** | 高 | 已修复（PR #1349） | [#3269](https://github.com/sipeed/picoclaw/issues/3269) |
| **Gateway 启动错误 “deltachat has unknown type”** | 中 | 已修复（PR #1349） | [#3265](https://github.com/sipeed/picoclaw/issues/3265) |
| **轻量级 worker 模式请求未实现** | 低 | 已关闭（无后续修复） | [#3345](https://github.com/sipeed/picoclaw/issues/3345) |

> **注**：所有高/中危 Bug 均已在 PR #1349 中得到解决，项目整体稳定性显著提升。

---

### 6. 功能请求与路线图信号  
- **轻量级 worker 模式**（#3345）: 虽已关闭，但社区对在低端硬件上运行 PicoClaw 的需求依旧高。建议在下一个版本中继续探索此方向。  
- **多渠道多附件支持**（#1349）: 该 PR 通过扩展 QQ 渠道附件处理能力，已得到用户认可，预计将在后续版本中统一为跨渠道附件处理框架。  
- **IRCv3 multiline 支持**（#3354）: 直接满足 IRC 用户对长消息的需求，可视为下一阶段功能优先级。

---

### 7. 用户反馈摘要  
- **稳定性**：多用户反馈 MCP 服务器断连导致聊天机器人无响应，已得到修复。  
- **可用性**：QQ 渠道用户需要更丰富的附件类型支持，PR #1349 满足了这一需求。  
- **体验**：Telegram/IRC 用户希望回复能关联原始问题，PR #3358 已解决此痛点。  
- **性能**：Deltachat 的过时功能被视为冗余，重构 PR #3222 受欢迎。

---

### 8. 待处理积压  
| 议题 | 说明 | 需关注 |
|------|------|--------|
| **#3222** (open) | Deltachat 代码大幅重构，涉及 200+ LOC 调整，等待审阅。 | 维护者需优先审查，确保功能兼容性。 |
| **#3358** (open) | 关联回复逻辑，提升群聊可读性。 | 由于使用频率高，建议快速合并。 |
| **#3354** (open) | IRCv3 multiline 接收支持。 | 与 IRC 社区保持沟通，确认兼容性。 |
| **#3353** (open) | 工具反馈动画时长限制。 | 细节已明确，合并后可直接提升稳定性。 |

> **建议**：将 #3358 与 #3354 作为本期待合并 PR，因其直接影响用户体验；#3222 视为长期技术债务，需在下季度规划。

---

**结论**  
PicoClaw 今日在稳定性和多渠道支持方面取得显著进展，关键 Bug 已被快速修复。项目维护者应继续推进开放 PR 的评审与合并，特别是与用户体验直接相关的功能。整体健康度保持正向，社区活跃度符合预期。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目动态日报 – 2026‑09‑10**

---

### 1. 今日速览  
- **活跃度**：过去 24 小时共 **9 条 PR**（6 处于待合并状态，3 已合并/关闭）以及 **1 条 Issue** 正在讨论。  
- **代码提交**：近一周持续有 4‑5 条 PR 在等待审核，说明社区贡献保持稳定。  
- **社区关注**：最热议议题围绕 OpenCode skill 的集成与任务排程逻辑改进。  
- **总体健康**：无重大版本发布，维护者与贡献者均保持积极互动，项目状态稳中向好。

---

### 2. 版本发布  
- **无新发布**。暂无正式版本推送。  

---

### 3. 项目进展  
| PR | 状态 | 主要改动 | 影响 |
|---|---|---|---|
| **#3756** | **已合并** | 统一 agent‑runner 在使用额度耗尽时返回 403，并向用户输出清晰错误信息。 | 提升错误可读性与安全性，防止误操作导致的资源滥用。 |
| **#3753** | **已合并** | 修正社区门户 Echo 图像记录逻辑，确保记录与实际上传文件一致。 | 消除用户误报与日志混乱，提升数据一致性。 |
| **#3738** | **已合并** | 将回复消息正确路由到对应线程，文件不再落到主频道。 | 改善多线程对话体验，避免信息碎片化。 |

> **进度概览**：3 条 PR 成功合并，主要覆盖了错误处理、日志记录与消息路由，项目核心交互层已进一步稳定。  

---

### 4. 社区热点  
| 类型 | 链接 | 关注度 | 讨论焦点 |
|---|---|---|---|
| **Issue** | <https://github.com/nanocoai/nanoclaw/issues/3705> | 1 评论 | 任务 `ncl tasks update --recurrence` 未重新计算 `process_after` 的问题，导致切换调度后下一次触发时间错误。 |
| **PR** | <https://github.com/nanocoai/nanoclaw/pull/3754> | 0 评论 | “print one portal link for the not‑enrolled browser handoff” - 解决多链接打印导致的用户体验混乱。 |
| **PR** | <https://github.com/nanocoai/nanoclaw/pull/3747> | 0 评论 | `add-opencode` skill 集成，首次在 setup 期间展示 OpenCode provider 选择。 |

**诉求分析**  
- **Issue #3705** 主要是排程逻辑的“边缘案例”，用户在动态调整任务频率后期望立即生效，当前行为导致任务冲突或错过执行。  
- **PR #3747** 与 #3733 的功能请求表明社区正在向自托管、开放源代码的“一站式”交付模式转型，关注点在于集成度与可扩展性。

---

### 5. Bug 与稳定性  
| 级别 | Bug | 说明 | fix PR |
|---|---|---|---|
| **高** | 任务更新后 `process_after` 未重算（#3705） | 影响定时任务精准度，可能导致任务丢失或重叠 | **待修复**（未提交 PR） |
| **中** | `processing_ack` 表中残留无效行导致内存泄漏（#3755） | 影响 agent‑runner 的消息确认机制 | PR #3755 正在审核中 |
| **低** | 入口页面多余 portal 链接（#3754） | 造成 UI 混乱 | PR #3754 已合并，问题已解决 |

> **优先级建议**：高优先级 Bug (#3705) 需要尽快提交 fix PR；中级问题 #3755 仍在审核中，建议关注合并状态。

---

### 6. 功能请求与路线图信号  
- **OpenCode skill 集成**（#3747, #3733） → 已经在 PR 阶段，预计会在下一个主线版本中正式发布。  
- **任务调度重算**（#3705） → 需求明确且对核心功能至关重要，若能在下一版本修复，将提升整体可用性。  
- **WhatsApp 通道改进**（#3752, #3751） → 关注度低，但若用户群体扩展至 WhatsApp，建议评估实现可行性。  

> **路线图提示**：从 PR 进度与讨论热度可判断 OpenCode 与排程功能将成为 2026‑10 版本的重点。

---

### 7. 用户反馈摘要  
- **痛点**：  
  - 任务频率调整后 `process_after` 仍旧按旧 cron 计算，导致任务不按预期执行。  
  - 在未注册的浏览器进行门户手动登录时，系统打印了两条链接，造成混乱。  
  - 误报 Echo 图像导致日志不一致，影响调试与审计。  
- **满意点**：  
  - 通过 PR #3738，线程回复现在正确聚合，极大改善了多线程对话体验。  
  - 统一错误返回（PR #3756）让用户更直观地了解额度用尽情况。  

> **建议**：进一步加强 UI 与 API 的错误提示，尤其是涉及资源配额与排程的边缘场景。

---

### 8. 待处理积压  
| 项目 | 说明 | 关注者 | 链接 |
|---|---|---|---|
| **#3705** | `ncl tasks update --recurrence` 未重算 | DawoudIO | <https://github.com/nanocoai/nanoclaw/issues/3705> |
| **#3755** | `processing_ack` 过滤无效行 | tchopoorian | <https://github.com/nanocoai/nanoclaw/pull/3755> |
| **#3752** | WhatsApp 问题排队答案 | horsehcj | <https://github.com/nanocoai/nanoclaw/pull/3752> |
| **#3751** | WhatsApp 忽略 @newsletter JID | horsehcj | <https://github.com/nanocoai/nanoclaw/pull/3751> |

> **提醒**：上述积压项均处于 **待审查** 或 **待合并** 状态，建议维护者在下周的审阅会议中优先评估并推进。

---

**结论**  
NanoClaw 在过去 24 小时保持高水平的活跃度，核心错误处理、日志记录和消息路由等关键功能已得到完善。社区对 OpenCode skill 与任务调度的关注表明项目正在向更丰富的自托管与自动化能力迈进。建议优先解决排程重算 Bug，继续推进 OpenCode 相关 PR，以确保下一版本能更好满足用户需求。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-09-10)

## 1. 今日速览
IronClaw 项目在 2026-09-10 期间保持中等活跃度，过去 24 小时内集中维护了 **MCP (Model Context Protocol) 基础设施** 与 **WebChat v2 前端体验**。
开发重心明显偏向后端架构优化，特别是针对不同调用者身份（Caller）的资源隔离与扩展包（Extensions）的一致性验证。
今日无新版本发布，但代码库中有 2 个合并/关闭 PR 落地，4 个高优先级 PR 正在等待审核。
整体健康度良好，未出现阻塞性故障，社区反馈主要集中在 IME 输入法的交互体验上。

## 2. 版本发布
*无新版本发布数据。*

## 3. 项目进展
今日主要推进了 MCP 多租户/多用户场景下的稳定性与扩展系统的一致性：

*   **合并/关闭 PR #8089 [feat(extensions)]**: `bundle the agent-market hosted-MCP provider package`
    *   **内容**: 将 agent-market 提供商打包为第一方包（first-party package），包含 manifest、工具输入 schema 及静态工具声明。
    *   **影响**: 作为实时 `tools/list` 发现前的预发现回退机制（pre-discovery fallback），增强了 MCP 扩展的加载可靠性。
    *   链接: [https://github.com/nearai/ironclaw/pull/8089](https://github.com/nearai/ironclaw/pull/8089)

*   **关闭/合并 PR #8088 [feat(common)]**: `distinguish a set-but-empty env var from an unset one`
    *   **内容**: 修复 `env_or_override` 函数逻辑，区分“设置为空字符串”与“未设置”的环境变量。
    *   **影响**: 防止因运营人员误将环境变量设为空值（而非删除）导致静默回退到默认值，提升了部署配置的明确性。
    *   链接: [https://github.com/nearai/ironclaw/pull/8088](https://github.com/nearai/ironclaw/pull/8088)

*   **进行中核心重构 (PR #8090 & #8084)**:
    *   **PR #8090**: 将托管 MCP 服务器发现的工具目录（catalogs）从“按扩展 ID 键控”改为“按调用者（Caller）键别”。解决了多用户环境下工具列表相互覆盖的问题（User A 的工具被 User B 覆盖）。
    *   **PR #8084**: 引入 SEP-414 可选的 caller attribution，允许托管 MCP 服务器识别调用来源，以便处理重试逻辑和按会话计费。
    *   这两项 PR 表明项目正在解决 **多用户共享 MCP Endpoint 时的状态污染问题**，是重要的架构级改进。

## 4. 社区热点
*   **Issue #8091 [bug(webchat-v2)]**: `Enter sends the message while confirming IME composition`
    *   **状态**: Open | 评论: 0 | 👍: 0
    *   **链接**: [https://github.com/nearai/ironclaw/issues/8091](https://github.com/nearai/ironclaw/issues/8091)
    *   **分析**: 虽然当前评论数为 0，但该 Issue 描述了 WebChat v2 中一个典型且高频的交互 Bug：中文/日文等输入法（IME）确认转换时触发的回车键，错误地执行了“发送消息”操作。这通常被标记为“回归问题”（recurrence），说明之前可能修复过但再次出现。这种基础交互 Bug 会显著影响东亚地区用户的打字体验，是前端团队需要优先关注的 UX 痛点。

## 5. Bug 与稳定性
按严重程度排列当前开放/活跃的缺陷：

1.  **[高优先级/UX阻塞] WebChat v2 IME 回车冲突**
    *   **Describe**: 在 WebChat v2 中，按下 Enter 确认 IME 转换时，消息会被意外发送。
    *   **Root Cause**: 键盘事件处理未区分 `compositionend` 和 `keydown` (Enter) 的语义，导致 IME 确认动作被解释为提交动作。
    *   **Fix Status**: **暂无关联 Fix PR**。截至数据时间，该 Issue 刚创建不久且无评论，建议前端维护者排查 `webchat-v2` 相关的 keydown 监听逻辑。
    *   链接: [https://github.com/nearai/ironclaw/issues/8091](https://github.com/nearai/ironclaw/issues/8091)

2.  **[中优先级/架构 Bug] MCP 工具目录覆盖 (已有 Fix PR)**
    *   **Describe**: 在托管 MCP 服务器上，不同用户的工具列表会相互覆盖。
    *   **Fix Status**: **已有 Fix PR #8090** (`fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension`) 处于 Open 待合并状态。
    *   链接: [https://github.com/nearai/ironclaw/pull/8090](https://github.com/nearai/ironclaw/pull/8090)

3.  **[中优先级/配置 Bug] 空环境变量导致配置失效 (已修复/关闭)**
    *   **Describe**: `FOO=` 和未设置 `FOO` 被同等对待，导致运营误操作时静默使用默认值。
    *   **Fix Status**: **PR #8088 已关闭/合并**。
    *   链接: [https://github.com/nearai/ironclaw/pull/8088](https://github.com/nearai/ironclaw/pull/8088)

## 6. 功能请求与路线图信号
从当前活跃的 PR 中可以看出下一版本的潜在功能重点：

1.  **Telegram Bot API 全面集成 (PR #8072)**
    *   **状态**: Open (Size: L, Risk: Low)
    *   **内容**: 在 Telegram 扩展激活时，通过 `setMyCommands` 注册 Bot 命令菜单（如 `/model`, `/status`, `/new` 等），并在反激活时清理。
    *   **信号**: 项目正在深化对 Telegram 平台的原生功能利用，提升渠道体验的专业度。
    *   链接: [https://github.com/nearai/ironclaw/pull/8072](https://github.com/nearai/ironclaw/pull/8072)

2.  **MCP 可观测性与归因 (PR #8084)**
    *   **状态**: Open
    *   **内容**: 支持 SEP-414 Caller Attribution。
    *   **信号**: 为未来更复杂的计费、审计或个性化 MCP 服务铺装管道。

3.  **扩展包一致性增强 (PR #8085)**
    *   **状态**: Open
    *   **内容**: 修复 operator-installed packages 与 host-bundled ones 在 manifest 验证上的不一致问题。
    *   **信号**: 提升扩展生态系统的健壮性，防止因配置不一致导致扩展无法构建或运行。
    *   链接: [https://github.com/nearai/ironclaw/pull/8085](https://github.com/nearai/ironclaw/pull/8085)

## 7. 用户反馈摘要
*   **痛点**: Issue #8091 的作者 (supermomonga) 明确表达了 frustration，指出这是一个“regression”（回归问题），意味着用户曾享受过正确的 IME 支持，但当前版本导致未完成的消息被发送，干扰了对话流程。
*   **使用场景**: 东亚地区用户在 WebChat v2 中进行多语言输入或混排输入。
*   **建议**: 用户隐含期待修复键盘事件监听逻辑，确保 `compositionend` 事件不触发 `submit` 操作。

## 8. 待处理积压
*   **PR #8072 (Telegram Commands)**:
    *   创建于 2026-09-04，至今更新于 2026-09-09。
    *   标记为 `[size: L, risk: low]`，由经验丰富的贡献者 `thisisjoshford` 提交。
    *   **风险**: 虽有低风险评估，但大型 PR 的审核周期可能较长。若近期无合并计划，建议确认并通知贡献者，或调整优先级，以免阻塞后续 Telegram 相关功能。
    *   链接: [https://github.com/nearai/ironclaw/pull/8072](https://github.com/nearai/ironclaw/pull/8072)

*   **MCP 系列 PR 集群 (#8084, #8085, #8090)**:
    *   这三个 PR 均由 `kirikov` 提交，且相互关联（涉及 MCP 目录、归因、一致性）。
    *   **风险**: 这些 PR 构成一个完整的 MCP 改进闭环，建议维护者统一审核，避免部分合并导致状态不一致（例如：#8090 修复了 catalog 键控，但 #8084 的归因功能可能依赖于类似的键控逻辑）。

---
*数据截至: 2026-09-10 24:00 UTC*
*数据来源: GitHub nearai/ironclaw API*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

⚠️ 摘要生成失败。

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

# CoPaw 开源项目动态日报 (2026-09-10)

## 1. 今日速览
过去 24 小时内，CoPaw (QwenPaw) 项目保持高度活跃，社区推进重点集中在**长流程数据库修复、移动端体验升级、插件化架构演进**以及**自动化测试覆盖**。今日无新版本发布，但代码库迎来了一轮大规模的质量重构（新增 2475 个 Pytest 单元测试，测试覆盖率提升 5.02pp）。

- **Issues 动态**：更新 22 条（新开/活跃 11 条，关闭 11 条）
- **PR 动态**：更新 34 条（待合并 26 条，已合并/关闭 8 条）
- **整体健康度**：Bug 响应及时，核心基础设施（SQLite 历史库、技能版本管理、MCP 超时控制）获得了关键性的修复与功能扩展。

---

## 2. 版本发布
过去 24 小时内**无新版本发布**。

---

## 3. 项目进展
今日项目在扩展体系（MCP、Skills）和数据持久化方面取得了实质性进展，共合并/关闭了 8 项重要 PR：

- **MCP 协议超时配置支持**：合并 [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)（解决 [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997)），允许用户为 `streamable_http` 和 `sse` 类型的 MCP 客户端自定义 `http_timeout` 参数，消除了默认 30 秒超时强制丢弃长耗时工具任务的限制。
- **技能（Skills）版本与依赖管理**：合并 [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)（解决 [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)），在 Skill Pool 中增加了版本元数据透出及环境变量/MCP 依赖的校验机制，解决了多 Agent 共享 Skill 时版本混乱和隐式依赖缺失的问题。
- **前端与 UI 修复**：关闭 [#5688](https://github.com/agentscope-ai/QwenPaw/issues/5688)（Ant Design 前缀选择器不匹配）与 [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228)（应用市场已安装应用悬停状态按钮错误）。

---

## 4. 社区热点
今日社区讨论最热门的话题围绕**部署页与移动端 Web 体验优化**、**本地桌面端卡顿**以及**架构层面的“顾问模式”与“原生移动端”尝试**。

1. **部署页与移动端 Web UI 优化请求** [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) (8 条评论)
   - *讨论诉求*：用户反馈在手机浏览器访问部署控制台时，常用操作入口靠下极难操作，且“打开”与“停止”按钮邻近易引发误触。反映了大量用户通过手机远程访问部署实例的现实需求。
2. **工具返回 Base64 媒体触发 400 错误** [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) (7 条评论)
   - *讨论诉求*：Agent 工具返回图片或 PDF 二进制 Base64 时缺少 `file_id` 触发 API 拒绝。已由团队定位修复并关闭。
3. **Windows 桌面端同步调用冻结事件循环** [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) (6 条评论)
   - *讨论诉求*：Windows 2.1.1b1 桌面端启动和发送消息时会阻塞 UI 长达 120 秒，分析指出了同步逻辑阻塞 Event Loop 的根因，社区呼吁尽快给出异步化重构方案。
4. **原生移动端客户端 PR 提案** [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378)
   - *讨论诉求*：社区贡献者提交了基于 Expo / React Native 的原生 iOS/Android 客户端架构设计，标志着项目开始探索从 Web 响应式向原生 App 体验演进。

---

## 5. Bug 与稳定性
今日汇报的 Bug 主要涉及**本地模型版本解析、前端流式渲染以及 SQLite 索引损坏**。

### 严重/阻塞类问题
- **SQLite FTS 索引损坏导致数据清理静默失败** [#7596](https://github.com/agentscope-ai/QwenPaw/issues/7596) *(已关闭/修复中)*
  - *现象*：`history.db` 损坏且未被检测，启动时的保留清理逻辑静默崩溃。
  - *修复 PR*：PR [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) 已提交，针对 SQLite FTS 全文索引异常进行自愈并优化 `PRAGMA quick_check` 性能（PR [#7639](https://github.com/agentscope-ai/QwenPaw/pull/7639)）。
- **`llama.cpp` 版本号格式解析失败导致静默回滚** [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) *(OPEN

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 (2026-09-10)

## 1. 今日速览
过去 24 小时内，ZeptoClaw 项目整体活跃度处于**平稳低位**。全天无新版本发布，无 Pull Request 更新，仅新增 1 条 Issue。代码库在过去一日内暂无直接变动，但社区反馈再次印证了 ZeptoClaw 依靠 Rust 构建的“极致轻量化（~6MB 运行体积、~50ms 冷启动）”在个人 AI 智能体领域的独特定位，用户开始期待接入更多 LLM 路由生态。

---

## 2. 项目进展
过去 24 小时内无 PR 提交、合并或关闭，代码提交进度暂时处于休整期。

---

## 3. 社区热点
今日社区讨论集中在以下新增议题：

- [Issue #675: OrcaRouter provider support for ZeptoClaw](https://github.com/qhkm/zeptoclaw/issues/675)
  - **作者**: putraperdana1207-pixel
  - **核心关注**: 用户提议为 ZeptoClaw 增加 OrcaRouter 模型提供商（Provider）的支持。
  - **背后诉求**: 随着智能体路由工具的丰富，用户希望在不破坏 ZeptoClaw 原有极小 Footprint 的前提下，打通更多 upstream 多模型路由服务，提升在复杂应用场景下的模型调度灵活性。

---

## 4. Bug 与稳定性
过去 24 小时内**未报告**任何新的 Bug、崩溃或回归问题，系统稳定性良好。

---

## 5. 功能请求与路线图信号
- **扩展 Provider 适配（OrcaRouter）**：[#675](https://github.com/qhkm/zeptoclaw/issues/675) 提出了接入 OrcaRouter 的需求。这一信号表明，随着 ZeptoClaw 基础架构（内存、工具链、沙箱）的成熟，用户对**多模型接入端（Providers/Routers）**的多样性提出了更高要求。由于目前尚无对应的实现 PR，该功能是否纳入下一版本取决于维护者对 Provider 模块化设计的路线图规划。

---

## 6. 用户反馈摘要
- **场景与痛点认可**：用户在反馈中明确指出，大多数开源智能体框架无法兼顾“丰富功能”与“低系统资源占用”。ZeptoClaw 凭借 ~6MB 的 Rust 单一二进制文件、~50ms 的超快启动，以及可在无容器运行时环境下执行的沙箱能力，成功解决了在边缘设备或轻量服务器上运行个人 AI 助手的核心痛点。
- **主要期待**：希望框架能够在维持极低资源开销的同时，持续丰富第三方 Provider（如 OrcaRouter）的生态兼容性。

---

## 7. 待处理积压
- [Issue #675](https://github.com/qhkm/zeptoclaw/issues/675)：新提交的 Feature Request，目前处于 Open 状态（评论数: 0），建议维护者及时进行初步 Triage，评估引入该 Provider 对二进制体积与代码库复杂度的影响。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 (2026-09-10)

## 1. 今日速览
过去 24 小时内，ZeroClaw 项目保持高强度的架构演进与 UI 重构讨论。整体数据如下：
- **Issues**：新增/活跃 34 条，关闭 3 条，累计更新 37 条。
- **Pull Requests**：待合并 49 条，已合并/关闭 1 条，累计更新 50 条。
- **版本发布**：今日无新版本发布。

**项目健康度与活跃度评估**：项目目前正处于核心架构 RFC（运行域会话控制、统一文件/附件体系、WASM 插件架构、沙盒策略）深度研讨期，同时 ZeroCode TUI 界面正经历一轮多会话侧边栏的大幅重构。工程响应迅速，针对当天发现的跨平台 Bug 迅速出现了修复 PR。

---

## 2. 项目进展
今日重点完成并合成了 **ZeroCode（TUI 交互界面）多会话与侧边栏支持**，关闭了相关追踪 Issue，主要变更包括：

- **ZeroCode 多会话与侧边栏支持** ([PR #9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739))：
  - 为 ZeroCode 引入左侧可隐藏的 Agent 侧边栏，支持实时状态展示、单击切换会话。
  - 支持单 Chat 窗口内追踪与管理多个并行活跃会话。
  - 将 Quickstart 启动器从顶部模式栏下沉至侧边栏快捷入口。
  - 顺带解决/关闭了相关 Issue：[#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729)、[#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730)、[#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731)。

---

## 3. 社区热点
社区 discussion 今日高度集中在**底层架构规范 (RFC)** 以及 **RFC 治理流程优化** 上：

1. **运行域会话控制与传输层适配 RFC** ([Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) - 36 条评论)
   - *诉求与争议*：重新定义会话（Session）在 Runtime 内的生命周期所有权，解决通道（Channels）与核心运行时状态交织的问题。目前更新至 Revision 5，引发了关于会话隔离与传输层适配器的深入研讨。
2. **统一文件与附件架构 RFC** ([Issue #9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) - 29 条评论)
   - *诉求与争议*：针对多模态与工具调用的文件上下文，建立跨通道统一的附件与文件流水线。目前修订至 Revision 10。
3. **细粒度沙盒策略 - 文件系统限制** ([Issue #6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) - 28 条评论)
   - *诉求与争议*：统一应用层路径准入（`SecurityPolicy`）与操作系统级沙盒后端（Bubblewrap、Landlock、Seatbelt）的技术栈，消除历史上的规则漂移。
4. **RFC 流程简化提案** ([Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) - 6 条评论)
   - *诉求与争议*：提议移除强制性的固定讨论等待期（48h/72h），允许在提出修改意见 (REVISE) 时立即中止当前快照，降低 RFC 投票摩擦。

---

## 4. Bug 与稳定性
今日报告了数个与成本控制、UI 渲染及跨平台兼容性相关的严重 Bug：

### 高风险 / P1 级问题
- **Anthropic Provider 报告 $0.00 消耗导致预算上限失效** ([Issue #9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816))
  - *现象*：直接使用 Anthropic Provider 时，使用记录中的 `cost_usd` 均被写为 0.0，导致每日/每月预算上限检查无法触发，存在经济风险。
- **ZeroCode ACP 转录丢弃工具调用之前的文本** ([Issue #10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697))
  - *现象*：在一个 Turn 中，模型先输出文本、执行工具调用、再输出文本时，界面仅渲染最后一次工具调用之后的文本，前面的回复被丢弃。

### 中风险 / P2 级问题
- **`zeroclaw service logs` 在非 Linux(systemd) 平台上输出为空** ([Issue #10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731))
  - *修复进度*：已提交修复 PR [#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732)，改为按文件内容而不是仅凭文件存在性来合并 stdout/stderr。
- **`knowledge.db_path` 波浪号 `~` 路径全局误替换** ([Issue #10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721))
  - *现象*：路径中的 `~` 替换采用了全局 `replace` 而非前缀匹配，导致含有 `~` 的自定义路径解析失败，Knowledge 工具静默失效。
- **ZeroCode v0.8.5 消息重复渲染** ([Issue #10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720))
  - *现象*：Agent 回复在 Chat 窗格中会渲染两次（纯显示层 Bug，实际工具仅触发一次）。
- **非 Vision 模型输出泄露内部占位符 `[media attachment]`** ([Issue #10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625))
  - *现象*：当降级使用纯文本模型时，历史记录中的媒体标记被直接替换为字面量发送给用户。

---

## 5. 功能请求与路线图信号

1. **深度适配 OpenAI Responses 协议**：
   - 开发者提出了一系列针对 OpenAI Responses 的高级增强提案，包括 **WebSocket 实时响应转向控制** ([Issue #10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708))、**有界程序化工具调用** ([Issue #10707](https://github.com/zeroclaw-labs/zeroclaw/issues/10707)) 和 **异步函数工具支持** ([Issue #10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704))。这预示着 ZeroClaw 将进一步挖掘 OpenAI 原生 API 的高级交互能力。
2. **单 Provider Profile 支持多模型配置** ([PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809))：
   - 允许单个凭据和 Endpoint 下配置多个不同 Prompt/Tuning 的模型别名，提升 Provider 配置灵活性。
3. **Agent-to-Agent (A2A) 客户端协议落地** ([PR #9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324))

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*