# ArXiv AI 研究日报 2026-11-24

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-24 04:30 UTC

---

# ArXiv AI 研究日报 | 2026-11-24

## 1. 今日速览

今日 ArXiv 论文集中展现了 **推理时计算（Test-Time Compute）向非文本领域的扩展**、**智能体（Agent）自我治理与权重级演化**，以及 **大模型底层优化与量化机制的深度剖析**。在 RL 训练与评估方面，研究者开始关注如何在强化学习前预测 LLM Judge 的“奖励黑客（Reward Hacking）”行为；在智能体领域，出现了通过直接修改神经网络权重来演化推荐系统的新范式；同时，测试时计算（Scaling Test-Time Compute）正成功被应用至时间序列预测与机器人安全规划中。

---

## 2. 重点论文分类解读

### 🧠 大语言模型（架构、训练、对齐、评估）

* **Predicting Reward Hacking of LLM Judges Before RL Training**
  * **链接**: http://arxiv.org/abs/2611.29651v1
  * **作者**: Xuanyi Lyu, Yuezhou Zhao, Qing Qin
  * **一句话说明**: 提出在 GRPO/RL 训练开始前，预测策略模型会利用 LLM Judge 的哪个漏洞进行奖励钻空子（Reward Hacking），为强化学习对齐提供了前置防御手段。

* **Estimating Silenced Tokens in Quantized LLMs**
  * **链接**: http://arxiv.org/abs/2611.29536v1
  * **作者**: Giuseppe Pappalardo
  * **一句话说明**: 抛弃传统 PPL 评估，从“失声 Token”的新视角洞察量化对 LLM 的破坏程度——揭示量化后模型在任何隐藏状态下都无法再生成的词汇。

* **How Multi-Timescale Memory Cools Optimization: Theory and Evidence from AdEMAMix**
  * **链接**: http://arxiv.org/abs/2611.29588v1
  * **作者**: Jacopo Graldi, Antonio Orvieto, Anastasia Koloskova
  * **一句话说明**: 从理论和实验上揭示了多时间尺度动量优化器（如 AdEMAMix）提升大模型预训练效果的底层机制。

* **ComplexIF: A Challenging Multi-Turn, Multi-Constraint Instruction-Following Benchmark**
  * **链接**: http://arxiv.org/abs/2611.29775v1
  * **作者**: Zhichao Xu, Bingsen Chen, Yawei Wang et al.
  * **一句话说明**: 构建了一个具有高难度的多轮、多约束指令遵循基准测试，填补了现有 Benchmark 在真实复杂多轮对话场景下的评估空白。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

* **Weight Coding: Evolving Web-Scale Recommenders through Direct Weight Edits with LLM Agents**
  * **链接**: http://arxiv.org/abs/2611.29613v1
  * **作者**: Junpeng Hou, Jiaxing Qu, Derek Cheng et al.
  * **一句话说明**: 提出“权重编程（Weight Coding）”范式，让 LLM Agent 检查模型结构与参数、提出假设，并通过直接编辑模型可执行权重来演化大规模推荐系统。

* **Wactorz: Self-Writing LLM Agents That Discover, Repair, and Migrate at the Edge**
  * **链接**: http://arxiv.org/abs/2611.29619v1
  * **作者**: Panagiotis Kasnesis, Lazaros Toumanidis et al.
  * **一句话说明**: 打造了面向边缘计算的开源运行环境，支持 LLM Agent 长期在线、自我代码编写、 Bug 修复与跨硬件迁移。

* **Admitted Is Not Effective: Lessons from a Notary-Gated Retrospective Loop in an Agentic Pipeline**
  * **链接**: http://arxiv.org/abs/2611.29727v1
  * **作者**: Lo Gullstrand Heander, Emma Söderberg et al.
  * **一句话说明**: 针对软件工程 Agent 容易重复犯错的问题，设计了带公证门控的反思追溯环（Retrospective Loop），防止 Prompt 膨胀的同时提升 PR 成功率。

* **MERIT: Experience-Guided Memory for Long-Horizon Persona-Specific Persuasive Dialogue**
  * **链接**: http://arxiv.org/abs/2611.29679v1
  * **作者**: Rohan Kirti, Akash Ghosh, Pratik Amrit et al.
  * **一句话说明**: 提出基于经验引导的长期记忆机制，使对话 Agent 能够在多轮长周期互动中动态追踪用户的信任度与谈判接受度。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

