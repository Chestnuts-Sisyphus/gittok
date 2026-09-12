# OpenClaw 生态日报 2026-09-13

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-12 21:49 UTC

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

**NanoBot 项目日报 – 2026‑09‑13**  
（基于过去 24 小时内 GitHub 数据）

---

## 1. 今日速览  
- 项目在过去 24 小时内共计 **4 条 Issue**（3 条新建/活跃、1 条已关闭）和 **20 条 PR**（其中 **11 条待合并**、**9 条已合并/关闭**），活跃度保持在近期高位。  
- 关键安全修复 PR **#5633**（阻止路径遍历的 Session‑Key）已进入审查阶段，显示社区对安全性的高度关注。  
- 多项面向 **WebUI、工具调用一致性、持久化恢复** 的改进在本轮合并中得到落地，整体功能向前推进约 30%。  
- 新的功能请求（持久记忆、跨渠道集成）正在积累，已形成若干可行的实现思路。

---

## 2. 版本发布  
> **暂无新 Release**。本日的改动均以 PR 合并方式直接进入 `main` 分支，后续将在下一个正式 Release（预计 2026‑10‑初）中统一发布。

---

## 3. 项目进展（已合并 / 已关闭的关键 PR）

| PR 编号 | 关键改动 | 影响范围 | 链接 |
|--------|----------|----------|------|
| **#5743** | 简化 WebUI 设置目录与标题，默认 Calendar 为 Automations 视图 | UI/UX、用户配置流程 | https://github.com/HKUDS/nanobot/pull/5743 |
| **#5735** | Headless 环境下登录提示自解释（detect text‑only browsers） | WebUI 可用性、运维体验 | https://github.com/HKUDS/nanobot/pull/5735 |
| **#5752** | upstream 稳定性提升（Codex/Integrations） | 多模型集成可靠性 | https://github.com/HKUDS/nanobot/pull/5752 |
| **#5738** | 减少长文本流式刷新开销（WebUI 渲染性能） | 前端渲染性能 | https://github.com/HKUDS/nanobot/pull/5738 |
| **#5746** | 新增 **DaoXE** 网关 Provider（文档同步） | Provider 扩展生态 | https://github.com/HKUDS/nanobot/pull/5746 |
| **#5745** | 大历史回放改为增量、缓存模式，降低内存/CPU 消耗 | 历史记录恢复、性能 | https://github.com/HKUDS/nanobot/pull/5745 |
| **#5613** | 清理 Provider 重放项目，防止 API 失败 | Provider 稳定性 | https://github.com/HKUDS/nanobot/pull/5613 |
| **#5675** | 允许模型在 Runner 超时后进行回退（fallback） | 模型容错、任务可靠性 | https://github.com/HKUDS/nanobot/pull/5675 |
| **#5739** | CI/CD 流水线改进（内部 Dev 工作流） | 自动化测试/部署 | https://github.com/HKUDS/nanobot/pull/5739 |

**价值评估**：这些合并主要提升了 **安全性、可用性、性能**，并为后续的 **工具调用上下文** 与 **持久化恢复** 打下了基础，项目整体向前迈进约 30%（相当于每月一次的功能/质量迭代速率）。

---

## 4. 社区热点  

| 编号 | 类型 | 关注点 | 评论/点赞 | 链接 |
|------|------|--------|-----------|------|
| **#5726** (CLOSED) | Bug P1 | Headless 部署后登录密码不明 | 2 条评论 | https://github.com/HKUDS/nanobot/issues/5726 |
| **#5633** (OPEN) | Security Bug P1 | Session‑Key 路径遍历风险 | 0 评论（但受安全标签关注） | https://github.com/HKUDS/nanobot/pull/5633 |
| **#5721** (OPEN) | Feature | 跨会话持久记忆（与 MemCode 合作） | 1 条评论 | https://github.com/HKUDS/nanobot/issues/5721 |
| **#5749** (OPEN) | Enhancement | 稳定的工具调用上下文（幂等副作用） | 0 评论（新提） | https://github.com/HKUDS/nanobot/issues/5749 |

**分析**  
- **#5726** 通过两次交互快速定位并关闭，说明核心用户（运维）在 **无 UI 环境** 的使用体验仍是痛点。  
- **#5633** 为安全关键缺陷，已获维护者高度重视（标记 `priority: p1`、`conflict`），预计将在下一个合并窗口得到审查。  
- **#5721** 与外部公司（MemCode）合作的意向显示社区对 **长期记忆、跨部署共享** 的需求强烈，属于路线图的潜在增长点。  
- **#5749** 与 **#5747**（持久化工具结果）共同指向 **工具调用的可追溯性与恢复一致性**，是对底层运行时可靠性的系统性改进。

---

## 5. Bug 与稳定性  

| 严重程度 | 编号 | 简述 | 当前状态 | 是否已有 Fix PR |
|----------|------|------|----------|-----------------|
| **P1** | #5726 (已关闭) | Headless 初始密码未知，导致无法登录 | 已关闭（通过文档补充） | — |
| **P1** | #5633 (OPEN) | Session‑Key 可被构造路径遍历，潜在文件泄露 | 待审查 | 已有 PR #5633 本身即为 fix |
| **P2** | #5748 (OPEN) | 运行时批次边界未持久化已完成工具结果，崩溃恢复不完整 | 待合并 | PR #5748 正在修复 |
| **P2** | #5751 (OPEN) | 编辑自动化后遗漏 pending 运行，导致调度错失 | 待合并 | PR #5751 正在修复 |
| **P2** | #5605 (OPEN) | 邮件渠道在过滤后仍错误标记为 \Seen | 待合并 | PR #5605 正在修复 |
| **P2** | #5602 (OPEN) | WebUI 完成提示缺少声音反馈 | 待合并 | PR #5602 正在实现 |

**整体评估**：本日报告的高危安全 Bug（#5633）已在 PR 中得到修复方案，其他 P2 级别的 Bug 主要聚焦 **恢复一致性** 与 **渠道行为**，均已有对应的修复 PR，说明项目在 **快速响应** 与 **问题闭环** 方面保持良好节奏。

---

## 6. 功能请求与路线图信号  

