# OpenClaw Ecosystem Digest 2026-10-02

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-01 23:34 UTC

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

**NanoBot Project Digest – 2026‑10‑02**  
*(GitHub repo: https://github.com/HKUDS/nanobot)*  

---

### 1. Today’s Overview
- The repository saw **no new issues** in the past 24 h, indicating a quiet bug‑reporting front.  
- Development activity was high: **17 pull‑requests** were touched, 14 remain open and **3 were closed/merged**.  
- Most of the work today is concentrated on **stability, security hardening, and core‑runtime refactors**, with a handful of feature‑focused PRs (remote WebUI connection, sub‑agent model reload, structured‑decision client) moving forward.  

---

### 2. Releases
*No new releases were published in the last 24 h.*  

---

### 3. Project Progress (Merged / Closed PRs)

| PR # | Title / Goal | Summary of Change | Impact |
|------|--------------|-------------------|--------|
| **2095** | *feat: add `read_image` tool for local multimodal inspection* | Introduces `ReadImageTool`, registers it in the agent loop, and allows multimodal content blocks to be returned from tool execution. | Expands NanoBot’s multimodal capabilities; useful for image‑centric workflows. |
| **2094** | *feat: explicit sub‑agent model config & in‑process runtime reload* | Adds `agents.defaults.subagent_model`, makes sub‑agent model selection explicit, and implements an application‑level hot‑reload path. | Improves model‑management flexibility and reduces downtime when swapping sub‑agents. |
| **5999** | *refactor: remove unused runtime & WebUI helpers* | Prunes dead code (duplicate settings routes, orphaned Weixin wrapper, obsolete test helpers) and cleans up CSS. | Reduces maintenance surface and bundle size. |

*All three PRs were merged/closed on 2026‑10‑01, moving the codebase forward without breaking changes.*

---

### 4. Community Hot Topics  
*(Most active/open PRs, judged by priority tags, recent updates and implied community interest.)*

| PR # | Focus | Why It Matters | Link |
|------|-------|----------------|------|
| **5941** (open) | *WebUI: connect to existing remote NanoBot instances* (NAN‑157) | Enables a local WebUI to discover and attach to a NanoBot already running on a server – a highly requested deployment pattern for teams with shared AI back‑ends. | https://github.com/HKUDS/nanobot/pull/5941 |
| **5536** (open) | *exec: fail closed when restricted shell lacks a sandbox* (P1) | Addresses a critical security regression (issue #4072) by enforcing sandbox requirements before executing restricted commands. | https://github.com/HKUDS/nanobot/pull/5536 |
| **5953** (open) | *tools: atomic writes for file tools* (P0) | Fixes torn‑file writes and crash‑window data loss for `WriteFileTool`, `EditFileTool`, `ApplyPatchTool`. Core for reliable file‑editing agents. | https://github.com/HKUDS/nanobot/pull/5953 |
| **5825** (open) | *feat: provider‑neutral structured decision client* (P2) | Replaces a JEV‑specific client with a reusable abstraction; opens the door to pluggable decision‑making back‑ends (e.g., OpenRouter System‑One). | https://github.com/HKUDS/nanobot/pull/5825 |
| **5885** (open) | *memory: gate idle transcript replacement on token threshold* (P1) | Refines the “idle compaction” policy to avoid degrading resume quality for short sessions. Improves user experience for lightweight interactions. | https://github.com/HKUDS/nanobot/pull/5885 |
| **5698** (open) | *webui: preserve explicit API types across search toggles* (P2) | Fixes a UI regression where toggling OpenAI web‑search unintentionally overwrote a user‑chosen API type. Enhances UI consistency. | https://github.com/HKUDS/nanobot/pull/5698 |
| **5483** (open) | *session: prevent deleted sessions from being recreated by delayed messages* (P2) | Stops “ghost” sessions that could be resurrected by late‑arrival messages, protecting data integrity after explicit deletion. | https://github.com/HKUDS/nanobot/pull/5483 |

*Underlying needs:*  
- **Remote orchestration** (PR 5941) reflects demand for multi‑node deployments.  
- **Security & data integrity** (PR 5536, 5953, 5678) dominate the high‑priority backlog, suggesting recent hardening initiatives.  
- **Consistent UI/UX** (PR 5698, 5339, 5601) indicates the community values a predictable WebUI, especially around API selection and message lifecycle.  
- **Scalable memory handling** (PR 5885) shows users are running longer sessions and care about resume fidelity.  

---

### 5. Bugs & Stability (ranked by severity)

| Severity | PR # | Issue | Current Status |
|----------|------|-------|----------------|
| **Critical** | **5536** | Restricted‑shell sandbox missing → command may escape workspace. | Open, under review (priority P1). |
| **Critical** | **5678** | DNS resolution can return empty/invalid addresses, opening SSRF vector. | Open, priority P2. |
| **High** | **5953** | Non‑atomic file writes cause torn content & possible crashes. | Open, priority P0 (most urgent). |
| **High** | **5483** | Delayed messages resurrect deleted sessions → data duplication. | Open, priority P2. |
| **Medium** | **5339** | Temporary chat messages not rejected after connection discard, leading to stray bus events. | Open, priority P2. |
| **Medium** | **5601** | Rejected WebUI messages leave stray resources (attachments, subscriptions, etc.). | Open, priority P2. |
| **Medium** | **5698** | API‑type selection lost when toggling web‑search, causing confusing UI state. | Open, priority P2. |
| **Low** | **5412** | Background gateway child output buffered, delaying logs. | Open, priority P2 (log‑visibility fix). |

*All of the above have corresponding PRs already opened; the security‑focused PRs (5536, 5678, 5953) should be prioritized for the next release.*

---

### 6. Feature Requests & Roadmap Signals

| Feature | Evidence (PR / Issue) | Likelihood for Next Release |
|---------|-----------------------|-----------------------------|
| **Remote instance discovery & connection** | PR 5941 (WebUI remote connect) | **High** – concrete implementation already in progress. |
| **Explicit sub‑agent model configuration & hot‑reload** | PR 2094 (merged) | **Implemented** – now part of the core runtime. |
| **Provider‑agnostic structured‑decision client** | PR 5825 (open) | **Medium‑High** – core abstraction is ready; next step is broader provider integration. |
| **Idle transcript gating by token count** | PR 5885 (open) | **Medium** – performance‑focused tweak, likely to ship once stability is confirmed. |
| **Atomic file‑tool writes** | PR 5953 (open, P0) | **High** – security‑critical; expected in the upcoming patch. |
| **Enhanced UI state preservation (API type, search toggle)** | PR 5698, 5339, 5601 | **Medium** – UI polish items will likely follow security fixes. |

---

### 7. User Feedback Summary
While the raw issue list is empty for the last day, the PR titles and priorities reveal the community’s pain points:

- **Deployment flexibility:** Users want to run a single NanoBot service centrally and connect to it from multiple local WebUIs (PR 5941).  
- **Reliability of file operations:** Torn files and crash windows have been reported, prompting an urgent atomic‑write fix (PR 5953).  
- **Security confidence:** Recent sandbox and DNS‑resolution bugs highlight a need for hardening, driving high‑priority security PRs.  
- **Consistent UI behavior:** Flaky API selection and message‑lifecycle bugs cause confusion, leading to several UI‑focused fixes.  
- **Memory efficiency:** Large or long‑running sessions suffer from aggressive transcript compaction; users request a smarter gating strategy (PR 5885).  

Overall sentiment appears **cautiously optimistic**: contributors are actively addressing critical bugs, and feature work aligns with real‑world deployment scenarios.

---

### 8. Backlog Watch (PRs needing maintainer attention)

| PR # | Reason for Attention | Current Labels |
|------|----------------------|----------------|
| **5941** | Feature core to remote usage; still **OPEN** after 5 days. | `feat(webui)`, `priority: p2` |
| **5601** | Resource leak on rejected messages; could affect production stability. | `conflict` |
| **5536** | Security fix; high priority (P1). | `bug`, `security`, `priority: p1` |
| **5483** | Session‑recreation bug; may cause data duplication. | `bug`, `regression`, `priority: p2` |
| **5825** | Structured decision client is a foundation for future provider integrations. | `provider`, `feature`, `priority: p2` |
| **5698** | UI regression affecting API selection; may confuse end‑users. | `bug`, `webui`, `priority: p2` |
| **5339** | Temporary chat message cleanup; could generate stray bus traffic. | `fix(webui)` |
| **5678** | SSRF guard improvement; critical for security posture. | `test`, `security`, `priority: p2` |
| **5412** | Log visibility for background processes; affects observability. | `conflict` |
| **5953** | Atomic writes – already P0, should be merged ASAP. | `bug`, `fix`, `priority: p0` |
| **5943** | Session persistence refactor to SQLite – large architectural change needing review. | `documentation`, `refactor`, `priority: p1` |
| **5885** | Memory‑gate threshold; needs performance validation. | `documentation`, `performance`, `priority: p1` |
| **5257** | Agent sustain‑goal runaway guard; could affect user experience. | `bug`, `priority: p2` |
| **5166** | Permission context leak; subtle but could cause security policy violations. | `question`, `fix`, `priority: p2` |

*Actionable tip:* Prioritizing the **security (5536, 5678, 5953)** and **session‑integrity (5483, 5339, 5601)** PRs will deliver the most immediate stability gains. The **remote‑connect feature (5941)** is the next high‑visibility functional improvement.

---

*Prepared by the NanoBot Open‑Source Analyst (2026‑10‑02). All links point to the official GitHub repository.*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest for 2026-10-02

---

## 1. Today's Overview

Hermes Agent logged **100 items updated in the past 24 hours** (50 issues, 50 PRs), confirming a high-velocity development cycle with 42 issues still open and active, 48 PRs in review, 8 issues closed, and 2 PRs merged/closed. **No new releases** were published today. The most significant development is a **coordinated security hardening push** led by contributor Froraut, delivering four profile-isolation fixes (Copilot credentials, computer-use approvals, persistent code-exec kernels, and update-recovery PID verification) that collectively address a class of CWE-668 resource-exposure vulnerabilities in multiplexed multi-profile deployments. Desktop remains the most contentious component, with a **cluster of right-click/context-menu regressions** and a prominent idle-resource-burn tracker attracting sustained community discussion. Gateway and multi-platform work is broad but incremental, touching Discord voice, DingTalk media, WeCom/SMS/email long-message delivery, SimpleX attachments, and WhatsApp JID resolution.

**Activity assessment:** High throughput, security-focused day. Merge rate is low (2 of 50 PRs), suggesting a large in-flight review queue rather than stagnation.

---

## 2. Releases

**No new releases were published on 2026-10-02.**

The latest shipped desktop version referenced in bug reports is **0.17.6** (see [#131004](https://github.com/NousResearch/hermes-agent/issues/131004)). The active PR queue — particularly the security hardening batch and the desktop zone-menu regression fixes — is expected to feed a near-term patch or minor release, but no release tag or changelog was generated today.

---

## 3. Project Progress

### Merged / Closed PRs

| PR | Title | Status | Impact |
|---|---|---|---|
| [#130975](https://github.com/NousResearch/hermes-agent/pull/130975) | `fix(desktop): play YouTube embeds through a loopback player host` | **Closed (merged path)** | Resolves the `file://` origin / Referer-strip problem that caused YouTube **Error 153** in the packaged Electron app. Re-landed via a different design in [#130984](https://github.com/NousResearch/hermes-agent/pull/130984) (still open for review). Closes [#106596](https://github.com/NousResearch/hermes-agent/issues/106596). |
| [#129921](https://github.com/NousResearch/hermes-agent/pull/129921) | `Withdrawn` | **Closed (withdrawn by author)** | No code impact. |

### Closed Issues (8 total in 24h; 5 visible in top-30)

| Issue | Title | Significance |
|---|---|---|
| [#106596](https://github.com/NousResearch/hermes-agent/issues/106596) | YouTube embeds fail with error 153 in desktop app | **Fixed.** Root cause: packaged renderer is a `file://` page; modern Electron drops the stamped `Referer` header YouTube requires. Fix routes embeds through a loopback player host. |
| [#17157](https://github.com/NousResearch/hermes-agent/issues/17157) | Discord slash command sync times out by recreating unchanged commands | **Fixed.** Safe-sync diff was misclassifying Discord-populated `integration_types` as Hermes-managed changes, causing unnecessary re-creation and timeouts on live gateways. |
| [#25799](https://github.com/NousResearch/hermes-agent/issues/25799) | Add `image_gen` provider for OpenAI-compatible image endpoints | **Closed** (resolved via implementation or re-scoping). |
| [#123216](https://github.com/NousResearch/hermes-agent/issues/123216) | Windows Desktop update always exits 124 — `assert-dist-built` spawns ~960 `node --check` processes | **Fixed.** The 600-second idle watchdog was cancelling updates that had already completed. Addressed in PR [#131001](https://github.com/NousResearch/hermes-agent/pull/131001) (open, `ci-reviewed`). |
| [#116774](https://github.com/NousResearch/hermes-agent/issues/116774) | `npm audit fix` for `agent-browser` doesn't persist across `hermes update` | **Fixed.** Fresh Node dependency reinstalls were reintroducing vulnerabilities. |

### Key In-Flight Work (not yet merged)

- **Profile isolation security hardening (Froraut batch):** Six PRs targeting a single systemic weakness — in a multiplexed Hermes process serving multiple profiles, per-profile state (credentials, approval grants, code-exec kernels, update-recovery metadata) was leaking across profile boundaries. See section 5 for details.
- **Desktop context-menu regression:** Two related issues ([#127313](https://github.com/NousResearch/hermes-agent/issues/127313), [#127997](https://github.com/NousResearch/hermes-agent/issues/127997)) trace to commit `ad2d4822e1`, which introduced a "zone menu" on right-click that now **replaces** the app-level context menu in pane bodies and the composer. No fix PR is listed yet; both are tagged `needs-decision`.
- **Desktop preview-tab session scoping:** PR [#131005](https://github.com/NousResearch/hermes-agent/pull/131005) scopes preview tabs to the session that opened them, fixing cross-session leakage ([#73890](https://github.com/NousResearch/hermes-agent/issues/73890)).
- **Windows update pipeline stabilization:** PR [#131001](https://github.com/NousResearch/hermes-agent/pull/131001) addresses same-commit re-runs on launch and reclassifies post-completion watchdog kills as success. PR [#129764](https://github.com/NousResearch/hermes-agent/pull/129764) adds PID-identity verification for the update-recovery host rendezvous.
- **Gateway long-message delivery:** PR [#130866](https://github.com/NousResearch/hermes-agent/pull/130866) extends the full-delivery pattern (previously fixed for other channels in #130727) to SMS, email, and both WeCom adapters.
- **DingTalk rich-text media recovery:** PR [#131007](https://github.com/NousResearch/hermes-agent/pull/131007) adds ordered code fallbacks for DingTalk rich-text media downloads.
- **Discord voice-mode cleanup on restart:** PR [#128655](https://github.com/NousResearch/hermes-agent/pull/128655) ensures a gateway restart ends the voice mode of a call that crashed mid-session, preventing the text channel from speaking every reply after the call.

---

## 4. Community Hot Topics

Ranked by comment count and engagement:

### ① Cross-Gateway Bot Collaboration — [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)
**30 comments | 4 👍 | Open since 2026-08-29 | P3**
- **What it is:** A feature request to let Hermes bots collaborate *across* different gateways (e.g., a Discord bot and a WhatsApp bot talking to each other via the gateway layer).
- **Status:** Explicitly **blocked** on [#106742](https://github.com/NousResearch/hermes-agent/issues/106742) (unified gateway runtime). Maintainer Teknium deferred "Desktop continuity" on 2 Sep until Group Chat on `main` stabilizes, with a revisit expected ~1 month later (≈ mid-October).
- **Underlying need:** Users running multi-platform bot fleets want orchestration without manual bridging. The 30-comment thread indicates strong community interest and active discussion of architectural approaches. This is a **roadmap blocker**, not a near-term deliverable.

### ② Desktop Idle Resource Burn — [#127647](https://github.com/NousResearch/hermes-agent/issues/127647)
**25 comments | Open since 2026-09-29 | P2 | Tracker**
- **What it is:** A scope-map tracker for persistent renderer CPU/GPU, backend serve CPU, and memory consumption in the desktop app. References related issues [#122413](https://github.com/NousResearch/hermes-agent/issues/122413) and [#88288](https://github.com/NousResearch/hermes-agent/issues/88288).
- **Underlying need:** The desktop app is burning significant resources at idle, degrading the user experience on personal machines. The tracker format (with a "triage plan" and "related PRs, all states" index) suggests the maintainer team is treating this as a **structured, multi-PR effort** rather than a one-off fix. This is likely a recurring pain point for users running the desktop app alongside other workloads.

### ③ Automated Nous Integration Blocked by Merge Conflicts — [#125727](https://github.com/NousResearch/hermes-agent/issues/125727)
**13 comments | Open since 2026-09-27 | P3 | Tagged `invalid`**
- **What it is:** The scheduled automated merge from the Nous repo to Enterkey is failing due to conflicts across a large set of agent-core files (`permissions.py`, `agent_init.py`, `conversation_loop.py`, `context_compressor.py`, `credential_pool.py`, etc.).
- **Underlying need:** This is an **internal CI/CD and integration health** issue, not a user-facing feature. The `invalid` tag may indicate the issue was filed in error or is being tracked elsewhere, but 13 comments suggest active discussion. The breadth of conflicting files hints at significant divergence between the two codebases.

### ④ Desktop Right-Click Zone Menu Regression — [#127313](https://github.com/NousResearch/hermes-agent/issues/127313) + [#127997](https://github.com/NousResearch/hermes-agent/issues/127997)
**12 + 3 comments | Open since 2026-09-29 | P2 | `needs-decision`**
- **What it is:** Commit `ad2d4822e1` introduced a "pane-body zone menu" (Reload / Close others / Hide tab strip / Minimize) that **replaces** the native context menu. In [#127313], right-clicking the chat transcript opens the zone menu instead of text Copy / app menu. In [#127997], right-clicking the composer opens the zone menu instead of Cut / Copy / Paste.
- **Underlying need:** Basic text-editing and context-menu functionality is broken in the desktop app. This is a **regression**, not a new bug, and the `needs-decision` tag suggests the maintainers are weighing whether to revert `ad2d4822e1` or add a mode toggle. The fact that two separate issues were filed for the same root cause within the same week indicates the regression is immediately visible and disruptive to users.

### ⑤ Nous Portal OAuth Device Code Flow Broken — [#47950](https://github.com/NousResearch/hermes-agent/issues/47950)
**4 comments | Open since 2026-06-17 | P2**
- **What it is:** The OAuth device-code flow for Nous Portal authentication is non-functional: the verification URL shows a subscription plan page with no device-approval UI, and `_nous_api_key()` rejects valid API keys.
- **Underlying need:** Users who authenticate via Nous Portal (a core Nous ecosystem integration) cannot complete the flow. This has been open for **~3.5 months** and is a **blocking defect** for that auth path. See Backlog Watch.

---

## 5. Bugs & Stability

Ranked by severity. **Fix PR status** noted where available.

### P0 — Data Integrity

| Issue / PR | Description | Fix PR |
|---|---|---|
| [#129759](https://github.com/NousResearch/hermes-agent/pull/129759) (PR, open) | **Auto-prune can delete compression-lineage ancestors while a write guard protects only the tip.** A compression lock on an old session tip spares that tip, but the auto-prune logic does not reapply lineage closure after removing guarded rows, so compressed ancestors are deleted and parent links are cleared. This is a **silent data-loss** scenario for session history. | PR #129759 itself is the fix — re-applies compression-lineage closure after write-guard row removal. **Not yet merged.** |

### P2 — Functional Breakage / Regressions

| Issue | Description | Fix PR | Severity Note |
|---|---|---|---|
| [#127313](https://github.com/NousResearch/hermes-agent/issues/127313) | Desktop pane-body zone menu **hijacks** transcript right-click; text Copy and app menu unreachable. Regression from `ad2d4822e1`. | **None yet.** `needs-decision`. | High user impact: breaks basic text selection in chat. |
| [#127997](https://github.com/NousResearch/hermes-agent/issues/127997) | Desktop composer right-click opens zone menu instead of edit menu; Cut/Copy/Paste unreachable in session panes. Same root cause. | **None yet.** `needs-decision`. | Same regression, different surface. |
| [#128988](https://github.com/NousResearch/hermes-agent/issues/128988) | **Windows Desktop: first prompt for any non-launch profile is silently dropped.** No user bubble, no reply, no error, session never appears in sidebar. Reproduced on 5+ profiles. | **None yet.** | Critical for multi-profile Windows users — the profile chat is effectively dead. |
| [#37906](https://github.com/NousResearch/hermes-agent/issues/37906) | WhatsApp `send_message`: `@lid` JIDs not recognized → silent fallback to home channel; raw phone numbers cause `jidDecode` error. Three related bugs. | **None listed.** | **4+ months old.** Silent misdelivery is a trust issue. |
| [#47950](https://github.com/NousResearch/hermes-agent/issues/47950) | Nous Portal OAuth device-code flow broken; `_nous_api_key()` rejects valid keys. | **None listed.** | **3.5 months old.** Blocks a primary auth path. |
| [#119403](https://github.com/NousResearch/hermes-agent/issues/119403) | Session-list refresh runs a per-session subquery over `messages` **for every session before LIMIT** — 0.4–0.7 GB of reads per poll, 186 MB/s sustained on a grown `state.db`; burns ~1.5 CPU cores and stalls keystroke echo. | **None listed.** | Performance degradation scales with data volume; affects all desktop users with long histories. |
| [#69889](https://github.com/NousResearch/hermes-agent/issues/69889) | Cron `.py` script jobs break after Hermes rebuilds its venv — user pip packages are lost because cron uses `sys.executable` (Hermes-managed venv Python). | **None listed.** | **2.5 months old.** Silently breaks user automation. |
| [#127044](https://github.com/NousResearch/hermes-agent/issues/127044) | `hermes pm update git` / `hermes pm install git`: `fetch_url` builds a nonexistent `PortableGit-{tag}.1-{arch}.7z.exe` filename for `.windows.1` releases → **404**. Git can never be pinned on certain release cycles. | **None listed.** | Windows-only, but blocks git dependency management. |
| [#129785](https://github.com/NousResearch/hermes-agent/issues/129785) | `hermes pm update` crashes: `ValueError: too many values to unpack (expected 2, got 3)` in `pm/packages.py:715` for the `gh` tool. 3-segment target where 2 is assumed. | **None listed.** | Hard crash on `hermes pm update`. |
| [#95933](https://github.com/NousResearch/hermes-agent/issues/95933) | Remote isolated-serve reconnect can spawn a duplicate clientless default scope; Desktop sticks on "Waking up default…". Split from [#89789](https://github.com/NousResearch/hermes-agent/issues/89789). | **None listed.** `needs-repro`. | Backend scope-lifecycle defect in multi-profile remote setups. |
| [#130962](https://github.com/NousResearch/hermes-agent/issues/130962) | Windows Desktop loses an attached Dashboard during intermittent HTTP timeouts; shows `Runtime not ready` / `Gateway unavailable` even though the Dashboard process is healthy. | **None listed.** `needs-repro`. | |
| [#87689](https://github.com/NousResearch/hermes-agent/issues/87689) | `hermes config set` with bracket index syntax (e.g., `hooks.pre_llm_call[1].command`) silently creates a literal junk key `"pre_llm_call[1]"` instead of setting the list element. | **None listed.** | Silent config corruption.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-10-02
---
## 1. Today's Overview
NanoClaw maintained a steady operational rhythm in 2026-10-02: 2 active issues and 24 PRs were updated within the past 24 hours, with **9 PRs still open and 15 PRs closed**, reflecting active development and ongoing bug resolution. No new release was published, but multiple development areas—setup, core logic, agent runner, skills, and CI—see refreshed fixes and enhancement efforts. Overall project health indicates strong stability and active community responsiveness, with limited new feature releases but clear focus on resolution, maintenance, and capability hardening.
---
## 2. Releases
No new releases were published for 2026-10-02.
---
## 3. Project Progress
### Closed / Merged PRs Today
- **24 PRs** updated in the last 24 hours, with **15 merged** and **9 still open**.
- Key areas advancing include release automation, setup hardening, core bug fixes, and skill delivery improvements.
### Feature & Fix Progress
- **Release automation** — Updated to default to release tags via update channels; supports `stable` (newest annotated `vX.Y.Z` tag) and other configured channels.
- **Setup hardening** — Refreshes installed gateways when only skill payloads change; keeps proxy credentials out of readable service files.
- **Core logic fixes** — Resolves nested `toJSON` redaction for BigInt/cycle values; stops agents losing or repeating replies around `send_message`.
- **Agent runner** — Stops reply loss and repetition for streaming and end-of-turn providers.
- **Community skill** — Adds new `/add-cli-backend` skill addressing Anthropic TOS compliance; extends Iron Proxy support to keyless models.
- **CI & maintenance** — Adds Docker Hub agent image publishing with CVE gates; pins Dependabot workflows and removes inert Renovate config; bumps grpc and tsx to clear dependency advisories.
### GitHub Links
- **Issue #3456** — [chat-sdk-bridge discredit & approval bug](https://github.com/nanocoai/nanoclaw/issues/3456)
- **Issue #3984** — [PreCompact hook mailbox registration failure](https://github.com/nanocoai/nanoclaw/issues/3984)
- **PR #3986** — [release tag follow update](https://github.com/nanocoai/nanoclaw/pull/3986)
- **PR #3988** — [gateway refresh on skill-only changes](https://github.com/nanocoai/nanoclaw/pull/3988)
- **PR #3983** — [safeStringify BigInt/cycle redaction](https://github.com/nanocoai/nanoclaw/pull/3983)
- **PR #3980** — [first-chat ping failure notice scoring](https://github.com/nanocoai/nanoclaw/pull/3980)
- **PR #3985** — [proxy credentials security hardening](https://github.com/nanocoai/nanoclaw/pull/3985)
- **PR #3982** — [Iron Proxy dependency pinning](https://github.com/nanocoai/nanoclaw/pull/3982)
- **PR #3977** — [tsx version bump for Node 26 warnings](https://github.com/nanocoai/nanoclaw/pull/3977)
- **PR #3978** — [add Dependabot workflows, remove Renovate](https://github.com/nanocoai/nanoclaw/pull/3978)
---
## 4. Community Hot Topics
### Issue: #3456 — Discord approval card corrupted by `value` param duplication
- **Severity:** high; every Discord approval click resolves to the wrong option, making approvals unusable.
- **Activity:** updated on 2026-10-01, with 6 comments and 0 likes.
- **Link:** [Issue #3456](https://github.com/nanocoai/nanoclaw/issues/3456)
- **Analysis:** High-level usability regression affecting key interface workflows, indicating a need for immediate correction in `createChatSdkBridge`'s `ask_question` card builder.

### Issue: #3984 — PreCompact hook fails without registered mailbox
- **Severity:** critical; on every compaction, the hook exits with `No agent mailbox registered`.
- **Activity:** created 2026-10-01, updated same day, 0 comments.
- **Link:** [Issue #3984](https://github.com/nanocoai/nanoclaw/issues/3984)
- **Analysis:** Present in compaction flow, affects core compaction functionality; requires immediate fix to prevent silent failure and data corruption.

### Pull Request: #3986 — Follow release tags by default via update channels
- **Activity:** created 2026-10-01, open; aligns `/update-nanoclaw` to the newest release by default, supporting `stable`/`be...` channels.
- **Link:** [PR #3986](https://github.com/nanocoai/nanoclaw/pull/3986)

### Pull Request: #3980 — Score agent failure notice as failed first chat
- **Activity:** created 2026-10-01, open; prevents false "working assistant" status during run failures.
- **Link:** [PR #3980](https://github.com/nanocoai/nanoclaw/pull/3980)

### Community Signal
The most recent active issues focus on **critical functional bugs** (Discord approval corruption, compaction failure) and **hardening** (setup security, core redaction). Both are ranked highest for immediate attention, with active maintainer fixes (mostly by `glifocat`) suggesting prioritization of these areas.

---

## 5. Bugs & Stability

### Active Reports

| Rank | Report | Severity | Link |
|------|--------|----------|------|
| 1 | Discord approval card corrupted by `value` duplication (silent-reject + duplicate resend) | High | [Issue #3456](https://github.com/nanocoai/nanoclaw/issues/3456) |
| 2 | PreCompact hook crashes with missing mailbox registration | Critical | [Issue #3984](https://github.com/nanocoai/nanoclaw/issues/3984) |

### Bugs & Regression Tracking

- **Setup security:** proxy credentials copied into readable service files; mitigated by hardening PR #3985.
- **Agent runner correctness:** `send_message` reply loss/repetition for streaming and end-of-turn providers; fixed by PR #3918.
- **Core logic:** nested `toJSON` redaction gap for BigInt/cycle values; fixed by PR #3983.
- **CI/platform:** Node 26 `module.register()` warning; resolved by PR #3977.
- **Telegram adapter:** drops messages with odd MarkdownV2 marker counts; fixed by PR #3570.

### Stability Assessment

Project stability is strong overall, with fixes actively addressing common crashes and functional regressions. However, two critical issues (issue #3456, #3984) need immediate resolution to prevent regressions in core workflow and compaction paths.

---

## 6. Feature Requests & Roadmap Signals

### Predicted Next-Version Signals

- **Immediate fix prioritization:** Correct the Discord approval and compaction bug fixes are the highest-priority items, expected to appear in the next release or immediate fix PRs.
- **Release automation refinement:** The follow-release tag feature (#3986) indicates the next release may emphasize unified release tracking across configured channels.
- **Hardening & security:** Setup security fixes and dependency hardening (grpc/tsx pins, Dependabot) suggest next version will include stronger security and maintenance focus.
- **Core capability expansion:** Release-related feature work (tag following, prerelease support) signals continued improvement in release management and capability completeness.

---

## 7. User Feedback Summary

### Pain Points & Use Cases

- **Agent workflow reliability:** Users experience critical reliability issues in Discord approval workflows and compaction flows, creating frustration during routine operations.
- **Core functionality completeness:** Users require stable execution of core features (completion, replying, compaction, setup) with minimal failure latency.
- **Configuration management:** Users need reliable release tracking and gateway management, making ad-hoc configuration of update channels a necessary supporting requirement.

### Satisfaction / Dissatisfaction

- **High dissatisfaction on critical workflows:** Users with approval and compaction operations are encountering broken or silent failures, indicating significant dissatisfaction on these use cases.
- **Underlying need for stability:** Active focus on fixing core crashes and regressions signals user demand for higher-level functionality stability and reliability.

---

## 8. Backlog Watch

### Critical Issues Needing Immediate Attention

1. **Issue #3456** (high severity) — Discord approval card functional corruption; affects key approval workflows, needs immediate correction.
2. **Issue #3984** (critical severity) — PreCompact hook crashes with missing mailbox; affects compaction functionality, requires immediate fix to prevent data loss.

### Actionable PRs Needing Maintenance

1. **PR #3456** — Wait for correction (no public action noted).
2. **PR #3984** — Wait for fix implementation (no public action noted).

### Other Items in Backlog

- **PR #3988** — Gateway refresh on skill-only changes; currently open, focusing on fine-tuning update behavior.
- **PR #3918** — Reply loss/repetition fixes for agent runner; addressing core agent logic correctness.
- **PR #3986** — Release tag follow default; alignment of release tracking with current release channels.

All backlog items are actively tracked by maintainers, with focus on resolving critical functional issues first while advancing maintenance and hardening work.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

**LobsterAI – Daily Project Digest (2026‑10‑02)**  
*GitHub: <https://github.com/netease-youdao/LobsterAI>*  

---

### 1. Today’s Overview
- The repository saw a burst of **maintenance activity**: 7 PRs were merged/closed and **no new releases** were published.  
- All **7 issues updated in the last 24 h remain open**, indicating a backlog of bugs and feature requests that have not yet been addressed.  
- The focus of today’s merges was **stability & performance** (build minification, Windows SQLite fallback, UI fixes) and **house‑keeping** (removing dead Claude‑Agent code, adding local OpenClaw plugin support).  
- Overall health is **stable but maintenance‑heavy**; the project is actively polishing the existing codebase while awaiting resolution of several open‑issue bugs.

---

### 2. Releases  
*No new releases were published in the last 24 h.*  

---

### 3. Project Progress (PRs merged/closed today)

| PR # | Title / Area | Key Outcome |
|------|--------------|--------------|
| **#2709** | `openclaw`: Windows private SQLite staging fallback | Adds graceful degradation when PowerShell‑based staging fails, preventing launch crashes on locked‑down Windows machines. |
| **#2788** | `renderer` / `auth`: Plan model catalog recovery | Refreshes the public model catalog on sign‑out, window focus, and failed fetches; shows a login prompt when no models are available. |
| **#915** | `sidebar`: UI polish | Restores smooth collapse animation and fixes macOS banner‑text clipping, improving visual consistency. |
| **#917** | `cowork`: Sandbox execution mode sync | Reads the real `executionMode` from the DB instead of hard‑coding “local”, ensuring UI reflects actual OpenClaw config. |
| **#920** | `build`: Enable esbuild minification | Production builds are now minified, shrinking bundle size and improving load performance. |
| **#921** | `openclaw`: Local plugin installer | Introduces documentation and tooling to install OpenClaw extensions from local paths, easing development workflows. |
| **#941** | `cowork`: Remove dead Claude‑Agent code | Deletes unused `yd_cowork` engine files and narrows the engine type to `openclaw`, reducing code‑base complexity and potential type‑confusion bugs. |

*Take‑away*: The team is solidifying the core platform (build pipeline, Windows compatibility, UI smoothness) and cleaning dead code, preparing a more stable foundation for upcoming feature work.

---

### 4. Community Hot Topics  
*(Most active items today – all have at least one comment; none have reactions yet.)*

| Item | Type | Link | Why it matters |
|------|------|------|----------------|
| **#922** – *Anthropic SSE stream parsing loses data* | Issue | <https://github.com/netease-youdao/LobsterAI/issues/922> | The current line‑splitting logic fails when a JSON line spans two network chunks, causing silent data loss in high‑throughput scenarios. Reliability of Anthropic integration is a core user expectation. |
| **#926** – *`destroy()` calls non‑existent `reject` causing crashes* | Issue | <https://github.com/netease-youdao/LobsterAI/issues/926> | Direct `TypeError` aborts the app during IM handler teardown, leading to forced restarts. A clear blocker for production stability. |
| **#928** – *Login component fails to load on portal page* | Issue | <https://github.com/netease-youdao/LobsterAI/issues/928> | Users cannot re‑login after a failed attempt; the UI shows a broken component. Affects onboarding and internal employee access. |
| **#943** – *Model fallback / priority handling* | Issue | <https://github.com/netease-youdao/LobsterAI/issues/943> | Proposes automatic fallback to alternate LLMs when the selected model is unavailable, directly tied to overall system availability. |
| **#927** – *Keyboard navigation for model & IM bot selectors* | Issue | <https://github.com/netease-youdao/LobsterAI/issues/927> | UX request from power users who rely on arrow‑key navigation; indicates a desire for more keyboard‑friendly interactions. |

*Underlying needs*: **Reliability of external LLM integrations**, **robust error handling**, **smooth login experience**, and **better ergonomics** for power users.

---

### 5. Bugs & Stability (ranked by severity)

| Severity | Issue | Summary | Status / Fix |
|----------|-------|---------|--------------|
| **Critical** | **#926** – `destroy()` calls missing `reject` | Causes uncaught `TypeError`, crashing the app during IM handler teardown and gateway reconnection. | No fix merged yet; a one‑line optional‑chain change (`reject?`) is suggested in the issue. |
| **High** | **#928** – Login component load failure | Re‑login flow on the LobsterAI portal consistently breaks, blocking employee access. | No PR yet; requires investigation of the portal bundle loading. |
| **High** | **#922** – Anthropic SSE parsing loss | Missing line‑buffer leads to JSON parse errors and silent data loss under load. | No PR yet; needs buffered parsing similar to OpenAI path. |
| **Medium** | **#918** – OpenClaw auto‑adds unknown `weixin` channel | After upgrading to v3.25, a stale `openclaw‑weixin` entry appears, potentially causing runtime errors. | No fix yet; may require version‑compatibility guard in `doctor`. |
| **Medium** | **#943** – Model fallback priority | Not a bug per se, but a reliability gap: when a model is down the UI shows no fallback, leading to dead‑ends. | No implementation; aligns with roadmap for auto‑fallback. |
| **Low** | **#925** – Security issue reporting channel | Inquiry about a dedicated security‑reporting process; currently undocumented. | No action yet; may need a security policy file. |
| **Low** | **#927** – Keyboard navigation for selectors | UX tweak, not a crash. | No PR yet. |

*Fix coverage*: The only bug that has an **explicit fix suggestion** is #926 (optional chaining). No PRs addressing these issues were merged today, suggesting they remain on the backlog.

---

### 6. Feature Requests & Roadmap Signals

| Request | Potential Impact | Likelihood of inclusion in next release |
|---------|------------------|------------------------------------------|
| **#943 – Model fallback / priority** | Increases overall system uptime, reduces user friction when a vendor model fails. | **High** – aligns with recent PR #2788 (catalog recovery) and the team’s focus on resilience. |
| **#927 – Keyboard navigation** | Improves efficiency for power users; low implementation cost (UI tweak). | **Medium** – UI polish PRs (e.g., #915) show willingness to accept small UX improvements. |
| **#921 – Local OpenClaw plugin install** (already merged) | Enables developers to test private extensions, expanding ecosystem. | **Delivered** – already merged today, indicating roadmap support for extensibility. |
| **#925 – Security reporting channel** | Important for responsible disclosure; often a compliance requirement. | **Medium** – may be addressed via a `SECURITY.md` addition soon. |
| **#928 – Login component fix** | Critical for internal adoption; likely a short‑term priority. | **High** – given the severity of being unable to log in, may be tackled before the next minor release. |

---

### 7. User Feedback Summary

- **Stability concerns** dominate: crashes during handler teardown (#926) and login failures (#928) are blocking real‑world usage.
- **Data integrity** is a pain point for Anthropic integration (#922), indicating that streaming APIs need robust buffering.
- **Configuration drift** after upgrades (unknown `weixin` channel, #918) shows that upgrade paths need clearer migration guidance.
- **Usability**: Users request smoother navigation (keyboard shortcuts, #927) and automatic fallback when a model is unavailable (#943), reflecting a desire for a more “set‑and‑forget” experience.
- **Documentation**: The addition of a local plugin install guide (#921) was positively received, highlighting the need for more operational docs (e.g., security reporting, #925).

Overall sentiment: **Appreciation for recent UI/Performance fixes**, but **frustration remains around reliability of external services and edge‑case crashes**.

---

### 8. Backlog Watch (Long‑standing/Open Items needing attention)

| Item | Age (since creation) | Why it needs attention |
|------|----------------------|------------------------|
| **#918** – OpenClaw auto‑adds unknown `weixin` channel | 7 months | Potential hidden runtime errors on future upgrades; no fix yet. |
| **#922** – Anthropic SSE parsing issue | 7 months | Data loss in production use‑cases; high‑throughput scenarios likely to hit this bug. |
| **#925** – Security reporting channel | 7 months | No official process; may expose the project to unreported vulnerabilities. |
| **#926** – `destroy()` crash | 7 months | Already identified as critical; still open, blocking stable restarts. |
| **#928** – Login component failure | 7 months | Directly impacts user onboarding; persists despite multiple attempts. |
| **#943** – Model fallback priority | 6 months | Core reliability feature; still a suggestion. |
| **#927** – Keyboard navigation | 6 months | Small UX win that could be bundled with other UI improvements. |

**Recommendation**: Prioritize **#926** (crash), **#928** (login), and **#922** (streaming data loss) in the next sprint. Simultaneously, create a **SECURITY.md** to address #925 and start drafting the model‑fallback logic (issue #943) to align with the recent catalog‑recovery PR #2788.

---

*Prepared by the LobsterAI open‑source analytics bot – data extracted from GitHub activity on 2026‑10‑02.*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>



# TinyClaw (TinyAGI/tinyagi) Project Digest — 2026-10-02

---

## 1. Today's Overview

The TinyClaw project saw focused activity today with **3 pull requests closed/merged** and **zero new issues** filed in the past 24 hours. No new releases were published. All three closed PRs target Telegram integration improvements, indicating a concentrated effort to harden the messaging layer. The project appears stable with no reported bugs or regressions today, and the community is quiet on the issue tracker — a sign of low friction but also limited recent user engagement.

---

## 2. Releases

**No new releases** were published in the last 24 hours.

---

## 3. Project Progress

Three PRs were merged/closed today, all by contributor **salemsayed**, advancing the Telegram connector:

| PR | Title | Summary |
|----|-------|---------|
| [#48](https://github.com/TinyAGI/tinyagi/pull/48) | `fix: persist Telegram pending messages to disk` | Resolves a data-loss bug where in-memory `pendingMessages` were wiped on restart, crash, or 409 polling conflicts. Queue writes now survive process restarts. |
| [#67](https://github.com/TinyAGI/tinyagi/pull/67) | `feat: interactive questions via Telegram inline keyboards` | Adds a question bridge that surfaces Claude's clarifying questions as inline keyboard buttons, enabling bidirectional interaction even in non-interactive (`-p`) mode. |
| [#106](https://github.com/TinyAGI/tinyagi/pull/106) | `Add Telegram live streaming previews for Claude responses` | Streams partial Claude output as throttled `partial_*` queue messages, updating a single Telegram message in-place for a live-preview experience. |

**Key theme:** The Telegram channel is being transformed from a basic notifier into a fully interactive, resilient, and real-time messaging surface.

---

## 4. Community Hot Topics

No issues were opened or updated today. The three merged PRs (#48, #67, #106) represent the most recent community contributions, all authored by **salemsayed** and originating from mid-February 2026 before being reviewed and merged today. The concentration of work by a single contributor on Telegram-specific features suggests:

- A dedicated contributor driving the Telegram experience forward.
- **Underlying user need:** Reliable, interactive Telegram communication — users want responses that survive restarts, support back-and-forth questioning, and feel实时 (real-time) rather than batch-delivered.

---

## 5. Bugs & Stability

**No new bugs or stability reports** were filed today.

The only notable bug addressed today is the one from PR #48: **pending message loss on restart/crash**. This was a significant reliability issue for Telegram users, as responses queued successfully but could not be matched to chats after any process interruption. The fix persists the message map to disk, resolving the class of failure.

---

## 6. Feature Requests & Roadmap Signals

No new feature request issues were opened today. However, the merged PRs strongly signal the project's current priorities:

| Signal | Source | Implication |
|--------|--------|-------------|
| Message persistence | PR #48 | Reliability and fault tolerance are top priorities for the Telegram channel |
| Interactive questioning | PR #67 | Moving toward conversational AI experiences, not just one-way notification |
| Live streaming previews | PR #106 | Real-time feedback is expected; users want to see Claude "thinking" as it generates |

**Prediction:** The next release will likely highlight the Telegram channel improvements as a major upgrade, possibly bundling all three PRs under a "Telegram 2.0" or similar feature banner.

---

## 7. User Feedback Summary

No direct user feedback (issues/comments) was recorded today. Based on the merged PRs, the inferred user pain points are:

- **Frustration with lost messages on restart** — PR #48 directly addresses this.
- **Desire for interactive Telegram conversations** — PR #67 shows users want Claude to ask clarifying questions within Telegram, not just output monologues.
- **Impatience with delayed responses** — PR #106 indicates users want to see progress as it happens, not wait for a final message.

Overall sentiment appears positive: contributors are actively solving real problems, and no open complaints are visible.

---

## 8. Backlog Watch

**No open issues or PRs** are currently in the backlog. All three recent PRs have been merged, and there are no unanswered or long-pending items visible in the data. This is unusual for a project with PRs originally created in February 2026 and only just merged today — it may indicate a period of maintainer inactivity followed by a recent burst of review work. Worth monitoring whether the contributor pipeline remains active going forward.

---

**Project Health Assessment:** 🟡 **Stable, low-activity.** The project is functionally progressing on the Telegram integration front, but the single-contributor pattern and lack of open issues/PRs suggest a narrow contributor base. Continued diversification of contributions would strengthen long-term health.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest
**Date:** 2026-10-02
**Repository:** [moltis-org/moltis](https://github.com/moltis-org/moltis)

---

## 1. Today's Overview
Activity on the Moltis project was minimal during the last 24 hours. The repository recorded zero new issues and zero new releases. However, two new Pull Requests were opened, indicating active maintenance and bug-fixing work by the core team.

## 2. Releases
**No new releases** were published in the last 24 hours.

## 3. Project Progress
While no code was merged or closed today, the project saw the initiation of two maintenance-focused Pull Requests. These changes aim to stabilize core communication protocols and improve error handling resilience.

## 4. Community Hot Topics
Currently, there is no intense community debate or high-engagement discussion occurring. The project focus appears to be on internal stability and infrastructure configuration rather than feature requests.

## 5. Bugs & Stability
The following stability-related PRs were opened, targeting specific failures in the TLS negotiation and MCP (Model Context Protocol) session management:

*   **TLS Upgrade Failure (Severity: High)**: PR #1291 addresses a critical connectivity issue where TLS listeners advertise HTTP/2 (`h2`) before HTTP/1.1. Fresh browser connections are defaulting to HTTP/2, causing WebSocket upgrades to fail with a `405 Method Not Allowed` error because Moltis does not implement RFC 8441 extended CONNECT.
    *   [View PR #1291](https://github.com/moltis-org/moltis/pull/1291)
*   **MCP Session Resilience (Severity: Medium)**: PR #1290 improves the robustness of MCP server startups. It introduces logic to track failed startup attempts and treat them as "dead" servers that can be retried via exponential backoff. It also defines a recovery strategy for streamable HTTP `404` responses carrying an `Mcp-Session-Id`, which previously indicated lost sessions.
    *   [View PR #1290](https://github.com/moltis-org/moltis/pull/1290)

## 6. Feature Requests & Roadmap Signals
There were no feature requests submitted today. The project's roadmap appears to be focused on "Operation Stability" rather than feature expansion at this time.

## 7. User Feedback Summary
No direct user feedback was captured in the last 24 hours. The issues identified in the new PRs suggest that users may be experiencing intermittent connection drops or upgrade failures in production environments, prompting these targeted fixes.

## 8. Backlog Watch
*   **PR #1291**: This is a critical fix for WebSocket connectivity. It is highly likely to be merged soon to prevent users from being blocked by TLS negotiation errors.
*   **PR #1290**: This addresses session persistence. It should be prioritized to ensure long-running AI agent tasks remain stable after temporary network hiccups.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**ZeroClaw Project Digest**
**Date:** 2026-10-02
**Repository:** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

### 1. Today's Overview
Activity on the ZeroClaw repository remains consistently high, with 42 issues and 50 pull requests updated in the last 24 hours. The project is currently in a critical integration phase for the v0.8.6 and v0.9.0 releases, characterized by a heavy volume of "needs-author-action" PRs and a focus on closing gaps in the runtime, gateway separation, and security infrastructure. Despite the high volume of open work, there were no new releases published, indicating the team is consolidating changes before a final deployment.

### 2. Releases
**None**
No new releases were published in the last 24 hours. The project is in a feature freeze/convergence phase ahead of the next major release (v0.8.6 / v0.9.0).

### 3. Project Progress
*   **High Volume of Stacked PRs:** The team is aggressively merging large, stacked pull requests to port gateway functionality into the core (e.g., #11373, #11382, #11384). These PRs represent a significant architectural shift toward separating the Gateway from the Core while maintaining compatibility.
*   **Identity & Access Control (IAM) Fixes:** Multiple PRs (#11313, #11322, #11289) are actively addressing authorization issues, specifically ensuring CLI config changes apply live to the daemon and fixing RPC denial reasons.
*   **Runtime Stability:** Several fixes were merged to address regressions in zerocode (launch directory) and daemon RPC readiness.

### 4. Community Hot Topics
The most discussed topics revolve around **Runtime Architecture**, **Security/Identity**, and **Plugin Management**.
*   **Architecture & Tracking:** [Issue #9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600) leads with 16 comments, focusing on session persistence and contract ownership. This indicates a complex internal restructuring is underway.
*   **Identity & Access:** [Issue #5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) discusses Per-sender RBAC in multi-tenant deployments, with 11 comments, signaling a focus on secure multi-user isolation.
*   **Runtime Stability:** [Issue #9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799) (5 comments) reports a critical CPU spin bug in the daemon, while [Issue #11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) (4 comments) highlights a security risk where delegated memory tools lose principal scope.

### 5. Bugs & Stability
*   **High Risk / Data Loss:** [Issue #11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) is marked **S0**. A principal-owned session allows a delegated agent to bypass scope and access the shared memory plane, posing a severe security risk.
*   **High Risk / Workflow Blocked:** [Issue #9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799) (S1) describes a daemon that enters sustained CPU spin, degrading system resources.
*   **Regressions:** [Issue #11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387) (S2) reports a regression in zerocode that ignores launch directories again.
*   **Medium Risk:** [Issue #11257](https://github.com/zeroclaw-labs/zeroclaw/issues/11257) (S2) affects WhatsApp Web channels, dropping captions for media files.

### 6. Feature Requests & Roadmap Signals
*   **Plugin Management:** There is strong demand for plugin update and rollback mechanisms, evidenced by [Issue #10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995) and the active PRs (#11319, #11322) forwarding webhooks to the core.
*   **Memory Router:** [Issue #7539](https://github.com/zeroclaw-labs/zeroclaw/issues/7539) requests a llama.cpp model router, indicating user interest in optimizing local model switching.
*   **Auth Providers:** [Issue #8076](https://github.com/zeroclaw-labs/zeroclaw/issues/8076) seeks an IdP-less browser login method, a feature likely to appear in v0.9.0.

### 7. User Feedback Summary
*   **Operational Friction:** Users are reporting friction with the CLI and daemon interaction, specifically regarding authorization edits not saving live (#10876, #11313) and named-pipe verification issues on Windows (#11325).
*   **Configuration Inertia:** Users are frustrated that accepted config keys (like `context_compression` and `history_pruning`) are inert and not functioning as documented, requiring explicit implementation or removal (#10781).
*   **Channel Reliability:** Users report inconsistent behavior in channels (WhatsApp, Webhook) where media captions or webhooks are dropped or not processed correctly.

### 8. Backlog Watch
*   **Blocked WIT/Registry:** [Issue #9624](https://github.com/zeroclaw-labs/zeroclaw/issues/9624) is a high-priority bug (P1) where the WIT pin diverges, breaking published components. It has been accepted but stalled.
*   **ZeroRelay Authentication:** [Issue #10766](https://github.com/zeroclaw-labs/zeroclaw/issues/10766) is a high-risk architectural issue where ZeroRelay tunnels collapse all users to a `shared_operator` principal, preventing true multi-user hosted relay setups.
*   **OpenRouter Integration:** [Issue #11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204) prevents users from tracking costs effectively as the system classifies all tokens as "free tok" and ingests no usage data.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*