# OpenClaw Ecosystem Digest 2026-10-07

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-06 23:27 UTC

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

# NanoBot Project Digest — 2026-10-07

**Scope:** GitHub activity for [`HKUDS/nanobot`](https://github.com/HKUDS/nanobot) over the 24 hours leading into 2026-10-07.  
**Status note:** “Closed” PRs are reported in the source data as merged/closed; where merge state is not explicitly specified, this digest treats them as closed within the 24-hour window.

---

## 1. Today’s Overview

| Metric | 24h Value |
|---|---:|
| Issues updated | 4 |
| Open/active issues | 3 |
| Closed issues | 1 |
| PRs updated | 12 |
| Open PRs | 9 |
| Merged/closed PRs | 3 |
| New releases | 0 |

NanoBot recorded 12 PR updates and 4 issue updates in the 24-hour window, with no new release. Work concentrated on WebUI usability, provider compatibility, runtime/session recovery, and channel-specific messaging behavior. Three PRs reached closed status, while nine remained open, indicating active development but also a visible review queue. Project health is stable but not clean: a provider bug made DeepSeek web search unusable, and context-compaction notifications are creating user-visible noise in Slack and background cycles.

---

## 2. Releases

No new releases were published in the 24-hour window.

---

## 3. Project Progress

### Closed PRs in the 24-hour window

- **[PR #6057 — feat(webui): choose the chat for scheduled tasks](https://github.com/HKUDS/nanobot/pull/6057)**  
  Closed. This PR lets users change the chat used by a scheduled task in the WebUI. The selected chat affects execution, recorded turns, and the default reply route for future runs. This improves operational control for scheduled automation.

- **[PR #6080 — feat(webui): show commit and prefill bug report diagnostics](https://github.com/HKUDS/nanobot/pull/6080)**  
  Closed. This PR adds commit visibility to Settings → About, including a short commit hash, full-hash tooltip, and source link. It also prefills issue-report diagnostics, reducing friction for users filing bug reports and improving triage quality.

- **[PR #1420 — Fix: Add sender name context to DingTalk messages](https://github.com/HKUDS/nanobot/pull/1420)**  
  Closed. This PR addresses a DingTalk channel limitation where the agent only received the sender’s `staffId`, such as `123456`, rather than a human-readable display name. Closing this item improves sender identity context for DingTalk conversations.

### Active in-flight progress

- **[PR #6032 — feat(webui): add configurable local trusted extension surface](https://github.com/HKUDS/nanobot/pull/6032)**  
  Open with a conflict. This is a strategic WebUI extensibility change that would allow local trusted browser-side extensions, discovered from a local directory and served through scoped gateway routes. It touches documentation, testing, and security surfaces.

- **[PR #5845 — Add Opper as a built-in provider](https://github.com/HKUDS/nanobot/pull/5845)**  
  Open. Adds Opper as a built-in gateway-style provider, mirroring existing gateway entries such as Eden AI. This extends provider coverage for users routing models through third-party gateways.

- **[PR #6071 — fix(cron): preserve schedules edited during execution](https://github.com/HKU/nanobot/pull/6071)**  
  Open. Fixes a cron-scheduling correctness issue where a schedule edited while a job callback is running could be consumed by that running callback, causing one-shot jobs to be disabled/deleted or recurring jobs to be postponed.

- **[PR #6087 — refactor(ui): replace middle-dot separators with clearer hierarchy](https://github.com/HKUDS/nanobot/pull/6087)**  
  Open. Improves WebUI and TUI readability by replacing decorative middle-dot separators with clearer spacing, field separation, layered tooltips, and more complete status messages.

- **[PR #6086 — fix(providers): drop hosted web_search tool from Chat Completions extra_body](https://github.com/HKUDS/nanobot/pull/6086)**  
  Open. Directly fixes [Issue #6085](https://github.com/HKUDS/nanobot/issues/6085) by filtering hosted `web_search` tool entries out of Chat Completions requests, where they are invalid.

- **[PR #6083 — feat: configure heartbeat evaluator model preset](https://github.com/HKUDS/nanobot/pull/6083)**  
  Open. Adds an optional `gateway.heartbeat.evaluatorModelPreset` setting so the post-run heartbeat notification evaluator can use a separately configured model preset without changing the main agent model.

- **[PR #6082 — fix(session): preserve completed iterations in runtime checkpoints](https://github.com/HKUDS/nanobot/pull/6082)**  
  Open. Preserves earlier completed tool iterations when recovering an interrupted turn, preventing resumed model requests from losing evidence of work that had already completed.

- **[PR #4819 — fix(memory): replace WeakValueDictionary with plain dict for consolidation locks](https://github.com/HKUDS/nanobot/pull/4819)**  
  Open. Keeps per-session consolidation locks strongly referenced by the `Consolidator`, avoiding unstable lock identity across garbage-collection cycles.

- **[PR #4820 — fix(runtime): reject non-string web fetch URLs](https://github.com/HKUDS/nanobot/pull/4820)**  
  Open. Prevents non-string web fetch URLs from being coerced into cache signatures, which could pollute later valid lookup signatures.

---

## 4. Community Hot Topics

Based on the provided data, issue comments and reactions are the strongest activity signals. PR comment counts were not populated in the snapshot, so high-severity PRs are included where they address active user-reported bugs.

### Most active issue

- **[Issue #6029 — Allow silent context compaction and suppress channel broadcasts for background idle/dream cycles](https://github.com/HKUDS/nanobot/issues/6029)**  
  Status: Open  
  Priority: P2  
  Comments: 2  
  Reactions: 0

  This is the most active issue in the 24-hour window. Users report that background maintenance routines, such as idle session checks or automated dream/heartbeat cycles, trigger context compression and broadcast status messages like “Compressing context…” into active channels. The underlying need is not simply a bug fix, but a notification model that distinguishes user-facing activity from background system work.

### Related hot topic

- **[Issue #6084 — Slack: compaction notices post as two permanent messages; add showCompactionNotices or edit in place](https://github.com/HKUDS/nanobot/issues/6084)**  
  Status: Open  
  Comments: 0  
  Reactions: 0

  This issue is closely related to [Issue #6029](https://github.com/HKUDS/nanobot/issues/6029). It describes repeated Slack compaction messages, where “Compressing context…” and “Context compacted.” appear as separate permanent messages. With idle compaction enabled, this can create recurring noise in DMs. The underlying need is configurable visibility, in-place updates, or ephemeral messages for system maintenance notifications.

### Closed but still signal-worthy

- **[Issue #5274 — Matrix: messages replied to a user’s query should make use of the reply feature](https://github.com/HKUDS/nanobot/issues/5274)**  
  Status: Closed  
  Comments: 1  
  Reactions: 0

  This issue highlights a channel-native UX expectation: when a user replies to a bot prompt using Matrix’s reply feature, the bot should preserve that conversational context instead of responding as a top-level message. Its closure suggests that Matrix reply handling is being addressed or has been addressed, reinforcing the broader need for channel-aware conversation semantics.

### High-severity PR attention

- **[Issue #6085](https://github.com/HKUDS/nanobot/issues/6085)** and **[PR #6086](https://github.com/HKUDS/nanobot/pull/6086)**  
  Even without comment volume, this is likely to draw maintainer and user attention because it blocks DeepSeek usage when web search is enabled. The fix PR is already open and directly references the issue.

---

## 5. Bugs & Stability

The following bugs and stability issues were reported, updated, or addressed in the 24-hour window. Severity ranking reflects user impact and operational risk.

| Rank | Item | Severity | Impact | Fix Status |
|---:|---|---|---|---|
| 1 | [Issue #6085 — Turning on DeepSeek web search renders LLM calls unusable](https://github.com/HKUDS/nanobot/issues/6085) | Critical / High | Enabling DeepSeek web search causes every message to fail with an invalid `tools[23].type: unknown variant web_search` error. This effectively makes the provider unusable in affected configurations. | Open. Fix PR exists: [PR #6086](https://github.com/HKUDS/nanobot/pull/6086). |
| 2 | [Issue #6084 — Slack compaction notices post as two permanent messages](https://github.com/HKUDS/nanobot/issues/6084) | High | With `idleCompactAfterMinutes` enabled, idle Slack DMs can repeatedly receive permanent system messages. This creates channel noise and degrades user experience. | Open. No direct fix PR listed. Related to [Issue #6029](https://github.com/HKUDS/nanobot/issues/6029). |
| 3 | [Issue #6029 — Silent context compaction and suppressed background broadcasts](https://github.com/HKUDS/nanobot/issues/6029) | Medium-High | Background idle/dream/heartbeat cycles can broadcast compaction status into active channels. This is less blocking than a crash but represents a persistent UX and operational-noise problem. | Open. No direct fix PR listed. |
| 4 | [PR #6071 — fix(cron): preserve schedules edited during execution](https://github.com/HKUDS/nanobot/pull/6071) | Medium | Editing a cron schedule while its callback is running can cause the new schedule to be consumed by the running callback, potentially disabling one-shot jobs or delaying recurring jobs. | Open fix PR. |
| 5 | [PR #6082 — fix(session): preserve completed iterations in runtime checkpoints](https://github.com/HKUDS/nanobot/pull/6082) | Medium | Interrupted-turn recovery may restore only the latest tool iteration, causing the resumed model request to lose evidence of earlier completed work. | Open fix PR. |
| 6 | [PR #4819 — fix(memory): replace WeakValueDictionary with plain dict for consolidation locks](https://github.com/HKUDS/nanobot/pull/4819) | Medium-Low | Per-session consolidation locks may be garbage-collected if stored in a `WeakValueDictionary`, causing unstable lock identity across idle GC cycles. | Open fix PR. |
| 7 | [PR #4820 — fix(runtime): reject non-string web fetch URLs](https://github.com/HKUDS/nanobot/pull/4820) | Low-Medium | Non-string truthy URL values could be coerced into web fetch cache signatures, potentially interfering with later valid lookups. | Open fix PR. |

### Resolved or closed stability items

- **[Issue #5274 — Matrix reply handling](https://github.com/HKUDS/nanobot/issues/5274)**  
  Closed in the 24-hour window. This was a channel-behavior issue where Matrix replies to bot prompts were not preserved as replies.

- **[PR #1420 — DingTalk sender name context](https://github.com/HKUDS/nanobot/pull/1420)**  
  Closed in the 24-hour window. This improved DingTalk message context by including sender display name information rather than only `staffId`.

---

## 6. Feature Requests & Roadmap Signals

### High-probability roadmap signals

- **[Issue #6029 — Silent background compaction and suppressed broadcasts](https://github.com/HKUDS/nanobot/issues/6029)**  
  Strong signal for a notification-control feature. Likely implementation options include:
  - A `showCompactionNotices`-style setting.
  - Quiet mode for background idle/dream/heartbeat cycles.
  - Ephemeral or in-place-updated system messages where the channel supports it.
  - Separate user-facing and system-facing notification streams.

  Given the related Slack complaint in [Issue #6084](https://github.com/HKUDS/nanobot/issues/6084), this is a strong candidate for the next maintenance or minor release.

- **[Issue #6084 — Slack compaction notice control or in-place editing](https://github.com/HKUDS/nanobot/issues/6084)**  
  Directly complements [Issue #6029](https://github.com/HKUDS/nanobot/issues/6029). If the project wants to reduce repeated Slack noise, the likely fix is either suppressing notices by default or editing a single transient message instead of posting two permanent messages.

- **[PR #6086 — Provider web_search compatibility fix](https://github.com/HKUDS/nanobot/pull/6086)**  
  Because [Issue #6085](https://github.com/HKUDS/nanobot/issues/6085) blocks a provider configuration, this fix is a high-priority candidate for the next patch, especially if DeepSeek or similar hosted-search providers remain supported.

- **[PR #6083 — Configurable heartbeat evaluator model preset](https://github.com/HKUDS/nanobot/pull/6083)**  
  This is a useful operational feature for users who want a cheaper or more specific model for heartbeat evaluation without changing the main agent model. It is a reasonable candidate for the next feature release.

- **[PR #6080 — WebUI diagnostics and bug-report prefill](https://github.com/HKUDS/nanobot/pull/6080)**  
  Closed in the window. If merged, this will likely appear in the next release and should improve support quality by making it easier for users to report accurate environment and commit information.

- **[PR #6057 — WebUI scheduled-task chat selection](https://github.com/HKUDS/nanobot/pull/6057)**  
  Closed in the window. If merged, this is a meaningful usability improvement for scheduled automation and is likely to appear in the next release or already be available depending on merge timing.

### Medium-term roadmap signals

- **[PR #6032 — Local trusted WebUI extension surface](https://github.com/HKUDS/nanobot/pull/6032)**  
  This is strategically important because it would create a governed extension surface for trusted browser-side add-ons. However, it has a conflict, touches security and gateway routing, and will likely require more review. It is more likely to appear in a later release than in an immediate patch.

- **[PR #5845 — Opper built-in provider](https://github.com/HKUDS/nanobot/pull/5845)**  
  Provider expansion is a clear ongoing roadmap theme. Opper is a reasonable addition, but provider PRs often require testing, documentation, and registry-level review. It is a likely future inclusion but not necessarily immediate.

- **[PR #6087 — UI hierarchy and separator cleanup](https://github.com/HKUDS/nanobot/pull/6087)**  
  This is an incremental UX improvement. It is likely to be merged once reviewed, but it is less urgent than provider or notification fixes.

---

## 7. User Feedback Summary

### Main pain points

1. **Unwanted system messages in user channels**  
   Users are seeing compaction and background-cycle status messages in active conversations, especially Slack. The core complaint is that maintenance activity is too visible and too permanent.

   - [Issue #6029](https://github.com/HKUDS/nanobot/issues/6029)
   - [Issue #6084](https://github.com/HKUDS/nanobot/issues/6084)

2. **Provider compatibility can break normal operation**  
   Turning on DeepSeek web search produces an invalid tool type error on every message. This is a high-frustration issue because it affects basic usability rather than an advanced edge case.

   - [Issue #6085](https://github.com/HKUDS/nanobot/issues/6085)
   - [PR #6086](https://github.com/HKUDS/nanobot/pull/6086)

3. **Channel-native conversation semantics matter**  
   Matrix users expect replies to be preserved as replies. The closure of [Issue #5274](https://github.com/HKUDS/nanobot/issues/5274) suggests that channel-specific UX fidelity is becoming a more important quality expectation.

4. **Bug reporting friction**  
   Before the diagnostics PR, users likely had to manually collect version, environment, and revision details. [PR #6080](https://github.com/HKUDS/nanobot/pull/6080) addresses this by exposing commit information and prefilling issue reports.

### Observed use cases

- Idle session compaction and long-running DM maintenance
- Scheduled tasks and cron-style automation
- Heartbeat or dream cycles for background agent evaluation
- Slack, Matrix, and DingTalk channel deployments
- Provider gateway usage, including DeepSeek and Opper
- WebUI-based administration and troubleshooting
- Web fetch and runtime tooling

### Satisfaction and dissatisfaction signals

- **Positive signals:**  
  The project is actively addressing provider bugs, WebUI usability, diagnostics, and channel behavior. Multiple

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest
## **2026-10-07**
### 1. **Today's Overview**
PicoClaw has experienced elevated development activity, with 69 pull requests merged and 5 new issues reported in the last 24 hours. The project is focused on improving agent configuration, UX of the web interface, and stability of core functionality, though several open issues indicate continued refinement needed. The active fork maintenance initiative remains, signaling sustained community interest.
### 2. **Releases**
No new releases are available as of 2026-10-07.
### 3. **Project Progress**
- **PR Activity:** 69 pull requests were merged/closed in the last 24 hours, with no open PRs. This indicates consistent active development and resolution of issues.
- **Key Workstreams:** Work focused on agent configuration improvements, session management (including ghost session detection and UX clarification), and core stability fixes (e.g., `turn.done` lifecycle signaling, MCP tool schema sanitization, and retry handling for LLM errors).
- **Developer Activities:** Recent PRs concentrate on bug fixes, stability improvements, and UX enhancements, reflecting a priority on reliability and usability.
### 4. **Community Hot Topics**
- **Issue #440 (OPEN):** *"Replace hard iteration limit with context-window bounding and loop detection"* — A high-severity enhancement request to reduce overly restrictive iteration limits, addressing complex tasks failing due to iteration limits. (Source: sipeed/picoclaw Issue #440)
- **Issue #3406 (OPEN):** *"Web UI: clearer working indicator, separate manual/channel sessions, richer session list with archiving"* — Focused on UX improvements in the web dashboard, including session clarity and management, a clear use case for immediate web UI refinement. (Source: sipeed/picoclaw Issue #3406)
### 5. **Bugs & Stability**
- **High Priority:**
  - *Issue #3407 (OPEN):* "Web UI: a session can disappear from the list while the model is still thinking (ghost session)" — A critical UX bug where sessions vanish during thinking, causing lost chat history, potentially requiring resolution to improve session reliability. (Source: sipeed/picoclaw Issue #3407)
  - *Issue #440 (OPEN):* "Replace hard iteration limit with context-window bounding and loop detection" — A high-priority issue where hard iteration limits block legitimate complex tasks, affecting task completion. (Source: sipeed/picoclaw Issue #440)
- **Medium Priority:**
  - *Issue #3406 (OPEN):* UX refinement requirements (working indicator, session types, list richness) requiring immediate backend/UI adjustments. (Source: sipeed/picoclaw Issue #3406)
- **No Critical Crashes Reported:** No major crashes or outages detected; most issues are in UX and configuration areas.
### 6. **Feature Requests & Roadmap Signals**
- **Feature Priorities:**
  - **Agent Configuration & Efficiency:** Revision of iteration limits (Issue #440), and context-aware loop management (related to issue optimization).
  - **Web UI UX:** Session management improvements (Issue #3406), including clearer thinking indicators and session type separation.
  - **Core Stability:** Rectification of session lifecycle bugs, tool schema handling, and LLM error handling (ongoing fixes in current PRs).
- **Signal:** Strong signal of ongoing work toward efficiency, usability, and reliability improvements, with feature requests likely to appear in upcoming releases.
### 7. **User Feedback Summary**
- **Key Pain Points:**
  - Users report frustration with overly restrictive iteration limits in complex agent tasks, leading to session failures and unmet deliverables.
  - Web UI usability issues, including unclear session lifecycle indicators and fragile session management (ghost sessions), directly affecting real-world use.
- **Use Cases:** Users requiring high-efficiency agent execution, and users needing reliable, intuitive web-based chat interactions (e.g., managing multiple sessions, ensuring session history completeness).
- **Satisfaction:** General positive sentiment for core stability and basic functionality; feedback focus is on refinement of UX and efficiency, indicating user demand for improved experience.
### 8. **Backlog Watch**
- **High Priority Issues:**
  - *Issue #440 (OPEN):* Hard iteration limit conflicts with complex task requirements, needs immediate adjustment to context-window bounding and loop detection to resolve.
  - *Issue #3407 (OPEN):* Ghost session bugs in the web UI require backend session management fixes to ensure session reliability.
- **Long-Opened PRs:**
  - *Issue #3406 (OPEN):* Web UI feature request (session clarity, session types, list richness) requires ongoing development and implementation.
- **Note:** These backlog items need immediate attention from the maintainer to ensure resolution, especially given the critical nature of session reliability and iteration efficiency issues.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>



# NullClaw Project Digest — 2026-10-07

---

## 1. Today's Overview

NullClaw shows steady, maintainer-driven development velocity with **16 PRs updated** in the past 24 hours and **4 merged/closed**, all attributed to lead contributor `vernonstinebaker`. No new releases were published. The project is in a cleanup-and-hardening phase: the three-part split of PR #987 (local loop hygiene) landed today, fixing critical lifetime and concurrency defects in the agent's local execution loop. Concurrently, CI gaps are being closed with PR #1042 (Docker build gating) and PR #1036 (issue filing the same concern). Documentation is being refreshed for stale figures and broken Android cross-compile guidance. Overall project health is **positive** — active fixes, no stalled critical paths visible.

---

## 2. Releases

**None.** The latest images shipped remain from 2026-05-29 ([PR #1042](https://github.com/nullclaw/nullclaw/pull/1042)). The absence of a release pipeline gated on PRs means the `latest` tag may diverge from current `main`, a gap the team is now addressing.

---

## 3. Project Progress

### Merged / Closed Today

| PR | Title | Summary |
|----|-------|---------|
| [#1046](https://github.com/nullclaw/nullclaw/pull/1046) | `fix(agent): bound local_loop config and stop returning dead stack storage` | Third of three splitting PR #987 — fixes a slice returned from a dead stack frame in `stackLowerAscii`. |
| [#1045](https://github.com/nullclaw/nullclaw/pull/1045) | `fix(agent): make parallel tool workers safe on every exit path` | Second split — addresses concurrency and lifetime defects in the parallel tool worker arena. |
| [#1044](https://github.com/nullclaw/nullclaw/pull/1044) | `fix(agent): make local_loop.enabled actually gate the feature` | First split — the gating fix. `local_loop.enabled` was previously a no-op; compression and behavior ran unconditionally. |

**Net result:** The local agent loop — a core feature for tool-heavy long-running tasks — is now correctly gated, concurrency-safe, and free of use-after-return bugs.

### Notable Open PRs Advanced Today

- [#971](https://github.com/nullclaw/nullclaw/pull/971) — **Native tool calls during SSE streaming** — decouples tool-call support from the streaming callback path; providers can now emit native tools mid-stream instead of falling back to prompt injection. Open since June; still awaiting review.
- [#1001](https://github.com/nullclaw/nullclaw/pull/1001) — **Memory auto-recall controls** — restores configurable `auto_recall`, `recall_limit`, and `max_context_bytes` after a fork was deleted. Merged/closed today.
- [#1005](https://github.com/nullclaw/nullclaw/pull/1005) — **Memory archive leakage fix** — prevents archived conversation shards from being recalled into live turns. Open.
- [#1012](https://github.com/nullclaw/nullclaw/pull/1012) — **A2A task scoping by bearer principal** — closes [#974](https://github.com/nullclaw/nullclaw/issues/974); fixes cross-user task visibility in the A2A JSON-RPC layer. Merged/closed today.

---

## 4. Community Hot Topics

### Most Discussed / Long-Open Items

1. **[PR #971](https://github.com/nullclaw/nullclaw/pull/971)** — *feat(streaming): native tool calls during SSE streaming* (open since 2026-06-29)
   - **Why it matters:** Native tool emission during streaming is a significant UX improvement. The current fallback to prompt-injection format degrades accuracy and increases token cost. Community interest is implicit — no comments yet, but the PR has been open ~3 months, suggesting it's in review backlog.

2. **[PR #987](https://github.com/nullclaw/nullclaw/pull/987)** — *feat(agent): loop hygiene for long local tool-heavy runs* (original, superseded by #1044/#1045/#1046)
   - **Why it matters:** This was the monolithic PR that spawned three fix PRs. Its complexity led to discovering critical defects — exactly the kind of review catch that improves stability.

3. **[Issue #1036](https://github.com/nullclaw/nullclaw/issues/1036)** — *ci: gate Docker image changes on PRs and before release publish*
   - **Why it matters:** Highlights a real production incident — a broken image shipped with no CI notice ([#1017](https://github.com/nullclaw/nullclaw/pull/1017) reference). PR #1042 directly addresses this.

### Underlying Needs
- **Reliability of long-running agent loops** — the #987 split and fixes signal that local tool-heavy workloads are a priority use case.
- **Streaming + native tools** — a requested capability gap that, once filled, would close a major feature deficit.
- **CI/CD maturity** — the Docker gate issue and the stale `latest` tag point to under-instrumented release pipelines.

---

## 5. Bugs & Stability

| Severity | Item | Description | Fix Status |
|----------|------|-------------|------------|
| **Critical** | [PR #1046](https://github.com/nullclaw/nullclaw/pull/1046) | Dead stack frame return in `stackLowerAscii` — undefined behavior, potential crash | ✅ Merged today |
| **Critical** | [PR #1045](https://github.com/nullclaw/nullclaw/pull/1045) | Arena race + two use-after-free paths in parallel tool workers | ✅ Merged today |
| **High** | [PR #1044](https://github.com/nullclaw/nullclaw/pull/1044) | `local_loop.enabled` was a no-op — feature ran unconditionally | ✅ Merged today |
| **High** | [PR #1012](https://github.com/nullclaw/nullclaw/pull/1012) | A2A tasks not scoped by bearer principal — cross-user task visibility | ✅ Merged today (closes [#974](https://github.com/nullclaw/nullclaw/issues/974)) |
| **Medium** | [PR #1005](https://github.com/nullclaw/nullclaw/pull/1005) | Archived conversation shards recalled into live turns, corrupting context | 🔄 Open |
| **Medium** | [PR #1042](https://github.com/nullclaw/nullclaw/pull/1042) | Docker image built only on tag push; PRs never trigger a build, allowing broken images to ship unnotified | 🔄 Open |
| **Low** | [PR #1021](https://github.com/nullclaw/nullclaw/pull/1021) | `GIT_DIR` inherited from worktree breaks pre-push hook tests | 🔄 Open |

**Note:** The three critical/high bugs today all originated from the review of PR #987, suggesting the PR was functionally correct at a high level but had latent memory-safety and concurrency defects — now resolved.

---

## 6. Feature Requests & Roadmap Signals

| Signal | Source | Assessment |
|--------|--------|------------|
| **Native tool calls during streaming** | [PR #971](https://github.com/nullclaw/nullclaw/pull/971) | High-priority feature; open 3+ months. Likely in next minor release if review completes. |
| **Configurable memory recall** | [PR #1001](https://github.com/nullclaw/nullclaw/pull/1001) | Restored from deleted fork. Now merged — expected in next release. |
| **Symlinked skill directories** | [PR #1003](https://github.com/nullclaw/nullclaw/pull/1003) | Small UX improvement; open. Low risk, likely to land soon. |
| **HTTP byte-exact curl transport tests** | [PR #1019](https://github.com/nullclaw/nullclaw/pull/1019) | Test coverage, not a feature per se, but signals investment in transport reliability. |

**Predicted next-release features:** Memory recall controls (now merged), A2A auth scoping (merged), symlinked skills (likely), and potentially native streaming tools if PR #971 clears review.

---

## 7. User Feedback Summary

- **Pain point — broken Docker image shipped silently:** Issue [#1036](https://github.com/nullclaw/nullclaw/issues/1036) and PR [#1042](https://github.com/nullclaw/nullclaw/pull/1042) confirm users ran into `AccessDenied` errors because the gateway shipped with a root-owned `/nullclaw-data` directory. No CI check caught this.
- **Pain point — archive memory leaking into live turns:** PR [#1005](https://github.com/nullclaw/nullclaw/pull/1005) addresses users seeing stale conversation history injected into current sessions, degrading response quality.
- **Pain point — `local_loop` flag non-functional:** PR [#1044](https://github.com/nullclaw/nullclaw/pull/1044) confirms users who disabled `local_loop.enabled` still had compression and behavior active — a configuration trust issue.
- **Satisfaction signal — maintainer responsiveness:** All four merged/fixed PRs landed the same day they were split, and documentation PRs (#1039, #1040, #1043) are being proactively refreshed. The project is well-maintained.

---

## 8. Backlog Watch

| Item | Type | Age | Risk |
|------|------|-----|------|
| [PR #971](https://github.com/nullclaw/nullclaw/pull/971) — native tool calls during streaming | Feature | ~3 months | High — core capability gap |
| [PR #1005](https://github.com/nullclaw/nullclaw/pull/1005) — archive recall leakage | Bug fix | ~13 days | Medium — data integrity |
| [PR #1021](https://github.com/nullclaw/nullclaw/pull/1021) — worktree GIT_DIR fix | Bug fix | ~3 days | Low — contributor workflow |
| [PR #1042](https://github.com/nullclaw/nullclaw/pull/1042) — gate Docker on PRs | CI | ~2 days | Medium — prevents future incidents |
| [Issue #1036](https://github.com/nullclaw/nullclaw/issues/1036) — same CI concern as filed issue | Issue | ~2 days | Medium |

**Maintainer attention recommended for:** PR #971 (long-open feature) and PR #1005 (bug with user-facing data corruption). The CI gap (PR #1042 / Issue #1036) is being addressed in parallel and should land soon.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw – Project Digest (2026‑10‑07)**  
*Compiled from GitHub activity on github.com/nearai/ironclaw (last 24 h)*  

---

### 1. Today’s Overview  
- The repository saw **minimal activity** over the past day: no issues were opened, updated, or closed.  
- One new pull request was opened, bringing the only change‑candidate to the queue.  
- No releases or merges occurred, indicating a **quiet development window** and a stable code base at present.  

---

### 2. Releases  
*No new releases were published in the last 24 h.*  

---

### 3. Project Progress  
- **Merged / Closed PRs:** 0  
- **Open PRs awaiting review:** 1  
  - **#8127 – “feat: add Sendblue iMessage and SMS extension”** (opened 2026‑10‑06 by *lookevink*).  
    - Introduces a bundled *Sendblue* extension that enables direct iMessage/SMS handling, phone pairing, authenticated receive webhooks, terminal‑based replies, and persistent DM target storage.  
    - Keeps Sendblue API credentials under host control and adds declarative, bounded configuration to the existing host lifecycle.  

No other code changes landed today.  

---

### 4. Community Hot Topics  
| Item | Type | Comments / 👍 | Key Focus |
|------|------|---------------|-----------|
| **#8127** | Pull Request | 0 comments, 0 👍 | Adding native iMessage/SMS support via Sendblue – a high‑visibility feature for users who need seamless cross‑channel messaging. |

*Analysis*: The sole active contribution is a **feature request turned PR**, suggesting that community interest is now shifting toward richer communication integrations. The absence of discussion may reflect either early‑stage exposure or limited reviewer bandwidth.

---

### 5. Bugs & Stability  
- **Reported bugs today:** 0  
- **Open regressions:** None identified.  
- **Fix PRs:** N/A  

The project’s stability appears unchanged; no crash reports or performance concerns surfaced.

---

### 6. Feature Requests & Roadmap Signals  
- The **Sendblue iMessage/SMS extension** (PR #8127) is the only explicit feature signal from the community in the last 24 h.  
- Given its scope (messaging channel expansion) and the fact that it was opened as a **feature PR** rather than a mere suggestion, it is a strong candidate to be slated for the **next minor release**—provided the maintainers approve and merge it.  

No other new user‑submitted requests were recorded today.

---

### 7. User Feedback Summary  
- **Pain points**: Not evident in the last 24 h; no issue tickets or comments were logged.  
- **Use cases**: The Sendblue extension hints at a demand for **direct mobile messaging** (iMessage/SMS) without relying on third‑party bridges.  
- **Satisfaction**: The quiet issue tracker suggests either a **stable user experience** or **low recent engagement**. Monitoring the next few days will clarify which is true.

---

### 8. Backlog Watch  
| Item | Type | Age | Reason for attention |
|------|------|-----|----------------------|
| *(none)* | Issues | – | The issue list is currently empty, so no long‑standing tickets await triage. |
| #8127 | Pull Request | 1 day | Needs review, CI verification, and potential integration testing before it can move forward. |

*Recommendation*: Allocate at least one maintainer to **review PR #8127** within the next 3–5 days to keep momentum on the messaging extension and to signal responsiveness to contributors.

---

**Overall Health Assessment** – The IronClaw project is in a **stable but low‑activity** state today. The repository is free of open bugs, and the single open PR represents a clear, community‑driven enhancement. Prompt review of that PR will be the primary lever to demonstrate ongoing development and to enrich the platform’s capabilities.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest | 2026-10-07

## 1. Today's Overview
Activity on the LobsterAI repository has been substantial today, with **50 issues closed** and **9 pull requests merged/closed**, indicating a high level of maintenance throughput. The project is actively addressing legacy code removal and CI/CD stability while tackling specific user-reported bugs. There were **0 new releases** today, suggesting a period of internal refinement rather than public feature deployment.

## 2. Releases
**None today.** The project has not published a new release in the last 24 hours.

## 3. Project Progress
Today saw significant progress in codebase cleanup and CI stability:
*   **Legacy Code Removal:** PR #2802 successfully removed dead legacy NIM direct-SDK gateway code, streamlining the IM integration architecture.
*   **CI/CD Improvements:** PR #2803 limited the stale bot workflow to issues specifically labeled "needs-info," reducing noise and preventing premature closure of unresolved bugs.
*   **Build System Updates:** Several automated dependency updates (PRs #2579, #2580, #2581) were pushed to modernize the GitHub Actions workflow.
*   **MacOS Stability:** PR #2804 fixed symlinked profile path handling, resolving test failures on macOS that were previously masked by CI running on Ubuntu.

## 4. Community Hot Topics
The most engaged discussions focused on **IM stability**, **API compatibility**, and **platform-specific bugs**:
*   **Gemini Custom Model Support (Issue #831):** Users are reporting that the latest version no longer supports custom Gemini proxy models. This is critical for users relying on non-official API endpoints.
*   **Win11 and IM Connection Errors (Issue #144):** Multiple reports of 404 errors on Windows 11, specifically involving Anthropic SDK interactions, indicating potential platform compatibility regressions.
*   **IM Integration Persistence (Issue #204):** Users report that Feishu (Lark) API keys frequently disappear after updates, causing connection drops.
*   **Local Tool Execution (Issue #405):** Users utilizing local Ollama models (like Qwen or DeepSeek) are unable to execute commands or list files, despite configuration, while cloud models work fine.

## 5. Bugs & Stability
**Severity Ranking:**

1.  **High - Path Traversal Risk (Issue #543):** A security researcher identified a potential high-severity path traversal vulnerability in `openclawMemoryFile.ts` where user-controlled `workingDirectory` parameters are used without sufficient validation. *Status: Open.*
2.  **High - MacOS Compatibility (Issue #405):** Local tool execution fails for specific models (Qwen2.5, DeepSeek-R1) on local setups, while cloud models function correctly.
3.  **Medium - Windows 11 Stability (Issue #144):** Frequent 404 errors and crashes on Windows 11 involving the Claude Agent SDK.
4.  **Medium - Document Generation (Issue #815):** Generated DOC files are frequently corrupted and cannot be opened in Windows environments across multiple versions.

## 6. Feature Requests & Roadmap Signals
*   **Codex Login Support (Issue #29):** Users explicitly requested the ability to login via Codex, indicating a desire for broader provider support or alternative authentication methods.
*   **Computer Use for Mac (PR #2805):** Recent PRs indicate active development on "Computer Use" features specifically for macOS, likely adding native OS control capabilities similar to Windows.
*   **External IM Support (Issue #417):** Users noted the lack of configuration options for international IMs, suggesting a roadmap item for expanding beyond domestic Chinese platforms.

## 7. User Feedback Summary
User sentiment is mixed, highlighting frustration with stability and configuration complexity:
*   **Performance Concerns:** Users comparing LobsterAI to other open-source agents (like Alibaba's) noted significantly slower processing speeds and failure rates in office tasks (e.g., PPT generation).
*   **Configuration Friction:** There is a strong demand for a "one-click" setup. Users are struggling with Cygwin, environment variables for API keys, and path validation.
*   **Data Privacy:** There is significant anxiety regarding data leakage (Issue #561), where user conversations appeared in other users' sessions, and path traversal risks (Issue #543).

## 8. Backlog Watch
*   **Security Vulnerability (Issue #543):** This high-severity issue regarding path traversal has **0 comments** and is currently **Open**. It requires immediate attention from the security team.
*   **Long-Standing IM Issues:** Several IM-related issues (like the disappearing API keys in Feishu) remain unresolved for months despite user persistence.
*   **Local Tooling:** The discrepancy between local and cloud tool execution (Issue #405) remains a key blocker for self-hosted users.

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

# CoPaw Project Digest
**Date:** 2026-10-07
**Project:** CoPaw (agentscope-ai/CoPaw)

## 1. Today's Overview
Activity remains stable with 6 total updates recorded in the last 24 hours (2 Issues, 4 PRs). The project is currently in a maintenance and enhancement phase, with no new releases scheduled. There is a healthy balance between bug fixes (watchdog recovery, OAuth2 persistence) and feature additions (provider capability templates). No critical alerts were raised today, indicating stable operational health.

## 2. Releases
**No new releases were published.**

## 3. Project Progress
While no PRs were merged or closed today, four active pull requests are advancing the project's stability and user experience:
*   **Console UX Improvements:** A PR (#7307) simplifies model management by chaining provider configuration directly into the model addition flow, reducing setup steps.
*   **Custom Provider Capabilities:** A PR (#6823) enhances custom OpenAI-compatible providers by auto-applying capability templates (e.g., multimodal support) based on model IDs.
*   **System Stability:** A PR (#8102) fixes a console boot failure issue where stale cache or network hiccups caused the application to hang, implementing a watchdog mechanism with a reload button.
*   **Security/Authentication:** A PR (#7066) fixes a bug where OAuth2 Authorization Code providers with rotating refresh tokens (e.g., XMind) failed to persist new tokens, causing connection drops.

## 4. Community Hot Topics
*   **Issue #7599 (Open):** Users are experiencing a "MissingSessionID" error when connecting to specific models (`omen-alpha`) in the OpenCode Go package.
    *   *Analysis:* This is a critical API integration issue that prevents specific model usage, likely stemming from a mismatch in header requirements or session management between the provider and the client.
    *   *Link:* [agentscope-ai/QwenPaw Issue #7599](https://github.com/agentscope-ai/QwenPaw/issues/7599)
*   **Issue #8114 (Open):** A feature request to add a parameter to control reasoning intensity for models like Qwen 3.8, which the user feels "thinks too much."
    *   *Analysis:* This highlights a need for fine-grained control over model behavior, likely related to parameters like temperature or specific "think silently" settings in the provider implementation.
    *   *Link:* [agentscope-ai/QwenPaw Issue #8114](https://github.com/agentscope-ai/QwenPaw/issues/8114)

## 5. Bugs & Stability
*   **Severity: Medium** - **MissingSessionID Error (Issue #7599)**
    *   **Description:** Users connecting to the "omen-alpha" model via the OpenCode Go package receive a 400 error with a `MissingSessionID` message.
    *   **Status:** Open, 4 comments. No fix PR found yet.
*   **Severity: Low** - **Console Hang on Boot (PR #8102)**
    *   **Description:** The console UI could hang indefinitely if cached assets failed to load (404) due to CDN issues.
    *   **Status:** Fixed via PR #8102 (Open, Under Review). The fix adds a watchdog to surface an error state and reload button.

## 6. Feature Requests & Roadmap Signals
*   **Reasoning Intensity Control (Issue #8114):** Users want to limit the "thinking" behavior of high-performance models (e.g., Qwen 3.8). This suggests the roadmap may need to include granular parameter tuning for advanced models to prevent excessive token usage or latency.
*   **Capability Templates (PR #6823):** The PR to auto-apply capabilities to custom providers indicates a focus on lowering the barrier for users to add their own model providers.

## 7. User Feedback Summary
User feedback is currently divided between stability and usability:
*   **Pain Point (Stability):** There is a recurring issue with specific model providers (OpenCode Go) returning malformed headers (MissingSessionID), causing immediate connection failures.
*   **Pain Point (Usability):** The workflow for adding models and configuring providers is perceived as too complex (requiring 5 steps), prompting a request for streamlining the UI.
*   **Praise (Implicit):** The ability to use custom providers is valued, as evidenced by the feature request to make these easier to configure with automatic capability detection.

## 8. Backlog Watch
*   **PR #7066 (Under Review):** Fixes OAuth2 refresh token persistence. This is crucial for long-term stability of external integrations (like XMind) and should be prioritized for merging.
*   **Issue #7599 (Open):** The MissingSessionID bug affects core functionality for a specific model provider. With 4 comments, it is gaining traction and requires urgent investigation from the maintainers.
*   **PR #7307 (Open):** A significant UX improvement. Merging this will improve the onboarding experience for new users.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest
**Date:** 2026-10-07
**Repository:** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. Today's Overview
The ZeroClaw project remains highly active, with 33 issues updated and 50 pull requests pushed to the repository in the last 24 hours. The project is currently in a maintenance and hardening phase, focusing on critical security fixes, sandbox stability, and configuration management. A significant portion of the activity is centered on "stacked PRs" (prerequisite commits) that aim to secure RPC admission and resource access, indicating a push to stabilize the core agent loop and runtime environment.

## 2. Releases
**No new releases detected.** The project is currently focusing on patching and feature implementation via pull requests rather than formal versioning.

## 3. Project Progress
*   **Stacked PRs for Auth & RPC Security:** Several large, stacked PRs (#11410, #11411, #11422, #11423) are being refined to harden authorization guards, particularly for Cron jobs, SOPs (Standard Operating Procedures), and RPC access. These commits are prerequisite steps for merging larger security updates.
*   **Windows Security Hardening:** PR #11451 addresses a specific Windows security risk by ensuring key files are created with restricted permissions, preventing unauthorized access during creation.
*   **Config & Path Validation:** A series of PRs (#11394, #11405, #11406) are addressing "broad root" filesystem access risks across Windows, Linux, and macOS to prevent privilege escalation via configuration files.
*   **Plugin Registry Fixes:** PR #11581 introduces timeout handling and bounds checking for plugin registry requests to prevent hangs and potential DoS scenarios during plugin discovery.

## 4. Community Hot Topics
The community is focused on **Sandbox Stability** and **Security**:
*   **Sandbox Backend Failures:** Users are reporting critical failures with `firejail` and `bubblewrap` sandboxes on Linux. Issues #11539, #11538, and #11540 detail specific command-line errors (`--nowheel`, `invalid private directory`) and detection failures that force a fallback to insecure application-layer execution (Risk: S0/S1).
*   **Configuration Data Loss:** A high-severity bug (#10495) was closed regarding `Config::save()` replacing populated config files with empty ones. A new issue (#11579) immediately surfaced related to schema versioning during dirty saves, indicating ongoing friction in the configuration lifecycle.

## 5. Bugs & Stability
*   **Sandbox Failures (Linux):**
    *   **Issue #11539 & #11538:** Firejail sandbox crashes with "invalid --nowheel" and "invalid private directory" errors. Status: Open.
    *   **Issue #11540:** Bubblewrap detection fails on Linux, falling back to insecure execution. Status: Open.
*   **ZeroCode TUI Spin:** ZeroCode (the TUI) consumes 100% CPU after terminal disconnection. Status: Open.
*   **Config Schema Migration:** `save_dirty` incorrectly stamps `schema_version = 3` on unmigrated V1/V2 configs, causing the agent to disappear on restart. Status: Open.

## 6. Feature Requests & Roadmap Signals
*   **Web UI Migration:** A long-running enhancement (#8132) seeks to evaluate a Rust/WASM web UI prototype to replace the React/Vite stack, though it remains in the evaluation phase.
*   **Multimodal Optimization:** Users are requesting batch eviction of images (#11166, PR #11582) to improve performance when exceeding per-request caps, rather than dropping images immediately.
*   **Opper Provider:** A new feature request (#11583) adds support for "Opper," an OpenAI-compatible gateway, allowing users to use a single key across multiple providers without markup.

## 7. User Feedback Summary
*   **Operational Risk:** Users are expressing high concern over the reliability of Linux sandboxing. The inability to use Firejail or Bubblewrap forces them into a less secure mode, blocking workflows.
*   **Configuration Friction:** The community is finding the configuration migration and save mechanisms fragile. The fear of losing 109KB of configuration data (Issue #10495) highlights the "live" nature of the project where operators run agents constantly.

## 8. Backlog Watch
*   **Stacked PRs:** The maintenance team is deep in the process of reviewing a complex stack of 4-5 PRs (#11410, #11411, #11422, #11423, #11408) that collectively fix RPC admission, OIDC credential handling, and SOP access guards. These are high-priority security fixes.
*   **WASM Migration:** The Web UI migration (#8132) has been pending for months and requires maintainer action to evaluate the Rust/WASM prototype before proceeding with a React/Vite replacement.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*