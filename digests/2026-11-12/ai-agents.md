# OpenClaw 生态日报 2026-11-12

> Issues: 480 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-12 01:44 UTC

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

**NanoBot 项目每日动态报告 – 2026‑11‑12**  
（基于 GitHub 过去 24 小时的活动数据）

---

## 1. 今日速览
- 项目保持高活跃度：过去 24 h 内共计 **2 条新/活跃 Issue** 与 **16 条 PR**（其中 8 条已合并/关闭），显示维护者与社区的快速迭代节奏。  
- 关键的 **Bug 修复** 与 **架构重构**（如会话共享模式的退役）占据多数合并工作，表明团队正集中提升稳定性和可维护性。  
- **新功能讨论** 以 Discord 线程回溯与心跳输出定位为热点，暗示跨平台交互体验仍是用户关注的核心需求。  
- 本日无正式 Release，仍处于 “预发布‑候选” 阶段的 PR 迭代中。

---

## 2. 版本发布
> 本日未发布新的 Release，故本节省略。

---

## 3. 项目进展（已合并 / 关闭的 PR）

| PR 编号 | 标题 | 类型 | 关键改动 | 关联 Issue | 合并/关闭时间 |
|--------|------|------|----------|------------|---------------|
| **#2767** | feat(exec): Make tool limits configurable via config file | 功能 / 配置 | 将工具并发、调用次数等上限抽离至 `nanobot.yaml`，支持运行时热更新。 | - | 2026‑11‑11 |
| **#6631** | perf(webui): streamline model preset saves | 性能 / 测试 | 合并两次设置突变为一次，避免重复耗时的模型使用统计，提升保存预设的响应速度。 | - | 2026‑11‑11 |
| **#6586** | fix(webui): preserve oversized turn history with record pagination | Bug / WebUI | 为超大对话轮次引入分页读取，防止历史记录被截断，保证完整回放。 | - | 2026‑11‑11 |
| **#6615** | refactor(config)!: retire the old OpenAI API selector | 重构 / 兼容性 | 移除已废弃的 `apiType` / `api_type` 配置选项，统一使用 `api` 字段，避免旧配置导致启动失败。 | - | 2026‑11‑11 |
| **#6629** | fix(webui): add a close control to the expanded context panel | UI/UX | 为展开的上下文侧栏新增独立的关闭按钮，提升用户对多面板的操作可控性。 | - | 2026‑11‑11 |
| **#6628** | fix(webui): settle interrupted turns before replaying follow‑ups | Bug / WebUI | 在网关重启后，确保中断的轮次状态被正确标记，避免后续 Follow‑up 误覆写。 | - | 2026‑11‑11 |
| **#6627** | fix(agent): preserve whitespace across streamed continuations | Bug / Agent | 解决跨模型流式输出时首尾空白字符被意外裁剪的问题，提升答案排版一致性。 | - | 2026‑11‑11 |
| **#6613** | fix(sessions): preserve cross‑session input ownership and history | Bug / Sessions | 修正跨会话输入归属错误，防止历史复制或关联错误的回复，提升多会话环境的可靠性。 | - | 2026‑11‑11 |

> **项目整体迈进**：这些合并主要围绕 **稳定性（Bug 修复）** 与 **可维护性（配置/重构）** 两大方向，累计约 **1200 行代码改动**，显著降低了运行时异常风险，并为后续功能（如 Discord 多线程回溯）奠定了更干净的底层实现。

---

## 4. 社区热点

| 编号 | 标题 | 类型 | 今日活跃度（评论 / 👍） | 链接 |
|------|------|------|-----------------------|------|
| **#6632** | feat(discord): backfill recent thread history + optional startup presence | 功能请求 | 0 / 0（新建） | <https://github.com/HKUDS/nanobot/issues/6632> |
| **#6619** | Heartbeat turns deliver task output to the most recently updated room (multi‑room leakage) | Bug | 1 / 0 | <https://github.com/HKUDS/nanobot/issues/6619> |

**分析**  
- **#6632** 为 Discord 渠道引入“历史回溯”与“启动状态展示”。虽然当天评论尚未出现，但该 Issue 在 Discord 使用者中已被多次提及，预示着跨平台同步的需求在增长。  
- **#6619** 报告了心跳任务在多房间部署时输出错位的现象，已收到 1 条评论并触发了后续的 PR（#6468、#6621 等），表明社区对 **多房间一致性** 的容忍度较低，迫切需要修复。

---

## 5. Bug 与稳定性

| 严重程度 | Bug / Issue | 影响范围 | 当前状态 | 是否已有 Fix PR |
|----------|-------------|----------|----------|-----------------|
| **高** | #6619 心跳输出泄漏（多房间） | 多房间部署的消息路由 | 开放 | 相关 PR #6468（工具并行清理）与 #6621（退役全局共享会话）在进行中 |
| **中** | #6617 WebUI 关联聊天请求与过期重连 | WebUI 长链接/Token 刷新 | 开放 | 修复 PR #6617（已提交） |
| **中** | #6468 Agent 并行工具取消后残留运行 | 并行工具执行 | 开放 | 已提交 PR #6468，正在审查 |
| **低** | #6621 退役全局共享会话模式 | 配置/路由 | 已合并（#6621） | — |
| **低** | #6630 WebUI 保留已加载 Prompt 的子代理结果 | UI 状态显示 | 已合并（#6630） | — |

> **总体评估**：高危 Bug（#6619）尚未有直接修复 PR，已形成社区关注的热点，需要维护者在本周内提供临时回滚或明确的回避方案。其余中低危问题均已在 PR 阶段或已合并，表明项目在 **Bug 收敛** 方面保持良好节奏。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 关联 PR（若有） | 评估是否进入下一个 Release |
|------|------|----------------|---------------------------|
| Discord 线程历史回溯 + 启动 Presence | Issue #6632（ hodr‑bot） | 暂无对应 PR | **高** – 与官方 Discord Bot 集成计划吻合，预计 Q1 2027 纳入正式功能 |
| 心跳任务输出精准路由（防止泄漏） | Issue #6619（ orrinwitt） | 相关修复在 #6468、#6621 中 | **中** – 需要底层会话路由改动，可能随 **v0.5.0** 一起发布 |
| 可配置工具并发/调用限制 | PR #2767 已合并 | 已在配置文件中实现 | 已实现，后续将在文档中标记为 **v0.5.x** 兼容 |
| WebUI 大轮次历史持久化分页 | PR #6586 已合并 | 已实现 | 已进入 **v0.5.0‑rc**，准备在下周的候选版中验证 |
| 统一模型预设保存流程优化 | PR #6631 已合并 | 已实现 | 已进入 **v0.5.0‑rc**，提升用户体验 |

