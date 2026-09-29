# ArXiv AI 研究日报 2026-09-30

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-29 23:16 UTC

---

# ArXiv AI 研究日报（2026-09-30）

## 今日速览
今日论文的核心张力是：在模型规模与任务长度继续扩张的同时，推理、训练与评估开始转向“可服务、可审计、可长程执行”。大模型侧，循环 Transformer、线性/随机注意力、望远镜式嵌套容量和测试时扩展把参数效率变成新的主战场。智能体侧，KV 压缩、token 消耗预测、失败透明报告和自我反思显示长时程 agent 的瓶颈已从任务能力转向运行可靠性与成本。生成与对齐侧，视频扩散蒸馏、可验证视觉奖励和个性化因子排序共同推动从“采样好看”走向“可验证、可个性化”的生成。

## 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

1. **Telescopic Language Models** — [arXiv](http://arxiv.org/abs/2609.35769v1)  
   作者：Guo 等  
   说明：提出可在多个算力预算间平滑服务的“望远镜式”嵌套 Transformer，通过随机前缀监督减少每个预算点独立训练或压缩的成本，值得大模型部署与弹性推理关注。

2. **How to Loop MoE: Flatten the Experts, Untie the Attention** — [arXiv](http://arxiv.org/abs/2609.35751v1)  
   作者：Wang 等  
   说明：把循环 Transformer 与 MoE 结合，提出展开专家并解耦注意力的 looped MoE 设计，提升固定参数规模下额外计算的利用率，关注推理效率与参数效率。

3. **Improving Test-Time Scaling with Adaptive Looped Transformers** — [arXiv](http://arxiv.org/abs/2609.35748v1)  
   作者：You 等  
   说明：研究循环 Transformer 是否改善测试时扩展，并给出自适应循环 Transformer 在输出增长时提升长推理计算的证据，值得思考推理预算如何随任务长度扩展。

4. **Rethinking Personalized Generation: Test-Time Alignment via Factorized Ranking Models** — [arXiv](http://arxiv.org/abs/2609.35695v1)  
   作者：Ma 等  
   说明：指出个性化生成存在被单体化对齐忽视的性能空间，并用因子化排序模型在测试时对齐用户偏好，值得关注个性化 LLM 的新优化与评估范式。

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

5. **Learning Native Reflection in Unified Models with Interleaved Reinforcement Learning** — [arXiv](http://arxiv.org/abs/2609.35767v1)  
   作者：Fan 等  
   说明：让统一多模态模型在渲染后观察结果并迭代诊断、修改，用交错 RL 学会“原生反思”，关注自我修复型生成智能体的闭环训练。

6. **KV-streams for Efficient Compaction in Agentic Reinforcement Learning** — [arXiv](http://arxiv.org/abs/2609.35750v1)  
   作者：Penaloza 等  
   说明：针对 agentic RL 中长 trace 带来的 GPU 显存瓶颈，提出 KV-streams 以减少反复 prefill 的上下文压缩成本，值得关注长时程智能体的上下文工程。

7. **Shockingly Simple Self-retrospection Improves Agentic Models Without RL** — [arXiv](http://arxiv.org/abs/2609.35741v1)  
   作者：Light 等  
   说明：仅用模型对自身经验的解释训练即可提升 agent 后续行为，无需 RL，给出低成本 self-retrospection 机制，关注 agent 经验复用与部署后改进。

8. **Not All Thinking is Created Equal: Latent Reasoning Discovers a Recurrent Search Algorithm for Depth Generalization** — [arXiv](http://arxiv.org/abs/2609.35643v1)  
   作者：Cheng 等  
   说明：比较 token 级与 latent 级中间计算，发现 latent reasoning 中存在复现搜索算法的结构并有助于深度泛化，值得理解推理机制与长链泛化。

### 🔧 方法与框架（新技术、基准测试、效率优化）

9. **PDMD: Projected Distribution Matching Distillation for Video Diffusion Models** — [arXiv](http://arxiv.org/abs/2609.35768v1)  
   作者：Wang 等  
   说明：针对 DMD 蒸馏视频扩散模型时的过饱和与退化问题，提出投影分布匹配蒸馏，在降低 NFE 的同时改善训练稳定性，关注视频生成加速。

10. **ScAn-Bench: Evaluating Scaling Analysis Methodology** — [arXiv](http://arxiv.org/abs/2609.35707v1)  
    作者：Sermaxhaj 等  
    说明：系统评估 scaling analysis 方法学本身，指出 scaling law 研究中可能存在方法偏差，值得所有做大规模模型架构、数据和超参规划的团队关注。

11. **Verifier Errors in RLVR: Reward Hacking, Limits of Feedback, and Selective Control** — [arXiv](http://arxiv.org/abs/2609.35677v1)  
    作者：Moya 等  
    说明：刻画 RLVR 中不完美 verifier 导致 reward hacking 的梯度流条件，并提出选择性控制策略，值得安全对齐与可验证奖励设计参考。

12. **SANTA++: Sampling Attention through Representative Keys** — [arXiv](http://arxiv.org/abs/2609.35629v1)  
    作者：Lee 等  
    说明：提出免训练的随机注意力方法 SANTA++，用代表 key 做内存高效的动态注意力选择，关注长上下文 LLM 的推理成本与显存效率。

### 📊 应用（垂直领域、多模态、代码生成）

13. **GPUPhysBench: Benchmarking Coding Agents for Correct and Efficient GPU Physics Simulation** — [arXiv](http://arxiv.org/abs/2609.35639v1)  
    作者：Sun 等  
    说明：构建 50 个 GPU 物理仿真编码任务，评测 coding agent 能否在数值精度、同步和不规则访存下写出高效代码，关注科学代码生成与工程可靠性。

14. **FinAutoRubric: Expert-Guided Automatic Rubric Generation for Evaluating Financial Research Agents** — [arXiv](http://arxiv.org/abs/2609.35744v1)  
    作者：Lee 等  
    说明：面向金融研究 agent 自动生成专家导向的评分 rubric，并固定信息截止值，降低专家评测扩展成本，关注垂直 agent 评估标准化。

15. **Scaling Long-Form Story Generation via Narrative State Tracking** — [arXiv](http://arxiv.org/abs/2609.35759v1)  
    作者：Wan 等  
    说明：用叙事状态跟踪扩展长篇小说生成，缓解超过万词故事后的一致性崩溃，关注长文本生成的可控性与可扩展性。

## 研究趋势信号
今日投稿显示，AI 研究正从单点能力转向系统级可靠性与经济性：循环/线性注意力、望远镜式容量与 KV 压缩把推理成本作为核心约束；RLVR、失败透明报告、自我反思与 harness learning 说明智能体评估开始关注工具失败、结果可审计和经验再利用；生成模型则通过可验证奖励、分布匹配蒸馏和叙事状态跟踪，推动从“采样好看”走向可验证、可长程执行的生成。

## 值得精读

1. **Telescopic Language Models** — [arXiv](http://arxiv.org/abs/2609.35769v1)  
   理由：它直接给出“一个模型服务多个算力预算”的范式，随机前缀监督和嵌套容量可能影响大模型推理产品化、成本优化与模型发布形态。

2. **KV-streams for Efficient Compaction in Agentic Reinforcement Learning** — [arXiv](http://arxiv.org/abs/2609.35750v1)  
   理由：长时程 agent 的核心瓶颈之一是显存与上下文重算，这篇给上下文压缩提供了新的系统视角，对 agent 基础设施工程师很有价值。

3. **Not All Thinking is Created Equal: Latent Reasoning Discovers a Recurrent Search Algorithm for Depth Generalization** — [arXiv](http://arxiv.org/abs/2609.35643v1)  
   理由：它不只比较 token-based CoT 和 latent reasoning 的效果，还尝试解释中间计算为何能泛化，可能为推理机制和深度泛化提供新线索。

## 附：全部 50 篇论文链接（按要求保留）
1. FurE: Efficient Instance-Specific 3D Fur Reconstruction without Animal-Fur Datasets — [arXiv](http://arxiv.org/abs/2609.35770v1)  
2. Telescopic Language Models — [arXiv](http://arxiv.org/abs/2609.35769v1)  
3. PDMD: Projected Distribution Matching Distillation for Video Diffusion Models — [arXiv](http://arxiv.org/abs/2609.35768v1)  
4. Learning Native Reflection in Unified Models with Interleaved Reinforcement Learning — [arXiv](http://arxiv.org/abs/2609.35767v1)  
5. Retrieving Biblical Intertextual References in Karen Blixen's Seven Gothic Tales — [arXiv](http://arxiv.org/abs/2609.35765v1)  
6. Unifying Distributional Training for One-Step Visual Generation — [arXiv](http://arxiv.org/abs/2609.35763v1)  
7. TokenCast: Forecasting Token Consumption During LLM Agent Execution — [arXiv](http://arxiv.org/abs/2609.35760v1)  
8. Scaling Long-Form Story Generation via Narrative State Tracking — [arXiv](http://arxiv.org/abs/2609.35759v1)  
9. Statistical Learning of Contractive Dynamical Representations for Composite Adaptive Control — [arXiv](http://arxiv.org/abs/2609.35758v1)  
10. Neural Harmonic Measure Operator — [arXiv](http://arxiv.org/abs/2609.35752v1)  
11. How to Loop MoE: Flatten the Experts, Untie the Attention — [arXiv](http://arxiv.org/abs/2609.35751v1)  
12. KV-streams for Efficient Compaction in Agentic Reinforcement Learning — [arXiv](http://arxiv.org/abs/2609.35750v1)  
13. Towards Communication-Efficient Social Intelligence in Language Agents — [arXiv](http://arxiv.org/abs/2609.35749v1)  
14. Improving Test-Time Scaling with Adaptive Looped Transformers — [arXiv](http://arxiv.org/abs/2609.35748v1)  
15. Copy the Same, Distill the Difference: Initializing Linear Vision Transformers — [arXiv](http://arxiv.org/abs/2609.35745v1)  
16. FinAutoRubric: Expert-Guided Automatic Rubric Generation for Evaluating Financial Research Agents — [arXiv](http://arxiv.org/abs/2609.35744v1)  
17. Shockingly Simple Self-retrospection Improves Agentic Models Without RL — [arXiv](http://arxiv.org/abs/2609.35741v1)  
18. Harness Learning Enables Generalizable Test-Time Adaptation — [arXiv](http://arxiv.org/abs/2609.35738v1)  
19. Failure-Transparent Agents: Benchmarking Post-Failure Reporting in Tool-Using Language Models — [arXiv](http://arxiv.org/abs/2609.35732v1)  
20. X-Reset: Scaling Object-Centric Reinforcement Learning via Cross-Embodiment Resets — [arXiv](http://arxiv.org/abs/2609.35715v1)  
21. ScAn-Bench: Evaluating Scaling Analysis Methodology — [arXiv](http://arxiv.org/abs/2609.35707v1)  
22. Reinforcing Agentic Creativity in Scientific Ideation with Night Science — [arXiv](http://arxiv.org/abs/2609.35706v1)  
23. A Unified Uncertainty Representation for Graph Neural Networks via Doubly-Spectral Stochastic Expansion — [arXiv](http://arxiv.org/abs/2609.35703v1)  
24. MeqMuon: Matrix-Equilibrating Muon for LLM Pretraining — [arXiv](http://arxiv.org/abs/2609.35701v1)  
25. Distillation Defenses Easily Break After Reinforcement Learning — [arXiv](http://arxiv.org/abs/2609.35699v1)  
26. Provable Benefits of Regularization: Fast Rates for Adversarial Imitation Learning — [arXiv](http://arxiv.org/abs/2609.35698v1)  
27. Rethinking Personalized Generation: Test-Time Alignment via Factorized Ranking Models — [arXiv](http://arxiv.org/abs/2609.35695v1)  
28. Reasoning with Continuous Latent Diffusion — [arXiv](http://arxiv.org/abs/2609.35694v1)  
29. Report: Progressive Disclosure of Agent Skills — [arXiv](http://arxiv.org/abs/2609.35692v1)  
30. Rethinking Circuit Evaluation: Do Circuits Explain Model Errors? — [arXiv](http://arxiv.org/abs/2609.35686v1)  
31. QuanReview: Offline, Auditable Reconciliation of Human and LLM Span Annotations — [arXiv](http://arxiv.org/abs/2609.35685v1)  
32. The Hidden Perception Constraint in Task-Aware Compression — [arXiv](http://arxiv.org/abs/2609.35684v1)  
33. Verifier Errors in RLVR: Reward Hacking, Limits of Feedback, and Selective Control — [arXiv](http://arxiv.org/abs/2609.35677v1)  
34. Tracing the Evolution of Oracle Bone Characters Across Three Millennia — [arXiv](http://arxiv.org/abs/2609.35674v1)  
35. PhoneCLI: From App Interfaces to Callable Commands for Mobile Agents — [arXiv](http://arxiv.org/abs/2609.35671v1)  
36. Learned Preconditioning for a Primal-Dual Interior-Point Method — [arXiv](http://arxiv.org/abs/2609.35665v1)  
37. MS-GLA: Multi-Scale Gated Linear Attention for Addressing Representational Bottlenecks via Multi-Temporal Resolution — [arXiv](http://arxiv.org/abs/2609.35664v1)  
38. Late Attention Layers Alone Can Copy Entity Tokens, but Not Without Attending to Their Context — [arXiv](http://arxiv.org/abs/2609.35663v1)  
39. CMDO: A Cognitive Memory-Driven Optimization Algorithm for Adaptive Population-Based Search — [arXiv](http://arxiv.org/abs/2609.35657v1)  
40. Transferable Mass Spectrum Prediction via Reference-Guided Test-time Specialization — [arXiv](http://arxiv.org/abs/2609.35649v1)  
41. Rubric Rewards from Item Response Theory — [arXiv](http://arxiv.org/abs/2609.35646v1)  
42. CoSE-E: A Benchmark for Code-switched Speech Evaluation in Enterprise Settings — [arXiv](http://arxiv.org/abs/2609.35645v1)  
43. Not All Thinking is Created Equal: Latent Reasoning Discovers a Recurrent Search Algorithm for Depth Generalization — [arXiv](http://arxiv.org/abs/2609.35643v1)  
44. Verifiable Visual Rewards Transfer from Synthetic Scenes to Natural Prompts — [arXiv](http://arxiv.org/abs/2609.35641v1)  
45. GPUPhysBench: Benchmarking Coding Agents for Correct and Efficient GPU Physics Simulation — [arXiv](http://arxiv.org/abs/2609.35639v1)  
46. Bounding Retraining Equivalence and the Deletion Floor in Materials Machine Unlearning — [arXiv](http://arxiv.org/abs/2609.35635v1)  
47. DR-net-M

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*