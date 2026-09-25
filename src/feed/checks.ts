/**
 * 质量闸链 G1-G9（环节三 v6 试产脚本 run_trial_v6.py 移植为 TS，2026-09-13）。
 *
 * 闸链（每卡 G1-G8；G9 批内单独跑）：
 *  G1 长度（P0a 铁律） G2 开头黑名单 G3 摘要vs解读首段重复 G4 覆盖度（3-5 段+覆盖安装+禁代码块）
 *  G5 序号模板 G6 时效词 G8 推广词 G9 批内开头 LCS（stage2.checkBatch，≥6 字带反馈单卡重评）
 *  + 调度器合法性闸（validateScoringResult：zone 枚举/fun_score 范围/tags 数量/domain_key 派生/facts 预算/G-source）
 *
 * 纪律：不合格卡不上站（含装配兜底掩盖——兜底掩盖是用户点名的问题）；黑词进闸不进 prompt。
 */

import type { ScoringResult } from "./types.ts";
import { validateScoringResult } from "./prompts.ts";
import { SUMMARY_MIN, SUMMARY_MAX, REASON_MIN, REASON_MAX } from "./taxonomy.ts";
import { checkG6Time, checkG8Promo } from "./stage1.ts";
import { longestCommonRun } from "./stage2.ts";

// ---------------------------------------------------------------------------
// 长度工具（P0a 铁律）
// ---------------------------------------------------------------------------

/** 中文字符串等效宽度：全角（汉字/CJK 标点/全角符号）算 1，其余（半角）算 0.5。 */
export function effLen(s: string): number {
  let w = 0;
  for (const ch of s) {
    w += /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/.test(ch) ? 1 : 0.5;
  }
  return w;
}

// ---------------------------------------------------------------------------
// G2 开头黑名单 / G5 模板痕迹 / G3 重复 / G4 覆盖度
// ---------------------------------------------------------------------------

const OPENING_BLACKLIST =
  /^(想象一下|你是否曾经|你是否|你有没有想过|你有没有|在这个.{0,8}(时代|社会|年代)|简单来说|众所周知|这玩意)/;
