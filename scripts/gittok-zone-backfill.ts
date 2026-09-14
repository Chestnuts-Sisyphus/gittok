/**
 * 内容分区回填（2026-09-14）：给存量旧卡补 `zone` / `funScore` / `domainTags`。
 *
 * 背景：标签分区 v2.2（四区 AI/资源/工具/创意）的前端已上线，但**存量卡是旧词表**
 * （category: ai/fun/tool/learning）→ 站点处于「新前端 + 旧数据」混合态（栗子 09-14 实测发现）。
 * 管道对缓存命中的存量卡「零重评」（历史铁律），所以旧卡不会自动获得 zone。
 *
 * 本脚本只做**判定字段回填**，不重跑全文案（省掉 2,428 次精评 ≈ 一周免费额度）：
 *   每批 N 张卡 → 用同一份「四问判定链」判 zone + fun_score + 领域词 → 回写 feed.json。
 *
 * 纪律：密钥走启动器同款注入（零回显）；判定失败**不写**（宁缺毋滥，宁可留旧值）；
 * 可续跑（已完成的不再判）；判定链措辞与生产 prompt 完全一致（不另造判据）。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-zone-backfill.ts              # 回填全部缺 zone 的卡
 *   npx tsx scripts/gittok-zone-backfill.ts --limit=200  # 只回填前 N 张（试跑）
 *   npx tsx scripts/gittok-zone-backfill.ts --dry-run    # 只统计不改盘
 */

import fs from "node:fs";
import "dotenv/config";
import { buildPlan } from "./gittok-fullbuild-lib.ts";
import { ScheduledLlmExecutor } from "../src/feed/executor.ts";
import { parseMatrix } from "../src/feed/scheduler.ts";

const FEED = "data/feed.json";
const BATCH = Number(process.env["ZONE_BATCH"] ?? 20);
/** 判定链（与 src/feed/prompts.ts L145 的生产措辞一致；不另造判据） */
const ZONE_RULES =
  "从 [AI, 资源, 工具, 创意] 中选 1 个。判定：人拿它是「学/看」（教程/论文/文档/数据集）→资源；" +
  "它靠智能干活（模型/推理/Agent/框架/AI应用）→AI；人拿它是「玩/创作」（游戏/脑洞/绘画/音乐/剪辑）→创意；" +
  "人拿它「干活」（效率/开发/数据库/自托管/skill）→工具。只选 1 个。";

interface Card {
  repo: string;
  desc?: string;
  stars?: number;
  language?: string;
  topics?: string[];
  summaryCn?: string;
  reasonCn?: string;
  zone?: string;
  funScore?: number;
  domainTags?: string[];
}

function buildPrompt(cards: Card[]): string {
  const items = cards
    .map((c, i) => {
      const gist = (c.summaryCn ?? c.reasonCn ?? c.desc ?? "").replace(/\s+/g, " ").slice(0, 160);
      return `${i + 1}. ${c.repo}｜${c.language ?? ""}｜${c.stars ?? 0}★｜${gist}`;
    })
    .join("\n");
  return (
    `给下面 ${cards.length} 个 GitHub 项目各判一个内容分区，并给 0-1 的「乐趣强度」和 3-6 个领域词。\n` +
    `分区判定链：${ZONE_RULES}\n` +
    `乐趣强度 fun_score：0=纯工具、1=极好玩（游戏/脑洞/创意玩具）。\n` +
    `领域词 tags：面向人可以看懂的领域词（如 推理引擎/AI Agent/绘画工具），3-6 个，不要泛词。\n\n` +
    `项目列表：\n${items}\n\n` +
    `只输出 JSON 数组，不要任何其他文字：\n` +
    `[{"repo":"owner/repo","zone":"AI","fun_score":0.2,"tags":["词1","词2","词3"]}]`
  );
}

interface Verdict {
  repo: string;
  zone: string;
  fun_score?: number;
  tags?: string[];
}

const ZONES = ["AI", "资源", "工具", "创意"];

