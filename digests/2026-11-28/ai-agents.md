# OpenClaw 生态日报 2026-11-28

> Issues: 360 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-28 02:22 UTC

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

**NanoBot 项目每日动态报告（2026‑11‑28）**  

---

## 1. 今日速览  
- 过去 24 小时内项目保持高活跃度，**9 条 Issue**（4 条仍开启）和 **18 条 PR**（其中 8 条待合并）产生交互。  
- 没有新版本发布，开发重点在 **功能完善、跨语言本地化以及网络/代理可靠性** 上。  
- 社区关注点集中在 **标题生成 token 限额、图像编辑参数丢失、以及多语言（Hebrew）本地化**，相关 PR 已在今天陆续合并或关闭。  
- 多数已关闭 PR 为 **关键 bug 修复或资源回收**，说明维护者对稳定性和资源管理的投入在持续增加。

---

## 2. 版本发布  
> **暂无** 新的 Release。  
> 项目仍在 0.4.x 系列（最新已在 0.4.2）上迭代，后续合并的 PR 将在下一次正式 Release 时一并发布，预计会包含 **大型工具目录搜索、Google AI Ultra OAuth、Hebrew 本地化** 等功能。

---

## 3. 项目进展（今日合并/关闭的关键 PR）  

| PR 编号 | 类型 & 关键点 | 合并/关闭状态 | 影响范围 |
|--------|--------------|----------------|----------|
| **#6323** | **WebUI** – “编辑并重新发送同一会话中的消息” | 已关闭（已合并） | 改进 WebUI 交互，提升调试和对话纠错效率 |
| **#4522** | **Runner** – 通用工具重复调用防护 | 已关闭（已合并） | 防止因相同参数的工具调用导致的无限循环，提升系统稳健性 |
| **#4506** | **MCP** – 空闲超时自动关闭 | 已关闭（已合并） | 资源回收机制，降低长时间空闲容器的内存占用 |
| **#6792** | **Anthropic** – 修复 Haiku 5.5 思考预算 & 会话压缩 | 已关闭（已合并） | 解决 Haiku 5.5 在手动 `reasoningEffort` 下的错误，恢复兼容性 |
| **#6815** | **Web / Proxy** – 让共享代理解析 `web_fetch` 目标 | 已关闭（已合并） | 解决内部网络（无 DNS）环境下的网页抓取失败 |
| **#6818** | **MCP** – 让选中的共享代理解析远程服务器 | 已关闭（已合并） | 与 #6815 相辅，提升所有 MCP 传输的可达性 |
| **#6816** | **Channel Refactor** – 让渠道自行声明回复格式 | 已关闭（已合并） | 消除核心代码对渠道列表的硬编码，便于未来渠道扩展 |
| **#6814** | **WebUI** – 添加 **Hebrew** 本地化 UI | 已关闭（已合并） | 为以色列用户提供完整的 UI 语言支持 |
| **#6819** | **i18n** – 为命令菜单与回复加入 Hebrew 翻译 | 已关闭（已合并） | 完整覆盖 157 条命令的本地化，提升多语言体验 |
| **#6820** | **Telegram Test** – 更新 Hebrew 菜单预期 | 已关闭（已合并） | 保证自动化测试与实际本地化保持一致 |
| **#6814‑#6824 系列**（未合并） | **功能/性能** – 大工具目录搜索、Google AI Ultra OAuth、技能自动发现等 | 仍 **OPEN**（待审） | 代表下一轮主要功能迭代的方向 |

> **总体评估**：本轮合并的 PR 主要围绕 **安全、资源管理、跨语言本地化、以及网络代理兼容性**，显著提升了系统的 **可靠性与可用性**。后续的功能性 PR（#6824、#6823、#6821）已进入审查阶段，预计将在下一次 Release 中正式推出。

---

## 4. 社区热点  

| 热点 | 类型 | 评论/点赞 | 链接 | 关键诉求 |
|------|------|-----------|------|----------|
| **#6718** | **Bug** – WebUI 标题生成在 Kimi K3.1 Pro 上因 96‑token 限额失效 | 3 条评论 / 0 👍 | https://github.com/HKUDS/nanobot/issues/6718 | 需要在标题生成环节动态调整 token 预算，避免因模型输出被截断导致 “Untitled”。 |
| **#3647** | **Enhancement** – 使用本地 tokenizer 估算 prompt token | 2 条评论 / 0 👍 | https://github.com/HKUDS/nanobot/issues/3647 | 通过本地 `tiktoken` 减少网络依赖，提高启动速度和离线部署的可靠性。 |
| **#6598** | **Bug** – 自定义图像生成 provider 忽略 `reference_images` | 1 条评论 / 0 👍 | https://github.com/HKUDS/nanobot/issues/6598 | 期待 provider 能正确处理编辑请求，返回基于参考图的编辑结果。 |
| **#6824** | **Enhancement / Performance** – 大工具目录按需搜索（BM25） | 0 评论（新建） | https://github.com/HKUDS/nanobot/pull/6824 | 当插件/工具数量激增时，避免每次模型调用都携带完整 schema，提升响应速度与 token 使用率。 |
| **#6823** | **Feature** – Google AI Ultra 订阅 OAuth（opt‑in） | 0 评论（新建） | https://github.com/HKUDS/nanobot/pull/6823 | 为拥有 Google AI Ultra 订阅的用户提供免 API‑Key 的使用方式，降低使用门槛。 |

> **热点背后**：社区主要关注 **模型交互的 token 管理、插件生态的可扩展性以及跨语言支持**，这些需求与 NanoBot 正在推进的技术路线高度吻合。

---

## 5. Bug 与稳定性  

| 严重度 | Issue 编号 | 描述 | 当前状态 | 是否已有 Fix PR |
|--------|------------|------|----------|----------------|
| **高** | **#6718** (OPEN) | WebUI 自动标题在 Kimi K3.1 Pro 因 96‑token 限额提前终止，导致 “Untitled”。 | 待修复 | 暂无对应 PR（预计在后续迭代中加入 token 动态预算逻辑） |
| **高** | **#6817** (OPEN) | OpenAI‑compatible Claude 路径在无文本工具调用后丢失 `cache_control` 标记，导致后续缓存失效。 | 待修复 | 暂无 PR |
| **中** | **#6598** (OPEN) | 自定义图像生成 provider 忽略 `reference_images` 参数，返回不相关图像。 | 待修复 | 暂无 PR |
| **中** | **#6822** (OPEN) | 文件管理器请求：在 Docker 部署时缺少文件浏览/下载功能。 | 待实现 | 暂无 PR |
| **低** | **#6785** (CLOSED) | Anthropic Haiku 5.x 在非 `adaptive`/`none` `reasoningEffort` 时返回 “thinking.type.enabled” 错误。 | 已关闭（Bug 已定位） | 修复在 PR #6792 |
| **低** | **#6786** (CLOSED) | Anthropic 思考块在会话压缩后签名失效，`nanobot -m` 隐蔽错误。 | 已关闭 | 修复在 PR #6792 |

