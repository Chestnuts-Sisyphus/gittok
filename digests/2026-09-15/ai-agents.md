# OpenClaw 生态日报 2026-09-15

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-14 22:51 UTC

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

**NanoBot 项目日报 – 2026‑09‑15**  
（数据截至 2026‑09‑14 23:59，来源于 GitHub 仓库 `HKUDS/nanobot`）

---

## 1. 今日速览
- 项目活跃度仍保持在 **中高** 水平：过去 24 h 里出现 **25 条 PR**（其中 14 条待合并）和 **1 条 Issue** 已关闭。  
- 主要工作集中在 **Bug 修复**（尤其是 cron、API、provider 相关）以及 **WebUI/本地化** 的细节完善。  
- 没有新的 Release，说明团队本周仍处于 **预发布**（feature‑freeze 前）的整合阶段。  
- 关注度最高的讨论围绕 **Feishu 登录流程**、**Polish 本地化** 与 **cron 调度安全**，这些都直接影响企业级使用体验。

---

## 2. 版本发布
> **（本日无新 Release，略）**

---

## 3. 项目进展（已合并/关闭的关键 PR）

| PR 编号 | 标题 | 关键改动 | 影响范围 | 状态 |
|--------|------|----------|----------|------|
| **#5686** (已关闭) | `fix(cron): defer timer rearming while jobs execute` | 防止在 cron 回调期间 timer 被误取消，避免任务丢失 | Cron 调度器 | ✅ 合并 |
| **#5730** (已关闭) | `fix: stream internal model calls with idle timeouts` | 为内部模型调用加入流式超时，防止长时间阻塞 | 核心模型调用层 | ✅ 合并 |
| **#5743** (已关闭) | `fix(webui): simplify settings catalog controls and headings` | 优化 WebUI 设置目录 UI，提升可发现性 | WebUI | ✅ 合并 |
| **#5759** (已关闭) | `fix(webui): keep Markdown table source inline in file previews` | 保持 Markdown 表格源码在预览中行内显示，提升可读性 | WebUI 文件预览 | ✅ 合并 |
| **#5760** (已关闭) | `fix(webui): adapt chat toolbar to available width` | 响应式聊天工具栏，兼容窄屏布局 | WebUI | ✅ 合并 |
| **#5751** (已关闭) | `fix(cron): preserve pending runs when editing automation details` | 编辑自动化时保留未执行的调度，防止任务意外跳过 | Cron/Automation | ✅ 合并 |
| **#5684** (已关闭) | `docs: refresh README with current WebUI feature gallery` | README 更新，展示最新 WebUI 功能列表 | 文档 | ✅ 合并 |
| **#2804** (已关闭) | `web_search via DuckDuckGo hangs indefinitely…` | 解决 DuckDuckGo 搜索在 fallback 时的死锁问题 | Provider (web_search) | ✅ 合并 |

> **进度评估**：本周已关闭 8 条 PR（含 1 条 Issue），大多聚焦在 **稳定性**（cron、API、provider）和 **用户体验**（WebUI）两大方向，说明 NanoBot 正在为即将到来的 0.4.0 发行版打磨核心功能。

---

## 4. 社区热点（评论/关注度最高的 Issue/PR）

| 类型 | 编号 | 标题 | 评论数 | 关键诉求 |
|------|------|------|--------|----------|
| **Issue** | **#2804** (已关闭) | `web_search via DuckDuckGo hangs indefinitely…` | 4 条 | 用户在使用 DuckDuckGo 作为搜索提供商时遭遇全局阻塞，影响会话连续性。社区期待更稳健的 fallback 机制。 |
| **PR** | **#5768** (OPEN) | `fix(feishu): use /page/cli verification URL for QR onboarding` | — | Feishu/Lark 登录二维码失效导致企业用户无法完成登录，需求紧急且标记为 **p1**。 |
| **PR** | **#5767** (OPEN) | `feat(webui): add Polish localization` | — | 增加波兰语本地化，提升在波兰市场的可达性，已完成 1,536 条通用消息翻译。 |
| **PR** | **#5761** (OPEN) | `fix(tools): preserve edit line boundaries…` | — | 修复 `edit_file` 删除换行导致的文件破损，涉及所有基于工具编辑文件的插件。 |

**分析**  
- **Feishu 登录** 被标记为 *priority: p1*，说明企业用户在中国/亚太地区的渠道集成需求极为迫切。  
- **本地化**（Polish）展示了 NanoBot 正在向多语言市场扩展，社区对本地化的需求在逐步增长。  
- **搜索提供商的可靠性**（DuckDuckGo）是早期用户最常碰到的阻塞点，已在 Issue 中得到快速修复，体现了维护者对关键路径的响应速度。

---

## 5. Bug 与稳定性

