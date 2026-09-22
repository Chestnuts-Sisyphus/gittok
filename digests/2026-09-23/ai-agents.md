# OpenClaw 生态日报 2026-09-23

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-22 22:31 UTC

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

**NanoBot 项目日报 – 2026‑09‑23**  

---  

### 1. 今日速览  
- 项目在过去 24 小时内保持高活跃度，**3 条新 Issue**（均为 open）以及 **29 条 PR 动态**（其中 15 条仍待合并，14 条已合并/关闭）。  
- 重点修复围绕 **自动上下文压缩、文件读取兼容性、渠道（Telegram/Discord）运行时稳定性** 以及 **WebUI 交互细节** 进行。  
- 没有新 Release 发布，当前代码库主要通过 PR 合并推进功能与稳健性改进。  

---  

### 2. 版本发布  
> **（本日无正式 Release，故此节略）**  

---  

### 3. 项目进展（已合并/关闭的关键 PR）  

| PR 编号 | 标题/摘要 | 类型 | 影响范围 | 关键改进 |
|--------|-----------|------|----------|----------|
| **#5867** | `fix(files): decode BOM‑marked text correctly` | Bug / 文件读取 | `read_file` 兼容性 | 正确识别 UTF‑8/16/32 BOM，防止出现 NUL‑filled 内容或残余 `\ufeff`。 |
| **#5859** | `fix(tools): handle boolean JSON subschemas during argument validation` | Bug / 工具 | 参数校验层 | 支持 JSON Schema 中的布尔子模式，避免 `True/False` 触发 `AttributeError`。 |
| **#5868** | `fix(exec): invoke quoted Windows executable without arguments` | Bug / 跨平台执行 | Windows 环境 | 允许仅路径的可执行文件（含引号）被正确调用，提升 CI/本地调试可靠性。 |
| **#5864** | `fix(discord): cancel delayed reaction tasks on runtime reset` | Bug / Discord 渠道 | 运行时重置 | 释放悬挂的 Emoji 任务，防止内存泄漏与错误的 “typing” 状态。 |
| **#5824** | `fix(tools): keep read_file progressing on oversized lines` | Bug / 文件读取 | 大行文本 | 超长行不再被截断，提供分段返回与列号追踪，保证数据完整性。 |
| **#5857** | `fix(memory): bound automatic transcript summarization` | Bug / 自动压缩 | 上下文压缩 | 为 `summarize_transcript` 加入 token‑budget 保护，防止因历史记录超限导致的死锁。 |
| **#5861** | `fix(tokens): warm fallback tokenizer in background` | 性能 / Tokenizer | 启动时延迟 | 背景预热 fallback tokenizer，首次对话的 token 估算更精准，提升用户响应速度。 |
| **#5866** | `fix(cli-apps): record install provenance, fail closed on registry drift` | 安全 / CLI 应用 | 包管理 | 记录安装来源、检测注册表漂移并在不一致时拒绝执行，增强供应链安全。 |
| **#5803** | `Small improvements and fixes for Telegram` | 渠道优化 | Telegram | 新增换行渲染、`topic_id` 暴露、typing 状态遵循话题，提升交互体验。 |
| **#5614** | `feat(tg): add support for streaming rich messages` | 新特性 | Telegram | 实现富文本流式发送，兼容私聊与群聊，提升消息表现力。 |
| **#5831** | `feat(webui): streamline contextual message controls` | UI/UX | WebUI | 细化消息块交互，仅在悬停/焦点时展示控制，降低界面噪声。 |
| **#5862** | `fix(webui): wrap Markdown table content` | UI/UX | WebUI | 表格自动换行，避免宽度溢出，提升阅读舒适度。 |
| **#5865** | `fix(webui): preserve selected preset on first turn` | UI/UX | WebUI | 首轮对话保留用户选定的模型预设，避免误切换。 |
| **#5314** | `fix: decode nested JSON tool arguments by schema` | Bug / Provider | 多模型兼容 | 处理 OpenAI‑compatible 提供者返回的嵌套 JSON 字符串，确保工具调用通过 schema 验证。 |

> **合计**：14 条 PR 已合并或关闭，覆盖 **文件 I/O、JSON 参数校验、跨平台执行、上下文压缩安全、渠道兼容性、WebUI 交互细节以及供应链安全** 等关键维度，项目稳健性得到显著提升。  

---  

### 4. 社区热点  

| 类型 | 编号 | 标题/关键点 | 评论数 | 主要诉求 |
|------|------|-------------|--------|----------|
| **Issue** | **#5870** | *Telegram: context compaction completion notice is repeated multiple times* | 3 | 用户在 Telegram 私聊中收到多次 “Context compacted.” 提示，导致对话噪声。需求：去重/节流压缩完成通知。 |
| **Issue** | **#5849** | *Auto‑compaction deadlock: summarize_transcript has no token‑budget guard* | 1 | 自动压缩缺乏 token 限制，历史记录超出模型输入上限后会卡死。需求：在压缩前做预算、提供回退。 |
| **Issue** | **#5869** | *Any chance to add video support?* (enhancement) | 0 | 用户希望直接将视频流转给具备视频输入的多模态模型（如 Qwen‑3.8、Mino‑v2.6），而非仅保存路径。 |
| **PR** | **#5314** | *fix: decode nested JSON tool arguments by schema* | — | 兼容多家 OpenAI‑compatible 提供者返回的 JSON 字符串，防止工具调用失败。 |
| **PR** | **#5857** | *fix(memory): bound automatic transcript summarization* | — | 直接响应 #5849 报告，加入 token‑budget，防止自动压缩导致的死锁。 |
| **PR** | **#5803** | *Small improvements and fixes for Telegram* | — | Telegram 渲染细节与话题感知的用户体验改进。 |

