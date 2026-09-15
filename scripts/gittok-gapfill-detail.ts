/**
 * 详情补写（detailCn 为空的存量卡）。
 *
 * 由来：不变量闸把「每张卡都有 detailCn」当硬线，实测有 3 张卡详情为空
 * （Tencent/Hippy、pdulvp/jellyfin-qnap、KudoAI/chatgpt.js）——用户点开这些卡看不到详情。
 * 本脚本只补这几张：用卡上已有的 summary/reason/desc/topics 生成 detailCn，原子写回。
 *
 * 这**不是** E8 的全文案重跑（那个要整库重生成、量大，另算时间账），只补空洞。
 *
 * 用法（零参数）：
 *   npx tsx scripts/gittok-gapfill-detail.ts
 */

import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { buildPlan, dropRetiredLanes } from "./gittok-fullbuild-lib.ts";
import { ScheduledLlmExecutor } from "../src/feed/executor.ts";

interface Card {
  repo: string;
  desc?: string;
  language?: string;
  topics?: string[];
  stars?: number;
  summaryCn?: string;
  reasonCn?: string;
  detailCn?: string;
  [k: string]: unknown;
}

const FEED = path.join(process.cwd(), "data", "feed.json");

function atomicWrite(file: string, text: string): void {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, file);
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} 超时 ${ms}ms`)), ms);
    p.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e: unknown) => {
        clearTimeout(timer);
        reject(e instanceof Error ? e : new Error(String(e)));
      },
    );
  });
}

function buildPrompt(c: Card): string {
  const topics = (c.topics ?? []).slice(0, 8).join(", ") || "无";
  return (
    `给下面这个 GitHub 项目写一段中文详情介绍（detail_cn）。\n\n` +
    `项目：${c.repo}\n` +
    `语言：${c.language ?? "未知"}｜${c.stars ?? 0} 星｜话题：${topics}\n` +
    `原始描述：${(c.desc ?? "无").slice(0, 300)}\n` +
    `一句话：${c.summaryCn ?? ""}\n` +
    `简介：${c.reasonCn ?? ""}\n\n` +
    `要求：500-800 字，分 3-5 段；说清它解决什么问题、核心亮点、怎么上手、适合谁用；` +
    `第一段直接说它是什么，从一个具体细节入手；面向第一次听说它的读者，用日常说法；` +
    `不要用①②③序号，不要贴代码块，不要重复上面已有的句子。\n` +
    `内容必须基于上述信息，不确定的细节不要编造。\n\n` +
    `只输出 JSON，不要任何其他文字：{"repo":"${c.repo}","detail_cn":"正文"}`
  );
}

function pickLane(): { executor: ScheduledLlmExecutor; key: string } {
  const { tail, env } = dropRetiredLanes(buildPlan());
  const merged: NodeJS.ProcessEnv = { ...process.env, ...env };
  for (const [k, v] of Object.entries(merged)) if (v !== undefined) process.env[k] = v;
  const specs = tail.map((t) => {
    const first = t.entry.indexOf(":");
    const last = t.entry.lastIndexOf(":");
    const tailPart = t.entry.slice(last + 1);
    const provider = t.entry.slice(0, first);
    const model = t.entry.slice(first + 1, /^\d+$/.test(tailPart) ? last : undefined);
    return { provider, model, keys: t.keys, extraParams: t.params, key: `${provider}:${model}` };
  });
  // ⛔ 不再挂订阅/付费通道（栗子 2026-09-15：GitTok 只允许免费模型）。
  // 免费档被限流时，本脚本会失败并把未补的卡列出来——等配额恢复再跑，不绕道付费。
  return { executor: new ScheduledLlmExecutor(specs), key: specs[0]?.key ?? "" };
}

async function main(): Promise<void> {
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const todo = cards.filter((c) => !c.detailCn || c.detailCn.trim().length === 0);
  console.log(`[detail-gapfill] 待补 ${todo.length} 张`);
  if (todo.length === 0) return;

  const { executor, key: firstKey } = pickLane();
  let done = 0;
  for (const card of todo) {
    let filled = false;
    for (const laneKey of [firstKey]) {
      const caller = executor.callerFor(laneKey);
      if (!caller) continue;
      try {
        const raw = await withTimeout(caller(buildPrompt(card), 8192), 300_000, `补写 ${card.repo}`);
        const s = raw.indexOf("{");
        const e = raw.lastIndexOf("}");
        if (s === -1 || e <= s) continue;
        const obj = JSON.parse(raw.slice(s, e + 1)) as { detail_cn?: string };
        const text = (obj.detail_cn ?? "").trim();
        if (text.length >= 200) {
          card.detailCn = text;
          atomicWrite(FEED, JSON.stringify(cards, null, 2));
          done++;
          filled = true;
          console.log(`  ✓ ${card.repo}（${text.length} 字）`);
          break;
        }
      } catch (err) {
        console.warn(`  ✗ ${laneKey} ${card.repo}: ${String(err).slice(0, 100)}`);
      }
    }
    if (!filled) console.warn(`  ! ${card.repo} 仍未补上`);
  }
  console.log(`[detail-gapfill] 完成：补上 ${done}/${todo.length} 张`);
}

main().catch((err) => {
  console.error("[detail-gapfill] 致命错误:", err);
  throw err;
});
