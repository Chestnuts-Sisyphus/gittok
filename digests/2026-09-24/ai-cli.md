# AI CLI 工具社区动态日报 2026-09-24

> 生成时间: 2026-09-23 22:33 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告**  
（截至 2026‑09‑24，基于官方仓库 anthropics/skills 的 Pull Requests 与 Issues）

---

## 1️⃣ 热门 Skills 排行（评论/关注度最高 5‑8 条 PR）

| 排名 | PR 编号 & 链接 | Skill 名称 | 功能概述 | 社区讨论热点 | 当前状态 |
|------|----------------|------------|----------|--------------|----------|
| 1 | **#1771** – <https://github.com/anthropics/skills/pull/1771> | **proofcore‑contract‑auditor** | 静态审计 Solidity / Rust 合约，生成零存储 Merkle 证明并锚定至 TON 公链。 | ① Web3 开发者对安全审计需求强烈 ② 零知识证明的可验证性讨论 ③ 对链上审计成本的担忧 | **Open** |
| 2 | **#1703** – <https://github.com/anthropics/skills/pull/1703> | **md2video‑audio** | 将 Markdown 文档直接渲染为带人声解说的 MP4 视频（基于 Marp + TTS），零额外费用。 | ① 内容创作自动化 ② 生成质量（字幕同步、音色） ③ 对大模型生成多媒体的期待 | **Open** |
| 3 | **#525** – <https://github.com/anthropics/skills/pull/525> | **pyxel** | 在 Python 中创建、调试、验证 8‑bit 复古游戏；支持无 UI‑headless 运行、帧检查、输入脚本化。 | ① 教育/游戏黑客社区的兴趣 ② “游戏即代码”工作流的可行性 ③ 对帧级断言的实现细节讨论 | **Open** |
| 4 | **#514** – <https://github.com/anthropics/skills/pull/514> | **document‑typography** | 检测并修复 AI 生成文档的常见排版问题（孤行、寡行、编号错位）。 | ① 文档可读性提升需求 ② 与现有 `pdf`、`docx` Skill 的兼容性 ③ 是否应作为默认后处理步骤 | **Open** |
| 5 | **#723** – <https://github.com/anthropics/skills/pull/723> | **testing‑patterns** | 完整测试栈指南：单元、集成、E2E、React、性能、安全等模式与最佳实践。 | ① 自动化测试生成的需求激增 ② 与 `awt`（AI Watch Tester）配合的潜在价值 ③ 规范化测试描述语言的争论 | **Open** |
| 6 | **#822** – <https://github.com/anthropics/skills/pull/822> | **awt (AI Watch Tester)** | 将 Claude 视听能力与浏览器控制结合，实现零代码 UI/E2E 测试生成。 | ① 前端/QA 团队的强烈关注 ② 对安全沙箱的审查 ③ 与 CI/CD 集成的实现路径 | **Open** |
| 7 | **#1776** – <https://github.com/anthropics/skills/pull/1776> | **blast‑radius** | 在批量写入/删除前提供 “风险清单”，确保业务层面安全审查。 | ① 大规模数据操作的安全防护 ② 与 `skill‑quality‑analyzer` 的互补性 ③ 是否应成为必装 Skill | **Open** |
| 8 | **#83** – <https://github.com/anthropics/skills/pull/83> | **skill‑quality‑analyzer** / **skill‑security‑analyzer** | 元 Skill：对任意 Skill 进行质量（结构、示例、文档）与安全（权限、依赖）评估并产出报告。 | ① “Skill 质量门槛”议题升温 ② 自动化审计在社区插件市场的定位 ③ 评分模型的透明度 | **Open** |

> **为什么这些 PR 受关注？**  
> - 大多数围绕 **安全审计、自动化内容生成、测试与质量保障**，与企业级使用场景高度契合。  
> - 多数 PR 已在社区 Issue 中被引用（例如 #492‑安全命名空间、#228‑组织共享），形成交叉讨论。

---

## 2️⃣ 社区需求趋势（从 Issues 中提炼的热点方向）

| 方向 | 代表 Issue（链接） | 关键诉求 |
|------|-------------------|----------|
| **Skill 安全与信任** | #492 (安全：`anthropic/` 命名空间冒充) – <https://github.com/anthropics/skills/issues/492> | 防止社区 Skill 冒充官方；需要命名空间隔离或签名机制。 |
| **组织内部共享** | #228 (全组织 Skill 共享) – <https://github.com/anthropics/skills/issues/228> | 一键共享/库化 Skill，省去手动上传下载流程。 |
| **触发率与评估框架** | #556 (run_eval trigger 0%) – <https://github.com/anthropics/skills/issues/556> | 改进 `run_eval.py` 的触发检测、提升评估可靠性。 |
| **内存/状态压缩** | #1329 (compact‑memory) – <https://github.com/anthropics/skills/issues/1329> | 为长期运行的 Agent 提供紧凑的记忆表示（符号化/压缩）。 |
| **批量操作安全** | #1776 (blast‑radius) – <https://github.com/anthropics/skills/issues/1776> | 在大规模写入前提供风险检查清单，防止误删/误发。 |
| **文档/排版质量** | #514 (document‑typography) – (已在 PR 中) | 自动检测排版错误，提升 AI 生成文档的可读性。 |
| **跨平台运行** | #1792 (docx LibreOffice timeout) – <https://github.com/anthropics/skills/issues/1792> | 增强本地工具（LibreOffice、soffice）在 CI/容器中的鲁棒性。 |
| **Skill Marketplace 元评估** | #83 (skill‑quality‑analyzer) – (已在 PR 中) | 为 Skill 本身提供质量/安全评分，帮助用户挑选可靠插件。 |

