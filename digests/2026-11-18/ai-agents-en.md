# OpenClaw Ecosystem Digest 2026-11-18

> Issues: 472 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-18 01:57 UTC

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

**NanoBot – Project Digest (2026‑11‑18)**  

---

### 1. Today’s Overview
- The repository saw a burst of activity in the last 24 h: **17 issues** were touched (16 still open) and **10 pull‑requests** were updated (5 open, 5 closed/merged).  
- No new releases were published, but a large set of security‑hardening tickets and several WebUI regressions were opened, indicating the community is concentrating on robustness and supply‑chain safety.  
- The maintainer team is actively triaging the flood of security‑related reports while also polishing the WebUI experience and the agent‑side memory subsystem.

---

### 2. Releases  
*No new release has been cut in the last 24 h.*  

---

### 3. Project Progress (Closed / Merged PRs)

| PR # | Title & Scope | Type | Main Outcome |
|------|----------------|------|--------------|
| **#6685** | *fix(webui): open ready apps by default* | Bug‑fix / UI | The Apps pane now defaults to the “Ready” tab when a CLI app, plugin, or MCP is available, reducing friction for end‑users. |
| **#6687** | *fix(webui): separate agent plugins from CLI apps* | Refactor / UI | Plugins, CLI apps, and MCPs are displayed in distinct catalog sections, improving discoverability and preventing accidental plugin activation. |
| **#6689** | *fix(webui): refine reasoning shell activity copy across locales* | Bug‑fix / Internationalisation | Reasoning‑shell status messages are now concise and correctly translated across all 10 supported locales. |
| **#6683** | *fix(webui): settle completed turns across reconnect paths* | Bug‑fix / Sync | Prevents stale “active response” UI elements after a turn finishes, fixing a race condition on reconnection. |
| **#6684** | *perf(ci): speed up full WebUI regression gates* | CI / Performance | Browser‑lane time cut from ~14 min to ~5 min, dramatically shortening the full‑suite CI feedback loop. |
| **#6688** | *fix(goal): block goals after terminal execution failures* | Bug‑fix / Core | Goals now terminate cleanly after repeated empty responses, output‑limit recoveries, or terminal failures, eliminating runaway goal loops. |

*These merged PRs mainly target UI stability, CI speed, and core goal handling—key areas for a smoother end‑user experience.*

---

### 4. Community Hot Topics  

| Issue / PR | Comments / 👍 | Core Concern | Why It Matters |
|------------|---------------|--------------|----------------|
| **#4798** – *Concurrent file writes from different sessions not serialized* | 3 comments | Data‑corruption risk when multiple agent turns write the same file | Directly threatens the integrity of user workspaces; a blocker for collaborative or multi‑session usage. |
| **#4796** – *`restrict_to_workspace` defaults to `False`* | 2 comments | By‑default the agent can touch the whole host filesystem | A serious security posture issue; many deployments rely on the default to sandbox agents. |
| **#4780** – *Unbounded `asyncio.Queue` in `MessageBus`* | 2 comments | Potential DoS via memory exhaustion | Core messaging layer can be overwhelmed, affecting all clients (WebUI, CLI, API). |
| **#4797** – *No resource limits on shell subprocesses* | 2 comments | Subprocesses can be fork‑bombed or otherwise consume unlimited CPU/RAM | Prevents malicious or buggy LLM prompts from crashing the host. |
| **#6697** – *WebUI dev toolchain: 32 npm advisories (4 critical, 8 high)* | 0 comments | Build‑time dependencies contain severe vulnerabilities (VM escape, RCE) | Even if only used during development, compromised dev tools can leak into production bundles. |

*The dominant narrative is security‑hardening: filesystem confinement, subprocess sandboxing, and network/queue back‑pressure are all being called out as missing safeguards.*  

---

### 5. Bugs & Stability (Ranked by Severity)

