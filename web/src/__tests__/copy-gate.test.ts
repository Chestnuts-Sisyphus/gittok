// 呈现闸（COPY-08）行为锁：不合格卡只挡推荐池，缺键 fail-open，开关可整体回退。
import { describe, expect, it } from "vitest";

import { EXCLUDE_NONCOMPLIANT_FROM_RECOMMEND, keepForRecommend } from "../copy-gate.ts";
import { cardCopyOk } from "../../../src/feed/copy-ok.ts";

describe("copy-gate 推荐池呈现闸", () => {
  it("copyOk=false 剔出推荐池，=true/缺键放行（fail-open）", () => {
    expect(keepForRecommend({ copyOk: false })).toBe(false);
    expect(keepForRecommend({ copyOk: true })).toBe(true);
    expect(keepForRecommend({})).toBe(true);
  });

  it("开关常量为开（09-19 栗子口径：站内展示必须合规）", () => {
    expect(EXCLUDE_NONCOMPLIANT_FROM_RECOMMEND).toBe(true);
  });
});

describe("cardCopyOk 与生产闸同判据", () => {
  const good = {
    repo: "foo/bar",
    zone: "工具",
    funScore: 0,
    domainTags: ["命令行"],
    facts: [],
    summaryCn: "一个把常见命令行任务用现代语法重写的瑞士军刀式小工具，装完即用",
    reasonCn:
      "这个项目解决的真实痛点是老牌工具指令难记。它把 grep、curl、docker 这些高频动作重新包装，" +
      "上手只要记一个动词。安装用 brew install 或 npm 全局装一条命令即可，之后 man 里查全部子命令。" +
      "它的取舍在于覆盖广度优先，冷门场景仍回退原生工具。适合每天在终端里工作超过两小时的人，" +
      "把重复劳动压缩成一两个手势。",
    detailCn:
      "简单来说这类工具的核心是子命令注册表。第一段讲架构：入口按参数分发到各子命令模块。" +
      "第二段讲上手：npm 全局安装后直接调用，配置放在用户目录的 toml 里。" +
      "第三段讲取舍：追求覆盖广度而非单点深度。第四段讲适合谁：重度终端用户。" +
      "第五段讲边界：脚本自动化仍建议原生工具，避免语法糖遮蔽底层行为差异。",
  };

  it("套话开头 + 一句话越界的卡判不合格", () => {
    expect(cardCopyOk({ ...good, summaryCn: "简单来说这是一个很棒的工具" })).toBe(false);
  });

  it("detailCn 缺失按 undefined 送闸（深度解读缺失必不合格）", () => {
    expect(cardCopyOk({ ...good, detailCn: "" })).toBe(false);
  });
});
