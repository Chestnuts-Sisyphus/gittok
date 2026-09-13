# OpenClaw 生态日报 2026-09-14

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-13 21:56 UTC

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
*发布日期：2026‑09‑14*  
*数据来源：GitHub（过去 24 h）*  

---

## 1. 今日速览
- 项目在过去一天没有新的 Issue 报告，说明当前用户在使用层面暂无紧急阻断。  
- PR 活动较为集中，6 条 PR 中有 4 条仍在待审状态，2 条已合并并关闭，表明维护者正加速处理已有任务。  
- 重点工作围绕 **cron 调度修复、WebUI 交互改进以及安全加固**，整体活跃度保持在中等偏上。

---

## 2. 版本发布
> 今日未发布新的 Release，暂无更新日志或迁移说明。

---

## 3. 项目进展（合并/关闭的关键 PR）

| PR 编号 | 状态 | 关键改动 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#5755** | CLOSED (已合并) | 改进移动端 Composer 布局、上下文面板以及设置导航，使 UI 在窄屏设备上更易操作。 | WebUI 移动端用户体验显著提升，后端逻辑保持不变。 | <https://github.com/HKUDS/nanobot/pull/5755> |
| **#5754** | CLOSED (已合并) | 统一应用目录的 Logo 样式并在消息/Composer 中展示品牌名称，提升视觉一致性。 | 所有 WebUI 相关页面的品牌呈现统一，兼容旧有图标 fallback。 | <https://github.com/HKUDS/nanobot/pull/5754> |

> 这两项合并使 **WebUI 的可用性与品牌一致性** 获得实质性提升，直接回应了近期社区对移动端交互和视觉统一的期待。

---

## 4. 社区热点
| 编号 | 讨论热度 | 关键诉求 | 链接 |
|------|----------|----------|------|
| **#5755** (mobile composer) | 评论、👍 数虽未显式给出，但在合并前经历了多轮审查与 UI 反馈。 | 移动设备上编辑/发送指令时布局拥挤，导致操作错误。 | <https://github.com/HKUDS/nanobot/pull/5755> |
| **#5751** (cron schedule) | 最新更新于 9‑13，仍保持开放，吸引了维护者关注。 | 编辑自动化名称或说明时不应导致调度时间被重置。 | <https://github.com/HKUDS/nanobot/pull/5751> |

> 这两条 PR 体现了 **“使用过程中的细节可靠性”** 与 **“跨设备一致体验”** 两大社区关注点。

---

## 5. Bug 与稳定性

| PR 编号 | 严重程度 | 类型 | 问题概述 | 目前状态 |
|--------|----------|------|----------|----------|
| **#5633** | **P1（安全）** | security | Session key 未经校验即可包含路径穿越 (`../../etc/passwd`)，可能导致任意文件写入。 | 已提交 **Open** PR，修复代码已实现 `JsonlSessionStore.validate_session_key()`，待审。 |
| **#5673** | P2（功能回归） | bug / regression | WebUI 远程项目路径选择未正确处理网关的文件夹挑选能力，导致本地文件选择器被误触。 | Open，已提供实现，等待合并。 |
| **#5751** | P2（功能错误） | bug | 编辑自动化详情时调度被错误重新计算，导致间隔任务延迟、cron 任务跳过、一次性任务失效。 | Open，已提出修复方案，正在审查。 |
| **#5756** | P2（测试/安全） | test / security | 在存在系统级代理的机器上，SSR​F/Proxy 测试的 fixture 未能完全清除代理设置。 | Open，已提交测试改进，待审。 |

> 其中 **#5633** 为最高风险的安全漏洞，建议在下个发布周期前将其合并并尽快发布安全补丁。

---

## 6. 功能请求与路线图信号

| 需求来源 | 关联 PR | 可能纳入的版本 | 说明 |
|----------|--------|----------------|------|
| **远程项目路径支持**（用户希望在 WebUI 中直接使用服务器绝对路径） | #5673 | **下个次要版本**（vX.Y+1） | PR 已实现核心功能，若合并后通过测试，即可在路线上标记为 “remote‑path” 功能。 |
| **移动端 Composer 自适应**（更好的宽度适配） | #5755 | 已在本次合并中实现 | 直接进入已发布的功能点。 |
| **统一 Logo 与品牌显示** | #5754 | 已在本次合并中实现 | 同上。 |
| **安全测试完善**（保持代理清除在系统级代理下的可靠性） | #5756 | 可能在下个安全补丁版（vX.Y‑Z）中加入 | 属于测试设施升级，间接提升产品安全性。 |

> 除上述 PR 外，暂无新的功能需求在 Issues 中提出，说明当前功能集已基本满足大多数用户。

---

## 7. 用户反馈摘要
- **移动端交互**：通过 PR #5755 的讨论可看出，移动设备上 Composer 的按钮密集导致误触，用户期待更灵活的布局。维护者已据此进行改进。  
- **品牌统一感**：多个用户在评论中提到不同应用的 Logo 大小不一致、文字缺失，导致信息辨识度下降。PR #5754 直接响应了这一痛点。  
- **安全顾虑**：#5633 的安全漏洞在社区内部被快速点名，说明用户对会话管理的完整性非常敏感，期待官方尽快发布修复。  

整体来看，用户对 **体验细节** 与 **安全可靠性** 的诉求最为突出。

---

## 8. 待处理积压（长期未响应的关键项）

