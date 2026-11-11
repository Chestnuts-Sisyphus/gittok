# OpenClaw 生态日报 2026-11-11

> Issues: 278 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-11 00:19 UTC

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

# OpenClaw 项目动态日报
**日期：** 2026-11-11  
**分析师：** AI 智能体与个人 AI 助手领域开源项目分析师

---

## 1. 今日速览

今日 OpenClaw 项目活跃度显著，过去 24 小时内新增 **278 条 Issues**（190 开放/88 关闭）和 **500 条 PRs**（342 待合并/158 已合并/关闭）。社区重点关注 **v2026.11.3** 补丁版本的发布细节及 **xAI OAuth 服务中断** 的严重回归问题。整体项目处于快速迭代与维护并行的健康状态，主要集中在会话状态管理、会话迁移、UI 交互优化以及跨平台兼容性修复。

---

## 2. 版本发布

### 📦 v2026.11.3 (2026-11-03)
*   **发布类型：** 补丁更新
*   **核心亮点：**
    *   **隐私保护增强：** 优化子代理完成结果的流式传输，确保私有任务结果不会泄露到公开聊天回复中。
    *   **任务交接可靠性：** 改进父代理在取消子任务后的交接机制，防止任务取消后遗留未处理的工作。
*   **迁移注意事项：** 无重大破坏性变更，建议所有用户升级以获取最新的隐私与稳定性修复。

---

## 3. 项目进展

### 🚀 今日合并/关闭的重要 PR
1.  **PR #196896 [CLOSED]** - `fix(gateway): reduce repeated session work during streaming surges`
    *   **进展：** 优化了流式会话更新时的重复计算，显著降低了 CPU 占用和内存分配，提升了高并发场景下的性能。
2.  **PR #196874 [CLOSED]** - `fix: explain long sandbox workspace reuse waits`
    *   **进展：** 改进了长期沙箱工作区复用时的诊断日志，增加了同步阶段的计时器，帮助用户理解漫长的等待原因。
3.  **PR #196870 [CLOSED]** - `fix(cli-runner): log terminal failure when a CLI run fails after delivery`
    *   **进展：** 修复了 `claude-cli` 后端在消息发送后失败时日志缺失的问题，确保故障排查可追溯。
4.  **PR #196896** (Open) & **PR #196874** (Open) - `fix: preserve queued ingress messages during gateway restart`
    *   **进展：** 防止网关重启时静默丢弃已接受的入队消息，保障了消息传递的可靠性。
5.  **PR #196430** (Open) - `fix(channels): long replies with a code block arrive split into broken blocks`
    *   **进展：** 修复了在 MS Teams、Tlon 等频道中，包含代码块的回复因跨文本块限制而断裂的问题。

---

## 4. 社区热点