const TEMPLATE_MARKS = /[①②③④⑤]|第[一二三四五]段[：:]/;
const DUP_THRESHOLD = 12; // 摘要 vs 解读首段最长公共连续字串上限
const INSTALL_MARK = /安装|pip|npm|brew|clone|克隆|下载|运行|命令|install|usage|获取安装/i;
const CODE_BLOCK = /```|^\s{2,}\S.*\n\s{2,}\S|\b(import|from)\s+\w+\s*$|^\s*\$?\s*(pip|npm|brew|git)\s/im;

export interface GateFails {
  ok: boolean;
  fails: string[];
}

/**
 * detail 自身合格（兜底前置条件）：500-800 字 / 3-5 段 / 无黑词开头 / 无代码块。
 * 语义：detail 是合格 LLM 长文时，从它截取 reason/summary 是「复用合格内容」；
 * 反之（detail 异常短/黑词开头）兜底会掩盖不合格——宁缺毋滥，不可用。
 */
export function detailQualified(detail: string): boolean {
  const d = detail ?? "";
  if (d.length < 500 || d.length > 900) return false;
  const paras = d
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (paras.length < 3 || paras.length > 5) return false;
  const first = paras[0] ?? "";
  if (first.match(OPENING_BLACKLIST)) return false;
  if (CODE_BLOCK.test(d)) return false;
  return true;
}

/**
 * 单卡 G1-G8（不含 G9 批内）。返回 (是否全过, 失败项列表)。
 * 调度器合法性闸（zone/fun_score/tags/facts）并入此处——不合格卡不上站。
 */
export function cardChecks(sc: ScoringResult, doc?: string): GateFails {
  const s = sc.summaryCn ?? "";
  const r = sc.reasonCn ?? "";
  const d = sc.detailCn ?? "";
  const fails: string[] = [];

  // G1 长度（P0a + 站点铁律）
  // 摘要：taxonomy SUMMARY_MIN/MAX + String.length（五轮闭环）。
  // 理由：taxonomy REASON_MIN/MAX + String.length（六轮闭环）。
  // 2026-09-25 六轮溯源：提示词早写「少于 100 或多于 150 都不合格」，但本处原先只判
  // `effLen(r) < 100`——**上限从未检过** ⇒ 全库 518 张 >150 漏出去；卡宽收到 793 后
  // 每行 53 汉字 × 3 行 = 容量 159，于是 43 张露出省略号。现与提示词同侧同值。
  if (!(s.length >= SUMMARY_MIN && s.length <= SUMMARY_MAX)) {
    fails.push(`一句话描述 ${s.length} 字（硬性要求 ${SUMMARY_MIN}-${SUMMARY_MAX} 汉字）`);
  }
  if (!(r.length >= REASON_MIN && r.length <= REASON_MAX)) {
    fails.push(`简要介绍 ${r.length} 字（硬性要求 ${REASON_MIN}-${REASON_MAX} 汉字）`);
  }
  // ⚠ G1-b 断句收尾（九轮 T4）**暂不进本闸**——两步走的第一步：
  //   口径真源＝`taxonomy.endsWithSentenceEnd`；提示词已加硬性要求；库侧 `card-invariants` 记 **warn**；
  //   写回闸（`scripts/gittok-recopy.ts` 的 gateOf）**先硬**拦住新写的；本闸（生产闸）等存量清完再升。
  //   为什么不能现在就硬：本闸被 `src/feed/copy-ok.ts` **100% 复用**去打建站期的 `copyOk` 标
  //   ⇒ 一硬就会把「只因断句不合格」的 **296 张**（实测 `npx tsx scripts/gittok-reason-end-impact.ts`）
  //   一次性剔出推荐池（池子 1034 → 738）。那是用「少 296 张卡」去换「结尾一个标点」，
  //   存量还没清就先把内容拿走，不符合〇块 13 的代价序（先加行/先补内容，再收版式）。
  //   升级条件：`npx tsx scripts/gittok-reason-end-audit.ts --strict` 转绿（违约 0 或只剩 22 张被上限截的）。
  if (d.length < 500) fails.push(`深度解读 ${d.length} 字（硬性要求 500-800 字）`);
  else if (d.length > 900) fails.push(`深度解读 ${d.length} 字（超过 800 字上限，收一收）`);

  // G2 开头黑名单（解读第一段）
  const firstPara = d.trim() ? d.trim().split(/\n\n+/)[0]! : "";
  const opening = firstPara.match(OPENING_BLACKLIST);
  if (opening) fails.push(`深度解读开头用了套路话「${firstPara.slice(0, 8)}…」（禁止套话开头）`);

  // G3 摘要 vs 解读首段重复
  if (longestCommonRun(s, firstPara)[0] >= DUP_THRESHOLD) {
    fails.push("一句话描述与深度解读开头重复（最长重复片段过长）");
  }

  // G4 覆盖度：3-5 段 + 覆盖「是什么/怎么上手」+ 禁代码块
  const paras = d
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (paras.length < 3 || paras.length > 5) fails.push(`深度解读 ${paras.length} 段（要求 3-5 段）`);
  if (!INSTALL_MARK.test(d)) fails.push("未见安装/上手内容（必须覆盖怎么上手）");
  if (CODE_BLOCK.test(d)) fails.push("含代码块或多行命令示例（禁止，用一句普通的话说明怎么用）");

  // G5 序号模板
  if (TEMPLATE_MARKS.test(d)) fails.push("深度解读含序号或「第X段」模板痕迹（禁止）");

  // G6 时效词
  const g6 = checkG6Time(`${s}\n${r}\n${d}`);
  if (g6.length > 0) fails.push(`含时效断言「${g6[0]}」（星数/最近+突破类，禁止）`);

  // G8 推广词
  const g8 = checkG8Promo(`${s}\n${r}\n${d}`);
  if (g8.length > 0) fails.push(`含推广词「${g8[0]}」（禁止）`);

  // 调度器合法性闸（zone/fun_score/tags/domain_key/facts/G-source）
  const legal = validateScoringResult(sc, doc);
  fails.push(...legal);

  return { ok: fails.length === 0, fails };
}
