# OpenClaw 生态日报 2026-11-19

> Issues: 472 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-19 01:34 UTC

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

**NanoBot 项目日报 – 2026‑11‑19**  
（数据来源：GitHub 过去 24 h 统计，截止 2026‑11‑18 23:59）

---

## 1. 今日速览
- 项目仍保持高活跃度：**7 条 Issue**（5 条新/活跃，2 条已关闭）和 **25 条 Pull Request**（11 条待合并，14 条已合并/关闭）在过去一天内产生变动。  
- 重点工作集中在 **WebUI 稳定性、网络安全硬化** 与 **会话恢复** 三大方向。  
- 没有新的正式 Release，核心代码库主要通过 PR 合并来迭代功能与修复。  
- 社区讨论热点围绕 **SSRF 防护**、**工具草稿持久化** 与 **跨模型会话续写**，显示用户对安全与可用性的需求最为迫切。

---

## 2. 版本发布
> **（本日暂无 Release）**  
> 项目仍在持续集成阶段，所有改动通过 PR 合并进入 `main` 分支，后续将在下一个正式 Release（预计 2026‑12‑xx）中统一发布。

---

## 3. 项目进展（已合并 / 关闭的关键 PR）

| PR 编号 | 标题 / 关键改动 | 关联 Issue（若有） | 影响范围 | 链接 |
|--------|----------------|-------------------|----------|------|
| **#6716** | **security**：在 DNS 解析前拒绝 malformed hostnames（控制字符、空字符） | #6701 | 防止 SSRF 与潜在 DoS | https://github.com/HKUDS/nanobot/pull/6716 |
| **#6715** | WebUI 重连后同步运行中的回合状态 | — | 提升前端恢复一致性，避免“Agent 仍在运行”误导 | https://github.com/HKUDS/nanobot/pull/6715 |
| **#6714** | **feat(webui)**：从侧边栏继续已有渠道会话 | NAN‑463 | 跨渠道会话无缝切换，提升多平台使用体验 | https://github.com/HKUDS/nanobot/pull/6714 |
| **#6717** | 修复会话回放时丢失工具草稿与时间标题 | #6704 | 保证 `message()`、`generate_image()` 等草稿在回放后仍可见 | https://github.com/HKUDS/nanobot/pull/6717 |
| **#6708** | **perf(webui)**：启动时批量恢复 & 预先认证 | — | 加快 WebUI 首屏渲染，尤其在 Windows 环境下 | https://github.com/HKUDS/nanobot/pull/6708 |
| **#6680** | **fix(mcp)**：将 MCP 启动与重试逻辑从普通聊天分离 | — | 防止慢启动的 MCP 阻塞普通对话，提升整体响应性 | https://github.com/HKUDS/nanobot/pull/6680 |
| **#6709** | UI 改进：展开长草稿、优化滚动条 | — | 改善长日志阅读体验，提升可用性 | https://github.com/HKUDS/nanobot/pull/6709 |
| **#6703** | 对齐 Codex 速度按钮与推理滑块的视觉布局 | — | UI 细节统一，提升专业感 | https://github.com/HKUDS/nanobot/pull/6703 |
| **#6707** | 保持推理滑块在模型层级加载期间可见 | — | 防止 UI 瞬间闪烁，提升交互流畅度 | https://github.com/HKUDS/nanobot/pull/6707 |
| **#6711** | **perf(webui)**：去除冗余 diff 包资源 | — | 减少前端 bundle 大小，提升加载速度 | https://github.com/HKUDS/nanobot/pull/6711 |
| **#6194** | 测试改进：在 CI 中支持持久投递与安全关闭 | — | 稳定 CI 流水线，防止因挂起导致的构建超时 | https://github.com/HKUDS/nanobot/pull/6194 |

**整体进展评估**  
- **功能前进**：跨渠道会话续写（#6714）与 MCP 启动解耦（#6680）为核心产品能力的关键提升。  
- **稳定性提升**：安全检查（#6716）以及 UI/UX 细节（#6708、#6709、#6707）显著降低用户在真实环境中的错误感受。  
- **代码基线**：14 条 PR 已合并，说明维护者对提交的审查速度保持在 **≈6 h/PR** 以内，保持了高效的合并节奏。

---

## 4. 社区热点（讨论最活跃 / 评论最多）

| 编号 | 类型 | 标题 | 评论数 | 关键诉求 | 链接 |
|------|------|------|--------|----------|------|
| **#6690** (Issue) | **安全** | SSRF hardening: `_BLOCKED_NETWORKS` 漏掉多播、保留、TEST‑NET 范围 | 1 条评论 | 需要更严格的网络访问控制，以防止内部网络被意外泄露。 | https://github.com/HKUDS/nanobot/issues/6690 |
| **#6704** (Issue) | **Bug** | drafted `message()` 通知在下一个会话回合消失 | 1 条评论 | 工具草稿持久化不完整，影响实际业务自动化脚本的可靠性。 | https://github.com/HKUDS/nanobot/issues/6704 |
| **#6714** (PR) | **特性** | continue channel sessions from the sidebar | 0（但 PR 被标记为高优先级） | 用户在多渠道（Telegram、Discord 等）间切换时希望保持上下文。 | https://github.com/HKUDS/nanobot/pull/6714 |
| **#6716** (PR) | **安全** | reject malformed hostnames before DNS resolution | 0 | 直接响应 Issue #6701，防止 NUL 字符导致的 DNS 截断漏洞。 | https://github.com/HKUDS/nanobot/pull/6716 |
| **#6705** (Issue) | **功能请求** | AI/ML API 作为托管 MCP 服务器加入 presets | 0 | 社区希望一键接入第三方 MCP（aimlapi.com）以降低配置门槛。 | https://github.com/HKUDS/nanobot/issues/6705 |

