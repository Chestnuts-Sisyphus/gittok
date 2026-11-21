# OpenClaw 生态日报 2026-11-21

> Issues: 324 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-21 00:59 UTC

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
**日期：** 2026-11-21  
**数据周期：** 过去 24 小时 (2026-11-20 00:00 - 2026-11-21 00:00)  
**数据来源：** GitHub OpenClaw (openclaw/openclaw)  

---

## 1. 今日速览
过去 24 小时，OpenClaw 项目保持高活跃度，**Issues 新增/活跃 239 条**，**PR 新增/活跃 500 条**，显示出社区对 2026.11.x 版本迭代的积极参与。今日无新版本发布，但多个关键 Bug 修复已进入合并阶段（如 Discord 状态重连、Windows 安装路径清理、Cloudflare JWT 验证等），项目整体处于功能优化与稳定性提升的平稳期。尽管仍有部分高优先级问题（如 macOS Gateway 停止失败、插件迁移冲突）待解决，但整体项目健康度良好，进展稳步推进。

---

## 2. 版本发布
无新版本发布。

---

## 3. 项目进展
今日有多个重要 PR 获得关注或合并，推动了以下进展：
- **Discord 集成修复**：PR #202813 修复了 `/codex detach` 后 Gateway 重启导致会话绑定失效的问题，提升了多轮对话的稳定性。
- **Windows 安装体验优化**：PR #202610 修复了 Windows 下更新残留文件路径过长无法删除的问题，改善了卸载体验。
- **Cloudflare 安全增强**：PR #200376 增加了 Cloudflare Access JWT 验证选项，为受信任代理场景提供更细粒度的身份验证。
- **控制 UI 体验改进**：PR #202756 实现了按分类浏览 Skills 的功能，提升了 UI 可发现性；PR #202534 优化了文件路径链接的显示逻辑，减少误报。
- **会话与权限管理**：PR #202552 引入了单会话协作邀请功能，降低了跨会话协作的权限门槛；PR #202684 修复了过期 hook 会话的清理机制。

---

## 4. 社区热点
今日讨论最活跃的 Issue/PR 重点关注以下主题：
- **Gateway 停止失败（macOS）**：Issue #191944 讨论了 macOS 上 `gateway stop` 命令因进程血缘检查失败而无法停止的问题，已有 38 条评论，社区正在讨论解决方案。
- **更新迁移冲突**：Issue #197083 报告了从 2026.11.1 升级到 2026.11.3 时 Doctor WAL 验证失败，导致更新部分完成的问题，已有 31 条评论。
- **启动性能回归**：Issue #168955 发现从 2026.9.9 升级到 2026.10.1 后，Windows 上 Gateway 启动时间从 410s 增加到 1030s，社区关注性能优化方向。
- **Prompt Cache 失效**：Issue #182891 报告了缓存命中率持续下降的问题，可能与上下文重写有关，已有 20 条评论。
- **会话侧边栏渲染异常**：Issue #200781 反映了 2026.11.5 版本中 Sessions 侧边栏仅显示 Agent 头部而无法显示会话行的问题，影响用户浏览体验。

---

## 5. Bug 与稳定性
今日报告的关键 Bug（按严重程度排序）：
1. **P0 - Gateway 停止失败（macOS）**：Issue #191944，Gateway 在 macOS 上无法正常停止，影响运维操作。
2. **P1 - 更新 Doctor 冲突**：Issue #197083，插件迁移验证失败导致更新卡住。
3. **P1 - 启动性能回归**：Issue #168955，Windows 启动时间显著增加，影响用户体验。
4. **P1 - 插件迁移冲突**：Issue #200606，2026.11.5 候选版本 Doctor 阻止更新。
5. **P1 - 会话状态丢失**：Issue #198373，Prompt 缓存命中率极低，影响推理效率。
6. **P1 - Telegram 消息丢失**：Issue #125764，网络失败后消息被死信化，无重试机制。
7. **P2 - 更新安装失败**：Issue #200756，Windows beta 更新在 package-swap 阶段失败。
8. **P2 - 侧边栏渲染异常**：Issue #200781，Sessions 侧边栏无法显示会话行。

**已修复/合并的 PR**：
- PR #202813（Discord 重连）、PR #202610（Windows 路径清理）、PR #202534（文件链接优化）等。

---

## 6. 功能请求与路线图信号
今日提出的新功能请求：
- **Per-user secret vault**（Issue #197297）：为多用户 Gateway 提供个人密钥 vault，提升安全性。
- **IMAP 持久化处理与可检查结果**（Issue #179685）：增强 IMAP 触发的可靠性，提供消息处理结果追踪。
- **Matrix 最终回复新消息选项**（Issue #170261）：在 draft-streaming 模式下，允许最终回复作为新消息发送，提升搜索可见性。
- **Session Share steering 限制连接**（PR #202654）：为远程发布集成提供窄范围传输通道，避免权限泄露。

