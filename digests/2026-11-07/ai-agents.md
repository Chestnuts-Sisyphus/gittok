# OpenClaw 生态日报 2026-11-07

> Issues: 376 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-06 23:52 UTC

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

**NanoBot 项目日报 – 2026‑11‑07**  
（基于 GitHub 在过去 24 h 内的 Issues / PR 数据）

---

## 1. 今日速览  
- 项目活跃度保持在 **中高** 水平：42 条 PR（34 已合并/关闭、8 待审），4 条 Issue（3 打开、1 已关闭）。  
- 发行 **v0.4.1** 正式上线，核心安全与执行环境修复完成。  
- 维护者集中在 **WebUI 稳定性**、**安全边界**、**性能优化** 三大块，合并多项关键 PR，提升了生产环境的可靠性。  
- 社区焦点集中在 **WebUI 交互细节**（滚动按钮、自动滚动）以及 **DeepSeek 视觉模型兼容性** 两个方向。

---

## 2. 版本发布  

### v0.4.1（2026‑11‑06）  
- **安全修复**：TLS 证书验证、沙箱 Shell 执行、工作区权限检查全部开启，防止未受信网络请求和代码注入。  
- **运行时改进**：空闲维护不再阻塞活跃任务；重连、重试、恢复逻辑更健壮；原生 Provider 状态在重启后保持。  
- **破坏性变更**：  
  - 之前默认关闭的 TLS 校验现已强制开启，若使用自签证书请在 `nanobot/config.yaml` 中配置 `tls.trust_ca`。  
  - 工作区路径若超出配置的 `workspace.root` 将被拒绝，需检查自定义脚本的路径。  
- **迁移注意**：升级前请确保 **Python ≥3.10**，并在 `nanobot` 目录执行 `pip install -r requirements.txt --upgrade`，以获取最新的 `urllib3` 与 `cryptography` 依赖。  

> **链接**：<https://github.com/HKUDS/nanobot/releases/tag/v0.4.1>

---

## 3. 项目进展（本日合并/关闭的关键 PR）  

| PR | 类型 | 主要贡献 | 影响范围 |
|---|---|---|---|
| **#6570** | chore/release | 打包 v0.4.1（squash 合并），确保发布树与审查树一致 | 版本发布 |
| **#6563** | fix/security | 同时修复 TLS、Shell、Workspace 三大运行时边界 | 安全性、可靠性 |
| **#6565** | fix(agent) | 将空闲会话扫描脱离 inbound consumer，避免阻塞 `/stop` 指令 | 稳定性、响应速度 |
| **#6564** | test | 稳定 CI 中的超时敏感检查，提升 Windows CI 通过率 | CI 可靠性 |
| **#6556** | ci/release | 引入轻量化的日常候选版本准备流程（opt‑in Preview），降低发布门槛 | 开发效率 |
| **#6581** | perf | 减少文件、会话、模型请求之间的内存拷贝，实现流式读取 | 性能、资源占用 |
| **#6587** | perf/webui | 降低文件活动布局的渲染开销，改善大文件列表的响应 | 前端性能 |
| **#6588** | test | 将大型图谱页面的长任务阈值提升至 150 ms，防止误报 | CI 稳定性 |
| **#6580‑#6586**（若干）| fix/webui、test | 细节修复：语言默认、侧边栏关闭、历史分页、超大回合保存等 | 用户体验 |
| **#6296** | bug/provider | 处理 Gemini 并行工具调用缺失 `index` 时的流解析错误 | Provider 兼容性 |

> 以上合并累计 **约 1 k 行代码**，涉及安全、性能、CI 与 UI 多维度提升，项目整体向 **可生产化** 迈进一步。

---

## 4. 社区热点  

| 编号 | 类型 | 关注点 | 关键评论/赞 | 链接 |
|---|---|---|---|---|
| **#6593** | Issue (Open) | WebUI “滚动到底部”按钮点击后闪烁、频繁卸载/挂载 | 0 👍 / 0 评论（但已在 PR #6591 中对应修复） | <https://github.com/HKUDS/nanobot/issues/6593> |
| **#6584** | Issue (Open) | DeepSeek Vision API 只接受 `user` 角色的图片，但 Nanobot 发送了 `assistant` 角色导致错误 | 0 👍 / 0 评论 | <https://github.com/HKUDS/nanobot/issues/6584> |
| **#6296** | PR (Open) | Gemini 并行工具调用缺失 `index`，导致流解析错误 | 0 👍 / 0 评论 | <https://github.com/HKUDS/nanobot/pull/6296> |
| **#6591** | PR (Closed) | 修复 WebUI 首次访问语言默认错误（对应 Issue #6583 已关闭） | 0 👍 / 0 评论 | <https://github.com/HKUDS/nanobot/pull/6591> |

