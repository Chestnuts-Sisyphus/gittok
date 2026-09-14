/**
 * 卡片级不变量闸（D2，2026-09-14）。
 *
 * 由来：本会话被「字段无声消失」坑了两次——zone 覆盖率从 100% 掉到 0.2%（缓存白名单漏字段，
 * 管道重建整片覆盖），以及 funScore/domainKey 在新字段上线后靠人肉发现「线上没数据」。
 * 结论：**不能靠人眼发现，得让机器在提交前拦下来**。
 *
 * 闸的取值原则：
 *  - **结构缺失 = 硬失败**（该有的字段没有 → 拒绝提交），这是「字段无声消失」的直接拦截面；
 *  - **内容质量 = 告警不拦截**（summaryCn 字数、detail 段数这类由 prompt 约束，存量卡历史欠账
 *    不该阻塞整条管道——记 warning 走报告，不阻断）。
 *
 * 用法：
 *   const r = checkCardInvariants(cards);
 *   if (!r.ok) throw new Error(...)   // 管道在写盘前自断
 */

import { ZONES, FUN_DIMS } from "./taxonomy.ts";

/**
 * 硬性字段：**管道每轮必然产出**的字段（缺 = 管道坏了 / 缓存白名单漏了 → 拒绝提交）。
 * 取值原则是「只收管道自己保证的」——把 source API 可能为空的字段（desc/topics/language）
 * 放进这里会让闸在第一天就红，闸一旦常红就没人看，等于没有闸。
 */
export const REQUIRED_FIELDS = [
  "repo",
  "owner",
  "name",
  "summaryCn",
  "reasonCn",
  "detailCn",
  "stars",
  "aiScore",
  "zone",
  "funScore",
  "tags",
  "url",
  "ts",
] as const;

/** 弱字段：允许缺（数据源没给 / 存量卡历史欠账），缺了只告警。
 *  aiDims/aiDim 也在这里：它们是早期 LLM 分类产物，有 12 张存量卡从未带过——
 *  那属于历史欠账，不是「这一轮把字段弄丢了」（后者由 feed.prev.json 差分闸抓）。 */
export const SOFT_FIELDS = [
  "desc",
  "language",
  "topics",
  "aiDims",
  "aiDim",
  "domainTags",
  "zoneSource",
  "funScoreSource",
] as const;

/** 新增字段（v3 判据）——一旦写了就必须合法；未写不算错（存量卡逐轮补齐）。 */
export const OPTIONAL_FIELDS = [
  "funDims",
  "legacyZone",
  "legacyFunScore",
  "zoneReason",
  "funReason",
] as const;

export interface InvariantIssue {
  repo: string;
  field: string;
  why: string;
  /** hard = 拒绝提交；warn = 只记不拦 */
  level: "hard" | "warn";
}

export interface InvariantReport {
  ok: boolean;
  total: number;
  issues: InvariantIssue[];
  hardCount: number;
  warnCount: number;
  /** 每个字段的覆盖率（缺字段诊断用） */
  coverage: Record<string, number>;
}

