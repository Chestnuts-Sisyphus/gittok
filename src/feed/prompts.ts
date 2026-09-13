/**
 * 开源版抖音信息流 — LLM prompt 构建与结果解析（生产定版 2026-09-13）。
 *
 * 定版内容（环节三 v6 + 千人千面 v4 + 标签分区 v2.2 信号字段，全量前置接线）：
 *  1. v6：无示例内容驱动 / 覆盖度自由（detail 3-5 段）/ summary 去毒 / reason 读者视角 /
 *     JSON 骨架（无文风示例）/ zone 字段（四区判定链）
 *  2. 千人千面 v4：facts 两阶段（claim 独立断言 + source 原样引用）/ 主线深挖 / 首段具体事实指令强化
 *  3. 标签分区 v2.2 信号：zone（内容分区）/ fun_score（乐趣强度 0-1）/ tags（自由领域词 3-6 个）
 *  4. 调度器合法性闸：validateScoringResult（zone 枚举 / fun_score 范围 / tags 数量 / domain_key 派生 / facts 预算）
 *  5. G-source 溯源硬闸（source 字面存在 + claim≠source）+ 锚点一致观察（遥测，不进硬闸）
 *
 * 纪律：qwen 系 enable_thinking=false；不合格卡不上站；黑词进闸不进 prompt。
 */

import type { Fact, RepoForScoring, ScoringResult } from "./types.ts";
import { buildInputBlock } from "./stage1.ts";

/** AI 维度分类候选（扩展为约 28 个精细标签，覆盖 AI/工具/学习/好玩）。
 *  导出：质量对照脚本（scripts/llm-quality-test.mts）用同一份清单校验维度合法性。 */
export const AI_DIMS = [
  // AI 基础设施
  "AI基础设施",
  "推理引擎",
  "向量数据库",
  "模型部署",
  // AI Agent
  "AI Agent",
  "多模态Agent",
  "工具调用",
  // AI 应用
  "AI应用",
  "代码助手",
  "AI搜索",
  "AI写作",
  // 模型与训练
  "模型与训练",
  "大语言模型",
  "微调",
  "提示工程",
  // RAG 与知识
  "RAG与知识",
  "知识图谱",
  "文档理解",
  // 非AI-好玩
  "非AI-好玩",
  "游戏",
  "创意工具",
  "可视化",
  // 非AI-实用
  "非AI-实用",
  "开发者工具",
  "效率工具",
  "安全工具",
  // 学习资源
  "学习资源",
  "教程",
  "论文",
];

/** 内容分区四区枚举（标签分区 v2.2；调度器合法性闸校验 zone 用） */
export const ZONES = ["AI", "资源", "工具", "创意"] as const;
export type Zone = (typeof ZONES)[number];

/** 批次最大 token（全文案批；千人千面 facts 使单卡输出略增，保持 8192 下限） */
export const BATCH_MAX_TOKENS = 8192;

// ---------------------------------------------------------------------------
// 输入块（stage1 格式）：有 README 时用输入块（元数据+定界文档+免疫），无 README 降级一行式
// ---------------------------------------------------------------------------

function buildProjectBlock(repos: RepoForScoring[]): string {
  return repos
    .map((r, i) => {
      if (r.readme) {
        const meta = {
          repo: r.repo,
          language: r.language,
          created_at: r.createdAt,
          topics: r.topics,
          stars: r.stars,
        };
        return `### 项目 ${i + 1}\n${buildInputBlock(meta, r.readme)}`;
      }
      const topics = r.topics.length ? r.topics.slice(0, 8).join(", ") : "无";
      const desc = (r.description || "无描述").slice(0, 200);
      return `${i + 1}. ${r.repo} — ${desc} | ⭐${r.stars} | 语言: ${r.language || "未知"} | topics: ${topics}`;
    })
    .join("\n\n");
}

// ---------------------------------------------------------------------------
// 字段规格（v6 D2/D3/D6 + zone + fun_score + tags + facts）
// ---------------------------------------------------------------------------

