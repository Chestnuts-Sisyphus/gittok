# AI CLI 工具社区动态日报 2026-09-26

> 生成时间: 2026-09-25 22:57 UTC | 覆盖工具: 9 个

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

这是一份基于 2026-09-26 各 AI CLI 工具社区动态的横向对比分析报告。

### 1. 生态全景
当前 AI CLI 开发工具已进入“架构深水区”与“生态扩展期”。工具的核心重心已从基础的指令生成，全面转向**多代理（Multi-agent）协调**、**工具调用标准化（MCP）**以及**IDE 深度融合**。各项目正面临从原型向生产级稳定架构转型，开发者高度关注跨平台兼容性、复杂工作流的稳定性及端侧性能调优，标志着该领域正从“功能堆砌”向“体验工程”进阶。

### 2. 各工具活跃度对比

| 工具 | 今日 Issues 新增 | 今日 PR 更新 | Release 活跃度 | 核心状态 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI Codex** | 极高 (多项痛点) | 10 | v0.157.0 正式版 | 稳健，正处理 Windows 兼容性灾难 |
| **Gemini CLI** | 高 | 10 | v0.62.0-nightly | 高速迭代，重点优化并发可靠性 |
| **Github Copilot** | 46 | 0 | v1.0.89-4 | 平台级集成，生态限制引发社区质疑 |
| **Pi (pi-mono)** | 高 | 10 | 无 | 实验性功能集成期 (MCP/Codemode) |
| **Qwen Code** | 高 | 10 | v0.24.5-nightly | 架构演进中 (Managed Agent) |
| **DeepSeek TUI** | 中 | 10 | 无 | 架构重构期 (TypeScript 迁移) |

---

### 3. 共同关注的功能方向
*   **MCP (Model Context Protocol) 集成**：Pi、Gemini、DeepSeek TUI 均在重推 MCP，旨在打破模型与本地工具的壁垒。
*   **多代理架构与协调**：Qwen Code (Managed Agent)、DeepSeek TUI (Subagent Store) 及 Gemini CLI 都在解决 Agent 间资源竞争与状态同步问题。
*   **跨平台兼容性与资源隔离**：Windows 的终端闪烁（Codex）、进程泄漏（Qwen）、ARM64/WSL2 兼容性（Copilot/Gemini）是当前所有 CLI 工具的共有痛点。

---

### 4. 差异化定位分析
*   **OpenAI Codex**：**生态霸主**。专注于高性能、多模型支持（GPT-6），不仅是 CLI，更追求全平台（Desktop/Remote）的一致性，但因追求大而全导致 Windows 下 daemon 进程过重。
*   **Gemini CLI**：**性能与工程先锋**。深度聚焦并发安全与自动化流水线，PR 质量高，侧重于解决 Agent 在复杂生产环境下的挂起与竞态问题。
*   **Github Copilot CLI**：**企业级插件化**。定位为 GitHub 开发工作流的延伸，对插件市场有严格管控，关注点在于与 IDE 和 GitHub 平台的无缝衔接。
*   **Qwen Code / DeepSeek TUI**：**灵活性与自主性**。更倾向于社区驱动的架构实验（如 TypeScript 迁移、Managed Agents 架构），面向希望自定义工作流的高级开发者。

---

### 5. 社区热度与成熟度
*   **最成熟：OpenAI Codex**。虽 Issue 频发，但反馈密度最高，修复速度快，是企业用户首选。
*   **迭代最猛：Gemini CLI 与 Qwen Code**。两者的 PR 密集程度和技术架构更新（Managed Agent, 存储原子化）显示了极高的开发者活跃度。
*   **转型中：DeepSeek TUI**。主动进行大规模重构和代码清理，属于高技术债务后的“阵痛调整期”。

---

### 6. 值得关注的趋势信号
1.  **“瘦身”潮**：DeepSeek TUI 和 Qwen Code 的清理动作表明，项目在经历爆发期后，开始剔除冗余流程，追求“运行时轻量化”。
2.  **安全性前置**：开发者不再满足于简单的代码补全，开始关注 **Agent 的权限边界**（如指令来源溯源、凭证掩码、API 调用决策门）。
3.  **标准化协作**：随着 MCP 等协议的普及，AI CLI 正在从“闭环软件”转变为“插拔式生态接口”。
4.  **建议**：对开发者而言，在 2026 年四季度选择工具时，应优先考虑**插件架构（是否有 MCP 支持）**和**对本地工作区权限的细粒度控制能力**。避免过度依赖仍在 Windows 下产生严重进程泄漏的工具，直到相关 Issue 得到版本稳定确认。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告 (2026-09-26)

## 1. 热门 Skills 排行

根据 PR 评论数与社区关注度，以下是目前最活跃的 Skills：