**总体趋势**：*安全、可审计、组织协作以及对大规模/多媒体工作流的自动化支持* 是社区当前最迫切的需求。

---

## 3️⃣ 高潜力待合并 Skills（评论活跃、需求匹配度高）

| PR 编号 & 链接 | Skill | 关键亮点 | 预估合并时间窗口 |
|----------------|-------|----------|-------------------|
| #1771 – <https://github.com/anthropics/skills/pull/1771> | proofcore‑contract‑auditor | 直接满足 Web3 合约安全审计需求；与 Issue #492 的安全讨论形成呼应。 | **近 1‑2 周**（已有社区安全审计需求，审查进度较快） |
| #1703 – <https://github.com/anthropics/skills/pull/1703> | md2video‑audio | 内容创作自动化热点，已在多个营销/教育团队内部试用。 | **1‑3 周**（依赖外部 TTS/Marp 兼容性） |
| #723 – <https://github.com/anthropics/skills/pull/723> | testing‑patterns | 与 #822（AWT）形成生态链，回应 #556 对测试评估的痛点。 | **2‑4 周**（需与官方测试框架对齐） |
| #1776 – <https://github.com/anthropics/skills/pull/1776> | blast‑radius | 直接对应 Issue #1776，已获多位安全工程师点赞。 | **1‑2 周** |
| #514 – <https://github.com/anthropics/skills/pull/514> | document‑typography | 文档排版质量是多数企业用户的共性需求，已在内部评审中通过。 | **本月内** |
| #83 – <https://github.com/anthropics/skills/pull/83> | skill‑quality‑analyzer / skill‑security‑analyzer | 为整个 Skill 生态提供“质量门”，与 Issue #492、#228 的治理需求高度契合。 | **2‑3 周** |

> **合并潜力判断标准**：① Issue 中已有明确需求；② PR 内容与当前安全/自动化趋势吻合；③ 社区评论（>10 条）活跃，且多数为正向反馈。

---

## 4️⃣ Skills 生态洞察（一句话总结）

> **当前社区最集中诉求是：在保证安全与可审计的前提下，提供面向企业级工作流（代码审计、批量操作、文档/多媒体自动化、测试生成）的高质量、易共享的 Skill 组合。**

--- 

*本报告基于公开 PR/Issue 数据编制，仅供内部参考。*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



# OpenAI Codex 社区动态日报
**日期：2026-09-24**

---

## 1. 今日速览

今日 Codex CLI 发布 **v0.156.1** 热修复版本，正式支持 GPT-6 Sol 和 GPT-6 Luna 模型选择，并更新速率限制提示策略。社区 Issue 中 **Windows 平台稳定性问题** 持续高发，包括发送按钮灰显、沙盒初始化失败等；**上下文压缩丢失对话历史** 的严重 Bug 引发广泛关注。

---

## 2. 版本发布

### rust-v0.156.1（热修复）
- **新增**：模型选择器新增 GPT-6 Sol 和 GPT-6 Luna 选项
- **更新**：速率限制切换提示现在优先推荐 GPT-6 Luna
- **修复**：0.156.0 版本回归问题
- 全量变更记录：https://github.com/openai/codex/compare/rust-v0.156.0...rust-v0.156.1

### Alpha 版本活跃迭代
- `rust-v0.158.0-alpha.2` 至 `alpha.5` 连续发布
- `rust-v0.157.0-alpha.11`
- `rust-v0.155.0-alpha.16.3` / `.16.4`

---

## 3. 社区热点 Issues

| # | 标题 | 关注点 | 评论/点赞 | 链接 |
|---|------|--------|-----------|------|
| #20851 | **CLI 首支持 Computer Use** | 社区长期诉求，Computer Use 目前仅为 Desktop 插件，用户希望 CLI 原生支持 | 17👍 / 39👍 | https://github.com/openai/codex/issues/20851 |
| #45626 | **Windows 发送按钮灰显** | Windows Desktop 多轮对话中断，已影响多个用户，CLI 不受影响 | 30💬 / 5👍 | https://github.com/openai/codex/issues/45626 |
| #25792 | **上下文压缩丢失 AGENTS 规则** | 严重可靠性问题：任务进度从 97% 回退到 42%，上下文自动压缩导致指令丢失 | 18💬 / 2👍 | https://github.com/openai/codex/issues/25792 |
| #44342 | **Windows 现有会话加载阻塞** | `loading-local-config` 导致会话无限卡住，重启可恢复但问题会复发 | 18💬 / 6👍 | https://github.com/openai/codex/issues/44342 |
| #15643 | **Remote MCP scopes_supported 提取** | Enterprise 用户反馈 MCP 远程认证问题，需从 protected resource metadata 提取 scopes | 11💬 / 17👍 | https://github.com/openai/codex/issues/15643 |
| #41849 | **Remote-SSH 会话残留** | 服务端断开后旧 app-server 残留，导致新会话被阻止（"This is open in another app"） | 12💬 / 13👍 | https://github.com/openai/codex/issues/41849 |
| #46388 | **CLI 0.155.0 沙盒初始化回归** | Windows 上从 0.154.0 升级到 0.155.0 后提升权限沙盒初始化失败 | 12💬 / 3👍 | https://github.com/openai/codex/issues/46388 |
| #44363 | **上下文压缩重写导致对话历史永久丢失** | 压缩操作原地修改 rollout 文件，对话记录被不可恢复地破坏 | 10💬 / 0👍 | https://github.com/openai/codex/issues/44363 |
| #15368 | **VS Code 扩展会话数上限** | Pro 用户请求增加 VS Code 扩展中的会话容量限制 | 18💬 / 6👍 | https://github.com/openai/codex/issues/15368 |
| #47511 | **Git commit/push 按钮缺失** | Desktop 26.917.51856 回归：git 操作按钮从 UI 中消失 | 3💬 / 11👍 | https://github.com/openai/codex/issues/47511 |

