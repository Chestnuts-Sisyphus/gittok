# OpenClaw Ecosystem Digest 2026-09-10

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-09 22:06 UTC

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

# NanoBot Project Digest — 2026-09-10

## 1. Today’s Overview

NanoBot showed strong development throughput in the past 24 hours, with **21 pull requests updated** — **12 open** and **9 merged/closed** — and **4 issues updated**, of which **3 remain open** and **1 was closed**. No new release was published during the window. Activity was concentrated in **WebUI reliability and UX**, **provider compatibility**, **execution sandboxing**, and **channel notification behavior**. Overall project health appears active but integration-heavy: several high-value PRs remain open or conflicted, and the absence of a new release suggests that recent fixes are accumulating for a future package rather than shipping immediately.

---

## 2. Releases

No new release was detected for **2026-09-10**.

- New releases: **0**
- Latest release: **None reported**
- Breaking changes: **None reported**
- Migration notes: **None reported**

---

## 3. Project Progress

The past 24 hours included **9 closed/merged PRs**, indicating a meaningful amount of shipped or near-shipped work across the WebUI, TUI, providers, execution sandbox, and rendering layer.

### Closed/Merged PRs

| PR | Area | Change | Link |
|---|---|---|---|
| [#5662](https://github.com/HKUDS/nanobot/pull/5662) | Provider / OpenCode | Sends `x-opencode-session` header for OpenCode Zen/Go sessions, addressing prompt-cache optimization and possible errors after **2026-09-06**. Closes [#5661](https://github.com/HKUDS/nanobot/issues/5661). | [PR #5662](https://github.com/HKUDS/nanobot/pull/5662) |
| [#5628](https://github.com/HKUDS/nanobot/pull/5628) | Execution / Security | Adds opt-in macOS **Seatbelt** sandbox backend for shell subprocesses using system `sandbox-exec`, improving sandboxing options without adding a new dependency. | [PR #5628](https://github.com/HKUDS/nanobot/pull/5628) |
| [#5717](https://github.com/HKUDS/nanobot/pull/5717) | WebUI | Fixes project selection loss when creating a topic from a project’s context menu, using `history.pushState` to avoid clearing the selected project. | [PR #5717](https://github.com/HKUDS/nanobot/pull/5717) |
| [#5703](https://github.com/HKUDS/nanobot/pull/5703) | WebUI / Performance | Reduces repeated DOM scanning, history rendering, hidden-detail rendering, and replay-data retention, bounding expensive rendering and caching paths. | [PR #5703](https://github.com/HKUDS/nanobot/pull/5703) |
| [#5716](https://github.com/HKUDS/nanobot/pull/5716) | WebUI / Skills | Refreshes skill suggestions when opening the picker so newly installed skills appear without requiring a page reload. Fixes [NAN-108](https://linear.app/nanobot-ai/issue/NAN-108). | [PR #5716](https://github.com/HKUDS/nanobot/pull/5716) |
| [#5714](https://github.com/HKUDS/nanobot/pull/5714) | WebUI / Rendering | Keeps file-edit diffs outside collapsible reasoning folds so diffs and their controls remain visible when activity is collapsed. | [PR #5714](https://github.com/HKUDS/nanobot/pull/5714) |
| [#5705](https://github.com/HKUDS/nanobot/pull/5705) | TUI / Observability | Adds a TUI-local `/usage` panel showing context occupancy and recent model-round usage, including cached, uncached, and unknown-cache input bars. | [PR #5705](https://github.com/HKUDS/nanobot/pull/5705) |
| [#5713](https://github.com/HKUDS/nanobot/pull/5713) | WebUI / UI | Prevents italic activity labels from clipping by adding right padding while preserving ellipsis truncation. | [PR #5713](https://github.com/HKUDS/nanobot/pull/5713) |
| [#5712](https://github.com/HKUDS/nanobot/pull/5712) | WebUI / Streaming | Fixes streamed responses being truncated at less-than comparisons in math content, preventing KaTeX errors and lost sections during streaming. | [PR #5712](https://github.com/HKUDS/nanobot/pull/5712) |

### Key Progress Signals

- **Provider compatibility improved**, especially around OpenCode session affinity and prompt caching.
- **Execution sandboxing expanded**, with a macOS Seatbelt backend merged/closed and an additional security-focused sandbox fix still in progress.
- **WebUI quality improved** through multiple rendering, streaming, navigation, performance, and skill-picker fixes.
- **TUI observability advanced** with a new `/usage` panel for context and token usage.

---

## 4. Community Hot Topics

PR comment counts were not populated in the provided dataset for most pull requests, so “hot” topics are ranked using issue comments/reactions, priority labels, cross-linked fixes, severity, and functional impact.

### 1. WebUI Session Title Generation After Restart

- Issue: [#5647 — fix(webui): session title not generated when frontend envelope lacks webui flag](https://github.com/HKUDS/nanobot/issues/5647)
- Related PR: [#5715 — fix(webui): honor persisted session marker for titles](https://github.com/HKUDS/nanobot/pull/5715)
- Signal: **1 comment**, open issue, cross-linked fix PR.
- Underlying need: Users expect WebUI sessions to retain stable, generated titles across gateway restarts, especially when the frontend envelope omits transient fields. The persisted `metadata.webui` marker appears to be the correct durable signal.

### 2. OpenCode Session Header / Prompt-Caching Compliance

- Issue: [#5661 — feat(providers): send x-opencode-session header for OpenCode Zen/Go session affinity](https://github.com/HKUDS/nanobot/issues/5661)
- Fix PR: [#5662 — feat(providers): send x-opencode-session header for OpenCode session](https://github.com/HKUDS/nanobot/pull/5662)
- Signal: **1 👍**, closed issue, closed PR.
- Underlying need: Provider ecosystem compliance is becoming operationally important. Missing headers can break prompt-cache optimization and may cause errors, so maintainers are responding quickly to upstream provider requirements.

### 3. Discord Automatic Compaction Notices Respecting `sendProgress: false`

- Issue: [#5719 — Discord: automatic compaction notices are delivered with `sendProgress: false`](https://github.com/HKUDS/nanobot/issues/5719)
- Fix PR: [#5720 — fix(channels): make automatic compaction notices follow send_progress](https://github.com/HKUDS/nanobot/pull/5720)
- Signal: New issue with an immediate linked fix.
- Underlying need: Channel users expect configuration flags to suppress all non-essential progress noise, including internal maintenance messages such as automatic context compaction.

### 4. Execution Sandbox Security / Restricted Shell Fail-Closed Behavior

- PR: [#5536 — fix(exec): fail closed when restricted shell lacks a sandbox](https://github.com/HKUDS/nanobot/pull/5536)
- Linked issue: [#4072](https://github.com/HKUDS/nanobot/issues/4072)
- Signal: **priority: p1**, security/bug labels, open with conflict.
- Underlying need: Agent execution tools require stronger containment. Application-level path checks are insufficient when shell commands can resolve symlinks, shell expansion, or command substitution. The project is moving toward safer sandbox-backed execution.

### 5. WebUI Settings and Project Organization

- PR: [#5704 — feat(webui): expand and organize settings with autosave](https://github.com/HKUDS/nanobot/pull/5704)
- PR: [#5710 — feat(webui): organize projects and simplify sidebar navigation](https://github.com/HKUDS/nanobot/pull/5710)
- PR: [#5498 — feat(config): unify onboarding in the Agent TUI](https://github.com/HKUDS/nanobot/pull/5498)
- Signal: Multiple open UX/configuration PRs from the same area.
- Underlying need: As NanoBot gains more configuration, projects, topics, and automations, users need clearer setup flows, better sidebar organization, safer settings persistence, and consistent onboarding.

---

## 5. Bugs & Stability

The following bugs and stability issues were reported or addressed in the last 24 hours. Severity ranking is based on labels, potential user impact, security relevance, and availability of linked fixes.

| Severity | Item | Type | Status | Fix PR | Link |
|---|---|---|---|---|---|
| High | [#5536 — fail closed when restricted shell lacks a sandbox](https://github.com/HKUDS/nanobot/pull/5536) | Security / execution sandbox | Open, conflicted, p1 | Itself | [PR #5536](https://github.com/HKUDS/nanobot/pull/5536) |
| Medium-High | [#5647 — session title not generated when frontend envelope lacks webui flag](https://github.com/HKUDS/nanobot/issues/5647) | WebUI / session title | Open | [#5715](https://github.com/HKUDS/nanobot/pull/5715) | [Issue #5647](https://github.com/HKUDS/nanobot/issues/5647) |
| Medium | [#4819 — replace WeakValueDictionary with plain dict for consolidation locks](https://github.com/HKUDS/nanobot/pull/4819) | Memory / concurrency | Open, conflicted | Itself | [PR #4819](https://github.com/HKUDS/nanobot/pull/4819) |
| Medium | [#5719 — Discord automatic compaction notices delivered despite `sendProgress: false`](https://github.com/HKUDS/nanobot/issues/5719) | Channel / notification behavior | Open | [#5720](https://github.com/HKUDS/nanobot/pull/5720) | [Issue #5719](https://github.com/HKUDS/nanobot/issues/5719) |
| Low-Medium | [#4820 — reject non-string web fetch URLs](https://github.com/HKUDS/nanobot/pull/4820) | Runtime / validation | Open | Itself | [PR #4820](https://github.com/HKUDS/nanobot/pull/4820) |
| Low | [#5711 — rename hyphenated slash commands to Telegram-safe underscores](https://github.com/HKUDS/nanobot/pull/5711) | Channel / Telegram command compatibility | Open | Itself | [PR #5711](https://github.com/HKUDS/nanobot/pull/5711) |

### Resolved Stability / Rendering Bugs

These were reported and closed/merged within the window, indicating active stabilization of WebUI behavior:

- [#5712 — preserve less-than comparisons in streaming math](https://github.com/HKUDS/nanobot/pull/5712): Fixes streamed math truncation and KaTeX rendering errors.
- [#5714 — keep edit diffs outside reasoning folds](https://github.com/HKUDS/nanobot/pull/5714): Prevents file diffs from being hidden inside collapsed reasoning sections.
- [#5713 — prevent italic activity labels from clipping](https://github.com/HKUDS/nanobot/pull/5713): Fixes text clipping caused by italic glyphs.
- [#5716 — refresh skill suggestions when opening the picker](https://github.com/HKUDS/nanobot/pull/5716): Fixes stale skill picker lists after runtime skill installation.
- [#5717 — preserve project when creating a topic from its menu](https://github.com/HKUDS/nanobot/pull/5717): Fixes project selection being cleared during topic creation.

### Stability Assessment

- **Positive:** Multiple WebUI rendering, streaming, and navigation bugs were closed quickly.
- **Concern:** A p1 security-related execution sandbox PR remains open and conflicted.
- **Concern:** Older memory/concurrency and runtime validation PRs remain open, suggesting some technical debt is aging in the queue.

---

## 6. Feature Requests & Roadmap Signals

Several user-facing and provider-facing features are active in the PR queue. The signals suggest the next release cycle will likely emphasize **provider compatibility**, **WebUI usability**, **sandboxing**, **usage observability**, and possibly **persistent memory**.

### Likely Near-Term Roadmap Signals

| Feature / Request | Link | Signal | Prediction |
|---|---|---|---|
| OpenRouter native image generation API | [#5718](https://github.com/HKUDS/nanobot/pull/5718) | Open feature PR, p2, provider/API compatibility | Likely candidate for near-term release as it extends existing `generate_image` capability. |
| Serply Google Search API provider | [#5437](https://github.com/HKUDS/nanobot/pull/5437) | Open provider PR, p2, conflicted | Likely if conflict is resolved; follows existing Serper provider pattern. |
| WebUI settings expansion and autosave | [#5704](https://github.com/HKUDS/nanobot/pull/5704) | Open UX/configuration PR | Strong WebUI roadmap signal; aligns with productization of settings. |
| WebUI project organization and sidebar navigation | [#5710](https://github.com/HKUDS/nanobot/pull/5710) | Open UX PR, conflicted | Likely relevant to next WebUI iteration, especially as topic/project lists grow. |
| Unified TUI onboarding | [#5498](https://github.com/HKUDS/nanobot/pull/5498) | Open configuration/onboarding PR, conflicted | TUI setup polish; likely next version if configuration UX is prioritized. |
| Durable memory across sessions | [#5721](https://github.com/HKUDS/nanobot/issues/5721) | New issue, external memory-backend proposal | More exploratory; may influence future memory architecture or integration patterns. |
| macOS Seatbelt sandbox backend | [#5628](https://github.com/HKUDS/nanobot/pull/5628) | Closed/merged | Indicates continued expansion of sandboxing backends and platform-specific safety controls. |
| TUI `/usage` context and token charts | [#5705](https://github.com/HKUDS/nanobot/pull/5705) | Closed/merged | Suggests usage/token observability is becoming a standard UX surface across TUI and WebUI. |

### Roadmap Interpretation

The data suggests three main product directions:

1. **Provider resilience** — OpenCode session headers, OpenRouter image generation, and additional search providers indicate that NanoBot is adapting to external model/tool API changes.
2. **WebUI productization** — settings, projects, sidebars, skill pickers, rendering, streaming, and performance work point to a more polished desktop-like assistant interface.
3. **Safety and observability** — sandbox backends, execution fail-closed behavior, and usage/token panels suggest the project is preparing for more autonomous agent execution.

---

## 7. User Feedback Summary

The issue and PR data reveals several recurring user pain points, though no explicit satisfaction ratings were provided.

### Main Pain Points

| Pain Point | Evidence | Impact |
|---|---|---|
| WebUI session titles disappear or fail to regenerate after restart | [#5647](https://github.com/HKUDS/nanobot/issues/5647), [#5715](https://github.com/HKUDS/nanobot/pull/5715) | Reduces usability of persistent WebUI conversations. |
| Discord users still see compaction notices even when progress is disabled | [#5719](https://github.com/HKUDS/nanobot/issues/5719), [#5720](https://github.com/HKUDS/nanobot/pull/5720) | Causes unwanted chat noise for users who explicitly suppress progress messages. |
| Telegram slash commands with hyphens are not recognized as proper bot commands | [#5711](https://github.com/HKUDS/nanobot/pull/5711) | Breaks Telegram command UX: no highlighting, autocomplete, or clickable command behavior. |
| WebUI streaming can truncate math content at `<` comparisons | [#5712](https://github.com/HKUDS/nanobot/pull/5712) | Serious UX defect for technical/mathematical output; can make later content disappear. |
| File diffs can become hidden inside collapsed reasoning sections | [#5714](https://github.com/HKUDS/nanobot/pull/5714) | Hurts developer visibility into code edits and review state. |
| Skill picker can show stale installed skills | [#5716](https://github.com/HKUDS

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest: 2026-09-10

## Today's Overview
Today, there were 3 issues updated in the last 24 hours, with no new releases. The total number of issues is up to 3 items.

## Releases
None

## Project Progress
Today, 5 PRs were merged/closed, advancing or fixing features.

## Community Hot Topics
The most active issues and PRs today are #3269 (stale), #3265 (stale), and #3345. These issues cover MCP server connection failures, gateway startup issues, and lightweight PicoClaw worker mode for household edge computing.

## Bugs & Stability
No bugs or crashes reported today.

## Feature Requests & Roadmap Signals
There are no user-requested features mentioned today.

## User Feedback Summary
Users have reported stale issues and a need for more stable and reliable agent handling.

## Backlog Watch
There is a long-unanswered important issue #3269, which needs maintenance attention.

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

**IronClaw – Project Digest (2026‑09‑10)**  

---

### 1. Today’s Overview  
- IronClaw saw modest but focused activity: 1 newly updated issue and 6 pull‑request updates in the last 24 h.  
- No new releases were published, but two pull requests were merged, showing continued housekeeping and feature work.  
- Most of the day’s effort revolved around the hosted‑MCP tooling layer and a usability bug in the WebChat v2 UI, indicating both core‑engine and front‑end concerns are being addressed in parallel.  

---

### 2. Releases  
*No new version was cut in the past 24 h.*  

---

### 3. Project Progress (Merged / Closed PRs)  
| PR | Title / Scope | Author | Merged / Closed Date | Key Impact |
|----|---------------|--------|----------------------|------------|
| **#8088** | *feat(common): distinguish a set‑but‑empty env var from an unset one* | kirikov | 2026‑09‑08 | Improves configuration safety; prevents silent fall‑backs when an empty string is supplied, reducing operator‑error risk. |
| **#8089** | *feat(extensions): bundle the agent‑market hosted‑MCP provider package* | kirikov | 2026‑09‑08 | Adds a first‑party “agent.market” tool package, delivering out‑of‑the‑box MCP support and a smoother discovery fallback. |

Both PRs were closed / merged without reported regressions and contribute to a more robust extension ecosystem and clearer env‑var handling.  

---

### 4. Community Hot Topics  
| Item | Type | Link | Why It’s Hot |
|------|------|------|--------------|
| **#8091** – *bug(webchat‑v2): Enter sends the message while confirming IME composition* | Issue (open) | <https://github.com/nearai/ironclaw/issues/8091> | Directly affects end‑users of the web UI, especially those typing in non‑Latin scripts. The bug interferes with normal chat flow and could cause accidental message transmission. |
| **#8072** – *feat(telegram): register the Bot API command menu at activation* | PR (open, size L, low risk) | <https://github.com/nearai/ironclaw/pull/8072> | Introduces a polished Telegram UI (command menu) that many bots already expect. The PR’s large scope and documentation focus make it a visible improvement for a major integration channel. |
| **#8084** – *feat(mcp): opt‑in SEP‑414 caller attribution on outbound hosted‑MCP calls* | PR (open) | <https://github.com/nearai/ironclaw/pull/8084> | Addresses a long‑standing limitation for hosted‑MCP providers that need per‑conversation context, aligning IronClaw with the emerging SEP‑414 spec. |

**Underlying needs:**  
- **Front‑end reliability** – The WebChat IME bug shows a demand for better handling of international input methods.  
- **Integration ergonomics** – Telegram’s command menu and MCP caller attribution signal a push for smoother, standards‑compliant third‑party integrations.  

---

### 5. Bugs & Stability  
| Severity | Issue / PR | Summary | Fix Status |
|----------|------------|---------|------------|
| **High** | #8091 (open) | Enter key used to confirm IME conversion also triggers message send, leading to premature posts. | No fix yet; a dedicated PR is expected once the UI event handling is refactored. |
| **Medium** | (none reported today) | – | – |
| **Low** | (none reported today) | – | – |

*Note:* The two merged PRs (#8088, #8089) were stability‑focused (environment‑var handling and bundled MCP provider) and did not introduce regressions in CI.

---

### 6. Feature Requests & Roadmap Signals  
- **Telegram command menu registration** (PR #8072) is likely to land in the next minor release, as it only touches activation hooks and documentation.  
- **SEP‑414 caller attribution** (PR #8084) is a strategic feature for providers needing per‑conversation billing/state; expect it to be prioritized once the core MCP flow stabilises.  
- **Operator‑installed package handling** (PR #8085) and **hosted‑MCP catalog keying** (PR #8090) indicate a roadmap focus on making the extension system more deterministic and multi‑tenant safe.  

---

### 7. User Feedback Summary  
- **Pain point:** Accidental message sending for users employing IME (Issue #8091). This directly affects chat reliability for non‑English speakers.  
- **Positive signals:** The addition of the “agent.market” MCP package (PR #8089) and the forthcoming Telegram UI improvements were welcomed by contributors, suggesting satisfaction with expanding out‑of‑the‑box capabilities.  
- **General sentiment:** The community is actively polishing integration points (Telegram, MCP) while still surfacing critical UI bugs, reflecting a healthy mix of forward‑looking development and reactive maintenance.  

---

### 8. Backlog Watch  
| Item | Type | Age* | Why It Needs Attention |
|------|------|------|------------------------|
| #8072 – Telegram command menu | PR (open) | Opened 2026‑09‑04 (≈ 6 days) | Large “L” sized change; still awaiting review/comments. Blocking a visible user‑facing feature. |
| #8084 – SEP‑414 caller attribution | PR (open) | Opened 2026‑09‑08 (≈ 2 days) | Important for billing‑aware providers; low risk but requires API consensus. |
| #8090 – fix(mcp): key discovered hosted‑MCP catalogs per caller | PR (open) | Opened 2026‑09‑08 (≈ 2 days) | Prevents cross‑user tool overwrites; core to multi‑tenant safety. |
| #8091 – IME Enter bug | Issue (open) | Opened 2026‑09‑09 (1 day) | High‑impact UI regression; should be triaged for a hot‑fix. |

\*Age calculated from the “Created” timestamp relative to 2026‑09‑10.

---

**Bottom line:** IronClaw’s development cadence remains steady, with a clear emphasis on improving integration reliability (MCP, Telegram) and addressing a critical front‑end usability bug. The backlog contains a few medium‑size PRs that, once reviewed, could unlock the next wave of user‑visible enhancements. Continued monitoring of the IME issue and timely review of the Telegram menu PR will be key indicators of project health in the coming week.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>



# LobsterAI Project Digest — 2026-09-10

## 1. Today's Overview

LobsterAI shows **high development velocity** with 34 activity items in the last 24 hours (20 issues, 14 PRs). The project is actively addressing stability regressions introduced by the OpenClaw v2026.8.1 upgrade, with 8 bug-fix PRs merged/closed in a single day. There were **no new releases** published today, but the merged PRs represent a concentrated patching effort targeting IM sync, gateway startup, configuration drift, and cross-model orchestration bugs. Community engagement remains steady, with security disclosures and performance concerns occupying the open-issue front line.

## 2. Releases

No new releases were published on this date.

---

## 3. Project Progress

**11 PRs closed/merged today (2026-09-09):**

| PR | Area | Summary |
|----|------|---------|
| [#2639](https://github.com/netease-youdao/LobsterAI/pull/2639) | openclaw | Keep default model out of system prompts — fixes reusable conversation prefix breakage |
| [#2640](https://github.com/netease-youdao/LobsterAI/pull/2640) | openclaw | Session-scoped model selection — prevents cross-session default drift |
| [#2638](https://github.com/netease-youdao/LobsterAI/pull/2638) | openclaw/build | Migrate legacy workspace state before gateway startup — resolves v2026.8.1 migration blocker |
| [#2637](https://github.com/netease-youdao/LobsterAI/pull/2637) | openclaw/build | Bundle Discord plugin with trusted origin — fixes `openKeyedStore` rejection on plugin registration |
| [#2636](https://github.com/netease-youdao/LobsterAI/pull/2636) | renderer | Refresh "Check for Updates" label on language switch — i18n memoization fix |
| [#2635](https://github.com/netease-youdao/LobsterAI/pull/2635) | openclaw | Avoid gateway restarts on stale config hashes — bounded retry + hot-reload fallback |
| [#2634](https://github.com/netease-youdao/LobsterAI/pull/2634) | openclaw/im | Restore QQ shutdown and desktop IM sync — fixes process cleanup and message reconnection |
| [#2633](https://github.com/netease-youdao/LobsterAI/pull/2633) | openclaw/im | Update Discord DM config schema — rewrites `dm.policy`/`dm.allowFrom` to account-level `dmPolicy`/`allowFrom` |
| [#2632](https://github.com/netease-youdao/LobsterAI/pull/2632) | openclaw | Preserve IM config on logout + graceful Windows gateway stop via IPC |
| [#2631](https://github.com/netease-youdao/LobsterAI/pull/2631) | cron | Fix scheduled-task history and failure-state regression post-upgrade |
| [#2294](https://github.com/netease-youdao/LobsterAI/pull/2294) | docs | Add TakoAPI directory badge |

**Key theme:** A coordinated fix wave for OpenClaw v2026.8.1 upgrade regressions — IM channels (Discord, QQ), gateway lifecycle, configuration sync, and cron history.

---

## 4. Community Hot Topics

| Issue | Status | Comments | Theme |
|-------|--------|----------|-------|
| [#2046](https://github.com/netease-youdao/LobsterAI/issues/2046) | Closed | 3 | Agent memory system — cross-session persistence |
| [#1903](https://github.com/netease-youdao/LobsterAI/issues/1903) | Closed | 4 | Member login reliability (paid model access) |
| [#2079](https://github.com/netease-youdao/LobsterAI/issues/2079) | Open | 3 | Execution result window freeze on scroll |
| [#2120](https://github.com/netease-youdao/LobsterAI/issues/2120) | Open | 3 | Task pre-input, longer run times, 3-column skill UI |
| [#2121](https://github.com/netease-youdao/LobsterAI/issues/2121) | Open | 3 | Duplicate token output waste |
| [#2214](https://github.com/netease-youdao/LobsterAI/issues/2214) | Open | 1 | Desktop backup causes main process hang (100% repro) |
| [#2230](https://github.com/netease-youdao/LobsterAI/issues/2230) | Open | 1 | LobsterAI 25min vs CodeBuddy 2m24s on same task |
| [#2243](https://github.com/netease-youdao/LobsterAI/issues/2243) | Open | 1 | `skills.load.watch` performance bottleneck (174 skills) |

**Underlying needs:**
- **Persistent cross-session memory** (#2046) is a top-priority product gap — users want agents that retain context across sessions without manual setup.
- **Performance parity with CodeBuddy** (#2230, #2243) is a growing concern; users running large skill libraries report severe slowdowns from filesystem watching and redundant token consumption.
- **IM channel reliability** (closed #1903, open #2120) remains fragile for paid-tier users.

---

## 5. Bugs & Stability

### High Severity (open)

- [#2214](https://github.com/netease-youdao/LobsterAI/issues/2214) — **Desktop data backup causes main process hang (100% reproducible).** User must force-kill the process. SQLite WAL mode + 71.6 MB DB under active gateway writes. No fix PR yet.
- [#2176](https://github.com/netease-youdao/LobsterAI/issues/2176) — **[Security] Automatic artifact loading allows arbitrary local file reads** via `MEDIA:` references forwarded to privileged Electro process.
- [#2286](https://github.com/netease-youdao/LobsterAI/issues/2286) — **[Security] Unauthenticated local token proxy** allows any local process to replay the victim's authenticated API capability.
- [#2287](https://github.com/netease-youdao/LobsterAI/issues/2287) — **[Security] NIM outbound media flow allows file exfiltration** via assistant-generated absolute paths.
- [#2288](https://github.com/netease-youdao/LobsterAI/issues/2288) — **[Security] HTML preview server follows in-root symlinks**, disclosing arbitrary local files.
- [#2181](https://github.com/netease-youdao/LobsterAI/issues/2181) — **[Security] Private-network browser access enabled by default**; bundled SSRF guard weakened.

### Medium Severity (open)

- [#2079](https://github.com/netease-youdao/LobsterAI/issues/2079) — Execution result window freezes when scrolled to top (reproducible since 2026.5.27).
- [#2216](https://github.com/netease-youdao/LobsterAI/issues/2216) — Memory Search stuck on OpenAI embedding; local provider option locked; DB lock (EBUSY) blocks rebuild.
- [#2230](https://github.com/netease-youdao/LobsterAI/issues/2230) — Same model ~10× slower in LobsterAI than CodeBuddy (60M tokens vs 67K for identical prompt).

### Closed Today

- [#1903](https://github.com/netease-youdao/LobsterAI/issues/1903) — Member login failures (closed, no fix noted).
- [#1152](https://github.com/netease-youdao/LobsterAI/issues/1152) — Corp IMAP connection failure (closed).
- [#2132](https://github.com/netease-youdao/LobsterAI/issues/2132) — Cross-model subtask orchestration gap (diagnosed: `call_function` not in `sessions_list` or `subagents`).

---

## 6. Feature Requests & Roadmap Signals

| Issue | Signal |
|-------|--------|
| [#2046](https://github.com/netease-youdao/LobsterAI/issues/2046) | **Agent memory system** — session title/metadata persistence to filesystem, cross-session recall. High community priority; closed but no implementation committed. |
| [#2180](https://github.com/netease-youdao/LobsterAI/issues/2180) | **"AI Collaborator" form** — natural language command bar + task dispatch console for cross-model orchestration. Proposal links to `openclaw-ai-collaborator-proposal.md`. |
| [#2131](https://github.com/netease-youdao/LobsterAI/issues/2131) | Hermes agent support request |
| [#2239](https://github.com/netease-youdao/LobsterAI/issues/2239) | Ecosystem integration roadmap — MCP-based linkage with OpenCode, CodeBuddy; full toolchain automation |
| [#2120](https://github.com/netease-youdao/LobsterAI/issues/2120) | Task pre-input queue, extended single-task runtime, 3-column skill UI on wide screens |
| [#2243](https://github.com/netease-youdao/LobsterAI/issues/2243) | `skills.load.watch` → manual UI toggle; disable auto-watch for large skill libraries |

**Prediction for next release:** The memory system (#2046) and manual watch toggle (#2243) are the most actionable near-term features. Cross-model orchestration improvements (#2180, #2132) may appear as OpenClaw plugin updates rather than core releases.

---

## 7. User Feedback Summary

**Pain points:**
- **Login reliability** for paid members (#1903) — users cannot access NetEase paid models, directly impacting subscription value.
- **Performance degradation with scale** — 174 skills trigger severe I/O overhead from filesystem watching (#2243); a single prompt takes 25 minutes vs 2m24s in CodeBuddy (#2230) with 60M tokens consumed.
- **Desktop backup hangs the app** (#2214) — 100% reproducible, forces process kill.
- **Duplicate token output** (#2121) — users suspect the agent is wasting tokens on repeated text.
- **IM sync unreliability** — QQ and Discord both required fix PRs today, indicating ongoing instability in channel plugins.

**Positive signals:**
- The v2026.8.1 upgrade regressions are being addressed rapidly (8 PRs in one day).
- Security disclosures are being filed transparently (#2176, #2286, #2287, #2288).
- Users are providing detailed, structured feedback with reproduction steps and logs.

---

## 8. Backlog Watch

| Issue | Age | Risk |
|-------|-----|------|
| [#2214](https://github.com/netease-youdao/LobsterAI/issues/2214) — Backup process hang | ~2.5 months | **Critical** — 100% repro, data loss risk, no fix PR |
| [#2176](https://github.com/netease-youdao/LobsterAI/issues/2176) — Arbitrary local file read via artifacts | ~3 months | **Critical security** — no fix PR visible |
| [#2286](https://github.com/netease-youdao/LobsterAI/issues/2286) — Unauthenticated local token proxy | ~2 months | **Critical security** — no fix PR visible |
| [#2287](https://github.com/netease-youdao/LobsterAI/issues/2287) — NIM media file exfiltration | ~2 months | **Critical security** — no fix PR visible |
| [#2288](https://github.com/netease-youdao/LobsterAI/issues/2288) — HTML preview symlink disclosure | ~2 months | **Critical security** — no fix PR visible |
| [#2216](https://github.com/netease-youdao/LobsterAI/issues/2216) — Memory Search embedding lock | ~2.5 months | **High** — blocks offline/local embedding use |
| [#2079](https://github.com/netease-youdao/LobsterAI/issues/2079) — Window freeze on scroll | ~3 months | **Medium** — UI stability |
| [#2243](https://github.com/netease-youdao/LobsterAI/issues/2243) — `skills.load.watch` performance | ~2.5 months | **High** — blocks large-skill-library users |

**Summary:** Four security vulnerabilities and the backup hang are the most urgent backlog items with no visible fix PRs. The security cluster (#2176, #2286–#2288) was reported by the same researcher (YLChen-007) and likely shares a root cause in the artifact/media handling pipeline. Maintainer attention to these items should be a priority.

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

# CoPaw Project Digest - 2026-09-10

## 1. Today's Overview
CoPaw demonstrates healthy project activity with 22 issues and 34 pull requests updated in the last 24 hours, maintaining a steady flow of development and community engagement. The project remains in a robust development cycle (version 2.2.0), with the majority of recent activity focused on stability improvements, bug fixes, and memory/plugin architecture refactoring rather than major feature additions. No new releases were published today, but the high volume of closed issues and merged PRs indicates active maintenance and rapid response to user feedback.

## 2. Releases
**No new releases** were published in the last 24 hours. The project is currently focused on the 2.2.x release line, with version 2.2.0 (released 2026-09-04) being the active target for stabilization.

## 3. Project Progress
**Closed PRs (8):**
- **#7649**: Added configurable timeout for HTTP/SSE MCP clients, resolving configuration limitations for external tool connections.
- **#7609**: Exposed skill versions and added dependency validation, improving skill management transparency and safety.
- **#6958 (related)**: Fixed duplicate tool results when MCP returns structured content, improving data integrity for tool outputs.
- **#7015 (related)**: Fixed audio rejection handling for specific providers (follow-up work).

**Open PRs (26):**
- **#7639**: Performance optimization for history integrity scans, preventing redundant database checks.
- **#7655**: Fix for FTS corruption and retention cleanup issues (addresses closed issue #7596).
- **#7653**: Massive test coverage expansion (+2,475 cases), raising coverage to 69.43%.
- **#7616**: Migration of ADBPG and PowerContext to plugin architecture, reducing core complexity.
- **#7569**: New "Advisor Mode" feature allowing paired model operation (strong advisor + worker agent).
- **#7378**: Native mobile experience implementation (React Native/Expo).

## 4. Community Hot Topics
**Most Active Issues:**
1. **#7177** - [Feature] Optimize platform.agentscope.io homepage layout (8 comments)
   - **Needs**: Improved mobile UX for critical action buttons (deployment controls) and better button placement hierarchy.
   - **Link**: [agentscope-ai/QwenPaw Issue #7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)

2. **#7363** - [Bug] Synchronous calls freeze event loop and timeout fails (6 comments)
   - **Needs**: Core backend stability fix for Desktop startup and message sending performance.
   - **Link**: [agentscope-ai/QwenPaw Issue #7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)

3. **#7597** - [Bug] Tool image/PDF binary base64 triggers 400 error (7 comments)
   - **Needs**: Tool return type handling fix for file data transmission.
   - **Link**: [agentscope-ai/QwenPaw Issue #7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)

**Most Active PRs:**
1. **#7639** - Performance optimization for history scans (highly relevant to recent stability issues)
   - **Link**: [agentscope-ai/QwenPaw PR #7639](https://github.com/agentscope-ai/QwenPaw/pull/7639)

2. **#7569** - Advisor Mode feature (new functionality)
   - **Link**: [agentscope-ai/QwenPaw PR #7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)

## 5. Bugs & Stability
**Reported Bugs (Ranked by Severity):**

1. **High Severity - Event Loop Freezing (#7363)**
   - **Impact**: Desktop becomes unresponsive for 2+ minutes during startup and message sending.
   - **Status**: Open, 6 comments.
   - **Related PR**: #7639 addresses database integrity scanning overhead.

2. **High Severity - Mobile UI/UX (#7177)**
   - **Impact**: Critical operations (deployment) are difficult to access on mobile devices due to poor button placement.
   - **Status**: Open, 8 comments.

3. **Medium Severity - Chrome Streaming Bug (#7642)**
   - **Impact**: Console streaming renders nothing until turn completes in Chrome (works in Safari).
   - **Status**: Open, 4 comments.

4. **Medium Severity - FTS Corruption (#7596)**
   - **Impact**: History retention cleanup fails silently, potentially losing conversation data.
   - **Status**: **FIXED** via PR #7655 (merged).

5. **Medium Severity - Modal Transparency (#7622)**
   - **Impact**: Settings modals in v2.2.0 appear transparent without proper backdrop overlay.
   - **Status**: **FIXED** (closed).

6. **Low Severity - llama.cpp Version Parsing (#7633)**
   - **Impact**: Version detection fails for new build number formats, causing silent rollbacks.
   - **Status**: Open, 4 comments.

## 6. Feature Requests & Roadmap Signals
**Feature Requests Highlighting Next Version Priorities:**

1. **Mobile UX Improvements (#7177, #5329)**
   - Request: Move critical buttons to top of page, add agent switching in sidebar.
   - **Prediction**: High priority for mobile app updates or responsive web design refresh.

2. **Customizable Web Title (#7648)**
   - Request: Allow custom titles for multiple QwenPaw instances to distinguish projects.
   - **Prediction**: Medium priority for session management improvements.

3. **Durable Memory Across Sessions (#7656)**
   - Request: Persistent memory for agent routines/preferences across restarts.
   - **Prediction**: Long-term roadmap item, potentially integrated with MemCode partnership.

4. **NTFY Push Channel Support (#7657)**
   - Request: Add built-in support for ntfy (self-hosted push service).
   - **Prediction**: Medium priority for home-lab and self-hosted users.

5. **Advisor Mode (#7569)**
   - **Status**: In development, PR #7569 adds paired model execution (advisor + worker).
   - **Prediction**: Planned feature for v2.3.0.

6. **Default Agent Editability (#7644)**
   - Request: Allow editing essential default agent parameters (email, routing) via UI.
   - **Prediction**: High priority for configuration UX improvements.

## 7. User Feedback Summary
**Pain Points:**
- **Mobile Experience**: Users accessing QwenPaw via mobile browsers report difficulty with critical actions (deployment, stopping runs) being hidden or hard to reach.
- **Desktop Performance**: Synchronous operations causing 2+ minute unresponsiveness during startup and messaging is a major friction point.
- **Browser Compatibility**: Chrome streaming rendering is broken while Safari works fine.
- **Configuration Complexity**: MCP timeout configuration and default agent editing lack user-friendly UI options.

**Use Cases & Satisfaction:**
- **Home-Lab Focus**: Strong demand for self-hosted features (ntfy, durable memory) and local model support.
- **Multi-Project Management**: Users running multiple QwenPaw instances need better session identification (custom titles).
- **Skill Management**: Request for version tracking and dependency validation in skills ecosystem.
- **Plugin Architecture**: Positive reception to recent migration of memory backends to plugins (PR #7616).

## 8. Backlog Watch
**Long-Unanswered Issues Requiring Maintainer Attention:**
1. **#5329** (Created: 2026-06-19, Comments: 5) - Mobile sidebar agent switching button.
2. **#6460** (Created: 2026-07-25, Comments: 5) - High CPU usage on Edge+Wayland with large result sets.
3. **#5688** (Created: 2026-07-01, Comments: 2) - CSS selector prefix mismatch (ant- vs qwenpaw-).
4. **#3997** (Created: 2026-05-02, Comments: 2) - MCP client timeout configuration.

**Long-Standing PRs:**
1. **#7378** (Created: 2026-08-28) - Native mobile experience (React Native) - 12 days old.
2. **#6399** (Created: 2026-07-23) - Reranker UI configuration - 48 days old.
3. **#6776** (Created: 2026-08-07) - Self-healing Playwright driver connections - 34 days old.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

### **ZeptoClaw Project Digest**
**Date:** 2026-09-10
**Project:** ZeptoClaw (github.com/qhkm/zeptoclaw)

---

#### **1. Today's Overview**
ZeptoClaw maintained a low-activity profile on 2026-09-10, with no new releases or pull request activity recorded. The project currently focuses on resolving an open feature request regarding provider support. Overall project health remains stable, with the single active issue indicating ongoing refinement of the routing and provider architecture.

#### **2. Releases**
No new releases were published today.

#### **3. Project Progress**
*   **Pull Requests:** 0 merged, 0 closed (24h window).
*   **Summary:** Development efforts are currently concentrated in the issue tracker rather than active code merging or release management.

#### **4. Community Hot Topics**
*   **[Issue #675] OrcaRouter provider support for ZeptoClaw** (Open)
    *   **Author:** putraperdana1207-pixel
    *   **Link:** [qhkm/zeptoclaw Issue #675](https://github.com/qhkm/zeptoclaw/issues/675)
    *   **Analysis:** This is the sole active topic. The user is requesting support for the "OrcaRouter" provider. Given ZeptoClaw's focus on modular architecture and channel management, this suggests a need for expanded compatibility with different routing strategies or API providers to handle complex multi-agent workflows.

#### **5. Bugs & Stability**
No bugs, crashes, or regressions were reported in the last 24 hours.

#### **6. Feature Requests & Roadmap Signals**
*   **OrcaRouter Integration:** The community is seeking integration with OrcaRouter. This feature would likely be prioritized in future updates if demand grows, potentially allowing users to leverage Orca's specific routing logic within the ZeptoClaw framework.

#### **7. User Feedback Summary**
*   **Pain Point:** The user highlighted the tension between feature richness and the project's core constraints (low footprint, high speed).
*   **Context:** The request underscores the desire to keep the system lightweight (6MB binary, 50ms startup) while expanding its connectivity options.

#### **8. Backlog Watch**
*   **Issue #675:** This is the only open issue requiring maintainer attention. While it is a feature request, active engagement is necessary to determine if it fits the architectural roadmap.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**ZeroClaw Project Digest**
**Date:** 2026-09-10
**Repository:** github.com/zeroclaw-labs/zeroclaw

---

### 1. Today's Overview
The ZeroClaw project remains highly active with 37 open issues and 50 pull requests updated in the last 24 hours. Activity is concentrated in architectural RFCs regarding runtime sessions, sandboxing, and plugin systems, alongside critical bug fixes for provider integrations (Anthropic, OpenAI) and ZeroCode UI stability. The project is in a feature-heavy development phase, with a significant volume of work focused on refining the runtime environment and UI affordances for multi-session management.

### 2. Releases
**None.** No new releases were published in the last 24 hours.

### 3. Project Progress
*   **Closed PRs:** 3 (e.g., #9731, #9730, #9729). These closed issues focused on the ZeroCode UI evolution, specifically implementing multi-session tracking and an agent sidebar to support concurrent live sessions.
*   **Updated PRs:** A large volume of PRs were updated today, primarily addressing critical bugs and maintenance tasks.
    *   **Security/Tooling:** PR #10391 fixed a bounded delegation filesystem tool to respect the target's workspace, preventing unauthorized file access. PR #10337 fixed Git operations to honor allowed roots.
    *   **Provider Fixes:** PR #10604 fixed OpenCode requests to send the correct session header to prevent prompt cache invalidation.
    *   **Logs & CI:** PR #10732 improved log selection logic for the daemon, and PR #10727 automated release announcements for X and Discord.

### 4. Community Hot Topics
The most heated discussions are centered on architectural RFCs, specifically regarding how sessions and files are managed internally.

*   **Runtime Sessions & Architecture (Issue #9487)** – *36 comments.* An RFC proposing "Runtime-owned conversation sessions" and "transport surface adapters." This is a high-risk, high-priority architectural shift to decouple the runtime from channel-specific details.
*   **Unified File Architecture (Issue #9488)** – *29 comments.* An RFC for a unified file and attachment architecture across conversation surfaces, aiming to replace fragmented historical implementations.
*   **Granular Sandbox Policy (Issue #6996)** – *28 comments.* A deep-dive into filesystem restrictions, specifically addressing conflicts between application-layer path admission and OS-level sandbox backends (e.g., Bubblewrap, Landlock).
*   **WASM Plugin Architecture (Issue #10076)** – *12 comments.* Proposes a composable WASM plugin runtime with typed extension points, indicating a move towards modular, plugin-based agent extensions.
*   **Maintainer Decision Queue (Issue #8692)** – *15 comments.* A tracker for RFCs and design issues pending maintainer review, highlighting the backlog of architectural decisions.

### 5. Bugs & Stability
Several critical bugs were reported or updated today, particularly affecting Anthropic provider metrics and ZeroCode rendering.

*   **P1 - Anthropic Cost Reporting (Issue #9816):** The Anthropic provider reports $0.00 spend, preventing daily/monthly budget caps from firing. This is a high-severity accounting bug affecting budget management.
*   **P1 - ZeroCode ACP Transcript (Issue #10697):** In ZeroCode ACP sessions, text emitted *before* a tool call is dropped from the transcript. Only post-tool text renders, making the conversation history incomplete.
*   **P2 - ZeroCode UI Double Rendering (Issue #10720):** Agent responses (result + explanation) render twice in the chat pane. This is a display-only bug that may confuse users but does not affect tool execution.
*   **P2 - Knowledge Tool Drop (Issue #10721):** The `knowledge.db_path` tilde expansion uses a global replace rather than a home prefix, silently dropping the knowledge tool from execution.

### 6. Feature Requests & Roadmap Signals
The roadmap is heavily influenced by requests for better observability, cache management, and multi-session UI handling.

*   **Cache TTL Configuration:** Request to configure a 1-hour prompt-cache TTL for Anthropic cache markers (Issue #10663). This suggests the team is optimizing for cost savings via prompt caching.
*   **Multi-Session Tracking:** The recent closure of PRs #9729 and #9730 confirms the roadmap includes a robust multi-session tracking system within ZeroCode, allowing users to manage concurrent agents.
*   **OpenAI Responses Support:** Multiple RFCs (Issues #10708, #10707, #10704) are advancing support for OpenAI's "Responses" API, specifically looking to support active-response steering, bounded programmatic tool calling, and async function tools.
*   **Log Rotation:** PR #10214 adds entry-count rotation for log persistence, a necessary feature for long-running agent instances.

### 7. User Feedback Summary
*   **Budget Management Frustration:** Users are unable to track spend accurately due to the $0.00 reporting bug (#9816), limiting their ability to enforce spending policies.
*   **UI Confusion:** Users report double-rendered messages (#10720) and dropped conversation history (#10697), indicating a need for better UI debugging tools and rendering stability.
*   **Sandboxing Concerns:** The extensive discussion on sandbox policies (#6996) indicates user confidence in ZeroClaw's ability to run tools but concern about strict containment boundaries.

### 8. Backlog Watch
*   **Blocked PRs:** Several large PRs remain in a "blocked" or "needs author action" state, including PR #9713 (Token accounting on history-trim) and PR #10358 (Mattermost approval prompts), indicating that significant feature work is waiting for review or conflict resolution.
*   **RFC Voting:** Issues #9487 and #9488 are in "Proposed" status with significant comment counts, waiting for the maintainers to record a new discussion window and snapshot to reopen voting.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*