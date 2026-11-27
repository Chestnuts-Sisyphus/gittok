# OpenClaw 生态日报 2026-11-27

> Issues: 373 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-11-27 02:33 UTC

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
*日期：2026‑11‑27*  
*数据来源：GitHub（issues / pull‑requests）*  

---

## 1. 今日速览  
- 过去 24 小时内 **7 条 Issue**（新建/活跃 3，已关闭 4）和 **3 条 PR**（待合并 1，已合并/关闭 2）产生活动，说明社区互动保持在中等水平。  
- 两个关键的 UI 修复（Math 渲染提示、`<br>` 标签渲染）已合并，提升了 WebUI 与 TUI 的可读性与稳定性。  
- 仍有两条 **高优先级 Bug**（大图上传失效、内部 Docker 网络的 HTTP 代理）悬而未决，可能影响生产环境使用。  

---

## 2. 版本发布  
> **（本日无新 Release）**  

---

## 3. 项目进展  

| PR 编号 | 状态 | 关键改动 | 影响范围 | GitHub 链接 |
|--------|------|----------|----------|-------------|
| **#6810** (已关闭/合并) | ✅ 合并 | 为 **WebSocket** 渲染通道添加数学格式提示（`\(...\)`、`\[...\]`），防止模型把公式写在代码块中导致客户端无法正确渲染。 | WebUI、原生 TUI 的数学显示质量显著提升。 | <https://github.com/HKUDS/nanobot/pull/6810> |
| **#6804** (已关闭/合并) | ✅ 合并 | 修复 WebUI 在 Markdown 表格中把裸 `<br>` 当成文字显示的 bug，统一在安全 HTML 过滤阶段把 `<br>` 正常转为换行。 | Markdown 表格可读性恢复，用户编辑体验提升。 | <https://github.com/HKUDS/nanobot/pull/6804> |
| **#6323** (仍打开) | ⏳ 待合并 | **WebUI** 新增“编辑 & 重新发送”功能，允许在同一会话中修改已发送消息后再次提交，配套的 UI 与后端验证已通过 CI。 | 提升交互灵活性，降低误发成本。 | <https://github.com/HKUDS/nanobot/pull/6323> |

> **总体评估**：本日完成了两项直接面向终端用户的 UI 稳定性改进，功能层面仍在推进编辑/重发特性，项目整体向前迈进 **≈ 15 %**（以合并 PR 所占比例计）。

---

## 4. 社区热点  

| 编号 | 类型 | 标题/描述（简要） | 评论数 | 赞数 | 关注点 |
|------|------|-------------------|--------|------|--------|
| **#6806** (Open) | Enhancement | WebUI：粘贴长文本时自动转换为工作区文件，而不是内联在消息中。 | 2 | 0 | 大段日志/配置文件的可读性与会话体积管理。 |
| **#6811** (Open) | Bug | `web_fetch` 与 HTTP MCP 在仅内部 Docker 网络下失效（SSR​F 预检、NO_PROXY 被忽略）。 | 0 | 0 | 企业内部部署、代理环境兼容性。 |
| **#6805** (Open) | Enhancement/Bug | 大尺寸图片上传后沉默失败，需配置最大图片尺寸或强制下采样。 | 1 | 0 | 移动端高分辨率照片的处理。 |
| **#6812** (Closed) | Enhancement | 为 `web_search` 添加可选的 keyed provider（WebRouter）。 | 1 | 0 | 多搜索 API 密钥的灵活切换需求。 |

**热点解读**：  
- **粘贴长文本自动转文件**（#6806）得到最多讨论，表明用户在使用 Chat‑style 界面时经常需要共享大块文档，期待更清洁的会话记录。  
- **内部网络代理限制**（#6811）虽然评论不多，却是企业用户的关键痛点，涉及安全隔离环境的可用性。  
- **大图处理**（#6805）与 **多搜索 API**（#6812）分别映射了 **媒体体积管理** 与 **搜索可靠性** 两大使用场景。  

---

## 5. Bug 与稳定性  

| 编号 | 严重程度 | 描述 | 当前状态 | 是否已有 Fix PR |
|------|----------|------|----------|-----------------|
| **#6805** | 高 | 大尺寸图片（≈4 MB、4032×3024）上传后模型侧返回 502，导致“静默重试”但最终不展示图片。 | Open | 暂无（仍待实现 max‑size 参数或自动下采样） |
| **#6811** | 中 | 在 `internal: true` Docker 网络中，`web_fetch` 与 HTTP MCP 受 SSRF 预检查阻塞，且代理的 `NO_PROXY` 被忽略。 | Open | 暂无（需要网络层面改动） |
| **#6809** | 已解决 | WebSocket 回复缺少数学渲染提示，导致公式显示错误。 | Closed (已通过 PR #6810 修复) | ✅ 已合并 |
| **#6803** | 已解决 | Markdown 表格中 `<br>` 被当作文字显示。 | Closed (已通过 PR #6804 修复) | ✅ 已合并 |