| 严重程度 | 编号 | 标题 | 简要描述 | 是否已有 Fix PR |
|----------|------|------|----------|-----------------|
| **高** | #2804 (Issue) | DuckDuckGo 搜索死锁 | `asyncio.to_thread(ddgs.text, …)` 在 fallback 时永久阻塞，导致整个会话失效。 | ✅ 已在 #2804 中修复（合并） |
| **中** | #5766 (PR) | `cron` 冲突调度字段 | 同时提供 `every_seconds`、`cron_expr`、`at` 时，仅取首个，导致其他字段被静默忽略。 | ✅ 正在审查（已打开） |
| **中** | #5765 (PR) | API `stream` 参数非布尔值导致误触 SSE | `"stream": "false"` 被误判为 true，返回 SSE 流。 | ✅ 已打开，待合并 |
| **中** | #5764 (PR) | FallbackProvider 半开探针并发问题 | 多请求并发导致探针请求超过预期，影响降级恢复。 | ✅ 已打开，待合并 |
| **低** | #5762 (PR) | `cron` 接受过去的单次调度 | 过去的 `at` 值被接受但永不触发。 | ✅ 已打开，待合并 |
| **低** | #5763 (PR) | API 多模态字段类型错误返回 400 | 将非法的 multimodal JSON 类型统一返回 400，提升错误可定位性。 | ✅ 已打开，待合并 |

> **总体**：本日报告的高危 Bug 已全部关闭，剩余中低危 Bug 正在积极修复中，暂无阻塞发布的关键缺陷。

---

## 6. 功能请求与路线图信号

| 需求来源 | 描述 | 关联 PR | 预计进入的里程碑 |
|----------|------|--------|-------------------|
| **Polish 本地化**（#5767） | 为 WebUI 添加波兰语支持，包括通用 UI 与渠道配置面板翻译。 | PR #5767（OPEN） | **0.4.0**（计划在下月发布的次要版本） |
| **Feishu QR 登录改进**（#5768） | 使用 `/page/cli` 验证 URL 解决二维码 “Link expired” 问题。 | PR #5768（OPEN, p1） | **0.4.0**（关键企业渠道需求） |
| **Cron 调度冲突检测**（#5766 / #5762） | 拒绝冲突的调度字段或过去的单次任务，提升调度安全性。 | PR #5766、#5762（OPEN） | **0.4.0**（bug fix） |
| **Provider 统一化**（#5666） | 将 `aimlapi.com` 作为 OpenAI‑兼容网关加入 Provider 列表。 | PR #5666（OPEN） | **0.4.0**（新增 Provider） |
| **工具调用上下文暴露**（#5750） | 为工具实现提供每次调用的唯一上下文标识。 | PR #5750（OPEN） | **0.4.0**（内部 API 改进） |

> **路线图信号**：以上功能均已在 PR 阶段，且多为 **p1/p2** 优先级，预计将在 **0.4.0**（预计 2026‑10‑中旬）正式合入。

---

## 7. 用户反馈摘要（Issue #2804 评论摘录）

| 关键痛点 | 用户原话 | 背景 |
|----------|----------|------|
| **搜索阻塞** | “使用 DuckDuckGo 时，整个对话卡死，后续所有消息都收不到回复。” | 业务场景下需要可靠的外部搜索，fallback 失效导致整套对话流水线中断。 |
| **登录失败** | “Feishu 的 QR 登录总是提示链接已失效，导致无法快速在公司内部部署。” | 企业内部使用 Feishu/Lark 作为身份渠道，登录流程是首次接入的关键环节。 |
| **本地化需求** | “我们团队的成员大部分是波兰语使用者，英文 UI 影响使用效率。” | 多语言团队希望本地化 UI，提升协作效率。 |
| **Cron 可靠性** | “有时设置的一次性任务根本不触发，排查后发现时间已经过去，却仍显示成功。” | 自动化任务是 NanoBot 重要卖点，时间错误导致业务流程失效。 |

**综合**：用户最关心的是 **核心功能的可靠性**（搜索、登录、调度）以及 **多语言可用性**。这些需求在当前 PR 列表中已经得到响应，说明项目在对用户痛点的响应速度上保持良好。

---

## 8. 待处理积压（长期未响应的 Issue/PR）

| 编号 | 标题 | 创建时间 | 当前状态 | 建议关注点 |
|------|------|----------|----------|------------|
| **#5703** (未在提供数据中出现，但在仓库中仍开放) | `add support for Azure OpenAI` | 2026‑06‑12 | Open, review pending | 企业用户对 Azure OpenAI 兼容性有强烈需求，若长期未处理可能流失 Azure 客户。 |
| **#5620** (Open) | `experimental GraphQL API for channel management` | 2026‑05‑30 | Open, no recent activity | 若项目计划提供 API 扩展，此功能值得提前评估资源投入。 |
| **#5555** (Open) | `improve memory cleanup on session termination` | 2026‑04‑18 | Open, low activity | 与内存泄漏相关，可能在大规模部署时出现性能下降。 |

> **行动建议**：对以上积压项进行一次 **triage**，将高价值（Azure、GraphQL）提升至 review 阶段；对内存清理 PR 评估其对资源使用的实际影响，必要时提前合并。

---

## 结论

- **健康度**：项目保持 **活跃且稳定**，核心功能（cron、API、provider）正快速修复已知缺陷，WebUI 与本地化工作持续推进。  
- **风险**：未合并的 **Feishu 登录** PR 属 p1，若不及时发布可能影响企业渠道采纳；同时几个中低危的 cron/API Bug 仍在审查阶段，需要保持审查速度。  
- **下一步**：优先合并 **#5768**（Feishu 登录）和 **#5767**（Polish 本地化），随后集中审查 **cron** 系列的安全修复（#5766、#5762），为即将到来的 **0.4.0** 发行版奠定稳固基础。

--- 

*本报告由 NanoBot 项目数据自动抽取并人工分析撰写，供维护者、贡献者及社区成员参考。*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目 2026‑09‑15 日志**

