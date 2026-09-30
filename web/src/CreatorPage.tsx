import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, ExternalLink } from "./icons.tsx";
import { FeedCardMemo, GithubAvatar } from "./FeedCard.tsx";
import type { FeedCard } from "./types.ts";

// ---------------------------------------------------------------------------
// 创作者页（子页面：由 App 的 viewStack 驱动，栈顶 owner 即当前页）
// ---------------------------------------------------------------------------

interface CreatorPageProps {
  owner: string;
  /** 该创作者的项目（调用方已按 score 降序） */
  projects: FeedCard[];
  likedSet: ReadonlySet<string>;
  dislikedSet: ReadonlySet<string>;
  isFollowing: boolean;
  onToggleFollow: (owner: string) => void;
  /** 项目卡片打开详情（overlay，与页面栈独立） */
  onOpen: (card: FeedCard, sourceEl?: HTMLElement) => void;
  /** 创作者页内项目卡片点其他 owner → 压栈（第二层） */
  onOpenCreator: (owner: string) => void;
  /** 返回（pop 一层） */
  onBack: () => void;
}

export function CreatorPage({
  owner,
  projects,
  likedSet,
  dislikedSet,
  isFollowing,
  onToggleFollow,
  onOpen,
  onOpenCreator,
  onBack,
}: CreatorPageProps) {
  // 关注提示：只在「未关注 → 关注」跃迁时弹出（进页面时已是关注态不打扰）。
  // 气泡锚定在关注按钮正下方（不占文档流、不遮卡片列表），2.5s 自动退场。
  const [followHint, setFollowHint] = useState(false);
  const prevFollowing = useRef(isFollowing);
  useEffect(() => {
    const becameFollowing = isFollowing && !prevFollowing.current;
    prevFollowing.current = isFollowing;
    if (!becameFollowing) {
      if (!isFollowing) setFollowHint(false);
      return;
    }
    setFollowHint(true);
    const timer = setTimeout(() => setFollowHint(false), 2500);
    return () => clearTimeout(timer);
  }, [isFollowing]);

  return (
    <div className="creator-page">
      <button className="creator-back" onClick={onBack}>
        <ArrowLeft size={16} />
        返回
      </button>
      <div className="creator-header">
        <GithubAvatar owner={owner} size={128} className="creator-avatar" />
        <div className="creator-info">
          <div className="creator-name-row">
            <h2 className="creator-name">{owner}</h2>
            <a
              className="creator-github"
              href={`https://github.com/${owner}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} />
              GitHub
            </a>
          </div>
          <div className="creator-count">{projects.length} 个项目</div>
          <div className="creator-follow-wrap">
            <button
              className={`creator-follow-btn${isFollowing ? " followed" : " following"}`}
              onClick={() => onToggleFollow(owner)}
            >
              {isFollowing ? "已关注" : "+ 关注"}
            </button>
            {followHint && (
              <div className="creator-follow-toast" role="status">
                <Check size={14} className="toast-check" />
                已关注 · TA 的新项目会出现在关注频道
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="creator-projects">
        {projects.length === 0 ? (
          <div className="status">
            <p>该创作者暂无入库项目</p>
          </div>
        ) : (
          <div className="feed-list" data-cols="1" style={{ "--feed-cols": 1 } as React.CSSProperties}>
            {/* 十二轮：.feed-list 已改列式容器——创作者页只有一列，仍走同一结构（单列 .feed-col） */}
            <div className="feed-col">
              {projects.map((card) => (
                <FeedCardMemo
                  key={card.repo}
                  card={card}
                  liked={likedSet.has(card.repo)}
                  ignored={dislikedSet.has(card.repo)}
                  onOpen={onOpen}
                  onOpenCreator={onOpenCreator}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
