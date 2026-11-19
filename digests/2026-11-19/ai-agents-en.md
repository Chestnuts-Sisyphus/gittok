# OpenClaw Ecosystem Digest 2026-11-19

> Issues: 472 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-19 01:34 UTC

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

**Cross‑Project Comparison Report – 2026‑11‑19**

| Project | Issues (24 h) | PRs (24 h) | Releases (past 30 d) | Health Score (0–1) |
|---------|---------------|------------|-----------------------|--------------------|
| **Hermes Agent** | 50 | 50 | 1 canary (v0.23.2+canary.20261118T064620Z) | 0.70 |
| **LobsterAI** | 2 | 8 | 0 | 0.55 |
| OpenClaw | N/A | N/A | N/A | N/A |
| NanoBot | N/A | N/A | N/A | N/A |
| PicoClaw | N/A | N/A | N/A | N/A |
| NanoClaw | N/A | N/A | N/A | N/A |
| NullClaw | 0 | 0 | 0 | 0.30 |
| IronClaw | 0 | 0 | 0 | 0.30 |
| CoPaw | N/A | N/A | N/A | N/A |
| ZeptoClaw | 0 | 0 | 0 | 0.30 |
| ZeroClaw | N/A | N/A | N/A | N/A |
| TinyClaw | 0 | 0 | 0 | 0.30 |
| Moltis | 0 | 0 | 0 | 0.30 |

*Health scores are qualitative estimates derived from recent activity, open regressions, and release cadence.*

---

### 1. Ecosystem Overview
The personal AI assistant/agent landscape remains fragmented yet rapidly evolving. Projects span mature, stable tooling (e.g., LobsterAI) and high‑velocity migration efforts (e.g., Hermes Agent). Key themes include security hardening, plugin extensibility, multi‑tenant architectures, and UI/UX polish for desktop and web interfaces. Community health varies from highly active to largely dormant, underscoring uneven momentum across the space.

---

### 2. OpenClaw’s Position
- **Advantages**: OpenClaw’s open‑source nature and focus on core skill catalog management position it as a foundational layer for other agents. Its lightweight architecture and declarative skill definitions promote rapid experimentation.
- **Technical Differences**: Unlike Hermes, which is undergoing a full backend migration, OpenClaw remains a “core reference” implementation with minimal UI surface area. It prioritizes static skill discovery over dynamic runtime plugin loading.
- **Community Size**: Current activity data is unavailable; however, lack of recent issues/PRs suggests a smaller, possibly niche user base compared to Hermes and LobsterAI.

---

### 3. Shared Technical Focus Areas
| Need | Projects | Notes |
|------|----------|-------|
| **Secure File/Protocol Handling** | Hermes Agent (voice/TTS file paths), LobsterAI (`localfile://` handler) | Both projects have closed or opened issues around arbitrary path exposure. |
| **Session / State Management** | Hermes Agent (duplicate transcripts, session corruption) | Critical for reliability in long‑running conversations. |
| **Plugin / SDK Extensibility** | Hermes Agent (read‑only SDK), OpenClaw (skill catalogs), LobsterAI (renderer UI hooks) | Community demands richer, type‑safe interfaces. |
| **Multi‑Tenant / Hosted Deployments** | Hermes Agent (multi‑tenancy request) | Future‑proofing for SaaS‑style deployments. |
| **UI/UX Rendering Consistency** | Hermes Agent (desktop collapse, IME issues), LobsterAI (CSV/Windows link handling) | Cross‑platform rendering remains a pain point. |

---

### 4. Differentiation Analysis
| Project | Feature Focus | Target Users | Core Architecture |
|---------|---------------|--------------|-------------------|
| **Hermes Agent** | Gateway migration, multi‑tenant, robust plugin SDK | Enterprise SaaS, multi‑tenant hosting | Monolith → Gateway micro‑service transition; event‑driven session store. |
| **LobsterAI** | Security hardening, protocol safety, user‑level API controls | Individual developers, internal tooling | Modular renderer + MCP (multi‑command processor) with strict sandboxing. |
| **OpenClaw** | Skill cataloging, core reference | Researchers, hobbyists | Purely declarative YAML/JSON skill definitions, no runtime UI. |

---