> **结论**：高优先级的 **标题生成** 与 **缓存控制** 问题仍未得到修复，建议在下一个 Sprint 中分配资源进行根因分析并提交对应 PR。

---

## 6. 功能请求与路线图信号  

| 需求 | 来源 Issue/PR | 关联实现进度 | 可能进入下一版 |
|------|---------------|--------------|----------------|
| **文件管理器**（上传/下载） | #6822 (OPEN) | 尚无实现 PR | 高：满足 Docker 部署用户的基本文件操作需求 |
| **大型工具目录按需搜索（BM25）** | #6824 (OPEN) | PR 已提交，待审 | 中‑高：显著降低每轮对话的 token 开销 |
| **Google AI Ultra OAuth** | #6823 (OPEN) | PR 已提交，待审 | 中：为 Google AI 付费用户提供免 Key 使用路径 |
| **技能自动发现（项目 & 用户 `.agents/skills`）** | #6821 (OPEN) | PR 已提交，待审 | 中：强化插件化生态，提升自定义技能可达性 |
| **本地 tokenizer 估算** | #3647 (CLOSED) | 已关闭，未合并 | 低‑中：已被社区讨论，可在后续版本实现以提升离线部署体验 |
| **Hebrew 本地化** | #6814/#6819 (已合并) | 已完成 | 已实现，展示本地化路线的可交付性 |

> **路线图建议**：在下个 0.5.x 里优先发布 **文件管理器** 与 **BM25 大工具搜索**，随后同步推出 **Google AI Ultra OAuth** 与 **技能发现**，形成“一站式插件+云服务”组合。

---

## 7. 用户反馈摘要  

1. **Token 预算不足导致功能缺失**（#6718）——用户在使用高端模型（Kimi K3.1 Pro）时，自动标题生成被截断，影响对话可读性。  
2. **自定义图像编辑参数被忽略**（#6598）——用户期待通过 `reference_images` 实现图像编辑，当前 provider 返回无关图像，缺乏错误提示。  
3. **内部网络（无 DNS）环境下的网页抓取失败**（#6815、#6818）——维护者已通过 PR 解决，显示对企业内部部署的关注度提升。  
4. **多语言支持需求**——Hebrew 本地化的成功合并（#6814‑#6819）表明社区对非英语 UI 有强烈需求，后续可以考虑扩展到更多语言。  
5. **文件管理不便**（#6822）——Docker 部署的用户希望直接在 UI 中浏览、下载文件，当前只能通过挂载卷或手动复制。  

整体来看，用户对 **可用性（本地化、文件管理）** 与 **模型交互细节（token、工具参数）** 的期望最为集中。

---

## 8. 待处理积压（长期未响应）  

| 编号 | 标题 | 当前状态 | 建议处理方式 |
|------|------|----------|--------------|
| **#3647** (CLOSED) | 使用本地 tokenizer 估算 prompt token | 已关闭但未合并到代码 | 将其实现纳入未来的 `tokenizer` 抽象层，提升离线部署体验。 |
| **#6807** (CLOSED) | WebUI 功能提案：Hebrew 本地化与双向聊天 | 已关闭（已在 #6814‑#6819 合并） | 已完成，留意后续对 RTL（右到左）输入的兼容性测试。 |
| **#6811** (CLOSED) | web_fetch & MCP 在内部 Docker 网络不可用 | 已关闭（已在 #6815 / #6818 解决） | 监控后续版本在企业防火墙环境中的表现。 |
| **#6822** (OPEN) | 文件管理器 | 待实现 | 优先分配前端与后端开发资源，计划在 0.5.0 中交付。 |
| **#6817** (OPEN) | History `cache_control` 丢失（Claude） | 待修复 | 需要在 OpenAI‑compatible 路径的历史恢复逻辑中加入 `cache_control` 标记的回写，建议在下个 Sprint 中完成。 |
| **#6718** (OPEN) | WebUI 标题生成 token 限额失效 | 待修复 | 评估在标题生成前动态查询模型 token 限额或采用分段生成策略。 |

---

### 综合评估
- **活跃度**：Issues 与 PR 交互频繁，且多数 PR 已在当天完成合并或关闭，表明维护者响应及时。  
- **健康度**：核心功能（代理、MCP、Runner）已通过多项安全/资源回收修复，系统稳定性在提升；但仍有 **高优先级 Bug**（标题生成、缓存控制）悬而未决，需要快速跟进。  
- **发展方向**：项目正从 “核心 Agent + 基础 WebUI” 向 **插件化生态、云服务集成、跨语言本地化** 转型，后续迭代应继续聚焦 **文件管理、工具目录搜索、OAuth 集成**，以满足企业内部部署和多语言用户的需求。  

--- 

*报告生成时间：2026‑11‑28 09:15（UTC+8）*  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告（2026‑11‑28）**  

---  

### 1. 今日速览  
- 项目在过去 24 小时内保持活跃，新增 **2 条 Issue**（均为新建且尚未解决）和 **5 条 Pull Request**（其中 4 条已合并/关闭，1 条仍在审阅）。  
- 代码合并主要集中在一次大规模的 *merge* PR（#1546），表明维护者在本周对历史遗留的散落 PR 进行统一收敛。  
- 没有新的正式 Release，当前版本仍停留在 0.3.1。整体活跃度中等偏上，社区反馈以 **网络代理兼容性** 与 **Web 端输入卡顿** 为主。  

---  

### 2. 版本发布  
> **暂无新版本**，因此本节省略。  

---  

### 3. 项目进展  

| PR 编号 | 状态 | 主要贡献 | 影响范围 | 链接 |
|--------|------|----------|----------|------|
| **#1546** | 已关闭（合并） | 将 #1480、#1479、#1478、#1473、#1467 等散落的修复统一合并 | 代码基线清理，防止未来出现重复冲突 | <https://github.com/sipeed/picoclaw/pull/1546> |
| **#238** | 已关闭（合并） | 修复 Claude API 调用时 `ToolCall.Name` 为空导致的 400 错误 | 提升 Claude（Anthropic）模型的可靠性 | <https://github.com/sipeed/picoclaw/pull/238> |
| **#1555** | 已关闭（合并） | 合并 #1390、#1389、#1383、#1381 等修复 | 同上，进一步净化分支历史 | <https://github.com/sipeed/picoclaw/pull/1555> |
| **#1560** | 已关闭（合并） | 合并 #1312、#1311、#1308 | 同上 | <https://github.com/sipeed/picoclaw/pull/1560> |
| **#3476** | **开放**（待审） | 将 Web 端的草稿编辑状态抽离到 `ChatComposer`，防止每次草稿变更导致历史消息重新渲染 | 直接缓解 Issue #3475 报告的 **输入卡顿** 问题 | <https://github.com/sipeed/picoclaw/pull/3476> |

**推进程度**：通过一次性合并多条历史 PR，项目代码库的技术债务得到显著削减；与此同时，针对 Web 端性能的专项修复（#3476）已提出，预计在下一个合并窗口解决。  

