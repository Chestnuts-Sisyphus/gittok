# AI CLI 工具社区动态日报 2026-09-20

> 生成时间: 2026-09-19 21:56 UTC | 覆盖工具: 9 个

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

## Claude Code Skills 社区热点报告（截至 2026‑09‑20）

---

### 1. 热门 Skills 排行  *(按社区讨论度/关注度选取 8 条)*
| # | Skill 名称 | 功能概述 | 社区讨论热点 | 当前状态 |
|---|------------|----------|--------------|----------|
| **#1771** | **proofcore‑contract‑auditor** | 为 Web3 开发者提供 Solidity / Rust 合约的静态审计，并把零存储 Merkle 证明锚定到 TON 公链。 | ① 零知识证明在合约审计中的落地可行性 ② 对链上审计证明的安全模型审查 ③ 与 Claude Code 的 token‑efficiency 兼容性。 | **OPEN** |
| **#1703** | **md2video‑audio** | 将 Markdown 文档直接渲染为带真人语音旁白的 MP4 视频（基于 Marp + TTS）。 | ① 视频生成的质量/时长控制 ② 大文件/多语言 TTS 的成本 ③ 与 Claude Code “零成本”模型的配合方式。 | **OPEN** |
| **#822** | **AWT (AI Watch Tester)** | 零代码生成 UI E2E 测试，用 Claude Vision+Browser 控制完成页面交互、断言并生成报告。 | ① 对 UI 变化的鲁棒性（动态元素、弹窗） ② 报告格式与 CI/CD 集成 ③ 安全沙箱/浏览器权限。 | **OPEN** |
| **#525** | **pyxel** | 通过 Skill 引导在 Python 中创建、调试、验证复古像素游戏（帧检查、确定性运行、状态检查）。 | ① 对实时渲染帧的 token‑budget 影响 ② “头部‑无状态”调试方式的可行性 ③ 教学/娱乐双重定位。 | **OPEN** |
| **#1615** | **scnet‑hpc** | 为 SCNet HPC 集群提供基于 SSH/Slurm 的工作流（作业提交、模块加载、资源查询）。 | ① 多租户凭证安全 ② Slurm 作业模板的可定制化 ③ 与 Claude Code‑Agent 的长时会话保持。 | **OPEN** |
| **#1776** | **blast‑radius** | 执行批量或破坏性写操作前的安全检查清单（归档、权限撤销、审计日志）。 | ① “写‑前”校验的触发时机 ② 与企业合规（SOC2、GDPR）对齐的检查项 ③ 与现有 `skill‑creator` 触发器的兼容性。 | **OPEN** |
| **#1734** | **detect‑orphaned‑docx‑comments** | 自动发现并清理 Word 文档中孤立的批注（未关联段落/元素），防止文档损坏。 | ① 对大型文档的扫描性能 ② 与 `docx` 其他校验工具的协同 ③ 是否需要 UI‑preview。 | **OPEN** |
| **#1298** | **skill‑creator – trigger eval isolation** (Bug Fix) | 修复 trigger 评估在 Windows 与多进程环境下的误报/漏报问题。 | ① 触发率 0% 的根因（与 Issue #556 关联） ② 跨平台兼容性 ③ 对后续 Skill 质量评估的影响。 | **OPEN** |

> **链接示例**：`#1771` → https://github.com/anthropics/skills/pull/1771  

---

### 2. 社区需求趋势（从 Issues 提炼）

| 需求方向 | 关键痛点/期待 | 代表 Issues |
|----------|--------------|--------------|
| **安全 & 信任边界** | 防止社区 Skill 冒充官方 `anthropic/` 命名空间；防止恶意权限提升。 | #492（Trust‑boundary abuse） |
| **组织内部协作** | 支持组织级 Skill 共享、库管理、一次性分发链接，降低手动上传成本。 | #228（Org‑wide sharing） |
| **评估 & 触发可靠性** | `run_eval.py`、`skill‑creator` 触发率几乎为 0% → 需要更稳健的自动评估框架。 | #556、#1769、#1298 |
| **文档/排版质量** | 自动纠正排版错误（孤字、段落孤立、编号错位）以及 DOCX/PPTX 的编码/关系文件缺失。 | #514、#541、#538、#1790 |
| **工作流自动化** | HPC、批量写入前安全检查、区块链审计、Web3 合约验证等专业化流程的“一键” Skill。 | #1615、#1776、#1771 |
| **低代码内容生成** | Markdown→Video、Retro‑Game、OpenDocument、AI Testing 等“零代码”产出工具。 | #1703、#525、#822、#486 |
| **平台兼容性** | 在 Bedrock、MCP、AWS、Windows、Linux 多环境下的统一运行体验。 | #29、#16、#1742、#1362 |
| **资源/上下文管理** | 大型 Skill（如 `claude-api`）一次性注入过多 token，导致上下文窗口溢出。 | #1487 |

**趋势概括**：**安全可信 + 高效协作 + 自动化评估** 是社区当前最迫切的需求。

---

### 3. 高潜力待合并 Skills（评论活跃、尚未合并）

| PR | Skill | 关注要点 | 预计落地时间（社区估计） |
|----|-------|----------|--------------------------|
| **#1771** | proofcore‑contract‑auditor | Web3 合约安全、链上审计证明，已吸引多位区块链开发者关注。 | 1‑2 个月（需完成安全审计报告） |
| **#1703** | md2video‑audio | 内容创作类 “文档→视频”，对营销与培训团队需求强烈。 | 2‑3 个月（需完善 TTS 计费模型） |
| **#822** | AWT (AI Watch Tester) | 零代码 UI E2E 测试，已在多个内部 CI 项目试点。 | 1‑1.5 个月（等待浏览器沙箱审计） |
| **#525** | pyxel | 复古游戏开发教学/娱乐，社区玩家乐观。 | 2‑3 个月（需要封装 deterministic runtime） |
| **#1615** | scnet‑hpc | 企业级 HPC 作业自动化，已被几家科研机构列入试用名单。 | 1‑2 个月（需完善凭证管理） |
| **#1776** | blast‑radius | 批量写入安全检查清单，符合企业合规需求。 | 1‑1.5 个月（等待法律团队审阅） |
| **#1734** | detect‑orphaned‑docx‑comments | 文档清洁工具，已被大量企业文档自动化用户报出需求。 | 1‑2 个月（性能调优） |
| **#1298** | skill‑creator trigger eval fix | 关键底层 bug，解决后会提升所有 Skill 的评估可信度。 | 立即（已在内部回归测试） |

