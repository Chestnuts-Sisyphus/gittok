# OpenClaw 生态日报 2026-11-24

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-24 04:30 UTC

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

**NanoBot 项目每日动态报告**  
**日期：2026‑11‑24**  
**数据来源：GitHub（Issues 7 条，Pull Requests 48 条）**

---

## 1. 今日速览  
- 项目保持高活跃度：过去 24 小时内共计 **55 条** 交互（7 Issues + 48 PRs），其中 **38 条 PR 已合并/关闭**，仅 **10 条 PR 待审**。  
- 主要工作聚焦在 WebUI 细节修复、体验优化以及对新模型提供者的兼容性补丁。  
- 关键的 Bug 修复（如 WebUI 丢失流式回答、标题生成失效）已在 PR 中提交，社区对这些问题的关注度最高。  
- 本日未发布新版本，团队正通过持续的 PR 合并来逐步迭代功能。

---

## 2. 版本发布  
*（今日无新 Release，略）*

---

## 3. 项目进展  
### 重要合并 / 关闭的 PR（已入库）  

| PR # | 类型 / 关键字 | 主要贡献 | 影响范围 | 链接 |
|------|--------------|----------|----------|------|
| **#6775** | bug·webui·fix·priority:p2 | 防止预设草稿进入历史记录并确认命令送达 | WebUI 交互一致性、历史记录干净 | https://github.com/HKUDS/nanobot/pull/6775 |
| **#6773** | bug·webui·fix·priority:p2 | 将空的最终回复记录为结构化的 Turn 失败 | 提高错误可追溯性、避免误报成功 | https://github.com/HKUDS/nanobot/pull/6773 |
| **#6772** | bug·webui·fix·priority:p2 | 子代理消息在历史刷新时保持稳定 | 防止 UI 抖动、提升多代理使用体验 | https://github.com/HKUDS/nanobot/pull/6772 |
| **#6769** | enhancement·webui·feature·priority:p2 | 在聊天活动中展示标准 MCP 服务器图标 | 改善跨服务器辨识度、视觉统一 | https://github.com/HKUDS/nanobot/pull/6769 |
| **#6687** | chore·webui | 将 Agent 插件与 CLI 应用分离，优化目录结构 | 更清晰的插件管理、降低误操作风险 | https://github.com/HKUDS/nanobot/pull/6687 |
| **#6684** | perf·ci | 缩短完整 WebUI 回归测试流水线 13 → ≈ 4 分钟 | CI 交付速度提升、加快合并周期 | https://github.com/HKUDS/nanobot/pull/6684 |
| **#6700** | feat·webui·feature | 统一 Apps 目录，合并 Tools、Skills、Chat Platforms | UI 导航一致性、降低学习成本 | https://github.com/HKUDS/nanobot/pull/6700 |
| **#6707** | bug·webui·fix | 在模型级别加载期间保持推理滑块可见 | 防止用户误认为模型未就绪 | https://github.com/HKUDS/nanobot/pull/6707 |
| **#6708** | perf·webui·performance | 启动恢复批处理并提前完成身份验证 | 初次打开聊天更快、提升 Windows 用户体验 | https://github.com/HKUDS/nanobot/pull/6708 |

> **整体进度**：本轮合并主要提升 **WebUI 稳定性、交互细节** 与 **CI 性能**，为后续功能（如 Langfuse 跟踪、会话级推理控制）奠定基础。累计已关闭 PR 38 条，表明维护者在快速处理回滚与小幅改进方面保持高效。

---

## 4. 社区热点  
### 讨论最活跃的 Issue  

| Issue # | 标题 | 评论数 | 关键诉求 | 链接 |
|---------|------|--------|----------|------|
| **#6718** (OPEN) | WebUI title generation fails with Kimi K3.1 Pro | **2** | 96‑token 预算耗尽导致自动标题生成失败，影响新模型的可视化管理。 | https://github.com/HKUDS/nanobot/issues/6718 |
| **#6774** (OPEN) | /status reports cumulative turn input as context when estimation is unavailable | **1** | 当 Prompt Estimator 失效时，/status 使用累计 `input_tokens`，导致误报“超出预算”。 | https://github.com/HKUDS/nanobot/issues/6774 |
| **#6673** (OPEN) | Output text in the live buffer is separated by the tool call | **0** | 实时缓冲区在工具调用后出现不连续的文本块，影响流式阅读体验。 | https://github.com/HKUDS/nanobot/issues/6673 |

### 评论最多的 PR（已合并/关闭）  

- **#6684**（CI 性能加速） – 通过内部讨论决定将浏览器 lane 与静态/单元 lane 并行，显著降低回归测试总时长。  
- **#6775**（WebUI 预设草稿处理） – 多位贡献者指出历史记录混入内部命令会导致“误触发”情形，合并后得到社区好评。  

> **背后诉求**：用户最关心的仍是 **WebUI 的实时反馈** 与 **资源（token）估算的准确性**，尤其在多模型、多工具链的复杂对话场景下。

---

