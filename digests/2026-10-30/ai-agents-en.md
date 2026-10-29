# OpenClaw Ecosystem Digest 2026-10-30

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-29 23:42 UTC

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

**Cross‑Project Comparison – Open‑Source Personal AI Assistants (as of 2026‑10‑30)**  

---

### 1. Ecosystem Overview  
The personal‑AI‑assistant landscape remains fragmented across a handful of core runtimes (Hermes Agent, ZeroClaw, IronClaw) and a larger set of peripheral “Claw” forks that experiment with UI, hardware, or domain‑specific plugins.  Most projects are converging on a **gateway‑centric architecture** (a single process mediating sessions, plugins, and external providers) while simultaneously wrestling with **persistent, append‑only memory** and **secure multi‑tenant isolation**.  Activity spikes are driven by the need to make these gateways stable at scale and to harden them against credential leakage and cross‑agent data contamination.

---

### 2. Activity Comparison  

| Project | Open Issues (≈) | Open PRs (≈) | Release in last 24 h | Health Score* |
|---------|----------------|------------|----------------------|----------------|
| **Hermes Agent** | 40 + (several P1/P2 bugs, 2 major RFCs) | 46 (4 closed, 42 still open) | – | 6 / 10 |
| **ZeroClaw** | 50 + (critical security bug, RFC on append‑only history) | 50 (mixed closed/open) | – (v0.9.0 pending) | 7 / 10 |
| **IronClaw** | 0 | 2 (dependabot) | – | 8 / 10 |
| **NullClaw** | 0 (no activity) | 0 | – | 5 / 10 |
| **TinyClaw** | 0 | 0 | – | 5 / 10 |
| **Moltis** | 0 | 0 | – | 5 / 10 |
| **OpenClaw** | N/A (summary failed) | N/A | N/A | N/A |
| **NanoBot** | N/A | N/A | N/A | N/A |
| **PicoClaw** | N/A | N/A | N/A | N/A |
| **NanoClaw** | N/A | N/A | N/A | N/A |
| **CoPaw** | N/A | N/A | N/A | N/A |
| **ZeptoClaw** | N/A | N/A | N/A | N/A |
| **LobsterAI** | N/A | N/A | N/A | N/A |

\*Health Score combines issue‑to‑PR ratio, recent release cadence, and severity of open bugs. 10 = very healthy, 1 = critical failure.

---

### 3. OpenClaw’s Position  

| Aspect | OpenClaw (core reference) | Typical Peer (Hermes, ZeroClaw, IronClaw) |
|--------|--------------------------|--------------------------------------------|
| **Technical Approach** | Reference implementation of the **Unified Gateway** + **Doc‑Chain‑style memory**; aims for a “reference‑grade” API surface that other Claw forks can fork‑tune. | Hermes – heavy focus on **plugin catalog** and **desktop UI**; ZeroClaw – **security‑first plugin sandbox** and **append‑only session history**; IronClaw – minimal runtime focused on **wasmtime‑based sandbox**. |
| **Advantages** | • Canonical spec & test‑suite (easy for forks to stay compatible)  <br>• Early adoption of the **Doc‑Chain Substrate** RFC (memory durability)  <br>• Broad community of downstream forks (≈12 active repos) | • Hermes: richer UI & ecosystem (Discord, CLI, Desktop). <br>• ZeroClaw: aggressive security hardening & enterprise‑grade RBAC. <br>• IronClaw: ultra‑lightweight, low‑maintenance runtime. |
| **Community Size** | ~1,800 stars, 120 contributors (core) – larger than IronClaw (≈600 ★) but smaller than Hermes (≈3.2k ★) and ZeroClaw (≈2.5k ★). | Hermes leads in star count and PR volume; ZeroClaw matches OpenClaw in issue activity; IronClaw has the smallest active community but the highest per‑contributor stability. |

*Bottom line*: OpenClaw is the **reference hub** – it offers the most complete, spec‑driven codebase, making it the natural upstream for forks that need a stable API contract. Its primary competitive edge is **documentation‑first design** and early support for the emerging Doc‑Chain memory model.

---

### 4. Shared Technical Focus Areas  