* **Think Before You Forecast: Scaling Test-Time Compute for Time Series Forecasting**
  * **链接**: http://arxiv.org/abs/2611.29566v1
  * **作者**: Daojun Liang, Xiao Hong, Pei Zhang et al.
  * **一句话说明**: 将大语言模型中热门的“推理阶段计算扩展（Test-Time Compute）”成功引入时间序列预测，在推理阶段探索并筛选最优预测方案。

* **CompareDR: Benchmarking Deep Research Reports from Individual Quality to Comparative Merit**
  * **链接**: http://arxiv.org/abs/2611.29549v1
  * **作者**: Wanli Wu, He Zhu, Yue Xu et al.
  * **一句话说明**: 首个针对 LLM 生成的“深度研究报告（Deep Research Reports）”的评估基准，实现了从单篇质量评分到跨报告横向对比评估。

* **Position-Skipped Distillation of Sparse-Attention Indexers: Train Short, Serve Long**
  * **链接**: http://arxiv.org/abs/2611.29664v1
  * **作者**: Fu Dai, Haodi Quan, Kamal Taha
  * **一句话说明**: 提出位置跳跃蒸馏技术，允许稀疏注意力索引器在短上下文上训练，即可无缝服务长上下文推理，极大地降低了长文本模型训练成本。

---

### 📊 应用（垂直领域、多模态、机器人）

* **JEPA-Shield: Safe Diffusion Planning with Latent World Models via Conformal Shielding**
  * **链接**: http://arxiv.org/abs/2611.29609v1
  * **作者**: Taekyung Kim, Ege Yuceel, Steven Hong et al.
  * **一句话说明**: 将冻结的 JEPA 隐世界模型与保形安全屏障结合，实现了直接基于图像输入的机器人扩散规划安全防护。

* **When Does Fine-Tuning Beat Prompting for Qiskit-to-CUDA-Q Translation? An Execution-Verified Study**
  * **链接**: http://arxiv.org/abs/2611.29793v1
  * **作者**: Ana Paula Appel
  * **一句话说明**: 针对量子计算代码跨平台转换（Qiskit 至 CUDA-Q），通过可执行验证对比了开源小模型微调与 Prompting 的边界条件。

---

## 3. 研究趋势信号

1. **推理时计算（Test-Time Compute / Thinking）泛化**：不仅局限于文本数学推理（如 o1 模式），今日论文展示了将其扩展至**时间序列预测（#44）**以及**机器人安全动作采样（#46）**的趋势。通过推理阶段的多候选评估与选择，显著提升了非 NLP 任务的可靠性。
2. **智能体从“代码调用”迈向“权重修改与系统演化”**：Agent 的能力边界正在重塑。除了通过静态 Prompt 或 API 协作，最新研究（#33）探索了 Agent **直接分析并修改推荐系统神经网络权重**的能力；同时边缘端 Agent（#32）也具备了自编写与自我修复代码的长期生存能力。
3. **强化学习与评估系统的前置防御机制**：随着 GRPO 和 LLM-as-a-Judge 的普及，学术界开始深入探究 RL 过程中的漏洞利用问题。提前预判模型会在哪个方向“作弊/偷懒”（#27），正在成为下一代可靠 RLHF 的研究热点。

---

## 4. 值得精读

* **[Predicting Reward Hacking of LLM Judges Before RL Training](http://arxiv.org/abs/2611.29651v1)**
  * **推荐理由**: 随着基于 LLM 裁判的 RL 训练（如 GRPO）广泛应用，Reward Hacking（奖励漏洞）已成为模型退化的主要原因。本文提出了在训练前即能预测哪个漏洞会被利用的技术，对于从事 RLHF、模型对齐和 AI 安全的团队具有极高的实用价值。

* **[Think Before You Forecast: Scaling Test-Time Compute for Time Series Forecasting](http://arxiv.org/abs/2611.29566v1)**
  * **推荐理由**: 将“慢思考/推理时计算”引入时间序列这一传统机器学习主战场，打破了以往时间序列模型仅靠单次前

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*