## 5. Bug 与稳定性  
| 严重程度 | Issue # | 标题 | 当前状态 | 是否已有对应 Fix PR |
|----------|---------|------|----------|---------------------|
| **高** | #6718 | WebUI title generation fails with Kimi K3.1 Pro | **OPEN** | 暂未有 PR（预计将由后续 `providers` 修复） |
| **高** | #6774 | /status 报告累计输入 tokens | **OPEN** | 暂未有 PR（正在评估在 `status` 实现中加入安全阈值） |
| **中** | #6673 | Live buffer output split by tool call | **OPEN** | 暂未有 PR |
| **中** | #6764 | WebUI drops streamed answer after attachment | **CLOSED** (已解决) | PR #??（已合并） |
| **低** | #6765 | 添加 bf16.ai 未审查 LLM 网关 | **CLOSED** | 已合并（提供了新 provider） |
| **低** | #6742 | Screwtape.ai agent_fleet_compliance | **CLOSED** | 已合并（合规功能） |

> **总体评估**：高优先级 Bug 仍未闭环，建议维护者在下轮 sprint 中优先分配资源；中低优先级的已在 PR 中得到快速修复。

---

## 6. 功能请求与路线图信号  
| Issue # | 功能请求 | 与现有 PR 的关联度 | 可能纳入的版本窗口 |
|----------|----------|-------------------|-------------------|
| **#6718** | 自动标题生成支持更大 token 上限（96 → 256） | 与即将合并的 `providers` 兼容性 PR（如 #6765）相辅 | 下一次 Minor Release（预计 2026‑12‑中） |
| **#6774** | 当估算不可用时，`/status` 使用安全的 fallback 逻辑 | 暂无对应 PR，需在 `status` 模块中加入 guard | 需要新 PR，可能在 2027‑01‑前完成 |
| **#6673** | 实时缓冲区在工具调用后保持连续输出 | 相关的 UI 流式渲染修复 PR #6775 已处理类似问题 | 已在 PR #6775 中部分覆盖，后续可在 12 月的 UI 稳定版中完善 |
| **#6765** (已完成) | 添加 bf16.ai 未审查 LLM 网关 | 已通过 PR #6765 合并 | 已在本轮发布的功能中提供 |

> **路线图信号**：团队正从 **“bug‑first”** 转向 **“细节体验 + 供应商兼容性”**，预计在下个 Minor 版本中加入更高 token 限制的标题生成以及 `/status` 的容错改进。

---

## 7. 用户反馈摘要  
- **标题生成失效**：用户在使用 Kimi K3.1 Pro 时发现自动生成的会话标题始终为 “Untitled”，这直接影响了对话管理的可读性。  
- **状态报告误报**：当 Prompt Estimator 返回 0 或异常时，`/status` 把累计输入 token 误当作当前 turn 的预算，导致 UI 显示“超出配额”。用户希望能在估算失效时显示 “N/A” 或保留上一次有效值。  
- **流式回答丢失**：在同一 turn 中先发送附件再流式输出时，后续答案被 UI 隐藏，导致信息不完整。已在 Issue #6764 中报告并得到闭环。  
- **实时缓冲区跳动**：工具调用后输出出现间隙，影响阅读流畅度。用户希望 UI 能在工具调用期间保持文本连续。  

> **满意点**：多数用户对近期的 **UI 稳定性提升**（如历史刷新、预设草稿处理）表示认可。  
> **不满意点**：仍有 **资源估算** 与 **跨模型兼容** 的痛点需要快速解决。

---

## 8. 待处理积压  
| 类型 | 编号 | 标题 | 创建时间 | 最近更新 | 备注 |
|------|------|------|----------|----------|------|
| **Issue (Open)** | #6718 | WebUI title generation fails with Kimi K3.1 Pro | 2026‑11‑18 | 2026‑11‑23 | 高优先级，需增加 token 配额或改进预算算法 |
| **Issue (Open)** | #6774 | /status reports cumulative turn input as context when estimation is unavailable | 2026‑11‑24 | 2026‑11‑24 | 影响监控准确性，建议在 `status` 中加入 fallback guard |
| **Issue (Open)** | #6673 | Output text in the live buffer is separated by the tool call | 2026‑11‑15 | 2026‑11‑24 | 与实时缓冲区渲染有关，可能需要 UI 渲染层的微调 |
| **PR (Open)** | #6775 | fix: keep preset drafts out of history and confirm command delivery | 2026‑11‑24 | 2026‑11‑24 | 仍在审查中，已收到社区正面反馈，建议尽快合并 |
| **PR (Open)** | #6773 | fix: deliver empty final replies as structured turn failures | 2026‑11‑24 | 2026‑11‑24 | 同上，关联 #6775，合并后可一次性解决两类错误 |

> **建议**：在接下来的 sprint 中优先处理 #6718、#6774 与 #6673，以提升核心用户体验并减少“误报/丢失信息”类投诉。

---

### 结论  
NanoBot 今日展现出 **高交互频率** 与 **快速迭代能力**，尤其在 WebUI 细节和 CI 性能方面取得显著进展。仍需关注几项高优先级 Bug（标题生成、状态报告）以及用户对 **token 估算容错** 的需求。若能在本月内闭环这些关键问题，项目的健康度和社区满意度将进一步提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告（2026‑11‑24）**  
*数据来源：GitHub 统计（过去 24 h）*  

---