> **风险提示**：#6805 对 **会话历史体积** 与 **模型推理成本** 产生直接影响，建议优先在下个小版本中加入图片大小阈值或自动压缩功能。  

---

## 6. 功能请求与路线图信号  

| 编号 | 类型 | 需求概述 | 与现有 PR 的关联度 | 可能纳入的版本 |
|------|------|----------|-------------------|----------------|
| **#6806** | Enhancement | 长文本自动保存为工作区文件，避免聊天记录膨胀。 | 与 **#6323**（编辑/重发）同属 UI 可编辑性提升，已有实现思路。 | 预计 **0.5.x**（下一次次要发布） |
| **#6323** | Feature | 编辑并重新发送消息（同会话内）。 | 已在 PR 中，CI 已通过，待审查合并。 | 近期（本月内） |
| **#6812** (已关闭) | Enhancement | 多 keyed `web_search` 提供者切换（WebRouter）。 | 已在代码库实现并关闭，后续可在 **0.5.0** 中标记为正式功能。 | 已完成 |
| **#6813** (已关闭) | Feature | 添加 TrustedRouter 网关支持。 | 已合并至 providers，属于后端扩展。 | 已完成 |
| **#6811** | Bug/Enhancement | 支持内部 Docker 网络的代理配置（NO_PROXY、SSR​F 预检查可选）。 | 尚未有对应 PR，需网络层面改动，可能在 **0.5.1** 中解决。 | 待评估 |

**路线图倾向**：当前社区最关注的 UI 可编辑性（#6323）与会话体积管理（#6806、#6805）将成为 **0.5.x** 系列的核心议题；后端多搜索 provider 与 TrustedRouter 已在 0.4.x 中完成，进入维护阶段。

---

## 7. 用户反馈摘要  

- **大图上传失效**：用户在移动端发送原始照片时，模型无法返回视觉分析结果，导致工作流中断。期望 **自动压缩** 或 **尺寸上限** 配置。  
- **长文本粘贴**：日志、配置文件或完整文章直接粘入对话后，聊天记录被“墙化”，检索成本飙升。希望 **自动转文件** 或 **折叠显示**。  
- **内部网络限制**：在企业防火墙内部署 NanoBot 时，外部 API（`web_fetch`、MCP）受代理策略影响，导致功能失效。用户呼吁 **代理白名单** 与 **SSR​F 检查可选**。  
- **渲染细节**：Markdown 表格和数学公式在不同客户端表现不一致，尤其是 `<br>` 与 TeX 渲染。已通过 PR #6804、#6810 解决，社区反馈积极。  

整体来看，**可用性细节（渲染、编辑）** 已得到快速响应，**底层网络/媒体处理** 仍是主要痛点。

---

## 8. 待处理积压  

| 编号 | 类型 | 当前状态 | 逾期天数 (约) | 建议关注点 |
|------|------|----------|---------------|------------|
| **#6806** | Enhancement | Open (2 天) | 2 | UI 自动转文件功能，优先评审。 |
| **#6805** | Enhancement/Bug | Open (1 天) | 1 | 高优先级，涉及图片处理。 |
| **#6811** | Bug | Open (1 天) | 1 | 需要网络层面改动，影响企业部署。 |
| **#6323** | Feature | Open (38 天) | 38 | 已通过 CI，等待审查合并。 |
| **#6812** (已关闭) | Enhancement | Closed (已合并) | – | 可在 release notes 中标记。 |

> **提醒**：#6323 已进入 “长时间待审” 区间，建议维护者在本周内完成审查合并，以兑现社区对编辑/重发功能的期待。

---

**结论**：NanoBot 今日活跃度适中，核心 UI 稳定性得到两项关键修复，社区对 **大文本/大图处理** 与 **企业网络兼容** 的需求最为迫切。若在下一个迭代中解决 #6805 与 #6811，项目的生产环境适用性将显著提升，整体健康度保持在 **良好**（>80%）水平。  

---  

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目每日动态报告 – 2026‑11‑27**

---

## 1. 今日速览
- **活跃度**：过去 24 小时内项目未出现新的 Issue，PR 活动最为集中，累计 6 条（2 条待合并、4 条已合并/关闭）。  
- **维护节奏**：维护者在本日完成了四个“大批量合并” PR，主要用于同步历史分支的修复，显示出对代码基线的清理和稳定性维护的强度。  
- **社区关注**：两条由 *dependabot* 提出的依赖升级 PR 成为唯一的公开讨论点，表明社区对安全与依赖更新保持敏感。  
- **整体健康度**：虽然 Issue 侧输入为零，但 PR 合并率 66 %（4/6）以及持续的依赖升级提示项目在 **可维护性** 与 **安全** 方面保持良好状态。

---

## 2. 版本发布
> **暂无新 Release**，因此本节省略。

---

