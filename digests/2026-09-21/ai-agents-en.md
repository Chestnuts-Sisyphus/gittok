# OpenClaw Ecosystem Digest 2026-09-21

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-20 22:02 UTC

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

# Project Divegut Overview

Today, the Hermes Agent project is in a stable state with no open issues or PRs waiting to be merged. The team has been working on fixing bugs and improving the user experience, and all known issues have been resolved. The project is now focusing on enhancing its stability and performance, with plans to release a new version next week.

## Releases

The latest version of Hermes Agent is 1.2.1, released on Sep 20, 2023. This version addresses several security vulnerabilities and improves the agent's stability and compatibility with certain devices. A fix for an issue that could cause the agent to crash during startup has also been added.

## Project Progress

Today, the team merged two PRs: one from DavidMetcalfe to add a community plugin and another from StanleyStetson to update the Kanban board UI. Both PRs were closed with fixes implemented. Additionally, the team addressed a bug in the desktop pane of the Saved Chats UI by including children in the usage totals.

## Community Hot Topics

The most active Issue is #117642, which discusses the reclassification of Marketplace endpoints and how it impacts the user experience. The team has acknowledged this issue and is working on a fix. Other active issues include #117639 (fixing the plain-text token banner) and #117624 (addressing typed block classification issues).

## Bugs & Stability

Today, the project reported no new bugs or crashes. However, it did identify and fix a regression affecting the compression tips in the dashboard, as well as a minor stability issue that caused the Kanban board to sometimes not display cards properly.

## Feature Requests & Roadmap Signals

Hermes Agent users have requested features such as a better way to search for endpoints, improved notifications for when endpoints are created or updated, and a more granular view of usage costs. The team is considering these requests and will prioritize them based on their potential impact on user satisfaction.

## User Feedback Summary

Users have reported issues with the agent's compatibility with certain browsers and devices. They also appreciate the integration of community plugins and the ability to see full normalized socket-dir paths in the prompt tray. Overall, users seem satisfied with the current state of the project but are looking forward to future updates that address their specific needs.

## Backlog Watch

The Hermes Agent team has identified several long-unanswered issues that require attention. These include issues related to the agent's handling of certain device types and its compatibility with older versions of certain operating systems. The team will work on addressing these issues as soon as possible.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>



# NanoClaw Project Digest — 2026-09-21

## 1. Today's Overview