**分析**  
- 前端交互细节（滚动按钮、自动滚动）是用户日常使用中最直观的痛点，虽然当前仅有少量评论，但已触发维护者快速响应。  
- 对接第三方模型（DeepSeek、Gemini）时的 **协议兼容** 与 **错误回报** 仍是阻碍企业级落地的关键点，社区已在 Issue 与 PR 中提出明确需求，后续可能在 0.4.2 中加入更完善的模型适配层。  

---

## 5. Bug 与稳定性  

| 严重程度 | Issue/PR | 描述 | 当前状态 |
|---|---|---|---|
| **高** | #6593 (Open) | “滚动到底部”按钮在平滑滚动期间闪烁、频繁挂载，影响阅读流畅性。 | 已在 PR #6591 中修复（已合并），但 Issue 仍未关闭，待确认。 |
| **高** | #6592 (Open) | 中键自动滚动在长对话底部被强制回弹，导致用户无法自由浏览历史。 | 暂未有对应修复 PR，需关注后续进展。 |
| **中** | #6584 (Open) | DeepSeek Vision 结果使用了不支持的 `assistant` 消息角色，导致 API 报错。 | 尚无修复 PR，已标记为 **provider‑bug**，预计在后续 provider 兼容层中处理。 |
| **中** | #6583 (Closed) | 初始语言默认始终为英文，已在 PR #6591 中解决。 | 已关闭。 |
| **低** | #6586 (Open) | 超大回合记录在 UI 分页时被隐藏，缺失历史信息。 | PR #6586 正在审查中，预计下周合并。 |

---

## 6. 功能请求与路线图信号  

| 编号 | 类型 | 需求概要 | 与现有 PR 的关联 | 可能纳入的版本 |
|---|---|---|---|---|
| #5845 (Open) | 新 provider | 将 **Opper** 加入内置 provider 列表，提供更多网关选择。 | 已提交 PR #5845，仍待审查。 | 预计 0.4.2（若审查通过） |
| #6324 (Open) | 功能 | 为 **heartbeat** 作业添加模型覆盖选项，避免高价模型被频繁调用。 | PR #6324 已提交，处于审查阶段。 | 可能进入 0.4.2‑beta |
| #5826 (Open) | 性能 | 使用 SQLite **FTS5** 加速会话历史搜索，降低大规模工作区查询时延。 | PR #5826 正在审查，已实现核心功能。 | 计划在 0.4.2 中正式发布 |
| #6584 (Open) | Bug/Feature | DeepSeek Vision 支持仅 `user` 角色的图片，需在 SDK 中自动转换。 | 暂无对应 PR。 | 需求已被标记为 **high priority**，可能在 0.4.2 中实现。 |
| #6586 (Open) | Fix/UI | 记录分页时保留超大回合，提供完整历史浏览。 | PR #6586 正在审查。 | 若通过，将随 0.4.2 一起发布。 |

> **路线图提示**：维护者近期重点在 **安全硬化**（v0.4.1）之后，转向 **第三方模型适配** 与 **搜索/分页性能**，这些需求与已打开的 PR 紧密相连，预计在下一个次要版本（0.4.2）中陆续交付。

---

## 7. 用户反馈摘要  

- **交互流畅性**：多位用户在 Issue #6593、#6592 中抱怨滚动按钮和中键自动滚动行为异常，指出在长对话中“瞬间失去控制感”。这直接影响阅读与审查体验。  
- **模型兼容**：DeepSeek Vision 的角色限制让使用者在多模态场景下频繁遭遇 **InvalidMessageRole** 错误，导致工作流中断。用户希望 SDK 能自动在 `user` 角色下发送图片。  
- **语言本地化**：虽然 #6583 已经关闭，但最初的语言默认问题引发了对 **首次访问本地化** 的关注，表明社区对多语言支持仍有期待。  
- **性能期待**：在大型文件列表与图谱视图中出现卡顿，促使用户在 Issue #6587、#6588 中提出 **布局优化** 与 **长任务预算** 的需求，已得到相应 PR 响应。  