/** detail 覆盖度自由（D3：五段固定 → 3-5 段内容驱动；禁代码块；去角度词） */
const DETAIL_SPEC =
  '"detail_cn": 详情介绍，500-800 字，分 3-5 段（内容扎实写 4-5 段，内容较少写 3-4 段，段数由内容决定，不设固定模板）。' +
  "每段都要有实质内容，不要泛泛而谈。必须覆盖：这个项目解决什么问题、核心亮点、怎么安装和上手使用、适合什么人使用。" +
  "内容必须来自该项目的资料，不许编造；安装命令必须来自参考文档，文档里没有就写「从项目仓库获取安装方式」；" +
  "怎么安装上手用一句普通的话说明白，不要贴代码块或多行命令示例。" +
  "第一段直接说这个项目是什么、解决什么问题，从一个来自资料的具体细节入手；同一批不同项目的第一段切入点必须互不相同。" +
  "面向第一次听说它的读者写，用日常的说法；不要用①②③等序号编号，不要重复 summary_cn 和 reason_cn 已有内容。";

/** 千人千面要求段（D8 强化版：首段第一句具体事实/第二句大白话） */
const QIANREN_SPEC =
  "\n\n# 千人千面要求\n" +
  "第一步：从项目自述参考文档里找出 3-5 条独有事实——这个项目区别于其他同类项目的具体细节，" +
  "不要写任何同类项目都有的泛泛描述。每条事实写成两个字段：\n" +
  "- claim：你自己的归纳断言，不超过 40 个汉字，不得与 source 字面相同，不得整句照抄参考文档；\n" +
  "- source：从参考文档原样复制的一句话证据（含关键数字或专名的原句，不超过 80 个汉字，可在句号处截断）；\n" +
  "整个 facts 数组（所有 claim 与 source 合计）不超过 240 个汉字，装不下就如实写 1-2 条，不要硬凑。\n" +
  "第二步：从 facts 里选信息量最高的一条（最具体、数字专名最实在的那条）作为全文主线，围绕它深挖展开；" +
  "其余 facts 只作素材自然融入文中，禁止把事实逐条列成清单。\n" +
  "每段先写具体事实（来自 source 的可查证细节），再用日常话说清这个事实意味着什么。\n" +
  "第一段第一句必须直接陈述一个来自 source 的具体事实（一个数字、专名或具体行为），" +
  "第二句用大白话解释这个事实意味着什么；不允许用「XX 是一款…」这种概括句开头。";

/** JSON 骨架（D4：完整示例 → 结构占位，无文风） */
const JSON_SKELETON =
  "# 输出格式\n" +
  "只返回一个 JSON 数组，不要任何其他文字、不要 markdown 代码块标记。JSON 结构如下（值仅为占位示意）：\n" +
  '[{"repo":"owner/repo","zone":"工具","ai_dims":["标签1","标签2"],"ai_score":0.5,"fun_score":0.3,' +
  '"tags":["领域词1","领域词2","领域词3"],"facts":[{"claim":"一句话独有事实","source":"参考文档原句证据"}],' +
  '"summary_cn":"一句话描述","reason_cn":"简要介绍","detail_cn":"详情，3-5 段"}]';

/**
 * 构建批量评分 prompt（生产定版）。
 *
 * @param repos 待评分项目（建议每批 ≤ 5 个，控制 token；带 readme 走 stage1 输入块）
 * @param aiInterestsText 用户自然语言兴趣描述
 */