### 5. Community Momentum & Maturity
| Tier | Projects | Indicators |
|------|----------|------------|
| **Rapid‑Iteration** | Hermes Agent | 100 items in 24 h, ongoing migration PRs, active issue triage. |
| **Active Maintenance** | LobsterAI | 8 PRs merged, active security fixes, two open issues. |
| **Stabilizing / Dormant** | NullClaw, IronClaw, ZeptoClaw, TinyClaw, Moltis | 0 recent activity, no releases. |
| **Uncertain** | OpenClaw, NanoBot, PicoClaw, NanoClaw, CoPaw, ZeroClaw | No data; likely low engagement or legacy status. |

---

### 6. Trend Signals
1. **Security by Design** – Multiple projects (Hermes, LobsterAI) are prioritizing sandboxing, protocol validation, and account‑level controls, reflecting industry‑wide scrutiny of data handling.
2. **Gateway‑First Architecture** – Hermes’ migration indicates a shift toward decoupled backend services (Gateway) to enable multi‑tenant hosting and plug‑in isolation.
3. **Plugin SDK Maturity** – Demand for read‑only SDK APIs and better tooling signals a move away from ad‑hoc DOM hacking toward typed interfaces.
4. **User‑Centric UI Improvements** – Persistent UI bugs (desktop collapse, IME reliability, Windows link handling) underscore the need for cross‑platform rendering consistency.
5. **Account Management** – LobsterAI’s account disable issue highlights friction in user provisioning; future projects may need self‑service account recovery flows.

---

**Takeaway for Decision‑makers:**  
- **Hermes Agent** offers a high‑velocity, migration‑focused path but carries active regressions that must be managed.  
- **LobsterAI** delivers a security‑first foundation with a modest but steady development cadence.  
- Projects lacking activity (OpenClaw, NanoBot, etc.) should be evaluated for community health before investment.  
- Common pain points—secure file handling, session integrity, and plug‑in APIs—present cross‑project opportunities for shared tooling or standardization.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest
**Date:** 2026-11-19  
**Repository:** [github.com/nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent)

## 1. Today's Overview
Hermes Agent is experiencing a period of intense activity, driven by a major ongoing migration from the legacy `hermes dashboard`/`serve` architecture to the new Gateway Webapp. The project remains in a highly active state, with nearly 100 items updated in the last 24 hours (50 Issues, 50 PRs). While this migration brings significant feature advancements, it has also triggered a wave of regressions and stability concerns, particularly around session management, desktop rendering, and CLI tool behavior.

## 2. Releases
*   **v0.23.2+canary.20261118T064620Z** (Released November 18, 2026)
    *   **Summary:** A canary release testing the integration of the new Gateway architecture.
    *   **Migration Notes:** This release signals the start of the migration process. Users are advised to prepare for backend migrations and potential breaking changes as the `hermes gateway migrate` workflow is introduced.

