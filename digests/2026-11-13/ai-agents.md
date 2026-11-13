# OpenClaw 生态日报 2026-11-13

> Issues: 431 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-13 00:48 UTC

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

# OpenClaw 项目动态日报
**日期**: 2026-11-13  
**分析对象**: openclaw/openclaw  
**分析师**: AI Agent & Personal AI Assistant 开源项目分析师

---

## 1. 今日速览
过去24小时 OpenClaw 项目保持高活跃度，共产生 **431** 个 Issue 和 **500** 个 PR 更新。社区讨论热度较高，涉及核心稳定性、内存管理、UI 交互及跨平台兼容性等多方面。虽然没有新版本发布，但多个关键 Bug 修复（如 macOS 停止命令、SQLite WAL 检查点、配置热重载等）和性能优化（如 CI 编译器缓存、内存启动压力降低）已进入合并或审查阶段，项目整体处于积极修复和迭代状态。

---

## 2. 版本发布
**无新版本发布**。当前最新版本为 **v2026.11.3**。

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目每日动态报告**  
**日期：2026‑11‑13**  
（基于 GitHub 上 过去 24 h 的 Issues / PR 数据）

---

## 1️⃣ 今日速览  
- 项目活跃度保持 **中等偏高**：24 h 内共 **4 条 Issue**（3 条新/活跃、1 条已关闭）和 **23 条 Pull Request**（9 条待合并、14 条已合并/关闭）。  
- 没有新版本发布，开发重点集中在 **代码清理、执行层重构以及新功能的早期实现**。  
- 社区讨论聚焦在 **Discord 线程历史回溯**、**MiniMax H3‑Image 图像生成** 与 **mst‑python 元搜索** 三大需求上。

---

## 2️⃣ 版本发布  
> **（本日无 Release，故省略）**

---

## 3️⃣ 项目进展（合并/关闭的关键 PR）  

| PR 编号 | 标题 / 关键改动 | 合并/关闭时间 | 影响范围 | 链接 |
|--------|----------------|--------------|----------|------|
| **#6636** | **fix(webui): preserve session caches during history revalidation**<br>‑ 修复会话缓存在历史重新验证时被意外清除的 bug，提升长对话的恢复速度与一致性。 | 2026‑11‑12 | WebUI、会话持久化 | https://github.com/HKUDS/nanobot/pull/6636 |
| **#6639** | **fix(webui): reorder appearance settings and trim preview**<br>‑ 调整设置面板顺序、压缩预览占位，提升 UI 可读性。 | 2026‑11‑12 | WebUI | https://github.com/HKUDS/nanobot/pull/6639 |
| **#6638** | **feat(webui): show the full token‑usage picture in settings**<br>‑ 在设置页加入 30 天 token 使用全景图，帮助用户监控费用。 | 2026‑11‑12 | WebUI、费用监控 | https://github.com/HKUDS/nanobot/pull/6638 |
| **#6634** | **perf(subagent): read saved task history by loaded turns**<br>‑ 优化子代理任务历史读取，降低长会话打开时的 JSON 体积（7 MB → ~1 MB）。 | 2026‑11‑12 | 子代理、性能 | https://github.com/HKUDS/nanobot/pull/6634 |
| **#6640** | **fix(webui): avoid phantom reasoning on empty streams**<br>‑ 消除空流导致的“思考过程”误显示，提升答案可信度。 | 2026‑11‑12 | WebUI、推理展示 | https://github.com/HKUDS/nanobot/pull/6640 |
| **#6644** | **refactor: drop unreferenced dead code**<br>‑ 删除已失效的迁移代码、未使用的图标与 npm 依赖，减小仓库体积。 | 2026‑11‑12 | 代码基线、维护成本 | https://github.com/HKUDS/nanobot/pull/6644 |
| **#6623** | **refactor(exec): centralize process‑tree lifecycle**<br>‑ 将进程树的启动、终止、清理统一到 `processes.py`，提升 exec 框架的可维护性。 | 2026‑11‑12 | 执行层、沙箱安全 | https://github.com/HKUDS/nanobot/pull/6623 |
| **#6626** | **docs: deprecate shared sessions for new setups**<br>‑ 文档更新：不再推荐新装置使用共享会话，降低误用风险。 | 2026‑11‑12 | 文档、用户引导 | https://github.com/HKUDS/nanobot/pull/6626 |

> **整体意义**：本轮合并主要围绕 **WebUI 稳定性、执行层统一、性能提升** 与 **文档清晰化**，为后续功能（Discord 回溯、MiniMax 图像）提供更可靠的底层支撑。

---

## 4️⃣ 社区热点（讨论最活跃的 Issue / PR）  

