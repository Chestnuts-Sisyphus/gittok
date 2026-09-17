# GitTok Agent 接口全量实现 · 逐环节验收（2026-09-17）

> **状态**：✅ 已完成待验收 ｜ 执行：ZCode 目标模式会话（2026-09-17）
> **命名说明**：本文件在任务书里的原定名含求职语境（「简历承诺兑现」），按本会话硬约束
> 「求职上下文不进公开仓库」改用中性工程名；验收范围与任务书 §四 T1–T9 完全一致。
> 会话内所有「完成」均已线上反查（curl/实测输出），结论标证明等级并给实测数字；未完成项如实列在 §四。

---

## 〇、一句话结论

四件 agent 接口——**llms.txt、MCP server（search/top/detail）、API 文档、官方 Agent Skill**——
全部建成、上线并逐项线上反查通过（含 CDN 下载即用实测与自检）；
bot 热度修复**实测生效**（starGrowth>0 从 826 → 连续五轮 1809/1858/1858/1861/1862）；
Mimosa 完整扫描跑完（49 条 findings 已分类给判词）；
**E8/E5 全库文案重跑未开工（0%）**——当日免费通道全线限流（实测 321/546 次 429），如实报告不虚报。

---

## 一、逐项状态总表

| 项 | 目标 | 状态 | 关键证据 |
|---|---|---|---|
| T1 | llms.txt 上线 | ✅ | 站点 200（4209B）+ 文件内 12 条链接逐一 200 |
| T2 | MCP server（search/top/detail） | ✅ | 真实 MCP 客户端三 tool 实测 ALL PASS；CI job 绿；CDN 单文件下载即用 |
| T3 | API 文档页 + README 接口章节 | ✅ | docs/API.md + 中英 README 章节；4 条示例逐条实测通过 |
| T4 | 官方 Agent Skill | ✅ | 格式校验 PASS（0 error/0 warn）；免费模型真实加载跑通并留证 |
| T5 | 接口域名统一 + README 分区修正 | ✅ | 站点 feed.xml/manifest.json 200 且与 raw 内容一致（sha256 相同） |
| T6 | bot 热度修复实测 | ✅ | 修复前 826 → 五轮 1809/1858/1858/1861/1862；线上热门池 1861（≥300） |
| T7 | E8+E5 全库文案重跑 | 🟡 续跑中 | 执行器+state 交付（`scripts/gittok-recopy.ts`+`data/recopy-state.json`）；**累计过闸写回 23 张**；全库 23/1868；已 push 部分**线上逐字段反查一致**；续跑命令见 T7 节 |
| T8 | Mimosa 完整审计 + 存量 findings 判词 | ✅ | 扫描完成（seal `sha256:5df7c637…`），49 条分四类给判词 |
| T9 | V-B1 决策包 | ✅ | `docs/请栗子过目-V-B1与乐趣口径-2026-09-17.md`，每条一句话可勾选 |

---

## 二、逐项详表

### T1 llms.txt（G1）

- **交付**：`web/public/llms.txt`（随构建部署到站点根）。
- **规范依据**：现场抓取 llmstxt.org（2026-09-17）确认结构＝可选 BOM + H1（唯一必需）+ blockquote 摘要
  + 若干无标题段落 + 若干 H2「文件清单」（`- [name](url): 说明`）；并抓取 AIHOT 的发现文件做对照
  （`https://aihot.news/llms.txt`，200）——其结构同为 H1 + blockquote + 段落 + H2 链接清单 + 使用说明，
  本文件与之同构，差异在条目更少（GitTok 接口面本来就小）与「使用建议」按本仓数据形态重写。
- **证据（实测）**：
  ```
  curl -s -o /dev/null -w "%{http_code} %{content_type} %{size_download}" \
    https://chestnuts-sisyphus.github.io/gittok/llms.txt
  → 200  text/plain; charset=utf-8  4209
  # 文件内 12 条链接逐一实测（含 agent/*.md、digests/latest、feed/manifest、MCP 单文件、站点与仓库）
  → 12/12 = 200
  ```