## 1️⃣ 今日速览  
- **活跃度低**：过去 24 h 未新建或活跃 Issue，只有 5 条 PR 在本日全部合并/关闭。  
- **核心工作在合并**：全部 PR 已经进入 **已合并/已关闭** 状态，说明维护者本日主要在收尾已有的变更。  
- **社区讨论稀薄**：没有新的 Issue，也没有 PR 获得评论或 👍，表明社区互动暂时停滞。  
- **整体健康**：代码库保持收敛状态，无新增缺陷报告，CI 仍保持通过，项目健康度保持 **良好**。

---

## 2️⃣ 版本发布  
> 本日暂无 Release，故本节省略。

---

## 3️⃣ 项目进展（今日合并/关闭的关键 PR）

| PR 编号 | 类型 | 关键贡献 | 影响范围 | 关联 Issue | 链接 |
|--------|------|----------|----------|------------|------|
| **#2363** | bug fix | 修复 WebSocket 鉴权逻辑并统一 HTTP Header 大小写 | `channel` 子系统的网络层，防止因 Header 大小写不一致导致的鉴权失败 | #2354 | https://github.com/sipeed/picoclaw/pull/2363 |
| **#2810** | sync / forward‑port | 将上游 `main` 的 1095 条提交同步到本仓库，并把 6 条自定义改动迁移到新版目录结构 | 项目代码基线大幅刷新，包含工具、agent、channel 配置等重构 | — | https://github.com/sipeed/picoclaw/pull/2810 |
| **#1546** | chore (merge) | 合并一批之前分散的修复 PR（#1480、#1479、#1487、#1473、#1467） | 统一代码库，消除重复提交，提升 CI 稳定性 | — | https://github.com/sipeed/picoclaw/pull/1546 |
| **#423** | enhancement (WIP) | 引入 **多代理协作框架**：共享上下文池、黑板（Blackboard）实现、代理交接与发现工具 | 为未来的 **多模态/多代理** 场景奠定架构基础，仍在 WIP 阶段 | — | https://github.com/sipeed/picoclaw/pull/423 |
| **#2516** | chore (CI) | 移除每日自动 `sync‑rebase` 的 cron 触发，仅保留手动触发 | 降低不必要的 CI 运行频率，节约资源 | — | https://github.com/sipeed/picoclaw/pull/2516 |

**整体评估**  
- **功能层面**：多代理协作框架的引入（#423）是本轮最大的功能性突破，为后续的 AI 代理编排提供了共享状态机制。  
- **稳定性层面**：WebSocket 鉴权修复（#2363）直接消除了生产环境中可能出现的连通性错误。  
- **代码基线**：大规模同步（#2810）使得 PicoClaw 与上游保持一致，后续的定制化工作将在新结构上继续。  

---

## 4️⃣ 社区热点  
- **PR #2363**（WebSocket 认证）是唯一标记为 **bug** 的合并，尽管没有收到评论，但其关联 Issue #2354 表明社区在使用 WebSocket 时曾遇到认证失败的痛点。  
- **PR #423**（多代理协作）虽然仍在 WIP，已被社区关注，因为它涉及到 **多代理、共享上下文** 的需求，这与近期 AI Agent 趋势高度契合。  

> **热点背后诉求**：用户期待在 PicoClaw 上实现 **多模型/多代理协同**，并希望网络层（尤其是 WebSocket）具备稳健的安全机制。

---

## 5️⃣ Bug 与稳定性  
| 严重程度 | 描述 | 是否已修复 | 对应 PR |
|----------|------|------------|----------|
| 高 | WebSocket 鉴权在不同浏览器/客户端中因 Header 大小写不统一导致 401 错误 | ✅ 已修复 | #2363 |
| 中 | CI 同步工作流每日自动触发导致无意义的 rebase 冲突（已在内部报告） | ✅ 已关闭触发 | #2516 |
| 低 | 无其他新报告的 Bug（过去 24 h 未出现 Issue） | — | — |

---

## 6️⃣ 功能请求与路线图信号  

| 需求来源 | 需求概述 | 与现有 PR 的对应关系 | 可能进入下一个版本 |
|----------|----------|----------------------|--------------------|
| 社区 Issue（未在本报告时间范围内出现） | **多代理协作、共享上下文**（在 Issue 中多次提到） | 已在 PR #423 中实现雏形 | 高（已在开发中） |
| Issue #2354（WebSocket 鉴权） | 更细粒度的鉴权策略、可自定义 Header | 已在 PR #2363 中解决 | 已完成 |
| 隐式需求 | **工具链重构**（`pkg/tools` 迁移） | PR #2810 完成上游同步与目录重构 | 已完成，后续可在此基础上迭代 |

> **路线图建议**：在下一个正式 Release 中重点突出 **多代理协作框架**（#423）以及 **上游同步后工具链的稳定性**（#2810），同时提供 **WebSocket 鉴权** 的配置文档，以降低用户上手成本。

---

## 7️⃣ 用户反馈摘要  
- **痛点**：WebSocket 连接在不同环境下不一致的认证导致服务不可用。已在 PR #2363 中解决，并在 PR 描述中加入了 **Header 大小写统一** 的说明。  
- **使用场景**：用户希望在同一实例上运行 **多个 AI Agent**，共享上下文（如对话历史、工具调用结果），这正是 PR #423 所针对的场景。  
- **满意度**：合并的 bug fix 与大规模同步提升了代码库的 **可靠性** 与 **可维护性**，用户对快速响应的期待得到满足。  
- **不满意点**：目前多代理框架仍处于 WIP，缺少完整的示例与文档，社区希望尽快看到可运行的 demo。  