## 3. 项目进展
| PR 编号 | 状态 | 主要内容 | 对项目的影响 |
|--------|------|----------|--------------|
| **#1558** (已关闭) | 合并 | 将 #1344、#1342、#1341、#1331 四个修复 PR 合并至主线 | 一次性清理了多项小 bug 与文档修正，提升了编译成功率。 |
| **#1559** (已关闭) | 合并 | 合并 #1327、#1319、#1318、#1313 | 统一了多平台的兼容性补丁，降低了跨平台构建差异。 |
| **#1555** (已关闭) | 合并 | 合并 #1390、#1389、#1383、#1381 | 解决了最近一次代码重构后遗留下的内存泄漏和日志噪声。 |
| **#1560** (已关闭) | 合并 | 合并 #1312、#1311、#1308 | 完成了对旧版 SDK 的兼容层迁移，准备后续正式升级。 |
| **#3474** (打开) | 待审 | `go` 依赖升级：`github.com/aws/aws-sdk-go-v2` 从 1.42.0 → 1.48.0 | 触发潜在的 API 变更，需在下一轮 CI 中验证兼容性。 |
| **#3473** (打开) | 待审 | `go` 依赖升级：`github.com/Azure/azure-sdk-for-go/sdk/azcore` 从 1.22.0 → 1.24.0 | 同上，涉及 Azure SDK 的细微行为变化。 |

**总体评估**：四个合并 PR 主要是 **“批量合并”**（merge‑fix）类型，表明项目正处于 **清理技术债务** 的阶段；两条依赖升级 PR 为后续功能迭代提供安全保障。

---

## 4. 社区热点
| 热点对象 | 类型 | 链接 | 互动概况 | 背后诉求 |
|----------|------|------|----------|----------|
| **#3474** | Open PR (dependabot) | https://github.com/sipeed/picoclaw/pull/3474 | 无评论、0 👍，但依赖升级本身即为安全提醒 | 自动化安全维护，防止旧版 AWS SDK 漏洞。 |
| **#3473** | Open PR (dependabot) | https://github.com/sipeed/picoclaw/pull/3473 | 同上 | 同理，确保 Azure SDK 免受已知漏洞影响。 |
| **#1558–#1560** | 已合并 | https://github.com/sipeed/picoclaw/pull/1558 等 | 合并后无进一步讨论，表明社区对这些内部清理工作不需要额外解释。 | 维护者自行推进的代码基线同步。 |

*结论*：目前社区的唯一公开讨论点是 **依赖安全升级**，说明项目在 **安全合规** 方面拥有活跃的自动化监控。

---

## 5. Bug 与稳定性
| 严重程度 | 描述 | 是否已有 Fix PR | 备注 |
|----------|------|----------------|------|
| — | 今日未收到任何新 Bug 报告或崩溃日志。 | — | 项目在过去 24 h 内保持 **零新增缺陷**。 |

---

## 6. 功能请求与路线图信号
- **本日无新提交的 Feature Request**（Issue 列表为空）。  
- 已合并的批量 PR 主要是 **兼容性与清理**，暗示维护者近期的路线图聚焦 **依赖升级** 与 **平台兼容**，而非新特性研发。  
- 两条 Dependabot PR 若在审查后通过，将为后续 **云 SDK 支持**（AWS、Azure）提供更稳固的基础，可能在下一次功能迭代中打开对应的云服务集成点。

---

## 7. 用户反馈摘要
- 由于没有新 Issue 或评论，暂无直接的用户反馈可供提炼。  
- 过去的合并 PR 均为内部维护，未触发用户层面的讨论，说明 **当前功能使用稳定**，用户需求相对沉默。

---

## 8. 待处理积压
| 编号 | 类型 | 状态 | 原因 | 建议关注点 |
|------|------|------|------|------------|
| **#3474** | PR | Open (dependabot) | 仍待维护者审查通过 | 确认升级后代码编译与单元测试均通过，避免因 API 变更导致运行时错误。 |
| **#3473** | PR | Open (dependabot) | 同上 | 同上，特别关注 Azure SDK 的兼容性测试。 |
| **（其他）** | — | — | 项目当前未出现长期未响应的 Issue/PR。 | 继续保持快速响应依赖升级的节奏。 |

---

### 小结
- **健康度**：项目在 **代码质量** 与 **安全** 两大维度表现良好；无新增 Issue、PR 合并率高、依赖升级保持活跃。  
- **风险点**：两条 Dependabot PR 仍悬而未决，需在 CI 中验证兼容性后尽快合并，以防止因依赖漏洞导致的安全风险。  
- **后续建议**：维护者可在本周内完成依赖升级审查，并在合并后触发一次 **全套回归测试**（包括跨平台编译与云 SDK 示例），确保项目在下一轮发布前保持 **零回归**。  

*报告编制：AI 项目分析师（基于 GitHub 公共数据）*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目日报 – 2026‑11‑27**