- **未做**：没有为 `llms.txt` 加 `rel="describedby"` 之类的站点内联发现标记（站点是 SPA，收益低）。
- **复跑**：`python -c "import re;print('\n'.join(re.findall(r'\]\((https?://[^)]+)\)', open('web/public/llms.txt',encoding='utf-8').read())))"` 后逐个 `curl -sL -o /dev/null -w "%{http_code}"`。

### T2 MCP server（G2）

- **交付**：`mcp-gittok/`（新建，**未复用上游 `mcp/`**——那是 agents-radar 遗留、指向别人的站）。
  - 工具名精确为 `search` / `top` / `detail`；stdio 型 Node server；数据源＝线上公开 feed（匿名、无 key）。
  - **单一事实源**：排序/搜索直接复用站点实现——`web/src/search.ts`（weightedSearch）、
    `src/feed/channel-policy.ts`（hot/fun/daily 频道函数，含配额与多样性交错）、
    `web/src/payload-split.ts`（详情表合并协议）；构建时内联进单文件产物，**没有第二套排序**。
  - `test/parity.test.mjs`：17 项测试把**打包产物**与**站点源码直跑**结果逐条比对（离线、确定性）。
  - `test/e2e-live.mjs`：真实 MCP 客户端（官方 SDK）打线上 feed，留证 `test/e2e-live-output.txt`。
- **研究项对照（实测）**：
  - **协议版本**：用官方 `@modelcontextprotocol/sdk` **1.30.0**（npm dist-tags 的 latest，核实于 2026-09-17）；
    该版本支持并首选协议版本 `2025-11-25`（兼容回退 `2025-06-18 / 2025-03-26 / 2024-11-05 / 2024-10-07`），
    stdio 传输按 SDK 实现（换行分隔 JSON-RPC），schema 用 zod 声明并由 SDK 导出 JSON Schema。
  - **AIHOT MCP 形态对照**：AIHOT 走**远程 Streamable HTTP**（`/api/mcp`，5 个只读工具，工具名带 `aihot_` 前缀）。
    GitTok 取**本地 stdio + 单文件**形态（零安装、无服务器依赖、匿名直连公开 feed），
    工具名按本任务书要求精确为 `search` / `top` / `detail`（不加前缀）——两者定位不同：
    AIHOT 靠自家服务端承载检索，GitTok 让客户端直取公开 CDN 数据。
- **证据（实测）**：
  ```
  node --test test/parity.test.mjs      → tests 17 / pass 17 / fail 0
  node test/e2e-live.mjs                → ALL PASS（留证落盘）
    tools/list → search, top, detail
    search("绘图",5) → Comfy-Org/ComfyUI, tt-a1i/archify, …（全库 2649）
    top(hot,5) → pool=1861；top(fun,3) → pool=930；top(daily,3) → pool=1203
    detail(huggingface/transformers) → found=true, detailCn 514 字（inline）
    边界：空查询→isError empty_query；无结果→ok+空表+note；repo 不存在→found:false+建议
  CI（run on bf7311d）→ job `mcp-gittok` success：install / typecheck / build / parity 测试全绿
  CDN：jsDelivr 与 raw 两份产物字节一致（782483B）；下载副本 `node gittok-mcp.mjs --selftest` → selftest OK
  ```
- **数据源策略（实测依据）**：大陆直连（不走代理）实测 —— `raw.githubusercontent.com` 连不通（000）、
  站点 121 KB/s、`cdn.jsdelivr.net` 1.8 MB/s。故默认走 jsDelivr 的仓库全量 `data/feed.json`
  （自带 detailCn），失败自动回退站点「列表+详情表」两文件源、再回退 raw。
- **边界**：空查询/空 repo、无结果、repo 不存在、CJK 查询、feed 拉取失败、非法参数，逐个有明确返回
  （结构化 JSON，不抛裸异常）；失败路径不挂死（测试覆盖）。
- **接入配置**：README 给 Claude Desktop / Claude Code / 通用 `mcpServers` 三份可复制配置（本地路径版 + 零安装单文件版）。
- **复跑**：`cd mcp-gittok && npm ci && npm run build && npm test && npm run test:live`。

### T3 API 文档（G3）

