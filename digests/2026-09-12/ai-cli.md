# AI CLI 工具社区动态日报 2026-09-12

> 生成时间: 2026-09-11 22:06 UTC | 覆盖工具: 9 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026‑09‑12）

> 本报告基于 **anthropics/skills** 仓库公开的 Pull Requests 与 Issues 数据，梳理了社区当前最受关注的 Skill 开发动态、需求趋势以及高潜力的待合并实现。

---

## 1️⃣ 热门 Skills 排行（按评论/关注度 5 ~ 8 条挑选）

| 排名 | PR 编号 & 标题 | 功能概述 | 讨论热点 | 当前状态 |
|------|----------------|----------|----------|----------|
| 1 | **#1298** – *fix(skill‑creator): run_eval.py always reports 0% recall*  <br>【链接】(https://github.com/anthropics/skills/pull/1298) | 为 `skill‑creator` 提供的评估脚本 `run_eval.py` 修复了 Windows 流读取、触发检测、并行工作进程等问题，使评估的 recall 不再恒为 0%。 | **⚠️ 质量评估失效**：社区多次复现 0 % recall，导致技能描述优化循环在噪声上迭代。<br>**🛠️ 跨平台兼容**：Windows 用户报错堆积。 | **Open** |
| 2 | **#514** – *Add document‑typography skill*  <br>【链接】(https://github.com/anthropics/skills/pull/514) | 为生成的文档提供排版质量检查：孤行、寡行、编号对齐等常见版式错误自动检测并修正。 | **📄 文档可读性**：用户频繁抱怨 AI 生成文档的排版瑕疵，尤其在报告、合约等正式场景。<br>**🧩 与现有 doc‑skills 兼容**：讨论如何在 `document‑skills` 中统一触发。 | **Open** |
| 3 | **#486** – *Add ODT skill*  <br>【链接】(https://github.com/anthropics/skills/pull/486) | 支持 OpenDocument（`.odt/.ods`）文件的创建、模板填充、读取以及转换为 HTML。 | **🔄 开源文档生态**：LibreOffice、OnlyOffice 用户需求激增，期待官方直接支持。<br>**⚙️ 文件安全**：讨论 ODT 中宏/嵌入式对象的安全审计。 | **Open** |
| 4 | **#1628** – *Add Hivemind: Zero‑Cost Multi‑Agent Orchestration*  <br>【链接】(https://github.com/anthropics/skills/pull/1628) | 引入 “Hivemind” Skill，使 Claude Code 能将机械化子任务下发到免费模型的 **opencode** 工作节点，保持唯一的高价模型作为规划/审查者。 | **💰 成本控制**：社区关注如何在复杂工作流中削减高价模型的 token 消耗。<br>**🤝 多模型协同**：讨论安全边界与结果合并策略。 | **Open** |
| 5 | **#1627** – *feat: add buffer‑api Agent Skill*  <br>【链接】(https://github.com/anthropics/skills/pull/1627) | 为任意 AI Agent 提供 Buffer GraphQL API 接口，实现社交内容的创建、调度与分析。 | **📅 内容运营**：市场营销、社群运营团队期待直接在 Claude 中完成内容排程。<br>**🔐 鉴权**：讨论 OAuth / API‑Key 的安全传递方式。 | **Open** |
| 6 | **#1367** – *add self‑audit — mechanical verification + four‑dimension reasoning quality gate*  <br>【链接】(https://github.com/anthropics/skills/pull/1367) | 在每次输出前执行机械文件校验 + 四维推理质量审查（结构、事实、安全、可解释性），形成 “质量门” 机制。 | **🔍 输出可靠性**：与 Issue #1385（质量门 pipeline）形成呼应。<br>**⚙️ 可配置性**：如何在不同项目/模型间调节门阈值成为焦点。 | **Open** |
| 7 | **#1734** – *Detect orphaned docx comments*  <br>【链接】(https://github.com/anthropics/skills/pull/1734) | 自动检测并清理 DOCX 文档中孤立的批注节点，防止文档在后续编辑时出现破损。 | **🗂️ 文档完整性**：企业用户在合同审阅流程中频繁遭遇批注残留导致解析错误。 | **Open** |
| 8 | **#1615** – *Add scnet‑hpc skill*  <br>【链接】(https://github.com/anthropics/skills/pull/1615) | 为 SCNet HPC 集群提供基于 SSH/Slurm 的作业提交、资源查询、模块加载等自动化能力。 | **⚙️ 高性能计算**：科研团队期待通过 Claude 编排批处理作业，减少手动 CLI 操作。 | **Open** |

> **注**：以上 PR 均为 *Open*（截至 2026‑09‑12），但因评论、Issue 关联度高，被视为社区热点。

---

## 2️⃣ 社区需求趋势（从 Issues 提炼）

| 需求方向 | 关键 Issue 示例 | 社区期待的具体功能 |
|----------|----------------|-------------------|
| **安全与信任** | #492 “Community skills distributed under `anthropic/` namespace enable trust boundary abuse” (43 条评论) | - 官方统一命名空间与验证机制<br>- 防止恶意冒充官方 Skill<br>- 权限与审计日志可视化 |
| **组织内部协作** | #228 “Enable org‑wide skill sharing in Claude.ai” (16 条评论) | - 组织级 Skill 库 / 分享链接<br>- 统一权限管理、版本控制 |
| **工具链可靠性** | #556 “run_eval.py: claude -p never triggers skills/commands” (12 条评论) & #1298 PR | - 稳定的评估/回归测试框架<br>- 跨平台（Windows/macOS/Linux）兼容 |
| **文档质量与可用性** | #189 “document‑skills and example‑skills plugins install identical content” (6 条评论) & PR #514、#486、#1734 | - 去重、统一的文档 Skill 包<br>- 排版、注释、批注自动清理 |
| **上下文 / Token 管理** | #1487 “claude‑api skill eagerly injects ~156k tokens” (4 条评论) | - 渐进式 token 注入、上下文窗口保护<br>- 可配置的 “lazy‑load” 机制 |
| **质量把关流水线** | #1385 “Reasoning Quality Gate Pipeline” (4 条评论) & PR #1367 | - 多层次审查（前置校准 → 对抗审查 → 交付验证）<br>- 可自定义的质量门阈值 |
| **工作流与多模型编排** | #1628 PR (Hivemind) 与 #1627 PR (Buffer) | - 免费模型/微服务作为子执行器<br>- 跨模型任务调度、结果合并 |
| **新型存储/记忆模式** | #1329 “compact‑memory (symbolic notation for compact agent state)” (9 条评论) | - 紧凑的符号化记忆表示<br>- 长期上下文压缩与检索 |