### **#1298 - skill-creator: 修复 Windows 运行时与评估隔离问题**
*   **功能**：修复 Claude Code Skill 评估机制中的误报与崩溃问题，解决 Windows 平台下的子进程管道竞争和 `select()` 调用失败。
*   **社区热点**：这是官方核心工具 `skill-creator` 的关键维护更新，直接关系到社区开发新 Skill 的稳定性。
*   **状态**：Open | 链接：[anthropics/skills PR #1298](https://github.com/anthropics/skills/pull/1298)

### **#1771 - proofcore-contract-auditor: Web3 智能合约审计**
*   **功能**：为 Web3 开发者提供自动化静态分析能力，对 Solidity 和 Rust 合约进行审计，并锚定零存储 Merkle 证明至 TON 区块链。
*   **社区热点**：标志着 Skills 生态向 Web3 领域的深度扩展，结合了审计与链上验证。
*   **状态**：Open | 链接：[anthropics/skills PR #1771](https://github.com/anthropics/skills/pull/1771)

### **#1742 - mcp-builder: 兼容 MCP 2.0 流式协议与自定义 Headers**
*   **功能**：修复 `mcp-builder` 对 MCP 2.0+ 协议的兼容性，支持新的 `streamable_http_client` 导入路径及 HTTP 头配置。
*   **社区热点**：解决开发者在构建 MCP 服务器时的兼容性问题，技术更新及时。
*   **状态**：Open | 链接：[anthropics/skills PR #1742](https://github.com/anthropics/skills/pull/1742)

### **#1734 - Detect orphaned docx comments**
*   **功能**：文档处理辅助工具，专门用于检测 Word (.docx) 文档中孤立或错误的评论/修订标记。
*   **社区热点**：针对文档生成场景的实用痛点修复。
*   **状态**：Open | 链接：[anthropics/skills PR #1734](https://github.com/anthropics/skills/pull/1734)

### **#1703 - md2video-audio: Markdown 转视频生成器**
*   **功能**：零成本 Skill，将 Markdown 文档实时编译为专业级 MP4 视频，并生成拟人化语音旁白。
*   **社区热点**：AI 内容生成领域的创新应用，展示了 Skills 在多媒体领域的潜力。
*   **状态**：Open | 链接：[anthropics/skills PR #1703](https://github.com/anthropics/skills/pull/1703)

---

## 2. 社区需求趋势

从 Issues 数据分析，社区对 Skills 的核心诉求集中在以下四个方向：

1.  **安全与信任边界**：最高频的 Issue (#492) 警示了社区 Skill 滥用 `anthropic/` 命名空间的风险，呼吁建立官方审核机制。
2.  **跨组织协作与共享**：Issue #228 强烈要求实现企业级内技能共享功能，目前仅支持手动下载传输。
3.  **特定技术栈的深度集成**：
    *   **HPC 集群** (#1615)：SCNet HPC 的操作技能，满足高性能计算场景。
    *   **Web3/区块链** (#1771)：智能合约审计与上链验证。
    *   **Retro 游戏** (#525)：Python Pyxel 游戏开发技能。
4.  **测试与质量保障**：Issue #1390 报告了 `mcp-builder` 评估工具的严重 Bug，反映出社区对自动化评估系统的迫切需求。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃，且涉及社区高频痛点，可能近期合并：

*   **#1792 (fix docx)**：修复 LibreOffice 超时处理逻辑与输出验证。文档处理是 Claude 生成内容的重灾区，该 PR 直接提升输出质量。
*   **#1245 (Notion Spec)**：将产品规范转化为具体实施任务的技能。解决了从需求到代码落地的最后一公里问题，具有高实用价值。
*   **#723 (Testing Patterns)**：涵盖全栈测试哲学与最佳实践。随着 AI 编码普及，编写高质量测试成为刚需，此技能填补了空白。
*   **#525 (Pyxel)**：复古游戏开发技能。虽然小众，但展示了 Skills 生态的多样性和对创意开发的支持。

---

## 4. Skills 生态洞察

**“从单一工具到智能工作流”**：当前社区最集中的诉求是**提升 Skill 的智能化与协作能力**。这体现在两个方面：一是开发更强大的**评估与调试工具**（如 `mcp-builder` 修复、`skill-creator` 优化）；二是构建能够处理复杂业务场景的**垂直领域 Agent**（如 Web3 审计、Notion 规范落地），而不仅仅是简单的代码片段。

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



# OpenAI Codex 社区动态日报
**日期：2026-09-26**

---

## 1. 今日速览

Codex CLI 发布 v0.157.0 正式版本，新增 GPT-6 Sol/Luna 模型支持及 Amazon Bedrock 集成；社区高频反馈集中在 Windows 平台终端闪烁与 401 认证失效两大痛点，均已有对应 PR 推进修复。

---

## 2. 版本发布

### rust-v0.157.0（正式版本）
- 新增 **GPT-6 Sol** 和 **GPT-6 Luna** 模型支持，含 Amazon Bedrock 适配及旧模型迁移提示
- 默认启用全屏转录（Fullscreen Transcripts），新增 Shift-click 扩展文本选择
- 启用 eligible 用户的自动后台服务（background-server）启动

> 同期还发布了 v0.158.0-alpha.13~15 与 v0.159.0-alpha.1~3 三个预发布版本。

---

## 3. 社区热点 Issues

| Issue | 标题/摘要 | 关注点 | 链接 |
|-------|-----------|--------|------|
| #28756 | 404 Not Found 错误，GPT 5.4 xhigh 会话反复出现 | 1124 评论，83 👍，长期未解决的高频连接问题 | [链接](https://github.com/openai/codex/issues/28756) |
| #48235 | 401 Unauthorized 全局失效，重新认证无法恢复 | 12 评论，27 👍，当日新增，影响 Desktop 与 CLI | [链接](https://github.com/openai/codex/issues/48235) |
| #48230 | 恢复线程时 401 Unauthorized | 15 评论，21 👍，与 #48235 类似认证问题 | [链接](https://github.com/openai/codex/issues/48230) |
| #48074 / #48152 | Windows 终端反复闪烁（daemon 安装后） | 各 12/3 评论，16/7 👍，Windows 开发者高频痛点 | [链接](https://github.com/openai/codex/issues/48074) [链接](https://github.com/openai/codex/issues/48152) |
| #44503 | Windows Modern Standby 下 daemon 启动 Job Object 错误 | 17 评论，9 👍，涉及 Windows 11 新电源模式兼容性 | [链接](https://github.com/openai/codex/issues/44503) |
| #19504 | 添加 RTL（阿拉伯语/希伯来语）完整支持 | 23 评论，19 👍，长期功能请求，社区呼声高 | [链接](https://github.com/openai/codex/issues/19504) |
| #32908 | iOS 端 Codex Remote Control 推送通知未送达 | 6 评论，17 👍，移动场景体验问题 | [链接](https://github.com/openai/codex/issues/32908) |
| #35823 | logs_2.sqlite 从不回收已释放页面，文件单调增长 | 9 评论，1 👍，Windows 存储膨胀问题 | [链接](https://github.com/openai/codex/issues/35823) |
| #43386 | macOS Computer Use 访问 Xcode Device Hub 超时（-10005） | 6 评论，2 👍，特定应用集成兼容性 | [链接](https://github.com/openai/codex/issues/43386) |
| #47740 | 添加配置项禁用 CLI 用量上限警告 | 2 评论，4 👍，开发者体验优化需求 | [链接](https://github.com/openai/codex/issues/47740) |

---

## 4. 重要 PR 进展

| PR | 内容 | 意义 | 链接 |
|----|------|------|------|
| #48238 | 抑制 Windows 本地 MCP 服务器控制台窗口 | 直接修复 #18984/#48074 提到的终端闪烁问题 | [链接](https://github.com/openai/codex/pull/48238) |
| #48224 | 压缩（compaction）过程中保留模型与访问程序对 | 修复压缩后服务端拒绝模型/程序不匹配请求的 bug | [链接](https://github.com/openai/codex/pull/48224) |
| #48211 | 外部编辑器交接时保持 Codex TUI 可见 | 修复全屏 TUI 下编辑器打开后草稿信息丢失的体验问题 | [链接](https://github.com/openai/codex/pull/48211) |
| #48206 / #48205 | 警告查看器新增"保留并跳过"操作；关闭时清除已读警告 | 完善 TUI 警告管理系统，提升交互体验 | [链接](https://github.com/openai/codex/pull/48206) [链接](https://github.com/openai/codex/pull/48205) |
| #48199 | 归档线程空预览仍保留在列表中 | 修复归档线程因无预览被错误过滤的 bug | [链接](https://github.com/openai/codex/pull/48199) |
| #48198 | 遵守执行环境代理配置要求 | 修复受限制命令在代理未就绪时离线的问题 | [链接](https://github.com/openai/codex/pull/48198) |
| #48176 | 保护沙盒可写根目录下的 `.aws` 文件夹 | 安全加固，防止 AWS 凭据在沙盒中意外泄露 | [链接](https://github.com/openai/codex/pull/48176) |
| #48190 | 解析前限制 Agent 消息板 SSE 帧大小 | 防止恶意/畸形 SSE 数据导致解析器内存累积 | [链接](https://github.com/openai/codex/pull/48190) |
| #48157 | 允许带残留 Job Object 的 Windows daemon 启动 | 修复 Windows 下因 Job 对象残留导致 daemon 启动被拒的问题 | [链接](https://github.com/openai/codex/pull/48157) |
| #48168 | 每次请求生成唯一 exec-server 进程 ID | 修复多线程/沙盒重试场景下进程句柄复用的竞态问题 | [链接](https://github.com/openai/codex/pull/48168) |

---

## 5. 功能需求趋势

- **多语言/国际化**：RTL 支持（#19504、#21563）持续获得高票数，阿拉伯语/希伯来语用户群体诉求明确
- **模型生态扩展**：GPT-6 Sol/Luna 已随 v0.157.0 发布，社区关注新模型在 Computer Use、远程压缩等场景的稳定性
- **CLI 体验优化**：用量警告可配置化（#47740）、daemon 启动策略可切换（#48195）等需求反映开发者对 CLI 可控性的诉求
- **跨平台稳定性**：Windows（终端闪烁、Job Object）、Linux（快捷键变化、渲染器重载）、macOS（iTerm2 复制）多平台 Issue 均活跃
- **移动端集成**：iOS 推送通知（#32908）缺失影响 Remote Control 使用场景

---

## 6. 开发者关注点

| 痛点类别 | 具体表现 | 相关 Issue/PR |
|----------|----------|---------------|
| **认证失效** | 401 Unauthorized 频繁出现，重新登录无法恢复，涉及 Desktop、CLI、远程压缩多个场景 | #48235、#48230、#48232、#48237 |
| **Windows 终端闪烁** | daemon/MCP 启动时 `pwsh.exe` 控制台窗口频繁闪现，影响使用体验 | #18984、#48074、#48152 → PR #48238、#48157 |
| **SQLite 存储膨胀** | `logs_2.sqlite` 开启 `INCREMENTAL_VACUUM` 但从不执行，文件单调增长 | #35823、#33256 |
| **使用量管理** | Pro 用户周额度快速耗尽（#45303）、警告噪音大（#47740） | #45303、#47740、#48236 |
| **浏览器/Computer Use** | 特定网站拒绝交互、localhost 被拦截、Xcode Device Hub 超时 | #29343、#48179、#43386 |
| **远程/架构问题** | 远程压缩 401、DCR 发现流程不符合规范、daemon 自动启动策略争议 | #48232、#42427、#48195 |

---

*数据截止：2026-09-26 | 来源：github.com/openai/codex*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



# Gemini CLI 社区动态日报
**日期：2026-09-26**

---

## 1. 今日速览

Gemini CLI 发布 v0.62.0-nightly 版本，修复了 MCP 配置区分、认证死循环及并发文件操作竞态等关键问题。社区对 Subagent 可靠性、Auto Memory 质量和浏览器 Agent 稳定性高度关注，多项 P1 级 Bug 持续积累中。

---

## 2. 版本发布

**v0.62.0-nightly.20260925.gbedef96ef**

- 新增 v0.61.0 / v0.61.0-preview.1 变更日志
- 修复 CLI 无法区分 MCP 缺失启用配置与配置格式错误的问题

🔗 [Release 详情](https://github.com/google-gemini/gemini-cli/releases)

---

## 3. 社区热点 Issues

| # | 标题 | 优先级 | 评论 | 👍 | 重要性 |
|---|------|--------|------|-----|--------|
| #22323 | Subagent 在达到 MAX_TURNS 后被错误标记为 GOAL success，隐藏中断状态 | P1 | 13 | 2 | 影响调试可信度 |
| #19873 | 通过零依赖 OS 沙箱利用模型的 bash 原生能力 | P2 | 9 | 1 | 架构级增强提案 |
| #21409 | 通用 Agent 挂起问题（等待超1小时） | P1 | 8 | 8 | 用户体验严重受损 |
| #22745 | AST 感知文件读取/搜索/代码库映射可行性评估 | P2 | 7 | 1 | 上下文效率优化 |
| #21968 | Gemini 未充分使用 Skills 和 Sub-agents | P2 | 6 | 0 | 功能使用率问题 |
| #26525 | Auto Memory 确定性脱敏与日志缩减 | P2 | 5 | 0 | 安全与隐私 |
| #26522 | Auto Memory 无限重试低质量会话 | P2 | 4 | 0 | 资源浪费 |
| #22267 | Browser Agent 忽略 settings.json 配置覆盖 | P2 | 4 | 0 | 配置失效 |
| #21983 | Browser Subagent 在 Wayland 下失败 | P1 | 4 | 1 | Linux 兼容性 |
| #22232 | Browser Agent 会话接管与锁恢复增强 | P2 | 4 | 0 | 健壮性改进 |

**热点分析：**
- **#21409** 获得最高点赞（8👍），通用 Agent 挂起是高频痛点
- **#22323** 评论最多，Subagent 状态报告准确性直接影响调试效率
- **#26525/#26522** 聚焦 Auto Memory 质量，安全与资源优化并重

---

## 4. 重要 PR 进展

| # | 标题 | 状态 | 面积 | 说明 |
|---|------|------|------|------|
| #29448 | 修复文件竞争/无头 keyring 导致的无限认证循环 | ✅ OPEN | auth | 解决 Windows/WSL/headless 环境认证卡死 |
| #29499 | 序列化文件工具操作，实现原子写入 | ✅ OPEN | core | 修复并行 Subagent 竞态导致的静默数据丢失 |
| #29476 | 修复交互模式下 Enter 键无响应卡死 | ✅ OPEN | cli | 解决集成终端中工具确认prompt卡死问题 |
| #29506 | 对齐策略重定向、路径验证与工作流解析 | ✅ CLOSED | core | CI 工作流优化，简化 issue 分类逻辑 |
| #29463 | 修复 ACP 模式 session/load 与 session/new 同分钟冲突 | ✅ CLOSED | acp | 解决会话查找失败的 No previous sessions 错误 |
| #29437 | 清理后台 Shell 执行后的临时目录 | ✅ CLOSED | core | 防止 `gemini-shell-*` 临时目录残留 |
| #29508 | npm 依赖批量更新（76项） | ✅ OPEN | deps | 包含 simple-git 3.28→3.36、MCP SDK 升级等 |
| #29457 | 修复 read-many-files 中二进制文件误判为显式请求 | ✅ OPEN | core | 解决上下文膨胀 bug（#29045） |
| #29505 | 支持 rootless Podman 沙箱（keep-id） | ✅ OPEN | core | 修复无根 Podman 容器中 UID/GID 映射失败 |
| #29467 | 移除无效的 diff.external 配置覆盖 | ✅ CLOSED | core | 解决 Git diff 命令 `cannot spawn` 致命错误 |

**PR 亮点：**
- **#29499/#29457** 针对并发安全和上下文膨胀两个长期痛点
- **#29448** 影响多平台用户体验，尤其 WSL 用户
- **#29505** 扩展容器沙箱兼容性

---

## 5. 功能需求趋势

基于 Issue 聚类分析，社区关注方向如下：

| 方向 | 代表 Issue | 热度 |
|------|------------|------|
| **Subagent 可靠性** | #22323, #21409, #21968, #21763 | 🔥🔥🔥 |
| **Auto Memory 质量** | #26525, #26522, #26523, #26516 | 🔥🔥🔥 |
| **浏览器 Agent 稳定性** | #22267, #22232, #21983 | 🔥🔥 |
| **上下文效率优化** | #22745, #22746, #19561 | 🔥🔥 |
| **沙箱/容器支持** | #29505, #19873 | 🔥 |
| **工具链集成** | #27588 (WSL2 剪贴板) | 🔥 |

---

## 6. 开发者关注点

**高频痛点：**
1. **Subagent 状态不可信** — 达到最大轮次后错误报告成功，影响调试和自动化流程
2. **Agent 挂起无超时** — 通用 Agent 在简单操作（如创建文件夹）时永久挂起
3. **配置覆盖失效** — Browser Agent 忽略 `settings.json` 中的 `maxTurns` 等设置
4. **上下文膨胀** — 二进制文件读取、不规范的工具调用导致 token 浪费
5. **跨平台兼容** — Wayland、rootless Podman、WSL2 剪贴板等场景支持不足

**持续需求：**
- 更完善的 Subagent 可观测性（轨迹共享、bug report 包含子 Agent 上下文）
- Auto Memory 的精准提取与无效 patch 隔离
- 安全策略的细粒度控制（per-workspace policy）

---

*数据来源：github.com/google-gemini/gemini-cli，统计周期 2026-09-25 ~ 2026-09-26*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期**: 2026-09-26  
**数据来源**: github.com/github/copilot-cli

---

## 1. 今日速览
今日社区新增 46 条 Issues，主要集中在**插件市场验证限制**、**Agent/技能调用故障**、**会话与认证稳定性**以及**系统提示词配置优化**等方向。新版本 `v1.0.89-4` 发布，优化了路由层级建议与插件管理体验。此外，关于跨应用会话同步与自定义模型支持的呼声较高，反映出开发者对 Copilot CLI 生态整合的强烈需求。

---

## 2. 版本发布
### v1.0.89-4 (2026-09-25)
* **新增**：自动建议路由层级，支持快捷键或点击切换；切换模型后提供快速反馈提示。
* **改进**：直接插件安装支持启用/禁用，已禁用的插件不再加载，提升系统稳定性。

---

## 3. 社区热点 Issues

| # | 标题 | 状态 | 关注度 | 痛点/摘要 |
|---|------|------|--------|-----------|
| **#4438** | `disable-model-invocation: true` 导致技能不可达 | Open | 11 👍 | 配置了该参数的技能在 CLI 中完全不可调用，`skill()` 工具报错 "Skill not found"。 |
| **#3534** | WSL2 ARM64 `/copy` 失败 | Open | 5 👍 | `clip.exe` 在 WSL2 ARM64 环境下因 `cmd.exe` 引号处理问题导致剪贴板写入失败。 |
| **#232** | 添加 System Prompt 参数 | Open | 11 👍 | 希望支持通过命令行参数传递系统级指令，而非仅依赖仓库内文件。 |
| **#4929** | 本地认证令牌失效问题 | Open | 6 👍 | 长时间运行进程导致认证失效，重启会话后恢复，影响持续工作流。 |
| **#4775** | Mission Control 仪表盘链接 404 | Open | 2 👍 | 仪表盘链接指向 `/copilot/tasks/<uuid>`，实际路径为 `/agents/tasks/<uuid>`，导致会话无法从网页打开。 |
| **#3501** | 滚动条导致文本错位 | Closed | 9 👍 | 垂直滚动条引入后，终端渲染出现对齐问题，影响阅读体验。 |
| **#3123** | `/research` 无法写入研究报告 | Closed | 6 👍 | Agent 执行 `create` 工具时报错，无法将研究报告保存为文件。 |
| **#2627** | 可配置的系统提示词以减少 Token 开销 | Open | 20 👍 | 系统提示词占用约 20,500 tokens，建议允许用户自定义以优化上下文窗口利用率。 |
| **#4103** | 插件市场克隆禁用 Git 凭证助手 | Closed | 4 👍 | 克隆私有 Azure DevOps 插件仓库时，Git 凭证助手失效，导致私有 HTTPS 仓库访问失败。 |
| **#2199** | 添加 Ctrl+Backspace 删除整词功能 | Closed | 7 👍 | 希望支持 Ctrl+Backspace 快捷键，与主流编辑器行为保持一致。 |

---

## 4. 重要 PR 进展
> 本时段无 Pull Request 更新。

---

## 5. 功能需求趋势
从 Issues 分析，社区关注点主要集中在以下三个方向：

1. **生态与配置优化**
   - 插件市场验证限制（#4969）：单个插件描述超过 1024 字符会导致整个市场加载失败，影响插件生态扩展。
   - 系统提示词配置（#232, #2627）：开发者希望更灵活地控制系统指令的输入方式，减少不必要的 Token 消耗。

2. **Agent 与技能稳定性**
   - 技能调用故障（#4438, #4637, #4838）：`disable-model-invocation` 配置与技能解析逻辑存在不一致，导致功能不可用或报错。
   - Agent 工具执行问题（#3123）：`/research` 等任务在文件写入环节频繁失败。

3. **会话与认证管理**
   - 认证失效（#4929）：长时间运行进程导致认证令牌停止刷新，需重启恢复。
   - 会话同步缺失（#4082）：CLI 与桌面应用之间的会话未同步，影响多端协作体验。
   - 仪表盘链接错误（#4775）：网页端与 CLI 端的会话路径不一致，导致无法从浏览器恢复会话。

---

## 6. 开发者关注点
- **跨应用协作体验**：开发者希望 CLI 与桌面应用实现会话同步，打通多终端工作流。
- **系统提示词灵活性**：当前系统提示词占用大量 Token 且配置方式单一，限制了上下文窗口的有效利用率。
- **插件市场可用性**：插件描述长度限制导致部分插件无法加载，阻碍了自定义工具链的扩展。
- **WSL2 与 ARM64 支持**：ARM64 环境下的剪贴板功能与路径解析存在兼容性问题，影响 Windows 开发者体验。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi (pi-mono) 社区动态日报
**日期**: 2026-09-26  
**来源**: github.com/badlogic/pi-mono

---

## 1. 今日速览

过去24小时社区活跃度较高，主要集中在 **v0.87.1** 版本后的稳定性修复、**编码代理** 性能优化以及 **MCP (Model Context Protocol)** 集成实验功能上。开发者反馈了关于 TUI 交互、扩展控制台输出、OpenRouter 价格计算及特定模型兼容性的多个 Bug。值得注意的是，社区正积极推动双向思考模式、可配置的滚动步长等 UI 改进。

---

## 2. 版本发布

**无最新 Release** (过去24小时无新版本发布)

---

## 3. 社区热点 Issues (Top 10)

1.  **#10031: Pi 停止思考后卡在 "Working..." 状态**
    *   **重要性**: 高 - 影响核心交互体验
    *   **摘要**: 用户反馈停止思考时 ESC 键无法解除 "Working..." 状态，必须强制退出重连。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/10031)

2.  **#10033: 长会话自动压缩时上下文溢出**
    *   **重要性**: 高 - 涉及长对话上下文管理
    *   **摘要**: 在处理返回思考内容的推理模型时，`serializeConversation` 将所有思考文本放入摘要提示词，导致会话仍能容纳时却因提示词超限而压缩失败。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/10033)

3.  **#10002: 扩展控制台输出覆盖 TUI 界面**
    *   **重要性**: 高 - 影响交互体验
    *   **摘要**: 扩展代码中的 `console.error` 直接写入终端，破坏了 Pi 的 TUI 布局，导致界面混乱。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/10002)

4.  **#9980: OpenRouter 模型成本计算偏差 2-3 倍**
    *   **重要性**: 中 - 影响使用成本准确性
    *   **摘要**: Pi 使用最便宜的提供商定价计算成本，导致热门开源模型（如 GLM-5.3-flash）的显示费用远低于实际费用。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/9980)

5.  **#10024: 运行中切换工具集导致重计费**
    *   **重要性**: 中 - 影响计费准确性
    *   **摘要**: 在会话进行中更改选定的工具集会移动系统提示词的头部，导致下一次请求从该点重新计费，而非从会话头部开始。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/10024)

6.  **#9905: Anthropic `thinking.display` 不可配置**
    *   **重要性**: 中 - 限制功能灵活性
    *   **摘要**: CLI 没有提供选项来更改 `thinking.display` 的默认值（始终为 "summarized"），用户无法选择显示为 "omitted"。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/9905)

7.  **#10038: 全屏模式下鼠标滚轮滚动逻辑错误**
    *   **重要性**: 中 - UI 交互体验
    *   **摘要**: 在全屏模式下，鼠标滚轮滚动编辑器区域时，实际上是滚动了底部的聊天记录，而不是编辑器内容。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/10038)

8.  **#10034: OpenAI Fast Tier 定价记录错误**
    *   **重要性**: 中 - 价格计算 Bug
    *   **摘要**: 使用 GPT-6 Luna/Sol 时，`serviceTier` 设置为 `fast`，但 Pi 记录的成本却是默认的 1x 价格。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/10034)

9.  **#9953: Anthropic strict tools 严格模式 Schema 校验问题**
    *   **重要性**: 中 - 新功能兼容性
    *   **摘要**: `makeStrictJsonSchema` 保留了 minimum/maximum 等关键字，导致 Anthropic 严格工具使用 API 拒绝所有请求。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/9953)

10. **#9887: TUI 渲染 read 工具调用时类型错误**
    *   **重要性**: 低 - UI 渲染 Bug
    *   **摘要**: 模型返回字符串类型的行号时，TUI 将其作为字符串拼接而非数字相加，导致渲染错误。
    *   [查看详情](https://github.com/badlogic/pi-mono/issues/9887)

---

## 4. 重要 PR 进展 (Top 10)

1.  **#10050: fix(coding-agent): keep extension console output off the interactive TUI**
    *   **内容**: 修复 Issue #10002，防止扩展的 `console.error` 干扰 Pi 的 TUI 渲染。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/10050)

2.  **#10044: fix(ai): upgrade openai SDK to 7.19.0**
    *   **内容**: 升级 OpenAI SDK 以支持新的 `fast` 服务层级定价类型，修复 GPT-6 Fast 模式的计费问题。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/10044)

3.  **#10027: fix(ai,coding-agent): streaming robustness, reasoning clamp, compaction validity, edit recovery**
    *   **内容**: 一系列关于流式传输鲁棒性、推理限制、压缩有效性及编辑恢复的修复。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/10027)

