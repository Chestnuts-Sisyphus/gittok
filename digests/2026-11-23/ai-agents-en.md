# OpenClaw Ecosystem Digest 2026-11-23

> Issues: 393 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-23 00:31 UTC

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

# PicoClaw Project Digest: 2026-11-23
## Today's Overview
PicoClaw is currently in a stable, low-activity state as of 2026-11-23, with only 1 issue and 1 PR updating in the last 24 hours. The active item is an open feature request (#3470) proposing the addition of an `LLMTR` OpenAI-compatible provider to the model catalog, which was last modified on 2026-11-22 with two comments. No new releases have been released, and the project is currently maintained through community-driven issue/PR contributions rather than formal release cadence. This indicates a period of focused backlog work and minimal active release delivery, with the primary catalyst being user requests for expandable model ecosystem capabilities.
## Releases
No new releases were recorded for PicoClaw as of 2026-11-23. There are no version upgrade notes, breaking changes, or migration guidance available in the provided data, as the project does not have released versions in this period.
## Project Progress
- **Merged/closed PRs:** 1 PR was updated in the last 24h and was closed/merged: PR #1555 ("fix: merge PRs #1390 #1389 #1383 #1381"), authored by xuwei-xy and updated on 2026-11-22. This PR consolidates multiple open fixes across related PRs, suggesting active maintenance of prior fixes.
- **Feature advancement:** The main current activity is the open issue #3470 requesting an `LLMTR` OpenAI-compatible provider, indicating a feature roadmap focus on expanding provider support beyond standard openAI-compatible providers.
## Community Hot Topics
- **Issue #3470 [OPEN] [Feature] Add LLMTR as an OpenAI-compatible provider** (created 2026-11-14, updated 2026-11-22, 2 comments, 0👍): The most actively discussed topic, driven by user need to extend PicoClaw's model catalog with an external OpenAI-compatible gateway (llmtr.com). This highlights a gap in provider availability and a direct request for an LLMTR support feature.
- **PR #1555 [CLOSED] fix: merge PRs #1390 #1389 #1383 #1381** (created 2026-03-14, updated 2026-11-22): Recently closed consolidation of multiple fixes, indicating meaningful maintenance activity across the project's fix backlog.
## Bugs & Stability
- No specific bugs, crashes, or regressions were reported or addressed in the provided data for 2026-11-23. The project shows stability with limited active issue/PR activity, but there is no visible reported defect tracking for the current period.
## Feature Requests & Roadmap Signals
- **LLMTR OpenAI-compatible provider**: A clearly requested feature explicitly described in Issue #3470. Predict this may be integrated into the next version as a new named provider, enhancing model catalog flexibility and aligning with the stated use case of pointing custom OpenAI-compatible endpoints at llmtr.com.
- **Broader provider expansion**: The recurring pattern of adding new providers (e.g., LLMTR) signals potential ongoing roadmap investment in a scalable model ecosystem, though it remains an open-ended request requiring maintainer response.
## User Feedback Summary
- **Primary pain point:** Users are requesting additional model providers beyond standard openAI-compatible options, specifically for LLMTR, indicating a need for expandable and external model access capabilities within PicoClaw.
- **Use case:** Users want to route their AI agent through a named, configurationurable OpenAI-compatible gateway rather than relying solely on a single built-in provider catalog.
- **Satisfaction/Expression:** The issue is open and actively being addressed (updated recent days), suggesting sufficient user interest and responsiveness; however, it remains incomplete without an implementation or update, reflecting a pending feature gap.
## Backlog Watch
- **Issue #3470 (OPEN)**: The LLMTR provider feature request is the only active item requiring maintainer attention. It is an open feature request that has been updated recently but not yet implemented, making it a high-priority item for the next release or maintenance cycle.
- **PR #1555 (CLOSED)**: Although merged, it represents a fix consolidation batch from prior PRs (#1390, #1389, #1383, #1381) that was updated recently. If these underlying PRs are still needed for other context or were merged as a consolidation step, maintainers may want to review their history for ongoing debt.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest
**Date:** 2026-11-23
**Repository:** [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. Today's Overview
The LobsterAI project demonstrates robust development momentum with 10 high-velocity pull requests closed today, signaling a concerted effort to finalize a major architectural migration. The activity is heavily focused on the DSH (Desktop Shell) runtime migration, where the team is aggressively patching compatibility layers, session lifecycles, and visual components. A single closed bug regarding the "Dream Diary" feature was addressed today, indicating maintenance focus on core agent utilities. Overall, the project appears to be in a stabilization phase following a significant refactor, with high confidence in the codebase's integrity as evidenced by the closure of 9 PRs.

## 2. Releases
**No new releases detected.** The project is currently in a stabilization branch phase (likely `feat/migrate-openclaw-to-dsh`), focusing on code quality and bug fixes rather than version tagging.

## 3. Project Progress
Today marked a significant milestone in the **DSH migration acceptance series**. The team completed a comprehensive 6-part fix series to ensure the new runtime integrates seamlessly with the existing ecosystem. Key progress included:
*   **Runtime Stability:** Hardening startup gating, backup/restore mechanisms, and isolation protocols.
*   **Session Management:** Repairing session lifecycles, goals, and context compaction.
*   **Feature Restoration:** Re-establishing Plan model protocols, thinking capabilities, and OAuth 2.1 routing.
*   **Visual Polish:** Fixing animations for desktop companion avatars (Jingyiming and Xingxingxing).
*   **Ecosystem Integration:** Ensuring MCP sync, skill runtime environments, and email/web-search tools function correctly within the new shell.

## 4. Community Hot Topics
*   **[PR #3146] fix(dsh): harden startup gating, isolation, backup/restore, and packaging (1/6)** - [Link](https://github.com/netease-youdao/LobsterAI/pull/3146)
    *   **Context:** This PR initiates the critical 6-part migration acceptance series. It addresses foundational stability issues like startup gating and isolation, which are prerequisites for safe updates.
*   **[PR #3151] fix(dsh): repair model compat, office editing, scheduled tasks, decision tool, and companion (6/6)** - [Link](https://github.com/netease-youdao/LobsterAI/pull/3151)
    *   **Context:** The final and most comprehensive part of the migration series, restoring compatibility with various office tools, decision logic, and companion features.

## 5. Bugs & Stability
*   **[Issue #2779] [Bug] 多分身配置下「梦境日记」面板恒为空** - [Link](https://github.com/netease-youdao/LobsterAI/issues/2779)
    *   **Severity:** Medium (Feature Regression)
    *   **Details:** Users with multiple agents configured under `agents.ownership = "explicit"` reported that the "Dream Diary" (梦境日记) panel remains empty despite the underlying `DREAMS.md` file updating correctly. The bug is attributed to a missing `ambient-owner` fallback in the OpenClaw 2026.8.1 runtime, which has since been fixed upstream but requires a LobsterAI update.
    *   **Status:** **Closed** (Pending upstream update in integrated runtime).

## 6. Feature Requests & Roadmap Signals
*   **MCP & Plugin Architecture:** The recent PRs (#3150, #3149) show a roadmap signal toward more robust MCP (Model Context Protocol) syncing and plugin lifecycle management, suggesting the project is moving toward a more modular agent ecosystem.
*   **Visual Customization:** The fixes to the companion avatar animations indicate a roadmap priority on high-fidelity UI/UX, specifically for desktop companion skins.

## 7. User Feedback Summary
User feedback has been constructive and focused on stability during the transition.
*   **Pain Points:** Users are experiencing friction with the "Dream Diary" feature when utilizing multi-agent setups with explicit ownership models.
*   **Satisfaction:** High satisfaction with the visual polish of new companion features, though this is tempered by the need for the underlying runtime architecture to stabilize.

## 8. Backlog Watch
*   **[Issue #2779]**: While technically closed as a "Bug," this issue highlights a dependency issue where LobsterAI's integration of the upstream OpenClaw runtime is lagging behind fixes. Maintainers should prioritize updating the bundled runtime version to 2026.9.23 or later to resolve this for end-users immediately.

---
*Generated by AI Analyst on 2026-11-23*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

# TinyClaw Project Digest
**Date:** 2026-11-23

### 1. Today's Overview
The TinyClaw project demonstrates a stable maintenance phase with virtually no activity recorded in the last 24 hours. The repository remains in a steady state, showing no new issues, bugs, or releases. While this indicates a period of low volatility, it suggests the core architecture is currently stable and that the project is likely in a maintenance or documentation-focused mode.

### 2. Releases
**No new releases.** The most recent release occurred prior to the 24-hour reporting window.

### 3. Project Progress
**1 Pull Request Merged (Closed):**
*   **PR #297:** Documentation enhancement for the teams feature.
    *   **Summary:** The maintainer merged a request to document the process of using public Python documentation within the TinyAGI workflow. Specifically, the guide explains how a researcher can look up documentation, extract URLs and excerpts, and pass them to a writer via the team handoff mechanism.
    *   **Impact:** This improves the usability of the "Teams" module, making it easier for users to integrate external knowledge sources into the multi-agent workflow.

### 4. Community Hot Topics
*No active discussions or highly commented issues/PRs found in the last 24 hours.*

### 5. Bugs & Stability
**No reported bugs, crashes, or regressions.** The project is currently stable with no active bug reports.

### 6. Feature Requests & Roadmap Signals
**No new feature requests.** The recent progress focused on documentation rather than new functionality. Based on the merged PR, the roadmap appears to be prioritizing **usability and workflow clarity**, specifically improving how different agents (researchers vs. writers) exchange information.

### 7. User Feedback Summary
**No user feedback available.** The low activity volume indicates a quiet period for user engagement.

### 8. Backlog Watch
*   **PR #297 (Docs):** While this PR was closed, it addressed a specific gap in the "Teams" documentation. Maintainers may want to ensure similar documentation gaps in other modules are addressed proactively to prevent future support requests.

**Links:**
*   [PR #297 on GitHub](https://github.com/TinyAGI/tinyagi/pull/297)

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest**
**Date:** 2026-11-23

### 1. Today's Overview
The Moltis project demonstrated minimal activity on November 23, 2026, with no new releases or pull requests merged. The single active issue highlights a critical connectivity gap between the Moltis client and modern MCP servers. Overall project health remains stable, though this specific incompatibility prevents users from connecting to newer server versions that have deprecated legacy protocol headers.

### 2. Releases
**None.** No new releases were published in the last 24 hours.

### 3. Project Progress
**No Progress.** There were zero pull requests opened, merged, or closed today. Development activity was effectively paused regarding code contributions.

### 4. Community Hot Topics
**MCP Protocol Version Incompatibility**
*   **Status:** Open
*   **Link:** [moltis-org/moltis Issue #1326](https://github.com/moltis-org/moltis/issues/1326)
*   **Analysis:** This is the sole active topic. It addresses a fundamental interoperability failure where the Moltis client uses a hardcoded protocol version (`2024-11-05`) that is no longer accepted by remote servers (e.g., Basecamp). The underlying need is for dynamic protocol negotiation to support the latest MCP server standards.

### 5. Bugs & Stability
*   **Severity:** High
*   **Issue:** **Protocol Handshake Failure**
    *   **Description:** Remote servers rejecting the `initialize` request because the client transmits a hardcoded `MCP-Protocol-Version: 2024-11-05` header instead of adhering to server requirements (e.g., `2025-06-18+`).
    *   **Impact:** Users cannot connect to modern servers even if OAuth authentication succeeds.
    *   **Fix Status:** No fix PRs detected. This is a critical bug that blocks functionality.

### 6. Feature Requests & Roadmap Signals
**Dynamic Protocol Negotiation**
*   **Signal:** The issue highlights a requirement for the client to support dynamic protocol versioning rather than hardcoding a specific date. This indicates a roadmap item for "Protocol Flexibility" or "MCP Server Compatibility" in future updates.

### 7. User Feedback Summary
Users are experiencing frustration with the lack of support for recent MCP protocol updates. The feedback suggests that while the authentication layer (OAuth) works, the application layer (protocol negotiation) is stuck in the past, rendering the tool unusable with current server standards.

### 8. Backlog Watch
*   **MCP Protocol Version Compatibility:** This issue requires immediate attention from maintainers to update the client initialization logic to support server-defined protocol versions.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

**CoPaw Project Digest**
**Date:** 2026-11-23
**Repository:** agentscope-ai/CoPaw

### 1. Today's Overview
Activity has been notably high today with 6 new issues and 10 new pull requests opened, signaling active development and community engagement. The project is currently undergoing significant frontend stability improvements and addressing Telegram forum routing capabilities. While no new releases have been published, the volume of incoming work suggests a potential update cycle in progress.

### 2. Releases
*No new releases were published in the last 24 hours.*

### 3. Project Progress
*   **Frontend Accessibility Fixes:** Multiple PRs are addressing keyboard navigation issues in the Console, specifically making the message history focusable and fixing scrolling logic.
*   **Telegram Forum Support:** A new feature request has been implemented to isolate agent sessions by Telegram forum topic, addressing a limitation where all topics previously shared a single session.
*   **Context Management UX:** Improvements are being made to the error messaging for failed context compression, guiding users to retry operations instead of suggesting context clearing.
*   **Local Model Control:** Large-scale PRs involving llama.cpp GPU controls and MLX engine management are in progress, likely preparing for enhanced local LLM capabilities.

### 4. Community Hot Topics
*   **[Issue #8852] iOS Console Freezing (High Priority)**
    *   **Status:** Open
    *   **Link:** [agentscope-ai/QwenPaw Issue #8852](https://github.com/agentscope-ai/QwenPaw/issues/8852)
    *   **Analysis:** Users report severe performance degradation (UI freezing) on iOS Safari during long conversations. The issue points to specific CSS properties (`content-visibility:auto` and `column-reverse` list layout) causing layout thrashing.
*   **[Issue #8844] Keyboard Navigation Inaccessibility (High Priority)**
    *   **Status:** Open
    *   **Link:** [agentscope-ai/QwenPaw Issue #8844](https://github.com/agentscope-ai/QwenPaw/issues/8844)
    *   **Analysis:** Users cannot scroll the chat interface using keyboard shortcuts (Arrow keys, PageUp/Down). This renders the console unusable for keyboard-heavy workflows.
*   **[Issue #8856] Web Console Content Clipping (Medium Priority)**
    *   **Status:** Open
    *   **Link:** [agentscope-ai/QwenPaw Issue #8856](https://github.com/agentscope-ai/QwenPaw/issues/8856)
    *   **Analysis:** Tables and long lines of text in assistant responses are being cut off horizontally without scrollbars, breaking the display of structured data.

### 5. Bugs & Stability
*   **iOS WebKit Performance Regression:** Reported by `yaozy2020`. The Console freezes on long conversations due to CSS rendering issues. **Status:** Open. A fix is being discussed in the context of accessibility fixes.
*   **Keyboard Scrolling Failure:** Reported by `caldefoc`. The scroll container is not focusable. **Status:** Open. A fix PR (#8854) has been opened.
*   **Content Truncation:** Reported by `jycodes`. Markdown tables are cut off. **Status:** Open.

### 6. Feature Requests & Roadmap Signals
*   **Telegram Forum Topic Isolation:** Implemented via PR #8857. Previously, all topics in a Telegram forum were routed to the same session. This change allows for topic-specific agent sessions and memories.
*   **Context Compression UX:** PR #8853 addresses the feedback that the error message `/clear` is misleading when compression fails. The new suggestion is to retry `/compact`, helping users recover without losing context.

### 7. User Feedback Summary
*   **WeChat Integration Frustration:** A user reported that the WeChat integration is incomplete, noting missing key bindings (no feedback on "working"), inability to be added to groups, and UI/Server sync errors (503).
*   **Confusion on Context Management:** Users are confused by the "Compact Failed" error message, fearing they need to clear their context when in reality they might just need to retry the operation.

### 8. Backlog Watch
*   **[Issue #2674] WeChat Functionality:** A longstanding issue (created March 2026) regarding WeChat integration. It remains open with 3 comments and 0 likes, indicating a feature gap that has not yet been resolved.
*   **[PR #8588] OpenViking Cleanup:** A large PR (#8588) related to memory plugin cleanup and compatibility was updated recently. Given its size (XXL) and age (last updated Nov 5), it may require careful review before merging.

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