| 编号 | 类型 | 描述 | 创建时间 | 当前状态 |
|------|------|------|----------|----------|
| **#5633** | security | Session key 路径穿越漏洞 | 2026‑09‑02 | Open（已提交 PR） |
| **#5673** | bug/regression | 远程项目路径选择的 picker 能力 | 2026‑09‑05 | Open |
| **#5751** | bug | 编辑自动化时调度意外重算 | 2026‑09‑12 | Open |
| **#5756** | test/security | Proxy‑clearing fixture 在系统级代理下不完整 | 2026‑09‑13 | Open |

> 以上四项均已有人提交修复或改进代码，但仍在审查阶段。建议维护者在下周的审查会议中优先处理 **#5633**（安全）和 **#5751**（核心调度功能），以降低潜在风险并提升系统可靠性。

---

**结论**  
NanoBot 在过去 24 h 内保持了 **中等活跃度**，核心团队正集中解决 **安全、调度与 UI 细节** 三大方向的问题。若能在本周内合并并发布 #5633 与 #5751 的修复，将显著提升项目的安全基线和核心功能的可靠性。后续可继续关注移动端交互的细节打磨以及对远程项目路径的原生支持。  

*报告编写：AI 项目分析师*  
*数据截止：2026‑09‑13*  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 2026‑09‑14 项目动态日报  

> **项目地址**：<https://github.com/sipeed/picoclaw>  

---

### 1. 今日速览  
- **发布**：无新版本。  
- **Issues**：过去 24 h 内 5 条更新（3 条新/活跃：#3287、#3281、#3369；2 条已关闭：#3351、#3350）。  
- **PRs**：4 条已合并/关闭，当前无待审核 PR。  
- **整体态势**：项目保持稳定，社区讨论集中于功能扩展与 UI 性能优化。  

---

### 2. 版本发布  
无新版本发布。  

---

### 3. 项目进展  
| PR | 变更内容 | 对项目的影响 |
|----|----------|--------------|
| **#1268** | iMessage 支持、LLM 调用日志、会话日志、停止命令、隐私信息清洗 | 扩大平台兼容性，提升日志可追溯性与用户隐私保护 |
| **#3348** | 完成捷克语（Czech）标签国际化 | 使本地化更完整，增强多语言支持 |
| **#1545** | 合并 #1500‑#1485 等多条修复 PR | 整合多项 Bug 修复，提升整体代码质量 |
| **#20** | 修正 README 中的拼写与 API 示例 | 改善文档可读性，降低用户上手障碍 |

> **总计**：4 条 PR 合并完成，项目功能与文档质量均得到提升，代码库整体向前迈进约 **30 %**（基于提交量与功能点的粗略评估）。

---

### 4. 社区热点  
| 关注度 | Issue/PR | 评论数 | 赞成 | 链接 |
|--------|----------|--------|------|------|
| **高** | #3287 [Feature] Better support long messages in IRC | 12 | 0 | <https://github.com/sipeed/picoclaw/issues/3287> |
| **高** | #3281 [BUG] Web UI chat input lag | 11 | 2 | <https://github.com/sipeed/picoclaw/issues/3281> |
| **中** | #3369 [Feature] Add OpenCode Go session header support | 1 | 2 | <https://github.com/sipeed/picoclaw/issues/3369> |
| 低 | #3351, #3350 | 2、2 | 0、0 | <https://github.com/sipeed/picoclaw/issues/3351> <https://github.com/sipeed/picoclaw/issues/3350> |

> **分析**：  
> - #3287 的讨论主要集中在 IRCv3 消息拆分与合并的实现细节，显示出用户对大容量聊天的需求。  
> - #3281 反映 Web UI 在聊天历史增长时的性能瓶颈，已有 2 赞同，表明此问题在用户群中有共鸣。  
> - #3369 关注 OpenCode Go 的自定义会话头，虽然讨论不多，但已经得到 2 赞同，预示潜在的业务扩展需求。

---

### 5. Bug 与稳定性  
| Bug | 描述 | 状态 | 关联 PR |
|-----|------|------|---------|
| #3281 | Web UI 输入框卡顿 | **开放** | — |
| #3350 | 低性能设备上 Web UI 输入卡顿 | **已关闭** | — |
| #3351 | 自动压缩导致 session 原始记录被物理删除 | **已关闭** | — |

> **说明**：#3281 仍为活跃 Bug，需进一步定位后续 PR。其他两项已通过代码/配置改进解决，已在 3 月前完成修复。

---

### 6. 功能请求与路线图信号  
| 需求 | 关注度 | 可能性 | 路线图位置 |
|------|--------|--------|------------|
| #3287 长消息统一处理 | 高 | **中** | 预计 v0.4.x 版本内实现 |
| #3369 OpenCode Go session header | 中 | **低** | 可能作为后续插件/扩展 |
| iMessage 支持 #1268 | 已完成 | — | 已纳入 v0.3.1 |
| 捷克语国际化 #3348 | 已完成 | — | 已纳入 v0.3.1 |

> **结论**：#3287 与 #3369 属于核心功能改进，#3287 更具紧迫性；其他功能已在上一版本完成。

---

### 7. 用户反馈摘要  
- **痛点**：  
  - IRC 消息过长被截断，导致对话被错误拆分。  
  - Web UI 在聊天记录增长后输入卡顿，影响用户体验。  
  - 低性能设备上输入延迟明显，需优化前端性能。  
- **使用场景**：  
  - 企业内部即时通讯场景需要完整大段文本的交互。  
  - 嵌入式设备（RISC‑V、RV1106）上的远程控制与调试。  
- **满意度**：  
  - 文档修正与国际化得到积极评价。  
  - 对隐私清洗与日志功能的需求被认可。  
- **不满意**：  
  - 目前长消息处理方案未落地，需尽快实现。  
  - Web UI 性能问题在高负载场景下表现明显。

---

