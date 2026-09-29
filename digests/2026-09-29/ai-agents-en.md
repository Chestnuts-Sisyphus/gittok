# OpenClaw Ecosystem Digest 2026-09-29

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-29 00:03 UTC

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

Here is the cross-project analysis and comparative digest for the personal AI assistant and agent open-source ecosystem, based on community telemetry from **September 29, 2026**.

---

### 1. Ecosystem Overview

The open-source AI agent landscape on September 29, 2026, exhibits a clear shift from initial framework prototyping to **production hardening, multi-provider adaptability, and workspace security**. Across the active projects, maintainers are prioritizing runtime stability—such as handling oversized model contexts via disk-spilling, hardening desktop IPC handlers against arbitrary execution, and preventing multi-session file corruption. Concurrently, expanding model support beyond standard OpenAI/Anthropic APIs toward next-generation models (e.g., GPT-6 Sol/Luna/Astra) and alternative providers (e.g., Tsubasa, Eden AI) is a top priority. Channel hygiene is also maturing, with frameworks active in stripping internal reasoning, compaction markers, and hidden checkpoints before delivering messages to end-user platforms like Feishu, DingTalk, and QQ.

---

### 2. Activity Comparison

*Note: For projects where summary generation failed or no activity occurred, status is noted accordingly.*

| Project | Active Issues (Opened / Updated) | Active PRs (Merged / Open) | Release Status | Health & Activity Level |
| :--- | :---: | :---: | :---: | :--- |
| **OpenClaw** | *N/A (Failed)* | *N/A (Failed)* | Core Baseline | Core Reference Architecture |
| **NanoBot** | 8 updated | 19 updated (10 closed/merged, 9 open) | No release | **High Velocity**: Active bug fixes, provider updates |
| **Hermes Agent** | *N/A (Failed)* | *N/A (Failed)* | No summary | Data unavailable |
| **PicoClaw** | 7 opened | 7 updated (8 merged/closed) | No release | **Moderate/Active**: Focus on security audits & config persistence |
| **NanoClaw** | *N/A (Failed)* | *N/A (Failed)* | No summary | Data unavailable |
| **NullClaw** | 17 updated (1 open, 16 closed) | 7 updated (6 merged, 1 open) | Tagged `v20260929` (PR) | **Very High Triage Velocity**: Excellent backlog maintenance |
| **IronClaw** | *N/A (Failed)* | *N/A (Failed)* | No summary | Data unavailable |
| **LobsterAI** | 5 open / updated | 14 updated (11 merged/closed, 3 open) | No release | **High**: Active infrastructure, security, & UI stabilization |
| **TinyClaw** | 0 | 0 | No release | **Dormant**: Zero activity in 24 hours |
| **Moltis** | 0 | 1 open | No release | **Low / Maintenance**: Single community PR open |
| **CoPaw** | 5 open / updated | 15 updated (3 merged, 12 open) | No release | **High**: Refactoring context, task tracking, CLI startup |
| **ZeptoClaw** | 1 open | 1 open | No release | **Low / Focused**: Addressing context truncation & tool spilling |
| **ZeroClaw** | *N/A (Failed)* | *N/A (Failed)* | No summary | Data unavailable |

---

### 3. OpenClaw's Position

As the ecosystem's **core reference architecture**, OpenClaw continues to set the standard for agent gateway controls, workspace runtime paradigms, and desktop integration. 

* **Advantages vs. Peers:** OpenClaw provides the foundational specification and gateway infrastructure that downstream projects consume or emulate. Desktop projects like **LobsterAI** explicitly build their UI around the OpenClaw gateway framework, relying on its IPC protocols and PID management.
* **Technical Approach Differences:** While OpenClaw acts as an enterprise-grade gateway framework, derivative "Claw" implementations branch into specialized execution engines:
  * **NullClaw** prioritizes high performance and low-overhead binary execution (written in Zig, supporting IMAP IDLE and post-turn adaptive pipelines).
  * **NanoBot** focuses on Python-native multi-provider agility and dynamic subagent orchestration.
  * **ZeptoClaw** targets lightweight, minimal footprint deployments with disk-spill fallback for constrained contexts.
* **Community Ecosystem:** OpenClaw remains the focal hub around which specialized ecosystem variants (NanoBot, PicoClaw, NullClaw, ZeptoClaw, CoPaw) operate, defining the baseline capabilities for tool execution, skill lifecycle management, and gateway stability.

---

### 4. Shared Technical Focus Areas

A cross-repo analysis highlights four major engineering challenges currently being tackled across multiple projects:

```
                  ┌─────────────────────────────────────────┐
                  │      SHARED TECHNICAL FOCUS AREAS      │
                  └────────────────────┬────────────────────┘
                                       │
     ┌──────────────────┬──────────────┴───────┬──────────────────┐
     ▼                  ▼                      ▼                  ▼
[Context Window   [Workspace & IPC       [Next-Gen Model     [Channel Message
 Safety & Recovery]     Hardening]        Provider Expansion]   Cleanliness]
• ZeptoClaw #707  • NanoBot #4798/#5953  • NullClaw #1013    • NanoBot #5903/#5956
• CoPaw #8009/#8010• LobsterAI #1034    • Moltis #1288      • NullClaw #1014
• NanoBot #5920   • CoPaw #8002          • NanoBot #5940     • PicoClaw #3354
```