**总体趋势**：**安全可信 + 高效协作 + 质量保障** 是社区最迫切的三大诉求。

---

## 3️⃣ 高潜力待合并 Skills（评论活跃、影响面大）

| PR 编号 | 主题 | 关键价值 | 预计落地时间（社区预估） |
|--------|------|----------|--------------------------|
| **#1298** | `run_eval.py` recall 修复 | 直接恢复 Skill 描述优化的可信评估，影响所有 Skill 开发者 | 1 ~ 2 周 |
| **#514** | `document‑typography` | 消除文档排版错误，提升企业报告、合同等正式文档质量 | 2 ~ 3 周 |
| **#486** | `odt` 支持 | 拓展到开源办公套件，满足 LibreOffice 等用户需求 | 3 ~ 4 周 |
| **#1628** | `Hivemind` 多代理编排 | 大幅降低高价模型 token 消耗，开启成本敏感型工作流 | 4 ~ 6 周 |
| **#1627** | `buffer‑api` Agent Skill | 为营销/内容团队提供“一站式”社交媒体调度工具 | 2 ~ 3 周 |
| **#1367** | `self‑audit` 质量门 | 为所有 Skill 引入统一的输出审查机制，提升交付可靠性 | 3 ~ 5 周 |
| **#1734** | `orphaned docx comments` 检测 | 防止文档损坏，提升企业内部审阅流程的鲁棒性 | 1 ~ 2 周 |
| **#1615** | `scnet‑hpc` | 为科研/工程团队提供“一键” HPC 作业管理 | 4 ~ 6 周 |

> 这些 PR 已经在 Issues 中产生大量讨论（多数 ≥ 4 条评论），且对应的功能对核心用户（企业、科研、内容运营）有明确价值，预计将在下个发布周期内合并。

---

## 4️⃣ Skills 生态洞察

> **一句话总结：** 社区当前最集中的诉求是“**提升 Skills 的安全可信、跨平台可靠性，并通过自动化质量门与成本‑效益编排，让 Claude Code 在企业级工作流中真正可生产**”。  

--- 

*报告编制：Claude Code Skills 社区技术分析师（基于公开 PR/Issue 数据）*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



# OpenAI Codex 社区动态日报
**日期：2026-09-12**

---

## 一、今日速览

过去24小时内，Codex Rust CLI 0.155.0-alpha 系列快速迭代（共发布7个版本），0.155.0 正式版加速推进。社区高度关注 **MCP 进程内存泄漏**（#30408）及 **Windows/Mac 桌面端稳定性** 问题。同时，语音对话、TUI 工作树默认启用、企业 MCP 安全认证等功能通过多个 PR 进入稳定阶段。

---

## 二、版本发布

**Rust CLI 0.155.0-alpha 系列密集发布：**

| 版本 | 说明 |
|------|------|
| rust-v0.155.0-alpha.3.10 | 最新 alpha 版本 |
| rust-v0.155.0-alpha.3.9 | |
| rust-v0.155.0-alpha.3.8 | |
| rust-v0.155.0-alpha.3.7 | |
| rust-v0.155.0-alpha.3 | |
| rust-v0.154.0-alpha.6.2 | 0.154 分支延续 |
| rust-v0.155.0-alpha.2.3 | 早期 alpha |

> 0.155.0 正在快速收敛，alpha 迭代节奏显著加快。

---

## 三、社区热点 Issues（Top 10）

