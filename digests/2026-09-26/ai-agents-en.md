# OpenClaw Ecosystem Digest 2026-09-26

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-25 22:57 UTC

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-09-26

## 1. Today's Overview
NanoClaw maintains a high velocity of core maintenance and hardening, driven primarily by core contributors addressing edge cases in agent runners, gateway setup scripts, and container lifecycles following the recent v2.4.0 release. In the last 24 hours, activity focused heavily on pull requests (50 updated PRs) alongside minor bug reports regarding installation flows and CLI scopes. Project health appears robust, with active iterative hardening targeting container sweeps, provider-specific constraints (Claude and OpenCode/Iron Proxy), and CI workflows.

---

## 2. Releases
*No new releases today (v2.4.0 remains the latest version).*

---

## 3. Project Progress
While the vast majority of the 50 updated PRs remain open for review, notable activity centered on refining setup diagnostics, agent runner durability, and CI hygiene:
- **Setup & Gateways:** Improvements to OpenCode error logging ([PR #3905](https://github.com/nanocoai/nanoclaw/pull/3905)) and Iron Proxy local-endpoint prompt validations ([PR #3919](https://github.com/nanocoai/nanoclaw/pull/3919)).
- **Agent Runner & Providers:** Seeded Claude's default output style to bypass a prompt caching regression caused by the `Concise` profile ([PR #3917](https://github.com/nanocoai/nanoclaw/pull/3917) — *Closed/Merged*), and added heartbeat protection during long content block streaming ([PR #3893](https://github.com/nanocoai/nanoclaw/pull/393)).
- **Repository Maintenance:** Enforced mandatory template compliance and release note verification for incoming pull requests ([PR #3914](https://github.com/nanocoai/nanoclaw/pull/3914), [PR #3886](https://github.com/nanocoai/nanoclaw/pull/3886)).

---

## 4. Community Hot Topics
Community discussion and PR interactions today focused heavily on installation resiliency, self-updating flows, and environment boundaries:
- [PR #3446: Auto-drop automated senders in the unknown-sender gate](https://github.com/nanocoai/nanoclaw/pull/3446) – Addresses bot and webhook traffic triggering infinite approval loops.
- [PR #3302: Correct default OneCLI gateway bind address](https://github.com/nanocoai/nanoclaw/pull/3302) – Resolves networking gaps between docker-bridge configurations and client-facing API hosts.
- [Issue #3906: Update-nanoclaw controller archive misses setup/](https://github.com/nanocoai/nanoclaw/issues/3906) – Highlights synchronization issues when updating installations via extraction scripts.

---

## 5. Bugs & Stability
Five new issues were reported, primarily focusing on setup regressions, CLI scope bugs, and container hygiene:
1. **[Issue #3906](https://github.com/nanocoai/nanoclaw/issues/3906) — `/update-nanoclaw` Controller Archive Missing Dependencies:** Setup/stage-rooted commands execute before required dependencies exist or are extracted. *(Fix pending via [PR #3913](https://github.com/nanocoai/nanoclaw/pull/3913))*
2. **[Issue #3907](https://github.com/nanocoai/nanoclaw/issues/3907) — Gateway Detection Fails on Workspace Warnings:** Nested `pnpm` outputs workspace warnings to stdout, breaking gateway health checks. *(Fix pending via [PR #3910](https://github.com/nanocoai/nanoclaw/pull/3910))*
3. **[Issue #3909](https://github.com/nanocoai/nanoclaw/issues/3909) — Session Container Spawn on Deleted Groups:** Race condition where `spawnContainer` reads agent groups prior to spawn checks without guarding against mid-spawn deletions.
4. **[Issue #3911](https://github.com/nanocoai/nanoclaw/issues/3911) — Global CLI Scope Group Restart Targeting Bug:** Running `ncl groups restart --id <other group>` from an agent with global scope inadvertently restarts the *caller* instead of the requested target.
5. **[Issue #3916](https://github.com/nanocoai/nanoclaw/issues/3916) — Host Logs Lack Rotation and Timestamps:** Multi-week logs (`nanoclaw.log`) swell significantly without rotation or explicit dates, complicating incident triage.

---

## 6. Feature Requests & Roadmap Signals
- **Pluggable Session Wakes ([PR #3903](https://github.com/nanocoai/nanoclaw/pull/3903)):** Introduces a registration point for due-session wakes, paving the way for concurrency caps, task priorities, and quiet hours.
- **Turn-Lifecycle Hook Registry ([PR #3904](https://github.com/nanocoai/nanoclaw/pull/3904)):** Exposes hooks for the poll loop to allow custom per-intent or per-turn behaviors without altering core engine files.
- **Global Environment Overrides for Sweep Timers ([PR #3646](https://github.com/nanocoai/nanoclaw/pull/3646)):** Allows operators to configure `ABSOLUTE_CEILING_MS` and `CLAIM_STUCK_MS` for slower local model backends.

---

## 7. User Feedback Summary
Operators managing multi-week or edge-deployments are running into operational visibility friction, specifically around unrotated log files inflating disk space and obscuring live incidents ([Issue #3916](https://github.com/nanocoai/nanoclaw/issues/3916)). Additionally, users deploying local model backends (such as Iron Proxy or local OpenCode setups) encounter friction with hard-coded timeouts and rigid endpoint prompts.

---

## 8. Backlog Watch
- **[Issue #3909 (Session container started for deleted agent groups)](https://github.com/nanocoai/nanoclaw/issues/3909):** Requires maintainer triage to handle atomicity between group state validation and container execution startup sequences.
- **[Issue #3916 (Host logs never rotate)](https://github.com/nanocoai/nanoclaw/issues/3916):** Needs a robust logging rotation policy implementation to prevent uncontrolled log file growth on long-running macOS/Linux production nodes.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest for September 26, 2026

## Today's Overview
NullClaw is an open-source project focused on AI agent development. As of September 25, 2026, there were no new updates to the issues or pull requests. The PR #1009 was opened and closed by the same author with a summary mentioning a fix for a medium/high-risk shell command issue that had been present since PR #900.

## Releases
N/A (New versions have not been released as of September 25, 2026).

## Project Progress
Today, there are 1 open PR #1009 which has been merged and closed. It fixes a medium/high-risk shell command issue that had been present in PR #900.

## Community Hot Topics
The most active Issues and PRs today are linked below with their respective comments and reactions:
[Issue Link](https://github.com/nullclaw/nullclaw/issues/3)
[PR Link](https://github.com/nullclaw/nullclaw/pull/1009)

Underlying Needs Analysis: The issues mentioned in both the Issues and PR highlight the need for better control over medium/high-risk commands when they come from `/bash`, `/exec`, or other sources.

## Bugs & Stability
No bugs, crashes, or regressions reported today. However, it is important to note that PR #1009 fixed a bug related to the `approval_request` state, indicating potential future stability concerns.

## Feature Requests & Roadmap Signals
There are no user-requested features mentioned in today's updates. However, it is worth noting that the current roadmap does not include any significant feature updates for the next release.

## User Feedback Summary
Real user pain points revolve around the medium/high-risk commands being handled incorrectly, especially when coming from `/bash`, `/exec`, or other sources. Use cases include applications that require precise control over system permissions and security settings.

## Backlog Watch
There are several long-unanswered issues and PRs that need maintenance attention. These include issues related to integration with different operating systems, handling of low-level system calls, and maintaining the security and privacy of the project.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

Here is the project digest for **LobsterAI** (netease-youdao/LobsterAI) for **2026-09-26**, based on recent GitHub activity.

---

### 1. Today's Overview
LobsterAI experienced a focused day of development activity primarily centered around core orchestration, error-handling refinements, and OpenClaw integration updates. While no new releases were published and issue creation remained quiet, 10 pull requests saw recent updates spanning bug fixes, UI enhancements, and provider expansions. The activity level indicates a strong emphasis on runtime stability, hot-reloading capabilities, and polishing the user experience in Cowork and scheduled tasks.

### 2. Releases
*No new releases published during this period.*

### 3. Project Progress
Recent pull requests show significant progress in refining runtime execution, UI components, and gateway behavior:
*   **Model Call & Error Handling:** 
    *   [PR #2763](https://github.com/netease-youdao/LobsterAI/pull/2763) [CLOSED]: Fixed an issue where whole-turn replays collided with already-started model calls, ensuring real provider errors are surfaced properly instead of generic failures.
*   **Gateway & Policy Management:**
    *   [PR #2764](https://github.com/netease-youdao/LobsterAI/pull/2764) [OPEN]: Enabled hot-reloading for live gateway policies (`gateway.tools`, `gateway.trustedProxies`, `gateway.allowRealIpFallback`) without requiring full gateway restarts.
    *   [PR #2765](https://github.com/netease-youdao/LobsterAI/pull/2765) [OPEN]: Improved preservation of accepted work through compaction and gateway restarts while lowering pinned-runtime startup overhead.
*   **Provider Ecosystem:**
    *   [PR #2766](https://github.com/netease-youdao/LobsterAI/pull/2766) [OPEN]: Added [Requesty](https://requesty.ai) as a built-in model provider via the shared provider registry.
*   **UI & Cowork Experience:**
    *   [PR #2758](https://github.com/netease-youdao/LobsterAI/pull/2758) [OPEN]: Integrated support to display and explicitly refresh native OpenClaw progress cards above the Cowork composer.

### 4. Community Hot Topics
While comment counts across the sampled items were minimal, community and contributor focus converged on integration resilience and UX enhancements:
*   [PR #2758 (Display and refresh native OpenClaw progress cards)](https://github.com/netease-youdao/LobsterAI/pull/2758): Highlights the ongoing user need for transparent, real-time feedback during multi-step agent workflows.
*   [PR #2766 (Requesty as a model provider)](https://github.com/netease-Youdao/LobsterAI/pull/2766): Reflects the demand for flexible LLM gateway integration, allowing users to leverage unified multi-model APIs effortlessly.

### 5. Bugs & Stability
Several bug reports and fixes were advanced, addressing state management and configuration discrepancies:
*   **Scheduled Tasks Channel Bug ([PR #1547](https://github.com/netease-youdao/LobsterAI/pull/1547)):** Addressed a UI bug where changing a task's notification channel back to "none" failed to persist correctly upon re-editing.
*   **Scheduled Tasks Gateway Validation ([PR #1550](https://github.com/netease-youdao/LobsterAI/pull/1550)):** Fixed a runtime validation error where session-created tasks with "none" delivery mode incorrectly passed channel/to fields to the gateway, causing execution failures.
*   **Cowork Global Search Scope ([PR #1634](https://github.com/netease-youdao/LobsterAI/pull/1634)):** Addressed a bug where global search was improperly restricted by the current agent's ID scope rather than querying sessions globally.

### 6. Feature Requests & Roadmap Signals
*   **Dynamic Agent Branding ([PR #1660](https://github.com/netease-youdao/LobsterAI/pull/1660)):** Signals a shift toward deeper personalization, dynamically swapping out default welcome text for the active non-main agent's name and description.
*   **Refined Model Selectors ([PR #1628](https://github.com/netease-youdao/LobsterAI/pull/1628)):** Points to continuous UI maturation, introducing provider icons, clear image-capability labels, and adaptive dropdowns.

### 7. User Feedback Summary
*   **Pain Points:** Users experienced friction when toggling notification settings on scheduled tasks and encountered unexpected search limitations when attempting to query tasks globally across different agents.
*   **Use Cases:** Heavy reliance on Cowork mode for assistant delegation, scheduled task triggers routing to various IM channels, and multi-provider LLM consumption.

### 8. Backlog Watch
A cluster of stale pull requests dating back to April 2026—such as [PR #1547](https://github.com/netease-youdao/LobsterAI/pull/1547), [PR #1550](https://github.com/netease-Youdao/LobsterAI/pull/1550), [PR #1628](https://github.com/netease-Youdao/LobsterAI/pull/1628), [PR #1634](https://github.com/netease-Youdao/LobsterAI/pull/1634), and [PR #1660](https://github.com/netease-Youdao/LobsterAI/pull/1660)—remain open. Maintainer attention is needed to review, test, and merge these long-standing fixes and UI improvements to keep the renderer and scheduled task logic fully aligned with current master branches.

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



# CoPaw Project Digest — 2026-09-26

## 1. Today's Overview

CoPaw is experiencing **high development velocity** with 24 items updated in the last 24 hours (11 issues + 13 PRs), all still open — indicating a busy triage and review cycle rather than rapid merge turnover. No new releases were published today, suggesting the team is still integrating or reviewing the incoming changes. Activity is concentrated around bug fixes and UX improvements, with several first-time contributors submitting targeted patches. The project appears healthy with consistent community engagement.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

**No PRs were merged or closed today.** All 13 PRs remain open and under review:

- **PR #7989** — Fixes Markdown table scrolling in the console (first-time contributor)
- **PR #7988** — Adds binary-file filtering to `grep_search` tool (first-time contributor)
- **PR #7987** — Adds `browser.ignore_default_args` to allow overriding Playwright defaults (first-time contributor)
- **PR #7986** — Skips cloud context-window pattern table for custom/local providers
- **PR #7985** — Adds plural i18n support for code-snippet chip labels
- **PR #7983** — Fixes QQ gateway replayed-message duplicate processing
- **PR #7982** — Relays Gemini `thought_signature` in the native provider
- **PR #7956** — Optimizes console settings workflows and sidebar interactions
- **PR #7923** — Adds age-out retention for `tool_result` blocks to control database growth
- **PR #7542** — Adds scroll-back message pagination for compacted chats
- **PR #7357** — Adds tool-call visibility toggle in the chat UI
- **PR #7359** — Exposes per-media inline caps at the provider level
- **PR #7825** — Fixes numeric DOW step/range expansion in cron jobs

## 4. Community Hot Topics

| Issue/PR | Author | Comments | Topic |
|---|---|---|---|
| [#7628](https://github.com/agentscope-ai/CoPaw/issues/7628) | elain0205 | 7 | Context compaction budget mismatch |
| [#7884](https://github.com/agentscope-ai/CoPaw/issues/7884) | happieme | 5 | Historical chat not fully loadable after compaction |
| [#7957](https://github.com/agentscope-ai/CoPaw/issues/7957) | dylanleesky | 3 | Disable premade models/channels |
| [#7948](https://github.com/agentscope-ai/CoPaw/issues/7948) | BorisPolonsky | 3 | Web console input broken by layout |
| [#7924](https://github.com/agentscope-ai/CoPaw/issues/7924) | liunux4odoo | 2 | Markdown tables overflowing console |
| [#7980](https://github.com/agentscope-ai/CoPaw/issues/7980) | djj532 | 2 | `grep_search` poisons session state via SQLite WAL |
| [#7984](https://github.com/agentscope-ai/CoPaw/issues/7984) | One-sixth | 2 | Browser profile extensions not loading |
| [#7946](https://github.com/agentscope-ai/CoPaw/issues/7946) | yaozy2020 | 2 | QQ gateway event replay causing duplicates |

**Analysis:** The two highest-comment issues (#7628, #7884) both relate to **context compaction and history persistence** — a recurring theme suggesting users are hitting limits with long-running conversations. The QQ replay bug (#7946) and `grep_search` WAL poisoning (#7980) reflect growing pains as CoPaw scales to more integrations and larger workspaces.

## 5. Bugs & Stability

Ranked by severity:

1. **🔴 Critical — Session state poisoning via `grep_search`** [#7980](https://github.com/agentscope-ai/CoPaw/issues/7980) — Binary SQLite artifacts entered into tool results cause unrecoverable doom loops. **Fix PR: #7988** (open).
2. **🔴 Critical — Context compaction exceeds provider budget** [#7628](https://github.com/agentscope-ai/CoPaw/issues/7628) — Compaction trigger uses live context only, not the full request budget, causing provider-side failures. **No fix PR yet.**
3. **🟠 High — QQ gateway replay causes duplicate messages** [#7946](https://github.com/agentscope-ai/CoPaw/issues/7946) — Session resume replays cause duplicate agent turns. **Fix PR: #7983** (open).
4. **🟠 High — `chat_with_agent` foreground timeout misreported** [#7981](https://github.com/agentscope-ai/CoPaw/issues/7981) — Caller receives "interrupted by user" instead of timeout; parent turn ends without answer. **No fix PR yet.**
5. **🟠 High — Local llama.cpp provider treated as 1M-context model** [#7979](https://github.com/agentscope-ai/CoPaw/issues/7979) — Static cloud catalog incorrectly matches local alias, compaction never fires. **Fix PR: #7986** (open).
6. **🟡 Medium — Browser profile extensions blocked by Playwright** [#7984](https://github.com/agentscope-ai/CoPaw/issues/7984) — `--disable-extensions` flag cannot be overridden. **Fix PR: #7987** (open).
7. **🟡 Medium — Gemini thought_signature missing on 2nd turn** — **Fix PR: #7982** (open).
8. **🟡 Medium — Markdown tables overflow console** [#7924](https://github.com/agentscope-ai/CoPaw/issues/7924) — **Fix PR: #7989** (open).
9. **🟡 Medium — Web console input broken by layout** [#7948](https://github.com/agentscope-ai/CoPaw/issues/7948) — **No fix PR yet.**

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood for Next Release |
|---|---|---|
| Cross-agent "Recent Sessions" sidebar panel | [#7978](https://github.com/agentscope-ai/CoPaw/issues/7978) | Medium — UX polish, likely later |
| Disable/deactivate premade models & channels | [#7957](https://github.com/agentscope-ai/CoPaw/issues/7957) | Low — niche request |
| Tool-call visibility toggle | [#7357](https://github.com/agentscope-ai/CoPaw/pull/7357) | **High** — PR ready, strong UX value |
| Scroll-back pagination for compacted chats | [#7542](https://github.com/agentscope-ai/CoPaw/pull/7542) | **High** — addresses top community pain point |
| `tool_result` block age-out retention | [#7923](https://github.com/agentscope-ai/CoPaw/pull/7923) | **High** — operational necessity for production |
| Per-media inline caps (image/video/audio) | [#7359](https://github.com/agentscope-ai/CoPaw/pull/7359) | Medium — provider-specific |
| Console settings/sidebar workflow optimization | [#7956](https://github.com/agentscope-ai/CoPaw/pull/7956) | Medium |

**Prediction:** The next release will likely include PRs #7988, #7986, #7983, #7982, #7989, #7985, and #7825 (all bug fixes with ready PRs), plus possibly #7357 and #7542 if review completes in time.

## 7. User Feedback Summary

- **Context compaction is a major pain point.** Users report that compacted histories are不可回查 (#7884) and compaction budgets are miscalculated (#7628, #7979). This is the dominant theme across multiple issues.
- **Console UX needs work.** Markdown table rendering (#7924), input field layout breaks (#7948), and lack of cross-agent session navigation (#7978) suggest the web UI is maturing but has rough edges.
- **Production-grade concerns emerging.** Database bloat from unretained `tool_result` blocks (#7923), binary file ingestion via `grep_search` (#7980), and cron scheduling bugs (#7825) indicate users are running CoPaw at scale and hitting operational limits.
- **Channel integrations need hardening.** QQ replay (#7946) and browser extension loading (#7984) show that external integration paths are fragile under edge-case conditions.
- Overall sentiment: **frustrated but engaged** — users are filing detailed bugs with reproduction steps and submitting fix PRs, which is a healthy sign.

## 8. Backlog Watch

| Issue | Age | Risk |
|---|---|---|
| [#7628](https://github.com/agentscope-ai/CoPaw/issues/7628) — Context compaction budget mismatch | 18 days, 7 comments | **High** — core functionality broken for some providers; no PR yet |
| [#7948](https://github.com/agentscope-ai/CoPaw/issues/7948) — Console input broken by design | 3 days, 3 comments | **Medium** — UX bug, no PR yet |
| [#7981](https://github.com/agentscope-ai/CoPaw/issues/7981) — Timeout misreported as user interrupt | 1 day, 1 comment | **High** — no PR yet, affects `chat_with_agent` reliability |
| [#7979](https://github.com/agentscope-ai/CoPaw/issues/7979) — Local provider context catalog mismatch | 1 day, 1 comment | **High** — fix PR #7986 open but unmerged |
| [#7884](https://github.com/agentscope-ai/CoPaw/issues/7884) — History not fully loadable after compaction | 7 days, 5 comments | **High** — directly tied to #7628; may be resolved together |

**Key concern:** Issues #7628 and #7884 form a cluster around context compaction correctness that has been open 7–18 days with no merged fix. Given their severity and community attention, maintainers should prioritize these.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

### ZeroClaw Project Digest
**Date:** 2026-09-26
**Project:** ZeroClaw (github.com/zeroclaw-labs/zeroclaw)

---

### 1. Today's Overview
ZeroClaw maintains a high level of activity with 45 active issues and 50 pull requests updated in the last 24 hours. The project is currently focused on stabilizing the runtime environment, resolving critical security vulnerabilities (CVEs), and refining the agent loop architecture. A significant portion of the work involves "Stage 5" security features and streamlining the agent-to-agent communication and resource management models.

### 2. Releases
**No new releases** were generated in the last 24 hours.

### 3. Project Progress
*   **Security & Identity:** The "Stage 5" security features (browser PKCE, cross-surface enrollment, principal-owned sessions) continue to advance, with multiple PRs currently in review. PR #11121 addresses a configuration gap regarding remote WSS authentication tokens.
*   **Runtime & Infrastructure:** Work continues on the "Composition Boundary" and the "Holding Crate" exception to support embedded runtime usage. PR #10412 proposes a shared `SessionBackend` contract for atomic session ownership.
*   **Channel Enhancements:** PR #11122 introduces native reply context for Discord, allowing agents to recognize and quote user replies directly within the chat interface.

### 4. Community Hot Topics
*   **Agent-to-Agent Messaging (RFC #11027):** An RFC proposing a mechanism for agents in separate sessions to exchange coordination messages without human intervention. This addresses the need for distributed agent collaboration.
*   **Host-Scoped Admission Control (RFC #10970):** A critical architecture proposal to bound concurrent turns and tool executions across an entire machine running multiple agents, preventing resource exhaustion.
*   **Unified Capability Catalog (Tracker #6489):** A roadmap tracker aiming to consolidate all integrations and plugins into a single capability catalog ("Everything is a plugin").
*   **Runtime Composition Contract (PRs #11090, #11092):** Architectural discussions regarding the public composition boundary and the exception handling required for the `zeroclaw-runtime` holding crate.

### 5. Bugs & Stability
*   **SOP Registration Failure (Issue #11055):** A high-severity bug where the daemon fails to register the channel-map factory, breaking webhook, cron, and SOP turns. The issue is currently open and needs maintainer review.
*   **WhatsApp Voice Routing (Issue #11059):** The WhatsApp Web channel ignores the `force_voice` flag, preventing the system from routing turns to voice notes.
*   **Wasm Linker Skew (Issue #10505):** A critical runtime bug where WASM tools fail to instantiate if the WIT version is slightly behind the host's exported world, causing `registered: 0` errors.
*   **RPC Workspace Symlink Leak (Issue #11110):** A security risk (S0) where a scoped RPC session retains a caller-controlled symlink as its workspace root, potentially allowing path traversal attacks.

### 6. Feature Requests & Roadmap Signals
*   **Cheaper Inference Provider:** Issue #11103 requests adding a typed provider for Cheaper Inference, an OpenAI-compatible gateway, to expand model access options.
*   **ZeroRelay v0.9.0 Readiness:** Tracker #8358 focuses on completing the ZeroRelay native transport and release readiness.
*   **SOP Control Plane (Tracker #8288):** The roadmap for the SOP (Standard Operating Procedure) capability to reach 5/5 completion, focusing on daemon-owned control planes.

### 7. User Feedback Summary
*   **Dashboard UX:** Users are reporting that agents stop working when they exit the chat window in the web dashboard (Issue #8559), disrupting long-running workflows.
*   **Tool Semantics:** There is confusion regarding tool aliases; users report that `browser_open` is being incorrectly routed to `shell` instead of the native browser tool (Issue #11108).
*   **CI Latency:** Users complain about slow CI critical paths (15-20 minutes), prompting a refactor to improve Rust build caching (Issue #7108).

### 8. Backlog Watch
*   **Audit Drift (Issue #8519):** A high-priority dependency tracking issue regarding the reconciliation of `cargo-audit` ignores and the remediation of `wasmtime-wasi` CVEs.
*   **Plugin Migration (Issue #8850):** A long-running architectural shift to move optional channels and tools from compile-time features to runtime WASM plugins.
*   **Legacy Tool Aliasing:** A recurring issue where legacy tool names (like `browser_open`) are mapped to `shell` instead of their intended tools, requiring a fix to `map_tool_name_alias()`.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*