# OpenClaw 生态日报 2026-09-12

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-09-11 22:06 UTC

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

**NanoBot 项目日报 – 2026‑09‑12**  
（基于截至 2026‑09‑11 23:59 的 GitHub 数据）

---

## 1. 今日速览
- 项目在过去 24 h 内保持高活跃度，**27 条 PR**（其中 9 条仍在待合并），**4 条 Issue**（2 新/活跃，2 已关闭）。  
- 代码合并与清理工作密集，主要聚焦在 **WebUI 性能、历史回放优化、渠道配置改进**。  
- 社区讨论仍以 **AnySearch 集成** 为热点，且出现了 **首次启动密码** 的实际使用障碍。整体健康度良好，活跃的贡献者和及时的 bug 处理显示维护节奏稳健。

---

## 2. 版本发布
> 本日 **未发布新版本**，因此本节略。

---

## 3. 项目进展（关键 PR 合并/关闭）

| PR # | 类型 / 关键点 | 主要贡献 | 影响范围 | 链接 |
|------|---------------|----------|----------|------|
| **#5356** (closed) | **功能** – 改进多渠道 Setup 流程 (NAN‑112) | 重新设计渠道目录布局、分离依赖安装、序列化安装防止前端竞争 | WebUI 交互、首次部署体验 | https://github.com/HKUDS/nanobot/pull/5356 |
| **#5214** (closed) | **Bug** – DeepSeek 推理项保持 wire‑valid | 修复 OpenAI‑Response API 的序列化错误，防止因无效 JSON 导致请求失败 | 所有使用 DeepSeek 的 Agent | https://github.com/HKUDS/nanobot/pull/5214 |
| **#5255** (closed) | **改进** – API 服务状态真实显示 | 在 WebUI 中正确报告由外部 `nanobot serve` 启动的 API 实例状态 | 运维监控、用户信任感 | https://github.com/HKUDS/nanobot/pull/5255 |
| **#5230** (closed) | **Bug** – Gemini 工具调用签名保留 | 解决 Gemini 3 在跨提供商迁移时丢失签名导致的 replay 失败 | Gemini 相关插件、跨模型对话 | https://github.com/HKUDS/nanobot/pull/5230 |
| **#5216** (closed) | **Bug** – Gemini Flash 图像提示参数 | 将图片尺寸/比例提示搬到 `generationConfig.imageConfig`，消除 400 错误 | Gemini Flash 图像模型 | https://github.com/HKUDS/nanobot/pull/5216 |
| **#5215** (closed) | **Bug/性能** – Gateway 停止时资源确定释放 | 关闭子进程前显式释放资源，消除 asyncio teardown 噪声并防止停机卡死 | 所有运行 `nanobot serve` 的实例 | https://github.com/HKUDS/nanobot/pull/5215 |
| **#5742** (closed) | **Bug/UX** – 自动化删除后导航恢复 | 修复删除自动化后侧边栏/页面不可点击的问题，加入回归测试 | WebUI 自动化管理 | https://github.com/HKUDS/nanobot/pull/5742 |
| **#5741** (closed) | **性能** – 工具进度中剔除二进制数据 | 防止 `read_file` 返回的 base64 图片被写入 WebUI 记录，显著降低带宽与存储 | 所有文件读取工具 | https://github.com/HKUDS/nanobot/pull/5741 |
| **#5732** (closed) | **性能** – 限制长文本流刷新频率 | 将 UI 更新间隔限定为 ≥50 ms，避免高频渲染卡顿 | WebUI 实时推理展示 | https://github.com/HKUDS/nanobot/pull/5732 |

> **合计**：10 条已合并/关闭的 PR 直接提升了 **WebUI 稳定性、跨模型兼容性、资源回收** 三大核心维度；其中 6 条属于**关键 bug 修复**，表明近期对稳定性的投入力度加大。

---

## 4. 社区热点（讨论最活跃）

| 编号 | 类型 | 标题 | 评论数 | 关键诉求 | 链接 |
|------|------|------|--------|----------|------|
| **#5505** (Closed) | Issue – Enhancement | *Add AnySearch as a web search provider* | **8** | 将 AnySearch 统一搜索平台接入 `web_search`，提供 API / MCP / Skill 三种方式；希望兼容匿名额度并可选密钥。 | https://github.com/HKUDS/nanobot/issues/5505 |
| **#5745** (Open) | PR – Bug / Performance | *fix(webui): make large history replay incremental and cached* | — (暂无评论) | 解决大规模对话历史回放卡顿，采用分块、缓存与 gzip 脱离主事件循环。 | https://github.com/HKUDS/nanobot/pull/5745 |
| **#5726** (Open) | Issue – Bug (P1) | *Startup initial password?* | **2** | 在无 UI（headless）部署时，默认登录页面要求密码但未提供文档说明，导致运维阻塞。 | https://github.com/HKUDS/nanobot/issues/5726 |
| **#5731** (Open) | Issue – Enhancement | *Add AnySearch extract as a web_fetch backend* | 0 | 延伸 AnySearch 功能至 `web_fetch`，实现更灵活的内容抽取。 | https://github.com/HKUDS/nanobot/issues/5731 |
| **#5746** (Open) | PR – Feature | *feat(providers): add DaoXE gateway provider* | — | 新增 DaoXE 作为可命名网关提供者，丰富多渠道接入选项。 | https://github.com/HKUDS/nanobot/pull/5746 |