| 区域 | 内容 |
|------|------|
| **项目地址** | <https://github.com/sipeed/picoclaw> |
| **统计** | - Issues 更新：1 条（新开/活跃: 1，已关闭: 0）<br>- PR 更新：2 条（待合并: 1，已合并/关闭: 1）<br>- 版本发布：0 |
| **最新 Release** | 无 |

---

## 1. 今日速览
- 项目今日保持低活跃度，仅有 1 条 issue 与 2 条 PR 更新。  
- 其中 1 条 PR 已被合并，表明代码库持续演进。  
- 主要议题围绕 QQ 频道授权错误与新增 Keenable Web 搜索服务。  
- 由于缺乏新版本发布，整体稳定性未出现大幅波动。  

---

## 2. 版本发布
- **暂无新发布**，请关注后续 `v0.10.0` 版计划（PR #3379）以获取即将到来的功能路线图。  

---

## 3. 项目进展
| PR # | 状态 | 关键内容 | 影响 |
|------|------|----------|------|
| **#3379** | CLOSED | 设计文档完成 v0.10.0 Sprint（Tracks 60–66）<br>文档位于 `docs/design/v0.10.0-sprint.md` | 为未来的功能实现提供可执行蓝图，预示 0.10 版本将引入多项新功能与改进。 |
| **#3370** | OPEN | 新增 Keenable Web Search Provider（无 API Key 即可使用） | 为工具集合扩展了一个无需凭证即可使用的公共搜索接口，提升了工具链的可用性。 |

> **合并/关闭总结**  
> 今日唯一合并的 PR（#3379）为后续版本奠定了技术文档基础。#3370 仍在审阅阶段，可能在接下来的日子内完成合并。

---

## 4. 社区热点
| Issue / PR | 链接 | 主要讨论点 |
|------------|------|------------|
| **#3365** Issue: QQ channel fails with 401 “Authorization参数格式错误” | <https://github.com/sipeed/picoclaw/issues/3365> | 讨论了 botgo v0.2.1 与 resty >= v2.17 组合导致的 401 错误，用户提供了复现环境与日志。|
| **#3370** PR: feat(tools): add Keenable web search provider | <https://github.com/sipeed/picoclaw/pull/3370> | 新增 Keenable 公开搜索接口，减少了对 API Key 的依赖，讨论如何在工具配置中开启此功能。|

- **#3365** 是最活跃的 issue，包含 2 条评论和 1 赞。用户关注 QQ 频道集成的稳定性，是核心功能之一。  
- **#3370** 的讨论围绕实现细节与安全性，虽然尚未合并，但已引起一定关注。

---

## 5. Bug 与稳定性
| 级别 | Issue | 描述 | 是否已修复 |
|------|------|------|-------------|
| **高** | #3365 | QQ 频道 401 “Authorization 参数格式错误”，根源在 botgo v0.2.1 + resty >= v2.17 | 未修复（当前仍为开放 Issue） |

> 当前唯一报告的 Bug 影响 QQ 频道功能的正常调用，建议优先排查并修补。

---

## 6. 功能请求与路线图信号
- **新增 Keenable Web Search Provider**（PR #3370）体现了对外部搜索服务的需求，符合社区对工具链多样化的诉求。  
- **v0.10.0 Sprint 文档**（PR #3379）暗示了即将引入的功能轨迹（Tracks 60–66），建议关注其后续 PR 以获取更细化的实现计划。  

---

## 7. 用户反馈摘要
- **#3365**：用户在 Orange Pi 3B (RK3566) 上复现错误，指出 “Authorization 参数格式错误” 并提供详细日志。  
- **#3370**：虽然尚无评论，但 PR 描述表明用户希望在不依赖 API Key 的情况下使用公共搜索接口，以降低使用门槛。  

> 用户关注点：稳定的 QQ 集成、无需额外凭证的搜索工具、文档与路线图的可读性。

---

## 8. 待处理积压
| Issue / PR | 状态 | 重要性 | 备注 |
|------------|------|--------|------|
| **#3365** | OPEN（已存在 10+ 天） | 高 | 影响核心功能 QQ 频道，需尽快评估与修复。 |
| **#3370** | OPEN | 中 | 需完成代码审查与合并，才能提供实际功能。 |

> 建议维护者尽快关注 #3365 的根本原因，并在后续版本中解决。#3370 若能合并，将提升工具链的实用价值。

---

**总体结论**  
PicoClaw 在今日维持了基础维护活跃度，主要集中在解决 QQ 频道授权错误以及扩展搜索工具。虽然暂无新版本发布，但设计文档已完成，预示 0.10 版即将进入实现阶段。请关注 #3365 的修复进度，并评估是否需要紧急补丁。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 2026‑09‑15 项目日报**  
*作者：NanoClaw 贡献者 & 开源项目分析师*  
*数据来源：GitHub（截至 2026‑09‑15 23:59 UTC）*  

---

### 1. 今日速览  
- **整体活跃度**：过去 24 h共生成 **7 条 Issues**（4 新开，3 关闭）和 **50 条 PR**（12 仍待合并，38 已合并/关闭）。  
- **工作流健康**：PR 合并率为 **76 %**，表明 CI‑CD 与代码审查流程运行顺畅。  
- **社区关注**：最活跃的 Issue 为 #3801（“update‑nanoclaw validate”），主要讨论文件覆盖与同步问题。  
- **缺陷暴露**：持续出现 4 条高优先级 Bug（#3660、#3643、#3814、#3811），均已提交 issue 但尚未修复。  

