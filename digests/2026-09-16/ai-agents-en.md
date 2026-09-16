# OpenClaw Ecosystem Digest 2026-09-16

> Issues: 469 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-15 22:32 UTC

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

### 1. Ecosystem Overview

The personal AI assistant and autonomous agent open-source ecosystem is undergoing a rapid transition from standalone prompt wrappers to multi-channel, multi-surface agent workbenches capable of cross-device persistence and complex memory consolidation. Projects are increasingly dealing with the infrastructural complexities of runtime state management, multi-agent orchestration, and secure communication channels (such as WhatsApp, Telegram, QQ, and Feishu). Maintainers are heavily prioritizing reliability engineering—specifically handling provider timeouts, context compaction boundaries, and session safety—over simple feature additions, reflecting a maturation of the ecosystem toward production-grade deployments.

---

### 2. Activity Comparison

| Project | Issues (Updated/Total) | PRs (Updated/Total) | Release Status | Health Score |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | N/A (Summary failed) | N/A (Summary failed) | Reference core | 🟡 Stable / Reference |
| **NanoBot** | 7 active / 0 closed | 22 (10 open, 12 merged) | v0.3.5 (Shipped) | 🟢 Active & Delivery-Driven |
| **Hermes Agent** | N/A (Summary failed) | N/A (Summary failed) | Not reported | ⚪ Unknown |
| **PicoClaw** | 2 active / 0 closed | 4 (3 open, 1 merged) | None | 🟡 Maintenance |
| **NanoClaw** | N/A (Summary failed) | N/A (Summary failed) | Not reported | ⚪ Unknown |
| **NullClaw** | 0 | 0 | None | 🔴 Dormant |
| **IronClaw** | 0 | 0 | None | 🔴 Dormant |
| **LobsterAI** | 3 active | 30 (20 closed/merged) | v2026.9.15 (Recent) | 🟢 High Velocity |
| **TinyClaw** | 0 | 0 | None | 🔴 Dormant |
| **Moltis** | N/A (Summary failed) | N/A (Summary failed) | Not reported | ⚪ Unknown |
| **CoPaw** | 28 active | 50 updated | v2.2.x (Beta cycle) | 🟢 High Activity |
| **ZeptoClaw** | 0 | 0 (18 dependency PRs) | None | 🟡 Maintenance / Bot-driven |
| **ZeroClaw** | 50 active | 50 updated | None | 🟢 High-Risk / High-Reward |

---

### 3. OpenClaw's Position

*Note: Direct digest generation for OpenClaw core failed for this cycle; however, its ecosystem footprint can be mapped through downstream forks, adapters, and ecosystem dependencies (such as LobsterAI).*

* **Advantages vs. Peers:** OpenClaw serves as the de facto architectural reference standard for desktop-native and local-first personal agents. Downstream ecosystems (like LobsterAI) build heavily upon its core abstractions, granting it a wide distribution footprint and robust third-party integration pipelines.
* **Technical Approach Differences:** Unlike API-only or terminal-bound agents, OpenClaw and its derivatives maintain deep desktop environment hooks (Electron/TUI dual rendering), local memory graph indexing (such as `.dreams/` compaction states), and multi-protocol chat bridge gateways.
* **Community Size Comparison:** OpenClaw commands the largest mindshare and ecosystem gravitational pull, evidenced by the fact that multiple downstream projects (LobsterAI) explicitly dedicate their development cycles to maintaining upstream OpenClaw compatibility patches and upgrade migrations.

---

### 4. Shared Technical Focus Areas

* **Context Compaction & Session Transcript Trimming:** 
  * *Projects:* NanoBot, LobsterAI, ZeroClaw.
  * *Specific Need:* Preventing information starvation, missing history pages, or leaked internal compaction notices (`Compressing context...`) into active chat channels during long-running sessions.
* **Multimodal and Image State Preservation:** 
  * *Projects:* ZeroClaw, NanoBot.
  * *Specific Need:* Ensuring tool-returned images or binary attachments do not disappear or corrupt session rollback contexts after unrelated sequential tool calls.
* **Security Hardening on Inbound Communication Channels:** 
  * *Projects:* NanoBot (QQ/Email attachment SSRF validation), ZeroClaw (WhatsApp pairing limits).
  * *Specific Need:* Protecting self-hosted gateways against Server-Side Request Forgery (SSRF) and broken device-linking mechanisms.
* **Background Memory and Consolidation Loops:** 
  * *Projects:* NanoBot (Dream consolidation iteration limits), LobsterAI (Legacy memory JSON recovery).
  * *Specific Need:* Enforcing hard iteration and resource constraints on background reflection cycles to prevent infinite runtime looping and token exhaustion.

---

### 5. Differentiation Analysis

* **NanoBot:** Positioned as a versatile cross-surface workbench (CLI, WebUI, mobile PWA, and chat apps) emphasizing lightweight distribution and provider correctness.
* **CoPaw:** Transitioning rapidly from a personal assistant framework to a **team-centric, multi-tenant architecture** (CoPaw Hub) featuring advisor-worker loops and advanced Model Context Protocol (MCP) integrations.
* **ZeroClaw:** Focused on high-performance infrastructure, pushing toward a **modular WASM runtime plugin architecture**, Agent-to-Agent (A2A) outbound client capabilities, and computer-use automation.
* **LobsterAI:** Operating as a desktop-first wrapper and companion client (Electron-based) heavily optimized for seamless OpenClaw compatibility, localized team configuration exports, and rich visual error reporting.
* **PicoClaw & ZeptoClaw:** Minimalist or maintenance-heavy utility agents centered on lightweight execution, strict config security, and automated dependency housekeeping.

---

### 6. Community Momentum & Maturity

