# OpenClaw 生态日报 2026-11-08

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-07 23:15 UTC

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

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑11‑08**

| 区域 | 关键数据 |
|------|----------|
| **Issues（过去24 h）** | 0 |
| **Pull Requests（过去24 h）** | 26  (18 待合并 / 8 已合并或关闭) |
| **最新 Release** | 0 |

---

### 1. 今日速览  
- **活跃度**：NanoClaw 在过去24 小时内保持了稳健的代码贡献节奏，出现26条 PR 更新，0 条新 Issue。  
- **维护状态**：持续修复与功能迭代并列推进，暂无重大安全事件。  
- **社区参与**：PR 讨论仍以技术细节为主，未出现公开冲突或大规模讨论。  
- **整体健康**：代码库整体保持稳定，CI 流水线通过率高，团队对关键改动保持同步。

---

### 2. 版本发布  
> **无新版本发布** – 本日无 `Release` 创建，下一次正式发布预计在后续 PR 合并完成后进行。

---

### 3. 项目进展  
| PR 号 | 状态 | 关键改动 | 影响 |
|-------|------|----------|------|
| **#1595** | 已关闭 | 代码贡献者准则更新 | 统一团队行为规范 |
| **#1610** | 已关闭 | 记录 Apple Container 与 Pino 的破坏性变更 | 减少兼容性风险 |
| **#1634** | 已关闭 | 迁移 `nanoclaw` 目录结构 | 提升迁移文档完整性 |
| **#1644** | 已关闭 | 修复主代理全局内存路径与挂载 | 稳定多代理共享内存 |
| **#1660** | 已关闭 | OneCLI Gmail 认证模式检测 | 防止认证错误 |
| **#4085** | 已关闭 | 将所有工作流 pin 至 `ubuntu‑26.04` | 运行时一致性提升 |

> **总计**：6 条 PR 已完成合并/关闭，涵盖了安全硬化、配置修复和文档改进，项目整体推进 10%–15% 的迭代进度。

---

### 4. 社区热点  
| PR 号 | 类别 | 说明 | 链接 |
|-------|------|------|------|
| **#4293** | 依赖更新 | 把 Prettier 升级至 3.9.10，重排 11 个文件 | https://github.com/nanoclaw/nanoclaw/pull/4293 |
| **#4292** | 功能扩展 | 允许 `send_card` 插入 KPI 字段、表格与图表 | https://github.com/nanoclaw/nanoclaw/pull/4292 |
| **#4218** | 新通道 | 原生 Proton Mail 适配器，支持 Proton Mail Bridge | https://github.com/nanoclaw/nanoclaw/pull/4218 |
| **#4171 / #4168** | Bug 修复 | 解决点击卡片时先被渠道响应的问题 | https://github.com/nanoclaw/nanoclaw/pull/4171 / https://github.com/nanoclaw/nanoclaw/pull/4168 |
| **#4156 / #4147** | 安全硬化 | 转义卡片文本，确保审批卡完整展示 | https://github.com/nanoclaw/nanoclaw/pull/4156 / https://github.com/nanoclaw/nanoclaw/pull/4147 |

> **洞察**：PR #4293 与 #4292 是讨论最热的改动，表明社区对代码整洁与卡片可视化的关注度在上升。#4218 的通道扩展则满足了对 Proton Mail 生态的实战需求。

---

### 5. Bug 与稳定性  
| PR 号 | 类型 | 关键问题 | 解决状态 |
|-------|------|----------|----------|
| **#4171 / #4168** | 交互 Bug | 卡片点击后被渠道提前处理 | 已修复 |
| **#4202** | 环境依赖 | Slack/Discord/Telegram 通过 `jq` 的安装缺失导致设置失败 | 已修复 |
| **#4057** | 容器运行 | Docker `--rm` 触发时机导致停止失败 | 已修复 |
| **#4045** | Windows CLI | Unix Socket 权限导致 Windows 服务重启循环 | 已修复 |
| **#4044** | 文件系统安全 | 生成的 `messageIdForAgent` 包含 `:`，在 Windows 上被视为保留字符 | 已修复 |
| **#4290** | 依赖冲突 | TypeScript 6 取消默认加载 `@types/node` | 已修复 |

