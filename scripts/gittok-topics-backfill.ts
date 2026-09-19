/**
 * H-04 B 案：给「topics 为空」的存量卡回填**真 GitHub topics**（一次性补数据，不吃 LLM 额度）。
 *
 * 为什么会空：两条叠出来的——
 *   ① `src/trending.ts` 的 `TrendingRepo` 接口本来就没有 topics 字段（trending 源天生拿不到）；
 *   ② `loadExistingScores` 的缓存白名单此前不含 topics（2026-09-19 已补，见 `abf6abd`），
 *      于是「历史卡零重评 + 分档注入仓 topics 恒 []」每跑一轮就把存量卡的 topics 抹平。
 *   线上读数（2026-09-19 17:44 curl）：**空 820 张 / 只有 1 条 1442 张**。
 *
 * 只补「空」不覆盖「只有 1 条」：那 1 条是分类搜索词（`index.ts:1198` 写进去的 `searchQuery`），
 * 严格说也是假 topics，但把它们换掉会动到判定链输入语义（禁区），留作等裁项。
 *
 * 取数走 GitHub REST 元数据（`gh api`，含真 topics），**一次 GraphQL 批量 100 个仓**，
 * 820 张 ≈ 9 个请求（配额实测 remaining=5000）。
 *
 * 用法（D:/AI/QODER/1/os-feed 下）：
 *   npx tsx scripts/gittok-topics-backfill.ts --dry-run --limit=30   # 先试跑看命中率
 *   npx tsx scripts/gittok-topics-backfill.ts                        # 全量回填并写回 data/feed.json
 *   npx tsx scripts/gittok-topics-backfill.ts --check                # 只报当前分布，不取数
 */
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const FEED = path.resolve(process.cwd(), "data", "feed.json");
const argv = process.argv.slice(2);
const has = (f: string) => argv.includes(`--${f}`);
const num = (f: string, d: number) => {
  const a = argv.find((x) => x.startsWith(`--${f}=`));
  return a ? Number(a.slice(f.length + 3)) : d;
};
const DRY = has("dry-run");
const CHECK = has("check");
const LIMIT = num("limit", 0);
const BATCH = num("batch", 100);

interface Card {
  repo: string;
  owner?: string;
  name?: string;
  topics?: unknown;
  [k: string]: unknown;
}

function distribution(cards: Card[]) {
  const empty = cards.filter((c) => !Array.isArray(c.topics) || (c.topics as unknown[]).length === 0).length;
  const one = cards.filter((c) => Array.isArray(c.topics) && (c.topics as unknown[]).length === 1).length;
  const many = cards.length - empty - one;
  return { total: cards.length, empty, one, many };
}

/** 一次 GraphQL 拿一批仓的 topics（别名法，100 仓/请求）。 */
function ghGraphql(query: string): Promise<Record<string, { repositoryTopics?: { nodes?: { topic?: { name: string } }[] } } | null>> {
  return new Promise((resolve, reject) => {
    execFile(
      "gh",
      ["api", "graphql", "-f", `query=${query}`],
      { maxBuffer: 64 * 1024 * 1024 },
      (err, stdout, stderr) => {
        if (err) return reject(new Error(`gh api graphql 失败：${stderr.slice(0, 200)}`));
        try {
          const j = JSON.parse(stdout) as { data?: Record<string, never>; errors?: unknown };
          resolve(
            (j.data ?? {}) as Record<string, { repositoryTopics?: { nodes?: { topic?: { name: string } }[] } } | null>,
          );
        } catch (e) {
          reject(e as Error);
        }
      },
    );
  });
}