## 3. Project Progress
The primary driver of progress this week is the **Gateway Migration**. A series of stacked PRs (#157430, #157453, #157484, #157403) are actively developing tools to move user data from old `dashboard`/`serve` backends to the new Gateway Webapp.
*   **Security & Safety:** A critical fix for voice file handling was merged (PR #122760), resolving a security/stability issue where microphone recordings and TTS clips were being saved to shared system directories (`/tmp`) instead of isolated profile directories.
*   **Bug Fixes:** Several minor stability issues were addressed, including Kanban board atomic deletion (PR #157630) and Kanban quota management (PR #157624).

## 4. Community Hot Topics
The community is actively debating the stability and UX of the ongoing migration and specific rendering issues.

*   **[Open] Desktop Transcript Corruption (Issue #137287)** - *16 Comments*
    *   **URL:** [github.com/nousresearch/hermes-agent/issues/137287](https://github.com/nousresearch/hermes-agent/issues/137287)
    *   **Analysis:** This is the most active discussion. Users report that session transcripts randomly duplicate, scatter, or drop messages mid-session. The issue spans Desktop, CLI, and Gateway sessions, suggesting a deep-seated problem in the message serialization or rendering pipeline.
*   **[Open] Gateway Migration & Provider Routing (Issue #89384)** - *3 Comments*
    *   **URL:** [github.com/nousresearch/hermes-agent/issues/89384](https://github.com/nousresearch/hermes-agent/issues/89384)
    *   **Analysis:** Users are experiencing routing failures where auxiliary tasks (vision, compression) ignore `provider_routing` settings and route to excluded OpenRouter providers, causing connectivity issues during the migration to the Gateway.
*   **[Open] Gateway Migration (PR #157430)** - *Active*
    *   **URL:** [github.com/nousresearch/hermes-agent/pull/157430](https://github.com/nousresearch/hermes-agent/pull/157430)
    *   **Analysis:** This is the central PR for the migration, currently in active review. It attempts to make the backend migration atomic and reversible.

## 5. Bugs & Stability
The release of v0.23.2 (Canary) has exposed several regressions, particularly in session handling and visual rendering.

1.  **Session State Corruption (Severity: High)**
    *   **Issue #137287:** Random duplication/scattering/dropping of messages in session transcripts.
    *   **Issue #139002:** Desktop group creation failing with `invalid_params` due to session state issues.
    *   **Issue #97115:** Tool-dispatch branches dropping schema parameters.
    *   **Status:** No merged fix PRs found in the last 24h. These indicate a potential systemic issue in the session management layer.

2.  **Desktop Rendering & UX (Severity: Medium)**
    *   **Issue #106487:** IME (Chinese input) reliability issues in the dashboard.
    *   **Issue #140632:** UI collapse bug where the chat column shrinks to 28px when a plugin pane is added.
    *   **Issue #140633:** HDR monitor rendering issues (washed out colors) on Linux/Wayland with NVIDIA SwiftShader.

3.  **CLI & Tool Stability (Severity: Medium)**
    *   **Issue #40343:** Background processes surviving CLI exit, causing port conflicts.
    *   **Issue #157099:** Terminal tool getting stuck in "busy" state after a timeout.

## 6. Feature Requests & Roadmap Signals
*   **Multi-Tenancy (Issue #146503):** A high-level architectural request for hosted Hermes to serve multiple tenants in a single process. This is a long-term roadmap item (P3).
*   **Plugin SDK Enhancements (Issue #152528):** Users are requesting a read-only SDK API to inspect session status from desktop plugins, currently forcing them to use DOM inspection.
*   **Desktop Sidebar UX (Issue #137443):** Users want the ability to hide "empty" worktree lanes (e.g., from other tools like Claude Code) to reduce clutter.

## 7. User Feedback Summary
User feedback this period highlights a tension between **innovation** (Gateway migration) and **stability**.
*   **Pain Point:** Users are reporting that their "digital memory" (session history) is becoming unreliable. The duplicate message bug is causing confusion in long sessions.
*   **Pain Point:** The migration process is exposing edge cases in configuration, specifically how providers and routing rules interact with the new Gateway architecture.
*   **Satisfaction:** High engagement and rapid response from the team (many issues closed or PRs opened) suggest the community is generally supportive of the direction, even if frustrated by the growing list of bugs.

## 8. Backlog Watch
*   **[Open] Pre-LLM Plugin Context (Issue #71998):** A longstanding bug (created July 2026) where `pre_llm_call` plugin context is dropped during multimodal turns. It has received 8 comments but no resolution.
*   **[Open] MCP Circuit Breaker (Issue #47851):** A bug where the MCP circuit breaker is triggered by business errors rather than server failures. Created in June 2026.
*   **[Open] Compression Budget Re-arm (Issue #103355):** A bug in the compression engine where the attempt budget is not replenished, causing long turns to fail.

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

# LobsterAI Project Digest: 2026-11-19
## Today's Overview
LobsterAI maintained a mature but restless development environment in the last 24 hours, with activity concentrated in security hardening, documentation updates, and tooling improvements. The repository shows 2 open/active issues and 8 PRs with heavy activity, indicating active maintenance by maintainers. A closing fix on `localfile://` protocol handling (Issue #3096) was resolved, while new security fixes for MCP stdio commands and external URL boundaries were opened. Several collaborative refactor PRs for Cowork execution mode handling, OpenClaw skill catalogs, and renderer usability are in progress, with multiple PRs updated recently. The overall health reflects strong engineering effort, though one user account is still in a disabled state requiring external support.
## Releases
No new releases were recorded for 2026-11-19 (0 new releases). Therefore, there are no version-specific changes, migration notes, or breaking change notes to disclose.
## Project Progress
- **Merged/closed PRs today:** 8 PRs updated in the last 24 hours (7 merged/closed, 1 open). Notable actions include:
  - **#3090 [CLOSED]** fix(cowork): read stored executionMode instead of forcing local — addresses config persistence gap where `executionMode` was being dropped on reload, resolving auto/sandbox config survival.
  - **#3114 [CLOSED]** fix(cowork): restore saved execution mode and honor explicit sandbox policy — cherry-picks #3090 and restores previously saved execution mode values.
  - **#3113 [CLOSED]** fix(openclaw): compact skill catalogs and honor deliverable paths — consolidates skill directories in OpenClaw v2026.8.1 and enforces precise save paths and verification for deliverables.
  - **#2590 [OPEN]** fix(security): harden MCP stdio command and external URL boundaries — addresses shell metacharacter/path validation and renderer URL allowlisting for external execution.
  - **#2790 [CLOSED]** feat(renderer): group model choices and improve conversation loading — collapses model catalogs and improves conversation history loading.
  - **#2791 [CLOSED]** fix(artifacts): ignore abbreviated paths in inferred file cards — prevents misleading artifact cards for non-resolvable placeholders.
  - **#2792 [CLOSED]** fix(cowork): keep long question prompts and context tooltips readable — improves headings and overflow handling for long prompts and context tooltips.
  - **#3109 [CLOSED]** fix(artifacts): support CSV encodings and in-app Windows links — fixes GBK CSV garbling and C:/... link behavior on Windows.
## Community Hot Topics
- **Issue #3096 [CLOSED]**: `localfile://` protocol handler serves any absolute path with no root allowlist — the most recently resolved issue, detailing path resolution and response logic in `src/main/artifactLocalFileProtocol.ts`. It has 2 comments and 0 reactions, indicating a high-severity but resolved problem affecting protocol handler security and reliability. Link: https://github.com/netease-youdao/LobsterAI/issues/3096
- **Issue #3112 [OPEN]**: Account disabled and request for unblocking (uid 147357) — a user reports a built-in model API returning HTTP 403 due to `accountAccess.state=DISABLED`, and describes self-running a third-party check-in script. This highlights a governance/security friction point around account security and user friction. Link: https://github.com/netease-youdao/LobsterAI/issues/3112
- **PR #2590 [OPEN]**: Security hardening for MCP stdio commands and external URL boundaries — a high-priority security fix open since 2026-09-01 with active updates, relevant to external command and URL execution safety. Link: https://github.com/netease-youdao/LobsterAI/pull/2590
## Bugs & Stability
- **Issue #3096**: `localfile://` protocol handler resolves arbitrary absolute paths with no allowlist — affects file serving reliability and security boundary; resolution exists as of 2026-11-18. Likely severity: High (protocol vulnerability / access control gap). Fix PR: #3096 addressed via related changes, though the issue itself was closed.
- **Issue #3112**: Built-in model API returns HTTP 403 due to account disabled state for uid 147357 — operational/security issue tied to account access and API behavior. Likely severity: Medium (user impact, account/access problem). No fix PR is listed for this issue.

## Feature Requests & Roadmap Signals
- **Account/permission resolution** for disabled accounts (Issue #3112) and **self-service check-in workflow** (described in the issue as a workaround) suggest the roadmap may include improved account security, API access provisioning, and smoother self-service tooling.
- **Security hardening** (PR #2590) and **Cowork execution mode restoration** (PRs #3090/#3114) indicate ongoing attention to cross-platform integration and runtime safety.
- **OpenClaw skill catalog refinement** (PR #3113) and **renderer UI improvements** (PRs #2790/#2791/#2792) signal continued investment in usability and tooling scaling.

## User Feedback Summary
- **Primary pain point**: A user is experiencing account disabling and requests unblocking (uid 147357), having discovered a 403 error when using the built-in model interface. This indicates a documented user friction around account security and self-service usage.
- **Use case**: On-the-go daily check-in via local scripts to use LobsterAI built-in model interfaces; the user describes it as non-commercial and intended for local automation, indicating a need for secure, repeatable access and clear operational guidance.
- **Preference/expectation**: Users appear to value working out-of-the-box workflows, simplified UI for model catalogs, and robust security controls, with feedback indicating responsiveness to bug fixes like CSV/Windows link handling and protocol safety.

## Backlog Watch
- **Issue #3112 (Account disabled/unblock)**: Open and actively used by the user, with no associated fix PR listed. Maintainer attention is needed to either implement a provisioning/override mechanism for disabled accounts or facilitate accessible escalation paths.
- **PR #2590 (Security hardening)**: Open since 2026-09-01 with active updates and user-visible risk exposure; it may require continuation or follow-up review if the current implementation lacks full validation coverage.
- **Security gap in `localfile://` protocol** (Issue #3096): Closed as fixed, but the underlying lack of path allowlisting could be cited as a latent vulnerability if not fully hardened in future releases.

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