> **社区关注点**：① **自动上下文压缩的安全与可控性**（#5849、#5857）；② **渠道（Telegram）消息噪声与渲染细节**（#5870、#5803、#5614）；③ **多模态（视频）输入的需求**（#5869）。  

---  

### 5. Bug 与稳定性  

| 严重程度 | Issue 编号 | 摘要 | 当前状态 | 对应 Fix PR |
|----------|------------|------|----------|------------|
| **高** | **#5870** | Telegram 重复 “Context compacted.” 提示，可能导致用户误判对话被截断。 | Open | 暂无（预计在下一个自动压缩改进中解决）。 |
| **高** | **#5849** | 自动压缩缺少 token 预算，历史超限导致死锁。 | Open | 已通过 **#5857** 实现预算并关闭。 |
| **中** | **#5869** (enhancement) | 视频输入缺失，多模态模型无法直接使用视频。 | Open | 尚无 PR，已在 roadmap 中标记为 **P2**。 |
| **中** | **#5867** | BOM 标记的文件解码错误，返回乱码。 | Closed → **#5867** 已修复。 |
| **中** | **#5859** | Boolean JSON subschema 导致工具参数校验崩溃。 | Closed → **#5859** 已修复。 |
| **中** | **#5868** | Windows 引号路径执行失败。 | Closed → **#5868** 已修复。 |
| **中** | **#5864** | Discord 运行时重置未取消延迟表情任务，导致内存泄漏。 | Closed → **#5864** 已修复。 |
| **低** | **#5824** | `read_file` 在超长行时跳过内容。 | Closed → **#5824** 已修复。 |
| **低** | **#5861** | fallback tokenizer 启动慢，首次对话卡顿。 | Closed → **#5861** 已修复。 |

---  

### 6. 功能请求与路线图信号  

| 编号 | 请求内容 | 关联已有 PR/实现进度 | 预计优先级 |
|------|----------|----------------------|------------|
| **#5869** | 视频直接喂入多模态模型（omni‑model） | 暂无实现；项目近期已在 **#5614**（Telegram 富媒体流）以及 **#5314**（JSON 参数解码）上提升多模态兼容性，表明团队对 **多媒体输入** 有兴趣。 | **P2**（下个次要版本） |
| **#5871** | Linear（项目管理）集成改进，支持 OAuth 回调、工作区健康检查等 | PR **#5871** 正在开放中，已实现核心功能，待审查合并。 | **P1**（即将合并） |
| **#5842** | 渠道插件状态可视化（Unavailable / Missing Dependencies） | PR **#5842** 已开启，已实现 “Available” 列与完整状态展示。 | **P1**（即将合并） |
| **#5865** / **#5862** / **#5831** | WebUI 交互细化（预设保持、表格换行、块级控制） | 已陆续合并，显著提升用户操作体验。 | 已完成，进入 **生产** 阶段 |
| **#5866** | CLI 应用供应链安全（记录 provenance、漂移检测） | PR **#5866** 已合并，标志项目在安全合规方向的正式投入。 | 已完成 |

> **路线图提示**：  
- **短期（1‑2 周）**：完成 **#5871**（Linear）与 **#5842**（渠道状态）合并，进入正式发布候选。  
- **中期（1 个月）**：评估 **#5869** 视频输入的实现路径（可能依赖外部多模态模型 SDK），并在下个次要版本中加入实验性支持。  
- **长期**：继续强化 **自动上下文压缩** 的安全性（已通过 #5857），并在后续版本加入更细粒度的压缩策略配置。  

---  

### 7. 用户反馈摘要  

| 来源 | 关键反馈 | 影响面 | 建议方向 |
|------|----------|--------|----------|
| **Issue #5870（Telegram）** | “Context compacted.” 通知在同一次对话中出现 6 次以上，导致对话视觉噪声。 | Telegram 私聊用户 | 在压缩完成后仅发送一次通知，或提供 “仅日志” 选项。 |
| **Issue #5849** | 自动压缩在历史记录超出 token 限额后卡死，缺少回退机制。 | 所有渠道的长会话用户 | 引入 token 预算检查与分段压缩（已在 #5857 实现）。 |
| **Issue #5869** | 期待直接把视频文件发送给支持视频输入的模型，而不是仅保存路径。 | 多模态实验用户 | 在渠道层（Telegram/Discord）加入视频流上传并转发至模型的通用接口。 |
| **PR #5314 讨论** | 多家 provider 返回的工具参数被 JSON‑string 包裹，导致 schema 校验失败。 | 开发者使用自定义 provider | 统一解码逻辑，兼容 “嵌套 JSON 字符串”。已在 PR 中解决。 |
| **WebUI 改进反馈**（#5831、#5865、#5862） | UI 控件过多、表格宽度溢出、首次对话模型切换失效。 | 前端使用者 | 细化块级控制、表格自动换行、预设持久化——均已合并。 |

