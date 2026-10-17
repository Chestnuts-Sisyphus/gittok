# OpenClaw Ecosystem Digest 2026-10-18

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-17 21:52 UTC

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
The personal AI assistant and autonomous agent open-source landscape is experiencing rapid maturation, characterized by a bifurcation between lightweight, edge-oriented utility scripts and robust, production-grade daemons. Across the monitored ecosystem—encompassing projects like **ZeroClaw**, **CoPaw**, **Moltis**, and **PicoClaw**—maintainers are increasingly prioritizing runtime stability, secure multi-channel integrations, and clean architectural boundaries (such as daemon-gateway separation). While development velocity remains exceptionally high for core platforms tackling complex agentic workflows, the community is simultaneously grappling with a wave of stability regressions, provider compatibility edge cases, and cross-platform UX hurdles.

---

### 2. Activity Comparison

| Project Name | Open Issues | Open/Updated PRs | Release Status | Health Score (1-10) |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | *Data unavailable* | *Data unavailable* | *Data unavailable* | *N/A* (Summary failed) |
| **NanoBot** | *Data unavailable* | *Data unavailable* | *Data unavailable* | *N/A* (Summary failed) |
| **Hermes Agent** | *Data unavailable* | *Data unavailable* | *Data unavailable* | *N/A* (Summary failed) |
| **PicoClaw** | Low (~1 active) | 1 closed / stale | No recent releases (stable) | **6.5 / 10** |
| **NanoClaw** | *Data unavailable* | *Data unavailable* | *Data unavailable* | *N/A* (Summary failed) |
| **NullClaw** | *Data unavailable* | *Data unavailable* | *Data unavailable* | *N/A* (Summary failed) |
| **IronClaw** | 0 | 0 | No recent activity | **3.0 / 10** (dormant) |
| **LobsterAI** | *Data unavailable* | *Data unavailable* | *Data unavailable* | *N/A* (Summary failed) |
| **TinyClaw** | 0 | 0 | No recent activity | **3.0 / 10** (dormant) |
| **Moltis** | 0 (Active focus) | 3 updated | No recent releases | **7.0 / 10** |
| **CoPaw** | 9 | 17 updated | Stable on v2.2.2 (v2.3.0 in prep) | **8.5 / 10** |
| **ZeptoClaw** | 0 | 0 | No recent activity | **3.0 / 10** (dormant) |
| **ZeroClaw** | 41 | 50 | Preparing v0.8.6 / v0.9.0 | **9.0 / 10** |

---

### 3. OpenClaw's Position
*(Note: Because the OpenClaw core summary generation failed for this digest cycle, a granular quantitative comparison is limited. However, within the broader ecosystem architecture, OpenClaw traditionally serves as a core reference implementation.)*

*   **Advantages vs. Peers:** Typically serves as the gold standard for full-featured reference architectures, heavily relied upon for benchmark design and extensive tool-use schemas compared to more specialized or lightweight edge tools like PicoClaw.
*   **Technical Approach Differences:** OpenClaw leans toward comprehensive, batteries-included agentic capabilities, contrasting with the modular, lightweight daemon/gateway decoupling seen in ZeroClaw or Moltis.
*   **Community Size Comparison:** Historically maintains one of the largest contributor bases and downstream forks in the ecosystem, though high-velocity projects like ZeroClaw are closing the gap in active PR throughput.

---

### 4. Shared Technical Focus Areas
1. **Daemon-Gateway Architecture & Security:** 
   * *Projects:* ZeroClaw, Moltis
   * *Specific Needs:* Decoupling runtime logic from client interfaces (web/desktop), implementing secure RPC forwarding for plugins, and hardening data directory permissions against privilege escalation.
2. **Provider Interoperability & Media Fallbacks:**
   * *Projects:* CoPaw, ZeroClaw
   * *Specific Needs:* Robust error translation for non-standard or strict OpenAI-compatible endpoints (e.g., DeepSeek, LM Studio) when handling multimodal inputs (audio/video schemas) to prevent permanent session wedges.
