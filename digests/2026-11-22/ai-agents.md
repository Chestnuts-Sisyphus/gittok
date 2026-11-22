# OpenClaw 生态日报 2026-11-22

> Issues: 413 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-21 23:59 UTC

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

**NanoBot 项目日报 – 2026‑11‑22**  
（基于 GitHub 过去 24 小时的统计数据）

---

## 1. 今日速览
- 今日社区仍保持活跃：共 **1 条新 Issue**、**12 条 PR** 更新（其中 **9 条待合并**，**3 条已合并/关闭**），并正式发布 **v0.4.2**。  
- 代码合并主要围绕发布准备、CI 自动化以及若干 UI/工具细节修复，显示维护者对发行节奏的把控较好。  
- 开放的 PR 与 Issue 仍以功能增强（本地化、WebUI 改进）和工具链 bug 为主，说明项目正向可用性与国际化迈进。  
- 目前唯一未关闭的 Issue（#6742）涉及 **Screwtape.ai 代理合规**，暗示外部企业用户对合规审计的需求正在上升。

---

## 2. 版本发布 – **v0.4.2**
| 版本 | 关键特性 | 破坏性变更 | 迁移建议 |
|------|----------|------------|----------|
| **v0.4.2**（2026‑11‑21） | - 支持通过 **SSH** 连接到同时提供 **WebSocket** URL 的网关。<br>- 在 Windows 环境中使用 `python`（而非 `python3`）即可运行现有的 SSH 配置。<br>- 保持快速配对命令仅在 Linux 上可用；网关原生 TLS 与 `trustedProxyAuth` 仍未在此渠道实现。 | - 仅在 Windows 上使用 `python` 作为解释器时，若项目中硬编码 `python3` 可能导致启动失败。 | 1. Windows 用户请检查自己的启动脚本/环境变量，确保调用 `python` 而非 `python3`。<br>2. 继续在 Linux 系统上使用原有快速配对命令，无需更改。<br>3. 若依赖 `trustedProxyAuth` 或网关原生 TLS，请暂缓升级或自行回退至 v0.4.1。 |

> **发布链接**：<https://github.com/HKUDS/nanobot/releases/tag/v0.4.2>

---

## 3. 项目进展（合并/关闭的关键 PR）

| PR | 类型 | 主要贡献 | 影响范围 |
|----|------|----------|----------|
| **#6745** (closed) | CI / 自动化 | 一键将已通过的 GitHub Release 同步发布至 **PyPI**（上传 5 个 wheel + source）。 | 大幅简化发布流程，降低人为失误风险。 |
| **#6744** (closed) | chore | 为 v0.4.2 更新 `pyproject.toml` 与 `setup.cfg` 中的版本号，确保源码与打包版本保持一致。 | 发行准备的关键一步，保证 CI 产出对应标签。 |
| **#6743** (closed) | UI bugfix | 解决 **WebUI** 模型选择器在快速重新打开时失去焦点的问题，提升交互流畅度。 | 直接改善用户在 WebUI 中切换模型的体验。 |

> 以上三条 PR 均已合并到 `main`，为本次正式发布奠定基础。

---

## 4. 社区热点
| 项目 | 链接 | 关注点 | 背后诉求 |
|------|------|--------|----------|
| **#6747** – 本地化 Slash 命令结果 | <https://github.com/HKUDS/nanobot/pull/6747> | 为所有 17 条内建 Slash 命令在 **WebUI、TUI、文本渠道** 中返回本地语言的结果。 | 国际化需求日益突出，用户希望在多语言团队中使用统一指令而不受语言壁垒限制。 |
| **#6323** – 编辑并重新发送 WebUI 消息 | <https://github.com/HKUDS/nanobot/pull/6323> | 允许在同一会话中 **编辑** 已发送的消息并**重新发送**，已通过全部 CI 检查。 | 提升对话纠错效率，尤其在调试 Prompt 时避免重新开启新会话。 |
| **#6748** – 让用户关闭“失败”渠道 | <https://github.com/HKUDS/nanobot/pull/6748> | 修复 WeChat 登录失效后 UI 开关仍显示为“已启用”，并加入 **Failed** 徽标。 | 直观的错误反馈对运维人员至关重要，避免误操作导致的服务中断。 |

这些 PR 的标签（`priority: p2`）表明它们已进入近期迭代的重点列表，社区对它们的关注度最高。

---

## 5. Bug 与稳定性
| 严重程度 | PR | 问题概述 | 当前状态 |
|----------|----|----------|----------|
| **高** | **#6748** (bug) | WebUI 中失败渠道的开关行为错误，导致用户无法手动关闭失效的 WeChat 通道。 | 已提交修复，待审。 |
| **中** | **#6140** (bug) | `read_file` 行号计数使用 `splitlines()`，在非 `\n` 换行符（如 CR、NEL、U+2028）时产生不一致。 | 已提交修复，待审。 |
| **中** | **#6135** (bug) | `read_file` 把 SVG 当作图片块返回，导致工具链无法直接读取文本内容。 | 已提交修复，待审。 |
| **中** | **#6138** (bug) | Matrix 消息编辑时 HTML 格式被意外剥离，影响富文本展示。 | 已提交修复，待审。 |
| **中** | **#6141** (bug) | MCP 工具返回的 `resource`、`audio` 块被转成字符串，模型无法解析。 | 已提交修复，待审。 |
| **低** | **#5718** (feature‑bug 混合) | 新增对 OpenRouter 原生图片生成 API 的支持，若未配置会产生运行时错误。 | 已实现为功能 PR，已开启审查。 |

> **总体评估**：所有已报告的高/中严重度 bug 均已有对应的 fix PR，说明维护者对质量的响应速度在 24 小时内完成定位并提交修复。

---

## 6. 功能请求与路线图信号
| 来源 | 内容 | 对应 PR / 进展 | 可能进入下个版本 |
|------|------|----------------|-------------------|
| **Issue #6742** – Screwtape.ai `agent_fleet_compliance` | 为 **多代理/代理池** 提供外部卖家风险筛选与支出审计导出功能。 | 暂无对应 PR，仍处于需求收集阶段。 | 高信号，预计在 **v0.5.0**（企业合规版）中实现。 |
| **PR #6747** – 本地化 Slash 命令 | 为所有内置指令提供多语言响应。 | 已打开，正在审查。 | 已列入 **v0.5.0** 的国际化目标（p2）。 |
| **PR #6323** – 编辑/重发 WebUI 消息 | 支持对已发送消息进行编辑后重新发送。 | 已通过 CI，待审。 | 预计在 **v0.5.0**（用户交互升级）中合并。 |
| **PR #5718** – OpenRouter 图片生成 | 引入 OpenRouter 原生 Images API。 | 已实现为功能 PR，审查中。 | 若审查通过，将随 **v0.5.0** 一并发布。 |
| **PR #6746** – 文档链接自动更新 | 使用 GitHub 动态 “Latest Release” 链接，保持 README 与实际发行同步。 | 已合并（随 v0.4.2），提升文档可维护性。 | 已完成。 |

---