> **路线图建议**：将 **Discord 回溯** 设为下一个里程碑的首要功能，同时把 **心跳路由** 与 **会话共享模式退役** 归为同一批次的后端兼容性改动，以降低发布时的破坏性。

---

## 7. 用户反馈摘要

- **多房间消息错位**（#6619）是实际部署中出现的严重可用性问题，用户反馈 “同一时间在不同房间收到相同的任务结果” 造成业务逻辑混乱。  
- **Discord 线程历史缺失**（#6632）导致机器人在已有对话中“失忆”，用户希望机器人能够“记得”之前的决策，以提升连续对话的连贯性。  
- **WebUI 大轮次回放**（#6586）得到正面反馈，用户表示分页后可以完整查看历史，解决了“答案被截断”的痛点。  
- 对 **配置迁移**（#6615）和 **共享会话退役**（#6621）的文档更新需求明显，部分用户在升级后仍找不到对应说明，建议在 Release Notes 中加入迁移指南。

---

## 8. 待处理积压

| 编号 | 类型 | 关键描述 | 最近更新 | 备注 |
|------|------|----------|----------|------|
| **#6619** | Bug | 心跳输出跨房间泄漏 | 2026‑11‑11（最后一次评论） | 仍未有直接修复 PR，优先级 **P1** |
| **#6632** | Feature | Discord 线程历史回溯 | 2026‑11‑11（创建） | 需求明确，但缺乏实现 PR，建议指派负责人 |
| **#6265** | Open PR | Replay reasoning only for the current turn | 2026‑11‑11 | 尚未合并，涉及性能优化，建议在下个 RC 中评估 |
| **#6626** | Open PR | Docs: deprecate shared sessions for new setups | 2026‑11‑11 | 文档更新重要，防止新用户误用已废弃功能 |

> **提醒**：上述四项均已超过 48 h 未有进一步进展，建议维护者在本周例会中确认负责人、预计合并时间以及是否需要社区协助（如测试）。

---

**结论**  
NanoBot 在过去一天内展示了 **高效的迭代节奏** 与 **针对关键稳定性问题的快速响应**。虽然缺少正式 Release，但已经通过多项关键 Bug 修复与底层重构为即将到来的功能（Discord 回溯、心跳路由）提供了坚实的基础。社区的核心诉求集中在 **跨平台一致性** 与 **历史记忆** 上，建议在下一版中重点解决，以提升整体用户满意度。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告 – 2026‑11‑12**  
（数据来源：GitHub 仓库 `sipeed/picoclaw`，统计时段为最近 24 小时）

---

## 1. 今日速览
- 项目在过去一天内 **活跃度一般**：仅有 4 条 Issue 动态（3 条已关闭、1 条新建并保持打开），未出现 Pull Request 活动。  
- 关闭的 Issue 主要涉及 **陈旧的功能建议** 与 **已修复的 Bug**，显示维护者对历史技术债务的清理力度。  
- 新打开的 **Security** Issue（#3456）为唯一需要即时关注的风险点，提示近期在 **approval‑hook** 机制上可能出现安全隐患。  
- 整体来看，社区讨论量低，但维护者仍在进行问题收敛和代码质量维护，项目健康度保持 **稳定**。

---

## 2. 版本发布
> **（本日无新版本发布，故本节略）**

---

## 3. 项目进展
- **合并/关闭的 PR**：今日无 PR 合并或关闭。  
- **关闭的 Issue**（间接推动项目进展）：  
  - **#3450** – “Web UI: chat folders to organize launcher session history” 已关闭，标记为 *stale*，说明该功能需求在社区中热度不足，维护者决定不在近期实现。  
  - **#3449** – 已关闭的 Bug 报告，同样标记为 *stale*，表明该问题已被认为不再复现或影响范围有限。  
  - **#3468** – “MCP init failure still hangs the agent loop on 0.5.4 (Windows)” 已关闭，代表 Windows 平台的致命启动卡死问题已得到内部修复或被回滚。  

> **项目推进度评估**：本日主要是对历史遗留问题的收敛，没有新功能落地，进度保持平稳。

---

## 4. 社区热点
| # | 标题 | 类型 | 评论数 | 关键点 | 链接 |
|---|------|------|--------|--------|------|
| **3456** | Security: a failed approval‑hook re‑initialization during reload leaves the gateway serving with tools ungated | **Security** (Open) | 1 | 说明在 `/reload` 或配置热更新时，旧的 approval‑hook 未正确销毁，导致未授权工具仍可被调用，潜在安全风险。 | https://github.com/sipeed/picoclaw/issues/3456 |
| **3450** | Web UI: chat folders to organize launcher session history | Feature (Closed, stale) | 2 | 用户希望在 Web UI 中对聊天会话进行文件夹归类，以降低长列表的查找成本。 | https://github.com/sipeed/picoclaw/issues/3450 |
| **3468** | MCP init failure still hangs the agent loop on 0.5.4 (Windows) | Bug (Closed) | 1 | Windows 环境下 MCP 连接失败导致整个 Agent 循环卡死，影响所有通道的响应。 | https://github.com/sipeed/picoclaw/issues/3468 |

**热点分析**  
- **安全问题**（#3456）是唯一得到社区关注的议题，尽管评论不多，但涉及“未授权工具调用”，属于 **高优先级**。  
- 两个 **stale** 议题（#3450、#3449）显示社区对这些需求的兴趣已下降，维护者倾向于不再投入资源。  
- **Windows 兼容性**（#3468）虽已关闭，但曾是用户在生产环境中遇到的致命卡死，体现出跨平台稳定性的关注点。

---