- **交付**：`docs/API.md`（人+agent 都能读：接口总表、卡片字段表、排序/搜索公式、可跑示例、使用边界）
  + `README.md` / `README.zh.md` 各新增「Agent 接口」章节（接口表 + curl 示例 + MCP/Skill/llms.txt 入口）。
- **证据（实测）**：docs/API.md 里 4 条示例命令逐条在本机跑通（列表→今日入库统计、详情表取长文、
  manifest 取日期、日报 markdown 取正文）；README 章节经 GitHub 页面渲染可见（raw 200）。
- **注**：示例命令里 `python -m json.tool | head` 在 Windows 会 broken pipe，已改成纯 python 写法并复测通过。
- **复跑**：照 `docs/API.md` 「快速开始」四条命令原样粘贴。

### T4 Agent Skill（G4）

- **交付**：`skills/gittok/`（Agent Skills 格式）
  - `SKILL.md`：frontmatter（name/description/license/metadata）+ 安全边界 + 数据接口表 + 核心工作流
    + 输出格式 + 讲解纪律 + 自检；能力＝「读 GitTok 今日热点并讲解」。
  - `scripts/hotspots.mjs`：取数脚本（当日入库卡按站点 heatScore 排序 + 当日策展日报摘要；
    自动跳过「生成失败」的日报空壳；**不做二次加权**）。
  - `scripts/run-skill.mjs`：真实 LLM 加载运行器（最小 agent loop + 工具调用；key 只读环境变量）。
  - `scripts/validate.mjs`：零依赖格式校验器（frontmatter/命名/描述/引用文件/占位符）。
- **证据（实测）**：
  ```
  node skills/gittok/scripts/validate.mjs
  → name=gittok description=229 字符 正文 77 行；PASS（error 0 / warn 0）
  免费模型真实加载（glm-4.7-flash）：模型自行调用 gittok_hotspots 工具取数（5388 字符）→
    按 skill 输出格式产出「GitTok 今日热点 · 2026-09-17」讲解 → 留证
    skills/gittok/test-output/skill-run-2026-09-17T11-55-49-307Z.md
  会话内 agent 执行：skills/gittok/test-output/agent-run-2026-09-17.md（同一工作流的人工对照版）
  ```
- **诚实边界**：首次运行（11:55Z）用的是「未收紧版」SKILL.md；随后为「禁止整句照抄 reasonCn」
  加了硬规则并重跑，但撞上免费档限流（1305），独立模型证据停留在收紧前版本。校验器对最终版 PASS。
- **复跑**：`node skills/gittok/scripts/validate.mjs && node skills/gittok/scripts/hotspots.mjs --limit 12`；
  `GITTOK_SKILL_API_KEY=… node skills/gittok/scripts/run-skill.mjs`。

### T5 接口域名统一 + README 分区修正（G5/G6）

- **交付**：`deploy-web.yml` 新增 `Copy feed interfaces`（feed.xml / manifest.json → 站点）。
- **证据（实测）**：
  ```
  站点 feed.xml / manifest.json → 200（改造前 404）
  站点 manifest 与 raw manifest 结构化比对 → sha256 相同（identical: True）
  README 分区 grep：`Fun`(剩 1 处=乐趣频道名，真实功能) / `Learning` 0 / `兴趣` 0 / `学习` 0
  ```
- **复跑**：`curl -s https://chestnuts-sisyphus.github.io/gittok/manifest.json | python -c "import json,sys;print(json.load(sys.stdin)['generated'])"`。

### T6 bot 热度修复实测（G13）

- **做法**：按修复提交（`45c1d29`）后的每一轮 drip 逐个统计 `data/feed.json` 的 `starGrowth>0` 张数。
- **证据（实测，git 逐轮取数）**：
  ```
  45c1d29（修复提交时点）        2613 卡  starGrowth>0 = 826
  8807265  2026-09-16T20:55Z    2615 卡  starGrowth>0 = 1809
  d593f0e  2026-09-17T00:08Z    2637 卡  starGrowth>0 = 1858
  acfac7c  2026-09-17T00:53Z    2642 卡  starGrowth>0 = 1858
  1903da4  2026-09-17T04:55Z    2649 卡  starGrowth>0 = 1861
  707dba3  2026-09-17T12:02Z    2653 卡  starGrowth>0 = 1862
  线上反查（MCP top(hot) pool，2026-09-17T11:35Z）  = 1861（≥300 ✅）
  ```
