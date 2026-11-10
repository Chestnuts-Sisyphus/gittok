# OpenClaw 生态日报 2026-11-10

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-10 02:27 UTC

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

# OpenClaw 项目日报
**日期**: 2026-11-10  
**分析师**: AI 智能体与个人 AI 助手开源项目分析师  
**项目**: OpenClaw (github.com/openclaw/openclaw)

---

## 1. 今日速览

今日 OpenClaw 社区保持高活跃度，Issue 和 PR 流量均达到 500 条（含历史积压），显示出维护团队正在积极处理积压的技术债务与功能迭代。**活跃度评估：高**。

今日未见新版本发布，但多个高优 Bug（如 SQLite 重建、启动可靠性、MCP 参数类型等）已进入 PR 阶段，修复工作进展迅速。值得注意的是，多个长期未解决的旧 Issue 在今日被维护者重新激活并分配优先级，表明项目正在对核心稳定性问题进行系统性清理。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 项目进展

今日共有 **30 条** PR 处于活跃状态（含已关闭），其中包含多个针对核心稳定性的修复及新功能提案：

- **稳定性修复**：
  - `#196390`: 修复工作树文件在权限撤销后仍被发布的问题（`worktrees`）。
  - `#196288`: 修复沙箱环境下 `view_image` 和 `read` 无法打开 `media://inbound` 资源的问题（安全相关）。
  - `#196376`: 修复 MCP relay 在中断后仍输出成功结果的问题。
  - `#196387`: 修复禁用自动调度时 cron worker 仍被常驻的问题，减少内存占用。

- **功能与体验改进**：
  - `#196392`: 允许在模板验证前创建持久化聊天，提升用户操作流畅度。
  - `#196348` / `#196349`: 模板系统新增对原生插件和技能文件夹的完整打包与信任检查支持。
  - `#196388`: `openclaw id` 新增密钥重组功能（`rebind`），解决密钥丢失或迁移后的远程访问恢复难题。

- **文档与工具链**：
  - `#196384`: 更新工具链推荐，加入 Fable 5.2 和 HY4 模型。
  - `#196386`: 优化 Node 运行时源码保留，减少内存占用。

**整体评价**：修复类 PR 占比高，且涉及沙箱安全、会话状态、模板系统等核心模块，显示出项目在“修复稳定性”与“增强易用性”两条线上并行推进。

---

## 4. 社区热点

今日评论数最高的 5 个 Issue 反映了用户在 Windows 环境下的部署痛点、会话状态管理问题以及 MCP 集成的兼容性挑战：

