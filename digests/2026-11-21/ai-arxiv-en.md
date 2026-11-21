# ArXiv AI Research Digest 2026-11-21

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-11-21 00:59 UTC

---

### 1. Today's Highlights
Today's ArXiv AI batch highlights a strong shift toward operational efficiency, fine-tuning mechanisms, and physically grounded execution for autonomous agents and robotics. Researchers are increasingly focusing on making large-scale AI models usable on consumer or edge hardware, ranging from closed-form weight compilation and hybrid LLM serving systems to whole-body humanoid intelligence datasets. Furthermore, a growing body of work evaluates internal reasoning mechanisms—such as workspace theory, deception geometry, and activation steering—providing deeper interpretability for post-trained and reasoning-intensive models.

---

### 2. Key Papers

#### 🧠 Large Language Models
* **TideCache: Efficient Hybrid LLM Serving with Transparent Cache Management and Layer-Wise Streaming**
  * Link: [http://arxiv.org/abs/2611.26619v1](http://arxiv.org/abs/2611.26619v1)
  * Authors: Jinbin Luo et al.
  * *Contribution:* Proposes a novel serving system for hybrid-architecture open-weight language models on CPU–GPU superchips, improving cache management and streaming for varying context lengths.

* **Represented but misread: Post-training changes how language models read out what they represent**
  * Link: [http://arxiv.org/abs/2611.26584v1](http://arxiv.org/abs/2611.26584v1)
  * Authors: Jochen Laubrock
  * *Contribution:* Demonstrates via signal detection theory that post-training primarily alters *how* models read out internal representations rather than changing the underlying representations themselves.

* **A CPU Inside an LLM: Zero-Gradient Compilation of Exact Circuits into Pretrained Weights**
  * Link: [http://arxiv.org/abs/2611.26450v1](http://arxiv.org/abs/2611.26450v1)
  * Authors: Tanmay Sah
  * *Contribution:* Introduces closed-form circuit-grafting primitives that compile deterministic execution directly into pretrained LM weights with zero training, resolving arithmetic reliability issues.

#### 🤖 Agents & Reasoning
* **PGX: Physically Grounded Execution for Long-Horizon Humanoid Loco-Manipulation**
  * Link: [http://arxiv.org/abs/2611.26596v1](http://arxiv.org/abs/2611.26596v1)
  * Authors: Kai Lu et al.
  * *Contribution:* Addresses long-horizon robotics bottlenecks by tightly coupling physical execution and temporal structure, moving beyond monolithic VLA models.

* **FLUID: Flexible, Evidence-Grounded Situated Task Guidance**
  * Link: [http://arxiv.org/abs/2611.26491v1](http://arxiv.org/abs/2611.26491v1)
  * Authors: Yunqi Zhao et al.
  * *Contribution:* Proposes a flexible real-time task guidance framework that accommodates multiple appropriate responses, timings, and intentional silence during live assistance.

* **Seer: Guiding Small Deep-Research Agents with Shared Decision Models**
  * Link: [http://arxiv.org/abs/2611.26423v1](http://arxiv.org/abs/2611.26423v1)
  * Authors: Yuhao Zhou et al.
  * *Contribution:* Enables privacy-preserving on-device deep-research agents by using shared decision models to guide smaller, resource-constrained local models.

#### 🔧 Methods & Frameworks
* **RL Post-Training in Diffusion Transformers Is Activation Steering**
  * Link: [http://arxiv.org/abs/2611.26627v1](http://arxiv.org/abs/2611.26627v1)
  * Authors: Tuna Han Salih Meral et al.
  * *Contribution:* Uncovers that reinforcement learning post-training in diffusion transformers primarily operates functionally as activation steering.

* **AutoMaster: Autonomous Post-Training by Making the Same Model a Better Teacher**
  * Link: [http://arxiv.org/abs/2611.26510v1](http://arxiv.org/abs/2611.26510v1)
  * Authors: Guoxin Chen et al.
  * *Contribution:* Proposes Skill-Guided Fine-Tuning (Skill-FT), using natural-language skills to filter out unsupported assumptions and unproductive loops from teacher trajectories during post-training.

* **Asuka-FM: A System-Architectural Co-Design Framework for Efficient Text-to-Image Pretraining on Consumer Hardware**
  * Link: [http://arxiv.org/abs/2611.26437v1](http://arxiv.org/abs/2611.26437v1)
  * Authors: Víctor Rodrigo González et al.
  * *Contribution:* Co-designs system architecture to enable efficient text-to-image foundation model pretraining directly on single consumer GPUs.

#### 📊 Applications & Multimodal
* **PlayCraft: Designing Engaging Games from Agent Play Experience**
  * Link: [http://arxiv.org/abs/2611.26624v1](http://arxiv.org/abs/2611.26624v1)
  * Authors: Weihao Cheng
  * *Contribution:* Automates game design optimization by leveraging vision-based agents to play and tune mechanics based on engagement and mastery metrics.

* **The Geometry of Lies: Knowledge and Persona Directions for Detecting Deception in Large Language Models**
  * Link: [http://arxiv.org/abs/2611.26545v1](http://arxiv.org/abs/2611.26545v1)
  * Authors: Md. Abdullah Al Zami et al.
  * *Contribution:* Expands persona banks to detect deception and lies about knowledge at 70B scale, overcoming failures of traditional linear probes.

* **Awaken-HI: Scaling Humanoid Intelligence with Whole-Body Human Experience**
  * Link: [http://arxiv.org/abs/2611.26420v1](http://arxiv.org/abs/2611.26420v1)
  * Authors: EngineAI
  * *Contribution:* Introduces comprehensive synchronized whole-body human motion datasets to scale loco-manipulation learning for humanoid robots.

---

### 3. Research Trend Signal
Today’s submissions emphasize **efficiency-driven democratization** and **mechanistic interpretability** across domains. First, researchers are heavily optimizing hardware and training paradigms—such as compiling circuits directly into weights (`http://arxiv.org/abs/2611.26450v1`) and co-designing frameworks for single-GPU T2I pretraining (`http://arxiv.org/abs/2611.26437v1`)—to lower the barrier for academic and edge deployment. Second, there is a clear methodological maturation in agentic systems: rather than scaling monolithic models, the community is building modular architectures (e.g., decoupled decision models, physical grounding layers, and skill-guided post-training) to tackle long-horizon reasoning and robotics challenges reliably. Finally, interpretability work is moving beyond correlation toward actionable control, mapping the internal geometry of deceptions and activation steering mechanisms.

---

### 4. Worth Deep Reading
1. **A CPU Inside an L.M: Zero-Gradient Compilation of Exact Circuits into Pretrained Weights** ([http://arxiv.org/abs/2611.26450v1](http://arxiv.org/abs/2611.26450v1)): *Why read it:* It challenges standard paradigms of fine-tuning or external tool use by proving that deterministic computations can be structurally engineered directly into pretrained weights without gradient descent.
2. **RL Post-Training in Diffusion Transformers Is Activation Steering** ([http://arxiv.org/abs/2611.26627v1](http://arxiv.org/abs/2611.26627v1)): *Why read it:* By demystifying the black box of RL post-training in generative vision models, this paper bridges empirical reinforcement learning improvements with explicit vector-space interpretations.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*