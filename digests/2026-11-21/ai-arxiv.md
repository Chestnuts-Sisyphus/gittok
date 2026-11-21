# ArXiv AI 研究日报 2026-11-21

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-21 00:59 UTC

---

# 📅 ArXiv AI 研究日报 (2026-11-21)

---

### 🌟 今日速览
今日 ArXiv 的 AI 领域涵盖了从大规模语言模型底座优化、智能体（Agent）安全与长周期推理，到具身智能（Humanoid Loco-manipulation）等多个前沿方向。多模态与扩散模型的高效微调、代理系统的安全回溯审计（如 ROGUE-AI）、以及将复杂电路/逻辑直接编译进模型权重的方法（如 Zero-Gradient Circuit-Grafting）成为了本日亮点。研究正从“单纯扩大规模”转向“高效推理、具身落地与系统级安全审计”。

---

### 📑 重点论文分类速递

#### 🧠 大语言模型（架构、训练、对齐、评估）
1. **[TideCache: Efficient Hybrid LLM Serving with Transparent Cache Management and Layer-Wise Streaming](http://arxiv.org/abs/2611.26619v1)**
   - 作者: Jinbin Luo et al.
   - 核心贡献: 提出 TideCache 服务系统，针对采用混合架构的开源语言模型实现高效、异构的缓存管理与层级流式传输。

2. **[Represented but misread: Post-training changes how language models read out what they represent](http://arxiv.org/abs/2611.26584v1)**
   - 作者: Jochen Laubrock
   - 核心贡献: 揭示了后训练（Post-training）并非本质改变了语言模型的内部表征，而是改变了模型如何将已有表征“读取”并转化为输出。

3. **[A CPU Inside an LLM: Zero-Gradient Compilation of Exact Circuits into Pretrained Weights](http://arxiv.org/abs/2611.26450v1)**
   - 作者: Tanmay Sah
   - 核心贡献: 提出零梯度电路移植原语，无需微调即可将精确的确定性计算（如多位数算术电路）直接编译进预训练大模型权重中。

#### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）
4. **[Replication of Agentic Security Events: Audit and Investigation (ROGUE-AI)](http://arxiv.org/abs/2611.26553v1)**
   - 作者: Mengxiao Wang et al.
   - 核心贡献: 针对 LLM 智能体在执行日常任务时引发的安全故障（如误删数据库），构建了系统化的审计与调查复现框架。

5. **[Backtracking Agent Applications Security Incidents](http://arxiv.org/abs/2611.26525v1)**
   - 作者: Yicheng Cai et al.
   - 核心贡献: 研究智能体应用在遭遇安全事故后的回溯机制，旨在准确定位妥协入口点（CEP）并防止二次发生。

6. **[Seer: Guiding Small Deep-Research Agents with Shared Decision Models](http://arxiv.org/abs/2611.26423v1)**
   - 作者: Yuhao Zhou et al.
   - 核心贡献: 利用共享决策模型来引导小型端侧深度研究智能体（Deep-Research Agent），兼顾隐私与计算效率。

#### 🔧 方法与框架（新技术、基准测试、效率优化）
7. **[Active Feature Acquisition by Distilling an Oracle Teacher](http://arxiv.org/abs/2611.26598v1)**
   - 作者: Yang Meng et al.
   - 核心贡献: 提出主动特征获取（AFA）的新蒸馏范式，在预算约束下学习如何高效、按需收集实例特征。

8. **[A new algorithmic approach for finding flat minima: critically damped Polyak stepsizes](http://arxiv.org/abs/2611.26475v1)**
   - 作者: Francesco Caporali et al.
   - 核心贡献: 提出临界阻尼 Polyak 步长规则（CDP），在理论和实践上引导梯度下降偏向更平坦的极小值（Flat Minima），提升模型泛化能力。

9. **[Asuka-FM: A System-Architectural Co-Design Framework for Efficient Text-to-Image Pretraining on Consumer Hardware](http://arxiv.org/abs/2611.26437v1)**
   - 作者: Víctor Rodrigo González et al.
   - 核心贡献: 构建了系统架构协同设计框架，打破算力垄断，实现在单块消费级 GPU 上高效进行文本到图像（T2I）基础模型的预训练。

#### 📊 应用（垂直领域、多模态、代码生成）
10. **[PlayCraft: Designing Engaging Games from Agent Play Experience](http://arxiv.org/abs/2611.26624v1)**
    - 作者: Weihao Cheng
    - 核心贡献: 提出自动化框架 PlayCraft，利用基于视觉的智能体通过游戏内游玩体验来自动设计并优化更具吸引力的游戏。

11. **[AgentRoboCritic: Understanding the Capability of Frontier Agents on Direct Robot Control](http://arxiv.org/abs/2611.26613v1)**
    - 作者: Yiyang Du et al.
    - 核心贡献: 深入评估前沿多模态语言智能体直接控制机器人的底层数值动作能力，弥补了以往仅关注片段级成功率的不足。

12. **[PGX: Physically Grounded Execution for Long-Horizon Humanoid Loco-Manipulation](http://arxiv.org/abs/2611.26596v1)**
    - 作者: Kai Lu et al.
    - 核心贡献: 提出物理接地执行（PGX）框架，解决人形机器人长周期、高精度的全身移动抓取（Loco-manipulation）任务。

13. **[Verify the Verifier: Specification-Grounded LLM Cross-Checking for Bugs That Escape UVM Scoreboards](http://arxiv.org/abs/2611.26588v1)**
    - 作者: Ana E. Sanchez Villalobos et al.
    - 核心贡献: 引入基于规范的 LLM 交叉检查机制，用于检测并捕获传统硬件验证 UVM 记分板中常漏掉的规范违例漏洞。

14. **[Awaken-HI: Scaling Humanoid Intelligence with Whole-Body Human Experience](http://arxiv.org/abs/2611.26420v1)**
    - 作者: EngineAI
    - 核心贡献: 推出 Awaken-Human 数据集及具身智能方案，结合第一人称视角与同步全身动作数据，推动人形机器人泛化能力的规模化Scaling。

---

### 📈 研究趋势信号
今日文献凸显出两个明显的趋势：首先，**大模型架构与权重的“深度编译”**正受到关注，研究者开始尝试在无需微调的情况下，将确定性电路和符号逻辑精确注入模型；其次，**智能体（Agent）安全与审计**正从小范围的对抗测试走向系统工程层面的事故复现、回溯与责任判定，这表明AI Agents正加速步入真实生产环境。

---

### 🔍 值得精读

1. **[A CPU Inside an LLM: Zero-Gradient Compilation of Exact Circuits into Pretrained Weights](http://arxiv.org/abs/2611.26450v1)**
   - **推荐理由**：传统大模型在多位数算术等精确计算上经常出错，通常依赖外挂工具或昂贵的梯度微调。该论文创新性地提出了零梯度电路移植原语，直接在预训练权重中编译精确电路，打破了“神经网络不擅长精确符号计算”的固有印象，具有极高的理论与应用启发性。
2. **[PGX: Physically Grounded Execution for Long-Horizon Humanoid Loco-Manipulation](http://arxiv.org/abs/2611.26596v1)**
   - **推荐理由**：具身智能（Embodied AI）正从简单的单步抓取迈向复杂的“长周期全身移动操作”。该文针对现有 VLA 模型在时间结构与物理精度耦合上的痛点给出了扎实的物理接地解决方案，对人形机器人落地具有风向标意义。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*