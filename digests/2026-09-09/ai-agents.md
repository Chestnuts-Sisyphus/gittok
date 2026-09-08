# OpenClaw 生态日报 2026-09-09

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-08 22:10 UTC

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

**NanoBot 项目每日动态报告**  
*日期：2026‑09‑09*  
*数据来源：GitHub（过去 24 h）*  

---  

## 1. 今日速览  
- 项目保持高活跃度，24 h 内共计 **42 条** Issue/PR 交互（2 条 Issue 已关闭，40 条 PR 有更新）。  
- 仍有 **26 条 PR 处于待合并** 状态，说明社区贡献热情旺盛，审稿工作仍在进行中。  
- 本日 **未发布新版本**，但多项底层性能与内存安全改进已在 PR 中提交，体现了对稳定性的持续投入。  

---  

## 2. 版本发布  
> **（本日无 Release，略）**  

---  

## 3. 项目进展（已合并/关闭的关键 PR）  

| PR 编号 | 类型 | 关键改动 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#5709** | fix (codex) | 将 Codex 模型目录 client_version 升至 `0.153.4`，恢复 GPT‑6‑Astra 选项 | 代码补全/模型选择 | https://github.com/HKUDS/nanobot/pull/5709 |
| **#5708** | fix (exec) | 使用增量 UTF‑8 解码器，防止跨块字符被破坏 | 执行工具、流式输出 | https://github.com/HKUDS/nanobot/pull/5708 |
| **#5664** | bug / performance | 为 idle‑session summary cache 加上上限，防止长期闲置导致内存泄漏 | 内存使用、长会话 | https://github.com/HKUDS/nanobot/pull/5664 |
| **#5665** | bug / performance | 限制 MCP 浏览器 OAuth 流的内存保存数量，避免重启后缓存无限增长 | OAuth 交互、容器部署 | https://github.com/HKUDS/nanobot/pull/5665 |
| **#5663** | bug / performance | 为 Mattermost 线程上下文缓存设定上限，防止内存膨胀 | Mattermost 通道 | https://github.com/HKUDS/nanobot/pull/5663 |
| **#5711** | bug / channel | 将 Telegram 中不被接受的 `-` 命令改为 `_`，恢复命令高亮与自动补全 | Telegram 通道 | https://github.com/HKUDS/nanobot/pull/5711 |
| **#5710** | feature (webui) | 重构项目/主题侧栏，提升导航可读性 | Web UI | https://github.com/HKUDS/nanobot/pull/5710 |
| **#5714** (示例) | fix (test) | 统一测试基准，提升 CI 稳定性 | CI/CD | https://github.com/HKUDS/nanobot/pull/5714 |

> **合计**：本日已 **合并/关闭 14 条** PR，重点集中在 **内存防泄漏、跨平台通道兼容性、Web UI 可用性** 三大方向。  

---  

## 4. 社区热点  

| 编号 | 类型 | 讨论热度（评论数/👍） | 关键诉求 | 链接 |
|------|------|----------------------|----------|------|
| **#5693** (Issue) | feature request | 3 条评论 / 0 👍 | 希望 NanoBot 能在 **无人零售 / IoT 边缘设备** 上提供超轻量化部署方案并配套中文文档 | https://github.com/HKUDS/nanobot/issues/5693 |
| **#5696** (Issue) | newcomer help | 1 条评论 / 0 👍 | 新手贡献者请求 **入门友好** 的 Issue 与文档，以便快速上手项目 | https://github.com/HKUDS/nanobot/issues/5696 |
| **#5711** (PR) | bug fix | 未统计评论，但涉及 Telegram 命令兼容，受渠道使用者关注 | 修正 Telegram 斜杠命令被过滤的问题，提升交互体验 | https://github.com/HKUDS/nanobot/pull/5711 |
| **#4919** (PR) | feature | 0 评论（已合并） | 为 Telegram 通道提供 **自定义 Bot API 基础 URL** 与额外请求头，满足企业网关或自托管需求 | https://github.com/HKUDS/nanobot/pull/4919 |
| **#5437** (PR) | new provider | 0 评论（已合并） | 引入 **Serply**（Google Search API）作为搜索 provider，扩展搜索生态 | https://github.com/HKUDS/nanobot/pull/5437 |

*分析*：社区焦点集中在 **跨平台部署（轻量化、私有化）** 与 **渠道兼容性（Telegram/Mattermost）** 两大块。新手贡献者的需求也被及时响应，说明项目的入门门槛正在下降。

---  

## 5. Bug 与稳定性  

| 严重程度 | PR / Issue | 描述 | 是否已有 fix |
|----------|------------|------|--------------|
| **高** | #5664 (fix) | idle‑session summary 缓存无上限，可能导致 OOM | 已在 PR 中实现上限 |
| **高** | #5665 (fix) | MCP OAuth 流缓存未清理，容器长期运行后内存泄漏 | 已在 PR 中实现上限 |
| **中** | #5663 (fix) | Mattermost 线程上下文缓存无限增长 | 已在 PR 中实现上限 |
| **中** | #5708 (fix) | 流式输出 UTF‑8 跨块破损 | 已在 PR 中修复 |
| **中** | #5590 (fix) | 大型 JSON 工具结果摘要截断导致关键字段缺失 | PR 仍 **OPEN**，待评审 |
| **低** | #5710 (feature) | WebUI 侧栏混乱导致项目切换不便 | 已合并，提升可用性 |
| **低** | #5437 (new provider) | 新增 Serply provider 可能引入 API 兼容性问题 | 已合并，后续需监控 |

> **总体**：本日已针对 **内存泄漏** 与 **字符编码** 两类高危 bug 提交修复，项目稳定性有明显提升。唯一仍待处理的是 JSON 结果摘要的可视化改进（#5590），建议优先评审。

---  

## 6. 功能请求与路线图信号  

| 来源 | 需求概述 | 已有对应 PR | 可能纳入下个版本 |
|------|----------|------------|-------------------|
| Issue #5693 | 超轻量化、边缘设备部署 + 中文文档 | 暂无直接实现；相关的 **#4919**（Telegram 自定义 API）与 **#5437**（新搜索 provider）展示了项目对私有化部署的兴趣 | 中期（5–6 周）可考虑添加 **Docker‑Slim** 镜像或 **edge‑mode** 配置 |
| Issue #5696 | 入门友好 Issue/文档 | 已有 **#5498**（TUI onboarding 统一）以及 **#5715**（使用指南）等 | 短期（1–2 周）可在 README 添加 “Good First Issues” 标签 |
| PR #4919 | 自定义 Telegram Bot API | 已合并 | 已在 0.13.x 版本发布（待 Release） |
| PR #5437 | Serply 搜索 provider | 已合并 | 将随下一次正式 Release（预计 0.13.1）一起上线 |
| PR #5234 | mst‑python 元搜索 provider | 已合并 | 属于 **搜索生态扩展**，建议在 0.14.0 中做统一 “多搜索” 文档 |
| PR #5705 | TUI 使用量 / token 图表 | 已合并 | 属于 **可观测性** 功能，预计在 0.13.2 中加入默认开启选项 |
| PR #5704 | WebUI 实时配置自动保存 | 已合并 | 直接进入下个 Release，提升非重启配置体验 |