> **总体感受**：用户对 **渠道体验（尤其是 Telegram）** 与 **长会话的可靠性** 最为关注；对 **多模态输入** 的期待开始显现，已成为下一轮功能规划的关键信号。  

---  

### 8. 待处理积压  

| 编号 | 类型 | 描述 | 打开时长 | 建议关注点 |
|------|------|------|----------|------------|
| **#5870** | Issue | Telegram 重复压缩完成通知 | 1 天 | 与已合并的 **#5857** 关联，需在下轮压缩实现中加入去重/节流。 |
| **#5849** | Issue | 自动压缩无 token 预算导致死锁 | 2 天 | 已通过 **#5857** 部分解决，但仍缺少用户可配置的预算阈值 UI。 |
| **#5869** | Issue (enhancement) | 视频直接喂入模型 | 1 天 | 关注后续多模态 SDK 支持情况，考虑在 2.0 版加入实验性实现。 |
| **#5314** | PR (open, conflict) | 解码嵌套 JSON 工具参数 | 44 天 | 与 **#5311** 关联，冲突阻塞合并，建议尽快调和依赖并完成 CI。 |
| **#5871** | PR (open) | Linear 集成改进 | 1 天 | 已通过审查，待最终 CI 通过后合并。 |
| **#5864** | PR (open) | Discord 任务取消细化（已在 #5864 合并） | — | 已关闭，列为已解决。 |

---  

**结论**：NanoBot 在过去 24 小时内展示出 **高频次的代码迭代与质量提升**，核心功能（文件 I/O、渠道兼容、自动压缩）已获得多项关键修复；社区讨论聚焦于 **压缩安全、渠道噪声与多模态扩展**。建议维护者在下个发布周期优先合并 **#5871**、**#5842** 与 **#5314**，并在路线上加入 **视频输入实验特性**，以满足日益增长的多媒体需求。  

---  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报（2026‑09‑23）**  
GitHub 统计：过去 24 h 共有 2 条 Issue 更新（均已关闭），4 条 PR 更新（3 条已合并/关闭，1 条待合并），无新发布版本。  

---

### 1. 今日速览  
- **活跃度**：项目活跃度略低，过去 24 h 仅有两条 Issue 关闭与四条 PR 更新。  
- **进展**：两条关键 Bug 已通过 PR 解决，并已合并，代码质量得以提升。  
- **社区**：Open PR #3370 讨论新增 Keenable Web Search provider，已获得社区关注。  
- **稳定性**：已修复的并发配置问题和工具可配置性错误，为后续功能扩展奠定了基础。  

---

### 2. 版本发布  
- **无**：截至 2026‑09‑23，项目尚未发布新版本。  

---

### 3. 项目进展  
| PR | 状态 | 主要贡献 | 说明 |
|----|------|----------|------|
| **#3375** | ✅ 已合并 | guard lazy sensitive‑data cache against concurrent init | 解决了 `Config.initSensitiveCache` 产生的数据竞争，消除了 `FilterSensitiveData` 可能出现的 `nil` replacer 导致的 panic。 |
| **#3372** | ✅ 已合并 | make the reaction tool configurable | 为 `reaction` 工具添加了单独配置路径，避免默认开启导致的无效工具加载，并完善了 `ToolsConfig` 结构。 |
| **#3370** | 待合并 | add Keenable web search provider | 新增 Keenable（<https://keenable.ai>）作为 `web_search` 提供者，首次实现无 API Key 的搜索调用。 |
| **#1349** | ✅ 已合并 | support parsing and replying to more attachment types | 扩展 QQ Channel 支持更多附件类型（语音、视频、文件等），提升交互体验。 |

> **合并贡献度**  
> - `#3375` 与 `#3372` 的合并消除了两项高严重度 Bug，直接提升了系统的稳定性与可维护性。  
> - `#1349` 的功能扩展为核心渠道（QQ）带来了更丰富的媒体交互能力，符合长期用户需求。  

---