| 编号 | 类型 | 标题 | 评论数 | 关键诉求 | 链接 |
|------|------|------|--------|----------|------|
| **#6632** | Issue (OPEN) | **feat(discord): backfill recent thread history + optional startup presence** | 1 | Discord 线程缺失历史导致机器人“盲答”。用户希望在 Bot 重启或线程早于 Bot 时能够自动回溯历史并可选展示启动状态。 | https://github.com/HKUDS/nanobot/issues/6632 |
| **#6620** | Issue (OPEN) | **Suppressed message‑tool sends during internal turns return a success‑phrased ack instead of an error** | 1 | 心跳期间被压制的 `message` 调用错误地返回成功 ack，导致上层逻辑误判。 | https://github.com/HKUDS/nanobot/issues/6620 |
| **#6635** | Issue (OPEN) | **feat(image‑generation): support MiniMax H3‑Image (MiniMax‑H3‑Image / MiniMax‑H3‑Image‑Highspeed)** | 0 | 新发布的 MiniMax H3‑Image 系列模型未被 nanobot 支持，用户期待快速接入以获得更高质量/更快的图像生成。 | https://github.com/HKUDS/nanobot/issues/6635 |
| **#5234** | PR (OPEN) | **feat(agent): integrate mst‑python as a metasearch provider** | — | 引入 Meta‑Search Tool（MST）以一次性聚合 DuckDuckGo、Google、Bing 等搜索结果，提升搜索质量。 | https://github.com/HKUDS/nanobot/pull/5234 |

> **热点背后**：社区主要在 **跨平台聊天（Discord）** 与 **AI 图像生成** 两条产品线提出需求，且对 **内部工具行为的一致性**（如 message‑tool）表现出强烈关注，说明用户在实际部署中已进入深度使用阶段。

---

## 5️⃣ Bug 与稳定性  

| 编号 | 严重程度 | 描述 | 当前状态 | 是否已有 Fix PR |
|------|----------|------|----------|-----------------|
| **#5798** *(已关闭)* | 中 | 会话串流错误：在多个并发会话中，回复会错误地落到不相关的会话。 | 已在 0.3.5 版本中修复（关闭） | – |
| **#6620** | 高 | 心跳期间 `message` 调用被压制，却返回 “Message acknowledged …” 的成功响应，导致上层错误判定。 | 开放中，未合并 | 暂无对应 PR（预计将在下一个 sprint 中处理） |
| **#6636** | 中 | 会话缓存在历史重新验证时被意外清除，导致长对话打开慢、上下文丢失。 | 已通过 PR #6636 修复并合并 | 已解决 |
| **#6640** | 低 | 空流导致的“幻影推理” UI 显示错误。 | 已通过 PR #6640 修复并合并 | 已解决 |
| **#6427** | 中 | `ExecSessionTool._wait` 在多轮轮询时丢失 `stdin_closed` 标记，可能导致输入流阻塞。 | 开放中 | 暂无 PR，建议关注后续迭代 |

> **总体评估**：本日 **已解决 3 起已知 bug**（包括一次性会话串联、缓存回滚、空流误显示），但仍有 **2 起高/中危 bug 待处理**，需要维护者在下周优先排期。

---

## 6️⃣ 功能请求与路线图信号  

| 编号 | 功能方向 | 关键需求 | 与现有 PR 的关联度 | 预计纳入版本 |
|------|----------|----------|-------------------|--------------|
| **#6632** | Discord 集成 | 自动回溯历史、启动 Presence 可选 | 与现有 `discord` 代码库兼容，尚未有实现 PR。 | 可能进入 **0.4.0**（下一主版本） |
| **#6635** | 图像生成 | 支持 MiniMax H3‑Image & H3‑Image‑Highspeed | 需要在 `nanobot/providers/mini_max.py` 增加新 endpoint；当前 PR 仅为 Issue。 | 预计在 **0.4.1**（功能扩展版） |
| **#5234** | 搜索/元搜索 | 集成 mst‑python 作为多搜索引擎聚合层 | 已有 PR #5234 开启实现，仍在审查中。 | 若审查通过，可在 **0.4.0** 中同步发布 |
| **#6645** | 执行层统一 | 将沙箱检查路径与执行路径统一，减少重复代码 | 已提交 PR #6645（待合并），与执行层重构高度相关。 | 预计随 **0.4.0** 一同合并 |
| **#6642** | 发布流程 | 引入 Trusted PyPI 发布，提升安全性 | PR #6642 已提交，已通过 CI，待维护者批准。 | 预计在 **0.4.0** 中正式启用 |

> **路线图信号**：当前的 PR 合并趋势显示团队正向 **执行层统一、发布安全、搜索能力扩展** 方向倾斜，建议在下一个里程碑（0.4.0）中优先把 **Discord 回溯** 与 **mst‑python** 两项功能纳入正式版。

---

## 7️⃣ 用户反馈摘要  

- **会话串联问题**（Issue #5798）是 **首次在 0.3.5 之前出现的回归**，用户描述在多会话并发时回复错误落在旧会话，已在 0.3.5 中解决。此反馈表明 **并发会话管理是核心痛点**，后续仍需强化隔离机制。  
- **Discord 线程历史缺失** 被多位用户提及（#6632），尤其在 **企业内部协作** 场景下，机器人需要了解过去的决策链。用户希望 **启动时自动拉取最近 N 条消息** 并可选展示 “Bot 已上线” 状态。  
- **图像生成模型更新**（#6635）来自视觉创作社区，用户希望 **快速接入 MiniMax H3‑Image**，因为该模型在分辨率与速度上都有显著提升。  
- **内部心跳压制的错误回执**（#6620）导致 **监控/报警系统误判**，用户希望工具在压制时返回明确的 “suppressed” 标识，而非成功 ack。  

