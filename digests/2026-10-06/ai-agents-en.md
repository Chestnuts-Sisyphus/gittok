# OpenClaw Ecosystem Digest 2026-10-06

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-06 01:02 UTC

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

# Hermes Agent Project Digest — 2026-10-06

## 1. Today's Overview

Hermes Agent showed very high development and triage activity in the last 24 hours: 50 Issues and 50 Pull Requests were updated, with 31 Issues closed and 10 PRs merged/closed. No new release was published, so the day’s work appears concentrated on mainline stabilization rather than user-facing release packaging. The activity is strongly skewed toward reliability, compatibility, and trust/security boundaries, especially around MCP SDK 2.x behavior, Discord gateway authorization, desktop/updater flows, memory/compaction, and multi-platform gateway routing. Project health looks responsive in triage and closure rate, but several open P2/P3 items point to continuing risk in Windows/Termux update paths, desktop builds, MCP untrusted-server UX, and session/state recovery.

---

## 2. Releases

No new releases were published in the 24-hour window, so no release-level breaking changes or migration notes are available from the supplied data.

---

## 3. Project Progress

The merged/closed PR count is 10 overall, but the provided excerpt shows the top 20 PRs by comment count rather than all closures. Among the visible closed PRs:

- [PR #118966 — `fix(discord): preserve slash role authorization`](https://github.com/NousResearch/hermes-agent/pull/118966): Closed. This corresponds to the now-closed [Issue #118958 — Discord slash commands from role-authorized users are rejected](https://github.com/NousResearch/hermes-agent/issues/118958), where users admitted by `DISCORD_ALLOWED_ROLES` could send plain messages but native slash commands were rejected because the gateway event omitted the role grant.
- [PR #77904 — `feat(browser): per-call userId on Camofox tools for multi-account operation`](https://github.com/NousResearch/hermes-agent/pull/77904): Closed. This advances multi-account browser operation by allowing different Camofox browser profiles per call instead of resolving one identity per process.

Issue closures in the same window indicate broader progress across several subsystems:

### MCP Compatibility and Trust

Multiple related MCP issues were closed, suggesting a concentrated fix around SDK 2.x compatibility and trust gating:

- [Issue #88858 — MCP trust gate: `readOnlyHint` never detected on live-discovered tools](https://github.com/NousResearch/hermes-agent/issues/88858): Closed. This was a high-impact P1 bug where untrusted MCP servers treated even read-only tools as write-capable, prompting approval on every read.
- [Issue #94970 — MCP tool schemas are cached empty on mcp 2.x](https://github.com/NousResearch/hermes-agent/issues/94970): Closed. This involved bare `getattr` call sites bypassing the `mcp_field()` compatibility helper.
- [Issue #108972 — `read_only_hint` ignored on MCP SDK 2.x](https://github.com/NousResearch/hermes-agent/issues/108972): Closed as duplicate-related.
- [Issue #109817 — MCP trust gate never sees `readOnlyHint` on mcp SDK 2.x](https://github.com/NousResearch/hermes-agent/issues/109817): Closed as duplicate-related.

This cluster suggests the project is actively repairing a trust/security compatibility regression introduced or exposed by MCP SDK 2.x.

### Gateway and Platform Auth

- [Issue #118958 — Discord slash commands from role-authorized users are rejected](https://github.com/NousResearch/hermes-agent/issues/118958): Closed, with the associated [PR #118966](https://github.com/NousResearch/hermes-agent/pull/118966) also closed.
- [PR #133597 — `fix(gateway): isolate adapter construction failures`](https://github.com/NousResearch/hermes-agent/pull/133597): Open. This prevents one broken platform adapter from aborting startup for all adapters, which is a meaningful operational reliability improvement.
- [PR #133598 — `fix(gateway): voice turns drop the /voice join message id and name uncached speakers`](https://github.com/NousResearch/hermes-agent/pull/133598): Open. This fixes voice-channel session source rebuilding and speaker display behavior.
- [PR #127801 — `fix(gateway): stop scoring an authorization refusal as success`](https://github.com/NousResearch/hermes-agent/pull/127801): Open. This addresses a confusing auth failure mode where an unauthorized Discord sender sees a successful reaction but no reply.

### Desktop, Updater, and Install/Update Stability

Several long-running and newly updated items indicate active work on updater and desktop reliability:

- [Issue #127830 — Update-check `rev-list` on `tree:0` partial clone causes unbounded on-demand fetch storm](https://github.com/NousResearch/hermes-agent/issues/127830): Closed. This was a major performance/stability issue on Windows involving 103 GB pack growth and continuous AV scanning.
- [PR #132361 — `fix(update): make the git/ZIP swap a single crash-safe commit point`](https://github.com/NousResearch/hermes-agent/pull/132361): Open.
- [PR #132338 — `fix(update): a killed Windows updater no longer strands paused gateways`](https://github.com/NousResearch/hermes-agent/pull/132338): Open.
- [PR #132346 — `ci: real-update E2E gates every updater change; Windows crash cells for a killed update`](https://github.com/NousResearch/hermes-agent/pull/132346): Open.
- [PR #133585 — Desktop Bot Chat with a remote bot resumes on its own connection again](https://github.com/NousResearch/hermes-agent/pull/133585): Open. This is marked P2 and includes `run-e2e`, indicating an active regression in desktop core E2E.

This updater stack appears to be a major work-in-progress area, especially for Windows and desktop deployment.

### Memory, Skills, and Compaction

- [Issue #123362 — compression fallback state can remain latched after auxiliary model access failure](https://github.com/NousResearch/hermes-agent/issues/123362): Closed.
- [Issue #100501 — auxiliary client streaming lacks stale stream protection](https://github.com/NousResearch/hermes-agent/issues/100501): Closed.
- [Issue #131496 — Compaction fails with `no active provider implements checkpoint API v2`](https://github.com/NousResearch/hermes-agent/issues/131496): Closed.
- [Issue #107270 — memory tool falsely refuses writes due to false drift detection](https://github.com/NousResearch/hermes-agent/issues/107270): Closed.
- [Issue #89844 — `skills.compact` config flag or `build_skills_system_prompt` hook](https://github.com/NousResearch/hermes-agent/issues/89844): Closed.
- [Issue #131337 — public skills-presentation accessor for names-only skill-list rendering](https://github.com/NousResearch/hermes-agent/issues/131337): Closed.

The skill-related closures suggest the project is working on prompt-size optimization and better plugin/skill integration seams.

### Platform Adapters

- [Issue #54217 — WhatsApp adapter fails with missing `aiohttp`](https://github.com/NousResearch/hermes-agent/issues/54217): Closed.
- [Issue #126358 — Sealed env after update ships partial messaging extra, causing WhatsApp bridge probe failure](https://github.com/NousResearch/hermes-agent/issues/126358): Closed.
- [Issue #37315 — QQ Bot `send_message` drops MEDIA files](https://github.com/NousResearch/hermes-agent/issues/37315): Closed.
- [PR #70318 — WhatsApp Cloud API message templates](https://github.com/NousResearch/hermes-agent/pull/70318): Open, indicating continued WhatsApp feature development.

---

## 4. Community Hot Topics

PR comment counts are not populated in the supplied data, so the following focuses on the most active Issues by comment count and adds notable long-lived PRs that are operationally significant.

### Top Issue: Automated Nous Integration Is Blocked

- [Issue #125727 — Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/125727)
- Status: Open
- Comments: 26
- Labels: `invalid`, `comp/agent`, `P3`
- Created: 2026-09-27
- Updated: 2026-10-06

This is the single most active issue in the provided window. It reports that the scheduled Nous-to-Enterkey merge is blocked by conflicts across many core agent files, including `acp_adapter/permissions.py`, `agent/agent_init.py`, `agent/agent_runtime_helpers.py`, `agent/auxiliary_client.py`, `agent/background_review.py`, `agent/chat_completion_helpers.py`, `agent/context_compressor.py`, `agent/conversation_loop.py`, and `agent/credential_pool.py`.

**Underlying need:** This signals integration friction between parallel development tracks or upstream branches. The high comment count suggests this is not merely a bug but a coordination problem. The likely user/maintainer need is a more reliable integration branch strategy, clearer merge ownership, or automated conflict detection before scheduled merges are attempted.

### MCP Trust Gate and `readOnlyHint`

- [Issue #88858 — MCP trust gate: `readOnlyHint` never detected on live-discovered tools](https://github.com/NousResearch/hermes-agent/issues/88858)
- Status: Closed
- Comments: 13
- Reactions: 👍 2
- Labels: `type/bug`, `comp/tools`, `tool/mcp`, `P1`, `sweeper:risk-compatibility`

This was one of the highest-severity reported issues. With `trust: untrusted`, every tool was classified as write-capable, including tools correctly annotated with `readOnlyHint: true`. That made untrusted MCP servers impractical because even read-only operations required approval.

Related closed items:

- [Issue #94970 — MCP tool schemas cached empty on mcp 2.x](https://github.com/NousResearch/hermes-agent/issues/94970)
- [Issue #108972 — `read_only_hint` ignored on MCP SDK 2.x](https://github.com/NousResearch/hermes-agent/issues/108972)
- [Issue #109817 — MCP trust gate never sees `readOnlyHint` on mcp SDK 2.x](https://github.com/NousResearch/hermes-agent/issues/109817)

**Underlying need:** Users integrating external MCP servers need predictable security semantics and low-friction approval flows. This cluster shows demand for correct MCP SDK 2.x compatibility, accurate read-only classification, and a trust model that does not punish users for using untrusted-but-read-only tools.

### OpenAI Model Selection After Copilot Fallback

- [Issue #133554 — Cannot select an OpenAI model after Copilot fallback has been used](https://github.com/NousResearch/hermes-agent/issues/133554)
- Status: Closed
- Comments: 6
- Labels: `type/bug`, `comp/cli`, `provider/openai`, `provider/copilot`, `P2`, `needs-repro`

This issue reports that after Hermes uses a configured Copilot fallback, the model-selection flow no longer allows the user to select an OpenAI model. The reporter noted they had not independently reproduced the failure and that the exact interaction surface was not captured.

**Underlying need:** Provider fallback logic should not corrupt or lock subsequent model-selection state. Users with multi-provider configurations expect fallbacks to be temporary and reversible.

### 1Password Desktop Unlock Failure

- [Issue #107998 — 1Password browser-vault unlock fails with “no session token”](https://github.com/NousResearch/hermes-agent/issues/107998)
- Status: Open
- Comments: 4
- Labels: `type/bug`, `comp/agent`, `tool/browser`, `area/auth`, `P2`, `sweeper:risk-security-boundary`

This is a security-boundary and desktop integration issue. On macOS with 1Password CLI integration enabled, Hermes Desktop’s unlock flow fails with `1Password unlock failed: no session token`.

**Underlying need:** Desktop users expect local secret managers to integrate cleanly with browser automation and credential access. The issue sits at the intersection of auth, desktop UX, and browser tooling.

### Skill Prompt Compaction

- [Issue #89844 — `skills.compact` config flag or `build_skills_system_prompt` hook](https://github.com/NousResearch/hermes-agent/issues/89844)
- Status: Closed
- Comments: 4
- Labels: `type/feature`, `comp/agent`, `tool/skills`, `area/config`, `P3`, `needs-decision`

- [Issue #131337 — Seam request: public skills-presentation accessor](https://github.com/NousResearch/hermes-agent/issues/131337)
- Status: Closed
- Comments: 5
- Labels: `type/feature`, `comp/agent`, `tool/skills`, `P3`, `needs-decision`

Both issues point to the same underlying problem: as skill libraries grow, the `<available_skills>` system-prompt block becomes a large token cost. One report estimated around 11.5K tokens per turn for ~200 skills.

**Underlying need:** Users with large skill registries need prompt-size control, progressive disclosure, or retrieval-based skill routing without hard-coding every skill description into the system prompt.

### Notable Long-Lived PRs

Although PR comment counts are not available, the following open PRs are operationally significant because they have been open for weeks or months and touch high-risk areas:

- [PR #45317 — `fix(bluebubbles): prevent duplicate turns and preserve message delivery`](https://github.com/NousResearch/hermes-agent/pull/45317)
  - Open since 2026-06-13
  - P2, gateway/tools/config, duplicate-turn and delivery preservation.

- [PR #62201 — `fix(tui): preserve exact background notification owners`](https://github.com/NousResearch/hermes-agent/pull/62201)
  - Open since 2026-07-10
  - P2, TUI/terminal/delegate, background notification ownership.

- [PR #70318 — `feat(whatsapp): support Cloud API message templates`](https://github.com/NousResearch/hermes-agent/pull/70318)
  - Open since 2026-07-23
  - P3, WhatsApp Cloud re-engagement outside the 24-hour free-form window.

- [PR #111622 — `feat(computer-use): direct Win32 named pipe transport, a11y strategy & in-app titlebar status HUD`](https://github.com/NousResearch/hermes-agent/pull/111622)
  - Open since 2026-09-15
  - P3, Windows desktop computer-use architecture.

---

## 5. Bugs & Stability

The following ranks open and recently closed stability issues by severity, operational impact, and visibility in the supplied data.

| Rank | Item | Severity / Status | Impact | Related Fix / PR |
|---:|---|---|---|---|
| 1 | [Issue #88858 — MCP trust gate `readOnlyHint` never detected](https://github.com/NousResearch/hermes-agent/issues/88858) | P1, Closed | High. Made untrusted MCP servers practically unusable by forcing approval on read-only tools. | Related closures: [Issue #94970](https://github.com/NousResearch/hermes-agent/issues/94970), [Issue #108972](https://github.com/NousResearch/hermes-agent/issues/108972), [Issue #109817](https://github.com/NousResearch/hermes-agent/issues/109817) |
| 2 | [Issue #133596 — `computer_use` screenshots embedded with no size cap](https://github.com/NousResearch/hermes-agent/issues/133596) | P2, Open | High. Oversized screenshots can trigger provider rejections such as Claude DirectSDK image-size errors, and the recovery classifier may not recognize the failure, causing repeated retries. | No visible fix PR in supplied data. |
| 3 | [PR #104962 — `fix(kanban): enforce HERMES_TENANT scope in kanban tools`](https://github.com/NousResearch/hermes-agent/pull/104962) | P3 Security, Open PR | High. Kanban tools run in the host process and may allow cross-tenant read/write because boards are treated as namespaces rather than hard boundaries. | This item is itself a proposed security fix. |
| 4 | [PR #133586 — `fix(security): honour HERMES_HOME_MODE in secure_parent_dir`](https://github.com/NousResearch/hermes-agent/pull/133586) | P2 Security, Open PR | Medium-high. Hard-coded `chmod(parent, 0o700)` can conflict with documented `HERMES_HOME_MODE` behavior when credential files live directly in Hermes home. | This item is itself a proposed security fix. |
| 5 | [Issue #107998 — 1Password browser-vault unlock fails

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-10-06
## 1. Today's Overview
NanoClaw experienced active activity during the day, including 21 PRs submitted over the 24-hour window (9 open, 12 merged/closed) and 4 new issues (3 open, 1 closed), alongside the release of v2026.10.0-rc.2. Activity concentrated on macOS shutdown handling, macOS update wait-for-exit, agent-runner reply stability, and skill/image pipeline management. The project shows strong ongoing development and a cluster of concentrated bug fixes, indicating a stable but actively-maintained state.
## 2. Releases
A new release candidate was published:
- **v2026.10.0-rc.2** — Second release candidate for 2026.10.0. Key changes:
  - First release with calendar version numbers.
  - First release using `/update-nanoclaw` install by default; future updates now follow published releases rather than tipping `main`.
  - Installs available via the `beta` channel.
- **Migration note**: New installs follow published release cadence; older updates use the candidate path. The release PR (#4038) refreshed `[Unreleased]` with the merged pull requests since the previous candidate.
## 3. Project Progress
- **Merged/Closed PRs**: 21 PRs updated in the last 24 hours; 12 merged/closed and 9 open. Notable merges include #4000 (chore: merge main into channels) and #3995 (chore: load every adapter and make branch green), which consolidate channel and adapter updates.
- **Feature advances**:
  - **macOS shutdown fix (#4037)**: Waits for the host to exit after `launchctl bootout` before restarting, resolving snapshot-race failures.
  - **Channel sync (#4000)**: Merges main into the channels branch, removing conflicts from the main-to-channels sync merge.
  - **Skill adaptation (#4042)**: Bumps the Resend adapter pin to `0.3.0` to remove dependency advisories.
  - **Setup/install integrity fixes (#4041, #4036, #4035)**: Fix OneCLI upgrade guidance, hold gateway versions, and fix restart readiness tests for macOS.
- **Agent-runner hardening**: PRs address reply persistence/loss (#3918), provider-wrapper seams (#3925, #3932), and config/runtime resolution (#3930) to improve stability and reliability.
## 4. Community Hot Topics
- **PRs**: Top cluster is focused on skills and channel/delivery infrastructure. Notable active PRs include `#4043` (feat: Sendblue iMessage/SMS skill), `#4042` (chore: pin Resend adapter), and `#4040` (feat: FXMacroData MCP skill). These represent expansion of agent capabilities (multi-platform messaging, additional data MCPs) and dependency/skill hardening.
- **Issues**: Top issues address macOS shutdown races and task-run reliability. Notable items include `#4021` (macOS update race after `launchctl bootout`), `#3223` (scheduled-task error silently dropped), and `#3301` (one-door task mode drops logs/replies). These reflect operator and operational concerns around robustness and diagnosability.
## 5. Bugs & Stability
- **High severity (active fixes in progress)**:
  - **#3643** (OPEN, priority/high): Hardcoded 30-min absolute ceiling kills long local-model turns; no config seam. A fix PR exists (`#3643` is listed as active/handled with low comments).
  - **#4021** (CLOSED): macOS `update-nanoclaw` stops before host exit, causing snapshot race and I/O 5 on 2.3.0→2.4.0 cutover. Fixed via waiting for host exit (`PR #4037`).
  - **#3301** (OPEN): Tasks in chat sessions log/drop and lose replies; single-door task delivery issue. Active fix PRs (`#3918`, `#3932`) are addressing recovery and robustness.
- **Medium severity**:
  - `#3223` (OPEN): Scheduled-task errors produce unroutable messages that are silently dropped; operator lacks visibility. A fix PR (`#3930`) is in progress.
  - `#3925` (OPEN): Agent-runner lacks provider-wrapper seam; per-query model and retryable failures not supported without editing provider modules.
- **Overall stability**: Significant bugfix activity indicates a maturing, stable release cadence; pending fixes target operational robustness and diagnosticability.

## 6. Feature Requests & Roadmap Signals
- **User-requested features**:
  - **Multi-platform messaging** (`#4043`): Sendblue iMessage/SMS skill for free-account verification, webhook setup, operator DM wiring, and approval replies.
  - **Extended data capabilities** (`#4040`): FXMacroData MCP tool skill for macro/regulatory/central-bank/FX data.
  - **Scheduled-task efficiency** (`#3932`): `/add-lean-tasks` for lightweight scheduled task runs on small/local models.
- **Roadmap signals**: The release cadence and skill/image pipeline improvements (`#4009`) suggest continued expansion into skills, container/image management, and delivery-tier features. The `v2026.10.0-rc.2` release direction (calendar versioning, `/update-nanoclaw` default) indicates a mature update model.

## 7. User Feedback Summary
- **Pain points**:
  - **macOS operational friction** (`#4021`, `#4037`): Races during shutdown and service restart, reducing cutover reliability; operators report noisy I/O errors and failed re-bootstrap.
  - **Task reliability and visibility** (`#3223`, `#3301`): Scheduled-task errors are silently dropped or cause data loss/lost replies; operators lack clarity on task failures.
  - **Local-model turn stability** (`#3643`): Long local-model turns get killed mid-turn with non-sequential, confusing logs.
- **Use cases**:
  - Operator workflows requiring stable macOS update/cutover paths.
  - Developers relying on reliable scheduled-task delivery with visible failure states.
  - Teams needing lightweight scheduled execution for small/low-cost models.
- **Satisfaction/Outlook**: Users primarily express concern around reliability and diagnosticability in macOS updates and task execution; satisfaction is improving with the active bugfixes and released updates.

## 8. Backlog Watch
- **High priority (near-term action)**:
  - **#3643** (OPEN, high): Long local-model turns get killed mid-turn by absolute ceiling; needs config seam and hardening before stability.
  - **#3301** (OPEN): Task-chaos in chat sessions (log loss, reply loss); requires robust task delivery and diagnostic logic.
  - **#3223** (OPEN): Silent dropped task errors; lacks visibility; needs error normalization and tracing.
- **Medium priority**:
  - **#3925** (OPEN): Agent-runner lacks provider-wrapper seam; introduces complexity in adapter handling.
  - **#3301**, **#3223**, **#4021**: Related stability/troubleshooting items depending on the above resolutions.
- **Monitoring needed**: Maintainer attention needed on macOS update race fixes, task error handling, and local-model turn stabilization to reduce recurring operational risk.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>



# IronClaw Project Digest — 2026-10-06

## 1. Today's Overview
Project activity today is moderate with **2 updated issues** and **2 open pull requests**; no new releases were published. Development focus centers on a WebChat background‑tab state‑refresh fix and a new Sendblue iMessage/SMS extension. The repository shows steady community contributions but low immediate engagement (zero comments/reactions on all new items). Overall project health appears stable, with bug‑fix and feature‑addition work in progress.

## 2. Releases
*No new releases today.*

## 3. Project Progress
* **Merged/Closed PRs today:** None.  
* **Open PRs advancing features/fixes:**  
  - **#8125** – `fix(webui): keep run state and notification inbox fresh in background tabs` – addresses stale‑state issues in the WebChat frontend by flipping `refetchOnWindowFocus` to `true` and adding a corresponding flag.  
  - **#8127** – `feat: add Sendblue iMessage and SMS extension` – introduces a bundled extension for direct iMessage/SMS communication, handling phone pairing, authenticated webhooks, and conversation storage within the existing host lifecycle.

## 4. Community Hot Topics
No issues or PRs have attracted comments or reactions today, indicating that community discussion is currently quiet. The most notable items are:
- **Issue #8124** – WebChat stale‑state bug (see Bugs & Stability).  
- **Issue #8126** – Daily failure taxonomy report (see Feature Requests & Roadmap Signals).  

Both are new (created today) and await maintainer review.

## 5. Bugs & Stability
| Severity | Item | Description | Fix PR |
|----------|------|-------------|--------|
| **Medium‑High** | [#8124](https://github.com/nearai/ironclaw/issues/8124) | Stale tool‑action status and missing completion notifications in background tabs on plain‑HTTP deployments; silent Web‑Push gap. | [#8125](https://github.com/nearai/ironclaw/pull/8125) (partial fix for items 1–2) |

No crashes or regressions reported today.

## 6. Feature Requests & Roadmap Signals
- **User‑requested features:**  
  - **#8126** – Daily failure‑taxonomy analysis for benchmark runs (officeqa). Signals a need for automated, repeatable quality‑tracking reports.  
  - **#8127** – Sendblue iMessage/SMS extension. Adds a new communication channel; likely to be included in a future release if merged.  
- **Roadmap implication:** The extension PR suggests a direction toward broader messaging‑platform integrations. The taxonomy issue points to continued investment in benchmark‑driven reliability monitoring.

## 7. User Feedback Summary
**Pain points:**  
- Background‑tab stale state in WebChat (Issue #8124) disrupts monitoring and notification workflows.  
- Lack of automated failure‑trend reporting makes it harder to track model‑quality regressions (Issue #8126).  

**Satisfaction/Dissatisfaction:**  
Feedback is currently limited to bug reports and feature proposals; no explicit satisfaction indicators are visible. The active submission of a targeted fix PR (#8125) suggests engaged users willing to contribute solutions.

## 8. Backlog Watch
No long‑unanswered issues are evident today. Both open issues (#8124, #8126) were created within the last 24 hours and are already paired with fix/feature PRs (#8125, #8127). Maintainers should prioritize reviewing these PRs to close the feedback loop.

---
*Generated from GitHub data for 2026-10-06. All links reference the nearai/ironclaw repository.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>



# LobsterAI Project Digest — 2026-10-06

## 1. Today's Overview

LobsterAI shows moderate-to-high development activity with 9 open issues and 6 pull requests updated in the past 24 hours, including a notable burst of security-related findings and fixes from contributor carfeii. No new releases were published, and the most recent tagged version remains `2026.9.23` (`v0.2.4`). The project is actively addressing security vulnerabilities on the `main` branch (pre-release), while also resolving longer-standing community issues around model configuration, platform consistency, and SQLite tuning. Overall project health is solid, with a strong defensive patch wave and continued community engagement.

## 2. Releases

No new releases published today. The latest tagged version remains **v0.2.4** (published 2026-09-23, commit `7863db4c`).

## 3. Project Progress

**Merged / Closed PRs (6):**

- **PR #2800** — [fix(skills): align SKILL.md frontmatter parsing with OpenClaw](https://github.com/netease-youdao/LobsterAI/issues/2800) — Resolves a compatibility gap where LobsterAI's strict `js-yaml` parser rejected hand-written skill metadata that OpenClaw normally repairs (e.g. unquoted `description: Use when: ...`). Improves skill install reliability from the marketplace.
- **PR #2785** — [fix: P2P direct-message policy fails open instead of closed](https://github.com/netease-youdao/LobsterAI/issues/2785) — Closes a security-critical bug where the NIM P2P inbound filter treated `'disabled'`, unset, and empty-allowlist policies as permissive. Fixes #2784.
- **PR #2799** — [fix(skills): stop using temp extraction dir names as skill ids](https://github.com/netease-youdao/LobsterAI/issues/2799) — Prevents duplicate skill entries and broken marketplace update detection for skills whose `SKILL.md` sits at the archive root.

**Open PRs (3):**

- **PR #2798** — [fix: credential log redaction, preview-server symlink containment, and OpenClaw proxy auth](https://github.com/netease-youdao/LobsterAI/issues/2798) — Consolidates fixes for three security findings (#2795, #2796, #2797). Not yet merged.
- **PR #2794** — [fix(skills): stop trusting skill-controlled `_meta.json` for the delete path](https://github.com/netease-youdao/LobsterAI/issues/2794) — Addresses arbitrary directory deletion vulnerability (#2793). Not yet merged.
- **PR #1277** — [chore(deps-dev): bump electron group](https://github.com/netease-youdao/LobsterAI/issues/1277) — Dependabot update from Electron 43.5.0 → 44.4.5 and electron-builder. Stale, open since April.

## 4. Community Hot Topics

- **Custom Gemini proxy model support** — [Issue #831](https://github.com/netease-youdao/LobsterAI/issues/831) (4 comments, stale since Oct 5) — Users need flexibility to route Gemini traffic through custom proxy endpoints. Low reaction count suggests a niche but persistent pain point for enterprise/custom-deployment users.
- **Tavily MCP unavailable (401)** — [Issue #989](https://github.com/netease-youdao/LobsterAI/issues/989) (2 comments, stale) — API key is configured but the Tavily MCP integration returns 401. Points to either a credential forwarding bug or a Tavily-side change.
- **SQLite parameters unoptimized for desktop** — [Issue #829](https://github.com/netease-youdao/LobsterAI/issues/829) (1 comment, stale) — Feature request to tune SQLite WAL mode, journal size, and sync settings for desktop application workloads.
- **Windows vs. macOS pricing page inconsistency** — [Issue #834](https://github.com/netease-youdao/LobsterAI/issues/834) (1 comment, stale) — Platform-specific portal URLs surface different pricing tiers (0.1/0.2/0.5 vs. 10/20/50) and login state. Significant UX inconsistency affecting conversion.

**Underlying needs:** Users are requesting better multi-model flexibility (custom proxies), platform parity (Windows/macOS), and deeper integration reliability (Tavily MCP, NIM P2P).

## 5. Bugs & Stability

| Severity | Issue | PR Fix | Status |
|----------|-------|--------|--------|
| **Critical** | #2793 — Skill-controlled metadata enables arbitrary directory deletion on uninstall | #2794 (open) | Unmerged; `main`-branch only, not in v0.2.4 |
| **Critical** | #2784 — P2P direct-message policy fails open; 'disabled' and unset policies allow any sender | #2785 ✅ **Merged** | Fixed in main |
| **High** | #2797 — OpenClaw token proxy accepts unauthenticated requests, forwards with user's bearer token | #2798 (open) | Unmerged; `main`-branch only |
| **High** | #2796 — HTML preview server follows symlinks outside permitted directory | #2798 (open) | Unmerged; `main`-branch only |
| **High** | #2795 — OAuth access/refresh tokens written to diagnostic logs | #2798 (open) | Unmerged; `main`-branch only |
| **Medium** | #989 — Tavily MCP returns 401 despite configured API key | None | Open, stale |
| **Low** | #831 — Latest version doesn't support custom Gemini proxy models | None | Open, stale |
| **Low** | #834 — Windows vs. macOS portal URL & pricing mismatch | None | Open, stale |

**Note:** The four critical/high security issues (#2793–#2797) are `main`-branch-only and do not affect the latest released version `v0.2.4`. This suggests they were introduced during active development of the OpenClaw/skills integration and have not yet been shipped.

## 6. Feature Requests & Roadmap Signals

- **Custom model proxy support** ([#831](https://github.com/netease-youdao/LobsterAI/issues/831)) — Users want to route LLM traffic through self-hosted or intermediary proxies, especially for Gemini and other supported models. Likely roadmap item for enterprise/custom deployments.
- **Tavily MCP fix/reliability** ([#989](https://github.com/netease-youdao/LobsterAI/issues/989)) — MCP integrations are increasingly important for agent tooling; resolving 401 errors will improve out-of-the-box search capability.
- **SQLite desktop tuning** ([#829](https://github.com/netease-youdao/LobsterAI/issues/829)) — Performance-conscious users are requesting WAL mode, synchronous settings, and cache tuning for local database operations. A reasonable enhancement for the next release cycle.
- **Platform parity (Windows/macOS portal)** ([#834](https://github.com/netease-youdao/LobsterAI/issues/834)) — Pricing and portal URL inconsistency signals a need for centralized pricing/URL management in the admin backend.

**Predicted next-version inclusions:** Skill metadata fixes (#2800, #2799), credential redaction (#2798), and the P2P policy fix (#2785) are all candidates for the next patch release.

## 7. User Feedback Summary

- **Security-conscious users** are actively reporting and validating vulnerabilities (carfeii's contributions demonstrate detailed reproducible findings). Satisfaction is high with the rapid triage and merged fixes for #2784/#2785.
- **Skill marketplace users** are experiencing duplicate installs and metadata parsing failures — fixed by #2800 and #2799, which should improve UX significantly.
- **Enterprise/custom-deployment users** need custom proxy model support and are frustrated by the lack of configurability ([#831](https://github.com/netease-youdao/LobsterAI/issues/831)).
- **General users** report platform-specific bugs (Windows vs. macOS portal mismatch, [#834](https://github.com/netease-youdao/LobsterAI/issues/834)) and MCP integration failures ([#989](https://github.com/netease-youdao/LobsterAI/issues/989)), indicating gaps in cross-platform QA.
- Overall sentiment: Positive momentum on security and skill system quality; ongoing frustration with platform parity and configuration flexibility.

## 8. Backlog Watch

| Issue | Age | Priority | Notes |
|-------|-----|----------|-------|
| [#831](https://github.com/netease-youdao/LobsterAI/issues/831) — Custom Gemini proxy not supported | ~6 months | Medium | Stale, no maintainer response since Oct 5 |
| [#989](https://github.com/netease-youdao/LobsterAI/issues/989) — Tavily MCP 401 error | ~6 months | Medium | Stale, no fix PR |
| [#829](https://github.com/netease-youdao/LobsterAI/issues/829) — SQLite parameters unoptimized | ~6 months | Low | Stale, feature request |
| [#834](https://github.com/netease-youdao/LobsterAI/issues/834) — Windows/macOS portal inconsistency | ~6 months | Medium | Stale, cross-platform bug |
| [#1277](https://github.com/netease-youdao/LobsterAI/issues/1277) — Electron bump (43→44) | ~6 months | Low | Dependabot PR, stale but low-risk |

**Recommendation:** Maintainers should prioritize closing or triaging the four stale issues (#831, #989, #829, #834) that have been open since March. The Electron dependency bump (#1277) is low-risk and should be merged to keep dependencies current. Additionally, the three open security PRs (#2794, #2798, #2799) should be reviewed and merged promptly given the severity of the vulnerabilities they address.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest: 2026-10-06**

**1. Today's Overview**
Moltis exhibited minimal but focused activity on October 6th, with no new releases distributed. The project experienced a slight uptick in repository maintenance, marked by two new open pull requests and two active issues, primarily focusing on Discord chat classification and YAML skill file parsing. Overall, the project health appears stable with developers actively addressing edge cases in chat handling and file generation.

**2. Releases**
None.

**3. Project Progress**
*   **PRs Opened (2):** Two new pull requests were initiated to resolve specific stability and classification issues.
    *   **Discord Classification:** A fix was proposed to distinguish between direct messages and group chats in Discord, ensuring 1:1 DMs are not treated as shared channels.
    *   **Skill YAML Parsing:** A fix was proposed to properly quote YAML frontmatter in skill files to prevent parsing errors.

**4. Community Hot Topics**
*   **MCP Credentials in Shared Chats (Issue #1294):** [Link](https://github.com/moltis-org/moltis/issues/1294)
    *   *Analysis:* A user is requesting granular control over Model Context Protocol (MCP) credentials within group chats. Currently, the system uses a static credential for the session, making it difficult to attribute messages or manage permissions for specific senders in a shared environment.
*   **Discord Direct Message Handling (PR #1295):** [Link](https://github.com/moltis-org/moltis/pull/1295)
    *   *Analysis:* This is currently the most relevant technical advancement, addressing the root cause of credential attribution issues by ensuring DMs are correctly classified as direct chats rather than shared channels.

**5. Bugs & Stability**
*   **Severity: Medium** - **Skill Creation File Corruption (Issue #1292):**
    *   *Description:* The `create_skill` command successfully reports creation but writes malformed YAML frontmatter. Files containing specific characters (like `: `, `#`, or quotes) result in files that the skill discovery mechanism cannot parse, rendering skills unusable.
    *   *Status:* **Fix PR Exists** - Pull Request #1293 is open to address this by enforcing proper quoting and refusing to save unparseable files.

**6. Feature Requests & Roadmap Signals**
*   **Per-Sender MCP Credentials:** The community is pushing for enhanced session management to support multi-user environments. This suggests a roadmap direction toward better permissioning and identity attribution in shared chat interfaces (Telegram, Discord, Slack).
*   **Robust YAML Handling:** The stability issues with skill files indicate a need for stricter input validation and safer file generation logic in future versions.

**7. User Feedback Summary**
*   **Pain Point:** Users relying on Moltis for multi-user communication (shared chats) face friction regarding identity attribution and file integrity.
*   **Satisfaction:** High trust in the `create_skill` command (users expect success) but frustration with the resulting data corruption and inability to use the generated skills due to parsing failures.

**8. Backlog Watch**
*   **Issue #1294:** While a fix exists for the Discord classification (PR #1295), the underlying feature request for per-sender MCP credentials remains unaddressed and is a high-priority enhancement for multi-user workflows.
*   **Issue #1292:** Although a fix PR exists, the specific edge cases causing the YAML corruption (e.g., leading `&`, `!`, or special characters) should be monitored to ensure the fix is comprehensive.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

**CoPaw Project Digest: 2026-10-06**

### 1. Today's Overview
The CoPaw project shows robust activity with 44 issues and 26 pull requests updated in the last 24 hours. The project is in a maintenance and stabilization phase, actively addressing stability regressions, security vulnerabilities, and UI/UX refinements. Despite a lack of new releases, the high volume of issue triage and PR submissions indicates a healthy, engaged community working to improve reliability and usability across the platform.

### 2. Releases
**None.** No new releases were published in the last 24 hours.

### 3. Project Progress
*   **PR Activity:** 24 Open PRs, 2 Merged/Closed.
*   **Key Progress:**
    *   **Browser & SDK Fixes:** Multiple PRs (#8029, #7987) are addressing Playwright integration issues, specifically allowing users to drop default arguments and load browser extensions in persistent profiles.
    *   **Security Hardening:** PRs #8028 and #8048 are fixing critical Windows security issues where inline Office COM automation (e.g., `PowerPoint.Application`) could be executed when sandboxing is disabled.
    *   **Model & Provider Improvements:** PRs #8090 and #8096 are improving provider compatibility, specifically fixing support for newer GPT-6 token limits and surface truncation warnings in chat responses.
    *   **Memory & Search:** PRs #8062 and #7988 are enhancing memory embedding reindexing and fixing `grep_search` to prevent ingestion of binary files and internal database artifacts (like `.db-wal`).

### 4. Community Hot Topics
*   **Web Console UX Issues:** There is significant community feedback regarding the web console design, specifically regarding input usability (#7948) and file panel refresh mechanisms (#7996).
*   **DeepLink Navigation:** A technical issue affecting navigation across agents via deep links (#8101) is generating discussion.
*   **Plugin & Installation Stability:** Users are reporting installation failures in containerized environments (#8106) and issues with tool approval buttons (#8105).

### 5. Bugs & Stability
*   **High Severity:**
    *   **Session Corruption (DeepSeek):** A critical bug where sending a PDF via `send_file_to_user` permanently corrupts the session context, causing all subsequent requests to fail with 400 errors (#8064).
    *   **Windows Volume Lock:** A sandbox configuration issue on Windows where a workspace root directory can become locked indefinitely (#7943).
    *   **Session Loss:** A regression where chat sessions are lost entirely after API stream errors (#8109).
*   **Medium Severity:**
    *   **Boot Failure:** The console fails to boot correctly if WebView2 cache becomes stale, with no retry mechanism (#8094).
    *   **Model Capability Mismatch:** Runtime errors where the system claims a model does not support images (multimodal) despite the catalog reporting `supports_multimodal=true` (#8093).
*   **Low Severity:**
    *   **Timezone Handling:** Transcript timestamps are incorrectly shifted due to DST issues (#8046).
    *   **Transcription Configuration:** The transcription model cannot be updated in the UI (#8035).

### 6. Feature Requests & Roadmap Signals
*   **Dot-File Visibility:** A feature request to add a toggle in the Files panel to show hidden dot-prefixed files (#7731).
*   **Transcription Customization:** Users request the ability to configure the Whisper API model name per provider (#8052).
*   **Provider Config Simplification:** A request to streamline the provider configuration UI in the console (#7307).

### 7. User Feedback Summary
*   **Dissatisfaction:** Users are experiencing frustration with "doom loops" where sessions are corrupted by file processing errors or binary file ingestion, making the tool unreliable for production use.
*   **Usability:** The desktop and web interfaces are struggling with edge cases—specifically large file downloads (13k+ files) causing timeouts and the browser profile failing to load extensions.
*   **Trust:** Security concerns are rising regarding the handling of shell commands and COM automation on Windows, with users fearing accidental execution of system-critical applications.

### 8. Backlog Watch
*   **Issue #7991:** A discrepancy between the TaskTracker global status and the actual running chat count has gone unanswered for several days.
*   **Issue #7053:** A long-standing issue regarding OAuth2 refresh token rotation for MCP servers has an open PR (#7066) but the specific fix for the rotated token persistence has not been merged.
*   **Issue #5950:** A recurrence of an embedding reindex bug where CJK chunks fail silently due to token limits remains unresolved.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-06

## 1. Today's Overview
ZeroClaw maintains high activity levels with 20 issues and 50 PRs updated in the last 24 hours. The project is actively stabilizing the runtime infrastructure, improving observability, and expanding platform support (WhatsApp, Teams, Signal). While major releases are pending, the development velocity suggests a likely v0.8.6 candidate in the near future. The team is currently prioritizing critical sandboxing bugs and configuration management issues.

## 2. Releases
**None**. The project is currently in a feature and bug-fix sprint, likely preparing for a v0.8.6 release cycle based on recent issue tags and roadmap signals.

## 3. Project Progress
The development team focused on deepening the runtime architecture and platform integrations:
*   **Runtime & Security:** Significant progress on the "public runtime composition boundary" (#10993) and "canonical sandbox_policy schema" (#7821), aiming to make the runtime more modular and secure.
*   **Platform Expansion:** New PRs implement critical features for the WhatsApp Web channel (poll voting, room management) (#10988, #10979) and add support for the Microsoft Teams Bot Framework (#11194).
*   **Observability & Config:** A major PR (#10499) introduces validation for persistent config writes to prevent data loss, and another (#11535) restores cost attribution in AgentEnd events.

## 4. Community Hot Topics
The most active discussions center on the **ZeroCode TUI (UI)** and **SOP (Standard Operating Procedure)** workflow authoring.
*   **ZeroCode TUI Issues:** User-reported bugs regarding the "Copy" button (#11418) and chat update latency behind log notifications (#11482) are the most commented. These highlight a need for smoother, real-time feedback in the command-line interface.
*   **SOP Authoring & Governance:** A cluster of new issues (#11547–#11551) proposes a sophisticated, "visual authoring" workflow for SOPs, including binding runs to immutable definitions and creating composable child nodes. This indicates a push towards making SOPs more robust and operator-friendly.
*   **Anthropic & Auth:** A long-standing PR (#9420) seeks to add OAuth profile support for Anthropic, a feature highly requested by enterprise users.

## 5. Bugs & Stability
**Critical/S0 Bugs Detected:**
1.  **Config Data Loss (Risk: High):** Issue #10495 reports that `Config::save()` can catastrophically truncate a populated config.toml to ~702 bytes, wiping out agent configurations. A fix is being tracked in PR #10499.
2.  **Sandboxing Failures (Risk: High):** Two new critical bugs (#11540, #11539, #11538) prevent the Bubblewrap and Firejail sandboxes from functioning on Linux, causing tool calls to fail or fallback to insecure application-layer execution.

**Medium Priority Bugs:**
*   **Daemon State Corruption:** Issue #11432 notes that if the daemon dies mid-turn, the session state remains marked as `'running'` indefinitely, blocking cleanup.
*   **Agent Loop Observability:** Issue #8539 highlights a missing `cost_usd` field in `AgentEnd` events, hindering accurate billing and tracking.

## 6. Feature Requests & Roadmap Signals
*   **Compact Local Runtime:** Issue #5287 requests a "compact local_small runtime profile" to reduce prompt bloat and prevent internal instructions from leaking into user output, addressing a key local-first user pain point.
*   **Signal Media Support:** Issue #7891 requests adding media attachment support for the Signal channel, currently lagging behind text capabilities.
*   **Cheaper Inference:** PR #11104 adds a `cheaperinference` provider, suggesting the project is actively looking to optimize costs for operators by adding OpenAI-compatible gateways.

## 7. User Feedback Summary
Users are experiencing friction with the **ZeroCode TUI** interface. The primary complaints are UX bugs (non-functional copy buttons) and UI responsiveness (chat updates waiting behind log streams). This suggests the CLI experience is still maturing and needs better separation of concerns between logs and chat responses. Additionally, users are increasingly concerned about **data safety**, evidenced by the high severity of the config truncation bug.

## 8. Backlog Watch
*   **Agent Runtime Composition:** PR #10993 aims to complete the public runtime composition boundary but has been in progress since September 20th. It is critical for the future modularity of the project.
*   **OAuth Profiles:** PR #9420 (Anthropic OAuth) has been open since July 26th. This is a long-standing feature request that could significantly impact enterprise adoption.
*   **Persistent Session Attachments:** PR #10407 (Sessions) has been open since August 27th. It adds a significant feature for long-running chat sessions.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*