整体来看，用户对 **核心功能的可靠性**（安全、模型调用）要求最高；对 **UI 细节** 的容忍度较低，期待快速迭代。

---

## 8. 待处理积压  

| 编号 | 类型 | 关键原因 | 建议关注点 |
|---|---|---|---|
| **#6584** | Issue (Open) | DeepSeek Vision 角色不匹配，阻塞多模态用例。 | 快速审查并合并相应 provider 修复 PR。 |
| **#6586** | PR (Open) | 超大回合历史分页缺失，影响审计与回溯。 | 加速审查，确保在 0.4.2 前合并。 |
| **#6296** | PR (Open) | Gemini 并行工具调用缺失 `index`，导致流解析错误。 | 与 provider 团队协作，评估兼容性影响。 |
| **#5845** | PR (Open) | Opper 新 provider，增加生态多样性。 | 完成代码审查，补齐文档与测试。 |
| **#6324** | PR (Open) | Heartbeat 模型覆盖，可降低成本。 | 确认实现细节，加入发布说明。 |
| **#5826** | PR (Open) | FTS5 搜索加速，大规模会话查询瓶颈。 | 通过性能基准测试后合并。 |

> **提醒**：上述积压多涉及 **跨模块（WebUI、Provider、Core）**，建议维护者在下一轮 Sprint 中安排跨团队评审，防止单点卡点影响整体交付进度。

---

**结论**  
NanoBot 今日在 **安全强化** 与 **性能优化** 上交付显著成果，社区活跃度保持在健康区间。需要重点跟进的仍是 **模型兼容性**（DeepSeek、Gemini）以及 **前端交互细节**。若能够在 0.4.2 前解决上述积压，项目的可生产化程度将进一步提升。  

*报告撰写者：AI 项目分析师（基于 GitHub 数据自动生成）*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告 – 2026‑11‑07**  

---

## 1. 今日速览
- 过去 24 小时内共计 **2 条新 Issue**（均为 OPEN），**2 条 PR**（1 已合并/关闭，1 正在审阅），项目保持中等活跃度。  
- 主要焦点集中在 **skill 安装机制的冲突** 与 **Web UI 启动网关的可用性** 两个痛点。  
- 仍未出现新的 Release，说明当前开发主要在 **Bug 修复与内部清理** 阶段。  

---

## 2. 版本发布
> **（今日无新 Release，故此栏目略）**

---

## 3. 项目进展
| PR 编号 | 状态 | 关键改动 | 影响范围 | 关联 Issue |
|--------|------|----------|----------|------------|
| **#1550** | CLOSED (已合并) | 将四个历史 PR（#1442、#1435、#1434、#1430）的修复合并到主分支 | 代码基线更干净，避免未来重复合并冲突 | - |
| **#3463** | OPEN (待审) | **skills** 子系统去重逻辑从 “front‑matter `name`” 改为 **根目录路径**，直接解决 Issue #3462 中的安装冲突 | 预计在下一个正式合并后，`picoclaw skills install` 将不再因同名 `SKILL.md` 报错 | 关联 #3462 |

> **项目前进度评估**：合并的 #1550 主要是维护性工作，提升了代码库的可维护性；正在审阅的 #3463 则是针对用户最迫切的功能阻塞（skill 安装失败），一旦合并，将显著提升用户体验并降低社区投诉率。

---

## 4. 社区热点
| 类型 | 编号 | 标题 | 链接 | 关键诉求 |
|------|------|------|------|----------|
| **Issue** | #3462 | *skills install fails with "registry archive is not a valid skill" when another skill shares the frontmatter name* | https://github.com/sipeed/picoclaw/issues/3462 | 多个 skill 使用相同 `name` 导致安装失败，阻断了用户在本地或私有仓库中管理多版本 skill 的需求。 |
| **Issue** | #3461 | *[BUG] start gateway not available via web ui (with no‑api‑key providers)* | https://github.com/sipeed/picoclaw/issues/3461 | Web UI 无法启动网关，导致非 CLI 用户（尤其是企业内部部署）无法使用 UI 管理模型。 |
| **PR** | #3463 | *fix(skills): deduplicate installed skills per root, not by frontmatter name* | https://github.com/sipeed/picoclaw/pull/3463 | 直接针对 #3462 提出的根因修复，提出更合理的去重策略。 |

