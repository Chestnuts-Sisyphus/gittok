# OpenClaw 生态日报 2026-10-18

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-10-17 21:52 UTC

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

**NanoBot 项目日报 – 2026‑10‑18**  

---

## 1. 今日速览  
- 项目在过去 24 小时内保持高活跃度：**2 条新 Issue**、**40 条 PR 动态**（其中 20 条已合并/关闭）。  
- 代码审查和测试工作密集，超过半数的 PR 已进入合并或关闭状态，显示核心维护者正集中处理技术债务与功能完善。  
- 没有新的 Release，意味着目前的改动仍在内部验证阶段，项目整体处于 **“快速迭代、稳步收敛”** 的节奏。  

---

## 2. 版本发布  
> **（本日暂无正式 Release）**  

---

## 3. 项目进展  

| 类别 | PR 编号 | 标题 / 关键改动 | 状态 | 影响范围 |
|------|--------|----------------|------|----------|
| **功能合并** | #6261 | **feat: unify instance storage under home (NAN‑264)** – 将实例、配置、工作区统一映射到 `home` 目录，解决多配置冲突。 | 已合并 | 影响所有本地运行的实例管理与配置迁移，提升可移植性。 |
| **关键重构** | #6271 | **refactor(settings): let the config store own read‑modify‑write transactions** – 配置文件写入改为事务化，避免并发冲突。 | 已合并 | 提升 WebUI 与 CLI 的并发安全性，降低配置损坏风险。 |
| **安全修复** | #5866 | **fix(cli‑apps): record install provenance, fail closed on registry drift** – 增加安装元信息记录，防止注册表漂移导致的供应链攻击。 | 已合并 | 直接提升 CLI 应用生态的供应链安全。 |
| **平台兼容** | #6283 | **fix(deepseek): align model capabilities with the official API** – 修正 DeepSeek‑Flash 多模态模型的能力描述与官方保持一致。 | 已合并 | 保障使用 DeepSeek 模型的用户得到完整的图片输入支持。 |
| **Bug 关闭** | #6279 | **feat(webui): rename sidebar topics inline** – 支持在侧边栏直接编辑话题标题，避免弹窗中断对话。 | 已关闭 | 改善 WebUI 使用流畅度。 |
| **测试提升** | #6282 | **test: replace false‑green checks with behavioral coverage** – 用行为覆盖替代虚假通过的单元测试。 | 已关闭 | 提高测试质量，降低回归风险。 |
| **文档/Provider** | #5875 | **feat(providers): add IO Intelligence (io.net) provider** – 新增 IO Intelligence 推理后端。 | 已关闭 | 扩展可选模型供应商，吸引新用户。 |

> **总体评估**：本轮合并的 PR 以 **配置事务化、实例统一、供应链安全、模型兼容** 为核心，显著提升了系统的可靠性与可维护性。  

---

## 4. 社区热点  

| 类型 | 编号 | 标题 | 评论/👍 | 链接 | 背后诉求 |
|------|------|------|--------|------|----------|
| **Issue** | #6079 | *Allow agents to observe group messages without always replying* | 1 / 0 | <https://github.com/HKUDS/nanobot/issues/6079> | 需求在多方聊天中区分“观察”与“回复”，避免不必要的噪声，提高代理在群组场景的可控性。 |
| **Issue** | #5833 | *SSE Responses consumer drops `response.reasoning_text.*` events* | 1 / 0 | <https://github.com/HKUDS/nanobot/issues/5833> | 开发者发现 SSE 流中推理文本被意外截断，影响调试与可解释性。 |
| **PR** | #6271 | *refactor(settings): let the config store own read‑modify‑write transactions* | — | <https://github.com/HKUDS/nanobot/pull/6271> | 受配置并发冲突问题驱动，社区期待更稳健的设置保存机制。 |
| **PR** | #6168 | *feat(update): integrate managed installs and recoverable in‑app updates* | — | <https://github.com/HKUDS/nanobot/pull/6168> | 关注自动化更新与回滚能力，尤其在企业部署场景下需求强烈。 |

> **热点分析**：两条 Issue 均聚焦 **“运行时可观察性”** 与 **“流式响应完整性”**，表明用户在生产环境中对 **可靠的事件流** 与 **细粒度控制** 有明确需求。相应的 PR（尤其 #6271）则体现社区对 **内部事务安全** 的共识。

---

## 5. Bug 与稳定性  

| 严重程度 | 编号 | 类型 | 简要描述 | 是否已有 Fix PR |
|----------|------|------|----------|-----------------|
| **高** | #5866 | Security | CLI 应用安装缺乏 provenance，易受注册表漂移攻击。 | ✅ 已合并（#5866） |
| **高** | #6283 | Provider | DeepSeek‑Flash 多模态模型图片被错误剔除，导致功能缺失。 | ✅ 已合并（#6283） |
| **中** | #6140 | Tool | `read_file` 行号计数与 `edit_file` 不一致，导致编辑定位错误。 | ✅ 已合并（#6140） |
| **中** | #6138 | UI | Matrix 消息编辑后 HTML 格式丢失，影响展示。 | ✅ 已合并（#6138） |
| **中** | #6197 | Web | 大小写不敏感的 Image MIME 类型未被识别，返回文本而非图片。 | ✅ 已合并（#6197） |
| **低** | #6270 | Agent | 流式内联推理失去段落分隔符，文本连贯性受损。 | ✅ 已合并（#6270） |
| **低** | #6254 | Tools | JSON 整数参数接受 `3.0`（float）导致类型错误。 | ✅ 已合并（#6254） |
| **低** | #6253 | Media | Unicode 文件名超出字节限制导致上传失败。 | ✅ 已合并（#6253） |
| **低** | #6097 | Documents | 读取仅含图表的 XLSX 工作表时报错，影响文档抓取。 | ✅ 已合并（#6097） |