### 🔥 高热度 Issue
1.  **#150635** (27 评论) - **[Bug] 短期记忆在达到上限后每晚清理导致 dreaming deep 阶段无法晋升**
    *   **链接：** [openclaw/openclaw Issue #150635](https://github.com/openclaw/openclaw/issues/150635)
    *   **分析：** 这是一个关于记忆系统核心功能的严重逻辑缺陷。由于 nightly session-transcript ingestion 导致的记忆条目被清理，导致 agent 无法进行深层记忆的晋升，影响长期对话能力。属于 **P2 严重性**。

2.  **#193962** (26 评论) - **[Bug] v2026.10.10 的 package-update 无法触发 #187197 的修复**
    *   **链接：** [openclaw/openclaw Issue #193962](https://github.com/openclaw/openclaw/issues/193962)
    *   **分析：** 严重的更新回退问题。用户升级到 2026.11.5-beta.1 时，因 package-update 的 10s 超时探针机制失效，导致关键的安全补丁无法安装。这直接阻碍了用户获取修复。

### 🚀 高热度 PR
1.  **#196922** (Open) - `docs: add v2026.11.3 patch release notes`
    *   **链接：** [openclaw/openclaw PR #196922](https://github.com/openclaw/openclaw/pull/196922)
    *   **分析：** 正在为 v2026.11.3 补丁版本撰写用户友好的发布说明，确保社区知晓更新细节。

---

## 5. Bug 与稳定性

### 🐛 今日报告的 Bug (按严重程度排序)

| ID | 标题 | 严重性 | 状态 | 关联 PR |
| :--- | :--- | :--- | :--- | :--- |
| **#193962** | v2026.10.10 无法触发 SQLite header-probe timeout 修复 | **P0 (Release Blocker)** | Open | - |
| **#147728** | xAI OAuth 推理失败 (HTTP 426) | **P0** | Open | #179944 |
| **#150635** | Dreaming deep 晋升逻辑失效 | **P2** | Open | - |
| **#190563** | 无法恢复暂停的 Codex 对话 (线程不匹配) | **P1** | Open | - |
| **#170928** | Windows 2026.10.2 Gateway 启动慢且无响应 | **P1** | Open | - |
| **#194664** | Codex 受保护续约阻塞后续对话 | **P0** | Open | - |
| **#194403** | Helper-completion 续约导致会话被阻塞 | **P1** | Open | - |

**核心问题摘要：**
*   **xAI 服务中断：** #147728 和对应的 PR #179944 持续发酵，xAI Grok 代理要求特定的客户端版本头，导致所有 inference 请求失败。
*   **会话阻塞：** 多个 issue 指出 2026.11.1 版本引入了会话执行权限失效的问题，导致后续对话被阻塞，属于严重的回归 Bug。

---

## 6. 功能请求与路线图信号

1.  **Feature: Explicitly authorize cross-provider cron fallback accounts (#192009)**
    *   **链接：** [Issue #192009](https://github.com/openclaw/openclaw/issues/192009)
    *   **分析：** 用户希望为定时任务配置不同的主备模型授权，以便在主模型达到配额限制时平滑切换，提高自动化作业的稳定性。
2.  **Feature: Session model pins should inherit the agent's fallback chain (#151980)**
    *   **链接：** [Issue #151980](https://github.com/openclaw/openclaw/issues/151980)
    *   **分析：** 解决用户在 UI 中手动锁定模型后，该模型故障导致整个会话失败的问题，建议模型锁定应继承主策略的后备链。
3.  **Feature: Enforceable checkpoints and bounded yields for foreground WebChat runs (#138990)**
    *   **链接：** [Issue #138990](https://github.com/openclaw/openclaw/issues/138990)
    *   **分析：** 针对长时间运行的对话流，引入强制检查点机制，防止长时间无响应导致的状态丢失或资源耗尽。

---

## 7. 用户反馈摘要

*   **配置迁移痛点：** 用户在从 2026.10.10 升级到 2026.11.5-beta.1 时，常遇到 `invalid-config` 错误，提示 `agents.defaults.heartbeat` 等字段已废弃，升级过程被阻断。
*   **长路径显示异常：** WebChat 在渲染包含特殊目录的长文件路径时，使用省略号截断，导致无法通过点击直接跳转，影响文件操作体验。
*   **Android 插件兼容性：** Android 端的 `photos.latest` 工具在请求多张图片时仅返回 1-2 张，且 Gateway 发现机制在无消费者时会持续占用资源。

---

## 8. 待处理积压

*   **长期未响应的高优先级 Issue：**
    *   **#112313** (12 评论) - 死信队列条目永久残留，无法清理。
    *   **#112638** (10 评论) - session.maintenance 模式下存储限制被绕过。
    *   **#151962** (15 评论) - Phantom user messages（幽灵用户消息）被错误提交。
    *   **#138561** (13 评论) - active-memory 插件升级后完全失效。
*   **积压的 PR：** 部分修复 PR（如 iOS Bonjour 名称乱码、Telegram 附件处理）仍处于 `needs proof` 或 `waiting on author` 状态，需维护者推动或作者补充截图/测试。

---
**数据来源：** OpenClaw GitHub Repository (2026-11-11)

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目日报 – 2026‑11‑11**  

> 数据来源：GitHub（issues 3 条 / PR 27 条，最近 24 h）  

---

## 1. 今日速览
- 项目依然保持高活跃度：24 h 内共 **30 条** 讨论（3 条 Issue、27 条 PR），其中 **19 条 PR 已合并/关闭**。  
- 主要工作聚焦在 **会话模型的跨会话输入归属**、**systemd‑gateway 的停止/重启行为** 以及 **WebUI 细节与性能调优**。  
- 仍有 **2 条新打开的 Bug**（会话串扰、systemd 重启），但对应的修复 PR 已在审查或已合并，短期内可望得到解决。  
- 没有新版本发布，发布节奏保持在 **每 1‑2 周一次**（上一次 0.3.5），说明团队在功能迭代与质量保障之间保持平衡。  

---

## 2. 版本发布
> **（暂无）**  
本日未发布新 Release，近期的合并主要为 **bug 修复、内部重构及 UI 微调**，不涉及破坏性变更。  

---

## 3. 项目进展（已合并/关闭的关键 PR）

| PR 编号 | 类型 / 关键点 | 主要贡献 | 状态 |
|--------|--------------|----------|------|
| **#6625** | `fix(gateway)` – 防止已停止的 systemd 服务被自动重启 | 解决了 `nanobot gateway stop` 后服务仍被 systemd 重启的问题 | 已合并 |
| **#6613** | `fix(sessions)` – 跨会话输入所有权与历史保持 | 彻底修正了跨会话消息被错误归属/重复的情况，直接回应 Issue #5798 的核心需求 | 正在审查（最高优先级 P2） |
| **#6621** | `refactor(sessions)!` – 移除全局共享会话 | 简化会话模型，去除全局共享 Session，提升可预测性和并发安全性 | 已合并 |
| **#6623** | `refactor(exec)` – 统一进程树生命周期管理 | 将进程启动、终止、清理集中到 `nanobot/execution/processes.py`，降低资源泄漏风险 | 已合并 |
| **#6616** | `refactor(tools)` – 统一文件操作作用域 | 通过“scoped file ops”统一读写、编辑、搜索权限，增强安全审计 | 已合并 |
| **#6570** | `chore(release): prepare 0.4.1` | 为即将到来的 0.4.1 版本做准备，完成代码清理与文档更新 | 已合并 |
| **#6588** | `test(webui)` – 放宽大图页面任务时限 | 将 500‑node 图浏览测试的超时阈值从 100 ms 调至 150 ms，提升 CI 稳定性 | 已合并 |
| **#6594** | `feat(webui)` – 日夜主题细化 | 引入暗色模式的“睡觉猫”图标与配色，提升 UI 细节一致性 | 已合并 |
| **#6600** | `test(webui)` – 稳定原生主题交叉淡入采样 | 修复间歇性测试超时，保持主题切换动画的可靠性 | 已合并 |
| **#6595** | `feat(settings)` – 沙箱检查与受信启动器配置 | 增加网关拥有的沙箱检查，提升工具执行的安全边界 | 已合并 |
| **#6412** | `refactor(webui)` – 统一代码与差异高亮 | 合并 Prism 与自研高亮路径，保持编辑/预览 UI 的统一性 | 已合并 |
| **#6590** | `fix(webui)` – 新会话时关闭上下文侧栏 | 防止打开新会话时出现空的上下文图，提升用户首次交互体验 | 已合并 |
| **#6581** | `perf` – 减少文件/会话/模型请求的内存复制 | 引入流式文本读取，降低峰值内存使用，提升大文件处理性能 | 已合并 |
| **#6591** | `fix(webui)` – 首次访问遵循浏览器语言 | 修正首次加载时语言自动切换的错误，提升国际化体验 | 已合并 |
| **#6587** | `perf(webui)` – 减少文件活动布局工作 | 使用 `ResizeObserver` 优化路径截断，避免 UI 卡顿 | 已合并 |
| **#6606** | `fix` – 跨渠道交付失败保留 | 解决邮件、Mattermost 等渠道的 ACK 与实际发送不一致问题 | 已合并 |
| **#6603** | `fix(agent)` – 重置空闲会话不自取消 | 让 `/new` 在空闲会话中能够正确重置而不被自身请求取消 | 已合并 |
| **#6608** | `fix(webui)` – 复合后保留系统上下文图 | 防止上下文压缩后系统提示来源丢失，保持图谱完整性 | 已合并 |
| **#6610** | `fix(webui)` – 粘贴路径时保持原文 | 当附件检测失败时保留原始路径文本，提升编辑容错性 | 已合并 |

**整体进展评估**：本轮 PR 合并集中在 **会话模型的可靠性、系统服务的生命周期管理以及 UI/性能细节**，表明 NanoBot 正在从 **功能完善** 向 **稳定性与可维护性** 迁移。关键的跨会话输入 bug（#5798）已在 PR #6613 中得到根因定位，预计本周内合并后即可发布修复补丁。

---

## 4. 社区热点

| 编号 | 类型 | 标题 | 评论数 / 👍 | 链接 |
|------|------|------|------------|------|
| **#5798** | Issue – Bug | “回复串会话问题” | 3 条评论 / 0 👍 | <https://github.com/HKUDS/nanobot/issues/5798> |
| **#6624** | Issue – Bug | “Gateway stop does not persist when systemd service uses Restart=always” | 0 评论 / 0 👍 | <https://github.com/HKUDS/nanobot/issues/6624> |
| **#6613** | PR – Bug/WEBUI/fix/priority:P2 | “fix(sessions): preserve cross‑session input ownership and history” | （评论数未显示） | <https://github.com/HKUDS/nanobot/pull/6613> |
| **#5749** | Issue – Enhancement | “Expose stable tool invocation context for idempotent side effects” | 1 条评论 / 0 👍 | <https://github.com/HKUDS/nanobot/issues/5749> |

**热点分析**  
- **跨会话输入归属**（#5798 → PR #6613）是今天最受关注的 bug，用户报告在多会话并行时出现响应错位，影响实际业务场景（如同时处理多个对话的客服系统）。  
- **systemd gateway 重启行为**（#6624）虽然评论少，但触及部署自动化与运维可靠性，已在 PR #6625 中得到快速响应。  
- **工具调用上下文**（#5749）表达了对 **幂等性** 与 **审计** 的需求，虽然目前仅有 1 条评论，但在后续的“安全执行”路线图上具有潜在价值。  

---

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 当前状态 | 是否已有 Fix PR |
|----------|----------|------|----------|----------------|
| **高** | #5798 (Bug) | 会话串扰：在运行中的会话被其他会话的输入误回复 | 已打开，正在审查的 PR #6613 直接对应该问题 | **是**（#6613） |
| **高** | #6624 (Bug) | `nanobot gateway stop` 在 `Restart=always` 的 systemd 单元下无效，导致服务自动复活 | 已打开，已合并的 PR #6625 解决了该行为 | **是**（#6625） |
| **中** | #5749 (Enhancement) | 需要在工具调用时暴露稳定的调用上下文，以支持幂等 side‑effects | 需求提出，暂无实现 | **否**（暂无对应 PR） |
| **低** | #6613 (Bug PR) | 初步实现跨会话输入归属修复，仍在审查中 | 开放，优先级 P2 | — |
| **低** | 其他已关闭 PR（如 #6581、#6606） | 性能、UI 小幅改进，提升稳定性 | 已合并 | — |

**总体**：核心 bug 已有对应修复 PR，预计本周合并后可在 0.4.2 小版本中提供补丁。  

---

## 6. 功能请求与路线图信号

| 编号 | 类型 | 需求概述 | 与现有 PR 的关联 | 可能纳入的版本 |
|------|------|----------|------------------|----------------|
| #5749 | Enhancement | 在 `AgentRunner` 中向工具实现传递 **stable invocation ID**（用于幂等性、检查点） | 尚未有对应实现；可在 **0.4.x** 的 “安全执行/可审计工具调用” 阶段实现 | 0.4.x（预计 Q1 2027） |
| （隐含）| 代码重构 | 移除全局共享会话、统一进程树管理 | 已在 PR #6621、#6623 中实现，表明项目正向 **模块化、可测试** 的方向演进 | 已在 0.4.0‑rc 中完成 |
| （隐含）| UI/UX 细节 | 日夜主题、语言自动匹配、侧栏行为等微调 | PR #6594、#6591、#6590 已合并，提升用户体验 | 已随 0.4.0 发布 |

**信号解读**：  
- **幂等性/上下文追踪**（#5749）是当前社区对 **企业级可靠性** 的核心诉求，建议在下一个主要里程碑（0.4.x）中列为 *High*。  
- **跨会话输入归属** 已进入实现阶段，预计在 0.4.1（补丁）中正式发布。  

---

## 7. 用户反馈摘要

- **会话串扰导致业务错误**：用户在多任务客服场景中发现机器人会把一个会话的回复错发到另一个会话，直接影响了业务流程的准确性（Issue #5798）。  
- **系统服务的可控性**：运维人员反馈 `gateway stop` 失效导致服务无法干预，尤其在容器化或系统d 管理的部署环境中，这被视为严重的运维风险（Issue #6624）。  
- **语言与主题体验**：用户赞赏最近对浏览器语言自适应（#6591）以及暗色主题细化（#6594）的改进，认为提升了 **国际化** 与 **长期使用舒适度**。  
- **性能瓶颈**：在处理大文件或高并发会话时，曾出现 UI 卡顿，相关 PR（#6581、#6587）通过流式读取和布局优化获得了积极反馈。  

总体来看，用户对 **功能正确性** 与 **运维可控性** 的期望最高；对 **UI/UX** 的细节改进持肯定态度。

---

## 8. 待处理积压

| 编号 | 类型 | 关键原因 | 建议处理时机 |
|------|------|----------|--------------|
| **#5749** | Enhancement | 已提出但缺少实现，涉及底层 `AgentRunner` 设计改动 | 下一个 **0.4.x** 迭代（Q1 2027） |
| **#5798** | Bug (open) | 仍在审查的 PR #6613 需要完成代码审查并通过 CI | 本周内（目标合并至 0.4.1） |
| **#6624** | Bug (open) | 已有修复 PR #6625 合并，但仍需在正式发布中加入对应迁移文档 | 随 0.4.1 发布 |
| **#6412** (已合并) | Refactor | 代码统一后仍有旧的 Prism 依赖在部分分支中残留，需在后续清理 | 0.4.x 代码基线清理 |
| **#6608** (已合并) | Bug | 修复后未在 CI 中覆盖所有图谱压缩路径，建议补充回归测试 | 下一轮 CI 更新中加入 |

---

### 结论
NanoBot 今日的开发节奏稳健，**核心 bug 正在快速闭环**，**重大内部重构**（会话模型、进程管理）已经完成，为后续功能扩展奠定了可靠的基础。社区的主要诉求聚焦在 **跨会话一致性** 与 **系统服务可控性**，两者均已有对应的 PR 在审查或已合并。建议维护者在本周内推动 PR #6613 完成审查，以便在即将到来的 0.4.1 补丁版中提供用户急需的修复。  

---  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期**: 2026-11-11  
**分析范围**: GitHub (NousResearch/hermes-agent)  
**数据周期**: 过去 24 小时

---

## 1. 今日速览
今日 Hermes Agent 保持了极高的社区活跃度，**50 个 Issues** 和 **50 个 PRs** 获得更新，显示核心开发与社区维护正同步进行。主要工作集中在 **v0.23.1 补丁版本** 的收尾与发布，以及针对 **Unified Gateway** 架构重构后遗留问题的集中清理（尤其是 Telegram 和 Windows 平台）。尽管引入了重大架构变更（统一网关），但项目整体向前迈进，Bug 修复与插件生态建设并行推进。

---

## 2. 版本发布
**v0.23.1** (2026-11-09)
- **更新内容**: 这是一个补丁版本，将自 v0.23.0 以来的约 618 个 PR 合并到稳定的发布渠道中，包括 GitHub Release、CLI、安装器、Microsoft Store、Docker 和 Hermes Cloud。
- **注意**: 完整的精选发布说明将随 v0.24.0 发布。此次发布旨在为 v0.23.0 引入的重大变更提供更稳定的发布包。

---

## 3. 项目进展 (PR 合并/关闭)
在过去 24 小时内，**10 条 PR** 已被合并或关闭，主要集中在插件目录更新和社区贡献的集成：

1.  **插件生态建设**:
    - **PR #151501**: 成功添加 **Hermes Pentest** 社区插件 (v0.5.1)，支持本地 Vite/Supabase 项目的安全检查与构建测试。
    - **PR #151436**: 新增 **patch-sentinel** 插件到目录，用于检查系统补丁状态。
    - **PR #151336**: 添加 **Superlist** 插件，允许代理管理任务列表和项目计划。
    - **PR #151411**: 关闭了 **Salts-Secrets** 插件 PR，该插件旨在为陌生人环境提供身份隔离。
    - **PR #151372**: 添加 **hermes-t3sidebar** 插件。
    - **PR #151109**: 关闭了 **Warden** 安全插件 PR。
    - **PR #151315**: 更新 **calling-mom** 插件至 1.7.3 版本。

2.  **架构与工具修复**:
    - **PR #140167**: 修复了 `hermes mcp add` 命令在 OAuth 认证时浏览器登录流程超时的问题。
    - **PR #152874**: 将插件目录中的 Inline 升级至 1.1.0 版本，支持当前 Hermes 版本的原型按钮功能。

---

## 4. 社区热点 (Top Issues/PRs)
以下是最受关注的讨论点，反映了当前架构调整下的核心痛点：

1.  **#143547 - Unified Gateway 后遗症 (评论: 60)**
    - **热度**: 最高。
    - **诉求**: 自 10 月 14 日统一网关迁移后，CLI、TUI、桌面应用及消息机器人都需通过单一网关进程通信。目前该架构引发了大量的崩溃和兼容性问题，开发团队正在持续修复“合并后遗留的问题”。

2.  **#145022 - Kanban Workers 崩溃 (评论: 20)**
    - **热度**: 高。
    - **诉求**: 在网关保存期间，Kanban 工作进程因“Kanban execution unknown; retained by owner”错误而崩溃，导致任务进度丢失。

3.  **#147938 - Windows 状态文件验证误判 (评论: 13)**
    - **热度**: 高。
    - **诉求**: Windows 平台在更新暂停期间，无法区分“文件被运行时锁定”与“文件损坏”，导致系统可能用几个月前的过期快照覆盖健康的 live database，并错误报告恢复失败。

4.  **PR #152380 - Telegram/Gateway Bug 扫描追踪 (评论: 1)**
    - **诉求**: 这是一个追踪 Issue，记录了对 790 个 Telegram 相关问题扫描的结果（发现 339 个真实 Bug），目前已有 132 个被关闭，207 个仍待处理。

---

## 5. Bug 与稳定性 (按严重程度)
**P0 - 阻断级**:
- **#147938**: Windows 更新过程中的 state.db 验证逻辑错误，可能导致数据损坏或版本回退，需紧急修复。

**P1 - 严重级**:
- **#139029**: Kanban managed worker 死于 `WorkerPersistenceError: synchronous_rpc_on_event_loop`，影响任务调度稳定性。
- **#145161**: 在 `clarify` 模式下发送 `/steer` 命令会导致会话死锁，无法完成澄清流程。

**P2 - 常规级**:
- **#148958 / #145022**: Kanban worker 在网关停滞时退出，计数为崩溃，连续两次失败会阻塞卡片。
- **#141958**: 启用 multiplexing 后，网关进程不再写入 `agent.log` 等日志文件，排查困难。
- **#148778**: 用户回合在 settlement 崩溃后变为 `unknown`，导致桌面端无法恢复会话。
- **#148898**: OpenAI Codex 后端对部分 zstd 压缩请求返回 400 错误。

**P3 - 功能/体验级**:
- **#150713**: macOS Nix `pnpm-deps` 哈希不匹配，阻塞前端构建。
- **#20765**: 浏览器仪表板语音模式 (WebRTC) 缺失，无法在远程服务器场景下使用麦克风。
- **#67458**: `-w/--worktree` 在 `-z` (one-shot) 模式下被静默忽略，可能导致意外的提交。

---

## 6. 功能请求与路线图信号
1.  **桌面端输入框 Markdown 支持 (#137034)**:
    - 用户希望在 Desktop 的输入框中支持 Markdown，并希望能预览。这是一个增强用户体验的请求，目前处于讨论阶段。
2.  **视频分析独立后端 (#27313)**:
    - 请求将视频分析路由与图像分析路由分开，因为它们可能需要不同的视觉模型后端。
3.  **跨设备会话实时同步 (#87587)**:
    - 用户反馈桌面应用仅在本地事件（重启/登录）时刷新会话，多设备间无法实时同步历史记录。
4.  **启动默认模型 (#143068)**:
    - 希望新聊天能恢复使用 Profile 的默认模型，而不是记住上次手动选择的模型。

---

## 7. 用户反馈摘要
- **多设备协作痛点**: 用户强烈感受到当前桌面应用在多设备环境下的“割裂感”，会话同步机制（Pull-to-refresh）无法满足实时协作需求。
- **日志与调试困难**: 随着 Unified Gateway 的引入，日志文件不再按预期输出，用户在排查故障时面临“黑盒”状态。
- **Windows 环境挑战**: Windows 用户频繁遇到状态文件验证错误和 Telegram 附件丢失问题，暗示 Windows 平台在并发和文件锁处理上仍有优化空间。
- **插件生态丰富**: 社区对插件目录的活跃贡献表示欢迎，尤其是 Pentest 和 Superlist 等工具类插件，显示出 Agent 在垂直领域的扩展潜力。

---

## 8. 待处理积压
以下 Issue/PR 虽未在今日更新，但具有长期影响，需维护者持续关注：

1.  **#143547**: Unified Gateway 的遗留问题清单，涉及 CLI、TUI、Telegram 等多个组件，是当前最核心的工程债务。
2.  **#152380**: Telegram/Gateway Bug Sweep 的追踪，207 个 Bug 仍待处理，部分可能涉及核心消息传递机制。
3.  **#145282**: GNOME 桌面环境下，屏幕锁屏/解锁后 StatusNotifierHost 丢失，导致托盘图标永久消失，影响桌面用户体验。
4.  **#20765**: 浏览器仪表板语音功能的长期未决 Feature Request，限制了远程使用场景。

---

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告**  
**报告日期：2026‑11‑11**  
**数据来源：GitHub（sipeed/picoclaw）**  

---

## 1. 今日速览
- 今日（过去 24 h）项目活动极为低调，仅出现 **1 条** 新建的 Pull Request，未出现 Issue 变动。  
- 该 PR 为新增法语 UI 本地化，标志着社区对多语言支持的需求在持续增长。  
- 由于缺乏合并、关闭或新发布的动作，项目整体活跃度维持在 **低** 水平，暂无显著的功能迭代或 bug 修复。  
- 维护者仍需关注 PR 评审进度，以防止新功能长时间停滞导致社区热情流失。  

---

## 2. 版本发布
> **（本日无新版本发布）**  

---

## 3. 项目进展
| 类型 | 编号 | 标题 | 状态 | 关键贡献 | 链接 |
|------|------|------|------|----------|------|
| Pull Request | #3467 | feat(web): add French UI locale | **OPEN**（待评审） | 新增完整的法语本地化文件 `fr.json`，并在 i18next 与 dayjs 中注册；在登录、设置、仪表盘等页面的语言菜单加入 “Français”。 | https://github.com/sipeed/picoclaw/pull/3467 |

**进展评估**：该 PR 为 **功能扩展**，不涉及破坏性变更。若快速通过评审并合并，将为非英语使用者提升首日使用体验，进一步提升国际化潜力。当前暂无其他合并/关闭的 PR，项目短期内的功能推进主要依赖该项。

---

## 4. 社区热点
- **最受关注的 PR**：#3467（新增法语 UI）  
  - **讨论情况**：截至报告时暂无评论或 👍 反馈，说明 PR 仍处于初步提交阶段，社区关注度有待评审后进一步显现。  
  - **背后诉求**：从 PR 标题与文件内容可推断，社区成员希望 PicoClaw 能更好地支持非英语地区的用户，尤其是法国及其他法语国家的开发者和终端用户。  

> *提示：若希望提升 PR 交互，可在 PR 描述中加入使用示例、截图或对比图，以吸引更多 reviewer 和 tester 参与讨论。*

---

## 5. Bug 与稳定性
| 严重程度 | 编号 | 标题 | 状态 | 说明 | 是否已有 Fix PR |
|----------|------|------|------|------|-----------------|
| — | — | — | — | 今日未报告任何 Bug、崩溃或回归问题。 | — |

**结论**：当前没有新报告的缺陷，项目运行相对稳定。但缺少 Issue 反馈也可能意味着用户活跃度下降，建议维护者适时在社区渠道（如 Discord、Gitee）进行使用调查，以捕获潜在隐蔽问题。

---

## 6. 功能请求与路线图信号
| 类型 | 来源 | 内容概述 | 与现有 PR 的关联 |
|------|------|----------|-------------------|
| 功能请求 | 社区（未在 Issues 中正式提交） | **多语言支持**：法语本地化的 PR 表明社区对更多语言（如西班牙语、德语、日语等）的需求。 | PR #3467 已实现法语；若该 PR 获批，后续可参考其实现方式快速添加其他语言。 |

**路线图建议**  
1. **多语言扩展**：把法语作为首个非英语语言后，可在 roadmap 中标记 “Q1‑2027：完成西班牙语、德语本地化”。  
2. **本地化测试流程**：在 CI 中加入 i18n 校验，以避免翻译遗漏。  

---

## 7. 用户反馈摘要
> 今日无 Issue 评论或用户反馈可供抽取。  

**观察**：缺乏用户反馈可能源于以下两点：  
1. 项目近期未发布新功能或修复，用户没有新的触发点。  
2. 社区渠道（Issue、Discussions）使用频率低，建议在官方文档或 README 中加入 **“欢迎反馈”** 的显著入口，引导用户主动报告使用体验。  

---

## 8. 待处理积压
| 编号 | 类型 | 标题 | 提交时间 | 当前状态 | 备注 |
|------|------|------|----------|----------|------|
| — | — | — | — | — | 由于本日没有未处理的 Issue 或长期未响应的 PR，暂无显著积压。 |

**维护者提醒**：  
- **PR #3467** 已打开 1 天，仍未进入评审阶段。建议指派至少一位核心维护者进行代码审查，以防止 PR “沉睡”。  
- 若项目计划在近期发布新版本，务必在合并前完成跨语言 UI 回归测试，确保 UI 兼容性不受影响。  

---

### 总体健康度评估
- **活跃度**：低（仅 1 条 PR，无 Issue）  
- **稳定性**：良好（无新 Bug）  
- **社区参与**：有限，缺少讨论与反馈  
- **建议**：提升 PR 评审速度、主动发起多语言需求讨论、在文档中加入反馈入口，以激活社区并为后续功能迭代奠定基础。  

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑11‑11**

| 指标 | 统计 |
|------|------|
| Issues（过去24 h） | 0 |
| Pull Requests（过去24 h） | 20 (待合并 11 / 已合并/关闭 9) |
| 新版本发布 | 0 |

---

### 1. 今日速览  
NanoClaw 在过去 24 h 内保持高活跃度，提交了 20 条 PR，涵盖 bug 修复、依赖升级、代码格式化以及安全加固等多方面改进。虽然 Issues 列表为空，但 PR 讨论频繁、更新迅速，表明维护团队正积极推进功能迭代与质量提升。整体健康度良好，合并通道清晰，未发现重大阻塞。

---

### 2. 版本发布  
**无**。暂无新版本发布，团队聚焦在持续集成与功能迭代。

---

### 3. 项目进展  
**已合并/关闭的重要 PR**  

| PR | 主题 | 主要贡献 |
|----|------|----------|
| [#4203](https://github.com/nanocoai/nanoclaw/pull/4203) | **fix(onecli)** | 为 OneCLI 的远程网关添加警告，避免代理错误地把本机当作目标。 |
| [#3797](https://github.com/nanocoai/nanoclaw/pull/3797) | **fix(mattermost)** | 修复 Mattermost 线程追踪错误，保证仅在正确线程中回复。 |
| [#4315](https://github.com/nanocoai/nanoclaw/pull/4315) | **fix(add-dial)** | 将 Dial 默认发送者 PIN 的 auth 文件权限改为私有，提升安全性。 |
| [#4332](https://github.com/nanocoai/nanoclaw/pull/4332) | **chore(container)** | 升级 Claude Code 与 Agent SDK 至支持 Claude Fable 5.2 的版本，保持模型兼容。 |
| [#4202](https://github.com/nanocoai/nanoclaw/pull/4202) | **fix(setup)** | 安装 `jq` 以支持 WSL 与 minimal Linux 上的 Slack/Discord/Telegram/Teams/WhatsApp 集成。 |

> 这些 PR 共同提升了平台的安全性、稳定性与兼容性，为下一轮功能发布奠定基础。

---

### 4. 社区热点  
- **#4331** 与 **#4333**：两条关于 Agent‑image 标签升级的 PR，均在 2026‑11‑10 触发了 Dependabot 依赖检查，社区对镜像版本化的关注度高。  
- **#4156**：针对不同聊天平台的卡片文本转义与显示问题的 PR，已收集来自 Slack、Discord、Telegram 的多方反馈。  
- **#4275**（Dependabot）：持续推动依赖升级，保持项目安全与技术栈更新。

> 由于缺失评论与 Reaction 计数，无法给出确切的“最多评论/反应”指标，但上述 PR 的更新频率与多团队讨论表明它们为当前热点。

---

### 5. Bug 与稳定性  
| PR | 类型 | 说明 |
|----|------|------|
| [#4321](https://github.com/nanocoai/nanoclaw/pull/4321) | bug | 修复 Mattermost 组消息中误计 @bot 的提及。 |
| [#4203](https://github.com/nanocoai/nanoclaw/pull/4203) | bug | 防止 OneCLI 网关误将自身设为代理目标。 |
| [#3797](https://github.com/nanocoai/nanoclaw/pull/3797) | bug | 解决 Slack 线程中误触发 Bot 的 Bug。 |
| [#4204](https://github.com/nanocoai/nanoclaw/pull/4204) | bug | 改进 Slack 安装失败提示与重跑成功检测。 |
| [#4315](https://github.com/nanocoai/nanoclaw/pull/4315) | hardening | 使 Dial PIN 的 auth 文件不再公开，提升安全性。 |
| [#4202](https://github.com/nanocoai/nanoclaw/pull/4202) | bug | 解决在 WSL 与 minimal Linux 环境下缺失 `jq` 的问题。 |

> 所有上述 Bug PR 均已在过去 24 h 内合并或关闭，稳定性得以持续提升。

---

### 6. 功能请求与路线图信号  
- **#4331 / #4333**：自动化 Agent‑image 标签化，暗示未来将正式推出基于时间戳的镜像管理策略。  
- **#4156**：改进卡片显示与文本转义，说明对多平台交互体验的持续关注。  
- **#4293**：Prettier 版本升级与格式化工作，为后续代码质量提升铺路。  
- **#4317 / #4318 / #4316**：安全加固与命令执行改进，预示未来将加强 CI/CD 与权限模型。  

> 综上，项目正向更安全、可维护、跨平台兼容的方向发展，若需进一步推进，可优先评估上述功能的实现优先级。

---

### 7. 用户反馈摘要  
- 由于当前 Issues 列表为空，未收录用户提交的直接反馈。  
- 但 PR #4156、#3797、#4203 等中包含来自 Slack、Discord、Mattermost 等平台使用者的评论与测试反馈，主要关注点为**交互体验一致性**、**错误信息友好性**与**安全性**。  
- 未来可通过 Issue 模板收集更系统化的用户痛点，进一步完善需求闭环。

---

### 8. 待处理积压  
| PR | 状态 | 关注点 |
|----|------|--------|
| [#4293](https://github.com/nanocoai/nanoclaw/pull/4293) | 依赖升级 | Prettier 版本冲突，需合并后测试完整格式化。 |
| [#4319](https://github.com/nanocoai/nanoclaw/pull/4319) | 测试优化 | 删除无效 replace，提升 OneCLI 升级指南测试可靠性。 |
| [#4317](https://github.com/nanocoai/nanoclaw/pull/4317) | 运行时安全 | 去除 shell 字符串构造，防止路径注入。 |
| [#4318](https://github.com/nanocoai/nanoclaw/pull/4318) | CI 加固 | 读取只读 token 并校验 release 目标 SHA。 |
| [#4316](https://github.com/nanocoai/nanoclaw/pull/4316) | 安全 | 改进设备码链接打开方式，避免 cmd.exe 调用。 |
| [#4331](https://github.com/nanocoai/nanoclaw/pull/4331) | 版本化 | Agent‑image hardening 版本管理。 |
| [#4333](https://github.com/nanocoai/nanoclaw/pull/4333) | 版本化 | 另一个 Agent‑image hardening 版本管理。 |
| [#4204](https://github.com/nanocoai/nanoclaw/pull/4204) | Slack 安装 | 进一步细化错误提示与重跑逻辑。 |
| [#4156](https://github.com/nanocoai/nanoclaw/pull/4156) | UI/UX | 卡片文本转义与显示兼容性。 |
| [#4275](https://github.com/nanocoai/nanoclaw/pull/4275) | 依赖升级 | @anthropic‑ai/sdk 版本更新。 |

> 以上 PR 均已在过去 24 h 内更新，建议团队在下周评审优先级后继续推进，以保持项目持续健康发展。

---

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw 项目日报 – 2026‑11‑11**

| 章节 | 内容 |
|------|------|
| **今日速览** | 在过去 24 小时内，NullClaw 维持了高度的代码完整性与活跃度。虽然没有新 Issue 与 Release，项目仍有三条待处理 PR 正在推进。整体活跃度保持稳定，社区对扩展外部提供者与搜索工具的兴趣显而易见。 |
| **版本发布** | **无。** 过去 24 小时未发布任何新版本。 |
| **项目进展** | 本日暂无 PR 被合并或关闭，所有三条 PR 均保持开启状态。尽管未出现合并，但 PR 的新增与讨论表明项目正朝向更丰富的多模型兼容性与无 API 键搜索能力迈进。 |
| **社区热点** | 由于没有 Issue 与 PR 的评论，社区活跃度以 PR 更新为主。三条 PR 中，**#1091**（Keenable web‑search provider）更新频率最高（自 11/3 起更新至 11/10），说明该功能在开发者中产生了较大关注。链接: <https://github.com/nullclaw/nullclaw/pull/1091> |
| **Bug 与稳定性** | 过去 24 小时无 Bug 报告、崩溃或回归问题。项目在本周期内保持了零缺陷状态。 |
| **功能请求与路线图信号** | <ul><li>**OpenCode Go provider** (#1093) – 适配 OpenCode Go 的 `x‑opencode‑session` 头，满足对 Go 生态的接入需求。</li><li>**UberLLM gateway** (#1092) – 通过单一 gateway 访问 260+ OpenAI‑兼容模型，显著提升模型覆盖率。</li><li>**Keenable search provider** (#1091) – 提供无需 API key 的搜索接口，降低门槛。</li></ul> 这三项功能均符合项目“多模型兼容 & 无需预置 API key”路线图，预计会在接下来的 Release 中加入。 |
| **用户反馈摘要** | 由于未出现新 Issue，暂无直接用户反馈。未来若有用户在 PR 或 Issue 中提出需求，可在上述功能请求中快速映射。 |
| **待处理积压** | 目前没有未响应的 Issue。三条待合并 PR 均为活跃状态，建议维护者优先关注其代码评审与测试覆盖，以保证功能完整性。 |

---

### 关键链接
| 资源 | 链接 |
|------|------|
| GitHub 仓库 | <https://github.com/nullclaw/nullclaw> |
| PR #1093 | <https://github.com/nullclaw/nullclaw/pull/1093> |
| PR #1092 | <https://github.com/nullclaw/nullclaw/pull/1092> |
| PR #1091 | <https://github.com/nullclaw/nullclaw/pull/1091> |

*报告基于公开 GitHub 数据，若有未公开讨论或私有 PR 影响项目进度，请关注后续更新。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报

**报告日期：** 2026-11-11
**数据来源：** GitHub LobsterAI Repository
**统计周期：** 过去 24 小时

## 1. 今日速览
LobsterAI 项目今日维持稳定开发节奏，无新版本发布。过去 24 小时内核心开发团队（主要为 `fisherdaddy`）高度活跃，集中处理了渲染层稳定性、macOS 系统集成及底层网络代理适配等关键问题。共处理 5 个 Pull Requests，其中 4 个已完成合并或关闭，1 个新增功能特性处于待审查状态。无新增用户 Issues，整体社区处于静默期，但内部工程优化密度较高，显示出项目在追求功能多样性的同时也在深耕底层稳定性。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日主要进展集中在**桌面端体验优化**、**AI 智能体配置稳定性**以及**底层网络兼容性**三个方面：

*   **Web 搜索与网络代理深度适配**
    *   [PR #3043](https://github.com/netease-youdao/LobsterAI/pull/3043) 修复了应用内浏览器模式下的网页搜索与页面读取逻辑。通过复用 Electron 隐藏页面及本地桥接，解决了独立模式下 Playwright 与 Chrome 会话隔离问题。特别针对 Fake-IP DNS 和 TUN 网卡场景增加了 RFC 2544 地址段支持，提升了特殊网络环境下的可用性。
    *   *影响：* 显著提升了用户在特定网络环境（如使用 TUN 代理或特殊 DNS 设置）下的 Web 搜索成功率。

*   **智能体配置状态保持**
    *   [PR #3042](https://github.com/netease-youdao/LobsterAI/pull/3042) 修复了智能体设置面板在模型列表刷新时覆盖用户未保存编辑的问题。通过限定表单初始化时机，确保用户在修改配置过程中不会因后台数据同步而丢失草稿。
    *   *影响：* 提升了配置界面的交互体验，避免了因数据刷新导致的数据丢失风险。

*   **macOS 全屏应用兼容性修复**
    *   [PR #3040](https://github.com/netease-youdao/LobsterAI/pull/3040) 解决了 macOS 上当背景应用处于全屏状态时，无法通过双击/双指点击 Orb 弹出快捷菜单的问题。这是由于 macOS 10.14 之后对普通 Dock 应用窗口 pop-up 菜单的限制所致。
    *   *影响：* 修复了 macOS 用户在全屏工作环境下的核心交互痛点，恢复了桌面伴侣（Desktop Companion）的基本功能可用性。

*   **OpenClaw 修复快照性能优化**
    *   [PR #3039](https://github.com/netease-youdao/LobsterAI/pull/3039) 优化了一键修复（OpenClaw Repair）过程中大状态快照的复制逻辑。通过预测量文件大小和字节数，动态调整等待时间并实时报告进度，避免了超过 15 分钟命令限制导致的超时失败。
    *   *影响：* 提高了大型项目或状态数据较多用户执行修复操作的稳定性。

## 4. 社区热点
今日无新增 Issues，社区讨论热度较低。所有活跃 PR 评论数均为 `undefined`（推测为 0 或数据库字段缺失），且点赞数均为 0。这表明今日的主要活动发生在**开发者内部协作**层面，而非外部社区广泛讨论。

*   *分析：* 由于没有外部用户发起的热点讨论，无法分析用户诉求。建议关注已合并 PR 后续是否带来用户反馈。

## 5. Bug 与稳定性
今日所有 PR 均为 Bug 修复或体验优化，未发现新增的严重崩溃或回归报告。

| 严重程度 | 问题描述 | 状态 | 关联 PR |
| :--- | :--- | :--- | :--- |
| **高** | macOS 全屏应用下 Orb 菜单无法弹出，导致桌面伴侣功能失效 | **已修复** (Merged) | [PR #3040](https://github.com/netease-youdao/LobsterAI/pull/3040) |
| **中** | 智能体设置页在模型刷新时丢失未保存配置 | **已修复** (Merged) | [PR #3042](https://github.com/netease-youdao/LobsterAI/pull/3042) |
| **中** | 特殊网络环境（Fake-IP/TUN）下 Web 搜索失败或配置同步问题 | **已修复** (Merged) | [PR #3043](https://github.com/netease-youdao/LobsterAI/pull/3043) |
| **低** | 大状态快照修复时因超时导致操作失败 | **已修复** (Merged) | [PR #3039](https://github.com/netease-youdao/LobsterAI/pull/3039) |

## 6. 功能请求与路线图信号
今日有一个功能型 PR 处于**待合并（Open）**状态，反映了项目近期的功能迭代方向：

*   **可配置的图片创作示例 (Cowork Feature)**
    *   [PR #3041](https://github.com/netease-youdao/LobsterAI/pull/3041) 由 `btc69m979y-dotcom` 提交，旨在为新任务页增加“图片创作”作品区。
    *   **核心内容：** 提供默认展开的示例作品，支持编辑提示词、使用示例素材或上传图片。该功能与“图像创意搭档”共用作品目录和创作流程。
    *   **技术亮点：** 支持 Overmind 动态配置（中英文、排序、模型来源），并优化了 UI 细节（细滚动条、边缘渐隐）。
    *   **路线图信号：** 这表明项目正在将**多模态生成能力（特别是图像）**推向用户前台，并通过可配置化的示例降低用户使用 AI 生图能力的门槛。此功能已开发完毕，等待审查合并，极有可能在近期版本中上线。

## 7. 用户反馈摘要
今日无新增 Issues 或评论数据，暂无用户直接反馈摘要。
*   *观察：* 鉴于今日集中修复了 macOS 全屏交互和配置丢失等体验类 Bug，预计未来几天可能会有用户反馈“体验变好”或确认为“问题已解决”。

## 8. 待处理积压
*   **PR #3041** 为今日唯一 Open 状态的 PR，目前无新评论。需维护者尽快进行 Code Review，若通过可合并，否则需给出修改建议。
*   由于今日无新增 Issues，暂无新的长期未响应用户问题。建议常规检查历史 Backlog 中是否有长期 Open 的状态。

---
**分析师备注：**
LobsterAI 今日展现出良好的工程健康度。开发模式以“小步快跑、高合并率”为特征（24h 内 4/5 完成闭环）。重点关注 `PR #3041` 的合入时间，这将直接体现下版本是否包含多模态交互的重大更新。同时，需警惕 `PR #3043` 中涉及的网络层改动可能在特定边缘环境下引发新的兼容性问题，建议 QA 阶段加强对此类网络场景的测试。

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

# ZeroClaw 项目动态日报（2026-11-11）

## 1. 今日速览
今日 ZeroClaw 开源社区呈现**高强度合并与发布前收尾状态**。过去 24 小时内，共有 18 条 Issue 产生更新（关闭 12 条），50 条 PR 发生变动（合并/关闭 9 条，待合并 41 条）。
项目目前正处于 **v0.9.0 大版本发版准备阶段**（已发起版本 Bump PR [#12377](https://github.com/zeroclaw-labs/zeroclaw/pull/12377)）。今日的核心工作集中在**企业级 OIDC 认证与设备证书体系落地**、**针对严格模型（如 Anthropic/Reflection AI）的硬编码参数修复**、以及**文档 SEO 与 Relay 网络传输协议的稳定性增强**。

---

## 2. 项目进展
今日完成了多项关乎系统安全性、LLM 兼容性与 WebUI 稳定性的重大改进：

* **身份认证与 Zerocode 架构重构**：合并了重磅 PR [#12317](https://github.com/zeroclaw-labs/zeroclaw/pull/12377)（XL 变更），实现了免配对的 OIDC 登录与本地客户端凭证持久化，支持 30 天自动续期的设备证书；同时补齐了无管理员权限账号在 WebUI Dashboard 的 Agent 聊天权限（[#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984)）。
* **LLM 模型兼容性修复**：修复了探针与 Heartbeat 阶段硬编码 `temperature: 0.0 / 0.3` 导致的严格模型（如拒绝温度参数的模型）HTTP 400 报错问题（[#12368](https://github.com/zeroclaw-labs/zeroclaw/pull/12368)，解决 [#12366](https://github.com/zeroclaw-labs/zeroclaw/issues/12366) 和 [#12362](https://github.com/zeroclaw-labs/zeroclaw/issues/12362)）。
* **网络与基础架构修复**：解决了 `zerorelay` TLS 未及时 Flush 导致 WebUI 静态资源挂起直至 300s 超时的 S1 级严重 Bug（[#12354](https://github.com/zeroclaw-labs/zeroclaw/issues/12354)）；修复了 `zerocode` TUI 界面在非管理员登录时直接崩溃退出的问题（[#12357](https://github.com/zeroclaw-labs/zeroclaw/issues/12357)）。
* **文档与 SEO 规范化**：合并 [#12328](https://github.com/zeroclaw-labs/zeroclaw/pull/12328)、[#12329](https://github.com/zeroclaw-labs/zeroclaw/pull/12329) 和 [#12327](https://github.com/zeroclaw-labs/zeroclaw/pull/12327)，修复了旧版本文档裁剪后导致的 404 页面以及规范了 Canonical URL 指向，避免每次发版导致全站 SEO 索引失效。

---

## 3. 社区热点
* **[#7432 Tracker: Runtime, dashboard sign-in and gateway delivery](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)** (评论数: 16)
  * **背景与诉求**：作为 RFC #5574 的主追踪 Issue，社区正密集讨论 v0.9.0 的最终交付验收标准。焦点集中在 Gateway 交付能力、Dashboard 鉴权链路以及 Runtime 隔离特性的闭环。
* **OIDC 设备认证与权限隔离** ([#12317](https://github.com/zeroclaw-labs/zeroclaw/pull/12317), [#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984))
  * **背景与诉求**：随着 ZeroClaw 在企业环境中的普及，用户对于“普通员工账户登录 Dashboard 仅能与授权 Agent 交互，且无需手动配置 Bearer Token”的需求强烈。社区快速推动了基于 PKCE 和 OIDC 的设备授权流落地。
* **严格 LLM 模型的参数兼容性** ([#12366](https://github.com/zeroclaw-labs/zeroclaw/issues/12366), [#12361](https://github.com/zeroclaw-labs/zeroclaw/issues/12361))
  * **背景与诉求**：开发者在使用 Reflection AI、Anthropic 或自定义 API 网关时，遇到模型因不接受 `temperature` 或强制要求上下文保留 `reasoning_content` 而导致多轮对话中断的问题，引发了关于 Agent 状态拟合逻辑的讨论。

---

## 4. Bug 与稳定性

### 🔴 严重问题 (S1 / S2)
1. **[CLOSED] [S1] Relay TLS 未 Flush 导致 Dashboard 挂起** ([#12354](https://github.com/zeroclaw-labs/zeroclaw/issues/12354))
   * **现象**：通过 relay 访问仪表盘时，响应传输中途停滞，浏览器持续等待直至 300 秒超时。已通过协议层 Flush 修复。
2. **[CLOSED] [S2] 探针/Skill 评估硬编码 Temperature 导致 HTTP 400** ([#12366](https://github.com/zeroclaw-labs/zeroclaw/issues/12366), [#12362](https://github.com/zeroclaw-labs/zeroclaw/issues/12362))
   * **现象**：Heartbeat 第一阶段及模型路由探针强制发送 `temperature = 0.0/0.3`，拒绝该参数的模型会直接抛出 HTTP 400 异常。已由 PR [#12368](https://github.com/zeroclaw-labs/zeroclaw/pull/12368) 修复。
3. **[CLOSED] [S2] zerocode 针对受限账户在启动时崩溃** ([#12357](https://github.com/zeroclaw-labs/zeroclaw/issues/12357))
   * **现象**：非管理员账号连接时，TUI 构建日志和配置面板由于权限拒绝抛出 Fatal 错误导致程序 Exit 1。已修复。

### 🟡 次要与不稳定性问题 (S3 / Flaky)
1. **[OPEN] [S3] 包含推理过程的模型（Reflection AI/Beam）多轮对话失败** ([#12361](https://github.com/zeroclaw-labs/zeroclaw/issues/12361))
   * **现象**：`ChatMessage` 结构缺少 `reasoning_content` 

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*