**分析**  
- **AnySearch** 的两条 Issue（#5505, #5731）显示社区对 **统一搜索/抓取服务** 的强烈需求，且已得到项目方的积极响应（已关闭 #5505，仍在评估 #5731）。  
- **启动密码**（#5726）暴露了 **headless 部署文档缺失** 的痛点，属于阻断性 P1 级别，需要快速给出答案或在 README 中补充。  
- PR #5745 和 #5746 则分别代表 **性能优化** 与 **新渠道扩展**，是本轮社区贡献的重点方向。

---

## 5. Bug 与稳定性

| 严重度 | Issue # / PR # | 标题 | 当前状态 | 是否已有修复 |
|--------|----------------|------|----------|--------------|
| **P1** | #5726 (Issue) | Startup initial password? | **Open** | 暂无（需文档或默认密码） |
| **P1** | #5745 (PR) | fix(webui): make large history replay incremental and cached | **Open** | 已在 PR 中实现，待合并后即解决 |
| **P2** | #5719 (Closed) | Discord: automatic compaction notices are delivered with `sendProgress: false` | 已关闭，已修复 | ✔ |
| **P2** | #5741 (Closed) | fix(webui): omit binary data from tool progress | 已关闭，已修复 | ✔ |
| **P2** | #5740 (Closed) | feat(webui): simplify automation management | 已关闭，已修复 | ✔ |

**总体评估**：本日报告的 **P1** 级别 bug 只剩 **#5726**（文档/默认密码缺失）未解决，其他高优先级问题已在 PR 中得到修复，显示维护团队对关键回归的响应速度在 **12 h** 以内。

---

## 6. 功能请求与路线图信号

| 请求来源 | 功能/改进 | 与现有 PR 的关联 | 可能进入下一个里程碑 |
|----------|----------|-------------------|----------------------|
| **AnySearch 团队**（#5505、#5731） | 将 AnySearch 集成进 `web_search` 与 `web_fetch` | 已完成搜索提供者（#5505 已关闭），后端抽取仍在需求阶段（#5731） | 预计在 **下一次次要发布**（vX.Y‑beta）加入 |
| **DaoXE**（#5746） | 新增 DaoXE 网关提供者 | PR 已打开，代码审查中 | 若审查通过，可能在 **下月的功能迭代** 中发布 |
| **WebUI 性能**（#5745、#5738） | 大历史回放增量缓存、长文本流刷新优化 | 两个 PR 已打开，分别针对后端与前端 | 预计在 **两周内合并**，随后进入 **vX.Y‑rc** |
| **Headless 部署体验**（#5726） | 文档化默认登录密码或提供免密码启动方式 | 暂无对应 PR | 需要快速补充文档，属于 **必需的运营改进**，可在 **下一次文档更新** 中解决 |

---

## 7. 用户反馈摘要

- **搜索集成需求**：用户（尤其是 AnySearch 团队）希望 Nanobot 能直接调用统一搜索 API，以减少多模型间的搜索碎片化。已在 Issue 中提供详细集成方案，项目方表现出积极合作的姿态。  
- **启动阻塞**：在 headless 环境下首次访问 UI 时缺失默认密码，导致运维人员需手动查找或猜测。该问题被标记为 **P1**，说明对实际部署体验影响显著。  
- **WebUI 卡顿**：多条 PR（#5745、#5732、#5738）针对长对话历史、长文本流刷新进行优化，说明社区对 **交互流畅性** 有明确诉求，且已有实质性代码响应。  
- **渠道配置**：#5746 提出的 DaoXE 提供者以及 #5743、#5740 的 UI 结构简化，都在回应用户希望 **“一键式、统一的渠道管理”** 的需求。

---

## 8. 待处理积压（长期未响应）

| 编号 | 类型 | 标题 | 开放天数 | 备注 |
|------|------|------|----------|------|
| #5505 | Issue (已关闭) | Add AnySearch as a web search provider | 已关闭（但后续抽取需求仍待） | 需要在 PR #5731 中继续跟进 |
| #5731 | Issue (Open) | Add AnySearch extract as a web_fetch backend | **1 天** | 仍未有实现 PR，建议指派负责人 |
| #5745 | PR (Open) | fix(webui): make large history replay incremental and cached | **1 天** | 高优先级性能 PR，建议加速审查 |
| #5746 | PR (Open) | feat(providers): add DaoXE gateway provider | **1 天** | 新渠道提供者，需检查安全与兼容性 |
| #5739 | PR (Open) | Dev (CI/CD) | **1 天** | 标记为 CI 改进，暂无详细描述，可能需要补全描述后合并 |

> **建议**：对 **#5731** 与 **#5745** 进行每日审查进度更新；对 **#5726** 立即在 README 添加默认密码说明或提供 `nanobot init --no-auth` 选项，以降低运维阻塞风险。

---

**结论**  
NanoBot 项目在 2026‑09‑12 仍保持 **高活跃度、快速的 bug 处理与持续的性能迭代**。社区热点集中在 **搜索/抓取集成** 与 **WebUI 体验提升**，两大方向的 PR 已在积极推进。唯一阻塞用户部署的 **P1** 问题（启动密码）应在本周内得到文档或代码层面的解决，确保项目的易用性与可部署性不受影响。整体健康度评估为 **良好 → 稳定**，建议继续保持当前的审查节奏，并对积压的功能请求设立明确的里程碑。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 2026‑09‑12 项目动态日报

> 本日报基于截至 2026‑09‑11 的 GitHub 活动，涵盖 Issues、PR 以及发布状态。  
> 语言客观、数据驱动，旨在快速评估项目健康度与社区活跃度。  

---