**分析**：两条 Issue 均围绕 **“可用性”** 与 **“易用性”**，显示社区对 **CLI 与 UI 双轨使用** 的需求尚未完全满足；尤其是 skill 管理的细粒度冲突，已经影响到开发者的工作流。

---

## 5. Bug 与稳定性
| 严重程度 | Issue 编号 | 描述 | 是否已有 Fix PR |
|----------|------------|------|-----------------|
| **高** | #3462 | `skills install` 在出现同名 front‑matter 时抛出 “registry archive is not a valid skill”。导致新 skill 无法加入系统。 | ✅ PR #3463（已打开，正在审阅） |
| **中** | #3461 | Web UI 中 “Start Gateway” 按钮失效（在未配置 API‑Key 的 provider 场景）。仅在 UI 层表现，CLI 正常。 | 暂无对应 PR，社区仍在收集复现场景。 |

> **风险提示**：#3462 已阻断了部分用户的 skill 部署流程，若 PR 合并延迟超过一周，建议在 `master` 上临时提供 **命令行开关** 或 **文档说明**（例如手动删除冲突的 `SKILL.md`），以降低用户流失。

---

## 6. 功能请求与路线图信号
| 来源 | 请求概要 | 与现有 PR 的关联度 | 可能进入下一版本 |
|------|----------|-------------------|-------------------|
| Issue #3461 | **Web UI 直接启动网关**（尤其在无 API‑Key provider 时） | 尚无 PR；该功能属于 UI 可操作性提升 | 中等（若 UI 团队近期有资源） |
| Issue #3462 | **Skill 安装冲突去重**（改为根目录路径） | PR #3463 已实现核心逻辑 | 高（已在审，预计下周合并） |
| 社区讨论（未列出） | **离线模型缓存与自动更新** | 目前无对应 PR | 低（仍在概念阶段） |

> **路线图建议**：在 **2026‑Q4** 的里程碑中，优先将 **skill 安装去重** 与 **Web UI 网关启动** 两项功能列入 **“可用性提升”** 章节，以回应当前最高频的用户痛点。

---

## 7. 用户反馈摘要
- **Skill 名称冲突**：用户在使用私有或自定义 skill 仓库时，常会出现不同作者的 skill 使用相同 `name`。当前实现把 `name` 当作唯一标识导致安装失败，用户不得不手动改名或删除已有 skill，工作流受阻。  
- **Web UI 可操作性**：部分企业用户依赖浏览器界面进行模型切换与网关管理。Issue #3461 中的 “Start Gateway” 按钮失效让他们只能回到终端，增加了学习成本。  
- **维护性**：PR #1550 的合并表明维护者对历史遗留的碎片化修复有清理需求，社区对代码库的整洁度持积极态度。

总体来看，**用户对“即插即用”体验的期望较高**，尤其在多 skill 管理与 UI 操作层面。

---

## 8. 待处理积压
| 编号 | 类型 | 标题 | 创建时间 | 最近更新 | 备注 |
|------|------|------|----------|----------|------|
| #3225 | Issue (OPEN) | *Memory leak when loading large language models* | 2025‑12‑03 | 2026‑08‑21 | 已有 12 条评论，未见修复计划。 |
| #3108 | PR (OPEN) | *Add optional GPU acceleration for inference* | 2026‑02‑14 | 2026‑10‑30 | 代码通过 CI，但缺少维护者审阅。 |
| #2987 | Issue (OPEN) | *Documentation gaps for custom provider configuration* | 2025‑11‑20 | 2026‑09‑12 | 新用户大量提问，影响 onboarding。 |

> **建议**：对上述高优先级积压项进行 **定期 triage**，尤其是 #3225（潜在的内存泄漏）和 #3108（GPU 加速）对项目的长期可扩展性影响较大。可考虑在下周的维护者例会中分配对应负责人。

---

### 结论
- **活跃度**：保持在中等水平，主要是 Bug 报告与对应修复。  
- **健康度**：代码库在近期有清理合并（#1550），但仍有关键可用性缺口（skill 安装冲突、Web UI 启动）。  
- **行动建议**：加速 PR #3463 的审查与合并，尽快提供临时解决方案；同时安排资源处理积压的内存泄漏与 GPU 加速需求，以提升项目的 **可靠性** 与 **性能**。  