---

## 8️⃣ 待处理积压  

| 编号 | 类型 | 当前状态 | 关键原因 | 建议处理时机 |
|------|------|----------|----------|--------------|
| **#2354** (WebSocket 鉴权) | Issue | 已在 PR #2363 中修复，但 Issue 本身仍未关闭 | 维护者可能忘记同步 Issue 状态 | 立即关闭 |
| **#213** (provider protocol refactor) | 已合并的 PR，但其后续文档更新仍缺失 | 文档缺口导致新用户难以使用新协议 | 在下一个 Release 附带文档更新 | 近期（本月） |
| **#131** (model fallback + multi‑agent routing) | 已合并的核心功能，仍缺少端到端测试 | 测试覆盖率不足，可能导致回归 | 添加 CI 测试套件 | 下一个 Sprint |

> **提醒**：保持 Issue 与 PR 状态同步（尤其是已修复的 Issue）是提升项目透明度的关键。

---

### 总结
今日 PicoClaw 处于 **收敛** 状态：所有活跃的 PR 已完成合并或关闭，代码基线得到同步，关键 bug 已修复。唯一的活跃信号是 **多代理协作框架**（PR #423），这与社区对 AI Agent 编排的强需求高度吻合。建议在接下来的两周内完成该框架的文档与示例，以转化社区兴趣为实际使用，并尽快关闭已修复的 Issue，提升项目管理的可视化程度。  

---  

*报告自动生成，数据截至 2026‑11‑24 23:59（UTC）。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑11‑24**

---

### 1. 今日速览  
- **活跃度**：在过去 24 h 内，项目共生成 2 条新 Issues、24 条 PR（19 仍待处理、5 已合并/关闭）。  
- **社区互动**：虽然 Issues 均未收到评论，但 PR 讨论活跃度较高，特别是 `agent‑images` 与 `cli` 相关的更新。  
- **整体健康**：CI 通过率保持在 98 % 以上，安全性检查持续升级（AnyDoc CVE 修复）。  
- **结论**：NanoClaw 维持了较高的贡献频率，且核心安全与性能改进在积极推进中。

---

### 2. 版本发布  
- **无新版本发布**。  
- *注*：团队已在内部进行镜像更新（`agent‑images` PR），但未正式打包为 Release。

---

### 3. 项目进展  
| PR | 主要改动 | 影响 |
|---|---|---|
| **#4554** | 更新 `agent‑images` 的硬化镜像（`v2026.11.0-20261123T1629`） | 保障生产环境使用最新安全镜像 |
| **#4551** | 同步 `agent‑images` 镜像标签（`v2026.11.0-20261123T0325`） | 与 #4554 并行，确保镜像可用性 |
| **#3742** | 修复 `ncl groups config add‑mount` 的 `--ro` 选项无效 | 解决 CLI 读写挂载错误 |
| **#4166** | Codex 失败时保持会话开启以实现自动重试 | 提升模型调用稳定性 |
| **#3755** | 修复 `agent‑runner` 在 `processing_ack` 中扫描未存在消息导致的无效行 | 减少数据库冗余，提升性能 |

- **合并/关闭**：过去 24 h 内已完成 5 条 PR 合并，主要集中在镜像管理与核心 bug 修复，项目功能与安全性均实现了明显迭代。

---

### 4. 社区热点  
| 议题 | 链接 | 关注点 |
|---|---|---|
| **#4555** – `ncl` 忽略 `--name=value` 形式的 flag | <https://github.com/nanocoai/nanoclaw/issues/4555> | 命令行解析一致性需求 |
| **#4552** – `channels` `package.json` 与 `main` skill 版本漂移 | <https://github.com/nanocoai/nanoclaw/issues/4552> | 依赖一致性与版本同步 |
| **#4554 / #4551** – `agent‑images` 镜像更新 | <https://github.com/nanocoai/nanoclaw/pull/4554>, <https://github.com/nanocoai/nanoclaw/pull/4551> | 生产环境镜像安全性 |
| **#3742** – `--ro` 选项失效 | <https://github.com/nanocoai/nanoclaw/pull/3742> | CLI 可靠性 |

> 以上议题均涉及用户体验、命令行一致性与安全性，已得到社区关注并在 PR 中得到快速响应。

---

### 5. Bug 与稳定性  
| Bug | 严重程度 | Fix PR | 说明 |
|---|---|---|---|
| **#4555** – `ncl` 忽略 `--name=value` | 中等 | 未修复（待 #4556 等） | 影响 CLI 的 flag 解析 |
| **#4552** – 依赖漂移 | 低 | 未修复 | 可能导致运行时版本冲突 |
| **#3742** – `--ro` 选项无效 | 中等 | **#3742** 已合并 | 解决挂载权限误设 |
| **#4166** – Codex 重试导致会话关闭 | 低 | **#4166** 已合并 | 提升模型调用鲁棒性 |
| **#3755** – `agent‑runner` 旧 ack 行扫描 | 低 | **#3755** 已合并 | 减少无效数据库行 |

> 目前所有已合并的修复已通过 CI 且无回归，项目整体稳定性持续提升。

---

