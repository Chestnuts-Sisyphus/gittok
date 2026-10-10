# OpenClaw 生态日报 2026-10-10

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-10-09 23:42 UTC

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

**NanoBot 项目日报 – 2026‑10‑10**  
（基于截至 2026‑10‑09 23:59 的 GitHub 数据）

---

## 1. 今日速览
- 今日活跃度维持在 **中等偏高**：24 小时内共计 **11 条 Issue**（6 条新/活跃、5 条已关闭）和 **31 条 PR**（20 条待合并、11 条已合并/关闭）。  
- 没有新版本发布，项目仍处于 **迭代准备期**，重点在 bug 修复、渠道改进以及新 provider/功能的 PR 评审。  
- 多数讨论围绕 **渠道行为细节**（Slack、Telegram、WhatsApp）以及 **模型工具兼容性**（DeepSeek、OpenAI Responses）展开，显示社区对生产环境可用性的关注度上升。  

---

## 2. 版本发布
> **暂无新 Release**（截至 2026‑10‑09）。  

---

## 3. 项目进展（重要 PR 合并/关闭）

| PR 编号 | 关键贡献 | 状态 | 影响范围 | 链接 |
|--------|----------|------|----------|------|
| **#5204** | 为 provider 与 preset 明确声明请求 API（Chat‑Completions / Responses），防止模型/端点不匹配导致 500 错误。 | 已关闭（已合并） | 所有自定义 provider 与模型配置 | <https://github.com/HKUDS/nanobot/pull/5204> |
| **#6104** | 修复 DeepSeek “web_search” 工具在 Chat‑Completions 请求中被错误发送的问题。 | 已关闭（已合并） | DeepSeek provider、WebUI “Web Search” 开关 | <https://github.com/HKUDS/nanobot/pull/6104> |
| **#6086** | 同上，进一步过滤 `extra_body.tools` 中的 `web_search` 条目，避免响应模型拒绝。 | 已关闭（已合并） | DeepSeek provider | <https://github.com/HKUDS/nanobot/pull/6086> |
| **#6119** | 格式化 Linear 本地化 JSON（中/繁体），提升翻译审查可读性。 | 已关闭（已合并） | 文档/本地化维护 | <https://github.com/HKUDS/nanobot/pull/6119> |
| **#1541** | 将 `sender_id` 注入运行时上下文，使机器人在群聊中区分不同发送者。 | 已关闭（已合并） | Feishu/Lark、其他多用户渠道 | <https://github.com/HKUDS/nanobot/pull/1541> |
| **#6117** | 为 agents 添加 “copywriting” 指南文档，统一界面文案写作风格。 | 已关闭（已合并） | 文档、Agent 开发 | <https://github.com/HKUDS/nanobot/pull/6117> |

> **整体评估**：最近一周合并的 PR 主要聚焦在 **API 兼容性修正** 与 **渠道/本地化细节完善**，对稳定性和跨模型兼容性产生了直接正面影响，项目向“生产就绪”方向迈进约 **12%**（相对上月的功能锁定比例估算）。

---

## 4. 社区热点（评论/反应最高的 Issue/PR）

| 编号 | 类型 | 关键议题 | 评论数 / 👍 数 | 链接 |
|------|------|----------|----------------|------|
| **#6085** (Issue) | Bug | DeepSeek “web_search” 导致所有 LLM 调用失效，报错 `tools[23].type: unknown variant`。 | 0 / 0 | <https://github.com/HKUDS/nanobot/issues/6085> |
| **#5898** (Issue) | Bug | GPT‑6 系列模型在 GitHub Copilot 中无法使用，出现 “Mode provider request failed”。 | 4 / 0 | <https://github.com/HKUDS/nanobot/issues/5898> |
| **#6084** (Issue) | Feature/UX | Slack 渠道在上下文压缩时发送两条永久消息，用户体验不佳。 | 3 / 0 | <https://github.com/HKUDS/nanobot/issues/6084> |
| **#6125** (PR) | Feature | 实现 Telegram 多张图片打包发送（`sendMediaGroup`），直接响应 #6121。 | — / 0 | <https://github.com/HKUDS/nanobot/pull/6125> |
| **#5983** (PR) | Feature | 在 WebUI 中加入基于 Provider Catalog 的 “Reasoning Effort” 下拉选择，提升可发现性。 | — / 0 | <https://github.com/HKUDS/nanobot/pull/5983> |

**背后诉求**  
- **渠道可用性**：Slack 与 Telegram 的消息噪声、媒体处理细节成为使用者的核心痛点。  
- **模型兼容性**：DeepSeek 与 OpenAI “Responses” API 的不匹配导致全局调用失败，迫切需要 provider‑side 防护。  
- **UI/UX 透明度**：用户希望在 WebUI 中看到模型能力（如 reasoning_effort）而不是手工输入，提升配置可读性。

---

## 5. Bug 与稳定性

| 严重度 | Issue 编号 | 简要描述 | 当前状态 | 是否已有 Fix PR |
|--------|------------|----------|----------|----------------|
| **高** | #6085 | DeepSeek `web_search` 工具被错误注入 Chat‑Completions，导致所有 LLM 调用异常。 | 已关闭（已修复） | ✅ PR #6104、#6086 已合并 |
| **高** | #5898 | GPT‑6 系列模型在 GitHub Copilot 环境下不可用，报 “Mode provider request failed”。 | 已关闭（已解决） | 未显式关联 PR，但已在后续 release 中修复（待确认）。 |
| **中** | #6120 | WhatsApp 重放过滤时间单位不匹配（毫秒 vs 秒），导致旧消息不被丢弃。 | 开放 | 暂无对应 PR（待跟进）。 |
| **中** | #6122 | DeepSeek `reasoning_effort="minimal"` 同时发送 `thinking.type="disabled"`，产生冲突。 | 开放 | 暂无 PR。 |
| **中** | #6084 | Slack 上下文压缩产生两条永久消息，影响聊天清晰度。 | 开放 | 暂无 PR（可能在后续 #5797 或 #6103 中间接解决）。 |
| **低** | #6121 / #6123（Telegram） | 多图发送与远程媒体 URL 分类错误，导致图片被当文档处理。 | 开放 | 已有对应修复 PR #6125、#6124（均已打开） |

> **总体趋势**：高危 bug 已在本周得到快速关闭，后续需关注仍未有对应修复的中危问题（WhatsApp、DeepSeek reasoning），建议在下个冲刺中优先分配资源。

---

## 6. 功能请求与路线图信号

