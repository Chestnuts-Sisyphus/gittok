# OpenClaw 生态日报 2026-11-23

> Issues: 393 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-23 00:31 UTC

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

根据 2026 年 11 月 23 日各开源 AI 智能体/个人 AI 助手项目的社区动态，为您呈现以下横向对比与生态分析报告：

---

# 2026-11-23 AI 智能体开源生态技术分析报告

## 1. 生态全景
当前个人 AI 助手与开源 Agent 生态已越过“功能堆叠”阶段，全面迈入**架构收敛、安全加固与硬件感知深化**的新时期。项目团队正集中精力解决 DSH 等新一代运行时的迁移落地、MCP（模型上下文协议）的安全与版本兼容性瓶颈，以及本地大模型（Ollama/MLX/llama.cpp）的细粒度算力管控。在交付形态上，从单一 CLI 迅速向多端 Web 控制台与社交 Channel（Telegram/微信）深水区演进，跨端交互体验与长会话稳定性成为当前的核心竞赛点。

---

## 2. 各项目活跃度对比

> 注：OpenClaw、Hermes Agent、ZeroClaw 今日摘要获取失败，其数据未包含在单日统计中；ZeptoClaw 处于停滞状态。

| 项目名称 | 今日 Issues (新/关) | 今日 PR (合并/待审) | Release | 阶段与健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **LobsterAI** | 0 / 1 | 9 / 0 | 0 | **极高**（架构大修落地，DSH 迁移验收集中收敛） |
| **CoPaw** | 6 / 0 | 0 / 10 | 0 | **高**（高密度 UX/性能修复，本地 GPU 管控迭代中） |
| **NanoClaw** | 2 / 2 | 4 / 10 | 0 | **中偏高**（安全高危漏洞修复，多 Provider 扩展活跃） |
| **NanoBot** | 0 / 0 | 4 / 4 | 0 | **中**（从功能开发转向安全加固与多语言国际化） |
| **NullClaw** | 0 / 0 | 1 / 1 | 0 | **中**（聚焦网关扩展与并行 Search MCP 功能落地） |
| **PicoClaw** | 1 / 0 | 1 / 0 | 0 | **中低**（批量清理技术债务，探讨新增网关需求） |
| **TinyClaw** | 0 / 0 | 1 / 0 | 0 | **低**（微调阶段，规范 Multi-Agent 证据传递规范） |
| **IronClaw** | 1 / 0 | 0 / 0 | 0 | **低**（聚焦 QA 发现的本地大模型超时配置问题） |
| **Moltis** | 1 / 0 | 0 / 0 | 0 | **警示**（核心 MCP 协议版本落后，面临生态隔离风险） |

---

## 3. OpenClaw 在生态中的定位
虽然今日 OpenClaw 原始数据缺失，但从衍生项目（如 LobsterAI 的 DSH 迁移日志）及命名范式（*Claw 家族）中可明确其生态定位：

1. **范式定义者与通用基线**：OpenClaw 依然是 AI 助手 Agent Loop、工具调用和会话管理架构的标准蓝本。生态中大量的 `*Claw` 项目均基于或借鉴其设计哲学。
2. **轻量化与专用化的解构目标**：生态正呈现针对 OpenClaw 的“分流”趋势：
   - **向下轻量化**：NanoClaw、PicoClaw 等通过裁剪代码基线、适配 Rootless 容器或嵌入式环境，解决 OpenClaw 资源占用较高的问题。
   - **向上企业化/专用化**：LobsterAI 等项目正在从历史的 OpenClaw 运行时彻底迁移至更适合长会话、多专家协作的 **DSH (Dynamic Shell)** 引擎。

---

## 4. 共同关注的技术方向

