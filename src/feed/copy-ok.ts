/**
 * 单卡文案合格判定（COPY-08 呈现策略的判定入口）。
 *
 * 单一事实源：判据 100% 复用生产闸 `cardChecks`（src/feed/checks.ts），
 * 本文件只做字段映射，**不写任何一条自己的文案判据**。
 * 伪卡组装口径与 `scripts/gittok-copy-audit.ts`（G-01 报表）逐字段一致：
 * 卡上 `tags` 是 Tag 对象数组、LLM 域词在 `domainTags`——必须传 `domainTags`。
 *
 * 消费方：
 *  - web/vite.config.ts 构建期给列表卡打 `copyOk` 标（不进 data/feed.json）；
 *  - 前端推荐池按 `copyOk === false` 剔除（见 web/src/copy-gate.ts）。
 * 闸本身抛错按**不合格**计（与 G-01 报表同口径，宁可错杀不放过脏数据）。
 */

import { cardChecks } from "./checks.ts";
import type { ScoringResult } from "./types.ts";

/** data/feed.json 里一张卡上本模块用到的字段（其余忽略）。 */
export interface CopyOkCard {
  repo: string;
  zone?: string;
  funScore?: number;
  /** 构建产物可能缺键；缺按空数组处理（与 G-01 同）。 */
  domainTags?: string[];
  facts?: unknown[];
  summaryCn?: string;
  reasonCn?: string;
  detailCn?: string;
}

export function cardCopyOk(c: CopyOkCard): boolean {
  const pseudo = {
    repo: c.repo,
    aiDims: [],
    aiDim: "",
    aiScore: 0.5,
    zone: c.zone,
    funScore: c.funScore,
    tags: c.domainTags,
    facts: c.facts as ScoringResult["facts"],
    summaryCn: c.summaryCn,
    reasonCn: c.reasonCn,
    detailCn: c.detailCn || undefined,
  } as unknown as ScoringResult;
  try {
    return cardChecks(pseudo).fails.length === 0;
  } catch {
    return false;
  }
}