## 1. 今日速览  
- **活跃度**：过去 24 h 共 **4 条 Issues** 与 **4 条 PR**，活跃比例约 50 %（2 新/活跃、2 关闭）。  
- **维护状态**：大多数变更已进入合并或关闭流程，显示维护者对已知问题的响应速度。  
- **社区氛围**：大多数讨论聚焦于插件扩展与稳定性修复，未出现新版本发布，说明项目当前处于“平稳维护”阶段。  

---

## 2. 版本发布  
- **无新版本**（2026‑09‑12）。  
- 维护者可继续关注下一轮发布计划；若计划在本周后续发布，建议提前预告功能与破坏性变更。  

---

## 3. 项目进展  
| PR # | 标题 | 维护者 | 状态 | 主要贡献 |
|------|------|--------|------|----------|
| **3340** | `fix(slack): set FileSize on media upload params` | octavioturra | **已合并** | 解决 Slack 频道媒体上传因 `FileSize` 为 0 而被 SDK 拒绝的问题，提升媒体发送可靠性。 |
| 3371 | `feat(providers): add opencode-go provider with session header support` | EMTumariscal | **开放** | 新增 `opencode-go` provider，支持 OpenCode 的会话头，扩展模型兼容性。 |
| 3376 | `fix(deltachat): initialize as custom channel to solve config validation error` | luisgdev | **开放** | 修复 DeltaChat 配置验证失败，提升跨频道兼容性。 |
| 3347 | `fix laggy interface` | iMilnb | **开放** | 优化 Web UI 渲染，解决大量聊天文本导致的界面卡顿。 |

> 通过 PR #3340 的合并，Slack 相关功能恢复正常，用户体验得到直接提升。  

---

## 4. 社区热点  
| 项目 | 状态 | 关注度 | 链接 |
|------|------|--------|------|
| **Issue #3355** | Bug | 1 条评论 | <https://github.com/sipeed/picoclaw/issues/3355> |
| **Issue #3366** | Feature | 2 条评论 | <https://github.com/sipeed/picoclaw/issues/3366> |
| **Issue #3338** | Bug（已关闭） | 4 条评论 | <https://github.com/sipeed/picoclaw/issues/3338> |
| **Issue #3346** | Bug（已关闭） | 2 条评论 | <https://github.com/sipeed/picoclaw/issues/3346> |

- **#3355**（Feishu 配置错误）是目前最活跃的未解决问题，导致 Feishu 通知无法发送。  
- **#3366**（OpenAI 兼容供应商）获得了多方关注，反映用户对自托管模型的需求正在增长。  

---

## 5. Bug 与稳定性  
| 级别 | Issue | 说明 | Fix PR |
|------|-------|------|--------|
| **严重** | #3338 | Slack media 上传失败，`file.upload.v2` 报 `file size cannot be 0` | ✅ PR #3340 已合并 |
| **中等** | #3346 | RKLLM 模型在 ARM 开发板返回异常回复 | ✅ 已关闭（无修复 PR） |
| **轻微** | #3355 | Feishu 配置文件中出现未知字段 `channel_list.feishu.app_id` | ❌ 未修复（仍处于讨论中） |

> 当前稳定性已得到提升，尤其是 Slack 与 RKLLM 两大关键路径已闭环。  

---

## 6. 功能请求与路线图信号  
- **#3366**：用户希望支持“OpenAI 兼容”提供商，以便接入自托管服务（如 9Router）。该需求已被 **PR #3371** 直接响应，预计可在下一版本（0.4.x）内实现。  
- **#3371**：新增 `opencode-go` provider，可视为对现有 OpenAI 方案的替代或扩展，符合长期多模型支持路线。  

> 建议维护者在 0.4.x 里统一 `provider` 接口，添加官方文档说明自托管兼容性。  

---

## 7. 用户反馈摘要  
- **Slack**：多次报告上传失败，影响协作效率。已在 #3340 中得到解决。  
- **Feishu**：配置错误导致通知无法发送，用户急需快速修复。  
- **RKLLM**：模型在 ARM 开发板返回异常回复，表明对模型兼容性与硬件加速的关注。  

> 用户对多渠道即时通信的稳定性有强烈需求，同时对自托管 AI 的开放性与可扩展性保持高度关注。  

---

## 8. 待处理积压  
| Issue/PR | 说明 | 关注度 | 链接 |
|----------|------|--------|------|
| **#3366** | OpenAI 兼容供应商功能请求 | 2 条评论 | <https://github.com/sipeed/picoclaw/issues/3366> |
| **#3371** | 新增 `opencode-go` provider（开放） | 0 条评论 | <https://github.com/sipeed/picoclaw/pull/3371> |
| **#3355** | Feishu 配置错误（未修复） | 1 条评论 | <https://github.com/sipeed/picoclaw/issues/3355> |
| **#3376** | DeltaChat 配置验证错误（开放） | 0 条评论 | <https://github.com/sipeed/picoclaw/pull/3376> |

> 维护者建议对 #3366 和 #3371 进行优先评估，并在 0.4.x 里规划正式合并；对 #3355 与 #3376 需要在下周内完成验证与合并，防止相关渠道出现连锁故障。  

---

**结语**  
整体来看，PicoClaw 目前处于稳步维护阶段：核心 Bug 已被及时闭环，新的插件与供应商扩展正在推进，社区对自托管 AI 与多渠道支持的需求持续增长。建议维护者在下一版本 0.4.x 中集中实现 OpenAI 兼容与多供应商支持，同时快速解决 Feishu 与 DeltaChat 相关配置问题，以提升整体用户体验与生态兼容性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑09‑12**

---

### 1. 今日速览  
过去24小时内项目共更新7条 Issue（5 新开/活跃，2 已关闭）和16条 PR（15 待合并，1 已合并/关闭）。整体活跃度保持中等，主要集中在功能迭代与关键错误修复。虽然合并量不大，但大部分 PR 处于“review”或“testing”阶段，表明社区对新功能和改进保持积极关注。