export function buildFeedScoringPrompt(repos: RepoForScoring[], aiInterestsText: string): string {
  const list = buildProjectBlock(repos);
  return `你是一位资深开源项目策展人，面向中文读者。根据用户的兴趣描述，对以下 GitHub 项目逐个评估并生成中文推荐内容。

# 用户兴趣描述
${aiInterestsText}

# 待评估项目（共 ${repos.length} 个）
${list}

# 评估要求
对每个项目输出一个 JSON 对象，字段：
- "repo": "owner/repo"（与输入一致）
- "zone": 从 [AI, 资源, 工具, 创意] 中选 1 个。判定：人拿它是「学/看」（教程/论文/文档/数据集）→资源；它靠智能干活（模型/推理/Agent/框架/AI应用）→AI；人拿它是「玩/创作」（游戏/脑洞/绘画/音乐/剪辑）→创意；人拿它「干活」（效率/开发/数据库/自托管/skill）→工具。只选 1 个。
- "ai_dims": 从 [${AI_DIMS.join(", ")}] 中选 1-3 个最贴切的标签，按相关度降序排列组成数组。例如只和 AI Agent 有关：["AI Agent"]；横跨 Agent 和工具调用：["AI Agent", "工具调用"]；最多不要超过3个。判「非AI-好玩」看的是项目气质而不是类目：让人一眼觉得妙、有创意、有惊喜感、忍不住想点进去玩一玩的才算（如脑洞模拟器、奇思妙想的工具、惊艳的可视化 demo）；「带界面的正经工程」「游戏开发框架」这类不算好玩。「创意工具」「可视化」两个标签同样只给为创作/玩耍而生的项目（画板、音乐玩具、艺术生成器、创意编程平台），正经生产力工具（建站器、录屏、图标库、UI 组件库、图表库、PPT 生成器）绝不打这两个标签。
- "ai_score": 0 到 1 的浮点数，表示该项目与用户兴趣描述的相关度（1 = 非常相关，0 = 完全无关）。判断依据：是否 AI 相关、是否好玩有趣（按上面的好玩标准判）、是否实用能直接用、star 热度
- "fun_score": 0 到 1 的浮点数，表示「让人想点开玩的冲动强度」。只看这一个维度：不是质量、不是有用、不是 AI，是眼前一亮/想玩/忍不住点开的直觉强度。与内容分区无关（不好玩的工具=低分，好玩的换脸工具=高分；无聊的论文=低分）。
- "tags": 3-6 个领域标签，从项目自述参考文档里提取「这个项目做什么领域」的具体名词（如：大语言模型、实时视频处理、家庭能源监控、音乐播放器）。面向人可读、能搜索的领域词，不是形容词、不是热度词、不是"AI""工具"这种空泛词；与 ai_dims 的分工：ai_dims 是气质/类目标签，tags 是领域名词。
- "facts": 见下方千人千面要求。
- "summary_cn": 面向完全不了解这个项目的人，用一句话说清它是什么、能做什么、有什么特别之处，20-35 个汉字（硬性要求：少于 20 字或多于 35 个字都不合格，写完后数一遍字数确认）。注意：不能和 reason_cn/detail_cn 的内容重复，必须用完全不同的角度和措辞。
- "reason_cn": 简要介绍，110-130 个汉字（硬性要求：少于 100 字或多于 150 字都不合格，约 3 行，写完后数一遍字数确认）。面向第一次听说它的读者，用他们能懂的话讲清它是什么、解决什么问题、具体能做到什么。可以出现专业概念，但要让外行也读得懂。一段连贯文字，不要用①②③等序号编号，不要重复 summary_cn 的内容。
- ${DETAIL_SPEC}
${QIANREN_SPEC}

${JSON_SKELETON}`;
}

// ---------------------------------------------------------------------------
// domain_key 派生（标签分区 v2.2：确定性函数，从 zone+tags 派生）
// ---------------------------------------------------------------------------

/** AI 区 domain_key 细分优先积累（推理/训练/Agent/RAG/向量库；随数据积累扩展） */
const AI_DOMAIN_KEYS = [
  "推理引擎",
  "大语言模型",
  "AI Agent",
  "Agent",
  "模型训练",
  "训练",
  "RAG",
  "向量数据库",
  "多模态",
  "代码助手",
  "AI搜索",
  "AI写作",
  "微调",
  "提示工程",
  "模型部署",
  "知识图谱",
  "文档理解",
  "语音识别",
  "图像生成",
  "视频生成",
];

/**
 * domain_key 派生：AI 区细分标签优先（命中词表取细分键），其余取 tags[0]（自由领域词即键）。
 * 同义词合并靠词表随数据积累（AI 区高频键先进词表，非 AI 区随数据自然长出来）。
 * 返回 null 表示无法派生（合法性闸拦截）。
 */
export function domainKeyOf(zone: string | undefined, tags: string[] | undefined): string | null {
  const list = (tags || []).map((t) => t.trim()).filter((t) => t.length > 0);
  if (zone === "AI") {
    for (const t of list) if (AI_DOMAIN_KEYS.includes(t)) return t;
    return list[0] ?? null;
  }
  if (zone === "资源" || zone === "创意" || zone === "工具") {
    return list[0] ?? zone;
  }
  return null;
}

// ---------------------------------------------------------------------------
// G-source 溯源校验（千人千面硬闸：source 字面存在 + claim≠source；锚点一致=观察）
// ---------------------------------------------------------------------------

/** 归一化：去所有空白 */
function normCn(s: string): string {
  return (s || "").replace(/\s+/g, "");
}

