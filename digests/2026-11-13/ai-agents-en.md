# OpenClaw Ecosystem Digest 2026-11-13

> Issues: 431 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-13 00:48 UTC

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

Here is the open-source personal AI assistant and agent ecosystem snapshot based on the daily activity digest for **November 13, 2026**.

---

### 1. Ecosystem Overview

The open-source personal AI agent ecosystem is currently navigating an intensive maintenance, stabilization, and platform-hardening phase. Active projects are shifting focus from raw feature expansion toward enterprise-grade runtime stability, Model Context Protocol (MCP) auth architecture, and large-context window management (up to 1M tokens). However, friction remains high around external integrations—projects are actively grappling with breaking upstream changes in platform SDKs (e.g., Slack API updates) and rigid OS security models (such as macOS packaging notarization and entitlement validation). Overall, the ecosystem is maturing toward isolating multi-tenant workflows, hardening desktop clients, and establishing standard gateway architectures.

---

### 2. Activity Comparison

| Project | Issues (Updated/Active) | PRs (Updated/Active) | Release Status | Health & Velocity Score |
| :--- | :---: | :---: | :---: | :--- |
| **Hermes Agent** | 50 updated (9 closed) | 50 updated (37 open) | No new release | **High** (Very active maintenance & UI work) |
| **LobsterAI** | 0 active (1 referenced) | 16 updated (1 open, 15 merged) | No new release | **High** (High merge velocity, stability focus) |
| **NullClaw** | 0 | 0 | No new release | **Inactive** (0 activity in 24h) |
| **IronClaw** | 0 | 0 | No new release | **Inactive** (0 activity in 24h) |
| **TinyClaw** | 0 | 0 | No new release | **Inactive** (0 activity in 24h) |
| **Moltis** | 0 | 0 | No new release | **Inactive** (0 activity in 24h) |
| **ZeptoClaw** | 0 | 0 | No new release | **Inactive** (0 activity in 24h) |
| **OpenClaw** | *Data N/A* | *Data N/A* | *Data N/A* | *Data N/A* (Summary failed) |
| **NanoBot** | *Data N/A* | *Data N/A* | *Data N/A* | *Data N/A* (Summary failed) |
| **PicoClaw** | *Data N/A* | *Data N/A* | *Data N/A* | *Data N/A* (Summary failed) |
| **NanoClaw** | *Data N/A* | *Data N/A* | *Data N/A* | *Data N/A* (Summary failed) |
| **CoPaw** | *Data N/A* | *Data N/A* | *Data N/A* | *Data N/A* (Summary failed) |
| **ZeroClaw** | *Data N/A* | *Data N/A* | *Data N/A* | *Data N/A* (Summary failed) |

---

### 3. OpenClaw's Position

Although OpenClaw's direct summary was unavailable for this period, downstream signals reveal its role as a **foundational core framework and gateway standard**. 

* **Upstream Standard**: Downstream projects like **LobsterAI** are actively committing engineering resources to optimize OpenClaw integrations (e.g., trimming OpenClaw gateway startup times by scoping packages and maintaining OpenClaw bootstrap replay timestamp stability).
* **Technical Approach**: OpenClaw acts as the underlying gateway orchestration standard, while downstream projects build specialized desktop shells, session management layers, and custom tool adapters on top of its protocol.
* **Ecosystem Footprint**: OpenClaw serves as an architectural anchor in the ecosystem, directly influencing performance and execution standards across derivative clients.

---

### 4. Shared Technical Focus Areas

Cross-project analysis reveals emerging technical requirements across major active frameworks:

1. **Large Context Window Optimization (1M Tokens)**
   * *Projects*: **Hermes Agent**, **LobsterAI**
   * *Needs*: User control over explicit context window expansion (up to 1M tokens), alongside background context compaction for idle channels to prevent token waste and context bloat during extended waiting periods.
2. **Model Context Protocol (MCP) & Auth Sharing**
   * *Projects*: **Hermes Agent**, **LobsterAI**
   * *Needs*: Standardizing OAuth flows across multiple agent profiles, securing secret redaction in streaming outputs, and resolving stdio/TLS proxy issues for desktop MCP servers.
3. **Session Metadata Integrity & Error Recovery**
   * *Projects*: **Hermes Agent**, **LobsterAI**
   * *Needs*: Defensive parsing of stored session message histories to prevent app crashes from corrupt JSON, maintaining transcript readability across model switches, and stabilizing UI rendering during WebSocket drops.

---

### 5. Differentiation Analysis