4.  **#10039: fix(coding-agent): honor truecolor in custom themes**
    *   **内容**: 修复自定义主题无法正确解析 truecolor 环境变量的问题。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/10039)

5.  **#10035: Virtual models**
    *   **内容**: 添加虚拟模型实验性支持。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/10035)

6.  **#10040: feat(coding-agent): Codemode and MCP**
    *   **内容**: 集成 Codemode 和 MCP 功能，为模型提供更好的沙箱环境（主要针对 Jev 模型）。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/10040)

7.  **#10051: feat(client): add actionable error mapping for MCP OAuth dynamic client registration**
    *   **内容**: 为 MCP OAuth 动态客户端注册添加可操作的错误映射，改善用户体验。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/10051)

8.  **#10037: Perf/collapse historical tool output**
    *   **内容**: 性能优化，折叠历史工具输出以提升性能。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/10037)

9.  **#1481: fix(tui): chain slash arg autocomplete after Tab completion**
    *   **内容**: 修复命令行补全逻辑，在 Tab 补全后自动重新触发参数建议。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/1481)

10. **#6933: fix(coding-agent): disable undici idle timeout by default for local LLMs**
    *   **内容**: 默认禁用 undici 的空闲超时（从 5 分钟改为 0），解决本地 LLM（如 vLLM）在长提示词评估期间被意外断开的问题。
    *   [查看 PR](https://github.com/badlogic/pi-mono/pull/6933)

---

## 5. 功能需求趋势

根据 Issues 和 PR 分析，当前社区关注点集中在以下几个方向：

*   **MCP 与 Codemode 集成**: PR #10040 标志着 Pi 正在向更完整的编码环境迈进，通过 MCP 和 Codemode 支持更强的模型（如 Jev）。
*   **交互体验优化 (TUI)**: 重点关注全屏模式、鼠标滚动逻辑、扩展输出控制台以及思考模式切换的流畅性。
*   **上下文管理与压缩**: 随着长对话和推理模型（DeepSeek V4.1）的使用增加，会话压缩算法的健壮性成为痛点。
*   **工具调用与流式传输**: 确保 `read` 工具、OpenAI 兼容接口的流式输出以及工具集动态切换的正确性。

---

## 6. 开发者关注点

*   **稳定性**: 修复 v0.86.0 引入的 RPC steer 响应与输入处理不匹配的回归问题 (#9803)。
*   **成本准确性**: OpenRouter 和 OpenAI 的服务层级定价逻辑需要精确匹配，避免计费偏差。
*   **本地 LLM 支持**: 针对 vLLM、Ollama 等本地后端的连接超时和流式传输问题进行优化。
*   **配置灵活性**: TUI 滚动步长、思考模式显示选项等应支持用户自定义。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-09-26  
**数据来源**: github.com/QwenLM/qwen-code

---

## 1. 今日速览
今日社区活跃度极高，发布了 **v0.24.5-nightly** 构建版本，重点推进了 **Managed Agent（托管代理）架构** 的 Java SDK 集成与端到端预览。同时，Windows 平台下的进程泄漏与 macOS 代码签名问题引发了大量关注，成为今日最集中的技术痛点。

---

## 2. 版本发布
**v0.24.5-nightly.20260925.c3a4058a0c**
*   **主要更新**: 发布了最新的夜间构建版本，包含 Java SDK 的 `Hosted Harness private client` 集成，并针对 Runtime Broker 进行了测试修复。

---

## 3. 社区热点 Issues (Top 10)

1.  **#12380 [Feature] Define Managed Agent dual-path architecture**
    *   **重要性**: **核心架构提案**。详细定义了托管代理的双路径架构与分阶段交付机制，旨在解耦工具环境与模型推理，提升会话持久化能力。
    *   **反应**: 获得 21 条评论，处于活跃讨论中。

2.  **#11303 [Bug] Windows qwen-cli ConPTY 进程泄漏**
    *   **重要性**: **严重稳定性问题**。在 Windows 上运行 12 小时后，单个进程会累积 347 个 `conhost.exe` 子进程，占用约 2.8GB 内存，严重影响长期运行体验。
    *   **反应**: 17 条评论，用户反馈强烈。

3.  **#472 [Bug] `is_background` 属性类型错误**
    *   **重要性**: **集成开发环境 (IDE) 痛点**。在 VS Code 扩展中调用工具时出现 JSON 校验错误，阻碍了开发者的正常使用。
    *   **反应**: 14 条评论，包含 5 个点赞。

4.  **#11872 [Bug] Web Terminal PTY 不可用**
    *   **重要性**: **跨平台兼容性**。在 macOS 上，Web Shell 无法初始化 PTY，原因是 `node-pty` 未被打包且本地预构建文件被代码签名阻止。
    *   **反应**: 14 条评论，影响桌面端 Web Shell 功能。

5.  **#12416 [Bug] Remote-SSH 会话建立失败**
    *   **重要性**: **远程开发场景**。使用 Companion 0.24.2 通过 Remote-SSH 连接时，会话建立失败，报错 `EPIPE` 或 `BridgeChannelClosedError`，但独立 CLI 可用。
    *   **反应**: 12 条评论。

6.  **#8586 [Feature] Track activeWork and Agent recovery**
    *   **重要性**: **多代理系统**。提出了为后台代理添加 `activeWork` 指标，以实现更健壮的深度守护进程健康检查与恢复路径。
    *   **反应**: 10 条评论。

7.  **#8097 [Bug] Background agent 协调问题**
    *   **重要性**: **多代理协作**。涉及后台 Explore 子代理之间的重复工作、过早完成以及非交互式消息发送问题。
    *   **反应**: 9 条评论。

8.  **#12589 [Feature] System One Decision Gate (von-install)**
    *   **重要性**: **性能优化**。建议引入轻量级决策模型（Von）作为前置分类器，跳过不必要的昂贵模型调用（如 `/superfast` 模式）。
    *   **反应**: 6 条评论，新提出的需求。

9.  **#12169 [Bug] Batch API 上传绕过代理**
    *   **重要性**: **企业网络环境**。批量 API 上传直接使用全局 `fetch` 而非分派器，导致在需要代理或 TLS 拦截的环境中失败。
    *   **反应**: 5 条评论。

10. **#12679 & #12668 [Bug] ripgrep 可执行权限丢失**
    *   **重要性**: **安装与更新机制**。新安装或自更新后，vendored 的 `ripgrep` 二进制文件丢失执行权限，导致工具不可用。这是两个相互关联的高频报错。
    *   **反应**: 各 4 条评论。

---

## 4. 重要 PR 进展 (Top 10)

1.  **#12654 feat(sdk-java): Add Hosted Harness private client**
    *   **内容**: 新增 Java SDK 的托管 Harness 私有客户端支持，完善了多语言生态集成。

2.  **#12358 feat(managed-agent): Add standalone managed agent stack**
    *   **内容**: 提供了 Managed Agents 架构的端到端预览，包含 Spring Boot 控制面与 Tool Runtimes。

3.  **#12688 feat: complete Advisor consultation behavior**
    *   **内容**: 完成了 Advisor 行为层的咨询逻辑，覆盖了任务完成后的确认与重复失败处理。

4.  **#12545 fix(core): Withhold SkillManager for subagents**
    *   **内容**: 修复了工具策略中没有 Skill 工具的子代理不应持有 SkillManager 的问题，优化了资源隔离。

5.  **#12719 feat(serve): support multiple workspace roots**
    *   **内容**: 支持多根目录工作区，允许在 VS Code 多根解决方案中跨文件夹执行 Git 操作。

6.  **#12461 fix(agent): enforce per-model concurrency cap on foreground**
    *   **内容**: 修复了前台子代理绕过每模型并发限制的问题，确保资源配额对所有代理生效。

7.  **#12590 feat(superfast): optional System One Decision Gate**
    *   **内容**: 实现了可选的 System One 决策门（von-install），通过轻量级模型跳过昂贵调用。

8.  **#12705 fix(core): tolerate EHOSTUNREACH in web_fetch**
    *   **内容**: 修复 `web_fetch` 在 HTTPS 升级失败时的降级逻辑，正确处理网络层不可达错误。

9.  **#12718 fix(core): tolerate win32 directory-sync refusal**
    *   **内容**: 修复了 Windows 上 `fsync` 拒绝问题及 macOS 文件系统大小写敏感性导致的测试失败。

10. **#12717 docs: fix dead links**
    *   **内容**: 修复了 GitHub Actions、扩展和隐私页面的 7 个 404 死链，改善文档可用性。

---

## 5. 功能需求趋势

*   **多代理系统架构**: 社区正从单一 Agent 向复杂的 **Managed Agent（托管代理）** 架构演进，重点关注会话持久化、跨代理协调以及恢复机制（#12380, #8586）。
*   **IDE 深度集成与多根支持**: 针对 **VS Code 多根目录** 工作区的支持成为刚需，目前限制为单文件夹访问，阻碍了大型项目的使用（#12628）。
*   **性能优化**: 引入 **轻量级决策模型**（如 von）以减少不必要的 LLM 调用，提升响应速度（#12589）。
*   **跨平台稳定性**: Windows 进程泄漏与 macOS 代码签名问题是阻碍桌面端普及的顽疾。

---

## 6. 开发者关注点

*   **稳定性优先**: 开发者反馈最集中的是 **Windows 平台** 的资源泄漏问题以及 **macOS** 的 Web Shell PTY 初始化失败，这直接影响了开发者的使用信心。
*   **权限管理**: 二进制文件的执行权限丢失（`ripgrep` 不可用）是高频报错，暴露了安装包构建与更新流程中的权限处理漏洞。
*   **远程开发**: Remote-SSH 场景下的连接中断问题，反映出 Companion 组件在远程容器化环境中的适配尚不完善。
*   **API 兼容性**: 批量 API 上传绕过代理的问题，提醒开发者注意企业级网络环境下的工具可用性。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：** 2026-09-26
**数据范围：** 过去24小时 (2026-09-25 00:00 - 2026-09-26 00:00)

---

## 1. 今日速览
过去24小时是 **Codewhale (DeepSeek TUI)** 的“清理与重构”日。项目主理人 Hmbown 进行了大规模的代码清理（删除 2,650+ 行死代码）、依赖更新以及 TUI 的交互修复。同时，核心架构正在向 **TypeScript + Cordis** 迁移，以增强扩展性，标志着项目从单一 Rust 实现向更开放生态的转型。

## 2. 版本发布
**无新版本发布。**
*   **当前状态：** 开发重点在于 v0.10.1 的补丁修复及后续架构重构（Runtime/TUI 分离）。

## 3. 社区热点 Issues (Top 10)

1.  **#6585 [OPEN] Make "Whose word wins" checkable**
    *   **重要性：** **核心安全与信任机制**。提案要求在指令和记忆中添加“证明来源”，确保 Agent 生成的文本是可验证的声明，而非不可质疑的指令。
    *   **链接：** [Issue #6585](https://github.com/Hmbown/Codewhale/issues/6585)
2.  **#6573 [OPEN] Bug: Multiple TUI Sessions Contend on Subagents Store → CPU Spin-loop**
    *   **重要性：** **严重性能 Bug**。多会话并发时出现 CPU 100% 占用，这直接影响了多任务处理时的用户体验。
    *   **链接：** [Issue #6573](https://github.com/Hmbown/Codewhale/issues/6573)
3.  **#6582 [OPEN] hooks: structured execution receipt on stdin**
    *   **重要性：** **插件生态集成**。为了支持 `MemoryWhale` 等本地记忆工具，需要标准化 shell 调用的执行凭证，增强工具间的互操作性。
    *   **链接：** [Issue #6582](https://github.com/Hmbown/Codewhale/issues/6582)
4.  **#6500 [CLOSED] [bug] Model selection: pinning a model and adding it to Fleet do not work**
    *   **重要性：** **核心功能故障**。模型选择菜单中的关键操作（收藏/加入编队）失效，属于 v0.10.0 版本的重大 UX 缺陷，现已修复。
    *   **链接：** [Issue #6500](https://github.com/Hmbown/Codewhale/issues/6500)
5.  **#6528 [CLOSED] Credential setup: strip invisible characters from pasted keys**
    *   **重要性：** **用户体验修复**。解决从网页复制 API Key 时因不可见字符（如零宽空格）导致认证失败的问题。
    *   **链接：** [Issue #6528](https://github.com/Hmbown/Codewhale/issues/6528)
6.  **#6563 [CLOSED] [bug] codewhale config set accepts typos and unknown keys silently**
    *   **重要性：** **配置健壮性**。修复了配置命令对拼写错误和未知键的静默处理，防止用户误操作导致配置损坏。
    *   **链接：** [Issue #6563](https://github.com/Hmbown/Codewhale/issues/6563)
7.  **#6579 [CLOSED] test(tui): restore the green Linux full-workspace test gate on main**
    *   **重要性：** **CI/CD 稳定性**。恢复 Linux 环境下的全工作区测试门，确保代码合并不会破坏现有功能。
    *   **链接：** [Issue #6579](https://github.com/Hmbown/Codewhale/issues/6579)
8.  **#6397 [CLOSED] Composer submit chip: finish the paste-burst display fix**
    *   **重要性：** **UI 细节修复**。修复了提交按钮在快速输入时的显示逻辑，防止误触或显示异常。
    *   **链接：** [Issue #6397](https://github.com/Hmbown/Codewhale/issues/6397)
9.  **#6517 [CLOSED] Delete ~2,650 lines of crates/workflow with no production consumer**
    *   **重要性：** **代码库清理**。大规模删除无用的 Workflow 代码，显著降低了项目的维护成本。
    *   **链接：** [Issue #6517](https://github.com/Hmbown/Codewhale/issues/6517)
10. **#6516 [CLOSED] [documentation] Remove dead config/flags/env**
    *   **重要性：** **文档与配置简化**。清理过时的环境变量、标志位和文档，避免用户困惑。
    *   **链接：** [Issue #6516](https://github.com/Hmbown/Codewhale/issues/6516)

## 4. 重要 PR 进展 (Top 10)

1.  **#6600 [OPEN] feat(extensions): TypeScript + Cordis extension host**
    *   **内容：** 将插件和 MCP (Model Context Protocol) 迁移到 TypeScript + Cordis 架构，使 Rust 核心保持纯粹，仅负责底层逻辑。
    *   **链接：** [PR #6600](https://github.com/Hmbown/Codewhale/pull/6600)
2.  **#6586 [OPEN] refactor(split): codewhale-runtime crate and boundary ratchet**
    *   **内容：** 实施 Runtime/TUI 分离计划 (RS-0 to RS-7)，创建独立的 `codewhale-runtime` crate，防止 UI 依赖污染核心逻辑。
    *   **链接：** [PR #6586](https://github.com/Hmbown/Codewhale/pull/6586)
3.  **#6583 [OPEN] feat(codemode): MCP and plugin calls in code mode through the one approval gate**
    *   **内容：** 统一 Code Mode 下的工具调用权限，确保嵌套的 MCP/Plugin 调用与直接调用处于同一安全级别。
    *   **链接：** [PR #6583](https://github.com/Hmbown/Codewhale/pull/6583)
4.  **#6587 [OPEN] fix(tui): right-click reaches every surface**
    *   **内容：** 修复 TUI 中右键菜单无法触发或无法定位到正确位置的问题，增强跨界面交互体验。
    *   **链接：** [PR #6587](https://github.com/Hmbown/Codewhale/pull/6587)
5.  **#6592 [OPEN] fix(tui): first run connects a model, messages are never lost**
    *   **内容：** 修复首次运行时的连接逻辑，防止消息丢失或重复发送，并改进了启动时的引导体验。
    *   **链接：** [PR #6592](https://github.com/Hmbown/Codewhale/pull/6592)
6.  **#6589 [OPEN] Workflow truth, safe /share, worktree cleanup**
    *   **内容：** 合并多项改进，包括确保 Workflow 数据的确定性、安全的 `/share` 目录处理以及 Worktree 清理功能。
    *   **链接：** [PR #6589](https://github.com/Hmbown/Codewhale/pull/6589)
7.  **#6601 [OPEN] fix(trust): credentials masked at rest, honest approval timeouts**
    *   **内容：** 增强安全模块，确保凭证在静止状态下的掩码处理，并优化了授权超时机制。
    *   **链接：** [PR #6601](https://github.com/Hmbown/Codewhale/pull/6601)
8.  **#6590 [CLOSED] feat(web): codewhale.net and its docs**
    *   **内容：** 重建官方网站，采用“Whale-road”设计语言，并重写文档结构。
    *   **链接：** [PR #6590](https://github.com/Hmbown/Codewhale/pull/6590)
9.  **#6578 [CLOSED] chore: delete dead workflow code**
    *   **内容：** 配合 Issue #6517，执行大规模代码删除，清理了 `replay.rs` 等无用模块。
    *   **链接：** [PR #6578](https://github.com/Hmbown/Codewhale/pull/6578)
10. **#6584 [CLOSED] fix: remove capability limits that prevent no concrete harm**
    *   **内容：** 移除了那些仅为了“形式安全”而无实际防御意义的权限限制，优化了安全策略的颗粒度。
    *   **链接：** [PR #6584](https://github.com/Hmbown/Codewhale/pull/6584)

## 5. 功能需求趋势
*   **架构现代化：** 社区最关注的是从 Rust 向 **TypeScript + Cordis** 的迁移，这表明开发者希望 Codewhale 具有更强的扩展性和插件生态。
*   **安全性与信任：** “谁的话算数”（指令溯源）和“凭证掩码”是高频讨论点，反映了用户对 AI 辅助编程中数据安全和指令权威性的极高要求。
*   **多会话性能：** `CPU Spin-loop` 问题引发了广泛关注，说明多任务并发场景下的性能优化是刚需。

## 6. 开发者关注点
*   **配置与交互：** 开发者对配置命令的容错性、右键菜单的可用性以及首次启动的引导流程反馈较多。
*   **工具集成：** 如何更好地与外部工具（如 MCP、本地 MemoryWhale）集成，以及如何标准化 shell 调用的凭证传递，是当前开发的重难点。
*   **遗留代码清理：** 大规模删除死代码和过时配置，显示出社区希望保持代码库整洁、轻量，避免技术债务堆积。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*