# AI CLI 工具社区动态日报 2026-10-02

> 生成时间: 2026-10-01 23:34 UTC | 覆盖工具: 9 个

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

⚠️ Skills 摘要生成失败。

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



# OpenAI Codex 社区动态日报 — 2026-10-02

---

## 1. 今日速览

过去24小时，Codex Rust CLI 发布 v0.160.0 正式版，新增全屏转录文本粘贴、键盘浏览任务历史等体验优化。社区热点集中爆发于 Windows 桌面端稳定性问题——多个高票 Issue 反映 daemon 特权、Remote 配对循环及 Computer Use 工具链缺失；同时，Codex Web 首次消息提交失败引发大量用户关注（24👍）。技术层面，gRPC 云端线程客户端、动态工具继承、Guardian V2 安全策略对比等核心能力正通过 PR 持续合并。

---

## 2. 版本发布

### rust-v0.160.0（正式版）

| 更新项 | 说明 |
|--------|------|
| 任务历史浏览 | Agent command center 新增键盘可访问的"Show more"操作，支持浏览旧任务 |
| 全屏转录粘贴 | 支持本地 Linux X11 终端的全屏模式下，选中转录文本并用鼠标中键粘贴（#49112） |
| 项目外会话启动 | 支持使用 `workspace default` 在 project 外部启动 Codex 会话 |

### Alpha 预览通道

- **rust-v0.162.0-alpha.1** — 最新 alpha 版本
- **rust-v0.161.0-alpha.6 ~ alpha.9、alpha.11 ~ alpha.13** — 连续 alpha 迭代，快速响应社区反馈

---

## 3. 社区热点 Issues