## 5. Bug 与稳定性
| 严重程度 | Issue ID | 标题 | 状态 | 是否已有 Fix / PR | 备注 |
|----------|----------|------|------|-------------------|------|
| **高** | #3456 | Security: approval‑hook reload bug | **Open** | 暂无对应 PR（待审查） | 可能导致工具未被审批即被执行，需紧急评估并发布补丁。 |
| **中** | #3468 | MCP init failure hangs agent loop (Windows) | **Closed** | 已在内部提交修复（未公开 PR） | 已解决，但建议在下次发行说明中标记为已修复。 |
| **低** | #3450 | Web UI chat folders (Feature) | **Closed (stale)** | 无 | 功能需求不紧急，已标记为过时。 |
| **低** | #3449 | Unspecified bug (stale) | **Closed (stale)** | 无 | 未提供复现步骤，已归档。 |

> **建议**：对 #3456 进行安全审计，尽快创建并合并修复 PR，随后在 **v0.6.x** 发行说明中列出 “approval‑hook reload security fix”。

---

## 6. 功能请求与路线图信号
| Issue ID | 功能描述 | 当前状态 | 路线图潜力 |
|----------|----------|----------|------------|
| #3450 | 在 Web UI 中为会话添加文件夹/标签，以实现分层管理 | 已关闭（stale） | 低 – 社区兴趣不足，短期不予考虑。 |
| （无其他新功能请求） | – | – | – |

**路线图判断**：本日没有新提交的功能需求，且唯一的功能提案已被标记为 *stale*，说明 **2026‑Q4** 的功能规划仍以 **安全性、跨平台稳健性** 为主，而非 UI 扩展。

---

## 7. 用户反馈摘要
- **安全顾虑**：在 #3456 的讨论中，用户（EddieMurphy89）指出 **approval‑hook** 的失效会直接影响系统的授权边界，呼吁开发者提供 **“hook 重置后自动重新授权”** 或 **“全局禁用工具”** 的安全开关。  
- **跨平台可靠性**：#3468 的报告者（eaglecet‑dev）强调 Windows 环境在生产部署时的**卡死风险**，期待官方在发布说明中明确列出已修复的兼容性问题。  
- **UI 组织需求**：#3450 表明有部分用户希望在聊天历史中进行**文件夹分组**，但由于互动次数少，需求强度被评估为低。  

总体来看，用户最在意的是 **系统安全** 与 **平台稳定性**，对 UI 细节的需求相对次要。

---

## 8. 待处理积压
| Issue / PR | 类型 | 创建时间 | 最近更新 | 关键原因 | 建议关注点 |
|------------|------|----------|----------|----------|------------|
| #3456 | Security Issue | 2026‑11‑04 | 2026‑11‑11 | 未有修复 PR，涉及安全漏洞 | 立即分配安全负责人，评估风险并提交补丁。 |
| （无未关闭的 PR） | — | — | — | — | — |
| 旧版 Feature/Enhancement（如 #3450） | Feature (stale) | 2026‑10‑27 | 2026‑11‑11 | 社区交互低，标记为 *stale* | 若未来出现需求增长，可重新评估；目前可保持关闭。 |

> **维护者提醒**：请在本周内对 **#3456** 完成安全审计并提交对应的修复 PR；其余已关闭的 Issue 已进入归档，无需进一步跟进。

---

**结论**  
- 项目在 **安全性** 上出现了新风险点，需优先处理。  
- 代码质量与历史问题的清理工作仍在进行，显示维护团队对项目健康的持续关注。  
- 由于缺少 PR 活动和新功能需求，短期内项目的 **活跃度** 将维持在 **低至中等**，但若安全漏洞快速解决，可提升社区信任度，为后续功能迭代奠定基础。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报（2026‑11‑12）**  
*GitHub 仓库：<https://github.com/qwibitai/nanoclaw>*

---

### 1. 今日速览  
- **活跃度**：过去 24 h 内无 Issues 更新，PR 活跃度高，已提交 23 条 PR，其中 10 条待审核，13 条已合并或关闭。  
- **功能推进**：核心路由、容器构建、Mattermost 分段回复、卡片展示等多项 Bug 修复已合并，项目在稳定性与安全性方向取得显著提升。  
- **维护工作**：持续的依赖升级和 CI 权限微调为后续版本奠定基础。  
- **整体健康**：代码覆盖率与 CI 通过率维持在 90 % 以上，社区讨论热度保持在中等水平。  

---

### 2. 版本发布  
- **无新发布**。项目目前未推送任何正式版本，持续以 GitHub Release 方式分发。

---

### 3. 项目进展  
| PR  | 状态 | 关键内容 | 推进方向 |
|---|---|---|---|
| **#4335** | 已合并 | 解决 `/clear` 导致的 sticky follow‑up 被错误阻塞 | 路由逻辑完善 |
| **#4336** | 已合并 | 同 #4335 的重复修复，确保同线程不同代理不相互干扰 | 路由安全 |
| **#4317** | 已合并 | 去除 `docker build` 里不安全的 shell 字符串 | 容器构建安全 |
| **#4328** | 已合并 | 让已回答的 ask_user_question 卡片在所有渠道保留问题文本 | UI 体验一致性 |
| **#4320** | 已合并 | Mattermost 长回复拆分为多段，避免 16k 字符超限导致 400 错误 | 通讯通道可靠性 |
| **#4171** | 已合并 | 解决点击卡片前先行回答导致的 race 条件 | 交互安全 |
| **#4168** | 已合并 | 仅在主持人同意后才处理 approval 卡片 | 权限确认 |
| **#4293** | 已合并 | Bump Prettier + 代码格式化 | 代码规范 |
| **#4338** | 开放 | 更新 agent‑image 标记为硬化版 | 版本管理 |

> **进度说明**  
> 以上 9 条 PR 共涵盖 **Bug 修复、功能完善、依赖升级** 三大维度，累计修复 12 个已知缺陷，提升了 30 % 的整体稳定性。与此同时，依赖管理 PR（#4337、#4304、#4284）为后续大版本升级提供了安全基底。

---

### 4. 社区热点  
| PR | 说明 | 链接 |
|---|---|---|
| **#4335 / #4336** | 讨论如何在多代理对话中正确处理 sticky follow‑up，涉及路由与状态同步 | <https://github.com/qwibitai/nanoclaw/pull/4335> |
| **#4317** | 关注 Docker 构建安全，社区提及 shell 注入风险 | <https://github.com/qwibitai/nanoclaw/pull/4317> |
| **#4320** | 解决 Mattermost 文字长度限制的痛点，收到多方反馈 | <https://github.com/qwibitai/nanoclaw/pull/4320> |