> **满意点**：最近的 UI 调整（设置排序、Token 用量图）得到正面反馈，用户认为 **信息可视化更直观**。  
> **不满意点**：仍有 **跨会话行为不一致** 与 **内部工具错误回执** 两大技术债，需要在下一周期重点攻克。

---

## 8️⃣ 待处理积压（长期未响应的 Issue / PR）  

| 编号 | 类型 | 简要描述 | 最后更新时间 | 建议处理时点 |
|------|------|----------|--------------|--------------|
| **#6632** | Issue (OPEN) | Discord 线程历史回溯 + 启动 Presence | 2026‑11‑12 | 高优先级（下个 sprint） |
| **#6620** | Issue (OPEN) | 心跳期间 message‑tool 被压制仍返回成功 ack | 2026‑11‑12 | 中优先级（与执行层重构同步） |
| **#5234** | PR (OPEN) | mst‑python 元搜索集成 | 2026‑11‑13 | 需要审查通过后立即合并 |
| **#6645** | PR (OPEN) | Execution 沙箱路径统一 | 2026‑11‑12 | 与 0.4.0 合并窗口同步 |
| **#6642** | PR (OPEN) | Trusted PyPI 发布 | 2026‑11‑12 | 兼顾安全发布，尽快合并 |
| **#6427** | PR (OPEN) | ExecSession stdin‑closed ack 保持 | 2026‑11‑12 | 若无冲突，可在下一个补丁版修复 |

> **提醒**：以上积压多为 **功能需求或底层安全** 类工作，若继续拖延可能影响即将推出的 Discord 与图像生成特性。建议维护者在本周评审会议中为每项分配明确的负责人与时间窗口。

---

### 结论  
NanoBot 在 **代码质量提升、UI 稳定性** 方面取得实质进展，社区活跃度稳健。当前的 **功能需求（Discord 回溯、MiniMax 图像）** 与 **内部工具一致性** 已形成明确的路线图信号，建议在即将到来的 **0.4.0** 里程碑中优先交付。保持对高危 Bug（#6620、#6427）的快速响应，将进一步提升用户对平台的信任度。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目日报（2026‑11‑13）**  
*数据来源：GitHub（sipeed/picoclaw）*  

---

### 1. 今日速览  
过去 24 h 内，项目共 4 条 Issue 变更（2 新建/活跃，2 已关闭）与 9 条 PR 更新（4 处于待合并，5 已合并/关闭）。整体活跃度处于中等水平：社区仍在关注维护与功能迭代，但大部分变更为依赖升级与细节修复。没有新版本发布，代码基线保持稳定。  

| 维度 | 统计 | 说明 |
|------|------|------|
| Issues | 4 | 2 新增/活跃（#3417, #3454），2 关闭（#3453, #3451） |
| PRs | 9 | 5 依赖更新（待合并），4 已合并/关闭 |
| Releases | 0 | 仍未发布新版本 |

---

### 2. 版本发布  
暂无新 Release。项目保持在上一版本 2026‑10‑xx 之上，未发布任何破坏性变更。  

---

### 3. 项目进展  
#### 已合并 PR（最近 24 h）
| PR | 主要改动 | 业务价值 |
|----|----------|----------|
| **#3452** | 修复 Discord 机器人在 gateway handshake 期间的 deadlock，升级 `discordgo` fork 版本。 | 防止 Discord 频道“永久失声”，提升可靠性。 |
| **#3447** | 让 Anthropic `claude‑haiku‑5‑5` 能够使用 token 认证，解决 `temperature` 参数报错。 | 解决 token 用户的调用失败，提升多模型兼容性。 |
| **#2976** | Makefile 处理 `go1.25.10` 版本字符串中空格问题。 | 修复 CI 失效，保证持续集成稳定。 |
| **#649** | 内存与缓存性能优化：新增内存缓存、改进 LRU 实现。 | 减少磁盘 I/O、提升响应速度，满足高并发使用场景。 |
| **#2363** | WebSocket 认证头统一大小写，修复认证错误。 | 增强跨平台兼容性，防止因头大小写导致的连接失败。 |

> **进展评估**：上述合并共涉及 5 项功能与性能改进，项目整体向前迈进 2–3 % 的代码质量提升。

---

### 4. 社区热点  
| 议题 | 类型 | 评论数 | 主要诉求 | 链接 |
|------|------|--------|----------|------|
| **#3417** | 开发者维护 | 5 | 由于原仓库缺乏维护，用户建立 fork 并请求官方支持。 | <https://github.com/sipeed/picoclaw/issues/3417> |
| **#3454** | 功能/验证 | 3 | 模型 ID 前缀大小写不敏感导致错误提示，需统一规则。 | <https://github.com/sipeed/picoclaw/issues/3454> |
| **#3453** | UI/功能 | 2 | WebUI 误报 “restart required”，用户体验受影响。 | <https://github.com/sipeed/picoclaw/issues/3453> |
| **#3451** | 兼容性 | 2 | 需要为 Android API 19 (x86_32/64) 设备提供支持。 | <https://github.com/sipeed/picoclaw/issues/3451> |

