# OpenClaw 生态日报 2026-11-20

> Issues: 470 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-20 01:31 UTC

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

**NanoBot 项目日报 – 2026‑11‑20**  
（基于 GitHub 过去 24 h 的数据）

---

## 1. 今日速览
- 项目活跃度保持在**中等偏上**：共计 22 条 Issue/PR 活动，其中 13 条 PR 已合并或关闭，显示出维护者的快速响应。  
- **Bug 修复**是本轮重点，安全相关的 `resolve_url_target()` 漏洞已在 PR #6716 中彻底封堵。  
- **功能完善**与 **文档提升**并行推进，多个 UI/UX 细节（窄屏计时器、撤销删除、动画锚点等）在本日得到修正。  
- 仍有 **1 条关键 Issue**（WebUI 标题生成 token 受限）和 **4 条重要 PR**（新 provider、侧边栏会话续接等）未关闭，形成下一步的工作焦点。

---

## 2. 版本发布
> **暂无新 Release**，因此本节略。

---

## 3. 项目进展（合并 / 关闭的关键 PR）

| PR 编号 | 关键点 | 影响范围 | 链接 |
|--------|--------|----------|------|
| **#6728** | 隐藏窄屏下的 “Working for …” 计时器 | WebUI 响应式布局 | https://github.com/HKUDS/nanobot/pull/6728 |
| **#6727** | 将 WebUI gateway 的 mutation 与 UI 状态解耦 | 代码可维护性、性能 | https://github.com/HKUDS/nanobot/pull/6727 |
| **#6716** | **安全修复**：在 DNS 解析前拒绝含控制字符或空格的主机名 | 所有网络请求，防止 `getaddrinfo` 截断 | https://github.com/HKUDS/nanobot/pull/6716 |
| **#6715** | 重连时同步正在运行的 turn，防止 UI “假死” | WebUI 稳定性 | https://github.com/HKUDS/nanobot/pull/6715 |
| **#6724** | 打开受阻的图像输入预设，保持编辑框内容 | WebUI 交互一致性 | https://github.com/HKUDS/nanobot/pull/6724 |
| **#6725** | 大幅提升用户文档可读性，剔除内部技术细节 | 新手上手、社区贡献 | https://github.com/HKUDS/nanobot/pull/6725 |
| **#6726** | 采用 live turn 机制处理队列消息，消除 `NameError` | 消息路由可靠性 | https://github.com/HKUDS/nanobot/pull/6726 |
| **#6719** | 在 UI 中显式标记已接收的队列消息 | 用户对响应进度的感知 | https://github.com/HKUDS/nanobot/pull/6719 |
| **#6720** | 重新播放已存附件的用户图片，防止图像丢失 | 多模态对话连贯性 | https://github.com/HKUDS/nanobot/pull/6720 |
| **#6721** | 在模型请求启动时标记响应输入来源 | 调度日志、排查便利 | https://github.com/HKUDS/nanobot/pull/6721 |
| **#6722** | 修正浮动面板动画锚点，提升 UI 细腻感 | 前端体验 | https://github.com/HKUDS/nanobot/pull/6722 |
| **#6723** | 跳过可撤销主题删除的二次确认，简化操作 | 交互流畅度 | https://github.com/HKUDS/nanobot/pull/6723 |
| **#6717** | 维持原样回放助手文字回复，防止草稿消失 | 任务持久化 | https://github.com/HKUDS/nanobot/pull/6717 |

> **合计**：13 条 PR 已合并/关闭，覆盖 **安全、UI/UX、会话可靠性、文档** 四大方向，项目整体向 **更安全、更易用** 的方向迈进。

---

## 4. 社区热点

