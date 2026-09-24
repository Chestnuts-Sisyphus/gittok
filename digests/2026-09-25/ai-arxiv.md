# ArXiv AI 研究日报 2026-09-25

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-24 22:49 UTC

---

# ArXiv AI 研究日报（2026-09-25）

## 今日速览

今日 50 篇投稿中，大语言模型主线从静态能力转向可验证推理与高效架构：RLVR/on-policy distillation 的信用分配、扩散语言模型的因果捷径、对数深度递归 LM 都试图降低推理成本并提升训练稳定性。智能体方向明显向多步、多智能体安全迁移，shutdown sabotage、PASTABench 和 agent 授权过渡把安全从单轮响应扩展到执行轨迹与工程生命周期。世界模型从视觉/环境预测延伸到 LLM agent 与机器人操作，强调可编辑状态、记忆和运动恢复。效率与部署继续升温，记忆注意力、Mamba-3 非交换状态追踪、表格基础模型低内存推理以及代码/驾驶/机器人应用形成完整落地链条。

---

## 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

1. **[When and Where to Trust the Teacher: Unifying On-Policy Distillation and GRPO through Entropy-Calibrated Credit Assignment](http://arxiv.org/abs/2609.28385v1)**（Zhang 等）  
   提出熵校准信用分配来统一 on-policy distillation 与 GRPO，在 RLVR 中判断教师信号何时可信，对提升数学推理的 token 级训练效率很重要。

2. **[Towards Efficient Reasoning: Learning Causal Shortcuts for Diffusion Language Models](http://arxiv.org/abs/2609.28272v1)**（Jin 等）  
   为扩散语言模型学习因果捷径，缓解双向注意力导致的指数级探索空间，有望降低复杂推理的计算成本。

3. **[Log-Depth Recurrent Language Modeling](http://arxiv.org/abs/2609.28212v1)**（Wang 等）  
   将平衡树递归算子扩展到语言建模，以近对数深度兼顾并行计算与序列依赖，挑战 Transformer 固定深度和二次开销。

4. **[Complementary Roles of Activation and Parametric Memory in Few-Shot Learning](http://arxiv.org/abs/2609.28250v1)**（Niu 等）  
   比较 KV 激活记忆与参数更新在少样本学习中的互补作用，帮助理解 LLM 如何在测试时同时保存事实与新任务知识。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

5. **[Agent-Editing World Model: Rethinking World Modeling for LLM Agents](http://arxiv.org/abs/2609.28416v1)**（Sun 等）  
   提出面向 LLM 智能体的世界模型范式，从预测观测转向可编辑/执行依赖状态建模，减少高熵工具结果重建负担。

6. **[Shutdown Sabotage Propensities in Multi-Agent Systems](http://arxiv.org/abs/2609.28274v1)**（Knecht 等）  
   在多智能体设置中测试模型是否出现规避人类关停或破坏关机倾向，为“人类可关停”这一最终安全护栏提供行为证据。

7. **[PASTABench: Proactive Assessment of Sequential Trajectories for Agent Safety](http://arxiv.org/abs/2609.28197v1)**（Sun 等）  
   提出 PASTABench，对多步智能体轨迹进行主动式安全评估，补齐现有单轮或静态基准在逐步状态变化上的盲区。

8. **[From Agent Output to Authorized Transition](http://arxiv.org/abs/2609.28216v1)**（Koch）  
   把 agentic 工程的安全问题从“能否产出结果”提升到“工程生命周期中的状态转移是否被授权”，为可部署 AI 工程师提供保证框架。

9. **[MemBodied: Recurrent Associative Memory for Vision-Language-Action Models](http://arxiv.org/abs/2609.28256v1)**（Pala 等）  
   为视觉-语言-动作模型引入循环关联记忆，使策略保留并利用 episode 级历史信息，对依赖历史的操作任务很关键。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

10. **[Memory Attention](http://arxiv.org/abs/2609.28399v1)**（Kang）  
    提出 Memory Attention，用 token 索引记忆替代部分价值投影并辅以上下文信息，可能降低注意力的冗余计算与内存开销。

11. **[Non-Commutative State Tracking with Input-Dependent Low-Rank Updates in Mamba-3](http://arxiv.org/abs/2609.28273v1)**（Fujii 等）  
    扩展 Mamba-3 的对角转移，加入输入依赖低秩反射以支持非交换状态追踪，使顺序算子的顺序敏感性进入状态空间模型。

12. **[Support-Compiled Feature Folding: More Evidence at Lower Memory Across Tabular Foundation Models](http://arxiv.org/abs/2609.28208v1)**（Zhou 等）  
    提出免训练推理框架 SCFF，用 support-compiled feature folding 在表格基础模型中平衡成对特征混合的二次内存与特征选择丢失证据的问题。

---

### 📊 应用（垂直领域、多模态、代码生成）

13. **[Can LLMs Reason About Runtime Behavior? A Repository-Level Dynamic Benchmark](http://arxiv.org/abs/2609.28449v1)**（Taherkhani 等）  
    构建仓库级动态基准，评估 LLM 对代码运行时行为的推理，弥补静态代码 QA 与 LLM 自动评分的不足。

14. **[AnchorReasoning: A Visual Grounding and Causal Reasoning Dataset in Long-Tail Autonomous Driving Scenarios](http://arxiv.org/abs/2609.28366v1)**（Bao 等）  
    提出 AnchorReasoning 数据集，把长尾自动驾驶中的关键视觉证据、因果推理和规划连接起来，强化 VLM 决策可解释性。

15. **[Generalizable Robotic Insertion with World Models](http://arxiv.org/abs/2609.28258v1)**（Hansen 等）  
    利用世界模型提升机器人插入泛化能力，使高混合装配系统摆脱逐任务专门策略，关注可部署的自适应操作。

---

## 研究趋势信号

信号一：Agent 安全从单轮响应扩展到多步轨迹、授权转移和关停规避。信号二：LLM 训练关注 RLVR、蒸馏与推理效率的统一，追求 token 级信用分配。信号三：世界模型转向可编辑状态、动作记忆和机器人部署。信号四：低资源架构、记忆机制、小模型与量化部署并行，效率仍是硬约束。

---

## 值得精读

1. **[When and Where to Trust the Teacher](http://arxiv.org/abs/2609.28385v1)**：它把教师蒸馏、GRPO 和 RLVR 放在同一信用分配框架中，可能直接影响数学/推理模型的训练范式。  
2. **[Agent-Editing World Model](http://arxiv.org/abs/2609.28416v1)**：对 LLM agent 的世界模型假设做了重构，尤其适合关注长程任务、工具执行和高熵环境建模的读者。  
3. **[PASTABench](http://arxiv.org/abs/2609.28197v1)**：把 agent 安全评估从单轮/静态问题推进到多步轨迹与主动评估，是理解 agentic AI 安全基准演进的关键样本。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*