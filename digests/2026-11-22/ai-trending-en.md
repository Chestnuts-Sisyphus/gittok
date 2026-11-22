# AI Open Source Trends 2026-11-22

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-11-21 23:59 UTC

---

# AI Open Source Trends Report
**Date**: 2026-11-22
**Source**: GitHub Trending & Topic Search (AI focus)

## 1. Today's Highlights
The open-source AI ecosystem is currently dominated by a surge in **Agent Infrastructure** and **Operational Tooling**. A distinct trend is the rise of "Skill-based" development frameworks (like *Superpowers* and *ECC*) that allow developers to build modular capabilities for coding agents rather than monolithic models. Additionally, there is a significant spike in productivity tools that bridge the gap between raw LLMs and practical application, such as the rapid adoption of *Claude-BugHunter* for red-team operations and *Firecrawl* for creating robust knowledge infrastructure for agents.

## 2. Top Projects by Category

### 🔧 AI Infrastructure & Tooling
*Tools for optimizing inference, creating developer experiences, and standardizing agent interactions.*
*   **[obra/superpowers](https://github.com/obra/superpowers)** ⭐ 323,708 (+884 today)
    An agentic skills framework & software development methodology that works. It provides the "muscles" for coding agents, focusing on modular capabilities and instincts.
*   **[affaan-m/ECC](https://github.com/affaan-m/ECC)** ⭐ 308,366 (+576 today)
    The agent harness performance optimization system. It focuses on optimizing skills, memory, and security for agents like Claude Code and Cursor.
*   **[rtk-ai/rtk](https://github.com/rtk-ai/rtk)** ⭐ 87,416 (+129 today)
    A CLI proxy that reduces LLM token consumption by 60-90% on common dev commands. It is a zero-dependency Rust binary designed to make local LLMs practical for daily coding.
*   **[openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino)** ⭐ 11,927 (+202 today)
    An open source toolkit for optimizing and deploying AI inference. It remains a critical infrastructure layer for deploying models on consumer hardware efficiently.
*   **[google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)** ⭐ 11,412 (+324 today)
    A library of Agent Skills designed to work with the Stitch MCP server. It follows the Agent Skills open standard for compatibility with major coding agents.

### 🤖 AI Agents / Workflows
*Frameworks that orchestrate autonomous systems and multi-agent collaboration.*
*   **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** ⭐ 196,352 (+775 today)
    Makes your AI agent think like the laziest senior dev in the room. It optimizes agent workflows to minimize code generation while maximizing efficiency.
*   **[anomalyco/opencode](https://github.com/anomalyco/opencode)** ⭐ 228,427 (+211 today)
    The open source coding agent. It acts as a direct competitor to proprietary IDE integrations, offering a self-hostable solution for autonomous coding tasks.
*   **[multica-ai/multica](https://github.com/multica-ai/multica)** ⭐ 57,053 (+127 today)
    Make humans and AI agents work as one team. It focuses on collaboration workflows where human oversight is integrated into the agent loop.
*   **[microsoft/markitdown](https://github.com/microsoft/markitdown)** ⭐ 197,525 (+188 today)
    Python tool for converting files and office documents to Markdown. Essential for RAG pipelines and preparing unstructured data for LLM ingestion.
*   **[earendil-works/pi](https://github.com/earendil-works/pi)** ⭐ 123,192 (+128 today)
    AI agent toolkit: unified LLM API, agent loop, TUI, coding agent CLI. It provides a terminal-based interface for managing AI workflows.

### 📦 AI Applications
*End-user facing applications that solve specific problems using AI.*
*   **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** ⭐ 16,018 (+1,794 today)
    A Claude Code skill bundle for bug hunting and external red-team work. It contains 82 skills and patterns for vulnerability disclosure, currently the fastest-growing repo in the AI sector.
*   **[zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)** ⭐ 12,834 (+689 today)
    Open-source AI video clipping tool that auto-generates short-form content from long videos. It handles subtitles, covers, and publishing copy for platforms like TikTok and Shorts.
*   **[Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre)** ⭐ 13,982 (+450 today)
    The open-source agent for CI/CD reliability. It uses AI to monitor and optimize deployment pipelines.
*   **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)** ⭐ 71,988 (+566 today)
    AI agent skill that researches any topic across Reddit, X, YouTube, HN, and the web, then synthesizes a grounded summary.

### 🧠 LLMs / Training
*Tools focused on model training, fine-tuning, and behavior modification.*
*   **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)** ⭐ 68,138 (+488 today)
    🧠 Train your own 64M LLM from scratch in 2 hours. It democratizes model training by making it accessible and fast for hobbyists.
*   **[p-e-w/heretic](https://github.com/p-e-w/heretic)** ⭐ 42,494 (+138 today)
    Training-free language model modification: Remove censorship, suppress slop, and reduce sycophancy. It focuses on "jailbreaking" or sanitizing models without retraining.
*   **[FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo)** ⭐ 4,139 (+410 today)
    Make videos on the computer you already own. It runs MiniMax H3 in low VRAM (8GB), enabling local video generation on consumer hardware.

### 🔍 RAG / Knowledge
*Systems for connecting LLMs to external data sources.*
*   **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)** ⭐ 206,167 (+999 today)
    Knowledge infrastructure to make your agents smarter. It provides a unified API to search, scrape, and access 550+ data providers, acting as a crucial bridge for RAG.
*   **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** ⭐ 151,611
    Turn any codebase, with its docs, SQL schemas, and PDFs, into a queryable knowledge graph. It offers a /graphify skill for Claude Code and Cursor to build internal knowledge bases.
*   **[microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners)** ⭐ 123,969
    21 Lessons, Get Started Building with Generative AI. A comprehensive educational resource for developers entering the AI space.

## 3. Trend Signal Analysis

The data reveals a clear shift from pure model research toward **"Agent-First" Engineering**. The most explosive growth today is found not in model weight releases, but in *Superpowers* and *ECC*, indicating the community is moving from "What can AI do?" to "How do we build an architecture that makes AI useful for daily coding?".

There is also a surge in **Operational & Security Tooling**. The massive spike in *Claude-BugHunter* (1,794 stars) highlights the immediate demand for red-teaming and safety tools as agents become more autonomous. Simultaneously, *Firecrawl* is dominating the "Infrastructure" category, suggesting that the bottleneck for AI agents is no longer just the model, but the ability to *access* and *scrape* clean data from the web.

Finally, we see a trend toward **Local-First Productivity**. Tools like *rtk* (token optimization) and *minimind* (low-spec training) are gaining traction, likely driven by rising API costs and privacy concerns, pushing developers to optimize local workflows.

## 4. Community Hot Spots

*   **Claude-BugHunter**: Currently the viral hit of the ecosystem. It proves that "Skill Bundles" are a high-value product format for AI agents, moving beyond simple prompts to curated, actionable security workflows.
*   **Skill-Based Frameworks (Superpowers/ECC)**: The new standard for developer tooling. These projects are winning because they offer modularity—allowing developers to pick and choose capabilities rather than adopting a rigid monolith.
*   **Firecrawl**: The critical infrastructure layer. As agents become smarter, they need better data. Firecrawl is solving the "data access" problem, making it a must-have for anyone building agent applications.
*   **Open-Source Coding Agents**: The battle for the developer's IDE is intensifying with *opencode* and *ponytail*. This signals that AI is transitioning from a chatbot to a direct competitor in the software development environment itself.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*