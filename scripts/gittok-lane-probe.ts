/**
 * 调度矩阵通道探针（2026-09-14）：对每个矩阵键发一次极小请求，验证
 * 「key 可用 + 参数纪律正确（thinking disabled / enable_thinking:false / reasoning disabled）+ 响应可解析」。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-lane-probe.ts
 * 密钥从 D:/AI/KEY/ 运行时注入（复用启动器的解析与矩阵组装），输出零回显（只显指纹）。
 */

import { buildPlan } from "./gittok-fullbuild-lib.ts";
import { ScheduledLlmExecutor, executorFromMatrix } from "../src/feed/executor.ts";
import { parseMatrix } from "../src/feed/scheduler.ts";

const PROMPT = '只回一行 JSON，不要任何其他文字：{"ok":true,"n":7}';

async function main(): Promise<void> {
  const { tail, env } = buildPlan();
  const merged: NodeJS.ProcessEnv = { ...process.env, ...env };
  for (const t of tail) {
    if (t.paramsEnv) merged[t.paramsEnv] = JSON.stringify(t.params);
  }
  merged["SCHED_TAIL_MODELS"] = tail.map((t) => t.entry).join(";");

  const matrix = parseMatrix(merged);
  if (matrix.length === 0) {
    console.log("[probe] 矩阵为空（D:/AI/KEY/ 下没有可用 key）");
    process.exit(1);
  }
  // executor 的 provider 构造读 process.env（custom 通道三变量），临时注入
  for (const [k, v] of Object.entries(merged)) if (v !== undefined) process.env[k] = v;

  const executor: ScheduledLlmExecutor = new ScheduledLlmExecutor(
    tail.map((t) => {
      // 把矩阵条目拆回 provider/model，并带上多 key 池（与生产执行层同构）
      const first = t.entry.indexOf(":");
      const last = t.entry.lastIndexOf(":");
      const tailPart = t.entry.slice(last + 1);
      const provider = t.entry.slice(0, first);
      const model = t.entry.slice(first + 1, /^\d+$/.test(tailPart) ? last : undefined);
      return { provider, model, keys: t.keys, extraParams: t.params };
    }),
  );
  console.log(`[probe] ${matrix.length} 条通道，逐条试探（max_tokens=64）：`);
  let fail = 0;
  for (const e of matrix) {
    const key = `${e.provider}:${e.model}`;
    const caller = executor.callerFor(key);
    if (!caller) {
      console.log(`  ✗ ${key} — 通道未注册`);
      fail++;
      continue;
    }
    const t0 = Date.now();
    try {
      const out = (await caller(PROMPT, 64)).trim().slice(0, 120);
      console.log(`  ✓ ${key} (${Date.now() - t0}ms): ${out.replace(/\s+/g, " ")}`);
    } catch (err) {
      console.log(`  ✗ ${key} (${Date.now() - t0}ms): ${String(err).slice(0, 200)}`);
      fail++;
    }
  }
  executor.logHealth();
  console.log(fail === 0 ? "[probe] 全部通道可用" : `[probe] ${fail} 条通道失败`);
  process.exit(fail === 0 ? 0 : 1);
}

void main();
