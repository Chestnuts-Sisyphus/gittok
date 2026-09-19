# GitTok 等裁决策表 v2.2

> 建立时间：2026-09-19 | 基线：任务书 `交接-GitTok-泄露面与闸上线 - 下会话任务书 -0919-04.md`  
> 用途：记录所有待栗子拍板事项，按优先级排序，每条包含现状/方案/影响/建议

---

## 一、P0 根因修复（已完成✅）

### 1.1 topics 抹除问题

**现状：**
- trending 源新增项目时整条 set 会抹掉 baseline 已有的真 topics
- 1447 张卡只有 1 条 searchQuery 类 topics（占 52.9%）

**已实施修复：**
```typescript
// src/feed/index.ts:1182
topics: repoMap.get(t.fullName)?.topics ?? [],
```
trending 分支 set 前带回 baseline topics

**验证：**
- ✅ baseline 已有 topics 不被抹除
- ✅ searchQuery 作为临时 topic 保留

**状态：** ✅ 已完成，无需再裁

---

### 1.2 V-C 闸假行

**现状：**
- core 频道集合缺少"分区·资源/创意"，导致假绿
- "关注"行从 feed.json owner 字段读取，owner 缺失导致假行（显示 2724 张实际 3 张）

**已实施修复：**
1. `scripts/gittok-channel-capacity.ts:134`
   ```typescript
   const core = ["热门", "乐趣", "分区·AI", "分区·工具", "分区·资源", "分区·创意"];
   ```
2. `scripts/gittok-channel-capacity.ts:95-97`
   ```typescript
   const followingData = JSON.parse(fs.readFileSync(...)) as any;
   const followingUsers = followingData.users || {};
   const allOwners = new Set(Object.keys(followingUsers).filter(Boolean));
   ```

**验证结果：**
```bash
npx tsx scripts/gittok-channel-capacity.ts
# [V-C] 不通过：
#   x 分区·资源 只有 296 张（要求至少 300）
#   x 分区·创意 只有 228 张（要求至少 300）
```

**暴露真实问题：**
- 分区·资源：296 张 < 300（差 4 张）
- 分区·创意：228 张 < 300（差 72 张）

**状态：** ✅ 已完成，需后续补数据

---

## 二、P1/P2 并行推进（部分完成⏳）

### 2.1 facts 专项队列

**现状：**
- facts 空值卡数：2572 张（占 94.4%）
- facts 有值卡数：152 张（占 5.6%）
- 任务书记载："facts 是否纳入必备字段未决（纳入即全库判不合格）"

**待裁方案：**

| 方案 | 描述 | 影响面 | 工作量 | 推荐度 |
|------|------|--------|--------|--------|
| A | 保持现状（非必备） | 无 | 无 | ⭐⭐⭐⭐⭐ |
| B | 纳入必备字段 | 全库 2736 张判不合格 | 需全库回灌 | ⭐⭐ |
| C | 渐进式纳入 | 先 10% 试点，逐步扩大 | 分批次回灌 | ⭐⭐⭐⭐ |

**方案 A 理由（推荐）：**
- facts 字段当前不影响核心功能展示
- 2572 张卡需逐张回灌，工作量大
- 可等到 G-17 批次完成后统一处理

**方案 C 理由（备选）：**
- 渐进式降低风险
- 可边跑批边回灌
- 但需修改判定链产物（可能触 JUDGE_VERSION）

**影响评估：**
- 若纳入必备字段：当前合格 902 张→0 张（全库不合格）
- 需重新跑批量构建 + 文案复检

**建议：** 暂维持现状（方案 A），待 G-17 批次完成后评估

**状态：** ⏳ 等待栗子裁 A/B/C

---

### 2.2 funDims/language 空值归因

**现状：**
- funDims 空值：111 张（占 4.1%）
- language 空值：111 张（占 4.1%）
- 0918 记的是 69 张，为何扩量至 111 张？

**待查明原因：**
1. 新卡未过 v3 重判（funScore > 0 才进池，空 funDims 的卡被过滤）
2. 字段丢失（批量构建期丢弃）
3. 上游无数据（GitHub API 本身无 language 信息）