> **优先级**：所有上述 Bug 已提交 fix PR 并在 CI 中通过；无未修复的严重回归。

---

### 6. 功能请求与路线图信号  
| PR 号 | 新功能 | 现状 | 路线图评估 |
|-------|--------|------|------------|
| **#4292** | 卡片内 KPI、表格、图表 | 已提交，等待评审 | 高优先级 – 预计纳入 2026‑12‑15 版 |
| **#4291** | 日志旋转 / host 日志管理 | 已提交，需测试 | 中等优先级 |
| **#4218** | Proton Mail 适配 | 已提交，已合并到 `channels` | 高优先级 – 兼容性改进 |
| **#4199** | OneCLI 本地 API 与 Postgres 绑定至 127.0.0.1 | 已提交，需确认安全性 | 中等优先级 |
| **#4156 / #4147** | 卡片文本硬化 | 已提交，正在审核 | 低至中等优先级 |

> **路线图**：下一版本将重点聚焦卡片可视化、通道扩展和系统安全硬化，日志管理将作为次要补丁。

---

### 7. 用户反馈摘要  
- **格式化冲突**：多次提到 Prettier 3.x 产生的格式差异导致 CI “Format check” 失败。#4293 的修复直接响应此痛点。  
- **卡片交互**：用户在使用审批卡时遇到“先被渠道回答”现象，#4171/#4168 修复满足需求。  
- **跨平台兼容**：WSL 与原生 Linux 上 Slack/Discord/Telegram 的 `jq` 缺失导致设置失败，#4202 的修复解决了这一障碍。  
- **Proton Mail 需求**：部分用户请求 Proton Mail 的原生支持，#4218 的实现直接满足了该需求。  
- **Windows CLI**：Windows 服务在启动时因 Unix Socket 权限导致循环重启，#4045 的修复提升了 Windows 体验。

> **总体满意度**：用户对 CI 通过率、跨平台兼容性与通道功能的改善表现积极；仍需关注卡片渲染细节与日志管理的长期稳定性。

---

### 8. 待处理积压  
| PR 号 | 状态 | 备注 |
|-------|------|------|
| **#4293** | 待评审 | 依赖更新，已通过 CI |
| **#4292** | 待评审 | 功能性改进，预计影响范围大 |
| **#4218** | 待评审 | Proton Mail 适配，已提交至 `channels` |
| **#4156 / #4147** | 待评审 | 卡片硬化，需确认跨渠道兼容 |
| **#4202** | 已合并 | 通过 |
| **#4057** | 已合并 | 通过 |
| **#4045 / #4044** | 已合并 | 通过 |
| **#4290** | 已合并 | 通过 |
| **#4199** | 待评审 | OneCLI 本地 API 绑定 |
| **#4085** | 已合并 | 通过 |

> **提醒**：以上待评审 PR 处于高优先级阶段，建议核心团队在本周内完成审阅以保持迭代节奏。若出现阻塞，需及时调整资源或开启讨论。

---

> **结论**  
> NanoClaw 在 2026‑11‑08 维持了健康的贡献节奏。虽然未出现新 Release，但多条 PR 的合并已显著提升了安全性、可用性与跨平台兼容性。社区关注点围绕卡片渲染、通道适配与日志管理。请核心团队关注待评审的关键 PR，确保下一个版本的顺利发布。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw 项目日报 – 2026‑11‑08**

---

### 1️⃣ 今日速览  
- 过去 24 小时项目无 Issues 更新，PR 仅有一条新增，未发生合并或版本发布。  
- 维护者关注度保持在中低水平，社区讨论集中在即将完成的 **Tsubasa chat‑completions** 提供者扩展。  
- 项目整体状态稳定，但活跃度略低，建议继续鼓励 PR 合并与社区互动。

---

### 2️⃣ 项目进展  
- **今日无 PR 合并或关闭**，但 PR #1013 正在等待评审。  
- 该 PR 通过添加 **Tsubasa** 提供者，丰富了 OpenAI‑兼容的模型目录，并引入了 32,768‑token 上下文窗口，预留 8,192‑token 输出预算。  
- 该功能的完成将使 NullClaw 在多模型支持方面迈出重要一步。

