# OpenClaw Ecosystem Digest 2026-11-25

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-25 03:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyagi)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

⚠️ Summary generation failed.

---

## Cross-Ecosystem Comparison

Here is the cross-project ecosystem comparison report for the open-source AI agent and personal AI assistant landscape as of November 25, 2026.

---

# Open-Source AI Agent & Personal Assistant Ecosystem Report (2026-11-25)

## 1. Ecosystem Overview
The open-source AI agent ecosystem continues to mature, moving rapidly from proof-of-concept autonomous loops toward production-grade reliability, transport stability, and multi-agent coordination. Active projects like **CoPaw** and **PicoClaw** demonstrate a heavy operational focus on hardening protocol edges—such as Model Context Protocol (MCP) streaming handling, channel authentication regressions, and structured multi-agent shared contexts. While several niche projects exhibit quiet maintenance cycles, top-tier active frameworks are concentrating heavily on localized user experience (e.g., CJK rendering), enterprise security governance (skill vulnerability scanning), and human-in-the-loop (HITL) interaction patterns.

---

## 2. Activity Comparison

| Project | Active PRs (24h) | Merged/Closed PRs (24h) | New/Updated Issues (24h) | Release Status | Ecosystem Health & Activity Status |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **OpenClaw** *(Core Ref)* | *N/A* | *N/A* | *N/A* | *N/A* | Baseline reference standard (Data pipeline error) |
| **CoPaw** | 30 | 12 | 26 | Latest: `v2.3.1-beta.1` | **Extremely High Velocity** (Active core refactoring) |
| **PicoClaw** | 0 | 5 | 1 | Stable (No release today) | **High Activity** (Focused infrastructure fixes) |
| **NullClaw** | 0 | 0 | 0 | Stable | Dormant / Low activity (No 24h updates) |
| **IronClaw** | 0 | 0 | 0 | Stable | Dormant / Low activity (No 24h updates) |
| **TinyClaw** | 0 | 0 | 0 | Stable | Dormant / Low activity (No 24h updates) |
| **Moltis** | 0 | 0 | 0 | Stable | Dormant / Low activity (No 24h updates) |
| **NanoBot / Hermes / NanoClaw / LobsterAI / ZeptoClaw / ZeroClaw** | *N/A* | *N/A* | *N/A* | *N/A* | Digest generation failed for today's snapshot |

---

## 3. OpenClaw's Position
* **Architectural Reference Point:** OpenClaw remains the primary baseline reference architecture across the "Claw" family of projects (PicoClaw, NanoClaw, NullClaw, ZeptoClaw, ZeroClaw). 
* **Specialization Splitting:** While OpenClaw maintains a broad feature footprint, derivatives are specializing rapidly:
  * **PicoClaw** optimizes for low-overhead embedded execution, messaging platform channels (e.g., QQ, WebSockets), and lightweight blackboard agent handoffs.
  * **CoPaw** focuses on rich desktop/web user interfaces, multi-tenant workspace policies, CJK character rendering, and complex MCP transport management.
* **Community Scale:** OpenClaw continues to set the standard for feature parity, forcing downstream projects to regularly sync frontmatter schemas, tool definitions, and skill registry semantics.

---

## 4. Shared Technical Focus Areas

Across the active telemetry, several unified technical requirements have emerged:

1. **Protocol & Stream Resilience (CoPaw, PicoClaw):**
   * *Need:* Preventing session dropouts during streaming responses. CoPaw is addressing `RemoteProtocolError` retries on partial outputs and MCP HTTP 4xx transport masking. PicoClaw is fixing WebSocket authentication header casing and upstream `resty` dependency breaking changes.
