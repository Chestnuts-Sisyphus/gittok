# OpenClaw Ecosystem Digest 2026-09-24

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-23 22:33 UTC

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

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently in a state of rapid architectural maturation, shifting focus from experimental prototypes to robust, production-ready frameworks. The landscape is dominated by a clear movement toward standardized inter-agent communication (MCP, A2A protocols) and improved container-based isolation for secure execution. Projects are increasingly prioritizing "long-haul" stability, including memory management and reliable update lifecycles, as developers move beyond simple chatbot interfaces toward complex, autonomous multi-agent environments.

### 2. Activity Comparison

| Project | Active Issues | Active PRs | Release Status | Health Score |
| :--- | :--- | :--- | :--- | :--- |
| **NanoClaw** | 4 | 27 | v2.4.0 (Recent) | 🟢 High |
| **NullClaw** | 17 | 21 | Stable (No new) | 🟡 Medium |
| **CoPaw** | 34 | 15 | v2.2.x | 🟡 Medium |
| **LobsterAI** | Low | 8 | v2026.9.23 | 🟢 High |
| **Hermes Agent**| Low | 2 | v2.0.1 | 🟢 High |
| **IronClaw** | 0 | 2 | RC (v1.4.1) | 🟡 Medium |
| **Moltis** | 0 | 1 | Maintenance | 🟢 Stable |

*Note: Projects like OpenClaw, NanoBot, PicoClaw, TinyClaw, ZeptoClaw, and ZeroClaw showed no significant data or failed summary generation.*

### 3. OpenClaw’s Position
As the core reference implementation, **OpenClaw** holds a unique strategic position but is currently facing a visibility/reporting gap. While it serves as the foundational architectural blueprint for derivatives like NanoClaw and LobsterAI, its own development transparency appears to have stuttered in this cycle. Its primary advantage is "first-mover" status; however, derivatives are now out-pacing it in specific feature delivery (e.g., NanoClaw’s Iron Proxy). OpenClaw’s community size is ostensibly the largest, though it is currently reliant on its ecosystem of forks for active experimentation and bug-fixing.

### 4. Shared Technical Focus Areas
*   **Credential/Gateway Flexibility:** Projects (NanoClaw, LobsterAI, CoPaw) are moving away from monolithic gateway models toward pluggable credential handlers (Iron Proxy, BYO-key models).
*   **Container/Sandbox Isolation:** A unified effort to move agent execution into controlled environments (Moltis, NanoClaw, NullClaw) to mitigate prompt injection and resource leaking.
*   **Transcript & Memory Lifecycle:** Nearly all active projects are wrestling with the "long-running agent" problem—specifically, how to rotate logs and manage context bloat in persistent tasks (NullClaw, NanoClaw, CoPaw).

### 5. Differentiation Analysis
*   **NanoClaw:** The current "feature powerhouse," focusing on operational excellence, update-system reliability, and gateway diversification.
*   **NullClaw:** High-performance focus using a Zig-based core; targets low-resource environments and high-concurrency needs, sacrificing some out-of-the-box UI polish for backend efficiency.
*   **CoPaw:** Leading in the multi-tenant/enterprise space with their "Hub" architecture; focuses on UI-rich, collaboration-first agentic experiences.
*   **IronClaw:** Positions itself as the high-security/enterprise-ready standard, emphasizing rigorous dependency management and scoped virtual skill roots.

### 6. Community Momentum & Maturity
*   **Rapid Iteration:** **NanoClaw** and **LobsterAI** exhibit the highest velocity, quickly turning feedback into released code. They represent the current "stable-but-evolving" frontier.
*   **Stabilization:** **IronClaw** and **Moltis** are in a maturation phase, focusing on security and architectural hardening rather than feature expansion.
*   **Critical/Fragile:** **NullClaw** is at a high-risk/high-reward maturity point; the core logic is innovative but currently suffers from critical stability issues (e.g., stack overflows on aarch64) that require immediate resolution to move from "enthusiast" to "production" status.

### 7. Trend Signals
*   **Agent Autonomy:** The shift toward "Approval Flows" (CoPaw, NullClaw) signals that developers are finally building the necessary guardrails for fully autonomous tool usage.
*   ** BYO-Everything:** The trend of "Bring Your Own Key" (BYO-key) and "Bring Your Own Model" (as seen in LobsterAI) indicates that end-users value sovereignty over their reasoning backends more than bundled subscription services.
*   **Reliability as the New Feature:** The surge in PRs specifically targeting "update cutover" and "memory leaks" (NanoClaw, NullClaw) confirms that the ecosystem has moved past the "can it talk" phase and is now strictly concerned with "can it run for 30 days without crashing."

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Today's Hermes Agent Project Digest

## Today's Overview
- **Activity Assessment**: The project is still under development, with a focus on refining gateway responsibilities and SSH operations.

