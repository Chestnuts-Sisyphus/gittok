/**
 * legacy 整表解析 Worker（二十二-3，2026-10-07）。
 *
 * 类根源：整表兜底 feed-details.json（5.9MB）的 JSON.parse 在主线程上是 50–250ms 长任务，
 * 会把点击渲染排在它后面（CI P6 257ms 假红的直接原因）。解析搬进 Worker：主线程只发文本
 * 收结果；Worker 内缓存上次解析的表——同日整表文本不变 ⇒ 后续查询零重解析。
 *
 * 协议：入 {id, text?, repo}（text 在场则换表，缺省用已缓存表）→
 *       出 {id, value: string|null} 或 {id, error}。value=null＝确认缺失（非网络失败）。
 */
interface WorkerRequest {
  id: number;
  text?: string;
  repo: string;
}

const ctx = self as unknown as {
  onmessage: ((ev: MessageEvent) => void) | null;
  postMessage: (v: unknown) => void;
};

let lastText = "";
let lastTable: Record<string, string> = {};

ctx.onmessage = (ev: MessageEvent) => {
  const req = ev.data as WorkerRequest;
  try {
    if (typeof req.text === "string" && req.text !== lastText) {
      lastTable = JSON.parse(req.text) as Record<string, string>;
      lastText = req.text;
    }
    const v = lastTable[req.repo];
    ctx.postMessage({ id: req.id, value: typeof v === "string" && v ? v : null });
  } catch (err: unknown) {
    ctx.postMessage({ id: req.id, error: err instanceof Error ? err.message : String(err) });
  }
};