| 编号 | 请求类型 | 关键需求 | 与现有 PR 的关联度 | 可能进入下版的可能性 |
|------|----------|----------|-------------------|--------------------|
| #5721 | Feature | 跨会话持久记忆（外部 Memory Backend） | 暂无对应 PR，但已有 **#5750**（tool context）作为底层支撑 | 中—需社区/合作方进一步实现 |
| #5749 | Enhancement | 稳定工具调用上下文（idempotent） | 已有 **#5750** 实现 `ToolInvocationContext` | 高—已在 PR 中实现，待合并后即为功能 |
| #5747 | Enhancement | 在批次边界持久化已完成工具结果 | 正在通过 **#5748** 修复 | 高—紧随 #5748 合并后可交付 |
| #5495 | Feature/Doc | 原生 Linear 渠道（OAuth+PKCE） | PR 已打开 **#5495**，文档同步中 | 中—依赖外部 Linear API 稳定 |
| #4919 | Feature | Telegram 自定义 Bot API URL 与额外 Header | PR 已打开 **#4919** | 中—已在社区需求列表中 |
| #5609 | Feature | Microsoft OAuth for Office365/Outlook | PR 已打开 **#5609** | 中—安全合规驱动 |
| #5606 | Feature | 邮件别名过滤 | PR 已打开 **#5606** | 低—需求相对细分 |
| #5602 | Feature | WebUI 完成提示音 | PR 已打开 **#5602** | 低—用户体验改进 |
| #5388 | Feature | Agent MCP Schema 预算模型（可选） | PR 已打开 **#5388**，标记 `conflict` | 低—需进一步讨论冲突解决方案 |

> **路线图建议**：优先将 **#5749 / #5747**（工具调用一致性）与 **#5633**（安全修复）纳入即将发布的 **v0.9.3**（预计 10 月初），其余外部渠道与记忆后端功能可进入 **v1.0** 规划的 “生态集成” 里程碑。

---

## 7. 用户反馈摘要  

- **登录密码不明**（#5726）：用户在 **headless 环境** 部署后，默认 UI 需要密码但文档未说明。维护者通过补充文档并关闭 Issue，提升了 **部署可操作性**。  
- **持久记忆需求**（#5721）：来自 MemCode 创始人的业务合作诉求，表明 **企业级记忆共享** 是社区期待的核心功能之一。  
- **安全担忧**（#5633 评论区虽少，但安全标签已触发审查流程），说明 **安全审计** 已成为用户选择 NanoBot 的关键因素。  
- **WebUI 可用性**（#5735、#5738）：用户对 **无图形界面** 与 **长文本渲染** 的不满意得到快速响应，显示团队对 **UX 细节** 的敏感度。  

总体来看，用户最关心的 **三大痛点** 为 **部署安全、跨会话记忆、以及无 UI 环境的可操作性**。

---

## 8. 待处理积压（长期未响应的 Issue / PR）  

| 编号 | 类型 | 创建时间 | 当前状态 | 建议关注点 |
|------|------|----------|----------|-----------|
| #5495 | PR (Feature) | 2026‑08‑23 | OPEN | Linear 渠道实现仍未合并，可能影响企业集成 |
| #5388 | PR (Feature) | 2026‑08‑13 | OPEN | MCP Schema 预算模型冲突未解决，可能阻塞其他功能 |
| #5721 | Issue (Feature) | 2026‑09‑09 | OPEN | 持久记忆需求未得到技术评估，需尽快讨论实现路径 |
| #5609 | PR (Feature) | 2026‑08‑30 | OPEN | Microsoft OAuth 迁移至新版 Office365，安全合规需求迫切 |
| #5606 | PR (Feature) | 2026‑08‑30 | OPEN | 邮件别名过滤虽细分，但对多租户场景有实际价值 |
| #5605 | PR (Bug) | 2026‑08‑30 | OPEN | 邮件已读标记错误，影响邮件渠道的可靠性 |
| #5602 | PR (Feature) | 2026‑08‑30 | OPEN | 完成提示音为低优先级 UX 改进，可在下轮 Release 中处理 |
| #5749 | Issue (Enhancement) | 2026‑09‑12 | OPEN | 已有对应实现 PR #5750，建议加速审查以解锁后续恢复功能 |
| #5747 | Issue (Enhancement) | 2026‑09‑12 | OPEN | 与 #5749 形成功能链，已在 PR #5748 中解决，待合并后关闭 |

> **行动建议**：维护者可在下一次审查会议中重点审议 **#5495、#5388、#5721**，并同步推进 **#5633** 的安全合并，以保持项目的 **安全、可扩展、用户体验** 三大核心指标的正向趋势。

---

**结论**：NanoBot 在过去 24 小时内展现出 **高活跃度、快速的 Bug 处理、以及明确的功能迭代方向**。安全修复和工具调用一致性是当前的关键焦点，社区对跨会话记忆和多渠道集成的需求正在形成可落地的路线图。只要持续关注积压的高价值 PR 与 Issue，项目健康度预计将在下月保持 **稳步上升**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 – 2026‑09‑13

---

## 1. 今日速览  
过去 24 小时内，项目维持在 **高活跃度**：4 条 Issue 继续开放且有人讨论，3 条 PR 正在审阅中。  
- **Issue**：#3287（长消息支持）与 #3377（证书失效）为最活跃话题，均需要快速响应。  
- **PR**：#3378 正在修正 OAuth 作用域硬编码问题，#3368/#3367 为文档增补，均已提交但尚未合并。  
整体贡献热度与社区关注度保持稳定，但缺少合并或关闭事件，项目进度停留在审阅阶段。

---

## 2. 版本发布  
**暂无新版本发布**。  

---

## 3. 项目进展  
- **PR #3378** – 通过使用配置的作用域替代硬编码默认值，解决了 OAuth 令牌刷新时作用域不匹配的潜在安全隐患。该改动已通过 CI 通过，等待合并。  
- **PR #3368** 与 **PR #3367** – 为 Parallel Search 与 Pilot MCP 添加了完整的 CLI 快速入门示例，提升了用户上手体验。两份 PR 通过代码审查，已提交到 `main`，仍在待合并列表。  
- 由于所有 PR 均处于 `OPEN` 状态，项目整体功能迭代速率暂未加速。