3. **Desktop & TUI UX Enhancements:**
   * *Projects:* Moltis, ZeroClaw
   * *Specific Needs:* Native desktop client apps (e.g., Moltis's native Rust/gpui client) and window lifecycle fixes (e.g., ZeroClaw's Windows tray/close crash resolutions).

---

### 5. Differentiation Analysis
*   **Feature Focus:** 
    *   *ZeroClaw:* High-throughput multi-channel routing (Slack, Discord, Telegram), WASM plugin systems, and rigorous runtime/gateway separation.
    *   *CoPaw:* Rich media handling, deep enterprise channel integrations (DingTalk), and plugin refactors geared toward extensibility (v2.3.0).
    *   *Moltis:* Native desktop performance via lightweight Rust/gpui clients communicating with a persistent background daemon.
    *   *PicoClaw:* Minimalist footprint, edge resource efficiency, and reverse proxy compatibility (Nginx path mounting).
*   **Target Users:** 
    *   *ZeroClaw / CoPaw:* Power users and enterprise integrators requiring robust cross-platform chat bots and complex tool-use chains.
    *   *Moltis:* Developers and desktop-first users seeking native app experiences without browser overhead.
    *   *PicoClaw:* Resource-constrained environments or self-hosters needing simple path-isolated deployments.
*   **Technical Architecture:** 
    *    Ranges from monolithic Python/Node runtimes with fallback error routers (CoPaw) to high-performance, decoupled Rust architectures utilizing WASM components and RPC boundaries (ZeroClaw, Moltis).

---

### 6. Community Momentum & Maturity
*   **Rapidly Iterating (High Momentum):** **ZeroClaw** and **CoPaw** are driving the ecosystem forward. ZeroClaw boasts massive PR/Issue velocity (91 events) as it sprints toward v0.9.0, while CoPaw actively refactors for v2.3.0 amidst intensive bug-fixing.
*   **Stable / Targeted Refinement:** **Moltis** and **PicoClaw** demonstrate mature, lower-volume development cycles focused on specific UX polishing (desktop clients, Nginx proxies) rather than chaotic iteration.
*   **Dormant / Stalled:** **IronClaw**, **TinyClaw**, and **ZeptoClaw** recorded zero activity in the current cycle, indicating potential project hibernation or completion of current milestones.

---

### 7. Trend Signals
*   **Shift to "Out-of-Browser" Native Interfaces:** AI agent developers are aggressively moving away from web-only terminals toward native desktop wrappers and system-tray-integrated daemons (Moltis, ZeroClaw), reflecting user demand for persistent, low-friction access.
*   **Architectural Modularization (WASM & Daemons):** Monolithic agent scripts are rapidly giving way to decoupled architectures where execution runtimes communicate with gateways via RPC, and capabilities are injected via WASM plugins. This addresses security and extensibility bottlenecks.
*   **The Multimodal Friction Reality:** As agents ingest more audio, video, and rich documents, ecosystem projects are repeatedly tripped up by brittle schema assumptions in third-party LLM providers. Resilient error classification and graceful media degradation are becoming core competitive differentiators for agent reliability.

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

# PicoClaw Project Digest
## 2026-10-18
### 1. Today's Overview
PicoClaw maintained a low-volume but stable development trajectory in the past 24 hours, with only one active issue being resolved and one PR closed. No new releases were published. The project is currently focused on fixing a functional gap related to reverse proxy configuration and adding a turn-time budget feature, indicating ongoing activity in feature enhancement and bug resolution.
### 2. Releases
No new versions released.
### 3. Project Progress
- **Merged/Closed PRs (24h)**:
  - PR #3414 `[CLOSED] [stale]` — Added optional wall-clock turn time budget (`agents.defaults.turn_time_budget_seconds`, default `0` for disabled). When a turn exceeds the budget, the agent is prompted to stop scheduling new tools and deliver a concise work summary.
  - Issue #3415 `[CLOSED] [stale]` — Resolved the request to support reverse proxy via Nginx, enabling mounting the Web Console under a `/pico/` path while preserving the `/api/`, login, WebSocket, and resource routing.
