# ArXiv AI Research Digest 2026-11-19

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-11-19 01:34 UTC

---

### Today's Highlights

The November 19, 2026 ArXiv batch showcases a major pivot toward self-improving autonomous systems, safety guarantees for multi-agent architectures, and more efficient training/inference dynamics for large language and vision models. Researchers are moving past raw benchmark score optimization, increasingly addressing deployment-level concerns such as runtime verification of natural language criteria, cross-organizational agent trust infrastructure, and the gap between coding benchmark scores and real-world software engineering productivity.

---

### Key Papers

#### 🧠 Large Language Models
* **Ambient LLMs: Data-Efficient Supervised Fine-tuning via Temperature Matching** [Link](http://arxiv.org/abs/2611.23229v1)  
  *Authors: G. Daras, M. Papachristou, A. Klivans et al.*  
  Proposes a temperature-matching technique for supervised fine-tuning that significantly mitigates overfitting and catastrophic forgetting when training datasets are smaller than pre-training corpora.
* **What Does a Bias Head Measure? Non-Identifiability in Head-Level Bias Attribution** [Link](http://arxiv.org/abs/2611.23218v1)  
  *Authors: S. M Seefat Alam*  
  Audits popular bias attribution methods on major instruction-tuned models, revealing that head-level fairness interventions rely on unverified statistics rather than genuine localization of social bias.
* **Large-scale Neuron Community Discovery Reveals Neuron-Sparse Behaviors in Language Models** [Link](http://arxiv.org/abs/2611.23112v1)  
  *Authors: I. Shilov, T. Fel, T. Haklay et al.*  
  Demonstrates that post-hoc sparse neuron groups form coherent, reusable computational "communities" across varied inputs rather than isolated firing patterns.

#### 🤖 Agents & Reasoning
* **Do LLM Agents Still Need to Be Told How to Self-Improve?** [Link](http://arxiv.org/abs/2611.23219v1)  
  *Authors: S. Sundaram, C. Sancaktar, P. Isola*  
  Examines whether frontier models can independently optimize their learning components without explicit human specification of optimization algorithms.
* **Agent Trust Infrastructure (ATI): A Federated Identity, Trust, Attestation, and Accountability Architecture for Cross-Organization Autonomous AI Agents** [Link](http://arxiv.org/abs/2611.23202v1)  
  *Authors: V. K. Nguyen, M. I. Husain*  
  Introduces a federated trust and verification architecture to safely handle cross-organizational agent collaboration and tool invocation.
* **Runtime Verification of Multiple Natural Language Criteria for Agent Governance** [Link](http://arxiv.org/abs/2611.23074v1)  
  *Authors: S. Pitis, P. A. Alamdari, J. Tang et al.*  
  Presents a tree-attention verifier (VFM) capable of efficiently evaluating agent outputs against hundreds of distinct natural language governance criteria simultaneously.

#### 🔧 Methods & Frameworks
* **Get Hint-Augmented GRPO Done Right Through Activation Steering** [Link](http://arxiv.org/abs/2611.23124v1)  
  *Authors: K. Le, T. Hua, N. V. Chawla*  
  Addresses GRPO's zero-reward failure mode on out-of-reach reasoning questions by combining hint augmentation with activation steering.
* **Colombo: A Frontier-to-Frontier Autoresearch System for Oracle-Based Optimization** [Link](http://arxiv.org/abs/2611.23080v1)  
  *Authors: H. Zhang, W. Wu, C. Zhang et al.*  
  Instantiates a self-organizing AI researcher that autonomously drives knowledge discovery from frontier to frontier within oracle-based optimization tasks.
* **Values Shape What Self-Improving Coding Agents Build** [Link](http://arxiv.org/abs/2611.23067v1)  
  *Authors: J. Liang, D. Waldner, R. Miikkulainen*  
  Shows that embedding brief value statements in agent persona descriptions fundamentally alters their problem-solving trajectories during open-ended software tasks.

#### 📊 Applications & Multimodal Systems
* **Spool: Low-Latency Streaming Inference for Hybrid Vision-Language Models** [Link](http://arxiv.org/abs/2611.23228v1)  
  *Authors: R. Ning, O. Chabra, H. Balakrishnan*  
  Optimizes streaming video comprehension over bounded time windows for assistive and robotic agents by interleaving attention mechanisms with linear recurrent layers.
* **Higher-Scoring Coding Models Did Not Get More Work Done** [Link](http://arxiv.org/abs/2611.23216v1)  
  *Authors: Y. Hua*  
  Empirically studies real-world developer productivity during forced tool changes, showing that higher coding benchmark scores do not reliably correlate with increased software output.
* **Reading Scene States: Uncovering Safety Failures in Vision-Language Models** [Link](http://arxiv.org/abs/2611.23206v1)  
  *Authors: T. Wu, Y. Cheng, J. Xian et al.*  
  Identifies scene-state safety vulnerabilities where VLMs inadvertently provide harmful assistance by interpreting complex visual environments and introduces *SceneSafetyBench*.

---

### Research Trend Signal

A dominant trend in this batch is the transition from **static performance evaluation to operational reliability**. For years, the community has tracked progress via benchmark scores (coding, reasoning, vision-language). However, papers like *Higher-Scoring Coding Models Did Not Get More Work Done* highlight a growing disconnect between leaderboard metrics and real-world utility. 

Concurrently, research on multi-agent safety (*Agent Trust Infrastructure*, *Runtime Verification of Multiple Natural Language Criteria*) signals that AI systems are moving out of sandboxed evaluation loops and into messy, production-grade enterprise and cross-organizational environments. As autonomous agents become self-improving, the bottleneck is no longer raw model capability, but rather our ability to govern, verify, and steer their internal objectives reliably.

---

### Worth Deep Reading

1. **Runtime Verification of Multiple Natural Language Criteria for Agent Governance** ([Link](http://arxiv.org/abs/2611.23074v1)): Essential reading for anyone deploying agentic workflows in production; it tackles the critical scaling bottleneck of checking model outputs against hundreds of concurrent textual constraints using innovative tree-attention mechanisms.
2. **Do LLM Agents Still Need to Be Told How to Self-Improve?** ([Link](http://arxiv.org/abs/2611.23219v1)): A thought-provoking study on recursive self-improvement that challenges core assumptions about human-specified reinforcement learning loops as models scale.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*