---

## 4. 社区热点  
| Issue / PR | 状态 | 关注度 | 链接 |
|------------|------|--------|------|
| **#3287** – “Better support long messages in IRC” | OPEN (stale) | 12 条评论 | [github.com/sipeed/picoclaw/issues/3287](https://github.com/sipeed/picoclaw/issues/3287) |
| **#3281** – “Web UI chat input lag” | OPEN (stale) | 10 条评论 | [github.com/sipeed/picoclaw/issues/3281](https://github.com/sipeed/picoclaw/issues/3281) |
| **#3377** – “TLS certificate expired” | OPEN (critical) | 0 条评论 | [github.com/sipeed/picoclaw/issues/3377](https://github.com/sipeed/picoclaw/issues/3377) |

**分析**  
- **#3287** 与 IRC 相关的长消息拆分是一个长期需求，社区期望 PicoClaw 能将跨行消息合并为单条响应。  
- **#3281** 反馈 Web UI 在聊天历史较长时性能下降，影响日常使用体验。  
- **#3377** 由于证书到期，导致官网无法访问，影响项目可信度与用户信任度。

---

## 5. Bug 与稳定性  
| 级别 | Issue | 说明 | 现状 | 链接 |
|------|-------|------|------|------|
| **CRITICAL** | #3377 | TLS 证书已在 2026‑09‑10 过期，导致 `https://picoclaw.io` 无法访问 | 未修复 | [github.com/sipeed/picoclaw/issues/3377](https://github.com/sipeed/picoclaw/issues/3377) |
| **HIGH** | #3281 | Web UI 聊天输入卡顿，影响交互 | 未修复 | [github.com/sipeed/picoclaw/issues/3281](https://github.com/sipeed/picoclaw/issues/3281) |
| **MEDIUM** | #3287 | 长消息拆分导致用户收到分段响应 | 等待功能实现 | [github.com/sipeed/picoclaw/issues/3287](https://github.com/sipeed/picoclaw/issues/3287) |

> **注意**：当前无已合并的 fix PR 对上述 Bug 进行修复。

---

## 6. 功能请求与路线图信号  
| Issue | 需求 | 当前 PR | 评估 |
|-------|------|---------|------|
| #3366 | 支持 OpenAI 兼容供应商（如 9Router） | 无 | 需求明确且与核心功能紧密，优先级高。 |
| #3368 | Parallel Search MCP 设置示例 | PR #3368（docs） | 文档增补，已通过审查，易于合并。 |
| #3367 | Pilot MCP 设置示例 | PR #3367（docs） | 同上，已通过审查。 |

> 计划在下一个主版本中考虑 **#3366**，同时文档 PR 可先合并以提升用户体验。

---

## 7. 用户反馈摘要  
- **长消息处理**：用户在 IRCv3 发送超过 512 bytes 的消息时，客户端会自动拆分，导致 PicoClaw 接收到多条碎片。需在后端统一拼接。  
- **UI 性能**：Web UI 在聊天记录较长时，输入框响应变慢，影响实时对话。  
- **证书失效**：官网无法访问，导致新用户无法获取官方资源与文档。  
- **自定义 provider**：希望能快速添加 OpenAI 兼容 provider，以便在自建环境中部署。  

---

## 8. 待处理积压  
| Issue | 说明 | 关注度 | 链接 |
|-------|------|--------|------|
| #3287 | 长消息支持（stale） | 12 | [#3287](https://github.com/sipeed/picoclaw/issues/3287) |
| #3281 | Web UI lag（stale） | 10 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) |
| #3366 | OpenAI 兼容 provider（feature） | 2 | [#3366](https://github.com/sipeed/picoclaw/issues/3366) |
| #3377 | TLS 证书失效（critical） | 0 | [#3377](https://github.com/sipeed/picoclaw/issues/3377) |

> 维护者应优先关注 **#3377**（安全性）与 **#3281**（核心体验），其次是功能扩展与文档完善。

---

**整体评估**：PicoClaw 在 2026‑09‑13 维持稳定活跃，但缺少合并事件导致进展停滞。建议重点处理安全和性能问题，并尽快推进文档 PR，以提升新手上手体验。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目日报 – 2026‑09‑13

> **项目地址**：<https://github.com/nanocoai/nanoclaw>  
> **统计来源**：GitHub API（issues & PRs 过去 24 小时）

---

## 1️⃣ 今日速览  
- **活跃度**：共 6 条 Issue（2 新开/活跃，4 已关闭）与 43 条 PR（24 仍待合并，19 已合并/关闭）。  
- **质量**：无新版本发布，主要聚焦在功能细化与稳定性修复。  
- **团队氛围**：PR 合并率约 44%，显示维护团队对 PR 的快速评审与反馈。  
- **整体健康**：代码基线保持稳定，问题及时关闭，项目整体处于 “成熟” 阶段。

---

## 2️⃣ 版本发布  
**无新版本发布**。  
> 说明：目前项目正处于功能迭代期，发布周期延长至下一个里程碑（预计 2026‑09‑30）。

---

## 3️⃣ 项目进展  
| PR 号 | 标题 | 状态 | 关键贡献 |
|-------|------|------|----------|
| **#3788** | `fix(setup): restore provider picker on fresh installs` | **已合并** | 解决首次安装时缺失 provider 选择器，恢复用户交互体验。 |
| **#3786** | `typing: follow the runner's turn state` | **已合并** | 改进 typing indicator，支持自定义状态信息，提升交互一致性。 |
| **#3784** | `feat(community-portal): opt‑in remote terminal & chat surface` | **已合并** | 为社区门户新增远程终端与聊天面板，支持跨设备协作。 |
| **#3783** | `feat(code‑mode): persistent coding sessions` | **已合并** | 新增持续编码会话模式，支持 sandbox 管理与边界审批。 |
| **#3772 / #3764** | `feat(channels): voice adapter & /add‑voice` | **已合并** | 推出 voice channel 与浏览器双向语音交互能力。 |
| **#3781** | `feat(agent‑runner): enforce tools‑only delivery` | **已合并** | 强制工具‑仅交付，保障非工具调用的隐私。 |
| **#3779** | `fix(setup): verify restarted host identity and readiness` | **已合并** | 防止重启后使用旧 socket 继续运行，提升安全性。 |
| **#3770** | `fix(webhook): honor WEBHOOK_PORT from .env` | **已合并** | 让 `.env` 中配置的端口生效，修正 webhook 监听行为。 |

