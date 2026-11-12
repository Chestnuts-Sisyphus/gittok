# ArXiv AI Research Digest 2026-11-12

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-11-12 01:44 UTC

---

# ArXiv AI Research Digest

## 1. Today's Highlights

Today’s selection reflects a key shift toward **agent memory reliability**, **principled post-training theory**, and **practical deployment efficiency**. 

* **Agent Reliability & Memory Mechanics:** Rather than accumulating past trajectory text indiscriminately, new frameworks introduce evidence-linked grounding and falsification gates to prevent "memory-induced degradation" during long-horizon tasks.
* **LLM Post-Training & Speculative Decoding:** Theoretical contributions formalize response coverage collapse in post-training optimization, while new objective functions directly optimize expected acceptance length for speculative decoding.
* **Agent Distillation & Deployment:** Researchers are moving from dynamic, high-cost multi-step reasoning agents toward distilled, planner-free workflows for enterprise tasks, alongside unified single-policy VLA models capable of handling dozens of distinct physical tasks.

---

## 2. Key Papers

### 🧠 Large Language Models

* **[A Theory of Policy Optimization in Post-Training: Coverage Collapse and Reference Resets](http://arxiv.org/abs/2611.14467v1)**
  * *Authors:* Audrey Huang, Nan Jiang, Sham M. Kakade et al.
  * *Key Contribution:* Establishes a theoretical framework for post-training policy optimization, defining base model response coverage and proving how coverage collapse limits policy performance.
* **[REAL Loss: Optimizing Real Expected Acceptance Length for Speculative Decoding](http://arxiv.org/abs/2611.14399v1)**
  * *Authors:* Yu Tian
  * *Key Contribution:* Proposes a training objective designed specifically to maximize expected acceptance length (EAL) in speculative decoding, outperforming standard KL-divergence training.
* **[AI Isn't Getting Dumber, We're Getting Pickier: Rising Standards in Human Evaluation of Large Language Models](http://arxiv.org/abs/2611.14333v1)**
  * *Authors:* Zihan Chen, Lei Nico Zheng, Di Zhu
  * *Key Contribution:* Analyzes Chatbot Arena evaluation data to prove that user complaints about LLM performance degradation stem primarily from rising human expectations rather than model decline.

### 🤖 Agents & Reasoning

* **[When Should Agents Remember? Falsification-Gated Self-Evolution for LLM Agents](http://arxiv.org/abs/2611.14326v1)**
  * *Authors:* Runxuan Tang, Haoyu Gao, Yuyan Ding et al.
  * *Key Contribution:* Introduces a falsification-gated mechanism that verifies trajectory lessons before storing them, eliminating toxic memory accumulation in autonomous agents.
* **[Don't Just Trust Your Memory: Evidence-Linked Memory Reduces Memory-Induced Degradation in LLM Agents](http://arxiv.org/abs/2611.14320v1)**
  * *Authors:* Yukyeong Lee, Yumin Choi, Jinheon Baek et al.
  * *Key Contribution:* Addresses agent degradation caused by flawed past lessons by linking long-term memories directly to verifiable ground-truth execution evidence.
* **[ReTrace: Distilling Tool-Using Agents into Planner-Free Workflows](http://arxiv.org/abs/2611.14492v1)**
  * *Authors:* Kaiyuan Hou, Yang Ping Kuo, Indranil Bhattacharya et al.
  * *Key Contribution:* Compiles dynamic multi-call agent trajectories into fixed, compiled execution graphs, eliminating per-step planning overhead for routine enterprise tasks.

### 🔧 Methods & Frameworks

* **[A Margin Perspective on LoRA: Robustness to Catastrophic Forgetting and Adapter Merging (MaLoRA)](http://arxiv.org/abs/2611.14397v1)**
  * *Authors:* Ziqing Xu, Hancheng Min, Lachlan Ewen MacDonald et al.
  * *Key Contribution:* Explains LoRA's resilience to catastrophic forgetting through classification margin theory and introduces a margin-aware loss (MaLoRA) to improve adapter merging.
* **[Blurring the Block Boundaries: Overlapping Block Denoising for Efficient Diffusion Language Models](http://arxiv.org/abs/2611.14387v1)**
  * *Authors:* Amir Mann, Jonathan Fhima, Shaked Brody et al.
  * *Key Contribution:* Proposes overlapping block denoising for non-autoregressive diffusion language models, eliminating boundary artifacts and speeding up generation latency.
* **[Mechanistic Interpretability Needs a Logic of Inference](http://arxiv.org/abs/2611.14483v1)**
  * *Authors:* Zhimin Hu, Chen Jiang, Hanbo Xie et al.
  * *Key Contribution:* Advocates for formal logical systems to validate causal claims in mechanistic interpretability, moving beyond purely correlation-based feature attributions.

### 📊 Applications

* **[One Policy for 100 Household Tasks: Our Solution for the 2026 BEHAVIOR Challenge](http://arxiv.org/abs/2611.14432v1)**
  * *Authors:* Ilia Larchenko, Gleb Zarin, Atindra Nair et al.
  * *Key Contribution:* Demonstrates that a single, unified Vision-Language-Action (VLA) neural network checkpoint can solve 100 complex, long-horizon household simulation tasks.
* **[Accurate predictions of properties of energetic materials with tabular foundation models](http://arxiv.org/abs/2611.14462v1)**
  * *Authors:* Vagn Krister Nes Glomsrud, Mathias Bynke, Lars Henry Berge Olsen et al.
  * *Key Contribution:* Demonstrates that un-tuned zero-shot tabular foundation models (TabPFN) outperform domain-

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*