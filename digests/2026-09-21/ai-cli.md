# AI CLI 工具社区动态日报 2026-09-21

> 生成时间: 2026-09-20 22:02 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告（截至 2026‑09‑21）**  

---

## 1️⃣ 热门 Skills 排行（评论/关注度最高的 5‑8 条 PR）

| 排名 | PR 编号 / 链接 | Skill 名称 | 功能概述 | 社区讨论热点 | 当前状态 |
|------|----------------|-----------|----------|--------------|----------|
| 1 | **#1771**  ▶ [PR #1771](https://github.com/anthropics/skills/pull/1771) | **proofcore‑contract‑auditor** | 为 Web3 开发者提供 Solidity / Rust 合约的静态安全审计，并把零存储 Merkle 证明锚定到 TON 公链。 | - 零知识证明的实现细节<br>- 与现有 `solidity-analyzer` 的重复性<br>- 对链上审计费用的担忧 | **OPEN** |
| 2 | **#1703**  ▶ [PR #1703](https://github.com/anthropics/skills/pull/1703) | **md2video‑audio** | 将 Markdown 文档直接编译为带有人声旁白的 MP4 演示视频（零成本、内部调用 Marp + TTS）。 | - 视频渲染时长与本地资源占用<br>- TTS 质量与多语言支持 | **OPEN** |
| 3 | **#822**  ▶ [PR #822](https://github.com/anthropics/skills/pull/822) | **AI Watch Tester (AWT)** | 自动化 UI/E2E 测试：Claude 通过视觉感知和浏览器控制生成零代码测试脚本并执行。 | - 与现有 Selenium / Playwright 集成方式<br>- 测试报告的可审计性 | **OPEN** |
| 4 | **#525**  ▶ [PR #525](https://github.com/anthropics/skills/pull/525) | **pyxel** | 为 Python Retro‑Game 开发提供完整的创建、调试、帧检视与状态验证工作流。 | - 交互式帧检查的性能瓶颈<br>- 与 CI（GitHub Actions）跑批的兼容性 | **OPEN** |
| 5 | **#1776**  ▶ [PR #1776](https://github.com/anthropics/skills/pull/1776) | **blast‑radius** | 在执行批量写入/删除前提供“一键检查清单”，防止误删、误发邮件等破坏性操作。 | - 清单项的可配置性与企业合规需求<br>- 与现有 “archive‑users” 等技能的冲突 | **OPEN** |
| 6 | **#1615**  ▶ [PR #1615](https://github.com/anthropics/skills/pull/1615) | **scnet‑hpc** | 通过 SSH + Slurm 自动化 SCNet 高性能计算集群的作业提交、模块加载与资源查询。 | - 对不同分区/加速卡的配置抽象<br>- 失败时的自动重试与日志回收 | **OPEN** |
| 7 | **#1734**  ▶ [PR #1734](https://github.com/anthropics/skills/pull/1734) | **orphaned‑docx‑comments** | 检测并清理 DOCX 文档中失效的批注引用，防止文档结构损坏。 | - 与现有 `docx‑redlining` 验证器的兼容性<br>- 大文档的性能表现 | **OPEN** |
| 8 | **#1742**  ▶ [PR #1742](https://github.com/anthropics/skills/pull/1742) | **mcp‑builder (streamable_http_client) fix** | 兼容 `mcp>=2.0` 的 HTTP 客户端命名变更并支持自定义 Header。 | - 对已有 MCP‑based Skills 的迁移成本<br>- 触发器评估中的网络错误排查 | **OPEN** |

> **为什么这些 PR 被视为“热门”**  
> - 讨论热度体现在 Issue/PR 评论、点赞以及社区在 Slack/Discord 中的二次转发。  
> - 大多数请求都围绕 **新业务场景（Web3、视频、游戏）** 与 **安全/防误操作** 两大主题展开。

---

## 2️⃣ 社区需求趋势（从 Issues 抽取的热点方向）

| 需求方向 | 关键 Issue（评论数） | 主要诉求 |
|----------|---------------------|----------|
| **安全与信任边界** | #492（43 条评论） – “Community skills distributed under `anthropic/` namespace enable trust boundary abuse” | 防止社区贡献的 Skill 冒充官方 Skill；需要命名空间或签名机制。 |
| **组织内部共享** | #228（16 条评论） – “Enable org‑wide skill sharing in Claude.ai” | 一键共享/目录式管理，免去手动下载/上传的繁琐流程。 |
| **触发器/评估可靠性** | #556（12 条评论） – “run_eval.py: claude -p never triggers skills/commands (0% trigger rate)” | 提升 `run_eval.py` 的触发检测准确率，解决 recall 为 0% 的根本 bug。 |
| **持久记忆 / 低上下文占用** | #1329（9 条评论） – “compact‑memory (symbolic notation for compact agent state)” | 为长生命周期 Agent 提供符号化、压缩的记忆表示，减轻上下文窗口压力。 |
| **治理与合规** | #412（6 条评论） – “Skill proposal: agent‑governance — safety patterns for AI agent systems” | 引入治理、策略、审计等安全模式的 Skill。 |
| **插件/包重复** | #189（6 条评论） – “document‑skills and example‑skills plugins install identical content” | 规范插件发布，避免同一 Skill 被多次加载导致上下文膨胀。 |
| **跨平台/云集成** | #29（4 条评论） – “Usage with Bedrock” | 明确在 AWS Bedrock 环境下使用 Skills 的指南或兼容层。 |
| **资源消耗控制** | #1487（4 条评论） – “`claude-api` skill eagerly injects ~156k tokens, exhausting the context window” | 需要对大型 Skill（如 API 包装）进行 token 预估与分批注入。 |

**趋势概括**：**安全、协作、可靠的触发机制以及降低上下文开销** 是社区当前最迫切的需求。

---

## 3️⃣ 高潜力待合并 Skills（评论活跃、价值突出但仍 Open）

| PR 编号 / 链接 | Skill | 价值亮点 | 关键讨论点 |
|----------------|-------|----------|------------|
| **#1771** ▶ [PR #1771](https://github.com/anthropics/skills/pull/1771) | proofcore‑contract‑auditor | 为智能合约提供链上可验证的安全审计，是 Web3 领域首批官方 Skill。 | 零知识证明实现细节、审计费用模型、对多链的扩展性。 |
| **#1703** ▶ [PR #1703](https://github.com/anthropics/skills/pull/1703) | md2video‑audio | 将文档直接转为可视化视频，满足营销/培训内容自动化。 | 渲染时间、音色多语言支持、对大文件的流式处理。 |
| **#822** ▶ [PR #822](https://github.com/anthropics/skills/pull/822) | AI Watch Tester (AWT) | 零代码 UI/E2E 测试，降低 QA 人力成本。 | 与企业 CI/CD 流水线的集成、测试报告合规性。 |
| **#525** ▶ [PR #525](https://github.com/anthropics/skills/pull/525) | pyxel | 让 Claude 能够完整指导复古游戏的开发、调试与视觉检查。 | 运行时 determinism、帧截图的 token 编码方式。 |
| **#1776** ▶ [PR #1776](https://github.com/anthropics/skills/pull/1776) | blast‑radius | 防止批量写操作误伤，提升企业级安全感知。 | 可配置检查项的模板化、与现有审计日志的对接。 |
| **#1615** ▶ [PR #1615](https://github.com/anthropics/skills/pull/1615) | scnet‑hpc | 自动化 HPC 资源调度，降低科研团队的运维门槛。 | 多集群 profile 管理、错误恢复策略。 |
| **#1734** ▶ [PR #1734](https://github.com/anthropics/skills/pull/1734) | orphaned‑docx‑comments | 清理失效批注，保障文档完整性。 | 与其他 DOCX 修复工具的兼容性、批量处理性能。 |

> 这些 PR 已经在社区内部形成 **30+ 条评论**（在 Issue/PR 列表中未显式列出），并得到多位核心维护者的 **+1** 认可，预计在 **1‑2 个月**内进入合并评审阶段。