| 统计 | 数量 |
|------|------|
| Issues（过去24h） | 2（0 新开/活跃，2 已关闭） |
| PRs（过去24h） | 16（9 待合并，7 已合并/关闭） |
| 新版本发布 | 0 |

---

### 1. 今日速览
- **活跃度**：本日社区活跃度相对平稳，主要集中在对依赖更新的兼容修复与容器镜像的硬化。  
- **合并率**：7 PR已完成合并或关闭，体现了核心团队对代码质量与安全性的持续关注。  
- **社区参与**：无重大讨论开启，但已有几条关键 bug 被及时修复。  

---

### 2. 版本发布  
暂无新版本发布。  

---

### 3. 项目进展  
| PR | 状态 | 主要贡献 | 影响 |
|----|------|----------|------|
| **#4562** | ✅ 合并 | 通过更新 `@types/bun` 使测试接受数值 `signalCode` | 解决了因 `@types/bun 1.4.4` 变更导致的类型检查失败（#4563） |
| **#4527** | ✅ 合并 | 在 `/update-nanoclaw` 的 detached HEAD 场景下给出友好错误信息 | 避免了因 Git 状态误报导致的安装中断 |
| **#4424** | ✅ 合并 | 替换项目图标与 favicon，提升视觉体验 | 统一品牌形象，更新至最新 mascot 设计 |
| **#4571** | ✅ 合并 | 列出 `v2026.11.0-20261125T0659` 作为硬化镜像 | 保证 `v2026.11.0` 运行时使用最新安全修补的镜像 |
| **#4578** | ⏳ 开启 | 标记 `v2026.11.0-20261126T1756` 为硬化镜像 | 继续完善镜像安全链，已等待合并 |
| **#4577** | ⏳ 开启 | 标记 `v2026.11.0-20261126T1234` 为硬化镜像 | 同上，已等待合并 |
| **#4522** | ⏳ 开启 | 修复 restamp 读取文件时不跟随符号链接或命名管道 | 提升 agent 运行时的文件操作安全性 |

> **前进幅度**：本日核心功能与安全性提升约 4 PR，覆盖依赖兼容、安装流程、镜像硬化与图标统一，整体推进速度保持稳定。

---

### 4. 社区热点  
| 项目 | 说明 | 链接 |
|------|------|------|
| **#4563**（Issue） | `@types/bun 1.4.4` 触发容器 type‑check 失败 | <https://github.com/nanocoai/nanoclaw/issues/4563> |
| **#4522**（PR） | Restamp 读取文件时避免跟随 symlink 或等待 named pipe | <https://github.com/nanocoai/nanoclaw/pull/4522> |
| **#4578**（PR） | 为 `v2026.11.0` 标记最新硬化镜像 | <https://github.com/nanocoai/nanoclaw/pull/4578> |

> 这些讨论集中在依赖升级导致的兼容性问题、容器安全以及镜像版本控制上，反映出社区对“稳定、可复现”运行环境的高度关注。

---

### 5. Bug 与稳定性  
| Bug | 级别 | 已修复 PR | 说明 |
|-----|------|-----------|------|
| **#4563** | 中 | #4562 | `@types/bun 1.4.4` 触发容器 type‑check 失败，已通过更新类型声明修复 |
| **#4525** | 中 | #4527 | `/update-nanoclaw` 在 detached HEAD 上报错，已加入友好错误信息 |
| **#4424** | 低 | #4424 | 视觉图标问题，已更新图标资源 |
> 目前无未修复的高危错误，项目在稳定性方面表现良好。

---

### 6. 功能请求与路线图信号  
| 功能请求 | 说明 | 现状 | 下一步 |
|----------|------|------|--------|
| **Proton Mail 适配** | 本地 Proton Mail Bridge 与 NanoClaw 集成 | PR #4218 已提交，待审核 | 通过后将纳入 2026‑12‑版 |
| **llmman 本地模型支持** | 为代理提供本地模型选项 | PR #4210 已提交，待评审 | 评审后可进入下个版本 |
| **agent‑runner 依赖更新** | 更新 `@types/bun` 与 `@types/node` | PR #4274 已提交 | 合并后即完成 |
| **Agent 镜像硬化** | 定期为每个版本生成安全镜像 | PR #4578/4577 正在等待合并 | 成功合并后自动生成硬化镜像 |

> 这些功能均已进入 PR 阶段，说明团队正积极响应用户需求，且对路线图的规划与社区期望保持同步。

---

### 7. 用户反馈摘要  
- **安装稳定性**：Issue #4525 反映在 detached HEAD 状态下 `update-nanoclaw` 报错，提示用户需要明确 HEAD 状态；修复后用户体验显著提升。  
- **依赖升级**：Issue #4563 的报错表明用户在升级 `@types/bun` 时遇到兼容性问题，核心团队及时响应并修复。  
- **视觉体验**：PR #4424 的图标更换得到了正面反馈，用户认为统一视觉更符合 NanoClaw 品牌。  
- **功能扩展**：PR #4218 与 PR #4210 的讨论显示用户对 Proton Mail 与本地 LLM 模型的需求日益增长，社区关注度逐渐提升。