## Releases
- **Version 2.0.1** (PR #119032): Fix badge issue for the in-progress indicator.
- **Version 2.0.0** (PR #120714): Refactored gateway responsibilities and completed operational IPC and lifecycle extraction.

## Project Progress
- Merged/closed PRs today: PR #119032 advanced the in-progress indicator fix, and PR #120714 refactored the gateway responsibilities.

## Community Hot Topics
- Most active Issues/PRs with most comments/reactions: PR #119032 (in-progress indicator fix) and PR #120714 (gateway responsibilities refactor).

## Bugs & Stability
- Reported bugs, crashes, regressions: None

## Feature Requests & Roadmap Signals
- User-requested features: Not applicable

## User Feedback Summary
- Real user pain points: Not applicable
- Use cases: Not applicable
- Satisfaction/dissatisfaction: Not applicable

## Backlog Watch
- Long-unanswered important Issues or PRs needing maintainer attention: Not applicable

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>



# NanoClaw Project Digest — 2026-09-24

## 1. Today's Overview

NanoClaw showed strong activity today with 4 new issues and 27 updated pull requests, including 16 merged/closed. The highlight was the release of **v2.4.0**, which introduces the Iron Proxy credential gateway as an alternative to OneCLI, reworked OpenCode provider support, and expanded channel integrations. The project is in an active development phase with ongoing cleanup of the update system, gateway architecture, and container lifecycle management. Community engagement is healthy with contributors actively resolving bugs and shipping features.

## 2. Releases

**v2.4.0** (merged via PR #3877) — The day's new release brings several notable changes:

- **Iron Proxy gateway** added as an installable skill alongside the existing OneCLI default (`#3817`, `#3825`)
- **OpenCode provider reworked** with async spawn for the memory hook to prevent CI wedging (`#3841`, `#3825`)
- **Community-portal setup** for Echo's hardened image and a managed Slack app
- **Install-wide and per-group model/speed controls**
- **Mattermost channel** support added
- **Claude Code bumped to 2.1.280** and Agent SDK to 0.3.280 (`#3868`)
- **Codex CLI pinned to 0.155.1** (`#3867`)

**Breaking changes / migration notes:** None explicitly called out, but the OneCLI refactor (`#3816`) moves installation and runtime integration into a skill. Existing OneCLI configuration is preserved. The gateway contract is now centralized (`#3815`).

## 3. Project Progress

### Merged / Closed Today
- **#3877** — Release v2.4.0 shipped
- **#3876** — Teams: hand bot display name to bridge from inbound activities
- **#3875** — Channels: prompt name follows bot display name when `assistant_name` is unset
- **#3873** — Fix update cutover to stop containers instead of polling for them
- **#3872** — Iron Proxy: keep Codex working after rejected WebSocket upgrade
- **#3868** — Bump Claude Code to 2.1.280 / Agent SDK to 0.3.280
- **#3867** — Pin Codex to 0.155.1
- **#3825** — OpenCode authentication via Iron Proxy
- **#3817** — Iron Proxy gateway skill added
- **#3816** — OneCLI refactored into installable skill
- **#3815** — Credential gateway contract centralized
- **#3750** — Fix update controller by including full scripts/ tree in git archive

### Open PRs Advancing
- **#3848** — Add TypeSafe Jev judgments as a container tool via `/add-typesafe-tool` skill
- **#3646** — Allow operators to widen sweep timers (`ABSOLUTE_CEILING_MS`, `CLAIM_STUCK_MS`) via env vars
- **#3878** — Fix setup ping-agent cleanup race (stop container before deleting folder)
- **#3503** — Run agent sessions on Apple Container instead of Docker on macOS
- **#3494** — Build Remote Agent phone pairing adapter (gbr/1 protocol)

## 4. Community Hot Topics

- **[Issue #3732](https://github.com/nanocoai/nanoclaw/issues/3869)** — Transcript rotation never runs for tasks that keep their container alive. This has been open since Sep 7 with no resolution. Users running long-duration scheduled tasks are hitting transcript bloat because `maybeRotateContinuation()` is only called once per container start.
- **[Issue #3869](https://github.com/nanocoai/nanoclaw/issues/3869)** — `update-nanoclaw` crashes with `MODULE_NOT_FOUND` due to missing transitive imports in the controller archive list. Fixed by PR #3750 (merged). This was a high-impact blocker for the update flow.
- **[PR #12](https://github.com/nanocoai/nanoclaw/pull/12)** — Open since Feb 2026, finally merged. Fixes `lastAgentTimestamp` being updated on failure, causing messages to be skipped on retry. A long-standing reliability issue for retry logic.

**Underlying needs:** Operators need reliable update mechanisms, proper transcript lifecycle management for long-running scheduled tasks, and robust retry semantics.

## 5. Bugs & Stability

| Severity | Issue/PR | Description | Fix Status |
|----------|----------|-------------|------------|
| 🔴 High | [#3869](https://github.com/nanocoai/nanoclaw/issues/3869) | `update-nanoclaw` crashes on prepare due to missing transitive imports in `git archive` | ✅ Fixed in [#3750](https://github.com/nanocoai/nanoclaw/pull/3750) |
| 🔴 High | [#3828](https://github.com/nanocoai/nanoclaw/issues/3828) | Update cutover drain can never succeed — host stops before containers it waits on | ✅ Fixed in [#3873](https://github.com/nanocoai/nanoclaw/pull/3873) |
| 🟡 Medium | [#3732](https://github.com/nanocoai/nanoclaw/issues/3732) | Transcript rotation never runs for keep-alive tasks | ⏳ Open, no fix yet |
| 🟡 Medium | [#3874](https://github.com/nanocoai/nanoclaw/issues/3874) | OneCLI gateway ownership check uses group existence, not installation identity | ⏳ Open, just reported today |
| 🟢 Low | [#3872](https://github.com/nanocoai/nanoclaw/pull/3872) | Codex fails with 401/400 through Iron Proxy after WebSocket rejection | ✅ Fixed (merged) |
| 🟢 Low | [#3878](https://github.com/nanocoai/nanoclaw/pull/3878) | Setup ping-agent container leak after folder deletion | ⏳ Open PR, not yet merged |

## 6. Feature Requests & Roadmap Signals

- **Iron Proxy as alternative gateway** — Now shipped in v2.4.0 (`#3817`, `#3825`). Signals community demand for credential gateway flexibility beyond OneCLI.
- **Apple Container support (macOS)** — PR #3503 remains open; would run sessions in microVMs instead of Docker. Suggests interest in non-Docker containerization on macOS.
- **TypeSafe Jev tool integration** — PR #3848 adds a skill for AI-driven classifications/rankings. Indicates demand for embedding decision-model tools as container tools.
- **Remote Agent phone pairing** — PR #3494 adds a gbr/1 adapter for phone spectating. Niche but signals interest in cross-device agent visibility.
- **Global env overrides for sweep timers** — PR #3646 (open) shows operator demand for configurability of hard-coded timeout values.

**Next version prediction:** Expect continued gateway diversification, more channel integrations, and cleanup of the update/sweep subsystem. The Apple Container PR may ship if testing stabilizes.

## 7. User Feedback Summary

- **Update system pain** — Two critical bugs (#3869, #3828) in the same subsystem (`/update-nanoclaw`) suggest this is a major friction point. Operators relying on automated updates hit crashes and deadlocks. Both are now fixed.
- **Retry semantics broken** — PR #12 (open for 7+ months) addressed a fundamental issue where failed agent runs caused message loss. Users with retry-dependent workflows were affected.
- **Credential gateway rigidity** — The addition of Iron Proxy (`#3817`) alongside OneCLI reflects user demand for alternative authentication paths, especially for OpenCode and Codex integrations.
- **Container lifecycle leaks** — Multiple issues (#3732 transcript rotation, #3878 ping-agent cleanup) point to recurring container lifecycle management gaps that frustrate operators running persistent workloads.
- **Teams channel naming** — PRs #3875/#3876 fix display name propagation, indicating users are running multi-bot or shared-bot setups where naming consistency matters.

## 8. Backlog Watch

| Item | Open Since | Concern |
|------|-----------|---------|
| [#3732](https://github.com/nanocoai/nanoclaw/issues/3732) — Transcript rotation for keep-alive tasks | 2026-09-07 (17 days) | Scheduled tasks with short recurrence intervals accumulate unrotated transcripts indefinitely. No fix PR yet. |
| [#3874](https://github.com/nanocoai/nanoclaw/issues/3874) — OneCLI ownership check weakness | 2026-09-23 (today) | Uses group existence rather than installation identity. Confirmed non-exploitable but may cause incorrect permission behavior. |
| [#3878](https://github.com/nanocoai/nanoclaw/pull/3878) — Ping-agent cleanup race | 2026-09-23 (today) | Container left running after folder deletion. Open PR, needs review. |
| [#3646](https://github.com/nanocoai/nanoclaw/pull/3646) — Env overrides for sweep timers | 2026-08-29 (26 days) | Operators cannot adjust `ABSOLUTE_CEILING_MS`/`CLAIM_STUCK_MS` for slow backends. Open PR awaiting merge. |
| [#3503](https://github.com/nanocoai/nanoclaw/pull/3503) — Apple Container support | 2026-08-24 (31 days) | macOS-specific feature with no Docker dependency. Stalled in review. |
| [#3494](https://github.com/nanocoai/nanoclaw/pull/3494) — Remote Agent phone pairing | 2026-08-23 (32 days) | Niche gbr/1 protocol adapter. No maintainer response in over a month. |
| [#12](https://github.com/nanocoai/nanoclaw/pull/12) — (was open 7 months) | 2026-02-01 | ✅ Now merged, but highlights slow review cycles for older PRs. |

**Overall project health:** Active and improving. The v2.4.0 release addresses several critical update-system bugs, and the gateway architecture refactor is a significant structural improvement. The main risk area is the backlog of medium-priority PRs (#3646, #3503, #3494) that have been open for 3–4 weeks without merged status.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest
**Date:** 2026-09-24

## 1. Today's Overview
NullClaw exhibited high development activity yesterday with **21 Pull Requests** updated and **17 Issues** active, while **no new releases** were published. The project is currently in a critical stabilization phase, focusing heavily on memory management, thread stack sizes, and channel reliability (Telegram, Discord). Community interest shifts from basic connectivity to **advanced agent capabilities** (tool approval, subagents, native tool streaming) and **low-resource optimization**. The codebase is showing signs of maturing, with a significant push to decouple native tool execution from prompt-injection methods and improve resource efficiency.

## 2. Releases
**No new releases** were identified in the last 24 hours. Users should remain on the latest stable version, though several critical bug fixes (regarding stack overflows and scheduler persistence) are currently pending in open PRs.

## 3. Project Progress
Eight PRs were merged/closed, indicating steady progress on infrastructure and feature work:

*   **Memory Subsystem Configuration:** [PR #986](https://github.com/nullclaw/nullclaw/pull/986) (GEN-548) merged to make the SQLite memory database path configurable (`memory.database_path`), supporting read-only workspace deployments.
*   **MCP Reliability:** [PR #996](https://github.com/nullclaw/nullclaw/pull/996) merged to fix indefinite hangs in `nullclaw agent` by bounding stdio MCP response waits and ensuring process group cleanup on timeout.
*   **Provider Expansion:** [PR #981](https://github.com/nullclaw/nullclaw/pull/981) merged to add support for the **xAI Grok CLI** as an optional provider, following the pattern of other CLI-based providers.
*   **Memory Recall Control:** [PR #979](https://github.com/nullclaw/nullclaw/pull/979) merged to introduce configurable auto-recall parameters (`auto_recall`, `recall_limit`, `max_context_bytes`), allowing users to disable or tune FTS5/BM25 memory injection.
*   **Structured Streaming:** [PR #965](https://github.com/nullclaw/nullclaw/pull/965) closed as part of a broader effort to support structured streaming tool-calls in the SSE parser, a prerequisite for more reliable agentic workflows.
*   **Discord Stability:** [PR #978](https://github.com/nullclaw/nullclaw/pull/978) merged to fix a stack overflow in the Discord typing-indicator thread by moving it to a heavier runtime stack.

## 4. Community Hot Topics
Community engagement is centered on **resource constraints** and **core stability**:

1.  **[Issue #871](https://github.com/nullclaw/nullclaw/issues/871): Web Search on Low-Resource Devices (8 comments)**
    *   **Analysis:** Users find current search options (Brave API) impractical for cheap hardware due to cost/complexity. This drives demand for lightweight, keyless search backends.
2.  **[Issue #972](https://github.com/nullclaw/nullclaw/issues/972): Telegram Channel Idle Death (5 comments, 1 👍)**
    *   **Analysis:** A critical reliability issue where channels stop responding after idle periods. This erodes user trust in the gateway's persistence.
3.  **[Issue #915](https://github.com/nullclaw/nullclaw/issues/915): Scheduler Unauthorized (5 comments, 1 👍)**
    *   **Analysis:** Repeated reports of scheduler failure due to token persistence issues. This is a "must-fix" for any user relying on cron jobs.
4.  **[Issue #767](https://github.com/nullclaw/nullclaw/issues/767): Native Anthropic API Support (1 comment, but high strategic value)**
    *   **Analysis:** Users are seeking direct Anthropic API integration (not via OpenRouter) for lower latency and reduced costs. Documentation for this is currently in draft.

## 5. Bugs & Stability
This period is marked by **severe stability issues** related to memory management and resource leaks.

| Severity | Issue | Description | Fix Status |
| :--- | :--- | :--- | :--- |
| **Critical** | [#976](https://github.com/nullclaw/nullclaw/issues/976) | **SIGSEGV on aarch64:** Inbound Telegram messages cause stack overflow (512KB) in worker threads. Crashes on every message. | **Fix Ready:** [PR #985](https://github.com/nullclaw/nullclaw/pull/985) increases agent turn stack to 16 MiB. *Awaiting merge.* |
| **High** | [#972](https://github.com/nullclaw/nullclaw/issues/972) | **Telegram/Matrix Idle Hang:** Channels die after idle night; backend alive but channel dead. Supervisor fails to restart polling threads. | **Fix Ready:** [PR #984](https://github.com/nullclaw/nullclaw/pull/984) implements age-out logic for dead polling threads. *Awaiting merge.* |
| **High** | [#870](https://github.com/nullclaw/nullclaw/issues/870) | **WSL2 100% CPU:** `accept4` busy loop in gateway on WSL2. Functional but resource-intensive. | **Open:** No specific fix PR linked yet. |
| **Medium** | [#941](https://github.com/nullclaw/nullclaw/issues/941) | **Cron Use-After-Free:** One-shot cron jobs fail silently due to `OutboundMessage.channel` memory error. | **Fix Ready:** [PR #954](https://github.com/nullclaw/nullclaw/pull/954) fixes the memory management error. *Awaiting merge.* |
| **Medium** | [#839](https://github.com/nullclaw/nullclaw/issues/839) | **Scheduler Auth Failure:** Paired tokens not persisted to disk, causing `readPairedToken()` to fail. | **Fix Ready:** [PR #959](https://github.com/nullclaw/nullclaw/pull/959) & [PR #980](https://github.com/nullclaw/nullclaw/pull/980) (merged?) address persistence. *Note: PR #980 is listed as closed/merged in upstream data, but verify #959 status.* |
| **Low** | [#932](https://github.com/nullclaw/nullclaw/issues/932) | **Docs Build Fail:** Zig 0.15.2 specified in docs, but `std.Io.Dir` requires 0.16.0. | **Open:** Documentation fix needed. |
| **Low** | [#865](https://github.com/nullclaw/nullclaw/issues/865) | **CLI Garbage:** Arrow keys output control characters in REPL. | **Fix Ready:** [PR #970](https://github.com/nullclaw/nullclaw/pull/970) adds a POSIX raw-mode line editor. *Awaiting merge.* |

## 6. Feature Requests & Roadmap Signals
*   **Subagent Architecture ([#190](https://github.com/nullclaw/nullclaw/issues/190)):** Users are asking for multi-agent spawning with different providers. This suggests a move toward a "swarm" or "orchestrator" architecture in future versions.
*   **Multimodal Vision ([#624](https://github.com/nullclaw/nullclaw/issues/624)):** Direct image/file sending to the agent with automatic base64 encoding is a high-priority request to enable vision capabilities.
*   **Structured Approval Flow ([#969](https://github.com/nullclaw/nullclaw/pull/969)):** Implementation of `approval_request` / `approval_response` for tools (like shell). This is a key safety feature for autonomous agents. *Currently Open.*
*   **Native Tool Streaming ([#971](https://github.com/nullclaw/nullclaw/pull/971)):** Decoupling native tool calls from the streaming path to avoid prompt-injection fallbacks. *Currently Open.*
*   **Loop Hygiene ([#987](https://github.com/nullclaw/nullclaw/pull/987)):** Features to compress tool outputs and cache system prompts for long-running local agents. *Currently Open.*

## 7. User Feedback Summary
*   **Dissatisfaction:** High frustration with **resource usage on low-end hardware** (Issues #871, #870) and **channel reliability** (Issues #972, #870). Users expect NullClaw to be lightweight but are encountering heavy resource consumption or crashes.
*   **Confusion:** Difficulty setting up **scheduler/cron** tools due to auth persistence bugs (#839, #915).
*   **Requests:** Strong demand for **first-party support** for common providers (Anthropic #767, Grok #981 [done]) and lightweight search backends (DuckDuckGo #871, #623).
*   **Satisfaction:** The Zig-based core is praised for its potential, but the current release stability is a barrier to recommendation for production use.

## 8. Backlog Watch
*   **PR #971 (Native Tool Streaming):** Critical for performance and token efficiency. Needs review as it affects the core agent loop.
*   **PR #985 (16 MiB Stack):** Critical fix for aarch64 crashes. Should be expedited for merge.
*   **PR #970 (CLI Line Editor):** Low risk, high QoL improvement for developers. Good candidate for quick merge.
*   **Issue #817 (WeChat QR):** Documentation and hardening for iLink Bot auth ([PR #963](https://github.com/nullclaw/nullclaw/pull/963)) is open. Essential for the Chinese market presence.
*   **Issue #495 (CloudFlare/Nginx Tunnels):** No PR linked, but high demand for inbound connection management without exposing public IPs.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest: 2026-09-24**

**1. Today's Overview**
The IronClaw project currently exhibits low activity with no issues or new releases processed in the last 24 hours. However, the repository is actively maintaining its development cycle through two newly opened Pull Requests focused on versioning and documentation. This indicates a healthy, albeit quiet, maintenance phase as the team prepares for the next milestone.

**2. Releases**
No new releases were published today. The project is currently in a release candidate (RC) phase.

**3. Project Progress**
*   **PR #8110 (Open):** A chore release PR has been initiated to cut version `1.4.1-rc.2`. This update focuses on promoting the release branch and refreshing dependencies (specifically `wasmtime 47.0.4` and `rustls 0.23.45`) based on current advisory databases.
*   **PR #8109 (Open):** Documentation improvements are underway to clarify the architecture of scoped virtual skill roots (`/skills`, `/system/skills`, and optional `/tenant-shared/skills`), distinguishing runtime discovery from legacy disk imports.

**4. Community Hot Topics**
*   **[Open] Release Candidate 1.4.1-rc.2 Preparation**
    *   **URL:** [nearai/ironclaw PR #8110](https://github.com/nearai/ironclaw/pull/8110)
    *   **Analysis:** This is the primary activity driver today. The maintainers are finalizing the `1.4.1` release candidate, specifically addressing Google extension OAuth readiness fixes and dependency security updates. The underlying need is to stabilize the platform for enterprise integrations and ensure compatibility with the latest Rust toolchain security patches.
*   **[Open] Documentation Clarification: Scoped Virtual Skill Roots**
    *   **URL:** [nearai/ironclaw PR #8109](https://github.com/nearai/ironclaw/pull/8109)
    *   **Analysis:** This PR addresses user confusion regarding how trust and discovery work with different skill root paths. The underlying need is to improve developer onboarding and reduce support friction for users trying to understand the new directory structure.

**5. Bugs & Stability**
No new bugs or stability issues were reported or fixed in the last 24 hours.

**6. Feature Requests & Roadmap Signals**
*   **Skill Architecture Refinement:** The push to clarify "scoped virtual skill roots" suggests a roadmap focus on better isolation and multi-tenancy support. This aligns with the project's goal of providing a robust, secure environment for AI agents to operate within defined boundaries.

**7. User Feedback Summary**
No direct user feedback was captured in the activity logs for this period. The focus remains on internal refinement and documentation.

**8. Backlog Watch**
*   **Release Candidate 1.4.1:** The release candidate cycle is currently active. While no issues are open, the release depends on the successful merging of PR #8110 and the stabilization of the dependency updates (wasmtime/rustls).

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

**LobsterAI Project Digest**
**Date:** 2026-09-24
**Project:** netease-youdao/LobsterAI

---

### 1. Today's Overview
LobsterAI demonstrates a healthy, active development cycle with a balanced mix of feature implementation, bug fixes, and dependency management. The project recently pushed a substantial release (v2026.9.23) incorporating a new decision-making model and significant UI improvements for real-time collaboration. While open issues remain dormant, the recent surge in pull request activity—particularly in the OpenClaw integration and renderer modules—indicates a robust push toward stability and feature expansion.

### 2. Releases
**Version 2026.9.23** (Released 2026-09-23)
*   **Major Features:**
    *   **Jev Decision Model:** Introduction of an experimental BYO-key decision model service, including a dedicated MCP tool handler and settings UI.
    *   **Real-time Collaboration Polish:** Significant UI updates to "cowork" sessions, now streamlining live per-step turn progress and diff stats. The rendering logic was unified to handle complex activity steps (thinking, search, media, etc.) more consistently.
*   **Core Fixes:**
    *   **OpenClaw Configuration:** Fixed a critical delivery issue where configuration updates were not being properly applied before task execution, ensuring new tasks use the latest settings.
    *   **Plugin Stability:** Implemented a fallback strategy for OpenClaw plugins that fail to load, ensuring the gateway can start and preserve basic sessions even if a specific plugin is broken.
    *   **macOS Shortcuts:** Corrected modifier key handling for shortcuts to work correctly on macOS platforms.
*   **Deprecations/Updates:**
    *   Updated the DSH runtime to version 0.1.5 rc.3.
    *   Bumped internal dependencies (e.g., `@sinclair/typebox`).

### 3. Project Progress
*   **Merged/Closed PRs:** 8 PRs were closed (merged or auto-closed) today, while 2 remained open.
*   **Feature Development:**
    *   **Collaboration:** The `feat(cowork)` series focused on improving the "turn progress" visualization. This includes unifying activity step rendering and ensuring timing accuracy (handling paged-in sessions) for a smoother user experience during multi-user sessions.
    *   **Decision Models:** The `feat(decision-model)` PR integrated a new experimental decision model tool, expanding the agent's capability to handle complex logic via external BYO-key services.
*   **Stability & Infrastructure:**
    *   Multiple PRs focused on "OpenClaw" integration fixes, specifically addressing configuration hot-reloading and plugin crash handling.
    *   The project continued routine maintenance, including dependency bumps and documentation updates.

### 4. Community Hot Topics
*   **OpenClaw Config Hot-Reload:** There is an active underlying need for robust configuration management. The discussion around [PR #2755](https://github.com/netease-youdao/LobsterAI/pull/2755) highlights a scenario where configuration changes (proxy or model settings) were not propagating to running tasks until a restart. The fix implements strict versioning checks (`config.apply`) to ensure consistency.
*   **Plugin Crash Resilience:** Users require the application to remain operational even when specific plugins fail. PR [#2754](https://github.com/netease-youdao/LobsterAI/pull/2754) addresses a user pain point where a plugin error previously caused the entire session/gateway to crash, preventing any health model from functioning.

### 5. Bugs & Stability
*   **Severity: High (Fixed)**
    *   **OpenClaw Delivery Failure:** Previously, changing configuration settings would not take effect for active tasks, leading to inconsistent behavior. **Status:** Fixed in PR #2755.
*   **Severity: Medium (Fixed)**
    *   **Plugin Startup Failure:** If a plugin failed validation during startup, the entire application would hang. **Status:** Fixed in PR #2754.
*   **Severity: Low (Fixed)**
    *   **macOS Shortcut Incompatibility:** Shortcuts using `Ctrl` were not translating to `Cmd` correctly on macOS. **Status:** Fixed in PR #980.

### 6. Feature Requests & Roadmap Signals
*   **Subscription Trial Visibility:** PR #2751 broadens the visibility of the "one cent trial" campaign to anonymous users and all existing subscribers, suggesting a strategic push to increase user acquisition and conversion rates.
*   **Experimental Features UI:** The introduction of the Jev decision model indicates a roadmap direction toward more customizable agent logic, likely targeting advanced power users who want to bring their own external reasoning models.

### 7. User Feedback Summary
*   **Pain Point:** Users working in shared "cowork" sessions reported that turn progress was hard to track and rendering was inconsistent across different activity types.
*   **Feedback:** The response was a comprehensive UI overhaul (PRs #2756, #2750) to provide granular, real-time diffs and unified step visualization.
*   **Pain Point:** Users managing complex workflows via OpenClaw needed confidence that configuration changes would actually apply.
*   **Feedback:** The project implemented strict configuration versioning to eliminate "stale config" bugs.

### 8. Backlog Watch
*   **Long-term Fixes:** There is one stale PR (#980) regarding macOS shortcuts that was created in March and finally addressed today. This suggests a backlog of older bug reports that may have been deprioritized but are now being systematically cleared.
*   **Open Dependencies:** PR #2668 (bumping `@sinclair/typebox`) remains open, likely waiting for final approval or CI checks, though it is a minor version bump.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest**
**Date:** 2026-09-24

### 1. Today's Overview
The Moltis project experienced a period of dormancy on 2026-09-24, with no new issues or releases generated in the last 24 hours. Activity was limited to a single Pull Request update, indicating a maintenance or stabilization phase rather than active feature development. Overall, the project health remains stable, with no immediate blockers or urgent community concerns reported.

### 2. Releases
**No new releases** were published in the last 24 hours.

### 3. Project Progress
**Pull Requests Updated:** 1
*   **PR #1272** (Open): The PR titled *feat(sandbox): per-agent mounts, run_as and a forced sandbox* was updated today. This update advances the implementation of granular sandbox controls, moving closer to the stabilization of container isolation features.

### 4. Community Hot Topics
**Most Active Item:**
*   **PR #1272: feat(sandbox): per-agent mounts, run_as and a forced sandbox**
    *   **Status:** Open
    *   **Activity:** Last updated 2026-09-23
    *   **Summary:** This is currently the sole focus of project activity. The proposal introduces three new configuration knobs within the `[sandbox]` block of agent presets to enhance container security and flexibility.
    *   **Analysis:** The underlying need is for **multi-tenancy and security isolation**. By allowing specific agents to have unique `mounts`, custom `uid:gid` execution contexts, and mandatory sandbox enforcement (`force`), the project addresses the requirement for stricter environment control without affecting the global system configuration.

### 5. Bugs & Stability
**Status:** No bugs, crashes, or regressions were reported in the last 24 hours.

### 6. Feature Requests & Roadmap Signals
*   **Granular Sandbox Controls:** The update to PR #1272 signals a roadmap focus on **fine-grained resource management**. The introduction of `sandbox.force` suggests a push towards "least privilege" architectures, ensuring that specific agents cannot bypass containerization.

### 7. User Feedback Summary
**Status:** No direct user feedback or issue reports were captured in the last 24 hours.

### 8. Backlog Watch
**No urgent backlog items** requiring immediate maintainer attention were identified in the provided data.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest
**Date:** 2026-09-24  
**Project:** CoPaw (agentscope-ai/CoPaw)  
**Status:** High Activity / Bug Fixing & UI Refinement Phase

### 1. Today's Overview
CoPaw demonstrates robust project health with significant community engagement. The repository sees high activity, with 34 open issues and 15 active pull requests, indicating a vibrant ecosystem. The project is currently focused on stabilizing the v2.2.x release cycle through a series of targeted bug fixes, particularly regarding context management and console UI interactions, while simultaneously advancing architectural improvements for scalability and SDK usability.

### 2. Releases
**None.** No new major or minor releases were published in the last 24 hours.

### 3. Project Progress
**Closed PRs (8):**
*   **Infrastructure & Testing:** Unit test coverage was significantly increased by +3.28 percentage points (from 70.51% to 73.79%) with 2,720 new test cases added. HTML2text was replaced with MIT-licensed markdownify to improve dependency compliance.
*   **Console UX:** The sidebar was refined to be compact and movable, and conversation grouping was optimized. Settings workflows and avatars were also persisted to improve user experience.
*   **Core Logic:** Empty assistant text blocks (which caused 400 errors in Ark provider) were dropped. A fix was applied to distinguish model errors from transport failures to prevent masking real issues.
*   **Website:** Documentation was updated to include download provenance and an Apache License 2.0 usage policy.

**Open PRs (15):**
*   **Context Management:** PRs are actively addressing "scroll eviction" bugs that drop user turns during tool-heavy tasks.
*   **Architecture:** The PawApp SDK and control plane are being redesigned to expose domain work safely.
*   **Memory:** A new OpenViking memory plugin is being integrated.

### 4. Community Hot Topics
**Most Discussed Issue: Multi-tenant Hub & Future Roadmap**
*   **Issue #7318 (32 comments):** [Discussion] QwenPaw Hub, the multi-tenant edition, released in 2.2.0: what should we build next?
    *   **Analysis:** The community is actively debating the post-launch direction for the new Hub feature. This indicates high user interest in team-oriented deployments and validates the product pivot from personal assistant to multi-tenant platform.

**Other Active Discussions:**
*   **Issue #7484 (5 comments):** [Feature] A2A protocol support timeline. Users are inquiring when Agent-to-Agent (A2A) will be officially supported, noting that MCP is live but A2A is missing from the unified driver mechanism.

### 5. Bugs & Stability
**Critical Context & Memory Leaks:**
*   **Issue #7853 (8 comments):** **[Bug] ToolResultPruner skips media blocks.** The pruner ignores `type="data"` blocks (base64 images), causing context overflow. *Status: Open.*
*   **Issue #7857 (3 comments):** **[Bug] ACP shutdown fallback leaks event loop.** Synchronous fallbacks skip session cleanup. *Status: Open.*
*   **Issue #7576 (8 comments):** **[Bug] Hardcoded context size.** RetryChatModel forces 32k tokens, causing `CONTEXT_UNFIT` errors for smaller models. *Status: Closed (Likely fixed in recent commits).*

**Console & UI Regression:**
*   **Issue #7948 (2 comments):** **[Bug] Poor web console design breaks input.** Input fields are malfunctioning in the web interface. *Status: Open.*
*   **Issue #7947 (3 comments):** **[Bug] `send_file_to_user` card not rendering.** Files are sent but invisible in the Console. *Status: Closed (Fix likely merged).*

### 6. Feature Requests & Roadmap Signals
*   **A2A Protocol Support (Issue #7484):** Users are explicitly asking for the A2A protocol to be added to the unified Driver mechanism (currently only MCP is supported). This is a strong roadmap signal for the next major version.
*   **Agent-Autonomous Context Management (Issue #7733):** Users want agents to have control over context eviction thresholds rather than a purely token-based system, suggesting a move towards "smarter" memory management.
*   **Multi-Model Configuration (Issue #1010):** A recurring request to allow different LLMs for different tasks to optimize cost and capability.

### 7. User Feedback Summary
The user base is experiencing friction with the **v2.2.0/2.2.2 release cycle**. Feedback highlights a tension between the new **Multi-tenant Hub** (exciting new direction) and **stability regressions** (context overflow, UI bugs). Users are particularly vocal about the **Console UI** (sidebar, settings, input fields) needing refinement. The feedback indicates a mature community that is comfortable with the backend complexity but demands a polished, stable frontend.

### 8. Backlog Watch
*   **Issue #7318:** While active, this serves as a "Request for Ideas" rather than a bug. It requires community consensus on features, which takes time to crystallize.
*   **Issue #7484 (A2A Support):** This feature request has been open for a while and is currently unanswered regarding a timeline, potentially blocking enterprise users waiting for the protocol.
*   **Issue #3037 (Closed but referenced):** A long-standing bug regarding Feishu filter configs that is now closed, but similar Feishu WebSocket stability issues (#2335) remain open from early 2026, suggesting potential lingering connectivity stability problems.

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