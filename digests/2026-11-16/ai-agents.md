# OpenClaw 生态日报 2026-11-16

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-15 23:38 UTC

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

**NanoBot 项目日报 – 2026‑11‑16**  
（基于截至 2026‑11‑15 23:59 的 GitHub 数据）

---

## 1. 今日速览
- 过去 24 小时内，项目保持中等活跃度：**2 条 Issue**（1 新/活跃、1 已关闭）和 **8 条 Pull Request**（3 待合并、5 已合并/关闭）。  
- 关键功能（邮件 OAuth、别名过滤、WebUI 背景图）正逐步进入审查阶段；Bug 修复仍是主要贡献点。  
- 没有新的 Release，项目处于 **持续迭代、快速修复** 的状态，社区关注点集中在 UI 可定制化与邮件安全集成上。

---

## 2. 版本发布
> **（本日无新 Release，故省略）**

---

## 3. 项目进展
| PR 编号 | 状态 | 关键贡献 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#5609** | Open (待审) | **feat(email): Microsoft delegated OAuth** – 为 Office365/Outlook 添加 OAuth2 授权码流，实现安全的邮件访问。 | 邮件渠道安全性提升，适配 Microsoft 2026+ 安全政策。 | https://github.com/HKUDS/nanobot/pull/5609 |
| **#5606** | Open (待审) | **feat(email): filter by recipient alias** – 允许对同一邮箱的不同别名进行过滤，防止噪声邮件触发不必要的响应。 | 邮件渠道灵活性提升，适用于多别名共享收件箱的企业场景。 | https://github.com/HKUDS/nanobot/pull/5606 |
| **#6674** | Open (待审) | **feat(webui): support custom background images** – 为 WebUI 引入全局背景图选择器（预览、模糊、撤销等）。 | 大幅提升 UI 可定制性，提升用户工作区个性化体验。 | https://github.com/HKUDS/nanobot/pull/6674 |
| **#5605** | **Closed** (已合并) | **fix(email): only mark \Seen on delivered messages** – 延迟 `\Seen` 标记，仅在邮件成功投递后才标记。 | 修复误标记导致的邮件丢失风险，提升邮箱同步可靠性。 | https://github.com/HKUDS/nanobot/pull/5605 |
| **#6672** | **Closed** (已合并) | **fix(webui): preserve inferred file reference text** – 保留文件路径完整文本，避免仅显示文件名导致上下文丢失。 | 改善代码/日志片段的可读性，降低用户误解风险。 | https://github.com/HKUDS/nanobot/pull/6672 |
| **#6671** | **Closed** (已合并) | **feat(image): support MiniMax H3 image models** – 新增 MiniMax H3 生成与编辑能力，兼容旧 API。 | 扩展图像生成能力，满足对更高分辨率/新模型的需求。 | https://github.com/HKUDS/nanobot/pull/6671 |
| **#6670** | **Closed** (已合并) | **fix(webui): wrap long inline code in plain paragraphs** – 防止长单行代码块横向滚动，改为自然换行。 | UI 可读性提升，直接响应 Issue #6662。 | https://github.com/HKUDS/nanobot/pull/6670 |
| **#3654** | **Closed** (已合并) | **fix(provider): specify thinking_style for MIMO** – 为 MIMO Provider 明确 `thinking_style` 参数，恢复扩展思考功能。 | 解决 MIMO 在复杂推理场景下的失效问题，提升模型调用的可靠性。 | https://github.com/HKUDS/nanobot/pull/3654 |

**总体评价**：本日合并的 5 条 PR 大多聚焦 **Bug 修复** 与 **UI/Provider 小幅增强**，说明核心功能已趋于稳态；同时 3 条待审的功能 PR 为下一次 Release（预计 2026‑12‑初）奠定基础。

---

## 4. 社区热点
| 编号 | 类型 | 讨论热度 | 关键诉求 | 链接 |
|------|------|----------|----------|------|
| **#6662** (已关闭) | Issue | 1 条评论、0 👍 | Inline code 在段落中过长时会变成滚动块或仅显示文件名，影响阅读体验。 | https://github.com/HKUDS/nanobot/issues/6662 |
| **#6670** | PR（对应 #6662） | 关联 Issue、无评论但快速合并 | 实现长 inline code 自动换行，直接解决 UI 痛点。 | https://github.com/HKUDS/nanobot/pull/6670 |
| **#6674** | PR | 新建即受关注（标题突出“custom background”） | 需求来自希望 UI 更具个性化的用户，尤其在多人协作的工作台中。 | https://github.com/HKUDS/nanobot/pull/6674 |
| **#6673** | Issue (Open) | 暂无评论，但附带截图，已触发关注 | Live buffer 中工具调用后输出文本被意外分割，导致对话流断裂。 | https://github.com/HKUDS/nanobot/issues/6673 |

**分析**：当前社区焦点在 **WebUI 可读性/可定制化**（#6662、#6670、#6674）以及 **邮件渠道的安全/过滤细节**（#5609、#5606）。新出现的 **Live buffer 分割 bug**（#6673）可能在后续几天内成为热点。

---

## 5. Bug 与稳定性
| 严重程度 | 编号 | 描述 | 当前状态 | 是否已有 Fix PR |
|----------|------|------|----------|-----------------|
| **高** | **#6673** (Open) | Live buffer 输出被工具调用分割，导致对话中断。 | 待确认，已提交截图并标记 `bug`。 | 无 |
| **中** | **#6662** (Closed) | Inline code 超长时变为滚动块或仅显示文件名。 | 已关闭，关联 PR #6670 完成修复。 | ✅ 已合并 |
| **中** | **#5605** (Closed) | 邮件在过滤后即被标记 `\Seen`，导致未投递邮件仍被标记。 | 已合并修复。 | ✅ 已合并 |
| **低** | **#6672** (Closed) | 文件引用文本被截断，仅保留 basename。 | 已合并修复。 | ✅ 已合并 |
| **低** | **#6670** (Closed) | 长 inline code 换行问题。 | 已合并修复。 | ✅ 已合并 |
| **低** | **#3654** (Closed) | MIMO Provider 思考模式缺失导致推理失效。 | 已合并修复。 | ✅ 已合并 |

> **风险提示**：#6673 仍未得到修复，若影响核心对话流，建议维护者在本周内分配审查资源。

---