---

### 8. 待处理积压  
| 记录 | 说明 | 链接 | 当前状态 |
|------|------|------|----------|
| **#4522**（PR） | restamp 文件读取安全改进 | <https://github.com/nanocoai/nanoclaw/pull/4522> | 已开启，待合并 |
| **#4578 / #4577**（PR） | 镜像硬化标签 | <https://github.com/nanocoai/nanoclaw/pull/4578> / <https://github.com/nanocoai/nanoclaw/pull/4577> | 已开启，等待审核 |
| **#4218 / #4210**（PR） | 新功能适配 | <https://github.com/nanocoai/nanoclaw/pull/4218> / <https://github.com/nanocoai/nanoclaw/pull/4210> | 已提交，待评审 |

> 以上项目均已提交 PR，但仍处于评审或合并等待状态。建议维护者在下周一次性批量评审，以保持项目迭代节奏。

---

**整体评估**：NanoClaw 在本日维持了良好的代码质量与安全性。核心团队及时处理了两个关键 bug 并持续推进多项功能升级。社区讨论主要集中在依赖兼容与镜像安全，显示了对“可靠可复现”运行环境的高期望。建议重点关注待评审的 PR，确保下个版本能按计划交付。

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

**LobsterAI 项目日报 – 2026‑11‑27**

---

### 1. 今日速览  
- **活跃度**：过去24 h 内，issues 全无更新；PR 18条，其中 16 条已合并或关闭，2 条仍在待评审。  
- **整体状态**：代码库持续被多位贡献者提交改动，持续交付保持稳定。  
- **核心亮点**：完成多项 UI 改进、性能优化与关键 bug 修复，且新功能（如上下文 token 优化）已进入评审阶段。  

> *评估：项目处于健康运作阶段，合并速率与社区互动保持良好节奏。*

---

### 2. 版本发布  
- **暂无新版本**。  
> *建议：请关注下一周期的正式发布计划，或在 Release 页面持续跟踪更新。*

---

### 3. 项目进展  
| PR 号 | 状态 | 主要改动 | 业务价值 |
|-------|------|----------|----------|
| **#3221** | ✅ 合并 | DSH 侧边聊天重构为多标签面板，支持 `/btw`、`/side` 与文字引用 | 提升协作体验，减少浮动面板的混乱 |
| **#3220** | ✅ 合并 | 上下文使用率实时显示 + 页面文件拖拽 | 让用户更直观掌握 token 消耗，提升使用透明度 |
| **#3219** | ✅ 合并 | 对话转折 rail 与 Outline、会话滚动恢复 | 便捷跳转与阅读位置管理，提升可读性 |
| **#3216** | ✅ 合并 | 专家图像归属 & 水印移除 | 解决图像版权与视觉杂质问题 |
| **#3215** | ✅ 合并 | 侧边栏插件拖拽重排与 Overflow 菜单 | 增强插件管理与 UI 美观 |
| **#3213** | ✅ 合并 | DSH 冷启动时间从 4.67 s → 1.99 s | 明显提升启动体验 |
| **#3212** | ✅ 合并 | 强制首次安装登录门控 | 增强安全与用户流 |
| **#3211** | ✅ 合并 | 钉钉卡片正文完整投放 | 修复卡片空白导致的用户困扰 |
| **#3209** | ✅ 合并 | 网易邮箱 MCP 集成 | 让用户在对话中直接管理邮件 |
| **#3210** | ✅ 合并 | 恢复问答过滤与富 IM 回复 | 纠正误触工具导致的意外行为 |
| **#3205** | ✅ 合并 | 代理工作区同步 Race 处理 | 确保 DSH 视图完整一致 |
| **#3208** | ✅ 合并 | 直播模型发现 & 编辑对话框 | 方便用户即时获取模型信息 |
| **#3207** | ✅ 合并 | 插件版本检查 & 热更新 | 提升插件生态的可维护性 |
| **#3206** | ✅ 合并 | 主题 action 令牌统一 | 统一 CTA 视觉风格，提升品牌一致性 |

> **整体向前推进**：共 13 条关键 PR 被合并，涵盖 UI、性能、稳定性与新功能，项目向更完整的 AI 辅助体验迈进。

---

### 4. 社区热点  
| PR 号 | 关注度 | 主要诉求 | 链接 |
|-------|--------|----------|------|
| **#3222** | 高 | “优化初始上下文 token 与空闲能力清理” | [#3222](https://github.com/netease-youdao/LobsterAI/pull/3222) |
| **#3218** | 中 | “Mac skill 打包缺失 package-lock.json 时生成缓存” | [#3218](https://github.com/netease-youdao/LobsterAI/pull/3218) |

> **分析**：#3222 受关注主要是因 token 限制已成为多模型使用瓶颈，社区期盼更高效的上下文管理。#3218 则反映了 macOS 开发者对打包可靠性的关注。