---  

### 4. 社区热点  

| 编号 | 类型 | 标题（概括） | 评论/👍 数 | 链接 |
|------|------|--------------|-----------|------|
| **#3477** | Issue (OPEN) | Telegram channel 下载附件绕过 `settings.proxy` | 1 / 0 | <https://github.com/sipeed/picoclaw/issues/3477> |
| **#3475** | Issue (OPEN) | Web‑端聊天输入时出现显著卡顿/卡顿 | 1 / 0 | <https://github.com/sipeed/picoclaw/issues/3475> |
| **#3476** | PR (OPEN) | isolate chat draft updates from message rendering | 0 / 0 | <https://github.com/sipeed/picoclaw/pull/3476> |

**分析**  
- **Telegram 代理兼容**：在受限网络环境下，`getFile` 能走代理而实际文件下载却直连，导致用户无法获取附件。该问题触及到 **企业/学校内网** 的使用场景，需求强烈。  
- **Web 端卡顿**：用户在长对话中编辑草稿时，页面会频繁重新渲染，导致 CPU 占用升高。社区已快速提交对应的代码改动（#3476），显示出对 UI 体验的高度关注。  

---  

### 5. Bug 与稳定性  

| 严重程度 | Issue 编号 | 描述 | 是否已有 Fix PR | 链接 |
|----------|------------|------|----------------|------|
| 高 | **#3477** | Telegram channel 附件下载不走代理，导致在受限网络中下载失败或卡死 | 暂无（仍待实现） | <https://github.com/sipeed/picoclaw/issues/3477> |
| 中 | **#3475** | Web 端聊天页面输入时出现显著卡顿、卡顿现象，影响交互流畅度 | 已有对应修复 PR **#3476**（待合并） | <https://github.com/sipeed/picoclaw/issues/3475> |

---  

### 6. 功能请求与路线图信号  

| 类型 | 需求来源 | 关键点 | 关联 PR/Issue | 可能进入的版本 |
|------|----------|--------|----------------|----------------|
| **网络兼容** | Issue #3477（Telegram） | 完善 `settings.proxy` 在所有 Telegram API 调用（包括文件下载）中的统一生效 | 暂无对应 PR | 下一次 **功能/兼容性** 迭代（预计 0.3.2） |
| **前端性能** | Issue #3475 + PR #3476 | 将草稿编辑状态独立管理，避免全局渲染 | PR #3476 已提交 | 若合并，预计随 **0.3.2** 一起发布 |
| **Claude API** | PR #238 已合并 | 解决工具调用名称为空导致的 400 错误 | 已在 0.3.1 中实现 | 已在当前版本生效 |

**路线图提示**：本周的合并工作表明维护者正集中处理历史修复与关键兼容性问题，下一步很可能在 **0.3.2** 中加入 **Telegram 代理全链路支持** 与 **Web 前端性能改进**。  

---  

### 7. 用户反馈摘要  

- **网络受限环境**：用户在公司/校园网络只能通过代理访问 `api.telegram.org`，但实际文件下载仍尝试直连，导致 **附件获取失败**。这是实际部署中最常碰到的阻碍，急需统一代理策略。  
- **Web 端交互体验**：在长对话中频繁编辑草稿会触发页面整体重新渲染，CPU 使用率瞬间升至 80%+，影响 **实时对话** 与 **工具调用** 的流畅度。用户期待更轻量的前端实现。  
- **Claude/Anthropic 支持**：已在 PR #238 中修复的 bug 获得正面反馈，说明对多模型兼容性的需求在增长。  

整体来看，用户对 **可靠的网络代理** 与 **流畅的前端交互** 最为敏感，这两块的改进将显著提升满意度。  

---  

### 8. 待处理积压  

| 编号 | 类型 | 创建时间 | 当前状态 | 备注 |
|------|------|----------|----------|------|
| **#3477** | Issue (OPEN) | 2026‑11‑27 | 未关闭 | 关键网络兼容性问题，建议指派维护者或社区成员跟进。 |
| **#3475** | Issue (OPEN) | 2026‑11‑27 | 未关闭 | 已有对应修复 PR #3476，需加速审查合并。 |
| **#3476** | PR (OPEN) | 2026‑11‑27 | 待审 | 与 Issue #3475 直接关联，合并后可立即缓解卡顿。 |
| **#1546** | PR (CLOSED) | 2026‑03‑14 | 已合并 | 该合并已清理大量历史 PR，后续请关注是否还有遗漏的未合并分支。 |

> **建议**：维护者可在本周内完成 #3476 的代码审查并合并，同时安排一次小范围的 **网络代理** 设计评审，为 #3477 的实现奠定方案基础。  

---  

*本报告基于截至 2026‑11‑28 的 GitHub 数据自动生成，旨在帮助项目维护者快速把握当日动态与后续工作重点。*  

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报（2026‑11‑28）**  
*来源：GitHub 统计、Issue 与 PR 数据*

---

### 1. 今日速览  
- **活跃度**：过去 24 h 产生 5 个新 Issue 与 9 条 PR（4 已合并，5 开放中）。  
- **社区热度**：Issue 讨论相对分散，主要集中在「session mailbox」与「credential gateway」两条新需求。  
- **整体健康**：无重大版本发布，Bug 率低，但仍有安全与稳定性关注点（如 `/clear` 命令误触）。项目在功能扩展与依赖管理方面保持稳步推进。

---

### 2. 版本发布  
- **无新版本**。项目仍停留在 `v2026.11.0`，但多条 PR 已准备好合并到下一个发布周期。

---

### 3. 项目进展  
| PR | 状态 | 主要改动 | 价值 |
|---|---|---|---|
| **#4210** (closed) | ✅ 合并 | 新增 `llmman` 本地模型提供者与工具，支持 `add-llmman-provider` 与 `add-llmman-tool` | 扩展 LLM 选型，提升本地模型部署灵活度 |
| **#1402** (closed) | ✅ 合并 | 修复 per‑group `trigger_pattern` 匹配错误 | 防止误触发，提升群组配置可靠性 |
| **#3300** (closed) | ✅ 合并 | `formatAttachments` 逃逸 `type` 字段，避免 XML 注入 | 强化安全性，防止恶意附件类型导致的解析问题 |
| **#4308** (closed) | ✅ 合并 | 升级 `actions/checkout@v7.0.1` | 提升 CI 速度与安全，兼容最新 GitHub Actions 规范 |
| **#4581** (open) | 🔜 待审 | 引入 `/add-remote-mailbox`，实现 HTTP 方式 session mailbox | 解决容器化 / sandbox 环境下的文件挂载限制，提升部署多样性 |
| **#4579** (open) | 🔜 待审 | 更新 agent 镜像 `v2026.11.0-20261127T0412` | 保持镜像与容器安全策略同步 |

> **总结**：本日共计 4 条 PR 成功合并，分别强化了本地模型支持、群组配置准确性、附件安全与 CI 依赖管理。开放中的 PR 预示项目正向更灵活的部署与更完善的安全模型迈进。