| Severity | Issue | Summary | Fix Status |
|----------|-------|---------|------------|
| **Critical** | **#4798** – Concurrent file writes | Workspace files can become corrupted when two sessions write simultaneously. | No fix yet; open. |
| **High** | **#4796** – `restrict_to_workspace` default | Agents have unrestricted filesystem access by default. | No fix yet; open. |
| **High** | **#4780** – Unbounded `MessageBus` queue | Unlimited queue growth leads to OOM crashes. | No fix yet; open. |
| **High** | **#4797** – No limits on shell subprocesses | Fork‑bomb / runaway processes can kill host. | No fix yet; open. |
| **Medium** | **#4790** – Symlink TOCTOU in filesystem tools | Small race window for escaping the workspace via symlink swap. | No fix yet. |
| **Medium** | **#6698** – Exec tool long‑running commands block turns | Commands with no output hold the turn until timeout; output buffer not capped. | No fix yet. |
| **Low** | **#6694** – Pairing codes logged in plaintext | Sensitive pairing codes appear in log files at INFO level. | No fix yet. |
| **Low** | **#6693** – API token accepted via query string | Tokens leak to logs, history, and Referer headers. | No fix yet. |
| **Low** | **#6692** – Config loader crashes on huge integer literals | Raw `ValueError` bubbles up, breaking startup. | No fix yet. |

*Only the UI‑related bugs have been closed/merged today; the security‑critical bugs remain open, underscoring a backlog that needs immediate maintainer focus.*

---

### 6. Feature Requests & Roadmap Signals  

| Item | Description | Likelihood for Next Release |
|------|-------------|------------------------------|
| **#6441** – *Add session‑scoped reasoning effort (WebUI)* | UI control to adjust the LLM’s “effort” per conversation without affecting global presets. | High – already open as a feature PR, aligns with the “session‑level customization” theme. |
| **#4477** – *Progressive wiki & drain Dream history (memory)* | Introduces a hierarchical memory model where detailed knowledge lives in a lazy‑loaded wiki, reducing token load. | Medium – substantial architectural change; may land in a future minor (0.5) release after stability work. |
| **#6686** – *Refactor gateway startup & runtime separation* | Consolidates gateway entry‑points, separates health checks and background jobs. | High – PR already open; likely to be merged soon as it cleans up launch paths. |
| **#6690** – *SSRF hardening: expand `_BLOCKED_NETWORKS`* | Add missing multicast, reserved, and TEST‑NET ranges to the network blocklist. | High – directly addresses a security gap; expected to be merged quickly. |
| **#6695** – *Upgrade `pyasn1` via `sigstore` bump* | Fixes four CVEs by raising the minimum `pyasn1` version. | High – simple dependency bump, low risk, likely to be merged in the next patch. |

---

### 7. User Feedback Summary  