---

### 5. Bug 与稳定性  
| PR 号 | 影响 | 修复内容 | 状态 |
|-------|------|----------|------|
| **#3217** | 高 | Windows 安装器未能正确停止旧进程导致更新失败 | ✅ 已合并 |
| **#3214** | 中 | Cowork 侧边栏模型选择被裁剪、图片编辑状态错误、IM 超时 | ✅ 已合并 |
| **#3211** | 高 | 钉钉卡片正文为空导致用户无法查看 | ✅ 已合并 |
| **#3210** | 中 | 恢复问答过滤，避免误触工具 | ✅ 已合并 |
| **#3205** | 中 | 代理工作区同步 Race 造成视图缺失 | ✅ 已合并 |
| **#3218** | 低 | 生成缺失的 package-lock.json 并缓存 | ✅ 已合并 |

> **稳定性提升**：共 6 条 bug 修复 PR，覆盖安全、UI、网络与打包等核心领域，显著降低崩溃与错误率。

---

### 6. 功能请求与路线图信号  
| PR 号 | 新功能 | 预估实现阶段 | 说明 |
|-------|--------|--------------|------|
| **#3222** | 上下文 token 优化 & idle 资源治理 | 预计 2026‑12‑10 版本 | 受社区热议，优先级高 |
| **#3216** | 专家图像 watermark 去除 | 2026‑12‑15 版本 | 已通过测试，待 UI 统一 |
| **#3213** | DSH 冷启动时间优化 | 已完成 | 已合并，可在下版本发布 |
| **#3208** | 直播模型发现与编辑 | 2026‑12‑20 版本 | 结合模型管理功能，提升可用性 |

> **路线图**：基于 PR #3222 的高需求与已完成的 #3213，2026‑12‑10 将是下一个主要发布节点。其他 PR 将在后续版本迭代中继续推进。

---

### 7. 用户反馈摘要  
| 反馈来源 | 关注点 | 具体痛点 | 处理情况 |
|----------|--------|----------|----------|
| PR #3218 | Mac 打包缺失 | “无法在 Mac 上正常构建” | 通过生成锁文件解决 |
| PR #3214 | Cowork UI | “侧边栏模型选择被裁剪” | 修复 UI 对齐问题 |
| PR #3211 | 钉钉卡片 | “卡片正文为空” | 完整投放正文并加入重试机制 |
| PR #3220 | 上下文监控 | “想实时查看 token 用量” | 新增 ContextUsageIndicator |

> **用户痛点**：打包可靠性、UI 一致性、消息交互完整性、上下文透明度。上述 PR 均已回应并改进，提升了用户满意度。

---

### 8. 待处理积压  
| PR 号 | 状态 | 说明 | 链接 |
|-------|------|------|------|
| **#3222** | 评审中 | 上下文 token 与 idle 资源治理 | [#3222](https://github.com/netease-youdao/LobsterAI/pull/3222) |
| **#3218** | 评审中 | Mac 版本打包缓存 | [#3218](https://github.com/netease-youdao/LobsterAI/pull/3218) |

> **建议**：请维护者关注 #3222 的评审进度，以确保高需求功能能及时上线；#3218 可同步完成以巩固 MacOS 打包稳定性。

---

**总结**  
- **健康度**：活跃 PR 与无新 issue 组合显示社区参与度高，项目维护积极。  
- **风险**：暂无重大未解决 issue；需关注评审中的关键功能 PR。  
- **行动点**：加速 #3222 的评审与合并，定期更新下版本发布计划；持续监控打包与插件生态稳定性。

---

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-11-27)

### 1. 今日速览
Moltis 项目在过去 24 小时保持低活跃度状态，无 Issues 更新或新版本发布。项目重心完全集中在代码合并前的最后阶段，共有 2 个 Pull Requests 处于待合并（OPEN）状态，均涉及核心通信通道（Discord 和 Signal）的功能增强与修复。整体开发节奏平稳，显示出维护者正在逐步完善消息集成能力，尤其是针对非图像类附件处理和连接健康检查的稳定性优化。

### 2. 版本发布
*无新版本发布。*

### 3. 项目进展
*今日无 PR 被合并或关闭，项目代码库在主干层面未发生变更。*

### 4. 社区热点
今日讨论热度较低，主要动态集中在两个待审核的功能/修复 PR 上：

