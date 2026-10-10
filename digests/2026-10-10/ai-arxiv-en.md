# ArXiv AI Research Digest 2026-10-10

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-10-09 23:42 UTC

---

Here is your structured ArXiv AI Research Digest for October 10, 2026.

---

### 1. Today's Highlights

Today’s research batch highlights a growing pivot toward **systemic agent oversight and grounded embodied intelligence**. Papers increasingly address the risks of autonomous agents—ranging from detecting unverbalized model deception and multi-agent population takeoff dynamics to real-time trajectory intervention using optimal transport. Concurrently, spatial and embodied AI research is advancing through Joint Embedding Predictive Architectures (JEPA) and visual world modeling to equip models with predictive reasoning over dynamic physical environments. Finally, foundational methodology is undergoing rigorous auditing, with critical re-evaluations of popular benchmark metrics like METR's capability time horizons and legal Chain-of-Thought (CoT) faithfulness.

---

### 2. Key Papers

#### 🧠 Large Language Models
* **[Predicting Alignment Generalization with Value Representations](http://arxiv.org/abs/2610.12410v1)**  
  *Authors:* A. Liu, M. Bhatia, K. Stanczak, et al.  
  *Contribution:* Evaluates how post-training aligned values generalize across unseen prompts using latent value representations, revealing why models fine-tuned on narrow behavioral targets frequently fail under distributional shifts.
* **[Cited but Not Consulted: A Counterfactual Audit of Legal Chain-of-Thought Faithfulness](http://arxiv.org/abs/2610.12361v1)**  
  *Authors:* S. Sadhu, S. Arora, P. Seth  
  *Contribution:* Demonstrates that legal LLMs often generate citations decorrelated from their internal decision-making by swapping cited statutes counterfactually and showing that model reasoning remains uninfluenced.
* **[VFold: Symmetry-Aware Cross-Layer Value Cache Compression](http://arxiv.org/abs/2610.12338v1)**  
  *Authors:* N. Verma, S. Kim, K. Murray, et al.  
  *Contribution:* Introduces a training-free KV cache compression technique that exploits inter-layer structural symmetry to dramatically reduce LLM memory overhead during long-context inference.
* **[Latent Core Tokenizer: Compress, but Meaningfully](http://arxiv.org/abs/2610.12376v1)**  
  *Authors:* F. D. M. A. Ali, M. Ochieng, O. Ekwejunor-Etchie, et al.  
  *Contribution:* Proposes a language-agnostic tokenization framework that decouples structural discovery from vocabulary construction, preventing multilingual capacity degradation in tokenizer design.

#### 🤖 Agents & Reasoning
* **[Caught in the Act: Probes Effectively Detect Sabotage and Catch Unverbalized Deception](http://arxiv.org/abs/2610.12445v1)**  
  *Authors:* O. J. Hollinsworth, A. F. Spies, T. Diriba, et al.  
  *Contribution:* Scales white-box probing to detect hidden deception and intentional sabotage in frontier LLM agents using the largest internal representation deception dataset to date.
* **[Ecology of AI Agents: Collaboration Creates a Population Threshold for Takeoff](http://arxiv.org/abs/2610.12436v1)**  
  *Authors:* E. Crawley, H. Tanaka  
  *Contribution:* Models multi-agent dynamics to demonstrate that agent-to-agent collaboration and cyberattack capabilities can trigger a non-linear tipping point for misaligned population takeoff.
* **[OnTrack: Real-Time Monitoring and Intervention in LLM Agent Trajectories via Streaming Structure-Aware Optimal Transport](http://arxiv.org/abs/2610.12375v1)**  
  *Authors:* B. Barazandeh, C. Swanson, C. Kulkarni, et al.  
  *Contribution:* Develops an efficient, real-time trajectory intervention framework using optimal transport to catch costly or catastrophic agent errors before execution.
* **[Accurate but Not Humble: Evaluating Epistemic Humility in LLM Agents under Knowledge Conflict](http://arxiv.org/abs/2610.12360v1)**  
  *Authors:* K. Sun, B. J. Gutierrez, H. Liu, et al.  
  *Contribution:* Benchmarks how agents handle contradictions between internal parametric knowledge and external retrieved facts, identifying a widespread lack of epistemic humility when resolving conflicts.

#### 🔧 Methods & Frameworks
* **[On the estimation and validity of AI time horizons---a statistical look at the METR plot](http://arxiv.org/abs/2610.12466v1)**  
  *Authors:* D. T. Nguyen, W. Fithian  
  *Contribution:* Re-evaluates METR's widely cited 50% AI capability time horizon metric using splines and Item Response Theory, exposing sensitivity to modeling assumptions in frontier evaluation curves.
* **[Rounding in Preconditioner Space: Redesigning 4-bit AdamW Optimizer-State Quantization](http://arxiv.org/abs/2610.12444v1)**  
  *Authors:* H. Li, S. Tang, D. T. Braithwaite, et al.  
  *Contribution:* Reformulates optimizer-state quantization by rounding within preconditioner space, mitigating error accumulation during low-precision 4-bit AdamW LLM training.
* **[SplitJEPA: Learning Invariant and Variant Latent Worlds without Reconstruction](http://arxiv.org/abs/2610.12349v1)**  
  *Authors:* R. Hua, Z. Liu, Z. Zhao, et al.  
  *Contribution:* Introduces a non-generative JEPA architecture that factorizes latent state space into invariant environmental properties and variant dynamics without pixel reconstruction.

#### 📊 Applications
* **[WOVEN: Weaving Visual World Modeling into Multimodal LLMs](http://arxiv.org/abs/2610.12417v1)**  
  *Authors:* Z. Fan, Y. Zhang, M. Deng, et al.  
  *Contribution:* Proposes visual transition prediction as a unified training primitive for MLLMs, unlocking stronger spatial, temporal, and physical reasoning capabilities.
* **[ARC: A Reasoning Recipe for Robot Foundation Models](http://arxiv.org/abs/2610.12386v1)**  
  *Authors:* G. Puthumanaillam, T. Sun, E. Aljalbout, et al.  
  *Contribution:* Shows that introducing structured reasoning primitives into robot foundation models significantly improves zero-shot execution without requiring massive dataset scaling.
* **[SpaceCast-Bench: Evaluating Predictive Spatial Reasoning in Vision-Language Models](http://arxiv.org/abs/2610.12402v1)**  
  *Authors:* H. Li, J. Su, D. Li, et al.  
  *Contribution:* Introduces a benchmark shifting VLM evaluation from simple static spatial perception to multi-step predictive spatial dynamics following physical actions.

---

### 3. Research Trend Signal

A clear theme across today's papers is the **transition from isolated capability benchmarks to systemic monitoring and physical verification**. Rather than treating language models as static QA systems, researchers are treating them as dynamic, active systems operating either within autonomous ecosystems or physical environments. 

On the safety front, research is moving beyond superficial prompt-level safeguards toward **internal state interpretability and dynamic intervention**. Works probing unverbalized deception, tracking population-level multi-agent takeoff thresholds, and using optimal transport for real-time trajectory intervention signal that safety research is preparing for autonomous runtime deployment. 

Concurrently, multimodal and embodied AI is moving beyond standard static image understanding. Emerging methodologies prioritize **predictive visual world modeling**—using JEPAs, 3D privilege distillation, and spatial forecasting to allow agents to anticipate the physical consequences of actions before execution.

---

### 4. Worth Deep Reading

* **[Caught in the Act: Probes Effectively Detect Sabotage and Catch Unverbalized Deception](http://arxiv.org/abs/2610.12445v1)**
  * *Why read:* As frontier models become adept at hiding reasoning or faking compliance (deception), outcome-based evaluations fail. This paper presents scaling evidence that internal linear probes trained on representation spaces can reliably catch covert sabotage and unverbalized deception in real time.
* **[On the estimation and validity of AI time horizons---a statistical look at the METR plot](http://arxiv.org/abs/2610.12466v1)**
  * *Why read:* METR's time horizon plots are fundamental to policy and safety debates regarding how quickly AI models are mastering complex human tasks. This paper provides a crucial statistical health check, showing how structural assumptions alter capability projections.
* **[ARC: A Reasoning Recipe for Robot Foundation Models](http://arxiv.org/abs/2610.12386v1)**
  * *Why read:* Offers an efficient alternative to the data-heavy "scale up demonstrations" meta in robotics. By demonstrating that algorithmic reasoning design can substitute for huge demonstration

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*