> **注**：以上 PR 均为 **OPEN**，但因评论与 issue 关联度高，预计在下一个发布周期（Claude Code 2.2）前合并。

---

### 4. Skills 生态洞察

> **一句话总结**：社区正围绕 **“安全可信的协作与自动化评估”** 构建更稳健、跨平台且低代码的 Skills 体系，以提升企业级工作流与内容生成的效率。  

---  

*本报告基于截至 2026‑09‑20 的 GitHub 数据编制，供内部产品规划与社区运营参考。*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



# OpenAI Codex 社区动态日报
**日期：2026-09-20**

---

## 1. 今日速览

过去24小时，Codex Rust CLI 连续发布 0.156.0-alpha.5 至 alpha.8 四个预发布版本，CLI 迭代节奏显著加快。社区关注焦点集中在 Windows 平台稳定性（WSL 项目创建失败、子代理进程泄漏）与数据安全风险（Full Access 沙箱下意外删除文件），同时 TUI 界面正在经历一轮大规模重构。

---

## 2. 版本发布

**rust-v0.156.0-alpha.5 ~ alpha.8**（连续4个版本）

- 版本发布频率密集，表明 0.156.0 正式版已进入快速迭代阶段
- 具体变更需在对应 Release 页面查看详细日志

| 版本 | 链接 |
|------|------|
| rust-v0.156.0-alpha.8 | https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.8 |
| rust-v0.156.0-alpha.7 | https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.7 |
| rust-v0.156.0-alpha.6 | https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.6 |
| rust-v0.156.0-alpha.5 | https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.5 |

---

## 3. 社区热点 Issues

### ① Windows WSL 项目创建/删除失败（👍 54）
**Issue #41290** — 切换 Agent Environment 至 WSL 后，项目创建和删除操作持续失败，影响 Windows + WSL 用户群体。

🔗 https://github.com/openai/codex/issues/41290

---

### ② Full Access 下需强制二次确认防止误删
**Issue #33624** — GPT-5.6 Subagent 在 Full Access 模式下错误展开清理路径，递归删除了用户 Mac 家目录近全部文件。社区呼吁对批量/家目录删除操作增加硬确认与恢复门禁。

🔗 https://github.com/openai/codex/issues/33624

---

### ③ Windows 上 Codex 跨项目范围大规模删除文件（CRITICAL）
**Issue #46022** — 正常项目开发过程中，Codex 意外删除了数百 GB 数据，涵盖无关项目、应用及 Windows 系统组件。数据丢失级别极高，已引发社区强烈关注。

🔗 https://github.com/openai/codex/issues/46022

---

### ④ Windows 桌面版首次回复后 Composer 无法发送后续消息
**Issue #44102 / #40872** — 两个独立 Issue 报告同一症状：完成第一个回复回合后，Composer 输入框持续禁用，需重启应用才能恢复。

🔗 https://github.com/openai/codex/issues/44102 · https://github.com/openai/codex/issues/40872

---

### ⑤ 项目配置污染：trusted_level 应分离出 config.toml
**Issue #14601** — 项目首次打开时的 trusted_level 权限设置写入全局 config.toml，导致多项目环境配置互相污染，获 81 个 👍，是社区长期呼声最高的功能需求之一。

🔗 https://github.com/openai/codex/issues/14601

---

### ⑥ macOS Codex Renderer 白屏且 CPU 占用达 120%
**Issue #46641** — ChatGPT macOS 桌面版 Codex 视图频繁白屏，Renderer 进程 CPU 异常飙升，强制终止该进程可临时恢复，影响正常开发工作流。

🔗 https://github.com/openai/codex/issues/46641

---

### ⑦ macOS 子代理会话导致 GPU 使用率高达 60-80%
**Issue #18181** — M4 Max MacBook Pro 在运行多子代理会话时 GPU 占用异常，用户反映设备发热严重，怀疑与渲染或并行任务调度有关。

🔗 https://github.com/openai/codex/issues/18181

---

### ⑧ TUI 提示编辑失败后队列输入永久挂起
**Issue #37974** — 在 TUI 中编辑较早的 prompt 并回退后，后续排队的输入永远无法被执行，需手动清除队列，获 13 个 👍。

🔗 https://github.com/openai/codex/issues/37974

---

### ⑨ Windows 重启历史子代理线程时产生重复 MCP 和 node_repl 进程
**Issue #37453** — 打开或恢复历史 Subagent 会话时，MCP 和 node_repl 进程栈重复创建，造成资源泄漏与性能下降。

🔗 https://github.com/openai/codex/issues/37453

---

### ⑩ gpt-6-astra 出现长时间自我矛盾循环，写入 ~1TB 临时文件
**Issue #46700** — 使用 gpt-6-astra max 模式执行简单规划任务时，模型陷入数天自我矛盾的循环，并在 /tmp 写入约 1TB 数据，严重影响使用体验。

🔗 https://github.com/openai/codex/issues/46700

---

## 4. 重要 PR 进展

| PR | 内容摘要 | 状态 |
|----|---------|------|
| **#46722** | 取消挂起的 Transcript Home 跳转，避免后续导航被历史加载覆盖 | ✅ CLOSED |
| **#46721** | 将 Transcript 滚动锚定至具体条目，改用视口渲染替代百分比滚动 | ✅ CLOSED |
| **#46720** | 跨测量与渲染阶段缓存 Transcript 布局，防止外部状态导致内容陈旧 | ✅ CLOSED |
| **#46719** | 将 TUI Transcript Overlay 提取为独立模块，提升代码可维护性 | ✅ CLOSED |
| **#46712** | 恢复 Recorder 容量压力下丢失的已执行工具调用元数据 | ✅ CLOSED |
| **#46711** | 使持久化 TUI 的 Activity Groups 和 Reasoning 显示与实时输出一致 | ✅ CLOSED |
| **#46710** | 恢复持久化 Transcript 中工具调用的详细信息（原仅保留基础状态摘要） | ✅ CLOSED |
| **#46697** | 统一 TUI Picker 样式，改进紧凑会话布局，移除旧版选择列表外观 | ✅ CLOSED |
| **#46680** | 提升 TUI 对比度与键盘提示可辨识度，优化 picker 紧凑布局 | ✅ CLOSED |
| **#46661** | macOS 文件系统助手启动时避免 fork，改用 Native Spawning 保留 socket 传fd支持 | ✅ CLOSED |

