# OpenClaw Ecosystem Digest 2026-10-05

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-04 22:37 UTC

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

# PicoClaw Project Digest — 2026-10-05

## Today's Overview
PicoClaw recorded moderate maintenance activity in the last 24 hours: 4 issues and 9 pull requests updated, with 7 PRs reaching merged/closed status and no new releases. The closed/merged PRs focus on pre-release stabilization: agent context/session routing, multi-key configuration persistence, updater asset matching, and channel lifecycle safety. Open community discussion is concentrated on QQ/OneBot channel compatibility and UX, the OpenAI Responses API migration, and CLA signature detection. Several items carry stale labels, indicating some cleanup or lower immediate momentum, while high-severity channel bugs such as the DingTalk reconnect panic remain a watch item. Overall project health is moderately stable: core fixes are progressing, but external SDK/API compatibility and contributor onboarding need maintainer attention.

## Project Progress
Seven PRs reached closed/merged status in the update window. The day’s work is primarily stability and correctness-oriented, with little new user-facing feature work beyond the OneBot reaction toggle proposal.

| PR | Status | Summary |
|---|---:|---|
| [PR #3402](https://github.com/sipeed/picoclaw/pull/3402) | Closed/merged | `fix(agent): resolve the owning agent in context managers`. Fixes context assembly for sessions owned by routed non-default agents, reducing the risk of using the default agent for the wrong session. |
| [PR #3403](https://github.com/sipeed/picoclaw/pull/3403) | Closed/merged | `fix(agent): deliver async tool results to the originating session`. Ensures async tool results, such as `spawn` output, are routed to the correct session instead of being answered by the default agent’s main session. |
| [PR #3400](https://github.com/sipeed/picoclaw/pull/3400) | Closed/merged | `fix(config): persist all api_keys and enabled flag of multi-key models`. Fixes config save behavior for multi-key model entries, preventing loss of `api_keys` and the `Enabled` flag. |
| [PR #3399](https://github.com/sipeed/picoclaw/pull/3399) | Closed/merged | `fix(updater): select the matching 32-bit ARM release asset`. Fixes `picoclaw update` on 32-bit ARM incorrectly selecting the `arm64` archive due to substring-based asset matching. |
| [PR #3401](https://github.com/sipeed/picoclaw/pull/3401) | Closed/merged | `fix(channels): make Reload synchronous and nil-safe`. Prevents gateway panics when an enabled channel has a config entry but no live channel instance during readiness checks or factory failures. |
| [PR #3353](https://github.com/sipeed/picoclaw/pull/3353) | Closed/merged | `fix(channels): bound tool feedback animations`. Prevents missed lifecycle cleanup from causing indefinite channel message editing by stopping animations after five minutes or after the first edit error. |
| [PR #3233](https://github.com/sipeed/picoclaw/pull/3233) | Closed/merged | `Fix pr 3222 backward compat`. Closes a backward-compatibility follow-up related to an earlier PR. |

## Community Hot Topics
All items in the dataset show 0 reactions; activity is therefore ranked primarily by comment count and strategic relevance.

| Item | Activity | Underlying Need |
|---|---:|---|
| [Issue #3394](https://github.com/sipeed/picoclaw/issues/3394) — QQ robot interface updated, QQ channel may not follow | 2 comments | Third-party QQ API drift is breaking or degrading PicoClaw’s QQ channel. Users need proactive compatibility updates and a clear channel compatibility policy. |
| [Issue #3392](https://github.com/sipeed/picoclaw/issues/3392) — CLAassistant does not detect signature | 2 comments | Contributor onboarding friction. A valid contribution, [PR #3381](https://github.com/sipeed/picoclaw/pull/3381), is blocked or delayed by CLA detection failure. |
| [Issue #3382](https://github.com/sipeed/picoclaw/issues/3382) — DingTalk gateway panics on stream SDK reconnect | 2 comments | Long-running gateway stability. DingTalk Stream users need reconnect-safe lifecycle handling, especially with upstream SDK version changes. |
| [Issue #3395](https://github.com/sipeed/picoclaw/issues/3395) — Make OneBot auto-ack reaction configurable | 1 comment | Channel UX control. OneBot/QQ users want to disable or configure automatic emoji acknowledgements that are currently triggered on every message. |

Notable open but less-commented item: [PR #3381](https://github.com/sipeed/picoclaw/pull/3381), switching the OpenAI provider to the Responses API, is strategically important because it touches core provider compatibility. It is also linked to the CLA detection issue, making it a contributor-process and provider-roadmap item at the same time.

## Bugs & Stability
Bugs are ranked by likely operational severity. “Fix PR exists” refers to PRs in the provided last-24-hour dataset.

| Rank | Item | Severity | Status | Notes / Fix |
|---:|---|---|---|---|
| 1 | [Issue #3382](https://github.com/sipeed/picoclaw/issues/3382) — DingTalk gateway panic on stream SDK reconnect | High / Critical | Closed as stale | The reported panic, `send on closed channel` at `client.go:161`, was reproducible on v0.3.1 with `dingtalk-stream-sdk-go` v0.9.1. No fix PR appears in the dataset, so this should be treated as an unresolved stability risk despite closure. |
| 2 | [Issue #3394](https://github.com/sipeed/picoclaw/issues/3394) — QQ robot interface updated but QQ channel interface may not | High / Medium | Open | QQ channel compatibility issue caused by upstream QQ interface changes. No fix PR appears in the dataset. Risk depends on the size of the QQ user base. |
| 3 | [Issue #3392](https://github.com/sipeed/picoclaw/issues/3392) — CLAassistant does not detect signature | Medium | Open | Not a runtime crash, but a contribution blocker. It directly affects [PR #3381](https://github.com/sipeed/picoclaw/pull/3381) and signals friction in the contribution pipeline. |
| 4 | Channel `Reload` nil panic | Medium | Fixed via [PR #3401](https://github.com/sipeed/picoclaw/pull/3401) | Gateway could exit when an enabled channel had no instance because readiness or factory setup failed. The fix makes reload synchronous and nil-safe. |
| 5 | Async tool results delivered to wrong session | Medium | Fixed via [PR #3403](https://github.com/sipeed/picoclaw/pull/3403) | Async tool results were being answered by the default agent’s main session, causing cross-session contamination and accumulation in the wrong chat context. |
| 6 | Multi-key model config not fully persisted | Medium | Fixed via [PR #3400](https://github.com/sipeed/picoclaw/pull/3400) | Saving config could drop `api_keys` and the `Enabled` flag for multi-key model entries, especially after migration-triggered saves. |
| 7 | Updater selects wrong 32-bit ARM asset | Medium | Fixed via [PR #3399](https://github.com/sipeed/picoclaw/pull/3399) | `picoclaw update` on 32-bit ARM could install the `arm64` archive because `arm` matched `arm64` as a substring. |
| 8 | Unbounded tool feedback animations | Low / Medium | Fixed via [PR #3353](https://github.com/sipeed/picoclaw/pull/3353) | Missed lifecycle cleanup could keep editing a channel message indefinitely. The fix adds a five-minute cap and stops after the first edit error. |

## Feature Requests & Roadmap Signals
The dataset shows a mix of small channel UX improvements and a larger provider API migration signal.

| Item | Type | Roadmap Signal |
|---|---|---|
| [Issue #3395](https://github.com/sipeed/picoclaw/issues/3395) + [PR #3396](https://github.com/sipeed/picoclaw/pull/3396) — OneBot `reaction_enabled` setting | Feature request / open PR | Likely a near-term UX improvement if reviewed and accepted. The PR proposes an opt-in toggle, defaulting to `false`, for automatic OneBot acknowledgement reactions. |
| [PR #3381](https://github.com/sipeed/picoclaw/pull/3381) — Switch OpenAI to Responses API | Feature / provider migration | Potentially important for the next release or provider roadmap. However, [Issue #3392](https://github.com/sipeed/picoclaw/issues/3392) suggests the CLA signature issue may need resolution before merge. |
| [PR #3400](https://github.com/sipeed/picoclaw/pull/3400) — Multi-key model persistence fix | Stability / config robustness | Likely to be included in the next stabilization release because it affects model configuration integrity. |
| [PR #3402](https://github.com/sipeed/picoclaw/pull/3402) + [PR #3403](https://github.com/sipeed/picoclaw/pull/3403) — Routed-agent context and async tool session fixes | Core agent correctness | Signals ongoing work toward safer multi-agent routing and session isolation. These are likely prerequisites for more advanced multi-agent use cases. |
| [PR #3399](https://github.com/sipeed/picoclaw/pull/3399) — 32-bit ARM updater asset fix | Platform support | Suggests continued support for embedded or 32-bit ARM deployment targets. |

Predicted next-version focus: channel lifecycle safety, multi-agent session correctness, configuration persistence, updater reliability, OneBot reaction configurability, and possibly OpenAI Responses API support if the CLA blocker is resolved.

## User Feedback Summary
The main user-reported pain points are channel-specific reliability, API compatibility, and contribution friction.

- **QQ/OneBot users want more control over channel behavior.** [Issue #3395](https://github.com/sipeed/picoclaw/issues/3395) reports that every OneBot group message receives an automatic emoji acknowledgement, which users may find noisy. [PR #3396](https://github.com/sipeed/picoclaw/pull/3396) proposes a configurable `reaction_enabled` setting.
- **QQ users report upstream interface drift.** [Issue #3394](https://github.com/sipeed/picoclaw/issues/3394) says the QQ robot interface has changed while the PicoClaw QQ chat channel interface has not been updated, suggesting a need for tighter compatibility tracking.
- **DingTalk users are exposed to gateway-level crashes.** [Issue #3382](https://github.com/sipeed/picoclaw/issues/3382) reports a stream SDK reconnect panic on v0.3.1. This is a high-severity reliability concern for long-running deployments.
- **Contributors are experiencing onboarding friction.** [Issue #3392](https://github.com/sipeed/picoclaw/issues/3392) reports that CLAassistant does not detect the signature for [PR #3381](https://github.com/sipeed/picoclaw/pull/3381), which delays a meaningful OpenAI provider change.
- **Maintainer-level fixes indicate hidden user-facing risks.** The closed PRs show issues that may not have been widely reported but are operationally important: wrong updater assets, config persistence loss, wrong agent/session routing, channel reload panics, and unbounded message-edit animations.

Overall sentiment inferred from the data: moderate satisfaction with active maintenance, but dissatisfaction remains likely among users affected by DingTalk, QQ, OneBot, and OpenAI-related issues.

## Backlog Watch
The following open or recently closed items may need maintainer attention.

| Item | Age / State | Why It Needs Attention |
|---|---|---|
| [PR #3381](https://github.com/sipeed/picoclaw/pull/3381) — OpenAI Responses API switch | Open since 2026-09-17, ~18 days | Strategic provider migration. It is connected to the CLA detection issue, so it may be blocked by contributor-process tooling rather than code review alone. |
| [Issue #3392](https://github.com/sipeed/picoclaw/issues/3392) — CLA signature not detected | Open since 2026-09-25, ~10 days | Blocks or delays contributor PRs. Needs maintainer or CLA tooling investigation. |
| [Issue #3394](https://github.com/sipeed/picoclaw/issues/3394) — QQ channel API mismatch | Open since 2026-09-26, ~9 days | QQ channel compatibility risk. Needs triage, reproduction, and a fix plan if the upstream QQ interface has changed. |
| [Issue #3395](https://github.com/sipeed/picoclaw/issues/3395) + [PR #3396](https://github.com/sipeed/picoclaw/pull/3396) — OneBot reaction configurability | Open since 2026-09-27, ~8 days | Small but user-facing UX improvement. Needs a review decision on whether to merge, request changes, or close. |
| [Issue #3382](https://github.com/sipeed/picoclaw/issues/3382) — DingTalk reconnect panic | Closed as stale since 2026-09-20, ~15 days | Closure as stale does not necessarily mean the crash is fixed. If the panic remains reproducible, it may warrant re-opening or tracking against the upstream DingTalk SDK. |

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-10-05
## 1. Today's Overview
NullClaw maintained an active development cycle with **3 new issues** and **5 new pull requests** in the past 24 hours (2 open, 1 closed on issues; 3 open, 2 closed on PRs), indicating sustained incremental progress. Activity is concentrated in three areas: fixing bugs related to response corruption, docker gateway access restrictions, and git hooks worktree integration. The project currently has no new released versions, suggesting stabilization is prioritizing bug fixes and stability improvements.
## 2. Releases
No new releases were published on 2026-10-05, consistent with the absence of updated versions in the data overview.
## 3. Project Progress
- **Bug Fixes Pushed**:  
  - Issue #1018 [CLOSED] Fixed scrambled/truncated responses in `aarch64-linux-android` (Termux) mode.  
  - PR #1006 [CLOSED] Resolved CLI stdout corruption by appending streamed output instead of overwriting.  
  - PR #1021 [OPEN] Fixed `GIT_DIR` leakage in the `.githooks/pre-push` worktree test.  
- **Transport/Integration Improvements**:  
  - PR #1019 [OPEN] Added byte-exact curl transport coverage for HTTP round-trips, including Android entry points and large payload handling.  
  - PR #1004 [OPEN] Implemented scrubbed logging for non-2xx provider error bodies to preserve visibility.
## 4. Community Hot Topics
- **Primary Hot Topic: Bug Corruption Fixes** – 3 issues (1 closed, 2 open) are active and center on **response corruption** on Android platforms (`Termux`) and docker access issues, indicating critical functionality instability requiring urgent attention. Topics include `nullclaw/nullclaw Issue #1018`, `nullclaw/nullclaw Issue #1017`, `nullclaw/nullclaw Issue #1020`.  
- **Secondary Topic: Git Worktree Hooks** – `.githooks/pre-push` failures (Issue #1020) and worktree-specific hook fixes (PR #1021) show growing attention to worktree compatibility, aligning with maintainers' documented workflow for developer tooling. Topics include `nullclaw/nullclaw Issue #1020` and `nullclaw/nullclaw PR #1021`.
## 5. Bugs & Stability
| Severity | Type | Details | Link |
|----------|------|---------|------|
| **High** | Bug | Android (Termux) responses scrambled/truncated; container access denied due to root-owned data directory | Issue #1018, Issue #1017 |
| **High** | Bug | `.githooks/pre-push` fails in git worktree contexts due to `GIT_DIR` leakage | Issue #1020 |
| **Medium** | Bug | CLI stdout corrupted by offset write (macOS pipe/pipe issue) | PR #1006 |
| **Medium** | Bug | Provider error bodies logged without content (non-2xx visibility loss) | PR #1004 |
- **Fix Activity**: 3 bug issues are actively addressed with corresponding PRs (e.g., #1021 fixes #1020, #1006 fixes CLI corruption, #1018 closes response corruption). Fixes are prioritized to resolve stability issues.  
- **Issues**: No critical or high-severity issues blocking core functionality are reported; all reported issues are specific edge-case bugs with clear fixes.
## 6. Feature Requests & Roadmap Signals
- **High-Signal Feature: Worktree Compatibility** – The `.githooks/pre-push` worktree failure (Issue #1020, PR #1021) signals a growing demand for cross-worktree tooling compatibility, which could drive feature work for improved hooks performance in worktree contexts.  
- **High-Signal Feature: Android/Edge-Platform Robustness** – Android (Termux) response corruption issues (Issue #1018) indicate need for platform-specific robustness improvements, particularly in response integrity and error handling for mobile targets.  
- **Implicit Signal: Error Visibility Enhancement** – The provider error logging fix (PR #1004) signals an ongoing effort to improve error transparency, potentially aligning with roadmap items for more detailed provider error reporting.  

## 7. User Feedback Summary
- **Primary Pain Points**:  
  - Users on Android devices (Termux) experience garbled/truncated agent responses, with no visible error indication, creating low trust in agent output on mobile platforms.  
  - Docker-based gateway deployments encounter access restrictions due to insufficient file permission ownership, limiting reproducible docker-based deployment workflows.  
  - Developer workflows in git worktree contexts face intermittent hook failures, impacting CI/secrets execution and workflow continuity.  
- **Use Cases**: Reproducible Android/termux tool execution, docker-based agent gateway deployment, and CI-style worktree tool integration for automation workflows.  
- **Satisfaction**: Focused feedback is concentrated on edge-case stability and workflow compatibility issues, with no significant dissatisfaction reported yet, indicating the current bug surface is fixable and stable.

## 8. Backlog Watch
- **Urgent Items**:  
  - Issue #1017 (Docker gateway `AccessDenied`, root-owned `/nullclaw-data`) requires immediate resolution to enable docker-based gateway deployments; no corresponding fix PR is currently tracked.  
  - Issue #1020 (worktree `GIT_DIR` leak) is actively addressed by PR #1021 but needs continuation to ensure broader worktree compatibility.  
- **Recommended Attention**:  
  - The Android response corruption (Issue #1018) may warrant next-phase fix work to improve mobile target response integrity and error visibility.  
  - The CLI stdout corruption (PR #1006) should be revisited to confirm whether stabilization was achieved, as it may impact long-running application workflows.  

---
**Data Source**: NullClaw GitHub repository (github.com/nullclaw/nullclaw)  
**Analysis Period**: 2026-10-05

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

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>



# CoPaw Project Digest — 2026-10-05

## 1. Today's Overview

CoPaw (agentscope-ai/CoPaw) saw **18 active items** in the last 24 hours: 11 open issues and 7 pull requests, with no new releases published. Activity is concentrated heavily around bug reports and their corresponding fix PRs, suggesting a period of quality-intensive triage rather than feature expansion. All 11 issues remain open with no closed items, and only 1 PR has been merged/closed today. The project appears to be in a **high-triage, low-merge** state, with community contributors actively submitting fixes for recently surfaced issues.

## 2. Releases

No new releases were published in the last 24 hours. The most recent referenced versions remain **v2.2.2b4** and **v2.2.1**, both with active bug reports.

## 3. Project Progress

| PR | Status | Description |
|----|--------|-------------|
| [#7299](https://github.com/agentscope-ai/QwenPaw/pull/7299) | ✅ **CLOSED** | Fix for conflicting chat payloads — rejects duplicate non-reconnect `POST /api/console/chat` calls that previously returned HTTP 200 without executing the payload. |

No other PRs were merged today. Five PRs remain open and under review (#8108, #8107, #7542, #8096, #8102), and two are still in first-review (#7738).

## 4. Community Hot Topics

**Most commented issues (active discussion):**

1. **#7722** — [Memory exhaustion compounds through three paths](https://github.com/agentscope-ai/QwenPaw/issues/7722) (6 comments, created 2026-09-12)  
   A critical multi-path OOM bug involving unbounded stream buffers, keep-alive instance stacking, and gate-evasion. High severity; still open with no fix PR linked yet.

2. **#7840** — [Plugins share the host event loop](https://github.com/agentscope-ai/QwenPaw/issues/7840) (5 comments, created 2026-09-17)  
   Synchronous I/O in any plugin freezes the entire instance. No dedicated fix PR yet; this is a structural isolation issue.

3. **#7026** — [deepseek-v4-pro chat_template_kwargs TypeError](https://github.com/agentscope-ai/QwenPaw/issues/7026) (3 comments, created 2026-08-14)  
   Auto-injected kwargs not wrapped in `extra_body`, causing OpenAI SDK rejection. Long-open issue; related to PR #7738 which filters unrecognized kwargs.

4. **#7599** — [MissingSessionID with OpenCode Go](https://github.com/agentscope-ai/QwenPaw/issues/7599) (3 comments, created 2026-09-07)  
   Session header missing in OpenCode API calls. Issue #8104 is a follow-up question on the same topic.

**Most commented PRs:** None with visible comments (first-time contributor PRs).

## 5. Bugs & Stability

| Severity | Issue | Summary | Fix PR |
|----------|-------|---------|--------|
| 🔴 Critical | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | Container memory exhaustion (~1 MB/s) via three compounding paths; OOM hang | None yet |
| 🔴 Critical | [#8094](https://github.com/agentscope-ai/QwenPaw/issues/8094) | Console boot splash stuck permanently after update (stale WebView2 cache, no retry, no error surface) | [#8102](https://github.com/agentscope-ai/QwenPaw/pull/8102) (open) |
| 🟠 High | [#7840](https://github.com/agentscope-ai/QwenPaw/issues/7840) | Single sync plugin call freezes entire event loop (~40 s) | None yet |
| 🟠 High | [#8105](https://github.com/agentscope-ai/QwenPaw/issues/8105) | Tool approval buttons broken — both "approve" and "reject" execute reject | None yet |
| 🟠 High | [#8092](https://github.com/agentscope-ai/QwenPaw/issues/8092) | Content-inspection false positives classified as `bad_request` with no retry/fallback, killing turns | None yet |
| 🟡 Medium | [#8106](https://github.com/agentscope-ai/QwenPaw/issues/8106) | Plugin install fails in container: `PIP_TARGET` leak + `PYTHONPATH` stdlib shadowing | [#8107](https://github.com/agentscope-ai/QwenPaw/pull/8107) (open) |
| 🟡 Medium | [#8101](https://github.com/agentscope-ai/QwenPaw/issues/8101) | Global `/chat/<id>` deep link fails cross-agent; same-agent deep link fails to activate session | None yet |
| 🟡 Medium | [#7026](https://github.com/agentscope-ai/QwenPaw/issues/7026) | `chat_template_kwargs` not wrapped in `extra_body` → OpenAI SDK TypeError | [#7738](https://github.com/agentscope-ai/QwenPaw/pull/7738) (open, under review) |
| 🟢 Low | [#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599) | MissingSessionID on OpenCode Go models | Issue #8104 (question follow-up) |

## 6. Feature Requests & Roadmap Signals

- [#8103](https://github.com/agentscope-ai/QwenPaw/issues/8103) — **Notify users on silent model fallback.** Users currently have no visibility when the daemon silently switches providers. This is a strong observability signal that could be included in the next patch release.
- [#7542](https://github.com/agentscope-ai/QwenPaw/pull/7542) — **Scroll-back message pagination.** Addresses the silent mid-conversation gap caused by context compaction. A UX improvement likely to be prioritized given its `size/XXXL` classification and long-open status.
- [#8096](https://github.com/agentscope-ai/QwenPaw/pull/8096) — **Surface `finish_reason: length` in chat metadata.** Helps users distinguish truncated responses from complete ones. Small fix, likely to land soon.

## 7. User Feedback Summary

**Pain points:**
- **Memory leaks under load** (#7722) are the most严重 concern — users report ~1 MB/s unbounded growth leading to OOM crashes.
- **Plugin isolation is absent** (#7840) — a single sync call can freeze the entire instance, making multi-plugin setups unreliable.
- **Tool approval is non-functional** (#8105) — users cannot approve or reject tool calls; the UI is effectively dead, forcing reliance on timeouts.
- **Boot reliability degrades after updates** (#8094) — stale caches permanently block console access with no recovery path.
- **Silent fallbacks erode trust** (#8103) — users discover model switches only after the fact, with no notification.

**Satisfaction signals:**
- Community contribution activity is high (7 PRs from diverse authors including first-time contributors), indicating an engaged user base willing to submit fixes.
- Multiple fix PRs are already aligned with open issues (#8107→#8106, #8102→#8094, #7738→#7026), suggesting a responsive contributor pipeline.

## 8. Backlog Watch

| Issue | Age | Concern |
|-------|-----|---------|
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 23 days | Critical OOM — no fix PR, no maintainer comment. Highest priority backlog item. |
| [#7840](https://github.com/agentscope-ai/QwenPaw/issues/7840) | 18 days | Event loop freeze — structural issue requiring architectural change, no fix PR. |
| [#7026](https://github.com/agentscope-ai/QwenPaw/issues/7026) | 52 days | Long-open SDK compatibility bug; PR #7738 may address root cause but is still under review. |
| [#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599) | 28 days | OpenCode session handling gap — still open with no fix PR. |
| [#8105](https://github.com/agentscope-ai/QwenPaw/issues/8105) | 1 day | Tool approval completely broken; created today with no fix PR yet. |

**Overall project health:** Moderate risk. High bug volume with strong community fix contributions, but maintainer response appears slow on critical issues (#7722, #7840). The lack of recent releases and low merge rate suggest a bottleneck at the triage/merge stage rather than a lack of community engagement.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-05

## 1. Today's Overview
ZeroClaw is maintaining a high activity level with 42 open issues and 50 open pull requests updated in the last 24 hours. The project is deep in the implementation of **v0.8.6 (Runtime)** and **v0.9.0 (Gateway separation)**, with a strong focus on hardening test fixtures, fixing configuration persistence bugs, and resolving critical security/observability gaps. The volume of work indicates active development on core stability and architectural separation, though several high-severity data loss risks (S0/S1) remain open.

## 2. Releases
**None.** No new versions were released today.

## 3. Project Progress
*   **Gateway & Runtime Separation:** The project is actively closing the gap for v0.8.6 (Runtime) and v0.9.0 (Gateway). Work is ongoing on canonical config generation, runtime context visibility, and daemon-to-gateway authorization state synchronization.
*   **Security & Sandbox Hardening:** Significant effort is being directed at macOS sandboxing (Seatbelt policy) and Windows file replacement path handling to prevent privilege escalation and data corruption.
*   **Channel & Tooling Improvements:** The project is expanding channel support (e.g., Sendblue iMessage/SMS) and adding new tools (e.g., Antigravity CLI). There is also active work on improving the ZeroCode TUI experience, specifically fixing clipboard and terminal handling.

## 4. Community Hot Topics
*   **Runtime Test Hardening (#9965):** A critical P1 task to fix test fixtures that write executables under parallel runtime gates. This is the most discussed item (14 comments), indicating a need to stabilize the testing infrastructure for concurrent execution.
*   **Compact Local Runtime Profile (#5287):** A highly requested P2 feature to reduce prompt bloat for local-first users, allowing smaller models to run efficiently without leaking internal instructions. (9 comments)
*   **Config Persistence Data Loss (#10495):** A critical P0 bug where the daemon can overwrite a user's populated config with an empty file. This is a major workflow blocker for production users.

## 5. Bugs & Stability
*   **S0 - Critical Data Loss:** **Issue #10495** (`Config::save() can replace an operator's populated config.toml`). The daemon is overwriting user configurations, potentially wiping out 109KB of settings (25 agents) with a 702-byte empty file.
*   **S1 - Workflow Blocked:**
    *   **Issue #10876:** Gateway auth config saves are reported successfully but do not take effect until a daemon reload, breaking live configuration updates.
    *   **Issue #10536:** macOS Seatbelt policy ignores configured `allowed_roots` for shell commands, causing permissions errors.
*   **S2 - Degraded Behavior:**
    *   **Issue #11420:** SQLite session backend rewrites `created_at` timestamps on every turn, losing per-message history accuracy.
    *   **Issue #11418:** ZeroCode TUI "Copy" button is non-functional on some terminals.
    *   **Issue #11517:** Web chat reloads lose the user's current prompt due to hydration state mismatches.

## 6. Feature Requests & Roadmap Signals
*   **Effort-Based Routing (#7951):** A feature to route simple latency-sensitive turns to local models while escalating harder turns to cloud models. This is a key architectural evolution for the "local-first" strategy.
*   **ZeroCode Dashboard Context (#8383):** Users want better visibility into the active runtime context (daemon, workspace, agents) to reduce user confusion when managing complex configurations.
*   **Channel Attachment Routing (#8527):** Guidance for routing large generated files through attachments rather than pasting them into chat to improve channel compatibility.

## 7. User Feedback Summary
*   **Local-First Frustration:** Users express strong pain regarding prompt bloat and instruction leaking when using local models, specifically requesting a "compact local_small runtime profile" to mitigate these issues.
*   **Configuration Anxiety:** There is significant concern about configuration persistence. Users fear that daemon restarts or save operations might silently corrupt their settings (as seen in #10495 and #11515).
*   **TUI Usability:** ZeroCode TUI users are reporting friction with copy-pasting code from SSH terminals and missing clipboard functionality (Issue #11418, #11529).

## 8. Backlog Watch
*   **Longstanding Architecture:** **Issue #7432** serves as a master tracker for the v0.8.6/v0.9.0 release, organizing the remaining Phase 2 and Phase 3 gateway separation work.
*   **Legacy Deprecation:** **Issue #11442** tracks the retirement of legacy native tool adapters, indicating a shift toward modern plugin/MCP ecosystems.
*   **Stale Candidates:** Several PRs are marked as "stale-candidate" or "parking-lot," including the Sendblue channel implementation and the guided cron editor, suggesting they are awaiting final review or cleanup before merge.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*