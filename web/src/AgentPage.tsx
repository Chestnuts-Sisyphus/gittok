import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  ExternalLink,
  LoaderCircle,
  Rocket,
  TrendingUp,
  Wrench,
} from "./icons.tsx";

// ---------------------------------------------------------------------------
// Agent 接入页（站点第四 tab）：让 Agent 直接使用 GitTok。
// 四条接入路径全部匿名只读、无需 API Key；本页负责把「接口已上线」这件事
// 在站点上呈现出来，并带一块客户端可用性自检（同一套线上端点）。
// 全部 URL 为固定常量（本仓线上域名 + jsDelivr 镜像），无用户输入参与。
// ---------------------------------------------------------------------------

const SITE = "https://chestnuts-sisyphus.github.io/gittok";

/** feed.json 体积（KB；2026-09-18 线上实测 4424078 B）。状态板备注与 REST 示例
    共用这一个来源——此前两处各写各的，同页出现「4.3MB」与「4.4MB」两个数字 */
const FEED_JSON_KB = 4320;
const FEED_JSON_MB = `${(FEED_JSON_KB / 1024).toFixed(1)}MB`;

/** 状态自检的端点（相对路径走站点域名；jsDelivr 为 CDN 镜像） */
const STATUS_ENDPOINTS: { name: string; url: string; note?: string }[] = [
  { name: "llms.txt", url: "./llms.txt", note: "面向 Agent 的入口文件" },
  { name: "Agent Skill", url: "./agent/SKILL.md" },
  { name: "MCP 说明", url: "./agent/MCP.md" },
  { name: "API 文档", url: "./agent/API.md" },
  { name: "RSS", url: "./feed.xml" },
  { name: "日报索引", url: "./manifest.json" },
  { name: "卡片列表", url: "./data/feed.json", note: `约 ${FEED_JSON_MB}` },
  { name: "卡片详情表", url: "./data/feed-details.json" },
  { name: "今日日报", url: "./digests/latest/ai-cli.md" },
  { name: "MCP 单文件（CDN）", url: "https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/mcp-gittok/dist/index.js", note: "782KB，零依赖" },
];

interface EndpointStatus {
  name: string;
  url: string;
  note?: string;
  ok: boolean | null;
  status?: number;
  err?: string;
}

function checkEndpoint(e: { name: string; url: string; note?: string }): Promise<EndpointStatus> {
  return fetch(e.url, { method: "HEAD", cache: "no-store" })
    .then((r) => ({ ...e, ok: r.ok, status: r.status }))
    .catch((err) => ({ ...e, ok: false, err: String(err).slice(0, 80) }));
}

// ---------------------------------------------------------------------------
// 服务状态块
// ---------------------------------------------------------------------------

