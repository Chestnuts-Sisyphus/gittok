# OpenClaw Ecosystem Digest 2026-10-01

> Issues: 478 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-30 23:19 UTC

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

# PicoClaw Project Digest — 2026-10-01

**Source:** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)  
**Data window:** last 24 hours, based on updates through 2026-09-30 / 2026-10-01  
**Activity:** 1 issue updated, 6 pull requests updated (5 open, 1 closed), 0 new releases

---

## 1. Today's Overview

PicoClaw showed **low but focused activity** over the last 24 hours. The main theme is **Web UI reliability and agent-state transparency**, with several new pull requests addressing silent message queuing, failed turns, working indicators, and multi-channel session visibility. The issue tracker recorded one high-relevance bug, [Issue #3408](https://github.com/sipeed/picoclaw/issues/3408), about messages becoming invisible or silently dropped while the agent is busy. Development activity appears responsive, as multiple open PRs directly target that bug and adjacent UX gaps. Overall project health looks **stable but UX-sensitive**, with no releases and several important fixes still pending merge.

---

## 2. Releases

No new releases were published in the last 24 hours.

---

## 3. Project Progress

### Merged / Closed Pull Requests

- **[#1349](https://github.com/sipeed/picoclaw/pull/1349) — `feat(qq): support parsing and replying to more attachment types`**  
  Status: Closed / merged-closed in data  
  This PR advanced QQ Channel support by adding parsing and reply handling for more attachment types, including emoji structures, voice, image, video, and file messages. It also prioritizes Markdown replies with fallback behavior when Markdown fails. This is a meaningful channel-capability improvement, especially for richer media interaction in QQ Channel.

### Open Pull Requests Advancing the Project

- **[#3410](https://github.com/sipeed/picoclaw/pull/3410) — `fix(pico/web): surface steering queue state so queued/dropped messages are no longer invisible`**  
  Status: Open  
  This PR directly addresses the core complaint in [Issue #3408](https://github.com/sipeed/picoclaw/issues/3408). It aims to surface the steering queue state when a session is already running, so queued and dropped messages are no longer invisible to the user.

- **[#3412](https://github.com/sipeed/picoclaw/pull/3412) — `fix(agent): make a failed turn visible to the user`**  
  Status: Open  
  This PR targets another major UX reliability gap: failed agent turns that currently may produce no visible reply. The summary indicates that error notices are generated internally but can be dropped before reaching the user.

- **[#3411](https://github.com/sipeed/picoclaw/pull/3411) — `feat(web): honest, state-driven working indicator`**  
  Status: Open  
  This PR replaces the Web UI’s rotating “thinking” phrases with a state-driven indicator. It is described as Part 1 of [Issue #3406](https://github.com/sipeed/picoclaw/issues/3406) and aims to make the agent’s working state more truthful and less cosmetic.

- **[#3413](https://github.com/sipeed/picoclaw/pull/3413) — `feat(web): global multi-channel session sidebar`**  
  Status: Open  
  This PR introduces a global, multi-channel session sidebar in the Web UI, moving session discovery beyond `pico` sessions. It is described as Part 2-A of [Issue #3406](https://github.com/sipeed/picoclaw/issues/3406) and suggests broader session-management improvements across channels.

- **[#3222](https://github.com/sipeed/picoclaw/pull/3222) — `refactor(deltachat): cleanup implementation, documentation -200LOC`**  
  Status: Open  
  This long-running PR refactors the DeltaChat integration, removes legacy behavior, updates documentation, and reduces approximately 200 lines of code. It also changes configuration expectations, such as dropping password-based email configuration and renaming invite-link fields.

---

## 4. Community Hot Topics

Based on the provided data, the most active community item is:

### [Issue #3408](https://github.com/sipeed/picoclaw/issues/3408) — Web UI messages queued invisibly and dropped silently
- **Status:** Open
- **Author:** racso2609
- **Created:** 2026-09-29
- **Updated:** 2026-09-30
- **Comments:** 1
- **Reactions:** 0 visible
- **Link:** [https://github.com/sipeed/picoclaw/issues/3408](https://github.com/sipeed/picoclaw/issues/3408)

This issue is the center of the day’s discussion because it combines a bug report with a feature request. The user reports that messages sent while the agent is busy are queued as steering input but never shown in the chat, and that queued messages can be silently dropped when the queue is full. The requested improvement is a visible queue / event surface so users can understand what happened to their message.

Related open PRs show that this topic is already being addressed:

- [PR #3410](https://github.com/sipeed/picoclaw/pull/3410) — surface steering queue state
- [PR #3411](https://github.com/sipeed/picoclaw/pull/3411) — honest state-driven working indicator
- [PR #3412](https://github.com/sipeed/picoclaw/pull/3412) — make failed turns visible
- [PR #3413](https://github.com/sipeed/picoclaw/pull/3413) — global multi-channel session sidebar

The underlying need is **transparency in asynchronous agent interactions**. Users interacting through a chat-like Web UI expect immediate acknowledgment, visible queuing, visible failures, and clear agent-state feedback. The current behavior creates uncertainty about whether a message was received, queued, processed, dropped, or ignored.

---

## 5. Bugs & Stability

| Rank | Severity | Item | Description | Fix Status |
|---|---:|---|---|---|
| 1 | High | [Issue #3408](https://github.com/sipeed/picoclaw/issues/3408) | Messages sent while the agent is busy are queued invisibly and can be silently dropped when the queue is full, giving users no feedback. | Direct fix PR exists: [PR #3410](https://github.com/sipeed/picoclaw/pull/3410), currently open. |
| 2 | Medium-High | [PR #3412](https://github.com/sipeed/picoclaw/pull/3412) | Failed agent turns can leave the user without a visible error or reply, making failures appear as silence. | Fix PR exists: [PR #3412](https://github.com/sipeed/picoclaw/pull/3412), currently open. |
| 3 | Low | No other crash or regression reports provided in the data window | The supplied data does not include additional crash, regression, or instability reports. | N/A |

The most important stability concern is not necessarily a hard crash, but a **perceived reliability failure**: the system continues running, but users cannot tell whether their input was accepted, queued, dropped, or failed. That kind of invisible state is especially damaging in personal assistant or chat interfaces.

---

## 6. Feature Requests & Roadmap Signals

The strongest roadmap signals point toward a near-term focus on **Web UX reliability, agent-state visibility, and multi-channel session management**.

### Likely candidates for the next meaningful UI update

- **Visible steering queue / message-state surface**  
  Driven by [Issue #3408](https://github.com/sipeed/picoclaw/issues/3408) and [PR #3410](https://github.com/sipeed/picoclaw/pull/3410). This could include queued-message indicators, drop warnings, queue size visibility, or event-style feedback.

- **Honest working indicator**  
  Driven by [PR #3411](https://github.com/sipeed/picoclaw/pull/3411). Replacing rotating canned phrases with actual state-driven feedback would improve trust during agent processing.

- **Visible failed-turn errors**  
  Driven by [PR #3412](https://github.com/sipeed/picoclaw/pull/3412). This is essential for usability because users need to know when the agent fails rather than assuming it is still working.

- **Global multi-channel session sidebar**  
  Driven by [PR #3413](https://github.com/sipeed/picoclaw/pull/3413). This suggests the project is moving toward a more unified Web UI that can manage sessions across channels, not only `pico` sessions.

- **Richer QQ Channel media support**  
  The closed PR [#1349](https://github.com/sipeed/picoclaw/pull/1349) indicates expanded QQ Channel attachment support is being integrated. This may become visible in the next release.

- **DeltaChat cleanup and simplification**  
  [PR #3222](https://github.com/sipeed/picoclaw/pull/3222) signals maintenance and simplification work, including removal of legacy features and configuration changes. This may not be user-facing immediately, but it could affect setup or deployment behavior.

---

## 7. User Feedback Summary

The strongest user pain point in the data is **lack of feedback in the Web UI during asynchronous agent operation**.

Reported or implied pain points:

- Messages appear to vanish when sent while the agent is busy.
- There is no visible “queued” or “agent busy” state.
- When the queue is full, messages can be dropped without notification.
- Failed agent turns may leave the user staring at silence.
- The existing “thinking” indicator appears to use rotating canned phrases rather than honest agent state.

The implied use case is an interactive assistant chat where users expect real-time acknowledgment and predictable delivery semantics. Users do not just want the agent to respond; they want to know **what stage the message is in**: received, queued, processing, failed, dropped, or completed.

There are no visible positive satisfaction signals in the provided data. The single issue has one comment and no visible reactions, while the listed PRs show no comment counts in the supplied data. Therefore, the feedback picture is limited, but the issue wording is specific and technically detailed, suggesting a motivated user or contributor rather than casual dissatisfaction.

---

## 8. Backlog Watch

### High-attention item

- **[#3222](https://github.com/sipeed/picoclaw/pull/3222) — `refactor(deltachat): cleanup implementation, documentation -200LOC`**  
  **Open since:** 2026-07-03  
  **Last updated:** 2026-09-30  
  **Age in window:** approximately 89 days at digest date  
  This is the oldest open PR in the dataset and represents a non-trivial refactor. It removes legacy features, changes configuration expectations, and reduces code size. Because it may introduce breaking or behavior-changing effects around DeltaChat configuration and invite links, it likely needs focused maintainer review.

### Important recent items needing merge or review

- **[#3408](https://github.com/sipeed/picoclaw/issues/3408)**  
  Open since 2026-09-29. Although recent, it has high user impact because it describes silent message loss. The associated fix, [PR #3410](https://github.com/sipeed/picoclaw/pull/3410), should be prioritized.

- **[#3412](https://github.com/sipeed/picoclaw/pull/3412)**  
  Open since 2026-09-30. This addresses failed-turn visibility, a core reliability concern. It should be reviewed alongside [PR #3410](https://github.com/sipeed/picoclaw/pull/3410) because both improve trust in the agent loop.

- **[#3411](https://github.com/sipeed/picoclaw/pull/3411)**  
  Open since 2026-09-30. This improves the honesty of the Web UI’s working indicator and is a smaller, likely lower-risk UX improvement.

- **[#3413](https://github.com/sipeed/picoclaw/pull/3413)**  
  Open since 2026-09-30. This is larger in scope because it changes session discovery and sidebar behavior across channels. It may require more review time, but it is a strong signal for future Web UI direction.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest - 2026-10-01
## 1. Today's Overview
NullClaw maintained a relatively quiet project state on 2026-10-01, with no open issues, no new releases, and only one active pull request. The activity is limited to a single feature addition for supporting Cheaper Inference as an OpenAI-compatible gateway provider, indicating the project is focusing on expanding integration capabilities rather than addressing active defects or major feature requests. Overall, the project shows stable maintenance but limited expansion activity.
## 2. Releases
No new versions were released on 2026-10-01. Since no release data is available, there are no version-specific changes, breaking changes, or migration notes to report.
## 3. Project Progress
- **Pull Requests**: 1 active PR was updated today: `#1016 [OPEN] feat(providers): add Cheaper Inference as an OpenAI-compatible gateway` (created 2026-09-30, updated 2026-09-30). The PR adds a new provider capability using an established pattern from previous similar integrations (#990, Eden AI), targeting OpenAI-compatible LLM gateway access via a single API key.
- **Feature Development**: The sole activity reflects progression into new provider ecosystem integration, suggesting ongoing expansion into compatible gateway services rather than active bug fixes or major feature scaling.
## 4. Community Hot Topics
- **Active Pull Request**: `#1016 [OPEN] feat(providers): add Cheaper Inference as an OpenAI-compatible gateway` (link: https://github.com/nullclaw/nullclaw/pull/1016) is the only active item, with limited recent interaction (no comments or reactions recorded).
- **Potential Underlying Needs**: The request to add a multi-lab OpenAI-compatible gateway indicates community interest in more flexible, unified inference integration, with potential demand for faster access to LLM services across different providers and scenarios.
## 5. Bugs & Stability
- **Today's Bugs/Issues**: No bugs, crashes, or regressions were reported or fixed on 2026-10-01.
- **Stability Assessment**: The project maintains stable operation without active issue or defect activity, indicating current operational consistency.
## 6. Feature Requests & Roadmap Signals
- **Feature Requests**: The addition of Cheaper Inference as an OpenAI-compatible gateway is a feature request, indicating active interest in expanding openAI-compatible provider support, potentially to improve user access to LLM services via standard gateway interfaces.
- **Roadmap Signal**: The upcoming addition of provider gateway capabilities aligns with a potential roadmap focus on provider ecosystem consolidation, suggesting future development may include additional compatible provider integrations.
## 7. User Feedback Summary
- **Key User Need**: Users may seek convenience in accessing LLM services across diverse providers, with the community pushing for standardized OpenAI-compatible gateway integrations to simplify integration and usage.
- **Satisfaction/Improvement**: No explicit user feedback or satisfaction signals were observed today; the project’s action (PR addition) implies supportive engagement toward expansion of provider integration capabilities.
## 8. Backlog Watch
- **Critical Items**: No critical unanswered Issues or PRs requiring immediate maintainer attention, as the last activity was a straightforward feature PR with no unresolved backlog.
- **Follow-Up Items**: The existing PR `#1016` (Cheaper Inference gateway) may require additional review or refinement to ensure compatibility, access reliability, and usage clarity, though it has no open comments or closure signals indicating active resolution.

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



# CoPaw Project Digest — 2026-10-01

## 1. Today's Overview

CoPaw (QwenPaw) shows active development momentum on 2026-10-01 with 21 updated issues and 41 updated PRs in the last 24 hours, plus the release of **v2.2.2-beta.4**. The project is in a beta stabilization cycle, with the latest release adding a reranker UI config panel and dependency splits for the console. The issue landscape is dominated by bug reports covering context pollution, sandbox security, embedding failures, and provider-specific regressions — indicating the codebase is being actively stress-tested across a wide range of real-world configurations. PR throughput (30 open, 11 merged/closed) suggests a healthy review pipeline, though several long-standing issues remain open.

---

## 2. Releases

### v2.2.2-beta.4
- **What's Changed:**
  - Added reranker UI config panel to ReMeLightMemoryCard ([PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399))
  - Bumped version to 2.2.2b4 ([PR #7892](https://github.com/agentscope-ai/QwenPaw/pull/7892))
  - Split console chat dependencies for lighter installs ([PR partial](https://github.com/agentscope-ai/QwenPaw/pull/6399))
- **Migration Notes:** No breaking changes announced. Beta release — installation verification duty issued in [#8053](https://github.com/agentscope-ai/QwenPaw/issues/8053).
- **Related:** Release-duty issue [#8053](https://github.com/agentscope-ai/QwenPaw/issues/8053) requires four platform checkpoints to pass.

---

## 3. Project Progress

**Merged / Closed Today:**
- [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — Console stop request cancelling active Feishu session under multi-UI sessions (closed)
- [#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443) — Dangerous instruction evasion vulnerability (closed)
- [#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604) — LLM stream idle timeout hardcoded, unconfigurable via WebUI/envs.json on Desktop (closed)
- [#8049](https://github.com/agentscope-ai/QwenPaw/pull/8049) — Fixed `_process_local_tz()` freezing UTC offset and breaking transcript timestamps across DST (merged)

**Key Advancements:**
- **Advisor Mode** ([PR #7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)): Adds a two-model loop mode pairing a stronger advisor with a cheaper worker agent — a significant architectural feature for cost-aware agent orchestration.
- **Background task wake-up** ([PR #8063](https://github.com/agentscope-ai/QwenPaw/pull/8063)): Parent agent sessions now receive notifications when background tasks complete, addressing a long-standing silent-completion gap.
- **Embedding resilience** ([PR #8062](https://github.com/agentscope-ai/QwenPaw/pull/8062)): Per-item fallback when a single chunk exceeds provider token limits, partially closing [#8040].
- **Token usage accuracy** ([PR #8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)): Anthropic cache read/write tokens now counted in the live context meter.
- **Custom cache params** ([PR #8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)): Custom OpenAI-compatible gateways can now declare `prompt_cache_key` support.

---

## 4. Community Hot Topics

| Item | Type | Comments | Focus |
|------|------|----------|-------|
| [#8022](https://github.com/agentscope-ai/QwenPaw/issues/8022) | Issue | 4 | `send_file_to_user` pollutes session context with empty assistant messages, causing persistent 400s |
| [#7991](https://github.com/agentscope-ai/QwenPaw/issues/7991) | Issue | 4 | TaskTracker zombie entries inflate running count, disagree with `/api/chats` |
| [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) | Issue | 8 | Console stop cancels active Feishu sessions across UI sessions |
| [#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443) | Issue | 6 | Dangerous instruction evasion — security concern |
| [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) | Issue | 2 | Security sandbox bypassed on Windows |
| [#7997](https://github.com/agentscope-ai/QwenPaw/issues/7997) | Issue | 2 | Message retraction/editing + workspace rollback in WebUI |
| [#7945](https://github.com/agentscope-ai/QwenPaw/issues/7945) | Issue | 2 | @All / @所有人 filtering support for IM channels |
| [#8042](https://github.com/agentscope-ai/QwenPaw/issues/8042) | Issue | 2 | Tool output files auto-fed back to model, causing Internal error |

**Underlying Needs:**
- **Session integrity** is a dominant theme — users are running multi-session, multi-channel setups (Feishu, WeCom, Console) and hitting boundary-condition bugs around session isolation, context pollution, and task tracking.
- **Security sandbox trust** is critical; [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) and [#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443) both flag confidence gaps in the sandbox for Windows deployments.
- **Operational visibility** demands (context meter accuracy, task counts, background task feedback) show users are running production-grade agent workloads.

---

## 5. Bugs & Stability

| Severity | Issue | Summary | Fix PR |
|----------|-------|---------|--------|
| 🔴 High | [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) | DeepSeek `send_file_to_user` with PDF **permanently breaks session** — all subsequent requests fail with 400 | — |
| 🔴 High | [#8022](https://github.com/agentscope-ai/QwenPaw/issues/8022) | `send_file_to_user` file/image blocks + empty assistant messages **pollute context**, causing persistent 400s across models | — |
| 🟠 Medium | [#8042](https://github.com/agentscope-ai/QwenPaw/issues/8042) | Tool output files auto-fed back as model input; Internal error when model lacks format support | — |
| 🟠 Medium | [#7991](https://github.com/agentscope-ai/QwenPaw/issues/7991) | TaskTracker zombie entries inflate `running_task_count`, disagrees with `/api/chats` | — |
| 🟠 Medium | [#8040](https://github.com/agentscope-ai/QwenPaw/issues/8040) | Embedding reindex incomplete — CJK chunk over token limit silently drops whole batch | [#8062](https://github.com/agentscope-ai/QwenPaw/pull/8062) (partial) |
| 🟡 Low | [#8035](https://github.com/agentscope-ai/QwenPaw/issues/8035) | Transcription settings page cannot configure `transcription_model` — switching providers silently breaks transcription | — |
| 🟡 Low | [#8046](https://github.com/agentscope-ai/QwenPaw/issues/8046) | `_process_local_tz()` freezes UTC offset, shifts timestamps by DST delta | [#8049](https://github.com/agentscope-ai/QwenPaw/pull/8049) (merged) |
| 🟡 Low | [#8058](https://github.com/agentscope-ai/QwenPaw/issues/8058) | `prompt_cache_key` rejected for custom OpenAI-compatible Responses providers | [#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061) |
| 🟡 Low | [#8057](https://github.com/agentscope-ai/QwenPaw/issues/8057) | Context meter under-reports for Anthropic Messages providers (cache tokens not counted) | [#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060) |
| 🟡 Low | [#8002](https://github.com/agentscope-ai/QwenPaw/issues/8002) | Windows auto mode + sandbox off allows inline Office COM `Quit()` to close user's PowerPoint | — |
| 🟡 Low | [#8013](https://github.com/agentscope-ai/QwenPaw/issues/8013) | Large skill download (12,994 files) times out at 30s frontend hard limit; backend keeps running but skill never lands | — |
| 🟡 Low | [#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059) | Background agent task record lost (404) after completion; finished tasks return empty final response | [#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063) |
| 🟡 Low | [#8036](https://github.com/agentscope-ai/QwenPaw/issues/8036) | Creator OpenAI integration: image credentials/capabilities and resume failures | — |
| 🟡 Low | [#8047](https://github.com/agentscope-ai/QwenPaw/issues/8047) | `server/discover` HTTP 422 with plain-text body not treated as legacy-protocol evidence; streamable_http driver never activates | — |

**Notable Pattern:** The `send_file_to_user` → context pollution → persistent 400 failure chain ([#8022](https://github.com/agentscope-ai/QwenPaw/issues/8022), [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064)) appears across at least two providers (general + DeepSeek), suggesting a systemic issue in how file responses are handled post-send.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood for Next Release |
|---------|----------|----------------------------|
| Message retraction/editing + workspace rollback in WebUI | [#7997](https://github.com/agentscope-ai/QwenPaw/issues/7997) | Medium — complex, but high user value |
| @All / @所有人 filtering for IM channels | [#7945](https://github.com/agentscope-ai/QwenPaw/issues/7945) | High — simple filter, broad impact across Feishu/DingTalk/WeCom |
| Advisor Mode (two-model orchestration) | [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) | High — PR is large but well-scoped; likely lands in 2.2.x |
| Background task wake-up for parent sessions | [#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063) | High — small, targeted fix in flight |
| Extra system prompt injection per request | [#4580](https://github.com/agentscope-ai/QwenPaw/pull/4580) | Medium — under review, useful for API consumers |
| LLM-based self-healing for QQ send errors | [#1560](https://github.com/agentscope-ai/QwenPaw/pull/1560) | Medium — channel-specific, lower priority |
| Auto WebView2 install on Windows | [#3120](https://github.com/agentscope-ai/QwenPaw/pull/3120) | Medium — installer-side, depends on release cadence |

**Signal:** The project is pushing toward **cost-aware multi-model orchestration** (Advisor Mode) and **better multi-session/multi-channel isolation** — both reflect maturation from prototype to production deployment patterns.

---

## 7. User Feedback Summary

**Pain Points:**
- **Context pollution from file operations** is the top complaint — users report that sending files via `send_file_to_user` corrupts session state, causing cascading failures that require manual session restarts. This affects both general and DeepSeek-specific workflows.
- **Sandbox confidence is eroding on Windows.** [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) (sandbox breach) and [#8002](https://github.com/agentscope-ai/QwenPaw/issues/8002) (COM `Quit()` closes user's PowerPoint) both indicate that the security guarantees users rely on are not holding in real Windows environments.
- **Silent background task failures** ([#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059)) break multi-agent workflows where managers dispatch and expect results — task records vanish post-completion.
- **DST-aware timestamping** ([#8046](https://github.com/agentscope-ai/QwenPaw/issues/8046)) is a niche but important reliability issue for global deployments.
- **Frontend 30s hard timeout** on large skill downloads ([#8013](https://github.com/agentscope-ai/QwenPaw/issues/8013)) causes perceived failures even when the backend succeeds, creating a poor UX gap.

**Satisfaction Signals:**
- The rapid response to embedding reindex ([#8040 → #8062](https://github.com/agentscope-ai/QwenPaw/pull/8062)), context meter accuracy ([#8057 → #8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)), and cache param support ([#8058 → #8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)) shows the team is actively closing loops on user-reported bugs within the same cycle.
- Advisor Mode ([#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)) demonstrates investment in advanced orchestration features that power users have requested.

---

## 8. Backlog Watch

| Item | Open Since | Priority | Risk |
|------|-----------|----------|------|
| [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) — Security sandbox bypassed on Windows | 2026-09-10 | 🔴 Critical | Trust erosion for enterprise deployments |
| [#8002](https://github.com/agentscope-ai/QwenPaw/issues/8002) — COM `Quit()` closes user's PowerPoint in auto mode | 2026-09-28 | 🔴 High | Data loss risk; direct user impact |
| [#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443) — Dangerous instruction evasion | 2026-08-31 | 🔴 High | Security vulnerability (closed but may need follow-up) |
| [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) — DeepSeek session permanently broken by PDF send | 2026-09-30 | 🔴 High | Provider-specific but severe; no fix PR yet |
| [#8022](https://github.com/agentscope-ai/QwenPaw/issues/8022) — Context pollution from `send_file_to_user` | 2026-09-29 | 🔴 High | Systemic; no fix PR yet |
| [#7991](https://github.com/agentscope-ai/QwenPaw/issues/7991) — TaskTracker zombie entries | 2026-09-26 | 🟠 Medium | Multi-agent workflow reliability |
| [#5861](https://github.com/agentscope-ai/QwenPaw/pull/5861) — macOS login-shell PATH resolution | 2026-07-08 | 🟠 Medium | Long-open, under review; blocks macOS power users |
| [#4902](https://github.com/agentscope-

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**Project Digest: ZeroClaw (github.com/zeroclaw-labs/zeroclaw)**
**Date:** 2026-10-01

### 1. Today's Overview
ZeroClaw is experiencing high community engagement with 91 total repository updates (41 issues, 50 PRs) in the last 24 hours. The project is in a critical "release v0.9.0" cycle, characterized by intense security hardening and architectural consolidation. While no new releases were published today, the team is aggressively closing gaps in identity access control, sandboxing, and runtime stability to stabilize the upcoming version.

### 2. Releases
**Status:** None published in the last 24 hours.
*   **Context:** The project is in a "release candidate" or stabilization phase for v0.9.0. Recent activity suggests the team is finalizing security patches and architectural refactors (like the cron extraction) before cutting the final release.

### 3. Project Progress
The day's progress is dominated by **high-risk security fixes** and **runtime stability improvements**.
*   **Merged/Active PRs:** 50 PRs were updated, with several key PRs focused on fixing memory scoping and security bypasses.
*   **Key Advances:**
    *   **Memory Security:** PR #11266 addresses a critical vulnerability where subagents could access parent sessions' private memory.
    *   **Tool Attachment Handling:** PR #10938 refactors how tools send data to providers, specifically clarifying image attachments to prevent data loss or corruption.
    *   **Cron Architecture:** PR #10557 continues the refactoring of the cron subsystem into a standalone crate (`zeroclaw-cron`), improving modularity.
    *   **Desktop Safety:** PR #11278 prevents self-upgrade conflicts in the bundled desktop kernel.

### 4. Community Hot Topics
The most active discussions focus on **Identity/Access Control (IAM)** and **Channel Integration**.

*   **#8692: Maintainer Decision Queue (15 Comments)**
    *   *Link:* [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)
    *   *Analysis:* A tracker for RFCs and design decisions. High volume indicates the project is in a heavy planning phase for v0.9.0.
*   **#10366: RFC on PR Review Evidence (10 Comments)**
    *   *Link:* [Issue #10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)
    *   *Analysis:* Defines the "expedited merge lane" for PRs, attempting to streamline code review processes while maintaining security standards.
*   **#5982: Per-sender RBAC for Multi-tenant Agents (10 Comments)**
    *   *Link:* [Issue #5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)
    *   *Analysis:* A complex architectural discussion on implementing Role-Based Access Control on a per-sender basis, shifting from a separate crate to the existing agent model.

### 5. Bugs & Stability
**Priority: P0 (Critical) - Security Risks**
*   **Memory Scope Bypass (Issue #11198, PR #11266):** Delegated memory tools lose principal scope, allowing unauthorized access to memory. **Status:** Fix implemented in PR #11266.
*   **Session Ownership Bypass (Issue #11127, #11123):** Session-data tools bypass principal ownership checks, posing a severe data leak risk. **Status:** Open.
*   **Knowledge Graph Global Access (Issue #9647):** The knowledge graph is globally shared without per-agent scoping, allowing cross-agent data contamination. **Status:** Open.
*   **Daemon Stack Overflow (Issue #10230):** ZeroCode daemon startup can crash with a stack overflow. **Status:** Closed.
*   **WhatsApp Image Vision (Issue #10975):** Inbound images are received as literal "[Image]" text, breaking vision capabilities. **Status:** Closed.

**Priority: P1 - Workflow Blocking**
*   **Cron Declarative Job Update (Issue #9770):** The `cron update` command silently discards changes to job configurations. **Status:** Open.
*   **WhatsApp Caption Loss (Issue #11257):** WhatsApp Web drops captions for media files. **Status:** Open.

### 6. Feature Requests & Roadmap Signals
*   **ZeroCode TUI Enhancements (Issue #8907):** A tracker for a unified plugin/capability catalog pane in the TUI interface. This is part of the "surface 4/4" UI roadmap.
*   **Android Native Tools (PR #10205):** A large-scale feature request to add Android-specific tools (screenshot, UI actions, etc.) to the agent's capability set.
*   **MCP Launcher (PR #10591):** Adding a standalone "bootstrap" launcher for MCP (Model Context Protocol) hosts to simplify installation and distribution.

### 7. User Feedback Summary
*   **Operator Experience:** Users are frustrated by the lack of visibility in cron failures (Issue #9770, #10599) and silent configuration updates.
*   **Channel Reliability:** There is ongoing feedback regarding the reliability of WhatsApp Web integration, specifically the loss of metadata (images/captions) compared to other channels like Telegram.
*   **Developer Experience:** The community is actively debating the best architectural approach for RBAC and memory isolation, indicating a maturing but complex ecosystem.

### 8. Backlog Watch
*   **#7432: Runtime and Gateway Delivery (2 Comments):** A massive tracker for v0.8.6 and v0.9.0 completion. It is currently "Accepted" but "Blocked," indicating significant technical debt or dependency issues preventing completion.
*   **#11001: External Gateway Local IPC (2 Comments):** A feature request to complete local IPC coverage for an external gateway. It is currently blocked, likely waiting on the resolution of other v0.9.0 dependencies.
*   **#11294: Flaky Test (1 Comment):** A race condition in the CI gate for runtime tests that causes intermittent failures, requiring immediate attention to ensure release stability.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*