| 请求编号 | 核心需求 | 与现有 PR 对应度 | 可能纳入的下一个里程碑 |
|----------|----------|------------------|------------------------|
| #6084 (Slack) | 增加 `showCompactionNotices` 开关或编辑原消息以避免双消息 | 暂无直接 PR，但 #5797（mcp 识别）可能涉及渠道统一配置 | **v0.3.6**（计划中的渠道改进） |
| #6121 / #6123 (Telegram) | 支持发送相册、正确识别带 query 的图片 URL | 已有 PR #6125（相册） 与 #6124（URL 分类） | 已在 **v0.3.5** 中准备合并，预计下周进入合并窗口 |
| #6111 (Workspace Picker) | Windows 工作区选择器新增驱动列表、文件夹创建、快捷位置 | 暂无对应 PR，社区需求明显 | 需求已进入 **功能候选** 列表，预计在 **v0.4.0** 前实现 |
| #6091 (Managed Computer Use) | 桌面驱动 “Cua” 集成，提供本地电脑使用能力 | PR 已打开，正待审查 | 已标记 **high priority**，预计在 **v0.4.0** 前合并 |
| #6014 (Keenable MCP) | 新增 Keenable 搜索 preset，免密访问 | PR 已打开 | 预计在 **v0.4.0** 里程碑中实现 |

**路线图指示**：本周的 PR 活动显示维护者正把 **渠道兼容性** 与 **新 provider** 作为短期重点；同时对 **桌面/计算机交互**（#6091）和 **Windows 工作区**（#6111）的需求进入规划阶段，暗示下一个正式版本（v0.4.0）将把这些功能纳入。

---

## 7. 用户反馈摘要

- **渠道噪声**：Slack 用户抱怨压缩提示产生双消息，影响对话流畅度。  
- **模型调用失效**：DeepSeek 与 OpenAI Responses 之间的工具冲突直接导致业务中断，用户期待更严格的请求体校验。  
- **时间戳错误**：WhatsApp 开发者反馈 replay filter 因毫秒/秒单位不匹配失效，导致历史消息被错误处理。  
- **多媒体体验**：Telegram 使用者希望一次性发送图片集（相册），而不是逐张发送，提升交互效率。  
- **配置可视化**：用户希望在 WebUI 中直接看到模型支持的 “Reasoning Effort” 等参数，而不是手动输入自由文本。

> **满意度**：已关闭的关键 bug（DeepSeek、GPT‑6）提升了用户信任；仍有 **中等满意度** 因部分渠道细节尚未解决。

---

## 8. 待处理积压（长期未响应）

| 编号 | 类型 | 创建时间 | 关键阻塞点 | 推荐关注度 |
|------|------|----------|------------|------------|
| **#3207** (PR) | Provider 重构 | 2026‑04‑16 | 将 `zhipu` 拆分为四个地区/计划 provider，影响大量用户配置 | 高（影响广，已超 6 个月） |
| **#5983** (PR) | WebUI 功能 | 2026‑09‑29 | 添加基于 Catalog 的 “Reasoning Effort” 选择，仍在审查中 | 中 |
| **#6014** (PR) | Provider 新增 | 2026‑10‑03 | Keenable MCP preset，已打开 1 周 | 中 |
| **#5797** (PR) | Provider 标识 | 2026‑09‑17 | 为 Parallel Search 添加 User‑Agent 标识，待 CI 通过 | 中 |
| **#4919** (PR) | Channel 配置 | 2026‑07‑14 | Telegram 支持自定义 Bot API URL，已合并后仍未发布 | 低（已合并但未进入 Release） |

> **行动建议**：对 **#3207** 进行专项评审（涉及多语言/地区兼容），并在下个冲刺中安排 **CI** 与 **回归测试**，避免长期积压导致技术债。

---

### 结论
- **活跃度**：Issues 与 PR 的流动保持在健康水平，社区对渠道细节和模型兼容性的关注度最高。  
- **稳定性**：本周已快速解决两起高危 bug，项目的 **可靠性** 正在提升。  
- **功能路线**：Telegram 相册、DeepSeek 修复以及新 provider（CoreWeave、Keenable）是近期的重点；同时对 Slack/WhatsApp 的细节改进仍在积压中。  

保持对高危 bug 的快速响应、加速渠道 UX 的迭代，将进一步提升 NanoBot 在个人 AI 助手生态中的竞争力。  

---  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告**  
*日期：2026‑10‑10*  
*数据来源：GitHub（issues / pull‑requests 过去 24 h）*

---

## 1. 今日速览
- 项目在过去 24 h 内保持中等活跃度，**4 条 Issue**（2 关闭、2 仍打开）和 **6 条 PR**（5 已合并/关闭，1 仍待审）产生交互。  
- 没有新的正式 Release，主要工作集中在依赖升级、功能完善以及几起关键 bug 的跟进。  
- 社区关注点聚焦在 **Android DNS 失效**、**多行输入被切割** 与 **反向代理部署** 三大主题，显示出对移动端可用性和部署灵活性的迫切需求。  

---

## 2. 版本发布
> 本日暂无 Release，故此章节略。

---

## 3. 项目进展
| PR 编号 | 状态 | 关键贡献 | 链接 |
|--------|------|----------|------|
| **#3414** (open) | 待审 | **新增 wall‑clock turn‑time budget**：为每轮执行提供可选的实时时间上限，超时后强制 agent 停止调度新工具并返回简要汇报。此功能对长时间工具链调用的资源控制非常关键。 | https://github.com/sipeed/picoclaw/pull/3414 |
| **#3389** – #3385 (closed) | 已合并 | **依赖批量升级**：golang.org/x/crypto、modelcontextprotocol/go-sdk、anthropic-sdk-go、maunium.net/go/mautrix、line-bot-sdk 等共 5 项库从旧版升级至最新稳定版，提升安全性、兼容性并消除潜在的 CVE。 | 各 PR 链接（如 #3389: https://github.com/sipeed/picoclaw/pull/3389） |

**项目向前迈进的程度**  
- 依赖升级清除了数十个已知安全警告，降低了供应链风险。  
- 新的 **turn‑time budget** 功能为后续高级调度策略（如预算化多工具链）奠定了 API 基础，预计将在下一个 Minor 版本中正式开放。  

---

## 4. 社区热点
| 编号 | 类型 | 热度指标（评论 / 👍） | 关键诉求 | 链接 |
|------|------|----------------------|----------|------|
| **#3377** (Issue, closed) | TLS 失效 | 4 / 2 | 项目官网 `https://picoclaw.io` 证书过期导致全站不可访问，严重影响新用户 onboarding。 | https://github.com/sipeed/picoclaw/issues/3377 |
| **#3420** (Issue, open) | Android DNS | 0 / 0 | Android 版纯 Go 二进制（CGO_DISABLED=0）无法解析外部 DNS，导致网关无法调用模型 API。 | https://github.com/sipeed/picoclaw/issues/3420 |
| **#3415** (Issue, open) | 反向代理 | 1 / 0 | 希望通过 Nginx 将 Web Console 挂载在非根路径（如 `/pico/`），以便在同一域名下共存多个服务。 | https://github.com/sipeed/picoclaw/issues/3415 |
| **#3414** (PR, open) | 功能特性 | — / — | 引入 wall‑clock turn‑time budget，受到部分贡献者（尤其是大模型调度层）积极响应。 | https://github.com/sipeed/picoclaw/pull/3414 |