---

### 4. 社区热点  
| 议题 | 链接 | 活跃度 | 背后诉求 |
|---|---|---|---|
| **#4580** – `/clear` 与 `/upload-trace` 误触发 | [#4580](https://github.com/nanocoai/nanoclaw/issues/4580) | 1 评论、0 赞 | 用户在对话中存储非直接指令的消息时，误执行管理指令，导致不可预期行为。 |
| **#4581** – 远程 Mailbox（HTTP） | [#4581](https://github.com/nanocoai/nanoclaw/pull/4581) | 0 评论 | 需要支持不具备主机文件系统访问权限的容器/云环境，解决“挂载 session 目录”痛点。 |
| **#4543** – 网络邮箱实现 | [#4543](https://github.com/nanocoai/nanoclaw/issues/4543) | 2 评论 | 与 #4581 同类需求，关注跨宿主机运行的 agent 能否共享 session 数据。 |
| **#4584** – Vault 证书无双重注册 | [#4584](https://github.com/nanocoai/nanoclaw/issues/4584) | 0 评论 | 证书管理集中化，避免 agent 需要两份注册信息。 |

> **洞察**：最为关注的是 **安全与部署灵活性**。用户希望在容器化或远程环境中无缝运行 nanoClaw，而不被文件挂载或凭证双重注册所束缚。

---

### 5. Bug 与稳定性  
| Bug | 影响 | Severity | 修复状态 |
|---|---|---|---|
| **#4580** – `/clear` 与 `/upload-trace` 误触发 | 影响对话安全与消息保留 | **高** | 未修复（PR 4289 相关） |
| **#4289** – 运行命令与存储上下文冲突 | 影响 agent 运行状态 | 中 | 已提交 PR（待合并） |
| **#3300** – XML 附件类型未逃逸 | 可能导致安全注入 | 高 | 已修复并合并 |
| **#4579** – 镜像不一致导致的部署失败 | 影响部署可复现性 | 中 | 已提交镜像更新 PR |

> **建议**：优先合并 #4289 与 #4580 相关修复，避免生产环境出现命令误触与状态丢失。

---

### 6. 功能请求与路线图信号  
| 请求 | 现状 | 评估 |
|---|---|---|
| **Remote Mailbox (HTTP)** – #4581 | PR 已提交 | 结合 #4543，推测将成为 2026‑12‑0X 版本的核心功能 |
| **Vault Credential Gateway** – #4584 | Issue 未受关注 | 高需求，建议在下个迭代中实现无双重注册 |
| **Session Mailbox via Network** – #4543 | Issue 活跃 | 与 #4581 互补，可在同一版本合并 |
| **Agent‑Runner Context Preservation** – #4289 | PR 已提交 | 直接解决 Bug #4580，优先级高 |

> **路线图**：计划在 2026‑12‑01 之前完成 Remote Mailbox、Vault 证书无双重注册与 Session Mailbox 的功能合并，以满足容器化与云原生部署需求。

---

### 7. 用户反馈摘要  
- **安全与可靠性**：多位用户报告 `/clear` 与 `/upload-trace` 在非直接交互时触发，导致数据意外清除。  
- **部署灵活性**：用户在 Kubernetes、OpenShell sandbox 与远程机器上遇到文件挂载限制，渴望通过 HTTP 或网络方式共享 session 数据。  
- **凭证管理**：部分使用 HashiCorp Vault 的团队需要统一凭证注入机制，减少 OneCLI 双注册步骤。  
- **满意点**：对 `llmman` 本地模型支持与 `actions/checkout` 依赖升级表示肯定，认为项目持续关注性能与安全。

---

### 8. 待处理积压  
| 议题 | 创建时间 | 状态 | 关注点 |
|---|---|---|---|
| **#4580** – /clear 误触发 | 2026‑11‑27 | 未解决 | 可能导致生产环境安全隐患 |
| **#4581** – /add‑remote‑mailbox | 2026‑11‑27 | PR 提交 | 关键部署功能，需快速合并 |
| **#4579** – 镜像更新 | 2026‑11‑27 | PR 提交 | 保证镜像版本一致性 |
| **#4274** – 依赖升级 | 2026‑11‑06 | PR 提交 | 防止已知安全漏洞 |
| **#2896** – WhatsApp 媒体失败 | 2026‑06‑30 | PR 提交 | 长期未合并，需确认是否已被其它 PR 覆盖 |

> **建议**：建议维护团队优先评估 #4580 与 #4581，确保功能可靠性与部署灵活性；随后推进镜像与依赖更新，维持项目安全合规。

--- 

*以上信息基于截至 2026‑11‑28 的 GitHub 统计与最新 PR/Issue 状态，供项目维护者与社区成员快速把握项目健康度与发展脉络。*

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

# LobsterAI 项目日报（2026‑11‑28）

| 时间 | 说明 |
|------|------|
| **发布日期** | 2026‑11‑27 |
| **新增 Release** | 1 |
| **Issues（过去24h）** | 1 (新增/活跃) |
| **Pull‑Requests（过去24h）** | 20 (已合并) |

---

## 1. 今日速览  
LobsterAI 在 2026‑11‑27 推出了规模最大的架构迁移，彻底将 Agent 引擎从 **OpenClaw** 换成 **DeepSeek Harness (DSH)**。过去 24 小时共合并 20 条 PR，几乎涵盖了 UI、插件生态、IM 路由、任务调度、技能管理等全部核心模块。唯一待办事项是 Issue #3225（账号禁用）和少量回归 Bug 修复。整体活跃度维持在高水平，社区对新架构的接受度正在上升。

---

## 2. 版本发布  
### **Release: 2026.11.27 – “DSH Migration”**  
- **主要变更**  
  - 用 **DeepSeek Harness 0.2.2‑rc.5** 替换了旧的 OpenClaw 引擎。  
  - 所有 Agent、专家、记忆、IM 通道、媒体生成、办公编辑和插件均在新引擎上重构。  
  - 迁移 PR #3239 是一次 106 PR 的综合改造，包含 UI、IPC、插件、配置迁移等多项改动。  
- **破坏性变更**  
  - 现有插件需与 DSH 兼容，原 OpenClaw 相关 API 已废弃。  
  - `CoworkAgentEngine` 固定为 `'dsh'`，不再支持 OpenClaw。  
  - 一些旧的 `agent-default-model` 覆盖逻辑被移除。  
- **迁移注意事项**  
  - 需要更新 `@deepseek-ai/dsh` 至 `0.2.2‑rc.5` 并重新构建所有插件。  
  - 对已部署的桌面版用户，建议先在测试环境验证后再切换。  
  - 迁移后，旧的 `~/.dsh` 目录将被清理，所有配置迁移至 `~/.lobsterai`。  
- **文档**  
  - 迁移说明已更新至 `docs/migration/2026-11-27-DSH-migration.md`。  
  - 兼容性清单与迁移脚本已发布至 `specs/migration/2026-11-27-migration-tool.md`。  

**链接**：<https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.27>

---