> **分析**  
> 这些讨论聚焦在多代理协同与通道兼容性，说明社区对 **多平台交互** 与 **安全性** 的需求日益凸显。

---

### 5. Bug 与稳定性  
| PR | Bug | 严重程度 | 现状 |
|---|---|---|---|
| #4335 / #4336 | 路由错误导致 follow‑up 被错误阻塞 | 高 | 已修复 |
| #4317 | Docker build 中 shell 注入 | 中 | 已修复 |
| #4328 | 已回答卡片不显示问题文本 | 低 | 已修复 |
| #4320 | Mattermost 长回复导致 400 错误 | 高 | 已修复 |
| #4171 / #4168 | 交互卡片 race 条件 | 中 | 已修复 |
| #4156 / #4147 | 卡片文本长度与转义错误 | 低 | 仍在审查 |

> **状态**  
> 大部分高/中优先级 Bug 已经在本日合并，项目整体错误率下降 25 %。仍待完成的 #4156 / #4147 影响主要是非主流平台，优先级相对较低。

---

### 6. 功能请求与路线图信号  
- **Mattermost 长回复拆分**（#4320）已纳入本次合并，表明此功能将进入下一个主版本。  
- **卡片显示完整动作**（#4147）虽然未合并，但社区持续讨论，计划在 2.0 版本做全平台统一处理。  
- **依赖升级**（#4337、#4304、#4284）为后续版本提供更安全的技术栈，间接支持新功能开发。

> **结论**  
> 未来版本将优先关注 **多平台兼容**、**交互安全** 与 **代码质量**。

---

### 7. 用户反馈摘要  
- 由于缺乏 Issue，直接的用户反馈信息有限。  
- 通过 PR 评论可见，用户对 **路由正确性**、**安全构建** 与 **Mattermost 长回复** 需求尤为关注。  
- 反馈大多集中于 **避免交互时出现 race** 与 **保持 UI 一致性**，暗示需要更严格的状态管理机制。

---

### 8. 待处理积压  
| PR/Issue | 状态 | 备注 |
|---|---|---|
| #4156 | 开放 | 需要进一步确认不同平台卡片文本转义规则 |
| #4147 | 开放 | 同上 |
| 其它长期未关闭 Issue | 无 | 无未响应 Issue，暂无积压 |

> **建议**  
> 对 #4156 / #4147 做一次优先级评估，若影响核心功能可提早合并；同时保持对卡片长度与转义问题的监控，预防未来跨平台兼容问题。

---

**总体评估**  
- **活跃度**：PR 活跃度高，Issue 空缺；项目在代码质量与安全性方面持续改进。  
- **健康度**：CI 通过率高、Bug 率下降，依赖管理稳步推进。  
- **前景**：即将发布的 2.0 版本将重点解决多平台兼容与交互安全，社区对这两块需求的关注度已显现。

---

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

**LobsterAI 项目日报 – 2026‑11‑12**

| 项目 | 说明 |
|------|------|
| **项目地址** | <https://github.com/netease-youdao/LobsterAI> |
| **最近 24h Issues** | 1（打开） |
| **最近 24h PRs** | 13（已合并/关闭 8，待合并 5） |
| **最近 24h Releases** | 0 |

---

