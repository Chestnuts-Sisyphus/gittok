# ArXiv AI 研究日报 2026-11-20

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-20 01:31 UTC

---

**ArXiv AI 研究日报（2026‑11‑20）**  
<https://arxiv.org/search/?query=&searchtype=author&source=header>

---

### 今日速览  
1. **安全与可解释性**：多篇论文聚焦 LLM 的 jailbreak 检测、可解释性原型与医学模型审计。  
2. **代理与规划**：从 Agent‑Harness 的需求驱动演化到多智能体驾驶场景生成与反事实世界模型，代理系统正朝更具自适应与可控性方向发展。  
3. **方法创新**：混合注意力、对称性建模、量子专家以及 Cap‑and‑Track 调度等技术，提升模型效率与适配性。  
4. **垂直领域应用**：AI 供应链、光伏决策、医学诊断与生物信息学等领域正借助大模型与新框架实现突破。  

---

## 重点论文（按主题分类）

| 主题 | 论文 | 作者（缩写） | 核心贡献 / 价值 |
|------|------|-------------|----------------|
| 🧠 大语言模型 | **Jailbreak Detection on Large Language Models via Contrastive Prototype Structures** <http://arxiv.org/abs/2611.24936v1> | Qiu Y., Li Y. | 通过对比学习生成原型，无需下游分类器即可识别 jailbreak，展示了无监督安全检测的新范式。 |
| | **The Personal Imitation Game** <http://arxiv.org/abs/2611.24888v1> | Wellyanto M., Isa H.-Y., Xue K. | 提出个体化模仿游戏，评估模型复制特定人类行为的能力，为人机对话安全与个性化奠定基准。 |
| | **On-Policy Morphing into Hybrid Attention Models** <http://arxiv.org/abs/2611.24809v1> | Lan D., Wang X., Zheng J. | 将预训练 Transformer 转化为混合全/线性注意力，兼顾质量与效率，解决大模型推理成本。 |
| | **Bias‑Only Training Dynamics in ReLU Networks** <http://arxiv.org/abs/2611.24797v1> | Chaudhari S., Moura J. M. | 探索仅训练偏置的训练动态，为理解模型泛化与优化提供理论工具。 |
| 🤖 智能体与推理 | **Agentic Harness Engineering Beta: Requirement‑Centered Evolution of Agent Harnesses** <http://arxiv.org/abs/2611.24924v1> | Lin J., Chen J., Wang Y. | 以需求为中心的自适应 harness 演化，支持隐式需求与交互需求的自动化改进。 |
| | **Learning to Interact in Multi‑Agent Self‑Play for Controllable Autonomous Driving Scenario Generation** <http://arxiv.org/abs/2611.24876v1> | Yalcinkaya B., Pronovost E., Naumann M. | 通过多代理自对弈控制安全边缘案例生成，突破现有静态目标规划的局限。 |
| | **Counterfactual World Models: JEPAs That Reason About “What If”** <http://arxiv.org/abs/2611.24778v1> | Balestriero R., LeCun Y., Varaku K. | 提出基于 JEPAs 的反事实推理框架，解决隐藏扰动下的“如果…会怎样”问题，提升决策可靠性。 |
| | **Vibe‑Trading: Towards Agent‑Native Trading** <http://arxiv.org/abs/2611.24845v1> | Wu H., Li Z., Huang C. | 将金融交易系统转化为 agent‑native，解决价格变动导致的状态漂移与策略失效。 |
| 🔧 方法与框架 | **Cap‑and‑Track: Optimizing LLM Inference Request Dispatch Across Shifting Capacity** <http://arxiv.org/abs/2611.24891v1> | Novotny B., Szeto D., Wang C. | 异步推理调度器，适配可变输出长度与动态服务容量，显著提升吞吐与延迟。 |
| | **Equivariant Modeling with Polynomial Features via Minimal Homogeneous Generators** <http://arxiv.org/abs/2611.24896v1> | Liu M. L., Kileel J. | 通用 equivariant 多项式特征框架，统一多种应用（物理、图像等）下的对称性建模。 |
| | **Atomic MathReasoner: Instance‑Level Composition of Atomic Reasoning Skills for Mathematical LLMs** <http://arxiv.org/abs/2611.24846v1> | Li J., Gao T., Liu Q. | 将数学推理拆解为原子技能，提升 LLM 对多样化数学问题的解答准确性。 |
| | **Auditing black‑box clinical prediction models with a large language model through queries alone** <http://arxiv.org/abs/2611.24877v1> | Liu Z., Yang X. | 通过 LLM 仅查询方式验证临床模型缺陷，提供可扩展且无标签的审计工具。 |
| | **Soft Mixture of Quantum Experts for Hybrid Quantum‑Classical Learning** <http://arxiv.org/abs/2611.24798v1> | Repetto V., D’Aurizio R., Farinelli P. | 软混合量子专家架构，克服噪声与硬件限制，实现可扩展的量子‑经典协同学习。 |
| | **Isabelle Pool Server: a pooled verification service for prover training and multi‑agent proving** <http://arxiv.org/abs/2611.24788v1> | Ren X., Li W. | 提供池化的 Isabelle 证明服务，显著降低单机验证成本，推动证明自动化与多代理证明研究。 |
| 📊 应用 | **Mapping the AI Supply Chain: Dependencies, Vulnerabilities, and Market Concentration in the AI Ecosystem** <http://arxiv.org/abs/2611.24927v1> | Cen S. H., Gailmard L. A., Kim J. et al. | 系统梳理 AI 供应链的依赖与薄弱点，揭示垄断与安全风险，为治理与标准制定提供证据。 |
| | **Local AI Agents in Power Electronics Simulation: Deployment, Measurements and Costs** <http://arxiv.org/abs/2611.24880v1> | Li Y., Gunawardena P., Li Y. | 展示 AI 代理在电力电子仿真循环中的实用价值与成本收益，为工业落地提供经验。 |

---

## 研究趋势信号（100–200字）  
1. **安全与可解释性的融合**：多篇工作将对抗性安全（jailbreak、医学模型审计）与可解释原型/视觉化相结合，表明研究者正寻求无监督、可验证的安全评估方法。  
2. **代理系统的自适应与可控**：从需求驱动的 harness 演化到多智能体自对弈与反事实世界模型，提示代理架构正向更开放、可调节的方向演进。  
3. **资源与效率优化**：Cap‑and‑Track、混合注意力、量子专家等技术聚焦在高效推理与硬件适配，满足大模型部署在多租户、低延迟环境中的需求。  
4. **跨学科融合**：AI 供应链、光伏决策、医学诊断等垂直领域利用大模型与新框架，说明 AI 正深入行业应用并形成跨学科的“AI‑X”生态。  

---

## 值得精读  
| 论文 | 选读理由 |
|------|-----------|
| **Jailbreak Detection on Large Language Models via Contrastive Prototype Structures** <http://arxiv.org/abs/2611.24936v1> | 提出无监督原型检测方法，可直接部署于安全审核流水线，且实验表明对多种 jailbreak 方案具有鲁棒性。 |
| **Counterfactual World Models: JEPAs That Reason About “What If”** <http://arxiv.org/abs/2611.24778v1> | 解决了隐藏扰动下的反事实推理难题，为强化学习与安全规划提供理论与实践工具。 |
| **Auditing black‑box clinical prediction models with a large language model through queries alone** <http://arxiv.org/abs/2611.24877v1> | 采用 LLM 进行无标签审计，展示了可扩展的医学模型可信度评估方法，对医疗 AI 监管具有重要启示。 |

---

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*