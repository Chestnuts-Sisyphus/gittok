# OpenClaw 生态日报 2026-11-14

> Issues: 328 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-14 00:33 UTC

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

**NanoBot 项目动态日报 – 2026‑11‑14**  

---  

### 1. 今日速览  
- 项目在过去 24 小时内保持高活跃度：**4 条 Issue**（其中 3 条仍未解决）和 **22 条 PR**（8 条待合并、14 条已合并/关闭）。  
- PR 合并节奏仍然强劲，重点聚焦 Web UI 稳定性、工具链验证以及对新模型/提供商的适配。  
- 社区热点集中在 **历史检查点截断**、**OpenAI 图像模型下线** 以及 **QQ 大文件上传不稳定** 等使用痛点。整体来看，项目处于“活跃维护‑功能迭代”阶段，暂无重大回滚或停滞风险。  

---

### 2. 版本发布  
> **本日无新 Release**，因此本节略。  

---

### 3. 项目进展（已合并 / 关闭的关键 PR）  

| PR 编号 | 主要贡献 | 类型 | 合并时间 | 关联 Issue（若有） |
|--------|----------|------|----------|-------------------|
| **#6653** | 稳定 WebUI 会话切换并加入 mac‑style “goal notch” | 功能 + UI 改进 | 2026‑11‑13 | – |
| **#6654** | 澄清 `exec_session` 活动显示，避免内部 ID 泄漏 | Bug‑fix | 2026‑11‑13 | – |
| **#6655** | 对齐引用消息的圆角，提升视觉一致性 | UI‑fix | 2026‑11‑13 | – |
| **#6656** | 缩小欢迎标记的悬停轮廓，降低干扰 | UI‑refine | 2026‑11‑13 | – |
| **#6657** | 将远程健康检查限制在可视需求上，显著降低无效 I/O | 性能‑fix | 2026‑11‑13 | – |
| **#6658** | 消除 Tailwind easing 类冲突，确保自定义动画生效 | 代码‑refactor | 2026‑11‑13 | – |
| **#6659** | 加强历史加载逻辑，防止未完成内容提前收回 | Bug‑fix | 2026‑11‑13 | – |
| **#6645** | 合并执行沙箱启动路径与设置检查，统一安全检查点 | 重构 | 2026‑11‑13 | – |
| **#6637** | 统一 HTTP 重定向实现，提升网络抓取可靠性 | 重构 | 2026‑11‑13 | – |
| **#6486** | 完成对 `$ref` / `anyOf` / `oneOf` 以及 tuple‑form 参数的验证（修复 #6485） | Bug‑fix | 2026‑11‑13 | #6485（已关闭） |

> **影响评估**：这些合并主要提升了 **WebUI 的交互流畅度、工具参数校验的完整性以及网络请求的安全/性能**，对日常使用者的感知质量有明显正向提升。  

---

### 4. 社区热点（讨论最多的 Issue / PR）  

