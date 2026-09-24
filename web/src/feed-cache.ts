/**
 * feed.json 同日缓存（IndexedDB）——2026-09-05 加载提速。
 *
 * 问题：每次刷新全量重拉 2.1MB 列表 + JSON.parse，感知 2-3 秒起。
 * 方案：拉到一次就把原始文本按日期存进 IndexedDB；同日再刷新直接用缓存渲染
 * （秒开），后台静默拉最新版本，有变化就更新缓存并热替换数据——
 * 数据每天 digest 一次，日内刷新几乎总是命中缓存。
 *
 * 为什么 IndexedDB 不是 localStorage：2.1MB 文本在 localStorage 的 UTF-16
 * 计费下 ≈4.2MB，贴着 5MB 配额边，容易 QuotaExceeded；IDB 无此忧。
 * （列表此后涨到 4.9 MiB —— 2026-09-22 线上实测 5,107,850 B，UTF-16 计费下远超配额，
 *  这条判断只被加强，未被推翻。）
 */

const DB_NAME = "gittok-feed-cache";
const STORE = "feed";

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") return resolve(null);
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

/** 当日缓存的原始文本；无缓存/非当日/IDB 不可用 → null（调用方走网络路径）。
 *  key：'feed'=列表（首屏）、'details'=详情表（弹窗内容），各自独立缓存同日生效。 */
/**
 * ⚠ 2026-09-24 四轮：**这个 Promise 以前可能永远不 settle**——只有 `req.onsuccess` 与
 * `req.onerror` 两条出口，缺 `tx.onabort`。事务被中断（换版本、连接被浏览器关掉、配额清理）时
 * 两条都不触发 → `await` 永久挂起。而上游 `warmFeedDetails()` 的整条链就卡在这一个 await 上：
 *   ⇒ 详情表**永远不会去下载**（线上实测 `feed-details.json` 请求次数 = 0）
 *   ⇒ 点卡片时 `setDetailCard` 永远不执行 ⇒ 弹层从不出现，
 *      而源卡已被 `handleOpenDetail` 标上 `is-open-source` 变成隐形
 *   ⇒ 用户看到的是「**点一下卡片没了，什么都没打开**」（线上必现，本地同 bundle 不复现；
 *      线上其它交互——切频道、切 tab——全部正常，说明不是 hydration/事件问题）。
 * 修法：补齐 `tx.onabort`/`tx.onerror` 出口 + 读超时。缓存只是提速手段，它慢或坏都不该拖住功能。
 */
const DB_READ_TIMEOUT_MS = 1200;

export async function loadCachedText(key: "feed" | "details"): Promise<string | null> {
  try {
    const db = await openDb();
    if (!db) return null;
    return await new Promise<string | null>((resolve) => {
      let done = false;
      let timer: ReturnType<typeof setTimeout>;
      const finish = (v: string | null) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(v);
      };
      timer = setTimeout(() => finish(null), DB_READ_TIMEOUT_MS);
      const tx = db.transaction(STORE, "readonly");
      tx.onabort = () => finish(null);
      tx.onerror = () => finish(null);
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => {
        const row = req.result as { date?: string; text?: string } | undefined;
        finish(row && row.date === todayStamp() && typeof row.text === "string" ? row.text : null);
      };
      req.onerror = () => finish(null);
    });
  } catch {
    return null;
  }
}

/** 存当日缓存；失败静默（缓存缺失只影响下次刷新速度，不影响功能）。
 *  写入也加超时：3.4M 字符的大对象在慢环境下会长时间不 complete，别让它吊着（返回值无人等，但别留悬挂事务）。 */
const DB_WRITE_TIMEOUT_MS = 5000;

export async function saveCachedText(key: "feed" | "details", text: string): Promise<void> {
  try {
    const db = await openDb();
    if (!db) return;
    await new Promise<void>((resolve) => {
      let done = false;
      let timer: ReturnType<typeof setTimeout>;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve();
      };
      timer = setTimeout(finish, DB_WRITE_TIMEOUT_MS);
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put({ date: todayStamp(), text }, key);
      tx.oncomplete = finish;
      tx.onerror = finish;
      tx.onabort = finish;
    });
  } catch {
    /* 静默 */
  }
}
