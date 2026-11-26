# ArXiv AI Research Digest 2026-11-26

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-11-26 02:33 UTC

---

### Today's Highlights

Today's ArXiv submissions highlight a strong push toward agentic efficiency, test-time compute optimization, and robust cross-modal alignment. A recurring theme is the cost-performance tradeoff in deployment, with researchers introducing novel routing, delegation, and drafting frameworks to replace monolithic frontier models with modular, resource-efficient workflows. Furthermore, advances in understanding internal model representations—ranging from sparse feature learning to the analysis of fine-tuning dynamics—underscore the community's ongoing commitment to model interpretability and alignment.

---

### Key Papers

#### 🧠 Large Language Models
* **Rethinking Knowledge Distillation for Diffusion Language Models** | http://arxiv.org/abs/2611.33670v1 *(Authors: Yuxuan Sun, Yuanjian Xu, Jianing Hao et al.)*  
  Uncovers non-intuitive failures of classical forward-KL distillation in diffusion language models, offering the first systematic study of KD in this paradigm.
* **Sparse-to-Sparse Feature Learning for Cross-Layer Analysis and Steering** | http://arxiv.org/abs/2611.33640v1 *(Authors: Masahiro Kaneko, Ayana Niwa, Timothy Baldwin)*  
  Proposes a novel sparse-to-sparse feature learning objective to capture cross-layer structural information for better model interpretation and control.
* **Two Timescales of Forgetting in Fine-tuning of Language Models: Fast Behavioral Suppression and Slow Representational Drift** | http://arxiv.org/abs/2611.33302v1 *(Authors: Yilin Luo, Jin Hwa Lee, Andrew M. Saxe et al.)*  
  Identifies a dual-timescale mechanism in LLM fine-tuning, distinguishing rapid behavioral suppression from gradual representational drift.
* **Lost in Translation, Not in Confidence: Benchmarking and Calibrating Multilingual Decision Models** | http://arxiv.org/abs/2611.33307v1 *(Authors: Mingzhe Du, Thong Thanh Nguyen, Nguyen Tran Cong Duy et al.)*  
  Evaluates 25 top open-weight multilingual decision models across 17 tasks to understand how language shifts impact confidence calibration and guardrail effectiveness.

#### 🤖 Agents & Reasoning
* **Sports Agent: A Self-Evolving System for Conversational Data Analytics** | http://arxiv.org/abs/2611.33700v1 *(Authors: Chao Chen, Fuqi Lin, Ze Chen et al.)*  
  Presents a self-evolving conversational sports analytics agent driven by runtime evidence to combat performance degradation from shifting query distributions.
* **Failure Broadens, Success Sharpens: Continual Adaptation of Tool-Use Agents Across Diverse Tasks with Dual-Polarity Memory** | http://arxiv.org/abs/2611.33612v1 *(Authors: Tianmai M. Zhang, Hoda Shajari, Amr Hendy et al.)*  
  Demonstrates how procedural memories derived from local successes and failures serve distinct, complementary roles in the continual self-improvement of tool-use agents.
* **Partial Routing: Trace-Tuned Delegation for Resource-Efficient Agentic Workflows** | http://arxiv.org/abs/2611.33402v1 *(Authors: Siddharth Arya, Kshitij Jain)*  
  Introduces partial routing to delegate easy subtasks within single agentic workflows to cheaper models, optimizing cost without hurting capabilities.
* **Delegent: A Multi-Agent Harness That Reduces Cost without Sacrificing Performance** | http://arxiv.org/abs/2611.33098v1 *(Authors: Lingwei Gu, Jimmy Lin)*  
  Proposes a multi-agent harness that cuts down the massive token-reading costs of frontier models by offloading routine subtasks to smaller language models.

#### 🔧 Methods & Frameworks
* **NORMCRAFT: Cultural Norm Generation for Context-Aware Language Model Alignment** | http://arxiv.org/abs/2611.33726v1 *(Authors: Tangyuan Zhang, Zhuang Li, Fatemeh Shiri et al.)*  
  Tackles implicit social norm inference for cultural alignment by jointly learning norm generation and downstream response formatting.
