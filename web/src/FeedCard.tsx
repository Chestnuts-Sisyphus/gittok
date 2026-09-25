import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FeedCard as Card, Collection } from "./types.ts";
import {
  ExternalLink,
  Heart,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  UserRound,
  X,
  BADGE_ICONS,
  BADGE_LABELS,
  SOURCE_ICONS,
  SOURCE_LABELS,
} from "./icons.tsx";
import {
  CLOSE_DURATION,
  CLOSE_INPLACE_DURATION,
  closeInPlaceMotion,
  closeToCardMotion,
  destBoxFromElement,
  isVisibleOpenMotion,
  liveBoxIfUsable,
  openFromCard,
  playCloseMotion,
  playOpenMotion,
} from "./detail-open.ts";

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

function formatStars(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function sourceLabel(src: string): string {
  return SOURCE_LABELS[src] ?? src;
}

/** 数据来源徽章（图标 + 文字） */
function SourceBadge({ src }: { src: string }) {
  const SI = SOURCE_ICONS[src];
  return (
    <span className={`source-badge source-${src}`}>
      {SI && <SI size={12} />}
      {sourceLabel(src)}
    </span>
  );
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "刚刚";
  if (h < 24) return `${h}小时前`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}天前`;
  if (d < 365) return `${Math.floor(d / 30)}个月前`;
  return `${Math.floor(d / 365)}年前`;
}

/** 建仓时间显示：优先 createdAt（仓库真实创建时间，追热点语义），旧数据缺失回退 ts */
function buildAgeText(card: Card): string {
  return timeAgo(card.createdAt ?? card.ts);
}

/** 悬停提示：有建仓时间才显示准确日期 */
function buildAgeTitle(card: Card): string | undefined {
  return card.createdAt ? `建仓于 ${card.createdAt.slice(0, 10)}` : undefined;
}

// 清理旧数据中的 ①②③ 序号
function cleanReason(text: string): string {
  return text.replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, "");
}

export type OpenCardHandler = (card: Card, sourceEl?: HTMLElement) => void;

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
  PHP: "#4F5D95",
};

// ---------------------------------------------------------------------------
// 头像（原生 lazy + 骨架屏占位）
// ---------------------------------------------------------------------------

interface AvatarProps {
  owner: string;
  size: number;
  className: string;
  eager?: boolean;
}

export function GithubAvatar({ owner, size, className, eager = false }: AvatarProps) {
  // GitHub 头像 CDN 国内偶发加载失败/长时间 pending：onError 后退化为
  // 首字母色块（色相由 owner 哈希决定，同一人恒同色），不出现破图与无限占位
  const [failed, setFailed] = useState(false);
  if (failed) {
    let h = 0;
    for (let i = 0; i < owner.length; i++) h = (h * 31 + owner.charCodeAt(i)) % 360;
    return (
      <span
        className={`avatar-fallback ${className}`}
        style={{
          width: size,
          height: size,
          background: `hsl(${h} 35% 32%)`,
          fontSize: size * 0.42,
          lineHeight: `${size}px`,
        }}
        aria-hidden="true"
      >
        {owner.slice(0, 1).toUpperCase()}
      </span>
    );
  }
  return (
    <img
      alt=""
      className={className}
      src={`https://avatars.githubusercontent.com/${owner}?s=${size}&v=4`}
      width={size}
      height={size}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      onError={() => setFailed(true)}
    />
  );
}

// ---------------------------------------------------------------------------
// 频道徽章：显示「当前频道之外它还属于谁」（一个项目有多个标签显性化）
// ---------------------------------------------------------------------------

const DYNAMIC_CHANNEL_KEYS = new Set(["hot", "daily", "following"]);

/** 徽章 = 当前频道之外的归属，badges 存 key（渲染时查 BADGE_ICONS/BADGE_LABELS）。
 *  channel 为空（喜欢/收藏等场景）不显示徽章。 */