/** source 字面存在于清洗后 README（句界截断与尾部省略号容差）。返回 (是否命中, 说明)。 */
export function sourceInDoc(source: string, doc: string): [boolean, string] {
  const sn = normCn(source);
  const dn = normCn(doc);
  if (!sn) return [false, "source 为空"];
  if (sn.length < 8) return [false, "source 过短（<8 字）"];
  if (dn.includes(sn)) return [true, "字面存在"];
  // 尾部省略号容差
  if (sn.endsWith("...")) {
    const head = sn.slice(0, -3);
    if (head.length >= 8 && dn.includes(head)) return [true, "尾部省略号截断命中"];
  }
  if (sn.endsWith("…")) {
    const head = sn.slice(0, -1);
    if (head.length >= 8 && dn.includes(head)) return [true, "尾部省略号截断命中"];
  }
  // 句界截断容差：source 尾部在句号/分号/叹号处截断 → 取至最后标点再匹配
  for (const sep of ["。", "；", "！", "？", "．"]) {
    const idx = sn.lastIndexOf(sep);
    if (idx >= 12) {
      const head = sn.slice(0, idx);
      if (dn.includes(head)) return [true, "句界截断命中"];
    }
  }
  // 首句命中（跨句拼接失败的兜底观察）
  for (const sep of ["。", "；", "！", "？"]) {
    const idx = sn.indexOf(sep);
    if (idx >= 8 && idx < sn.length - 2) {
      const head = sn.slice(0, idx + 1);
      if (dn.includes(head)) return [true, "首句命中"];
    }
  }
  return [false, "不在参考文档"];
}

const CN_NUM: Record<string, number> = {
  零: 0,
  一: 1,
  二: 2,
  两: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
  百: 100,
  千: 1000,
  万: 10000,
};
const CN_RE = /[零一二两三四五六七八九十百千万]+/g;
const EN_NUM: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1000,
  million: 1000000,
};
const EN_NUM_RE =
  /one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million/gi;

function cnNumberToAr(s: string): number {
  let total = 0;
  let num = 0;
  for (const ch of s) {
    const v = CN_NUM[ch];
    if (v === undefined) continue;
    if (v >= 10) {
      total += (num || 1) * v;
      num = 0;
    } else {
      num = v;
    }
  }
  return total + num;
}

/** claim/source 的规范化断言锚点：阿拉伯数字 + 汉字数字 + 英文数字词（统一阿拉伯）+ ASCII 专名。 */
export function claimAnchors(text: string): [Set<string>, Set<string>] {
  const nums = new Set<string>();
  for (const m of (text || "").matchAll(/\d+(?:\.\d+)?/g)) nums.add(m[0]);
  for (const m of (text || "").matchAll(CN_RE)) {
    const v = cnNumberToAr(m[0]);
    if (v) nums.add(String(v));
  }
  for (const m of (text || "").matchAll(EN_NUM_RE)) {
    const v = EN_NUM[m[0].toLowerCase()];
    if (v !== undefined) nums.add(String(v));
  }
  const names = new Set<string>();
  for (const m of (text || "").matchAll(/[A-Z][A-Za-z0-9_-]{1,}/g)) names.add(m[0]);
  return [nums, names];
}

/** 长度单位：汉字每字 1，ASCII 连续串每 4 字符计 1（约一单词，不足 1 按 1），标点不计。 */
export function txtUnits(s: string): number {
  let n = 0;
  for (const m of (s || "").matchAll(/[A-Za-z0-9][A-Za-z0-9_.\-/]*|[\u4e00-\u9fff]/g)) {
    const tok = m[0];
    if (/[\u4e00-\u9fff]/.test(tok)) n += 1;
    else n += Math.max(1, Math.floor(tok.length / 4));
  }
  return n;
}

export interface GSourceResult {
  ok: boolean;
  fails: string[];
  /** 锚点一致观察（报告级，不进硬闸；首批 1000 卡积累误杀率后评估升级） */
  anchorObs: string[];
}

/**
 * 溯源三查。硬闸=source 字面存在 + claim≠source；锚点一致=报告级观察
 * （中英数字表达异形 single/单张 会误杀，试产期降级观察积累误杀率）。
 */