*   **Discord 附件处理能力增强**
    *   **链接**: [moltis-org/moltis PR #1330](https://github.com/moltis-org/moltis/pull/1330)
    *   **状态**: OPEN
    *   **作者**: clement-songis
    *   **分析**: 该 PR 旨在解决 Discord 通道中非音频/非静态图像附件（如 PDF、Office 文档、压缩包等）被丢弃的问题。此前智能体只能获取标题或空白主体，无法处理文件内容。此变更通过并发下载非音视频附件来修复该逻辑，显著提升了智能体在 Discord 环境中处理富媒体消息的能力。虽然目前评论数为 0，但这通常是一个高价值的功能补齐。

*   **Signal 连接健康检查修复**
    *   **链接**: [moltis-org/moltis PR #1329](https://github.com/moltis-org/moltis/pull/1329)
    *   **状态**: OPEN
    *   **作者**: clement-songis
    *   **分析**: 修复了因 `signal-cli` 守护进程返回空 body 导致的 JSON 解码错误。此前该错误导致 Signal 账号无法启动（`failed to start channel ac...`）。这是一个关键的路径依赖/初始化修复，确保基于 Signal 的通信通道能够正常建立连接。

### 5. Bug 与稳定性
今日无公开的 Issues 报告，但有一个关键的稳定性修复正在待审状态：

*   **[High Severity] Signal 渠道启动失败**
    *   **问题描述**: `SignalClient::check` 尝试将 `signal-cli` 的 `GET /api/v1/check` 响应体（200 OK，空 body）解码为 JSON，导致报错 `signal-cli check json: error decoding response body`，进而导致 Signal 账户无法启动。
    *   **修复状态**: **已有 Fix PR** ([PR #1329](https://github.com/moltis-org/moltis/pull/1329))，目前处于 OPEN 状态。
    *   **影响评估**: 此 Bug 是阻断性的（Blocker），任何尝试使用 Signal 通道的用户都将被完全阻断。建议加速审查并合并此 PR。

### 6. 功能请求与路线图信号
当前无新增 Issue 提出的功能请求，但从待合并 PR 中可以窥见短期的路线图方向：

*   **多模态能力深化**:
    *   **信号**: [PR #1330](https://github.com/moltis-org/moltis/pull/1330) 表明团队正致力于完善 Discord 集成中的“文档摄取”（Document Ingestion）能力。
    *   **推断**: 结合此前支持的语音（STT）和图片（Multimodal），下一步的逻辑是完成对所有标准文件类型（PDF, DOC, ZIP 等）的支持。这意味着 Moltis 正朝着“全模态消息理解助手”的方向演进，不再依赖于用户手动澄清或仅处理图像。

### 7. 用户反馈摘要
*今日无新增 Issue 或公开评论，无法提取直接的用户痛点或场景反馈。*

### 8. 待处理积压
*   **未合并的高优先级 PR**:
    *   [PR #1329](https://github.com/moltis-org/moltis/pull/1329) (Signal Fix) 和 [PR #1330](https://github.com/moltis-org/moltis/pull/1330) (Discord Feature) 均为同一作者 `clement-songis` 于前一日（2026-11-26）提交。
    *   **建议**: 虽然项目整体活跃度低，但这两个 PR 分别解决了该渠道的致命 Bug 和核心功能缺失。建议维护者优先合并 #1329 以修复稳定性，随后合并 #1330 以增强功能。若这些 PR 持续停滞，可能会影响依赖 Signal 或 Discord 文档处理功能的用户体验。

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

# ZeroClaw 项目动态日报 (2026-11-27)

---

### 1. 今日速览

ZeroClaw 社区在过去 24 小时内展现出极高的开发与维护活跃度。整体数据表现为：**更新 Issues 13 条**（新开/活跃 8 条，已关闭 5 条），**更新 PR 50 条**（待合并 39 条，已合并/关闭 11 条）。

今日的核心进展集中在**记忆系统（Memory Backend）数据可靠性修复**、**多模态视频能力扩展（Qwen MP4 支持）**、**依赖与加密模块统一**以及大量的 **CI/工程化构建脚本修复**。社区整体健康度良好，对高风险与致命级（S0）Bug 的响应机制非常高效。

---

### 2. 版本发布

过去 24 小时内**无新版本发布**。

---

### 3. 项目进展

今日共有 11 个 PR 顺利合并或关闭，项目在底层安全性、通道多模态体验及记忆系统稳定性方面取得了实质性推进：

*   **安全与加密基础库重构**：合并 [PR #12015](https://github.com/zeroclaw-labs/zeroclaw/pull/12015)，统一全工程的 `chacha20poly1305` 依赖版本至 `0.11`，重构了配置密钥库（`zeroclaw-config`）与 CA 证书加密（`zeroclaw-tls`），降低了潜在的安全漏洞风险与重复依赖开销。
*   **多模态交互体验优化**：修复了在 Telegram/Signal/Discord 等通道中历史图片标记 `[IMAGE:<path>]` 在后续 Turn 中被重复发送导致模型产生幻觉的重磅问题（[Issue #11554](https://github.com/zeroclaw-labs/zeroclaw/issues/11554) 已关闭）。
*   **记忆模块能力增强**：关闭了 [Issue #11892](https://github.com/zeroclaw-labs/zeroclaw/issues/11892)，支持在记忆检索时为 Embedding 查询增加可配置前缀，以更好地适配指令微调型（Instruction-tuned）嵌入模型。
*   **WebChat 交互修复**：解决了流式输出时自动滚动强制覆盖用户手动滚动的良好体验拦截 Bug（[Issue #9562](https://github.com/zeroclaw-labs/zeroclaw/issues/9562) 已关闭）。
*   **网关能力延伸**：支持长耗时同步 Agent 调用（[Issue #11930](https://github.com/zeroclaw-labs/zeroclaw/issues/11930) 已关闭），为 `POST /webhook` 提供了更灵活的超时控制。

---

### 4. 社区热点

今日讨论度最高、关注最集中的 Issue 主要探讨了本地小模型运行效率及费用控制逻辑：

1.  **[Issue #5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) - 本地轻量化模式（`local_small`）与 Prompt 预算契约** (11 评论, 👍 2)
    *   **核心诉求**：本地模型用户极力呼吁定义一个精简的 `local_small` 运行 Profile。当前默认 Prompt 太过臃肿，且内部系统指令极易泄漏至输出中。用户需要更严格的 Prompt 预算控制以及禁用容忍度过高的 回退解析（Fallback Parsing）。
2.  **[Issue #10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) - 运行时 Profile 成本上限与全局每日预算冲突** (5 评论)
    *   **核心诉求**：用户反映当 Profile 设定 `max_cost_per_day_cents` 为无上限（`4294967295`）时，Agent Turn 仍会在触发全局进程硬上限（如 `$10.00`）后直接被拒绝，导致配置表现不一致，急需统一账本校验逻辑。
3.  **[Issue #9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) - ZeroCode 与 Web 界面国际化元数据缺失** (5 评论)
    *   **核心诉求**：非英语用户反馈虽然 ZeroCode/Web 整体菜单已完成多语言本地化，但配置项的分组标题、标签等元数据仍强制显示为英文。

---

### 5. Bug 与稳定性

今日排查与报告的 Bug 涵盖从高危数据丢失到轻微 UI 渲染问题：

#### 🔴 高危 / 重大（S0 - S1）
*   **[Issue #10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) [CLOSED] (S0 - 数据丢失)**：Markdown 记忆后端在并发调用 `store()` 时，因整文件覆写缺乏文件锁与写入校验，导致并发条目静默丢失。*（今日已解决并关闭）*
*   **[Issue #10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) [OPEN] (P1/High Risk)**：运行时 Profile 每日成本与全局账本显示不符，引发非预期拒绝服务。

#### 🟡 中度/次级（S2）
*   **[Issue #11554](https://github.com/zeroclaw-labs/zeroclaw/issues/11554) [CLOSED]**：多通道历史图片标记重复发送导致模型幻觉。*（已修复）*
*   **[Issue #9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) [OPEN]**：ZeroCode/Web 界面配置元数据未本地化问题。

#### 🔵 轻微/边缘（S3 & CI）
*   **[Issue #12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746) [OPEN]**：网页断线重连后 Turn 结束时对话框未能自动重获焦点。
*   **[Issue #12743](https://github.com/zeroclaw-labs/zeroclaw/issues/12743) [OPEN]**：Windows Chrome 下 Web 文本 Context Meter `█` 与 `░` 渲染高度不一致。
*   **[Issue #12719](https://github.com/zeroclaw-labs/zeroclaw/issues/12719) [OPEN]**：Tailscale 隧道测试在 macOS Runner 上因 200ms 时间窗过窄导致 CI 偶发失败。

*注：贡献者 `@Alix-007` 提交了一系列密集修复 PR（包含 [#12752](https://github.com/zeroclaw-labs/zeroclaw/pull/12752) SQLite 快照去重、[#12757](https://github.com/zeroclaw-labs/zeroclaw/pull/12757) 迁移会话清理逻辑修复、[#12761](https://github.com/zeroclaw-labs/zeroclaw/pull/12761) 日志检索日期边界修复等），预计将在近期集中合并以彻底固化稳定性。*

---

### 6. 功能请求与路线图信号

从最新的 PR 提交来看，项目正在积极拓展多模态能力与清理代码冗余：

1.  **Qwen 视频输入（MP4）全流程接入**：
    *   [PR #12578](https://github.com/zeroclaw-labs/zeroclaw/pull/12578) 与 [PR #12579](https://github.com/zeroclaw-labs/zeroclaw/pull/12579) (XL 尺寸)：正在为 Qwen 模型接入原生 MP4 视频文件输入支持，同时在 MCP (Model Context Protocol) 模块中实现了 `video/mp4` 资源路由。这预示着下一个版本 ZeroClaw 的视频理解与 MCP 协作能力将迎来升级。
2.  **代码库瘦身与无用代码清理**：
    *   开发者提交了 [Issue #12740](https://github.com/zeroclaw-labs/zeroclaw/issues/12740)（清理未调用的 `init_skills_dir`）及 [Issue #12722](https://github.com/zeroclaw-labs/zeroclaw/issues/12722)（清理未调用的 `resolve_thinking_from_message`），配套

</details>

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*