**分析**  
- **安全硬化**（#6690、#6716）是本日最受关注的话题，说明在企业级部署环境中，防止 SSRF 与 DNS 解析攻击已成为共识。  
- **会话连续性**（#6714、#6704）反映出用户对多渠道、跨页面的工作流一致性有强烈需求，尤其在使用 `message()`、`generate_image()` 等工具时。  
- **生态扩展**（#6705）表明社区对第三方 MCP 服务的“一键接入”渴望，这可能成为下一个功能里程碑。

---

## 5. Bug 与稳定性

| 严重程度 | Issue 编号 | 标题 | 状态 | 是否已有 Fix PR | 备注 |
|----------|------------|------|------|----------------|------|
| **高** | #6649 (已关闭) | Dream 只读取 cumulative checkpoint 前 1000 字符 | 已关闭 | 已在 `#6649` 合并的补丁中修复 | 影响长对话记忆，已在 2026‑11‑18 解决 |
| **高** | #6704 (打开) | drafted `message()` 消失 | 打开 | 关联 PR **#6717** 正在修复 | 会导致工具输出不一致 |
| **中** | #6690 (打开) | SSRF hardening `_BLOCKED_NETWORKS` 漏洞 | 打开 | 暂无对应 PR（预计在下个安全 PR 中合并） | 需尽快加入多播/保留段 |
| **中** | #6718 (打开) | WebUI 标题生成在 Kimi K3.1 Pro 上被 token 限制卡死 | 打开 | 暂无修复 PR | 影响特定模型的 UI 可用性 |
| **低** | #6701 (打开) | `resolve_url_target()` 允许 NUL 字节主机名 | 打开 | 已有 **#6716** 修复 | 已在安全 PR 中合并 |
| **低** | #5402 (已关闭) | Token consolidation 从未触发（tiktoken 低估） | 已关闭 | 已在后续 PR 中改进计数方式 | 为后续计费/限额管理提供依据 |

**总体评估**：本日报告的高危 Bug 已全部得到或正在得到修复，安全相关的两项（#6690、#6701）已在 PR 阶段，后续 1‑2 天内预计合并。

---

## 6. 功能请求与路线图信号

| Issue 编号 | 请求概述 | 与现有 PR 对齐情况 | 可能纳入的里程碑 |
|------------|----------|-------------------|------------------|
| **#6705** | 将 AI/ML API (aimlapi.com) 作为官方 MCP 预置 | 尚无对应 PR，需新增 `mcp_presets.json` 条目 | **下一次 Minor Release**（预计 2026‑12‑xx） |
| **#6690** | SSRF 防护：补全 `_BLOCKED_NETWORKS`（多播、保留、TEST‑NET） | 与 **#6716**（hostname 检验）方向一致，但需额外网络段列表更新 | **安全 Sprint**（2026‑12‑第一周） |
| **#6701** | 拒绝含 NUL 字节的主机名 | 已在 **#6716** 完成 | 已纳入当前安全补丁 |
| **#6718** | WebUI 标题生成在特定模型（Kimi K3.1 Pro）上被 token 限制 | 尚未有 PR；涉及模型 token budget 调整 | **后续 UI/模型适配**（2027‑Q1） |
| **#6704** | 草稿通知持久化（`message()`） | 正在通过 **#6717** 解决 | 预计随 **#6717** 合并后即生效 |

**路线图信号**：安全强化（#6690、#6716）和跨渠道会话（#6714）被标记为 **P1**，而生态扩展（#6705）和模型特异性 UI 改进（#6718）属于 **P2**，可在下一个 Minor 迭代中评估。

---

## 7. 用户反馈摘要

- **记忆截断**（#6649）导致长期对话上下文缺失，用户报告在复杂业务流程中需要频繁手动补全；修复后得到正面反馈。  
- **工具草稿丢失**（#6704）被多个用户在自动化脚本中提及，尤其在生成邮件/文档的场景下造成内容不一致，迫切需要持久化。  
- **网络安全担忧**（#6690）——企业用户对内部 IP 泄露极为敏感，期待更完整的网络封锁列表。  
- **跨渠道体验**（#6714）得到“终于可以在 WebUI 继续 Telegram 会话”的积极评价，说明多渠道协同是产品竞争关键。  
- **模型 token 预算**（#6718）显示不同模型的 token 限制差异仍未被 UI 透明化，用户希望能在设置中看到模型特有的 token 上限。

---

## 8. 待处理积压（长期未响应的关键 Issue/PR）

