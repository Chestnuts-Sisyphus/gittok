# OpenClaw Ecosystem Digest 2026-09-27

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-26 22:15 UTC

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

**NanoBot Project Digest – 2026‑09‑27**

---

### 1. Today's Overview  
- 4 issues and 13 PRs were touched in the past 24 h; no new releases were published.  
- All open issues remain unresolved, and the majority of PRs are still in review, indicating a steady but not rapid development pace.  
- Two pull‑requests were closed today, both delivering bug‑fixes that improve tooling and workspace integration.  
- The project shows healthy activity in the Feishu and Linear channels, but a handful of open bugs (particularly around agent control flow and cron scheduling) are causing user frustration.

---

### 2. Releases  
*No new releases were published on this date.*

---

### 3. Project Progress  
| PR # | Status | Summary | Link |
|------|--------|---------|------|
| **5916** | *Closed* | Fixed incomplete MCP tool discovery – all pages of a server’s `/tools/list` are now registered. | https://github.com/HKUDS/nanobot/pull/5916 |
| **5919** | *Closed* | Simplified Linear workspace connectivity & added member‑access controls via the WebUI. | https://github.com/HKUDS/nanobot/pull/5919 |

- Both PRs were merged before 24 h, delivering more reliable agent‑to‑service integration and a cleaner admin experience.

---

### 4. Community Hot Topics  
| Issue / PR | Comments / Reactions | Core Need | Link |
|------------|----------------------|-----------|------|
| **#5908** – *Show live tokens/sec while streaming a reply* | 4 comments, no reactions yet | Real‑time performance monitoring in the WebUI | https://github.com/HKUDS/nanobot/issues/5908 |
| **#5903** – *Hidden Feishu session‑checkpoint marker* | 2 comments | Correct handling of Feishu auto‑compaction messages | https://github.com/HKUDS/nanobot/issues/5903 |
| **#5929** – *Feishu bot‑to‑bot messages in groups* | 0 comments but the PR has 0 reactions | Enable secure group‑bot collaboration | https://github.com/HKUDS/nanobot/pull/5930 |
| **#5916** – *MCP tools pagination fix* | 0 comments but closed with 0 reactions | Ensure all MCP tools are discoverable | https://github.com/HKUDS/nanobot/pull/5916 |
| **#5919** – *Linear member access simplification* | 0 comments but closed | Streamlined workspace access for admins | https://github.com/HKUDS/nanobot/pull/5919 |