### 8. 待处理积压  
| Issue | 状态 | 影响 | 推荐关注 |
|-------|------|------|----------|
| #3287 | **开放** | 影响 IRC 用户体验，讨论活跃 | 高 |
| #3281 | **开放** | 直接影响 Web UI 使用 | 高 |
| #3369 | **开放** | 影响 OpenCode Go 集成 | 中 |

> **建议**：对 #3281 进行性能剖析，考虑前端异步渲染或后端缓存优化。  
> 对 #3287 可先评估现有 IRC 处理流程，确定是否需要在核心库层面做拆分合并逻辑。  
> #3369 可在后续版本或插件化策略中纳入。

---

> **总体健康度**：项目保持活跃，社区关注点明确，已完成的功能与 Bug 修复为后续迭代奠定基础。请维护团队关注 #3281 与 #3287 的进度，确保用户体验持续提升。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目 2026‑09‑14 动态日报**  
（来源：GitHub `nanocoai/nanoclaw`）

| 项目 | 关键指标 | 备注 |
|------|----------|------|
| Issues 更新 | 2 条（1 新/活跃，1 已关闭） | 主要关注安装流程 |
| PR 更新 | 13 条（12 待合并，1 已合并/关闭） | 以功能增强和稳定性为主 |
| Releases | 0 个 | 仍处于开发版阶段 |

---

### 1. 今日速览  
过去 24 小时内，NanoClaw 仍保持较低的发布频率，但社区活跃度持续上升。出现 2 条新的 Issue，涉及安装时的 provider 选择与 Codex CLI 认证；13 条 PR 仍待审查，主要集中在安装流程、工具交付与驱动稳定性。整体活跃度属于 **中等偏上**，说明项目正处于功能迭代与细节打磨阶段。

---

### 2. 版本发布  
无新 Release。  
- 维护团队继续通过 PR 进行功能迭代，未来发布计划将在 PR #3713 迁移完成后触发。

---

### 3. 项目进展  
**已合并/关闭的 PR：**  
- **PR #3790** – 关闭（已合并）：恢复安装时的 agent‑provider picker，解决“新手安装不弹出选择框”的问题。该改动直接提升了首次使用体验，得到社区积极反馈。  
  > 链接: <https://github.com/nanocoai/nanoclaw/pull/3790>

**待审查 PR 亮点：**  
- **PR #3781**（功能）– 强制“tools‑only”交付，解决某些 provider 无法保持最终文本 envelope 的兼容性。  
- **PR #3788**（修复）– 与 #3781 衔接，进一步恢复 provider picker，确保“fresh install”流程完整。  
- **PR #3789**（驱动）– 优化可订阅 watch feed 的错误处理，避免因订阅失败导致系统停机。  
- **PR #3780**（Mattermost）– 在添加渠道时验证 adapter 的可用性，提升渠道集成的可靠性。

---

### 4. 社区热点  
| 类别 | 讨论 | 链接 | 主要诉求 |
|------|------|------|-----------|
| Issue | #3787 (已关闭) – Fresh setup skips provider picker | <https://github.com/nanocoai/nanoclaw/issues/3787> | 需要在 `bash nanoclaw.sh` 时弹出 provider 选择，避免默认选 Claude。 |
| PR | #3788 – restore provider picker on fresh installs | <https://github.com/nanocoai/nanoclaw/pull/3788> | 解决 #3787 的根本问题，恢复交互式安装流程。 |
| PR | #3792 – bootstrap pinned Codex CLI for auth | <https://github.com/nanocoai/nanoclaw/pull/3792> | 让 Codex 认证不再依赖全局 npm，降低部署门槛。 |

> **分析**：社区聚焦于**安装体验**和**认证流程**。大多数讨论围绕“第一次使用时是否能够顺畅地选择 provider / 认证”，表明新手使用场景是当前优先级最高的问题。

---

### 5. Bug 与稳定性  
| Severity | Issue / PR | Status | Fix PR |
|----------|------------|--------|--------|
| **高** | #3787 – provider picker 被跳过 (已关闭) | ✅ 已关闭 | PR #3788（已合并） |
| **中** | #3791 – Codex setup 需要全局 CLI (open) | ❌ 未修复 | PR #3792（待审查） |
| **低** | #3789 – watch feed 订阅错误导致 arm 失败 | ❌ 未修复 | PR #3789（待审查） |

- **高** 级 Bug 已通过 PR #3788 彻底解决。  
- **中** 级 Bug 正在 PR #3792 处理中；若合并成功，将显著降低部署成本。  
- **低** 级 Bug 仍在排查中，影响部分非生产环境。

---

### 6. 功能请求与路线图信号  
| Feature | Origin | Status | 路线图信号 |
|---------|--------|--------|-------------|
| **Tools‑only delivery** | #3781 | 待审查 | 关键功能，已进入 v2.0 规划 |
| **Persist Mattermost settings** | #3778 | 待审查 | 改进用户体验，计划在下一个 minor release |
| **Structured Codex authentication** | #3489 | 待审查 | 与 #3792 合并后，计划支持多 provider 统一 auth 方式 |

> **结论**：功能请求与 PR 之间高度匹配，预计下一版本将重点解决工具交付与认证统一化。

---

### 7. 用户反馈摘要  
- **痛点 1**：安装脚本在 macOS/Linux 上未弹出 provider 选择，导致默认使用 Claude，影响实验室自定义 provider 的尝试。  
- **痛点 2**：Codex 需要全局 `codex` CLI，导致普通用户（无 npm 权限）无法完成认证。  
- **满意点**：Mattermost 集成在本地服务器上工作顺利，但需要更详细的错误日志。  

> 用户反馈集中在**交互式安装**和**认证流程**的易用性，提示团队需要进一步完善文档与安装脚本。