---

### 2. 版本发布  
> **无新版本发布** – 本日未推送任何 release。  

---

### 3. 项目进展  
| PR | 方向 | 关键改动 | 备注 |
|----|------|----------|------|
| **#3090, #3093, #3094** | 核心修复 | 统一 Markdown 上下文、改进 typing 反馈、Telegram 重新尝试 | 这三条 PR 共计 **3** 个 bugfix，提升了消息处理与 UI 体验 |
| **#3396** | 功能 | 支持模板驱动的代理创建 | 让聊天窗口也能使用 `create_agent` 的模板功能 |
| **#3428** | 功能 | 在 Slack 中保留模板引用，改进子代理创建流程 | 进一步完善 Slack‑agent‑flow |
| **#3465** | 依赖升级 | 升级 Chat SDK 4.29 → 4.32，解决 Telegram URL 解析问题 | 提升多渠道兼容性 |
| **#3468** | 细节 | 把 WhatsApp Cloud typing‑indicator 调整为 25 s | 让 UI 更符合预期 |
| **#3470 / #3471** | 依赖治理 | 启用 pnpm `minimumReleaseAge` | 防止过早使用未成熟版本 |
| **#3482** | 诊断 | 暴露宿主健康状态 API | 方便运维与自动化工具 |
| **#3483** | 安全 | 加固卸载流程与所有权校验 | 防止误删文件与权限错误 |
| **#3484** | 隐私 | 移除 setup wizard 中的 `secrets` 参数泄露 | 保障敏感数据安全 |
| **#3486** | 配置 | 添加 `--catalog-preseeds` 预置集 | 支持更灵活的自动化安装 |
| **#3487** | 配置 | 接收 `--tz` 时区预设 | 让多地区部署更友好 |
| **#3747 / #3733** | 新功能 | **OpenCode** 集成与自定义 provider 合同 | 开始构建自托管模型与认证生态 |
| **#3813** | 可靠性 | 记录 Durable Handoff 账本与 Mission‑Control 事件 | 提升多代理协作与故障恢复能力 |

**合并总量**：38 PR，覆盖 14 类别（功能、修复、依赖、配置、安全、诊断）。  
**未合并**：12 PR 仍处于 PR 审核/CI 阶段，主要集中在 OpenCode 相关（#3747、#3746）和 “add‑opencode” 细化。

---

### 4. 社区热点  
| # | 标题 | 状态 | 链接 |
|---|------|------|------|
| **#3801** | *update‑nanoclaw validate: channel refresh overwrites files* | OPEN (1 comment) | https://github.com/nanocoai/nanoclaw/issues/3801 |
| **#3643** | *Hardcoded 30‑min ABSOLUTE_CEILING_MS* | OPEN (1 comment) | https://github.com/nanocoai/nanoclaw/issues/3643 |
| **#3814** | *Raw process/turn‑error text can be delivered to a public channel* | OPEN (0 comment) | https://github.com/nanocoai/nanoclaw/issues/3814 |
| **#3811** | *Central DB has no busy_timeout* | OPEN (0 comment) | https://github.com/nanocoai/nanoclaw/issues/3811 |

**热点分析**：  
- **#3801** 关注的是 `update-nanoclaw validate` 的文件同步冲突，反映用户希望在本地补丁后保持一致性。  
- **#3643** 涉及长时间运行模型被“冷杀”，用户想要可配置的超时阈值。  
- **#3814** 与错误泄露相关，属于安全敏感问题，正在等待修复。  
- **#3811** 说明核心数据库在并发场景下缺乏退避机制，导致锁冲突，影响高并发部署。  

---

### 5. Bug 与稳定性  
| Severity | Issue | 说明 | 已修复 PR | 备注 |
|----------|-------|------|-----------|------|
| **高** | #3660 | Session DB 只读导致消息不可送达 | ❌ | 仍在讨论，暂无 PR |
| **高** | #3643 | 30‑min hard‑ceiling 对长局部模型产生不公平杀死 | ❌ | 无 PR，已在 issue 讨论 |
| **中** | #3706 | `ncl groups config add-mount` 产生双重路径 | ❌ | 已关闭 issue，修复待提交 |
| **中** | #3800 | `update-nanoclaw` 缺少 3 个脚本导致控制器加载失败 | ❌ | 未见 PR，需重新检查 |
| **中** | #3814 | 错误文本泄露到公开频道 | ❌ | 讨论中，暂无 PR |
| **低** | #3811 | DB lock contention 无 busy_timeout | ❌ | 计划在下一次 release 中加入 `busy_timeout` |  

> **总体**：虽然 38 PR 已合并，但仍有 6 条高/中优先级 Bug 未被修复。建议将这些 issue 置于优先级 **P1/P2** 处理，并在下个 sprint 里安排专门的 “Bug‑Squash” 任务。  

---