---

## 7. 用户反馈摘要
从 Issues 评论中提炼的真实用户痛点：
- **macOS 用户**：频繁遇到 Gateway 停止失败和进程血缘检查问题，影响日常运维。
- **Windows 用户**：更新安装过程中多次遇到 package-swap 失败和路径清理问题。
- **OpenAI 兼容路由用户**：Prompt 缓存命中率极低，导致推理成本增加。
- **多会话协作用户**：缺乏单会话邀请机制，只能通过 Gateway-wide 权限管理。
- **移动端用户**：iOS 文本大小设置不生效，影响阅读体验。

---

## 8. 待处理积压
长期未响应的重要 Issue：
- **P1 - 启动性能回归**（Issue #168955）：Windows 启动时间过长，需性能分析。
- **P1 - Telegram 消息丢失**（Issue #125764）：网络失败后消息丢失无重试，需可靠性修复。
- **P2 - Prompt Cache 失效**（Issue #182891）：缓存命中率低，需上下文管理优化。
- **P2 - 会话侧边栏渲染异常**（Issue #200781）：UI 逻辑错误导致会话列表不显示。

**待合并 PR**：
- PR #200376（Cloudflare JWT 验证）：安全相关，需尽快合并。
- PR #202552（单会话协作邀请）：功能性强，需维护者审核。

---

**总结**：OpenClaw 今日保持高活跃度，多个关键 Bug 修复已进入合并阶段，但仍有部分高优先级问题（如 macOS Gateway 停止、更新迁移冲突）待解决。社区反馈集中在性能优化、用户体验和安全性提升，建议维护者优先处理 P0/P1 级别问题。

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目日报 – 2026‑11‑21**  
（数据来源：GitHub 过去 24 小时内的 Issues & Pull Requests）

---

## 1. 今日速览  
- 项目在过去 24 小时内保持 **高活跃度**：共计 **13 条 PR**（12 已合并/关闭，1 待合并）以及 **1 条 Bug Issue** 被关闭。  
- 所有 PR 均围绕 **WebUI 改进**（交互细节、可访问性、样式重构）以及 **核心功能修复**（频道路由、自动填充安全性）展开。  
- 目前 **没有新版本发布**，但合并的多项 UI 改动为后续功能迭代奠定了更稳固的基础。  
- 关键问题（浏览器自动填充导致的凭证覆盖）已被定位并修复，显示项目对 **安全性和用户体验** 的快速响应能力。

---

## 2. 版本发布  
> **暂无**（本日未发布任何 Release）。

---

## 3. 项目进展  

| PR 编号 | 状态 | 关键改动 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#6733** | 已合并 | 在 WebUI 渠道凭证输入框上添加 `autocomplete="new-password"`，阻止浏览器把 WebUI 登录密码误填到渠道密钥字段。 | 解决凭证被意外覆盖的致命 bug，提升安全性。 | <https://github.com/HKUDS/nanobot/pull/6733> |
| **#6736** | 已合并 | 保留侧频道（side‑channel）指令的路由，防止 `/dream`、`/pairing` 等命令在流式回复期间截断历史。 | 改善多指令并发使用的稳健性。 | <https://github.com/HKUDS/nanobot/pull/6736> |
| **#6739** | 已合并 | 当用户消息高度超过视口 50% 时自动折叠，防止长文本撑满对话窗口。 | 提升阅读体验与 UI 整洁度。 | <https://github.com/HKUDS/nanobot/pull/6739> |
| **#6737** | 已合并 | 重新设计 “GoalIsland” 为漂浮式半透明卡片，摆脱原有的凹槽剪裁。 | UI 现代化，增强视觉层次感。 | <https://github.com/HKUDS/nanobot/pull/6737> |
| **#6738** | 已合并 | 把 Composer（斜杠、技能、@提及）弹出面板统一抽离为 `ComposerPalette` 组件，统一样式与交互。 | 代码复用度提升，后续功能扩展更便捷。 | <https://github.com/HKUDS/nanobot/pull/6738> |
| **#6735**、**#6734**、**#6731**、**#6730**、**#6729** | 已合并 | 一系列可访问性、焦点管理、确认交互、主题统一以及代码清理的细节改进。 | 提升整体可用性、降低技术债务。 | 各自链接见下表 |
| **#6323** (Open) | 待合并 | “编辑并重新发送同一会话中的消息” 功能已实现并通过性能基准，但仍略超出基线。 | 关键交互功能，预计下一个里程碑合并。 | <https://github.com/HKUDS/nanobot/pull/6323> |

**整体评估**：今天的合并工作基本集中在 **WebUI 稳定性 & 可访问性**，以及 **核心路由/安全 bug** 的修复。功能层面，编辑/重发消息的实验实现已经完成，仅待性能优化后合并，标志着产品交互能力正向前迈进。

---

## 4. 社区热点  

