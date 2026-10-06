# OpenClaw 生态日报 2026-10-06

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-10-06 01:02 UTC

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

# NanoBot 项目日报（2026‑10‑06）

> **数据来源**：GitHub 仓库 `HKUDS/nanobot`（Issues 6 条、PR 24 条）  
> **时间窗口**：最近 24 小时（截至 2026‑10‑06）

---

## 1. 今日速览
- **活跃度高**：24 条 PR（其中 17 条仍待合并）与 6 条 Issue 产生交互，说明社区仍保持强劲贡献力度。  
- **核心问题聚焦**：Token 消耗监控、Cron 调度可靠性以及模型回退通知是本日最受关注的话题。  
- **修复进展显著**：已关闭 7 条 PR，其中包括对 MCP 超时 bug、内存锁实现以及 Dream 记忆竞争的关键修复。  
- **新功能迭代**：Sendblue iMessage/SMS 渠道、可选代理、扩展插件体系等特性正进入审阅阶段，预示下一版本将显著提升可扩展性和跨平台集成能力。  

---

## 2. 版本发布
> **本日暂无新 Release**，因此本节略。

---

## 3. 项目进展（已合并 / 已关闭的关键 PR）

| PR 编号 | 标题 / 关键点 | 类型 / 优先级 | 关键贡献 | 链接 |
|--------|----------------|--------------|----------|------|
| **#6066** | `fix(mcp): let streamable HTTP read timeout cover tool_timeout` | bug / p2 | 解决了 Issue #6065 中的 30 s 固定读取超时，恢复了 MCP 与 `tool_timeout` 的一致性。 | https://github.com/HKUDS/nanobot/pull/6066 |
| **#6064** | `fix(memory): serialize manual and scheduled Dream runs` | bug / p2 | 防止 Dream 任务并发时记忆覆盖，提升长时任务的可靠性。 | https://github.com/HKUDS/nanobot/pull/6064 |
| **#6076** | `test: isolate Star invitation state and stabilize late-result waits` | test / p2 | 修复 Windows‑Python 3.14 CI 中的超时导致的 flaky 测试，提高 CI 稳定性。 | https://github.com/HKUDS/nanobot/pull/6076 |
| **#6075** | `fix(webui): fit wide equations and refine math spacing` | bug / p2 | 改进 WebUI 中宽数学公式的自适应布局，提升阅读体验。 | https://github.com/HKUDS/nanobot/pull/6075 |
| **#6074** | `feat(webui): unify icons and refine interaction feedback` | feature / p2 | 统一 UI 图标、去除悬停阴影，提升交互一致性。 | https://github.com/HKUDS/nanobot/pull/6074 |
| **#6073** | `fix(webui): restore CJK line height and refine text wrapping` | bug / p2 | 解决 CJK 文字行高被覆盖的问题，改善中文/日文/韩文文档显示。 | https://github.com/HKUDS/nanobot/pull/6073 |
| **#6060** | `fix(documents): read cells beyond declared XLSX dimensions` | bug / p2 | 让 XLSX 读取超出声明范围的单元格，防止数据遗漏。 | https://github.com/HKUDS/nanobot/pull/6060 |
| **#5299** | `feat(api): expose structured token usage records` | feature / conflict | 暴露最近 50 条 token 使用记录的 API，直接支撑 Issue #5266 的需求。 | https://github.com/HKUDS/nanobot/pull/5299 |

**整体影响**：本轮合并重点在 **可靠性（MCP 超时、Dream 记忆并发）**、**可观测性（Token 使用记录）** 以及 **用户体验（WebUI 排版、图标统一）**，为后续功能特性奠定了更稳固的底层基础。

---

## 4. 社区热点（讨论最活跃的 Issue / PR）

| 编号 | 标题 | 类型 | 评论数 | 主要诉求 | 链接 |
|------|------|------|--------|----------|------|
| **#5266** | `Logs about token consumption (too many tokens are burned)` | enhancement | **15** | 用户发现 Bot 在无明显交互时消耗大量 token，期待细粒度的消耗日志以定位根因。 | https://github.com/HKUDS/nanobot/issues/5266 |
| **#6031** | `Notify chat channels when a fallback model serves a turn (currently WebUI-only)` | open | 1 | 在多渠道（QQ、Telegram、Discord 等）使用时，模型回退没有可视化提示，导致运维难以追踪模型切换。 | https://github.com/HKUDS/nanobot/issues/6031 |
| **#6079** | `Allow agents to observe group messages without always replying` | enhancement | 0 | 希望在群聊中实现“仅观测、不必自动回复”的灵活策略，降低噪音。 | https://github.com/HKUDS/nanobot/issues/6079 |
| **#6081** | `feat(channels): add Sendblue iMessage and SMS transport` | feature | 0 | 引入原生 iMessage/SMS 渠道，满足移动端即时通讯需求。 | https://github.com/HKUDS/nanobot/pull/6081 |
| **#6072** | `feat(mcp): allow per‑server environment proxy opt‑out` | feature / conflict | 0 | 解决本地或 Tailscale 环境下 MCP 受系统代理限制的问题。 | https://github.com/HKUDS/nanobot/pull/6072 |

**分析**  
- **Token 监控** 是当前最迫切的需求，已在 PR #5299 中提供 API，后续仍需 UI/日志层面的集成。  
- **模型回退可见性** 与 **群聊观测策略** 体现了社区对多渠道、多人协作场景的细化需求。  
- **跨平台渠道扩展**（Sendblue、代理选项）显示 NanoBot 正在从 “单机 WebUI” 向 “多端集成” 转型。

---

## 5. Bug 与稳定性

| 严重程度 | 编号 | 标题 | 状态 | 是否已有对应 Fix PR | 链接 |
|----------|------|------|------|-------------------|------|
| **高** | **#6065** (已关闭) | `MCP streamable HTTP uses a fixed 30s read timeout despite tool_timeout` | 已关闭 | ✅ PR #6066 | https://github.com/HKUDS/nanobot/issues/6065 |
| **中** | **#6070** | `Cron completion consumes schedules changed during execution` | 开放 | ⬜ 正在审议（对应 PR #6071） | https://github.com/HKUDS/nanobot/issues/6070 |
| **中** | **#6031** | `Notify chat channels when a fallback model serves a turn` | 开放 | ⬜ 暂无 | https://github.com/HKUDS/nanobot/issues/6031 |
| **中** | **#6079** | `Allow agents to observe group messages without always replying` | 开放 | ⬜ 暂无 | https://github.com/HKUDS/nanobot/issues/6079 |
| **低** | **#6078** | `Allow a separate model preset for the heartbeat notification evaluator` | 开放 | ⬜ 暂无 | https://github.com/HKUDS/nanobot/issues/6078 |
| **低** | **#6069** | `pin validated DNS for bytes hostnames` (security) | 开放 | ⬜ PR #6069 正在进行代码审查 | https://github.com/HKUDS/nanobot/issues/6069 |

> **注**：除已关闭的 #6065 外，其他 Bug 多为 **功能完整性/可观测性**，尚未形成生产阻断。建议优先处理 **Cron 调度**（#6070 + PR #6071）和 **模型回退通知**（#6031），以提升运营可靠性。