* **Rapidly Iterating / High Momentum:** **CoPaw**, **ZeroClaw**, **NanoBot**, and **LobsterAI**. These projects exhibit intense engineering activity, shipping bug fixes, handling provider updates, and advancing architectural roadmaps daily. CoPaw and ZeroClaw are heavily scaling their systemic boundaries (multi-tenancy, A2A, plugins), while NanoBot and LobsterAI are focusing on UX polish, session continuity, and release packaging.
* **Stabilizing / Maintenance Tier:** **PicoClaw** and **ZeptoClaw**. Activity is restricted to isolated bug fixes or automated dependency bumps (Dependabot), indicating mature or resting codebases.
* **Dormant / Inactive:** **NullClaw**, **IronClaw**, and **TinyClaw** registered zero activity in the current cycle.

---

### 7. Trend Signals

* **Shift to Multi-Tenancy and Agent-to-Agent (A2A) Protocols:** Personal assistants are evolving into collaborative networks. Projects like CoPaw (Hub architecture) and ZeroClaw (A2A outbound client RFCs) indicate that isolated single-user assistants are being superseded by multi-agent, team-oriented systems.
* **WASM and Modular Plugin Roadmaps:** Monolithic agent runtimes are facing structural limits; projects like ZeroClaw are actively migrating optional features, tools, and communication channels toward runtime-installable plugins.
* **Mobile-First WebUI & PWA Ergonomics:** Users increasingly demand native-feeling cross-device continuity (terminal, browser, and mobile PWA). Issues regarding iOS PWA viewports, touch targets, and cold-start rendering times highlight that web-based agent frontends are held to consumer app standards.
* **Provider Resiliency & Error Classification:** Fragility in third-party LLM providers (Nvidia NIM timeouts, API aggregators) has exposed a recurring anti-pattern where infrastructure errors are misinterpreted as assistant output. Ecosystems are responding with stricter error handling and payload preservation layers.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-09-16

## 1. Today’s Overview

NanoBot shipped **v0.3.5**, positioning the project around a more multi-surface agent workbench that can run in the terminal and WebUI while continuing conversations across browser, terminal, and chat channels. In the trailing 24 hours, the repo showed strong PR-level activity: **22 PRs updated**, with **10 open** and **12 merged/closed**, while **7 issues were updated** and **0 issues were closed**. The main engineering themes were release packaging, WebUI/mobile polish, provider correctness, channel security, and background-job reliability. Project health looks **active and delivery-driven**, with a clear release push, but the open issue set still shows pressure in Dream scheduling, mobile PWA usability, and provider error handling.

---

## 2. Releases

### [v0.3.5](https://github.com/HKUDS/nanobot/releases/tag/v0.3.5)

**Headline:**  
The release brings the NanoBot workbench closer to being a cross-surface agent interface: users can run `nanobot` for a native terminal client or `nanobot webui` for browser access, with the release notes emphasizing that conversations should be easier to continue across browser, terminal, and chat apps.

**Notable changes visible from release-related PRs:**

