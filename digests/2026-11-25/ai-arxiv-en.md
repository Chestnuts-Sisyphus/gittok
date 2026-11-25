# ArXiv AI Research Digest 2026-11-25

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-11-25 03:15 UTC

---

## ArXiv AI Research Digest (2026-11-25)

### 1. Today's Highlights
Today's submissions reflect a maturing AI landscape, shifting focus from raw scaling to efficiency, steerability, and domain-specific robustness. Significant interest is directed toward optimizing the inference stack for edge devices through speculative decoding and memory-efficient architectures like DeltaNet. Furthermore, there is a clear trend toward "hypothesis-driven" and "surgical" fine-tuning, where developers seek to rectify specific behavioral failures rather than performing indiscriminate training. These developments signal a move toward more granular control over model output and reduced dependence on massive compute overhead.

---

### 2. Key Papers

#### 🧠 Large Language Models
* **[Fix How It Acts, Not How It Thinks: Surgical Fine-Tuning of Frontier LLMs](http://arxiv.org/abs/2611.32064v1)** (Singh Sandha et al.) — Proposes a surgical approach to fine-tuning that targets specific execution trajectory errors rather than reasoning capabilities, improving agentic reliability.
* **[Steerable by Design: Conditional Pretraining for Robust Control of Language Models](http://arxiv.org/abs/2611.32199v1)** (Castillo et al.) — Introduces conditional pretraining to embed steerability into the model foundation, moving control beyond inference-time prompting.
* **[DAiSy: Online Data Selection by Adaptive Utility Estimation for LLM Pretraining](http://arxiv.org/abs/2611.32294v1)** (Fan & Jaggi) — Presents a method for model-aware data selection that prioritizes high-utility training documents during pretraining.

#### 🤖 Agents & Reasoning
* **[CriticJEPA: World Models Are Better Critics Than Optimizers](http://arxiv.org/abs/2611.32357v1)** (Liu et al.) — Argues that visual world models should serve as critics to evaluate plans, as continuous gradient-based optimization often exploits predictive errors.
* **[Online Environment Repair for Coding Agents](http://arxiv.org/abs/2611.32037v1)** (Lu et al.) — Addresses reward hacking in coding agents by dynamically repairing harness defects and unit tests during reinforcement learning.

#### 🔧 Methods & Frameworks
* **[FlashQLA: Efficient Context Parallelism for Gated DeltaNet](http://arxiv.org/abs/2611.32039v1)** (Lin et al.) — Enables efficient long-context processing in recurrent-style models by introducing context-parallel updates for Gated DeltaNet.
* **[Fractal Neural Synthesis: Constant-Storage Procedural Weight Derivation via Complex Quadratic Boundary Dynamics](http://arxiv.org/abs/2611.32393v1)** (Dagli et al.) — Proposes a procedural weight generation method that maintains constant storage costs, crucial for edge microcontroller deployments.
* **[Pando: Noise-Coupled Parallel Draft Trees for Efficient Edge Speculative Decoding](http://arxiv.org/abs/2611.32269v1)** (Dumoulin et al.) — Improves inference speed on edge devices by utilizing parallel draft trees to verify multiple tokens in a single pass.

#### 📊 Applications
* **[ASTERISM: Do Multimodal LLMs Actually Look at All the Images?](http://arxiv.org/abs/2611.32316v1)** (Cho et al.) — Audits multimodal benchmarks, revealing that many current MLLMs fail to aggregate multi-image evidence and instead rely on single-image heuristics.
* **[KKT Atlas: Learning Low-Dimensional Local Scenario Models for Contextual Stochastic Optimization](http://arxiv.org/abs/2611.32071v1)** (You et al.) — Combines local scenario modeling with stochastic optimization to reduce the computational cost of complex operational planning.

---

### 3. Research Trend Signal
The research submitted today highlights a critical shift: **"Inference-Efficiency for the Edge."** We are seeing a move away from the assumption of infinite cloud compute, with papers like *Pando* (speculative decoding) and *FlashQLA* (Gated DeltaNet context parallelism) demonstrating that practitioners are deeply invested in making long-context LLMs functional on resource-constrained hardware. 

Simultaneously, a theme of **"Precision Alignment"** is emerging. Rather than relying on broad Reinforcement Learning from Human Feedback (RLHF) to cover all failure modes, researchers are exploring targeted interventions (e.g., *Surgical Fine-Tuning* and *Environment Repair for coding agents*). This indicates that the AI community is increasingly treating LLMs as production software components, requiring high-fidelity debugging and robust, deterministic control mechanisms. The integration of traditional mathematical frameworks—like Continued Fractions and PDE solvers—with neural networks suggests that "neuro-symbolic" and "mathematically-informed" deep learning remains a vibrant area for high-performance scientific and operational computing.

---

### 4. Worth Deep Reading

1. **[Fix How It Acts, Not How It Thinks: Surgical Fine-Tuning of Frontier LLMs](http://arxiv.org/abs/2611.32064v1)**: This paper addresses a pain point for everyone working with AI agents. By distinguishing between "reasoning failure" and "execution failure," it offers a practical, actionable paradigm for improving agent performance.
2. **[CriticJEPA: World Models Are Better Critics Than Optimizers](http://arxiv.org/abs/2611.32357v1)**: A compelling critique of modern gradient-based planning. It offers a fresh perspective on how to utilize world models effectively, which is essential for the next generation of robust autonomous agents.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*