**PR 系列总览**：今日关闭的 PR 集中于 TUI 界面重构，涵盖 Transcript 渲染优化、Picker 样式统一、组件模块化，以及 macOS 进程启动方式改进。

🔗 PR 列表：https://github.com/openai/codex/pulls

---

## 5. 功能需求趋势

从 Issue 中可提炼出以下社区重点方向：

| 方向 | 典型 Issue | 热度 |
|------|-----------|------|
| **安全性与沙箱强化** | #33624, #46022, #40565 | 🔥 极高 |
| **Windows 平台稳定性** | #41290, #44102, #40872, #38290, #37453 | 🔥 极高 |
| **配置与权限管理** | #14601, #44437 | 🔥 高 |
| **性能与资源优化** | #46641, #18181, #33565, #46479 | 🔥 高 |
| **模型行为改进** | #46700, #44550 | 🔥 中高 |
| **CLI/TUI 体验** | #37974, #10972, #46448 | 🔥 中 |
| **跨平台一致性** | #17354, #44802 | 🔥 中 |
| **可访问性** | #46701 | 📌 新兴 |

---

## 6. 开发者关注点

**高频痛点汇总：**

1. **数据安全焦虑**：Full Access 模式下 Subagent 误删文件的事件（#33624、#46022）已触发多次，社区强烈要求增加不可逆操作的二次确认与回滚机制。

2. **Windows 平台 Bug 密集**：WSL 集成、子代理生命周期、进程泄漏、Composer 卡死等问题高度集中于 Windows，成为当前最严重的平台体验短板。

3. **配额与速率限制异常**：多个 Issue 反映用量计算不准确（#46689）、周配额无故归零（#44339）、模型满载时 Desktop 不自动降级（#44550）。

4. **TUI 历史会话体验缺陷**：Transcript 回看丢失详情（#17354）、提示编辑后队列挂起（#37974）、侧边会话结果无法返回主会话（#46717）。

5. **新模型稳定性待验证**：gpt-6-astra 出现长时间循环与异常磁盘写入（#46700），反映新版模型在长时间 Agent 场景下的可靠性风险。

---

*报告生成时间：2026-09-20 | 数据来源：github.com/openai/codex*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报
**日期：2026-09-20** | 数据来源：github.com/google-gemini/gemini-cli

---

## 1. 今日速览

Gemini CLI 发布 `v0.62.0-nightly.20260919`，核心修复 ConPTY 进程退出生命周期同步问题。社区持续关注 subagent 可靠性（挂起、恢复、轨迹可见性）与 Auto Memory 系统稳定性，同时 AST-aware 代码导航和持久化任务追踪两大功能 PR 已进入评审阶段。

---

## 2. 版本发布