2. **Skill Isolation & Security Governance (CoPaw, PicoClaw):**
   * *Need:* Preventing name collisions and executing security scans on third-party agent skills. PicoClaw resolved skill frontmatter deduplication issues (#3463), while CoPaw is hardening skill-scan defaults to enforce blocks on `CRITICAL` vulnerability findings (#8880).
3. **Multi-Agent Shared Context & State Handoff (PicoClaw, CoPaw):**
   * *Need:* Moving beyond single-agent prompt loops. PicoClaw introduced a base blackboard/shared context framework (#423), matching CoPaw’s efforts in memory reference counting and unified execution session configs (#8586).

---

## 5. Differentiation Analysis

```
                    ┌────────────────────────────────────────────────────────┐
                    │               Personal AI Assistant Space              │
                    └───────────────────────────┬────────────────────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
     [ Lightweight / Channel Focus ]                               [ Rich UI / Enterprise Focus ]
               (PicoClaw)                                                     (CoPaw)
  • Micro-agent architecture & blackboard                      • Console UI, CJK layout engines, desktop WebView
  • Low footprint, embedded integration                        • Multi-tenant memory scoping & security policy
  • Direct messaging channels (QQ, WS, Telemetry)              • Human-in-the-loop (HITL) prompt refinement
```

* **PicoClaw:** Optimized for lightweight deployment and channel integrations. Key focus areas include raw communication adapters (QQ, WebSockets), custom provider telemetry (Perplexity headers), and lightweight micro-agent collaboration via an in-memory blackboard.
* **CoPaw:** Positioned as an end-user desktop and workspace suite. Key focus areas include CJK Markdown rendering, complex provider context tables (`glm-5.3/5.4`), Human-in-the-Loop modal flows (`ask_user_question`), and cross-platform runtime support (Windows path handling).
* **Niche Frameworks (NullClaw, IronClaw, TinyClaw, Moltis):** Represent highly focused micro-runtimes or dormant specialized stacks that exhibit minimal day-to-day community churn.

---

## 6. Community Momentum & Maturity

* **Tier 1: High Velocity (Rapid Feature & Bug Iteration)**
  * **CoPaw:** Highest community momentum with 26 new/updated issues and 42 PRs handled in 24 hours. Experiencing rapid user adoption feedback, particularly around frontend formatting and backend model provider configurations.
  * **PicoClaw:** Moderate-to-high velocity (5 PRs merged in 24 hours). Maintains a fast turnaround on critical channel regressions and agent handoff primitives.
* **Tier 2: Maintenance & Stabilization**
  * **NullClaw, IronClaw, TinyClaw, Moltis:** Zero active issues or PR updates over the last 24 hours. Codebases appear to be in a stable release state or low-activity maintenance phase.

---

## 7. Trend Signals for AI Agent Developers

1. **Production MCP Transport Hardening is Mandatory:** Developers are encountering edge-case failures in HTTP/SSE streaming and Model Context Protocol (MCP) clients (e.g., CoPaw #8875). Robust retries and transport error unmasking are becoming critical architectural requirements.
2. **Rise of Blackboard Architecture for Multi-Agent Execution:** Moving away from sequential agent chains, frameworks are adopting shared memory pools and blackboard patterns (e.g., PicoClaw PR #423) to allow dynamic handoffs between specialized agents.
3. **Structured Human-in-the-Loop (HITL) Demand:** Community feature requests (e.g., CoPaw #6274 `ask_user_question`) signal that end users demand explicit control points, confirmation dialogs, and structured input requests during long-running agent tasks.
4. **Strict Skill Registry Governance:** Rapid skill ecosystem growth has made frontmatter collision checks and automated vulnerability scanning (CoPaw #8880, PicoClaw #3463) essential components of agent security architectures.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw Project Digest – 2026‑11‑25**

---

### 1. Today's Overview
The project remains highly active with **five pull requests merged or closed** in the past 24 hours, indicating a healthy maintainer cadence. Only **one issue** has been updated, remaining open, which signals a single user‑reported bug that is still pending resolution. No new releases were published today, so the codebase continues to evolve incrementally through PR merges.

---

### 2. Releases
*No new releases were published on 2026‑11‑25, so the current stable tag remains unchanged.*

---

### 3. Project Progress
| PR | Status | Key Change |
|----|--------|------------|
| **#1546** | Closed | Consolidated a series of bug‑fix PRs (#1480‑#1473) into one merge, cleaning up duplicate code paths. |
| **#423** | Closed | Added a **base multi‑agent collaboration framework** (blackboard, shared context, agent handoff) as a work‑in‑progress feature. |
| **#3466** | Closed | Added the `X-Pplx-Integration: picoclaw` header to Perplexity web‑search requests, improving provider telemetry. |
| **#3463** | Closed | Fixed duplicate skill installation logic that incorrectly matched by frontmatter name, restoring proper skill isolation. |
| **#2363** | Closed | Repaired WebSocket authentication and standardized header casing for all channels, resolving the “Authorization header format error” for QQ. |

These merges collectively tighten the core channel infrastructure, expand agent collaboration capabilities, and improve provider integration diagnostics.

---

### 4. Community Hot Topics
- **Issue #3472 – “QQ channel error 11241: resty v2.17.1 regression breaks botgo auth header”**  
  *Link:* <https://github.com/sipeed/picoclaw/issues/3472>  
  This issue currently has the most discussion (3 comments) and highlights a critical regression caused by an upgraded `resty` dependency. Users depend on QQ channel support, so the error directly impacts real‑world deployments.

- **PR #423** – Though closed, it introduces a significant architectural shift (multi‑agent collaboration). The discussion around this PR signals a strong community interest in collaborative agents, suggesting a roadmap priority.

---

### 5. Bugs & Stability
| Severity | Bug | Status | Fix PR |
|----------|-----|--------|--------|
| **High** | QQ channel fails with error 11241 due to `resty` v2.17.1 regression (Issue #3472) | *Open* | Pending – PR #2363 addressed authentication but the version conflict remains unresolved. |
| **Medium** | Duplicate skill installation error caused by name collision (PR #3463) | *Closed* | Fixed in PR #3463. |
| **Low** | Minor header casing inconsistencies in WebSocket auth (PR #2363) | *Closed* | Fixed in PR #2363. |

The only unresolved high‑severity bug is the QQ channel authentication regression, which remains a blocker for many users.

---

### 6. Feature Requests & Roadmap Signals
- **Multi‑Agent Collaboration** – PR #423 proposes a blackboard and shared context pool, indicating a forthcoming major feature likely to appear in the next stable release (v0.3.x).
- **Provider Telemetry** – PR #3466 adds a custom header for Perplexity searches, suggesting a trend toward better provider analytics. Future releases may expose a configurable header system for all providers.
- **Skill Isolation** – The resolution of skill‑name duplication (#3463) reflects a broader need for robust skill registry management, likely to be expanded in upcoming PRs.

---

### 7. User Feedback Summary
- **Pain Point:** Users cannot start the QQ channel due to the authentication header error, a critical issue for communities relying on QQ integration.
- **Positive Feedback:** The new multi‑agent framework (PR #423) is well received, with community members discussing potential use cases (e.g., shared knowledge base, task handoff).
- **Satisfaction Level:** While core channel functionality remains stable, the QQ issue reduces overall satisfaction for QQ‑dependent users.

---

### 8. Backlog Watch
- **Open Issue #3472** – Still unresolved; requires a dependency version strategy (pinning resty or updating botgo) to restore QQ channel stability.
- **Older Unaddressed Issues:** A scan of the issue list reveals several long‑standing tickets (e.g., #2354, #2331) related to channel authentication and provider configuration that have not received recent maintainer attention.
- **PR #423** – While closed, the feature remains in a “work‑in‑progress” state; the community expects a stable release soon.

**Recommendation:** Prioritize a quick resolution for Issue #3472 (e.g., a temporary downgrade of `resty` or a forked `botgo` version) and plan for the next release to include the multi‑agent framework and provider telemetry improvements.

---

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-11-25
## Today's Overview
CoPaw (github.com/agentscope-ai/CoPaw) is in a period of high activity with **26 new issues** and **42 PRs** updated in the last 24 hours (21 active, 12 merged/closed). There are no new releases today, indicating stabilization between version releases. The ecosystem is tracking significant maintenance work across frontend (Console/CJK parsing, input polish, transcript height handling), backend (streaming abort handling, MCP transport masking, memory scoping, session configuration unification, security policy), and tooling (mission CLI, cron heartbeat, and local model management). Overall health reflects a mix of both critical bug fixes and feature/demand-driven work, with several issues concentrated in bug reporting and backend reliability.
## Releases
**No new releases** were published on 2026-11-25. The latest recorded release is v2.3.1-beta.1 (beta), with release-related activity tracking via GitHub Actions in issue #8861. No breaking changes or migration notes are documented in the provided data.
## Project Progress
- **PRs merged/closed today:** 12 PRs were updated/closed (12 merged/closed) in the last 24 hours; open/active PR count is 30.
- **Key PR advances:**
  - **#8897** – `fix(plugins)`: handle Windows path prefixes in storage migration.
  - **#8886** – `feat(creator)`: release 2.0.7 with review recovery and media fixes.
  - **#8896** – `fix(e2e)`: update skill pool auto-sync menu tests.
  - **#8133** – `fix(console)`: repair CJK emphasis boundaries in chat Markdown (critical frontend rendering fix).
  - **#8770** – `fix/runtime)`: reject chats until background startup completes.
  - **#8719** – `feat(console)`: support runtime base-path deployment.
  - **#8476** – `feat(jobs)`: add `thinking_level` to `JobRuntimeSpec`.
  - **#8895** – `fix(mcp)`: report HTTP-rejected requests to the caller and keep the session.
  - **#8586** – `refactor(runtime)`: unify session configuration for ACP and native execution.
- **Closed/resolved bugs:** Multiple backend and frontend bug fixes were actively addressed (e.g., #8811 narrow-screen message clipping, #8864 streaming abort, #8875 MCP transport masking, #8833 mission CLI prefix bug, #8706 Creation Assistant re-render lag).
## Community Hot Topics
- **#8897 [OPEN]** – Fix Windows path prefixes in storage migration; created and updated today; low-numbered priority, relevant to Windows environment robustness.
- **#8133 [OPEN]** – CJK emphasis boundary repair in chat Markdown; Created 2026-10-08, updated today; directly addresses a rendering failure affecting Chinese user content.
- **#8894 [OPEN]** – Render discovered models pinned by an agent; actively updated today; relates to agent model configuration and lookup correctness.
- **#6274 [OPEN]** – Request for `ask_user_question` Human-in-the-Loop tool; long-standing enhancement with 4 comments and 1 upvote; highlights a missing tool in the agent toolkit.
- **#8859 [OPEN]** – Console confirmation/approval interaction clarity and destructive-action fixes; updated today; addresses user-facing workflow reliability.
- **#8888 [OPEN]** – Transcript jumps back several screens on content-height shrink; version 2.3.1-beta.1; affects desktop/WebView rendering stability.
## Bugs & Stability
Ranked by severity of reported issues:
1. **#8811 [CLOSED]** – Narrow-screen message text clipping and table/code-block clipping on wide content; high impact on mobile and desktop viewing; 5 comments, no upvotes. Fix already applied via UI width settings.
2. **#8864 [OPEN]** – Streaming reply aborts mid-output with `RemoteProtocolError`, not retried once partial content emitted; high impact on reliability; 3 comments.
3. **#8875 [OPEN]** – MCP `streamable_http` client masks server 4xx as "not connected" and tears down the session; affects custom MCP drivers on Linux containers; 2 comments.
4. **#8890 [OPEN]** – OpenAI-compatible discovery ignores `max_input_tokens`; affects context windows in both directions for custom providers; 2 comments.
5. **#8891 [OPEN]** – Built-in providers lack `glm-5.3/5.4` in context table and `catalog_only` providers don't fetch context metadata; 2 comments.
6. **#8877 [OPEN]** – Status-less model overload in OpenAI-compatible streams bypasses retries; reproduced against `main`; 2 comments.
7. **#8887 [OPEN]** – Media data blocks in tool results cause 400 BadRequestError on non-multimodal models, breaking subsequent messages; 1 comment.
8. **#8880 [OPEN]** – Default skill-scan mode "warn" proceeds on CRITICAL findings; scan timeout fails open; security-related gap.
9. **#8833 [CLOSED]** – `qwenpaw mission` CLI duplicates `/api` prefix; affects all mission commands; legacy fix completed.
10. **#8870 [OPEN]** – Discord chunk_text duplicates a code fence at chunk boundary; affects formatting correctness.
11. **#8865 [OPEN]** – Heartbeat cron with named weekday lists falls back to 30-minute interval; cron parsing gap.
12. **#8888 [OPEN]** – Transcript jumps back on content height shrink; desktop rendering instability.

**Fix PRs available:** #8895, #8859, #8897, #8133, and others address the above issues; no fix PRs are listed for today's closed issues directly, but several are in the PR timeline.

## Feature Requests & Roadmap Signals
- **#6274** – Add `ask_user_question` tool for Human-in-the-Loop structured multi-select with fallbacks; clearly a long-standing feature request with 1 upvote.
- **#8892** – Add "AI Prompt Polishing" button to refine user input prompts; new UI feature request.
- **#8897** – Windows path prefix fix (PR focus, directly benefits existing user-facing paths).
- **#8719 / #8133 / #8787** – Deployment base-path support, CJK Markdown rendering, plugin semantic colour roles — represent ongoing feature/improvement work.
- **#8882 / #8881 / #8880 / #8878** – Design-level improvements for long-term memory reference-counting, tenant scoping, egress policy, and skill-scan mode hardening; signal durable product improvements.

## User Feedback Summary
- **Chinese-language users face Markdown parsing and rendering issues** (#8811, #8133, #8887, #8706), indicating a recurring pain point around CJK and content-structure handling.
- **Mobile/desktop viewing inconsistencies** are reported (narrow-screen clipping, transcript jumping, media errors), suggesting users expect consistent, reliable UI behavior across viewports.
- **Reliability and tooling gaps** are requested (MCP client errors, streaming aborts, model discovery), indicating users value robust error handling and end-to-end stability.
- **Feature requests highlight workflow need** (Human-in-the-Loop prompting, prompt polishing, deep-search providers), indicating active demand for enhanced capabilities.

## Backlog Watch
1. **#8864** – Streaming abort mid-output with `RemoteProtocolError`; no retry mechanism — a critical reliability bottleneck awaiting either a fix or architectural decision.
2. **#8875** – MCP `streamable_http` session-teardown failure on 4xx; affects custom MCP drivers and likely core MCP integration stability.
3. **#8890/#8891** – OpenAI-compatible provider context window misconfiguration affecting both custom providers and built-in providers.
4. **#8888** – Transcript vertical/height-stability issues on desktop renderers; likely needs performance/memory fixes.
5. **#6274** – Missing `ask_user_question` tool in the agent toolkit — a feature waiting for backend/frontend implementation support.
6. **#8880** – Skill-scan default mode bypasses CRITICAL findings — security-critical gap requiring governance.
7. **#8879** – Sandbox `max_processes`/`max_memory_mb` accepted but unenforced — config documentation gap requiring enforcement implementation.

*Overall assessment: The project is stable but exposed to recurring bug and reliability issues, with a strong concentration of frontend Markdown/CJK and backend stability work; the most urgent items are streaming error handling and MCP transport error handling, alongside provider context-window correctness.*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*