- **Security & Isolation** – Multiple users flagged that the default configuration leaves the host filesystem exposed and that subprocesses can be abused. The recurring language in comments is “I can’t trust a 3rd‑party model without sandboxing.”  
- **Stability of Long‑Running Turns** – Reports (e.g., #6698) indicate that agents can become “stuck” when executing silent, streaming commands, leading to poor UI responsiveness.  
- **WebUI Responsiveness** – The CI performance work (#6684) and UI bug fixes (#6683, #6685) were motivated by complaints about “ghost turns” and “apps never opening.” Users appreciate the faster feedback loops.  
- **Developer Experience** – The npm advisory dump (#6697) and the KaTeX prototype‑pollution issue (#6696) have raised concerns about supply‑chain hygiene; developers are asking for a hardened dev‑toolchain.  

Overall, the community is satisfied with recent UI polish but is increasingly anxious about security and resource‑exhaustion vulnerabilities.

---

### 8. Backlog Watch  

| Stale/Open Issue | Age (days) | Why It Needs Attention |
|------------------|------------|------------------------|
| **#4798** – Concurrent file writes | > 120 | Core data‑loss risk; blocks multi‑session use cases. |
| **#4796** – `restrict_to_workspace` default | > 120 | Default insecure configuration; could be a show‑stopper for production deployments. |
| **#4780** – Unbounded `MessageBus` queue | > 120 | OOM crashes under load; affects all entry points. |
| **#4797** – No subprocess limits | > 120 | Potential for fork‑bomb attacks; low‑effort mitigation (ulimit/cgroup). |
| **#6692** – Config loader huge integer crash | > 1 day (opened today) | Could break automated deployments that embed large numeric IDs. |
| **#6693** – API token via query string | > 1 day (opened today) | Token leakage is a classic auth flaw; easy to fix. |
| **#6695** – `pyasn1` CVE fix | > 1 day (opened today) | Dependency bump required for compliance. |
| **#6698** – Exec tool DoS via silent commands | > 1 day (opened today) | Needs output‑capping and better timeout handling. |

*These items collectively form the “critical security and reliability” backlog. Prioritising them will be essential before the next official release.*

---

**Bottom Line:** NanoBot’s development velocity is healthy on the UI/UX side, but the surge of security‑focused issues reveals a gap in default hardening. Addressing the top‑priority bugs (workspace confinement, queue back‑pressure, subprocess limits) should be the next maintainer focus to preserve user trust and enable safe multi‑session deployments.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest: 2026-11-18
## Today's Overview
NanoClaw is in active development with significant activity concentrated in bug fixes, feature PRs, and release candidates. The repository has received **10 new issues** (7 open, 3 closed) and **43 PRs** (19 open, 24 merged/closed) in the last 24 hours, indicating continued responsiveness to user feedback and active maintenance of feature work. A new release candidate, **v2026.11.0-rc.1**, was shipped on 2026-11-17, superseding v2026.10.1, and the `nanoclaw-image-refresh[bot]` tool is actively generating hardened agent images for existing versions (v2026.10.0 → new tags). The bulk of activity reflects a concentrated set of engineering fixes targeting core infrastructure (image rebuild, update validation, agent-runner source typechecking, setup debugging, and provider/session support).
## Releases
- **v2026.11.0-rc.1** (released 2026-11-17): The first release candidate of 2026.11.0, establishing a stable pipeline expectation unless testing finds problems. It marks November as the release replacing 2026.10.1, which never becomes stable; the two release candidates remain publishable. No breaking changes are described in this release update; it focuses on pipeline readiness.
## Project Progress
- **PRs merged/closed today (24):** The release process itself (v2026.11.0-rc.1) was created and released, alongside 15 PRs on `main` since beta.4.
- **Open/active PRs:** Multiple bug-fix and feature PRs were updated on 2026-11-18, including:
  - **#4457** — Agent image refresh (`v2026.10.0` → `v2026.10.0-20261117T2151`)
  - **#4455** — Fix Codex sign-in via pinned CLI through `npx`, outside `/tmp`
  - **#4456** — Slack agent DM to show suggested prompts and thread titles
  - **#4442** — Add `/add-antigravity` provider skill with per-group switchability
  - **#4453** — Show provider image rebuild in setup progress window
  - **#4431** — Rebuild a group's image when its agent image changes
  - **#4446** — Pin Codex 0.169.0 so ChatGPT logins use GPT-6.2
- **Closed bugs/fixes:** Several community-contributed fixes were closed without merging, including image rebuild per-group handling (#4076), re-run setup validation (#4426), and updated validation display (#4429).
## Community Hot Topics
- **Issue #4454** (`/update-nanoclaw never typechecks agent-runner source on a host without Bun`): Open, created 2026-11-17 by glifocat, highlighting a regression where `/update-nanoclaw` changes agent-runner source without typechecking on Bun-less hosts. This is a high-severity stability concern requiring maintenance attention.
- **Issue #4451** (`Codex agents behind OneCLI can't generate images`): Open, associated with Codex/OneCLI integration, likely blocked by OneCLI auth or image-generation tooling. Represents a provider-specific reliability gap.
- **PR #4456** and **Issue #4452** (Slack welcome prompts never appear / DM suggestions missing): Open PR and unresolved issue paired, indicating ongoing support need for Slack onboarding and agent view behavior.
- **PR #4442** (add-antigravity skill): Feature-driven, adds a new provider skill with group-specific switching, indicating active expansion of supported provider/agent workflows.
## Bugs & Stability
1. **Typechecking regression on `/update-nanoclaw`** (Issue #4454, open): `/update-nanoclaw` changes agent-runner source without validating on hosts without Bun, risking unverified runtime behavior. **Severity: High (stability/correctness)** — Affects core update flow. Fix PR exists (#4454 issue).
2. **Group image rebuild and package retention** (Issue #4076, closed): `/update-nanoclaw` leaves packages with stale agent image in groups, causing inconsistent behavior. **Severity: Medium (functional regression)** — Requires rebuild or update flow corrections.
3. **Re-run setup skipped hardened image question** (Issue #4426, closed): Setup re-run does not apply the hardened image prompt as expected, affecting fresh-install experience. **Severity: Medium (user experience)** — Documentation/setup path issue.
4. **Missing setup debugger for Cursor/Codex** (Issues #4450, #4448, #4449, #4451): Several setup steps offer no debug helper for Cursor, Codex, or OneCLI workflows, likely causing debugging and reliability friction. **Severity: Medium (supportability)** — Affects multi-provider setup experiences.

**Stabilization focus:** The recurring theme is platform-specific integration gaps (OneCLI, Slack, Codex, Cursor) and update/setup correctness, suggesting priority for hardening agent-runner verification and per-provider setup diagnostics.

## Feature Requests & Roadmap Signals
- **llmman local-model support** (PR #4210): A feature adding local-model providers (`/add-llmman-provider`, `/add-llmman-tool`) to complement existing LLM options, indicating a planned expansion toward local/offline model capabilities.
- **Add `/add-antigravity` skill** (PR #4442): Adds provider-specific agent functionality for Google Antigravity/Gemini models, signaling continued investment in multi-provider agent capabilities.
- **Slack DM suggested prompts** (PR #4456): A fix to unblock Slack onboarding and DM display, indicating an immediate user-facing improvement to the Slack workflow.

## User Feedback Summary
- **Primary pain:** Setup and update flows are failing or silently misbehaving across providers (image rebuild, typechecking, debugger absence, sign-in warnings). Users report friction during installation and updates, especially when `/update-nanoclaw` interacts with non-Claude providers like Codex, Cursor, or OneCLI.
- **Secondary pain:** Slack agent onboarding and DM context are incomplete—suggested prompts and thread titles are not exposed to users, while providers like Codex show unrelated setup warnings.
- **Use cases:** Users need reliable image generation and setup debugging across multiple agent providers (Codex, Claude, Slack, Cursor), alongside working update and validation processes.

## Backlog Watch
1. **Typechecking gap in `/update-nanoclaw`** (Issue #4454, open): The most urgent unresolved stability issue requiring maintainer attention, as it directly affects core update reliability on hosts without Bun.
2. **Provider-specific setup debugger gaps** (Issues #4450, #4448, #4449, #4451): Multiple unresolved issues around Cursor/Codex/OneCLI setup diagnostics indicate a broad support-improvement backlog to address platform-specific setup usability.
3. **Agent image rebuild edge cases** (Issue #4076, closed): Repeatedly requires maintainer attention to fix stale-image behavior in per-group groups and package updates.

---
**Overall Health Assessment:** NanoClaw maintains a healthy activity level with timely release candidates and a strong distribution of maintenance-focused PRs, but the concentrated focus on bug/setup integration issues suggests the next cycle should prioritize stability hardening and multi-provider support infrastructure.

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

**CoPaw Project Digest**  
**Date:** 2026-11-18  
**Repository:** agentscope-ai/CoPaw (QwenPaw)  

---

### 1. Today's Overview
Activity remains steady with 24 issues and 50 pull requests updated in the last 24 hours. The project is in a maintenance and enhancement phase, with no new releases. Recent updates focus on plugin architecture, provider management, and bug fixes. Community engagement is active, with several long-standing issues and feature requests drawing significant attention.  

---

### 2. Releases
**No new releases** detected in the last 24 hours. The latest stable version noted in issues is **v2.3.0** (released on 2026-11-13), with **v2.3.0.post1** referenced in some bug reports.  

---

### 3. Project Progress
- **Merged/Closed PRs:** 21 PRs closed today, including fixes for console session deletion, BiDi text support, and heartbeat documentation.  
- **Active PRs:** 29 PRs remain open, focusing on plugin CLI support, local model management refactoring, and advisor improvements.  
- **Key Improvements:**  
  - Refactored MCP (Model Context Protocol) into a plugin.  
  - Enhanced plugin CLI commands and extension points.  
  - Fixed session bookkeeping and console session deletion flows.  

---

### 4. Community Hot Topics
- **#8071:** Plugin-facing theme extension point (semantic token override layer) – 18 comments.  
  - *Need:* Deeper theme customization for plugins beyond basic color overrides.  
- **#8771:** DingTalk channel session_id collision across chats – 2 comments.  
  - *Need:* Fix ID generation to prevent conflicts in multi-chat scenarios.  
- **#8796:** Mobile full-screen containers missing safe-area-inset – 1 comment.  
  - *Need:* Fix UI rendering on mobile devices.  

---

### 5. Bugs & Stability
1. **#7724 (Closed):** Session loss after restart – Fixed.  
2. **#8709 (Closed):** WeChat channel startup failure (`ACCOUNT_IN_USE`) – Fixed.  
3. **#8778 (Open):** Reference-image generation breaks after 24h – No fix yet.  
   - *Severity:* High – affects long-running sessions.  
4. **#8776 (Open):** Quota-exceeded errors misclassified as `bad_request` – No fix yet.  
   - *Severity:* High – blocks fallback model switching.  

---

### 6. Feature Requests & Roadmap Signals
- **Mid-turn steer (send-now):** Allow real-time message injection in running chats.  
  - *Prediction:* Likely to be implemented in a future update given developer interest.  
- **Plugin theme customization:** Deeper control over UI tokens for plugins.  
  - *Prediction:* May be addressed in the next major release.  

---

### 7. User Feedback Summary
- **Positive:** Improved session management and WeChat channel stability.  
- **Negative:** Mobile UI rendering issues, quota handling errors, and occasional message loss.  
- **Requests:** UI performance improvements, legacy UI toggle, and better mobile support.  

---

### 8. Backlog Watch
- **#6952:** Prefix cache instability from unsorted tool schemas (2 comments).  
- **#7719:** Separate model for ReMeLight memory writing (Under Review).  
- **#8469:** Refactor MCP into plugin (XXXL size, high complexity).  

---

**Links:**  
- Issues: [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)  
- PRs: [agentscope-ai/QwenPaw Pull Requests](https://github.com/agentscope-ai/QwenPaw/pulls)

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

**ZeptoClaw Project Digest**
**Date:** 2026-11-18
**Repository:** [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)

---

### 1. Today's Overview
Activity on the ZeptoClaw project remains minimal for the past 24 hours, with no new releases or pull requests submitted. The project's health appears stable, characterized by a low volume of continuous maintenance rather than rapid feature deployment. Currently, the repository is focusing on specific CLI improvements regarding search capabilities.

### 2. Releases
**No new releases detected in the last 24 hours.**

### 3. Project Progress
*   **Pull Requests:** No new pull requests were opened or merged today.
*   **Code Contributions:** No code changes were pushed to the repository within the last 24 hours.

### 4. Community Hot Topics
**Issue #725: Parallel search for public documentation**
*   **Status:** Open
*   **Author:** georgeatparallel
*   **Discussion:** No comments yet.
*   **Link:** [Issue #725 on GitHub](https://github.com/qhkm/zeptoclaw/issues/725)
*   **Analysis:** The user seeks to expand the search capabilities of the CLI interface by explicitly approving a "Parallel search" feature. Specifically, they wish to use a managed search service (like Brave) to fetch public documentation excerpts and original source links without needing to operate a local SearXNG instance. This highlights a demand for simplified, zero-config public documentation retrieval.

### 5. Bugs & Stability
*   **Reported Issues:** 1 open issue identified.
*   **Criticality:** Low/Feature Request.
*   **Details:** The single open issue (#725) is a feature request regarding search configuration, not a bug report or stability concern. No crashes or regressions were reported today.

### 6. Feature Requests & Roadmap Signals
*   **CLI Search Configuration:** The primary signal from the community is a request for enhanced CLI interaction regarding search sources. Users want the flexibility to use managed public search APIs (Brave, DuckDuckGo keyless) alongside local instances (SearXNG) with explicit user approval.
*   **Predicted Impact:** This suggests a potential update to the CLI configuration logic to allow for mixed search backends or improved handling of public API keys, rather than a full rewrite of the search engine module.

### 7. User Feedback Summary
*   **User Profile:** The user appears to be a developer or power user managing attended interactive CLI sessions.
*   **Pain Points:** The friction of setting up and maintaining a local SearXNG instance for simple documentation lookups.
*   **Satisfaction:** No negative feedback was detected; the request is constructive and aimed at improving usability.

### 8. Backlog Watch
*   **Issue #725:** This is the only active item in the repository. It requires maintainer review to determine if the parallel search functionality is feasible within the current architecture or if it requires architectural changes.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**Project Digest: ZeroClaw (zeroclaw-labs/zeroclaw)**
**Date:** 2026-11-18
**Analyst:** AI Agent Analyst

---

### 1. Today's Overview
ZeroClaw demonstrates high, sustained activity with 20 new issues and 50 PR updates in the last 24 hours. The project is currently in a heavy stabilization and feature-implementation phase leading toward the **v0.9.1 release**. The community is actively addressing critical bugs, retiring legacy dependencies, and adding security enhancements. The overall project health is positive, characterized by rapid response times to breaking bugs and a strong focus on closing the gap between the dashboard UI and runtime functionality.

### 2. Releases
**No new releases were detected in the last 24 hours.**
*Note: The project is clearly in a release candidate or stabilization window for v0.9.1, based on the high volume of issues tagged with `[release:v0.9.1]`.*

### 3. Project Progress
*   **Merged/Closed PRs (Last 24h):** 9 PRs were closed or merged.
*   **Key Progress:**
    *   **Memory Backend Migration:** PR #12521 successfully removes the deprecated **Lucid memory backend**, migrating configurations to SQLite.
    *   **Dependency Management:** PR #12516 addresses security advisories (RUSTSEC-2026-0543, RUSTSEC-2026-0555) by updating `chrono` and `chrono-tz` dependencies.
    *   **Documentation & CI:** PR #12522 corrects release setup guides, and PR #12166 adds verification for Windows prebuilt checksums.
    *   **Channel Refactoring:** PR #12443 moves IRC and Twitch out of the binary into registry plugins, improving modularity.

### 4. Community Hot Topics
The most discussed topics today focus on **Runtime Stability** and **Security**.
*   **Security: Emergency Stop Enforcement** (PR #9802, Issue #9390): There is significant community discussion regarding the completion of the "emergency-stop" contract. Issue #9390 highlights a gap where the `emergency-stop` state file is CLI-only, and PR #9802 is an RFC to enforce this at the runtime/network boundary.
    *   *Link:* [RFC: Complete emergency-stop enforcement](https://github.com/zeroclaw-labs/zeroclaw/pull/9802) | [Bug: CLI-only state file](https://github.com/zeroclaw-labs/zeroclaw/issues/9390)
*   **Runtime: Cron Job Blocking:** Issue #12489 reports a critical regression where a single long-running agent job blocks the entire cron scheduler, preventing other jobs from starting.
    *   *Link:* [Bug: Cron scheduler waits for whole batch](https://github.com/zeroclaw-labs/zeroclaw/issues/12489)
*   **Provider: Anthropic Signature Handling:** Issue #12504 and PR #12509 discuss a bug where Anthropic's provider replays unsigned thinking blocks, causing signature validation errors on retries.
    *   *Link:* [Bug: Unsigned thinking block replay](https://github.com/zeroclaw-labs/zeroclaw/issues/12504) | [Fix: Leave unsigned thinking out](https://github.com/zeroclaw-labs/zeroclaw/pull/12509)

### 5. Bugs & Stability
Several high-severity bugs were identified that directly impact workflow and data integrity, particularly around the v0.9.1 release.

*   **S1 - Workflow Blocked:**
    *   **Cost Enforcement Ignored (Issue #12477):** The `cost.enforcement.mode` configuration is being parsed but completely ignored by the runtime. In "warn" mode, budgets still stop the turn, rendering the mode ineffective.
    *   **Cron Deadlock (Issue #12489):** The cron scheduler lacks timeout protection for agent jobs. A single slow job prevents all other scheduled jobs from executing.
*   **S2 - Degraded Behavior:**
    *   **Dashboard Thinking Settings (Issue #12492):** The web dashboard ignores runtime profile thinking settings, preventing users from utilizing native reasoning features via the UI.
    *   **Gateway Logging Flooding (Issue #12476):** The gateway logs every connection at INFO level via `spawn!`, flooding the runtime trace logs.
    *   **Thinking Signature Errors (Issue #12504):** Anthropic provider errors on retries due to missing signatures in replayed thinking blocks.
*   **S0 - Security Risk:**
    *   **Supervised SOP Approval Logic (Issue #12514):** A security logic bug where a `supervised` SOP asks for no approval when step 1's decision model answers "no".

### 6. Feature Requests & Roadmap Signals
*   **Native Reasoning Support:** Issue #12054 and #12492 indicate a strong demand for the dashboard to respect runtime profiles' "thinking levels" (native reasoning effort) for OpenAI models. This suggests v0.9.1 will focus on aligning the UI with the runtime capabilities.
*   **MCP OAuth 2.1:** PR #12449 introduces generic OAuth 2.1 authorization for remote MCP servers, suggesting a push towards more secure, enterprise-grade integrations.
*   **Legacy Retirement:** The active retirement of the Lucid memory backend (#9644, PR #12521) signals a move to simplify the architecture by consolidating on SQLite.

### 7. User Feedback Summary
Users are currently focused on **operational reliability** and **configuration correctness**.
*   **Pain Point:** Operators migrating to v0.9.1 are finding that configuration settings (like `cost.enforcement.mode`) are not being applied by the daemon.
*   **Pain Point:** The "Thinking" feature, a key differentiator for Claude/OpenAI agents, is inaccessible in the Dashboard UI, forcing users to rely on CLI or external tools to configure it.
*   **Pain Point:** Legacy dependencies (chrono) are causing CI/CD security failures, indicating a need for immediate maintenance updates.

### 8. Backlog Watch
*   **[OPEN] [Feature]: easy per-chat model switching (Issue #8600):** A feature request from a Moltis user requesting easy model switching. This is a high-priority enhancement (#9644) and has been accepted, likely a target for a future release beyond v0.9.1.
*   **[OPEN] [RFC]: Scoped use of operator-managed service credentials (Issue #12422):** A complex security proposal regarding how agents access services without exposing credentials to the model. This is currently blocked and requires architectural consensus.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*