```
                  ┌─────────────────────────────────────────┐
                  │              Hermes Agent               │
                  │  (Multi-Channel, Slack/Desktop UI,      │
                  │   MCP Ecosystem, Profile Management)    │
                  └────────────────────┬────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                │                                             │
┌───────────────▼──────────────┐             ┌────────────────▼──────────────┐
│          LobsterAI           │             │     Lightweight / Niche       │
│  (Desktop-Native Co-work,    │             │   (NullClaw, IronClaw, etc.)  │
│ OpenClaw Gateway Integration)│             │ (Minimalist footprint agents) │
└──────────────────────────────┘             └───────────────────────────────┘
```

* **Hermes Agent**: Positions itself as an **extensible, multi-channel platform assistant**. Focuses on rich profile managers, configurable reasoning modes (e.g., "Architect" vs. "Writer"), Slack/Gateway bot rosters, and wide-ranging MCP server ecosystem integrations.
* **LobsterAI**: Focuses heavily on a **polished desktop co-working experience**. Priority is given to native OS execution details (macOS entitlements, code-signing notarization, UI launch modals) and lightweight integration with OpenClaw runtime gateways.
* **Minimalist Frameworks (NullClaw, IronClaw, TinyClaw, etc.)**: Target lightweight, single-purpose, or embedded agent runtimes with minimal dependencies, though currently seeing lower daily commit velocity compared to full-stack desktop frameworks.

---

### 6. Community Momentum & Maturity

* **Tier 1: High Velocity & Active Maintenance (Hermes Agent, LobsterAI)**
  * Demonstrating rapid issue resolution, daily PR merges, and continuous bug mitigation. Projects in this tier are maturing rapidly by addressing edge-case integration failures and UI/UX friction.
* **Tier 2: Stable / Low-Frequency Maintenance (NullClaw, IronClaw, TinyClaw, Moltis, ZeptoClaw)**
  * Recorded zero activity in the 24-hour window. These projects are either in feature-complete stability phases or experiencing lull periods between release cycles.
* **Tier 3: Metrics Unavailable (OpenClaw, NanoBot, PicoClaw, NanoClaw, CoPaw, ZeroClaw)**
  * Parsing issue during summary generation; execution activity unable to be verified for this exact 24h window.

---

### 7. Trend Signals for AI Agent Developers

1. **Platform Fragility is the #1 Operational Risk**: Upstream API changes (such as `slack-sdk` rejecting free-text status calls) and operating system code-signing enforcement (macOS notarization blocks) are major causes of unannounced breakages in agent deployments. Defensive wrapper design is essential.
2. **Shift Toward Session Profile & Preset Management**: Developers are moving away from monolithic agent configurations. Demand is growing for "Session Profiles" and "Static Model Presets" that dynamically map reasoning levels, tool access, and context limits per task role.
3. **Desktop Apps are the Primary Interface Battleground**: Both Hermes Agent and LobsterAI are spending significant cycles redesigning desktop workspaces, managing local storage corruption resilience, and stabilizing WebSocket reconnection behaviors, signaling that local desktop clients remain a dominant interface for developer workflows.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest (2026-11-13)

## 1. Today's Overview
Activity on the Hermes Agent repository remains robust with 50 issues and 50 pull requests updated in the last 24 hours. The project is currently in a maintenance and stabilization phase, with a significant focus on fixing regressions introduced by updates to dependencies (specifically `slack-sdk` and MCP server handling) and resolving configuration stability issues. While no new releases were pushed, the high volume of PR activity indicates active development and community contribution.

## 2. Releases
**None**
No new releases were published in the last 24 hours.

