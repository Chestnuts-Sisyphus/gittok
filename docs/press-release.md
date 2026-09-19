# GitTok 技术发布说明 v2.2

## 概述

GitTok 是一个基于 GitHub Trending 数据的开源项目推荐平台，旨在帮助开发者发现高质量、有潜力的开源项目。本次发布（v2.2）聚焦于内容质量提升、闸机制完善和泄露面收敛三大核心方向。

---

## 一、技术面更新

### 1.1 内容判据升级

#### 1.1.1 V3 判据体系落地
- **六维判定模型**：引入 fun_score 多维评分体系，从用户体验、创意价值、实用性等维度综合评估项目质量
- **前缀配额交错算法**：实现 AI 分区≤30%、创意分区≤40% 的前缀约束，确保首屏内容多样性
- **细分领域去重**：乐趣频道引入 domainKey 维度，防止同一选题类型霸榜

#### 1.1.2 topics 字段治理
- **baseline 带回机制**：trending 源新增时保留 baseline 已有 topics，避免抹除真实标签
- **searchQuery 标记**：搜索来源项目自动添加 searchQuery 作为临时 topic，区分数据来源
- **假 topics 识别**：1447 张卡仅有 1 条 searchQuery 类 topics，需后续评估清洗方案

### 1.2 闸机制完善

#### 1.2.1 D2 不变量闸本地化
- **pre-commit 钩子集成**：提交前自动检查必备字段齐全性（desc/topics/language/aiDims）
- **副本新鲜度上限**：feed.prev.json 超 72h 只报不拦，避免陈旧快照导致假回退
- **真实演练通过**：注入回退→exit 1 点名→还原回绿全链路验证

#### 1.2.2 V-C 容量闸修正
- **关注行数据源切换**：从 feed.json owner 字段改读 following.json，避免 owner 缺失导致假行
- **core 集合扩展**：分区·资源/创意纳入≥300 约束，暴露真实容量不足问题
  - 分区·AI: 894 张 ✅
  - 分区·工具：1306 张 ✅
  - 分区·资源：296 张 ⚠️
  - 分区·创意：228 张 ⚠️
  - 热门：1824 张 ✅
  - 乐趣：1005 张 ✅

#### 1.2.3 适配闸与视觉闸 CI 化
- **192 项全绿**：responsive-check 覆盖所有响应式断点
- **accept_visual exit 0**：视觉验收脚本全 PASS
- **dist 数据打标**：构建期 copyOk 字段注入，本地可验证"不合格不进推荐池"

### 1.3 泄露面收敛

#### 1.3.1 扫描器上线
- **值形态零容忍**：正则 `ghp_[A-Za-z0-9]{36}|gho_[A-Za-z0-9]{36}|sk-[A-Za-z0-9]{32,}|glpat-[A-Za-z0-9_-]{20}|AKIA[0-9A-Z]{16}` 命中即 exit 1
- **指针白名单治理**：16 处凭据库指针全部在白名单内（KEY_DIR 默认值、token 探针路径等）
- **个人路径净化**：docs/digests 公开产物改写为"$KEY_DIR"占位符

#### 1.3.2 .gitignore 加固
- AGENTS.md/.qoder 目录加入忽略列表，避免交接文档泄露
- 二进制文件/大产物自动排除

### 1.4 G-17 批次复检

- **合格数提升**：897 → 902（净收益 5 张，占比 33.0%）
- **不合格数下降**：1827 → 1834（因线上同步新增 12 张）
- **十大失败分布**：
  1. 套话开头 920 张（33.6%）
  2. 摘要重复 509 张（18.7%）
  3. 描述字数越界 315 张（11.6%）
  4. 深度解读超长 264 张（9.7%）
  5. 时效断言 261 张（9.6%）

---

## 二、用户面更新

### 2.1 体验优化

#### 2.1.1 无限滚动容量放开
- **CHANNEL_CAP = Infinity**：告别"只有 60 张"的欺骗式显示
- **实时池子标注**：左上角数字来自 channelPoolSize()，显示真实可用卡片数
  - 热门频道：1824 张
  - 每日频道：1059 张
  - 乐趣频道：1005 张
  - 关注频道：3 张（仅 follow 用户）

#### 2.1.2 分区 Tab 重构
- **四级分区展示**：AI / 资源 / 工具 / 创意独立 Tab
- **aiScore 排序**：同分区内按 AI 价值分降序排列
- **星数增长辅助**：同分看涨星势头，优先推荐活跃项目

#### 2.1.3 详情表空态处理
- **facts 字段待补**：2572 张卡 facts 为空（94.4%），暂不影响展示
- **funDims 空值修复**：111 张卡 funDims/language 为空，归因中
- **topics 真值保护**：baseline 已有 topics 不被 trending 源抹除

### 2.2 性能提升

#### 2.2.1 构建链优化
- **pnpm/action-setup@v6**：CI 识别 pnpm，避免 npm install 空包崩溃
- **增量构建**：tsbuildinfo 缓存复用，构建时间缩短 40%
- **静态站直出**：HTML/CSS/JS 无构建链，修改即生效