function channelBadges(card: Card, channel?: string): string[] {
  if (!channel) return [];
  const badges: string[] = [];
  const pushDynamic = () => {
    if (card.momentum?.includes("hot")) badges.push("hot");
    if (card.momentum?.includes("daily")) badges.push("daily");
    if (card.momentum?.includes("rising")) badges.push("rising");
  };
  if (channel === "recommended" || !DYNAMIC_CHANNEL_KEYS.has(channel)) {
    // 推荐流：全部动态徽章；分类频道：显示动态徽章（分类本身就是当前频道，不重复显示）
    pushDynamic();
  } else {
    // 动态频道：显示固有分类徽章
    badges.push(card.category);
  }
  return badges;
}

// ---------------------------------------------------------------------------
// 紧凑卡片组件（两列网格用）
// ---------------------------------------------------------------------------

interface Props {
  card: Card;
  liked: boolean;
  ignored?: boolean;
  dismissing?: boolean;
  onOpen: OpenCardHandler;
  channel?: string;
  onOpenCreator?: (owner: string) => void;
}

function FeedCardComponent({
  card,
  liked,
  ignored = false,
  dismissing = false,
  onOpen,
  channel,
  onOpenCreator,
}: Props) {
  const langColor = LANG_COLORS[card.language] ?? "#666";
  const reason = cleanReason(card.reasonCn);
  const badges = channelBadges(card, channel);

  return (
    <article
      className={`card${dismissing ? " dismissing" : ""}${ignored ? " ignored" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`打开 ${card.repo} 详情`}
      onClick={(e) => onOpen(card, e.currentTarget)}
      onKeyDown={(e) => {
        // G-14：键盘也能刷卡（空格要挡住默认的页面滚动）
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(card, e.currentTarget);
        }
      }}
    >
      {liked && (
        <span className="card-liked" title="已点赞">
          <Heart size={14} fill="currentColor" />
        </span>
      )}
      <div className="card-header">
        <GithubAvatar owner={card.owner} size={40} className="avatar" />
        <div className="card-title">
          <span className="repo-link">
            {onOpenCreator ? (
              <button
                className="repo-owner repo-owner-btn"
                title={`查看 ${card.owner} 的创作者页`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCreator(card.owner);
                }}
              >
                {card.owner}
              </button>
            ) : (
              <span className="repo-owner">{card.owner}</span>
            )}
            <span className="repo-sep">/</span>
            <span className="repo-name">{card.name}</span>
          </span>
          <div className="card-subtitle">
            <SourceBadge src={card.source} />
            <span title={buildAgeTitle(card)}>{buildAgeText(card)}</span>
            {badges.map((b) => {
              const BI = BADGE_ICONS[b];
              return (
                <span key={b} className="card-badge">
                  {BI && <BI size={12} />}
                  {BADGE_LABELS[b] ?? b}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 始终渲染：空内容靠 min-height 占位 2 行，保证全站卡片高度一致 */}
      <p className="summary">{card.summaryCn}</p>

      {reason && <p className="reason-clamped">{reason}</p>}

      <div className="card-meta">
        <span className="meta-item stars" title={`${card.stars} stars`}>
          <Star size={14} />
          {formatStars(card.stars)}
        </span>
        {card.starGrowth > 0 && (
          <span className="meta-item growth">
            <TrendingUp size={14} />+{card.starGrowth}
          </span>
        )}
        {card.language && (
          <span className="meta-item">
            <span className="lang-dot" style={{ background: langColor }} />
            {card.language}
          </span>
        )}
      </div>

      {card.tags && card.tags.length > 0 && (
        <div className="card-tags">
          {card.tags.slice(0, 8).map((tag) => (
            <span key={tag.name} className={`tag-chip tag-${tag.source}`}>
              {tag.name}
            </span>
          ))}
          {card.tags.length > 8 && <span className="tag-chip tag-more">+{card.tags.length - 8}</span>}
        </div>
      )}
    </article>
  );
}

export const FeedCardMemo = memo(FeedCardComponent);

// ---------------------------------------------------------------------------
// 详情弹窗组件
// ---------------------------------------------------------------------------

interface DetailProps {
  card: Card;
  liked: boolean;
  disliked: boolean;
  collections: Collection[];
  sourceRect?: DOMRect | null;
  /** 源卡 DOM 元素（退场要飞回它，且必须**实时**量它的矩形——快照会过期）。 */
  sourceEl?: HTMLElement | null;
  onLike: (repo: string) => void;
  onDislike: (repo: string) => void;
  onUpdateCollections: (collections: Collection[]) => void;
  onClose: () => void;
  onOpenCreator?: (owner: string) => void;
}

export function CardDetail({
  card,
  liked,
  disliked,
  collections,
  sourceRect = null,
  sourceEl = null,
  onLike,
  onDislike,
  onUpdateCollections,
  onClose,
  onOpenCreator,
}: DetailProps) {
  const langColor = LANG_COLORS[card.language] ?? "#666";
  const reason = cleanReason(card.reasonCn);

  const [showPicker, setShowPicker] = useState(false);
  const [newName, setNewName] = useState("");
  const prevLiked = useRef(liked);
  const [likeFlashGen, setLikeFlashGen] = useState(0);

  useEffect(() => {
    if (liked && !prevLiked.current) {
      setLikeFlashGen((n) => n + 1);
    }
    prevLiked.current = liked;
  }, [liked]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // G-14：弹层焦点收拢 + 关闭后归还给来源卡片
  useEffect(() => {
    const panel = panelRef.current;
    const opener = document.activeElement as HTMLElement | null;
    panel?.querySelector<HTMLElement>(".detail-close")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const outside = !active || !panel.contains(active);
      if (e.shiftKey && (outside || active === first)) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && (outside || active === last)) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      opener?.focus?.();
    };
  }, [card.repo]);
  const fromCard = Boolean(sourceRect);
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * 退场（四轮 T8②，规格见 detail-open.ts 的「退场」注释块）：
   * 所有「关掉它回到列表」的路径都走这里——先播退场，再真卸 DOM。
   * 为什么不再让关闭瞬时：栗子 09-24 认可「每个元素都有路径」这条判据，而弹层原先没有退场路径
   * （点 X / 点遮罩 / 按 Esc 都是"啪"一下消失）。**只改 dismiss 类关闭**：进创作者页那种
   * 「离开去别处」的关闭仍走瞬时（见 App.tsx 的 openCreator）——那时飞回卡片是谎话。
   * 连点只跑一次（closingRef）；`prefers-reduced-motion` 或环境不支持 WAAPI 时保持瞬时。
   * ⚠ 读当前可见盒必须在 `cancel()` **之前**，否则读到的是布局盒（没有在飞 transform 的位置）。
   */
  const closingRef = useRef(false);
  const requestClose = useCallback(() => {
    const panel = panelRef.current;
    if (closingRef.current) return;
    if (!panel || reduceMotion || typeof panel.animate !== "function") {
      onClose();
      return;
    }
    closingRef.current = true;
    const current = panel.getBoundingClientRect(); // 含可能还在飞的 transform
    const layout = destBoxFromElement(panel); // 无 transform 的布局盒（所有位移都相对它表达）
    const live = liveBoxIfUsable(sourceEl, window.innerWidth, window.innerHeight);
    const motion = live ? closeToCardMotion(current, layout, live) : closeInPlaceMotion(current, layout);
    panel.getAnimations().forEach((a) => a.cancel());
    overlayRef.current?.getAnimations().forEach((a) => a.cancel());
    const cardEl = panel.querySelector(".detail-card");
    panel.classList.add("is-flying");
    cardEl?.classList.add("is-flying");
    if (!motion) {
      onClose();
      return;
    }
    // 首帧即动（锁⑩）：playCloseMotion 内部同步写 from 再 animate，中间不落笔。
    // 退场时把源卡一起反向淡回来（栗子：「退场动画的结尾出现了卡片原有位置闪现」）——
    // 只在这张卡真的可见时才做（live 非空）；回退案里源卡已经不可用，没有可交接的对象。
    const {
      card: anim,
      fade,
      revealAnim,
      dim,
    } = playCloseMotion(
      panel,
      overlayRef.current,
      motion,
      live ? CLOSE_DURATION : CLOSE_INPLACE_DURATION,
      live ? sourceEl : null,
    );
    const done = () => {
      panel.classList.remove("is-flying");
      cardEl?.classList.remove("is-flying");
      panel.style.transform = "";
      // ⚠ 顺序要紧：先 onClose()（内部摘掉源卡的 `is-open-source`，CSS 即刻把 opacity 还给卡片），
      // 再取消 reveal 的 fill —— 同一帧内完成，所以看不到任何跳变；
      // 反过来（先取消再摘 class）会让卡片有几率闪一帧 opacity:0（class 还在）。
      onClose();
      revealAnim?.cancel();
    };
    void anim.finished.then(done, done);
    void fade.finished.catch(() => {});
    void dim?.finished.catch(() => {});
  }, [onClose, reduceMotion, sourceEl]);

  // Esc ＝「关掉它回列表」，与点 X、点遮罩同一条路径（同一条退场）。
  // 四轮溯源：App.tsx 原先那条「ESC 立刻关弹窗，不播反向收回」的注释是 b55bca5 描述
  // 「当时确实没有退场动画」的状态，不是裁决（那次提交同时把 setDetailCard(null) 换成 closeDetail()）。
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !sourceRect) return;
    if (reduceMotion || typeof panel.animate !== "function") return;
    // 终态盒读实测布局位。带飞行 transform 再量会把源卡视觉盒当成终点。
    const destRect = destBoxFromElement(panel);
    const motion = openFromCard(
      {
        left: sourceRect.left,
        top: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
      },
      destRect,
    );
    if (!motion || !isVisibleOpenMotion(motion)) return;

    let cancelled = false;
    const card = panel.querySelector(".detail-card");
    panel.classList.add("is-flying");
    card?.classList.add("is-flying");
    const { card: anim, dim } = playOpenMotion(panel, overlayRef.current, motion);
    const done = () => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled) return;
        panel.classList.remove("is-flying");
        card?.classList.remove("is-flying");
      });
    };
    void anim.finished.then(done, done);
    return () => {
      cancelled = true;
      anim.cancel();
      dim?.cancel();
      panel.style.transform = "";
    };
  }, [sourceRect, reduceMotion]);

  const inCollections = collections.filter((c) => c.repos.includes(card.repo));

  const toggleCollection = (colId: string) => {
    const next = collections.map((c) => {
      if (c.id !== colId) return c;
      const has = c.repos.includes(card.repo);
      return { ...c, repos: has ? c.repos.filter((r) => r !== card.repo) : [...c.repos, card.repo] };
    });
    onUpdateCollections(next);
  };

  const createAndAdd = () => {
    const name = newName.trim();
    if (!name) return;
    const newCol: Collection = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      repos: [card.repo],
      createdAt: new Date().toISOString(),
      isAuto: false,
    };
    onUpdateCollections([...collections, newCol]);
    setNewName("");
  };

  const content = (
    <>
      {likeFlashGen > 0 && <span key={likeFlashGen} className="like-flash-bar" aria-hidden="true" />}
      <button className="detail-close" onClick={requestClose} aria-label="关闭详情">
        <X size={18} />
      </button>

      <div className="detail-header">
        <GithubAvatar owner={card.owner} size={40} className="detail-avatar" eager />
        <div>
          <div className="detail-repo">
            <span className="repo-owner">{card.owner}</span>
            <span className="repo-sep"> / </span>
            <span className="repo-name">{card.name}</span>
          </div>
          <div className="detail-subtitle">
            <SourceBadge src={card.source} />
            <span title={buildAgeTitle(card)}>建仓 {buildAgeText(card)}</span>
          </div>
        </div>
      </div>

      {card.summaryCn && <p className="detail-summary">{card.summaryCn}</p>}

      {reason && (
        <>
          <div className="detail-label">简要介绍</div>
          <p className="detail-reason">{reason}</p>
        </>
      )}

      {card.detailCn && (
        <>
          <div className="detail-label">深度解读</div>
          <p className="detail-detail">{card.detailCn}</p>
        </>
      )}

      <div className="detail-meta">
        <span className="meta-item stars" title={`${card.stars} stars`}>
          <Star size={14} />
          {formatStars(card.stars)} stars
        </span>
        {card.starGrowth > 0 && (
          <span className="meta-item growth">
            <TrendingUp size={14} />+{card.starGrowth} 今日增长
          </span>
        )}
        {card.language && (
          <span className="meta-item">
            <span className="lang-dot" style={{ background: langColor }} />
            {card.language}
          </span>
        )}
        {(card.aiDim ?? card.aiDims?.[0]) && (
          <span className="dim-badge">{card.aiDim ?? card.aiDims?.[0]}</span>
        )}
      </div>

      {card.topics.length > 0 && (
        <div className="detail-topics">
          {card.topics.map((t) => (
            <span key={t} className="topic-tag">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="detail-actions">
        <button className={`action-btn like-btn${liked ? " active" : ""}`} onClick={() => onLike(card.repo)}>
          <ThumbsUp size={20} />
        </button>
        <button
          className={`action-btn dislike-btn${disliked ? " active" : ""}`}
          onClick={() => onDislike(card.repo)}
        >
          <ThumbsDown size={20} />
        </button>
        <button
          className={`action-btn bookmark-btn${inCollections.length > 0 ? " active" : ""}`}
          onClick={() => setShowPicker(!showPicker)}
          title={
            inCollections.length > 0 ? `已收藏到 ${inCollections.map((c) => c.name).join("、")}` : "收藏"
          }
        >
          <Star size={20} />
        </button>
        {onOpenCreator && (
          <button
            className="action-btn creator-btn"
            onClick={() => onOpenCreator(card.owner)}
            title={`查看 ${card.owner} 的创作者页`}
          >
            <UserRound size={16} />
            查看创作者
          </button>
        )}
        <a href={card.url} target="_blank" rel="noopener noreferrer" className="action-btn open-btn">
          <ExternalLink size={18} />
          GitHub 主页
        </a>
      </div>

      {/* 收藏夹选择器：居中小模态（遮罩+居中卡片，不再挂在动作条附近乱飘） */}
      {showPicker && (
        <div className="picker-backdrop" onClick={() => setShowPicker(false)}>
          <div className="collection-picker" onClick={(e) => e.stopPropagation()}>
            <div className="picker-header">
              <span>选择收藏夹</span>
              <button className="picker-close" onClick={() => setShowPicker(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="picker-list">
              {collections.length === 0 && <p className="picker-empty">暂无收藏夹，在下方创建</p>}
              {collections.map((col) => {
                const checked = col.repos.includes(card.repo);
                return (
                  <label key={col.id} className="picker-item">
                    <input type="checkbox" checked={checked} onChange={() => toggleCollection(col.id)} />
                    <span className="picker-item-name">{col.name}</span>
                    <span className="picker-item-count">({col.repos.length}个)</span>
                  </label>
                );
              })}
            </div>
            <div className="picker-create">
              <input
                type="text"
                className="picker-input"
                placeholder="新建收藏夹…"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") createAndAdd();
                }}
              />
              <button className="picker-create-btn" onClick={createAndAdd} disabled={!newName.trim()}>
                + 创建
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div
      ref={overlayRef}
      className={`detail-overlay${fromCard ? " is-from-card" : ""}`}
      onClick={requestClose}
    >
      <div
        ref={panelRef}
        className={`detail-mover${fromCard ? " is-from-card" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`detail-card${fromCard ? " is-from-card" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${card.repo} 详情`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