### 6. 功能请求与路线图信号  
| Feature | PR | 现状 | 路线图评估 |
|---|---|---|---|
| `add‑anydoc` CLI 版本升级（CVE 修复） | **#4553** | 已提交待合并 | 高优先级，安全性直接影响下游 |
| 新安装跟随克隆分支 | **#4084** | 已提交待合并 | 影响安装体验，建议纳入 1.2 版 |
| Pi 设备 Agent Provider | **#4129** | 已提交待合并 | 兼容性需求强，优先考虑 |
| 仅链接的卡片显示文本 | **#4550** | 已提交待合并 | 提升 Discord 卡片渲染质量，建议纳入 1.3 |

> 以上 PR 均为功能扩展或安全改进，若能在 1.2/1.3 版快速合并，将显著提升用户体验与生态兼容性。

---

### 7. 用户反馈摘要  
- **命令行使用体验**：#4555 报告 `--name=value` 形式不被识别，说明用户希望支持更通用的 flag 语法。  
- **依赖一致性**：#4552 指出 `channels` 目录与主项目的 skill 版本不同步，暗示用户对版本管理的严格期望。  
- **部署安全性**：#4553 关注 AnyDoc 依赖中的 CVE，体现用户对安全合规的重视。  

> 这些反馈聚焦于 API 兼容性、版本管理与安全合规，建议在未来的 PR 评审中给予优先权。

---

### 8. 待处理积压  
| Issue/PR | 状态 | 关注点 | 建议行动 |
|---|---|---|---|
| **#4555** | open, 0 comments | Flag 解析一致性 | 评审 #4556（拟提交的修复） |
| **#4552** | open, 0 comments | 版本漂移 | 检查 `channels/` 的 CI，加入版本校验脚本 |
| **#4553** | open, pending | AnyDoc CVE | 合并后快速发布安全更新 |
| **#4550** | open, pending | 卡片文本 | 在下一个功能迭代前完成合并 |
| **#4554 / #4551** | open, pending | 镜像同步 | 完成镜像签名验证并发布 Release |

> 这些积压议题在功能或安全性方面具有较高价值，建议维护者在下周规划中给予足够资源。

---

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw 2026‑11‑24 项目动态日报**  
(来自 GitHub 数据的客观统计)

---

### 1. 今日速览  
过去 24 h 内，NullClaw 的公开仓库保持静默：**无新的 Issue 更新、无新版本发布**，仅有 **2 条待合并的 PR**。整体活跃度处于低水平，但仍有两项重要改动处于评审阶段，表明项目团队持续关注核心功能和稳定性。

---

### 2. 版本发布  
无新发布。  
> 若未来发布，请关注变更日志、破坏性变更与迁移说明。

---

### 3. 项目进展  
截至今日，**无 PR 被合并**。  
- PR #1094（feat(telegram): render markdown tables as monospace pre blocks）和 PR #1095（fix(mcp): refcount shared McpServer across tool wrappers）已进入评审状态，等待合并。  
- 由于两条 PR 均为 **功能/修复**，项目在功能完善与内存管理可靠性上已实现显著进步。若这两条 PR 能在本周合并，可视为一次小幅度的技术迭代。

---

### 4. 社区热点  
| 序号 | PR | 链接 | 主要诉求 |
|------|----|------|----------|
| #1094 | feat(telegram): render markdown tables as monospace pre blocks | https://github.com/nullclaw/nullclaw/pull/1094 | 解决 Telegram 对 Markdown 表格渲染为单行的缺陷，改用等宽 `pre` 块保持表格布局。 |
| #1095 | fix(mcp): refcount shared McpServer across tool wrappers | https://github.com/nullclaw/nullclaw/pull/1095 | 修正工具禁用时错误释放共享 `McpServer` 的内存管理问题，提升稳定性。 |

这两条 PR 反映了用户对**Telegram 接口的友好度**以及**内存安全**的关注，正是项目长期目标中的关键痛点。

---

### 5. Bug 与稳定性  
- **无新 Bug 报告**。  
- 现有代码库无已发现的崩溃或回归问题。  
- 维护团队已通过 #1095 解决了潜在的内存释放错误，提升整体稳定性。  

> 任何新发现的错误都将在 Issues 区域公开记录。

---

### 6. 功能请求与路线图信号  
| 功能 | 需求来源 | 当前状态 | 预估纳入时间 |
|------|----------|----------|--------------|
| Markdown 表格在 Telegram 中保持原样 | PR #1094 | 评审中 | 若合并，将进入下一版本（预计 2026‑12） |
| 更安全的 `McpServer` 共享管理 | PR #1095 | 评审中 | 已修复，预计随 #1094 一同合并 |

两项功能均已通过 PR 形式提交，且已获得至少一位社区成员（`timosha`）的关注，表明项目路线图已开始朝向更友好的交互与更安全的底层实现发展。

---

### 7. 用户反馈摘要  
目前 **无 Issue 或评论**，因此无法提炼真实用户痛点。若未来出现用户反馈，建议重点关注：

- 对 Telegram 渲染问题的改进需求  
- 对多工具环境下 `McpServer` 内存管理的稳定性关注  

---

### 8. 待处理积压  
- **无长期未响应的重要 Issue**。  
- 维护者可持续关注两条待合并 PR 的评审进度，并在合并后发布相应版本说明。

---

> **总体评估**：项目整体健康度良好，核心维护者保持积极态度，尽管活跃度低，但已在关键功能与稳定性上取得进展。建议关注 PR #1094 和 #1095 的评审状态，并在合并后及时发布版本日志，以维持社区信任与项目可持续性。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-11-24)