1. **Context Window Safety & Oversized Payload Handling:**
   * **The Problem:** Tool outputs or media attachments exceeding LLM context limits cause unrecoverable 400 errors or permanent session freezes.
   * **Solutions:** **ZeptoClaw** (PR #708) implemented disk-spill for tool outputs over 50KB to `~/.zeptoclaw/sessions/<key>/spill/`. **CoPaw** (PR #8010, Issue #8009) is refactoring image payload handling to prevent context-induced session death, while **NanoBot** (PR #5920) added Unicode-safe token truncation.

2. **Workspace Concurrent Safety & Local Security Hardening:**
   * **The Problem:** Desktop agents executing shell commands or concurrently writing files risk corrupting workspace state or exposing host privileges.
   * **Solutions:** **NanoBot** (PR #5953, Issue #4798) introduced atomic file writes to stop workspace corruption across concurrent sessions. **LobsterAI** (PR #1034) closed a critical vulnerability by restricting Electron `shell:openExternal` handlers strictly to `http/https` schemes. **CoPaw** (Issue #8002) is addressing Windows COM sandbox bypasses during automated Office routines.

3. **Next-Generation & Alternative Model Provider Support:**
   * **The Problem:** Rapid shifts in model catalog APIs (GPT-6 variants, regional/gateway providers) require constant catalog and client adjustments.
   * **Solutions:** **NullClaw** (PR #1013) and **Moltis** (PR #1288) both added support for the **Tsubasa** chat-completions provider on the same day. **NullClaw** also added **Eden AI** (#990), while **NanoBot** patched GPT-6 Sol/Luna catalog discovery (#5940) and removed unsupported reasoning effort flags (#5952).

4. **Channel Message Cleanliness & Platform-Specific Formatting:**
   * **The Problem:** Internal agent control loops, compaction alerts, and raw Markdown bleed into user-facing chat apps.
   * **Solutions:** **NullClaw** (PR #1014) added automated Markdown marker stripping for QQ replies. **NanoBot** (Issues #5903, #5956) is working to suppress internal compaction notices and hidden checkpoint markers on Feishu/Lark.

---

### 5. Differentiation Analysis

| Dimension | Desktop & Productivity Suite | Multi-Channel & High-Triage Engine | Enterprise Console & Multi-Task | Embedded & Resource-Constrained |
| :--- | :--- | :--- | :--- | :--- |
| **Representative Projects** | **LobsterAI** | **NullClaw**, **NanoBot** | **CoPaw** | **PicoClaw**, **ZeptoClaw** |
| **Primary Target User** | Knowledge workers, creators (PPT/Word/Excel) | Power users, self-hosters, chat-ops teams | Enterprise teams using Qwen/Aliyun infrastructure | Edge devices, 32-bit ARM systems, minimal VPS |
| **Architectural Focus

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-09-29

## 1. Today's Overview

NanoBot showed **high development activity** over the last 24 hours, with **19 PRs** and **8 Issues** updated, but **no new release** was published. Work concentrated on **provider compatibility**, **agent reliability**, **tool correctness**, and **channel UX**, especially for Feishu, Codex/GPT-6, and WebUI. Ten PRs were reported as **merged/closed**, including fixes for Codex model discovery, Codex title generation, tokenizer warm-up, TUI session history, and `web_fetch` error propagation. The most important open risks are a **p0 file-write atomicity PR**, a **p1 sudo-loop availability bug**, and several Feishu notification/compaction issues. Overall project health is **active and responsive**, but unresolved high-priority bugs and the absence of a release mean some fixes are not yet user-facing.

## 2. Releases

No new releases were published in the window. See: [GitHub Releases](https://github.com/HKUDS/nanobot/releases).

## 3. Project Progress

The dataset reports **10 PRs merged/closed**. The substantive progress includes:

- **Codex / GPT-6 compatibility**:  
  [PR #5940](https://github.com/HKUDS/nanobot/pull/5940) closed, fixing [Issue #5939](https://github.com/HKUDS/nanobot/issues/5939) by updating the Codex catalog client version so GPT-6 Sol and Luna appear in model discovery.  
  [PR #5952](https://github.com/HKUDS/nanobot/pull/5952) closed, restoring Codex title generation by removing a provider-incompatible `reasoning.effort="none"` value.

- **Tokenization / startup performance**:  
  [PR #5861](https://github.com/HKUDS/nanobot/pull/5861) closed, warming the fallback tokenizer in the background to reduce startup and token-estimation latency. This is related to [Issue #5843](https://github.com/HKUDS/nanobot/issues/5843), which was also closed.

- **Tooling and search**:  
  [PR #5948](https://github.com/HKUDS/nanobot/pull/5948) closed, using installed `ripgrep` for native file search when available.  
  [PR #5949](https://github.com/HKUDS/nanobot/pull/5949) closed, ensuring `web_fetch` failures are propagated as structured tool errors instead of being reported as successful executions.

- **TUI / session history**:  
  [PR #5950](https://github.com/HKUDS/nanobot/pull/5950) closed, restoring saved session history in the TUI after canonical event changes.

- **Docs / community metadata**:  
  [PR #5951](https://github.com/HKUDS/nanobot/pull/5951) closed, refreshing the README contributor wall while preserving historical credits.

- **Stale PR cleanup**:  
  [PR #1355](https://github.com/HKUDS/nanobot/pull/1355), [PR #1443](https://github.com/HKUDS/nanobot/pull/1443), and [PR #1502](https://github.com/HKUDS/nanobot/pull/1502) were closed. The provided data does not distinguish merged vs. closed-only, so these are treated as cleanup activity rather than confirmed shipped features.

## 4. Community Hot Topics

| Topic | Activity | Underlying need |
|---|---:|---|
| [Issue #5924](https://github.com/HKUDS/nanobot/issues/5924) — Agent stuck in sudo loop | 5 comments, p1 | Durable authorization, graceful failure after max iterations, avoid unusable agent state |
| [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) — Feishu hidden checkpoint marker delivered to user | 4 comments | Channel-specific filtering of internal markers; hidden messages must not leak to users |
| [Issue #5908](https://github.com/HKUDS/nanobot/issues/5908) — WebUI live tokens/sec indicator | 4 comments | Streaming observability; users need to detect model stalls or performance issues |
| [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898) — GPT-6 model series via GitHub Copilot | 3 comments | Support for newer GPT-6 models through Copilot provider paths |
| [Issue #5956](https://github.com/HKUDS/nanobot/issues/5956) — Feishu compaction notices should be closable | 2 comments | Configurable internal notices; avoid channel noise when in-place editing is unavailable |
| [Issue #4798](https://github.com/HKUDS/nanobot/issues/4798) — Concurrent file writes corrupt workspace files | 2 comments | Multi-session safety, file locking/atomic writes, workspace integrity |

**Interpretation:** the community is focused on **reliability under real deployment conditions**: persistent authorization, channel-specific message hygiene, model-provider coverage, workspace safety, and WebUI observability.

## 5. Bugs & Stability

Ranked by current severity and user impact:

| Rank | Severity | Status | Item | Impact | Fix signal |
|---:|---|---|---|---|---|
| 1 | **High / p0** | Open | [Issue #4798](https://github.com/HKUDS/nanobot/issues/4798) — concurrent file writes not serialized | Workspace file corruption or torn reads across sessions | Open p0 fix: [PR #5953](https://github.com/HKUDS/nanobot/pull/5953) for atomic writes |
| 2 | **High / p1** | Open | [Issue #5924](https://github.com/HKUDS/nanobot/issues/5924) — agent stuck in sudo loop | Agent becomes unusable when sudo authorization expires mid-task | No linked fix PR in the provided data |
| 3 | **Medium** | Open | [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898) — GPT-6 via GitHub Copilot fails | Provider compatibility gap for newer GPT-6 models | No linked fix PR; related Codex fix [PR #5940](https://github.com/HKUDS/nanobot/pull/5940) is Codex-specific |
| 4 | **Medium** | Open | [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) and [Issue #5956](https://github.com/HKUDS/nanobot/issues/5956) — Feishu compaction/checkpoint messages delivered to users | User-facing noise and leakage of internal agent state | No linked fix PR in the provided data |
| 5 | **Medium** | Open PR | [PR #5957](https://github.com/HKUDS/nanobot/pull/5957) — exec session hard timeout not enforced without polling | Commands may outlive configured timeout; success may be reported incorrectly | Not merged |
| 6 | **Medium** | Open PR | [PR #5946](https://github.com/HKUDS/nanobot/pull/5946) — persist completed tool results at batch boundaries | Gateway crash mid-tool-batch can lose partial tool results | Not merged |
| 7 | **Resolved / lower current risk** | Closed | [Issue #5939](https://github.com/HKUDS/nanobot/issues/5939) — Codex model discovery omits GPT-6 Sol/Luna | Model picker incomplete | Fixed by [PR #5940](https://github.com/HKUDS/nanobot/pull/5940) |
| 8 | **Resolved / lower current risk** | Closed | [PR #5949](https://github.com/HKUDS/nanobot/pull/5949) — `web_fetch` failures reported as success | Agent may misinterpret failed fetches | Closed PR |
| 9 | **Resolved / lower current risk** | Closed | [PR #5861](https://github.com/HKUDS/nanobot/pull/5861) — fallback tokenizer warm-up | Startup/tokenization latency improvement | Closed PR; related [Issue #5843](https://github.com/HKUDS/nanobot/issues/5843) closed |
| 10 | **Resolved / lower current risk** | Closed | [PR #5950](https://github.com/HKUDS/nanobot/pull/5950) — TUI saved session history empty | Regression after canonical event change | Closed PR |
| 11 | **Resolved / lower current risk** | Closed | [PR #5952](https://github.com/HKUDS/nanobot/pull/5952) — Codex title generation failure | Background title request fails for GPT-6 Astra | Closed PR |

**Stability assessment:** the project is actively fixing correctness and provider regressions, but the most serious open issues are **workspace file safety** and **agent availability in privileged/sudo scenarios**.

## 6. Feature Requests & Roadmap Signals

Likely near-term signals based on open Issues and PRs:

- **WebUI streaming metrics**:  
  [Issue #5908](https://github.com/HKUDS/nanobot/issues/5908) requests live `tokens/sec` during streaming. High visibility from WebUI users; likely candidate if prioritized.

- **Provider expansion**:  
  - [PR #5955](https://github.com/HKUDS/nanobot/pull/5955) — Claude on Vertex AI  
  - [PR #5947](https://github.com/HKUDS/nanobot/pull/5947) — Tsubasa provider metadata  
  - [PR #5945](https://github.com/HKUDS/nanobot/pull/5945) — optional Unbrowse backend for `web_fetch`  

  These suggest continued investment in **multi-provider support** and optional enrichment backends.

- **Subagent reliability and orchestration**:  
  - [PR #5811](https://github.com/HKUDS/nanobot/pull/5811) — persist subagent sessions through shared execution  
  - [PR #5954](https://github.com/HKUDS/nanobot/pull/5954) — aggregate concurrent subagent results  

  These indicate a roadmap direction toward **durable, inspectable subagent workflows**.

- **Crash recovery and checkpoint durability**:  
  [PR #5946](https://github.com/HKUDS/nanobot/pull/5946) proposes persisting completed tool results at execution-batch boundaries, likely to reduce data loss after gateway crashes.

- **Exec safety**:  
  [PR #5957](https://github.com/HKUDS/nanobot/pull/5957) enforces hard exec timeouts independently of polling, a likely safety improvement for long-running commands.

- **File tool atomicity**:  
  [PR #5953](https://github.com/HKUDS/nanobot/pull/5953) is marked **p0** and addresses torn writes/crash-window loss, so it is a strong candidate for the next stable change.

## 7. User Feedback Summary

**Main pain points:**

- **Unavailable agent after authorization expiry**:  
  [Issue #5924](https://github.com/HKUDS/nanobot/issues/5924) reports that sudo lasts only one turn, causing the agent to loop and become unusable. This is a high-severity usability and reliability complaint.

- **Feishu channel leaks internal messages**:  
  [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) and [Issue #5956](https://github.com/HKUDS/nanobot/issues/5956) show that compaction/checkpoint markers and notices are being sent to users, creating confusion and channel noise.

- **New GPT-6 models not fully supported**:  
  [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898) reports GPT-6 failure through GitHub Copilot. Although [Issue #5939](https://github.com/HKUDS/nanobot/issues/5939) for Codex model discovery was closed by [PR #5940](https://github.com/HKUDS/nanobot/pull/5940), Copilot-side support remains an open user concern.

- **Performance visibility in WebUI**:  
  [Issue #5908](https://github.com/HKUDS/nanobot/issues/5908) reflects a need to see whether the model is generating normally or stalling.

- **Workspace integrity under concurrency**:  
  [Issue #4798](https://github.com/HKUDS/nanobot/issues/4798) reports concurrent file writes causing corruption, suggesting that multi-session or multi-agent workspace safety is an emerging concern.

**Observed use cases:**

- Feishu/Lark channel deployments with compaction and notification behavior.
- GitHub Copilot / OpenAI Codex usage with GPT-6 models.
- WebUI streaming and performance monitoring.
- Multi-session workspace operations and file editing.
- Subagent delegation and long-running execution.

**Sentiment:** Mixed. Users are proactive and provide detailed repros, but dissatisfaction is concentrated around **agent availability**, **channel message hygiene**, **provider coverage**, and **workspace safety**. Maintainer responsiveness appears high given the volume of recent PRs, but unresolved p0/p1 items remain a friction point.

## 8. Backlog Watch

Items needing maintainer attention:

| Item | Age / status | Why it needs attention |
|---|---|---|
| [Issue #4798](https://github.com/HKUDS/nanobot/issues/4798) | Open since 2026-07-06 | Long-lived data-corruption risk; related p0 fix [PR #5953](https://github.com/HKUDS/nanobot/pull/5953) needs review/merge decision |
| [Issue #5924](https://github.com/HKUDS/nanobot/issues/5924) | Open since 2026-09-26, p1, 5 comments | High-severity availability bug; no visible fix PR yet |
| [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) | Open since 2026-09-24, 4 comments | User-visible internal message leakage on Feishu; needs channel/hidden-message fix |
| [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898) | Open since 2026-09-24, 3 comments | GPT-6 via Copilot remains broken; important for current model support |
| [PR #5811](https://github.com/HKUDS/nanobot/pull/5811) | Open since 2026-09-18 | Architectural subagent persistence change; needs review before subagent features can rely on it |
| [PR #5920](https://github.com/HKUDS/nanobot/pull/5920) | Open since 2026-09-26 | Unicode-safe token truncation; correctness issue for multilingual text and emoji |
| [PR #5946](https://github.com/HKUDS/nanobot/pull/5946) | Open since 2026-09-28 | Crash-recovery improvement for tool-batch checkpoints; important for durability |
| [PR #5957](https://github.com/HKUDS/nanobot/pull/5957) | Open since 2026-09-28 | Exec timeout enforcement; safety/reliability improvement |
| [Issue #5843](https://github.com/HKUDS/nanobot/issues/5843) | Closed, but no linked fix shown in data | If latency was not fully resolved, this may need re-verification after [PR #5861](https://github.com/HKUDS/nanobot/pull/5861) |

**Backlog risk:** The biggest backlog concern is not volume, but the presence of **long-standing correctness issues** and **new p0/p1 reliability work** that should be prioritized before the next release.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest for 2026-09-29

## Today's Overview
Picoclaw is a powerful and intuitive AI assistant, providing users with various tools to enhance their daily lives. The project has experienced significant activity with 7 issues opened, 7 PRs updated, and no new releases.

## Releases
No new versions were released today.

## Project Progress
Today, the following PRs were merged/closed:
- `3378` (fix(auth): use configured scopes instead of hardcoded default in RefreshAccessToken)
- `3354` (feat(irc): assemble IRCv3 multiline messages)
- `3404` (Reliability fixes with reproducers)
- `3405` (Reliability fixes with private vulnerability reporting)
- `3404` (Reliability fixes with Reload)
- `3400` (fix(config): persist all api_keys and enabled flag of multi-key models)
- `3399` (fix(updater): select the matching 32-bit ARM release asset)
- `3370` (feat(tools): add Keenable web search provider)

## Community Hot Topics
The most active issues are related to security audits, particularly those related to `2026-02-16` and `2026-02-16`, which have received over 14 comments each.

## Bugs & Stability
Today, two bugs were reported: one affecting the agent system's stability and another causing the chat input to be very laggy when there's a lot of text in the conversation. Both have been fixed as of today's update.

## Feature Requests & Roadmap Signals
There are no new feature requests or roadmap signals reported today.

## User Feedback Summary
Users have reported issues such as the chat input being very laggy and the need for more customizable providers. These are currently not being addressed due to stability concerns.

## Backlog Watch
There are no long-unanswered important issues or PRs requiring maintainer attention today.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>



# NullClaw Project Digest — 2026-09-29

---

## 1. Today's Overview

NullClaw remains actively maintained with 17 issues and 7 pull requests updated in the last 24 hours. The project shows a strong closing ratio (16 of 17 issues closed, 6 of 7 PRs merged/closed), indicating healthy triage velocity. No new releases were published today, though a version bump for `v20260929` was landed via PR #1014. The open issue count is low (1 open issue), suggesting the backlog is being kept in check. Overall project health is **strong**, with consistent community contributions across channels, providers, and documentation.

---

## 2. Releases

**No new releases published today.** PR #1014 by `elwina` closed with a version bump to `v20260929` and included the following changes:

- Pin web search to the configured provider; stop Exa from rejecting duplicate `Content-Type` headers
- Strip Markdown markers before official QQ replies
- Version bump to `v20260929`

A release artifact has not yet been published as of this digest date.

---

## 3. Project Progress

**Merged/Closed PRs (6):**

| PR | Author | Summary |
|---|---|---|
| [#1014](https://github.com/nullclaw/nullclaw/pull/1014) | elwina | v20260929 release — web search pinning, Exa header fix, QQ Markdown stripping |
| [#990](https://github.com/nullclaw/nullclaw/pull/990) | MVS-source | Add Eden AI as an OpenAI-compatible gateway provider |
| [#319](https://github.com/nullclaw/nullclaw/pull/319) | qxo | Fix DingTalk message sending & recall support via official Bot API |
| [#527](https://github.com/nullclaw/nullclaw/pull/527) | sanderdewijs | Adaptive intelligence pipeline + email/WhatsApp Web channels |
| [#667](https://github.com/nullclaw/nullclaw/pull/667) | sanderdewijs | Full bidirectional IMAP email polling with IDLE and network resilience |
| [#411](https://github.com/nullclaw/nullclaw/pull/411) | qxo | Tool customization system with trigger-based prioritization |

**Open PRs (1):**

- [#1013](https://github.com/nullclaw/nullclaw/pull/1013) — `feat(providers): add Tsubasa chat-completions provider` (open, awaiting review)

**Key advances:** The project is expanding its provider ecosystem (Eden AI, Tsubasa), hardening messaging channels (DingTalk recall, IMAP IDLE), and introducing a post-turn adaptive learning pipeline. Tool customization is now a first-class feature.

---

## 4. Community Hot Topics

**Most discussed issues (by comments):**

1. **[#861](https://github.com/nullclaw/nullclaw/issues/861)** — *How to enable the Web UI on headless VPS server?* (5 comments) — End-user frustration with terse, jargon-heavy setup docs. Signals a need for a plain-language Web UI guide, especially for VPS/self-hosted scenarios.

2. **[#190](https://github.com/nullclaw/nullclaw/issues/190)** — *Subagent spawn with per-agent providers* (5 comments) — Users want multi-agent setups where each subagent can use a different LLM provider. This is a recurring architectural request.

3. **[#354](https://github.com/nullclaw/nullclaw/issues/354)** — *Service stops working after Homebrew upgrade* (5 comments) — Hardcoded Cellar path in LaunchAgent plist causes silent daemon failure post-upgrade. A practical pain point for macOS users.

4. **[#613](https://github.com/nullclaw/nullclaw/issues/613)** — *Improve config.json option descriptions* (3 comments, 👍 4) — Highest-reacted issue. Newcomers struggle with undocumented config keys. Strong community signal that onboarding docs need investment.

5. **[#764](https://github.com/nullclaw/nullclaw/issues/764)** — *Add NullClaw logo to official Agent Skills client list* (5 comments) — Community visibility play; the maintainers' response will signal openness to ecosystem integration.

---

## 5. Bugs & Stability

| Severity | Issue | Summary | Fix PR? |
|---|---|---|---|
| **High** | [#408](https://github.com/nullclaw/nullclaw/issues/408) | Tool call parsing breaks valid JSON — colon extracted as tool name instead of `memory_recall` | No known fix PR |
| **High** | [#354](https://github.com/nullclaw/nullclaw/issues/354) | Homebrew upgrade silently kills the daemon (hardcoded Cellar path) | No known fix PR |
| **Medium** | [#665](https://github.com/nullclaw/nullclaw/issues/665) | `error.NoResponseContent` on Windows x86_64 binary | No known fix PR |
| **Medium** | [#477](https://github.com/nullclaw/nullclaw/issues/477) | Feishu (Lark) WebSocket disconnects | No known fix PR |
| **Low** | [#932](https://github.com/nullclaw/nullclaw/issues/932) | Invalid Zig version in docs (0.15.2 → need 0.16.0+) | No known fix PR |
| **Low** | [#473](https://github.com/nullclaw/nullclaw/issues/473) | README benchmark table outdated (binary size, memory) | No known fix PR |

**Notable:** Two high-severity bugs — JSON parsing (#408) and Homebrew service regression (#354) — remain without merged fix PRs. The parsing bug in particular could affect any workflow relying on tool calls with colon-containing names or certain JSON formats.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Community Signal |
|---|---|---|
| Vision/multimodal pipeline (auto base64 for images) | [#624](https://github.com/nullclaw/nullclaw/issues/624) | Requested by power user; currently worked around via custom skill |
| `GET /status` endpoint for agent monitoring | [#631](https://github.com/nullclaw/nullclaw/issues/631) | 👍 1; enables external dashboards — aligns with ops-oriented users |
| ddgs metasearch integration | [#623](https://github.com/nullclaw/nullclaw/issues/623) | Expands web search beyond current providers |
| Subagent spawning with per-agent providers | [#190](https://github.com/nullclaw/nullclaw/issues/190) | Architectural feature; high interest from multi-agent users |
| Tsubasa provider support | [#1013](https://github.com/nullclaw/nullclaw/pull/1013) | **Already in PR** — likely next release |
| Agent Skills client list inclusion | [#764](https://github.com/nullclaw/nullclaw/issues/764) | Ecosystem visibility; low engineering effort |

**Prediction for next release:** Tsubasa provider (#1013) is the strongest candidate. The `/status` endpoint (#631) and vision pipeline (#624) are also likely given their practical utility and prior discussion depth.

---

## 7. User Feedback Summary

**Pain points:**
- **Onboarding friction** is the dominant theme. Issues #861 (Web UI setup), #613 (config descriptions), and #473 (outdated README) all point to documentation gaps that confuse newcomers.
- **Tool call parsing is fragile** (#408). Users report the parser incorrectly extracting `:` as a tool name from valid JSON, which breaks memory and other tool flows.
- **Channel reliability** remains a concern: DingTalk was send-only (#376, now partially fixed by #319), Feishu WebSocket drops (#477), and DingTalk recall was missing (#319).
- **Homebrew upgrade breakage** (#354) is a silent failure that frustrates macOS users who expect `brew upgrade` to be safe.

**Satisfaction signals:**
- The adaptive intelligence pipeline (#527) and bidirectional email (#667) PRs show the project is delivering on power-user requests.
- Provider diversity is expanding (Eden AI, Tsubasa), reducing vendor lock-in concerns.
- Tool customization (#411) gives advanced users more control.

---

## 8. Backlog Watch

| Item | Age | Risk | Note |
|---|---|---|---|
| [#408](https://github.com/nullclaw/nullclaw/issues/408) — Tool call JSON parsing bug | ~6.5 months | **High** | No fix PR; affects core agent functionality |
| [#354](https://github.com/nullclaw/nullclaw/issues/354) — Homebrew upgrade kills daemon | ~6.5 months | **High** | No fix PR; regression in standard install path |
| [#190](https://github.com/nullclaw/nullclaw/issues/190) — Subagent per-provider spawning | ~7 months | Medium | Architectural request; no active PR |
| [#624](https://github.com/nullclaw/nullclaw/issues/624) — Vision pipeline | ~6.5 months | Medium | Workaround exists (custom skill) but native support desired |
| [#613](https://github.com/nullclaw/nullclaw/issues/613) — Config doc improvements | ~6.5 months | Low-Med | 👍 4; high community value, low engineering cost |
| [#764](https://github.com/nullclaw/nullclaw/issues/764) — Agent Skills listing | ~5.5 months | Low | Awaiting maintainer response; easy win for visibility |

**Recommendation:** The two high-severity bugs (#408, #354) have been open for over 6 months without a fix PR. Prioritizing these would significantly improve stability and user trust. Issue #613, despite lower severity, has the best ROI — improved config descriptions would address the most common onboarding complaint at minimal cost.

---

*Generated from GitHub data as of 2026-09-29. Data source: [github.com/nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest
**Date:** 2026-09-29
**Repository:** netease-youdao/LobsterAI

---

## 1. Today's Overview
LobsterAI maintains a moderate development pace with 5 open issues and 14 pull requests updated in the last 24 hours. The project is currently stabilizing core infrastructure components (OpenClaw gateway, IPC security) and refining the user interface for agent management and workflow visualization. Overall health appears stable, with a focus on bug fixing and dependency management rather than major feature releases.

## 2. Releases
**No new releases were published in the last 24 hours.**

## 3. Project Progress
The project saw significant consolidation today with **11 merged or closed pull requests**, compared to only 3 open. Key progress areas include:
*   **Workflow Visualization:** Enhancements to the `Cowork` and `OpenClaw` integrations to improve how long-running agent tasks (e.g., deck generation) are displayed in the UI.
*   **Gateway Stability:** Fixes to prevent the OpenClaw gateway from starting multiple times on launch and resolving PID lock contention issues on Windows.
*   **Document Editing:** Implementation of support for editing PPT/Word/Excel documents.
*   **Security Hardening:** A critical fix was merged to validate URL protocols in the `shell:openExternal` IPC handler, preventing arbitrary protocol execution.

## 4. Community Hot Topics
*   **[Issue #968]** *Agent Skill Output Localization* (Open)
    *   **Context:** Users report that when using the `skill-creator` to query local weather (e.g., Hangzhou), the browser preview data displays incorrectly (not local) and fails to close.
    *   **Analysis:** This indicates a gap between the agent's internal execution state and the UI rendering of browser previews or a state management issue in the skill invocation lifecycle.
*   **[Issue #971]** *Hallucination and Context Drift* (Open)
    *   **Context:** Users report the model generating irrelevant content (e.g., unrelated text) when asked to generate novel cover art, suggesting potential issues with prompt injection or tool output parsing.
*   **[Issue #973]** *macOS Shortcut UI* (Open)
    *   **Context:** macOS users see `Ctrl` keys instead of standard `Cmd` keys in the settings panel, breaking native OS conventions.
    *   **Analysis:** A UI/UX localization bug affecting macOS users specifically.

## 5. Bugs & Stability
**Critical Security Fix (Merged):**
*   **[PR #1034]** **Security:** Fixed arbitrary protocol execution risk. The `shell:openExternal` IPC handler previously accepted any URL without protocol validation, allowing access to `file://` or custom protocols. The fix now enforces `http`/`https` only.
*   **[PR #975]** **IM Gateway:** Fixed a scenario where the Xiaomifeng gateway became unrecoverable after a "kicked-offline" event.
*   **[PR #1037]** **Build/Env:** Fixed "node not found" errors on Windows when running OpenClaw scripts in environments like Git Bash alongside WSL.

**Open Stability Issues:**
*   **[Issue #972]** **AI Engine Hang:** Users report the app gets stuck on "AI Engine Starting Gateway" after restarting the QWEN model, with repeated pop-ups and failure to reconnect even after success.
*   **[Issue #1035]** **Message Deduplication:** A stale issue (updated recently) regarding message deduplication caches not clearing after reconnection, causing legitimate messages to be silently dropped.

## 6. Feature Requests & Roadmap Signals
*   **UI/UX Improvements:**
    *   **macOS Shortcuts (Issue #973):** High priority for native compatibility.
    *   **Agent Modal Overflow (PR #969):** Fixed, but highlights the need for better responsive design in modal dialogs.
*   **Editor Features:**
    *   **Document Editing (PR #2776):** Support for PPT/Word/Excel editing is a significant step toward a full productivity suite, likely to be part of a future release cycle.

## 7. User Feedback Summary
*   **Positive:** The community is actively testing new OpenClaw integrations and document editing features, with several PRs merged successfully.
*   **Negative/Pain Points:**
    *   **"Stale" Issues:** A significant portion of reported issues (marked as [stale]) have been sitting open for months (March 2026), suggesting a backlog of unaddressed bugs or feature requests.
    *   **Model Reliability:** Users are experiencing hallucinations and context drift, particularly in creative tasks (cover generation).
    *   **Environment Complexity:** Users running complex setups (WSL + Git Bash + Windows) are facing build and execution issues.

## 8. Backlog Watch
*   **[Issue #968]** *Skill Preview Data Error*: The most recently active issue regarding agent skill behavior suggests a regression or unfinished feature in the browser preview component.
*   **[Issue #971]** *Hallucination*: A persistent issue with content generation quality that requires model tuning or prompt engineering improvements.
*   **Stale Issues**: There are 4 issues marked as [stale] from March 2026 that have received recent activity but remain unresolved (e.g., #968, #971, #972, #973). These likely require triage to determine if they are still valid or can be closed.

---
**Data Source:** GitHub (netease-youdao/LobsterAI)

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

### **Moltis Project Digest**  
**Date:** 2026-09-29  

---

### **1. Today's Overview**  
Moltis remains relatively dormant with zero new issues or releases in the past 24 hours. Activity is minimal, with only one open pull request (PR #1288) addressing a new provider integration. The project appears to be in a maintenance or low-activity phase, with no critical alerts or urgent concerns reported.  

---

### **2. Releases**  
**No new releases** in the last 24 hours.  

---

### **3. Project Progress**  
- **Merged/Closed PRs Today:** None.  
- **Key Activity:** PR #1288 proposes adding the **Tsubasa provider**, expanding the OpenAI-compatible registry with support for custom models (`tsubasa-fast`, `tsubasa-pro`) and context windows of 32,768 tokens.  

---

### **4. Community Hot Topics**  
- **PR #1288 (Tsubasa Provider):**  
  - **URL:** [moltis-org/moltis PR #1288](https://github.com/moltis-org/moltis/pull/1288)  
  - **Summary:** Integrates Tsubasa as a new AI provider, with configuration via `TSUBASA_API_KEY`, custom endpoints, and model templates.  
  - **Underlying Need:** Users seek broader compatibility with emerging AI providers and standardized model registries.  

---

### **5. Bugs & Stability**  
**No bugs, crashes, or regressions** reported today.  

---

### **6. Feature Requests & Roadmap Signals**  
- **Tsubasa Provider Integration (PR #1288):**  
  - **Signal:** Likely to appear in the next minor release if merged, reflecting demand for flexible provider setups.  
  - **Potential Future:** Additional provider support (e.g., local models, niche APIs) may follow.  

---

### **7. User Feedback Summary**  
**No direct user feedback** captured today.  

---

### **8. Backlog Watch**  
- **No unaddressed critical issues** detected.  
- **PR #1288** (Tsubasa integration) is the only active item requiring maintainer review.  

---

**Project Health:** Stable but low activity. The community is focused on incremental improvements (new providers) rather than major overhauls.  
**GitHub Links:**  
- [Moltis Repository](https://github.com/moltis-org/moltis)  
- [PR #1288](https://github.com/moltis-org/moltis/pull/1288)

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest: 2026-09-29

## 1. Today's Overview
CoPaw shows healthy development momentum with 22 active updates (5 open issues, 12 open PRs) in the last 24 hours. The project is currently in a "bug-fix and polish" phase, addressing context management instability and UI/UX refinements. While no new releases are scheduled, the high volume of first-time contributor PRs indicates a growing community and active maintenance cycle.

## 2. Releases
**None** — No new versions were released in the last 24 hours.

## 3. Project Progress
*   **Closed PRs (3):** Significant progress was made on context management and UI stability.
    *   **Context & Media:** PR #7965 (merged) fixed the critical "media payload accumulation" issue, reclaiming historical media in Scroll and aligning thinking omission with token counting.
    *   **Console UI:** PR #7956 (merged) unified settings UX and fixed conversation transition flashes.
    *   **Portability:** PR #7953 (merged) addressed asset import failure handling.
*   **Open PRs (16):** A strong focus on stability and performance.
    *   **Context Safety:** PR #8010 (First-time contributor) aims to fix session crashes caused by oversized images, and PR #7871 addresses a truncation bypass vulnerability.
    *   **Task Management:** PR #8007 (First-time contributor) fixes TaskTracker zombie entries, ensuring the dashboard accurately reflects running tasks.
    *   **Durable History:** PR #7931 introduces durable paginated transcript history using SQLite.
    *   **Performance:** PR #8004 optimizes CLI startup by lazy-importing `init_cmd`.

## 4. Community Hot Topics
*   **[Bug] Oversized image context causing permanent session failure (#8009)**
    *   **Link:** [agentscope-ai/QwenPaw Issue #8009](https://github.com/agentscope-ai/QwenPaw/issues/8009)
    *   **Analysis:** A critical stability issue where an oversized image causes a session to become permanently unusable. The rejected payload remains in the context, causing 400 errors on every subsequent request.
*   **[Feature] Aliyun Token Plan Model Configuration (#7990)**
    *   **Link:** [agentscope-ai/QwenPaw Issue #7990](https://github.com/agentscope-ai/QwenPaw/issues/7990)
    *   **Analysis:** Users report that Console UI controls (Thinking level/Reasoning effort) are hidden for specific models because the model catalog is missing the `thinking_param_style` declaration.
*   **[Bug] Windows COM Sandbox Bypass (#8002)**
    *   **Link:** [agentscope-ai/QwenPaw Issue #8002](https://github.com/agentscope-ai/QwenPaw/issues/8002)
    *   **Analysis:** A security-related bug where, with Windows "auto" approval and sandbox disabled, an agent can execute destructive inline Office COM commands (like closing PowerPoint) that should be blocked.

## 5. Bugs & Stability
1.  **Critical: Context Window Exhaustion (#7853, #8009):** The `ToolResultPruner` skips `type="data"` blocks (like base64 images), causing unbounded accumulation. A related PR (#8010) is currently open to handle payload rejections gracefully to prevent session death.
2.  **Dashboard Inconsistency (#7991):** The dashboard reports a higher count of running tasks than the chat API returns, likely due to `TaskTracker` zombie entries.
3.  **Windows Path Handling (#8003):** Cross-platform path handling issues are causing test failures, specifically with file attachment names and AppContainer cleanup logs.

## 6. Feature Requests & Roadmap Signals
*   **Agent Lifecycle Management (#4525):** A long-standing request for "Agent self-managed context lifecycle" with auto-checkpoints for cron tasks. While not new, the persistence of this issue suggests a need for long-running agent stability improvements.
*   **Thinking Parameter UI (#7990):** The request to update the model catalog for Aliyun models indicates a push for better support of reasoning/thinking features across diverse providers.

## 7. User Feedback Summary
*   **Frustration with UI:** Users are experiencing UI inconsistencies, specifically with the "Thinking level" dropdowns being hidden or non-functional for certain models, and settings UX being disjointed.
*   **Session Reliability:** Users are reporting that sessions die permanently due to media handling failures, highlighting a need for more robust context recovery mechanisms.
*   **Security Concerns:** There is active feedback regarding the safety of Office automation on Windows, specifically regarding the ability to bypass sandbox controls.

## 8. Backlog Watch
*   **Feature: Agent Self-Managed Context Lifecycle (#4525):** Created May 2026, last updated Sept 28. This issue has significant implications for long-running workflows but has seen very low activity, likely requiring a maintainer to evaluate feasibility.
*   **Feature: Thinking Parameter UI for Aliyun (#7990):** Created Sept 25, last updated Sept 28. A specific configuration gap that requires catalog maintenance rather than code changes.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

### **ZeptoClaw Project Digest**

**Date:** 2026-09-29
**Project:** ZeptoClaw (github.com/qhkm/zeptoclaw)

---

#### **1. Today's Overview**
ZeptoClaw experienced low but focused activity today, characterized by a high density of technical improvements rather than feature additions. The project remains stable with zero new releases, focusing on refining tool execution handling to prevent data loss. While community engagement is currently minimal, the active maintenance of core utilities indicates a healthy development cycle.

#### **2. Releases**
**None.** No new versions have been published in the last 24 hours.

#### **3. Project Progress**
*   **Merged PRs:** 0
*   **Closed PRs:** 0
*   **Activity:** The development team has not merged any pull requests yet today. However, a significant technical improvement regarding output handling has been drafted in a Pull Request.

#### **4. Community Hot Topics**
Currently, there are no issues or PRs with significant community engagement (comments or reactions).
*   **Topic:** Users are inquiring about architectural capabilities.
    *   *Issue #709:* User asks about the existence of a "goal mode" similar to other agents.

#### **5. Bugs & Stability**
*   **Severity: Medium**
    *   **Issue #707:** A bug was identified where oversized tool outputs (over 2,000 lines or 50KB) were being **discarded** rather than handled gracefully. The current implementation truncates the output and discards the bytes, leaving the model with no way to retrieve the missing information.
    *   **Fix Status:** A fix is proposed in **PR #708**. The solution involves spilling oversized output to a safe file location (`~/.zeptoclaw/sessions/<key>/spill/`) and replacing the full context with a preview and path, ensuring data integrity.

#### **6. Feature Requests & Roadmap Signals**
*   **Goal Mode:** **Issue #709** asks if ZeptoClaw supports a "goal mode" (e.g., `/goal`) where the agent continues working autonomously until a specific condition is met.
    *   *Roadmap Signal:* This is a common feature request in agent-based workflows. If implemented, it would signal a shift toward more autonomous, long-running agent sessions.

#### **7. User Feedback Summary**
*   **Pain Point:** Users are concerned about data loss during tool execution. The reported inability to retrieve truncated output (Issue #707) suggests a need for robust context handling during large data operations.
*   **Satisfaction:** Neutral to Positive. The project is currently stable, but the lack of feedback indicates a period of low user activity or that active users are focused on the existing features.

#### **8. Backlog Watch**
*   **Issue #709:** A feature request regarding "goal mode" has been open for 1 day with zero comments. While not critical, it highlights a gap in feature parity with competing tools (like ohmypi) and warrants a response from the maintainers regarding future roadmap plans.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*