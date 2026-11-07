# OpenClaw Ecosystem Digest 2026-11-08

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-07 23:15 UTC

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
The open-source personal AI assistant and autonomous agent ecosystem is experiencing a high-velocity phase of maturation, transitioning from experimental proof-of-concepts to hardened, enterprise-ready infrastructure. Driven by frameworks like NanoBot, NanoClaw, ZeroClaw, and CoPaw, development efforts are rapidly shifting toward multi-channel integrations, secure runtime sandboxing, and granular access controls. Across the board, maintainers are prioritizing stability, context window expansion, and provider-agnostic abstractions to handle the increasing complexity of long-running, multi-turn agent workflows.

---

### 2. Activity Comparison

| Project | Active Issues (24h) | Active PRs (24h) | Release Status | Health Score / Status |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | *Data unavailable* | *Data unavailable* | *Data unavailable* | ⚠️ Summary generation failed (Core Reference) |
| **NanoBot** | 3 updated | 6 modified (1 merged) | No new release | Stable; backlogged goal-loop fixes |
| **Hermes Agent** | *Data unavailable* | *Data unavailable* | *Data unavailable* | ⚠️ Summary generation failed |
| **PicoClaw** | *Data unavailable* | *Data unavailable* | *Data unavailable* | ⚠️ Summary generation failed |
| **NanoClaw** | 0 new reported | 26 submitted (8 merged) | No new release | High velocity; active feature/channel delivery |
| **NullClaw** | *Data unavailable* | *Data unavailable* | *Data unavailable* | ⚠️ Summary generation failed |
| **IronClaw** | *Data unavailable* | *Data unavailable* | *Data unavailable* | ⚠️ Summary generation failed |
| **LobsterAI** | *Data unavailable* | *Data unavailable* | *Data unavailable* | ⚠️ Summary generation failed |
| **TinyClaw** | 0 | 0 | No new release | Inactive (No activity in 24h) |
| **Moltis** | 3 updated | 2 modified (1 merged) | No new release (v0.10.2 asset bug) | Stable maintenance; packaging blockers |
| **CoPaw** | 4 updated | 6 modified | No new release | Moderate; stabilizing v2.3.x beta |
| **ZeptoClaw** | 0 | 0 | No new release | Inactive (No activity in 24h) |
| **ZeroClaw** | 23 updated | 34 modified | Preparing v0.9.0 | High activity; intensive security/RBAC hardening |

---

### 3. OpenClaw's Position
*Note: Due to summary generation failure for the core reference repository (OpenClaw), a direct point-by-point feature comparison is constrained; however, its ecosystem footprint can be contextualized via peer projects.*
* **Peer Relationship:** Projects like NanoClaw, ZeroClaw, and NanoBot often serve as modular extensions, lightweight alternatives, or specialized sandboxing implementations relative to full-featured core references like OpenClaw. 
* **Technical Approach Differences:** While core reference architectures often aim for monolithic or highly extensible multi-agent frameworks, ecosystem peers are aggressively unbundling specific layers—such as ZeroClaw focusing strictly on RPC/session security hardening, and NanoClaw focusing on containerized local execution.

---

### 4. Shared Technical Focus Areas
* **Expanded Provider Ecosystem (Extended Contexts & New Gateways):** 
  * *Projects:* NanoBot, Moltis.
  * *Specific Need:* Integration of OpenAI-compatible endpoints with extended context windows (e.g., the newly added Tsubasa provider offering `tsubasa-fast` and `tsubasa-pro` with 32k context) and native image generation endpoints (OpenRouter Image API).
* **Security, Authorization, and Session Isolation:**
  * *Projects:* ZeroClaw, NanoClaw.
  * *Specific Need:* Hardening multi-tenant agent boundaries. ZeroClaw is actively patching RPC cron authorization bypasses and session ownership scoping, while NanoClaw focuses on secure host log rotations and admin API local bindings (`127.0.0.1`).
* **Multi-Modal Channel Attachment Parsing:**
  * *Projects:* NanoBot, NanoClaw.
  * *Specific Need:* Fixing silent data drops when processing rich text payloads and file attachments simultaneously (e.g., Feishu P2P `post` payloads dropping top-level file arrays in NanoBot).

---

