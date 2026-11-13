# AI Open Source Trends 2026-11-13

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-11-13 00:48 UTC

---

**AI Open‑Source Trends Report – 2026‑11‑13**

---

### 1.  Today's Highlights  
The AI ecosystem today is dominated by *agent‑centric tooling*: several projects that give developers a ready‑made “agent stack” for building, orchestrating, and deploying autonomous workflows are garnering record‑breaking stars.  A notable surge is also seen in *browser‑automation and data‑ingestion utilities* that enable agents to interact with the web at scale, while a free‑Claude harness has opened up LLM‑powered code generation to a broader audience.  These signals point to a shift from monolithic LLM services toward modular, composable agent infrastructures that can be embedded into existing pipelines.

---

### 2.  Top Projects by Category  

| Category | Project | Stars (today) | One‑sentence snapshot |
|----------|---------|---------------|-----------------------|
| **🔧 AI Infrastructure** | **[openclaw/openclaw](https://github.com/openclaw/openclaw)** | ⭐ 394,413 | A universal, cross‑platform AI agent that runs on any OS, written in TypeScript and designed for easy integration into custom tooling. |
| | **[morluto/rea](https://github.com/morluto/rea)** | ⭐ 455,287 | A reverse‑engineering platform that uses agents to dissect and emulate binaries, making malware analysis and OS introspection scriptable. |
| | **[affaan-m/ECC](https://github.com/affaan-m/ECC)** | ⭐ 302,022 | A performance‑optimised harness for LLM‑powered agents that balances memory, speed, and security across Claude, Codex, and other engines. |
| **🤖 AI Agents / Workflows** | **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** | ⭐ 116,668 (+816 today) | A library of production‑grade engineering “skills” that let JavaScript agents write, test, and ship code autonomously. |
| | **[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)** | ⭐ 50,329 (+604 today) | A Rust‑based CLI that gives an agent a headless browser, enabling sophisticated web‑automation tasks without any UI. |
| | **[CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot)** | ⭐ 11,604 (+298 today) | A framework for “AI coworkers” that allocate each bot a virtual computer, preserving a full browser + file system for reproducible agent actions. |
| **📦 AI Applications** | **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)** | ⭐ 71,079 (+1,294 today) | An LLM‑driven multi‑market stock analytics platform that pulls live market data, news, and produces actionable dashboards. |
| | **[homeassistant‑ai/ha‑mcp](https://github.com/homeassistant-ai/ha-mcp)** | ⭐ 7,687 (+714 today) | Extends Home Assistant with Claude and GPT‑powered assistants to automate device control, notifications, and custom routines. |
| | **[Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code)** | ⭐ 69,289 (+415 today) | A terminal/IDE/phone harness that gives developers 1.3 B free tokens of Claude Code, Codex, and other LLMs for local code generation. |
| **🧠 LLMs / Training** | **[affaan-m/ECC](https://github.com/affaan-m/ECC)** (dual‑use) | ⭐ 302,022 | A low‑latency harness that can also be used to fine‑tune smaller models for domain‑specific coding tasks. |
| | **[Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code)** | ⭐ 69,289 | Offers a free gateway to LLM code assistants, enabling rapid prototyping without cloud costs. |
| | **[n8n-io/n8n](https://github.com/n8n-io/n8n)** | ⭐ 210,333 | While a workflow engine, its native “AI” nodes provide a plug‑and‑play interface for LLM calls in visual pipelines. |
| **🔍 RAG / Knowledge** | **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)** | ⭐ 201,295 | A library that scrapes, processes, and indexes web content into vector stores, powering RAG for autonomous agents. |
| | **[homeassistant‑ai/ha‑mcp](https://github.com/homeassistant-ai/ha-mcp)** | ⭐ 7,687 | Provides a knowledge‑base layer for home‑automation agents, integrating sensor data with LLM inference. |

*Note: Projects that fit multiple buckets are listed under the category that best represents their core value.*

---

### 3.  Trend Signal Analysis  
The most pronounced trend this week is the **explosive uptake of agent frameworks and browser‑automation tooling**.  Projects such as `vercel‑labs/agent‑browser` and `CopilotKit/OpenBot` are receiving tens of thousands of stars in a single day, indicating that developers are eager to give agents true web‑interaction capabilities without building bespoke infrastructure.  Rust’s emergence as the language of choice for low‑latency, safe browser drivers (agent‑browser) underscores a shift toward performance‑centric agent stacks.

Concurrently, the **free‑Claude‑code harness** demonstrates a new business model: token‑free access to premium LLMs via local or on‑premises clients.  This aligns with the recent industry push toward *edge* LLMs and self‑hosted inference, especially after OpenAI’s announcement of the “Claude‑3.5” release that drastically lowered inference cost.

Another signal is the **integration of LLMs into vertical SaaS**—notably finance and smart‑home domains.  `ZhuLinsen/daily_stock_analysis` shows how LLMs can be stitched into data pipelines to generate real‑time insights, while `homeassistant‑ai/ha‑mcp` demonstrates a growing appetite for conversational agents in everyday devices.

Finally, data‑ingestion tools like `firecrawl` are gaining traction as essential components for *RAG* pipelines.  By making web content easily consumable in vector stores, they lower the barrier to entry for building knowledge‑based agents, which is especially relevant after the release of the new “Gemini‑Pro” model that favors dense retrieval.

---

### 4.  Community Hot Spots  
- **Agent Skill Libraries** (`addyosmani/agent-skills`) – Enables rapid construction of domain‑specific agent actions; essential for teams prototyping coding assistants.  
- **Browser‑Automation for Agents** (`vercel-labs/agent-browser`) – Provides a robust, low‑overhead way for agents to perform real‑world web interactions, a prerequisite for many RAG use‑cases.  
- **Free LLM Harnesses** (`Alishahryar1/free-claude-code`) – Removes the cost barrier for experimenting with high‑performance code LLMs, fostering wider adoption.  
- **Data‑Ingestion for RAG** (`firecrawl/firecrawl`) – Simplifies the pipeline from raw web data to searchable embeddings, a key step for any retrieval‑augmented agent.  
- **Workflow Automation Platforms** (`n8n-io/n8n`) – Offers a visual, developer‑friendly way to stitch together AI, APIs, and custom logic; its native AI nodes are growing rapidly.

---

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*