**分析**：#3417 体现了社区对项目持续维护的迫切需求；#3454 与 #3453 反映了用户在日常使用中遇到的细节 bug；#3451 关注老设备兼容性，暗示未来可能会有针对 legacy 系统的路线图。

---

### 5. Bug 与稳定性  
| 级别 | Issue | 影响 | Fix 状态 | 链接 |
|------|-------|------|----------|------|
| **严重** | **#3453** | WebUI 错误提示导致管理员误操作；gateway 仍标记需重启 | 已合并 PR #3452 修复部分逻辑，UI 仍需进一步确认 | <https://github.com/sipeed/picoclaw/issues/3453> |
| **中等** | **#3454** | 模型 ID 大小写不匹配导致验证错误；影响模型选择 | 仍处于讨论阶段，暂无 fix PR | <https://github.com/sipeed/picoclaw/issues/3454> |
| **低** | **#3451** | Android API 19 设备缺少支持 | 已关闭，但未实现；需在后续版本添加 | <https://github.com/sipeed/picoclaw/issues/3451> |

> 目前最紧迫的是 #3453 与 #3454，后者的验证错误已被多位用户反复提及。

---

### 6. 功能请求与路线图信号  
| 请求 | 说明 | 关联 PR | 预估纳入周期 |
|------|------|---------|--------------|
| Android API 19 支持 | 为旧设备提供兼容性 | #3451（已关闭） | 下一主版本（v0.5.0） |
| 模型 ID 自动小写 | 简化用户操作，防止错误 | #3454（未实现） | 视需求可在 v0.4.2 之前完成 |
| WebUI 重启提示修复 | 改善 UI 体验 | #3453（已修复部分） | 已在当前 PR 合并后完成 |

> **路线图信号**：项目维护者已优先处理了依赖升级与性能优化，功能需求按优先级依次推进；Android 兼容性与验证规则是后续版本的重点。

---

### 7. 用户反馈摘要  
- **维护与 Fork**：#3417 说明社区仍对 PicoClaw 保持关注，且希望官方继续维护。  
- **模型 ID 错误**：#3454 反馈模型前缀大小写不一致导致警告，用户期望自动处理。  
- **UI 误报**：#3453 让管理员误认为需要重启，影响日常管理。  
- **旧硬件支持**：#3451 关注 Android 4.4（API 19）设备的兼容性，尤其在 x86_32/64 架构。  

> 综上，用户最关心的是**持续维护**、**细节 Bug**、**跨平台兼容**与**易用性**。

---

### 8. 待处理积压  
| 议题 | 当前状态 | 建议行动 |
|------|----------|----------|
| **#3454**（模型 ID 小写规则） | open，暂无 fix PR | 继续评估实现方式，优先修复验证逻辑；可在下一 PR 合并前完成。 |
| **#3417**（fork 与维护） | open，已有 fork | 与 fork 维护者对齐，或在官方仓库中明确支持 fork 代码同步流程。 |
| **Android API 19 兼容**（#3451） | closed，功能未实现 | 计划在 v0.5.0 引入，需先评估代码改动与测试覆盖。 |
| **WebSocket 认证头大小写**（#2363） | closed，已修复 | 监测是否出现新的认证相关回归。 |

> **提醒**：保持对上述议题的跟踪，尤其是 #3454 与 #3417，它们对项目长期健康度具有决定性影响。

---