| 项目 | 类型 | 热度（评论/👍） | 关键诉求 |
|------|------|----------------|----------|
| **#6732** – “WebUI channel secret fields get overwritten by the WebUI access password” | Issue (已关闭) | 0 / 0 | 浏览器密码管理器误填导致渠道凭证被覆盖，直接影响用户的机器人部署安全。 |
| **#6323** – “edit and resend messages in the same session” | PR (开放) | – / 0 | 用户希望在对话中快速修正并重新发送消息，提升交互流畅度。虽无评论，但该功能被标记为 *priority: p2*，显示社区对编辑能力的期待。 |
| **#6741** – “align settings sidebar footer rows” | PR (已合并) | – / 0 | UI 对齐细节的改进，虽然是微调，却体现了对界面一致性的关注。 |

**分析**：唯一被显式报告的 Bug（#6732）触发了当天一连串的安全相关 PR（#6733 等），说明 **安全性** 是社区最敏感的痛点；与此同时，对 **编辑/重发** 功能的需求（#6323）已进入 PR 阶段，预示后续版本将加入此交互特性。

---

## 5. Bug 与稳定性  

| 严重程度 | Issue / PR | 描述 | 是否已修复 |
|----------|------------|------|------------|
| **Critical** | #6732 (Issue) | 浏览器自动填充把 WebUI 登录密码写入渠道凭证，导致机器人启动失败。 | ✅ 通过 PR #6733 修复 |
| **High** | #6736 (PR) | 流式回复期间执行 `/dream`、`/pairing` 等指令会截断历史，导致对话上下文丢失。 | ✅ 已合并 |
| **Medium** | #6735 (PR) | 焦点指示在指针交互后未恢复，影响键盘导航的可访问性。 | ✅ 已合并 |
| **Medium** | #6734 (PR) | 同上，针对 `:focus-visible` 的细粒度控制。 | ✅ 已合并 |
| **Low** | #6730 (PR) | 自定义推理力度选择器在主题不匹配时出现原生下拉框，视觉不一致。 | ✅ 已合并 |
| **Low** | #6729 (PR) | 移除不可达代码与冗余测试，降低 CI 运行时间。 | ✅ 已合并 |

> **结论**：所有已报告的 bug 均在同一天得到修复，项目在 **快速定位‑快速回滚** 能力上表现良好。

---

## 6. 功能请求与路线图信号  

| 来源 | 功能请求 | 当前进展 | 是否可能进入下个里程碑 |
|------|----------|----------|------------------------|
| Issue #6732（描述中） | 防止浏览器自动填充渠道凭证 | 已实现 `autocomplete="new-password"`（PR #6733） | 已完成 |
| PR #6323（标题） | 编辑并重新发送同一会话中的消息 | 功能已实现，性能略超基准 | 预计在下一个正式 Release（vX.Y）合并 |
| 多个 UI 改进 PR（#6737、#6738、#6739 等） | UI/UX 细节升级（GoalIsland、ComposerPalette、长消息折叠） | 已合并 | 已进入正式发布候选版 |
| 未出现的新需求 | — | — | — |

**路线图提示**：WebUI 的交互升级（编辑、折叠、Palette 重构）正快速推进，下一阶段可能聚焦 **跨会话指令同步** 与 **高级模型配置 UI**（如自定义推理力度的统一组件已完成）。

---

## 7. 用户反馈摘要  

- **安全感受**：Issue #6732 的出现暴露出用户对 **凭证安全** 的高度敏感，项目在当天即完成修复，提升了用户信任。  
- **交互流畅度**：用户希望能够 **在对话中编辑后直接重新发送**（PR #6323），这是一项常见的即时通讯需求，已得到实现原型。  
- **视觉一致性**：多条 UI 对齐与主题统一的 PR（#6741、#6730 等）表明用户对 **界面美观、主题统一** 有持续期待。  
- **可访问性**：焦点管理（#6734、#6735）以及键盘/指针模式切换的修复，回应了对 **键盘导航** 与 **无障碍** 的需求，提升了不同使用场景下的可用性。

整体来看，用户反馈集中在 **安全、编辑便利、视觉统一和可访问性** 四个维度，项目的响应速度和修复覆盖面均符合社区期待。

---

## 8. 待处理积压  

| 编号 | 类型 | 状态 | 简要说明 | 建议关注点 |
|------|------|------|----------|------------|
| **#6323** | Pull Request | OPEN (待合并) | “编辑并重新发送同一会话中的消息”。已实现功能，仍需进一步性能调优以满足基准要求。 | 关注性能回归测试结果，决定是否在下个 Release 合并。 |
| **（历史未列出）** | 可能存在的旧 Issue/PR | – | 本报告仅覆盖最近 24 h，建议维护者检查 **30 天以上未更新的 open Issue**（如长期功能请求或架构讨论），防止积压。 | 可在项目仪表盘中使用 “age:>30” 过滤进行审视。 |

---

