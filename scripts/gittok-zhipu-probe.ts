/**
 * 智谱双 key 逐一探活（2026-09-14）：401 报错要定位到具体账号（KEY 协议：零回显，只显指纹）。
 * 用法：npx tsx scripts/gittok-zhipu-probe.ts
 */

import { buildPlan, fp } from "./gittok-fullbuild-lib.ts";

const PROMPT = '只回一行 JSON：{"ok":true}';

async function main(): Promise<void> {
  const { env } = buildPlan();
  const raw = env["ZHIPU_API_KEY"] ?? "";
  const keys = raw.split(",").filter(Boolean);
  console.log(`[zhipu-probe] 共 ${keys.length} 个 key`);
  const { ZhipuProvider } = await import("../src/providers/zhipu.ts");
  for (const k of keys) {
    const p = new ZhipuProvider({ apiKey: k, model: "glm-4.7-flash" });
    try {
      const out = (await p.call(PROMPT, 64)).trim().slice(0, 80);
      console.log(`  ✓ ${fp(k)}: ${out.replace(/\s+/g, " ")}`);
    } catch (err) {
      console.log(`  ✗ ${fp(k)}: ${String(err).slice(0, 160)}`);
    }
  }
  // .env 里的 key 单独验（可能是另一把旧键）
  const dotenvKey = process.env["ZHIPU_API_KEY"] ?? "";
  if (dotenvKey && !keys.includes(dotenvKey)) {
    const p = new ZhipuProvider({ apiKey: dotenvKey, model: "glm-4.7-flash" });
    try {
      const out = (await p.call(PROMPT, 64)).trim().slice(0, 80);
      console.log(`  ✓ .env key ${fp(dotenvKey)}: ${out.replace(/\s+/g, " ")}`);
    } catch (err) {
      console.log(`  ✗ .env key ${fp(dotenvKey)}: ${String(err).slice(0, 160)}`);
    }
  }
}

void main();
