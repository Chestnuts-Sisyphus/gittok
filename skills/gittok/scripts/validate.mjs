#!/usr/bin/env node
/**
 * Agent Skill 格式校验器（零依赖，Node ≥ 18）。
 *
 * 校验对象 = 一个 skill 目录（默认本脚本所在的 skills/gittok）。
 * 规则（对应 Agent Skills / ZCode skill 规范）：
 *   1. 存在 SKILL.md
 *   2. 文件以 `---` 开头的 YAML frontmatter 包裹，且能取到字段
 *   3. name：小写 kebab-case、1–64 字符、与目录名一致
 *   4. description：非空、≤1024 字符、无尖括号、含触发场景提示
 *   5. 正文非空、不含未填占位符（TODO/TBD/XXX）、建议 ≤500 行
 *   6. 正文提到的相对脚本/引用文件真实存在（`scripts/…`、`references/…`）
 *
 * 用法：node skills/gittok/scripts/validate.mjs [skillDir]
 * 退出码：0 全过（可能有 warning）；1 有 error。
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const skillDir = path.resolve(process.argv[2] ?? path.join(here, ".."));
const skillFile = path.join(skillDir, "SKILL.md");
const errors = [];
const warnings = [];

const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

if (!existsSync(skillFile)) {
  err(`缺少 SKILL.md：${skillFile}`);
} else {
  const raw = readFileSync(skillFile, "utf8").replace(/^\uFEFF/, "");
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) {
    err("SKILL.md 必须以 YAML frontmatter（--- 包裹）开头");
  } else {
    const [, fmText, body] = m;
    const fm = {};
    let currentKey = null;
    for (const line of fmText.split(/\r?\n/)) {
      if (!line.trim() || line.trim().startsWith("#")) continue;
      const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
      if (kv && !line.startsWith(" ")) {
        currentKey = kv[1];
        fm[currentKey] = kv[2].trim().replace(/^["']|["']$/g, "");
      } else if (currentKey && line.startsWith(" ")) {
        fm[currentKey] = `${fm[currentKey]} ${line.trim()}`.trim();
      }
    }

    // name
    const name = fm["name"];
    if (!name) {
      err("frontmatter 缺 name");
    } else {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) err(`name 不是小写 kebab-case：${name}`);
      if (name.length < 1 || name.length > 64) err(`name 长度越界（1–64）：${name.length}`);
      if (name !== path.basename(skillDir)) {
        err(`name（${name}）与目录名（${path.basename(skillDir)}）不一致`);
      }
    }

    // description
    const desc = fm["description"];
    if (!desc) {
      err("frontmatter 缺 description");
    } else {
      if (desc.length > 1024) err(`description 超长（${desc.length} > 1024）`);
      if (desc.length < 20) warn(`description 偏短（${desc.length} 字符），触发信号可能不足`);
      if (/[<>]/.test(desc)) err("description 含尖括号，可能导致解析问题");
      if (!/当|如果|需要|use when|whenever|使用/i.test(desc)) {
        warn("description 未见触发场景提示（建议写清「什么时候用」）");
      }
    }

    // body
    if (!body || body.trim().length < 50) {
      err("正文过短或为空");
    } else {
      const bodyLines = body.split(/\r?\n/).length;
      if (bodyLines > 500) warn(`正文偏长（${bodyLines} 行），建议拆到 references/`);
      if (/\b(TODO|TBD|FIXME|XXX)\b/.test(body) || /\bTODO\b/.test(fmText)) {
        err("存在未填占位符（TODO/TBD/FIXME/XXX）");
      }
      // 引用的相对文件必须存在
      const refs = new Set();
      for (const mm of body.matchAll(/(?:^|[\s(`])((?:scripts|references|assets)\/[\w./-]+)/g)) {
        refs.add(mm[1]);
      }
      for (const r of refs) {
        const p = path.join(skillDir, r);
        if (!existsSync(p)) err(`正文引用的文件不存在：${r}`);
        else if (statSync(p).size === 0) err(`正文引用的文件为空：${r}`);
      }
      if (refs.size > 0) console.log(`  ✓ 校验了 ${refs.size} 个被引用文件`);
    }
    console.log(`  · name=${name ?? "(缺)"}  description=${(desc ?? "").length} 字符  正文 ${body.split("\n").length} 行`);
  }
}

for (const w of warnings) console.log(`  WARN  ${w}`);
for (const e of errors) console.log(`  ERROR ${e}`);
console.log(
  `${path.basename(skillDir)}: ${errors.length === 0 ? "PASS" : "FAIL"}（error ${errors.length} / warn ${warnings.length}）`,
);
process.exit(errors.length === 0 ? 0 : 1);