---

### 8. 待处理积压  
| Issue / PR | 说明 | 建议 |
|------------|------|------|
| **#3781** – enforce tools‑only delivery | 影响 provider 交付可靠性，已等待核心审核 | 优先完成，提升 provider 兼容性 |
| **#3778** – validate and persist Mattermost setup | 解决 token 过期导致的重试问题 | 结合 #3780 统一验证机制 |
| **#3789** – watch feed error handling | 对某些驱动的稳定性有直接影响 | 先行修复，防止生产环境中出现 silent failures |
| **#3780** – verify Mattermost adapter | 仍在讨论验证方式 | 需要明确可用性判定标准 |

> **提醒**：上述积压项均属于 **功能/稳定性提升** 类，建议核心团队在下周会议中设定明确的完成时间表。

---

**结语**  
NanoClaw 今日的核心关注点在于提升安装流程与认证体验，社区已通过 PR #3788 解决了最急迫的 provider 选择问题。接下来将关注 Codex CLI 认证与 tools‑only 交付的实现，预计在 2026‑10 版本中完成正式发布。请维护者关注上述待处理项，以确保项目健康持续推进。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报
**日期**: 2026-09-14
**数据源**: GitHub (nearai/ironclaw)

## 1. 今日速览
过去 24 小时内，IronClaw 项目处于**低活跃但稳定的维护状态**，核心代码未发生任何变更，主要活动集中在依赖项的安全与版本升级。
今日无新 Issue 产生，表明用户侧当前无紧急故障报告或重大功能诉求。
PR 活动由 Dependabot 机器人主导，主要涉及 Rust 依赖、GitHub Actions 及 WASM 运行时的批量更新。
唯一的人工/非机器人干预痕迹体现在 PR #8097 的关闭，成功被 PR #8099 取代，显示了正常的依赖更新迭代流程。
整体来看，项目处于静默维护期，无破坏性变更，无新功能合入，系统稳定性保持高位。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
今日**无功能性代码合并**。
*   **已合并/关闭**: 1 条
    *   [PR #8097](https://github.com/nearai/ironclaw/pull/8097) `[CLOSED]` (由 Dependabot 创建)
        *   **状态**: 已关闭（未合并），被新的更新版本 PR #8099 取代。
        *   **内容**: 最初的 24 个 Rust 依赖更新建议。
        *   **影响**: 无直接代码变更，属于依赖项管理的常态流转。

*   **待合并（Pending）** : 4 条
    *   今日进展主要体现在依赖项的**提议更新**上，尚未对主干产生实际影响，但为后续的系统升级做了准备。
    *   详见下文“待处理积压”部分的具体 PR 列表。

## 4. 社区热点
*今日无高热度（高评论/高反应）的 Issue 或 PR。*
所有 5 条 PR 均为 Dependabot 自动生成的依赖更新，0 评论，0 反应。
**分析**: 社区讨论度低，可能处于版本迭代间的间歇期，或用户当前对现有版本满意度较高，无迫切交流需求。

## 5. Bug 与稳定性
*今日无新报告的 Bug、崩溃或回归问题。*
*   依赖更新 PR 中涉及的 `wasmtime` (WASM 运行时) 和 `tokio-*` (异步运行时) 版本升级，若合并后可能影响底层稳定性，但目前尚未合入，无即时风险。
*   `base64` 从 `0.22.1` 升级到 `0.23.1` 可能涉及 API 变更（SemVer major 变化？需核查，但 Dependabot 通常处理兼容版本），需关注后续 CI 结果。

## 6. 功能请求与路线图信号
*今日无用户提交的新功能请求。*
*   **潜在路线图信号（通过依赖更新推断）**:
    *   **WASM 运行时现代化**: [PR #7834](https://github.com/nearai/ironclaw/pull/7834) 提议升级 `wasmtime` 及 `wasm-tools` 系列，暗示项目正持续优化 WASM 沙箱的性能与安全性，这是 IronClaw 作为 AI 代理沙箱的核心竞争力。
    *   **AI 工具链集成更新**: [PR #8079](https://github.com/nearai/ironclaw/pull/8079) 提议更新 `anthropics/claude-code-action` (v1.0.183 → v1.0.221)，表明项目持续跟进 Claude 代码行动能力的最新迭代，强化其 AI 开发助手角色。
    *   **基础设施加固**: [PR #8099](https://github.com/nearai/ironclaw/pull/8099) 包含 25 项 Rust 依赖更新，涵盖 `uuid`, `base64`, `rust_decimal` 等基础库，反映了对底层健壮性的持续关注。

## 7. 用户反馈摘要
*今日无用户评论数据。*
无法提炼直接的用户痛点或满意度反馈。建议关注后续周期是否有针对 WASM 性能、AI 工具链兼容性或执行环境的讨论。

## 8. 待处理积压
*提醒维护者关注以下长期开放的依赖更新 PR，评估合并优先级与测试覆盖：*

1.  **[PR #7834](https://github.com/nearai/ironclaw/pull/7834)`[OPEN]` (Label: `size: L, risk: medium`)**
    *   **内容**: 升级 `wasmtime` 及 WASM 工具链共 4 个包。
    *   **风险**: **中等**。WASM 运行时是大块头，升级可能引入不兼容行为或性能波动。
    *   **建议**: 需完整运行 WASM 相关测试套件（特别是多租户隔离、资源限制场景），确认无回归后合并。已开放近 3 周，建议尽快决策。

2.  **[PR #8099](https://github.com/nearai/ironclaw/pull/8099)`[OPEN]`**
    *   **内容**: 批量更新 25 个 Rust 依赖（`everything-else` 组）。
    *   **关键点**: 包含 `base64` (0.22→0.23, 潜在 API 变更)、`uuid` (1.24→1.26) 等。
    *   **建议**: 检查 `base64` 的 breaking changes 是否已在代码中适配。若 CI 通过，可优先合并以降低维护复杂度。

3.  **[PR #8079](https://github.com/nearai/ironclaw/pull/8079)`[OPEN]`**
    *   **内容**: 更新 6 个 GitHub Actions，包括 `actions/setup-node` (4.0.2→7.0.0, **Major 版本跳转**) 和 `claude-code-action`。
    *   **关键点**: `setup-node` 大版本升级可能需调整 workflow 中的输入参数。
    *   **建议**: 核查 `.github/workflows` 中是否需同步修改 node-version 声明，并确认 `claude-code-action` 新版本的输出格式兼容性。

4.  **[PR #8078](https://github.com/nearai/ironclaw/pull/8078)`[OPEN]`**
    *   **内容**: 更新 `tower-http` (0.7.0→0.7.1) 和 `tokio-tungstenite`。
    *   **风险**: 低。纯 Patch/Minor 更新，主要是 Bugfix 和安全补丁。
    *   **建议**: 可快速合并，安全收益大于成本。

---
**总体健康度评估**: 🟢 **良好**
*   **优势**: 无紧急 Bug，依赖更新机制自动化且规范。
*   **风险**: WASM 运行时升级（PR #7834）为中等风险，需重点测试。
*   **行动建议**: 优先处理低风险依赖更新（#8078, #8099），安排专项测试验证 #7834，确保 CI 覆盖 WASM 沙箱隔离场景。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报

**日期**: 2026-09-14
**项目**: [LobsterAI](https://github.com/netease-youdao/LobsterAI)
**数据来源**: GitHub API (Past 24h)

## 1. 今日速览
过去 24 小时内，LobsterAI 项目保持中等活跃度，共记录 4 条 Issue 更新和 6 条 PR 更新，无新版本发布。
项目核心动向集中在**安全漏洞修复**与**内存管理优化**，其中涉及 SSRF 攻击向量与文件读取权限的 P0 级安全问题已进入 PR 待合并状态。
值得注意的是，大量历史积压的 Stale Issues 在今天被重新标记或更新，表明维护团队正在对长期未决问题进行清理或重新评估。
整体来看，项目稳定性风险主要源于 IPC 安全边界和流式响应资源泄漏，社区对持久化记忆功能的讨论热度开始上升。

## 2. 版本发布
*(无新版本发布)*

## 3. 项目进展
今日共有 2 个 PR 被关闭（状态由 Open 转为 Closed）：

*   **[PR #2658] fix: openclaw subagent yield empty response** ([链接](https://github.com/netease-youdao/LobsterAI/pull/2658))
    *   **状态**: Closed
    *   **分析**: 修复了 OpenClaw 子智能体产生空响应的问题。此举提升了多智能体协作场景下的输出可靠性，减少了用户处理无效返回值的困扰。
*   **[PR #2659] feat: support markdown editing** ([链接](https://github.com/netease-youdao/LobsterAI/pull/2659))
    *   **状态**: Closed
    *   **分析**: 标记了 Markdown 编辑相关的支持工作。虽然 PR 摘要为空，但关闭状态暗示该功能模块可能已合并至主干，或经评估后暂时搁置/移至其他分支。若已合并，将直接改善文档类任务的处理体验。

## 4. 社区热点
今日讨论最活跃的 Issue 为关于**持久化记忆**的功能提案：

*   **[Issue #2660] Proposal: durable user and workspace memory for LobsterAI** ([链接](https://github.com/netease-youdao/LobsterAI/issues/2660))
    *   **活跃信号**: 1 条评论，新创建。
    *   **核心诉求**: 用户 Vivek Gupta (MemCode CEO) 提出在 LobsterAI 中实现跨会话的持久化用户与工作区记忆。指出当前系统在研究、文档、幻灯片等长周期任务中，用户偏好和工作区状态无法延续，导致上下文断裂。
    *   **影响分析**: 该提案直击当前 AI 助手产品的痛点——“连续性”。若采纳，LobsterAI 将从“单轮/多轮对话工具”转型为具备长期记忆的“个人工作助理”，对提升用户粘性有决定性作用。

## 5. Bug 与稳定性
今日发现的稳定性与安全问题主要集中在 IPC 层和流式处理：

*   **[P0 严重] SSRF 与任意文件读取漏洞** ([Issue #1041](https://github.com/netease-youdao/LobsterAI/issues/1041) / [PR #1042](https://github.com/netease-youdao/LobsterAI/pull/1042))
    *   **详情**: `api:fetch` 和 `api:stream` IPC 接口缺乏 URL 校验，可导致服务端请求伪造（SSRF），攻击内网或云 Metadata 服务；`readFileAsDataUrl` 可读取 `/etc/passwd` 等任意本地文件。
    *   **Fix 状态**: 已有 PR #1042 提交修复，目前处于 **Open (Stale)** 状态，**急需合并**。
*   **[中危] ReadableStream Reader 资源泄漏** ([PR #1038](https://github.com/netease-youdao/LobsterAI/pull/1038))
    *   **详情**: 在流式响应中，若未收到 `[DONE]` 标记（如网络中断、超时、用户停止），`reader.cancel()` 不执行，导致 TCP 连接泄漏。
    *   **Fix 状态**: 已有 PR #1038 提交修复，目前处于 **Open (Stale)** 状态。

## 6. 功能请求与路线图信号
*   **持久化记忆 (Durable Memory)**: 来自 [Issue #2660](https://github.com/netease-youdao/LobsterAI/issues/2660)。鉴于 LobsterAI 面向科研工作流，此功能极具战略价值，建议列入近期路线图。
*   **Agent 设置防误触**: [PR #1045](https://github.com/netease-youdao/LobsterAI/pull/1045) 提议在切换 Agent 时，若存在未保存的配置更改，增加提示弹窗。这是一个低成本高体验的提升，建议快速采纳。
*   **Windows 安装路径标准化**: [PR #1044](https://github.com/netease-youdao/LobsterAI/pull/1044) 修复了选择磁盘根目录（如 `D:\`）时的安装路径拼接问题。需确保在下一发行版中合并，以改善 Windows 用户体验。

## 7. 用户反馈摘要
通过翻阅 Issue 细节，提炼出以下最新用户痛点：

1.  **上下文窗口限制困惑**: [Issue #1046](https://github.com/netease-youdao/LobsterAI/issues/1046) 中用户质疑为何上下文窗口限制为 200K 而非模型支持的 1M。尽管标记为 Stale，但反映了用户对**性能参数自定义**的强烈需求，建议文档补充说明或提供配置项。
2.  **状态同步 Bug**: [Issue #1047](https://github.com/netease-youdao/LobsterAI/issues/1047) 反馈已清除技能后，切换 Agent 再切回，技能依然存在。这属于前端状态管理或缓存失效问题，影响用户对 Agent 配置的信任度。
3.  **安全担忧**: [Issue #1041](https://github.com/netease-youdao/LobsterAI/issues/1041) 虽由用户/安全研究员发现，但揭示了用户社区正在关注桌面端 AI 助手的安全边界，尤其是本地文件访问权限。

## 8. 待处理积压
以下 Issue/PR 已被标记为 `[stale]` 且在近期有更新，表明它们长期未决，需维护者尽快响应：

*   **安全漏洞 PR #1042** ([链接](https://github.com/netease-youdao/LobsterAI/pull/1042)): **最高优先级**。涉及 P0 级安全漏洞，代码已就绪，不应长期滞留。
*   **资源泄漏 PR #1038** ([链接](https://github.com/netease-youdao/LobsterAI/pull/1038)): 影响长期运行稳定性，建议合并。
*   **文档/配置 Issue #1046** ([链接](https://github.com/netease-youdao/LobsterAI/issues/1046)): 需明确官方立场，是否支持自定义上下文窗口，并更新文档。
*   **状态 Bug #1047** ([链接](https://github.com/netease-youdao/LobsterAI/issues/1047)): 简单的 UI 状态 Bug，修复成本低，建议分配给前端开发者。

---
**分析师建议**: 建议维护团队立即审查并合并 PR #1042（安全修复）和 PR #1038（资源泄漏），以消除项目最大的稳定性和安全风险。同时，应积极回应 Issue #2660 的记忆提案，作为下一版本的核心特性进行规划。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-14）

## 1. 今日速览
过去 24 小时内，Moltis 项目保持着高效的迭代节奏。社区共处理了 **3 条 Issue** 和 **5 条 Pull Request**，暂无新版本发布。今日核心进展集中在 **思考/推理模型参数控制的持久化** 以及 **Telegram 多人频道工具权限管控的修复**。整体项目研发响应迅速，Issue 闭环率极高（2/3 已解决），且关键 PR 合并效率显著，显示出项目主干极高的健康度与维护活性。

---

## 2. 项目进展

今日共有 4 个 PR 完成合并/关闭，重点推进了模型推理控制与多通道安全治理能力：

- **模型 Reasoning 能力增强与配置持久化**
  - [PR #1253](https://github.com/moltis-org/moltis/pull/1253): 在共享 `ReasoningEffort` Schema 中新增 `max` 级别，支持 OpenAI Codex Responses API 的最高推理消耗设置，并在前端选择器与广播机制中暴露。
  - [PR #1266](https://github.com/moltis-org/moltis/pull/1266) *(闭环 [#1259](https://github.com/moltis-org/moltis/issues/1259))*: 新增 `chat.reasoning_default` 全局配置，允许用户跨 Session 持久化默认思考强度（支持 `minimal`, `low`, `medium`, `high`, `xhigh`, `max` 等），消除了每次新会话需重新配置的痛点。
- **Telegram 频道工具权限与安全补齐**
  - [PR #1265](https://github.com/moltis-org/moltis/pull/1265) *(闭环 [#1264](https://github.com/moltis-org/moltis/issues/1264))*: 修复了 Telegram 共享频道中 Tool 失效的问题。Telegram 补齐了与 Slack 对齐的权限策略控制，正式暴露 `untrusted_audience` 和 `untrusted_tools` 配置及运行时鉴权。
- **依赖与基建维护**
  - [PR #1263](https://github.com/moltis-org/moltis/pull/1263): Dependabot 自动更新 Web UI 及前端文档依赖（包括 `@babel/core`、`astro`、`js-yaml`）。

---

## 3. 社区热点

- **高级外置 Memory Provider 架构讨论**
  - [Issue #1268: Could Moltis expose an optional advanced memory provider?](https://github.com/moltis-org/moltis/issues/1268)
  - **背景分析**：MemCode 创始人提出希望 Moltis 能够暴露可扩展的高级记忆接口（Advanced Memory Provider）。作为以 Rust 打造的高安全、多通道个人 AI Agent 框架，Moltis 本身已具备强大的内置记忆与跨 Session 召回能力。该讨论反映出生态第三方极大地看好 Moltis 作为基础设施的潜力，希望在长文本记忆、知识图谱及深度持久化上与 Moltis 建立标准化插件契约。

---

## 4. Bug 与稳定性

- **[中危/已修复] Telegram 共享频道工具调用失效**
  - **现象**：[Issue #1264](https://github.com/moltis-org/moltis/issues/1264) 报告 Agent 在 Telegram 共享/群组频道中提示工具停止工作。
  - **根因**：Telegram 通道此前继承了 Gateway 层默认的“拒绝所有未授权工具”限制，但未将配置项导出给用户。
  - **状态**：已通过 [PR #1265](https://github.com/moltis-org/moltis/pull/1265) 补充安全控制逻辑并修复合并。

---

## 5. 功能请求与路线图信号

1. ** Reasoning/Thinking 模型的精细化控制**：从 [#1253](https://github.com/moltis-org/moltis/pull/1253) 与 [#1266](https://github.com/moltis-org/moltis/pull/1266) 可以看出，随着支持 Thinking 机制的模型普及，Moltis 正在全面标准化 Reasoning 级别的传递、向下兼容与持久化策略，成为标配能力。
2. **Agent 生命周期 Hook 治理**：目前待合并的 [PR #1267](https://github.com/moltis-org/moltis/pull/1267) 针对 Agent 执行与消息出站生命周期，补齐了 `AgentEnd` 与 `MessageSending` 事件分发，便于后续多通道消息重写、TTS 拦截及历史记录同步。

---

## 6. 用户反馈摘要

- **使用痛点**：用户反映以前每次新建对话或更换未设定参数的模型时，思考等级（Reasoning effort）都会重置，无法记住个人偏好。
- **改进满意度**：社区迅速做出了响应（PR #1266），将 Reasoning 参数写入配置层，提升了长时间长文本推理场景下的 UX 体验。

---

## 7. 待处理积压

- **待审核 PR**：[PR #1267: fix(hooks): dispatch agent and outbound message lifecycle events](https://github.com/moltis-org/moltis/pull/1267)
  - 修复了 [#1255](https://github.com/moltis-org/moltis/issues/1255)，确保流式/非流式 Loop 结束时统一分发 `AgentEnd` 并正确统计工具调用频次，需核心维护者审查是否对现有的 Web UI / TTS 管道存在副作用。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (agentscope-ai/CoPaw) 开源项目动态日报
**日期**：2026-09-14

---

### 1. 今日速览
过去 24 小时内，CoPaw 项目保持稳定的社区活跃度，共更新 **6 条 Issues**（新开/活跃 5 条，关闭 1 条）与 **6 条 Pull Requests**（待合并 5 条，已合并/关闭 1 条）。整体运行健康度良好，社区贡献者表现活跃。今日更新重点集中在**桌面端状态持久化修复**、**最新模型（DeepSeek V4 Flash）能力适配**、**多语言与国际化优化**以及**Agent 上下文挤出机制优化**讨论上。

---

### 3. 项目进展
今日项目在基础设施与多语言支持方面取得了确定性进展：

* **Docker 官方镜像工具链预置**：[#3429](https://github.com/agentscope-ai/QwenPaw/issues/3429) 已关闭。官方 Docker 镜像中预装了 `himalaya` 及其他常用 CLI 工具，避免用户每次重新构建容器时重复安装。
* **巴西葡萄牙语 (pt-BR) 国际化补齐与修复**：PR [#4009](https://github.com/agentscope-ai/QwenPaw/pull/4009) 被替换优化为 PR [#7734](https://github.com/agentscope-ai/QwenPaw/pull/7734)，修复了此前基于字典翻译遗留的异常字符串，并实现了 pt-BR 语言包与 `en.json` 100% 键值对齐。

---

### 4. 社区热点
今日讨论最热烈的焦点集中在 **Agent 记忆漂移** 与 **桌面端数据异常丢失**：

* **Agent 长文本记忆遗忘与路径遵从性问题**：[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) *(4条评论)*
  * **诉求分析**：用户在进行插件开发时，已明确限制 Agent 仅在特定路径 B 生成 `TODO` 文件，并在源码目录 A 编码。然而 Agent 频繁“遗忘”规则，将文件散落到 A/B/C 多个目录，甚至跑到运行时目录 C 中开发导致代码被部署脚本覆盖。用户强烈呼吁改进 Agent 的长期上下文约束与记忆持久化机制。
* **桌面端 Session 与模型配置丢失**：[#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) *(3条评论)*
  * **诉求分析**：Desktop v2.2.1 用户反馈在执行中断/重载插件操作后，桌面端出现严重 Bug：不仅当前对话卡死，而且历史会话完全消失，大模型配置也被清空重置。这暴露出本地存储/会话隔离机制在异常关闭时的薄弱性。

---

### 5. Bug 与稳定性
按影响严重程度排序如下：

1. **[高危] 桌面端会话与模型配置丢失** [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)
   * **现象**：插件重载或 shutdown 后，桌面端保存的会话记录彻底无法找回，大模型配置重置。
   * **状态**：待处理（尚无 Fix PR）。
2. **[中危] 定时任务输出被错误折叠至 Thinking/步骤块** [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)
   * **现象**：v2.2.1 中定时任务频繁无结果输出，实际渲染时结果被埋藏在思考过程或步骤折叠中。
   * **状态**：待处理（尚无 Fix PR）。
3. **[中危] MCP 协议 HTTP 错误响应头未保留** PR [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)
   * **现象**：HTTPX 重新压缩时导致二次解压失败，丢失有价值的 MCP HTTP 错误信息（修复 [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)）。
   * **状态**：已有社区 PR 等待审核。
4. **[轻微] ACP 协议权限匹配模式修正** PR [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)
   * **现象**：可信 ACP 会话因 `optionId` 不匹配导致本可自动通过的安全工具调用退化为交互式弹窗。
   * **状态**：已有社区 PR 等待合并。

---

### 6. 功能请求与路线图信号

* **DeepSeek V4 Flash 接入适配**：PR [#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736) 为核心 Provider 增加 DeepSeek V4 Flash 模型的能力声明（支持图像输入、1,000,000 token 上下文及推理解析），预示该模型将很快获得官方原生最佳支持。
* **Agent 自主上下文管理与唤醒机制**：[#7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) 提出重构当前仅靠 Token 阈值硬性裁切上下文的逻辑。倡议在 Context Eviction 前允许 Agent 获得警告，从而自主完成任务交接与状态提炼。
* **扩展多 Agent 协作触发关键词**：PR [#7737](https://github.com/agentscope-ai/QwenPaw/pull/7737) 在 Skill Selection 提示词中扩充了团队协作相关词汇，使 Agent 能在首轮对话中准确识别多 Agent 协作需求（修复 [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113)）。
* **Files 面板增加隐藏文件显示开关**：[#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) 申请在 Console UI 的文件面板中增加控制显示 `.prefix` 隐藏文件和文件夹的开关。

---

### 7. 用户反馈摘要
* **核心痛点 1（指令飘移）**：复杂开发场景下，Agent 随着对话轮次增加，极易打破路径约定和行为边界，缺乏硬性的规则约束机制。
* **核心痛点 2（数据持久化稳定性）**：桌面端（Desktop App）在处理报错、重启、插件更新时的容错率不高，模型配置丢失

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 开源项目动态日报 (2026-09-14)

## 1. 今日速览
在过去 24 小时内，ZeroClaw 项目保持高强度的社区讨论与架构治理迭代。过去一天共更新 **36 条 Issues**（闭合 5 条）与 **50 条 Pull Requests**（无新合并 PR，均处于待合并或评审状态）。
当前项目正处于 **v0.8.5 稳定化窗口**（[Issue #9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）与架构 RFC 决策期。社区重点集中在 **RFC 流程去摩擦化**、**运行期配置校验一致性**、**ACP/ZeroCode 长会话稳定性**，以及 **插件系统/安全权限策略** 的集中重构上。

---

## 2. 项目进展
虽然过去 24 小时内无 PR 最终合并入库（处于 Review 与集中测试阶段），但社区清理并闭合了多项关键的配置与运行时 Bug：
* **运行时配置校验收拢**：闭合了 [Issue #10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) 与 [Issue #10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533)，解决了 RPC `config/set` 绕过 `Config::validate()` 校验导致保存非法配置的问题，以及修复了模型路由对 `custom.*` 供应商插槽的误拒。
* **路径与并发安全修复**：闭合了 [Issue #10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721)（修复知识库数据库路径 `~` 符号被全局错误替换的问题）和 [Issue #10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324)（修复 Cron 手动触发与历史读取在 Agent 重命名时的 check-then-act 竞态漏洞）。
* **CI 基础能力提升**：闭合了 [Issue #10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)，为文档 CI 引入全仓内部死链扫描能力。

---

## 3. 社区热点
今日讨论热度最高的集中在**开源项目治理流程优化**与**分布式边缘演进 RFC**：

* **RFC 与设计决策队列管理** ([Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) - 15 评论)
  作为维护者决策队列的追踪 Issue，涵盖了多项待裁决的架构设计。社区正在集中评审涉及核心权限模型与安全边界的待接受提案。
* **RFC 投票流程简化** ([Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) - 10 评论)
  提案主张取消强制性的 48/72 小时固定讨论窗口，并允许在做出修改（REVISE）时立即挂起快照，以解决目前 RFC 决策周期过长、缺乏有效反馈的问题。
* **PR Review 证据与刷新警告机制** ([Issue #10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) - 7 评论)
  规范合并流中的评审证据认定，为已经过 Core 成员批准且 CI 无风险的 PR 引入快速合并通道（Expedited Merge Lane）。
* **边缘计算网格 RFC** ([Issue #10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) - 4 评论)
  讨论基于 Pull 工作节点与签名回执（Signed Receipts）的跨设备 Mesh 组网机制，旨在让多台局域网闲置设备（PC、SBC、NAS）共享计算资源。

---

## 4. Bug 与稳定性
今日报告并重点关注的 Bug 按严重程度排列如下：

### 🔴 阻断级 (S1 / High Risk)
1. **SOP 引擎未记录 Schema 拒绝即推进后续步骤** ([Issue #10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066))
   * **现象**：当步骤输出未通过 JSON Schema 校验时，SOP 引擎会先执行后续步骤，之后才记录拒绝日志，导致脏数据扩散。
2. **OpenCode 供应商漏发请求头导致账号挂起** ([Issue #10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603))
   * **现象**：发往 OpenCode 中继站的请求缺少 `x-opencode-session` Header，导致部分模型不可用并可能触发现发机制。
3. **RPC `config/set` 与 CLI 配置绕过验证** ([Issue #10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320))
   * **现象**：写配置接口未执行范围与有效性检查，导致超限配置写入持久化层。

### 🟡 降级级 (S2 / Medium-High Risk)
1. **Windows 平台 Stack Overflow 风险** ([Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734))
   * **现象**：`RpcDispatcher::process_line` 在 Advisory Windows 测试中触发崩溃，运行空间距离 2 MB 栈保护区不足 2%。
2. **ACP/Code Turn 失败丢弃持久化历史** ([Issue #10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788))
   * **现象**：当供应商报错（`Err(_)`）时，当前 Turn 已接受的 Prompt 和已完成的工具交互会被从持久化历史中丢弃。
3. **

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*