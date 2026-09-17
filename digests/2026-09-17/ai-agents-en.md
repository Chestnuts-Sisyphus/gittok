# OpenClaw Ecosystem Digest 2026-09-17

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-16 22:29 UTC

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

# NanoBot Project Digest — 2026-09-17

## 1. Today's Overview

NanoBot showed active maintenance-driven development over the last 24 hours, with **20 PR updates** (15 open, 5 closed/merged) and **5 issue updates** (4 open, 1 closed), but no release entries in the provided dataset.  
The work is heavily concentrated on reliability: session/message handling, cron scheduling, provider fallback, file-edit correctness, TUI responsiveness, and test hermeticity.  
One priority-1 fix is open, and several priority-2 bug fixes are pending review, suggesting active triage but not immediate completion.  
The most visible community discussions are around automatic reasoning-effort escalation and Dream consolidation iteration limits.  
Overall, the project appears healthy and responsive, with a clear backlog that needs maintainer attention on long-running features and high-impact agent-loop fixes.

---

## 2. Releases

No new releases were included in the provided dataset.  
A community issue references **v0.3.5**: [#5788 — Nanobot 0.3.5 released! Let's go!](https://github.com/HKUDS/nanobot/issues/5788), but no release notes, changelog, or migration data were available for this digest.  
Therefore, no breaking-change or migration analysis can be made from the provided data.

---

## 3. Project Progress

### Closed/merged PRs in the update window

- **[#5782 — fix(dream): enforce configured iteration limit](https://github.com/HKUDS/nanobot/pull/5782)**  
  Restores an independent `agents.defaults.dream.maxIterations` setting, with a default of 15, and applies it to manual and scheduled Dream runs.  
  Directly addresses the long-running Dream loop issue [#5781](https://github.com/HKUDS/nanobot/issues/5781).

- **[#5791 — fix(tui): keep input responsive during agent output](https://github.com/HKUDS/nanobot/pull/5791)**  
  Improves TUI responsiveness by draining gateway output in bounded FIFO batches and pausing output draining while IME-delayed submit logic reads and clears the composer.  
  This should reduce input starvation during active agent output.

- **[#5756 — test(security): keep proxy-clearing fixtures hermetic on hosts with OS-level proxies](https://github.com/HKUDS/nanobot/pull/5756)**  
  Strengthens SSRF/proxy test reliability by making proxy-clearing fixtures robust on hosts with system-level proxy configuration outside environment variables.  
  This is a test-infrastructure and security-QA improvement rather than a user-facing feature.

- **[#5789 — docs: refresh README WebUI screenshots](https://github.com/HKUDS/nanobot/pull/5789)**  
  Refreshes README WebUI gallery to match current frontend behavior, including new-topic composer, workbench panes, context usage/cache reuse, MCP catalog, and Automations calendar.  
  Improves onboarding clarity and product documentation.

- **[#2595 — refactor: rename tool progress text variable for clarity](https://github.com/HKUDS/nanobot/pull/2595)**  
  Closed PR for a small readability refactor in the tool-progress path.  
  Because it is labeled `[conflict]`, its final merged state should be treated as uncertain from this data alone.

### In-flight work

A large portion of the open PR queue is stability-focused, including agent-loop session serialization, cron scheduling validation, provider fallback hardening, file-tool correctness, and cross-session response delivery. This indicates the project is currently prioritizing correctness and reliability over new major features.

---

## 4. Community Hot Topics

### Most active issues/PRs by visible engagement

1. **[#4419 — Feature: Automatic reasoning effort escalation](https://github.com/HKUDS/nanobot/issues/4419)**  
   - Status: Open  
   - Comments: 5  
   - Created: 2026-06-20  
   - Updated: 2026-09-16  
   - Summary: Requests automatic escalation between default and elevated reasoning-effort levels for providers that expose a reasoning-depth parameter.  
   - Underlying need: Users want smarter, adaptive inference behavior that can increase “thinking” effort when a task appears harder, without manually tuning every provider/session. This is likely a quality/cost/latency optimization feature.

2. **[#5781 — Dream runs for 1–2 h looping on the same read_file calls](https://github.com/HKUDS/nanobot/issues/5781)**  
   - Status: Open  
   - Comments: 3  
   - Created: 2026-09-15  
   - Updated: 2026-09-16  
   - Related fix: [#5782](https://github.com/HKUDS/nanobot/pull/5782)  
   - Underlying need: Scheduled consolidation jobs must be bounded, predictable, and configurable. Users are sensitive to runaway agent loops, especially for background or scheduled work.

3. **[#5731 — Add AnySearch extract as a web_fetch backend](https://github.com/HKUDS/nanobot/issues/5731)**  
   - Status: Open  
   - Comments: 1  
   - Created: 2026-09-11  
   - Updated: 2026-09-16  
   - Underlying need: More robust web-content extraction for agents, potentially with lower-friction provider options such as optional API keys and anonymous quotas.

4. **[#5788 — Nanobot 0.3.5 released! Let's go!](https://github.com/HKUDS/nanobot/issues/5788)**  
   - Status: Open  
   - Comments: 0  
   - Underlying signal: Version announcements are being tracked in issues, not only the Releases page. This may indicate community awareness is partly driven by issue activity.

### Engagement note

PR comment counts were not provided in the dataset (`undefined`), so “hot” items are ranked primarily by issue comment counts and severity/recency of related PRs.

---

## 5. Bugs & Stability

Ranked by apparent severity based on priority labels, regression tags, and user-impact potential.

### 1. High severity — agent session/message serialization

- **[#5792 — fix(agent): serialize and batch per-session messages](https://github.com/HKUDS/nanobot/pull/5792)**  
  - Priority: p1  
  - Status: Open  
  - Impact: Session workers, dispatch tasks, and bus re-publication could race, causing message ordering or delivery problems.  
  - Fix status: Open PR.  
  - This is the most important open stability item in the provided data.

### 2. High severity — cross-session response delivery

- **[#5794 — fix: cross-session response delivery in agent loop](https://github.com/HKUDS/nanobot/pull/5794)**  
  - Priority: p2  
  - Status: Open  
  - Impact: A response intended for Session A may appear in Session B when the user switches sessions quickly.  
  - Fix status: Open PR.  
  - Direct user-facing reliability issue.

### 3. Medium-high — cron one-time schedules can silently never fire

- **[#5762 — fix(cron): reject past one-time schedules in the cron tool](https://github.com/HKUDS/nanobot/pull/5762)**  
  - Priority: p2  
  - Status: Open  
  - Impact: Past `at` values are accepted and reported as successful, but the job may never fire because `next_run_at_ms` remains unset.  
  - Fix status: Open PR.  
  - This is a silent-failure bug in scheduled execution.

### 4. Medium-high — conflicting cron schedule fields are silently discarded

- **[#5766 — fix(cron): reject conflicting schedule fields](https://github.com/HKUDS/nanobot/pull/5766)**  
  - Priority: p2  
  - Status: Open  
  - Impact: If a caller provides multiple mutually exclusive schedule fields (`every_seconds`, `cron_expr`, `at`), the tool may silently pick one and discard the rest.  
  - Fix status: Open PR.  
  - Reduces unexpected job behavior and improves input validation.

### 5. Medium — OpenAI-compatible `stream` truthiness bug

- **[#5765 — fix(api): require boolean stream values](https://github.com/HKUDS/nanobot/pull/5765)**  
  - Priority: p2  
  - Status: Open  
  - Impact: A JSON string like `"stream": "false"` can be treated as truthy, causing unintended SSE mode.  
  - Fix status: Open PR.  
  - API-compatibility and client-integration issue.

### 6. Medium — recursive `list_dir` can falsely report directories as empty

- **[#5793 — fix(tools): scope recursive directory ignores to listed root](https://github.com/HKUDS/nanobot/pull/5793)**  
  - Priority: p2  
  - Status: Open  
  - Impact: Recursive listing may hide valid files if the requested path or a parent directory is named `build`, `dist`, or another ignored entry.  
  - Fix status: Open PR.  
  - Affects agent file exploration accuracy.

### 7. Medium — `edit_file` whitespace and indentation regressions

- **[#5796 — fix(tools): preserve separator whitespace in inline replacements](https://github.com/HKUDS/nanobot/pull/5796)**  
  - Priority: p2  
  - Status: Open  
  - Impact: Inline replacements may join adjacent tokens and change code/content meaning.

- **[#5795 — fix(tools): preserve indentation in newline-terminated fallback edits](https://github.com/HKUDS/nanobot/pull/5795)**  
  - Priority: p2  
  - Status: Open  
  - Impact: Fallback edits may lose indentation and insert an extra blank line.

  Both indicate ongoing correctness work in the file-editing tool path.

### 8. Medium — provider fallback and timeout handling

- **[#5769 — fix(providers): fail over on NIM-style timeout errors](https://github.com/HKUDS/nanobot/pull/5769)**  
  - Priority: p2  
  - Status: Open  
  - Impact: Some provider timeout errors are not classified as retryable or failover-worthy because they appear in exception message text rather than class names.

- **[#5764 — fix(provider): serialize half-open fallback probes](https://github.com/HKUDS/nanobot/pull/5764)**  
  - Priority: p2  
  - Status: Open  
  - Impact: Concurrent requests may all hit a recovering primary provider before one probe completes, weakening the half-open fallback logic.

  These are important for multi-provider reliability.

### 9. Medium — memory consolidation input preservation

- **[#5379 — fix(memory): preserve full consolidation input](https://github.com/HKUDS/nanobot/pull/5379)**  
  - Priority: p2  
  - Status: Open  
  - Impact: Public raw-fallback characters may be lost across bounded `history.jsonl` entries before consolidation pointers advance.  
  - Fix status: Open PR.  
  - Relevant to long-term memory correctness.

### 10. Medium — subagent partial completion signaling

- **[#5152 — fix(subagent): mark partial completion results](https://github.com/HKUDS/nanobot/pull/5152)**  
  - Status: Open  
  - Impact: Background sibling tasks that still owe completion messages may leave parent-turn state unclear.  
  - Fix status: Open PR.  
  - Affects multi-agent/subagent execution clarity.

### Resolved or mitigated in this window

- **Dream iteration runaway**: addressed by closed PR [#5782](https://github.com/HKUDS/nanobot/pull/5782), related to issue [#5781](https://github.com/HKUDS/nanobot/issues/5781).  
- **TUI input starvation**: addressed by closed PR [#5791](https://github.com/HKUDS/nanobot/pull/5791).  
- **Proxy test flakiness on OS-level proxy hosts**: addressed by closed PR [#5756](https://github.com/HKUDS/nanobot/pull/5756).

---

## 6. Feature Requests & Roadmap Signals

### Most likely roadmap candidates

1. **Automatic reasoning-effort escalation**  
   - Issue: [#4419](https://github.com/HKUDS/nanobot/issues/4419)  
   - Signal: Long-running, relatively high comment activity, and aligned with provider capabilities.  
   - Likely next-version candidate if maintainers want to improve adaptive reasoning cost/quality without manual configuration.

2. **OpenRouter native image generation API support**  
   - PR: [#5718](https://github.com/HKUDS/nanobot/pull/5718)  
   - Signal: Extends `generate_image` compatibility and exposes more image-generation models through OpenRouter.  
   - Likely to advance if multimodal/image-generation support is a priority.

3. **Langfuse tracing for Codex**  
   - PR: [#5520](https://github.com/HKUDS/nanobot/pull/5520)  
   - Signal: Observability improvement for a provider that previously lacked tracing.  
   - Useful for debugging, cost tracking, and production monitoring.

4. **Signed direct delivery webhook**  
   - PR: [#5652](https://github.com/HKUDS/nanobot/pull/5652)  
   - Signal: Enables deterministic notifications from trusted systems such as CI, monitoring, and billing services without invoking the agent loop.  
   - Security-sensitive but potentially high-value for automation integrations.

5. **AnySearch extract as a `web_fetch` backend**  
   - Issue: [#5731](https://github.com/HKUDS/nanobot/issues/5731)  
   - Signal: Vendor-driven integration request for real-time search/extraction.  
   - May be considered if web-fetch reliability and provider diversity are priorities, but likely subject to review for dependency and quota implications.

### Likely inclusion in the next release

If the currently open fixes are merged, the next release could include:

- Agent-loop session serialization and batching.
- Cross-session response delivery fixes.
- Cron schedule validation for past and conflicting schedules.
- Strict boolean handling for OpenAI-compatible `stream`.
- `edit_file` whitespace and indentation fixes.
- Provider timeout classification and half-open fallback serialization.
- TUI responsiveness and documentation updates already closed in this window.

---

## 7. User Feedback Summary

### Positive signals

- Active bug-fix throughput: 20 PR updates in 24 hours.
- Rapid response to Dream iteration-limit complaints: issue [#5781](https://github.com/HKUDS/nanobot/issues/5781) and fix PR [#5782](https://github.com/HKUDS/nanobot/pull/5782).
- Documentation and WebUI screenshot updates: [#5789](https://github.com/HKUDS/nanobot/pull/5789).
- Security/QA hardening: [#5756](https://github.com/HKUDS/nanobot/pull/5756).
- Release enthusiasm: [#5788](https://github.com/HKUDS/nanobot/issues/5788).

### Main pain points

- **Background jobs can run too long**: Dream consolidation loops for 1–2 hours and repeatedly reads the same files.  
  Source: [#5781](https://github.com/HKUDS/nanobot/issues/5781)

- **Session switching can cause cross-session response leakage or ordering issues**:  
  Sources: [#5794](https://github.com/HKUDS/nanobot/pull/5794), [#5792](https://github.com/HKUDS/nanobot/pull/5792)

- **Cron scheduling has silent edge-case failures**: past one-time schedules and conflicting schedule fields.  
  Sources: [#5762](https://github.com/HKUDS/nanobot/pull/5762), [#5766](https://github.com/HKUDS/nanobot/pull/5766)

- **File-edit tool can subtly damage code/content**: whitespace and indentation regressions.  
  Sources: [#5796](https://github.com/HKUDS/nanobot/pull/5796), [#5795](https://github.com/HKUDS/nanobot/pull/5795)

- **Provider resilience is still a concern**: timeout classification and fallback probe concurrency.  
  Sources: [#5769](https://github.com/HKUDS/nanobot/pull/5769), [#5764](https://github.com/HKUDS/nanobot/pull/5764)

- **API compatibility details matter to integrators**: `stream` should require a boolean.  
  Source: [#5765](https://github.com/HKUDS/nanobot/pull/5765)

### Use cases observed

- Multi-session chat with rapid session switching.
- Scheduled Dream consolidation and memory management.
- Multi-provider LLM failover.
- TUI-based local interaction.
- WebUI usage and onboarding.
- CI/monitoring/billing-style deterministic notifications.
- Provider tracing/observability.
- Web search/fetch and image generation integrations.

### Satisfaction/dissatisfaction assessment

Maintainers appear responsive to stability issues, with multiple open PRs addressing reported bugs.  
The main dissatisfaction areas are reliability edge cases: silent cron failures, cross-session message handling, runaway Dream loops, and file-editing correctness.

---

## 8. Backlog Watch

### Long-unanswered or high-attention items

1. **[#

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest for 2026-09-17

## Today's Overview
PicoClaw, an AI agent open-source project, has been inactive since 2026-08-22. The last PRs were closed on 2026-09-16. There are no new releases today.

## Releases
No new versions exist.

## Project Progress
Today, there are 4 merged/closed PRs. The advanced features include adding a Build Remote Agent pairing device adapter so a phone can spectate this desktop agent, fixing the retry after being disconnected issue, and improving the stability of QQ channel connections.

## Community Hot Topics
The most active issues are #3343 (Tool feedback animation can edit a Telegram message indefinitely after a failed turn), #3357 (Treat replies to the bot's own messages as implicit mentions), and #1780 (Qq connection stability). Comments range from 4 to 9. The underlying need is for better tool feedback handling and improved Telegram message editing capabilities.

## Bugs & Stability
There were no bugs or crashes reported today. However, one regression was reported: "fix(telegram): treat replies to the bot's own messages as implicit mentions". A fix PR exists to address this issue.

## Feature Requests & Roadmap Signals
Users have requested improvements in tool feedback handling and Telegram message editing capabilities. It is predicted that these requests might be addressed in subsequent versions.

## User Feedback Summary
Real user pain points include long waiting times during tool feedback animations and unintuitive behaviors in Telegram messaging. Use cases include remote agent pairing and improving QQ channel connection stability. Satisfaction levels vary, with some users finding the improvements helpful while others remain frustrated.

## Backlog Watch
There are several important issues and PRs that require maintainer attention. These include #3343, #3357, and #1780, which need to be resolved urgently due to their impact on user experience and functionality.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw Project Digest – 17 Sept 2026**  

---

### 1. Today’s Overview  
- Activity on the repository was minimal: a single issue was closed and there were no new pull‑requests or releases.  
- The closed issue signals interest in extending NullClaw’s mobile capabilities by borrowing the architecture of the **litter** client (Swift/Kotlin UI over a shared Rust core).  
- With no fresh code contributions, the code‑base remains stable, but the discussion hints at a potential new platform target that could drive future development.  

---

### 2. Releases  
*No new releases were published in the last 24 h.*  

---

### 3. Project Progress  
- **Closed Issues:** #999 (see “Community Hot Topics”) – the only change today, indicating the team has finished a feasibility review on a mobile‑client concept.  
- **Merged/Closed PRs:** None.  

---

### 4. Community Hot Topics  

| # | Title / Summary | Status | Comments | 👍 Reactions | Link |
|---|-----------------|--------|----------|--------------|------|
| **999** | *Explore forking litter’s mobile GUI into human‑guard‑rail as a NullClaw client* – a feasibility study on re‑using the **litter** iOS/Android UI stack for the **human‑guard‑rail** project. | **Closed** (today) | 1 | 0 | https://github.com/nullclaw/nullclaw/issues/999 |

**Analysis:**  
- The issue reflects a clear community desire to bring NullClaw to mobile devices, leveraging an existing thin‑UI + Rust‑core pattern that has proven successful in the **litter** project.  
- Closing the issue suggests the maintainers either concluded the approach is viable and will be pursued later, or determined it is out of scope for the current roadmap. In either case, the topic is the only active discussion and therefore the primary “hot” item today.  

---

### 5. Bugs & Stability  

| Severity | Description | Reported In | Fix / PR Status |
|----------|-------------|-------------|-----------------|
| — | No bugs, crashes, or regressions were reported in the last 24 h. | — | — |

*Conclusion:* The absence of bug reports aligns with the lack of new code changes, indicating a stable snapshot of the project.

---

### 6. Feature Requests & Roadmap Signals  

| Request | Origin | Potential Impact | Likelihood of Inclusion |
|---------|--------|------------------|--------------------------|
| Mobile client (Swift/Kotlin UI + shared Rust core) for **human‑guard‑rail** | Issue #999 (community) | Extends NullClaw to iOS/Android, opens new user base, aligns with cross‑platform strategy | **Medium‑High** – the feasibility study was just completed, making it a plausible candidate for the next major roadmap milestone. |

No other new feature requests surfaced today.

---

### 7. User Feedback Summary  

- **Pain Point:** Lack of an official mobile interface; users want to interact with NullClaw from smartphones or tablets.  
- **Use Case Highlighted:** Developers of the **human‑guard‑rail** Android app are looking for a ready‑made UI layer that can communicate with NullClaw’s Rust core, reducing duplication of effort.  
- **Overall Sentiment:** Positive – the community is proactive in proposing reusable architectures rather than demanding ad‑hoc fixes.  

---

### 8. Backlog Watch  

| # | Title | Age | Status | Why It Needs Attention |
|---|-------|-----|--------|------------------------|
| *None* – the repository currently has only the closed issue #999 in the backlog. | — | — | — | — |

*Observation:* With only one issue and no pending PRs, the backlog is effectively empty today. However, the team should monitor upcoming mobile‑client proposals, as they may generate new tickets (e.g., design discussions, platform‑specific bugs) that will quickly populate the backlog.  

---

**Overall Health Assessment:**  
NullClaw’s repository shows a quiet but stable state. The sole activity—closing a feasibility issue for a mobile client—indicates strategic interest in expanding platform coverage. No regressions or open bugs suggest the current code is reliable, while the community’s focus on mobile reuse points to a clear next direction for the project. Maintaining visibility on this emerging mobile effort will be key to keeping momentum and attracting contributions.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>



# LobsterAI Project Digest — 2026-09-17

---

## 1. Today's Overview

LobsterAI experienced an exceptionally active 24-hour window with **9 issues closed** and **18 PRs merged**, all resolved within a single day. The project shows strong developer velocity, with the majority of activity centered on resolving concurrency and race-condition bugs in the IM handler, scheduled task engine, and CoworkRunner. Three user-facing feature requests were also fully implemented, alongside several stability improvements to OpenClaw startup and agent repair flows. No new releases were published today, but the volume of merged work suggests a significant cumulative improvement cycle is underway.

---

## 2. Releases

No new releases were published today.

---

## 3. Project Progress

All 18 merged/closed PRs today span three key tracks:

### Concurrency & Stability Fixes
- **#1090** — Added per-session execution serialization to `CoworkRunner` (`startSession`/`continueSession`), preventing stream corruption and message duplication.
- **#1100** — Introduced a per-conversation async mutex in `IMCoworkHandler.processMessage()` to eliminate duplicate session creation on concurrent IM messages.
- **#1108** — Fixed `CronJobService.pollOnce()` with a `pollInFlight` flag and `pollGeneration` counter, preventing re-entrant concurrent polling and ghost events after `stopPolling()`.
- **#1101** — Fixed a cross-provider model-switch race condition where `configService.updateConfig()` was called with a discarded Promise, allowing messages to be sent during gateway restart.
- **#1127** — Fixed MCP `stop()` not cancelling its 2-second force-close timer, which was accidentally closing newly created server connections.

### OpenClaw Startup & Repair
- **#2689** — Added a prepare-startup compatibility mode that backs up and migrates the OpenClaw SQLite state schema before repair operations.
- **#2690** — Added repair snapshot rollback with per-stage failure tracking (preparation/snapshot/doctor/configuration/gateway) and agent media migration handling.
- **#2688** — Bypassed LobsterAI proxy credential cooldowns to prevent upstream auth failures from blocking other LobsterAI models for five hours.
- **#1113** — Added deferred config sync flush when gateway workloads drain, reducing interrupted config reloads during active cowork turns.

### UX & Feature Additions
- **#1119** — Added keyboard shortcuts (Enter to approve, Escape to deny) to the `CoworkPermissionModal`, with destructive operations blocking Enter.
- **#1121** — Added a one-click Retry banner on error-state Cowork sessions, auto-extracting the last user message for re-sending.
- **#1125** — Extended session search to include full-text message content search with keyword highlighting and smart摘要 previews.
- **#1138** — Added red highlighting for tool errors and a "jump-to-latest" button in the Cowork session view.
- **#1122** — Fixed unexplained top/bottom whitespace in table rendering by removing Tailwind margin overrides.
- **#1106** — Fixed DingTalk scheduled task IM notification routing caused by passing prefixed `rawTo` instead of stripped `delivery.to` to `primeConversationReplyRoute()`.
- **#1103** — Added a read-only Docker daemon readiness probe for sandbox tool execution detection.
- **#1102** — Added hover tooltips to the scheduled task enable/disable toggle for both English and Chinese locales.

---

## 4. Community Hot Topics

| Item | Type | Comments | 👍 | Link |
|------|------|----------|-----|------|
| #1112 — Table whitespace bug | Issue | 3 | 0 | [Issue #1112](https://github.com/netease-youdao/LobsterAI/issues/1112) |
| #1099 — IM message concurrency | Issue | 2 | 0 | [Issue #1099](https://github.com/netease-youdao/LobsterAI/issues/1099) |
| #1105 — DingTalk notification routing | Issue | 2 | 0 | [Issue #1105](https://github.com/netease-youdao/LobsterAI/issues/1105) |
| #1107 — Scheduled task re-entrancy | Issue | 2 | 0 | [Issue #1107](https://github.com/netease-youdao/LobsterAI/issues/1107) |
| #1117 — Keyboard shortcuts for modal | Issue | 2 | 0 | [Issue #1117](https://github.com/netease-youdao/LobsterAI/issues/1117) |
| #1120 — Retry button for error sessions | Issue | 2 | 0 | [Issue #1120](https://github.com/netease-youdao/LobsterAI/issues/1120) |
| #1139 — Agent rename task record issue | Issue | 2 | 0 | [Issue #1139](https://github.com/netease-youdao/LobsterAI/issues/1139) |

**Analysis:** No issue or PR today accumulated significant reactions or comments — all items had 0–3 comments and zero likes. However, the *breadth* of closed issues is notable: concurrency bugs (IM, CoworkRunner, scheduled tasks) dominate the concern landscape, indicating users are actively relying on LobsterAI for real-time, multi-message workflows where race conditions directly impact reliability. The feature requests (#1117, #1120) being rapidly implemented suggests the team is responsive to developer-experience pain points.

---

## 5. Bugs & Stability

All 9 reported bugs/features were closed today. Ranked by inferred severity:

| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| 🔴 Critical | #1099 | IM message concurrency causes duplicate sessions and lost responses | #1100 |
| 🔴 Critical | #1090 (related) | CoworkRunner race condition corrupts streamed messages | #1090 |
| 🟠 High | #1107 | `pollOnce()` re-entrancy + ghost events after stop | #1108 |
| 🟠 High | #1105 | DingTalk scheduled task notifications never delivered due to routing prefix bug | #1106 |
| 🟠 High | #1101 (related) | Cross-provider model switch causes "model service call failed" error | #1101 |
| 🟡 Medium | #1130 (related) | Anthropic SSE streaming data loss on chunk boundary splits | #1130 |
| 🟡 Medium | #1096 | MD-to-PDF conversion opens stray browser tabs and shows membership modal | — (no PR listed) |
| 🟡 Medium | #1124 | App reports "cannot close" during update even after user quit | — (no PR listed) |
| 🟡 Medium | #1139 | Renamed agent shows stale task records until manual tab switch | — (no PR listed) |
| 🟢 Low | #1112 | Unexplained top/bottom whitespace in Table component | #1122 |

**Note:** Issues #1096, #1124, and #1139 were closed but no corresponding fix PR appears in today's merged list — these may have been resolved via manual intervention or a separate unlisted PR.

---

## 6. Feature Requests & Roadmap Signals

Three user-requested features were fully implemented today, signaling where the product team is prioritizing:

| Feature | Issue | PR | Signal |
|---------|-------|----|--------|
| Keyboard shortcuts for tool permission modal | #1117 | #1119 | Developer-experience focus; supports keyboard-driven coding workflows |
| One-click Retry on error sessions | #1120 | #1121 | Error recovery UX — reduces friction after transient failures |
| Full-text session search with highlighting | #1125 (PR) | #1125 | Scalability — as session history grows, discoverability becomes critical |

**Predicted next-version additions** based on today's trajectory:
- Expanded keyboard navigation support across Cowork UI components
- Improved error recovery patterns (Retry may expand to other failure states)
- Session history search enhancements (e.g., date filtering, tag-based search)
- Continued OpenClaw startup hardening (more repair-stage visibility expected)

---

## 7. User Feedback Summary

### Pain Points Expressed
1. **Race conditions break workflows** — Users report duplicate IM sessions, lost messages, and model call failures after provider switches, indicating LobsterAI is being used in production-like, high-concurrency scenarios.
2. **DingTalk integration fragility** — Scheduled task notifications not reaching users due to a routing prefix bug suggests enterprise IM integrations need more rigorous testing.
3. **Error recovery is painful** — Before the Retry feature, users had to manually copy prompts, create new sessions, and re-paste — a high-friction recovery path.
4. **Search is limited to titles** — Users with long session histories couldn't find conversations by content, a clear scaling problem.
5. **Update process is confusing** — The "Lobster AI无法关闭" error during installation, even after the app is quit, creates user confusion.

### Satisfaction Signals
- Rapid response time: all 9 issues closed within the same day they were highlighted.
- Feature requests (#1117, #1120) shipped within the same cycle — strong signal of user-driven development.
- The `CoworkPermissionModal` keyboard shortcut (Enter/Escape with destructive-operation guards) shows attention to detail for power users.

---

## 8. Backlog Watch

No open issues remain in today's batch — all 9 were closed. However, the following items warrant continued monitoring:

| Item | Concern |
|------|---------|
| #1096 — MD-to-PDF conversion | Closed with no associated PR in today's list. May have been resolved externally; worth verifying the underlying online conversion service dependency is fully addressed. |
| #1124 — "Cannot close" during update | Closed without an identified fix PR. Likely a packaging or process-management issue that may recur. |
| #1139 — Agent rename task records | Closed without a listed PR. The root cause (stale session mapping on rename) may resurface in edge cases. |

**Overall project health: 🟢 Strong.** The team demonstrated high throughput with zero open issues, zero open PRs, and a balanced mix of critical bug fixes and UX improvements. The concurrency-focused fixes suggest the platform is maturing beyond early-stage instability into production-readiness territory.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest - 2026-09-17**

**1. Today's Overview**
Moltis activity remains low to moderate on September 17, 2026, with 5 total repository updates reported over the last 24 hours. The development team is actively maintaining the codebase through a balanced mix of bug fixes and architectural improvements, specifically targeting sandbox security and build performance. Current engagement suggests the project is stabilizing core functionality while preparing for more complex feature deployments in subsequent updates.

**2. Releases**
No new releases were published in the last 24 hours.

**3. Project Progress**
Two Pull Requests were closed (merged/closed) recently, focusing on user interaction and build optimization. PR #926 was merged, introducing new slash commands (`/btw`, `/fast`, `/insights`, `/steer`, `/queue`) and auxiliary model configurations to enhance agent control. Additionally, PR #1270 was merged to optimize image build times by implementing Cargo caching across Docker layers, significantly reducing rebuild times for the workspace.

**4. Community Hot Topics**
The most active discussion currently surrounds the reliability of the Model Context Protocol (MCP) connection. Issue #1271 is the only open item with activity, reporting that remote MCP servers failing at startup are never retried and that lost sessions disrupt all subsequent calls. This highlights a critical need for resilient connection handling in the gateway layer.

**5. Bugs & Stability**
One significant bug was closed yesterday, resolving a failure to run agents in the sandbox environment after a node was added (Issue #1246). While the specific fix details are not visible in the data, the closure indicates a successful resolution to a sandbox stability issue. Conversely, Issue #1271 remains open, flagging a stability regression where the system fails to recover from MCP server crashes.

**6. Feature Requests & Roadmap Signals**
Upcoming features in the PR pipeline suggest a focus on granular security controls and build efficiency. PR #1272 proposes adding per-agent sandbox configurations, including forced sandboxing (`sandbox.force`) and specific user ID bindings (`sandbox.run_as`), which points toward stricter isolation and security hardening for multi-tenant environments.

**7. User Feedback Summary**
Users are expressing frustration with the fragility of long-running agent sessions. The report from Issue #1271 indicates that users rely on continuous operation; therefore, a failure to reconnect to a remote MCP server results in a total loss of function rather than a graceful degradation or retry mechanism. This points to a user desire for fault tolerance in remote agent connections.

**8. Backlog Watch**
Long-term issues and PRs exist that require maintainer attention. Issue #1246, though closed, has been open since August 28, indicating a delay in resolution. Furthermore, PR #926, which added new slash commands, has been open since April 29, suggesting a backlog of features waiting for integration.

---
*Data Source: GitHub (moltis-org/moltis)*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest
**Date:** 2026-09-17  
**Repository:** agentscope-ai/CoPaw (QwenPaw)

---

## 1. Today's Overview
QwenPaw (CoPaw) demonstrates robust activity with 25 open issues and 36 PR updates in the last 24 hours, signaling a healthy project momentum. The community is actively transitioning toward a multi-tenant architecture with the upcoming QwenPaw Hub 2.2.0, while simultaneously addressing critical stability concerns regarding memory exhaustion, console stream failures, and desktop startup behaviors. The project maintains a balance between foundational infrastructure fixes and feature enhancements, including real-time voice chat and advanced memory plugins.

---

## 2. Releases
**None**  
*No new releases were published in the last 24 hours. The latest versions referenced in issues are 2.2.0 and 2.2.1.*

---

## 3. Project Progress
**Merged/Closed PRs:** 12 (Closed: 12)  
**Open PRs:** 24  

**Key Advancements:**
*   **Infrastructure & Stability:** Multiple PRs addressed critical stability issues, including a fix to suppress EIO/EPIPE errors after detached TTY (PR #6569), a fix to match settings menu font weight (PR #7805), and a fix to enable shell evasion checks by default (PR #7120).
*   **Memory & Workflows:** A long-standing PR for memory distillation with title-diffing (PR #4171) was merged. Additionally, PR #7760 fixed CLI shutdown logic to allow memory jobs to drain properly.
*   **Feature Development:** Work continues on advanced features such as the QwenPaw-Data app 0.3.0 (PR #7637) and real-time voice chat integration (PR #7785).

---

## 4. Community Hot Topics
*   **QwenPaw Hub Multi-tenant Roadmap (#7318)**
    *   **Status:** Open Discussion (29 comments)
    *   **Link:** [agentscope-ai/QwenPaw Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)
    *   **Analysis:** This is the most discussed topic, indicating a strong community desire for team-based deployment capabilities. Users are actively brainstorming what features the "Hub" should prioritize next, showing high engagement and ownership of the project's evolution.
*   **Memory Exhaustion & Resource Management (#7722)**
    *   **Status:** Open Bug (5 comments)
    *   **Link:** [agentscope-ai/QwenPaw Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)
    *   **Analysis:** Users are reporting severe memory leaks compounded by unbounded stream buffers and stacking keep-alive instances. This is a high-severity operational issue affecting Docker deployments.
*   **Console Stream Robustness (#7814, #7813)**
    *   **Status:** Open Bugs (2 comments each)
    *   **Links:** [Issue #7814](https://github.com/agentscope-ai/QwenPaw/issues/7814) | [Issue #7813](https://github.com/agentscope-ai/QwenPaw/issues/7813)
    *   **Analysis:** The frontend Console is experiencing instability with Server-Sent Events (SSE) handling, specifically regarding malformed `null` payloads freezing the stream. This impacts the user experience of real-time chat interactions.

---

## 5. Bugs & Stability
**Ranked by Severity:**

1.  **Critical: Memory Exhaustion (Issue #7722)**
    *   **Description:** Container memory fills at ~1MB/s, causing OOM (Out of Memory) errors. The bug is identified as having three compounding paths: unbounded stream buffers, keep-alive instance stacking, and a "doom-loop" gate evasion.
    *   **Status:** Open. No specific fix PR linked yet, though it relates to the broader resource management issues being discussed.
2.  **High: Console Navigation Failure (Issue #7815)**
    *   **Description:** The Console UI does not recover from a failed lazy page load. Every navigation attempt stays on the error screen, requiring a full page reload to function.
    *   **Status:** Open.
3.  **Medium: Desktop Startup Slash Commands (Issue #7812)**
    *   **Description:** Slash commands typed immediately after desktop startup act on a "fallback session" rather than the visible conversation, causing confusing behavior.
    *   **Status:** Open.
4.  **Medium: Desktop App Font Weight Mismatch (PR #7805)**
    *   **Description:** A UI cosmetic bug where the settings menu font weight does not match the rest of the interface.
    *   **Status:** Closed (Fixed).

---

## 6. Feature Requests & Roadmap Signals
*   **Multi-Tenant Architecture (Issue #7318):** The roadmap is clearly shifting toward enterprise/team use cases. The "QwenPaw Hub" is a major initiative.
*   **Chat Mode Selector (Issue #7801):** Users request a dedicated "Discuss vs Execute" mode selector to prevent agents from automatically running file edits or deployments when the user just wants to brainstorm.
*   **i18n for Tool Guard (Issue #7809):** Users want the security approval cards for dangerous tools (like shell execution) to support internationalization (i18n), specifically mentioning Chinese language support.
*   **Output Optimization (Issue #7797):** Users request the ability to filter outputs to show only final artifacts and remove intermediate/temporary files to reduce clutter in the project directory.

---

## 7. User Feedback Summary
**Satisfaction:** Mixed. While the project is feature-rich and active, users are expressing frustration with stability in version 2.2.x.
*   **Operational Pain:** High. Users are experiencing crashes, memory leaks, and UI freezes (Console issues, startup behavior).
*   **Usability Frustrations:** Users feel the "Creator" plugin lacks manual controls (Issue #7693) and that the output directory management is chaotic (Issue #7797).
*   **Feature Desires:** There is a strong demand for better team management (Hub) and clearer separation between "thinking" and "doing" modes.

---

## 8. Backlog Watch
*   **Issue #7722 (Memory Exhaustion):** A complex bug with three compounding paths affecting production deployments. Needs immediate architectural review.
*   **Issue #7318 (Hub Multi-tenant):** A massive discussion thread that has evolved into a roadmap planning session. Maintainers should likely consolidate this into a formal roadmap document or a milestone.
*   **PR #7785 (Realtime Voice):** A significant feature addition that, if merged, would expand the toolset beyond text-based interaction.
*   **Issue #7815 (Console Navigation):** A persistent frontend bug affecting all navigation attempts, impacting core daily usability.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**Project Digest: ZeroClaw (zeroclaw-labs/zeroclaw)**
**Date:** 2026-09-17
**Analyst:** AI Agent Analyst

### 1. Today's Overview
ZeroClaw activity remains robust, with 18 new issues and 50 pull requests opened in the last 24 hours. While no new releases were published, the project is in a state of active maintenance and stabilization, focusing heavily on fixing multimodal image handling bugs and enhancing the ZeroCode user interface. The volume of "in-progress" issues suggests a healthy backlog of features being actively developed, though a few critical bugs involving vision capabilities and CI stability require immediate attention.

### 2. Releases
**None.** No new releases were published in the last 24 hours.

### 3. Project Progress
*   **Multimodal Fixes:** Two significant PRs (#10903 and #10904) were opened to address the handling of images in tool results and vision provider gates. These aim to fix the "disappearing images" bug and the "marker-shaped prose" failure mentioned in the issue tracker.
*   **ZeroCode Enhancements:** Development continues on the ZeroCode interface, with PRs addressing manual context compaction (#10905) and standardizing text editing (composer) features (#10909).
*   **Security & Auth:** The Anthropic OAuth support (PR #9420) and OIDC token verification (PR #10255) remain active, indicating ongoing work to secure provider authentication.
*   **CI/CD Improvements:** PR #10896 fixed CI runner label pinning to prevent flaky test environments.

### 4. Community Hot Topics
*   **[Bug] Image Disappears After Tool Call (#10885):** Users report that images returned by a tool are lost if another unrelated tool is called in the same turn. **[Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10885)**
*   **[Enhancement] Anthropic OAuth Alias Contract (#9464):** A documentation and contract issue tracking the implementation of explicit OAuth profiles for Anthropic providers. **[Link](https://github.com/zeroclaw-labs/zeroclaw/issues/9464)**
*   **[Feature] Sendblue Channel Addition (#10768):** A major feature request to add a native Sendblue channel for iMessage/SMS support on non-macOS platforms. **[Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10768)**
*   **[Bug] Vision Gate Failure (#10887):** The system crashes when non-vision models receive messages containing specific image markers. **[Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10887)**

### 5. Bugs & Stability
*   **S2 - Vision Provider Errors (High Risk):** Issue #10887 and #10908 indicate a systemic problem with how the runtime handles "marker-shaped prose" (text that looks like an image but isn't a loadable image). This causes the entire turn to fail.
*   **S2 - Image Disappearance (High Risk):** Issue #10885 describes a regression where images are stripped from the context after a subsequent tool call.
*   **S2 - CI Flakiness:** Issue #10897 reports that tests are failing intermittently due to global log-broadcast races in the parallel runtime job environment.
*   **S1 - Mattermost DM Bug:** Issue #10901 is marked as S1 (workflow blocked), indicating that the first message in newly auto-discovered DMs is being dropped silently.

### 6. Feature Requests & Roadmap Signals
*   **ZeroCode UX Improvements:** Several issues (#10909, #9549) focus on the ZeroCode Composer, specifically requesting standard text editing features (undo/redo, cut/paste) and better documentation for local model selection.
*   **Context Management:** There is a push to restore "proactive token-budget context compaction" (Issue #10780), which was removed in v0.8.5, indicating a desire to better manage context limits during long conversations.
*   **Audio Transcription:** Issue #10900 proposes a "transcription provider cascade," allowing automatic fallback to backup STT endpoints if the primary fails, improving reliability for voice inputs.

### 7. User Feedback Summary
The community is actively testing the multimodal capabilities of ZeroClaw but is encountering friction with edge cases in image handling. Users want more robust error messages (currently, vision errors fail the whole turn) and better integration with local hardware (Ollama/Hailo) via clearer setup guides. There is also a strong desire for better cross-platform messaging support (specifically iMessage via Sendblue).

### 8. Backlog Watch
*   **[Feature] Sendblue Channel (#10768):** A large-scale feature (XL size) that adds a new channel. It has been open for a week and requires testing.
*   **[Feature] OIDC Token Verification (#10255):** A complex security feature (stage 5) that has been open since August, superseding an older PR.
*   **[Feature] Anthropic OAuth (#9420):** Open since July, tracking the implementation of the stored-profile OAuth contract.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*