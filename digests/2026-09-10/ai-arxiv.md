# ArXiv AI 研究日报 2026-09-10

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-09 22:06 UTC

---

# ArXiv AI 研究日报 | 2026-09-10

---

### 1. 今日速览

今日 ArXiv AI 领域共有 50 篇新论文，涵盖 LLM 底层优化、智能体（Agent）演进、具身智能（Physical AI）及垂类应用等多个前沿方向。**核心突破集中在“大模型训练/微调不一致性破解”、“长期智能体图结构自演进与动态记忆管理”、以及“实境中多智能体自发协作现象分析”**。此外，结合物理触觉与全身协同的具身 VLA 模型以及针对 RLVR（可验证奖励强化学习）的无 Rollout 优化也是今日亮点。

---

### 2. 重点论文分类解读

#### 🧠 大语言模型（架构、训练、评估）

1. **Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack**
   - **链接**: http://arxiv.org/abs/2609.08966v1
   - **作者**: S. Maskey, P. Scholl, J. Knupp et al.
   - **一句话说明**: 揭示了 30B MoE 训练中的关键现象——预训练 Loss 最低的 Checkpoint 不一定是 SFT 的最佳起点，挑战了传统 Checkpoint 选择假设。

2. **It's Not RoPE that Creates Sinks: The Role of Self-Concentration and Value-Non-Mixing in Attention**
   - **链接**: http://arxiv.org/abs/2609.09085v1
   - **作者**: R. Kiya, S. Ohashi, K. Sato et al.
   - **一句话说明**: 证明了 LLM 中的“注意力汇集（Attention Sink）”现象并非由 RoPE 位置编码引起，而是源于自注意力浓缩与 Value 向量的不混合机制，为低比特量化提供了新视角。

3. **Training-Free Task Vectors for LLM Behavioral Control**
   - **链接**: http://arxiv.org/abs/2609.09054v1
   - **作者**: G. J. Perin, L. Boscaini, A. Araujo et al.
   - **一句话说明**: 提出无需昂贵微调即可提取 LLM 任务向量的新方法，实现高效、低成本的后训练模型行为编辑。

4. **When Does Scale-Invariant Optimization Become Unstable? An Exact Schedule Law with Weight Decay**
   - **链接**: http://arxiv.org/abs/2609.09116v1
   - **作者**: H. Amin, W.-K. Chang, R. Khanna
   - **一句话说明**: 给出了学习率调度与权重衰减在归一化网络中相互作用的精确不稳定性定律，指导大模型优化器参数设置。

---

#### 🤖 智能体与推理（规划、记忆、多智能体、RLVR）

5. **Procedural Graphs: Self-Evolving Execution Structures for LLM Agents**
   - **链接**: http://arxiv.org/abs/2609.09153v1
   - **作者**: Y. Lu, Y. Chen, S. Wu et al.
   - **一句话说明**: 为 LLM Agent 引入自演进的程序图（Procedural Graphs），替代非约束的历史生成，显著提升长流程任务的规划与执行效率。

6. **Copying explains the collective behavior of AI agents in the wild**
   - **链接**: http://arxiv.org/abs/2609.09150v1
   - **作者**: G. De Marzo, N. Alboré, D. Garcia
   - **一句话说明**: 实证研究了开放环境中数千个无记忆 AI Agent 通过公共 Wiki 自发产生模仿与协同行为的涌现机制。

7. **MeClear: Cooperative Game-Theoretic Attribution and Risk-Aware Memory Clearance for Long-Horizon LLM Agents**
   - **链接**: http://arxiv.org/abs/2609.09115v1
   - **作者**: B. Yang, J. Sun, Z. Lu et al.
   - **一句话说明**: 基于合作博弈论与风险感知，为长期 Agent 提出动态记忆清理机制，解决检索污染与过时信息干扰问题。

8. **ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR**
   - **链接**: http://arxiv.org/abs/2609.09075v1
   - **作者**: T. Sha, S. Zhai, S. Zhao
   - **一句话说明**: 在 GRPO 强化学习中引入零 Rollout 难度先验，解决全对或全错导致的组内梯度消失（Cold-Start）问题。

---

#### 🔧 方法与框架（评估、可解释性、机制）

9. **SAEScientist-Bench: Can AI Agents Conduct Autonomous SAE Interpretability Research?**
   - **链接**: http://arxiv.org/abs/2609.09113v1
   - **作者**: Y. Tan, S. He, J. Zhao et al.
   - **一句话说明**: 首次评估 AI Agent 是否能够自主开展基于稀疏自编码器（SAE）的机理可解释性研究，推动 AI 安全审计自动化。

10. **Measuring LLM Sycophancy under Sustained Multi-Turn Pressure**
    - **链接**: http://arxiv.org/abs/2609.09090v1
    - **作者**: L. Tang, K. Wei, T. Jiang et al.
    - **一句话说明**: 推出 SPINE 基准，评估 LLM 在用户持续、自适应质疑压力下坚持正确立场的抗“谄媚/迎合”能力。

---

#### 📊 具身智能与垂直应用（机器人、代码、多模态）

11. **TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body Vision-Language-Action Model**
    - **链接**: http://arxiv.org/abs/2609.09158v1
    - **作者**: A. Li, Y. Chen, Z. Li et al.
    - **一句话说明**: 提出基于全身 VLA（Vision-Language-Action）模型的动态导航架构，实现人形机器人在复杂杂乱环境中的连续几何适应与避障。

12. **DeCAL: Towards Physically-Grounded Dexterous Vision-Language-Action Models via Contact-Aware Latent Co-Imagination**
    - **链接**: http://arxiv.org/abs/2609.09119v1
    - **作者**: Y. Fu, N. Chen, J. Zhao et al.
    - **一句话说明**: 结合触觉感知与隐空间“协同想象”，大幅提升 VLA 模型在精细灵巧手操作和遮挡环境下的物理接地（Physical Grounding）能力。

13. **ExecCritic: Learn to Test, Test to Improve for Coding Agents**
    - **链接**: http://arxiv.org/abs/2609.09133v1
    - **作者**: L. Tao, B. Peng, H. Wang et al.
    - **一句话说明**: 解耦代码 Agent 的补丁生成与测试生成，通过自适应执行反馈解决“错误测试引导错误代码”的循环陷阱。

14. **Omni Interaction Agent Technical Report**
    - **链接**: http://arxiv.org/abs/2609.08977v1
    - **

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*