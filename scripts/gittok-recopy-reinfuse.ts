/**
 * 把「一批卡的文案/Facts 改动」重新灌回**上游底座**的 feed.json（固定路径，只读备份 → 写回当前库）。
 *
 * 为什么需要它（drip 并行写 feed.json 的既定配方）：
 *   定时件 `feed: tier drip update` 会整份重写 `data/feed.json`（一次提交动 23 万行 ⇒ 行级 merge
 *   毫无意义）。所以 push 前必须**先取上游底座**（`git checkout origin/master -- data/feed.json`），
 *   再把本地这几轮真正改过的那几张卡**按 repo 键重盖**回四个文案字段。`-X ours/theirs` 都会丢东西。
 *
 * 写入面**严格白名单**：只覆盖 `summaryCn` / `reasonCn` / `detailCn` / `facts`（与 recopy 的写回面一致）；
 * 其余字段（zone / funScore / tags / aiDims / tier 进度等）一律以**上游底座**为准，不动。
 *
 * 路径**全部固定**（不接受命令行给任意路径：备份＝仓内 `tmp/reinfuse/feed-from.json`、
 * 目标＝`data/feed.json`、回执＝`data/recopy-state.json`；`tmp/` 在 .gitignore 里）。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   cp data/feed.json tmp/reinfuse/feed-from.json        # 先留备份（在切上游底座之前）
 *   npx tsx scripts/gittok-recopy-reinfuse.ts --repos=owner/a,owner/b
 *   npx tsx scripts/gittok-recopy-reinfuse.ts --receipts          # 盖子集＝recopy-state.done 的 repo
 *   npx tsx scripts/gittok-recopy-reinfuse.ts --receipts --dry-run
 */
import fs from "node:fs";
import path from "node:path";

const FIELDS = ["summaryCn", "reasonCn", "detailCn", "facts"] as const;
/** 备份固定落仓内 tmp/（已 gitignore），不接受命令行传路径 ⇒ 没有「任意路径读」这个面。 */
const BACKUP = path.join("tmp", "reinfuse", "feed-from.json");
const TARGET = path.join("data", "feed.json");
const RECEIPTS = path.join("data", "recopy-state.json");

function atomicWrite(file: string, text: string): void {
  const tmp = `${file}.tmp-reinfuse`;
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, file);
}

function main(): void {
  const argv = process.argv.slice(2);
  const get = (name: string): string | null => {
    const hit = argv.find((a) => a.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : null;
  };
  const dryRun = argv.includes("--dry-run");
  if (!fs.existsSync(BACKUP)) {
    console.error(`备份不存在：${BACKUP}（先在切上游底座**之前** cp data/feed.json 过去）`);
    process.exit(2);
  }
  const base = JSON.parse(fs.readFileSync(TARGET, "utf-8")) as Array<Record<string, unknown>>;
  const mine = JSON.parse(fs.readFileSync(BACKUP, "utf-8")) as Array<Record<string, unknown>>;
  const mineByRepo = new Map(mine.map((c) => [String(c["repo"]), c]));

  let repos: string[];
  if (argv.includes("--receipts")) {
    const state = JSON.parse(fs.readFileSync(RECEIPTS, "utf-8")) as { done?: Record<string, unknown> };
    repos = Object.keys(state.done ?? {});
  } else {
    repos = (get("repos") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (repos.length === 0) {
    console.error("要盖的 repo 集合为空（--repos 或 --receipts 二选一）");
    process.exit(2);
  }

  const baseByRepo = new Map(base.map((c) => [String(c["repo"]), c]));
  let touched = 0;
  const missing: string[] = [];
  const changes: string[] = [];
  for (const repo of repos) {
    const dst = baseByRepo.get(repo);
    const src = mineByRepo.get(repo);
    if (!dst || !src) {
      missing.push(repo);
      continue;
    }
    const per: string[] = [];
    for (const f of FIELDS) {
      if (JSON.stringify(dst[f] ?? null) !== JSON.stringify(src[f] ?? null)) {
        dst[f] = src[f];
        per.push(f);
      }
    }
    if (per.length) {
      touched++;
      changes.push(`${repo}（${per.join("/")}）`);
    }
  }

  console.log(
    `重灌：目标库 ${base.length} 张｜备份 ${mine.length} 张｜要盖 ${repos.length} 个 repo ⇒ 实改动 ${touched} 张` +
      (missing.length ? `｜**备份里找不到 ${missing.length} 个**：${missing.slice(0, 5).join(", ")}` : ""),
  );
  for (const c of changes.slice(0, 20)) console.log(`  · ${c}`);
  if (changes.length > 20) console.log(`  …还有 ${changes.length - 20} 张`);
  if (!dryRun && touched > 0) {
    atomicWrite(TARGET, JSON.stringify(base, null, 2));
    console.log(`已写回 ${TARGET}（只动白名单四个字段）`);
  } else {
    console.log(dryRun ? "（--dry-run：未写入）" : "（没有需要改的：未写入）");
  }
}

main();