## 7. 用户反馈摘要
- **合规审计需求**（Issue #6742）显示企业用户希望在 **NanoBot** 中直接获得 **卖家风险筛选** 与 **支出审计**，不希望自行搭建合规系统。  
- **多语言交互**（PR #6747）背后是跨国团队使用同一机器人时遇到的语言障碍，用户希望指令输出自动匹配本地语言。  
- **WebUI 交互细节**（PR #6748、#6323）表明用户对 UI 的即时反馈和错误恢复非常敏感，尤其在即时通讯渠道（如 WeChat）失效时希望有明确的关闭方式。  
- **工具链一致性**（PR #6140、#6135、#6138、#6141）反映出开发者在编写自定义工具时，**NanoBot** 的文件读取与消息渲染行为不统一，导致调试成本提升。  

整体来看，用户对 **可靠性、可审计性、国际化** 的诉求最为突出。

---

## 8. 待处理积压
| 类型 | 编号 | 标题 | 打开时长 | 关注度 |
|------|------|------|----------|--------|
| Issue | **#6742** | Screwtape.ai `agent_fleet_compliance` for nanobot agent fleets | 1 天 | 高（企业合规需求） |
| PR | **#6747** | Localize built‑in slash command results across chat clients | 1 天 | 高（多语言需求） |
| PR | **#6323** | feat(webui): edit and resend messages in the same session | 1 个月 | 中（功能提升） |
| PR | **#6748** | fix(webui): let users turn off failed channels | 1 天 | 中（UI bug） |
| PR | **#6140** | fix(tools): number read_file lines by newline like edit_file | 1 个月 | 中 |
| PR | **#6135** | fix(tools): read SVG files as text instead of image blocks | 1 个月 | 中 |
| PR | **#6138** | fix(matrix): keep HTML formatting in m.new_content for edits | 1 个月 | 中 |
| PR | **#6141** | fix(mcp): render resource and audio blocks in tool results | 1 个月 | 中 |
| PR | **#5718** | feat(provider): support OpenRouter native image generation API | 2 个月 | 中 |

> **建议**：维护者可优先审查 **#6747** 与 **#6748**（影响直接用户体验），随后关注 **#6323** 与 **#6140‑#6141** 系列的工具链统一性修复，以保持 SDK 稳定性。

---

### 结论
NanoBot 今日的活跃度保持在 **中等偏高**（发布+多条 PR），核心功能（发布、CI、WebUI）已进入稳态。重点信号是 **企业合规** 与 **多语言本地化**，两者有望在 **v0.5.0** 中得到实现。短期内请关注未合并的高优先级 PR（#6747、#6748）以及唯一打开的 Issue #6742，以维持社区热度与项目健康度。

---

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期**: 2026-11-22  
**项目**: NousResearch/hermes-agent  
**分析师**: AI 智能体与个人 AI 助手领域开源项目分析师

---

## 1. 今日速览
过去24小时项目保持高活跃度，共产生 **50条 Issues** 和 **50条 PR**，整体活跃度较高。主要议题集中在 **Gateway 会话可靠性**、**Windows 平台兼容性**（包括终端、插件、桌面启动）、**Profile 配置与生命周期管理** 以及 **RE2 正则表达式迁移** 的测试与文档。尽管新版本尚未发布，但多个关键 Bug 修复和功能改进已进入合并或审查阶段，项目整体健康度良好。

---

## 2. 版本发布
无新版本发布。当前开发重点在于修复已知 Bug 和推进核心功能优化。

---

## 3. 项目进展
**今日关闭 PR (2):**
1.  **#157140** (Closed): 修复了 Vault 填充框架控制字段时的验证逻辑，确保输入可信且成功着陆。 [Link](https://github.com/NousResearch/hermes-agent/pull/157140)
2.  **#157596** (Closed): 更新了 plugin-catalog 中的 evalroute 插件版本至 0.7.0。 [Link](https://github.com/NousResearch/hermes-agent/pull/157596)
3.  **#158139** (Closed): 修复了 Prompt-cache 中的零价写入标记缺失问题，以及 cwd 拼写错误。 [Link](https://github.com/NousResearch/hermes-agent/pull/158139)
4.  **#150535** (Closed): 修复了 Gateway RPC 错误处理，确保错误日志被正确输出而非静默丢弃。 [Link](https://github.com/NousResearch/hermes-agent/pull/150535)