**归因流程：**
```bash
# 1. 提取 111 张空值卡 repo 列表
node -e "const f=require('./data/feed.json'); const empty=f.filter(c=>!c.funDims||!c.language); console.log(empty.map(c=>c.repo).join('\n'));" > D:/tmp/fundims_empty_repos.txt

# 2. 逐张检查来源
# - 是否在 baseline 就有？
# - 是否 trending 新增？
# - 是否 search 来源？
```

**建议：** 
- 先归因再决定处理方式
- 若是新卡未过 v3 → 调整 v3 判据或跳过这些卡
- 若是字段丢失 → 修复批量构建脚本

**状态：** ⏳ 待归因分析

---

## 三、P3 收尾交付（部分完成⏳）

### 3.1 topics 修法三方案

**背景：**
- 1447 张卡只有 1 条 searchQuery 类 topics
- 需决定如何处理"假 topics"

**三方案对比：**

| 方案 | 描述 | 优点 | 缺点 | 风险 |
|------|------|------|------|------|
| A | 保持现状 | 零改动，稳定 | 用户体验差（只有 searchQuery） | 低 |
| B | 加标记位 | 区分数据来源，透明 | 需前端改造，后端加字段 | 中 |
| C | 清洗回灌 | 用户体验好 | 触判定链，需改 JUDGE_VERSION | 高 |

**方案 A（推荐）：**
- 依据：任务书硬禁区"不改 CI 全站判定口径"
- 影响：topics 字段保持不变，searchQuery 作为补充信息展示

**方案 B（备选）：**
- 需新增 `topicSource` 字段（trending/search/baseline）
- 前端展示时区分颜色/图标
- 不涉及判定链改动

**方案 C（不推荐）：**
- 需修改 taxonomy.ts 判据（禁碰）
- 需改 JUDGE_VERSION（指纹变更）
- 需全库重判（2736 张 × LLM）

**建议：** 优先方案 A，次选方案 B

**状态：** ⏳ 等待栗子裁 A/B/C

---

### 3.2 V-B1 调参

**现状：**
- 复现率：81.6% < 85%（红线）
- 难例：30/40 = 75.0%

**任务书约束：**
- 硬禁区："不为 V-B1 达标调参"
- 等裁项："V-B1 调参"在列但未获裁

**已尝试方案（历史）：**
- fun_score 阈值调整（0.5→0.3）→ 无效
- 增长动量权重调整 → 无效
- 创意配额从 40%→35% → 无效

**根本原因分析：**
- V-B1 判据本身过于严格
- fun-anchors 定稿未完成（T9 勾选待定）
- 部分难例确实不符合"乐趣"定义

**建议：**
1. 先完成 fun-anchors 定稿（见 3.3）
2. T9 勾选后重新评估复现率
3. 若仍<85%，考虑下调红线至 80%（需栗子裁）

**状态：** ⏳ 等待 fun-anchors 定稿 + T9 勾选

---

### 3.3 fun-anchors 定稿 + T9 勾选

**现状：**
- fun-anchors 是 V-B1 的核心判据
- T9 是其中一个 anchor 项（具体定义需查 taxonomy.ts）

**待办事项：**
1. 查阅 taxonomy.ts 确认 T9 定义
2. 评估 T9 是否应纳入 fun-anchors
3. 若纳入，需更新 fun-anchor-check.ts

**风险：**
- 修改 fun-anchors → 触判定链 → 需改 JUDGE_VERSION
- 全库重判成本高

**建议：** 
- 先查 taxonomy.ts 确认 T9 语义
- 若 T9 确属"乐趣"范畴 → 纳入并等裁
- 若 T9 不属于 → 保持原状

**状态：** ⏳ 待查 taxonomy.ts + 栗子裁

---

### 3.4 build 副产物治理

**现状：**
- web/tsconfig.tsbuildinfo 文件持续变化
- git status 显示 modified
- 是否应加入.gitignore 或提交？

**选项对比：**

| 选项 | 描述 | 优点 | 缺点 |
|------|------|------|------|
| A | 加入.gitignore | 减少噪音，clean status | 本地构建快，他人构建慢 |
| B | 提交到仓库 | 构建缓存复用 | .git 体积增大 |
| C | 生成时删除 | 零存储 | 每次全量重建 |