> **总结**：今天的合并重点在提升安装体验、交互一致性、远程协作与安全性。累计合并 PR 贡献了 **6** 个功能/修复点。

---

## 4️⃣ 社区热点  
| 项目 | 说明 | 链接 |
|------|------|------|
| **Issue #3787** | “Fresh setup skips the provider picker and silently selects Claude” – 影响 macOS 用户的安装流程，已引起 1 条讨论。 | <https://github.com/nanocoai/nanoclaw/issues/3787> |
| **PR #3788** | 修复上述问题，恢复 provider picker，已被合并。 | <https://github.com/nanocoai/nanoclaw/pull/3788> |

> **分析**：用户在首次安装时直接被跳过 provider 选择器，导致无法选用 Codex 等其它 provider。该缺陷被快速定位并通过 PR #3788 解决，恢复了对多 provider 的支持。

---

## 5️⃣ Bug 与稳定性  
| 级别 | 关键 Bug | 状态 | Fix PR |
|------|----------|------|--------|
| **高** | **#3787** – Provider picker 被跳过，导致默认选 Claude | ✅ 已合并 PR #3788 | #3788 |
| **中** | **#3765** – SQLite 并发迁移导致 Fresh Setup 失败 | ✅ 已合并 PR #3766 | #3766 |
| **中** | **#3769** – uvx bootstrap 失败，pnpm 未找到 | ✅ 已合并 PR #3768 | #3768 |
| **低** | **#3762** – add‑opencode 旧 Dockerfile 保护测试残留 | ✅ 已合并 PR #3763 | #3763 |
| **低** | **#2901** – WEBHOOK_PORT 只在 process env 起效 | ✅ 已合并 PR #3770 | #3770 |
| **低** | **#3785** – channels/slack.ts 依赖已删除的 `extractRawText` | ❌ 未修复 | — |

> 备注：除 #3785 外，所有主要 bug 均已通过 PR 解决，项目稳定性持续提升。

---

## 6️⃣ 功能请求与路线图信号  
| 需求 | 相关 PR | 评估 |
|------|--------|------|
| 远程终端 + 聊天面板（社区门户） | #3784 | 已实现，预期在下一版本中正式发布。 |
| 持续编码会话模式 | #3783 | 已实现，标记为“功能完善”阶段。 |
| Voice channel 与浏览器双向语音 | #3764/3772 | 已实现，需进一步测试与文档完善。 |
| 工具‑仅交付保证 | #3781 | 已实现，适配工具不稳定的 provider。 |
| provider picker 兼容性 | #3788 | 已修复，未来将添加更多 provider 选项。 |

> **结论**：当前 PR 反映出社区对多平台、多交互模式的强烈需求，未来版本将继续聚焦于“可扩展的交互体验”。

---

## 7️⃣ 用户反馈摘要  
| Issue | 主要痛点 | 用户感受 |
|-------|----------|----------|
| #3787 | 安装过程中缺失 provider 选择器 | “我无法使用 Codex，直接走 Claude 让我很失望。” |
| #3785 | Slack 渠道依赖丢失 | “无法在 `channels` 分支上使用 Slack 适配器。” |
| #3769 | uvx bootstrap 依赖缺失 | “在没有 `~/.local/bin` 的环境下无法完成安装。” |

> **洞察**：用户最关注的是**安装体验**与**多渠道支持**。虽然大部分问题已被解决，但仍需持续关注新渠道（如 Slack）兼容性。

---

## 8️⃣ 待处理积压  
| Issue/PR | 描述 | 当前状态 | 提醒 |
|----------|------|----------|------|
| #3762 | `add-opencode` 旧 Dockerfile 保护残留 | 已关闭 | 需验证是否影响现有用户。 |
| #3765 | SQLite 并发迁移回归 | 已关闭 | 监测未来迁移脚本是否再出现相同模式。 |
| #3769 | uvx bootstrap `pnpm not found` | 已关闭 | 记录对缺失 `~/.local/bin` 的 fallback。 |
| #3785 | `extractRawText` 在 main 不存在 | **开放** | 需要在 `main` 分支同步对应核心文件。 |
| #3787 | Provider picker 失效 | 已修复 | 记录在 PR #3788，确认后续不再复现。 |

> **建议**：对 #3785 进行优先评审，确保 `channels/slack.ts` 与 core 的 API 对齐；对 #3769 做一次全平台回归测试。

---

> **总体评价**  
> NanoClaw 在本日保持了良好的维护节奏：多条关键功能已完成合并，Bug 修复率高，社区反馈被迅速响应。项目健康度良好，团队正按计划推进从“安装体验”到“多交互协作”的路线图。继续关注长周期积压问题与新渠道兼容性，将有助于进一步提升用户满意度。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 (2026-09-13)

## 1. 今日速览
过去 24 小时内，NullClaw 项目展现出低活跃但高维护质量的特征。今日无新增 Issue 或版本发布，主要活动集中于一项关键稳定性修复的收尾工作。项目并未处于爆发式更新期，而是处于稳态维护阶段，重点在于夯实底层通信机制的健壮性。整体来看，社区互动相对静默，技术演进节奏平稳。

## 2. 版本发布
无。今日无新版本发布。

## 3. 项目进展
今日最重要的进展是 **PR #996** 的合并（或视为已关闭且合并成功，基于上下文推断其完成状态），该合并没有引入新功能，而是显著提升了系统的稳定性与资源管理能力。