### 小结  
今天的 **NanoBot** 开发节奏快且聚焦明确：在确保 **安全** 与 **可访问性** 的前提下，持续完善 **WebUI** 交互细节，并为关键的 **编辑/重发** 功能铺设实现路径。社区反馈得到及时响应，所有已报告的 Bug 当天即修复，显示项目健康度保持在 **高** 水平。建议维持当前的 PR 评审速度，尽快完成 #6323 的性能优化，以便在下一个正式版本中交付编辑能力，进一步提升用户体验。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目日报

**报告日期：** 2026-11-21  
**数据周期：** 2026-11-20 00:00 - 2026-11-21 00:00 (过去24小时)  
**项目健康度：** ⭐⭐⭐⭐ (活跃度高，版本迭代快，但存在部分阻塞性 Bug)

---

## 1. 今日速览

Hermes Agent 今日保持高活跃度，发布了 v0.23.3+canary 版本，并在过去24小时内处理了50条 Issue 和50条 PR。项目在 **Gateway 通知机制**、**Kanban 工作流**、**OAuth 认证** 以及 **桌面端设计系统** 等核心功能上均有实质性推进。尽管整体进展顺利，但仍有部分阻塞用户日常使用的 Bug（如 PR 创建权限、桌面端代码块渲染、WSL 弹窗等）尚未完全解决，社区反馈主要集中在安全合规、用户体验细节以及跨平台兼容性上。

---

## 2. 版本发布

**v0.23.3+canary.20261120T064609Z**
*   **发布日期：** 2026年11月20日
*   **类型：** Canary 版本 (预览版)
*   **更新摘要：** 本版本是 v0.23.3 的 Canary 预览构建。虽然具体 Release Notes 未在本次数据中完全展开，但结合近期的 PR 活动，预计包含了对 Desktop 界面重构、Gateway 通知优化以及 OAuth 认证流程的改进。
*   **破坏性变更：** 目前未检测到明显的破坏性变更，建议在生产环境使用 Stable 版本。

---

## 3. 项目进展

**今日合并/关闭的重要 PR：**
1.  **PR #151194 (Closed):** `fix(skills): release a skill_view dedup entry the model only saw as a preview`
    *   **内容：** 修复了技能列表中的去重逻辑，防止模型仅预览到技能但未实际加载时导致视图异常。
2.  **PR #102086 (Closed):** `feat(delegation): add operator-controlled routes`
    *   **内容：** 增加了命名委托路由和操作员工具集上限，提升了任务路由的可控性。
3.  **PR #102082 (Closed):** `feat(observability): add local action receipts`
    *   **内容：** 为工具回调增加了默认关闭的本地 SQLite 行动收据，用于追踪工具执行情况。

**整体进展：**
项目正处于 **Desktop 重构** 的关键阶段（见 PR #152168），并在 **Gateway 平台集成**（如 Telegram/Discord 的 Spoiler 图片支持）和 **OAuth 插件生态**（如 Linear/QuickBooks）上持续完善。

---

## 4. 社区热点