---

## 4. 重要 PR 进展

| # | 标题 | 内容摘要 | 链接 |
|---|------|----------|------|
| #47683 | Executor Capability Discovery V2 | 定义能力发现 V2 请求/库存类型，服务器启动时预热插件和技能位置 | https://github.com/openai/codex/pull/47683 |
| #47677 | MCP 资源工具模型目录覆盖 | 允许模型目录为 `list_mcp_resources` 等工具提供模型特定的描述和参数 | https://github.com/openai/codex/pull/47677 |
| #47678 | Mermaid 流程图引号与和号支持 | 修复含 `&` 和引号的标签回退到源码显示的问题 | https://github.com/openai/codex/pull/47678 |
| #47673 | 澄清 Windows 沙盒设置错误 | 区分所有者不匹配、Codex home 不匹配、卸载进行中等多种错误场景 | https://github.com/openai/codex/pull/47673 |
| #47672 | 修复 Windows 10 无重解析目录打开 | 使用 `QueryDosDeviceW` 解析驱动器字母别名，解决 Windows 10 拒绝 Object Manager 链接的问题 | https://github.com/openai/codex/pull/47672 |
| #47670 | Agent 消息板工具模型特定描述 | 通道工具描述跟随激活模型变化，包括单轮内的模型切换 | https://github.com/openai/codex/pull/47670 |
| #47663 | 路由感知传输中的网络策略保留 | 修复默认传输回退绕过应用网络策略的问题 | https://github.com/openai/codex/pull/47663 |
| #47657 | Bedrock GovCloud 模型目录限制 | 为 Mantle 端点使用专用默认目录，仅包含 GPT-5.6 Terra/Luna 和 GPT-5.4 | https://github.com/openai/codex/pull/47657 |
| #47654 | Linux 描述符清理 Fork 安全 | 标记无关描述符为 close-on-exec，确保子进程分配免费清理 | https://github.com/openai/codex/pull/47654 |
| #47641 | 遵循 Retry-After 并保留重试期限 | 解析服务器返回的 `Retry-After` 延迟，修正相对重试延迟计算 | https://github.com/openai/codex/pull/47641 |

---

## 5. 功能需求趋势

1. **CLI Computer Use 原生支持** — Issue #20851 获 39 赞，社区强烈希望 CLI 层面首次-class 支持 Computer Use，而非仅作为 Desktop 插件
2. **Windows 平台稳定性** — 约 **40%** 的热点 Issue 聚焦 Windows，涉及沙盒、UI 交互、路径处理等多维度问题
3. **上下文管理可靠性** — 上下文压缩导致历史丢失和规则遗忘（#25792、#44363）是长期痛点，亟需健壮性改进
4. **远程/SSH 工作流支持** — Remote-SSH 会话残留（#41849）、headless SSH 任务工具丢失（#42973）反映远程开发场景需求强烈
5. **MCP 工具链完善** — Remote MCP 认证（#15643）、模型特定描述覆盖（PR #47677）表明 MCP 集成正在快速演进

---

## 6. 开发者关注点

| 痛点类别 | 高频反馈 |
|----------|----------|
| **Windows 发送按钮灰显** | 多版本复现（#45626、#47650、#47682），用户完成一轮对话后无法继续，CLI 不受影响但 Desktop 用户受阻 |
| **上下文压缩破坏性** | 压缩操作原地修改导致对话 transcript 永久丢失（#44363），以及 AGENTS 规则被遗忘（#25792） |
| **沙盒初始化回归** | 0.155.0 引入 Windows 沙盒设置失败（#46388）、WSL UNC 路径不支持（#35380）、更新后卡住（#47555） |
| **VS Code 远程会话残留** | Remote-SSH 重连后旧 app-server 进程未清理，阻塞新会话（#41849） |
| **API Key 认证功能缺失** | API Key 模式下语音转写不可用（#20668）、fast mode 不可用（#27940） |
| **速率限制与配额** | GPT-5.6 Luna xhigh 模式单日耗尽整周配额（#45733），用户反映异常消耗 |
| **UI 回归** | Git 操作按钮消失（#47511）、附加图片预览丢失（#38858）、克罗地亚语音转写字符集错误（#45710） |

---

*数据来源：github.com/openai/codex | 统计时段：2026-09-23 00:00 – 2026-09-24 00:00 UTC*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报 | 2026-09-24

## 1. 今日速览

Gemini CLI 发布 v0.62.0-nightly，新增 **Gemini 3.8 Flash** 和 **3.5 Flash Lite** 模型支持。社区今日焦点集中在 **subagent 稳定性**（挂起、恢复、轨迹可见性）和 **MCP 配置/工具调用** 相关 bug，多个核心问题已被标记为 P1 优先修复。

---

## 2. 版本发布

### v0.62.0-nightly.20260923.g62364cb20

- **新增模型支持**：`gemini-3.8-flash` 和 `gemini-3.5-flash-lite` 正式作为 Flash/Flash Lite 系列的 GA 模型加入（PR #29443，已合并）
- **变更**：将上述模型从 preview 升级为默认可用版本