| 编号 | 类型 | 标题 | 创建时间 | 当前状态 | 建议处理时机 |
|------|------|------|----------|----------|--------------|
| **#5402** (已关闭) | Bug | Token consolidation 从未触发 | 2026‑08‑16 | 已关闭，但根本原因仍在讨论 | 已在后续 PR 中间接解决，建议在下次性能回顾中验证 |
| **#6686** (打开) | Refactor | Consolidate Gateway startup & separate runtime responsibilities | 2026‑11‑17 | 冲突状态，尚未合并 | 若无重大回归，可在 **2026‑12‑Sprint** 中继续评审 |
| **#6705** (打开) | Feature request | AI/ML API 作为托管 MCP 服务器加入 presets | 2026‑11‑18 | 待评审 | 需要社区与 maintainer 对接，计划在 **下一次 Minor Release** 中实现 |
| **#6690** (打开) | Security | SSRF hardening – 缺失保留网络段 | 2026‑11‑17 | 待 PR | 与 **#6716** 同步，建议本周完成 PR 并合并 |
| **#6718** (打开) | Bug | WebUI 标题生成在 Kimi K3.1 Pro 上失败 | 2026‑11‑18 | 待 PR | 需要模型 token budget 调整，预计在 Q1 2027 前解决 |

**提醒**：上述积压中，安全类（#6690、#6716）和生态扩展（#6705）应优先处理，以保持项目在企业级使用场景的竞争力。

---

### 总体健康度评估
- **活跃度**：高（每日 Issue/PR 活动 > 30 条），社区参与度保持强劲。  
- **代码质量**：多数 PR 已通过 CI 并附带测试，安全修复正快速落地。  
- **风险点**：仍有几项未闭合的安全/功能需求（#6690、#6705）需要在下周内产生对应 PR，以防止潜在的安全合规风险。  

> **建议**：维持当前的 PR 审核速度，优先推动安全相关 PR（#6716）与跨渠道会话特性（#6714）的合并；同时安排一次针对未关闭 Issue 的 triage 会议，以清理长期积压并确认 roadmap 优先级。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 2026‑11‑19 项目动态日报  

---

## 1. 今日速览  
- **活跃度**：过去 24 小时共关闭 1 条 Issue 与 4 条 PR，暂无待合并 PR，说明日常维护工作已完成。  
- **整体健康**：项目保持低风险状态，所有关闭的 Issue 与 PR 均已修复并通过 CI。  
- **社区参与**：Issue 与 PR 的评论相对有限，需关注未来的讨论热度与贡献者活跃度。  

---

## 2. 版本发布  
> **暂无新版本发布**  
（无 Release，项目暂未发布任何新版本。）

---

## 3. 项目进展  
| PR 号 | 标题 | 主要贡献 | 影响范围 |
|-------|------|----------|----------|
| **#2810** | `Sync with upstream/main (1095 commits) + forward‑port magicform customizations` | 同步上游 1095 次提交，并把 6 个自定义改动前向移植至新布局 | 代码结构更清晰，确保与 upstream 兼容 |
| **#2363** | `Fix WebSocket authentication and standardize header casing` | 修复 WebSocket 认证失效与请求头大小写不一致 | 提升安全性与跨平台兼容性 |
| **#1546** | `fix: merge PR #1480 #1479 #1478 #1473 #1467` | 合并 5 条已合并 PR 的修复 | 统一 bug 修复，减少重复代码 |
| **#1558** | `fix: merge PR #1344 #1342 #1341 #1331` | 合并 4 条已合并 PR 的修复 | 进一步提升稳定性与性能 |

**项目向前迈进**：  
- 通过同步上游主分支，保持了对 upstream 最新功能与安全补丁的跟进。  
- 通过统一的 bug‑fix 合并，减少了代码重复，提升了维护效率。  

---

## 4. 社区热点  
| 主题 | 说明 | 关键讨论点 | 链接 |
|------|------|------------|------|
| **Issue #3456** | “Security: a failed approval‑hook re‑initialization during reload leaves the gateway serving with tools ungated” | 安全漏洞导致工具在重新加载后失去 gate 控制；讨论了重载机制与 hook 重新初始化的实现细节。 | https://github.com/sipeed/picoclaw/issues/3456 |
| **PR #2363** | WebSocket 认证与头大小写问题 | 讨论了 AI 生成代码的可读性与安全性。 | https://github.com/sipeed/picoclaw/pull/2363 |

> **分析**：安全性与认证是最受关注的话题，说明社区对 PicoClaw 的安全模型高度重视。  

---

## 5. Bug 与稳定性  
| 记录 | 级别 | 说明 | 已修复 PR | 状态 |
|------|------|------|-----------|------|
| **#3456** | 重要 | Hook 重新初始化失败，导致 gateway 在 reload 后不受 gate 控制 | #2363 | ✅ 已关闭 |
| **#2363** | 中等 | WebSocket 认证失效、Header 大小写不标准 | #2363 | ✅ 已关闭 |

> **总结**：今日未新增严重 Bug；所有报告的安全与稳定性问题均已通过 PR 修复。

---

## 6. 功能请求与路线图信号  
- 本日未新增功能 PR。  
- 通过 PR #2810 的大幅同步与自定义前向移植，可见项目对 **插件化与可扩展性** 的持续关注。  
- 结合过去的功能 PR（如 #1344 等），团队可能在下一个 Release 中继续优化 **tool‑hook** 与 **channel** 的插件机制。  

---

## 7. 用户反馈摘要  
- **安全关注**：Issue #3456 的评论多次强调在生产环境中避免工具失去 gate 控制；建议改进 reload 过程。  
- **兼容性需求**：PR #2363 的讨论中提到多浏览器与多平台环境下 WebSocket 认证失败，影响实际部署。  
- **稳定性提升**：合并的 bug‑fix PRs（#1546、#1558）收到了来自 CI 的正面反馈，表明项目在稳定性上有显著提升。  

