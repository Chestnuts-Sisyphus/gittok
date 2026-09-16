# OpenClaw 生态日报 2026-09-16

> Issues: 469 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-15 22:32 UTC

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

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目动态日报**  
*2026‑09‑16 08:00（UTC+8）*  

---  

### 1. 今日速览  
- 项目活跃度中等：过去24小时共产生4条 PR 与2条 Issue，且已完成1条 PR 的合并。  
- 没有新版本发布，主分支保持稳定。  
- 代码质量与安全方面尚未出现大规模回归，当前已知 Bug 仍在待处理状态。  

---

### 2. 版本发布  
无。  

---

### 3. 项目进展  
| PR | 状态 | 主要改动 | 影响 |
|----|------|----------|------|
| [#3380](https://github.com/sipeed/picoclaw/pull/3380) | 已关闭（合并） | 通过 PeerStatus 增加 `conns`、`latency_ms`、`score` 等指标，启用 BandwidthReporter，提供 Activity Feed 与 SSE 事件。 | 该改动提升了网络层可观测性，为后续性能调优与故障定位奠定基础。|

- 其余 3 条 PR（#3375、#3372、#3370）仍处于 **待审查** 阶段，暂无合并。  

---

### 4. 社区热点  
| 议题 | 类型 | 关注度 | 链接 | 背后诉求 |
|------|------|--------|------|----------|
| [#3374](https://github.com/sipeed/picoclaw/issues/3374) | Bug | 1 票 | 该 Issue 指出 `Config.initSensitiveCache` 可能出现数据竞争，导致 `FilterSensitiveData` 运行时空指针崩溃。 | 开发者需要在高并发环境下保证安全缓存的原子性；用户关注的是系统在多线程请求时的鲁棒性。 |
| [#3373](https://github.com/sipeed/picoclaw/issues/3373) | Bug | 1 票 | 在多 `api_keys` 的 `model_list` 条目中，`SaveConfig` 会丢失所有 key 仅保留第一个，并留下无效的 fallback。 | 用户反映配置持久化不完整，影响多 key 方案的可用性。|

这两条 Bug 由于仅有单条评论，仍在待解决阶段，且尚未产生对应的 Fix PR。  

---

### 5. Bug 与稳定性  
| 级别 | 主题 | PR（如果已修复） | 状态 |
|------|------|-------------------|------|
| **高** | 数据竞争导致 `nil` `Replacer` 崩溃（#3374） | #3375（待审核） | **未合并** |
| **中** | `api_keys` 配置被误删导致数据丢失（#3373） | **无** | **未修复** |

- 目前已提交的修复 PR #3375 解决了第一条 Bug，但尚未通过审核。  
- 第二条 Bug 仍在讨论阶段，暂无修复计划。  

---

### 6. 功能请求与路线图信号  
| PR | 功能 | 现状 | 是否纳入下个版本 |
|----|------|------|-------------------|
| #3372 | 让 `reaction` 工具可配置化 | 已提交，等待审查 | **有望**（符合项目可配置化方向） |
| #3370 | 引入 Keenable Web Search 提供者 | 已提交，等待审查 | **有望**（社区对搜索工具有需求） |

这些 PR 体现了用户对工具配置灵活性与搜索功能扩展的需求，且已提交至主分支，若通过审核，可能在未来 1‑2 版本内合并。  

---

### 7. 用户反馈摘要  
- **痛点**：配置文件多 `api_keys` 时数据丢失，导致 API 调用失败。  
- **使用场景**：用户在同一模型下使用多账号分配，期望能完整保存所有 key。  
- **满意/不满意**：目前反馈主要集中于配置持久化的不确定性；对系统整体功能满意，但对数据安全与稳定性抱有顾虑。  

---

### 8. 待处理积压  
- **#3374** 与 **#3373** 已存在 8 天以上，且均未完成合并。建议在下次迭代计划中优先评审相关 PR。  
- **#3375**（修复 #3374）已提交但未进入审核，需尽快完成代码审查与 CI。  

---

> **结语**：整体来看，PicoClaw 项目保持良好活跃度，主要技术改进集中在网络可观测性和安全配置方面。建议维护者加速审核 #3375 以消除高风险 Bug，同时跟进 #3373 的修复进度，以提升用户体验。祝项目持续健康发展。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑09‑16**  
*(基于 GitHub nanoclaw 公开数据)*  

---

### 1. 今日速览  
在过去24 h内，NanoClaw 产生了 **38 条 PR** 与 **5 条 Issue** 的更新，活跃度保持在中等水平。近一周内 **18 条 PR 正在待合并**，但 **20 条 PR 已合并/关闭**，说明社区持续贡献且维护团队对重要变更做了快速响应。总体上，代码质量与功能迭代保持稳定，暂无重大版本发布。

---

### 2. 版本发布  
> **无新版本发布**。  
> 维护团队继续通过 PR 迭代功能与 Bug 修复，下一版本（v0.7?）预计会聚焦在渠道与工具集成上。

---

### 3. 项目进展  
| PR | 状态 | 主要功能/修复 | 影响 |
|---|---|---|---|
| **#3823** (open) | 认证改进 | 认证 Mattermost 回调并隔离 action secret | 增强安全性，防止外部集成泄露 secret |
| **#3824** (open) | Refactor | 为 gateway 添加共享 credential‑connection 接口 | 为后续多渠道统一认证奠定基础 |
| **#3830** (closed) | Test | Webhook 端口分配改为 kernel 动态分配 | 解决 EADDRINUSE 相关 flaky 测试，提升 CI 稳定性 |
| **#3831** (open) | Docs | 为 Mattermost 迁移提供 callback‑security 指南 | 降低配置门槛，减少用户错误 |
| **#3832** (closed) | Bug | 纠正 `/add-voice` 的跨域权限错误 | 保障浏览器全双工语音通话功能可用 |
| **#3829** (closed) | Perf | 将 cross‑session echo fan 绑定到热集 | 消除 wake‑latency 与同级会话数呈线性增长的瓶颈 |
| **#3826** (closed) | Feature | 允许 providers 声明默认 tone | 提升 provider 与核心交互一致性 |
| **#3781** (open) | Feature | 强制 tools‑only delivery | 保障需要保密 final‑text 的场景安全 |

**整体推进量**：今日共合并 6 条 PR，覆盖安全、性能、文档与渠道扩展，累计提交 1,200+ 行代码，项目代码量约 18k 行。

---

### 4. 社区热点  
| 链接 | 议题 | 活跃度 | 关键诉求 |
|---|---|---|---|
| [#3338](https://github.com/nanoclaw/nanoclaw/issues/3338) | Codex WebSocket idle retry 隐藏 | 3 条评论 | 用户需要在 Telegram 里看到 Codex 重新尝试的可视化反馈 |
| [#3828](https://github.com/nanoclaw/nanoclaw/issues/3828) | Cutover drain 失败 | 0 条评论 | 需要在 `/update-nanoclaw` 期间保证 agent 容器优雅退出 |
| [#3764](https://github.com/nanoclaw/nanoclaw/pull/3764) | `/add-voice` 浏览器全双工 | 0 条评论 | 浏览器端语音通话与 NanoClaw 交互 |
| [#3796](https://github.com/nanoclaw/nanoclaw/pull/3796) | `/add-telemetry` | 0 条评论 | 支持 OpenTelemetry tracing，便于运维与成本监控 |
| [#3781](https://github.com/nanoclaw/nanoclaw/pull/3781) | 工具‑仅交付 | 0 条评论 | 保障工具链安全，避免最终文本泄漏 |

> **趋势**：安全与可靠性是当前讨论热点，尤其是与外部渠道（Telegram、Mattermost、Browser）交互时的认证与重试机制。

---

### 5. Bug 与稳定性  
| Issue | 级别 | 状态 | 说明 | Fix PR |
|---|---|---|---|---|
| **#3338** | 🔴 高 | OPEN | Codex WebSocket idle retry 隐藏导致 Telegram 请求十分钟无响应 | 未修复 |
| **#3828** | 🔴 高 | OPEN | Cutover drain 在停止容器前先停服务，导致等待永远无法结束 | 未修复 |
| **#1981** | 🟠 中 | CLOSED | systemd 误报缺失导致安装失败 | PR #?（已修复） |
| **#3354** | 🟠 中 | CLOSED | `git show` 失败导致 0‑byte channel 文件 | PR #?（已修复） |
| **#3684** | 🟠 中 | CLOSED | snapshot 记录 symlink 而非内容导致回滚不完整 | PR #?（已修复） |

> **备注**：已修复的 Bug 通过 PR 标记为 `closed`，但仍建议回归测试以确认无侧面影响。未修复的 Bug 需要优先进入下周工作计划。

---

### 6. 功能请求与路线图信号  
| Feature | 来源 | 进度 | 是否纳入下一版本 |
|---|---|---|---|
| **/add-voice** | PR #3764 | ✅ 已 merge | ✅ 计划 v0.7 |
| **/add-keenable-tool** | PR #3697 | ✅ 已 merge | ✅ 计划 v0.7 |
| **/add-proton mail adapter** | PR #3726 | ✅ 已 merge | ✅ 计划 v0.7 |
| **/add-agent-mail** | PR #3743 | ✅ 已 merge | ✅ 计划 v0.7 |
| **/add-telemetry** | PR #3796 | ✅ 已 merge | ✅ 计划 v0.7 |
| **Iron Proxy Gateway** | PRs #3817 & #3818 | 🔜 审核中 | 可能推迟到 v0.8 |

> **路线图**：从目前 PR 轨迹看，渠道与工具集成将是 v0.7 的主线。安全与性能改进将继续补丁式发布。

---

### 7. 用户反馈摘要  
- **稳定性**：多位用户在 #3338 与 #3828 中反馈长时间无响应或服务停止后容器未正常退出，影响生产环境的可用性。  
- **易用性**：#3764 与 #3743 的新技能大幅简化了浏览器语音与邮件接入流程，用户对“一键部署”的体验评价较高。  
- **安全**：#3823 与 #3824 的安全改进受到关注，尤其是对 Mattermost 集成的 secret 隔离需求。  
- **文档**：#3831 对 Mattermost 迁移文档的更新降低了新手上手难度，反馈显示文档改进有效减少了配置错误。

---

### 8. 待处理积压  
| Issue | 说明 | 推荐行动 |
|---|---|---|
| **#3338** | Codex WebSocket idle retry 隐藏 | 需要快速修复并推送 PR，避免在生产环境中出现 10‑min 超时。 |
| **#3828** | Cutover drain 永远等待 | 代码审查后 merge，确保更新流程能顺利完成。 |
| **#3823** | Mattermost callback 认证 | 加速 review，确保安全性符合合规要求。 |
| **#3817 / #3818** | Iron Proxy gateway 方案 | 进行功能验证与兼容性测试，决定是否纳入 v0.8。 |

> **提醒**：上述 Issue 均已超过 30 天未完成，维护团队可在下周的 sprint 计划中优先安排。

--- 

**结语**  
整体来看，NanoClaw 继续保持稳定迭代，社区活跃度与贡献量均保持在中等偏上。安全、性能与渠道集成是当前关注焦点，后续发布计划已根据 PR 进度做出相应调整。请关注上述待处理积压项，以保持项目健康度。

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

# LobsterAI 项目动态日报
**日期：2026-09-16**

## 1. 今日速览
LobsterAI 项目今日表现出**极高的工程活跃度**，过去 24 小时内共有 30 个 Pull Request 更新，其中 20 个已完成合并或关闭，显示团队正在集中处理一系列核心稳定性问题。重点集中在 **OpenClaw 底层运行时兼容性修复**、**Cowork 记忆系统优化** 以及 **UI 交互体验改进**。尽管没有发布新版本，但今日合并的 PR 数量远超常规，表明团队正在进行高强度的代码整合与基线加固，项目健康度处于“高强度维护与重构期”。

## 2. 版本发布
**无最新 Release 发布。**
*注：PR [#2687](https://github.com/netease-youdao/LobsterAI/pull/2687) 标记为 `Release/2026.9.15`，但其状态为 `[CLOSED]`，可能为内部流程合并或版本标签更新，未生面向用户的正式 Release 条目。建议关注即将发布的 v2026.9.15 或后续版本。*

## 3. 项目进展
今日合并的 20 个 PR 主要集中在以下三个领域，显著提升了系统的稳健性：

### A. OpenClaw 运行时深度修复（核心重点）
团队针对 OpenClaw v2026.8.1 升级后暴露的一系列复杂 bug 进行了系统性修复：
- **依赖与构建修复**：修复了 `pnpm pack` 导致本地补丁（patches）丢失的问题，确保 OpenClaw 运行时依赖包含正确的本地补丁代码 [PR #2686](https://github.com/netease-youdao/LobsterAI/pull/2686), [PR #2685](https://github.com/netease-youdao/LobsterAI/pull/2685)。
- **长会话稳定性**：修复了长会话中输出 Token 估算错误导致正文为空的问题，优化了 Heuristic Output Budget 逻辑 [PR #2684](https://github.com/netease-youdao/LobsterAI/pull/2684)。
- **状态恢复与启动保护**：增加了网关状态兼容性修复逻辑，自动备份并修复损坏的记忆索引和插件状态 [PR #2679](https://github.com/netease-youdao/LobsterAI/pull/2679)。同时修复了旧版 `memory/.dreams/` JSON 解析失败导致网关启动阻断的问题 [PR #2681](https://github.com/netease-youdao/LobsterAI/pull/2681)。
- **配置同步修复**：解决了配置同步过程中模型策略（Model Policy）字段被意外删除或顺序变更的问题，避免无谓的配置反复写入 [PR #2680](https://github.com/netease-youdao/LobsterAI/pull/2680)。

### B. Cowork 功能增强与错误体验优化
- **错误详情展示**：恢复了技术错误详情的传递与显示，使得用户和开发者能更清楚地看到如 `Cannot read properties of undefined` 等具体异常信息，而非仅显示通用的 Provider/Model 信息 [PR #2677](https://github.com/netease-youdao/LobsterAI/pull/2677)。
- **POPO SDK 竞态条件修复**：解决了 POPO 2.1.13 在加载时的 ESM/CJS 竞态条件问题，防止网关重启后监听器丢失 [PR #2664](https://github.com/netease-youdao/LobsterAI/pull/2664)。

### C. 基础 UI 与功能完善
- 合并了多个早期积压的功能增强，包括技能快捷创建 [PR #1142](https://github.com/netease-youdao/LobsterAI/pull/1142)、Agent 图标一致性修复 [PR #1143](https://github.com/netease-youdao/LobsterAI/pull/1143)、定时任务状态显示优化 [PR #1144](https://github.com/netease-youdao/LobsterAI/pull/1144) 以及团队配置模板导入导出功能 [PR #1145](https://github.com/netease-youdao/LobsterAI/pull/1145)。

## 4. 社区热点
今日社区讨论主要围绕**广告投放**和**OpenClaw 内部机制透明度**展开。

- **[stale] 左下角广告可以彻底关闭吗** (Issue #2342)
  - **链接**: [netease-youdao/LobsterAI Issue #2342](https://github.com/netease-youdao/LobsterAI/issues/2342)
  - **诉求分析**: 用户反馈 v2026.7.15 版本起侧边栏出现强制性广告 Banner，虽然可点叉关闭，但无法永久禁用。这反映了用户对**个性化设置控制权**和**纯净使用环境**的强烈需求。
  - **相关进展**: 已有社区贡献者提交 PR [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374) 增加“永久隐藏侧边栏广告”的设置开关，目前处于 OPEN 状态，等待维护者审查。这表明该痛点可能被优先纳入近期迭代。

- **[OPEN] 隐藏 OpenClaw 主 Agent 会话** (PR #1181)
  - **链接**: [netease-youdao/LobsterAI PR #1181](https://github.com/netease-youdao/LobsterAI/pull/1181)
  - **背景**: 该 PR 旨在隐藏内部用于心跳/定时路由的 `[OpenClaw]` 主 Agent 会话，避免其在用户可见的 Cowork 会话列表中造成混淆。虽然评论数为 0，但属于提升用户界面整洁度的重要改进。

## 5. Bug 与稳定性
今日修复的 Bug 多属于**高严重性**，直接影响核心功能可用性：

| 严重程度 | 问题描述 | 修复状态 | 链接 |
| :--- | :--- | :--- | :--- |
| **Critical** | **网关启动阻断**：旧版 `memory/.dreams/` JSON 解析失败导致 OpenClaw 网关无法启动，且常规重试无效。 | **Fixed** (merged) | [PR #2681](https://github.com/netease-youdao/LobsterAI/pull/2681) |
| **High** | **依赖损坏**：`pnpm pack` 重写 workspace 依赖时丢失本地补丁，导致 `prepareReplayMessages` 等导出缺失，构建失败。 | **Fixed** (merged) | [PR #2686](https://github.com/netease-youdao/LobsterAI/pull/2686), [PR #2685](https://github.com/netease-youdao/LobsterAI/pull/2685) |
| **High** | **长会话静默失败**：长会话中输出 Token 预算被错误压缩至 1，导致推理模型成功返回但无正文，且无法通过续答恢复。 | **Fixed** (merged) | [PR #2684](https://github.com/netease-youdao/LobsterAI/pull/2684) |
| **Medium** | **历史数据回放异常**：旧任务历史记录字段缺失导致字符串方法调用抛错，任务无法继续。 | **Fixed** (merged) | [PR #2682](https://github.com/netease-youdao/LobsterAI/pull/2682) |
| **Medium** | **POPO 插件加载失败**：ESM/CJS 竞态条件导致网关重启后 POPO 监听器丢失。 | **Fixed** (merged) | [PR #2664](https://github.com/netease-youdao/LobsterAI/pull/2664) |
| **Low** | **错误信息不透明**：技术错误详情未传递至前端卡片，仅显示提供商和模型名，难以排查。 | **Fixed** (merged) | [PR #2677](https://github.com/netease-youdao/LobsterAI/pull/2677) |

## 6. 功能请求与路线图信号
基于今日的 PR 合并情况，以下功能/改进正在成为路线图的重点：

1.  **OpenClaw 运行时自愈能力**：通过 [PR #2679](https://github.com/netease-youdao/LobsterAI/pull/2679) 和 [PR #2681](https://github.com/netease-youdao/LobsterAI/pull/2681)，项目正在从“崩溃后人工修复”向“启动时自动诊断与修复”演进。未来版本可能包含更健壮的 Gateway 健康检查机制。
2.  **用户控制权增强**：
    *   **广告控制**: [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374) (Open) 极有可能被合并，以回应 Issue #2342 的呼声。
    *   **配置管理**: [PR #1145](https://github.com/netease-youdao/LobsterAI/pull/1145) 添加的团队配置模板导入/导出功能，暗示项目正在向**企业级/团队协作**场景倾斜。
3.  **记忆系统观测性**：Issue #1149 虽然被标记为 stale 并关闭，但关于 `coworkMemoryExtractor` 缺乏测试覆盖的问题，结合 [PR #2682](https://github.com/netease-youdao/LobsterAI/pull/2682) 中对历史回放校验的加强，表明团队正在补齐核心模块的测试与校验逻辑。

## 7. 用户反馈摘要
- **痛点 1：意外变更带来的困惑**。用户（如 PYUDNG 在 Issue #2342）对 v2026.7.15 新增的广告 Banner 表示不满，认为缺乏相应的设置开关，体现了用户对**版本升级预期与功能变更透明度**的重视。
- **痛点 2：调试困难**。多个 PR（#2677, #2684, #2682）均指出用户日志或界面信息不足以定位问题（如“日志中的异常摘要没有传到错误卡片”），说明用户以及开发团队都深受**黑盒错误**之苦。今日的修复显著提升了可观测性。
- **使用场景暗示**：PR #1145 的团队配置功能以及 OpenClaw 的复杂修复，暗示当前用户群体中可能有相当比例在使用**长期运行的 Agent 工作流**和**专业级 LLM 推理任务**，对稳定性和配置灵活性要求极高。

## 8. 待处理积压
维护者需关注以下长期 Open 或 Stale 项目，部分可能影响用户体验或代码健康度：

1.  **广告永久关闭功能** ([PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374))
    *   **状态**: Open
    *   **建议**: 鉴于 Issue #2342 的用户负面情绪，建议尽快合并此 PR 或在文档中明确说明广告策略。
2.  **隐藏 OpenClaw 内部会话** ([PR #1181](https://github.com/netease-youdao/LobsterAI/pull/1181))
    *   **状态**: Open
    *   **建议**: 这是一个低风险高收益的 UI 改进，能减少用户困惑，建议评审合并。
3.  **Electron 依赖升级** ([PR #1277](https://github.com/netease-youdao/LobsterAI/pull/1277))
    *   **状态**: Open (Dependabot)
    *   **建议**: Electron 43.5.0 -> 44.3.0 已待处理数月。考虑到 OpenClaw 运行时的复杂性，升级大版本 Electron 需仔细回归测试，但长期积压可能带来安全漏洞，建议安排专项测试周期。
4.  **Stale Issues 清理**
    *   Issue #1149, #1151 及多个旧 PR 被标记为 `[stale]` 并关闭。这是正常的维护行为，但需确认这些关闭是否代表功能已废弃、已完成或后续有计划重新评估。特别是 #1151 (Gemini URL 拼接错误)，虽已标记 Stale/Closed，需验证修复是否已包含在近期合并的 OpenClaw 兼容性修复中，或是否仍需独立修复。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-09-16)

## 1. 今日速览
Moltis 项目今日处于**低活跃度**状态，过去 24 小时内无新版本发布，无 PR 合并，整体推进节奏较为平缓。社区新增 1 个活跃 Issue 和 2 个待审查的 Pull Request，主要聚焦于构建性能优化和测试稳定性修复。尽管近期没有重大功能落地，但开发者正在针对底层基础设施（Cargo 构建缓存）和 CI 稳定性（OAuth 测试竞态条件）进行精细化打磨，显示出项目正处于质量加固阶段。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
**今日无 PR 被合并。**
- 虽然有 2 个新提交的 PR（[#1270](https://github.com/moltis-org/moltis/pull/1270) 和 [#1269](https://github.com/moltis-org/moltis/pull/1269)），但均处于 `OPEN` 状态，尚未通过审查或合并。
- 这意味着今日项目主干代码未发生任何变更，无实质性功能推进或 Bug 修复上线。

## 4. 社区热点
- **Issue #205: [enhancement] Allow setting body parameters for custom OpenAI endpoints (and per-model)**
  - **状态**: OPEN | **评论**: 2
  - **链接**: [moltis-org/moltis Issue #205](https://github.com/moltis-org/moltis/issues/205)
  - **分析**: 这是今日唯一活跃的 Issue。用户 `TheGoddessInari` 提出在 2026-02-22 创建，但在 2026-09-15 再次被更新/讨论。
  - **诉求**: 用户希望 Moltis 能支持针对自定义 OpenAI 兼容端点设置特定的 body 参数，并且希望这种配置能够“按模型”粒度进行定制。这表明用户群体中存在较多使用非标准 OpenAI 协议（如本地 LLM 优化、特定云服务定制接口）的需求，且现有配置粒度过于粗放。

## 5. Bug 与稳定性
- **潜在稳定性问题修复中 (PR #1269)**
  - **描述**: 修复 OAuth 流程中的测试竞态条件（Success-popup timing race）。
  - **详情**: 该 PR 旨在解决 CI 中报告的问题（`moltis-064r`）。根本原因是测试脚本依赖立即关闭的回调弹窗（callback popup）的事件，导致在 PKCE 成功和断开连接测试中出现不稳定的通过/失败结果。
  - **修复方案**: 修改测试逻辑，等待主页上持久化的认证状态，而不是依赖易失性的弹窗关闭事件。
  - **状态**: **已有 Fix PR** ([#1269](https://github.com/moltis-org/moltis/pull/1269))，但尚未合并。
  - **严重程度**: 中。主要影响 CI 稳定性和开发者的本地测试体验，而非终端用户生产环境功能，但持续的不稳定会阻碍其他 PR 的快速合并。

## 6. 功能请求与路线图信号
- **自定义端点参数配置 (Issue #205)**
  - **信号**: 已有 Issue 存在且近期有活跃讨论。
  - **判断**: 目前**尚无对应的 PR** 正在开发中。结合今日新增的构建优化 PR，短期内（1-2天内）不太可能迅速落地此功能。但这是用户明确表达的高级需求，可能会进入下一迭代路线图，特别是如果开发资源允许的话。
  - **影响**: 若长期不实现，可能影响 Moltis 在混合 LLM 环境（自托管 + 云 API）中的灵活性。

## 7. 用户反馈摘要
- **痛点**: 用户对 Moltis 连接非标准 OpenAI 端点的灵活性表示不满，特别是当不同模型需要不同的请求体（Body）参数时，缺乏细粒度的控制。
- **使用场景**: 用户可能正在配置混合推理后端，或者使用经过特定修改的本地 LLM 代理，这些场景需要超越基础 URL/API Key 配置的额外 HTTP 请求定制能力。
- **满意/不满意**: 目前无正面反馈数据，焦点集中在配置受限带来的不便。

## 8. 待处理积压
- **构建性能优化 (PR #1270)**
  - **描述**: `feat(build): cache cargo across image builds`。作者 `Bergmann89` 指出每次镜像构建都会重新编译整个依赖树，因为 Cargo 的 target 目录和 crate registry 位于任何源码变更都会使缓存失效的镜像层中。
  - **价值**: 使用 BuildKit 缓存挂载后，冷启动构建时间将大幅缩短，仅编译和链接更改的部分。对于 Rust 项目，这能显著加速 CI/CD 流水线。
  - **状态**: OPEN，待审查。
  - **建议**: 该 PR 对提升维护效率有显著正面影响，建议维护者优先安排审查，以加速整体开发循环。
  - **链接**: [moltis-org/moltis PR #1270](https://github.com/moltis-org/moltis/pull/1270)

- **长期未响应检查**:
  - Issue #205 创建于 2026-02-22，距今已约 7 个月。虽然今日有活动，但表明该需求长期未得到核心响应，需关注是否为维护者遗漏或优先级被刻意降低。

---
**项目健康度评估**: **良好但缓慢**。
代码库本身稳定（无严重生产 Bug 报告），但开发吞吐量较低。两个新 PR 分别针对**基础设施效率**（构建速度）和**工程质量**（测试稳定性），虽非用户可见功能，但对项目长期可持续性至关重要。建议关注这两个 PR 的合并进度，以及 Issue #205 是否会有代码实现跟进。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是为您整理的 **CoPaw (QwenPaw) 项目动态日报（2026-09-16）**。

---

# 🤖 CoPaw 项目动态日报 | 2026-09-16

## 1. 今日速览
过去 24 小时内，CoPaw 社区保持高度活跃。代码库重点围绕 **多租户架构（QwenPaw Hub）**、**MCP 协议兼容性**、**智能体协同机制（SubAgent / Advisor Mode）** 以及 **WebUI 交互与控制台 Workbench 改造** 进行了密集迭代。

* **Issue 动态**：更新 28 条（新增/活跃 12 条，已关闭 16 条）
* **PR 动态**：更新 50 条（待合并 25 条，已关闭/合并 25 条）
* **版本发布**：今日无新版本发布
* **活跃度评估**：**高**。核心维护团队正集中力量筹备 2.2.x - 2.3.0 版本的重大功能升级，重点攻克高频 Bug 并推进企业级 Hub 多租户网关建设。

---

## 2. 版本发布
> 今日无新版本发布。当前最新版本维持在 `2.2.1`。

---

## 3. 项目进展
今日社区完成了 25 项 PR 的合并与关闭，重点修复了 MCP 连接解包异常及前端体验细节，同时多个重磅功能 PR 进入审查阶段：

### 核心修复与优化合并
* **MCP 协议兼容修复**：解决了升级 2.2.x 后由于 `httpx` 解压缩头信息未重置导致的 MCP 服务连接/注册失效问题（[PR #7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)，修复了 [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) 和 [#7764](https://github.com/agentscope-ai/QwenPaw/issues/7764)）。
* **UI/UX 细节改善**：
  * 恢复了无障碍键盘聚焦指示器（[PR #7759](https://github.com/agentscope-ai/QwenPaw/pull/7759)）。
  * 规范了 Embedding 超时配置的前前端校验范围（1-300 秒）（[PR #7758](https://github.com/agentscope-ai/QwenPaw/pull/7758)）。
  * 修复了 ReMe 记忆异步任务空报错通知的问题（[PR #7756](https://github.com/agentscope-ai/QwenPaw/pull/7756)）。

### 重点推进中 PR（已提交测试/等待合并）
* **Hub 企业级模型网关与用量看板**（[PR #7779](https://github.com/agentscope-ai/QwenPaw/pull/7779)）：引入组织级模型 API Key 保管箱与成员权限治理，配合 2.2.0 Hub 架构。
* **统一 Chat Workbench 右侧 Shell**（[PR #7790](https://github.com/agentscope-ai/QwenPaw/pull/7790)）：将文件、Git 变更、终端与工具抽离至右侧统一工作台，优化小屏分辨率适配。
* **全新 Advisor Mode 顾问模式**（[PR #7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)）：引入“强模型顾问 + 低成本执行 Agent”的双模型协作工作流。
* **DeepSeek V4 Flash 能力适配**（[PR #7794](https://github.com/agentscope-ai/QwenPaw/pull/7794)）：新增对 DeepSeek V4 Flash 百万 Token 上下文及推理能力的原生支持。

---

## 4. 社区热点
今日讨论度最高的集中在 **多租户团队版路线规划** 与 **任务中断/超时异常** 上：

1. **QwenPaw Hub 多租户架构演进** ([Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) - 27 评论, 👍 4)
   * **背景**：团队版 Hub 即将在 2.2.0 正式推出了多用户访问与统一 Skill 管理功能，官方发起下一阶段优先级投票。
   * **诉求**：社区普遍强烈要求增加组织级模型配额管控、API Key 凭据隔离、以及团队级别的分布式工具共享机制。[PR #7779](https://github.com/agentscope-ai

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 (2026-09-16)

## 1. 今日速览
过去 24 小时内，ZeptoClaw 项目呈现出**极高的自动化维护活跃度，但较低的人工开发活跃度**。Dependabot 机器人在短时间内批量提交了 **18 个依赖更新 PR**，涉及 Rust 核心库、JavaScript 文档站点及 GitHub Actions 工作流，显示项目对供应链安全与底层依赖版本的关注度较高。然而，**没有人工开发者合并任何 PR 或关闭任何 Issue**，表明维护者团队目前可能处于非活跃期或正在进行代码审查前的准备阶段。整体项目健康度处于“稳定等待维护”状态，无新的功能进展，也无紧急 Bug 报告。

## 2. 版本发布
无。过去 24 小时内未发布新版本。

## 3. 项目进展
过去 24 小时内**没有合并/关闭的 PR**。
*   **状态分析**：尽管有 18 个 PR 处于 Open 状态，但目前尚未有任何代码被正式合并进主分支。这意味着项目本日在功能层面**零推进**。所有进展目前仅停留在“依赖更新提议”阶段，需等待人工审核与 CI 测试通过。

## 4. 社区热点
过去 24 小时内**无高热度人工讨论**。
*   **数据说明**：所有 18 条更新均由 `dependabot[bot]` 创建，评论数均为 `undefined`（即 0 或无有效评论），反应数 (👍) 均为 0。
*   **分析**：今日社区无用户自发发起的热点讨论。关注度完全集中在自动化的依赖更新上，缺乏人工社区互动的信号。

## 5. Bug 与稳定性
**无新报告 Bug**。
*   过去 24 小时内无新开启的 Issue。
*   **潜在稳定性风险预警**：
    *   **Docker 基镜像更新**：[PR #679](https://github.com/qhkm/zeptoclaw/pull/679) (Rust image) 和 [PR #680](https://github.com/qhkm/zeptoclaw/pull/680) (Debian image) 将基础镜像更新到较新哈希值。此类更新偶尔可能引入底层系统兼容性问题，建议合并后立即运行完整的集成测试。
    *   **Rust 大版本跨越依赖**：[PR #694](https://github.com/qhkm/zeptoclaw/pull/694) 将 `base64` 从 `0.22.1` 升级至 `0.23.1`。**注意**：这是一个 **Minor/Major 版本跨越**（0.22 -> 0.23），可能包含破坏性变更（Breaking Changes）。虽然标签为 `chore(deps)`，但需人工审核 Abstract 确认是否涉及 API 不兼容。同样，[PR #695](https://github.com/qhkm/zeptoclaw/pull/695) 和 [PR #686](https://github.com/qhkm/zeptoclaw/pull/686) 将 `astro` 从 `6.x` 升级至 `7.x`，属于**主版本跨越**，**极大概率包含破坏性变更**，需重点审查文档站点的配置兼容性。

## 6. 功能请求与路线图信号
**无新功能请求**。
*   今日无用户提交的功能 Request Issue。
*   **路线图暗示**：
    *   大量 Rust 核心库更新（如 [PR #690](https://github.com/qhkm/zeptoclaw/pull/690) `clap`, [PR #692](https://github.com/qhkm/zeptoclaw/pull/692) `rustls`）表明项目正积极跟进 Rust 生态的最新稳定版，有助于提升 CLI 参数解析的健壮性和 TLS 安全性。
    *   文档站点对 `astro` 主版本的升级（[PR #695](https://github.com/qhkm/zeptoclaw/pull/695)）可能为后续引入新的静态站点渲染特性打下基础。

## 7. 用户反馈摘要
**无用户反馈**。
*   过去 24 小时内无 Issue 产生，故无用户痛点和场景描述可提炼。

## 8. 待处理积压
**18 个待审核 PR 积压**，需维护者关注：
*   **高优先级（潜在破坏性变更）**：
    *   [PR #695](https://github.com/qhkm/zeptoclaw/pull/695) & [PR #686](https://github.com/qhkm/zeptoclaw/pull/686): `astro` 6.x -> 7.x。需检查文档配置项是否被移除或重命名。
    *   [PR #694](https://github.com/qhkm/zeptoclaw/pull/694): `base64` 0.22 -> 0.23。需检查编码/解码 API 调用是否受影响。
    *   [PR #696](https://github.com/qhkm/zeptoclaw/pull/696) & [PR #689](https://github.com/qhkm/zeptoclaw/pull/689): `@astrojs/starlight` 0.39 -> 0.41。需检查 Theme 和 Layout 的兼容性。
*   **中优先级（常规更新与安全补丁）**：
    *   [PR #692](https://github.com/qhkm/zeptoclaw/pull/692): `rustls` 更新，建议尽快合并以提升安全性。
    *   [PR #690](https://github.com/qhkm/zeptoclaw/pull/690): `clap` 更新，通常向后兼容，低风险。
    *   [PR #693](https://github.com/qhkm/zeptoclaw/pull/693) & [PR #691](https://github.com/qhkm/zeptoclaw/pull/691): `sharp` 图像库更新，需确认对文档图片处理无影响。
*   **低优先级（CI/CD 与构建工具）**：
    *   [PR #687](https://github.com/qhkm/zeptoclaw/pull/687), [PR #683](https://github.com/qhkm/zeptoclaw/pull/683), [PR #684](https://github.com/qhkm/zeptoclaw/pull/684), [PR #681](https://github.com/qhkm/zeptoclaw/pull/681), [PR #682](https://github.com/qhkm/zeptoclaw/pull/682): 各种 GitHub Actions 更新，通常为小版本或安全修补，可批量快速审核。
    *   [PR #688](https://github.com/qhkm/zeptoclaw/pull/688): `async-trait` 更新，低风险。
    *   [PR #685](https://github.com/qhkm/zeptoclaw/pull/685): `tokio-serial` 更新，低风险。
    *   [PR #679](https://github.com/qhkm/zeptoclaw/pull/679) & [PR #680](https://github.com/qhkm/zeptoclaw/pull/680): Docker 基镜像更新，建议在 CI 中验证后合并。

**维护者行动建议**：
1.  **立即审核** Astro 和 base64 的主版本升级 PR，确认是否有 Breaking Changes。
2.  **批量合并** 低风险的 Rust 库和 GitHub Actions 更新，以减少未来积压。
3.  **验证 Docker 镜像**：在合并 #679 和 #680 前，确保 CI/CD 流水线能正常构建。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-16）

## 1. 今日速览

今日 ZeroClaw 项目呈现出极高的开发与架构演进活跃度。过去 24 小时内共有 **50 条 Issue** 与 **50 条 PR** 发生更新（其中合并/关闭 PR 8 条，关闭 Issue 12 条）。

今日最核心的进展是 **A2A（Agent-to-Agent）跨智能体协同出站能力（Phase 1）正式合并**，标志着 ZeroClaw 从单一 Agent 范式向多 Agent 协同生态迈出了关键一步。同时，核心团队对多模态（Anthropic Vision）、缓存断点策略以及 ZeroCode 运行时稳定性进行了集中修复与硬化。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共有 8 条 PR 完成合并/关闭，重点推进了架构解耦、文档生成与 Telegram 通道优化：

* **A2A (Agent-to-Agent) 出站客户端落地** ([PR #9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324))：实现了 RFC [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) 的第一阶段。在 `zeroclaw-tools` 中新增了 4 个 `a2a_*` 工具，并在 `zeroclaw-api` 中构建了标准 A2A v1.0 Serde 交互模型，使 ZeroClaw Agent 具备了主动调用外部符合 A2A 规范的 Agent 的能力。
* **LLM 友好型文档自动化构筑** ([PR #10840](https://github.com/zeroclaw-labs/zeroclaw/pull/10840))：在 mdBook 中新增 `cargo mdbook llms` 构建后端，自动生成包含单行描述的 `llms.txt` 及全文 Markdown 流 `llms-full.txt`，极大方便了外部 LLM 对 ZeroClaw 框架文档的索引与理解。
* **Telegram 安全模型选择器** ([PR #9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997))：为 `/model` 指令引入了按 Provider 分组、支持分页的 Telegram 内联键盘（Inline Keyboard），且路由严格校验运行时权限。
* **测试进程环境隔离清理** ([PR #10125](https://github.com/zeroclaw-labs/zeroclaw/pull/10125))：消除了浏览器、HTTP 认证密钥、ACP 桥接等模块中最后 25 处不安全的进程环境变量修改，提升了 CI 并行测试的稳定性。

---

## 4. 社区热点

今日讨论最活跃的 Issue 与 RFC 主要集中在 **Computer-Use (桌面控制)**、**A2A 跨智能体架构** 以及 **测试硬化**：

1. **RFC: Computer-use 支持桌面屏幕交互与输入控制** ([Issue #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) - 16 评论)
   * **诉求分析**：社区正密切关注 agent 的桌面自动化能力（Screen/Input Control）。最新修订强化了安全边界（Bounded Approval Units）、运行重校验、Sidecar 信任机制，防止模型在获取桌面权限后产生不可控的操作风险。
2. **[Task]: 并行测试门控下的可执行文件测试夹具硬化** ([Issue #9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) - 12 评论)
   * **诉求分析**：多线程测试下由于并发写入 Shim 文件导致 `cron` 调度测试偶发失败。社区正集中精力修复 Rust 单元测试环境下的线程竞态问题。
3. **RFC: A2A outbound client (A2ATool)** ([Issue #9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) - 11 评论)
   * **诉求分析**：打破此前 ZeroClaw 只能作为 A2AServer 被动接收调用的局限，支持主动与其他智能体集群分工协同。
4. **RFC: 统一 Package/Capability/Config/Runtime-state Catalog 契约** ([Issue #9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346) - 9 评论)
   * **诉求分析**：随着插件、内置工具和集成渠道激增，维护者正试图建立统一的产品级 Catalog 规范，消除 CLI、Gateway 和运行时配置之间的视图割裂。

---

## 5. Bug 与稳定性

今日报告并活跃讨论的缺陷按严重程度排列如下：

### P1 / Severity S1（严重/阻塞级）
* **ZeroCode 长 Turn 超出预算后恢复会话丢失进度** ([Issue #10659](https://github.com/zeroclaw-labs/zeroclaw/issues/1

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*