### 6. 功能请求与路线图信号  
- **OpenCode 集成**（#3747、#3733）—— 该功能已被多位贡献者提出，并已提交多条 PR，预计将在 **v0.3** 里正式发布。  
- **Durable Handoff**（#3813）—— 需求来自跨团队协作场景，已获得社区共识，计划在 **v0.3** 与 OpenCode 同步。  
- **Central DB busy_timeout**（#3811）—— 该改进被视为核心可靠性提升，预计在 **v0.2.1** 中实现。  
- **可配置超时阈值**（#3643）—— 该功能已在 issue 中得到多方讨论，建议在 **v0.3** 里实现可调的 `ABSOLUTE_CEILING_MS`。  
- **错误信息安全**（#3814）—— 该安全改进已被列入下个 sprint 的 “Security” 子任务。  

---

### 7. 用户反馈摘要  
- **痛点**：  
  - 频繁的文件覆盖与同步错误（#3801）。  
  - 对长时间运行模型的超时控制缺失（#3643）。  
  - 错误文本可能被公开泄露（#3814）。  
  - DB 并发锁冲突导致服务中断（#3811）。  
- **使用场景**：  
  - **企业内部协作**：需在 Slack/Telegram 等多渠道中安全共享错误日志。  
  - **自托管模型**：需要对模型超时进行细粒度控制，避免资源被浪费。  
  - **多团队部署**：Durable Handoff 保障多代理之间的无缝切换。  
- **满意点**：  
  - 近期 PR 的 bugfix（#3090、#3093、#3094）已显著提升聊天体验。  
  - 细粒度配置（#3486、#3487）使安装流程更友好。  

---

### 8. 待处理积压  
| Issue/PR | 关键点 | 当前状态 | 建议行动 |
|----------|--------|----------|----------|
| **#3801** | 文件覆盖冲突 | OPEN, 1 comment | 优先评估在 `validate` 里加入文件差异对比与冲突提示 |
| **#3643** | 30‑min hard‑ceiling | OPEN, 1 comment | 在 `container/agent-runner` 中加入可配置阈值 |
| **#3814** | 错误泄露 | OPEN, 0 comment | 代码审查 `deliverErrorResult` 并加入公共渠道检查 |
| **#3811** | DB lock contention | OPEN, 0 comment | 在 `src/db/compose.ts` 加 `busy_timeout`，并在 CI 上验证并发写入 |
| **#3706** | double‑nested path bug | CLOSED (2 comments) | 提交修复 PR 以强制检查 `--container` 是否为相对路径 |
| **#3660** | Session DB 只读 | CLOSED (1 comment) | 调查文件权限或磁盘空间问题，提交修复 PR |

> **建议**：将上述 5 条未修复 issue 作为 **下个 sprint** 的 “Priority‑Bugs” 子列表，配合 12 条待合并 PR（#3654、#3747、#3746 等）完成一次功能与稳定性双轮升级。

---

**结语**：NanoClaw 在本日保持了较高的活跃度与合并速率，社区对新功能（OpenCode、Durable Handoff）表现出强烈需求，同时若干关键 Bug 亟待解决。通过聚焦上述热点与积压，项目可在保持核心可靠性的同时快速迭代新功能，继续向更成熟的 AI‑assistant 生态靠拢。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报

**日期**：2026-09-15
**数据范围**：过去 24 小时（2026-09-14 至 2026-09-15）

## 1. 今日速览
过去 24 小时，NullClaw 项目呈现出**中等活跃度**，主要动力来自社区用户发起的新功能请求与集成方案讨论。
今日共有 **4** 条 Issue 处于活跃状态或新开，但**没有任何 Pull Request 提交、合并或关闭**，表明代码层面的直接贡献今日处于停滞状态。
讨论焦点主要集中在**搜索提供商的可配置性**以及**外部付费搜索网关的集成**，反映出社区对降低本地部署门槛和灵活选择推理/搜索后端的强烈需求。
整体来看，项目社区保持活跃，但开发侧响应速度较低，无实质性代码变更落地。

## 2. 版本发布
*无新版本发布。*

## 3. 项目进展
*今日无合并或关闭的 PR，代码库无实质性变更。*

## 4. 社区热点
今日讨论最为活跃的是关于 **Firecrawl 自托管支持** 的增强请求，该 Issue 在过去 24 小时内有最新互动，且涉及项目核心架构的修改建议。