NanoClaw is experiencing a high-velocity merge day with 38 PRs closed/merged, signaling a significant cleanup or release-prep push. Only one issue remains open (#3858), and no new releases were published in the last 24 hours, suggesting the merged PRs may be accumulating toward an upcoming version. The project's issue surface is very small relative to its PR throughput, indicating a responsive maintenance cadence. The lone open bug touches WhatsApp native adapter behavior, a recurring pain point for multi-channel deployments.

## 2. Releases

No new releases were published today.

## 3. Project Progress

**38 PRs merged or closed today**, covering fixes, skills, and operational improvements:

- **OpenCode provider reliability** (#3463, still open) — fallback to `message.part.delta` text to resolve a ~78ms race condition where the final snapshot was missed before `session.idle` broke the read loop.
- **WhatsApp channel hardening** (#2328, #2327, #2565, #746) — multiple fixes: defaulting reply destination to message origin in multi-destination groups, injecting destination reminders after SDK auto-compaction, detecting group @-mentions via `contextInfo.mentionedJid`, and preventing service restart hammering on auth failure.
- **iCloud skills** (#706) — new `icloud-tools` skill adding CalDAV/CardDAV/IMAP/SMTP access.
- **CLI & provisioning** (#2416, #2356) — companion row provisioning on `ncl groups/wirings create`, and `~/.local/bin/ncl` symlink installation on upgrade.
- **OpenCode process lifecycle** (#2152, #3346, #2153) — killing server process groups, recovering from idle resumed sessions, and loading CLAUDE.md via native instructions config.
- **Session management** (#700) — rotating oversized JSONL sessions to prevent container timeouts.
- **Time context** (#701) — injecting current date/time into all agent prompts.
- **Migration & CI** (#2402, #2287, #2288, #2290, #2309) — repo rename guard updates, SQLite timestamp UTC parsing, health endpoint probing, SQL queries in SKILL.md, and replacing `sqlite3` CLI with in-tree `better-sqlite3`.
- **Display cards** (#2265) — fixing `send_card` MCP tool which was a silent no-op on Chat SDK channels.

**Link:** [nanocoai/nanoclaw Pull Requests](https://github.com/nanocoai/nanoclaw/pulls)

## 4. Community Hot Topics

- **[PR #3463](https://github.com/nanocoai/nanoclaw/pull/3463)** — *OpenCode provider delta-text fallback* (still open). Addresses a timing race in OpenCode streaming where the assistant's final text snapshot is missed. High relevance for users relying on OpenCode as a provider.
- **[Issue #3858](https://github.com/nanocoai/nanoclaw/issues/3858)** — *WhatsApp sender display names invisible to agent*. The only open issue; reporter notes that in WhatsApp groups, the model receives only the JID (phone number) with no display name, making participant identification impossible.
- **[PR #706](https://github.com/nanocoai/nanoclaw/pull/706)** — *iCloud tools skill* (closed). Demonstrates strong community demand for productivity-suite integrations beyond messaging.
- **[PR #2328](https://github.com/nanocoai/nanoclaw/pull/2328)** — *Default reply destination fix* (closed). Responds to a multi-destination group routing bug where replies went to the wrong channel.

**Underlying need:** Users are running NanoClaw in complex multi-channel, multi-group WhatsApp deployments where message routing fidelity and sender identity are critical. The volume of WhatsApp-adjacent PRs confirms this is a top-use-case area.

## 5. Bugs & Stability

| Severity | Item | Status | Fix PR |
|----------|------|--------|--------|
| **Medium** | WhatsApp display names not exposed to agent (#3858) | Open | None yet |
| **Medium** | `send_card` MCP tool was a no-op on Chat SDK channels (#2265) | Fixed | [#2265](https://github.com/nanocoai/nanoclaw/pull/2265) |
| **Medium** | OpenCode provider race condition missing final text snapshot (#2985 / #3463) | Open PR | [#3463](https://github.com/nanocoai/nanoclaw/pull/3463) |
| **Low** | WhatsApp auth-failure restart hammering (#748) | Fixed | [#746](https://github.com/nanocoai/nanoclaw/pull/746) |
| **Low** | Oversized JSONL sessions causing container timeouts (#697) | Fixed | [#700](https://github.com/nanocoai/nanoclaw/pull/700) |
| **Low** | SQLite timestamps parsed as local time instead of UTC (#2288) | Fixed | [#2288](https://github.com/nanocoai/nanoclaw/pull/2288) |

**Worth noting:** Two medium-severity items (#3858 and #3463) remain unresolved. The WhatsApp identity issue likely stems from the same adapter layer that was partially addressed by #2565 (mention detection) and #2328 (reply routing), suggesting the native adapter integration still needs deeper work.

## 6. Feature Requests & Roadmap Signals

- **iCloud productivity suite** (#706) — now merged as a skill. Suggests the roadmap is expanding beyond messaging into general personal productivity.
- **Native CLAUDE.md loading in OpenCode** (#2153) — merged. Signals a push toward standardized agent configuration across providers.
- **Time context injection** (#701) — merged. Addresses a common agent reliability need; likely to become a permanent baseline behavior.
- **Companion row provisioning via CLI** (#2416) — merged. Improves developer experience for multi-agent group setups.
- **Recovery from idle resumed sessions** (#3346) — merged. Indicates the team is prioritizing resilience in long-running agent sessions.

**Likely next version focus:** WhatsApp adapter hardening (given #3858 is still open), OpenCode provider stability (#3463), and further skill ecosystem expansion.

## 7. User Feedback Summary

- **WhatsApp sender identity is broken** — Users in group chats cannot distinguish participants because display names are stripped at the adapter layer. This is a first-class experience bug for multi-user deployments.
- **Reply routing in multi-destination groups is error-prone** — Multiple PRs (#2328, #2327, #2565) from the same author (`glifocat`) suggest this is a recurring, well-understood pain point that the team is systematically addressing.
- **OpenCode streaming reliability** — The ~78ms race window in the OpenCode provider affects users who depend on real-time text delivery; the fallback PR (#3463) is critical for that experience.
- **Operational friction in session management** — Oversized sessions causing container timeouts (#700) and idle-resume hangs (#3346) indicate users are running long-lived agents that need robust state management.
- **CLI ergonomics** — Requests for symlink installation on upgrade (#2356) and companion row provisioning (#2416) show users are treating NanoClaw as a production tool, not a toy.

## 8. Backlog Watch

| Item | Age | Concern |
|------|-----|---------|
| **[Issue #3858](https://github.com/nanocoai/nanoclaw/issues/3858)** — WhatsApp display names | ~1 day open | Critical UX bug for group chat users; no fix PR yet |
| **[PR #3463](https://github.com/nanocoai/nanoclaw/pull/3463)** — OpenCode delta fallback | Open since 2026-08-23 | 29 days open; race-condition fix awaiting merge |
| **[PR #701](https://github.com/nanocoai/nanoclaw/pull/701)** — Date/time context injection | Labeled "Blocked" / "Pending Closure" | Closed but previously flagged as blocked — worth verifying final state |
| **[PR #746](https://github.com/nanocoai/nanoclaw/pull/746)** — WhatsApp auth-restart hammering | Labeled "Blocked" | Closed but was previously blocked — confirm resolution didn't drop |
| **[PR #2290](https://github.com/nanocoai/nanoclaw/pull/2290)** — SQL queries in SKILL.md | Labeled "Needs Review" | Closed but had review hold — verify quality gate passed |

**Top priority:** #3858 (WhatsApp sender names) and #3463 (OpenCode race condition) are the two open items most likely to affect end users.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw Project Digest – 2026‑09‑21**

---

### 1. Today's Overview  
On September 21, 2026 the NullClaw repository remained largely quiet, with no new releases, pull‑request merges, or significant issue churn. The only activity in the past 24 hours is a single open issue (#1000) requesting an enhanced notification when an Ollama model lacks tool support. With no PRs or releases today, the project’s momentum appears steady but stalled – developers are still waiting on contributors to push forward new code.  

### 2. Releases  
No new releases were published in the last 24 hours. The most recent release remains the one published on 2026‑08‑15 (v0.4.2).  

### 3. Project Progress  
No pull requests were merged or closed today. The repository’s `main` branch still contains the same commits as yesterday; no new features or bug fixes were added in the current cycle.  

### 4. Community Hot Topics  
**Issue #1000 – “ollama incompatibility notification”**  
- **URL:** https://github.com/nullclaw/nullclaw/issues/1000  
- **Author:** aaafgcfg  
- **Created / Updated:** 2026‑09‑20  
- **Status:** Open (enhancement)  
- **Comments:** 1 (none yet resolved)  
- **Reactions:** 0 👍  

This is the most active topic for the day. The issue points out that when Ollama’s model does not support tools, NullClaw silently returns an adapter error without a clear message, making troubleshooting difficult. The underlying need is clearer error messaging and developer‑friendly diagnostics.  

### 5. Bugs & Stability  
- **Issue #1000** – *Ollama incompatibility notification* (moderate severity)  
  - **Problem:** Silent adapter error when Ollama tool support is missing.  
  - **Impact:** Users cannot easily diagnose why a model fails; may lead to mis‑configuration or unnecessary retries.  
  - **Status:** No fix PR exists yet. The issue remains open.  

No crashes or regressions were reported today.  

### 6. Feature Requests & Roadmap Signals  
The single enhancement request (#1000) signals a desire for better error handling and visibility when working with Ollama models. This is a clear candidate for the next release, as it directly improves developer experience and debugging.  

### 7. User Feedback Summary  
- **Pain point:** Users find it hard to identify why Ollama integration fails; the lack of a descriptive error message hampers debugging.  
- **Use case:** A developer trying a new model for tooling purposes receives only a generic “adapter error” without context.  
- **Satisfaction level:** Low, due to lack of actionable information.  

### 8. Backlog Watch  
With only one open issue in the last 24 hours and no older unresolved tickets referenced here, there are no pressing backlog items needing immediate attention. However, maintainers should keep Issue #1000 visible and encourage discussion or a PR to add a proper notification.  

---

**Summary:**  
The NullClaw project is in a maintenance‑mode snapshot today – no releases or PR activity, one open enhancement request that highlights a missing notification feature. The community’s main concern is clearer error reporting for Ollama models, which should be prioritized for the next release to improve developer satisfaction.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest
**Date:** 2026-09-21

### 1. Today's Overview
The IronClaw project maintains a steady, low-volume maintenance mode today with no new feature development or releases. Activity is strictly confined to dependency management, with 6 Pull Requests (PRs) opened by Dependabot to update various Rust and GitHub Actions packages. Overall project health appears stable, with no active bugs or feature requests requiring immediate attention. The project is currently in a "maintenance and dependency hygiene" phase.

### 2. Releases
**No new releases were detected in the last 24 hours.**

### 3. Project Progress
**0 PRs were merged or closed today.**
There is no functional feature advancement, bug fixes, or stability improvements to report for today. The project focus is entirely on updating underlying infrastructure dependencies to ensure compatibility and security.

### 4. Community Hot Topics
The most significant activity is driven by dependency updates rather than community discussion. The top items are Dependabot PRs for dependency bumps.

*   **PR #8104: Bump everything-else group (29 updates)**
    *   **Status:** Open
    *   **Link:** [nearai/ironclaw PR #8104](https://github.com/nearai/ironclaw/pull/8104)
    *   **Analysis:** This is a comprehensive update affecting the core `uuid` and `base64` crates. This indicates the team is actively maintaining the security and versioning of core cryptographic and data handling libraries.

*   **PR #8103: Bump actions group (8 updates)**
    *   **Status:** Open
    *   **Link:** [nearai/ironclaw PR #8103](https://github.com/nearai/ironclaw/pull/8103)
    *   **Analysis:** This targets GitHub Actions, specifically updating `anthropics/claude-code-action` and `actions/setup-node`. This suggests the CI/CD pipeline is being optimized, potentially to support new development workflows or environment setups.

### 5. Bugs & Stability
**No bugs, crashes, or regressions were reported today.**
The absence of new issues or open high-severity bugs indicates the current codebase is stable. The dependency updates are routine maintenance intended to prevent future regressions rather than react to current failures.

### 6. Feature Requests & Roadmap Signals
**No new feature requests were submitted today.**
The current roadmap signals appear to be focused on "Infrastructure Stability" rather than new feature development. The high volume of dependency updates (e.g., `tokio-ecosystem`, `wasmtime`) suggests the team is working to upgrade the technical stack to support future performance improvements or WASM-related capabilities.

### 7. User Feedback Summary
**No direct user feedback was recorded today.**
With 0 active issues and only dependency automation PRs, there is no user voice regarding usability, API changes, or feature requests.

### 8. Backlog Watch
**No long-unanswered Issues requiring immediate maintainer attention were identified.**
All recent PRs are active and recent. There are no stale items in the backlog that require triaging or archiving.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest | 2026-09-21

## 1. Today's Overview
The LobsterAI project maintains a **high level of active development** with 4 new releases published in the last 24 hours. The update cadence is aggressive, focusing on OpenClaw integration, security enhancements (WebAuthn), and UI refinements. While the volume of open PRs (12) suggests significant feature work is underway, the balance between open and closed PRs indicates a healthy review cycle. The project is currently stabilizing the OpenClaw gateway and improving cross-platform support (specifically macOS).

## 2. Releases
Four new releases were published today, pushing the version forward rapidly.
*   **2026.9.20 (Latest):**
    *   **Security:** Added **Passkey/WebAuthn support** for the in-app agent browser (PR #2723). This enhances security for authentication flows within the app.
    *   **Architecture:** **Subagent session visibility** improvements (PR #2703).
    *   *Note: The changelog snippet for this release was truncated, suggesting more changes were rolled into this update.*
*   **2026.9.17:**
    *   **OpenClaw Migration:** Added repair snapshot rollback and agent media migration handling to prevent data loss during shared state schema migrations (PR #2689).
*   **2026.9.15:**
    *   **Compatibility:** Focused on **OpenClaw compatibility repair** and migrating xAI auth credentials to a canonical SQLite store (PR #2675).
*   **2026.9.14:**
    *   **Workflow:** Upgraded OpenClaw to v2026.8.1 and improved artifact workflows. Also included markdown editing improvements (PR #2659).

## 3. Project Progress
*   **7 PRs Closed:** A significant portion of development work was finalized today.
    *   **Feature:** Added digital employees and capability markets (PR #2726), expanding the platform's ecosystem.
    *   **Feature:** Added one-cent trial and low-credit purchase offers (PR #2720).
    *   **Refactor:** Removed the background jobs feature to streamline the coworking architecture (PR #2724).
    *   **Fix:** Implemented **Passkey/WebAuthn support** for the in-app browser (PR #2723).
*   **5 PRs Open:** Active development continues on internal stability and IM integration.
    *   **OpenClaw Stability:** Fixed persistence of OpenClaw entry hooks across sync so gateway restarts don't lose configuration (PR #2727).
    *   **IM Config:** Implemented live IM configuration updates without requiring a gateway restart (PR #2721).

## 4. Community Hot Topics
*   **Issue #1007: Agent Engine Infinite Restart**
    *   *Status:* Open | *Comments:* 1
    *   *Analysis:* Users are struggling with the Agent Engine repeatedly crashing and restarting. This suggests a potential stability issue in the core runtime or configuration handling that needs urgent attention.
    *   [View Issue #1007](https://github.com/netease-youdao/LobsterAI/issues/1007)
*   **Issue #1003: Notion MCP Environment Variable Issue**
    *   *Status:* Open | *Comments:* 1
    *   *Analysis:* The MCP Bridge is failing to pass environment variables (specifically tokens) to the `@notionhq/notion-mcp-server` process. This blocks users from connecting to external tools via MCP.
    *   [View Issue #1003](https://github.com/netease-youdao/LobsterAI/issues/1003)
*   **Issue #1068: Agent Deletion & List Refresh**
    *   *Status:* Closed (9 days ago)
    *   *Analysis:* While closed, this highlights a UI/UX flow bug where deleting an agent didn't immediately refresh the task list, leading to stale data displays.

## 5. Bugs & Stability
*   **Agent Engine Crashes (Issue #1007):** Users report frequent infinite restart loops of the Agent Engine. This is a high-severity stability issue that interrupts workflows.
*   **MCP Server Authentication (Issue #1003):** The inability to pass tokens to MCP servers (specifically Notion) causes 401 errors, breaking integrations.
*   **Background Jobs Refactor (PR #2724):** A recent closed PR removed the "background jobs" feature. While likely a cleanup, such architectural shifts can sometimes introduce regressions that users report later.

## 6. Feature Requests & Roadmap Signals
Several long-standing feature requests are active, indicating future roadmap directions:
*   **Prompt Template Library (PR #1009):** Users want a local, persistent library for reusable prompt structures (e.g., for code review, documentation). This aligns with "productivity" tools.
*   **Artifact Preview Pipeline (PR #1011):** There is a strong desire for better rendering of artifacts (HTML, Mermaid, React) so users don't have to manually parse code blocks.
*   **Slash-triggered Skill Picker (PR #1013):** Users want to trigger skills inline in the chat input (using `/`) rather than navigating away to a skills page.
*   **Preset Agents (PR #1008):** Expansion of preset agent templates beyond the current 6 scenarios.

## 7. User Feedback Summary
*   **Pain Point - Stability:** The most vocal feedback concerns the **Agent Engine's reliability**. Users are experiencing frequent crashes/restarts, which is the primary blocker for consistent usage.
*   **Pain Point - Configuration:** The **Notion MCP integration** is frustrating users due to configuration complexity (environment variables not passing), indicating a gap in the developer experience for setting up external tools.
*   **Pain Point - Workflow:** Users want more **in-line interaction** (slash commands for skills, prompt templates) to reduce the friction of repetitive tasks.

## 8. Backlog Watch
*   **PR #1008 (Preset Agents):** Request to add 6 new preset agent templates. (Created March 2026)
*   **PR #1013 (Slash-triggered Skills):** Request for inline skill triggering. (Created March 2026)
*   **PR #1011 (Artifact Preview):** Request for extensible artifact preview pipeline. (Created March 2026)
*   *Note:* These items are stale (older than 6 months) but still open. They represent significant feature requests that the maintainers have not yet addressed, possibly due to prioritizing stability and core integration work.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest: 2026-09-21

## 1. Today's Overview
Activity for the Moltis project remained relatively stable with 3 GitHub issues updated in the last 24 hours. While no Pull Requests (PRs) were merged or opened, the project is actively addressing documentation and configuration bugs related to the Heartbeat system. The team is currently focused on resolving inconsistencies between documented behavior and actual implementation logic.

## 2. Releases
**None.** No new versions were released in the last 24 hours.

## 3. Project Progress
**No PR Activity:** The development pipeline showed zero activity in terms of Pull Requests (merged or opened) today. The project's maintenance focus appears to be on issue resolution and documentation improvements rather than feature development at this time.

## 4. Community Hot Topics
**Heartbeat Configuration Logic:** The most active topic involves the `heartbeat.active_hours` configuration setting. Users have reported that the system ignores the configured active hours and runs continuously, contradicting the documentation.
*   **Issue #1205:** [Bug] Heartbeat ignores configured active hours and runs continuously](https://github.com/moltis-org/moltis/issues/1205)
*   **Issue #1279:** [heartbeat] cannot set tool_controls — the heartbeat registration hard-codes Default::default()](https://github.com/moltis-org/moltis/issues/1279)
*   **Analysis:** These issues suggest a fundamental disconnect between the API contract (CronPayload) and the implementation logic (Heartbeat registration), preventing users from properly controlling agent execution windows.

## 5. Bugs & Stability
**Heartbeat Implementation Gaps:**
1.  **Documentation vs. Reality (Severity: Medium):** Issue #1278 was closed, confirming that the `is_within_active_hours` function is defined but never called in the execution flow, making the documented active hours window non-functional.
2.  **Hardcoded Defaults (Severity: Medium):** Issue #1279 highlights that the Heartbeat registration process hardcodes `Default::default()` for `tool_controls`, preventing users from setting custom control parameters via the CronPayload.
*   **Status:** The closed issue (#1278) indicates the root cause has been identified, but the merged fix PR is not yet reflected in the latest data provided.

## 6. Feature Requests & Roadmap Signals
No explicit feature requests were submitted in the last 24 hours. The current discussion is primarily centered on "fixing" existing behavior to match the documented specification (Configuration Reference).

## 7. User Feedback Summary
Users are expressing frustration with **configuration reliability**. The core feedback loop indicates that while users can configure `active_hours`, the system does not respect these constraints, leading to continuous execution. Additionally, users attempting to customize agent behavior via `tool_controls` are blocked by implementation limitations.

## 8. Backlog Watch
*   **Issue #1205:** [Bug] Heartbeat ignores configured active hours and runs continuously](https://github.com/moltis-org/moltis/issues/1205)
    *   *Status:* Open with 1 comment.
    *   *Context:* This issue is a duplicate/consequence of the logic gap identified in #1278. It requires a code change to enforce the active hours window in the execution path.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

**CoPaw Project Digest (2026-09-21)**

### 1. Today's Overview
The CoPaw project is maintaining high velocity with 24 active issues and 37 pull requests updated in the last 24 hours. Activity is driven by stabilizing the v2.2.x beta series and addressing integration challenges with external providers and plugins. The release of v2.2.2-beta.3 focuses on restoring console functionality and hardening session management logic. Overall project health is positive, though users are reporting specific regressions in file handling and provider integrations.

### 2. Releases
*   **v2.2.2-beta.3** (Released 2026-09-20)
    *   **Changes:** Fixed console assistant response actions and re-established console selectors broken by the #7502 redesign.
    *   **Migration Notes:** This is a beta release. Users experiencing console rendering issues with the previous beta should upgrade to test the fixes.
    *   **Release Page:** [v2.2.2-beta.3](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.3)

### 3. Project Progress
*   **Merge/Closed PRs (Last 24h):** 14 PRs were merged or closed.
*   **Key Engineering Advances:**
    *   **Core Stability:** Fixed the `DoomLoopGate` escalation logic to prevent premature termination on text-only rounds (PR #7906) and resolved the `qwenpaw-pet` approval actor issue that was breaking tool approvals (PR #7904).
    *   **Frontend Robustness:** Enhanced console testing coverage by +1027 statements and fixed file tab caching logic to prevent stale content display (PR #7902).
    *   **Provider Integration:** Unified model discovery and pricing controls across the system (PR #7899) and added support for AgentScope Platform as a built-in provider (PR #7843).
    *   **CI/CD:** Improved release gate reliability by unfreezing merges immediately upon release completion rather than waiting for cron schedules (PR #7901).

### 4. Community Hot Topics
*   **[Issue #7318] QwenPaw Hub Multi-Tenancy:** A highly active discussion with 31 comments regarding the upcoming 2.2.0 multi-tenant Hub. The community is actively brainstorming what features should be prioritized next for the team edition.
    *   *Link:* [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)
*   **[Issue #7853] ToolResultPruner Media Leak:** A critical bug where base64 image data from `view_image` is not being pruned, threatening to overflow the model context window.
    *   *Link:* [Issue #7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)
*   **[Issue #7724] Session Loss:** Users report data loss where sessions and model configurations disappear after system reboots or plugin redeployments.
    *   *Link:* [Issue #7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)

### 5. Bugs & Stability
*   **High Severity:**
    *   **Context Window Overflow:** `ToolResultPruner` skips `type="data"` blocks (base64 images), causing unbounded accumulation (Issue #7853). *Fix PRs:* Under review (PR #7856).
    *   **Session Persistence:** Sessions and models vanish unexpectedly after system restarts or plugin reloads (Issue #7724).
*   **Medium Severity:**
    *   **UI Crashes:** Browser UI layer injects `<font>` wrappers causing `insertBefore NotFoundError` on the chat page (Issue #7888).
    *   **Tool Execution State:** Tool cards get stuck in "Executing..." state after manual stop, preventing further interaction (Issue #7321).
    *   **OpenCode Provider:** "Free" tier models fail via API (403 error) despite UI marking them as free (Issue #7882).
*   **Low Severity:**
    *   **File Tab Sync:** File-area tabs show old content after agent rewrites the file (Issue #7866).
    *   **Authentication:** Hub authentication fails to handle `?token=` query parameters for file previews (Issue #7900).

### 6. Feature Requests & Roadmap Signals
*   **Hub Architecture:** The community is deeply invested in the multi-tenant "Hub" roadmap, signaling a major pivot from personal to enterprise use cases.
*   **UI Customization:** Users request the ability to customize the browser tab title to distinguish multiple QwenPaw instances easily (Issue #7648).
*   **Unified Configuration:** There is a strong demand to unify model configurations (text, vector, audio/video) to simplify setup (Issue #5182).
*   **Memory Optimization:** Users want a separate, cheaper model for memory writing (`ReMeLight`) to avoid burning expensive context tokens during background tasks (PR #7719).

### 7. User Feedback Summary
Users are currently experiencing a mix of frustration and excitement. The primary pain point is **stability**: users are losing data (sessions/models) and facing crashes, which undermines trust in the platform. Additionally, users are finding the "Free" tier models of providers like OpenCode unreliable, creating a disconnect between the UI and API functionality. However, the roadmap to **QwenPaw Hub** is generating significant positive engagement, showing users are eager for collaborative features.

### 8. Backlog Watch
*   **[Issue #5567] GitHub Issue Feedback Skill:** A specific tool exists to help users convert complaints into standard GitHub issues. While closed, it highlights a need for better developer onboarding tools.
*   **[Issue #7881] kimi-code Security:** A detailed analysis of security bypasses in the kimi-code ACP runner requires immediate attention to prevent destructive commands from executing blindly.
*   **[Issue #7890] Zero-Downtime Reload:** The inconsistency between `register_runtime_hook` (lost on reload) and `register_middleware` (preserved) needs a structural fix to ensure configuration consistency.

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