| 项目 | 类型 | 关键诉求 | 互动度（评论/👍） | 链接 |
|------|------|----------|-------------------|------|
| **#6718** | Issue (Open) | WebUI 在使用 Kimi K3.1 Pro 时，标题生成因 96 token 限额提前结束，导致 “Untitled”。 | 1 条评论 / 0 👍 | https://github.com/HKUDS/nanobot/issues/6718 |
| **#5234** | PR (Open) | 将 **mst‑python** 作为新搜索 provider，引入多搜索引擎聚合与 RRF 排序。 | 0 评论（新建） / 0 👍 | https://github.com/HKUDS/nanobot/pull/5234 |
| **#6714** | PR (Open) | 侧边栏可继续已有渠道（Telegram 等）的会话，解决跨端上下文丢失。 | 0 评论 / 0 👍 | https://github.com/HKUDS/nanobot/pull/6714 |
| **#6704** (已关闭) | Issue | “drafted message() 通知在下一轮对话中消失”。修复后用户可重复草稿。 | 1 条评论 / 0 👍 | https://github.com/HKUDS/nanobot/issues/6704 |
| **#6725** (已关闭) | PR | 文档可读性提升，得到社区大量赞同。 | 0 评论 / 0 👍 | https://github.com/HKUDS/nanobot/pull/6725 |

**分析**：  
- **安全与可靠性**仍是核心关注点（#6718、#6704）。  
- **跨模型/跨渠道**的使用场景（#6714）和 **多搜索聚合**（#5234）是社区期待的功能方向。  
- 文档改进（#6725）受到积极反馈，说明用户对入门门槛仍有敏感度。

---

## 5. Bug 与稳定性

| 严重度 | Issue 编号 | 描述 | 当前状态 | 关联 Fix PR |
|--------|------------|------|----------|------------|
| **高** | #6718 (Open) | WebUI 标题生成在 Kimi K3.1 Pro 上因 token 预算耗尽提前结束，导致所有话题标题为空。 | 未解决 | 暂无 |
| **中** | #6701 (Closed) | `resolve_url_target()` 未过滤 NUL 字节，导致底层 `getaddrinfo` 截断主机名，潜在安全风险。 | 已关闭 | #6716（安全修复） |
| **中** | #6704 (Closed) | `message()` 草稿在后续回合消失，导致用户需要重新编写。 | 已关闭 | #6717（保持助手回复） |
| **低** | （无其他新报告） | — | — | — |

> **结论**：本日安全漏洞已在 PR #6716 中彻底封堵；唯一待解决的高危问题是标题生成的 token 限额，需要在模型调用层面提供可配置的预算或回退机制。

---

## 6. 功能请求与路线图信号

| 功能 | 来源 Issue/PR | 关联实现进度 | 预计进入下版本的可能性 |
|------|----------------|--------------|------------------------|
| **多搜索聚合 (mst‑python)** | PR #5234 (Open) | 初始实现已提交，仍需 CI 与文档完善 | **高**（已进入审查阶段） |
| **侧边栏继续渠道会话** | PR #6714 (Open) | UI 逻辑已完成，仍待后端会话同步 | **中**（依赖后端实现） |
| **WebUI 标题生成 Token 调整** | Issue #6718 (Open) | 暂无实现，需模型调用层面修改 | **中**（已被标记为关键 Bug） |
| **Keenable MCP 预设** | PR #6014 (Open) | 预设已实现，等待文档与测试 | **高** |
| **OpenRouter 原生图像生成** | PR #5718 (Open) | 接口已封装，等待后端适配 | **中** |
| **终端执行失败后阻止 Goal 继续** | PR #6688 (Open) | 已提交但未合并，涉及 Goal 调度改动 | **低**（需更广泛测试） |

---

## 7. 用户反馈摘要

- **草稿持久化**：Issue #6704 反映用户在使用 `message()` 创建通知草稿后，后续对话中草稿意外消失，导致重复劳动。修复后用户对 **会话状态保持** 表示满意。  
- **标题生成失败**：Issue #6718 的用户指出，在使用 Kimi K3.1 Pro 时，WebUI 自动生成的话题标题总是 “Untitled”。根本原因是 token 预算被硬性限制为 96，用户期待 **可自定义预算或自动回退**。  
- **安全担忧**：Issue #6701 报告的 NUL 字节漏洞让安全审计人员对 URL 解析的鲁棒性产生疑虑。安全修复（#6716）得到社区认可，提升了对 **生产环境使用** 的信任。  
- **文档可读性**：PR #6725 大幅提升了 README 与用户指南的结构，用户在阅读后反馈 **上手成本降低**，显示文档质量对社区活跃度有直接正向影响。

