/**
 * 单文件打包：src/index.ts（+ 站点共享模块 + MCP SDK + zod）→ dist/index.js。
 *
 * 为什么打成单文件：
 *  1. 分发零依赖——用户 `node dist/index.js` 即可跑（也便于 Claude Desktop 之类的客户端直连）；
 *  2. 站点共享模块（src/feed/channel-policy.ts、web/src/search.ts、web/src/payload-split.ts）
 *     在构建时**内联自同一份源码**，不存在手抄第二套排序逻辑；
 *  3. test/parity.test.mjs 会把打包产物与源码直跑的结果逐条比对，防止内联后漂移。
 */

import { build } from "esbuild";
import { readFile, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });

const result = await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  sourcemap: false,
  minify: false,
  legalComments: "none",
  // shebang 由 entry（src/index.ts 首行）自带，esbuild 会置顶——不要再加 banner，否则双 shebang
  logLevel: "info",
  metafile: true,
});

const outputs = Object.entries(result.metafile.outputs);
for (const [file, info] of outputs) {
  console.log(`${file}: ${(info.bytes / 1024).toFixed(0)} KB`);
}

// 防线：产物必须是「恰好一行 shebang 开头」的合法 ESM
const head = (await readFile("dist/index.js", "utf8")).split("\n", 3);
if (head[0] !== "#!/usr/bin/env node" || head[1]?.startsWith("#!")) {
  throw new Error(`产物 shebang 异常：line1=${JSON.stringify(head[0])} line2=${JSON.stringify(head[1])}`);
}
console.log("shebang check OK");
