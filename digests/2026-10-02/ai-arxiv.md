# ArXiv AI 研究日报 2026-10-02

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-01 23:34 UTC

---

# ArXiv AI 研究日报 (2026-10-02)

---

## 1. 今日速览

今日 ArXiv 共收录 50 篇 AI 相关论文，核心趋势聚焦于**大语言模型（LLM）的智能体化（Agent Harness）、多步推理优化、计算效率扩展（Scaling Laws）以及自适应对齐与安全防御**。多篇论文重点研究了如何超越单轮“速览”式感知与单次响应，转向多智能体协同、动态测试时扩展（Test-time Scaling）以及在现实复杂环境中的鲁棒性。

---

## 2. 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）
1. **Semifactual Credit-Augmented Policy Optimization**
   - 链接: [http://arxiv.org/abs/2609.40360v1](http://arxiv.org/abs/2609.40360v1)
   - 作者: Junshu Pan 等
   - 核心贡献：通过半事实提示干预（Semifactual Interventions），解决强化学习与可验证奖励（RLVR）中模型对提示无关特征敏感的缺陷，提升推理的鲁棒性。

2. **Scaling Laws for Looped Mixture of Experts**
   - 链接: [http://arxiv.org/abs/2609.40316v1](http://arxiv.org/abs/2609.40316v1)
   - 作者: Yanbei Chen 等
   - 核心贡献：首次将循环Transformer（增加计算深度）与专家混合模型MoE（扩展总容量）结合，提出了两者的联合扩展定律（Scaling Laws）。

3. **Linguistic Loopholes in LLM Unlearning: From a 174-Language Benchmark to Coverage-Aware Unlearning**
   - 链接: [http://arxiv.org/abs/2609.40286v1](http://arxiv.org/abs/2609.40286v1)
   - 作者: Tyler Skow 等
   - 核心贡献：揭示了LLM遗忘（Unlearning）中的跨语言漏洞——通过改变查询或回答的语言可以“唤醒”看似被遗忘的知识，并提出了覆盖感知遗忘方案。

4. **Distribution Matching Distillation for Continuous Diffusion Language Models**
   - 链接: [http://arxiv.org/abs/2609.40235v1](http://arxiv.org/abs/2609.40235v1)
   - 作者: Paul Le Van Kiem 等
   - 核心贡献：利用分布蒸馏技术大幅减少连续扩散语言模型在并行生成标记（Token）时的网络评估次数（NFE），兼顾生成质量与推理速度。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）
5. **EvoDuet: Bilevel Co-Evolution of Web Searching and Task Solving for Scientific Discovery**
   - 链接: [http://arxiv.org/abs/2609.40340v1](http://arxiv.org/abs/2609.40340v1)
   - 作者: Young-Jun Lee 等
   - 核心贡献：针对科学发现任务提出双层优化演化方法，解决大模型在结合网页搜索时因反复返回相同页面而陷入停滞的痛点。

6. **Cogentic: Multi-Agent Orchestration for Automated Proof Discovery**
   - 链接: [http://arxiv.org/abs/2609.40324v1](http://arxiv.org/abs/2609.40324v1)
   - 作者: Yang Cai 等
   - 核心贡献：引入多智能体协同框架（Cogentic），用于开放性数学研究问题中的自动化证明发现，克服了单次推理难以探索多重竞争猜想的局限。

7. **PivotOPD: Learning to Recover from Pivotal Mistakes in Multi-Turn Agents**
   - 链接: [http://arxiv.org/abs/2609.40285v1](http://arxiv.org/abs/2609.40285v1)
   - 作者: Yinghui He 等
   - 核心贡献：针对多轮智能体交互中的错误累积问题，提出在线策略蒸馏（OPD）方法，专注于学习从关键错误中恢复。

8. **ComputerSD: Online Self-Distillation from Real-Time Feedback for Computer-Use Agents**
   - 链接: [http://arxiv.org/abs/2609.40253v1](http://arxiv.org/abs/2609.40253v1)
   - 作者: Yong Du 等
   - 核心贡献：为计算机操作智能体（CUA）设计了基于实时反馈的在线自蒸馏机制，提供密集 Token 级监督以替代稀疏的结果奖励。

9. **Learning from Research: Toward Lifelong Agent Harness Evolution**
   - 链接: [http://arxiv.org/abs/2609.40169v1](http://arxiv.org/abs/2609.40169v1)
   - 作者: Jingbo Yang 等
   - 核心贡献：提出在固定底层语言模型的前提下，通过持续演化智能体“Harness”（管理工具、记忆与执行的软件层）来实现智能体的终身进化。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）
10. **Turbo Harness: Instance-Adaptive Harness Optimization**
    - 链接: [http://arxiv.org/abs/2609.40330v1](http://arxiv.org/abs/2609.40330v1)
    - 作者: Tunyu Zhang 等
    - 核心贡献：提出实例自适应的 Harness 优化技术，改变了以往对所有任务应用统一全局 Harness 的传统做法，显著提升递归自提升效率。

11. **Cheap to Draw, Expensive to Trust: Certifying Test-Time Scaling Curves**
    - 链接: [http://arxiv.org/abs/2609.40190v1](http://arxiv.org/abs/2609.40190v1)
    - 作者: Sohail 等
    - 核心贡献：探讨了测试时扩展（Test-time Scaling）中“采样多答案并选择最优”的曲线不可信问题，引入了可证明的认证机制。

12. **Provably Tractable NFA-Constrained Language Generation via HMMs**
    - 链接: [http://arxiv.org/abs/2609.40185v1](http://arxiv.org/abs/2609.40185v1)
    - 作者: Jialiang Sun 等
    - 核心贡献：通过隐马尔可夫模型（HMMs）实现了非确定性有限自动机（NFA）约束下的语言生成，在不失分发的前提下保证了计算易处理性。

---

### 📊 应用（垂直领域、多模态、代码生成）
13. **Ranking-Aware Prompt Optimization for Multimodal Clinical Diagnosis**
    - 链接: [http://arxiv.org/abs/2609.40361v1](http://arxiv.org/abs/2609.40361v1)
    - 作者: Tian Xia 等
    - 核心贡献：针对医学多模态大语言模型（MLLMs）在类别极度不平衡数据上的缺陷，提出排名感知的提示优化目标，以替代易导致临床误判的传统准确率目标。

14. **WorldAuditBench: Interactive 3D World Auditing with Multimodal Agents**
    - 链接: [http://arxiv.org/abs/2609.40325v1](http://arxiv.org/abs/2609.40325v1)
    - 作者: Ziyan Jiang 等
    - 核心贡献：推出交互式 3D 世界多模态代理审计基准，用于高效识别虚拟模拟环境中的异常现象（如悬浮物、穿墙等）。

15. **EviRover: Reinforcing Agentic Perception Beyond a Glance**
    - 链接: [http://arxiv.org/abs/2609.40230v1](http://arxiv.org/abs/2609.40230v1)
    - 作者: Kaixuan Fan 等
    - 核心贡献：突破传统“一眼定论”的视觉感知模式，通过强化学习赋能多步具身/图文智能体进行深度、主动的视觉探索。

---

## 3. 研究趋势信号

从今日的论文分布来看，**“Agent Harness（智能体支架/外挂控制层）”** 与 **“Test-Time Scaling（测试时扩展优化）”** 正成为继基础模型参数规模之后的新核心战场。多篇论文不约而同地指出：单纯扩大基础模型或采用固定提示词已触及瓶颈，未来的提升高度依赖于**动态环境交互、支架自演化（Harness Evolution）、以及在推理时投入更多计算（如多智能体辩论与自蒸馏）**。此外，AI 生成文本在公开网络数据中的泛滥（占比超 30%）及其对扩展定律的影响也开始受到学术界的定量审视。

---

## 4. 值得精读

1. **EvoDuet: Bilevel Co-Evolution of Web Searching and Task Solving for Scientific Discovery** ([Link](http://arxiv.org/abs/2609.40340v1))
   - *理由*：开辟了科学智能（AI4Science）中大模型如何与外部动态知识源（如网页搜索）进行双层协同演化的新思路，对于解决当前大模型工具使用中的死循环问题具有极高的参考价值。
2. **Scaling Laws for Looped Mixture of Experts** ([Link](http://arxiv.org/abs/2609.40316v1))
   - *理由*：理论结合实际地探讨了循环架构与稀疏 MoE 的正交互补性，为下一代高效大模型架构的设计提供了重要的扩展定律依据。
3. **Cheap to Draw, Expensive to Trust: Certifying Test-Time Scaling Curves** ([Link](http://arxiv.org/abs/2609.40190v1))
   - *理由*：直面当前大火的“Test-time Compute / Scaling”浪潮中的盲目信任风险，提出了极为严谨的认证方法，对评估大模型真实推理能力有深刻的警示与指导意义。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*