**建议：** 选项 A（加入.gitignore）
- tsbuildinfo 是构建中间产物，非必需
- 类似 node_modules/.cache
- 任务书提到"build 副产物"等裁，暗示可不提交

**待执行：**
```bash
# 添加到 .gitignore
echo "web/*.tsbuildinfo" >> .gitignore
git add .gitignore
git commit -m "chore: ignore tsbuildinfo build artifacts"
```

**状态：** ⏳ 等待栗子裁 A/B/C

---

## 四、其他待裁项

### 4.1 真实演练灰度发布

**任务要求：**
- P3-7: 小范围灰度 100 张 + 监控记录

**待裁点：**
1. 灰度范围：100 张如何选取？（随机/热门/新入库）
2. 监控指标：点击率/停留时长/分享率？
3. 发布渠道：GitHub Issues/Discord/邮件列表？

**建议：**
- 灰度选取：热门频道前 100 张（曝光度高）
- 监控：手动观察 GitHub Issues 反馈
- 发布：先内部测试，稳定后再对外

**状态：** ⏳ 需栗子授权外部可见动作

---

### 4.2 宣发③发布

**任务要求：**
- P3-D5: 三步计划③宣发（Show HN/V2EX/即刻/X）

**待办内容：**
1. Show HN 帖（Hacker News）
2. V2EX 帖（国内开发者社区）
3. 即刻动态（中文产品社区）
4. X/Twitter 推文（国际影响力）

**草稿包准备：**
- 已创建 docs/press-release.md（技术面 + 用户面）
- 需补充截图/演示链接/关键数据

**建议：**
- 先 Show HN（英文受众广）
- 再 V2EX（中文开发者集中）
- 即刻/X 可选（视时间精力）

**状态：** ⏳ 需栗子授权发布动作（禁给人发外部消息）

---

## 五、决策记录模板

### 使用方式

1. **发起裁议**：在对应章节填写"待裁方案"和"建议"
2. **栗子拍板**：回复"A/B/C"或自定义方案
3. **落地执行**：Agent 按裁决议执行并提交 commit
4. **记录归档**：本文件更新"状态"栏为✅或❌

### 优先级排序

| 优先级 | 事项 | 截止时间 | 阻塞关系 |
|--------|------|----------|----------|
| P0 | topics 修法 | W1 | 影响用户体验 |
| P1 | facts 专项队列 | W2 | 依赖 G-17 完成 |
| P1 | funDims 归因 | W1 | 影响数据质量 |
| P2 | fun-anchors 定稿 | W2 | 依赖 taxonomy 审查 |
| P2 | V-B1 调参 | W3 | 依赖 fun-anchors |
| P3 | build 副产物 | W1 | 无阻塞 |
| P3 | 真实演练 | W2 | 需授权 |
| P3 | 宣发③ | W3 | 需授权 |

---

## 六、附录

### A. 相关文档索引

- `D:/AI/QODER/1/os-feed/scripts/gittok-fun-anchor-check.ts` - V-B1 判据实现
- `D:/AI/QODER/1/os-feed/src/feed/taxonomy.ts` - 分区/乐趣判据定义
- `D:/AI/QODER/1/os-feed/scripts/gittok-channel-capacity.ts` - V-C 容量闸
- `docs/press-release.md` - 宣发草稿

### B. 命令速查

```bash
# facts 空值统计
node -e "const f=require('./data/feed.json'); console.log('facts 空:', f.filter(c=>!c.facts||!Array.isArray(c.facts)||c.facts.length===0).length);"

# funDims 空值统计
node -e "const f=require('./data/feed.json'); console.log('funDims 空:', f.filter(c=>!c.funDims||c.funDims.length===0).length);"

# topics 分布统计
node -e "const f=require('./data/feed.json'); const m=new Map(); for(const c of f){const n=c.topics?.length??0;m.set(n,(m.get(n)??0)+1)}console.log(m)"
```

### C. 会议记录

- **2026-09-18**: 初次讨论 topics 抹除问题 → 确定 baseline 带回方案
- **2026-09-19**: V-C 闸假行暴露 → 扩展 core 集合 + 关注行改读 following.json
- **2026-09-19**: 等裁决策表建立 → 系统梳理待办事项

---

*本文档版本：v2.2 | 最后更新：2026-09-19 | 作者：Qoder（主开发 Agent）*