/** repo 名要拼进 GraphQL 与 API 请求，先把形状钉死：owner/name 两段、无引号/反斜杠/空白/穿越。 */
function assertRepoName(repo: string): { owner: string; name: string } {
  const m = /^([^/"'\\\s]+)\/([^/"'\\\s]+)$/.exec(repo);
  if (!m || m[1] === "." || m[2] === "." || m[1] === ".." || m[2] === "..") {
    throw new Error(`非法 repo 名：${repo}`);
  }
  return { owner: m[1], name: m[2] };
}

async function main() {
  if (!fs.existsSync(FEED)) throw new Error(`找不到 ${FEED}（请在仓库根目录跑）`);
  const cards = JSON.parse(fs.readFileSync(FEED, "utf-8")) as Card[];
  const before = distribution(cards);
  console.log(`【H-04 topics 回填】当前分布：总 ${before.total}｜空 ${before.empty}｜只 1 条 ${before.one}｜≥2 条 ${before.many}`);
  if (CHECK) return;

  // 并发写保护：recopy 批次与 CI 滴灌都会写 feed.json，同时写必互相覆盖
  const ageMs = Date.now() - fs.statSync(FEED).mtimeMs;
  if (!DRY && ageMs < 60_000) {
    console.log(`⚠ data/feed.json 在 ${Math.round(ageMs / 1000)} 秒前刚被写过（可能有批次在跑）→ 拒绝写入。等这一批结束再来，或加 --dry-run 先看命中率。`);
    process.exit(3);
  }

  const targets = cards.filter((c) => !Array.isArray(c.topics) || (c.topics as unknown[]).length === 0);
  const todo = LIMIT > 0 ? targets.slice(0, LIMIT) : targets;
  console.log(`待补 ${targets.length} 张${LIMIT ? `（本次取前 ${todo.length}）` : ""}｜模式 ${DRY ? "dry-run（不写盘）" : "写回"}｜每请求 ${BATCH} 仓`);

  let filled = 0;
  let stillEmpty = 0;
  let errored = 0;
  const samples: string[] = [];
  for (let i = 0; i < todo.length; i += BATCH) {
    const chunk = todo.slice(i, i + BATCH);
    const aliasOf = new Map<string, Card>();
    const parts = chunk.map((c, k) => {
      const alias = `r${k}`;
      aliasOf.set(alias, c);
      const { owner, name } = assertRepoName(c.repo);
      return `${alias}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { repositoryTopics(first: 20) { nodes { topic { name } } } }`;
    });
    let data: Awaited<ReturnType<typeof ghGraphql>> = {};
    try {
      data = await ghGraphql(`{ ${parts.join(" ")} }`);
    } catch (e) {
      console.log(`  ✗ 第 ${i / BATCH + 1} 批整批失败：${(e as Error).message}`);
      errored += chunk.length;
      continue;
    }
    for (const [alias, card] of aliasOf) {
      const node = data[alias];
      const got = (node?.repositoryTopics?.nodes ?? []).map((n) => n?.topic?.name ?? "").filter(Boolean);
      if (!node) {
        errored++;
        continue;
      }
      if (got.length === 0) {
        stillEmpty++;
        continue;
      }
      filled++;
      if (samples.length < 20) samples.push(`${card.repo} → ${got.slice(0, 6).join(", ")}`);
      if (!DRY) card.topics = got;
    }
    console.log(
      `  第 ${i / BATCH + 1} 批（${chunk.length} 仓）：已填 ${filled}｜GitHub 侧本就无 topics ${stillEmpty}｜取数失败 ${errored}`,
    );
  }

  console.log("\n抽样（前 20 条，核对是否与 GitHub 实况一致）：");
  for (const s of samples) console.log(`  ${s}`);

  if (DRY) {
    console.log(`\ndry-run 结束：可填 ${filled} 张 / 取数后仍空 ${stillEmpty} 张 / 失败 ${errored} 张（未写盘）`);
    return;
  }
  const after = distribution(cards);
  fs.writeFileSync(FEED, JSON.stringify(cards, null, 2), "utf-8");
  console.log(
    `\n已写回 ${FEED}｜空 topics ${before.empty} → ${after.empty}｜只 1 条 ${before.one} → ${after.one}｜本次填 ${filled} 张`,
  );
  console.log("下一步（必跑）：npx tsx scripts/gittok-card-invariants.ts && npx tsx scripts/gittok-copy-audit.ts");
}

void main();