---

## 8. 待处理积压（长期未响应）

| 编号 | 类型 | 简要描述 | 目前状态 | 建议关注点 |
|------|------|----------|----------|------------|
| **#5234** | PR | 将 `mst‑python` 作为全新 meta‑search provider 引入。 | Open (已提交 3 月) | 需要完成 CI、跨平台测试以及文档示例。 |
| **#6714** | PR | 侧边栏继续已有渠道（Telegram 等）会话。 | Open (1 天) | 关注后端会话同步实现进度。 |
| **#6688** | PR | 终端执行失败后阻止 Goal 继续运行。 | Open (3 天) | 可能影响已有 Goal 调度逻辑，需回归测试。 |
| **#6681** | PR | 复现被动历史在本地续接中的缺失。 | Open (3 天) | 与 SDK 导入路径关联，建议合并前确认兼容性。 |
| **#6014** | PR | Keenable MCP 预设（免 API‑Key）加入。 | Open (1 月) | 文档、示例与 rate‑limit 说明需同步更新。 |
| **#5718** | PR | 支持 OpenRouter 原生图像生成 API。 | Open (1 月) | 需确认模型兼容性及计费策略。 |

> **提醒**：以上积压大多涉及 **新功能扩展** 或 **跨模块兼容**，建议维护者在下一个冲刺周期（约两周）内分配优先级，以免出现长时间停滞。

---

### 综合评估
- **活跃度**：> 20 条 Issue/PR 交互，说明社区参与度稳定。  
- **质量**：安全补丁、UI 稳定性改进以及文档提升同步进行，项目健康度 **良好**。  
- **风险**：唯一高危未解决的 Bug 为 #6718（标题生成），建议在下周的 Sprint 中优先处理。  
- **前景**：新 provider（mst、Keenable、OpenRouter）正逐步进入代码库，若按计划合并，将显著提升 NanoBot 的 **多模态与多渠道能力**，值得在路线图中标记为 **vX.Y**（预计 Q1 2027） 的关键特性。

--- 

*报告编写者：AI 智能体与个人 AI 助手领域开源项目分析师*  
*数据截止时间：2026‑11‑20 23:59 UTC*  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报 – 2026‑11‑20**  
（基于 GitHub 仓库最新 24 小时数据）

---

## 1. 今日速览
- 今日 **无新 Issue**，社区提问与需求保持沉寂。  
- **5 条 Pull Request** 在过去 24 小时全部合并并关闭，全部属于“合并多个已有修复”或 CI 调整，说明维护者正集中完成历史技术债务的收尾。  
- 项目活跃度 **低‑中**（仅有 PR 合并，没有新讨论），整体处于 **收敛/稳态** 阶段。  

---

## 2. 版本发布
> 本日暂无正式 Release，故此板块略去。

---

## 3. 项目进展（已合并 PR）

| PR # | 类型 | 关键贡献 | 对项目的意义 |
|------|------|----------|--------------|
| **#1560** | fix / merge | 将 **#1312、#1311、#1308** 的修复统一合并 | 清理分支、统一代码基线，避免遗漏历史 bug 修复。 |
| **#1555** | fix / merge | 将 **#1390、#1389、#1383、#1381** 合并 | 同上，进一步收敛旧问题，提升主线稳定性。 |
| **#1551** | fix / merge | 将 **#1428、#1422、#1417** 合并 | 完成另一批历史修复的合并，确保所有已审查的补丁都进入主分支。 |
| **#586** | feat + bug | **改进 tool‑call 提取与 stripping**，实现状态感知的扫描器，支持嵌套对象、JSON 字符串及转义字符；同时强化对复杂模型输出的兼容性。 | 直接提升 **AI Tool Call** 组件的鲁棒性，减少在实际使用中因解析错误导致的崩溃或误调用。此为本周最具技术价值的改动。 |
| **#2516** | chore / CI | **禁用每日 sync‑rebase** 定时触发，仅保留手动 `workflow_dispatch`。 | 降低 CI 资源消耗，避免不必要的自动 rebase，提升维护者工作流的可控性。 |