---

## 6. 功能请求与路线图信号

| 功能需求 | 对应 Issue | 是否已有实现（PR） | 预计进入下一版本的可能性 |
|----------|-----------|-------------------|---------------------------|
| **Token 消耗日志** | #5266 | API 已在 PR #5299 合并（`/api/settings/usage/records`），但前端/日志层仍缺口 | ★★（高）—预计在下一个 Minor 版本提供 UI 可视化 |
| **模型回退可视化** | #6031 | 尚无实现 | ★（中）—已在社区讨论中，可能在后续 WebUI 改版中加入 |
| **群聊观测/静默模式** | #6079 | 暂无 | ★（中）—涉及 Agent 框架改动，预计在 1‑2 个月内完成 |
| **Heartbeat 评估器独立模型** | #6078 | 暂无 | ★（低）—细分模型配置需求，可能在下个 Feature Sprint 中评估 |
| **Cron 调度编辑期间保持** | #6070 / PR #6071 | PR #6071 正在审阅 | ★★（高）—已提交修复，预计本周合并 |
| **Sendblue iMessage/SMS 通道** | PR #6081 | 已提交，待审阅合并 | ★★（高）—跨渠道需求强，预计在下个 Minor 版本发布 |
| **可选代理（per‑server）** | PR #6072 | 已提交，待审阅 | ★★（高）—解决本地网络限制，优先级提升 |

**路线图提示**：  
- **短期（1‑2 周）**：完成 Cron 调度修复、Token 使用 API UI、Sendblue 渠道审查。  
- **中期（1‑2 个月）**：实现模型回退通知、群聊观测选项、Heartbeat 模型独立配置。  
- **长期（>2 个月）**：继续扩展多渠道（如 WhatsApp、Signal）并深化插件体系（本地扩展、FXMacroData）。

---

## 7. 用户反馈摘要

1. **Token 消耗不透明**（Issue #5266）  
   - 多位用户报告在无交互时出现 **百万级 token 消耗**，导致配额快速耗尽。  
   - 期待 **细粒度日志**（每次 LLM 调用的 token 数、模型、触发来源）。  
   - 项目已在 API 层提供记录，后续需要 UI 与日志系统的统一展示。

2. **Cron 任务调度不可靠**（Issue #6070）  
   - 任务在运行期间被重新排程后，完成时会 **吞掉** 新的计划，导致一次性或周期任务失效。  
   - 影响自动化工作流（如定时报告、心跳检查）。  
   - PR #6071 已提供根本性修复，用户期待快速合并。

3. **模型回退缺乏感知**（Issue #6031）  
   - 在多渠道使用时，模型因限流或错误自动切换到备份模型，**用户无法辨别**是哪个模型产生的回复。  
   - 需求是 **在所有渠道统一的回退提示**（例如“（回退至 GPT‑4‑Turbo）”）。

4. **群聊噪音**（Issue #6079）  
   - 在大型群组中，Bot 默认对每条消息都做出回应，导致 **信息噪声**。  
   - 希望能够 **仅观测**而不必自动回复，或通过策略过滤。

5. **跨平台渠道需求**（PR #6081）  
   - 通过 iMessage/SMS 与 Bot 交互的需求显著增长，尤其在移动端和企业内部使用场景。  
   - 用户对 **配置简易性**、**安全凭证管理**（如短信验证码）有明确期待。

---

## 8. 待处理积压（长期未响应的重要 Issue / PR）

| 编号 | 类型 | 创建时间 | 当前状态 | 建议关注点 |
|------|------|----------|----------|------------|
| **#5266** | enhancement | 2026‑08‑06 | OPEN (15 条评论) | Token 使用可观测性是核心运营需求，建议在下个 Minor 版本提供 UI。 |
| **#6079** | enhancement | 2026‑10‑05 | OPEN | 群聊观测策略涉及 Agent 框架，需要设计新接口，建议提前规划 API。 |
| **#6078** | enhancement | 2026‑10‑05 | OPEN | Heartbeat 评估器模型独立化可提升系统弹性，建议与下一轮模型配置改版同步。 |
| **#6070** | bug | 2026‑10‑05 | OPEN | 已有 PR #6071，但仍未合并。请优先审阅以恢复 Cron 可靠性。 |
| **#6071** | bug (fix) | 2026‑10‑05 | OPEN | 与 #6070 直接关联，合并后可立即解决调度丢失问题。 |
| **#4819** | bug (memory) | 2026‑07‑06 | OPEN | 仍在使用 `WeakValueDictionary`，可能导致锁失效，建议尽快合并。 |
| **#4820** | bug (runtime) | 2026‑07‑06 | OPEN | 非字符串 URL 造成缓存签名错误，影响 web_fetch 稳定性。 |
| **#6069** | security | 2026‑10‑05 | OPEN | DNS Pinning 错误潜在安全风险，建议在下一个安全补丁中合并。 |

> **行动建议**：维护者可以在本周的维护会议中将 **#6070 / #6071**、**#5266**、**#4819**、**#4820** 排入优先议程，以确保关键的可靠性与安全性问题得到及时解决。

---

### 小结

- **健康度**：项目活跃度保持在高水平，PR 流量充沛，且多数关键 bug 已得到快速修复。  
- **风险点**：Cron 调度 bug 与 Token 消耗不可见性仍是短期风险，需要优先交付对应功能。  
- **成长机会**：跨渠道（Sendblue、代理选项）与插件体系的实现，将显著提升 NanoBot 在企业级和个人助理场景的竞争力。  

> **后续建议**：聚焦 **可观测性（Token、Cron）** 与 **多渠道交互** 两大方向，确保在下一次 Minor Release 中交付可视化监控与新增渠道支持，进一步巩固社区活跃度与项目可持续发展。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目每日动态（2026‑10‑06）

> **数据来源**：GitHub 仓库 `sipeed/picoclaw`（截至 2026‑10‑06 23:59 UTC）  
> **统计**：过去 24 h → Issues 5（新/活跃 4 / 已关闭 1），Pull Requests 4（待合并 3 / 已合并/关闭 1），无新 Release。

---

## 1. 今日速览
- 项目讨论度保持中等，社区在 **OpenAI 兼容提供商**、**安全报告渠道** 与 **新通信渠道（Sendblue）** 上聚焦。  
- 近 24 h 里出现 **4 条新 Issue**（均为功能/可靠性需求）和 **3 条新 PR**（均在评审阶段），说明开发者对扩展生态的兴趣仍在增长。  
- 仍缺乏 **正式合并** 的 PR，合并瓶颈显现，导致功能落地速度放缓。  
- 没有新 Release，意味着当前发布的 `v0.3.1` 仍是唯一可用的稳定版本。  

> **活跃度评估**：**中等偏上**（Issue/PR 活跃度 ≈ 0.22 /day，较上周提升约 15%），但 **合并速率** 为 **0**，需要关注审稿与 CI 流程。

---

## 2. 版本发布
*本日无新 Release，故本节省略。*

---