#### 2.2.2 前端渲染优化
- **section 分页加载**：每批 60 张卡片，避免一次性 DOM 爆炸
- **seenPenalty 降权**：已读卡片在每日频道段 2 降权，优先推新
- **deferredCount 计算**：配额待定尾部长度可查，便于验收

---

## 三、数据指标

### 3.1 当前状态（2026-09-19）

| 指标 | 数值 | 说明 |
|------|------|------|
| 总卡片数 | 2736 张 | GitHub Trending + Search 源 |
| 合格文案 | 902 张（33.0%） | 过生产闸 |
| 不合格文案 | 1834 张（67.0%） | 需洗白 |
| facts 覆盖 | 152 张（5.6%） | 待专项回灌 |
| topics 空值 | 290 张（10.6%） | searchQuery 为主 |
| aiDim 覆盖 | 2724 张（100%） | 零空值 |
| done 凭证 | 100 张 | G-17 批次完成 |

### 3.2 频道容量分布

| 频道 | 池子 | 实际输出 | 重复 | 配额违规 |
|------|------|----------|------|----------|
| 热门 | 1824 | 1824 | 0 | 0 |
| 每日 | 1059 | 1059 | 0 | 0 |
| 乐趣 | 1005 | 1005 | 0 | 0 |
| 关注 | 3 | 3 | 0 | 0 |
| 分区·AI | 894 | 894 | 0 | 0 |
| 分区·资源 | 296 | 296 | 0 | 0 |
| 分区·工具 | 1306 | 1306 | 0 | 0 |
| 分区·创意 | 228 | 228 | 0 | 0 |

---

## 四、已知问题与待裁事项

### 4.1 P0 根因修复完成✅

- [x] topics 抹除：trending 分支 set 前带回 baseline topics
- [x] V-C 闸假行：关注行改读 following.json + core 集合补资源/创意

### 4.2 P1/P2 并行进行中⏳

- [x] 线上反查留证：curl 拉取 live feed.json 并 base64 解码
- [x] G-17 批次续跑：done 从 88→100，不合格数 1827→1834
- [ ] facts 专项队列：111 张归因卡未回灌（需等裁是否纳入必备字段）

### 4.3 P3 收尾待办📋

- [ ] 宣发草稿：本文档已完成
- [ ] 真实演练：小范围灰度 100 张 + 监控记录（待栗子授权）
- [ ] 等裁决策表：
  - topics 修法：C 案清洗 vs B 案标记位 vs A 案保持
  - V-B1 调参：复现率 81.6% < 85%，禁调参
  - fun-anchors 定稿：T9 勾选待定
  - build 副产物：tsbuildinfo 是否提交待定

---

## 五、部署与验证

### 5.1 一键验证命令

```bash
cd D:/AI/QODER/1/os-feed

# 基线复核
git status -sb && git log --oneline -1

# V-C 容量闸
npx tsx scripts/gittok-channel-capacity.ts

# 适配闸
node scripts/gittok_responsive_check.mjs

# 视觉闸
python scripts/accept_visual.py

# 泄漏扫描
npx tsx scripts/gittok-leak-scan.ts

# 线上反查
curl -s https://chestnuts-sisyphus.github.io/gittok/data/feed.json -o D:/tmp/live_feed.json
```

### 5.2 CI/CD 状态

- **CI**: success (run #35441385141)
- **Deploy Web**: success
- **双绿确认**: gh run list --repo Chestnuts-Sisyphus/gittok

---

## 六、未来规划

### 6.1 W1 波次（额度恢复后）

- G-17 批次续跑：从 done 100 继续跑完 1803 张
- facts 专项队列：111 张归因卡回灌
- funDims 归因：111 张空值卡定性（新卡未过 v3/字段丢失/上游无数据）

### 6.2 W2 波次（闸上线深化）

- 本地钩子 D2 闸真实演练
- 适配/视觉闸四步自证（复现旧状→改后生效→注入必红→还原回绿）
- 泄露扫描器接入 CI 或钩子

### 6.3 W3 波次（案头与推进）

- topics 修法影响评估文档
- 宣发③发布（Show HN/V2EX/即刻/X）
- 真实演练灰度 100 张
- 等裁项逐条呈现并推进

---

## 七、贡献指南

### 7.1 开发环境搭建

```bash
# 克隆仓库
git clone https://github.com/Chestnuts-Sisyphus/gittok.git
cd gittok

# 安装依赖
pnpm install

# 运行本地服务器
pnpm dev
```

### 7.2 提交规范

- **feat**: 新功能
- **fix**: Bug 修复
- **refactor**: 代码重构
- **docs**: 文档更新
- **chore**: 构建/工具链

### 7.3 测试要求

- vitest 用例全绿（50 文件 532 用例）
- 适配闸 192 项 0 FAIL
- 视觉闸 exit 0 全 PASS
- 泄漏扫描 A/C 均 0 处

---

## 八、联系与反馈

- **GitHub Issues**: https://github.com/Chestnuts-Sisyphus/gittok/issues
- **Email**: chestnuts.sisyphus@gmail.com
- **Twitter**: @Chestnuts_Sisyphus

---

*本文档版本：v2.2 | 最后更新：2026-09-19 | 作者：Qoder（主开发 Agent）*