1. **[P0] Windows 启动与重启可靠性问题** (#170956)  
   - **热度**: 30 评论  
   - **问题**: Windows 服务通过 `schtasks` 安装时，存在启动慢、插件关闭不干净、权限错误等问题，导致重启和更新频繁失败。  
   - **诉求**: 需要重构 Windows 端的进程管理和任务调度逻辑，提升重启成功率。

2. **[P2] 会话状态丢失：短期回忆被每晚清理** (#150635)  
   - **热度**: 27 评论  
   - **问题**: “Dreaming Deep” 阶段因短期回忆存储达到 512 条上限，每晚清理导致内容无法晋升。  
   - **诉求**: 调整短期回忆的清理策略，或优化晋升逻辑以避免内容过早丢失。

3. **[P1] 崩溃恢复后代理不可用** (#166634)  
   - **热度**: 27 评论  
   - **问题**: Gateway 进程崩溃后，SQLite 会话回收提交失败，导致代理永久拒绝 `chat.history` 等请求。  
   - **诉求**: 加强崩溃恢复机制，确保会话状态能正确重建。

4. **[P0] SQLite 头部探测超时修复无法生效** (#193962)  
   - **热度**: 24 评论  
   - **问题**: 已修复的头部探测超时问题在包更新流程中无法被触发，导致更新失败。  
   - **诉求**: 确保修复版本能通过 `openclaw update` 流程被正确部署。

5. **[P2] MCP 工具参数类型错误** (#166133)  
   - **热度**: 16 评论  
   - **问题**: MCP 工具调用时整数参数被强制转换为字符串，导致工具调用失败。  
   - **诉求**: 修复 MCP wrapper 的参数类型转换逻辑。

---

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列，部分已有对应修复 PR：

| 严重程度 | Issue ID | 问题描述 | 状态 |
|---------|----------|----------|------|
| **P0** | #193962 | SQLite 头部探测超时修复无法通过包更新生效 | 已有 PR #196391 (待合并) |
| **P1** | #191841 | Linux 环境下 `native child reaping` 不可用导致子进程执行失败 | 已有 PR #196387 (待合并) |
| **P1** | #190307 | Gateway 重启后大量代理处于“降级”状态 | 已有 PR #195370 (待合并) |
| **P1** | #166634 | 崩溃恢复后代理不可用 | 已有 PR #196261 (待合并) |
| **P2** | #170956 | Windows 启动慢、插件关闭不干净 | 已有 PR #196390 (待合并) |
| **P2** | #182891 | Prompt 缓存未复用，每次请求都丢弃 | 已有 PR #196385 (待合并) |
| **P2** | #166133 | MCP 工具参数类型错误 | 已有 PR #196252 (待合并) |

**稳定性评估**：多起 P0/P1 级别 Bug 已有对应的修复 PR，维护者响应迅速。建议关注 PR 合并后的回归测试。

---

## 6. 功能请求与路线图信号

今日活跃的功能请求主要集中在模板系统、密钥管理和多后端支持：

- **模板系统增强** (#196348, #196349)  
  - 支持将完整的技能文件夹和插件打包到模板中，通过原生管理器安装。这有助于简化用户部署流程，提升模板的可移植性。

- **密钥管理重构** (#196388)  
  - 引入 `openclaw id rebind` 功能，允许用户在密钥丢失或迁移后安全地重组密钥对。这符合 OpenClaw 的“可恢复性”设计目标。

- **多后端支持** (#196237)  
  - 提案在所有 PostgreSQL 安装中由 PostgreSQL 持久化 Gateway 状态所有权。这可能是未来统一后端架构的重要一步。

---

## 7. 用户反馈摘要

从 Issues 评论中提炼出以下真实用户痛点：

- **Windows 部署体验差**：用户频繁遇到启动慢、更新失败、权限错误等问题，希望维护者优先优化 Windows 端的进程生命周期管理。
- **会话状态管理复杂**：用户在崩溃恢复、会话清理、短期回忆晋升等问题上感到困惑，希望提供更清晰的诊断工具和恢复流程。
- **MCP 集成兼容性**：用户在集成 MCP 工具时遇到参数类型错误，希望维护者提供更严格的类型检查和文档说明。
- **模板系统易用性**：用户希望模板系统能支持更完整的技能和插件打包，减少手动配置的工作量。

---

## 8. 待处理积压

以下 Issue 虽然未在今日活跃列表中，但长期未解决，建议维护者关注：

- **#172628**: 新版 Gateway 启动后主代理 admission 失败，需要重启。  
- **#173057**: 共享 workspace 根目录导致删除 bootstrap 文件后所有聊天中断。  
- **#176187**: `memory_search` 性能问题，稀疏向量分配导致超时。  
- **#140213**: 允许多个策略别名解析到同一配置模型。  

---

**总结**：OpenClaw 项目今日在稳定性修复和功能增强上均取得进展，尤其是多个高优 Bug 已有对应 PR。建议维护者优先合并涉及安全、会话状态和 Windows 体验的修复，并关注长期积压 Issue 的处理。

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目每日动态报告  
**日期：2026‑11‑10**  
**数据来源：GitHub（过去 24 h）**  

---  

## 1️⃣ 今日速览  
- 过去 24 h 内，Issues 产生 6 条（新建/活跃 2，已关闭 4），PR 活动异常活跃，累计 17 条（待合并 8，已合并/关闭 9）。  
- 项目核心代码仍在快速迭代，尤其是 **WebUI、渠道（channel）和会话（session）层面的稳定性修复** 占据大部分 PR。  
- 社区关注点集中在 **多房间心跳输出泄漏** 与 **内部消息抑制的返回语义** 两个新问题，显示对部署场景和调试体验的需求在上升。  
- 虽然本日未发布新版本，但已有 **9 条 PR 已合并或关闭**，为即将的次要发布（v0.4.x）奠定了基础。  

---  

## 2️⃣ 版本发布  
> **暂无** 新的 Release。  

---  

## 3️⃣ 项目进展（已合并 / 关闭的关键 PR）  

| PR # | 类型 | 关键改动 | 影响范围 | 链接 |
|------|------|----------|----------|------|
| **#6612** | bug / webui / fix | 修复中键滚动（autoscroll）行为，改为在相机边界而非手势模型上处理 | WebUI 滚动体验，避免卡顿 | https://github.com/HKUDS/nanobot/pull/6612 |
| **#6611** | fix / render | 在 Render Blueprint 中显式调用容器 entrypoint，解决 Deploy 退出 128 的问题 | 部署（Render）稳定性 | https://github.com/HKUDS/nanobot/pull/6611 |
| **#6610** | bug / webui / fix | 粘贴路径时若附件检测失败，保持原始文本不被丢失 | WebUI 文本/附件交互 | https://github.com/HKUDS/nanobot/pull/6610 |
| **#6604** | bug / channel / fix | Feishu 富文本消息的 `files` 数组现在会被正确提取并下载，解决附件消失 | Feishu 渠道兼容性 | https://github.com/HKUDS/nanobot/pull/6604 |
| **#6609** | refactor | 移除未被任何生产代码调用的内部路径，简化代码基线 | 代码体积 & 可维护性 | https://github.com/HKUDS/nanobot/pull/6609 |
| **#6608** | fix / webui | 上下文图在压缩后仍保留系统提示文件，防止模型调用缺失 | 系统提示可靠性 | https://github.com/HKUDS/nanobot/pull/6608 |
| **#6606** | bug / channel / fix | 跨渠道的投递失败信息现在会被保留并向上层报告，避免“假成功” | 可靠性 & 错误追踪 | https://github.com/HKUDS/nanobot/pull/6606 |
| **#6605** | bug / webui | “最新消息”按钮显示逻辑修正，防止在仅剩空白时误出现 | UI 细节优化 | https://github.com/HKUDS/nanobot/pull/6605 |
| **#6612**（已关闭）| bug / webui | 同上，已合并进主分支 | – | https://github.com/HKUDS/nanobot/pull/6612 |

> **整体评估**：本轮 PR 主要聚焦 **UI 稳定性、渠道兼容、会话锁管理** 与 **部署入口**，显著提升了用户在多房间、跨渠道使用时的可靠性。  

---  

## 4️⃣ 社区热点  

| 编号 | 类型 | 热点概述 | 关键诉求 | 链接 |
|------|------|----------|----------|------|
| **#6620** (OPEN) | Issue | **内部 turn（heartbeat）期间的 `message` 调用被压制，却返回成功确认**，导致调用方误以为消息已送达。 | 需要在抑制模式下返回明确的 *“已抑制”* 状态或错误码，以免误判。 | https://github.com/HKUDS/nanobot/issues/6620 |
| **#6619** (OPEN) | Issue | **多房间部署时，心跳报告会泄漏到最近更新的房间**，产生跨会话噪声。 | 明确心跳输出路由到对应会话/房间，避免信息混淆。 | https://github.com/HKUDS/nanobot/issues/6619 |
| **#6607** (CLOSED) | Issue | Render 部署因 `dockerCommand` 替换 entrypoint 而在启动前退出 128。 | 为 Render 提供明确的入口指令配置说明，防止类似部署失误。 | https://github.com/HKUDS/nanobot/issues/6607 |
| **#6596** (CLOSED) | Issue | Feishu 中文本+文件的富文本消息附件被 silently dropped。 | 需要完整解析 `files` 数组，确保文件不丢失。 | https://github.com/HKUDS/nanobot/issues/6596 |

**分析**：  
- 两个 **新打开的 Issue** 都围绕 **跨渠道/跨会话的消息路由**，说明当前的 **心跳/内部消息机制** 在多实例环境下仍有不确定行为。  
- 社区对 **部署可复制性**（Render）以及 **渠道兼容性**（Feishu）也保持高度关注，已在 PR 中得到快速响应。  

---  

## 5️⃣ Bug 与稳定性  

| 严重程度 | Issue # | 简述 | 状态 | 是否已有 Fix PR |
|----------|--------|------|------|-----------------|
| **高** | **#6607** (CLOSED) | Render 部署提前退出 128，导致服务不可用。 | 已关闭 | ✅ PR #6611 已解决 |
| **中** | **#6592** (CLOSED) | 中键自动滚动被页面强制恢复到底部，用户无法顺畅浏览。 | 已关闭 | ✅ PR #6612 已解决 |
| **中** | **#6593** (CLOSED) | “滚动到底部”按钮在平滑滚动期间闪烁，影响 UI 体验。 | 已关闭 | ✅ PR #6605 已解决 |
| **中** | **#6596** (CLOSED) | Feishu 富文本消息附件被丢失。 | 已关闭 | ✅ PR #6604 已解决 |
| **低** | **#6619** (OPEN) | 心跳输出泄漏到错误房间。 | 待处理 | 🚧 尚无对应 PR（已在 #6613、#6617 中讨论） |
| **低** | **#6620** (OPEN) | 抑制的 `message` 调用返回成功而非抑制状态。 | 待处理 | 🚧 尚无对应 PR（需求已在 PR #6613 中提及） |

> **总体**：已关闭的 Bug 均在同一天内通过 PR 快速修复，说明维护者对 **用户可视化和渠道兼容** 的响应速度较快。未解决的两项低优先级 Bug 已在社区中得到关注，预计将在下一个迭代周期内得到处理。  

---  

## 6️⃣ 功能请求与路线图信号  

| 编号 | 需求概述 | 关联 PR / 进展 | 可能纳入的版本 |
|------|----------|----------------|----------------|
| **#6620** | 抑制内部 `message` 调用时返回明确的 *“已抑制”* 标记，而不是成功应答。 | 相关讨论已在 PR #6613（跨会话输入拥有权）中出现，暂无实现代码。 | **v0.4.x（次要迭代）** |
| **#6619** | 心跳输出应绑定到生成该输出的会话/房间，防止跨房间泄漏。 | 已在 PR #6617（关联聊天请求与重连）以及 #6613 中提出改进思路。 | **v0.4.x** |
| **#6614** | 移除独立的 API 服务器 (`nanobot serve`)。 | 已合并 → **重大架构变更**，预计在下一个 major release（v0.5）中正式弃用。 | **v0.5** |
| **#6615** | 退役旧的 OpenAI API selector（`apiType`/`api_type`）。 | 已合并 → 迁移提示已加入文档。 | **v0.5** |
| **#6616** | 将文件操作统一为受限作用域的 API（读/写/编辑/搜索）。 | 已合并 → 为未来的 **插件化文件系统** 打基础。 | **v0.5** |
| **#5826** (OPEN) | 使用 SQLite FTS5 加速会话历史检索。 | 仍在开发中，暂无合并时间表。 | **后续 minor/major** |

> **路线图信号**：当前 PR 集中在 **代码清理、渠道兼容、部署简化**，表明 NanoBot 正在为 **更易维护的核心** 做铺垫，同时对 **跨房间/跨会话行为** 的细节修正正进入功能实现阶段。  

---  

## 7️⃣ 用户反馈摘要  

- **部署难点**：Render 部署文档未明确说明 `dockerCommand` 与容器入口的关系，导致用户在首次部署时遇到 “exit 128”。社区快速提交 Issue 并得到修复，体现了文档完善的迫切需求。  
- **多渠道使用痛点**：Feishu 消息附件丢失以及跨房间心跳泄漏，反映出 **渠道抽象层的统一性不足**。用户期望所有渠道都能完整保留原始消息结构。  
- **交互细节**：WebUI 中的中键滚动、滚动到底部按钮的闪烁、粘贴路径时的附件检测失败，都属于 **微交互体验**，但对长期使用者的满意度影响显著。团队已在同一天内完成多项 UI 修复，说明对用户体验的重视。  
- **内部调试信息**：开发者希望在内部 heartbeat 期间能够清晰辨识 “已抑制” 与 “成功发送” 的区别，以免在调试脚本时产生误判。  

---  

## 8️⃣ 待处理积压（长期未响应）  

| 编号 | 标题 | 创建时间 | 当前状态 | 建议关注点 |
|------|------|----------|----------|------------|
| **#6194** | `fix(api): release idle session locks` | 2026‑10‑13 | Open | 仍未合并，涉及 API 锁泄漏的根本问题，若不处理可能导致长期会话资源耗尽。 |
| **#5826** | `perf(session): accelerate canonical history search with FTS5` | 2026‑09‑20 | Open | 性能优化关键，尤其对大规模部署的搜索响应时间有显著提升潜力。 |
| **#6620** | `Suppressed message-tool sends...` | 2026‑11‑09 | Open | 已在社区讨论中提出需求，建议在下个迭代中实现明确的抑制返回。 |
| **#6619** | `Heartbeat turns deliver task output to the most recently updated room` | 2026‑11‑09 | Open | 与 #6613、#6617 中的会话路由改动直接关联，需同步处理。 |
| **#6613** | `fix(sessions): preserve cross-session input ownership and history` | 2026‑11‑09 | Open | 关键的跨会话一致性修复，仍在审查中，建议加速合并以支撑 #6619 的实现。 |

---  

**结论**：NanoBot 在过去 24 h 内保持高活跃度，核心团队正集中力量解决 **UI 稳定性、渠道兼容性以及内部会话管理** 三大块。虽未发布新版本，但已有足够的修复与重构准备在即，将在下一轮 **v0.4.x** 小版本中交付。社区的两条新 Issue 已指向未来的功能方向，值得维护者在下周的里程碑规划中优先考虑。  

---  

*本报告仅基于公开的 GitHub 数据编制，若有遗漏或误差，敬请指出。*  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告**  
*报告日期：2026‑11‑10*  
*数据来源：GitHub 仓库 sipeed/picoclaw（截至 24 小时内的 Issues/PR 活动）*

---

## 1. 今日速览
- 今日 **Issues** 完全没有新增、活跃或关闭记录，社区讨论相对沉寂。  
- **Pull Requests** 共有 4 条变动：3 条仍处于 **OPEN**（待合并），1 条已 **CLOSED**（可能已合并）。  
- 活跃度主要集中在几条功能/修复 PR 上，整体开发节奏保持稳步前进，暂无突发事故或重大回归。

---

## 2. 版本发布
> **（本日无新 Release，故略）**

---

## 3. 项目进展
| PR 编号 | 状态 | 关键贡献 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#3448** | CLOSED (已合并/关闭) | **feat(provider): add Runcrate OpenAI‑compatible provider**<br>新增 `runcrate/` 前缀，默认基址 `https://api.runcrate.ai/v1`。 | 为用户提供另一条低成本、GPU 加速的 OpenAI 兼容入口，提升生态多样性。 | <https://github.com/sipeed/picoclaw/pull/3448> |
| **#3463** | OPEN (待合并) | **fix(skills): deduplicate installed skills per root**<br>修复 `picoclaw skills install` 在不同目录但相同 front‑matter `name` 时误报 “registry archive is not a valid skill”。 | 直接解决 **#3462** 报告的安装冲突，提升插件系统的健壮性。 | <https://github.com/sipeed/picoclaw/pull/3463> |
| **#3466** | OPEN (待合并) | **feat(tools): send X‑Pplx‑Integration header on Perplexity web search**<br>在 Perplexity 搜索请求中加入 `X-Pplx-Integration: picoclaw` Header。 | 为 Perplexity 提供更精准的流量归因，可能带来统计或配额优化。 | <https://github.com/sipeed/picoclaw/pull/3466> |
| **#3455** | OPEN (标记 stale) | **Fix/nvidia model id termux shell**<br>尝试修正 Termux 环境下 NVIDIA 模型 ID 解析问题。 | 主要面向在 Android/Termux 上运行 GPU 加速模型的用户，若合并将提升跨平台兼容性。 | <https://github.com/sipeed/picoclaw/pull/3455> |

**项目前进度评估**  
- 已合并的 Runcrate Provider 为平台增加了第三方云服务选项，标志着 **多云支持** 正在快速扩展。  
- 正在审查的两项功能（技能去重、Perplexity Header）分别针对 **插件稳定性** 与 **搜索服务可观测性**，预计在下轮发布中进入候选阶段。  

---

## 4. 社区热点
| 热点 PR | 近期互动 | 关注点分析 |
|--------|----------|------------|
| **#3455** (Fix/nvidia model id termux shell) | 最后更新 2026‑11‑09，已标记 **stale**，但仍是唯一涉及 **GPU/Termux** 的改动。 | 说明社区中有一定量的移动端或轻量化部署需求，期待在 Android 环境下也能使用 PicoClaw。 |
| **#3466** (Perplexity X‑Pplx‑Integration) | 同日创建并更新，暂无评论。 | 表明维护者在追踪第三方搜索服务的使用情况，可能是对 **搜索质量监控** 的前置工作。 |

*综合来看，**跨平台兼容性（尤其是移动端）** 与 **外部搜索服务的可观测性** 是当前社区最关心的话题。*

---

## 5. Bug 与稳定性
| 严重程度 | Bug 描述 | 关联 PR | 状态 |
|----------|----------|--------|------|
| **高** | `picoclaw skills install` 报错 “registry archive is not a valid skill”，当不同目录下的 skill 拥有相同 front‑matter `name` 时触发。（#3462） | **#3463** – 已提交修复，待合并。 | 待处理 |
| **中** | Termux 环境下 NVIDIA 模型 ID 解析失败，导致 GPU 加速不可用。 | **#3455** – 已提交修复，标记 stale，尚未确定是否合并。 | 待决策 |
| **低** | 无其他已报告的回归或崩溃。 | – | – |

*总体而言，近期的 Bug 主要集中在插件管理和跨平台运行时，两项均已有明确的修复 PR。*

---

## 6. 功能请求与路线图信号
| 功能 | 来源 | 与现有 PR 的对应关系 | 预计进入下一版本的可能性 |
|------|------|----------------------|--------------------------|
| **Runcrate OpenAI‑compatible Provider** | PR **#3448**（已合并） | 已实现 | 已在当前发布候选中 |
| **Perplexity 搜索请求自定义 Header** | PR **#3466** | 新增 Header | 若审查通过，极可能在下个 Minor 版中出现 |
| **技能去重逻辑改进** | PR **#3463**（解决 #3462） | 防止同名 skill 冲突 | 高优先级，预计在下一次合并窗口中上线 |
| **Termux / Android GPU 支持** | PR **#3455** | 针对移动端模型 ID 解析 | 受关注度较低且标记 stale，除非社区再次推动，短期内可能不进入正式发布。 |

---

## 7. 用户反馈摘要
- **暂无 Issues**，因此直接的用户反馈较少。  
- 从 PR 讨论（尤其是 #3455）可以推测 **移动端部署** 是潜在需求，但目前缺乏足够的社区评论来确认需求强度。  
- 对 **多云提供商**（Runcrate、Novita、NEAR AI Cloud） 的支持已经得到正面反馈，表明用户希望在不同云平台之间灵活切换。

*建议：在即将到来的 Release Note 中加入对新 Provider（Runcrate）的使用案例，以激励更多用户提交真实使用反馈。*

---

## 8. 待处理积压
| 编号 | 类型 | 当前状态 | 备注 |
|------|------|----------|------|
| **#3455** | PR | OPEN (stale) | 关键的 Termux‑GPU 修复，若社区仍有需求，请维护者重新评估合并可能性。 |
| **#3463** | PR | OPEN (待合并) | 高优先级 Bug 修复，建议在下轮合并窗口中优先处理。 |
| **#3466** | PR | OPEN (待合并) | 功能性改动，影响外部搜索服务的统计，建议尽快审查。 |
| **#3462** (Issue) | Bug | 已关闭（通过 PR #3463 修复） | 已解决，记录为已关闭的 Bug。 |

*提醒：保持对标记 **stale** 的 PR 进行定期回顾，防止重要功能因长期未决而流失社区热情。*

---

**结论**  
本日项目整体保持 **健康、低风险** 的运行状态。核心开发工作聚焦在 **插件系统的健壮性** 与 **多供应商兼容性**，两者均已进入合并前的审查阶段。唯一需要关注的潜在风险是移动端 GPU 支持的修复（#3455）是否会因长期未决而导致用户流失。建议维护者在本周内对该 PR 进行复审或在社区中发起需求投票，以决定后续处理路线。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报（2026‑11‑10）**  
*来源：GitHub（qwibitai/nanoclaw）*  

---

## 1. 今日速览  
- **活跃度**：过去24 h 产生 48 条 PR 更新（40 条待合并，8 条已合并/关闭），无新 Issue。  
- **发布**：发布首个 2026‑11‑0x Beta，说明项目进入月度迭代。  
- **整体健康**：代码量持续增长，主要在核心适配器与安全/硬化功能上。社区讨论集中在审批卡、渠道适配与工具扩展。  

> **结论**：项目保持高频率合并，核心功能逐步完善；缺少 Issue 说明社区反馈较为隐蔽，需进一步鼓励用户提交使用场景。

---

## 2. 版本发布  
### v2026.11.0‑beta.1  
- **发布时间**：2026‑11‑10  
- **变更亮点**  
  - **安全硬化**：引入新的 Docker 镜像 `v2026.10.0-20261109T1401`，在 PR #4331 中完成镜像升级与签名校验。  
  - **审批卡改进**：修复 Slack/Discord 文字截断（PR #4147、#4168、#4171）与点击顺序安全（#4168）。  
  - **渠道适配**：加入 Proton Mail 本地 Bridge（PR #4218/3726）以及 Mattermost 线程匹配改进（#3797）。  
  - **工具扩展**：Keenable MCP 工具技能（#3697）已实现，支持 `/add-keenable-tool`。  
- **破坏性变更**  
  - 采用新版 `pnpm-lock.yaml` 生成机制，旧的 `pnpm install` 可能导致冲突（已在 #4312 修复）。  
  - `NANOCLAW_EGRESS_LOCKDOWN` 变量现在必须放在 `.env`，否则会回退到默认网络（#4314）。  
- **迁移注意**  
  - **升级到 beta**：请确保 CI 使用 `read‑only` token（#4318）并在 `main` 上运行。  
  - **更新镜像**：所有已部署的 Agent 需迁移至 `v2026.10.0-20261109T1401`。  
  - **权限校验**：若使用 `--slack-agents`，请检查 Slack picker 的权限配置（#3382）。  

> **建议**：在生产环境中先以 `beta` 预发布测试，确认审批卡、渠道适配与工具技能无误后再切换至 stable。

---

## 3. 项目进展  
| PR | 状态 | 关键改动 | 推进价值 |
|----|------|----------|----------|
| **#4331** | 已合并 | 镜像升级，签名验证 | 强化安全，减少镜像篡改风险 |
| **#4168** | 已合并 | 点击后才处理审批卡 | 防止误操作，提升用户体验 |
| **#4171** | 已合并 | 多渠道点击安全 | 统一点击逻辑，减少碎片化错误 |
| **#4314** | 已合并 | Egress 防护修复 | 防止未授权网络访问，提升安全性 |
| **#4312** | 已合并 | 解决 `pnpm-lock.yaml` 合并冲突 | 简化更新流程，减少手工干预 |
| **#4329** | 已合并 | 按回复语言生成 | 防止语言漂移，提升对话一致性 |
| **#4328** | 已合并 | 问题卡保持标题 | 保持上下文，提升用户体验 |
| **#4330** | 已合并 | 拒绝低排序 pre‑release | 防止错误标签发布，保持版本序列 |  

> **总体**：近日合并的 PR 主要聚焦于 **安全硬化、审批卡逻辑、渠道适配与工具支持**，让项目朝着可扩展且安全的方向稳步前进。

---

## 4. 社区热点  
| PR | 讨论量 | 关键诉求 | 链接 |
|----|--------|----------|------|
| **#4331** | 高 | 需要官方提供 hardened 镜像，确保安全 | https://github.com/nanocoai/nanoclaw/pull/4331 |
| **#4156** | 中 | 防止审批卡文字被转成链接/mention | https://github.com/nanocoai/nanoclaw/pull/4156 |
| **#4147** | 中 | 统一审批卡完整显示，避免 Slack/Discord 截断 | https://github.com/nanocoai/nanoclaw/pull/4147 |
| **#3697** | 中 | 增加 Keenable MCP 工具技能 | https://github.com/nanocoai/nanoclaw/pull/3697 |
| **#4218** | 中 | 添加 Proton Mail 本地适配 | https://github.com/nanocoai/nanoclaw/pull/4218 |
| **#4318** | 低 | CI 只读 token 与版本校验 | https://github.com/nanocoai/nanoclaw/pull/4318 |

> **观察**：PR 讨论集中在 **安全**（镜像硬化）与 **交互体验**（审批卡、语言一致性）两大维度；社区对工具扩展（Keenable、Proton Mail）的关注也在增长。

---

## 5. Bug 与稳定性  
| PR | 类型 | 影响 | 解决 | 备注 |
|----|------|------|------|------|
| **#4057** | Bug | `docker stop` 误报失败，影响 Agent 停止 | 等待 `--rm` 处理完成 | 已合并 |
| **#3802** | Bug | `mention‑sticky` 线程错误导致误唤醒 | 修复线程判断逻辑 | 已合并 |
| **#3797** | Bug | Mattermost 线程匹配错误，导致多次响应 | 修正线程 ID 处理 | 已合并 |
| **#4168** | Bug | 审批卡点击前就已更新 | 延迟更新，等待 host 决策 | 已合并 |
| **#4171** | Bug | 多渠道点击前未确认 | 同步 `#4168` 逻辑 | 已合并 |
| **#4328** | Bug | 已回答的 `ask_user_question` 卡丢失问题文本 | 保持标题与选项 | 已合并 |
| **#4314** | Bug | 读不到 `.env` 时自动开启 Egress | 检测文件可读性 | 已合并 |
| **#4312** | Bug | `pnpm-lock.yaml` 合并冲突导致更新中断 | 自动重建 lockfile | 已合并 |

> **稳定性评估**：已修复的 Bug 均为 **中到高** 影响，且在当前发布中已被解决。未合并的 Bug 主要为功能改进，暂无严重回归风险。

---

## 6. 功能请求与路线图信号  
- **Keenable MCP 工具技能**（#3697）已完成，实现 `/add-keenable-tool`，将被纳入 **v2026.12.0**。  
- **Proton Mail 本地 Bridge**（#4218/3726）已实现核心适配，后续会推出 `add-proton-mail` skill。  
- **语言一致性**（#4329）已改进，计划在下次发布中统一为「回复语言匹配」规则。  
- **高级审批逻辑**（#4168/4171）已修复，后续可加入更多审批条件。  
- **网络硬化**（#4314）已强化，计划在未来版本中提供更多可选网络策略。

> **路线图**：核心功能已在 beta 版本完成，后续迭代将聚焦于 **多渠道支持、工具生态扩展** 与 **安全策略细化**。

---

## 7. 用户反馈摘要  
> *虽然当前无 Issue，但 PR 讨论中可见用户痛点：*  
> - **审批卡显示**：Slack/Discord 等平台文字被截断，导致信息丢失。  
> - **语言漂移**：Agent 在多语言环境中会随意切换，影响可读性。  
> - **镜像安全**：担心镜像篡改导致 Agent 被植入恶意代码。  
> - **工具集成**：需求更多第三方工具与服务（如 Keenable、Proton Mail）直连。  

> **满意点**：社区对安全硬化与审批卡改进给予积极反馈，认为这些改动提升了使用可靠性。  

---

## 8. 待处理积压  
| PR | 重要程度 | 说明 | 建议关注 |
|----|-----------|------|----------|
| **#4147** | 高 | 仍在待审，需确保审批卡长度不被截断 | 加速评审，影响多渠道发布 |
| **#4156** | 中 | 文字转链接问题仍在讨论，影响用户信任 | 评估是否合并到 `#4147` |
| **#3697** | 高 | Keenable 技能已完成但未合并，等待核心集成 | 计划在 v2026.12.0 |
| **#4218** | 高 | Proton Mail Bridge 已实现，需集成到主干 | 预计在 v2026.12.0 |
| **#4312** | 中 | lockfile 冲突问题已修复，但仍需确认 CI 流程 | 监测后续合并 |
| **#4328** | 中 | 已回答卡保持问题文本 | 关注后续兼容性 |
| **#4314** | 高 | Egress 防护已修复，但仍需验证跨平台 | 监测生产部署 |

> **提醒**：上述 PR 均为关键功能或安全改进，建议维护者优先推进评审与合并，以确保下一版本的功能完整性。

---  

**结语**：NanoClaw 在 2026‑11‑10 展现了稳定的迭代节奏，主要聚焦安全硬化与交互体验的提升。未来应鼓励用户通过 Issues 提供更多使用场景，进一步完善社区支持。

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

# LobsterAI 项目日报  
**日期：2026‑11‑10**

---

## 1. 今日速览  
- **活跃度**：过去 24 h 共 **16 条 PR**（10 条已合并/关闭，6 条待合并）和 **2 条 Issues**（1 条已关闭，1 条仍在讨论）。  
- **发布状态**：暂无新版本发布。  
- **开发重心**：以 bug 修复、依赖升级、性能优化为主，未触及大功能变更。  
- **总体健康**：代码质量稳步提升，安全性与性能并行推进，社区互动活跃。

---

## 2. 版本发布  
*无新版本发布* – 本日未产生正式发布包。  

---

## 3. 项目进展  
| PR | 状态 | 主要内容 | 影响 |
|---|---|---|---|
| [#3038](https://github.com/netease-youdao/LobsterAI/pull/3038) | ✅ 合并 | 解决子 Agent 双轨存储导致 UI/运行时不一致 (#3035) | 修复 UI 空白、Agent 自改被静默回滚 |
| [#3029](https://github.com/netease-youdao/LobsterAI/pull/3029) | ✅ 合并 | 延迟大型工具目录，开启 OpenClaw Tool Search | 大幅减少 45k tokens 的首次调用开销，提升响应速度 |
| [#3034](https://github.com/netease-youdao/LobsterAI/pull/3034) | ✅ 合并 | 让模型编辑器的“支持图像输入”切换能持久化 | 修复 MiMo V2.6 Pro 图像支持失效 |
| [#3033](https://github.com/netease-youdao/LobsterAI/pull/3033) | ✅ 合并 | 当默认工作目录不可访问时，给出“目录不可用”提示 | 防止因外置盘卸载导致的任务启动崩溃 |
| [#3021](https://github.com/netease-youdao/LobsterAI/pull/3021) | ✅ 合并 | 依赖 `electron` 升级至 43.8.6 | 提升安全性与兼容性 |
| [#3019](https://github.com/netease-youdao/LobsterAI/pull/3019) | ✅ 合并 | `@univerjs/*` 依赖整体升级至 1.3.x | 兼容新版编辑器插件 |
| [#3022](https://github.com/netease-youdao/LobsterAI/pull/3022) | ✅ 合并 | `fast‑xml‑parser` 升级至 5.11.2 | 修复 XML 解析潜在错误 |
| [#3036](https://github.com/netease-youdao/LobsterAI/pull/3036) | ✅ 合并 | `fast‑xml‑parser` 进一步升级至 5.12.0 | 加强性能与安全 |
| [#3020](https://github.com/netease-youdao/LobsterAI/pull/3020) | ✅ 合并 | `docx‑editor` 相关依赖更新 | 改善文档导入/导出体验 |
| [#3032](https://github.com/netease-youdao/LobsterAI/pull/3032) | ✅ 合并 | 重新开启 Expert Plaza | 让用户能再次浏览专家列表 |
| [#3031](https://github.com/netease-youdao/LobsterAI/pull/3031) | ✅ 合并 | 为 DSH 运行时实例关联上下文 | 便于多进程请求追踪 |
| [#3030](https://github.com/netease-youdao/LobsterAI/pull/3030) | ✅ 合并 | 翻译配额耗尽后引导登录 | 改善用户体验，降低失误率 |

> **整体进度**：今日共 **10 条 PR** 成功合并，涵盖 **功能修复**、**性能优化** 与 **依赖升级**，项目在稳定性与安全性上迈出了显著一步。

---

## 4. 社区热点  
| 主题 | 说明 | 链接 |
|---|---|---|
| **#2738** (已关闭) | “支持不重启网关切换工作区” 请求。讨论中提到网关重启 >10 s 的性能瓶颈，用户反馈频繁切换体验差。 | <https://github.com/netease-youdao/LobsterAI/issues/2738> |
| **#3035** (未关闭) | “子 Agent 双轨存储导致 UI 与运行时不一致” 的深度讨论。该问题导致 Agent 自改被静默回滚，严重影响调试与自定义。 | <https://github.com/netease-youdao/LobsterAI/issues/3035> |
| **#2590** (开放) | “硬化 MCP stdio 与外部 URL” 的安全性讨论。讨论聚焦于命令注入与外链劫持风险。 | <https://github.com/netease-youdao/LobsterAI/pull/2590> |
| **#2818** (开放) | 新增 Atlas Cloud 作为模型提供商的提议。讨论围绕 API 兼容性、UI 展示以及安全认证。 | <https://github.com/netease-youdao/LobsterAI/pull/2818> |

> 以上讨论中，**#2738** 与 **#3035** 需求强度最高，已触发多条 PR 与 Bug 修复。

---

## 5. Bug 与稳定性  
| 级别 | Issue/PR | 描述 | Fix | 日期 |
|---|---|---|---|---|
| **Critical** | [#2590](https://github.com/netease-youdao/LobsterAI/pull/2590) | MCP stdio 命令/参数未做完整校验，外链无协议白名单 | 仍在讨论中（开放） | 2026‑11‑09 |
| **High** | [#3035](https://github.com/netease-youdao/LobsterAI/issues/3035) | 子 Agent UI 与运行时 Persona 存储不一致，导致自改被回滚 | PR #[3038](https://github.com/netease-youdao/LobsterAI/pull/3038) 已合并 | 2026‑11‑09 |
| **Medium** | [#3029](https://github.com/netease-youdao/LobsterAI/pull/3029) | 大型工具目录导致首请求 Token 高峰 | 已通过 defer 方案优化 | 2026‑11‑09 |
| **Low** | 依赖升级导致的潜在兼容问题 | 依赖 `electron`、`fast-xml-parser` 等已升级，已通过 CI 通过 |  |  |

> **结论**：Bug 修复率高，安全性问题仍待进一步评估。

---

## 6. 功能请求与路线图信号  
| 请求 | 相关 PR | 路线图可行性 | 备注 |
|---|---|---|---|
| **无重启网关切换工作区** (#2738) | 关注中 | 高 | 关键性能痛点，后续版本预计支持 |
| **Atlas Cloud 提供商** (#2818) | PR 开放 | 中 | 需要完成 API 对接与 UI 展示 |
| **Requesty 作为模型提供商** (#2766) | 已完成 | 已实现 | 成功加入，可在下一版做进一步优化 |
| **双轨存储 Bug** (#3035) | PR #3038 已修 | 已修复 | 继续监测回归 |
| **翻译配额引导登录** (#3030) | 已合并 | 已实现 | 已经上线 |

> **路线图**：基于社区反馈，**无重启切换** 与 **Atlas Cloud** 是下一个里程碑；**Requesty** 已经投入使用，可视为成功案例。

---

## 7. 用户反馈摘要  
- **性能痛点**：#2738 用户强调网关重启耗时 >10 s，导致多次切换工作区体验极差。  
- **功能一致性**：#3035 用户在 UI 设置中看到空白页签，实际上工作区已有完整 `IDENTITY.md`/`SOUL.md`。  
- **安全关注**：#2590 提醒用户 MCP stdio 及 URL 处理存在潜在注入风险。  
- **使用场景**：#3033 报告在外置磁盘被拔掉时任务启动失败，提示“当前账号无权访问该模型”，用户希望获得更友好的错误信息。  

> **结论**：用户关注的核心在于 **性能稳定**、**功能一致性** 与 **安全**。项目已针对这些痛点做了相应改进。

---

## 8. 待处理积压  
| Issue/PR | 状态 | 关注点 | 链接 |
|---|---|---|---|
| #3035 | 仍未关闭 | 双轨存储 bug 仍需监控回归 | <https://github.com/netease-youdao/LobsterAI/issues/3035> |
| #2590 | 仍未关闭 | MCP stdio & URL 安全 | <https://github.com/netease-youdao/LobsterAI/pull/2590> |
| #2818 | 开放 | Atlas Cloud 集成 | <https://github.com/netease-youdao/LobsterAI/pull/2818> |
| #3037 | 开放 | Electron 43.8.7 依赖升级 | <https://github.com/netease-youdao/LobsterAI/pull/3037> |
| #3036 | 开放 | fast-xml-parser 5.12.0 进一步升级 | <https://github.com/netease-youdao/LobsterAI/pull/3036> |

> **建议**：优先评估安全相关的 #2590，后续版本将把无重启切换工作区（#2738）与 Atlas Cloud（#2818）纳入开发计划。

---

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-11-10)

## 1. 今日速览
Moltis 项目在过去 24 小时内保持低活跃度，整体处于平稳静默期。过去一天内无新版本发布，无已合并的 PR，仅有一项新的用户报错和一项第三方贡献者提交的新功能 PR 处于待审核状态。项目核心链路无阻塞性变更，社区互动指数较低，建议关注新提交的 Provider 集成进度及桌面端模型选择器的逻辑修复。

## 2. 版本发布
无。过去 24 小时内未检测到任何新的 Release 标签或版本更新。

## 3. 项目进展
今日无已合并（Merged）或已关闭（Closed）的 Pull Request。项目核心代码库在过去 24 小时未发生实际变更，当前主线功能无新增落地内容。

## 4. 社区热点
今日社区热度极低，仅有两则新动态，且均无评论互动：

*   **[PR] 新 Provider 集成请求**: [feat(providers): add Runcrate provider](https://github.com/moltis-org/moltis/pull/1323)
    *   **分析**: 用户 `heydryft` 感谢维护者将 OpenAI 兼容 Provider 改为表驱动（table-driven）设计，这使得添加新 Provider（如 Runcrate）变得非常轻量，仅需添加 `OpenAiCompatDef` 条目。这反映了项目架构的可扩展性得到了贡献者的认可，但也暗示了目前对第三方 LLM 源集成的大量需求。
*   **[Bug] 桌面端模型选择器逻辑错误**: [[Bug]: Desktop app model picker lists every reasoning effort as a separate model](https://github.com/moltis-org/moltis/issues/1322)
    *   **分析**: 用户 `chloecaffeinexo` 报告桌面端 AppImage 版本中，模型选择器错误地将同一模型的推理努力级别（reasoning effort）视为独立模型展示。这是一个 UI/UX 层面的逻辑缺陷，直接影响用户选择模型的直观性。

## 5. Bug 与稳定性
今日报告 1 个 Bug，暂无关联的修复 PR。

*   **[中等优先级] 桌面端模型选择器展示逻辑错误**
    *   **状态**: Open
    *   **描述**: 在 `daemon` 和 `desktop 20261023.01` 版本中，桌面端应用将 `@reasoning-<level>` 变体错误地渲染为独立的模型条目。例如，DeepSeek V4 Flash 会显示出 low、medium、high 等多个“模型”选项，而非在下拉菜单中作为同一模型的子参数或细分选项。
    *   **影响范围**: Linux x86_64 AppImage 用户，连接本地 daemon 时。
    *   **现有 Fix**: 无。该 Issue 创建后尚无维护者介入或关联 PR。
    *   **链接**: [Issue #1322](https://github.com/moltis-org/moltis/issues/1322)

## 6. 功能请求与路线图信号
*   **[高潜力] Runcrate Provider 集成**
    *   **信号**: PR [#1323](https://github.com/moltis-org/moltis/pull/1323) 已提交。
    *   **判断**: 由于项目架构已支持“表驱动”的 OpenAI 兼容 Provider 扩展，此 PR 的代码复杂度极低，审查工作量小。如果 Runcrate 是一个稳定有效的 LLM 托管服务，此 PR 极有可能在短期内被合并。这预示着 Moltis 正在积极扩展其支持的 LLM 供应商列表，以覆盖更多小型或新兴的推理服务。

## 7. 用户反馈摘要
*   **满意度信号**: 贡献者 `heydryft` 在 PR 描述中明确表达了对现有代码架构（OpenAI-compatible providers table-driven）的赞赏，认为其使得扩展新 Provider 变得“容易遵循”（easy pattern to follow）。这表明项目的内部架构设计促进了社区贡献。
*   **痛点反馈**: 用户 `chloecaffeinexo` 指出桌面端在解析 daemon 返回的模型元数据时，缺乏对“推理努力级别”与“基础模型”的层级区分逻辑，导致 UI 显示混乱。这反映了前端渲染逻辑未完全解耦模型标识与配置参数。

## 8. 待处理积压
*   **PR #1323 (Runcrate Provider)**: 创建于 2026-11-09，目前处于 Open 状态，无评审评论。鉴于其低风险和高扩展性，建议维护者尽快 review 并合并，以丰富 Provider 生态。
*   **Issue #1322 (Desktop Model Picker Bug)**: 这是一个展示型 Bug，虽不阻塞核心功能，但影响用户体验。考虑到其重现步骤清晰且涉及版本较新（20261023.01），建议在下个桌面端热修复版本中优先处理。

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

# ZeroClaw 开源项目动态日报 (2026-11-10)

## 1. 今日速览
过去 24 小时内，ZeroClaw 项目保持极高的研发活跃度：**Issues 更新 25 条**（新开/活跃 18 条，关闭 7 条），**PR 更新 50 条**（待合并 41 条，合并/关闭 9 条）。
今日核心动向集中在 **ZeroCode 远程 OIDC 无缝认证体系演进**、**Web 控制台语音/费用感知增强**，以及 **Channel 渠道执行可靠性修复**。
项目整体健康度良好，但目前 CI 遭受依赖项安全漏洞阻断（S1 级别），合并队列暂时受阻，已有对应修复 PR 正处于验证中。

---

## 2. 版本发布
今日无新版本发布。

---

## 3. 项目进展

今日多个关键安全与稳定性问题得到解决，同时核心功能重构 PR 取得显著进展：

*   **安全与审计修复**：
    *   关闭了高风险安全 Bug [#10359](https://github.com/zeroclaw-labs/zeroclaw/issues/10359)，修复了 `AuditLogger` 在写入失败前提前递增哈希链状态导致后续审计验证失效的问题。
    *   关闭了权限选择器级联 Bug [#11009](https://github.com/zeroclaw-labs/zeroclaw/issues/11009)，防止 Agent 别名重命名时权限配置失效。
    *   关闭了 Discord 渠道漏洞 [#12064](https://github.com/zeroclaw-labs/zeroclaw/issues/12064)，防止白名单中的 Peer Bot 通过明文回复绕过工具授权审批。
*   **渠道与工具可靠性推进**：
    *   PR [#11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911) 与 [#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868) 持续迭代，解决了 Channel 轮次中断时已完成工具结果的保留与有界恢复问题，并防止重复工具调用。
    *   PR [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) 推进原生 Rust XMPP 协议支持及 Linux 传统 OMEMO 加密集成。
*   **UI/UX 交互改善**：
    *   关闭了功能需求 [#11919](https://github.com/zeroclaw-labs/zeroclaw/issues/11919)，Web Chat 现已支持默认收起实时推理框（Thinking box）。
    *   关闭了配置界面逻辑 Bug [#12087](https://github.com/zeroclaw-labs/zeroclaw/issues/12087)，修复了工具开关触发自动保存与手动保存按钮状态冲突的问题。

---

## 4. 社区热点

1.  **CI 构建完全阻断（S1 级紧急事件）**
    *   **议题/PR**：[#12320](https://github.com/zeroclaw-labs/zeroclaw

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*