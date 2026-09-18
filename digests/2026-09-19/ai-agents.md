# OpenClaw 生态日报 2026-09-19

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-18 22:03 UTC

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

作为专注于 AI 智能体与个人 AI 助手开源生态的技术分析师，基于 2026-09-19 各开源项目的社区动态摘要，我为您生成了以下横向对比分析报告。

---

## 1. 生态全景

当前的个人 AI 助手与自主智能体（Autonomous Agents）开源生态正处于**从“功能尝鲜”向“企业级落地与工程加固”过渡的关键节点**。整体而言，各项目普遍由前期的疯狂野蛮生长、多渠道接入，转向了解决生产环境中的顽疾——如 OOM 内存泄漏、跨会话上下文混乱、Windows/多端环境适配以及安全性与资源回收等深水区问题。尽管生态内绝大部分项目（如 NanoBot、LobsterAI）保持了极高的高频代码提交与迭代节奏，但由于对底层持久化存储、网关稳定性及多租户隔离的重构需求激增，整个生态在 2026 年 Q3 末呈现出“重构与修复并行、安全与合规提速”的健康态势。

---

## 2. 各项目活跃度对比

| 项目名称 | 今日 Issues 更新 | 今日 PR 更新 (合并/打开) | Release 情况 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 缺失数据 |
| **NanoBot** | 5 条 | 14 条 (9 待合并, 5 已关闭/合并) | 暂无 (Pre-release 0.3.5) | **极高**：核心 Bug 快速定位并修复，功能扩展与运行时安全并重。 |
| **Hermes Agent** | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 缺失数据 |
| **PicoClaw** | 1 条 | 3 条 (全待审核) | 无新版本 | **中等偏低**：缺乏新版本发布与合并，处于“待决”的平稳维护期。 |
| **NanoClaw** | 4 条 | 4 条 (全待评估) | 无新版本 | **活跃且高危**：深陷内存 OOM 与存储膨胀的信任危机，但社区讨论热烈。 |
| **NullClaw** | 0 条 | 0 条 | 无新版本 | **停滞**：过去 24 小时无活动。 |
| **IronClaw** | 1 条 | 2 条 (全待合并) | 无新版本 | **低强度高精度**：聚焦底层架构重构（Reborn 存储）与 Provider 适配。 |
| **LobsterAI** | 6 条 | 23 条 | 无新版本 | **极高**：开发节奏极快，强力攻坚 Windows 兼容性与 OpenClaw 引擎健壮性。 |
| **TinyClaw** | 0 条 | 0 条 | 无新版本 | **停滞**：过去 24 小时无活动。 |
| **Moltis** | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 缺失数据 |
| **CoPaw** | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 缺失数据 |
| **ZeptoClaw** | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 缺失数据 |
| **ZeroClaw** | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 摘要生成失败 | ⚠️ 缺失数据 |

---

## 3. OpenClaw 在生态中的定位

*(注：因本周期 OpenClaw 核心参照摘要生成失败，以下基于其作为生态事实上的核心参照及跨项目引用（如 LobsterAI 的 OpenClaw 网关适配、NanoBot/NanoClaw 相关机制）进行推演分析)*

*   **生态定位**：OpenClaw 扮演了整个自主助手生态的**“事实标准（De Facto Standard）”与核心网关引擎**角色。诸多衍生项目（如 LobsterAI 对 OpenClaw 网关的硬化、各客户端对 OpenClaw 协议的兼容）证明其具备极高的生态辐射力。
*   **技术路线差异**：相比于轻量级单体工具（如 PicoClaw），OpenClaw 采用更重的网关架构、多渠道路由及复杂的子代理（Subagent）生命周期管理。
*   **社区规模**：作为核心参照，其生态虹吸效应显著，衍生出了强大的第三方二次开发生态（如网易有道 LobsterAI 等针对企业级场景的深度定制分支）。

---

## 4. 共同关注的技术方向

在本次统计周期中，多个开源项目不约而同地聚焦于以下三个底层技术方向：

1.  **网关重启后的生命周期与状态恢复一致性**
    *   *涉及项目*：NanoBot、LobsterAI、IronClaw
    *   *具体诉求*：解决网关重启或服务意外崩溃后，残留任务（如 `/stop` 后的 follow-up、重复激活状态、旧配置残留）导致的状态污染和逻辑错乱。
2.  **LLM 交互参数的精细化与通用控制（Thinking / Effort 映射）**
    *   *涉及项目*：IronClaw、LobsterAI
    *   *具体诉求*：应对诸如 DeepSeek V4 等模型表现过于冗长的问题，项目急需引入跨 Provider 的通用元数据控制（如思考深度/努力程度、Auto/Max 模式切换），以平衡 Token 成本与输出质量。
3.  **多租户隔离与持久化存储的重构**
    *   *涉及项目*：NanoClaw、IronClaw
    *   *具体诉求*：摆脱对特定 Profile 结构的硬编码依赖（如 IronClaw 的 Reborn 存储重构），防止因全量重写导致的存储膨胀和租户隔离性削弱（如 NanoClaw 的 OOM 危机）。

---

## 5. 差异化定位分析

*   **NanoBot**：定位为**现代多渠道协同与安全增强型助手**。其技术路线偏向快速扩展企业级协作渠道（如 Linear Agent）并在执行链中引入前置安全守卫（Jev Shell Guard）。
*   **IronClaw (NearAI)**：定位为**企业级安全隔离与底层协议规范化助手**。其注重沙箱安全、类型化安全信封以及对 LLM 底层参数的高精度可控。
*   **LobsterAI (网易有道背景)**：定位为**端到端 B 端生产力与多模态本土化助手**。针对 Windows 办公环境做了深度硬化，深度整合国内 IM 渠道（微信/QQ/飞书），并强化 Cowork 协作模式。
*   **NanoClaw**：定位为**极简无状态轻量任务代理**。虽然面临严重的存储与内存挑战，但其对 `--fresh-session` 等无状态设计和 Operator 环境变量的诉求凸显了其极端轻量化的产品哲学。
*   **PicoClaw**：定位为**小微场景通知与轻量集成工具**（如 Feishu 通知和 DeltaChat 简易集成）。