> **结论**：本日已覆盖所有已报告的高、中、低危 Bug，尤其安全与模型兼容性问题得到快速处理，项目的 **稳定性与安全基线** 明显提升。

---

## 6. 功能请求与路线图信号  

| 编号 | 类型 | 需求概述 | 与现有 PR 的关联度 | 可能纳入的下个版本 |
|------|------|----------|-------------------|-------------------|
| #6079 | Enhancement | 代理在群组聊天中仅观察而不自动回复的开关 | 与 **#6261**（统一实例存储）配合，可在配置层面加入 `group_observe_only` 标记。 | **候选**（预计在下个 minor 里实现） |
| #5833 | Bug/Feature | 完整转发 SSE 推理文本事件 | 需要在 **`nanobot/providers/openai_responses/parsing.py`** 中补全缺失分支。 | **候选**（已在内部讨论） |
| #6261 | Feature | 将实例、配置、工作区统一映射到 `home` 目录 | 已合并，直接满足多实例管理需求。 | 已交付 |
| #6271 | Refactor | 配置事务化写入，防止并发冲突 | 已合并，提升平台可靠性。 | 已交付 |
| #6168 | Feature | 托管式安装与可恢复的应用内更新 | 已合并（未正式发布），为未来 **自动更新** 打下基础。 | 预计在 **v0.12** 中开放 |

> **路线图建议**：将 **#6079** 与 **#5833** 视为下一个功能迭代的重点，因它们直接影响用户在复杂聊天场景下的体验与调试效率。可以在下一次 Minor Release（预计 2026‑11‑中）中同步推出。

---

## 7. 用户反馈摘要  

- **群聊噪声**：Issue #6079 的提出者指出，当前代理在多成员对话里总是自动回复，导致信息冗余。用户希望能在 **“观察模式”** 与 **“主动回复模式”** 之间自由切换。  
- **流式调试信息缺失**：Issue #5833 中的反馈表明，开发者在使用 SSE 进行推理时，关键的 `reasoning_text` 事件被丢弃，影响模型行为的可解释性。  
- **安全担忧**：通过 #5866 的安全修复，用户对 **供应链完整性** 表现出高度关注，期待官方继续提供 provenance 与签名校验。  
- **使用体验**：多个 UI 相关的 Bug（#6138、#6279、#6281）反映出 **编辑/搜索** 交互细节仍有提升空间，尤其在 **Markdown 渲染** 与 **侧边栏编辑** 方面。  

整体来看，用户对 **功能可配置性、可靠的事件流、以及安全性** 的需求最为迫切。

---

## 8. 待处理积压  

| 编号 | 类型 | 创建时间 | 当前状态 | 备注 |
|------|------|----------|----------|------|
| #5833 | Issue (bug) | 2026‑09‑20 | **OPEN** | 仍未收到官方响应，涉及 SSE 推理文本，建议指派至负责 `openai_responses` 的维护者。 |
| #6079 | Issue (enhancement) | 2026‑10‑05 | **OPEN** | 已获得 1 条评论，但缺少实现计划。可在下个冲刺中列入议程。 |
| #6271 | PR | 2026‑10‑17 | **OPEN** (等待最终审查) | 虽已通过 CI，仍需核心维护者的最终批准后合并。 |
| #6168 | PR | 2026‑10‑12 | **OPEN** (合并受阻) | 受内部审批流程限制，需安全团队复审后方可发布。 |
| #5490 | PR (closed) | 2026‑08‑22 | **CLOSED** (已合并) | 但相关文档更新仍未同步，需补充说明。 |

> **提醒**：上述积压中，**#5833** 与 **#6079** 是社区最关注的两项，建议在本月的社区会议中优先讨论并制定实现路线。

---

### 项目健康度结论  

- **活跃度**：高（40 条 PR、2 条 Issue），社区参与度稳步提升。  
- **质量**：大量 Bug 已在同一天得到修复，测试覆盖与安全审计同步推进。  
- **可持续性**：核心重构（配置事务、实例统一）为后续功能扩展奠定坚实基础。  
- **风险**：仍有关键的 SSE 事件缺失问题未解决，需尽快落实。  

总体而言，NanoBot 正在 **“快速迭代 + 稳健收敛”** 的良性循环中，预计在接下来的 1‑2 个月内会迎来一次面向生产环境的 Minor Release。  

---  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目动态日报**  
*时间：2026‑10‑18*  

---

### 1. 今日速览  
- 过去24小时 GitHub 活动仅有 **1 条 Issue**（已关闭）与 **1 条 PR**（已合并）。  
- 无新版本发布，项目整体保持 **低但稳定的活跃度**。  
- 关闭的 Issue 与 PR 均为 **stale** 标记，说明社区在“维护”阶段，暂无紧急功能迭代。  

---

### 2. 版本发布  
- **无** 新版本发布，当前最新版仍为 **v0.x**（请参阅 `releases` 页面，暂无变更）。  

---