**Analysis**  
- The most vocal issue is #5908, highlighting a demand for live telemetry in the WebUI.  
- Feishu integration problems (#5903 & #5929) suggest a growing user base on that platform and a need for tighter channel handling.  
- The closed PRs demonstrate responsiveness to tooling bugs, but feature‑request traffic remains high.

---

### 5. Bugs & Stability  
| Issue | Severity | Description | Fix PR (if any) | Link |
|-------|----------|-------------|-----------------|------|
| **#5924** – *Agent stuck in sudo loop* | p1 | The agent repeatedly asks for sudo, becoming unusable. | None (bug remains open) | https://github.com/HKUDS/nanobot/issues/5924 |
| **#5922** – *Cron time calculation with local TZ* | p1 | Next‑run calculation ignores daylight‑saving rules. | None (bug remains open) | https://github.com/HKUDS/nanobot/issues/5922 |
| **#5903** – *Hidden Feishu checkpoint marker* | p2 | Auto‑compaction drops a non‑hidden message to the user. | PR #5930 (fixes the group side but not this auto‑compaction bug) | https://github.com/HKUDS/nanobot/issues/5903 |
| **#5916** – *Partial MCP tool discovery* | p2 | Only first page of tools listed, leading to missing capabilities. | PR #5916 (merged) | https://github.com/HKUDS/nanobot/pull/5916 |
| **#5928** – *Mail charset decoding crash* | p2 | Unknown charset throws `LookupError`. | PR #5928 (merged) | https://github.com/HKUDS/nanobot/pull/5928 |
| **#5923** – *Base64 image decode failure* | p2 | Non‑ASCII base64 causes uncaught `ValueError`. | PR #5923 (merged) | https://github.com/HKUDS/nanobot/pull/5923 |

*The two p1 bugs are the highest priority, but no fixes were merged today. The remaining bugs were addressed by closed PRs.*

---

### 6. Feature Requests & Roadmap Signals  
| Request | Priority | Likely Next‑Version Impact | Link |
|---------|----------|----------------------------|------|
| **Live tokens/sec UI** (#5908) | p2 | High – directly requested by a user; likely to surface in a future UI revamp. | https://github.com/HKUDS/nanobot/issues/5908 |
| **Feishu bot‑to‑bot messaging** (#5929) | p2 | Medium – PR closed but still waiting for final acceptance; could be part of the next incremental release. | https://github.com/HKUDS/nanobot/pull/5930 |
| **Agent sudo loop resolution** (#5924) | p1 | Critical – users report unusable agents; needs urgent resolution before next stable release. | https://github.com/HKUDS/nanobot/issues/5924 |
| **Cron TZ accuracy** (#5922) | p1 | Critical – affects scheduled tasks across multiple time zones; expected in upcoming maintenance cycle. | https://github.com/HKUDS/nanobot/issues/5922 |

The trend suggests the next release will prioritize the **live token‑speed indicator** and **Feishu messaging improvements**, while the critical agent‑control and scheduling bugs will drive a focused hot‑fix patch.

---

### 7. User Feedback Summary  
- **Performance Visibility**: Users on the WebUI complain they cannot gauge reply generation speed, especially when models stall.  
- **Feishu Channel Issues**: The community reports that hidden session‑checkpoint markers appear after idle compaction and that bot‑to‑bot mentions in group chats are dropped.  
- **Agent Reliability**: The sudo‑loop bug is a major pain point, with users unable to execute privileged commands reliably.  
- **Cron Scheduling**: Incorrect timezone handling leads to tasks running an hour early/late, causing scheduling headaches.  

Overall sentiment: *Positive engagement on integration features but frustrated by recurring bugs that impede day‑to‑day productivity.*

---

### 8. Backlog Watch  
| Issue | Age | Open Status | Notes |
|-------|-----|-------------|-------|
| **#5908** | 3 days (since 2026‑09‑24) | Open | Highest comment count; urgent for UI polish. |
| **#5924** | 1 day | Open | p1 bug; no resolution in PRs today. |
| **#5922** | 1 day | Open | p1 bug; remains unaddressed. |
| **#5903** | 3 days | Open | p2 bug; PR #5930 addresses related group logic but not auto‑compaction. |
| **#5929** | 0 days | Open | PR pending review; may delay group‑bot feature. |

These items have either high severity or sustained community discussion and should be prioritized in the next sprint.

---

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

## Hermes Agent Project Digest — 2026-09-27

## 1. Today’s Overview

Hermes Agent showed high maintenance activity in the last 24-hour window: **50 Issues** and **50 Pull Requests** were updated, with **31 Issues open/active**, **19 Issues closed**, **37 PRs open**, and **13 PRs merged/closed**. No new release was issued during the window.

The project’s activity is heavily concentrated in **bug triage, desktop/TUI session-state stability, gateway/profile lifecycle management, update/migration correctness, and MCP/plugin dependency handling**. Several P2/P3 bugs were closed, indicating responsive fix velocity, but multiple high-severity open issues remain, including one **P1 session-wipe risk** and several regressions around desktop profiles, gateway identity, and update hand-offs.

Overall project health can be assessed as **active and responsive, but bug-heavy**. The absence of a new release combined with a large number of closed bugs and open regression reports suggests fixes are still converging toward a future release or hotfix.

---

## 2. Releases

No new releases were reported in the data window.

---

## 3. Project Progress

The data reports **13 PRs merged/closed** in the last 24 hours. The following closed/merged PRs are visible in the supplied top list:

- [PR #122257](https://github.com/NousResearch/hermes-agent/pull/122257) — **fix(agent): invalidate usage anchors on prefix rewrites and clamp context display**  
  This addresses the context-usage over-reporting issue where the UI could display token usage above the model’s context window. It invalidates stale usage anchors after compaction or prefix rewrites and clamps displayed context values.

- [PR #121443](https://github.com/NousResearch/hermes-agent/pull/121443) — **fix(desktop): ignore-existing skips discovered runtimes without repeating install**  
  This fixes the behavior where `HERMES_DESKTOP_IGNORE_EXISTING=1` / `hermes desktop --ignore-existing` did not prevent a local backend from starting. Desktop now skips the active runtime rung in backend resolution.

- [PR #122369](https://github.com/NousResearch/hermes-agent/pull/122369) — **fix(desktop): add a File Browser toggle to Appearance settings**  
  Adds a visible Appearance settings toggle for the file browser’s default open/closed state, addressing the UX complaint that the persisted file-browser state had no discoverable control.

- [PR #124506](https://github.com/NousResearch/hermes-agent/pull/124506) — **fix(tui_gateway): scope session.status to the session’s own profile**  
  Ensures `session.status` reports the profile home of the session’s own profile rather than the pooled backend’s launch profile. This is part of the broader profile-scoping correctness effort.

- [PR #122898](https://github.com/NousResearch/hermes-agent/pull/122898) — **fix: profile terminal.cwd beats the desktop’s inherited workspace cwd**  
  Prevents a desktop app-global workspace directory from silently overriding a named profile’s `terminal.cwd` when creating a new chat bound to that profile.

- [PR #121997](https://github.com/NousResearch/hermes-agent/pull/121997) — **fix(updates/win): cua-driver opt-in autostart, Intel-Mac installer docs, click-session poll**  
  Makes the Windows `cua-driver` logon task opt-in rather than silently registered at every install, and addresses related Windows/Intel-Mac installer and click-session behavior.

Additional closed Issues in the same window indicate completed fixes or triage closure, including:

- [Issue #60456](https://github.com/NousResearch/hermes-agent/issues/60456) — `prefill_messages_file` ignored by Desktop App.
- [Issue #65173](https://github.com/NousResearch/hermes-agent/issues/65173) — file browser reopens on session start.
- [Issue #70944](https://github.com/NousResearch/hermes-agent/issues/70944) — multi-profile sidebar empty after Desktop update.
- [Issue #81564](https://github.com/NousResearch/hermes-agent/issues/81564) — `hermes serve --status` / dashboard stop asymmetry.
- [Issue #76954](https://github.com/NousResearch/hermes-agent/issues/76954) — newly added MCP servers not picked up by new Desktop sessions.
- [Issue #95779](https://github.com/NousResearch/hermes-agent/issues/95779) — Desktop “Clear chat” did not clear conversation context.
- [Issue #95853](https://github.com/NousResearch/hermes-agent/issues/95853) — `open_preview` on a directory returned success but opened nothing.
- [Issue #97389](https://github.com/NousResearch/hermes-agent/issues/97389) — Windows Computer Use toolset registered a per-boot task with no opt-out.
- [Issue #123856](https://github.com/NousResearch/hermes-agent/issues/123856) — stale-transcript guard repeatedly locked users out.
- [Issue #123033](https://github.com/NousResearch/hermes-agent/issues/123033) — stale-transcript guard blocked sends in active sessions.
- [Issue #109760](https://github.com/NousResearch/hermes-agent/issues/109760) — context usage over-reported beyond model limit.
- [Issue #117682](https://github.com/NousResearch/hermes-agent/issues/117682) — `--ignore-existing` did not prevent local backend start.
- [Issue #99033](https://github.com/NousResearch/hermes-agent/issues/99033) — macOS 12.7 Desktop download compatibility issue.
- [Issue #99819](https://github.com/NousResearch/hermes-agent/issues/99819) — Kanban RunClock mislabeled cumulative task age as active work time.
- [Issue #49645](https://github.com/NousResearch/hermes-agent/issues/49645) — Windows gateway connection issue closed as part of update/Windows stability work.

---

## 4. Community Hot Topics

The most discussed items are concentrated around **session ownership**, **Desktop/TUI/gateway consistency**, and **update/profile lifecycle**.

| Item | Status | Comments | Link | Underlying Need |
|---|---:|---:|---|---|
| [Issue #94778](https://github.com/NousResearch/hermes-agent/issues/94778) | Open | 9 | [link](https://github.com/NousResearch/hermes-agent/issues/94778) | Multi-backend session-state safety. The shared interrupted-turn marker can be misread by another backend, causing duplicate turns and misleading “backend stopped” notices. |
| [Issue #106217](https://github.com/NousResearch/hermes-agent/issues/106217) | Open | 8 | [link](https://github.com/NousResearch/hermes-agent/issues/106217) | Clear session ownership and recovery paths. Desktop dead-ends when trying to resume a session owned by a live TUI. |
| [Issue #60456](https://github.com/NousResearch/hermes-agent/issues/60456) | Closed | 6 | [link](https://github.com/NousResearch/hermes-agent/issues/60456) | Configuration parity across TUI, Desktop, and gateway. `prefill_messages_file` was ignored by Desktop. |
| [Issue #65173](https://github.com/NousResearch/hermes-agent/issues/65173) | Closed | 5 | [link](https://github.com/NousResearch/hermes-agent/issues/65173) | Discoverable UI persistence controls. File browser state reopened despite persisted closed state and had no settings toggle. |
| [Issue #70944](https://github.com/NousResearch/hermes-agent/issues/70944) | Closed | 4 | [link](https://github.com/NousResearch/hermes-agent/issues/70944) | Update/migration data integrity. After Desktop update, profile sidebars could appear empty and look like data loss. |
| [Issue #81564](https://github.com/NousResearch/hermes-agent/issues/81564) | Closed | 4 | [link](https://github.com/NousResearch/hermes-agent/issues/81564) | Lifecycle visibility. `hermes serve --status` hid serve-mode backends while `hermes dashboard --stop` could kill them. |
| [Issue #76954](https://github.com/NousResearch/hermes-agent/issues/76954) | Closed | 4 | [link](https://github.com/NousResearch/hermes-agent/issues/76954) | Tool/MCP registry refresh semantics. `hermes mcp add` said “start a new session,” but Desktop did not pick up newly added MCP servers. |
| [Issue #124077](https://github.com/NousResearch/hermes-agent/issues/124077) | Open | 4 | [link](https://github.com/NousResearch/hermes-agent/issues/124077) | Compression failure classification and session safety. A Codex summary stall is misclassified as a network failure, bypassing fallback and causing gateway session wipe. |
| [Issue #122063](https://github.com/NousResearch/hermes-agent/issues/122063) | Open | 4 | [link](https://github.com/NousResearch/hermes-agent/issues/122063) | Profile-control channel resilience. Desktop 0.21.4 can show the same chat for all bots after profile control channel stalls. |

Reaction activity was minimal in the supplied data, with only a few items showing one 👍. The main community signal is comment density, not reactions.

---

## 5. Bugs & Stability

### Highest-priority open bugs

| Rank | Bug | Severity / Status | Risk | Fix PR Visible? |
|---:|---|---|---|---|
| 1 | [Issue #124077](https://github.com/NousResearch/hermes-agent/issues/124077) — Codex summary stall classified as network failure; compression never falls back and gateway wipes session | **P1, Open** | High data-loss risk. A stalled compression summary is misclassified, bypassing fallback and causing the gateway to discard the session. | No direct fix PR in the supplied data. |
| 2 | [Issue #122063](https://github.com/NousResearch/hermes-agent/issues/122063) — Desktop 0.21.4 shows the same chat for all bots after profile control channel stalls | **P2, Open, urgent regression** | High user-facing regression. Multiple profiles/bots can collapse into one visible chat while the primary WebSocket remains connected. | Related profile-scoping PRs exist: [PR #124506](https://github.com/NousResearch/hermes-agent/pull/124506), [PR #124505](https://github.com/NousResearch/hermes-agent/pull/124505). Direct fix not confirmed. |
| 3 | [Issue #94778](https://github.com/NousResearch/hermes-agent/issues/94778) — interrupted-turn marker shared across backends has no writer identity | **P2, Open** | Session duplication and misleading backend-state notices when multiple backends share `HERMES_HOME`. | No direct fix PR in the supplied data. |
| 4 | [Issue #106217](https://github.com/NousResearch/hermes-agent/issues/106217) — Desktop dead-ends when resuming a session owned by a live TUI | **P2, Open** | User cannot proceed after Desktop refuses to attach to a session already owned by TUI. | No direct fix PR in the supplied data. |
| 5 | [Issue #123151](https://github.com/NousResearch/hermes-agent/issues/123151) — multiplex migration never confirms because bootstrap-launched gateway fails identity check | **P2, Open** | Migration can remain stuck; `gateway_migration.json` may never clear. | Related issue: [Issue #124029](https://github.com/NousResearch/hermes-agent/issues/124029). No direct fix PR in supplied data. |
| 6 | [Issue #124029](https://github.com/NousResearch/hermes-agent/issues/124029) — pm-runtime launcher cmdline is never recognized by gateway identity matchers | **P2, Open** | Gateway liveness/identity verification can fail for shim-launched gateways. | Related issue: [Issue #123151](https://github.com/NousResearch/hermes-agent/issues/123151). No direct fix PR in supplied data. |
| 7 | [Issue #124413](https://github.com/NousResearch/hermes-agent/issues/124413) — Cron → Telegram deliveries lose all formatting when HTML tags are present | **P2, Open** | Message-delivery regression. Rich Messages are not attempted on certain cron delivery paths. | No direct fix PR in the supplied data. |
| 8 | [Issue #124451](https://github.com/NousResearch/hermes-agent/issues/124451) — MCP results from Python-SDK servers reach the model twice | **P2, Open** | Duplicate tool results can corrupt reasoning, increase token cost, and degrade agent reliability. | No direct fix PR in the supplied data. |
| 9 | [Issue #123869](https://github.com/NousResearch/hermes-agent/issues/123869) — Messaging badge reads “Restart needed” forever on standalone gateway | **P2, Open** | Misleading operational state. A connected platform can be shown as needing restart. | No direct fix PR in the supplied data. |
| 10 | [Issue #122395](https://github.com/NousResearch/hermes-agent/issues/122395) — `activate_dependencies` selects a dependency generation built for another interpreter | **P2, Open** | Source-install stability risk. HTTP MCP servers can park and cron workers can lose dependencies such as `ruamel`. | No direct fix PR in the supplied data. |
| 11 | [Issue #124473](https://github.com/NousResearch/hermes-agent/issues/124473) — Windows Desktop update leaves multiplex host gateway down when named profile is active | **P2, Open** | Update can leave all bots offline after successful Desktop update. | **Fix PR exists:** [PR #124482](https://github.com/NousResearch/hermes-agent/pull/124482), open. |
| 12 | [Issue #120991](https://github.com/NousResearch/hermes-agent/issues/120991) — false “This gateway is STANDALONE” warning from stale `gateway_state.json` | **P2, Open** | Misleading status on healthy multiplexing hosts. | No direct fix PR in the supplied data. |
| 13 | [Issue #110238](https://github.com/NousResearch/hermes-agent/issues/110238) — `hermes update` leaves `fleet_restart_pending` with hashed systemd unit names | **P2, Open** | Update/restart bookkeeping can fail when `HERMES_HOME` is outside `~/.hermes`. | No direct fix PR in the supplied data. |

### Recently closed or fixed bugs

These items were closed in the data window, indicating near-term stability improvements:

- [Issue #109760](https://github.com/NousResearch/hermes-agent/issues/109760) — Context usage over-reported beyond model limit. Related fix: [PR #122257](https://github.com/NousResearch/hermes-agent/pull/122257).
- [Issue #117682](https://github.com/NousResearch/hermes-agent/issues/117682) — `--ignore-existing` did not prevent local backend start. Related fix: [PR #121443](https://github.com/NousResearch/hermes-agent/pull/121443).
- [Issue #123856](https://github.com/NousResearch/hermes-agent/issues/123856) — stale-transcript guard repeatedly refused sends in long sessions.
- [Issue #123033](https://github.com/NousResearch/hermes-agent/issues/123033) — stale-transcript guard permanently blocked sends in active sessions.
- [Issue #70944](https://github.com/NousResearch/hermes-agent/issues/70944) — multi-profile sidebar empty after update.
- [Issue #76954](https://github.com/NousResearch/hermes-agent/issues/76954) — newly added MCP servers not picked up by new Desktop sessions.
- [Issue #81564](https://github.com/NousResearch/hermes-agent/issues/81564) — serve-mode backend status/stop asymmetry.
- [Issue #95779](https://github.com/NousResearch/hermes-agent/issues/95779) — Desktop “Clear chat” only cleared UI state, not conversation context.
- [Issue #95853](https://github.com/NousResearch/hermes-agent/issues/95853) — `open

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

NanoClaw project digest:

1. **Overview** - The NanoClaw project is still in active development with several new features and bug fixes released today. The latest release, v2.4.0, includes updates to the agent-runner, server-side scripts, and integration with Slack.

2. **Releases** - Today saw the release of v2.4.0, which includes several bug fixes and performance improvements. No new releases are planned at this time.

3. **Project Progress** - The PR for adding a skill to render collapsible sections of send cards was opened and will be merged shortly. Other than that, no new major features were added or existing ones were advanced.

4. **Community Hot Topics** - There have been several issues regarding the agent-runner's behavior, especially concerning the handling of long running tasks and the retry mechanism. Some users reported crashes and regressions related to the `LINK_ACTION_SCHEMA` constant.

5. **Bugs & Stability** - Several bugs were reported today, including a crash on startup and an issue with the agent-runner's logging. No fix PRs have been created yet.

6. **Feature Requests & Roadmap Signals** - Several feature requests were submitted, including adding support for Slack workspaces, integrating with Github hosts, and improving the agent's ability to handle different types of models.

7. **User Feedback Summary** - Real user feedback has highlighted the need for better agent performance and more robust error reporting.

8. **Backlog Watch** - Several long-unanswered issues remain, including those related to the agent-runner's behavior and the agent's communication with the server.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>



# IronClaw Project Digest — 2026-09-27

## 1. Today's Overview

IronClaw saw light activity today with one open issue and one open PR updated in the last 24 hours. No new releases were published, indicating the project is in a maintenance cadence rather than a release cycle. The sole issue represents a feature request for NEAR token launchpad integration, while the active PR is an automated CI refresh of the codebase knowledge graph. Overall project health appears stable with no reported bugs or regressions.

## 2. Releases

No new releases were published in the last 24 hours. The latest release information is not available in the current data snapshot.

## 3. Project Progress

**Merged/Closed PRs today: 0**

One open PR was updated but not merged:

- [#7988](https://github.com/nearai/ironclaw/pull/7988) — `chore(agents): refresh codebase knowledge graph` (open, size: XS, risk: low, contributor: core) — An automated CI-generated refresh of the committed codebase-memory bootstrap snapshot from the default branch. Reviewed and awaiting normal merge. This is routine infrastructure maintenance with no user-facing changes.

## 4. Community Hot Topics

**[#8112 — NEARA hosted-MCP extension (keyless NEAR token launchpad tools)](https://github.com/nearai/ironclaw/issues/8112)** — Open, 0 comments, 0 reactions

This issue proposes adding MCP (Model Context Protocol) extension support for NEARA, a NEAR mainnet launchpad offering coins with a fixed 1B supply and concentrated-liquidity pools on Rhea DCL. The requester identifies a gap: IronClaw agents currently have no way to list, quote, launch, or trade tokens on NEAR launchpads. This signals community interest in deepening IronClaw's on-chain DeFi capabilities, particularly around token launches and automated trading assistance on the NEAR ecosystem.

**[#7988 — Refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)** — Open, 0 reactions

Routine internal PR with no community discussion yet.

## 5. Bugs & Stability

No bugs, crashes, or regressions were reported today. Project stability appears unaffected by any new issues in the last 24 hours.

## 6. Feature Requests & Roadmap Signals

**[#8112](https://github.com/nearai/ironclaw/issues/8112)** is the only feature request from today. The proposed NEARA hosted-MCP extension would give IronClaw agents the ability to:

- List and quote new coins on NEAR launchpads
- Launch new token coins
- Trade launched tokens

This aligns with a clear roadmap signal toward **on-chain financial tooling** for NEAR-native agents. If the project is moving toward deeper NEAR ecosystem integration, this feature — especially as a hosted MCP extension — could be a candidate for an upcoming release, though no timeline is indicated.

## 7. User Feedback Summary

The sole piece of user feedback today is the feature request for NEAR launchpad support ([#8112](https://github.com/nearai/ironclaw/issues/8112)). The user identifies a concrete pain point: agents cannot act on NEAR token launchpads at all, creating a functional gap for users who want to discover, evaluate, launch, or trade new tokens programmatically. No dissatisfaction or bug-related feedback was reported today. The project appears to have a quiet feedback surface with low comment/reaction volume overall.

## 8. Backlog Watch

**[#7988](https://github.com/nearai/ironclaw/pull/7988)** — Open since 2026-08-29 (29 days) with no merge yet. While low-risk and automated, the extended duration without resolution may warrant a maintainer check-in to confirm whether the PR is blocked or simply pending review.

**[#8112](https://github.com/nearai/ironclaw/issues/8112)** — Open for one day with no maintainer response or community discussion yet. Worth monitoring for escalation but not yet a concern.

No long-unanswered critical issues were flagged in today's data.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

**LobsterAI – Project Digest (2026‑09‑27)**  

---

### 1. Today's Overview  
On September 27th, LobsterAI saw steady maintenance activity: **6 issues were closed** (all “stale” or bug fixes) and **11 pull‑request updates** were logged, with **10 PRs merged** and **1 still open**. No new releases were published. The team focused on stabilizing authentication, open‑claw gateway startup, modal UI, and scheduled‑task handling. Overall health remains good, with no critical regressions or new security alerts reported today.

---

### 2. Releases  
*No new releases were published on this date; the latest published version remains v2026.3.26.*

---

### 3. Project Progress  
| PR # | Title | Status | Key Work |
|------|-------|--------|----------|
| **#2769** | *fix(dev): stop Vite watch from ignoring renderer artifact sources* | **Open** | Adjusted Vite ignore patterns to preserve hot‑reload for the Artifacts panel and Markdown editor. |
| **#2768** | *fix: openclaw gateway startup timeout extension* | **Merged** | Extended timeout for the OpenClaw gateway bootstrap, reducing flaky start‑ups. |
| **#2767** | *refactor(markdown): split live‑editing engine into structure/commands/widgets modules* | **Merged** | Modularized markdown live‑editing into separate logical layers, improving testability and maintainability. |
| **#1049** | *fix(auth): fetchWithAuth 并发 401 时双重消费 refreshToken* | **Merged** | Centralized 401 retry logic via a shared refresh slot, eliminating double‑consumption of refresh tokens. |
| **#1052** | *fix(openclaw): 两处竞态条件导致 AI 会话永久无法启动* | **Merged** | Fixed race conditions in gateway initialization and session activation to prevent permanent session lock‑ups. |
| **#1054** | *fix(modal): modal close button unclickable when overlapping title bar drag region* | **Merged** | Added `-webkit-app-region:no-drag` to fixed elements, restoring modal close‑button functionality. |
| **#1056** | *fix(cowork): remove debug console.log calls from production code* | **Merged** | Cleaned up stray `console.log` statements, improving performance and compliance with logging policies. |
| **#1057** | *fix(memory): filter thinking blocks from LLM judge response* | **Merged** | Skipped internal “thinking” blocks from Anthropic responses, preventing accidental inclusion in memory storage. |
| **#1058** | *fix(scheduled-task): prevent data loss when run history JSONL write fails* | **Merged** | Added error handling for JSONL file writes during migration, ensuring idempotency and data integrity. |
| **#1059** | *Fix/windows default browser detection* | **Merged** | Corrected default browser detection logic to target Chrome instead of Edge on Windows. |
| **#1065** | *feat(scheduled-task): allow binding task to existing cowork session* | **Merged** | Introduced a session selector for scheduled tasks, enabling reuse of existing cowork sessions. |

---

### 4. Community Hot Topics  
| Issue/PR | Comments/Reactions | Link | Underlying Need |
|----------|--------------------|------|-----------------|
| **#1048** | 2 comments | [#1048](https://github.com/netease-youdao/LobsterAI/issues/1048) | Users reported being forced to log out after simultaneous 401 responses – a concurrency bug in auth logic. |
| **#1051** | 2 comments | [#1051](https://github.com/netease-youdao/LobsterAI/issues/1051) | OpenClaw sessions would lock up after gateway init failures, causing a poor user experience. |
| **#1053** | 2 comments | [#1053](https://github.com/netease-youdao/LobsterAI/issues/1053) | Modal close buttons became unresponsive when the window title bar overlapped, impacting UI usability. |
| **#1066** | 2 comments | [#1066](https://github.com/netease-youdao/LobsterAI/issues/1066) | System messages were leaking into user chats; users wanted filtering of internal logs. |
| **#2769** | Open PR, no comment count provided | [#2769](https://github.com/netease-youdao/LobsterAI/pull/2769) | Developers highlighted a missing hot‑reload for artifact sources, affecting iterative development. |

These items represent the most-discussed issues today and reflect the community’s focus on **authentication reliability**, **gateway stability**, and **UI responsiveness**.

---

### 5. Bugs & Stability  
| Severity | Issue | Fix PR | Status |
|----------|-------|--------|--------|
| **Critical** | *auth fetchWithAuth double‑consumption of refreshToken* | **#1049** | *Fixed* |
| **High** | *OpenClaw session never starts after gateway init race* | **#1052** | *Fixed* |
| **Medium** | *Modal close button unclickable when overlapping draggable area* | **#1054** | *Fixed* |
| **Low** | *Debug console.log in production cowork code* | **#1056** | *Fixed* |
| **Low** | *Thinking blocks leaking into memory* | **#1057** | *Fixed* |
| **Low** | *Run history JSONL write failure during migration* | **#1058** | *Fixed* |

All reported bugs were addressed by merged PRs, with no remaining open bugs of these categories.

---

### 6. Feature Requests & Roadmap Signals  
* **Scheduled‑Task Session Binding** – The new `feat(scheduled-task)` PR (#1065) signals a shift toward more flexible task execution; likely to be highlighted in the next release notes.  
* **Modal Interaction Improvements** – The modal fix (#1054) indicates ongoing attention to UI ergonomics; future enhancements may involve drag‑zone configuration.  
* **OpenClaw Gateway Tuning** – Timeout extension (#2768) and concurrency fixes (#1052) suggest that upcoming releases may further expose gateway APIs or provide a developer console.  

No other feature‑request issues appear in the last‑24‑h snapshot.

---

### 7. User Feedback Summary  
* **Authentication Stability** – Users faced forced logouts due to concurrent 401 responses; the fix should improve session persistence.  
* **Session Reliability** – Persistent AI session failures after gateway errors caused frustration; resolution restores smooth user interaction.  
* **UI Responsiveness** – Unresponsive modal close buttons were a pain point; the fix restores expected behaviour.  
* **Scheduled‑Task Flexibility** – The ability to bind tasks to existing cowork sessions was a requested convenience now implemented.

Overall sentiment trends toward satisfaction, as core stability issues are being resolved.

---

### 8. Backlog Watch  
All 6 issues closed today, and there are no open, high‑severity issues in the repository’s issue list as of this digest. The single open PR (#2769) has no blockers reported. Maintainers should keep an eye on the **artifact hot‑reload** work and ensure the Vite config changes do not affect other dev workflows.

---

**Links to key items**  
- Issues: #1048, #1051, #1053, #1066, #1061, #1062  
- PRs: #2769, #2768, #2767, #1049, #1052, #1054, #1056, #1057, #1058, #1059, #1065  
- Repository: https://github.com/netease-youdao/LobsterAI  

*End of Digest*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Project Digest: Moltis**  
**Date:** 2026-09-27  

---

### 1. Today's Overview  
Moltis saw minimal activity on 2026-09-27, with no new issues, releases, or bug reports. A single pull request (PR #1285) was opened to enhance documentation by adding a RepoCloud one-click deploy button to the README. Overall project health remains stable, with no urgent concerns reported.  

---

### 2. Releases  
**None.** No new releases were published in the last 24 hours.  

---

### 3. Project Progress  
- **Merged/Closed PRs:** 0 (all PRs remain open).  
- **Feature Updates:** Documentation improvement via PR #1285, which adds a RepoCloud deployment option for easier cloud access.  

---

### 4. Community Hot Topics  
- **PR #1285:** [Open] docs: add RepoCloud one-click deploy button  
  - **Link:** [moltis-org/moltis PR #1285](https://github.com/moltis-org/moltis/pull/1285)  
  - **Summary:** Adds a one-click deployment button for RepoCloud in the README's Cloud Deployment table.  
  - **Underlying Need:** Users requested simplified deployment options, particularly for RepoCloud.  

---

### 5. Bugs & Stability  
**No bugs, crashes, or regressions reported today.**  

---

### 6. Feature Requests & Roadmap Signals  
- **RepoCloud Deployment:** The PR #1285 addresses a clear user need for streamlined cloud deployment. If approved, this could feature in the next documentation update.  
- **No other major feature requests are pending.**  

---

### 7. User Feedback Summary  
- **Positive:** The community is engaged in improving usability (e.g., adding RepoCloud support).  
- **No negative feedback reported.**  

---

### 8. Backlog Watch  
- **No long-unanswered Issues or PRs requiring immediate attention.**  

---  
*Generated from GitHub data for moltis-org/moltis.*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

**CoPaw Project Digest**
**Date:** 2026-09-27
**Repository:** agentscope-ai/CoPaw (github.com/agentscope-ai/CoPaw)

---

### 1. Today's Overview
The CoPaw project maintains a moderate but stable activity level today, with a total of 6 GitHub updates (4 issues, 2 PRs). The project appears to be in a feature-heavy maintenance phase, focusing on improving the Console UI experience and resolving data consistency issues between the dashboard and API. There are no new releases this week, indicating that current development is focused on code quality and polish rather than major versioning.

### 2. Releases
**None.** No new versions have been released in the last 24 hours.

### 3. Project Progress
*   **Pull Requests:** 2 PRs are currently open and awaiting review.
    *   **PR #7956:** A significant UX overhaul for the Console, aiming to unify settings interfaces and smooth out conversation transitions. This suggests an active effort to improve user experience and reduce visual friction.
    *   **PR #7992:** A bug fix addressing WeCom (WeChat Work) integration, specifically correcting a markdown table parsing logic that was incorrectly treating text containing pipes as table data.

### 4. Community Hot Topics
The most active discussion today centers on **model configuration and UI visibility**.
*   **Issue #7990:** Users reported that models from Aliyun Token Plan are missing specific configuration declarations (`thinking_param_style`) in the model catalog, which causes critical UI controls (Thinking level dropdowns) to be hidden in the Console. This highlights a gap between model capabilities and the project's configuration schema.
*   **Issue #7991:** A discrepancy was identified between the Dashboard's task counter and the API's chat list, specifically regarding "zombie" entries inflating the running task count.

### 5. Bugs & Stability
*   **High Severity:** **Issue #7991** (Data Inconsistency) - The dashboard reports "2 running tasks," but the API returns only 1 running chat. The root cause lies in the `TaskTracker` logic, where `_runs` entries are not being cleaned up correctly, causing the global status to disagree with the per-chat status.
*   **Medium Severity:** **Issue #7992** (WeCom Parsing Bug) - The WeCom channel incorrectly formats prose as markdown tables if the text contains a pipe character (`|`). This breaks message rendering in the WeChat Work channel.

### 6. Feature Requests & Roadmap Signals
*   **Cron Script Execution:** **Issue #4963** remains an open enhancement request. Users want to extend the Cron scheduler to support direct shell script execution, moving beyond the current limitation of only supporting "text" or "agent" types. This would allow for more complex, non-AI scheduled automation.
*   **Aliyun Model Support:** The community is actively seeking better integration for Aliyun Token Plan models, specifically requesting that the `thinking_param_style` be added to the model catalog to ensure UI controls function correctly.

### 7. User Feedback Summary
*   **Dissatisfaction:** Users are experiencing frustration with the **Aliyun Token Plan** integration. The lack of configuration declarations makes it impossible to configure "Thinking" parameters via the Console, rendering a core feature (reasoning/thinking) inaccessible for these models.
*   **Pain Point:** The **TaskTracker** bug creates confusion for administrators trying to monitor system health, as the dashboard UI does not match the actual state of the chat system.

### 8. Backlog Watch
*   **Issue #4963 (Cron Scripts):** This issue has been open since June 2026 and has seen 4 comments. It is a significant functional gap that has not yet been addressed by the maintainers.
*   **Issue #7804 (Management):** This issue was closed recently but touches upon a wide range of components (Core, Console, Channels). It serves as a reminder that the project spans a complex ecosystem requiring cross-component maintenance.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**ZeroClaw Project Digest**
**Date:** 2026-09-27

### 1. Today's Overview
ZeroClaw maintained a high level of active development and community engagement today, with 50 issues and 50 pull requests updated in the last 24 hours. The project is currently in a stabilization phase for v0.9.0, focusing on "core parity" between the HTTP and RPC interfaces and resolving critical security and channel stability bugs. Overall project health appears stable, with a balanced mix of architectural enhancements and bug fixes.

### 2. Releases
**No new releases** were published in the last 24 hours.

### 3. Project Progress
*   **RPC Parity & Gateway Split:** Development is heavily focused on completing the v0.9.0 gateway-split plan. Multiple PRs (e.g., #11171, #11182, #11176) are advancing the RPC implementation to match existing HTTP routes for configuration, runtime capabilities, cron jobs, memory, and system methods.
*   **Security Enhancements:** A major feature PR (#11082) was merged, adding OIDC principals, enrollment, and gateway authentication surfaces.
*   **Tooling & CLI Improvements:** Work is ongoing to refine the CLI agent, including the introduction of `DefaultCapabilities` and improvements to the RPC client seam (#11186).
*   **Bug Fixes:** Several long-standing bugs were addressed in the parser and channel tools to preserve semantic integrity (e.g., #11189).

### 4. Community Hot Topics
The community is most active around the **WhatsApp Web channel**, where a cluster of issues (#10977, #10922, #11059, #10976) are driving discussion. This indicates a high demand for robust group management and voice note handling. Additionally, the **Security & Architecture** domain is a focal point, with active discussion on approval enforcement (#10968) and context management (#10780).
*   **[Issue #8692]** Maintainer decision queue for RFCs (15 comments)
*   **[Issue #10977]** WhatsApp Web: implement group creation (5 comments)
*   **[Issue #10922]** WhatsApp TTS suppression bug (5 comments)
*   **[Issue #9284]** Config flush concurrency bug (5 comments)

### 5. Bugs & Stability
Several high-severity bugs were reported today, primarily affecting the WhatsApp channel and the runtime daemon's configuration handling.
*   **S0 - High Risk:** **Config flush overwrites concurrent writes** (#9284). The `RpcDispatcher::flush_config` can lose data if multiple writers are active.
*   **S0 - High Risk:** **Unattended agent turns lack ApprovalManager** (#10968). Cron and daemon tools may execute prompt-required tools without security approval.
*   **S2 - Medium Risk:** **WhatsApp Web ignores `force_voice`** (#11059). Messages intended for voice are sent as text.
*   **S2 - Medium Risk:** **WhatsApp mentions broken** (#10976). Mentions are not resolved correctly.
*   **S2 - Medium Risk:** **Daemon channel-map factory not registered** (#11055). Webhooks and cron jobs fail to find channels.
*   *Note:* Several of these bugs have corresponding PRs in progress (e.g., #11133 for RPC revalidation, #11080 for test platform independence).

### 6. Feature Requests & Roadmap Signals
*   **WhatsApp Group Management:** Strong user interest in expanding WhatsApp capabilities to include `create_room` and `invite_user` (#10977).
*   **Knowledge Graph Memory:** RFC for making the knowledge graph a "first-class" memory layer rather than just a tool (#11053).
*   **Search Routing:** A proposal for "hint-based provider routing" for the web search tool to allow splitting queries between providers (#11074).
*   **MiniMax Integration:** Request to add native TTS and STT support for the MiniMax provider (#10933).

### 7. User Feedback Summary
Users are experiencing friction with the **WhatsApp Web integration**, specifically regarding voice note preferences and group creation. There is also significant user concern regarding **data integrity** (config overwrites) and **security safety** (unattended agent approvals). Users are actively requesting better tool semantics (e.g., preventing browser tools from being rewritten as shell commands) to ensure the agent acts as intended.

### 8. Backlog Watch
Several long-standing architectural discussions and complex bugs are accumulating, requiring maintainer triage:
*   **[Issue #10780]** Restore proactive token-budget context compaction (S2).
*   **[Issue #11053]** RFC: Knowledge graph as a first-class agent memory layer.
*   **[Issue #10893]** Feature: Steer in-flight turns when messages arrive mid-generation.
*   **[Issue #11020]** ACP TodoWrite plan persistence failures.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*