- **结论**：修复生效——五轮滴灌后不再塌缩（个位数 → 千级），热门频道池长期 ≥300。
- **复跑**：`for c in 45c1d29 8807265 d593f0e acfac7c 1903da4 707dba3; do git show $c:data/feed.json | python -c "import sys,json;d=json.load(sys.stdin);print(len(d),sum(1 for c in d if (c.get('starGrowth') or 0)>0))"; done`。

### T7 E8+E5 全库文案重跑 —— **续跑中（23/1868 过闸写回，已 push 部分线上逐字段反查一致）**

- **现状量化（本机实测）**：全库 2653 张；`reasonCn < 80 字` 短卡 **26 张**（本轮 dry-run 实测；随写回逐轮收敛）；
  `detailCn` 空卡 **0 张**；按生产全闸（`cardChecks`）判全库 **1868 张不过闸**
  （多数是 facts 缺失与旧文案套话/推广词——这就是 E8+E5 的真实待跑面）。
- **执行器已交付（commit `fb89761`）**：`scripts/gittok-recopy.ts`（按 `gittok-rejudge-v3.ts` 的 state 模式）——
  单卡生成（prompt 复用 `buildFeedScoringPrompt`）→ 生产全闸 → **过闸才写回**；
  写回严格限定 `summaryCn / reasonCn / detailCn / facts`（zone/funScore/tags 一律不动）；
  state 落 `data/recopy-state.json`（指纹版失效、每卡落盘即写、失败留因）；
  多免费通道轮转 + 冷却等待 + 墙钟上限硬停；只用免费模型。
- **轮次台账（每轮 `--limit=30 --max-minutes=60`，过闸才写回，如实记数）**：

| 轮 | 时段 | 写回 | 未过闸 | 累计已写回 | 线上反查 |
|---|---|---|---|---|---|
| 首轮 | 09-17 20:38 | 1 | 4 | 1 | 站点域名已查（coolify） |
| 续跑 1 | 09-17 22:14–22:37 | 13 | 17 | 14 | **14/14 逐字段一致**（summary/reason/detail/facts 全等） |
| 续跑 2 | 09-17 22:40–23:40 | 9 | 7 | 23 | **23/23 逐字段一致**（summary/reason/detail/facts 全等） |
| 续跑 3 | 09-17 23:48 | 0 | 0 | 23 | 三通道全退场 → 脚本 **1 秒内退出**（`无可用 lane…state 未变`，不空转） |

- **续跑 1 实跑**：写回 13 张（`trailhq/Graft`、`fleetbase/fleetbase`、`dsh-tauri-desk/deepseek-harness-desktop`、
  `gethomepage/homepage`、`tinyhumansai/openhuman`、`huggingface/transformers`、`bojieli/ai-agent-book`、
  `semantica-agi/semantica`、`p1neappleXpress/OpenFlux`、`comet-ml/opik`、`omnigent-ai/omnigent`、
  `agentscope-ai/agentscope`、`aquasecurity/trivy`）；17 张未过闸（主因：一句话描述超 35 字上限、
  深度解读超/欠字数区间、JSON 截断解析失败、facts source 不在参考文档；全部记入 state 供下轮重试）。
- **独立复核（不依赖脚本自述）**：用**空 state** 重跑 `--dry-run`（`RECOPY_STATE=<临时空文件>`），
  生产闸对全库 2653 张从零判一遍 → 不过闸 1854 张 = 1868 − 14，**证明 14 张写回卡确由生产闸判过**，
  而非脚本自记。
- **续跑 2 实跑**：写回 9 张（`Sudharsanselvaraj/Token-Print`——连败两轮后过闸、`henrygd/beszel`、
  `jamiepine/voicebox`、`projectdiscovery/nuclei`、`n8n-io/n8n`、`usebruno/bruno`、`openclaw/openclaw`、
  `BerriAI/litellm`、`infiniflow/ragflow`）；7 张未过闸。**本批撞 60 分钟墙钟停**——途中
  `openrouter` 免费额度打满（`429 free-models-per-day`，需 UTC 零点=本地 08:00 重置）、
  `modelscope` 单账号反复 60s 熔断，两通道交替冷却，故实际产出低于续跑 1。