## 3. Project Progress
*   **Issue Resolution:** 9 issues were closed (e.g., #144309, #147623, #21256, #12658, #15593), indicating maintenance work is clearing the backlog.
*   **PR Activity:** 37 PRs are currently open. Recent work focuses on:
    *   **Desktop & Gateway UI:** Improvements to bot roster rendering and agent workspace redesigns.
    *   **Plugin Stability:** Fixing executable permissions for hub-installed skills and correcting documentation for paid upload tools.
    *   **Security & Privacy:** Enhancing secret redaction in streaming chat and fixing proxy/TLS issues for stdio MCP servers.

## 4. Community Hot Topics
*   **[Issue #131859](https://github.com/nousresearch/hermes-agent/issues/131859)** (59 comments): **API Permissions & Fork PRs.** A critical blocker for contributors. Users cannot open PRs from forks due to a `protect-main` ruleset update, despite issue creation working. This is a significant friction point for open-source collaboration.
*   **[Issue #110374](https://github.com/nousresearch/hermes-agent/issues/110374)** (15 comments): **Slack SDK Integration Breakage.** The status indicator ("is thinking...") has silently failed since `slack-sdk` >= 3.44.0 due to the API rejecting free-text status updates. Multiple related issues (#112866, #132594) confirm this is a widespread regression affecting the Slack platform integration.
*   **[PR #152168](https://github.com/nousresearch/hermes-agent/pull/152168)**: **Redesigned Agent Workspace.** A major UI overhaul for the Desktop interface is being tested, aiming to replace the classic shell with a modernized version that includes classic recovery options.

## 5. Bugs & Stability
*   **[Bug] Slack Status Indicator Failure (P2):** Multiple reports confirm that since `slack-sdk` 3.44, `agents.sessions.setStatus` rejects free-text strings, causing the status line to vanish. **Status:** Multiple open issues (#110374, #112866, #132594) and **No fix PRs** currently merged.
*   **[Bug] Fork PR Creation Blocked (P3):** Contributors are unable to create PRs via the API, receiving a `FORBIDDEN` error. This is linked to a ruleset update on Oct 6. **Status:** Open issue with 59 comments; **No fix PRs** yet.
*   **[Bug] Desktop MCP OAuth Failure (P3):** The "add Hugging Face" suggestion pill fails to configure the server due to a forced OAuth flow rollback. **Status:** Open issue (#87062); **No fix PRs** yet.
*   **[Bug] Desktop Transcript Collapse (P2):** WebSocket storms cause the chat transcript to collapse into a stale anchor from days ago, creating a disjointed user experience. **Status:** Open issue (#154326); **No fix PRs** yet.

## 6. Feature Requests & Roadmap Signals
*   **Model Presets & Profiles:** Several issues (#20249, #107745, #103639) discuss the need for "Static Model Presets" and a "Session Profile Manager" to simplify switching between reasoning modes (e.g., "Architect" vs. "Writer") and reduce configuration repetition across the agent, main agent, and subagents.
*   **Per-Channel Idle Context:** A feature request (#97390) asks for background compaction of idle gateway sessions to prevent context bloat during waiting periods.
*   **MCP OAuth Sharing:** A proposed feature (#89830) seeks to allow a single MCP OAuth grant to be shared across multiple profiles for easier multi-account management.

## 7. User Feedback Summary
*   **Contributor Frustration:** The primary sentiment among users is frustration regarding the sudden loss of functionality (Slack status, PR creation) due to dependency updates or permission changes, often without immediate fix availability.
*   **Configuration Management:** Users express desire for cleaner configuration. There is a strong demand for "reusable model definitions" to stop repeating provider settings across different agent roles and a visual interface for reasoning effort selection in model pickers.
*   **Desktop Experience:** Users are excited about the UI redesign but concerned about the stability of the Desktop app during network storms (disconnects) and the reliability of installed skills (permissions).

## 8. Backlog Watch
*   **[Issue #131859](https://github.com/nousresearch/hermes-agent/issues/131859):** The most critical blocker. Requires immediate maintainer attention to restore fork PR creation capabilities.
*   **[Issue #110374](https://github.com/nousresearch/hermes-agent/issues/110374):** High priority for platform stability; impacts daily user experience on Slack.
*   **[PR #89830](https://github.com/nousresearch/hermes-agent/pull/89830):** A complex feature request regarding MCP security boundaries and profile sharing that has been open for months; requires architectural review.
*   **[Issue #147594](https://github.com/nousresearch/hermes-agent/issues/147594):** A config round-trip bug affecting configuration file integrity when editing lists.

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

No activity in the last 24 hours.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest: 2026-11-13
## Today's Overview
LobsterAI showed moderate activity on GitHub on 2026-11-13, with **0 new releases** and **0 open/active issues**, yet it handled **16 pull requests** updated in the last 24 hours (1 open, 15 closed/merged). The activity is heavily concentrated in bug fixes and stability improvements across multiple areas—primarily macOS packaging and launch authorizations, OpenClaw gateway performance trimming, agent identity conflicts, renderer fixes for cowork/documents, and build/packaging safeguards. Overall, the project is in a **stable, maintenance-heavy state** with limited user-facing feature spikes, leaning toward bug resolution and minor improvements rather than major roadmap releases.
## Releases
**No new releases** are available according to the provided data. There are no version bump or release notes to detail, breaking changes, or migration notes.
## Project Progress
- **16 PRs updated** in the last 24 hours: **1 open** (`#3061` fix(cowork): tolerate corrupt metadata in paged session messages, fixing issue #639 via `src/main/coworkStore.ts`), and **15 merged/closed**, primarily bug fixes and stability enhancements.
- **Merged/closed PRs categorized:**
  - **macOS build/launch:** `#3067` repair codown launch authorization and preserve app signatures (macOS, created 2026-11-12).
  - **OpenClaw perf:** `#3066` trim gateway startup by gating xai plugin and scoping dist package.
  - **Agent config/identity:** `#3065`, `#3064` fix expert deletion identity conflicts and gateway sync failures; `#3064` also adds model selection inheritance for summoning.
  - **Cowork/renderer:** `#3062` keep legacy replies readable after model changes; `#3060` settle and display usage for stopped turns; `#3053`, `#3055`, `#3054`, `#3052` focus on turn credit, input caret, scroll jumps, and empty search layout shift.
  - **Build/packaging:** `#3056` prevent duplicate macOS notarization; `#3053` preserve turn credit usage after stopping.
  - **Docs/features:** `#3059` support explicit context window selection up to 1M; `#3063` in-app banner links and configurable launch modal width.
  - **OpenClaw/bootstrap:** `#3058` keep bootstrap timestamps stable across replays.
## Community Hot Topics
- **Most active PRs:** A concentrated cluster of stability and bug-fix PRs from multiple areas (macOS launch/codown, OpenClaw gateway perf, cowork/renderer behavior, build/packaging, agent identity/setup), indicating a **heavy maintenance and reliability effort**.
- **Notable PR highlights:**
  - `#3067` (macOS launch authorization repair) addresses a rejection of signed/notarized apps, likely impacting user install experience.
  - `#3061` fixes corrupt metadata handling in paged session messages, with links to issue #639, highlighting data reliability concerns in cowork sessions.
  - `#3065` / `#3064` address expert deletion conflicts and gateway sync failures, touching core agent and identity workflows.
- **Underlying needs:** Reliability of macOS launch/codown signatures, OpenClaw startup performance, agent identity synchronization, and session message/metadata integrity—all significant for user workflow and stability.
## Bugs & Stability
- **Critical/High:**
  - **macOS codown launch errors:** `#3067` (closed) fixed `Restricted entitlements not validated` / `Code=-413 "No matching profile found"` on codown launches, indicating a potential macOS packaging/launch issue that has been addressed.
  - **Duplicate notarization on macOS packaging:** `#3056` (closed) fixed electron-builder notarization conflicts by disabling `notarize=false` and ensuring the custom hook owns it, preventing invalidate risks.
- **Medium:**
  - **Corrupt session message metadata:** `#3061` (open) protects `getPagedSessionMessages` against corrupt JSON in stored rows, preventing read failures (fixes #639).
  - **Stopped-turn credit/usage handling:** `#3053` and `#3060` address `sessionStopped` credit unsettling and incomplete display, a stability concern in task lifecycle management.
  - **Legacy reply readability after model changes:** `#3062` resolves lost readability of completed replies after switching models, improving usability in sessions.
- **No newly reported crashes** are specified for 2026-11-13, though multiple fixes are in place to mitigate recurring issues across these categories.

## Feature Requests & Roadmap Signals
- **Context window selection:** `#3059` introduces explicit up to 1M context window selection for eligible managed models/presets, signaling a future model-level feature likely to appear in a new version.
- **In-app banner links/configurable width:** `#3063` adds desktop banner links and a configurable launch modal width (320–960px default 400px), indicating expanded desktop UI enhancements.
- **Preset/model selection inheritance:** `#3064` extends summoning to inherit model selection, providing a workflow refinement signal.
- **Roadmap signals** point primarily toward stabilizing core workflows (agent/identity, session metadata, macOS packaging) and adding user-facing UI/configuration options (banner links, context window choices).

## User Feedback Summary
- **Pain points identified:** Users report macOS launch failures with codown signed/notarized apps and duplicate notarization, suggesting packaging and launch reliability issues. Data integrity concerns arise from corrupt session message metadata affecting readability and workflow stability. Stability issues around stopped-turn credit handling and model-change interactions impact reply usability.
- **Use cases:** Workflow reliability across macOS install/launch, session message handling, agent/identity management, and task turn lifecycle management.
- **Satisfaction:** The majority of PRs indicate corrective fixes rather than new feature requests, suggesting users have experienced friction but a proactive maintenance approach has partially resolved recent issues.

## Backlog Watch
- **Open, unresolved PR/issue cluster:**
  - `#3061` (open): corrupt metadata handling in paged session messages—needs maintainer review to confirm fix execution and potential replication across users.
  - **Multiple issue/fix threads** tied to cowork session stability, stopped-turn usage, and model-change readability (PRs `#3062`, `#3060`, and related cowork fixes) that may have open follow-up requirements requiring monitoring.
- **Priority:** These sessions should be monitored for resolution status, as they directly impact user session reliability and include an open PR signaling ongoing effort.

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

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*