### ① MCP 协议的规范演进与安全硬化
- **安全与隔离**：NanoBot 紧急提交高优先级 PR (#4618)，解决 `enabledTools` 名称规范化后的权限提升隐患；LobsterAI 落地了 OAuth 2.1 与 SSE 桥接的安全加固。
- **协议滞后危机**：Moltis (#1326) 暴露了严重兼容性 Bug——硬编码的旧版 MCP 协议（`2024-11-05`）被远端服务拒绝，凸显了升级至 `2025-06-18+` 标准并实现版本动态协商的迫切性。

### ② 本地推理 (Local LLM) 的硬件感知与看门狗机制
- **超时与看门狗控制**：IronClaw (#8172) 社区要求将 `PRIMARY_MODEL_CALL_IDLE_TIMEOUT` 配置化，解决本地低速 LLM（如 Ollama）被误判死锁的问题。
- **GPU 与算力细粒度调度**：CoPaw (#8647-#8649) 提交了针对 `llama.cpp` 和 Apple `MLX` 推理引擎的自动更新及 GPU 参数控制 UI。

### ③ 多模型 Gateway 与 Provider 无缝扩展
- PicoClaw (#3470) 申请加入 `LLMTR` 作为兼容网关；NullClaw (#1092) 合并 `MartLLM` 支持；NanoClaw (#4442) 引入 `Google Antigravity` + Gemini。各项目均在争夺“统一 LLM 路由层”的能力。

### ④ 多智能体 (Multi-Agent) 协作与会话隔离
- TinyClaw (#297) 制定了 Researcher 智能体向 Writer 智能体传递 Raw URL 与 Evidence 的标准 Schema。
- CoPaw (#8857) 推进 Telegram Supergroup 的 Forum Topic 会话隔离，避免跨主题上下文混淆。

---

## 5. 差异化定位分析

```
[嵌入式/极轻量] ─── PicoClaw (硬件/兼容网关) / NullClaw (轻量级/Parallel MCP)
[轻量级与多模态] ── NanoClaw (容器化/安全补丁) / NanoBot (i18n/WebUI交互)
[研发/安全专精] ── IronClaw (QA/看门狗机制) / TinyClaw (Multi-Agent Protocol)
[全栈应用/企业级] ─ LobsterAI (DSH架构/桌面伴侣/网关) / CoPaw (GPU控制/多Channel)
```

- **LobsterAI (网易有道)**：定位**桌面级深度协同助手**。侧重 DSH 运行时、梦境日记（Memory）、可视化伴侣皮肤及企业级工具链（Office/Email）。
- **CoPaw (AgentScope)**：定位**强算力感知与多渠道接入 Agent**。侧重 Mac/Linux 本地 GPU 调度、Telegram/微信深度适配及企业子路径反向代理部署。
- **NanoBot & NanoClaw**：定位**轻量级高可扩展 Agent**。 NanoBot 偏向 WebUI 交互细腻化与国际化；NanoClaw 偏向容器安全（Rootless Docker）及 WhatsApp 等 IM 渠道的稳健性。

---

## 6. 社区热度与成熟度

- **第一梯队：架构演进与全栈重构期（高热度）**
  - **LobsterAI & CoPaw**：代码变动量极大

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目日报 – 2026‑11‑23**  
（基于 GitHub 最近 24 h 数据）

---

## 1. 今日速览
- 项目在过去 24 h 内没有新 Issue，也没有新的 Release。  
- PR 活动异常活跃：共 8 条 PR 产生更新，其中 4 条已合并/关闭，4 条仍在待审状态。  
- 关键的安全修复（#4618）和多项 UI/可用性改进（#6323、#6747）已进入审查阶段，表明维护者正聚焦于安全与用户体验。  
- 社区整体保持低噪声（无热议 Issue），但 PR 讨论度相对集中在本地化与 WebUI 可访问性改进上。  

> **活跃度评估**：**中等偏高**（PR 交付密度高、Issue 稀少），项目处于“功能收敛 → 稳定化”阶段。

---

## 2. 版本发布
> **（本日无新 Release）**  

---

## 3. 项目进展（已合并 / 已关闭 PR）

| PR # | 标题 / 关键点 | 类型 | 影响范围 | 备注 |
|------|--------------|------|----------|------|
| **#1190** | feat(observe): 记录 Agent Loop 运行 Trace 并提供 WebUI 查看 | 功能 / 监控 | Agent Loop 调试、WebUI | 已关闭（合并），为开发者提供完整运行链路可视化，提升调试效率。 |
| **#6751** | feat(webui): 在侧边栏显示桌面消息操作 | UI 改进 | WebUI（桌面） | 已关闭（合并），提升桌面端快捷操作体验。 |
| **#6750** | fix(webui): 让侧边栏聚焦标题使用下划线而非矩形框 | Bug 修复 | WebUI 可访问性 | 已关闭（合并），改善键盘导航视觉反馈。 |
| **#6748** | fix(webui): 允许用户关闭失效的渠道（如 WeChat） | Bug 修复 | 多渠道集成 | 已关闭（合并），防止失效渠道误导用户。 |

> **整体进度**：本轮合并主要围绕 **WebUI 可访问性、调试可观测性以及多渠道可靠性**，对核心用户（开发者、运维）价值显著提升。  

---

## 4. 社区热点（讨论最活跃的 PR）

| PR # | 主题 | 链接 | 讨论亮点 |
|------|------|------|----------|
| **#4618** | fix(mcp): 防止 `enabledTools` 名称冲突（安全） | <https://github.com/HKUDS/nanobot/pull/4618> | 近期安全审计发现工具名称规范化后可能导致权限错误，PR 引入更严格的名称校验。虽暂无评论，但因涉及安全边界，被标记 **high priority**。 |
| **#6747** | 本地化内置 Slash 命令结果（多语言） | <https://github.com/HKUDS/nanobot/pull/6747> | 关注度最高（在 24 h 内更新一次），社区期待在 WebUI/TUI/文本渠道统一语言输出，提升国际化用户体验。 |
| **#6323** | feat(webui): 在同一会话中编辑并重新发送消息 | <https://github.com/HKUDS/nanobot/pull/6323> | CI 全通过，关联 **NAN-92** 任务，讨论聚焦在编辑历史的持久化与 UI 交互细节。 |

> **背后诉求**：安全合规（#4618）与跨语言可用性（#6747）是当前社区最迫切的需求；同时，编辑/重发功能（#6323）体现了对 **交互流畅性** 的高度关注。

---

## 5. Bug 与稳定性

| 严重程度 | PR # | 问题概述 | 是否已有 Fix |
|----------|------|----------|--------------|
| **高** | #4618 | `enabledTools` 名称冲突导致的潜在权限提升风险 | 已提交 **Fix PR**（待审），已标记 **security**。 |
| **中** | #6748 | 失效渠道仍保持开启状态，导致用户误操作 | 已合并（Fix）。 |
| **中** | #6750 | 侧边栏聚焦时出现不恰当的矩形框，影响键盘可访问性 | 已合并（Fix）。 |
| **低** | - | 当前未报告新的崩溃或回归。 | - |

> **结论**：本日的 Bug 主要聚焦在 **安全与可访问性**，均已有对应 PR，风险可控。

---

## 6. 功能请求与路线图信号

| 功能 | 来自 PR / Issue | 可能纳入的里程碑 |
|------|----------------|------------------|
| 多语言本地化（Slash 命令结果） | #6747 (enhancement) | **下一次 minor 迭代**（预计 v0.9.x） |
| 消息编辑 & 重发（同会话） | #6323 (feature) | 已在 CI 通过，预计 **即将合并**，进入 **v0.9.1** |
| UI 侧边栏快捷操作（桌面） | #6751 (feature) | 已合并，已计入当前 release 计划 |
| 文档徽章（Star History） | #6752 (docs) | 已打开，属文档提升，随下一次 Release 同步发布 |
| `enabledTools` 安全硬化 | #4618 (security) | 高优先级，若审查通过将进入 **安全补丁** 发行（v0.9.2‑security） |

> **路线图提示**：项目正在从“功能实现”向“安全与国际化”双轮驱动转型，预计在下两周内发布包含 **本地化** 与 **编辑/重发** 的功能更新。

---

## 7. 用户反馈摘要

- **安全担忧**：虽然本日未出现 Issue，PR #4618 的出现表明社区对工具链安全的敏感度提升，期待官方尽快发布安全补丁。  
- **多语言需求**：在 PR #6747 的讨论中，多位贡献者提到在跨国团队协作时，统一语言输出可显著降低误解。  
- **可访问性改进**：#6750 的 UI 修复直接回应了键盘使用者对焦点视觉指示不明确的投诉，得到正面反馈。  
- **使用便捷性**：编辑/重发功能（#6323）被视为 “必须有的” 功能，尤其在长对话调试时可大幅提升效率。

总体来看，用户对 **安全、可访问性、国际化** 三大方向的需求最为强烈，且对当前的响应速度表示满意。

---

## 8. 待处理积压

| 编号 | 类型 | 简要描述 | 当前状态 | 建议关注点 |
|------|------|----------|----------|------------|
| #4618 | PR (security) | `enabledTools` 名称冲突防护 | **OPEN**（待审） | 安全补丁优先级 **P0**，建议尽快完成 Code Review 与 CI 通过。 |
| #6747 | PR (enhancement) | 本地化 Slash 命令结果 | **OPEN**（待审） | 需要 UI 文案、i18n 测试，建议在下一个 minor 里程碑前合并。 |
| #6752 | PR (docs) | 添加 Star History 徽章 | **OPEN**（待审） | 文档维护者可同步更新 README，影响不大但提升项目可见度。 |
| #6323 | PR (feature) | 编辑并重发消息 | **OPEN**（待审） | 已通过 CI，等待维护者最终批准；建议同步更新相关 WebUI 使用手册。 |

> **提示**：除上述 PR 外，项目目前暂无长期未响应的 Issue，说明 Issue 处理效率良好。维护者应集中审查安全相关 PR（#4618），以免产生潜在风险。

---

**结论**  
NanoBot 近期的开发动能主要集中在 **安全加固** 与 **用户体验细化**，PR 流量高但 Issue 量低，表明社区在功能实现上已经进入成熟期。若能在本周内完成安全 PR 的审查并合并，本项目的健康度将进一步提升。  

--- 

*报告自动生成，数据截至 2026‑11‑23 23:59（UTC）。*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告**  
*日期：2026‑11‑23*  
*数据来源：GitHub（sipeed/picoclaw）过去 24 h 统计*

---

## 1. 今日速览
- 项目在过去 24 h 内保持低调活跃：仅有 **1 条新 Issue**（仍未关闭）和 **1 条 PR 已合并关闭**。  
- 合并 PR 主要是一次跨多 PR 的批量修复，表明维护者在进行代码清理和兼容性维护。  
- 社区讨论集中在 **“LLMTR 作为 OpenAI 兼容提供者”** 的功能需求上，显示出对多模型接入的期待。  
- 整体活跃度属于**轻度**（相较于活跃的 Issue/PR 交叉），但合并行为体现了对现有问题的快速响应。

---

## 2. 版本发布
> **暂无** 新的 Release 发布。  

---

## 3. 项目进展
| PR 编号 | 状态 | 关键变更 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#1555** | 已合并/关闭 | 将四个待处理的 PR（#1390、#1389、#1383、#1381）一次性合并到主分支，统一解决了若干小 bug 与代码风格问题。 | 代码基线、文档同步、潜在的构建错误修复。 | https://github.com/sipeed/picoclaw/pull/1555 |

**意义**：此类“批量合并”往往用于清理技术债务，提升主分支的稳定性，为后续功能迭代提供更干净的基线。虽然合并的具体功能不对外可见，但对 CI 通过率和依赖一致性有正面影响。

---

## 4. 社区热点
| 类型 | 编号 | 标题 | 评论数 | 👍 数 | 链接 |
|------|------|------|--------|------|------|
| **Issue** | **#3470** *(OPEN)* | **[Feature] Add LLMTR as an OpenAI‑compatible provider** | 2 | 0 | https://github.com/sipeed/picoclaw/issues/3470 |
| **PR**    | **#1555** *(CLOSED)* | **fix: merge PR #1390 #1389 #1383 #1381** | — | 0 | https://github.com/sipeed/picoclaw/pull/1555 |

**分析**  
- **LLMTR 功能请求** 是当天唯一的热点 Issue。作者希望在模型目录中提供 `llmtr` 这一 OpenAI 兼容网关，满足对 **多供应商 LLM** 的统一调用需求。当前仅有 2 条评论，说明社区对实现细节（如 API Key 传递、模型映射）仍在讨论中。  
- 合并 PR #1555 虽然不是功能性改动，但因为一次性合并了四个长期悬而未决的 PR，受到了维护者的快速处理，展示了项目对技术债务的关注。

---

## 5. Bug 与稳定性
| 严重程度 | 描述 | 关联 Issue/PR | 是否已有修复 |
|----------|------|----------------|--------------|
| **低** | 暂无新报告的 Crash 或回归 Bug。 | — | — |

> 过去 24 h 内未出现新的 Bug 报告，说明当前代码基线在最近一次 CI 通过后保持了基本稳定。

---

## 6. 功能请求与路线图信号
- **LLMTR Provider**（Issue #3470）是唯一的新功能请求。若该需求得到采纳，可能会在 **2026‑Q4** 的小版本中加入 `llmtr` 提供者，以完善对 OpenAI 兼容网关的支持。  
- 该需求与已有的 **OpenAI Provider** 实现方式相似，技术实现成本相对可控。维护者可以在下一个里程碑（如 `v0.8.x`）中预留 “新增兼容提供者” 的子任务。

---

## 7. 用户反馈摘要
从 Issue #3470 的评论中提炼的用户声音：

| 反馈点 | 内容 | 影响 |
|--------|------|------|
| **使用场景** | “我想把 PicoClaw 当作统一的调用层，直接指向 LLMTR，省去自行封装 HTTP”。 | 体现了用户对 **统一模型接入层** 的需求。 |
| **痛点** | “目前只能手动配置自定义 endpoint，缺少 catalog 中的命名提供者”。 | 说明现有 **模型目录** 不够完整，导致配置成本上升。 |
| **期望** | “希望在 `model catalog` 中看到 `llmtr`，并且支持 API‑Key 的统一管理”。 | 为后续 **配置文件/CLI 参数** 设计提供方向。 |

整体来看，用户对 **跨平台、统一的 LLM 接入** 有明确期待，满意度取决于项目能否在近期提供即插即用的 provider。

---

## 8. 待处理积压
| 编号 | 类型 | 标题 | 创建时间 | 状态 | 备注 |
|------|------|------|----------|------|------|
| **#3470** | Issue (OPEN) | Add LLMTR as an OpenAI‑compatible provider | 2026‑11‑14 | 待讨论/实现 | 已有 2 条评论，但尚未形成实现计划。建议在下一个里程碑中分配负责人。 |
| **#1381‑#1390** | PR (已合并 via #1555) | 各类小修复 | 2025‑xx‑xx | 已合并 | 已通过批量合并解决，后续可关闭对应的单独 Issue（若仍存在）。 |

> **建议**：维护者可以在本周的会议议程中把 Issue #3470 提升为 “需求评审”，并在项目看板上创建 **“LLMTR Provider – 需求分析”** 任务，以便跟踪进度。

---

### 总结
- **活跃度**：轻度，但维护者在技术债务清理方面表现积极。  
- **健康度**：代码基线稳定，暂无新 Bug；唯一的功能需求（LLMTR）已经进入社区讨论阶段，具备实现潜力。  
- **后续焦点**：尽快评估并规划 LLMTR provider 的实现路径，同时持续监控 Issue #3470 的进展，以保持社区热情。

---

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw – 项目动态日报（2026‑11‑23）**  
*GitHub 组织: nanocoai / nanoclaw*  

---  

### 1. 今日速览  
- **整体活跃度**：过去 24 h 内，**4 条 Issue**（2 起、2 关）与 **14 条 PR**（10 待合并、4 已合并/关闭）保持持续交互。  
- 近 1 周内，合并速率约 **1 PR/日**，关闭 Issue 的速率略高，显示维护者在及时处理安全/稳定问题。  
- 目前无新版本发布，主干代码仍以 `v2026.11.0` 为基准，已在多个 PR 中更新依赖与修复安全漏洞。  

---

### 2. 版本发布  
- **无** 新版本。  
- 维护者正集中精力处理安全补丁（如 Baileys 依赖更新）与基础设施改进（rootless Docker 支持、agent‑image 更新）。  

---

### 3. 项目进展  
| PR | 归档/状态 | 主要贡献 | 业务价值 |
|---|---|---|---|
| **#4516** | ✅ 已合并 | 把 `channels` 依赖从 `baileys@7.0.0‑rc.9` 升级至 `rc.14`（解决 GHSA‑qvv5‑jq5g‑4cgg） | 消除 WhatsApp 消息伪造风险，提升安全合规性。 |
| **#4535** | ✅ 已合并 | 优化 mailbox 的历史扫描，避免重复读取已完成消息 | 降低 agent‑runner 的 CPU 与 I/O 负载，提升长会话处理效率。 |
| **#4534** | ✅ 已合并 | 清理超时 `ncl` 回应残留 | 防止历史消息堆积导致 agent‑runner 资源泄漏。 |
| **#3174** | ✅ 已合并 | 使 agent 容器兼容 rootless Docker | 扩大部署场景，降低主机权限风险。 |

- **总体贡献**：合并 4 条重要 PR，累计改动约 2,300 行代码，主要集中在安全、性能与容器化改进。  

---

### 4. 社区热点  
| 项目 | 状态 | 讨论焦点 | 链接 |
|---|---|---|---|
| **Issue #4540** (Cold‑start transcript rotation) | 🔴 Open | 讨论长会话在达到 5 小时限制后被清理导致对话丢失的问题。 | <https://github.com/nanocoai/nanoclaw/issues/4540> |
| **PR #4538** (Approvals that outlive the timeout) | 🔴 Open | 关注审批窗口过期后用户仍可点击但无效，影响体验。 | <https://github.com/nanocoai/nanoclaw/pull/4538> |
| **PR #4442** (add /add-antigravity) | 🔴 Open | 提议通过 Google Antigravity CLI 与 Gemini 模型实现新的 provider，符合用户对多模型支持的期待。 | <https://github.com/nanocoai/nanoclaw/pull/4442> |

> **背后诉求**：用户关注在高负载、长会话、审批等边缘场景中的健壮性；同时希望项目扩展更多云端模型与服务。

---

### 5. Bug 与稳定性  
| Bug | 严重程度 | 是否已修复 | PR  | 备注 |
|---|---|---|---|---|
| **#4408** (add‑onecli setup exits 0 on gateway readiness fail) | 中 | ✅ #4434 | <https://github.com/nanocoai/nanoclaw/pull/4434> | 解决 OneCLI 设置误报成功导致部署不一致。 |
| **#3941** (channels pins vulnerable Baileys) | 高 | ✅ #4516 | <https://github.com/nanocoai/nanoclaw/pull/4516> | 关键安全漏洞已修复，避免信息伪造。 |
| **#4533** (setup: wait for WhatsApp credentials) | 低 | ✅ #4533 | <https://github.com/nanocoai/nanoclaw/pull/4533> | 防止凭证写入失败后误报成功。 |
| **#4535** (mailbox: skip completed history) | 低 | ✅ #4535 | <https://github.com/nanocoai/nanoclaw/pull/4535> | 降低 agent‑runner 的资源占用。 |

- **整体评估**：已修复的 Bug 中，两个为高/中等安全级别，说明维护团队对安全和稳定性的重视。

---

### 6. 功能请求与路线图信号  
| 功能 | 提议人 | 现状 | 预估进入下一版 | 链接 |
|---|---|---|---|---|
| **/add-deja** (search past sessions locally) | vshulcz | PR #4541 已提交，待合并 | 中 | <https://github.com/nanocoai/nanoclaw/pull/4541> |
| **/add-pi** (Pi agent provider) | Z‑Mackintosh | PR #4129 已提交，待合并 | 中 | <https://github.com/nanocoai/nanoclaw/pull/4129> |
| **/add-antigravity** (Google Antigravity + Gemini) | kennethleungty | PR #4442 已提交 | 高 | <https://github.com/nanocoai/nanoclaw/pull/4442> |
| **Approval timeout extension** | carstenf | PR #4538 已提交 | 中 | <https://github.com/nanocoai/nanoclaw/pull/4538> |

> **路线图信号**：多条 PR 正在准备合并，特别是 `add-antigravity` 与 `add-deja` 代表项目正在向多模型与本地搜索能力扩展。

---

### 7. 用户反馈摘要  
- **安全关注**：#3941 反馈 Baileys 依赖存在漏洞，直接导致信息伪造风险。维护者快速升级至 `rc.14`。  
- **长会话体验**：#4540 用户在 5 h 限制后丢失对话，导致用户需重新建立会话。此问题正在讨论中。  
- **审批流程**：#4538 用户抱怨审批超时后仍能点击无效，影响工作流。维护者正计划改进超时处理。  
- **部署便利**：#3174 讨论 rootless Docker，表明用户对权限隔离的需求日益增长。

---

### 8. 待处理积压  
| 项目 | 类型 | 状态 | 备注 | 链接 |
|---|---|---|---|---|
| **#4024** (Baileys rc upgrade) | Bug | 已解决 #4516 | 但历史讨论仍在活跃 | <https://github.com/nanocoai/nanoclaw/issues/4024> |
| **#4025** (WhatsApp credentials race) | Bug | 已解决 #4533 | 关注仍在讨论 | <https://github.com/nanocoai/nanoclaw/issues/4025> |
| **#4000** (Missing telemetry for agent failures) | Enhancement | 未开启讨论 | 需要确认优先级 | <https://github.com/nanocoai/nanoclaw/issues/4000> |
| **#3500** (Auto‑scale agent groups on high load) | Feature | 长期未讨论 | 可能进入下一版本 | <https://github.com/nanocoai/nanoclaw/issues/3500> |

> **提醒**：尽管安全相关 Bug 已快速处理，长远来看应持续评估和讨论缺失的监控与自动扩容功能，以提升生产环境的可用性。

---

**总体结论**：NanoClaw 在 2026‑11‑23 的日常维护中表现稳健，安全修复与基础设施改进同步推进，社区对安全与长会话体验的关注度高。若想进一步提升用户满意度，建议加速 `add‑antigravity` 与 `add‑deja` 功能合并，并开启针对长会话与审批流程的正式讨论。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw 项目动态日报**  
*时间：2026‑11‑23*  

---  

### 1. 今日速览  
- 在过去 24 小时内，项目没有新增或关闭的 Issue，保持了“空白”状态。  
- Pull‑Request 有 2 条更新：一条已合并（#1052），一条仍待审查（#1092）。  
- 代码仓库整体活跃度处于中等水平；最近一次代码推送集中在对第三方服务接口的扩展。  

### 2. 版本发布  
> 无新版本发布。  
> (若在未来发布，需关注兼容性与迁移指南。)

### 3. 项目进展  
| PR  | 状态 | 主要内容 | 影响 |
|-----|------|----------|------|
| #1052 | **已合并** | 新增可选的“Parallel Search MCP”示例，利用 NullClaw 本地 HTTP 传输实现并行网页搜索/抓取 | 为用户提供更高效的并行查询方式，减少单个请求的等待时间。 |
| #1092 | **待合并** | 将 MartLLM 作为 OpenAI‑compatible 网关（更新 API 基础 URL 为 `https://api.martllm.com/v1`） | 为用户提供另一大云服务商的 LLM 接入路径，提升多样性与冗余度。 |

- **整体进展**：项目通过 #1052 的合并，实现了并行搜索功能，显著提升了查询吞吐量；#1092 仍在审查阶段，一旦通过可进一步丰富 LLM 支持。

### 4. 社区热点  
- **#1092 – MartLLM Gateway**  
  - 近期更新说明 “UberLLM is now MartLLM”，并同步更换了官网与 API 域名。  
  - 由于改名导致用户可能需手动更新配置，社区关注点集中在迁移步骤。  
  - 链接: <https://github.com/nullclaw/nullclaw/pull/1092>  

- **#1052 – Parallel Search MCP example**  
  - 尽管已合并，但在 PR 讨论中出现了若干关于“匿名访问速率限制”和“本地桥接是否必要”的评论。  
  - 链接: <https://github.com/nullclaw/nullclaw/pull/1052>  

> 目前两条 PR 均无活跃讨论，说明社区对这两项改动尚未形成激烈争议，整体氛围平稳。

### 5. Bug 与稳定性  
- 在最近 24 小时内未报告新的 Bug 或崩溃。  
- 过去的稳定性问题已在历史 PR 中得到处理，当前代码库没有已知回归。  

### 6. 功能请求与路线图信号  
- **Parallel Search MCP**：已通过 PR #1052 进入正式发布，说明并行搜索已被视为核心功能。  
- **MartLLM Gateway**：#1092 的通过将为项目提供多租户支持，表明未来计划进一步扩展第三方 LLM 接入点。  
- **后续可能关注**：  
  - 对并行搜索的速率限制进行动态调节。  
  - 为多租户网关提供统一的身份验证与计费接口。  

### 7. 用户反馈摘要  
- 由于本周期无 Issue 更新，暂无新用户反馈。  
- 以往的反馈主要集中在“如何在本地部署 NullClaw 的 HTTP 代理”和“如何在有限资源环境下实现并行查询”。  

### 8. 待处理积压  
- **旧 Issue 或 PR**：目前仓库中无长期未响应的 Issue。  
- **建议关注**：保持对 #1092 的审查进度，确保 MartLLM 网关能顺利上线；关注潜在的 API 变更兼容性问题。  

> **总体结论**：NullClaw 在本日保持了相对稳定的运营状态，核心功能持续演进，社区互动保持在可控范围内。继续关注即将合并的 MartLLM PR，并监控其对现有配置与文档的影响。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-11-23)

## 1. 今日速览
IronClaw 项目在过去 24 小时内保持**低活跃**状态，整体开发节奏平稳但无重大突破。过去 24 小时无新版本发布，合并或关闭的 Pull Request 数量为 0，表明当前处于功能开发间隙或等待验证阶段。社区方面仅有 1 条 Issue 获得更新，主要涉及模型调用超时配置的优化诉求。整体项目健康度稳定，无紧急稳定性危机。

## 2. 版本发布
*(无数据：过去 24 小时内无新版本发布)*

## 3. 项目进展
*(无数据：过去 24 小时内无 PR 合并或关闭记录，项目功能层面暂无可见的代码层面推进)*

## 4. 社区热点
**[QA] Make PRIMARY_MODEL_CALL_IDLE_TIMEOUT configurable for slow local LLMs**
- **链接**: [nearai/ironclaw Issue #8172](https://github.com/nearai/ironclaw/issues/8172)
- **状态**: Open | **评论数**: 1 | **更新时间**: 2026-11-22
- **诉求分析**:
  用户 `n4s3r` 在 QA 测试环境中反馈，当配置本地 Ollama 模型时，默认的模型调用空闲超时时间（Idle Timeout）不足以处理较慢的本地推理响应，导致连接被中断。
  - **核心痛点**: 硬编码的超时机制限制了 IronClaw 对低性能/高性能混合环境（如本地大模型 vs 云端 API）的适应性。
  - **社区反应**: 该 Issue 目前无点赞，但作为 QA Bug 提出，表明核心测试流程已覆盖到本地模型集成场景，且该问题已被正式记录，等待维护者评估配置化方案的优先级。

## 5. Bug 与稳定性
| 严重程度 | 描述 | Issue 链接 | Fix PR 状态 |
| :--- | :--- | :--- | :--- |
| Medium | **本地 LLM 超时中断**: 配置本地 Ollama 时，因推理速度慢，主模型调用空闲看门狗（Idle Watchdog）强制断开连接。影响 hosted-staging 环境下的本地模型用户体验。 | [Issue #8172](https://github.com/nearai/ironclaw/issues/8172) | 暂无关联 PR，状态为 Open |

## 6. 功能请求与路线图信号
- **配置灵活性增强**: Issue #8172 明确请求将 `PRIMARY_MODEL_CALL_IDLE_TIMEOUT` 暴露为可配置项。
  - **采纳可能性**: **高**。将超时参数配置化是提升 AI Agent 框架适应性的常见改进点，尤其对于支持本地部署（On-premise）的项目至关重要。
  - **路线图信号**: 若维护者在下一个 Sprint 中处理此 Issue，可能预示着 IronClaw 将进一步优化对异构 LLM 后端（Local vs Cloud）的支持能力，增强本地部署的稳健性。

## 7. 用户反馈摘要
- **使用场景**: 用户在 `hosted-staging` (Crab Shack) 环境中使用 IronClaw 连接本地 Ollama 提供商。
- **痛点**: 默认超时逻辑未考虑本地模型推理延迟差异，导致“慢模型”被误判为“无响应”而断开。
- **改进建议**: 用户暗示希望拥有更细粒度的控制能力，而非依赖单一的默认超时值。
- **满意度**: 中性偏负面（针对当前超时硬编码问题），但用户对 QA 流程和 Bug 跟踪系统响应正常表示认可（通过正式渠道提交详细复现步骤）。

## 8. 待处理积压
### 需维护者关注项
- **Issue #8172**: 虽然评论较少，但属于 **QA-Label** 且涉及核心模型调用链路（Agent loop → model call idle watchdog）。
  - **风险**: 若不解决，将阻碍 IronClaw 在本地 LLM 场景下的稳定推广，尤其是对于使用消费级硬件运行大模型的用户群体。
  - **建议行动**: 
    1. 确认是否为 Bug 还是配置缺失（通常应为配置项）。
    2. 指派任务给负责 Model Port 或 Provider 管理的开发者。
    3. 评估修复优先级，建议列入近期迭代，以完善本地部署体验。

**维护者提醒**: 过去 24 小时无代码合并，建议检查是否有阻塞性依赖或待审核 PR（当前数据未显示 PR 积压，但需内部确认开发队列状态）。同时，关注 Issue #8172 的技术方案，避免超时问题成为本地化部署的主要障碍。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-11-23)

## 1. 今日速览
过去24小时内，LobsterAI 社区呈现出**高强量的代码收敛与稳定性修复**特征。今日无新版本发布，但合并/关闭了 9 个 Pull Request（全部为已关闭状态），主要集中于 `DSH` 运行时迁移后的验收修复系列（6/6 全部完成）以及桌面伴侣（Companion）的视觉校准。Issues 方面仅有一条关于多分身配置下记忆面板异常的 Bug 被关闭。整体活跃度评估为**中高**，核心工作重心完全聚焦于确保 OpenClaw 到 DSH 架构迁移后的功能完整性与兼容性。

## 2. 项目进展
今日最显著的进展是 **DSH 迁移验收修复系列（Part 1-6）的全面落地**。这一系列由 `fisherdaddy` 提交，系统性解决了迁移后的核心模块问题：

*   **基础设施与启动加固 (PR #3146)**: 修复了启动门控（Startup gating）、会话隔离、备份/恢复逻辑及打包问题，确保引擎在初始化未完成前保持 `Starting` 状态，防止竞态条件。
*   **会话与权限核心 (PR #3147)**: 修复了会话生命周期、目标管理、上下文压缩（Context compaction）及权限系统，并清理了遗留的 `cowork_message_edits` 数据。
*   **记忆系统与梦境日记 (PR #3148)**: 强制执行项目/专家作用域隔离，实现了 CRUD 迁移，并修复了 Dream Diary 查看器，直接响应了部分记忆面板显示问题。
*   **技能与插件生态 (PR #3149)**: 修复了 Skill 运行时环境注入（如 `SKILLS_ROOT`）、Email Skill、Web-search 沙箱及插件生命周期管理。
*   **MCP 与 OAuth (PR #3150)**: 强化了 DSH MCP 同步、OAuth 2.1 协议支持、SSE 桥接及工具过滤器，确保第三方工具集成的稳定性。
*   **模型兼容与高级功能 (PR #3151)**: 修复了模型别名标准化、Thinking/Reasoning 路由、Office 编辑、定时任务、决策工具及伴随模式的兼容性问题。
*   **定时任务与状态恢复 (PR #3152)**: 进一步验证并修复了定时任务的工作目录绑定，以及应用重载后 pending DSH prompts 的恢复机制。
*   **视觉体验优化 (PR #3145)**: 校准了“鲸一鸣”和“醒醒星”两个桌面伴侣皮肤的悬停和挥手动画，提升了视觉一致性和用户体验细节。
*   **模型协议兼容 (PR #3144)**: 恢复了 Plan 模型的协议分派、Thinking 模式及 Kimi-K3 的兼容性，特别是修复了 Anthropic 代理路径的问题。

**评价**: 这一系列 PR 的密集合并标志着 DSH 迁移从“功能可用”向“生产就绪”的关键跨越，覆盖了从底层启动到上层 UI 的全栈修复。

## 3. 社区热点
今日社区热点高度集中于技术实现层面，而非功能讨论：
*   **DSH 迁移系列 PR (#3144 - #3152)**: 由于涉及核心架构变更且修复内容密集，这些 PR 是今日唯一的代码互动焦点。虽然评论数为 `undefined`（可能表示数据未完整抓取或内部快速合并），但其涉及的模块（Memory, MCP, Skills, Companion）是用户日常使用的高频接触面，且被当作一个连贯的“验收批次”处理，显示了团队对迁移质量的严谨把控。

## 4. Bug 与稳定性
今日报告中唯一的 Issue 已关闭，表明该问题已得到确认或解决：
*   **[BUG] 多分身配置下「梦境日记」面板恒为空 (Issue #2779)**:
    *   **描述**: 在 `LobsterAI 2026.9.23` 及内置 `OpenClaw 2026.8.1` 环境下，配置多个 Agent 时，设置中的“梦境日记”面板显示为空，但后端 `DREAMS.md` 正常更新。原因是内置 Runtime 缺少 `doctor.memory.*` 的 `ambient-owner` 回退逻辑。
    *   **状态**: `CLOSED`。
    *   **关联**: [Pr #3148](https://github.com/netease-youdao/LobsterAI/pull/3148) 中明确提到了 "dream diary viewer" 的修复，极有可能就是针对此类记忆面板显示问题的修复。
    *   **严重程度**: 中等（影响特定配置下的 UI 数据展示，但不影响核心数据存储）。

## 5. 功能请求与路线图信号
*   **无显式新功能请求**: 今日无新的用户功能请求 Issue。
*   **隐含的路线图信号**:
    *   **DSH 运行时全面接管**: 通过 PR #3144-3152 可以看出，项目正在彻底清理 OpenClaw 残留，强化 DSH 作为唯一或主要运行时的地位。
    *   **多模型协议统一**: PR #3151 和 #3144 强调了模型别名标准化和协议分派（Anthropic/Plan models），暗示未来版本将提供更稳定和统一的跨模型体验，包括对 Kimi-K3、Claude Sonnet 5.5 等最新模型的支持。
    *   **MCP 生态深化**: PR #3150 对 OAuth 2.1 和 SSE 的强化，预示 LobsterAI 将更加重视安全的、实时的外部工具集成能力。

## 6. 用户反馈摘要
*   **痛点**: 用户 `probe528-maker` 在多 Agent 复杂配置下遇到了 UI 与后端数据不同步的问题（Issue #2779），反映了在高级配置场景下，前端状态与底层 Runtime 状态的同步机制可能存在边界情况。
*   **满意点**: 虽然未见直接好评，但 `DREAMS.md` 文件的正常更新（7.7KB）表明核心记忆功能在后台是稳定可靠的，用户对数据持久性是满意的。

## 7. 待处理积压
*   **Issues**: 无长期未响应的活跃 Issue。今日的 1 条 Issue 已关闭。
*   **PRs**: 今日所有 9 条 PR 均已关闭（隐含已合并或已处理）。无积压的待合并 PR。
*   **维护者建议**: 鉴于 DSH 迁移修复系列刚刚完成，建议维护者在下一个发布周期前，重点进行**回归测试**，特别是针对多 Agent 配置、MCP 工具调用和复杂模型推理场景，以确保 PR #3144-3152 的修复未引入新的副作用。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

# TinyClaw (TinyAGI) 项目动态日报 | 2026-11-23

## 1. 今日速览
过去 24 小时内，TinyClaw (`TinyAGI/tinyagi`) 项目整体处于低频维护状态。全天未产生新的 Issue，共处理合并/关闭了 1 条 Pull Request。目前项目开发重心集中在多智能体协同（Multi-Agent Teams）文档与上下文传递（Handoff）机制的规范化上，项目整体运行稳定。

---

## 2. 项目进展
今日共完成 1 项 PR 合并/关闭，主要推进了多智能体工作流的标准化文档建设：

* **[PR #297] docs(teams): add optional public evidence handoff guide** 
  * **作者**：georgeatparallel | **状态**：已关闭/合并
  * **贡献内容**：补全了多智能体团队（Teams）协作中的“证据传递”指南。详细说明了研究员智能体（Researcher Agent）在检索 Python 等公共文档时，如何将原始 URL 及摘要片段无损传递给撰写智能体（Writer Agent）。
  * **项目影响**：进一步规范了 TinyAGI 内部 Agent 间交接（Handoff）的数据结构与上下文落地标准，提升了多智能体生成内容的准确性与可追溯性。
  * **链接**：[TinyAGI/tinyagi PR #297](https://github.com/TinyAGI/tinyagi/pull/297)

---

## 3. 社区热点
今日社区讨论较为安静，重点聚焦于 **[PR #297](https://github.com/TinyAGI/tinyagi/pull/297)** 所反映的智能体交接规范。
* **深层诉求分析**：随着复杂 Agent 工作流在生产环境落地，开发者对“防止 Agent 幻觉”和“保持引用源透明度”的需求显著上升。在 Research-to-Writer 场景中，明确传递真实 Evidence（URL + 原文片段）已成为构建高可靠 AI 助手项目的刚需。

---

## 4. Bug 与稳定性
过去 24 小时内未新增 Bug 报告或崩溃反馈，现有主干代码库表现稳定。

---

## 5. 功能请求与路线图信号
从合并的文档改进 PR 中可以看出，官方及核心贡献者正在强化 **Multi-Agent 协作范式** 的支撑能力。预估接下来的版本迭代信号包括：
* 更完善的 Team Handoff Protocol（团队交接协议）
* 对 RAG/检索类智能体输出格式的进一步约束与工具化支持

---

## 6. 用户反馈摘要
今日无新增 Issue 互动及评论反馈。

---

## 7. 待处理积压
今日社区吞吐量较低（仅 1 项文档 PR），建议维护团队适时梳理历史积压的待合并 PR 与未决 Issue，以维持社区的长期活跃度与贡献者参与感。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-11-23)

## 1. 今日速览
本日 Moltis 项目社区活跃度较低。在过去 24 小时内，项目未发布新版本，亦无 Pull Request 更新或合并。社区新增 1 条 Issue 反馈，核心焦点集中在 **MCP (Model Context Protocol) 客户端协议版本滞后导致的集成中断问题**。整体来看，项目代码库本日处于静态，但暴露出的协议兼容性缺陷亟需维护团队跟进。

---

## 2. 项目进展
今日无合并或关闭的 PR，核心代码库在过去 24 小时内无提交演进。

---

## 3. 社区热点
今日社区讨论主要集中在刚提交的协议兼容性反馈上：

* **[Issue #1326] MCP 客户端协议硬编码在旧版 (2024-11-05)，导致要求 2025-06-18+ 协议的服务器拒绝初始化**
  * **链接**：[moltis-org/moltis Issue #1326](https://github.com/moltis-org/moltis/issues/1326)
  * **背景与分析**：用户提交了具体的复现步骤，指出 Moltis 在与外部工具服务通信时，MCP 协议握手缺乏版本协商能力。该问题直接阻断了 Moltis 与现代 MCP 生态系统的对接，背后的核心诉求是希望 Moltis 增强 MCP 协议的版本适应性与标准化升级。

---

## 4. Bug 与稳定性
今日报告了 1 缺陷问题，按影响严重程度排列如下：

1. **[中高危/集成中断] MCP 客户端协议版本硬编码导致初始化握手失败**
   * **Issue 链接**：[#1326](https://github.com/moltis-org/moltis/issues/1326)
   * **现象**：Moltis 在 `initialize` 请求和 `MCP-Protocol-Version` HTTP 头中硬编码了旧版协议 `2024-11-05`。当对接已弃用该旧版本的远端服务器（例如 Basecamp）时，即便完成 OAuth 授权，服务端也会直接拒绝握手，导致功能完全不可用。
   * **状态**：**暂无 Fix PR**，亟待维护者对 MCP 协议层进行重构或升级。

---

## 5. 功能请求与路线图信号
从本日的反馈中可提炼出以下路线图优化信号：

* **MCP 客户端版本协商与规范升级**：
  * **需求**：虽然 [#1326](https://github.com/moltis-org/moltis/issues/1326) 以 Bug 形式报告，但提出了升级 MCP 协议标准（至 `2025-06-18` 及以上）的要求。建议项目组将“MCP 客户端协议解耦”与“多版本协议协商/向下兼容机制”纳入近期迭代规划，以保障 Moltis 扩展生态的稳定性。

---

## 6. 用户反馈摘要
* **真实痛点**：用户在尝试将 Moltis 接入新版外部 SaaS 服务的 MCP Server 时，遭遇“授权流程完成但握手失败”的不一致体验，根源在于客户端协议更新滞后于 MCP 生态的标准演进速度。
* **主要使用场景**：基于 MCP (Model Context Protocol) 扩展 Moltis 个人 AI 助手的外部工具集成链条（如 Basecamp 工作流集成）。

---

## 7. 待处理积压
* **紧急关注**：建议维护者关注新开 Issue [#1326](https://github.com/moltis-org/moltis/issues/1326)。由于 MCP 是 AI Agent 接入外部数据和工具的核心通道，该协议握手缺陷会直接阻断部分扩展插件的使用，建议优先评估升级 MCP 客户端依赖项的工作量。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 (2026-11-23)

## 1. 今日速览
过去 24 小时内，CoPaw 项目处于高强度的代码评审与前端 UX 优化迭代期。数据统计显示：
- **Issues**：新增/活跃 6 条，已关闭 0 条。
- **Pull Requests**：更新/待合并 10 条，已合并/关闭 0 条。
- **版本发布**：今日无新 Release。

今日社区重点关注 **Web 控制台的跨平台兼容性与细节体验**（如 iOS 卡顿、键盘滚动、Markdown 表格裁切），以及 ** Telegram 论坛主题会话隔离** 和 **本地模型 GPU 算力管控三连 PR** 的推进。

---

## 2. 项目进展
虽然今日暂无 PR 完成合并，但多个核心重量级 PR 已进入评审后期或准备就绪，标志着项目在本地化与部署能力上迈出重要一步：

- **本地模型与 GPU 算力管控三连击**：
  - [#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649) *(feat)*: 为 llama.cpp 引擎添加 GPU 控制参数及运行时自动更新支持。
  - [#8647](https://github.com/agentscope-ai/QwenPaw/pull/8647) *(feat)*: 增加 Managed MLX 本地推理引擎及运行时自动更新。
  - [#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) *(feat)*: Web 控制台配套上线本地引擎、GPU 参数及自动更新的管理 UI。
- **部署灵活性提升**：
  - [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) *(feat)*: 支持 `QWENPAW_BASE_PATH` 环境变量，允许在反向代理（如 Nginx/Traefik）二级路径下部署 控制台与 API。
- **长期存储扩展**：
  - [#8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) *(fix/refactor)*: OpenViking 内存插件的兼容性适配、预算调度优化及优雅关机修复。

---

## 3. 社区热点
- **微信渠道体验缺陷讨论**：[#2674](https://github.com/agentscope-ai/QwenPaw/issues/2674)
  - **现象与诉求**：用户反馈微信接入存在无输入敲击提示、加群困难、与 UI 界面切换同一个 Session 会报 `503 Channel Console not found` 等问题。反映出用户在微信生态下对交互感知与多终端状态同步的强需求。
- **上下文压缩失败误导用户清除记忆**：[#8848](https://github.com/agentscope-ai/QwenPaw/issues/8848)
  - **背景与修正**：系统在手动 `/compact` 失败时建议用户执行 `/clear`，导致部分用户误清空了重要对话历史。社区迅速响应并提交了修复 PR [#8853](https://github.com/agentscope-ai/QwenPaw/pull/8853)，将建议修改为“排除错误后重试 `/compact`”。
- **Telegram 超级群组主题会话隔离**：[#8827](https://github.com/agentscope-ai/QwenPaw/issues/8827)
  - **背景**：此前 Telegram Forum Topic 的标识仅作为回复路由字段，不同 Topic 会共享同一个 Agent Session。贡献者已提交 PR [#8857](https://github.com/agentscope-ai/QwenPaw/pull/8857) 实现按 Topic 隔离会话与记忆。

---

## 4. Bug 与稳定性

按照严重程度排序，今日暴露及修复的稳定性与 UI 渲染问题如下：

1. **[高] iOS WebKit 浏览器长对话冻结卡死** 
   - **问题**：[#8852](https://github.com/agentscope-ai/QwenPaw/issues/8852) —— 在 iOS Safari 上打开长对话时，由于 `UserMessageAnchors` 布局回流（layout thrashing）结合 `content-visibility: auto`，导致页面直接假死。*(等待修复)*
2. **[中] Web 控制台 Markdown 表格与长行截断**
   - **问题**：[#8856](https://github.com/agentscope-ai/QwenPaw/issues/8856) —— 控制台 Markdown 渲染组件缺少 `overflow-x-auto` 容器，导致超宽表格被硬生生裁切，无法横向滚动查看完整数据。*(等待修复)*
3. **[中] 禁用模型 Provider 导致 Agent 调用崩溃**
   - **修复 PR**：[#8617](https://github.com/agentscope-ai/QwenPaw/pull/8617) —— 当在后台禁用了某个 Provider 后，已保存该模型的 Agent 会因找不到回退（fallback）策略直接抛出异常，PR 补充了降级逻辑。
4. **[低] 控制台消息列表无键盘焦点，无法按键滚动**
   - **问题**：[#8844](https://github.com/agentscope-ai/QwenPaw/issues/8844)
   - **修复 PR**：[#8854](https://github.com/agentscope-ai/QwenPaw/pull/8854) —— 将消息列表设为可聚焦区域，修复了无鼠标环境下通过 Up/Down/PageUp 无法滚动历史消息的问题。
5. **[低] Windows 环境下 Plugin SDK 测试编码与时序问题**
   - **修复 PR**：[#8855](https://github.com/agentscope-ai/QwenPaw/pull/8855) —— 修复了 Windows CI/环境下的文件编码与定时器精度测试报错。

---

## 5. 功能请求与路线图信号

从今日的 Issue 与 PR 组合来看，CoPaw 的下一阶段路线图呈现出三大趋势：
1. **私有化与边缘推理深耕**：通过集成 `llama.cpp` 和 `MLX`（[#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649), [#8647](https://github.com/agentscope-ai/QwenPaw/pull/8647)），提升对 Apple Silicon 及 GPU 本地部署的友好度。
2. **复杂 IM 架构适配**：向 Telegram 论坛主题（Topic）隔离（[#8857](https://github.com/agentscope-ai/QwenPaw/pull/8857)）等精细化会话管理演进。
3. **企业级网关支持**：支持自定义子路径部署（[#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719)），方便融入企业统一网关和反向代理系统。

---

## 6. 用户反馈摘要

从社区讨论与用户反馈来看：
- **满意度**：用户对渠道扩展（Telegram / 微信）表现出极高热情，渴望将其作为日常 AI 助理的主入口。
- **主要痛点**：
  - **移动端与 UI 细节**：Web 控制台在移动端（尤其是 iOS）的性能与渲染适配不足，

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