/** 容错解析（复用管道同款思路：去代码块 + 摘数组） */
function parseVerdicts(raw: string): Verdict[] {
  let text = raw.trim().replace(/```(?:json)?/g, "").replace(/```/g, "");
  const s = text.indexOf("[");
  const e = text.lastIndexOf("]");
  if (s === -1 || e === -1 || e <= s) return [];
  text = text.slice(s, e + 1);
  try {
    const arr = JSON.parse(text) as Verdict[];
    return arr.filter((v) => v && typeof v.repo === "string" && ZONES.includes(v.zone));
  } catch {
    return [];
  }
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : Number.POSITIVE_INFINITY;

  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const todo = cards.filter((c) => !c.zone).slice(0, Number.isFinite(limit) ? limit : undefined);
  console.log(`[zone-backfill] 总卡 ${cards.length}，缺 zone ${cards.filter((c) => !c.zone).length}，本轮处理 ${todo.length}`);
  if (dryRun || todo.length === 0) return;

  // 执行层：与生产同构（免费矩阵优先）
  const { tail, env } = buildPlan();
  const merged: NodeJS.ProcessEnv = { ...process.env, ...env };
  for (const t of tail) if (t.paramsEnv) merged[t.paramsEnv] = JSON.stringify(t.params);
  for (const [k, v] of Object.entries(merged)) if (v !== undefined) process.env[k] = v;
  const matrix = parseMatrix({ ...process.env, SCHED_TAIL_MODELS: tail.map((t) => t.entry).join(";") });
  const executor = new ScheduledLlmExecutor(
    tail.map((t) => {
      const first = t.entry.indexOf(":");
      const last = t.entry.lastIndexOf(":");
      const tailPart = t.entry.slice(last + 1);
      const provider = t.entry.slice(0, first);
      const model = t.entry.slice(first + 1, /^\d+$/.test(tailPart) ? last : undefined);
      return { provider, model, keys: t.keys, extraParams: t.params };
    }),
  );
  void matrix;

  const byRepo = new Map(cards.map((c) => [c.repo, c] as const));
  let done = 0;
  let failed = 0;
  const persist = (): void => {
    fs.writeFileSync(FEED, JSON.stringify(cards, null, 2), "utf-8");
  };
  const key = tail[0]?.entry.replace(/:\d+$/, "") ?? "";
  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);
    // 通道可能被限流熔断（免费档常态）：等到解冻再试，而不是直接退出（迁移要跑完）
    let caller = executor.callerFor(key);
    for (let wait = 0; !caller && wait < 30; wait++) {
      console.log(`  [zone-backfill] 通道 ${key} 冷却中——等 30s 重试（第 ${wait + 1} 次）`);
      await new Promise((r) => setTimeout(r, 30_000));
      caller = executor.callerFor(key);
    }
    if (!caller) {
      console.error(`[zone-backfill] 通道长时间不可用（${key}）→ 停止（已回填 ${done}）`);
      break;
    }
    try {
      const raw = await caller(buildPrompt(batch), 4096);
      const verdicts = parseVerdicts(raw);
      for (const v of verdicts) {
        const card = byRepo.get(v.repo);
        if (!card) continue;
        card.zone = v.zone;
        if (typeof v.fun_score === "number") card.funScore = Math.max(0, Math.min(1, v.fun_score));
        if (Array.isArray(v.tags) && v.tags.length >= 3) card.domainTags = v.tags.slice(0, 6);
        done++;
      }
      failed += batch.length - verdicts.length;
      console.log(
        `  [zone-backfill] ${Math.min(i + BATCH, todo.length)}/${todo.length}：本批 ${verdicts.length}/${batch.length} 判定成功（累计 ${done}）`,
      );
      if (done % (BATCH * 10) === 0) persist(); // 每 ~200 张落盘一次（中断不丢已回填）
    } catch (err) {
      failed += batch.length;
      console.error(`  [zone-backfill] 批失败（${batch.length} 张跳过，不写盘）: ${String(err).slice(0, 120)}`);
    }
  }

  if (done > 0) {
    persist();
    console.log(`[zone-backfill] 写回 ${FEED}：回填 ${done} 张，失败/跳过 ${failed} 张`);
  } else {
    console.log("[zone-backfill] 无有效回填，未写盘");
  }
}

void main();