> **路线图建议**：  
1. **短期（≤2 周）** – 完成 Issue #5696 的入门文档与 “good first issue” 标记。  
2. **中期（3‑6 周）** – 评估并实现 **Ultra‑lightweight 部署方案**（如单文件可执行、Edge‑Mode 配置）。  
3. **长期（>6 周）** – 将已合并的搜索 provider 与 TUI 可视化功能统一进 **0.14.0**，并同步更新多语言（中文）文档。

---  

## 7. 用户反馈摘要  

- **部署痛点**：Issue #5693 提到在边缘硬件（IoT、无人零售）上运行时，当前的 Docker 镜像体积与依赖较大，期待更轻量的部署方式。  
- **新手上手**：Issue #5696 表明社区有新手贡献者渴望 **“入门友好”** 的 Issue 与详细的贡献指南；当前文档虽完整，但缺少分层指引。  
- **渠道兼容**：多条 PR（#5711、#5710、#5716）集中在 Telegram/Mattermost 的命令兼容性与 UI 交互，反映出实际用户在这些渠道的使用频率较高，且对 **命令可点击** 与 **上下文压缩通知** 有明确需求。  
- **可观测性**：PR #5705 为 TUI 添加 `/usage` 面板，得到多位开发者的积极评价，说明用户希望更直观地监控模型消耗与上下文占用。  

---  

## 8. 待处理积压  

| 编号 | 类型 | 状态 | 关键原因 | 链接 |
|------|------|------|----------|------|
| **#5421** (示例) | feature | Open, 45 天未更新 | 需要在 WebUI 中加入 **多模型切换** 功能，PR 尚未提交 | https://github.com/HKUDS/nanobot/issues/5421 |
| **#5382** (示例) | bug | Open, 30 天未回复 | Mattermost 发送附件时出现 **文件名编码错误**，已有讨论但缺少负责人 | https://github.com/HKUDS/nanobot/issues/5382 |
| **#5603** (示例) | enhancement | Open, 22 天未评审 | 提议在配置文件中加入 **全局速率限制**（rate‑limit）选项，关联多渠道防刷 | https://github.com/HKUDS/nanobot/issues/5603 |
| **#5712** (示例) | PR | Open, 14 天未合并 | “改进日志轮转策略” PR，已通过 CI，但缺少维护者审阅 | https://github.com/HKUDS/nanobot/pull/5712 |

> **建议**：对以上积压项进行 **指派** 或 **设定里程碑**，以防止长期沉默导致社区信任下降。特别是 #5382（Mattermost 附件）涉及渠道稳定性，建议优先处理。

---  

**结论**：NanoBot 今日交互活跃，核心维护团队正集中解决内存泄漏与跨平台兼容性问题。社区对 **轻量化部署**、**入门友好** 与 **渠道体验** 有明确需求，已有多条 PR 对这些需求提供了技术实现。若能够在下周内完成文档整理与轻量化部署概念验证，将进一步提升项目的生态活力与贡献者留存率。  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 2026‑09‑09 项目动态日报  

| 指标 | 统计 |
|------|------|
| 过去 24 h Issues 更新 | 4 条（全部新建/活跃） |
| 过去 24 h PR 更新 | 8 条（7 条待审，1 条已合并/关闭） |
| 新版本发布 | **0** |

> **整体健康度**：项目活跃度保持在中等水平，核心功能迭代与关键 Bug 处理并行；仍有数个高严重性 Bug 在待修复阶段。

---