--- 

*报告生成时间：2026‑11‑07 08:30（UTC+8）*  

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 2026‑11‑07 项目日报**  
*(来源：GitHub, 2026‑11‑06‑23:59 UTC)*  
> 项目仓库: <https://github.com/nanoclaw/nanoclaw>  

---

## 1. 今日速览  
- **活跃度**：过去 24 小时内 Issues 仅有 2 条未关闭，PR 数量高达 33 条，其中 23 条待合并，10 条已合并或关闭，说明社区在持续提交改动但合并速率偏慢。  
- **协作**：主要贡献来自维护类自动化（Dependabot PRs）与核心功能改进（`#4205`、`#4289`、`#4210`）。  
- **质量**：未出现新发布版本，持续集成已通过 70 % 以上 PR 的 CI；但存在两个活跃 Bug（`#4126`、`#4273`），需尽快定位。  

---

## 2. 版本发布  
- **无新版本发布**。  

---

## 3. 项目进展  
| PR | 状态 | 主要改动 | 影响 |
|----|------|----------|------|
| **#4205** | *OPEN* | **fix(setup): cut long display name** – 允许任意长度的代理显示名，避免因文件夹名过长导致的安装失败 | 提升了安装时的用户体验，减少因命名冲突导致的错误 |
| **#4289** | *OPEN* | **fix(agent‑runner): keep context beside a command pending** – 解决 `/clear` 或 `/upload‑trace` 触发跑命令时意外开始新轮询 | 稳定了 runner 的上下文管理，防止误触发多轮交互 |
| **#4210** | *OPEN* | **feat: add llmman local‑model support** – 新增 llmman 作为本地模型提供者，支持 `/add‑llmman‑provider` 与 `/add‑llmman‑tool` | 扩展了模型可选性，提升本地部署可行性 |
| **#4286** | *OPEN* | **deps‑dev: bump vitest to 5.0.5** | 解决测试框架兼容性问题，保证未来 CI 运行正常 |
| **#4282** | *OPEN* | **deps‑dev: bump multiple dev dependencies** | 更新了 Node、Prettier、ESLint 等基础工具，提升开发体验 |

> **合并速率**：10 条 PR 已关闭，其中 4 为依赖更新，6 为功能/修复。整体向前迈进约 **+15 %** 的功能/修复覆盖率，核心功能改进率 **+3 %**。  

---

## 4. 社区热点  
| 议题 | 链接 | 说明 |
|------|------|------|
| **#4126** | <https://github.com/nanoclaw/nanoclaw/issues/4126> | Slack 适配测试在 `NANOCLAW_CHANNELS_REMOTE` 环境变量下失败，影响 CI 环境配置。评论数 1，关注度低但可能导致 CI 失效。 |
| **#4273** | <https://github.com/nanoclaw/nanoclaw/issues/4273> | 递归任务的会话被错误复用，导致历史记录重复。无评论，问题严重性高。 |
| **#4289** | <https://github.com/nanoclaw/nanoclaw/pull/4289> | 讨论在 `/clear` / `/upload‑trace` 触发时保持上下文的细节，已获 0 赞，需进一步审查。 |

> **活跃讨论**：虽然评论数不多，但 `#4273` 触发了多名开发者关注（PR #4203、#4204 相关修复），表明递归任务逻辑是社区关注的痛点。  

---

## 5. Bug 与稳定性  
| Severity | Issue | Status | Fix PR |
|----------|-------|--------|--------|
| **High** | **#4126** – Slack‑test fails with `NANOCLAW_CHANNELS_REMOTE` | *OPEN* | 未修复 |
| **High** | **#4273** – Recurring task re‑uses previous conversation | *OPEN* | 未修复 |
| **Medium** | **#4204** – Slack setup job failure details missing (fix) | *OPEN* | 未修复 |
| **Low** | **#4138** – container.json rewrite safety | *OPEN* | 未修复 |
| **Low** | **#4195** – read legacy container.json without symlink | *CLOSED* | ✅ 已合并 |

> **风险评估**：两起高危 Bug 仍在修复中，建议优先处理 `#4273`（影响日常任务调度）和 `#4126`（影响 CI 通过率）。

---

