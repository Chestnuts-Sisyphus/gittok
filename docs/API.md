# GitTok 开放接口（面向人与 Agent）

GitTok 是中文开源信息流：每天自动抓取 GitHub Trending/Search、Hacker News、Product Hunt、ArXiv、
Hugging Face、Dev.to、Lobste.rs、Anthropic/OpenAI 官方站等 10+ 源，由 LLM 写中文摘要与长文，
热度加权、沉寂判定、排序与搜索全部由代码固化并有测试锁定。

**所有接口匿名只读、不需要 API Key、不需要登录。** 请带上合理的缓存与轮询间隔（站点每天更新数次），
不要高频全量拉取。

## 接口总表

| 接口 | 地址 | 格式 | 说明 |
|---|---|---|---|
| 卡片列表 | `https://chestnuts-sisyphus.github.io/gittok/data/feed.json` | JSON 数组 | 站点首屏用的轻量列表（不含 `detailCn`），约 4.9 MiB（5,107,850 字节，2026-09-22 实测） |
| 卡片详情表 | `https://chestnuts-sisyphus.github.io/gittok/data/feed-details.json` | JSON 对象 | `{ "owner/name": detailCn }` 映射，按需取长文 |
| 卡片列表（全量单文件） | `https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/data/feed.json` | JSON 数组 | 仓库源文件：**自带 `detailCn`**、字段最全；大陆直连比站点快（实测 1.8MB/s vs 121KB/s） |
| RSS | `https://chestnuts-sisyphus.github.io/gittok/feed.xml` | RSS 2.0 | 日报条目流 |
| 日报索引 | `https://chestnuts-sisyphus.github.io/gittok/manifest.json` | JSON | `dates[] → reports[]`，日报文件清单 |
| 日报正文 | `https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/digests/<YYYY-MM-DD>/<name>.md` | Markdown | 日报 markdown **只随仓库发布**（站点上是网页渲染，`/digests/*.md` 会 404） |
| 站点 | `https://chestnuts-sisyphus.github.io/gittok/` | HTML | 卡片流应用（人用） |
| 发现文件 | `https://chestnuts-sisyphus.github.io/gittok/llms.txt` | text/plain | 给 agent 的入口索引（llmstxt.org 规范） |

镜像规则：GitHub Pages 供 `data/*.json`、`manifest.json`、`feed.xml`；
仓库文件（`digests/*.md`、`mcp-gittok/*`、`skills/*`）走 jsDelivr 或 raw（raw 在部分网络不可达，优先 jsDelivr）。

## 快速开始

```bash
# 1) 拿列表（站点域名，最新）
curl -s https://chestnuts-sisyphus.github.io/gittok/data/feed.json -o feed.json

# 2) 看今天入库了多少张、最热的几张（按站点 heatScore 排序）
python - <<'EOF'
import json, datetime
cards = json.load(open("feed.json", encoding="utf-8"))
today = datetime.datetime.now(datetime.timezone.utc).date().isoformat()
fresh = [c for c in cards if (c.get("pushedAt") or "")[:10] == today]
fresh.sort(key=lambda c: c.get("heatScore") or 0, reverse=True)
print(len(cards), "张在库；今日入库", len(fresh))
for c in fresh[:5]:
    print(f"{c['repo']:40s} ⭐{c['stars']} (+{c.get('starGrowth',0)}) {c.get('zone','')} | {c.get('summaryCn','')}")
EOF

# 3) 取某个项目的长文详情
curl -s https://chestnuts-sisyphus.github.io/gittok/data/feed-details.json \
  | python -c "import json,sys; d=json.load(sys.stdin); print(d['huggingface/transformers'][:300])"

# 4) 日报
curl -s https://chestnuts-sisyphus.github.io/gittok/manifest.json \
  | python -c "import json,sys; d=json.load(sys.stdin); print(d['dates'][0]['date']); print(d['dates'][0]['reports'])"
curl -s https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/digests/2026-09-17/ai-cli.md \
  | python -c "import sys; print(''.join(sys.stdin.readlines()[:12]))"
```