function isEmpty(v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (typeof v === "string") return v.trim().length === 0;
  if (typeof v === "number") return !Number.isFinite(v);
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

/**
 * 校验一整个卡库。
 * @param cards 待提交的卡片数组
 * @param opts.requireNewFields 是否要求 v3 新字段（全库重判完成后由调用方置 true）
 */
export function checkCardInvariants(
  cards: Record<string, unknown>[],
  opts: { requireNewFields?: boolean } = {},
): InvariantReport {
  const issues: InvariantIssue[] = [];
  const coverage: Record<string, number> = {};
  const total = cards.length;

  const fields = [...REQUIRED_FIELDS, ...(opts.requireNewFields ? OPTIONAL_FIELDS : [])];
  for (const f of fields) coverage[f] = 0;

  const add = (repo: string, field: string, why: string, level: "hard" | "warn" = "hard"): void => {
    issues.push({ repo, field, why, level });
  };

  const seen = new Set<string>();
  for (const c of cards) {
    const repo = typeof c["repo"] === "string" ? (c["repo"] as string) : "(缺 repo)";
    if (seen.has(repo)) add(repo, "repo", "重复卡（同一 repo 出现两次）");
    seen.add(repo);

    for (const f of fields) {
      if (!isEmpty(c[f])) coverage[f] = (coverage[f] ?? 0) + 1;
      else add(repo, f, "字段缺失或为空（管道重建会整片覆盖，见 loadExistingScores 白名单）");
    }
    for (const f of SOFT_FIELDS) {
      if (!isEmpty(c[f])) coverage[f] = (coverage[f] ?? 0) + 1;
      else add(repo, f, "弱字段缺失（数据源未提供或存量欠账；只告警）", "warn");
    }

    // 枚举与取值域
    const zone = c["zone"];
    if (zone !== undefined && !(ZONES as readonly string[]).includes(String(zone))) {
      add(repo, "zone", `不在四区枚举：${String(zone)}`);
    }
    const legacyZone = c["legacyZone"];
    if (legacyZone !== undefined && !(ZONES as readonly string[]).includes(String(legacyZone))) {
      add(repo, "legacyZone", `不在四区枚举：${String(legacyZone)}`);
    }
    const fun = c["funScore"];
    if (typeof fun === "number" && (fun < 0 || fun > 1)) add(repo, "funScore", `越界：${fun}`);
    const legacyFun = c["legacyFunScore"];
    if (typeof legacyFun === "number" && (legacyFun < 0 || legacyFun > 1)) {
      add(repo, "legacyFunScore", `越界：${legacyFun}`);
    }
    const dims = c["funDims"];
    if (dims !== undefined) {
      if (typeof dims !== "object" || dims === null || Array.isArray(dims)) {
        add(repo, "funDims", "不是对象");
      } else {
        const d = dims as Record<string, unknown>;
        for (const spec of FUN_DIMS) {
          const v = d[spec.key];
          if (typeof v !== "number" || !Number.isFinite(v) || v < 0 || v > 1) {
            add(repo, "funDims", `六维 ${spec.key} 缺失或越界：${String(v)}`);
          }
        }
      }
    }
    const tags = c["domainTags"];
    if (Array.isArray(tags) && (tags.length < 3 || tags.length > 6)) {
      add(repo, "domainTags", `领域词数量 ${tags.length} 不在 3-6`);
    }
    const summary = c["summaryCn"];
    if (typeof summary === "string" && summary.length > 0 && (summary.length < 20 || summary.length > 35)) {
      // 内容质量线：告警不拦截（存量卡有历史欠账，E8 全文案重跑统一清）
      add(repo, "summaryCn", `字数 ${summary.length} 不在 20-35（内容质量线，不拦提交）`, "warn");
    }
  }

  const hardCount = issues.filter((i) => i.level === "hard").length;
  const warnCount = issues.length - hardCount;
  return { ok: hardCount === 0, total, issues, hardCount, warnCount, coverage };
}

/**
 * 字段回退检查（**最强的一道**，直接对着「字段无声消失」那次事故设计）：
 * 逐 repo 比对新旧两版 feed.json，凡是「上一版有、这一版没了」的字段一律硬失败。
 *
 * 为什么单靠「必备字段清单」不够：zone 事故里字段清单是完整的（zone 本来就在白名单里），
 * 问题是**某一轮重建后值丢了**。只有差分能看见这件事。
 *
 * @param prev 上一版卡片（通常是磁盘上的 feed.json）
 * @param next 本轮将提交的卡片
 */
export function checkFieldRegression(
  prev: Record<string, unknown>[],
  next: Record<string, unknown>[],
): InvariantIssue[] {
  const issues: InvariantIssue[] = [];
  const prevByRepo = new Map<string, Record<string, unknown>>();
  for (const c of prev) {
    const r = c["repo"];
    if (typeof r === "string") prevByRepo.set(r, c);
  }
  const watched = [...REQUIRED_FIELDS, ...SOFT_FIELDS, ...OPTIONAL_FIELDS];
  for (const c of next) {
    const repo = typeof c["repo"] === "string" ? (c["repo"] as string) : "(缺 repo)";
    const before = prevByRepo.get(repo);
    if (!before) continue; // 新卡没有上一版可比
    for (const f of watched) {
      if (!isEmpty(before[f]) && isEmpty(c[f])) {
        issues.push({
          repo,
          field: f,
          why: `上一版有值、本轮丢了（缓存白名单漏字段的典型症状）`,
          level: "hard",
        });
      }
    }
  }
  return issues;
}

/** 人类可读报告（脚本与 CI 日志共用）。 */ export function formatInvariantReport(
  r: InvariantReport,
): string {
  const lines: string[] = [];
  lines.push(`卡片级不变量闸：${r.total} 张卡｜硬失败 ${r.hardCount}｜告警 ${r.warnCount}`);
  const missing = Object.entries(r.coverage)
    .filter(([, n]) => n < r.total)
    .sort((a, b) => a[1] - b[1]);
  if (missing.length > 0) {
    lines.push("字段覆盖不足：");
    for (const [f, n] of missing) lines.push(`  ${f}: ${n}/${r.total}`);
  }
  const shown = r.issues.filter((i) => i.level === "hard").slice(0, 20);
  for (const i of shown) lines.push(`  ✗ ${i.repo} [${i.field}] ${i.why}`);
  if (r.hardCount > shown.length) lines.push(`  …还有 ${r.hardCount - shown.length} 条硬失败`);
  return lines.join("\n");
}