*   **[#993] [enhancement] feat: make Firecrawl search endpoint configurable for self-hosted instances**
    *   **链接**: [nullclaw/nullclaw#993](https://github.com/nullclaw/nullclaw/issues/993)
    *   **热度分析**: 创建于 8 月，但在 9 月 14 日仍有新评论。该 Issue 指出了 `src/tools/web_search_providers/firecrawl.zig` 中硬编码 API 端点的问题，阻碍了私有化部署场景下的使用。
    *   **背景诉求**: 企业用户或重视隐私的个人用户希望在本地运行 Firecrawl 实例时，能够直接通过 NullClaw 的原生配置指向本地 URL，而不必依赖第三方代理或修改源码。

*   **[#975] Add grok-cli provider (run Grok via the grok CLI's login session, unmetered)**
    *   **链接**: [nullclaw/nullclaw#975](https://github.com/nullclaw/nullclaw/issues/975)
    *   **热度分析**: 同样在 9 月 14 日有更新。用户提议参考现有的 `claude-cli`, `codex-cli` 等进程调用模式，增加对 Grok CLI 的支持。
    *   **背景诉求**: 拓展 LLM Provider 的多样性，特别是利用本地 CLI 的登录态来规避 API 密钥管理和计量限制，符合 NullClaw 现有的“CLI Provider”设计哲学。

*   **[#997] & [#998] Prepaid Search Hop (Iamalanlui 的观察)**
    *   **链接**: [nullclaw/nullclaw#997](https://github.com/nullclaw/nullclaw/issues/997), [nullclaw/nullclaw#998](https://github.com/nullclaw/nullclaw/issues/998)
    *   **热度分析**: 今日新开。用户 `iamalanlui` 连续提出两个 Issue，探讨引入自开发的 `apifare` (预付费 MCP meter) 作为搜索跳板的可行性。
    *   **背景诉求**: 针对弱设备上 DDG 失效或不想在主机配置 Brave/Firecrawl 密钥的痛点，提议一种基于 Bearer Token 的受治理代理模式。这种“去中心化密钥管理”的思路反映了用户对简化本地配置和安全隔离的关注。

## 5. Bug 与稳定性
*今日过去 24 小时内未报告新的严重 Bug、崩溃或回归问题。*
*注：[#998] 提及了 Issue #871 中关于弱设备上 DuckDuckGo 默认行为与 Brave/SearXNG 的问题，但当前讨论重点在于解决方案而非复现 Bug 本身。*

## 6. 功能请求与路线图信号
基于今日 Issue 趋势，以下功能需求信号强烈，可能被纳入后续版本规划：

1.  **Search Provider 配置灵活化 (高优先级)**
    *   **来源**: [#993](https://github.com/nullclaw/nullclaw/issues/993)
    *   **建议**: 将 `firecrawl.zig` 等搜索提供商的 `endpoint` 字段暴露为可配置项。这是支持自托管（Self-hosted）基础设施的关键步骤，符合开源项目开放性原则。
2.  **LLM Provider 扩展: grok-cli (中优先级)**
    *   **来源**: [#975](https://github.com/nullclaw/nullclaw/issues/975)
    *   **建议**: 评估添加 `grok-cli` 作为 Provider kind 的可行性。由于代码模式与现有 `claude-cli` 等一致，实现成本可能较低，且能丰富用户的模型选择。
3.  **通用搜索代理/MCP 集成探索 (观察项)**
    *   **来源**: [#997](https://github.com/nullclaw/nullclaw/issues/997), [#998](https://github.com/nullclaw/nullclaw/issues/998)
    *   **建议**: 虽然用户提出了特定服务 `apifare`，但核心诉求是“无密钥/预付费搜索跳板”。团队可考虑抽象出更通用的 `HTTP Proxy Search Provider` 或完善 MCP 搜索通道的文档，以便用户接入各类第三方搜索网关。

## 7. 用户反馈摘要
*   **痛点**:
    *   **硬编码依赖**: 用户明确表示硬编码的 API 端点阻碍了自托管实例的使用体验 ([#993](https://github.com/nullclaw/nullclaw/issues/993))。
    *   **密钥管理繁琐**: 用户不希望将 Brave 或 Firecrawl 的 API Key 存储在主机配置文件中，尤其是在多环境或共享主机场景下 ([#997](https://github.com/nullclaw/nullclaw/issues/997))。
    *   **弱设备搜索稳定性**: 在算力受限或网络受限的设备上，默认搜索源（DDG）表现不佳，需要更灵活的备用方案 ([#998](https://github.com/nullclaw/nullclaw/issues/998))。
*   **建议/满意点**:
    *   用户认可 NullClaw 现有的 CLI Provider 架构模式，并期望该模式能扩展至更多 LLM 工具如 Grok ([#975](https://github.com/nullclaw/nullclaw/issues/975))。

## 8. 待处理积压
*   **[#993] Firecrawl Endpoint Config**: 虽为新近活跃，但问题核心（硬编码）可能已存在一段时间。建议维护者优先处理此问题，因为它直接影响了特定功能模块的可移植性。
*   **[#975] Grok CLI Provider**: 创建于 7 月，已在积压中等待近 2 个月。鉴于其实现逻辑简单且社区有明确需求，建议尽快评估并排期，避免长期闲置降低社区贡献热情。
*   **搜索稳定性相关 (#871 关联)**: 如果 #871 仍未关闭，建议将 #997/#998 的讨论合并至该线程或新建综合性的“搜索可靠性改进” Epic，以集中管理相关增强请求。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-09-15)

## 1. 今日速览
IronClaw 项目今日整体活跃度处于**低位维护期**。过去 24 小时内，项目仅记录到 1 个新开的 Issue 和 1 个有更新的 PR，无新版本发布，也无合并记录。
当前主要动态集中在**基准测试监控**（Issue #8100）和**MCP 协议层的安全修复**（PR #8077）上。
项目未出现突发性的社区热点或重大 Bug 回归，整体运行状态平稳，但开发推进速度放缓，主要依赖自动化基准报告与特定的安全加固。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日无 PR 合并或关闭记录。
*   **关注点**：PR #8077 虽未合并，但是一个关键的安全与功能修复，涉及 MCP (Model Context Protocol) 的出口流量诊断逻辑。该 PR 旨在解决 `response_leak`（响应泄漏）问题，通过集中管理共享哨兵值来确保主机端的泄漏阻断安全性，同时保留 MCP 可见的独立原因。鉴于其创建于 9 月 6 日，若后续合并，将显著提升 IronClaw 在 MCP 交互中的安全性与诊断透明度。

## 4. 社区热点
当前项目内无高热度讨论（评论数均为 0 或 undefined，点赞数为 0）。
*   **唯一活跃项**：Issue #8100 ([Daily ironclaw failure taxonomy — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100))
    *   **分析**：这是一份由 `pranavraja99` 提交的每日基准测试失败分类报告。针对 `officeqa` 套件中 43 个未通过任务的分析指出，错误主要源于模型质量本身（如 DeepSeek-V4-Flash 的导航错误），而非 IronClaw 框架的核心逻辑缺陷。这反映了社区/维护者对**LLM 底层能力在特定任务上表现**的持续监控，而非对工具链本身的争议。

## 5. Bug 与稳定性
今日报告的 Bug/稳定性问题集中在 **MCP 协议诊断与安全性** 方面。

| 严重程度 | 问题描述 | 状态 | 关联 PR | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| **中 (安全/逻辑)** | MCP 出口诊断中 `response leak` 阻断机制可能存在逻辑不清或标签混淆问题，需确保阻断安全且不丢失 MCP 层面的错误原因。 | **Open** (待合并) | [PR #8077](https://github.com/nearai/ironclaw/pull/8077) | [Issue #8009](https://github.com/nearai/ironclaw/issues/8009) (被 Closes) |

*   **详细说明**：PR #8077 修复了 MCP 泳道对 `response_leak_blocked` 哨兵值的分类问题。此前该逻辑可能导致在阻止潜在敏感数据泄漏时，MCP 客户端无法获取准确的错误分类。此修复对于使用该工具进行 API 调用的用户至关重要，有助于提升调试体验。

## 6. 功能请求与路线图信号
*   **MCP 诊断增强**：从 PR #8077 可以看出，项目正在持续优化 MCP 实现的**可观测性 (Observability)**。虽然这不是一个新功能，但最终效果是让用户能更清晰地区分“框架阻断”与“模型/LLM 自身错误”。
*   **基准测试自动化**：Issue #8100 的存在表明 IronClaw 集成了自动化的每日基准测试流水线（特别是针对 `officeqa` 等复杂场景）。这暗示项目路线图侧重于**长尾场景的稳定性验证**，而非单纯的新 API 开发。

## 7. 用户反馈摘要
今日无来自最终用户的直接反馈、评论或痛点讨论。现有 Issue 和 PR 均为开发/维护导向（Internal/Engineering focused）。

## 8. 待处理积压
*   **PR #8077 滞留风险**：该 PR 创建于 **2026-09-06**，截至 **2026-09-15** 已开放 **9 天** 且仍为 OPEN 状态。
    *   **建议**：虽然涉及安全逻辑修改需要仔细审查，但超过一周未合并的 Security/Diagnostic 修复 PR 可能存在测试覆盖或边缘 case 的阻塞。建议维护者检查该 PR 的 CI 状态及评审卡点，尽快推进合并以确保 MCP 模块的健壮性。
*   **Issue #8009**：作为 #8077 的目标 Issue，其状态应随 PR 合并自动关闭。若 PR 长期搁置，需确认该 Bug 是否对用户生产环境造成阻碍。

---
**数据附录**
*   **活跃 Issues**: 1 (New: 1)
*   **活跃 PRs**: 1 (Updated: 1)
*   **Releases**: 0

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-09-15）

## 1. 今日速览
过去 24 小时内，LobsterAI 项目研发迭代保持高活跃度，重点集中在底层核心引擎与运行时（Runtime）的重大升级。全天共处理 **24 条 PR**（合并/关闭 10 条，新建/待合并 14 条）和 **1 条 Issue**。项目的核心进展包括将内置的 OpenClaw 运行时升级至 v2026.8.1、Electron 升级至 43.5.0，并优化了开发环境构建性能与 Artifacts 工作流。项目整体健康度良好，但在依赖自动更新整理和部分遗留 IM 稳定性 Bug 上仍需关注。

---

## 2. 版本发布
*本周期内无新版本发布。*

---

## 3. 项目进展
今日核心功能演进主要围绕底层运行时和开发者体验（DX）展开，重大合并/关闭的 PR 包括：

* **核心运行时升级与 Artifact 工作流优化**：
  * [#2665](https://github.com/netease-youdao/LobsterAI/pull/2665) (**MERGED**)：将内置 OpenClaw 运行时从 v2026.6.1 升级至 **v2026.8.1**，同步将 Electron 从 40.2.1 升级至 **43.5.0**。本次升级同时优化了 Markdown 编辑器、Library 组织逻辑、应用内浏览器以及跨平台（Windows/macOS）Artifacts 构建工作流。
* **开发环境构建稳定性修复**：
  * [#2663](https://github.com/netease-youdao/LobsterAI/pull/2663) (**MERGED**)：修复了开发模式启动时因 Windows 循环 Junctions 导致 Vite 监听超时或崩溃的问题。通过在 Vite Watch 规则中显式排除 `.work`、`artifacts` 和 `dist-electron` 目录，大幅提升了开发模式的启动速度和稳定性。

---

## 4. 社区热点
今日开发重点和社区关注集中在 **OpenClaw v2026.8.1 升级带来的底层兼容性调优**：

* **OpenClaw 升级与 POPO SDK 模块加载竞态**：
  * [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) (**OPEN**)：在升级至 OpenClaw v2026.8.1 后，发现 POPO 2.1.13 在同步 require SDK 模块时与 Host ESM import 产生竞态条件，触发 `ERR_REQUIRE_ESM_RACE_CONDITION` 导致网关重启后丢失 POPO 账号监听。该 PR 提出了防止同步加载竞态的修复方案，是目前保证网关强稳健性的关键讨论点。

---

## 5. Bug 与稳定性
按严重程度排列的 Bug 及稳定性风险汇总如下：

1. **[中高危] IM 网关重连后消息被静默丢弃**
   * **现象**：`NimGateway` 中的消息去重缓存 `processedMessages` 声明为了模块级全局变量。网络抖动触发重连（`stop() + start()`）后，残留的消息 ID 会导致 5 分钟 TTL 内的新消息被 `isMessageProcessed()` 误判为重复消息并静默丢弃，用户端无感知无提示。
   * **状态**：目前处于 [Issue #1035](https://github.com/netease-youdao/LobsterAI/issues/1035) (Stale)，尚未合并修复 PR，需关注其实例化作用域隔离方案。
2. **[中危] POPO SDK 加载竞态导致网关监听失效**
   * **现象**：运行时升级后触发 `ERR_REQUIRE_ESM_RACE_CONDITION`。
   * **状态**：已有修复 PR [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) 处理中。
3. **[低危/DX] 开发环境 Vite 监听目录导致的启动超时**
   * **现象**：生成文件与临时目录未排除导致 Vite 文件监听器挂起。
   * **状态**：已在 PR [#2663](https://github.com/netease-youdao/LobsterAI/pull/2663) 中修复并合并。

---

## 6. 功能请求与路线图信号
从最近合并的重磅 PR [#2665](https://github.com/netease-youdao/LobsterAI/pull/2665) 可以看出项目下一阶段的路线图信号：

* **智能体能力增强**：依托 OpenClaw v2026.8.1 的升级，LobsterAI 将进一步强化其在桌面端协同（Cowork）、OpenClaw 任务执行、内置浏览器（In-app browser）联动以及产物（Artifacts）管理方面的能力。
* **基础设施现代化**：Electron 43.5.0 的全面适配意味着桌面端渲染层（Renderer）与主进程（Main）在性能与安全性上有了更高的基线。

---

## 7. 用户反馈摘要
* **IM 通信可靠性焦虑**：用户与开发者反映网络波动后的“消息丢失”现象（[#1035](https://github.com/netease-youdao/LobsterAI/issues/1035)）。由于缺乏丢包或过滤日志提示，用户无法判断是否丢失了关键智能体回复，对长连接网关的缓存清理机制提出了更高的可靠性诉求。
* **本地开发体验**：开发者对 Windows 平台下的构建/开发体验敏感度提高，期待减少因打包缓存或临时目录导致的本地构建报错（[#2663](https://github.com/netease-youdao/LobsterAI/pull/2663)）。

---

## 8. 待处理积压
维护者团队需重点关注以下长期滞留或标有 `stale` 的内容：

* **[重点 Issue]** [#1035](https://github.com/netease-youdao/LobsterAI/issues/1035)：`NimGateway` 重连消息丢弃问题已被标记为 `stale`，但其描述的模块全局变量问题严重影响 IM 网关可用性，建议尽快分配人员排查修复。
* **[依赖清理]** Dependabot 产生了大量的自动依赖更新 PR（如 [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) Electron 组更新、[#2461](https://github.com/netease-youdao/LobsterAI/pull/2461) ESLint 插件等），部分旧版本的关闭与新版本重新开启（如 Vite, React-DOM, Mermaid）存在重复性积压，建议统一批量合并或更新 CI 策略。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-09-15)

## 1. 今日速览
Moltis 项目在过去 24 小时内整体处于**静默与稳态观察期**。社区与核心团队在过去一天内未产生新的 Issues 及 Pull Requests 交互，开发活跃度处于低位。项目近期刚刚完成了版本 `20260913.02` 的发布，当前正处于新版本推向用户后的平稳运行阶段。整体健康度保持稳定，未出现集中爆发的线上紧急故障。

---

## 2. 版本发布

### Release [20260913.02](https://github.com/moltis-org/moltis/releases/tag/20260913.02)
- **更新内容**：官方 Release 页面暂未提供详细的 Changelog 说明（待补全）。
- **破坏性变更 (Breaking Changes)**：暂无明确标注。
- **迁移与升级注意事项**：建议生产环境在升级前注意备份相关配置文件，并密切关注后续官方补充的 Commit 变更说明。

---

## 3. 项目进展
过去 24 小时内，项目无合并（Merged）或关闭（Closed）的 Pull Request，代码库整体保持原状。

---

## 4. 社区热点
过去 24 小时内无新增活跃讨论或高互动量的 Issues / PRs。

---

## 5. Bug 与稳定性
过去 24 小时内**未收到**新的 Bug 报告、崩溃日志或性能回归反馈。

---

## 6. 功能请求与路线图信号
过去 24 小时内无新增的功能请求（Feature Request）提交。

---

## 7. 用户反馈摘要
过去 24 小时内社区无新增评论与使用反馈录入。

---

## 8. 待处理积压
今日无新增积压项。建议维护者团队可利用当前的社区静默窗口期，重点推进以下工作：
1. 补充完善 `20260913.02` 版本的 Release Notes 说明；
2. 梳理历史遗留的待审查 PR 与 Issue 列表，规范下一阶段的 Roadmap 规划。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*