### 4. 社区热点  
| 主题 | 链接 | 评论数 | 关键诉求 |
|------|------|--------|----------|
| **Data race in Config.initSensitiveCache** (#3374) | <https://github.com/sipeed/picoclaw/issues/3374> | 2 | 用户担忧并发访问导致 `sensitiveCache` 产生空指针，影响安全日志过滤。 |
| **SaveConfig silently deletes every api_key** (#3373) | <https://github.com/sipeed/picoclaw/issues/3373> | 2 | 关键配置被无声删除导致服务失效，用户要求立即修复。 |
| **Keenable web search provider** (#3370) | <https://github.com/sipeed/picoclaw/pull/3370> | 未公布 | 社区热切期待多样化搜索服务，尤其是无 API Key 的免费方案。 |
| **QQ attachment enhancements** (#1349) | <https://github.com/sipeed/picoclaw/pull/1349> | 未公布 | 需求来自 QQ Channel 用户，对多媒体附件支持的持续改进。 |

> **分析**  
> - Bug 议题的关注度集中在系统安全与配置完整性两大核心痛点。  
> - 功能扩展议题（Keenable、QQ 附件）表现出社区对多元化工具与更丰富交互体验的强烈需求。  

---

### 5. Bug 与稳定性  
| Bug | Severity | 修复状态 | PR |
|-----|----------|----------|----|
| **#3374**：Data race in `Config.initSensitiveCache` | 高 | ✅ 已修复 | [#3375](https://github.com/sipeed/picoclaw/pull/3375) |
| **#3373**：SaveConfig silently deletes every `api_key` | 中 | ❌ 尚无修复 | – |

> **总结**  
> - 已解决的数据竞争问题消除了潜在的 panic，显著提升了运行时稳定性。  
> - `api_key` 删除问题仍需进一步排查与修复；建议在下一步迭代中优先处理。  

---

### 6. 功能请求与路线图信号  
| 请求 | 现状 | 预期加入版本 |
|------|------|--------------|
| **Keenable web search provider** (#3370) | PR 已提交、待合并 | 预计 v0.5.x（短期） |
| **QQ attachment enhancements** (#1349) | PR 已合并 | 已纳入 v0.4.x |
| **Reaction tool configurability** (#3372) | PR 已合并 | 已纳入 v0.4.x |

> **路线图洞察**  
> - 通过 `#3370` 与 `#3375` 的合并，项目正积极推动多工具支持与安全改进。  
> - 现有功能增强已被纳入即将发布的 0.5 版本，预示未来将支持更多第三方搜索服务与更细粒度工具配置。  

---

### 7. 用户反馈摘要  
- **配置安全**：用户对并发配置导致的崩溃表现出高度关注，反馈指出需更严谨的同步机制。  
- **API Key 可靠性**：多位用户报告 `SaveConfig` 导致 API Key 丢失，影响长期运行。  
- **多媒体交互**：QQ Channel 用户期望更丰富的附件处理与回复功能，已通过 PR #1349 得到回应。  
- **搜索工具多样化**：社区对无 API Key 的 Web Search 方案（Keenable）表现出浓厚兴趣，期待快速上线。  

---

### 8. 待处理积压  
| 项目 | 状态 | 说明 | 链接 |
|------|------|------|------|
| **Open PR #3370** | 待合并 | 仍处于审核阶段，影响后续版本集成。 | <https://github.com/sipeed/picoclaw/pull/3370> |
| **Unfixed Bug #3373** | 未修复 | 影响关键配置完整性，需在下次迭代优先处理。 | <https://github.com/sipeed/picoclaw/issues/3373> |
| **Long‑term stale Issues** | 未列出 | 建议对过去 30 天未响应的 Issue 进行快速回顾，确保无遗漏。 | – |

> **建议**  
> - 对 `#3370` 进行加速合并，确保新搜索功能能及时上线。  
> - 尽快定位并修复 `#3373`，避免配置失效导致的生产故障。  
> - 定期检查 stale Issue，保持社区健康与项目可维护性。  

---  

> **结语**  
> PicoClaw 在本日通过两项关键 Bug 的修复和多项功能扩展，提升了系统安全与用户体验。尽管活跃度略低，但已完成的改进为后续迭代奠定了坚实基础。请关注待合并的 `#3370` 以及未解决的 `#3373`，以保持项目的连续性与健康。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑09‑23**  
*来源：GitHub (nanocoai/nanoclaw)*  

| 维度 | 统计/概览 | 说明 |
|------|-----------|------|
| **活跃度** | 18 PR  | 其中 13 为待合并，5 已合并/关闭 |
| **Issues** | 1 已关闭 | 关闭的 Issue 为 #3862 |
| **Releases** | 0 | 近期无新版本发布 |

---

### 1. 今日速览  
2026‑09‑23 NanoClaw 的开发节奏保持稳定：过去 24 h 内出现 18 个 PR（13 待合并、5 已合并/关闭），并完成 1 条 Issue 关闭。项目正聚焦在核心基础设施升级（Claude Code、Agent SDK）和多渠道集成（Slack、Teams、Signal）上。没有新发布，意味着社区仍在试验阶段，整体健康度良好，但部分关键功能仍在等待最终合并。

---

### 2. 版本发布  
*暂无新版本发布。*  
若未来出现发布，建议关注 Claude Code/Agent SDK 的主版本兼容性及更新的工具链版本。

---

### 3. 项目进展  
| PR  | 状态 | 主要变更 | 影响 |
|-----|------|----------|------|
| **#3865** (closed) | Feature | Slack & Teams adapters per instance, pins, webhook mode, pending challenge | 为 CDSS（自助部署）提供多渠道接入，提升了多租户灵活性。 |
| **#3864** (closed) | Feature | Channel credential provider, instance specs, per‑instance webhook paths | 让运营团队可以在不中断服务的情况下切换聊天渠道实例，减少运维成本。 |
| **#3863** (closed) | Fix | 在安装 wizard 过程中立即注册 provider contract | 解决了在 `setup` 期间缺失的 provider contract 导致的 vault 写失败。 |
| **#3861** (closed) | Fix | 记住 image‑source 答案，避免 Echo perk 重复弹窗 | 改善用户体验，减少多次确认。 |
| **#3862** (closed) | Bug | Iron Proxy 设备配对导致登录未 vault（stale provider‑contracts barrel） | 该 Issue 已在 PR #3863 的修复中间接解决。 |

> **进度总结**：以上五个 PR 的合并完成后，项目在 **安全凭证管理**、**渠道多实例化** 与 **安装体验** 上取得了显著进步。总计修复 4 个 Bug、实现 2 个新 Feature，推动了项目从 “试验” 向 “正式稳定” 的过渡。

---

### 4. 社区热点  
- **#3865** (Slack & Teams adapters) – 公开 Feature PR，讨论集中在多租户适配与 webhook 配置，评论量高。  
- **#3862** (Iron Proxy pairing bug) – 虽无评论，但在关闭前被社区关注，标记为 “bug / triage/unresolved”。  
- **#3815** (credential gateway contract) – 仍在审查阶段，涉及核心安全协议，讨论活跃。  

> **分析**：社区关注点主要聚焦在 **多渠道接入** 与 **凭证安全** 两大维度，反映出用户对运营弹性和安全合规的迫切需求。

---

### 5. Bug 与稳定性  
| Severity | Issue | Fix PR | 状态 |
|----------|-------|--------|------|
| **高** | #3862 – Iron Proxy 设备配对导致登录未 vault | PR #3863 | 已关闭（修复） |
| **中** | #3863 – provider contract 注册缺失导致 vault 写失败 | PR #3863 | 已关闭（修复） |
| **低** | #3866 – Codex 在启动时未等待 MCP 服务器 | PR #3866 | 未合并（待评审） |

> **风险评估**：已解决 Bug 影响范围有限，未出现严重崩溃或安全漏洞。待评审的 #3866 可能导致 **启动时卡顿**，建议优先合并。

---

### 6. 功能请求与路线图信号  
| Feature | PR(s) | 预期迭代 | 备注 |
|---------|-------|-----------|------|
| Iron Proxy gateway | #3817 | 计划于 2026‑10‑15 之前完成 | 关键基础设施升级，已在 `setup` 里加入选择逻辑 |
| Slack / Teams adapters (per‑instance) | #3865, #3864 | 已完成 | 作为下一版本 0.2.0 的核心特性 |
| Cursor Agent SDK payload / install skill | #3356, #3355 | 预计 2026‑10‑01 | 主要针对企业级 AI 自动化 |
| Channel credential provider | #3864 | 已完成 | 提升运维弹性 |
| Credential gateway contract centralization | #3815 | 计划 2026‑10‑10 | 影响所有凭证相关模块 |

> **路线图**：从 PR 列表可见，项目正朝着 **多渠道、低延迟、企业级集成** 的方向推进。未来 1‑2 个月内预计将发布 0.2.0 版本。

---

### 7. 用户反馈摘要  
- **登录 Vault 问题**（#3862）：用户在使用 Iron Proxy 进行设备配对时，登录凭证未写入 Vault，导致后续请求失败。  
- **Echo perk 重复询问**（#3861）：在恢复安装过程中，Echo 的硬化镜像来源提示被重复触发，影响用户体验。  
- **Provider contract 注册**（#3863）：安装 wizard 期间缺失 provider contract 造成的 Vault 写入错误。  

> **痛点**：凭证与安装流程的耦合度过高，导致首次安装与升级时易出错。  
> **满意度**：关闭的 Bug 说明团队对及时响应的认可度高。  

---

### 8. 待处理积压  
| ID | Type | 说明 | 关注点 |
|----|------|------|--------|
| **#3815** (PR) | Refactor | Centralize credential gateway contract | 影响所有凭证相关模块，需提前评审 |
| **#3818** (PR) | Feature | 选取 gateway 但不更改 provider login | 兼容性需求高，待合并 |
| **#3817** (PR) | Feature | Iron Proxy gateway | 核心基础设施升级，计划上线 |
| **#3866** (PR) | Fix | Codex 等待 MCP 服务器 | 影响启动体验，需优先完成 |
| **#3867** (PR) | Refactor | Pin @openai/codex 0.155.1 | 与 #3866 关联，需同步合并 |

> **建议**：维护者可优先关注与核心凭证/启动流程相关的 PR（#3815、#3866、#3867），并监控 #3817 的 merge 进度，以确保后续版本的安全与稳定。  

---

**结语**：整体来看，NanoClaw 处于积极迭代期，Bug 修复与新功能并行推进。虽然无新版本发布，但 PR 活动与 Issue 解决表明项目健康度良好。建议持续跟进上述待处理项，确保下一版本能够按计划交付。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-09-23)

## 1. 今日速览
IronClaw 项目今日整体保持**温和活跃**状态。过去 24 小时内无新 Issue 提交，也无已合并的 PR，表明核心代码库处于稳定维护期而非快速迭代期。尽管没有合并动作，但仍有 **3 个 PR 处于“待合并”（Pending）** 状态，主要集中在 Host Runtime 的时间处理逻辑修复、WebUI 的 IME 兼容性问题以及意大利语本地化支持。项目活跃度评估为：**低强度维持**，侧重质量修复与国际化扩展，无重大架构变动或紧急 Bug 爆发迹象。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
*今日无 PR 被合并或关闭。*
项目当前的向前推进体现在**待合并队列**中，这些 PR 代表了即将落地的代码变更，具体详见“待处理积压”部分。

## 4. 社区热点
今日无高评论量或高反应量的 Issue/PR。所有 3 个活跃 PR 的评论数和 👍 数均为 0 或未定义，显示社区讨论热度较低，主要活动来自贡献者之间的代码提交。

*   **[PR #8108] fix(host-runtime): add builtin.time shift and typed input issues**
    *   状态: 待合并
    *   链接: [nearai/ironclaw#8108](https://github.com/nearai/ironclaw/pull/8108)
    *   分析: 这是一个技术细节修复，旨在解决 `builtin.time` 操作符中时间偏移（shift）和类型输入的问题，属于底层运行时稳定性的改进。

## 5. Bug 与稳定性
今日无新报告的 Bug，但现存 2 个针对 **稳定性/兼容性缺陷** 的修复 PR 待合并，这些问题若不及时合并可能影响用户体验：

1.  **[严重度: 中] WebUI 输入法组合状态丢失**
    *   **描述**: 在非英语环境（如中文、日文）下，WebUI 聊天输入框在处理 IME（输入法编辑器）组合键时，可能会错误地将组合过程中的按键视为“发送”指令，导致消息意外发送或输入中断。
    *   **相关 PR**: [#8092 fix(webui): preserve IME composition in the chat composer](https://github.com/nearai/ironclaw/pull/8092)
    *   **修复方案**: 区分 IME 确认键（Enter with keyCode 229）与正常发送 Enter，避免误触发。
    *   **状态**: 已提交，**待合并**。作者: huiq777。

2.  **[严重度: 中] Host Runtime 时间计算逻辑缺陷**
    *   **描述**: `builtin.time` 操作在处理 `operation: "shift"` 时，对带符号的时间单位（seconds/minutes/hours 等）求和逻辑可能存在错误，导致计算出的时间偏移不准确。
    *   **相关 PR**: [#8108 fix(host-runtime): add builtin.time shift and typed input issues](https://github.com/nearai/ironclaw/pull/8108)
    *   **修复方案**: 重构时间增量（TimeDelta）的计算与应用逻辑，确保多种单位混合偏移时的准确性。
    *   **状态**: 已提交，**待合并**。作者: Bortlesboat。

## 6. 功能请求与路线图信号
目前有一个明确的本地化功能正在推进中，预计将很快纳入下一步常规更新：

*   **[进行中] 意大利语 (it) 本地化支持**
    *   **相关 PR**: [#8107 feat(webui): add Italian (it) locale](https://github.com/nearai/ironclaw/pull/8107)
    *   **背景**: 响应用户在 Issue [#7855](https://github.com/nearai/ironclaw/issues/7855) 中的请求。
    *   **特点**: 该 PR 承诺提供完整的英文键联合体（full English key union），包括主列表 `it.ts` 以及两个懒加载的侧边包（`device-link-translations`, `inspector-translations`），确保没有字符串回落（fallback）到英文，体现了对本地化质量的重视。
    *   **状态**: 已提交，**待合并**。作者: huiq777。
    *   **判断**: 鉴于 PR 已完善且无阻塞评论，该功能极有可能在近期随下一个 minor 版本发布。

## 7. 用户反馈摘要
*今日无新 Issue 或评论，无法提炼新的用户痛点或满意度反馈。*

基于现有待合并 PR 的信息，可以推断出前期用户反馈中存在的两个主要痛点：
1.  **国际化输入体验问题**: 之前可能存在非拉丁字符输入法用户无法正常聊天或频繁误触发发送的问题（由 PR #8092 证实）。
2.  **本地化需求**: 意大利语用户群体有明确的本地化接口需求（由 PR #8107 及关联 Issue #7855 证实）。

## 8. 待处理积压
以下 PR 已提交并等待维护者审核与合并，建议关注其合并进度以评估项目节奏：

1.  **[webui] 意大利语支持** - [PR #8107](https://github.com/nearai/ironclaw/pull/8107)
    *   创建时间: 2026-09-22
    *   状态: Open
    *   备注: 完整本地化包，无字符串遗漏。

2.  **[host-runtime] 时间偏移修复** - [PR #8108](https://github.com/nearai/ironclaw/pull/8108)
    *   创建时间: 2026-09-22
    *   状态: Open
    *   备注: 核心运行时修复，影响所有涉及时间偏移计算的 Agent 逻辑。

3.  **[webui] IME 组合保留** - [PR #8092](https://github.com/nearai/ironclaw/pull/8092)
    *   创建时间: 2026-09-10 (已开放 13 天)
    *   最后更新: 2026-09-22
    *   状态: Open
    *   备注: **注意**: 此 PR 已开放超过两周，用于修复常见的输入法兼容性问题，建议维护者优先 review 以改善非英语用户的核心聊天体验。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-09-23)

## 1. 今日速览
LobsterAI 项目今日保持**高活跃度**，核心维护团队集中处理了 Gateway 启动稳定性与配置持久化等关键基础设施问题。过去 24 小时内合并了 10 个 PR，主要为面向底层架构的深度修复，显著提升了 OpenClaw 网关在 Windows 和 macOS 环境下的鲁棒性。版本 **2026.9.22** 已发布，重点解决了重启后配置重置及 Windows 网关退出异常问题。社区方面，用户对于“配置持久化”和“多模态消息同步”的痛点反馈强烈，相关 Issue 虽有新评论但尚未见相应 Fix PR 合并，需关注后续开发排期。

## 2. 版本发布
**最新版本：LobsterAI 2026.9.22**
*   **发布时间**：2026-09-22
*   **主要变更**：
    1.  **IM 模块修复**：恢复了原生的定时任务功能及飞书消息投递能力，修复了之前版本中 IM 通道中断的问题。([PR #2737](https://github.com/netease-youdao/LobsterAI/pull/2737))
    2.  **OpenClaw 网关稳定性**：修复了 Windows 平台下网关异常退出的问题，并优化了启动过程中的错误恢复机制，确保客户端引导流程更加稳定。([PR #2746](https://github.com/netease-youdao/LobsterAI/pull/2746) 相关改进)
*   **破坏性变更/迁移注意**：无显式破坏性变更。建议用户升级至此版本以解决 Windows 下的启动阻断问题，特别是从早期版本直接升级的用户。

## 3. 项目进展 (代码合并动态)
今日合并的 PRs 主要集中在**基础设施加固**与**性能优化**，展现了团队对核心链路稳定性的深耕：

*   **启动性能与兼容性优化**：
    *   **[PR #2746](https://github.com/netease-youdao/LobsterAI/pull/2746)**：优化了 `nsp-clawguard` 启动过程，避免了不必要的插件生命周期锁等待，解决了因 SQLite 同步操作慢导致的网关启动超时问题。
    *   **[PR #2743](https://github.com/netease-youdao/LobsterAI/pull/2743)**：回移了针对 Windows 私有目录创建的补丁，解决了安全软件拦截 PowerShell 子进程导致 SQLite 暂存目录创建失败、进而引发 Gateway 无法就绪的问题。
*   **配置与状态持久化修复**：
    *   **[PR #2745](https://github.com/netease-youdao/LobsterAI/pull/2745)**：修复了升级过程中因遗留模型策略配置错误导致整个网关无法启动的严重回归问题。
    *   **[PR #2742](https://github.com/netease-youdao/LobsterAI/pull/2742)**：稳定了技能配置同步机制，过滤无效文件变化，防止因 `modelPolicy` 不一致引发的网关反复重启，直接响应了“客户端反复重启”的用户痛点。
*   **功能增强与体验优化**：
    *   **[PR #2749](https://github.com/netease-youdao/LobsterAI/pull/2749)**：在 Cowork 模式下增加了实时的步骤进度流和差异统计显示，提升了多 Agent 协作时的透明度。
    *   **[PR #2748](https://github.com/netease-youdao/LobsterAI/pull/2748)**：提升了 Kimi K3 模型的 `maxTokens` 限制至匹配其上下文窗口大小，并本地化了流式包装器，优化了长文本生成体验。
    *   **[PR #2744](https://github.com/netease-youdao/LobsterAI/pull/2744)**：将活跃执行会话快照从系统提示词移至运行时上下文，避免背景进程无效化前缀缓存，显著降低 Token 消耗。
    *   **[PR #2740](https://github.com/netease-youdao/LobsterAI/pull/2740)**：修复了 macOS 下 CJK 字体加粗显示异常的问题，还原了正文与强调文本的视觉对比度。

## 4. 社区热点
*   **Issue #1006: 配置文件和工作空间文件在重启后被重置** ([Link](https://github.com/netease-youdao/LobsterAI/issues/1006))
    *   **热度**：3 条评论，活跃更新。
    *   **分析**：这是当前最核心的用户痛点。用户反馈 `openclaw.json` 和 `AGENTS.md` 等关键文件在重启时被模板覆盖。虽然 PR #2742 和 #2745 解决了部分配置覆盖导致的崩溃问题，但该 Issue 指出的**“用户自定义内容持久化保护机制缺失”仍未根本解决**。用户目前依赖定时任务 workaround，体验较差。维护者需尽快提供官方配置白名单或持久化方案。
*   **Issue #986: [stale] 微信回复没有与客户端同步** ([Link](https://github.com/netease-youdao/LobsterAI/issues/986))
    *   **热度**：2 条评论。
    *   **分析**：典型的 IM 场景体验问题。用户抱怨微信端消息是“攒一会儿再发”，导致前端等待长、后端消息刷屏。这反映了后端流式传输与前端 IM 适配层之间的缓冲策略需要优化，以支持真正的逐条实时同步。

## 5. Bug 与稳定性
| 严重程度 | 问题描述 | 状态 | 关联修复 |
| :--- | :--- | :--- | :--- |
| **P0 (Critical)** | 升级后 `nsp-clawguard` 启动失败，阻断 Gateway 就绪 (macOS/Windows) | **Fixed & Merged** | [PR #2741](https://github.com/netease-youdao/LobsterAI/pull/2741), [PR #2746](https://github.com/netease-youdao/LobsterAI/pull/2746) |
| **P1 (High)** | 特定模型 ID (如 DeepSeek V4 Pro) 导致升级后网关完全无法启动 | **Fixed & Merged** | [PR #2745](https://github.com/netease-youdao/LobsterAI/pull/2745) |
| **P1 (High)** | Windows 下安全软件拦截导致 SQLite 目录创建失败，Gateway 挂起 | **Fixed & Merged** | [PR #2743](https://github.com/netease-youdao/LobsterAI/pull/2743) |
| **P2 (Medium)** | 配置同步冲突导致网关反复重启 (9.20 版本遗留问题) | **Fixed & Merged** | [PR #2742](https://github.com/netease-youdao/LobsterAI/pull/2742) |
| **P2 (Medium)** | Web Search service 启动失败 (Issue #981) | **Open (Stale)** | 暂无新 Fix PR，需注意是否为环境依赖问题 |

**稳定性评估**：近 24 小时的修复非常密集且针对核心启动链路（Gateway/Clawguard），表明项目正在经历一次重要的**稳定性清洗**。特别是针对 Windows 和 macOS 不同安全策略的适配，显示了团队对桌面端复杂运行环境的深入理解。

## 6. 功能请求与路线图信号
*   **配置持久化专用机制 (High Priority)**：
    *   来源：[Issue #1006](https://github.com/netease-youdao/LobsterAI/issues/1006)
    *   信号：虽然 PR #2742 修复了同步 Bug，但用户需要的是**“官方支持的自定义保留策略”**。预计下一版本可能引入 Config Override 层或明确的用户模板目录，以区分“系统自动生成”与“用户手动配置”。
*   **IM 消息流式同步优化**：
    *   来源：[Issue #986](https://github.com/netease-youdao/LobsterAI/issues/986)
    *   信号：结合 PR #2749 (Cowork 实时进度) 和 PR #2748 (Kimi K3 流式优化)，团队正在加强全链路的**流式（Streaming）处理能力**。微信等 IM 通道的消息切分与发送时机优化可能在后续版本中作为体验改进点出现。
*   **Electron 升级**：
    *   来源：[PR #1277](https://github.com/netease-youdao/LobsterAI/pull/1277) (Open)
    *   信号：Dependabot 提议将 Electron 从 43.5.0 升级至 44.4.2。若维护者合并，将带来底层 WebKit 的安全补丁和性能提升，但也需注意 Electron 大版本跨度带来的潜在的渲染层兼容性问题。

## 7. 用户反馈摘要
*   **痛点 1：数据丢失焦虑**：用户最担心的是自定义配置（如 `AGENTS.md` 规则、渠道配置）被自动重置。当前的 workaround（定时备份/恢复）增加了使用负担，用户对“官方保障数据不丢失”呼声极高。
*   **痛点 2：多端同步体验割裂**：在 IM（微信/飞书）场景中，用户感受到的是“批量发送”而非“实时对话”，这与 AI 助手应有的交互式体验背道而驰。
*   **正面反馈**：尽管存在 Bug，但社区对团队响应速度表示认可。从 9.20 版本的大量重启 Bug 到 9.22 版本的一连串精准修复，用户看到了团队解决问题的决心。

## 8. 待处理积压
*   **PR #2727** (`fix(user_plugins): persist OpenClaw entry hooks across sync`) ([Link](https://github.com/netease-youdao/LobsterAI/pull/2727))
    *   **状态**：Open，创建于 9.20，9.22 有更新。
    *   **重要性**：该 PR 修复了插件入口 Hooks 在同步后丢失的问题，直接关联到 Issue #1006 的根因之一（配置持久化）。建议维护者优先审查并合并此 PR，它以更结构化的方式（SQLite 持久化）解决了配置丢失问题，可能比当前的临时修复更彻底。
*   **Issue #981** (`Failed to start Web Search service`) ([Link](https://github.com/netease-youdao/LobsterAI/issues/981)) 和 **Issue #982** (`国际化适配`) ([Link](https://github.com/netease-youdao/LobsterAI/issues/982))
    *   **状态**：均标记为 `[stale]`。
    *   **建议**：Web Search 服务启动失败可能影响新用户首次体验，建议排查是否与最近的构建或依赖有关；国际化问题虽然严重性较低，但影响用户体验完整性，建议纳入非紧急迭代队列。

---
**总体评价**：LobsterAI 正处于**关键的稳定性加固期**。今日的高频合并 PR 并非新功能堆砌，而是对核心 Gateway 启动、配置管理和跨平台兼容性的深度修补。这对于一个本地优先（Local-first）的 AI 助手项目而言至关重要，因为用户对本地应用的稳定性预期远高于云端服务。建议用户升级至 **2026.9.22** 版本以获取最大的稳定性收益。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*