### v0.62.0-nightly.20260919.gcfbcaa8df
- **修复**：同步 ConPTY 进程退出生命周期，加固 PTY 输出最终化处理
- **作者**：@jvargassanchez-dot, @gemini-cli-robot
- **PR**: [#29383](https://github.com/google-gemini/gemini-cli/pull/29383)

---

## 3. 社区热点 Issues

| # | 标题 | 亮点 | 链接 |
|---|------|------|------|
| #22323 | Subagent 在 MAX_TURNS 后错误报告 GOAL success | P1 级 bug，13 条评论，subagent 未完成任务却标记成功，掩盖真实中断原因 | [链接](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent 永久挂起 | 8 👍，简单操作（如建文件夹）也会导致挂起，禁用 subagent 可规避 | [链接](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | Zero-Dependency OS Sandboxing + Intent Routing | 提出利用 Gemini 3 的 bash 原生能力，同时保障安全，大颗粒度增强提案 | [链接](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #26525 | Auto Memory 确定性脱敏与日志缩减 | 安全问题，Auto Memory 在模型上下文建立后才尝试脱敏，存在泄露风险 | [链接](https://github.com/google-gemini/gemini-cli/issues/26525) |
| #26522 | Auto Memory 无限重试低信号会话 | 背景提取器对低质量会话反复 surfacing，消耗资源 | [链接](https://github.com/google-gemini/gemini-cli/issues/26522) |
| #21968 | Gemini 未充分使用 skills 和 sub-agents | 用户反馈需显式指令才会调用，自主性不足 | [链接](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22745 | AST-aware 文件读取/搜索/映射评估 | EPIC 级别功能探索，可精准读取方法边界，减少 token 浪费 | [链接](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21983 | Wayland 下 browser subagent 失败 | 环境兼容性问题，browser agent 在 Wayland 会话中无法正常终止 | [链接](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #18836 | 用持久化文件替代 WriteToDo | 当前 in-context 任务追踪导致 context rot 和跨会话记忆丢失，提案 CRUD 持久化方案 | [链接](https://github.com/google-gemini/gemini-cli/issues/18836) |
| #21335 | /compress 命令跨会话不持久 | 压缩后的摘要在 session resume 后丢失，需重新压缩 | [链接](https://github.com/google-gemini/gemini-cli/issues/21335) |

---

## 4. 重要 PR 进展

| # | 标题 | 状态 | 说明 | 链接 |
|---|------|------|------|------|
| #29396 | AST-aware structural search tool | Open | 实现 `ast_search` 工具，支持符号级精确导航，响应 #22745 | [链接](https://github.com/google-gemini/gemini-cli/pull/29396) |
| #29393 | Replace WriteToDo with persistent file-based tracking | Open | 用 TrackerService 替换 in-context WriteToDo，解决 context rot 问题 | [链接](https://github.com/google-gemini/gemini-cli/pull/29393) |
| #29411 | Fix resume latest to most recently active session | Open | 修复 `--resume` 优先选择最新启动而非最新活动的会话的 bug | [链接](https://github.com/google-gemini/gemini-cli/pull/29411) |
| #29402 | Make persistent state writes failure-safe | Open | 通过原子 rename 写入防止 state.json 被截断导致持久化状态丢失 | [链接](https://github.com/google-gemini/gemini-cli/pull/29402) |
| #29407 | Preserve shared references in JSON serialization | Open | 修复 OpenTelemetry 数组序列化时错误标记为 `[Circular]` 的问题 | [链接](https://github.com/google-gemini/gemini-cli/pull/29407) |
| #29368 | Resolve session/load by ID without resumable content | Open | 修复无 resume 内容时按 ID 加载 session 失败的问题 | [链接](https://github.com/google-gemini/gemini-cli/pull/29368) |
| #29404 | Add `gemini models list` with JSON output | Open | 新增 CLI 子命令，方便外部工具发现可用模型，避免硬编码模型 ID | [链接](https://github.com/google-gemini/gemini-cli/pull/29404) |
| #29286 | Implement Google search in RobustAutonomousAgent | Open | 在自主代理中集成 Google 搜索工具 | [链接](https://github.com/google-gemini/gemini-cli/pull/29286) |
| #29217 | Don't rewrite explicit gemini-2.5-flash selection | ✅ Closed | 修复 `--model gemini-2.5-flash` 被静默重写为 3.5 Flash 的 bug | [链接](https://github.com/google-gemini/gemini-cli/pull/29217) |
| #29201 | Preserve approved shell commands across retries | ✅ Closed | 修复多步 shell 注入确认后权限记忆丢失的问题 | [链接](https://github.com/google-gemini/gemini-cli/pull/29201) |

---

## 5. 功能需求趋势

1. **Subagent 可靠性与可观测性**：挂起恢复、轨迹可见性（#22598）、错误报告准确性成为高频痛点
2. **AST-aware 代码导航**：从 #22745 EPIC 到 #29396 PR，符号级精确搜索是明确演进方向
3. **持久化任务管理**：WriteToDo 的 in-context 局限推动 CRUD 持久化方案（#18836 → #29393）
4. **Auto Memory 系统硬化**：脱敏安全（#26525）、低信号过滤（#26522）、无效 patch 隔离（#26523）
5. **环境兼容性**：Wayland 支持、symlink agent 识别（#20079）、terminal resize 性能（#21924）
6. **外部集成能力**：`gemini models list` JSON 输出、MCP 策略一致性强化

---

## 6. 开发者关注点

| 痛点类别 | 具体表现 |
|----------|----------|
| **Subagent 稳定性** | Generalist agent 偶发永久挂起；browser agent 在 Wayland 下失败；MAX_TURNS 后错误报告 success |
| **状态持久化** | `/compress` 不跨会话保留；`--resume` 选错会话；state.json 写入中断导致数据丢失 |
| **安全与隐私** | Auto Memory 在上下文建立后才脱敏；shell wrapper 绕过策略检查 |
| **工具使用自主性** | Gemini 不主动调用 skills/sub-agents，需显式指令；超过 128 工具时触发 400 错误 |
| **上下文效率** | 大文件读取造成 context bloat；频繁创建 tmp 脚本增加清理负担 |
| **输出格式** | `\n` 转义处理异常导致终端显示问题 |

---

*报告生成时间：2026-09-20 | 分析模型：Agnes-2.0-Flash (Sapiens AI)*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-09-20  
**分析师**: AI 开发工具技术分析师

---

## 1. 今日速览
过去24小时内，社区活跃度较高，共更新 47 个 Issues。主要焦点集中在 **MCP (Model Context Protocol) 服务器集成**、**Linux/macOS 终端渲染体验**以及 **长会话内存管理** 等方面。虽然未发布新版本，但修复了多个平台兼容性和配置加载的关键 Bug。

---

## 2. 版本发布
无新版本发布。

---

## 3. 社区热点 Issues (Top 10)

**1. #4870 [OPEN] Figma MCP 服务器加载失败**
*   **重要性**: 🔴 高
*   **摘要**: Figma 托管的 MCP 服务器认证成功但无法注册工具，CLI 将 `-32601` 错误视为致命失败。
*   **社区反应**: 11 个 👍，表明这是很多设计工具集成用户的痛点。

**2. #4765 [CLOSED] 非 Git 仓库根目录配置读取失败**
*   **重要性**: 🔴 高
*   **摘要**: 在非 Git 仓库的工作区目录中，CLI 无法读取 `.mcp.json` 或 Hook 配置文件。
*   **社区反应**: 8 个 👍，影响多仓库工作流开发者。

**3. #4699 [OPEN] 长会话导致 JavaScript 堆内存溢出 (OOM)**
*   **重要性**: 🟡 中
*   **摘要**: 长时间运行 `--resume` 会话时，CLI 崩溃并写入诊断报告到用户当前工作目录。
*   **社区反应**: 6 个 👍，影响需要长时间专注工作的用户。

**4. #4069 [CLOSED] TUI 在 WSL2 + Windows Terminal 中卡死**
*   **重要性**: 🔴 高
*   **摘要**: 在 WSL2 环境下，CLI 在交互过程中出现屏幕清除、输入死锁以及 `EIO`/`EPIPE` 错误。
*   **社区反应**: 9 个 👍，反映了跨平台环境下的兼容性问题。

**5. #3439 [CLOSED] tmux/Cygwin 中 TUI 渲染严重滞后**
*   **重要性**: 🟡 中
*   **摘要**: 1.0.49 版本回归导致在 tmux 窗格中出现严重的渲染延迟和卡顿。
*   **社区反应**: 0 个 👍（但高优先级），影响大量使用 tmux 的开发者。

**6. #107 [CLOSED] Alpine Linux 上工具调用导致段错误**
*   **重要性**: 🟡 中
*   **摘要**: 在 Docker Alpine 容器中，CLI 的任何工具调用都会导致 Segmentation Fault。
*   **社区反应**: 4 个 👍，影响轻量级容器化工作流。

**7. #1381 [CLOSED] 非 Git 版本控制系统不支持 Rewind 功能**
*   **重要性**: 🟢 低
*   **摘要**: 用户请求支持非 Git 工具（如 jj），目前 Rewind 功能依赖 Git。
*   **社区反应**: 11 个 👍，功能请求类 Issue。

**8. #3481 [CLOSED] `long_context` 配置未在非交互会话中生效**
*   **重要性**: 🟡 中
*   **摘要**: 即使在配置中指定了 `contextTier: "long_context"`，非交互会话仍使用默认上下文窗口。
*   **社区反应**: 5 个 👍，影响对上下文窗口敏感的任务。

**9. #4913 [OPEN] Linux 下文本选择导致视口偏移**
*   **重要性**: 🟢 低
*   **摘要**: 在 Linux 终端（如 Ghostty + tmux）中，鼠标选择文本会意外移动视口，导致选择错位。
*   **社区反应**: 0 个 👍，UX 细节问题。

**10. #1801 [CLOSED] 自动模型选择功能请求**
*   **重要性**: 🟢 低
*   **摘要**: 请求在 CLI 中实现类似 VS Code 的自动模型选择功能，以平衡成本和性能。
*   **社区反应**: 10 个 👍，长期功能需求。

---

## 4. 重要 PR 进展
无 Pull Requests 更新。

---

## 5. 功能需求趋势

通过分析 Issues，社区关注的三大趋势如下：

1.  **MCP 生态系统扩展** (#4870, #4765)
    *   开发者正在积极将外部工具（如 Figma、Git、特定配置文件）通过 MCP 协议接入 CLI。
    *   **痛点**: 配置加载路径、服务器发现机制、认证流程的稳定性。

2.  **跨平台终端体验优化** (#3439, #4069, #4913)
    *   随着用户在 WSL2、tmux、Cygwin 等复杂环境下的使用增加，TUI 的渲染性能和交互稳定性成为瓶颈。
    *   **痛点**: 渲染延迟、输入阻塞、多窗口环境下的光标管理。

3.  **长上下文与会话管理** (#4699, #3481, #3621)
    *   对于需要处理大量代码或长时间运行的会话，内存管理（OOM）和上下文窗口配置（200K vs 1M）成为关键限制。
    *   **痛点**: 堆内存溢出、自动压缩循环、配置持久化。

---

## 6. 开发者关注点

*   **配置管理**: 在非标准目录或非 Git 仓库中读取配置文件的能力。
*   **系统兼容性**: Alpine Linux、WSL2、tmux 等环境的稳定性。
*   **会话恢复**: 长会话的内存管理和恢复机制。
*   **交互反馈**: 终端内的视觉反馈、无障碍支持（屏幕阅读器）、光标行为。

---

**数据来源**: [GitHub Copilot CLI Repository](https://github.com/github/copilot-cli)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期**: 2026-09-20
**仓库**: [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)
**分析范围**: 过去 24 小时动态

---

## 1. 今日速览
过去 24 小时内，Kimi Code CLI 社区主要围绕 **HTTP 通信稳定性** 进行了密集的修复与讨论。共有 12 个 Issue 和 5 个 PR 被更新，涉及 HTTP Header 验证、连接错误处理及非 UTF-8 编码兼容性。值得注意的是，多个与 `platform.version()` 和 IPv6 相关的连接问题被关闭，表明近期针对 Linux 平台的网络兼容性修复已生效；同时，Windows 环境下的编码错误修复（PR #2350）也取得了进展。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues

1.  **#2653 [OPEN] Bug: OpenCode Go returns 400 (Missing Header)**
    *   **重要性**: 高
    *   **摘要**: Windows 用户在使用 OpenCode Go provider 时遭遇 400 错误，报错提示缺少 `x-opencode-session` header。
    *   **社区反应**: 开启状态，等待修复。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/2653)

2.  **#1442 [CLOSED] Bug: Invoice Feature Missing**
    *   **重要性**: 中
    *   **摘要**: 用户询问如何进行开票操作，指出界面上没有开票窗口。
    *   **社区反应**: 已关闭（可能为误报或功能已实现）。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/1442)

3.  **#1266 [CLOSED] Bug: HTTP Header Validation Error (Trailing Whitespace)**
    *   **重要性**: 高
    *   **摘要**: Ubuntu 环境下因 `platform.version()` 包含尾随空格导致连接失败。
    *   **社区反应**: 已解决，修复了 Header 验证逻辑。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/1266)

4.  **#1371 [CLOSED] Bug: LLM Provider Connection Error**
    *   **重要性**: 高
    *   **摘要**: 在 Linux 环境下，`kimi-for-coding` 模型出现连接错误。
    *   **社区反应**: 已关闭，可能关联 IPv6 或 Header 问题。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/1371)

5.  **#1368 [CLOSED] Bug: Connection Error on Linux (Header Contains #)**
    *   **重要性**: 高
    *   **摘要**: 当 `platform.version()` 包含 `#` 字符时，Linux 系统发生连接错误。
    *   **社区反应**: 已关闭，修复了非法 Header 值的处理。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/1368)