**高热度 Issue：**
*   **#131859 - PR 创建权限错误 (66 comments)**
    *   **热度分析：** 用户反馈在通过 API 创建 PR 时遇到 `CreatePullRequest` 权限错误，尽管创建 Issue 和 Fork PR 正常。这直接影响社区贡献流程，引发了大量讨论。
    *   **链接：** [Issue #131859](https://github.com/nousresearch/hermes-agent/issues/131859)

*   **#77253 - 桌面端代码块渲染 Bug (15 comments)**
    *   **热度分析：** 涉及 Desktop 应用中 Markdown 代码块（无语言标签）无法正确渲染的问题，影响开发者的使用体验。
    *   **链接：** [Issue #77253](https://github.com/nousresearch/hermes-agent/issues/77253)

**高热度 PR：**
*   **PR #158407 - Gateway 客户端识别**
    *   **内容：** 允许 Gateway 知道每个回合是由哪个客户端发送的，以便插件进行更精准的通知控制。
    *   **链接：** [PR #158407](https://github.com/nousresearch/hermes-agent/pull/158407)

---

## 5. Bug 与稳定性

**严重程度分级：**

**🔴 高危/阻塞:**
1.  **#131859 (Open):** API 创建 PR 权限错误。用户无法通过 fork 创建 PR，阻碍贡献。
    *   **状态：** 未解决
    *   **链接：** [Issue #131859](https://github.com/nousresearch/hermes-agent/issues/131859)

2.  **#158256 (Open):** 非 `~/.hermes` 路径下的 Gateway 不会 Idle Exit。导致内存泄漏（~75-110MB）。
    *   **状态：** 未解决
    *   **链接：** [Issue #158256](https://github.com/nousresearch/hermes-agent/issues/158256)

**🟠 中等/影响体验:**
1.  **#77253 (Open):** Desktop 代码块渲染错误。
2.  **#128770 (Closed):** WSL-less Windows 上启动时弹出 WSL 安装提示（功能无害但干扰）。
3.  **#149248 (Open):** 后台任务经常无法完成，导致订阅丢失。

**🟡 低危/边缘情况:**
1.  **#107149 (Open):** Git checkpoint 失败导致 `index.lock` 残留。
2.  **#158371 (Open):** Kanban 工作流中，同一 Agent 的评论被过滤，无法自我引导。

---

## 6. 功能请求与路线图信号

**新功能提案：**
1.  **Feature #157274:** Runtime governance gate + tamper-evident audit trail.
    *   **信号：** 项目正从简单的 Allowlist 向更复杂的 **Policy Machine** 和 **审计追踪** 演进，强调安全性和合规性。
    *   **链接：** [Issue #157274](https://github.com/nousresearch/hermes-agent/issues/157274)

2.  **Feature #158416:** Discord 和 Telegram Gateway 的 Spoiler 图片支持。
    *   **信号：** 丰富 Gateway 在社交平台上的多媒体交互能力。
    *   **链接：** [Issue #158416](https://github.com/nousresearch/hermes-agent/issues/158416)

**生态更新：**
*   **PR #158413:** 添加 `bot-dashboard 1.3.0` 到插件目录。
*   **PR #158418:** 完善 OAuth 插件对 Linear 和 QuickBooks 的支持（Pin redirect URI 和 Scope）。

---

## 7. 用户反馈摘要

*   **痛点 1：API 权限限制** - 贡献者发现无法通过标准 GitHub CLI 创建 PR，这可能是权限配置或 Token 授权的问题，需要维护者排查。
*   **痛点 2：路径依赖问题** - 非 `~/.hermes` 路径下的 Gateway 无法自动退出，这对于脚本化使用或临时部署场景是重大阻碍。
*   **痛点 3：桌面端细节** - 用户在桌面端阅读长文档时，无语言标签的代码块显示异常，降低了阅读体验。
*   **痛点 4：后台任务可靠性** - 用户频繁反馈长时间运行的任务（如 Delegate）会失败且不通知，导致“信任感”缺失。

---

## 8. 待处理积压

**长期未响应/高价值 Issue：**
*   **#93592:** `background_review` 忽略备用配置链。
    *   **状态：** Open (评论数: 7, 创建于 8月24日)
    *   **链接：** [Issue #93592](https://github.com/nousresearch/hermes-agent/issues/93592)

*   **#142644:** 将 `hermes pm bundle` payload 附加到 GitHub Release。
    *   **状态：** Open (评论数: 3, 创建于 10月21日)
    *   **链接：** [Issue #142644](https://github.com/nousresearch/hermes-agent/issues/142644)

**维护建议：** 维护者应优先处理 **#131859** (影响贡献) 和 **#158256** (资源泄漏)，同时关注 Desktop 代码块渲染的修复进度。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ 摘要生成失败。

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

**LobsterAI 项目日报**  
*2026‑11‑21*  

---

## 1. 今日速览  
- 过去24 h 内，**Issues** 仅有 1 条（持续开放），**PRs** 19 条，已合并 15 条，待合并 4 条，表明维护团队在保持高频次提交的同时，持续推进核心功能与修复。  
- 代码基准维持稳定：无新 Release，持续更新依赖（fast‑xml‑parser、Electron 等）。  
- 关键安全议题（API Key 明文暴露）已被提起并启动修复 PR，社区关注度显著。  
- 项目整体健康度维持在 **高**，开发活跃度 **中高**。

---

## 2. 版本发布  
- 本日无新 Release，故此栏目省略。  

---

## 3. 项目进展  
| PR | 状态 | 主要改动 | 推进价值 |
|---|---|---|---|
|[#3135](https://github.com/netease-youdao/LobsterAI/pull/3135) | ✅ 合并 | Fork 对话到指定消息并保持位置、序列号 | 使用户能在子会话中精准回溯，提升协作体验 |
|[#3134](https://github.com/netease-youdao/LobsterAI/pull/3134) | ✅ 合并 | 迁移桌面版视觉历史与库预览 | 保证跨平台图像渲染一致性，减少文件丢失 |
|[#3133](https://github.com/netease-youdao/LobsterAI/pull/3133) | ✅ 合并 | 发布 2026.11.17 版本快照 | 为后续功能打好版本基础 |
|[#3132](https://github.com/netease-youdao/LobsterAI/pull/3132) | ✅ 合并 | 迁移专家 persona 逻辑 | 恢复迁移后的用户自定义设置，提升稳定性 |
|[#3131](https://github.com/netease-youdao/LobsterAI/pull/3131) | ✅ 合并 | Cowork 问答结果同步至 dsh | 提升跨引擎数据一致性 |
|[#3130](https://github.com/netease-youdao/LobsterAI/pull/3130) | ✅ 合并 | 皮肤设计器集成到 dsh | 让主题编辑流程更流畅 |
|[#3129](https://github.com/netease-youdao/LobsterAI/pull/3129) | ✅ 合并 | 快速操作面板统一化、PPT向导优化 | 提升 UI 一致性与导航效率 |
|[#3128](https://github.com/netease-youdao/LobsterAI/pull/3128) | 🔲 待合并 | 恢复 dsh 浏览器集成 | 解决“内嵌浏览器失效”问题，已通过 CI 验证 |
|[#3127](https://github.com/netease-youdao/LobsterAI/pull/3127) | ✅ 合并 | 视频生成与播放恢复 | 重新开放视频工具链，满足内容创作者需求 |
|[#3126](https://github.com/netease-youdao/LobsterAI/pull/3126) | ✅ 合并 | 延迟 `webFrame.setZoomFactor` 以防 `ready-to-show` 被丢弃 | 修复 Electron 43.x 相关渲染 bug |
|[#3125](https://github.com/netease-youdao/LobsterAI/pull/3125) | ✅ 合并 | 图像生成恢复与旧版兼容 | 维护历史工作流的连贯性 |
|[#3124](https://github.com/netease-youdao/LobsterAI/pull/3124) | ✅ 合并 | 右侧 orb 固定跨屏幕 & DPI | 提升多显示器使用体验 |
|[#3123](https://github.com/netease-youdao/LobsterAI/pull/3123) | ✅ 合并 | 子代理会话恢复 | 解决主代理完成后子面板不显示的问题 |
|[#3122](https://github.com/netease-youdao/LobsterAI/pull/3122) | 🔲 待合并 | 保护 YoudaoNote API Key（已与 Issue #3120 对接） | 关键安全修复 |
|[#3036](https://github.com/netease-youdao/LobsterAI/pull/3036) | 🔲 待合并 | fast‑xml‑parser 升级 5.11.1 → 5.12.0 | 修补已知安全缺陷 |
|[#3037](https://github.com/netease-youdao/LobsterAI/pull/3037) | 🔲 待合并 | Electron 升级 43.5.0 → 43.8.7 | 引入最新平台兼容与性能改进 |

> **进度概览**  
> - **合并率**：15/19（≈79%）  
> - **功能完善**：对话迁移、视觉历史、皮肤编辑、视频/图像生成、桌面浏览器、子代理支持等核心模块完成或即将完成  
> - **安全/依赖**：API Key 保护、依赖更新已启动  

---

## 4. 社区热点  
- **Issue #3120**（API Key 明文暴露）  
  - **链接**: https://github.com/netease-youdao/LobsterAI/issues/3120  
  - **讨论要点**: 明文传递导致 Key 泄露风险；提出 CLI 受保护传递方案；社区共计 3 条评论，持续关注度高。  
- **PR #3122**（API Key 保护实现）  
  - **链接**: https://github.com/netease-youdao/LobsterAI/pull/3122  
  - **关联**: 直接回应 #3120，已提交并处于审核阶段，预期 1‑2 天内合并。  
- **PR #3128**（恢复内嵌浏览器）  
  - **链接**: https://github.com/netease-youdao/LobsterAI/pull/3128  
  - **讨论**: 多位用户反映浏览器功能失效，PR 已通过 CI 通过，等待维护者最终审核。  

**分析**  
- 安全性是当下最热议题，API Key 处理被视为关键改进点。  
- 浏览器集成恢复直接影响日常使用，社区对其恢复表现出高度期盼。  

---

## 5. Bug 与稳定性  
| 级别 | 问题 | 影响 | Fix PR |
|------|------|------|--------|
| **高** | `webFrame.setZoomFactor` 触发 Electron #51972 影响窗口显示 | 影响首次渲染，已在 PR #3126 中修复 | ✅ |
| **中** | 旧版皮肤/图像生成流程失效（历史文件缺失） | 影响内容创作流程 | ✅ PR #3125 |
| **低** | 依赖版本未及时同步导致 CI 失败（fast‑xml‑parser、Electron） | 影响 CI 通过率 | 🔲 PR #3036 / #3037（待合并） |

> **结论**：已解决 3 项关键 bug，剩余 2 项已提交 PR，预计 1–3 天内完成合并。  

---

## 6. 功能请求与路线图信号  
- **API Key 受保护传递**：Issue #3120 + PR #3122 → 已在 1.0.0‑rc 版集成。  
- **内嵌浏览器恢复**：PR #3128 → 计划在 1.0.0 正式版之前完成。  
- **视频/图像生成兼容性**：PR #3127、#3125 → 已恢复，后续将考虑统一接口。  
- **子代理会话支持**：PR #3123 → 未来迭代中进一步优化。  

> **路线图**：根据 PR 进度与社区反馈，预计 1.0.0 正式版将涵盖完整对话迁移、视觉历史、媒体生成、子代理与安全改进。  

---

## 7. 用户反馈摘要  
- **痛点**：  
  - API Key 明文暴露导致安全顾虑。  
  - 旧版皮肤/图像工具链失效导致工作流中断。  
  - 浏览器功能不可用导致外部链接获取困难。  
- **使用场景**：  
  - 内容创作者依赖图像/视频生成工具。  
  - 企业用户关注多显示器与 DPI 适配。  
  - 研发团队需要在 dsh 与 Cowork 之间无缝切换。  
- **满意度**：  
  - 维护团队响应迅速，PR 合并节奏快。  
  - 安全与兼容性改动得到积极评价。  

---

## 8. 待处理积压  
- **Issue #3120**（已启动修复） → PR #3122 正在审查，建议保持关注。  
- **PR #3036**（依赖更新） & **PR #3037**（Electron 升级） → 两个 PR 处于待合并状态，未影响主分支，但若延迟可能导致 CI 失败。  
- **长久未响应**：无明显长期未解决的 Issue；现有积压全部与安全/依赖更新相关，已在审查/合并流程中。  

---

### 小结  
本日 LobsterAI 继续保持高频提交与及时合并，核心功能与安全性改进同步推进。社区关注度主要集中在安全修复与浏览器功能恢复上，维护团队对这些热点已快速响应。整体项目健康度 **高**，并在向 1.0 正式版迈进的关键节点上取得实质性进展。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-11-21)

## 1. 今日速览
Moltis 项目在过去 24 小时内保持**低活跃度**状态，整体处于平稳维护期。过去一天内仅产生 1 条新 Issue 和 1 条 PR 状态更新，无新版本发布。社区关注点集中在工具链的语义准确性（exec 工具）以及 OpenAI Codex 集成中的推理参数支持。项目健康度良好，核心功能稳定，但近期缺乏重大功能迭代或版本发布的信号。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
今日无新合并的 PR，但有一条长期存在的 PR 被关闭，标志着相关功能分支的终结或合并完成：

*   **PR #1005: feat(openai-codex): add reasoning effort support** [CLOSED]
    *   **链接**: [moltis-org/moltis PR #1005](https://github.com/moltis-org/moltis/pull/1005)
    *   **作者**: PeterDaveHello
    *   **状态**: 已关闭 (Closed)
    *   **进展说明**: 该 PR 旨在为 OpenAI Codex 提供商实例添加 `reasoning_effort` 支持，并在 Responses API 请求中序列化配置的 GPT-5 Codex 推理力度。同时，它确保了在未显式设置 effort 时，现有的 `reasoning.encrypted_content` 仍被包含，以维持后续对话轮次的加密推理块传递。
    *   **分析**: 该 PR于 2026-05-16 创建，历时约 6 个月后于今日关闭。这表明项目对 Codex 集成的推理参数控制进行了完善或整合。关闭原因未在摘要中明确，但通常意味着代码已合并至主分支或被替代方案取代。此变更提升了 Moltis 对高级 LLM 推理控制能力的支持。

## 4. 社区热点
今日社区讨论热度较低，无高评论量或高反应量的 Issue/PR。唯一的新增 Issue 聚焦于一个具体的技术细节问题：

*   **Issue #1324: [Bug]: exec tool `command` parameter says "shell command" but paired-node exec doesn't use a shell** [OPEN]
    *   **链接**: [moltis-org/moltis Issue #1324](https://github.com/moltis-org/moltis/issues/1324)
    *   **作者**: swf1996120
    *   **热度**: 0 评论，0 👍
    *   **分析**: 用户指出 `exec` 工具的 `command` 参数在 Schema 中被描述为 "shell command"，但在 paired-node 模式下实际执行时并未使用 shell 环境。这可能导致依赖 shell 特性（如变量展开、管道重定向等）的命令在 paired-node 中行为不一致。虽然当前无人评论，但该问题涉及 API 契约与实际行为的偏差，可能影响依赖 shell 语义的用户脚本，需关注后续是否引发更多共鸣。

## 5. Bug 与稳定性
今日报告了 1 个 Bug，严重程度为**中等**（非崩溃，但涉及行为不一致）：

*   **Issue #1324: exec tool 参数描述与实际执行环境不符**
    *   **链接**: [moltis-org/moltis Issue #1324](https://github.com/moltis-org/moltis/issues/1324)
    *   **严重程度**: 中等 (Medium)
    *   **描述**: `exec` 工具的 `command` 参数描述为 "shell command"，但 paired-node 执行路径未使用 shell，导致可能无法正确解析 shell 特定语法。
    *   **Fix 状态**: **暂无关联的 Fix PR**。
    *   **建议**: 维护者需确认 paired-node 的设计意图。若本意图不支持 shell 特性，应更新工具描述以避免误导；若应支持 shell，则需修复执行逻辑。

## 6. 功能请求与路线图信号
*今日无明确的新功能请求 Issue。*

*   **潜在路线图信号**:
    *   **OpenAI Codex 推理参数精细化控制**: PR #1005 被关闭表明项目正在深化对 Codex 模型推理行为 (`reasoning_effort`) 的支持。这可能预示着未来版本中将提供更细粒度的 LLM 推理强度控制选项，以优化成本与性能平衡。
    *   **工具链语义一致性**: Issue #1324 暴露了工具描述与实际行为的不一致，可能促使维护者在下个版本中对所有内置工具进行全面的 Schema 与实现一致性审查。

## 7. 用户反馈摘要
*今日无 Issue 评论，无法直接提炼用户痛点。*

*   **间接信号**:
    *   用户 swf1996120 在 Issue #1324 中提交了详细的预检清单（Preflight Checklist），表明其遵循了项目的贡献指南，对现有 Issue 进行了搜索，并使用了最新版本。这反映了部分用户社区具备较高的技术素养和规范意识。
    *   该 Issue 本身未表达强烈不满，而是以提问和报告偏差的形式提出，建议维护者以澄清或修复的方式回应。

## 8. 待处理积压
*今日新 Issue #1324 为最新，无长期未响应的新增积压。但需注意历史积压风险：*

*   **PR #1005 长期悬而未决至今日关闭**: 该 PR 从 2026-05-16 创建到 2026-11-20 关闭，历时近 6 个月。虽然已关闭，但如此长的处理周期可能暗示项目在大型功能 PR 的审查或合并流程上存在瓶颈。建议维护者关注其他长期开放 (>3个月) 的 PR，以避免类似延迟影响项目迭代速度。
*   **通用提醒**: 鉴于今日活跃度低，建议维护者定期审查超过 30 天无活动的 Issue，特别是标记为 `[Bug]` 或 `[Critical]` 的条目，以维持项目响应性。

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

# ZeroClaw 开源项目动态日报 (2026-11-21)

---

### 1. 今日速览

ZeroClaw 社区今日整体活跃度处于**高位运行状态**。过去 24 小时内共有 12 条 Issue 更新（全为活跃/新建），50 条 Pull Request 产生变动（49 条待合并，1 条已完成/关闭）。

今日核心工作集中在**企业级身份与鉴权（OIDC/RFC-12422）架构演进**、**本地 LLM 响应缓存清理**以及**高危漏洞快速响应（WASI 沙箱逃逸修复）**上。同时，针对 Agent 在中途中断导致上下文丢失（S1 级 Bug）以及 Telegram 语音转写阻塞消息队列的问题，社区展开了集中排查。

---

### 2. 项目进展

今日虽然仅正式合并/关闭 1 条 PR，但大量关键架构分支取得了突破性进展：

*   **安全漏洞紧急应对**：PR [#12610](https://github.com/zeroclaw-labs/zeroclaw/pull/12610) 快速升级 `wasmtime-wasi` 至 48.0.10，修复了高危漏洞 RUSTSEC-2026-0587（Windows 平台下的 WASI 文件系统沙箱逃逸）。
*   **内存/缓存架构瘦身**：提交 PR [#12612](https://github.com/zeroclaw-labs/zeroclaw/pull/12612) 正式废弃命中率极低的本地 LLM 响应缓存 (`response_cache.db`)，拟移除 4 个关联配置项，简化代码路径。
*   **企业级 OIDC/OAuth2 体系推进**：tidux 连续推行一系列架构 PR（[#12496](https://github.com/zeroclaw-labs/zeroclaw/pull/12496), [#12497](https://github.com/zeroclaw-labs/zeroclaw/pull/12497), [#12498](https://github.com/zeroclaw-labs/zeroclaw/pull/12498), [#12608](https://github.com/zeroclaw-labs/zeroclaw/pull/12608), [#12609](https://github.com/zeroclaw-labs/zeroclaw/pull/12609)），实现了 Okta 和 Entra ID 的兼容性，允许配置独立 Scope，并提出 ADR-016/017 例外规则以支持 Daemon 持有的 OIDC 刷新凭证。
*   **MCP 工具交互修复**：针对 FastMCP 工具返回字符串导致模型接收到重复内容的缺陷，提交了 PR [#12605](https://github.com/zeroclaw-labs/zeroclaw/pull/12605)。

---

### 3. 社区热点

今日讨论度与关注度最高的设计与缺陷主要围绕**上下文状态保留**与**凭证安全隔离**：

*   **Issue [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) - 中途停止 Agent 抹除工具调用与思考上下文** (6 评论)
    *   **分析**：用户在 Web UI 中中断正处于思考或工具调用阶段的 Agent 时，系统未保留已发生的中间 Step，导致下一轮对话时 Agent 失去上下文记忆，仿佛前一步未发生过。涉及运行阶段与守护进程的状态持久化逻辑，风险级别较高（High Risk, P1）。
*   **RFC Issue [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) - 操作员管理的服务凭证安全隔离** (5 评论)
    *   **分析**：提出了新的安全模型，要求允许 Agent 在不向模型、Prompt、Skill 文本暴露底层敏感 Credentials 的前提下执行三方服务授权。与之对应的实现

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*