---

### 2. 版本发布  
暂无新版本发布。项目维持当前 2.3.0 版本，所有更新均集中在代码仓库内部的 PR 与 Issue。

---

### 3. 项目进展  
| PR 号 | 标题 | 主要改进 | 影响范围 |
|-------|------|----------|----------|
| **#3763** | *fix(add‑opencode): drop the pre‑cli‑tools Dockerfile guard on refresh and remove* | 解决了旧版 `add‑opencode` 产生的 Dockerfile 兼容性问题；移除多余的 guard 测试文件，避免安装失败。 | 影响所有安装/升级流程，提升安装稳定性。 |

> **说明**：#3763 已成功合并，关闭了长期存在的兼容性 bug，为后续的 Docker 镜像构建流程奠定了更可靠的基础。合并后，`add‑opencode` 相关文档同步更新，减少了用户手动修改的成本。

---

### 4. 社区热点  
| 目标 | 类型 | 关键点 | 链接 |
|------|------|--------|------|
| **#3576** | Issue | “Rate‑limited turns flood the channel with duplicate error notices” – 触发频繁错误通知且无退避/去重机制，影响生产环境。 | <https://github.com/nanocoai/nanoclaw/issues/3576> |
| **#3764** | PR | `/add‑voice` 完全双工浏览器对话功能实现，首次在 NanoClaw 上支持实时语音交互。 | <https://github.com/nanocoai/nanoclaw/pull/3764> |
| **#3765** | Issue | “Concurrent SQLite migrations can fail during fresh setup” – 在 macOS 上的 SQLite 迁移并发导致安装失败。 | <https://github.com/nanocoai/nanoclaw/issues/3765> |

- **诉求**：#3576 关注生产可用性与错误日志噪声；#3764 关注语音交互的新用例；#3765 关注安装可靠性与数据库一致性。

---

### 5. Bug 与稳定性  
| 级别 | Issue | 描述 | Fix PR |
|------|-------|------|--------|
| **高** | #3576 | 每次速率限制触发时会向用户通道多次重复发送错误信息，缺乏退避与去重。 | *待评审* |
| **高** | #3643 | 本地模型 Turn 过长时被 `ABSOLUTE_CEILING_MS` 30 min 强制杀进程，导致模型卡死。 | *待评审* |
| **中** | #3765 | 并发 SQLite 迁移导致 macOS 新安装失败。 | ✅ 已在 #3766 中修复 |
| **中** | #3769 | uvx bootstrap 在缺少 `~/.local/bin` 时抛出 “pnpm not found”。 | ✅ 已在 #3771 中修复 |

> **总结**：四个关键 Bug 中已有两项得到即时修复，剩余高优先级问题正处于评审阶段。项目整体稳定性持续提升。

---

### 6. 功能请求与路线图信号  
| Feature | 需求来源 | PR 进展 | 下一步 |
|---------|----------|--------|--------|
| **/add‑voice** | 新增浏览器语音交互功能 | PR #3764 已完成代码提交，待合并；PR #3772 进一步完善 Voice Adapter。 | 计划在下一个主版本（v2.4.0）正式发布 |
| **add‑opencode** | 兼容旧版 Dockerfile | PR #3763 已合并；相关文档同步更新。 | 已达成，可进入下一版本发布 |
| **Webhook port config** | 通过 `.env` 控制监听端口 | PR #3770 已合并，修复配置优先级问题。 | 已可使用，建议在新安装中启用 |

> **路线图**：基于目前活跃 PR，未来 2‑3 周将集中在完成 Voice Channel、Webhook 端口配置以及 Opencode 兼容性三大方向。

---

### 7. 用户反馈摘要  
- **错误通知噪声**（#3576）：用户报告在生产环境中因速率限制导致错误信息重复推送，严重影响用户体验。  
- **安装失败**（#3765、#3769）：macOS 用户在首次安装或更新时遇到数据库迁移和 pnpm 缺失问题，导致安装中断。  
- **功能需求**：多条 Issue 关注 `/add‑voice` 与 `/add‑opencode` 的可用性与文档完整性，显示用户对语音交互与代码部署工具的迫切需求。  

> **结论**：用户最关注的痛点是生产可用性与安装稳定性，功能扩展则以语音交互为主。

---

### 8. 待处理积压  
| Issue | 说明 | 当前状态 |
|-------|------|----------|
| #3765 | 并发 SQLite 迁移导致安装失败（已修复） | 已关闭 |
| #3769 | uvx bootstrap 缺失 pnpm（已修复） | 已关闭 |
| #3643 | 长 Turn 被 30 min hard‑kill（待修复） | 未修复 |
| #3576 | 速率限制错误信息重复（待修复） | 未修复 |

> **建议**：优先完成 #3643 与 #3576 的修复，确保生产环境的可用性与错误处理质量。

---

> **项目健康度**：整体活动度保持稳定，核心 Bug 已得到及时响应。新功能 PR 正在推进，社区对语音交互与安装可靠性的关注持续升温。建议继续加速高优先级 Bug 的评审与合并，以维持项目可用性。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报
**日期：** 2026-09-12
**项目：** IronClaw (github.com/nearai/ironclaw)

## 1.  今日速览
过去 24 小时内，IronClaw 整体开发活动处于**低位平稳**状态。项目未发布新版本，Issues 方面无新增也无关闭活动，社区讨论活跃度极低。目前仅有 1 个 Pull Request 处于开放状态，主要涉及共享频道连接状态的区分修复。鉴于昨日（09-11）有代码更新活动，今日表现为代码等待审查而非新开发输入，项目健康度暂无异常波动，但社区互动性不足需留意。

