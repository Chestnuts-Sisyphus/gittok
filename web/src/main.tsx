import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";

/* 顶层 ErrorBoundary（二十一轮 N5）：App 本体渲染崩溃也落可恢复 UI——
   紫屏（整树卸载只剩背景色）从此在机制上不可能；componentDidCatch 里 console.error 留证据。 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary label="应用根">
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

/* ── Service Worker 预缓存（二十一轮 N4②「无感加载」）────────────────────────────
 * sw.js 由构建期生成（vite.config swPrecachePlugin）：静态壳层（hash JS/CSS/字体/favicon）
 * 预缓存＋版本化缓存名失效策略。注册放在 load 之后——不进 boot 关键路径（闸可证）。
 * 数据类（data/*、feed.json）SW 明确放行：新鲜度归应用层同日缓存语义管（十二轮资产）。
 * 失败静默降级：SW 只是加速件，注册不了站点照常工作。 */
if (
  "serviceWorker" in navigator &&
  (location.protocol === "https:" || location.hostname === "127.0.0.1" || location.hostname === "localhost")
) {
  window.addEventListener("load", () => {
    const swUrl = new URL("sw.js", document.baseURI).href;
    const scope = new URL("./", document.baseURI).href;
    navigator.serviceWorker.register(swUrl, { scope }).catch((err: unknown) => {
      console.warn("[gittok] SW 注册失败（站点照常运行）:", err instanceof Error ? err.message : err);
    });
  });
}

// 构建号 boot 日志（N5 复验协议第一步：先看 bundle 是不是新的，再取证 console）。
console.info(`[gittok] bundle ${__BUILD_ID__}`);
