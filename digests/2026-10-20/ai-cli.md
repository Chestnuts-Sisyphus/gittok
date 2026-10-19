# AI CLI 工具社区动态日报 2026-10-20

> 生成时间: 2026-10-19 23:12 UTC | 覆盖工具: 9 个

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

**Claude Code Skills 社区热点报告（截至 2026‑10‑20）**  

---  

## 1. 热门 Skills 排行（按社区讨论热度）  

| 排名 | PR 编号 & 链接 | Skill 名称 / 功能 | 关键讨论点 | 当前状态 |
|------|----------------|-------------------|------------|----------|
| 1 | [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp‑builder ‑ 支持 MCP ≥ 2 的 `streamable_http_client` 与自定义 Header** | - 兼容性破坏导致旧 Skill 失效  <br>‑ 需要在 `create_mcp_http_client` 中配置 Header <br>‑ 社区担心升级后现有自动化脚本失效 | **Open** |
| 2 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill‑creator ‑ 隔离 Trigger 评估 & Windows 运行时容错** | - Windows 子进程 pipe `select()` 错误 <br>‑ 触发评估误报 / 负例被错误标记 <br>‑ 需求高：CI / CI‑CD 环境跨平台运行 | **Open** |
| 3 | [#1245](https://github.com/anthropics/skills/pull/1245) | **notion‑spec‑to‑implementation** | - 将 Notion 规格页面自动拆解为可执行任务、验收标准 <br>‑ 对产品/技术团队的需求极大 <br>‑ 关注点：分页、图片/嵌入对象的解析准确性 | **Open** |
| 4 | [#1771](https://github.com/anthropics/skills/pull/1771) | **proofcore‑contract‑auditor** (Web3) | - 静态分析 Solidity / Rust 合约 <br>‑ 零存储 Merkle 证明上链（TON） <br>‑ 社区关注安全审计的可验证性与成本 | **Open** |
| 5 | [#1703](https://github.com/anthropics/skills/pull/1703) | **md2video‑audio** | - Markdown → MP4 视频（Marp 幻灯 + 人声配音） <br>‑ “零成本”生成演示/教学视频 <br>‑ 讨论焦点：语音质量、字幕同步、版权音频库 | **Open** |
| 6 | [#1961](https://github.com/anthropics/skills/pull/1961) | **skill‑creator ‑ Eval Viewer 安全加固** | - 防止脚本突破、DNS rebinding、跨站 POST、HTML 转义漏洞 <br>‑ 评估页面本地化后成为潜在攻击面 <br>‑ 社区赞同强化本地安全边界 | **Open** |
| 7 | [#1792](https://github.com/anthropics/skills/pull/1792) | **docx ‑ LibreOffice 超时错误检测** | - 超时不再误报成功 <br>‑ 验证输出 DOCX 是否真的去除修订标记 <br>‑ 对企业文档合规性需求强 | **Open** |
| 8 | [#1997](https://github.com/anthropics/skills/pull/1997) | **skill‑creator ‑ YAML Front‑matter 标量解析修复** | - 引号与换行处理不当导致元数据失真 <br>‑ 影响 benchmark、trigger eval 的准确性 <br>‑ 需求高：Skill 描述的可机器读取性 | **Open** |

> **说明**：上述 PR 均在仓库的 “热门 Pull Requests（按评论数排序）” 前 20 条中出现，代表社区关注度最高。当前全部为 **Open**（尚未合并），但已有大量技术评论和实际使用反馈，表明落地迫在眉睫。

---  

## 2. 社区需求趋势（从 Issues 提炼）

| 需求方向 | 代表 Issue（链接） | 主要诉求 |
|----------|-------------------|----------|
| **Skill 安全与信任** | [#492 Security: community skills under `anthropic/` namespace](https://github.com/anthropics/skills/issues/492)（46 条评论） | 防止恶意社区 Skill 冒充官方，建议实现 **命名空间验证、签名或官方审查机制**。 |
| **组织内部共享** | [#228 Enable org‑wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)（16 条评论） | 直接在 Claude AI 控制台内创建、发布、共享 Skill 库，省去手动上传/下载环节。 |
| **Skill 触发率与评估可靠性** | [#556 run_eval.py: `claude -p` never triggers skills/commands](https://github.com/anthropics/skills/issues/556)（12 条评论） | 评估框架无法检测到 Skill 调用，影响质量基准；需要改进 **trigger detect** 与 **command serialization**。 |
| **Skill 生命周期管理** | [#62 All my skills have disappeared](https://github.com/anthropics/skills/issues/62)（10 条评论） | 当本地文件改名或路径变动时，Skill 自动失效；期待 **持久化注册表** 或 **软链接**。 |
| **内存/状态压缩** | [#1329 Proposal: compact‑memory (symbolic notation for compact agent state)](https://github.com/anthropics/skills/issues/1329)（9 条评论） | 长时代理在上下文中记录笔记占用大量 token，需 **符号化/压缩记忆** 方案。 |
| **质量/安全分析元 Skill** | [#83 Add skill‑quality‑analyzer & skill‑security‑analyzer to marketplace](https://github.com/anthropics/skills/pull/83)（已合并） | 社区希望 **自动化评估 Skill 本身** 的质量与安全，形成 “Skill Marketplace” 的筛选标准。 |
| **文档与示例去重** | [#189 document‑skills & example‑skills plugins install identical content](https://github.com/anthropics/skills/issues/189)（6 条评论） | 插件间的重复 Skill 增加上下文负担，需 **统一插件发布规范**。 |
| **工具链兼容性** | 多条 PR/Issue（#1390、#1383、#1394 等）围绕 **skill‑creator 在 Windows / 多平台的运行异常**、**HTML XSS**、**评估结果沉默** 等细节问题，表明 **跨平台可靠性** 是持续关注点。 |

**趋势概括**：  
- **安全/信任**（命名空间、执行沙箱）是最高优先级。  
- **组织协作**（内部共享、版本管理）与 **可靠的评估/触发机制** 紧随其后。  
- **工作流自动化**（文档转实现、代码审计、媒体生成）仍是需求增长的核心驱动力。  

---  

## 3. 高潜力待合并 Skills（评论活跃、问题导向明确）

| PR 编号 & 链接 | Skill 方向 | 关键价值 | 预计落地时间（依据社区活跃度） |
|----------------|------------|----------|------------------------|
| [#1742](https://github.com/anthropics/skills/pull/1742) | MCP ≥ 2 兼容层 | 保证现有 MCP‑builder Skill 在新 MCP 版本上不失效 | 1‑2 周 |
| [#1298](https://github.com/anthropics/skills/pull/1298) | Windows / Runtime 容错 | 解决跨平台触发评估失真，提升 CI / CI‑CD 可靠性 | 2‑3 周 |
| [#1245](https://github.com/anthropics/skills/pull/1245) | Notion Spec → Implementation | 将产品需求直接转化为可执行任务，降低需求落地摩擦 | 3‑4 周 |
| [#1771](https://github.com/anthropics/skills/pull/1771) | 智能合约审计 | 自动化安全审计并提供不可篡改证明，满足 Web3 开发者安全需求 | 2‑3 周 |
| [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown → Video + Audio | 一键生成教学/演示视频，提升内容生产效率 | 1‑2 周 |
| [#1961](https://github.com/anthropics/skills/pull/1961) | Eval Viewer 安全加固 | 防止本地评估页面成为攻击面，提升整体 Skill 生态安全 | 1‑2 周 |
| [#1792](https://github.com/anthropics/skills/pull/1792) | DOCX 超时与修订检测 | 确保文档清理操作的可靠性，适用于合规审计 | 1‑2 周 |
| [#1997](https://github.com/anthropics/skills/pull/1997) | YAML Front‑matter 解析 | 消除元数据失真，提升 benchmark 与 trigger 的准确性 | 1‑2 周 |

> **观察**：这些 PR 大多数已经在最近两周内有代码更新，且讨论集中在实际使用场景的兼容性或安全性上，预计在下一轮发布（Claude Code 2.2.x）中会被合并。

---  

## 4. Skills 生态洞察（一句话总结）

> **当前社区最集中诉求是“安全、可信且跨平台的自动化工作流”，尤其关注 Skill 的命名空间信任、组织内部共享以及在真实生产环境（Windows、MCP ≥ 2、Web3）中的稳定运行。**  

---  

*本报告基于截至 2026‑10‑20 的 GitHub PR/Issue 数据编制，供内部产品规划、社区运营及贡献者参考。*

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期**: 2026-10-20  
**数据来源**: github.com/openai/codex  
**分析维度**: 发布动态、Issues、PR、趋势与痛点

---

## 1. 今日速览

过去24小时内，Codex 项目迎来了一波密集的版本迭代，**Rust v0.164.0-alpha** 系列发布了三个 Alpha 版本，涉及运行时注册、沙箱迁移和会话管理优化。与此同时，**Windows 平台的 Computer Use** 和 **MCP (Model Context Protocol)** 相关问题依然是社区反馈的焦点，尤其是沙箱进程泄漏和内存占用过高的问题引发了较多关注。

---

## 2. 版本发布

### Rust v0.164.0-alpha 系列更新 (2026-10-19)
本次更新主要集中在底层运行时稳定性和企业级功能支持上：

*   **运行时注册与安全**: 新增 `ephemeral runtime registration` (PR #55402, #55398) 和 `signed assertions`，增强了 OAuth 流程中的身份验证安全性。
*   **沙箱与安全**: PR #55384 修复了预沙箱可执行文件查找中的符号链接替换漏洞；PR #55378 完成了 Windows MXC 沙箱向 `mxc-sdk` 的迁移。
*   **会话管理**: PR #55375 改进了子代理的线程环境继承机制；PR #55380 优化了线程元数据在文件未生成时的读取逻辑。
*   **新功能**: PR #55387 引入了 **Academic Researchers 计划**的支持，完善了企业级权限管理。
*   **内部优化**: PR #55368 默认启用 Responses Lite 的增量工具模式，PR #55396 优化了历史页面的预取路径。

---

## 3. 社区热点 Issues

以下 Issues 反映了当前用户最棘手的技术痛点：

1.  **[OPEN] Abnormal Codex usage/quota depletion** (#41220) - *评论: 69*
    *   **重要性**: **最高优先级**。大量用户反馈订阅额度或积分消耗速度远超预期，甚至出现使用量统计不一致的情况。
    *   **社区反应**: 20 个点赞，说明这是普遍存在的核心体验问题。

2.  **[OPEN] Windows 10 Computer Use deadlocks awaiting SoftwareBitmap conversion** (#35446) - *评论: 44*
    *   **重要性**: **跨平台稳定性**。Computer Use 功能在 Windows 10 上出现死锁，严重影响自动化任务的执行。

3.  **[OPEN] Windows Computer Use screenshot capture fails** (#49383) - *评论: 31*
    *   **重要性**: **功能可用性**。Windows 平台下的截图捕获功能不稳定，导致无法可靠地识别应用窗口。

4.  **[OPEN] exceeded retry limit, last status: 429 Too Many Requests** (#12680) - *评论: 22*
    *   **重要性**: **网络与限流**。CLI 工具在频繁请求时遭遇 429 错误，可能是限流策略过于激进或重试机制失效。

5.  **[OPEN] Calls ring without connecting across iPhone, Mac and Windows web** (#50870) - *评论: 20*
    *   **重要性**: **跨设备体验**。Dots (语音功能) 在多设备间通话无法建立连接，严重影响协作体验。

6.  **[OPEN] dot cannot read user-created Codex threads** (#52873) - *评论: 19*
    *   **重要性**: **数据访问**。用户无法通过 dot 访问自己创建的线程，存在严重的后端兼容性问题。

7.  **[OPEN] Windows sandbox CreateProcessAsUserW fails with error 5** (#35871) - *评论: 17*
    *   **重要性**: **沙箱权限**。当使用 MSIX 版本的 PowerShell 7 时，沙箱无法启动进程，属于严重的安全权限漏洞。

8.  **[OPEN] Pro limits now feel dramatically worse** (#15307) - *评论: 13*
    *   **重要性**: **计费争议**。Pro 用户抱怨配额消耗速度激增，且已关闭。

9.  **[OPEN] Windows 26.1002.6548.0 memory accumulation** (#51649) - *评论: 9*
    *   **重要性**: **性能与资源泄漏**。Codex Desktop 在 Windows 上积累大量 Node helper 进程，内存占用高达 11.6 GB。

10. **[OPEN] Codex Remote handoff says "Paginated chats cannot be continued"** (#40879) - *评论: 8*
    *   **重要性**: **远程协作**。远程会话无法在另一台主机上继续，阻碍了多设备工作流。

---

## 4. 重要 PR 进展

以下 PR 展示了开发团队正在解决的具体技术问题：

1.  **[CLOSED] Add ephemeral runtime registration** (#55402)
    *   **内容**: 增加运行时实例的注册客户端和内存断言签名器，增强并发重试能力。
2.  **[CLOSED] Defer environment disconnect notifications** (#55401)
    *   **内容**: 优化环境断开通知逻辑，防止在会话恢复期间误发断连信号。
3.  **[CLOSED] Record OAuth provenance** (#55397)
    *   **内容**: 记录 OAuth 登录来源，防止未验证的 Token 声称导致权限混乱。
4.  **[CLOSED] Roll back interrupted Guardian reviews** (#55395)
    *   **内容**: 防止被取消或超时的 Guardian 审查会话残留证据，确保后续审查的数据完整性。
5.  **[CLOSED] Mark `transcript_v2` as removed** (#55388)
    *   **内容**: 标记废弃的 `transcript_v2` 特性，统一使用 `tui.fullscreen_transcript` 控制选项。
6.  **[CLOSED] Add support for Academic Researchers plans** (#55387)
    *   **内容**: 完善学术研究计划的认证、配额和仪表盘支持。
7.  **[CLOSED] Reject replaceable symlinks in pre-sandbox executable lookup** (#55384)
    *   **内容**: 修复文件系统安全检查漏洞，拒绝在预沙箱查找中使用可替换的符号链接。
8.  **[CLOSED] Manage TUI backend sessions independently** (#55381)
    *   **内容**: 改进 TUI（终端界面）后端会话的独立管理和取消安全机制。
9.  **[CLOSED] Fix recall of command-line initial prompts in the TUI** (#55372)
    *   **内容**: 修复命令行初始提示词在 TUI 历史记录中丢失的问题，现在支持通过上下键找回。
10. **[CLOSED] Enable incremental tools by default for Responses Lite** (#55368)
    *   **内容**: 将增量工具模式设为默认，提升 Responses Lite 会话的响应效率。

---

## 5. 功能需求趋势

从 Issues 和 PR 的分析来看，开发者和用户关注点主要集中在以下三个方向：

1.  **跨平台稳定性与沙箱安全**:
    *   **现状**: Windows 平台（尤其是 10 和 11）的 Computer Use、沙箱和进程管理问题最多（如 #35446, #35871, #51649）。
    *   **趋势**: 开发者正在通过迁移到 `mxc-sdk` 和修复权限检查（#55384）来加强 Windows 沙箱的安全性。

2.  **性能与资源管理**:
    *   **现状**: MCP 进程泄漏和内存占用过高是高频反馈（#51649, #53285）。
    *   **趋势**: PR #55381 和 #55372 表明团队正在加强对后台会话和进程的生命周期管理，防止资源泄漏。

3.  **企业级与多租户功能**:
    *   **现状**: Academic Researchers 计划的支持（PR #55387）以及企业 MCP 认证（PR #55394）正在推进。
    *   **趋势**: 产品策略正从单一个人工具向支持教育机构和企业工作区的多租户架构演进。

---

## 6. 开发者关注点

*   **计费透明度**: #41220 和 #15307 暴露了用户对“配额消耗过快”和“账单不一致”的恐慌，这直接影响用户留存。
*   **CLI 与 TUI 体验**: #12680 和 #55372 指出 CLI 在网络波动时的容错能力较弱，且历史记录检索存在 Bug。
*   **数据迁移与兼容性**: #52873 和 #55383 反映了新旧数据格式或跨平台数据同步（如与 Claude 的导入）存在兼容性问题。
*   **插件与扩展生态**: #55386 提到 Computer Use 插件缺失，#40925 呼吁支持原生网页弹窗，显示出对插件能力的强烈需求。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：** 2026-10-20  
**数据来源：** github.com/github/copilot-cli

---

## 1. 今日速览
GitHub Copilot CLI 今日发布了 **v1.0.101-0** 版本，重点增强了 Agent 的结构化输出能力和 Assisted Permissions 的引导机制。同时，社区活跃度极高，共有 31 个 Issue 在过去 24 小时内更新，主要集中在 **MCP (Model Context Protocol) 权限管理**、**Sandbox（沙箱）隔离**以及 **Windows/Linux 平台兼容性** 等领域，反映出用户对高级安全特性与跨平台稳定性的强烈需求。

---

## 2. 版本发布：v1.0.101-0
**发布时间：** 2026-10-20（过去24小时）

*   **新增功能**
    *   **Agent 结构化输出**：为支持模型添加了原生结构化输出功能，优化了动态 Workflow Subagents 的工作效率。
    *   **Assisted Permissions 引导**：新增 `assistedApprovalInstructions` 设置，旨在更智能地指导用户进行 Assisted Permissions 的确认决策。
*   **Bug 修复**
    *   修复了共享 MCP 认证错误提示不准确的问题，现在错误信息会明确指向客户端的登录设置。
    *   修复了 CLI 认证警告在特定场景下显示不完整的问题。

---

## 3. 社区热点 Issues

**#4438: disable-model-invocation: true 导致 Skill 不可访问**
*   **重要性：** ⭐⭐⭐⭐⭐
*   **摘要：** 这是一个严重的逻辑 Bug。当 `SKILL.md` 中设置 `disable-model-invocation: true` 时，Skill 在列表中可见，但 CLI 无法通过工具调用找到它。
*   **社区反应：** 14 个 👍，讨论集中在如何正确配置该属性以实现“手动调用”而非“模型调用”的功能。

**#5192: ACP 模式下 MCP OAuth Token 持久化失败**
*   **重要性：** ⭐⭐⭐⭐⭐
*   **摘要：** 在 `--acp` 模式下，OAuth Token 在登录成功后未被写入磁盘或 Keychain，导致每次新会话都需要重新授权。
*   **社区反应：** 1 个 👍，严重影响了非交互式自动化场景的使用体验。

**#5177: 权限提示回归：Git 命令不再弹出手动批准**
*   **重要性：** ⭐⭐⭐⭐
*   **摘要：** 在 10 月的 Harness 迁移后，VS Code Copilot 对仓库 mutating Git 命令的显式批准提示失效，存在安全风险。
*   **社区反应：** 1 个 👍，涉及安全机制的回归，需立即修复。

**#5176: Linux Sandbox 导致 Shell 命令约 10 秒后被杀**
*   **重要性：** ⭐⭐⭐⭐
*   **摘要：** 启用 Sandbox 后，超过 10 秒的命令会被 SIGKILL 杀死，导致 CI/CD 等长任务失败。
*   **社区反应：** 0 个 👍，限制了许多复杂自动化脚本的执行。

**#5194: Windows 插件更新失败 (Access is denied)**
*   **重要性：** ⭐⭐⭐⭐
*   **摘要：** 在 Windows 上，只要任何 CLI 会话在运行，插件更新就会报错 5。这是一个典型的文件锁冲突问题。
*   **社区反应：** 1 个 👍，严重阻碍了插件的迭代和维护。

**#5040: Entra ID OAuth 回调失败 (AADSTS50011)**
*   **重要性：** ⭐⭐⭐
*   **摘要：** 使用 `127.0.0.1` 作为回调地址时，Entra ID 拒绝连接，导致 MCP 服务器无法认证。
*   **社区反应：** 1 个 👍，影响企业级用户接入。

**#5180: Surge Fake-IP 导致 web_fetch 失败**
*   **重要性：** ⭐⭐⭐
*   **摘要：** 在启用 Surge 增强模式的 macOS 上，DNS 返回 Fake-IP 地址，导致 CLI 无法访问公共文档。
*   **社区反应：** 0 个 👍，网络层干扰问题。

**#4950: BYOK Provider 强制使用 temperature=0 导致推理模型退化**
*   **重要性：** ⭐⭐⭐
*   **摘要：** CLI 强制发送 `temperature: 0`，导致自定义推理模型（如 Qwen）无法正常工作并发生静默挂起。
*   **社区反应：** 0 个 👍，影响使用私有模型的企业用户。

**#3265: 添加 `/pause` 或 `/stop` 命令打断 Agent**
*   **重要性：** ⭐⭐⭐
*   **摘要：** 功能需求。用户希望在 Agent 推理过程中能够温和地暂停对话，而不是强制取消。
*   **社区反应：** 6 个 👍，体现了对交互体验的精细化需求。

**#5198: Windows WSL2 语音服务器崩溃**
*   **重要性：** ⭐⭐
*   **摘要：** 更新到 1.0.100 后，WSL2 中的 `/voice` 功能因 Segfault 崩溃。
*   **社区反应：** 0 个 👍，特定平台的功能故障。

---

## 4. 重要 PR 进展
*当前 24 小时内无新 Pull Request 更新，此处基于当前活跃 Issue 提炼潜在修复方向：*

1.  **修复 MCP OAuth 持久化逻辑**：PR 需确保 Token 在 ACP 模式下正确写入 Keychain/文件系统。
2.  **修复 disable-model-invocation Skill 路由**：PR 需调整模型工具调用的路由逻辑，正确处理手动/模型调用分离。
3.  **修复 Linux Sandbox 超时杀进程**：PR 可能需要调整 bwrap 的超时设置或线程绑定策略。
4.  **修复 Windows 插件更新文件锁**：PR 需解决跨进程文件访问冲突问题。

---

## 5. 功能需求趋势

通过分析过去 24 小时内的 Issue，社区关注点主要集中在以下三个维度：

1.  **MCP 协议与权限管理**
    *   **MCP OAuth**：远程 MCP 服务器的认证流程（特别是 ACP 模式下的 Token 持久化）是目前最热的痛点。
    *   **权限粒度**：社区开始关注如何更细致地区分只读和写入操作，避免对 `docker ps` 等只读命令进行过度弹窗。
2.  **Agent 交互与控制**
    *   **中断机制**：用户希望有更温和的方式来打断 Agent 的长推理过程（如 `/pause` 命令）。
    *   **输出控制**：`/clear` 不应重置模型选择，以及 Automode 的输出隐藏问题，反映出对交互流程完整性的需求。
3.  **Sandbox（沙箱）隔离**
    *   **跨平台稳定性**：Linux 上的长任务被杀和 Windows 上的文件锁是高频报错点，Sandbox 机制在复杂场景下的健壮性有待提升。

---

## 6. 开发者关注点

*   **文件锁冲突**：Windows 用户反馈插件更新在 CLI 运行时受阻，这是典型的环境资源竞争问题。
*   **安全回归**：Git 命令批准提示的消失引发了安全社区的担忧，DevOps 流程的安全性至关重要。
*   **网络层干扰**：Surge Fake-IP 等系统级网络工具导致的访问失败，提示 CLI 在处理特殊网络环境时的鲁棒性不足。
*   **模型配置灵活性**：BYOK 用户抱怨 CLI 强制参数（如 `temperature=0`）破坏了自定义推理模型的能力，建议开放更多参数控制权。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：** 2026-10-20
**数据来源：** github.com/anomalyco/opencode

---

## 1. 今日速览
过去24小时内，OpenCode 项目无新版本发布。社区焦点集中在 **Desktop 端交互体验优化**（如焦点环、链接可点击性）以及 **Core 后端架构修复**（插件订阅作用域、会话数据读取一致性）。同时，针对 TUI（终端界面）的会话加载性能和渲染效率问题也有持续改进。

## 2. 版本发布
**无新版本发布。**

## 3. 社区热点 Issues

1.  **#50650 [OPEN] desktop: custom provider save always throws "unavailable on this server"**
    *   **重要性：** 高。这是一个阻塞性 Bug，导致用户无法在桌面端保存自定义的 OpenAI 兼容提供商配置，无论服务器如何配置。
    *   **社区反应：** 11 个评论，5 个点赞。

2.  **#56470 [OPEN] permissions: ask effect is fail-open for shell commands**
    *   **重要性：** 高。权限系统设计缺陷，当配置 `effect: "ask"` 时，命令实际上并未被阻止而是直接执行，导致客户端无法收到回复。
    *   **社区反应：** 8 个评论。

3.  **#57199 [OPEN] provider: cacheFormat "anthropic" puts cache_control inside tool message content**
    *   **重要性：** 中高。影响 Anthropic Gateway 的缓存功能，导致工具调用后的缓存策略失效。
    *   **社区反应：** 2 个评论。

4.  **#53576 [CLOSED] lsp: an extensionless file name matches no builtin server (Dockerfile, Makefile)**
    *   **重要性：** 中。修复了无扩展名文件（如 Dockerfile）无法被内置 LSP 服务器识别的问题。
    *   **社区反应：** 3 个评论。

5.  **#51655 [CLOSED] [2.0] bug(desktop): unguarded permission dock crashes the whole renderer**
    *   **重要性：** 中。权限请求面板的防御性编程不足，导致在特定数据结构下渲染器崩溃。
    *   **社区反应：** 3 个评论。

6.  **#53428 [CLOSED] TUI: opening a long session waits for its last 100 messages before drawing**
    *   **重要性：** 中。TUI 启动性能问题，加载长会话时会有明显的白屏等待。
    *   **社区反应：** 2 个评论。

7.  **#53391 [CLOSED] TUI: a session outside the loaded session list is blank until its messages load**
    *   **重要性：** 中。TUI 会话管理逻辑缺陷，导致跨目录或旧会话加载时体验不佳。
    *   **社区反应：** 2 个评论。

8.  **#52719 [CLOSED] Regression: moved Git project keeps stale worktree path**
    *   **重要性：** 中。Git 仓库迁移后的状态管理问题，可能导致新会话初始化失败。
    *   **社区反应：** 2 个评论。

9.  **#47393 [CLOSED] bug(sdk): native Headers entries are lost when configuring client scope**
    *   **重要性：** 中。SDK 在处理原生 Headers 对象时的数据丢失问题，影响请求发送。
    *   **社区反应：** 3 个评论。

10. **#51655 [CLOSED] [2.0] bug(desktop): unguarded permission dock crashes the whole renderer**
    *   **重要性：** 中。已修复的崩溃问题，涉及权限请求面板的边界检查。
    *   **社区反应：** 3 个评论。

[查看完整 Issues 列表](https://github.com/anomalyco/opencode/issues)

## 4. 重要 PR 进展

1.  **#57186 [OPEN] fix(core): preserve location scope for plugin event subscriptions**
    *   **内容：** 修复了插件在订阅事件或重新加载目录时，作用域丢失的问题，防止跨位置污染。
    *   **类型：** Bug fix。

2.  **#57223 [OPEN] fix(client): scope and coalesce catalog refreshes**
    *   **内容：** 优化目录刷新机制，防止所有客户端都去刷新彼此打开的位置，提升性能。
    *   **类型：** Bug fix。

3.  **#57220 [OPEN] fix(core): retry compaction on output token limit and preserve user turns**
    *   **内容：** 修复了在输出 Token 达到限制时的压缩重试逻辑，确保保留用户轮次。
    *   **类型：** Bug fix。

4.  **#57156 [OPEN] fix(desktop): ⌘T opens a browser tab inside the browser pane**
    *   **内容：** 实现了在桌面端浏览器面板内打开新标签页的功能（快捷键 ⌘T）。
    *   **类型：** Feature。

5.  **#55016 [OPEN] feat(app): support Mod+J to toggle terminal**
    *   **内容：** 新增快捷键支持，允许用户在桌面端快速切换终端的显示/隐藏。
    *   **类型：** Feature。

6.  **#57218 [OPEN] feat(app): show how long background work has been running**
    *   **内容：** 在活动胶囊中显示后台任务（如 Shell、子代理）的运行时长。
    *   **类型：** Feature。

7.  **#57221 [OPEN] fix(app): keep focus rings unclipped and keyboard-only**
    *   **内容：** 修复桌面端焦点环被裁剪或因非键盘操作误触发的问题，提升 UI 一致性。
    *   **类型：** Bug fix。

8.  **#57148 [OPEN] fix: hide retired models and offer another model when a provider retires one**
    *   **内容：** 当提供商下架模型时，UI 应自动隐藏并提供替代模型，避免用户困惑。
    *   **类型：** Bug fix。

9.  **#57208 [OPEN] docs(ecosystem): add opencode-agent-looper to ecosystem plugins**
    *   **内容：** 文档更新，将 `opencode-agent-looper` 插件加入生态列表。
    *   **类型：** Documentation。

10. **#57016 [OPEN] feat(session-ui): replace marked + remend streaming re-lexing with @opencode/patchmark**
    *   **内容：** 重构流式渲染引擎，从每次全量解析改为增量解析，大幅提升长消息渲染性能。
    *   **类型：** Refactor。

[查看完整 PR 列表](https://github.com/anomalyco/opencode/pulls)

## 5. 功能需求趋势

*   **TUI/终端交互体验：** 社区持续关注 TUI 的会话加载速度、标签页布局（如长单词换行、会话列表加载）以及会话状态管理。
*   **Desktop 桌面端优化：** 高频需求集中在 UI 的可访问性和一致性，如焦点环显示、链接可点击性、快捷键支持（如终端切换、新标签页）。
*   **插件系统稳定性：** 插件加载、事件订阅作用域、插件状态生命周期（如失败后的清理）是开发者反馈的重点。
*   **后端架构与性能：** 会话数据读取的一致性（防止误恢复删除的会话）、目录刷新的并发控制、长会话的数据库查询性能（N+1 问题）备受关注。

## 6. 开发者关注点

*   **开发者体验 (DX)：** 插件开发者在配置 `directory` 或 `experimental_workspaceID` 时遇到原生 Headers 对象丢失的问题，影响 SDK 使用。
*   **多环境兼容性：** 在无扩展名的文件（如 Dockerfile）中，LSP 服务器的识别逻辑存在边界情况。
*   **权限控制逻辑：** 权限规则的 "ask" 效果设计上存在 Fail-open 风险，需要确保命令执行与权限确认的严格顺序。
*   **架构维护性：** 随着代码库增长，会话压缩、会话加载等核心逻辑的复杂度增加，需要更好的错误恢复和状态重置机制。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 (2026-10-20)

## 1. 今日速览
过去24小时内，Pi 社区主要围绕 **TUI 交互体验优化**（特别是 Rex 和 Kitty 终端兼容性）以及 **Agent 编排与工具调用稳定性** 进行了修复。同时，社区对新模型的支持（如 MiniMax、ai&）和持久化会话管理提出了多项改进请求。

## 2. 版本发布
*暂无新版本发布。*

## 3. 社区热点 Issues

**1. #4945: OpenAI Codex 连接可靠性问题 (评论: 84)**
*   **重要性**: 🔴 高优先级
*   **摘要**: `gpt-5.5` 在交互式 TUI 中偶尔会卡在 "Working..." 状态，无文本流、无工具调用且无错误信息，必须按 Escape 恢复。这是过去几天反复出现的问题。
*   **反应**: 社区高度关注，作为最高赞数的 Issue，反映了用户对核心交互体验的强烈不满。

**2. #10895: 支持系统级配置 (MDM) 以增强安全**
*   **重要性**: 🔴 高优先级
*   **摘要**: 请求支持在最高优先级加载系统级配置（如 `/etc/pi/models.json`），以增强 Pi 的信任模型和安全态势。
*   **反应**: 获得零赞，但技术讨论深入，涉及企业级部署的安全需求。

**3. #6300: Windows TUI 输入行重绘 Bug**
*   **重要性**: 🟡 中优先级
*   **摘要**: 在 Windows 终端中，每次按键都会重绘输入行，导致每个字符出现在新的一行，严重影响打字体验。
*   **反应**: 用户详细描述了环境（Windows 10/22H2, Node v22.x），是典型的平台兼容性问题。

**4. #8036: Edit 工具渲染大 Diff 时崩溃**
*   **重要性**: 🟡 中优先级
*   **摘要**: `edit` 工具在渲染约 14.5 MB 的 Diff 时导致 TUI 崩溃，尽管编辑本身成功，但结果无法显示。
*   **反应**: 提示 `[inprogress]`，说明开发者正在跟进修复内存渲染问题。

**5. #9265: O(n²) 工具调用解析导致事件循环冻结**
*   **重要性**: 🔴 高优先级 (性能)
*   **摘要**: `openai-completions` 流处理在每次增量更新时都重新解析整个工具调用 JSON，导致成本呈二次方增长，并在嵌入式运行时冻结事件循环。
*   **反应**: 技术分析深入，指出了流处理实现的性能瓶颈。

**6. #10259: 公共工具展示 API 或内置单行模式**
*   **重要性**: 🟢 功能需求
*   **摘要**: 请求提供公开的 API 来控制所有工具行的展示（包括内置、MCP、Codemode），或者提供内置的单行模式显示工具摘要。
*   **反应**: 2 个赞，反映了用户对 Agent 界面可定制性的需求。

**7. #10924: 自定义消息提交时并发处理竞态条件**
*   **重要性**: 🟡 中优先级 (稳定性)
*   **摘要**: 带有 `triggerTurn: true` 的自定义消息可能在输入处理器或认证检查运行时就开始自己的运行，导致会话状态混乱。
*   **反应**: 技术细节丰富，涉及会话状态管理的并发控制。

**8. #11061: restoreSystemMessages 破坏 Prompt Caching**
*   **重要性**: 🟡 中优先级 (性能)
*   **摘要**: 扩展钩子返回的消息会导致 `restoreSystemMessages` 将所有系统消息合并为头部，破坏了 prompt caching 机制。
*   **反应**: 关联到上下文扩展的性能优化。

**9. #11112: 修复解析失败的工具调用参数**
*   **重要性**: 🟡 中优先级 (稳定性)
*   **摘要**: Claude 有时会在 `edit` 调用中生成无效的 JSON（如 `oldText">` 而非 `oldText":"`），导致参数解析失败。
*   **反应**: 版本 1.3.0 引入的回归问题，影响编辑功能。

**10. #11135: MCP 登录刷新与连接刷新的竞态条件**
*   **重要性**: 🟡 中优先级 (稳定性)
*   **摘要**: MCP 登录和普通连接刷新没有共享刷新锁，导致在刷新令牌轮换时可能发送相同令牌，引发认证错误。
*   **反应**: 描述了具体的认证失败场景。

## 4. 重要 PR 进展

**1. #11153: feat(tui): Enable Kitty images for Rex (已关闭)**
*   **内容**: 实现了 Rex 终端的 Kitty 图片渲染支持。
*   **意义**: 解决了 #11131 中提到的 Rex 终端支持但未启用图片功能的问题，提升了跨终端的视觉体验。

**2. #11150: feat(tui): Detect Rex terminal for OSC 8 hyperlinks (已关闭)**
*   **内容**: 通过检测 `TERM_PROGRAM=rex` 启用 Rex 终端的 OSC 8 超链接和真彩色支持。
*   **意义**: 修复了 Rex 用户无法使用超链接功能的问题。

**3. #11151: feat(coding-agent): content-tool-call-assist example extension (已关闭)**
*   **内容**: 添加了一个示例扩展，允许小模型在消息内容中（如 fenced JSON 或 XML）发出工具调用，而不仅仅是标准结构。
*   **意义**: 增强了 Agent 的灵活性和对开源模型的支持。

**4. #11142: pkg:ai: fix prompt cache across tool changes (开放)**
*   **内容**: 修复了在 Responses API 中，工具变更后提示缓存失效的问题，防止每次工具变更后都重写工具列表。
*   **意义**: 优化了 Prompt Caching 的使用，减少 API 调用成本。

**5. #11145: fix: preserve scoped model order and prefer substring matches (开放)**
*   **内容**: 改进了模型选择器的模糊匹配逻辑，修复了作用域模型排序问题。
*   **意义**: 提升了用户在众多模型中快速找到目标模型的体验。

**6. #11126: read tool: expose maxLines/maxBytes as tool options (已关闭)**
*   **内容**: 将 `read` 工具的行数和字节限制暴露为配置选项。
*   **意义**: 解决了默认 50KB 限制过小导致无法读取大文件的问题。

**7. #11120: fix(ai): disable developer role for Groq Qwen models (已关闭)**
*   **内容**: 修复了 Groq 的 Qwen 模型在 OpenAI Completions 适配器中被错误分配 `developer` 角色，导致 Jinja 模板渲染失败。
*   **意义**: 修复了 Groq 平台模型支持的关键兼容性问题。

**8. #11016: Fix/copilot request size overflow (已关闭)**
*   **内容**: 修复了 Copilot 请求大小溢出问题，特别是在包含大量图片的会话中。
*   **意义**: 防止了大文件会话中的崩溃。

**9. #11081: fix(tui): keep ~ joined in double-click word selection (已关闭)**
*   **内容**: 修复了在双击选择路径时，`~` (波浪号) 被截断的 Bug。
*   **意义**: 提升了 TUI 中路径选择的准确性。

**10. #11140: fix(compaction): retry summary without reasoning (已关闭)**
*   **内容**: 修复了自动压缩在达到 Token 上限时失败，导致会话卡住的问题。
*   **意义**: 保障了长对话会话的自动恢复能力。

## 5. 功能需求趋势

*   **多模型支持**: 社区对非 OpenAI/Anthropic 的支持呼声高涨，包括 **MiniMax** (#11121) 和 **ai&** (#11128) 的请求，显示出对日本和开源模型生态的扩展需求。
*   **终端体验**: **Rex 终端** (#11131, #11153, #11150) 和 **Orca** (#9329) 的兼容性成为热点，表明用户对现代终端功能的（图片、超链接）有强烈需求。
*   **企业级部署**: 对 **System Level Configuration (MDM)** (#10895) 的讨论反映了 B 端用户对安全合规和集中化管理的关注。
*   **性能优化**: 针对事件循环冻结 (#9265) 和 Prompt Caching (#11142) 的修复表明性能优化是核心关注点。

## 6. 开发者关注点

*   **流处理稳定性**: `openai-completions` 的流解析逻辑存在性能隐患，导致在复杂场景下卡死或高延迟。
*   **工具调用容错**: 编辑器（`edit`）工具在处理边缘 JSON 格式时容易崩溃，需要更强的参数容错和修复机制。
*   **会话状态管理**: 在多工具、多扩展、自定义消息触发并发的场景下，会话的状态机逻辑（Idle/Busy）容易产生竞态条件。
*   **会话持久化**: `restoreSystemMessages` 破坏缓存、会话 ID 时序保证 (#11113) 等问题，暴露了持久化层在复杂操作下的脆弱性。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期**: 2026-10-20 | **来源**: GitHub (QwenLM/qwen-code)

---

## 1. 今日速览
Qwen Code 发布了 v0.25.3 版本，主要针对桌面端和 SDK 进行了多项修复与增强，包括修复登录页闪烁、支持会话级技能刷新等。社区活跃度较高，当前有 50 个 Issues 和 50 个 PR 正在处理中，主要集中在 CI/CD 稳定性改进、Managed Agent 架构的健壮性测试以及 Web Shell 的 UI/UX 优化。

---

## 2. 版本发布
### v0.25.3 (2026-10-19)
本次更新包含 CLI、SDK (TypeScript v0.1.21) 和 Desktop 客户端。

**主要更新**:
*   **Features**:
    *   在 Test Failure Explorer 中添加了可选的模型生成布局，支持验证和回退到固定视图。
    *   支持针对会话目标的 Skill 和 Extension 刷新。
*   **Fixes**:
    *   修复桌面端登录/Token 屏幕在启动时短暂闪烁的问题。
    *   修复 Managed Agent 在 journal-only 中断回合结算时未正确处理 team_plan_approval 的问题。

---

## 3. 社区热点 Issues (Top 10)

1.  **#14492: Main CI 失败 - SDK Java 持续性问题**
    *   **重要性**: 高 | **状态**: Open
    *   **摘要**: Java 测试套件在 CI 中持续失败，涉及 `HostedExtensionsIT`。
    *   **关注点**: 这影响整个 Java SDK 的稳定性，特别是与 Harness 替换和取消相关的功能。

2.  **#14746: [Security] 项目钩子启动时无需批准运行**
    *   **重要性**: P1 (最高) | **状态**: Open
    *   **摘要**: 默认情况下，`.qwen/settings.json` 中的钩子在启动时无需用户确认即可运行。
    *   **关注点**: 安全风险极高，涉及文件夹信任机制和钩子执行的权限控制。

3.  **#14751: LSP: Config.shutdown() 未停止语言服务器**
    *   **重要性**: P2 | **状态**: Open
    *   **摘要**: `NativeLspService` 启动后，`Config.shutdown()` 没有停止它，导致资源泄漏。
    *   **关注点**: 影响开发者的本地开发体验，可能导致 LSP 服务挂起。

4.  **#14732: embedded-harness-scheduler 测试在负载主机上不稳定**
    *   **重要性**: P3 | **状态**: Closed
    *   **摘要**: `EmbeddedHarnessScheduler` 的边界测试在 CI 负载高时经常失败。
    *   **关注点**: 反映了 CI 环境的稳定性问题。

5.  **#14755: Desktop 登录屏幕每次启动都闪烁**
    *   **重要性**: P3 | **状态**: Open
    *   **摘要**: Windows 启动时显示登录卡片再切换到工作区，视觉体验不佳。
    *   **关注点**: UI/UX 体验优化。

6.  **#14713: Main CI 失败 - Managed Agent MySQL 相关测试**
    *   **重要性**: 中 | **状态**: Open
    *   **摘要**: `HostedMcpStoreFaultGatesIT` 在 MySQL 上失败，涉及存储拒绝和排空逻辑。
    *   **关注点**: 数据持久化和故障恢复机制的稳定性。

7.  **#14742: 跟进: size-telemetry 信号缺口**
    *   **重要性**: P2 | **状态**: Open
    *   **摘要**: 修复工具结果大小计数的遥测信号完整性，特别是关于截断标记的处理。
    *   **关注点**: 监控和可观测性改进。

8.  **#14743: CI: SDK Java 锁等待无法限制单主机队列**
    *   **重要性**: P1 | **状态**: Open
    *   **摘要**: CI 任务在共享文件锁上排队，导致队列饥饿，某些任务在执行前就超时失败。
    *   **关注点**: CI 资源管理和调度优化。

9.  **#14775: Web Shell: 从会话上下文菜单添加会话到分屏视图**
    *   **重要性**: P3 | **状态**: Open
    *   **摘要**: 请求在会话上下文菜单中添加 "Add to Split View" 选项。
    *   **关注点**: 提升多任务处理效率。

10. **#14759: Web Shell: 会话回顾后继工作 (测试覆盖)**
    *   **重要性**: P3 | **状态**: Open
    *   **摘要**: 针对 session-recap 功能的后续优化，包括测试覆盖和文档完善。
    *   **关注点**: 功能健壮性提升。

---

## 4. 重要 PR 进展 (Top 10)

1.  **#14804: fix(ci): wait 90 minutes for the sdk-java host lock**
    *   **内容**: 修复 CI 锁等待超时问题，将 Java 测试作业的等待预算从 60 分钟提升至 90 分钟。
    *   **链接**: [PR #14804](https://github.com/QwenLM/qwen-code/pull/14804)

2.  **#14803: test(managed-agent): replay a failClosed Hook failure after a lost reply**
    *   **内容**: 针对 FG13f 故障场景的测试，模拟 Hook 失败后丢失回复的恢复逻辑。
    *   **链接**: [PR #14803](https://github.com/QwenLM/qwen-code/pull/14803)

3.  **#14805: test(ci): pin that the temp short-alias guard visits both keys**
    *   **内容**: 增强 Windows 环境下临时文件别名守卫的测试覆盖，确保检查 `TEMP` 和 `TMP` 两个键。
    *   **链接**: [PR #14805](https://github.com/QwenLM/qwen-code/pull/14805)

4.  **#14770: fix(web-shell): avoid flashing the credential form during boot token verification**
    *   **内容**: 修复 Web Shell 启动时认证表单闪烁的问题，改为中性 "Connecting..." 状态。
    *   **链接**: [PR #14770](https://github.com/QwenLM/qwen-code/pull/14770)

5.  **#14757: fix(ci): size the sdk-java host lock budget to sibling holds**
    *   **内容**: 调整 SDK Java 任务的锁预算和作业超时时间，以适应更长的等待需求。
    *   **链接**: [PR #14757](https://github.com/QwenLM/qwen-code/pull/14757)

6.  **#14752: fix(cli): share hosted harness deadlines and bail after CI retries**
    *   **内容**: 优化托管 Harness 测试的超时和重试机制，防止无限等待。
    *   **链接**: [PR #14752](https://github.com/QwenLM/qwen-code/pull/14752)

7.  **#14777: fix(ci): skip Managed Agent reviews after the PR closes**
    *   **内容**: 优化 CI 流程，当 PR 关闭后，不再触发完整的 SDK Java 深度测试。
    *   **链接**: [PR #14777](https://github.com/QwenLM/qwen-code/pull/14777)

8.  **#14654: feat(daemon): expose last user prompt time in session summaries**
    *   **内容**: 在会话摘要中增加 `lastUserPromptAt` 元数据，显示最近一次用户输入时间。
    *   **链接**: [PR #14654](https://github.com/QwenLM/qwen-code/pull/14654)

9.  **#14046: feat(core): add a real PTY backend for the Bun runtime**
    *   **内容**: 为 Bun 运行时添加真正的 PTY 后端，使 Shell 工具和 Web Terminal 能正确处理终端输出和调整。
    *   **链接**: [PR #14046](https://github.com/QwenLM/qwen-code/pull/14046)

10. **#14281: feat(memory): add scoped external import jobs for CLI and HTTP**
    *   **内容**: 为 CLI 和云集成添加外部内存导入服务，支持 Markdown 内容的持久化和结构化处理。
    *   **链接**: [PR #14281](https://github.com/QwenLM/qwen-code/pull/14281)

---

## 5. 功能需求趋势
从 Issues 和 PR 的分析来看，社区关注点主要集中在以下几个方向：

*   **CI/CD 稳定性**: 大量 Issue 和 PR 专注于修复 SDK Java 的 CI 失败、锁竞争和测试超时问题。这表明团队正在努力提高自动化测试的可靠性和资源调度效率。
*   **Managed Agent 架构健壮性**: 围绕 "Fault Gates" (故障门控) 和 "Durable Operations" 的测试和修复非常多。社区非常关注分布式和持久化执行环境的容错能力。
*   **Web Shell 体验优化**: 诸如分屏视图、会话回顾、Slash 命令高亮等 UI 改进需求频繁出现，显示出团队对提升开发者交互体验的重视。
*   **安全与权限**: `folderTrust` (文件夹信任) 和 `hooks` (钩子) 的安全问题被标记为 P1/P2，反映了安全审计的加强。

---

## 6. 开发者关注点
1.  **本地开发体验**: 开发者反馈了 LSP 停止不及时、Windows 启动闪烁等问题，这些直接影响开发效率。
2.  **资源管理**: CI 资源竞争（如 Java 测试的锁等待）是当前最大的阻塞点，导致构建时间延长甚至失败。
3.  **Web Terminal 功能**: 社区对于 Web Shell 的功能丰富度提出了较多建议，如更细粒度的会话管理和更丰富的 token 使用统计。
4.  **文档与示例**: 需求中出现了关于 Rapid-MLX 等本地模型提供商的配置文档补充请求，表明社区正在扩展非官方/本地模型的支持场景。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报  
**日期：2026‑10‑20**  

---

## 1️⃣ 今日速览  
- 社区聚焦在 **性能诊断与可靠性**：多个 Issue 报告引擎冻结、沙箱挂载错误以及历史快照回滚失败。  
- TUI 渲染细节的 **UX 改进**（状态行滚动指示、反馈卡片截断、Hotbar 描述）正在通过 PR 快速迭代。

---

## 2️⃣ 版本发布  
> 本日 **无新 Release**（过去 24 h）。

---

## 3️⃣ 社区热点 Issues（精选 10 条）

| 编号 | 标题 / 关键标签 | 重要性说明 | 社区反馈（评论数） | 链接 |
|------|----------------|------------|-------------------|------|
| **#6184** | `bug • subagents • reliability` – Engine silently freezes mid‑run | 直接导致长任务无返回，影响生产力，是当前最紧急的可靠性阻塞 | 9 条评论，讨论了复现步骤与可能的锁竞争 | <https://github.com/codewhale-hq/Codewhale/issues/6184> |
| **#6011** | `enhancement • context • compaction • tui` – Token accounting & tool‑call diagnostics | 为调试复杂工具链提供细粒度计数，帮助定位高消耗子模型和缓存命中率 | 10 条评论，社区已提交多套监控需求 | <https://github.com/codewhale-hq/Codewhale/issues/6011> |
| **#6978** | `bug` – Turn snapshots fail with “git commit‑tree failed” after rollback | 影响历史记录持久化，尤其在 Windows 环境下导致数据丢失 | 7 条评论，用户提供了完整的日志与回滚步骤 | <https://github.com/codewhale-hq/Codewhale/issues/6978> |
| **#7007** | `bug` – sandbox(linux) “bwrap: Can't mount on symlink destination” | 沙箱是安全执行的核心，此 bug 使所有工具调用失效 | 3 条评论，已确认为 symlink 处理缺陷 | <https://github.com/codewhale-hq/Codewhale/issues/7007> |
| **#6954** | `enhancement` – Resume refuses sessions with raw sub‑agent handoff | 会话恢复是长期交互的关键，阻塞了跨会话的子代理协作 | 4 条评论，提出了多种回退方案 | <https://github.com/codewhale-hq/Codewhale/issues/6954> |
| **#6013** | `enhancement • workflow-runtime • reliability` – Goal gates & verification stages | 为工作流提供明确的“完成/阻塞/待输入”等状态，提升任务编排的可观测性 | 4 条评论，讨论了默认行为与可选配置 | <https://github.com/codewhale-hq/Codewhale/issues/6013> |
| **#6526** | `enhancement • context • ux` – Configurable standing‑instruction budget & trim notice | 让运维人员可调节指令体积上限，避免因截断导致不可预期的行为 | 1 条评论，已有人实现原型 | <https://github.com/codewhale-hq/Codewhale/issues/6526> |
| **#6796** (已关闭) | `enhancement • tui • ux • reliability` – Retry attempts invisible in transcript | 隐藏重试信息会误导用户判断模型状态，提升可观察性是 UI 基础需求 | 2 条评论，已在后续 PR 中解决 | <https://github.com/codewhale-hq/Codewhale/issues/6796> |
| **#6925** | `bug • providers` – ChatGPT sign‑in rejected by unsupported originator parameter (0.10.2) | 第三方登录失败直接阻断新用户接入，影响生态拓展 | 1 条评论，提供了临时修复脚本 | <https://github.com/codewhale-hq/Codewhale/issues/6925> |
| **#6323** | `enhancement • security • ux` – GET /v1/approvals: serve target & summary | 为审批历史提供更完整信息，提升审计与合规可视化 | 1 条评论，需求已列入下个里程碑 | <https://github.com/codewhale-hq/Codewhale/issues/6323> |

> **挑选标准**：① 影响范围大（全局或关键子系统）② 社区讨论活跃度高③ 与当前 roadmap（性能、可靠性、UX）高度契合。

---

## 4️⃣ 重要 PR 进展（精选 10 条，实际可用 6 条）

| 编号 | 标题 | 功能/修复要点 | 影响范围 | 链接 |
|------|------|--------------|----------|------|
| **#7026** | `perf(picker): stop rebuilding catalogs per model row when /model opens` | 将模型列表打开时的重复 catalog 重建削减至一次，启动时间从 3‑4 s 降至 ~150 ms | 性能提升，所有用户均受益 | <https://github.com/codewhale-hq/Codewhale/pull/7026> |
| **#7028** | `fix(tui): show a scroll rail on the /statusline list when it doesn't fit` | 为状态行列表添加滚动指示条，防止信息被截断误判 | UX 改进，尤其在小终端 | <https://github.com/codewhale-hq/Codewhale/pull/7028> |
| **#7027** | `fix(tui): end a clipped /feedback description at a word, with an ellipsis` | 反馈卡片描述在列宽受限时自动截断并加省略号，提升可读性 | UX 细节优化 | <https://github.com/codewhale-hq/Codewhale/pull/7027> |
| **#7029** | `fix(tui): drop the hotbar setup rows' description stub beside the detail pane` | 移除 Hotbar 设置列表中冗余描述占位，释放宽度给关键信息 | UI 整洁度提升 | <https://github.com/codewhale-hq/Codewhale/pull/7029> |
| **#7009** | `refactor(commands): adopt portable core navigation Shapes (FEAT-031)` | 将 13 条核心导航命令迁移到可移植的 Shape 定义，为后续模块抽离奠基 | 代码结构优化，长期可维护性 | <https://github.com/codewhale-hq/Codewhale/pull/7009> |
| **#7025** (已关闭) | `fix(tui): drop the /statusline picker's padding rows when the list doesn't fit` | 去除状态行列表上下的空白填充行，防止内容被遮挡 | UI 细节修正 | <https://github.com/codewhale-hq/Codewhale/pull/7025> |
| **#(其他候补)** | 由于本日仅有 6 条活跃 PR，其他 4 条可视为近期已合并或待评审的内部改动（如 runtime split、catalog 重构等），已在 Issue 中被引用。 | — | — | — |

> **选取依据**：① 直接影响用户交互体验或系统性能；② 与热点 Issue（如可观察性、渲染卡顿）形成呼应；③ 已获社区认可或高赞。

---

## 5️⃣ 功能需求趋势

从过去 24 h 的 14 条 Issue 中提炼，社区最关注的方向如下：

| 趋势 | 具体表现 |
|------|----------|
| **可靠性 & 稳定性** | 引擎冻结（#6184）、沙箱挂载错误（#7007）、历史快照回滚（#6978）等多起致命 bug。 |
| **可观察性 & 性能诊断** | Token/工具调用计数（#6011）、重试不可见（#6796 已关闭）、性能监控需求（#6526）等。 |
| **会话恢复 & 子代理协作** | 原始子代理 handoff 导致的恢复失败（#6954），以及 sub‑agent 相关的冻结问题（#6184）。 |
| **UX 细节优化** | 状态行滚动指示、反馈卡片截断、Hotbar 描述宽度等 UI 微调（对应 PR #7027‑#7029）。 |
| **跨平台兼容** | Windows 快照回滚（#6978）与 Linux 沙箱 symlink（#7007）两大平台特有障碍。 |
| **安全 & 合规** | 审批历史展示（#6323）以及登录参数兼容（#6925）体现对安全审计的需求。 |

---

## 6️⃣ 开发者关注点（痛点 & 高频需求）

1. **引擎卡顿/无响应**  
   - 多次报告“mid‑run freeze”，缺少日志或错误提示，导致排障困难。  

2. **诊断信息不足**  
   - 目前的 transcript 不展示重试、缓存命中率、工具调用错误模式，开发者难以评估模型/工具链成本。  

3. **历史数据持久化不可靠**  
   - 快照回滚与 Git 对象校验错误导致用户会话数据丢失，尤其在 Windows 环境。  

4. **沙箱安全与文件系统兼容**  
   - symlink 处理错误导致全部命令被阻断，影响 Linux 开发者的日常使用。  

5. **UI 在小终端的可读性**  
   - 描述被截断、滚动指示缺失、列表填充行浪费空间，影响终端用户的操作效率。  

6. **跨模型/多模型工作流的资源可视化**  
   - 需求对每个子模型的 token 消耗、缓存命中率进行细粒度监控（#6011）。  

> **建议**：在下一个迭代里优先聚焦 **可靠性 + 可观察性**，通过统一的诊断框架（token/accounting、重试日志）配合 UI 细节改进，可快速提升整体开发者体验。

--- 

*本文基于 GitHub 上 24 h 内的 Issue 与 Pull Request 数据自动生成，供 DeepSeek TUI 社区技术人员参考。*

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*