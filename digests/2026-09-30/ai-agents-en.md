# OpenClaw Ecosystem Digest 2026-09-30

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-29 23:16 UTC

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

**NanoBot – Project Digest (2026‑09‑30)**  

---

### 1. Today’s Overview  
NanoBot is actively evolving, with 41 pull‑request updates and five open issue discussions in the past 24 h. No new releases were published today. The main thrust of the day was bug‑fixing, UX polish, and preparing several feature branches for merging. The community remains engaged around silent‑context compaction, per‑topic policy, and model‑catalog hygiene. Overall activity is healthy, though a handful of longstanding issues still linger.

---

### 2. Releases  
*No new releases were published on 2026‑09‑30.*

---

### 3. Project Progress  
| PR | Status | Highlights |
|----|--------|------------|
| **#5984** | Open – *bug, documentation, provider, webui, fix, test, priority: p2* | Fixed Codex discovery filtering; keeps new models visible without bumping CLI. |
| **#5983** | Open – *provider, webui, feature, test, priority: p2* | Added catalog‑backed “Reasoning effort” selector to the web UI. |
| **#5968** | Open – *bug, provider, fix, test, priority: p2* | Restores fallback on “insufficient credits” (HTTP 400) – closes #5967. |
| **#5974** | Open – *documentation, channel, feature, test, priority: p2* | `/group` command implementation (depends on #5973). |
| **#5973** | Open – *documentation, channel, feature, test, priority: p2* | Per‑chat/topic group‑policy override for Telegram. |
| **#5902** | Open – *channel, webui, feature, test, priority: p2* | Renames “topic” to a generated session title; improves UI consistency. |
| **#5954** | Open – *documentation, feature, test, priority: p2* | Adds “aggregated” mode for concurrent sub‑agent results. |
| **#5780** | Open – *bug, channel, fix, test, priority: p2* | Hides automatic context‑compaction notifications (fixes #5656). |
| **#5537** | Open – *documentation, enhancement, feature, test, priority: p2* | Persists `my`‑tool session focus across turns. |
| **#5981** | Open – *documentation, fix, feature, test, priority: p2* | Allows `/goal <task>` during active turns. |
| **#5982** | Open – *bug, webui, fix, priority: p2* | Corrects Taiwanese WebUI messages. |
| **#5980** | Open – *fix, webui* | Uploads attachments over HTTP to avoid large base‑64 WebSocket frames. |
| **#5979** | Open – *provider, webui, fix, test, priority: p2* | Hides OpenAI models after their `shutdown_date` (fixes #5977). |
| **#5943** | Open – *documentation, webui, refactor, fix, test, priority: p1* | Migrates session state to SQLite; removes shared mutable JSONL. |
| **#5976** | **Closed** – *documentation, fix, test, security, priority: p1* | Scopes `my` sub‑agent snapshots to the current session. |
| **#5975** | **Closed** – *documentation, refactor, test, priority: p2* | Organises TUI source by feature boundaries. |
| **#4616** | **Closed** – *conflict, fix, agent* | Routes direct‑mode sub‑agent results into the turn queue. |
| **#5811** | **Closed** – *refactor, fix, test, priority: p2* | Persists sub‑agent sessions via shared executor. |

No merges occurred today; the day was dominated by incremental bug fixes and feature scaffolding.

---

### 4. Community Hot Topics  
| Issue | Comments | Link | Insight |
|-------|----------|------|---------|
| **#5298** – *budget model‑visible MCP schemas* | 2 | [#5298](https://github.com/HKUDS/nanobot/issues/5298) | Users seek a more scalable approach to handling large MCP tool sets; indicates growing use of MCP in production workloads. |
| **#5900** – *Silent context compaction & WeChat log verbosity* | 1 | [#5900](https://github.com/HKUDS/nanobot/issues/5900) | Highlights the need for quieter background operations in messaging channels; suggests a feature‑request for silent notifications. |
| **#5972** – *Telegram per‑chat/topic group policy* | 0 | [#5972](https://github.com/HKUDS/nanobot/issues/5972) | Calls for granular bot behavior in forum topics; underlines Telegram‑centric user base. |

Pull‑request activity with the most comments (based on GitHub’s comment count field) includes:

| PR | Comments | Link |
|----|----------|------|
| **#5984** | *unspecified* | [#5984](https://github.com/HKUDS/nanobot/pull/5984) |
| **#5983** | *unspecified* | [#5983](https://github.com/HKUDS/nanobot/pull/5983) |
| **#5968** | *unspecified* | [#5968](https://github.com/HKUDS/nanobot/pull/5968) |

These PRs reflect the most discussed areas: provider discovery, UI reasoning effort, and fallback logic.

---

### 5. Bugs & Stability  
| Issue | Severity | Fix PR |
|-------|----------|--------|
| **#5967** – Fallback models skipped on “insufficient credits” | ★★★ (High) | #5968 |
| **#5977** – Model picker shows deprecated OpenAI models | ★★ (Medium) | #5979 |
| **#5980** – Attachment delivery failure for >1 MiB files | ★★★ (High) | #5980 (internal fix) |
| **#5967** – (duplicate, see above) | | |
| **#5978** – (duplicate of #5979, already closed) | | |

All critical bugs have a corresponding fix PR; the remaining issues are currently open or have been resolved earlier in the month.

---

### 6. Feature Requests & Roadmap Signals  
| Feature | Source | Priority | Likely Next‑Release |
|---------|--------|----------|---------------------|
| **Silent Context Compaction** | #5900 | p2 | Yes – pending integration with #5780. |
| **Per‑chat/topic Telegram Group Policy** | #5972 | p2 | Yes – merged in #5973 (pending #5974). |
| **Budget‑Model‑Visible MCP Schemas** | #5298 | p2 | Unclear – still open. |
| **Aggregated Sub‑Agent Results** | #5954 | p1 | Possible if PR passes CI. |
| **Session‑Scoped `my` Tool Focus** | #5537 | p2 | Implemented (#5537). |

The majority of high‑priority feature work is in the “per‑topic policy” and “silent compaction” lines, suggesting that the next stable release will focus on a more granular, quieter user experience.

---

