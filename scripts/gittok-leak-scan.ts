/**
 * K-08 泄漏扫描器（GitTok 公开仓泄露面机械闸）。
 *
 * 分级口径（本仓是**公开**站点仓，且有 bot 持续推送）：
 *   A 值形态凭据：命中即 exit 1，**零容忍、不设白名单**。
 *   B 凭据库指针：密钥母库目录及其清单文件名的路径指针（字面写法见下方 KEY_POINTER 正则，
 *      本注释刻意不写出来——它自己也是对外产物，会被本闸拦）。值没漏，但攻击者据此
 *      知道去哪拿。运行必需的默认值（KEY_DIR 等）保留在 B-WHITELIST 并写明理由；
 *      docs/ 与 digests/ 属对外产物，出现指针即应净化。
 *   C 个人盘路径：真实用户名路径（本机用户名）命中即视同 A 级；
 *      digest 正文里的通用示例（`C:\Users\Public`、`C:\Users\...`、`C:\Users\xxx`）不算个人路径。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-leak-scan.ts                  # 严格模式：A 命中或 B/C 非白名单命中 → exit 1
 *   npx tsx scripts/gittok-leak-scan.ts --report-only    # 只报不拦（净化前的取证阶段用）
 *   npx tsx scripts/gittok-leak-scan.ts --json=D:/tmp/x.json   # 另存机器可读清单
 *
 * 纪律：命中的**值一律不打印**（A 级只报文件+行号+模式名），符合「凭据只记位置不记内容」。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO = process.cwd();

/** A 级：值形态凭据。ark- 必须带长度约束，否则命中 GitHub topics `dark-theme`/`quark-*` 造成假红。 */
const VALUE_PATTERNS: Array<[string, RegExp]> = [
  ["github-pat", /ghp_[A-Za-z0-9]{36}/g],
  ["github-oauth", /gho_[A-Za-z0-9]{36}/g],
  ["openai-style", /sk-[A-Za-z0-9]{32,}/g],
  ["gitlab-pat", /glpat-[A-Za-z0-9_-]{20}/g],
  ["aws-akid", /AKIA[0-9A-Z]{16}/g],
  ["zhipu-ark", /ark-[A-Za-z0-9]{16,}/g],
];

/** B 级：指向密钥库的路径指针。 */
const KEY_POINTER = /D:\/AI\/KEY[A-Za-z0-9_./\\-]*/g;

/** C 级：真实用户名（个人标识）路径，命中即等同 A 级严重度。 */
const PERSONAL_USER = process.env["LEAK_SCAN_USER"] || "Administrator";
const PERSONAL_PATTERNS: Array<[string, RegExp]> = [
  ["personal-user-path", new RegExp(`[A-Za-z]:[\\\\/]Users[\\\\/]${PERSONAL_USER}`, "g")],
  ["obsidian-vault", /D:\/Obsidian\/[A-Za-z0-9_./\\-]*/g],
  ["job-search-dir", /D:\/AI\/求职[A-Za-z0-9_./\\-]*/g],
];

/**
 * B 级白名单：删除即断跑的运行必需项。只允许「代码/CI 读密钥的默认路径」这一类，
 * 且每条必须写理由。docs/ 与 digests/ 一律不进白名单（对外产物）。
 */
const B_WHITELIST: Array<{ file: string; reason: string }> = [
  {
    file: "scripts/gittok-fullbuild-lib.ts",
    reason: "KEY_DIR 默认值：批量构建取通道的唯一入口，删除即断跑。代码内默认值长期保留（运行必需），对外产物 docs/digests 已改走 $KEY_DIR 写法",
  },
  {
    file: "scripts/gittok-fullbuild.ts",
    reason: "同上，头注释描述 KEY_DIR 用法",
  },
  {
    file: "scripts/gittok-github-token-probe.ts",
    reason: "token 探针脚本自身要读的清单路径",
  },
  { file: "scripts/gittok-lane-probe.ts", reason: "通道探针脚本默认清单路径" },
  { file: "scripts/gittok-token-identity.ts", reason: "token 身份核对脚本默认清单路径" },
  { file: "scripts/model-bucket-mine.mts", reason: "模型桶挖掘脚本默认清单路径" },
  { file: "src/feed/executor.ts", reason: "执行器 KEY_DIR 默认值（运行必需）" },
  { file: "src/feed/scheduler.ts", reason: "调度器 PAID-LLM 默认路径（运行必需）" },
  {
    file: ".github/workflows/feed-fullbuild.yml",
    reason: "自托管 runner 上取密钥的路径注释——CI 跑在栗子自己的机器上，该路径是运行事实",
  },
];

type Hit = {
  file: string;
  line: number;
  klass: "A" | "B" | "C";
  pattern: string;
  sample: string;
  whitelisted: boolean;
  reason?: string;
};

function trackedFiles(): string[] {
  const out = execFileSync("git", ["ls-files", "-z"], { cwd: REPO, maxBuffer: 256 * 1024 * 1024 });
  return out.toString("utf8").split("\0").filter(Boolean);
}