export function gSourceCheck(claim: string, source: string, doc: string): GSourceResult {
  const fails: string[] = [];
  const anchorObs: string[] = [];
  if (!claim || !source) return { ok: false, fails: ["claim/source 缺失"], anchorObs };
  if (normCn(claim) === normCn(source)) fails.push("claim 与 source 字面相同（整段复制糊弄）");
  const [okSrc, note] = sourceInDoc(source, doc);
  if (!okSrc) fails.push(`source 不在参考文档：${note}`);
  const [cn] = claimAnchors(claim);
  const [sn] = claimAnchors(source);
  if (cn.size > 0) {
    const missing = [...cn].filter((n) => !sn.has(n));
    if (missing.length > 0) {
      anchorObs.push(`claim 锚点 ${missing.join(",")} 不在 source（规范化不一致，观察误杀率）`);
    }
  }
  return { ok: fails.length === 0, fails, anchorObs };
}

// ---------------------------------------------------------------------------
// 调度器合法性闸（标签分区 v2.2 §4：zone 枚举 / fun_score 范围 / tags 数量 / domain_key 派生 / facts 预算）
// ---------------------------------------------------------------------------

/** facts 预算（千人千面 v4：claim≤40/source≤80/整卡≤240/条数 1-5） */
export const FACTS_BUDGET = { claim: 40, source: 80, total: 240, minFacts: 1, maxFacts: 5 };

/**
 * 合法性闸：返回失败列表（空数组=通过）。不合格卡不上站（宁缺毋滥），
 * 失败项转重评反馈（buildRetryPrompt 拼接）。
 */
export function validateScoringResult(sc: ScoringResult, doc?: string): string[] {
  const fails: string[] = [];
  if (sc.zone !== undefined && !(ZONES as readonly string[]).includes(sc.zone)) {
    fails.push(`zone「${sc.zone}」不在四区枚举（AI/资源/工具/创意）`);
  }
  if (sc.funScore !== undefined && (!Number.isFinite(sc.funScore) || sc.funScore < 0 || sc.funScore > 1)) {
    fails.push(`fun_score ${sc.funScore} 超出 [0,1]`);
  }
  if (sc.tags !== undefined) {
    if (sc.tags.length < 3 || sc.tags.length > 6) {
      fails.push(`tags ${sc.tags.length} 个（要求 3-6 个）`);
    } else if (sc.tags.some((t) => !t || t.trim().length === 0 || t.length > 20)) {
      fails.push("tags 含空项或超长词（≤20 字）");
    }
  }
  if (sc.zone !== undefined && sc.tags !== undefined && sc.tags.length > 0) {
    const dk = domainKeyOf(sc.zone, sc.tags);
    if (dk === null) fails.push("domain_key 无法从 zone+tags 派生");
  }
  // facts 预算（千人千面）：条数 1-5 / claim≤40 / source≤80 / 整卡≤240 / claim≠source / G-source 硬闸
  if (sc.facts !== undefined) {
    const facts = sc.facts.filter((f) => f && (f.claim || f.source));
    if (facts.length < FACTS_BUDGET.minFacts || facts.length > FACTS_BUDGET.maxFacts) {
      fails.push(`facts ${facts.length} 条（要求 ${FACTS_BUDGET.minFacts}-${FACTS_BUDGET.maxFacts} 条）`);
    }
    let totalLen = 0;
    facts.forEach((f, i) => {
      totalLen += txtUnits(f.claim) + txtUnits(f.source);
      if (txtUnits(f.claim) > FACTS_BUDGET.claim) {
        fails.push(`facts[${i + 1}] claim ${txtUnits(f.claim)} 单位（预算 ${FACTS_BUDGET.claim}）`);
      }
      if (txtUnits(f.source) > FACTS_BUDGET.source) {
        fails.push(`facts[${i + 1}] source ${txtUnits(f.source)} 单位（预算 ${FACTS_BUDGET.source}）`);
      }
      if (doc) {
        const gs = gSourceCheck(f.claim, f.source, doc);
        if (!gs.ok) fails.push(`facts[${i + 1}] ${gs.fails.join("；")}`);
      } else if (normCn(f.claim) === normCn(f.source)) {
        fails.push(`facts[${i + 1}] claim 与 source 字面相同（整段复制糊弄）`);
      }
    });
    if (totalLen > FACTS_BUDGET.total)
      fails.push(`facts 总长 ${totalLen} 单位（预算 ${FACTS_BUDGET.total}）`);
  }
  return fails;
}