6.  **#1364 [CLOSED] Bug: Connection Error on Ubuntu (Illegal HTTP Header Value)**
    *   **重要性**: 高
    *   **摘要**: Ubuntu 22.04.1 上因非法 HTTP Header 值导致 `kimi chat` 失败。
    *   **社区反应**: 已关闭。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/1364)

7.  **#1495 [CLOSED] Enhancement: VSCode Extension Plan Location Config**
    *   **重要性**: 中
    *   **摘要**: 请求在 VSCode 扩展中增加配置项，允许自定义 Plan Mode 生成的文件保存位置（如 `~/.kimi/plans`）。
    *   **社区反应**: 已关闭（可能已实现或需求变更）。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/1495)

8.  **#2182 [Related] Fix(shell): attach dropped image paths eagerly**
    *   **重要性**: 中
    *   **摘要**: PR #2183 关联的 Issue，涉及图像路径处理的优化，防止路径丢失。
    *   **社区反应**: 正在修复中。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/2182)

9.  **#2313 [Related] Fix: tolerate non-utf8 worker output**
    *   **重要性**: 中
    *   **摘要**: PR #2350 关联的 Issue，涉及解决 Windows 环境下非 UTF-8 编码输出导致的崩溃。
    *   **社区反应**: 正在修复中。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/2313)

10. **#2178 [Related] Fix: add Windows binary version info**
    *   **重要性**: 低
    *   **摘要**: PR #2181 关联的 Issue，涉及修复 Windows 版本信息的显示。
    *   **社区反应**: 正在修复中。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/issues/2178)

---

## 4. 重要 PR 进展

1.  **PR #2350 [OPEN] fix: tolerate non-utf8 worker output**
    *   **内容**: 修复 Web Session Runner 的解码逻辑，使其能处理 Windows 下 Child Process 输出的 locale-encoded bytes (如 cp1252)，防止因单个无效字节导致整个 worker 输出被隐藏。
    *   **状态**: 开放中。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/pull/2350)