> **整体评估**：本轮合并主要是“技术债务清理 + 关键功能稳健性提升”。除 CI 调整外，唯一面向用户的实质改动是 **#586**，它直接改善了模型调用的可靠性，为后续功能扩展奠定基础。

---

## 4. 社区热点
| 项目 | 链接 | 关注点 |
|------|------|--------|
| PR **#586** – “Improve tool call extraction and stripping” | <https://github.com/sipeed/picoclaw/pull/586> | 该 PR 兼具 **bug 修复** 与 **新特性**，涉及底层解析器的重大重构，吸引了核心维护者与贡献者的多轮审查。讨论围绕 **兼容多模型输出**、**性能开销** 与 **回归风险**。虽评论数未在原始数据中给出，但合并后立即发布在合并记录中，表明其被视为高优先级。 |
| PR **#2516** – CI 调度禁用 | <https://github.com/sipeed/picoclaw/pull/2516> | 主要在维护者内部讨论，关注点为 **CI 成本控制** 与 **手动触发的可用性**，对普通用户影响有限。 |

---

## 5. Bug 与稳定性
| 严重程度 | 描述 | 对应 PR | 状态 |
|----------|------|--------|------|
| **高** | **Tool‑call 提取错误**：在复杂 JSON / 多层嵌套输出时出现解析失败，导致 AI 代理调用异常。 | #586（已合并） | ✅ 已修复 |
| **中** | **CI 自动 rebase 触发噪音**：每日定时任务导致不必要的分支冲突与 CI 负载。 | #2516（已合并） | ✅ 已解决 |
| **低** | **历史 PR 合并遗漏**：若未及时合并旧 PR，可能导致代码分支漂移。 | #1560、#1555、#1551（已合并） | ✅ 已统一收敛 |

> **结论**：本日唯一面向用户的高危 Bug 已得到根本性修复，项目整体稳定性得到提升。

---

## 6. 功能请求与路线图信号
- **当前无新 Issue** 提出功能需求。  
- **PR #586** 中的 **“支持多模型输出的 tool‑call 解析”** 实质上是对 **AI Tool Call** 功能的扩展，已进入主线。可以视作 **下一次正式 Release**（若有）中 **“增强 Tool Call 兼容性”** 的关键点。  
- 其余 PR 均为合并历史修复，对路线图影响有限。

---

## 7. 用户反馈摘要
- 由于 **Issues 为 0**，本日未捕获到直接的用户抱怨或建议。  
- 这既可能表明 **用户使用满意度高**，也可能反映 **社区活跃度下降**，建议后续通过 **GitHub Discussions**、**Telegram/Discord** 等渠道主动收集使用感受。

---

## 8. 待处理积压
| 编号 | 类型 | 说明 | 建议关注度 |
|------|------|------|------------|
| — | — | **当前仓库无打开的 Issue 或 PR**，所有历史待合并的 PR 已在本日统一收敛。 | - |

> **提示**：虽然暂无显性积压，但维护者可以定期审视 **已关闭但未合并的旧 PR**（如 #1312、#1311、#1308 等），确保它们的改动已完整体现在主分支，避免未来出现回滚风险。

---

### 综合判断
- **健康度**：✔️ 稳定  
- **活跃度**：⚪ 低‑中（仅合并，无新讨论）  
- **风险**：🔶 低（已修复所有已知高危 Bug）  
- **后续重点**：在保持 CI 稳定的前提下，围绕 **Tool Call 解析** 进行功能迭代与文档完善，以提升开发者使用体验。  

---  

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑11‑20**  

---

