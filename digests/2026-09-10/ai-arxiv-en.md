# ArXiv AI Research Digest 2026-09-10

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-09 22:06 UTC

---

# ArXiv AI Research Digest (2026-09-10)

---

## 1. Today's Highlights

Today’s selection reflects a strong paradigm shift towards **autonomous agent scaffolding and system-level evolution**, moving beyond simple prompting into dynamic harness co-evolution, dynamic memory pruning, and structured procedural graphs. Crucially, research into **training dynamics and checkpoint mechanics** highlights unexamined flaws in standard pretraining-to-SFT pipelines and attention sink mechanisms. Meanwhile, embodied AI advances further into **physically-grounded continuous control**, linking whole-body vision-language-action (VLA) models to complex, contact-rich real-world environments.

---

## 2. Key Papers

### 🧠 Large Language Models
* **[Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1)**  
  *Authors:* S. Maskey, P. Scholl, J. Knupp et al.  
  *Contribution:* Demonstrates that standard pretraining loss and benchmark scores fail to predict post-SFT performance, revealing that optimal pretraining checkpoints vary wildly depending on downstream alignment goals.
* **[It's Not RoPE that Creates Sinks: The Role of Self-Concentration and Value-Non-Mixing in Attention](http://arxiv.org/abs/2609.09085v1)**  
  *Authors:* R. Kiya, S. Ohashi, K. Sato et al.  
  *Contribution:* Proves that attention sinks and massive activations stem from self-concentration and value-non-mixing in initial layers rather than Rotary Position Embeddings (RoPE), revising mechanistic understanding of attention dynamics.
* **[Training-Free Task Vectors for LLM Behavioral Control](http://arxiv.org/abs/2609.09054v1)**  
  *Authors:* G. J. Perin, L. Boscaini, A. Araujo et al.  
  *Contribution:* Introduces a technique to extract steering task vectors directly without needing computationally expensive fine-tuning or model checkpoints.
* **[Learning Length-Extrapolatable Recurrent Models](http://arxiv.org/abs/2609.09157v1)**  
  *Authors:* H. Jiang  
  *Contribution:* Analyzes the failure modes of BPTT-trained recurrent architectures beyond their training horizon and proposes techniques for true length-extrapolatable context modeling.

### 🤖 Agents & Reasoning
* **[Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1)**  
  *Authors:* Y. Lu, Y. Chen, S. Wu et al.  
  *Contribution:* Replaces unconstrained sequence generation in agents with self-evolving procedural graphs that explicitly formalize step order, conditions, and tool execution.
* **[Copying explains the collective behavior of AI agents in the wild](http://arxiv.org/abs/2609.09150v1)**  
  *Authors:* G. De Marzo, N. Alboré, D. Garcia  
  *Contribution:* Analyzes real-world emergent cooperation among sandboxed autonomous AI agents, showing that collective problem-solving spontaneously arose via simple copying strategies on a public wiki.
* **[Co-Evolving Harnesses and Models: On-Policy Correction Helps Weaker Models Catch Up Where Imitation Fails](http://arxiv.org/abs/2609.09134v1)**  
  *Authors:* Z. Yu, B. Bi, S. K. Pentyala et al.  
  *Contribution:* Shows that jointly evolving agent harnesses (system prompts, tool sets, execution hooks) with target models allows smaller models to outperform frontier models on complex domain tasks.
* **[MeClear: Cooperative Game-Theoretic Attribution and Risk-Aware Memory Clearance for Long-Horizon LLM Agents](http://arxiv.org/abs/2609.09115v1)**  
  *Authors:* B. Yang, J. Sun, Z. Lu et al.  
  *Contribution:* Employs cooperative game theory to attribute downstream utility to context memory, safely purging stale or misleading knowledge in long-horizon interactions.

### 🔧 Methods & Frameworks
* **[ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR](http://arxiv.org/abs/2609.09075v1)**  
  *Authors:* T. Sha, S. Zhai, S. Zhao  
  *Contribution:* Eliminates wasteful zero-advantage updates in GRPO-based Reinforcement Learning with Verifiable Rewards by predicting prompt difficulty prior to trajectory rollouts.
* **[ToolLoop: Closed-Loop Tool-Use Data Synthesis via Decomposed Generation and Dynamic Self-Feedback](http://arxiv.org/abs/2609.09072v1)**  
  *Authors:* M. Zeng, Y. Liu, Z. Cao et al.  
  *Contribution:* Proposes a closed-loop synthetic pipeline that iteratively generates and refines tool-use trajectories, mitigating static post-hoc filtering imbalances.
* **[Measuring LLM Sycophancy under Sustained Multi-Turn Pressure](http://arxiv.org/abs/2609.09090v1)**  
  *Authors:* L. Tang, K. Wei, T. Jiang et al.  
  *Contribution:* Develops the SPINE benchmark to evaluate LLM sycophancy and belief collapse under prolonged, adaptive multi-turn user pushback.

### 📊 Applications
* **[TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body Vision-Language-Action Model](http://arxiv.org/abs/2609.09158v1)**  
  *Authors:* A. Li, Y. Chen, Z. Li et al.  
  *Contribution:* Unifies navigation and geometry-aware whole-body control (arm placement, body turning) into a continuous VLA model for humanoid indoor navigation.
* **[ExecCritic: Learn to Test, Test to Improve for Coding Agents](http://arxiv.org/abs/2609.09133v1)**  
  *Authors:* L. Tao, B. Peng, H. Wang et al.  
  *Contribution:* Prevents code generation agents from writing buggy self-verifying test cases by decoupling test generation from patch writing through an execution-critic model.
* **[Omni Interaction Agent Technical Report](http://arxiv.org/abs/2609.08977v1)**  
  *Authors:* Orantqing, S. Ji, J. Tong et al.  
  *Contribution:* Introduces *Gander*, an end-to-end multi-modal interaction agent operating on continuous streaming audio, video, and text inputs without traditional turn-based constraints.

---

## 3. Research Trend Signal

A major shift highlighted in today's submissions is the **transition from static prompting/scaffolding to dynamic, self-evolving agent architectures**. Rather than treating agents as static models wrapped in static prompts, researchers are adopting co-evolutionary approaches—simultaneously modifying agent harnesses, execution graphs, and long-term memory banks (e.g., *Procedural Graphs*, *Co-Evolving Harnesses*, *MeClear*). 

Concurrently, there is a distinct move toward **rigorous, post-hoc examination of default training assumptions**. Researchers are calling into question standard metric proxy choices: demonstrating that early pretraining loss is

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*