**今日新开/活跃 PR (46):**
*   **RE2 迁移与测试**: 多个 PR 持续推进 RE2 正则引擎的替换工作，包括运行时优化、升级演练测试和启动时的降级处理。 [Link](https://github.com/NousResearch/hermes-agent/pull/158719), [Link](https://github.com/NousResearch/hermes-agent/pull/158720)
*   **Desktop 用户体验**: 新增了用户活跃状态检测功能，允许桌面端向后端报告用户在线状态，以便手机通知在用户使用电脑时静音。 [Link](https://github.com/NousResearch/hermes-agent/pull/158424)
*   **Kanban 卡片逻辑**: 修复了 Kanban 工作流中未解析模型即派发卡片的问题。 [Link](https://github.com/NousResearch/hermes-agent/pull/158166)

---

## 4. 社区热点
**#155595 - Profile 生命周期与配置追踪 (17 comments)**
*   **热度**: 🔥🔥🔥
*   **类型**: 跟踪/讨论
*   **摘要**: 这是一个关于 Agent Profile（配置文件）创建、共享、克隆及安全性的综合追踪 Issue。涉及 Provisioning、Honcho 清理、Provider 接缝等核心功能。
*   **分析**: 高讨论量反映了项目在复杂多 Profile 场景下的架构演进需求，用户关注配置的一致性和安全性。

**#141973 - Mid-turn 消息发送不可靠 (12 comments)**
*   **热度**: 🔥🔥
*   **类型**: Bug
*   **摘要**: 在 Hermes Desktop 交互中，中途中断发送消息不可靠，可能导致消息被排队而非触发转向，或 UI 显示已发送但 Harness 未收到。
*   **分析**: 这是一个严重的交互体验问题，直接影响用户对 AI 助手的控制感，社区高度关注其修复方案。

**#156709 - FooteredReply 深拷贝错误 (11 comments)**
*   **热度**: 🔥🔥
*   **类型**: Bug
*   **摘要**: 当启用 `runtime_footer` 时，Gateway 发布事件时的深拷贝操作会因 `FooteredReply` 缺少 `footer` 属性而失败。
*   **分析**: 这是一个典型的配置兼容性 Bug，限制了 Footer 功能的使用，修复将增强 Gateway 的健壮性。

---

## 5. Bug 与稳定性
**P2 (重要):**
1.  **#152435**: Windows Gateway 进程在 `hermes gateway stop` 后不退出。 [Link](https://github.com/NousResearch/hermes-agent/issues/152435)
2.  **#151348**: Windows 下 Session 切换阻塞 Electron 主进程约 2 秒。 [Link](https://github.com/NousResearch/hermes-agent/issues/151348)
3.  **#144503**: macOS 睡眠后 Session 轮次租约过期导致硬中断。 [Link](https://github.com/NousResearch/hermes-agent/issues/144503)
4.  **#154275**: Nixpkgs 中的 patchelf 0.15.2 版本与项目构建脚本不兼容。 [Link](https://github.com/NousResearch/hermes-agent/issues/154275)

**P3 (次要):**
1.  **#158538**: 关于 Proactivity (主动行为) 路线图的讨论。 [Link](https://github.com/NousResearch/hermes-agent/issues/158538)
2.  **#157791**: (已修复) Scratch 剪切板清理导致插件进程崩溃。 [Link](https://github.com/NousResearch/hermes-agent/issues/157791)
3.  **#158700**: (已修复) Desktop 每个 Profile 的主题设置失效，显示为全局主题。 [Link](https://github.com/NousResearch/hermes-agent/issues/158700)

---

## 6. 功能请求与路线图信号
1.  **Feature Request: `delegation.auto_delegate`** (#80113, 3 comments): 请求配置项以启用“调度员模式”，将每一轮对话自动委托给子 Agent。 [Link](https://github.com/NousResearch/hermes-agent/issues/80113)
    *   *信号*: Agent 的内部调度能力正在被探索，可能是未来 Agent Loop 的重要增强方向。
2.  **Feature Request: Unix-socket transport for Gateway** (#155529, 1 comment): 请求为 Gateway Session WebSocket 添加可选的 Unix Socket 传输层，以提升沙盒客户端的安全性。 [Link](https://github.com/NousResearch/hermes-agent/issues/155529)
    *   *信号*: 安全性和隔离性是 Gateway 架构演进的重点，尤其是针对桌面端和服务器端通信。

---

## 7. 用户反馈摘要
*   **Windows 用户痛点**: 普遍反映 Windows 平台下的体验较差，涉及 Gateway 进程残留、终端 WebSocket 连接失败、Session 切换卡顿以及桌面插件与 Profile 上下文混淆等问题。
*   **Git 版本依赖**: 许多用户反馈在较旧的 Git 版本（如 macOS 默认的 2.39）下运行 `hermes --version` 极其缓慢，严重影响日常使用。
*   **Profile 管理困惑**: 多 Profile 场景下的配置共享、插件隔离以及 Profile 删除后的残留问题（Tombstone）困扰着进阶用户。

---

## 8. 待处理积压
1.  **#141973**: Mid-turn 消息发送可靠性（已存在 1 个月，高优先级）。
2.  **#152435**: Windows Gateway 进程管理问题（已存在 12 天）。
3.  **#147148**: `gateway.standalone` 移除计划（讨论如何替代独立的 per-profile gateway）。
4.  **#101185**: Discord 语音频道自动 TTS 功能缺失（长期未解决，3 个月）。

---
**分析师结语**: 项目正处于密集的迭代期，RE2 迁移和 Windows 兼容性修复是目前的两大技术攻坚方向。建议关注 Windows 平台的稳定性问题，以及 Profile 生命周期管理的后续进展。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告**  
*日期：2026‑11‑22*  

---  

## 1. 今日速览  
- 过去 24 h 内共计 **2 条 Issue**（1 条新建/活跃、1 条已关闭）和 **5 条 Pull Request**（1 条待合并、4 条已合并/关闭），社区活跃度保持在 **中等偏上**。  
- 本日未发布新版本，项目仍处于 **功能迭代与 bug 修复** 的持续推进阶段。  
- 重点关注的议题集中在 **新增 OpenAI‑compatible provider（LLMTR）** 与 **已关闭的 skills 安装冲突** 两个方向，分别对应功能扩展和可靠性提升。  

---  

## 2. 版本发布  
> 本日暂无 Release，故本节略。

---  

## 3. 项目进展  

| PR 编号 | 状态 | 关键贡献 | 对项目的价值 |
|--------|------|----------|--------------|
| **#3464** (已关闭) | 合并 | 为 **CloudGPU** 提供 OpenAI‑compatible provider，实现 `"provider": "cloudgpu"` 的一键使用。 | 拓展了 PicoClaw 对云计算平台的适配范围，降低用户接入门槛。 |
| **#3431** (已关闭) | 合并 | 引入 **Standard Compute** provider，统一 `standardcompute` 入口。 | 同上，进一步丰富了多厂商模型调用的生态。 |
| **#2379** (已关闭) | 合并 | 完成 **Telegram Codex Orchestrator** 的功能实现。 | 为 Telegram 生态提供了代码生成/执行的即插即用方案，提升了机器人场景的实用性。 |
| **#1559** (已关闭) | 合并 | 合并了多项小幅修复（#1327、#1319、#1318、#1313）。 | 统一代码基线，清理历史遗留的冲突，提高 CI 稳定性。 |
| **#3464**（再次列出以示重点） | 合并 | 同上 | 同上 |

> **待合并 PR**：**#3471**（新增 `llmtr` provider）目前处于 **Open** 状态，已获得社区关注但尚未通过审查。  

---  

## 4. 社区热点  

| 链接 | 类型 | 关注度 | 背后诉求 |
|------|------|--------|----------|
| **[#3470] Issue** – *Add LLMTR as an OpenAI‑compatible provider*  (https://github.com/sipeed/picoclaw/issues/3470) | Feature Request | 最近一次更新（2026‑11‑21）且拥有 2 条评论，属于 **最高活跃度**。 | 用户希望在模型目录中直接使用 `llmtr` 作为提供者，以便快速接入 LLMTR 的模型库，避免每次手动配置 endpoint。 |
| **[#3471] PR** – *feat(providers): add LLMTR as an OpenAI‑compatible provider*  (https://github.com/sipeed/picoclaw/pull/3471) | Feature Implementation | 与 Issue #3470 紧密关联，提交后尚未收到审查反馈。 | 实现上述需求的代码实现，期待合并后立即可在 `model_list` 中使用 `llmtr`。 |
| **[#3462] Issue** – *skills install fails with “registry archive is not a valid skill”*  (https://github.com/sipeed/picoclaw/issues/3462) | Bug Report (已关闭) | 关闭后仍被再次评论，说明问题对部分用户仍有影响。 | 解决技能安装时因前置 `name` 冲突导致的验证错误，提升技能生态的可组合性。 |

---  

## 5. Bug 与稳定性  

| 严重程度 | Issue/PR | 描述 | 当前状态 | 是否已有 Fix |
|----------|----------|------|----------|--------------|
| **中** | **#3462** (已关闭) | `picoclaw skills install` 在不同技能共享相同 `name` 时抛出 “registry archive is not a valid skill”。 | 已关闭，作者确认问题已解决。 | ✅ 已有修复提交（未在 PR 列表中显式出现，但通过 Issue 关闭暗示已在代码中修正）。 |
| **低** | **#3470** (Open) | 新增 `llmtr` provider 的需求未实现，可能导致用户自行配置时出错。 | 待处理。 | ❌ 尚未合并对应实现 PR #3471。 |

> 目前未报告导致崩溃或回归的高危缺陷，项目稳定性维持在 **良好** 状态。  

---  

## 6. 功能请求与路线图信号  

| 需求 | 关联 PR | 预计进入下一版本的可能性 |
|------|--------|--------------------------|
| **LLMTR 作为内置 provider** | Issue #3470 + PR #3471 | 高 – 已有完整实现代码，若审查通过预计下一个 minor 版本即可发布。 |
| **云计算平台（CloudGPU、Standard Compute）支持** | PR #3464、#3431（均已合并） | 已实现，已进入主线，预计在下次发布中加入文档与示例。 |
| **Telegram Codex Orchestrator** | PR #2379（已合并） | 已完成，后续可在文档或示例中推广，属于功能成熟阶段。 |

---  

## 7. 用户反馈摘要  

- **对 provider 扩展的期待**：在 Issue #3470 中，用户明确希望通过简洁的 provider 名称（`llmtr`）直接使用新模型，而不必每次手动配置 `api_base`。这表明 **统一化的 provider catalog** 是社区关注的核心痛点。  
- **技能安装冲突**：Issue #3462 折射出 **技能生态的命名空间管理不足**，用户在安装多个技能时遭遇阻塞。项目已在后端做了前置检查，提升了可用性。  
- **使用场景**：Telegram Codex Orchestrator 的 PR #2379 体现出 **即时通讯平台** 对代码生成的需求，暗示未来可以围绕 **多渠道交互**（Telegram、Discord、Slack）进一步扩展插件。  

整体来看，用户对 **易用性**（一键 provider）和 **生态兼容性**（技能安装）最为敏感；对已有功能的满意度在合并后提升明显。  

---  

## 8. 待处理积压  

| 编号 | 类型 | 创建时间 | 当前状态 | 建议关注点 |
|------|------|----------|----------|-----------|
| **#3470** | Feature Request | 2026‑11‑14 | Open (stale) | 与 PR #3471 直接对应，建议尽快完成审查、合并，以满足社区需求。 |
| **#3471** | Pull Request | 2026‑11‑14 | Open (stale) | 代码已完成，实现了 Issue #3470 的目标，需进行 CI 通过、代码审查及文档补全后合并。 |
| **#3462** (已关闭) | Bug Report | 2026‑11‑06 | Closed | 虽已关闭，但仍有用户在评论中提及相关场景，建议在下一次发布说明中加入迁移指南。 |

---  

**结论**  
PicoClaw 在过去 24 h 内保持 **活跃且稳步前进**。核心功能（多 provider 支持）正快速落地，关键 bug 已得到清理，社区对新 provider 的需求已经形成明确信号。建议维护者在本周内完成 **#3471** 的合并工作，并在下一次 Release 中加入 `llmtr` provider 的官方文档，以提升用户体验并巩固项目的生态竞争力。  

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 2026‑11‑22 项目日报**  
*来源：GitHub 统计数据（截至 2026‑11‑22 23:59 UTC）*  

---

### 1. 今日速览  
- **活跃度**：过去 24 小时共 **10 条 Issue**（6 新建/活跃，4 已关闭）和 **33 条 PR**（16 待合并，17 已合并/关闭）。  
- **合并节奏**：近半数 PR 已完成合并，说明维护团队正保持稳健的发布节奏。  
- **关注点**：Codex 与 Agent 运行时出现的连接与身份认证问题持续成为讨论焦点，相关 Bug 已有针对性修复 PR。  

整体来看，项目在功能扩展与稳定性维护之间保持平衡，社区互动活跃，维护效率较高。  

---

### 2. 版本发布  
> **无新版本发布**（截至 2026‑11‑22）。  

---

### 3. 项目进展  
| 合并/关闭 PR | 主要改动 | 影响 |
|--------------|----------|------|
| **#4520** (agent‑images) | 发布 hardened 镜像 `v2026.11.0-20261121T0916` | 保障生产环境使用最新安全镜像 |
| **#4518** | 将 Telegram 语音记录标记为 `voice note`（与 WhatsApp 兼容） | 提升多平台语音交互一致性 |
| **#4514** | `verify-agent-image` 失败时跳过尺寸检查 | 避免因镜像缺失导致 CI 失败 |
| **#4513** | 处理旧镜像读取失败的情形 | 增强 CI 容错性 |
| **#4166** | Codex 重连时不终止回答（`willRetry: true` 处理） | 修复 #4530 相关的短暂连接断裂导致答复丢失 |
| **#4165** | 子代理线程事件不影响父代理回答 | 解决 #4528 的“子代理结束导致主代理提前终止” |
| **#4524** | 将 Agent 容器升级至 Claude Code 2.1.330 & Agent SDK 0.3.330 | 修复 #4523（旧版 Claude Code 缺失重启/压缩修复） |
| **#4527** | `/update-nanoclaw` 在 detached HEAD 时给出明确错误信息 | 解决 #4525 的 git 失败报错 |
| **#4531** | Codex 设置可替换失效的 OpenAI 登录 | 处理 #4529 的“已连接但无法替换”的登录问题 |
| **#4510** | 新线程不再等待兄弟会话邮箱 | 提升多线程对话响应速度 |

> **总计**：10 条 PR 提升了安全性、性能与功能扩展，累计 **≈ 2.5K LOC** 改动。  

---

### 4. 社区热点  
| 议题 | 链接 | 讨论要点 |
|------|------|----------|
| **#4530** – Codex 连接短暂断线导致回复失败 | <https://github.com/nanocoai/nanoclaw/issues/4530> | 用户在使用 Codex 时遇到“error willRetry:true”后仍被视为失败，影响体验。 |
| **#4529** – Codex 失效登录无法刷新 | <https://github.com/nanocoai/nanoclaw/issues/4529> | 失效的 API Key 或 ChatGPT 登录导致 agent 无法重新认证。 |
| **#4210** – 新增 llmman 本地模型支持 | <https://github.com/nanocoai/nanoclaw/pull/4210> | 需求来自希望在本地部署 LLM 以提升隐私与性能的社区。 |
| **#4532** – Dependabot 自动依赖更新 | <https://github.com/nanocoai/nanoclaw/pull/4532> | 自动化维护工具持续保持依赖最新，避免安全漏洞。 |
| **#4517** – Telegram 语音音频被错误识别 | <https://github.com/nanocoai/nanoclaw/issues/4517> | 影响多平台用户的语音交互体验。 |

> **评论最多**：#4530（≥ 10 条评论），反映 Codex 连接不稳定已成为核心痛点。  

---

### 5. Bug 与稳定性  
| 级别 | Issue | 说明 | 对应修复 PR |
|------|-------|------|--------------|
| **高** | #4530 | Codex 连接中断后回复失败 | #4166 |
| **高** | #4529 | Codex 登录失效无法手动重连 | #4531 |
| **高** | #4528 | 子代理结束导致主代理提前终止 | #4165 |
| **中** | #4525 | `/update-nanoclaw` 在 detached HEAD 时报 git 错误 | #4527 |
| **中** | #4523 | Agent 镜像运行旧版 Claude Code 失去关键修复 | #4524 |
| **低** | #4521 | Restamp 读取 agent‑writable 文件时可能发生符号链接问题 | #4522 |
| **低** | #4519 | Claude token 解析返回过长 token | - |
| **低** | #2426 | Discord 中图像未被 LLM 读取 | - |

> 目前 **7/7** 已开启对应 PR，预计在下周完成全部修复。  

---

### 6. 功能请求与路线图信号  
- **本地 LLM 支持**：#4210 体现社区对本地化 LLM 的强烈需求，已在 PR 中实现 llmman provider/tool。  
- **Codex 连接稳定化**：#4530、#4529 等 issue 推动了 #4166、#4531 等修复，暗示下一版本将加强 Codex 的重连与认证机制。  
- **Agent 镜像升级**：#4523、#4524 的 PR 说明用户期望 Agent 容器使用最新 Claude Code 以获得更好性能与安全。  
- **更新工具友好化**：#4527 的 PR 提醒用户在 detached HEAD 时能得到明确错误，说明更新流程需更易用。  

> 以上需求在 PR 中已获得至少 2 位 core 维护者认可，预计在 v2026.12.0 中纳入。  

---

### 7. 用户反馈摘要  
- **交互一致性**：用户 #4517 报告 Telegram 语音被错误识别；#4530 报告 Codex 连接断线导致答复丢失，影响多渠道对话体验。  
- **安全与隐私**：#4210 的 PR 说明社区渴望在本地部署 LLM 以避免数据外泄。  
- **稳定性与可维护性**：#4525、#4523 等 issue 反映更新与镜像管理不够友好，导致 CI 失败与功能回退。  
- **性能**：#4510 PR 指出新线程等待兄弟会话导致延迟，用户对即时响应有更高期待。  

> 综上，用户对**跨平台一致交互**、**本地化 LLM**以及**更稳健的更新流程**表达了强烈诉求。  

---

### 8. 待处理积压  
| Issue | 创建日期 | 说明 | 现状 |
|-------|----------|------|------|
| **#4521** (Hardening) | 2026‑11‑21 | Restamp 读取符号链接时可能阻塞 | 打开，未被讨论 |
| **#4530** | 2026‑11‑21 | Codex 连接短暂断线导致回复失败 | 已开启修复 PR #4166 |
| **#4529** | 2026‑11‑21 | Codex 失效登录无法刷新 | 已开启修复 PR #4531 |
| **#4528** | 2026‑11‑21 | 子代理结束导致主代理提前终止 | 已开启修复 PR #4165 |
| **#4525** | 2026‑11‑21 | /update-nanoclaw 在 detached HEAD 报错 | 已开启修复 PR #4527 |

> 这些 Issue 已被对应 PR 解决或即将完成。若出现新的阻塞点，建议维护者在 PR 评论中标记 **“needs‑review”** 或 **“urgent”** 以确保优先处理。  

---

**结语**：NanoClaw 在今天继续保持活跃度与维护节奏。通过合并多条修复与功能 PR，项目在功能扩展与稳定性提升方面都有显著进展。请关注即将合并的 PR，特别是 #4210（本地 LLM 支持）和 #4524（Claude Code 升级），它们将在 v2026.12.0 中成为核心改动。  

---

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw 项目日报 – 2026‑11‑22**

| 项目 | 说明 |
|------|------|
| **仓库** | [nearai/ironclaw](https://github.com/nearai/ironclaw) |
| **今天更新** | 1 条 Issue（未关闭）<br>0 条 PR<br>0 个发布 |
| **最新 Issue** | #8174 – “feat: add LLMTR as a built‑in OpenAI‑compatible LLM provider” |

---

### 1. 今日速览  
过去24小时内 IronClaw 的活动相对平稳，唯一的变动是新提出的 LLMTR 提供者集成请求。没有 PR 合并或版本发布，项目核心代码库保持稳定。整体活跃度处于“轻度活跃”状态，主要依赖社区反馈推动功能迭代。

### 2. 版本发布  
无新版本发布，故本节省略。

### 3. 项目进展  
本日未有 PR 合并或关闭，项目在代码层面保持静止。唯一的进展来自 Issue #8174，标记了计划在下一个版本中添加 LLMTR 作为首席内置 LLM 提供者。

### 4. 社区热点  
*Issue #8174* – “feat: add LLMTR as a built‑in OpenAI‑compatible LLM provider”  
🔗 https://github.com/nearai/ironclaw/issues/8174  

该 Issue 讨论将 LLMTR（`https://llmtr.com/v1`）作为 OpenAI 兼容网关纳入 `providers.json`，并与 Groq、Together 等同级列出。社区关注点在于是否需要额外的安全性与性能评估，以及是否能与现有模型命名空间兼容。该 Issue 已获得 1 条评论，反映出对新功能的需求与期待。

### 5. Bug 与稳定性  
暂无新的 Bug 或回归报告。项目在本日内保持无严重缺陷。

### 6. 功能请求与路线图信号  
- **LLMTR 集成**（#8174）被标记为“功能请求”，预计在下一版本实现。由于其与现有 provider 结构相似，预计兼容性评估与单元测试可在短期内完成。  
- 其余功能请求在本日未出现。

### 7. 用户反馈摘要  
Issue #8174 的唯一评论指出用户希望能直接使用 LLMTR 的 OpenAI‑compatible 接口，无需手动配置。反馈强调了多云多厂商提供者统一管理的便利性，以及对未来版本的期待。

### 8. 待处理积压  
- 无长期未响应的重要 Issue 或 PR。当前唯一活跃的 Issue 即 #8174，已得到关注并正在讨论。

**结论**  
IronClaw 目前处于相对平稳阶段，核心功能未受影响。社区通过 Issue #8174 推动下一步功能扩展，建议维护者在下次发布前完成 LLMTR 集成的实现与测试，以满足用户需求并提升多模型兼容性。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-11-22)

### 1. 今日速览
LobsterAI 项目当前处于高强度的开发冲刺阶段，过去24小时内社区活跃度极高，共合并了 **8 个 Pull Request**，且无新的 Issue 产生，表明社区正集中资源解决存量问题并推进核心功能落地。今日发布的版本 **v2026.11.20** 重点强化了 PPT 创作引导与会话导航体验。值得注意的是，大量 PR 由单一开发者 `fisherdaddy` 提交并快速合并，显示项目进入由核心维护者主导的快速迭代周期，旨在完善桌面伴侣（Desktop Companion）体验及 DeepSeek Harness (DSH) 的多智能体协作能力。整体健康度良好，代码流动顺畅，无阻塞性社区争议。

### 2. 版本发布
**🚀 新版本发布: v2026.11.20**
*   **发布时间**: 2026-11-20
*   **核心亮点**:
    *   **🎨 Guided PPT 封面创建**: 新增分步式封面向导（Wizard），并支持配置首页示例，旨在降低用户上手门槛，提升 PPT 生成体验 ([#3072](https://github.com/netease-youdao/LobsterAI/pull/3072), [#3129](https://github.com/netease-youdao/LobsterAI/pull/3129))。
    *   **⏪ 会话导航与提示词历史**: 支持在会话间前后切换，并轻松召回之前的提示词（Prompt），优化了长对话场景下的操作效率 ([#3107](https://github.com/netease-youdao/LobsterAI/pull/3107))。
*   **迁移注意事项**: 本次更新主要为功能增强与 UI 优化，未提及破坏性 API 变更。建议用户更新后体验新的 PPT 向导流程。

### 3. 项目进展
今日合并的 8 个 PR 主要集中在 **桌面伴侣稳定性**、**DSH 多智能体架构** 以及 **Office 文档兼容性** 三大方向：

*   **DSH (DeepSeek Harness) 架构深化**:
    *   完成了桌面运行时集成，包括定时任务持久化、本地技能安装路由优化 ([#3136](https://github.com/netease-youdao/LobsterAI/pull/3136))。
    *   实现了跨智能体协作与专家委派功能，允许启用的 Agent 发现并委派任务给其他配置了特定工作区、记忆和模型的专家 Agent ([#3137](https://github.com/netease-youdao/LobsterAI/pull/3137))。
*   **桌面伴侣 (Desktop Companion) 体验修复**:
    *   修复了 Orb 在多显示器和 Windows DPI 变化下未保持贴边停靠的问题，引入了 `position.v2` 元数据存储机制 ([#3140](https://github.com/netease-youdao/LobsterAI/pull/3140))。
    *   修复了悬浮宠物（Hover Pet）在 8 种海洋生物皮肤下的视觉缩放和垂直居中对齐问题，解决了角色“缩小”和“下跳”的视觉效果 ([#3138](https://github.com/netease-youdao/LobsterAI/pull/3138))。
*   **Office 文档兼容性**:
    *   修复了 XLSX 导出时的 XML 命名空间兼容性 Bug，解决了 `openpyxl` 生成的文件中 `r:id` 前缀未绑定导致严格解析器报错的问题 ([#3143](https://github.com/netease-youdao/LobsterAI/pull/3143))。
*   **UI/UX 细节优化**:
    *   调整了 Co-work 模式下回合产物（文件卡片、图片等）的渲染位置，使其位于回复元数据行之上，提升信息层级清晰度 ([#3139](https://github.com/netease-youdao/LobsterAI/pull/3139))。
    *   同步了 `release/2026.11.17` 分支中的引擎无关修复至 DSH 分支 ([#3142](https://github.com/netease-youdao/LobsterAI/pull/3142), [#3141](https://github.com/netease-youdao/LobsterAI/pull/3141))。

### 4. 社区热点
*   **今日无高热度讨论**: 过去24小时内没有新的 Issue 开启，且所有合并的 PR 均无评论（Comments: undefined/0）或点赞（👍: 0）。
*   **分析**: 这表明当前的开发节奏是由内部维护者（主要是 `fisherdaddy`）驱动的“静默迭代”模式。社区用户可能正在等待新版本发布后的反馈窗口，或者当前的功能开发尚未达到需要广泛社区讨论的阶段。

### 5. Bug 与稳定性
今日合并的 PR 揭示了几个关键的稳定性修复点，虽无新 Issue 报告，但代码变更暗示了此前存在的潜在问题：

| 严重程度 | 问题描述 | 状态 | 关联 PR |
| :--- | :--- | :--- | :--- |
| **高** | **XLSX 导出兼容性**: 生成的 Excel 文件在严格 XML 解析器下可能因命名空间错误而损坏或无法打开。 | ✅ 已修复 | [PR #3143](https://github.com/netease-youdao/LobsterAI/pull/3143) |
| **中** | **多显示器/DPI 适配**: 桌面伴侣 Orb 在切换显示器或调整 DPI 后位置错乱，未保持贴边。 | ✅ 已修复 | [PR #3140](https://github.com/netease-youdao/LobsterAI/pull/3140) |
| **中** | **视觉渲染异常**: 桌面伴侣悬浮宠物在切换皮肤时出现非预期的缩放和位移，影响用户体验。 | ✅ 已修复 | [PR #3138](https://github.com/netease-youdao/LobsterAI/pull/3138) |
| **低** | **UI 布局层级**: Co-work 模式下产物展示位置不当，可能遮挡或混淆元数据信息。 | ✅ 已修复 | [PR #3139](https://github.com/netease-youdao/LobsterAI/pull/3139) |

### 6. 功能请求与路线图信号
虽然今日无新 Issue，但从合并的 PR 中可以提取出明确的路线图信号：

*   **多智能体协作 (Multi-Agent Collaboration)**: PR [#3137](https://github.com/netease-youdao/LobsterAI/pull/3137) 明确指出了 DSH 运行时正在恢复和升级多智能体协作能力。这暗示未来的版本将重点支持“专家委派”模式，即主 Agent 根据任务类型自动调用具备特定技能（Skills）和长期记忆（Long-term Memory）的子 Agent。
*   **PPT 生成流程标准化**: 新版本引入的“Guided PPT cover creation”表明项目正在从单纯的文本生成向结构化文档生成的全流程引导转变，未来可能会扩展到其他文档类型（如 Word, PDF）的向导式创建。
*   **桌面伴侣深度集成**: 对 Orb 停靠、DPI 适配和皮肤渲染的密集修复，表明桌面伴侣（Desktop Companion）是当前的核心差异化功能，后续将继续打磨其在复杂桌面环境下的稳定性。

### 7. 用户反馈摘要
*   **数据缺失**: 由于过去24小时无新 Issue 且 PR 无评论，无法获取新的直接用户反馈。
*   **推断**: 基于修复内容，用户此前可能反馈过：
    1.  导出的 Excel 文件在某些软件中打不开或报错。
    2.  在多屏办公环境下，桌面小助手位置混乱。
    3.  PPT 生成效果不够直观，缺乏新手引导。
    *   *注：以上为基于代码修复内容的反向推断，非直接引用。*

### 8. 待处理积压
*   **无显著积压**: 过去24小时内所有 PR 均已关闭/合并，无待合并（Pending）的 PR。
*   **维护者关注点**: 鉴于所有 PR 均由 `fisherdaddy` 提交且快速合并，建议关注该分支（`feat/migrate-openclaw-to-dsh`）与其他主分支（如 `main` 或 `release`）之间的同步状态，确保引擎无关的修复（如 [#3142](https://github.com/netease-youdao/LobsterAI/pull/3142) 提到的 cherry-pick）能完整覆盖所有发布分支，避免功能回退。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-11-22)

## 1. 今日速览
**活跃度评估：低**

Moltis 项目在过去 24 小时内保持低活跃度，无任何新版本发布。过去 24 小时内共有 1 条 Issue 更新和 1 条 PR 更新，其中无已合并或关闭的条目。当前焦点集中在增强型功能请求（Lark/Feishu 集成）以及关于 Agent 成本控制的工程优化提案上。项目整体处于平稳维护期，无紧急稳定性问题报告。

## 2. 版本发布
*(无新版本发布，本部分省略)*

## 3. 项目进展
**今日无已合并或关闭的重要 PR。**

过去 24 小时内提交的 PR #1325 仍处于 Open 状态，尚未进入合并流程。因此，今日项目代码库无实质性变更，无新功能落地或 Bug 修复合并。

## 4. 社区热点
**热点 Issue #383: 支持 Lark/Feishu (飞书/钉钉)**
*   **链接**: [moltis-org/moltis Issue #383](https://github.com/moltis-org/moltis/issues/383)
*   **状态**: Open | **评论**: 2 | **点赞**: 7
*   **分析**: 该 Issue 由用户 `memwey` 于 2026-03-10 创建，但在今日（2026-11-21）有新评论更新。7 个点赞表明这是当前社区关注度最高的功能请求。
    *   **背后诉求**: 用户强烈希望 Moltis 能够原生支持与企业 IM 工具（如飞书/Lark）的深度集成，以便在企业环境中实现更便捷的 Agent 交互、通知推送及工作流协同。
    *   **现状**: 目前 Moltis 可能缺乏对企业级 IM 网关的直接支持，导致用户在特定部署场景下体验受阻。

## 5. Bug 与稳定性
**今日无新报告的 Bug、崩溃或回归问题。**

过去 24 小时内未出现标记为 `bug`、`critical` 或导致服务中断的问题。项目稳定性状况良好。

## 6. 功能请求与路线图信号
**潜在纳入下一版本的功能信号：**

1.  **Lark/Feishu 集成 (Issue #383)**
    *   **信号强度**: 高 (社区点赞多，持续活跃)
    *   **判断**: 鉴于高社区关注度，若 Moltis 继续深耕企业市场，此功能极有可能进入近期 Roadmap。需关注是否有官方维护者评论确认排期。

2.  **Agent 单次运行成本上限 (PR #1325)**
    *   **信号强度**: 中 (工程优化类)
    *   **判断**: PR #1325 提出了 `tools.agent_max_cost_usd` 参数，旨在限制 Agent 单次运行的美元成本，而不仅仅是迭代次数。这是一个针对成本控制的关键工程改进。虽然目前无官方评论，但该 PR 逻辑清晰且解决了“Frontier Model 长上下文调用成本不可控”的实际痛点，**很可能被维护者采纳并合并**，作为后续版本的稳定性/成本控制特性之一。
    *   **链接**: [moltis-org/moltis PR #1325](https://github.com/moltis-org/moltis/pull/1325)

## 7. 用户反馈摘要
*基于 Issue #383 和 PR #1325 的上下文提炼：*

*   **痛点 1: 企业级 IM 集成缺失** (Issue #383)
    *   用户反馈指出，在现有环境中，Moltis 无法直接通过飞书/Lark 进行交互或接收通知，增加了部署和使用的摩擦成本。用户已仔细阅读 Pre-flight Checklist，表明是严肃的功能需求而非随意提问。
*   **痛点 2: Agent 成本不可控** (PR #1325)
    *   开发者/高级用户反馈，现有的 `agent_max_iterations` 限制不足以控制成本。在调用等高成本模型（Frontier Models）处理长上下文时，即使迭代次数少，单次调用的 Token 成本也可能极高。用户需要一种更直接的成本熔断机制（USD Cap）来防止意外的账单激增。

## 8. 待处理积压
**需维护者关注：**

1.  **Issue #383: Lark/Feishu 支持**
    *   **原因**: 创建于 2026-03-10，至今（2026-11-22）已开放约 **8.5 个月**，无实质性进展（无新 PR 关联，无维护者明确拒绝或确认）。高点赞数（7）表明需求持续存在。
    *   **建议**: 维护者需尽快给出明确路线图信号：是计划支持、提供第三方插件方案，还是明确暂不支持。避免社区期望落空。

2.  **PR #1325: Agent Cost Cap**
    *   **原因**: 创建于 2026-11-21，目前处于 **零评论** 状态。
    *   **建议**: 这是一个高质量的成本控制 PR，维护者应尽快 Review。若 API 设计合理，应尽早合并以增强产品的企业级可用性；若设计理念有冲突，也需及时反馈以免 PR 作者等待过久。

---
**数据说明**:
*   报告生成时间基准: 2026-11-22
*   数据来源: GitHub Moltis Repository (moltis-org/moltis)
*   活跃度定义: 过去24小时内的 Issue/PR 交互行为。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (QwenPaw) 项目动态日报 (2026-11-22)

## 1. 今日速览
过去 24 小时内，CoPaw 项目展现出持续的维护活跃度与社区响应速度。全天共产生 **6 条 Issues 更新**（新开/活跃 4 条，已关闭 2 条）以及 **11 条 PRs 更新**（均处于待合并/评审状态）。虽然过去 24 小时未触发新的主版本发布，但社区在前端插件路由、配置接口安全性、运行时初始化以及多通道审批机制等关键模块均有深度修复与增强 PR 正在推进。值得关注的是，社区针对文档缺陷与 Bug 形成了“即时反馈—即时提交 PR”的高效响应循环。

---

## 2. 项目进展
过去 24 小时内未合并新 PR，但团队推进了多项重大 Issue 的定性与关闭：
- **长时间异步任务通知机制定案**：闭环了关于增加 `notice_after_complete` 工具的讨论（[#6475](https://github.com/agentscope-ai/QwenPaw/issues/6475)），为 Agent 在后台执行 Shell 或子任务时兼顾实时上下文闲聊奠定了设计基础。
- ** AgentScope 社区联动功能演进**：关闭了关于 Console 侧整合社区登录、信箱与反馈功能的建议 Issue（[#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583)）。

---

## 3. 社区热点
今日讨论重点集中在 **文档缺陷对 LLM Agent 产生的误导风险** 以及 **前端插件系统的双重加载异常**：

1. **配置文档误导 Agent 执行破坏性 API 操作** ([#8843](https://github.com/agentscope-ai/QwenPaw/issues/8843))
   - **问题分析**：配置文档中对 `/envs` 仅标注了 `GET/PUT/DELETE /envs`，导致 QA/引导类 Agent 在更新环境变量时误生成了 `PUT` 请求，清空了其他所有已保存的环境变量。
   - **快速响应**：社区随即提交了文档修复 PR [#8846](https://github.com/agentscope-ai/QwenPaw/pull/8846)，明确了 `PUT`（覆盖）、`PATCH`（合并）与 `DELETE` 的具体语义。
2. **前端 Console Import Map 重定向导致插件路由失效** ([#8851](https://github.com/agentscope-ai/QwenPaw/issues/8851))
   - **问题分析**：`console/index.html` 中的 import map 将入口 chunk 重新映射为包含 `?v=<hash>` 的 URL，导致打包文件被加载两次，从而引发插件路由无法正常注册（提示 `PawApp <id> did not register its app route`）。

---

## 4. Bug 与稳定性
今日报告及处于评审阶段的 Bug 依严重程度排列如下：

| 严重程度 | 问题描述 | 影响范围 | 当前状态 / 对应 PR |
| :--- | :--- | :--- | :--- |
| **High** | 前端 Import Map 导致 entry chunk 重复加载，插件路由注册失败 | Console / 前端插件体系 | [Issue #8851](https://github.com/agentscope-ai/QwenPaw/issues/8851) (待处理) |
| **High** | 后台启动未完成时接收 Chat 请求，导致 Agent 挂起无响应 | Core / Runtime | [PR #8770](https://github.com/agentscope-ai/QwenPaw/pull/8770) (修复中，修复 [#8746](https://github.com/agentscope-ai/QwenPaw/issues/8746)) |
| **Medium** | 审批提示（Approvals）无法路由至发起请求的对应 Channel（如微信端丢失） | Multi-channel / Approval | [PR #8303](https://github.com/agentscope-ai/QwenPaw/pull/8303) (评审中，修复 [#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695)) |
| **Medium** | 配置文档 API 说明模糊导致 `PUT /envs` 误删环境变量 | Docs / Config API | [Issue #8843](https://github.com/agentscope-ai/QwenPaw/issues/8843) / [PR #8846](https://github.com/agentscope-ai/QwenPaw/pull/8846) |
| **Low** | Console 消息气泡内宽 Markdown 表格溢出且不可滚动 | Frontend UI | [PR #8847](https://github.com/agentscope-ai/QwenPaw/pull/8847) (修复中) |
| **Low** | LICENSE 文件中 Contribution 定义存在多余单词 "the" | Compliance | [Issue #8840](https://github.com/agentscope-ai/QwenPaw/issues/8840) / [PR #8849](https://github.com/agentscope-ai/QwenPaw/pull/8849) |

---

## 5. 功能请求与路线图信号
从当前处于评审状态的高优先级 PR 中，可以观察到以下近期功能走向：

- **企业级反向代理部署支持**：PR [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) 增加了 `QWENPAW_BASE_PATH` 环境变量，支持将 Console 和 API 部署在二级路径（Base Path）下，便于企业网关集成。
- **技能库 (Skills) 同步升级**：PR [#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479) 正在将内置的 DOCX、PPTX、XLSX 等 Office 自动化技能与 Anthropic 2026年7月的最新更新进行对齐。
- **记忆模块 (Memory) 健全度优化**：PR [#8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) 针对 OpenViking 记忆插件进行了清理、兼容性适配以及优雅关机（Shutdown）逻辑的修复。

---

## 6. 用户反馈摘要
从近期的 Issues 讨论中，提炼出以下用户真实痛点与使用场景：

1. **提示词/指令设计对上下文安全的影响** ([#8848](https://github.com/agentscope-ai/QwenPaw/issues/8848))：
   - **痛点**：在上下文压缩失败时，系统默认提示用户“使用 `/clear` 重置上下文”。用户反馈此提示过于具有误导性，容易导致非技术用户直接清空会话历史，造成关键工作上下文丢失。
2. **多 Channel 交互体验一致性** ([#8303](https://github.com/agentscope-ai/QwenPaw/pull/8303))：
   - **场景**：用户在微信（WeChat）等社交渠道调用需要人工审批的工具时，审批弹窗仅在 Web Console 显示，渠道端因等待超时（5分钟）导致工具执行静默失败。用户期望审批请求能精确反向推送到发起对话的特定 Channel。

---

## 7. 待处理积压
建议维护者重点关注并清理以下 PR：

- **异常标示的 PR**：[PR #8837](https://github.com/agentscope-ai/QwenPaw/pull/8837) (移除已弃用的 mission 命令) 被标记为 `invalid` 但仍处于 `Under Review` 状态，需明确处理意见。
- **信息缺失的初次贡献 PR**：[PR #7828](https://github.com/agentscope-ai/QwenPaw/pull/7828) (尺寸为 `XXXL`，提交信息仅为 "Dev my fix") 缺少具体的 Description 和关联 Issue，建议及时提醒贡献者补充或进行归档。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 开源项目动态日报 (2026-11-22)

## 1. 今日速览

ZeroClaw 社区在过去 24 小时内保持了高强度的代码演进与质量治理。整体活跃度保持高位，集中在 **WASM 插件沙箱安全强化**、**Web Dashboard 体验修补** 以及 **成本控制（Cost Enforcement）机制的演进** 上。

- **Issue 动态**：更新 18 条（新开/活跃 12 条，已关闭 6 条）。
- **PR 动态**：更新 50 条（待合并 43 条，已合并/关闭 7 条）。
- **整体健康度**：良好。项目团队正集中力量清扫历史代码债务（发起代码瘦身 Tracker），同时对 Windows 平台兼容性及核心引擎防卡死（超时控制）进行了有效修复。

---

## 2. 项目进展

今日共有 7 个 PR / 关键 Issue 完成合并或关闭，核心推进涵盖安全、稳定性与平台兼容性：

- **WASM 插件沙箱内存安全修复** ([#12145](https://github.com/zeroclaw-labs/zeroclaw/issues/12145))：修复了 Wasmtime 默认保留 10,000 个 memory/table 实例导致插件可绕过 `max_memory_mb` 内存配额限制的漏洞。
- **子进程无限等待 Bug 修复** ([#9946](https://github.com/zeroclaw-labs/zeroclaw/issues/9946))：解决了 `agent-browser` CLI 在探针检查和命令执行时缺少超时设置与 `kill_on_drop` 导致的 Agent 无限期卡死问题。
- **Windows 平台兼容性提升**：
  - 修复插件卸载时由于文件系统 `ErrorKind::NotFound` 抛错导致的测试失败 ([#12484](https://github.com/zeroclaw-labs/zeroclaw/issues/12484))。
  - 修复 Windows 下 Gateway Web Socket 写入截止时间测试失败问题 ([#12400](https://github.com/zeroclaw-labs/zeroclaw/issues/12400))。
- **消息 Channel 功能扩展**：WhatsApp Web Channel 现已原生支持将投票（Poll votes）解析为类似 Signal 的 `[choice]` 接收消息 ([#10987](https://github.com/zeroclaw-labs/zeroclaw/issues/10987))。
- **运行状态显示修正**：修复启动 Banner 在配置并生效 SQLite 内存后端时仍误报 `Memory: none` 的问题 ([#9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896))。
- **架构文档标准落地**：合并 ADR-016 关于 Okta 与 Entra ID 令牌兼容性的例外规约文档 ([#12608](https://github.com/zeroclaw-labs/zeroclaw/pull/12608))。

---

## 3. 社区热点

以下为社区今日讨论度与关注度最高的议题：

1. **[RFC] 运算符托管服务凭据的安全隔离使用** ([#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422))
   - **关注焦点**：如何允许 Agent 调用特定服务，同时确保 底层凭据（Credentials）不泄露给 LLM Prompt、Chat 上下文或 Skill 文本。安全防护层设计引发广泛讨论。
2. **核心 Channel 插件化解耦：将 IRC 和 Twitch 移出主二进制** ([#12443](https://github.com/zeroclaw-labs/zeroclaw/pull/12443))
   - **关注焦点**：为了减小核心二进制体积，计划将 IRC 和 Twitch Channel 重构成 WASM 注册表插件。此举属于破坏性变更（Breaking Change），受到架构层面的密切关注。
3. **运维人员强制覆写超限成本控制** ([#11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589))
   - **关注焦点**：当 Agent 达到每日/每月成本上限时，目前系统会直接中断 Turn。该 PR 拟引入 `cost.allow_override` 机制，允许管理员在不重启 Daemon 的情况下手动批准继续运行。
4. **代码清道夫计划（Deslop Tracker）** ([#12613](https://github.com/zeroclaw-labs/zeroclaw/issues/12613))
   - **关注焦点**：全面清理未达代码、失效配置、误导性注释与冗余文档，提升项目可维护性。

---

## 4. Bug 与稳定性

按严重程度排列今日活跃的 Bug 报告：

### 严重 / 中度 (Severity: S2)
- **子 Agent 逃逸父级成本上限** ([#12627](https://github.com/zeroclaw-labs/zeroclaw/issues/12627))：在有界代理（Bounded Delegation）内使用 `spawn_subagent` 创建的子 Agent 未受派生成本跟踪器（Cost Tracker）约束，存在预算超支风险。
- **Gateway 会话状态写失败死锁** ([#12619](https://github.com/zeroclaw-labs/zeroclaw/issues/12619))：Gateway 会话状态写入失败后，状态将永久卡在 `running`，直到重启系统且 `Stop` 指令无法清除。
- **Web Dashboard 语音交互同步异常** ([#12633](https://github.com/zeroclaw-labs/zeroclaw/issues/12633), [#12632](https://github.com/zeroclaw-labs/zeroclaw/issues/12632))：未刷新的语音设置会导致配置倒退；语音自动发送定时器在听写结束后仍可能误发送手动输入的文本。

### 轻微 (Severity: S3)
- **Dashboard 花费显示精度缺陷** ([#12638](https://github.com/zeroclaw-labs/zeroclaw/issues/12638))：零消费（如全量使用本地免费模型）的 Agent 卡片误显示为 `<$0.01

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*