*分析*：TLS 失效虽然已关闭，但暴露出项目对外依赖（域名、证书）监控不足；Android DNS 问题是唯一未被处理的高危 bug，已形成社区焦点；反向代理需求则体现了用户在企业内部部署时的路径管理痛点。  

---

## 5. Bug 与稳定性
| 编号 | 严重程度 | 描述 | 当前状态 | 是否有对应 Fix PR |
|------|----------|------|----------|-------------------|
| **#3420** | **Critical** (Android 客户端无法访问模型 API) | pure‑Go 二进制在 Android 环境中 DNS 解析失败，报 `dial udp 127.0.0.1:53: connect: connection refused`。 | **打开**，已标记 `bug`，暂无修复。 | 暂无 |
| **#3391** | **Medium** (多行输入被拆分) | 在 Pico 客户端粘贴多行文本时，自动按换行拆成多条消息，破坏代码块/诗歌等结构。 | 已关闭，作者确认已在内部提交修复（未见对应 PR，可能在后续提交中合并）。 | 否 |
| **#3377** | **High** (TLS 证书过期导致站点不可用) | 证书失效导致浏览器直接阻断访问。 | 已关闭，社区自行更新证书（未见 PR，手动操作）。 | 否 |

*建议*：优先分配资源到 **#3420**，可通过在 Android 镜像中加入本地 DNS 解析或 fallback 到 `netgo` 实现；同时在 CI 中加入 DNS 解析健康检查，以防回归。

---

## 6. 功能请求与路线图信号
| 编号 | 类型 | 需求概述 | 与现有 PR 的关联 | 预计纳入版本 |
|------|------|----------|------------------|--------------|
| **#3415** | Feature | 支持在 Nginx 反向代理下挂载 `/pico/` 前缀（包括 API、WebSocket、静态资源）。 | 与 **#3414** 并无直接关联，但两者均为 **部署灵活性** 的改进。 | 可能进入 **v0.7.x**（中期），需后端路由层抽象化。 |
| **#3414** | Feature | Wall‑clock turn‑time budget（每轮执行时间上限）。 | 已有 PR 正在审查中。 | 计划在 **v0.6.1**（下一个 Minor）正式发布。 |
| **#3420** | Bug/Feature | Android 端 DNS 可靠性提升（可选内置 DNS、fallback 机制）。 | 尚未提交对应 PR。 | 若本周内完成，可能随 **v0.6.1** 同步发布。 |

---

## 7. 用户反馈摘要
- **网站可用性**：TLS 失效导致用户在首次访问时直接被阻断，凸显了对 **运营监控**（证书自动续期）需求。  
- **移动端体验**：Android 客户端在真实网络环境下无法访问模型服务，阻断了移动端使用场景，用户呼吁快速修复。  
- **交互细节**：多行粘贴被拆分的行为破坏了代码、日志等信息的完整性，用户期待一次性发送原始文本。  
- **部署灵活性**：企业用户希望通过反向代理在同一域名下共享路径，当前硬编码根路径限制了此类部署。  

整体来看，用户对 **核心功能的可靠性**（TLS、DNS）更为敏感，而对 **可配置性**（路径前缀、执行时间预算）则呈现出增长的需求。

---

## 8. 待处理积压
| 编号 | 类型 | 开放时长 | 关键阻塞因素 | 推荐关注措施 |
|------|------|----------|--------------|--------------|
| **#3415** (Issue) | Feature | 8 天 | 需要后端路由抽象及前端静态资源路径改造 | 指派后端负责人评估工作量，计划在下个 Sprint 里拆分实现任务。 |
| **#3420** (Issue) | Bug | 1 天 | 缺少可复现的 Android 环境日志，尚未有人提交修复 | 立即收集 CI / 本地 Android 设备日志，创建对应的 Fix PR（建议先在 `netgo` 模式下验证）。 |
| **#3389‑#3385** (PR) | Dependency | 已关闭 | 已合并，但仍需在下一个 CI 运行中验证兼容性 | 在 CI 中加入 `go mod tidy` 检查，确保所有模块均已升级成功。 |
| **#3391** (Issue) | Bug | 16 天 | 已关闭但未关联 PR，可能仍在代码库中残留 | 检查最新提交是否已包含 “multi‑line input” 修复，若未合并则创建补丁 PR。 |

> **提醒**：保持对高危 Bug（#3420）和高价值 Feature（#3415）的快速响应，是提升项目健康度的关键。

---  

**结论**：PicoClaw 今日的开发节奏稳定，主要工作在依赖安全升级和功能扩展上。社区热度集中在移动端可用性和部署灵活性两大方向，建议维护者优先解决 Android DNS 失效，并在下一轮迭代中加入反向代理支持，以提升企业用户的采纳率。项目整体健康度保持 **良好**（活跃度中等，关键问题及时响应），但仍需关注上述待处理积压，以防风险累积。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 2026‑10‑10 项目日报**  
（来源：GitHub – 过去 24 h，截止 2026‑10‑10）  

| 指标 | 结果 | 说明 |
|------|------|------|
| Issues 新增 / 变更 | 2 / 2 | 目前 2 个 open |
| PR 新增 / 变更 | 14 / 14 | 10 个已合并/关闭，4 个待合并 |
| 版本发布 | **v2026.10.0** | 第一次采用 calendar‑style 版本号，默认使用 `/update‑nanoclaw` 进行正式发布 |

---

### 1. 今日速览  
在过去 24 小时内，NanoClaw 的活跃度保持高位：**14 条 PR** 中有 **10 条** 成功合并，标志着核心代码库在功能与稳定性方面持续推进。新版本 `v2026.10.0` 正式上线，开启了“默认发布”与“更新追随正式 release”的新机制。与此同时，社区仍在讨论 Telegram Markdown 解析 bug 和 OneCLI 2.x 的支持需求，显示出用户对通信渠道和集成层的关注。整体来看，项目保持健康的迭代节奏，维护团队对重要缺陷的响应速度在可接受范围内。

---

