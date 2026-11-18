# AI Open Source Trends 2026-11-18

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-11-18 01:57 UTC

---

### **AI Open Source Trends Report — 2026-11-18**

---

### **1. Today's Highlights**
The open-source AI ecosystem is witnessing a "shift from models to agents," with today's trending repositories dominated by **agentic skills frameworks** and **multi-agent orchestration tools**. A key highlight is the explosion of *Agent User Interaction (AG-UI)* protocols and **coding agent fleets** (like Orca), indicating a transition from single-model usage to complex multi-agent workflows. Additionally, a surge in **"Agent Skills"**—specialized tools for coding agents to perform specific tasks like video editing (FFmpeg) or code review—is standardizing how AI agents operate.

---

### **2. Top Projects by Category**

#### **🔧 AI Infrastructure & Tools**
*Tools, SDKs, and infrastructure to support AI development and deployment.*

*   **[stablyai/orca](https://github.com/stablyai/orca)** [TypeScript] ⭐127,900 (+1,066)
    *   **What it is:** A platform to run fleets of coding agents (Claude Code, Codex) with your own subscriptions. **Why:** It addresses the "orchestration" gap, allowing developers to manage multiple agents effectively rather than just running single prompts.
*   **[dream-num/univer](https://github.com/dream-num/univer)** [TypeScript] ⭐28,927 (+1,774)
    *   **What it is:** An office suite SDK that brings collaborative editing and calculation to AI agents. **Why:** It moves beyond text chat, enabling AI agents to manipulate documents, spreadsheets, and presentations natively.
*   **[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)** [TypeScript] ⭐20,034 (+1,445)
    *   **What it is:** The Agent-User Interaction Protocol, bringing agents into frontend applications. **Why:** It provides the technical standard for how AI agents visually interact with user interfaces, a critical infrastructure layer for the next generation of apps.
*   **[kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill)** [Python] ⭐7,766 (+1,292)
    *   **What it is:** A local video editor skill for coding agents using FFmpeg. **Why:** It exemplifies the trend of "Agent Skills"—specialized, machine-readable tools that extend agent capabilities to media processing without human intervention.
*   **[google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)** [Python] ⭐3,075 (+1,072)
    *   **What it is:** A multi-agent framework for automated AI research paper writing. **Why:** A high-profile research initiative demonstrating how multi-agent systems can collaborate on complex tasks like scientific writing.

#### **🤖 AI Agents / Workflows**
*Frameworks and systems for autonomous AI agents.*

*   **[obra/superpowers](https://github.com/obra/superpowers)** [Shell] ⭐319,372 (+1,917)
    *   **What it is:** An agentic skills framework and software development methodology. **Why:** The #1 trending project today, indicating a massive community pivot toward "skills-based" agent development.
*   **[affaan-m/ECC](https://github.com/affaan-m/ECC)** [JavaScript] ⭐305,551 (+883)
    *   **What it is:** The Agent Harness Performance Optimization system (Skills, instincts, memory). **Why:** It tackles the performance and architecture bottlenecks of running multiple agents simultaneously.
*   **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** [JavaScript] ⭐193,116 (+862)
    *   **What it is:** A tool that makes AI agents think like lazy senior developers. **Why:** It gamifies agent behavior, promoting efficiency and minimalism in code generation.
*   **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** [Python] ⭐149,689 (+649)
    *   **What it is:** Converts codebases into queryable knowledge graphs for agents. **Why:** It enables agents to understand complex legacy codebases and documentation dynamically.

#### **📦 AI Applications**
*End-user applications and specific solutions.*

*   **[pbakaus/impeccable](https://github.com/pbakaus/impeccable)** [Rust] ⭐112,233 (+748)
    *   **What it is:** The design vocabulary for coding agents (audit, critique, catch "slop"). **Why:** It focuses on the "human-in-the-loop" review process, helping developers audit AI-generated code before it ships.
*   **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** [Go] ⭐53,768 (+763)
    *   **What it is:** A hybrid architecture code review tool using deterministic pipelines + LLM Agents. **Why:** A battle-tested, scalable solution for enterprise-level automated code review.
*   **[tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills)** [Python] ⭐6,875 (+703)
    *   **What it is:** Specific skills for equity investors and traders. **Why:** Shows the maturity of the "Skill" ecosystem, extending agent utility to vertical financial markets.

---

### **3. Trend Signal Analysis**
The most significant trend today is the **"Standardization of Agent Skills."** Unlike the early days of LLMs focused purely on model weights (e.g., Llama, Mistral), the current explosion in stars is centered on *how* agents interact with tools. We are seeing the rise of **Agent Infrastructure**—protocols like AG-UI, orchestration platforms like Orca, and performance harnesses like ECC.

Furthermore, the data reveals a move toward **"Agentic Programming"** as a methodology. Projects like *Superpowers* and *Impeccable* suggest the community is shifting from "Prompt Engineering" to "Skill Engineering." Developers are no longer just talking to a model; they are building fleets of agents, providing them with specific tools (FFmpeg skills, code review audits), and managing their workflows. This aligns with the industry's transition from Generative AI to **Autonomous AI Agents**.

---

### **4. Community Hot Spots**
*   **Agent Skills Ecosystem:** The `kajisho5/ffmpeg-skill` and `obra/superpowers` trends highlight that developers are actively building reusable "skills" for agents to perform specific, complex tasks (video editing, code auditing).
*   **Orchestration & Fleet Management:** With *Orca* and *Superpowers* trending, the community is desperate for tools that manage multiple agents simultaneously, suggesting a shift from single-model interaction to complex agent swarms.
*   **Visual Agent Interfaces:** The rise of *AG-UI* and *Univer* indicates that the next generation of AI apps will be document-centric, allowing agents to manipulate spreadsheets and office suites directly rather than just generating text.
*   **Enterprise Code Review:** *Alibaba's open-code-review* and *Impeccable* show that the immediate priority for enterprise adoption is quality assurance—using AI agents to audit and critique code before it reaches production.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*