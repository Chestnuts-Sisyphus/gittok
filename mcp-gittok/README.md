# gittok-mcp — GitTok MCP server（search / top / detail）

[English](#english) | **中文**

让任何 MCP 客户端（Claude Desktop / Claude Code / Cursor / …）直接用自然语言读写 GitTok（中文开源信息流）：
**搜索全库项目、按热度/乐趣/时效取榜单、取单张卡的完整中文长文**。
匿名只读，**不需要 API Key、不需要登录**。

| Tool | 作用 | 关键参数 |
|---|---|---|
| `search` | 全库关键词搜索（中英文均可，站点同款加权搜索） | `query`（必填）、`limit`（默认 10，上限 60） |
| `top` | 按站点频道排序取前 N：`sort=hot`（热度动量，默认）/ `fun`（乐趣）/ `daily`（当日新入库+时效热度）；`zone` 可过滤分区（AI / 资源 / 工具 / 创意） | `sort`、`limit`、`zone` |
| `detail` | 按 `repo`（owner/name）取完整卡片，**含中文长文 detailCn**；不在库时返回 `found:false` + 近似建议 | `repo`（必填） |

单文件零依赖，`node dist/index.js` 直接跑；数据源 = 线上公开 GitTok feed（默认走 jsDelivr CDN，见下）。

---

## 快速接入（零安装，推荐）

下载单文件（约 770KB，已把 MCP SDK 与站点共享逻辑打进去），然后在客户端配置里指向它：

```bash
# 大陆直连推荐走 jsDelivr（GitHub raw 常连不通）
curl -fsSL -o ~/gittok-mcp.mjs \
  https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/mcp-gittok/dist/index.js
node ~/gittok-mcp.mjs --selftest   # 自检：拉线上 feed + 跑三个 tool 各一次
```

### Claude Desktop

编辑 `claude_desktop_config.json`（macOS: `~/Library/Application Support/Claude/`，Windows: `%APPDATA%\Claude\`）：

```json
{
  "mcpServers": {
    "gittok": {
      "command": "node",
      "args": ["/absolute/path/to/gittok-mcp.mjs"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add gittok -- node /absolute/path/to/gittok-mcp.mjs
# 或者写进项目 .mcp.json（格式同下）
```

### Cursor / Windsurf / Cline / 其它 MCP 客户端

`mcpServers` 配置通用格式（路径换成本机绝对路径）：

```json
{
  "mcpServers": {
    "gittok": {
      "command": "node",
      "args": ["/absolute/path/to/gittok-mcp.mjs"]
    }
  }
}
```

### 直接用仓库里的构建产物

```bash
git clone https://github.com/Chestnuts-Sisyphus/gittok
cd gittok/mcp-gittok
node dist/index.js --selftest        # 产物已入仓，克隆完即可跑
# 改代码后重建（需要 Node ≥ 18）：
npm install && npm run build
```

---

## 环境变量（都可选）

| 变量 | 作用 |
|---|---|
| `GITTOK_FEED_URL` | 指定 feed JSON 地址（单文件源）。给了它就不再走默认源链；配 `GITTOK_DETAILS_URL` 可组成「列表 + 详情表」两文件源 |
| `GITTOK_DETAILS_URL` | 详情表地址（`{repo: detailCn}`），与 `GITTOK_FEED_URL` 搭配 |
| `GITTOK_FEED_FILE` | 本地 `data/feed.json` 路径（仓库全量文件，自带 detailCn）——离线/最快 |
| `GITTOK_DETAILS_FILE` | 本地详情表路径（可选） |
| `GITTOK_TIMEOUT_MS` | 单源超时（毫秒），默认 `30000` |

### 数据源与新鲜度（2026-09-17 实测，大陆直连不走代理）

| 源 | 速度 | 说明 |
|---|---|---|
| `cdn.jsdelivr.net`（**默认**） | 1.8 MB/s | 仓库 `data/feed.json` 全量文件，自带 detailCn；CDN 有缓存，最坏情况旧数小时 |
| 站点 `chestnuts-sisyphus.github.io`（回退 1） | 121 KB/s | 最新（GitHub Pages，每日多次部署）；列表与详情分两个文件 |
| `raw.githubusercontent.com`（回退 2） | 常连不通 | 兜底 |

源链按上表顺序自动回退；也可以在客户端配置里用 `env` 固定 `GITTOK_FEED_URL`，
例如强制走站点最新数据：`"env": { "GITTOK_FEED_URL": "https://chestnuts-sisyphus.github.io/gittok/data/feed.json", "GITTOK_DETAILS_URL": "https://chestnuts-sisyphus.github.io/gittok/data/feed-details.json" }`。

---

## 单一事实源（为什么搜索结果和站内一致）

`search` 直接复用站点搜索实现 `web/src/search.ts`（加权断层排序：仓库名 > 创作者 > 标签 > 文案），
`top` 复用站点频道函数 `src/feed/channel-policy.ts`（`hotChannel` / `funChannel` / `dailyChannel`，
含站点配额与多样性交错），`detail` 复用站点详情表合并协议 `web/src/payload-split.ts`。
构建时把这些模块内联进 `dist/index.js`，**不存在第二套排序逻辑**；
`npm test` 会把打包产物与站点源码直跑结果**逐条比对**，一旦漂移立刻失败。

## 边界行为（都有明确返回，不抛裸异常）

| 情况 | 返回 |
|---|---|
| 空查询 / 空 repo | `isError:true` + `reason:empty_query` / `empty_repo` + 提示 |
| 无结果 | `ok:true` + `results:[]` + `note`（不是错误） |
| repo 不在库 | `ok:true` + `found:false` + 近似建议 |
| 中文查询 | 正常路径（子串命中 desc / summaryCn / reasonCn） |
| feed 拉取失败 | `isError:true` + `reason:feed_unavailable` + 来源 URL 与自查提示 |
| 非法参数（如 sort 取值错） | 输入校验明确拒绝（`isError:true` + 明确消息），server 不崩 |

## 本包自检

```bash
npm install          # 仅开发需要（产物零依赖）
npm run build        # 打包 → dist/index.js（带 shebang，可执行）
npm test             # 17 项 parity/边界测试（离线，比对站点源码）
npm run test:live    # 线上 e2e：真实 MCP 客户端打线上 feed，留证到 test/e2e-live-output.txt
npm run selftest     # 冒烟：拉线上 feed + 三个 tool 各跑一次
```

## 许可

MIT。`dist/index.js` 内联了 [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)（MIT）与 [zod](https://github.com/colinhacks/zod)（MIT）。

---

## English

GitTok MCP server — three tools (`search` / `top` / `detail`) over the public GitTok feed
(a Chinese-language open-source feed, updated daily). Anonymous, read-only, **no API key**.

Zero-install: download one file and point your client at it.

```bash
curl -fsSL -o ~/gittok-mcp.mjs \
  https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/mcp-gittok/dist/index.js
node ~/gittok-mcp.mjs --selftest
```

```json
{
  "mcpServers": {
    "gittok": { "command": "node", "args": ["/absolute/path/to/gittok-mcp.mjs"] }
  }
}
```

Claude Code: `claude mcp add gittok -- node /absolute/path/to/gittok-mcp.mjs`.

Tools: `search` (full-library weighted search, CJK supported), `top` (`sort`: hot | fun | daily,
optional `zone`: AI / 资源 / 工具 / 创意), `detail` (full card incl. the long Chinese write-up `detailCn`).
Ranking/search semantics are **the same code the website runs** (bundled at build time from
`web/src/search.ts` and `src/feed/channel-policy.ts`; `npm test` asserts parity).

Data source: the public feed JSON, defaulting to the jsDelivr CDN mirror
(fast from mainland China), auto-falling back to GitHub Pages and raw.githubusercontent.com.
Env overrides: `GITTOK_FEED_URL`, `GITTOK_DETAILS_URL`, `GITTOK_FEED_FILE`, `GITTOK_DETAILS_FILE`, `GITTOK_TIMEOUT_MS`.

MIT licensed. The bundled `dist/index.js` includes the MCP SDK and zod (both MIT).