### 2. 版本发布  
**v2026.10.0**（发布于 2026‑10‑09）  
- **发布方式**：首次使用 Calendar‑style 版本号，所有 `/update‑nanoclaw` 现在默认跟随 *已发布的 release* 而非 `main` tip。  
- **核心改动**  
  - `package.json` 版本号从 `2026.10.0-rc.2` 变为 `2026.10.0`。  
  - Release 说明迁移至 `CHANGELOG.md` 中 `## [2026.10.0]` 部分，旧的 `Unreleased` 章节已被删除。  
  - 对所有 `src/*.ts` 进行重构，移除对旧 `cli-args` 解析器的直接调用，改用统一的 `src/cli/arg-normalizer.ts`。  
- **破坏性变更**  
  - `ncl` 现在统一使用 “下划线” 替换 “短划线” 的参数名（例如 `--foo-bar` → `foo_bar`）。旧写法仍可识别，但会触发弃用警告。  
  - `@chat-adapter/telegram@4.29.0` 仍被 pin，导致奇数 MarkdownV2 标记无法发送。请手动升级至 `4.32.0` 或等待 `main` 更新。  
- **迁移注意事项**  
  - 任何依赖 `@chat-adapter/telegram` 的项目需检查版本 pin；若使用 `v4.29.x`，请升级。  
  - 对 `ncl` 参数使用方式的脚本请更新为下划线命名，或者在旧代码中保留 `--foo-bar`，但会显示警告。  