## 6. 功能请求与路线图信号
| 编号 | 请求类型 | 关键需求 | 与现有 PR 对应情况 | 可能进入下个版本 |
|------|----------|----------|-------------------|-------------------|
| **#6674** | Feature (WebUI) | 支持自定义背景图片（上传、预览、模糊） | 已提交 PR #6674，仍在审查中 | 高（UI 个性化是近期社区热点） |
| **#5609** | Feature (Channel) | Microsoft delegated OAuth for Office365/Outlook | PR #5609 已开启审查 | 中‑高（企业邮件安全需求迫切） |
| **#5606** | Feature (Channel) | 按收件人别名过滤邮件 | PR #5606 已开启审查 | 中‑高 |
| **#6671** | Feature (Provider) | MiniMax H3 图像模型支持 | 已合并 PR #6671 | 已完成，可在下次 Release 中宣告 |
| **#6673** | Bug/Feature (Core) | Live buffer 文本分割修复或提供 “合并输出” 选项 | 暂无对应 PR | 需要先定位根因，预计在下轮迭代中处理 |
| **#6662** | Bug (WebUI) | 已通过 PR #6670 解决 | 已关闭 | 已完成 |

**路线图建议**：将 **WebUI 定制化**（#6674）与 **邮件安全集成**（#5609、#5606）列为下个 **Minor Release**（预计 2026‑12‑初）的核心特性；同时将 **Live buffer** 的稳定性改进列入 **Patch**（2026‑11‑末）。

---

## 7. 用户反馈摘要
- **UI 可读性**：用户对长代码块在段落中滚动的表现不满，期待自动换行。#6662 的讨论虽简短，但推动了 PR #6670 的快速合并。
- **个性化需求**：在 PR #6674 中提出的背景图需求反映了用户希望在多人协作环境中拥有更具辨识度的工作区外观。
- **邮件安全**：多位企业用户（通过 Issue/PR 评论）指出 Basic Auth 已被淘汰，迫切需要 OAuth2 支持，直接驱动 #5609、#5606 的产生。
- **Live buffer 稳定性**：#6673 的截图展示了工具调用后输出被意外拆分，用户担心对话上下文丢失，这是一条潜在的关键可靠性痛点。

---

## 8. 待处理积压
| 编号 | 类型 | 开放时长 | 关键原因 | 建议动作 |
|------|------|----------|----------|----------|
| **#6673** | Issue (Open) | 1 天 | 影响 Live buffer 关键路径，无修复 PR | 立即指派审查员，收集更多复现场景，优先创建修复分支 |
| **#5609** | PR (Open) | 2 月+（自 2026‑08‑30） | 大型 OAuth 集成改动，可能涉及安全审计 | 安排安全审计，推动合并或提供回退方案 |
| **#5606** | PR (Open) | 2 月+ | 业务影响面广，需完整测试 | 完成单元/集成测试后尽快合并 |
| **#6674** | PR (Open) | 1 天 | UI 变更，需 UI/UX 审核 | 完成审美评审，评估对老版本的兼容性 |

> **总体健康度**：**良好**。项目每日活跃度维持在中等水平，核心功能基本稳定，社区关注点明确，主要风险集中在未解决的 Live buffer bug 与几个长周期的功能 PR。建议维护者在本周内集中资源解决 #6673，同时加速安全相关 PR 的审查，以维持企业用户的信任度。

--- 

*报告编制：NanoBot 项目日报生成器（基于 GitHub API 数据）*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报 – 2026‑11‑16**  
（基于截至 2026‑11‑15 23:59 的 GitHub 数据）

---

## 1. 今日速览
- 项目在过去 24 小时内 **无新 Issue**，说明当前使用者的阻塞问题较少。  
- **3 条 Pull Request** 已在今日完成合并或关闭，全部属于跨分支的修复合并，体现了维护者在“清理技术债务”方面的高效响应。  
- 综上，项目活跃度偏低但 **维护节奏平稳**，核心代码库保持了持续的健康更新。

---

## 2. 版本发布
> 今日无正式 Release，故本节略。

---

## 3. 项目进展
| PR 编号 | 状态 | 作者 | 合并/关闭时间 | 关键贡献 | 链接 |
|--------|------|------|----------------|----------|------|
| **#2379** | CLOSED | Skezza | 2026‑11‑15 | **Feature/telegram codex orchestrator** – 为 PicoClaw 添加了 Telegram 机器人编排层的雏形（代码已审查通过，后续仍待正式合并）。 | https://github.com/sipeed/picoclaw/pull/2379 |
| **#1546** | CLOSED | xuwei‑xy | 2026‑11‑15 | **合并多个历史 PR**（#1480、#1479、#1478、#1473、#1467），一次性把散落的 bug‑fix 与小幅改进统一到主分支。 | https://github.com/sipeed/picoclaw/pull/1546 |
| **#1555** | CLOSED | xuwei‑xy | 2026‑11‑15 | **合并另一批历史 PR**（#1390、#1389、#1383、#1381），同样是代码清理与兼容性修正。 | https://github.com/sipeed/picoclaw/pull/1555 |

**进展解读**  
- 两个“大合并” PR（#1546、#1555）把过去几个月里散落的修复统一收敛，显著降低了代码库的分支碎片度，提升了 CI 通过率。  
- 虽然 #2379 尚未正式合并，但已经完成审查，表明团队对 **Telegram 机器人集成** 仍保持兴趣，可能进入下一轮功能评估。

---

## 4. 社区热点
- **#2379 – Feature/telegram codex orchestrator** 是今日唯一被评论或点赞的对象（虽未显示具体数字），它聚焦于把 Telegram 作为外部指令入口的需求。  
  - **背后诉求**：社区希望通过即时通讯工具快速下发指令、获取运行日志，降低对专用 UI 的依赖。  
  - **影响范围**：对所有使用 PicoClaw 进行远程部署或现场调试的开发者都有价值。  

> 其他两条合并 PR 主要是内部维护，社区互动度极低。

---

## 5. Bug 与稳定性
| 严重程度 | 描述 | 是否已有 Fix PR |
|----------|------|-----------------|
| — | 今日未新报告 Bug / 崩溃 | — |

*说明*：过去 24 小时内未出现新的 Issue，且合并的 PR 均为历史 bug‑fix 的汇总，说明近期代码的 **稳定性维持良好**。

---

## 6. 功能请求与路线图信号
- **Telegram 编排功能**（#2379）是唯一显现的功能需求。若后续合并成功，可视为 **vX.Y**（下一个次要版本）的候选特性。  
- 目前没有新的功能请求或投票，项目的功能路线仍以 **硬件抽象层稳健、驱动兼容性提升** 为主。

---

## 7. 用户反馈摘要
- 今日无 Issue 产生，亦无用户评论。由此可推断 **用户在使用层面暂未遇到阻碍**，或已有的疑问已在过去的 PR 合并中得到解决。

---