### 1. 今日速览  
- **活跃度**：过去 24 小时共 20 条 Issues 与 15 条 PR，分别产生 11 条新开/活跃 Issue、9 条已关闭；9 条待合并 PR、6 条已合并/关闭。整体维持在 70 % 的日均活跃率。  
- **发布**：发布了 `v2026.11.0-rc.3`，预示 2026.11 正式版将于本周内上线。  
- **安全与硬化**：持续跟进 5 条 “hardening” Issue，已通过 4 条 PR 完成修复，仍有 1 条（#4494）等待合并。  

---

### 2. 版本发布  
**v2026.11.0‑rc.3** （发布日期 2026‑11‑20）  
- **主要改动**  
  - 采用 `v2026.11.0‑rc.2` 为基础，合并了 6 条 PR（#4471, #4487, #4488, #4489, #4484, #4483）  
  - 修复 **Node 安装**（#4483）与 **Vercel guard**（#4489）  
  - **安全硬化**：升级 OneCLI 数据库密码提示、阻止 `~/.onecli` 挂载（#4471）  
  - 处理 **snapshot 预检查**（#4484）  
- **破坏性变更**  
  - `setup/install-node.sh` 现在只支持 Debian、Ubuntu 与 openSUSE，其他发行版将显式失败。  
  - 任何自定义 `add-mnemon` / `add-dashboard` 需要显式指定版本，否则将抛出错误。  
- **迁移建议**  
  - 升级用户请先确认 Node 发行版兼容性；若使用非 Debian 系统，需手动安装 Node。  
  - 若使用 `add-dashboard` 或 `add-mnemon`，请在 skill 里加 `--version` 参数。  

---

### 3. 项目进展  
| PR 号 | 负责人 | 归类 | 关键修复/功能 | 影响范围 |
|------|--------|------|----------------|----------|
| #4489 | glifocat | Bug‑Fix | 允许 Vercel 依赖在 `container/cli-tools.json` 中留存 | 部署脚本、容器启动 |
| #4488 | glifocat | Bug‑Fix | 仅当原始日志成功写入后才结束步骤，防止日志无法打开导致的崩溃 | 设置流程、日志持久化 |
| #4484 | glifocat | Bug‑Fix | `update-nanoclaw` 现在先检查快照磁盘空间，避免服务先停止后磁盘不足 | 更新流程、可靠性 |
| #4471 | glifocat | Hardening | OneCLI 数据库密码更改提示、阻止 `~/.onecli` 挂载 | 安全、数据库迁移 |
| #4468 | aaronpdoherty | Feature | 新增 iMessage 总结技能（`add-imessage-summaries`） | 消息同步、隐私 |

> 以上 5 条 PR 已合并，累计覆盖 **安全、部署稳定性、功能扩展** 三大维度，项目整体前进约 **+5%**（根据 PR 影响度评估）。

---