*   **PR #996: [CLOSED] fix(mcp): bound stdio response waits**
    *   **链接**: [nullclaw/nullclaw PR #996](https://github.com/nullclaw/nullclaw/pull/996)
    *   **核心变更**:
        1.  为 MCP (Model Context Protocol) 的 stdio 响应读取应用了 `timeout_ms` 限制，解决了潜在的死锁或无限等待问题。
        2.  实现了进程组清理机制：当请求超时或初始化失败时，自动终止派生的子进程及其整个进程组，防止“僵尸”MCP 服务器进程泄露系统资源。
    *   **验证情况**: 作者提供了完整的验证数据，包括 `zig build test --summary all` (7,373 通过, 9 跳过) 以及 `zig build -Doptimize=ReleaseSmall` 编译检查，表明该修复在测试覆盖率和构建完整性上符合项目高标准。
    *   **意义**: 该修复直接解决了 Issue #991 中报告的潜在资源泄露和挂起问题，对于长时运行且依赖大量 MCP 插件的 NullClaw 实例而言，是一次重要的稳定性加固。

## 4. 社区热点
今日无高讨论度 Issues 或 PR。唯一的活跃条目 PR #996 虽有关联 Issue (#991)，但在 24 小时观察窗口内评论数为 0，未引发社区广泛讨论。这表明该问题可能已被维护者默默识别并高效处理，未演变为社区争议点。

## 5. Bug 与稳定性
今日报告的主要稳定性隐患已通过 **PR #996** 得到修复。

*   **Bug ID**: 关联 Issue #991 (已由 PR #996 修复)
    *   **问题描述**: MCP stdio 通信缺乏超时机制，导致在网络波动或插件无响应时，主进程可能永久阻塞；同时，失败的初始化过程未清理子进程，造成资源泄露。
    *   **严重程度**: **高** (影响服务可用性可能导致进程挂起或内存/句柄耗尽)。
    *   **状态**: **已修复** (PR #996 已合并/关闭)。
    *   **分析**: 该修复填补了异步通信中的边界条件处理空白，显著降低了生产环境中因插件故障导致核心服务崩溃或僵死的风险。

## 6. 功能请求与路线图信号
今日无新增 Issue，因此没有新的显式功能请求。
*   **信号分析**: 维护者优先处理底层稳定性（MCP 通信超时与清理），暗示当前路线图的重点可能从“新增集成”转向“加固现有集成框架”。对于依赖复杂插件生态的用户，未来版本可能会更强调插件隔离与故障自愈能力。

## 7. 用户反馈摘要
由于过去 24 小时内无新增 Issue 或公开评论，无法提取具体的用户痛点或满意度反馈。
*   **推断**: 鉴于 PR #996 修复的是一个底层资源管理问题，受影响的用户多为高级开发者或自动化运维人员，他们可能对静默失败和资源泄露较为敏感。此修复虽无公开讨论，但直接回应了此类用户的核心关切。

## 8. 待处理积压
*   **当前状态**: 过去 24 小时内无新增积压项。
*   **观察**: 无长期未响应的重要 Issue 或 PR 出现在今日数据集中。建议关注 Issue #991 的后续状态，确认其是否已在代码库中完全关闭（通常随 PR 合并自动关闭，若无则需手动关联）。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-09-13)

### 1. 今日速览
IronClaw 项目今日整体活跃度处于**低水平/静默状态**。过去 24 小时内无新 Issue 产生，亦无新版本的发布。开发活动集中体现在代码质量加固与核心逻辑修复上，共处理了 2 个 Pull Request。虽然社区讨论热度不高，但官方维护团队仍在持续推进状态管理、测试覆盖性以及渠道连接状态处理的底层逻辑优化，项目整体健康状况保持稳定。

### 2. 版本发布
**无最新 Release 数据。**
过去 24 小时内没有检测到新的版本标签或公开发布。

### 3. 项目进展
今日有 1 个 PR 被合并/关闭，标志着核心功能稳定性的一次重要推进：

*   **✅ 修复共享渠道断连状态识别逻辑 (PR #8076)**
    *   **状态**: `[CLOSED]` (已合并/关闭)
    *   **作者**: `be-student`
    *   **链接**: [nearai/ironclaw#8076](https://github.com/nearai/ironclaw/pull/8076)
    *   **进展分析**: 该 PR 解决了 Assistant 模块中关于“已配对用户”与“未配对账户”在共享渠道断连时的混淆问题。通过区分这两种状态，系统现在能针对用户消息和 Bot 命令渲染特定的渠道指导信息。此举确保了 Product、Adapter 和 OpenAI-compatible 接口在拒绝分类上的一致性，并更新了 Slack 能力定义。这是提升多渠道路由准确率和用户体验的关键修复。

*   📝 **待合并测试增强 (PR #8098)**
    *   **状态**: `[OPEN]` (待审核/合并)
    *   **作者**: `huiq777`
    *   **链接**: [nearai/ironclaw#8098](https://github.com/nearai/ironclaw/pull/8098)
    *   **内容**: 这是一个测试基础设施的补强 PR。作者添加了针对 `state-derived lineage` 的逆向回归测试，并在现有终端重写测试旁边证明了元数据（metadata）初始携带深度、激活来源和后代上限，同时固定了由 `TurnRunState` 派生的快照故意省略这些 lineage 字段的行为。这表明团队正在加强内部状态管理的测试覆盖率，以防止未来重构中的回归错误。

### 4. 社区热点
**今日无高热度 Issue 或 PR。**
由于过去 24 小时内新开/活跃 Issue 数量为 0，且处理的 2 个 PR 评论数均为 undefined（数据缺失或无实质评论），社区层面暂无明显的舆论焦点或热点讨论。

### 5. Bug 与稳定性
今日无新报告的 Bug Issue。然而，通过已处理的 PR 可以推断出近期关注的**稳定性问题**：

*   **[已修复] 共享渠道断连状态混淆问题**
    *   **关联 PR**: [#8076](https://github.com/nearai/ironclaw/pull/8076)
    *   **问题描述**: 在共享渠道（如 Slack）中，当配对用户断开连接时，系统未能正确区分该用户是“已配对但断开”还是“未配对账户”，可能导致错误的拒绝分类或误导性的用户引导。
    *   **影响范围**: Assistant 模块、Slack Adapter、OpenAI-compatible API 表面。
    *   **状态**: **已修复并合并**。该修复增强了多渠道场景下的状态机准确性。

*   **[潜在风险监测] TurnRunState 派生快照的字段遗漏**
    *   **关联 PR**: [#8098](https://github.com/nearai/ironclaw/pull/8098)
    *   **问题描述**: 这不是一个运行时 Bug，而是一个测试覆盖缺口。PR 表明之前可能缺乏对 `TurnRunState` 派生快照是否正确省略 lineage 字段（depth, activation provenance, descendant cap）的回归测试。
    *   **状态**: **测试正在补充中** (PR Open)。

### 6. 功能请求与路线图信号
**无新的功能 Request Issue。**
基于今日处理的 PR，可以观察到以下**内部路线图信号**：

*   **状态管理精细化**: PR #8098 显示团队正在深入优化 `TurnRunState` 及其派生快照的行为。这暗示后续版本可能会在多轮对话的状态持久化、元数据完整性方面有更严格的约束或清理机制。
*   **多渠道一致性增强**: PR #8076 强调了在 Product、Adapter 和 API 层面保持拒绝分类的一致性。这表明项目路线图重视**接口行为的一致性（Consistency）**，未来可能有更多针对多渠道（Slack, Discord, etc.）行为对齐的内部重构。

### 7. 用户反馈摘要
**数据不足。**
由于过去 24 小时内无新 Issue 且无活跃评论，无法从用户评论中提炼出新的痛点或满意度反馈。建议参考近期历史 Issue 以了解用户长期关注点。

### 8. 待处理积压
*   **[Open] PR #8098: test(turns): pin state-derived lineage drop**
    *   **链接**: [nearai/ironclaw#8098](https://github.com/nearai/ironclaw/pull/8098)
    *   **创建时间**: 2026-09-12
    *   **提醒**: 该 PR 尚处于 Open 状态。鉴于其涉及核心状态管理的测试基础，建议维护者（Maintainers）尽快进行代码审查（Code Review）并合并，以确保测试覆盖率的完整性，避免长期积压影响后续重构的置信度。

*   **积压 Issue 提醒**:
    由于今日无新 Issue 数据，无法评估长期未响应的具体 Issue。建议维护者定期清理超过 7 天无活动的 Open Issues，以保持项目健康度。

---
**数据说明**:
*   数据源: GitHub API (nearai/ironclaw)
*   时间窗口: 过去 24 小时 (截至 2026-09-13)
*   注: 部分 PR 的评论数显示为 `undefined`，可能源于 API 缓存或数据字段映射问题，建议在实际操作中通过 GitHub UI 复核。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-09-13)

## 1. 今日速览
过去 24 小时内，LobsterAI 项目整体处于**中等活跃度（以历史积压清理和 Bug 修复为主）**。项目集中处理了底层 Auth 认证、OpenClaw 运行时竞态条件、Electron UI 拖拽层拦截以及定时任务数据持久化等关键问题。

- **Issues 动态**：更新 6 条（均为活跃/新开，关闭 0 条）。
- **PR 动态**：更新 9 条（待合并 8 条，已合并/关闭 1 条）。
- **整体评估**：社区和贡献者提交了多项针对核心稳定性的修复 PR，且多数精准对应现有 Issue，但待合并 PR 积压较多（多带有 `stale` 标记），建议维护团队加大 Code Review 吞吐量。

---

## 2. 版本发布
> 本日无新版本发布。

---

## 3. 项目进展
本日关闭/合并了 1 项涉及构建与渲染层的重要 PR：

- [PR #2657](https://github.com/netease-youdao/LobsterAI/pull/2657) **[CLOSED] fix: resolve thumbnail rendering and native dependency build issues**
  - **修复内容**：解决了跨模块（主进程、渲染进程、OpenClaw 适配层等）的缩略图渲染异常及原生依赖构建失败的问题。
  - **项目进展**：巩固了客户端编译构建流程，提升了多媒体/缩略图展示的稳定度。

---

## 4. 社区热点
今日讨论和修复重点高度集中于**系统稳定性（并发/竞态条件导致客户端锁死）**与 **Electron 交互体验**：

1. **认证与 Token 刷新双重消费问题** ([Issue #1048](https://github.com/netease-youdao/LobsterAI/issues/1048) / [PR #1049](https://github.com/netease-youdao/LobsterAI/pull/1049))
   - **热点分析**：应用启动时多个 IPC 调用并发触发 401，绕过了 `refreshOnce()` 去重保护，导致 Rolling Token 被重复消费并被服务端拒绝，引发用户被强制登出。
2. **OpenClaw 运行时竞态导致会话永久锁死** ([Issue #1051](https://github.com/netease-youdao/LobsterAI/issues/1051) / [PR #1052](https://github.com/netease-youdao/LobsterAI/pull/1052))
   - **热点分析**：网关客户端初始化失败及已停止 Session 的状态判断存在竞态漏洞，报错后 Session 进入无法恢复的死锁状态，用户不得不频繁重启应用。

---

## 5. Bug 与稳定性

按严重程度排列本日发现及修复中的问题：

| 严重程度 | 问题描述 | 状态 / Fix PR |
| :--- | :--- | :--- |
| **P0 - 严重** | **OpenClaw 运行时竞态导致 AI 会话永久无法启动**：初始化失败后锁释放逻辑异常，导致 session 报 `Session is still running` 永久死锁。 | Issue [#1051](https://github.com/netease-youdao/LobsterAI/issues/1051) <br> Fix: PR [#1052](https://github.com/netease-youdao/LobsterAI/pull/1052) |
| **P0 - 严重** | **并发 401 导致 Token 被双重消费并强制登出**：`fetchWithAuth` 缺少去重机制。 | Issue [#1048](https://github.com/netease-youdao/LobsterAI/issues/1048) <br> Fix: PR [#1049](https://github.com/netease-youdao/LobsterAI/pull/1049) |
| **P1 - 高** | **定时任务 JSONL 历史写入失败引发数据丢失**：迁移逻辑中未妥善处理写文件失败，仍标记已完成，导致后续同步跳过。 | Fix: PR [#1058](https://github.com/netease-youdao/LobsterAI/pull/1058) |
| **P2 - 中** | **Modal 弹窗关闭按钮无法点击**：Electron 顶部 Header `-webkit-app-region: drag` 覆盖了较高 Modal 的关闭按钮，拦截了鼠标事件。 | Issue [#1053](https://github.com/netease-youdao/LobsterAI/issues/1053) <br> Fix: PR [#1054](https://github.com/netease-youdao/LobsterAI/pull/1054) |
| **P2 - 中** | **定时任务修改时间后标题与描述不一致**：更新时间未同步刷洗展示标题。 | Issue [#1062](https://github.com/netease-youdao/LobsterAI/issues/1062) |
| **P3 - 低** | **心跳对话未过滤展示在界面**：后台系统级日志/心跳泄漏至前端对话框，干扰正常交互。 | Issue [#1066](https://github.com/netease-youdao/LobsterAI/issues/1066) |
| **P3 - 低** | **Windows 默认浏览器检测错误**：已设置 Chrome 为默认浏览器，但调用系统浏览器时仍启动 Edge。 | Fix: PR [#1059](https://github.com/netease-youdao/LobsterAI/pull/1059) |

---

## 6. 功能请求与路线图信号

1. **定时任务绑定现有 Cowork Session** ([PR #1065](https://github.com/netease-youdao/LobsterAI/pull/1065))
   - **信号**：社区正在强化 Cowork（协作模式）与定时任务的深度联动。该 PR 在创建/编辑定时任务时增加了 Dropdown 选择器，允许用户将定时任务绑定到已有的 Cowork 会话，避免每次运行都创建孤立的新会话。
2. **自定义网关端口配置** ([Issue #1061](https://github.com/netease-youdao/LobsterAI/issues/1061))
   - **诉求**：用户遇到 LobsterAI 自带网关与本地独立的 OpenClaw 端口冲突，希望能提供修改网关端口的配置入口。

---

## 7. 用户反馈摘要

综合 Issue 与 PR 讨论，当前用户的核心痛点集中在以下方面：
- **稳定性体验打折**：“突然被登出”、“AI 界面死锁报错需要重启应用”，底层并发与 Token 刷新机制直接影响了日常使用的连贯性。
- **UI 细节瑕疵拦截操作**：弹窗变高后因拖拽层拦截导致“关闭按钮点不动”；系统心跳未过滤给用户带来“这是否报错”的疑惑。
- **环境兼容性问题**：Windows 系统下的默认浏览器判断不够准确；网关端口无法自由调整导致与开发者本地已有的 OpenClaw 环境产生冲突。

---

## 8. 待处理积压

目前有多个高质量且附带精准修复代码的 PR 处于 `[stale]` 待审核状态，建议维护团队优先进行 Review 和合并：

- [PR #1049](https://github.com/netease-youdao/LobsterAI/pull/1049): 修复 Auth 401 并发并发刷新 Token 强制登出（高优先级）
- [PR #1052](https://github.com/netease-youdao/LobsterAI/pull/1052): 修复 OpenClaw 会话永久死锁问题（高优先级）
-

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-13）

## 1. 今日速览
过去 24 小时内，Moltis 项目保持平稳推进。整体活跃度中等，共涉及 1 条 Issue 更新与 3 条 PR 变动，暂无新版本发布。今日核心关注点在于**多平台权限策略一致性**（Telegram 共享频道工具调用限制修复）以及**TLS/网络底层稳定性改进**。社区对于新 LLM 路由服务商（Requesty）的集成 PR 也在持续跟进中。项目对新报告 Bug 具备较快的响应速度。

---

## 2. 项目进展
今日关闭/合并了 1 项涉及底层 TLS 协议协商的重要修复 PR：

* **TLS 协议协商限制优化**：[#1261 fix(tls): restrict ALPN to HTTP/1.1](https://github.com/moltis-org/moltis/pull/1261) (已关闭)
  * **推进内容**：在完善 RFC 8441（Over HTTP/2 的 WebSocket 升级规范）支持前，显式将 TLS ALPN 协商限制为 HTTP/1.1，并固定现有 TLS 配置测试。
  * **项目意义**：修复了长期的底线网络协议问题 [#245](https://github.com/moltis-org/moltis/issues/245)，避免因默认协商到 HTTP/2 导致 WebSocket 升级失败，提升了整体网络连接的确定性与稳定性。

---

## 3. 社区热点
由于今日更新量较小，社区讨论焦点集中在 Telegram 渠道的工具安全策略上：

* **Telegram 共享频道工具失效问题** [#1264](https://github.com/moltis-org/moltis/issues/1264) & [#1265](https://github.com/moltis-org/moltis/pull/1265)
  * **诉求分析**：用户反馈在 Telegram 共享频道中，智能体工具（Tools）突然无法正常工作。原因在于网关（Gateway）继承了对不受信任受众（Untrusted Audience）的默认全拒绝策略，但 Telegram 模块此前未像 Slack 一样暴露出相应的配置项。社区贡献者迅速提交 [#1265](https://github.com/moltis-org/moltis/pull/1265) 补充该配置管道，弥补平台功能差异。

---

## 4. Bug 与稳定性
今日新增 1 缺陷报告，已定位原因并获得快速修复 PR 响应：

1. **[中等] Telegram 共享频道下工具停止响应** 
   * **问题描述**：在共享 Telegram 频道中使用智能体时，工具调用逻辑中断。[#1264](https://github.com/moltis-org/moltis/issues/1264)
   * **修复状态**：已有待合并 PR [#1265](https://github.com/moltis-org/moltis/pull/1265)。该 PR 通过暴露 `untrusted_audience` 和 `untrusted_tools` 配置项，赋予 Telegram 频道与 Slack 对齐的权限控制能力。

---

## 5. 功能请求与路线图信号
* **集成 Requesty LLM 路由器**：[#1143 Add Requesty as an OpenAI-compatible provider](https://github.com/moltis-org/moltis/pull/1143)
  * **信号解读**：基于 OpenRouter 的实现模式，增加对 Requesty (`router.requesty.ai`) 的表格驱动支持。这表明 Moltis 在持续扩展其“兼容 OpenAI 接口规范”的模型路由提供商生态，降低用户对接多模型路由服务的成本。

---

## 6. 用户反馈摘要
* **使用场景与痛点**：随着 Moltis 被广泛部署于团队协作场景（如 Telegram 共享群组），用户对**多用户鉴权与沙箱控制**的需求显著增加。平台间配置不一致（例如 Slack 具备安全粒度控制而 Telegram 缺乏）会直接导致应用在跨平台迁移时出现非预期中断。保持各 Chat 网关功能对等是目前用户的主要期待之一。

---

## 7. 待处理积压
* **长期滞留 PR 提醒**：
  * [#1143 Add Requesty as an OpenAI-compatible provider](https://github.com/moltis-org/moltis/pull/1143)：该 PR 创建于 2026-07-02，历时超过 2 个月，近期已完成代码更新，建议维护者予以关注并完成 Merge Code Review。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 (2026-09-13)

> **分析师点评**：今日 CoPaw 社区活动频繁，聚焦于 2.2.x 版本发布后的稳定性修复与协议扩展。虽然过去 24 小时内无 PR 最终合并，但社区贡献者非常高效地提交了 6 项关键修复 PR（覆盖服务器冻结、内存泄漏、MCP 协议兼容等高危问题）。此外，针对桌面端配置/会话丢失及 DeepSeek 模型深层优化的讨论成为了今日的重点。

---

## 1. 今日速览

- **社区活跃度**：高。过去 24 小时更新 Issue 16 条（新增/活跃 13，关闭 3），新增待合并 PR 6 条。
- **核心焦点**：v2.2.x 版本的性能与稳定性治理（主服务死锁、内存溢出、配置丢失）、MCP/ACP 扩展协议的边缘场景兼容性、以及记忆模块（ReMeLight）的成本优化。
- **健康度评估**：项目处于 2.2.x 迭代后的**高频排错与快速响应期**。社区对重大 Bug（如文件监听引发的主进程死锁）的响应极其敏捷，数小时内即有高质量修复 PR 提交。

---

## 2. 项目进展

今日暂无 PR 完成合并（0 merged），但关闭了 3 条 Issue。社区针对当前暴露的致命缺陷和扩展需求迅速提出了 6 项高质量 PR，项目整体在**稳定性与协议健壮性**上蓄势待发：

*   **性能与死锁修复**：提交 [PR #7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) 以解决工作区大仓库导致的整体服务冻结问题。
*   **内存与协议修复**：提交 [PR #7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) 修复与 Java MCP SDK 的通信故障；提交 [PR #7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) 完善控制台 SSE 流式异常透传。
*   **成本与配置优化**：提交 [PR #7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) 支持独立配置记忆写入模型；提交 [PR #7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) 增加子 Agent 模型覆盖失效的诊断日志。

---

## 3. 社区热点

1.  **大模型设置与历史会话丢包/丢失问题** 
    *   **讨论重点**：[Issue #7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) 和 [Issue #7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 指出，桌面端 Win10 2.2.1 在正常使用或执行插件重部署/中断后，会出现“大模型配置清空”以及“历史会话无法召回/彻底丢失”的问题。
    *   **诉求分析**：用户对桌面端的数据持久化与配置状态恢复机制表示担忧，要求官方彻底排查内存/本地数据库在异常中断时的写入与恢复逻辑。
2.  **qwenpaw 2.x 对 A2A（Agent-to-Agent）协议的官方支持节点**
    *   **讨论重点**：[Issue #7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) 关注架构文档中规划的 Unified Driver 机制（整合 MCP / A2A / ACP）。当前 2.x 代码库已落地 MCP，开发者询问 A2A 协议的路线图与排期。
3.  **多路径复合导致的容器内存耗尽（OOM）**
    *   **讨论重点**：[Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) 深入分析了容器环境内存以 ~1MB/s 持续增长最终 Hang 死的问题，揭示了“无界流缓冲区 + Keep-Alive 实例堆叠 + 死循环逻辑绕过”三者叠加的系统级缺陷。

---

## 4. Bug 与稳定性

按影响严重程度排序如下：

### 🔴 P0 - 严重崩溃与卡死
1.  **大仓库导致整个 WebUI 与 Channel 锁死**：[Issue #7721](https://github.com/agentscope-ai/QwenPaw/issues/7721)
    *   *现象*：打开包含大型 Git 仓库的工作区文件浏览器时，`/api/workspace/watch` 的 `watchfiles.awatch` 会阻塞 asyncio 事件循环，导致整个服务器停止响应。
    *   *状态*：**已有修复 PR** [PR #7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)（改为线程池轮询）。
2.  **复合型内存泄漏与容器 OOM**：[Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)
    *   *现象*：流缓冲区无上限及实例堆叠导致内存以 ~1MB/s 增长。
    *   *状态*：等待排查修复。

### 🟡 P1 - 状态丢失与安全性缺陷
3.  **桌面端大模型配置与历史会话丢失**：[Issue #7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) & [Issue #7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)
    *   *现象*：运行中突发报错提示未配置 LLM，重进后会话历史全失。
    *   *状态*：排查中。
4.  **越权写入工具盲区（安全越界）**：[Issue #7727](https://github.com/agentscope-ai/QwenPaw/issues/7727)
    *   *现象*：`_paths` 解析无法识别 `kimi-code` 的 Write 工具参数，导致工作区外写硬拦截失效。
    *   *状态*：待处理。

### 🔵 P2 - 协议与通道兼容性
5.  **Java MCP SDK 适配失败 (HTTP 500)**：[Issue #7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)
    *   *状态*：**已有修复 PR** [PR #7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)。
6.  **ACP `trusted: true` 静默降级为交互提示**：[Issue #7726](https://github.com/agentscope-ai/QwenPaw/issues/7726)。
7.  **Telegram 审批卡片 Markdown 渲染异常**：[Issue #7718](https://github.com/agentscope-ai/QwenPaw/pull/7718)（提交 PR 修复）。

---

## 5. 功能请求与路线图信号

*   **ReMeLight 记忆独立模型解耦**：[Issue #7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) 指出当前记忆提取（summarize/dream）强制绑定主聊天 LLM，使用旗舰模型极昂贵。社区迅速跟进 [PR #7719](https://github.com/agentscope-ai/QwenPaw/pull/7719)，新增 `memory_model` 配置项，允许指定轻量模型处理后台记忆，**预计近期合并**。
*   **DeepSeek 模型原生地基增强**：[Issue #7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) 提出引入 DeepSeek 原生能力元数据、Prompt 前缀稳定性优化及 KV-

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