- **当前比例**：**写回 23 / 不过闸 1868（1.23%）**；仍剩约 1845 张待跑。
- **线上反查（截至续跑 2，commit `a40d49c`）**：`CI` 与 `Deploy Web` 对 `ee0fa10`、`a40d49c` 均 **success**；
  站点 `https://chestnuts-sisyphus.github.io/gittok/data/feed.json`（200，4,431,979 B）与
  `/data/feed-details.json`（200，4,753,859 B）下载后与本地 `data/feed.json` **逐字段比对**：
  `summaryCn`/`reasonCn`/`facts`（feed.json）与 `detailCn`（feed-details.json）
  **23 张全部一致（23/23，DIFF 0）**。
  复跑：本节末 Python 比对脚本（直接整段贴进 `python -` 执行），或 `curl` 站点域名
  （**新鲜**，jsDelivr 有 CDN 缓存滞后，勿用 jsDelivr 判新鲜度）。
- **续跑入口（state 位置）**：`data/recopy-state.json`（指纹 `recopy:v6-copy+facts:1`，
  `done`/`failed` 各记 repo→时间/lane/闸名）。续跑命令（同一行反复跑即可，完事自动跳过）：
  `npx tsx scripts/gittok-recopy.ts --limit=30 --max-minutes=60`
  调试：`--repo=owner/name`（单卡）、`--dry-run`（只统计）、`--all`（含已过闸全重跑）。
- **队列机制（实测）**：待跑队列按 feed 顺序取，**上轮未过闸的卡排在下轮队首**（state.done 才跳过）→
  同一张卡会被反复重试直到过闸；观测量级：续跑 1 的 17 张失败卡占据了续跑 2 的队首 17 位，
  但失败卡会因带反馈重试而逐步收敛（如 `Sudharsanselvaraj/Token-Print` 连败两轮后于续跑 2 过闸）。
- **通道侧实测（本机，解释吞吐为何低）**：本轮只有 2 条免费通道在岗
  （`custom:modelscope:deepseek-ai/DeepSeek-V4-Flash-0731`、`openrouter:nvidia/nemotron-3-ultra-550b-a55b:free`）；
  第 3 条免费主力 `zhipu:glm-4.7-flash` 被共享通道账（`data/lane-health.json`，与生产管线同一本）
  按 `quota-daily` 退到 **2026-09-18T00:18Z（本地 08:18）**。**直接探测**（一次最小真实调用，
  `POST https://open.bigmodel.cn/api/paas/v4/chat/completions`，模型 `glm-4.7-flash`）：
  **HTTP 429 / code 1305「该模型当前访问量过大」，0.3s 返回** —— 属智谱服务端过载而非我方额度，
  故**不强行纳回**（`SCHED_IGNORE_LANE_HEALTH=1` 只会换来快速 429，纯浪费）；等其自然恢复。
- **23:48 状态：三条免费通道全部退场，批次循环被阻塞**（脚本快速退出，不空转）。各通道账面复活时间：

  | 通道 | 退场类别 | 账面复活（本地） | 实际额度重置（推定） |
  |---|---|---|---|
  | `zhipu:glm-4.7-flash` | quota-daily | **09-18 08:18** | 服务端过载，随流量缓解 |
  | `openrouter:nemotron:free` | quota-daily | **09-18 11:42** | 免费日额按 **UTC 日** → 本地 08:00 |
  | `custom:modelscope:DeepSeek-V4-Flash` | quota-exhausted | **09-18 23:39** | 免费日额（本地日）→ 可能 00:00 已重置 |

  → 账面退场期是**保守定时器**（`RETIRE_MS`：daily 12h / exhausted 24h），**晚于**真实额度重置；
  故次日恢复跑时应**先用一次最小真实调用探测**，再用 `SCHED_IGNORE_LANE_HEALTH=1` 把已重置的通道
  纳回矩阵（该开关只放行这 3 条免费通道，付费仍被 `GITTOK_ALLOW_PAID` 双保险挡住）。