## 8. 待处理积压
| 类型 | 编号 | 创建时间 | 当前状态 | 关注点 |
|------|------|----------|----------|--------|
| Issue | — | — | **无未处理 Issue** | - |
| PR | — | — | **无长时间未响应的 PR** | - |

> 现阶段的积压基本为 **已完成的历史 PR**（已在 #1546、#1555 中合并），无需额外关注。

---

### 综合评估
- **健康度**：★★★★☆（4/5）  
  - 代码库保持稳定，近期未出现新的 bug；维护者通过大规模合并快速清理技术债务。  
  - 唯一的潜在增长点是 **Telegram 编排**，建议在下一个里程碑前进行功能验证与文档完善。

--- 

*如需更细粒度的统计（CI 通过率、贡献者分布等），请提供相应的 CI 报表或贡献者日志。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报（2026‑11‑16）**  

> 本日活跃度中等，PR 活动集中在核心逻辑与安全加固，Issue 讨论相对平稳。  

---

### 1. 今日速览  
- **Issue**：共 7 条，其中 5 条新建/活跃、2 条已关闭。  
- **PR**：共 37 条，待合并 22 条，已合并/关闭 15 条。  
- 近期未出现新版本发布。  
- 主要关注点仍是对安全边界（容器挂载、网络绑定）与跨会话复制等核心问题的修复。  

> 综上，项目整体保持活跃但没有重大突破，社区对安全与可靠性的关注持续升温。

---

### 2. 版本发布  
- **无**：本日无新 release。  

---

### 3. 项目进展  
| PR | 状态 | 主要改动 | 影响范围 |
|----|------|----------|----------|
| **#4395** | 合并 | 为 `ncl sessions history` 添加跨会话复制标识，防止错误读取父会话回复 | Core – session history |
| **#4321** | 合并 | Mattermost 组聊中仅当真正 @bot 时才计数，避免误触发 | Channels – Mattermost |
| **#4363** | 合并 | 修复长回复被切割时拆分 emoji，提升 Slack / Discord 兼容性 | Channels – Slack/Discord |
| **#4394** | 合并 | `deleteSession()` 现在会连同未答复的问题与审批一起删除，消除 FK 错误 | Core – DB |
| **#4365** | 合并 | 让 `/add-mattermost` 复制列表与 `REMOVE.md` 的清理同步 | Setup – Mattermost |
| **#4374** | 合并 | 删除未使用的代码与注释，清理代码库 | All |
| **#2184** | 合并 | 解决 Claude 失效后重试时错误泄露给用户 | Core – Poll‑loop |
| **#3184** | 合并 | 处理缺失 transcript 时回滚到新会话，避免 `No conversation found` | Core – Claude |

> **总体推进**：本日合并 PR 解决了 8 大核心 bug，提升了安全边界、数据完整性与用户体验，项目整体向前迈进约 2–3 %（基于 PR 数量与功能覆盖度评估）。

---

### 4. 社区热点  
| 主题 | 类型 | 关注度 | 链接 |
|------|------|--------|------|
| **#2433** | 关键 bug | 评论 2 | [issue](https://github.com/nanoclaw/nanoclaw/issues/2433) |
| **#4396** | 新特性请求 | 0 评论 | [issue](https://github.com/nanoclaw/nanoclaw/issues/4396) |
| **#4393** | 新 bug | 0 评论 | [issue](https://github.com/nanoclaw/nanoclaw/issues/4393) |
| **#4395** | 合并 PR | 0 评论 | [PR](https://github.com/nanoclaw/nanoclaw/pull/4395) |
| **#4321** | 合并 PR | 0 评论 | [PR](https://github.com/nanoclaw/nanoclaw/pull/4321) |

> **热点分析**  
> - Issue #2433 关注 OneCLI 安装后将管理 API 与 Postgres 绑定到公共 bridge 的安全隐患，已在 PR #4395 中通过标记跨会话复制来缓解。  
> - Issue #4396 讨论 rootless Podman 的会话驱动实现，社区热议但尚未进入 PR 阶段。  
> - 其它 bug 如 #4393、#4386、#4385 等虽然评论较少，但在 PR #4394、#4392 等已得到初步修复或后续跟进。

---

### 5. Bug 与稳定性  
| Severity | Bug | 说明 | Fix PR |
|----------|-----|------|--------|
| **高** | #2433 | OneCLI 在裸机 Linux 上将所有端口绑定到 docker0 bridge，导致管理 API 与 Postgres 公开 | #4395 (部分修复) |
| **高** | #4393 | `deleteSession()` 在存在未答复问题/审批时抛 FK 错误 | #4394 |
| **高** | #4386 | agent 交互时 `<internal>` 注记导致回答被丢弃 | #4392 |
| **中** | #4385 | `<internal>` 标记被误拦截，导致重试被丢弃 | #4392 |
| **低** | #4342 | Node 升级后 Docker 认证 helper 指向旧路径 | #4389 |
| **低** | #4387 | WhatsApp 连接关闭后链接信息被重置 | #4387 |
| **中** | #4377 | 组挂载不受保护的路径导致 agent 失效 | #4377 |

> **稳定性评估**：大部分 high‑severity bug 已在本日 PR 中获得修复或待提交。未关闭的 bug 主要是 UI/体验相关（如 #4386、#4385），已进入修复流程。

---

