# OpenClaw Ecosystem Digest 2026-09-20

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-19 21:56 UTC

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

# NanoBot Project Digest — 2026-09-20

**Scope:** GitHub activity updated in the last 24 hours, with data reflecting updates through 2026-09-19.  
**Project:** [HKUDS/nanobot](https://github.com/HKUDS/nanobot)

---

## 1. Today’s Overview

NanoBot maintained a high-velocity PR pipeline, with **28 PRs updated** in the last 24 hours: **21 open** and **7 merged/closed**, while issue activity remained low at **1 active issue**. No new releases were published, indicating that user-facing changes are accumulating in the PR pipeline rather than appearing in tagged versions. The most visible risk is security-related: [Issue #4072](https://github.com/HKUDS/nanobot/issues/4072) reports a possible `ExecTool` workspace-escape through relative symlinks. Overall project health is **active but triage-heavy**, with several long-open PRs, conflict markers, and high-priority memory/security items needing maintainer attention.

---

## 2. Releases

- **No new releases** in the last 24 hours.

---

## 3. Project Progress

### Closed/Merged PRs in the Window

The data reports **7 merged/closed PRs total**, but the provided top-20 list surfaces **3 closed PRs**. Merge status is not separately specified, so these are treated as **closed/merged in the activity window**.

| PR | Title | Progress Impact |
|---|---|---|
| [#5816](https://github.com/HKUDS/nanobot/pull/5816) | `feat(webui): polish provider setup and unify settings controls` | Advances WebUI provider experience: consistent provider logos, unified settings controls, and cleaner provider setup surfaces. |
| [#4668](https://github.com/HKUDS/nanobot/pull/4668) | `fix: enforce message outbound policy` | High-priority security/channel fix. Claims to fix [#4076](https://github.com/HKUDS/nanobot/issues/4076) by adding outbound message authorization, channel allow-list enforcement, and local media confinement. Closed with a conflict label. |
| [#4667](https://github.com/HKUDS/nanobot/pull/4667) | `fix: protect user skills from dream writes` | High-priority security/memory fix. Claims to fix [#4075](https://github.com/HKUDS/nanobot/issues/4075) by restricting Dream from modifying user skills unless explicitly marked as Dream-managed. Closed with a conflict label. |

### Open PRs Advancing Features and Fixes

Although not yet merged, the following open PRs show where the project is actively advancing:

**Provider / Model Management**
- [#5776](https://github.com/HKUDS/nanobot/pull/5776) — add search/filter to shared `ProviderPicker`
- [#5352](https://github.com/HKUDS/nanobot/pull/5352) — add model provider removal controls
- [#5666](https://github.com/HKUDS/nanobot/pull/5666) — add `aimlapi.com` as an OpenAI-compatible gateway provider
- [#5453](https://github.com/HKUDS/nanobot/pull/5453) — add SenseNova provider

**Memory / Runtime Stability**
- [#5403](https://github.com/HKUDS/nanobot/pull/5403) — use API-reported prompt tokens to trigger consolidation
- [#4819](https://github.com/HKUDS/nanobot/pull/4819) — replace `WeakValueDictionary` with plain dict for consolidation locks
- [#5260](https://github.com/HKUDS/nanobot/pull/5260) — ignore runtime files inside tracked workspace dirs
- [#5257](https://github.com/HKUDS/nanobot/pull/5257) — bound sustained-goal continuation when the turn goes idle
- [#5748](https://github.com/HKUDS/nanobot/pull/5748) — persist partial tool progress at batch boundaries
- [#4820](https://github.com/HKUDS/nanobot/pull/4820) — reject non-string web fetch URLs

**WebUI / Mobile / Self-Update**
- [#5641](https://github.com/HKUDS/nanobot/pull/5641) — iOS PWA tap and status-bar fixes
- [#5367](https://github.com/HKUDS/nanobot/pull/5367) — localize agent activity in WebUI
- [#5817](https://github.com/HKUDS/nanobot/pull/5817) — add stable and source self-update flows

**Channels**
- [#5606](https://github.com/HKUDS/nanobot/pull/5606) — filter email by recipient alias
- [#4919](https://github.com/HKUDS/nanobot/pull/4919) — Telegram custom Bot API base URL and extra headers
- [#5292](https://github.com/HKUDS/nanobot/pull/5292) — Matrix reply to the room-level user event that started the turn

---

## 4. Community Hot Topics

**Data limitation:** The provided PR feed shows `Comments: undefined` for most PRs, and the only issue shown has **0 comments**. Therefore, “hot topics” below are inferred from **strategic impact, priority labels, update recency, and issue age**, not comment volume.

| Topic | Why It Is Hot | Underlying User Need |
|---|---|---|
| [#4072 — Security: ExecTool restricted workspace can be bypassed through relative symlinks](https://github.com/HKUDS/nanobot/issues/4072) | Long-open security issue, high trust impact | Users need a sandbox that is actually enforceable, not just command-text based. This is a core trust issue for any agent that executes tools in a restricted workspace. |
| [#5776 — add search to shared ProviderPicker](https://github.com/HKUDS/nanobot/pull/5776) | Touches multiple settings surfaces: Models, Web search, Transcription, Image Generation | As provider count grows, flat dropdowns become unusable. Users need scalable provider/model selection. |
| [#5606 — filter email by recipient alias](https://github.com/HKUDS/nanobot/pull/5606) | Addresses a realistic shared-mailbox use case | Users with multiple aliases delivering to one inbox need the bot to distinguish which address the message was addressed to. |
| [#5403 — use API-reported prompt tokens to trigger consolidation](https://github.com/HKUDS/nanobot/pull/5403) | Marked `priority: p1`; fixes a functional reliability gap in memory consolidation | Users need long sessions to behave correctly. If consolidation never triggers, context/memory behavior degrades over time. |

---

## 5. Bugs & Stability

Bugs and stability risks below are ranked by apparent severity using labels, security impact, and functional blast radius.

| Rank | Item | Severity | Status | Fix PR / Notes |
|---|---|---|---|---|
| 1 | [#4072 — ExecTool restricted workspace bypass via relative symlinks](https://github.com/HKUDS/nanobot/issues/4072) | **High / Critical security** | Open | No direct fix PR visible in the provided data. This is the most important open stability/security risk. |
| 2 | [#5403 — memory consolidation not triggering due to local token undercount](https://github.com/HKUDS/nanobot/pull/5403) | **P1** | Open | Fix PR exists and is open. Addresses [#5402](https://github.com/HKUDS/nanobot/issues/5402). |
| 3 | [#4668 — enforce message outbound policy](https://github.com/HKUDS/nanobot/pull/4668) | **P1 security/channel** | Closed, conflict label | Fix PR closed. If not merged, the outbound message policy gap may still need resolution. |
| 4 | [#4667 — protect user skills from dream writes](https://github.com/HKUDS/nanobot/pull/4667) | **P1 security/memory** | Closed, conflict label | Fix PR closed. If not merged, Dream write-protection may still need resolution. |
| 5 | [#4819 — consolidation locks using WeakValueDictionary](https://github.com/HKUDS/nanobot/pull/4819) | **P2** | Open, conflict label | Fix PR exists. Affects lock stability across GC cycles. |
| 6 | [#5748 — persist partial tool progress at batch boundaries](https://github.com/HKUDS/nanobot/pull/5748) | **P2** | Open | Fix PR exists. Addresses checkpoint/recovery ambiguity for partial tool results. |
| 7 | [#5260 — ignore runtime files inside tracked workspace dirs](https://github.com/HKUDS/nanobot/pull/5260) | **P2** | Open | Fix PR exists. Prevents memory/workspace tracking from being polluted by runtime artifacts. |
| 8 | [#4820 — reject non-string web fetch URLs](https://github.com/HKUDS/nanobot/pull/4820) | **P2** | Open | Fix PR exists. Prevents malformed cache signatures from interfering with later lookups. |
| 9 | [#5257 — bound sustained-goal continuation when idle](https://github.com/HKUDS/nanobot/pull/5257) | **P2** | Open | Fix PR exists. Reduces risk of sustained goals remaining active without a terminal condition. |
| 10 | [#5641 — iOS PWA tap and status-bar fixes](https://github.com/HKUDS/nanobot/pull/5641) | **P2 UX/mobile** | Open | Fix PR exists. Addresses first-tap swallowing and status-bar behavior on iOS. |
| 11 | [#5292 — Matrix reply to the room-level user event](https://github.com/HKUDS/nanobot/pull/5292) | **Bug / channel correctness** | Open | Fix PR exists. Improves reply threading/linking in non-thread Matrix rooms. |

**Stability takeaway:** The project is not showing broad crash or outage signals, but it has a **concentrated set of correctness and security risks** around sandboxing, memory consolidation, tool recovery, and channel outbound behavior.

---

## 6. Feature Requests & Roadmap Signals

There is no explicit roadmap document in the provided data, but several PRs strongly signal likely near-term direction.

### High-likelihood roadmap signals

| Area | Signals | Likely Next-Version Impact |
|---|---|---|
| **Provider ecosystem expansion** | [#5666](https://github.com/HKUDS/nanobot/pull/5666), [#5453](https://github.com/HKUDS/nanobot/pull/5453), [#4919](https://github.com/HKUDS/nanobot/pull/4919) | More built-in providers, custom API endpoints, and enterprise/self-hosted connectivity. Provider additions may land after conflict resolution and review. |
| **Provider management UX** | [#5776](https://github.com/HKUDS/nanobot/pull/5776), [#5352](https://github.com/HKUDS/nanobot/pull/5352), [#5816](https://github.com/HKUDS/nanobot/pull/5816) | A clearer, more manageable provider setup flow: search, removal controls, consistent branding, and unified settings. This is a strong candidate for the next visible WebUI release. |
| **Self-update / distribution** | [#5817](https://github.com/HKUDS/nanobot/pull/5817) | Adds `nanobot update`, stable PyPI updates, and source `--dev` updates. This is a major usability signal for non-advanced users. |
| **Memory reliability** | [#5403](https://github.com/HKUDS/nanobot/pull/5403), [#4819](https://github.com/HKUDS/nanobot/pull/4819), [#5260](https://github.com/HKUDS/nanobot/pull/5260) | Consolidation and workspace tracking are being hardened. This looks like an internal correctness push rather than a new user-facing feature. |
| **Security hardening** | [#4072](https://github.com/HKUDS/nanobot/issues/4072), [#4667](https://github.com/HKUDS/nanobot/pull/4667), [#4668](https://github.com/HKUDS/nanobot/pull/4668) | Expect tighter sandboxing, outbound message controls, and write-protection for user skills. The symlink issue makes this likely to remain a priority. |
| **Channel robustness** | [#5606](https://github.com/HKUDS/nanobot/pull/5606), [#5292](https://github.com/HKUDS/nanobot/pull/5292), [#4919](https://github.com/HKUDS/nanobot/pull/4919) | Better support for shared mailboxes, correct Matrix reply threading, and custom Telegram endpoints. |
| **Mobile/Web UX** | [#5641](https://github.com/HKUDS/nanobot/pull/5641), [#5367](https://github.com/HKUDS/nanobot/pull/5367) | iOS PWA usability and localization maturity are improving. |

### Most likely to appear in the next version
Given priority labels and visible impact, the strongest candidates are:
1. **Memory consolidation correctness** via [#5403](https://github.com/HKUDS/nanobot/pull/5403)
2. **Security fixes for sandbox/outbound/dream writes** around [#4072](https://github.com/HKUDS/nanobot/issues/4072), [#4667](https://github.com/HKUDS/nanobot/pull/4667), and [#4668](https://github.com/HKUDS/nanobot/pull/4668)
3. **Provider picker search / provider management improvements** via [#5776](https://github.com/HKUDS/nanobot/pull/5776) and [#5352](https://github.com/HKUDS/nanobot/pull/5352)
4. **Self-update flows** via [#5817](https://github.com/HKUDS/nanobot/pull/5817), if review scope is manageable

---

## 7. User Feedback Summary

The provided data does not include explicit user reviews, satisfaction scores, or detailed issue discussions. Feedback below is therefore inferred from reported problems and contributor proposals.

### Main pain points

| Pain Point | Evidence | Interpretation |
|---|---|---|
| **Sandbox trust concerns** | [#4072](https://github.com/HKUDS/nanobot/issues/4072) | Users expect `restrict_to_workspace=True` to be a hard boundary. A relative-symlink bypass undermines confidence in tool execution safety. |
| **Memory/context reliability** | [#5403](https://github.com/HKUDS/nanobot/pull/5403), [#4819](https://github.com/HKUDS/nanobot/pull/4819) | Long-running sessions may not consolidate properly, and lock management can become unstable. This is a core assistant-quality issue. |
| **Provider selection friction** | [#5776](https://github.com/HKUDS/nanobot/pull/5776), [#5352](https://github.com/HKUDS/nanobot/pull/5352) | As provider options grow, users need search, removal controls, and clearer configuration management. |
| **Shared-mailbox use cases** | [#5606](https://github.com/HKUDS/nanobot/pull/5606) | Real-world email deployments often use aliases. The bot needs to distinguish recipient aliases when messages land in the same inbox. |
| **Mobile usability** | [#5641](https://github.com/HKUDS/nanobot/pull/5641) | iOS PWA tap behavior and status-bar handling are still imperfect, which matters for assistant-style products used on mobile. |
| **Conversation threading correctness** | [#5292](https://github.com/HKUDS/nanobot/pull/5292) | In Matrix, replies should link back to the originating user event. Without that, conversations feel broken. |
| **Self-hosting / enterprise connectivity** | [#4919](https://github.com/HKUDS/nanobot/pull/4919), [#5666](https://github.com/HKUDS/nanobot/pull/5666), [#5453](https://github.com/HKUDS/nanobot/pull/5453) | Users need custom endpoints, additional gateways, and broader provider support beyond default integrations. |

### Satisfaction / dissatisfaction signals
- **Positive signal:** high contributor activity, many well-scoped PRs, and active work across WebUI, providers, channels, and memory.
- **Negative signal:** several important PRs remain open for weeks, multiple items are conflict-marked, and a high-impact security issue has

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest for 2026-09-20

## Today's Overview
PicoClaw, an AI agent and personal AI assistant open-source project, saw no new releases today. However, it has been receiving updates on its issues page, with one issue being addressed and another being closed. There have also been one merge/close PRs in the last 24 hours.

## Releases
N/A

## Project Progress
There were one merged/closed PR today that advanced or fixed some features. The details are not available due to the lack of information.

## Community Hot Topics
The most active Issues/PRs today are related to the TLS certificate expiration and support for more attachment types in QQ Channel messages. Comments and reactions are not available for these items.

## Bugs & Stability
No bugs, crashes, or regressions reported today.

## Feature Requests & Roadmap Signals
There are user requests for support parsing and replying to more attachment types in QQ Channel messages. It is predicted that this feature might be added in the next version.

## User Feedback Summary
Users are experiencing issues with the site being down for every browser and every TLS client due to the expired TLS certificate. They are looking for a solution to this problem.

## Backlog Watch
There is one long-unanswered important issue (Issue #3377) that needs maintainer attention.

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

## IronClaw – Project Digest  
**Date:** 2026‑09‑20  

---

### 1. Today’s Overview
- The repository saw **no issue activity** in the past 24 h and **no new releases**.  
- Two **open pull requests** were updated, both introduced on different days (Aug 11 and Sep 18) and still awaiting review/merge.  
- Overall activity is low today, suggesting a period of stabilization or limited maintainer bandwidth. The open PRs focus on **host‑side integration** and **extension readiness**, hinting at upcoming functional expansions.

---

### 2. Releases
*No new releases were published in the last 24 h.*  
(When a release appears, this section will list version number, changelog highlights, breaking changes, and migration steps.)

---

### 3. Project Progress
| PR # | Title | Author | Created | Updated | Status | Scope | Risk |
|------|-------|--------|---------|---------|--------|-------|------|
| **7499** | `feat(identyclaw): host‑mediated Passport for practitioners` | discernible‑io | 2026‑08‑11 | 2026‑09‑19 | **Open** | docs, dependencies | low |
| **8102** | `fix(extensions): resolve provider‑instance readiness live, administrator configuration first` | henrypark133 | 2026‑09‑18 | 2026‑09‑18 | **Open** | extensions | low |

*No PRs were merged or closed today.* The two open PRs represent the only forward‑moving work in the snapshot period.

---

### 4. Community Hot Topics
| Item | Type | Comments / 👍 | Link | Why it matters |
|------|------|----------------|------|----------------|
| **#7499** | PR – feature | 0 comments, 0 👍 | [GitHub PR #7499](https://github.com/nearai/ironclaw/pull/7499) | Introduces a **host‑side “builtin.idcp” seam** that lets “process‑less” IronClaw agents call the IdentyClaw Passport service without a full shell or installable extension. This could broaden the adoption of IronClaw in constrained environments (e.g., serverless, embedded). |
| **#8102** | PR – bug‑fix | 0 comments, 0 👍 | [GitHub PR #8102](https://github.com/nearai/ironclaw/pull/8102) | Fixes a **Google OAuth activation failure** that only manifested when the admin configured credentials via the Web UI rather than environment variables. Addresses a real‑world integration pain point for users of the Gmail/Google Calendar extensions. |

*Both items have no community reaction yet, likely because they are recent or the contributor base is small. Their scopes (host integration, OAuth reliability) indicate core‑infra concerns that will affect many downstream users.*

---

### 5. Bugs & Stability
| Severity | Symptom | Reported In | Fix Status |
|----------|---------|-------------|------------|
| **None** | No new bugs, crashes, or regressions were logged today. | — | — |

*The only stability‑related change is PR #8102, which resolves an activation failure that previously caused extension startup errors. Until it is merged, the issue remains “open but unaddressed” for affected deployments.*

---

### 6. Feature Requests & Roadmap Signals
- **Host‑Mediated Passport (PR #7499)** signals a strategic direction: **supporting agent execution without a local runtime** by delegating authentication to a host process. If merged, this could be a flagship feature for the next minor release.  
- **Extension readiness improvements (PR #8102)** reflect a demand for **more robust configuration pathways** (Web UI vs. env‑vars). Expect future releases to tighten the parity between UI and CLI/Env configuration for all extensions.  

*No explicit user‑submitted feature requests were logged today, but the PR topics hint at the next roadmap milestones: host‑side integration and admin‑friendly extension onboarding.*

---

### 7. User Feedback Summary
- **No direct user comments or reactions** were captured in the past 24 h.  
- Indirectly, the existence of PR #8102 suggests that users have experienced friction when configuring Google OAuth via the UI. This aligns with historically reported “OAuth config mismatch” complaints in the repository’s issue history (outside the 24 h window).  

*Overall sentiment appears neutral; the project is awaiting community engagement on the newly opened PRs.*

---

### 8. Backlog Watch
| Item | Type | Age | Reason for attention |
|------|------|-----|----------------------|
| **#7499** | PR – feature | ~40 days | Still open; could unlock server‑less deployment scenarios. Requires review for security implications of the `AskAlways` exemption. |
| **#8102** | PR – bug‑fix | ~2 days | Fixes a production‑blocking OAuth activation bug. Needs quick review/merge to restore full extension functionality for existing users. |
| **Any closed but unmerged PRs** | — | — | No data in the 24 h window; maintainers should audit older open PRs to avoid stagnation. |

*No long‑standing issues are present in the snapshot, but the two open PRs have been pending for a non‑trivial period and merit maintainer prioritization.*

---

### TL;DR
IronClaw is in a quiet state today with **no new releases or issue activity**, but **two open PRs** are pushing the project toward **host‑mediated authentication** and **more reliable extension configuration**. The lack of community reactions suggests a need for maintainer outreach to accelerate reviews and keep the momentum on these potentially high‑impact changes.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>



# LobsterAI Project Digest — 2026-09-20

## 1. Today's Overview

LobsterAI (by Netease Youdao) showed moderate but focused activity today: **2 issues** and **6 PRs** were updated, with all 6 PRs merged or closed and 1 issue closed — indicating strong closure velocity. No new releases were published. The day's work concentrated on **data integrity fixes** (SQLite cascade/crash bugs), **Windows build reliability**, and **scheduled-task migration robustness**, suggesting the project is in a stability-hardening phase. One open stale issue (#1014) remains awaiting maintainer response. Overall, project health is positive: maintainers are actively closing bug-fix PRs linked to long-open issues.

## 2. Releases

No new releases today.

---

## 3. Project Progress

**6 PRs merged/closed today:**

- **[PR #1072](https://github.com/netease-youdao/LobsterAI/pull/1072)** — Fixed three SQLite storage-layer integrity bugs: re-enabled `PRAGMA foreign_keys`, added defensive explicit child-row deletion in `coworkStore.ts`, and addressed the `storeInitPromise` timeout perpetual-failure bug. Closes #1071.
- **[PR #1070](https://github.com/netease-youdao/LobsterAI/pull/1070)** — Added per-session MCP server toggles, persisting state to the database and intercepting requests at the `McpBridgeServer` layer.
- **[PR #1075](https://github.com/netease-youdao/LobsterAI/pull/1075)** — Fixed Windows build failures when WSL is installed by forcing Git Bash (MSYS2) over WSL bash in `scripts/run-build-openclaw-runtime.cjs`.
- **[PR #1076](https://github.com/netease-youdao/LobsterAI/pull/1076)** — Fixed `migrateScheduledTaskRunsToOpenclaw()` to correctly handle JSONL write failures instead of silently marking migration as complete, preventing permanent data loss.
- **[PR #1077](https://github.com/netease-youdao/LobsterAI/pull/1077)** — Fixed a UI refresh bug: deleting the current agent now correctly triggers a sidebar task-list refresh.
- **[PR #1069](https://github.com/netease-youdao/LobsterAI/pull/1069)** — Refactored the monolithic `CoworkSessionDetail.tsx` (2100+ lines) into focused files with shared types, improving maintainability and reducing unnecessary re-renders during streaming.

---

## 4. Community Hot Topics

- **[Issue #1071](https://github.com/netease-youdao/LobsterAI/issues/1071)** — SQLite cascade-delete failure causing orphaned messages, non-atomic writes risking corruption, and timeout-induced permanent store failure. *Underlying need:* Production-grade data reliability for an app that stores all conversation state locally. This issue had 2 comments and was linked directly to the fix PR (#1072), showing strong community-maintainer collaboration.
- **[Issue #1014](https://github.com/netease-youdao/LobsterAI/issues/1014)** — Request to add a description to improve Dispatch discoverability. *Underlying need:* Community contributors want better onboarding for tool/skill visibility in the Dispatch plugin ecosystem. Currently stale with 1 comment and no maintainer reply.

---

## 5. Bugs & Stability

| Severity | Bug | Status |
|---|---|---|
| **Critical** | SQLite `ON DELETE CASCADE` silently disabled — orphan messages accumulate indefinitely; `save()` non-atomic writes risk corruption on crash; `storeInitPromise` timeout causes permanent store failure | Fixed in [PR #1072](https://github.com/netease-youdao/LobsterAI/pull/1072) (closes [#1071](https://github.com/netease-youdao/LobsterAI/issues/1071)) |
| **High** | Scheduled-task migration (`migrateScheduledTaskRunsToOpenclaw`) silently succeeds after partial JSONL write failure, causing permanent data loss | Fixed in [PR #1076](https://github.com/netease-youdao/LobsterAI/pull/1076) |
| **Medium** | Windows build fails when WSL is present due to incorrect bash path resolution | Fixed in [PR #1075](https://github.com/netease-youdao/LobsterAI/pull/1075) |
| **Low** | Sidebar task list not refreshing after deleting the current agent | Fixed in [PR #1077](https://github.com/netease-youdao/LobsterAI/pull/1077) |

All four bugs reported today have associated merged fix PRs — an excellent 100% resolution rate.

---

## 6. Feature Requests & Roadmap Signals

- **Per-session MCP control** ([PR #1070](https://github.com/netease-youdao/LobsterAI/pull/1070)) — Users need granular MCP server management per conversation, not just a global toggle. This is now merged and likely to ship in the next release.
- **CoworkSessionDetail refactoring** ([PR #1069](https://github.com/netease-youdao/LobsterAI/pull/1069)) — While technically a refactor, it improves streaming performance and testability, signaling ongoing investment in the cowork/session UX.
- **Dispatch discoverability** ([Issue #1014](https://github.com/netease-youdao/LobsterAI/issues/1014)) — Request for better metadata to surface skills in the Dispatch ecosystem; if addressed, could improve third-party plugin adoption.

*Prediction:* The next release will likely highlight per-session MCP toggles and the SQLite reliability fixes as key improvements.

---

## 7. User Feedback Summary

- **Data integrity is a top concern.** The SQLite bugs (#1071) represent real production risks — orphaned messages and potential corruption directly impact user trust. The community auditor (MaoQianTu) who raised the issue and submitted the fix PR demonstrates engaged, technically capable users.
- **Build experience on Windows needs attention.** The WSL-related build failure (#1075) suggests the project's CI/test matrix may not adequately cover Windows + WSL combinations, but the quick fix indicates responsiveness.
- **Migration reliability matters.** The scheduled-task migration bug (#1076) affects users upgrading between versions — data loss here would be highly visible and damaging.
- **UI polish gaps persist.** The unrefreshed sidebar after agent deletion (#1077) is a minor but noticeable UX friction point for power users managing multiple agents.

---

## 8. Backlog Watch

- **[Issue #1014](https://github.com/netease-youdao/LobsterAI/issues/1014)** — Open, stale, 1 comment, 0 reactions. A community contributor is seeking maintainer engagement on Dispatch discoverability. This has been open since March 2026 with no response in over 6 months. **Recommended:** Maintainer should triage or close with guidance.

---

**Overall Assessment:** LobsterAI is in a healthy bug-fix cadence today, with all critical and high-severity issues from the past day resolved. The project shows strong maintainership responsiveness (6 PRs merged, 4 bug fixes landed). The primary risk area is the Windows build environment, and the stale issue #1014 warrants triage.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

### **Moltis Project Digest: 2026-09-20**

#### **1. Today's Overview**
Activity on the Moltis project remains low but focused, with a single open issue and one active pull request logged in the last 24 hours. The project is in a maintenance and refinement phase, with recent efforts prioritizing provider integration improvements and strict schema compliance. Despite the quiet day, the single open PR addresses a significant architectural shift regarding the Groq provider, indicating active development on the AI infrastructure layer.

#### **2. Releases**
No new releases were published in the last 24 hours.

#### **3. Project Progress**
*   **PR #1276 (Open):** This pull request is currently advancing the project's capabilities by integrating Groq as a "first-class" OpenAI-compatible provider. The work involves modifying tool schemas to be strictly zero-parameter compliant and improving how mutation results are parsed, effectively expanding the ecosystem's interoperability.

#### **4. Community Hot Topics**
*   **Groq Provider Integration (PR #1276):**
    *   **Status:** Open / In Review
    *   **Context:** The author, Kaboka22, is implementing a major overhaul of the Groq provider. Previously, Groq models fell through to a genai fallback with limited tool support. This PR aims to fix that by registering all configured Groq models with full tool discovery capabilities.
    *   **Analysis:** This is a high-priority feature request. It addresses the need for more flexible, low-latency inference providers within the Moltis ecosystem.
    *   [View PR #1276](https://github.com/moltis-org/moltis/pull/1276)

#### **5. Bugs & Stability**
*   **Tool Whitelist Logic Error (Issue #1277):**
    *   **Severity:** Medium
    *   **Description:** A bug has been identified where the `spawn_agent` function incorrectly treats `active_tools: []` as an empty whitelist. This results in sub-agents being assigned zero tools, breaking expected functionality.
    *   **Status:** Open / Reported
    *   **Fix Status:** No fix PRs exist yet.
    *   [View Issue #1277](https://github.com/moltis-org/moltis/issues/1277)

#### **6. Feature Requests & Roadmap Signals**
*   **Zero-Parameter Tool Schemas:** The focus on "strict zero-parameter tool schemas" in the latest PR suggests the roadmap is moving toward stricter type safety and validation in tool definitions.
*   **Multi-Provider Support:** The successful integration of Groq signals a roadmap trend toward supporting diverse, high-performance inference providers with OpenAI-compatible APIs.

#### **7. User Feedback Summary**
*   **Tool Management:** Users are currently frustrated by the granularity of tool assignment. The bug report highlights a specific edge case where an empty list (`[]`) is interpreted as "disable all" rather than "default to all," causing sub-agent workflows to fail unexpectedly.
*   **Provider Flexibility:** There is a clear demand for the project to support more providers (specifically Groq) natively rather than relying on fallback mechanisms, indicating a need for more robust provider discovery logic.

#### **8. Backlog Watch**
*   **Issue #1277 (Active Bug):** This is a critical functional bug that needs immediate attention to prevent sub-agent failures. The maintainer should review the logic for `active_tools` to ensure an empty list defaults to the parent's tool set rather than zero tools.
*   **PR #1276 (In Progress):** Requires review and merging to finalize the Groq integration.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest: 2026-09-20

### 1. Today's Overview
CoPaw (QwenPaw) shows **high activity and intense community engagement** today, with 10 open issues and 7 pull requests submitted, though no releases have occurred. The project is in a rapid development phase, focusing heavily on stabilizing the frontend Console (handling DOM mutation errors) and fixing backend agent behaviors (specifically regarding audio and file payload handling). The ecosystem is evolving quickly, with new architectural overhauls for the PawApp SDK and governance features being proposed. Overall, the project appears **healthy and responsive**, with active triaging and rapid turnaround on fixes for user-reported crashes.

### 2. Releases
**No new releases were published in the last 24 hours.**
*Current Version Context:* The latest build referenced in issues is **v2.2.1** (Console build timestamp: 2026-09-19).

### 3. Project Progress
*   **PRs Opened:** 7 new Pull Requests (all pending review/merge).
*   **Issues Opened:** 10 new Issues.
*   **Feature Advancement:**
    *   **Architecture:** A major redesign of the PawApp SDK and app control plane is underway (PR #7874), aiming to provide a unified boundary for public vs. private actions and durable task ownership.
    *   **Governance:** New policy hooks are being added to the plugin system to allow external classifiers to participate in tool-call decisions without monkey-patching (PR #7880).
    *   **Documentation:** Specific control-plane specifications for the Creator `create-video` feature are being documented to align implementation with the public schema (PR #7875).

### 4. Community Hot Topics
The community is currently focused on **interoperability, stability, and governance**.
*   **Critical Frontend Stability:** Issue #7888 regarding the "Something went wrong" screen crashing the browser UI is the most urgent, directly addressed by PR #7889 which fixes the DOM-mutation recovery logic.
*   **AI Provider Compatibility:** There is significant friction with model providers (DeepSeek, OpenCode). Users are reporting errors when sending files or audio, which developers are rapidly addressing via PRs #7886 and #7885.
*   **MCP Governance:** Feature Request #7878 highlights a desire to expose a "decision oracle" hook in the governance pipeline for plugins to inspect pre-tool-call decisions.

### 5. Bugs & Stability
The project is addressing **critical stability regressions** reported by users. The following bugs were reported today (Severity: High):
1.  **Console Crash (DOM Mutation):** Users are stuck on the "Something went wrong" screen after navigation errors. The UI fails to recover without a full reload. **Fix Status:** *PR #7889 is open to fix this.*
2.  **DeepSeek Audio Rejection:** Sending a `.wav` file causes a permanent conversation failure (422 error) because the audio fallback classifier fails to recognize unknown variants. **Fix Status:** *PRs #7886 and #7887 are open to handle this.*
3.  **OpenCode "Free" Model Access:** The UI incorrectly labels models as free, but the API returns 403 errors when trying to use them. **Fix Status:** *Open Issue.*
4.  **MCP OAuth Failure:** Static Bearer Key authentication (e.g., for QCC) fails because the OAuth flow is triggered incorrectly. **Fix Status:** *Open Issue.*

### 6. Feature Requests & Roadmap Signals
*   **Plugin Governance:** The community wants more granular control over tool execution. The request to expose a "pre-tool-call policy hook" (Decision Oracle) suggests a roadmap shift towards more complex, multi-agent governance pipelines where plugins can enforce rules before agents act.
*   **Session History Management:** User #7884 expressed strong dissatisfaction with short chat history, asking for longer retention. This is a usability friction point that may need addressing in the backend persistence layer.
*   **Session UI UX:** Issue #7877 points to a cluttered and non-functional "Session Directory" panel in the Console, suggesting a need for a UI overhaul to make file management easier.

### 7. User Feedback Summary
Users are experiencing **frustration with "broken" workflows** that prevent them from continuing their session.
*   **Dissatisfaction:** Users reported that once an audio or file error occurs, the conversation is permanently "dead" and cannot be recovered (Issue #7876, #7883), leading to a poor user experience.
*   **Confusion:** There is confusion regarding provider capabilities; specifically, the "Free" tier models from OpenCode are not actually usable via API, causing confusion for budget-conscious users.
*   **Accessibility:** The limitation on chat history length is cited as a major usability hurdle for reviewing past context.

### 8. Backlog Watch
*   **Long-standing Console Bug:** Issue #7815 (from 2026-09-16) regarding lazy page chunk loading errors has been open for 4 days with 5 comments. While active, it remains unresolved and affects the core navigation experience.
*   **MCP Server Auth:** Issue #7879 regarding the OAuth failure with static Bearer keys has been open for 1 day. This blocks users from connecting to enterprise-grade MCP servers (like QCC) that don't support OAuth.

---
*Generated based on GitHub data from CoPaw (agentscope-ai/CoPaw).*
*Data Source: agentscope-ai/QwenPaw Repository*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest (2026-09-20)

## 1. Today's Overview
The ZeroClaw project remains highly active with 84 total updates (34 Issues, 50 PRs) in the last 24 hours. Activity is driven by a significant push on **WhatsApp Web channel improvements** and **security/observability enhancements**. The project is currently in a transition phase between v0.8.x and v0.9.0, with several large-scale features (e.g., browser PKCE enrollment, shell permission policies) nearing completion but not yet merged. Overall health is stable, though several high-severity security bugs require immediate attention.

## 2. Releases
**None.** No new releases were published in the last 24 hours.

## 3. Project Progress
*   **WhatsApp Web Channel:** Major progress on the WhatsApp Web channel, with multiple issues and PRs (e.g., #10972, #10973, #10980, #10979) addressing image previews, mentions, and group management capabilities.
*   **Security & Identity:** The "browser PKCE and cross-surface enrollment" feature (#10321) and "authenticated principals on RPC" (#10259) are active and heavily commented, advancing the ZeroRelay enrollment flow.
*   **Shell & Runtime Safety:** The shell V1 permission policy implementation (#10610) and Windows task owner fixes (#10928) are progressing, aiming to improve sandboxing and process management.

## 4. Community Hot Topics
The top active discussions focus on channel capabilities and runtime reliability:
*   **WhatsApp Group Management:** Users are requesting and implementing `create_room` and `invite_user` features for WhatsApp Web (PR #10979), allowing the bot to create and manage groups.
*   **WhatsApp Image Previews:** There is active work to populate `DocumentMessage.jpegThumbnail` for PDFs so they display previews on mobile phones (PR #10980).
*   **Agent Visibility & Delegation:** A high-priority request (#10531) seeks to expose delegate sub-agent progress to the parent agent, solving the current "black box" problem where the parent has no visibility until the sub-agent finishes.
*   **Gateway Tool Payloads:** A feature request (#10962) aims to forward tool result payloads over the `/ws/chat` stream so clients can see tool outputs in real-time.

## 5. Bugs & Stability
Several critical bugs were identified and are under active development:
*   **S0 - Critical Security Risk:** `agent::run` does not build an `ApprovalManager` when `interactive` is false (Issue #10968). This means unattended agents (cron, headless) silently bypass risk-profile tool approvals, posing a potential data loss risk.
*   **S0 - Critical Security Risk:** Git `--attr-source` can hide a mutating subcommand from approval classification (Issue #10966), allowing potentially destructive commands to slip past the safety gate.
*   **S1 - Workflow Blocked:** WhatsApp Web device linking is broken by WhatsApp's new passkey gate (Issue #8627), blocking users from connecting the channel.
*   **S2 - Major Feature Broken:** Inbound images are delivered as literal "[Image]" text instead of actual attachments (Issue #10972), rendering vision capabilities unusable.
*   **S2 - Major Feature Broken:** Mentions are broken in both directions (inbound as bare digits, outbound as plain text) (Issue #10973).

## 6. Feature Requests & Roadmap Signals
*   **Anthropic Prompt Cache:** A configuration for 1-hour prompt-cache TTL (#10663) is requested to optimize costs and performance for specific use cases.
*   **ZeroCode Config UX:** Users are reporting UX friction with ZeroCode Config refreshing the field list twice after saving (Issue #10951), which is also addressed in PR #10964.
*   **Resource Bounds:** A request for "host-scoped admission control" (#10970) indicates a need to manage resources across multiple agents running on a single machine to prevent degradation.

## 7. User Feedback Summary
*   **Pain Point:** Users are frustrated with the lack of visibility into sub-agent execution. Currently, a parent agent delegates work and gets no intermediate feedback until the task is complete.
*   **Pain Point:** Users cannot determine if a message sent to a human actually arrived. The lack of "delivery receipts" (#10929) makes it impossible to know if an agent's request was seen.
*   **Pain Point:** The WhatsApp Web channel is currently "broken" in several ways (images, mentions, group creation), forcing users to look for workarounds or alternative channels.
*   **Praise:** Users are generally supportive of the architectural direction, particularly the focus on "browser PKCE" and "authenticated principals" for security.

## 8. Backlog Watch
*   **Runtime & Gateway Separation:** Issue #7432 is a long-standing tracker for completing the separation of runtime and gateway work in v0.9.0.
*   **RFC Decision Records:** Issue #8691 tracks the inventory of Architectural Decision Records (ADRs) and accepted RFCs, ensuring architectural decisions are documented and followed through.
*   **Large PRs:** Several large PRs (e.g., #10321, #10525, #9809) are in "distinguished contributor" or "needs author action" states, indicating they are substantial code additions requiring significant review or testing.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*