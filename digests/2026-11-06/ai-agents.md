# OpenClaw 生态日报 2026-11-06

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-06 00:37 UTC

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
**日期：** 2026-11-06  
**分析师：** AI 智能体与个人 AI 助手领域开源项目分析师

---

## 1. 今日速览
OpenClaw 项目今日保持高活跃度，过去24小时内新增及活跃 Issue 共 500 条，其中新开 230 条，已关闭 270 条；PR 更新 500 条，待合并 318 条，已合并/关闭 182 条。项目整体健康度良好，今日发布 **v2026.11.1** 版本，重点修复了 macOS 安全配置和跨平台插件可靠性问题。社区讨论集中在大型会话的性能瓶颈、Windows 平台的稳定性以及 MCP（模型上下文协议）功能的完善上。

## 2. 版本发布
**v2026.11.1 (2026-11-06)**
*   **核心修复：**
    *   **Safer Mac settings：** 修复了配置保存失败时不覆盖密钥的问题，以及关闭 Tailscale 暴露时保持网关认证完整性的问题。
    *   **更可靠的渠道回复：** 改进了 Telegram、Discord 和 Webhook 的会话回复机制。
*   **影响范围：** 主要针对 macOS 用户和网关配置管理的安全性增强，无已知破坏性变更。

## 3. 项目进展
今日项目推进了多个关键功能的完善与修复，主要集中在 UI 体验、插件系统及跨平台兼容性上：
*   **UI 交互优化 (PR #193786, #193778, #193812)：**
    *   修复了 MCP 应用选择在发送后消失的问题，并确保刷新历史后仍保留状态。
    *   增加了模板推荐的紧凑型预览对话框，提升用户体验。
    *   优化了 Web UI 主题颜色读取速度，减少原生渲染开销。
*   **插件与脚本系统 (PR #193827, #193816, #193820)：**
    *   修复了技能读取中断后的重试机制，增强文件传输稳定性。
    *   修正了 Windows 平台 PATH 环境下命令安装的选择逻辑。
    *   修复了定时任务（Cron）中保存的分组和图标在刷新后丢失的问题。
*   **系统性能与工具 (PR #193807, #193639)：**
    *   大幅加速了 UI 主题颜色的读取和审计。
    *   减少了独立构建元数据的查找成本，提升启动速度。

## 4. 社区热点
今日社区讨论最热烈的话题集中在**Gateway 性能**与**数据完整性**上：
*   **Gateway 大型插件捕获阻塞 (#160959)：** 这是一个高优先级（P0）的回归问题，自 2026.9.6 版本引入插件生成捕获以来，网关在处理大型外部插件时会阻塞数分钟。该 Issue 拥有 74 条评论，是当前最严重的稳定性隐患。
*   **Windows 插件重载与更新失败 (#170956)：** 涉及启动缓慢、插件未清理以及任务计划程序权限错误，导致重启/更新极其不可靠，影响了 Windows 平台用户的日常运维体验。
*   **MCP 会话生命周期 (#166017)：** 探讨了 `mcp.sessionIdleTtlMs` 默认值未生效导致的会话运行时未被清理，最终填满系统硬限制（256 子进程），引发执行失败。

## 5. Bug 与稳定性
今日报告的 Bug 按严重程度排列如下：
*   **P0 - 崩溃/严重阻塞：**
    *   **Gateway 大型插件捕获阻塞 (#160959)：** 阻塞事件循环数分钟，影响所有使用大型插件的会话。
    *   **MCP 会话内存泄漏 (#166017)：** 导致子进程数量达到硬上限，所有新执行均失败。
*   **P1 - 功能回归/严重影响：**
    *   **会话 MCP 运行时未清理 (#155563)：** 2026.9.5 引入的回归，导致资源残留。
    *   **SQLite 工作进程内存溢出 (#191847)：** 大型会话导致 512MB 堆限制溢出，所有回合失败。
    *   **云 Worker 准备失败 (#182647)：** 会话能力元数据要求 Worker 准备，但云环境未正确处理。
*   **P2 - 体验/次要问题：**
    *   **macOS 停止命令失败 (#191944)：** 进程血缘检查失败，无法优雅停止网关。
    *   **Doctor 修复超时 (#178359)：** macOS 上 `--fix --non-interactive` 挂起 15 分钟以上。
    *   **Dashboard 链接失效 (#142606)：** 原生应用中 `target="_blank"` 链接无法打开。

## 6. 功能请求与路线图信号
社区对新功能的需求显示出对**多语言支持**和**AI 交互增强**的关注：
*   **多语言搜索增强 (PR #193815)：** 为 Memory Core 添加 CJK 双字词（大词）FTS 索引，解决中文/日文查询无法匹配的问题。这是一个具体且高价值的性能优化，极有可能被纳入下个版本。
*   **会话历史分支 (Issue #158800)：** 用户希望在控制 UI 中浏览和分叉之前的会话片段，以实现独立恢复。这反映了用户对**长对话管理**的强烈需求。
*   **飞书（Lark）流式支持 (Issue #131457)：** 请求为飞书频道添加进度流式模式，与 Slack/Discord 等其他渠道保持一致。这有助于提升特定生态系统的用户体验。

## 7. 用户反馈摘要
通过对 Issue 评论的提炼，当前用户最真实的痛点集中在：
1.  **运维负担重：** Windows 用户频繁遇到更新失败和插件重载卡死，反馈“pas na veel proberen”（需要尝试很多次）。
2.  **会话数据丢失风险：** `write` 工具的覆盖行为导致多会话共享文件被意外覆盖，用户担心静默数据丢失。
3.  **诊断工具效率低：** 在大型状态环境下，`openclaw doctor --fix` 运行时间过长（473秒），严重拖慢更新流程。
4.  **UI 细节体验：** 用户希望 UI 能更细致地处理混合文本方向（如中英混排）以及更好地保留历史会话的上下文。

## 8. 待处理积压
以下长期未响应的重要 Issue 需要维护者重点关注：
*   **QQ 频道可持续性 (#150743)：** 已关闭 8 条评论，关于腾讯手头支持计划不明确的长期支持问题。
*   **ACL 控制同步失败 (#124843)：** 关于自定义 Harness 在特定配置下被硬性覆盖的问题，已存在 PR 但未合并。
*   **Webchat 消息模态识别 (#115076)：** 混合文本和图片的消息被误分类为纯图片的问题。
*   **会话尾部指标 (#125311)：** 请求展示更紧凑的事件指标，涉及轨迹记录器的可撤销能力设计。

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目日报 – 2026‑11‑06  

> **数据来源**：GitHub 仓库 `HKUDS/nanobot`（截至 2026‑11‑06 00:00 UTC）  
> **统计**：Issues 2（新/活跃 1 / 已关闭 1）·Pull Requests 11（待合并 2 / 已合并/关闭 9）·Releases 0  

---

## 1. 今日速览  
- 项目在过去 24 小时保持 **中等活跃**：超过 10 条 PR 产生交互，且仅有 1 条新 Issue。  
- **核心功能**（Web UI、技能系统、模型提供者）持续得到细致的 bug 修复和可用性改进。  
- **社区关注点**集中在 Windows 环境下的工作区选择器以及 UI 可读性提升。  
- CI 稳定性提升显著，多个因超时导致的 flaky 测试已被修复。  

---

## 2. 版本发布  
> **暂无新版本**。本日的 PR 大多为 **维护/功能预备**（如 0.4.1 预发布准备），暂无正式 tag 发布。

---

## 3. 项目进展（关键 PR）  

| PR # | 状态 | 关键贡献 | 对项目的意义 |
|------|------|----------|--------------|
| **#6569** (已合并) | CLOSED | 关闭会话切换时的上下文图残留 | 防止 UI 错位，提高多会话切换的流畅度 |
| **#6562** (已合并) | CLOSED | 在侧边栏实时展示文件上下文图 | 为高级用户提供 **“文件-对话”** 追踪，提升调试与审计能力 |
| **#6568** (已合并) | CLOSED | 改进 Markdown 排版，使用 Open Sans | 明显提升阅读体验，降低长文档阅读疲劳 |
| **#6567** (已合并) | CLOSED | Composer 输入框展示快捷键提示 | 降低学习曲线，帮助用户快速发现命令/技能 |
| **#6533** (打开) | OPEN | DeepSeek 生成中断错误统一报错 | 防止错误答案被误保存，提升模型可靠性 |
| **#6570** (打开) | OPEN | 0.4.1 预发布准备（changelog、签名等） | 为下周正式发布奠定基础 |
| **#6565** (已合并) | CLOSED | 将空闲扫描迁移至 inbound consumer | 解决 Windows CI 中的阻塞问题，提升并发响应能力 |
| **#6564 / #6566** (已合并) | CLOSED | CI 超时/耐久路由测试稳定化 | 大幅降低 CI 失效率，提升社区信任度 |

**整体评估**：本轮合并主要围绕 **UI 可用性、跨会话一致性、模型错误处理** 与 **CI 稳定性** 三大方向，表明 NanoBot 正在从功能完善向 **质量与可维护性** 进一步收敛。

---

## 4. 社区热点  

| 编号 | 类型 | 关键讨论点 | 链接 |
|------|------|------------|------|
| **#6111** (Issue) | Enhancement | *Workspace picker* 在 Windows 上缺少驱动列表、文件夹创建与快捷位置。用户希望更像本地文件管理器的交互体验。 | https://github.com/HKUDS/nanobot/issues/6111 |
| **#6562** (PR) | Feature | 实时文件上下文图的实现细节、对话历史的可视化。社区赞赏新可视化，但也提出对性能的关注。 | https://github.com/HKUDS/nanobot/pull/6562 |
| **#6568** (PR) | UI/UX | Markdown 排版细节（行距、标题层级、字体），得到多语言社区的正面反馈。 | https://github.com/HKUDS/nanobot/pull/6568 |
| **#6533** (PR) | Bug | DeepSeek 中断错误被误当作成功返回，引发误导性答案。讨论集中在错误分类与用户提示的实现方式。 | https://github.com/HKUDS/nanobot/pull/6533 |

**背后诉求**：  
- **Windows 端体验**（#6111）仍是活跃用户的核心需求。  
- **可视化与可读性**（#6562、#6568）受到广泛好评，显示社区对 **“透明化 AI 交互”** 的期待。  
- **模型错误透明化**（#6533）体现了对 **生成式模型可靠性的担忧**，是后续产品化不可或缺的质量指标。

---

## 5. Bug 与稳定性  

| 严重程度 | Issue/PR | 描述 | 当前状态 |
|----------|----------|------|----------|
| **高** | #6526 *(已关闭)* | 4.0 更新后出现 “no earlier messages” 阻塞滚动，影响页面交互。已在后续 PR 中修复。 | ✅ 关闭 |
| **中** | #6533 *(打开)* | DeepSeek 生成中断被误判为成功，导致部分回复被错误保存。修复 PR 已提交，待审。 | ⏳ 待合并 |
| **低** | #6569 *(已合并)* | 会话切换时侧边栏残留导致 UI 错位。已修复。 | ✅ 关闭 |
| **低** | CI 超时系列（#6564、#6565、#6566） | Windows CI 超时导致测试 flaky。已通过代码与测试超时调优解决。 | ✅ 关闭 |

> **总体**：本日报告的高危 Bug 已关闭，唯一未解决的中危问题（#6533）已进入审查阶段，风险可控。

---

## 6. 功能请求与路线图信号  

| 需求 | 来自 Issue/PR | 关联实现/计划 | 可能纳入的版本 |
|------|----------------|--------------|----------------|
| **Workspace picker 增强**（驱动列表、文件夹创建、快捷位置） | #6111 | 仍在讨论中，暂无实现 PR | 预计 0.5.x（下一大版本） |
| **文件上下文实时图** | #6562 | 已实现（PR 已合并） | 已在 0.4.1 中包含 |
| **Markdown 排版改进** | #6568 | 已实现（PR 已合并） | 已在 0.4.1 中包含 |
| **Composer 快捷键提示** | #6567 | 已实现（PR 已合并） | 已在 0.4.1 中包含 |
| **DeepSeek 中断错误统一处理** | #6533 | PR 正在审查 | 若通过，可能进入 0.4.2（次月小版本） |

**路线图信号**：当前维护重点在 **UI/UX 提升** 与 **模型错误透明化**，而 **平台适配（Windows）** 仍是后续版本的关键需求。

---

## 7. 用户反馈摘要  

- **正面**：对新版 UI（尤其是 Markdown 排版、Composer 提示）表示“阅读更舒适、上手更快”。  
- **负面**：Windows 用户仍抱怨工作区选择器功能缺失，影响日常文件管理与快速切换。  
- **痛点**：模型中断错误未显式标记导致误判，用户担心答案可信度。  
- **需求**：希望在 **多会话** 环境下保持 UI 状态一致，避免残留图形影响操作。  

---

## 8. 待处理积压  

| 编号 | 类型 | 状态 | 备注 |
|------|------|------|------|
| **#6111** | Enhancement | OPEN | 关键 Windows UI 功能，已累计 2 条评论，仍未分配实现者。 |
| **#6570** | Release Prep | OPEN | 0.4.1 预发布准备，需在下周完成 tag 与文档发布。 |
| **#6533** | Bug | OPEN | DeepSeek 中断处理，审查通过后应尽快合并以防生产环境误报。 |
| **#6571** | Fix (skills) | CLOSED | 已合并但未在 changelog 中标记，需在 0.4.1 发布说明中补充。 |
| **#6569** | Fix (webui) | CLOSED | 已合并，建议在下次 UI 迭代文档中强调 “切换会话时自动关闭图形”。 |

> **建议**：优先分配资源给 #6111 与 #6533，以提升 Windows 端体验和模型错误处理的可靠性；同步推进 #6570 完成正式发布。

---

> **结论**：NanoBot 今日表现出 **稳健的维护节奏** 与 **明确的社区需求导向**。除少数待处理的 Windows 相关功能外，整体健康度良好，预计在 0.4.1 正式发布后，项目将进入 **功能完善 + 稳定性提升** 双轮驱动的下一阶段。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报（2026‑11‑06）**  

> 链接: <https://github.com/sipeed/picoclaw>  

---

### 1. 今日速览  
- **Issue**: 1 条（#3461）已新建并保持活跃；  
- **PR**: 7 条，其中 3 条已合并/关闭（#957、#1182、#751），4 条待审（#3460、#3459、#3458、#3457）；  
- **Release**: 0 条。  
项目总体活跃度适中，主要在 bug 修复、文档完善和依赖升级上保持推进。  

---

### 2. 版本发布  
无新版本发布。  

---

### 3. 项目进展  
| PR 号 | 状态 | 主要内容 | 对项目的推动作用 |
|-------|------|----------|-----------------|
| #957 | ✅ 已合并 | 修复 **ModelList** 默认值覆盖用户配置的 bug（#680） | 改善配置文件鲁棒性，降低新用户配置错误率。 |
| #1182 | ✅ 已合并 | 新增 `agents.md` 文档，阐述 AI 代理的设计原则与使用示例 | 提升项目对贡献者和使用者的友好度，规范团队协作。 |
| #751 | ✅ 已合并 | 在 Gateway 中实现 WebSocket 接口并支持健康检查 | 让 PicoClaw 更易集成到实时通信场景，拓宽使用范围。 |
> 以上三条 PR 的合并使得项目在稳定性、可维护性与功能扩展上都有实质提升。  

---

### 4. 社区热点  
| 议题 | 链接 | 关键讨论点 |
|------|------|------------|
| #3461 | <https://github.com/sipeed/picoclaw/issues/3461> | **BUG**：在 Web UI 中无法通过无 API key 的 providers 启动 gateway。用户已报告在 console 可用但 UI 无法操作。 |
| #751 | <https://github.com/sipeed/picoclaw/pull/751> | **功能增强**：WebSocket 接口实现，兼容 OpenClaw，提升实时交互能力。已获得较多讨论与测试反馈。 |

> #3461 是目前社区最活跃的议题，直接关系到 UI 的易用性。  

---

### 5. Bug 与稳定性  
| 级别 | 议题 | 状态 | 解决方案 |
|------|------|------|-----------|
| **高** | #3461 | **已开启** | 目前无修复 PR，已在讨论阶段。影响范围：Web UI 启动失败。 |
| **中** | #957 | ✅ 已合并 | 防止默认 `ModelList` 覆盖用户配置，消除 401 错误。 |
> 其它未发现新的重现性崩溃。  

---

### 6. 功能请求与路线图信号  
- **#751（WebSocket）**：已完成的功能表明后续版本有望进一步支持实时消息传输与多端同步。  
- **#3461（UI 启动）**：如果修复后可直接在 UI 里管理 gateway，将提升非技术用户的体验，可能成为下一版本的重点。  

---

### 7. 用户反馈摘要  
- **痛点**：#3461 用户表示在 Web UI 无法通过无 API key 的 providers 启动 gateway，导致操作失去便利。  
- **使用场景**：多数评论集中在通过浏览器快速测试与管理模型。  
- **满意/不满意**：目前尚无评论，故缺乏直接反馈。  

---

### 8. 待处理积压  
- **#3461**（BUG，UI 启动不工作）是当前唯一未解决且影响较大的 Issue。建议优先评估 UI 代码路径并给出修复计划。  
- 依赖升级 PR（#3460、#3459、#3458、#3457）正在等待审查，建议尽快通过或合并，以保持安全与兼容性。  

> **维护者提醒**：关注 #3461 的讨论进度，并在下次代码审查中加入对 UI 启动流程的单元/集成测试。  

---

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 2026‑11‑06 项目日报**

| 项目 | 链接 |
|------|------|
| 官方仓库 | <https://github.com/nanocoai/nanoclaw> |

---

## 1. 今日速览  
2026‑11‑06 继续保持高频贡献节奏，**16 条 PR**（其中 9 条待合并，7 条已关闭）和 **2 条 Issues**（1 开启、1 已关闭）表明社区参与度依旧活跃。近半数 PR 关注安全硬化与镜像升级，说明维护团队正着力提升产品可靠性。整体健康度保持在 **高**，但持续关注持续集成（CI）与镜像安全扫描结果仍是关键。

## 2. 版本发布  
- **无新发布**。  
> 目前仍在使用 `v2026.10.0` 及其硬化镜像系列（`v2026.10.0‑20261105T…`）。若计划发布，请务必关注下方“Bug 与稳定性”与“功能请求与路线图信号”中提到的安全与功能改进。

## 3. 项目进展  
| PR 号 | 标题 | 主要改进 | 备注 |
|-------|------|----------|------|
| **#227** | “Atualizar nanoclaw” | 代码/文档同步，含新技能添加与修复 | 已关闭，未影响公开功能 |
| **#4145** | docs(contributing) | 修正 PR 示例与实际提交不一致 | 关闭后文档一致性提升 |
| **#4194** | fix(templates) | 重新校正模板写入路径，防止并发冲突 | 关闭后部署更稳健 |
| **#4200** | fix(setup) | 统一 `sudo` 密码请求与 WSL Docker 组提示 | 关闭后安装流程更友好 |
| **#4206** | fix(cli) | 添加无 systemd 重启提示 & 更新文档 | 关闭后 CLI 辅助信息更完整 |
| **#4265** | fix(mattermost) | 服务器/代理短暂不可用时自动重试 | 关闭后 Mattermost 连接更可靠 |
| **#4266** | fix(setup) | 完整诊断输出，去除用户文本 | 关闭后故障定位更高效 |

> **进度概览**：这些 PR 共同推动了**安装流程简化、镜像安全硬化、诊断信息完善**，预计能在后续版本中显著提升用户体验与系统可靠性。

## 4. 社区热点  
| 项目 | 状态 | 说明 | 链接 |
|------|------|------|------|
| **Issue #4272** | OPEN | “Record how a task was solved …” 需求：将完成任务的步骤转化为可复用技能。该议题尚未得到任何讨论，说明社区对自动化学习功能抱有高度期望。 | <https://github.com/nanocoai/nanoclaw/issues/4272> |
| **PR #4199** | OPEN | “fix(add-onecli): publish OneCLI’s admin API and Postgres on 127.0.0.1” | 关注点：本地开发环境安全与网络隔离。 | <https://github.com/nanocoai/nanoclaw/pull/4199> |
| **PR #4202** | OPEN | “fix(setup): install jq so channel setup works on stock Linux and WSL” | 解决 Slack/Discord 等渠道在无 jq 环境下无法安装的问题。 | <https://github.com/nanocoai/nanoclaw/pull/4202> |

> 这些议题与 PR 的活跃度反映出社区对 **安全隔离、开发便利性、技能复用** 的高度关注。

## 5. Bug 与稳定性  
| 级别 | 议题 | 是否已修复 | 说明 |
|------|------|------------|------|
| **高** | #2025（`nanoclaw.sh` 在安装基本组件时挂起） | ✔️ 已关闭（#4265 解决间接影响） | 解决了 sudo 密码与 Docker 组提示的冲突 |
| **中** | #4265（Mattermost 服务器短暂不可用导致安装失败） | ✔️ 已关闭 | 自动重试机制已实现 |
| **低** | #4202（缺失 `jq` 导致渠道安装失败） | 🔓 仍开放 | 需要手动安装或等待 PR 合并 |

> 目前未出现新的严重崩溃或回归；维护团队已在 9 条未合并 PR 中针对安全硬化和错误修复投入大量工作。

## 6. 功能请求与路线图信号  
- **#4272**：用户提出记录任务步骤并生成可复用技能的需求，若实现将极大提升 agent 自学习能力。  
- **#4199**、**#4202**：针对 OneCLI 与 jq 安装的改进，表明社区对本地化开发环境与多渠道兼容性的关注。  

> 这些 PR 与 Issue 暗示未来版本将聚焦 **自学习机制、开发工具链整合、渠道兼容性**。

## 7. 用户反馈摘要  
- **安装流程**：多条 Issue 与 PR 讨论 sudo 密码提示、Docker 组加入、jq 缺失等问题，用户期望一次性、无障碍安装。  
- **安全与镜像**：PR #4194、#4260 系列表明用户关注镜像安全扫描与容器内依赖管理。  
- **功能复用**：#4272 需求显示用户渴望更高的任务自动化与知识迁移能力。  

> 总体来看，用户对**易用性与安全性**的关注度较高，功能复用需求正快速增长。

## 8. 待处理积压  
| 项目 | 当前状态 | 说明 | 链接 |
|------|----------|------|------|
| **#4272** | OPEN | 长期未被讨论，需评估实现难度与优先级 | <https://github.com/nanocoai/nanoclaw/issues/4272> |
| **#4199** | OPEN | OneCLI 本地化部署问题，已在 PR 里讨论，但尚未合并 | <https://github.com/nanocoai/nanoclaw/pull/4199> |
| **#4202** | OPEN | jq 缺失导致渠道安装失败，已提交 PR 但未合并 | <https://github.com/nanocoai/nanoclaw/pull/4202> |
| **#4265** | CLOSED | 已修复，但后续版本仍需验证重试逻辑 | <https://github.com/nanocoai/nanoclaw/issues/4265> |

> 维护团队应优先评估 #4272 的实现可行性，并推动 #4199、#4202 的合并以提升安装与渠道兼容体验。

---

**结论**：NanoClaw 在 2026‑11‑06 维持了高频的 PR 与 Issue 活跃度，持续聚焦安全硬化与安装体验优化。缺乏新发布表明团队正处于准备阶段，需在即将到来的发布周期中集中处理功能复用与安全改进。保持对上述积压议题的关注，将进一步巩固社区信任与项目可持续发展。

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

# LobsterAI 项目动态日报 (2026-11-06)

## 1. 今日速览
过去 24 小时 LobsterAI 保持高度活跃状态，核心开发聚焦于 **性能优化** 与 **Windows/macOS 平台稳定性修复**。
当日共有 **15 个 PR 被合并或关闭**，其中大部分由核心贡献者 `fisherdaddy` 提交，显著提升了 Gateway 启动速度及资源占用情况。
社区方面关注点集中在**账号风控申诉**，已有 2 例用户因使用本地反向代理或插件导致账号禁用并提交申诉。
整体项目健康度良好，技术栈迭代迅速，但需警惕社区对个人使用接口的风控边界认知偏差。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
今日合并的 15 个 PR 主要围绕以下三个维度推进项目：

### A. 性能深度优化 (Performance)
核心开发者针对 OpenClaw Gateway 的启动链路进行了系统性优化，旨在减少启动时间并降低系统负载：
*   **原生 Windows API 调用优化**：通过 [PR #3002](https://github.com/netease-youdao/LobsterAI/pull/3002) 和 [PR #3001](https://github.com/netease-youdao/LobsterAI/pull/3001)，移除了启动时同步调用 `reg.exe`、`cmd.exe` 和 PowerShell 的阻塞操作，改为原生读取注册表和进程启动时间，预计可节省数秒的启动阻塞时间。
*   **握手延迟优化**：[PR #3000](https://github.com/netease-youdao/LobsterAI/pull/3000) 将 Gateway Client 的加载时机提前，并精简了依赖项，解决了 Windows 上 2.3-2.7 秒的握手延迟。
*   **资源开销优化**：[PR #3011](https://github.com/netease-youdao/LobsterAI/pull/3011) 优化了 `build-info.json` 的查找路径；[PR #3001](https://github.com/netease-youdao/LobsterAI/pull/3001) 实现了在 Dreaming 功能关闭时跳过不必要的启动清理扫描。

### B. 桌面端稳定性与 Bug 修复 (Stability & Fixes)
*   **内存泄漏修复**：[PR #2999](https://github.com/netease-youdao/LobsterAI/pull/2999) 修复了一个严重的内存问题，此前生成的图片以 Base64 形式重复存储在消息元数据中，导致 13 张图片占据 1.12GB 内存。此次修复改为引用存储，显著提升了长会话的流畅度。
*   **进程管理修复**：[PR #3008](https://github.com/netease-youdao/LobsterAI/pull/3008) 修复了 macOS 下退出应用后 DeepSeek Harness (dsh) 后台进程残留且端口未释放的问题。
*   **UI 交互修复**：[PR #3006](https://github.com/netease-youdao/LobsterAI/pull/3006) 解决了 macOS 桌面陪跑伴侣（Desktop Companion）面板重新打开时焦点丢失导致的“闪烁关闭”问题；[PR #3003](https://github.com/netease-youdao/LobsterAI/pull/3003) 确保任务卡片在全屏应用上方正常显示。
*   **配置同步修复**：[PR #3010](https://github.com/netease-youdao/LobsterAI/pull/3010) 和 [PR #3012](https://github.com/netease-youdao/LobsterAI/pull/3012) 修复了多实例共享配置或登出时配置文件异常缩小导致的 Gateway 拒绝启动问题。

### C. 功能增强 (Features)
*   **消息复制增强**：[PR #3009](https://github.com/netease-youdao/LobsterAI/pull/3009) 支持在复制用户消息时同时复制其中的图片内容，解决了之前只能复制纯文本的问题。
*   **依赖管理改进**：[PR #3007](https://github.com/netease-youdao/LobsterAI/pull/3007) 修复了插件安装时因系统路径中缺少 `pnpm` 导致的失败，改为使用内置的 pnpm。

## 4. 社区热点
今日社区讨论主要集中在**账号合规性**与**旧 PR 的后续处理**。

*   **账号禁用申诉热潮**：
    *   [Issue #2998](https://github.com/netease-youdao/LobsterAI/issues/2998)：**申诉：账号被禁用**。用户 `qingshui8806` 反映因使用 DSH 签到插件进行“一键签到”触发风控。
    *   [Issue #2940](https://github.com/netease-youdao/LobsterAI/issues/2940)：**[申诉] 账号被禁用**。用户 `lastwhisper9312-creator` 反映因将内置接口通过反向代理转发至本地工具使用而触发风控。
    *   **分析**：这表明部分个人用户试图利用 LobsterAI 的内置模型接口进行非官方集成（如通过反向代理供其他本地工具调用，或使用第三方插件自动操作），这触发了安全风控机制。建议官方在文档中更明确地界定“个人使用”与“接口滥用”的边界。

*   **长期停滞 PR 的清理与归档**：
    *   [PR #2739](https://github.com/netease-youdao/LobsterAI/pull/2739)：添加无密钥 Parallel 网络搜索功能。该 PR 由贡献者 `georgeatparallel` 于 9 月提交，因长时间未回复被标记为 stale 并今日关闭。
    *   [PR #2798](https://github.com/netease-youdao/LobsterAI/pull/2798)：修复凭据日志脱敏及安全漏洞。该 PR 包含多个安全修复（OAuth token 日志泄露等），同样因 stale 标记被关闭。需确认这些安全修复是否已通过其他方式合并，若未合并则存在安全隐患。

## 5. Bug 与稳定性
今日合并的 PR 中包含了多项已修复的稳定性问题，未发现新的重大未修复崩溃报告。

1.  **内存溢出/冻结 (严重)**：
    *   **问题**：长会话中生成多张图片会导致应用冻结，元数据体积膨胀至 GB 级别。
    *   **状态**：已修复 ([PR #2999](https://github.com/netease-youdao/LobsterAI/pull/2999))。
2.  **macOS 进程残留 (中等)**：
    *   **问题**：退出应用后，内置 dsh 进程未正确终止，端口占用，重启后状态同步错误。
    *   **状态**：已修复 ([PR #3008](https://github.com/netease-youdao/LobsterAI/pull/3008))。
3.  **macOS UI 焦点异常 (轻微)**：
    *   **问题**：Desktop Companion 面板在某些操作后失去焦点，导致 immediate blur 并自动关闭。
    *   **状态**：已修复 ([PR #3006](https://github.com/netease-youdao/LobsterAI/pull/3006))。
4.  **插件安装失败 (中等)**：
    *   **问题**：从 Dock/开始菜单启动时，因 PATH 环境变量限制导致 `pnpm` 命令找不到，插件安装失败。
    *   **状态**：已修复 ([PR #3007](https://github.com/netease-youdao/LobsterAI/pull/3007))。

## 6. 功能请求与路线图信号
*   **Parallel 网络搜索集成**：
    *   虽然 [PR #2739](https://github.com/netease-youdao/LobsterAI/pull/2739) 被关闭，但其提议为 Web Search Skill 增加无需 API Key 的 Parallel 引擎支持（使用 Fast 模式限速）。这是一个有价值的低成本增强功能，建议团队重新评估是否采纳，以降低用户对第三方 Key 的依赖。
*   **安全加固**：
    *   [PR #2798](https://github.com/netease-youdao/LobsterAI/pull/2798) 涉及日志脱敏和代理认证。如果该 PR 被简单关闭而未回溯合并其安全修复（特别是 OAuth token 不在日志中明文打印），建议立即验证当前 `release/2026.11.2` 分支是否依然存在日志泄露风险。

## 7. 用户反馈摘要
*   **对接口调用的误解**：
    *   用户普遍倾向于将 LobsterAI 视为一个单纯的模型 API 提供方，而非一个独立的桌面应用产品。
    *   典型场景：“为了方便在本地其他脚本/工具中调用，我将接口反向代理了出去……仅是为了方便/偷懒。”
    *   **痛点**：用户未意识到此类行为违反了 ToS 或触发了风控，且缺乏清晰的申诉反馈通道，只能在 Issue 区公开求助。
*   **对性能优化的肯定**：
    *   虽然今日无直接针对性能优化的正面评论，但开发者对启动时间（减少数秒）和内存占用（从 GB 级降至 KB/Mb 级）的修复直接回应了此前可能存在的“卡顿”和“假死”抱怨。

## 8. 待处理积压
*   **安全相关 PR 的归宿**：
    *   [PR #2798](https://github.com/netease-youdao/LobsterAI/pull/2798) 被标记为 stale 并关闭。需确认该 PR 中的安全修复（日志脱敏、Symlink 包含、代理认证）是否已被 cherry-pick 到主分支。如果没有，这属于**高优先级安全债务**。
*   **Open 状态的 PR**：
    *   [PR #3012](https://github.com/netease-youdao/LobsterAI/pull/3012)：修复 OpenClaw 登出配置收缩问题。状态为 Pending，需 CI 通过及 Reviewer 批准。
    *   注意：今日大部分核心 PR 均由同一作者 `fisherdaddy` 提交并快速合并，建议关注 Review 流程是否过于集中或是否存在快速合并导致的潜在风险。

---
**分析师建议**：
1.  **风控沟通优化**：建议在客户端登录报错页直接提供清晰的“违规原因说明”及短期申诉入口，减少用户在 GitHub Issues 的大量同质化申诉，保护社区讨论环境。
2.  **安全审计**：立即核实 [PR #2798](https://github.com/netease-youdao/LobsterAI/pull/2798) 中关于日志脱敏的代码是否已在当前发布分支中生效，防止敏感信息（Token）泄露。
3.  **文档更新**：在开发者/高级用户指南中，明确禁止将 LobsterAI 内置接口用于非官方客户端的反向代理，以规避未来的法律与合规风险。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-11-06)

## 1. 今日速览
Moltis 项目在 2026 年 11 月 06 日的前 24 小时内整体处于**低活跃度维持期**。过去 24 小时内无新 Issue 产生，无 PR 合并，项目未发布新版本。活跃度核心驱动力来自一个**待合并的功能性 Pull Request**（#1321），该 PR 旨在扩展 Web 搜索能力。社区讨论热度较低，无显著 Bug 报告或紧急修复活动，项目处于平稳的代码积累阶段。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
过去 24 小时内**无 PR 合并**。项目进展主要体现在新功能的预演阶段，具体为新增搜索提供者的代码提交（PR #1321 仍处于 Open 状态，尚未进入主干代码库）。

## 4. 社区热点
当前社区唯一活跃的热点为功能扩展类 Pull Request，反映了用户/贡献者对**去中心化或无密钥搜索能力**的需求。

*   **PR #1321: feat(tools): add Keenable as a web search provider**
    *   **状态**: OPEN (待合并)
    *   **作者**: ilya-bogin-keenable
    *   **创建时间**: 2026-11-04
    *   **更新时间**: 2026-11-05
    *   **链接**: [moltis-org/moltis PR #1321](https://github.com/moltis-org/moltis/pull/1321)
    *   **分析**: 该 PR 引入了 `keenable` 作为 `web_search` 的可选提供器（`provider = "keenable"`）。核心价值在于提供**无需 API Key** 的搜索选项，且不依赖 DuckDuckGo 回退机制。这解决了部分用户在隐私保护或免配置场景下的搜索需求。目前评论数为 0，表明该提案尚未引发大规模社区辩论，但属于有价值的功能增强。

## 5. Bug 与稳定性
过去 24 小时内**无新报告的 Bug**、崩溃或回归问题。项目稳定性指标保持良好，无严重级别问题需要紧急处理。

## 6. 功能请求与路线图信号
基于现存 PR 和 Issue 数据，以下功能信号值得关注：

*   **多源搜索支持 (High Signal)**: PR #1321 明确指向了搜索引擎多元化。当前默认提供器为 `brave`，存在对 DuckDuckGo 的依赖。引入 `keenable` 若无密钥限制，符合轻量级部署和隐私优先的用户画像。鉴于该 PR 已提交且结构清晰，**极大概率被纳入下一个 minor 版本**。
*   **其他功能请求**: 过去 24 小时无新增 Issue，因此无新的显式功能请求。

## 7. 用户反馈摘要
由于过去 24 小时内 Issues 数量为 0，且唯一活跃的 PR 评论数为 0，**无法提取基于用户直接评论的痛点或满意度反馈**。

*   **间接推断**: PR #1321 的存在本身即为用户/开发者对当前搜索配置灵活性不足（特别是密钥依赖）的一种非正式反馈。

## 8. 待处理积压
*   **PR #1321** 自 2026-11-04 创建以来已开放 2 天（截至 11-06），状态为 Open。虽然时间不长，但作为功能增强 PR，建议维护者尽快进行代码审查（Code Review），以避免长期搁置影响功能迭代节奏。
*   无其他长期未响应的重要 Issue 或 PR 在此时间窗口内显示。

---
**项目健康度评估**: 🟢 **稳健**
*   **活跃度**: 低（0 Issues, 1 Open PR, 0 Merged）
*   **风险**: 低（无 Bug 报告）
*   **建议行动**: 审查 PR #1321 以推进搜索功能多样化。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 开源项目动态日报（2026-11-06）

## 1. 今日速览
过去 24 小时内，CoPaw 社区保持高强度迭代。项目在内存架构扩展、本地模型支持（Ollama）、Windows 系统兼容性优化以及插件系统重构方面取得了实质性进展。
- **Issues 动态**：更新 14 条（新增/活跃 10 条，已关闭 4 条）
- **PR 动态**：更新 32 条（待合并 20 条，已合并/关闭 12 条）
- **版本发布**：今日无新版本发布

---

## 2. 项目进展（已合并/关闭的重大 PR）

今日共有 12 个 PR 完成合并或关闭，核心进展集中在**模型降级保护**、**多后端长短期记忆**和**接入通道稳定性**：

- **模型降级与冷却机制**：[#6659](https://github.com/agentscope-ai/CoPaw/pull/6659) 合并。实现了主模型遇限流、超时或服务异常时的自动 Failover 降级策略，并引入 Cooldown（冷却）机制，解决了大流量场景下的服务连续性问题（修复了 #2199, #1327, #2089）。
- **OpenViking 记忆后端插件落地**：[#7613](https://github.com/agentscope-ai/CoPaw/pull/7613) 合并（对应讨论 [#7252](https://github.com/agentscope-ai/CoPaw/issues/7252)）。正式引入基于 OpenViking REST API 的长期记忆插件，支持自动回溯、对话轮次持久化及显示调用 `memory_search` 工具。
- **ACL 访问控制目录治理**：[#6788](https://github.com/agentscope-ai/CoPaw/pull/6788) 合并。统一使用 Shared Root Profile 存放 ACL 权限表，防止多任务场景下 ACP 协议自动创建新任务目录导致 Telegram/Matrix 通道权限判定失效。
- **Matrix 协议加密与状态恢复**：[#8558](https://github.com/agentscope-ai/CoPaw/pull/8558) 合并。简化了 Matrix 旧状态迁移逻辑与设备锁（Device Locking），解决了由于旧文件残留导致的无法启动及 Workspace 绑定冲突问题。
- **OpenAI SDK 参数兼容过滤**：[#7738](https://github.com/agentscope-ai/CoPaw/pull/7738) 合并。自动过滤代理层注入的非法 kwargs（如 `streamIdleTimeoutMs`），防止其传递给 upstream API 导致 TypeError。

---

## 3. 社区热点

今日讨论度较高的议题集中在**长文本与中文字符处理边界**以及**插件系统 UI 体验**上：

1. **ReMe 记忆向量化 CJK 静默丢包问题** ([#8040](https://github.com/agentscope-ai/CoPaw/issues/8040))
   - **痛点**：在对中日韩（CJK）长文本进行 ReMe embedding reindex 时，个别 Chunk 超过 Provider 的 Token 限制会导致整个 Batch 静默被丢弃，但日志仍显示 `processed=126/126`，数据存在丢失隐患。社区正在探讨细化 Chunk 切分粒度与明确失败重试逻辑。
2. **Creator 工作流阻断性 Error** ([#8592](https://github.com/agentscope-ai/CoPaw/issues/8592))
   - **痛点**：在 Creator 项目评审阶段，用户点击 REJECT 时触发 422 `"visual artifact reference references missing id"` 导致流程永久卡死，且伴随 FFmpeg 路径识别失效与 CDN 502。
3. **插件注册路由导致左侧导航跳转异常** ([#8590](https://github.com/agentscope-ai/CoPaw/issues/8590))
   - **诉求/解决**：第三方插件注册 Settings 区域路由时，点击后左侧导航栏会异常退回会话列表。开发者很快提交了 fix PR [#8593](https://github.com/agentscope-ai/CoPaw/pull/8593) 修复此导航状态保持问题。

---

## 4. Bug 与稳定性

按严重程度排列今日突出的 Bug 报告及修复状态：

### 🔴 阻断级 / P0-P1
- **Windows 路径长前缀导致 SQLite 读取失败** ([#8585](https://github.com/agentscope-ai/CoPaw/issues/8585))
  - **现象**：Windows Desktop 下 `workspace_dir` 被规范化为 `\\?\` extended-length 路径，导致 `recall_history` 调用的 SQLite Read-only URI 无法识别抛错。
- **Creator 评审拦截及流程卡死** ([#8592](https://github.com/agentscope-ai/CoPaw/issues/8592))
  - **现象**：如热点部分所述，REJECT 操作抛出 422 校验错误，引发状态机卡死。
- **ReMe Embedding CJK 静默失败** ([#8040](https://github.com/agentscope-ai/CoPaw/issues/8040))
  - **现象**：超限 Chunk 导致整组向量落库失败却无 Warning/Error 报警。

### 🟡 中危 / P2
- **Memory 标签索引不可用 (503)** ([#8580](https://github.com/agentscope-ai/CoPaw/issues/8580))
  - **现象**：`/memory/tags` 接口持续返回 503 "Memory tag index is unavailable"，索引未能自动重建。
- **ReMe Reranker 空 API Key 静默允许启用** ([#8276](https://github.com/agentscope-ai/CoPaw/issues/8276))
  - **修复进展**：PR [#8291](https://github.com/agentscope-ai/CoPaw/pull/8291) 已提交，增加强校验逻辑，未配置 API Key 时禁止启用。
- **`/clear` 指令后重新打开对话渲染异常** ([#8596](https://github.com/agentscope-ai/CoPaw/issues/8596))
  - **现象**：清空会话后，重新进入该会话不会显示初始 Greeting 欢迎语，而是继续保留 `/clear` 历史占位条。

### 🟢 已解决 / Fixed
- **Code 模式下参数名冲突导致的 TypeError** ([#8581](https://github.com/agentscope-ai/CoPaw/issues/8581)) -> **CLOSED**
  - 工具形参名包含 `name` 时与 Code 执行器位置参数冲突，通过声明 Positional-only 参数根治。
- **DeepSeek-v4-pro 模型 `chat_template_kwargs` 校验失败** ([#7026](https://github.com/agentscope-ai/CoPaw/issues/7026)) -> **CLOSED**

---

## 5. 功能请求与路线图信号

根据最新的 PR 提交趋势，以下架构与功能优化有望在下一版本（v2.3.0 正式版/v2.4）中落地：

1. **MCP 架构插件化抽离** ([PR #8469](https://github.com/agentscope-ai/CoPaw/pull/8469))
   - 将 Model Context Protocol (MCP) 从核心层剥

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 开源项目动态日报（2026-11-06）

## 1. 今日速览

过去 24 小时内，ZeroClaw 项目展现出极高的活跃度与密集的安全审计节奏。项目团队正在全力推进 **v0.9.0 版本的发布准备**，重点聚焦于**多租户/主权身份权限隔离（Identity & Access Control）、SOP 执行安全防护、以及 Gateway OIDC 认证健壮性**。

数据方面，过去 24 小时共有 **30 条 Issue 更新**（新开/活跃 28 条，已关闭 2 条），**50 条 PR 处于待合并/迭代状态**（今日暂无合并 PR）。目前代码库存在一定的 PR 审阅与合并积压，多项涉及核心架构改动（如多模型 Provider 支持、Rust/Wasm Web UI、全局会话追加事件日志）的大型 PR 正在进行深入讨论。

---

## 2. 项目进展

虽然今日无合并 PR，但团队对多个影响极其严重的安全漏洞进行了关闭验证与修复 PR 储备，重大进展包括：

* **核心安全漏洞修复（已验证关闭）：**
  * [#9394](https://github.com/zeroclaw-labs/zeroclaw/issues/9394): 修复配对面板配置被忽略且配对码永不过期的严重安全缺陷。
  * [#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239): 修复了子 Agent 派生（`spawn_subagent`）和流水线执行（`execute_pipeline`）可以绕过租户隔离越权访问共享内存平面的 S0 级漏洞。
* **v0.9.0 发版阻塞 PR 推进中：**
  * PR [#12232](https://github.com/zeroclaw-labs/zeroclaw/pull/12232): 剥夺非管理员身份调用非主体感知工具（如 Cron、SOP 执行、Peer 消息）的权限。
  * PR [#12244](https://github.com/zeroclaw-labs/zeroclaw/pull/12244): 实现了非管理员账号在 Gateway Dashboard 下受控的 Agent 聊天隔离机制。
  * PR [#11921](https://github.com/zeroclaw-labs/zeroclaw/pull/11921): 统一会话历史记录，重构为只追加（Append-only）的事件日志架构。

---

## 3. 社区热点

今日讨论度最高的 Issues 主要集中在 **Web 前端去 Node.js 化的架构转型** 以及 **通道/SOP 的静默失效问题**：

1. **[#8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132) Evaluate Rust/WASM web UI prototype before React/Vite migration** *(13 条评论)*
   * **背景与诉求**：项目计划将现有的 React + Vite 构建流水线彻底剔除，转向 Rust 原生 Web 框架（Dioxus / Leptos / Yew），编译为 Wasm 静态资产。
   * **讨论重点**：社区正在对 PR [#11355](https://github.com/zeroclaw-labs/zeroclaw/pull/11355)（Dioxus PoC 实现）进行评估，重点关注 WASM 构建包体积、DOM 渲染性能及离线 PWA 支持能力。
2. **[#10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926) Matrix send_via treats peer user identities as room destinations** *(8 条评论)*
   * **背景**：在 Matrix 通道中使用 `send_via` 工具时，系统错误地将 Peer 用户 Identity 当做 Room ID 处理，导致消息投递失败。
3. **[#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) sops_dir: documented default is not honoured by the daemon** *(7 条评论)*
   * **背景**：文档承诺 `sops_dir` 有默认路径，但 Daemon 启动时却要求其必须显式配置，导致基于默认配置的 SOP 系统静默失效，且没有任何日志或警告。

---

## 4. Bug 与稳定性

今日新报告及活跃的漏洞以 **权限越权 (Authorization Bypass)** 和 **安全防护失效** 为主，按严重程度分类如下：

### 🔴 S0 / S1 极高风险 (Release Blockers for v0.9.0)
* **权限/身份隔离失效：**
  * [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126): 队列中的会话操作在管理员权限被撤销后仍保留越权执行能力。
  * [#11127](https://github.com/zeroclaw-labs/zeroclaw/issues/11127): 会话数据读取工具绕过了主体（Principal）所有权检查，非管理员可读取他人历史。
  * [#12046](https://github.com/zeroclaw-labs/zeroclaw/issues/12046) & [#12051](https://github.com/zeroclaw-labs/zeroclaw/issues/12051): 配置通配符工具集的非管理员账户可通过 SOP Workshop 编写高权限 SOP 并借由 Cron/管理员身份提权。 *(已有修复 PR [#12232](https://github.com/zeroclaw-labs/zeroclaw/pull/12232))*
* **网关与认证攻击风险：**
  * [#12050](https://github.com/zeroclaw-labs/zeroclaw/issues/12050): OIDC 回调页面缺少浏览器绑定校验，存在登录 CSRF 风险。
  * [#12047](https://github.com/zeroclaw-labs/zeroclaw/issues/12047): OIDC Bearer Token 验证接口缺乏频率限制与并发上线控制，易引发外部 DoS。 *(已有修复 PR [#12233](https://github.com/zeroclaw-labs/zeroclaw/pull/12233))*
* **SOP 判定失效：**
  * [#11124](https://github.com/zeroclaw-labs/zeroclaw/issues/11124): SOP 判定门控在模型输出异常时忽略了严格降级（Fail-closed）模式。 *(已有修复 PR [#12237](https://github.com/zeroclaw-labs/zeroclaw/pull/12237))*

### 🟡 S2 / S3 中低风险与功能缺陷
* **模型上下文与工具执行：**
  * [#12194](https://github.com/zeroclaw-labs/zeroclaw/issues/12194): 未

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*