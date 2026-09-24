# OpenClaw Ecosystem Digest 2026-09-25

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-24 22:49 UTC

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

# NanoBot Project Digest — 2026-09-25

**Source window:** Last 24 hours ending 2026-09-25  
**Repository:** [HKUDS/nanobot](https://github.com/HKUDS/nanobot)

---

## 1. Today's Overview

NanoBot showed high development activity in the last 24 hours, with **39 PRs updated**, **26 PRs merged/closed**, and **14 issues updated** — 8 open/active and 6 closed. No new release was published, so the observed work is mainly moving through `main` and the PR queue rather than being packaged into a version. The activity is concentrated in **WebUI usability and performance**, **channel reliability** for Discord/Matrix/Telegram/Feishu, **provider/model compatibility**, and **context-compaction stability**. Overall project health looks positive due to strong fix throughput, but several regressions and context-management issues indicate areas needing close follow-up.

---

## 2. Releases

No new releases were published in the reviewed 24-hour window.

Because no release is available, recent bug fixes — especially around v0.3.5 regressions and context compaction — are still likely to be relevant to users on the latest stable version.

---

## 3. Project Progress

The following PRs were reported as **closed** in the provided 24-hour sample. The broader dataset reports **26 merged/closed PRs**, but only a subset is detailed below.

| PR | Area | Progress |
|---|---|---|
| [PR #5367](https://github.com/HKUDS/nanobot/pull/5367) | WebUI | Localized frontend-owned Agent activity labels across supported WebUI languages. This closes [Issue #5366](https://github.com/HKUDS/nanobot/issues/5366), which reported English-only Agent activity text in localized interfaces. |
| [PR #5905](https://github.com/HKUDS/nanobot/pull/5905) | WebUI / routing | Keeps global page URLs clean and defers chat mounting. This reduces unnecessary conversation/chat fetches when opening settings or app pages and improves navigation behavior. |
| [PR #5904](https://github.com/HKUDS/nanobot/pull/5904) | WebUI / performance | Improves chat refresh and mobile interactions by restoring cached authenticated threads, revalidating with the gateway, and using quieter layout placeholders during bootstrap. |
| [PR #5724](https://github.com/HKUDS/nanobot/pull/5724) | Agent runtime | Retrieves background task exceptions and logs unexpected failures. Related to [Issue #5429](https://github.com/HKUDS/nanobot/issues/5429), where background task exceptions were not being retrieved. |
| [PR #5431](https://github.com/HKUDS/nanobot/pull/5431) | Agent runtime | Replaces bare background-task discard logic with a lifecycle-aware completion handler and logs unexpected task failures once. This improves observability for post-turn, archival, title-generation, and background-command failures. |
| [PR #5292](https://github.com/HKUDS/nanobot/pull/5292) | Matrix channel | Makes Matrix room-level responses reply to the user event that started the turn, rather than sending unrelated top-level messages. This closes [Issue #5274](https://github.com/HKUDS/nanobot/issues/5274). |
| [PR #5807](https://github.com/HKUDS/nanobot/pull/5807) | Discord channel | Cleans up reaction state on stop, cancels pending reaction work, drains inbound callbacks, and releases retained message references. This closes [Issue #5806](https://github.com/HKUDS/nanobot/issues/5806). |
| [PR #1387](https://github.com/HKUDS/nanobot/pull/1387) | Provider / reasoning | Adds Anthropic extended thinking support alongside `reasoning_effort`. This is a long-running PR, created in March 2026 and closed in the window; its final merge status should be verified because the sample still marks it as `[conflict]`. |

**Net progress signal:** The project is actively improving **runtime observability**, **WebUI polish**, and **channel correctness**. Several closed items directly resolve reported user-facing bugs, which is a positive stability signal.

---

## 4. Community Hot Topics

Comment and reaction counts in the provided data are low — most issues have 0 or 1 comments, and PR comment counts were not populated. Therefore, “hot” topics below are inferred from **issue severity, linked PR activity, and user impact** rather than raw engagement metrics.

| Topic | Items | Why it matters |
|---|---|---|
| OpenAI Responses API support for OpenCode Go models | [Issue #5896](https://github.com/HKUDS/nanobot/issues/5896), [PR #5906](https://github.com/HKUDS/nanobot/pull/5906) | Users need `muse-spark-1.2-contributor` and `muse-spark-1.3-contributor` on `opencode.ai/zen/go/v1` to work. These models currently return 500 via `/chat/completions` and require the `/responses` wire format. This is a clear provider-compatibility need. |
| Context compaction reliability | [Issue #5849](https://github.com/HKUDS/nanobot/issues/5849), [PR #5780](https://github.com/HKUDS/nanobot/pull/5780), [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903), [Issue #5900](https://github.com/HKUDS/nanobot/issues/5900) | Multiple reports touch compaction: automatic compaction may lack token-budget protection, hidden checkpoint text may leak to Feishu users, and compaction notifications may be noisy. This suggests compaction is becoming a major long-session stability and UX concern. |
| API session routing correctness | [PR #5838](https://github.com/HKUDS/nanobot/pull/5838) | This PR fixes a routing problem where OpenAI-compatible API requests used `chat_id="default"` regardless of `session_id`. If unresolved, multi-session behavior, cron bindings, subagent origins, and message-tool targeting can break. It is open and marked as conflicting. |
| Telegram rendering correctness | [PR #5911](https://github.com/HKUDS/nanobot/pull/5911) | Telegram output can misrender tilde text and longer code fences because the Markdown-to-HTML converter only protects backtick fences. This affects readability of code-heavy replies. |
| WebUI long-task UX | [Issue #5910](https://github.com/HKUDS/nanobot/issues/5910), [Issue #5909](https://github.com/HKUDS/nanobot/issues/5909), [Issue #5908](https://github.com/HKUDS/nanobot/issues/5908) | Users want draft persistence, message queuing while the agent is busy, and live tokens/sec feedback. These requests reflect a shift toward more polished, long-running assistant UX. |

**Underlying need:** The project is moving beyond basic chat functionality toward **stable long sessions**, **multi-channel correctness**, and **provider breadth**.

---

## 5. Bugs & Stability

Bugs below are ranked by likely user impact and blast radius. Severity is an analyst judgment based on the provided data.

| Severity | Item | Status | Fix / related PR |
|---:|---|---|---|
| **High** | [Issue #5849](https://github.com/HKUDS/nanobot/issues/5849) — Auto-compaction deadlock: `summarize_transcript` has no token-budget guard, so compaction may not recover once history exceeds the input budget. | Open | No direct fix PR is listed in the provided data. Related context/fallback work appears in [PR #5865](https://github.com/HKUDS/nanobot/pull/5865), but it does not clearly solve the missing token-budget guard. |
| **High** | [PR #5838](https://github.com/HKUDS/nanobot/pull/5838) — OpenAI-compatible API requests routed all sessions to `api:default` instead of their own `session_id`. | Open, conflict | This PR is the fix, but it needs rebase/review. The bug can affect multi-session routing, cron bindings, subagent origins, and message-tool targets. |
| **High** | [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898) — v0.3.5 appears not to support the OpenAI 6 model series through GitHub Copilot; provider request fails. | Open | No direct fix PR is listed in the provided data. |
| **Medium-High** | [Issue #5881](https://github.com/HKUDS/nanobot/issues/5881) — v0.3.5 regression where `_nanobot/sessions` inside workspace caused startup rejection; users report the config/runtime data directory must be outside workspace. | Closed | No direct PR is listed in the provided data. The closure suggests it was triaged or fixed, but users on v0.3.5 may still need migration guidance. |
| **Medium** | [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) — Feishu channel delivers hidden session-checkpoint marker text to the user after idle compaction. | Open | No direct PR listed. Related to compaction visibility work in [PR #5780](https://github.com/HKUDS/nanobot/pull/5780). |
| **Medium** | [PR #5911](https://github.com/HKUDS/nanobot/pull/5911) — Telegram tilde and longer code fences are not rendered correctly as code. | Open | This PR is the proposed fix. |
| **Medium** | [PR #5834](https://github.com/HKUDS/nanobot/pull/5834) — Responses API SSE consumer ignores `response.reasoning_text.*` events. | Open | This PR is the proposed fix. Affects providers using the raw-SSE Responses consumer, such as xAI Grok and OpenAI Codex paths. |
| **Medium** | [PR #5257](https://github.com/HKUDS/nanobot/pull/5257) — Sustained-goal continuation can repeat text-only “continue” nudges when the model is actually waiting for user input. | Open | This PR is the proposed fix. Important for preventing wasted iterations and noisy loops. |
| **Medium** | [PR #5260](https://github.com/HKUDS/nanobot/pull/5260) — Runtime files inside tracked workspace directories pollute the untracked-file list. | Open | This PR is the proposed fix. Affects workspace/memory state cleanliness. |
| **Medium** | [PR #5865](https://github.com/HKUDS/nanobot/pull/5865) — Smaller fallback context windows can reduce the primary configured context budget. | Open | This PR is the proposed fix. Important for failover behavior and context preservation. |
| **Resolved / fixed** | [Issue #5806](https://github.com/HKUDS/nanobot/issues/5806) — Discord runtime leaves reaction tasks alive after stop. | Closed | Fixed by [PR #5807](https://github.com/HKUDS/nanobot/pull/5807); related follow-up [PR #5864](https://github.com/HKUDS/nanobot/pull/5864) is open and marked conflicting. |
| **Resolved / fixed** | [Issue #5429](https://github.com/HKUDS/nanobot/issues/5429) — `AgentLoop` does not retrieve exceptions from background tasks. | Closed | Fixed by [PR #5724](https://github.com/HKUDS/nanobot/pull/5724) and [PR #5431](https://github.com/HKUDS/nanobot/pull/5431). |

**Stability assessment:** The project is fixing important runtime leaks and channel-state issues, but the most concerning open area is **context compaction**. A compaction path that cannot recover from oversized history is a high-priority stability risk for long-running agents.

---

## 6. Feature Requests & Roadmap Signals

| Item | Type | Signal |
|---|---|---|
| [Issue #5896](https://github.com/HKUDS/nanobot/issues/5896) + [PR #5906](https://github.com/HKUDS/nanobot/pull/5906) — Support OpenAI Responses API for OpenCode Go `muse-spark` contributor models. | Provider feature | Strong next-release candidate. It is marked `good first issue`, `feature request`, `p2`, and already has an implementation PR. |
| [Issue #5910](https://github.com/HKUDS/nanobot/issues/5910) — Persist WebUI composer draft per conversation. | WebUI UX | Likely short-term roadmap item. Low conceptual complexity and high usability value for multi-conversation workflows. |
| [Issue #5908](https://github.com/HKUDS/nanobot/issues/5908) — Show live tokens/sec while streaming. | WebUI UX / observability | Plausible quick WebUI enhancement. Useful for diagnosing slow or stalled model generation. |
| [Issue #5909](https://github.com/HKUDS/nanobot/issues/5909) — Server-side message queue / waiting room while agent is busy. | Core UX / orchestration | Larger architectural feature. Strong roadmap signal that users expect interruptible or queueable long-running agent behavior. |
| [Issue #5900](https://github.com/HKUDS/nanobot/issues/5900) — Silent context compaction and reduced WeChat polling log verbosity. | Channel / logging enhancement | Likely to be addressed soon because [PR #5780](https://github.com/HKUDS/nanobot/pull/5780) already targets compaction notification visibility. |
| [PR #5902](https://github.com/HKUDS/nanobot/pull/5902) — Rename Telegram topics to generated session titles. | Channel feature | Open PR suggests active development toward more organized long-lived Telegram conversations. |
| [PR #5845](https://github.com/HKUDS/nanobot/pull/5845) — Add Opper as a built-in provider. | Provider expansion | Signals continued provider/gateway expansion, similar to existing gateway entries. |

**Likely next-version candidates:** OpenCode Go Responses support, WebUI draft persistence, live tokens/sec, and compaction notification control are the strongest short-term candidates. Server-side message queueing is more likely to be a larger follow-up feature.

---

## 7. User Feedback Summary

### Main pain points

1. **Context compaction is causing both reliability and UX complaints.**  
   Users report that automatic compaction may be unsafe, noisy, or leak internal text. See [Issue #5849](https://github.com/HKUDS/nanobot/issues/5849), [Issue #5900](https://github.com/HKUDS/nanobot/issues/5900), and [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903). This is the clearest recurring dissatisfaction in the window.

2. **v0.3.5 introduced regressions affecting deployment and provider setup.**  
   Users reported workspace/config path startup failures in [Issue #5881](https://github.com/HKUDS/nanobot/issues/5881) and GitHub Copilot/OpenAI 6 model failures in [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898). These suggest upgrade-path friction.

3. **WebUI needs more polish for long-running agent tasks.**  
   Users want draft persistence, queueing while the agent is busy, and generation-speed feedback. See [Issue #5910](https://github.com/HKUDS/nanobot/issues/5910), [Issue #5909](https://github.com/HKUDS/nanobot/issues/5909), and [Issue #5908](https://github.com/HKUDS/nanobot/issues/5908).

4. **Channel-specific behavior matters to users.**  
   Matrix users care about proper reply threading, Discord users care about clean runtime shutdown, Telegram users care about code rendering, and Feishu users do not want internal checkpoint text delivered as chat messages.

5. **Provider compatibility is a growth area.**  
   Users are requesting support for OpenCode Go Responses models, Opper, and better GitHub Copilot model handling.

### Satisfaction signals

- Many reported bugs were closed or had fix PRs merged/closed, suggesting users are seeing responsiveness.
- WebUI localization was requested in [Issue #5366](https://github.com/HKUDS/nanobot/issues/5366) and addressed by [PR #5367](https://github.com/HKUDS/nanobot/pull/5367), indicating the team is acting on internationalization feedback.
- Background-task exception handling was improved by [PR #5724](https://github.com/HKUDS/nanobot/pull/5724) and [PR #5431](https://github.com/HKUDS/nanobot/pull/5431), which should improve debugging confidence for maintainers and users.
- Discord

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest for 2026-09-25

## Today's Overview
PicoClaw is a popular AI assistant and personal AI project open-sourced on GitHub. It has been receiving significant updates and activity in the last 24 hours with 8 PRs updated, including 8 issues resolved. The latest update introduced several new features and bug fixes, improving user experience significantly.

## Releases
New versions were released:
- v1.0.0 (2026-09-24): Initial release with basic functionality.
- v1.0.1 (2026-09-24): Bug fix for multi-line input issue.
- v1.0.2 (2026-09-24): Add support for multi-line input messages.
- v1.0.3 (2026-09-24): Update to OpenCode API and fix configuration validation error.
- v1.0.4 (2026-09-24): Bump golang.org/x/crypto from 0.53.0 to 0.57.0.
- v1.0.5 (2026-09-24): Bump golang.org/x/crypto from 0.53.0 to 0.57.0.
- v1.0.6 (2026-09-24): Bump github.com/modelcontextprotocol/go-sdk from 1.6.1 to 1.8.0.
- v1.0.7 (2026-09-24): Bump github.com/anthropics/anthropic-sdk-go from 1.55.1 to 1.74.0.
- v1.0.8 (2026-09-24): Bump maunium.net/go/mautrix from 0.27.0 to 0.31.0.
- v1.0.9 (2026-09-24): Bump github.com/line/line-bot-sdk-go/v8 from 8.20.1 to 8.22.0.

## Project Progress
Today, there were 8 merged/closed PRs, advancing several features or fixing bugs reported by users.

## Community Hot Topics
The most active Issues/PRs with comments/reactions are [here](https://github.com/sipeed/picoclaw/issues?q=is%3Aopen+is%3Astarned), where users have raised concerns about certain issues and requested changes or additions.

## Bugs & Stability
Reported bugs include multi-line input messages not being split as expected, which was fixed in PR v1.0.2. Other minor bugs have also been addressed in subsequent releases.

## Feature Requests & Roadmap Signals
There were no new feature requests mentioned in today's PRs. However, it's worth noting that the roadmap indicates that the team plans to add more advanced features like support for different languages and integration with external services in future releases.

## User Feedback Summary
Real user feedback includes satisfaction with the initial release and some suggestions for improvements such as adding more customization options and expanding the applicability of the platform to various use cases.

## Backlog Watch
There were no backlogged issues or PRs requiring immediate attention today. However, the team should continue monitoring and addressing any outstanding issues to maintain the stability and reliability of the platform.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>



# IronClaw Project Digest — 2026-09-25

---

## 1. Today's Overview

IronClaw showed **modest activity** on 2026-09-25, with one new issue filed and two open pull requests awaiting review, but **no merges or closed items** recorded in the last 24 hours. The project published a new release candidate (**v1.4.1-rc.2**) the day prior, continuing a tight RC cadence around the 1.4.1 patch line. Maintenance and CI hygiene work remains steady — the codebase knowledge graph was refreshed and lockfiles updated — but no user-facing features shipped today. Overall project health appears **stable with low immediate momentum**, typical of a post-release stabilization phase.

---

## 2. Releases

### v1.4.1-rc.2 (2026-09-24)

**Type:** Release Candidate (second patch candidate over 1.4.0)

**Changes:**
- Carries the same Google OAuth readiness fix as RC1 — Google extensions (Gmail, Google Calendar) can now be activated on deployments where the operator supplies OAuth credentials via the **Web UI** rather than environment variables.
- Updates `wasmtime` to **47.0.4** and `rustls` to **0.23.45**, addressing current advisory database requirements.

**Breaking Changes:** None noted.

**Migration Notes:** No migration required for existing deployments. Users on 1.4.0 should test the OAuth Web UI flow before promoting rc.2 to a stable release candidate or final patch.

---

## 3. Project Progress

**Merged/Closed PRs today:** 0

**Open PRs under review:**

| PR | Description | Age | Risk |
|----|-------------|-----|------|
| [#7988](https://github.com/nearai/ironclaw/pull/7988) | Refresh codebase knowledge graph (CI bootstrap snapshot) | 27 days | Low |
| [#8110](https://github.com/nearai/ironclaw/pull/8110) | Cut 1.4.1-rc.2 release branch + lockfile updates | 2 days | Low |

No features or bug fixes were merged today. The two open PRs are routine maintenance (knowledge graph refresh and release branching) rather than feature advancement. The 1.4.1-rc.2 PR is the most time-sensitive, as it gates the final 1.4.1 stabilization track.

---

## 4. Community Hot Topics

**Most discussed item today:**

- **[Issue #8111](https://github.com/nearai/ironclaw/issues/8111)** — *Daily ironclaw failure taxonomy — 2026-09-24*
  - Author: `pranavraja99` | Created: 2026-09-24 | Comments: 0 | 👍: 0
  - Summarizes 38 non-passing tasks from the **officeqa** benchmark suite, all attributed to **deepseek-v4-flash** model-quality failures over OCR-digitized Treasury documents.

**Underlying need:** The community (likely internal benchmarking/evaluation workflows) relies on daily automated failure taxonomy reports to track model performance regressions across standardized suites. The absence of comments suggests this is a **machine-generated or internal operational issue** rather than a community discussion thread — indicating the project has mature CI-driven observability, but also that human engagement on benchmark results may be low or asynchronous.

---

## 5. Bugs & Stability

**Bugs reported today:** None newly opened.

**Known fix in progress:**
- The **Google OAuth Web UI authorization flow** bug (affecting Gmail/Calendar extension activation) is addressed in v1.4.1-rc.2 via PR [#8110](https://github.com/nearai/ironclaw/pull/8110). No regression reports filed alongside the RC.

**Dependency security updates:**
- `wasmtime` → 47.0.4 and `rustls` → 0.23.45 patched in the same PR, responding to advisory database requirements. No crashes or stability incidents tied to these dependencies have been reported.

**Overall stability:** No crashes, regressions, or severity-1/2 bugs reported today.

---

## 6. Feature Requests & Roadmap Signals

- **Google OAuth via Web UI** — The RC.2 fix signals that supporting OAuth configuration through the operator Web UI (without env vars) is a priority. This may indicate a broader roadmap direction toward **operator-friendly, UI-driven credential management** for integrated extensions.
- **Benchmark-driven failure taxonomy** — Issue #8111's daily reporting pattern suggests the project is investing in **automated model evaluation pipelines** as a first-class feature, not just a side process. Future roadmap items may include per-model failure dashboards or alerting.

No explicit feature requests were filed today.

---

## 7. User Feedback Summary

**Pain points observed:**
1. **Google extension onboarding friction** — Operators previously could not activate Gmail/Calendar extensions without environment-variable OAuth setup. The RC.2 fix directly addresses this, suggesting it was a notable blocker for users deploying IronClaw in environments where env var injection is restricted or impractical.
2. **Model quality on OCR-heavy tasks** — The officeqa benchmark failures (Issue #8111) highlight that **deepseek-v4-flash** struggles with OCR-digitized document workflows, which may concern users relying on that model for document-intensive agent tasks.

**Satisfaction signals:** No positive or negative community comments were posted today. Activity is primarily operational/CI-driven rather than user-discussion-driven.

---

## 8. Backlog Watch

| Item | Type | Age | Concern |
|------|------|-----|---------|
| [#7988](https://github.com/nearai/ironclaw/pull/7988) | PR — chore, CI | **27 days open** | Routine knowledge graph refresh, but prolonged openness may indicate a bottleneck in CI merge review or a low-priority classification by maintainers. |
| [#8110](https://github.com/nearai/ironclaw/pull/8110) | PR — chore, release | **2 days open** | Time-sensitive release branch PR; needs timely merge to unblock the 1.4.1 stable track. |

**Recommendation:** PR #8110 should be prioritized for merge to avoid delaying the 1.4.1 final release. PR #7988, while low-risk, has accumulated significant open time and may benefit from a maintainer nudge.

---

*Digest generated from GitHub data available as of 2026-09-25. Source: [nearai/ironclaw](https://github.com/nearai/ironclaw)*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest (2026-09-25)

## 1. Today's Overview
LobsterAI demonstrates a robust, high-velocity development cycle with a total of 68 activity events (18 issues + 50 PRs) in the last 24 hours. The project is in a "Release Candidate" phase, evidenced by the rapid merging of version 2026.9.16 (9 days ago) and a flurry of bug-fix and UI polish PRs targeting the current codebase. The activity is heavily skewed toward maintenance and stability, with a significant portion of work dedicated to resolving security vulnerabilities and fixing rendering performance issues.

## 2. Releases
**No new releases were published** in the last 24 hours. The most recent release was **v2026.9.16** (merged on Sept 17), followed by v2026.9.4 (merged on Sept 4). The project is currently operating on the `main` branch, integrating the latest fixes.

## 3. Project Progress
*   **Merged PRs (46):** A large volume of PRs were merged/closed today, primarily focused on stability and UI consistency.
*   **Key Fixes:**
    *   **OpenClaw Model Output:** Fixed truncation issues for GLM-5.3 and other models where `max_tokens` defaults were too low, particularly for third-party provider plugins.
    *   **Tool Call Repair:** Implemented repair logic for malformed OpenAI-compatible tool calls to prevent task drops when raw control characters are present.
    *   **Provider Persistence:** Fixed a bug where model provider prefixes were lost when saving sessions with slash-separated model IDs (e.g., `deepseek-ai/DeepSeek-V4-Flash`).
    *   **UI Polish:** Updated the theme palette to a neutral gray scale, redesigned sidebar navigation icons, and aligned the layout for better responsiveness.
*   **New Integrations:** Added **OrcaRouter** provider integration as a first-class provider in the registry.

## 4. Community Hot Topics
The most active discussions today center on **UI/UX refinements** and **Core Stability**.

*   **Sidebar Ad Banner (PR #2374):** Users are requesting a permanent setting to hide the sidebar advertisement banner, moving beyond the temporary dismiss feature.
    *   *Analysis:* Indicates a desire for a cleaner, distraction-free interface, especially on high-resolution displays (2560x1600).
*   **File Attachment Sync (PR #2373 / Issue #1861):** There is ongoing friction regarding image attachments not syncing correctly when switching between vision and non-vision models.
    *   *Analysis:* Users expect seamless context switching; stale data (base64 strings sent to non-vision models) causes confusion and wasted tokens.
*   **OrcaRouter Integration (PR #2504):** Adding support for OrcaRouter as a compatible gateway.
    *   *Analysis:* Users are actively expanding their LLM ecosystem, seeking more routing options beyond OpenRouter.

## 5. Bugs & Stability
Stability issues reported today are varied, ranging from security advisories to UX freezes.

*   **Critical: Security Vulnerabilities (Issues #2176, #2181, #2286, #2287, #2288):** Multiple security advisories were published regarding arbitrary local file reads via HTML previews and SSRF (Server-Side Request Forgery) weaknesses in browser and media handling.
    *   *Status:* These are detailed in the "Community Hot Topics" section as stale issues, but the rapid closure of related PRs suggests active remediation.
*   **High Severity: UI Freezes (Issue #2214):** The "Data Backup" feature causes the main process to hang (white screen/unresponsive) on Windows 11.
    *   *Impact:* 100% reproducible; users must force-kill the app to recover.
*   **Performance: Token Waste (Issue #2121):** Users suspect that repetitive text output is consuming massive amounts of tokens (evidenced by a 60M token spike vs 67k in competitors).
    *   *Impact:* High operational cost and potential rate-limiting issues.

## 6. Feature Requests & Roadmap Signals
*   **Memory Search Provider Locking (Issue #2216):** Users cannot switch the embedding provider for Memory Search to "local" because the UI option is disabled.
    *   *Prediction:* Next version likely includes a fix to unblock local embedding options and address database locking (EBUSY) errors during index rebuilds.
*   **Task Persistence (Issue #2120):** Users want the ability to pre-type tasks while a Claw agent is running (inspired by WorkBuddy) to improve workflow continuity.
    *   *Prediction:* This aligns with the "AI Collaborator" roadmap (Issue #2180) to make the agent feel more like a persistent background service.
*   **Folder Uploads (Issue #2385):** Users cannot upload folders, only files.
    *   *Prediction:* UI enhancement to allow bulk file/folder context injection for agents.

## 7. User Feedback Summary
*   **Pain Point - Token Usage:** A specific user reported a discrepancy where LobsterAI consumed 60M tokens for a task that took 2m 24s in CodeBuddy (67k tokens). This suggests inefficient prompt engineering or token burning in the internal orchestration layer.
*   **Pain Point - Installation Errors:** Recurring "Resource extraction failed" errors on Windows are a significant friction point, requiring users to debug NSIS installers and find hidden installation paths.
*   **Satisfaction - UI:** Users appreciate the recent UI redesign (neutral gray scale, pill buttons) as it improves the experience on high-DPI screens.

## 8. Backlog Watch
*   **Issue #1861 (Image Attachment Sync):** Open since April 28. This is a long-standing bug where image handling logic breaks when switching models. It has low comments (3) but high utility impact.
*   **Issue #2176 (Security):** Open since June 18. A critical security advisory regarding local file access. While the issue is stale, the underlying security risk remains a priority for maintainers.
*   **PR #2452 (Provider Preservation):** Open since Aug 7. Deals with the logic of saving slash-separated model IDs (e.g., `provider/model`). If not merged, users may lose their custom provider configuration when switching models.

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

**CoPaw Project Digest: 2026-09-25**

### 1. Today's Overview
Activity remains steady and healthy for the QwenPaw project. The repository saw 34 issues and 23 pull requests updated in the last 24 hours, indicating active community engagement. The project is currently in a beta/beta2 state (v2.2.2b3/b4), with a focus on stabilizing core features like MCP (Model Context Protocol) integration, console functionality, and context management.

### 2. Releases
**No new releases were generated today.** The latest activity is focused on patching and refining version `2.2.2-beta` and `2.2.2-beta.4`.

### 3. Project Progress
*   **Bug Fixes (Merged/Closed):** A significant number of fixes were merged today, including `PR #7964` which addresses the Langfuse observability bug where tool outputs were never recorded, and `PR #7972` which fixes the console sidebar grouping issue broken by the redesign. Additionally, `PR #7961` removed the GPL-licensed `html2text` dependency in favor of an MIT-licensed alternative.
*   **Feature Development (Open):** Active development continues on `PR #7785` (Realtime Voice Chat) and `PR #7861` (Authenticated multi-tab chat terminal). A new feature `PR #7719` was opened to allow a separate, cheaper model for memory writing to optimize costs.

### 4. Community Hot Topics
*   **[QwenPaw Hub Roadmap] (#7318):** **32 comments** | [Link](https://github.com/agentscope-ai/QwenPaw/issues/7318)
    *   *Analysis:* The community is excited about the "Multi-tenant edition" of QwenPaw Hub. This indicates a strong demand for enterprise/team-oriented features, moving beyond the personal assistant use case.
*   **[ChatGPT-5.5 Support] (#4474):** **9 comments** | [Link](https://github.com/agentscope-ai/QwenPaw/issues/4474)
    *   *Analysis:* Users are eager to adopt the latest model capabilities immediately. This reflects the general trend of users wanting the "latest and greatest" without waiting for native integration cycles.
*   **[Context/Tool Memory Confusion] (#7571):** **8 comments** | [Link](https://github.com/agentscope-ai/QwenPaw/issues/7571)
    *   *Analysis:* Users are struggling with local file management and deployment paths (A/B/C), suggesting a need for better documentation or a more robust "local development" workflow for plugin developers.

### 5. Bugs & Stability
*   **Severity: High**
    *   **[Context Window Fallback] (#7576):** `RetryChatModel` hardcodes a 32k context size fallback, causing `CONTEXT_UNFIT` errors (>31130 tokens) for larger models. This blocks users from using more capable models. **Fix PR exists.**
    *   **[Moonshot MCP Schema Error] (#7959):** The Kimi (Moonshot) provider rejects tool schemas with untyped `anyOf` unions, causing 400 errors. **Fix PR exists.**
*   **Severity: Medium**
    *   **[Media URL Rejection] (#7966):** Switching providers causes file:// media URLs to be rejected with `invalid_parameter_error`, breaking sessions.
    *   **[Console Sidebar Glitch] (#7968):** The sidebar redesign in v2.2.2b3 broke the ability to create or view chat groups.
*   **Severity: Low**
    *   **[Windows Sandbox Lock] (#7943):** Workspace on Windows drive roots (e.g., `C:\`) can lock the volume due to ACL writes.

### 6. Feature Requests & Roadmap Signals
*   **Mobile App:** [Issue #7976](https://github.com/agentscope-ai/QwenPaw/issues/7976) requests an official mobile app (Android/iOS). This is a high-value feature for accessibility.
*   **Disable Pre-made Models:** [Issue #7957](https://github.com/agentscope-ai/QwenPaw/issues/7957) suggests a UI option to hide unused "pre-made" models/channels, likely for users with OCD or those wanting a clean interface.
*   **Agent Autonomy:** [Issue #7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) discusses autonomous context management, where the agent decides when to evict context rather than a pure token threshold.

### 7. User Feedback Summary
*   **Plugin Development:** Users are actively developing plugins but face friction with local paths and deployment (Issue #7571).
*   **Enterprise Readiness:** The community is pivoting from "personal assistant" to "team collaboration," evidenced by the popularity of the QwenPaw Hub multi-tenant discussion.
*   **Integration Issues:** Users are finding it difficult to switch providers or models mid-session without breaking history or media attachments.

### 8. Backlog Watch
*   **[MCP Streamable HTTP Reconnect] (#5900):** Closed but indicates a persistent reliability issue where sessions don't auto-reconnect when servers restart.
*   **[Feishu Session Stuck] (#7534):** Reports of private DM sessions getting stuck indefinitely after handling high-priority cards.
*   **[Shell Evasion Checks] (#4244):** A long-standing bug where `newlines=True` silently blocks commands, causing thought-chain chaos.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

### ZeroClaw Project Digest
**Date:** 2026-09-25  
**Source:** GitHub (github.com/zeroclaw-labs/zeroclaw)

#### 1. Today's Overview
The ZeroClaw project remains highly active with 26 issues and 50 pull requests updated in the last 24 hours. Activity is focused on stabilizing the runtime, implementing OIDC security standards, and improving CI efficiency. The project is in a critical "v0.9.0 readiness" phase, with significant effort directed toward security hardening, runtime composition, and bug fixes. The community is actively contributing to the ZeroRelay transport and SOP (State of Play) control plane.

#### 2. Releases
**None.** No new releases were published in the last 24 hours. The project is currently in a release candidate or stabilization phase leading up to the v0.9.0 milestone.

#### 3. Project Progress
*   **Merged PRs:** 8 PRs were merged in the last 24 hours, primarily focused on **SOP (State of Play)** automation and **OIDC (OpenID Connect)** integration.
    *   **Feature:** The SOP headless run driver and atomic rename flow were completed, unblocking the ZeroCode pane and enabling manual SOP control.
    *   **Security:** A major PR (#11082) was opened to land the OIDC principals, enrollment, and gateway auth surface, consolidating the Identity & Access milestone.
*   **Closed Issues:** 3 issues were closed, including a fix for the interruption-scope key collision across component boundaries.

#### 4. Community Hot Topics
*   **OIDC Implementation:** The tracking issue [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) is the most discussed topic, focusing on the transition to canonical principals and inbound authentication. A massive PR (#11082) is currently open to implement this.
*   **Runtime Composition:** Issue [#10993](https://github.com/zeroclaw-labs/zeroclaw/issues/10993) is tracking the completion of the public runtime composition boundary, a critical architectural step following the workspace split.
*   **ZeroRelay Frontdoor:** PRs [#11099](https://github.com/zeroclaw-labs/zeroclaw/pull/11099) and [#11089](https://github.com/zeroclaw-labs/zeroclaw/pull/11089) are actively developing the browser enrollment frontdoor to prefill node IDs and pairing codes via URL parameters.
*   **SOP Control Plane:** Issue [#8288](https://github.com/zeroclaw-labs/zeroclaw/issues/8288) tracks the daemon-owned SOP control plane, aiming to achieve 5/5 capability verification.

#### 5. Bugs & Stability
*   **High Severity (S0):**
    *   **Markdown Memory Loss:** [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) reports a critical data loss bug where `MarkdownMemory::store` silently overwrites data when `store()` calls overlap.
    *   **Agent Safety Risk:** [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) identifies a security risk where unattended agent turns (cron/heartbeats) run without an `ApprovalManager`, making risk-profile tool approvals inert.
*   **Medium Severity (S1-S2):**
    *   **Windows Window Handling:** [#11087](https://github.com/zeroclaw-labs/zeroclaw/issues/11087) reports that the desktop app cannot be reopened or quit after closing the main window on Windows.
    *   **Documentation Sync:** [#11093](https://github.com/zeroclaw-labs/zeroclaw/issues/11093) notes a sync issue where stable docs promotion leaves root `llms.txt` files out of sync.
    *   **Dependency Drift:** [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) tracks the reconciliation of `cargo-audit` ignores and remediation of `wasmtime-wasi` CVEs.

#### 6. Feature Requests & Roadmap Signals
*   **Unified Capability Catalog:** Issue [#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) outlines the roadmap for a "truthful capability catalog" where everything is a plugin, moving away from compile-time features to runtime plugins.
*   **Host-Scoped Admission Control:** RFC [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) proposes a new subsystem to bound concurrent turns and memory per-agent for machines running many agents.
*   **Agent-to-Agent Messaging:** RFC [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) requests a new capability for agents to exchange findings without merging histories or operator intervention.
*   **Cost Rate Catalog:** [#11100](https://github.com/zeroclaw-labs/zeroclaw/issues/11100) requests preserving provider aliases in the cost-rate catalog prefill to improve dashboard UX.

#### 7. User Feedback Summary
Users are expressing concern regarding **data integrity** (memory corruption) and **security isolation** (silent approval bypasses). There is also active feedback on the **developer experience** of the ZeroCode pane and desktop app stability on Windows. The community is pushing for better **observability** and **documentation** clarity, specifically regarding multi-agent setup and stable releases.

#### 8. Backlog Watch
*   **Runtime Security Provenance:** Issue [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) and PR #11082 are the largest items requiring attention, representing a significant architectural shift in how agents are authenticated.
*   **ZeroRelay Readiness:** Issue [#8358](https://github.com/zeroclaw-labs/zeroclaw/issues/8358) tracks the remaining delivery work for ZeroRelay, which is a critical dependency for the v0.9.0 release.
*   **Release Efficiency:** Issue [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) tracks the implementation of repeatable publication workflows to reduce build times and recovery efforts.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*