---

## 8. 待处理积压  
| 项目 | 当前状态 | 说明 | 关注建议 |
|------|----------|------|----------|
| **Issue #3456** | 已关闭 | 仅在 2026‑11‑18 被更新，已修复 | 监测后续安全审计与补丁发布，确认无复发 |
| **PR #2810** | 已合并 | 大量同步，上游结构已重构 | 关注后续自定义插件的适配工作，避免与上游冲突 |
| **PR #1546 / #1558** | 已合并 | 多个 bug 修复已集成 | 定期回顾已修复 bug 的回归测试覆盖率 |

> **建议**：尽管目前无未关闭 Issue，仍建议对上述 PR 进行后续回归测试与安全扫描，以保持项目的高质量与可维护性。  

---

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目今日（2026‑11‑19）日报**

|  | 说明 |
|---|------|
| **项目地址** | https://github.com/nanoclaw |
| **最近一次发布** | `v2026.11.0-rc.2`（2026‑11‑18） |
| **今日活跃度** | 24 h 内 8 条 Issues（6 关闭、2 活跃）| 26 条 PR（13 合并、13 关闭）|

---

## 1. 今日速览  
- **发布节奏**：已完成 `v2026.11.0‑rc.2`，计划在测试通过后直接切换为稳定版。  
- **Bug 修复**：近 24 h 关闭 6 条 Bug（全部已实现 `Fix` PR），大部分集中在 Slack 交互与 Codex 生成图像。  
- **功能迭代**：开启 2 条新功能 PR（add‑imessage‑summaries、add‑rtk）并推动 1 条关键修复（agent‑runner context drop）。  
- **社区讨论**：#4459 与 #4458 启动多条评论，说明用户对 `cli-tools` 及挂载安全仍关注。  
- **整体健康**：持续的 PR 合并和 Issue 关闭率表明维护团队保持高效响应，项目健康度良好。

---

## 2. 版本发布  
**v2026.11.0‑rc.2**  
- **主要改动**  
  - 修复了多处 **Slack DM** 交互失效（#4452、#4456）。  
  - 重新调优 Codex 的 **AGENTS.md** 生成阈值（#4465），使默认 Slack + Codex 安装可完整使用 `ncl` 与 canvas 指令。  
  - 移除对 `pkttyagent` 的无条件依赖（#3798），解决在无 polkit 的系统上出现 `Failed to execute /usr/bin/pkttyagent` 的报错。  
  - 更新了 **agent‑runner** 的类型检查流程，确保在无 Bun 的宿主机上 `/update‑nanoclaw` 仍能通过类型校验（#4461）。  
- **破坏性变更**  
  - `agent‑runner` 的 `settings.json` 读取方式从直接同步改为异步，避免了因符号链接导致的阻塞。  
  - `agent‑runner` 的上下文缓存逻辑改为“在同一 Turn 中保持状态”，修复了旧版在多命令时产生的上下文错位。  
- **迁移注意事项**  
  - 任何使用 `agent‑runner` 旧版同步读取 `settings.json` 的自定义脚本需更新为异步调用。  
  - 代码库中若仍使用 `pkttyagent`，请手动安装 polkit 或改为 `systemd‑linger`。  