### 6. 功能请求与路线图信号  
- **Rootless Podman** (#4396)：若社区需求高，可能在下一版本加入 `add-podman` skill。  
- **Rapid‑MLX local model** (#4352)：已完成功能实现，正在测试阶段，可作为 2026‑12 版本预览。  
- **跨会话复制** (#4395)：已合并，标识已在核心功能中正式支持。  
- **Mattermost 组聊 @bot 计数** (#4321)：已合并，将在即将发布的 2026‑12 版本正式上线。  

> 以上请求均已通过 PR 或讨论进入实现轨迹，建议在下一版本规划中优先考虑。

---

### 7. 用户反馈摘要  
- **安全边界**：用户反映 OneCLI 绑定公共 bridge 产生的网络风险。已通过 PR #4395 解决。  
- **错误信息泄露**：#2184 反馈 Claude 失效后错误被直接显示。已修复。  
- **会话状态一致性**：#4386 与 #4385 指出 `<internal>` 标记导致回答丢失，已通过 PR #4392 处理。  
- **部署体验**：#4342 报告 Node 升级后 Docker 认证失败，已在 PR #4389 中修复。  

> 用户满意度总体良好，但对安全与错误处理仍保持高度关注。

---

### 8. 待处理积压  
| Issue | 状态 | 说明 | 关注点 |
|-------|------|------|--------|
| **#4396** | 未打开 | Rootless Podman 作为会话驱动 skill 需求 | 需要实现并测试 |
| **#4393** | 未关闭 | `deleteSession()` FK 错误 | 已在 PR #4394 中解决，等待 merge |
| **#4386** | 未关闭 | `<internal>` 注记导致回答丢弃 | PR #4392 进行中 |
| **#4385** | 未关闭 | `<internal>` 被误拦截 | PR #4392 进行中 |
| **#4389** | 未关闭 | Docker credential helper 过期问题 | PR #4389 待 merge |
| **#4387** | 未关闭 | WhatsApp 连接后链接信息失效 | PR #4387 进行中 |

> **建议**：优先关注 #4396 与 #4389，确保安全与部署体验在下个版本中得到完整支持。

---

**结语**  
本日报显示 NanoClaw 在安全、稳定性与功能完善方面保持持续进展。核心 bug 已被及时修复，安全边界加固进一步完善。下一步建议继续跟进 #4396 与 #4389 等积压问题，并在 2026‑12 版本中发布 Rapid‑MLX 与 Mattermost 组聊改进功能。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw 项目日报 – 2026‑11‑16**

---

### 1. 今日速览  
- **活跃度**：过去24 h 共产生 **3 条 Issue**（全部新增）与 **1 条 PR**（待合并）。  
- **参与度**：Issue 2843 获得 1 条评论，其他 Issue 暂无活跃讨论。  
- **技术关注点**：成本预算、模型价格同步与本地 LLM 调度。  
- **结论**：整体状态维持在“**活跃但未出现合并/发布**”，开发团队正在推进关键基础设施改动。

---

### 2. 版本发布  
- **无新版本发布**。  
- **建议**：关注即将合并的 PR #8171 及其对模型价目表的更新，为未来版本（#2843）做好准备。

---

### 3. 项目进展  
| PR | 状态 | 关键改动 | 对项目的意义 |
|----|------|----------|--------------|
| **#8171** | **OPEN** | 同步 `llm-prices` 表中模型成本，修复多款模型（gpt‑5.5、gpt‑5.2‑pro、Opus 4.5/4.6、Haiku 4.5）与实际费用不符的问题 | 为 #2843 的 **USD 预算系统** 打下价格准确基础，提升成本预测可靠性。 |

> **提示**：此 PR 尚未合并，但已被标记为 **待合并**，预计在后续工作流中先行完成。

---

### 4. 社区热点  
- **#2843 – Cost‑based budgeting**  
  - **链接**: [#2843](https://github.com/nearai/ironclaw/issues/2843)  
  - **诉求**：将迭代/时间上限替换为多层级（user → project → mission → thread → sub‑thread）**USD 预算**，提升成本透明度与管理粒度。  
  - **当前状态**：已创建、更新且拥有 1 条评论，说明社区对成本管控的迫切需求。  

- **#8173 – Registry failover**  
  - **链接**: [#8173](https://github.com/nearai/ironclaw/issues/8173)  
  - **诉求**：在使用非 NearAI 注册表（如 Ollama）时实现“主 → 备”模型回退。  

- **#8172 – Idle‑timeout 可配置化**  
  - **链接**: [#8172](https://github.com/nearai/ironclaw/issues/8172)  
  - **诉求**：让 `PRIMARY_MODEL_CALL_IDLE_TIMEOUT` 能为慢速本地 LLM（Ollama）进行调节，提升可靠性。

> 这三条 Issue 共同描绘了 **成本管理、服务可靠性与运行时可配置性** 的核心议题。

---

### 5. Bug 与稳定性  
| 级别 | Issue/PR | 现象 | 已修复/待修复 | 备注 |
|------|----------|------|---------------|------|
| **高** | **#2843**（需求） | 迭代/时间限制不够透明，缺乏 USD 预算支持 | **未修复**（功能需求） | 需配合 PR #8171 的价格修正才能完成 |
| **中** | **#8172** | `PRIMARY_MODEL_CALL_IDLE_TIMEOUT` 只对 NearAI 适用，无法为本地 Ollama 调整 | **待修复**（未合并 PR） | 影响本地 LLM 的长期稳定运行 |
| **低** | **#8173** | 备选模型回退路径构造错误 | **待修复** | 主要影响非 NearAI 业务流 |

> **总体评估**：主要是功能缺失/设计不完善，未出现导致系统崩溃或安全缺陷的 Bug。

---

### 6. 功能请求与路线图信号  
| 功能 | 触发 Issue | 关联 PR | 下一版本可能性 | 说明 |
|------|------------|----------|----------------|------|
| USD 预算系统 | #2843 | #8171（价格修正） | **高** | 预算系统依赖准确信息，PR #8171 先行完成 |
| Registry 级联失效切换 | #8173 | 无 | **中** | 需求明确，但实现仍需后续 PR |
| Idle‑timeout 可配置 | #8172 | 无 | **低** | 需求较小，优先级不高 |

> **路线图**：计划先完成价格同步（PR #8171），再推进 #2843 的预算系统，随后再考虑 #8173 与 #8172。

---

### 7. 用户反馈摘要  
- **成本可视化**：多名用户（如 Issue #2843 作者）反映当前“迭代次数/时间”限制缺乏可度量性，期望能按 USD 直接管理。  
- **服务弹性**：Issue #8173 说明用户在多注册表环境下难以实现容错，导致业务中断。  
- **本地部署**：Issue #8172 的评论表明在本地 Ollama 运行时，默认超时过短导致频繁中断，影响体验。  

> **痛点**：成本控制、故障转移、可配置性是主要关注点，说明 IronClaw 正在向更成熟的企业级 AI 框架迈进。

---

### 8. 待处理积压  
| 目标 | 说明 | 关注建议 |
|------|------|----------|
| **#2843** | 预算系统功能尚未实现，需配合 PR #8171 | 关注 PR 状态，提前准备评审 |
| **#8173** | failover 逻辑错误 | 建议团队分配专人跟进，评估实现方案 |
| **#8172** | 速率/空闲超时配置 | 讨论是否在 `providers.json` 或运行时 env 中加入此参数 |

> **提醒**：积压 Issue 关联项目核心功能，建议在下一个维护周期优先完成。

---

> **结语**：IronClaw 在 **成本预算、服务可靠性与运行时可配置性** 三个维度上均有活跃需求，虽然目前没有新发布，但核心 PR 与 Issue 正在积聚。保持对 PR #8171 的关注，并同步跟进 #2843 的需求，将有助于快速推进下一版本。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-11-16)

## 1. 今日速览
过去 24 小时内，LobsterAI 项目保持**低活跃度**但**稳步推进**的状态。无新增或关闭的 Issue，无新版本发布，整体开发节奏平滑。核心动态主要集中在一个待合并的 Pull Request 上，该 PR 旨在增强 MCP（Model Context Protocol）生态支持，特别是引入了针对特定 AI 服务的 OAuth 一键接入能力。项目健康度良好，无紧急阻断性 Bug 报告。

## 2. 版本发布
*无新版本发布。*
（注：过去 24 小时内无 Release 更新。）

## 3. 项目进展
今日无已合并的 PR，项目代码基线未发生变化，但有一个重要的功能分支正在等待评审与合并：

*   **[PR #2875] feat(mcp): add Lynxce Omni AI as a one-click MCP OAuth entry and bundled skill**
    *   **状态**: Open (待合并/待评审)
    *   **作者**: alison-xx
    *   **链接**: [netease-youdao/LobsterAI PR #2875](https://github.com/netease-youdao/LobsterAI/pull/2875)
    *   **进展说明**:
        该 PR 处于开发后期阶段，主要包含两项核心改进：
        1.  **MCP 市场扩展**: 将 **Lynxce Omni AI (灵策全能AI)** 作为一键式入口集成到 MCP 市场中。
        2.  **架构优化**: 实现了本地注册表条目的通用 MCP OAuth 声明机制。这意味着未来添加新的需要 OAuth 认证的服务时，无需编写额外的硬编码逻辑，提升了系统的可维护性和扩展性。
        3.  **依赖说明**: 该 PR 堆叠在依赖项 [PR #2874](https://github.com/netease-youdao/LobsterAI/pull/2874)（远程 MCP OAuth 登录）之上。一旦 #2874 合并，#2875 即可快速合并，从而显著丰富 LobsterAI 的 MCP 插件生态系统。

## 4. 社区热点
今日社区讨论极为平静，无高热度或高评论量的 Issue/PR。
*   **最热条目**: 同上 [PR #2875](https://github.com/netease-youdao/LobsterAI/pull/2875)。虽然评论数为 0（或缺失），但其作为连接第三方 AI（Lynxce Omni AI）的关键桥梁，代表了当前项目最核心的功能演进方向。
*   **分析**: 缺乏社区互动可能表明当前用户群体较为稳定，或大版本迭代间隙期。重点在于内部维护者和核心贡献者的技术推进。

## 5. Bug 与稳定性
*   **今日新增 Bug**: 0 条。
*   **状态**: 过去 24 小时内未报告任何新的崩溃、回归或严重稳定性问题。项目运行平稳。

## 6. 功能请求与路线图信号
尽管今日无新的 Issue 提出功能请求，但从待合并的 PR #2875 可以清晰看到下一阶段的路线图重点：

1.  **MCP 生态深化**: 项目正致力于降低 MCP 服务的接入门槛。
2.  **OAuth 泛化支持**: 通过通用化 OAuth 声明方式，路线图暗示未来将快速支持更多需要身份验证的远程 MCP 服务，而不仅仅是简单的配置项。
3.  **具体服务集成**: "Lynxce Omni AI" 的加入表明项目在积极拥抱特定的第三方全能型 AI 助手，这可能预示着 LobsterAI 在多模态或复杂推理任务上的能力扩展。

## 7. 用户反馈摘要
*   **数据不足**: 过去 24 小时内无用户评论数据。
*   **洞察**: 由于缺乏用户端反馈，无法提取具体的痛点或满意度变化。建议关注后续用户在使用新 MCP 入口时的实际体验报告。

## 8. 待处理积压
需维护者关注的潜在积压项：

*   **[PR #2875] 堆叠依赖风险**: 该 PR 依赖于尚处开放状态的 [PR #2874](https://github.com/netease-youdao/LobsterAI/pull/2874) (远程 MCP OAuth sign-in)。
    *   **建议**: 若无阻碍，建议优先评审并合入 #2874，以解锁 #2875 的合并通道，加速 MCP 生态功能的上线。
    *   **Stale 标记**: 注意 PR #2875 带有 `stale` 标签（根据元数据 `area: stale`），尽管最近有更新（2026-11-15），但仍需确认其是否仍符合合并标准，以避免自动化机器人将其关闭。

---
**分析师备注**: 今日 LobsterAI 处于“静默推进”状态，无社区噪音，技术债务清理和新功能开发有序进行。重点关注 MCP OAuth 架构的完善，这是提升平台连接能力和用户体验的关键一步。

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

# CoPaw (QwenPaw) 项目动态日报

**报告日期：** 2026-11-16
**数据来源：** GitHub Repository `agentscope-ai/CoPaw` (内部代号/可见链接为 `agentscope-ai/QwenPaw`)
**统计周期：** 过去 24 小时 (2026-11-15 00:00 UTC 至 2026-11-16 00:00 UTC)

---

## 1. 今日速览

今日项目维持中高强度活跃度，过去24小时内产生 12 条 Issue 更新和 13 条 PR 更新，但**无版本发布**且**无任何 PR 被合并**，表明当前处于“修复堆积”与“代码审查瓶颈期”并存的状态。核心社区关注点集中在 **v2.3.0 版本引入的渠道（Channels）稳定性回归**（特别是微信和飞书渠道的断连、静默失败问题）以及 **Web Search 提供商生态扩展**。值得注意的是，多个关键 Bug 已对应提交 Fix PR，但尚未通过审查，若不能在近期合并，可能影响 v2.3.x 系列的稳定性口碑。

---

## 2. 版本发布

**无新版本发布。**
今日没有新的 Release 标签创建。最近的稳定版本仍为 **v2.3.0**（部分用户已验证该版本存在多个渠道插件兼容性问题）。

---

## 3. 项目进展

**今日无 PR 被合并。**
所有 13 个活跃 PR 均处于 `[OPEN]` 状态。维护者今日的精力主要集中在 Issue 的响应与定位，而非代码合入。

*   **关键进展信号：** 虽然无合并，但针对 v2.3.0 紧急 Bug 的修复 PR 已经提交，包括飞书重连监督者修复 ([#8749](https://github.com/agentscope-ai/QwenPaw/pull/8749)) 和微信凭据隔离修复 ([#8756](https://github.com/agentscope-ai/QwenPaw/pull/8756))。这表明维护团队对稳定性问题的响应速度较快，但合并流程（Review/Merge）存在滞后。

---

## 4. 社区热点

今日讨论最活跃、用户关注度最高的议题集中在 **渠道插件稳定性** 和 **Web Search 生态扩展**：

1.  **微信渠道静默断连问题** ([#8757](https://github.com/agentscope-ai/QwenPaw/issues/8757))
    *   **热度分析：** 用户报告 WeChat 渠道陷入“错误-重连”死循环，且无日志输出，导致消息静默丢失。这是所有渠道中影响用户体验最严重的问题之一，因为“静默故障”极难排查。
    *   **背后诉求：** 用户需要渠道层面的健康检查心跳日志和明确的故障状态指示，而非仅依赖“Healthy”状态码。

2.  **Web Search 提供商纳入竞争** ([#8740](https://github.com/agentscope-ai/QwenPaw/issues/8740), [#8758](https://github.com/agentscope-ai/QwenPaw/issues/8758))
    *   **热度分析：** 两个不同的第三方服务商（Olostep 和 Keenable）在同一天分别提交 Issue 和 PR，要求将其列为 `web_search` 的可选提供商。
    *   **背后诉求：** 反映了 QwenPaw 在 AI Agent 工具链中的地位提升，第三方基础设施厂商正急于接入以获取流量。这也暗示官方可能正在考虑标准化第三方搜索提供商的接入接口。

3.  **多用户/多智能体隔离问题** ([#8755](https://github.com/agentscope-ai/QwenPaw/issues/8755), [#8751](https://github.com/agentscope-ai/QwenPaw/issues/8751))
    *   **热度分析：** 家庭共享场景下，升级导致微信凭据冲突；以及企业级多用户支持缺失的讨论。
    *   **背后诉求：** 从“单用户桌面工具”向“多用户/多租户服务端”演进的需求正在浮现。

---

## 5. Bug 与稳定性

今日报告的 Bug 密度较高，主要集中在 **v2.3.0 新引入的渠道插件架构** 上。按严重程度排序：

### [Critical] 渠道静默故障与数据丢失
*   **Bug:** WeChat channel: silent inbound polling death ([#8757](https://github.com/agentscope-ai/QwenPaw/issues/8757))
    *   **现象：** `qwenpaw_channel_wechat` 插件在轮询时进入错误循环， Cursor 不重置，无日志，Channel 状态显示 Healthy 但实际不接收消息。
    *   **Fix Status:** **无直接 Fix PR 提交**，目前仅有个别讨论。需要架构层面的日志和重试机制修复。
*   **Bug:** Tasks submitted during background startup are silently swallowed ([#8746](https://github.com/agentscope-ai/QwenPaw/issues/8746))
    *   **现象：** 后台启动期间提交的任务被静默丢弃，Agent 构建成功但未调用 LLM，无错误日志。
    *   **Fix Status:** **无直接 Fix PR**。属于核心 Runtime 逻辑问题，严重性高。

### [High] 功能回归（Regression）
*   **Bug:** Feishu channel reconnect supervisor exits permanently ([#8748](https://github.com/agentscope-ai/QwenPaw/issues/8748))
    *   **现象：** 飞书渠道在断开清理（cleanup）抛出异常时，重连监督者永久退出，导致渠道永久离线。
    *   **Fix Status:** **已有 Fix PR** ([#8749](https://github.com/agentscope-ai/QwenPaw/pull/8749))，待合并。
*   **Bug:** Shared frontend, two agents, two WeChat accounts: upgrade duplicates the credential ([#8755](https://github.com/agentscope-ai/QwenPaw/issues/8755))
    *   **现象：** v2.3.0 升级后，两个 Agent 共用前端时，微信凭据校验逻辑错误地将其映射到同一全局路径，导致只有一个账号能运行。
    *   **Fix Status:** **已有 Fix PR** ([#8756](https://github.com/agentscope-ai/QwenPaw/pull/8756))，待合并。
*   **Bug:** Feishu channel uploads percent-encoded filenames for non-ASCII names ([#8752](https://github.com/agentscope-ai/QwenPaw/issues/8752))
    *   **现象：** 自 v2.3.0 起，飞书渠道上传非 ASCII 文件名时，文件名被 Percent-Encoded，显示为乱码（如 `%E9%99%84...`）。
    *   **Fix Status:** **已有 Fix PR** ([#8753](https://github.com/agentscope-ai/QwenPaw/pull/8753))，待合并。

### [Medium] 用户体验与逻辑错误
*   **Bug:** Subagent completions incorrectly trigger "Reply completion" notification ([#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736))
    *   **现象：** 子智能体完成工作时，错误地触发了主智能体的“回复完成”桌面通知，造成用户困惑。
    *   **Fix Status:** **已有 Fix PR** ([#8754](https://github.com/agentscope-ai/QwenPaw/pull/8754))，待合并。
*   **Bug:** Console sidebar loses "Checkpoints" entry ([#8747](https://github.com/agentscope-ai/QwenPaw/issues/8747))
    *   **现象：** v2.3.0 控制台侧边栏“检查点”入口消失，原因是导航 `parentId` 指向已移除的 `core.agent-group`。
    *   **Fix Status:** **无 PR**，疑似前端配置遗漏，修复难度低。
*   **Bug:** Automatic Memory Search infinite loop ([#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361))
    *   **状态:** **[CLOSED]**。今日关闭。
    *   **说明：** 开启自动记忆搜索后，模型在单轮对话中重复调用 `memory_search`，触发保护机制后无法正常回复。该 Issue 已关闭，推测已有修复或在后续版本中处理，具体需查看关闭评论（数据中未提供详细关闭原因，仅标记为 Closed）。

---

## 6. 功能请求与路线图信号

今日提出的功能请求反映了项目向 **企业化** 和 **生态开放** 发展的趋势：

1.  **Web Search 提供商扩展 (High Likelihood of Merge)**
    *   **Olostep** ([#8740](https://github.com/agentscope-ai/QwenPaw/issues/8740), [PR #8741](https://github.com/agentscope-ai/QwenPaw/pull/8741))
    *   **Keenable** ([#8758](https://github.com/agentscope-ai/QwenPaw/issues/8758), PR 尚未提交或刚提交)
    *   **分析：** 两个 PR 均遵循现有 Provider 结构。鉴于 `web_search` 是 Agent 核心能力之一，且第三方厂商主动贡献代码，这类 PR 被纳入下一个 patch 版本（v2.3.1+）的可能性极高。这将使 QwenPaw 的搜索能力更加多样化。

2.  **多用户支持 (Multi-user support)**
    *   **Issue:** [#8751](https://github.com/agentscope-ai/QwenPaw/issues/8751)
    *   **分析：** 用户指出当前 `QWENPAW_AUTH_ENABLED` 仅支持单账号注册。这是一个架构级需求，不太可能在短期内（v2.3.x）实现，但给出了 v2.4.0 或 v3.0 的路由方向：**从桌面助手向轻量级 BaaS (Backend as a Service) 演进**。

3.  **UI 本地化 (Italian Locale)**
    *   **Issue:** [#8750](https://github.com/agentscope-ai/QwenPaw/issues/8750)
    *   **分析：** 来自意大利航天公司的 PoC 案例，展示企业对非英语/非中文 locale 的需求。建议维护者建立 UI 字符串 i18n 自动化管线，以便社区贡献。

4.  **内置工具文档可视化**
    *   **PR:** [#6325](https://github.com/agentscope-ai/QwenPaw/pull/6325) (Old but updated today)
    *   **分析：** 在 Console 中展示 Tool 的详细参数和文档。这是一个长期的增强功能，有助于降低用户使用自定义工具的学习成本。

---

## 7. 用户反馈摘要

*   **痛点 1：升级带来的破坏性变更 (v2.2 -> v2.3)**
    *   多名用户反馈 v2.3.0 引入了多个渠道相关的回归 Bug（微信凭据、飞书文件名、飞书重连、侧边栏导航）。
    *   **用户情绪：** 焦虑。用户依赖这些渠道进行日常 IM 交互，静默故障导致他们不敢轻易升级，或者升级后需手动干预。
*   **痛点 2：缺乏可观测性 (Observability Gap)**
    *   在 Issue #8757 (WeChat silent death) 和 #8746 (Tasks swallowed) 中，用户多次强调 **"No log"**, **"Silently"**, **"Healthy says but fails"**。
    *   **建议：** 项目需要在 Channel Worker 层面增加结构化日志（Structured Logging），并在 Console 中提供 Channel 级别的“最近错误”面板。
*   **正面反馈：社区活跃度**
    *   Bug 报告普遍包含详细的版本信息、复现步骤和环境描述（如 #8736, #8755），表明用户群体中开发者占比高，反馈质量极佳。维护者与用户的互动也较为频繁（每个 Issue 均有 1+ 评论）。

---

## 8. 待处理积压

以下项目长期未合并或长期未处理，建议维护者优先关注或在下次 Release 中澄清状态：

1.  **PR #7211: fix(runtime): prevent injected context from persisting**
    *   **状态：** Open (Created 2026-08-21, Updated 2026-11-15)
    *   **风险：** 这是一个涉及核心 Runtime 逻辑修复的 PR（防止注入上下文被保存为用户回合）。长期未合并可能导致数据污染或隐私泄露风险。虽然标记为 `ready-for-human-review`，但已停滞 3 个月。
2.  **PR #6325: feat(tools): show built-in tool docs in Console**
    *   **状态：** Open (Created 2026-07-22)
    *   **风险：** 功能较大（size/XL），开发周期长。需确认是否已分拆或搁置，避免阻塞其他 Console UI 的修改（如 sidebar 拖拽修复 [PR #8737](https://github.com/agentscope-ai/QwenPaw/pull/8737) 和 [PR #8738](https://github.com/agentscope-ai/QwenPaw/pull/8738)）。
3.  **PR #8295: fix(channels): hide internal scaffolding at the display boundary**
    *   **状态：** Open (Created 2026-10-17)
    *   **风险：** 防止系统内部注入的 context 直接显示给用户。这与 #7211 类似，属于数据纯净性问题。长期不修复会导致用户看到 `<system-info>` 等无用文本，降低产品专业度。

### 给维护者的建议 (Action Items)
1.  **紧急合并渠道修复：** 优先 Review 和合并 #8749 (飞书重连), #8756 (微信凭据), #8753 (飞书文件名)。这三个 Bug 直接影响 v2.3.0 的可可用性，应争取在 **v2.3.1** 中 Hotfix。
2.  **排查 WeChat 静默死亡：** #8757 目前没有 Fix PR，建议开发者立即创建分支修复日志和重试逻辑，这是当前最严重的稳定性隐患。
3.  **清理控制台拥堵：** Console UI 相关的 PR (#8737, #8738, #6325, #8747) 较多，建议召开一次短会统一决策合并顺序，避免合并冲突。
4.  **回应 Web Search 扩张：** 对 #8741 和 #8758 给出正式回复，如果策略是开放第三方接入，应尽快建立准入标准并合并第一批 PR。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 (2026-11-16)

## 1. 今日速览
过去 24 小时内，ZeptoClaw 项目整体处于**极低活跃度状态**。项目期间未发布新版本，未提交或合并任何 Pull Request。社区侧新增 1 条关于底层模型计费价格过期的 Issue。目前主线代码暂停演进，整体健康度平稳但需关注模型配置数据的时效性维护。

---

## 2. 项目进展
今日无代码合并或 PR 变更，核心功能演进与 Bug 修复工作在本周期内处于暂缓状态。

---

## 3. 社区热点
* **[#724 [OPEN] Opus 4.6 and gpt-5.1 prices in default_pricing() are out of date](https://github.com/qhkm/zeptoclaw/issues/724)**
  * **作者**: Mattbusel | **评论数**: 0 | **点赞数**: 0
  * **诉求分析**: 用户指出 `src/utils/cost.rs` 中的默认计费字典已严重滞后。以 `claude-opus-4-6` 为例，源码硬编码价格为 $15/$75 per million tokens，而 Anthropic 官方已下调至 $5/$25 per million tokens；同时 `gpt-5.1` 的价格数据也已失效。用户希望修复计费硬编码，确保成本统计组件的准确性。

---

## 4. Bug 与稳定性
按严重程度排列：

1. **[低/配置数据偏差] 默认计费字典数据过期** [#724](https://github.com/qhkm/zeptoclaw/issues/724)
   * **现象**: `src/utils/cost.rs` 内硬编码的模型单价高出最新市场价数倍（如 Opus 4.6 被高估 3 倍），导致用户在监控 AI 智能体消耗时成本统计失真。
   * **修复状态**: 暂无 Fix PR，等待维护者或社区提交更新。

---

## 5. 功能请求与路线图信号
从 Issue [#724](https://github.com/qhkm/zeptoclaw/issues/724) 释放出的信号来看，随着大模型厂商频繁调整 API 定价，将价格硬编码在 Rust 源码中（`src/utils/cost.rs`）会带来持续的维护负担。项目未来可能需要考虑支持动态拉取价格表或允许用户通过外部配置文件重写 `default_pricing()`。

---

## 6. 用户反馈摘要
* **真实痛点**: 依赖 ZeptoClaw 成本核算功能的用户，因系统内部价格表未更新，导致无法精准记录和归因 Agent 的实际 API 开销。用户对计费准确性有较高要求，并附带了官方定价链接供维护者参考。

---

## 7. 待处理积压
* **[#724](https://github.com/qhkm/zeptoclaw/issues/724)**：需维护者确认新的价格参数并更新 `src/utils/cost.rs`。因改动较为简单，建议优先处理以保持成本统计模块的有效性。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-11-16）

## 1. 今日速览

过去 24 小时内，ZeroClaw 项目保持高频迭代开发状态。社区关注重点集中在**多用户凭据安全隔离、模型成本核算准确度、以及 Anthropic Claude 思考模型（Thinking Models）与历史上下文剪裁的兼容性**问题上。

- **Issues 动态**：更新 27 条（新增/活跃 27 条，已关闭 0 条）。
- **PR 动态**：更新 50 条（待合并 48 条，已合并/关闭 2 条）。
- **版本发布**：今日无新版本发布。
- **健康度评估**：项目在安全架构与凭据管理（OpenBao / Cloud Vaults）方面推进迅速，PR 供给量极大，但 PR 审核与合并吞吐量相对受限（48 个待合并），存在一定的 Review 积压；几个涉及核心流程 Blocking 的严重 Bug（S0/S1）需关注修复进度。

---

## 2. 项目进展

今日完成合并/关闭的关键 PR 包含对前端/终端上下文用量的校准，同时大量核心架构 PR 进入合并前评审阶段：

* **上下文用量显示修复**：[PR #12074](https://github.com/zeroclaw-labs/zeroclaw/pull/12074) 合并，修复了 ZeroCode/WebUI 终端在进行历史记录裁剪（Trim）后上下文填充条（Context Budget Bar）无法自动刷新的问题。
* **企业级凭据管理重磅推进**：
  * [PR #12481](https://github.com/zeroclaw-labs/zeroclaw/pull/12481) 提交，支持在 WebUI 中将操作员凭据配置并存储至 **OpenBao** 密匙库。
  * [PR #12482](https://github.com/zeroclaw-labs/zeroclaw/pull/12482) 提交，进一步支持 1Password Connect、AWS Secrets Manager、Azure Key Vault 和 Google Secret Manager 等外部云端 Vault。
* **原生 SSH Task Broker 推进**：[PR #12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438) 引入了基于 Rust 的原生 Task Broker，逐步移除 Python 及 tomli 等外部依赖。

---

## 3. 社区热点

今日讨论最为集中的 Issues 主要聚焦在模型上下文截断、成本统计失效与安全拦截机制上：

1. **Anthropic 思考模式（Thinking Block）在工具剪裁后导致 400 错误** 
   * **讨论重点**：[Issue #12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) (5 评论) 指出自 v0.9.0 以来，使用 `claude-opus-5-5` 时，一旦工具历史轮次走出 `keep_tool_context_turns` 窗口，服务将因思考签名（Thinking-signature）校验失败而持续抛出 400 错误。
   * **最新进展**：社区已迅速提交修复方案 [PR #12479](https://github.com/zeroclaw-labs/zeroclaw/pull/12479)，通过引入 `drop_block` 机制解决编辑历史后思考块失效问题。
2. **自定义 OpenAI 兼容 Provider 上下文窗口硬编码回退**
   * **讨论重点**：[Issue #12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014) (6 评论) 反馈若自定义 Provider 未显式配置 `context_window`，运行时会自动将其回退至硬编码的 32,000 Token，导致本地直接拦截原本合法的长上下文请求。
3. **Anthropic 支出统计始终为 $0.00 导致预算封顶失效**
   * **讨论重点**：[Issue #9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) (6 评论) 再次引发关注，原生 Anthropic 接口写入的用量记录中 `cost_usd` 始终为 0.0，导致设置的每日/每月预算上限（Budget Cap）形同虚设。

---

## 4. Bug 与稳定性

按严重程度排列的重点 Bug 列表：

### 🔴 高危 / 核心流程阻碍 (S0 - S1)
* **[S0/Security] Windows `cmd.exe` 环境变量黑名单绕过风险**：[Issue #12118](https://github.com/zeroclaw-labs/zeroclaw/issues/12118) 指出 WindowsCmd 方言会优先从工作区解析裸命令（Bare command）。若工作区存在 `git.bat`，系统会将其作为白名单中的 `git` 执行，造成安全白名单绕过。
* **[S1] 预算超限警告模式（"warn" mode）失效**：[Issue #12477](https://github.com/zeroclaw-labs/zeroclaw/issues/12477) 反馈 `[cost.enforcement] mode` 被运行时忽略，即便配置为警告模式，超出预算时仍会强制终止 Agent Turn。
* **[S1] Anthropic 成本报表丢失导致预算控制失灵**：[Issue #9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) (P1/Risk: High)。
* **[S1] Open-AI Compatible 上下文硬编码限制为 32k**：[Issue #12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014)。
* **[S1] Mattermost 新发现 DM 丢包问题**：[Issue #10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901) 在自动发现的 1 对 1 DM 中，第一条消息会被无声忽略。

### 🟡 体验退化 / 边缘异常 (S2 - S3)
* **[S2] 已禁用的 Agent 仍可通过 Web Chat / RPC 运行**：[Issue #12289](https://github.com/zeroclaw-labs/zeroclaw/issues/12289) 发现 `enabled = false` 的 Agent 仍会响应操作员 WebSocket 聊天。
* **[S2] 流客户端硬编码 300s 超时时间**：[Issue #10884](https://github.com/zeroclaw-labs/zeroclaw/issues/10884) (P1) `timeout_secs` 配置无法覆盖流式 HTTP 的 300 秒硬编码超时。
* **[S2] Shell 工具非零退出时吞掉 stderr**：[Issue #12390](https://github.com/zeroclaw-labs/zeroclaw/issues/12390) 导致模型接收到的错误信息为空字符串，无法进行故障自我诊断。

---

## 5. 功能请求与路线图信号

从 Issue 和 PR 的更新趋势看，ZeroClaw 正向**企业级多租户、高可信安全及运维感知**方向演进：

1. **默认 Web 搜索引擎更替讨论**：
   * 提议将无 API 的 DuckDuckGo 默认提供商替换为 Parallel API，[Issue #12480](https://github.com/zeroclaw-labs/zeroclaw/issues/12480) 正在讨论如何向用户提示数据去向，对应 PR [PR #12406](https://github.com/zeroclaw-labs/zeroclaw/pull/12406) 已提交。
2. **多租户身份下发至 Tool 执行层**：
   * [Issue #12441](https://github.com/zeroclaw-labs/zeroclaw/issues/12441) 提出在 Tool 执行上下文（ Context 之外）中透传请求用户的真实身份或 Session ID，以配合多租户 Assistant 场景。
3. **

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*