### 5. Differentiation Analysis
* **ZeroClaw (Security & Infrastructure First):** Focuses heavily on rigorous RBAC, OIDC browser-binding, session-effect handling, and daemon web dashboards over ZeroRelay. Targets enterprise or security-conscious self-hosters.
* **NanoClaw (Feature Velocity & Channel Breadth):** Rapidly iterating on desktop/host integration (Proton Mail adapters, OneCLI admin API, Windows/WSL compatibility, KPI/chart card rendering). Targets power users seeking rich messaging integrations.
* **NanoBot & CoPaw (Lightweight Agent Loops & UX Refinement):** Concentrates on resolving agent runtime loops (e.g., turn-idle token waste during `/goal` sequences) and cross-platform UI stability (e.g., Windows IoT LTSC compatibility, day-night web themes).

---

### 6. Community Momentum & Maturity
* **Rapidly Iterating & High Momentum:** 
  * *ZeroClaw* and *NanoClaw* lead the ecosystem in velocity, handling dozens of concurrent pull requests and tackling complex architectural refactors (e.g., ZeroClaw's preparation for `v0.9.0` and ZeroClaw/NanoClaw's security hardening).
* **Stabilizing & Maintaining:**
  * *NanoBot*, *Moltis*, and *CoPaw* are in stabilization phases. They are heavily focused on ironing out regression bugs (e.g., Moltis v0.10.2 missing release assets, CoPaw Windows 11 IoT hang, NanoBot idle goal-loop capping).
* **Dormant / Low Activity:**
  * *TinyClaw* and *ZeptoClaw* show zero activity in the 24-hour window, indicating potential project stagnation or lifecycle completion.

---