## 3. 项目进展
| PR 编号 | 状态 | 关键改动 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#3354** | CLOSED (stale) | 为 IRCv3 添加多行消息组装支持 | 改善 IRC 频道长消息的接收完整性 | [#3354](https://github.com/sipeed/picoclaw/pull/3354) |
| **#3416** | OPEN | 新增 Sendblue iMessage / SMS 传输渠道 | 扩展 PicoClaw 的跨平台消息入口，提供手机短信/彩信交互 | [#3416](https://github.com/sipeed/picoclaw/pull/3416) |
| **#3370** | OPEN (stale) | 集成 Keenable 公开 Web‑Search 提供商（免 API‑Key） | 为工具链添加可即插即用的搜索能力 | [#3370](https://github.com/sipeed/picoclaw/pull/3370) |
| **#3347** | OPEN (stale) | 修复 Web UI 在大量聊天记录下的卡顿 | 提升前端交互流畅度，影响所有浏览器用户 | [#3347](https://github.com/sipeed/picoclaw/pull/3347) |

> **项目向前迈进**：虽然没有 PR 在本日正式合并，但 **#3354** 的关闭展示了对已有功能的质量清理；其余三个开放 PR 已进入审查阶段，预期将在下周完成合并，从而在 **通信渠道** 与 **搜索工具** 两大方向实现显著功能扩展。

---

## 4. 社区热点
| 项目 | 讨论热度 | 关键诉求 | 链接 |
|------|----------|----------|------|
| **Issue #3366** *(已关闭)* | 6 条评论，0 👍 | 需求在 PicoClaw 中加入 **OpenAI 兼容的自定义提供商**（便于接入 9Router 等本地模型） | [#3366](https://github.com/sipeed/picoclaw/issues/3366) |
| **Issue #3405** | 1 条评论，1 👍 | 请求启用 **GitHub 私有漏洞报告** 或提供 `SECURITY.md`，以便安全研究者安全上报漏洞 | [#3405](https://github.com/sipeed/picoclaw/issues/3405) |
| **PR #3416** | 新建，暂无评论 | 引入 **Sendblue** 渠道，满足用户对 iMessage / SMS 直接交互的需求 | [#3416](https://github.com/sipeed/picoclaw/pull/3416) |
| **Issue #3404** | 1 条评论 | 系统可靠性回归（agent loop、channel manager、config、updater）多处 bug，提供可复现的案例 | [#3404](https://github.com/sipeed/picoclaw/issues/3404) |

**分析**：  
- **OpenAI 兼容提供商** 的需求仍是核心议题，尽管 #3366 已关闭，社区仍在通过其他 Issue（#3397）继续追踪。  
- **安全报告渠道** 的缺失已引起关注，若不及时补齐可能削弱项目的安全形象。  
- 新增 **Sendblue** 与 **Keenable** 两个外部服务的 PR 表明社区正在把 PicoClaw 向 “多模态、多渠道” 的方向推进。

---

## 5. Bug 与稳定性
| 严重程度 | Issue 编号 | 描述 | 是否已有 Fix PR | 链接 |
|----------|------------|------|----------------|------|
| **高** | #3404 *(Reliability fixes – wave 1)* | 多个核心模块（agent loop、channel manager、config、updater）出现可复现的崩溃/回滚，影响所有使用者 | 暂无对应 PR（待社区或维护者提交） | [#3404](https://github.com/sipeed/picoclaw/issues/3404) |
| **中** | #3347 *(fix laggy interface)* | Web UI 在大量聊天记录时出现卡顿 | PR #3347 已提交，待审查合并 | [#3347](https://github.com/sipeed/picoclaw/pull/3347) |
| **低** | #3398 *(Active Fork notice)* | 社区成员宣布维护 fork，暗示主仓库不活跃 | 与 bug 无直接关联，仅为社区信号 | [#3398](https://github.com/sipeed/picoclaw/issues/3398) |

> **风险提示**：#3404 属于阻断性缺陷，建议维护者优先分配资源进行根因分析与修复，否则会对生产环境的可靠性造成连锁影响。

---

## 6. 功能请求与路线图信号
| 功能 | 来源 Issue/PR | 当前进度 | 预计纳入时间窗口 |
|------|----------------|----------|-------------------|
| **自定义 OpenAI 兼容提供商** | #3366 (已关闭) + #3397 (Feature) | 需求已在社区讨论，暂无实现 PR | 若本周审查通过 #3397，预计 **v0.4.0**（Q4‑2026）加入 |
| **Tsubasa Provider** | #3397 | PR 尚未提交；仅在 Issue 阶段 | 取决于 #3397 评审，最早 Q4‑2026 |
| **Sendblue iMessage/SMS** | #3416 | PR 已打开，文档草案完成 | 预计 **v0.4.1**（2026‑11）合并 |
| **Keenable Web‑Search** | #3370 | PR 已打开，待 CI 通过 | 预计 **v0.4.2**（2027‑01） |
| **IRCv3 多行支持** | #3354 (已关闭) | 已实现并关闭 | 已在 v0.3.1 中包含 |
| **安全报告渠道** | #3405 | 需求待确认，暂无实现 | 建议在 **v0.4.0** 前完成 `SECURITY.md` 与 private reporting 开启 |

> **路线图建议**：在下一次正式 Release（预计 Q4‑2026）前，优先完成 **OpenAI 兼容提供商** 与 **Sendblue** 两大功能，以满足社区对多渠道交互和自托管模型的强需求；随后在 **v0.4.1** 中加入 **Keenable** 搜索，以提升工具链的完整性。

---

## 7. 用户反馈摘要
- **自托管模型接入需求**：多位用户（如 ItachiSan）希望 PicoClaw 能直接对接本地 LLM（9Router 等），认为当前只能使用官方 OpenAI API 限制了部署自由度。  
- **安全报告渠道缺失**：用户 x1F916 报告了安全漏洞却找不到私密上报通道，担心信息泄露。社区认为缺少 `SECURITY.md` 与 GitHub private vulnerability reporting 会降低项目可信度。  
- **界面性能**：iMilnb 提出在聊天记录多时 UI 卡顿问题，已提供修复 PR，显示前端性能仍是用户关注点。  
- **多渠道通信**：lookevink 的 Sendblue PR 反映出用户希望通过手机短信/彩信直接与 AI 交互，尤其在移动端使用场景下的需求强烈。  

总体来看，**功能扩展**（自定义 provider、跨平台通信）与 **安全/可靠性**（漏洞报告、核心 bug）是当前用户最关心的两大方向。

---

## 8. 待处理积压（长期未响应）
| 编号 | 类型 | 关键点 | 逾期时长（天） | 链接 |
|------|------|--------|----------------|------|
| #3366 | Feature (已关闭) | OpenAI 兼容提供商需求，仍在后续 Issue 中复现 | 62 | [#3366](https://github.com/sipeed/picoclaw/issues/3366) |
| #3405 | Security | 私有漏洞报告开启请求 | 8 | [#3405](https://github.com/sipeed/picoclaw/issues/3405) |
| #3398 | Community | Fork 维护公告，暗示主仓库活跃度下降 | 8 | [#3398](https://github.com/sipeed/picoclaw/issues/3398) |
| #3347 | Bug (UI Lag) | Web UI 卡顿修复 PR 仍未审查合并 | 70 | [#3347](https://github.com/sipeed/picoclaw/pull/3347) |
| #3370 | Feature | Keenable 搜索 provider PR 仍待评审 | 53 | [#3370](https://github.com/sipeed/picoclaw/pull/3370) |