// ---------------------------------------------------------------------------
// 解析 LLM 返回的评分为 ScoringResult[]（容错同旧版 + 新字段 zone/fun_score/tags/facts）
// ---------------------------------------------------------------------------

interface RawScoringItem {
  repo?: string;
  ai_dims?: string[];
  ai_dim?: string;
  ai_score?: number;
  fun_score?: number;
  tags?: string[];
  facts?: Fact[];
  zone?: string;
  summary_cn?: string;
  reason_cn?: string;
  detail_cn?: string;
}

function mapRawItem(x: RawScoringItem): ScoringResult | null {
  if (!x || typeof x.repo !== "string") return null;
  let dims: string[];
  if (Array.isArray(x.ai_dims) && x.ai_dims.length > 0) {
    dims = x.ai_dims.filter((d): d is string => typeof d === "string");
  } else if (typeof x.ai_dim === "string" && x.ai_dim.trim()) {
    dims = [x.ai_dim.trim()];
  } else {
    dims = ["其他"];
  }
  const facts = Array.isArray(x.facts)
    ? x.facts.filter((f): f is Fact => !!f && typeof f.claim === "string" && typeof f.source === "string")
    : undefined;
  const tags = Array.isArray(x.tags) ? x.tags.filter((t): t is string => typeof t === "string") : undefined;
  return {
    repo: x.repo as string,
    aiDims: dims,
    aiDim: dims[0] || "其他",
    aiScore: typeof x.ai_score === "number" ? Math.max(0, Math.min(1, x.ai_score)) : 0.5,
    zone: typeof x.zone === "string" && x.zone.trim() ? x.zone.trim() : undefined,
    funScore:
      typeof x.fun_score === "number" && Number.isFinite(x.fun_score)
        ? Math.max(0, Math.min(1, x.fun_score))
        : undefined,
    tags: tags && tags.length > 0 ? tags : undefined,
    facts: facts && facts.length > 0 ? facts : undefined,
    summaryCn: x.summary_cn ?? "",
    reasonCn: x.reason_cn ?? "",
    detailCn: x.detail_cn ?? "",
  };
}

/** 解析 LLM 返回的评分为 ScoringResult[]。容错：去 markdown 代码块、修复控制字符、提取首个 JSON 数组。 */
export function parseScoringResult(raw: string): ScoringResult[] {
  let text = raw.trim();
  text = text
    .replace(/```(?:json)?\n?/g, "")
    .replace(/```/g, "")
    .trim();

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) {
    console.error("[feed/scoring] No JSON array found in LLM response");
    return [];
  }

  let jsonStr = text.slice(start, end + 1);
  jsonStr = sanitizeJsonControlChars(jsonStr);

  try {
    const arr = JSON.parse(jsonStr) as RawScoringItem[];
    return arr.map(mapRawItem).filter((x): x is ScoringResult => x !== null);
  } catch (err) {
    const partial = extractPartialResults(jsonStr);
    if (partial.length > 0) {
      console.log(`  [feed/scoring] recovered ${partial.length} partial results from truncated JSON`);
      return partial;
    }
    console.error(`[feed/scoring] JSON parse failed: ${err}`);
    return [];
  }
}

/** 修复 JSON 字符串值中的原始控制字符。仅修复字符串值内部的控制字符，不影响 JSON 结构。 */
function sanitizeJsonControlChars(text: string): string {
  let result = "";
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i);

    if (!inString) {
      if (ch === '"') inString = true;
      result += ch;
    } else {
      if (escaped) {
        result += ch;
        escaped = false;
      } else if (ch === "\\") {
        result += ch;
        escaped = true;
      } else if (ch === '"') {
        inString = false;
        result += ch;
      } else if (ch.charCodeAt(0) < 0x20) {
        switch (ch) {
          case "\n":
            result += "\\n";
            break;
          case "\r":
            result += "\\r";
            break;
          case "\t":
            result += "\\t";
            break;
          default:
            result += "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0");
        }
      } else {
        result += ch;
      }
    }
  }

  return result;
}

