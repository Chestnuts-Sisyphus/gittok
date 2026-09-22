# OpenClaw Ecosystem Digest 2026-09-23

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-22 22:31 UTC

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

# Project Dignity

## Today's Overview
The project has been advancing steadily, with 10 commits and 3 releases. The latest update introduced several bug fixes for stability and performance improvements.

## Releases
- **v0.21.4**: Minor bug fixes and performance improvements.
- **v0.21.3**: Updated documentation and added a new config key for security audit acceptance.
- **v0.21.2**: Minor bug fixes and optimizations.

## Project Progress
Today, we merged two PRs related to gateway self-restart. One fixed an issue where the gateway would not start on its own. Another added a `security_audit.accepted_risks` config key to allow accepted risks in security audits.

## Community Hot Topics
The most active issue is about the gateway self-restart issue (#119046) and the security audit acceptance change (#119588). Both issues have received a lot of comments and discussions.

## Bugs & Stability
We have reported 3 bugs today: gateway self-restart, scrolling behavior issues in chat, and broken icons in desktop. We are working on solutions for these issues.

## Feature Requests & Roadmap Signals
We are considering adding support for more MCP servers in future versions. Additionally, we want to improve the user interface and experience in desktop mode.

## User Feedback Summary
Most users found the updated documentation helpful. However, some reported issues with scrolling behavior in chat and broken icons in desktop. We will address these issues in our next release.

## Backlog Watch
There are several long-unanswered issues that need maintainer attention, including gateway self-restart and scrolling behavior issues in chat.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>



# NanoClaw Project Digest — 2026-09-23

## 1. Today's Overview

NanoClaw is in a phase of active infrastructure hardening and channel expansion. The project saw significant daily throughput with 18 PRs updated (13 open, 5 merged/closed) and 1 issue closed — no new releases were published. The dominant theme is the **Customer Deployment Self-Serve (CDSS)** subsystem: core seam PRs and Slack/Teams adapters landed today, pointing toward a push for multi-tenant, operator-facing deployment capability. A separate but parallel track addresses setup-wizard reliability under the new Iron Proxy gateway. Overall project health appears strong with focused, coordinated core-team activity.

## 2. Releases

No new releases today.

---

## 3. Project Progress

### Merged / Closed Today (5 PRs)

| PR | Type | Summary |
|----|------|---------|
| [#3865](https://github.com/nanocoai/nanoclaw/pull/3865) | Feature | **Slack & Teams adapters for CDSS** — per-instance adapters with env mode, webhook paths, and `ChannelInstanceSpec`-driven construction. |
| [#3864](https://github.com/nanocoai/nanoclaw/pull/3864) | Feature | **CDSS core seams** — `ChannelCredentialProvider` interface and per-instance webhook paths, enabling operators to surface stored chat-app connections as live adapters without host knowledge of credential location. |
| [#3863](https://github.com/nanocoai/nanoclaw/pull/3863) | Fix | Registers a freshly installed provider contract before the gateway store reads it, preventing "stale barrel" failures during the setup wizard. |
| [#3861](https://github.com/nanocoai/nanoclaw/pull/3861) | Fix | Remembers the image-source answer across setup-wizard resume, so the Echo perk is not re-offered twice. |
| [#1491](https://github.com/nanocoai/nanoclaw/pull/1491) | Feature | **Google Workspace CLI integration skill** — custom MCP server wrapping `gws` with discover/help/run tools, nonce-based write guards, and audit logging. |

### Key Open PRs Carried Forward

- **#3815** — Gateway credential contract centralization (refactor, broad scope)
- **#3817 / #3818** — Iron Proxy gateway skill and gateway-selection-in-setup feature
- **#3866 / #3867** — Codex MCP server readiness and pin bump to 0.155.1
- **#3355 / #3356** — Cursor Agent SDK provider payload and `/add-cursor` skill

---

## 4. Community Hot Topics

1. **[Issue #3862](https://github.com/nanocoai/nanoclaw/issues/3862)** — *Codex device pairing under Iron Proxy cannot vault the login in a fresh public-wizard run (stale provider-contracts barrel in the wizard process)*
   - **Author:** glifocat · Closed same day
   - **Analysis:** This bug was a direct symptom of the provider-contracts barrel lag that PR #3863 resolves. The tight turnaround (reported → fixed in <24h) indicates a responsive maintainer team and a testing pipeline that catches setup-wizard regressions early.

2. **[PR #3865](https://github.com/nanocoai/nanoclaw/pull/3865)** — *Slack and Teams adapters per instance*
   - **Activity:** Paired with #3864 (core seams) in a single feature release cycle.
   - **Analysis:** Reflects user demand for workplace-channel integration beyond Discord/Signal. The per-instance architecture suggests multi-tenant or team-deployment scenarios are a strategic priority.

3. **[PR #3866](https://github.com/nanocoai/nanoclaw/pull/3866)** — *Wait for Codex MCP servers before the first turn*
   - **Analysis:** A reliability fix for Codex agent readiness. The 1-second MCP timeout introduced in Codex 0.147.0 was causing silent tool-loss on startup — users running Codex sessions would hit degraded functionality on first turn.

---

## 5. Bugs & Stability

| Severity | Item | Status |
|----------|------|--------|
| **High** | [#3862](https://github.com/nanocoai/nanoclaw/issues/3862) — Fresh Iron Proxy install cannot vault login (stale barrel) | ✅ Fixed in [#3863](https://github.com/nanocoai/nanoclaw/pull/3863) |
| **Medium** | [#3861](https://github.com/nanocoai/nanoclaw/pull/3861) — Echo perk re-offered on wizard resume | ✅ Merged |
| **Medium** | [#3866](https://github.com/nanocoai/nanoclaw/pull/3866) — Codex runs turn before MCP servers are ready | 🔄 Open, awaiting review |
| **Low** | [#3750](https://github.com/nanocoai/nanoclaw/pull/3750) — Update controller fails to load `scripts/provider-contract-verifier.ts` | 🔄 Open |

**Regression note:** The Codex MCP timing issue (#3866) is a regression from upstream Codex 0.147.0. The fix is in review and should land alongside the version bump in #3867.

---

## 6. Feature Requests & Roadmap Signals

- **Iron Proxy gateway** (#3817, #3818) — A new installable gateway with optional Iron Control. The separation of gateway selection from provider login (#3818) signals a design direction toward pluggable, swappable gateway backends. Likely to ship in the next minor release once testing stabilizes.

- **Cursor Agent SDK support** (#3355, #3356) — Provider payload and install skill. Both are open and carry the `core-team` label, suggesting they are next in line for merging post-review.

- **Google Workspace CLI skill** (#1491) — Merged. A community-driven MCP-wrapper skill with audit logging and write-guards. Indicates demand for enterprise productivity-suite integration.

- **Signal adapter consolidation** (#3837, #3838) — Attachment and DM-routing fixes merged into a single patch. Documentation updates accompany the fix.

- **Predicted next-release scope:** CDSS channel adapters (Slack/Teams), Iron Proxy gateway, and Codex readiness fixes are the most likely candidates.

---

## 7. User Feedback Summary

- **Setup-wizard reliability** is the most actively reported pain point. Issues #3862 and #3861 both target wizard behavior (vault registration and duplicate-perk prompts), suggesting the public-wizard flow still has edge cases that surface under fresh installs or resume scenarios.
- **Multi-channel expansion** is a clear demand signal: Slack, Teams, Signal, and Google Workspace all saw PR activity, indicating the user base wants broader workplace-integration coverage.
- **Fork compatibility** (#3565) — A contributor flagged that forks lose local adapters during skill refresh. This points to a niche but important user segment running customized deployments.
- **Satisfaction indicators:** Fast closed-loop resolution on bugs (#3862 → #3863 same day) and systematic PR pairing (CDSS core + adapters in #3864/#3865) suggest a well-organized development cadence that users benefit from indirectly through stability.

---

## 8. Backlog Watch

| Item | Open Since | Why It Needs Attention |
|------|-----------|----------------------|
| [#3750](https://github.com/nanocoai/nanoclaw/pull/3750) — Update controller fails to load | 2026-09-08 | Blocks the `update-nanoclaw` script; the `git archive` list omits a required module. A functional update path is essential for long-running installations. |
| [#3866](https://github.com/nanocoai/nanoclaw/pull/3866) — Codex MCP readiness | 2026-09-22 | Regression from Codex 0.147.0; first-turn tool loss affects all Codex users. Should merge before the version bump in #3867. |
| [#3355](https://github.com/nanocoai/nanoclaw/pull/3355) / [#3356](https://github.com/nanocoai/nanoclaw/pull/3356) — Cursor SDK | 2026-08-19 | Open for ~1 month; both carry `core-team` label but remain unmerged. Cursor agent support is a high-value differentiator. |
| [#3565](https://github.com/nanocoai/nanoclaw/pull/3565) — Fork adapter persistence | 2026-08-26 | Niche but indicates upstream churn affects custom deployments. |

---

**Overall assessment:** NanoClaw is executing a coordinated feature push (CDSS, Iron Proxy, Cursor SDK) alongside steady bug-fix cadence. The 5 PRs merged/closed today and rapid bug resolution are positive signals. The main risk area is the setup wizard, which continues to surface edge-case regressions. The backlog items #3750 and #3355/#3356 warrant maintainer attention to avoid further drift.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest (2026-09-23)

## 1. Today's Overview
LobsterAI demonstrates active maintenance with a high ratio of merged pull requests compared to open issues today. The project released version 2026.9.22, focusing on critical stability fixes for the OpenClaw gateway, Windows compatibility, and configuration persistence. Overall project health is robust, with 10 out of 12 PRs merged or closed, indicating the team is actively stabilizing the platform ahead of a new release cycle.

## 2. Releases
**Version 2026.9.22** was released on 2026-09-22.
*   **Key Changes:**
    *   **Fix:** Restored native scheduled tasks and Feishu (Lark) delivery capabilities.
    *   **Fix:** Recovered Windows gateway exit behaviors and repaired startup sequences.
    *   **Fix:** Stabilized skill configuration sync and timeout recovery to prevent gateway restart loops.

## 3. Project Progress
*   **PRs Activity:** 12 Pull Requests updated (10 merged/closed, 2 open).
*   **Key Fixes Merged:**
    *   **Gateway Stability:** Fixed plugin lifecycle lease waits (PR #2746) and legacy nsp-clawguard startup issues (PR #2741), resolving startup failures on macOS upgrades.
    *   **Model & Policy Fixes:** Recovered invalid generated model policies on upgrade (PR #2745) and raised Kimi K3 maxTokens limit to 1M (PR #2748).
    *   **Config Persistence:** Ensured OpenClaw entry hooks survive sync operations (PR #2727).
    *   **Rendering:** Restored CJK body font weight to 400 for better markdown readability (PR #2740).

## 4. Community Hot Topics
*   **Issue #1006 (Open):** **Config/Workspace Reset Bug.**
    *   *Analysis:* Users report that LobsterAI aggressively resets custom configuration files (e.g., `openclaw.json`) and workspace files (`AGENTS.md`) to internal templates on restart, forcing a workaround using scheduled tasks. This indicates a conflict between the "protection mechanism" and user customization.
    *   *Link:* [Issue #1006](https://github.com/netease-youdao/LobsterAI/issues/1006)
*   **Issue #986 (Open):** **WeChat Message Delay.**
    *   *Analysis:* Users experience poor UX where WeChat replies are queued and sent in bulk after a long wait. The underlying need is for real-time, incremental streaming of replies rather than buffering.
    *   *Link:* [Issue #986](https://github.com/netease-youdao/LobsterAI/issues/986)
*   **Issue #982 (Open):** **Localization Bug.**
    *   *Analysis:* Preset Agent names and descriptions fail to switch to English when the application locale is changed, breaking the internationalization (i18n) promise.
    *   *Link:* [Issue #982](https://github.com/netease-youdao/LobsterAI/issues/982)

## 5. Bugs & Stability
*   **High Severity:**
    *   **Web Search Service Crash:** Users reported a startup error `Failed to start Web Search service` due to runtime repair issues (Issue #981). (Note: PRs #2746 and #2745 address related gateway stability and policy issues).
    *   **Windows Gateway Exit:** Windows users experienced gateway exits preventing startup. (Fixed in v2026.9.22 via PRs #2741, #2743).
*   **Medium Severity:**
    *   **Shortcut Key Registration:** The UI promises "press new combo key" functionality, but the implementation is missing (Issue #983).
    *   **Intl/Localization:** Incomplete language switching affecting core agent definitions (Issue #982).

## 6. Feature Requests & Roadmap Signals
*   **Configuration Persistence:** The community is asking for a "official way" to persist user configurations, suggesting that current auto-replacement logic is too rigid. This suggests a future roadmap item regarding user-managed config files.
*   **Real-time Streaming:** The WeChat delay issue suggests a roadmap focus on improving streaming latency for chat interfaces.
*   **I18n Completeness:** The need for full localization support indicates a focus on expanding the user base beyond Chinese speakers.

## 7. User Feedback Summary
*   **Dissatisfaction:** High frustration with the "reset on restart" behavior (Issue #1006). Users feel the app is "too aggressive" in overwriting their work, which is a critical usability blocker.
*   **Satisfaction:** Positive reception to the rapid release of v2026.9.22 which addressed Windows stability and gateway crashes.

## 8. Backlog Watch
*   **Issue #983:** **Missing Shortcut Key UI.** This is a UI/UX discrepancy where the documentation promises functionality that isn't implemented.
*   **Issue #1006:** **Config Reset Loop.** While a workaround exists (scheduled tasks), a proper fix is required to allow users to edit core files without them being overwritten.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest - 2026-09-23**

**1. Today's Overview**
Moltis experienced a period of minimal activity on September 23, 2026, with no active issues or new releases detected. The project's development cycle appears to be in a maintenance phase, focusing on dependency updates rather than feature implementation or bug fixes. The single pull request merged into the backlog suggests a routine maintenance task to improve the project's stability and compatibility.

**2. Releases**
No new releases were published for Moltis on this date. The project remains at its last known version.

**3. Project Progress**
No code changes were merged or closed today. The project progress is currently stalled on implementation features, with no advancements in the roadmap.

**4. Community Hot Topics**
There are currently no trending topics or active discussions among the community.

**5. Bugs & Stability**
No new bugs, crashes, or regressions were reported today. The project stability is not under immediate threat.

**6. Feature Requests & Roadmap Signals**
No feature requests are currently being actively discussed.

**7. User Feedback Summary**
No direct user feedback or complaints were identified in the data for this date.

**8. Backlog Watch**
*   **PR #1284: [OPEN] [dependencies, rust] chore(deps): bump wasmtime-wasi from 36.0.9 to 36.0.11 in the cargo group across 1 directory**
    *   **Status:** Open
    *   **Context:** This is the only active item in the repository. While technically not a bug fix, updating the `wasmtime-wasi` dependency is critical for the project's stability and security. The `wasmtime` team releases updates to address vulnerabilities and improve performance.
    *   **Action Needed:** Maintainers should review and merge this dependency bump to ensure the project remains secure and compatible with the latest WebAssembly standards.
    *   **Link:** [Moltis PR #1284](https://github.com/moltis-org/moltis/pull/1284)

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest (2026-09-23)

### 1. Today's Overview
Activity on the CoPaw (agentscope-ai/QwenPaw) repository remains robust, with **37 issues** and **50 pull requests** updated in the last 24 hours. While no new releases were published today, the project is in a high-velocity development phase, driven by a mix of bug fixes, UI/UX refinements, and feature enhancements. The community is actively addressing concurrency and stability issues, particularly around background task management, provider API integrations, and console interactions. Overall, the project demonstrates healthy engagement with a focus on stabilizing version 2.2.1 and preparing for 2.2.2.

### 2. Releases
**No new releases** were published in the last 24 hours. The project is currently focused on refining version **2.2.1** (as noted in several recent issues) and preparing for the upcoming **2.2.2** release (see PR #7928).

### 3. Project Progress
*   **High Activity:** 24 PRs were merged/closed, and 26 were opened, indicating a very active development cycle.
*   **Bug Fixing:** Significant progress on background tool execution and provider authentication (e.g., PR #7944, #7933).
*   **Feature Development:** Work on paginated chat history (PR #7931) and improved sidebar navigation (PR #7940) continues.
*   **Test Coverage:** A dedicated PR (#7941) focused on cross-platform unit testing was merged, improving code stability.

### 4. Community Hot Topics
The community is most engaged with issues related to **background task management** and **UI usability**.
*   **Background Task Stopping (Issue #7567):** Users report that clicking "Stop" on a task visually indicates success, but the task continues running in the background, causing conflicts when new messages are sent. This is a high-severity UX bug affecting workflow control.
*   **Model Configuration (Issue #4036):** A long-standing request to simplify the "Add Model" workflow, which requires navigating through multiple clicks, remains highly active.
*   **Sidebar Layout (Issue #7739):** Users are requesting a UI refactor to move the conversation history to the right side to improve usability on smaller screens (14-inch laptops).

### 5. Bugs & Stability
Several stability concerns were reported, primarily around concurrency and API integration:
*   **Task Concurrency (Issue #7559, #7929):** Users experience `409 Conflict` errors when sending new messages while a background task is running. The system should queue messages instead of rejecting them.
*   **LLM Timeout Recovery (Issue #7935):** A critical bug where a `Request timed out` error causes the entire QwenPaw process to become unresponsive, requiring a manual restart. No automatic recovery mechanism exists.
*   **Provider Integration (Issue #7883):** A regression in how PDF files are serialized for the DeepSeek provider, causing API rejections.
*   **Workspace File Watching (Issue #7721):** The file browser freezes the entire server when watching large repositories due to blocking event loops.

### 6. Feature Requests & Roadmap Signals
User feedback points to several upcoming priorities:
*   **Conversation-Level Model Selection:** Users want the ability to specify different models for specific conversations rather than being bound to a single agent-level model.
*   **Durable Chat History:** The request for "durable paginated transcript history" (PR #7931) suggests a major architectural shift towards more robust, database-backed conversation storage.
*   **Model Fallback Chains:** Multiple issues (#4882, #5351, #5572) have been closed, indicating successful implementation of automatic failover and retry mechanisms for LLM providers.

### 7. User Feedback Summary
The user base is focused on **workflow efficiency** and **stability**.
*   **Pain Point:** Users feel "clogged" on smaller screens due to poor UI layout (left-heavy interface) and are frustrated by complex workflows (e.g., adding models).
*   **Expectation:** Users expect background tasks to be strictly cancellable and for the system to handle timeouts gracefully without crashing.
*   **Integration:** Users are pushing for better support for specific providers (DeepSeek, Volcengine) and smoother markdown rendering in channels like Telegram.

### 8. Backlog Watch
*   **Open Issues:** Several long-standing enhancement requests remain open, including the "Configurable theme/skin module" (Issue #5909) and the "Zero-intrusion skin gateway" proposal (Issue #7287).
*   **Unresolved PRs:** The `fix(providers): carry the session header` PR (#7869) is under review but has not yet been merged, which may block certain provider updates.
*   **Critical Fixes Needed:** The "LLM Request timed out" auto-recovery bug (Issue #7935) and the "Task Stopping" visual/logic mismatch (Issue #7567) require immediate attention to prevent data loss and user frustration.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

### **ZeptoClaw Project Digest**
**Date:** 2026-09-23

---

#### **1. Today's Overview**
The ZeptoClaw project remains in a maintenance phase with negligible active development activity. There are currently no open issues or active discussions, and no new releases have been published in the last 24 hours. The project's health is stable but quiet, with no critical blockers or urgent community concerns reported. The primary focus has shifted toward dependency management and repository hygiene.

#### **2. Releases**
**None.** No new versions have been released in the last 24 hours.

#### **3. Project Progress**
No features were merged or deployed today. The project is currently in a "code freeze" or maintenance mode regarding core functionality. The only progress observed is the resolution of dependency conflicts via automated maintenance pull requests.

#### **4. Community Hot Topics**
There are currently no hot topics. The repository is devoid of active community discussions, issues, or feature requests. There is no specific user feedback requiring immediate attention.

#### **5. Bugs & Stability**
**No bugs reported.** There are zero open issues, and consequently, no reports of crashes, regressions, or stability concerns were received in the last 24 hours.

#### **6. Feature Requests & Roadmap Signals**
**None.** The absence of new issues and pull requests indicates a lack of incoming feature requests. The project roadmap is not being actively updated based on user feedback in this period.

#### **7. User Feedback Summary**
There is no user feedback to summarize. The lack of activity suggests the user base is passive or that the project is not currently driving engagement.

#### **8. Backlog Watch**
**Maintenance Dependencies.**
While there are no critical backlogs, the following dependency updates are pending review:
*   **Docker Build Action:** PR #704 seeks to bump `docker/build-push-action` from 7.2.0 to 7.3.0.
*   **Checkout Action:** PR #706 seeks to bump `actions/checkout` from 6.0.2 to 7.0.1.
*   **Mail Parser:** PR #705 seeks to bump `mail-parser` from 0.11.3 to 0.11.9.

*Note: These are automated dependency updates that require maintenance to ensure CI/CD stability and security compliance.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*