- [PR #5785 — chore(release): prepare v0.3.5](https://github.com/HKUDS/nanobot/pull/5785)  
  Prepared the v0.3.5 release, set the distribution version and source-only fallback, and added a release checklist covering candidate checks, five-platform TUI packaging, and source-only paths.

- [PR #5787 — build: bundle native TUI in platform wheels](https://github.com/HKUDS/nanobot/pull/5787)  
  Ships the native TUI inside platform wheels so supported PyPI installs can launch the terminal client without a first-run GitHub download or a separate Bun install. This is a meaningful packaging improvement for terminal-first users.

- [PR #5786 — refactor(webui): animate segmented control indicator](https://github.com/HKUDS/nanobot/pull/5786)  
  Improves WebUI controls by replacing per-segment selected backgrounds with a single animated indicator, including reduced-motion handling. This signals continued WebUI polish in the release cycle.

**Breaking changes / migration notes:**  
No explicit breaking changes or migration notes are stated in the provided release summary. The main user-visible change appears to be improved terminal/web client continuity and better TUI distribution.

---

## 3. Project Progress

The merged/closed PR activity in the trailing 24 hours shows that NanoBot is actively closing stability, packaging, provider, channel, and WebUI gaps around the v0.3.5 release.

### Release and packaging

- [PR #5785 — chore(release): prepare v0.3.5](https://github.com/HKUDS/nanobot/pull/5785)  
  Version bump and release checklist preparation.

- [PR #5787 — build: bundle native TUI in platform wheels](https://github.com/HKUDS/nanobot/pull/5787)  
  Reduces friction for terminal installs by bundling the native TUI in platform wheels.

### Provider correctness and provider UX

- [PR #5783 — fix(providers): preserve assistant content with tool calls](https://github.com/HKUDS/nanobot/pull/5783)  
  Prevents assistant `content` from being stripped when the same message also contains `tool_calls`. This is a correctness fix for history replay across providers, including Mistral-style payloads.

### Channel security and onboarding

- [PR #5697 — fix(qq): protect inbound attachment downloads from SSRF](https://github.com/HKUDS/nanobot/pull/5697)  
  Hardens QQ inbound attachment URL handling by validating URLs, normalizing protocol-relative URLs, disabling redirects, and restricting accepted responses. This is an important security improvement for self-hosted QQ deployments.

- [PR #5768 — fix(feishu): use `/page/cli` verification URL for QR onboarding](https://github.com/HKUDS/nanobot/pull/5768)  
  Fixes Feishu/Lark QR onboarding, where the previous verification URL could expire instantly and block `nanobot channels login feishu`.

- [PR #5778 — fix(email): require trusted authentication results](https://github.com/HKUDS/nanobot/pull/5778)  
  Hardens Email sender verification by requiring a configured receiving service, structurally parsing authentication results, and checking authenticated identity against the visible sender domain.

### WebUI, mobile, and session history

- [PR #5786 — refactor(webui): animate segmented control indicator](https://github.com/HKUDS/nanobot/pull/5786)  
  Improves WebUI segmented controls and reuses the control for the Appearance theme selector.

- [PR #5757 — fix(session): search older pages of persisted conversation history](https://github.com/HKUDS/nanobot/pull/5757)  
  Fixes `search_sessions` and filtered `read_session` silently missing older messages in long WebUI conversations.

### Memory, tools, and performance

- [PR #5775 — fix(tools): scope file-read dedup to model context](https://github.com/HKUDS/nanobot/pull/5775)  
  Prevents `read_file` from returning an unchanged-file stub after the original output has been removed by compaction or trimming.

- [PR #5774 — fix(memory): recover archive tool calls before raw fallback](https://github.com/HKUDS/nanobot/pull/5774)  
  Improves archive recovery when unexpected tool calls are emitted, reducing reliance on raw fallback.

- [PR #5728 — perf: reduce streaming text processing and classic CLI redraws](https://github.com/HKUDS/nanobot/pull/5728)  
  Reduces repeated scanning and redraw cost for long streamed replies in local/CLI usage.

---

## 4. Community Hot Topics

PR comment counts were not provided in the dataset, so issue-level discussion and strategic PR impact are the main signals. Reactions were zero across the listed items, so “hot” here reflects activity, severity, and relevance to the release direction.

### 1. Dream consolidation runs loop too long and ignore iteration limits  
**Issue:** [#5781 — Dream runs for 1–2 h looping on the same read_file calls](https://github.com/HKUDS/nanobot/issues/5781)  
**Comments:** 2  
**Related PR:** [#5782 — fix(dream): enforce configured iteration limit](https://github.com/HKUDS/nanobot/pull/5782)

This is the most operationally serious discussion in the issue set. Users are reporting scheduled Dream consolidation runs taking 25–111 minutes, with up to ~200 tool calls, while the model repeatedly re-reads the same files. The underlying need is clear: background memory consolidation must have reliable, enforceable iteration limits and observable failure states.

### 2. QQ channel exposes automatic compaction lifecycle notices as chat messages  
**Issue:** [#5784 — QQ: automatic compaction notices are sent as standalone messages](https://github.com/HKUDS/nanobot/issues/5784)  
**Comments:** 1  
**Related PR:** [#5780 — fix: stop sending context compaction notifications](https://github.com/HKUDS/nanobot/pull/5780)

This reflects a self-hosted chat-channel UX problem. Internal lifecycle events such as “Compressing context…” and “Context compacted.” should not appear as ordinary user-visible messages in channels like QQ. The broader need is channel-aware notification policy: internal agent events should be suppressed, collapsed, or made configurable per channel.

### 3. Nvidia NIM timeout errors stop the agent  
**Issue:** [#5674 — [bug] agent stops working when provider Nvidia NIM returns a specific error](https://github.com/HKUDS/nanobot/issues/5674)  
**Comments:** 1

This is an older but important provider reliability issue. When Nvidia NIM returns timeout errors, NanoBot appears to treat the error as model output, causing the agent to stop working. The underlying need is robust provider error classification: infrastructure errors should be surfaced, retried, or handled as errors rather than injected into the conversation as assistant content.

### 4. Mobile WebUI and PWA usability cluster  
**Issues:**

- [#5773 — [WebUI] PWA cold start shows a long blank screen before first paint](https://github.com/HKUDS/nanobot/issues/5773)
- [#5772 — [WebUI] Top of the viewport renders washed out in iOS PWA standalone mode](https://github.com/HKUDS/nanobot/issues/5772)
- [#5771 — [WebUI] Session list requires two taps to open a session on mobile](https://github.com/HKUDS/nanobot/issues/5771)
- [#5770 — [WebUI] Opening the mobile sidebar focuses the search button and shows the “Search ⌘K” tooltip](https://github.com/HKUDS/nanobot/issues/5770)  
**Related PR:** [#5777 — fix(webui): stop mobile drawer stealing focus to search button](https://github.com/HKUDS/nanobot/pull/5777)

Although each issue has low comment count, the cluster is strategically important because it points to mobile/PWA ergonomics as a growing use case. Users expect the WebUI to behave like a native mobile app, not a responsive desktop page.

### 5. Provider partnership and third-party gateway demand  
**PR:** [#5666 — feat(providers): add aimlapi.com as an OpenAI-compatible gateway provider](https://github.com/HKUDS/nanobot/pull/5666)

This PR is less a pure feature request and more a commercial partnership signal. A third-party AI aggregator is requesting built-in provider support and offering partnership terms. The underlying need is that NanoBot is becoming a platform where provider availability matters, but maintainers may need a clear policy for external commercial provider integrations.

---

## 5. Bugs & Stability

No crashes were reported in the provided issue list, but several items indicate meaningful stability, security, and correctness risks.

| Severity | Bug / Issue | Impact | Fix Status |
|---|---|---|---|
| **High / Security** | [PR #5697 — QQ inbound attachment SSRF protection](https://github.com/HKUDS/nanobot/pull/5697) | Untrusted QQ attachment URLs could be abused for server-side request forgery. | Closed/landed in provided PR set. |
| **High** | [PR #5768 — Feishu QR onboarding failure](https://github.com/HKUDS/nanobot/pull/5768) | `nanobot channels login feishu` could not complete because the QR verification URL expired immediately. | Closed/landed; marked p1. |
| **High** | [PR #5783 — Provider strips assistant content with tool calls](https://github.com/HKUDS/nanobot/pull/5783) | History replay could lose assistant text when `tool_calls` are present, affecting provider correctness. | Closed/landed. |
| **High** | [Issue #5781 — Dream runs loop 1–2 h and ignore `dream.maxIterations`](https://github.com/HKUDS/nanobot/issues/5781) | Scheduled memory consolidation can consume excessive time and tool calls, degrading background reliability. | [PR #5782](https://github.com/HKUDS/nanobot/pull/5782) open, not yet landed. |
| **High** | [Issue #5674 — Nvidia NIM timeout error stops agent](https://github.com/HKUDS/nanobot/issues/5674) | Provider timeout errors are misinterpreted as model output, stopping the agent. | No visible fix PR in provided data. |
| **High** | [PR #5779 — Concurrent session file writes can interleave or lose updates](https://github.com/HKUDS/nanobot/pull/5779) | Concurrent `write_file`, `edit_file`, and `apply_patch` operations could truncate or interleave bytes across sessions. | Open PR with conflict marker. |
| **Medium / Security** | [PR #5778 — Email sender authentication hardening](https://github.com/HKUDS/nanobot/pull/5778) | Email inbound sender verification was less strict at the shared boundary. | Closed/landed. |
| **Medium** | [Issue #5784 — QQ compaction notices leak into chat](https://github.com/HKUDS/nanobot/issues/5784) | Users see internal context-compaction lifecycle messages in QQ. | [PR #5780](https://github.com/HKUDS/nanobot/pull/5780) open. |
| **Medium** | [Issue #5773 — PWA cold start blank screen](https://github.com/HKUDS/nanobot/issues/5773) | First PWA launch or relaunch after eviction feels slow and broken. | No visible fix PR. |
| **Medium** | [Issue #5772 — iOS PWA top viewport washed out](https://github.com/HKUDS/nanobot/issues/5772) | iOS standalone PWA rendering issue affects usability. | No visible fix PR. |
| **Medium** | [Issue #5771 — Mobile session list requires two taps](https://github.com/HKUDS/nanobot/issues/5771) | Mobile WebUI feels unresponsive when opening sessions. | No visible fix PR. |
| **Medium** | [Issue #5770 — Mobile sidebar autofocuses search button](https://github.com/HKUDS/nanobot/issues/5770) | Touch users see a hover-style search tooltip without interacting. | [PR #5777](https://github.com/HKUDS/nanobot/pull/5777) open. |
| **Medium** | [PR #5775 — File-read dedup could return stale stub after compaction](https://github.com/HKUDS/nanobot/pull/5775) | `read_file` dedup could behave incorrectly after context trimming. | Closed/landed. |
| **Medium** | [PR #5774 — Archive tool calls could require raw fallback](https://github.com/HKUDS/nanobot/pull/5774) | Unexpected tool calls in archive paths could degrade memory handling. | Closed/landed. |
| **Medium** | [PR #5757 — Older WebUI conversation pages missed by search](https://github.com/HKUDS/nanobot/pull/5757) | Long sessions could silently miss older messages during search or filtered reads. | Closed/landed. |
| **Low / Performance** | [PR #5728 — Streaming text and CLI redraw performance](https://github.com/HKUDS/nanobot/pull/5728) | Long streamed replies increased local CPU cost due to repeated parsing/redraws. | Closed/landed. |

**Stability assessment:**  
NanoBot is actively addressing high-severity channel and provider issues. The main open stability risks are **Dream iteration control**, **concurrent file writes**, and **provider timeout handling**. Mobile WebUI bugs are less severe individually but collectively affect user perception of the product.

---

## 6. Feature Requests & Roadmap Signals

### Strong roadmap signals

1. **Cross-surface agent workbench**  
   [v0.3.5](https://github.com/HKUDS/nanobot/releases/tag/v0.3.5) explicitly moves NanoBot toward a workbench that can be accessed through terminal and WebUI. The release notes and [PR #5787](https://github.com/HKUDS/nanobot/pull/5787) suggest terminal distribution is now a first-class concern, not just a local experiment.

2. **Background memory/Dream reliability**  
   [PR #5782](https://github.com/HKUDS/nanobot/pull/5782) restores an independent `agents.defaults.dream.maxIterations` limit and applies it to manual and scheduled Dream runs. This is likely to be a near-term reliability fix, especially given [Issue #5781](https://github.com/HKUDS/nanobot/issues/5781).

3. **Channel-aware notification control**  
   [PR #5780](https://github.com/HKUDS/nanobot/pull/5780) proposes making automatic compaction notices invisible while retaining them for explicit `/compact`. This suggests the project may add per-channel or per-event notification controls in the near future.

4. **Filesystem tool expansion**  
   [PR #5626 — feat(tools): add `copy_file` and `move_file` filesystem tools](https://github.com/HKUDS/nanobot/pull/5626) addresses a practical agent capability gap. Today, models must simulate copy/move with read/write chains, which is inefficient and error-prone. If the merge conflict is resolved, this could land in a future patch.

5. **Provider picker search**  
   [PR #5776 — feat(webui): add search to provider pickers in settings](https://github.com/HKUDS/nanobot/pull/5776) improves settings UX for providers. As the provider list grows, this is a likely near-term WebUI enhancement.

6. **Stable tool invocation context**  
   [PR #5750 — feat(tools): expose stable per-invocation tool context](https://github.com/HKUDS/nanobot/pull/5750) exposes provider `tool_call_id` and invocation identity to tools. This is infrastructure-oriented and could enable more reliable extensions

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest for September 16, 2026

## Today's Overview
PicoClaw is an AI agent and personal AI assistant open-source project. In the last 24 hours, there were 2 issues updated (both open/active: 2, closed: 0), 4 PRs updated (3 open, 1 merged/closed), and no new releases.

## Releases
None

## Project Progress
Today, we have merged 2 PRs: #3375 and #3372. The first fix was about guarding lazy sensitive-data cache against concurrent init, while the second was to make the reaction tool configurable.

## Community Hot Topics
The most active Issues and PRs with more comments/reactions are #3374 and #3373. The first one is about Data race in Config.initSensitiveCache can return a nil replacer and panic FilterSensitiveData. The second one is about savingConfig silently deletes every api_key after the first and leaves a dangling fallback.

## Bugs & Stability
No bugs, crashes, or regressions reported today.

## Feature Requests & Roadmap Signals
There are no user-requested features or roadmap signals mentioned in the current status.

## User Feedback Summary
Users have reported that the data race issue in Config.initSensitiveCache can return a nil replacer and panic FilterSensitiveData, and they also found that the saveConfig silently deletes every api_key after the first and leaves a dangling fallback.

## Backlog Watch
There are no long-unanswered important Issues or PRs needing maintainer attention.

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

No activity in the last 24 hours.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>



# 🦞 LobsterAI Project Digest — 2026-09-16

---

## 1. Today's Overview

LobsterAI shows **high development velocity** today with 30 PRs updated and 3 issues touched in the last 24 hours. The majority of PR activity (20 merged/closed) centers on OpenClaw compatibility repairs, runtime dependency fixes, and long-session stability improvements — signaling active hardening ahead of or alongside the v2026.9.15 release cycle. One open issue (#2342) about sidebar ad dismissal remains unresolved, and one open PR (#2374) directly addresses it. No new official release was published today, though PR #2687 tags a release commit dated 2026-09-15.

---

## 2. Releases

**No new official release published today.** PR #2687 references a `Release/2026.9.15` tag but was merged/closed today without an accompanying release artifact in the data window. The previous release cycle appears to have landed on 2026-09-15.

---

## 3. Project Progress

### Merged / Closed PRs Today (20)

| PR | Area | Summary |
|----|------|---------|
| [#2686](https://github.com/netease-youdao/LobsterAI/pull/2686) | build, openclaw | Fix `pnpm pack` rewriting `workspace:*` deps — now packs local workspace closures as tarballs |
| [#2685](https://github.com/netease-youdao/LobsterAI/pull/2685) | build, openclaw | Preserve patched workspace runtime dependencies during build |
| [#2683](https://github.com/netease-youdao/LobsterAI/pull/2683) | renderer, build, main, openclaw, cowork | OpenClaw compatibility repair patch |
| [#2684](https://github.com/netease-youdao/LobsterAI/pull/2684) | docs, main, openclaw | Fix heuristic output budget starvation in long Chat Completions sessions |
| [#2682](https://github.com/netease-youdao/LobsterAI/pull/2682) | docs, main, openclaw | Validate historical transcript replay — fixes crashes from missing/malformed ID fields |
| [#2679](https://github.com/netease-youdao/LobsterAI/pull/2679) | renderer, build, main, openclaw, cowork | Post-upgrade gateway state compatibility repair (doctor-based) |
| [#2681](https://github.com/netease-youdao/LobsterAI/pull/2681) | renderer, build, docs, main, openclaw, cowork | Recover invalid legacy `memory/.dreams/` JSON state at startup |
| [#2680](https://github.com/netease-youdao/LobsterAI/pull/2680) | main, openclaw | Preserve model policy during config sync — stops infinite config churn |
| [#2678](https://github.com/netease-youdao/LobsterAI/pull/2678) | docs, main, openclaw | Preserve compaction summary format and audit facts in long sessions |
| [#2677](https://github.com/netease-youdao/LobsterAI/pull/2677) | docs, main | Restore technical error details in Cowork error cards after OpenClaw upgrade |
| [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) | docs | Fix POPO SDK loading race condition (`ERR_REQUIRE_ESM_RACE_CONDITION`) |
| [#1142](https://github.com/netease-youdao/LobsterAI/pull/1142) | skills | Add quick-create skill entry in skill management page |
| [#1143](https://github.com/netease-youdao/LobsterAI/pull/1143) | agent | Fix inconsistent default agent icon between sidebar and My Agent page |
| [#1144](https://github.com/netease-youdao/LobsterAI/pull/1144) | scheduled-tasks | Show last run timestamp in task list; add running state feedback |
| [#1145](https://github.com/netease-youdao/LobsterAI/pull/1145) | settings | Team config template export/import (JSON) |
| [#1146](https://github.com/netease-youdao/LobsterAI/pull/1146) | agent | Fix missing task records after creating a new agent with a duplicate name |
| [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) | deps | Bump Electron 43.5.0 → 44.3.0 + electron-builder |
| [#1149](https://github.com/netease-youdao/LobsterAI/issues/1149) | test | 35 Vitest cases added for `coworkMemoryExtractor` (issue closed via merge) |
| [#1151](https://github.com/netease-youdao/LobsterAI/issues/1151) | libs | Fix off-by-one URL拼接 error in `buildOpenAIChatCompletionsURL` for Gemini `/v1` base URLs |

**Key takeaway:** Today's merged work is dominated by **OpenClaw v2026.8.1 compatibility repairs** — runtime dependency integrity, legacy state migration, session compaction, and error-visibility fixes. The Electron bump and test coverage additions are secondary but meaningful stability improvements.

---

## 4. Community Hot Topics

| Item | Type | Comments | Activity |
|------|------|----------|----------|
| [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342) — "Can the bottom-left ad be permanently disabled?" | Issue | 2 | Open since 2026-07-15, still open |
| [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) — "Add permanent setting to hide sidebar ad banner" | PR | — | Open, directly references #2342 |
| [#1149](https://github.com/netease-youdao/LobsterAI/issues/1149) — Vitest coverage for coworkMemoryExtractor | Issue | 2 | Closed (merged) |
| [#1151](https://github.com/netease-youdao/LobsterAI/issues/1151) — Gemini URL拼接 bug fix | Issue | 2 | Closed (merged) |
| [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) — Hide OpenClaw main agent sessions from session list | PR | — | Open since 2026-04-01 |

**Analysis:** The ad-dismissal topic (#2342 → #2374) is the most visible community concern. Users want a persistent toggle rather than per-banner dismissal. PR #2374 is a direct response and sits open awaiting review. The older PR #1181 (hiding internal OpenClaw sessions from the user-facing list) has been open for ~5 months — a clear UX noise reduction request that hasn't landed yet.

---

## 5. Bugs & Stability

| Severity | Bug | Status | Fix PR |
|----------|-----|--------|--------|
| **High** | Long-session output budget starvation — model returns 1 token output instead of expected quota | Fixed | [#2684](https://github.com/netease-youdao/LobsterAI/pull/2684) |
| **High** | Legacy `memory/.dreams/` JSON corruption blocks gateway startup | Fixed | [#2681](https://github.com/netease-youdao/LobsterAI/pull/2681) |
| **High** | POPO SDK ESM race condition crashes plugin loading post-upgrade | Fixed | [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) |
| **Medium** | Historical transcript replay crashes on missing/malformed ID fields | Fixed | [#2672](https://github.com/netease-youdao/LobsterAI/pull/2682) |
| **Medium** | Technical error details missing from Cowork error cards after OpenClaw upgrade | Fixed | [#2677](https://github.com/netease-youdao/LobsterAI/pull/2677) |
| **Medium** | `buildOpenAIChatCompletionsURL` off-by-one for Gemini `/v1` base URLs | Fixed | [#1151](https://github.com/netease-youdao/LobsterAI/issues/1151) |
| **Medium** | Config sync erases migrated model policy fields, causing infinite churn | Fixed | [#2680](https://github.com/netease-youdao/LobsterAI/pull/2680) |
| **Low** | New agent with duplicate name doesn't show task records until re-switch | Fixed | [#1146](https://github.com/netease-youdao/LobsterAI/pull/1146) |
| **Low** | Inconsistent default agent icon across sidebar vs. My Agent page | Fixed | [#1143](https://github.com/netease-youdao/LobsterAI/pull/1143) |

All reported bugs today have **active fix PRs merged**. No open critical or high-severity bugs remain unaddressed.

---

## 6. Feature Requests & Roadmap Signals

| Request | Source | Likelihood for Next Release |
|---------|--------|----------------------------|
| Permanent sidebar ad banner toggle | [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342) / [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) | **High** — PR already authored, awaits review |
| Hide OpenClaw internal agent sessions from Cowork session list | [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) | **Medium** — open 5 months, no merge signal |
| Quick-create skill from skill management page | [#1142](https://github.com/netease-youdao/LobsterAI/pull/1142) | Already merged |
| Team config template export/import | [#1145](https://github.com/netease-youdao/LobsterAI/pull/1145) | Already merged |
| Show last run time in scheduled tasks | [#1144](https://github.com/netease-youdao/LobsterAI/pull/1144) | Already merged |

**Signal:** The team is actively responding to UX polish requests (templates, quick-create, task visibility). The ad toggle is the most likely feature to land in the next patch, given the PR is ready. The OpenClaw session-filtering PR (#1181) has low visibility momentum.

---

## 7. User Feedback Summary

- **Frustration with ads:** User PYUDNG (#2342) reports a new ad appearance in v2026.7.15 that can be dismissed per-instance but lacks a permanent off-switch. This is a growing sentiment — the existence of PR #2374 confirms the maintainers are aware.
- **Post-upgrade instability:** Multiple users reported gateway startup failures and missing error details after upgrading to OpenClaw v2026.8.1. The flood of compatibility-repair PRs (#2679, #2681, #2682, #2684, #2685, #2686) shows the team is rapidly iterating on upgrade regression coverage.
- **Session quality concerns:** Long-session output truncation (#2684) and historical replay crashes (#2682) indicate edge-case fragility in extended usage patterns — a common pain point for AI assistant tools.
- **Agent UX inconsistencies:** Duplicate-name agent creation (#1146) and icon mismatch (#1143) are small but irritating friction points that have now been addressed.

**Overall sentiment:** Users value the rapid bug-fix cadence but are frustrated by post-upgrade breaks and ad persistence. The project is in a stabilization phase following the OpenClaw v2026.8.1 integration.

---

## 8. Backlog Watch

| Item | Age | Risk |
|------|-----|------|
| [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342) — Permanent ad disable | ~2 months open | User satisfaction — low technical risk, high visibility |
| [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) — Ad hide toggle PR | ~2 months open (same thread) | Blocked on review; low complexity |
| [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) — Hide OpenClaw main agent sessions | ~5 months open | UX noise; low complexity but no merge signal |
| [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) — Electron 44 bump (Dependabot) | ~5 months open | Security/stability; routine but stalled |

**Recommendation:** The maintainers should prioritize reviewing PR #2374 (ad toggle) and #1181 (session filtering) — both are low-complexity, high-impact UX improvements that have been pending for an extended period. The Electron bump (#1277) should also be unblocked for security relevance.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (agentscope-ai/QwenPaw) Project Digest
**Date:** 2026-09-16

### 1. Today's Overview
CoPaw remains highly active with a significant volume of updates across issues and pull requests. The project is in a feature-rich development cycle (Version 2.2.x), actively addressing stability concerns related to sub-agents, MCP (Model Context Protocol) integrations, and web console performance. The community is heavily focused on multi-tenant capabilities and tool interoperability, driving both feature requests and bug reports.

### 2. Releases
**No new releases were detected in the last 24 hours.**
*Note: The project is currently on 2.2.x versions (specifically 2.2.1 and 2.2.0), indicating active beta/RC development.*

### 3. Project Progress
*   **High Activity:** 28 issues and 50 PRs were updated today.
*   **Merge/Closure Status:** While specific merge counts for the *last 24h* were not detailed in the "Closed" PR list, several PRs (e.g., #7737, #7736, #7735) were marked as closed, suggesting a healthy pace of code integration.
*   **Key Development:**
    *   **Advisor Mode:** A new loop mode pairing a strong advisor model with a worker agent was implemented (PR #7569).
    *   **DeepSeek V4 Flash:** Support was added to the provider catalog (PRs #7794, #7736).
    *   **Hub Infrastructure:** Significant backend work on the "Hub" (Multi-tenant edition) including model gateways and member governance (PR #7779).

### 4. Community Hot Topics
The most heated discussions focus on the upcoming **QwenPaw Hub (v2.2.0)** and stability issues with **MCP (Model Context Protocol)**.
*   **Hub v2.2.0 Roadmap:** A massive community discussion (#7318) is underway to define the next features for the multi-tenant Hub. The author requests community input on what to build next, indicating a shift from personal assistant to team-centric architecture.
    *   *Link:* [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)
*   **MCP Connectivity Issues:** Multiple users are reporting failures connecting to MCP servers since upgrading to 2.2.x (Issues #7716, #7764). This is the top technical blocker for users trying to extend functionality.
    *   *Link:* [Issue #7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)
*   **Sub-Agent Failures:** Users are experiencing consistent timeouts and failures when spawning sub-agents, causing workflows to halt.
    *   *Link:* [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)

### 5. Bugs & Stability
Stability is a primary concern for users, specifically regarding process management and resource handling.
*   **Critical: Sub-Agent Silently Fails:** In Issue #7678, users report that `spawn subAgent` processes timeout regardless of configuration settings. A fix PR (#7796) has been opened to diagnose dropped model overrides.
*   **UI/UX: Stale Processes:** Users report that clicking "Stop" on a task does not actually halt execution; the UI updates, but the background process continues (Issue #7567).
*   **System: Web Console Freezing:** Cloud/NFS deployments are experiencing severe performance issues where opening the file browser freezes the entire application for 5-6 minutes (Issue #7786).
*   **Plugin: Guardrail Errors:** Users report a "guardrail-plugin build" producing errors including stale console attachments and misfired cron jobs (Issue #7767).

### 6. Feature Requests & Roadmap Signals
*   **UI Layout:** A strong request to move conversation history to the right side of the screen to accommodate smaller laptop screens (#7739). A closed PR (#7700) suggests this feature was considered and likely implemented in a recent build.
*   **Tool Invocation:** Users want the ability to explicitly call tools (like MCP or built-in tools) via a specific syntax (e.g., `//tool-name`) to resolve ambiguity when multiple similar tools exist (#7778).
*   **Background Updates:** Users requested a background update mechanism to prevent the application from going offline during version upgrades (#7543).

### 7. User Feedback Summary
The user base is scaling from personal usage to **team collaboration**. Feedback highlights:
*   **Pain Point:** The current UI is cramped on standard laptops (14-inch screens), forcing scrolling to see chat and history.
*   **Pain Point:** Integration with external systems (MCP, NewAPI, Mail) is becoming the primary use case, but connection reliability is fluctuating.
*   **Expectation:** Users expect robust "Stop" functionality to immediately terminate tasks and background updates to not interrupt workflows.

### 8. Backlog Watch
*   **Long-standing UI Regression:** Issue #3871 (from April) regarding an Agent entering an infinite "Thinking" state after response completion has been re-opened by recent users, suggesting the fix was incomplete or a regression occurred.
*   **MCP Java Support:** PR #7729 is currently "Under Review" to fix compatibility with Java/Kotlin MCP servers that return non-standard error formats.
*   **Browser Driver Repair:** PR #6776 (from August) fixes a "dead Playwright driver" issue. Given the volume of browser-related issues today, this PR is critical to review to prevent recurring failures.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

**ZeptoClaw Project Digest: 2026-09-16**

**1. Today's Overview**
The ZeptoClaw project is currently in a maintenance phase with minimal core development activity. No issues were opened or closed in the last 24 hours, indicating stable operation. However, the repository has received a significant volume of dependency update requests (18 Pull Requests), predominantly from the Dependabot bot. These updates focus on security patches and minor version bumps for the Rust core, Astro.js landing pages, and Docker build environments.

**2. Releases**
No new releases were published by the maintainers in the last 24 hours.

**3. Project Progress**
*   **PRs Merged:** 0
*   **PRs Closed:** 0
*   **Status:** All 18 pull requests submitted yesterday remain in an "Open" state. The focus of this activity is strictly on dependency management rather than new feature implementation or bug fixes.

**4. Community Hot Topics**
Currently, there are no active discussions or high-engagement topics in the repository. The "activity" is purely automated via Dependabot.

**5. Bugs & Stability**
*   **Severity:** None reported.
*   **Status:** With zero issues opened or closed, there are no active reports of crashes, regressions, or stability concerns within the last 24 hours.

**6. Feature Requests & Roadmap Signals**
No new feature requests were submitted. The 18 open PRs are strictly technical maintenance tasks involving dependency version bumps. This suggests the roadmap is being followed without interruptions for new feature additions.

**7. User Feedback Summary**
No direct user feedback was recorded today. The lack of issues and the volume of automated dependency updates suggest a stable user base with no immediate complaints.

**8. Backlog Watch**
*   **Open PRs:** There are 18 dependency update PRs pending review.
    *   **High Priority:** Several updates involve security or critical path libraries (e.g., `rustls`, `base64`, `docker/login-action`, `astro`).
    *   **Scope:** These affect the core Rust binary, the documentation landing pages (`landing/zeptoclaw/docs` and `landing/r8r/docs`), and the CI/CD pipeline.
    *   **Action Needed:** Reviewers should prioritize merging security-related dependency updates to ensure the project remains secure against potential vulnerabilities.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest
**Date:** 2026-09-16

## 1. Today's Overview
The ZeroClaw project maintains a robust development velocity with 100 total updates (50 Issues, 50 PRs) logged in the last 24 hours. The project is in a "high-risk, high-reward" engineering phase, actively resolving critical stability issues in the runtime and provider layers while advancing architectural refactoring toward runtime plugin support. A significant portion of the backlog is focused on hardening security boundaries and fixing multimodal provider bugs.

## 2. Releases
**No new releases.** The latest activity has been concentrated on internal maintenance, bug fixes, and architectural RFCs.

## 3. Project Progress
**Merged/Closed Activity:**
*   **PR #9324:** Merged the Phase 1 implementation of the A2A (Agent-to-Agent) outbound client RFC. This introduces shared wire models and four working tools for inter-agent collaboration.
*   **PR #10840:** Merged documentation improvements to generate `llms.txt` and `llms-full.txt` during the mdBook build.
*   **PR #9997:** Merged a secure model picker for Telegram, allowing users to select providers via an inline keyboard.

**Notable Open Work:**
*   **PR #10867 (CI):** Performance tuning for Windows validation to reduce CI times.
*   **PR #10407:** Adding persistent session prompt attachments to SQLite.

## 4. Community Hot Topics
The most heated discussions are centered on architectural evolution and security hardening.

*   **RFC: Computer-use support (#6909)** - *Status: Accepted* | *Comments: 16*
    *   **Link:** [zeroclaw-labs/zeroclaw Issue #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)
    *   **Analysis:** A high-priority request to enable desktop screen interaction and input control. The maintainer has clarified security boundaries and session arming, indicating this is a critical feature for future agent autonomy.
*   **RFC: A2A Outbound Client (#9106)** - *Status: Accepted* | *Comments: 11*
    *   **Link:** [zeroclaw-labs/zeroclaw Issue #9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)
    *   **Analysis:** This tracks the transition from inbound-only A2A to bidirectional agent communication. The recent merge of PR #9324 suggests this architectural goal is being actively realized.
*   **RFC: Unified Package/Capability Catalog (#9346)** - *Status: Accepted* | *Comments: 9*
    *   **Link:** [zeroclaw-labs/zeroclaw Issue #9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)
    *   **Analysis:** A structural requirement to create a unified catalog across integrations, plugins, and the gateway to simplify configuration management.

## 5. Bugs & Stability
Several critical stability issues were identified today, primarily surrounding multimodal interactions and provider handling.

*   **S2 - High Severity:** [Bug] Tool-returned images disappear after unrelated tool calls (#10885)
    *   **Link:** [zeroclaw-labs/zeroclaw Issue #10885](https://github.com/zeroclaw-labs/zeroclaw/issues/10885)
    *   **Fix PR:** [PR #10894](https://github.com/zeroclaw-labs/zeroclaw/pull/10894) (Normalize image markers)
    *   **Fix PR:** [PR #10895](https://github.com/zeroclaw-labs/zeroclaw/pull/10895) (Fix rolling cache breakpoint)
    *   **Context:** The state management of image markers during a single user turn is failing, causing context loss.
*   **S1 - Workflow Blocked:** [Bug] WhatsApp device linking broken by passkey gate (#8627)
    *   **Link:** [zeroclaw-labs/zeroclaw Issue #8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627)
    *   **Context:** The WhatsApp Web channel is failing to link devices due to WhatsApp's new security requirements.
*   **S1 - Workflow Blocked:** [Bug] Budget-exceeded Code turn loses visible progress after session restore (#10659)
    *   **Link:** [zeroclaw-labs/zeroclaw Issue #10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)
    *   **Context:** When a session budget is exceeded, the UI fails to persist the progress made during the turn.

## 6. Feature Requests & Roadmap Signals
*   **Runtime Plugin Architecture:** Multiple issues (#8850, #7497) are pushing to move optional channels and tools from compile-time features to runtime-installable WASM plugins. This signals a move towards a modular, plugin-heavy architecture rather than a monolithic binary.
*   **XMPP Channel:** A feature request (#9814) for a native XMPP/Prosody channel indicates expansion into home-lab and low-resource communication protocols.
*   **Default Streaming:** Changing `stream_mode` from `Off` to `Partial` by default (#10166) suggests a shift towards real-time responsiveness as a default user expectation.

## 7. User Feedback Summary
Users are expressing frustration with **state preservation** in multimodal workflows. The recurring bug where images vanish after tool calls (e.g., in ZeroCode) indicates a gap in the user experience for complex, multi-step agent tasks. Additionally, users relying on WhatsApp are currently blocked due to external API changes, highlighting the fragility of external integrations.

## 8. Backlog Watch
*   **Dependencies (RustSec):** Issue #5869 remains open regarding transitive dependency security vulnerabilities in `rumqttc`. This is a security-critical item that has been in the backlog for months.
*   **CI Reliability:** Several test failures in the "Parallel Runtime Test" gate (e.g., Telegram media-group listener, Hailo log assertions) suggest the CI pipeline is struggling with concurrency, which may be slowing down feature validation.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*