## 卡片字段（列表接口）

| 字段 | 类型 | 说明 |
|---|---|---|
| `repo` | string | `owner/name`，全库唯一键 |
| `url` | string | GitHub 仓库地址 |
| `owner` / `name` | string | 拆分字段（搜索用） |
| `desc` | string | 仓库原始英文描述 |
| `summaryCn` | string | 一句话中文概括（LLM 写，大白话） |
| `reasonCn` | string | 两三行中文简介（LLM 写，含术语） |
| `detailCn` | string | 中文长文详情；**站点列表已剥离**，用详情表或全量单文件取 |
| `stars` | number | 当前 star 数 |
| `starGrowth` | number | 近期涨星（站点热门频道依据） |
| `zone` | string | 内容分区：`AI` / `资源` / `工具` / `创意` |
| `funScore` | number | 乐趣强度 0–1（乐趣频道依据；0 = 纯工具向） |
| `heatScore` | number | 时效热度分（每日频道依据；涨得快优先） |
| `createdAt` | string | 仓库建仓时间（ISO 8601） |
| `pushedAt` | string | 这张卡**入库/刷新**时间（ISO 8601，判断「今天新收录」用这个） |
| `language` | string | 主语言 |
| `topics` | string[] | GitHub topics |
| `aiDims` | string[] | LLM 多维度标签 |

站点列表会额外剥掉 `bigbros` / `aiDim` / `score` 三个死字段（历史遗留）；
需要全量字段就用上面的「全量单文件」或仓库 `data/feed.json`。

## 排序与搜索语义（与站点一致）

站点的频道与搜索是**代码固化**的，不是随口加权；想做出和站内一致的体验，请遵循：

- **热门（hot）**：`starGrowth > 0` 的卡，按 `starGrowth × min(1, log10(stars)/4)` 降序，且 AI 分区前缀占比 ≤30%
- **每日（daily）**：当日新入库（`createdAt` 今天）在前；其余按 `heatScore` 降序
- **乐趣（fun）**：`funScore > 0`，按 `funScore × (1 + min(starGrowth/50, 1) × 0.35)` 降序，创意分区 ≤40% 且同细分领域 ≤ max(3, 15%)
- **搜索**：仓库名断层权重（命中名 ≫ 命中长文），宽松键（`next js` ⇔ `next.js` ⇔ `next_js`），逐词 AND

完整实现见 [`src/feed/channel-policy.ts`](../src/feed/channel-policy.ts) 与 [`web/src/search.ts`](../web/src/search.ts)；
**MCP server 直接内联这两个文件**，所以它的 `top`/`search` 与站点逐条一致（有 parity 测试锁定）。

## MCP server（给 Claude / Cursor 等客户端）

工具名：`search` / `top` / `detail`。安装与配置见
[`mcp-gittok/README.md`](../mcp-gittok/README.md)（零安装：下载单文件即可）。

```bash
curl -fsSL -o ~/gittok-mcp.mjs \
  https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/mcp-gittok/dist/index.js
node ~/gittok-mcp.mjs --selftest
```

## Agent Skill（读今日热点并讲解）

`skills/gittok/SKILL.md`（Agent Skills 格式，含取数脚本 `scripts/hotspots.mjs`）：

```bash
curl -fsSL -o ~/gittok-hotspots.mjs \
  https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/skills/gittok/scripts/hotspots.mjs
node ~/gittok-hotspots.mjs --limit 12
```

## 使用边界

- 匿名只读；**不要**拿它当 GitHub API 的替代品做写操作（这里只读）。
- 卡片文案由 LLM 生成，可能有过时或不准确；引用前回原仓库核对。
- 数据为公开信息聚合；仓库代码 MIT，但第三方项目本身的版权归各自作者。
- 站点每天更新数次（GitHub Actions 驱动的抓取 + 分档刷新）；建议缓存 ≥10 分钟。