## 2. 版本发布
*过去 24 小时无新版本发布。*

## 3. 项目进展
*过去 24 小时无合并或关闭的 Pull Request。*

当前项目无功能落地或重大修复合并，技术债务未进一步削减，功能路线图暂无实质推进。

## 4. 社区热点
*过去 24 小时无高评论量或高反应量的 Issues/PRs。*

唯一的活跃项为 1 个开放中的 PR，社区反馈缺失，表明当前变更未引发大范围用户关注或争议。

## 5. Bug 与稳定性
*过去 24 小时无新增 Bug 报告。*

当前唯一相关的稳定性改进项为待合并的 PR，其包含潜在的修复价值：

*   **[OPEN] 共享频道断开连接状态区分修复**
    *   **链接：** [nearai/ironclaw PR #8076](https://github.com/nearai/ironclaw/pull/8076)
    *   **负责人：** `be-student`
    *   **状态：** 待合并（创建于 09-06，更新于 09-11）
    *   **严重性：** 中（用户体验与路由准确性）
    *   **描述：** 该 PR 旨在解决产品在区分“已配对但断开连接的共享频道”与“未配对账号”时的歧义问题。如果不合并此修复，用户可能在频道断开时收到错误的提示或行为，导致对机器人状态产生误解。
    *   **Fix 状态：** PR 已开放，但尚未合并至主分支，因此该 Bug 在生产环境中依然存在。

## 6. 功能请求与路线图信号
*过去 24 小时无新功能请求提交。*

结合现有 PR #8076，可推断团队正在关注**多频道共享场景下的状态一致性**和**错误分类的精细化**。这表明未来的路线图可能侧重于提升复杂连接场景（如 Slack 共享频道）下的鲁棒性和用户提示的准确性，而非单纯的功能堆叠。

## 7. 用户反馈摘要
*过去 24 小时无用户评论或反馈数据。*

鉴于缺乏新鲜的用户声音，无法提炼新的痛点或满意度信息。建议关注 PR #8076 合并后，针对“断开连接”和“未配对”状态提示的用户后续反馈。

## 8. 待处理积压
*当前关键积压项：*

*   **PR #8076 审查滞后风险**
    *   **链接：** [nearai/ironclaw PR #8076](https://github.com/nearai/ironclaw/pull/8076)
    *   **现状：** 该 PR 创建于 **2026-09-06**，距今已 **6 天**，最后更新于 09-11（2 天前）。
    *   **风险：** 对于修复类 PR，6 天的滞留时间略长。虽然包含“fix”标签，但若有多个维护者轮流值班，正常应在 2-3 天内完成审查与合并。
    *   **建议：** 建议维护者团队尽快分配审查人，确认测试覆盖完整性后合并，以消除潜在的状态判断 Bug。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期**: 2026-09-12
**数据来源**: GitHub (netease-youdao/LobsterAI)

## 1. 今日速览
LobsterAI 今日保持了中等水平的开发活跃度，过去24小时内有 **8条 PR** 更新（6条关闭/合并，2条待处理）和 **3条 Issue** 活跃。

团队重点攻克了 **OpenClaw v2026.8.1 升级带来的兼容性稳定性问题**，包括内存归档冲突、网关启动自愈及插件清理导致的运行时损坏等关键 Bug。同时，**配置持久化（Config Persistence）** 成为社区当前的核心痛点，多个旧 Issue 因新报告的关联 Bug 而被重新激活。今日无新版本发布，项目处于密集修复与优化阶段。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日项目组集中处理了 OpenClaw 底层升级引发的连锁反应，主要进展如下：

*   **修复插件清理导致的宿主运行时损坏 (Windows)**:
    *   PR [#2653](https://github.com/netease-youdao/LobsterAI/pull/2653) 已关闭。解决了 Windows 上 Electron 的 `fs.rmSync` 递归删除可能通过 junction 误删 `node_modules/openclaw` 底层运行时的问题，避免了 Gateway 重试失败。
*   **修复原生依赖兼容性崩溃**:
    *   PR [#2652](https://github.com/netease-youdao/LobsterAI/pull/2652) 已关闭。修复了 `nsp-clawguard 2.5.0` 中的 `graceful-fs` 互操作代理在 OpenClaw v2026.8.1 环境下导致的 `fs.close` 方法长度错误，恢复了 Gateway 启动稳定性。
*   **防止陈旧桌面会话错误恢复**:
    *   PR [#2651](https://github.com/netease-youdao/LobsterAI/pull/2651) 已关闭。针对 OpenClaw v2026.8.1 的孤立扫描机制，修复了将历史状态为 `running` 的桌面会话误判为中断并自动重跑的问题，提升了会话管理的可靠性。
*   **解决内存归档名称冲突**:
    *   PR [#2650](https://github.com/netease-youdao/LobsterAI/pull/2650) 已关闭。修复了在存在旧版内存索引和已迁移备份共存时，Gateway 因归档名称冲突而启动失败的问题。
*   **启动自愈与包体积优化**:
    *   PR [#2656](https://github.com/netease-youdao/LobsterAI/pull/2656) 增强了 OpenClaw Gateway 的启动自愈能力。
    *   PR [#2655](https://github.com/netease-youdao/LobsterAI/pull/2655) 进行了跨平台包体积优化。
    *   PR [#2657](https://github.com/netease-youdao/LobsterAI/pull/2657) 正在处理缩略图渲染及原生依赖构建问题（待审核）。

## 4. 社区热点
今日社区讨论热点高度集中在 **“用户数据/配置持久化”** 问题上。

*   **多 Agent 配置互相覆盖**:
    *   Issue [#2293](https://github.com/netease-youdao/LobsterAI/issues/2293) `[stale]` 被重新激活。用户发现修改一个 Agent 的 `USER.md` 会导致其他 Agent 的文件被主 Agent 覆盖。该 Issue 已有 5 条评论，表明这是一个破坏多 Agent 核心体验的严重逻辑 Bug。
*   **配置文件重启重置**:
    *   Issue [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) `[stale]` 被重新激活。用户反馈 `openclaw.json` 及工作空间文件（如 `AGENTS.md`）在重启后被内部模板重置。用户表示目前只能依靠定时任务 workaround，严重影响使用体验。

**分析**: 这两个热点 Issue 相互印证，揭示了 LobsterAI 在文件同步机制（`syncToDisk` 及相关逻辑）上存在设计缺陷，未能正确区分“用户自定义文件”与“系统模板文件”，导致用户信任度受损。

## 5. Bug 与稳定性
按严重程度排列：

1.  **[严重] 用户配置/工作空间文件重启后丢失或互相覆盖**
    *   **描述**: 重启后 `USER.md` 被主 Agent 覆盖（[#2293](https://github.com/netease-youdao/LobsterAI/issues/2293)）；配置文件重置（[#1006](https://github.com/netease-youdao/LobsterAI/issues/1006)）。
    *   **状态**: **未修复**。无直接 Fix PR，但今日有相关排查。
    *   **影响**: 破坏用户数据完整性，核心功能受损。

2.  **[中等] User Plugins Hooks 配置丢失**
    *   **描述**: Gateway 重启后丢失 `hooks` 配置。根因是 `getUserPlugins` 未返回 `hooks` 字段，导致 `syncToDisk` 时丢弃。
    *   **状态**: **已提出修复方案**。Issue [#2654](https://github.com/netease-youdao/LobsterAI/issues/2654) 建议修改数据库结构和同步逻辑。
    *   **影响**: 插件功能在重启后失效。

3.  **[已修复] OpenClaw v2026.8.1 兼容性系列 Bug**
    *   包括运行时误删 (#2653)、原生依赖崩溃 (#2652)、会话错误恢复 (#2651)、内存归档冲突 (#250)。这些 Bug 在今日已通过 4 个 PR 修复并关闭，显著提升了底层稳定性。

## 6. 功能请求与路线图信号
*   **配置持久化机制重构 (高优先级)**:
    *   基于 Issue #1006 和 #2293，用户强烈要求官方提供配置持久化方案，或允许用户自定义文件在重启后保留。
    *   **信号**: 维护者可能需要重新审视 `openclawConfigSync.ts` 和文件同步策略。这是下一版本可能重点解决的体验问题。
*   **User Plugins 数据库增强**:
    *   Issue #2654 提议在 `user_plugins` 表中增加 `hooks TEXT` 列。这表明插件系统的数据模型正在细化，以支持更复杂的钩子配置持久化。

## 7. 用户反馈摘要
*   **痛点**: 用户普遍反映“改一个地方，其他地方跟着变”或“重启后一切归零”。例如，用户 `yepcn` 指出多 Agent 场景下 `USER.md` 同步导致的配置混乱，使得无法为不同 Agent 建立独立需求。
*   **Workaround 依赖**: 用户 `1323588848` 表示目前只能通过“定时任务”来修复被重置的配置，说明底层机制过于激进，给终端用户带来了极大的维护负担。
*   **场景**: 多 Agent 协作、个性化 Agent 配置、长期运行会话。用户期望文件操作是“追加”或“独立”的，而非“覆盖”式的模板重置。

## 8. 待处理积压
*   **Issue #2293 & #1006**: 虽被标记为 `[stale]`，但因今日新数据和用户反馈而重新活跃。建议维护者优先级提升，因为这些 Issue 直接阻碍了高级用户（多 Agent 使用者）的核心工作流。
*   **PR #1181**: `[stale]` 隐藏 OpenClaw 主 Agent 会话。该 PR 旨在解决用户界面混淆问题，创建于 2026-04-01，今日有更新。若长期不合并，用户界面将一直存在误导性信息。
*   **PR #2657**: 缩略图渲染及构建问题。作者 `fisherdaddy` 今日提交，需要代码审核。鉴于今日其他 PR 均处理了构建和运行时问题，此 PR 应及时合并以避免 CI/CD 或分发问题。

**健康度评估**: **良好 -> 中**。底层稳定性（OpenClaw 集成）今日显著改善，但上层数据一致性/持久化问题正在发酵，若不尽快解决，可能引发用户流失。建议将“配置持久化”列为最高优先级技术债务。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-12）

## 1. 今日速览
过去 24 小时内，Moltis 项目整体开发节奏偏向平稳且较为安静。全网无新发布版本，未新增或更新 Issues，仅有 **1 条 PR** 发生更新，无合并或关闭的 PR。项目活跃度处于低位维稳状态，当前的贡献重点集中在扩展 AI 大模型 Provider（提供商）生态兼容性上。

---

## 2. 项目进展
今日暂无已合并或关闭的 PR。核心主线代码库在过去 24 小时内未发生变更推送，项目演进暂持平。

---

## 3. 社区热点
今日社区讨论度较低，活跃焦点集中在一条有关 Provider 扩展的 Pull Request 上：

* **[PR #1143] Add Requesty as an OpenAI-compatible provider**
  * **作者**：Thibaultjaigu | **创建时间**：2026-07-02 | **更新时间**：2026-09-11
  * **链接**：[moltis-org/moltis PR #1143](https://github.com/moltis-org/moltis/pull/1143)
  * **热点分析**：该 PR 旨在引入 Requesty（一家 OpenAI 兼容的 LLM 路由服务商）作为表驱动（table-driven）的 Provider。代码模式参考了现有的 OpenRouter 实现，通过 `https://router.requesty.ai/v1` 和 `Authorization: Bearer $REQUESTY_API_KEY` 进行鉴权与调用。这反映出用户及开发者对于统一路由服务、降低多模型接入成本的切实需求。

---

## 4. Bug 与稳定性
过去 24 小时内**未报告**新的 Bug、崩溃或性能回归问题。

---

## 5. 功能请求与路线图信号
* **模型提供商生态持续扩充**：从 PR [#1143](https://github.com/moltis-org/moltis/pull/1143) 的更新动作可以看出，Moltis 在模型接入层继续沿着“兼容 OpenAI 规范的聚合路由（LLM Routers）”路线延伸。利用表驱动配置接入类似 Requesty、OpenRouter 的服务，预示着未来的版本更新中，用户将拥有更加多样化且低门槛的模型路由选择，降低对单一 API 供应商的依赖。

---

## 6. 用户反馈摘要
过去 24 小时内 Issues 评论区无新增留言，社区未暴露新的使用痛点或阻塞性问题。整体用户使用态势相对稳定。

---

## 7. 待处理积压
* **PR 积压关注**：PR [#1143](https://github.com/moltis-org/moltis/pull/1143) 首次提交于 2026 年 7 月初，挂起已有两月余，近期作者重新进行了更新。建议维护团队尽快完成 Code Review 并予以合并，以保持社区贡献者的积极性并丰富生态连接能力。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是为您生成的 **CoPaw (QwenPaw)** 2026-09-12 项目动态日报：

---

# CoPaw 项目动态日报 (2026-09-12)

## 1. 今日速览
过去 24 小时内，CoPaw 项目保持高度活跃，完成了正式版本 **v2.2.1** 的发布。社区和开发团队集中推进了**多租户 Hub 建设、Subagent 调度优化、上下文压缩以及多渠道插件扩展**。

*   **数据统计**：Issues 更新 21 条（新开/活跃 15，关闭 6）；PRs 更新 41 条（待合并 23，已合并/关闭 18）。
*   **活跃度评估**：**极高**。新版本的发布带动了大量回归验证，同时多租户架构与核心引擎的稳定性成为开发者与社区讨论的焦点。

---

## 2. 版本发布
### 📦 v2.2.1 (Stable)
发布页面: [v2.2.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1) | 验证任务: [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692)

*   **新增功能与核心变更**：
    *   **智能体独立模型路由**：允许为每个 Agent 单独配置模型路由规则，包含 Provider 偏好设置及 Fallback 降级策略 ([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501))。
    *   **记忆模块升级**：引入 Auto Fin 主动记忆审查机制，并升级 ReMe 记忆架构。
*   **破坏性变更与迁移注意**：无直接破坏性 API 变更，但升级后建议检查多智能体场景下的模型路由配置，确保降级策略正常。

---

## 3. 项目进展
今日共合并/关闭 18 项 PR，重点推进了引擎底层修复、上下文窗口保持及协同迁移能力：

*   **模型上下文保护** ([#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652))：修复了部分模型实例丢掉 Provider 解析的大上下文窗口、退回默认 32k 的 Bug，防止长文本被提前过早压缩。
*   **跨平台 Agent 迁移能力 (PawPort)** ([#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960))：合入了 PawPort 子系统，支持从 Codex、Qoder 等第三方 Agent 框架一键导入提示词、技能、插件及近期项目工作。
*   **Console 交互与分页优化** ([#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688))：移除了会话分组中的折叠列表，改为按需“加载更多”，修复了选中深层会话后列表意外重置的问题。
*   **API 校验稳健性** ([#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677))：增加全局 HTTP 422 异常处理，对非有限数值（NaN/Inf）进行 JSON 安全转换。

---

## 4. 社区热点
今日讨论度最高的话题围绕**多租户 Hub 演进**与 **Subagent 调度失效** 展开：

1.  **QwenPaw Hub 多租户架构讨论** ([#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) - 26 条评论)
    *   **诉求分析**：社区对从“个人 AI 助手”走向“团队协同平台”需求强烈。用户高度关注多用户权限隔离、管理员统一管理 Agent 技能、以及无 GUI 远程服务器部署等场景。
2.  **Subagent 派生与模型继承异常** ([#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676), [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678))
    *   **诉求分析**：用户反馈派生的子智能体无法生效指定的 `subagent_model`，始终强行继承父 Agent 的模型，且容易触发 Timeout 超时失败，导致复杂的 Multi-Agent 任务中断。

---

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在后台任务取消机制、配置丢失以及多模态处理上：

### 🔴 高风险 / 阻碍性 Bug
*   **任务取消假死与状态不同步** ([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567))：前端点击“停止”后 UI 显示已终止，但后台任务仍继续运行，导致新指令输入时抛出 HTTP 409 冲突。*(暂无 Fix PR)*
*   **Creator 多图生成死锁** ([#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693))：多图生成期间用户点击“审核通过”，会中断正在串行执行的图片任务且不重新调度，导致任务永久卡在 `RUNNING` 状态。
*   **多模态端点 PDF 序列化失败** ([#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689))：在兼容 OpenAI 的 `/chat/completions` 多模态端点上，PDF 仍被序列化为 `{"type":"file"}` 并被服务端拒绝。

### 🟡 中风险 / 体验问题
*   **桌面端模型与工作区配置丢失** ([#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708), [#7705](https://github.com/

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 开发者与架构动态日报 (2026-09-12)

## 1. 今日速览

过去 24 小时内，ZeroClaw 项目保持极高的活跃度，共处理了 **50 条 Issue**（新开/活跃 39 条，已关闭 11 条）和 **50 条 PR**（待合并 47 条，已合并/关闭 3 条）。今日无新版本发布。

**整体健康度评估**：项目当前正处于核心功能快速演进与底层稳定性补强交织的高强度迭代期。
* **演进重心**：安全团队集中推进 RFC 7141 细粒度身份认证（OIDC / Principal 架构）的庞大 PR 链合并；
* **痛点暴露出**：随着 Agent 上下文增长，模型 Token 缓存（Prompt Cache）频繁失效、上下文主动压缩失效（#10780）以及 Windows 平台下的栈溢出崩溃问题（#10734）引发了社区的高度关注与密集讨论。

---

## 2. 版本发布

*今日无新版本发布。*

---

## 3. 项目进展

今日共有 11 项 Issue 和 3 项 PR 获得解决或关闭，重点推进了交互体验与边缘 Channel 的体验修复：

* **Telegram 多模态体验升级** ([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514))：修复了用户在 Telegram 批量发送多张图片时，Gateway 将每张图片拆解为独立 LLM 请求导致 Agent 多次回复的问题，现已支持将 Media Group 聚合为单次多模态 Turn。
* **ZeroCode (ACP) 工作流修复** ([#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609))：解决了从本地命令行启动 `zerocode` 时忽略启动目录、强制重定向至 Agent 默认 Workspace 的阻断性 Bug。
* **ZeroCode TUI 性能优化** ([#9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092))：修复了长会话下由于全量历史渲染导致的按键与滚动延迟。
* **Anthropic 思考块缓存优化** ([#10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786))：解决了跨 Turn 遗弃 `thinking` 块导致 Anthropic 历史 Prompt Cache 在每个轮次边界被全量重写的性能与资费隐患。
* **工具结果截断显式化** ([#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115))：提升了 `truncate_tool_result` 在上下文之外的可观测性。

---

## 4. 社区热点

今日讨论度最高的集中在 **架构治理** 与 **Prompt Cache 缓存失效风暴**：

1. **RFC 决策流程加速** ([#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) - 9 评论 / [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) - 15 评论)
   * **诉求**：贡献者与 Maintainer 反映当前 RFC 强制 48~72 小时的讨论等待期带来了不必要的摩擦，提议移除强制讨论窗口，并允许修改意见（REVISE）即时中止当前快照表决。配套的 Maintainer 决策队列（#8692）正在确立架构审查标准。
2. **Anthropic / OpenAI 兼容层 Prompt Cache 频繁失效风暴** ([#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701), [#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778), [#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777))
   * **诉求**：用户排查发现，在带有 Anthropic/OpenAI 兼容网关的长会话中，仅仅附加一张图片或在 Turn 间触发思考强度（thinking/effort）配置微调，就会导致全局历史 Message 结构重写，彻底击穿 Prompt Cache 前缀，造成 API Token 费用飙升（单次 Read/Write 差额达十几万 Token）。

---

## 5. Bug 与稳定性

今日新报告多项高风险（Risk: High / P1）稳定性与数据完整性 Bug：

### 🔴 P1 / High Risk (严重/阻断)
1. **Windows 平台 2 MB 栈溢出崩溃** ([#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) / [#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753))
   * **现象**：在 Windows `Advisory Windows nextest` 测试中，`RpcDispatcher::process_line` 执行 `session/new` 时触发 `0xc00000fd` 栈溢出异常。*（已有在处理中的诊断与防护）*
2. **失败轮次丢弃持久化历史** ([#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788))
   * **现象**：当 ZeroCode/ACP 轮次以上游 Provider 失败结束时，不仅丢弃错误，连同用户已接受的 Prompt 和此前已执行完毕的工具交互历史均未写入 Durable History。
3. **通知同步延迟导致会话强制取消** ([#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785))
   * **现象**：多会话并行时，`zerocode` 内部 `begin_notification_resync` 延迟会误触发 `session/cancel`，导致正在运行的轮次被无故终止。
4. **Channel 意图预检丢弃 Token 计费** ([#10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782))
   * **现象**：Channel reply-intent 在进行预检 LLM 调用后，未记录返回的 Token 使用量，导致分类器调用的真实成本与配额脱靶。

### 🟡 P2 / Medium Risk (功能受损)
1. **Reliable Provider 重试机制缺陷** ([#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) / [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736))：Anthropic HTTP 529（Overloaded）在流式初始化阶段报错时忽略重试退避逻辑，且未能按宣称回退至非流式模式。
2. **多平台服务日志缺失** ([#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731))：`zeroclaw service logs` 在 macOS、Windows 及 OpenRC 上无日志输出。*（已有 Fix PR [#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) 待合并）*

---

## 6. 功能请求与路线图信号

* **恢复主动式 Token 预算上下文压缩** ([#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780), [#10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781))
  * **信号**：用户与开发者强烈要求修复 v0.8.5 中失效的上下文压缩配置（如 `context_compression.*` 与 `history_pruning.keep_recent`），重新引入基于 Token 预算的主动上下文裁剪机制，避免纯按条数（`max_history_messages`）裁剪带来的上下文超长问题。
* **OIDC 与多租户安全隔离重构矩阵** ([PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) ~ [PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321))
  * **信号**：由 `@JordanTheJet` 提交的堆叠 PR 链正在全面推行 RFC 7141。包括基于 PKCE 的浏览器跨端注册 API、基于 Principal 的会

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*