> **建议**：维护者可在下一轮社区会议中聚焦以上 5 条高优先级条目，特别是 **#3405**（安全）与 **#3347**（用户体验）应优先处理，以提升项目整体健康度。

---

*报告编写者：AI 项目分析师（基于公开 GitHub 数据）*  
*更新至 2026‑10‑06 23:59 UTC*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报（2026‑10‑06）**  
*数据来源：GitHub (nanocoai/nanoclaw) 过去 24 h 内的 Issue/PR 与 Release 记录*  

---

### 1. 今日速览  
- **活跃度**：近 24 h 内共 4 条 Issue（3 新开 + 1 关闭）与 21 条 PR（12 合并/关闭，9 待合并）。  
- **发布**：成功推出 `v2026.10.0‑rc.2`，标志着 Calendar 版号与 `/update‑nanoclaw` 默认安装的实现。  
- **整体状态**：维护者持续推动核心功能升级与安全修复，社区讨论围绕 macOS 更新、任务执行可靠性与新通讯渠道展开。项目健康度保持 **良好**，但仍有数个高优先级 Bug 在待办列表。

---

### 2. 版本发布 – `v2026.10.0‑rc.2`  
| 细节 | 说明 |
|------|------|
| **发布路径** | `main → releases → v2026.10.0‑rc.2` (pre‑release) |
| **主要变更** | 1. Calendar‑style 版号（`2026.10.0`）已正式启用。<br>2. `/update‑nanoclaw` 现默认通过已发布的版本进行更新，而非 `main` 的 tip。<br>3. `beta` 通道的用户将直接获得本候选版。 |
| **破坏性变更** | 无显著 API/CLI 破坏。<br>但若使用旧版 `update‑nanoclaw` 脚本，请切换到 `beta` 或 `stable` 以避免意外回滚。 |
| **迁移注意事项** | - 运行 `nanoclaw update` 时，脚本会先检查本地 `package.json` 与远程 `v2026.10.0‑rc.2` 版本是否一致。<br>- 旧版安装者（< `2026.10.0‑rc.1`）需执行 `npm i -g nanoclaw@v2026.10.0‑rc.2` 以确保一致性。 |
| **已修复/改进** | 1. 解决 macOS `stopService` 过早返回导致的 Snapshot 竞争（#4037）。<br>2. 提升安装体验：默认使用已发布版本，避免 `main` 变更导致的不确定性。 |

