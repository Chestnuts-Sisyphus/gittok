/**
 * 本地路径边界检查（2026-09-24 五轮 T7 乙B4）——**只做拒绝，不做改写**。
 *
 * 由来：Mimosa deep 扫描把「变量 → path.join → fs.readFile/writeFile」这条链报了 4 处
 * CWE-22（`src/config.ts:151`、`src/index.ts:453`、`src/report.ts:376`、`src/social.ts:23`）。
 * 现实风险≈0——那些变量全部来自本仓自己的代码（日期串、写死的文件名）或操作者自己的命令行；
 * 能改它的人已经能在这台机器上执行命令了。**这是卫生问题，不是漏洞。**
 * 但仍然补一道边界，理由两条：① 成本≈0；② 下次扫描不必再报同样的东西，噪声少了真问题才显眼。
 *
 * 为什么「拒绝」而不是「清洗」：把 `../x` 静默改写成 `x`，等于把一个错误变成一个**猜不到的
 * 写入位置**，比直接报错更难查。这里一律抛错，让调用方/操作者立刻看到。
 */

import path from "node:path";

/** 单段路径（文件名或目录名）的合法性：不许绝对路径、不许分隔符、不许 `.` / `..`、不许空。 */
export function assertSafeSegment(seg: string, what = "路径段"): string {
  if (typeof seg !== "string" || seg.length === 0) throw new Error(`${what}为空`);
  if (seg.includes("\0")) throw new Error(`${what}含 NUL：${JSON.stringify(seg)}`);
  if (seg === "." || seg === "..") throw new Error(`${what}是相对路径段：${seg}`);
  if (seg.includes("/") || seg.includes("\\")) throw new Error(`${what}含路径分隔符：${seg}`);
  if (/^[A-Za-z]:/.test(seg)) throw new Error(`${what}是盘符路径：${seg}`);
  return seg;
}

/** 读路径的输入检查：不禁止绝对路径（命令行传绝对路径是既有用法），但禁「..」段。 */
export function assertNoParentTraversal(input: string, what = "路径"): string {
  if (typeof input !== "string" || input.length === 0) throw new Error(`${what}为空`);
  if (input.includes("\0")) throw new Error(`${what}含 NUL`);
  const segs = input.split(/[\\/]+/);
  if (segs.includes("..")) throw new Error(`${what}含上级目录段「..」：${input}`);
  return input;
}

/**
 * 目标边界：规范化成绝对路径后必须仍在 `root` 之内（`root` 自身算在内）。
 * 这是**第二道**——第一道是逐段拒绝（`assertSafeSegment`）；两道都在，是因为
 * 「段合法」不等于「拼起来还在根内」（`path.join` 会把绝对段直接吞掉）。
 */
export function assertInside(root: string, target: string, what = "路径"): string {
  const r = path.resolve(root);
  const t = path.resolve(r, target);
  if (t !== r && !t.startsWith(r + path.sep)) {
    throw new Error(`${what}越出根目录：${t}（根 ${r}）`);
  }
  return t;
}