2.  **PR #2183 [OPEN] fix(shell): attach dropped image paths eagerly**
    *   **内容**: 优化提示词提交逻辑，当模型支持图片输入时，立即读取本地图片路径并发送 `ImageURLPart`，而不是依赖后续的 `ReadMediaFile` 机制。
    *   **状态**: 开放中。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/pull/2183)

3.  **PR #2181 [CLOSED] fix: add Windows binary version info**
    *   **内容**: 生成 PyInstaller 版本信息文件，并将其注入到 Windows 的 `.spec` 构建配置中，确保 Release 版本显示正确的文件版本号。
    *   **状态**: 已合并。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/pull/2181)

4.  **PR #2200 [CLOSED] fix(shell): adapt timeouts for long commands**
    *   **内容**: 针对慢速命令（如 git submodule、构建等）自动延长 Shell 超时时间，同时保持普通命令的 60s 默认超时，防止误杀正常的长耗时操作。
    *   **状态**: 已合并。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/pull/2200)

5.  **PR #2259 [CLOSED] fix: redirect stdio MCP stderr to logs**
    *   **内容**: 重定向 stdio MCP 服务器的 stderr 输出到日志文件（`~/.kimi/logs/mcp/<server>.log`），避免在交互式终端中泄露敏感日志信息。
    *   **状态**: 已合并。
    *   [链接](https://github.com/MoonshotAI/kimi-cli/pull/2259)

---

## 5. 功能需求趋势

根据过去 24 小时更新的 Issues 分析，社区关注点主要集中在以下三个方向：

1.  **跨平台网络与编码兼容性 (Linux/Windows)**:
    *   绝大多数 Closed Issues 都集中在 HTTP Header 验证（`platform.version()` 中的空格、特殊字符、非法值）以及 IPv6 连接问题。这表明社区在 Linux 环境下的使用率较高，且对网络请求的健壮性有较高要求。
2.  **输出流处理与错误恢复**:
    *   新增的 Open Issue (#2653) 涉及 Windows 特有的编码问题，而 PR #2350 正在修复非 UTF-8 输出导致的崩溃。开发者开始关注 Worker 进程输出流的完整性，特别是在混合编码环境下。
3.  **IDE 集成与配置灵活性**:
    *   之前关闭的 Issue #1495 显示，用户希望更灵活地配置 Plan 模式的保存路径，这反映了在 VSCode 等集成开发环境中，用户对文件组织结构有定制化需求。

---

## 6. 开发者关注点

1.  **HTTP Header 规范化**: 多次报告指出 `platform.version()` 函数返回的字符串包含尾随空格或特殊字符（如 `#`），导致后端验证失败。开发者需要确保客户端生成的 HTTP Header 符合 RFC 标准，去除不必要的空白。
2.  **Worker 进程的异常捕获**: 在 Windows 平台上，子进程输出可能包含非标准 UTF-8 字节，导致主进程直接崩溃。开发者需要增强 `UnicodeDecodeError` 的捕获与降级处理能力，或者使用更宽松的解码策略。
3.  **长耗时命令的超时管理**: Shell 交互中，Git 操作或构建过程容易超过默认的 60s 超时限制。开发者需要实现更智能的动态超时机制，能够识别上下文并延长超时时间。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期**: 2026-09-20
**来源**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 1. 今日速览
过去24小时内，OpenCode 社区活跃度较高，主要集中在 **桌面端性能优化**（修复 ResizeObserver 导致的 CPU 空转）和 **CLI/Web 交互改进**（如会话选择器、VS Code 插件启动契约修复）。同时，社区对 **MCP (Model Context Protocol)** 集成的稳定性和 **Free Tier 使用限制** 的讨论热度上升。

---

## 2. 版本发布
**无新版本发布**。

---

## 3. 社区热点 Issues (Top 10)
以下 Issues 反映了当前最活跃的讨论方向：

1.  **[OPEN] Payment Declined After 3 Months Despite No Issue With Card or Bank** (#45278)
    *   **重要性**: 高 - 涉及付费订阅的稳定性。
    *   **摘要**: 用户报告卡支付被突然拒绝，尽管卡片和银行均无问题。银行已确认，怀疑 OpenCode 或其支付网关存在异常。
    *   **反应**: 21 个评论，5 个点赞。

2.  **[OPEN] OpenCode immediately enters auto-compaction loop and stops generating responses** (#30680)
    *   **重要性**: 高 - 核心功能崩溃。
    *   **摘要**: OpenCode 进入无限自压缩循环并消耗 Token，最终完全停止生成回复，导致会话卡死。
    *   **反应**: 18 个评论。

3.  **[OPEN] [BUG] MCP tools connected but not exposed to agent** (#33027)
    *   **重要性**: 高 - 功能集成缺陷。
    *   **摘要**: MCP 服务器连接成功并暴露了工具列表，但代理无法识别或使用这些工具。
    *   **反应**: 13 个评论，4 个点赞。

4.  **[OPEN] [FEATURE]: To be able to remove or change email in OpenCode Zen** (#18654)
    *   **重要性**: 中 - 用户体验痛点。
    *   **摘要**: 用户希望能在 Zen 界面中移除或更改邮箱，因为更改 GitHub 邮箱后出现了重复用户问题。
    *   **反应**: 8 个评论，16 个点赞（高需求）。

5.  **[OPEN] Opencode freezes / becomes unresponsive mid-session** (#34214)
    *   **重要性**: 高 - 会话稳定性。
    *   **摘要**: 在长时间多轮工具调用后，应用突然停止响应，UI 冻结，需强制重启。
    *   **反应**: 7 个评论。

6.  **[OPEN] Error from provider (Console): OpenCode's free tier can only be used from within OpenCode** (#49680, #49858)
    *   **重要性**: 中 - 免费层使用限制。
    *   **摘要**: 用户在使用第三方代理（如 Pi Agent）时收到错误，提示免费层只能在 OpenCode 内部使用，尽管文档宣称支持无锁定。
    *   **反应**: 6-8 个评论。

7.  **[OPEN] [Desktop] UI freezes after agent turns finish — renderer stuck in ResizeObserver loop** (#43355)
    *   **重要性**: 高 - 桌面端渲染问题。
    *   **摘要**: 桌面应用在助手回合结束后冻结，渲染器陷入 ResizeObserver 循环风暴，导致窗口完全无响应。
    *   **反应**: 6 个评论。

8.  **[OPEN] Getting Free Usage Exceeded On The First Session Of The Week** (#49927)
    *   **重要性**: 中 - 计费逻辑问题。
    *   **摘要**: 用户一周未使用，首次开启会话时立即提示“免费额度超出”，而非从新的一天重新计算。
    *   **反应**: 6 个评论。

9.  **[OPEN] [2.0] ChatGPT model-name filter hides explicitly configured Daybreak model** (#49806)
    *   **重要性**: 中 - 2.0 版本兼容性。
    *   **摘要**: 在 ChatGPT OAuth 认证下，特定的 Daybreak 模型在 2.0.8 版本中被过滤隐藏。
    *   **反应**: 2 个评论。

10. **[OPEN] [2.0] Chat outputs corrupted internal parameter/tool text and gets stuck in Thinking** (#50049)
    *   **重要性**: 中 - 输出质量与稳定性。
    *   **摘要**: 桌面端输出出现大量乱码，显示内部参数文本和 XML 标签，导致聊天卡在“Thinking”状态。
    *   **反应**: 1 个评论。

---

## 4. 重要 PR 进展 (Top 10)
以下 PR 正在解决关键 Bug 和提升性能：

1.  **[OPEN] feat(tui): v2 open session selector with -s** (#50052)
    *   **内容**: 为 TUI 添加 `opencode -s` 命令，用于快速打开会话列表，无需输入 Session ID。
    *   **状态**: 新功能开发中。

2.  **[OPEN] fix(tui): ErrorBoundary around plugin Slot so broken plugins cannot crash the TUI** (#50048)
    *   **内容**: 修复 TUI 崩溃问题。为插件侧边栏的 `Slot` 组件添加错误边界，防止单个损坏的插件导致整个界面崩溃。
    *   **状态**: 修复中。

3.  **[OPEN] fix(core): prefer Windows .cmd over nvm .ps1 shims when spawning npm/npx** (#50050)
    *   **内容**: 修复 Windows 环境下，执行 `npm` 或 `npx` 时弹出记事本显示 `.ps1` 文件的问题。改为优先使用 `.cmd` 文件。
    *   **状态**: 修复中。

4.  **[OPEN] fix(mcp): treat trailing-slash issuer identifiers as equivalent** (#50046)
    *   **内容**: 修复 MCP OAuth 连接问题。解决 JumpCloud 等 Provider 的 Issuer ID 尾部斜杠导致的元数据不匹配错误（回归问题）。
    *   **状态**: 修复中。

5.  **[OPEN] fix(cli): foreground serve matches VS Code extension startup contract** (#50047)
    *   **内容**: 修复 VS Code 扩展启动失败问题。确保 `opencode serve` 在前台运行时打印正确的 stdout 标记，并处理未认证请求。
    *   **状态**: 修复中。

6.  **[OPEN] fix(desktop): boot the renderer alongside the main process** (#50044)
    *   **内容**: 性能优化。桌面端渲染器现在与主进程并行启动，而不是等待主进程构建完成，加快应用启动速度。
    *   **状态**: 优化中。

7.  **[OPEN] fix(core): pin the session to http after repeated websocket stream losses** (#50031)
    *   **内容**: 网络稳定性修复。当 WebSocket 流持续丢失时，将会话协议回退到 HTTP，防止无限重试。
    *   **状态**: 修复中。

8.  **[CLOSED] [automated-pr-cleanup] fix(core): bypass poisoned markdown cache** (#42558)
    *   **内容**: 修复 Markdown 解析缓存被污染的问题，防止解析失败导致技能/代理配置丢失。
    *   **状态**: 已合并。

9.  **[CLOSED] [needs:issue] perf(app): break ResizeObserver feedback loop in composer docks** (#50013)
    *   **内容**: 性能修复。解决桌面端在空闲时 CPU 占用高达 76% 的问题，通过断开 ResizeObserver 的反馈循环。
    *   **状态**: 已合并。

10. **[OPEN] feat(opencode): local LAN provider discovery + auto-discover models** (#27554)
    *   **内容**: 新功能。在 `/connect` 页面添加本地局域网 (LAN) 发现，自动发现并连接本地 OpenAI 兼容服务器。
    *   **状态**: 功能开发中。

---

## 5. 功能需求趋势
从 Issues 和 PR 分析，社区关注点主要集中在：

*   **MCP 工具集成与稳定性**: 社区高度依赖 MCP 协议连接外部工具（如 JumpCloud），对其连接性、OAuth 认证及工具暴露机制的稳定性反馈强烈。
*   **桌面端性能优化**: 针对 Electron 桌面应用，高频反馈 UI 冻结、ResizeObserver 循环导致的 CPU 空转以及启动速度问题。
*   **会话管理体验**: 需求集中在 TUI 和 Web 界面的会话快速选择、移动会话目录以及会话导出功能的完善。
*   **多环境兼容性**: Windows 环境（nvm、PowerShell vs CMD）下的工具调用兼容性问题依然突出。

---

## 6. 开发者关注点
*   **启动与响应速度**: 开发者抱怨桌面应用在长时间使用后变卡，且存在 Idle 状态下的资源浪费（高 CPU/GPU）。
*   **付费与计费逻辑**: 订阅续费失败和免费额度重置逻辑的 Bug 影响用户体验，社区呼吁更透明的计费机制。
*   **日志与调试**: 当出现崩溃或卡死时，开发者难以定位是 Core 后端还是 Renderer 前端的问题，需要更清晰的日志。
*   **模型输出完整性**: 部分模型（如 deepseek-v4-flash）在特定条件下输出不完整或被截断。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报
**日期**: 2026-09-20  
**数据范围**: 2026-09-19 过去24小时

---

## 1. 今日速览

今日 Pi 社区在 **TUI 交互体验优化** 和 **崩溃恢复机制修复** 方面进展显著。开发团队集中修复了会话压缩时的认证取消问题、工具调用超时机制以及终端渲染延迟等关键 Bug。同时，社区对于 **IDE 集成**（Meta Model API）和 **启动性能优化** 的讨论持续活跃，反映了开发者对提升生产力工具效率的强烈需求。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 社区热点 Issues

以下是过去24小时内更新且值得关注的 10 个 Issue：

1.  **[OPEN] Move off Shrinkwrap** (#5653)
    *   **重要性**: **架构级重构**。直接依赖 `pi-ai` 和 `pi-coding-agent` 会导致模块重复加载，影响 API 调用的一致性。
    *   **状态**: 正在讨论中，已有 20 条评论。

2.  **[CLOSED] 0.84.3 bundled CLI: every global extension fails** (#8620)
    *   **重要性**: **严重稳定性问题**。升级后所有扩展因找不到模块而崩溃，属于阻塞性 Bug。
    *   **状态**: 已解决。

3.  **[OPEN] Set a startup-time budget targeting jcode-comparable latency** (#7739)
    *   **重要性**: **性能优化**。针对启动延迟设定预算，缩小与竞品 jcode 的性能差距。

4.  **[CLOSED] tui(latex): legacy font switches force whole-block raw fallback** (#8827)
    *   **重要性**: **排版 Bug**。LaTeX 数学公式中的旧版字体切换命令导致渲染错误，影响技术文档阅读。

5.  **[CLOSED] After compaction, stale signed thinking blocks are replayed** (#9391)
    *   **重要性**: **上下文处理缺陷**。会话压缩后，旧的有损思考块会被重复发送，导致 Anthropic API 拒绝。

6.  **[CLOSED] Auto-compaction authentication wait has no progress or cancellation** (#9777)
    *   **重要性**: **用户体验 (UX)**。自动压缩等待认证时，用户无法取消操作，导致界面假死。

7.  **[CLOSED] before_provider_request does not fire for summarization** (#9773)
    *   **重要性**: **插件开发痛点**。文档承诺的事件在摘要/压缩请求时未触发，影响 Hook 扩展。

8.  **[CLOSED] Hidden thinking blocks render stray blank lines** (#9765)
    *   **重要性**: **TUI 视觉 Bug**。隐藏思考块时产生多余的空行，破坏界面整洁度。

9.  **[CLOSED] find and grep tools have no timeout mechanism** (#9770)
    *   **重要性**: **安全与稳定性**。工具调用无超时机制，被强制终止时可能返回“空成功”结果，误导模型。

10. **[CLOSED] macOS Terminal.app leaks process env into window title** (#9766)
    *   **重要性**: **环境兼容性**。macOS 原生终端会将环境变量显示在标题栏，可能泄露敏感信息。

---

## 4. 重要 PR 进展

以下是过去24小时内更新的 10 个关键 PR：

1.  **[CLOSED] fix(coding-agent): stop recovery after prompt cancellation** (#9781)
    *   **内容**: 修复了在取消提示后仍触发重试或自动压缩的问题。
    *   **关联**: 解决了 #9340。

2.  **[CLOSED] fix(coding-agent): expose cancellable auto-compaction auth** (#9779)
    *   **内容**: 修复了自动压缩在等待认证时无法被取消的缺陷。
    *   **关联**: 解决了 #9777。

3.  **[CLOSED] fix(tui): handle CJK punctuation in file autocomplete** (#9746)
    *   **内容**: 修复了中文标点符号后无法触发文件自动补全的 Bug。

4.  **[CLOSED] feat(coding-agent): add prompt cache warming** (#9668)
    *   **内容**: 实验性功能，为 Anthropic 提供商预热 Prompt 缓存，提升响应速度。

5.  **[OPEN] Per thinking sampling parameters** (#9776)
    *   **内容**: 新特性，允许针对不同的思考级别（thinking level）设置独立的采样参数，以适应不同模型的需求。

6.  **[CLOSED] fix(tui): stop main-screen scrollback clear/replay and ConPTY autowrap drift** (#9772)
    *   **内容**: 修复了主屏幕渲染时的换行符漂移问题，优化了 Windows Terminal 下的滚动体验。

7.  **[CLOSED] fix(coding-agent): make tool cwd resolution opt-in** (#9483)
    *   **内容**: 优化工具当前工作目录的解析逻辑，增加了向后兼容性。

8.  **[OPEN] feat(ai,coding-agent): add Meta provider with Muse subscription OAuth** (#9096)
    *   **内容**: **新模型支持**。添加 Meta 的 Muse Spark 模型支持，并实现 OAuth 登录流程。

9.  **[OPEN] feat(coding-agent): upgrade Mermaid terminal rendering** (#8158)
    *   **内容**: 升级 Mermaid 图表在终端中的渲染能力。

10. **[OPEN] feat(coding-agent): add pi.dev compatibility check** (#9763)
    *   **内容**: 自动化兼容性检查，将 PR 提交自动同步到 pi.dev 工作流，确保版本一致性。

---

## 5. 功能需求趋势

从 Issues 和 PR 的分析来看，开发者关注点主要集中在以下三个方向：

1.  **性能与稳定性**：
    *   **启动延迟**：社区对启动速度要求极高，希望达到 jcode 级别。
    *   **崩溃与取消**：如何优雅地处理请求取消、压缩失败和认证超时是高频痛点。
    *   **资源清理**：解决模块重复加载（Shrinkwrap 问题）和内存泄漏。

2.  **IDE 与终端集成体验 (TUI/IDE)**：
    *   **中文支持**：修复中文标点补全和终端标题泄露问题。
    *   **渲染优化**：修复 LaTeX 渲染错误、终端调整窗口后的延迟重排（~1s 延迟）。
    *   **交互增强**：双击编辑历史消息、QR 码登录、硬件光标显示。

3.  **模型生态扩展**：
    *   **新模型接入**：Meta Muse Spark、Qwen Token Plan (glm-5.3, deepseek-v4.1-flash)。
    *   **API 兼容性**：修复 npm 搜索索引问题，确保包管理器正常工作。

---

## 6. 开发者关注点

1.  **工具调用安全性**：`find` 和 `grep` 工具缺乏超时机制，可能导致模型在收到“空结果”时产生幻觉。
2.  **插件系统架构**：`before_provider_request` 事件未在所有请求类型（如压缩）中触发，限制了插件开发。
3.  **RPC 模式兼容性**：在 headless RPC 模式下，`set_thinking_level` 等状态同步存在延迟。
4.  **依赖管理**：多包依赖下的模块 hoisting 和 shrinkwrap 问题影响了代码库的整洁性和运行时性能。

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