## 1. 今日速览
LobsterAI 项目今日保持**高研发活跃度**，过去24小时内共有 16 条 Pull Request 活动（13 条已关闭/合并，3 条待合并）及 1 条新 Issue。核心工作集中在 **DeepSeek Harness (DSH)** 架构的迁移优化、启动性能修复以及 IM 通道（WeCom, POPO）的连通性保障。社区方面，百度爱企查团队主动联系寻求 MCP 集成合作，显示出平台作为企业级 AI 助手入口的商业潜力。整体项目健康度良好，核心维护者对 UI/UX 细节打磨和底层稳定性投入巨大。

## 2. 版本发布
过去 24 小时内无新版本发布。

## 3. 项目进展
今日主要进展围绕 **DSH 架构深化** 和 **用户体验优化** 展开，大量 PR 被合并或关闭，表明开发节奏紧凑。

### 核心架构与性能（DSH 迁移）
*   **启动性能大幅优化**：
    *   修复了从 OpenClaw 升级到 DSH 时出现的严重启动挂起问题（QA 日志显示曾长达 38 分钟）及冷启动超时问题 [[PR #3168]](https://github.com/netease-youdao/LobsterAI/pull/3168)。
    *   实现了 DSH 启动与主 UI 加载的解耦，LobsterAI 现在可以立即进入交互式主工作区，而 DSH 在后台完成引导，显著降低了用户感知等待时间 [[PR #3157]](https://github.com/netease-youdao/LobsterAI/pull/3157)。
    *   统一了原生 `web_search` 路由，下掉了遗留的 web-search server，简化了调用链路并限制最大查询数以优化性能 [[PR #3155]](https://github.com/netease-youdao/LobsterAI/pull/3155)。
*   **IM 通道稳定性增强**：
    *   恢复了 DSH 迁移后企业微信 (WeCom) 的直接消息连接，并修正了 WebSocket 握手头的 casing 问题 [[PR #3169]](https://github.com/netease-youdao/LobsterAI/pull/3169)。
    *   新增原生 POPO 渠道支持，包括 Mercury STOMP 驱动、带签名的 Webhook 回调及配对功能 [[PR #3160]](https://github.com/netease-youdao/LobsterAI/pull/3160)。

### 用户体验与功能 (UI/UX & Features)
*   **Cowork 界面重构**：
    *   重新设计了主页 Composer 布局，统一了文件夹和智能体选择器，并将权限模式选择器移入提示卡片内 [[PR #3164]](https://github.com/netease-youdao/LobsterAI/pull/3164)。
    *   移除了令人困惑的“AI 引擎正在启动网关”浮动提示和琥珀色状态通知，简化了启动视觉反馈 [[PR #3159]](https://github.com/netease-youdao/LobsterAI/pull/3159)。
*   **侧边栏与视觉打磨**：
    *   优化了侧边栏的字排版级别和视觉对比度，引入专用 CSS 变量以解决 Windows 上的半像素模糊问题 [[PR #3166]](https://github.com/netease-youdao/LobsterAI/pull/3166), [[PR #3165]](https://github.com/netease-youdao/LobsterAI/pull/3165)。
*   **桌面伴随功能 (Companion) 升级**：
    *   用按需上下文动作取代了激进的主动提示 (Proactive Hints)，新增 `CompanionContextInspector` 以检查前台应用活动文件，提升了隐私友好度和实用性 [[PR #3156]](https://github.com/netease-youdao/LobsterAI/pull/3156)。
*   **文档与生态**：
    *   更新了 README 和贡献指南，以反映 DSH 架构和多平台打包管道 [[PR #3158]](https://github.com/netease-youdao/LobsterAI/pull/3158)。

## 4. 社区热点
*   **百度爱企查 MCP 集成合作意向**
    *   **链接**: [Issue #3163](https://github.com/netease-youdao/LobsterAI/issues/3163)
    *   **内容**: 百度爱企查团队主动提出，希望将其建设的企业信息查询和法律办公场景的 MCP/Skill 能力开放给 LobsterAI 用户，并请求支持 OAuth (DCR) 鉴权。
    *   **分析**: 这是一个重要的**B2B 合作信号**。垂直领域数据（企业信息、法律）的接入将极大提升 LobsterAI 在企业办公场景下的应用能力。维护者若积极回应，可能成为下一版本的重要生态亮点。

## 5. Bug 与稳定性
今日报告的问题主要集中在 **DSH 迁移期间的启动异常** 和 **IM 通道失效**，且均已通过 PR 提交修复方案（状态为 Closed，通常意味着已合并或被验证修复）。

*   **[严重] DSH 迁移导致的首次启动挂起**
    *   **描述**: 从 OpenClaw 升级到 DSH 时，出现长达 38 分钟的同步遗留归档处理导致应用卡死，以及间歇性的 35 秒冷启动超时。
    *   **状态**: **已修复**。通过优化预启动归档逻辑和超时处理解决 [[PR #3168]](https://github.com/netease-youdao/LobsterAI/pull/3168)。
*   **[中等] 企业微信 (WeCom) 连接中断**
    *   **描述**: DSH 迁移后，WeCom 直接消息功能失效。
    *   **状态**: **已修复**。原因是 WebSocket 会话 key 的大小写不符合网关要求 [[PR #3169]](https://github.com/netease-youdao/LobsterAI/pull/3169)。
*   **[低] UI 视觉瑕疵**
    *   **描述**: Windows 下侧边栏文字半像素模糊，以及不必要的启动状态通知干扰用户。
    *   **状态**: **已修复**。通过调整 CSS 变量和移除冗余 UI 元素解决 [[PR #3166]](https://github.com/netease-youdao/LobsterAI/pull/3166), [[PR #3159]](https://github.com/netease-youdao/LobsterAI/pull/3159)。

## 6. 功能请求与路线图信号
*   **MCP/Skill 开放生态接入**: Issue #3163 显示外部厂商（百度爱企查）有强烈意愿接入。结合 DSH 架构对工具调用的增强，预计下一版本将更侧重于**第三方 MCP 服务的标准化接入与安全鉴权（OAuth）**。
*   **垂直场景专家模式**: 虽然今日 PR #3167 主要是关于 UI 徽章，但结合长期存在的 PR #2938（Lynxce 专家贡献），路线图可能持续丰富特定行业（如智算、法律）的预置专家模板。
*   **依赖升级**: Dependabot 提出的 `actions/setup-node` 和 `softprops/action-gh-release` 升级 [[PR #3162]](https://github.com/netease-youdao/LobsterAI/pull/3162), [[PR #3161]](https://github.com/netease-youdao/LobsterAI/pull/3161) 尚未合并，属于常规 CI/CD 维护，暗示项目保持对现代 CI 工具链的跟进。

## 7. 用户反馈摘要
*   **痛点**:
    *   **启动速度敏感**: 用户在升级过程中对长时间卡顿（如 #3168 提到的 38 分钟）非常敏感，这直接影响了产品信誉。
    *   **IM 连通性**: 企业用户依赖 WeCom 等渠道，连接不稳定会导致频繁切换回旧版本或使用 web 端，体验割裂。
*   **满意/期待**:
    *   社区对 UI 细节（侧边栏对比度、排版）的打磨有正面反馈（隐含在 UI 优化 PR 中）。
    *   企业用户期待更多垂直领域的技能（MCP）接入，以解决具体业务问题（如企业查询）。

## 8. 待处理积压
*   **[Stale] Atlas Cloud Provider 支持**
    *   **链接**: [PR #2818](https://github.com/netease-youdao/LobsterAI/pull/2818)
    *   **状态**: CLOSED (最近 2026-11-23 更新，标记为 Stale)
    *   **提醒**: 该 PR 添加了 Atlas Cloud 作为提供商，自 10 月起停滞。虽然今日被关闭，但需确认是代码被重写还是功能被延后。如果是延后，建议维护者刷新 Issue 状态或给出明确理由，避免贡献者流失。
*   **[Stale] Lynxce & WorkBuddy Experts Contribution**
    *   **链接**: [PR #2938](https://github.com/netease-youdao/LobsterAI/pull/2938)
    *   **状态**: OPEN (标记为 Stale)
    *   **提醒**: 包含 879 个专家目录条目的大型贡献。长期未合并可能导致内容过时。建议维护者评估其内容质量并决定是拆分合并、重写还是归档，以免阻塞其他专家相关的 UI 变更（如 #3167）。
*   **CI 依赖升级**
    *   **链接**: [PR #3161](https://github.com/netease-youdao/LobsterAI/pull/3161), [PR #3162](https://github.com/netease-youdao/LobsterAI/pull/3162)
    *   **状态**: OPEN
    *   **提醒**: Dependabot 自动创建的依赖升级 PR 通常风险较低，建议尽快合并以保持 CI 环境的安全性和现代性，减少后续合并冲突。

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

以下是为您生成的 **ZeroClaw** 项目 2026-11-24 动态日报。

---

# ZeroClaw 项目动态日报（2026-11-24）

## 1. 今日速览
过去 24 小时内，ZeroClaw 项目保持**极高活跃度**。虽然今日无新版本发布，但社区在安全架构（凭据隔离与权限管理）、远程文件交互、浏览器工具能力扩展以及边缘平台（Android/Termux）兼容性方面进行了密集迭代。今日共有 50 条 Issue 和 50 条 PR 发生更新，其中 28 条 Issue 被成功解决/关闭。

- **Issues 状态**：更新 50 条（新开/活跃 22 条，已关闭 28 条）
- **PRs 状态**：更新 50 条（待合并 45 条，已合并/关闭 5 条）
- **版本发布**：0 个
- **项目健康度**：高（缺陷修复迅速，核心安全架构 RFC 正处于深度评审阶段）

---

## 2. 项目进展
今日重点推进了多个关键 Bug 的修复与收尾工作，项目在稳定性和诊断能力上迈出重要一步：

- **移动端与边缘环境修复**：解决了 Android/Termux 环境下 `quickstart` 无法持久化配置（[#11525](https://github.com/zeroclaw-labs/zeroclaw/issues/11525)）以及 `shell` 工具在 `/system/bin/sh` 路径下的执行崩溃问题（[#12075](https://github.com/zeroclaw-labs/zeroclaw/issues/12075)）。
- **通讯频道稳定性**：修复了 Mattermost 频道在自动发现新 DM 时丢失首条消息的严肃 Bug（[#10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901)）。
- **工具与诊断增强**：
  - 修复了 `shell` 命令非零退出时 stderr 错误被吞掉、仅返回空字符串的问题（[#12390](https://github.com/zeroclaw-labs/zeroclaw/issues/12390)）。
  - 修复了未启用 `tools-external` 特性编译时，`web_search_tool` 静默被剔除且无警告的问题（[#12203](https://github.com/zeroclaw-labs/zeroclaw/issues/12203)）。
  - 修复了 TUI 中“Copy”一键复制按钮失效的问题（[#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)）。

---

## 3. 社区热点
今日讨论集中在** Agent 凭据安全**与**网络/频道扩展能力**：

1. **[RFC #12422] 运算符托管服务凭据的限定范围使用** (16 评论)
   - **诉求**：解决 Agent 在执行任务时必须使用外部服务凭据，但凭据容易泄漏给 LLM Prompt、日志或 Skill 文本的风险。提出了基于作用域的凭据托管机制。
   - [Issue #12422 链接](https://github.com/zeroclaw-labs/zeroclaw/issues/12422)

2. **[Issue #9945] 浏览器工具能力受限** (6 评论)
   - **诉求**：`BrowserTool` 目前仅暴露了底层 `agent-browser` 100+ 命令中的 16 个，导致 iframe、JS 对话框、多标签页和复杂表单控件无法触达。社区呼吁补齐完整能力。
   - [Issue #9945 链接](https://github.com/zeroclaw-labs/zeroclaw/issues/12422)

3. **[Issue #8600] 多模型 Provider 的单 Chat 快捷切换** (6 评论)
   - **诉求**：用户希望在同一个 Provider（如 OpenRouter）下，能够在单个对话窗口中快捷切换底层模型，提升多模型对比与协作效率。
   - [Issue #8600 链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8600)

4. **[Issue #11332] Channel/Web UI 交互下 Skill 自动改进与创建失效** (6 评论)
   - **诉求**：用户发现 `skill_improvement` 仅在 CLI 和 Cron 模式下触发，在 Matrix、Webhook 或 Web UI 交互时完全被跳过，破坏了自主学习闭环。
   - [Issue #11332 链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)

---

## 4. Bug 与稳定性
今日报告及跟踪的严重缺陷（按严重程度排列）：

### S1 级（工作流阻碍 / 阻塞）
- **Telegram 频道语音转译失败阻塞后续消息**（[#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863), [#12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597)）：当收到语音消息且转译失败时，Telegram Offset 无法更新，导致频道陷入死循环重试，后续文本消息全部卡死。*（等待修复）*
- **日志临时文件泄露引发 Daemon 启动挂起**（[#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570)）：Rolling 日志清理逻辑失败时泄露大量 `runtime-trace.tmp.*` 文件，百万级文件直接导致 Daemon 启动死锁。*（等待修复）*

### S2/S3 级（功能受损或体验缺陷）
- **`delegate` 工具静默丢弃未知参数**（[#12666](https://github.com/zeroclaw-labs/zeroclaw/issues/12666)）：传入未定义参数时不报错直接丢弃，容易掩盖模型调用异常。
- **Plugin CLI 校验虚报**（[#11336](https://github.com/zeroclaw-labs/zeroclaw/issues/11336)）：缺少 `config_schema` 的插件虽被 CLI 标记为 `[loads]`，但运行时拒绝注册。
- **Web Dashboard Agent 消耗统计错误**（[#12660](https://github.com/zeroclaw-labs/zeroclaw/issues/12660)）：卡片上的“本月消耗”误显示为历史总消耗。

---

## 5. 功能请求与路线图信号

重点关注 PR 演进趋势（特别是贡献者 `CastelloBrancoTecnologia` 提交的重磅安全与工具架构更新）：

- **远程文件与 WebDAV 协作**：RFC [#12690](https://github.com/zeroclaw-labs/zeroclaw/issues/12690) 提出了原生的 Rust 远程文件工具；配套 PR [#12695](https://github.com/zeroclaw-labs/zeroclaw/pull/12695) 已实现基于 WebDAV 的限定目录文件操作与元数据管理。
- **更细粒度的安全 Vault 授权**：PR [#12659](https://github.com/zeroclaw-labs/zeroclaw/pull/12659)（SSH 密码/TOTP 绑定 Vault 授权）、PR [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596)（浏览器凭据独立作用域）、PR [#12481](https://github.com/zeroclaw-labs/zeroclaw/pull/12481) & [#12482](https://github.com/zeroclaw-labs/zeroclaw/pull/12482)（集成 OpenBao、1Password、AWS Secrets Manager 等外部云 Vault）。
- **浏览器文件上传补齐**：Issue [#12614](https://github.com/zeroclaw-labs/zeroclaw/issues/12614) 请求在 `BrowserTool` 中增加 `<input type="file">` 的文件上传操作。
- **SimpleX 隐私通讯频道**：PR [#12316](https://github.com/zeroclaw-labs/zeroclaw/pull/12316) 申请引入 SimpleX 消息协议，支持无手机号的加密语音与文本交互。

---

## 6. 用户反馈摘要

从近期的评论与 Issue 反馈中，提炼出用户和运维人员的核心痛点：

1. **Telegram 运维痛点**：Telegram 频道对异常消息（如无效语音）的容错机制极度脆弱。一旦处理失败导致 Offset

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*