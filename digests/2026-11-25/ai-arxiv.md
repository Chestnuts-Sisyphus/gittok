# ArXiv AI 研究日报 2026-11-25

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-25 03:15 UTC

---

# 📊 ArXiv AI 研究日报 (2026-11-25)

## 1. 今日速览

今日 ArXiv 共收录 50 篇 AI 相关论文，研究焦点正从“单纯扩大参数规模”向“推理机制优化、特定架构创新（如线性注意力与状态空间模型）及垂直领域落地”深度演进。大语言模型（LLM）的训练效率、多模态图文对齐审计，以及强化学习中奖励与策略的对齐成为热门方向。同时，面向边缘端部署的常量存储权重派生、高效序列并行和新型线性注意力机制（如 Gated DeltaNet 的优化）展现了极高的工程实用价值。

---

## 2. 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）
* **[DAiSy: Online Data Selection by Adaptive Utility Estimation for LLM Pretraining](http://arxiv.org/abs/2611.32294v1)**  
  * **作者**: Simin Fan et al.  
  * **一句话说明**: 提出了基于自适应效用估计的模型感知在线数据选择方法，有效解决了大模型预训练中数据筛选的计算瓶颈。
* **[Steerable by Design: Conditional Pretraining for Robust Control of Language Models](http://arxiv.org/abs/2611.32199v1)**  
  * **作者**: Henry Castillo et al.  
  * **一句话说明**: 引入条件预训练，使大模型从底层架构上就具备强大的可控性，改变了传统模型仅靠最后1%训练或推理干预来实现对齐的做法。
* **[Integral DeltaNet: Improved Linear Attention with Adaptive Memory Integration](http://arxiv.org/abs/2611.32063v1)**  
  * **作者**: Junsoo Oh et al.  
  * **一句话说明**: 改进了线性注意力机制，通过自适应记忆整合在保持线性计算复杂度的同时显著提升了长文本建模能力。
* **[FlashQLA: Efficient Context Parallelism for Gated DeltaNet](http://arxiv.org/abs/2611.32039v1)**  
  * **作者**: Xi Lin et al.  
  * **一句话说明**: 为门控 DeltaNet 设计了高效的上下文并行方案，突破了循环状态更新带来的并行化瓶颈。

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）
* **[Can AI Design a Better nnU-Net? A Hypothesis-Driven Architecture Discovery Loop from Failures to Design Rules](http://arxiv.org/abs/2611.32384v1)**  
  * **作者**: Songtao Jiang et al.  
  * **一句话说明**: 提出了一个假设驱动的架构发现循环，让 LLM 智能体从错误模式中诊断并提炼设计规则，超越了传统仅靠标量适应度分数的搜索。
* **[CriticJEPA: World Models Are Better Critics Than Optimizers](http://arxiv.org/abs/2611.32357v1)**  
  * **作者**: Xvyuan Liu et al.  
  * **一句话说明**: 揭示了视觉世界模型作为批评者（Critic）在目标导向规划中优于直接作为优化器的特性，为强化学习提供了更可靠的相对评分。
* **[Rethinking Reasoning Effort Training in Large Language Models: On-Policy Distillation or Reinforcement Learning?](http://arxiv.org/abs/2611.32131v1)**  
  * **作者**: Tianliang Lv et al.  
  * **一句话说明**: 对大模型的“推理努力”（Reasoning Effort）训练进行了系统性对比研究，深入探讨了强化学习与在线自蒸馏（On-Policy）的优劣。

### 🔧 方法与框架（新技术、基准测试、效率优化）
* **[Fractal Neural Synthesis: Constant-Storage Procedural Weight Derivation via Complex Quadratic Boundary Dynamics](http://arxiv.org/abs/2611.32393v1)**  
  * **作者**: Volkan Dagli et al.  
  * **一句话说明**: 利用复二次边界动力学提出分形神经合成，实现常数存储开销的程序化权重派生，为资源受限的边缘微控制器提供了新解。
* **[SPRUNN: Structural Proximity for Pruning in Deep Neural Networks](http://arxiv.org/abs/2611.32317v1)**  
  * **作者**: Babak Rokha et al.  
  * **一句话说明**: 提出基于结构邻近性的深度神经网络剪枝方法，有效兼顾了参数压缩与模型准确率。
* **[Spec-CoFrGeNet: Reparametrizing Continued Fraction Networks for Stable and Accurate Training](http://arxiv.org/abs/2611.32041v1)**  
  * **作者**: Soumyadeep Pal et al.  
  * **一句话说明**: 对连分数神经网络进行重新参数化，解决了其有理形式带来的极点不稳定问题，实现了稳定高效的训练。

### 📊 应用（垂直领域、多模态、代码生成）
* **[ASTERISM: Do Multimodal LLMs Actually Look at All the Images?](http://arxiv.org/abs/2611.32316v1)**  
  * **作者**: Chanseul Cho et al.  
  * **一句话说明**: 对多图像大模型基准进行了深度审计，发现绝大多数多图任务实际上单张图即可回答，揭示了当前多模态评估的盲区。
* **[Beyond Hard Tokens: Predictive Memory for Multimodal Protein Generation](http://arxiv.org/abs/2611.32347v1)**  
  * **作者**: Xiaoliang Shi et al.  
  * **一句话说明**: 引入预测记忆机制替代多模态蛋白质生成中的无状态掩码重置，显著提升了联合蛋白质设计的连贯性。
* **[Online Environment Repair for Coding Agents](http://arxiv.org/abs/2611.32037v1)**  
  * **作者**: Sheng Lu et al.  
  * **一句话说明**: 针对强化学习训练代码智能体时由于测试集缺陷导致的奖励漏洞，提出了在线环境修复机制。
* **[PhysRF-WorldJEPA: Transforming Heterogeneous Large Language Models into Manifold-Decoupled Millimeter-Wave Radar World Models](http://arxiv.org/abs/2611.32113v1)**  
  * **作者**: Yicheng Huang et al.  
  * **一句话说明**: 将异构 LLM 成功转化为毫米波雷达世界模型，实现了在黑暗、烟雾等极端环境下的全天候物理场景理解。

---

## 3. 研究趋势信号

从今日的论文分布来看，**“非自回归与线性注意力的工程落地”**以及**“多模态基准的真实有效性审计”**正在成为强信号。研究人员不再满足于堆砌参数和粗放式的多模态拼接，而是开始审视模型底层的计算效率（如线性注意力 FlashQLA、分形常数存储 FNS）以及评估体系本身的漏洞（如 ASTERISM 对多图基准的拷问）。同时，智能体训练中的“错误驱动学习”与“推理努力控制”正成为对齐领域的新前沿。

---

## 4. 值得精读

1. **[DAiSy: Online Data Selection by Adaptive Utility Estimation for LLM Pretraining](http://arxiv.org/abs/2611.32294v1)**  
   * **推荐理由**: 预训练数据选择是当前大模型军备竞赛的核心痛点。该文提出的自适应效用估计绕过了传统方法沉重的前后向传递开销，为高效、低成本构建高质量预训练数据集提供了极具实用价值的范式。
2. **[Can AI Design a Better nnU-Net? A Hypothesis-Driven Architecture Discovery Loop from Failures to Design Rules](http://arxiv.org/abs/2611.32384v1)**  
   * **推荐理由**: 颠覆了传统的“黑盒神经架构搜索（NAS）”思路，将人类科学家的“错题分析-总结规律”思维引入 LLM 智能体，展示了 AI 如何从失败中自主学习并沉淀可解释的设计规则。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*