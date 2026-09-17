#!/usr/bin/env node
/**
 * GitTok skill 冒烟运行器：让**真实 LLM agent 会话**按 SKILL.md 完成一次「今日热点讲解」。
 *
 * 形态：最小 agent loop —— SKILL.md 全文作 system 指令，模型可调用 `gittok_hotspots`
 * （即本目录的 hotspots.mjs）取数，然后按 skill 的输出格式写讲解；全过程落盘留证。
 *
 * 只用免费通道（默认智谱 GLM-4.7-Flash 免费档）；key 只从环境变量读，不落盘、不打印。
 * 用法：
 *   GITTOK_SKILL_API_KEY=... node scripts/run-skill.mjs [--date YYYY-MM-DD] [--model glm-4.7-flash]
 */

import { spawn } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.join(__dirname, "..");
const SKILL_MD = path.join(SKILL_DIR, "SKILL.md");
const HOTSPOTS = path.join(__dirname, "hotspots.mjs");
const OUT_DIR = path.join(SKILL_DIR, "test-output");

const BASE_URL = process.env["GITTOK_SKILL_BASE_URL"] ?? "https://open.bigmodel.cn/api/paas/v4";
const API_KEY = process.env["GITTOK_SKILL_API_KEY"];
const MODEL = process.env["GITTOK_SKILL_MODEL"] ?? "glm-4.7-flash";
const MAX_STEPS = 4;

const argv = process.argv.slice(2);
const dateArg = argv.includes("--date") ? argv[argv.indexOf("--date") + 1] : null;

if (!API_KEY) {
  process.stderr.write("[run-skill] 缺少 GITTOK_SKILL_API_KEY（只从环境变量读）\n");
  process.exit(2);
}

function runHotspots({ date, limit } = {}) {
  return new Promise((resolve) => {
    const args = [HOTSPOTS, "--limit", String(limit ?? 12)];
    if (date) args.push("--date", date);
    const child = spawn(process.execPath, args, { cwd: SKILL_DIR });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (code) => {
      resolve(code === 0 ? out.trim() : `ERROR(${code}): ${err.trim() || out.trim()}`);
    });
  });
}

const TOOLS = [
  {
    type: "function",
    function: {
      name: "gittok_hotspots",
      description:
        "拉取 GitTok 今日热点包（当天的策展日报摘要 + 当日入库卡片，含 stars/starGrowth/heatScore/摘要）。返回 Markdown 文本。",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string", description: "YYYY-MM-DD；不传=今天" },
          limit: { type: "number", description: "返回卡片条数，默认 12" },
        },
      },
    },
  },
];

async function chat(messages) {
  const body = {
    model: MODEL,
    messages,
    tools: TOOLS,
    tool_choice: "auto",
    temperature: 0.4,
    max_tokens: 2048,
  };
  let lastErr = null;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { authorization: `Bearer ${API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000),
    });
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error(`非 JSON 响应（HTTP ${res.status}）：${text.slice(0, 200)}`);
    }
    if (json.error) {
      lastErr = new Error(`${json.error.code}: ${json.error.message}`);
      // 1305=模型访问量过大 / 429=限流 → 退避重试
      if ([1305, 429, 1113].includes(json.error.code) && attempt < 4) {
        await new Promise((r) => setTimeout(r, attempt * 4000));
        continue;
      }
      throw lastErr;
    }
    return json;
  }
  throw lastErr ?? new Error("unknown");
}

async function main() {
  const skillText = await readFile(SKILL_MD, "utf8");
  const transcript = [];
  const log = (s) => {
    transcript.push(s);
    process.stdout.write(`${s}\n`);
  };

  log(`# GitTok skill 运行留证`);
  log(`- 时间：${new Date().toISOString()}`);
  log(`- 运行器：scripts/run-skill.mjs（最小 agent loop，工具调用）`);
  log(`- 模型：${MODEL}（${BASE_URL}，免费通道）`);
  log(`- skill：SKILL.md（${skillText.length} 字符）+ scripts/hotspots.mjs`);
  log("");

  const messages = [
    { role: "system", content: skillText },
    {
      role: "user",
      content:
        (dateArg ? `读 GitTok ${dateArg} 的热点并讲解。` : "读 GitTok 今日热点并讲解。") +
        "先取数（可以调用工具），再严格按 skill 的输出格式作答。",
    },
  ];

  let final = null;
  for (let step = 1; step <= MAX_STEPS; step++) {
    log(`## step ${step}: 调模型`);
    const resp = await chat(messages);
    const msg = resp.choices?.[0]?.message;
    if (!msg) throw new Error(`无 message：${JSON.stringify(resp).slice(0, 300)}`);
    messages.push(msg);

    const calls = msg.tool_calls ?? [];
    if (calls.length === 0) {
      final = msg.content ?? "";
      log(`（模型直接给出最终回答，未再调工具）`);
      break;
    }
    for (const call of calls) {
      const name = call.function?.name;
      let args = {};
      try {
        args = JSON.parse(call.function?.arguments ?? "{}");
      } catch {
        args = {};
      }
      log(`- 工具调用：\`${name}(${JSON.stringify(args)})\``);
      let result;
      if (name === "gittok_hotspots") {
        result = await runHotspots(args);
        const lines = result.split("\n").length;
        log(`- 工具返回：${lines} 行 / ${result.length} 字符`);
      } else {
        result = `ERROR: 未知工具 ${name}`;
      }
      messages.push({ role: "tool", tool_call_id: call.id, content: result });
      // 留证：把热点包原文也存进 transcript（截断）
      transcript.push("<details><summary>工具返回原文（截断 4000 字符）</summary>\n");
      transcript.push("```markdown");
      transcript.push(result.slice(0, 4000));
      transcript.push("```");
      transcript.push("</details>\n");
    }
  }

  log("");
  log("## 最终讲解（模型输出）");
  log("");
  log(final ?? "（达到最大步数仍未给出最终回答）");

  await mkdir(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outFile = path.join(OUT_DIR, `skill-run-${stamp}.md`);
  await writeFile(outFile, `${transcript.join("\n")}\n`, "utf8");
  process.stdout.write(`\n[run-skill] 留证已写入 ${outFile}\n`);
  if (!final) process.exitCode = 1;
}

main().catch((err) => {
  process.stderr.write(`[run-skill] ${err.message}\n`);
  process.exit(1);
});