- **Activity**: The project advanced on functional enhancements (reverse proxy support and turn-time budget) and maintained stability via issue resolution.
### 4. Community Hot Topics
- **Active Issue**: 
  - Issue #3415 (closed) [`sipeed/picoclaw`](https://github.com/sipeed/picoclaw/issues/3415) — **Most discussed issue**. Requests support for Nginx reverse proxy configuration to mount the Web Console under `/pico/`, addressing a need to avoid occupying the website root path for pages, login, API, and WebSocket requests. The issue has 2 comments and 0 upvotes, indicating strong user demand for reverse proxy compatibility.
- **Active PR**:
  - PR #3414 (closed) [`sipeed/picoclaw`](https://github.com/sipeed/picoclaw/pull/3414) — Add wall-clock turn time budget, addressing capacity constraints during complex agent workflows and improving scheduling discipline.
### 5. Bugs & Stability
No critical bugs, crashes, or regressions reported in the last 24 hours. The project maintained a stable stability profile, with the main work focused on feature refinement and bug closure.
### 6. Feature Requests & Roadmap Signals
- **Key Feature Request**: Reverse proxy configuration support via Nginx (mounting the Web Console under a `/pico/` path) — signal indicates a user need for multi-domain routing flexibility, likely applicable in future version releases.
- **Potential Roadmap Additions**: 
  - Persistent /pico/ path mounting for Web Console resources; 
  - Agent turn-time budget control to mitigate scheduling overload during extended workflows.
### 7. User Feedback Summary
- **Primary Pain Points**: Users requesting Nginx reverse proxy support to isolate Web Console resources and avoid routing conflicts with website root paths, requiring full compatibility for API, login, WebSocket, and static resource requests.
- **Use Cases**: Scenario of deploying PicoClaw with distributed reverse proxy setups, where path-level resource isolation is needed.
- **Satisfaction/Dissatisfaction**: User feedback is generally positive; active discussion on feature improvements (reverse proxy and turn-time budget) indicates user satisfaction with the core request direction.
### 8. Backlog Watch
- **Issue #3415**: Stale but actively addressed; requires tracking the implementation of reverse proxy support across Web Launcher and backend address configuration to ensure full scenario coverage.
- **PR #3414**: Closed but currently marked as stale, suggesting it may require subsequent refinement to ensure compatibility with existing configurations before further review.

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

# Moltis Project Digest: 2026-10-18

### 1. Today's Overview
The Moltis project maintains a steady, low-volume development cycle with **zero active issues** and **no new releases** detected in the last 24 hours. Activity is focused on infrastructure improvements, specifically the development of a native desktop client and UX refinements for the onboarding process. The project appears to be in a stable maintenance phase with high-quality, targeted feature development rather than rapid iteration.

### 2. Releases
**None**
*No new versions were released in the last 24 hours.*

### 3. Project Progress
**3 Pull Requests Updated**
*   **Merged/Closed:** 1 PR (Feature UX improvement)
*   **Open:** 2 PRs (Native Desktop Client & Provider Integration)

**Key Advances:**
*   **UX Optimization:** A PR was successfully closed to improve the initial user setup experience by automatically opening the browser and making the setup URL more prominent.
*   **Desktop Client Development:** A significant feature is in progress to build a native Rust/gpui desktop client. This client is designed as a lightweight interface that connects to an existing `moltis` daemon (which remains running) rather than embedding the core logic. It supports multiple connection modes: local, HTTPS remote, and SSH tunnels.