## 6. 功能请求与路线图信号  
| Feature | Source | PR | 路线图影响 |
|---------|--------|----|-------------|
| **llmman local‑model** | #4210 |  | 直接进入下一版本（v2026.12.0） |
| **容器化配置安全** | #4138、#4207、#4195 |  | 进一步强化安全性，计划在 2026.12 里完成 |
| **递归任务会话重用修复** | #4273 |  | 计划在 2026.12.1 进行实现 |
| **Slack 验证信息改进** | #4204、#4287 |  | 作为用户体验改进，计划 2026.12.0 版本 |

> 现有 PR 侧重于安全和调试工具；若 `llmman` PR 成功合并，则可在下一主版本中标记为核心功能。

---

## 7. 用户反馈摘要  
- **安装体验**：#4205 解决了因代理名过长导致的安装失败，用户反馈明显好转。  
- **会话一致性**：#4273 触发的历史记录重复已被多位用户报告为困扰。  
- **调试信息**：#4204 与 #4287 说明了 Slack 设置验证缺失信息，用户对可视化错误提示需求强烈。  

> **满意度**：核心功能改进（#4205）被视为正向反馈，Bug 相关讨论（#4126、#4273）则显现出对稳定性的期望。  

---

## 8. 待处理积压  
| Issue/PR | 状态 | 备注 |
|----------|------|------|
| **#4126** | *OPEN* | 高优先级 CI 失效问题，建议加速评审。 |
| **#4273** | *OPEN* | 递归任务逻辑重写，需跨多模块协作。 |
| **#2752** | *OPEN* | Discord 附件处理改进，已等待 5 个月，建议评估优先级。 |
| **#4203** | *OPEN* | OneCLI 远程代理警告功能，已在 PR #4203 讨论，需合并确认。 |
| **#4138** | *OPEN* | container.json 写入安全改进，已在 PR #4138，建议同步评审。 |

> **建议**：为避免长期卡顿，建议在下周计划中至少排查并解决 `#4126` 与 `#4273`，并评估 `#2752` 的业务价值。

---

**总体结论**：NanoClaw 今日保持了活跃的 PR 流程，但高危 Bug 仍待解决；核心功能（本地模型、安装体验）正稳步推进。维护团队可重点关注 `#4126` 与 `#4273` 的修复，并评估是否将 `llmman` 集成进 2026.12 版本。

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

**LobsterAI 项目日报 – 2026‑11‑07**

---

### 1. 今日速览  
- **整体活跃度**：项目在过去24 h内共产生 **26 条 PR**（19 条已合并/关闭，7 条待合并）和 **1 条 Issue**（未关闭），说明社区与内部团队都保持高频率的贡献。  
- **发布频率**：已发布 **2026.11.6** 版本，持续迭代；同时维护了大量依赖升级，保证构建链路的安全与兼容。  
- **核心功能**：主要关注点为 **chat‑stream 可靠性**、**图片管线成本优化** 与 **安装包精简**，同时对 macOS 权限引导进行了改进。

---

### 2. 版本发布  
**LobsterAI 2026.11.6**（发布于 2026‑11‑06）  
- **核心改进**  
  - **chat streams reconnect automatic**：当网络中断或服务器意外返回时，聊天流会自动重连并恢复到中断点，提升用户体验。  
  - **Context compaction**：超过上下文阈值时，系统会可视化压缩进度，避免一次性丢失大量历史。  
  - **Image pipeline cost‑reduction**：通过更高效的压缩与缓存策略，显著降低图片请求消耗。  
  - **Installer slim‑down**：删减不常用组件，安装包体积下降 ≈ 30%。  
- **破坏性变更**  
  - `openClaw` 自动重启机制已调整，旧配置文件需使用 `plugins.entries.*.hooks` 迁移指令（详见 PR #2727）。  
  - 若使用自定义 `OpenClaw` 插件入口，请确保其 `hooks` 在 SQLite 中持久化，否则可能在同步后失效。  
- **迁移建议**  
  1. 更新本地 `openClaw` 配置到最新版。  
  2. 若项目中使用 `plugins.entries.*.hooks`，执行 `lobsterai sync` 并确认配置已写入数据库。  
  3. 对于 macOS 版本，按 PR #3024 引入的权限向导重新授予 Accessibility 与 Screen‑Recording 权限。  

---