| Issue | 标题 | 热度 | 推荐理由 |
|-------|------|------|----------|
| [#48043](https://github.com/openai/codex/issues/48043) | Windows CLI 0.157.0 启动失败（daemon 特权错误） | 👍41 / 56评论 | 影响范围最广的 Windows 回归问题，0.156.1 正常而 0.157.0 无法启动，社区呼声最高 |
| [#49497](https://github.com/openai/codex/issues/49497) | Codex Web 首次消息失败："Unable to determine project root" | 👍24 / 13评论 | 云端可运行环境正常却无法确定项目根，直接影响 Web 用户首次使用体验 |
| [#47357](https://github.com/openai/codex/issues/47357) [已关闭] | VS Code Server 中 Codex 无法激活（音频扩展仅限桌面） | 👍24 / 16评论 | 明确标注为 Codex 自我报告，Audio 扩展 Desktop-only 限制已关闭，但 serve-web 场景仍待解决 |
| [#48774](https://github.com/openai/codex/issues/48774) | Codex Remote 在 Android 配对失败 | 👍12 / 32评论 | Android ↔ Windows Remote 配对循环，相同账号两台设备均正常但 QR 流程卡死 |
| [#49458](https://github.com/openai/codex/issues/49458) | Windows dot 启动的本地任务缺少 Computer Use 工具 | 👍13 / 20评论 | dot/Work 场景下 Computer Use 工具链缺失，影响自动化工作流 |
| [#43803](https://github.com/openai/codex/issues/43803) | request_user_input_async 问题卡片被自动关闭 | 👍8 / 14评论 | GPT-6-Astra 在 macOS 桌面端提问后卡片自动消失，用户无法作答，交互体验阻断 |
| [#49729](https://github.com/openai/codex/issues/49729) | Dot 无法创建或跟进已保存项目中的本地任务 | 👍2 / 16评论 | dot 可启动本地任务但无法选择已保存项目，也无法通过 ID 读取项目线程 |
| [#48324](https://github.com/openai/codex/issues/48324) | Windows 桌面版 Codex 启动时组织设置加载失败 | 👍5 / 34评论 | 桌面 Codex 在 composer 加载前即报错，CLI 和 Web 端正常，平台差异明显 |
| [#49488](https://github.com/openai/codex/issues/49488) | Windows dot/Work Computer tasks 缺少浏览器/桌面工具 | 👍4 / 10评论 | durable MCP 启动失败，Computer Use 场景工具链不完整 |
| [#7801](https://github.com/openai/codex/issues/7801) | 允许指定 SessionID 以支持自动化工作流嵌入 | 👍18 / 9评论 | 长期功能需求，自动化场景需精确捕获 SessionID，社区呼声持续高涨 |

---

## 4. 重要 PR 进展

| PR | 标题 | 状态 | 核心内容 |
|----|------|------|----------|
| [#50113](https://github.com/openai/codex/pull/50113) | 为云端线程恢复和附加添加原生 gRPC 客户端 | ✅ 已关闭 | 新增 `codex-cloud-client`，基于 HTTP/2 实现 `ThreadService.Resume` 和实时 `ThreadService.Attach` |
| [#50082](https://github.com/openai/codex/pull/50082) | 为 V2 子代理启用动态工具继承 | ✅ 已关闭 | 修复无 fork 历史的子代理无法继承父代理动态工具的问题，支持委托工作流 |
| [#50099](https://github.com/openai/codex/pull/50099) | 为 Guardian V2 添加可选的 Decisions 比较 | ✅ 已关闭 | 新增 `guardianv2_decisions_comparison` 功能开关，支持与 Guardian V2 快照并行运行 Decisions 分类器 |
| [#50094](https://github.com/openai/codex/pull/50094) | 向 app-server 添加 attachment 所有者查找 | ✅ 已关闭 | 新增 `thread/attachmentOwner/list` 端点，支持通过 attachment 身份查找关联线程及归档状态 |
| [#50059](https://github.com/openai/codex/pull/50059) | 修复含多个拒绝文件的 Linux 沙箱启动 | ✅ 已关闭 | bubblewrap `--ro-bind-data` 会关闭 FD，修复复用同一 FD 导致沙箱无法启动的问题 |
| [#50058](https://github.com/openai/codex/pull/50058) | Windows 绑定升级到 `windows-sys` 0.61.2 | ✅ 已关闭 | 统一 workspace 中 `windows-sys` 版本，迁移 handle/boolean 类型定义 |
| [#50087](https://github.com/openai/codex/pull/50087) | 会话驱逐期间保留排队代理邮件 | ✅ 已关闭 | 修复排队邮件导致空闲代理无法卸载的问题， Pending mail 不再占用已加载线程槽位 |
| [#50109](https://github.com/openai/codex/pull/50109) | 全屏提示保持有界且可滚动 | ✅ 已关闭 | 限制全屏 composer 最大高度为视口 2/3，确保远程图片附件和转录区域同时可见 |
| [#50112](https://github.com/openai/codex/pull/50112) | 集中 TUI 加载 glyph 和帧调度 | ✅ 已关闭 | 将语音连接 spinner 迁移至共享 helper，统一 100ms 动画节奏和静态降级 glyph |
| [#50052](https://github.com/openai/codex/pull/50052) | 恢复的 TUI 答案草稿中保留问题上下文 | ✅ 已关闭 | 会话结束后未发送的答案恢复时，prepend 问题标题作为 Markdown 标记，避免答案丢失上下文 |

---

## 5. 功能需求趋势

从 Issue 和 PR 分布来看，社区当前最关注的功能方向如下：

| 方向 | 关注热度 | 代表 Issue / PR |
|------|----------|-----------------|
| **Windows 桌面端稳定性** | 🔥🔥🔥🔥🔥 | #48043、#48324、#49458、#49488、#41665 |
| **Remote 跨设备配对与连接** | 🔥🔥🔥🔥 | #48774、#49618、#41580 |
| **Computer Use 工具链完整性** | 🔥🔥🔥🔥 | #49458、#49488、#35446 |
| **云端线程管理与 gRPC 能力** | 🔥🔥🔥🔥 | #50113、#50094、#50083 |
| **子代理/委托工作流（dot）** | 🔥🔥🔥 | #49729、#50082、#49883 |
| **沙箱与执行环境** | 🔥🔥🔥 | #19676、#50059、#49498 |
| **TUI/全屏交互体验** | 🔥🔥🔥 | #50109、#50052、#43803 |
| **安全策略与 Guardian** | 🔥🔥 | #50099、#50066 |
| **Session 管理与 Rollout 文件** | 🔥🔥 | #7801、#42345 |
| **IDE 扩展集成** | 🔥🔥 | #47357、#46925、#49988、#50118 |

---

## 6. 开发者关注点

**高频痛点汇总：**

1. **Windows 平台回归频发**：Daemon 特权、MSIX 虚拟 AppData、Computer Use 工具缺失、Remote 配对循环等问题高度集中，Windows 桌面版稳定性是当前最大短板。

2. **dot/Work 委托工作流断点**：子代理无法继承动态工具、无法访问已保存项目线程、任务完成后状态卡死，影响企业级自动化场景。

3. **Remote 跨端配对可靠性**：Android ↔ Windows 配对流程在 QR 扫描后反复循环，连接协调机制（`/side`、session 连续性）存在回归。

4. **Codex Web 项目根目录识别**：云端可运行环境正常但首次消息提交失败，根目录解析逻辑需完善。

5. **TUI 交互细节体验**：全屏 composer 布局、转录文本中键粘贴、问题卡片自动关闭等细节问题影响日常使用流畅度。

6. **IDE 扩展队列与状态同步**：VS Code 扩展中消息丢失、排队卡死、`Streaming=true` 状态残留等问题反复出现，服务端状态管理是重点。

7. **Rollout 文件体积膨胀**：单条命令输出被写入 4 次，长时间会话可达 GB 级，存储和性能优化需求明确。

---

*数据来源：github.com/openai/codex，统计周期 2026-10-01 ~ 2026-10-02*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报
**日期：2026-10-02**

---

## 1. 今日速览

Gemini CLI 发布 v0.64.0-nightly 版本，重点修复了 CLI 中 `@` 符号导致 CPU 挂起和引用截断的问题，同时优化了文件工具操作的序列化与原子写入。社区层面，子代理恢复、浏览器代理配置覆盖、以及 AGT 感知文件读取等功能讨论热度较高。

---

## 2. 版本发布

### v0.64.0-nightly.20261001.gc6bccb7ec

**修复内容：**
- **CLI 修复**：防止 `@` 符号在代码中导致 CPU 挂起和引用被截断问题（[PR #29557](https://github.com/google-gemini/gemini-cli/pull/29557)）
- **核心修复**：序列化文件工具操作，确保写入原子性（[PR #29078](https://github.com/google-gemini/gemini-cli/pull/29078)）

---

## 3. 社区热点 Issues

### 🔥 重点关注

| Issue | 标题 | 热度 | 重要性说明 |
|-------|------|------|-----------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent 在达到 MAX_TURNS 后被错误报告为 GOAL 成功 | 13评论 / 2👍 | P1 级 bug，子代理在达到最大轮次前未做任何分析却报告成功，会掩盖真实的中断原因 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | 通用代理永久挂起 | 8评论 / 8👍 | P1 级 bug，社区反馈强烈，简单操作如创建文件夹也会挂起，影响基础体验 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | 通过零依赖 OS 沙箱利用模型的 Bash 亲和性 | 9评论 / 1👍 | P2 级增强，提出让模型更自然使用 POSIX 工具链，同时保障安全 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | 评估 AST 感知文件读取/搜索的影响 | 7评论 / 1👍 | P2 级功能需求，可显著减少 token 消耗和提升代码理解精度 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini 不使用 Skills 和子代理 | 6评论 / 0👍 | 用户反馈模型不会主动调用自定义 skills，需显式指令 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | 浏览器代理忽略 settings.json 配置覆盖 | 4评论 / 0👍 | P2 级 bug，`maxTurns` 等配置被完全忽略 |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | 浏览器代理会话接管与锁恢复 | 4评论 / 0👍 | 提出自动会话恢复机制，提升持久化浏览器模式稳定性 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | 浏览器子代理在 Wayland 下失败 | 4评论 / 1👍 | Linux Wayland 环境兼容性问题 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 工具超过 128 个时出现 400 错误 | 3评论 / 0👍 | P2 级 bug，工具数量限制问题 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | 代理应阻止/劝阻破坏性行为 | 3评论 / 1👍 | 安全相关增强，建议模型在 git 操作等场景选择更安全替代方案 |

---

## 4. 重要 PR 进展

### 🚀 近期合并/审核中

| PR | 标题 | 状态 | 说明 |
|----|------|------|------|
| [#29557](https://github.com/google-gemini/gemini-cli/pull/29557) | 修复 `@` 符号导致 CPU 挂起和引用截断 | ✅ 已合并 | v0.64.0-nightly 核心修复 |
| [#29582](https://github.com/google-gemini/gemini-cli/pull/29582) | 优化 ignore 过滤并启用子树剪枝 | ✅ 已合并 | 解决大仓库多秒阻塞问题，引入层级目录状态缓存 |
| [#29457](https://github.com/google-gemini/gemini-cli/pull/29457) | 替换 read-many-files 中的模糊匹配为 glob | 🔄 审核中 | 修复二进制文件被误判为显式请求的上下文膨胀 bug |
| [#29584](https://github.com/google-gemini/gemini-cli/pull/29584) | 防止快速退出时删除恢复的会话历史 | ✅ 已合并 | 修复 Ctrl+C 快速退出导致会话历史丢失的关键数据丢失问题 |
| [#29502](https://github.com/google-gemini/gemini-cli/pull/29502) | 确保 Enter 和空格键可靠确认选择列表 | ✅ 已合并 | 提升跨终端兼容性，包括 Windows IDE 终端 |
| [#29520](https://github.com/google-gemini/gemini-cli/pull/29520) | 流式传输期间保持滚动位置 | ✅ 已合并 | 解决查看历史消息时视口重置问题 |
| [#29586](https://github.com/google-gemini/gemini-cli/pull/29586) | 确保 Ctrl+C 紧急中断在活跃操作时生效 | ✅ 已合并 | 修复紧急停止被吞没的问题 |
| [#29558](https://github.com/google-gemini/gemini-cli/pull/29558) | 持久化状态原子写入与损坏恢复 | ✅ 已合并 | 引入原子写入、备份轮换和损坏恢复机制 |
| [#29568](https://github.com/google-gemini/gemini-cli/pull/29568) | ChatRecordingService 追加式 delta 补丁 | ✅ 已合并 | 替代全量重写，降低内存占用 |
| [#29583](https://github.com/google-gemini/gemini-cli/pull/29583) | 在不可信工作区强制只读设置 | 🔄 审核中 | 防止配置覆盖写入未验证工作区 |

---

## 5. 功能需求趋势

基于 Issue 分析，社区关注度最高的功能方向：

1. **子代理系统优化** - 多个 Issue 关注子代理的行为可靠性（恢复机制、配置继承、可见性），以及子代理间调用能力（[PR #28738](https://github.com/google-gemini/gemini-cli/pull/28738)）
2. **AST 感知代码理解** - 社区持续探索通过 AST 工具进行精准文件读取和搜索，以减少 token 消耗（[Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#22747](https://github.com/google-gemini/gemini-cli/issues/22747)）
3. **浏览器代理增强** - 会话恢复、配置覆盖、Wayland 兼容性等稳定性问题集中反馈
4. **Bash/POSIX 工具亲和性** - 希望模型更自然地使用 shell 工具链（[Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)）
5. **工作区安全与策略** - 不可信目录的只读限制、破坏性行为劝阻等安全相关需求

---

## 6. 开发者关注点

### 高频痛点

- **代理挂起/卡死**：通用代理和子代理在特定场景下永久挂起（[Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)），是 P1 级社区反馈最多的问题
- **会话历史丢失**：快速退出导致恢复的会话被删除（[PR #29584](https://github.com/google-gemini/gemini-cli/pull/29584)），影响用户体验
- **配置覆盖失效**：`settings.json` 中的浏览器代理配置被忽略（[Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)）
- **自定义 Skills 未被主动调用**：模型不会自主使用 skills，需显式指令（[Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)）
- **上下文膨胀**：`read-many-files` 对二进制文件的错误处理导致 token 浪费（[PR #29457](https://github.com/google-gemini/gemini-cli/pull/29457)）
- **状态持久化可靠性**：原子写入和损坏恢复已成为刚需（[PR #29558](https://github.com/google-gemini/gemini-cli/pull/29558)）

---

*报告生成时间：2026-10-02 | 数据来源：github.com/google-gemini/gemini-cli*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

你好！我是专注于 AI 开发工具的技术分析师。根据 GitHub `github/copilot-cli` 仓库在 2026-10-02 的数据，为你整理如下日报：

---

# GitHub Copilot CLI 社区动态日报
**日期：** 2026-10-02

## 1. 今日速览
*   **v1.0.92-0 版本发布**：修复了 MCP 工具在 OAuth 重新认证后失效的稳定性问题，并优化了会话时间线的清理逻辑。
*   **沙箱与认证优化**：新增了沙箱代理 CA 信任管理的命令集（包括无人值守 Windows 设置），并修复了会话恢复时的计数器异常。
*   **社区活跃度高**：过去24小时内共更新 38 个 Issue，主要集中在 MCP 服务器配置、企业版集成以及 macOS/Windows 平台的兼容性体验上。

## 2. 版本发布

### **v1.0.92-0** (2026-10-02)
*   **状态：** 最新发布
*   **关键修复：**
    *   **MCP 工具稳定性**：修复了当工具定义未改变时，OAuth 重新认证后 MCP 工具继续工作的逻辑缺陷。
    *   **会话状态清理**：优化了会话时间线，确保中断的回合结束后能正确清除“忙碌”状态。
*   **链接：** [Release Notes](https://github.com/github/copilot-cli/releases/tag/v1.0.92-0)

### **v1.0.91** (2026-10-01)
*   **新增功能：** 增强了 `copilot sandbox ca` 命令，支持检查、创建、信任、旋转和移除代理 CA 信任，特别支持无人值守的 Windows 设置；原 `/sandbox ca install` 命令已拆分为 `create` 和 `trust`。
*   **改进：** 修复了 CLI 关闭时 pending telemetry 未及时刷新的问题，并确保沙箱命令在 Windows 上正常运行。
*   **链接：** [Release Notes](https://github.com/github/copilot-cli/releases/tag/v1.0.91)

## 3. 社区热点 Issues (Top 10)

1.  **[OPEN] #3282 - 支持多 BYOK 模型**
    *   **重要性：** 高。当前 CLI 仅支持单一 BYOK 模型，用户在 TUI 中无法切换，严重影响高级企业用户的使用灵活性。
    *   **社区反应：** 获得高热度支持（31 👍），反馈强烈。
    *   [查看详情](https://github.com/github/copilot-cli/issues/3282)

2.  **[OPEN] #953 - 权限请求过于宽泛**
    *   **重要性：** 高。用户认为认证时请求对每个 GitHub 区域的读写权限过于激进，限制了精细化的账号管理需求。
    *   **社区反应：** 获得中等热度支持（5 👍）。
    *   [查看详情](https://github.com/github/copilot-cli/issues/953)

3.  **[OPEN] #4998 - macOS 更新导致会话失效**
    *   **重要性：** 中。由于 `.mcp-writer.binding` 持有过时的文件系统设备 ID，导致 macOS 安全更新后所有 Copilot 会话无法处理提示。
    *   **社区反应：** 4 👍。
    *   [查看详情](https://github.com/github/copilot-cli/issues/4998)

4.  **[OPEN] #5008 - 启动时的认证竞态错误**
    *   **重要性：** 中。用户报告在 1.0.89 版本中，每次启动都会出现 "Not authenticated" 错误，随后自动恢复，影响启动体验。
    *   **社区反应：** 5 👍。
    *   [查看详情](https://github.com/github/copilot-cli/issues/5008)

5.  **[OPEN] #4851 - Azure MCP 服务器连接失败**
    *   **重要性：** 中。Azure API Center MCP 服务器验证失败，Rust 运行时报 BrokenPipe 错误，影响了现有的 Azure 集成工作流。
    *   **社区反应：** 8 👍，反馈表明这是近期发生的破坏性变更。
    *   [查看详情](https://github.com/github/copilot-cli/issues/4851)

6.  **[OPEN] #2203 - 支持任务中切换到自动驾驶模式**
    *   **重要性：** 中。用户希望能恢复到 0.0.421 版本之前的交互方式，允许在任务进行中通过快捷键切换 Normal/Autopilot 模式。
    *   **社区反应：** 11 👍，这是一个重要的交互流程功能需求。
    *   [查看详情](https://github.com/github/copilot-cli/issues/2203)

7.  **[OPEN] #3675 - 会话 Worktree 可配置化**
    *   **重要性：** 中。当前会话工作树路径命名混乱且分散，用户希望能统一配置、自清理并规范命名，以避免管理混乱。
    *   **社区反应：** 8 👍。
    *   [查看详情](https://github.com/github/copilot-cli/issues/3675)

8.  **[OPEN] #4938 - GHEC 数据驻留端点路由错误**
    *   **重要性：** 中。在 GitHub Enterprise Cloud (Data Residency) 环境下，即便配置了特定端点，认证路由仍指向 api.github.com，导致连接失败。
    *   **社区反应：** 1 👍。
    *   [查看详情](https://github.com/github/copilot-cli/issues/4938)

9.  **[OPEN] #5034 - 隐藏 MCP 详细状态通知**
    *   **重要性：** 低。用户希望提供一个设置项来屏蔽 MCP 服务器连接/断开时的冗余通知，减少控制台噪音。
    *   **社区反应：** 0 👍。
    *   [查看详情](https://github.com/github/copilot-cli/issues/5034)

10. **[OPEN] #4989 - 企业级 allowedMcpServers 匹配失败**
    *   **重要性：** 低。使用 `serverName` 配置允许的服务器列表时，匹配逻辑失效，导致所有命名服务器都被企业策略拦截。
    *   **社区反应：** 0 👍。
    *   [查看详情](https://github.com/github/copilot-cli/issues/4989)

## 4. 重要 PR 进展 (Top 10)

1.  **#5036 - 更新 README 中的默认模型版本**
    *   **内容：** 修正了 README 文档，使其与 CLI 当前默认使用的模型版本保持一致。
    *   **链接：** [PR #5036](https://github.com/github/copilot-cli/pull/5036)

*(注：过去24小时内仅有 1 条 PR 更新，主要集中在文档修正。)*

## 5. 功能需求趋势

从今日 Issue 数据分析，开发者社区的关注点主要集中在以下三个维度：

*   **MCP 与企业集成 (MCP & Enterprise Integration)**：占比约 30%。包括 MCP 服务器连接稳定性、Azure 集成、企业级 MCP 服务器白名单匹配、以及 GHEC 数据驻留环境的认证路由问题。
*   **会话与工作流控制**：占比约 25%。涉及会话恢复、工作树管理、任务模式切换（Autopilot）、以及 Agent 内部标记是否泄露到输出中。
*   **跨平台体验**：占比约 20%。主要集中在 macOS（系统更新导致的设备 ID 变更）和 Windows（CMD 窗口闪烁、路径大小写不敏感导致的重复加载）的兼容性 Bug。

## 6. 开发者关注点

*   **认证与权限精细度**：开发者越来越关注 AI 工具对 GitHub 账号的访问范围，希望有更细粒度的权限控制，而不仅仅是“全部读写”。
*   **稳定性与恢复能力**：特别是涉及 OAuth 重认证、系统更新重启后的会话恢复能力，这是影响开发者日常使用体验的关键痛点。
*   **配置管理的直观性**：对于企业版用户，如何在配置文件中精确控制 MCP 服务器和模型行为（如 `allowedMcpServers` 匹配规则）是一个持续的难点。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期**: 2026-10-02  
**数据来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
过去 24 小时内，OpenCode 社区主要聚焦于 **上游 API 认证错误** 和 **桌面端用户体验优化**。多个活跃订阅用户报告 Go 订阅服务出现 `401 Request blocked by upstream provider` 错误，导致付费模型无法使用。与此同时，桌面端界面存在 UI 冻结、侧边栏缺失及控制台闪烁等问题。开发侧则进行了多项清理工作，移除了过时的 S3 统计组件并修复了会话管理的边界问题。

---

## 2. 版本发布
无新版本发布。

---

## 3. 社区热点 Issues (Top 10)

1.  **[Bug] OpenCode Go: return 401 Request blocked by upstream provider**
    *   **重要性**: 🔥 **最高优先级** - 涉及付费订阅核心功能瘫痪。
    *   **详情**: 用户反馈 Go 订阅下的所有模型在调用 `chat/completions` 时均返回 401 错误，而 `/v1/models` 正常。创建者已确认这是服务器端问题。
    *   **链接**: [Issue #38257](https://github.com/anomalyco/opencode/issues/38257)

2.  **[Bug] `limit.output` in config is silently capped at 32k**
    *   **重要性**: 🔥 **高优先级** - 影响长上下文模型（如 DeepSeek/GPT）的使用。
    *   **详情**: 即使在配置文件中设置了高输出限制（如 384k），OpenCode 仍静默限制为 32k。这是目前仅有的官方“逃生舱”变量（`OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX`）所未能解决的硬性限制。
    *   **链接**: [Issue #29363](https://github.com/anomalyco/opencode/issues/29363)

3.  **[Desktop] UI freezes after agent turns finish — renderer stuck in ResizeObserver loop**
    *   **重要性**: ⚠️ **严重体验问题** - 导致桌面应用无法响应。
    *   **详情**: 交互结束后，渲染进程卡死在 ResizeObserver 循环中，仅能通过强制重启恢复。涉及版本 v1.18.18。
    *   **链接**: [Issue #43355](https://github.com/anomalyco/opencode/issues/43355)

4.  **[Bug] 401 AuthError: Request blocked by upstream provider**
    *   **重要性**: 🔥 **高频报错** - 重复出现，影响范围广。
    *   **详情**: 多名用户（Windows/macOS）报告 Go 订阅模型全部失效，仅免费模型可用。疑似与上游提供商策略变更有关。
    *   **链接**: [Issue #38195](https://github.com/anomalyco/opencode/issues/38195)

5.  **[Desktop] windows: console window flashes on every subprocess spawn**
    *   **重要性**: 🐛 **视觉干扰** - 影响多任务环境下的用户体验。
    *   **详情**: 每次执行 git/node 等命令时，控制台窗口会短暂闪烁并消失，造成视觉干扰。
    *   **链接**: [Issue #42440](https://github.com/anomalyco/opencode/issues/42440)

6.  **[Bug] Desktop app does not render inline LaTeX math ($...$)**
    *   **重要性**: 📝 **特定功能缺陷** - 影响学术和技术文档辅助。
    *   **详情**: 块级公式正常，但行内公式 `$...$` 显示为原始代码。这是继 CLI 版本后的又一处渲染遗漏。
    *   **链接**: [Issue #39170](https://github.com/anomalyco/opencode/issues/39170)

7.  **[Desktop] Sidebar missing**
    *   **重要性**: 🖥️ **界面导航问题** - 影响用户访问历史会话。
    *   **详情**: 在 v0.0.0-beta 版本中，侧边栏消失，视图切换失效，迫使用户回退至旧版 UI。
    *   **链接**: [Issue #28971](https://github.com/anomalyco/opencode/issues/28971)

8.  **[Desktop] New sessions created from sidebar never respond**
    *   **重要性**: 🔧 **初始化故障** - 阻止新会话创建。
    *   **详情**: 点击侧边栏“新建会话”后，发送消息无响应且无报错，但 CLI 模式正常。与文件系统路径解析有关。
    *   **链接**: [Issue #49561](https://github.com/anomalyco/opencode/issues/49561)

9.  **[Feature] Clickable microphone button in OpenCode Desktop app**
    *   **重要性**: 🎤 **新功能需求** - 填补桌面端语音交互空白。
    *   **详情**: 目前语音仅支持 TUI 快捷键，桌面端无鼠标交互入口，用户呼吁添加可点击的麦克风按钮。
    *   **链接**: [Issue #37742](https://github.com/anomalyco/opencode/issues/37742)

10. **[Bug] CLI: LaTeX math formulas rendered as raw text**
    *   **重要性**: 🐛 **跨平台渲染** - 终端显示问题。
    *   **详情**: 数学公式在终端中显示为纯文本而非渲染后的数学符号，影响可读性。
    *   **链接**: [Issue #34407](https://github.com/anomalyco/opencode/issues/34407)

---

## 4. 重要 PR 进展 (Top 10)

1.  **[OPEN] fix(session): delete reverted messages boundary-last and tie-break ids by raw order**
    *   **内容**: 修复会话中回退消息的 ID 边界和决胜逻辑，解决消息顺序混乱问题。
    *   **链接**: [PR #52588](https://github.com/anomalyco/opencode/pull/52588)

2.  **[OPEN] fix(core): report inactivity eviction in interrupted work**
    *   **内容**: 改进空闲会话清理时的工具失败消息，使其正确报告“因不活跃而中断”的具体原因。
    *   **链接**: [PR #52587](https://github.com/anomalyco/opencode/pull/52587)

3.  **[OPEN] chore(stats): retire legacy s3 lake**
    *   **内容**: 下线过时的 S3 统计组件（湖、工作组、桶），将相关配置迁移至 R2 统一管理。
    *   **链接**: [PR #52515](https://github.com/anomalyco/opencode/pull/52515)

4.  **[CLOSED] feat(app): show last turn changes in review panel**
    *   **内容**: 修复审查面板中“上一轮”模式无法选择且显示为空的问题，现已连接到路由。
    *   **链接**: [PR #51640](https://github.com/anomalyco/opencode/pull/51640)

5.  **[CLOSED] feat(app): add session history sidebar**
    *   **内容**: 在 v2 布局中添加持久化的项目/会话侧边栏，替代浮动标签页。
    *   **链接**: [PR #46670](https://github.com/anomalyco/opencode/pull/46670)

6.  **[CLOSED] feat(ui): support loading a custom theme from a URL**
    *   **内容**: 允许用户从 URL 加载私有主题 JSON，扩展了自定义外观能力。
    *   **链接**: [PR #46667](https://github.com/anomalyco/opencode/pull/46667)

7.  **[CLOSED] fix(tui): commit prompt selection before actions**
    *   **内容**: 优化 TUI 提交逻辑，确保在执行 slash 命令/技能前正确捕获 agent 和 model 选择。
    *   **链接**: [PR #46660](https://github.com/anomalyco/opencode/pull/46660)

8.  **[CLOSED] fix(tui): show session scrollbar by default for long chats**
    *   **内容**: 修复长会话滚动条默认隐藏的问题，提升长对话导航体验。
    *   **链接**: [PR #46650](https://github.com/anomalyco/opencode/pull/46650)

9.  **[CLOSED] fix(desktop): harden packaged Electron**
    *   **内容**: 强化 Electron 打包配置，禁用不安全入口点，启用 ASAR 完整性校验。
    *   **链接**: [PR #46632](https://github.com/anomalyco/opencode/pull/46632)

10. **[CLOSED] feat(ai): support freeform tool representations**
    *   **内容**: 增强工具表示的灵活性，支持 OpenAI 语法方言的原始对象输入，并优化历史记录处理。
    *   **链接**: [PR #46609](https://github.com/anomalyco/opencode/pull/46609)

---

## 5. 功能需求趋势
1.  **IDE/桌面端深度集成**: 针对桌面端（Electron）的 UI 交互（侧边栏、麦克风、自动接受权限）及进程控制（控制台闪烁）有大量需求。
2.  **长上下文与渲染优化**: 用户强烈要求提高输出 Token 限制（突破 32k）以及修复数学公式在终端/桌面端的渲染问题。
3.  **多语言支持**: 针对希伯来语、阿拉伯语等 RTL（从右向左）文本的 BiDi 渲染支持存在持续需求。
4.  **语音交互**: 桌面端缺乏语音输入入口，成为用户呼声较高的 Feature Request。

---

## 6. 开发者关注点
*   **上游服务稳定性**: 大量关于 `401 Request blocked` 的反馈表明，开发者对第三方 API（如 DeepSeek, GPT 等）的稳定性高度敏感，一旦订阅失效，核心工作流即刻中断。
*   **配置灵活性**: `limit.output` 的硬编码限制被多次提及，开发者希望在配置文件中能更精细地控制 Token 输出，而不依赖实验性环境变量。
*   **错误诊断**: 在遇到新会话无响应或 UI 冻结时，开发者缺乏详细的错误日志，导致排查困难（如 `FileSystem.realPath ENOENT`）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-10-02  
**仓库**: [badlogic/pi-mono](https://github.com/badlogic/pi-mono)

---

## 1. 今日速览

Pi 1.0.0 版本正式发布，默认开启全屏 TUI 模式，大幅提升沉浸式体验。与此同时，社区活跃度极高，过去24小时内处理了超过50个 Issues，主要集中在 TUI 渲染优化、MCP 安全性修复以及新模型/支付网关支持。

---

## 2. 版本发布

### **v1.0.0** (2026-10-02)
本次发布标志着 Pi 的重要里程碑，主要更新包括：
*   **默认全屏模式**: 终端界面默认全屏运行，提供更专注的交互体验。用户可通过设置 `tuiMode: "regular"` 恢复传统的滚动回溯模式。
*   **精简代码**: 开发者移除了部分冗余代码，使核心库更加轻量。
*   **相关文档**: 详见 [Terminal and display](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/docs/settings.md#terminal-and-display)。

---

## 3. 社区热点 Issues

以下是过去24小时内评论数最高的 Top 10 Issues，反映了用户最迫切的需求和痛点：

1.  **#5653 [OPEN] Move off Shrinkwrap**
    *   **重要性**: 高 (23 👍)
    *   **摘要**: 安装依赖时会产生两个 `pi-ai` 副本（hoisted 和 nested），导致 API 提供者注册表中的实例隔离，可能引发状态不一致问题。
    *   **链接**: [Issue #5653](https://github.com/earendil-works/pi/issues/5653)

2.  **#10031 [OPEN] Pi sporadically stuck in "Working..." when thinking is stopped with <esc>**
    *   **重要性**: 高 (19 👍)
    *   **摘要**: 用户反馈 ESC 停止思考后，Pi 经常卡在 "Working..." 状态，需强制重启。此 Bug 已持续约一个月（自 v0.84.0 起）。
    *   **链接**: [Issue #10031](https://github.com/earendil-works/pi/issues/10031)

3.  **#9688 [CLOSED] regression: clipboard copy doesn't work anymore**
    *   **重要性**: 中 (9 👍)
    *   **摘要**: 修复 OSC 52 剪贴板复制逻辑后，在交互容器中运行时失效，仅在 SSH 会话检测到时才触发。
    *   **链接**: [Issue #9688](https://github.com/earendil-works/pi/issues/9688)

4.  **#9255 [OPEN] TuiMainScreen: full-screen redraw storm when changed rows sit above the viewport top**
    *   **重要性**: 中 (9 👍)
    *   **摘要**: 长对话 transcript 在渲染时，因滚动逻辑问题导致剧烈的重绘闪烁或文本重复。
    *   **链接**: [Issue #9255](https://github.com/earendil-works/pi/issues/9255)

5.  **#9980 [OPEN] Calculated cost for top open models on OpenRouter is off by 2-3x**
    *   **重要性**: 中 (5 👍)
    *   **摘要**: OpenRouter 成本计算使用了最便宜的提供商定价，导致热门开源模型（如 GLM-5.3-flash）的费用预估严重偏低。
    *   **链接**: [Issue #9980](https://github.com/earendil-works/pi/issues/9980)

6.  **#9887 [OPEN] `read` tool call rendering in TUI breaks if line numbers are strings**
    *   **重要性**: 中 (5 👍)
    *   **摘要**: 某些模型（如 xiaomi/mimo-v2.6-flash）返回的 `offset`/`limit` 为字符串，导致 TUI 渲染时字符串拼接而非数字相加。
    *   **链接**: [Issue #9887](https://github.com/earendil-works/pi/issues/9887)

7.  **#10219 [CLOSED] MCP OAuth sign-in fails with "Invalid scope" when token response has `"scope": ""`**
    *   **重要性**: 中 (4 👍)
    *   **摘要**: 修复 Atlassian 登录时的 OAuth scope 为空时的认证失败问题。
    *   **链接**: [Issue #10219](https://github.com/earendil-works/pi/issues/10219)

8.  **#10252 [CLOSED] Support separate OAuth accounts for MCP entries sharing a URL**
    *   **重要性**: 中 (4 👍)
    *   **摘要**: 用户希望拥有多个 MCP 服务器实例（如不同工作区的 Slack）时能使用不同的 OAuth 登录，而不是共享凭据。
    *   **链接**: [Issue #10252](https://github.com/earendil-works/pi/issues/10252)

9.  **#10257 [OPEN] Switching to Codex fails with a custom-tool ID error**
    *   **重要性**: 中 (4 👍)
    *   **摘要**: 切换模型时，历史记录中的旧工具调用 ID 格式与新模型不兼容，导致聊天中断。
    *   **链接**: [Issue #10257](https://github.com/earendil-works/pi/issues/10257)

10. **#10250 [OPEN] pi startup inside tmux fills input box with hex color garbage**
    *   **重要性**: 中 (3 👍)
    *   **摘要**: 自 v0.99.0 起，在 tmux 3.6 中启动时，输入框会被预填充乱码颜色代码，仅影响 tmux 环境。
    *   **链接**: [Issue #10250](https://github.com/earendil-works/pi/issues/10250)

---

## 4. 重要 PR 进展

过去24小时内共有 10 个 PR 获得更新，其中多个已合并：

1.  **#10316 [CLOSED] feat(ai): add Cloudflare Clef classifiers to Workers AI**
    *   **内容**: 新增 Cloudflare Clef 决策模型到 Workers AI 目录，提供 27B 参数的文本分类支持。
    *   **链接**: [PR #10316](https://github.com/earendil-works/pi/pull/10316)

2.  **#10295 [CLOSED] feat(coding-agent): animate Sign in with Radius and add Radius intro**
    *   **内容**: 为 Radius 登录菜单添加了动态 Logo 动画效果，提升用户体验。
    *   **链接**: [PR #10295](https://github.com/earendil-works/pi/pull/10295)

3.  **#10293 [CLOSED] fix(coding-agent): keep pastel palettes pastel in the system theme**
    *   **内容**: 修复系统主题下颜色过于饱和的问题，确保 Pastel 配色方案保持柔和。
    *   **关联**: 关闭了 Issue #10255。
    *   **链接**: [PR #10293](https://github.com/earendil-works/pi/pull/10293)

4.  **#10290 [CLOSED] fix(coding-agent): coerce string read offset/limit in line range display**
    *   **内容**: 修复 `read` 工具渲染时，将字符串类型的参数强制转换为数字，防止拼接错误。
    *   **关联**: 关闭了 Issue #9887。
    *   **链接**: [PR #10290](https://github.com/earendil-works/pi/pull/10290)

5.  **#10286 [OPEN] fix(ai): use OpenRouter-reported total cost**
    *   **内容**: 修复 OpenRouter 成本计算不准确的问题，直接使用 API 返回的实际计费金额而非预估。
    *   **链接**: [PR #10286](https://github.com/earendil-works/pi/pull/10286)

6.  **#10275 [CLOSED] feat(ai): add Kenari as an API-key provider**
    *   **内容**: 新增 Kenari 作为内置 API Key 提供商，支持通过 `kn-` 前缀密钥登录。
    *   **链接**: [PR #10275](https://github.com/earendil-works/pi/pull/10275)

7.  **#10286 [OPEN] feat: unify package artifact validation**
    *   **内容**: 统一包工件验证逻辑，解决本地构建与发布流程不一致的问题。
    *   **链接**: [PR #10197](https://github.com/earendil-works/pi/pull/10197)

8.  **#10286 [OPEN] fix(ai): use OpenRouter-reported total cost**
    *   **内容**: 新增 LLM Gateway 作为 `openai-completions` 提供商，解决远程登录体验差的问题。
    *   **链接**: [PR #7610](https://github.com/earendil-works/pi/pull/7610)

9.  **#8383 [OPEN] fix(ai): send LOW to disable thinking on gemini-3.7-flash**
    *   **内容**: 修复 Gemini 3.7 Flash 模型无法禁用思考模式的问题，避免 400 错误。
    *   **链接**: [PR #8383](https://github.com/earendil-works/pi/pull/8383)

10. **#10194 [CLOSED] feat(ai): add copy code login method to Anthropic OAuth**
    *   **内容**: 为 Anthropic OAuth 登录流程增加“复制代码”模式，方便在远程环境下使用。
    *   **链接**: [PR #10194](https://github.com/earendil-works/pi/pull/10194)

---

## 5. 功能需求趋势

从 Issues 和 PR 的分析来看，社区关注点主要集中在以下三个方向：

1.  **终端交互体验 (TUI UX)**:
    *   全屏模式下的渲染性能（Issue #9255）、快捷键行为（Issue #10314）、输入框干扰（Issue #10250）。
    *   这表明随着 Pi 1.0.0 默认全屏，用户对“沉浸感”和“流畅度”的要求显著提高。

2.  **多模型与支付集成**:
    *   **新模型支持**: Cloudflare Clef (PR #10316)、Kenari (PR #10275)、LLM Gateway (PR #7610)。
    *   **成本计算**: OpenRouter 成本偏差 (Issue #9980)、OpenRouter 报告成本 (PR #10286)。
    *   反映了用户对多提供商支持和财务透明度的强烈需求。

3.  **MCP (Model Context Protocol) 安全与扩展**:
    *   **安全性**: Shrinkwrap 漏洞 (Issue #10288)、MCP OAuth Scope (Issue #10219)。
    *   **功能性**: Unix Socket 支持 (Issue #10247)、MCP 服务器延迟加载 (Issue #10253)。
    *   MCP 作为 Pi 的核心扩展能力，其稳定性和易用性是开发者关心的重点。

---

## 6. 开发者关注点

*   **性能与内存**: Issue #10308 提到空闲会话占用约 140MiB 内存，建议优化资源加载策略（如延迟加载语法高亮）。
*   **兼容性**: Issue #10256 提到 mintty 和 ConPTY 下的终端颜色查询泄露问题，影响 Windows 用户体验。
*   **代码质量**: Issue #10288 发现 `brace-expansion` 依赖存在高危漏洞，需更新 Shrinkwrap 锁定版本。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：** 2026-10-02
**分析范围：** GitHub QwenLM/qwen-code (过去24小时)

---

## 1. 今日速览
- **版本更新**：社区发布 v0.24.7-nightly 预览版，重点修复了代码模式文本对齐及权限处理问题。
- **架构演进**：Managed Agent（托管代理）的“双路径架构”路线图持续推进，社区正从 Stage D、E、F 向 G（会话历史权威化）迈进，旨在解决多会话环境下的数据一致性与竞态条件。
- **稳定性优化**：Web Shell 内存面板编辑、托管会话的取消接管以及 CI 流水线稳定性成为修复重点，旨在提升生产环境的健壮性。

---

## 2. 版本发布
**v0.24.7-nightly.20261001.a7deb01bcb**
- **核心修复**：修复代码模式文本与工具发现机制的对齐问题。
- **权限修复**：优化权限处理逻辑，确保批准流程得到正确执行。

---

## 3. 社区热点 Issues (Top 10)

| ID | 标题 | 优先级 | 状态 | 关键点 |
| :--- | :--- | :--- | :--- | :--- |
| **#12380** | [提案] Managed Agent 双路径架构定义 | P2 | Open | **路线图核心**。定义分阶段交付的托管代理架构，解决会话所有权、工具执行恢复及 Web Shell 集成问题，是当前架构演进的总纲。 |
| **#12867** | [功能] Stage D 后续功能 (生命周期、Turns、Actions) | P2 | Open | **架构落地**。继 D1-D3 后，推进持久化生命周期、Turn 和 Action 的实现，以及 Java 持久化配置，完善 API 契约。 |
| **#12952** | [功能] Stage G: 会话历史权威化与接管 | P2 | Open | **安全与竞态**。旨在外部化权威会话历史/检查点，证明写入者围栏和接管机制，防止会话所有权的竞争条件。 |
| **#13030** | [功能] 新 Hosted Workspace 配置支持只读搜索工具 | P2 | Open | **体验增强**。为托管环境增加 `list_directory`、`glob` 和 `grep_search` 工具，提升模型在隔离环境下的检索能力。 |
| **#12028** | [追踪] 非对话上下文 Token 治理 | P2 | Open | **性能优化**。关注系统提示词等常驻上下文在长上下文模型中的 Token 消耗，呼吁建立 Token 变更的基准测试与成本收益分析。 |
| **#12889** | [Bug] Deferred `tool_call` Schema 允许空参数 | P2 | Open | **功能缺陷**。工具调用在未提供参数时不应触发，当前实现可能导致模型调用包含必填字段的工具时出现异常。 |
| **#13157** | [Bug] Agent Host 权限流前缺少限制性守卫 | P2 | Blocked | **会话隔离**。在 Agent Host 模式下，当工具调用超出工作区范围时，权限流会被自动拒绝导致整个会话中断，需在权限流前增加隔离检查。 |
| **#13171** | [Bug] 取消接管流程在 Broker 替换时无法完成 | P2 | Open | **竞态修复**。当托管会话的所有者变更时，取消流程的被动接管负载无法正确结束，需要处理新的 Broker 响应状态。 |
| **#13145** | [Bug] MEMORY.md 索引链接截断导致链接失效 | P3 | Open | **索引错误**。内存索引构建器截断行时直接切断链接目标路径，导致索引中的超链接无法解析。 |
| **#13177** | [Bug] Web Shell 内存面板编辑时重写 CRLF | P2 | Open | **编辑体验**。Web Shell 内存面板使用 `mode: replace` 直接写入文件，导致换行符被标准化为 LF，破坏了原有的 CRLF 格式。 |

---

## 4. 重要 PR 进展 (Top 10)

| PR ID | 标题 | 作者 | 关键内容 |
| :--- | :--- | :--- | :--- |
| **#13179** | 硬化托管会话的提交重试与面板轮询 | wenshao | 四项健壮性修复：处理网络不确定失败（429/5xx）的提交重试、增加工作进程隔离、面板轮询逻辑，并附带新单元测试。 |
| **#13166** | 在新 hosted-workspace 配置中支持 glob 工具 | yiliang114 | 在 `hosted-workspace-files/2` 和 `hosted-workspace-shell/2` 配置中暴露只读 `glob` 工具，模型通过特定 Profile 决定可用性。 |
| **#13144** | 验证撤销收据并披露备份限制 | wenshao | 增加持久化 Hosted 撤销收据的验证逻辑，拒绝格式错误的身份、重复请求 ID，并处理不一致的冲突结果。 |
| **#13033** | 默认延迟 Agent 和 Goal 声明 | yiliang114 | 优化工具发现机制，默认情况下按需发现 `agent`、`goal` 相关工具，不再需要用户显式配置 `tools.eager`。 |
| **#13129** | 实现持久化 Hosted Hooks (H2) | wenshao | 实现私有托管工作区会话的持久化 Hook 目录、固定发生计划、意图执行记录及原生事件分发，支持原生工具路径的 Hook 拒绝。 |
| **#13163** | 停止被拒绝授权的绑定 Turn | yiliang114 | 修复取消和绑定工作区准入的代码，依赖 #13112，防止代理在拒绝授权后继续执行。 |
| **#13140** | 增强设置失败与沙箱命令流处理 | doudouOUC | 提升配置错误处理， malformed settings 现在返回 exit code 52，并改进沙箱命令流的健壮性。 |
| **#13156** | 保持 MEMORY.md 索引链接可解析 | yiliang114 | 修复索引构建器在 150 字符截断时切断链接的问题，确保链接目标完整且可访问。 |
| **#13165** | 停止向无法回答的查看者提供托管批准 | yiliang114 | 修复 Web Shell 中的 UX Bug，当服务返回 403 时，禁用“允许/拒绝”按钮，防止重复无效请求。 |
| **#13154** | 停止内存面板替换无法读取的全局 QWEN.md | yiliang114 | Web Shell 现在通过 Daemon 的内存路由读取全局记忆文件，不再使用沙箱文件 API，并阻止对无法读取文件进行保存。 |

---

## 5. 功能需求趋势

1.  **Managed Agent (托管代理) 架构落地**
    *   **趋势**：社区正从架构提案 (#12380) 向具体的功能阶段（Stage D-G）快速推进。核心关注点是如何在多会话、多 Worker 环境下实现会话历史的**持久化**、**竞态隔离**和**所有权转移**。
    *   **影响**：这标志着 Qwen Code 正从简单的聊天工具向企业级、高并发的多代理编排平台演进。

2.  **Token 上下文管理优化**
    *   **趋势**：随着长上下文模型的使用，非对话上下文（系统提示、工具 Schema）的 Token 消耗成为性能瓶颈。
    *   **影响**：社区呼吁建立 Token 变更的基准测试（#12028），以量化节省的 Token 和损失的任务成功率，这直接关系到云服务的成本控制。

3.  **隔离环境下的工具能力**
    *   **趋势**：为 Hosted Workspace 增加 `glob`、`grep_search` 等只读搜索工具（#13030, #13166），旨在平衡模型的安全性和功能性。

---

## 6. 开发者关注点

*   **数据一致性与竞态条件**：多 Issue (#12952, #13157, #13171) 都聚焦于“所有权”和“接管”机制，这是分布式系统中最棘手的问题，说明系统正在处理复杂的并发场景。
*   **编辑器/Web Shell 体验**：内存面板的链接截断 (#13145) 和换行符处理 (#13177) 问题虽然细节，但直接影响开发者的日常交互体验，社区反馈迅速。
*   **CI/CD 稳定性**：依赖审计失败 (#13078) 和测试不稳定 (#12714) 是阻碍主分支合并的主要因素，社区正通过回退 yamllint (#12650) 和增加超时时间 (#13172) 来解决。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026‑10‑02）

## 1. 今日速览
- 过去 24 小时内 **无新 Release**，但社区热度集中在 **Issue #6804**（中文本地化组织）与 **PR #6782**（0.10.1 版集成）两大议题。  
- 多条关键 **依赖升级**（Nixpkgs、fenix、React 等）以及 **底层执行预算修复**（MCP tools/call）在 PR 中陆续合并，提升了稳定性与跨平台兼容性。

---

## 2. 版本发布
> **暂无** 新的 Release。请关注即将到来的 v0.10.1（当前在 PR #6782 中预览）。

---

## 3. 社区热点 Issues（共 4 条，全部列出）

| # | 标题 / 关键字 | 作者 | 状态 | 关注点 | 备注 |
|---|---------------|------|------|--------|------|
| **6309** | *I want YOLO mode back*（功能回退请求） | weifeng89 | 已关闭 | 用户对当前交互模式的 “每次点击批准” 体验不满，期待恢复更快捷的 YOLO 模式。 | 讨论中有 6 条评论，未形成明确方案。 |
| **6804** | **号召：成立汉化组**（中文本地化） | SparkofSpike | 开放 | 项目文档大量英文，AI 翻译质量有限，社区希望组建专职汉化团队，提升中文用户可达性。 | 获得 2 条评论，已发起招募。 |
| **6814** | *Complete codewhale‑ratatui component catalogue*（文档/组件目录） | Hmbown | 开放 | 目标是完善 `codewhale‑ratatui` 组件清单并生成 README 示例画廊，提升库的可发现性与使用门槛。 | 尚无评论，属于内部工作流任务。 |
| **6792** | *FEAT‑026: finish session command shapes*（会话指令形状） | aboimpinto | 已关闭 | 完成 `session‑group` 的抽象与注册，实现更灵活的会话管理，涉及底层状态抽取。 | 已合并至主分支，标记为完成。 |

> **说明**：本次统计只包含过去 24 小时内有活动的 Issue，数量不足 10 条，已全部展示。

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 状态 | 关键改动 | 链接 |
|---|------|------|------|----------|------|
| **6782** | **v0.10.1 integration: wave/0.10.1‑next** | Hmbown | 开放 | 合并 0.10.1 版审计修复，整合 PR #6793、#6799、#6802，包含队列、撤销、Linux 权限等改进。 | https://github.com/Hmbown/Codewhale/pull/6782 |
| **6813** | *build(deps): bump nixpkgs* | dependabot[bot] | 开放 | 将 Nixpkgs 从 `6774f7b` 更新至 `7a0f122`，同步安全补丁与工具链升级。 | https://github.com/Hmbown/Codewhale/pull/6813 |
| **6812** | *build(deps): bump fenix* | dependabot[bot] | 开放 | 将 `fenix` 从 `48b35ac` 升至 `e659899`，去除不必要的 `x86_64-darwin` 系统支持。 | https://github.com/Hmbown/Codewhale/pull/6812 |
| **6811** | *build(deps): bump react & @types/react* | dependabot[bot] | 开放 | 前端依赖升级至 React 19.3.0，配套类型定义同步更新。 | https://github.com/Hmbown/Codewhale/pull/6811 |
| **6807** | *feat(pet): draw the Watch whale with desktop’s whale v2 contour* | Hmbown | 开放 | 为 “pet” 模块新增鲸鱼形状绘制，提升 TUI 交互趣味性。 | https://github.com/Hmbown/Codewhale/pull/6807 |
| **6805** | *feat(plugins): support reviewed OAuth AI providers* | LIghtJUNction | 开放 | 插件系统可声明经过审查的 OAuth AI 提供者，统一在 `extensions.net.codewhale.providers` 中配置。 | https://github.com/Hmbown/Codewhale/pull/6805 |
| **6741** | *fix(mcp): give tools/call its own request budget* | asto18089 | 已关闭 | 为 `tools/call` 单独分配请求预算，防止长时间运行的工具被误杀。 | https://github.com/Hmbown/Codewhale/pull/6741 |
| **6802** | *Land #6741 as itself: MCP tools/call budget* | Hmbown | 已关闭 | 将上述预算修复直接合并至主线，解决 fork 权限限制导致的 PR 无法合并问题。 | https://github.com/Hmbown/Codewhale/pull/6802 |
| **6799** | *Land asto18089's queue as itself* | Hmbown | 已关闭 | 批量合并 7 条来自贡献者的 PR（#6736‑#6744），包括搜索错误提示、工具超时处理等关键修复。 | https://github.com/Hmbown/Codewhale/pull/6799 |
| **6744** | *feat(engine): echo host submission id on TurnStarted* | asto18089 | 已关闭 | 引擎在 `TurnStarted` 事件中回显提交 ID，方便调试多轮对话的关联性。 | https://github.com/Hmbown/Codewhale/pull/6744 |

> 以上 PR 覆盖 **功能特性**（#6805、#6807）、**底层稳定性**（#6741‑#6744 系列）以及 **依赖安全升级**，是当前社区关注的重点。

---

## 5. 功能需求趋势

从本轮 Issue（4 条）可归纳出以下社区关注方向：

| 趋势 | 具体表现 |
|------|----------|
| **中文本地化** | Issue #6804 发起成立汉化小组，表明中文文档需求强烈。 |
| **交互体验简化** | Issue #6309 诉求恢复 “YOLO mode”，希望减少手动确认步骤，提高工作流效率。 |
| **组件可视化** | Issue #6814 旨在完善 `ratatui` 组件目录与 README 示例，提升库的可发现性。 |
| **会话管理抽象** | Issue #6792 关注 `session‑group` 的形状与抽取，体现对更灵活的多轮会话框架的需求。 |

整体来看，**可用性提升（本地化、交互简化）** 与 **内部结构可维护性（会话抽象、组件文档）** 是当前最热的需求。

---

## 6. 开发者关注点

1. **长时间工具调用被误杀**  
   - 多条 PR（#6741‑#6744）针对 `tools/call`、`image_analyze`、`js_execution` 等的超时与预算问题进行修复，说明开发者在实际使用中频繁遇到长任务被意外中止的痛点。

2. **依赖安全与跨平台兼容**  
   - 连续的 Dependabot PR（#6813、#6812、#6811、#6806）显示项目对 Nix、Rust、Node 生态的依赖高度敏感，安全更新被视为日常维护的必要工作。

3. **交互模式的可定制化**  
   - Issue #6309 与 PR #6805（OAuth provider 插件）共同反映出用户希望在 TUI 中拥有更灵活的交互与插件化能力。

4. **文档与示例的完整性**  
   - Issue #6814 与 PR #6799 中的文档/示例改进工作表明，社区对 **可视化文档、组件示例** 仍有较大需求，以降低新手上手门槛。

5. **本地化与社区组织**  
   - Issue #6804 的发起标志着中文社区希望形成组织化的本地化力量，这对提升 DeepSeek TUI 在中文市场的渗透率至关重要。

---

> **结论**：本日社区的核心动向是 **提升稳定性（预算/超时修复）** 与 **增强可用性（本地化、交互简化）**。建议项目在下一个里程碑中优先考虑 **YOLO 模式** 的实现、**中文文档** 的系统化建设，以及继续跟进 **依赖安全升级**。  

*如需查看完整的 Issue/PR 列表，请前往项目仓库：https://github.com/Hmbown/DeepSeek-TUI*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*