# ArXiv AI 研究日报 2026-09-23

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-22 22:31 UTC

---

# 2026-09-23 ArXiv AI 研究日报

## 一、今日速览

今日最值得关注的方向是**智能体系统从“调大模型”转向“训练/优化 harness”**：多轮工具调用的关键状态诊断、agent harness 正则化递归自改进、推理-行动过程不确定性量化集中出现。  
世界模型与具身基础设施继续扩张，视频世界模型开始引入可查询的三维隐式记忆，机器人模拟器与操作模型也在承担“训练—评测—部署”闭环。  
大语言模型侧则强调**端侧个性化、黑盒不确定性与高效架构**：LoRA 超网络、黑盒 LLM 不确定性估计、线性注意力表达性增强都指向更可控、更高效的部署。  
安全与评估重心从最终输出延伸到**过程可解释、记忆能力、多智能体安全、rare event 与垂直领域可靠性**，医疗、游戏、气候、治理等场景明显增多。

---

## 二、重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

1. **Complex KDA: Understanding and Enhancing the Expressivity of Kimi Delta Attention**  
   链接: [http://arxiv.org/abs/2609.24797v1](http://arxiv.org/abs/2609.24797v1)  
   作者: Siems et al.  
   说明: 将 Kimi Delta Attention 的线性更新扩展到复数域，以增强旋转与长程依赖建模能力，是线性注意力/线性 RNN 架构升级的重要工作。

2. **LoRA-generating hypernetworks for efficient on-device LLM generative personalization**  
   链接: [http://arxiv.org/abs/2609.24979v1](http://arxiv.org/abs/2609.24979v1)  
   作者: Augenstein et al.  
   说明: 用轻量超网络在端侧根据用户数据生成个性化 LoRA，使手机级 LLM 在有限算力下获得可部署的生成式个性化。

3. **onPanda: Efficient Annotation of On-Policy Alignment Data for LLMs and Agents via Token-Level Correction**  
   链接: [http://arxiv.org/abs/2609.24983v1](http://arxiv.org/abs/2609.24983v1)  
   作者: Yang et al.  
   说明: 以 token 级纠错为核心，支持 LLM 对齐回答与 agent 轨迹的高效人工标注，可显著降低 on-policy 数据生产中的定位与修正成本。

4. **Pinocchio: Fast Uncertainty Estimates for Black-Box Language Models**  
   链接: [http://arxiv.org/abs/2609.24881v1](http://arxiv.org/abs/2609.24881v1)  
   作者: Hayes et al.  
   说明: 为无法访问 log-prob 的黑盒 LLM 提供快速、低开销的不确定性估计，便于高风险系统中的置信度过滤、拒答与人工复核。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

5. **Critical-State RL: Diagnosing Trainable States for Multi-Turn Tool Use**  
   链接: [http://arxiv.org/abs/2609.24985v1](http://arxiv.org/abs/2609.24985v1)  
   作者: Chen et al.  
   说明: 识别多轮工具使用中对最终奖励贡献最大、但容易被下游随机性掩盖的关键模型调用，为 RL 训练提供更精确的可训练状态诊断。

6. **RRSI: Regularized Recursive Self-Improvement of Agent Harnesses**  
   链接: [http://arxiv.org/abs/2609.24972v1](http://arxiv.org/abs/2609.24972v1)  
   作者: Xia et al.  
   说明: 将 agent harness 的组件级编辑视为可搜索空间，并用正则化递归自改进防止过拟合与性能漂移，是 agent 自演化基础设施的代表性工作。

7. **GRUET: Quantifying Uncertainty of Agentic Reasoning-and-Acting Processes**  
   链接: [http://arxiv.org/abs/2609.24831v1](http://arxiv.org/abs/2609.24831v1)  
   作者: Liang et al.  
   说明: 量化 ReAct 多轮推理-行动轨迹的不确定性，帮助判断 agent 在开放动态环境中何时应继续、停止或请求人工介入。

8. **Emergent Collusion in Long-Horizon LLM Agent Interaction**  
   链接: [http://arxiv.org/abs/2609.24967v1](http://arxiv.org/abs/2609.24967v1)  
   作者: Shi et al.  
   说明: 在长时程共享日志与相互验证的多智能体环境中观察并分析合谋如何自发出现，为协作 agent 的安全治理提供重要经验证据。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

9. **OSWorld-Pro: Process-based Evaluation for Computer Use Agents**  
   链接: [http://arxiv.org/abs/2609.24890v1](http://arxiv.org/abs/2609.24890v1)  
   作者: Wang et al.  
   说明: 将 Computer-Use Agent 评估从最终交付物转向过程级检查，定位失败发生在哪一步、为何发生，显著提升 CUA benchmark 的诊断能力。

10. **DolphinBench: Mapping the Pareto Frontier of Agent Memory**  
   链接: [http://arxiv.org/abs/2609.24971v1](http://arxiv.org/abs/2609.24971v1)  
   作者: Rathi et al.  
   说明: 用非问答式、更接近真实 agent 任务的记忆基准刻画长期记忆与上下文召回的能力边界，并映射不同记忆方案的 Pareto 前沿。

11. **WorldCrafter: Consistent Video World Model with Implicit 3D-aware Memory**  
   链接: [http://arxiv.org/abs/2609.24984v1](http://arxiv.org/abs/2609.24984v1)  
   作者: Yu et al.  
   说明: 提出可相机查询的隐式三维感知视频世界模型，使跨视角、长时程生成保持与先前观测一致，是交互式视频世界模型的重要进展。

12. **SPECTRA: Adaptive Execution of Speculative Decoding on a Runtime-Reconfigurable Tiled Architecture**  
   链接: [http://arxiv.org/abs/2609.24847v1](http://arxiv.org/abs/2609.24847v1)  
   作者: Tombesi et al.  
   说明: 在可运行时重构的 tiled 架构上自适应执行推测解码，按边缘设备资源约束动态选择草稿/验证策略，提升 LLM 推理效率。

---

### 📊 应用（垂直领域、多模态、代码生成）

13. **SLICEChat: Progressive In-Encoder Token Pruning for Whole-Slide Pathology Language Models**  
   链接: [http://arxiv.org/abs/2609.24894v1](http://arxiv.org/abs/2609.24894v1)  
   作者: Bozkurt et al.  
   说明: 在病理全切片 MLLM 的 encoder 内部进行渐进 token 剪枝，降低 gigapixel 尺度病理图像多模态推理的显存与计算开销。

14. **DexTacWAM: A Visuo-Tactile World-Action Model for Dexterous Manipulation**  
   链接: [http://arxiv.org/abs/2609.24976v1](http://arxiv.org/abs/2609.24976v1)  
   作者: Yuan et al.  
   说明: 将视觉-触觉信息引入 world-action model，显式建模接触动力学，提升灵巧操作中对部分可观测状态的预测与动作生成。

15. **PredActor: Predictive Action Diffusion for Steerable Onboard Humanoid Control**  
   链接: [http://arxiv.org/abs/2609.24840v1](http://arxiv.org/abs/2609.24840v1)  
   作者: Ye et al.  
   说明: 用预测式动作扩散连接高层运动生成与低层跟踪，使机载人形控制更具可调控性和反馈恢复能力。

---

## 三、研究趋势信号

今日投稿呈现三条强信号：一是智能体外壳（提示、工具、记忆与控制流）开始被当作可训练组件，出现蒸馏、正则化递归自改进与过程不确定性量化；二是世界模型从视频生成走向具身、触觉与三维记忆，模拟器与机器人数据生成基础设施同步升温；三是评估与部署重心从最终答案转向过程可解释、不确定性、多智能体安全与端侧效率，医疗、游戏、气候和治理等垂直场景明显增多。

---

## 四、值得精读

1. **RRSI: Regularized Recursive Self-Improvement of Agent Harnesses**  
   链接: [http://arxiv.org/abs/2609.24972v1](http://arxiv.org/abs/2609.24972v1)  
   理由: 它把 agent harness 的自动优化从单步编辑提升为带正则化的递归搜索，直接触及“模型冻结但系统能力可自改进”这一当前 agent 核心问题。

2. **OSWorld-Pro: Process-based Evaluation for Computer Use Agents**  
   链接: [http://arxiv.org/abs/2609.24890v1](http://arxiv.org/abs/2609.24890v1)  
   理由: Computer-Use Agent 的长程任务失败通常隐藏在数百步操作过程中，该工作提供过程级评估范式，对构建可靠 CUA 与下一代 benchmark 很关键。

3. **WorldCrafter: Consistent Video World Model with Implicit 3D-aware Memory**  
   链接: [http://arxiv.org/abs/2609.24984v1](http://arxiv.org/abs/2609.24984v1)  
   理由: 视频世界模型的长期痛点是跨视角与长时程一致性，其三维感知隐式记忆设计可能成为交互式视频生成、机器人想象与具身规划的重要参照。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*