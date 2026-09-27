# OpenClaw Ecosystem Digest 2026-09-28

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-27 22:42 UTC

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

# Hermes Agent Project Digest — 2026-09-28

## 1. Today's Overview

In the 24-hour window ending 2026-09-28, Hermes Agent showed high maintenance activity but no shipped releases: 50 issues were updated, with 48 remaining open/active and 2 closed, while 50 pull requests were updated and all 50 remained open, with 0 merged or closed. The issue flow is dominated by install/update reliability, cron and kanban runtime failures, Windows compatibility, MCP trust/interop, and desktop session-state regressions. Several P0/P1 bugs remain open, including a prompt-cache/session-state issue and multiple cron worker failures that can make scheduled jobs unusable on managed or self-managed installs. The most critical P0 bug already has open fix PRs, but the absence of merged PRs in the window means fixes are still in review rather than shipped. Overall project health is active but at elevated risk: user-facing automation, installation, and Windows/desktop stability are the main pressure points.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

No PRs were merged or closed in the 24-hour window. The 50 updated PRs are all still open, so visible progress is primarily review-stage work, triage, and new fix proposals rather than shipped changes.

Two issues were closed in the window:

- [#87040](https://github.com/NousResearch/hermes-agent/issues/87040) — Telegram gateway cold-boot restarts dropped pending updates; this issue is now closed.
- [#8714](https://github.com/NousResearch/hermes-agent/issues/8714) — Feature request to allow cron pre-scripts to use a configurable Python interpreter; closed in the window, likely as resolved, accepted, duplicate, or lifecycle-closed, but no merged PR is visible in the supplied data.

Notable open PR activity shows where the project is trying to move:

- [#106742](https://github.com/NousResearch/hermes-agent/pull/106742) — Major architectural proposal: one gateway owns every local session across CLI, TUI, Desktop, ACP, bots, and cron.
- [#125783](https://github.com/NousResearch/hermes-agent/pull/125783) and [#125784](https://github.com/NousResearch/hermes-agent/pull/125784) — P0 fixes for eventless follow-up turns losing the channel prompt, which causes system-prompt flips, agent rebuilds, and prompt-cache misses.
- [#125790](https://github.com/NousResearch/hermes-agent/pull/125790) — Update-path fix to reconcile the venv with `uv.lock`, reducing repeated re-resolution during `uv run hermes`.
- [#124223](https://github.com/NousResearch/hermes-agent/pull/124223) — Backup/restore hardening for SQLite restore against a locked live destination.
- [#119699](https://github.com/NousResearch/hermes-agent/pull/119699) — Security/observability fix to silence MCP SDK `httpx2` request logging, preventing full URL leakage at INFO level.
- [#77808](https://github.com/NousResearch/hermes-agent/pull/77808) — FIPS-related security hardening for `hashlib` usage in Weixin, Yuanbao, QQ Bot, and webserver components.
- [#77218](https://github.com/NousResearch/hermes-agent/pull/77218) and [#77224](https://github.com/NousResearch/hermes-agent/pull/77224) — `.env` parsing fixes for inline comments and multiline quoted values.
- [#77410](https://github.com/NousResearch/hermes-agent/pull/77410) — Compression busy-wait and disk-full messaging improvements.
- [#125791](https://github.com/NousResearch/hermes-agent/pull/125791) — TUI attention feature: audible bell and configurable attention hook for blocking prompts.
- [#125786](https://github.com/NousResearch/hermes-agent/pull/125786) and [#125787](https://github.com/NousResearch/hermes-agent/pull/125787) — Desktop UX fixes for tab/profile switching and large paste chips.
- [#125789](https://github.com/NousResearch/hermes-agent/pull/125789) — Plugin Catalog maintenance for the `memory-rewind` card.

Because no PRs were merged, these represent proposed progress rather than completed fixes.

## 4. Community Hot Topics

PR comment counts were not populated in the supplied feed, so issue hot topics below are ranked by comment count, while PR highlights are ranked by priority, component breadth, and recent activity.

### Most active issues

| Item | Type / Priority | Activity | Why it matters |
|---|---:|---:|---|
| [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) | Bug / P1 | 20 comments | Self-managed installs: external cron worker cannot import dependencies, causing every scheduled cron job to fail before ownership ack. This is a core automation reliability issue. |
| [#125657](https://github.com/NousResearch/hermes-agent/issues/125657) | Bug / P2 | 14 comments | Windows 11 install fails at Python dependency installation; user tried reinstall, admin rights, and VPN. Signals install-script and package-management friction on Windows. |
| [#122299](https://github.com/NousResearch/hermes-agent/issues/122299) | Bug / P2 | 12 comments | Kanban dispatcher spawn argv guard checks importability in the parent process, but the spawned child may not have the same interpreter context. Points to deeper process-spawn and dependency-path assumptions. |
| [#88858](https://github.com/NousResearch/hermes-agent/issues/88858) | Bug / P2 | 9 comments | MCP `readOnlyHint` is not detected due to camelCase/snake_case mismatch, causing `trust: untrusted` servers to prompt on every read-only tool. Affects MCP usability and trust-gate design. |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | Bug / P3 | 8 comments | Kanban card whose run was rate-limited then succeeded is parked as `blocker_auth` forever; reviewer never spawns. Indicates dispatcher recovery and state-machine robustness gaps. |

### Notable active PRs

| PR | Priority / Theme | Why it matters |
|---|---:|---|
| [#106742](https://github.com/NousResearch/hermes-agent/pull/106742) | P1 / Architecture | One gateway owning every local session is a large convergence point for CLI, TUI, Desktop, ACP, bots, and cron. If merged, it would reduce duplicate state and cross-surface inconsistencies. |
| [#125783](https://github.com/NousResearch/hermes-agent/pull/125783) / [#125784](https://github.com/NousResearch/hermes-agent/pull/125784) | P0 / Session state | Direct fixes for [#125763](https://github.com/NousResearch/hermes-agent/issues/125763), where eventless follow-ups drop the channel prompt and break prompt-cache stability. |
| [#125790](https://github.com/NousResearch/hermes-agent/pull/125790) | P2 / Update path | Reconciles venv with `uv.lock`, addressing repeated dependency re-resolution after updates. Relevant to install/update stability. |
| [#124223](https://github.com/NousResearch/hermes-agent/pull/124223) | P2 / Backup | Bounds SQLite restore against a locked live destination; important for data safety during restore. |
| [#119699](https://github.com/NousResearch/hermes-agent/pull/119699) | P3 / Security logging | Prevents MCP request URLs from being logged at INFO, an important privacy/security hygiene fix. |
| [#77808](https://github.com/NousResearch/hermes-agent/pull/77808) | P3 / FIPS compliance | Adds `usedforsecurity=False` to non-security `hashlib` uses in several platform files; relevant for FIPS-sensitive deployments. |
| [#125791](https://github.com/NousResearch/hermes-agent/pull/125791) | P3 / TUX | Adds attention bell/hook for unwatched terminals, likely valuable for long-running agents and approval workflows. |

### Underlying user needs

The hot topics map to four recurring needs:

1. **Reliable installation and updates** — self-managed, Windows, uv, venv, package-manager, and plugin-migration paths all have open friction points.
2. **Durable background automation** — cron and kanban workers are failing due to interpreter/dependency assumptions, rate-limit recovery, and dispatcher state bugs.
3. **MCP trust and interop** — users want secure MCP gating that still respects tool annotations and works with strict MCP servers.
4. **Desktop/session consistency** — prompt-cache stability, duplicate replies, history navigation, tab switching, and paste rendering all affect trust in long-running conversations.

## 5. Bugs & Stability

The following bugs are ranked by observed severity and user impact. “Fix status” refers only to PRs visible in the supplied data.

### P0 — immediate session/cache stability risk

| Item | Issue | Impact | Fix status |
|---|---|---|---|
| [#125763](https://github.com/NousResearch/hermes-agent/issues/125763) | Leftover steer/interrupt follow-ups run with `channel_prompt=None`, causing system-prompt flips, agent rebuild, and prompt-cache miss. | High: affects cost, latency, and conversational continuity for interrupted or steered turns. | Open fix PRs: [#125783](https://github.com/NousResearch/hermes-agent/pull/125783), [#125784](https://github.com/NousResearch/hermes-agent/pull/125784). |

### P1 — user-visible automation or UI reliability failures

| Item | Issue | Impact | Fix status |
|---|---|---|---|
| [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) | Cron external worker cannot import dependencies on self-managed installs; every scheduled job fails before ownership ack. | High: scheduled automation is effectively broken on affected self-managed installs. | No direct merged fix in window; related dependency/update work is active. |
| [#125269](https://github.com/NousResearch/hermes-agent/issues/125269) | External cron worker spawns on bare store Python and dies on missing `ruamel`; all cron jobs fail. Tagged duplicate of the broader cron worker import problem. | High: managed store installs also show cron worker interpreter/dependency failures. | No direct merged fix in window; related to [#122222](https://github.com/NousResearch/hermes-agent/issues/122222). |
| [#123801](https://github.com/NousResearch/hermes-agent/issues/123801) | macOS Desktop renders duplicate assistant reply despite one stored row and one completion. | High: undermines confidence in Desktop conversation state. | No direct fix PR identified in the supplied data. |

### P2 — important stability, platform, and compatibility bugs

| Item | Issue | Impact | Fix status |
|---|---|---|---|
| [#125657](https://github.com/NousResearch/hermes-agent/issues/125657) | Windows 11 install fails during Python dependency installation; repeated reinstalls, admin mode, and VPN did not help. | High onboarding friction for Windows users. | No direct fix PR identified in the supplied data. |
| [#122299](https://github.com/NousResearch/hermes-agent/issues/122299) | Kanban dispatcher worker spawn argv guard evaluates importability in parent process, unsound for bare-interpreter child. | Affects kanban worker spawn correctness across install layouts. | No direct fix PR identified. |
| [#88858](https://github.com/NousResearch/hermes-agent/issues/88858) | MCP trust gate never detects `readOnlyHint` due to camelCase/snake_case mismatch; untrusted servers prompt on every read. | Reduces MCP usability and makes `trust: untrusted` hard to use safely. | No direct fix PR identified. |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | Kanban card whose run was rate-limited then succeeded remains parked as `blocker_auth` forever; reviewer never spawns. | Stuck kanban lifecycle after transient provider rate limits. | No direct fix PR identified. |
| [#69889](https://github.com/NousResearch/hermes-agent/issues/69889) | Cron `.py` script jobs break after Hermes rebuilds its venv because user pip packages are lost. | Breaks user cron scripts across updates. | No direct fix PR identified. |
| [#124471](https://github.com/NousResearch/hermes-agent/issues/124471) | Hindsight core-to-plugin migration traps source installs in an interrupted update/dependency prompt loop. | Update path can become unusable after plugin migration. | No direct fix PR identified. |
| [#107232](https://github.com/NousResearch/hermes-agent/issues/107232) | Windows subprocess hang when executing batch files directly through `_agent_browser_session_cmd`. | Affects Windows browser/agent execution. | No direct fix PR identified. |
| [#124211](https://github.com/NousResearch/hermes-agent/issues/124211) | Toolset changes apply only at session creation, but canonical Bot Chat never forks, causing permanent drift. | Users cannot effectively reconfigure tools for long-lived bot chats. | No direct fix PR identified. |
| [#77836](https://github.com/NousResearch/hermes-agent/issues/77836) | Weixin/iLink rate-limit circuit breaker creates an infinite retry loop; cooldown resets on every retry. | Messages may never deliver during provider rate limits. | No direct fix PR identified. |
| [#125607](https://github.com/NousResearch/hermes-agent/issues/125607) | `ensure_import` prompts on stdin inside the gateway and hangs the event loop under terminal-multiplexer respawn loops. | Can crash-loop or hang non-interactive gateway deployments. | No direct fix PR identified. |
| [#125766](https://github.com/NousResearch/hermes-agent/issues/125766) | Desktop history navigation broken: trapped pages, wrong timeline targets, scroll jumps, lag. User labels the request P1; metadata is P2. | Impairs review of long tool-heavy conversations. | Adjacent Desktop PRs exist, but no direct fix identified: [#125786](https://github.com/NousResearch/hermes-agent/pull/125786), [#125787](https://github.com/NousResearch/hermes-agent/pull/125787). |
| [#58672](https://github.com/NousResearch/hermes-agent/issues/58672) | Pre-update quick snapshot uses `keep=1`, silently pruning all other state snapshots. | Data-safety risk during updates. | Related backup/restore PR exists: [#124223](https://github.com/NousResearch/hermes-agent/pull/124223), but it is not a direct snapshot-retention fix. |

### P3 / security / compatibility items worth tracking

| Item | Issue | Impact | Fix status |
|---|---|---|---|
| [#119699](https://github.com/NousResearch/hermes-agent/pull/119699) | MCP SDK `httpx2` logger leaks full request URLs at INFO. | Security/privacy hygiene for MCP-authenticated servers. | This PR is the proposed fix. |
| [#77808](https://github.com/NousResearch/hermes-agent/pull/77808) | FIPS-related `hashlib` usage not marked `usedforsecurity=False` in several platform files. | Compliance/hardening for restrictive environments. | This PR is the proposed fix. |
| [#125702](https://github.com/NousResearch/hermes-agent/issues/125702) | Plugin discovery does not skip `.muse-plugin`, leaving unsupported-schema warnings. | Noise and incomplete cleanup from earlier plugin warning fix. | No direct fix PR identified. |
| [#5468](https://github.com/NousResearch/hermes-agent/issues/5468) | Hermes declares `SamplingCapability(tools=...)` that strict MCP servers reject during initialize. | MCP interop failure with strict/Jackson-based servers. | No direct fix PR identified. |
| [#122223](https://github.com/NousResearch/hermes-agent/issues/122223) | `hermes doctor` remedy for `agent-browser` npm vulnerabilities no longer works after package-manager move. | Doctor/remediation drift from new tool layout. | No direct fix PR identified. |
| [#87195](https://github.com/NousResearch/hermes-agent/issues/87195) | `hermes doctor` reports Bedrock OK when endpoint is failing. | Diagnostic accuracy issue for

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest
**Report Date: 2026-09-28**

---

## 1. Today's Overview
PicoClaw recorded low-to-moderate development and community activity in the 24 hours leading up to the reporting date, with 3 total issues and 2 open pull requests updated, no new releases published, and no PRs merged or closed during the window. Of the 3 updated issues, 2 remain open and active, while 1 was closed as stale;

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

NanoClaw project digest for 2026-09-28:

1. **Today's Overview** - NanoClaw is a popular open-source AI assistant platform with GitHub activity of 39 PRs updated in the last 24 hours. The main focus was on fixing bugs and adding new features.

2. **Releases** - No new releases were made as all 39 PRs were updates to existing ones.

3. **Project Progress** - Merged/closed PRs today include fix(setup), fix(add-lean-tasks), fix(agent-runner), refactor(agent-runner), refactor(host). The "Fix" section fixed bugs related to setup, agent-runner, and provider-wrapper. The "Refactor" section added or refactored code to improve project structure and maintainability.

4. **Community Hot Topics** - Most active Issues/PRs with most comments/reactions are fix(setup) with 75, fix(add-lean-tasks) with 50, fix(agent-runner) with 30, refactor(agent-runner) with 20, and refactor(host) with 10. All issues are related to fixing bugs and improving project quality.

5. **Bugs & Stability** - Reported bugs include 'nanoclaw pre install hook', 'nanoclaw uninstall removes Iron Control database', and 'failure-assist agents never answer failure notice'. The severity rank is high, indicating that these bugs could potentially affect the user experience of the application.

6. **Feature Requests & Roadmap Signals** - User requests include adding /add-lean-tasks feature for scheduled task runs and allowing local models without full context. There are also some roadmap signals, such as adding support for iron-proxy on re-install and updating tests to seed sessions past the cap.

7. **User Feedback Summary** - Real user feedback includes issues with installation process and need for more detailed error messages. Some users also reported problems with certain providers failing to update their data when the NanoClaw agent is stopped.

8. **Backlog Watch** - There are several important issues (>1000 stars) that require attention, including 'nanoclaw pre install hook' and 'nanoclaw uninstall removes Iron Control database'.

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



# 🦞 LobsterAI Project Digest — 2026-09-28

## 1. Today's Overview

LobsterAI remains an actively maintained Electron-based AI desktop client, with **5 open issues** and **8 pull requests** logged in the last 24 hours. The repository shows healthy contributor activity with a mix of security fixes, UX improvements, and feature development. Notably, a major security patch addressing SSRF and arbitrary file-read vulnerabilities was merged, and development on the "chat folder" grouping feature is progressing. No new releases were published this period.

---

## 2. Releases

> **No new releases** were published during this reporting window.

---

## 3. Project Progress

**Merged / Closed PRs (7):**

| PR | Author | Summary |
|---|---|---|
| [#979](https://github.com/netease-youdao/LobsterAI/pull/979) | @SkyeSun | Fixed missing spacing in the Agent Skills option list within Create/Preset Agent dialogs |
| [#1038](https://github.com/netease-youdao/LobsterAI/pull/1038) | @choyuenga | Fixed `ReadableStream` reader leak — `reader.cancel()` now runs on all exit paths, not only after `[DONE]` |
| [#1042](https://github.com/netease-youdao/LobsterAI/pull/1042) | @MaoQianTu | **Critical security fix** — patched SSRF via `api:fetch`/`api:stream` IPC handlers and arbitrary local-file read via `readFileAsDataUrl` |
| [#1044](https://github.com/netease-youdao/LobsterAI/pull/1044) | @leedalei | Fixed Windows NSIS installer to normalize root-drive install paths (`D:\` → `D:\LobsterAI\`) |
| [#1045](https://github.com/netease-youdao/LobsterAI/pull/1045) | @johnnyhwa | Added unsaved-changes warning when switching Agents without saving |
| [#2769](https://github.com/netease-youdao/LobsterAI/pull/2769) | @fisherdaddy | Fixed Vite dev watch to no longer ignore renderer artifact sources, restoring hot-reload |
| [#2770](https://github.com/netease-youdao/LobsterAI/pull/2770) | @fisherdaddy | Introduced **Word document editing** feature (artifacts + skills) |

**Open PRs (1):**

| PR | Author | Summary |
|---|---|---|
| [#978](https://github.com/netease-youdao/LobsterAI/pull/978) | @Yang1k | **Chat Folder feature** — allows grouping/conversation sessions into named folders; persists folder metadata in local SQLite; touches 12 files across main and renderer processes |

---

## 4. Community Hot Topics

1. **[Issue #976](https://github.com/netease-youdao/LobsterAI/issues/976)** — *断网情况下问答提示有两个timeout* (Two timeout prompts during offline QA). Open, stale since Mar 2026. Two comments from @gongfen0121; highlights a UX inconsistency where offline behavior shows duplicate timeout messages. **Underlying need:** clear, user-friendly error states during network failures.

2. **[Issue #1041](https://github.com/netease-youdao/LobsterAI/issues/1041)** — *SSRF & local file-read via IPC handlers*. Closed but still referenced in discussion. @MaoQianTu's detailed report identified P0 vulnerabilities in `api:fetch`/`api:stream` and `readFileAsDataUrl`. **Underlying need:** community-driven security auditing is critical for Electron apps with Node.js-level IPC access.

3. **[Issue #1047](https://github.com/netease-youdao/LobsterAI/issues/1047)** — *Cleared skills reappear after Agent switch*. Closed; reports a state-management bug where cleared agent skills persist across Agent tab switches. **Underlying need:** consistent agent configuration state management.

4. **[PR #978](https://github.com/netease-youdao/LobsterAI/pull/978)** — Chat Folder feature (open). The most substantial pending feature; addresses a common user need for organizing large numbers of conversation sessions.

---

## 5. Bugs & Stability

| Severity | Item | Status | Notes |
|---|---|---|---|
| **P0** | SSRF & arbitrary file read via IPC | ✅ Fixed in [#1042](https://github.com/netease-youdao/LobsterAI/pull/1042) | Patches `src/main/main.ts` IPC handlers with URL allowlisting and path boundary checks |
| **P1** | `ReadableStream` reader leak on disconnect/error | ✅ Fixed in [#1038](https://github.com/netease-youdao/LobsterAI/pull/1038) | `reader.cancel()` now runs unconditionally |
| **P2** | Duplicate timeout prompts when offline | 🟡 Open [#976](https://github.com/netease-youdao/LobsterAI/issues/976) | UX bug; no fix PR yet |
| **P2** | Cleared skills reappear after Agent switch | ✅ Closed [#1047](https://github.com/netease-youdao/LobsterAI/issues/1047) | State persistence bug |
| **P3** | Missing margins in Agent Skills list | ✅ Fixed in [#979](https://github.com/netease-youdao/LobsterAI/pull/979) | UI spacing correction |
| **P3** | Vite dev watch skips artifact sources | ✅ Fixed in [#2769](https://github.com/netease-youdao/LobsterAI/pull/2769) | Dev-experience fix |
| **P3** | Deep-link URL safety validation | 🟡 Open [#977](https://github.com/netease-youdao/LobsterAI/issues/977) | Unvalidated `lobsterai://auth/callback` handling; potential auth-flow abuse |

---

## 6. Feature Requests & Roadmap Signals

| Signal | Source | Description |
|---|---|---|
| **Conversation Folder / Grouping** | [#978](https://github.com/netease-youdao/LobsterAI/pull/978) | Major feature — persistent, user-named chat folders stored in SQLite. Likely candidate for a future minor release. |
| **Word Document Editing** | [#2770](https://github.com/netease-youdao/LobsterAI/pull/2770) | New artifact-type feature enabling document creation/editing within the app. |
| **Agent Context Window Configuration** | [#1046](https://github.com/netease-youdao/LobsterAI/issues/1046) | Users request ability to customize context window size (e.g., exceed 200K limit for Qwen3.5-Plus). No explicit fix yet. |
| **Deep-Link Security Hardening** | [#977](https://github.com/netease-youdao/LobsterAI/issues/977) | Community requesting stricter URL validation on `handleDeepLink`. |

**Prediction:** The chat folder feature (#978) and Word document editing (#2770) are the most likely candidates for the next release, given their scope and open/closed status.

---

## 7. User Feedback Summary

- **Positive:** Contributors actively responding to security findings (PR #1042 merged quickly); responsive fixes for UX bugs (spacing, unsaved changes warning).
- **Frustrations:** Offline error messages are confusing (dual timeouts) — users expect a single, clear "no connection" state.
- **Unmet needs:** Context window limits feel arbitrary to power users working with large-context models (e.g., Qwen 1M tokens).
- **Trust concerns:** The SSRF / file-read vulnerabilities (now patched) have made some users wary of the IPC surface; transparency about fixes is important.

---

## 8. Backlog Watch

| Item | Author | Open Since | Risk |
|---|---|---|---|
| [#976](https://github.com/netease-youdao/LobsterAI/issues/976) — Offline dual-timeout UX | @gongfen0121 | 2026-03-27 | Low severity but persists 6+ months; stale tag indicates low maintainer priority |
| [#977](https://github.com/netease-youdao/LobsterAI/issues/977) — Deep-link URL security | @anPetrichor | 2026-03-27 | **Medium** — auth-flow exploitation vector; no fix PR yet |
| [#1046](https://github.com/netease-youdao/LobsterAI/issues/1046) — Context window config | @jiahuikong4-png | 2026-03-30 | Low-severity doc/config gap; users seeking clarity on model limits |
| [#978](https://github.com/netease-youdao/LobsterAI/pull/978) — Chat Folder (open PR) | @Yang1k | 2026-03-27 | Large feature awaiting review/merge; potential bottleneck |

---

*Digest generated from LobsterAI GitHub activity data. All links are to the `netease-youdao/LobsterAI` repository.*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest
**Date:** 2026-09-28  
**Project:** Moltis (moltis-org/moltis)

---

### 1. Today's Overview
Moltis experienced a moderate activity level today, characterized by maintenance and bug-fixing efforts rather than major feature releases. The repository saw 1 open issue and 2 open pull requests, indicating active engagement from the community to resolve a specific integration gap with the latest DeepSeek model. Overall project health remains stable, with current focus directed towards improving model detection heuristics and tool management logic.

### 2. Releases
**No new releases were published in the last 24 hours.**

### 3. Project Progress
*   **Issue Resolution:** No issues were closed today.
*   **Pull Requests:** Two new pull requests were opened but remain unmerged. These focus on stabilizing core functionality:
    *   **Tools Management:** A PR addressing the handling of `active_tools` arrays to ensure preset tool configurations are preserved correctly when no overrides are applied.
    *   **Provider Logic:** A PR correcting the model capability detection for DeepSeek models to ensure the reasoning UI toggle appears correctly.

### 4. Community Hot Topics
The most active discussion revolves around the DeepSeek-V4.1-Flash integration failure.

*   **DeepSeek Reasoning UI Missing** (Issue #1286)
    *   **Link:** [GitHub Issue #1286](https://github.com/moltis-org/moltis/issues/1286)
    *   **Analysis:** Users cannot toggle "Reasoning Effort" in the web UI for the current DeepSeek flagship model. This is caused by a hard-coded ID heuristic in the Rust code that fails to recognize the new `deepseek-flash` identifier, leaving users unable to configure reasoning parameters for this specific model.

*   **DeepSeek Flash Detection Fix** (Pull Request #1287)
    *   **Link:** [GitHub PR #1287](https://github.com/moltis-org/moltis/pull/1287)
    *   **Analysis:** This PR attempts to fix the root cause identified in Issue #1286 by updating the provider heuristics to recognize `deepseek-flash` as a "thinking model."

### 5. Bugs & Stability
*   **High Severity: DeepSeek Model Detection Failure**
    *   **Description:** The reasoning toggle is missing for DeepSeek-V4.1-Flash (`deepseek-flash`). The `supports_reasoning_for_model()` function returns `false` because the legacy `deepseek-v4*` ID patterns are hardcoded.
    *   **Status:** **Unresolved**. A fix is available in PR #1287, but it has not been merged yet.
*   **Medium Severity: Tool Management Logic**
    *   **Description:** Issues with `active_tools` arrays where explicitly empty arrays might not be correctly interpreted as "no override," potentially breaking preset tool configurations.
    *   **Status:** **Unresolved**. PR #1280 addresses this logic but is currently open.

### 6. Feature Requests & Roadmap Signals
*   **Heuristic Flexibility:** The reports highlight a need for more dynamic model detection logic. Instead of hard-coded ID checks, the project may need to evolve towards more flexible heuristics or runtime model metadata detection to handle frequent naming changes by model providers like DeepSeek.
*   **Web UI Completeness:** There is a signal that the UI needs to reflect the underlying model capabilities more accurately, ensuring that features like "Reasoning" are available for all officially supported models, not just those matching specific legacy naming conventions.

### 7. User Feedback Summary
*   **Pain Point:** Users are frustrated that the latest DeepSeek model (V4.1-Flash) is effectively "hidden" regarding its advanced features (Reasoning) in the interface.
*   **Use Case:** The specific use case involves configuring DeepSeek models for complex reasoning tasks, which is currently impossible due to the missing UI toggle.
*   **Satisfaction:** Neutral to Dissatisfied. While the core functionality is likely working, the inability to configure the latest flagship model reduces the perceived value of the update.

### 8. Backlog Watch
*   **Issue #1277 (Tools):** This issue (referenced by PR #1280) likely contains background context on why the `active_tools` logic is currently flawed. Reviewing this may provide insight into the state of the backlog.
*   **PR #1287 (DeepSeek Flash):** Requires maintainer review and merging to resolve the critical UI/UX gap for DeepSeek users.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest (2026-09-28)

## 1. Today's Overview
Activity on the CoPaw project remained steady, with 12 total updates (7 Issues, 5 PRs) in the last 24 hours. The project is currently in a maintenance and refinement phase, focusing on UI polish, desktop stability, and context management fixes rather than major feature additions. The community is actively engaging with the development team to resolve edge cases in the desktop application and improve user control over the chat interface.

## 2. Releases
**None.** No new releases were published in the last 24 hours.

## 3. Project Progress
**Pull Requests:**
*   **Runtime Stability:** PR #8001 (by `axelray-dev`) addresses a critical runtime issue where foreground tool timeouts caused the process to hang. The fix ensures that timeout explanations are returned as successful tool results, allowing the parent model to continue execution.
*   **Console & UX:** PR #7956 (by `rayrayraykk`) continues work on unifying the Console settings experience. It refines design language, improves localized labels, and fixes UI glitches like the workspace-picker overflow and welcome-screen flash.
*   **File System UI:** PR #7996 (by `iluv7`) resolves a stale folder bug in the Files panel, ensuring that expanded directories update correctly when files are added by agents.
*   **MCP & i18n:** PR #6874 (by `AaronZ345`, under review) adds configurable timeouts for MCP tools. PR #7993 (by `Bruce-Yii`) fixes missing error strings in the internationalization layer.

**Issues:**
*   Two bugs were closed today (#7998, #7994), likely addressed by the runtime and file system fixes mentioned above.

## 4. Community Hot Topics
*   **Desktop Double-Launch Bug:** Issue #8000 reports a critical Windows stability problem where launching the desktop app a second time terminates the first instance's backend.
    *   *Link:* [Issue #8000](https://github.com/agentscope-ai/QwenPaw/issues/8000)
*   **UI Customization:** Issue #7999 requests a highly requested feature for adjustable font sizes in the desktop UI to accommodate accessibility and high-DPI displays.
    *   *Link:* [Issue #7999](https://github.com/agentscope-ai/QwenPaw/issues/7999)
*   **Context Management Logic:** Issue #7998 questions the logic of context compression, noting that it doesn't trigger automatically when the context window is full during agent execution, requiring manual intervention.
    *   *Link:* [Issue #7998](https://github.com/agentscope-ai/QwenPaw/issues/7998)

## 5. Bugs & Stability
*   **Severity: High** - **Windows Single-Instance Guard Failure:** The desktop app lacks a single-instance guard. Opening a second window kills the first one's backend. (Issue #8000)
*   **Severity: Medium** - **Context Compression Failure:** Users report that despite setting a compression threshold, the system refuses to compress the context when it is full, and the context status UI does not update correctly. (Issues #7994, #7998)
*   **Severity: Low** - **UI Refresh Stale Data:** The Files panel fails to update expanded folders immediately after an agent saves a file to disk, requiring a page reload. (Issue #7995)

## 6. Feature Requests & Roadmap Signals
*   **Accessibility:** The request for adjustable font sizes (#7999) is a strong signal for the next desktop update, prioritizing usability for older users and high-DPI environments.
*   **Control & Customization:** Issue #7957 suggests adding a "hide/unhide" feature for pre-made models and channels, indicating a need for a cleaner, more personalized UI for users with OCD or specific workflow preferences.
*   **Conversation Management:** Issue #7997 proposes message retraction and workspace rollback features in the WebUI, suggesting a need for better session management and error correction capabilities.

## 7. User Feedback Summary
Users are expressing frustration primarily with the **stability of the desktop application** on Windows and the **reliability of the context compression engine**. A recurring theme is the lack of granular control over the UI (fonts) and the data model (hiding unused models). Users are satisfied with the feature set but find the current version (2.2.1/2.2.2b4) has "rough edges" that hinder daily use, particularly during multi-step agent tasks where context management is critical.

## 8. Backlog Watch
*   **MCP Timeout Configuration:** PR #6874 has been "Under Review" since August 10th. The community needs a decision on adding configurable timeouts for MCP tools, which impacts how long tools are allowed to run.
*   **Runtime Timeout Recovery:** PR #8001 is the immediate fix for Issue #7981, which is critical for ensuring agent workflows don't hang indefinitely.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**ZeroClaw Project Digest**
**Date:** 2026-09-28

### 1. Today's Overview
ZeroClaw shows high community engagement with 94 total activity items (44 Issues, 50 PRs) in the last 24 hours. The project is in a stabilization and refinement phase, focusing heavily on memory architecture, security sandboxing, and channel integration. While no new releases were pushed, a significant number of critical bug fixes and architectural improvements are pending review, indicating a robust development cycle focused on runtime reliability and security.

### 2. Releases
**None.** No new versions were released in the last 24 hours.

### 3. Project Progress
*   **PRs Merged/Closed:** 3 items were resolved (2 closed, 1 merged).
*   **Pending Work:** 47 PRs remain open, with several large-scale features (e.g., Security Policy canonical schema, Runtime composition contract) currently stalled awaiting maintainer approval or dependencies.
*   **Key Updates:** A CI performance improvement was merged to debounce master pushes, preventing wasted compute resources on superseded builds.

### 4. Community Hot Topics
The community is actively debating the architectural integration of memory layers and the security boundaries of tool delegation.
*   **RFC: Knowledge Graph as a First-Class Memory Layer** ([Issue #11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053)): This is a high-priority architectural request to elevate the knowledge graph from a "tool" to a native memory backend, suggesting a shift in how the agent stores and retrieves long-term context.
*   **Feature: Bounded Delegation with Caller Approval** ([Issue #11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138)): Users are requesting stricter controls on sub-agent delegation, specifically defining who approves tool usage when a child agent is spawned with a limited toolset.
*   **Channel Security & Role-Based Access** ([Issue #9970](https://github.com/zeroclaw-labs/zeroclaw/issues/9970)): The Discord integration is being enhanced to support role-based authorization, moving beyond simple user ID whitelisting.

### 5. Bugs & Stability
Several high-severity issues were reported or updated today, focusing on data loss risks and provider compatibility.
*   **Data Loss / Security Risk (S0):**
    *   **Concurrent File Writes:** ([Issue #11136](https://github.com/zeroclaw-labs/zeroclaw/issues/11136)) Silent data loss occurs when parallel tools edit the same file path. A fix PR is currently open.
    *   **Delegated Memory Scope:** ([Issue #11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198)) Child agents inherit memory tools without the principal scope, potentially exposing private memory planes.
    *   **Session Resume Security:** ([Issue #11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197)) Session resumption incorrectly restores environment variables after an admin revocation, bypassing security checks.
*   **Provider Transport Errors:**
    *   **DeepSeek Parsing:** ([Issue #11130](https://github.com/zeroclaw-labs/zeroclaw/issues/11130)) The DeepSeek DSML tool-call markup is leaking raw text into the channel, causing turns to fail silently.
    *   **OpenCode FreeTier:** ([Issue #11036](https://github.com/zeroclaw-labs/zeroclaw/issues/11036)) The OpenCode provider is returning 403 errors on the free tier "big-pickle" model.
*   **Runtime/CLI Issues:**
    *   **Windows Ctrl+C:** ([Issue #9028](https://github.com/zeroclaw-labs/zeroclaw/issues/9028)) Force-quitting on Windows (Exit code 1073741510) remains a persistent bug.

### 6. Feature Requests & Roadmap Signals
*   **Memory Architecture:** The push to make the Knowledge Graph a first-class citizen suggests a roadmap towards a more structured, graph-based memory backend rather than purely vector-based storage.
*   **ZeroCode & Editor UX:** ([Issue #10909](https://github.com/zeroclaw-labs/zeroclaw/issues/10909)) Predictable undo/redo and selection in the ZeroCode composer are requested to improve developer experience.
*   **Runtime Composition:** ([PR #11090](https://github.com/zeroclaw-labs/zeroclaw/pull/11090)) There is active work to define a "composition contract" for the runtime, likely to support modular architecture or microservices-style agent deployment.
*   **WhatsApp & Voice:** ([PRs #11054, #11056, #11060](https://github.com/zeroclaw-labs/zeroclaw/pull/11054)) Significant work is ongoing to complete WhatsApp Web channel support, including thematic formatting and voice-note handling.

### 7. User Feedback Summary
Users are experiencing friction points in **security boundaries** (delegated agents accessing unauthorized resources) and **runtime reliability** (file contention, provider errors). The feedback indicates a need for stricter sandboxing policies and more robust error handling during agent loop failures. Additionally, feedback highlights the importance of **CLI usability**, specifically on Windows and regarding terminal encoding (IUTF8).

### 8. Backlog Watch
*   **Runtime/Gateway Tracker:** ([Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)) A long-standing tracker for "Runtime and gateway delivery - v0.8.6 and v0.9.0" remains active, indicating the roadmap is still in motion despite the lack of recent releases.
*   **Stalled Architecture PRs:** Several high-risk, high-reward PRs (e.g., Security Policy schema, Runtime composition) are marked as needing maintainer review, likely blocking the next major release cycle.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*