/** 从截断的 JSON 数组中逐项提取有效结果（容错：LLM 输出可能被截断）。 */
function extractPartialResults(jsonStr: string): ScoringResult[] {
  const results: ScoringResult[] = [];
  const objRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
  const matches = jsonStr.match(objRegex);
  if (!matches) return [];

  for (const objStr of matches) {
    try {
      const x = JSON.parse(objStr) as RawScoringItem;
      const mapped = mapRawItem(x);
      if (mapped) results.push(mapped);
    } catch {
      // skip unparseable object
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// 两段式评分 · 第一段「海选」（2026-09-06 栗子拍板）：
// 只打分+贴标签，不生成任何中文文案（输出 ~50 token/20 库，比全文案便宜 ~50 倍），
// 海选淘汰的库不进 feed（栗子硬约束：出现在 GitTok 的卡必须有全套文案，海选淘汰
// 的根本不出现，所以无需文案）。只有精评选中的 top-K 才走 buildFeedScoringPrompt 全文案。
// ---------------------------------------------------------------------------

/** 海选单库结果（无文案，进 two-phase 缓存与 top-K 选择） */
export interface Phase1Score {
  repo: string;
  aiDims: string[];
  aiScore: number;
}

/**
 * 构建海选批 prompt：一批 ~20 库，只要求 ai_dims + ai_score，输出极短。
 * 评估口径与全文案版一致（同一份 AI_DIMS、同一个 ai_score 语义），保证两段可比。
 */
export function buildPhase1ScoringPrompt(repos: RepoForScoring[], aiInterestsText: string): string {
  const list = repos
    .map((r, i) => {
      const topics = r.topics.length ? r.topics.slice(0, 6).join(", ") : "无";
      const desc = (r.description || "无描述").slice(0, 120);
      return `${i + 1}. ${r.repo} — ${desc} | ⭐${r.stars} | 语言: ${r.language || "未知"} | topics: ${topics}`;
    })
    .join("\n");

  return `你是开源项目策展人，面向中文读者。根据用户兴趣描述，快速评估以下 GitHub 项目与兴趣的相关度。

# 用户兴趣描述
${aiInterestsText}

# 待评估项目（共 ${repos.length} 个）
${list}

# 输出要求（只要评分，不要任何文案/解释）
对每个项目输出一个 JSON 对象，字段只有三个：
- "repo": "owner/repo"（与输入一致）
- "ai_dims": 从 [${AI_DIMS.join(", ")}] 中选 1-2 个最贴切的标签
- "ai_score": 0 到 1 的浮点数相关度（判断依据：AI 相关性、好玩程度、实用能直接用、star 热度）

只返回 JSON 数组，不要 markdown 标记，不要任何其他文字。示例：
[{"repo":"owner/repo","ai_dims":["AI Agent"],"ai_score":0.85}]`;
}

/** 解析海选结果（容错与 parseScoringResult 同款：去代码块标记、修控制字符、逐项提取）。 */
export function parsePhase1ScoringResult(raw: string): Phase1Score[] {
  let text = raw.trim();
  text = text
    .replace(/```(?:json)?\n?/g, "")
    .replace(/```/g, "")
    .trim();

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) {
    console.error("[feed/phase1] No JSON array found in LLM response");
    return [];
  }
  const jsonStr = sanitizeJsonControlChars(text.slice(start, end + 1));

  try {
    const arr = JSON.parse(jsonStr) as Array<{
      repo?: string;
      ai_dims?: string[];
      ai_dim?: string;
      ai_score?: number;
    }>;
    return arr
      .filter((x) => x && typeof x.repo === "string")
      .map((x) => {
        let dims: string[];
        if (Array.isArray(x.ai_dims) && x.ai_dims.length > 0) {
          dims = x.ai_dims.filter((d): d is string => typeof d === "string");
        } else if (typeof x.ai_dim === "string" && x.ai_dim.trim()) {
          dims = [x.ai_dim.trim()];
        } else {
          dims = [];
        }
        return {
          repo: x.repo as string,
          aiDims: dims,
          aiScore: typeof x.ai_score === "number" ? Math.max(0, Math.min(1, x.ai_score)) : 0.5,
        };
      });
  } catch (err) {
    console.error(`[feed/phase1] JSON parse failed: ${err}`);
    return [];
  }
}

/** 重评反馈拼接（单卡带失败明细重跑；黑词进闸不进 prompt 的落地侧）。 */
export function buildRetryPrompt(basePrompt: string, fails: string[]): string {
  return (
    basePrompt +
    "\n\n你上次的输出存在以下问题，请全部修正后重新输出该项目的完整 JSON 对象：\n- " +
    fails.join("\n- ")
  );
}