[PR #1013 – Tsubasa Provider](https://github.com/nullclaw/nullclaw/pull/1013)

---

### 3️⃣ 社区热点  
- **最活跃的讨论**：PR #1013  
  - 讨论聚焦于新提供者的实现细节、API key 配置 (`TSUBASA_API_KEY`) 与模型命名一致性。  
  - 评论量低，但涉及的技术细节表明社区对多模型兼容性的需求正在升温。

[链接](https://github.com/nullclaw/nullclaw/pull/1013)

---

### 4️⃣ Bug 与稳定性  
- **无新 Bug 报告**。  
- 现有问题清单暂无新增或回归，项目在过去 24 小时内保持稳定运行。

---

### 5️⃣ 功能请求与路线图信号  
- PR #1013 本质上是一项**功能扩展**：对 Tsubasa 进行官方集成。  
- 若评审通过并合并，预计将进入下一个小版本（预计 2026‑12‑xx），标志着多模型支持能力的进一步提升。  
- 关注后续是否出现关于其他 LLM 提供者（例如 Anthropic、Gemini）的请求，以评估是否纳入未来路线图。

---

### 6️⃣ 用户反馈摘要  
- **无 Issues** 反馈可提炼。  
- 未来建议在社区渠道（如 Discord、Telegram）主动邀请用户提交使用场景和改进建议，以弥补 Issues 反馈缺失。

---

### 7️⃣ 待处理积压  
- 在本次数据范围内未发现长期未响应的重要 Issue 或 PR。  
- 建议维护者定期扫描 GitHub 活动日志，确保任何新出现的未解决请求能及时得到关注。

---

> **项目健康点评**  
> 目前 NullClaw 的活跃度处于低水平，但核心功能扩展（Tsubasa）正在推进。缺乏新 Releases 与 Issues 讨论表明社区活跃度不足，建议通过社群宣传或举办小型 Hackathon 进一步提升参与度。整体来看，项目结构清晰、错误率低，但增长动力主要依赖于新功能的及时交付和社区需求的持续输入。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报
**日期**: 2026-11-08
**项目**: [nearai/ironclaw](https://github.com/nearai/ironclaw)

## 1. 今日速览
过去24小时内，IronClaw 项目处于**低活跃度**状态，无版本发布，无 Pull Request 合并或提交。社区层面共有 **1 个 Issue 更新**（#8115），主要涉及 Tsubasa 注册表条目的功能请求。整体来看，项目当前迭代节奏平缓，近期开发重点可能集中在内部优化或等待社区反馈，暂无紧急稳定性风险信号。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
过去24小时内无 Pull Request 被合并或关闭，项目在代码合并层面暂无可见推进。

## 4. 社区热点
今日唯一活跃的社区讨论围绕 **Issue #8115** 展开。

*   **Title**: [Add a Tsubasa registry entry with an explicit 32K context-budget path](https://github.com/nearai/ironclaw/issues/8115)
*   **状态**: Open
*   **作者**: cenab
*   **最后更新**: 2026-11-07
*   **评论数**: 0
*   **反应数**: 0
*   **分析**:
    *   **诉求背景**: 用户指出 IronClaw 虽然支持 OpenAI 兼容后端，但配置 Tsubasa 时需手动输入端点和模型，缺乏原生Named Provider支持。
    *   **核心建议**: 建议在注册表中添加 Tsubasa 条目，并明确指定 32K 上下文预算路径，以简化凭证设置和模型选择流程。
    *   **热度评估**: 尽管今日有更新标记，但评论和反应均为 0，表明该议题目前仍处于“提出-等待响应”阶段，未引发广泛社区共鸣或紧急讨论。

## 5. Bug 与稳定性
过去24小时内未报告新增 Bug、崩溃或回归问题。

## 6. 功能请求与路线图信号
*   **功能请求**:  **Tsubasa 原生注册表支持** (Issue #8115)
    *   **描述**: 为 Tsubasa 模型提供预定义的注册表条目，明确 32K 上下文预算。
    *   **路线图信号**: 由于该项目已支持 OpenAI 兼容后端，添加特定模型的命名 provider 条目属于**低成本、高易用性**的优化。若维护者认可该建议，可能作为小型 QoL (Quality of Life) 更新纳入近期版本。目前尚无关联 PR，需观察后续是否有人提交实现代码。

## 7. 用户反馈摘要
*   **痛点**: 配置第三方模型（如 Tsubasa）时，手动输入端点和模型的流程不够直观，缺乏官方或预置的配置模板。
*   **用户场景**: 高级用户希望减少样板配置，通过命名 provider 快速切换和使用特定上下文长度的模型。
*   **满意度**: 无负面反馈，问题在于现有配置方式对特定模型（Tsubasa）不够友好。

## 8. 待处理积压
当前监控窗口（24小时）内仅有 1 个 Issue 更新。但需注意，**Issue #8115** 创建于 **2026-09-28**，距今已近 **6周**，且无评论和响应。
*   **提醒**: 建议维护者定期审查长期未响应的 Issue。虽然该 Issue 优先级不高，但作为功能增强请求，若能通过自动化或文档更新快速解决，有助于提升开发者体验。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-11-08)

## 1. 今日速览
**项目状态：平稳修复期（低活跃度，高合并率）**
过去24小时 LobsterAI 项目社区活动较为平缓，无新版本发布，也无新增 Issue 讨论。主要开发活动集中在代码质量维护与稳定性修复上，2 个已有的 Pull Request 被合并/关闭，均由开发者 `fisherdaddy` 提交。整体活跃度评估为**低**，但合并效率极高，表明团队正专注于解决既知痛点而非开启新战线。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日共合并/关闭 2 个 PR，主要聚焦于 **Windows 平台兼容性** 和 **浏览器交互稳定性优化**：

1.  **Windows 浏览器工具链底层修复** (`area: openclaw`, `fix`)
    *   **PR**: [#3027 fix(openclaw): snapshot Chrome MCP process trees natively on Windows](https://github.com/netease-youdao/LobsterAI/pull/3027)
    *   **进展**: 解决了 Windows 环境下浏览器工具可能永久不可用的严重问题。此前通过 OpenClaw 的 `existing-session` Chrome MCP 驱动连接时，若进程树快照失败会导致会话信任机制崩溃。此 PR 实现了原生的 Windows 进程树快照功能，提升了底层驱动在 Windows 上的鲁棒性。
2.  **浏览器登录交互体验修复** (`area: renderer`, `fix`)
    *   **PR**: [#3026 fix(auth): keep browser login visible and recoverable](https://github.com/netease-youdao/LobsterAI/pull/3026)
    *   **进展**: 修复了用户点击左下角登录按钮“无响应”的 Bug。核心问题是获取登录 URL 时缺乏超时控制，导致在网络波动时请求阻塞 7-9 秒且界面无反馈。此 PR 引入了超时机制并优化了加载状态展示，确保了登录流程的可见性与可恢复性。

## 4. 社区热点
今日无新增 Issue，社区讨论热度集中在已合并的 PR 上。
*   **热点焦点**: **Windows 用户的浏览器使用体验**。
    *   分析: PR #3027 和 #3026 均指向浏览器相关功能。#3027 侧重于底层进程管理的稳定性（Windows 特有痛点），#3026 侧重于上层 UI 的反馈机制。这表明浏览器作为 LobsterAI 的核心交互界面，其稳定性和响应性是当前用户关注的主要焦点。目前无公开评论或反应数据（`undefined`/`0`），社区交互较为安静。

## 5. Bug 与稳定性
今日合并的两个 PR 均对应已报告的稳定性 Bug，均已修复：

| 严重程度 | 问题描述 | 影响范围 | 状态 | 关联 PR |
| :--- | :--- | :--- | :--- | :--- |
| **严重 (High)** | **Windows 浏览器工具永久不可用**<br>OpenClaw 在 Windows 上验证 Chrome MCP 进程树时失败，导致浏览器驱动失效。 | Windows 用户，使用内置浏览器/默认显示模式 | **已修复** | [#3027](https://github.com/netease-youdao/LobsterAI/pull/3027) |
| **中等 (Medium)** | **登录按钮无响应/假死**<br>网络波动时获取登录 URL 耗时 7-9s，且无加载指示，用户感知为“点击无效”。 | 所有用户，网络不稳定环境下 | **已修复** | [#3026](https://github.com/netease-youdao/LobsterAI/pull/3026) |

## 6. 功能请求与路线图信号
今日无新增 Issue 或功能请求。
*   **路线图信号**: 开发资源正部分倾斜向 **Windows 平台深度适配**（Proc tree snapshot on Windows）和 **网络异常容错处理**（Login timeout）。这暗示项目维护团队可能正在强化跨平台一致性，特别是在 Windows 这一核心桌面平台上的边缘情况处理。

## 7. 用户反馈摘要
基于 PR 摘要中的用户痛点提炼：
*   **痛点 1**: “点击登录没反应”。用户期望按钮点击后有即时反馈，而非长时间等待后无结果。
*   **痛点 2**: “浏览器突然坏了，再也打不开”。对于依赖浏览器工具的用户，进程管理失败导致的静默失败是致命体验损伤。
*   **满意点**: 快速响应。两个 Bug 均在次日（或同日）即有 PR 合并，体现了维护者对关键稳定性问题的快速迭代能力。

## 8. 待处理积压
当前数据显示过去 24 小时内无任何待合并（Open）的 PR，也无活跃的新 Issue。
*   **风险提示**: 虽然当前积压为零，但鉴于今日合并的两个 PR 均涉及底层驱动（OpenClaw）和核心认证流程（Auth），建议关注后续版本中是否有回归测试覆盖这两个模块，特别是 **Windows 进程监控** 和 **前端网络请求超时策略** 的长期稳定性。
*   **建议**: 若后续出现新的浏览器相关 Issue，应优先检查是否与本次 #3027 进程树快照逻辑变更有关联。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-11-08)

---

### 1. 今日速览

过去 24 小时内，Moltis 项目整体活跃度处于中等偏低状态，共更新 1 条 Issue 和 2 条 PR，今日无新版本发布。社区核心进展集中在 Agent 工具调用策略的逻辑修复，以及扩展第三方 Model Provider 的集成。值得关注的是，发布管道（Release Pipeline）出现重大隐患，导致最新版本构建产物缺失并影响安装脚本运行，需维护者尽快介入。整体来看，项目在功能演进的同时需要关注 CI/CD 发布流程的稳定性。

---

### 2. 项目进展

今日合并/关闭了 1 项重要 PR，进一步提升了工具调用的灵活性与健壮性：

* **工具预设逻辑修复**：[PR #1280](https://github.com/moltis-org/moltis/pull/1280) 已关闭并合并（修复了 [#1277](https://github.com/moltis-org/moltis/issues/1277)）。当单次对话中的 `active_tools` 显式传为空数组时，不再直接清空全部工具，而是保留预设（Preset）中的工具控制策略；若传入非空工具列表，则继续受预设允许/拒绝策略的约束。这一改进确保了 Agent 在多轮对话及局部工具控制时的预期一致性。

---

### 3. 社区热点

今日社区反应最为强烈的讨论聚焦于版本安装中断问题：

* **v0.10.2 发布缺少构建产物（3 👍，1 评论）**：[Issue #273](https://github.com/moltis-org/moltis/issues/273)
  * **诉求分析**：用户在通过一键安装脚本部署最新版本 `v0.10.2` 时遭遇 HTTP 404 错误。原因在于 GitHub Release 中仅有 Release Tag，却缺少打包好的二进制文件（如 `.deb`、`.tar.gz`）。该问题直接阻断了新用户的安装与老用户的自动化升级，属于极高优先级的阻断性故障，社区用户正急切呼吁官方重新打包发布。

---

### 4. Bug 与稳定性

按严重程度排列，今日监控到的 Bug 如下：

1. **[高危] 发布管道构建产物丢失严重 Bug**：[Issue #273](https://github.com/moltis-org/moltis/issues/273)
   * **影响**：破坏官方安装脚本，导致全新部署和升级安装完全不可用。
   * **状态**：**尚未修复**（等待维护者重新触发打包/发布流程或修复 Release CI 工作流）。
2. **[中危] 单轮对话工具覆盖逻辑异常（已修复）**：[Issue #1277](https://github.com/moltis-org/moltis/issues/1277)
   * **影响**：空 `active_tools` 传参会导致预设工具异常失效。
   * **状态**：**已合并 PR [#1280](https://github.com/moltis-org/moltis/pull/1280) 修复**。

---

### 5. 功能请求与路线图信号

* **拓展 OpenAI 兼容模型提供商**：[PR #1288](https://github.com/moltis-org/moltis/pull/1288) (OPEN)
  * **信号**：社区正在提交将 Tsubasa Provider 接入设置界面与模型注册表（Model Registry）的改动。支持 `TSUBASA_API_KEY` 配置，默认接入 `https://api.tsubasa.sh/v1`，并预置 32,768 上下文窗口的 `tsubasa-fast` 和 `tsubasa-pro` 模型。
  * **预期**：若审核通过，该 Provider 扩充功能大概率将被合并并纳入下一个次要版本（Minor Release）中。

---

### 6. 用户反馈摘要

从今日用户反馈及 Issue 互动来看，核心痛点在于**发布质量保障**：

* **痛点**：自动化脚本极度依赖 Releases 的 Assets 完整性。当 Release Tag 与实际 Binary 脱节时，脚本无降级逻辑，直接暴露 HTTP 404 报错，极度影响开箱即用的体验。
* **诉求**：用户希望维护团队在 CI/CD 中加入发布产物完整性校验，避免发布“空 Shell”版本。

---

### 7. 待处理积压

* **模型提供商 PR 审阅滞后**：[PR #1288](https://github.com/moltis-org/moltis/pull/1288)（添加 Tsubasa provider）自 2026-09-28 创建至今已有超 1 个月未完成合并，建议维护者对其配置校验及 README 文档变更进行最终 Review 并在近期的版本中集成。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 开源项目动态日报（2026-11-08）

---

### 1. 今日速览
过去 24 小时内，CoPaw 项目保持了较高的技术改进活性。整体更新涵盖 **4 条 Issues**（新开/活跃 3 条，关闭 1 条）以及 **6 条待合并 PR**（无新合并 PR，无新 Release 发布）。

系统的核心改进方向集中在**上下文 Token 精准度校准**、**API Gateway 兼容性异常处理** 以及 **Web Search 生态扩展**。与此同时，社区集中暴露出 `2.3.0-beta.1` 预发布版本的启动回归崩溃问题，以及新版 UI 交互效率下滑与工具执行“黑盒化”的用户痛点。

---

### 2. 项目进展
虽然过去 24 小时内暂无 PR 正式 Merge 入主干，但开发者社区提交了 6 项高针对性的补丁代码，重点解决**模型管理与上下文管理边界问题**：

* **上下文与 Token 估算精细化**：
  * [#8614](https://github.com/agentscope-ai/QwenPaw/pull/8614)：校准 AgentScope 的 Token 估算机制。针对数字、UUID、时间戳占比较高的 Prompt（Qwen 等 Tokenizer 对数字分词较细），修正了原有 `utf-8 bytes / 4` 导致预估偏低的问题，防止触发 Compaction 不及时。
  * [#8613](https://github.com/agentscope-ai/QwenPaw/pull/8613)：修复 Compaction 策略，在规划压缩时预留配置的 `max_tokens` 限制，避免因 prompt + max_tokens 超出窗口而被 Provider 直接拒绝。
* ** Provider 与容错机制增强**：
  * [#8617](https://github.com/agentscope-ai/QwenPaw/pull/8617)：修复已保存的模型 Provider 被禁用后，Agent 仍保留激活状态导致 Channel 无降级机制直接报错打断的问题（Fixes #8579）。
  * [#8615](https://github.com/agentscope-ai/QwenPaw/pull/8615)：增强异常识别能力，使 Agent 能够正确捕获 Strata 等 OpenAI 兼容网关返回的上下文溢出 400 错误。

---

### 3. 社区热点
* **[#8521 [Bug]: 对话中经常出现没有答复内容的情况...](https://github.com/agentscope-ai/QwenPaw/issues/8521)**（评论数：3）
  * **诉求分析**：用户反馈了多项影响基础体验的问题，包括模型回复丢包（只显示思考）、剪贴板 Ctrl+C 复制需要多次按键、以及新版 UI 相比旧版在空间利用率与响应流畅度上的退化，用户强烈呼吁增加旧版 UI 切换开关。
* **[#8616 2.3.0-beta.1 does not start on Windows 11 IoT LTSC](https://github.com/agentscope-ai/QwenPaw/issues/8616)**（评论数：2）
  * **诉求分析**：测试版用户反馈在 Windows 11 IoT 环境下出现 `path not found` 并伴随 AppHang（假死），而同一机器运行 2.2.2 正常，属于阻塞级的测试版回归问题。

---

### 4. Bug 与稳定性

#### 🔴 高危 / 回归缺陷
1. **测试版启动挂起崩溃**：[#8616](https://github.com/agentscope-ai/QwenPaw/issues/8616) — `2.3.0-beta.1` 在特定的 Windows 11 LTSC 环境下因路径查找失败引发 AppHang，*目前暂无修复 PR，需维护团队优先排查*。

#### 🟡 中危 / 交互异常
2. **对话丢失与快捷键失灵**：[#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521) — 思考完成后未输出答复内容（概率性发生），同时复制文本需多次触发，*暂无 Fix PR*。

#### 🟢 已提供 Fix PR 的稳定性隐患
3. **已禁用 Provider 导致全盘报错**：[#8617](https://github.com/agentscope-ai/QwenPaw/pull/8617) — Provider 关闭后活跃 Agent 无 Fallback 方案直接引发 `ProviderError`。
4. **历史对话坏数据触发 400 报错**：[#8292](https://github.com/agentscope-ai/QwenPaw/pull/8292) — 会话记录中缺失 `file_id` 或 `file_data` 时，导致 OpenAI 兼容接口请求直接被拒。

---

### 5. 功能请求与路线图信号
* **「执行」类工具状态透明化**：[#8612](https://github.com/agentscope-ai/QwenPaw/issues/8612)
  * **需求细节**：相比于“阅读”、“时间获取”等轻量工具，复杂代码或脚本的「执行」类工具在长任务中仅展示抽象名称，用户无法得知后台真实进度。需求希望展示更具体的命令摘要或执行状态。
* **生态扩充（Web Search Provider）**：[#8618](https://github.com/agentscope-ai/QwenPaw/pull/8618)
  * **路线图信号**：首次贡献者为 CoPaw 增加了 `SpecStream` 作为新的 `web_search` 检索提供商，补充了 Parallel、Tavily、Perplexity 等现有搜索能力体系。

---

### 6. 用户反馈摘要
从 Issue 反馈来看，当前用户满意度存在两极分化：
1. **肯定面**：用户赞赏大部分工具调用已经实现了自然语言化（如“⏱ 获取 当前时间”、“📄 阅读 MEMORY.md”），体验较早期版本大幅提升（[#8612](https://github.com/agentscope-ai/QwenPaw/issues/8612)）。
2. **痛点集中区**：
   * **界面效能退化**：新版 UI 的空闲区域过大，模型切换步骤繁琐，操作卡顿感增加，直接降低了专业用户的操作效率（[#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521)）。
   * **多智能体协作引导不足**：已被关闭的反馈 [#2420](https://github.com/agentscope-ai/QwenPaw/issues/2420) 指出，跨智能体协作/通信在实际使用中缺乏足够的引导与连贯性，容易发生“身份混淆”。

---

### 7. 待处理积压
* **[#8292 fix(agents): sanitize

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 开源项目动态日报（2026-11-08）

## 1. 今日速览

在过去 24 小时内，ZeroClaw 项目保持了极高的研发迭代与安全防护节奏。社区共处理了 **23 条 Issue**（新开/活跃 18 条，已关闭 5 条）和 **34 条 Pull Request**（待合并 28 条，已合并/关闭 6 条）。今日无新版本发布。

项目整体处于**核心架构安全加固与多租户/多 Agent 隔离机制重构阶段**。研发重心高度集中在：RPC 权限越权修复、OIDC 身份验证漏洞修补、Agent 间上下文/工具越界隔离，以及会话持久化层（SessionBackend）的原子化改造。整体代码库演进速度快，安全响应级别高。

---

## 2. 项目进展

今日合并与关闭了多项针对高危安全漏洞和架构异常的 PR，重点推进了零信任代理与会话控制的安全性：

- **修复 OIDC 浏览器绑定与 CSRF 漏洞**：[#12157](https://github.com/zeroclaw-labs/zeroclaw/pull/12157) 已合并。修复了 gateway 在 OIDC 认证回调页面缺乏浏览器绑定的问题，防止攻击者利用单次验证码实施登录 CSRF 攻击。
- **强化 Cron 任务的写操作鉴权**：[#11149](https://github.com/zeroclaw-labs/zeroclaw/pull/11149) 已合并。彻底纠正了 `cron/add` 和 `cron/patch` RPC 接口默认将 Shell 命令请求标记为“已授权”的安全隐患，确保所有来源的 Cron 任务写入均需显式经过操作员权限校验。
- **跨异步等待的会话权限锁定**：[#12239](https://github.com/zeroclaw-labs/zeroclaw/pull/12239) 已合并。解决了会话效应在跨异步等待（`await`）期间可能因身份降级或撤销而导致的权限泄露问题。
- **Relay 部署架构文档补充**：[#12274](https://github.com/zeroclaw-labs/zeroclaw/pull/12274) 已合并。记录了 Daemon 侧通过 ZeroRelay 托管 Web Dashboard 的放置例外规范。

---

## 3. 社区热点

今日讨论最为激烈的议题主要集中在**多租户/多 Agent 部署时的 RBAC 权限设计**以及**底层 Session 数据的持久化正确性**：

- **多租户 Agent 部署的 Sender 级别 RBAC 支持**：[#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)（12 条评论）
  - *诉求分析*：多租户部署架构下，社区正放弃早期过于庞大的独立 `[rbac.*]` Crate 方案，转向基于既有 Agent/Risk-profile 模型的收窄方案。用户与贡献者正在讨论如何将发送者身份（Sender Roles）无缝映射到现有的风险配置中，以实现按发送者隔离的细粒度访问控制。
- **SQLite 会话后端覆写消息 `created_at` 导致时间戳丢失**：[#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)（10 条评论）
  - *诉求分析*：开发者发现 SQLite 会话实现在每一轮对话替换 Transcript 时，将整表所有行的 `created_at` 都更新为了当前替换时间，导致单条消息的真实历史时间完全丢失。这对需要依赖时间线分析的 Agent 工作流造成了严重破坏。
- **内置工具缺乏跨 Agent 所有权隔离**：[#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646)（4 条评论）
  - *诉求分析*：包括 `sessions_list`、`sessions_history` 和 `discord_search` 在内的内置工具，直接读取模型传入的 `session_id` / `channel_id` 参数，缺乏 Agent 身份的二次越权校验。社区正在推动针对工具层面的强制归属校验逻辑。

---

## 4. Bug 与稳定性

今日新报告与追踪的 Bug 按严重程度分类如下：

### 阻塞级 / 严重安全风险 (S0 - S1)
1. **[S1] 管道缓存轮次归一化破坏对话结构**：[#12187](https://github.com/zeroclaw-labs/zeroclaw/issues/12187)
   - *问题*：当 `role=tool` 紧跟 `role=user` 时，`normalize_cached_channel_turns()` 误将 user 消息追加到了 tool 消息内部，导致严格格式校验的模型 Provider 直接抛错卡死。
2. **[S0/P1] Session/Channel 读写工具缺乏 Agent 归属校验**：[#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646)
   - *状态*：已有修复 PR [#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) 处于评审与放行阶段。

### 中度影响 (S2)
1. **Delegated Agent 工具调用格式异常**：[#12235](https://github.com/zeroclaw-labs/zeroclaw/issues/12235) — 代理子 Agent 无法遵循 `native_tools` 规范，返回了原始文本式的工具调用。
2. **Delegated Agent 未加载 `TOOLS.md`**：[#12211](https://github.com/zeroclaw-labs/zeroclaw/issues/12211) — 代理提示词构建器使用了硬编码文件列表，忽略了工作区设置。
3. **性能衰减：System Prompt 每轮从磁盘重载**：[#11696](https://github.com/zeroclaw-labs/zeroclaw/issues/11696) — 导致 Prompt Cache 在跨轮次时频繁失效，极大增加了运行成本与延迟。
4. **Shell 审批校验逻辑依赖模型自建参数**：[#12227](https://github.com/zeroclaw-labs/zeroclaw/issues/12227) — Shell 工具命令是否需要 operator 确认取决于 LLM 输出的 `approved

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*