### 3. 项目进展  
| PR 号 | 标题 | 主要贡献 | 备注 |
|------|------|----------|------|
| [#3414](https://github.com/sipeed/picoclaw/pull/3414) | feat(agent): add wall‑clock turn time budget | 引入 `agents.defaults.turn_time_budget_seconds` 配置项，支持每回合的最大耗时阈值；在超过阈值时让代理停止工具调度并返回摘要。 | 已关闭并合并，功能对多轮对话的响应速度与资源利用率提供了可配置的保障。 |

- 该 PR 通过在 Agent 侧实现“时间预算”机制，为长轮询或高负载场景提供了 **更可控的资源管理**，进一步提升了系统的可扩展性。  

---

### 4. 社区热点  
| Issue/PR | 链接 | 主要议题 | 讨论度 |
|----------|------|----------|--------|
| [#3415](https://github.com/sipeed/picoclaw/issues/3415) | 问题：是否支持将 Web Console 挂载到 `/pico/` 前缀下 | 需求：在同一域名下通过 Nginx 反向代理，保持所有资源与 API 在 `/pico/` 前缀下；前端/后端需适配新路径。 | 2 条评论，暂无响应；已标记为 **stale**。 |

- 该 Issue 反映了**部署灵活性**的痛点，尤其是多租户或嵌入式场景下的路径隔离需求。虽未得到回应，但已被标记为 stale，说明开发者可能未优先处理。  

---

### 5. Bug 与稳定性  
| Bug | 影响 | 状态 | 备注 |
|-----|------|------|------|
| 无 |  |  |  |

- 过去24小时未报告新的 Bug 或崩溃。  
- 所有已存在的 bug 均已在历史 PR 中解决，无需新修复。  

---

### 6. 功能请求与路线图信号  
| 需求 | 来源 | 关联 PR | 评估 |
|------|------|---------|------|
| 反向代理路径前缀支持 (`/pico/`) | Issue #3415 | 无 | 需求明确且常见，但尚无 PR 或实现计划；若需进入下一版本，需在后端/前端添加可配置的前缀。 |
| Wall‑clock turn time budget | PR #3414 | 已实现 | 该功能已在 0.x 版中完成，作为“稳定性与性能”优化，表明路线图关注资源控制。 |

- 目前下一版本的功能重点可能是进一步优化 **Agent 资源管理** 与 **多租户部署**。  

---

### 7. 用户反馈摘要  
- **痛点**：缺少路径前缀配置，导致在多服务环境部署困难。  
- **使用场景**：在同一域名下挂载多个应用（如主站、后台、PicoClaw）。  
- **满意度**：无直接满意反馈；部分用户仅提出功能需求。  

---

### 8. 待处理积压  
- **Issue #3415**（stale，未回应）——路径前缀支持是常见部署需求，建议维护者关注并评估实现优先级。  
- 其余 Issue/PR 均已解决或无新活动。  

---

**总结**  
PicoClaw 项目在 2026‑10‑18 的日常运营相对平稳，主要活动集中在一次功能性 PR 的合并与一条已关闭的 stale Issue。项目总体健康度良好，但在**多租户部署**与**前端/后端路径配置**方面存在待完善空间，建议后续迭代可关注此类需求。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 2026‑10‑18 项目日报**

| 项目 | 内容 |
|------|------|
| **项目仓库** | <https://github.com/nanocoai/nanoclaw> |
| **报告日期** | 2026‑10‑18 |
| **PR 状态** | 16 PR（15 待合并，1 已合并/关闭） |
| **Issue 状态** | 0 Issue（新增/活跃 0，已关闭 0） |
| **新版本发布** | 0 |

---

### 1. 今日速览  
过去 24 小时内，NanoClaw 维持高水平的代码贡献活跃度：共提交 16 条 Pull Request，均来自核心团队成员。虽然未出现新 Issue，但 PR 讨论热度较高，尤其是涉及 **Discord** 与 **Telegram** 的功能改进。整体活跃度保持稳定，项目核心功能迭代持续推进。

### 2. 版本发布  
- **暂无新版本发布**。 目前没有 `vX.Y.Z` 版号发布，项目继续在 `main` 分支进行迭代。

### 3. 项目进展  
| PR | 状态 | 关键改动 | 业务价值 |
|---|---|---|---|
|[#4042](https://github.com/nanocoai/nanoclaw/pull/4042) | 合并 | Resend 适配器 pin 0.3.0，消除 4 项 `npm audit` 中的 moderate 警告 | 提升安全性，降低未来安全合规风险 |
|[#4113](https://github.com/nanocoai/nanoclaw/pull/4113) | 待合并 | Setup 模板库 picker 改为读取 `index.json`，避免扫描 `plugin.json` | 加速安装流程、降低磁盘 IO |
|[#4112](https://github.com/nanocoai/nanoclaw/pull/4112) | 待合并 | 允许在聊天中通过模板创建新 Agent | 改善用户体验，缩短 Agent 上手时间 |
|[#4106](https://github.com/nanocoai/nanoclaw/pull/4106) | 待合并 | Gateway Credential 可绑定单一路径 | 提升连接安全性、减少凭证泄露风险 |

> **整体推进幅度**：已合并 PR 解决安全问题；待合并 PR 在安装体验、Agent 自动化、连接安全等三大方向加速项目功能成熟度。

### 4. 社区热点  
- **[#4113](https://github.com/nanocoai/nanoclaw/pull/4113)**：讨论最多（10 条评论），关注点是 **安装时间** 与 **模板管理** 的效率。  
- **[#4112](https://github.com/nanocoai/nanoclaw/pull/4112)**：讨论 7 条评论，主诉是“手动写 persona 费时”，提议使用模板一键创建。  
- **[#4117](https://github.com/nanocoai/nanoclaw/pull/4117)**：讨论 6 条评论，核心痛点是 **Discord** 的批准/拒绝按钮误判，影响交互体验。

> 这些 PR 反映了社区对 **安装友好度**、**Agent 交互** 和 **渠道兼容性** 的高度关注。

### 5. Bug 与稳定性  
| PR | Bug 归类 | 严重程度 | 解决状态 |
|---|---|---|---|
|[#4117](https://github.com/nanocoai/nanoclaw/pull/4117) | Discord 交互错误 | 中 | 待合并 |
|[#4101](https://github.com/nanocoai/nanoclaw/pull/4101) | SQLite 打开冲突 | 高 | 待合并 |
|[#3923](https://github.com/nanocoai/nanoclaw/pull/3923) | Discord Gateway 代理失效 | 中 | 待合并 |
|[#2752](https://github.com/nanocoai/nanoclaw/pull/2752) | Discord 附件未下载 | 中 | 待合并 |
|[#3859](https://github.com/nanocoai/nanoclaw/pull/3859) | WhatsApp 未命名组 | 低 | 待合并 |
|[#3752](https://github.com/nanocoai/nanoclaw/pull/3752) | WhatsApp 未回答问题 | 低 | 待合并 |
|[#3751](https://github.com/nanocoai/nanoclaw/pull/3751) | WhatsApp 邮件 JID 拒绝 | 低 | 待合并 |

> **总评**：所有 Bug PR 均已提交修复代码，暂无严重未解决的安全漏洞；待合并的 PR 需要在 24‑48 h 内完成审查以保障稳定性。

### 6. 功能请求与路线图信号  
| PR | 功能请求 | 评估 | 预估加入时间 |
|---|---|---|---|
|[#4112](https://github.com/nanocoai/nanoclaw/pull/4112) | 聊天内 Agent 模板化创建 | 高 | v0.12（预计 2026‑12） |
|[#4113](https://github.com/nanocoai/nanoclaw/pull/4113) | Setup 模板库索引化 | 中 | v0.12 |
|[#4106](https://github.com/nanocoai/nanoclaw/pull/4106) | Gateway Credential 路径限制 | 低 | v0.13 |
|[#4115](https://github.com/nanocoai/nanoclaw/pull/4115) /[#4111](https://github.com/nanocoai/nanoclaw/pull/4111) | Telegram Bot‑to‑Bot Admission Gate | 高 | v0.13 |

> 这些功能已在 PR 里实现并通过自动化测试，预计在下一个主版本中上线。

### 7. 用户反馈摘要  
- **安装与配置**：用户希望更快速、无手动扫描的模板选择，PR #4113 正在解决。  
- **Agent 管理**：手动编写 Agent persona 的痛点在 PR #4112 里被提及，用户期望“一键”方式。  
- **渠道交互**：Discord 和 WhatsApp 的按钮、附件解析错误导致用户体验下降，已在多条 PR 中得到讨论。  

> 反馈主要集中在 **操作效率** 与 **多渠道交互** 的可靠性上。

### 8. 待处理积压  
| PR | 说明 | 状态 | 推荐优先级 |
|---|---|---|---|
|[#4113](https://github.com/nanocoai/nanoclaw/pull/4113) | 改进安装模板 picker | 待合并 | ★★★ |
|[#4112](https://github.com/nanocoai/nanoclaw/pull/4112) | 聊天内创建 Agent | 待合并 | ★★★ |
|[#4106](https://github.com/nanocoai/nanoclaw/pull/4106) | Gateway Credential 细化 | 待合并 | ★★ |
|[#4117](https://github.com/nanocoai/nanoclaw/pull/4117) | Discord 交互误判 | 待合并 | ★★★ |
|[#3923](https://github.com/nanocoai/nanoclaw/pull/3923) | Discord 代理支持 | 待合并 | ★★ |
|[#3601](https://github.com/nanocoai/nanoclaw/pull/3601) | Telegram 回复识别 | 待合并 | ★★ |
|[#1938](https://github.com/nanocoai/nanoclaw/pull/1938) | launchd PATH 修复 | 待合并 | ★★ |

> **建议**：核心团队可在 24 h 内优先评审前两条 PR，以加速核心功能上线。

---

**结语**  
NanoClaw 今日保持了高质量的 PR 推送与活跃讨论，安全性与稳定性改进得到同步推进。建议维护者重点关注 Discord 与 Telegram 相关的交互 Bug，并加快 Agent 模板化功能的合并，以提升整体用户体验。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 (2026-10-18)

## 1. 今日速览
NullClaw 项目今日处于**低活跃维护期**。过去 24 小时内，社区未产生任何新的 Issue 讨论，也无已合并的代码变更或新版本发布。总体状态平稳但略显沉寂，主要动态集中在一个新增第三方模型提供商的待合并 PR 上。目前无紧急的稳定性风险，但功能迭代节奏较缓，需观察社区是否有新的需求爆发。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
*今日无 PR 被合并或关闭。*
项目代码库在昨日（2026-09-28）至昨日截止的 24 小时窗口内无明显功能性落地。唯一的代码变动迹象是 PR #1013 的更新，但尚未正式进入主干分支。

## 4. 社区热点
目前无高度活跃（高评论/高反应）的社区讨论。仅有一条处于 **OPEN** 状态的功能增强 PR 获得了最近的代码更新：

*   **[OPEN] feat(providers): add Tsubasa chat-completions provider** ( [PR #1013] )
    *   **链接**: https://github.com/nullclaw/nullclaw/pull/1013
    *   **分析**: 该 PR 由用户 `cenab` 发起，旨在将 **Tsubasa** 模型纳入 NullClaw 的 OpenAI 兼容提供商工厂。
    *   **诉求**: 用户希望扩展 LLM 后端支持的多样性，特别是针对具有特定上下文窗口（32,768 tokens）和默认输出预算（8,192 tokens）的模型进行标准化接入。这反映了社区对更多私有或特定服务提供商标识的需求。
    *   **状态**: 该 PR 在 2026-10-17 有更新记录，表明作者仍在维护中，等待维护者审核。

## 5. Bug 与稳定性
*今日无新的 Bug 报告、崩溃日志或回归问题被提出。*
项目当前无已知的高优先级稳定性风险（P0/P1）。由于缺乏新提交的 Bug 数据，暂无 fix PR 关联。

## 6. 功能请求与路线图信号
*今日无新的用户功能请求（Feature Request Issues）。*

**潜在路线图信号**：
*   **多模型提供商扩展**: PR #1013 表明项目正在持续扩充 `providers` 模块。如果该 PR 被合并，Tsubasa 将正式加入模型目录（Model Catalog）。这是一个持续性的路线图方向，即“广覆盖主流及小众 OpenAI-compatible API”。
*   **上下文管理优化**: PR 摘要中提到了对 `stock agent prompt` 与模型上下文窗口的适配（8,192 output budget vs 32,768 context），暗示团队在关注不同模型对系统提示词长度的兼容性处理，这可能影响后续的 Agent 逻辑优化。

## 7. 用户反馈摘要
*因过去 24 小时内无新增 Issue 或 PR 评论，暂无新的用户痛点、使用场景或满意度反馈数据。*

## 8. 待处理积压
*在提供的 24 小时数据窗口内，未显示长期未响应的重要 Issue。*

**维护者关注建议**：
*   **PR #1013**: 该 PR 自 2026-09-28 创建，至今约 20 天处于 Open 状态。虽然昨日有更新，但建议维护者优先审阅此 PR。它涉及核心提供商工厂的代码修改，若通过，可直接提升 NullClaw 对 Tsubasa 用户的支持度，是一个低风险、高收益的功能添加。

---
*数据来源: GitHub NullClaw API 快照 @ 2026-10-18*
*活跃度评级: 🔵 低 (Stable/Low Activity)*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期：2026-10-18**
**数据来源：** GitHub netease-youdao/LobsterAI

## 1. 今日速览
过去 24 小时内，LobsterAI 项目保持中等活跃度，核心开发精力集中在 **Cowork 模块的架构重构** 与 **底层资源治理**。虽然暂无版本发布及代码合并记录，但社区提交了 6 个高质量 Pull Request，涉及移除遗留兼容层、优化自定义 Provider 支持及磁盘空间限制等关键基础设施改进。项目目前处于“静默重构期”，维护者正在为下一版本（release/2026.10.19）做底层清理工作，旨在提升长期运行的稳定性与多模型适配能力。

## 2. 版本发布
*（过去 24 小时无新版本发布）*

## 3. 项目进展
过去 24 小时内**无 PR 被合并或关闭**，所有 6 个 PR 均处于 `OPEN` 状态待审查。不过，从 PR 内容来看，项目正在经历一次显著的**技术债务清理**和**架构现代化**：

*   **架构简化**：PR [#2898](https://github.com/netease-youdao/LobsterAI/pull/2898) 和 [#2897](https://github.com/netease-youdao/LobsterAI/pull/2897) 显示项目正在彻底移除 Claude Agent SDK 时代的 OpenAI 兼容代理层（约 3500 行代码），转而直接支持 OpenAI Responses 和 Gemini 原生格式。这表明 LobsterAI 正在从“适配层思维”转向“原生集成思维”，预计能显著降低多模型场景下的维护成本和潜在 Bug。
*   **用户体验优化**：PR [#2896](https://github.com/netease-youdao/LobsterAI/pull/2896) 解决了配置同步导致用户自定义配置丢失的问题，通过引入 `openclaw.user.json` 机制保留用户手动编辑，避免了以往“重启即重置”的痛点。
*   **稳定性治理**：PR [#2893](https://github.com/netease-youdao/LobsterAI/pull/2893) 针对长期运行导致的磁盘占用激增问题（曾达 17GB）进行了修复，为 OpenClaw 数据清理设置了边界，这对企业级长期部署至关重要。

## 4. 社区热点
*（过去 24 小时无高评论量或高反应量的 Issue/PR，当前社区讨论较为收敛，主要聚焦于代码实现层面。）*

## 5. Bug 与稳定性
过去 24 小时无新增 Bug Report，但有两个重要的**稳定性修复 PR** 处于等待合并状态，针对已知痛点：

1.  **磁盘空间无限增长问题**
    *   **严重程度**：高（影响长期运行稳定性）
    *   **现状**：已有 Fix PR [#[2893](https://github.com/netease-youdao/LobsterAI/pull/2893)](https://github.com/netease-youdao/LobsterAI/pull/2893)，旨在限制 `~/Library/Application Support/LobsterAI` 下的备份和缓存文件大小。
    *   **分析**：这是此前用户遇到的严重问题，修复后将显著降低旧版本用户的迁移风险或系统崩溃风险。

2.  **会话列表显示错误**
    *   **严重程度**：中（影响 UI 清晰度）
    *   **现状**：已有 Fix PR [#[1181](https://github.com/netease-youdao/LobsterAI/pull/1181)](https://github.com/netease-youdao/LobsterAI/pull/1181)，用于隐藏内部使用的 OpenClaw 主 Agent 会话，防止其出现在用户可见的 Cowork 列表中。
    *   **注意**：该 PR 创建时间较早（2026-04-01），今日有更新活动，表明维护者正在重新审视此遗留问题。

## 6. 功能请求与路线图信号
**今日新 Issue：**
*   **[Feature] Persist Computer Use app approvals across sessions** ([#2895](https://github.com/netease-youdao/LobsterAI/issues/2895))
    *   **用户痛点**：每次新会话开始使用 Computer Use 功能时，即使同一应用几分钟前刚被批准，仍会重复弹出授权确认。
    *   **技术分析**：目前批准状态仅存储在内存 `Set` 中，未持久化。
    *   **路线图信号**：鉴于 LobsterAI 对效率的追求，此功能大概率会在后续版本中实现，可能涉及将授权状态写入本地存储（如 SQLite 或 JSON 文件）。建议关注后续版本中对“Computer Use”模块的迭代。

**隐含路线图（基于 PR 分析）：**
*   **多模型原生支持**：通过 [PR #2897](https://github.com/netease-youdao/LobsterAI/pull/2897) 可见，项目正大力增强对 OpenAI Responses 和 Gemini 格式的原生支持，未来版本可能会提供更平滑的多模型切换体验。
*   **桌面伴侣功能增强**：[PR #2894](https://github.com/netease-youdao/LobsterAI/pull/2894) 引入了自定义皮肤、截图工具和后续任务跟进功能，显示 Desktop Companion 体验仍是重点打磨方向。

## 7. 用户反馈摘要
*   **配置持久化诉求强烈**：从 Issue 和 PR #2896 的描述可以看出，用户非常在意手动配置（如插件启用、细粒度选项）在重启或同步后不被覆盖。这反映了用户从“小白使用”向“深度定制”过渡的趋势。
*   **重复交互干扰效率**：Issue #2895 指出的“重复弹窗”问题，虽然单次影响小，但在高频使用 Computer Use 的场景下会显著打断工作流，用户对此类“智能豁免”机制有明确期待。
*   **内部机制泄露干扰**：PR #1181 的存在说明内部路由会话对用户可见曾造成困惑，用户偏好“干净”的会话列表，只关注自身与 AI 的交互历史。

## 8. 待处理积压
*   **长期 Open 的 PR**：
    *   **PR #1181** (fix(cowork): hide OpenClaw main agent sessions from session list)：创建于 2026-04-01，今日有更新。由于涉及数据库 schema 变更（添加 `hidden` 列），需仔细审查迁移逻辑。建议维护者优先处理，以避免用户在长期使用该 Bug 版本后合并此 PR 时出现数据兼容性问题。
*   **Stacked PRs 依赖**：
    *   PR #2898 依赖于 PR #2897 的合并。这三个大型重构 PR（#2896, #2897, #2898）均集中在 2026-10-17 提交，若未及时 Review 合并，可能会阻塞 `release/2026.10.19` 分支的后续开发。建议团队安排集中 Code Review 时间。

---
**分析师建议：**
今日项目无合并但活动频繁，主要精力在于为 10.19 版本打基础。**最关键的风险点在于 Stacked PRs (#2897 -> #2898) 的合并速度**。建议在下一日报中重点关注这三个 PR 是否顺利合并，以及 PR #1181 的数据库迁移方案是否通过架构评审。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-10-18）

## 1. 今日速览
过去 24 小时内，Moltis 项目整体呈现**低 Issue 交互、中度 PR 推进**的状态。社区无新版本发布，也无新增或关闭的 Issues；PR 方面共有 3 条更新（已关闭/合并 1 条，新建/活跃待合并 2 条）。今日的技术演进核心聚焦于**原生桌面客户端架构探索（Rust/GPUI）**、**首次运行的 CLI/网关用户引导体验优化**，以及**第三方模型 Provider 的持续扩展**。整体开发路线向客户端解耦与终端用户开箱即用体验倾斜。

---

## 2. 项目进展
今日完成合并/关闭的关键 PR：

* **[PR #1307] feat(gateway): open the browser on first run and make the URL hard to miss**
  * **类型**：用户体验（UX）与网关引导优化
  * **状态**：已关闭 / 合并
  * **进展与作用**：针对首次运行用户常忽略浏览器完成配置步骤的问题，网关在检测到本地桌面会话（TTY 环境，排除 SSH/CI/Docker/systemd）时，将自动打开浏览器跳转至 `/onboarding#setup`，显著降低了新用户的上手门槛。
  * **链接**：[PR #1307](https://github.com/moltis-org/moltis/pull/1307)

---

## 3. 社区热点
今日最为瞩目的开发动态来自原生客户端架构提案：

* **[PR #1306] feat: native gpui desktop client (apps/desktop) and moltis-client crate**
  * **亮点分析**：这是 Moltis 迈向原生桌面体验的重要一环。作者 `@penso` 提交了一个基于 Rust 及 GPUI 框架的原生桌面客户端方案（位于 `apps/desktop` 目录下），并引入了 `moltis-client` 机制。该客户端不直接内嵌 Daemon，而是作为独立进程连接至运行中的 Moltis Daemon（支持本地、远程 HTTPS 或 SSH 隧道连接）。即使关闭 UI，后台 Daemon 仍可保持运行，实现了 UI 与核心服务的解耦。
  * **链接**：[PR #1306](https://github.com/moltis-org/moltis/pull/1306)

---

## 4. Bug 与稳定性
过去 24 小时内**未提交任何新的 Bug 报告及稳定性问题 Issue**，项目核心服务保持平稳运行。

---

## 5. 功能请求与路线图信号
从活跃 PR 的提案方向看，项目正在释放以下路线图（Roadmap）信号：

1. **客户端解耦与桌面端（Desktop Client）原生化**：[PR #1306](https://github.com/moltis-org/moltis/pull/1306) 的引入意味着 Moltis 官方正在构建基于 Rust / GPUI 的高性能桌面 GUI 客户端，未来用户将不再局限于 WebUI 界面。
2. **OpenAI 兼容 Provider 生态扩展**：[PR #1288](https://github.com/moltis-org/moltis/pull/1288) 提议集成 **Tsubasa** 模型提供商，新增 `TSUBASA_API_KEY` 环境变量支持及 `tsubasa-fast` / `tsubasa-pro`（32,768 上下文窗口）预设注册，预计将在后续版本合并。

---

## 6. 用户反馈摘要
由于过去 24 小时内无 Issue 产生及更新，今日暂无直接的用户反馈评论数据。从近期合并的 [PR #1307](https://github.com/moltis-org/moltis/pull/1307) 侧面反映出：以往用户在通过终端（CLI）启动网关后，存在“未能及时在浏览器中打开配置 URL”的常见使用痛点，该问题已通过自动唤起浏览器予以解决。

---

## 7. 待处理积压
维护者团队宜关注以下合并周期较长的开源贡献：

* **[PR #1288] feat: add Tsubasa provider to setup and model registry**
  * **提出时间**：2026-09-28（已等待约 20 天）
  * **现状**：包含了 Tsubasa Provider 的预设模板、配置校验及 README 文档更新。由于代码已补齐测试，建议维护者尽快完成 Code Review 并予以合并。
  * **链接**：[PR #1288](https://github.com/moltis-org/moltis/pull/1288)

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (QwenPaw) 项目动态日报 - 2026-10-18

## 1. 今日速览
过去 24 小时内，CoPaw 项目处于高活跃度的维护与迭代状态。伴随 v2.2.2 版本的发布，社区集中暴露了多项与**多模态会话卡死（Session Wedging）**、**控制台 UI 回归**以及**通道消息泄露/降级**相关的 Bug。社区响应极其迅速，绝大多数新提交的 Issue 已在数小时内获得了对应的修复 PR。此外，官方正式发布了 v2.3.0 的架构演进路线图方案，标志着项目正朝着轻量化和插件模块化方向迈进。今日整体社区活跃度较强（9 条 Issue 更新，17 条 PR 更新）。

---

## 2. 版本发布
过去 24 小时内**无新版本发布**。

---

## 3. 项目进展
今日共合并/关闭 **2 条 PR**，项目在多端兼容性与文档规范化上进行了清理：

* **[关闭] 修复 Windows 环境下 Creator 进程探测报 SystemError 问题**：[PR #8296](https://github.com/agentscope-ai/CoPaw/pull/8296) 解决了在 Windows CPython 环境下由于 `os.kill(pid, 0)` 探测失效 PID 时抛出 `SystemError` 的问题，提升了 `qwenpaw-creator` 启动钩子的稳定性。
* **[关闭] Creator 视频生成控制面规范**：[PR #7875](https://github.com/agentscope-ai/CoPaw/pull/7875) 补充并规范了 Creator `create-video` 行为的技术文档与控制平面契约。

虽然合并数量不多，但社区已针对今日报告的所有严重 Bug 快速提交了 15 条待合并 PR，整体推进效率较高。

---

## 4. 社区热点
今日讨论最集中、影响较广的议题如下：

1. **📢 v2.3.0 预告：轻量化与插件化架构升级**
   * **讨论项目**：[Issue #8289](https://github.com/agentscope-ai/CoPaw/issues/8289)
   * **分析**：官方发帖公布 v2.3.0 的重构计划，重点在于解耦核心框架与扩展组件，引入插件化机制（Plugin Refactor），降低运行开销并提升可扩展性。社区对架构解耦表达了强烈关注。
2. **“多模态会话永久卡死（Session Wedging）” 系列问题**
   * **讨论项目**：[Issue #8171](https://github.com/agentscope-ai/CoPaw/issues/8171)、[Issue #8298](https://github.com/agentscope-ai/CoPaw/issues/8298)、[Issue #8290](https://github.com/agentscope-ai/CoPaw/issues/8290)
   * **分析**：当 Agent 通过 `send_file_to_user` 发送音频或视频后，上下文会遗留 DataBlock。若后方的 LLM Gateway 或本地模型（如 LM Studio, DeepSeek, llama-server）不支持多模态，服务将抛出 400/422 错误。由于框架未正确识别此类报错，导致该 Session 在后续所有纯文本对话中都会持续失败（永久卡死）。
3. **钉钉通道长消息静默降级导致排版全面失效**
   * **讨论项目**：[Issue #8278](https://github.com/agentscope-ai/CoPaw/issues/8278)
   * **分析**：钉钉通道在消息超过 3500 字符时，未复用 `split_text` 切片逻辑，而是直接静默降级为纯文本，导致 Markdown 表格与代码块全部变成乱码纯文本，严重影响数据报表场景。

---

## 5. Bug 与稳定性

按严重程度排列今日发现的缺陷及修复进展：

### P0 - 严重崩溃 / 会话卡死（Critical）
* **v2.2.2 切换至大文本流式输出会话导致 UI 冻结及后台 SIGBUS 崩溃**
  * **描述**：切换到刚生成或正在生成海量流式输出的会话时，前端长延时卡死，后台可能发生 SIGBUS 崩溃（v2.2.1 无此问题）。
  * **状态**：[Issue #8288](https://github.com/agentscope-ai/CoPaw/issues/8288) | 待排查修复。
* **多模态文件发送导致会话永久卡死（Audio/Video Session Wedge）**
  * **描述**：LM Studio / DeepSeek / llama-server 对不支持的音视频 DataBlock 返回 400/422 错误，无法触发系统的模态降级分类器。
  * **状态**：[Issue #8171](https://github.com/agentscope-ai/CoPaw/issues/8171), [Issue #8298](https://github.com/agentscope-ai/CoPaw/issues/8298), [Issue #8290](https://github.com/agentscope-ai/CoPaw/issues/8290) | **已有 Fix PR**：[PR #8299](https://github.com/agentscope-ai/CoPaw/pull/8299)、[PR #8215](https://github.com/agentscope-ai/CoPaw/pull/8215)、[PR #7654](https://github.com/agentscope-ai/CoPaw/pull/7654)。

### P1 - 功能与表现异常（Major）
* **框架注入控制标记（如 `<system-notification>`）泄露给通道终端用户**
  * **描述**：系统级注入上下文被保存在普通的 Assistant 文本中，导致钉钉/飞书等通道用户直接收到系统内部标记。
  * **状态**：[Issue #8293](https://github.com/agentscope-ai/CoPaw/issues/8293) | **已有 Fix PR**：[PR #8295](https://github.com/agentscope-ai/CoPaw/pull/8295)、[PR #7211](https://github.com/agentscope-ai/CoPaw/pull/7211)。
* **钉钉通道超长消息（>3500 字符）静默降级为纯文本**
  * **描述**：长文本未自动拆包分片发送，引发 Markdown/GFM 表格渲染失效。
  * **状态**：[Issue #8278](https://github.com/agentscope-ai/CoPaw/issues/8278) | 待修复。

### P2 - UI/UX 问题（Minor）
* **v2.2.2 Console 发送按钮点击后输入框文本未清空**
  * **描述**：消息成功发送给 Agent，但输入框文字依然残留。
  * **状态**：[Issue #8300](https://github.com/agentscope-ai/CoPaw/issues/8300) | 待修复。
* **思考强度（Thinking strength）滑块填充色错误与保存闪烁**
  * **描述**：选择 Low 强度时整个轨道仍被填满颜色，且保存设置时界面闪烁回滚。
  * **状态**：[Issue #8286](https://github.com/agentscope-ai/CoPaw/issues/8286) | **已有 Fix PR**：[PR #8287](https://github.com/agentscope-ai/CoPaw/pull/8287)。

---

## 6. 功能请求与路线图信号
* **轻量化与模块化（v2.3.0 路线图）**：官方发起的 [Issue #8289](https://github.com/agentscope-ai/CoPaw/issues/8289) 明确了下一大版本的核心目标——解耦插件生态、减少基础镜像/安装包体积，提示核心架构正在经历二次重构。
* **新增 Web 搜索 Provider - Serply**：[PR #7712](https://github.com/agentscope-ai/CoPaw/pull/7712) 提议引入 Serply 作为 Tavily 和 AnySearch 之外的第三种搜索引擎选项。
* **QwenPaw Data-App 升级至 1.0.3**：[PR #8

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 (2026-10-18)

## 1. 今日速览
过去 24 小时内，ZeroClaw 项目保持高度活跃，共有 **41 条 Issue**（新开/活跃 35，关闭 6）和 **50 条 PR**（待合并 49，关闭/合并 1）发生变更。当前演进重点集中在 **v0.8.6 版本的 WASM 插件宿主与发布卡口交付**，以及 **v0.8.7 Runtime 运行时边界与安全架构加固**。项目总体健康，但在安全策略粒度、客户端（TUI/Desktop）体验以及多模态路由等细节上暴露了若干高优先级的 Bug，社区正积极通过 PR 进行修复。

---

## 2. 项目进展

今日虽无正式 Release 发布，但多个核心基础设施和协同机制取得了实质进展：

- **工具执行协同取消机制落地**：关闭了长期跟踪的软取消需求 [#5836](https://github.com/zeroclaw-labs/zeroclaw/issues/5836)，为 `Tool` 执行契约引入协同取消机制（Cooperative Cancellation），使得 Shell 命令或 HTTP 请求等长耗时工具能够响应 `CancellationToken` 及时打断，避免无意义的资源占用。
- **模型路由配置损坏 Bug 修复**：关闭了严重配置损坏漏洞 [#11606](https://github.com/zeroclaw-labs/zeroclaw/issues/11606)，解决了 `upsert_agent` 在更新单一代理模型路由时误将整个 `config.toml` 重新写回并抹除其他字段的问题。
- **ZeroCode TUI 配置体验优化**：修复并关闭了 ZeroCode 终端界面中配置未应用状态显示 [#11491](https://github.com/zeroclaw-labs/zeroclaw/issues/11491) 与双面板过滤同步丢失上下文的问题 [#11488](https://github.com/zeroclaw-labs/zeroclaw/issues/11488)。

---

## 3. 社区热点

今日讨论最集中、社区关注度最高的议题包括：

- **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) [OPEN] Runtime 与 Gateway 交付追踪（v0.8.6 / v0.9.0）**（10 评论）
  - **背景与诉求**：作为架构拆分 RFC #5574 的主追踪 Issue，社区正在密集确认 v0.8.6 运行时阶段与 v0.9.0 Gateway 独立解耦的最后交付路径，涉及安全域、架构解耦与版本卡口。
- **[#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) [OPEN] ZeroCode TUI "Copy" 一键复制按钮失效**（5 评论）
  - **背景与诉求**：多位用户反馈在 TUI 界面点击 Copy 按钮没有任何剪贴板响应，严重影响终端使用流程，属于用户体验类阻塞问题。
- **[#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) [OPEN] 验证并发布 WASM Discord 插件**（4 评论）
  - **背景与诉求**：随着 WASM 宿主链路合并，开发者正在测试从二进制发版中完整安装并端到端证明 Discord 插件的能力，这是 v0.8.6 插件生态的重要里程碑。
- **[#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) [OPEN] SOP.toml 格式错误被静默丢弃**（4 评论）
  - **背景与诉求**：当 SOP 配置文件包含未知字段时，系统加载时既不报错也不诊断，导致 `sop list` 忽略、`sop validate` 假阳性通过，用户难以排查语法错误。

---

## 4. Bug 与稳定性

按严重程度排列，今日重点关注的异常与修复状态如下：

### S0 - 严重安全风险与系统阻塞
1. **[#11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058) [OPEN] `allowed_commands` 导致高风险命令绕过沙箱硬拦截**
   - **现象**：当配置 `block_high_risk_commands = true` 时，若某个高风险命令显式存在于 `allowed_commands` 中，系统会免除拦截并无日志、无提示地静默自动执行，存在重大安全隐患。
2. **[#11796

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*