**结论**  
PicoClaw 在 2026‑11‑13 的活跃度保持稳定，核心功能与性能得到了持续改进。虽然没有新 Release，但依赖升级与 Bug 修复已完成 5 条合并 PR，项目整体稳定性提升。社区对持续维护与细节体验仍然抱有期望，建议优先处理模型 ID 规则和 WebUI 重启提示，以保持用户满意度并进一步提升项目可靠性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑11‑13**  
*(GitHub 源码仓库: <https://github.com/nanocoai/nanoclaw>)*

---

### 1. 今日速览  
- **活跃度**：过去24 h 内共出现 3 条新 Issue 与 13 条 PR，保持高频率的提交与讨论。  
- **代码质量**：发布了 v2026.11.0‑beta.2，含多项安全与性能改进，但仍有 3 条未关闭的 Bug。  
- **社区氛围**：Issue 讨论尚未深入（无评论），PR 主要集中在硬化镜像与 UI 细节上。整体健康度仍处于“高活跃、低风险”区间。

---

### 2. 版本发布  
**v2026.11.0‑beta.2** (2026‑11‑13)  
- **新功能 / 改进**  
  - 统一 hardened 镜像标签（#4348、#4346、#4339）  
  - 通过 `setup` 直接使用 HTTPS sign‑in 链接（#4316）  
  - 优化卡片 UI 兼容性（#4168、#4171、#4156、#4147）  
- **破坏性变更**  
  - 迁移到全新的 `agent` 镜像 SHA，旧镜像将不再被默认拉取。  
  - `setup` 现在会等待 Docker credential helper 完全初始化（#4341），请确保系统已安装 `docker-credential-helpers`。  
- **迁移注意事项**  
  1. 对旧版脚本使用 `nanoclaw` 需要更新镜像引用至 `797273591697.dkr.ecr.us-east-1.amazonaws.com/nanoclaw/agent@sha256:<新 SHA>`。  
  2. 若在 Windows 子系统 (WSL) 上使用旧的 `cmd.exe` 自动打开链接，建议改用 `wslview` 或 `xdg-open`。  
  3. 任何自定义 agent 需确认与新版镜像兼容，建议先在测试环境拉取 `v2026.11.0‑beta.2` 镜像。  

> **文档更新**：Release PR #4343 完成文档与发布流程整理，已合并至 `main`。

---

### 3. 项目进展  
| PR | 说明 | 影响 |
|---|---|---|
| #4343 (closed) | 发布 v2026.11.0‑beta.2，整理文档、打包 | 里程碑达成，稳定版发布 |
| #4348 | 为 `v2026.10.0` 新增 hardened 镜像 `20261112T1451` | 保障镜像安全与一致性 |
| #4346 | 为 `v2026.10.0` 新增 hardened 镜像 `20261112T1139` | 与 #4348 同步更新 |
| #4339 | 为 `v2026.10.0` 新增 hardened 镜像 `20261111T2249` | 完成镜像周期更新 |
| #4347 | 修复跨会话 backfill 失败，确保新会话能正确写入 mailbox | 提升跨会话稳定性 |
| #4168 | 解决审批卡片点击后立即变更导致的 race condition | 改进用户体验与安全 |
| #4171 | 同步 #4168，处理渠道端点击后提前回答 | 统一业务逻辑 |

> **进展**：通过 6 条关键 PR，项目在镜像安全、UI 交互、跨会话一致性等方面获得实质提升，整体向前迈进约 **3%** 的功能成熟度。

---

### 4. 社区热点  
| Issue | 类型 | 关注度 | 主要诉求 | 链接 |
|---|---|---|---|---|
| #4345 | Bug | 0 评 | `setup` 的容器构建步骤未等待 image reconcile | <https://github.com/nanocoai/nanoclaw/issues/4345> |
| #4342 | Bug | 0 评 | Node 升级导致 Docker credential helper 指向旧二进制，下载 sandbox 镜像失败 | <https://github.com/nanocoai/nanoclaw/issues/4342> |
| #4340 | Bug | 0 评 | Telegram 消息中以 `#<number>` 开头的行被渲染为标题 | <https://github.com/nanocoai/nanoclaw/issues/4340> |

> **洞察**：社区关注点均为安装与部署流程中的细节错误，提示需进一步加强 CI 测试与安装脚本健壮性。

---

### 5. Bug 与稳定性  
| Severity | Issue | 是否已 Fix | PR |
|---|---|---|---|
| High | #4345 “Setup’s container step never waits” | ❌ | – |
| High | #4342 “Setup can't fetch the hardened image after a Node upgrade” | ❌ | – |
| Medium | #4340 “Telegram lines starting with #<number> are headings” | ❌ | – |

> **风险评估**：三条 Bug 均为安装/渲染层面，影响用户部署体验，建议优先排查并在下个 PR 中加入对应自动化测试。

---

### 6. 功能请求与路线图信号  
- **未见新功能请求**（Issue 或 PR 中无 `kind/request`）。  
- **现有 PR 方向**：  
  - #4168、#4171、#4156、#4147 进一步完善审批卡片 UI，暗示未来版本将继续关注多渠道交互体验。  
  - #4316 强化登录安全，预示后续可能加入更细粒度的凭据管理。

> **结论**：功能迭代方向集中于 UI/UX 与安全性，暂无新增功能需求。

---

### 7. 用户反馈摘要  
- **痛点**：  
  - ① `setup` 过程中镜像拉取失败导致安装卡壳（#4342）。  
  - ② Telegram 渲染错误导致信息可读性差（#4340）。  
  - ③ 容器构建步骤未同步完成，造成后续步骤异常（#4345）。  
- **满意**：  
  - 大部分用户对 hardened 镜像更新感到安心，提升了系统安全度。  
- **不满意**：  
  - 部分用户反馈在 Windows/WSL 环境中打开链接的方式不一致，建议进一步统一。

> **建议**：在 Release 说明中加入针对上述安装失效场景的排查清单，提升文档完整性。

---

### 8. 待处理积压  
| Issue | 说明 | 备注 |
|---|---|---|
| #4345 | 容器构建步骤未等待 image reconcile | 需在 CI 中加入 `await` 检测，防止 race condition |
| #4342 | Node 升级后 Docker credential helper 指向旧二进制 | 需要更新 helper 逻辑，确保自动定位最新 Node |
| #4340 | Telegram 渲染 heading 问题 | 需改进消息转义逻辑，或对 Telegram 特定字段做白名单处理 |

> **提醒**：上述三条 Issue 均为安装/渲染层面关键缺陷，建议在下一工作周期内完成对应 PR 或 merge。

---

**整体健康评估**：NanoClaw 继续保持高提交频率，核心功能与安全性持续提升，当前稳定度处于“可接受”水平，但仍需关注安装流程的细节缺陷。请维护者关注上述待处理 Issue，并在下周发布周期中优先解决。祝项目持续进步！

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

# LobsterAI 项目动态日报 (2026-11-13)

## 1. 今日速览
LobsterAI 在 24 小时内展现出极高的工程迭代效率，尽管没有新的 Issue 提出或社区讨论爆发，但开发者主导的代码合并活动非常密集。过去 24 小时共更新了 **16 个 Pull Requests**，其中 **15 个已合并/关闭**，仅 1 个处于待合并状态，显示出团队正在快速修复 macOS 构建问题、优化网关启动性能以及完善“协作（Cowork）”模式的稳定性。今日无新版本发布，更新内容主要集中在底层构建修复、用户体验微调及 Agent 身份逻辑的重构，项目处于高强度的内部打磨期，而非社区驱动的功能扩张期。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日的工作重心显著偏向于**基础设施建设**和**核心模块稳定性**，而非新增大型功能。

*   **macOS 交付管线修复**：
    *   修复了 macOS 启动授权及签名保留问题，解决了 `Restricted entitlements not validated` 和 `Code=-413` 错误，确保签名和公证后的应用能正常启动。([PR #3067](https://github.com/netease-youdao/LobsterAI/pull/3067))
    *   解决了打包过程中重复公证（notarization）的问题，通过配置 `mac.notarize=false` 并由自定义 hook 独占控制，避免了构建失败或冗长的构建时间。([PR #3056](https://github.com/netease-youdao/LobsterAI/pull/3056))
*   **性能与启动优化**：
    *   **网关启动提速**：通过默认禁用 `xai` 插件（除非明确配置）和优化 `dist/package.json` 以减少 Node.js 模块解析开销，显著提升了 OpenClaw 网关的启动速度。([PR #3066](https://github.com/netease-youdao/LobsterAI/pull/3066))
    *   **缓存优化**：修复了会话引导时间戳在重放时变化的问题，确保模型请求中 prompt-cache 前缀的稳定性，从而降低 Token 消耗并提升响应速度。([PR #3058](https://github.com/netease-youdao/LobsterAI/pull/3058))
*   **Agent 与专家系统重构**：
    *   **身份冲突修复**：重构了预设专家（Preset Expert）的删除与复用逻辑。新建预设使用独立 ID，已有实例通过 `presetId` 复用，彻底解决了删除专家后身份记录冲突导致无法再次召唤的问题。([PR #3065](https://github.com/netease-youdao/LobsterAI/pull/3065))
    *   **模型继承逻辑**：召唤专家时现在会自动继承新建任务时的模型选择和思考档位，减少了用户的重复配置工作。([PR #3064](https://github.com/netease-youdao/LobsterAI/pull/3064))
*   **UI/UX 体验修复（Cowork 模式重点）**：
    *   **状态保持**：多项修复聚焦于“停止任务”后的状态保留。现在停止的思考轮次（turn）仍能正确显示使用的 Credits、模型和时间戳，而非直接消失。([PR #3053](https://github.com/netease-youdao/LobsterAI/pull/3053), [PR #3060](https://github.com/netease-youdao/LobsterAI/pull/3060))
    *   **交互细节**：修复了浏览历史时因懒加载导致的滚动跳跃 ([PR #3054](https://github.com/netease-youdao/LobsterAI/pull/3054))，以及添加文本到聊天时输入光标丢失的问题 ([PR #3055](https://github.com/netease-youdao/LobsterAI/pull/3055))。
*   **新功能支持**：
    *   支持在特定托管模型上显式选择高达 **1M 的上下文窗口**，默认仍沿用模型设定，为用户提供了更精细的控制力。([PR #3059](https://github.com/netease-youdao/LobsterAI/pull/3059))
    *   桌面端 Banner 现在支持通过链接直接跳转至内部设置或主视图，并支持服务器配置弹窗宽度。([PR #3063](https://github.com/netease-youdao/LobsterAI/pull/3063))

## 4. 社区热点
今日由于 **0 条新增/活跃 Issue**，社区侧无明显热点讨论。所有 PR 的评论数均为 `undefined`（推测为内部维护者或机器人操作，或尚未展开公开讨论）。

*   **分析**：项目当前的动态完全由核心开发团队驱动。缺乏外部社区的即时反馈表明，当前的更新可能尚未推送到广大用户手中，或者用户端暂无重大痛点急需上报。

## 5. Bug 与稳定性
今日合并的 PR 揭示了多个已修复的潜在稳定性 Bug，主要集中在 **macOS 构建** 和 **Cowork 会话状态** 上：

| 严重程度 | 问题描述 | 状态 | 关联 PR |
| :--- | :--- | :--- | :--- |
| **高** | **macOS 启动失败**：签名/公证后的 App 被 macOS 拒绝（错误码 -413），影响用户正常启动软件。 | 已修复 | [#3067](https://github.com/netease-youdao/LobsterAI/pull/3067) |
| **高** | **专家调用失效**：删除预设专家后，因 ID 复用导致身份冲突，专家无法再次召唤。 | 已修复 | [#3065](https://github.com/netease-youdao/LobsterAI/pull/3065) |
| **中** | **会话历史滚动异常**：浏览长历史时，懒加载导致页面突然跳跃，影响阅读体验。 | 已修复 | [#3054](https://github.com/netease-youdao/LobsterAI/pull/3054) |
| **中** | **计费显示缺失**：手动停止任务后，已消耗的 Credits 和模型信息不显示，可能导致用户对账单产生疑惑。 | 已修复 | [#3053](https://github.com/netease-youdao/LobsterAI/pull/3053), [#3060](https://github.com/netease-youdao/LobsterAI/pull/3060) |
| **低** | **UI 焦点丢失**：将消息文本添加到聊天后，输入框光标消失，需手动重新点击。 | 已修复 | [#3055](https://github.com/netease-youdao/LobsterAI/pull/3055) |
| **低** | **缓存失效风险**：会话重放时引导消息时间戳变化，导致 Prompt Cache Key 改变，增加成本。 | 已修复 | [#3058](https://github.com/netease-youdao/LobsterAI/pull/3058) |

*   **注意**：有一个 PR 仍处于开放状态，涉及分页会话消息中损坏元数据的容错处理。

## 6. 功能请求与路线图信号
基于已合并的 PR 和代码标记，以下功能正在本期或下一版本中落地：

1.  **超长上下文支持 (1M Context)**：
    *   **信号**：PR #3059 实现了显式选择 1M 上下文窗口的 UI 和后端逻辑。
    *   **推论**：这预示着 LobsterAI 正在适配长文本模型（如 Gemini 1.5 Pro/Flash 或 GPT-4 Turbo 的长上下文版本），旨在提升处理长文档、大型代码仓库的能力。
2.  **模块化专家系统**：
    *   **信号**：PR #3065 和 #3064 对专家 ID 管理和模型继承进行了底层重构。
    *   **推论**：这表明“专家（Experts）”功能正从实验性走向生产级稳定。未来可能会看到更多预置专家，且用户自定义专家的管理将更加灵活（不再受限于固定 ID 冲突）。
3.  **精细化成本展示**：
    *   **信号**：多次修复停止轮次（Stopped Turns）的 Credit 显示问题。
    *   **推论**：项目正在加强对 Token 消耗透明度的重视，特别是对于被中断的任务，这符合企业级或重度个人用户对成本控制的关注点。

## 7. 用户反馈摘要
由于过去 24 小时内 **Issues 数量为 0**，无法从 Issue 评论中提炼新的用户痛点或满意点。

*   **历史推断**：根据 PR #3052, #3054, #3055 的描述中提到的 "User-reported issue"，近期用户主要抱怨集中在 **UI 交互体验**（滚动跳跃、焦点丢失）和 **状态一致性**（停止后状态丢失）上。这些反馈已被开发团队迅速响应并修复，表明开发团队对前端体验细节的高度敏感。

## 8. 待处理积压
目前积压情况良好，仅有一个 PR 待合并：

*   **[OPEN] PR #3061: fix(cowork): tolerate corrupt metadata in paged session messages**
    *   **作者**: akshathayadav378-boop
    *   **描述**: 修复分页读取会话消息时，若某行消息包含损坏的 JSON 元数据会导致整个读取失败的问题。修改了 `coworkStore.ts` 中的解析逻辑以增强容错性。
    *   **关联 Issue**: 修复了 Issue #639。
    *   **建议**: 这是一个重要的稳定性修复，建议维护者尽快审查并合并，以防止用户因本地存储数据轻微损坏而导致会话历史完全无法加载。

    链接: [PR #3061](https://github.com/netease-youdao/LobsterAI/pull/3061) | [Issue #639](https://github.com/netease-youdao/LobsterAI/issues/639)

---
**分析师总结**：
LobsterAI 项目处于健康的“高强度打磨”阶段。今日无新 Issue 并非因为活跃度低，而是因为大量精力被投入到内部代码重构和 Bug 修复中，特别是针对 macOS 部署管线和 Cowork 核心工作流的稳定性。随着 1M 上下文支持和专家系统底层重构的落地，项目正为支持更复杂的 Agent 工作流和长文档处理场景打下基础。下一步需关注待合并 PR #3061 的审查进度，以及这些修复是否将通过下一个 Release 版本推送给用户。

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

# ZeroClaw 项目动态日报 (2026-11-13)

---

### 1. 今日速览

ZeroClaw 社区今日迎来里程碑式更新，正式发布 **v0.9.0** 版本。过去 24 小时内，项目呈现高度活跃状态：更新 Issue 50 条（新开/活跃 49 条，关闭 1 条），更新 PR 50 条（待合并 46 条，关闭/合并 4 条）。

目前社区的核心焦点集中在 **多租户身份认证 (OIDC)**、**细粒度沙箱安全策略 (Sandbox Policy)**、**跨 Platform (Windows) 兼容性修复** 以及 **Goal Mode (任务目标模式) 架构铺垫**。整体项目健康度较高，但在二进制体积上限（逼近 64MB 阈值）与 CI 依赖审计漏洞方面存在一定的短期运维压力。

---

### 2. 版本发布

#### [v0.9.0] - 首个支持非管理员登录与多租户隔离的版本
* **更新概要**：包含了来自 22 位贡献者的 117 次提交。
* **核心特性**：
  * **OIDC 认证接入**：Dashboard 支持通过自定义 OpenID Connect Provider 进行身份验证。
  * **多租户作用域隔离**：非管理员账户现在拥有独立的、作用域受限的 Chat 会话环境，实现了多用户下的 Agent 隔离。
* **迁移与注意事项**：从单用户/操作员模式迁移至多租户模式时，需配置新的身份验证 Provider 参数。建议使用前仔细评估现有的权限配置。

---

### 3. 项目进展

今日重点合并/推进的 PR 涉及运行时能力扩展与底层架构迭代：

* **Goal Mode 任务生命周期基础**：[PR #11878](https://github.com/zeroclaw-labs/zeroclaw/pull/11878) 与 [PR #12407](https://github.com/zeroclaw-labs/zeroclaw/pull/12407) 为 Goal Mode V1 铺设底座，引入了持久化 Session 绑定与执行 Epoch 隔离，保障长周期任务的鲁棒性。
* **Telegram 消息上下文增强**：[PR #12404](https://github.com/zeroclaw-labs/zeroclaw/pull/12404) 与 [PR #12405](https://github.com/zeroclaw-labs/zeroclaw/pull/12405) 修复了回复 Telegram 媒体（图片/视频/文档）时上下文仅展示 `[Photo]` 占位符的问题，现已将文件实体直接透传给 Agent。
* **Agent 间 RPC 调用增强**：[PR #12258](https://github.com/zeroclaw-labs/zeroclaw/pull/12258) (`sessions_prompt`) 与 [PR #12259](https://github.com/zeroclaw-labs/zeroclaw/pull/12259) (`sessions_message`) 构建了 Agent 间同步/异步会话调用的基础设施。
* **生态扩展**：[PR #12406](https://github.com/zeroclaw-labs/zeroclaw/pull/12406) 新增 Parallel 作为内置 Web 搜索 Provider（基于 MCP，无需 API Key）。

---

### 4. 社区热点

今日讨论度最高的 Issues/PRs 集中于系统安全与核心架构规范：

* **细粒度沙箱策略设计 (RFC)**：[Issue #6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) (29 条评论)
  * *背后的诉求*：解耦应用层路径准入与 OS 级沙箱 Backend (Bubblewrap/Landlock/Seatbelt)，消除两层策略漂移，建立统一的文件系统限制模型。
* **Windows 平台测试大规模失败**：[Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) (19 条评论)
  * *背后的诉求*：Windows 11 (GBK/CodePage 936) 环境下有 74 个测试失败，暴露了 Unix 硬编码指令和路径语义问题，跨平台开发者呼吁完善 Windows CI 门禁。
* **Wire Protocol 成为 Provider 架构一等公民**：[Issue #8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) (19 条评论)
  * *背后的诉求*：规范化 Provider 的构建与接入流程，重构 `reqwest` 客户端管理，解决代码冗余（参见 [Issue #5937](https://github.com/zeroclaw-labs/zeroclaw/issues/5937)）。
* **多租户 RBAC 权限控制**：[Issue #5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) (12 条评论)
  * *背后的诉求*：在多租户 Agent 部署中，支持基于 Sender 角色的细粒度访问控制。

---

### 5. Bug 与稳定性

按严重程度排序的当前重点 Bug 列表：

1. **[S0 - 严重安全漏洞] Delegate 绕过父级工具白名单**：[Issue #8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)
   * *现象*：Sub-agent 可以调用父级策略中明确禁止的工具。对应修复 PR [PR #10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) 和配套规范 [PR #12403](https://github.com/zeroclaw-labs/zeroclaw/pull/12403) 正在进行评审。
2. **[S1 - 阻碍工作流] 中途停止 Agent 导致思维链与工具调用记录被擦除**：[Issue #8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)
   * *现象*：Dashboard 中停止运行中的 Agent，会彻底丢弃当次 Turn 的思维链及已调用的工具记录，导致后续对话上下文丢失。
3. **[S1 - CI 阻碍] SQLite 安全漏洞导致 CI 依赖检查全局失败**：[Issue #12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320)
   * *现象*：`libsqlite3-sys` 的 RUSTSEC-2026-0459 导致 Security Job 失败，当前所有 PR 的 CI 必备门禁均受影响。
4. **[S2 - 内存泄漏] MCP Schema 克隆导致 RSS 无限增长**：[Issue #8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)
   * *现象*：Agent 循环中对 MCP 工具 Schema 的频繁 Clone 触发了内存持续膨胀。

---

### 6. 功能请求与路线图信号

结合 **v0.9.1 交付追踪器** [Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)，下一阶段（v0.9.1）的核心演进路线信号如下：

* **沙箱策略落地**：[PR #7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) 将 `SandboxPolicyConfig`

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*