### 7. Trend Signals
* **Agent Loop Governance & Token Cost Control:** Community frustration over runaway autonomous loops (e.g., NanoBot's `/goal` spamming behavior) highlights an industry-wide need for deterministic iteration budgets and robust "waiting-for-user-input" state recognition.
* **Security as a Pre-Release Gate:** The concentration of pull requests on authorization, session ownership scoping, and OAuth/OIDC binding (notably in ZeroClaw) signals that personal AI assistants are moving past the prototype stage; developers are refusing to ship major versions without strict multi-tenant boundaries.
* **Ecosystem Standardization on OpenAI-Compatible Endpoints:** The swift adoption of alternative providers like Tsubasa across multiple independent frameworks demonstrates that maintaining a decoupled, OpenAI-compatible gateway layer is the most efficient strategy for rapidly expanding an agent's model choices.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

Here is the project digest for **NanoBot** for November 8, 2026.

---

### 1. Today's Overview
The NanoBot project saw steady development activity over the past 24 hours, with 3 active issues updated and 6 pull requests modified (1 closed/merged, 5 open). Key engineering efforts focused on resolving runaway agent loops during turn-idle states, handling provider-specific API constraints (such as DeepSeek's vision guidelines), and expanding provider integrations (OpenRouter Image API, Standard Compute, Tsubasa). Overall repository health remains stable, though long-standing agent goal execution bugs and older PRs in the backlog require maintainer review.

---

### 2. Project Progress
* **Merged / Closed PRs:**
  * [#6594](https://github.com/HKUDS/nanobot/pull/6594): `feat(webui): refine day-night themes and interaction continuity` — Refined the WebUI interface by adding dark-mode artwork, matching night themes, and cleaning up ambient glow styling across entry/conversation surfaces.

---

### 3. Community Hot Topics
* **Agent Loop on Idle Turn ([#5256](https://github.com/HKUDS/nanobot/issues/5256)):** 
  * **Discussion:** Issue [#5256](https://github.com/HKUDS/nanobot/issues/5256) (3 comments, 1 👍) highlights a severe behavior where sending a `/goal` message causes NanoBot to generate dozens of repeated replies while awaiting a response from the user. 
  * **Underlying Need:** Users need agent execution loops to recognize when they are waiting on human input rather than exhausting iteration budgets with repeated "continue" nudges.

* **DeepSeek Vision API Role Mismatch ([#6584](https://github.com/HKUDS/nanobot/issues/6584)):**
  * **Discussion:** Analysis of DeepSeek Chat Completions contract shows that image tool results are being formatted in non-user roles, violating DeepSeek's restriction requiring image data to reside exclusively in `user` messages.

---

### 4. Bugs & Stability

1. **[High] Sustained Goal Repetitive Loop:**
   * **Issue:** [#5256](https://github.com/HKUDS/nanobot/issues/5256) — Agent sends dozens of near-identical replies while waiting for user input until intervention or budget exhaustion.
   * **Fix Available:** [#5257](https://github.com/HKUDS/nanobot/pull/5257) proposes capping sustained-goal text-only continuation attempts to a maximum of two consecutive turns when idle.

2. **[Medium] Feishu Rich Text File Attachment Dropping:**
   * **Issue:** [#6596](https://github.com/HKUDS/nanobot/issues/6596) — When users send text and files together in Feishu P2P chat (`post` rich text payload), top-level attachments in the `files` array are silently dropped because the parser only inspects `content` rows.
   * **Fix Available:** None yet.

3. **[Medium] DeepSeek Image Tool Result Role Error:**
   * **Issue:** [#6584](https://github.com/HKUDS/nanobot/issues/6584) — Image tool output payloads break under DeepSeek Chat Completions due to unsupported message roles.
   * **Fix Available:** None yet.

---

### 5. Feature Requests & Roadmap Signals
* **Sandbox Verification & Trusted Launchers ([#6595](https://github.com/HKUDS/nanobot/pull/6595)):** Introduces a gateway-owned sandbox diagnostic check using temporary files and production wrappers without needing model calls or altering existing workspace files. Adds `tools.exec.sandboxLaunchers`.
* **Expanded Provider Ecosystem:**
  * **OpenRouter Image API ([#5718](https://github.com/HKUDS/nanobot/pull/5718)):** Native support for OpenRouter's image generation endpoint.
  * **Standard Compute Provider ([#6199](https://github.com/HKUDS/nanobot/pull/6199)):** Built-in OpenAI-compatible gateway integration for Standard Compute.
  * **Tsubasa Metadata Catalog ([#5947](https://github.com/HKUDS/nanobot/pull/5947)):** Support for `tsubasa-fast` and `tsubasa-pro` models via `${TSUBASA_API_KEY}`.

---

### 6. User Feedback Summary
* **Token Waste & Spam:** Users running goal-oriented prompts (`/goal`) report excessive token consumption and platform spam when the model enters automatic prompt repetition loops.
* **Platform Integration Loss:** Feishu chat users experience silent data loss when attachments are attached alongside post text, causing loss of context in multi-modal interactions.

---

### 7. Backlog Watch
* **[#5257](https://github.com/HKUDS/nanobot/pull/5257) (Fix for sustained goal infinite loops):** Created in August 2026, this PR resolves the critical goal loop bug [#5256](https://github.com/HKUDS/nanobot/issues/5256) but currently has merge conflicts and needs maintainer attention.
* **[#5718](https://github.com/HKUDS/nanobot/pull/5718) (OpenRouter Native Image API):** Open since September 2026; awaits final review for native image model dispatch.
* **[#5947](https://github.com/HKUDS/nanobot/pull/5947) (Tsubasa Provider Metadata):** Open since September 2026; pending review to complete provider catalog registration.

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

# NanoClaw Project Digest
## 2026-11-08
### 1. Today's Overview
NanoClaw experienced steady, active development activity over the past 24 hours, with 26 pull requests submitted (18 open, 8 merged) and zero new releases. The project is releasing around code, refactoring dependencies, and advancing core feature work such as agent card enhancement and channel adapters. Overall, activity indicates strong delivery momentum with the focus on bug fixes and maintenance across multiple areas including channels, skills, and infrastructure.
### 2. Releases
No new releases were released as of 2026-11-08.
### 3. Project Progress
- **Active PRs (26 total):**
  - 8 PRs were merged/closed, including dependency updates (PR #4293: prettier 3.9.10 bump), feature development (PR #4292: `send_card` fields, tables and charts), and channel infrastructure (PR #4218: Proton Mail adapter), plus fixes for channel card errors (PR #4168, #4171, #4147, #4156) and build fixes (PR #4290, #4291, #4292).
- **Recent feature advances:** Enhanced `send_card` functionality to include KPI fields, tables and charts; added `/add-log-rotation` skill for host logs; improved agent approval card display and security compliance fixes across multiple channel/adapter areas.
- **Maintenance improvements:** Workflow runner pinning to `ubuntu-26.04`; OneCLI admin API and Postgres publishing on localhost; ncl socket named pipe fix for Windows; global memory bug fixes; jq installation for channel setup.
### 4. Community Hot Topics
- **PR #4293** ([OPEN]) — Bumped prettier to 3.9.10 and reformatted core source files, addressing formatting consistency for Dependabot checks. Link: [nanocoai/nanoclaw PR #4293](https://github.com/nanocoai/nanoclaw/pull/4293)
- **PR #4292** ([OPEN]) — Added KPI fields, tables and charts to `send_card` cards, improving agent card presentation. Link: [nanocoai/nanoclaw PR #4292](https://github.com/nanocoai/nanoclaw/pull/4292)
- **PR #4218** ([OPEN]) — Added native Proton Mail adapter for channels, extending channel capabilities. Link: [nanocoai/nanoclaw PR #4218](https://github.com/nanocoai/nanoclaw/pull/4218)
- **PR #4199** ([OPEN]) — Published OneCLI's admin API and Postgres on `127.0.0.1`, improving local Linux deployment stability. Link: [nanocoai/nanoclaw PR #4199](https://github.com/nanocoai/nanoclaw/pull/4199)
### 5. Bugs & Stability
No critical bugs or crashes were reported in the last 24 hours, with no newly reported issues.
- **Fix PRs active:** PRs focused on stability improvements, including channel card click handling resolution (PR #4168, #4171), build type loading fixes (PR #4290, #4291, #4292), and setup/delivery stability fixes (PR #4202, #4199, #4057).
- **Backlog watch:** No open critical issues requiring urgent attention as of the latest digest.
### 6. Feature Requests & Roadmap Signals
- **High-priority features:** Channel native adapter improvements (Proton Mail, email/credential modes), host log rotation support, improved agent card and approval card display, Windows/WSL channel compatibility fixes. These align with active feature development in recent PRs.
- **Secondary feature signals:** Local OneCLI gateway capabilities, jq-based channel setup support, ncl socket Windows compatibility, plus ongoing dependency and build maintenance work.

### 7. User Feedback Summary
- **Positive feedback signals:** Fast, steady PR delivery with active feature development, improved stability fixes for channel and setup scenarios, and clean maintenance work (dependency and build updates). Users see clear progress in functionality and stability.
- **Feedback directions:** Users focus on channel adapter capabilities, local deployment stability, and compatibility across platforms (Windows, WSL, Linux); feedback on the need for smoother log management and improved agent card presentation.

### 8. Backlog Watch
- No long-unanswered critical Issues or PRs require immediate maintainer attention.
- **Key follow-up items:** Resolve channel click approval logic bugs (PRs #4168, #4171, #4147, #4156); complete platform compatibility fixes for Windows NFS/ncl socket, OneCLI local publishing, and channel setup dependencies; monitor ongoing feature feature request alignment with the roadmap.

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

### **Moltis Project Digest**
**Date:** 2026-11-08  
**Repository:** [moltis-org/moltis](https://github.com/moltis-org/moltis)

---

#### **1. Today's Overview**
Activity on the Moltis project remains low but stable, with 3 total repository updates recorded over the last 24 hours. The primary focus today was on stabilizing existing functionality through bug fixes and expanding provider support, with no new releases distributed. Overall project health is positive, driven by maintenance of tool configurations and integration of new AI providers.

#### **2. Releases**
**No new releases** were published in the last 24 hours.

#### **3. Project Progress**
*   **Merged PR #1280:** Fixed a critical logic issue regarding tool presets. The update ensures that an explicitly empty `active_tools` array is treated as "no override," preserving the original preset's tool configurations. This prevents unintended loss of tool access during state transitions.
*   **Opened PR #1288:** Advanced the provider ecosystem by adding support for the "Tsubasa" provider. This PR integrates a new OpenAI-compatible endpoint, introduces two model variants (`tsubasa-fast` and `tsubasa-pro`) with 32,768-token context windows, and updates the setup and model registry.

#### **4. Community Hot Topics**
*   **Provider Integration:** The community is actively expanding the agent's capabilities. The new **Tsubasa provider** (PR #1288) highlights a strong demand for OpenAI-compatible endpoints with extended context windows.
*   **Release Stability:** There is significant concern regarding the reliability of the release process itself, as evidenced by the high traction on the asset issue.

#### **5. Bugs & Stability**
*   **[OPEN] Release Asset Failure (Severity: High):** Issue #273 reports that the recently published version **v0.10.2** is missing all release assets (`.deb`, `.tar.gz`). This breaks the automated install script, which fails with a 404 error when attempting to download binaries. The issue has garnered 3 reactions and requires immediate attention to restore deployment workflows.
    *   *Link:* [moltis-org/moltis Issue #273](https://github.com/moltis-org/moltis/issues/273)

#### **6. Feature Requests & Roadmap Signals**
*   **Extended Context Providers:** The addition of the **Tsubasa provider** signals a roadmap direction toward supporting providers with extended context windows (32k tokens), likely to accommodate more complex, multi-turn agent tasks.

#### **7. User Feedback Summary**
*   **Deployment Frustrations:** Users attempting to install the latest version are currently blocked due to the missing binaries in v0.10.2. This indicates a friction point between rapid feature development and stable release packaging.
*   **Tool Management Expectations:** Users expect precise control over tool overrides. The feedback in PR #1280 suggests a need for deterministic behavior when clearing tool lists—specifically, that an empty list should be interpreted as "use defaults" rather than "disable everything."

#### **8. Backlog Watch**
*   **[OPEN] Issue #273:** Requires immediate action by maintainers to republish v0.10.2 with the necessary assets to unblock users.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

**CoPaw Project Digest: 2026-11-08**

### 1. Today's Overview
Activity on the CoPaw (QwenPaw) repository has been moderate, with 4 issues and 6 pull requests updated in the last 24 hours. The project remains in a stable development phase, focusing on bug fixes, context management improvements, and provider compatibility. No new releases were published, indicating that the maintainers are likely consolidating changes before a new stable build.

### 2. Releases
**None**
No new releases were published in the last 24 hours.

### 3. Project Progress
The development team focused on stabilizing the application's core functionalities. A total of 6 Pull Requests were opened, addressing critical fixes in agent management, token usage estimation, and context overflow handling. The work appears to be targeting version 2.3.x, specifically improving robustness for file handling and provider fallback mechanisms.

### 4. Community Hot Topics
*   **Windows 11 IoT LTSC Compatibility (#8616):**
    *   *Author:* ArsenicumAlbum
    *   *Link:* [Issue #8616](https://github.com/agentscope-ai/CoPaw/issues/8616)
    *   *Analysis:* This is currently the most critical technical blocker. Users attempting to run the latest beta (2.3.0-beta.1) on Windows 11 IoT Enterprise LTSC are encountering "path not found" errors followed by application hangs, while version 2.2.2 works perfectly. This indicates a potential regression in the new build's path resolution or dependency loading logic for specific enterprise configurations.
*   **Agent File Content Handling (#8292):**
    *   *Author:* twotnguyen
    *   *Link:* [PR #8292](https://github.com/agentscope-ai/CoPaw/pull/8292)
    *   *Analysis:* A long-standing fix for malformed file data in conversation history is being actively reviewed. This addresses a bug where missing file IDs or data in message blocks cause HTTP 400 errors with OpenAI-compatible providers.

### 5. Bugs & Stability
**High Severity:**
*   **Application Hang on Windows IoT LTSC:** The 2.3.0-beta.1 build crashes immediately upon launch on Windows 11 IoT Enterprise LTSC (Build 26100). No fix PR exists yet for this specific crash.
*   **Copy/Paste Failure:** Users report that `Ctrl+C` requires multiple presses to copy text in the new UI, rendering the interface frustrating to use.

**Medium Severity:**
*   **Agent Response Gaps:** Randomly, the application displays only the "thinking" process without returning a final answer to the user.

### 6. Feature Requests & Roadmap Signals
*   **Context Management Fixes:** Several PRs (e.g., #8615, #8613) are actively working on context overflow detection and compaction planning. This suggests the roadmap is prioritizing handling long conversations and large context windows to prevent crashes.
*   **SpecStream Integration:** A new web search provider (SpecStream) has been added via PR #8618, signaling an expansion of tool capabilities.

### 7. User Feedback Summary
User sentiment is mixed. While the new UI is criticized for being less efficient and more sluggish than the previous version, the functional core is receiving attention.
*   **Dissatisfaction:** Users prefer the "old UI" and find the new version's performance sluggish. The copy-paste functionality is a significant friction point.
*   **Positive:** The team is responsive to bug reports, and the integration of accurate web search providers (like SpecStream) is welcomed.
*   **Operational:** Users are still finding friction in cross-agent collaboration and identity management (from the closed issue #2420).

### 8. Backlog Watch
*   **Issue #2420 (Cross-Agent Collaboration):** Despite being marked as closed, this issue highlights deep UX challenges in guiding users through multi-agent workflows and managing agent identities, suggesting that while the *feature* might be implemented, the *user experience* needs refinement.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest
**Date:** 2026-11-08
**Repository:** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

## 1. Today's Overview
ZeroClaw is maintaining a high level of active development with 23 issues and 34 pull requests updated in the last 24 hours. The project is currently focused on stabilizing security controls, specifically around session ownership and RPC authorization, as well as addressing channel-specific bugs and documentation updates. While no new releases have been made, the volume of high-severity security fixes indicates a healthy focus on hardening the platform before the next major release.

## 2. Releases
**No new releases were detected in the last 24 hours.**
*Note: Several PRs are currently targeting `release:v0.9.0`, suggesting this milestone is likely imminent.*

## 3. Project Progress
The project is actively resolving critical security and stability issues. Several high-priority bugs were closed today, including:
*   **RPC Cron Security:** PR #12260 fixed a security regression where `cron/add` and `cron/patch` RPC methods incorrectly treated requests as operator approvals, allowing unauthorized shell job execution.
*   **Session Authority:** PR #12239 fixed a session effect handling issue where authority checks were not enforced strictly enough through async waits, potentially allowing revoked administrators to retain access.
*   **OIDC Binding:** PR #12157 successfully merged a critical fix binding OIDC enrollment callbacks to the initiating browser, preventing login CSRF attacks.
*   **Relay Dashboard:** PR #12274 documented the new capability to serve a daemon's web dashboard through ZeroRelay, completing the feature set for Issue #10315.

## 4. Community Hot Topics
The community is actively debating and implementing complex security and architectural changes. Key topics include:
*   **Identity & Access Control (RBAC):** The conversation around "Per-sender RBAC" (#5982) continues to evolve, with maintainers steering away from a standalone RBAC subsystem toward integrating sender roles into the existing agent/risk-profile model.
*   **Session Ownership:** There is significant momentum on PR #9746, which implements per-agent ownership scoping for session tools. The maintainer has created a documentation PR (#12282) to record a "placement exception" for this complex feature, indicating it is nearing completion.
*   **Plugin Architecture:** PR #12216 is gaining traction to support multiple plugin registry origins, addressing a need for users to mix private and public plugin sources.

## 5. Bugs & Stability
Several high-severity bugs were reported or fixed today. The most critical issues include:
*   **S0 - Critical (Open):** **Session/Channel Ownership Scoping** (#9646). Several built-in tools (sessions_list, history, send, discord_search) lack per-agent ownership checks, allowing any agent to reach another agent's data.
*   **S1 - Workflow Blocked (Open):** **Cached Turn Poisoning** (#12187). A bug in channel cached-turn normalization merges user turns into tool envelopes, permanently corrupting conversation history on strict providers.
*   **S2 - Degraded Behavior (Open):** **SQLite Timestamp Loss** (#11420). The SQLite backend rewrites `created_at` timestamps on every turn, losing per-message timing data.
*   **S2 - Degraded Behavior (Open):** **Shell Approval Inconsistency** (#12227). The approval prompt for shell commands appears to depend on internal model values, leading to unpredictable behavior.

## 6. Feature Requests & Roadmap Signals
The following feature requests are gaining traction and may influence the upcoming v0.9.0 release:
*   **Per-sender RBAC:** Users are requesting a nuanced access control model for multi-tenant deployments.
*   **Bounded Tsubasa Custom-Provider Setup:** Documentation for a specific provider configuration is requested (#11207).
*   **Voice Settings:** A new web feature request for paired-device voice settings and chat controls (#12269) suggests upcoming UI enhancements.

## 7. User Feedback Summary
*   **Security Frustration:** Users are increasingly identifying "data loss" and "security risk" scenarios (S0) where agent tools lack proper isolation. The feedback highlights a need for tighter boundaries between agents.
*   **Operational Pain:** Users are experiencing "degraded behavior" due to RPC authorization issues and timestamp corruption in SQLite, impacting the reliability of long-running sessions.
*   **Feedback on Documentation:** Users are asking for clearer migration guides and better handling of deprecated environment variables in CLI commands.

## 8. Backlog Watch
Several long-standing, high-priority issues require maintainer attention:
*   **Issue #5982 (Per-sender RBAC):** Open since April 2026, with 12 comments. This is a complex architectural change requiring consensus on the direction.
*   **PR #10412 (Session Ownership):** Open since August 2026. This is a large refactoring to extract session ownership into a shared contract; blocking work on dashboard scoped chat.
*   **Issue #9646 (Tool Ownership):** Open since August 2026. This is the security-focused sibling to PR #10412, currently stalled in review.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*