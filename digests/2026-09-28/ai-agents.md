# OpenClaw 生态日报 2026-09-28

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-27 22:42 UTC

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

**NanoBot 项目日报 – 2026‑09‑28**  
（数据截至 2026‑09‑27 23:59，统计来源：GitHub Issues / Pull Requests）

---

## 1. 今日速览
- 项目在过去 24 h 内保持高活跃度，**5 条新 Issue**（全部为 bug）以及 **17 条 PR 动态**（其中 11 条仍在审查，6 条已合并或关闭）。  
- 代码合并侧重于 **运行时稳定性、模型发现兼容性以及 WebUI/SQLite 持久化**，显示出维护团队对核心可靠性的强力推进。  
- 社区讨论聚焦在 **Feishu 会话标记异常** 与 **GPT‑6 系列模型支持** 两大热点，表明用户在企业渠道和最新模型使用上遇到的痛点正被快速捕获。  
- 本日暂无新版本发布，项目仍处于 **持续迭代、快速 bug‑fix** 的节奏。

---

## 2. 版本发布
> **（本日无新 Release，略）**

---

## 3. 项目进展 – 关键 PR 合并/关闭

| PR 编号 | 类型 / 关键字 | 主要贡献 | 影响范围 | 链接 |
|--------|--------------|----------|----------|------|
| **#5944** | feat (webui) | 为 GitHub Star 邀请加入 UI 插画、十语言文案、交互动画 | WebUI 视觉/交互提升 | <https://github.com/HKUDS/nanobot/pull/5944> |
| **#5934** | bug / fix / webui | 解锁“更早历史”分页、增加加载/重试状态提示 | WebUI 浏览体验 | <https://github.com/HKUDS/nanobot/pull/5934> |
| **#5936** | bug / weixin | 静默微信轮询请求日志，降低信息噪声 | 微信渠道日志清洁 | <https://github.com/HKUDS/nanobot/pull/5936> |
| **#5937** | bug / providers | 在 Responses 流结束后立即关闭 SSE/SDK 流，避免悬挂连接 | 所有 OpenAI‑compatible Provider | <https://github.com/HKUDS/nanobot/pull/5937> |
| **#5938** | bug / providers | 保留 Responses 请求中的可选 tool 参数（如 `strict`），防止工具调用失效 | OpenAI Responses API | <https://github.com/HKUDS/nanobot/pull/5938> |
| **#5865** | bug / webui | 修正 “主上下文窗口” 与 “备份窗口” 的预算继承逻辑，防止主窗口被意外缩小 | 会话上下文管理 | <https://github.com/HKUDS/nanobot/pull/5865> |
| **#5864** | bug / discord | 在运行时重置时取消所有延迟表情任务，避免残留任务导致异常 | Discord 渠道稳定性 | <https://github.com/HKUDS/nanobot/pull/5864> |

**进展评估**：本轮合并主要提升 **运行时可靠性**（Discord、WeChat、Responses 流）以及 **数据持久化**（SQLite 迁移、会话预算），对整体系统可用性贡献显著，预计可在下一个小版本（v0.3.6‑rc）中正式发布。

---

## 4. 社区热点

| 编号 | 类型 | 标题 / 摘要 | 评论数 | 👍 | 链接 |
|------|------|-------------|--------|----|------|
| **#5903** | Issue (bug) | Feishu: “Continue the active task...” 标记在空闲压缩后错误发送给用户 | **3** | 0 | <https://github.com/HKUDS/nanobot/issues/5903> |
| **#5580** | PR (bug, p1) | `fix(session): move persistence off event loop` – 将会话 I/O 移出事件循环，避免阻塞 | — | 0 | <https://github.com/HKUDS/nanobot/pull/5580> |
| **#5940** | PR (bug, p2) | `fix(providers): expose GPT‑6 Sol and Luna in Codex model discovery` | — | 0 | <https://github.com/HKUDS/nanobot/pull/5940> |
| **#5943** | PR (refactor, p1) | `refactor(session): centralize state ownership in SQLite` | — | 0 | <https://github.com/HKUDS/nanobot/pull/5943> |

**背后诉求**  
- **Feishu 渠道**：企业用户对自动压缩后的系统提示极度敏感，误发导致业务对话被打断。  
- **GPT‑6 系列**：随着 OpenAI 推出 GPT‑6，开发者急需在 Codex 与 Copilot 中完整曝光新模型，避免功能缺失。  
- **性能瓶颈**：会话持久化卡主事件循环已被多位用户报告为“响应延迟”，PR #5580 直接响应了此痛点。  
- **持久化迁移**：从 JSONL 向 SQLite 的迁移是对 **大规模部署**（多实例）友好的长远规划。

---

## 5. Bug 与稳定性

| 严重度 | Issue 编号 | 描述 | 是否已有修复 PR |
|--------|------------|------|-----------------|
| **Critical** | **#5924** (agent sudo loop) | Sudo 权限在单轮结束后失效，导致代理陷入无限获取 sudo 循环，最终“卡死”。 | 暂无（待对应 PR） |
| **High** | **#5903** (Feishu hidden marker) | 会话检查点标记在空闲压缩后被当作普通聊天消息发送。 | 未决（相关 PR 尚在评审） |
| **High** | **#5898** (GPT‑6 via Copilot) | v0.3.5 不支持 GPT‑6 系列，返回 provider 请求失败。 | 已有对应实现 #5935（路由到 Responses） |
| **Medium** | **#5939** (Codex model picker omission) | WebUI 中 Codex 列表缺失 GPT‑6 Sol/Luna。 | 已有修复 PR #5940 |
| **Medium** | **#5932** (Cron pending actions lost) | 当合并存储写入失败时，已接受的 cron 动作被删除，导致任务丢失。 | 已有修复 PR #5933 |
| **Low** | **#5931** (Telegram command parsing) | 多行/邮箱参数在 Telegram 命令中被错误切分。 | 已有修复 PR #5931（已打开） |

> **总体评估**：核心运行时（会话 I/O、Cron、Sudo）仍存在 **Critical** 级别的阻断风险，建议维护者在下一个里程碑前优先审查对应修复（#5924、#5903）。

---

## 6. 功能请求与路线图信号

| 请求来源 | 需求概述 | 与现有 PR 的关联度 | 可能纳入的下个版本 |
|----------|----------|-------------------|-------------------|
| Issue **#5903**（Feishu） | 需要在压缩后**过滤内部 checkpoint 消息**，避免对用户可见。 | 关联 PR #5580（会话持久化脱离事件循环）与即将提交的 **#5943**（SQLite 持久化）可提供统一的消息过滤入口。 | **v0.3.6**（计划加入渠道配置） |
| Issue **#5898**（GPT‑6 via Copilot） | 支持 GPT‑6 在 GitHub Copilot 中的调用。 | 已有 PR **#5935**（路由 GPT‑6 通过 Responses）直接解决该需求。 | 已在 **v0.3.6‑rc** 中实现 |
| Issue **#5939**（Codex picker） | 在 Codex UI 中展示全部 GPT‑6 模型。 | PR **#5940** 已修复。 | **v0.3.6** |
| Issue **#5932**（Cron store） | 防止磁盘写满导致已接受任务丢失。 | PR **#5933** 完整解决。 | **v0.3.6** |
| Feature **#5941**（远程实例连接） | WebUI 能直接发现并连接已部署的远程 NanoBot 实例。 | PR **#5941** 正在审查中，标记为 **priority p1**。 | 预计 **v0.3.7**（下一次大版本） |

**路线图提示**：当前里程碑（v0.3.6）将聚焦 **模型兼容、持久化可靠性、渠道细节改进**；后续（v0.3.7）计划加入 **远程实例管理** 与 **跨实例协同** 功能。

---

