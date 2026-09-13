/**
 * GitTok 全量建库启动器（2026-09-14 单线推进刀）。
 *
 * 职责：把「免费模型矩阵 + 密钥」在**运行时**组装进环境变量，再拉起生产线。
 *  1. 密钥只从 D:/AI/KEY/ 下的密钥文件读取，不落任何源码/配置字面量、不回显
 *     （只打印 key 前 5 字符指纹用于人工核对，符合 KEY 协议）。
 *  2. 矩阵（SCHED_HEAD_MODELS / SCHED_TAIL_MODELS）按**实际拿到的 key** 动态组装：
 *     有 key 的源才进矩阵（缺 key 的源不进 → 路由自然跳过，不会一路 401）。
 *  3. 每源参数纪律用 SCHED_PARAMS_* 注入（智谱 thinking disabled 走 provider 内置；
 *     魔搭 enable_thinking:false；OR 推理型 reasoning disabled + max_tokens 8192）。
 *  4. 额度（quotaTokens）按 B 会话实测日额折算，可用 SCHED_QUOTA_* 覆盖。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-fullbuild.ts              # 全量建库
 *   npx tsx scripts/gittok-fullbuild.ts --dry-run    # 只打印矩阵，不跑管道
 *   npx tsx scripts/gittok-fullbuild.ts --debug-keys # 附带密钥文件分节明细（仍只显指纹）
 */

import { spawnSync } from "node:child_process";
import { buildPlan } from "./gittok-fullbuild-lib.ts";

function main(): void {
  const dryRun = process.argv.includes("--dry-run");
  const { tail, head, env, missing } = buildPlan();

  // 矩阵：head 档留空（高档免费源待注册：z.ai / NVIDIA NIM / Cloudflare → 挂账带回栗子），
  // 路由的 allowHeadDegrade 会把头部批自动降级到 tail 档——生产不阻塞、不静默变付费。
  const headStr = process.env["SCHED_HEAD_MODELS"] ?? head.map((h) => h.entry).join(";");
  const tailStr = tail.map((t) => t.entry).join(";");
  env["SCHED_HEAD_MODELS"] = headStr;
  env["SCHED_TAIL_MODELS"] = tailStr;
  for (const t of tail) {
    if (t.paramsEnv) env[t.paramsEnv] = JSON.stringify(t.params);
  }
  // 锁死免费纪律：主源显式指向付费压舱石（矩阵外的编队通道），杜绝误用未知主源。
  if (env["BAILIAN_API_KEY"]) {
    env["LLM_PROVIDER"] = "bailian";
    env["BAILIAN_MODEL"] = "qwen3.7-flash";
  }

  console.log("[launcher] 调度矩阵：");
  console.log(`  HEAD: ${headStr || "(空——高档免费源待注册，头部批自动降级 tail)"}`);
  console.log(`  TAIL: ${tailStr}`);
  for (const t of tail) {
    console.log(`   - ${t.entry}  key=${t.keyFp}  ${t.note}`);
  }
  if (missing.length > 0) console.log(`  [缺口] ${missing.join(" / ")}`);

  if (dryRun) {
    console.log("[launcher] --dry-run：只打印矩阵，不跑管道。");
    return;
  }

  // 拉起生产线：环境变量透传（.env 里的 zhipu/OR 配置会被这里的值覆盖）
  const res = spawnSync("npx", ["tsx", "src/feed/index.ts"], {
    stdio: "inherit",
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
  });
  process.exit(res.status ?? 1);
}

main();