## 3. 项目进展  
| PR | 主要功能/修复 | 说明 |
|----|--------------|------|
| **#3239** | **feat(runtime): migrate engine to DSH** | 完成 106 PR 的合并，彻底实现了 OpenClaw → DSH 的迁移。 |
| **#3237** | **feat(dsh): add settings-section embed, trace isolation, gallery navigation** | 新增 DSH 嵌套设置面板与轨迹隔离，提升插件生态可扩展性。 |
| **#3236** | **feat(skills): streamline bundled skills** | 9 大核心技能保持启用，其他技能设置为只读，减少配置复杂度。 |
| **#3235** | **fix(cowork): polish artifact tabs, MCP cache** | 改善插件市场缓存机制，解决跨环境请求失败。 |
| **#3234** | **fix(im): show main agent bindings** | 修复 IM 任务显示与绑定不一致导致的误操作。 |
| **#3233** | **feat(settings): redesign settings save model** | 统一设置保存模式，加入“未保存更改”提示。 |
| **#3232** | **fix(im): 修复 QQ/Telegram/Discord 群聊路由** | 解决同一群聊多机器人导致任务冲突问题。 |
| **#3230** | **fix(im): prevent legacy 60s timer from racing DSH approvals** | 解决 IM 同意提示提前超时的 bug。 |
| **#3228** | **fix(im): preserve shared group conversations in dsh** | 解决迁移后同一群聊任务标题不一致的问题。 |
| **#3226** | **fix(scheduler): fold repeated runs into one task conversation** | 同一 Agent 的定时任务复用同一本地会话，节省资源。 |

> 通过上述 PR，项目整体向前迈出了 **三大里程碑**：  
> 1. 引擎彻底升级为 DSH；  
> 2. 插件与技能生态被重新整理；  
> 3. 多平台 IM 路由与任务管理得到显著稳定。

---

## 4. 社区热点  
- **Issue #3225**（[链接](https://github.com/netease-youdao/LobsterAI/issues/3225)）  
  - 主题：账号被禁用，申请解封。  
  - 主要诉求：用户使用本地反向代理触发风控导致账号被禁，期望官方提供解封方案。  
  - 目前仅有 1 条评论，尚未得到官方答复。  
  - 对社区而言，此 issue 体现了 **用户安全** 与 **服务合规** 的重要性，建议维护者在 Release notes 或 FAQ 中增加关于 “安全使用反向代理” 的提示。  

- **PR #3239**（[链接](https://github.com/netease-youdao/LobsterAI/pull/3239)）  
  - 讨论热度高，涉及 106 PR 的合并，社区对迁移方案的细节展开了多轮讨论。  
  - 反映出项目在 **技术架构** 方向的积极探索与社区参与度。

---

## 5. Bug 与稳定性  
| PR | 关键 Bug | 解决情况 | 备注 |
|----|----------|----------|------|
| #3234 | IM 任务绑定显示错误 | ✅ 已修复 | 影响普通用户的任务切换体验 |
| #3232 | QQ/Telegram/Discord 群聊路由冲突 | ✅ 已修复 | 解决多机器人冲突导致的会话中断 |
| #3230 | 60 s 超时导致 IM 同意失效 | ✅ 已修复 | 提升用户交互体验 |
| #3226 | 定时任务重复生成多会话 | ✅ 已修复 | 降低资源占用，提高性能 |
| #3223 | 迁移后会话标题重复 | ✅ 已修复 | 防止任务混乱 |
| #3218 | Mac 插件缺少 package‑lock 导致构建失败 | ✅ 已修复 | 统一缓存机制提升构建稳定性 |

> **总体来看**：过去 24 小时内，所有 Bug‑相关 PR 已经全部合并，项目在 **稳定性** 与 **性能** 方面实现了显著提升。

---

## 6. 功能请求与路线图信号  
| 请求/PR | 说明 | 预计上线 |
|---------|------|----------|
| #3236 (bundled‑skills streamlining) | 只保留 9 大核心技能，其他技能只读 | 已在 2026.11.27 版本发布 |
| #3233 (settings save model) | 统一设置保存模型，增加未保存提示 | 已发布 |
| #3227 (DSH profile reload) | 恢复配置热重载与桌面连接 | 已发布 |
| #3222 (context‑token‑optimization) | 优化初始上下文 token | 计划 2026‑12‑15 版本 |
| #3231 (shared group conversation handling) | 共享同一 Agent 的多机器人共用群任务 | 已在 2026.11.27 版本 |
| #2859 (model catalog refresh) | 刷新内置提供商模型列表 | 已发布 |

> **路线图**：接下来两周将重点完善 **上下文 token 优化**（#3222）与 **插件市场新功能**（#3235），并在 2026‑12‑10 前发布 **LobsterAI‑2026.12.10** 版。

---

## 7. 用户反馈摘要  
- **安全与合规**：Issue #3225 明确指出反向代理可能触发风控，用户担忧账号被禁。  
- **性能体验**：多条 PR（#3230、#3226）均针对 IM 同意、定时任务性能进行优化，体现用户对 **即时响应** 的需求。  
- **插件生态**：#3235、#3236 关注插件市场的缓存与技能管理，表明社区希望插件更易用、更新更快。  
- **UI/UX**：#3238、#3233 等 PR 对弹窗、设置页面做了细节优化，说明用户对 **操作流程可视化** 有更高期望。

---

## 8. 待处理积压  
| Issue/PR | 说明 | 当前状态 |
|----------|------|----------|
| **#3225**（账号被禁用） | 需要官方解封或提供安全使用指导 | 未处理，待官方回复 |
| **#2811**（插件安全审核） | 旧 PR，缺失安全检查 | 未处理，建议优先评估 |
| **#2780**（多语言支持） | 需求高，但暂无实现 | 需要长期规划 |

> **建议**：维护者可以将 Issue #3225 放到“安全与合规”标签下，快速收集社区意见；同时将未完成的安全审核 PR（如 #2811）加入下周计划，防止类似问题再次发生。

---  

> **结语**  
> LobsterAI 在本次大规模迁移后已完成 20 条 PR 的合并，整体稳定性与功能性均得到提升。唯一剩余的高优先级问题是账号禁用事件，建议尽快响应。期待在下一个版本中继续优化性能与插件生态，提升用户体验。

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

# CoPaw (QwenPaw) 项目动态日报
**日期**: 2026-11-28
**数据窗口**: 过去 24 小时 (2026-11-27 00:00 - 2026-11-28 24:00 UTC 近似)

## 1. 今日速览
CoPaw 项目今日保持高度活跃，过去 24 小时内产生 13 条 Issue 更新和 26 条 PR 更新，其中 7 条 PR 和 3 条 Issue 完成关闭或合并，显示出密集的修复与维护节奏。开发重心明显偏向 **稳定性修复**（Console 渲染、API 可达性、QQ 渠道重连）和 **核心逻辑健壮性**（Doom-loop 循环检测、Recovery 预算机制）。虽然无新版本发布，但针对 2.3.0.post1 版本暴露出的前端渲染缺陷、后端 API 502/500 错误及渠道连接问题，社区已迅速响应并提交针对性补丁（PR #8960, #8961, #8963 等），项目健康度处于“快速迭代修复期”。

