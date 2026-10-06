import React from "react";

/**
 * ErrorBoundary（二十一轮 N5，2026-10-06，栗子「搜索/收藏整页变紫没有任何东西」）。
 *
 * 紫屏＝渲染树整树卸载后只剩主题背景色（React 未捕获渲染错误的默认行为——二十轮取证的
 * 搜索页 React #185 就是这一类）。旧标签页跑旧 bundle 还会再撞，未来任何新代码路径也可能
 * 撞同类问题：这是**类根源**，兜底必须机制化——任何渲染崩溃都落进可恢复的错误 UI，
 * 永不白屏/紫屏。
 *
 * 纪律（任务书硬性）：**不许吞错误**——componentDidCatch 里 console.error 留全量证据
 * （error＋componentStack），控制台永远可取证；UI 上也展示错误消息。
 *
 * 两个形态：
 *  - page（默认）：整块内容区替换为「出了问题＋重试/刷新」——主内容区与整棵 App 用；
 *  - overlay：详情弹层用——崩溃只塌弹层，回调 onReset 让用户一键回到信息流（信息流不陪葬）。
 */

interface ErrorBoundaryProps {
  /** 证据标签：console.error 里标识是哪块边界接住的。 */
  label: string;
  variant?: "page" | "overlay";
  /** overlay 形态的恢复回调（通常=closeDetail：关掉崩溃的弹层回到列表）。 */
  onReset?: () => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // 留证据（N5 纪律：不许吞错误）。componentStack 指明崩在哪个子树，控制台可直接归因。
    console.error(`[ErrorBoundary:${this.props.label}] 渲染崩溃（已兜底，未吞错误）`, error, {
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
    });
  }

  private reset = () => {
    this.setState({ error: null });
  };

  render(): React.ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.variant === "overlay") {
      return (
        <div className="crash-fallback crash-fallback-overlay" role="alert">
          <p className="crash-title">详情弹层出了问题</p>
          <p className="crash-message">{error.message}</p>
          <div className="crash-actions">
            <button type="button" onClick={this.reset}>
              重试
            </button>
            <button type="button" onClick={this.props.onReset}>
              返回列表
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="crash-fallback" role="alert">
        <p className="crash-title">页面出了点问题，但可以恢复</p>
        <p className="crash-message">{error.message}</p>
        <div className="crash-actions">
          <button type="button" onClick={this.reset}>
            重试
          </button>
          <button type="button" onClick={() => window.location.reload()}>
            刷新页面
          </button>
        </div>
      </div>
    );
  }
}