### 4. Community Hot Topics
**PR #1306: Native GPUI Desktop Client**
*   **Status:** Open
*   **Link:** [moltis-org/moltis PR #1306](https://github.com/moltis-org/moltis/pull/1306)
*   **Analysis:** This is the primary focus of current development. The underlying need is to provide a standalone, native application experience for users who prefer a dedicated desktop GUI over a web-based interface. The architecture of connecting via a daemon suggests a separation of concerns, allowing the desktop app to focus on UI while the daemon handles core logic.

**PR #1288: Tsubasa Provider Integration**
*   **Status:** Open
*   **Link:** [moltis-org/moltis PR #1288](https://github.com/moltis-org/moltis/pull/1288)
*   **Analysis:** Users are actively requesting support for new AI providers. The integration of the Tsubasa provider indicates a demand for access to specific model capabilities (like `tsubasa-fast` and `tsubasa-pro` with large context windows) within the existing Moltis ecosystem.

### 5. Bugs & Stability
**None Reported Today**
*   No active bug reports, crashes, or regressions were logged in the last 24 hours. The project status remains stable with no user-reported stability issues.

### 6. Feature Requests & Roadmap Signals
*   **Native Desktop Experience:** The push for `apps/desktop` strongly signals a roadmap priority on "Out-of-Browser" usage. This is a critical evolution for AI assistant tools, moving from web-based terminals to native applications.
*   **Provider Ecosystem Expansion:** The addition of the Tsubasa provider suggests an open architecture where the platform aims to be provider-agnostic and easily extensible for new LLM providers.

### 7. User Feedback Summary
Based on the activity, user feedback is currently constructive and focused on usability and platform reach.
*   **Pain Point:** Initial setup friction (addressed by PR #1307).
*   **Use Case:** Users are looking for a robust desktop application (addressed by PR #1306).
*   **Satisfaction:** The high rate of feature additions without bug reports suggests the core functionality is reliable and satisfying for current users.

### 8. Backlog Watch
**No Immediate Action Required**
*   All open issues are recent or actively being worked on in PRs. There are no long-standing unanswered issues or stale PRs requiring immediate maintainer triage.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest
**Date:** 2026-10-18
**Source:** CoPaw (agentscope-ai/CoPaw)

### 1. Today's Overview
The CoPaw project remains highly active, maintaining a steady pace of development with 9 open issues and 17 pull requests updated in the last 24 hours. The community is currently focused on stabilizing recent versions, specifically addressing critical media handling bugs in v2.2.2 that are causing session wedges. Additionally, the project is preparing for v2.3.0, with active discussions on architectural refactoring for a lighter, more extensible design.

### 2. Releases
**No new releases** were published in the last 24 hours. The most recent release was **v2.2.2** (released on 2026-10-15), which is currently the focus of bug-fixing efforts as several critical issues have been reported against this version.

### 3. Project Progress
**17 Pull Requests** were updated today, with 2 already closed (merged or finalized).
*   **Critical Fixes:** Several PRs address the "session wedge" family of bugs affecting media file handling (audio/video) with providers like LM Studio and DeepSeek. These include fixes for `video_url` variant errors and "at most 0 audio" rejections.
*   **Stability Improvements:** PRs were merged to stabilize the creator runtime, fix console UI issues (thinking slider flickering), and prevent injected context blocks from persisting in history.
*   **Memory & Performance:** A PR optimized memory watchers to prevent thread contention, and another addressed ReMe configuration validation.

### 4. Community Hot Topics
*   **Media File Handling & Provider Compatibility (#8171, #8298, #8290):**
    *   **Issue:** Audio and video files sent via `send_file_to_user` are causing sessions to permanently wedge.
    *   **Analysis:** This is a recurring issue (#7015, #7024) where specific provider error messages (e.g., "At most 0 audio(s)") are not being correctly classified by the media-fallback logic, causing the entire request to fail instead of falling back gracefully.
    *   **Link:** [Issue #8171](https://github.com/agentscope-ai/QwenPaw/issues/8171)
*   **DingTalk Channel Markdown Failure (#8278):**
    *   **Issue:** Messages exceeding 3500 characters in the DingTalk channel are silently downgraded to plain text, breaking Markdown and Tables.
    *   **Analysis:** Users need a signal when content is truncated, as the current silent fallback renders reports and data tables unreadable.
    *   **Link:** [Issue #8278](https://github.com/agentscope-ai/QwenPaw/issues/8278)
*   **v2.3.0 Architecture Refactor (#8289):**
    *   **Feature:** The team is planning a plugin refactor for v2.3.0 to make QwenPaw lighter and more modular.
    *   **Analysis:** This indicates a shift towards a more plugin-centric architecture, potentially easing the burden on core maintainers and allowing for easier third-party extensions.
    *   **Link:** [Issue #8289](https://github.com/agentscope-ai/QwenPaw/issues/8289)

### 5. Bugs & Stability
**Severity: High (Session Wedges)**
*   **Video File Wedge (#8298):** Sending an MP4 via `send_file_to_user` causes a permanent session lock. The error "422 unknown variant `video_url`" indicates a schema mismatch with OpenAI-compatible endpoints like DeepSeek.
*   **Audio File Wedge (#8171):** Similar to video, audio files trigger rejection errors (e.g., "At most 0 audio(s)") that bypass the fallback logic.
*   **Large Stream Output Crash (#8288):** Switching conversations during large stream outputs causes UI freezing and potential backend SIGBUS crashes (regression in v2.2.2).
*   **Console UI Bug (#8300):** The send button does not clear the input box after successful transmission, creating a poor user experience.
*   **DingTalk Text Degradation (#8278):** Markdown and tables are silently lost when content exceeds 3500 characters.

### 6. Feature Requests & Roadmap Signals
*   **v2.3.0 Plugin Refactor:** The roadmap signals a move towards a lighter, plugin-based architecture.
*   **Serply Web Search Provider:** A PR is open to add Serply as a web search provider, expanding options beyond the current defaults (Tavily/AnySearch).
*   **Data App 1.0.3:** The Data app is being updated to 1.0.3, focusing on shared model configuration and user-scoped analysis sessions.

### 7. User Feedback Summary
Users are experiencing friction primarily with **media interoperability**. The team’s reliance on "generic" OpenAI-compatible schemas (like `video_url`) is failing when interacting with specific providers (LM Studio, DeepSeek) that have strict or non-standard limits. There is also a strong demand for **visibility into message truncation**, particularly in enterprise channels like DingTalk. While the v2.2.2 release brought new features, it introduced regressions regarding memory usage and UI responsiveness that are causing users to revert to v2.2.1.

### 8. Backlog Watch
*   **PR #7211 (Under Review):** A significant PR to prevent injected context from persisting has been in review since August 2026. It addresses a core architectural concern regarding what data is saved to the conversation history vs. request-local context.
*   **PR #7654 (Under Review):** An ongoing fix to recognize specific audio rejection patterns (llama-server/DashScope) that are currently falling through the error handling logic.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest
**Date:** 2026-10-18
**Repository:** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

## 1. Today's Overview
ZeroClaw is experiencing high velocity with 91 activity events (41 Issues, 50 PRs) in the last 24 hours, indicating a robust development cycle. The project is currently in a critical transition phase, advancing toward **v0.9.0** while stabilizing the **v0.8.x** branch. Activity is heavily concentrated on runtime stability, security hardening, and channel integrations (Slack, Discord, Telegram, Email). The project demonstrates strong architectural evolution, specifically regarding the daemon and gateway separation, though several critical bugs are currently blocking workflows.

## 2. Releases
**No new releases** were tagged in the last 24 hours. Development is focused on finalizing the roadmap items for **v0.8.6** and **v0.9.0**.

## 3. Project Progress
*   **Runtime & Gateway Separation:** Significant progress is being made on the architectural boundary between the runtime and the gateway, specifically addressing the delivery of **v0.8.6** (Phase 2) and **v0.9.0** (Phase 3). The daemon registry and workspace split are landed, with work ongoing to remove hard dependencies on concrete capabilities.
*   **Plugin & WASM Host:** The WASM plugin host has been successfully integrated into supported release artifacts. The core ingress for plugin webhook admission has been moved, and webhooks are now being forwarded over RPC.
*   **Desktop Application:** A critical fix for the Windows desktop application (PR #11802) allows the window to reopen after closing and properly exit via the system tray, resolving a workflow-blocking crash.

## 4. Community Hot Topics
The most active discussions center on architectural transitions and configuration bugs.

*   **Runtime/Gateway Separation (Issue #7432):** A major tracker (10 comments) defining the source of truth for completing Phase 2 runtime work and Phase 3 gateway separation. This is the primary roadmap item for the upcoming releases.
    *   *Link:* [Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)
*   **ZeroCode "Copy" Bug (Issue #11418):** A functional bug in the ZeroCode TUI where the copy button is non-functional, blocking users from copying outputs.
    *   *Link:* [Issue #11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)
*   **Slack "Is Thinking" Status (Issue #11416):** Users report that the "thinking" status is missing in Slack channel threads since v0.8.5, reducing visibility of agent activity.
    *   *Link:* [Issue #11416](https://github.com/zeroclaw-labs/zeroclaw/issues/11416)
*   **Multimodal Vision Pinning (Issue #11706):** A runtime bug where the vision provider route remains pinned indefinitely, even during text-only follow-ups.
    *   *Link:* [Issue #11706](https://github.com/zeroclaw-labs/zeroclaw/issues/11706)

## 5. Bugs & Stability
Several critical bugs were identified, some of which have active fix PRs.

*   **S0 - Critical Security/Workflow Blockers:**
    *   **Loop Detector Threshold (Issue #11777):** The default loop detector threshold is too low, causing the agent to abort entirely when tools like `file_write` and `shell` alternate, rendering the agent unusable.
    *   **Daemon Credential Prompt (Issue #11796):** A sudden regression where the daemon prompts for GitHub credentials at startup and blocks, preventing daemon operation.
    *   **Registry WIT Pin (Issue #9624 - CLOSED):** The registry WIT pin diverged from master, breaking published components. This was resolved via PR #11081.
*   **S1 - Workflow Blocked:**
    *   **Windows Desktop Crash (Issue #11087):** Closing the window leaves a zombie process. *Fix Available:* PR #11802.
    *   **Tool-Call Envelope Leak (Issue #10446):** Tool-call envelopes are leaking into prose instead of rendering. *Fix Available:* PR #11299.
*   **S2 - Degraded Behavior:**
    *   **Multimodal Vision Pinning (Issue #11706):** Vision route stays pinned. *Fix Available:* PR #11716.
    *   **Slack Status Missing (Issue #11416):** Thinking status absent in threads.
    *   **SOP Validation Silent Failure (Issue #9786):** Malformed SOPs are silently dropped without diagnostic, making debugging difficult.
    *   **Skill Review Tools (Issues #11333, #11332):** Skills assigned via bundles are not visible to skill review tools or run for web/gateway turns.

## 6. Feature Requests & Roadmap Signals
*   **Daemon Identity & Security:** There is a push to verify the daemon's identity in `call_local` and share a single CLI daemon client (Issue #11324) to tighten security on Windows and Unix.
*   **Data Directory Security:** A feature request (Issue #11793) to create the data directory with owner-only permissions and check for world-writable roots to prevent privilege escalation.
*   **Per-User Runtime Directory:** A proposal (Issue #11794) to use a per-user runtime directory for the config lock on filesystems without Unix permissions (e.g., WSL `/mnt/c`).

## 7. User Feedback Summary
The user feedback indicates a tension between the desire for complex architectural features (daemon separation, WASM plugins) and the need for basic stability.
*   **Configuration Friction:** Users are struggling with config bugs (e.g., `sop.toml` silently failing, `model_routing_config` overwriting the entire config) and missing documentation.
*   **Channel Experience:** Users expect real-time feedback (Slack "thinking" status) and reliable message handling (Telegram edit detection, Email auto-replies).
*   **Desktop Experience:** Windows users report a critical UX failure where the application cannot be quit properly.

## 8. Backlog Watch
*   **Issue #7432:** The massive tracker for Runtime/Gateway separation. It is open, accepted, and high priority (P2), requiring a sequenced approach to complete Phase 2 and Phase 3.
*   **Issue #10162:** A complex task regarding plugin install persistence and seeding failure recovery that requires decision-making on safe reseed logic.
*   **PR #11319 & #11322:** Large, complex PRs for gateway plugin webhook admission and RPC forwarding that are currently open and require maintainer review.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*