- **诚实结论**：链路已被两轮实跑+线上反查证明可用（免费通道→生产全闸→过闸写回→push→线上一致）；
  但**免费额度仍是唯一瓶颈**——续跑 1 耗时 23 分钟写回 13 张（≈0.56 张/分钟），
  且含多次通道冷却等待；全量 1854 张按当前速率需跨时段长期续跑（凌晨/清晨额度更好）。
- **线上反查复跑脚本**（本机 Python，逐字段比对；站点域名=新鲜，勿用 jsDelivr 判新鲜度）：

```python
# 用法：在 D:/AI/QODER/1/os-feed 下执行（整段贴进 python - 或存为 vercmp.py 后 python vercmp.py）
import json, urllib.request
B = "https://chestnuts-sisyphus.github.io/gittok/data/"
def get(p):
    r = urllib.request.Request(B + p, headers={"User-Agent": "recopy-verify"})
    return json.loads(urllib.request.urlopen(r, timeout=120).read())
site = {c["repo"]: c for c in get("feed.json")}          # summaryCn / reasonCn / facts
det  = get("feed-details.json")                          # repo -> detailCn（字符串字典）
local = {c["repo"]: c for c in json.load(open("data/feed.json", encoding="utf-8"))}
state = json.load(open("data/recopy-state.json", encoding="utf-8"))
ok = 0
for repo in state["done"]:
    s, l = site[repo], local[repo]
    same = (s.get("summaryCn") == l.get("summaryCn")
            and s.get("reasonCn") == l.get("reasonCn")
            and det.get(repo) == l.get("detailCn")
            and json.dumps(s.get("facts"), ensure_ascii=False, sort_keys=True)
                == json.dumps(l.get("facts"), ensure_ascii=False, sort_keys=True))
    ok += same
    print(("OK  " if same else "DIFF"), repo)
print(f"线上逐字段一致 {ok}/{len(state['done'])}")
```

  注：`feed-details.json` 是 `repo → detailCn 字符串` 的字典（不是数组），首次写比对脚本易踩。
  未 push 的新写回卡会显示 DIFF（属正常，push + Deploy Web 成功后再查）。

### T8 E4 / Mimosa 完整审计（G9）

- **扫描（实测）**：
  ```
  jobId  scan-job-mu5h5h2p-61ae66bc18677f3a   status=completed
  scanId scan-2026-09-17T11-57-09.955Z-a481fc5ff908
  seal   sha256:5df7c637f2dbe317f4da0d99b0c39b37fa1fe93956c4db58221ce473950487a5
  findings 49（high 37 / medium 12）｜依赖：250 包已扫，离线库命中 2 包 3 条公告
  coverage: completeness=partial, runStatus=inconclusive（报告自述：调用图部分不完整）
  scanDir  …\.mimosa\security-scans\project-c35b037bce3cde25fff17dff\scan-2026-09-17T11-57-09.955Z-a481fc5ff908
  ```
- **判词（按类聚簇，逐条对应 finding 记录；同类同因不重复给结论）**：

| 类 | 条数 | 判词 | 依据（抽样源码） |
|---|---|---|---|
| SSRF / 出网入口（`fetch`/`githubGet`/`probe`/`fetchReport`） | 23 | **误报（目标域名写死）** | `src/github.ts:158/255/275`、`githubGet:181/244` 的 URL 均为 `` https://api.github.com/… `` 模板，仅 `DIGEST_REPO` 来自部署环境变量；`src/notify*.ts` 的 webhook URL 来自本仓配置；`mcp/src/index.ts` 4 条属**上游遗留目录**（见下） |
| 路径穿越（`readKeyFile`/`atomicWrite`/`loadJson`/`saveProfile`/`saveTierProgress`/`路径穿越`） | 14 | **接受风险（本地工具，无远程面）** | 全部在本地 CLI/管道脚本与 `src/config.ts`、`src/report.ts`、`src/social.ts`：路径来自操作者自己的环境变量/参数，仓库是"跑在自己机器上的抓取管线"，不存在远程调用者 |
| 跨文件污点（伴随项） | 8 | **随上一行同类结论** | 与 SSRF 条目同行同因（污点源＝配置/常量） |
| MongoDB 动态排序字段注入（CWE-943） | 4 | **误报（误标）** | `scripts/gittok-zone-calibration.ts:52/126` 与 `src/feed/index.ts` 的 `rankCards`/`diversifyCards` 都是**JS 数组 sort**，仓库不使用 MongoDB |
| **上游遗留 `mcp/`（4 条全在此目录）** | — | **不在本仓使用范围** | 该目录是 agents-radar 遗留的 Cloudflare Worker MCP（指向别人的站），GitTok 的 MCP 是新建的 `mcp-gittok/`；建议后续删除该目录（删除需栗子点头，本次未动） |