* **State Space Attention: Learning Context-Dependent Memory Retention** | http://arxiv.org/abs/2611.33625v1 *(Authors: Ege Çakar, Cengiz Pehlevan)*  
  Introduces State Space Attention to replace fixed key-value cache bounds with learned, context-dependent memory retention for long-context reasoning.
* **Draft Calibration for Speculative Decoding: Accelerating LLM Serving by Matching Draft and Target Distributions** | http://arxiv.org/abs/2611.33111v1 *(Authors: Yuxing Liu, Wei Zuo, Walid Krichene et al.)*  
  Improves speculative decoding throughput by aligning draft and target distributions to maximize token acceptance probability.
* **Reinforcement Learning Can Be Recovered From Its Own Rollouts** | http://arxiv.org/abs/2611.33102v1 *(Authors: Jiayi Sheng, Jingwen Gu, Guanning Zeng et al.)*  
  Investigates how knowledge generated during RL post-training can be systematically recovered and harvested from model rollouts rather than treating them as disposable.

#### 📊 Applications & Multimodal
* **SEEL: Towards End-to-End 3D Sign Generation with Language Models** | http://arxiv.org/abs/2611.33588v1 *(Authors: Ronglai Zuo, Fei Ni, Junpeng Jing et al.)*  
  Unifies motion tokenizers and language models into a single end-to-end pipeline for generating realistic 3D sign language from text.
* **HumblePRM: Improving VLM Abstention in Ambiguous Situations through Process Reward Modeling** | http://arxiv.org/abs/2611.33452v1 *(Authors: Saket Reddy, Ke Yang, ChengXiang Zhai)*  
  Leverages process reward modeling to train vision-language models to abstain when visual evidence is too ambiguous, bridging confidence and visual grounding.
* **Building a Unified Inline Code Editing Model for GitHub Copilot** | http://arxiv.org/abs/2611.33314v1 *(Authors: Microsoft CodeAI Team, Microsoft VS Code Team, Julia Gong et al.)*  
  Presents a unified inline editing architecture capable of predicting multi-line edits and diverse coding intentions across varying cursor proximities.

---

### Research Trend Signal

Today's papers strongly reflect an industry-wide pivot from "brute-force scaling" of foundational models to **architectural economics and test-time modularity**. Two distinct trends stand out:

1. **Sub-Task Delegation & Hybrid Workflows:** Rather than passing entire contexts through expensive frontier models, papers like *Partial Routing* and *Delegent* highlight an architectural shift toward granular task decomposition. Easy subtasks are aggressively routed to smaller, specialized models, yielding substantial cost savings without compromising task accuracy.
2. **Harvesting Test-Time Compute & Memory Dynamics:** The field is increasingly focusing on how models manage internal state over time (e.g., *State Space Attention*, *Two Timescales of Forgetting*, and *Reinforcement Learning Can Be Recovered From Its Own Rollouts*). Researchers are treating model rollouts and recurrent states not as transient disposable artifacts, but as valuable data distributions that can be distilled, recovered, and optimized for continuous agentic evolution.

---

### Worth Deep Reading

1. **Partial Routing: Trace-Tuned Delegation for Resource-Efficient Agentic Workflows** (http://arxiv.org/abs/2611.33402v1)  
   *Why:* As agentic loops become longer and more expensive, coarse model selection is no longer viable. This paper addresses a core practical bottleneck—mixed-difficulty steps within a single agent workflow—offering an actionable blueprint for production-grade cost reduction.
2. **State Space Attention: Learning Context-Dependent Memory Retention** (http://arxiv.org/abs/2611.33625v1)  
   *Why:* Long-context LLMs remain bottlenecked by KV-cache memory footprints. By introducing a principled, learned approach to context-dependent memory retention, this work bridges the gap between state-space models and traditional attention mechanisms.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*