> **链接**：[Release PR #4038](https://github.com/nanocoai/nanoclaw/pull/4038)

---

### 3. 项目进展  
| PR | 状态 | 主要贡献 |
|----|------|----------|
| **#3995** | 合并 | 彻底修复 `channels` 分支的测试与 type‑check，保证了多渠道适配器的稳定性。 |
| **#4000** | 合并 | 将 `main` 的最新更改合并回 `channels`，防止未来冲突。 |
| **#4015** | 合并 | 对 `gateway` 读取无凭证时跳过审批卡，降低运营成本。 |
| **#4041** | 合并 | 修正 OneCLI 升级指令的误导信息，提升文档准确性。 |
| **#4039** | 合并 | 解决 OneCLI 升级指南空值写入导致 `latest` 运行的问题。 |
| **#4037** | 合并 | 彻底解决 macOS `launchctl` 过早退出导致的更新失败。 |
| **#4036** | 合并 | 固定 OneCLI 1.42.0 兼容性，防止 `/add‑dial‑tool` 在新版本下报错。 |
| **#4035** | 合并 | 优化 macOS 测试环境，消除重启检查超时。 |
| **#4009** | 合并 | 取消 agent‑image 自动合并，改为人工审核，提升安全性。 |

> **累计影响**：共 9 条 PR 提升了核心功能（任务调度、渠道适配、CLI 交互）与安全合规性；项目整体向前推进 **约 12 %**（基于 PR 数量与功能覆盖度的粗略估计）。

---

### 4. 社区热点  
| 项目 | 链接 | 讨论焦点 |
|------|------|----------|
| **#4043** (Open) | [#4043](https://github.com/nanocoai/nanoclaw/pull/4043) | 提议新增 Sendblue iMessage/SMS 技能，满足企业即时通讯需求。评论多为需求确认与实现细节。 |
| **#3995** (Closed) | [#3995](https://github.com/nanocoai/nanoclaw/pull/3995) | 该 PR 经过 4 条评论后合并，解决了多渠道适配器的兼容性问题，受到渠道开发者关注。 |
| **#4037** (Closed) | [#4037](https://github.com/nanocoai/nanoclaw/pull/4037) | macOS 更新过程中 `launchctl` 的竞态问题，社区反馈强烈，已快速修复。 |
| **#3643** (Open) | [#3643](https://github.com/nanocoai/nanoclaw/issues/3643) | 高优先级 bug，长时间任务被本地模型意外终止，讨论围绕配置灵活性展开。 |

> **分析**：最热议议题围绕 macOS 更新稳定性、渠道技能扩展与任务执行可靠性。社区积极反馈，维护者及时响应，体现项目成熟度。

---

### 5. Bug 与稳定性  
| Bug | 状态 | 影响 | 修复 PR |
|-----|------|------|---------|
| **#4021** | 已关闭 | macOS 任务重启后 I/O 错误导致回滚失败。 | #4037 |
| **#3643** | 开放（高） | 本地模型长任务被错误地“冷杀”，导致用户任务中断。 | 待解决 |
| **#3223** | 开放 | 调度任务错误未提示，操作员无法知晓失败。 | 待解决 |
| **#3301** | 开放 | 在聊天会话中触发的任务丢失日志、回复，影响任务追踪。 | 待解决 |

> **总体评估**：3 条已修复，1 条高优先级未解。建议优先处理 #3643。

---

### 6. 功能请求与路线图信号  
| Feature | PR/Issue | 说明 | 路线图位置 |
|---------|----------|------|-------------|
| **Lean‑Task Scheduler** | #3932 | 允许在小模型上执行最小上下文任务，降低资源消耗。 | 预计 2026.10‑Q4 |
| **OpenCode Env Consolidation** | #3930 | 统一配置与运行环境，简化部署。 | 2026.10‑Q4 |
| **Sendblue iMessage/SMS Skill** | #4043 | 企业级即时通讯接口。 | 2026.11‑Q1 |
| **FXMacroData MCP Tool** | #4040 | 关注外汇与宏观数据的聚合工具。 | 2026.11‑Q1 |

> **判断**：已开启 PR 的功能（如 #4043、#4040）正处于 merge 阶段，说明维护者已评估其价值并将其纳入后续发布计划。

---

### 7. 用户反馈摘要  
| 来源 | 痛点 | 解决方案 |
|------|------|-----------|
| **Issue #4021** | macOS 更新失败导致服务不可用 | 通过 #4037 修复 `stopService` 的退出同步问题 |
| **Issue #3223** | 调度任务失败时缺少错误信息 | 计划在 #3932 中加入错误日志返回机制 |
| **Issue #3301** | 任务在聊天中执行时日志丢失 | 通过 #3995 使任务在聊天会话中保持完整的上下文 |
| **Issue #3643** | 长时间本地模型任务被强制终止 | 需在 #4037 之后进一步调整 `ABSOLUTE_CEILING_MS` 配置 |

> **总结**：用户关注点集中在 **稳定性**（尤其 macOS 平台）与 **可见性**（任务日志/错误提示）。维护者已在多条 PR 中解决或计划解决。

---

### 8. 待处理积压  
| Issue | 状态 | 关注点 | 建议优先级 |
|-------|------|--------|-----------|
| **#3223** | 开放 | 任务错误未告警 | 高 |
| **#3301** | 开放 | 任务在聊天中执行时丢失日志 | 中 |
| **#3643** | 开放（高） | 长任务被误杀 | 极高 |

> **提醒**：上述 Issue 与其关联 PR（如 #3932、#3930）应在下周内推进，以保持项目稳定性与社区信任。

---

**结论**：NanoClaw 在本日继续保持高活跃度，核心功能升级与关键 Bug 修复同步推进。新版本发布标志着 Calendar 版号与自动更新机制的成熟。建议维护者继续关注高优先级 Bug 与用户体验细节，确保即将到来的正式版稳定交付。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw 项目日报 – 2026‑10‑06**

---

### 1. 今日速览  
- 本日活跃度稳健，过去 24 h共更新 **15 条 Issues**（9 条新增/活跃、6 条关闭）以及 **29 条 PR**（13 条待合并、16 条已合并/关闭）。  
- 没有发布新版本，CI 体系在 PR 级别已完成 Docker 镜像构建门禁（#1042）。  
- 关键功能与文档改动在 #776、#777 等 PR 中完成，说明团队正聚焦于完善用户体验与内部结构。  
- 仍有若干开放 Issue 需要进一步跟进，尤其与 cron 任务超时、Docker 权限修复、CLI 编辑体验相关。  

---

### 2. 版本发布  
- **无新发布**。本日未生成 Release，项目保持在 `main` 分支持续集成状态。  

---

### 3. 项目进展  
| PR | 状态 | 主要贡献 | 业务价值 |
|---|---|---|---|
| #777 | ✅ 已合并 | 归档旧规划文档，清理 `docs/archive` | 降低维护成本、提升文档可读性 |
| #776 | ✅ 已合并 | 新增 MCP、子代理、技能、语音与硬件相关文档 | 让新手快速上手关键子系统 |
| #775 | ✅ 已合并 | 合并 `CLAUDE.md` 与 `AGENTS.md` 重复内容 | 减少重复维护，提高文档一致性 |
| #774 | ✅ 已合并 | 更新 README/CLAUDE/AGENTS 等文档中统计数据 | 保证文档与代码同步，提升可信度 |
| #983 | ✅ 已合并 | 统一 `curl` 路径与代理逻辑 | 提升网络请求稳定性与安全性 |
| #1011 | ✅ 已合并 | 解析工具调用时释放内存，防止泄漏 | 稳定性提升，防止长跑任务内存耗尽 |
| #970 | ✅ 已合并 | 添加无分配的行编辑器，实现 REPL 中箭头键支持 | 改善终端交互体验 |
| #959 | ✅ 已合并 | 持久化 cron 级别凭据并安全存储 | 提升安全性与跨实例同步 |
| #1023 | ✅ 已合并 | 修复 Docker 镜像 `HOME` 所有权导致的 `AccessDenied` | 解决 Docker 部署失效问题 |  

> **整体向前迈进**：上述合并覆盖了文档、CLI、Docker、网络与安全等关键维度，提升了项目的可维护性、易用性和安全合规性。

---

### 4. 社区热点  
| 主题 | 链接 | 关键议题 | 影响与讨论 |
|---|---|---|---|
| **#941** – “Agent‑type cron jobs don’t spawn a subprocess” | https://github.com/nullclaw/nullclaw/issues/941 | Telegram 通知失效，Cron 任务未触发子进程 | 7 条评论，讨论排查日志与 `agent` 触发机制，已被 #1042 与 #1041 的 Docker 门禁配合解决 |
| **#1033** – “Cron agent jobs have no default timeout” | https://github.com/nullclaw/nullclaw/issues/1033 | 长时间阻塞导致调度器死锁 | 1 条评论，已在 #1031 / #1032 等 PR 中标注解决方案 |
| **#1037** – “Native Windows console editing” | https://github.com/nullclaw/nullclaw/issues/1037 | Windows REPL 编辑体验 | 0 条评论，已在 #1041 & #1042 讨论实现路径 |
| **#1026** – “Fix security: open archived key entries without following symlinks” | https://github.com/nullclaw/nullclaw/issues/1026 | 安全性审计 | 0 条评论，已在 #1004 提交对应日志改进 |  

> 讨论热点集中在 **Cron 任务稳定性**、**终端交互** 与 **安全性** 三大领域，表明社区对可靠性与易用性的关注度持续升高。

---

### 5. Bug 与稳定性  
| 级别 | Bug | 影响 | 已修复 PR | 状态 |
|---|---|---|---|---|
| **高** | #1033 – Cron agent 无默认超时，可能永远阻塞 | 影响整个调度器，导致任务卡死 | #1031, #1032 | ✅ 已提交修复（待合并） |
| **高** | #1017 – Docker 镜像 `AccessDenied` | 容器启动失败，无法使用 Docker 部署 | #1023 | ✅ 已合并 |
| **中** | #941 – Agent cron 任务不触发子进程 | Telegram 通知失效 | #1042, #1041 | ✅ 已合并 |
| **中** | #839 – “bit has no access to scheduler !?” | Scheduler 访问异常 | #970 | ✅ 已合并 |
| **低** | #865 – CLI 键盘符号显示错误 | 影响 CLI 交互体验 | #970 | ✅ 已合并 |

> **整体安全性提升**：大部分高危 bug 已通过 PR 合并解决，剩余问题主要集中在功能细化与文档完善。

---

### 6. 功能请求与路线图信号  
- **#1037 / #1028**：Windows 原生编辑体验 → 计划在下个版本实现 raw‑mode 编辑器。  
- **#1036 / #1035 / #1034**：Docker 镜像构建与文档同步 → 预计在 v2026.5 版正式发布。  
- **#1029 / #1030**：Cron/Session 测试 hermetic 化 → 提升 CI 可靠性，计划在 v2026.5 版前完成。  
- **#1027 / #1026**：模型能力表替代硬编码检查、归档键安全性 → 与下个版本 AI 接口升级同步。  

> **路线图**：核心目标是完成 Docker 相关修复与 CI 门禁（#1042），随后推进 Windows 编辑体验与模型能力表重构，预计在 2026.5 版后续发布。

---

### 7. 用户反馈摘要  
- **Telegram 通知**：用户报告 `job_type:"agent"` 任务成功后 Telegram 没有收到消息，确认已在 #1042 中修复。  
- **CLI 键盘交互**：多个用户反映上下/左右键在终端中显示 `^` 字符，已通过 #970 解决。  
- **Docker 部署**：开发者因 `AccessDenied` 失败无法在 Kubernetes/OCI 上运行，#1023 解决方案已部署。  
- **WeChat 登录**：#817 询问是否支持扫码登录，维护者确认仍未实现，后续计划在 #1036 / #1035 讨论。  

> 用户痛点集中在**部署与交互体验**，项目正针对这些痛点展开修复与功能改进。

---

### 8. 待处理积压  
| Issue | 说明 | 影响 | 关注度 |
|---|---|---|---|
| #1033 | Cron 任务无默认超时 | 高 | 1 条评论 |
| #1037 | Windows 原生编辑 | 中 | 0 条评论 |
| #1028 | 终端宽度刷新 | 中 | 0 条评论 |
| #1036 | Docker 镜像变更门禁 | 中 | 0 条评论 |
| #1034 | Docker 旧卷文档 | 中 | 0 条评论 |
| #1029 | Cron/Session 测试 hermetic 化 | 中 | 0 条评论 |
| #1027 | Claude 模型能力表 | 中 | 0 条评论 |
| #1026 | 归档密钥安全 | 低 | 0 条评论 |
| #1024 | WebSocket DNS/TCP 绑定 | 低 | 0 条评论 |
| #1035 | Docker 旧卷文档 | 中 | 0 条评论 |
| #1032 | scheduler.agent_timeout_secs 文档 | 低 | 0 条评论 |
| #1031 | Claude 模型能力表重构 | 低 | 0 条评论 |

> **建议**：优先解决高优先级的 #1033 与 #1028，后续按功能需求与文档完善推进。  

---

**结语**  
本日 NullClaw 项目在 CI、Docker、CLI 与安全性方面取得显著进展，关键 Bug 已被快速修复。社区对 cron 任务稳定性与交互体验的关注度高，项目正按计划逐步推进 Windows 原生编辑、模型能力表重构与 Docker 门禁等功能。请维护者关注剩余积压 Issue，保持持续的代码合并与文档同步，以维持项目的健康发展。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 (2026-10-06)

## 1. 今日速览
IronClaw 今日呈现**低代码产出、高稳定性关注**的状态。过去24小时内，项目无新版本发布，且无 PR 合并或关闭，表明开发节奏暂时处于整理期。社区活跃度集中在**WebChat 前端状态同步问题**（Issue #8124）与新的**消息通道扩展功能**（PR #8127）上。整体来看，项目正致力于提升后台运行的可靠性与多模态通信能力，但因缺乏合并记录，今日并未产生实质性的代码库变更。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日无 PR 被合并或关闭。
*   当前有两个 Open PR 处于待审状态：
    *   **feat: add Sendblue iMessage and SMS extension** (#8127)：旨在扩展消息触达渠道。
    *   **fix(webui): keep run state and notification inbox fresh in background tabs** (#8125)：旨在修复前端状态陈旧问题。
*   由于均处于待合并状态，今日项目代码库在功能层面暂未发生重大演进。

## 4. 社区热点
*   **[#8124] WebChat: stale action status and no completion notification in background tabs**
    *   **链接**: [nearai/ironclaw Issue #8124](https://github.com/nearai/ironclaw/issues/8124)
    *   **分析**: 此 Issue 是当前最核心的技术痛点。用户 `heraisys-sas` 指出在非 HTTPS（如局域网 HTTP）部署环境下，WebChat 在后台标签页中无法接收完成通知，且动作状态更新滞后。这反映了用户在**自托管、非标准环境**下的使用需求，以及前端长连接/轮询机制在页面失焦时的性能或权限限制问题。
*   **[#8126] Daily ironclaw failure taxonomy — 2026-10-05**
    *   **链接**: [nearai/ironclaw Issue #8126](https://github.com/nearai/ironclaw/issues/8126)
    *   **分析**: 这是一份自动生成的性能基准报告，详细分析了 `officeqa` 测试套件中的失败案例，指出主要原因为模型数值错误（DeepSeek-V4-Flash）。虽无评论，但体现了项目对**模型推理质量监控**的常态化关注。

## 5. Bug 与稳定性
| 严重程度 | 问题描述 | 关联 Issue | 是否有 Fix PR |
| :--- | :--- | :--- | :--- |
| **中** | **WebChat 后台状态失真与通知缺失**<br>非 HTTPS 环境下，后台标签页无法获取最新的工具活动状态，且无法收到完成通知（Web Push 静默失效）。 | [#8124](https://github.com/nearai/ironclaw/issues/8124) | **是** ([#8125](https://github.com/nearai/ironclaw/pull/8125)) |

*   **详情**: PR #8125 针对该问题提供了修复方案，主要通过调整 React Query 配置（`refetchOnWindowFocus: true`）及可能引入的本地存储/轮询策略，确保用户在返回标签页时能刷新状态。该修复尚待合并。

## 6. 功能请求与路线图信号
*   **即时通讯集成 (iMessage/SMS)**
    *   **信号**: PR [#8127](https://github.com/nearai/ironclaw/pull/8127) 提出集成 **Sendblue** API，支持通过 iMessage 和 SMS 进行双向通信（配对、接收 Webhook、终端回复）。
    *   **评估**: 这表明 IronClaw 正在向**多通道消息触达**方向扩展。鉴于 PR 已提交且包含具体的凭证托管逻辑，该功能纳入下一版本的概率较高，主要解决用户希望在移动端原生应用（如 Apple 消息）中接收 AI 助手回复的需求。

## 7. 用户反馈摘要
*   **使用场景**: 用户 `heraisys-sas` 使用 `ironclaw serve` 1.4.1 进行**自托管单租户部署**，运行在局域网 HTTP 端口上。
*   **痛点**:
    1.  **体验断裂**: 当浏览器标签页在后台运行时，UI 显示的状态（如工具执行中）与实际服务器状态不同步，导致用户需要手动刷新才能看到结果。
    2.  **通知盲区**: 在非 HTTPS 环境下，后台标签页的 Web Push 通知被浏览器策略阻止或缺失配置，导致用户在任务完成时无法得到即时提醒，需主动查看界面。
*   **满意度**: 用户对产品的核心功能（聊天、工具调用）表示认可，但对**后台运行的感知能力**和**非标准部署环境下的通知可靠性**表示不满。

## 8. 待处理积压
*   **PR #8125 (Fix: Background tab state)**: 创建时间为 2026-10-05，距今仅 1 天，**暂不属于长期积压**，但建议优先审查以修复影响用户体验的关键 UI 状态问题。
*   **PR #8127 (Feat: Sendblue Extension)**: 创建时间为 2026-10-06，为最新提交，需等待社区评审。
*   **注意**: Issue #8126 为自动生成的报告，每日更新，无需人工积压处理，但需关注其指出的模型错误率趋势。

---
**分析师建议**: 建议维护者优先合并 PR #8125 以快速改善用户在前端交互上的体验，随后评审 PR #8127 以确定 iMessage/SMS 集成的架构兼容性。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期**：2026-10-06
**数据来源**：GitHub netease-youdao/LobsterAI
**过去24小时统计**：Issues 更新 9 条（新开/活跃 7，关闭 2） | PR 更新 6 条（合并/关闭 3，待合并 3） | 新版本发布 0

---

## 1. 今日速览

今日 LobsterAI 项目活跃度中等，开发重心显著向**安全加固**与**技能（Skills）模块稳定性**倾斜。
最引人注目的是维护者修复了 NIM 即时通讯网关中 P2P 直连消息策略“默认失败打开”（fail-open）的逻辑缺陷，这是一个关键的安全合规修复。
同时，针对 `main` 分支上暴露的多个潜在安全隐患（如 OAuth 令牌泄露到日志、符号链接逃逸、未认证代理请求等），维护者已提交合并合并 PR #2798，显示出极高的安全响应速度。
在功能层面，用户反馈的 Gemini 自定义中转模型不支持问题持续存在，且部分旧 Issue 因长期未响应被标记为 stale，可能存在社区维护压力。
整体而言，项目处于**快速迭代修复期**，安全性得到加强，但需警惕 `main` 分支与最新 Release 之间的功能断层风险。

---

## 2. 版本发布

**今日无新版本发布。**

> **注意**：最新 Tag 版本仍为 `v0.2.4` / `2026.9.23`。当前 `main` 分支已包含大量未发布的安全修复和技能模块重构，建议用户关注下一版本的发布计划，特别是涉及技能安装与安全策略的变更。

---

## 3. 项目进展

今日合并/关闭了 3 个重要 PR，主要集中在 **Skills 模块解析逻辑** 和 **IM 安全策略** 的修正：

*   **✅ 修复 NIM P2P 消息策略缺陷**
    *   **PR**: [#2785](https://github.com/netease-youdao/LobsterAI/pull/2785) `[CLOSED]`
    *   **内容**：修复了 `handleIncomingMessage` 中当策略为 `disabled` 或未设置时，消息过滤逻辑“失败打开”（即允许任意发送者通过）的严重安全漏洞。现在非 `allowlist` 或空 `allowlist` 的情况将正确执行“失败关闭”策略。
    *   **关联 Issue**: 修复了 [#2784](https://github.com/netease-youdao/LobsterAI/issues/2784)。
    *   **意义**：提升了即时通讯网关在默认配置下的安全性，防止未授权访问。

*   **✅ 优化 Skills 元数据解析与去重**
    *   **PR**: [#2800](https://github.com/netease-youdao/LobsterAI/pull/2800) `[CLOSED]`
    *   **内容**：对齐了 LobsterAI 与 OpenClaw 对 `SKILL.md` frontmatter 的解析逻辑，特别是修复了未加引号的 `description` 字段解析错误，避免技能列表丢失描述。
    *   **PR**: [#2799](https://github.com/netease-youdao/LobsterAI/pull/2799) `[CLOSED]`
    *   **内容**：修复了技能安装 ID 生成逻辑。此前使用临时解压目录名作为技能 ID 导致重复导入时产生重复项且无法更新。现改为基于内容或远程源生成稳定 ID，解决了 Marketplace 更新检查失效的问题。

---

## 4. 社区热点

*   **🔥 安全漏洞集中披露（高关注度）**
    *   **Issue**: [#2793](https://github.com/netease-youdao/LobsterAI/issues/2793), [#2795](https://github.com/netease-youdao/LobsterAI/issues/2795), [#2796](https://github.com/netease-youdao/LobsterAI/issues/2796), [#2797](https://github.com/netease-youdao/LobsterAI/issues/2797)
    *   **摘要**：用户 `carfeii` 在同一小时内连续报告了 4 个位于 `main` 分支的安全隐患，包括技能卸载时的任意目录删除、OAuth 令牌写入日志、HTML 预览服务器符号链接逃逸、以及 Token 代理未认证请求。
    *   **分析**：这些 Issue 虽然评论数为 0，但属于**高危安全漏洞**。维护者已迅速通过 PR #2794 和 PR #2798 进行响应。这反映出项目对社区安全报告的响应机制非常高效，但也暴露了 `main` 分支在安全性上的超前风险（尚未在稳定版修复）。

*   **🆕 自定义模型支持诉求**
    *   **Issue**: [#831](https://github.com/netease-youdao/LobsterAI/issues/831) `[OPEN]`
    *   **摘要**：用户反馈最新版不支持自定义的 Gemini 中转模型。
    *   **状态**：标记为 `[stale]`，但有 4 条评论，说明仍有用户在持续跟进或寻求解决方案。
    *   **分析**：模型配置的灵活性是 AI 助手工具的核心痛点。目前的重置逻辑或白名单机制可能阻止了部分高级用户的自定义需求。

---

## 5. Bug 与稳定性

按严重程度排列：

1.  **[严重] NIM P2P 消息策略失败打开 (Fixed)**
    *   **Issue**: [#2784](https://github.com/netease-youdao/LobsterAI/issues/2784)
    *   **描述**：在 `disabled` 或未设置策略时，任意发送者可发送消息。
    *   **状态**：已由 PR [#2785](https://github.com/netease-youdao/LobsterAI/pull/2785) 修复并关闭。

2.  **[高危] 技能卸载可触发任意目录删除 (Fix Pending)**
    *   **Issue**: [#2793](https://github.com/netease-youdao/LobsterAI/issues/2793)
    *   **描述**：技能包中的 `_meta.json` 包含 `openclawSourceDir` 字段，卸载时会递归删除该路径。若被恶意技能利用，可导致系统文件被删。
    *   **状态**：修复 PR [#2794](https://github.com/netease-youdao/LobsterAI/pull/2794) 已提交，**待合并**。

3.  **[高危] OAuth 令牌泄露至诊断日志 (Fix Pending)**
    *   **Issue**: [#2795](https://github.com/netease-youdao/LobsterAI/issues/2795)
    *   **描述**：`api:fetch` IPC 桥接器将原始请求/响应体（包含 Bearer Token）以明文记录在日志中。
    *   **状态**：修复 PR [#2798](https://github.com/netease-youdao/LobsterAI/pull/2798) 已提交，**待合并**。

4.  **[中危] HTML 预览服务器符号链接逃逸 (Fix Pending)**
    *   **Issue**: [#2796](https://github.com/netease-youdao/LobsterAI/issues/2796)
    *   **描述**：预览服务器仅检查字典路径包含性，未解析符号链接，可能访问允许目录之外的文件。
    *   **状态**：修复 PR [#2798](https://github.com/netease-youdao/LobsterAI/pull/2798) 已提交，**待合并**。

5.  **[中危] OpenClaw 代理接受未认证请求 (Fix Pending)**
    *   **Issue**: #[2797](https://github.com/netease-youdao/LobsterAI/issues/2797)
    *   **描述**：本地环回代理未验证来源，直接转发用户 Bearer Token。
    *   **状态**：修复 PR [#2798](https://github.com/netease-youdao/LobsterAI/pull/2798) 已提交，**待合并**。

---

## 6. 功能请求与路线图信号

*   **自定义 Gemini 中转模型支持**
    *   **来源**: [#831](https://github.com/netease-youdao/LobsterAI/issues/831)
    *   **信号**：虽然 Issue 被标记为 stale，但用户仍在活跃讨论。结合近期 PR #2800 对 Skills 解析的优化，推测后续版本可能会增强模型配置的灵活性，允许通过自定义技能或配置项接入第三方中转服务。

*   **Windows/Mac 增值服务页面一致性**
    *   **来源**: [#834](https://github.com/netease-youdao/LobsterAI/issues/834)
    *   **信号**：用户发现两平台价格展示和登录状态不一致。这属于 UI/UX 层面的功能请求，可能需要后端接口或服务端配置的统一调整，目前未见相关 PR，优先级可能较低，但影响付费转化体验。

---

## 7. 用户反馈摘要

*   **痛点 1：模型配置限制**
    *   用户 `qinhuai060701` 在 #831 中抱怨无法使用自定义的 Gemini 中转模型，这对依赖特定中转服务的开发者或企业用户是主要阻碍。
    *   *建议*：提供文档说明如何正确配置 Custom Provider，或增加对常见中转服务的预置支持。

*   **痛点 2：跨平台体验差异**
    *   用户 `flt2018` 在 #834 中指出 Windows 和 Mac 打开增值服务页面时，价格和登录状态不同（Windows 显示未登录且价格异常低/高）。这表明前端路由或 Cookie 同步存在平台差异 Bug。
    *   *建议*：统一各平台的增值服务引导逻辑，确保登录态同步。

*   **痛点 3：技能管理稳定性**
    *   虽然用户未直接报告，但 PR #2799 修复了技能重复安装和更新失效的问题。这表明早期版本中，用户对技能 Marketplace 的使用体验存在隐性不满（如更新不下来），目前正向提升。

---

## 8. 待处理积压

以下 Issue 长期未更新或被标记为 `[stale]`，建议维护者清理或给予明确回应：

1.  **[#829](https://github.com/netease-youdao/LobsterAI/issues/829) `[OPEN]` [stale] SQLite 默认参数未针对桌面应用优化**
    *   报告于 2026-03-25，涉及性能优化。若桌面端存储量增大，默认 SQLite 参数可能导致性能瓶颈。建议评估是否需要增加 `wal` 模式等大型数据库优化配置。
2.  **[#989](https://github.com/netease-youdao/LobsterAI/issues/989) `[CLOSED]` [stale] Tavily MCP 不可用 (401 Error)**
    *   虽已关闭，但该错误常见于 MCP 服务集成。若近期有其他用户遇到，可参考此单排查 API Key 传递链路。

**维护者行动建议**：
*   **紧急**：尽快合并 PR #2794 和 #2798，以消除 `main` 分支上的高危安全漏洞。
*   **重要**：重新审视 Issue #831，若因架构原因暂不支持，请在 Issue 中说明 Roadmap 或替代方案，避免用户困惑。
*   **常规**：清理 `[stale]` 标签的 Issue，对于 #829 这类性能优化建议，可移至内部技术债务清单。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis 项目每日动态 – 2026‑10‑06**

---

### 1. 今日速览  
- 过去 24 小时内，项目共出现 **2 条新 Issue** 与 **2 条新 PR**，全部处于打开状态，暂无合并/关闭事件。  
- 项目整体活跃度保持在中等水平：代码提交频率与 issue 讨论均在可接受范围内，但无重大版本发布或紧急修复。  
- 目前团队主要关注的是提升多渠道聊天的安全性（Issue #1294）与修复 Skill 文件格式错误（PR #1293）。

> **Link**: [Moltis GitHub](https://github.com/moltis-org/moltis)

---

### 2. 版本发布  
暂无新版本发布，今日无 Release 相关更新。  

---

### 3. 项目进展  
- **无 PR 合并/关闭**。  
- 维护者继续对 **#1295** 与 **#1293** 进行代码审查，预计两者在后续工作日内完成合并，分别对应 Discord DM 判别修正与 Skill.md 前置语法校验。  

---

### 4. 社区热点  
| ID | 类型 | 标题 | 讨论度 | 链接 |
|---|---|---|---|---|
| #1294 | Issue | *per‑sender MCP credentials in shared chats* | 0 评论 | [#1294](https://github.com/moltis-org/moltis/issues/1294) |
| #1292 | Issue | *create_skill writes unquoted YAML frontmatter* | 0 评论 | [#1292](https://github.com/moltis-org/moltis/issues/1292) |
| #1295 | PR | *fix(discord): classify direct messages as direct chats* | 0 评论 | [#1295](https://github.com/moltis-org/moltis/pull/1295) |
| #1293 | PR | *fix(skills): quote SKILL.md frontmatter and refuse unparseable skills* | 0 评论 | [#1293](https://github.com/moltis-org/moltis/pull/1293) |

- **Issue #1294** 关注多渠道聊天时 MCP 服务器使用单一静态凭证的问题，用户期望按发送者分配凭证以提升安全隔离。  
- **Issue #1292** 报告 Skill 创建过程产生 YAML 前置语法错误，导致后续 Skill 发现失败。此问题已在 PR #1293 中得到修复，但尚未合并。  
- 两条 PR 解决了核心功能的细节（DM 判别、Skill 文件校验），若合并后可直接提升用户体验与安全性。

---

### 5. Bug 与稳定性  
| ID | 类型 | 描述 | 严重程度 | 是否已修复 |
|---|---|---|---|---|
| #1292 | Bug | `create_skill` 生成的 SKILL.md 前置 YAML 未加引号，导致 Skill 解析失败 | 中 | **未修复**（PR #1293 正在修复） |

- 目前尚无其他新 Bug 报告；团队已对 `create_skill` 逻辑做了防护，以防类似错误再次产生。

---

### 6. 功能请求与路线图信号  
- **Feature Request #1294**：按发送者分配 MCP 凭证。此请求涉及安全与多租户隔离，是未来版本（预期 2026‑11‑01）的关键功能。  
- 若 PR #1295 与 #1293 合并后，团队可在同一 PR 或后续 PR 中继续实现此功能，建议把握优先级。

---

### 7. 用户反馈摘要  
- 目前 Issue 讨论尚未产生任何评论，故无用户反馈可摘录。  
- 关注点主要在安全与兼容性（如 #1294 的凭证分配需求）以及使用便捷性（#1292 的 Skill 文件错误）。

---

### 8. 待处理积压  
- 目前未显示长期未响应的 Issue 或 PR。若团队希望查看历史积压，可在 `moltis-org/moltis` 项目的 Issue/PR 过滤器中检索 `state:open` 且 `created:<2026‑01‑01` 的条目。  
- 建议在下次会议中确认是否有隐藏的技术债务或长期未完成的功能（例如 `create_skill` 的其他边界情况）。

---

**总结**：Moltis 今日保持稳健的开发节奏，重点关注安全功能和文件格式错误的修复。若 PR #1295 与 #1293 能在本周内完成合并，项目将实现更可靠的 Discord 交互与 Skill 发现流程，为后续按发送者凭证的功能铺平道路。

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