## 2. 版本发布
**今日无新版本发布。**
*注：当前最新稳定基线为 v2.3.0.post1，近期 Issues 和 PRs 均围绕该版本的热点 Bug 进行修复，预计后续 PR 合并后将推动新的 Patch 版本或 Bugfix 分支更新。*

## 3. 项目进展
今日合并/关闭的 PR 主要集中在解决 **前端控制台体验** 和 **核心循环逻辑** 的深层 Bug：

*   **前端控制台稳定性增强**:
    *   **[PR #8951](https://github.com/agentscope-ai/CoPaw/pull/8951)** (Closed/Merged): 修复了聊天导航、滚动及时间戳显示问题，通过去重迁移的用户消息 ID 并优化视口行为，解决了长对话历史加载时的布局错乱和闪烁问题。
    *   **[PR #8953](https://github.com/agentscope-ai/CoPaw/pull/8953)** (Closed/Merged): 稳定了聊天历史分页和滚动，使用持久化转录消息 ID 作为分页边界，解决了旧对话加载时返回 `400 Invalid history cursor` 的问题，并优化了滚动空间预留。
    *   **[PR #8952](https://github.com/agentscope-ai/CoPaw/pull/8952)** (Closed/Merged): 修复 Relay 模块的中断恢复和关闭逻辑，独立处理每个用户的恢复和关闭，防止 HTTP 客户端关闭失败导致资源泄漏。
*   **核心 Agent 循环安全性**:
    *   **[PR #8713](https://github.com/agentscope-ai/CoPaw/pull/8713)** (Closed/Merged): 修复了 `DoomLoopGate` 从未触发的问题。此前 Gate 仅记录每条回复中的首次工具调用，导致重复相同工具调用的无限循环无法被拦截。此 PR 确保记录回复期间追加的所有工具调用，使反循环机制真正生效。
    *   **[Issue #8712](https://github.com/agentscope-ai/CoPaw/issues/8712)** (Closed): 对应上述修复，解决了同一个 Bash 命令被批准 14 次且无法中断的资源消耗问题。

## 4. 社区热点
以下 Issue 和 PRs 今日互动较多或涉及核心痛点，吸引社区关注：

*   **[Issue #8845](https://github.com/agentscope-ai/CoPaw/issues/8845): [OPEN] Console: markdown tables overflow (5 评论)**
    *   **内容**: Markdown 表格在消息气泡中溢出，且无水平滚动条，导致部分列内容不可见但可选中。
    *   **分析**: 这是影响用户体验的 UI Bug，用户反馈强烈，需前端团队调整 CSS 或组件库配置以支持 `overflow-x: auto`。
*   **[Issue #8956](https://github.com/agentscope-ai/CoPaw/issues/8956): [OPEN] Creator App Tests red on main (4 评论)**
    *   **内容**: 由于 PR #8785 引入的共享恢复预算机制，Creator App 测试在 main 分支失败。问题在于重试拒绝时的异常对象身份识别（object identity）逻辑错误。
    *   **分析**: 这是一个阻断性的 CI/CD 问题。**[PR #8957](https://github.com/agentscope-ai/CoPaw/pull/8957)** 已提交修复，旨在通过标记异常来终止循环，需尽快合并以恢复构建绿色状态。
*   **[Issue #8712](https://github.com/agentscope-ai/CoPaw/issues/8712): [CLOSED] Repeated identical tool calls (2 评论)**
    *   **内容**: 资源保护机制下，Shell 内存限制触发的相同 Bash 调用未被 Doom-loop 门控拦截。
    *   **分析**: 已随 PR #8713 合并修复，标志着 Agent 安全机制的一个里程碑式完善。
*   **[PR #7211](https://github.com/agentscope-ai/CoPaw/pull/7211): [OPEN] fix(runtime): prevent injected context from persisting (Under Review, 3+ 月龄)**
    *   **内容**: 长期待审查的大型 PR，修复通过 `HookContext.inject_context()` 注入的系统级提醒被错误写入持久化对话存储的问题。
    *   **分析**: 该 PR 尺寸较大 (size/L)，逻辑复杂，需核心维护者优先级审查，以防止数据污染。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在 **2.3.0.post1 版本的回归** 和 **特定渠道/组件的稳定性**：

| 严重程度 | Bug 描述 | 来源 | Fix PR | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **Critical** | **Cron API 返回 500**: 所有 Cron REST API 端点不可用，原因是 `_get_default_cron_mgr` 中引用了不存在的 `mam._workspaces` 属性。 | [Issue #8960](https://github.com/agentscope-ai/CoPaw/issues/8960) | [PR #8965](https://github.com/agentscope-ai/CoPaw/pull/8965) | 修复已提交，待合并 |
| **High** | **QQ 渠道永久断开**: WebSocket 清理错误导致 Supervisor 永久退出，Worker 状态 Ready 但实际已断开。 | [Issue #8962](https://github.com/agentscope-ai/CoPaw/issues/8962) | [PR #8963](https://github.com/agentscope-ai/CoPaw/pull/8963) | 修复已提交，待合并 |
| **High** | **前端状态不同步**: 升级 2.3.0-post1 后，执行任务时前端不持续显示最新状态（转圈不消失或状态卡住），需手动刷新。 | [Issue #8949](https://github.com/agentscope-ai/CoPaw/issues/8949) | 暂无明确 Fix PR | 调查中 |
| **Medium** | **Markdown 渲染错误**: 单个 `~` 被误解析为删除线定界符，导致数字区间（如 `600~1500`）显示异常且字符丢失。 | [Issue #8948](https://github.com/agentscope-ai/CoPaw/issues/8948) | [PR #8961](https://github.com/agentscope-ai/CoPaw/pull/8961) | 修复已提交，待合并 |
| **Medium** | **Code Mode 工具泄漏**: 从 Code Mode 会话生成 Subagent 时，父级 `_execution_toolkit` 泄漏到子级，导致 `run_code` 调用失败。 | [Issue #8954](https://github.com/agentscope-ai/CoPaw/issues/8954) | 暂无明确 Fix PR | 新报告 |
| **Medium** | **Code Mode 工具调用失败**: 代码模式下 `run_tool_batch` 调用失败，涉及 `CodeModeToolkit` 内部 `run_code` 暴露问题。 | [Issue #8903](https://github.com/agentscope-ai/CoPaw/issues/8903) | 暂无明确 Fix PR | 调查中 |
| **Low** | **Windows 测试失败**: 12 个插件安装测试在 Windows 环境下因符号链接权限、包初始化延迟和 venv launcher PID 问题失败。 | [Issue #8941](https://github.com/agentscope-ai/CoPaw/issues/8941) | 已关闭 (Closed) | 已解决/标记为环境问题 |
| **Low** | **Video Memory JSON 解析**: 多个 PR (#8917, #8932, #8933) 修复了 video_memory 模块中 JSON 提取、段折叠和主题类型转换的边界情况错误。 | [PR #8917](https://github.com/agentscope-ai/CoPaw/pull/8917) 等 | 已提交 | 待合并 |

## 6. 功能请求与路线图信号
*   **运行时基础路径支持 (Runtime Base-Path)**:
    *   **[PR #8719](https://github.com/agentscope-ai/CoPaw/pull/8719)** (Open, Size XXXL): 支持通过 `QWENPAW_BASE_PATH` 环境变量在反向代理前缀下部署 Console 和 API。
    *   **信号**: 这是一个企业级部署的重要特性，PR 尺寸巨大且涉及核心配置加载逻辑，表明团队正在增强项目的云原生/嵌入式部署能力。虽未合并，但被标记为 Under Review，预计将纳入下一大版本。
*   **治理层规则配置化**:
    *   **[Issue #8955](https://github.com/agentscope-ai/CoPaw/issues/8955)** (Open): 用户指出治理层内置规则 (governance builtin rules) 无法配置或禁用，与工具守卫层 (tool_guard) 独立造成困惑。
    *   **信号**: 用户对更细粒度的安全控制有强烈需求。目前无对应 PR，可能需要维护者在架构层面评估是否将治理层规则并入统一的配置体系。
*   **企业版 Platform-Worker 整合**:
    *   **[Issue #8959](https://github.com/agentscope-ai/CoPaw/issues/8959)** (Open): 用户提交企业版 Platform-Worker 实现的技术评审请求，探讨哪些模块应贡献回上游，哪些应保持为扩展。
    *   **信号**: 社区中有成熟的企业实践正在寻求上游整合，这可能带来 Worker 池管理、多租户隔离等高级特性的上游贡献。

## 7. 用户反馈摘要
*   **痛点 1: 2.3.0.post1 前端体验倒退**: 用户投诉升级后前端状态更新不及时 [Issue #8949](https://github.com/agentscope-ai/CoPaw/issues/8949) 以及表格溢出 [Issue #8845](https://github.com/agentscope-ai/CoPaw/issues/8845)。表明近期前端重构可能引入了对实时状态同步和 CSS 布局的回归。
*   **痛点 2: 渠道稳定性**: QQ 渠道用户发现连接断开后无法自动恢复 [Issue #8962](https://github.com/agentscope-ai/CoPaw/issues/8962)，这对依赖 IM 渠道的用户是严重干扰。
*   **痛点 3: 核心逻辑透明度**: 用户对 Doom-loop 门控为何不生效表示困惑 [Issue #8712](https://github.com/agentscope-ai/CoPaw/issues/8712)，修复后增强了用户对 Agent 安全边界的信任。
*   **正面反馈**: 虽然 Bug 较多，但社区响应速度快，多数新报告的 Bug 在 24-48 小时内就有对应的 Fix PR 提交 [PR #8963, #8961, #8965](https://github.com/agentscope-ai/CoPaw/pulls)，体现了核心维护团队的高效运维能力。

## 8. 待处理积压
*   **[PR #7211](https://github.com/agentscope-ai/CoPaw/pull/7211): fix(runtime): prevent injected context from persisting (Open since 2026-08-21)**
    *   **风险**: 此 PR 已挂起超过 3 个月，标记为 `Under Review` 和 `ready-for-human-review`。它解决的是一个可能导致数据持久化污染的关键逻辑问题。建议维护者指派 senior maintainer 进行代码审查，避免长期积压影响主线代码质量。
*   **[PR #8719](https://github.com/agentscope-ai/CoPaw/pull/8719): feat(console): support runtime base-path deployment (Open since 2026-11-13)**
    *   **风险**: Size XXXL 的大型功能 PR，涉及核心部署逻辑。由于规模大，审查成本低效。建议拆分 PR 或在周会中专项讨论，以便尽快合并以支持企业级部署需求。
*   **[Issue #8949](https://github.com/agentscope-ai/CoPaw/issues/8949): [Bug]: 升级2.3.0-post1后，执行任务前端不持续显示最新状态 (Open since 2026-11-27)**
    *   **风险**: 这是一个影响核心用户流程（任务执行监控）的 Bug，目前尚未关联到明确的 Fix PR。鉴于 2.3.0.post1 是较新发布，需优先排查是前端 SDK 轮询问题还是后端 SSE/WebSocket 推送问题，避免用户迁移受阻。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-11-28
**数据源：** GitHub (zeroclaw-labs/zeroclaw)

## 1. 今日速览
2026-11-28 期间，ZeroClaw 社区保持高度活跃，过去 24 小时内共有 **10 条 Issue** 更新和 **50 条 Pull Request** 待合并。项目核心精力集中在 **MCP 服务稳定性修复**、**Web 界面交互优化** 以及 **v1.0.0 路线图规划**。尽管暂无新版本发布，但针对关键组件（如 Gateway 健康检查、MCP 连接重试、OpenRouter 工具结果解析）的修复 PR 正在密集推进，显示出项目在迈向 1.0 稳定版前的冲刺态势。活跃度评估为：**高**，工程团队对关键 Bug 响应迅速。

## 2. 版本发布
*无最新版本发布。*

## 3. 项目进展
今日无 PR 被合并，但有大量高价值 PR 已完成开发并处于 Review 阶段，主要推进了以下方向：

*   **MCP 稳定性强化**：[PR #12769](https://github.com/zeroclaw-labs/zeroclaw/pull/12769) 和 [PR #12768](https://github.com/zeroclaw-labs/zeroclaw/pull/12768) 旨在解决 MCP 启动时的瞬时失败导致 Agent 丢失工具的问题，并优化 Gateway `/health` 端点在启动期间的响应行为，这对生产环境可用性至关重要。
*   **安全性与策略一致性**：[PR #12778](https://github.com/zeroclaw-labs/zeroclaw/pull/12778) 修复了 `SecurityPolicy` 中 `allowed_commands` 解析逻辑不一致的问题，消除了潜在的安全策略绕过风险。[PR #12744](https://github.com/zeroclaw-labs/zeroclaw/pull/12744) 引入了更安全执行 Skill 的方式，支持直接传入参数而不经过 Shell 解释。
*   **Provider 生态扩展**：[PR #12264](https://github.com/zeroclaw-labs/zeroclaw/pull/12264) 新增了 LLMTR 网关支持，[PR #12085](https://github.com/zeroclaw-labs/zeroclaw/pull/12085) 将 Obscurify.ai 设为原生 Provider 类型，进一步丰富了模型接入能力。

## 4. 社区热点
以下 Issue 和 PR 是该时段内讨论度最高或战略意义最强的条目：

*   **[Tracker]: Roadmap to v1.0.0** ([#12712](https://github.com/zeroclaw-labs/zeroclaw/issues/12712))
    *   **分析**：社区最关注的路线图更新。明确了从当前版本到 1.0.0 的发布顺序和目标日期，替代了旧文档中的版本计划。获得 community 👍 支持，反映了用户对项目长期稳定性的期待。
*   **Gemini Provider Modernization** ([#12669](https://github.com/zeroclaw-labs/zeroclaw/issues/12669))
    *   **分析**：应对 Google 退役 Gemini CLI 和 Code Assist OAuth 的必要技术迁移。追踪项目向 Gemini API Keys、Vertex AI 等支持路径迁移的进度，是保持核心 Provider 功能可用的关键任务。
*   **Web Chat Input Focus Bug** ([#11658](https://github.com/zeroclaw-labs/zeroclaw/issues/11658))
    *   **分析**：标记为 `in-progress`，持续受人关注。虽然被标记为 S3（轻微），但直接影响日常对话体验。新相关 Issue [#12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746) 进一步细化了断线重连后的焦点丢失问题。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在 **Web 端交互**、**MCP 连接健壮性** 和 **Provider 数据处理** 上。

| 严重程度 | Issue/PR | 标题/摘要 | 状态/Fix PR |
| :--- | :--- | :--- | :--- |
| **S1 (阻断)** | [#12774](https://github.com/zeroclaw-labs/zeroclaw/issues/12774) | **OpenRouter 丢弃声明的工具结果图像附件**<br>`OpenRouterModelProvider` 仅读取 `"content"` 字符串，忽略 `"attachments"` 数组。 | 待修复 (相关 PR: [#12776](https://github.com/zeroclaw-labs/zeroclaw/pull/12776) 可能包含修复) |
| **S1 (阻断)** | [#12773](https://github.com/zeroclaw-labs/zeroclaw/issues/12773) | **Quickstart 无法配置 Lark/Feishu 凭证**<br>快速配置向导未询问 `app_id`/`app_secret`，写入的配置块在重启时丢失。 | 待修复 |
| **S1 (阻断)** | [#12766](https://github.com/zeroclaw-labs/zeroclaw/issues/12766) | **Gateway 启动期间 MCP 连接时不响应 /health**<br>导致 Kubernetes liveness probe 失败并错误重启 Daemon。 | **Fix PR: [#12768](https://github.com/zeroclaw-labs/zeroclaw/pull/12768)** |
| **S2 (降级)** | [#12767](https://github.com/zeroclaw-labs/zeroclaw/issues/12767) | **MCP 启动时瞬时故障导致 Agent 无工具**<br>HTTP 429/503 或连接拒绝后，Agent 直到重启才恢复 MCP 工具，但 `/health` 仍显示绿色。 | **Fix PR: [#12769](https://github.com/zeroclaw-labs/zeroclaw/pull/12769)** |
| **S3 (轻微)** | [#11658](https://github.com/zeroclaw-labs/zeroclaw/issues/11658) / [#12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746) | **Web Chat 输入框失去焦点**<br>Agent 回复结束后或页面重连后，消息输入框未自动恢复焦点。 | In Progress |
| **S3 (轻微)** | N/A | **Log 时间戳比较错误**：RFC 3339 时间戳按文本比较导致带有小数秒的时间被错误过滤。 | **Fix PR: [#12755](https://github.com/zeroclaw-labs/zeroclaw/pull/12755)** |
| **S3 (轻微)** | N/A | **Memory 日期边界过滤错误**：带后缀的 Markdown 日志文件名未被正确识别为日期，导致召回窗口错误。 | **Fix PR: [#12761](https://github.com/zeroclaw-labs/zeroclaw/pull/12761)** |

> **稳定性观察**：MCP 相关的两个 S1/S2 Bug 及其对应的 Fix PR (#12768, #12769) 揭示了当前生产部署中 Kubernetes 场景下的一个系统性隐患（启动时序与健康检查）。一旦合并，将显著提升 ZeroClaw 在云原生环境下的稳定性。

## 6. 功能请求与路线图信号
*   **MCP 工具细粒度控制**：[#12772](https://github.com/zeroclaw-labs/zeroclaw/issues/12772) 请求支持在 `mcp_bundles` 中排除特定 MCP 工具。考虑到 MCP 已成为核心集成方式，此功能能增强策略灵活性，可能被纳入近期迭代。
*   **新渠道支持 - Buzz (buzz.xyz)**：[#12765](https://github.com/zeroclaw-labs/zeroclaw/issues/12765) 请求添加 Buzz 渠道支持。Buzz 是 Block 开发的开源 Slack 替代品。随着开源生态的发展，增加此类主流开源 IM 支持符合 ZeroClaw 的开源定位。
*   **macOS Computer Use Tool**：[#12776](https://github.com/zeroclaw-labs/zeroclaw/pull/12776) 添加了一个由 Feature Flag 控制的 `computer_use` 工具。这表明 ZeroClaw 正在探索 Agent 在本地桌面环境中的操作能力，是“个人 AI 助手”定位的重要延伸。
*   **Discord Slash Commands**：[#12771](https://github.com/zeroclaw-labs/zeroclaw/pull/12771) 提议将内置聊天命令暴露为 Discord Slash Commands，以提升 Discord 用户的体验一致性。

## 7. 用户反馈摘要
*   **痛点 1：Web 端交互体验粗糙**。用户多次抱怨 Web Dashboard 中聊天输入框焦点丢失问题（#11658, #12746），这在连续对话场景下非常打断心流。建议尽快合并相关 UI 修复。
*   **痛点 2：配置复杂性与易错性**。Lark/Feishu 快速配置向导的 Bug (#12773) 表明 onboarding 流程在某些渠道上存在逻辑漏洞，导致用户配置无效。此外，Security Policy 的解析不一致 (#12778) 也暗示了配置系统的复杂性可能引发用户困惑和安全风险。
*   **痛点 3：生产环境可靠性**。Kubernetes 用户报告了 MCP 故障导致服务被误杀的问题 (#12766, #12767)。这反映了用户在生产环境中对 ZeroClaw 的依赖程度正在提高，对稳定性和可观测性（如准确的 /health 状态）要求更高。
*   **满意点**：社区对 v1.0.0 路线图的清晰化 (#12712) 表示认可，认为这为项目长期发展提供了明确预期。

## 8. 待处理积压
*   **高优先级积压**：以下已提交修复但尚未合并的 PR 应优先处理，因为它们解决了 S1/S2 级别的严重问题：
    *   [#12768](https://github.com/zeroclaw-labs/zeroclaw/pull/12768) (Fix: /health during startup)
    *   [#12769](https://github.com/zeroclaw-labs/zeroclaw/pull/12769) (Fix: MCP retry & health reporting)
    *   [#12778](https://github.com/zeroclaw-labs/zeroclaw/pull/12778) (Fix: Security policy parsing consistency)
*   **长期未决**：Web Chat 焦点问题 (#11658) 自 10 月 11 日起开放，虽标记为 S3，但因反馈频繁且修复成本可能不高，建议尽快行动以提升用户满意度。
*   **路线图依赖**：Gemini Provider 迁移 (#12669) 是紧迫的外部依赖任务，需确保资源投入以符合 Google API 的退役时间表。

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*