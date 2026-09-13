/**
 * 付费压舱石（百炼 qwen3.7-flash）通道探针：验证 PAID-LLM.txt 里的 sk-ws- 键可用。
 * 用法：npx tsx scripts/gittok-bailian-probe.ts（零回显：只显前 5 字符指纹）
 */

import { buildPlan, fp } from "./gittok-fullbuild-lib.ts";

const PROMPT = '只回一行 JSON，不要任何其他文字：{"ok":true,"n":7}';

async function main(): Promise<void> {
  const { env } = buildPlan();
  const key = env["BAILIAN_API_KEY"] ?? "";
  if (!key) {
    console.log("[bailian-probe] 未找到百炼 key");
    process.exit(1);
  }
  const { BailianProvider } = await import("../src/providers/bailian.ts");
  const p = new BailianProvider({ apiKey: key, model: env["BAILIAN_MODEL"] ?? "qwen3.7-flash" });
  const t0 = Date.now();
  try {
    const out = (await p.call(PROMPT, 64)).trim().slice(0, 100);
    console.log(`  ✓ ${fp(key)} (${Date.now() - t0}ms): ${out.replace(/\s+/g, " ")}`);
  } catch (err) {
    console.log(`  ✗ ${fp(key)} (${Date.now() - t0}ms): ${String(err).slice(0, 200)}`);
    process.exit(1);
  }
}

void main();