- **诚实边界**：报告自述 `runStatus=inconclusive`（`verdictEffect=none`）、调用图不完整 →
  **本次不宣称项目安全**，只宣称"扫描跑完 + 49 条已有分类判词"。
- **存量 16 条的对照**：上一轮（09-15）记的 16 条为人工归纳口径；本轮机器产出 49 条是同一片代码面的更细粒度
  （同文件同行会同时出「SSRF 入口」「跨文件污点」「SSRF 服务端请求伪造」三条），按类归并后与 16 条口径可对齐。
- **新增代码面**：本次新增的 `mcp-gittok/` 与 `skills/gittok/` 在 49 条里**零命中**；写入过程全程走
  Mimosa PreToolUse 扫描（期间两次被拦截并要求改写，已按提示整改）。
- **复跑**：`mcp__mimosa__security_scan(project="D:/AI/QODER/1/os-feed", depth="deep")`。

### T9 V-B1 决策包（G10/G11/G12/G18）

- **交付**：`docs/请栗子过目-V-B1与乐趣口径-2026-09-17.md`——5 条错判逐条「锚点改 / 判据改 / 维持」三选一
  （附建议与重判成本）、top200 满分扎堆处置（现 266 张满分）、transformers 补句（含 4–6h 重判成本标注）、
  工具区 48.4% 口径说明。**未擅自改任何判据**，等栗子勾选。
- **复跑**：`npx tsx scripts/gittok-fun-anchor-check.ts`（81.6% 复现率口径）。

---

## 三、关键假设（已标注）

1. **数据源默认 jsDelivr**：MCP/脚本默认读 jsDelivr 镜像的仓库全量文件（大陆实测快 15 倍），
   代价是 CDN 缓存可能旧数小时；要绝对新鲜可用 `GITTOK_FEED_URL` 指向站点（较慢）。
   假设：agent 场景下"能拿到"比"最新几分钟"更重要。
2. **日报 markdown 站点镜像只留最近 7 天**（全量 85MB/2852 文件，每次部署都传不划算）；
   更早日期走仓库镜像（jsDelivr 会 301 到 raw，跟随重定向即可）。
3. **llms.txt 不放带日期的超链接**（避免链接过期腐烂）：日报入口用 `/digests/latest/` 稳定路径 + 路径模式说明。
4. **`github.com` 与 `raw.githubusercontent.com` 大陆直连不可达**（实测 000）：文档里的仓库链接是"有代理时可用"，
   功能性接口全部落在站点域名或 jsDelivr。
5. **MCP `top` 增加 `sort=daily`**（热度/乐趣之外）——任务书只点名 hot/fun，daily 仍是站点频道函数，属对齐站点能力的自然扩展。
6. **MCP 工具描述为中文**（与站点语域一致）；如客户端生态需要英文描述可再补。

## 四、未完成项与原因

1. **T7（E8+E5 全库文案重跑）：续跑中，23/1868（1.23%）**。执行器与 state 已交付并**两轮实跑验证**；
   剩余的约 1845 张不是"没做"，而是**免费额度不够**（实测：智谱 429/1305 服务端过载、
   OpenRouter 免费日额打满、ModelScope 单账号高频熔断），只能跨时段续跑：
   `npx tsx scripts/gittok-recopy.ts --limit=30 --max-minutes=60`（反复跑，完事自动跳过）。
   **建议**：本地 08:00 后开跑（OpenRouter 免费额按 UTC 日重置；智谱通道账 08:18 复活），
   届时可用通道从 2 条恢复到 3 条；不虚报进度。