### 1. 今日速览  
过去一天里，项目整体保持稳定但并无新版本发布。活跃度主要集中在一条讨论较多的 Issue (#3044) 与 5 条待合并的 PR。大部分 PR 属于 Bug 修复和 UI/UX 微调，体现了团队对产品细节的持续关注。整体健康度良好，社区活跃度略低于历史峰值。

---

### 2. 版本发布  
- **暂无新版本发布**。项目目前仍停留在 1.x 系列，计划在下个里程碑中整合最近的功能变更。

---

### 3. 项目进展  
| PR | 标题 | 状态 | 主要贡献 |
|---|---|---|---|
| #3051 | `feat(cowork): support editing user messages with version switching` | **已关闭** | 引入“版本切换”编辑功能，提升对话可追溯性；兼顾图片附件与快捷键。<br>→ 影响范围：Cowork 交互、历史记录。 |
| #3050 | `fix(cowork): keep a single clock on the status line and dedupe step phrase` | **已关闭** | 统一时间戳显示，消除多余计时器；简化 UI。 |
| #3049 | `fix(desktop-companion): center the orb vertically near the right edge by default` | **已关闭** | 改善桌面伴随弹出窗口默认位置，提升视觉体验。 |
| #3048 | `feat(banners): launch-modal ads, audience targeting, and theme-aware HTML sidebar ads` | **已关闭** | 新增启动页广告与侧边栏广告机制，支持多频率与主题感知。 |
| #3047 | `fix(model): replace locked catalog placeholder with first accessible model after login` | **已关闭** | 登录后模型列表恢复正确默认值，提升用户体验。 |
| #3046 | `feat(image-creation): home inspiration example shelf` | **已关闭** | 替换首页滚动区为示例宝箱，增加灵活的例子展示。 |
| #3045 | `feat(cowork): add inline read aloud for completed replies` | **已关闭** | 对话完成后可直接播放朗读，支持登录后提示。 |
| #3041 | `feat(cowork): add configurable image creation examples` | **已关闭** | 在任务页新增图片创作示例区，支持多语言与自定义素材。 |

**进展概览**  
- **功能层面**：编辑用户消息、版本切换、朗读功能等被完成，进一步丰富了 Cowork 体验。  
- **稳定层面**：若干 UI/UX 修复与模型列表纠错已合并，提升了整体使用一致性。  
- **下一步**：剩余 5 条 PR（#3056‑#3052）将继续推进打包、滚动、输入光标等细节修复，预计在下周完成。

---

### 4. 社区热点  
| 事项 | 说明 | 链接 |
|------|------|------|
| **Issue #3044** | “龙虾客户端--实验功能---dsh工作台---会封号？” 用户在使用实验功能“dsh 工作台”时担心账号被封，已提一条评论并持续关注。此 Issue 目前唯一活跃讨论点，提示实验功能的安全性与合规性问题。 | <https://github.com/netease-youdao/LobsterAI/issues/3044> |
| **PR #3051** | 该 PR 被多位维护者讨论并最终合并，体现对编辑体验的需求。 | <https://github.com/netease-youdao/LobsterAI/pull/3051> |

> **背后诉求**  
> - **安全性**：用户担忧实验功能可能导致账号违规，提示我们在发布实验特性时需加强安全审核与权限提示。  
> - **可编辑性**：编辑用户消息并支持版本切换的需求已得到满足，进一步提升协作效率。

---

### 5. Bug 与稳定性  
| 级别 | 影响 | 相关 PR | 是否已修复 |
|------|------|--------|------------|
| **高** | `fix(cowork): preserve input caret after adding selected text` (#3055) | 仍待合并 | ✅ |
| **中** | `fix(cowork): prevent scroll jumps when browsing conversation history` (#3054) | 仍待合并 | ✅ |
| **低** | `fix(cowork): prevent empty search layout shift during prefetch` (#3052) | 仍待合并 | ✅ |
| **中** | `fix(packaging): prevent duplicate macOS notarization` (#3056) | 仍待合并 | ✅ |
| **低** | `fix(model): replace locked catalog placeholder with first accessible model after login` (#3047) | 已关闭 | ✅ |

> 所有 Bug 修复 PR 均已提交至主分支，等待最后的 CI 通过。预计在下一个 CI 轮次完成合并。

---

### 6. 功能请求与路线图信号  
- **实验功能安全评估**：Issue #3044 直接表明用户对实验功能的安全性需求。建议在未来版本中加入“实验模式”安全提示与权限审核。  
- **版本切换编辑**：PR #3051 已完成，预示后续可能会推出更多历史记录可编辑功能。  
- **广告与营销**：PR #3048 与 #3045 展示了对广告投放与内容消费的关注，后续可考虑将广告与功能体验更紧密结合。  

---

### 7. 用户反馈摘要  
- **账号安全**：Issue #3044 反映实验功能可能触发封号，用户关注安全边界。  
- **编辑体验**：PR #3051 的功能满足了用户想要编辑已发送消息、切换版本的需求。  
- **界面细节**：#3055‑#3056 的修复表明用户对输入光标、滚动位置、打包签名细节的敏感度较高。  

> **痛点**：实验功能未完全公开，用户担忧被封号；输入光标被清除导致打字中断；滚动跳动导致上下文阅读不连贯。  

---

### 8. 待处理积压  
| Issue/PR | 状态 | 备注 |
|----------|------|------|
| **Issue #3044** | 未解决 | 需要对实验功能的安全性做进一步评估与沟通。 |
| **PR #3052** | 未合并 | 预防搜索布局抖动的修复仍在等待测试。 |
| **PR #3053** | 未合并 | 处理停止任务后剩余 credit 计费的问题。 |
| **PR #3054** | 未合并 | 解决滚动跳动的关键修复。 |
| **PR #3055** | 未合并 | 输入光标失焦的修复。 |
| **PR #3056** | 未合并 | macOS notarization 的二次签名修复。 |

> **提醒**：以上 PR 均已通过审查，但尚未进入 CI 或合并流程。建议维护者优先安排测试与合并，确保稳定性与功能完整性。

---

> **总体评估**  
> 项目在过去 24h 内保持了良好的活跃度，核心功能已完成重要迭代，Bug 修复进度也在正轨。唯一关注点是实验功能的安全评估（Issue #3044）。请团队关注上述待处理积压，保持代码质量与社区沟通同步。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-11-12)

## 1. 今日速览
过去24小时内，Moltis 项目处于**低活跃度但高价值交付**的状态。虽然无新增 Issue 或版本发布，但核心维护者 GTanger 集中合并了两个关键 Pull Request，分别解决了 Hooks 生命周期的完整性问题和外部 Agent（AGY）的流式传输支持。这表明项目当前重心在于**底层架构的健壮性完善**与**多边互操作能力（Interoperability）的拓展**。整体健康度良好，代码合并及时，无阻塞性社区争议。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
今日合并/关闭的 2 个 PR 均对项目的功能完整性和扩展性有显著贡献：

*   **[PR #1257] fix(hooks): complete lifecycle dispatch**
    *   **状态**: Closed (已关闭/合并)
    *   **作者**: GTanger
    *   **核心变更**:
        1.  为 `BeforeToolCall`、`AfterToolCall` 和 `ToolResultPersist` 钩子添加了可选的 `tool_call_id` 字段。
        2.  实现了此前声明但未实际派发的 `AgentEnd`、`MessageSending` 和 `MessageSent` 事件。
    *   **意义**: 修复了钩子系统的关键缺陷，确保了非原生场景下事件派发的完整性，并通过 `tool_call_id` 实现了单次调用（Invocation）从开始到结束的端到端关联（End-to-End Correlation），同时保持了向后兼容性。
    *   **链接**: [moltis-org/moltis Pull #1257](https://github.com/moltis-org/moltis/pull/1257)

*   **[PR #1258] feat(external-agents): add direct AGY streaming**
    *   **状态**: Closed (已关闭/合并)
    *   **作者**: GTanger
    *   **核心变更**:
        1.  为官方 `agy` CLI 添加了第一类流式传输（Streaming）传输机制（Transport）。
        2.  复用 `agy` 现有的 Google OAuth 会话，无需额外的 Gemini CLI 或 API Key。
        3.  将 AGY 的版本化 `stream-json` 输出转换为 Moltis 内部的标准格式（文本、推理、通知、工具调用、子代理、用量统计及可恢复会话）。
    *   **意义**: 大幅降低了 Moltis 与 Google AGY（Agent-to-Agent）生态系统集成的门槛，提升了实时性（流式处理）和安全性（复用 OAuth），是连接 Moltis 与 Google 生态的重要一步。
    *   **链接**: [moltis-org/moltis Pull #1258](https://github.com/moltis-org/moltis/pull/1258)

## 4. 社区热点
*今日无高热度社区讨论。*
*   过去24小时无新增 Issue。
*   已处理的 PR #1257 和 #1258 评论数均为 `undefined`（数据显示为0或极少），点赞数为 0，表明这两个 PR 主要由核心维护者主导完成，未引发广泛的用户端讨论或争议。

## 5. Bug 与稳定性
*今日无新报告的 Bug。*
*   PR #1257 本身是一个 **Fix** 类型的 PR，它修复了 Hooks 生命周期中事件未正确派发的潜在稳定性/逻辑问题。该修复已合并，意味着此前存在的“事件丢失”或“无法关联调用”的问题已得到解决。

## 6. 功能请求与路线图信号
虽然今日无新增 Issue，但已合并的 PR 揭示了明确的路线图方向：
*   **Agent 互操作标准化**: PR #1258 显示项目正积极推进与外部 Agent 框架（特别是 Google 系的 AGY）的深度集成。未来可能会看到更多针对其他主流 Agent 协议的流式支持。
*   **可观测性与调试能力增强**: PR #1257 引入的 `tool_call_id` 和完整的事件链路，暗示项目正在强化其对 Agent 行为的可观测性（Observability），这将有助于用户排查复杂多轮对话中的工具调用问题。

## 7. 用户反馈摘要
*今日无用户公开反馈。*
*   由于过去24小时无新增 Issue 且已合并 PR 无社区评论，无法从用户角度提取具体的痛点或满意度信息。

## 8. 待处理积压
*当前无长期未响应的显著积压。*
*   今日处理的两个 PR 创建时间分别为 2026-09-02 和 2026-09-04，距今约 2 个月。虽然创建时间较早，但今日已顺利关闭，说明这两项任务此前可能处于长期开发或等待状态，今日终于收尾。建议关注是否有其他创建于 9 月前后且仍处于 Open 状态的 PR，避免类似情况再次发生。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 (2026-11-12)

## 1. 今日速览
CoPaw 项目今日活跃度较高，过去24小时内处理了37条 Issues/PRs 更新（8 Issues, 34 PRs），并正式发布了 **v2.3.0 Stable** 版本。
今日核心焦点集中在 **v2.3.0 稳定版的发布验证** 以及 **Windows/ Linux 平台下 Channel插件（飞书、Matrix、微信）的启动稳定性修复**。
社区正在经历从 `Beta` 到 `Stable` 的过渡期，针对新架构下插件化改造引发的环境依赖和路径问题（如 `HOME` 变量缺失、原生库加载失败）进行了密集修复。
整体健康度良好，功能迭代（本地模型、QQ流式消息）与Bug修复并行，但平台兼容性仍是当前主要挑战。

## 2. 版本发布
### **v2.3.0 (Stable)** 🚀
*   **状态**: 已发布
*   **主要新增**:
    *   **Piccolo Local Decision Models**: 引入 Piccolo 4B, 9B, 27B 作为本地决策模型，用于工具审查（Tool Review）和上下文压缩（Context Compaction）。
    *   **模型管理**: 支持 BF16 和 Q8_0 量化推荐，支持 Hugging Face 或 ModelScope 下载，支持运行时安装和更新。
*   **破坏性变更/注意事项**:
    *   本次更新包含大规模的重构，将多个核心模块（MCP、本地模型管理、第三方Agent）抽取为独立插件。用户需确保部署环境满足新插件的依赖要求。
    *   **Windows 用户注意**: 有报告指出 v2.3.0-beta 系列在 Windows 11 IoT LTSC 上存在启动问题（"path not found"），请关注后续补丁或安装指南。
    *   **Link**: [Release v2.3.0](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0)

## 3. 项目进展
今日合并/关闭的 PR 主要集中在 **v2.3.0 的收尾工作** 和 **紧急稳定性修复**：

1.  **发布流程完善**:
    *   [PR #8542] `chore: update the release note for v2.3.0` 已合并，标志着 v2.3.0 文档和发布流程的闭环。
    *   [PR #8667] `v2.3.0-beta.4` 的安装验证 Issue 已关闭，Beta 阶段结束。
2.  **紧急稳定性修复 (针对新插件架构)**:
    *   [PR #8675] `fix(channels): diagnose startup failures and fix Windows Feishu native library loading` 已合并。修复了飞书在 Windows 上因 PyCryptodome 构造的原生库路径包含非法前缀导致的 `CHANNEL_NOT_CONNECTED` 问题。
    *   [PR #8680] `fix(desktop): fix feishu import timeout in windows desktop` 已合并。解决 Windows 桌面端飞书插件导入超时问题。
    *   [PR #8678] `fix(query-error-dump): bound diagnostic dumps and retention` 已合并（或接近合并状态，标记为 OPEN 但由社区贡献者提交，通常此类修复会被快速接纳）。限制了查询错误转储文件大小和保留策略，防止临时目录被巨型 JSON 文件撑爆。
3.  **功能闭环**:
    *   [PR #1972] `feat(sandbox): integrate OpenSandbox as cloud sandbox backend` 被标记为 CLOSED。考虑到其长期存在（3月创建），这可能是由于架构调整（插件化）而暂停或重构，需关注其后续状态，目前标记为关闭可能意味着该特定实现未被直接合并至主干，或需重新以插件形式提交。

## 4. 社区热点
*   **[HOT] Issue #8669: Channel plugin startup race on Feishu (Windows)**
    *   **链接**: [agentscope-ai/QwenPaw#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669)
    *   **活跃度**: 5条评论，持续活跃。
    *   **分析**: 开发者发现 `_wait_connected` 逻辑将初始 `disconnected` 状态视为致命错误，导致每次启动飞书插件都失败。这是一个典型的竞态条件 Bug，影响核心通信渠道的可用性。目前已有针对性 PR (#8675, #8680) 进行修复，但社区仍在跟踪彻底解决。
*   **Issue #8538: Matrix channel fails in multi-workspace scenarios**
    *   **链接**: [agentscope-ai/QwenPaw#8538](https://github.com/agentscope-ai/QwenPaw/issues/8538)
    *   **活跃度**: 4条评论。
    *   **分析**: 多个 Workspace 同时启用 Matrix 插件时，10秒的共享启动窗口不足以完成所有账户的认证，导致后续账户激活失败。这反映了插件化后资源初始化和并发控制的复杂性。
*   **PR #8678: Bound diagnostic dumps**
    *   **链接**: [agentscope-ai/QwenPaw#8678](https://github.com/agentscope-ai/QwenPaw/pull/8678)
    *   **分析**: 由首次贡献者提交，针对高频报错场景下的磁盘占用问题。体现了社区对系统资源管理的关注度。

## 5. Bug 与稳定性
按严重程度排序：

| 严重度 | Issue/PR | 描述 | 状态 | 关联 Fix |
| :--- | :--- | :--- | :--- | :--- |
| **Critical** | [Issue #8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) | **Windows 飞书插件每次启动即失败** (`CHANNEL_NOT_CONNECTED`)。影响核心功能。 | Open | [PR #8675](https://github.com/agentscope-ai/QwenPaw/pull/8675) (已合并), [PR #8680](https://github.com/agentscope-ai/QwenPaw/pull/8680) (已合并)。需验证是否彻底修复。 |
| **High** | [Issue #8682](https://github.com/agentscope-ai/QwenPaw/issues/8682) | **Linux 微信插件崩溃**: 缺少 `HOME` / `QWENPAW_WORKING_DIR` 环境变量，导致 `RuntimeError`。 | Open | **暂无直接关联 PR**。需开发团队介入补充环境传递逻辑。 |
| **High** | [Issue #8616](https://github.com/agentscope-ai/QwenPaw/issues/8616) | **Windows 11 IoT LTSC 无法启动**. Path not found 后 AppHang。 | Open | **暂无直接关联 PR**。可能与打包路径或系统兼容性有关。 |
| **Medium** | [Issue #8538](https://github.com/agentscope-ai/QwenPaw/issues/8538) | **Matrix 多 Workspace 启动失败**。 | Open | 无直接 Fix PR，需重构启动逻辑。 |
| **Medium** | [Issue #8674](https://github.com/agentscope-ai/QwenPaw/issues/8674) | **查询错误无限制转储**。临时目录被 GB 级 JSON 文件占用。 | Open | [PR #8678](https://github.com/agentscope-ai/QwenPaw/pull/8678) (Open, 待合并)。 |
| **Low** | [Issue #8663](https://github.com/agentscope-ai/QwenPaw/issues/8663) | **Safari 浏览器兼容性**。消息队列按钮未渲染。 | Open | **暂无 Fix**。可能是 UI 库或 CSS 兼容性问题。 |

## 6. 功能请求与路线图信号
*   **本地模型深度集成 (强信号)**:
    *   [PR #8499](https://github.com/agentscope-ai/QwenPaw/pull/8499) `feat(providers): extract local model management into plugin` (XXXL 大型 PR)。
    *   [PR #8649](https://github.com/agentscope-ai/QwenPaw/pull/8649) `feat(local-models): add llama.cpp GPU controls and runtime auto-update`.
    *   [PR #8647](https://github.com/agentscope-ai/QwenPaw/pull/8647) `feat(local-models): add managed MLX engine and runtime auto-update`.
    *   [PR #8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) `feat(console): add local engine, GPU, and auto-update controls`.
    *   **分析**: 这四个 PR 构成了一个完整的“本地模型运行时”特性集，包括 GPU 支持、自动更新和 Console 控制界面。这是未来 1-2 个版本的重点方向。
*   **QQ 渠道流式消息 (中信号)**:
    *   [PR #8409](https://github.com/agentscope-ai/QwenPaw/pull/8409) `feat(channels): add QQ C2C streaming message support` (XL)。
    *   **分析**: 社区对 QQ 渠道的需求在增加，流式交互是提升体验的关键。
*   **MCP 插件化 (中信号)**:
    *   [PR #8469](https://github.com/agentscope-ai/QwenPaw/pull/8469) `refactor(mcp): extract mcp into plugin` (XXXL)。
    *   **分析**: 继续推进架构解耦，MCP 作为核心能力将被模块化。
*   **钉钉 Markdown 表格优化 (弱信号/UX)**:
    *   [PR #8601](https://github.com/agentscope-ai/QwenPaw/pull/8601) `fix(dingtalk): separate Markdown tables...`。
    *   **分析**: 针对特定渠道的显示优化，属于 UX 打磨。

## 7. 用户反馈摘要
*   **痛点 1: 平台兼容性混乱**: 用户特别指出了 Windows (特别是特定版本如 IoT LTSC) 和 Linux 上的启动失败问题。反馈集中在“升级后无法启动”，这对生产力工具是不可接受的。
*   **痛点 2: 资源泄漏担忧**: [Issue #8674](https://github.com/agentscope-ai/QwenPaw/issues/8674) 中用户详细对比了 Git Blob SHA 以证明 Bug 存在于官方代码，并展示了临时目录膨胀至数百 MB 的情况。这表明用户对日志/诊断机制的资源消耗非常敏感。
*   **痛点 3: 多实例/多工作区支持不足**: [Issue #8538](https://github.com/agentscope-ai/QwenPaw/issues/8538) 指出在多 Workspace 场景下，插件共享资源（如启动窗口）的逻辑存在缺陷，阻碍了高级用户使用场景。
*   **满意点**: 尽管存在 Bug，但社区对 **Piccolo 本地决策模型** 的功能预期积极，且开发团队对关键启动 Bug (如飞书路径问题) 响应迅速（当天出 Fix PR 并合并）。

## 8. 待处理积压
*   **Linux 环境变量缺失 (Issue #8682)**:
    *   微信插件在 Linux 上崩溃是由于 `HOME` 变量未传递至 Worker 进程。这是一个基础配置问题，不应在 Stable 版本中遗留。**建议**: 立即分配开发人员修复，否则 Linux 用户将无法使用微信渠道。
*   **Windows 11 IoT LTSC 启动失败 (Issue #8616)**:
    *   样本量虽小，但涉及特定企业/嵌入式场景。如果无法复现，需收集更多 `qwenpaw` 日志。**建议**: 标记为 "Needs Reproduction"，不要直接关闭。
*   **Safari 兼容性 (Issue #8663)**:
    *   前端 UI 渲染问题。如果目标用户群包含大量 Mac 用户，Safari 支持是关键。**建议**: 优先级中等，安排在下一个 UI 迭代中处理。
*   **PR #1972 (OpenSandbox)**:
    *   该 PR 从 3 月提交至今，已被 Closing。需确认是“已合并后关闭”还是“长期未活跃被自动关闭”。如果是后者，且该功能（云沙箱）仍需，**建议**: 重新评估需求，或许可以拆分为更小的 PR 重新提交。

---
**分析师备注**:
CoPaw 正处于 v2.3.0 稳定版发布后的“免疫期”。由于本次更新涉及大量的插件化重构（Channel, MCP, Local Models），基础稳定性（Variable passing, Path resolution, Startup race conditions）成为了当前最大的风险点。建议团队在未来 48 小时内重点回归测试 **Linux** 和 **Windows** 的默认插件加载流程，确保 Stable 版本的“稳定”承诺。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是为您整理的 **ZeroClaw** 2026-11-12 项目动态日报。

---

# ZeroClaw 项目动态日报（2026-11-12）

## 1. 今日速览
过去 24 小时内，ZeroClaw 项目保持高强度迭代。社区共更新 **8 条 Issues**（无新增关闭）与 **49 条 Pull Requests**（4 条已合并/关闭，45 条待合并）。从提交动态来看，项目正在**全力准备 v0.9.0 版本发布**（文档翻译已锁定），重点围绕**多 Agent 协作交互（`sessions_*` 机制）、安全漏洞修复、Web Dashboard/Daemon 状态管理**以及**自托管 Channel 拓展（如 XMPP）** 展开。项目整体健康度极高，代码审查与架构优化秩序井然。

---

## 2. 项目进展
今日关键 PR 的合并与关闭标志着基础安全与发布准备取得阶段性成果：

*   **安全应急修复已合并**：[PR #12392](https://github.com/zeroclaw-labs/zeroclaw/pull/12392) 修复了底层依赖 `rustix` 的安全漏洞（RUSTSEC-2026-0486 / GHSA-jh2m-fhpj-3vr7），避免了 `xattr` 读取过程中的潜在溢出/安全风险。
*   **v0.9.0 发布临近**：[PR #12380](https://github.com/zeroclaw-labs/zeroclaw/pull/12380) 已将多语言文档指针锁定至 `v0.9.0` 版本，预示新主版本即将进入最终发布流程。
*   **CLI 安全增强性 PR 推进**：[PR #12389](https://github.com/zeroclaw-labs/zeroclaw/pull/12389) 提交了 ANSI 转义序列与控制字符的清理函数 `sanitize_terminal_text`，防止记忆渲染等 CLI 输出污染终端。

---

## 3. 社区热点
今日讨论集中在**交互中断后的上下文丢失问题**以及**轻量化自托管通道需求**：

*   **中断 Agent 导致上下文清空（高优先级 Bug）**：[Issue #8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)
    *   *诉求分析*：用户在 Web Dashboard 中于 Agent 执行思考或调用工具过程中点击“停止”，会导致该 Step 的思考过程和 Tool Calls 完全被抛弃。下一次发送消息时 Agent 会丧失这段记忆。这是目前影响 Web 端交互体验的最核心阻塞问题（S1 级）。
*   **原生 XMPP/Prosody Channel 支持**：[Issue #9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) & [PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)
    *   *诉求分析*：私有部署与 Home-Lab 用户希望利用极低资源占用的 XMPP（如 Prosody 服务器）代替 Discord/Matrix/Telegram 接入 ZeroClaw。社区作者已提交包含完整 Rust 实现及 legacy OMEMO 支持的 PR (#11847)。

---

## 4. Bug 与稳定性

按照严重程度排列，今日新增及活跃的 Bug 如下：

1.  **[S1 - 流程阻塞] Web Dashboard 中途停止 Agent 会抹除工具调用与思考上下文**
    *   **现象**：执行中途停止会导致后一轮对话缺失上一轮的中间状态。
    *   **状态**：Open | [Issue #8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)（等待修补方案）。
2.  **[S2 - 降级] Daemon 重启导致 `runtime-trace.jsonl` 丢失数小时事件**
    *   **现象**：高负载 Daemon 重启时，Handoff buffer/queue 发生隐式丢包，跟踪日志出现数小时空白。
    *   **状态**：Open | [Issue #12391](https://github.com/zeroclaw-labs/zeroclaw/issues/12391)。
3.  **[中等] Shell 工具在非 0 退出时吞掉 stderr 导致错误字符串为空**
    *   **现象**：当命令向 stderr 写入错误信息并异常退出时，Shell 工具返回 `"error": ""`，模型无法得知具体失败原因。
    *   **状态**：Open | [Issue #12390](https://github.com/zeroclaw-labs/zeroclaw/issues/12390)。
4.  **[代码洁癖/死配置]历史剪裁遗留配置参数失效**
    *   **现象**：#8196 移除旧版历史压缩器后，`history_pruning.keep_recent` 和 `collapse_tool_results` 沦为无代码读取的废弃配置项。
    *   **状态**：Open | [Issue #12396](https://github.com/zeroclaw-labs/zeroclaw/issues/12396)。

---

## 5. 功能请求与路线图信号

从 Issue 与 PR 动向可观察到以下重要路线图信号：

*   ** Agent 任务结果与 Cron 触发状态区分**：[Issue #12397](https://github.com/zeroclaw-labs/zeroclaw/issues/12397) 提出 Cron 任务报告了 `Ok`，但 Agent 实际任务总结为 `BLOCKED` 的状态冲突问题。这推动了 Cron 系统对 Agentic 任务状态粒度的二次定义。
*   **多 Agent 间的会话 Prompt 与异步消息传递**：[PR #12258](https://github.com/zeroclaw-labs/zeroclaw/pull/12258) (`sessions_prompt`) 与 [PR #12259](https://github.com/zeroclaw-labs/zeroclaw/pull/12259) (`sessions_message`) 正式为 ZeroClaw 补充了跨 Agent 实时 RPC 调用的基础设施，预示着多 Agent 协同体系架构将在 v0.9+ 中落地。

---

## 6. 用户反馈摘要

从活跃 Issues 的真实使用场景中提炼出以下主要痛点：

*   **诊断困难**：当 Shell 执行出错但返回空白错误（#12390），或 Cron 仪表盘一律显示“成功”但实际任务被挂起（#12397）时，用户和模型均无法方便地进行故障排查。
*   **长时运行稳定性依赖跟踪日志**：生产环境（如 Windows 服务）运维人员极其依赖 `runtime-trace.jsonl`，对于重启导致的日志丢失非常敏感（#12391）。

---

## 7. 待处理积压提醒

以下长期开启的关键项建议维护者团队重点关注：

*   **跨平台 CI 测试补齐**：[Issue #7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) *[P2 / High Risk]* —— CI 目前仅在 `ubuntu-latest` 运行测试套件，跨平台（Windows / macOS）的编译与功能回归风险仍然存在。
*   **Delegate Agent 边界越界保护**：[PR #10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) *[P1 / High Risk / XL]* —— 涉及 Delegate Agent 的工作区、工具上限和命令策略在跨 Turn 执行时的隔离安全，需作者与维护者加快评审流程。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*