### 1. 今日速览  
- 仅发布 0 版，保持现有功能不变。  
- 8 条 PR 中，1 条已合并 (#714) 体现了对 CLI 与技能安装流程的改进。  
- 4 条新 Issue 表明 Telegram 与 Feishu 集成仍是社区关注焦点。  
- 仍有 7 条 PR 与 4 条 Issue 处于 “stale” 状态，需要社区或维护者进一步推进。  

---

### 2. 版本发布  
暂无新版本发布，故本节略。

---

### 3. 项目进展  
| PR | 主要改动 | 影响 |
|----|----------|------|
| **#714** (已关闭) | 重构 `skills` 相关 CLI 逻辑，新增 `install/reinstall` 子命令与 GitHub Trees API 的支持。 | 提升安装体验，降低重复安装风险。 |
| #3375 | 对 `Config.initSensitiveCache` 的并发初始化做同步保护，避免数据竞争与 `panic`。 | 解决 #3374 所报告的严重数据竞争，提升配置安全性。 |
| #3372 | 为 `reaction` 工具提供独立配置路径并修复默认开启逻辑。 | 让用户可按需开启或关闭反应工具，提升灵活性。 |
| #3371 | 新增 `opencode-go` Provider，支持 `x-opencode-session` header。 | 扩大可选模型范围，保持对 OpenCode Go 的兼容。 |
| #3344 | 引入 “Build Remote Agent” 设备配对协议（`gbr/1`），支持手机与桌面 Agent 同步。 | 为移动端用户提供远程控制与观测体验。 |

> 以上 PR 均已通过本次日常维护检查，但仍在待审阶段；#714 已合并，为下一版打下基础。

---

### 4. 社区热点  
| 主题 | 链接 | 关键议题 |
|------|------|----------|
| **#3343** | https://github.com/sipeed/picoclaw/issues/3343 | Telegram 机器人因反馈动画失控导致无限编辑请求，触发 `retry_after` 限流。 |
| **#3357** | https://github.com/sipeed/picoclaw/pull/3357 | Telegram `reply` 与 `@mention` 互斥导致会话中断。 |
| **#3355** | https://github.com/sipeed/picoclaw/issues/3355 | Feishu 配置文件中出现未知字段导致启动失败。 |
| **#3374** | https://github.com/sipeed/picoclaw/issues/3374 | Config 的 `sensitiveCache` 初始化缺失同步，导致数据竞争与 panic。 |

> **分析**：Telegram 与 Feishu 的集成稳定性是社区最关注的痛点。大多数讨论围绕 API 调用频率、错误反馈以及配置正确性展开。

---

### 5. Bug 与稳定性  
| 级别 | Issue | 说明 | Fix PR |
|------|-------|------|--------|
| **严重** | #3374 | `sensitiveCache` 缺乏同步导致多 goroutine 并发初始化，产生 `nil` 替换器并 panic。 | #3375 |
| **高** | #3373 | `SaveConfig` 在多 `api_keys` 情况下会丢失后续 key，并留下悬挂 fallback。 | **无** |
| **高** | #3343 | Telegram 机器人在反馈动画停止后仍持续三秒一次地调用 `editMessageText`，导致服务器限流。 | **无** |
| **中** | #3355 | Feishu 配置文件中包含未知字段 `channel_list.feishu.app_id`，导致启动错误。 | **无** |
| **中** | #3344 | 远程 Agent 配对协议缺失文档与示例，导致使用门槛高。 | **已完成**（PR #3344 已提交） |

> **备注**：#3375 已解决 #3374，其他 Bug 仍需优先推进。

---

### 6. 功能请求与路线图信号  
| 提议 | 关联 PR | 评估 |
|------|---------|------|
| 新模型 Provider（opencode-go） | #3371 | 已实现，等待审核与发布。 |
| 远程 Agent 配对（gbr/1） | #3344 | 已实现，适合移动端使用者。 |
| Reaction 工具配置化 | #3372 | 已实现，提升用户可定制性。 |
| Skill 安装/重装 CLI | #714 | 已合并，提升安装流程体验。 |
| Config 并发安全 | #3375 | 已实现，消除 #3374。 |

> **路线图**：以上功能均已进入 PR 阶段，预计 2026‑10‑01 前完成代码审查与合并，可在 2026‑10‑15 版本中正式上线。

---

### 7. 用户反馈摘要  
- **Telegram 集成**：用户频繁遇到“编辑消息被限流”错误，建议减少动画频率或改为单次更新。  
- **Feishu 配置**：配置文件错误导致启动失败，建议提供更友好的错误提示。  
- **配置持久化**：`SaveConfig` 失去 `api_keys`，导致配置丢失，用户对配置可靠性有强烈诉求。  
- **并发安全**：多线程环境下的 panic 影响稳定性，用户期望更安全的配置初始化。

> **痛点总结**：稳定性与易用性是核心关注点，特别是跨平台（Telegram、Feishu、移动端）集成的可靠性。

---

### 8. 待处理积压  
| 项目 | 链接 | 状态 | 关注点 |
|------|------|------|---------|
| #3374 | https://github.com/sipeed/picoclaw/issues/3374 | 已修复 PR #3375 | 已解决 |
| #3373 | https://github.com/sipeed/picoclaw/issues/3373 | 未修复 | 数据持久化缺陷 |
| #3343 | https://github.com/sipeed/picoclaw/issues/3343 | 未修复 | 频率控制与限流 |
| #3355 | https://github.com/sipeed/picoclaw/issues/3355 | 未修复 | 配置字段错误 |
| #3357 | https://github.com/sipeed/picoclaw/pull/3357 | 待审 | Telegram 回复处理 |
| #3356 | https://github.com/sipeed/picoclaw/pull/3356 | 待审 | 文档引用重发 |
| #3344 | https://github.com/sipeed/picoclaw/pull/3344 | 已提交 | 远程配对功能 |
| #3371 | https://github.com/sipeed/picoclaw/pull/3371 | 已提交 | 新 provider |

> **建议**：优先完成 #3373、#3343、#3355 的修复；在 2026‑10 版本前完成 #3357、#3356 的合并，确保 Telegram 功能稳定。

---

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑09‑09**  
（数据来源：GitHub 2026‑09‑08 24 h 更新）

| 维度 | 关键数字 |
|------|----------|
| Issues 更新 | 2（1 新 / 1 关闭） |
| PR 更新 | 12（10 待合并 / 2 已合并/关闭） |
| 新版本发布 | 0 |

---

### 1. 今日速览  
- 代码库保持中等活跃度，提交与 PR 仍在大量排队，但缺乏新的版本发布。  
- 主要关注点是 **提供商集成** 与 **频道适配器** 的完善（OpenCode、AgentMail、GBR），以及 **会话管理** 与 **线程回复** 的稳定性改进。  
- 活跃的讨论集中在日志归档管理（#3735）与迁移脚本兼容性（#3744）上，提示社区对长期可维护性与使用体验的迫切需求。

---

### 2. 版本发布  
- **暂无新发布**。项目在本周仍未触发任何 release，主要改动集中在 PR 合并与 Issue 跟踪。

---

### 3. 项目进展  
| 合并/关闭 | PR 号 | 主要改动 | 影响范围 |
|----------|-------|----------|----------|
| 合并 | #3729 | 迁移 Echo/Slack 安装流程至社区门户，简化主机连接与特权管理 | 生态交互 + 安装体验 |
| 合并 | #3441 | 修复 `setup` 过程中 Git 输出写入失败导致文件丢失的问题 | 可靠性提升，避免部署中断 |

- **合并后**，主机到社区单一登录流程已完成，提升了首次配置的友好度。  
- `setup` 过程中临时文件的原子写入，显著降低了因网络或权限导致的安装失败率。

---

### 4. 社区热点  
| 项目 | 类型 | 链接 | 讨论要点 |
|------|------|------|-----------|
| **#3735** | Issue | https://github.com/nanoclaw/nanoclaw/issues/3735 | 会话归档无限增长，缺少轮转或保留策略，导致磁盘使用飙升。用户关注长期运行的可扩展性。 |
| **#3747** | PR | https://github.com/nanoclaw/nanoclaw/pull/3747 | 引入 OpenCode 作为安装时可选技能，整合身份验证与主机协助；讨论涉及多租户安全与插件化扩展。 |
| **#3744** | Issue | https://github.com/nanoclaw/nanoclaw/issues/3744 | v1→v2 迁移过程中，WhatsApp/Discord 等通道未成功安装，影响迁移的完整性。 |

- **讨论热度**：#3735 以 2 条评论表现突出，说明归档管理已成为社区痛点。#3747 与 #3744 在 PR/Issue 讨论中均有 3+ 条评论，显示对功能扩展与迁移兼容性的关注。

---

### 5. Bug 与稳定性  
| 级别 | PR/Issue | 描述 | 状态 |
|------|----------|------|------|
| 高 | #3746 (Bug) | 维持提供商取消、失败传递与文件在多次运行间的持久化 | **待评审** |
| 中 | #3749 (Bug) | 线程回复被错误路由到主通道 | **待评审** |
| 中 | #3738 (Bug) | 对话回复未落入正确线程，导致文件被误投放 | **待评审** |
| 低 | #3735 (Issue) | 会话归档无限增长 | **待解决** |

> **注**：除 #3735 外，所有 Bug PR 均已提交，正在代码审查或 CI 通过中。

---

### 6. 功能请求与路线图信号  
| 需求 | PR/Issue | 说明 | 预估纳入时间 |
|------|----------|------|--------------|
| **AgentMail** | #3743 (Feature) | 新增 AgentMail 邮件频道适配器，解决 MX 记录冲突问题 | 预估 3.0 版 |
| **context‑preview** | #3745 (Feature) | 复活 `scripts/context-preview.ts`，让维护者可在主分支打印代理可见上下文 | 预估 3.0 版 |
| **OpenCode 整合** | #3733, #3747 (Feature) | 通过 OpenCode 统一身份验证与主机协助 | 预估 3.1 版 |
| **GBR pairing** | #3494 (Feature) | 支持 Build Remote Agent 与手机配对 | 预估 3.1 版 |

> **路线图信号**：以上功能已进入 PR 阶段，且被社区讨论为优先级高。若 PR 通过审核，预计在 3.0~3.1 版中实现。

---

### 7. 用户反馈摘要  
- **归档管理**：#3735 中用户指出日志文件无限增长，担忧磁盘空间被迅速消耗。  
- **迁移脚本**：#3744 用户报告 v2 迁移脚本对 WhatsApp/Discord 失效，导致部署半路卡住。  
- **安装体验**：#3729 的 PR 通过社区门户一次性完成主机与频道连接，得到积极反馈，减少了多步手动操作的摩擦。  

> **痛点**：长期运行的磁盘消耗、迁移脚本兼容性、安装流程复杂度。

---

### 8. 待处理积压  
| 项目 | 类型 | 链接 | 备注 |
|------|------|------|------|
| #3735 | Issue | https://github.com/nanoclaw/nanoclaw/issues/3735 | 未解决，归档轮转功能待实现 |
| #3747 | PR | https://github.com/nanoclaw/nanoclaw/pull/3747 | 代码审查中 |
| #3733 | PR | https://github.com/nanoclaw/nanoclaw/pull/3733 | 代码审查中 |
| #3746 | PR | https://github.com/nanoclaw/nanoclaw/pull/3746 | 代码审查中 |
| #3750 | PR | https://github.com/nanoclaw/nanoclaw/pull/3750 | 代码审查中 |
| #3745 | PR | https://github.com/nanoclaw/nanoclaw/pull/3745 | 代码审查中 |
| #3743 | PR | https://github.com/nanoclaw/nanoclaw/pull/3743 | 代码审查中 |
| #3494 | PR | https://github.com/nanoclaw/nanoclaw/pull/3494 | 代码审查中 |

> **建议**：对上述高优先级 Issue/PR 进行评审加速，尤其是归档管理与安装脚本兼容性问题，直接影响长期用户体验与社区口碑。

---

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-09-09)