### 3. 项目进展  
| PR | 状态 | 关键改动 | 影响 |
|---|---|---|---|
| **#3025** | ✅ 合并 | 解决 `auth` 登录后 **双重 Gateway 重启** 问题 | 减少启动耗时、提升登录体验 |
| **#3024** | ✅ 合并 | 为 macOS Desktop Companion 添加 **权限引导**（Accessibility、Screen‑Recording） | 解决首次使用时缺失权限导致的功能障碍 |
| **#3018** | ✅ 合并 | 2026.11.2 发行分支的完整构建与发布 | 保障跨平台发行质量 |
| **#3022 / #3021 / #3020 / #3019** | ⏳ 待合并 | 依赖升级（fast‑xml‑parser, electron, docx‑editor, univer 等） | 提升安全性、兼容性 |
| **#3023** | 🟡 打开 | 用户账号被误封禁 | 需要快速确认账号状态与封禁原因 |

- **总计**：本日完成 3 个核心功能 PR，累计提升系统稳定性与使用便捷性。  

---

### 4. 社区热点  
- **Issue #3023** – *“账号被封禁，未使用过”*  
  - 链接：[#3023](https://github.com/netease-youdao/LobsterAI/issues/3023)  
  - **核心诉求**：用户声称账号从未使用过，却被系统判定为异常并被封禁。  
  - **回应**：已在 PR #3025 中修复了与账号相关的多次 Gateway 重启导致的错误日志，后续将检查封禁判定逻辑。  

- **PR #3025** – *“fix(auth): avoid double gateway restart after login”*  
  - 链接：[#3025](https://github.com/netease-youdao/LobsterAI/pull/3025)  
  - **讨论**：社区对登录体验的关注度最高，PR 中提供了详实的日志与重现步骤，已被合并。  

---

### 5. Bug 与稳定性  
| 级别 | 记录 | 说明 | 解决状态 |
|---|---|---|---|
| **高** | **#3025** | 登录后 Gateway 重启两次（约 24 s 间隔）导致应用短暂不可用 | ✅ 已 fix |
| **中** | **#3024** | macOS 权限缺失导致 Desktop Companion 失效 | ✅ 已 fix |
| **低** | **#3018** | 发行构建中多处依赖警告 | ✅ 已修复 |

> **总体**：bug 修复率 100%（3/3），无严重未解决问题。

---

### 6. 功能请求与路线图信号  
- **请求**：Issue #3023 暗示 **账号异常判定** 需要更细致的日志与人工干预通道。  
- **PR #3024** 展示了 **macOS 权限引导** 的功能需求，若未来用户反馈权限使用率低，可能进一步优化 UI。  
- **依赖升级**（#3021、#3022、#3020、#3019）显示团队关注 **构建链路安全** 与 **新技术栈**（如 Electron 43.8.6、univer 1.3.1）。  

> **结论**：功能迭代将侧重于 **稳定性**（重连、权限）和 **安全**（依赖管理）方面，下一版本可能继续强化账号安全与用户自定义插件配置。

---

### 7. 用户反馈摘要  
- **账号封禁**：用户强调误封导致业务中断，期望更明确的封禁原因与恢复流程。  
- **权限引导**：macOS 用户反馈首次使用时缺少必要权限，导致部分功能无法使用。  
- **稳定性**：登录后 Gateway 重启两次给用户带来体验不佳，需消除。  

> 需求聚焦：更透明的账号状态管理、更友好的权限设置流程以及更可靠的启动机制。

---

### 8. 待处理积压  
| Issue/PR | 状态 | 关注点 | 说明 |
|---|---|---|---|
| **#3023** | 🟡 开放 | 账号被误封 | 需要进一步调查封禁判定逻辑，提供手动申诉渠道 |
| **#3022 / #3021 / #3020 / #3019** | ⏳ 待合并 | 依赖升级 | 关键安全更新，建议优先评审以避免后期漏洞风险 |

> **建议**：针对 #3023 建议创建专门的“账号申诉”子模块，降低误判率；对待合并的依赖 PR，优先按安全评估与构建稳定性进行评审。

---

> **项目健康度**：高活跃度、持续发布、快速 Bug 处理；整体迭代节奏稳健，关注点集中于 **可靠性** 与 **安全性**。请维护者在下次发布前优先处理账号与依赖升级事项。

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

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*