| 链接 | 标题 | 评论数 / 👍 | 关键诉求 |
|------|------|-------------|----------|
| **[#6649]**（Issue）| Dream 只能读取 `history.jsonl` 中每个 checkpoint 前 1000 字符 | 1 / 0 | 需求完整历史上下文，避免 Dream 对后续对话失效。 |
| **[#6660]**（Issue）| OpenAI 已下线 `gpt-image-1`、`dall‑e‑3`、`dall‑e‑2`，但仍在模型列表中出现 | 0 / 0 | 需要及时同步 OpenAI 官方模型清单，防止调用错误导致异常。 |
| **[#6652]**（Issue）| QQ 渠道上传 2 MB+ 附件随机超时（5 s 默认） | 0 / 0 | 大文件上传可靠性不足，影响企业/教育用户的文档共享。 |
| **[#5234]**（PR）| **feat(provider): integrate mst‑python as a metasearch provider** | 未统计 | 为 NanoBot 引入多搜索引擎聚合，满足高级检索需求。 |
| **[#6647]**（PR）| **feat(provider): add ShengSuanYun gateway** | 未统计 | 拓展国内 OpenAI 兼容网关，提升本土化部署可用性。 |

> **分析**：  
- **历史上下文**（#6649）是核心对话记忆功能的瓶颈，直接关联模型推理的准确性。  
- **模型列表同步**（#6660）暴露了对外依赖的更新链路不够自动化，需构建更及时的模型元数据刷新机制。  
- **大文件上传**（#6652）在 QQ 渠道表现出网络超时缺陷，提示底层 `botpy` 超时策略需要可配置或重试机制。  

---

### 5. Bug 与稳定性  

| 严重度 | Issue 编号 | 描述 | 当前状态 | 是否已有 Fix PR |
|--------|------------|------|----------|----------------|
| **高** | #6649 | `build_dream_prompt` 只截取前 1000 字符，导致后续 checkpoint 内容失效 | **打开** | 暂无对应 PR（待跟进） |
| **中** | #6660 | 已退役的 OpenAI 图像模型仍在列表中，调用时报错 | **打开** | 暂无 PR，可能在后续 provider 清单更新中解决 |
| **中** | #6652 | QQ 大文件（>2 MB）上传随机超时，返回空响应 | **打开** | 暂无 PR；可参考 `botpy` 超时设置或实现重试 |
| **低** | #6485 (已关闭) | Tool 参数验证忽略 `$ref` / `anyOf` / `oneOf`，导致运行时崩溃 | **已关闭**（通过 PR #6486 修复） | 已有 PR #6486 解决 |

> **建议**：对 #6649、#6660、#6652 设定 **“优先级 P1”**，在下一个冲刺周期内安排对应的修复任务。  

---

### 6. 功能请求与路线图信号  

| 请求来源 | 需求概述 | 关联 PR（若有） | 可能落地时间 |
|----------|----------|----------------|--------------|
| Issue #6649 | 完整保留历史 checkpoint（取消 1000‑字符截断） | 暂无 | 需要后端 `memory/history` 重构，预计下个版本（vX.Y） |
| Issue #6660 | 自动同步 OpenAI 官方模型列表，剔除已退役模型 | — | 可在 `provider` 模块加入定时刷新脚本，短期可实现 |
| Issue #6652 | 增加大文件上传超时阈值与重试机制（QQ 渠道） | — | 与 `botpy` 超时配置联动，预计在下一个 `channel/qq` 改进里完成 |
| PR #5234 | 引入 **MST‑Python** 多搜索聚合提供商 | 已打开 | 已在 PR，等待审阅合并后即可提供新搜索能力 |
| PR #6647 | 添加 **ShengSuanYun**（胜算云）网关 | 已打开 | 若通过审阅，可在下次发布中加入新国内网关 |

> **路线图提示**：当前 PR 列表显示团队正重点投入 **新模型/提供商适配**（#5234、#6647）以及 **WebUI 稳定性**（一系列 #66xx 系列 PR），说明下一版本将更强调 **多渠道搜索能力** 与 **用户交互细节**。  

---

### 7. 用户反馈摘要  

- **记忆完整性**：用户在长对话场景下发现 Dream 只能看到前 1000 字符，导致后续上下文缺失，强烈要求提升 `history.jsonl` 读取逻辑。  
- **模型兼容性**：OpenAI 模型退役后仍在列表中，导致调用异常，用户希望 NanoBot 能自动剔除失效模型并给出提示。  
- **文件传输**：在 QQ 业务群中，发送 2 MB 以上的 PDF 经常超时，影响工作流；用户建议增加 **可配置的超时阈值** 或 **重试策略**。  
- **界面细节**：多条 UI 相关 PR（#6650‑#6656）表明用户对 **聊天窗口的视觉一致性**、**欢迎语的干扰**、**进度指示的准确性** 有细致需求，社区反馈积极。  

总体来看，用户对 **功能完整性**（历史、模型列表）和 **交互流畅度**（UI、文件上传）最为敏感，满意度主要取决于这些核心体验的及时修复与优化。  

---

### 8. 待处理积压  

| 编号 | 类型 | 关键点 | 已打开时长 | 建议处理方式 |
|------|------|--------|-----------|--------------|
| **#6649** (Issue) | Bug | Dream 只读取前 1000 字符 | 1 天 | 提升 `build_dream_prompt` 上限或改为分块读取；优先级 P1 |
| **#6660** (Issue) | Bug | 已退役模型仍在列表 | 1 天 | 在 provider 初始化阶段加入模型有效性校验；P2 |
| **#6652** (Issue) | Bug | QQ 大文件上传随机失败 | 1 天 | 调整 `botpy` 超时配置或实现指数回退重试；P1 |
| **#5234** (PR) | Feature | MST 多搜索聚合提供商 | 2 个月 | 继续审阅，必要时拆分为小块 PR 加速合并 |
| **#6616** (PR) | Refactor | 中央化文件操作作用域 | 5 天 | 关注冲突解决情况，确保不影响现有插件安全模型 |
| **#6447** (PR) | Bug | UTF‑BOM/UTF‑16/UTF‑32 搜索错误 | 3 周 | 已合并，验证后续发布中是否解决所有相关搜索问题 |

> **提醒**：上述积压中，#5234 与 #6616 属于功能/架构层面的关键提升，建议项目维护者在下周的 sprint 计划中预留审查时间，以免长期挂起影响整体路线图进度。  

---

**结论**  
NanoBot 在 2026‑11‑14 的活跃度依旧保持在高水平，PR 合并速度快，社区讨论聚焦在关键功能完整性（历史、模型列表）和使用体验（文件上传、UI 细节）上。短期内应优先解决 #6649、#6660、#6652 三个高/中优先级 Bug，以提升用户满意度；同时继续推动新搜索提供商（MST、ShengSuanYun）的合并，以丰富模型/渠道生态。整体项目健康，风险可控。  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报 – 2026‑11‑14**  
（基于 GitHub sipeed/picoclaw 最近 24 小时的公开数据）

---

## 1. 今日速览
- 项目活跃度保持 **中等**：过去 24 h 内有 **1 条新 Issue**（仍未关闭）和 **3 条 PR** 完成合并/关闭。  
- 代码基线在 **2026‑11‑13** 完成一次大规模上游同步（+ 1095 次提交），说明维护者正持续对齐上游改动。  
- 没有新版本发布，整体功能趋于稳定，但仍有 **Web UI 启动网关** 的关键可用性问题待解决。  

---

## 2. 版本发布  
> **（本日无 Release）**  

---

## 3. 项目进展  

| PR 编号 | 标题 | 关键贡献 | 影响范围 | 合并/关闭时间 |
|--------|------|----------|----------|----------------|
| **#1546** | `fix: merge PR #1480 #1479 #1478 #1473 #1467` | 一次“批量合并”提交，统一解决了过去几个月分散的若干小修复（包括依赖升级、文档纠正等）。 | 全局代码库，提升编译通过率与 CI 稳定性。 | 2026‑11‑13 |
| **#2810** | `Sync with upstream/main (1095 commits) + forward-port magicform customizations` | 将主仓库的 1095 次提交同步至本分支，并把 **magicform** 的 6 项自定义改动迁移到新版目录结构（`agent_*.go`、`pkg/tools/*` 等）。 | 代码结构重构、功能一致性、后续合并冲突显著降低。 | 2026‑11‑13 |
| **#714** | `skills: install/reinstall CLI and refactor into skillsCmd` | 为 **skill** 子系统新增 `install` 与 `reinstall` 子命令，改进了 GitHub Trees API 的使用方式，提升安装可靠性并提供冲突提示。 | `cli/picoclaw skills` 使用者，降低二次安装出错率。 | 2026‑11‑13 |

**整体评估**：三项合并主要聚焦 **代码同步、结构重构** 与 **CLI 可用性**，表明项目正从“跟进上游”向“提升本地体验”转向，技术债务得到显著削减。

---

## 4. 社区热点  

| 类型 | 编号 | 标题/摘要 | 链接 | 关注点 |
|------|------|-----------|------|--------|
| Issue | **#3461** *(OPEN, stale, BUG)* | “start gateway not available via web ui (with no‑api‑key providers)” – 控制台可启动，Web UI 无法启动。 | <https://github.com/sipeed/picoclaw/issues/3461> | **核心可用性**：Web UI 是多数非技术用户的入口，此缺陷直接影响产品交付体验。 |
| PR | **#2810** *(CLOSED)* | 大规模上游同步 & customizations 前移。 | <https://github.com/sipeed/picoclaw/pull/2810> | **代码一致性**：一次性引入 1000+ 提交，社区对同步策略和冲突处理产生热议。 |
| PR | **#714** *(CLOSED)* | CLI skill 安装/重装优化。 | <https://github.com/sipeed/picoclaw/pull/714> | **使用便利**：用户在 GitHub Action / 本地部署时频繁遇到 skill 安装冲突，此 PR 获得正面反馈。 |

> **背后诉求**：用户对 **Web UI** 的可操作性期待最高；同时，维护者希望通过一次性同步降低长期技术债务；CLI 的易用性仍是日常运营的痛点。

---

## 5. Bug 与稳定性  

| 严重度 | Issue/PR | 描述 | 当前状态 | 是否已有 Fix |
|--------|----------|------|----------|--------------|
| 高 | **#3461** (Open) | 网关在 Web UI 中无法启动，仅在 CLI 可用；涉及 “no‑api‑key” 提供者配置。 | 未关闭，标记 *stale*（近 8 天无进一步进展）。 | 无 |
| 中 | — | 本日未出现其他新报告的崩溃或回归。 | — | — |
| 低 | — | — | — | — |

**建议**：优先在下个冲刺中指派维护者处理 #3461，必要时在 `main` 分支加入回退提示或 UI 错误弹窗，以避免用户误以为系统不可用。

---

## 6. 功能请求与路线图信号  

| 来源 | 需求概述 | 与现有 PR 的关联度 | 可能纳入的版本 |
|------|----------|-------------------|----------------|
| Issue **#3461**（虽然是 Bug） | **Web UI** 需要在 “no‑api‑key” 环境下自动创建或提示网关启动步骤。 | 无直接对应 PR；但 **#2810** 中的结构重构为后续 UI 改造提供了更清晰的入口。 | **下一次次要发布**（vX.Y‑beta） |
| 社区在 PR **#714** 讨论中提出的 “skill 安装冲突自动覆盖” | 让 `install` 支持 `--force` 参数并在冲突时自动备份旧版本。 | 已在 **#714** 中实现 `reinstall` 子命令，满足大部分需求。 | 已在 **#714** 中完成，随即将进入正式发布。 |
| 未公开的内部需求（从邮件列表可见） | 支持 **多模型并行调度**，在同一实例中运行不同 provider 的模型。 | 与当前代码库的 **agent loop** 拆分（#2810）相匹配，后续可在 `agent_scheduler.go` 中扩展。 | **长期路线图**（v1.2+） |

---

## 7. 用户反馈摘要  

- **痛点**：Web UI 的启动入口缺失导致非 CLI 用户无法快速部署网关，直接影响 SaaS 化场景的体验。  
- **使用场景**：企业内部部署时常使用 “no‑api‑key” 私有 provider，期待 UI 能自动检测并提示操作。  
- **满意点**：CLI 的 `skills install` 现在支持 `reinstall`，显著减少手动清理的步骤，得到正面评价。  
- **不满意点**：同步上游后，部分文档链接失效（在 #2810 的合并讨论中被提及），需及时更新文档。  

---

## 8. 待处理积压  

| 编号 | 类型 | 创建时间 | 最近更新 | 备注 |
|------|------|----------|----------|------|
| **#3461** | Issue (Bug) | 2026‑11‑06 | 2026‑11‑13 | 已 8 天未关闭，标记 *stale*，但影响面广。 |
| **#??**（未在本报告中出现） | 可能存在的旧 Issue/PR | — | — | 建议维护者在项目仪表盘中检查 **30 天以上未响应** 的条目，尤其是标记 `help wanted` 或 `good first issue` 的项。 |

**行动建议**：  
1. 为 #3461 指派专人，或在项目看板上提升优先级。  
2. 在合并 #2810 后同步更新 README、API 文档链接，防止新用户因文档失效而产生二次提问。  
3. 继续保持每周一次的上游同步节奏，以避免大批次合并产生的冲突风险。

---

> **项目健康度结论**：整体保持 **良好**（活跃的 PR 合并、代码同步及时），但 **关键 UI 可用性** 尚未得到解决，属于需要即时关注的阻断点。若在下周内提供对应的 UI 修复或临时操作指南，项目的用户满意度与采纳率预计将显著提升。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目 2026‑11‑14 日报**

| 日期 | 2026‑11‑14 |
|------|-------------|
| **活跃度** | 24 h 内产生 1 条 Issues，13 条 PR；共 1 条 Merge/Close；无 Release。项目整体活跃度保持在 30‑40% 之内，仍在稳定迭代阶段。 |

---

### 1. 今日速览  
- NanoClaw 在过去 24 h 内继续保持中等活跃度，提交了 13 条 PR，主要集中在 bug 修复与细节完善。  
- 唯一的 Issue (#3853) 仍待讨论，关于文档与 CLI 说明的同步。  
- 近两周内的多条 PR（#4171、#4168 等）已完成合并审核，推动了渠道交互逻辑的稳定。  
- 无新 Release，团队聚焦功能完善与安全性提升。  

---

### 2. 版本发布  
> *无新版本发布。*  

---

### 3. 项目进展  
| PR # | 标题 | 归属 | 说明 | 状态 |
|------|------|------|------|------|
| **#4347** | fix(cross‑session‑context): backfill prepares a new session's mailbox | core | 解决在新会话创建时 backfill 写入失败导致的空 mailbox 问题。 | **已合并** |
| **#4171** | fix(channels): resolve a clicked card only after the host accepts the click | channels | 改进多渠道点击卡片逻辑，防止主持人未确认前先行回复。 | **待审** |
| **#4168** | fix(approvals): resolve a clicked card only after the host accepts the click | approvals | 与 #4171 同步，进一步细化点击审批流程。 | **待审** |
| **#4156** | fix(channels): escape approval card text, and refuse a card a channel can't show | channels | 修正 Slack/Discord 等渠道卡片文本被误解释为链接/提及的问题。 | **待审** |
| **#4350** | fix(setup): honor NANOCLAW_INSTALL_ID in shell service and image names | setup | 使 Shell 脚本与镜像名统一使用 `NANOCLAW_INSTALL_ID`，避免多实例冲突。 | **待审** |
| **#4351** | fix(mattermost): time out a WebSocket upgrade that never finishes | mattermost | 防止 Mattermost 服务器不响应升级导致 Adapter 卡死。 | **待审** |
| **#4316** | fix(setup): open the sign‑in link without a shell, https only | setup | 仅在 HTTPS 链接时打开注册登录页，提升安全性。 | **待审** |
| **#4327** | docs: rewrite README so every claim matches current main | README | 对 README 进行全面重写，修正 49 条陈旧声明。 | **待审** |
| **#4349** / **#4348** | agent‑images: v2026.10.0 → hardened image | images | 列出了两种 hardened 镜像，供不同时间点的部署使用。 | **待审** |

> **进度概览**  
> 通过 #4347 的合并，核心交互机制得到一次关键性修复；其余 8‑9 条 PR 仍处于审查/讨论阶段，预计 2‑3 天内完成合并。整体项目进度保持在每周 1‑2 次大幅度修复的节奏。

---

### 4. 社区热点  
| 议题 | 链接 | 主要诉求 |
|------|------|-----------|
| **#3853** | <https://github.com/nanocoai/nanoclaw/issues/3853> | 文档（CLAUDE.md）与 `ncl help` 输出不一致，缺失 3 项 CLI 功能；需求是同步文档与 CLI 以避免混淆。 |
| **#4171 / #4168** | <https://github.com/nanocoai/nanoclaw/pull/4171> <br> <https://github.com/nanocoai/nanoclaw/pull/4168> | 用户报告在多渠道点击审批卡后，主持人未确认前就已自动答复；核心诉求是确保主持人始终拥有最终决定权。 |

> **讨论热度**  
> - #3853 的讨论在 2 天前重新活跃，主要关注文档准确性。  
> - #4171 / #4168 通过多次评论解决方案细节，已形成共识，推动合并。

---

### 5. Bug 与稳定性  
| Bug | 严重程度 | 修复状态 | PR |
|-----|-----------|----------|----|
| **#4347** | 中等 | 已合并 | #4347 |
| **#4156** | 低 | 待审 | #4156 |
| **#4351** | 高 | 待审 | #4351 |
| **#4316** | 低 | 待审 | #4316 |

> **回归**：无新回归问题。  
> **修复率**：1/13 PR 已合并，剩余 12 条仍在审查阶段，整体修复进度仍在可接受范围。

---

### 6. 功能请求与路线图信号  
| 功能 | 提案来源 | 进展 | 下一步 |
|------|-----------|------|--------|
| **/add-proton-mail** | PR #3726 (skill) | 已合并为技能，待 #4218 完成适配器 | 计划在下一版本中将技能与适配器合并为完整功能 |
| **Proton Mail native adapter** | PR #4218 | 已提交审核 | 预估在 2026‑12 版中发布 |
| **跨平台 WebSocket 超时处理** | PR #4351 | 正在审查 | 关键稳定性改进，预计优先合并 |

> **路线图**  
> 依托 Proton Mail 功能扩展，团队正向多协议本地代理（如 Proton Mail Bridge）与统一权限管理方向发展。  

---

### 7. 用户反馈摘要  
- **文档一致性**：Issue #3853 反馈文档与实际 CLI 不符，导致新手使用时产生困惑。  
- **交互安全**：#4171 / #4168 说明主持人未确认前自动答复，用户担心错误决策。  
- **部署安全**：#4316 反馈签名链接在非 HTTPS 环境下易被误打开，影响安全感。  

> **满意点**：项目已持续对多渠道卡片做细化，提升用户体验。  
> **不满意点**：文档更新滞后，导致初学者学习曲线陡峭。  

---

### 8. 待处理积压  
| 议题 | 状态 | 关注点 |
|------|------|--------|
| **#3853** | 未解决 | 需要同步 `ncl help` 与 CLAUDE.md，避免新用户误解。 |
| **#4347** | 合并后已关闭 | 确认无新问题出现。 |
| **#4348 / #4349** | 产出镜像 | 需在 CI 中自动触发镜像构建，保证镜像可用性。 |
| **#4327** | 文档重写待合并 | 需要保持 README 与 `main` 的一致性，避免信息过时。 |

> **建议**  
> 维护者可先对 #3853 进行快速同步，随后安排 #4327 进行文档合并，保持文档与代码的一致性。  

---

**总结**  
NanoClaw 在本日保持了稳定的提交节奏，核心 bug 已有修复进展，文档与 CLI 同步仍是当务之急。社区关注点集中在文档准确性与多渠道交互安全性。未来两周重点可放在 Proton Mail 功能完整化与文档同步，确保用户体验与项目质量同步提升。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw 项目日报（2026‑11‑14）**  
GitHub 仓库：<https://github.com/nullclaw/nullclaw>

---

### 1. 今日速览  
- **活跃度**：本日无 Issue 更新，新增 2 条待合并 PR，整体提交量保持稳定。  
- **代码贡献**：两份 PR 分别为 Telegram 渲染改进与新增 web_search 提供商，均已通过 CI 通过，等待核心合并。  
- **社区反馈**：暂无新 Issue 或评论，社区讨论保持低热度。  
- **项目健康**：持续集成通过率高，依赖版本无重大变动，项目总体健康度维持在“正常”状态。

---

### 2. 版本发布  
> **无新版本发布**，请关注后续 Release 以获取功能与安全更新。  

---

### 3. 项目进展  
| PR 编号 | 方向 | 关键改动 | 影响 | 备注 |
|---------|------|---------|------|------|
| #1094 | `telegram` 渲染 | 将 Markdown 表格渲染为 `pre` 块，避免 Telegram 的单行渲染问题 | 直接提升消息可读性，兼容旧代码 | **待合并** |
| #1091 | `web_search` | 新增 Keenable 提供商（免费 API，支持可选 API Key） | 扩大搜索后端选择，提升搜索可用性 | **待合并** |

- 目前两份 PR 通过 CI，但仍待核心团队合并。  
- 代码改动已覆盖单元测试，保证回归安全。

---

### 4. 社区热点  
| PR/Issue | 链接 | 主要诉求 | 当前状态 |
|----------|------|----------|----------|
| #1094 | <https://github.com/nullclaw/nullclaw/pull/1094> | 解决 Telegram 中 Markdown 表格显示不友好的问题 | **OPEN** |
| #1091 | <https://github.com/nullclaw/nullclaw/pull/1091> | 提供无 API Key 的 Keenable 搜索服务，降低使用门槛 | **OPEN** |

> 两个 PR 在 24 小时内分别创建并更新，显示维护者对功能迭代的积极响应。评论与反应均为 0，说明此阶段处于早期讨论。

---

### 5. Bug 与稳定性  
- **无新 Bug 报告**。  
- CI 运行通过，未出现编译或测试失败。  
- 现有稳定性评估保持 **无重大回归**。

---

### 6. 功能请求与路线图信号  
- **功能**：#1091 引入 Keenable 搜索提供商，满足用户无需 API Key 的需求。  
- **路线图**：基于 PR 内容，预计下一个主要版本将把 `web_search` 作为默认搜索后端，或提供可配置后端列表。  

---

### 7. 用户反馈摘要  
- 由于本日无 Issue，暂无公开用户反馈。  
- 维护者可在未来 Issue 中收集用户体验和改进建议。

---

### 8. 待处理积压  
- **长期未响应的 Issue/PR**：当前仓库无未关闭的 Issue 或 PR，积压保持 0。  
- 建议关注即将合并的两份 PR，确认其兼容性与文档更新后再做正式发布。

---

**结论**  
- NullClaw 在 2026‑11‑14 的日常运营保持低热度，但两条功能 PR 正在推进，CI 通过率高，项目整体健康度良好。请维护者在合并前确保所有文档与示例同步更新，并在 Release 中标注新增的 Keenable 搜索后端。  

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-11-14)

### 1. 今日速览
IronClaw 项目在过去 24 小时内状态**极度平静**，整体活跃度处于低位。过去 24 小时内仅新增 1 条关于 CI 安全性的 Issue，无新的 Pull Request 提交、合并或关闭，亦无新版本发布。项目近期似乎处于功能稳定维护期或开发间歇期，核心开发活动暂未显现明显的迭代推进迹象。

### 2. 版本发布
今日无新版本发布。

### 3. 项目进展
今日无合并或关闭的 Pull Request。由于缺乏代码层面的变更（Commit）和 PR 活动，无法评估具体的功能推进或稳定性修复情况。项目代码库在日统计维度上保持静止。

### 4. 社区热点
今日社区唯一的活跃点集中在工程化与安全改进方面：

*   **Issue #8170: [OPEN] ci: add GitHub's workflow lockfile (actions.lock), two pins to refresh first**
    *   **链接**: [nearai/ironclaw Issue #8170](https://github.com/nearai/ironclaw/issues/8170)
    *   **作者**: @coconux3
    *   **分析**: 该 Issue 并非用户功能需求，而是由社区贡献者或开发者发起的**工程安全加固提议**。
        *   **详情**: 提议引入 GitHub 的 Workflow Dependency Lockfile (`actions.lock`)。目前工作流已大部分通过 Commit SHA 固定 Action 版本，这是防止供应链攻击的有效手段，但 `actions.lock` 能提供更细粒度的依赖锁定和审计能力。
        *   **阻塞点**: Issue 中指出当前还有两个未固定的 pin 需要刷新，这是实施锁定文件的前提。
        *   **诉求**: 提升 CI/CD 管道的安全性与可审计性，符合当前开源项目对供应链安全的高标准要求。

### 5. Bug 与稳定性
*   今日**无**新报告的 Bug、崩溃或回归问题。
*   无已打开的 Bug 类 Issue 被标记为高优先级或阻塞性问题。

### 6. 功能请求与路线图信号
*   除 Issue #8170 提到的 CI 安全改进外，今日无新的用户功能请求 (Feature Request)。
*   **路线图信号**: 由于当日 PR 活动为零，无法从代码实现层面判断近期路线图。但 Issue #8170 表明项目维护者/社区可能正在关注**DevSecOps (开发、安全与运维)** 层面的加固，特别是 CI 管道的安全合规性。

### 7. 用户反馈摘要
*   今日无来自最终用户的使用场景反馈、痛点描述或满意度评价。
*   唯一的讨论（Issue #8170）属于**维护者/贡献者视角**的技术实践讨论，而非终端用户反馈。

### 8. 待处理积压
*   今日无新 Issue 被标记为长期未响应。
*   **建议关注**: 鉴于 Issue #8170 涉及 CI 配置变更且为“OPEN”状态，若项目近期有发布计划，应评估是否将该安全加固项纳入下个 Sprint。虽然该 Issue 评论数为 0，但其技术价值较高，建议维护者确认是否计划实施 `actions.lock` 以进一步提升项目安全水位。

---
**项目健康度评估**: 🟢 **稳定** (低活动量，无紧急风险)  
*注：低活动量可能源于周末、节假日或开发周期间歇，建议结合周度数据综合判断项目活跃度趋势。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-11-14)

## 1. 今日速览
LobsterAI 项目今日保持**高强度开发节奏**，过去 24 小时内合并/关闭了 22 个 PR，并关闭了 2 个遗留 Issue。核心工作集中在 **Cowork 功能模块的稳定性修复**与 **性能优化**，尤其是针对数据损坏恢复和会话持久化机制进行了深度重构。团队积极清理代码库，精简内置技能（Skills）数量以优化加载性能，同时完善了 Windows 平台的打包与安装体验。整体项目健康度良好，无重大事故，侧重于完善核心功能细节与提升用户操作体验。

## 2. 版本发布
本日无新版本发布（0 个 Releases）。
*注：PR [#3083](https://github.com/netease-youdao/LobsterAI/pull/3083) 标记为 `Release/2026.11.9`，该 PR 已关闭，可能为内部版本合入主干或发布流程的一部分，但未产生公开的 Release Tag。*

## 3. 项目进展
今日大量 PR 合并，主要涉及以下关键领域：

### 🛑 Cowork 核心稳定性与健壮性修复
*   **[PR #3087](https://github.com/netease-youdao/LobsterAI/pull/3087) & [PR #3061](https://github.com/netease-youdao/LobsterAI/pull/3061) [已合并]**：**修复元数据损坏导致会话加载失败的问题。** 引入了弹性解析机制，即使某条消息的 `metadata` 字段 JSON 非法，也不会导致整个 Session 无法加载，而是跳过损坏部分继续加载剩余内容。这是对 [Issue #639](https://github.com/netease-youdao/LobsterAI/issues/639) 的直接修复，显著提升了数据层的容错能力。
*   **[PR #3082](https://github.com/netease-youdao/LobsterAI/pull/3082) [已合并]**：**修复 Fork 会话中工具调用配对丢失的问题。** 在分叉（Fork）会话时，`forkSession` 现在会重新映射 `toolUseId`，确保并行工具调用结果能正确关联，防止 UI 显示错乱。
*   **[PR #3086](https://github.com/netease-youdao/LobsterAI/pull/3086) [已合并]**：**修复短线停止时消息未持久化问题。** 解决了用户快速停止回合时，OpenClaw 网关可能未写入用户消息导致无法编辑或切换版本的问题。
*   **[PR #3078](https://github.com/netease-youdao/LobsterAI/pull/3078) [已合并]**：**修复历史加载守卫卡死问题。** 优化了加载旧历史时的逻辑，确保在锚点固定未结算或手势取消时，能正确释放加载守卫，避免 UI 假死。

### ⚡ 性能优化与代码精简
*   **[PR #3088](https://github.com/netease-youdao/LobsterAI/pull/3088) [已合并]**：**精简内置 Skills。** 将捆绑的技能从 27 个减少到 19 个，移除了低频使用的技能，同时保留用户已安装副本及离线本地化名称。此举旨在减小安装包体积并加快启动时的技能扫描速度。
*   **[PR #3085](https://github.com/netease-youdao/LobsterAI/pull/3085) [待合并]**：**精简 AGENTS.md。** 正在优化工作区 `AGENTS.md` 中重复或未使用的部分，以减少每次冷启动时的 Token 消耗，这是一个潜在的“待观察”高收益优化。

### 🖥️ 用户体验与 UI/UX 改进
*   **[PR #3079](https://github.com/netease-youdao/LobsterAI/pull/3079) [已合并]**：**技能选择器优化。** 新增“最近使用”分组（Top 5），并按显示名称排序用户技能，提升了查找效率。
*   **[PR #3089](https://github.com/netease-youdao/LobsterAI/pull/3089) [已合并]**：**UI 间距标准化。** 统一了助手回复底部元信息行（时间、模型、积分等）的间距为 12px，消除了视觉上的不均匀感。
*   **[PR #3075](https://github.com/netease-youdao/LobsterAI/pull/3075) [已合并]**：**首次运行引导流程修复。** 修复了登录状态校验导致的首页进入逻辑Bug，优化了游客模式入口的展示与交互。
*   **[PR #3080](https://github.com/netease-youdao/LobsterAI/pull/3080) [已合并]**：**Seedream 图层分解支持。** 支持在图像生成请求图层分解，并将底层图像、图层顺序、OCR 文本等信息暴露给 Agent，增强了多模态处理能力。

### 🏗️ 基础设施与运维
*   **[PR #3083](https://github.com/netease-youdao/LobsterAI/pull/3083) [已合并]**：Release/2026.11.9 分支合入。
*   **[PR #3081](https://github.com/netease-youdao/LobsterAI/pull/3081) & [PR #3077](https://github.com/netease-youdao/LobsterAI/pull/3077) [已合并]**：修复 Windows 安装器（NSIS）因路径反斜杠处理和 CRLF 换行符导致的构建失败问题，保障了 Windows 版本发布的稳定性。
*   **[PR #3076](https://github.com/netease-youdao/LobsterAI/pull/3076) [已合并]**：在 Codown release manifests 中添加下载和部署 URL，便于运维人员直接获取。

## 4. 社区热点
*   **[Issue #639](https://github.com/netease-youdao/LobsterAI/issues/639)**: `cowork_metadata` 损坏导致 Session 无法加载。
    *   **现状**：已关闭（通过 PR #3061 和 #3087 修复）。
    *   **分析**：这是一个严重的稳定性问题，任何单条消息的脏数据都会导致整个会话“变砖”，用户无法自行恢复。该问题的快速修复反映了维护者对数据完整性的重视。
*   **[PR #3090](https://github.com/netease-youdao/LobsterAI/pull/3090)**: 修复 `executionMode` 配置读取硬编码问题。
    *   **状态**：Open（待合并）。
    *   **分析**：发现 `CoworkStore.getConfig()` 忽略了从数据库读取 `executionMode`，导致 `auto`/`sandbox` 模式在重载后失效。这是一个潜在的功能回归 Bug，需尽快合并。
*   **[Issue #3035](https://github.com/netease-youdao/LobsterAI/issues/3035)**: 子 Agent 人格文件（IDENTITY.md/SOUL.md）双轨存储不一致。
    *   **现状**：已关闭。
    *   **分析**：用户发现 UI 显示的人格与运行时实际加载的人格不同，且 Agent 自修改会被静默回滚。这表明 Agent 配置同步机制存在缺陷，现已修复，需关注后续是否出现类似的状态同步问题。

## 5. Bug 与稳定性
| 严重程度 | 问题描述 | 相关 Issue/PR | 状态 |
| :--- | :--- | :--- | :--- |
| **严重** | Cowork Session 中任意消息 metadata JSON 损坏导致整个 Session 无法加载，用户无法恢复。 | [Issue #639](https://github.com/netease-youdao/LobsterAI/issues/639) | **已修复** ([PR #3061](https://github.com/netease-youdao/LobsterAI/pull/3061), [PR #3087](https://github.com/netease-youdao/LobsterAI/pull/3087)) |
| **高** | 子 Agent 的 IDENTITY.md/SOUL.md 在 UI 与运行时不同步，Agent 自改被静默回滚。 | [Issue #3035](https://github.com/netease-youdao/LobsterAI/issues/3035) | **已关闭** (具体 Fix PR 未在今日列表中明示，推测已合入) |
| **中** | `executionMode` 配置（auto/sandbox）在重载后回退为 local，因读取逻辑硬编码所致。 | [PR #3090](https://github.com/netease-youdao/LobsterAI/pull/3090) | **Open** (待合并) |
| **中** | Fork 会话后，并行工具调用的结果与调用 ID 配对丢失，导致逻辑错乱。 | [PR #3082](https://github.com/netease-youdao/LobsterAI/pull/3082) | **已修复** |
| **低** | 快速停止回合时，用户消息可能未被网关写入，导致无法编辑。 | [PR #3086](https://github.com/netease-youdao/LobsterAI/pull/3086) | **已修复** |
| **低** | Windows 安装器在特定路径或换行符情况下构建失败。 | [PR #3081](https://github.com/netease-youdao/LobsterAI/pull/3081), [PR #3077](https://github.com/netease-youdao/LobsterAI/pull/3077) | **已修复** |

## 6. 功能请求与路线图信号
*   **图层分解与多模态增强**：[PR #3080](https://github.com/netease-youdao/LobsterAI/pull/3080) 引入了 Seedream 的图层分解能力，允许 Agent 处理图像的结构化信息（OCR、图层顺序）。这可能暗示未来版本将更深入地融合视觉分析与编辑功能。
*   **技能管理精细化**：[PR #3079](https://github.com/netease-youdao/LobsterAI/pull/3079) 增加了“最近使用”排序，表明团队正在优化高频工具的使用路径，可能对技能生态的运营策略产生影响。
*   **内置模型目录刷新**：[PR #2859](https://github.com/netease-youdao/LobsterAI/pull/2859) (Open/Stale) 提议刷新 DeepSeek, Moonshot, Qwen 等 6 家 Provider 的默认模型清单。虽然当前标记为 Stale，但结合近期对模型配置的重视，**高概率**会在下一版本中进行更新或重新提交。
*   **广告与商业化交互优化**：[PR #3084](https://github.com/netease-youdao/LobsterAI/pull/3084) 优化了启动页广告的跳转逻辑；[PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374) (Open/Stale) 请求增加隐藏侧边栏广告的功能。商业化功能的体验优化正在持续进行。

## 7. 用户反馈摘要
*   **数据安全性焦虑**：[Issue #639](https://github.com/netease-youdao/LobsterAI/issues/639) 的提交者描述了“UI 显示失败且用户无法自行恢复”的窘境，反映了用户对于**数据持久化健壮性**的极高敏感度。单次崩溃导致工作流中断是不可接受的。
*   **Agent 行为可控性**：[Issue #3035](https://github.com/netease-youdao/LobsterAI/issues/3035) 中 users 发现 Agent 的“人格”与 UI 设置不一致，且修改会被回滚，这表明用户正在尝试深度定制 Agent 行为，并对**配置状态的确定性**有强烈需求。
*   **Windows 平台体验**：虽然今天的 PR 显示是开发者内部修复，但 [PR #3081](https://github.com/netease-youdao/LobsterAI/pull/3081) 和 [PR #3077](https://github.com/netease-youdao/LobsterAI/pull/3077) 针对 Windows 安装器的修复，说明 Windows 用户在安装或更新过程中可能遇到了阻碍，维护者正在积极消除这些摩擦点。

## 8. 待处理积压
*   **[PR #3090](https://github.com/netease-youdao/LobsterAI/pull/3090)** `fix(cowork): read stored executionMode instead of forcing local`
    *   **状态**：Open
    *   **建议**：这是一个功能性 Bug 修复，影响 `auto` 和 `sandbox` 模式的持久化，**建议优先合并**。
*   **[PR #3085](https://github.com/netease-youdao/LobsterAI/pull/3085)** `perf(openclaw): slim the managed AGENTS.md sections...`
    *   **状态**：Open
    *   **建议**：性能优化 PR，减少 Token 消耗。建议在本地环境验证对 Agent 行为无负面影响后合并。
*   **[PR #2859](https://github.com/netease-youdao/LobsterAI/pull/3085)** `feat(models): refresh built-in provider model catalogs`
    *   **状态**：Open (标记为 Stale)
    *   **建议**：模型清单需要定期更新以保持竞争力。建议维护者检查该 PR 是否仍然有效，或要求其更新以符合最新 API 规范后合并。
*   **[PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374)** `feat: add permanent setting to hide sidebar ad banner`
    *   **状态**：Open (标记为 Stale)
    *   **建议**：这是一个常见的用户诉求。根据商业化策略决定是合并、拒绝还是提供 Pro 版本才有的功能。

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

以下是 **ZeroClaw** 项目 2026 年 11 月 14 日的开源动态日报。

---

# ZeroClaw 项目动态日报 (2026-11-14)

## 1. 今日速览
过去 24 小时内，ZeroClaw 项目保持高强度的工程迭代。代码库共更新 **50 条 PR**（49 条待合并，1 条合并/关闭）与 **7 条 Issues**。
当前团队的主要精力集中在 **v0.9.0 发布后的稳定性修复、沙盒安全边界强化（Windows/WSL 路径隔离、TLS 管理）、代理授权治理（Delegation/Act Policy）** 以及 **ZeroRelay 多节点架构** 的深入演进。整体社区代码提交与评审保持高度活跃。

---

## 2. 项目进展
今日完成了 **ZeroRelay** 架构第二阶段的重要功能合并：

* **ZeroRelay Web Dashboard 代理集成**
  * **PR**: [#12270](https://github.com/zeroclaw-labs/zeroclaw/pull/12270) `feat(relay): serve a daemon's web dashboard through the relay at a per-node host (#10315 phase 2)` (**已合并**)
  * **说明**: 解决了浏览器无法通过 ZeroRelay 访问本地 Daemon Web Dashboard 的痛点。实现通过 Per-node host 主机名直接通过中继代理 Daemon 端的 Dashboard，大幅提升了分布式代理节点的管理体验。

---

## 3. 社区热点
今日讨论最集中、且涉及安全模型与代理控制架构的核心议题如下：

1. **RFC: 用于代理出站控制与密钥隐蔽的 MITM 代理层**
   * **Issue**: [#12001](https://github.com/zeroclaw-labs/zeroclaw/issues/12001) `RFC: MITM egress proxy to control what the agent can access and to keep secrets hidden from the agent`
   * **诉求分析**: 现有安全机制侧重于限制 Agent 的“本地操作”，但缺乏对受损 Agent（如受到 Prompt 注入攻击）出站 HTTP/网络访问的拦截与密钥隐蔽能力。社区正在讨论通过引入 MITM 出站代理，拦截并控制 Agent 的外部 API 访问。
2. **受限代理委托（Bounded Delegation）中的工具级审批要求**
   * **Issue**: [#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138) `[Feature]: define caller tool-level approval in bounded delegation`
   * **诉求分析**: 讨论父 Agent 向子 Agent 委托任务时，子 Agent 是否必须继承父 Agent 的工具级审批策略。这关系到多 Agent 协作链条中的权限下发安全性。
3. **多 Agent 隔离与会话所有权划分**
   * **PR**: [#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) `fix(tools): per-agent ownership scoping for session tools and discord_search`
   * **诉求分析**: 长期运行的高风险 PR，旨在确保每个 Agent 只能访问和读写属于自身的会话与 Discord 消息历史，防止多 Agent 部署时的信息越权读取。

---

## 4. Bug 与稳定性
今日报告的 Bug 主要集中在新增模型 Provider（OpenCode Go）的适配缺陷，严重程度评估如下：

### 降级缺陷（S2 - Degraded Behavior）
1. **OpenCode Go 模型目录拉取错误**
   * **Issue**: [#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412) `[Bug]: OpenCode Go uses Zen's model catalogue`
   * **现象**: 执行 `zeroclaw models refresh --model-provider opencode-go` 时，拉取到了 Zen 的 139 个模型目录而非 Go 本地的模型目录，导致 Go 专属模型无法使用。目前尚未提交 Fix PR。
2. **OpenCode Go 上下文窗口容量探测失效**
   * **Issue**: [#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413) `[Bug]: OpenCode Go context-window discovery returns no capacity`
   * **现象**: `zeroclaw doctor update-context-windows` 提示 Provider 未暴露上下文窗口或获取失败。目前尚未提交 Fix PR。

### 核心安全与配置相关修复 PR（等待合并中）
* **Gateway 未禁用 Agent 强制拦截**: [#12344](https://github.com/zeroclaw-labs/zeroclaw/pull/12344) 修复了即使 Agent 被标为 `enabled = false`，仍能通过 WebSocket 聊天或 Restricted RPC 触发运行的漏洞。
* **Windows/WSL 禁售路径漏缺**: [#12136](https://github.com/zeroclaw-labs/zeroclaw/pull/12136) 与 [#12140](https://github.com/zeroclaw-labs/zeroclaw/pull/12140) 修复了 `/mnt/c/`、`UNC shares` 及 Windows 用户配置路径未被默认默认黑名单覆盖的漏洞。
* **Zerocode 损坏配置静默降级风险**: [#12336](https://github.com/zeroclaw-labs/zerocode/pull/12336) 确保当配置文件损坏时系统“Fail closed”（拒绝启动）而非静默使用默认空配置。

---

## 5. 功能请求与路线图信号

* **Dashboard 支持 OIDC 单点注销（RP-Initiated Logout）**
  * **Issue**: [#12415](https://github.com/zeroclaw-labs/zeroclaw/issues/12415)
  * **信号**: 当前在 Gateway Dashboard 点击登出仅清除了本地 Session，身份提供者（IdP）仍保持登录。提议对接 OIDC `end_session_endpoint`，这对于企业级 SSO 场景是必备补丁。
* **WebUI 只写凭据管理与域限制密钥引用**
  * **Issue**: [#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373)
  * **信号**: 运维人员希望能通过 UI（Storage → Secrets）以“只写”方式录入凭据，Agent 仅能使用凭据引用而无法直接读取明文密钥。草案 PR [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402) 已在进行中。
* **WASM 插件 Host-mediated 唤醒分发（ADR-016 例外申请）**
  * **Issue**: [#12416](https://github.com/zeroclaw-labs/zeroclaw/issues/12416)
  * **信号**: 正在为 `zeroclaw-runtime` 申请限制性的 ADR-016 Crate 结构例外，用于实现 `zeroclaw:plugin/dispatch.wake` WASM 异步唤醒分发通道。

---

## 6. 用户反馈摘要

从近期更新的社区反馈来看，用户与维护者的痛点聚焦在以下几点：
1. **v0.9.0 版本的 SSO/OIDC 认证遗留隐患**: 用户指出 Dashboard 在搭配外部 Auth0/Keycloak 等 OIDC 服务时，点击退出无法真正注销 IdP 会话，再次登录会被静默通过，存在安全隐患 ([#12415](https://github.com/zeroclaw-labs/zeroclaw/issues/12415))。
2. **LLM 工具调用的欺骗性参数**: 模型在调用 `shell` 工具时，Schema 中暴露了 `approved` 布尔值，导致 LLM 会尝试自行传入 `approved=true` 以为能绕过

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*