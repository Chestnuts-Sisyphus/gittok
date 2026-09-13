import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Bookmark,
  Bot,
  Check,
  ChevronRight,
  ExternalLink,
  Flame,
  Folder,
  Gamepad2,
  Heart,
  Home,
  Inbox,
  LoaderCircle,
  Menu,
  PartyPopper,
  Rocket,
  Search,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  TrendingUp,
  User,
  UserMinus,
  UserRound,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// 频道图标 map（按图标 key，与 SECTIONS 常量 icon 字段对应：侧栏 18px / 频道头 18px）
// ---------------------------------------------------------------------------

export const CHANNEL_ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  flame: Flame,
  "trending-up": TrendingUp,
  "party-popper": PartyPopper,
  heart: Heart,
  bot: Bot,
  gamepad: Gamepad2,
  wrench: Wrench,
  book: BookOpen,
};

// ---------------------------------------------------------------------------
// 徽章图标 map（按 badge key，12px；badge key 与频道 key 一致）
// ---------------------------------------------------------------------------

export const BADGE_ICONS: Record<string, LucideIcon> = {
  hot: Flame,
  daily: TrendingUp,
  rising: Rocket,
  ai: Bot,
  fun: Gamepad2,
  tool: Wrench,
  learning: BookOpen,
};

/** 徽章文字（badge key → 中文标签） */
export const BADGE_LABELS: Record<string, string> = {
  hot: "热门",
  daily: "每日",
  rising: "新星",
  ai: "AI",
  fun: "兴趣",
  tool: "工具",
  learning: "学习",
};

/** 数据来源徽章（source → 图标 + 文字）。
 *  bigbro=旧「大牛灌卡」时期的历史存量卡（96 张），语义已于 2026-09-05 全面退役，
 *  仅保留中性展示文案「收录」，不再出现「大牛」字样。 */
export const SOURCE_ICONS: Record<string, LucideIcon> = {
  trending: Flame,
  bigbro: Bookmark,
  search: Search,
};

export const SOURCE_LABELS: Record<string, string> = {
  trending: "热门",
  bigbro: "收录",
  search: "搜索",
};

// ---------------------------------------------------------------------------
// 工具图标统一 re-export（size 默认 18、className 透传为 lucide 原生能力）
// ---------------------------------------------------------------------------

export {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  ExternalLink,
  Folder,
  Gamepad2,
  Heart,
  Home,
  Inbox,
  LoaderCircle,
  Menu,
  PartyPopper,
  Rocket,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  TrendingUp,
  User,
  UserMinus,
  UserRound,
  Users,
  Wrench,
  X,
};

export type { LucideIcon };

// ---------------------------------------------------------------------------
// GitTokLogo：accent 渐变（135deg #8B6CC7→#A78BFA）圆角方块（radius 9，28px）
// + 白色信号波纹；右侧衬线文字 GitTok（渐变由 .logo-text 继承全局 --accent-gradient）
// ---------------------------------------------------------------------------

export function GitTokLogo({ size = 28 }: { size?: number }) {
  return (
    <span className="logo-mark">
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="gittok-logo-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7A5CC0" />
          </linearGradient>
        </defs>
        {/* 透明背景渐变闪电（经典细版）：上下尖锐、腰身收窄的修长闪电；同色描边增粗保证 28px 辨识度 */}
        <path
          d="M13 2.5 L4.5 13.5 H10.5 L8.8 21.5 L19 10.5 H12.8 Z"
          fill="url(#gittok-logo-grad)"
          stroke="url(#gittok-logo-grad)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo-text">GitTok</span>
    </span>
  );
}
