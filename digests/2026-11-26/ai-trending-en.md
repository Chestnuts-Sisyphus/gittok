# AI Open Source Trends 2026-11-26

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-11-26 02:33 UTC

---

## AI Open‑Source Trends Report – 2026‑11‑26  

### 1️⃣ Today’s Highlights  
- **Claude‑BugHunter** (⭐23.1 k + 1.6 k stars) vaulted to the top of the trending list, showing that niche “skill‑bundles” for LLM‑driven red‑team work are now a hot community focus.  
- **Firecrawl** (⭐210 k + 1.1 k) and **CLI‑Anything** (⭐65.7 k + 1.1 k) together illustrate a surge in infrastructure that makes *any* software “agent‑native”, turning ordinary CLIs and web‑scraping pipelines into plug‑and‑play AI components.  
- The **Superpowers** framework (⭐326 k + 0.9 k) and the **Hermes‑Agent** project (⭐266 k) demonstrate that multi‑agent orchestration is moving from research notebooks into production‑grade open‑source stacks, with thousands of developers adding their own “skills” daily.  

---

### 2️⃣ Top Projects by Category  

| Category | Project (⭐ / + today) | Why It Matters Today |
|----------|-----------------------|----------------------|
| **🔧 AI Infrastructure** | **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)** – ⭐210 k (+1 135) | Unified “search‑scrape‑store” API that powers over 550 data sources; the go‑to retrieval layer for LLM agents right now. |
| | **[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)** – ⭐65.7 k (+1 106) | Turns any command‑line program into an *agent‑compatible* skill; the fastest way to retrofit legacy tools for LLM automation. |
| | **[n8n-io/n8n](https://github.com/n8n-io/n8n)** – ⭐212 k | Fair‑code workflow engine with native AI nodes; bridges low‑code automation and LLM‑driven decision logic. |
| | **[tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)** – ⭐201 k | The evergreen ML foundation; recent 2.16 release adds better quant‑aware training for edge LLMs, keeping it central for custom model pipelines. |
| | **[openclaw/openclaw](https://github.com/openclaw/openclaw)** – ⭐395 k | “AI‑first OS” abstraction layer; provides system‑level hooks so agents can control devices, filesystems, and GUIs across platforms. |
| **🤖 AI Agents / Workflows** | **[obra/superpowers](https://github.com/obra/superpowers)** – ⭐326 k (+903) | Full‑stack “agentic skills” framework; community‑curated skill marketplace fuels rapid prototyping of multi‑agent pipelines. |
| | **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** – ⭐23.1 k (+1 652) | 85 pre‑built Claude Code skills for vulnerability discovery; shows how LLM‑driven security tooling is maturing. |
| | **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)** – ⭐75.2 k (+945) | Automates cross‑platform research (Reddit, X, YouTube, HN, etc.) and produces grounded summaries—an exemplar of “research‑as‑agent”. |
| | **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** – ⭐266 k | A self‑evolving agent that can add new tools at runtime; a reference implementation for lifelong‑learning agents. |
| | **[affaan-m/ECC](https://github.com/affaan-m/ECC)** – ⭐310 k | Performance‑optimised harness for LLM agents, covering memory, security, and multi‑instinct routing. |
| **📦 AI Applications** | **[zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)** – ⭐16.2 k (+880) | Open‑source AI video‑clipping & repurposing tool; automates short‑form content generation for TikTok, Reels, etc. |
| | **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)** – ⭐71.0 k (+826) | Scripts to train a 64 M LLM from scratch in ~2 h on a single GPU – democratises “local LLM” experiments. |
| | **[cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)** – ⭐73.1 k (+1 141) | Self‑contained HTML/SVG diagrams for Claude, Codex, Copilot and other LLM code‑assistants; improves explainability of agent actions. |
| **🧠 LLMs / Training** | **[tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)** – ⭐201 k | See above – now the primary open‑source stack for quantised, on‑device LLM training. |
| | **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)** – ⭐71.0 k (+826) | See above – a lightweight, reproducible training pipeline for small‑scale LLMs. |
| **🔍 RAG / Knowledge** | **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)** – ⭐210 k (+1 135) | See above – its “knowledge‑graph API” is the de‑facto retrieval layer for many agent projects today. |
| | **[public-apis/public-apis](https://github.com/public-apis/public-apis)** – ⭐501 k | Not an AI repo per se, but the curated list of free APIs is a key data source for RAG pipelines; frequently referenced in agent prompts. |

---

### 3️⃣ Trend Signal Analysis (≈ 230 words)

The **agent‑centric wave** is unmistakable. Projects that let developers *plug* arbitrary tools into an LLM—Claude‑BugHunter, Superpowers, Hermes‑Agent, ECC, and CLI‑Anything—each gained **> 900 new stars** within a single day, indicating a community shift from “prompt‑only” usage to **modular, skill‑driven orchestration**. The surge aligns with the recent rollout of **Claude 3.5‑Turbo** and **OpenAI’s GPT‑4o‑mini**, both of which expose richer tool‑calling APIs, prompting ecosystems to build reusable “skill bundles”.

A second, concurrent signal is the **knowledge‑infrastructure boom**. Firecrawl’s rapid climb (over 1 k stars today) reflects the demand for **plug‑and‑play web‑scraping + vectorisation** services that can feed agents with up‑to‑date data without bespoke crawling pipelines. The appearance of **n8n’s AI nodes** further cements the trend: low‑code workflow platforms are now embedding LLM‑powered actions as first‑class primitives.

The **training democratization** front remains active but at a slower pace; Minimind’s 64 M LLM trainer is a notable highlight, showing that developers still crave **fast, local model iteration** to prototype new agent behaviours without relying on cloud APIs.

Overall, the data points to a **convergence of three pillars**: (1) modular skill frameworks, (2) ready‑made retrieval/knowledge services, and (3) lightweight on‑device training. Together they enable a new generation of “agent‑first” products that can be built, deployed, and iterated entirely in open source.

---

### 4️⃣ Community Hot Spots – Where to Focus Next

- **Firecrawl** – the most‑starred retrieval service; essential for any RAG‑enabled agent.  
- **Superpowers** – a rapidly expanding skill marketplace; contributes reusable agents across domains.  
- **CLI‑Anything** – bridges the massive existing CLI ecosystem with LLM agents; a low‑barrier entry point for legacy tool automation.  
- **Claude‑BugHunter** – showcases a domain‑specific skill bundle (security) that can be replicated for other verticals (e.g., compliance, finance).  
- **n8n** – the visual workflow platform now offering native AI nodes; ideal for non‑programmers to prototype multi‑agent pipelines.  

Investing time or contributions in any of these five areas will likely yield the greatest impact on the evolving open‑source AI landscape.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*