/**
 * 数据写入锁（2026-09-14，D1 根治）。
 *
 * 事故：`data/feed.json` 是**多写入者共享文档**——本地回填脚本、分档滴灌 workflow、
 * 全量建库 workflow、zone 回填 workflow 都会整份重写它。本会话实测踩了三次：
 *  1. 本地回填 888 张后 7 分钟被 bot 提交整份覆盖；
 *  2. CI 两小时成果因 rebase 冲突 `abort` 丢过一次工作树；
 *  3. **本会话自己**：两个回填进程同时跑同一份 feed+state，凭证数从 394 倒退回 355
 *     （后写的进程用自己内存里的旧快照覆盖了先写进程的成果）。
 *
 * 根治两层：
 *  - **本地进程级**：本模块的文件锁（同一台机器上只允许一个写入者）；
 *  - **CI 级**：workflow 上用 `concurrency: group: feed-data-writer` 串行化
 *    （跨机器、跨 job 的写入排队，而不是靠 rebase 抢救）。
 *
 * 锁的语义：带 TTL 的乐观锁——持锁者崩溃后锁会在 TTL 之后自动失效，
 * 不会把后续所有运行永久堵死（宁可偶发重复劳动，也不能把管道锁死）。
 */

import fs from "node:fs";
import path from "node:path";

export interface LockInfo {
  pid: number;
  label: string;
  startedAt: string;
  host: string;
}

export interface LockOptions {
  /** 锁的存活上限：超过这个时长视为持锁者已死，可抢占（默认 30 分钟）。 */
  ttlMs?: number;
  /** 谁在持锁（写进锁文件，便于排查）。 */
  label?: string;
}

function readLock(lockPath: string): LockInfo | null {
  try {
    return JSON.parse(fs.readFileSync(lockPath, "utf-8")) as LockInfo;
  } catch {
    return null;
  }
}

/**
 * 获取写入锁。成功返回释放函数；被他人持有（且未过期）时抛错。
 *
 * @param lockPath 锁文件路径（用同目录同前缀，便于人肉排查）
 */
export function acquireWriteLock(lockPath: string, opts: LockOptions = {}): () => void {
  const ttl = opts.ttlMs ?? 30 * 60_000;
  const label = opts.label ?? "unknown";
  const dir = path.dirname(lockPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(lockPath)) {
    const info = readLock(lockPath);
    let ageMs = Number.POSITIVE_INFINITY;
    try {
      ageMs = Date.now() - fs.statSync(lockPath).mtimeMs;
    } catch {
      ageMs = Number.POSITIVE_INFINITY; // 读不到 = 已消失，直接抢
    }
    if (ageMs < ttl) {
      const who = info ? `${info.label} pid=${info.pid} host=${info.host}` : "未知持锁者";
      throw new Error(
        `写入锁被占用（${Math.round(ageMs / 1000)}s 前由 ${who} 获取，TTL ${Math.round(ttl / 1000)}s）：${lockPath}`,
      );
    }
    // 过期锁：抢占（记录一条提示，便于事后知道发生过什么）
    console.warn(`[file-lock] 接管过期锁（${Math.round(ageMs / 60_000)} 分钟前）：${lockPath}`);
  }

  const info: LockInfo = {
    pid: process.pid,
    label,
    startedAt: new Date().toISOString(),
    host: process.env["COMPUTERNAME"] ?? process.env["HOSTNAME"] ?? "unknown",
  };
  fs.writeFileSync(lockPath, JSON.stringify(info, null, 2), "utf-8");

  let released = false;
  const release = (): void => {
    if (released) return;
    released = true;
    try {
      const cur = readLock(lockPath);
      // 只删自己的锁：防止误删别人的（虽然正常情况下不可能同时持有）
      if (!cur || cur.pid === process.pid) fs.unlinkSync(lockPath);
    } catch {
      // 锁文件已消失 = 目的已达成
    }
  };
  process.once("exit", release);
  return release;
}

/** 便捷包装：加锁执行，结束后自动释放（异常路径也释放）。 */
export async function withWriteLock<T>(
  lockPath: string,
  label: string,
  fn: () => Promise<T> | T,
  ttlMs?: number,
): Promise<T> {
  const release = acquireWriteLock(lockPath, { label, ttlMs });
  try {
    return await fn();
  } finally {
    release();
  }
}