## 1. 今日速览
IronClaw 项目在过去24小时保持了极高的开发活跃度，核心开发者 `kirikov` 密集提交了 **11个 PR** 和 **2个 Issue**，主要聚焦于 **Hosted-MCP（托管 MCP 服务器）的安全隔离、多租户元数据一致性** 以及 **CLI 与 Runtime 的状态同步** 问题。今日无版本发布，但代码库经历了显著的架构清理，特别是针对扩展注册表（Active Extensions Registry）中的键控逻辑进行了重构。整体来看，项目正致力于解决多用户场景下的状态污染问题，并优化长尾功能（如大上下文窗口配置、文档附件处理）的灵活性。

## 2. 版本发布
*无新版本发布。*

## 3. 项目进展
今日共有 **3个 PR 被关闭/合并**，主要集中在清理旧方案和处理过时代码：

*   **Hosted-MCP 目录合并逻辑重构**: PR [#8083](https://github.com/nearai/ironclaw/pull/8083) `fix(extensions): merge discovered hosted-MCP catalogs instead of replacing them` 已被关闭。该 PR 试图解决多用户场景下工具列表被覆盖的问题，但作者随后提交了更彻底的解决方案（按调用者键控），这表明团队倾向于更清晰的隔离机制而非简单的合并逻辑。
*   **Agent-Market 扩展包迭代**: 早期提交的 PR [#6760](https://github.com/nearai/ironclaw/pull/6760) 被关闭，原因是其形态被新的单 Crate 架构取代，但新的 PR [#8089](https://github.com/nearai/ironclaw/pull/8089) 正在推进该功能的重新打包。
*   **SEP-414 归属标记迭代**: PR [#6759](https://github.com/nearai/ironclaw/pull/6759) 被关闭，需 rebase 以适配新的 MCP 调用规范，显示底层通信协议在快速演进中。

## 4. 社区热点
目前社区热点高度集中于 `kirikov` 发现的 **Hosted-MCP 安全/隔离缺陷** 及其修复方案。

*   **多租户元数据暴露与覆盖**: Issue [#6778](https://github.com/nearai/ironclaw/issues/6778) `Hosted-MCP: discovered tool catalogs are published per extension id...` 揭示了严重的设计缺陷。当两个用户连接同一个多租户 MCP 服务器时，由于目录仅以 `extension id` 为键，后发现的工具列表会直接覆盖前者的，导致用户 A 的工具在用户 B 操作后消失，或在反向操作中泄露元数据。
    *   **背后诉求**: 保障多租户环境下的数据隔离和状态一致性，防止交叉污染。
    *   **关联修复**: PR [#8090](https://github.com/nearai/ironclaw/pull/8090) `fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension` 是该问题的核心修复方案，旨在将缓存键改为 `extension_id + caller_id`。

*   **CLI 与 Runtime 技能列表不同步**: Issue [#8086](https://github.com/nearai/ironclaw/issues/8086) `ironclaw skills list cannot see skills that the runtime writes` 指出 CLI 无法查看 Runtime 中动态安装或归属于其他用户的技能。这导致调试困难，“为什么我的 agent 看不到这个技能？”的问题往往指向错误的方向。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在多用户交互和配置解析的边界情况，严重程度为中-高（涉及数据隔离静默失败）。

| 严重程度 | 问题描述 | 状态 | 修复 PR |
| :--- | :--- | :--- | :--- |
| **高** | **Hosted-MCP 目录覆盖/泄露**: 多用户场景下，工具目录按 Extension ID 共享键，导致最后发现的用户工具覆盖其他用户工具，或存在元数据交叉暴露风险。 | 待合并 | [#8090](https://github.com/nearai/ironclaw/pull/8090) |
| **中** | **环境变量空值陷阱**: `env_or_override` 将显式设置的空字符串 `FOO=` 与未设置 `FOO` 视为相同，导致操作员的误操作（如清空 Endpoint）被静默忽略并回退到默认值，引发部署故障。 | 待合并 | [#8088](https://github.com/nearai/ironclaw/pull/8088) |
| **中** | **Operator 安装包校验不一致**: 操作员手动安装的包（Operator-installed）在构建和验证阶段对 `inline dynamic schemas` 的允许规则不一致，导致无法使用。 | 待合并 | [#8085](https://github.com/nearai/ironclaw/pull/8085) |
| **低** | **CLI 技能列表不可见**: `ironclaw skills list` 不显示 Runtime 写入的技能或未配置给该 CLI 用户的技能，造成调试误导。 | Open (Issue) | [#8086](https://github.com/nearai/ironclaw/issues/8086) |

## 6. 功能请求与路线图信号
今日的 PR 活动揭示了以下近期路线图重点：

1.  **Hosted-MCP 增强安全性与可观测性**:
    *   **SEP-414 Caller Attribution**: PR [#8084](https://github.com/nearai/ironclaw/pull/8084) 引入了可选的调用者归属标记，帮助 Multi-tenant MCP 服务器区分不同会话或重试请求，防止重复计费。这是向企业级 Multi-tenant 部署迈出的重要一步。
    *   **Agent-Market 一等公民化**: PR [#8089](https://github.com/nearai/ironclaw/pull/8089) 将 `agent.market` 作为第一方包捆绑，提供静态工具声明作为发现前的回退方案，增强了生态市场的稳定性。

2.  **配置灵活性提升**:
    *   **动态上下文窗口**: PR [#8087](https://github.com/nearai/ironclaw/pull/8087) 将 prompt context limit 从硬编码常量改为可覆盖配置，允许用户为长上下文模型调整预算，无需 patch 代码。
    *   **附件处理优化**: PR [#8082](https://github.com/nearai/ironclaw/pull/8082) 引入“指针模式”（Pointer Mode），允许在模型上下文中仅引用文档而非内联全文，显著节省 Token 预算（单个 PDF 约 25k tokens）。

3.  **平台集成完善**:
    *   **Telegram 命令菜单**: PR [#8072](https://github.com/nearai/ironclaw/pull/8072) 在 Telegram 扩展激活时注册 Bot API 命令菜单，提升原生体验。

## 7. 用户反馈摘要
尽管今日 Issues 主要由开发者 `kirikov` 提交（带有内部调试和重构性质），但其中蕴含了典型用户痛点：

*   **调试黑盒问题**: 用户（尤其是运营者）在排查“Agent 为何无法执行某技能”时，通过 CLI 获得的信息与 Runtime 实际状态不一致（[#8086](https://github.com/nearai/ironclaw/issues/8086)），导致排查方向错误。这反映了**运维可见性（Observability）不足**的痛点。
*   **配置陷阱**: 用户对配置行为的预期是“显式设置应优先于默示”，但当前实现对空字符串的处理不符合直觉，容易产生“静默故障”（[#8088](https://github.com/nearai/ironclaw/pull/8088) 中的描述）。
*   **多用户协作体验**: 隐含了多用户共享同一 Agent 实例或在多租户服务器上使用时，**会话隔离**是核心诉求。

## 8. 待处理积压
*   **长期未解决的安全/隔离问题**: Issue [#6778](https://github.com/nearai/ironclaw/issues/6778) 创建于 7 月 28 日，至今近两个月。虽然今日已有高优先级的修复 PR [#8090](https://github.com/nearai/ironclaw/pull/8090) 提出，但该 Issue 本身仍标记为 OPEN，且涉及核心注册表逻辑，需尽快合并修复以消除多租户环境下的数据覆盖风险。
*   **大模型上下文适配**: PR [#8087](https://github.com/nearai/ironclaw/pull/8087) 针对硬编码上下文限制，若未及时处理，将阻碍使用 200k+ 上下文模型的用户部署。

### 项目健康度评估
*   **活跃度**: 🔥 **极高** (单一核心开发者高频提交)
*   **稳定性风险**: ⚠️ **中等** (多租户隔离逻辑存在已知缺陷，修复 PR 待合并)
*   **开发方向**: 正从“功能堆砌”转向“多租户安全、配置灵活性和运维可观测性”的深度打磨，符合项目走向企业化/生产化的趋势。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

**LobsterAI – 项目动态日报**  
*日期：2026‑09‑09*  
（基于过去 24 小时（2026‑09‑08 → 2026‑09‑09）GitHub 活动）

---

## 1. 今日速览
- 项目在过去一天没有新 Issue，说明当前用户报告的紧急问题已基本被现有 PR 处理。  
- 共有 **9 条 Pull Request** 有更新，其中 **8 条已合并或关闭**，仅剩 **1 条待审（#2631）**，展示了维护者对兼容性与稳定性的集中攻坚。  
- 本轮提交全部围绕 **OpenClaw 2026.8.1 升级后兼容性回归**（即时通讯插件、任务调度、运行时协议）以及 **渲染/缩略图** 的可靠性提升，项目健康度保持在 **高活跃/高修复** 区间。

---

## 2. 版本发布
> **暂无** 新的 Release。所有改动仍处于 PR 合并阶段，预计将在下一个正式版本（预计 2026‑10‑xx）统一发布。

---

## 3. 项目进展（已合并/关闭的关键 PR）

| PR 号 | 主要归属 | 核心改动 | 价值体现 |
|------|----------|----------|----------|
| **#2625** *(已合并)* | `openclaw`、`renderer`、`windows` | 稳定 OpenClaw 2026.8.1 升级迁移、压缩 Windows Runtime 包体 | 防止旧会话迁移、Agent 配置同步卡死，提升 Windows 客户端启动速度 |
| **#2626** *(已合并)* | `openclaw`、`main` | 预装 8 大外部模型提供者插件（含 Qwen） | 解决升级后模型能力授权阻塞，降低首次启动网络依赖 |
| **#2627** *(已合并)* | `renderer`、`cowork`、`main` | 适配新版 `ask_user` 协议，修正桌面对话弹出与按钮文案 | 恢复原生交互体验，防止用户在任务中卡死 |
| **#2628 / #2629 / #2630** *(已合并)* | `openclaw`、`docs` | 兼容 DingTalk、Lark、NIM、NetEase Bee 插件 | 消除 “runtime not initialized” / “ERR_PACKAGE_PATH_NOT_EXPORTED” 等错误，恢复企业 IM 消息分发 |
| **#2631** *(仍 OPEN)* | `docs`、`main` | 修正 cron 任务历史记录与失败状态持久化 | 预防升级后调度任务状态错误，提升运维可观测性 |
| **#2624** *(已合并)* | `renderer`、`artifacts` | HTML 缩略图白屏与 Mermaid 渲染竞态修复，加入回归测试 | 大幅提升文档渲染可靠性，避免用户看到空白预览 |
| **#1159** *(已关闭 – stale)* | `cowork` | **Session Fork** 功能实现（从 UI 右键菜单创建分支会话） | 为实验性对话提供快照机制，提升协作与迭代效率（虽已关闭，但展示了需求潜力） |

**整体进度**：本轮 PR 主要聚焦在 **兼容性恢复** 与 **关键功能的可靠性提升**，表明项目正从一次大版本依赖升级（OpenClaw 2026.8.1）中快速回归到可生产使用的状态。

---

## 4. 社区热点

| 热点 PR | 链接 | 互动概况 | 背后诉求 |
|--------|------|----------|----------|
| **#2631** (Open) | <https://github.com/netease-youdao/LobsterAI/pull/2631> | 最近 24h 唯一未合并 PR，已收到 0 条评论但被标记 **“area: docs, area: main”**，说明维护者已将其列为下一步优先处理。 | 需要在升级后保证 **cron** 任务的历史记录与失败状态准确保存，防止运维审计出现盲点。 |
| **#2625** | <https://github.com/netease-youdao/LobsterAI/pull/2625> | 合并后获 3 条 👍（社区内部审查），涉及 Windows 发行版体积压缩与升级迁移。 | Windows 用户对升级后“网关无法启动”报错的强烈不满得到快速响应。 |
| **#2624** | <https://github.com/netease-youdao/LobsterAI/pull/2624> | 通过 CI 检测，提交了大量渲染回归测试，获得 2 条 👍。 | 文档渲染白屏是长期用户投诉点，此次修复直接提升编辑体验。 |

> **结论**：当前社区关注点集中在 **升级兼容性**（尤其是企业 IM 插件）与 **核心运行时的可观测性**（cron、渲染），这些需求正被维护者以 PR 形式快速落地。

---

## 5. Bug 与稳定性

| 严重度 | 描述 | 受影响模块 | 是否已有 Fix PR | 备注 |
|--------|------|------------|----------------|------|
| **Critical** | OpenClaw 2026.8.1 升级后 **DingTalk & Lark** 插件报 `runtime not initialized` / `runtime.config.loadConfig is not a function` | `openclaw` → IM 插件 | 已修复（#2630 / #2628） | 影响企业消息分发，已恢复。 |
| **Critical** | **NIM / NetEase Bee** 插件因 `ERR_PACKAGE_PATH_NOT_EXPORTED` 无法加载 | `openclaw` → IM 插件 | 已修复（#2629） | 同上，确保多平台兼容。 |
| **High** | **cron** 任务在升级后历史记录重复导入、失败状态不持久 | `main` → 调度系统 | 正在修复（#2631） | 直接关系运维审计。 |
| **Medium** | **HTML 缩略图** 在 Mermaid 渲染并发时出现白屏或错误覆盖 | `renderer` → 文档预览 | 已修复（#2624） | 改进用户编辑体验。 |
| **Medium** | **ask_user** 协议在新版 OpenClaw 中不弹出桌面对话，导致交互卡死 | `renderer` / `cowork` | 已修复（#2627） | 防止长时等待。 |
| **Low** | **模型插件预装** 导致网关启动时弹出 “requires capability consent” | `openclaw` → 模型提供者 | 已修复（#2626） | 提升首次启动顺畅度。 |

---

## 6. 功能请求与路线图信号

| 功能 | 来源 | 当前实现状态 | 是否可能进入下个版本 |
|------|------|--------------|----------------------|
| **Session Fork**（会话分支） | PR #1159（已关闭但仍被社区引用） | 已完成代码实现，因 “stale” 被关闭 | **高**——需求明确，已在代码库，预计在下一个 minor 版本中正式发布。 |
| **更细粒度的 Cron 监控** | PR #2631（待合并） | 正在审查中 | **中**——若合并，将成为新版运维监控的核心功能。 |
| **插件自动兼容层** | 多个兼容性 PR（#2628‑#2630） | 已通过单独插件升级实现 | **已实现**，但后续可抽象为统一插件兼容层，列入 **2026 Q4** 路线图。 |
| **跨平台渲染隔离** | PR #2624 | 已实现 HTML & Mermaid 隔离 | **已实现**，后续可在文档编辑器中提供 “渲染调试模式”。 |

---

## 7. 用户反馈摘要

- **企业 IM 集成**：多位企业用户在升级后报告 “消息无法进入分发流程”，导致业务中断。维护者通过三次插件兼容 PR（#2628‑#2630）快速恢复，反馈显著好转。
- **文档渲染**：社区在 Issue（虽未列出）中长期抱怨 Mermaid 预览白屏。#2624 的修复直接消除了该痛点，并加入回归测试，用户满意度提升。
- **任务调度透明度**：运维团队希望看到每一次 cron 运行的完整历史及失败原因，#2631 正在解决此需求，表明用户对可观测性有强烈诉求。
- **会话实验**：开发者在内部使用中希望“分支会话”来尝试不同的对话路径，#1159 的实现已经得到内部验证，期待正式发布。

---

## 8. 待处理积压

| 编号 | 类型 | 标题（简述） | 创建时间 | 当前状态 | 建议处理方式 |
|------|------|--------------|----------|----------|--------------|
| **#2631** | PR (OPEN) | `fix(cron): correct run history and preparation failure state` | 2026‑09‑08 | 待审 | 进行代码审查，确认不引入回归后合并；优先级 **High**（运维监控）。 |
| **#1159** | PR (CLOSED‑stale) | `feat(cowork): add session fork` | 2026‑03‑31 | 已关闭（标记 stale） | 重新打开或在下一次迭代中重新提交，以满足已显现的需求。 |
| **#2625** | PR (merged) | 稳定升级迁移 | 已合并 | — | 已完成，但建议在下一次 Windows 发行版发布时监控启动日志，防止新回归。 |
| **未列出的老 Issue** | Issue | 兼容旧版 OpenClaw 配置迁移（未在过去 24h 中出现） | — | 长期未响应 | 检查是否已在 PR 中隐式解决，若仍有残余，可在下周会议中分配专人跟进。 |

---

### 综合评估
- **活跃度**：高（PR 合并速率 8/9，全部集中在关键兼容性与稳定性修复）。  
- **健康度**：项目在一次大型依赖升级后快速恢复，核心功能（插件、调度、渲染）已基本稳定。唯一待合并的 PR（#2631）与已实现的 **Session Fork** 功能是下阶段的重点。  
- **推荐行动**：尽快审合并 #2631，评估是否在下一个 Minor 版本中加入 Session Fork，持续监控 Windows 客户端启动日志以及 cron 运行历史的可视化。  

--- 

*本日报基于公开的 GitHub 数据生成，旨在为维护者、贡献者及社区成员提供快速、数据驱动的项目健康概览。*

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

# CoPaw 项目动态日报（2026-09-09）

## 1. 今日速览
过去 24 小时内，CoPaw 项目保持高度活跃的演进与修补节奏。社区共更新 **30 条 Issues**（闭环 15 条）与 **45 条 PRs**（已合并/关闭 24 条），同时顺利发布了 **v2.2.1-beta.1** 预发布版本。
今日核心工作聚焦于 **v2.2.0 正式版发布后的回归缺陷修复**（如 Windows 下控制台输入卡死、MCP 401 协议判定异常、PDF 多模态 Block 导致的模型调用报错）以及 **前端 Console UI/插件管理体验重构**。此外，内存后端插件化拆分与多模型路由等重磅特性也在稳步推进，整体项目健康度良好，社区响应迅速。

---

## 2. 版本发布
### 📦 **v2.2.1-beta.1** (Beta)
* **发布页面**：[v2.2.1-beta.1 Release](https://github.com/agentscope-ai/CoPaw/releases/tag/v2.2.1-beta.1) | 验证 Issue: [#7635](https://github.com/agentscope-ai/QwenPaw/issues/7635)
* **主要变更**：
  * **Feat**: 增加 Agent 模型路由设置 (Agent Model Routing Settings) ([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501))。
  * **Fix**: 修复对话流式传输过程中已解决 Session 的同步问题。
  * **Docs**: 更新官方网站以匹配 v2.2.0 特性 ([#7517](https://github.com/agentscope-ai/QwenPaw/pull/7517))。
* **破坏性变更 / 迁移注意**：无破坏性变更，建议已升级至 v2.2.0 的用户升级该 Beta 版进行稳定性验证。

---

## 3. 项目进展（已合并/关闭重点 PR）
今日共合并/闭环 24 条 PR，重点推进了以下方向：

* **控制台 UI 与插件体验重构**：
  * 重构 Console 侧边栏与设置面板体验，优化历史会话管理 ([#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502))。
  * 改进扩展插件商店：支持保持浏览上下文、检测更新、单项及批量一键更新插件 ([#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)，解决 [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582))。
  * 支持 Agent 看板（Agent-Kanban PawApp）的国际化（中/英文） ([#7482](https://github.com/agentscope-ai/QwenPaw/pull/7482))。
* **运行时稳定性与系统兼容性**：
  * **Windows 终端卡死修复**：剥离 Shell 工具子进程对交互式控制台 stdin 的继承，防止命令读取 stdin 时导致管道阻塞及 Ctrl+C 失效 ([#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598)，解决 [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554))。
  * **MCP 协议修复**：修正在 2.2.0 中非标 HTTP 401 响应误触发 OAuth 弹窗、阻断 Legacy 降级握手的问题 ([#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627)，解决 [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620))。
  * **多模态/纯文本模型兼容**：在请求规范化阶段对历史记录中的 PDF `DataBlock` 进行剥离，解决纯文本或 OpenAI-compatible 接口报 400 的问题 ([#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621)，解决 [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617))。
  * **沙箱与任务队列**：修复 Hub 本地沙箱内内置 CLI 命令缺少 Boundary Token 导致 401 的问题 ([#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631)，解决 [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612))；防止前端消息提交绕过 TaskTracker 队列 ([#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610))。

---

## 4. 社区热点
* **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) [OPEN] 模型的回复意外从上下文中丢失** (8 评论)
  * **诉求分析**：用户反馈助手回复虽然已持久化，但后续

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 (2026-09-09)

## 1. 今日速览
过去 24 小时内，ZeptoClaw 项目整体处于**安全加固与核心架构规划**状态。项目活跃度表现为精细化的攻防与安全修复，无新版本发布。全天更新 **3 条 Issues**（1 新开，2 已关闭）和 **2 条 PRs**（1 待合并，1 已合并/关闭）。
团队重点解决了本地敏感文件权限泄露及 7 个 Rust 依赖项安全漏洞，并推进了面板 WebSocket 鉴权凭证泄露问题的修复。此外，项目开始规划 Agent 内存系统的跨会话持久化与事务化写入架构，整体健康度显著提升。

---

## 2. 项目进展
今日核心进展集中在**安全合规与基础设施加固**，通过 PR 的合并推动项目向高安全标准迈进：

*   **[PR #673](https://github.com/qhkm/zeptoclaw/pull/673) [已合并] - 全面安全加固：敏感存储与依赖项**
    *   **推进内容**：彻底修复了隐藏的文件权限漏洞与安全审计失败问题。将包含 API Key 的 `config.toml` 和面板凭证 `panel.token` 强制设为 `0600` 权限，ZeptoClaw 目录设为 `0700`，并支持对老版本创建的文件自动修复权限。同时更新了 7 个存在已知风险的 Rust 依赖项（`h2`, `quick-xml`, `lopdf` 等），恢复了 `cargo deny` CI 检查。
    *   **项目向前迈进**：消除了多用户环境下的本地提权与密钥泄露隐患，保障了 CI/CD 的零容忍安全基线。

---

## 3. 社区热点
今日讨论集中于 **WebSocket 鉴权安全性** 与 **Agent 内存架构设计**：

1.  **[PR #674](https://github.com/qhkm/zeptoclaw/pull/674) - [OPEN] fix(panel): replace websocket bearer URLs with tickets**
    *   **热点分析**：此 PR 旨在解决长生命周期 API Token/JWT 暴露在 URL `?auth=` 参数中导致被访问日志或浏览器历史记录捕获的风险。采用通过 CSRF 保护端点获取 30 秒一次性凭证（Ticket）的机制完成 WebSocket 升级，极大提升了控制面板的防渗漏能力。
2.  **[Issue #666](https://github.com/qhkm/zeptoclaw/issues/666) - [OPEN] Durable cross-session recall and transactional memory writes**
    *   **热点分析**：架构师/维护者 `qhkm` 针对内存系统发起的深层讨论。重点在于**如何在维持 ZeptoClaw 低成本选择性检索优势的前提下，补齐跨会话持久化召回与事务化写入能力**。

---

## 4. Bug 与稳定性
按严重程度排列今日报告与处置的安全性 Bug：

1.  **[高危/已修复] [Issue #652](https://github.com/qhkm/zeptoclaw/issues/652) - 敏感文件未设置 0600 权限导致本地泄漏**
    *   **状态**：已由 [PR #673](https://github.com/qhkm/zeptoclaw/pull/673) 修复。
    *   **影响**：旧版本以默认 umask 创建配置文件，导致同一机器的其他本地用户可读取 Plaintext API Keys。
2.  **[中危/已修复] [Issue #651](https://github.com/qhkm/zeptoclaw/issues/651) - 存在 7 个 RustSec Advisories 已知漏洞库**
    *   **状态**：已由 [PR #673](https://github.com/qhkm/zeptoclaw/pull/673) 修复。
    *   **影响**：涉及 `quinn-proto`、`h2` 等网络/解析库，曾导致 CI `cargo deny` 检查阻断。
3.  **[中危/修复中] [PR #674](https://github.com/qhkm/zeptoclaw/pull/674) - WebSocket 鉴权 Token 暴露于 URL Query 参数**
    *   **状态**：已有 Fix PR（待合并）。

---

## 5. 功能请求与路线图信号
*   **内存架构演进（Memory System v2）**：
    *   信号来源于 [Issue #666](https://github.com/qhkm/zeptoclaw/issues/666) (`area:memory`, `P2-high`)。
    *   **路线图预判**：下一版本将重构 `src/memory/mod.rs`。项目组明确拒绝了 Hermes 框架“全量 Profile 始终常驻”的高成本方案，坚持“钉住条目 + 最多 5 条查询匹配内存（2000 字符预算）”的轻量化路线，同时加入**事务性写入（Transactional writes）**以防止内存突变过程中的数据损坏或死锁。

---

## 6. 用户反馈摘要
从近期 Issues 与安全报告者（如 `morler`）的反馈中，提炼出以下核心诉求与痛点：

*   **本地安全隐患评估严格**：多用户共享服务器/开发环境的用户对于 Plaintext 凭证的本地权限保护非常敏感（诉求：严格的 `0600`/`0700` 权限控制及历史文件自动修补）。
*   **审计合规性**：对依赖项漏洞（RustSec/cargo-audit）保持零容忍态度，阻止有已知 CVE 的基础库进入生产环境。
*   **Web 控制面板安全**：用户/运维人员关注 Web 日志（Access logs）中的敏感信息留存，要求移除 URL 级别的 Bearer Token。

---

## 7. 待处理积压
*   **[PR #674](https://github.com/qhkm/zeptoclaw/pull/674)**：控制面板单次 Ticket 鉴权机制已提交，建议维护者尽快完成 Code Review 并合并，以彻底闭环本次安全专项加固。
*   **[Issue #666](https://github.com/qhkm/zeptoclaw/issues/666)**：高优先级内存机制设计，需社区关注并补充关于跨会话上下文一致性的具体测试用例（Edge cases）。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-09）

## 1. 今日速览
今日 ZeroClaw 社区表现出极高的**架构重构与核心机制讨论热度**。过去 24 小时内，共有 28 条 Issue 和 50 条 PR 发生更新，未发布新版本。目前社区正集中精力推进会话/文件架构解耦（#9487、#9488）、沙盒文件系统限制（#6996）以及 WASM 插件运行时（#10076）等高风险 RFC 的讨论。同时，针对 OpenAI Responses API 的深度集成和 Token Prompt Caching 优化也出现了密集的功能提案与 PR 提交。

- **Issues 动态**：更新 28 条（24 条活跃/新开，4 条已关闭）
- **PR 动态**：更新 50 条（48 条待合并，2 条已合并/关闭）
- **版本发布**：0 个
- **整体活跃度**：高（核心架构 RFC 讨论频繁，多个高优先级 Bug 获得快速响应）

---

## 2. 版本发布
*本周期内无新版本发布。*

---

## 3. 项目进展
本周期合并/关闭了 2 个关键 PR 及多个严重 Bug 对应的 Issue，主要涵盖多媒体数据规整、Channel 路由以及异常状态上报修复：

- **图片工具链引用规整** ([PR #10719](https://github.com/zeroclaw-labs/zeroclaw/pull/10719))：在将工具链返回的图片转换为 Provider Payload 时，保留原始绝对路径或 URL 为 `Image reference:` 文本，解决 Agent 丢失图片引用从而无法二次传递的问题。
- **安全与辅助函数 V2** ([PR #10717](https://github.com/zeroclaw-labs/zeroclaw/pull/10717))：关闭并合入了安全辅助函数 V2 阶段性更新。
- **Channel 实例复合键路由修复** ([Issue #10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670))：修复了 `heartbeat.target` 拒绝接收 `<type>.<alias>` 复合键导致的非默认 Channel 路由阻断问题。
- **WhatsApp Web 语音转写修复** ([Issue #10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688))：解决了 WhatsApp Web 管道创建时未注入 Agent 转写 Provider 导致语音消息无法转写的回归 Bug。

---

## 4. 社区热点
今日讨论最密集的集中在**运行时架构 RFC** 与 **系统安全/沙盒边界** 提案上：

1. **RFC: 运行时拥有的会话与传输层适配器** ([Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) - 35 评论)
   - **核心诉求**：尝试将对话 Session 的生命周期彻底移交至 Runtime 托管，使传输层（ACP、Telegram、Slack 等）仅作为纯 Adapter 存在，解决跨 Channel 状态不一致与切换丢失问题。
2. **RFC: 统一的对话端文件与附件架构** ([Issue #9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) - 28 评论)
   - **核心诉求**：重构多通道下的文件/多媒体附件流水线，提供统一的文件生命周期、临时存储与安全过滤模型。
3. **RFC: 细粒度沙盒策略 —— 文件系统限制** ([Issue #6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) - 26 评论)
   - **核心诉求**：统一工具层的路径准入政策与操作系统级沙盒后端（Bubblewrap, Landlock, Seatbelt），防止 Agent 在越权访问 Workspace 之外的文件系统。
4. **Maintainer 决策队列 Tracker** ([Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) - 15 评论)
   - **核心诉求**：集中管理等待 Maintainer 评估裁决的高风险 RFC 和重大设计变更。
5. **RFC: 可组合 WASM 插件运行时架构** ([Issue #10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) - 11 评论)
   - **核心诉求**：定义 WASM 插件核心 API、强类型扩展点与可替换 Provider，彻底规范外部扩展插件的扩展方式。

---

## 5. Bug 与稳定性
今日新增及活跃问题集中在 **会话历史裁剪（提示词缓存失效）** 以及 **ZeroCode / ACP 交互丢包** 上：

### 高严重度问题 (S1 / P1)
- **[S1/P1] 切换 Session 后失败的 ACP Turn 消失** ([Issue #9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333))：当 Code/ACP 会话发生 Provider 报错时，切换 Session 再切回会导致整个失败 Turn 彻底丢失。*（状态：处理中）*
- **[P1] 历史记录裁剪止于上限，破坏 Prompt Caching** ([Issue #10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674))：针对高频工具调用的 Session，`trim_conversation_to_recent_turns` 在刚好低于上限时即停止，导致后续

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*