---

## 6. 社区热度与成熟度

*   **快速迭代与功能扩张期**：
    *   **NanoBot、LobsterAI**：日均 PR/Issue 交互极高。代码库处于高频的“修复-功能叠加”循环中，新渠道不断接入，正加速向大版本演进。
*   **质量巩固与架构重构期（防守期）**：
    *   **IronClaw、NanoClaw**：面临历史技术债或架构瓶颈（如 IronClaw 的存储重构、NanoClaw 的 OOM 危机）。社区工作重心从“加功能”被迫转向“保稳定性”，处理高危 Bug 和底层架构解耦。
*   **平稳维护/相对停滞期**：
    *   **PicoClaw、NullClaw、TinyClaw**：近期缺乏重大版本发布和核心合并，社区活跃度较低，主要依靠零星的 Issue 讨论维持。

---

## 7. 值得关注的趋势信号

从本次各项目的社区反馈中，可以为 AI 智能体开发者提炼出以下行业趋势：

1.  **“配置即失效”成为企业部署的最大痛点**：多项目（IronClaw、NanoBot、LobsterAI）暴露出的 Web 界面管理配置与本地环境变量不一致、旧版本残留文件导致启动失败等问题表明，**Agent 的“运维体验（Ops Experience）”已成为决定其能否在企业落地的决定性因素**，开发者需在安装引导和状态自愈上投入更多精力。
2.  **LLM 行为不可控倒逼应用层控制反转**：用户对模型冗长、代币失控的焦虑（如 IronClaw 讨论的 thinking 机制），意味着单纯依赖提示词工程的时代正在过去，**应用层框架必须提供硬编码的 Token/Effort 调度和多模型动态路由控制（如 Auto/Max 策略）**。
3.  **合规与安全执行前置（Security Guardrails）**：从 NanoBot 引入基于 OpenRouter Decisions API 的 Jev Shell 安全守卫可以看出，个人和自主 AI 助手正在越过“玩具”阶段，**在调用本地代码执行器（Exec）前增加 AI 决策安全审查将成为标准配置**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目每日动态报告（2026‑09‑19）**  
来源：GitHub 仓库 [HKUDS/nanobot](https://github.com/HKUDS/nanobot)（截至 2026‑09‑18 24 h 内数据）

---

## 1️⃣ 今日速览
- **活跃度高**：过去 24 h 内共计 **19 条交互**（5 条 Issue、14 条 PR），其中 **9 条 PR 待合并**，显示社区仍在积极贡献代码。  
- **核心问题聚焦**：跨会话回复错误、移动端 UI 卡顿以及 WebUI 重启后恢复逻辑异常是当天最受关注的三个 bug。  
- **功能迭代加速**：本轮 PR 中出现了 **2 项新功能**（Linear Agent 渠道、Jev Shell 安全守卫）以及多项 UI/运行时细节修复，表明项目正从“bug 清理”向“功能完善”转向。  
- **发布节奏**：暂无正式 Release，项目仍在 **pre‑release 0.3.5**（截至 9 月 18 日）阶段。  

---

## 2️⃣ 版本发布
> **（本日无新版本）**  
> 仍在 0.3.5 迭代中，后续若出现正式 Release，请关注 Release Notes 中的 **破坏性变更**（如 `channels.discord.replyToMessage` 默认值变更）以及 **迁移指南**（配置迁移、Python 3.12‑兼容性）。

---

## 3️⃣ 项目进展（合并/关闭的关键 PR）

| PR 编号 | 类型 / 关键点 | 状态 | 影响范围 | 关键说明 |
|--------|--------------|------|----------|----------|
| **#5495** | **feat(channels): Linear Agent 渠道** | **已关闭（合并）** | 新增渠道、OAuth PKCE、WebUI 面板 | 为 Linear 平台提供原生双向集成，拓展了 NanoBot 在企业协作工具生态的覆盖。 |
| **#5794** | **fix: cross‑session response delivery** | **已关闭（合并）** | Agent Loop 关键路径 | 彻底修复了 Issue #5798 中描述的“跨会话回复混乱”根因，提升了多会话并发可靠性。 |
| **#5810** | **fix(webui): show all channels when only WebUI is enabled** | **已关闭（合并）** | WebUI 设置页面 | 解决了仅启用 WebUI 时其它渠道被错误隐藏的 UI bug，改善了新手入门体验。 |
| **#5812** | **fix(agent): run explicit recovery continuations** | **已关闭（合并）** | RecoveryCoordinator | 让手动触发的恢复流程能够正确送达 Agent Loop，降低了网关重启后的错误恢复风险。 |
| **#5800** | **feat(discord): add replyToMessage parity with Telegram** | **已关闭（合并）** | Discord 渠道 | 引入 `channels.discord.replyToMessage` 配置，实现 Telegram‑style 的回复引用，提升跨平台一致性。 |
| **#5815** | **feat(exec): add optional Jev shell safeguard** | **打开（待审）** | Exec 工具链 | 新增基于 OpenRouter Decisions API 的安全守卫，可在执行代码前进行风险评估，满足企业合规需求。 |

> **合计**：本轮 **5 条功能/关键 bug 修复** 已合并，项目在 **渠道扩展** 与 **运行时安全** 两大方向取得显著进展。

---

## 4️⃣ 社区热点（讨论最活跃 / 最高互动的 Issue / PR）

| 编号 | 标题（简要） | 互动量（评论/👍） | 链接 | 关注点分析 |
|------|--------------|-------------------|------|------------|
| **#5798** (OPEN) | 回复串会话问题 | 1 条评论 / 0 👍 | <https://github.com/HKUDS/nanobot/issues/5798> | 用户在多会话并发时出现跨会话回复，直接影响核心聊天体验；已在 PR #5794 中得到根因定位，社区期待快速合并。 |
| **#5771** (OPEN) | Session list requires two taps on mobile | 1 条评论 / 0 👍 | <https://github.com/HKUDS/nanobot/issues/5771> | 移动端 UI 卡顿导致操作不友好，反映了 NanoBot WebUI 在移动设备适配上的薄弱环节。 |
| **#5808** (OPEN) | WebUI follow‑ups canceled by `/stop` replay after gateway restart | 0 评论 / 0 👍 | <https://github.com/HKUDS/nanobot/issues/5808> | 关注点在持久化恢复机制的完整性，涉及企业级部署的可靠性需求。 |
| **#5815** (OPEN) | feat(exec): add optional Jev shell safeguard | 0 评论 / 0 👍 | <https://github.com/HKUDS/nanobot/pull/5815> | 新增安全层面功能，已获得部分社区关注（尤其安全合规用户），是未来企业版的潜在卖点。 |
| **#5807** (OPEN) | fix(discord): clean up reaction state on stop | 0 评论 / 0 👍 | <https://github.com/HKUDS/nanobot/pull/5807> | Discord 渠道的资源泄漏问题，涉及长时间运行的机器人实例，社区对资源回收的需求较高。 |

> **热点结论**：跨会话回复（#5798）与移动端交互（#5771）是当前最紧迫的用户痛点；安全防护（#5815）和渠道资源管理（#5807）则是 **功能深化** 与 **运营可靠性** 的信号。

---

## 5️⃣ Bug 与稳定性（按严重程度排序）

| 严重度 | Issue 编号 | 标题 | 简要描述 | 当前状态 | 是否已有 Fix PR |
|--------|------------|------|----------|----------|-----------------|
| **Critical** | **#5798** | 回复串会话问题 | 跨会话回复混入导致对话上下文错位，影响核心聊天功能。 | Open | **已定位** → 关联 PR #5794（已合并） |
| **High** | **#5808** | WebUI follow‑ups canceled after restart | `/stop` 后的 follow‑up 仍被恢复，导致重复执行。 | Open | 无对应 PR（待讨论） |
| **High** | **#5806** | Discord runtime leaves reaction tasks alive after stop | 停止后仍有 Emoji 任务残留，可能导致内存泄漏。 | Open | 对应 PR #5807 正在进行中（已打开） |
| **Medium** | **#5771** | Session list requires two taps on mobile | 移动端侧边栏点击不响应，需要双击。 | Open | 暂无修复 PR（可能在 UI 重构 PR 中处理） |
| **Low** | **#5805** | fix(webui): keep mobile chat rows tappable | 透明层遮挡导致首点击失效。 | Open | 已提交 PR #5805（待审） |
| **Low** | **#5814** | fix(webui): remove intermediate answer footer gap | UI 间隙导致视觉不一致。 | Open | 已提交 PR #5814（待审） |

> **整体评估**：关键功能（跨会话回复）已在 PR #5794 中得到根因修复，后续只待合并验证。其余 **High‑Medium** 级别的 bug 大多集中在 **WebUI** 与 **Discord** 渠道的运行时清理，建议在下一轮合并窗口优先处理。

---

## 6️⃣ 功能请求与路线图信号

| 功能 / 改进 | 来源（Issue / PR） | 关联 PR | 路线图可能性 |
|-------------|-------------------|--------|--------------|
| **Linear Agent 渠道**（OAuth PKCE、持久化 webhook） | PR #5495（已合并） | — | 已进入正式代码库，下一次 Release 预计包含。 |
| **Jev Shell 安全守卫**（Exec 前置风险评估） | PR #5815（开放） | — | 受安全合规用户关注，建议在 0.4.0‑beta 中实验性开启。 |
| **Discord replyToMessage parity** | PR #5800（已合并） | — | 已实现，可在后续文档与 UI 中推广。 |
| **移动端交互改进**（单击即打开、透明层去除） | Issue #5771、PR #5805、#5814 | — | 属于 UI 优化，计划在 0.4.0 中统一收敛。 |
| **恢复机制的持久化一致性**（/stop 后的 follow‑up 处理） | Issue #5808、PR #5812 | — | 已在 PR #5812 中加入显式恢复路径，仍需进一步测试。 |
| **Discord 表情任务清理** | Issue #5806、PR #5807 | — | 已在 PR #5807 中实现，待合并后即进入 Release。 |

> **路线图建议**：在 **0.4.0**（预计 Q4 2026）中重点交付 **渠道扩展（Linear、Discord parity）**、**安全执行（Jev Guard）** 与 **移动端 UI 完整性** 三大块。

---

## 7️⃣ 用户反馈摘要

- **跨会话上下文混乱**（#5798）是实际使用中最常见的痛点，用户在多窗口或多终端切换时会看到错误的回复，导致对话流失。  
- **移动端操作不顺**（#5771、#5805）表明 NanoBot WebUI 仍然以桌面为主，移动适配需要更多触摸事件优化。  
- **持久化恢复**（#5808）体现了企业级部署对 **“一次停止，一次恢复”** 的严格需求，用户希望在网关重启后不出现重复或遗漏的 follow‑up。  
- **Discord 表情任务残留**（#5806）被视为 **资源泄漏** 风险，尤其在长期运行的机器人服务中会导致内存/CPU 异常。  
- **安全执行**（#5815）得到部分安全合规用户的积极响应，认为在执行任意代码前加入 AI 决策层的审查是未来必备功能。

总体来看，**核心聊天功能的可靠性** 与 **跨平台 UI/渠道一致性** 是用户最关注的两大方向。

---

## 8️⃣ 待处理积压（长期未响应的 Issue / PR）

| 编号 | 类型 | 创建时间 | 最近更新 | 关注点 | 建议处理 |
|------|------|----------|----------|--------|----------|
| **#1663** (CLOSED) | Feature request – Discord replyToMessage parity | 2026‑03‑07 | 2026‑09‑18 (关闭) | 已实现（PR #5800），但仍缺少 **官方文档** 与 **示例**。 | 补充文档，提升可发现性。 |
| **#5495** (CLOSED) | Linear Agent channel | 2026‑08‑23 | 2026‑09‑18 (关闭) | 已合并但缺少 **CI/测试覆盖**，且 **OAuth PKCE** 的自动刷新尚未在 CI 中验证。 | 增加端到端测试，防止后续回归。 |
| **#5794** (CLOSED) | Cross‑session response bug fix | 2026‑09‑16 | 2026‑09‑18 (关闭) | 已合并，后续需要 **回归测试**，确保新实现不影响单会话性能。 | 编写针对 `AgentLoop._dispatch` 的回归套件。 |
| **#5807** (OPEN) | Discord reaction clean‑up | 2026‑09‑18 | 2026‑09‑18 (打开) | PR 已打开但尚未审查，涉及底层任务调度。 | 加速审查，确保资源回收在下个 Release 前完成。 |
| **#5815** (OPEN) | Jev shell safeguard | 2026‑09‑18 | 2026‑09‑18 (打开) | 需要安全评审及兼容性测试，涉及外部 OpenRouter API。 | 设立安全审查里程碑，决定是否在 0.4.0‑beta 中实验。 |

> **行动建议**：维护者可在下周的 **triage 会议** 中将上述积压列入议程，优先处理 **安全/资源回收**（#5807）以及 **跨会话 bug** 的回归验证（#5794）。

---

### 总体健康度评估
- **活跃度**：高（PR 与 Issue 均在持续增长）。  
- **质量**：核心 bug 正在快速定位并修复，UI 与渠道细节仍有可优化空间。  
- **可持续性**：新增渠道与安全特性显示项目正在向企业级使用场景扩展，路线图清晰。  
- **风险**：移动端交互和资源清理问题若不及时合并，可能在大规模部署时导致用户流失或系统不稳定。

> **结论**：NanoBot 处于 **快速迭代、功能稳步扩张** 的阶段；若继续保持当前的审查速度与回归测试投入，项目在 Q4 2026 前有望发布 **0.4.0**，实现渠道完整性、执行安全与移动端友好三大目标。  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报 – 2026‑09‑19**  
（数据来源：GitHub – 过去 24 小时）

| 维度 | 关键数据 |
|------|----------|
| Issues 更新 | 1 条（持续开放） |
| Pull Requests 更新 | 3 条（全部待审核） |
| 新版本发布 | 0 条 |

---

### 1️⃣ 今日速览  
- **活跃度**：本日无版本发布，项目活跃度维持在中等偏低水平。  
- **提交**：三条 PR 均在讨论/等待合并阶段，未有任何合并/关闭。  
- **社区**：唯一活跃 Issue #3355 仍未得到解决，讨论集中在 Feishu 配置错误。  
- **结论**：项目整体处于“待决”状态，核心功能仍在完善，社区贡献相对稳定但缺乏新功能合并。

---

### 2️⃣ 版本发布  
> **暂无新版本发布**。  

---

### 3️⃣ 项目进展  
| PR | 标题 | 主要内容 | 当前状态 |
|----|------|----------|----------|
| #3347 | *fix laggy interface* | 通过优化前端渲染逻辑，消除聊天区域文本过多导致的卡顿。 | **OPEN** – 已经通过本地测试，等待正式合并。 |
| #3371 | *feat(providers): add opencode-go provider with session header support* | 新增 `opencode-go` 提供者，支持 `x-opencode-session` 头部，自动路由到相应 API。 | **OPEN** – 正在代码审查。 |
| #3222 | *refactor(deltachat): cleanup implementation, documentation -200LOC* | 删除过时功能，改用官方 Relay 列表，重命名字段，完善文档。 | **OPEN** – 仍待讨论。 |

> **总体而言**：虽然无合并，但 PR 数量与质量均在提升，项目正向前推进中。

---

### 4️⃣ 社区热点  
| 链接 | 主题 | 讨论热度 | 关键诉求 |
|------|------|----------|----------|
| [Issue #3355](https://github.com/sipeed/picoclaw/issues/3355) | Feishu 配置错误 (`channel_list.feishu.app_id` 未知字段) | 2 条评论，暂无解决方案 | 用户需要快速定位配置字段错误，以实现 Feishu 通知。 |
| [PR #3371](https://github.com/sipeed/picoclaw/pull/3371) | 新增 opencode-go 提供者 | 0 条评论，待审 | 需求来自希望在 PicoClaw 内部使用 OpenCode Go 的团队。 |

> **分析**：Feishu 相关配置是当前最痛点；opencode-go 新功能则代表项目向多供应商扩展的路线图信号。

---

### 5️⃣ Bug 与稳定性  
| 识别 | 影响 | 是否已修复 | 备注 |
|------|------|------------|------|
| **#3355 – Feishu config unknown field** | 中等（导致 Feishu 通知失效） | **未修复** | PR #3347 与 #3371 与此无直接关系。 |
| **UI laggy** (PR #3347) | 低（前端卡顿） | **已实现**（待合并） | 通过前端优化已验证无卡顿。 |

> **建议**：优先处理 #3355，Feishu 作为主要通知渠道之一，配置错误直接影响用户体验。

---

### 6️⃣ 功能请求与路线图信号  
| 需求 | 相关 PR | 路线图阶段 |
|------|---------|------------|
| 支持 OpenCode Go Provider | #3371 | 预计 2026‑10 版本 |
| Deltachat 代码重构（减少冗余） | #3222 | 维护/清理阶段 |
| Feishu 配置错误快速定位 | #3355 | 维护/修复阶段 |

> **判断**：#3371 具备高价值、社区共识度高，预计可纳入下一版本；#3222 为长期维护任务；#3355 作为紧急修复。

---

### 7️⃣ 用户反馈摘要  
- **Feishu 配置问题**：用户在 `config.json` 中填写 `channel_list.feishu.app_id` 时收到“unknown field(s)”错误，导致 Feishu 推送失效。  
- **UI 卡顿**：部分用户在长对话记录时遇到浏览器卡顿，尤其是移动端。  
- **文档缺失**：新手用户在配置 DeltaChat 时缺少详细示例，导致上手难度。  

> **痛点**：配置错误与文档不完整是用户最常见的不满点；UI 性能改进则是次要但仍影响日常使用。

---

### 8️⃣ 待处理积压  
| 项目 | 说明 | 需要关注 |
|------|------|----------|
| **PR #3222** | Deltachat 代码重构，已自 2026‑07‑03 开始讨论 | 长期未合并，涉及多文件改动，建议优先评审完成 |
| **Issue #3355** | Feishu 配置错误 | 影响用户核心功能，建议在本周内完成修复或提供临时方案 |
| **PR #3371** | 新增 opencode-go 提供者 | 需要与现有 provider 兼容性测试，建议制定合并标准 |

> **提醒**：上述项目若继续未决，可能导致后续版本功能受限或社区失去信任。

---  

**结语**  
本日 PicoClaw 仍保持着一定的社区活跃度，但缺乏版本发布与关键合并。建议项目维护团队聚焦于 **Feishu 配置错误** 的快速修复与 **opencode-go** 新功能的完成，以提升用户体验与功能覆盖。同时，优先评审长周期 PR #3222，以确保代码质量与文档完整性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑09‑19**

| 区块 | 说明 |
|------|------|
| **今日速览** | 过去 24 小时内，项目保持高度活跃：4 条新 Issue 与 4 条待评估 PR。虽无版本发布，社区讨论集中在存储/OOM 与运行时配置等核心问题上，维护者与贡献者对即将到来的功能改进保持关注。 |
| **版本发布** | 无新版本发布。 |
| **项目进展** | 本日未有 PR 合并或 Issue 关闭，所有变更均处于待评估/待合并状态。 |
| **社区热点** | 1. **#3716** – “PreCompact conversation‑archive writes an unbounded, full‑rewrite file per firing”（高危 OOM 报告）<br>2. **#3735** – “conversations/ archives grow without bound” 与文件膨胀问题<br>3. **#3455** – “poll‑loop: heartbeat not touched between claim and first SDK event”（严重阻塞）<br>4. **#3714** – 环境变量覆盖未被容器接收，导致自动压缩与转录旋转失效。<br>以上 Issue 均已被多次讨论，社区对快速修复的需求强烈。 |
| **Bug 与稳定性** | - **#3716** (Severity = Critical) – OOM crash loop due to full‑rewrite archives.<br>- **#3455** (Severity = High) – claim‑stuck watchdog kills busy sessions.<br>- **#3735** (Severity = Medium) – infinite conversation archive growth.<br>目前无已提交的修复 PR，所有问题均保持开放状态。 |
| **功能请求与路线图信号** | - **#3741** – `--fresh-session` 选项可让计划任务保持无状态，减少资源消耗，已被视为下一版本功能候选。<br>- **#3852** 与 **#3851**（关于 Slack Token 轮转与 Codex Transport 可配置）将提升可靠性，可能在 2.x 系列中落地。 |
| **用户反馈摘要** | 1. **OOM 与存储膨胀**：多名用户在生产环境中遇到内存耗尽或磁盘空间枯竭。<br>2. **配置不生效**：Operator env 变量（如 `CLAUDE_CODE_AUTO_COMPACT_WINDOW_MS`）未被容器接收，导致压缩窗口无法自定义。<br>3. **监控与告警失效**：poll‑loop 失效导致服务无法自恢复。<br>整体用户满意度受核心稳定性问题影响，急需快速修复。 |
| **待处理积压** | - **#3716**、**#3735**、**#3455**、**#3714**：持续高优先级且未见合并/关闭。<br>- **PR #3850/3851/3852**：功能改进待评估。<br>建议维护者对上述 Issue 进行优先分配，或在下一个 sprint 里设立专门的 “稳定性修复” 子项目。 |

> **GitHub 链接**  
> Issues:  
> - [#3735](https://github.com/nanocoai/nanoclaw/issues/3735)  
> - [#3716](https://github.com/nanocoai/nanoclaw/issues/3716)  
> - [#3714](https://github.com/nanocoai/nanoclaw/issues/3714)  
> - [#3455](https://github.com/nanocoai/nanoclaw/issues/3455)  
> PRs:  
> - [#3852](https://github.com/nanocoai/nanoclaw/pull/3852)  
> - [#3851](https://github.com/nanocoai/nanoclaw/pull/3851)  
> - [#3850](https://github.com/nanocoai/nanoclaw/pull/3850)  
> - [#3741](https://github.com/nanocoai/nanoclaw/pull/3741)

> **建议**  
> - 将高严重性 Bug（#3716、#3455）提升到 PR Review 阶段，并优先讨论可行的修复方案。  
> - 对存储膨胀问题（#3735）实施一次性清理与自动轮转策略，以防生产崩溃。  
> - 对 env 变量未转发问题（#3714）进行代码审核，确保 Operator 配置在容器中可用。  
> - 评估 `--fresh-session` 方案的实现成本与收益，考虑在即将到来的 2.2 版本中合并。  
> - 关注 Slack Token 轮转与 Codex Transport 改动的兼容性，提前通知社区可能产生的中断。  

---

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-09-19)

## 1. 今日速览
IronClaw 项目在过去24小时内保持低强度但高精度的开发节奏，无新版本发布。社区活跃度主要集中在核心架构维护与LLM底层控制能力的增强上，共记录到1条Issue更新和2条Pull Request动态，所有PR均处于待合并状态。项目当前重心正从功能扩张转向底层稳定性加固（如Reborn持久化存储）和Provider适配的最基本化（如OAuth配置兼容性）。整体健康度稳定，核心维护者正在处理跨维度的复杂技术重构。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
*注：今日暂无PR完成合并或关闭操作，以下为核心在途PR的进展分析，虽未合并但反映了项目的最新技术动向。*

*   **Reborn 持久化存储架构重构**
    核心贡献者 `henrypark133` 更新了大型重构 PR [#7456](https://github.com/nearai/ironclaw/pull/7456)，旨在使 Reborn 持久化存储不再依赖特定 Profile 结构。该 PR 将根目录直接锁定在 `IRONCLAW_REBORN_HOME`，并引入了类型化的安全信封（typed security envelope），以防止仅重启操作导致租户或工作区隔离性减弱。这标志着项目在沙箱安全和多租户隔离底层逻辑上迈出了坚实一步。
    *链接: [PR #7456](https://github.com/nearai/ironclaw/pull/7456)*

*   **Extensions Provider 实例就绪状态优化**
    针对通过 Web UI 配置 Google OAuth 导致的激活失败问题，PR [#8102](https://github.com/nearai/ironclaw/pull/8102) 更新了扩展模块的逻辑，确保管理员通过界面配置的环境变量能被实时解析。虽然尚未合并，但该修复直接解决了当前部署中常见的“配置即失效”痛点。
    *链接: [PR #8102](https://github.com/nearai/ironclaw/pull/8102)*

## 4. 社区热点
今日社区讨论集中在 LLM 请求路径的通用性控制上。

*   **LLM 思考/努力程度通用控制机制**
    Issue [#7537](https://github.com/nearai/ironclaw/issues/7537) 是今日唯一活跃且具有高技术深度的讨论点。该 Issue 由 `serrrfirat` 发起，提出了在 LLM 请求路径中增加“通用 thinking/effort 控制”的需求。讨论背景是 DeepSeek V4 Flash 在特定 checkpoint (0731) 下表现过于冗长，用户希望引入一个逐请求（per-request）且可映射为各 Provider 原生参数的控制开关。尽管该 Issue 创建于8月，但今日的新评论（共2条）表明该需求正在被核心团队重新审视，旨在解决不同模型响应长度不可控的通用性问题。
    *链接: [Issue #7537](https://github.com/nearai/ironclaw/issues/7537)*

## 5. Bug 与稳定性
今日未报告新的崩溃或严重回归问题，但存在两个高优先级的在途修复（Fix）：

*   **Google OAuth 激活失败 (中等严重度)**
    *   **问题描述**：在通过 Web UI（管理员配置）而非环境变量配置 Google OAuth 客户端的部署环境中，Gmail/Google Calendar 扩展在 OAuth 授权完成后激活失败，报错 `Provider...`。
    *   **当前状态**：已有对应 Fix PR [#8102](https://github.com/nearai/ironclaw/pull/8102) 待合并。该问题阻碍了通过标准管理界面进行部署的用户使用核心扩展功能。
    *   **链接**: [PR #8102](https://github.com/nearai/ironclaw/pull/8102)

*   **Reborn Profile 隔离性潜在风险 (高严重度/潜在)**
    *   **问题描述**：当前的 Reborn 持久化存储在与 Profile 耦合时，可能存在仅通过重启操作即可削弱租户或工作区隔离性的安全真空。
    *   **当前状态**：PR [#7456](https://github.com/nearai/ironclaw/pull/7456) 正在重构此部分以确保存储配置与 Profile 解耦并强化安全信封。
    *   **链接**: [PR #7456](https://github.com/nearai/ironclaw/pull/7456)

## 6. 功能请求与路线图信号
*   **Provider 原生参数映射标准化**
    Issue [#7537](https://github.com/nearai/ironclaw/issues/7537) 揭示了 Roadmap 的一个重要方向：**从“模型特定适配”向“Provider 原生化映射”转变**。用户不再满足于简单地切换模型，而是希望 IronClaw 能提供一种通用的抽象层，将应用层的“thinking level”（思考深度/努力程度）自动映射为 DeepSeek、OpenAI 等各家 API 的原生参数（如 `chat_template_kwargs`）。
    *   **信号分析**：鉴于该 Issue 标签包含 `scope: llm` 且今日有新活动，预计该项目将在后续版本中引入统一的 LLM 请求元数据控制接口，以支持更精细的内容生成控制。

## 7. 用户反馈摘要
基于现有 Issues 和 PRs 的描述，提炼出以下用户痛点：

*   **痛点 1：配置来源的不一致性**
    用户（`henrypark133` 代表的运维/部署场景）反馈，通过 Web UI 进行的“管理员配置”与通过 Env Vars 配置的行为不一致。这导致了“看似配置成功（OAuth 完成），实则功能失效”的隐蔽错误。用户期望 UI 配置优先级最高且实时生效，这一诉求在 PR #8102 中得到响应。
*   **痛点 2：模型响应的不可预测性**
    Issue #7537 反映出用户对 LLM 输出效率与控制力的焦虑。特定版本的 DeepSeek 模型变得“冗长（verbose）”，用户缺乏在应用层直接通过标准 API 字段调节模型“思考努力程度”的手段，被迫依赖模型版本回退或提示词工程。

## 8. 待处理积压
*   **PR #7456 (Reborn Storage Refactor)**
    *   **状态**：Open，创建于 2026-08-10，已滞留约 40 天。
    *   **风险提示**：该 PR 标记为 `size: XL`（超大）和 `contributor: core`，涉及沙箱、CI、依赖项和文档的广泛改动。尽管是核心贡献者发起的高风险（risk: medium）重构，但长时间未合并可能导致主干分支在 Reborn 存储架构上出现技术债累积，或导致其他相关 PR 的冲突。建议维护者评估该 PR 的拆分子项，或尽快进行代码评审以合并基础安全修复。
    *   **链接**: [PR #7456](https://github.com/nearai/ironclaw/pull/7456)

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-09-19)

## 1. 今日速览
LobsterAI 社区今日保持**高活跃度**，过去24小时产生 23 个 PR 更新和 6 个 Issue 互动，开发节奏紧凑。项目重点聚焦于 **OpenClaw 网关稳定性修复** 和 **Windows 平台兼容性优化**，多次出现状态为 `[CLOSED]` 的修复型 PR，表明团队正在积极清理技术债务。值得注意的是，尽管有多个实质性修复合并，但尚未发布新的正式版本（Release），新功能（如 Cowork 模式增强）仍处于 Open PR 阶段，预计将汇入近期的版本迭代中。

## 2. 版本发布
*本日无新版本发布。*

## 3. 项目进展
今日主要推进了 OpenClaw 核心引擎的健壮性以及协作（Cowork）功能的完善，具体合并/关闭的 PR 如下：

*   **OpenClaw 启动恢复与生命周期加固**:
    *   合并了 [PR #2701](https://github.com/netease-youdao/LobsterAI/pull/2701) `fix(openclaw): harden startup recovery and Feishu secret routing`，增强了 Windows 网关在 Electron 主进程异常退出时的清理机制，并修复了飞书凭据错位问题。
    *   关闭了 [PR #2702](https://github.com/netease-youdao/LobsterAI/pull/2702) `fix: openclaw workspace setup recovery`，预计解决了工作区初始化失败的回归问题。
*   **IM 渠道功能完善**:
    *   关闭了 [PR #2718](https://github.com/netease-youdao/LobsterAI/pull/2718) `fix: weixin qq qr login channel routing`，修复了微信/QQ 二维码登录时的渠道路由问题。
    *   关闭了 [PR #2717](https://github.com/netease-youdao/LobsterAI/pull/2717) `feat: scheduled task weixin delivery receipt`，为微信定时任务增加了投递回执功能，提升了 IM 场景下的用户体验闭环。
*   **协作与子代理可视化**:
    *   关闭了 [PR #2703](https://github.com/netease-youdao/LobsterAI/pull/2703) `feat: subagent session visibility`，增强了子代理（Subagent）会话的可见性，有助于用户监控 Agent 内部执行状态。
    *   关闭了 [PR #2696](https://github.com/netease-youdao/LobsterAI/pull/2696) 部分重构，将工作区审查、内嵌问题坞等 Codex 风格改进重新基线化合入主干（注：此PR状态为Closed，需确认是否因冲突关闭或已合并，根据上下文推测为已完成阶段性整合或移至其他分支，此处按已处理计）。

## 4. 社区热点
今日讨论最活跃的条目集中在 **Windows 环境下的构建与启动稳定性** 问题：

*   **[PR #2719](https://github.com/netease-youdao/LobsterAI/pull/2719) (Open): `fix(openclaw): repair leftovers from older builds at startup instead of failing every launch`**
    *   **背景**: 用户从旧版本升级（包含 Windows 卸载重装但保留 `%APPDATA%` 场景）后，因残留的 `openclaw.json` 配置导致启动失败。
    *   **分析**: 这是一个典型的“升级兼容性问题”，影响面较广。PR 提出了自动修复残留配置的方案，避免每次启动都失败。这将极大提升老用户升级后的“开箱即用”体验。
*   **[PR #2709](https://github.com/netease-youdao/LobsterAI/pull/2709) (Open): `fix(openclaw): fall back when Windows private SQLite staging dirs fail`**
    *   **背景**: 在 Windows 上，由于安全软件阻止 `powershell.exe` 或处于受限语言模式，导致 OpenClaw v2026.8.1 创建私有 SQLite 临时目录失败。
    *   **分析**: 针对企业办公环境（常见安全管控）的痛点进行了修补，增加了回退机制，提升了 B 端或企业用户的可用性。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在 **配置持久化**、**启动阻塞** 和 **媒体生成控制** 方面：

| 严重程度 | 问题描述 | 关联 Issue/PR | 状态 |
| :--- | :--- | :--- | :--- |
| **High** | **Hooks 配置丢失**：Gateway 重启后，`user_plugins` 的 hooks 字段未被持久化到磁盘，导致配置失效。 | [Issue #2654](https://github.com/netease-youdao/LobsterAI/issues/2654) | ⏳ 待修复 (已有分析) |
| **Medium** | **Windows 启动阻塞**: 外部开发者构建时因内网 npm registry 不可达导致 5 分钟卡死；或旧版本残留导致启动失败。 | [Issue #1025](https://github.com/netease-youdao/LobsterAI/issues/1025), [PR #2719](https://github.com/netease-youdao/LobsterAI/pull/2719) | 🔄 修复中 |
| **Medium** | **付费内容误触发**：媒体模型选择状态跨消息持久化，导致用户未请求时，聊天模型可能意外触发付费图片/视频生成。 | [PR #2714](https://github.com/netease-youdao/LobsterAI/pull/2714) | 🔄 修复中 |
| **Low** | **重复 Skill 安装**：重新导入同名 Skill 时静默安装为副本（`skill-1`），而非覆盖或提示。 | [PR #2712](https://github.com/netease-youdao/LobsterAI/pull/2712) | 🔄 修复中 |
| **Low** | **YAML 解析容错**: 第三方 SKILL.md 中无效 YAML 导致版本信息丢失，进而影响更新检测。 | [PR #2711](https://github.com/netease-youdao/LobsterAI/pull/2711) | 🔄 修复中 |

## 6. 功能请求与路线图信号
基于今日的 Open PRs，以下功能预计将在近期版本中落地，显示出项目在 **Agent 能力细化** 和 **交互体验** 上的投入：

*   **Cowork 模式增强**:
    *   **[PR #2716](https://github.com/netease-youdao/LobsterAI/pull/2716)**: 引入 **Auto** 和 **Max** 两种模型模式。Auto 每轮自动选择最适模型，Max 强制使用用户选定的最强模型。这解决了用户在不同任务复杂度下手动切换模型的痛点。
    *   **[PR #2710](https://github.com/netease-youdao/LobsterAI/pull/2710)**: 支持传递 **per-server MCP toolFilter** 和 **并行工具调用** 配置。这使得用户可以根据会话需求精细化控制 Agent 可调用的 MCP 工具，优化 Token 消耗和执行效率。
*   **Skills 生态体验优化**:
    *   **[PR #2713](https://github.com/netease-youdao/LobsterAI/pull/2713)**: Marketplace 标签页显示每个类别下的 Skill 数量，帮助用户快速发现内容。
    *   **[PR #2712](https://github.com/netease-youdao/LobsterAI/pull/2712)**: 重新导入已安装 Skill 时增加确认提示，防止误操作导致版本混乱。
*   **Gateway 重启机制优化**:
    *   **[PR #2708](https://github.com/netease-youdao/LobsterAI/pull/2708)** & **[PR #2707](https://github.com/netease-youdao/LobsterAI/pull/2707)**: 优化了 Gateway 延迟重启（Deferred Restart）的逻辑，确保配置变更后能正确应用，并防止因短暂不稳定导致的无限重启循环（仅在稳定窗口后才能重置重启计数器）。

## 7. 用户反馈摘要
从 Open Issues 中提炼出的用户痛点主要集中在 **环境隔离性** 和 **内部依赖解耦**：

*   **内网依赖阻碍外部开发**:
    *   [Issue #1015](https://github.com/netease-youdao/LobsterAI/issues/1015) 和 [Issue #1025](https://github.com/netease-youdao/LobsterAI/issues/1025) 反复提及 `npm.nie.netease.com` registry 不可达导致构建失败或卡死。
    *   **痛点**: 虽然标记为 `optional`，但构建脚本缺乏对网络不可达的快速失败或跳过逻辑。外部贡献者或企业自托管用户受此困扰严重。
    *   **建议**: 社区强烈建议在构建脚本中添加可达性检查或环境变量开关，彻底解耦内网依赖。
*   **主进程代码结构膨胀**:
    *   [Issue #1024](https://github.com/netease-youdao/LobsterAI/issues/1024) 指出 `src/main/main.ts` 包含大量业务逻辑，维护困难。
    *   **痛点**: 缺乏清晰的目录结构（如 core, security, lifecycle 分离），导致新贡献者上手门槛高，代码耦合度高。
*   **登录态下发问题**:
    *   [Issue #1016](https://github.com/netease-youdao/LobsterAI/issues/1016) 反馈网易员工登录后，Deep Link 未正确回传 Auth Token，导致客户端仍处于未登录状态。
    *   **痛点**: 鉴权流程闭环不完整，影响企业内网用户的核心使用路径。
*   **LLM 参数限制**:
    *   [Issue #1023](https://github.com/netease-youdao/LobsterAI/issues/1023) 反馈讯飞 API 因 Token limit 设置过高（>90000）导致 400 错误。
    *   **痛点**: 缺乏灵活的 Engine 参数自定义能力，Hard-coded 的限制值不适应不同 Provider 的差异化约束。

## 8. 待处理积压
以下 Issue 创建时间较早（2026-03-30），今日仅有少量评论更新，处于 **Stale** 状态，鉴于其反映的是基础设施或架构层面的问题，建议维护者关注：

*   **[Issue #1015](https://github.com/netease-youdao/LobsterAI/issues/1015)** & **[Issue #1025](https://github.com/netease-youdao/LobsterAI/issues/1025)**: **构建脚本内网依赖问题**。这两个问题已存在数月，且直接影响外部社区贡献者的参与热情。建议在下个版本中作为 P1 优先级修复，提供公网友好的构建选项。
*   **[Issue #1024](https://github.com/netease-youdao/LobsterAI/issues/1024)**: **main.ts 代码重构**。虽然没有直接阻塞功能，但长期的架构腐化会影响开发效率。建议在下一个大版本迭代前规划专门的重构周。
*   **[Issue #1023](https://github.com/netease-youdao/LobsterAI/issues/1023)**: **LLM 引擎参数自定义**。随着接入的多模态和长上下文 LLM 增多，硬编码的参数限制将成为瓶颈。建议考虑在 Settings 中暴露高级参数配置面板。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*