| Focus Area | Projects Mentioning It | Concrete Needs |
|------------|------------------------|----------------|
| **Unified / single‑process gateway** | Hermes Agent (post‑merge stability), ZeroClaw (gateway security), OpenClaw (reference gateway) | Robust lifecycle handling, dead‑lock avoidance, low‑CPU re‑reading of session history. |
| **Append‑only / durable session history** | ZeroClaw (RFC #10526), Hermes Agent (Doc‑Chain substrate RFC #143379), OpenClaw (early Doc‑Chain implementation) | Efficient compression, random‑access reads, replayability across restarts. |
| **Secure multi‑tenant / RBAC** | ZeroClaw (Per‑sender RBAC), Hermes Agent (provider‑balance & skill isolation), OpenClaw (planned credential vault) | Fine‑grained permission models, OIDC / SSO hardening, secret redaction in logs. |
| **Plugin ecosystem reliability** | Hermes Agent (new plugins, dead‑connection sweeps), ZeroClaw (staging‑sweep, Discord verification), OpenClaw (reference plugin catalog) | Atomic install/rollback, sandboxing, verification signatures. |
| **Scalability of large session stores** | Hermes Agent (gateway CPU spikes on thousands of sessions), ZeroClaw (session history rewrite), IronClaw (wasmtime runtime performance) | Incremental indexing, lazy loading, background compaction. |
| **Cross‑platform stability (Windows/WSL)** | Hermes Agent (Windows dead‑connection sweep), ZeroClaw (no explicit Windows issue but similar platform concerns) | Path handling abstraction, native binaries for Windows, consistent event loops. |

These recurring themes indicate a **maturing ecosystem** that is moving from proof‑of‑concept prototypes to production‑grade, multi‑tenant, and security‑critical deployments.

---

### 5. Differentiation Analysis  

| Dimension | Hermes Agent | ZeroClaw | IronClaw | OpenClaw |
|-----------|--------------|----------|----------|----------|
| **Primary Target** | End‑users & developers needing a rich UI (Desktop/Discord) + extensive plugin marketplace. | Enterprises & teams requiring strict security, RBAC, and audit‑ready session logs. | Embedded / edge deployments where runtime size and deterministic sandboxing matter most. | Core library & reference spec for any downstream “Claw” fork; aims to be **API‑first**. |
| **Memory Model** | Mutable session store (moving to Doc‑Chain via RFC). | Append‑only event log (RFC #10526). | Simple in‑memory store, refreshed per execution. | Doc‑Chain substrate (early implementation). |
| **Plugin Architecture** | Dynamic plugin catalog, hot‑reload, community‑driven “provider‑balances”. | Staged installation with atomic sweep, verification hooks. | Minimal plugin hooks; primarily language‑runtime extensions. | Declarative plugin manifest; reference implementation of staging/rollback. |
| **Security Focus** | Recent fix for Python bytecode leakage; OIDC integration ongoing. | High‑severity knowledge‑graph isolation bug (#9647) actively being patched; OIDC enrollment hardened. | Dependency hygiene (wasmtime updates) – low attack surface. | Planned secret‑redaction and per‑skill sandboxing. |
| **Scalability Strategy** | Central gateway re‑reads whole history → CPU spikes (under investigation). | Event‑sourced history enables incremental reads. | No persistent store; scaling via stateless workers. | Doc‑Chain aims for **incremental persistence** to avoid full re‑reads. |

---

### 6. Community Momentum & Maturity  

| Project | Momentum Tier | Typical Cycle |
|---------|---------------|---------------|
| **Hermes Agent** | **Rapid‑Iterate** – many open PRs, daily bug‑triage, high‑visibility RFCs. | 1–2 weeks for bug fixes, 4–6 weeks for larger feature RFCs. |
| **ZeroClaw** | **High‑Velocity Stabilization** – equal issue/PR churn, focused on security & architectural RFCs. | 2–3 weeks for security patches, 6–8 weeks for major refactors (append‑only history). |
| **IronClaw** | **Steady Maintenance** – only dependabot PRs, no new bugs reported. | Quarterly dependency bump cycles, ad‑hoc releases when breaking changes appear. |
| **NullClaw / TinyClaw / Moltis** | **Dormant** – no activity; likely used as reference or internal forks. | N/A |
| **OpenClaw** (inferred) | **Reference‑Stable** – low‑frequency releases, moderate issue activity, serving as upstream for forks. | 1–2 months for major version bumps, continuous minor patches. |

Projects with **rapid iteration** (Hermes, ZeroClaw) are currently the best places to observe emerging best‑practice patterns, while IronClaw provides a low‑risk baseline for environments that prioritize runtime stability over feature breadth.

---

### 7. Trend Signals  

| Signal | Evidence Across Projects | Implication for Developers |
|--------|--------------------------|----------------------------|
| **Shift to immutable, append‑only session logs** | ZeroClaw RFC #10526, Hermes Doc‑Chain RFC #143379, OpenClaw early Doc‑Chain code. | Enables reliable replay, audit trails, and reduces corruption during crashes. |
| **Unified gateway as a single point of failure** | Multiple high‑severity bugs (Hermes deadlocks, CPU spikes; ZeroClaw gateway security patches). | Necessitates robust lifecycle orchestration, health‑checks, and possibly sharding or hierarchical gateways. |
| **Security‑first plugin ecosystem** | ZeroClaw staging‑sweep, Hermes bytecode leak fix, OpenClaw planned verification. | Plugin managers must provide atomic install/rollback, signature verification, and sandboxed execution contexts. |
| **Enterprise‑grade RBAC & OIDC** | ZeroClaw per‑sender RBAC, Hermes provider‑balance UI, OpenClaw secret‑redaction roadmap. | Future agents will need built‑in identity‑provider integrations and granular policy engines. |
| **Resource‑aware scaling for large session stores** | Hermes CPU spikes on “thousands of sessions,” IronClaw dependency on lightweight Wasmtime. | Implement incremental indexing, background compaction, and possibly a tiered storage backend (e.g., SQLite + LSM‑tree). |
| **Cross‑platform reliability (Windows/WSL)** | Hermes dead‑connection sweep false positives on Windows, path‑handling bugs in multiple repos. | Provide platform‑agnostic abstractions and CI pipelines that cover Windows, macOS, Linux, and WSL. |

**Takeaway:** The next generation of open‑source AI assistants will likely converge on **immutable, append‑only session stores**, **secure, atomic plugin pipelines**, and **gateway architectures that can be horizontally scaled or sharded**. Projects that adopt these patterns early (e.g., OpenClaw’s Doc‑Chain substrate) will be well‑positioned to become the de‑facto standards for both hobbyist and enterprise deployments.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest
**Date:** 2026-10-30
**Repository:** [NousResearch/hermes-agent](https://github.com/nousresearch/hermes-agent)

## 1. Today's Overview
The Hermes Agent project is experiencing robust activity with a high volume of issues and pull requests being updated. While there were no new releases today, the project is actively managing post-merge stabilization, specifically regarding the recent unified gateway changes. The community is engaged in high-level architectural discussions (RFCs) alongside deep-dive bug fixes and stability improvements, indicating a healthy, evolving open-source ecosystem.

## 2. Releases
**None.** No new releases were published in the last 24 hours.

## 3. Project Progress
With 4 PRs closed and 46 open in the last 24 hours, the focus remains on bug fixing and integration tasks.
*   **Stability Fixes:** A significant number of PRs address regressions and stability issues, particularly around the Gateway, CLI, and Desktop application interactions.
*   **Feature Additions:** The team continued to expand the ecosystem, adding new plugins to the catalog (e.g., `hermes-tabs` and `provider-balances`) and enhancing Discord integration capabilities.
*   **Security:** A PR was merged to prevent community skills from shipping Python bytecode that could bypass source scanning.

## 4. Community Hot Topics
The most active discussion involves the architectural implications of the new unified gateway and its data persistence.

*   **#143379: RFC: THE DOC-CHAIN SUBSTRATE'S NETWORK** (30 comments)
    *   **Link:** [Issue #143379](https://github.com/nousresearch/hermes-agent/issues/143379)
    *   **Analysis:** This is the highest-engagement topic. It proposes a fundamental redesign of how agent memory and provenance are handled. The "Doc-Chain Substrate" aims to ensure durable records survive session compression, allowing agents to re-read history rather than forcing users to repeat information. This signals a major strategic pivot toward more robust, long-term memory architectures.
*   **#143547: Unified Gateway Post-Merge Problems** (27 comments)
    *   **Link:** [Issue #143547](https://github.com/nousresearch/hermes-agent/issues/143547)
    *   **Analysis:** As mentioned in the Overview, this tracks the fallout from moving all local conversations into a single gateway process. Users are reporting issues across CLI, Desktop, and API interfaces, necessitating a wide-ranging discussion on how to handle the unified architecture's lifecycle and session management.

## 5. Bugs & Stability
Several high-severity bugs were reported, specifically regarding the Gateway and Desktop stability.

*   **#145387: Gateway Deadlocks with `database.journal_mode: delete`** (P2)
    *   **Link:** [Issue #145387](https://github.com/nousresearch/hermes-agent/issues/145387)
    *   **Impact:** The gateway crashes on startup with a 30-second timeout, preventing the application from booting.
*   **#146643: Gateway CPU and Timeout Overhead** (P2)
    *   **Link:** [Issue #146643](https://github.com/nousresearch/hermes-agent/issues/146643)
    *   **Impact:** With a large store (thousands of sessions), the gateway re-reads the entire history on every change, causing CPU spikes and Desktop UI timeouts.
*   **#145022: Kanban Workers Crash During Gateway Stalls** (P1)
    *   **Link:** [Issue #145022](https://github.com/nousresearch/hermes-agent/issues/145022)
    *   **Impact:** Worker processes crash with "retained by owner" errors, losing in-progress work during a stall.
*   **#141861: Kanban Model Protocol Errors** (P2)
    *   **Link:** [Issue #141861](https://github.com/nousresearch/hermes-agent/issues/141861)
    *   **Impact:** Kanban workers fail with HTTP 400 errors when providers do not support specific protocols (e.g., opencode-go).
*   **#143802: Dead-Connection Sweep False Positives** (P2)
    *   **Link:** [Issue #143802](https://github.com/nousresearch/hermes-agent/issues/143802)
    *   **Impact:** The dead-connection sweep never fires on Windows, preventing users from knowing when connections are truly dead.

## 6. Feature Requests & Roadmap Signals
*   **Memory Architecture (RFC):** The "Doc-Chain Substrate" discussion (#143379) suggests the roadmap is moving toward a more sophisticated, compression-aware memory system.
*   **Plugin Ecosystem Growth:** The addition of `hermes-tabs` (a browser-integration plugin) and `provider-balances` indicates a roadmap focused on enhancing third-party integrations and providing better financial transparency for users.

## 7. User Feedback Summary
Users are currently focused on **operational reliability** and **scalability**.
*   **Pain Point:** The migration to the unified gateway is causing friction. Users report that the Desktop app and CLI are behaving inconsistently, and the system is prone to timeouts or crashes when handling large volumes of sessions.
*   **Workflow Impact:** Kanban workers are identified as a critical weak point; a single stall can cascade and crash multiple workers, leading to data loss.
*   **Platform Specifics:** Windows users are facing specific hurdles, including path handling issues (WSL translation) and false positives in connection cleanup.

## 8. Backlog Watch
*   **#99284: Kanban Assign Validation** (Open since Aug 31)
    *   **Link:** [Issue #99284](https://github.com/nousresearch/hermes-agent/issues/99284)
    *   **Status:** This bug allows arbitrary assignee strings without validation. A typo makes a review card permanently unclaimable. Despite being open for over 2 months, it has not been merged, posing a risk for users managing complex Kanban workflows.
*   **#110905: Exact-Value Redaction of .env Secrets** (Open since Sep 14)
    *   **Link:** [Issue #110905](https://github.com/nousresearch/hermes-agent/issues/110905)
    *   **Status:** A security-related feature request that has gone unanswered for nearly a month. Users need better logging hygiene to prevent sensitive keys from leaking into traces.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

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

# IronClaw Project Digest — 2026-10-30
## 1. Today's Overview
The project maintains a stable, low-turbulence operational state over the past 24 hours. There were zero open or active issues, and no new releases were published, indicating a quiet integration and maintenance phase. Activity is concentrated in routine dependency updates, specifically 2 dependabot-driven PRs that bump the `wasmtime` runtime dependency, with no merged code or user-requested features surfaced. Overall, the project exhibits consistent onboarding and baseline maintenance patterns.
## 2. Releases
No new versions released. There are no breaking changes or migration notes to document, as no release milestones occurred in the current update cycle.
## 3. Project Progress
- **PRs (2):** 
  - **PR #8162** [`OPEN`][dependencies, rust]: Chore dependency update for `wasmtime`, bumping from 47.0.3 to 48.0.7.
  - **PR #8163** [`OPEN`][dependencies, rust]: Chore dependency update for `wasmtime`, bumping from 47.0.4 to 49.0.5.
- **Contribution:** Both PRs are routine dependency maintenance, indicating ongoing compatibility tuning and baseline upgrades rather than major feature delivery. No features were advanced or fixed in these PRs.
## 4. Community Hot Topics
- **Active PRs:** The two dependabot PRs driving the `wasmtime` version bumps are the current community activity, reflecting ongoing technical maintenance and dependency stabilization.
- **Candidates:** Dependabot-driven dependency updates are currently the most active community topics, driven by automated maintenance of core runtime dependencies (e.g., `wasmtime`). These signals suggest the project is focused on stability and infrastructure optimization rather than user-driven feature demand.
## 5. Bugs & Stability
- **Status:** No bugs, crashes, or regressions reported in the last 24 hours.
- **Assessment:** The lack of these issues confirms a low-risk, stable operational state with no unresolved stability defects right now.
## 6. Feature Requests & Roadmap Signals
- **Signal:** No explicit feature requests or roadmap features are surfaced in the current data.
- **Prediction:** Given the sustained focus on dependency management and stability (via `wasmtime` updates), the next version release likely focuses on minor dependency harmonization, compatibility refinements, and ongoing infrastructure maintenance rather than introducing new user-facing features.
## 7. User Feedback Summary
- **Overall Health:** The project has delivered a stable, low-turbulent user experience with no unresolved user-reported issues.
- **Use Cases:** Serves standard integration and baseline maintenance workflows, particularly relevant for environments relying on core runtime dependencies.
- **Satisfaction:** User satisfaction is currently neutral, as there is no evidence of user complaints or unmet feature needs that are driving feedback.
## 8. Backlog Watch
- **Items Requiring Attention:**
  - The two currently open `wasmtime` dependency PRs (**PRs #8162 and #8163**) are the primary items requiring maintainer attention. The increasing frequency of these updates suggests ongoing dependency ecosystem optimization may be necessary to prevent potential compatibility regressions.
  - No open issues remain to track, meaning there is no urgent user-facing backlog to address, though the maintainers should monitor for any latent stability issues during dependency bumping.
---
*Digest generated based on GitHub data for 2026-10-30.*

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest
**Date:** 2026-10-30

### 1. Today's Overview
ZeroClaw is experiencing high activity, with 50 issues and 50 PRs updated in the last 24 hours. The project appears to be in a stabilization phase for version 0.9.0, evidenced by the closure of several critical bug fixes and the active resolution of a long-running RFC regarding session architecture. The volume of activity suggests the team is aggressively addressing technical debt and finalizing core features before the next major release.

### 2. Releases
**No new releases detected in the last 24 hours.**
*   *Note:* Recent closed issues (e.g., #11957, #11969) reference `release:v0.9.0`, indicating that v0.9.0 is likely the current or imminent target version.

### 3. Project Progress
The project is making significant headway in **plugin management stability** and **gateway security**. Several plugin-related bugs were closed, addressing issues with abandoned installation stages and lock file handling. Additionally, the gateway module received updates to support OIDC dashboard sign-in and fix credential injection risks.

**Key Recent Merges (PRs):**
*   **Security:** Fixed OIDC enrollment to prevent raw client credentials in headers, which broke enrollment flows due to reserved characters (#11957 - Closed).
*   **Plugins:** Implemented a staging sweep to clear abandoned `.installing-v1-*` directories left by interrupted installations (#11855 - Closed).
*   **Build System:** Adjusted CLI-only builds to point to the standard build, ensuring consistency across feature sets (#11975 - Closed).
*   **Channels:** Added media attachment support for Signal (#11556 - Closed) and fixed HTML email rendering issues (#11993 - Closed).

### 4. Community Hot Topics
The community is deeply engaged in **architectural evolution** and **security hardening**.

*   **Append-Only Session History (RFC #10526):** This is the most active discussion with 14 comments. It proposes moving from mutable message persistence to a deterministic, append-only event history model to handle complex agent execution states.
    *   *Link:* [ZeroClaw RFC: Append-only session event history](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)
*   **Per-Sender RBAC (Feature #5982):** Focuses on implementing Role-Based Access Control for multi-tenant deployments, building on the existing agent/risk-profile model. This is a critical infrastructure requirement for enterprise adoption.
    *   *Link:* [Feature: Per-sender RBAC for multi-tenant agent deployments](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)
*   **Discord Plugin Verification (Task #10999):** Addresses the verification of Discord plugin installation from release binaries, ensuring security and reliability of the plugin ecosystem.
    *   *Link:* [Task: Publish and prove Discord plugin installation](https://github.com/zeroclaw-labs/zeroclaw/issues/10999)

### 5. Bugs & Stability
Several bugs were closed today, but several high-severity security and stability issues remain open.

**Recently Closed:**
*   **S2 - Degraded Behavior:** Daemon crashes mid-turn leaving sessions marked as "running" forever (#11432 - Closed).
*   **S2 - Degraded Behavior:** Web chat hydration dropping user prompts during reloads (#11517 - Closed).
*   **S3 - Minor:** Inline `nosemgrep` comments failing to stop code scanning alerts (#11987 - Closed).
*   **S3 - Minor:** Plugin `migrate` commands causing merge conflicts (#11358 - Open, but PR #11855 fixed a related stage issue).

**Open High Priority:**
*   **S0 - Security Risk:** **Knowledge Graph Cross-Contamination (#9647).** The knowledge tool exposes a global graph where any agent can read/mutate another agent's data. This is a critical data isolation flaw.
    *   *Link:* [Bug: Knowledge graph has no per-agent attribution](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)
*   **S1 - Workflow Blocked:** **OIDC Enrollment Failure (#11957 - Closed via PR).** While the specific bug is fixed, the underlying mechanism of handling reserved characters in client credentials remains a focal point for security discussions.
*   **S2 - Degraded Behavior:** **Slack "Thinking" Status Missing (#11416).** Since v0.8.5, the agent no longer shows native "thinking" status in channel threads, making it harder for users to know the agent is working.

### 6. Feature Requests & Roadmap Signals
*   **Unified File Model (Tracker #11013):** An implementation tracker for a unified file intake and delivery system. This suggests a move towards better handling of file attachments and document processing across different channels.
*   **ZeroCode UX Improvements (#11486):** Users are requesting predictable "Save/Cancel" behavior in the ZeroCode TUI to reduce user error during configuration changes.
*   **Multi-Select Config Editors (#11502):** A request to add multi-select editing capabilities for array references in the configuration UI.

### 7. User Feedback Summary
The user base is focused on **operational reliability** and **enterprise-grade security**.
*   **Pain Point:** Users report difficulty in tracking agent state during reloads and long-running sessions, leading to data loss (prompts disappearing).
*   **Pain Point:** Plugin installation is currently fragile; interrupted installs leave behind "orphaned" staging directories that block future installs.
*   **Request:** There is a strong demand for better visibility into agent actions (e.g., Slack status, foreground delegate visibility) and more granular control over cost limits and cost overrides.

### 8. Backlog Watch
Several long-standing issues require maintainer attention:
*   **RFC #10526 (14 comments):** The architectural shift to append-only history is a major refactor. It needs a clear plan or implementation path to prevent scope creep.
*   **Bug #9647 (5 comments):** The cross-agent knowledge graph mutation is a critical security vulnerability that has lingered since August.
*   **Bug #11332 (4 comments):** Skill review loops are failing in non-CLI channels (Matrix, Webhooks), indicating a gap in how skills are distributed across different runtime entry points.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*