function isBinary(buf: Buffer): boolean {
  const head = buf.subarray(0, 8000);
  return head.includes(0);
}

function redact(s: string): string {
  if (s.length <= 12) return `${s.slice(0, 3)}***`;
  return `${s.slice(0, 10)}…(${s.length})`;
}

function scanFile(rel: string, buf: Buffer, hits: Hit[]): void {
  const text = buf.toString("utf8");
  const lines = text.split(/\r?\n/);
  const wl = B_WHITELIST.find((w) => w.file === rel);
  lines.forEach((line, i) => {
    for (const [name, re] of VALUE_PATTERNS) {
      re.lastIndex = 0;
      if (re.test(line)) {
        hits.push({
          file: rel,
          line: i + 1,
          klass: "A",
          pattern: name,
          sample: "<值形态凭据，按纪律不打印内容>",
          whitelisted: false,
        });
      }
    }
    KEY_POINTER.lastIndex = 0;
    if (KEY_POINTER.test(line)) {
      KEY_POINTER.lastIndex = 0;
      const m = line.match(KEY_POINTER) || [];
      for (const raw of m) {
        hits.push({
          file: rel,
          line: i + 1,
          klass: "B",
          pattern: "key-pointer",
          sample: raw,
          whitelisted: !!wl,
          reason: wl?.reason,
        });
      }
    }
    for (const [name, re] of PERSONAL_PATTERNS) {
      re.lastIndex = 0;
      if (re.test(line)) {
        hits.push({
          file: rel,
          line: i + 1,
          klass: "C",
          pattern: name,
          sample: redact(line.trim()),
          whitelisted: false,
        });
      }
    }
  });
}

function main(): number {
  const argv = process.argv.slice(2);
  const reportOnly = argv.includes("--report-only");
  const jsonArg = argv.find((a) => a.startsWith("--json="));
  const files = trackedFiles();
  const hits: Hit[] = [];
  let scanned = 0;
  let skipped = 0;
  for (const rel of files) {
    const abs = path.join(REPO, rel);
    let buf: Buffer;
    try {
      buf = fs.readFileSync(abs);
    } catch {
      skipped++;
      continue;
    }
    if (isBinary(buf)) {
      skipped++;
      continue;
    }
    scanned++;
    scanFile(rel, buf, hits);
  }

  const a = hits.filter((h) => h.klass === "A");
  const c = hits.filter((h) => h.klass === "C");
  const bOut = hits.filter((h) => h.klass === "B" && !h.whitelisted);
  const bIn = hits.filter((h) => h.klass === "B" && h.whitelisted);

  console.log(`【GitTok 泄漏扫描】被跟踪文件 ${files.length} 个｜扫描 ${scanned}｜跳过二进制/不可读 ${skipped}`);
  console.log(`A 值形态凭据 ${a.length} 处（零容忍，不设白名单）`);
  console.log(`C 个人标识路径 ${c.length} 处（等同 A 级）`);
  console.log(`B 凭据库指针 ${bOut.length + bIn.length} 处（白名单内 ${bIn.length}｜待净化 ${bOut.length}）`);

  const show = (title: string, list: Hit[], max = 40) => {
    console.log(`\n—— ${title} ——`);
    if (list.length === 0) {
      console.log("  （无）");
      return;
    }
    const byFile = new Map<string, Hit[]>();
    for (const h of list) {
      if (!byFile.has(h.file)) byFile.set(h.file, []);
      byFile.get(h.file)!.push(h);
    }
    let n = 0;
    for (const [f, hs] of [...byFile.entries()].sort()) {
      console.log(`  ${f}  (${hs.length} 处)`);
      for (const h of hs.slice(0, 6)) {
        n++;
        console.log(`      :${h.line} [${h.pattern}] ${h.sample}${h.whitelisted ? ` ← 白名单：${h.reason}` : ""}`);
      }
      if (hs.length > 6) console.log(`      …另有 ${hs.length - 6} 处同类`);
    }
    if (n === 0) console.log("  （无）");
  };
  show("A 值形态凭据", a);
  show("C 个人标识路径", c);
  show("B 待净化的凭据库指针（对外产物）", bOut);
  show("B 白名单内（运行必需，保留并注释）", bIn, 12);

  if (jsonArg) {
    const out = jsonArg.slice("--json=".length);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(
      out,
      JSON.stringify({ at: new Date().toISOString(), repo: REPO, scanned, hits }, null, 2),
      "utf8",
    );
    console.log(`\n机器可读清单 → ${out}`);
  }

  const blocking = a.length + c.length + bOut.length;
  if (reportOnly) {
    console.log(`\n[泄漏扫描] --report-only：本轮只报不拦，待拦项 ${blocking} 处`);
    return 0;
  }
  if (blocking > 0) {
    console.log(`\n[泄漏扫描] 不通过：A ${a.length}｜C ${c.length}｜B 待净化 ${bOut.length}`);
    return 1;
  }
  console.log(`\n[泄漏扫描] 通过：A/C 均 0 处，B 类剩余 ${bIn.length} 处全在白名单内`);
  return 0;
}

process.exit(main());
