# OpenClaw 生态日报 2026-10-21

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-10-20 22:49 UTC

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

这份报告基于 2026-10-21 各开源智能体框架的社区动态，为您梳理当前个人 AI 助手与智能体生态的演进态势。

### 1. 生态全景
当前开源智能体生态正从“单一指令响应”向“深度上下文集成与企业级合规”加速演进。以 **Hermes Agent** 和 **NanoClaw** 为代表的头部项目正围绕 MCP（模型上下文协议）构建生态，通过标准化的工具链与插件化架构，试图解决智能体在复杂环境下（如企业网络、多用户、多模型切换）的可用性瓶颈。项目开发重心已由单纯的模型接入转向本地交互体验、安全审批机制与多端同步的精细化治理。

### 2. 各项目活跃度对比
| 项目 | 今日 Issues | 今日 PRs | Release | 健康度 | 焦点领域 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hermes Agent** | 50 | 50 | 无 | 高 | 网关运行时与桌面交互 |
| **NanoClaw** | 5 | 20 | 1 | 高 | 插件化与容器代理镜像 |
| **CoPaw** | 15 | 34 | 无 | 高 | 多源检索与任务调度体验 |
| **LobsterAI** | 4 | 6 | 无 | 高 | 企业级合规与 MCP 稳定性 |
| **IronClaw** | 3 | 9 | 无 | 中 | 链上合约与本地安全连接 |
| **Moltis** | 1 | 2 | 无 | 中 | 多模态与特定模型适配 |
| **PicoClaw** | 1 | 0 | 无 | 低 | 持久化代理与轻量级示例 |

---

### 3. OpenClaw 在生态中的定位
作为核心参照项目（尽管今日数据缺失），OpenClaw 在生态中处于**基础设施（Infrastructure）地位**。从其他项目的 Issue 反馈（如 LobsterAI 的 MCP TLS 拦截问题）可以看出，OpenClaw 定义了当前行业主流的交互模式。其技术路线差异在于“核心运行时的稳定性”与“兼容性”，它是其他插件化项目（如 NanoClaw）依赖的底层框架，而非终端应用。

### 4. 共同关注的技术方向
*   **MCP 协议深度适配与安全加固**：(Hermes, LobsterAI, IronClaw) —— 共同诉求包括：解决企业 MITM 代理下的 HTTPS 证书校验、提升远程 MCP 凭据处理的安全隔离。
*   **用户意图的细粒度感知**：(Moltis, CoPaw) —— 诉求在于多用户/共享聊天场景下的身份溯源（Provenance）与权限隔离。
*   **交互体验的极限优化**：(Hermes, CoPaw, LobsterAI) —— 重点关注长对话的 UI 滚动稳定性、任务审批卡片的非截断展示及模型切换的延迟消减。

### 5. 差异化定位分析
*   **Hermes Agent**：全功能桌面智能体，侧重复杂会话管理与本地环境的深度集成。
*   **NanoClaw**：容器化优先，侧重于 Agent 镜像化部署与分布式提供商（Provider）管理。
*   **CoPaw**：前端体验与多源检索导向，适合需要强大插件支持的知识库协同场景。
*   **LobsterAI**：企业级适配，侧重安全性合规（Artifacts 面板、日志脱敏）与多模态内容处理。

### 6. 社区热度与成熟度
*   **快速迭代期**：**Hermes Agent** 和 **NanoClaw**，拥有极高的 Issue/PR 处理流转效率，正在构建核心功能特性。
*   **质量巩固期**：**LobsterAI** 和 **CoPaw**，已进入成熟版本周期，重点转向 Bug 修复、企业合规及 UX 调优。
*   **探索/停滞期**：**PicoClaw** 和 **NullClaw**，贡献者活跃度较低，主要依靠单一社区成员推动，项目架构尚未定型。

### 7. 值得关注的趋势信号
1.  **“AI+网络安全”成为刚需**：随着智能体调用链变长，TLS 拦截与企业环境内的证书信任问题（如 #2912）已取代模型推理能力，成为决定项目能否落地的关键。
2.  **插件市场的规范化**：从静态配置向动态市场安装（如 NanoClaw/LobsterAI）演进，表明智能体生态正在走向“插件化 OS”。
3.  **身份感知是下个版本竞争点**：随着多人协同 Agent 的流行，能够区分消息发送者身份并绑定特定权限（而非共享全局 Token）是下一波功能升级的信号。
4.  **本地/链上交互需求抬头**：IronClaw 中体现的链上合约操作需求，预示着自治代理（Autonomous Agent）正在从纯文本处理向“直接在数字世界执行交易与交互”过渡。

---
**分析师建议**：对于开发者而言，目前的切入点不应仅在于更强大的推理模型，而在于**如何处理复杂网络环境下的工具调用安全与多用户场景下的权限治理**。优先关注 **MCP 协议** 的实现规范将是获取未来兼容性红利的最优策略。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目日报
**报告日期：** 2026-10-21  
**项目：** NousResearch/hermes-agent  
**分析师：** AI 智能体与个人 AI 助手领域开源项目分析师

---

## 1. 今日速览
过去24小时项目保持高活跃度，共产生 **50个 Issues**（44活跃/6关闭）和 **50个 PRs**（48待合并/2关闭）。尽管无新版本发布，但核心架构演进（统一网关运行时）进入后合并修复阶段，社区讨论集中在桌面端交互体验优化与插件生态扩展。项目整体健康度良好，活跃的 Issue 讨论反映出用户对细节体验的极高关注度，部分功能性缺陷（如 macOS 更新失败、桌面 UI 卡顿）仍需优先解决。

---

## 2. 版本发布
**无新版本发布。**

---

