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
import { matrixKeysEnvKey } from "../src/feed/executor.ts";

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
    // 多 key 池：{NAME}_API_KEY 是逗号串（供编队 worker 轮转），执行层按通道拆成独立实例用
    if (t.keys && t.keys.length > 1) {
      const first = t.entry.indexOf(":");
      const entryTail = t.entry.slice(t.entry.lastIndexOf(":") + 1);
      const model = t.entry.slice(first + 1, /^\d+$/.test(entryTail) ? t.entry.lastIndexOf(":") : undefined);
      env[matrixKeysEnvKey(t.entry.slice(0, first), model)] = t.keys.join(",");
    }
  }
  // 锁死免费纪律：主源显式指向付费压舱石（矩阵外的编队通道），杜绝误用未知主源。
  if (env["BAILIAN_API_KEY"]) {
    env["LLM_PROVIDER"] = "bailian";
    env["BAILIAN_MODEL"] = "qwen3.7-flash";
  }

  // 诊断（零回显：只显前 5 字符指纹）：确认注入到子进程的 key 与实际期望一致
  if (process.argv.includes("--debug-keys")) {
    for (const name of ["ZHIPU_API_KEY", "MODELSCOPE_API_KEY", "OPENROUTER_API_KEY", "BAILIAN_API_KEY"]) {
      const v = env[name];
      console.log(
        `[launcher/debug] ${name} = ${
          v
            ? v
                .split(",")
                .map((k) => `${k.slice(0, 5)}…(${k.length})`)
                .join(" + ")
            : "(未注入)"
        }`,
      );
    }
    for (const [name, v] of Object.entries(env)) {
      if (!name.startsWith("SCHED_KEYS_")) continue;
      console.log(
        `[launcher/debug] ${name} = ${(v ?? "")
          .split(",")
          .map((k) => `${k.slice(0, 5)}…(${k.length})`)
          .join(" + ")}`,
      );
    }
    const pats = (env["EXTRA_GITHUB_PATS"] ?? "").split(",").filter(Boolean);
    console.log(
      `[launcher/debug] EXTRA_GITHUB_PATS = ${pats.length} 个（含 .env 主 token 共 ${pats.length + 1} 个轮转）`,
    );
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