2. **两条 commit message 出现「简历承诺兑现」字样**（`bf7311d`、`2d2061d`，已进公开历史）：
   与「求职上下文不进公开仓库」的约束相抵；文件与文档内容均为纯工程。如需清除需 force-push 改史
   （仓库有 bot 持续推送，改史风险自担），**建议不改**，后续提交起改用中性措辞（本次已改）。
3. **上游遗留 `mcp/` 目录仍在**（4 条安全 findings 全在此目录）：建议删除，但按"只增不删"约定需栗子点头。
4. **T9 等待栗子勾选**：判据/锚点改动未执行（这是任务书要求的"等勾"状态，不算缺陷）。
5. **`digests/2026-09-17/ai-trending.md` 当天生成失败**（正文为失败空壳）：属内容管线当日故障，
   根因与免费通道限流一致（fleet-health 同日 429 密集）；非本任务范围，已记录。

## 五、复跑命令全集

```bash
cd D:/AI/QODER/1/os-feed
# T1 llms.txt：站点 200 + 链接全测
curl -s -o /dev/null -w "%{http_code}\n" https://chestnuts-sisyphus.github.io/gittok/llms.txt
# T2 MCP
cd mcp-gittok && npm ci && npm run build && node --test test/parity.test.mjs && npm run test:live
# T3 API 文档示例：照 docs/API.md「快速开始」四条逐条粘贴
# T4 Skill
node skills/gittok/scripts/validate.mjs && node skills/gittok/scripts/hotspots.mjs --limit 12
# T5 接口统一
curl -s https://chestnuts-sisyphus.github.io/gittok/manifest.json > /dev/null && echo OK
# T6 bot 验证
for c in 45c1d29 8807265 d593f0e acfac7c 1903da4 707dba3; do git show $c:data/feed.json | python -c "import sys,json;d=json.load(sys.stdin);print(len(d),sum(1 for c in d if (c.get('starGrowth') or 0)>0))"; done
# T7 缺口量化
python -c "import json;d=json.load(open('data/feed.json',encoding='utf-8'));print('short:',sum(1 for c in d if len(c.get('reasonCn') or '')<80))"
# T8 Mimosa：见 §二 T8 复跑（MCP 工具调用）
# T9 决策包（只读）
npx tsx scripts/gittok-fun-anchor-check.ts
```

## 六、本次提交清单（均已 push 到 master）

| commit | 内容 |
|---|---|
| `c6c1ce5`（合并 `d1505cd`） | T5：deploy-web.yml 拷贝 feed.xml/manifest.json + README 分区四区修正 + 动态频道补「乐趣」 |
| `bf7311d` | T2：`mcp-gittok/`（三 tool + parity/e2e 测试 + 单文件产物 + CI job + README 接入） |
| `2d2061d` | T4：`skills/gittok/`（SKILL.md + 取数与校验脚本 + 运行留证） |
| `09b5da1` | T1+T3：`web/public/llms.txt` + `docs/API.md` + README 补「Agent 接口」章节 + 站点镜像 agent 文档与近 7 天日报 |
| 本次 | T4 收紧版 SKILL.md + T9 决策包 + 本验收报告 |

**新增/改动的线上入口（全部 200）**：`/llms.txt`、`/agent/{API,SKILL,MCP}.md`、`/digests/latest/`、
`/feed.xml`、`/manifest.json`、jsDelivr 上的 `mcp-gittok/dist/index.js`。

## 七、行为约束遵守情况

- **不打扰用机**：全程无弹窗、无 GUI 启动；长跑均为命令行/后台进程。
- **密钥零回显**：只读 `D:/AI/KEY/`，输出仅掩码前缀；push 用 classic PAT（`ghp_`，含 workflow scope），
  本地 credential helper 覆写仅在单条命令内生效。
- **免费模型**：MCP/文档/脚本零 LLM 依赖；skill 运行只用免费档（glm-4.7-flash）；
  T7 因免费额度不足直接停跑（未用任何付费/订阅通道）。
- **push 纪律**：每个 Phase 完成即 commit+push（4 次推送），未攒批。
- **Mimosa**：写入路径全程受 PreToolUse 扫描；扫描结论为 `inconclusive`，故本文不宣称"项目安全"。