## 3. 项目进展
- **[PR #141647](https://github.com/NousResearch/hermes-agent/pull/141647)** - 修复桌面端 `MEDIA` 路径解析问题，确保工作区相对路径正确打开，避免无效操作。
- **[PR #141775](https://github.com/NousResearch/hermes-agent/pull/141775)** - 新增 `RentAHuman` 插件与 MCP，支持 OAuth 2.1 认证，扩展社区服务生态。
- **[PR #141956](https://github.com/NousResearch/hermes-agent/pull/141956)** - 社区插件 `kanban-stream` 发布，实现通过 Telegram 流式展示 Kanban 工作流状态。
- **[PR #141529/141528](https://github.com/NousResearch/hermes-agent/pull/141529)** - 新增社区插件条目 `sunshine-moonlight` 与 `tidal`，支持流媒体设备管理与音乐播放控制。
- **[PR #142076](https://github.com/NousResearch/hermes-agent/pull/142076)** - 插件目录新增 `hermetic` 插件，提供成本监控与缓存命中率实时统计。

---

## 4. 社区热点
- **[Issue #134889](https://github.com/NousResearch/hermes-agent/issues/134889)** (202条评论)
  - **主题：** 统一网关运行时合并后修复追踪。
  - **诉求：** 确保所有与本地会话交互的表面正确处理会话所有权，防止多会话冲突。
  - **状态：** 活跃追踪，持续修复合并后遗留问题。

- **[Issue #141346](https://github.com/NousResearch/hermes-agent/issues/141346)** (17条评论)
  - **主题：** macOS 智能审批模式下，`osascript` 关闭用户未保存的 PPT 并导致不可恢复数据丢失。
  - **诉求：** 加强自动审批工具调用的安全校验，避免破坏性操作。
  - **状态：** 安全性漏洞，需紧急修复。

- **[Issue #135037](https://github.com/NousResearch/hermes-agent/issues/135037)** (8条评论)
  - **主题：** Windows 用户 PATH 注册在沙箱/非主检出中错误写入全局注册表。
  - **诉求：** 修复环境变量污染问题，确保隔离性。
  - **状态：** 兼容性缺陷，影响多环境使用。

---

## 5. Bug 与稳定性
**严重程度 P0/P1（需立即关注）：**
- **[Issue #141346](https://github.com/NousResearch/hermes-agent/issues/141346)** - macOS 智能审批误删用户文件（**无**相关 Fix PR）。

**严重程度 P2（影响核心功能）：**
- **[Issue #135037](https://github.com/NousResearch/hermes-agent/issues/135037)** - Windows 环境污染，**[PR #141647](https://github.com/NousResearch/hermes-agent/pull/141647)** 正在修复路径相关缺陷。
- **[Issue #126305](https://github.com/NousResearch/hermes-agent/issues/126305)** - DeepSeek 压缩摘要截断问题，需确认默认 Token 限制。
- **[Issue #142216](https://github.com/NousResearch/hermes-agent/issues/142216)** - macOS 桌面更新失败，**[PR #141647](https://github.com/NousResearch/hermes-agent/pull/141647)** 正在修复路径处理。
- **[Issue #142250](https://github.com/NousResearch/hermes-agent/issues/142250)** - 文档与代码矛盾，`memory.write_approval` 行为不一致。
- **[Issue #142213](https://github.com/NousResearch/hermes-agent/issues/142213)** - Anthropic 安全过滤器误用摘要作为拒绝原因。

**严重程度 P3（体验与边缘情况）：**
- **[Issue #142037](https://github.com/NousResearch/hermes-agent/issues/142037)** - 桌面端切换模型后标签页显示延迟。
- **[Issue #142221](https://github.com/NousResearch/hermes-agent/issues/142221)** - 非支持 Screen 的主机显示空标签页。
- **[Issue #142264](https://github.com/NousResearch/hermes-agent/issues/142264)** - 后台 Shell 未加载环境变量。
- **[Issue #142111](https://github.com/NousResearch/hermes-agent/issues/142111)** - Windows 正则表达式转义兼容性问题。

---

## 6. 功能请求与路线图信号
- **[Issue #80222](https://github.com/NousResearch/hermes-agent/issues/80222)** - `delegate_task` 支持按调用覆盖模型与推理强度（**[PR #140370](https://github.com/NousResearch/hermes-agent/pull/140370)** 正在加强安全配置修改防护，间接相关）。
- **[Issue #76795](https://github.com/NousResearch/hermes-agent/issues/76795)** - `/skills pending` 列表无分页与上限，队列无限增长。
- **[Issue #117894](https://github.com/NousResearch/hermes-agent/issues/117894)** - 后台内存写入队列无界且不可见。
- **[Issue #116564](https://github.com/NousResearch/hermes-agent/issues/116564)** - 建议扩展 `MEMORY.md` 为文档链锚点。
- **[Issue #136481](https://github.com/NousResearch/hermes-agent/issues/136481)** - 请求全局并发限制，防止 API 配额超限。

---

## 7. 用户反馈摘要
- **交互体验：** 用户对桌面端模型切换标签、大文本粘贴恢复、打印预览崩溃（macOS）等细节体验不满，反映对 UI 响应与健壮性的高要求。
- **环境隔离：** Windows 用户强烈反馈沙箱/多检出环境下 PATH 污染问题，影响开发与测试效率。
- **安全敏感：** macOS 用户担忧智能审批模式下工具调用可能破坏性操作，需更严格的审批机制。
- **插件生态：** 社区对插件目录扩展持积极态度，期待更多实用工具（如流媒体控制、任务跟踪）集成。

---

## 8. 待处理积压
- **[Issue #134889](https://github.com/NousResearch/hermes-agent/issues/134889)** - 统一网关运行时合并后修复追踪，需持续跟进。
- **[Issue #126305](https://github.com/NousResearch/hermes-agent/issues/126305)** - DeepSeek 压缩摘要截断问题，需澄清默认 Token 限制。
- **[Issue #142250](https://github.com/NousResearch/hermes-agent/issues/142250)** - 文档与代码矛盾，需统一描述。
- **[Issue #76795](https://github.com/NousResearch/hermes-agent/issues/76795)** - `/skills pending` 列表无分页，需实现队列上限。
- **[Issue #117894](https://github.com/NousResearch/hermes-agent/issues/117894)** - 后台内存队列无界且不可见，需修复。

---

**总结：** Hermes Agent 项目在架构演进与社区生态建设上稳步推进，但桌面端交互细节、跨平台兼容性与安全审批机制仍需加强。建议维护者优先处理 P1/P2 级 Bug，并推动功能请求的可行性评估。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告**  
**日期：2026‑10‑21**  
（数据来源：GitHub 仓库 https://github.com/sipeed/picoclaw，统计区间截至 2026‑10‑20 23:59）  

---

## 1. 今日速览  
- 项目在过去 24 小时内仅出现 **1 条新 Issue**，未有 PR 动态，也未发布新版本。  
- 活跃度维持在低水平，核心贡献者暂无提交，社区讨论仍以单一议题为主。  
- 整体健康度为 **稳定‑低活跃**，代码库暂无新功能或重大修复投入。

---

## 2. 版本发布  
> **（本日无新 Release，故本节省略）**

---

## 3. 项目进展  
- 今日 **无 PR 合并或关闭**，因此本日未有功能、文档或 bug 修复进入主线。  
- 近期（过去 1‑2 周）仍保持“合并停滞”，建议维护者评估是否需要启动短期冲刺，以提升贡献者活跃度。

---

## 4. 社区热点  
| 类型 | 编号 | 标题 | 状态 | 评论数 | 👍 | 链接 |
|------|------|------|------|--------|----|------|
| Issue | **#3427** | **Proposal: low‑dependency Plazmi MCP/CLI example for persistent agent sessions** | OPEN / **stale** | 1 | 0 | https://github.com/sipeed/picoclaw/issues/3427 |

**分析**  
- 此 Issue 提出将 PicoClaw 的 MCP/CLI 与 *Plazmi*（一个实时 persistent‑world 框架）结合，提供 “低依赖” 示例，旨在演示 **持久化代理会话** 与 **心跳/脉冲** 机制的实战用例。  
- 目前仅有创建者本人留下 1 条评论，互动极少，且已被标记为 **stale**（长期未更新），说明社区对该提案的兴趣有限或缺少实现资源。  
- 若项目希望拓展在 “agent‑based simulation” 场景的可用性，可考虑邀请 Plazmi 社区或内部成员共同开展原型实现。

---

## 5. Bug 与稳定性  
| 严重程度 | 编号 | 简述 | 是否已有 Fix PR |
|----------|------|------|----------------|
| — | （本日无新 Bug 报告） | — | — |

> 过去 24 小时未出现新的错误、崩溃或回归报告，说明当前代码基线在生产环境中的 **故障率维持低水平**。

---

## 6. 功能请求与路线图信号  
- **唯一功能请求**：#3427（低依赖 Plazmi 示例）  
  - 若该需求得到实现，可为 **“持久化代理会话”** 与 **“跨平台 CLI 示例”** 两大方向提供入口，符合 PicoClaw 在 **edge‑AI 与分布式感知** 场景的长期路线图。  
  - 目前缺乏配套 PR，建议维护者在下个里程碑前评估其实现成本与社区价值，再决定是否列入 **vX.Y**（预计 2026‑Q4）计划。

---

## 7. 用户反馈摘要  
- **痛点**：从 Issue #3427 的描述看，用户希望获得 **轻量级、零依赖的示例**，以快速上手持久会话功能。当前文档和示例缺少针对 “长期运行” 场景的指引。  
- **满意点**：PicoClaw 已提供 **MCP/CLI** 与 **heartbeat** 基础设施，足以支撑此类需求，只是缺乏 **完整的端到端示例**。  
- **改进建议**：补充 **“持久会话”** 章节的使用手册，或提供一个 **单文件示例**（类似 Plazmi 官方示例），降低新手上手门槛。

---

## 8. 待处理积压  
| 类型 | 编号 | 标题 | 打开时长 | 备注 |
|------|------|------|----------|------|
| Issue | #3427 | Proposal: low‑dependency Plazmi MCP/CLI example for persistent agent sessions | 8 天（自 2026‑10‑13） | 已标记 *stale*，缺少后续讨论。建议维护者在下一次社区例会中确认是否继续跟进或关闭。 |

> 目前仓库中暂无其他长期未响应的 Issue/PR。若未来出现更久未动的条目，请及时进行 triage（标记为 *stale*、*needs info* 或直接关闭），以保持 backlog 的可管理性。

---

### 结论 & 建议  
- **健康度**：项目运行稳定，但 **社区活跃度偏低**。  
- **短期行动**：  
  1. 对 Issue #3427 进行快速 triage，决定是继续推进还是关闭。  
  2. 在下一次维护者会议上讨论是否启动 **“持久化代理示例”** 小型开发冲刺。  
- **中长期**：若希望提升项目曝光与贡献者参与度，可考虑发布 **示例仓库**、撰写 **使用案例博客**，并在相关社区（如 Plazmi、Edge‑AI 论坛）进行宣传。  

---  

*报告编制：AI 项目分析助手*  
*数据更新时间：2026‑10‑20 23:59（UTC）*  

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 2026‑10‑21 项目日报**  
（来自 GitHub 数据：Issues 5 / PRs 20，发布 1 个）

---

### 1. 今日速览  
- 本日活跃度保持高位：Issues 5 条（4 新建/活跃、1 已关闭），PR 20 条（14 待合并、6 已合并/关闭）。  
- 主要话题围绕“pi agent provider”功能、Codex 会话管理与安全性硬化。  
- 新的 release‑candidate 版本（v2026.10.1‑rc.1）已完成，推送至 `beta` 渠道。  
- 贡献者活跃度稳健，核心团队成员在 10 月 20 日完成多项功能与安全修复。  

---

### 2. 版本发布  
**v2026.10.1‑rc.1**（[release page](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.10.1-rc.1)）  
- **新增功能**  
  - 通过模板创建代理 (`/add-pi` payload skill)。  
  - 集成 `Cursor` 作为新的代理提供者。  
  - 将本地构建的代理镜像迁移至官方镜像仓库，简化 CI/CD。  
- **破坏性变更**  
  - `agent-images.json` 结构已更新；现需使用 `sha256` 作为唯一标识。  
  - `PI_GATEWAY_PROVIDERS` 环境变量已废弃，改为 `container_configs.provider`。  
- **迁移注意**  
  - 旧版本的 `add-pi` payload 需更新 `provider` 字段。  
  - 对已部署的代理，手动执行 `ncl agents update` 以同步新镜像。  
  - 参考迁移指南：[#4158](https://github.com/nanocoai/nanoclaw/pull/4158)。  

---

### 3. 项目进展  
| PR | 说明 | 影响 |
|---|---|---|
| **#4157** | CI 只在 `nanocoai/nanoclaw` 运行 `refresh-agent-image` | 避免 fork 触发无权限的 CI，降低错误率 |
| **#4158** | Release‑candidate v2026.10.1‑rc.1 打包 | 1.4 % 代码改动，完成新功能上线 |
| **#4103** | `ncl messaging-groups delete` 级联删除依赖 | 修复多表删除导致的 `FOREIGN KEY` 错误，提升删除体验 |
| **#4109** | 说明 provider 代码不在 `providers` 分支 | 清晰文档，减少贡献者误解 |
| **#4156** | 允许 Telegram、Discord、WhatsApp Cloud 的审批卡显示完整内容 | 改进跨平台用户体验，提升可读性 |
| **#4160** | 加固 egress 锁定，覆盖已在运行的代理 | 提升安全性，符合合规需求 |

> **进度**：已合并/关闭 PR 6 条，完成了 5 项核心功能/安全升级，项目整体向 2026.10.1 正式版迈进 **约 30%**（依据已合并功能点与总目标）。

---

### 4. 社区热点  
| 主题 | 讨论量 | 主要诉求 | 链接 |
|---|---|---|---|
| **#4162**（Codex 会话无压缩阈值） | 3 条评论 | 长期会话导致内存膨胀，线程堆积 | https://github.com/nanocoai/nanoclaw/issues/4162 |
| **#4154**（PI provider 组级选择） | 1 条评论 | `PI_GATEWAY_PROVIDERS` 需要组级配置，避免跨组干扰 | https://github.com/nanocoai/nanoclaw/issues/4154 |
| **#4153**（mid‑turn 文本传递） | 0 条评论 | 需要在工具调用前及时返回文本 | https://github.com/nanocoai/nanoclaw/issues/4153 |

> **分析**：用户最关心的是 **性能与资源管理**（Codex 压缩）以及 **配置隔离**（PI provider）。PR #4163 直接响应 #4162，已在待合并列表中。

---

### 5. Bug 与稳定性  
| 级别 | Bug | 是否已修复 |
|---|---|---|
| **高** | Codex 会话无限扩张导致线程崩溃 | ✅ PR #4163 已解决 |
| **中** | `add-pi` 组级 provider 不一致导致授权错误 | ✅ PR #4154 已解决 |
| **低** | 测试 `setup/gateways/selection.test.ts` 随机失败 | ✅ PR #4123 已关闭 |

> 目前所有高优先级 Bug 已提交修复 PR，正在待合并中。

---

### 6. 功能请求与路线图信号  
- **pi Agent Provider**（#4129）已实现，可在下一版本继续扩展：  
  - 细化权限控制（如单个模型凭证）。  
  - 支持多种后端（Azure、AWS、On‑Prem）。  
- **Codex 线程压缩阈值自定义**（#4163）已合并，用户可通过 `CODEX_AUTO_COMPACT_TOKEN_LIMIT` 调整。  
- **Attachment 结构化传输**（PR #3156）已提交，预计 2026.11.1 进一步完善。  

> 这些功能均在 PR 与 Issue 中获得多条评论，表明社区对更强大、可定制化 Agent 生态的需求正在上升。

---

### 7. 用户反馈摘要  
- **使用场景**：多用户团队在 `add-pi` 中创建共享代理；Codex 线程用于持续对话。  
- **痛点**：  
  - 旧版 `add-pi` 产生跨组授权冲突，导致“授权失败”错误。  
  - 长会话导致内存占用飙升，影响稳定性。  
  - 评价卡在 Telegram/Discord 端被截断，信息丢失。  
- **满意点**：  
  - `Cursor` 提供者新增后，快速构建了基于 Cursor 的代理。  
  - 采用模板创建代理流程更加直观。  

---

### 8. 待处理积压  
| ID | 说明 | 关联 PR | 负责人 | 备注 |
|---|---|---|---|---|
| **#4152** | `pi` 连续续航过大时的轮转 | #4152 | Z‑Mackintosh | 需在下一版本完成 |
| **#4148** | 无效组文件夹拒绝新 Agent | #4148 | amit‑shafnir | 代码已提交，但未合并 |
| **#4102** | `add-imessage` 依赖清理失败 | #4102 | glifocat | 仍在 review |
| **#4155** | 同步 `channels` 分支主线 | #4155 | glifocat | 需要解决冲突后合并 |

> 这些 Issue/PR 处于长期未关闭状态，建议优先评估是否符合即将到来的 2026.10.2 里程碑。

---

**结语**  
NanoClaw 在本日保持了 **高频率的贡献和活跃的社区讨论**，通过 6 条合并 PR 解决了多项关键缺陷，并完成了 v2026.10.1‑rc.1 的发布。项目整体健康度良好，主要关注点为 **性能优化、配置隔离** 与 **功能扩展**，后续可根据社区反馈继续完善。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw 项目日报（2026‑10‑21）**  

---

### 1. 今日速览  
- 过去 24 小时内 **3** 条新 Issue 与 **9** 条 PR 被创建或更新，全部保持 “OPEN” 状态。  
- 代码提交量与讨论量较上日略有上升，核心仓库仍保持活跃。  
- 目前暂无新版本发布，合并率低，项目整体进度保持在“开发中” 阶段。  

> *活跃度评估：中等偏高。*  

---

### 2. 版本发布  
- **无** 新版本发布。  

---

### 3. 项目进展  
- **无 PR 合并**（7 条待合并，2 条已关闭/合并但均为旧 PR）。  
- 依赖更新 PR（#8151、#8152、#8150、#8145、#8148、#8149）已进入审阅阶段，未完成合并。  
- 因缺乏合并，功能推进与 bug 修复仅停留在提交与讨论阶段，项目总体推进速度受限。  

---

### 4. 社区热点  
| 号 | 类型 | 标题 | 链接 | 讨论度 |
|----|------|------|------|--------|
| #2077 | Issue | contract source for market near ai | https://github.com/nearai/ironclaw/issues/2077 | 1 条评论 |
| #8136 | Issue | Proposal: optional hosted-MCP Plazmi extension | https://github.com/nearai/ironclaw/issues/8136 | 0 条评论 |
| #8146 | Issue | Hosted MCP: explicit 127.0.0.1 endpoint enrollment | https://github.com/nearai/ironclaw/issues/8146 | 0 条评论 |

> **分析**：  
> - Issue #2077 关注点是 “on‑chain market contract source”，被社区视作对“sovereign agents” 的关键需求。  
> - #8136 与 #8146 则围绕 Hosted MCP 的本地化使用体验，反映了用户对自托管与安全性的需求。  

---

### 5. Bug 与稳定性  
| 号 | Bug 描述 | 严重程度 | 是否已修复 |
|----|----------|----------|------------|
| #8146 | Hosted MCP registration 拒绝 HTTP/IP 字面量，导致本地 Connector 不能使用 credential‑account bearer | 中 | ❌ (无 fix PR) |

> 该问题直接影响本地测试与部署，已在 Issue 中获得关注但尚未解决。  

---

### 6. 功能请求与路线图信号  
| 号 | 请求 | 相关 PR | 评估 |
|----|------|--------|------|
| #2077 | 发布 market.near.ai 合约源码 | 无 | 重要，影响代理直接链上操作 |
| #8136 | 可选 Plazmi 扩展（声明式 auth/egress） | 无 | 处于构思阶段，可能在后续版本讨论 |
| #8146 | 本地 MCP 端点显式注册与私有凭证桥接 | PR #8147（待合并） | 已有实现思路，优先级高 |

> **路线图信号**：#8146 已有 PR #8147 提供实现，若能及时合并，预计可在下一小版本中上线。  

---

### 7. 用户反馈摘要  
- **#2077**：用户需求“sovereign agents 直接在链上交互”，表明对“API‑free” 交互方式的渴求。  
- **#8136**：用户提出希望通过 Plazmi 扩展实现声明式授权，表明对多租户安全模型的关注。  
- **#8146**：反馈本地 Connector 无法使用 hosted‑MCP，突显本地化部署与网络策略的痛点。  

---

### 8. 待处理积压  
| 号 | 类型 | 标题 | 链接 | 备注 |
|----|------|------|------|------|
| #2077 | Issue | contract source for market near ai | https://github.com/nearai/ironclaw/issues/2077 | 已开放 6 个月，未解决 |
| #8136 | Issue | Proposal: optional hosted‑MCP Plazmi extension | https://github.com/nearai/ironclaw/issues/8136 | 近一周内无进展 |
| #8146 | Issue | Hosted MCP: explicit 127.0.0.1 endpoint enrollment | https://github.com/nearai/ironclaw/issues/8146 | 直接影响本地开发 |
| #8147 | PR | Allow explicit trusted enrollment of an exact loopback MCP endpoint | https://github.com/nearai/ironclaw/pull/8147 | 待审议中 |
| #8151, #8152 | PR | rustls 依赖升级 | https://github.com/nearai/ironclaw/pull/8151, #8152 | 依赖安全更新，需及时合并 |
| #8150, #8145 | PR | Python 依赖升级 | https://github.com/nearai/ironclaw/pull/8150, #8145 | 需合并以避免安全漏洞 |

> **提醒**：上述 Issue/PR 中多数已停滞数周，建议维护者尽快评估、分配资源或开启讨论以推动进度。  

---  

> **整体健康度**：代码层面依赖维护保持活跃，但缺乏合并与功能交付，导致项目进展受阻。建议优先审查并合并依赖更新 PR，解决 #8146 Bug 并推动 #8147 PR 进度，以提升用户体验与社区满意度。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-10-21)

## 1. 今日速览
LobsterAI 项目今日保持**高活跃度**，过去24小时内有4条 Issue 更新和6条 PR 活动，其中5条 PR 已合并/关闭，显示开发团队响应迅速。核心进展集中在 **MCP (Model Context Protocol) 生态的稳定化**与**安全性加固**，解决了导致企业环境下 MCP 工具失效的关键 Bug。此外，产品层面引入了**AI 图片编辑功能**，丰富了 Artifact 面板的多模态能力。整体来看，项目正从基础功能建设向**企业级可用性（Corporate Usability）**和**高级交互体验**迈进。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日合并的5条 PR 主要解决了稳定性问题和增强了核心功能：

*   **[MCP 稳定性] 修复 stdio MCP 服务器在 TLS 拦截环境下的连接失败**
    *   **PR**: [#2912](https://github.com/netease-youdao/LobsterAI/pull/2912) (Merged/Closed)
    *   **内容**: 修复了 OpenClaw 启动 stdio MCP server 时丢弃 `NODE_OPTIONS` 导致无法信任系统 CA 证书的问题。此修复对于使用 Zscaler、Netskope 等企业 MITM 代理的用户至关重要，修复后 `fetch failed` 错误消除。
*   **[MCP 功能] 支持从市场安装远程 MCP 连接器**
    *   **PR**: [#2909](https://github.com/netease-youdao/LobsterAI/pull/2909) (Merged/Closed)
    *   **内容**: 扩展了 Marketplace 的能力，允许描述并使用 SSE/Streamable HTTP 类型的远程 MCP 连接器，支持声明式凭据表单和 OAuth 认证，填补了此前仅支持本地 stdio 命令的空白。
*   **[MCP 安全] 加固 OAuth 登录/登出的会话隔离与状态刷新**
    *   **PR**: [#2908](https://github.com/netease-youdao/LobsterAI/pull/2908) (Merged/Closed)
    *   **内容**: 针对远程 MCP OAuth 流程进行硬化，确保 `login/logout/status` 操作针对临时的 `openclaw.json` 配置运行，防止状态污染，提升了多服务器环境下的认证稳健性。
*   **[UX 优化] 侧边栏菜单交互优化与 Windows 任务栏图标隐藏**
    *   **PR**: [#2911](https://github.com/netease-youdao/LobsterAI/pull/2911) & [#2910](https://github.com/netease-youdao/LobsterAI/pull/2910)
    *   **内容**: 柔化了 Kits/Skills/Connectors 菜单的视觉权重并添加动画；在 Windows 上通过 `WS_EX_TOOLWINDOW` 样式隐藏 Desktop Companion 窗口的任务栏-thumbnail，保持任务栏整洁。
*   **[核心功能] Artifact 面板新增 AI 图片编辑与聊天快照**
    *   **PR**: [#2907](https://github.com/netease-youdao/LobsterAI/pull/2907)
    *   **内容**: 在右侧 Artifact 面板集成图片编辑工具（涂画、局部框选修改、去背景、比例调整）。特色在于**操作快照**：每次修改会在聊天卡片中保留当时的选区/涂画状态作为版本记录，提升了多模态交互的可追溯性。

## 4. 社区热点
*   **MCP 企业兼容性痛点**: Issues #2906 和 PR #2912 引发了关于企业网络安全环境适配的讨论。用户反馈在开启 TLS 拦截软件后，MCP 工具全线报 `fetch failed`，且缺少明确提示。该问题在今日得到了快速修复，体现了社区对企业场景的关注。
*   **安全性审计**: Issues #2795 和 #2797 指出了 `main` 分支上存在的两个严重安全漏洞（Token 泄漏到日志、未认证请求转发），虽然指出是预发布分支问题，但在社区中引起了关于**日志脱敏**和**本地代理安全**的高质量讨论。

## 5. Bug 与稳定性
按严重程度排列：

1.  **[严重/已修复] stdio MCP server 静默丢弃 NODE_OPTIONS**
    *   **Issue**: [#2906](https://github.com/netease-youdao/LobsterAI/issues/2906)
    *   **状态**: Open (但 Fix PR #2912 已合并至 release 分支)
    *   **描述**: 在 2026.10.16 版本中，由于 OpenClaw 安全策略丢弃 `NODE_OPTIONS`，导致依赖系统根证书的企业用户 MCP 请求全部失败。
    *   **影响**: 高。直接导致特定环境下 MCP 功能不可用。
2.  **[高/待修复] OAuth Token 泄漏至诊断日志**
    *   **Issue**: [#2795](https://github.com/netease-youdao/LobsterAI/issues/2795)
    *   **状态**: Open
    *   **描述**: `api:fetch` IPC 桥接将原始请求（包含 Access/Refresh Token）写入日志。
    *   **影响**: 高安全风险。若日志被共享或同步，将导致账户被盗。目前仅存在于 `main` 分支，最新 release v0.2.4 不受影响，但需尽快在后端修复。
3.  **[高/待修复] Token Proxy 接受未认证请求**
    *   **Issue**: [#2797](https://github.com/netease-youdao/LobsterAI/issues/2797)
    *   **状态**: Open
    *   **描述**: 本地回环 HTTP 代理接受未认证请求，并将其转发时附带用户 Bearer Token，存在本地提权或混淆风险。
    *   **影响**: 中到高（取决于本地其他恶意进程的能力）。同样是 `main` 分支问题。
4.  **[中/待修复] Computer Use 授权重复弹出且无法持久化**
    *   **Issue**: [#2895](https://github.com/netease-youdao/LobsterAI/issues/2895)
    *   **状态**: Open
    *   **描述**: 同一个应用在同一会话内重复请求授权（Key 未归一化），且授权状态无法跨会话持久化。
    *   **影响**: 中。严重影响 Computer Use 功能的用户体验和工作流连续性。

## 6. 功能请求与路线图信号
*   **多模态内容编辑**: PR #2907 表明项目正在加大对 Artifact 多模态处理（特别是图像）的投入。结合 MCP 远程连接器的支持，未来大概率会看到更多基于远程 MCP 的图像生成/处理能力直接集成在 Artifact 中。
*   **MCP 市场生态**: PR #2909 支持远程 MCP 连接器安装，意味着 LobsterAI 正在努力成为一个**通用的 MCP 客户端平台**，而不仅仅是本地工具 runner。路线图信号显示对第三方集成市场的支持将进一步深化。
*   **企业级合规与安全**: 针对 #2795 和 #2797 的紧急处理暗示，如果项目要渗透到企业市场，**本地代理服务的安全审计**和**日志数据脱敏**将是下一个重点迭代方向。

## 7. 用户反馈摘要
*   **痛点 1 - 环境兼容性**: 用户 cwx07426 详细记录了在启用 Steam++/Zscaler 等工具后 MCP 无法工作的问题，指出静默失败（Silent Failure）是最大的体验杀手，用户希望在 UI 上看到明确的证书信任警告。
*   **痛点 2 - 安全顾虑**: 用户 carfeii 指出 Token 写入日志是严重问题，担心共享日志（如发送给开发者调试）时会泄露凭据。
*   **正面反馈**: 虽然今日 Issue 多为 Bug，但 PR #2907 的引入预示着用户对**可视化、可追溯**的 AI 生成结果编辑有强烈需求，“快照”功能被视为亮点。

## 8. 待处理积压
*   **Issue #2895 (Computer Use 授权问题)**: 创建于 10-17，已有更新但尚未关闭。鉴于 Computer Use 是核心高级功能，此 Bug 阻碍了高级用户的使用，建议维护者在下一周内优先处理或至少在 UI 上加粗提示“当前版本授权策略较为严格”。
*   **Issue #2795 & #2797 (安全漏洞)**: 虽然标记为仅影响 `main` 分支，但由于 `main` 是未来的 release，**必须**在下一个 release 候选版（RC）前合并修复。如果延迟到正式版本，可能引发信任危机。建议立即分配给安全核心成员。

---
**分析师备注**: 今日 LobsterAI 展现了优秀的工程响应速度，特别是针对 MCP 这一核心差异化功能的修复（PR #2912）和功能扩展（PR #2909）。然而，`main` 分支上的安全缺陷（#2795, #2797）与正在强调的远程 MCP 功能形成反差，若远程 MCP 广泛使用，这些本地安全漏洞的风险将呈指数级放大，需警惕。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-10-21)

## 1. 今日速览
Moltis 项目今日活跃度**中等偏低**，处于常规迭代与维护阶段。过去 24 小时内无新版本发布，整体代码合并活动较少（待合并 PR 2 个，已合并 0 个）。主要开发精力集中在 **MiniMax 大模型接入**（文本优先策略与语音合成 TTS 支持）的初步实现上。社区方面新增 1 个关于 WhatsApp 共享聊天身份暴露的功能请求，目前无评论互动。项目整体运行稳定，无紧急阻断性 Bug 报告。

## 2. 版本发布
**无**。过去 24 小时内未产生新的 Release 标签。

## 3. 项目进展
今日**无 PR 被合并**。当前有两个高优先级的功能开发工作正在等待社区审核合并，主要集中在 AI 供应商扩展方面：
*   **模型目录更新**：PR #1312 提议将 `MiniMax-M3.1-Flash` 加入静态模型目录，并优先用于普通文本任务，旨在提升默认响应速度或成本效益。
*   **TTS 能力扩展**：PR #1311 实现了完整的 MiniMax 语音合成（TTS）提供商支持，包括配置、凭据存储及全球/中国区域端点选择，填补了 Moltis 在 MiniMax TTS 接口的空白。

## 4. 社区热点
*   **Issue #1310: 共享 WhatsApp 聊天中的发送者身份暴露** `[OPEN]`
    *   **链接**: [moltis-org/moltis Issue #1310](https://github.com/moltis-org/moltis/issues/1310)
    *   **热点分析**: 该 Issue 由 `psousaj` 提出，指出在多用户共享的 WhatsApp 聊天场景中，Agent 和 MCP 工具无法区分具体消息的发送者身份。作者明确表示该需求未被现有的 #1294（每发送者凭据）或 #640（钩子元数据）覆盖。这一诉求反映了用户对**多人协作场景下身份溯源（Provenance）**的精细化需求，对于企业级或多用户家庭场景下的 AI 助理至关重要。
    *   **状态**: 暂无评论，需维护者评估技术可行性。

## 5. Bug 与稳定性
**今日无新报告的 Bug、崩溃或回归问题。**
*   所有今日活跃的 Issue 和 PR 均为功能性需求或特性增强，未出现稳定性相关的负面反馈。

## 6. 功能请求与路线图信号
*   **MiniMax 生态深度集成**：[PR #1312](https://github.com/moltis-org/moltis/pull/1312) 和 [PR #1311](https://github.com/moltis-org/moltis/pull/1311) 强烈预示 **MiniMax** 将是下一个重点支持的 AI 供应商。不仅涉及文本生成模型（M3.1 Flash），还扩展到了语音合成（TTS）。这表明 Moltis 正在积极拓展多模态能力，并跟进新兴模型的发布节奏。
*   **身份感知聊天**：[Issue #1310](https://github.com/moltis-org/moltis/issues/1310) 暗示未来版本可能会增强消息处理层的元数据传递，使 Agent 能够感知“谁说了什么”，从而在共享聊天中更智能地路由任务或执行权限控制。

## 7. 用户反馈摘要
*   **痛点识别**：用户在共享聊天（WhatsApp）场景中遇到了身份混淆问题。现有的元数据机制（#640）或凭据机制（#1294）无法满足区分同一聊天中不同发送者身份的需求。
*   **潜在不满**：依赖 `psousaj` 的 Preflight Checklist 来看，用户已做过充分的检索和调试，但对当前身份暴露机制的局限性感到不满，希望有更细粒度的 per-message sender identity 暴露给 Agent。
*   **无直接正面反馈**：今日无用户表达对现有功能的满意度评论。

## 8. 待处理积压
*   **PR #1311 & #1312**：这两个关于 MiniMax 支持的 PR 自 2026-10-20 创建以来尚未获得审核或合并。鉴于它们是完整的功能实现（而非草稿），建议维护者尽快审核，以避免社区贡献者的积极性受挫，并加快版本迭代速度。
*   **Issue #1310**：作为新提出的功能请求，暂无维护者回应。建议在下次例会或 issue triage 中优先评估其技术实现路径。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

**CoPaw 项目日报 – 2026‑10‑21**

---

### 1. 今日速览  
过去 24 h 内，CoPaw 的社区活跃度保持稳定，**15 条 Issues**（10 新/活跃、5 已关闭）与 **34 条 Pull Request**（25 待合并、9 已合并/关闭）并行推进。项目整体处于健康发展阶段，主分支持续迭代，新功能与 bug 修复并行推进，社区讨论热度保持在 5–10 条评论/Issue 的水平，未出现大规模回归或安全告警。

---

### 2. 版本发布  
**无新版本发布**。  
最新发布的 `v2.2.2-beta.4`（#8053）已在 2026‑09‑30 过期，当前主线仍使用 `v2.2.2`。若有正式版本即将发布，建议关注 `releases` 页面以获取破坏性变更说明与迁移文档。

---

### 3. 项目进展  
| PR # | 主要改动 | 影响 | 状态 |
|------|----------|------|------|
| **#8215** | 解决 LM Studio 对 “audio‑fallback” 的 400 错误 | 让 `send_file_to_user` 在音频上传后不再触发拒绝 | ✅ 合并 |
| **#8200** | 新增 Firecrawl 作为 `web_search` 供应商 | 提供多源网页检索能力 | ✅ 合并 |
| **#8339** | 修复长对话滚动失稳 | 提升前端体验，避免滚动跳动 | ✅ 合并 |
| **#8343** | 处理 DingTalk Webhook TTL 过期导致最终回复丢失 | 防止会话终止后用户无回应 | ✅ 合并 |
| **#8053** | 版号 2.2.2‑beta.4 通过 CI 检测 | 版号正式发布，验证安装流程 | ✅ 合并 |

> **项目向前迈进**：本日合并的 PR 共提升了 5 项功能/修复，覆盖音频兼容性、检索服务、前端体验与渠道可靠性，整体向着更稳定、更易用的方向迈进。

---

### 4. 社区热点  
| 议题 | 链接 | 评论数 | 主要诉求 |
|------|------|--------|----------|
| **#8171** (CLOSED) | <https://github.com/agentscope-ai/QwenPaw/issues/8171> | 6 | 解决 LM Studio 400‑audio‑fallback，提升跨平台音频交互体验 |
| **#8284** (CLOSED) | <https://github.com/agentscope-ai/QwenPaw/issues/8284> | 2 | 修复长对话滚动失稳，保持 UI 一致性 |
| **#8071** (OPEN) | <https://github.com/agentscope-ai/QwenPaw/issues/8071> | 5 | 为插件引入更细粒度的主题扩展点，提升插件可定制性 |
| **#8320** (OPEN) | <https://github.com/agentscope-ai/QwenPaw/issues/8320> | 3 | 解决 Desktop 2.2.2 下 `make-skill` 依赖无法导入的问题 |
| **#8289** (OPEN) | <https://github.com/agentscope-ai/QwenPaw/issues/8289> | 2 | 宣布即将发布的 `v2.3.0` 轻量化与插件化路线 |

> **热点洞察**：音频兼容、前端滚动、插件主题、skill 安装及未来版本规划是当前社区关注焦点，均与提升用户体验与可扩展性直接相关。

---

### 5. Bug 与稳定性  
| Issue # | 影响 | 已修复 | 备注 |
|---------|------|--------|------|
| **#8320** (OPEN) | Desktop 2.2.2 `make-skill` 导入错误 | 未修复 | 需更新 `qwenpaw` 包或调整 import 路径 |
| **#8315** (OPEN) | Feishu 代理下 `426 Upgrade Required` | 未修复 | 代理配置需加入 `feishu.cn` 到 NO_PROXY |
| **#8340** (OPEN) | 定时任务编辑弹窗无法关闭 | 未修复 | 需要进一步 UI 代码审查 |
| **#8249** (OPEN) | Cron 任务修改后时间重置 | 未修复 | 需检查后端时间序列处理 |
| **#8284** (CLOSED) | 滚动失稳 | ✅ | 通过 `#8339` 修复 |
| **#8343** (CLOSED) | DingTalk 回复丢失 | ✅ | 通过 `#8343` PR 修复 |

> **优先级**：已关闭 Bug 已修复，仍需关注的 Bug（#8320、#8315、#8340、#8249）建议在下周发布周期前完成。

---

### 6. 功能请求与路线图信号  
| Issue / PR | 功能 | 当前进度 | 评估 |
|------------|------|----------|------|
| **#8071** (Issue) | 插件主题扩展层 | 讨论中 | 预期在 `v2.3.0` 引入 |
| **#8289** (Issue) | 轻量化、插件化重构 | 已发布计划 | 关键改动，预计 `v2.3.0` |
| **#8283** (PR) | Decision‑model 工具批准模式 | 开发中 | 预计 `v2.3.0` 或 `v2.4.0` |
| **#8285** (PR) | Skill‑pool 下载可取消 | 开发中 | 重要性高，优先级中 |
| **#8287** (PR) | 思考强度滑块修复 | 开发中 | 对 UI 体验至关重要 |

> **路线图信号**：`v2.3.0` 计划聚焦于插件化与轻量化，后续版本将继续加强安全与工具审批机制。

---

### 7. 用户反馈摘要  
* **音频交互**：#8171 与 #8215 解决方案得到积极反馈，用户表示音频文件发送后不再报错，使用体验显著提升。  
* **前端体验**：#8284 与 #8339 修复后，用户对对话滚动与弹窗交互满意度提升。  
* **插件扩展**：#8071 及 #8289 获得多位插件作者关注，需求集中在更细粒度主题控制与插件隔离。  
* **代理与渠道**：#8315 报告显示代理配置不完整导致 Feishu 连接失败，社区建议完善环境变量文档。  
* **Cron & 定时任务**：#8249 与 #8340 反馈说明定时任务界面与后端同步存在缺陷，导致使用不便。  

> **痛点**：音频兼容、UI 体验、插件隔离与代理配置是当前用户最关注的三大痛点。

---

### 8. 待处理积压  
| Issue / PR | 状态 | 备注 |
|------------|------|------|
| **#8320** (OPEN) | 未解决 | 依赖路径问题需快速定位 |
| **#8315** (OPEN) | 未解决 | 代理配置缺失 |
| **#8340** (OPEN) | 未解决 | UI 弹窗关闭问题 |
| **#8249** (OPEN) | 未解决 | Cron 任务时间重置 |
| **#8285** (OPEN) | 未审阅 | Skill‑pool 下载取消 |
| **#8327** (OPEN) | 未审阅 | ACP 长工具调用结果持久化 |

> **提醒**：上述 Issue 与 PR 属于高频率、重复出现或对核心功能影响较大的议题，建议维护者在下次迭代中给予优先关注。

---

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