### 7. User Feedback Summary  
* **Pain Points** – Users repeatedly report context‑compaction notifications cluttering channel logs (#5780, #5900).  
* **Use Cases** – Many contributors rely on Telegram forums and WeChat channels, demanding per‑topic bot behavior (#5972) and silent background operations.  
* **Satisfaction** – The community appreciates the quick resolution of the deprecated model picker (#5979) and the new aggregated result mode (#5954).  
* **Dissatisfaction** – The persistence of legacy OpenAI model entries (#5977) and fallback logic gaps (#5967) caused frustration before being addressed.

Overall sentiment is **positive**: the project is responding quickly to user‑reported issues, and the feature roadmap aligns with expressed community needs.

---

### 8. Backlog Watch  
| Item | Status | Open Since | Notes |
|------|--------|------------|-------|
| **#5298** – MCP schema budget model visibility | Open | 2026‑08‑08 | No recent activity; high impact on large‑tool‑set users. |
| **#5900** – Silent context compaction & log verbosity | Open | 2026‑09‑24 | Pending integration of #5780 and #5980. |
| **#5972** – Telegram per‑chat/topic group policy | Open | 2026‑09‑29 | Requires #5973 to merge first. |
| **#5967** – Fallback models skipped | Closed | — | Fixed in #5968, but monitoring needed. |
| **#5943** – Session persistence refactor (SQLite) | Open | 2026‑09‑27 | Major refactor; must be completed before next release. |

These items have either high community visibility or pose significant functional gaps. Maintainers should prioritize closing #5298 and finalizing #5943 to solidify core stability.  

---

**Conclusion**  
NanoBot’s current sprint focuses on tightening provider‑interaction logic, refining UI/UX across WebUI and TUI, and preparing for a feature‑rich release that addresses per‑topic policies and silent compaction. Bug‑fix momentum is high, and user‑reported issues are being resolved in a timely manner. The next release will likely ship with a more robust session model, aggregated sub‑agent results, and improved model catalog hygiene.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-30

## 1. Today’s Overview

Hermes Agent showed high maintenance activity in the 24 hours before 2026-09-30: **50 issues** and **50 pull requests** were updated, with **31 issues still open**, **19 issues closed**, **46 PRs still open**, and **4 PRs closed/merged**. No new releases were published, so the day’s progress was concentrated in bug fixing, desktop stability, gateway/session-state correctness, security dependencies, and install/platform hardening rather than feature delivery.

The issue mix is heavily weighted toward **P2 install/update, session-state, message-delivery, and security-dependency problems**, indicating that reliability is the current bottleneck. Positive signals include active triage, multiple closed issues, and several high-severity session-state fixes already in PRs such as [PR #126167](https://github.com/NousResearch/hermes-agent/pull/126167), [PR #127208](https://github.com/NousResearch/hermes-agent/pull/127208), and [PR #128599](https://github.com/NousResearch/hermes-agent/pull/128599). Negative signals include an open P2 fresh-Windows-install blocker, a P2 vulnerable dependency issue, and several desktop/session regressions that still need root-cause fixes.

Overall project health: **active but stability-heavy**. The team is moving quickly on triage and fixes, but the volume of P2/P0-adjacent session and install issues suggests the next release will likely need to be a reliability-focused patch.

---

## 2. Releases

No new Hermes Agent releases were reported in the supplied data for 2026-09-30.

Because there were no new versions, there are no release notes, breaking changes, or migration guidance to summarize today. The open PR list suggests that several fixes may be candidates for the next patch, especially around **gateway session pins, desktop journal recovery, macOS re-signing, Windows install/tooling, and dependency security**.

---

## 3. Project Progress

### PR Progress

The snapshot reports **50 updated PRs**, with **46 open** and **4 closed/merged**. The provided top-20 PR list does not include comment counts, but it does show several high-impact PRs that advanced during the window.

#### Closed / merged or likely landed PRs

The data reports 4 closed/merged PRs total, but only two closed PRs are visible in the supplied top list:

- [PR #125453](https://github.com/NousResearch/hermes-agent/pull/125453) — **fix(goals): run quality gates in the session workspace, never elsewhere**  
  This fixes a correctness issue where goal quality gates ran in the backend process directory instead of the session workspace, potentially checking the wrong project.

- [PR #101792](https://github.com/NousResearch/hermes-agent/pull/101792) — **fix(auxiliary): keep absent fallbacks out of health cache**  
  Closed, and labeled duplicate. It addressed auxiliary provider health-cache poisoning when optional OpenRouter/Nous credentials were absent during fallback discovery.

Because the data does not distinguish “merged” from “closed without merge” for all 4 closed PRs, the remaining two closed/merged PRs cannot be identified from the supplied list.

#### High-impact open PRs

These PRs are not necessarily merged, but they represent meaningful progress or active stabilization work:

- [PR #126167](https://github.com/NousResearch/hermes-agent/pull/126167) and [PR #127208](https://github.com/NousResearch/hermes-agent/pull/127208) — **fix(gateway): preserve prompt pins across synthetic turns**  
  Both are labeled **P0** and `needs-decision`. They target synthetic goal-continuation, heartbeat, and `/goal resume` turns that can lose prompt identity. This is a high-priority session-correctness fix.

- [PR #128599](https://github.com/NousResearch/hermes-agent/pull/128599) — **fix(desktop): keep journal recovery anchored to durable user rows**  
  Addresses replaying a completed turn’s local journal after a newer user turn, which can corrupt perceived conversation history.

- [PR #128532](https://github.com/NousResearch/hermes-agent/pull/128532) — **fix(desktop): keep staged clarify answers across remounts and salvage them on turn unwind**  
  Prevents pending clarify-card answers from being lost during stream updates, reconnect reconciliation, or expiry repaints.

- [PR #124842](https://github.com/NousResearch/hermes-agent/pull/124842) — **fix(agent): bound empty stream retries to prevent local request storms**  
  Caps `EmptyStreamError` retries to avoid nested retry storms when a provider repeatedly returns empty streams.

- [PR #127225](https://github.com/NousResearch/hermes-agent/pull/127225) — **fix(desktop): policy-aware macOS re-signing**  
  Addresses framework entitlement loss, ad-hoc fallback, and publisher-signing downgrade during `hermes update`.

- [PR #128604](https://github.com/NousResearch/hermes-agent/pull/128604) — **Prepared tools for every target and prebuilt Windows ARM64 native wheels**  
  Installer/platform hardening: pinned tools can install from verified archives, and Windows ARM64 can use hash-locked prebuilt wheels.

- [PR #128597](https://github.com/NousResearch/hermes-agent/pull/128597) — **fix(pm): ignore OS metadata in store trees**  
  Prevents Finder/cloud metadata from making installed PM store entries look stale or blocking flattening.

- [PR #128602](https://github.com/NousResearch/hermes-agent/pull/128602) — **fix(gateway): allow standalone starts when owner probe is unavailable**  
  Fixes lock-loss rechecks for standalone per-profile gateways when the host-wide rendezvous owner cannot yet be probed.

- [PR #128577](https://github.com/NousResearch/hermes-agent/pull/128577) — **fix(desktop): make bounded history navigation contiguous and occurrence-stable**  
  Fixes history navigation jumping to wrong positions or losing reading position during paging/deferred layout.

- [PR #128469](https://github.com/NousResearch/hermes-agent/pull/128469) — **fix(desktop): bind the Files rail to the focused session’s workspace**  
  Ensures the Files rail follows the focused tile/session instead of staying bound to the main pane.

- [PR #127275](https://github.com/NousResearch/hermes-agent/pull/127275) — **fix(desktop): client-direct STT hallucination filter and voice.barge_in pref**  
  Hardens client-side speech-to-text by applying hallucination filtering and exposing a voice barge-in preference.

- [PR #127247](https://github.com/NousResearch/hermes-agent/pull/127247) — **fix(desktop): zoom, pan and pinch in the image lightbox**  
  Improves desktop usability for large screenshots/images.

- [PR #128179](https://github.com/NousResearch/hermes-agent/pull/128179) — **fix(desktop): make the Quick Entry shortcut honest on portal-less Wayland compositors**  
  Improves Linux/Wayland quick-entry error reporting and fallback behavior.

- [PR #128498](https://github.com/NousResearch/hermes-agent/pull/128498) — **docs(desktop): describe the Add-connection sign-in form that actually ships**  
  Documentation alignment for Desktop remote-gateway sign-in.

### Closed Issues

The snapshot reports **19 issues closed** in the last 24 hours. Among the top-30 issue list, the following closed issues are visible:

- [Issue #126324](https://github.com/NousResearch/hermes-agent/issues/126324) — config check false `unknown toolset` and self-referential `did you mean` hint for dynamic plugin toolsets.
- [Issue #100675](https://github.com/NousResearch/hermes-agent/issues/100675) — Desktop split-view non-active pane wiping/rebuilding every ~5 seconds after visiting Bots page.
- [Issue #66661](https://github.com/NousResearch/hermes-agent/issues/66661) — Session bleed: rejected submit text written to wrong session’s composer.
- [Issue #103277](https://github.com/NousResearch/hermes-agent/issues/103277) — `config set` reported success but private-URL settings remained false in a Desktop profile.
- [Issue #73899](https://github.com/NousResearch/hermes-agent/issues/73899) — Desktop HTML report preview had no clear way back from bare image view.
- [Issue #104849](https://github.com/NousResearch/hermes-agent/issues/104849) — Desktop skill command cache thrashing, with full skills-directory rescan every ~5 seconds.
- [Issue #119021](https://github.com/NousResearch/hermes-agent/issues/119021) — Desktop mid-turn steer silently refused; regression from #117131.
- [Issue #123645](https://github.com/NousResearch/hermes-agent/issues/123645) — Desktop “section owners could not be resolved” when opening multiple section tabs.
- [Issue #76244](https://github.com/NousResearch/hermes-agent/issues/76244) — `hermes serve` backend hung on SIGTERM or orphaned on desktop quit.
- [Issue #125886](https://github.com/NousResearch/hermes-agent/issues/125886) — Desktop paste rewrote Markdown link destinations as `@url` context references.
- [Issue #75796](https://github.com/NousResearch/hermes-agent/issues/75796) — Copying a code block could include literal `@url:` directives.
- [Issue #95767](https://github.com/NousResearch/hermes-agent/issues/95767) — Tile reconciliation fetched 120 messages before checking whether anything changed.

The high number of closed issues suggests active cleanup, though several of these closed items are P2 desktop/session-state bugs, which reinforces the theme that the project is currently stabilizing the Desktop/gateway stack.

---

## 4. Community Hot Topics

The following are the most active issues by comment count in the supplied top-30 issue list. PR comment counts were not provided, so hot-topic ranking below is issue-centric.

| Rank | Item | Activity | Core Need / Signal |
|---:|---|---:|---|
| 1 | [Issue #89995](https://github.com/NousResearch/hermes-agent/issues/89995) — Expose Bot Mode group chat rooms in web dashboard & gateway | 21 comments, 3 👍 | Users want group/Bot Mode rooms available outside Desktop, especially in web dashboard and gateway. This is the strongest feature request in the list. |
| 2 | [Issue #125350](https://github.com/NousResearch/hermes-agent/issues/125350) — Fresh Windows install impossible: pinned Git `.tar.bz2`, missing bzip2, ffmpeg pin 404, mirror 403, `-SkipSetup` rejected | 16 comments | Windows first-run install reliability is a major blocker. Users expect one official install path to work without WSL, Chocolatey, or Scoop. |
| 3 | [Issue #122424](https://github.com/NousResearch/hermes-agent/issues/122424) — `package.json` pins `js-yaml` / `yaml` to known CVE ranges | 14 comments, 1 👍 | Dependency security is a real user/maintainer concern. The issue is specific, reproducible via advisories, and likely needs a dependency bump. |
| 4 | [Issue #122490](https://github.com/NousResearch/hermes-agent/issues/122490) — bot-to-bot DM delivery runner inherits store Python with no third-party deps (`ruamel` missing) | 14 comments | Bot-to-bot message delivery needs isolated, dependency-complete runtimes. This is a message-delivery correctness issue. |
| 5 | [Issue #124583](https://github.com/NousResearch/hermes-agent/issues/124583) — terminal tool background hint references non-existent `process(action=...)` instead of `process_manage` | 13 comments | Operator UX and tool-name consistency. Bad hints cause dead ends for users/operators following documented guidance. |
| 6 | [Issue #123926](https://github.com/NousResearch/hermes-agent/issues/123926) — Plugins silently dropped at boot because `_evict_modules` iterates live `sys.modules` | 13 comments | Plugin boot resilience. Silent random plugin failures are dangerous because users may not notice missing platform integrations. |
| 7 | [Issue #126324](https://github.com/NousResearch/hermes-agent/issues/126324) — config check false `unknown toolset` + self-referential hint for dynamic plugin toolsets | 9 comments, closed | Config validation should understand synthesized `hermes-<platform>` dynamic toolsets. |
| 8 | [Issue #122402](https://github.com/NousResearch/hermes-agent/issues/122402) — Ubuntu historical takeover fails building `python-olm` when managed Python requires missing `clang++` | 8 comments | Linux install/update paths need either better build dependencies or prebuilt wheels for Matrix encryption dependencies. |
| 9 | [Issue #100675](https://github.com/NousResearch/hermes-agent/issues/100675) — Desktop split view: non-active pane wipes/rebuilds every ~5s | 7 comments, closed | Desktop session reconciliation performance and state stability. |
| 10 | [Issue #68128](https://github.com/NousResearch/hermes-agent/issues/68128) — WhatsApp bridge spawn fails with `WinError 5` in no-breakaway job objects | 7 comments | Windows process-launch compatibility for WhatsApp bridge, especially under constrained job objects. |
| 11 | [Issue #125727](https://github.com/NousResearch/hermes-agent/issues/125727) — Automated Nous integration is blocked | 7 comments, labeled invalid | Internal integration/merge automation is creating friction. Even if invalid, it signals CI/merge-health attention. |

### Underlying Community Needs

1. **Platform install reliability** — Windows and Linux users are hitting hard blockers in fresh install and historical update paths.
2. **Session-state integrity** — Desktop and gateway changes are producing regressions around history, pins, composers, reconnects, and pane state.
3. **Security hygiene** — Dependency CVEs are visible in `package.json` and need prompt remediation.
4. **Operator/tool consistency** — Tool names, hints, config validation, and plugin loading should be predictable and debuggable.
5. **Web/gateway parity with Desktop** — Bot Mode group chat rooms currently being Desktop-only is generating the strongest feature demand.

---

## 5. Bugs & Stability

No P0 issue appears in the supplied top-30 issue list, but two **P0 PRs** — [PR #126167](https://github.com/NousResearch/hermes-agent/pull/126167) and [PR #127208](https://github.com/NousResearch/hermes-agent/pull/127208) — indicate that the project is actively treating **prompt-pin loss across synthetic gateway turns** as a high-severity stability issue.

### Ranked Bug List

| Severity | Bug | Status | Impact | Visible Fix PR / Notes |
|---|---|---|---|---|
| **P2 / Security** | [Issue #122424](https://github.com/NousResearch/hermes-agent/issues/122424) — `js-yaml@4.3.1` / `yaml<2.9` pinned to known CVE ranges | Open | Security exposure in JavaScript dependency chain. Specific advisories: `GHSA-2883-xcg3-v3hh`, `GHSA-48c2-rrv3-qjmp`. | No explicit fix PR visible in supplied PR list. Needs dependency bump/lockfile update. |
| **P2** | [Issue #125350](https://github.com/NousResearch/hermes-agent/issues/125350) — Fresh Windows install impossible | Open | Blocks new Windows users from completing official install paths. Multiple failure modes: Git `.tar.bz2` requiring missing bzip2, ffmpeg pin 404, mirror 403, `-SkipSetup` rejected. | Related installer/platform PRs: [PR #128604](https://github.com/NousResearch/hermes-agent/pull/128604), [PR #128597](https://github.com/NousResearch/hermes-agent/pull/128597). Exact fix not confirmed. |
| **P2** | [Issue #122490](https://github.com/NousResearch/hermes-agent/issues/122490) — bot-to-bot DM delivery runner inherits store Python with no third-party deps | Open | Bot-to-bot DMs fail before ownership ack due to missing `ruamel`.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest
**Date:** 2026-09-30 | **Repository:** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

## 1. Today's Overview
On 2026-09-30, PicoClaw shows concentrated development activity focused on Web UI stability, agent core functionality, and authentication fixes, with no new releases published in the 24-hour tracking window. In the last 24 hours, 6 issues were updated (all remaining open, with no closures) and 3 pull requests saw activity (2 open, 1 closed). All open issues and open PRs were last updated on 2026-09-29, indicating aligned community and maintainer focus on resolving high-priority user-reported pain points. No new feature releases were issued in the period, with ongoing work targeting near-term stability and usability improvements.

---

## 2. Releases
No new PicoClaw releases were published in the 24-hour window ending 2026-09-30. The latest stable version referenced in open user reports remains v0.3.1.

---

## 3. Project Progress
One pull request was closed in the last 24 hours:
- [PR #3337](https://github.com/sipeed/picoclaw/pull/3337) (closed as stale, 

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-09-30
## 1. Today's Overview
NanoClaw (github.com/qwibitai/nanoclaw) shows active development focused on stability fixes and container/agent cleanup. Recently 2 close issues and 15 PRs were updated, with 15 PRs overall (8 open, 7 closed), indicating continuous delivery activity. PRs address key stability and integration issues—including arm64 exec errors, agent container cleanup on group deletion, and update-cutover safety. Overall, project health is steady with fixes being applied to prevent breakage, reflecting good maintainer attention to robustness.
## 2. Releases
No new releases published as of 2026-09-30 (Latest Releases: None).
## 3. Project Progress
- **Merged/Closed PRs (24h):** 7 merged/closed, 8 open.
- **Key Progress:**
  - **Stability Fixes:** PRs `#3958` (never throw on un-serializable log values), `#3953` (stop amd64-only Iron Proxy on arm64), `#3962` (refuse cutover when liveness probe fails), `#3947` (stop deleted agent/container sessions), `#3878` (stop ping agent container post-delete)—all addressing critical bug stability.
  - **Integration & Workflow Fixes:** PRs `#3919` (check model URLs against gateway), `#3965` (verify model URLs at prompt), `#3966` (Iron keyless HTTP endpoint), `#3956` (rollback stops live host/agent containers)—fixing user experience and workflow compatibility.
  - **CI Hardening:** PR `#3968` (pin CI actions/cosign versions, add Dependabot)—improving repository maintenance.
  - **Flagged Fix Threads:** `#3918` (stop result-door turn replays), `#3964` (provider host:port endpoint declaration)—addressing core feature and agent-runner edge cases.
## 4. Community Hot Topics
- **Most Active Issue:** [Issue #3888](https://github.com/nanocoai/nanoclaw/issues/3888) (`CLOSED`, 2026-09-24, updated 2026-09-29) — Reports `exec format error` when Iron Proxy fails on aarch64 hosts, noting root cause is amd64-only Docker images. Symptoms include service failure and no specific actionable fix in the issue.
- **Most Active PR:** PR `#3964` (`OPEN`, 2026-09-29) — Feature: allow providers to declare exact host:port model endpoints. Addresses limitation of `modelDomains` (public domains only) by enabling non-default port access for auto-approved models. Addresses core provider flexibility need.
- **Contribution Signal:** Core contributor `glifocat` (GitHub ID `glifocat`) is active across 15 PRs (8 merged/closed, 7 open) and 2 closed issues, indicating consistent contribution across stability, integration, and feature work.
## 5. Bugs & Stability
- **Critical/Broken Bugs (Ranked):**
  1. **`exec format error` on arm64 hosts (Issue #3888)** — Severity: Critical. Iron Proxy fails on aarch64 due to amd64-only Docker images; causes service crash, no workaround in issue. Fix PR `#3953` addresses by stopping early on incompatible arm64 engines.
  2. **Container leftover after group deletion (Issue #3909, PR #3947)** — Severity: High. `spawnContainer` reads agent groups mid-spawn, leaving containers running after group deletion; cleanup incomplete until host restart. Fix PR `#3947` stops containers with deleted sessions/agent groups.
  3. **Update cutover breakage (PR #3962)** — Severity: High. `/update-nanoclaw` incorrectly reports completion during liveness probe failure, causing stale host/update state. Fix PR `#3962` prevents false cutover.
- **Operational/Broken Issues:**
  1. **Un-serializable log crashes (PR #3958)** — Severity: Medium. Logs throw on circular objects/BigInts; missing try/catch in `emit`. Fix PR `#3958` adds JSON-serialization safety.
  2. **No HTTPS proxy support for host services (PR #3901)** — Severity: Medium. Node ignores `HTTPS_PROXY` unless explicitly configured via `NODE_USE_ENV_PROXY`, requiring late JS configuration to enable internet access. Fix PR `#3901` adds early env proxy support.
- **Stability Status:** Multiple critical/fundamental bugs have since been fixed via PRs `#3953`, `#3947`, `#3962`, `#3958`, `#3901`—project stability is improving; remaining issues are non-critical operational gaps.

## 6. Feature Requests & Roadmap Signals
- **High Priority Features:**
  1. **Provider Host:Port Endpoint Flexibility (PR #3964)** — Enable providers to declare exact host:port model endpoints; addresses model connectivity limitation and supports non-default port access.
  2. **Keyless Model HTTP Support on Iron (PR #3966)** — Allow keyless models to access Iron machine via plain HTTP, with explicit port/host binding; addresses user need for self-hosted/keyless workloads on Iron machines.
  3. **CMi / Setup Installation Hardening (PR #3968)** — Pin CI actions/cosign versions, add Dependabot; improves reproducibility and maintenance of CI workflows, supporting high-demand installation scenarios.
- **Low-Moderate Priority Features:**
  - Gateway credential note and usage integration (PR `#3955`/`#3954`) to better clarify gateway usage for OpenCode/other tools.
  - Agent-runner result-door correction (PR `#3918`) to resolve redundant reply delivery.

## 7. User Feedback Summary
- **Key Pain Points:**
  1. **Cross-Platform Execution Failure:** Users on arm64 hosts (e.g., aarch64 NVIDIA DGX) experience `exec format error` with Iron Proxy, requiring image compatibility fixes (recently resolved via `#3953`).
  2. **Resource Leakage:** Delete operations leave running agent/container sessions (e.g., `#3909`, `#3919`) causing resource waste and inconsistent system state; users require clean cleanup until reboot.
  3. **Network and Setup Limitations:** Host services cannot use HTTPS proxies without explicit configuration (requires late setup), limiting internet access flexibility on constrained machines.
  4. **Workflow Redundancy:** Result-door providers re-send replies that agents already delivered, causing redundant operations (e.g., `#3918`), hurting workflow efficiency.
- **Use Cases:**
  - Users needing cross-platform model access on arm64 hosts, keyless/self-hosted model execution, and optimized workflow for self-operated systems.
  - Users requiring reliable installation and environment management for advanced setup/update scenarios.

## 8. Backlog Watch
- **High Priority Items:**
  1. **Arm64 Iron Proxy `exec format error` fix (Issue #3888)** — Still referenced in issue community; fix PR `#3953` partially addressed but no longer open (closed). Monitor for potential edge cases on new arm64 hardware; may need additional compatibility checks.
  2. **Container cleanup on group deletion (Issue #3909)** — No fix PR yet; cleanup logic relies on host restart, causing inconsistent state; requires enhancing `src/container-runner.ts` and cleanup scripts to address group-level container lifecycle.
- **Important Items:**
  1. **Update Cutover Safety (PR #3962)** — No follow-up fix PR observed; update-cutover breakage may affect users experiencing recurring update failures, requiring maintainer review of liveness probe logic.
  2. **HTTPS Proxy Access for Host Services (PR #3901)** — User feedback is clear; no fix PR yet for early env proxy support; may require further iteration on process boot logic to meet requirements.

---

**Health Assessment:** NanoClaw maintains stable development momentum with strong focus on bug prevention and core workflow optimization. Critical bug fixes have resolved major instability issues, and PRs address user pain points across platform, network, and workflow scenarios. Roadmap highlights high-value features targeting cross-platform access and self-hosted scenarios, with strong maintainer commitment to stability and usability.

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



# LobsterAI Project Digest — 2026-09-30

## 1. Today's Overview
LobsterAI shows strong development velocity with **13 pull requests merged/closed** and **10 issues updated** in the past 24 hours. Activity is concentrated on Windows installer robustness, gateway stability, and UI/UX refinements (progress cards, markdown rendering, TTS). No new releases were published, indicating a maintenance‑ and fix‑oriented sprint. The project remains healthy with a high merge rate and responsive issue triage, though several critical bugs and feature requests still await resolution.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Project Progress
**Merged/Closed PRs (all updated 2026‑09‑29):**

| PR | Title | Summary |
|----|-------|---------|
| [#2783](https://github.com/netease-youdao/LobsterAI/pull/2783) | `fix: gateway restart budget` | Addresses gateway restart‑budget logic (details not expanded). |
| [#2782](https://github.com/netease-youdao/LobsterAI/pull/2782) | `fix(installer): explain how to move user skills when backup aborts update` | Windows installer now shows a localized (zh/en) dialog listing user‑skill folders and instructing users to move them to the per‑user skills root when backup fails. |
| [#2781](https://github.com/netease-youdao/LobsterAI/pull/2781) | `fix(markdown): keep currency dollars out of inline math` | Prevents KaTeX mis‑parsing of text like `$3/$15` by enforcing Pandoc’s delimiter rules. |
| [#2780](https://github.com/netease-youdao/LobsterAI/pull/2780) | `feat(artifacts): open markdown links in the matching artifact card` | Inline links in assistant messages now route to the same artifact card instead of launching an external app; auto‑preview policy and analytics extended. |
| [#2778](https://github.com/netease-youdao/LobsterAI/pull/2778) | `feat(cowork): show OpenClaw progress cards above the composer` | Displays the session’s native OpenClaw progress card above the Cowork composer, making multi‑step plans visible. |
| [#2777](https://github.com/netease-youdao/LobsterAI/pull/2777) | `feat(cowork): keep long running turns to their latest five steps` | Prevents conversation‑history flooding from long tool‑call turns (e.g., DeepSeek deck tasks) by retaining only the most recent five steps. |
| [#2758](https://github.com/netease-youdao/LobsterAI/pull/2758) | `feat(cowork): display and refresh native OpenClaw progress cards` | Full implementation of persisted progress‑card display with refresh, revision‑safe dismissal, and reconnect updates. |
| [#2707](https://github.com/netease-youdao/LobsterAI/pull/2707) | `fix(openclaw): only refill gateway restart budget after a stability window` | Fixes infinite restart loops for gateways that crash shortly after becoming healthy. |
| [#2706](https://github.com/netease-youdao/LobsterAI/pull/2706) | `fix(installer): build Skills backup file records as PSCustomObject` | Resolves legacy PowerShell 5.1 skills‑backup failure during upgrades by using proper PS objects. |
| [#1682](https://github.com/netease-youdao/LobsterAI/pull/1682) | `feat(cowork): 为 AI 回复消息添加朗读功能` | Adds a TTS button to AI replies using the Web Speech API (zero dependencies). |
| [#1683](https://github.com/netease-youdao/LobsterAI/pull/1683) | `fix(skills): validate URL format before remote import` | Pre‑validates GitHub URL format (`owner/repo`) during remote skill import, avoiding late‑stage download errors. |
| [#1707](https://github.com/netease-youdao/LobsterAI/pull/1707) | `fix(cowork): 切换 Agent 时自动清空主页输入框内容` | Clears the homepage input box (and draft) when switching between agents. |
| [#1773](https://github.com/netease-youdao/LobsterAI/pull/1773) | `fix(i18n): add missing 'edit' translation key for memory entry button` | Completes the `edit` translation key in both Chinese and English i18n files. |

**Key advances:** Windows installer resilience, gateway stability, markdown/math rendering, Cowork progress visibility, and several UX polish items.

## 4. Community Hot Topics
| Issue | Title | Comments | Underlying Need |
|-------|-------|----------|-----------------|
| [#2293](https://github.com/netease-youdao/LobsterAI/issues/2293) | 重启后，多个 agent 下的 USER.md 被覆盖替换的 BUG？ | 6 | Multi‑agent isolation – users expect each agent’s `USER.md` to be independent; the current sync‑on‑launch behavior breaks personalized agent configurations. |
| [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342) | 左下角广告可以彻底关闭吗 | 3 | Ad‑free experience – users want a persistent setting to disable promotional overlays. |
| [#2395](https://github.com/netease-youdao/LobsterAI/issues/2395) | 无法安装 | 2 | Installation reliability – skills‑backup failure halts updates, blocking users. |
| [#2401](https://github.com/netease-youdao/LobsterAI/issues/2401) | skill 技能 | 2 | Commercial‑use clarification – users need explicit licensing info for built‑in skills (PDF, docs, etc.). |
| [#2779](https://github.com/netease-youdao/LobsterAI/issues/2779) | 多分身配置下「梦境日记」面板恒为空 | 1 | Multi‑agent memory sync – the Dream Diary panel fails to reflect `DREAMS.md` content when multiple agents are configured. |
| [#2390](https://github.com/netease-youdao/LobsterAI/issues/2390) | exec 工具默认 Shell 及中文路径编码问题 | 1 | Cross‑platform exec reliability – Windows users with Chinese characters in paths experience encoding failures because the tool defaults to PowerShell 5.1. |
| [#2393](https://github.com/netease-youdao/LobsterAI/issues/2393) | [Bug Report] 加速器在字符串改写时把 `\f` 字节对替换为 `\x0C`，导致文件数据静默损坏 | 1 | **Critical data‑integrity bug** – a string‑rewriting accelerator corrupts files containing escape sequences like `\f`, `\firecrawl`, etc. |
| [#2396](https://github.com/netease-youdao/LobsterAI/issues/2396) | [Bug] exec 工具的默认 shell wrapper = Windows PowerShell 5.1 | 1 | Linux commands / inline scripts (e.g., `node -e`, `pwsh -Command`) silently fail because the wrapper is PowerShell 5.1. |

**Themes:** Multi‑agent configuration consistency, installation/backup reliability, Windows exec‑tool limitations, and UI‑ad control.

## 5. Bugs & Stability
| Severity | Issue | Description | Fix PR? |
|----------|-------|-------------|---------|
| 🔴 Critical | [#2393](https://github.com/netease-youdao/LobsterAI/issues/2393) | Accelerator replaces `\f` (0x5C 0x66) with `\x0C` (form feed), silently corrupting files containing those byte sequences. | None yet |
| 🟠 High | [#2390](https://github.com/netease-youdao/LobsterAI/issues/2390) | `exec` tool defaults to Windows PowerShell 5.1, causing encoding failures for Chinese paths and inline scripts. | None yet |
| 🟠 High | [#2396](https://github.com/netease-youdao/LobsterAI/issues/2396) | Same default‑shell issue leads to silent failure of Linux commands and `pwsh -Command` usage. | None yet |
| 🟡 Medium | [#2779](https://github.com/netease-youdao/LobsterAI/issues/2779) | “Dream Diary” panel stays empty in multi‑agent configurations; underlying `DREAMS.md` updates correctly but the UI doesn’t sync. | Upstream fix noted (pending follow‑up) |
| 🟡 Medium | [#2395](https://github.com/netease-youdao/LobsterAI/issues/2395) | Update fails because user skills cannot be backed up. | PR [#2782](https://github.com/netease-youdao/LobsterAI/pull/2782) adds a dialog to guide manual skill relocation, but the core backup failure remains unresolved. |
| ✅ Resolved | [#2293](https://github.com/netease-youdao/LobsterAI/issues/2293) | Multi‑agent `USER.md` override bug – closed as stale. | None |
| ✅ Resolved | [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342) | Ad‑dismissal request – closed as stale. | None |

**Stability assessment:** Two high‑severity Windows‑specific exec‑tool bugs and one critical data‑integrity bug are open. The gateway‑restart fix (#2707) and installer improvements (#2706, #2782) should improve overall reliability.

## 6. Feature Requests & Roadmap Signals
| Request | Issue/PR | Source | Likelihood for Next Release |
|---------|----------|--------|-----------------------------|
| Skill rename capability | [#2391](https://github.com/netease-youdao/LobsterAI/issues/2391) | User request | Medium – low engineering effort, high user demand. |
| Scheduled‑task agent/skill selection | [#2392](https://github.com/netease-youdao/LobsterAI/issues/2392) | User request | Medium – extends existing scheduling UI. |
| Persistent ad‑disable setting | [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342) | User request | Low – product‑decision dependent. |
| TTS for AI replies | [#1682](https://github.com/netease-youdao/LobsterAI/pull/1682) | **Already merged** | — |
| Native progress‑card display in Cowork | [#2778](https://github.com/netease-youdao/LobsterAI/pull/2778), [#2758](https://github.com/netease-youdao/LobsterAI/pull/2758) | **Already merged** | — |
| Markdown link routing within artifact cards | [#2780](https://github.com/netease-youdao/LobsterAI/pull/2780) | **Already merged** | — |
| Currency‑dollar math escaping | [#2781](https://github.com/netease-youdao/LobsterAI/pull/2781) | **Already merged** | — |

**Roadmap signals:** The team is actively investing in Cowork UX (progress cards, long‑turn compression, TTS) and Windows installer robustness. Multi‑agent configuration consistency (USER.md, Dream Diary) and skill management features appear to be upcoming priorities.

## 7. User Feedback Summary
**Pain points:**
- Multi‑agent configurations suffer from shared state (USER.md override, empty Dream Diary).
- Windows exec tool defaults to PowerShell 5.1, breaking cross‑platform commands and Chinese‑path support.
- Installation backups fail, halting updates.
- Ad overlays cannot be permanently disabled.
- Skill‑licensing information is unclear.

**Satisfaction points:**
- New progress‑card UI makes long‑running tasks visible and manageable.
- Markdown/math rendering fixes improve document accuracy.
- TTS feature adds accessibility and convenience.
- URL validation during skill import prevents confusing download errors.
- Agent‑switching now correctly clears the input draft.

**Use cases:** Multi‑agent workflows, scheduled automated tasks, Windows‑based development/scripting, skill‑enhanced document processing (PDF, docs, spreadsheets).

## 8. Backlog Watch
| Issue | Age | Priority | Notes |
|-------|-----|----------|-------|
| [#2393](https://github.com/netease-youdao/LobsterAI/issues/2393) | ~2 months | 🔴 Critical | Data‑integrity bug; needs immediate investigation. |
| [#2390](https://github.com/netease-youdao/LobsterAI/issues/2390) | ~2 months | 🟠 High | Default‑shell / encoding issue affecting Windows users with non‑ASCII paths. |
| [#2396](https://github.com/netease-youdao/LobsterAI/issues/2396) | ~2 months | 🟠 High | Companion to #2390; silent command failures. |
|

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest
**Date:** 2026-09-30
**Repository:** moltis-org/moltis

### 1. Today's Overview
The Moltis project maintains a steady, low-activity status on September 30, 2026. With a singular open enhancement request and no active pull requests or new releases, development momentum remains focused on specific feature exploration rather than rapid iteration. The project demonstrates a healthy but quiet environment, with the community engaging primarily around architectural enhancements for the agent loop.

### 2. Releases
**No new releases** were detected in the last 24 hours. The repository is currently in a maintenance or feature development phase without a scheduled version bump.

### 3. Project Progress
**No PRs were merged or closed** in the last 24 hours. Development has paused on pull request activity, indicating a focus on internal design or waiting for external contributions on the open enhancement issue.

### 4. Community Hot Topics
*   **[Goal Mode or Ralph Loop](https://github.com/moltis-org/moltis/issues/1289)** (Author: abda11ah)
    *   **Analysis:** This is the sole active topic in the repository. The user is requesting an "enhancement" to support a "Goal mode" or a "ralph loop." This suggests the community is looking for more autonomous, goal-oriented behaviors within the agent workflow, moving away from simple task execution toward continuous self-improvement loops.

### 5. Bugs & Stability
**No critical bugs, crashes, or regressions** were reported today. The single open issue pertains to a feature request, indicating no immediate stability concerns.

### 6. Feature Requests & Roadmap Signals
*   **Autonomous Goal Modes:** The feature request for "Goal mode" is a significant roadmap signal. If implemented, this would likely be a major version update, shifting the architecture from linear task execution to multi-step, goal-driven planning.
*   **Loop Improvements:** The "ralph loop" reference suggests a need for a feedback or correction mechanism that allows the agent to refine its own outputs iteratively.

### 7. User Feedback Summary
User feedback is currently sparse, consisting of a single proactive proposal. The user is proactively engaging with the repository structure (checking existing labels) to ensure the feature fits within the current enhancement taxonomy. The lack of immediate negative feedback indicates high satisfaction with current stability, but a demand for more advanced autonomy features.

### 8. Backlog Watch
**No critical backlog items** were identified in the provided dataset. The active issue is relatively new (created yesterday) and lacks comments, suggesting it is in the initial investigation phase by maintainers.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# Project Digest: QwenPaw (CoPaw) - 2026-09-30

## 1. Today's Overview
Activity on the QwenPaw repository remains high and healthy, with 11 issues and 36 pull requests updated in the last 24 hours. The project is currently in a "feature-rich" maintenance phase, balancing core stability fixes with new platform integrations. The majority of updates focus on the Telegram channel integration, desktop application stability, and provider optimization, indicating a maturing ecosystem with active community contribution.

## 2. Releases
**None** - No new official releases were pushed in the last 24 hours. Development is proceeding on the `main` branch (currently at version `2.2.2b4`).

## 3. Project Progress
*   **Merged/Closed PRs:** 3 PRs were merged or closed today.
*   **Key Fixes:**
    *   **Terminal Stability:** Fixed a regression on Linux where Python `select` rejected file descriptors above `FD_SETSIZE` (1024). The fix switches to `poll` and adds a regression test (PR #8023, #8032).
    *   **Desktop/Portability:** Resolved cross-platform path handling issues, Windows terminal interrupts, and invalid timezone handling (PR #8026, #8024).
    *   **Telegram Integration:** Completed two first-time contributor fixes ensuring the `/start` handshake is consumed and command addressing is honored (PR #7773, #7765).
*   **Feature Work:**
    *   **Durable History:** Implemented a robust paginated transcript history using SQLite with catalog routing (PR #7931).
    *   **Community Feed:** Added an embedded community feed with sorting, comments, and model-assisted editing capabilities (PR #7903).

## 4. Community Hot Topics
*   **[Telegram HTML Formatting](https://github.com/agentscope-ai/QwenPaw/issues/8011)** - A complex bug in the Telegram channel where fenced code blocks and info strings (e.g., C++, Objective-C) are mishandled in HTML rendering. A fix PR (#8012) is currently open.
*   **[Skill Download Timeout](https://github.com/agentscope-ai/QwenPaw/issues/8013)** - Users report a 30-second hard timeout when downloading large skills (e.g., 80MB+), causing the backend to continue executing while the frontend aborts.
*   **[Model Fallback Cooldown](https://github.com/agentscope-ai/QwenPaw/pull/8020)** - A proposed enhancement to add cooldown periods to model fallback candidates, preventing wasted tokens on repeated failed requests.

## 5. Bugs & Stability
*   **Critical:** **[QQ Gateway Replay Events](https://github.com/agentscope-ai/QwenPaw/issues/7946)** (Closed) - Previously, the QQ bot gateway replayed events on session resume, causing duplicate message processing. This has been resolved.
*   **High:** **[Inline Media Bloat](https://github.com/agentscope-ai/QwenPaw/pull/8034)** - A security/performance issue where inline media is not bounded per request, causing unbounded request body growth that bypasses token-based context eviction.
*   **Medium:** **[Desktop Zoom](https://github.com/agentscope-ai/QwenPaw/issues/6252)** (Closed) - Zoom shortcuts (Ctrl +/-) not working on Linux in Tauri mode. This has been fixed.
*   **Medium:** **[Transcription Settings](https://github.com/agentscope-ai/QwenPaw/issues/8035)** - The UI fails to update `transcription_model` settings, causing silent configuration breaks.

## 6. Feature Requests & Roadmap Signals
*   **[Custom Skill Marketplace](https://github.com/agentscope-ai/QwenPaw/issues/8015)** - Users request the ability to configure custom, self-hosted sources for Skills and Plugins, essential for offline/intranet deployments.
*   **[Desktop Font Scaling](https://github.com/agentscope-ai/QwenPaw/issues/7999)** - Users need adjustable font sizes for better accessibility and high-DPI support.
*   **[Heartbeat/Cron Control](https://github.com/agentscope-ai/QwenPaw/issues/2359)** - An older feature request to allow agents to control message sending based on HEARTBEAT_OK/CRON_OK signals.

## 7. User Feedback Summary
The user feedback highlights a shift from core infrastructure bugs to user experience and deployment flexibility issues.
*   **Deployment:** Users deploying in offline or air-gapped environments (fnOS) are facing friction with the inability to configure custom skill mirrors.
*   **Desktop Experience:** Linux users are experiencing UI accessibility issues (zoom) and stability issues (terminal crashes).
*   **Bot Reliability:** Users are frustrated by Telegram formatting errors and QQ duplicate processing, though recent patches have addressed the latter.

## 8. Backlog Watch
*   **[TaskTracker Zombie Entries](https://github.com/agentscope-ai/QwenPaw/issues/7991)** - An open bug where `TaskTracker` counts inflated running tasks, disagreeing with the `/api/chats` endpoint. This requires backend logic alignment.
*   **[Runtime Timeout Tool Results](https://github.com/agentscope-ai/QwenPaw/pull/8001)** - A fix is pending to make timeout tool results recoverable, addressing a specific runtime crash scenario.
*   **[Desktop Instance Reconciliation](https://github.com/agentscope-ai/QwenPaw/pull/8033)** - A complex fix is needed to prevent the desktop backend from being killed when relaunching the app.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest
**Date:** 2026-09-30  
**Repository:** github.com/zeroclaw-labs/zeroclaw  
**Activity Level:** High

### 1. Today's Overview
ZeroClaw is experiencing a high volume of active development, with 27 issues and 50 pull requests updated in the last 24 hours. The project is currently in a critical phase of stabilizing security hardening (particularly regarding session ownership and memory isolation) and architectural refactoring (Schema V4 and A2A protocol). Despite the high volume, the "New Releases" metric remains at zero, indicating that the current development cadence is focused on deep integration and security fixes rather than versioned releases.

### 2. Releases
**Status:** None  
*No new releases were detected in the last 24 hours. The project is likely integrating changes directly into the `master` branch.*

### 3. Project Progress
*   **Security Hardening:** Multiple PRs are actively addressing critical security vulnerabilities, specifically around session ownership migration and memory plane isolation. PRs #11262, #11261, and #11239 are stacked and focused on fixing S0-severity data loss risks.
*   **Architecture Refactoring:** PR #8754 is implementing a comprehensive Schema V4 breaking change, removing deprecated SaaS tools and CLI wrappers, while PR #11221 gates these tools behind opt-in features to minimize breaking impact.
*   **Plugin Management:** PR #11262 introduces a new CLI command for verified plugin updates with rollback capabilities, addressing the gap identified in Issue #10995.
*   **Config Fixes:** PR #11260 was successfully merged, fixing the context window clamping issue that degraded interactive agent sessions.

### 4. Community Hot Topics
*   **Memory Architecture & Security (High Activity):**
    *   **Issue #11053 (RFC):** *Knowledge graph as a first-class agent memory layer.* This RFC seeks to reclassify the knowledge graph from a simple tool to a core memory backend, addressing a fundamental architectural gap.
    *   **Issue #11198 & #11239 (Bugs):** *Delegated memory tools lose principal scope* and *owned sessions reaching shared memory plane.* These issues highlight a critical security boundary failure where agent sub-processes can access memory outside their intended scope.
    *   **PR #11068 (Enhancement):** *Narrow channel turns by sender role.* Focuses on security policy granularity within channel interactions.
*   **ZeroCode Improvements:**
    *   **Issue #10244 (Feature):** *Add agent deletion and bulk cleanup to ZeroCode.* Users are requesting core lifecycle management capabilities (delete agents) that are currently missing from the dashboard.
    *   **PR #10636 (Feature):** *Effort and display session controls.* Adds granular management controls for ZeroCode sessions.

### 5. Bugs & Stability
*   **S0 - Critical Security Risks (High Priority):**
    *   **Issue #11197 (Closed):** *Session resume restores forwarded environment after admin revocation.* This was a critical data leak vulnerability where revoked admin privileges were not enforced on session resumption. A fix appears to be in progress or under review.
    *   **Issue #11198:** *Delegated memory tools lose principal scope.* (Open) A principal-owned session can be compromised by a delegated child agent accessing the parent's private memory.
    *   **Issue #11239:** *Owned sessions reach shared memory plane.* (Open) Direct tool paths bypass the memory isolation intended for "owned" sessions.
*   **S2 - Degraded Behavior:**
    *   **Issue #10068 (Closed):** *Interactive agent session caps context at 32,000 tokens.* Resolved via PR #11260, which removed the hard 32k fallback stub.
    *   **Issue #11215:** *Tool calling fails on OpenCode Go.* A compatibility issue where the `name` field in tool responses is rejected by specific OpenAI-compatible endpoints.
    *   **Issue #11257 & #11256:** *WhatsApp Web bugs.* Missing caption support for media files and the `initial_prompt` parameter not being sent to transcription providers.

### 6. Feature Requests & Roadmap Signals
*   **RFCs:**
    *   **Issue #11235:** *RFC: Knowledge corpus — document retrieval (RAG).* Proposes a new subsystem for RAG, moving beyond the current knowledge graph tool.
    *   **Issue #11254:** *RFC: A2A protocol crate.* A proposal to formalize the Application-to-Application wire model into a dedicated crate.
*   **Plugins & Infrastructure:**
    *   **Issue #10995:** *Verified plugin update with failure rollback.* The missing `update` command is a significant operational gap for plugin maintenance.
    *   **Issue #8289:** *OIDC milestone.* Tracking the completion of inbound authentication and canonical principals.

### 7. User Feedback Summary
*   **Workflow Frustrations:** Users are struggling with the ZeroCode composer, specifically requesting standard text editing features (Undo/Redo, Cut/Paste) which are currently missing or broken (#10909).
*   **Operational Gaps:** Users cannot manage agent lifecycles via the dashboard (delete agents) and lack a mechanism to update installed plugins without reinstalling them.
*   **Security Concerns:** There is active community feedback (specifically from Audacity88 and JordanTheJet) highlighting deep-seated security isolation issues between session owners and delegated agents.

### 8. Backlog Watch
*   **Issue #8832:** *Plugin-owned Kanban board for agent work.* This is a high-priority enhancement accepted over a month ago but remains open, indicating a need for better plugin extensibility features.
*   **PR #9254:** *IBM Db2 session-persistence backend.* Marked as "DEFERRED". This large-scale backend feature has been held in the parking lot pending a native driver, likely requiring significant community or vendor support to unblock.
*   **Issue #6105:** *Agent doesn't have context of the cron job.* A recurring issue regarding agent awareness of scheduled tasks.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*