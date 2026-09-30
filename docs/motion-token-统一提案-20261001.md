# motion token 统一提案（十二轮 T4·提案不实施，2026-10-01）

> 现状：CSS 侧已有 token（`--motion-fast/base/slow` = 140/200/280ms ＋ `--ease-soft/standard/geometry`），
> 且有单测拦「裸时长」（feed-layout.test.ts「全站 transition 不许出现裸时长」）；
> 但 **TS 动效侧（detail-open.ts / feed-flip.ts）的时长与曲线是字符串字面量**，与 CSS token 各自为政——
> 同一个「落定减速」语义在三处各写一遍（见下表）。本提案把它们收敛成**单一事实源**，
> 值本身不变（零观感变化，纯工程卫生——不动观感就不触发丁D1 目测仪式）。

## 一、现状盘点（三处同义不同源）

| 语义 | 值 | 现在写在哪 | 问题 |
|---|---|---|---|
| 落定减速曲线（快出缓停） | `cubic-bezier(0.22, 0.61, 0.36, 1)` | `detail-open.ts CLOSE_EASING` ＋ `feed-flip.ts FLIP_EASING`（注释互指「同一条曲线」） | 同值双写，改一处漏一处 |
| 微反馈曲线（起步陡） | `cubic-bezier(0.2, 0.8, 0.2, 1)` | CSS `--ease-soft` ＋ `detail-open.ts` 遮罩 fadeIn 注释 | TS 侧没法引用 CSS 变量（WAAPI 字符串） |
| 弹层开时长 | spring 推导（detail-open.ts OPEN/CLOSE_DURATION） | TS | 与 CSS `--motion-slow`（280ms）量级相同但不同源 |
| 翻转补差时长 | `feed-flip.ts FLIP_DURATION = 220` | TS | 「比弹层略快」的注释承诺无 token 表达 |
| CSS 侧时长 | `--motion-fast/base/slow` | styles.css | 已是 token，无问题 |

## 二、提案（三步，全部零观感变化）

1. **新建 `web/src/motion-tokens.ts`**（唯一 TS 侧事实源）：
   ```ts
   export const EASE_SETTLE = "cubic-bezier(0.22, 0.61, 0.36, 1)"; // 落定减速（弹层关闭/FLIP 共用）
   export const EASE_MICRO   = "cubic-bezier(0.2, 0.8, 0.2, 1)";   // 微反馈（=CSS --ease-soft 同值）
   export const DUR_FLIP = 220;   // 信息流翻转（连续操作，比弹层快）
   export const DUR_PANEL = 280;  // 弹层（与 --motion-slow 对齐的注释锚）
   ```
   `detail-open.ts` / `feed-flip.ts` 改为 import；各自原常量保留为 re-export（兼容既有 import 面）。
2. **构建期一致性闸**（小脚本进 CI，或 vitest 源码断言）：断言
   `EASE_SETTLE` === styles.css 里某个新 token `--ease-settle` 的值——即把这条曲线也**升格为 CSS token**，
   两边由 lock 单测钉住（与 `--feed-card-max`/`FEED_CARD_MAX` 双写同法）。
3. **注释口径统一**：「落定减速」在两文件的注释里指向同一个 token 名，不再互写对方文件名。

## 三、不做什么（边界）

- **不改任何时长/曲线的值**（零观感变化 ⇒ 不需要 A/B 截图与目测——丁D1 只管观感改动）。
- 不动 detail-open.ts 的 spring 推导（OPEN_DURATION 是物理模型输出，不是拍的 token，收编反而失真）。
- 不引入新依赖；CSS 侧只**新增** `--ease-settle` 一个声明，不重排既有 token。

## 四、收益与代价

- 收益：动效语义「同名同值」三处归一；下次调「丝滑」只改一处；lock 单测防漂移（现状：值漂了没有任何闸会红）。
- 代价：一个新文件 ＋ 两处 import 改动 ＋ 一条 lock 断言 ≈ 30 行，零风险。
- 建议时机：下一轮工程卫生批次（与「虚拟列表重写」解耦，本轮不动——重构期间禁夹带）。