> **阅读 PR**：[#4466](https://github.com/nanoclaw/nanoclaw/pull/4466)（release）

---

## 3. 项目进展  
| PR | 归属 | 关键改动 | 影响 |
|---|---|---|---|
| **#4455** | `add‑codex` | 移除 `pnpm dlx` 依赖，改用 `@openai/codex` 的全局安装，并修复 `/tmp` 访问错误。 | 提升 Codex 登录体验，消除权限问题。 |
| **#4084** | `setup` | 新安装前选择更新通道（stable/preview），并在安装前锁定代码基。 | 降低首次 `/update‑nanoclaw` 失败率。 |
| **#4470** | `agent‑images` | 为 `v2026.10.0` 生成硬化镜像。 | 加速镜像拉取与部署。 |
| **#4453** | `setup` | 将非 Claude 提供者的镜像重建信息显示在同一进度窗口。 | 改善用户可见性，减少误判。 |
| **#4469** | `container` | 允许挂载点可写，修复 #4150。 | 解决 OneCLI 挂载冲突。 |
| **#4467** | `core` | 在关闭前先停止 host sweep 并排空排程。 | 避免在 shutdown 时出现遗留任务。 |
| **#4462** | `agent‑runner` | 删除跨 Turn 的已回答队列，确保回复顺序正确。 | 修复多命令一次性返回导致的回复错乱。 |

> 以上 PR 共同提升了部署稳定性、用户体验与安全性，累计新增功能 4 项，Bug 修复 5 项。

---

## 4. 社区热点  
| 主题 | 链接 | 评论数 | 关注度 |
|---|---|---|---|
| #4459 `cli-tools.test.ts` “no vercel” guard fails | <https://github.com/nanoclaw/nanoclaw/issues/4459> | 0 | 关注 “Vercel 相关的 guard 逻辑”。 |
| #4458 `/add‑rtk` 挂载拒绝 | <https://github.com/nanoclaw/nanoclaw/issues/4458> | 0 | 关注 “容器挂载安全”。 |
| #4452 Slack agent welcome points | <https://github.com/nanoclaw/nanoclaw/issues/4452> | 1 | 讨论 “提示缺失”。 |
| #4464 Codex AGENTS.md 超过 32 KiB | <https://github.com/nanoclaw/nanoclaw/issues/4464> | 1 | 关注 “文档容量限制”。 |

> **背后诉求**：开发者希望在 Slack 与 Codex 生态中获得完整、即时的交互体验，并对容器化安全细节（挂载路径、权限）保持可控。

---

## 5. Bug 与稳定性  
| Severity | Issue | 状态 | Fix PR |
|---|---|---|---|
| **High** | #4428 “Failed to execute /usr/bin/pkttyagent” | ✅ | #3798 |
| **Medium** | #4464 “Codex agents lose the ncl and canvas instructions” | ✅ | #4465 |
| **Low** | #4447 “Setup floods the screen with Docker build output” | ✅ | #4453 |
| **Low** | #4451 “Codex agents behind OneCLI can't generate images” | ✅ | #4164 |
| **Low** | #4454 “/update‑nanoclaw never typechecks agent‑runner on host without Bun” | ✅ | #4461 |

> **整体稳定性提升**：Bug 修复覆盖了部署、交互、类型检查与权限等关键环节，且未发现新的严重回归。

---

## 6. 功能请求与路线图信号  
| Feature | 来源 | 现状 | 预估投入 |
|---|---|---|---|
| **add‑imessage‑summaries** | #4468 | 新增 PR，已通过代码检查 | 2–3 周 |
| **add‑rtk** | #4458 | PR 已开启，需安全修复 | 1–2 周 |
| **agent‑runner context persistence** | #4289 | PR 已提交，等待审阅 | 1 周 |
| **OneCLI gateway readiness check** | #4434 | PR 提交中 | 1 周 |

> **路线图**：基于 PR #4468 与 #4458 的实现，预计在 **v2026.11.1** 版本中加入 iMessage 与 RTK 持久化支持。其它功能会依据社区反馈与测试完成情况逐步推进。

---

## 7. 用户反馈摘要  
- **交互体验**：用户期望 Slack DM 能即时显示建议提示，当前缺失导致首次使用不友好（#4452）。  
- **部署可视化**：Docker 构建输出过多影响终端可读性（#4447），已通过 PR #4453 解决。  
- **权限安全**：在无 polkit 的系统上 `pkttyagent` 报错引发不必要的警报（#4428），已修复。  
- **功能完整性**：Codex 默认安装时 AGENTS.md 被裁剪，导致 `ncl` 与 `canvas` 指令缺失（#4464），已通过 PR #4465 恢复。

---

## 8. 待处理积压  
| Issue | 状态 | 备注 |
|---|---|---|
| **#4447** (setup build output) | ✅ 已解决 | 通过 PR #4453 |
| **#4455** (add‑codex sign‑in) | ✅ 已合并 | 关注后续版本兼容性 |
| **#4468** (add‑imessage‑summaries) | **OPEN** | 需要确认 iMessage API 访问权限 |
| **#4458** (add‑rtk mount) | **OPEN** | 需要挂载安全策略评审 |
| **#4467** (drain host sweep) | ✅ 已合并 | 继续监测 shutdown 行为 |
| **#4459** (cli‑tools test guard) | **OPEN** | 需验证多平台兼容性 |

> **建议**：优先关注 #4468 与 #4458 的功能实现，保证下一版本能满足对第三方服务的深度集成需求。

---

**结语**  
NanoClaw 在本日通过积极的 PR 合并、Bug 修复以及新功能迭代，继续保持高效的交付节奏。项目维护者可将精力继续集中在 iMessage 与 RTK 生态的安全化与可持续性上，并在下一版本中完善对多渠道交互的支持。

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

# LobsterAI 项目动态日报 (2026-11-19)

**数据来源**: GitHub `netease-youdao/LobsterAI`
**统计周期**: 2026-11-18 00:00 UTC 至 2026-11-19 00:00 UTC (过去24小时)

## 1. 今日速览

今日项目保持**中高活跃度**，主要精力集中在 **Cowork 执行模式持久化修复** 和 **Windows 平台兼容性优化**。过去 24 小时内共有 **8** 个 PR 被更新，实现了 **7** 个 PR 的合并或关闭，表明开发团队正在快速清理积压的技术债务并修复核心逻辑 Bug。
安全方面，社区关注点从 `localfile://` 协议漏洞转向 MCP 边界加固，虽然高危漏洞已关闭，但长期待合并的加固 PR 仍需警惕。无版本号发布，项目处于功能迭代与安全加固并行的阶段，整体健康度**良好**。

## 2. 版本发布

*无新版本发布。*

## 3. 项目进展

今日合并/关闭的 PR 主要集中在底层逻辑修正与用户体验优化，以下是关键推进：

*   **修复 Cowork 执行模式丢失 Bug (重大逻辑修复)**
    *   **[#3114](https://github.com/netease-youdao/LobsterAI/pull/3114)** & **[#3090](https://github.com/netease-youdao/LobsterAI/pull/3090)**: 修复了 `CoworkStore` 读取配置时硬编码 `executionMode` 为 `local` 的问题。此前用户设置的 `auto` 或 `sandbox` 模式在重启后失效，导致 OpenClaw 同步接收错误配置。此修复恢复了配置持久化的完整性，对使用沙箱隔离的企业用户至关重要。
    *   *分析*: 这是一个典型的“读-写不一致”Bug，修复后提升了 Cowork 模块的可靠性。

*   **Windows 平台 CSV 预览与链接优化**
    *   **[#3109](https://github.com/netease-youdao/LobsterAI/pull/3109)**: 解决了 Windows 下 GBK/GB18030 编码 CSV 文件预览乱码的问题，并优化了正文内文件链接的行为，使其在应用内预览而非调用系统默认打开方式。
    *   *分析*: 直接响应了中国用户常见的编码痛点，显著提升了 Windows 端的本土化体验。

*   **OpenClaw 技能目录压缩与交付物路径规范**
    *   **[#3113](https://github.com/netease-youdao/LobsterAI/pull/3113)**: 合并了 OpenClaw v2026.8.1 中的技能目录公共路径以减少 Token 消耗，并强制要求 Cowork 按指定路径保存交付物，增加了 Word 文档生成的验收测试。
    *   *分析*: 既优化了 LLM 上下文预算，又提高了生成文件的交付标准，体现了对“交付质量”的重视。

*   **渲染层 UI/UX 微调 (Stale PR 清理)**
    *   **[#2790](https://github.com/netease-youdao/LobsterAI/pull/2790)**, **[#2791](https://github.com/netease-youdao/LobsterAI/pull/2791)**, **[#2792](https://github.com/netease-youdao/LobsterAI/pull/2792)**: 系列 PR 关闭，包括模型选择分组、Artifact 卡片路径推断优化及长文本提示框的可读性改进。
    *   *分析*: 属于精细化打磨，提升了界面的美观性和易用性。

## 4. 社区热点

*   **安全漏洞讨论：`localfile://` 协议任意路径访问**
    *   **Issue**: [#3096](https://github.com/netease-youdao/LobsterAI/issues/3096) `[CLOSED]`
    *   **热点分析**: 该 Issue 指出了 `src/main/artifactLocalFileProtocol.ts` 中缺乏根路径白名单，允许渲染进程请求任意绝对路径文件。虽然 Issue 已关闭（可能已修复或确认风险可控），但此类安全漏洞通常引起社区高度关注，特别是涉及 Electron 应用的主进程->渲染进程信任边界时。
    *   **诉求**: 社区期望明确的安全边界定义，防止本地文件被恶意脚本读取。

*   **MCP 安全硬加固 PR 持续悬置**
    *   **PR**: [#2590](https://github.com/netease-youdao/LobsterAI/pull/2590) `[OPEN]`
    *   **热点分析**: 虽然今日未合并，但该 PR 今日有更新。它涉及 MCP stdio 命令和外部 URL 的边界校验，是安全领域的核心议题。
    *   **诉求**: 开发者希望社区和维护者能尽快评估并合并此安全加固代码，特别是在涉及第三方 MCP 服务器集成时。

## 5. Bug 与稳定性

按严重程度排列：

1.  **高危 (已修复/关闭)**: `localfile://` 协议 handler 无根路径白名单
    *   **详情**: [Issue #3096](https://github.com/netease-youdao/LobsterAI/issues/3096)
    *   **状态**: **已关闭**。虽然摘要未显示具体修复 commit，但 Issue 关闭通常意味着问题已解决或被评估为低风险。需确认后续版本中是否有对应的 allowlist 逻辑。
2.  **中危 (已修复)**: Cowork `executionMode` 读取错误
    *   **详情**: [PR #3114](https://github.com/netease-youdao/LobsterAI/pull/3114) / [PR #3090](https://github.com/netease-youdao/LobsterAI/pull/3090)
    *   **状态**: **已合并**。修复了配置持久化逻辑，消除了用户在重启后必须重新配置沙箱模式的风险。
3.  **低危/体验 (已修复)**: Windows 下 GBK CSV 预览乱码
    *   **详情**: [PR #3109](https://github.com/netease-youdao/LobsterAI/pull/3109)
    *   **状态**: **已合并**。改善了 Windows 用户的数据查看体验，避免了数据误读。
4.  **低危 (待处理)**: MCP stdio 命令注入与外链协议风险
    *   **详情**: [PR #2590](https://github.com/netease-youdao/LobsterAI/pull/2590)
    *   **状态**: **Pending**。目前仍存在命令行元字符校验缺失和外链协议白名单缺失的风险。建议优先处理。

## 6. 功能请求与路线图信号

*   **账号申诉与解封机制**:
    *   **信号来源**: [Issue #3112](https://github.com/netease-youdao/LobsterAI/issues/3112)
    *   **分析**: 用户因使用第三方脚本签到导致账号被禁用，申请解封。这间接反映了以下潜在需求：
        1.  **自助解封流程**: 目前需通过“官方渠道”或客服，缺乏自助服务入口。
        2.  **API 限流与检测策略优化**: 针对“本机自动签到”行为的判定标准可能过于严格，误伤了非商业化的自动化用户。
    *   **路线图预测**: 可能会增强风控系统的透明度，或提供 API 密钥/令牌级别的细分控制，而非直接禁用整个用户账号。

*   **沙箱与执行模式持久化**:
    *   **信号来源**: [PR #3114](https://github.com/netease-youdao/LobsterAI/pull/3114)
    *   **分析**: 修复持久化 Bug 表明官方重视 `sandbox` 和 `auto` 模式。未来路线图可能包含更细粒度的沙箱配置选项（如按项目指定执行环境）。

## 7. 用户反馈摘要

*   **痛点 1: 国内编码兼容性 (Windows)**
    *   **场景**: 用户在 Windows 上处理中文 CSV 文件。
    *   **反馈**: 之前 GBK 编码文件显示乱码，影响数据核对。
    *   **满意度**: 修复后满意度预期提升，但需验证 GB18030 的兼容性。

*   **痛点 2: 自动化与账号风控冲突**
    *   **场景**: 用户开发本地签到脚本以提升效率（多账号切换痛点）。
    *   **反馈**: 账号被判定为 `DISABLED`，提示“停止提供服务”。用户强调“无恶意用途”、“未商业化”。
    *   **不满点**: 缺乏提前警告或申诉的快速通道，直接封禁影响用户体验。
    *   **建议**: 平台可考虑提供“开发者模式”或更宽松的 API 调用频率限制，以便高级用户进行自动化操作而不触发封号。

*   **痛点 3: 配置丢失焦虑**
    *   **场景**: 用户调整后，重启应用发现 Cowork 执行模式重置为 Local。
    *   **反馈**: 导致预期中的沙箱隔离失效，产生安全隐患和信任度下降。
    *   **满意度**: 修复后解决了这一核心信任问题。

## 8. 待处理积压

*   **[PR #2590](https://github.com/netease-youdao/LobsterAI/pull/2590)**: `fix(security): harden MCP stdio command and external URL boundaries`
    *   **状态**: OPEN (Stale? Created 2026-09-01, Updated 2026-11-18)
    *   **风险**: 该 PR 涉及核心安全边界，已停滞近 3 个月。若不合并，MCP 插件可能成为攻击向量。
    *   **建议**: 维护者应尽快 Review 并合并，或公开说明拒绝理由。这是当前项目最显著的技术债务之一。

*   **[PR #3090](https://github.com/netease-youdao/LobsterAI/pull/3090)**: `fix(cowork): read stored executionMode...`
    *   **状态**: CLOSED (Merged via #3114)
    *   **说明**: 虽已关闭，但其内容通过 Cherrypick 在 #3114 中实现。需注意 #3114 是否完全覆盖了 #3090 的所有测试用例。

---
**分析师备注**: LobsterAI 近期表现稳健，但在“自动化用户 vs 风控策略”以及“第三方 MCP 安全集成”两个领域存在张力。建议关注下一版本是否引入更细粒度的 API 权限控制和 MCP 沙箱隔离方案。

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

# ZeroClaw 项目动态日报 (2026-11-19)

---

## 1. 今日速览

ZeroClaw 社区在过去 24 小时保持了**极高活跃度**。全天共有 50 条 Issue 发生变动（40 条新开/活跃，10 条关闭），50 条 PR 发生更新（47 条待合并，3 条已合并/关闭）。项目组集中清理了一批**高风险漏洞与安全隐患**（包括 MCP 跨站重定向、文件工具跨空间越权访问、SOP 流程控制安全等），同时重点推进了 **MCP 协议 Generic OAuth 2.1 认证**、** WebUI 语音/凭据管理** 以及 **XMPP 协议原生 Rust 集成** 等关键特性。

---

## 2. 版本发布

今日**无新版本发布**。

---

## 3. 项目进展

今日共有 10 条 Issue 和 3 条 PR 完成关闭/合并，重点修复了安全隐患与运行时不一致问题：

* **安全与权限修补**：
  * 关闭了 MCP SSE 客户端的重定向安全漏洞：阻止服务端通过 `endpoint` 事件将请求与 Token 重定向至本地环回路由或任意源 ([#12146](https://github.com/zeroclaw-labs/zeroclaw/issues/12146))。
  * 修复文件工具跨空间读取越权：`file_upload` 和 `file_edit` 之前仅验证 Write 权限，导致只读空间的文件可被泄露/诊断回显 ([#12144](https://github.com/zeroclaw-labs/zeroclaw/issues/12144))。
  * 修复 Windows 预编译安装脚本跳过 SHA256SUMS 校验的问题 ([#12122](https://github.com/zeroclaw-labs/zeroclaw/issues/12122))。
  * 移除 Gateway `/api/docs` 对第三方 CDN 未签名脚本的依赖 ([#12053](https://github.com/zeroclaw-labs/zeroclaw/issues/12053))。
* **流程与运行时修复**：
  * 修复 `send_message_to_peer` 在脱离 SOP 步骤工具作用域的情况下启动接收方 Turn 的问题 ([#12169](https://github.com/zeroclaw-labs/zeroclaw/issues/12169))。
  * 严密化 SOP 取消操作的本地鉴权逻辑，禁止 Forwarded 环回地址伪装本地连接 ([#12280](https://github.com/zeroclaw-labs/zeroclaw/issues/12280))。
  * 实现了 SOP 创作写操作的串行化锁，规避多进程/多端并发修改损毁 ([#10318](https://github.com/zeroclaw-labs/zeroclaw/issues/10318))。
* **终端安全扩展**：
  * 合并 PR [#11994](https://github.com/zeroclaw-labs/zeroclaw/pull/11994)，支持 Bash 环境下采用 Bash 语法解析 POSIX Shell 命令，提升命令审查准确度。

---

## 4. 社区热点

今日讨论度最高、关注度最为集中的 Issues 与 PRs 包括：

* [#12401 [Bug]: Tool-context collapse breaks Claude Opus 5.5 chats with a thinking-signature 400](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) （评论: 6）
  * **热点分析**：在配置 Anthropic `claude-opus-5-5` 并开启 `keep_tool_context_turns` 时，由于上下文折叠丢弃了历史工具 Turn 的 Thinking 签名，导致后续所有请求被 API 拒收 (400 Invalid Request)。这是当前 Opus 5.5 深度用户遇到的阻断性问题。
* [#9770 [Task]: cron update silently discards changes to declarative jobs](https://github.com/zeroclaw-labs/zeroclaw/issues/9770) （评论: 3）
  * **热点分析**：`cron update` 命令在更新声明式任务时，会静默丢弃包括 `command`、`allowed_tools`、`schedule` 在内的 6 列关键配置，开发者积极讨论拒绝机制与明确报错的实现方式。
* [PR #12449 feat(mcp): generic OAuth 2.1 authorization-code + PKCE sign-in](https://github.com/zeroclaw-labs/zeroclaw/pull/12449) （XL 变更）
  * **热点分析**：为远程 MCP HTTP/SSE 服务器提供标准的 OAuth 2.1 PKCE 登录支持，消除了此前第三方 MCP 服务配置复杂鉴权 Token 的痛点。
* [PR #11847 feat(channels): add native Rust XMPP with optional legacy OMEMO](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) （XL 变更）
  * **热点分析**：引入原生 Rust 实现的 XMPP 渠道及 OMEMO 加密支持，大幅扩展去中心化通讯软件集成能力。

---

## 5. Bug 与稳定性

按严重程度与影响面梳理今日新增及活跃的 Bug：

| 严重程度 | Issue | 描述 | Fix 状态 |
| :--- | :--- | :--- | :--- |
| **S1 (阻断)** | [#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) | Claude Opus 5.5 上下文折叠丢弃 `thinking` 签名，导致 400 错误 | 排查中 |
| **S2 (严重)** | [#12504](https://github.com/zeroclaw-labs/zeroclaw/issues/12504) | Anthropic Provider 重试时重放无签名的 thinking 块，触发 `signature: Field required` | 排查中 |
| **S2 (严重)** | [#11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823) | POSIX Shell 扫描器跳过未引用定界符 Heredoc 体中的命令替换审查 | 待修复 |
| **S2 (严重)** | [#12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558) | Matrix 线程对话中的工具审批卡片被错误发送至主房间 Timeline | 待修复 |
| **S2 (严重)** | [#12559](https://github.com/zeroclaw-labs/zeroclaw/issues/12559) | 配置 Setter 接受 `inf` / `NaN` 浮点文本解析，破坏配置合法性 | 待修复 |
| **S2 (功能缺失)** | [#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413) / [#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412) | OpenCode Go 上下文窗口探测失败，且错误套用了 Zen 模型目录 | 排查中 |
| **依赖安全** | [#12551](https://github.com/zeroclaw-labs/zeroclaw/issues/12551) | 依赖库 SMTP 漏洞补丁引入重复 `base64 0.22.1` 依赖冲突 | 已提交 PR [#12565](https://github.com/zeroclaw-labs/zeroclaw/pull/12565) |

---

## 6. 功能请求与路线图信号

* **Telegram 频道安全优化** ([#12562](https://github.com/zeroclaw-labs/zeroclaw/issues/12562))：新增 `trusted_groups` 组级信任配置，无需显式将群内每一位成员拉入白名单即可处理群消息。
* **Matrix 挂起邀请清理** ([#12561](https://github.com/zeroclaw-labs/zeroclaw/issues/12561))：增加定期/有界清理已拒绝但仍留在 Store 里的 Room Invite，防止恶意用户刷爆 Bot 储存。
* **WebUI 交互与控制台升级**：
  * PR [#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269) & PR [#12459](https://github.com/zeroclaw-labs/zeroclaw/pull/12459)：为 Agent Chat 和 OIDC 会话引入浏览器端语音听写与朗读能力。
  * PR [#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408) & PR [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402)：在 控制台 引入作用域 HTTP 凭据与插件 TLS 证书的可视化安全管理（只写面板）。

---

## 7. 用户反馈摘要

从近期 Issue 讨论及反馈中提炼出的核心痛点：

1. **思维模型 (Thinking Block) 兼容性**：用户在体验 Claude Opus 5.5 / Thinking 模型时，频繁遇到上下文剪裁、重试机制剥离 `signature` 的问题，导致长时间对话中断。
2. **多通道部署体验**：
   * Telegram 管理员反映对大型群组建立单人白名单维护成本过高，急需基于群组信任的鉴权机制。
   * Matrix 线程 (Thread) 用户指出“卡片展示在 Timeline 而非 Thread”造成上下文割裂与误操作风险。
3. **安全配置的透明度**：用户对凭据（如 API Keys、SSH Keys、TLS 证书）在 Web 控制台的可见性表现敏感，普遍支持“只写/掩码”管理模式。

---

## 8. 待处理

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*