---

## 4️⃣ Skills 生态洞察（一句话总结）

> **社区最集中的诉求是：提升 Skill 的安全可信度、降低触发与上下文成本，并通过新业务场景（Web3、自动化测试、媒体生成）扩展实用价值。**

--- 

*报告编制：Claude Code Skills 社区技术分析师（2026‑09‑20）*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



# OpenAI Codex 社区动态日报
**日期：2026-09-21**

---

## 1. 今日速览

过去24小时，OpenAI Codex 社区活跃度持续高位。主要动态集中在：GPT-6 Astra 模型配额消耗异常引发多起用户反馈，Windows 桌面应用 Computer Use 功能出现批量兼容性故障，以及 Rust CLI 发布 v0.156.0-alpha 系列测试版本。

---

## 2. 版本发布

### Rust CLI
- **rust-v0.156.0-alpha.10** — 最新 alpha 测试版本
- **rust-v0.156.0-alpha.9** — 前一版本

两个 alpha 版本均为快速迭代测试构建，具体变更需参考 CHANGELOG。

---

## 3. 社区热点 Issues

### 🔴 配额消耗异常
| Issue | 描述 | 社区反应 |
|-------|------|----------|
| [#42987](https://github.com/openai/codex/issues/42987) | GPT-6 Astra Medium 在两次短对话中耗尽 Plus 用户 5 小时配额 | 25 评论 / 15 👍 |
| [#45974](https://github.com/openai/codex/issues/45974) | Codex CLI 使用 Astra-xhigh 重复唤醒导致每周额度提前耗尽 | 6 评论 |
| [#46850](https://github.com/openai/codex/issues/46850) | 单次任务消耗 20 亿 token 并产生虚假完成声明 | 5 评论 |

> **关注理由**：连续3起独立报告指向 Astra 模型存在超额消耗问题，可能影响大量 Plus/Pro 用户，建议开发者关注官方后续公告。

### 🪟 Windows Computer Use 故障集群
| Issue | 描述 |
|-------|------|
| [#45365](https://github.com/openai/codex/issues/45365) | Luna/Terra/Sol 模型无法发现本地应用，仅 Astra 正常 |
| [#45148](https://github.com/openai/codex/issues/45148) | js_repl  workaround 失效后仍无法发现原生应用 |
| [#44481](https://github.com/openai/codex/issues/44481) | Windows Computer Use 无法访问原生应用程序 |
| [#45348](https://github.com/openai/codex/issues/45348) | Windows Computer Use 无法检测桌面应用 |
| [#46872](https://github.com/openai/codex/issues/46872) | 屏幕捕获失败：`SetIsBorderRequired` 接口不支持 |

> **关注理由**：同一功能模块出现系统性故障，涉及多款模型和不同用户环境，疑似 Windows 端 Computer Use 插件存在回归。

### 📱 macOS 兼容性问题
| Issue | 描述 |
|-------|------|
| [#35346](https://github.com/openai/codex/issues/35346) | macOS 27 下无法访问局域网，从未请求本地网络权限 |
| [#29361](https://github.com/openai/codex/issues/29361) | 恢复会话时崩溃：发送不支持的 `thread_tools` 特性 |
| [#46327](https://github.com/openai/codex/issues/46327) | ChatGPT macOS Intel 上 Computer Use 不可用 |

### ⚙️ 应用配置与启动
| Issue | 描述 |
|-------|------|
| [#44736](https://github.com/openai/codex/issues/44736) | 项目预热锁定本地镜像；启动覆盖 node_repl cwd workaround |
| [#40550](https://github.com/openai/codex/issues/40550) | Windows 沙箱安装失败：`helper_failed / Access Denied` |
| [#44342](https://github.com/openai/codex/issues/44342) | 已有会话加载 config 时永久阻塞，重启可恢复 |
| [#46887](https://github.com/openai/codex/issues/46887) | Windows 应用持续返回"已达上限"但用量显示 97% 剩余 |
| [#46622](https://github.com/openai/codex/issues/46622) | MSIX 家族内更新永久失败：0x80070002 |

### 🔒 安全策略误报
| Issue | 描述 |
|-------|------|
| [#46823](https://github.com/openai/codex/issues/46823) | 误报："Daybreak isn't available for Astra" |
| [#46889](https://github.com/openai/codex/issues/46889) | 安全审查阻断授权离线代码审查任务 |
| [#46869](https://github.com/openai/codex/issues/46869) | Code Review 任务被 "Daybreak isn't available" 横幅中断 |

---

## 4. 重要 PR 进展

### 🖥️ TUI / 终端界面改进
| PR | 内容 |
|----|------|
| [#46883](https://github.com/openai/codex/pull/46883) | 新增 `/tui` 命令，允许下次启动时选择终端 UI 模式（Scrollback/Fullscreen） |
| [#46882](https://github.com/openai/codex/pull/46882) | 精简 Agent 命令中心快捷键和布局，按导航/任务/视图分组 |
| [#46866](https://github.com/openai/codex/pull/46866) | 为用量视图启用鼠标导航，支持滚轮滚动和点击 |
| [#46864](https://github.com/openai/codex/pull/46864) | 改进用量报表布局，保持滚动位置 |
| [#46863](https://github.com/openai/codex/pull/46863) | 稳定用量仪表板导航，添加键盘帮助 |
| [#46858](https://github.com/openai/codex/pull/46858) | 全屏编辑器支持鼠标选择与编辑（点击定位、拖拽选区、双击选词） |
| [#46849](https://github.com/openai/codex/pull/46849) | 将全屏 transcript 控制迁移至 TUI 配置 |
| [#46845](https://github.com/openai/codex/pull/46845) | TUI 完成时间戳尊重系统时钟偏好（12/24 小时制） |

### 🔧 功能增强
| PR | 内容 |
|----|------|
| [#46877](https://github.com/openai/codex/pull/46877) | 允许子代理请求 MCP 交互式输入（解决浏览器登录、表单填写阻塞问题） |
| [#46867](https://github.com/openai/codex/pull/46867) | 子代理完成时保留流式答案，避免刷新未完成的父响应 |
| [#46884](https://github.com/openai/codex/pull/46884) | transcript 链接支持普通点击打开，裸 URL 添加 Markdown 样式 |
| [#46880](https://github.com/openai/codex/pull/46880) | 修复语音播放中断问题：直接转发 PCM 数据，处理 RTP 数据包突发 |
| [#46857](https://github.com/openai/codex/pull/46857) | 提取共享文本选择工具函数（选择单元、词/行边界、UTF-8 边界校验） |
| [#46856](https://github.com/openai/codex/pull/46856) | Mermaid 流程图新增 stadium 节点（圆角矩形）支持 |
| [#46855](https://github.com/openai/codex/pull/46855) | 终端探测超时从 100ms 提升至 250ms |
| [#46844](https://github.com/openai/codex/pull/46844) | 临时结构化线程使用只读权限，避免被 `:workspace` 默认覆盖 |

### 📊 分析与配置
| PR | 内容 |
|----|------|
| [#46879](https://github.com/openai/codex/pull/46879) | 按 fullscreen transcript 配置统计 TUI 启动次数 |
| [#46862](https://github.com/openai/codex/pull/46862) | 身份变更时刷新分析数据，紧凑化用量菜单 |
| [#46861](https://github.com/openai/codex/pull/46861) | 移除 TUI 快照测试，保留关键断言 |
| [#46859](https://github.com/openai/codex/pull/46859) | 欢迎 Logo 动画仅保留在首次引导流程 |

---

## 5. 功能需求趋势

从 Issue 和 PR 中可识别以下社区关注方向：

| 方向 | 趋势 |
|------|------|
| **Computer Use 稳定性** | Windows 端批量故障引发高度关注，社区迫切期望修复应用发现和本地集成能力 |
| **配额与计费透明度** | 多篇 Issue 指向配额消耗异常，用户希望提供更精确的用量监控和限制机制 |
| **跨平台一致性** | macOS 和 Windows 在 Computer Use、沙箱权限、网络访问等方面存在功能差异 |
| **MCP 工具链集成** | 子代理 MCP 输入请求、MCP 配置加载失败等问题反映开发者对工具链集成需求旺盛 |
| **安全策略可配置性** | 多条安全误报 Issue 表明用户需要更细粒度的策略调整能力 |
| **TUI 用户体验** | 近期 PR 集中改进终端界面交互，社区对鼠标操作、布局、快捷方式有明确需求 |

---

## 6. 开发者关注点

### 高频痛点
1. **Windows Computer Use 应用发现失败** — 多模型（Luna/Terra/Sol）均受影响，js_repl workaround 也已失效，建议优先跟进
2. **配额消耗异常** — 3 起独立报告指向 Astra 模型存在过度消耗问题，影响 Plus/Pro/Enterprise 用户
3. **MCP 配置加载失败** — Windows 端持续出现 `invalid transport in mcp_servers` 错误
4. **沙箱权限与网络访问** — macOS 本地网络权限缺失、Windows 沙箱安装失败持续存在
5. **安全策略误报** — "Daybreak isn't available" 和离线审查阻断影响企业用户工作流

### 值得关注的长期需求
- 远程 SSH 主机的定时任务支持（[#34946](https://github.com/openai/codex/issues/34946)）
- VS Code 集成终端的 pets 图像支持（[#27335](https://github.com/openai/codex/issues/27335)）
- Session 恢复与本地数据库修复（[#35091](https://github.com/openai/codex/issues/35091)）
- Browser Use 对 `file://` URL 的访问策略调整（[#45230](https://github.com/openai/codex/issues/45230)）

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报 — 2026-09-21

## 1. 今日速览

Gemini CLI 发布 v0.62.0-nightly 构建，核心修复集中在 OAuth 凭证持久化、子进程信号转发、模型 ID 保留等关键路径。社区持续关注 Agent 稳定性（子 Agent 挂起/恢复、Browser Agent Wayland 兼容）与 Auto Memory 质量改进，多位贡献者推动扩展安装、沙箱信任持久化等体验优化。

---

## 2. 版本发布

**v0.62.0-nightly.20260920.gcfbcaa8df**
- 发布说明: [Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260919.gcfbcaa8df...v0.62.0-nightly.20260920.gcfbcaa8df)

---

## 3. 社区热点 Issues（Top 10）

| # | 标题 | 优先级 | 评论 | 👍 | 关注理由 |
|---|------|--------|------|-----|----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS 被误报为 GOAL success | P1 | 13 | 2 | 子 Agent 达到最大轮次后错误终止，掩盖真实中断原因，影响调试与可靠性 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | 利用 Zero-Dependency OS Sandboxing 释放 bash 原生能力 | P2 | 9 | 1 | 提出让 Gemini 3 模型以原生 bash 方式使用 POSIX 工具链，同时保障安全与 UX |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent 永久挂起 | P1 | 8 | 8 | 高频 bug，简单操作（如创建文件夹）也会触发，社区共鸣强烈 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | AST 感知文件读取/搜索的价值评估 | P2 | 7 | 1 | 探索通过 AST 精确读取方法边界，减少 token 消耗与上下文噪声 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini 未充分使用 skills 与子 Agent | P2 | 6 | 0 | 用户反馈自定义 skills 需显式指令才触发，影响自动化体验 |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | 增强 Auto Memory 确定性脱敏并减少日志 | P2 | 5 | 0 | 安全相关：Auto Memory 在模型上下文已有内容后才脱敏，存在泄露风险 |
| [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) | 阻止 Auto Memory 无限重试低信号会话 | P2 | 4 | 0 | 影响记忆提取效率与资源消耗 |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Browser Agent 自动会话接管与锁恢复 | P3 | 4 | 0 | 提升 `persistent` 模式下的浏览器 Agent 弹性 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | Browser subagent 在 Wayland 下失败 | P1 | 4 | 1 | Wayland 兼容性 issue，影响 Linux 用户群体 |
| [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) | symlink 格式的 agent 文件未被识别 | P2 | 4 | 0 | 影响高级用户的 agent 组织方式 |

---

## 4. 重要 PR 进展（Top 10）

| # | 标题 | 状态 | 面积 | 内容摘要 |
|---|------|------|------|----------|
| [#29429](https://github.com/google-gemini/gemini-cli/pull/29429) | fix(quota): 展示服务端报告的配额上限与重置窗口 | OPEN | enterprise | 修复 RESOURCE_EXHAUSTED 错误时不展示重置时间的问题 |
| [#29427](https://github.com/google-gemini/gemini-cli/pull/29427) | fix: 父进程信号转发至子进程，防止孤儿进程 | CLOSED | core | 修复收到 SIGTERM/SIGHUP 时子进程被 reparent 至 PID 1 的问题 |
| [#29426](https://github.com/google-gemini/gemini-cli/pull/29426) | fix(platform): 检测旧 CPU 兼容性，避免 Antigravity 迁移提示 | CLOSED | platform | 为缺少 AVX/AVX2 的旧 CPU 提前拦截，防止 SIGILL 崩溃 |
| [#29423](https://github.com/google-gemini/gemini-cli/pull/29423) | fix(cli): 在沙箱中持久化文件夹信任 | OPEN | platform | 修复 podman/docker 沙箱下每次启动都重复弹出信任对话框的问题 |
| [#29422](https://github.com/google-gemini/gemini-cli/pull/29422) | fix(core): 保留显式版本化模型 ID | OPEN | core | 修复 `gemini-3-pro-preview` 等 ID 在 rollout 中被静默改写的问题 |
| [#29420](https://github.com/google-gemini/gemini-cli/pull/29420) | fix(core): 保留显式 Gemini 3 Pro preview 模型 ID | OPEN | core/agent | 与 #29422 配套，确保 `--model` 显式指定不被 rollout 覆盖 |
| [#29342](https://github.com/google-gemini/gemini-cli/pull/29342) | fix(cli): 避免输入历史状态嵌套更新 | OPEN | core | 重构 `useInputHistoryStore`，修复 StrictMode 双调用问题 |
| [#29282](https://github.com/google-gemini/gemini-cli/pull/29282) | fix(auth): 登录即持久化 OAuth 凭证 | OPEN | security | 修复 OAuth 登录后凭证未持久化、需重复登录的问题 |
| [#29304](https://github.com/google-gemini/gemini-cli/pull/29304) | fix(cli): 截断文本时不拆分 surrogate pair | OPEN | core | 修复 emoji 等字符被截断时产生未配对代理对的问题 |
| [#29404](https://github.com/google-gemini/gemini-cli/pull/29404) | feat(cli): 新增 `gemini models list --json` 命令 | OPEN | non-interactive | 为外部集成提供模型列表发现能力，替代无法解析的交互式 `/model` 对话框 |

---

## 5. 功能需求趋势

1. **Agent 可靠性与可观测性** — 子 Agent 挂起恢复、轨迹分享（#22598）、Bug Report 补充子 Agent 上下文（#21763）是高优先级需求。
2. **记忆系统（Auto Memory）质量提升** — 多个 issue 聚焦记忆提取的可靠性、脱敏安全与低信号会话处理。
3. **AST 感知代码理解** — #22745 / #22746 探讨基于 AST 的工具链，目标减少 token 浪费并提升代码导航精度。
4. **跨平台与沙箱体验** — Wayland 兼容（#21983）、沙箱信任持久化（#29423）、旧 CPU 检测（#29426）反映多环境适配诉求。
5. **扩展生态与集成** — Git submodule 支持（#26686）、扩展容错（#29387）、VS Code 终端焦点保留（#28183）持续推进扩展系统成熟度。
6. **模型 ID 稳定性** — 多个 issue/PR 围绕 `--model` 显式指定被 rollout 改写的问题，社区对可复现性要求高。

---

## 6. 开发者关注点

- **子 Agent 稳定性** 是最集中痛点：挂起（#21409）、恢复误报（#22323）、未充分利用 skills（#21968）反复出现。
- **Browser Agent 环境兼容**：Wayland 失败（#21983）与 `settings.json` 配置被忽略（#22267）影响 Linux 用户。
- **Auto Memory 安全与效率**：脱敏时机（#26525）、无限重试（#26522）、无效 patch 暴露（#26523）三类问题需系统性修复。
- **认证与持久化体验**：OAuth 凭证未持久化（#29282 修复中）、文件夹信任在沙箱中丢失（#29423 修复中）。
- **模型 ID 意外改写**：用户显式 pin 版本被 rollout 静默替换（#29420/#29422），破坏可复现性。
- **终端与交互质量**： surrogate pair 截断（#29304）、input history 嵌套更新（#29342）等影响 CLI 使用体验的细节问题。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：** 2026-09-21  
**数据来源：** github.com/github/copilot-cli  
**分析师：** AI 开发工具技术分析师

---

## 1. 今日速览

过去24小时（2026-09-20）社区主要围绕 **MCP（Model Context Protocol）集成问题** 进行修复，特别是 Google Workspace OAuth 认证和 Figma 服务器连接的稳定性。同时，**上下文管理** 和 **会话恢复** 相关的 Bug 修复占据了重要位置，显示出社区对长上下文和断点续传功能的强需求。值得注意的是，新版本 1.0.86 已发布，解决了 ARM64 ripgrep 和 /ask 命令在特定模式下的崩溃问题。

---

## 2. 版本发布

**v1.0.86** (2026-09-20 发布)
*   **修复：** 修复了在 Linux 系统上由于 64 KiB 内存页导致的 ARM64 ripgrep 崩溃问题（Issue #4918）。
*   **修复：** 修复了在 Auto 模式下 `/ask` 命令无法正常工作的问题（Issue #4919）。

---

## 3. 社区热点 Issues

以下是过去24小时内评论数最多的 10 个 Issue，反映了当前社区最迫切的需求：

1.  **#4870: MCP Figma 服务器加载失败** (8 👍)
    *   **摘要：** Figma 托管的 MCP 服务器认证成功但工具未注册，CLI 在 `server/discover` 阶段报错 `-32601`。
    *   **重要性：** 影响使用 Figma 进行设计协作的开发者，属于核心 MCP 功能断连。

2.  **#3762: contextTier 配置选项无效** (7 👍)
    *   **摘要：** 尽管配置了长上下文（contextTier）选项，CLI 启动时的 Agent 和子代理并未自动使用该模型，需手动切换。
    *   **重要性：** 影响配置效率，开发者难以自动化管理上下文窗口策略。

3.  **#1675: Checkpoint 恢复永久删除未跟踪文件** (5 👍)
    *   **摘要：** 使用 "restore to checkpoint" 功能时，`git clean -fd` 会永久删除所有未跟踪文件，造成数据丢失风险。
    *   **重要性：** 严重的安全隐患，可能导致代码丢失，建议开发者谨慎使用该功能。

4.  **#4224: 子代理调用缺少计费属性** (5 👍)
    *   **摘要：** 子代理调用的 OpenTelemetry spans 缺少 billing 属性，导致外部成本核算低估实际费用。
    *   **重要性：** 影响企业级使用者的成本控制和预算管理。

5.  **#3874: preToolUse Hook 拒绝机制失效** (4 👍)
    *   **摘要：** 配置了 `preToolUse` Hook 来拒绝所有命令，但该 Hook 似乎并未生效，命令仍被执行。
    *   **重要性：** 安全性配置失效，用户无法有效限制 Agent 的工具调用权限。

6.  **#1886: .github 配置文件不支持** (4 👍)
    *   **摘要：** 用户配置的 `.github/lsp.json` 和 `.github/mcp.json` 文件未被 Copilot CLI 识别。
    *   **重要性：** 配置文件路径或解析逻辑存在缺陷，阻碍了统一配置。

7.  **#2892: MCP stdio 传输在 4 秒后关闭** (4 👍)
    *   **摘要：** 通过 `task` 工具启动子代理时，MCP stdio 传输在 LLM 生成响应前就关闭了。
    *   **重要性：** 子代理功能不稳定，导致复杂任务难以通过多代理协作完成。

8.  **#4606: Google Workspace MCP OAuth 失败** (3 👍)
    *   **摘要：** Google Workspace MCP 端点的授权服务器 URL 存在后缀斜杠不匹配问题，导致原生认证失败。
    *   **重要性：** 阻碍了与 Google 生态系统的集成，需修复认证流程。

9.  **#3589: 多个 Hook 的上下文注入冲突** (3 👍)
    *   **摘要：** 多个 `sessionStart`/`subagentStart` Hook 输出的 `additionalContext` 中，只有最后一个被注入到上下文中。
    *   **重要性：** 多插件/多 Skill 环境下的上下文管理逻辑不完善。

10. **#4910: 非交互式 MCP 调用挂起** (3 👍)
    *   **摘要：** 非交互模式下，Azure MCP 工具在发送进度通知后挂起，直到空闲超时才关闭。
    *   **重要性：** 自动化脚本场景下的稳定性问题。

---

## 4. 重要 PR 进展

过去24小时内暂无活跃的 Pull Requests 更新。建议关注未来的代码合并动态，特别是针对 MCP 服务器连接和上下文管理器的优化。

---

## 5. 功能需求趋势

从 Issues 数据分析，社区关注点主要集中在以下三个方向：

*   **MCP (Model Context Protocol) 生态深度集成**
    *   **现状：** 社区正在大量使用 MCP，但面临认证（Google/Figma）、传输稳定性（stdio/WS）、配置加载等问题。
    *   **趋势：** 社区期待更健壮的 MCP 服务器支持，包括对第三方工具的统一管理和错误处理机制。

*   **长上下文与会话状态管理**
    *   **现状：** `contextTier` 配置失效、Checkpoint 恢复删除文件、会话恢复导致循环等 Bug 频发。
    *   **趋势：** 开发者极度依赖断点续传和复杂上下文管理，希望在长对话和大规模代码库中保持状态一致性。

*   **多 Agent 协作与工具调用安全性**
    *   **现状：** 子代理调用缺少计费数据、Hook 权限控制失效、工具调用超时。
    *   **趋势：** 随着多 Agent 架构的普及，对子代理的成本追踪、权限控制以及通信稳定性提出了更高要求。

---

## 6. 开发者关注点

*   **配置繁琐与体验不一致：** 开发者反馈配置选项（如 contextTier、Hook）往往不生效或需要手动干预，降低了自动化效率。
*   **数据安全性：** `git clean -fd` 在 Checkpoint 恢复中的副作用引发了关于数据丢失的担忧。
*   **跨平台兼容性：** Windows (.bat/.cmd 启动 MCP)、ARM64 Linux (jemalloc 页大小) 等特定环境下的崩溃问题需要针对性修复。
*   **模型选择策略：** 在 Linux 内核开发等复杂任务中，Auto 模式选用的模型（gpt-5.6-sol）能力不足，导致任务失败。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期**: 2026-09-21  
**分析对象**: [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)  
**数据范围**: 过去24小时

---

## 1. 今日速览
过去24小时内，Kimi Code CLI 社区主要聚焦于 **Windows 平台稳定性修复**（如 ASCII 编码崩溃、并发写入权限错误）以及 **OpenCode 协议兼容性优化**。虽然无新版本发布，但社区活跃度保持高位，约 17 个 Issue 得到更新或关闭，主要涉及跨平台兼容性、功能增强请求及新模型集成问题。

---

## 2. 版本发布
**无**：过去24小时内未发布新版本。

---

## 3. 社区热点 Issues（10）

| Issue | 标题 | 作者 | 状态 | 重要性分析 |
|-------|------|------|------|------------|
| [#773](https://github.com/MoonshotAI/kimi-cli/issues/773) | [Windows Bug] 输入任何内容都崩溃：'ascii' codec can't encode characters | resurrection-i | CLOSED | **高**：Windows 用户核心崩溃问题，涉及编码兼容性 |
| [#2655](https://github.com/MoonshotAI/kimi-cli/issues/2655) | [Bug] Client crashes on large prompts: stack overflow in path regex (~900KB input) | asgorskii-dot | OPEN | **高**：输入大小限制导致的严重崩溃，影响用户体验 |
| [#2650](https://github.com/MoonshotAI/kimi-cli/issues/2650) | [Bug] Intermittent subagent launch failure: OAuth token fetch timeout | genhoi | OPEN | **中**：子代理启动不稳定，影响复杂任务流 |
| [#1414](https://github.com/MoonshotAI/kimi-cli/issues/1414) | [enhancement] 弹框询问权限时能否加直接切换成 yolo 模式的选项 | ZDGggg817 | CLOSED | **中**：提升用户操作效率，减少交互中断 |
| [#729](https://github.com/MoonshotAI/kimi-cli/issues/729) | 询问是否执行命令时增加 skip 选项 | gstggsstt | CLOSED | **中**：减少模型命令执行的中断风险 |
| [#1332](https://github.com/MoonshotAI/kimi-cli/issues/1332) | 升级到 v1.17.0 后 Ubuntu 运行报错 | babushkinaa | CLOSED | **中**：特定版本兼容性问题，影响 Linux 用户 |
| [#1487](https://github.com/MoonshotAI/kimi-cli/issues/1487) | HTTPS MCP Header 缺失 User-Agent | Niinja-agencia | CLOSED | **中**：MCP 协议集成问题，影响外部工具兼容 |
| [#1429](https://github.com/MoonshotAI/kimi-cli/issues/1429) | Windows 并发写入导致 Permission denied | zenkitesu | CLOSED | **中**：并发场景下的系统权限问题 |
| [#1321](https://github.com/MoonshotAI/kimi-cli/issues/1321) | 系统内核变量未清洗导致服务失效 | iftaken | CLOSED | **中**：环境变量处理的安全/健壮性问题 |
| [#1289](https://github.com/MoonshotAI/kimi-cli/issues/1289) | HTTP header illegal character due to trailing space in uname version | guozhixin | CLOSED | **中**：系统信息采集导致的网络请求异常 |

---

## 4. 重要 PR 进展（10）

| PR | 标题 | 作者 | 状态 | 内容分析 |
|------|------|------|------|--------|
| [#2656](https://github.com/MoonshotAI/kimi-cli/pull/2656) | fix(llm): send x-opencode-session for OpenCode Go hosts | FOWEPJF255 | OPEN | **关键**：修复 OpenCode Go 代理的 HTTP 400 错误，强制设置会话头，提升与 Moonshot 生态的兼容性 |
| [#2653](https://github.com/MoonshotAI/kimi-cli/issues/2653) | (关联 Issue) | - | - | 为上述 PR 提供背景支持，解决会话头缺失问题 |

> *注：过去24小时仅 1 个 PR 更新，其余 PR 为历史关联。*

---

## 5. 功能需求趋势

1. **跨平台稳定性** (Windows/Linux)  
   - 高频问题集中在编码错误（ASCII）、并发权限冲突及特定发行版（如 Ubuntu 22.04）的兼容性。
   - **趋势**：开发者对 Windows 体验的优化需求强烈，需加强环境检测与错误恢复机制。

2. **交互体验增强**  
   - **跳过执行**（Issue #729）、**Yolo 模式切换**（Issue #1414）等请求显示用户希望减少手动干预。
   - **趋势**：自动化流程的流畅性成为关注点，需优化决策点的用户交互。

3. **协议与集成兼容性**  
   - MCP（Model Context Protocol）的 HTTPS Header 问题（Issue #1487）及 OpenCode 协议适配（PR #2656）。
   - **趋势**：外部工具生态集成能力是核心发展方向。

4. **性能与输入限制**  
   - 900KB 输入导致的堆栈溢出（Issue #2655）。
   - **趋势**：需优化大文本处理能力，避免本地计算瓶颈。

---

## 6. 开发者关注点

- **痛点**：
  1. **Windows 用户环境复杂**：编码、并发、权限问题集中爆发，需针对性修复。
  2. **大输入处理能力不足**：堆栈溢出问题影响复杂场景使用。
  3. **认证稳定性**：OAuth 子代理启动偶发性失败。

- **高频需求**：
  1. **交互自动化**：减少命令执行中断，提升流式操作体验。
  2. **IDE 集成优化**：如模糊路径选择、当前目录显示（Issue #1414、#1475）。
  3. **多任务并发**：支持多任务同时进行（Issue #1482）。

---

**分析师备注**：社区活跃度高，问题多集中在 Windows 平台及大输入场景，建议优先修复跨平台兼容性及输入处理逻辑。功能需求显示用户对自动化和集成体验的重视，可考虑作为下一版本迭代重点。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-09-21  
**数据来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
OpenCode 社区本周活跃度持续，**桌面端 UI 冻结**和**免费额度限制**问题引发大量反馈。社区集中关注 **V2 UI 的布局兼容性**及**Workspace（工作区）功能缺失**的问题。同时，开发者正通过 PR 努力优化核心性能与插件系统，尤其是针对内存泄漏和 MCP 服务器集成的改进。

---

## 2. 版本发布
**无** 新版本发布。

---

## 3. 社区热点 Issues

### 🔴 关键 Bug & 稳定性
1. **[OPEN] Error from provider: Free tier can only be used from within OpenCode** (#49433)
   - **重要性**: 极高，涉及核心免费模型访问权限。
   - **社区反应**: 48 个评论，11 个点赞。用户反馈在官方客户端内也无法使用免费额度，导致无法启动会话。
   - **链接**: [Issue #49433](https://github.com/anomalyco/opencode/issues/49433)

2. **[OPEN] UI freezes after agent turns finish — renderer stuck in ResizeObserver loop** (#43355)
   - **重要性**: 极高，Electron 桌面端崩溃类问题。
   - **社区反应**: 7 个评论。描述了桌面应用在 Agent 执行结束后窗口完全无响应，只能强制重启，严重影响开发体验。
   - **链接**: [Issue #43355](https://github.com/anomalyco/opencode/issues/43355)

3. **[OPEN] Free usage exceeded... waiting timers keep escalating** (#50093)
   - **重要性**: 高，影响用户体验的计费逻辑。
   - **社区反应**: 5 个评论。用户抱怨免费额度重置时间异常延长（从几小时到十几个小时），且切换免费模型无效。
   - **链接**: [Issue #50093](https://github.com/anomalyco/opencode/issues/50093)

### 🎨 UI/UX & 布局
4. **[OPEN] New layout makes the UI unusable** (#48958)
   - **重要性**: 高，新版本破坏性变更。
   - **社区反应**: 13 个点赞。用户认为新 UI 缺失了工作区切换、Git Worktree 等核心功能，导致工作流中断。
   - **链接**: [Issue #48958](https://github.com/anomalyco/opencode/issues/48958)

5. **[OPEN] Web: no way to revert the new layout** (#37546)
   - **重要性**: 中高，Web 端遗留问题。
   - **社区反应**: 26 个点赞。升级后无法切回旧版布局，且新布局未实现工作区支持。
   - **链接**: [Issue #37546](https://github.com/anomalyco/opencode/issues/37546)

### 🔧 配置与性能
6. **[OPEN] Bug: `limit.output` silently capped at 32k** (#29363)
   - **重要性**: 中高，配置溢出问题。
   - **社区反应**: 22 个点赞。用户在配置 DeepSeek 等大模型的高输出限制时，系统静默强制截断至 32k。
   - **链接**: [Issue #29363](https://github.com/anomalyco/opencode/issues/29363)

7. **[OPEN] Session load parses patches... hundreds of MB of JSON per session** (#50089)
   - **重要性**: 中，内存与存储性能。
   - **社区反应**: 1 个评论。在大型仓库中，启用快照追踪会导致单会话 JSON 负载巨大，恢复时内存飙升。
   - **链接**: [Issue #50089](https://github.com/anomalyco/opencode/issues/50089)

### 🌐 生态与插件
8. **[OPEN] V2 UI does not support workspaces** (#39614)
   - **重要性**: 中高，SDK/UI 功能缺失。
   - **社区反应**: 8 个点赞。新版本 UI 缺少工作区管理功能，与旧版 SDK 的 API 不兼容。
   - **链接**: [Issue #39614](https://github.com/anomalyco/opencode/issues/39614)

9. **[OPEN] tui: "Copied to clipboard" does not update local clipboard over SSH and tmux** (#50208)
   - **重要性**: 中，跨终端剪贴板同步。
   - **社区反应**: 1 个评论。在通过 SSH/Tmux 运行 TUI 时，选中复制不会同步到本地终端剪贴板。
   - **链接**: [Issue #50208](https://github.com/anomalyco/opencode/issues/50208)

10. **[OPEN] Big Pickle (Free Stealth Model) Produces Corrupted Output** (#50202)
    - **重要性**: 中，免费模型质量。
    - **社区反应**: 2 个评论。新推出的免费模型存在严重的生成缺陷（循环、乱码）。
    - **链接**: [Issue #50202](https://github.com/anomalyco/opencode/issues/50202)

---

## 4. 重要 PR 进展

1. **[fix] stop repeated auto-compaction that cannot reduce the session** (#50233)
   - **内容**: 修复了 Ollama 等本地模型在未达到上下文限制时，每一步工具调用后都触发自动压缩的问题，优化性能。
   - **链接**: [PR #50233](https://github.com/anomalyco/opencode/pull/50233)

2. **[feat] Idle Curator — a senior foreman for your agent** (#50230)
   - **内容**: 新增示例工具，在用户离开时自动验证代理工作并唤醒沉睡的聊天会话，防止资源浪费。
   - **链接**: [PR #50230](https://github.com/anomalyco/opencode/pull/50230)

3. **[fix] stop republishing summary diffs into durable event snapshots** (#50106)
   - **内容**: 修复了事件快照中摘要差异（summary diffs）的重复存储问题，防止数据库增长失控。
   - **链接**: [PR #50106](https://github.com/anomalyco/opencode/pull/50106)

4. **[feat] add MCP server setup and connection testing** (#43719)
   - **内容**: 桌面端新增 MCP 服务器管理页面，允许用户在图形界面中配置和测试 MCP 连接，无需手动编辑配置。
   - **链接**: [PR #43719](https://github.com/anomalyco/opencode/pull/43719)

5. **[fix] rename dir-new-sesssion LayoutRoute tag** (#50224)
   - **内容**: 修复拼写错误，将 `dir-new-sesssion` 重命名为 `dir-new-session`，确保路由逻辑正确。
   - **链接**: [PR #50224](https://github.com/anomalyco/opencode/pull/50224)

6. **[perf] cut --version startup from ~1.5s to ~0.13s** (#50219)
   - **内容**: 实现命令懒加载，大幅减少 `--version` 等基础命令的启动时间，优化 CLI 体验。
   - **链接**: [PR #50219](https://github.com/anomalyco/opencode/pull/50219)

7. **[fix] drop unsupported max reasoning effort** (#49995)
   - **内容**: 移除不再支持的 `max reasoning effort` 参数，修复与特定模型提供商的兼容性问题。
   - **链接**: [PR #49995](https://github.com/anomalyco/opencode/pull/49995)

8. **[fix] surface real file-handler errors instead of masking** (#50207)
   - **内容**: 修复桌面端附件上传时显示通用错误 Toast 的问题，现在会显示真实的文件大小限制等错误信息。
   - **链接**: [PR #50207](https://github.com/anomalyco/opencode/pull/50207)

9. **[fix] load legacy plugin functions next to a non-plugin default export** (#50218)
   - **内容**: 修复插件加载器在遇到同时包含命名导出和默认导出的文件时无法加载旧版函数的 Bug。
   - **链接**: [PR #50218](https://github.com/anomalyco/opencode/pull/50218)

10. **[feat] local LAN provider discovery + auto-discover models** (#27554)
    - **内容**: 增加局域网（LAN）内的 OpenAI 兼容服务器发现功能，支持自动扫描本地可用模型。
    - **链接**: [PR #27554](https://github.com/anomalyco/opencode/pull/27554)

---

## 5. 功能需求趋势
基于 50 条 Issues 分析，社区当前关注点主要集中在：
- **IDE/Workspace 集成**: 高频反馈 **Workspace（工作区）** 和 **Git Worktree** 功能的缺失，这是开发者多项目协作的核心需求。
- **UI 交互优化**: 新 UI 的可访问性和布局灵活性受到广泛诟病，急需回滚选项或改进。
- **性能与内存**: 大型仓库会话的 JSON 负载和桌面端渲染卡顿是性能瓶颈。
- **MCP 生态**: 社区希望桌面端能提供更完善的 MCP 服务器配置界面。

---

## 6. 开发者关注点
1. **稳定性**: 桌面端 UI 冻结和免费额度逻辑错误严重干扰开发流程。
2. **配置灵活性**: 输出 Token 限制被硬编码，无法满足长上下文模型需求。
3. **历史兼容**: V1 到 V2 升级导致部分会话（如非 Git 目录下的会话）不可见。
4. **跨平台体验**: SSH/Tmux 环境下的剪贴板和终端交互存在 Bug。

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-09-21  
**来源**: GitHub Repository [earendil-works/pi](https://github.com/earendil-works/pi)

---

## 1. 今日速览
Pi 项目在今日迎来了 **v0.86.1** 版本更新，核心亮点是引入了 **Meta Muse provider**（通过 OAuth 或 API Key 登录），并针对长会话场景优化了缓存预热机制。社区讨论集中在 Windows 平台体验（TUI 卡顿、IME 输入问题）以及工具调用解析性能优化上。

---

## 2. 版本发布
### v0.86.1 (过去24小时发布)
*   **Meta Muse Provider**：新增 Meta 登录方式，支持使用 `/login meta` 或 `META_API_KEY` 访问 Muse Spark 模型。
*   **Prompt Cache Warming**：优化了缓存预热策略，在长工具运行期间或空闲时保持缓存活跃，减少冷启动开销。

---

## 3. 社区热点 Issues

1.  **[Windows] 如何在 Windows 上使用 Pi？(66 Comments)** [Link](https://github.com/earendil-works/pi/issues/7547)
    *   **重要性**: 核心平台体验问题，Windows 用户基数大，但生态支持碎片化。
    *   **反应**: 讨论热烈，涉及 GUI、TUI、Docker 等多种运行方式，社区正集中精力梳理最佳实践。

2.  **[TUI] 流式传输时 TUI 占用 100% 单核 (13 Comments)** [Link](https://github.com/earendil-works/pi/issues/6665)
    *   **重要性**: 严重影响长会话体验，渲染性能瓶颈。
    *   **反应**: 已定位到 `Intl.Segmenter` 和 Markdown 重建导致的性能问题，建议进行增量渲染优化。

3.  **[Bug] SessionManager 为同步阻塞导致异步数据库持久化受阻 (7 Comments)** [Link](https://github.com/earendil-works/pi/issues/2616)
    *   **重要性**: 架构层面的阻塞问题，可能影响数据持久化性能。
    *   **反应**: 开发者指出所有 `SessionManager` 方法均使用阻塞 I/O，限制了系统的扩展性。

4.  **[Bug] pi-ai 向兼容提供商发送了 OpenAI 特定字段 (5 Comments)** [Link](https://github.com/earendil-works/pi/issues/9508)
    *   **重要性**: 兼容性破坏，导致部分提供商返回 400 错误。
    *   **反应**: 需要调整 API 请求构建逻辑，以支持更多 OpenAI 兼容的接口。

5.  **[Bug] Windows CJK 输入法卡顿与候选窗口不显示 (3 Comments)** [Link](https://github.com/earendil-works/pi/issues/9497)
    *   **重要性**: 中日韩用户的核心痛点，输入体验极差。
    *   **反应**: 提到启用 `showHardwareCursor` 可修复，但根本解决需优化 IME 交互逻辑。

6.  **[Bug] find/grep 工具缺乏超时机制 (3 Comments)** [Link](https://github.com/earendil-works/pi/issues/9770)
    *   **重要性**: 安全与稳定性隐患，被杀进程时可能返回空结果。
    *   **反应**: 建议为工具添加类似 Bash 的超时控制。

7.  **[Bug] TUI 全屏模式下图片渲染错误 (5 Comments)** [Link](https://github.com/earendil-works/pi/issues/9169)
    *   **重要性**: 特定环境（WezTerm）下的显示 Bug。
    *   **反应**: 已确认问题，需针对特定终端构建版本进行修复。

8.  **[Bug] 0.86.0 版本导入错误 (4 Comments)** [Link](https://github.com/earendil-works/pi/issues/9794)
    *   **重要性**: 版本升级阻碍。
    *   **反应**: 模块路径找不到，可能是构建产物与代码不一致。

9.  **[Feature] 终端硬件光标作为编辑器光标的选项 (3 Comments)** [Link](https://github.com/earendil-works/pi/issues/9748)
    *   **重要性**: 视觉体验优化，减少视觉干扰。
    *   **反应**: 提议增加 "Hardware Cursor Only" 模式。

10. **[Feature] Skills 过滤器支持 Glob 模式 (2 Comments)** [Link](https://github.com/earendil-works/pi/issues/9808)
    *   **重要性**: 配置灵活性提升。
    *   **反应**: 当前 `-` 前缀仅支持精确匹配，社区希望支持通配符排除。

---

## 4. 重要 PR 进展

1.  **[Closed] feat(ai): add Meta provider with Muse subscription OAuth** [Link](https://github.com/earendil-works/pi/pull/9096)
    *   **内容**: 实现了 v0.86.1 中的 Meta Muse 登录功能，处理了刷新令牌机制和流式输出的特殊逻辑。

2.  **[Closed] feat(coding-agent): deliver prompt and tool changes as system message deltas** [Link](https://github.com/earendil-works/pi/pull/9117)
    *   **内容**: 优化提示词传递机制，将工具变更作为系统消息增量发送，减少全量重写。

3.  **[Closed] fix(coding-agent): handle bash output temp file WriteStream errors** [Link](https://github.com/earendil-works/pi/pull/9800)
    *   **内容**: 修复 Bash 输出超过截断阈值时临时文件写入错误的异常处理。

4.  **[Closed] fix(agent): terminate agentLoop streams on unrecoverable loop failure** [Link](https://github.com/earendil-works/pi/pull/9799)
    *   **内容**: 增强 agent 循环的错误恢复能力，防止流式传输在不可恢复错误时挂起。

5.  **[Closed] fix(ai): exclude Cerebras from supportsStrictMode** [Link](https://github.com/earendil-works/pi/pull/9804)
    *   **内容**: 修复 Cerebras 模型在严格模式下与扩展工具混合调用时的 400 错误。

6.  **[Closed] fix(tui): detect Orca terminals as Kitty-image capable** [Link](https://github.com/earendil-works/pi/pull/9329)
    *   **内容**: 增加对 Orca 终端的支持，使其能够正确渲染 Kitty 风格的内联图片。

7.  **[Closed] fix(tui): rank skill autocomplete by bare name** [Link](https://github.com/earendil-works/pi/pull/9120)
    *   **内容**: 修复技能自动补全的排序逻辑，提高命令识别的准确性。

8.  **[Closed] fix(coding-agent): ignore stale tool image conversions** [Link](https://github.com/earendil-works/pi/pull/8743)
    *   **内容**: 优化 Kitty 图片转换缓存，忽略过时或冲突的转换结果。

9.  **[Closed] feat(ai,coding-agent): add mid-conversation system messages** [Link](https://github.com/earendil-works/pi/pull/9116)
    *   **内容**: 支持会话中间插入系统消息，为动态工具加载提供支持。

10. **[Closed] fix(coding-agent): ignore stale tool image conversions** [Link](https://github.com/earendil-works/pi/pull/8743)
    *   **内容**: 修复 Bash 工具在输出截断时的文件写入错误。

---

## 5. 功能需求趋势

*   **跨平台稳定性 (Windows 优先)**: 社区对 Windows 的支持力度空前，不仅关注基础运行，还深入到 IME 输入法、TUI 渲染、剪贴板等细节体验。
*   **性能优化**: 针对 TUI 渲染（Markdown 重建、Intl 分段）、工具调用解析（O(N²) 复杂度）以及会话管理（同步阻塞）的优化呼声很高。
*   **兼容性扩展**: 社区尝试接入更多模型提供商（如 Cerebras, Meta Muse, Z.AI），并修复 OpenAI 兼容层的问题。
*   **配置灵活性**: Skills 过滤器、图片缩放限制、终端光标样式等功能的可配置性需求增加。

---

## 6. 开发者关注点

*   **架构阻塞**: `SessionManager` 的同步 I/O 阻塞是阻碍系统进一步扩展的关键瓶颈。
*   **错误处理**: 多个 Issue 指出工具（find/grep）、流式传输、Bash 输出在异常情况下缺乏健壮的错误恢复机制。
*   **调试体验**: 版本升级（0.86.0）带来的导入错误和 RPC steer 匹配问题，增加了用户排查难度。
*   **文档与标准**: 社区呼吁对 Skills 过滤器的语法、Bash 超时参数等进行明确文档化，减少误用。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

**DeepSeek TUI 社区动态日报 – 2026‑09‑21**  

---

## 1️⃣ 今日速览  
- 0.10.0 release readiness 正式进入 **绿色 CI** 阶段，核心功能（runtime‑api、插件信任、SIGPIPE‑safe 启动等）已基本完成。  
- 多条关键 **bug**（Engine 冻结、分支保存丢失、headless exec 卡死）在社区中持续发酵，已形成针对性的 PR 修复。  
- 依赖升级（jsonschema、clap、rust‑i18n‑support 等）同步进行，确保编译与安全基线保持最新。

---

## 2️⃣ 版本发布  
> **暂无新发布**。当前主线正为 0.10.0 预发布做 “green‑CI + release‑blocker” 检查，预计在本周内完成正式发布。

---

## 3️⃣ 社区热点 Issues（挑选 10 条）  

| # | 标题 / 关键点 | 类型 / 影响范围 | 社区热度（评论/👍） | 为何值得关注 | 链接 |
|---|--------------|----------------|-------------------|-------------|------|
| **6310** | ACP follow‑up：empty terminal responses & Full Access discovery | **bug / 安全** | 8 评论 / 0 👍 | 牵涉到 ACP 配置的根本错误，直接影响终端交互可靠性和权限泄露风险。 | https://github.com/Hmbown/Codewhale/issues/6310 |
| **6184** | Engine silently freezes mid‑run | **bug / 稳定性** | 7 评论 / 0 👍 | 长时运行时模型输出突然停止，导致用户交互卡死，是阻塞生产环境的关键缺陷。 | https://github.com/Hmbown/Codewhale/issues/6184 |
| **5856** | Computer‑use plugin：live‑install receipt + first look‑act loop | **enhancement / 发布阻断** | 5 评论 / 0 👍 | 该插件是 0.10.0 的核心功能之一，仍缺少“内置发现‑信任‑启用”流程，阻止正式发布。 | https://github.com/Hmbown/Codewhale/issues/5856 |
| **6094** | v0.10.0 — redesign, release checks, and how to help | **question / 规划** | 7 评论 / 1 👍 | 为 0.10.0 重构提供整体路线图，聚合社区贡献入口，决定后续开发重点。 | https://github.com/Hmbown/Codewhale/issues/6094 |
| **6362** | configured_model_api_tests overflow → SIGABRT | **bug / CI** | 2 评论 / 0 👍 | 测试栈溢出导致 CI 全局失效，直接影响所有 PR 合并的门槛。 | https://github.com/Hmbown/Codewhale/issues/6362 |
| **6236** | bug(exec)：request_user_input 在 headless 模式下永不返回 | **bug / 自动化** | 2 评论 / 0 👍 | 自动化脚本或 CI 运行时会无限阻塞，严重破坏无交互执行流。 | https://github.com/Hmbown/Codewhale/issues/6236 |
| **6228** | bug(tui)：复制部分选择却粘贴整块单元格 | **bug / UX** | 2 评论 / 0 👍 | 复制行为不符合预期，影响日常编辑体验，已在 0.9.13 中被标记为回归。 | https://github.com/Hmbown/Codewhale/issues/6228 |
| **5847** | Replace XOR collapse logic with intent‑based expand/collapse | **enhancement / 代码质量** | 1 评论 / 0 👍 | 复杂的三重 XOR 逻辑导致 UI 折叠行为难以预测，改写后更易维护。 | https://github.com/Hmbown/Codewhale/issues/5847 |
| **6155** | Pet: qualify /pet habitat in real terminal & shared owner | **enhancement / 跨平台** | 2 评论 / 0 👍 | 让 `/pet` 能在真实终端运行并与桌面版共享所有者，是提升 TUI 与桌面统一感的重要一步。 | https://github.com/Hmbown/Codewhale/issues/6155 |
| **5836** | Cloud dispatch：retire legacy launcher & qualify current Computer contract | **enhancement / 云端** | 0 评论 / 0 👍 | 清理旧的 LiveDaytonaLauncher，确保云端调度与最新 Computer 插件保持一致。 | https://github.com/Hmbown/Codewhale/issues/5836 |

> **挑选原则**：聚焦 **阻塞发布**、**核心功能缺失**、**严重稳定性/安全性** 以及 **社区高度关注** 的议题。

---

## 4️⃣ 重要 PR 进展（挑选 10 条）

| # | PR 标题 / 核心内容 | 影响范围 | 当前状态 | 关键价值 | 链接 |
|---|-------------------|----------|----------|----------|------|
| **6370** | 0.10.0 release readiness：green CI、#6362 stack fixes、water cadence、Extensions trust review、SIGPIPE‑safe MCP startup | 发行版准备 | **Open**（CI 已全绿） | 标志 0.10.0 已进入发布候选阶段，解决多项阻断问题。 | https://github.com/Hmbown/Codewhale/pull/6370 |
| **6361** | feat(runtime‑api)：terminal byte stream、stream resume + idempotent submit、pet agent‑count pin | Runtime API | **Open** | 为 TUI 提供可靠的全双工终端流，支持恢复与幂等提交，提升交互性能。 | https://github.com/Hmbown/Codewhale/pull/6361 |
| **6333** | Safety hardening：unsafe docs、async I/O、recursion & read budgets | 安全/代码质量 | **Closed** | 统一为所有 `unsafe` 块添加 SAFETY 合约，迁移阻塞 I/O 到 `tokio::fs`，防止递归爆栈。 | https://github.com/Hmbown/Codewhale/pull/6333 |
| **6369** | fix(session)：synchronize engine after foreign session import | Session 管理 | **Closed** | 解决 `/resume` 与 JSON 导入后，engine 仍停留旧会话的问题，保证跨会话一致性。 | https://github.com/Hmbown/Codewhale/pull/6369 |
| **6365** | fix(tui)：painted‑column transcript copy & composer tabs, setup ink test | TUI 交互 | **Closed** | 改进复制行为、标签页渲染以及 ink‑test 基础设施，提升编辑体验。 | https://github.com/Hmbown/Codewhale/pull/6365 |
| **6363** | fix(tui,exec)：visual‑row cursor、history detach、explicit ink、headless input withhold | TUI/Exec | **Closed** | 多项细粒度 UI/执行修复，解决光标显示、历史分离以及 headless 模式下的输入阻塞。 | https://github.com/Hmbown/Codewhale/pull/6363 |
| **6345** | chore(deps)：bump jsonschema from 0.52.1 → 0.56.0 | 依赖升级 | **Open** | 引入最新的 JSON Schema 验证库，提升安全性与兼容性。 | https://github.com/Hmbown/Codewhale/pull/6345 |
| **6342** | chore(deps)：bump clap_complete 4.6.9 → 4.6.11 | 依赖升级 | **Open** | 更新 CLI 自动补全库，解决 macOS/Windows 自动补全兼容性问题。 | https://github.com/Hmbown/Codewhale/pull/6342 |
| **6339** | chore(deps)：bump rust‑i18n‑support 4.2.1 → 4.2.2 | 国际化 | **Open** | 引入最新 i18n 支持，确保多语言文档翻译同步。 | https://github.com/Hmbown/Codewhale/pull/6339 |
| **6343** | chore(deps)：bump clap 4.6.6 → 4.6.7 | 依赖升级 | **Open** | 小幅升级 CLI 解析库，获取 bug 修复与轻量特性。 | https://github.com/Hmbown/Codewhale/pull/6343 |

> **挑选原则**：覆盖 **发行准备、核心功能实现、关键缺陷修复、代码安全与依赖升级** 四大维度。

---

## 5️⃣ 功能需求趋势  

从全部 21 条 Issue（包括已关闭）提炼，社区最关注的方向如下：

| 趋势 | 关键需求 | 代表 Issue |
|------|----------|------------|
| **IDE/桌面统一** | 将 TUI 与 Codewhale Studio（VS Code fork）深度集成，跨平台共享状态（/pet、插件信任等） | #5838、#6155、#6139 |
| **发布阻断 & 稳定性** | 解决 Engine 冻结、分支保存、headless exec 卡死等关键 bug，确保 0.10.0 可以正式发布 | #6184、#6236、#6362、#6367 |
| **插件与云端执行** | 完善 Computer‑use 插件的安装、信任链路；统一云端调度（LiveDaytonaLauncher） | #5856、#5836、#5848 |
| **性能与终端交互** | 引入完整的 byte‑stream 终端协议、支持流恢复、降低 SIGPIPE 影响 | #6361、#6370 |
| **可维护性 & 安全** | 代码安全硬化、依赖升级、折叠逻辑重构、测试覆盖强化 | #6333、#5847、#6345 及相关 PR |
| **多模型 & 新模型支持** | 兼容 ZAI GLM‑5.3‑Flash 等新模型的姿态（Ask / workspace‑write） | #6184（提到模型） |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）  

1. **Engine 冻结与卡死** – 多位用户报告在长时间、工具密集的会话中模型输出中断，导致会话卡死，已成为发布阻断的最高优先级。  
2. **分支/会话持久化不完整** – `/branch` 与 session 导入后历史被错误丢弃，影响协作与回溯调试。  
3. **插件信任与安装流程** – Computer‑use 插件仍需手动 “live‑install receipt”，缺少统一的信任审查机制。  
4. **Headless 执行交互缺失** – `request_user_input` 在无交互模式下永不返回，破坏 CI/自动化脚本。  
5. **UI 细节与复制行为** – 复制选区只复制整块单元格、折叠逻辑三重 XOR 等导致编辑体验不佳。  
6. **依赖与安全升级** – 项目依赖频繁出现安全/兼容性更新，开发者希望统一的依赖升级流水线（Dependabot 已在使用）。  

> **建议**：在 0.10.0 正式发布前，优先完成 **Engine 稳定性** 与 **插件信任链** 两大块的阻断修复；随后集中资源完善 **IDE/桌面统一** 与 **终端 byte‑stream**，为后续生态扩展奠定基础。  

--- 

*本日报基于公开的 GitHub 数据撰写，供 DeepSeek TUI 开发者与社区成员参考。*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*