function StatusBoard() {
  const [items, setItems] = useState<EndpointStatus[]>(() =>
    STATUS_ENDPOINTS.map((e) => ({ ...e, ok: null })),
  );
  const [running, setRunning] = useState(false);

  const run = useCallback(() => {
    setRunning(true);
    Promise.all(STATUS_ENDPOINTS.map(checkEndpoint)).then((res) => {
      setItems(res);
      setRunning(false);
    });
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  const okCount = items.filter((i) => i.ok === true).length;
  const doneCount = items.filter((i) => i.ok !== null).length;

  return (
    <section className="agent-card agent-status">
      <div className="agent-status-head">
        <h3>
          <Wrench size={16} />
          服务状态
        </h3>
        <div className="agent-status-meta">
          {running ? (
            <span className="agent-status-running">
              <LoaderCircle size={14} className="spin" />
              检测中
            </span>
          ) : doneCount > 0 ? (
            <span className={okCount === doneCount ? "agent-ok" : "agent-warn"}>
              {okCount === doneCount ? <Check size={14} /> : <AlertTriangle size={14} />}
              {okCount}/{doneCount} 正常
            </span>
          ) : (
            <span className="agent-muted">未检测</span>
          )}
          <button className="agent-retry" onClick={run} disabled={running}>
            重新检测
          </button>
        </div>
      </div>
      <div className="agent-status-grid">
        {items.map((it) => (
          <div key={it.url} className={`agent-status-item${it.ok === false ? " down" : ""}`}>
            <span className="agent-status-dot" aria-hidden />
            <span className="agent-status-name">{it.name}</span>
            {it.note && <span className="agent-status-note">{it.note}</span>}
            {/* 状态码排在最后：所有行的数字贴同一条右边线，此前备注长短会让数字左右乱跳 */}
            <span className="agent-status-code">
              {it.ok === null ? (
                <span className="agent-muted">…</span>
              ) : it.ok ? (
                <span className="agent-ok">{it.status ?? 200}</span>
              ) : (
                <span className="agent-bad" title={it.err}>
                  ✗
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 接入路径卡片
// ---------------------------------------------------------------------------

interface PathCardProps {
  icon: ReactNode;
  title: string;
  tag: string;
  desc: string[];
  example: ReactNode;
  links: { label: string; href: string }[];
}

function PathCard({ icon, title, tag, desc, example, links }: PathCardProps) {
  return (
    <div className="agent-path">
      <div className="agent-path-head">
        <span className="agent-path-icon">{icon}</span>
        <div className="agent-path-title">
          <h3>{title}</h3>
          <span className="agent-path-tag">{tag}</span>
        </div>
      </div>
      <div className="agent-desc">
        {desc.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <div className="agent-example">{example}</div>
      <div className="agent-links">
        {links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
            <ExternalLink size={13} />
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 页面主体
// ---------------------------------------------------------------------------

export function AgentPage() {
  return (
    <div className="agent-page">
      {/* 头部：一句话说清「四条路径都是匿名只读」 */}
      <section className="agent-hero">
        <h2>让 Agent 直接使用 GitTok</h2>
        <p className="agent-hero-sub">
          四条接入路径都是<b>匿名只读、无需 API Key</b>：Agent Skill、MCP server、RSS、REST API。
        </p>
        <div className="agent-badges">
          <span className="agent-badge">匿名只读</span>
          <span className="agent-badge">无需 API Key</span>
          <span className="agent-badge">每日更新</span>
          <span className="agent-badge">中文优先</span>
        </div>
      </section>

      <StatusBoard />

      {/* 四条接入路径 */}
      <section className="agent-section">
        <h3 className="agent-section-title">
          <Rocket size={16} />
          四条接入路径
        </h3>
        <div className="agent-paths">
          <PathCard
            icon={<Bot size={20} />}
            title="Agent Skill"
            tag="装一次，之后直接用中文问"
            desc={[
              "不用记端点也不用写代码；把 skills/gittok 目录放进 Agent 的工具目录，新会话里直接问即可。",
              "适合 Claude Code、Codex、Gemini CLI 这类支持 Agent Skills 的工具。",
            ]}
            example={
              <code>
                <span className="agent-cmd"># 下载说明文档</span>
                {"\n"}
                curl -fsSL -o gittok-skill.md {SITE}/agent/SKILL.md
                {"\n\n"}
                <span className="agent-cmd"># Skill 完整包（脚本 + 校验）在仓库 skills/gittok/</span>
                {"\n\n"}
                <span className="agent-cmd"># 新会话里直接问：</span>
                「GitTok 今天有什么值得关注的开源项目？」
              </code>
            }
            links={[
              { label: "说明文档", href: `${SITE}/agent/SKILL.md` },
              { label: "GitHub 完整包", href: "https://github.com/Chestnuts-Sisyphus/gittok/tree/master/skills/gittok" },
            ]}
          />

          <PathCard
            icon={<BookOpen size={20} />}
            title="MCP server"
            tag="search / top / detail"
            desc={[
              "stdio 型单文件零依赖：search=全库关键词搜索（中文可用）、top=按热度 / 乐趣 / 时效取榜、detail=取完整卡片。",
              "排序与搜索复用站点同一套代码，有 parity 测试锁定——Agent 看到的顺序和站点一致。",
            ]}
            example={
              <code>
                <span className="agent-cmd"># 下载单文件（782KB，零依赖）</span>
                {"\n"}
                curl -fsSL -o gittok-mcp.mjs \
                {"\n  "}https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/mcp-gittok/dist/index.js
                {"\n\n"}
                node gittok-mcp.mjs --selftest
                {"\n\n"}
                <span className="agent-cmd"># 客户端里这样配置：</span>
                {"\n"}
                {"{"}"mcpServers": {"{"}"gittok": {"{"}"command": "node",
                {"\n  "}"args": ["/path/to/gittok-mcp.mjs"]{"}"}{"}"}{"}"}
              </code>
            }
            links={[
              { label: "MCP 说明", href: `${SITE}/agent/MCP.md` },
              { label: "单文件下载", href: "https://cdn.jsdelivr.net/gh/Chestnuts-Sisyphus/gittok@master/mcp-gittok/dist/index.js" },
            ]}
          />

          <PathCard
            icon={<TrendingUp size={20} />}
            title="RSS"
            tag="日报条目流"
            desc={[
              "RSS 2.0，匿名直连。任何订阅器、阅读器或 agent 可直接订阅。",
              "想要 Markdown 日报正文，见右侧「AI 日报」资源（digests/latest 恒指最近一天）。",
            ]}
            example={
              <code>
                <span className="agent-cmd"># 订阅地址</span>
                {"\n"}
                {SITE}/feed.xml
                {"\n\n"}
                <span className="agent-cmd"># 命令行预览（只取前 2000 字节）</span>
                {"\n"}
                curl -fsSL {SITE}/feed.xml \
                {"\n  "}| head -c 2000
              </code>
            }
            links={[{ label: "feed.xml", href: `${SITE}/feed.xml` }]}
          />

          <PathCard
            icon={<Wrench size={20} />}
            title="REST API"
            tag="全量 JSON 匿名直连"
            desc={[
              "卡片列表、卡片详情表、日报索引三个 JSON 端点，即站点本体数据——无需登录。",
              "字段表与排序语义（热门 / 每日 / 乐趣口径）见接口文档，示例命令逐条可跑。",
            ]}
            example={
              <code>
                <span className="agent-cmd"># 卡片列表（中文摘要，约 {FEED_JSON_MB}）</span>
                {"\n"}
                curl -fsSL {SITE}/data/feed.json
                {"\n\n"}
                <span className="agent-cmd"># 卡片详情表（repo → 中文长文）</span>
                {"\n"}
                curl -fsSL {SITE}/data/feed-details.json
                {"\n\n"}
                <span className="agent-cmd"># 日报索引（dates[] → reports[]）</span>
                {"\n"}
                curl -fsSL {SITE}/manifest.json
              </code>
            }
            links={[
              { label: "接口文档", href: `${SITE}/agent/API.md` },
              { label: "卡片列表", href: `${SITE}/data/feed.json` },
            ]}
          />
        </div>
      </section>

      {/* 资源与镜像 */}
      <section className="agent-section">
        <h3 className="agent-section-title">
          <BookOpen size={16} />
          资源与镜像
        </h3>
        <div className="agent-resources">
          <a className="agent-resource" href={`${SITE}/llms.txt`} target="_blank" rel="noopener noreferrer">
            <BookOpen size={16} />
            <span>
              <b>llms.txt</b>
              <small>入口文件：给 Agent 读，读完能自己发现全部接口</small>
            </span>
            <ChevronRight size={15} />
          </a>
          <a className="agent-resource" href={`${SITE}/agent/API.md`} target="_blank" rel="noopener noreferrer">
            <BookOpen size={16} />
            <span>
              <b>API 文档</b>
              <small>字段表 / 示例 / 排序语义</small>
            </span>
            <ChevronRight size={15} />
          </a>
          <a className="agent-resource" href={`${SITE}/digests/latest/ai-cli.md`} target="_blank" rel="noopener noreferrer">
            <Bot size={16} />
            <span>
              <b>AI 日报</b>
              <small>digests/latest 恒指最近一天；主题 ai-cli / ai-agents / ai-trending …</small>
            </span>
            <ChevronRight size={15} />
          </a>
          <a
            className="agent-resource"
            href="https://github.com/Chestnuts-Sisyphus/gittok"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} />
            <span>
              <b>GitHub 镜像</b>
              <small>源码 / 数据管线 / 日报全量（MIT）</small>
            </span>
            <ChevronRight size={15} />
          </a>
        </div>
      </section>

      {/* 三步接入 */}
      <section className="agent-section">
        <h3 className="agent-section-title">
          <Bot size={16} />
          三步接入
        </h3>
        <div className="agent-steps">
          <div className="agent-step">
            <span className="agent-step-n">01</span>
            <div>
              <b>把提示词发给 Agent</b>
              <p>把本页任意一条路径的说明（或 llms.txt 的地址）发给 Agent；它能自己发现接口与用法。</p>
            </div>
          </div>
          <div className="agent-step">
            <span className="agent-step-n">02</span>
            <div>
              <b>开个新会话</b>
              <p>多数 Agent 只在会话开始时扫描 Skill / 读取文件——中途发过去不一定看到。</p>
            </div>
          </div>
          <div className="agent-step">
            <span className="agent-step-n">03</span>
            <div>
              <b>问一句验证</b>
              <p>看到时间窗、中文摘要和站内链接，就算接上了。</p>
            </div>
          </div>
        </div>
        <div className="agent-verify">
          <span className="agent-verify-label">示例提问</span>
          <code>「GitTok 今天有什么值得关注的开源项目？」</code>
        </div>
      </section>

      <p className="agent-foot">
        所有路径匿名只读、无需 API Key、不注册不鉴权。站点每天更新数次，请缓存 ≥10 分钟，不要高频全量拉取。
      </p>
    </div>
  );
}