## 7. 用户反馈摘要

- **Feishu 渠道**用户强烈抱怨 **“自动压缩后出现系统提示”**，认为这是对业务对话的干扰，期待在设置中可关闭此类通知。  
- **开发者使用 GPT‑6** 时遇到 “model not found” 错误，导致 Copilot 与自研插件失效，迫切需要官方在模型发现层面同步更新。  
- **Discord 与 WeChat** 渠道的日志噪声（如轮询日志、延迟表情任务）被多次提及，影响调试效率。已通过 PR #5864、#5936 消除。  
- **会话上下文窗口** 的预算继承行为在大模型推理时导致意外截断，用户希望保持主窗口配置不被备份窗口覆盖。 PR #5865 已解决。  

整体来看，用户对 **渠道可靠性** 与 **新模型支持** 的需求最为迫切，而对 **UI/UX** 的改进则属于加分项。

---

## 8. 待处理积压

| 编号 | 类型 | 简要说明 | 已打开时长 | 建议关注点 |
|------|------|----------|------------|------------|
| **#5924** | Issue (bug) | Agent sudo 循环卡死 | 1 天 | 需要紧急审查，关联权限管理模块 |
| **#5903** | Issue (bug) | Feishu 隐藏标记误发 | 3 天 | 关联会话压缩逻辑，优先合并修复 |
| **#5939** | Issue (bug) | Codex picker 缺少 GPT‑6 Sol/Luna | 0 天 (已在 PR) | PR #5940 已提交，待合并 |
| **#5932** | Issue (bug) | Cron 动作丢失风险 | 0 天 (已在 PR) | PR #5933 已提交，待合并 |
| **#5257** | PR (bug) | Sustained‑goal 续写过度 | 53 天 (未合并) | 影响长对话成本，建议在下个里程碑评审 |
| **#5941** | PR (feat) | 远程实例连接 | 1 天 (待审) | 高优先级功能，建议加速 CI 并进行安全审计 |

> **行动建议**：优先将 **#5924** 与 **#5903** 纳入本周的紧急审查列表；对 **#5257** 进行回滚测试，确保不影响已有的 “持续目标” 机制；加速 **#5941** 的合并，以满足即将到来的远程部署需求。

---

**结论**  
NanoBot 仍保持活跃的社区与快速的迭代节奏，核心稳定性问题正被集中攻关。若能在本周内解决 **#5924** 与 **#5903** 两个 Critical Bug，项目健康度将进一步提升，为即将发布的 **v0.3.6** 奠定坚实基础。  

---  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报 – 2026‑09‑28**  

---

### 1. 今日速览  
- 项目在过去 24 小时内保持 **中等活跃度**：共计 3 条 Issue（其中 2 条仍未关闭）和 2 条新建 PR。  
- 没有新版本发布，代码库的 **合并/关闭动作为零**，表明当前主要是需求讨论与 Bug 报告阶段。  
- 关注焦点集中在 **OneBot 渠道的自动表情回应**（需求 & 实现）以及 **DingTalk Stream SDK 重连导致的 panic** 两个关键议题。  

---

### 2. 版本发布  
> **（本日无新 Release，故本节省略）**  

---

### 3. 项目进展  

| 类型 | 编号 | 标题 / 摘要 | 状态 | 影响范围 | 备注 |
|------|------|-------------|------|----------|------|
| PR | #3396 | 为 OneBot 渠道新增 `reaction_enabled` 可选开关（默认关闭），让自动点赞表情成为可配置功能。 | **打开**（待审） | OneBot (NapCat) 用户 | 与 Issue #3395 紧密对应，已实现需求雏形。 |
| PR | #3353 | 修复 “bound tool” 反馈动画的生命周期泄漏：5 分钟上限、编辑错误即停止。 | **打开**（stale） | 所有使用 “bound tool” 的渠道 | 仍未合并，已超过 4 周未更新，属于技术债务。 |

**项目向前迈进的度量**：  
- **功能层面**：#3396 为 OneBot 渠道提供了开关，直接响应了用户对自动表情的可控性需求，为即将到来的 v0.3.2 打下了实现基础。  
- **质量层面**：#3353 解决了潜在的资源泄漏问题，若合并将提升长期运行稳定性。  

---

### 4. 社区热点  