🔗 [Release Notes](https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260923.g62364cb20) | [PR #29443](https://github.com/google-gemini/gemini-cli/pull/29443)

---

## 3. 社区热点 Issues

| # | 标题 | 优先级 | 评论 | 重要性 |
|---|------|--------|------|--------|
| #22323 | Subagent 在达到 MAX_TURNS 后被报告为 GOAL success，掩盖中断 | P1 | 13 | subagent 终止逻辑缺陷，影响诊断准确性 |
| #19873 | 通过零依赖 OS 沙盒利用模型 bash 亲和性 | P2 | 9 | 安全与性能平衡的架构级提案 |
| #21409 | Generalist agent 无限挂起 | P1 | 8 | 核心体验问题，用户反馈强烈（👍8） |
| #22745 | AST-aware 文件读取/搜索/映射评估 | P2 | 7 | 影响 codebase 理解精度，减少 token 消耗 |
| #21968 | Gemini 不使用 skills 和 sub-agents | P2 | 6 | 功能可用性隐患，社区高频反馈 |
| #26525 | 为 Auto Memory 添加确定性脱敏 | P2 | 5 | 安全合规关键问题，防止 secret 泄露 |
| #26522 | Auto Memory 避免无限重试低信号会话 | P2 | 4 | 资源浪费和体验问题 |
| #22267 | Browser Agent 忽略 settings.json 覆盖配置 | P2 | 4 | 配置管理 bug，影响定制部署 |
| #21983 | Wayland 下 browser 子代理失败 | P1 | 4 | Linux 用户适配问题 |
| #21335 | /compress 命令跨会话不持久化 | P2 | 2 | 用户痛点，👍2 表示社区认同 |

🔗 #22323 [Link](https://github.com/google-gemini/gemini-cli/issues/22323) | #21409 [Link](https://github.com/google-gemini/gemini-cli/issues/21409) | #21983 [Link](https://github.com/google-gemini/gemini-cli/issues/21983)

---

## 4. 重要 PR 进展

| # | 标题 | 状态 | 重要性 |
|---|------|------|--------|
| #29451 | 限制工具输出大小，优化长 agent 循环内存生命周期 | 🟢 Open | P1 - 防止 OOM，提升稳定性 |
| #29468 | 修复连接恢复期间重试进度指示器不显示 | 🟢 Open | P1 - UX 修复 |
| #29452 | 将工具确认与 IDE diff RPC 解耦，防止 UI 冻结 | 🟢 Open | P1 - 解决 IDE 集成核心 bug |
| #29457 | 用 glob 匹配替代模糊匹配修复多文件读取 bug | 🟢 Open | P1 - 防止二进制文件污染上下文 |
| #29466 | 防止未信任工作空间覆盖 settings.json | 🟢 Open | P1 - 安全修复，防止意外数据丢失 |
| #29436 | 修复 stdin 中引号内 `@` 导致 100% CPU 挂起 | 🟢 Open | P1 - 严重的输入处理 bug |
| #29460 | 修复 OAuth URL 换行导致认证失败 | 🟢 Open | P1 - 安全认证流程修复 |
| #29443 | 新增 Gemini 3.8 Flash / 3.5 Flash Lite 支持 | ✅ Closed | 模型支持 |
| #19013 | 修复 Windows 扩展更新时文件锁 EBUSY 错误 | 🟢 Open | 平台兼容性 |
| #29431 | 跳过无效 TOML policy 规则，防止启动崩溃 | 🟢 Open | 配置解析健壮性 |

🔗 #29451 [Link](https://github.com/google-gemini/gemini-cli/pull/29451) | #29452 [Link](https://github.com/google-gemini/gemini-cli/pull/29452) | #29457 [Link](https://github.com/google-gemini/gemini-cli/pull/29457) | #29436 [Link](https://github.com/google-gemini/gemini-cli/pull/29436) | #29466 [Link](https://github.com/google-gemini/gemini-cli/pull/29466)

---

## 5. 功能需求趋势

从 Issues 和 PR 中可识别以下趋势方向：

| 方向 | 热度 | 说明 |
|------|------|------|
| **Subagent 可靠性** | 🔥🔥🔥 | 挂起恢复、轨迹可见性、设置应用一致性成为重点关注 |
| **MCP 配置管理** | 🔥🔥🔥 | enable/disable 失效、配置损坏、settings.json 安全等问题集中爆发 |
| **Auto Memory 质量** | 🔥🔥 | 脱敏、低信号会话去重、无效 patch 隔离需改进 |
| **模型扩展** | 🔥🔥 | 3.8 Flash / 3.5 Flash Lite 已上线，社区期待更多模型适配 |
| **性能与上下文优化** | 🔥🔥 | 工具输出截断、AST-aware 读取、token 消耗控制持续被提议 |
| **平台兼容性** | 🔥 | Wayland 支持、Windows 文件锁、终端 Unicode 处理 |

---

## 6. 开发者关注点

**高频痛点 Top 5：**

1. **Subagent 行为不可预测** — 挂起、终止理由错误、settings 覆盖被忽略，开发者难以调试复杂多 agent 工作流
2. **MCP 配置系统脆弱** — `enable/disable` 命令失效、损坏配置导致安全策略绕过，影响生产部署信任度
3. **长会话内存管理** — 工具输出无界增长、Auto Memory 无限重试，导致进程 OOM 或资源浪费
4. **终端/输入处理缺陷** — `@` 符号导致 CPU 挂起、surrogate pair 截断、OAuth URL 换行认证失败
5. **跨平台兼容** — Wayland browser agent 失败、Windows 扩展更新锁文件

**建议关注**：P1 级修复 PR 已集中提交，预计下一版本（v0.62.x stable）将大量吸收上述修复。社区可关注 #22323、#21409 的 retest 状态，以及 #29451/#29452 的合并进度。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-09-24  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
GitHub Copilot CLI 今日发布 v1.0.89-1 更新，新增了对 GPT-6 Luna 和 GPT-6 Sol 模型的支持。社区讨论热度较高，主要集中在上下文记忆管理、模型配置（如 DeepSeek API 集成）、IDE 集成体验以及认证机制稳定性等方面。同时，关于自动化权限管理和自定义模型端点支持的需求呼声依然强烈。

---

## 2. 版本发布
**v1.0.89-1**
- **新增**: 当 GPT-6 Luna 和 GPT-6 Sol 模型可用时，将其添加至模型选择器。
- **修复**:
  - 修复了当提供者发送扁平化 `view_range` 参数时，View 工具未能正确处理行范围的问题。
  - 修复了本地会话中，在空聊天输入框按 `Up` 键会召回待处理消息并留下队列中提示的问题。

---

## 3. 社区热点 Issues
以下是过去24小时内评论数最多的 10 个 Issues，反映了当前社区最关注的技术痛点：

1. **#4535** - `store_memory` 失败：缺少必需的 Instance ID
   - **状态**: CLOSED
   - **重要性**: **高** - 上下文记忆功能在 v1.0.81 预览版中存在严重 Bug，导致记忆存储失败。
   - **社区反应**: 1 个点赞，10 条评论，涉及 GPT-5.6 Sol 模型。

2. **#2995** - 无法使用 DeepSeek API
   - **状态**: CLOSED
   - **重要性**: **高** - 支持自定义 OpenAI 兼容 API（如 DeepSeek）的功能需求。
   - **社区反应**: 9 个点赞，9 条评论，展示了用户对本地/私有模型集成的强烈需求。

3. **#2421** - HTTP/2 GOAWAY 竞态条件导致级联重试失败
   - **状态**: CLOSED
   - **重要性**: **中** - 涉及底层 HTTP 连接池稳定性，可能导致请求静默失败。

4. **#4847** - 自动 managed-settings 刷新导致 IDE MCP 重载失败
   - **状态**: OPEN
   - **重要性**: **中** - 长期运行的 CLI 会话连接 VS Code 时，自动刷新配置可能破坏插件加载。

5. **#4003** - 支持自定义模型端点（类似 VS Code）
   - **状态**: OPEN
   - **重要性**: **高** - 用户希望 CLI 具备与 VS Code 相同的本地/私有模型配置能力。
   - **社区反应**: 0 个点赞，4 条评论，属于核心功能增强需求。

6. **#4521** - Sandbox 无法禁用
   - **状态**: CLOSED
   - **重要性**: **中** - 配置显示禁用但实际运行仍强制使用，导致执行逻辑冲突。

7. **#3331** - 请求插件启动时自动更新
   - **状态**: CLOSED
   - **重要性**: **中** - 希望减少手动更新插件的负担，改善团队协作体验。

8. **#4844** - `--yolo` 标志被策略覆盖后无法重新应用
   - **状态**: OPEN
   - **重要性**: **中** - 权限绕过模式在启动时可能被策略静默关闭，影响开发体验。

9. **#4663** - 上下文压缩失败导致无界计费重试
   - **状态**: OPEN
   - **重要性**: **高** - 失败的压缩请求会无限制重试，导致高额账单和上下文膨胀。

10. **#4929** - 进程内认证令牌停止刷新，需重启
    - **状态**: OPEN
    - **重要性**: **高** - 长期运行的进程会意外失去认证，导致所有请求失败。

---

## 4. 重要 PR 进展
以下是过去24小时内更新的 Pull Requests：

1. **#4948** - 更新 github-script action 依赖
   - **状态**: OPEN
   - **内容**: 刷新 GitHub Actions 依赖至 v9.0.0，确保 CI/CD 构建流程安全。
   - **链接**: [github/copilot-cli PR #4948](https://github.com/github/copilot-cli/pull/4948)

---

## 5. 功能需求趋势
从 Issues 分析，社区关注点主要集中在以下方向：

1. **模型与 API 灵活性**:
   - DeepSeek v4-pro 等第三方模型集成 (#2995)
   - 自定义模型端点支持 (#4003)
2. **上下文管理**:
   - 记忆存储稳定性 (#4535)
   - 上下文压缩失败处理 (#4663)
3. **权限与安全**:
   - 自动权限批准 (#3877)
   - Sandbox 配置与状态一致性 (#4521)
4. **IDE 集成体验**:
   - MCP 服务器重载问题 (#4847)
   - 终端主题颜色适配 (#4843)
5. **长会话稳定性**:
   - 认证令牌刷新 (#4929)
   - HTTP 连接池竞态 (#2421)

---

## 6. 开发者关注点
开发者反馈中的高频痛点包括：

- **记忆功能 Bug**: `store_memory` 在预览版中缺失 Instance ID，严重影响上下文能力。
- **长会话稳定性**: 认证令牌和 HTTP 连接池的长期运行问题，导致需要频繁重启。
- **配置一致性**: Sandbox 状态与配置不符，影响执行逻辑。
- **功能缺失**: 缺少自定义模型端点、自动插件更新、键盘快捷键切换会话等实用功能。
- **UI/UX 细节**: 终端主题颜色适配、长命令运行的可视化反馈等体验问题。

---
*数据来源: github.com/github/copilot-cli*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI 社区动态日报**
**日期：** 2026-09-24
**数据源：** GitHub.com/MoonshotAI/kimi-cli

---

### 1. 今日速览
过去24小时内，Kimi Code CLI **无新版本发布**。社区关注度集中在安全性问题上，核心 Issue #2596 被重新激活，该问题涉及 Agent 在特定权限模式下误删用户关键数据，引发了关于沙箱安全机制的讨论；同时，旧 Issue #1547 被标记为已关闭，解决了生成过程中的授权失败问题。

### 2. 版本发布
*（无）*

### 3. 社区热点 Issues
*以下为过去24小时内更新或状态变更的关键 Issue：*

1.  **[OPEN] Agent ran rm -rf on a pre-existing directory outside the workspace, deleting user session data**
    *   **重要性：** ⭐⭐⭐⭐⭐（高危安全漏洞）
    *   **摘要：** 用户反馈在 Kimi Code CLI 的 `yolo` 权限模式下，Agent 在清理 Symlink 时错误地执行了 `rm -rf` 命令，导致删除了用户主目录下的关键会话数据。
    *   **社区反应：** 该 Issue 在 24 小时内获得更新，目前处于开放状态，社区正密切关注修复方案。

2.  **[CLOSED] [bug] Repeated error for "Authorization failed, please check your login status" mid generation**
    *   **重要性：** ⭐⭐⭐⭐（高频故障修复）
    *   **摘要：** 用户在 Linux 环境下使用 `kimi-for-coding` 模型生成代码时频繁遇到授权失效报错，现已确认修复。
    *   **社区反应：** 标记为 CLOSED，解决了用户的持续困扰。

### 4. 重要 PR 进展
*（过去24小时内无更新）*

### 5. 功能需求趋势
*   **安全性与权限控制：** 社区高度关注 CLI 工具在自动化执行命令时的边界控制，特别是 `yolo` 模式下的文件系统访问权限问题。
*   **网络连接稳定性：** 生成过程中的授权错误问题虽然已解决，但反映了社区对长对话/长代码生成任务中网络状态保持的高需求。

### 6. 开发者关注点
*   **环境兼容性：** 开发者反馈集中在 Linux (6.12.73-1-lts) 环境下的特定行为，表明平台底层差异可能影响工具稳定性。
*   **数据安全：** Agent 擅自删除外部目录的行为触及了开发者对 AI 编码助手“不可控”风险的核心担忧。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-09-24
**数据来源**: github.com/anomalyco/opencode

---

## 1. 今日速览
过去 24 小时内社区活跃度极高，共更新 50 个 Issue 和 50 个 Pull Request。主要焦点集中在 **v2.0 系统稳定性**（如 Windows 并发竞态条件、会话管理）、**模型缓存与计费问题**（DeepSeek V4.1 缓存失效导致高成本）以及 **桌面端 UI 交互**（模型选择器、工具调用反馈）。同时，社区对 **多仓库上下文支持** 和 **OAuth MCP 认证** 的功能需求呼声较高。

---

## 2. 版本发布
**无最新 Release**。

---

## 3. 社区热点 Issues

### 🔴 优先级高：稳定性与崩溃
*   **#49433 Error from provider (Console): OpenCode's free tier can only be used from within OpenCode** (52 👍)
    *   **重要性**: Free tier 功能出现严重限制，影响大量免费用户。
    *   **详情**: 无论使用哪个模型，均报错提示只能在 OpenCode 内部使用免费层级，导致无法正常工作。
*   **#50775 Failed to drain Session: one malformed tool result wedges the whole session** (2 👍)
    *   **重要性**: 会话死锁，导致 UI 卡死，严重影响工作流。
    *   **详情**: 当工具结果格式错误时，整个会话无法继续，新会话正常但旧会话永久卡死，用户反馈晚上多次遇到此问题。
*   **#41848 LLM retry has no max attempts: stream errors cause infinite retry loop** (4 👍)
    *   **重要性**: 系统无上限重试机制，导致 UI 长期卡在 "Thinking..." 状态。
    *   **详情**: DeepSeek 流式错误触发无限重试，重试延迟长达 24 天，用户需手动重启。

### 🟡 功能缺陷与体验
*   **#50915 [FEATURE]: Redact credential values in opencode debug config** (5 👍)
    *   **重要性**: 安全性隐患，调试配置明文显示 API Key。
    *   **详情**: 在共享终端或录制演示时，`opencode debug config` 会打印出包含明文 API Key 的配置，建议红场脱敏。
*   **#50962 TUI: client.tui.showToast() from command.execute.before corrupts input box** (2 👍)
    *   **重要性**: 插件 API 与 TUI 渲染冲突，破坏输入框状态。
    *   **详情**: 插件使用官方 `showToast` API 时会导致输入框内容错乱。
*   **#50969 tui: model favorites toggle missing hint and dead in /models dialog** (1 👍)
    *   **重要性**: V2 兼容性回归，用户无法使用收藏模型功能。
    *   **详情**: `/models` 对话框中收藏功能失效，`Ctrl+F` 无响应，疑似从 V1 迁移时的 Bug。

### 🟢 功能需求
*   **#988 [FEATURE]: add MCP remote using oauth** (41 👍)
    *   **重要性**: 社区呼声最高，提升 MCP 服务器配置的便利性与安全性。
    *   **详情**: 希望通过 OAuth 2.1 自动授权 MCP 服务器，无需手动复制密钥或修改配置文件。
*   **#50944 [FEATURE]: Ability to add a folder/project as context. similar to claude code** (2 👍)
    *   **重要性**: 上下文管理痛点，当前仅支持根目录。
    *   **详情**: 请求增加类似 Claude Code 的功能，允许将任意子文件夹作为上下文进行变更追踪。

---

## 4. 重要 PR 进展

### 🔧 系统维护与清理
*   **#44533 [automated-pr-cleanup] feat: open VS Code native diff for edit/write permission approvals** (CLOSED)
    *   **内容**: 优化 VS Code 集成体验，权限审批时打开原生 Diff 编辑器。
*   **#44492 [automated-pr-cleanup] feat(cli): add disabled_plugins config and plugin management commands** (CLOSED)
    *   **内容**: 新增 `disabled_plugins` 配置项，提供更精细的插件控制能力。
*   **#44378 [automated-pr-cleanup] feat(core): support AgentRouter provider** (CLOSED)
    *   **内容**: 原生支持 AgentRouter 提供商，修复 User-Agent 头部导致的请求被拒问题。

### 🐛 Bug 修复
*   **#44514 [automated-pr-cleanup] fix(desktop): resolve WSL OpenCode from PATH** (CLOSED)
    *   **内容**: 修复 WSL 环境下无法正确识别从全局路径安装的 OpenCode 二进制文件的问题。
*   **#44340 [automated-pr-cleanup] fix(core): serialize prompt settlement around event publication** (CLOSED)
    *   **内容**: 修复事件发布与提示结算之间的竞态条件，防止状态丢失。
*   **#44342 [automated-pr-cleanup] fix(tui): reconcile pending prompts with the live server** (CLOSED)
    *   **内容**: 解决 TUI 与后台服务重启时待处理提示不同步的问题。

---

## 5. 功能需求趋势

通过分析 50 个 Issue，社区关注的焦点主要集中在以下三个方向：

1.  **安全性增强**:
    *   **API Key 脱敏**: 调试命令和日志不应包含明文凭证。
    *   **OAuth 认证**: 简化 MCP 服务器配置流程，避免手动管理密钥。
2.  **上下文与编辑器集成**:
    *   **多仓库追踪**: 请求支持 Workspace 子目录的变更管理。
    *   **Linux PRIMARY Selection**: 希望在 Linux 下支持中键粘贴（Middle-click paste）。
3.  **桌面端交互体验**:
    *   **模型选择器优化**: 模型选择器弹窗尺寸过小，无法适应大屏。
    *   **工具调用反馈**: 插件工具调用时的状态提示（Toast）需要更健壮，避免破坏 TUI 状态。

---

## 6. 开发者关注点

*   **支付与订阅问题**: 部分用户反映信用卡突然被拒，或订阅状态丢失，需要客服介入。
*   **Provider 兼容性**: V2 版本向 OpenAI 兼容接口发送 `prompt_cache_key` 导致 NVIDIA NIM 等特定提供商报错。
*   **并发竞态**: Windows 环境下多进程同时写入 `session.json` 导致 EPERM 错误，UI 丢失当前会话。
*   **ARM64 支持**: Windows ARM64 原生二进制运行 TUI 时出现 `TinyCC error`，虽然基础命令可用，但交互界面无法启动。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi (pi-mono) 社区动态日报

**日期**: 2026-09-24  
**数据来源**: github.com/badlogic/pi-mono  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览

过去24小时内，Pi 项目在**模型能力扩展**（新增 Yolo-Auto 提供商）和**系统稳定性优化**（解决多轮对话、会话恢复、剪贴板等关键 Bug）方面取得了显著进展。社区高度关注 GPT-6 模型的上下文窗口更新及会话历史迁移问题，表明项目正在积极适配新一代大模型。

---

## 2. 版本发布

**无新版本发布**。当前版本仍维持在 0.85.x - 0.87.x 之间。

---

## 3. 社区热点 Issues

以下为过去24小时内更新且评论数最高的 10 个 Issue：

*   **#9361 Windows ShellPath 非确定性解析问题** (9 评论)
    *   **摘要**: 在 Windows 上加载扩展时，`shellPath` 配置会被静默忽略，导致回退到 Git Bash 或 PATH 中的 bash.exe。
    *   **重要性**: 影响开发者在 Windows 环境下的工作流稳定性，特别是在使用自定义 Shell 时。

*   **#9549 全屏模式下大文本渲染性能瓶颈** (8 评论)
    *   **摘要**: 大型转录文本在 Windows 11 上导致 CPU 饱和，每次调整窗口大小都会重新渲染整个会话。
    *   **重要性**: 涉及 TUI (终端用户界面) 的核心渲染性能，直接影响长会话的用户体验。

*   **#5581 自定义消息触发机制绕过事件监听** (7 评论)
    *   **摘要**: 使用 `triggerTurn: true` 的自定义消息会绕过 `before_agent_start` 事件。
    *   **重要性**: 涉及插件系统的事件生命周期，可能导致扩展逻辑与核心 Agent 循环不一致。

*   **#9075 自适应思考模型的输出限制问题** (4 评论)
    *   **摘要**: 在 `forceAdaptiveThinking` 模型上，压缩总结继承会话思考级别，导致过早达到输出上限。
    *   **重要性**: 关乎高推理能力模型（如 Claude 3.5 Sonnet）在 Pi 中的正确使用。

*   **#9506 openai-completions 流路径中采样参数丢失** (3 评论)
    *   **摘要**: `models.json` 中定义的 `samplingParams` 在工具调用（tool-using）路径中未被传递给服务器。
    *   **重要性**: 影响模型行为的精细控制，可能导致模型输出不稳定。

*   **#9757 parseChunkUsage 丢弃非标准 Provider 字段** (3 评论)
    *   **摘要**: `parseChunkUsage` 只解析 OpenAI 标准字段，丢弃了其他 Provider 特有的使用量字段。
    *   **重要性**: 影响多 Provider 架构下成本追踪和遥测数据的准确性。

*   **#9886 clearQueue() 静默破坏扩展消息** (3 评论)
    *   **摘要**: `clearQueue()` 会销毁扩展通过 `sendCustomMessage()` 发送的消息，且不返回。
    *   **重要性**: 影响插件开发者管理消息队列的能力，可能导致功能丢失。

*   **#9925 硬件光标样式被强制覆盖为方块** (3 评论)
    *   **摘要**: 即使设置了 `showHardwareCursor: true`，光标仍被强制渲染为块状。
    *   **重要性**: TUI 的视觉体验问题，影响在支持自定义光标样式的终端中的显示。

*   **#9786 X11 粘贴时将文本写入假 .png 文件** (2 评论)
    *   **摘要**: X11 所有者响应任意 -t 目标时，导致剪贴板操作异常。
    *   **重要性**: Linux/X11 平台下的剪贴板兼容性问题。

*   **#9887 TUI 中 read 工具渲染字符串拼接错误** (2 评论)
    *   **摘要**: 模型返回字符串类型的行号时，TUI 将其进行字符串拼接而非数值相加。
    *   **重要性**: 工具调用的渲染逻辑细节错误。

---

## 4. 重要 PR 进展

以下为过去24小时内更新且值得关注的 PR：

*   **#9934 feat(ai): Add Yolo-Auto provider** (已合并)
    *   **内容**: 新增 `yolo-auto` 作为内置提供商，支持 OpenAI 兼容的 `/v1/chat/completions` 和 `/v1/models` 自动发现。
    *   **意义**: 扩展了模型接入生态，为用户提供更多订阅型 Gateway 选项。

*   **#9964 fix(ai): Use GPT-6 API context limits** (已合并)
    *   **内容**: 更新 GPT-6 (Astra, Sol, Luna) 的上下文窗口至 1,050,000 tokens，同时保持 128,000 的输出限制。
    *   **意义**: 适配 GPT-6 系列的最新能力，确保长上下文支持。

*   **#9948 feat(ai,coding-agent): Unify image and classifier model infrastructure** (已合并)
    *   **内容**: 重构模型系统基础设施，使其支持除聊天模型以外的其他模型类型。
    *   **意义**: 为未来支持多模态（如图像生成）等更复杂的模型奠定基础。

*   **#9970 feat(skills): Add pkgdiet dependency guardrail** (已合并)
    *   **内容**: 在 Agent Harness 中添加 `pkgdiet` 依赖护栏技能，自动评估 `npm install` 命令的安全性。
    *   **意义**: 增强 AI 编码 Agent 在安装依赖时的安全性，防止恶意包注入。

*   **#9975 feat(durable): Add clock sync** (已合并)
    *   **内容**: 添加时钟同步功能。
    *   **意义**: 可能涉及分布式会话或跨设备同步的时间戳准确性问题。

*   **#9901 feat: Expose provider stream events to extensions** (已合并)
    *   **内容**: 通过 `pi-ai` 和 Agent Core 暴露 `onProviderStreamEvent`，解决 #9784。
    *   **意义**: 让扩展能够监听底层 Provider 的流事件，增强扩展能力。

*   **#9956 fix(tui): Paint user message on Enter before prompt preflight** (已合并)
    *   **内容**: 优化 Enter 按键响应，在预检完成前乐观渲染用户消息气泡。
    *   **意义**: 修复输入延迟，提升 TUI 的响应速度。

*   **#9941 fix(coding-agent): Turn steer during abort unwind into a fresh prompt** (已合并)
    *   **内容**: 修复在 Abort 后快速重试时提示丢失的问题。
    *   **意义**: 提升交互的连续性和稳定性。

*   **#9222 fix(coding-agent): Reject reload while running or compacting** (已合并)
    *   **内容**: 防止在 Agent 运行或压缩总结期间执行 Runtime Reload。
    *   **意义**: 防止工具执行上下文失效导致的错误。

*   **#8398 feat: Add color values and theme styling** (开放中)
    *   **内容**: 重构 TUI 主题支持，直接暴露颜色值，支持非终端 UI。
    *   **意义**: 增强视觉表现力，为未来非终端界面铺路。

---

## 5. 功能需求趋势

从 Issue 数据分析，社区关注点主要集中在以下三个方向：

1.  **高性能与稳定性**:
    *   **TUI 渲染优化**: 大文本、全屏模式下的帧率问题 (#9549)。
    *   **资源管理**: 解决内存溢出 (#9036)、剪贴板操作阻塞 (#9786)。
    *   **并发控制**: 解决会话恢复时的上下文冲突 (#6744)。

2.  **扩展生态完善**:
    *   **事件系统**: 希望更完整地暴露 Agent 生命周期事件（如 #5581, #9098）。
    *   **Provider 通用性**: 需要支持更多模型提供商的特定字段和流事件（#9784, #9757）。
    *   **依赖安全**: 关注 `npm install` 的安全性（#9970）。

3.  **模型适配与迁移**:
    *   **新模型支持**: 积极适配 GPT-6 等新模型的上下文窗口和参数结构（#9964, #9506）。
    *   **会话迁移**: 处理旧版本会话（v3 之前）的 Fork 和历史恢复问题（#9950, #9243）。

---

## 6. 开发者关注点

*   **跨平台兼容性**: Windows (ShellPath, Cursor) 和 Linux (X11) 平台的特定 Bug 依然存在，是高频反馈点。
*   **调试体验**: `models.json` 配置丢失、采样参数未生效等问题，增加了开发者排查 Agent 行为的难度。
*   **文档与契约**: 社区呼吁更清晰地定义 RPC 响应结构（如 disposition 字段）和 Provider 扩展接口，以减少“黑盒”操作。
*   **性能瓶颈**: 在处理长对话和复杂工具调用时，系统资源（CPU/内存）的消耗成为阻碍生产力提升的关键因素。

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