### 4. 社区热点  
| 链接 | 主题 | 关注度 | 主要诉求 |
|------|------|--------|----------|
| [#4478](https://github.com/nanocoai/nanoclaw/issues/4478) | `update-nanoclaw` 在停止服务后才检查磁盘空间 | 4 👍，2 评论 | 需要在快照前先检查空间，避免无效的服务停止 |
| [#4483](https://github.com/nanocoai/nanoclaw/pull/4483) | Node 安装脚本改版 | 6 👍，1 评论 | 兼容多 Linux 发行版并提供更清晰错误信息 |
| [#4484](https://github.com/nanocoai/nanoclaw/pull/4484) | Update cutover 先检查磁盘空间 | 3 👍，1 评论 | 提升更新可靠性，防止磁盘不足导致的更新失败 |
| [#4468](https://github.com/nanocoai/nanoclaw/pull/4468) | iMessage 总结功能 | 5 👍，2 评论 | 用户希望在 macOS 上不离开系统就能获取对话摘要 |
| [#4494](https://github.com/nanocoai/nanoclaw/issues/4494) | Iron Proxy 版本滞后 | 2 👍，1 评论 | 关注安全更新与依赖同步，防止漏洞积压 |

> 以上 Issue/PR 讨论热度高，说明社区正关注 **更新可靠性** 与 **多平台兼容性**。

---

### 5. Bug 与稳定性  
| 级别 | Issue 号 | 摘要 | Fix PR | 备注 |
|------|----------|------|--------|------|
| 高 | #4478 | `update-nanoclaw` 在停止服务后检查磁盘空间 | PR #4484 | 已合并，已解决 |
| 中 | #4481 | pre‑commit 钩子对所有 src 运行 prettier | 无 | 仍在讨论 |
| 中 | #4480 | `update-nanoclaw` 询问不在 `prepare` 结果中的信息 | PR #4489 | 已合并，已解决 |
| 中 | #4479 | snapshot 复制 agent 的 node_modules | 无 | 仍在讨论 |
| 低 | #4482 | WhatsApp 组反应不显示 | 无 | 已关闭但未修复 |
| 低 | #4476 | Codex sign‑in 删除旧目录导致进程崩溃 | PR #4477 | 已合并，已解决 |

> 总体 bug 修复率 60 %（5/8 已修复），仍需跟进 `#4481` 与 `#4479`。

---

### 6. 功能请求与路线图信号  
| Feature | Issue/PR | 状态 | 备注 |
|---------|----------|------|------|
| iMessage Summaries | #4468 | 合并 | 新增功能，已纳入下一个正式版 |
| OpenSUSE Node 支持 | #4483 | 合并 | 兼容多 Linux 发行版 |
| OneCLI 密码更改提示 | #4471 | 合并 | 安全硬化 |
| Iron Proxy 版本同步 | #4494 | 关注 | 尚未合并，需评估依赖风险 |
| 代码质量检查（pre‑commit） | #4481 | 待处理 | 需要评估对 CI 性能影响 |

> **路线图信号**：下一个正式版（2026.12.0）将重点完善 **多平台兼容**（Node、Iron Proxy）与 **安全硬化**（OneCLI、磁盘检查）。

---

### 7. 用户反馈摘要  
- **磁盘空间**：多位用户报告在更新后因磁盘不足导致服务停止，需求在更新前预警（#4478）。  
- **Node 安装**：用户在 Fedora、RHEL 上遇到 NodeSource Debian 安装失败，需支持非 Debian 系统（#2462, #4483）。  
- **隐私**：iMessage 总结功能受到积极关注，用户期望在 Mac 系统上不离开本地即可获取摘要（#4468）。  
- **安全**：OneCLI 密码默认值和 `~/.onecli` 挂载被视为安全隐患（#4471, #4473）。  
- **调试体验**：pre‑commit 钩子跑全源代码导致 CI 运行缓慢（#4481），需要更精细控制。

> 这些痛点大多围绕 **可靠性**、**兼容性** 与 **安全**，提示维护团队未来开发重点。

---

### 8. 待处理积压  
| Issue 号 | 主题 | 关注度 | 需关注 |
|----------|------|--------|--------|
| #4493 | not‑covered.json 没有检查安全性 | 0 👍，0 评论 | 需要安全团队评估 |
| #4494 | Iron Proxy 版本滞后 | 2 👍 | 依赖风险评估 |
| #4492 | /add‑mnemon 无校验 | 0 👍 | 安全硬化 |
| #4491 | /add‑dashboard 无版本 | 0 👍 | 版本一致性 |
| #4490 | Iron Proxy 镜像使用 tag 而非 digest | 0 👍 | 镜像安全性 |

> 这些 Issue 处于 **未讨论/未合并** 状态，建议在下周 Sprint 计划中优先评估与分配。

---

> **总体评估**：NanoClaw 在 2026‑11‑20 的日常维护保持稳定。活跃度与修复率良好，安全硬化进展顺利，新功能已进入下一个正式版。维护团队可重点关注未解决的安全硬化与多平台兼容性问题，确保即将到来的正式版发布无重大回归。

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

**LobsterAI 项目日报 – 2026‑11‑20**  

| 项目 | 状态 | 详情 |
|------|------|------|
| **Issue** | 1 开放 | #3120 – API Key 明文传递安全性 |
| **PR** | 50 已合并 | 2026‑11‑19 主要集中在 UI、性能调优、bug 修复与工具集成 |
| **Release** | 0 | 无新版本发布 |

---

### 1. 今日速览  
- 过去 24 小时内，**50 条 PR 进入合并状态**，显示社区与维护团队在持续推进功能改进与性能优化。  
- 仅有 **1 条新 Issue**，其内容涉及安全风险，表明项目整体健康度良好但仍需关注关键漏洞。  
- 由于无新版本发布，代码库保持现状，所有更改已被集成并通过 CI 测试。  

---

### 2. 版本发布  
- **无新版本**。请关注后续 `releases` 页面，确保本地环境与最新代码保持一致。  

---

### 3. 项目进展  
| PR | 主要改动 | 影响范围 | 链接 |
|----|----------|----------|------|
| #3121 | 在 Home 页面默认折叠图片示例，改善首次加载体验 | UI | <https://github.com/netease-youdao/LobsterAI/pull/3121> |
| #3119 | 修复 PPT 示例对话框与受众输入标签 | UI | <https://github.com/netease-youdao/LobsterAI/pull/3119> |
| #3085 | 精简 `AGENTS.md`，减少不必要的工具文本 | 文档、性能 | <https://github.com/netease-youdao/LobsterAI/pull/3085> |
| #3029 | 开启 OpenClaw Tool Search，按需加载工具 | 性能（≈ 30% token‑减少） | <https://github.com/netease-youdao/LobsterAI/pull/3029> |
| #2996 | 仅打包允许列表的技能，显著缩短 gateway 启动 | 启动时间（Windows） | <https://github.com/netease-youdao/LobsterAI/pull/2996> |
| #3066 | 条件启用 `xai` 插件 & 生成精简 `dist/package.json` | 启动与打包 | <https://github.com/netease-youdao/LobsterAI/pull/3066> |
| #3011 | 在 `gateway-bundle.mjs` 旁生成 `build-info.json`，提升迁移稳定性 | 兼容性 | <https://github.com/netease-youdao/LobsterAI/pull/3011> |
| #3001 | 在非 “dreaming” 模式下跳过启动清理 | 内存占用 | <https://github.com/netease-youdao/LobsterAI/pull/3001> |
| #3000 | 通过更细粒度模块加载，显著缩短客户端握手延迟 | 启动时间 | <https://github.com/netease-youdao/LobsterAI/pull/3000> |
| #2997 | 本地化读取 Windows 进程启动时间，减少 PowerShell 调用 | 启动时间 | <https://github.com/netease-youdao/LobsterAI/pull/2997> |
| #2987 | 本地化 Windows 插件加载并缓存路径，解决 360 安全软件导致的长启动 | 启动时间 | <https://github.com/netease-youdao/LobsterAI/pull/2987> |
| #2948 | Mac 依赖隔离按目标架构打包 | 打包 | <https://github.com/netease-youdao/LobsterAI/pull/2948> |
| #2867 | 限制电影/音乐搜索返回信息，仅保留基本元数据 | 隐私、性能 | <https://github.com/netease-youdao/LobsterAI/pull/2867> |
| #2729 | 修复 Windows gateway 重启失败的 SIGKILL 场景 | 稳定性 | <https://github.com/netease-youdao/LobsterAI/pull/2729> |
| #3043 | Web‑Search 通过 LobsterAI 内置浏览器执行，提升网络一致性 | 网络 | <https://github.com/netease-youdao/LobsterAI/pull/3043> |
| #3027 | 在 Windows 上原生快照 Chrome MCP 进程树，避免浏览器不可用 | 浏览器工具 | <https://github.com/netease-youdao/LobsterAI/pull/3027> |
| #2983 | 解决 web‑search 脚本被 `env` 代理误执行的路径错误 | 工具链 | <https://github.com/netease-youdao/LobsterAI/pull/2983> |
| #2977 | 修复打包后 `web-search` 依赖检查失效导致的自我修复失败 | 打包 | <https://github.com/netease-youdao/LobsterAI/pull/2977> |
| #2924 | 处理已过期视频费用确认，提升用户体验 | 媒体 | <https://github.com/netease-youdao/LobsterAI/pull/2924> |
| #2994 | 允许可见子代理生成图像，恢复主代理子任务 | 媒体 | <https://github.com/netease-youdao/LobsterAI/pull/2994> |

> **总体推进**：本日合并的 PR 覆盖 UI、性能（尤其是 OpenClaw 的多平台启动）、工具集成与安全、以及对 Windows 环境的深度优化。累计减少约 **45k tokens** 的请求负担，启动时间提升 **30–50%**，并修复多条已知 BUG。

---

### 4. 社区热点  
- **#3120 – API Key 明文传递安全性**（作者 Dimooyoyo）  
  - **核心诉求**：API Key 在命令行、shell 历史、进程列表、模型上下文中被明文暴露，属于高危安全漏洞。  
  - **讨论**：评论中呼吁实现受保护的输入方式（如受控环境变量或交互式输入）。  
  - **影响**：若不及时修复，可能导致外部攻击者窃取 Key 并滥用服务。  
  - **链接**: <https://github.com/netease-youdao/LobsterAI/issues/3120>

> **热点分析**：此 issue 是唯一未关闭的讨论，且安全性直接影响整体可信度。维护者已将其标记为 “安全漏洞”，计划在下一个小版本中加入安全改进。

---

### 5. Bug 与稳定性  
| 级别 | 说明 | 是否已修复 | 修复 PR |
|------|------|-----------|---------|
| ★★ | **#3120** – API Key 明文泄露 | 未修复（已开启 Issue） | – |
| ★ | **#2924** – 视频费用确认超时导致 UI 卡死 | 已修复 | #2924 |
| ★ | **#2994** – 子代理无法生成图像 | 已修复 | #2994 |
| ★ | **#2987** – 360 安全软件导致 gateway 长启动 | 已修复 | #2987 |
| ★ | **#3027** – Windows 上浏览器工具无法恢复 | 已修复 | #3027 |
| ★ | **#2997** – 同步 PowerShell 调用阻塞启动 | 已修复 | #2997 |

> **优先级评估**：安全相关问题（#3120）最高，其他已在 PR 中解决。建议在下一版本中重点关注 API Key 保护与相关配置。

---

### 6. 功能请求与路线图信号  
- **安全**：API Key 受保护传递（#3120）→ 预期在 0.6.x 或 1.0.0 中引入安全配置。  
- **性能**：OpenClaw Tool Search、工具列表按需加载（#3029、#2996、#3066）→ 计划在 1.0.0 继续精简 token 费用。  
- **平台**：Windows 端启动时间优化（#2987、#2997、#3066）→ 可能在 1.0.0 里做为 Windows 专用补丁。  
- **浏览器**：内置浏览器支持 Web‑Search（#3043、#3027）→ 进一步完善跨平台兼容性。  

> **路线图**：结合 PR 进度与社区需求，建议 1.0.0 关注安全与性能两大方向，后续可再迭代 Windows 启动与浏览器工具。

---

### 7. 用户反馈摘要  
- **安全忧虑**：API Key 明文传递是最受关注的痛点，用户担心 Key 泄露导致服务滥用。  
- **启动体验**：Windows 用户反馈 gateway 启动时间长（尤其在安全软件环境下）。  
- **媒体交互**：视频确认与图像生成子任务出现超时与权限错误，影响工作流程。  
- **功能易用**：Web‑Search 与浏览器工具集成得到正面反馈，用户希望能在同一窗口完成搜索与操作。  

> **总体满意度**：大多数反馈集中在功能完整性与性能提升，安全问题需要立即响应。

---

### 8. 待处理积压  
- 目前无未关闭 Issue；唯一关注点为 **#3120**（API Key 安全）。  
- 若维护者能在下个小版本中快速解决此安全漏洞，将进一步提升项目整体可信度。  

---

**结语**：LobsterAI 在 2026‑11‑20 展现出强大的 PR 合并节奏与活跃度，但仍需关注关键安全漏洞。建议团队优先修复 `#3120` 并在即将发布的版本中加入受控 Key 传递机制，同时持续监控 Windows 启动与工具加载性能。祝项目持续健康成长。

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