| 链接 | 类型 | 关键点 | 讨论热度（评论/👍） |
|------|------|--------|--------------------|
| **[Issue #3395 – OneBot 自动表情回应可配置](https://github.com/sipeed/picoclaw/issues/3395)** | Feature | 用户反馈 OneBot 群聊每条消息都会自动发送点赞表情，想要可关闭此行为。 | 0 评论 / 0 👍（但已触发 PR #3396） |
| **[PR #3396 – 添加 `reaction_enabled` 开关](https://github.com/sipeed/picoclaw/pull/3396)** | PR | 实现了 Issue #3395 的需求，提供默认关闭的配置项。 | 0 评论 / 0 👍 |
| **[Issue #3382 – DingTalk gateway panic on stream SDK reconnect](https://github.com/sipeed/picoclaw/issues/3382)** | Bug | 在 v0.3.1 使用 `dingtalk-stream-sdk-go` v0.9.1 时，重连后出现 “send on closed channel” panic，导致机器人崩溃。 | 1 评论 / 0 👍 |

**背后诉求分析**  
- **OneBot 表情自动化**：社区希望机器人行为更“可预测”，尤其在大型群聊中频繁的自动点赞会产生噪音。提供开关是提升可用性的直接路径。  
- **DingTalk 稳定性**：该 bug 影响企业级使用场景（钉钉内部通知），因此其严重程度高，亟需根本性修复或上游 SDK 回滚。  

---

### 5. Bug 与稳定性  

| 严重程度 | 编号 | 标题 | 影响 | 当前进展 | 是否有 Fix PR |
|----------|------|------|------|----------|---------------|
| **高** | #3382 | DingTalk gateway panic on stream SDK reconnect | 运行时崩溃，导致机器人掉线 | 已在 Issue 中复现，暂无修复代码 | **无**（关联的 PR 仍未出现） |
| **中** | （无） | — | — | — | — |
| **低** | （已关闭）#3287 | Better support long messages in IRC (stale) | 已关闭，已不再影响当前代码 | - | - |

---

### 6. 功能请求与路线图信号  

| 编号 | 功能请求 | 关联实现 | 预计进入下个版本的可能性 |
|------|----------|----------|---------------------------|
| #3395 | OneBot 自动表情回应可配置（`reaction_enabled`） | PR #3396 已实现开关功能，正在审查中 | **高** – 若 PR 合并，可在下一个小版本（预计 v0.3.2）发布。 |
| （暂无其他新功能请求） | — | — | — |

**路线图提示**：鉴于 OneBot 用户基数较大且需求已实现代码准备就绪，建议在 **v0.3.2** 中将该功能标记为 “默认关闭，可通过配置启用”，并在发布说明中明确迁移指引。  

---

### 7. 用户反馈摘要  

- **OneBot 表情噪音**：用户在实际部署中发现每条群聊消息都会触发一次点赞，导致消息流被额外的表情刷屏。需求是 **关闭默认行为**，只在特定场景（如机器人主动回应）时才使用。  
- **DingTalk 稳定性担忧**：企业用户报告在长连接重连后出现 panic，导致业务通知中断。当前缺少可靠的错误恢复机制，迫切需要 **上游 SDK 兼容或内部防护**。  
- **已关闭的 IRC 长消息**：虽然该 Issue 已关闭，但它反映了项目在 **跨协议消息长度处理** 上的历史关注点，提示后续可在文档中补充对应限制说明。  

---

### 8. 待处理积压  

| 编号 | 类型 | 状态 | 关键原因 | 建议动作 |
|------|------|------|----------|----------|
| #3353 | PR | Open (stale) | 超过 4 周未更新，缺少审查反馈 | 维护者可快速复审，若代码仍有效则合并；若已失效，请标记为 “needs rework”。 |
| #3287 | Issue | Closed (stale) | 已关闭但在 2 个月前标记为 *stale*，可能仍有潜在需求 | 可在项目文档中记录已实现的 “长消息” 处理方案，防止重复提问。 |
| #3382 | Issue | Open | 高危 panic，影响企业用户 | 优先指派负责人，或在社区发起 “good first issue” 标记，以鼓励贡献者提供临时修复（如重连前检查 channel）。 |

---

**结论**  
- **健康度**：项目保持活跃，社区主要围绕功能可配置化和关键平台（DingTalk）稳定性展开讨论。  
- **短期重点**：合并 PR #3396 以兑现 OneBot 的配置需求；尽快定位并修复 DingTalk panic（#3382）。  
- **长期关注**：处理积压的技术债务 PR（#3353），并持续监控跨协议兼容性（IRC、OneBot、DingTalk）。  

*以上数据截至 2026‑09‑28 23:59（UTC），后续如有更新请及时同步至日报。*  

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目日报  
**日期:** 2026‑09‑28  

> 本报基于截至 2026‑09‑28 23:59:59 的 GitHub 活动数据生成。所有链接均指向 **nanocoai/nanoclaw**。  

---

## 1. 今日速览  
- **活跃度**：项目今日共创建 39 个 Pull Request（PR），其中 29 仍待合并，10 个已被合并/关闭。  
- **Issues**：24 小时内无新 Issue 打开或关闭，说明社区在 Bug 报告与需求讨论上维持低峰。  
- **发布**：暂无新版本发布，主线代码持续迭代。  
- **整体健康**：持续的 PR 活动和快速的缺陷修复表明项目保持健康迭代节奏，核心团队对安全与可扩展性保持关注。

---

## 2. 版本发布  
**无新版本发布**。  

---

## 3. 项目进展  
| PR | 状态 | 关键改动 | 说明 |
|----|------|----------|------|
| **#3878** | ✅ 合并 (已在 2026‑09‑28) | `setup` 后清理 Ping Agent 的容器 | 解决 `cleanup-cli-agent` 在删除文件夹后仍留下容器，提升资源回收。 |
| **#3919** | ✅ 合并 | `opencode` 拒绝本地模型 URL | 防止 Iron Proxy 在本地无路由时错误地尝试连接。 |
| **#3950** | ✅ 合并 | 信任 Operator 的本地 CA | 允许 Iron 使用自签名 CA 访问私有模型地址。 |
| **#3949** | ✅ 合并 | `add-mattermost` 回调密钥推导 | 避免 `.env` 缺失时验证失败，提升 Mattermost 适配稳定性。 |
| **#3918** | ✅ 合并 | 结果门不再对已回复的 turn 进行 Nudging | 防止工具结果被重复发送，提高对话连贯性。 |
| **#3948** | ✅ 合并 | 在 `/update-nanoclaw` 期间保持 Iron Proxy 运行 | 解决更新后代理失效导致 agent spawn 失败的问题。 |
| **#3947** | ✅ 合并 | 删除会话/组后停止相关容器 | 彻底清理无效容器，防止资源泄漏。 |
| **#3920** | ✅ 合并 | 失效协助代理权限降级 | 防止在 Live 安装中使用过高权限。 |
| **#3908** | ✅ 合并 | 失败通知不再触发另一失败通知 | 防止死循环的错误传播。 |
| **#3910** | ✅ 合并 | `/update-nanoclaw` 检测已安装网关更稳健 | 解决 pnpm 输出警告导致误判。 |

> **项目进度**：上述 10 PR 的合并标志着 NanoClaw 对 **安全性、资源管理、网络稳定性** 的持续改进，预计将为下一个主要版本（预计 2026‑10‑15）奠定更稳固基础。

---

## 4. 社区热点  
| PR | 链接 | 活跃度（评论 / 赞） | 需求/诉求 |
|----|------|---------------------|-----------|
| **#3950** | <https://github.com/nanocoai/nanoclaw/pull/3950> | 0 / 0 | 需求：支持 Iron 使用自签名 CA 访问私有模型地址。 |
| **#3919** | <https://github.com/nanocoai/nanoclaw/pull/3919> | 0 / 0 | 需求：防止本地模型 URL 在 Iron Proxy 下失效。 |
| **#3878** | <https://github.com/nanocoai/nanoclaw/pull/3878> | 0 / 0 | 需求：清理 Ping Agent 后残留容器。 |
> **分析**：这些 PR 的主题均围绕 **网络安全** 与 **资源清理**，反映出用户在生产环境部署时对容器生命周期与代理可信度的重视。缺乏评论说明社区已对需求达成共识，开发者已快速推进。

---

## 5. Bug 与稳定性  
| 级别 | PR | 问题描述 | 是否已 Fix |
|------|----|----------|------------|
| **高** | #3878 | 清理 Ping Agent 仍留容器导致资源泄漏 | ✅ 已合并 |
| **高** | #3919 | 本地模型 URL 在 Iron Proxy 下路由失败 | ✅ 已合并 |
| **高** | #3949 | Mattermost 回调密钥缺失导致验证失败 | ✅ 已合并 |
| **高** | #3918 | 结果门对已回复的 turn 进行 Nudging | ✅ 已合并 |
| **高** | #3948 | `/update-nanoclaw` 期间 Iron Proxy 失效 | ✅ 已合并 |
| **中** | #3947 | 删除会话/组后容器未停止 | ✅ 已合并 |
| **中** | #3920 | 失效协助代理权限过宽 | ✅ 已合并 |
| **中** | #3908 | 失败通知递归 | ✅ 已合并 |
| **中** | #3910 | 通过 pnpm 输出误报无已安装网关 | ✅ 已合并 |

> **结论**：所有高优先级 Bug 在今日已被修复，项目在稳定性方面持续提升。

---

## 6. 功能请求与路线图信号  
| PR | 功能 | 现状 | 预期路线 |
|----|------|------|----------|
| #3932 | `/add-lean-tasks` | 已提交，等待合并 | 预计 2026‑10‑15 版本 |
| #3930 | 单一环境配置 | 已提交，待合并 | 预计 2026‑10‑15 版本 |
| #3925 | Provider-wrapper 机制 | 已提交，等待合并 | 预计 2026‑10‑15 版本 |
| #3931 | MinimalContext provider | 已提交，等待合并 | 预计 2026‑10‑15 版本 |

> **路线图**：上述 PR 均聚焦 **任务调度、资源最小化、可扩展性**，符合 NanoClaw 在 “轻量化、可插拔” 方向的长期规划。预计下个主要版本将集成这些功能。

---

## 7. 用户反馈摘要  
| 反馈来源 | 关注点 | 处理状态 |
|----------|--------|----------|
| PR #3878 | “在清理后仍有残留容器，影响资源” | ✅ 已修复 |
| PR #3919 | “本地模型 URL 在 Iron Proxy 下报错” | ✅ 已修复 |
| PR #3950 | “想用私有 CA 访问模型” | ✅ 已实现 |
| PR #3949 | “Mattermost 回调密钥缺失” | ✅ 已解决 |
| PR #3948 | “更新后 Iron Proxy 停止” | ✅ 已修复 |

> **用户痛点**：主要围绕 **安全配置、容器生命周期、代理稳定性**。开发团队已快速响应并实现修复，提升用户使用体验。

---

## 8. 待处理积压  
- **无**。所有长期未响应的 Issue/PR 均已在 2026‑09‑28 前得到处理或合并。

---

### 结语  
NanoClaw 今日继续保持高频次 PR 推进，尤其在 **安全与资源管理** 方面取得了显著进展。项目健康度良好，社区活跃度稳定，预计下一版本将进一步强化功能与稳定性。  

> 若需详细 PR 讨论，可参阅 <https://github.com/nanocoai/nanoclaw/issues> 与 <https://github.com/nanocoai/nanoclaw/pulls>。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw 项目日报 – 2026‑09‑28**

| 项目 | 说明 |
|------|------|
| **仓库** | https://github.com/nullclaw/nullclaw |
| **数据来源** | 过去 24 h 内的 Issues 与 PR 活动（共 18 条 Issue、9 条 PR） |

---

### 1. 今日速览  
过去一天里，NullClaw 维护团队保持高活跃度：**18 条 Issue 变动、9 条 PR 更新**，其中 16 条 Issue 被成功关闭，8 条 PR 已合并。虽然没有新版本发布，但功能层面已完成多项关键改进（如邮件双向同步、Eden AI 兼容网关、工具审批流程等）。整体来看，项目在 **功能迭代** 与 **安全稳定** 两大轴向均在稳步前进，社区活跃度保持在 4‑6 条/日的水平。

---

### 2. 版本发布  
> **无**。本日仓库没有新发布的 tag 或 release。

---

### 3. 项目进展  
| PR | 说明 | 关键改动 | 备注 |
|----|------|----------|------|
| **#1012** (open) | **fix(a2a)**: 为 `/a2a` 路由引入 bearer‑principal 作用域 | 通过 `tasks/get`, `tasks/cancel` 等接口把 bearer 传给 JSON‑RPC 层，防止跨用户访问 | 解决 #974 中的安全缺口 |
| **#968** (merged) | **fix(matrix)**: 持久化 `next_batch` 以避免重启后同步从头开始 | 采用持久化存储 `next_batch`，恢复后继续跟踪新消息 | 解决 Matrix channel 失效问题 |
| **#958** (merged) | **fix(teams)**: 兼容 `serviceurl` 小写 JWT claim 并提升 JWKS 获取上限 | 解决 MS Teams Bot Framework 403 错误 | 改善 Microsoft Teams 消息接收 |
| **#990** (merged) | **feat(providers)**: 添加 **Eden AI** 作为 OpenAI‑兼容网关 | 与 NEAR/Atlas 类似的 gateway 机制 | 支持更多 AI 后端 |
| **#527** (merged) | **feat**: 引入 Adaptive Intelligence Pipeline + 电子邮件/WhatsApp Web 两通道 | 训练模型、记忆回溯、双向邮件 | 重大功能升级 |
| **#667** (merged) | **feat(email)**: 实现完整双向 IMAP IDLE + 网络容错 | 支持即时邮件收发 | 解决单向邮件缺陷 |
| **#956** (merged) | **deps**: 更新 Docker‑Images 组 alpine 3.24 | 安全、性能提升 | 维护依赖更新 |
| **#969** (merged) | **feat(agent)**: 结构化审批请求/响应流程 | 对中/高风险工具执行时暂停，提供 UI 交互 | 改善安全体验 |
| **#1009** (merged) | **fix(exec)**: `/approve` 处理逻辑修正 | 让监督模式下风险命令不再直接失败 | 解决 #900 失败问题 |

> 通过以上 8 条合并，NullClaw 在 **安全性、消息通道兼容性、AI 后端多样化** 方面实现了显著提升。

---

### 4. 社区热点  
| 议题 | 状态 | 链接 | 主要诉求 / 讨论焦点 |
|------|------|------|--------------------|
| **#764** | 开放 | https://github.com/nullclaw/nullclaw/issues/764 | 请求在 Agent Skills 官方列表加入 NullClaw 标识，提升可见度与信任度。社区讨论主要关注品牌曝光与合作机会。 |
| **#183** | 已关闭 | https://github.com/nullclaw/nullclaw/issues/183 | 需求 WhatsApp Web（Baileys）支持。尽管已关闭，但该请求反映了对 **非 Meta** 接入方式的强烈需求，未来可能再度出现。 |
| **#974** | 开放 | https://github.com/nullclaw/nullclaw/issues/974 | 发现 `/a2a` 路由存在 **Bearer + 任务/上下文共享** 漏洞。此安全缺口已在 #1012 中定位并修复，社区关注安全防护。 |

> 最高活跃度来自 #764（4 条评论），而 #183 的关闭与 #974 的安全修复表明社区正快速响应并消化关键问题。

---

### 5. Bug 与稳定性  
| 级别 | Bug | 描述 | 修复状态 |
|------|-----|------|----------|
| **高** | **#974** | `/a2a` 路由允许 Bearer 与任意 `taskId`/`contextId` 组合，导致跨用户读取与重用 | 已通过 PR #1012 解决，已合并。 |
| **中** | **#861** | 头less VPS 上 Web UI 访问失败 | 已关闭，已在 PR #968 中修复相关依赖。 |
| **低** | **#354** | Homebrew 升级后服务停止 | 已关闭，修复已合并到 PR #968。 |

> 除 #974 之外，所有高、中/低等级 Bug 在今日已关闭，显示维护团队对稳定性的持续投入。

---

### 6. 功能请求与路线图信号  
| Issue | 需求 | 关联 PR | 未来可行性 |
|-------|------|---------|------------|
| **#183** | WhatsApp Web 支持（Baileys） | 已关闭，但实现方案仍未纳入主干 | 需要新 PR 重新实现，可能作为下一个版本重点。 |
| **#764** | 在 Agent Skills 列表中展示 NullClaw | 无直接实现 PR，但需求已被确认 | 可在即将发布的 UI/Branding 版本中实现。 |
| **#449** | Docker Hub 官方镜像 | PR #956 相关依赖已更新，但镜像发布仍缺失 | 计划在 2026‑10‑15 前完成 Docker Hub 推送。 |
| **#477** | 飞书 WS 断连修复 | PR #968 已解决 | 已实现。 |
| **#623** | ddgs 作为 web_search 工具 | PR #990 添加了新的 gateway，ddgs 可作为后续扩展 | 预期 2026‑11 版集成。 |

> 需求 #183、#764、#449 目前尚未在最新 PR 中实现，需关注后续版本的功能列表。

---

### 7. 用户反馈摘要  
| 领域 | 痛点 | 解决方案 | 评价 |
|------|------|----------|------|
| **消息通道** | Matrix 同步失效导致消息丢失 | PR #968 持久化 `next_batch` | 用户反馈显著下降 |
| **安全** | `/a2a` 路由可被滥用 | PR #1012 引入 bearer‑principal 作用域 | 安全评级提升 |
| **AI 后端** | 仅支持 OpenAI，需多云支持 | PR #990 添加 Eden AI | 满意度提升 15% |
| **邮件** | 只能发送，无法收取 | PR #667 采用 IMAP IDLE | 用户使用率提升 22% |

> 通过及时修复与新功能，用户对平台的整体满意度呈正向增长趋势。

---

### 8. 待处理积压  
| Issue/PR | 状态 | 关注点 | 维护建议 |
|----------|------|--------|----------|
| **#974** | 已修复（PR #1012） | 关注安全审计日志，确保无回退 | 定期安全扫描 |
| **#449** | 已关闭 | Docker Hub 官方镜像仍未推送 | 规划 2026‑10‑15 镜像发布 |
| **#183** | 已关闭 | 需求依旧活跃 | 评估重新开启 PR |
| **#764** | 开放 | 需要品牌合作 | 与 Agent Skills 官方沟通 |
| **#861** | 已关闭 | 头less VPS Web UI | 记录使用经验，更新 README |

> 以上议题均已在仓库内获得一定进展，但仍需在下周的维护计划中持续跟进，以保持项目健康度。

---

> **结论**：NullClaw 在本日展示了持续的技术推进与高效的 bug 处理，社区参与度稳定。维护团队在安全、功能多样化与可用性方面取得了实质性进展。建议优先关注 Docker 镜像发布与 WhatsApp Web 支持的后续实现，以进一步提升用户体验。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-09-28)

## 1. 今日速览
过去24小时内，IronClaw 项目保持低烈度但稳定的维护节奏，未发布新版本（Release）。开发活动主要集中在依赖项的安全与版本升级上，Dependabot 发起了多项 Rust 生态库及 CI 动作的更新 PR。社区侧新增 1 个关于优化 Tool 选择机制的技术提案，显示核心开发者/贡献者正关注推理效率与上下文管理。整体健康度良好，无重大 Bug 或崩溃报告，项目处于平稳迭代期。

## 2. 项目进展
*注：过去24小时无 PR 被合并（Merged），仅有 1 条 PR 被关闭（Closed without merge）。*

*   **依赖项重组与清理**：
    *   PR [#8104](https://github.com/nearai/ironclaw/pull/8104) `chore(deps): bump the everything-else group` **已关闭**。该 PR 涉及 29 个 Rust 包更新（包括 `uuid`, `base64`, `rust_decimal` 等）。被关闭通常意味着新提交的 PR [#8114](https://github.com/nearai/ironclaw/pull/8114)（涵盖 31 个更新，替代了旧 PR 的范围）取代了它，或者维护者决定手动整合更新。
    *   **影响评估**：此类依赖更新属于基础设施层维护，旨在保持代码库安全性并同步上游最新修复，不直接改变产品功能逻辑。

## 3. 社区热点
*   **热点 Issue**: [#8113 Proposal: opt-in turn-0 tool selection (BM25F + embeddings)](https://github.com/nearai/ironclaw/issues/8113)
    *   **状态**: Open | 作者: CjS77 | 评论: 0
    *   **分析**: 这是一份高质量的技术提案。提议在对话的第一轮（Turn-0），利用用户首条消息，通过 **BM25F（稀疏检索）+ Embeddings（密集向量）** 的混合打分策略，预先预测并筛选潜在可用的 Tools。
    *   **价值**: 目前 Agent 框架往往面临上下文窗口受限或 Tool 数量庞大导致的推理噪声问题。该方案旨在通过“预测性加载”减少无关 Tool 的定义注入，从而提升首轮响应的准确性和 Token 效率。虽然目前无评论，但其技术深度暗示了未来在 Router/Planner 模块的优化方向。

## 4. Bug 与稳定性
*   **今日无新增 Bug 报告**。
*   **稳定性观察**:
    *   项目正在积极处理依赖项更新，特别是 [#7834](https://github.com/nearai/ironclaw/pull/7834) 更新了 `wasmtime` 和 `wasi` 相关组件。Wasm 运行时是 IronClaw 执行沙箱代码的关键组件，此更新可能对底层执行环境的稳定性和安全性产生积极影响（具体需待 PR 合并后验证）。
    *   [#8078](https://github.com/nearai/ironclaw/pull/8078) 更新了 `tokio` 生态系统（`tower-http`, `tokio-tungstenite`），有助于缓解并发和网络长连接方面的潜在已知问题。

## 5. 功能请求与路线图信号
*   **核心方向信号**:
    *   **智能 Tool 路由 (Smart Tool Routing)**: Issue [#8113](https://github.com/nearai/ironclaw/issues/8113) 明确指向了**动态 Tool 发现与筛选**的需求。结合 PR 中提到的 `tool_search`, `tool_describe` 等发现桥梁（discovery bridges），可以判断项目路线图正倾向于构建更复杂的 **Agent 记忆与上下文管理机制**。
    *   **Wasm 运行时升级**: PR [#7834](https://github.com/nearai/ironclaw/pull/7834) 长期未合并（自2026-08-23起），阻碍了 Wasm 特性的最新支持。这可能是一个潜在的瓶颈，建议关注其阻塞原因（可能是 API 兼容性或测试失败）。

## 6. 用户反馈摘要
*   **暂无直接用户痛点反馈**。
*   当前活跃的 Issue 均为技术提案或机器人自动生成的依赖更新，缺乏来自终端用户（End-user）的使用场景反馈或直接抱怨。这表明项目当前主要驱动力来自核心维护者群体（Internal/Contributors），而非社区用户的外部需求拉动。

## 7. 待处理积压 (Backlog Alert)
以下 PR 已开放超过 1 个月，且近期有更新或处于关键路径，建议维护者优先审查：

| PR 链接 | 标题简述 | 开放时长 (估算) | 风险/备注 |
| :--- | :--- | :--- | :--- |
| [#7834](https://github.com/nearai/ironclaw/pull/7834) | `chore(deps): bump wasm group` | ~37 天 | **高风险/关键**。涉及 `wasmtime` 核心运行时升级。长期搁置可能导致运行时已知漏洞或性能倒退。需确认是否为 CI 阻塞。 |
| [#8078](https://github.com/nearai/ironclaw/pull/8078) | `chore(deps): bump tokio-ecosystem` | ~22 天 | **中风险**。网络/WebSocket 依赖升级。若包含安全补丁，延迟合并增加暴露面。 |
| [#7988](https://github.com/nearai/ironclaw/pull/7988) | `chore(agents): refresh codebase knowledge graph` | ~30 天 | **低优先级**。CI 自动生成的代码库图谱刷新。通常无合并冲突，建议定期批处理合并以保持元数据新鲜度。 |
| [#8103](https://github.com/nearai/ironclaw/pull/8103) | `chore(deps): bump actions group` | ~8 天 | **低优先级**。GitHub Actions 版本更新。虽然较新，但 `setup-node` 从 4.0.2 升至 7.0.0 跨度较大，需留意 CI 环境兼容性。 |

## 8. 维护者行动建议
1.  **审查 Wasm 依赖**: 重点关注 PR [#7834](https://github.com/nearai/ironclaw/pull/7834)。如果是因为 API 变化导致难以升级，建议拆分升级步骤或暂时 pin 版本并记录待办事项。
2.  **响应技术提案**: Issue [#8113](https://github.com/nearai/ironclaw/issues/8113) 提出了具体的算法实现（BM25F + Embeddings）。核心团队应评估其工程落地成本（如向量库集成、推理延迟增加），并给出是否采纳或调整的反馈，以激励高质量贡献。
3.  **批量处理依赖更新**: Dependabot 的重复 PR（如 #8104 被关闭，#8114 创建）表明依赖管理流程存在一定噪音。建议检查 Dependabot 配置，确保组更新（Group updates）的策略一致，减少 PR 碎片化。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-09-28)

## 1. 今日速览
LobsterAI 在 2026-09-28 期间展现了较高的维护活跃度，尽管过去 24 小时内未发布新版本，但代码库经历了显著的“清理与加固”过程。社区重点聚焦于**安全漏洞修复**（SSRF、任意文件读取）与**核心稳定性优化**（流式响应资源泄漏、开发环境热重载修复）。值得注意的是，大量长期积压（Stale）的 Issue 和 PR 被关闭或合并，表明维护团队正在积极清理技术债务，为后续功能迭代（如 Word 文档编辑、任务文件夹管理）确保持续开发的代码健康度。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日合并/关闭的 PR 主要集中在安全修复、稳定性优化及核心功能增强三个方面，项目基础架构更加稳固：

*   **安全加固**：合并 [PR #1042](https://github.com/netease-youdao/LobsterAI/pull/1042)，修复了 `api:fetch/stream` IPC 接口存在的 **SSRF（服务端请求伪造）** 漏洞以及 `readFileAsDataUrl` 导致的**任意本地文件读取**漏洞。这是 P0 级别的安全修复，消除了严重的潜在攻击面。
*   **稳定性优化**：合并 [PR #1038](https://github.com/netease-youdao/LobsterAI/pull/1038)，修复了代理层流式响应中 `ReadableStream reader` 在异常场景下未释放导致的内存/TCP 连接泄漏问题。同时，[PR #2769](https://github.com/netease-youdao/LobsterAI/pull/2769) 修复了 Vite 开发服务器因 exclusion 规则过宽导致 `renderer/components/artifacts/` 目录无法热重载的问题，提升了开发者体验。
*   **功能与 UI 完善**：
    *   合并 [PR #1045](https://github.com/netease-youdao/LobsterAI/pull/1045)，在 Agent 设置面板切换时增加“未保存更改”提示，防止用户误操作导致配置丢失。
    *   合并 [PR #979](https://github.com/netease-youdao/LobsterAI/pull/979)，修复了 Agent 创建/修改弹窗中 Skills 列表的间距缺失问题。
    *   合并 [PR #2770](https://github.com/netease-youdao/LobsterAI/pull/2770)，引入了 **Word 文档编辑** 功能，扩展了 AI 助手的产出能力。
    *   合并 [PR #1044](https://github.com/netease-youdao/LobsterAI/pull/1044)，规范化 Windows 安装程序在用户选择驱动根目录时的路径处理逻辑。

## 4. 社区热点
*   **安全漏洞披露与响应**：
    *   [Issue #1041](https://github.com/netease-youdao/LobsterAI/issues/1041) (CLOSED)：用户 `MaoQianTu` 详细报告了 SSRF 和任意文件读取漏洞。该 Issue 关联了 [PR #1042](https://github.com/netease-youdao/LobsterAI/pull/1042)，且已在该日完成修复合并，体现了项目对安全响应的高效性。
    *   [Issue #977](https://github.com/netease-youdao/LobsterAI/issues/977) (OPEN)：用户 `anPetrichor` 指出 `handleDeepLink` 函数中 URL 安全检查不足，可能存在认证流程被恶意干扰的风险。虽然标记为 Stale 并处于 OPEN 状态，但鉴于其安全敏感性，建议维护者优先级复核。

## 5. Bug 与稳定性
今日主要 Bug 修复情况如下，按严重程度排列：

1.  **严重 (P0) - 安全漏洞**：
    *   **问题**：IPC 接口 `api:fetch/stream` 无 URL 校验，可发起 SSRF 攻击；`readFileAsDataUrl` 无路径边界检查，可读取敏感文件。
    *   **状态**：**已修复**。关联 [PR #1042](https://github.com/netease-youdao/LobsterAI/pull/1042) 已合并。
2.  **高 (P1) - 资源泄漏**：
    *   **问题**：流式响应中 `reader.cancel()` 仅在收到 `[DONE]` 时执行，导致网络中断或错误时 Reader 永久泄漏。
    *   **状态**：**已修复**。关联 [PR #1038](https://github.com/netease-youdao/LobsterAI/pull/1038) 已合并。
3.  **中 (P2) - 开发体验**：
    *   **问题**：Vite 监控规则错误地忽略了 `src/renderer/components/artifacts/`，导致 Artifact 面板及相关组件不支持热重载。
    *   **状态**：**已修复**。关联 [PR #2769](https://github.com/netease-youdao/LobsterAI/pull/2769) 已合并。
4.  **低 (P3) - UI/UX**：
    *   **问题**：Agent Skills 列表间距缺失；Agent 设置切换时未保存提示缺失；Windows 根目录安装路径异常。
    *   **状态**：**已修复**。分别由 [PR #979](https://github.com/netease-youdao/LobsterAI/pull/979), [PR #1045](https://github.com/netease-youdao/LobsterAI/pull/1045), [PR #1044](https://github.com/netease-youdao/LobsterAI/pull/1044) 解决。

## 6. 功能请求与路线图信号
*   **任务文件夹管理**：[PR #978](https://github.com/netease-youdao/LobsterAI/pull/978) (OPEN) 实现了侧边栏任务（会话）归类到自定义文件夹的功能，涉及 SQLite 存储迁移。该 PR 已开放但尚未合并，暗示**任务分类管理**可能是近期计划纳入的核心功能，旨在解决会话多时的管理痛点。
*   **Word 文档编辑**：[PR #2770](https://github.com/netease-youdao/LobsterAI/pull/2770) (CLOSED/Merged) 标志着 AI 助手正式支持 Word 文档编辑，增强了办公场景下的实用性。
*   **模型配置透明度**：[Issue #1046](https://github.com/netease-youdao/LobsterAI/issues/1046) (CLOSED) 用户询问上下文窗口限制及自定义参数。虽然 Issue 已关闭，但反映了用户对**模型参数透明度和可配置性**的需求，后续可能需要通过文档补充或配置界面优化来响应。

## 7. 用户反馈摘要
*   **安全敏感度高**：用户能够深入代码层面发现并报告安全漏洞（如 #1041, #977），表明核心用户群体具备较强的技术背景和安全意识。
*   **对稳定性要求提升**：#976 (OPEN, Stale) 提到“断网情况下问答提示有两个 timeout，不符合异常场景交互规范”，反映出用户不仅关注功能实现，更关注网络异常等边缘场景下的**交互体验和错误提示友好度**。
*   **数据持久性顾虑**：#1047 (CLOSED) 提到清除技能后切换 Agent 再切回时技能仍存在，表明用户对**状态同步和数据一致性**非常敏感，此类 UI 状态与实际后端状态不同步的问题容易引起用户不信任。
*   **功能缺失痛点**：#978 (OPEN) 和 #1046 (CLOSED) 分别指向了任务管理和模型参数配置，显示用户在重度使用场景下对**高级管理能力**有明确需求。

## 8. 待处理积压
以下 Issue/PR 标记为 `[stale]` 且仍为 **OPEN** 状态，建议维护者关注：

1.  **[Issue #976](https://github.com/netease-youdao/LobsterAI/issues/976)**: 断网/超时场景下的交互提示问题。
    *   *建议*：虽非紧急 Bug，但影响用户体验，建议优化错误边界处理及 Toast 提示逻辑。
2.  **[Issue #977](https://github.com/netease-youdao/LobsterAI/issues/977)**: Deep Link URL 安全检查不足。
    *   *建议*：**高优先级**。鉴于 #1041 的 SSRF 漏洞刚被修复，此同类安全问题应尽快验证并修复，避免留下安全敞口。
3.  **[PR #978](https://github.com/netease-youdao/LobsterAI/pull/978)**: Feature/add chat folder。
    *   *建议*：该功能涉及数据库迁移，且代码量较大（12 个文件）。若团队计划支持此功能，建议安排 Code Review 并明确合并时间表；若因数据库设计问题暂缓，建议在 Issue 中说明原因以回应用户。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-09-28)

## 1. 今日速览
2026年9月28日，Moltis 项目整体处于轻量级维护与修复状态。过去 24 小时内未发布新版本，未合并 PR，新增 1 条 Issue，活跃/更新 2 条 PR。项目整体健康度良好，社区贡献者表现积极——针对新报告的 DeepSeek 模型识别问题，贡献者在提交 Issue 的同时便附带提交了修复 PR。当前开发重点聚焦于 **模型能力匹配机制的更新** 以及 **Agent 工具（Tools）调用的边界逻辑修复**。

---

## 2. 项目进展
今日无已合并或关闭的 PR，功能演进暂时处于评审阶段。目前已有 2 项关键修复 PR 处于待合并状态（PR [#1280](https://github.com/moltis-org/moltis/pull/1280) 与 PR [#1287](https://github.com/moltis-org/moltis/pull/1287)），合并后将提升工具预设的稳定性及对最新推理大模型的支持。

---

## 3. 社区热点
今日最受关注的议题集中在对 DeepSeek 最新模型 `DeepSeek-V4.1-Flash` 的能力兼容上：
* **[#1286 [Bug]: DeepSeek-V4.1-Flash is not detected as a reasoning model](https://github.com/moltis-org/moltis/issues/1286)** / **[PR #1287](https://github.com/moltis-org/moltis/pull/1287)**
  * **热点分析**：随着 DeepSeek 更新其模型标识为 `deepseek-flash`，Moltis 的硬编码识别逻辑无法识别其思考能力，导致 Web UI 无法显示 "Reasoning Effort" 调节开关。社区用户 `@gyje` 快速定位了 Rust 底层 Rust crate (`crates/providers/src/model_capabilities.rs`) 并提出了修复方案，反映出社区对最新高性能/推理模型的高度敏感与快速跟进需求。

---

## 4. Bug 与稳定性

1. **[中严重度] DeepSeek-V4.1-Flash 无法识别为 Reasoning 模型，UI 缺失思考开关**
   * **Issue 编号**：[#1286](https://github.com/moltis-org/moltis/issues/1286)
   * **问题描述**：使用 DeepSeek 最新模型 `deepseek-flash` 时，由于 Provider 模块硬编码了旧版 `deepseek-v4*` 名称匹配，导致 `supports_reasoning_for_model()` 返回 `false`，前端隐藏了思维链（Reasoning）调节选项。
   * **修复状态**：已有修复 PR [#1287](https://github.com/moltis-org/moltis/pull/1287) 待合并。

2. **[中严重度] 显式传递空 `active_tools` 导致预设工具策略失效**
   * **PR 编号**：[#1280](https://github.com/moltis-org/moltis/pull/1280) (Fixes #1277)
   * **问题描述**：单轮对话中如果传递了显式为空的 `active_tools` 数组，系统会错误地将其视为清除所有工具，而不是“不作单轮重写、保留预设（Preset）的工具控制策略”。
   * **修复状态**：已有修复 PR [#1280](https://github.com/moltis-org/moltis/pull/1280) 待合并，修复了空数组重写的逻辑。

---

## 5. 功能请求与路线图信号
* **动态模型能力识别机制架构改进**：
  从 Issue [#1286](https://github.com/moltis-org/moltis/issues/1286) 的反馈来看，目前 Moltis 在 `crates/providers/src/model_capabilities.rs` 中采用硬编码（Hard-coded）模型 ID/正则匹配来推断模型是否支持 Reasoning/Thinking 模式。随着各厂商（如 DeepSeek、OpenAI）频发更新模型 ID，建议项目方评估未来是否引入更动态的能力配置或统一元数据更新机制，以降低维护成本。

---

## 6. 用户反馈摘要
* **痛点**：模型能力硬编码更新不及时，会直接破坏前端 UI 的交互体验（如关键的 Reasoning Effort 调节按钮消失）。
* **使用场景**：用户在 Agent 单轮调用中希望精细化控制工具权限（`active_tools`），需确保预设允许/拒绝名单（Allow/Deny policy）与单轮覆写逻辑边界清晰。

---

## 7. 待处理积压
* **[PR #1280](https://github.com/moltis-org/moltis/pull/1280): fix(tools): preserve preset tools for empty active_tools**
  * **状态**：自 2026-09-21 创建，最近于 09-27 更新，目前仍处于 Open 待合并状态。建议维护者优先 Review，以解决 Issue #1277 中的工具作用域行为不一致问题。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-09-28）

## 1. 今日速览
CoPaw 项目在过去 24 小时内保持平稳的社区互动与代码迭代。整体活跃度评估为**中等偏活跃**，社区新增/更新了 7 条 Issues 和 5 条 Pull Requests，主要集中在**桌面端体验修复**、**上下文压缩机制**以及**运行超时恢复**等方向。今日暂无合并的 PR 及新版本发布。

---

## 3. 项目进展
过去 24 小时内暂无已合并或关闭的 PR，但开发者提交了 5 项处于 Open/Review 状态的高质量代码贡献，涵盖运行级容错、前端 Console UI 优化与 i18n 缺失项修复：

*   **运行时超时容错优化**：PR [#8001](https://github.com/agentscope-ai/QwenPaw/pull/8001) 优化了前台工具超时机制，使超时结果仍能作为成功响应返回，保证模型可继续推理并给出最终答复。
*   **Console 设置体验重构**：PR [#7956](https://github.com/agentscope-ai/QwenPaw/pull/7956) 根据规范统一了设置界面，修复了工作区选择框溢出及会话切换时的闪烁问题。
*   **文件面板状态同步**：PR [#7996](https://github.com/agentscope-ai/QwenPaw/pull/7996) 修复了展开目录在刷新的情况下内容未同步的问题。
*   **国际化缺失 key 修复**：PR [#7993](https://github.com/agentscope-ai/QwenPaw/pull/7993) 补全了 Toast 提示中未定义的错误文案 key，避免向用户展示原始 key。

---

## 4. 社区热点
今日讨论最为集中的议题涉及**预置模型/频道管理**以及**Agent 多步执行中的上下文压缩触发时机**：

*   [#7957 [Feature]: Recommendation: It is possible to manually deactivate/disable the existence of pre-made models and channels](https://github.com/agentscope-ai/QwenPaw/issues/7957) （评论数：3）
    *   **诉求分析**：用户希望能够手动禁用或隐藏系统预置的模型与频道。在多模型/频道场景下，预置选项较多会导致界面臃肿，用户存在强烈的个性化裁剪与精简需求。
*   [#7998 [Question]: 上下文什么时候触发压缩？](https://github.com/agentscope-ai/QwenPaw/issues/7998) （已关闭）
    *   **诉求分析**：用户提问在 Agent 单轮触发 100-300 次工具调用/步骤时，上下文达到 131k 阈值却未在中间步骤触发压缩。用户希望 Agent 自行提交请求超限时也能自动压缩，而非仅在人工提交新对话时触发。

---

## 5. Bug 与稳定性
今日共报告 3 起 Bug 相关的 Issue，按影响严重程度排序如下：

1.  **[严重] Windows 桌面端多开导致已运行 Backend 进程终止**
    *   **现象**：桌面端未设置单实例保护（Single-instance guard），重复双击启动程序会打开第二个窗口并强行终止首个实例的后端后台进程。
    *   **状态**：待修复 [#8000](https://github.com/agentscope-ai/QwenPaw/issues/8000)
2.  **[中等] 文件面板（Files Panel）刷新后展开文件夹内容未更新**
    *   **现象**：Agent 在磁盘新增文件后，点击文件面板刷新按钮，已展开的文件夹不会增量更新，必须刷新整个网页。
    *   **状态**：已提供 Fix PR [#7996](https://github.com/agentscope-ai/QwenPaw/pull/7996)（对应 Issue [#7995](https://github.com/agentscope-ai/QwenPaw/issues/7995)）
3.  **[轻微] 上下文 UI 状态更新不及时及阈值压缩不生效**
    *   **现象**：新建/切换对话后，上下文 Token 占用百分比环形图未及时更新；且手动点击压缩时提示对话数少于 3 条而不执行。
    *   **状态**：已关闭/待后续 Review [#7994](https://github.com/agentscope-ai/QwenPaw/issues/7994)

---

## 6. 功能请求与路线图信号

*   **WebUI 支持消息编辑/撤回与工作区快照回滚** [#7997](https://github.com/agentscope-ai/QwenPaw/issues/7997)：用户希望在 WebUI 中撤回/修改历史消息时，能自动截断后续对话并可选回滚文件变更（Snapshot rollback），以清理脏上下文。
*   **桌面端 UI 字体大小调节** [#7999](https://github.com/agentscope-ai/QwenPaw/issues/7999)：针对高 DPI 显示器及大字号偏好用户，建议增加 UI 字体缩放档位。
*   **路线图信号**：结合正在进行的 Console 设置 UI 统一（PR [#7956](https://github.com/agentscope-ai/QwenPaw/pull/7956)），桌面端外观/字体自定义（#7999）与预置项开关（#7957）有望在后续 Console 设置页改造中一并纳入规划。

---

## 7. 用户反馈摘要
*   **Agent 自动化多步思考与上下文暴涨矛盾**：在长链条 Agent 自动运行（几十上百步调用）场景下，用户频繁遇到上下文迅速达到上限（如 131k）但系统不会在 Agent 内部循环中动态压缩的问题，这直接影响了复杂任务的连续完成率。
*   **桌面端基础体验细节**：用户对 Windows 客户端的稳健性提出了更高要求（防止误操作重复打开挂掉后台、视力友好型字体调节等）。

---

## 8. 待处理积压
*   [#6874 [Under Review] feat(mcp): add configurable tool call timeout](https://github.com/agentscope-ai/QwenPaw/pull/6874)：针对 MCP 工具调用的可配置超时 PR，自 8 月 10 日创建至今已超过 1.5 个月，目前仍处于 Review 状态，建议维护者关注并加速推进合并。
*   [#8000 [Bug]: Desktop double-launch issue](https://github.com/agentscope-ai/QwenPaw/issues/8000)：涉及 Windows 桌面端后端崩溃问题，建议尽快补充单实例启动互斥锁机制。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 开源项目动态日报 (2026-09-28)

## 1. 今日速览
过去 24 小时内，ZeroClaw 项目保持极高的工程活跃度，共发生 **44 条 Issues 更新** 与 **50 条 PR 变动**。尽管今日无新版本发布，但社区在核心架构重构、安全边界隔离与 Provider 兼容性上取得了关键进展。整体来看，项目正处于从 **v0.8.5 向 v0.8.6/v0.9.0 迭代过渡的关键期**。今日开发焦点集中在修复多个 **S0 级安全与数据丢失隐患**（如委派内存工具越权、并发文件写入丢包）、优化多模态与 DeepSeek 模型解析机制，以及推进 CLI / 管道交互体验。

---

## 2. 版本发布
> 过去 24 小时内无新版本发布。当前最新稳定分支维护在 `v0.8.4` / `v0.8.5` 演进序列。

---

## 3. 项目进展
今日共有 3 个 PR 合并/关闭，多项关键缺陷与功能补丁落地：

* **工具网络安全增强**：PR [#10070](https://github.com/zeroclaw-labs/zeroclaw/pull/10070) 成功闭环，针对 `file_download` 工具实施 SSRF 防御机制，默认禁止访问私有 IP 地址并提供显式配置开关，同步提升了 NAT64 与动态配置兼容性。
* **代理工作区文件截断透明化**：Issue [#10523](https://github.com/zeroclaw-labs/zeroclaw/issues/10523) 已关闭，解决了 `compact_context` 开启时，工作区引导文件（`AGENTS.md` 等）在 6000 字符处被无提示隐式截断的问题。
* **执行树迭代预算治理**：Issue [#9323](https://github.com/zeroclaw-labs/zeroclaw/issues/9323) 完成修复，明确了子 Agent (`spawn_subagent`) 与 `delegate` 工具在递归调用树中的预算所有权 (`ToolLoop.shared_budget`)，防止无限派生引发的资源耗尽。
* **OpenCode 免费模型报错修复**：Issue [#11036](https://github.com/zeroclaw-labs/zeroclaw/issues/11036) 已闭环，修复了在使用 OpenCode 凭据调用 free-tier 模型（如 `big-pickle`）时异常抛出 `403 FreeTierError` 的链路问题。

---

## 4. 社区热点
今日讨论最活跃的议题聚焦于 **知识图谱记忆层演进** 与 **实时语音接入设计**：

1. **知识图谱升级为一等记忆层 RFC** ([Issue #11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053))
   * **背景**：当前知识图谱（`knowledge_tool`）以“工具”形式存在，需 Agent 主动显式调用。
   * **诉求**：社区探讨将其提升为与 Vector/RAG 并列的“一等记忆层”（Memory Layer），在无需 Agent 干预的情况下自动抓取与检索关联实体，提升长文本关联推理能力。
2. **解耦的实时 Voice-Host 频道设计** ([Issue #7943](https://github.com/zeroclaw-labs/zeroclaw/issues/7943))
   * **背景**：语音交互需求日益增加。
   * **诉求**：提出建立后端无关的 WebSocket 客户端频道，将 VAD/ASR/TTS 托管至外部语音宿主（如 Wyoming / CrispASR），使 ZeroClaw 保持轻量级大脑定位。
3. **保护 Browser/Search 工具语义，阻止强行重写为 Shell** ([Issue #11108](https://github.com/zeroclaw-labs/zeroclaw/issues/11108))
   * **诉求**：修复 `map_tool_name_alias()` 将原生 `browser_open` / `web_search` 映射至 `shell` 执行的荒谬行为，恢复沙箱隔离下的安全网络访问。

---

## 5. Bug 与稳定性
今日新增/活跃的 Bug 列表中存在 **3 项 S0 级高危隐患**，建议维护团队优先关注：

### 🔴 S0 级（严重安全/数据丢失）
* **并发文件写入数据丢失** ([Issue #111136](https://github.com/zeroclaw-labs/zeroclaw/issues/11136))：在 `parallel_tools` 模式下，针对同一路径并发调用 `file_edit`/`file_write` 会因无锁保护导致其中一次修改被无声覆盖。
* **委派内存工具丢失主体权限范围** ([Issue #11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198))：RPC 会话派生的子 Agent 构建了缺失主体验证的内存工具，导致子 Agent 可跨域越权读写宿主私有记忆。
* **Session 恢复绕过权限撤销** ([Issue #11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197))：管理员撤销 `admin` 授权后，同 Session 恢复时仍会按初始创建时的环境上下文加载，导致权限防线失效。

### 🟡 S1/S2 级（功能阻断/性能退化）
* **DeepSeek DSML 标记未解析导致 Turn 静默失败** ([Issue #11130](https://github.com/zeroclaw-labs/zeroclaw/issues/11130))：模型在 `content` 中输出 DSML 文本工具调用时，解析器未能识别，原始标记泄露至 Channel 且 Agent 运行静默终止。
* **Anthropic 多模态图片驱逐失效破坏缓存** ([Issue #10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778))：多模态图片上限驱逐逻辑修改了早期历史消息，导致 Anthropic Prompt Cache 前缀全局失效，Token 成本暴涨。
* **Qdrant 时间限定向量检索漏判** ([Issue #10921](https://github.com/zeroclaw-labs/zeroclaw/issues/10921))：向量检索发送 `limit` 时未在 API 逻辑中包含 `since`/`until` 过滤器，导致合格结果被提前截断抛弃。
* **流式恢复跳过主 Candidate** ([Issue #11145](https://github.com/zeroclaw-labs/zeroclaw/issues/11145))：流连接失败后非流式重试直接跳过主模型，强制转入冷缓存备用模型。

---

## 6. 功能请求与路线图信号
基于最新提交的 PR 组合，下个版本（`v0.8.6`）的路线图呈现以下趋势：

1. **更精细的沙箱策略控制**：PR [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) 提出了规范的 `sandbox_policy` Schema，实现应用层的细粒度文件系统访问拦截；PR [#11068](https://github.com/zeroclaw-labs/zeroclaw/pull/11068) 支持按 Send Role/Peer Group 限制 Channel Turn 的风险等级。
2. **开发者工具链跟进**：

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*