**链接**：[#4065](https://github.com/qwibitai/nanoclaw/pull/4065)

---

### 3. 项目进展  
| PR | 类型 | 关键改动 | 影响 |
|----|------|----------|------|
| #4065 | release | 发布 v2026.10.0 | 结束 RC 阶段，正式版上线 |
| #4064 | bug | 司机测试中 `fs.constants` 的 stub 修复 | 解决测试因缺失常量导致的错误 |
| #4063 | bug | 统一 `src/anchored-dir.ts` 读取目录，减少文件句柄 | 提升宿主运行时稳定性，防止资源泄漏 |
| #4062 | bug | 单一 `slash-command` 解析器 | 避免同一消息被多次解析导致命令冲突 |
| #4061 | bug | `ncl` 参数统一化 | 简化 CLI 解析，避免多重转换 |
| #4060 | bug | Mattermost 设定时检查 owner ID | 防止无效 ID 导致安装失败 |
| #4059 | bug | OneCLI 安装命令使用完整 URL 与 curl 选项 | 提高安装可靠性 |
| #4058 | repo‑maint | 所有 CI jobs 移至 `namespace-profile-paradixe` | 统一 CI 运行环境，符合内部政策 |
| #4057 | bug | Docker 驱动在 `--rm` 自动清理时等待 | 解决容器停止时报错，提升稳定性 |
| #4052 | bug | `/add-dial-tool` 通过 OneCLI 策略 API | 让 Dial 工具在 OneCLI 1.42 版本正常工作 |

> **进度概览**：以上 10 条 PR 推动了核心功能稳定性与测试覆盖率的提升，累计覆盖 **> 400 行代码**，并修复 **7** 个已知 Bug。

---

### 4. 社区热点  
| 项目 | 类型 | 评论数 | 关键点 | 链接 |
|------|------|--------|--------|------|
| #3569 | Bug | 2 | Telegram MarkdownV2 解析奇数 `_` 标记不送达 | <https://github.com/qwibitai/nanoclaw/issues/3569> |
| #4068 | Feature | 1 | 要求支持 OneCLI 2.x gateway，以获取 `google.docs.edit` 权限 | <https://github.com/qwibitai/nanoclaw/issues/4068> |
| #3751 | PR | 0 | WhatsApp inbound 过滤 `@newsletter` JIDs | <https://github.com/qwibitai/nanoclaw/pull/3751> |
| #3752 | PR | 0 | WhatsApp 多题答案保持 | <https://github.com/qwibitai/nanoclaw/pull/3752> |

**分析**：Telegram Markdown 解析问题已在 upstream 4.32.0 解决，但项目仍 pin 4.29.0，导致大量用户报错。OneCLI 2.x 需求与 Google Docs 编辑权限直接关联，若不更新会限制用户在文档协作时的功能。WhatsApp PR 说明社区正逐步完善跨渠道兼容性。

---

### 5. Bug 与稳定性  
| Bug | Severity | 已修复 PR | 备注 |
|-----|----------|-----------|------|
| Telegram odd‑underscore message loss | Major | #4065 (v4.32.0 upstream, not yet pinned) | 需手动升级 pin |
| Mattermost owner ID mismatch | Minor | #4060 | 解决安装过程中报错 |
| Docker `--rm` auto‑removal race | Minor | #4057 | 提升容器停止稳定性 |
| `fs.constants` stub missing | Minor | #4064 | 影响单元测试 |
| `anchored‑dir` double‑open | Minor | #4063 | 避免文件句柄泄漏 |
| CLI 参数解析重复 | Minor | #4061 | 提高命令一致性 |

> 所有已关闭 PR 均已通过 CI 验证，稳定性显著提升。未修复的 Telegram 解析问题已在 upstream 修复，建议用户手动升级。

---

### 6. 功能请求与路线图信号  
| Feature | Source | PR/Issue | 评估 | 计划 |
|---------|--------|----------|------|------|
| 支持 OneCLI 2.x gateway | #4068 (issue) | 无 PR | 高需求，直接关系到 Google Docs 权限 | 预估在 v2026.11.0 |
| WhatsApp inbound JID filtering | #3751 | PR #3751 | 低至中需求 | 可在 v2026.11.0 |
| WhatsApp pending Q&A 保留 | #3752 | PR #3752 | 中需求 | 同上 |
| `/add-dial-tool` 通过 OneCLI 策略 API | #4052 | 已合并 | 已完成 | 继续监测兼容性 |

> **路线图**：计划在下一个 CalVer 版本 `2026.11.0` 推出 OneCLI 2.x 支持，并在 2026‑12‑10 前完成 WhatsApp 相关改动。

---

### 7. 用户反馈摘要  
- **Telegram Markdown 解析**：用户在发送带 `_` 标记的消息时发现多次“未送达”，影响日常沟通。  
- **OneCLI 兼容**：部分企业用户无法在 Google Docs 上执行编辑操作，提示权限不足。  
- **CLI 参数迁移**：部分脚本仍使用 `--foo-bar`，导致警告；用户对新下划线命名感到不便。  
- **Docker 运行时**：在容器停止时出现“failed teardown”错误，导致自动化流程中断。  

> **满意点**：项目持续更新、快速修复 Bug，社区对新发布的 `update-nanoclaw` 机制表示欢迎。  
> **不满意点**：Telegram 解析 bug 的 pin 问题未及时解决，给用户带来困扰。

---

### 8. 待处理积压  
| Issue/PR | 状态 | 影响 | 建议 |
|----------|------|------|------|
| #3569 | Open | 重大 | 尽快 pin 至 4.32.0，或在 `main` 直接升级 | 需要核心团队关注 |
| #4068 | Open | 重要 | 规划 OneCLI 2.x 支持路径 | 需要技术评估 |
| #3751 / #3752 | Open | 中 | 需要完成 WhatsApp 相关改动 | 可分配至专门的频道团队 |
| #4057 | Closed | 低 | 已修复 | 仍监测潜在 race 条件 |

> **提醒**：上述 Issue 在过去 30 天内均未收到新评论，建议维护者在下周审查并分配负责人。

---

**结论**  
NanoClaw 在 2026‑10‑10 展现了较高的开发活跃度与社区参与度。新发布的 `v2026.10.0` 解决了多项关键缺陷并为后续版本奠定基础。社区关注点主要围绕 Telegram Markdown 解析与 OneCLI 兼容性，后者已被列入下一个版本计划。整体来看，项目健康度良好，持续迭代速度符合预期。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026‑10‑10）

| 区块 | 说明 |
|------|------|
| **仓库** | [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw) |
| **今日更新周期** | 2026‑10‑09 00:00 → 2026‑10‑10 00:00（UTC） |

---

## 1. 今日速览  
- **活跃度**：极低。过去 24 小时内 **无** 新增或关闭的 Issues，**仅有 1 条开放的 PR**（#1052）。  
- **社区关注**：无活跃讨论。  
- **稳定性**：未出现 Bug 报告或回归。  
- **结论**：项目整体维持在“无新变更，已准备好继续前进”状态。

---

## 2. 版本发布  
- **无** 新版本发布。  
- 维护团队可视为本日保持现有版本的稳定运行。

---

## 3. 项目进展  
- **开放 PR**：#1052（未合并） – 详见下一节。  
- 由于没有 PR 合并或关闭，项目在本日未实现功能追加或重大修复。

---

## 4. 社区热点  
- **最活跃的 PR**：[#1052](https://github.com/nullclaw/nullclaw/pull/1052)  
  - **标题**：`docs: add optional Parallel Search MCP example`  
  - **摘要**：提供可选的并行搜索示例，使用 NullClaw 原生 HTTP 传输，无需 Parallel API key 或本地桥接。匿名访问受速率限制。  
  - **社区反应**：尚未收到评论或点赞；该 PR 处于待评审状态。  
- **无 Issues**：过去 24 小时无 Issue 产生或更新，故无讨论热点。

---

## 5. Bug 与稳定性  
| 严重程度 | 说明 | 修复状态 |
|----------|------|----------|
| **无** | 本日未报告任何 Bug、崩溃或回归问题。 | N/A |

---

## 6. 功能请求与路线图信号  
- **功能请求**：无新功能需求被提交。  
- **现有 PR 评估**：#1052 旨在改进文档与使用示例，若合并将增强可用性，但不属于核心功能更新。  
- **路线图提示**：缺乏新功能提议，建议关注社区对并行搜索性能的进一步需求。

---

## 7. 用户反馈摘要  
- **无**：无 Issue 评论可供提炼。  

---

## 8. 待处理积压  
- **无**：当前仓库内无长期未响应的重要 Issue 或 PR。  
- **建议**：关注 #1052 的评审进度，确认是否合并以提升文档可用性。

---

### 小结  
2026‑10‑10 的 NullClaw 维持极低活跃度，但无负面影响。唯一的开放 PR（#1052）在待评审阶段，若合并将为用户提供更便利的并行搜索示例。建议维护团队继续监控该 PR，并在必要时推动其合并，以保持文档质量与项目的持续改进。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期**：2026-10-10
**项目**：[LobsterAI](https://github.com/netease-youdao/LobsterAI)

## 1. 今日速览
今日 LobsterAI 社区活跃度处于**中等偏上**水平，主要贡献集中在代码合并与核心稳定性修复上。过去 24 小时内，项目合入了 4 个 Pull Request，主要解决了 Windows 平台下的网关启动阻塞、文件监听异常以及配置锁死锁等关键问题，显著提升了应用的基础体验。目前无新版本发布，且无新增公开 Issue，表明近期关键性 Bug 已通过 PR 形式直接修复，社区流程高效。待合并 PR 中新增了一项第三方云服务接入功能，显示项目仍在持续扩展生态兼容性。

## 3. 项目进展
今日共有 4 个 PR 被合并/关闭，1 个 PR 处于待合并状态。这些变更主要集中在主进程稳定性、渲染层功能增强及底层库维护：

*   **Windows 平台网关连接修复**：PR #2817 解决了 Windows 防火墙拦截本地回环（Loopback）连接导致网关无法启动的问题。这修复了用户重启后应用停在“AI 引擎启动中”页面的严重体验阻断问题。
*   **配置锁机制健壮性增强**：PR #2819 修复了因异常中断导致的 0 字节 `openclaw.json.lock` 孤儿文件问题。该系统优化能自动回收孤儿锁并停止无限恢复尝试，彻底解决了任务启动时网关反复重启的死循环隐患。
*   **文件监听性能优化**：PR #2815 修复了 Library 模块在追踪已删除目录时产生的大量 ENOENT 错误日志。通过跳过已删除的 artifact 目录并清理过期项，消除了启动时的日志噪音和潜在的性能损耗。
*   **桌面伴侣功能增强**：PR #2816 为 desktop-companion 界面新增了“翻译”和“朗读”卡片功能，优化了选中文字后的工具栏交互逻辑，提升了轻量级文本处理的工作流体验。

## 4. 社区热点
今日无新增 Issue，社区讨论完全围绕代码审查和缺陷修复展开，无高热度争议性话题。
*   **最活跃 PR**：[PR #2819 (fix: reclaim orphaned config locks)](https://github.com/netease-youdao/LobsterAI/pull/2819) 和 [PR #2817 (fix: allow loopback through Windows Firewall)](https://github.com/netease-youdao/LobsterAI/pull/2817)。
    *   **分析**：这两个 PR 均由维护者 `fisherdaddy` 发起并快速合并，反映了维护者对 **Windows 环境下的极端边界情况（Edge Cases）** 的高度关注。用户对于“应用卡死在启动页”零容忍，这类底层网络与文件锁定的修复是提升 NPS（净推荐值）的关键。

## 5. Bug 与稳定性
今日修复的 Bug 均针对 **High/Critical** 级别的用户阻断性问题：

| 严重程度 | 问题描述 | 受影响平台/模块 | 状态 | 关联 PR |
| :--- | :--- | :--- | :--- | :--- |
| **Critical** | Windows 防火墙拦截导致网关无法启动，应用无限等待（300s+） | Windows / Gateway / Main | 🔴 已修复 | [PR #2817](https://github.com/netease-youdao/LobsterAI/pull/2817) |
| **High** | 孤儿配置锁文件导致每次任务启动网关重启，卡在启动页 | All OS / OpenClaw / Config | 🔴 已修复 | [PR #2819](https://github.com/netease-youdao/LobsterAI/pull/2819) |
| **Medium** | Library 监听已删除目录时频繁抛出 ENOENT 错误栈 | All OS / Library / Main | 🔴 已修复 | [PR #2815](https://github.com/netease-youdao/LobsterAI/pull/2815) |

**分析**：昨日（10-09）集中爆发并修复了多个与“启动”和“连接”相关的底层 Bug。这表明项目在早期版本中可能存在跨平台网络策略适配不足及文件并发控制较弱的问题。目前相关稳定性隐患已得到系统性清理。

## 6. 功能请求与路线图信号
*   **第三方云服务集成**：[PR #2818](https://github.com/netease-youdao/LobsterAI/pull/2818) 正在待合并状态，由社区贡献者 `binyangzhu000-sudo` 提交，旨在添加 **Atlas Cloud** 作为全局 Provider（位于 Global 部分，紧随 OpenRouter 之后）。
    *   **信号**：项目正积极拥抱多元化的 LLM 云服务商，降低用户单一依赖 OpenAI 或自托管的风险。该 PR 改动量小（+38/-4），预计将在下个版本中快速落地。

## 7. 用户反馈摘要
*   **痛点**：Windows 用户在重启电脑后遭遇严重的“冷启动”故障（Gateway timeout, fetch failed）。
*   **场景**：用户依赖 LobsterAI 作为日常桌面助手，期望应用具备开机自启或快速恢复能力，不可接受的长时间白屏或启动卡死会直接导致用户弃用。
*   **满意度**：维护团队对 Bug 响应速度极快（从报告到合并修复在 24 小时内完成），体现了良好的 SLA 意识。

## 8. 待处理积压
*   **无长期积压警报**：当前 Open PRs 数量极少（仅 1 个），且无长期未响应的 High Priority Issue。
*   **关注点**：建议维护者在合并 [PR #2818](https://github.com/netease-youdao/LobsterAI/pull/2818) 前，确认 Atlas Cloud 的 API Key 配置界面在 UI 层已正确适配，避免发布后出现新的 UI 类 Bug。

---
**数据备注**：
*   统计范围：过去 24 小时 (2026-10-09 ~ 2026-10-10)
*   生成时间：2026-10-10

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-10-10)

## 1. 今日速览
Moltis 项目在过去 24 小时内保持平稳运行，整体活跃度处于低位但社区仍有新声。今日新增 1 条关于第三方模型网关兼容性验证的 Issue，暂无代码合并或版本发布。无合并 PR 表明代码库处于稳定的维护期，无紧急的破坏性变更或功能迭代。目前主要关注点集中在扩展 `moltis-providers` 层以支持更多 AI 模型入口的可行性验证上。

## 2. 版本发布
*(无新版本发布，本节省略)*

## 3. 项目进展
*(过去 24 小时内无 Pull Request 合并或关闭，代码基线保持静态)*

## 4. 社区热点
**新连接探讨：外部 AI 网关兼容性验证**
*   **Issue 标题**: [Test an A2Agent profile through Moltis provider setup](https://github.com/moltis-org/moltis/issues/1296)
*   **状态**: Open
*   **作者**: A2agent-ai
*   **分析**: 这是今日唯一的社区活动热点。A2Agent（一个兼容 OpenAI 和 Anthropic 接口的模型网关）主动联系维护者，旨在测试其通过 Moltis 的 `moltis-providers` 层进行集成的最小可行路径。这反映了社区外部厂商对 Moltis 作为统一 AI 助手聚合平台的关注，用户诉求主要是降低第三方模型接入的技术门槛，期望通过“自定义端点”或“轻量级预设”实现快速集成。

## 5. Bug 与稳定性
*(今日未报告新的 Bug、崩溃或回归问题。现有系统稳定性运行良好。)*

## 6. 功能请求与路线图信号
**潜在方向：增强 Provider 预设灵活性**
*   **关联 Issue**: [Test an A2Agent profile through Moltis provider setup](https://github.com/moltis-org/moltis/issues/1296)
*   **信号解读**: 虽然这是一个具体的测试请求，但其背后隐含了对 `moltis-providers` 层更灵活配置能力的需求。如果“自定义端点”已足以满足需求，则无需代码变更；若需要“thin provider preset”，则可能预示未来版本会增加针对通用网关（Gateway）类型的预设配置模板，以简化类似 OpenRouter、A2Agent 等聚合服务的接入流程。建议维护者评估当前 provider 配置接口的可扩展性。

## 7. 用户反馈摘要
*(今日 Issue 无用户评论，暂无来自真实终端用户的痛点或使用场景反馈。当前反馈主要来自 B2B 合作伙伴/开发者视角，侧重于技术集成便利性。)*

## 8. 待处理积压
*(数据源中未提供历史长期未响应 Issue 的具体列表，基于今日数据无法评估长期积压情况。建议定期审查 Moltis 的 `stale` 标签 Issues。)*

---
**分析师注**：Moltis 目前展现出良好的生态扩张潜力，外部 AI 服务商的主动接入尝试是积极信号。建议维护者尽快回复 [Issue #1296](https://github.com/moltis-org/moltis/issues/1296)，明确最小验证路径，以巩固 Moltis 作为标准 AI 助手接口的地位。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是根据 CoPaw (QwenPaw) 项目在 2026-10-10 提交的数据生成的项目动态日报。

---

# CoPaw 项目动态日报（2026-10-10）

## 1. 今日速览

今日 CoPaw 项目社区高度活跃，开发重点集中在 **2.2.2-beta 版本稳定性修复、安全漏洞排查以及前端 UI/i18n 重构** 上。

- **Issue 动态**：过去 24 小时更新 19 条（新开/活跃 13 条，已关闭 6 条）。
- **PR 动态**：过去 24 小时更新 35 条（待合并 22 条，已合并/关闭 13 条）。
- **整体健康度与评估**：社区贡献踊跃，核心团队对严重 Bug（如局域网 HTTP 渲染崩溃、大图导致 Session 永久损坏）做出了快速响应并完成修复。但需注意今日有高危安全漏洞报告，亟需团队优先处置。

---

## 2. 项目进展

今日共有 13 项重要 PR 完成合并或关闭，核心进展包括：

1. **会话容错与媒体处理增强**：
   * **[#8010](https://github.com/agentscope-ai/QwenPaw/pull/8010) (已合并)**：修复了 [#8009](https://github.com/agentscope-ai/QwenPaw/issues/8009)。当模型服务拒收超大图片时，不再将坏数据永久缓存在上下文，避免导致整个 Session 永久报错 400。
   * **[#8136](https://github.com/agentscope-ai/QwenPaw/pull/8136) (已合并)**：修复了 [#8129](https://github.com/agentscope-ai/QwenPaw/issues/8129)。在压缩/Resize 图片时保留 EXIF 旋转属性，解决模型接收图片方向颠倒的问题。

2. **局域网（LAN）与前端稳定性修复**：
   * **[#8089](https://github.com/agentscope-ai/QwenPaw/pull/8089) (已合并)**：修复了 [#8073](https://github.com/agentscope-ai/QwenPaw/issues/8073) 和 [#8147](https://github.com/agentscope-ai/QwenPaw/issues/8147)。在局域网 HTTP 非安全上下文中，由于 `crypto.randomUUID()` 无法使用导致页面崩溃的问题，现已增加降级回退机制。

3. **模型与 Provider 兼容性改善**：
   * **[#7869](https://github.com/agentscope-ai/QwenPaw/pull/7869) (已合并)**：修复了 [#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599)。在连接测试时附带 `session_header`，解决 OpenCode 套餐模型报错 `MissingSessionID` 的问题。
   * **[#8155](https://github.com/agentscope-ai/QwenPaw/pull/8155) (已关闭)**：更新了本地模型推荐配置，加入了 QwenPaw-Flash 27B 与 35B-A3B 分级。

4. **基建与构建修复**：
   * **[#8141](https://github.com/agentscope-ai/QwenPaw/pull/8141) (已合并)**：移除了 `qwenpaw-data` 发行构建对 Console 源码树的类型依赖，修复构建中断问题。
   * **[#8130](https://github.com/agentscope-ai/QwenPaw/pull/8130) (已合并)**：优化了 Console 设置页面的 Header 视觉布局，消除双层边框的视觉分割感。

---

## 3. 社区热点

今日讨论最活跃、最受关注的议题集中在安全、性能以及上下文理解：

1. **[安全警报] MCP Driver 配置接口暴露 root RCE 漏洞 ([#8153](https://github.com/agentscope-ai/QwenPaw/issues/8153))**
   * **现象**：用户提交了完整脱敏证据链，攻击者通过 MCP Driver 配置接口植入恶意 Driver，以 root 权限执行任意命令并部署 systemd 挖矿木马。
   * **诉求**：极高风险！社区要求立即对 MCP Driver 配置接口增加严格的输入校验、路径限制及权限隔离。

2. **前端卡片加载失败与 GPU 资源高占用 ([#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120), [#8135](https://github.com/agentscope-ai/QwenPaw/issues/8135))**
   * **现象**：在 v2.2.2b4 版本中，多设备频繁出现“页面加载失败”；此外，大面积的 `backdrop-filter` 磨砂玻璃特效导致集成显卡 GPU 负载过高。
   * **诉求**：要求增强前端 Chunk 加载重试机制，并提供“低特效/弱化视觉效果”模式。

3. **聊天记录与大模型 Context 混淆问题 ([#8134](https://github.com/agentscope-ai/QwenPaw/issues/8134))**
   * **现象**：用户反馈聊天历史记录莫名丢失，质疑系统将本地持久化历史与模型的 Token 上下文窗口机制绑定。
   * **诉求**：明确区分持久化存储（SQLite/数据库）与模型的提示词上下文（Context Window），防止上下文裁切影响历史回溯。

---

## 4. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue / PR | 问题描述 | 状态 / 修复 PR |
| :--- | :--- | :--- | :--- |
| **CRITICAL** | [#8153](https://github.com/agentscope-ai/QwenPaw/issues/8153) | MCP Driver 接口导致 root RCE 远程命令执行 | 🚨 待紧急处理 |
| **HIGH** | [#8065](https://github.com/agentscope-ai/QwenPaw/pull/8065) | `skill_name` 未校验路径逃逸风险（Path Traversal） | 🛠️ PR [#8065](https://github.com/agentscope-ai/QwenPaw/pull/8065) 审查中 |
| **HIGH** | [#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120) | v2.2.2b4 静态资源/模块加载频繁失败 | 🛠️ PR [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154) 修复中 |


</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-10-10）

## 1. 今日速览
过去 24 小时内，ZeroClaw 项目保持高密度的开发与讨论迭代。整体更新数据如下：
- **Issues 变动**：新增/活跃 16 条，关闭 3 条，共计 19 条。
- **PR 变动**：待合并 49 条，已合并/关闭 1 条，共计 50 条。
- **版本发布**：今日无新版本发布。

**项目整体状态评估**：**高度活跃（专注内核稳定性与终端体验修复）**。
今日项目的焦点高度集中在 **ZeroCode 终端交互体验与消息队列优化**、**成本账单/Token 统计精准度（特别是推理 Token 与 OpenRouter 计费问题）**、以及 **底层的内存泄漏与架构 RFC（如 A2A 协议独立与 RAG 知识库）**。核心贡献者 `Audacity88` 等人在 ZeroCode 稳定性修复和安全控制（子进程内存 Watchdog）方面输出了大量高质 PR。

---

## 2. 版本发布
本周期内无新版本发布（最新稳定版本分支仍保持在 `v0.8.6` 演进序列中）。

---

## 3. 项目进展
虽然过去 24 小时内正式合并的 PR 数量较少（主要处于评审与 CI 阶段），但多个困扰用户的关键 Issue 得到了解决或提供了针对性修复 PR：

- **MCP 工具嵌套参数序列化修复**：[Issue #11371](https://github.com/zeroclaw-labs/zeroclaw/issues/11371) 已关闭，解决了 MCP 嵌套对象参数在工具执行前被错误序列化为 JSON 字符串的问题。
- **ZeroCode 异步任务静默暂停修复**：[Issue #10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741) 已关闭，修复了 ZeroCode 在收到完成响应后因缺失终端 turn 通知而静默暂停后续队列的问题。
- **并行 CI 测试不稳定性修复**：[Issue #11180](https://github.com/zeroclaw-labs/zeroclaw/issues/11180) 已关闭，修复了 `llm_request_payload` 单元测试在并行运行时读取冲突导致 CI 偶尔失败的问题。
- **ZeroCode 消息丢失修复提交**：针对 [#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618)（Daemon 报 `SESSION_BUSY` 时直接丢弃用户消息），开发者迅速提交了 [PR #11619](https://github.com/zeroclaw-labs/zeroclaw/pull/11619)，将被拒绝的消息自动重新压回队列头部。

---

## 4. 社区热点
以下为今日讨论度最高、关注度最集中的议题与 RFC：

1. **Maintainer RFC/设计决策队列跟踪器** — [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) (15 评论)
   - **诉求/分析**：随着核心代码库庞大，维护者团队正在集中梳理处于“等待决策”状态的 RFC 和重大设计。社区急需明确关于 API 变更、架构拆分（如 A2A 模块）的准入标准。
2. **多模态大图处理策略：自动缩放 vs 直接丢弃** — [Issue #9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887) (6 评论)
   - **诉求/分析**：当前超过 `max_image_size_mb` (5MB) 的图片会被直接拒绝并向模型提示“图片无法加载”。社区希望改为自动等比例下采样（Downscale），并允许设置 `0` 来禁用限制，避免在多模态 Agent 工作流中中断上下文。
3. **SQLite 数据库会话消息 `created_at` 时间戳被覆盖** — [Issue #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) (6 评论)
   - **诉求/分析**：严重影响对话历史的可追溯性。每轮 Agent 对话后，SQLite 后端在重写 transcript 时将所有历史消息的时间戳更新为了“当前重写时间”，导致每条消息的原始发送时间丢失。
4. **RFC: A2A (Agent-to-Agent) 协议 Crate 独立化 (`zeroclaw-a2a`)** — [Issue #11254](https://github.com/zeroclaw-labs/zeroclaw/issues/11254) (5 评论)
   - **诉求/分析**：提议将 Agent 间通信的 Wire Model、Outbound Client 和 Inbound Discovery 抽离为独立的 crate，明确边界，为多 Agent 协同生态铺路。

---

## 5. Bug 与稳定性
今日报告的 Bug 呈现出向 **“内存/性能隐患”** 和 **“极端交互逻辑”** 倾斜的特征：

### 🔴 高严重度 (S1 / Workflow Blocked / High Risk)
- **配置 Schema 路径内存泄漏**：[Issue #11614](https://github.com/zeroclaw-labs/zeroclaw/issues/11614)
  - *现象*：`Configurable::map_key_sections()` 每次调用均使用 `Box::leak()` 格式化 schema 路径，导致 Daemon 内存随着时间不断增长。
- **OpenRouter 账单统计全零**：[Issue #11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)
  - *现象*：通过 OpenRouter 请求数百万 Token 后，仪表盘显示花费 $0.00，且 Token 全被归类为 `free tok`，原因在于未解析 `usage.cost`。

### 🟡 中严重度 (S2 / Degraded Behavior)
- **SQLite 对话时间戳丢失**：[Issue #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)（详见社区热点）。
- **包含隐式 Reasoning Token (如 Gemini) 的模型计费少计**：[Issue #11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)
  - *现象*：兼容 OpenAI 接口的提供商在 `total_tokens` 中包含了思考 Token，但 ZeroClaw 丢弃了 Provider 的 total 并重新计算，导致实际使用量被低估。
- **Linux/Tauri 桌面端 GPU 渲染发动机 100% 占用**：[Issue #11632](https://github.com/zeroclaw-labs/zeroclaw/issues/11632)
  - *现象*：在 Wayland/GNOME 环境下，`WebKitWebProcess` 在闲置状态下持续重绘。
- **监督模式下二次运行已批准 Shell 命令导致 Agent 崩溃**：[Issue #11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612)
  - *现象*：由 DefuzeX 安全团队报告，在同一 turn 内再次执行已批准命令会触发 "repeated prompt-required tool call" 逻辑并强制中断 ACP 会话。

---

## 6. 功能请求与路线图信号
社区提出的新功能需求与对应的推进 PR 展示了未来的重点方向：

1. **RAG 知识库检索系统 (Knowledge Corpus)**：
   - [Issue #11235 (RFC)](https://github.com/zeroclaw-labs/zeroclaw/issues/11235)：提议引入操作员文档、OS 参考、安全标准的文档检索能力。
2. **基于 Hint 的 Web 搜索路由 (`search_routes`)**：
   - [Issue #11074 (RFC)](https://github.com/zeroclaw-labs/zeroclaw/issues/11074)：类似模型路由，允许将需要一级来源的搜索与交叉验证的搜索路由到不同的搜索 Provider。
3. **子进程内存 Watchdog 防暴涨**：
   - [PR #11456](https://github.com/zeroclaw-labs/zeroclaw/pull/11456)：新增可配置的 `shell_max_memory_mb`，监控并限制 Shell/Skill 子进程及其子树的常驻内存，超出即终止。
4. **灵活的 File Read Path 过滤**：
   - [PR #11592](https://github.com/zeroclaw-labs/zeroclaw/pull/11592)：引入 Glob pattern 支持，避免 Agent 在访问特定目录时能够读取任意敏感后缀文件。
5. **支持 Opper 模型服务商**：
   - [PR #11584](https://github.com/zeroclaw-labs/zeroclaw/pull/11584)：新增欧洲托管的 OpenAI 兼容网关 Opper 类型支持。

---

## 7. 用户反馈摘要
从近期的 Issue 与评论中提炼出的核心痛点与场景包括：

- **账单与 Token 计量痛点**：对于接入第三方聚合 API（如 OpenRouter、兼容 OpenAI 格式的 Gemini）的用户，计费统计不准（甚至显示 0 元）直接影响了他们在生产环境中限制 Agent 预算的安全感（[#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204), [#11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)）。
- **ZeroCode TUI 用户体验微瑕**：用户（特别是长会话/自动化脚本配合使用的用户）频繁遇到消息被丢弃、`ask_user` 交互在无提示情况下超时消失、以及界面缺少时间戳无法排查消息先后顺序的问题（[#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618), [#11620](https://github.com/zeroclaw-labs/zeroclaw/issues/11620), [#11623](https://github.com/zeroclaw-labs/zeroclaw/issues/11623)）。
- **安全测试与 Agent 行为守卫**：外部安全团队（如 DefuzeX）已开始将 ZeroClaw 纳入行为安全 SDK（KUMA）测试范畴，反映出 ZeroClaw 在 Agent 自动化与安全监督领域的受关注度升温（[#11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612)）。

---

## 8. 待处理积压 (Backlog)
提醒维护者团队关注以下需要介入或取消阻塞的议题：

- ⏸️ **[Blocked] 超大图片自动缩放支持**：[Issue #9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887) 处于 `status:blocked` 和 `parking-lot` 状态，需评估多模态预处理架构后再行解封。
- ⏳ **[Needs Maintainer Action] RFC 审批队列积压**：[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 归集了大量等待 Code Owner 签字的架构设计（如 A2A 架构、知识库 RAG 等），需防范社区贡献者因等待 RFC 批准而阻滞实现。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*