| # | 标题 | 状态 | 评论/👍 | 重要性 |
|---|------|------|---------|--------|
| [#30408](https://github.com/openai/codex/issues/30408) | MCP server 进程泄漏：每线程进程永不回收（RSS 超 9GB） | OPEN | 37 / 8 | 🔴 严重资源泄漏，长期运行必崩 |
| [#40968](https://github.com/openai/codex/issues/40968) | Windows 桌面端发送按钮无限转圈，提示永不提交 | OPEN | 35 / 6 | 🔴 Windows 核心交互阻断 |
| [#44720](https://github.com/openai/codex/issues/44720) | ChatGPT hit a snag 错误复现 | CLOSED | 30 / 5 | 🟡 启动崩溃高频复现 |
| [#44561](https://github.com/openai/codex/issues/44561) | 默认关闭 Astra 星星动画效果（whimsy） | OPEN | 11 / **16** | 🟢 最高赞需求，视觉干扰 |
| [#44687](https://github.com/openai/codex/issues/44687) | macOS 26.908 路由预取失败：`r is not a function` | CLOSED | 13 / 0 | 🔴 最新桌面版本渲染崩溃 |
| [#32614](https://github.com/openai/codex/issues/32614) | Agent 创建的顶级任务在桌面搜索和移动端远程不可见 | OPEN | 11 / 3 | 🟡 跨平台同步功能缺失 |
| [#44723](https://github.com/openai/codex/issues/44723) | 自动化（心跳/cron）注入缺少 `call_id` 的 function_call_output，永久破坏会话 | OPEN | 5 / 0 | 🔴 自动化功能核心 Bug |
| [#41779](https://github.com/openai/codex/issues/41779) | Windows 本地 API 启动被策略拦截（blocked by policy） | OPEN | 10 / 0 | 🟡 企业/开发环境兼容问题 |
| [#41434](https://github.com/openai/codex/issues/41434) | macOS OAuth Token 交换失败但 curl 正常 | OPEN | 10 / 0 | 🟡 认证链路问题 |
| [#44785](https://github.com/openai/codex/issues/44785) | Linux (Debian 13) 启动致命错误：`ChatGPT hit a snag` | CLOSED | 10 / 1 | 🔴 Linux 桌面端稳定性 |

---

## 四、重要 PR 进展（Top 10）

| # | 标题 | 状态 | 说明 |
|---|------|------|------|
| [#44921](https://github.com/openai/codex/pull/44921) | 默认启用 TUI 语音对话 | CLOSED | `realtime_conversation` 从实验性转正为稳定功能 |
| [#44922](https://github.com/openai/codex/pull/44922) | Windows 打包原生语音运行时 | CLOSED | 补齐 Windows 语音能力依赖及 TLS 证书链 |
| [#44915](https://github.com/openai/codex/pull/44915) | 移除废弃的 `thread/rollback` API | CLOSED | 清理旧接口，引导用户使用 `thread/revert` |
| [#44870](https://github.com/openai/codex/pull/44870) | 默认启用 worktrees 并优化本地守护进程错误提示 | CLOSED | worktrees 转正稳定，未支持守护进程时给出明确报错 |
| [#44879](https://github.com/openai/codex/pull/44879) | 淡化 Astra 输入框星星动画并稳定光标重绘 | CLOSED | 对应 Issue #44561，动画15秒后淡出，提升体验 |
| [#44832](https://github.com/openai/codex/pull/44832) | 新增可信企业 MCP 认证配置 | CLOSED | 防止项目设置覆盖企业凭证，保障 MCP 安全模型 |
| [#44893](https://github.com/openai/codex/pull/44893) | 在模型发现接口暴露可用接入计划（access programs） | CLOSED | `model/list` 返回 `availableAccessPrograms` 字段 |
| [#44877](https://github.com/openai/codex/pull/44877) | 用户验证注册返回公钥元数据 | CLOSED | 支持可信 UI host 完成后端注册 |
| [#44872](https://github.com/openai/codex/pull/44872) | Windows MXC 沙箱新增托管网络策略支持 | CLOSED | 支持在受限网络策略下运行本地 Codex |
| [#44865](https://github.com/openai/codex/pull/44865) | code mode 回调委托隔离至单次执行 | CLOSED | 修复多 cell 共享 session 时的回调状态错乱 |

---

## 五、功能需求趋势

从 Issues 数据提炼出以下社区关注方向：

1. **MCP 生态稳定性** — 进程泄漏（#30408）、命名空间重复（#44729）、企业认证（#36915/#44832）是高频话题
2. **跨平台一致性** — Windows/Mac/Linux 桌面端启动崩溃、渲染错误集中爆发，iOS 远程项目不同步（#36454）
3. **CLI 自动化可靠性** — 缺少 `call_id` 导致会话永久损坏（#44723）、Token 预算历史笔记（#44883）
4. **TUI 体验优化** — 默认关闭炫目动画（#44561，16👍最高赞）、主题化线程颜色（#44857）
5. **语音对话正式化** — 多 PR 推动 TUI 语音从实验性转稳定

---

## 六、开发者关注点

**核心痛点：**

| 痛点 | 涉及 Issue |
|------|-----------|
| 内存/进程泄漏导致长期运行崩溃 | #30408, #14162 |
| Windows 桌面端交互阻断（发送无响应、启动崩溃） | #40968, #44748, #44785 |
| 自动化功能（heartbeat/cron）存在破坏性 Bug | #44723 |
| macOS 认证链路不稳定 | #41434 |
| 桌面端与 CLI/Mobile 数据不同步 | #32614, #36454 |
| 最新桌面版本（26.908/26.909）回归 Bug 较多 | #44687, #44785, #44748, #44729 |

> **整体判断**：0.155.0 版本功能收敛明显，但桌面端（尤其是 Windows/Linux）稳定性仍是最大短板；MCP 进程管理和跨平台数据同步是技术团队需要优先解决的基础问题。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报 — 2026-09-12

## 1. 今日速览

Gemini CLI 发布 v0.61.0-nightly 版本，社区重点聚焦于 **sandbox 安全加固** 和 **subagent 稳定性** 两大方向。过去 24 小时内，安全团队连续推进多项关键修复（OAuth 持久化、git 参数注入防护、checkpoint 路径逃逸），同时开发者高频反馈 shell 命令卡死、浏览器 subagent 兼容性等体验问题。

---

## 2. 版本发布

| 版本 | 发布日期 | 链接 |
|------|----------|------|
| v0.61.0-nightly.20260911.ged2ac40df | 2026-09-11 | [Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260910.ged2ac40df...v0.61.0-nightly.20260911.ged2ac40df) |

---

## 3. 社区热点 Issues

| # | 标题 | 优先级 | 评论/👍 | 重要性说明 |
|---|------|--------|---------|------------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success | P1 | 13 / 2 | `codebase_investigator` 达到最大轮次后仍返回 success，掩盖了真实中断原因，影响调试和任务追踪准确性。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 | 8 / 8 | 简单任务（如创建文件夹）导致 generalist agent 永久挂起，用户体验严重受损，已有 8 位开发者确认。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 | 9 / 1 | 提案利用 Gemini 3 模型的 bash 原生能力，在不牺牲安全性的前提下提升工具调用效率，是 agent 架构演进的重要方向。 |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | Shell command execution gets stuck "Waiting input" after completion | P1 | 4 / 3 | 简单 CLI 命令执行完成后仍显示"等待用户输入"，已多次复现，直接影响自动化工作流。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | Browser subagent fails in Wayland | P1 | 4 / 1 | Wayland 环境下 browser subagent 失败，Linux 用户群体痛点，影响跨桌面环境兼容性。 |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | Deterministic redaction & reduce Auto Memory logging | P2 | 5 / 0 | Auto Memory 在内容进入模型 context 后才进行脱敏，存在隐私泄露风险，安全团队重点关注。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess AST-aware file reads, search, and mapping | P2 | 7 / 1 | 探索基于 AST 的文件读取和代码库映射，可减少 token 消耗并提升代码理解精度，是性能优化方向。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 | 6 / 0 | 用户反馈 Gemini 不会主动调用自定义 skills 和 sub-agents，需显式指令才触发，agent 自主性待提升。 |
| [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) | Stop Auto Memory from retrying low-signal sessions indefinitely | P2 | 4 / 0 | 低质量会话被反复重试，造成不必要的资源消耗，需引入信号评估机制。 |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Enhance browser_agent resilience: session takeover and lock recovery | P3 | 4 / 0 | 浏览器代理在遇到 locked profile 时采用 fail-fast 策略，缺乏自动恢复机制，影响持久化会话稳定性。 |

---

## 4. 重要 PR 进展

| # | 标题 | 状态 | 面积 | 说明 |
|---|------|------|------|------|
| [#29282](https://github.com/google-gemini/gemini-cli/pull/29282) | fix(auth): persist OAuth credentials after login | OPEN | security | 修复登录后 OAuth 凭证未持久化的问题，避免每次重新触发浏览器登录流程。 |
| [#29283](https://github.com/google-gemini/gemini-cli/pull/29283) | fix(sandbox): improve filesystem isolation and isolate runtime state | CLOSED | security | 增强 sandbox 环境下文件系统挂载边界，隔离运行时状态，支持 Docker/Podman/runsc/LXC/macOS Seatbelt。 |
| [#29250](https://github.com/google-gemini/gemini-cli/pull/29250) | fix(core): prevent indirect prompt injection via build files | CLOSED | security | 修复通过构建配置文件修改和不受信任参数进行间接 prompt 注入的漏洞。 |
| [#29184](https://github.com/google-gemini/gemini-cli/pull/29184) | fix(core): validate git args in Windows sandbox | OPEN | security | 修复 Windows 沙箱中 `git diff --output` 静默截断文件的安全漏洞。 |
| [#29192](https://github.com/google-gemini/gemini-cli/pull/29192) | fix(checkpoint): contain legacy raw tag path | OPEN | security | 修复 `/chat delete <tag>` 中 `../` 路径穿越导致删除 checkpoint 目录外文件的漏洞。 |
| [#29287](https://github.com/google-gemini/gemini-cli/pull/29287) | feat(policy): map --yolo to allowedTools wildcard policy | CLOSED | policy | 将 `--yolo` 标志原生映射为 `allowedTools: ["*"]` 通配符策略，移除硬编码的 YOLO 状态。 |
| [#29208](https://github.com/google-gemini/gemini-cli/pull/29208) | fix(core): fall back to empty on malformed agents.json | CLOSED | core | 修复损坏的 `agents.json`（null/标量/数组格式）导致 `TypeError` 崩溃的问题。 |
| [#29195](https://github.com/google-gemini/gemini-cli/pull/29195) | fix(checkpoint): degrade non-array history instead of crashing | OPEN | core | 修复 checkpoint 文件中 `history` 字段非数组时导致 `/resume` 崩溃的问题。 |
| [#29186](https://github.com/google-gemini/gemini-cli/pull/29186) | fix(core): correct exitCode null check in shell sandbox | OPEN | security | 修复 shell sandbox 拒绝启发式检测中 `exitCode` 为 null 时的类型检查缺陷。 |
| [#29187](https://github.com/google-gemini/gemini-cli/pull/29187) | fix(core): use safeLiteralReplace for LLM prompt templates | OPEN | core | 修复 LLM prompt 模板中 `$` 序列被 JavaScript 替换语法误解析的安全问题。 |

---

## 5. 功能需求趋势

| 方向 | 热度 | 相关 Issue/PR |
|------|------|---------------|
| **安全与沙箱加固** | 🔥🔥🔥 | #29283, #29250, #29184, #29192, #29186 |
| **Subagent 稳定性与自主性** | 🔥🔥🔥 | #22323, #21409, #21968, #22232, #21983 |
| **Auto Memory 质量优化** | 🔥🔥 | #26525, #26522, #26523 |
| **AST 感知文件操作** | 🔥 | #22745, #22746 |
| **Shell/终端体验** | 🔥🔥 | #25166, #22465, #21924 |
| **配置鲁棒性** | 🔥 | #29208, #29195, #20079 |
| **浏览器 Agent 兼容性** | 🔥 | #21983, #22232 |
| **Token 效率优化** | 🔥 | #19561, #22745 |

---

## 6. 开发者关注点

**高频痛点：**
- **Shell 命令卡死**（#25166, #22465）：命令执行完成后 UI 仍显示"等待输入"，导致工作流中断。
- **Subagent 行为异常**（#22323, #21409, #21968）：subagent 误报 success、generalist agent 挂起、自定义 skills 未被自动调用，影响复杂任务编排可靠性。
- **Wayland 兼容性**（#21983）：Linux Wayland 环境下 browser subagent 不可用，桌面环境支持存在缺口。
- **配置文件容错**（#29208, #29195, #20079）：损坏的 `agents.json`、非数组 `history`、symlink agent 路径识别失败等问题暴露配置加载路径的鲁棒性不足。
- **安全边界**（#26525, #29184, #29192）：Auto Memory 脱敏时机、Windows git 参数注入、checkpoint 路径穿越等安全问题持续引发关注。

**需求趋势：**
开发者普遍期望提升 agent 的**自主决策能力**（主动调用 skills/subagent）、**运行时稳定性**（避免挂起和崩溃）、以及**沙箱安全强度**，同时对 token 效率和 AST 感知工具的性能优化表现出明确兴趣。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-09-12  
**分析范围**: github.com/github/copilot-cli

---

## 1. 今日速览
**今日社区最显著动态**是 **v1.0.84-5** 版本的发布，重点增强了语义 JSONL 格式的会话与记忆导入能力，并优化了 Shell 补全体验。同时，社区活跃度极高，共有 32 个 Issue 更新，主要集中在 **MCP (Model Context Protocol) 服务器连接稳定性**、**会话恢复时的资源管理** 以及 **Windows 平台兼容性** 上。开发者们正积极反馈关于会话挂起、OAuth 认证流程以及插件安装的痛点。

---

## 2. 版本发布
### **v1.0.84-5** (最新)
本次更新聚焦于数据交换格式的完善与交互体验的优化。
*   **新增功能**:
    *   引入会话和记忆导入命令，支持 **semantic JSONL interchange format**，方便用户迁移和备份上下文数据。
*   **改进项**:
    *   **Shell 补全优化**: 补全逻辑现在由与 CLI 解析相同的语法生成，确保根级标志和子命令选项展示准确，解决了 `copilot <TAB>` 展示混乱的问题。

---

## 3. 社区热点 Issues
以下是过去24小时内更新且评论数最多的 10 个 Issue，涵盖了从高严重性 Bug 到核心功能请求：

1.  **[OPEN] disable-model-invocation: true 导致 Skill 无法被显式调用**
    *   **重要性**: 高 - 影响技能工作流的核心可用性。
    *   **摘要**: 设置 `disable-model-invocation: true` 后，Skill 虽然在列表中显示，但在通过 `skill()` 工具显式请求时返回 "Skill not found"。这导致该 Skill 无法被手动触发。
    *   **评论**: 5 | 👍: 7
    *   [链接](https://github.com/github/copilot-cli/issues/4438)

2.  **[OPEN] v1.0.83: 会话恢复时中断 stdio MCP 服务器连接**
    *   **重要性**: 高 - 影响长时间工作的会话稳定性。
    *   **摘要**: 恢复会话时会取消正在初始化的 MCP 服务器连接，导致这些服务器在整个会话期间不可用。从 v1.0.82 的 ~16s 超时优化到 v1.0.83 的 ~1s 取消，可能过于激进。
    *   **评论**: 4 | 👍: 1
    *   [链接](https://github.com/github/copilot-cli/issues/4753)

3.  **[OPEN] Windows WSL2 回归：CLI 主线程 CPU 占用 215%，UI 冻结**
    *   **重要性**: 高严重性 - 系统资源占用与功能不可用。
    *   **摘要**: 在 1.0.60 版本出现回归，空闲时 CLI 主线程 CPU 占用极高，且 TUI 输出在重启前完全冻结，严重影响用户体验。
    *   **评论**: 4 | 👍: 2
    *   [链接](https://github.com/github/copilot-cli/issues/3700)

4.  **[OPEN] Copilot CLI 过度请求授权 (“授权疲劳”)**
    *   **重要性**: 用户体验 - 降低效率。
    *   **摘要**: 在单个高层级请求中，Copilot CLI 会弹出超过 12 次授权提示，导致严重的“授权疲劳”。
    *   **评论**: 4 | 👍: 2
    *   [链接](https://github.com/github/copilot-cli/issues/1168)

5.  **[OPEN] 自动批准模式在约 1 小时后失效**
    *   **重要性**: 会话管理。
    *   **摘要**: 使用 `/permissions assisted` 模式工作约 1 小时后，自动批准功能会失效，需要重启会话才能恢复。
    *   **评论**: 4 | 👍: 0
    *   [链接](https://github.com/github/copilot-cli/issues/4764)

6.  **[OPEN] Windows: 插件更新失败 (Access is denied)**
    *   **重要性**: 开发环境 - Windows 平台阻碍。
    *   **摘要**: 当 VS Code 正在运行时，`copilot plugin update` 会失败，错误代码为 5。原因是 Copilot 扩展持有安装插件的句柄。
    *   **评论**: 2 | 👍: 21 (社区反应强烈)
    *   [链接](https://github.com/github/copilot-cli/issues/4095)

7.  **[OPEN] Atlassian MCP OAuth 回调 URL 不匹配**
    *   **重要性**: 外部服务集成。
    *   **摘要**: 连接 Atlassian MCP 服务器时，OAuth 失败，提示回调 URL 不匹配（随机端口 vs 注册端口）。
    *   **评论**: 3 | 👍: 3
    *   [链接](https://github.com/github/copilot-cli/issues/4795)

8.  **[OPEN] Native MCP connector 发送非法的 server/discover 请求**
    *   **重要性**: 协议兼容性 - 导致崩溃。
    *   **摘要**: Copilot CLI 在初始化前发送非标准的 `server/discover` 请求，违反 MCP 规范，导致兼容的 MCP 服务器崩溃。
    *   **评论**: 1 | 👍: 0
    *   [链接](https://github.com/github/copilot-cli/issues/4809)

9.  **[OPEN] 长会话内存溢出 (OOM) 崩溃**
    *   **重要性**: 性能 - 数据安全。
    *   **摘要**: 在长 `--resume` 会话中，CLI 会因 V8 堆内存溢出（4GB 限制）反复崩溃，且崩溃转储文件会写入用户当前目录。
    *   **评论**: 3 | 👍: 5
    *   [链接](https://github.com/github/copilot-cli/issues/4699)

10. **[OPEN] AGENTS.md 发现机制导入无关仓库指令**
    *   **重要性**: 配置管理。
    *   **摘要**: AGENTS.md 发现机制会遍历所有祖先目录，导致非当前仓库的指令被错误加载，污染上下文。
    *   **评论**: 0 | 👍: 0
    *   [链接](https://github.com/github/copilot-cli/issues/4822)

---

## 4. 重要 PR 进展
*注：过去24小时内无新的 Pull Request 更新。*

---

## 5. 功能需求趋势
从 Issue 反馈中，可以提炼出以下社区关注的核心方向：

1.  **MCP 服务器生命周期管理**:
    *   社区高度关注 MCP 服务器在会话恢复、`/clear` 命令及重连过程中的行为。目前的反馈显示连接状态管理不够健壮，容易导致服务“搁浅”或初始化被取消。
2.  **会话持久化与内存优化**:
    *   长时间运行的会话（`--resume`）存在内存溢出风险。同时，跨会话的上下文查询能力（Issue #2436）也是一个长期被提及的功能需求，用户希望在不同会话间复用上下文。
3.  **Windows 平台兼容性**:
    *   Windows 用户面临较多挑战，包括 WSL2 的 CPU 占用回归、插件更新权限冲突以及新版本对 Windows 25H2 的支持问题。
4.  **OAuth 与认证流程**:
    *   远程 MCP 服务的 OAuth 认证频繁中断，且静默刷新失败，迫使用户频繁重新登录。

---

## 6. 开发者关注点
*   **“授权疲劳”**: 开发者对频繁弹出的授权框感到困扰，急需优化授权策略。
*   **安装器稳定性**: Windows 安装器在特定环境变量长度（>2047字符）和 NuGet 私有源访问方面存在问题。
*   **插件生态**: 技能和自定义命令的参数自动补全功能缺失，增加了使用门槛。
*   **模型配置**: 社区开始关注 OpenAI Flex Tier 等低成本模型选项的支持。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI 社区动态日报**

**日期：** 2026-09-12
**来源：** [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

### 1. 今日速览
过去24小时内，Kimi Code CLI 社区活跃度平稳，无新版本发布。社区主要关注点集中在 **Linux/WSL2 环境下的稳定性问题**，特别是 v0.42.0 版本中出现的随机硬死锁现象，已引起开发团队注意。此外，旧版本遗留的 CentOS 7.9 兼容性问题也在近期被重新开启讨论。

### 2. 版本发布
*无新版本发布。*

### 3. 社区热点 Issues

**🔴 紧急关注：Linux/WSL2 硬死锁问题**
*   **Issue #2640**: [Open] Linux/WSL2 下 kimi CLI 0.42.0 随机硬死锁，SIGTERM/SIGQUIT 无法终止
    *   **重要性**: 🔴 **高**。这是一个严重的稳定性 Bug，不仅导致 CLI 无响应，还会拖死 SSH 会话，严重影响用户在服务器环境下的工作流。
    *   **详情**: 用户反馈 v0.42.0 在长时间运行后 TUI 偶发卡死，且无法通过标准的信号终止进程。这通常涉及并发控制或资源释放机制的缺陷。

**🟡 兼容性：CentOS 7.9 MCP 连接失败**
*   **Issue #1388**: [Closed] kimicode 在 centos 7.9 terminal 无法使用，显示 mcp connect failed
    *   **重要性**: 🟡 **中**。这是旧版本遗留的兼容性问题，近期被重新激活。虽然已标记为 Closed，但用户反馈显示该问题可能并未完全解决，特别是在老旧的 CentOS 系统上。
    *   **详情**: 错误信息为 `Unexpected error: Failed to connect MCP servers`，阻碍了用户在 CentOS 7.9 环境下启动服务。

### 4. 重要 PR 进展
*过去24小时内无新的 Pull Request 更新。*

### 5. 功能需求趋势
从当前活跃 Issue 分析，社区在以下方向呼声较高：
*   **环境稳定性**: 针对 WSL2 和 Linux 服务器环境的稳定性优化是当前最迫切的需求。
*   **遗留系统支持**: 需要确保工具在较旧的操作系统（如 CentOS 7.9）上的兼容性。

### 6. 开发者关注点
*   **资源管理**: `SIGTERM/SIGQUIT` 无法终止进程的问题表明，CLI 在处理系统信号或进程退出逻辑时存在逻辑漏洞。
*   **长时运行稳定性**: "长时间运行后"的偶发性卡死通常指向内存泄漏、goroutine 泄漏或竞态条件，这是 CLI 类工具开发中的常见难点。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-09-12
**分析周期**: 过去 24 小时

## 1. 今日速览
OpenCode 社区今日活跃度较高，主要聚焦于 **v2.0 稳定版发布路径** 的构建、**模型缓存机制** 的优化（特别是 DeepSeek 模型的支持）以及 **桌面端 UI 交互** 的改进。同时，社区也持续反馈了在处理复杂推理流、MCP 服务器集成及 TUI（终端界面）性能方面的问题。

## 2. 版本发布
*   **v1.18.30 (Desktop)**: 发布了桌面端新版本，但在启动时遇到了“白屏遮罩层不消失”的已知问题。
*   **v2.0 Beta**: 正在构建独立的稳定发布路径（PR #48546），以更好地管理 `@opencode/*` npm 包的发布流程。

## 3. 社区热点 Issues

### 🔴 高优先级 Bug
*   **#37790** [OPEN] **订阅支付成功但余额不足**
    *   *重要性*: 严重的计费与支付流程 Bug，直接影响用户使用。
    *   *详情*: 用户通过 Stripe 支付成功后，工作区仍提示余额不足，无法使用服务。
*   **#45442** [OPEN] **Subagent 无限循环导致 Token 燃尽**
    *   *重要性*: 严重的性能与资源消耗问题。
    *   *详情*: Subagent 在 50 分钟内重复执行 364 次 `grep` 工具调用，无循环保护机制。
*   **#17648** [OPEN] **会话处理器无限重试（无熔断机制）**
    *   *重要性*: 系统稳定性风险。
    *   *详情*: 上游 LLM 返回临时错误时，系统无最大重试次数限制，可能导致雪崩。

### 🟡 功能与体验反馈
*   **#30308** [OPEN] **请求类似 Claude Code 动态工作流**
    *   *重要性*: 用户对高级工作流功能的强烈需求。
    *   *反应*: 获得了 5 个点赞。
*   **#7963** [CLOSED] **仅撤销消息，保留文件修改**
    *   *重要性*: 优化用户体验，类似于 Claude Code 的交互习惯。
    *   *反应*: 获得了 12 个点赞，已被关闭（可能已实现）。
*   **#27110** [OPEN] **限制并行 Subagent 数量**
    *   *重要性*: 本地模型上下文限制下的关键配置。
    *   *反应*: 获得了 31 个点赞，关注度最高。

### 🔵 模型与集成问题
*   **#36241** [OPEN] **macOS 上 gpt-5.6-sol-fast 推理部分失败**
    *   *详情*: macOS 新会话在使用 OpenAI Codex OAuth 时，流式传输推理部分报错 `rs_*:0 not found`。
*   **#43218 / #41125** [OPEN] **DeepSeek 模型缓存命中率极低**
    *   *详情*: 多位用户报告在使用 DeepSeek V4 Flash 时，OpenCode Go 端点的提示词缓存几乎完全失效（命中率 < 10%）。

## 4. 重要 PR 进展

### 🛠️ 核心修复
*   **#48560** [OPEN] **TUI 性能优化**
    *   *内容*: 修复流式文本追加时的全树扫描性能问题，防止历史记录增加时 UI 卡顿。
*   **#48559** [OPEN] **重构 Value Model 错误处理**
    *   *内容*: 为错误值添加真实的原型链和 JS 错误类型，提高代码健壮性。
*   **#48549** [OPEN] **Provider 模型发现修复**
    *   *内容*: 修复 `openai-compatible` 提供商在修改 baseURL 后模型列表显示过时的问题。

### ✨ 新功能与改进
*   **#48561** [OPEN] **集成 TinyFish 网络搜索**
    *   *内容*: 添加内置网络搜索提供商，支持 Keyless 模式，无需配置即可搜索。
*   **#48526** [OPEN] **桌面端侧边栏导航**
    *   *内容*: 添加类似 Codex 的持久化侧边栏，支持线程状态、置顶和 settle 功能。
*   **#48547** [OPEN] **文档更新**
    *   *内容*: 将 `jsluice-skill` 添加到生态系统项目列表中。

### 🏗️ 架构与发布
*   **#48562** [OPEN] **Catalog 原生化重构**
    *   *内容*: 解决设置扁平化后 Catalog 仍存在数据不一致的问题，使模型列表与实际运行状态匹配。
*   **#48546** [CLOSED] **v2 稳定版发布隔离**
    *   *内容*: 建立独立的 v2 稳定发布路径，确保版本管理清晰。

## 5. 功能需求趋势
*   **工作流与交互增强**: 社区对“动态工作流”、“撤销消息保留文件”以及“会话继续推理”等功能有强烈需求，显示出用户希望 AI 工具更具灵活性和可控性。
*   **本地模型支持**: 多个 Issue 提到本地模型上下文限制，社区迫切需要配置并行 Agent 数量上限的能力。
*   **多模型生态**: 对 Meta 的 Muse Code/Spark 以及 DeepSeek 等新模型的支持请求增多，同时 Agent Plugins 标准的支持呼声也在上升。

## 6. 开发者关注点
*   **资源管理**: 防止 Subagent 无限循环和 Token 燃尽是当前最紧急的稳定性问题。
*   **跨平台稳定性**: macOS 下的特定模型推理错误、TUI 在大历史记录下的性能衰减、以及桌面端启动时的 UI 冲突是高频反馈点。
*   **集成兼容性**: OpenAI 兼容端点的参数校验（如 `prompt_cache_key`）以及第三方网关的兼容性问题需要持续关注。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期：** 2026-09-12  
**来源：** [badlogic/pi-mono](https://github.com/badlogic/pi-mono)

---

## 1. 今日速览
过去 24 小时内，Pi 社区活跃度较高，共产生 50 个新 Issue 和 22 个 PR 更新。Windows 平台的支持与稳定性是当前最核心的关注点，社区在 Windows 环境下的 Shell 路径解析、IME 输入体验以及多平台兼容性上投入了大量讨论。同时，针对 Bedrock、Vertex AI 等云服务的适配优化以及 CJK（中日韩）输入支持也在稳步推进。

## 2. 版本发布
*无新版本发布。*

## 3. 社区热点 Issues

### 🔥 Windows 生态与多平台体验
1. **[#7547] Windows 下 Pi 的使用方式与痛点** (62 评论)
   - **重要性：** 超高热度，反映了 Windows 用户基数大但使用门槛较高。
   - **摘要：** 讨论如何在 Windows 上运行 Pi、遇到的 Sink 线程问题，以及如何简化多运行方式的文档与配置。
   - **链接：** [earendil-works/pi Issue #7547](https://github.com/earendil-works/pi/issues/7547)

2. **[#9497] Windows CJK IME 输入延迟与候选窗口问题** (1 评论)
   - **重要性：** 针对中文用户的直接痛点，影响日常交互体验。
   - **摘要：** 启用 `showHardwareCursor` 可解决输入法卡顿和候选窗口不显示的问题。
   - **链接：** [earendil-works/pi Issue #9497](https://github.com/earendil-works/pi/issues/9497)

3. **[#9490] findPowerShell 硬编码 C: 盘路径导致 D 盘系统崩溃** (3 评论, CLOSED)
   - **重要性：** 严重 Bug，影响非标准磁盘布局的 Windows 用户。
   - **摘要：** 当 OS 安装在 D 盘时，`findPowerShell` 无法找到 PowerShell，导致程序崩溃。
   - **链接：** [earendil-works/pi Issue #9490](https://github.com/earendil-works/pi/issues/9490)

### 🐛 关键 Bug 与性能优化
4. **[#9410] TUI 模式下按 Escape 导致 60 秒卡顿** (4 评论)
   - **重要性：** 严重影响大会话下的交互体验。
   - **摘要：** 在处理大量 Token 的会话中，强制中断流式输出会导致编辑器冻结约 1 分钟。
   - **链接：** [earendil-works/pi Issue #9410](https://github.com/earendil-works/pi/issues/9410)

5. **[#9265] OpenAI Completions 流式处理中的 O(n²) 工具调用解析** (4 评论)
   - **重要性：** 性能瓶颈，可能导致长上下文流式调用卡死事件循环。
   - **摘要：** 每次流式接收都重新解析整个 JSON，造成计算成本呈二次方增长。
   - **链接：** [earendil-works/pi Issue #9265](https://github.com/earendil-works/pi/issues/9265)

6. **[#5323] Vertex + GCP 元数据服务器支持优化** (9 评论)
   - **重要性：** 云服务集成质量，影响企业级用户。
   - **摘要：** 优化了 `is Vertex authed` 的检查机制，同步检查环境变量和配置文件。
   - **链接：** [earendil-works/pi Issue #5323](https://github.com/earendil-works/pi/issues/5323)

7. **[#9323] 改进 Fireworks 特定配置** (14 评论)
   - **重要性：** 特定云提供商的配置细节优化。
   - **摘要：** 用户报告了关于特定函数配置的 Bug，涉及 AI 生成的部分。
   - **链接：** [earendil-works/pi Issue #9323](https://github.com/earendil-works/pi/issues/9323)

### 🌐 终端与跨平台兼容
8. **[#7321] Termux 等不支持 Bracketed Paste 模式的终端多行粘贴失败** (5 评论)
   - **重要性：** 移动端及某些特定终端环境下的兼容性。
   - **摘要：** 粘贴包含换行的文本时，`\r` 触发提交而非插入。
   - **链接：** [earendil-works/pi Issue #7321](https://github.com/earendil-works/pi/issues/7321)

9. **[#9205] 示例代码中使用了错误的 `--no-extension` 标志** (3 评论, CLOSED)
   - **重要性：** 文档与示例代码的一致性，防止用户踩坑。
   - **摘要：** `rpc-extension-ui.ts` 应使用 `--no-extensions` 而非 `--no-extension`。
   - **链接：** [earendil-works/pi Issue #9205](https://github.com/earendil-works/pi/issues/9205)

### 🛠️ API 与功能增强
10. **[#7658] 扩展 API：持久化 API Key 凭证** (4 评论)
    - **重要性：** 扩展生态的重要缺失功能。
    - **摘要：** 扩展注册自定义 Provider 后，无法将 API Key 保存到 `auth.json`，目前只能存储在内存中。
    - **链接：** [earendil-works/pi Issue #7658](https://github.com/earendil-works/pi/issues/7658)

---

## 4. 重要 PR 进展

1. **[#9501] fix(coding-agent): resolve Windows shells from installation directories** (OPEN)
   - **内容：** 统一了 Windows 下查找各种二进制文件（Shell 等）的路径逻辑，不再依赖硬编码或混乱的回退机制。
   - **链接：** [earendil-works/pi PR #9501](https://github.com/earendil-works/pi/pull/9501)

2. **[#9117] feat(coding-agent): deliver prompt and tool changes as system message deltas** (CLOSED)
   - **内容：** 优化编码 Agent 的提示词注入方式，通过系统消息增量传输变更，而非重写顶层提示词。
   - **链接：** [earendil-works/pi PR #9117](https://github.com/earendil-works/pi/pull/9117)

3. **[#9116] feat(ai): add mid-conversation system messages** (CLOSED)
   - **内容：** 支持在会话中间动态注入系统消息（如工具加载、扩展注册变更）。
   - **链接：** [earendil-works/pi PR #9116](https://github.com/earendil-works/pi/pull/9116)

4. **[#9489] fix(bedrock-converse): normalize gross usage.input to net per model family** (CLOSED)
   - **内容：** 修复 Bedrock Converse API 中不同模型家族的 Token 使用统计归一化问题。
   - **链接：** [earendil-works/pi PR #9489](https://github.com/earendil-works/pi/pull/9489)

5. **[#9488] fix(ai): add canonical Codex turn attribution** (OPEN)
   - **内容：** 为流式请求添加 `requestIdentity` 元数据，确保跨工具调用和重试的请求可正确归属到用户会话。
   - **链接：** [earendil-works/pi PR #9488](https://github.com/earendil-works/pi/pull/9488)

6. **[#9442] fix(ai): allow prompt cache keys for compatible proxies** (OPEN)
   - **内容：** 允许兼容代理服务器接收 `prompt_cache_key`，解决某些代理不支持默认短保留策略的问题。
   - **链接：** [earendil-works/pi PR #9442](https://github.com/earendil-works/pi/pull/9442)

7. **[#9478] fix(coding-agent): cap per-message chars in compaction token estimate** (CLOSED)
   - **内容：** 修复自动压缩功能在收到大体积 JSON 结果时误触发的问题，限制了单条消息的字符数上限。
   - **链接：** [earendil-works/pi PR #9478](https://github.com/earendil-works/pi/pull/9478)

8. **[#9468] feat(coding-agent): deferred extension reload** (CLOSED)
   - **内容：** 实现延迟的扩展重载机制，确保重载操作在 Agent 运行 settle 后执行，避免中断当前回合。
   - **链接：** [earendil-works/pi PR #9468](https://github.com/earendil-works/pi/pull/9468)

9. **[#9467] fix(ai): classify setup-phase aborts as "aborted" in lazyStream** (CLOSED)
   - **内容：** 修复在 `lazyStream` 阶段被中止（AbortError）时，错误提示显示为硬错误而非“操作已中止”。
   - **链接：** [earendil-works/pi PR #9467](https://github.com/earendil-works/pi/pull/9467)

10. **[#9495] fix(approve-contributor): stop inserting blank lines before new entries** (CLOSED)
    - **内容：** 修复贡献者批准列表中自动插入空行导致后续添加条目位置错误的问题。
    - **链接：** [earendil-works/pi PR #9495](https://github.com/earendil-works/pi/pull/9495)

---

## 5. 功能需求趋势
从 Issues 和 PR 的分析来看，社区需求主要集中在以下三个方向：
1. **云服务深度适配：** 社区对 Bedrock (Mantle API)、Vertex AI 以及 OpenAI 代理的 Prompt Cache 功能有明确需求，开发者正在逐步完善这些高级云特性。
2. **跨平台稳定性：** Windows 平台（尤其是非标准盘符、输入法）和移动端（Termux）的兼容性是高频反馈点，社区正在推动多平台统一体验。
3. **扩展生态增强：** 对扩展 API 的请求从“功能请求”转向“稳定性与易用性”，如持久化凭证、公开 HTML 渲染函数、以及更完善的工具上下文支持。

## 6. 开发者关注点
*   **性能瓶颈：** `O(n²)` 的流式解析和长会话的 TUI 卡顿是开发者反馈最强烈的性能问题。
*   **配置复杂性：** Windows 下多种 Shell 路径查找方式让用户和开发者都感到困惑，PR 正在尝试统一逻辑。
*   **调试难度：** `SIGILL` 崩溃和 `Escape` 卡死等问题表明底层运行时和 TUI 渲染引擎仍需更多鲁棒性改进。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*