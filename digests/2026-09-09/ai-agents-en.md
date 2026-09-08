# OpenClaw Ecosystem Digest 2026-09-09

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-08 22:10 UTC

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

# NanoBot Project Digest — 2026-09-09

## 1. Today's Overview

NanoBot showed high contributor activity on 2026-09-09, with 40 pull requests updated in the last 24 hours and 14 reported as merged/closed, while user-facing issue activity remained low at only 2 updated issues, both closed. The pull request pipeline is heavily concentrated on stability, memory management, Telegram channel behavior, WebUI/TUI usability, and provider integrations. No new release was reported in the window, so the project appears to be in an active development and hardening phase rather than a release cadence event. Overall health looks active and responsive, with the main risk being a backlog of long-lived open PRs, some with merge conflicts, particularly around provider integrations and channel features.

## 2. Releases

No new NanoBot releases were reported for the 2026-09-09 digest window.

- New releases: **0**
- Breaking changes: **None reported**
- Migration notes: **None**

## 3. Project Progress

The dataset reports **40 PRs updated in the last 24 hours**, with **26 open** and **14 merged/closed**. The supplied top-20 PR excerpt does not itemize all 14 merged/closed PRs, but it does show one explicitly closed PR in the visible list:

| PR | Status | Area | Progress Signal |
|---|---:|---|---|
| [#5709](https://github.com/HKUDS/nanobot/pull/5709) | Closed | Provider / Codex model catalog | Updates the Codex model-catalog client version from `0.144.0` to `0.153.4` so that the model picker can expose `GPT-6-Astra` when available. This improves model discovery for signed-in Codex accounts. |

The remaining **13 merged/closed PRs** are not individually detailed in the provided top-20 excerpt, so their exact scope cannot be confirmed from the supplied data.

Open PR activity still indicates meaningful forward movement across several areas:

- **Runtime stability and memory management**: bounded caches for idle summaries, MCP OAuth flows, and Mattermost thread context.
- **Telegram channel maturity**: command routing fixes, command naming fixes, compaction UX, self-hosted Bot API support, and sticker replies.
- **WebUI/TUI usability**: sidebar/project organization, live settings, usage charts, and TUI onboarding.
- **Provider expansion**: Serply web search, Meta-Search Tool integration, and Codex model catalog fixes.

Representative open PRs advancing these areas include:

| PR | Status | Area | What It Advances |
|---|---:|---|---|
| [#5664](https://github.com/HKUDS/nanobot/pull/5664) | Open | Agent / performance | Bounds the idle-session summary cache to prevent unbounded growth from abandoned sessions. |
| [#5665](https://github.com/HKUDS/nanobot/pull/5665) | Open | MCP / WebUI / performance | Bounds retained MCP browser OAuth flows, reducing memory growth from repeated OAuth attempts. |
| [#5663](https://github.com/HKUDS/nanobot/pull/5663) | Open | Mattermost channel / performance | Bounds Mattermost thread context cache to prevent indefinite memory growth. |
| [#5708](https://github.com/HKUDS/nanobot/pull/5708) | Open | Exec / bug fix | Preserves UTF-8 across streaming output chunks by using incremental decoders for stdout/stderr. |
| [#5152](https://github.com/HKUDS/nanobot/pull/5152) | Open | Subagent / regression | Adds partial completion signaling for background sibling tasks so parent turns do not remain open ambiguously. |
| [#5711](https://github.com/HKUDS/nanobot/pull/5711) | Open | Telegram / command system | Renames hyphenated slash commands to Telegram-safe underscore names so commands are recognized and clickable. |
| [#5707](https://github.com/HKUDS/nanobot/pull/5707) | Open | Telegram / command router | Routes `/compact` and `/evaluator-prompt` through the builtin command router instead of dropping them. |
| [#5706](https://github.com/HKUDS/nanobot/pull/5706) | Open | Telegram / UX | Collapses context compaction notices into one edited message, reducing chat spam. |
| [#4919](https://github.com/HKUDS/nanobot/pull/4919) | Open | Telegram / enterprise | Adds support for a custom Telegram Bot API base URL and extra headers for self-hosted or enterprise gateways. |
| [#5387](https://github.com/HKUDS/nanobot/pull/5387) | Open | Telegram / feature | Adds support for reusable Telegram sticker replies. |
| [#5710](https://github.com/HKUDS/nanobot/pull/5710) | Open | WebUI / navigation | Organizes projects and simplifies sidebar navigation with fixed Topics, Projects, and Automations destinations. |
| [#5704](https://github.com/HKUDS/nanobot/pull/5704) | Open | WebUI / configuration | Expands settings with autosave and live configuration for many non-channel options. |
| [#5705](https://github.com/HKUDS/nanobot/pull/5705) | Open | TUI / observability | Adds a TUI-local `/usage` panel for context occupancy and recent model-round usage. |
| [#5703](https://github.com/HKUDS/nanobot/pull/5703) | Open | WebUI / performance | Reduces repeated DOM scanning, bounds history rendering, and improves long-conversation performance. |
| [#5498](https://github.com/HKUDS/nanobot/pull/5498) | Open | TUI / onboarding / docs | Unifies configuration onboarding in the Agent TUI with clearer labels, status text, and alignment. |
| [#5437](https://github.com/HKUDS/nanobot/pull/5437) | Open | Web search / provider | Adds Serply as a Google Search API-based web search provider. |
| [#5234](https://github.com/HKUDS/nanobot/pull/5234) | Open | Web search / provider | Integrates `mst-python` as a metasearch provider aggregating multiple search engines with RRF. |

## 4. Community Hot Topics

Explicit comment and reaction data is only clearly provided for the two updated issues. PR comment counts are shown as `undefined` in the supplied data, so PR “hotness” below is inferred from recency, labels, conflicts, scope, and user-visible impact rather than raw comment volume.

### Issues with Explicit Comment Activity

| Issue | Status | Comments | Reactions | Topic | Underlying Need |
|---|---:|---:|---:|---|---|
| [#5693](https://github.com/HKUDS/nanobot/issues/5693) | Closed | 3 | 0 | Ultra-lightweight, open-source, self-hosted assistant for unmanned retail/IoT | Users want a smaller deployment footprint, edge-device compatibility, lightweight configuration, and more Chinese-language documentation or examples. |
| [#5696](https://github.com/HKUDS/nanobot/issues/5696) | Closed | 1 | 0 | First-time contributor onboarding | New contributors want beginner-friendly issues, documentation improvements, bug fixes, and test coverage opportunities. |

### High-Signal PR Clusters

| Cluster | Representative PRs | Why It Matters |
|---|---|---|
| **Memory and long-running stability** | [#5664](https://github.com/HKUDS/nanobot/pull/5664), [#5665](https://github.com/HKUDS/nanobot/pull/5665), [#5663](https://github.com/HKUDS/nanobot/pull/5663), [#5703](https://github.com/HKUDS/nanobot/pull/5703) | These PRs target unbounded caches, repeated rendering work, and history retention. They indicate that self-hosted, always-on, and long-conversation users are likely hitting memory or performance pressure. |
| **Telegram channel reliability and UX** | [#5711](https://github.com/HKUDS/nanobot/pull/5711), [#5707](https://github.com/HKUDS/nanobot/pull/5707), [#5706](https://github.com/HKUDS/nanobot/pull/5706), [#4919](https://github.com/HKUDS/nanobot/pull/4919), [#5387](https://github.com/HKUDS/nanobot/pull/5387) | Telegram appears to be an important user-facing channel. Users want correct command recognition, less chat noise, richer reply types, and enterprise/self-hosted Bot API support. |
| **Provider and model access** | [#5709](https://github.com/HKUDS/nanobot/pull/5709), [#5437](https://github.com/HKUDS/nanobot/pull/5437), [#5234](https://github.com/HKUDS/nanobot/pull/5234) | The project is expanding model and search provider coverage. Users want broader provider choice, better model visibility, and more robust web search options. |
| **WebUI/TUI configurability and observability** | [#5710](https://github.com/HKUDS/nanobot/pull/5710), [#5704](https://github.com/HKUDS/nanobot/pull/5704), [#5705](https://github.com/HKUDS/nanobot/pull/5705), [#5498](https://github.com/HKUDS/nanobot/pull/5498) | Users want easier navigation, live configuration, usage visibility, and better onboarding. This suggests the UI is becoming a primary management surface, not just a chat surface. |

## 5. Bugs & Stability

No user-reported crash or regression issue is visible in the 24-hour issue set. The bug and stability signal below comes from PR labels, descriptions, and reported root causes.

| Severity | Item | Type | Status | Notes |
|---:|---|---|---:|---|
| High | [#5664](https://github.com/HKUDS/nanobot/pull/5664) — bound idle summary cache | Memory growth | Open | Abandoned sessions could leave summaries cached indefinitely. This is important for long-running or self-hosted instances. Fix PR exists but is not yet merged in the visible data. |
| High | [#5665](https://github.com/HKUDS/nanobot/pull/5665) — bound browser OAuth flows | Memory growth | Open | Repeated MCP browser OAuth attempts could grow the in-memory flow registry. Important for WebUI/MCP-heavy deployments. Fix PR exists but is not yet merged in the visible data. |
| High | [#5663](https://github.com/HKUDS/nanobot/pull/5663) — bound Mattermost thread context cache | Memory growth | Open | Mattermost thread identifiers were retained for process lifetime without eviction. Important for Mattermost channel users with long-running bots. Fix PR exists but is not yet merged in the visible data. |
| Medium-High | [#5708](https://github.com/HKUDS/nanobot/pull/5708) — preserve UTF-8 across streaming output chunks | Output corruption / exec bug | Open | Long-running exec sessions could replace valid UTF-8 characters spanning chunk boundaries with invalid-character markers. Fix PR exists but is not yet merged in the visible data. |
| Medium | [#5152](https://github.com/HKUDS/nanobot/pull/5152) — mark partial completion results | Regression / subagent state | Open | Parent turns could remain open while background sibling tasks still owe completion messages. Adds `subagent_remaining_count` and model-only pending notice. Fix PR exists but is not yet merged in the visible data. |
| Medium | [#5590](https://github.com/HKUDS/nanobot/pull/5590) — summarize persisted JSON tool results | Tool result preview quality | Open | Oversized persisted JSON results may hide root-level fields such as `ok`, `status`, `error`, `artifact`, or `revision` in the preview. PR is open and marked with conflict. |
| Medium | [#5707](https://github.com/HKUDS/nanobot/pull/5707) — route `/compact` and `/evaluator-prompt` to command router | Telegram command routing | Open | `/compact` and `/evaluator-prompt` were registered but silently dropped by the Telegram channel because the slash-command allowlist did not include them. Fix PR exists but is not yet merged in the visible data. |
| Medium | [#5711](https://github.com/HKUDS/nanobot/pull/5711) — rename hyphenated slash commands to Telegram-safe underscores | Telegram command compatibility | Open | Hyphenated commands such as `/dream-log` and `/evaluator-prompt` are not rendered as proper Telegram commands. Fix PR exists but is not yet merged in the visible data. |
| Low-Medium | [#5638](https://github.com/HKUDS/nanobot/pull/5638) — store Copilot OAuth token in data directory | Deployment / credentials persistence | Open | GitHub Copilot OAuth tokens were stored in a default directory that may not be persistent or writable in container deployments. Fix PR exists but is not yet merged in the visible data. |
| Fixed / Closed | [#5709](https://github.com/HKUDS/nanobot/pull/5709) — refresh model catalog for Astra | Provider model discovery | Closed | Codex model picker could omit `GPT-6-Astra` because the catalog client version was too old. The visible PR is closed, indicating the reported issue was addressed. |

## 6. Feature Requests & Roadmap Signals

### Explicit User Feature Request

| Request | Issue | Signal |
|---|---|---|
| Ultra-lightweight, open-source, self-hosted assistant for unmanned retail/IoT scenarios | [#5693](https://github.com/HKUDS/nanobot/issues/5693) | The issue asks for lighter deployment options suitable for edge devices, support for unmanned retail or smart vending scenarios, and more Chinese documentation/examples. Although the issue is closed, the request suggests a potential market for low-footprint self-hosted deployments. |

### Roadmap Signals From Open and Recently Closed PRs

| Signal | Related PRs | Likelihood of Near-Term Attention |
|---|---|---|
| **Stability and memory hardening** | [#5664](https://github.com/HKUDS/nanobot/pull/5664), [#5665](https://github.com/HKUDS/nanobot/pull/5665), [#5663](https://github.com/HKUDS/nanobot/pull/5663), [#5703](https://github.com/HKUDS/nanobot/pull/5703) | High. These are low-risk, high-value fixes for long-running deployments and are likely to be merged if tests and review proceed smoothly. |
| **Telegram channel polish** | [#5711](https://github.com/HKUDS/nanobot/pull/5711), [#5707](https://github.com/HKUDS/nanobot/pull/5707), [#5706](https://github.com/HKUDS/nanobot/pull/5706) | High. Command recognition, command routing, and reduced compaction spam are directly user-visible. |
| **Enterprise/self-hosted Telegram support** | [#4919](https://github.com/HKUDS/nanobot/pull/4919) | Medium-High. Custom Bot API base URL and extra headers are useful for enterprise or local gateways, but the PR has been open since July and may need maintainer review or conflict resolution. |
| **Telegram sticker replies** | [#5387](https://github.com/HKUDS/nanobot/pull/5387) | Medium. Feature is user-facing but marked with conflict, so it may need rebase or maintainer prioritization. |
| **Web search provider expansion** | [#5437](https://github.com/HKUDS/nanobot/pull/5437), [#5234](https://github.com/HKUDS/nanobot/pull/5234) | Medium. Provider additions show ecosystem growth, but both are open with conflict labels. `#5234` is marked `p1`, making it a higher-priority backlog item. |
| **Codex model catalog accuracy** | [#5709](https://github.com/HKUDS/nanobot/pull/5709) | Likely already advanced. The visible PR is closed, suggesting the fix may be incorporated. |
| **WebUI live settings and navigation** | [#5704](https://github.com/HKUDS/nanobot/pull/5704), [#5710](https://github.com/HKUDS/nanobot/pull/5710), [#5703](https://github.com/HKUDS/nanobot/pull/5703) | Medium-High. These improve daily usability, but large UI/configuration PRs may need incremental review. |
| **TUI onboarding and usage visibility** | [#5498](https://github.com

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest for 2026-09-09

## Today's Overview
PicoClaw has seen a slight increase in activity with 4 issues updated and 8 PRs created. There were no new releases as of last checked.

## Releases
No new versions released today.

## Project Progress
Today, 1 merged PR and 3 closed PRs were reported. The most notable feature advancement was the fix for Data Race in the config.initSensitiveCache function, which returned a nil pointer causing panic.

## Community Hot Topics
The #3374 issue is the most active today with 2 comments. The user asked about a tool feedback animation that edits a Telegram message indefinitely after a failed turn.

## Bugs & Stability
No bugs or crashes reported today.

## Feature Requests & Roadmap Signals
No new feature requests were reported. However, users are interested in adding a Build Remote Agent phone pairing feature to support remote agent operations on devices.

## User Feedback Summary
No user feedback was reported today.

## Backlog Watch
None of the long-unanswered issues or PRs needed immediate attention.

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



# IronClaw Project Digest — 2026-09-09

## 1. Today's Overview

IronClaw showed brisk activity on 2026-09-09 with 11 PRs updated and 2 issues addressed in the last 24 hours, all driven primarily by maintainer **kirikov**. No new releases were cut, but the workflow is clearly mid-cycle: several closed PRs have been superseded or replaced by newer iterations (notably #8083 → #8090 on the hosted-MCP catalog bug, and #6760/#6759 → #8089/#8084 after rebasing). The project is in a tight feedback loop on multi-tenant hosted-MCP correctness and deployment ergonomics — two areas that directly affect operator reliability. Health indicator: **active and focused**, with no stagnating high-priority items visible.

## 2. Releases

No new releases were published today.

---

## 3. Project Progress

**Merged / Closed today:**

| PR | Description |
|----|-------------|
| [#8083](https://github.com/nearai/ironclaw/pull/8083) | Fix: merge discovered hosted-MCP catalogs instead of replacing them. Closed — superseded by #8090 which takes the more correct per-caller keying approach. |
| [#6760](https://github.com/nearai/ironclaw/pull/6760) | Bundle the `agent-market` marketplace extension with env-configurable server URL. Closed as superseded in shape by #8089. |
| [#6759](https://github.com/nearai/ironclaw/pull/6759) | SEP-414 `_meta` attribution on outbound hosted-MCP calls. Closed; needs rebasing — functionality carried forward into #8084. |

**Key advancement themes:**

- **Hosted-MCP multi-tenant isolation** — The most significant thread today. #8090 directly fixes the bug in #6778 by keying discovered catalogs per caller rather than per extension ID, eliminating the "last writer wins" tool overwrite problem on shared servers.
- **Deployment configurability** — #8087 makes the prompt-context token limit an overrideable constant; #8088 distinguishes set-but-empty env vars from unset ones; #8085 aligns operator-installed packages with host-bundled ones in validation.
- **First-party package consolidation** — #8089 bundles the agent-market hosted-MCP provider as a first-party package with static fallback schemas, improving the developer/operator onboarding path.
- **Telegram UX** — #8072 registers the Bot API command menu at activation, a visible quality-of-life improvement for Telegram-channel users.

---

## 4. Community Hot Topics

**Most discussed / reacted-to items today:**

1. **[Issue #6778](https://github.com/nearai/ironclaw/issues/6778)** — *Hosted-MCP: discovered tool catalogs published per extension id, not per installation*
   - 2 comments. The root issue affecting multi-principal hosted-MCP servers: users overwrite each other's tool catalogs. This is the highest-impact bug in the current cycle and has a direct fix PR (#8090). The underlying need is **correct multi-tenant isolation** — a prerequisite for any production hosted deployment.

2. **[Issue #8086](https://github.com/nearai/ironclaw/issues/8086)** — *`ironclaw skills list` cannot see skills that the runtime writes*
   - Open, 0 comments (filed today). CLI and runtime skill namespaces are disjoint, causing debugging confusion. The underlying need is **observability consistency** — operators expect the CLI to reflect runtime state.

3. **[PR #8072](https://github.com/nearai/ironclaw/pull/8072)** — *Telegram command menu registration at activation*
   - Filed by community contributor **thisisjoshford**. Addresses a visible UX gap for Telegram users who previously had no discoverable command surface. Low risk, high user-facing value.

---

## 5. Bugs & Stability

| Severity | Item | Description | Fix Status |
|----------|------|-------------|------------|
| **High** | [#6778](https://github.com/nearai/ironclaw/issues/6778) / [#8090](https://github.com/nearai/ironclaw/pull/8090) | Hosted-MCP multi-tenant tool overwrite: one user's `tools/list` discovery clobbers another's in a shared registry keyed by extension ID alone. | Fix PR #8090 open — keys catalogs per caller. |
| **Medium** | [#8086](https://github.com/nearai/ironclaw/issues/8086) | `ironclaw skills list` returns empty for skills installed by the runtime or belonging to other configured users. No fix PR yet. | Open — needs namespace reconciliation. |
| **Medium** | [#8085](https://github.com/nearai/ironclaw/pull/8085) | Operator-installed packages pass validation inconsistently with host-bundled packages due to divergent schema-handling paths. | Fix PR #8085 open. |
| **Low** | [#8088](https://github.com/nearai/ironclaw/pull/8088) | Empty-string env vars silently fall back to defaults, masking operator typos (e.g., a blank endpoint override). | Fix PR #8088 open. |

No crashes or regressions reported today. The high-severity bug (#6778/#8090) is the only stability concern likely to affect production hosted deployments.

---

## 6. Feature Requests & Roadmap Signals

| PR / Issue | Signal | Likelihood in Next Release |
|------------|--------|---------------------------|
| [#8090](https://github.com/nearai/ironclaw/pull/8090) | Per-caller hosted-MCP catalog keying — foundational for correct multi-tenant operation | **Very high** — blocks safe hosted deployment |
| [#8089](https://github.com/nearai/ironclaw/pull/8089) | First-party agent-market bundled package with static fallback schemas | **High** — complements #8090, already in review |
| [#8082](https://github.com/nearai/ironclaw/pull/8082) | Opt-in pointer mode for document text in model context (avoids silent 25k-token consumption per PDF) | **Medium-high** — addresses a common operator pain point around context budget |
| [#8087](https://github.com/nearai/ironclaw/pull/8087) | Overrideable prompt-context token limit (currently hardcoded at 128k) | **Medium** — deployment ergonomics; may ship alongside #8082 |
| [#8084](https://github.com/nearai/ironclaw/pull/8084) | Opt-in SEP-414 caller attribution on outbound hosted-MCP calls | **Medium** — needed by providers with per-conversation state or idempotency requirements |
| [#8072](https://github.com/nearai/ironclaw/pull/8072) | Telegram command menu registration | **High** — low risk, visible UX improvement, community-authored |

**Roadmap trend:** The current cycle is heavily oriented toward **multi-tenant correctness** and **deployment configurability** — both are infrastructure-grade concerns that suggest IronClaw is maturing beyond single-user / single-tenant deployments.

---

## 7. User Feedback Summary

- **Multi-tenant hosted-MCP is a real pain point.** Issue #6778 and its lineage (#6759 → #8084, #6760 → #8089) show that operators running hosted MCP servers with multiple principals are hitting correctness bugs that silently corrupt tool catalogs. The fix is underway but was blocked on a naive merge-and-replace approach (#8083) that was itself incorrect — indicating the team is iteratively refining the design.
- **CLI/runtime visibility mismatch frustrates debugging.** Issue #8086 captures a relatable operator experience: running `ironclaw skills list` and seeing nothing, while the agent runtime clearly has skills. This suggests a deeper architectural gap between the CLI execution context and the agent runtime context that will require a deliberate design decision to close.
- **Document attachment costs are surprising.** PR #8082 responds to an implicit feedback pattern: operators attaching PDFs and watching their context budget vanish. The opt-in pointer mode is a conservative, backward-compatible response.
- **Telegram UX is underserved but responsive.** PR #8072, authored by a community contributor, shows that smaller UX gaps are being noticed and filled outside the core maintainer loop — a healthy signal.

---

## 8. Backlog Watch

| Item | Age | Concern |
|------|-----|---------|
| [#6778](https://github.com/nearai/ironclaw/issues/6778) | Open since 2026-07-28 (~43 days) | High-impact multi-tenant bug. Fix PR #8090 is open but not yet merged. This is the longest-standing item with production consequences. |
| [#8086](https://github.com/nearai/ironclaw/issues/8086) | Open since 2026-09-08 | Fresh but unassigned. CLI/runtime skill namespace gap likely needs architectural attention, not just a patch. |
| [#6759](https://github.com/nearai/ironclaw/pull/6759) | Open since 2026-07-28, closed 2026-09-08 | Superseded but its functionality lives on in #8084 — worth confirming the handoff is complete and #8084 is tracked. |
| [#6760](https://github.com/nearai/ironclaw/pull/6760) | Open since 2026-07-28, closed 2026-09-08 | Same supersession pattern as #6759; intent carried into #8089. |

**Maintainer attention needed:** #8090 (the per-caller catalog fix) should be prioritized for merge — it unblocks safe multi-tenant hosted-MCP use. #8086 deserves a triage decision: either scope a targeted fix or file a follow-up tracking issue for the deeper CLI/runtime alignment problem.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>



# LobsterAI Project Digest — 2026-09-09

## 1. Today's Overview

LobsterAI showed moderate activity on 2026-09-08, with **9 pull requests** updated in the last 24 hours and **zero new issues** filed. The dominant theme is post-upgrade stability work following the **OpenClaw v2026.8.1** runtime upgrade — 7 of 9 PRs directly address regressions introduced by this change. No new releases were published, and no open issues remain. Overall, the project is in a reactive stabilization phase rather than a feature-development phase, which is a healthy sign of a mature open-source project actively patching its dependency chain.

## 2. Releases

**No new releases** were published during this period.

---

## 3. Project Progress

**Merged / Closed PRs Today:**

| PR | Title | Author | Link |
|----|-------|--------|------|
| #2624 | Fix HTML thumbnail white-screen & Mermaid preview race | liugang519 | [#2624](https://github.com/netease-youdao/LobsterAI/pull/2624) |
| #2625 | Stabilize upgrade migration & packaged gateway startup | btc69m979y-dotcom | [#2625](https://github.com/netease-youdao/LobsterAI/pull/2625) |
| #2626 | Preinstall external provider plugins | btc69m979y-dotcom | [#2626](https://github.com/netease-youdao/LobsterAI/pull/2626) |
| #2627 | Adapt native `ask_user` question protocol | btc69m979y-dotcom | [#2627](https://github.com/netease-youdao/LobsterAI/pull/2627) |
| #2628 | Restore DingTalk & Lark plugin compatibility | btc69m979y-dotcom | [#2628](https://github.com/netease-youdao/LobsterAI/pull/2628) |
| #2629 | Restore NIM & NetEase Bee plugin compatibility | btc69m979y-dotcom | [#2629](https://github.com/netease-youdao/LobsterAI/pull/2629) |
| #2630 | Restore DingTalk & Lark message dispatch | btc69m979y-dotcom | [#2630](https://github.com/netease-youdao/LobsterAI/pull/2630) |
| #1159 | Add session fork feature (stale, now merged) | vdorchan | [#1159](https://github.com/netease-youdao/LobsterAI/pull/1159) |

**Key Advances:**
- **Plugin ecosystem restoration:** Four PRs (#2628, #2629, #2630) collectively restore DingTalk, Lark, NIM, and NetEase Bee integration after breaking changes in OpenClaw v2026.8.1.
- **Startup reliability:** PR #2625 fixes session migration, Agent config sync, and gateway startup failures post-upgrade. PR #2626 preinstalls eight external provider plugins to avoid runtime consent prompts.
- **UX protocol fix:** PR #2627 reconnects the desktop `ask_user` dialog to the new `question.*` protocol.
- **Artifact rendering:** PR #2624 resolves HTML thumbnail white-screen and Mermaid race-condition bugs.
- **Long-awaited feature:** PR #1159 finally merged a **session fork** feature (open since March 2026), allowing users to branch cowork sessions from the action menu.

---

## 4. Community Hot Topics

**Most Discussed / Active:**

1. **[PR #1159 — Session Fork](https://github.com/netease-youdao/LobsterAI/pull/1159)** — Opened 2026-03-31, merged 2026-09-08. After ~5 months, this feature was finally shipped. The long gap indicates it was a high-priority community request that may have been blocked by architecture decisions or resource constraints. The "stale" label was removed, suggesting maintainers re-engaged.

2. **[PR #2631 — Cron run history & failure state fix](https://github.com/netease-youdao/LobsterAI/pull/2631)** — Currently **open**. Addresses regressions in scheduled-task history after the OpenClaw upgrade. Still awaiting review/merge.

3. **[PR #2625 — Upgrade migration & gateway stability](https://github.com/netease-youdao/LobsterAI/pull/2625)** — Critical for users upgrading to OpenClaw 2026.8.1. Covers config migration, workspace retention, and Windows runtime size optimization.

**Underlying Needs Analysis:**
- The OpenClaw v2026.8.1 upgrade caused widespread **plugin compatibility regressions**, indicating the upstream SDK made breaking changes without maintaining backward compatibility. Users relying on DingTalk, Lark, NIM, or NetEase Bee integrations are the most affected.
- The **session fork** demand (PR #1159) reveals users want non-destructive exploration within cowork sessions — a common pattern in collaborative AI workflows.
- Cron/scheduled-task reliability (PR #2631) remains a concern, suggesting the scheduling subsystem needs more robust testing.

---

## 5. Bugs & Stability

**Reported / Fixed Today (Ranked by Severity):**

| Severity | Issue | PR | Status |
|----------|-------|-----|--------|
| 🔴 High | DingTalk runtime not initialized after OpenClaw upgrade | [#2630](https://github.com/netease-youdao/LobsterAI/pull/2630) | ✅ Closed |
| 🔴 High | Lark SDK root entry no longer exported — plugin load failure | [#2628](https://github.com/netease-youdao/LobsterAI/pull/2628) | ✅ Closed |
| 🔴 High | NIM & NetEase Bee plugin `ERR_PACKAGE_PATH_NOT_EXPORTED` | [#2629](https://github.com/netease-youdao/LobsterAI/pull/2629) | ✅ Closed |
| 🟠 Medium | Gateway startup blocked by `requires capability consent` after adding Qwen | [#2626](https://github.com/netease-youdao/LobsterAI/pull/2626) | ✅ Closed |
| 🟠 Medium | `ask_user` dialog doesn't open post-upgrade | [#2627](https://github.com/netease-youdao/LobsterAI/pull/2627) | ✅ Closed |
| 🟠 Medium | Old session migration & Agent config sync broken after upgrade | [#2625](https://github.com/netease-youdao/LobsterAI/pull/2625) | ✅ Closed |
| 🟡 Low | HTML thumbnail white-screen & Mermaid race condition | [#2624](https://github.com/netease-youdao/LobsterAI/pull/2624) | ✅ Closed |
| 🟡 Low | Cron run history & failure state regression | [#2631](https://github.com/netease-youdao/LobsterAI/pull/2631) | 🟢 Open |

**Assessment:** The OpenClaw v2026.8.1 upgrade introduced a **cascading set of regressions** across the plugin ecosystem and core UX. Most have been patched, but PR #2631 (cron) remains open — a potential gap for scheduled-task users.

---

## 6. Feature Requests & Roadmap Signals

**Recently Shipped:**
- **Session Fork** [#1159](https://github.com/netease-youdao/LobsterAI/pull/1159) — Branch cowork sessions from the detail view. Likely to see similar "branching" features for other session types.

**Signals for Near-Term Roadmap:**
- **Plugin ecosystem robustness:** The volume of fix PRs (#2628–#2630) suggests the maintainers are prioritizing plugin SDK abstraction layers to insulate against upstream breaking changes.
- **Scheduled-task reliability:** PR #2631 indicates active investment in cron/scheduling; expect further hardening.
- **Artifact rendering quality:** PR #2624's comprehensive fix (HTML thumbnails, Mermaid, animation timing) suggests the artifacts subsystem is a focus area.

---

## 7. User Feedback Summary

**Pain Points Identified:**
1. **Plugin breakage after runtime upgrades** — The OpenClaw v2026.8.1 upgrade broke DingTalk, Lark, NIM, and NetEase Bee plugins. Users depend on these for daily workflows and experienced immediate disruption.
2. **Capability consent friction** — Adding Qwen as a provider now triggers a gateway-blocking consent prompt (#2626), creating a poor onboarding experience.
3. **Missing desktop dialog** — The `ask_user` protocol change silently broke the desktop question UI (#2627), leaving users unable to respond to agent requests.
4. **Artifact rendering glitches** — HTML thumbnails showing white screens and Mermaid diagrams failing to render (#2624) affect documentation and visualization workflows.
5. **No session branching** — The 5-month gap before session fork merging (#1159) suggests users had no way to experiment without losing original session state.

**Satisfaction Indicators:**
- No new issues filed in 24h, which could indicate user patience during the upgrade stabilization phase — or a quiet user base.
- The merged session fork feature addresses a long-standing community request, likely improving satisfaction.

---

## 8. Backlog Watch

| Item | Type | Open Since | Risk | Link |
|------|------|-----------|------|------|
| Cron run history & failure state fix | PR | 2026-09-08 | 🟡 Medium | [#2631](https://github.com/netease-youdao/LobsterAI/pull/2631) |

**Note:** PR #2631 is the only outstanding item from today's activity. It addresses a regression in scheduled-task history and failure-state persistence. Given that cron jobs are critical for automated workflows, this should be prioritized for merge.

No long-standing unresolved issues were reported today. The project's issue count is at **0 open**, which is unusually low and may indicate either a very quiet community cycle or that users are relying on PRs as the primary feedback channel.

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

**CoPaw (agentscope-ai/CoPaw) Project Digest: 2026-09-09**

### 1. Today's Overview
The CoPaw project maintained robust activity on 2026-09-09, with 30 open issues and 45 pull requests updated in the last 24 hours. Activity was driven by the release of **v2.2.1-beta.1**, focusing on model routing and bug fixes. The project is in a stable development cycle (v2.2.x), balancing feature enhancements (new providers, UI improvements) with critical stability fixes (shell tool handling, PDF processing). Overall, the project demonstrates high engagement from the community, with a mix of bug reports, feature requests, and active development pushing towards a stable release.

### 2. Releases
*   **v2.2.1-beta.1** (Released)
    *   **Key Changes:**
        *   **feat:** Added agent model routing settings (`zhaozhuang521`).
        *   **docs:** Updated website for v2.2.0 (`cuiyuebing`).
        *   **fix:** Sync resolved sessions during streaming (`zhaozh`).
    *   **Status:** Beta release. Installation verification was logged as passed (`#7635`).

### 3. Project Progress
*   **Merged/Closed PRs:** 24 PRs were updated today, with 5 already merged/closed.
*   **Key Advancements:**
    *   **Memory Backend Migration:** The core memory plugin architecture is being finalized with PR #7616, moving `ADBPG` and `PowerContext` into plugins.
    *   **New Provider Support:** Added `Requesty` as an OpenAI-compatible provider (`#7638`).
    *   **New Memory Backend:** Added an experimental `OpenViking` long-term memory backend (`#7613`).
    *   **UI/UX Refinements:** Improved mobile agent selector (`#7623`) and fixed sidebar/settings navigation (`#7502`).
    *   **Stability Fixes:**
        *   **Shell Tools:** Fixed Windows child process stdin inheritance (`#7598`).
        *   **MCP Protocol:** Fixed legacy handshake 401 error handling (`#7627`).
        *   **Console:** Prevented chat submission bypassing the message queue (`#7610`).

### 4. Community Hot Topics
*   **[Issue #7579]** [OPEN] Bug: Model reply lost in context (空响应)
    *   **Status:** Open, 8 comments. **Most Active.**
    *   **Analysis:** A critical UX regression where the model fails to "see" its previous response, causing empty replies. Users are running v2.2.0 via PyInstaller.
*   **[Issue #7589]** [OPEN] Heartbeat cron session feedback loop (duplicate messages)
    *   **Status:** Open, 4 comments. **High Priority.**
    *   **Analysis:** A severe logic bug causing message pile-ups and agent unresponsiveness for up to 2 hours.
*   **[Issue #7622]** [OPEN] UI Bug: Modal transparency issues (v2.2.0)
    *   **Status:** Open, 3 comments.
    *   **Analysis:** Visual regression in the Linux console UI where modals lack background masking, making them hard to interact with.

### 5. Bugs & Stability
*   **High Severity:**
    *   **Model Context Loss (#7579):** Agent crashes or becomes unresponsive due to missing context history.
    *   **Heartbeat Loop (#7589):** System logic error causing duplicate messages.
    *   **Shell Tool Hang (#7554 - Closed):** Windows console input blocking (Issue resolved in PR #7598).
*   **Medium Severity:**
    *   **PDF DataBlock Breaking History (#7617 - Closed):** History with PDF files breaks subsequent text-only model calls (Resolved via PR #7621/7636).
    *   **MCP OAuth Misdiagnosis (#7620 - Closed):** Legacy MCP endpoints incorrectly flagged as requiring OAuth (Resolved via PR #7627).
    *   **llama.cpp Version Parsing (#7633 - Open):** Silent rollback of user-upgraded runtime binaries due to version number parsing failures.

### 6. Feature Requests & Roadmap Signals
*   **Community Integration:** Feature request (#7583) to link QwenPaw with the AgentScope community platform (login, feedback, plugin market) is gaining traction.
*   **Performance:** PR #7639 optimizes database integrity checks to improve agent startup performance.
*   **Plugin Management:** Issues (#7582) highlight a desire for "one-click updates" and better plugin marketplace UX.
*   **Context Management:** Enhancement request (#7628) to make context compaction budget-aware of the *complete* request rather than just visible context.

### 7. User Feedback Summary
*   **Pain Points:** Users are reporting significant stability issues with v2.2.0, particularly regarding **Chinese IME input**, **shell tool behavior on Windows**, and **modal UI transparency**.
*   **Use Cases:** The community is heavily utilizing the **Desktop App** (PyInstaller) and the **Plugin Marketplace** (ClawHub/ACP). There is a strong demand for better **memory management** (ReMe/ADBPG) and more granular **model routing**.
*   **Satisfaction:** Generally positive on the UI redesigns (sidebar) and new provider support, but frustrated by regressions in core functionality (context loss, message duplication).

### 8. Backlog Watch
*   **[Issue #7363]** Synchronous calls freezing event loop and timeout failure. (Created Aug 27, 5 comments). **Needs Attention:** Affects startup and message sending performance significantly.
*   **[Issue #7469]** ReMe background embedding job failure. (Created Sep 1, 5 comments). **Needs Attention:** Affects long-term memory functionality silently.
*   **[Issue #7615]** Question: Where to ask for third-party plugin/skill help? (Created Sep 7, 1 comment). **Needs Attention:** Indicates a potential gap in documentation or community onboarding for external assets.

**Links:**
*   [GitHub Repository](https://github.com/agentscope-ai/CoPaw)
*   [Issue #7579 (Context Loss)](https://github.com/agentscope-ai/QwenPaw/issues/7579)
*   [Issue #7589 (Heartbeat Loop)](https://github.com/agentscope-ai/QwenPaw/issues/7589)
*   [Issue #7622 (UI Transparency)](https://github.com/agentscope-ai/QwenPaw/issues/7622)
*   [Issue #7363 (Event Loop Freeze)](https://github.com/agentscope-ai/QwenPaw/issues/7363)

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest | 2026-09-09

### 1. Today's Overview
Activity on the ZeptoClaw repository remained steady with 3 issues and 2 pull requests updated in the last 24 hours. The project is currently in a high-security maintenance phase, with the core focus shifting from feature development to hardening the codebase against privilege escalation vulnerabilities and dependency risks. The open issue count suggests ongoing architectural challenges regarding memory management, while the PR activity indicates active remediation of these security flaws.

### 2. Releases
**No new releases were published in the last 24 hours.**

### 3. Project Progress
*   **Security Hardening:** Two significant pull requests were merged/closed, addressing critical security concerns. PR #673 successfully implemented strict file permissions (`0600` for secrets, `0700` for directories) to prevent local privilege escalation, while PR #674 improved WebSocket security by replacing long-lived API tokens with ephemeral, single-use tickets.
*   **Dependency Management:** Issue #651 was closed, resolving 7 RustSec advisories across critical crates including `h2`, `quick-xml`, and `bcrypt`.
*   **Architecture:** The team is actively refining the memory system, as evidenced by the maintenance of an open high-priority issue regarding cross-session recall.

### 4. Community Hot Topics
*   **Memory Architecture (Issue #666):** This is the most active open topic, specifically focused on the `§2 Memory and learning system`. The author is debating the trade-offs between ZeptoClaw's selective retrieval model and Hermes's always-present profile, aiming to optimize the `≤5 query-matched memories` budget. [View Issue #666](https://github.com/qhkm/zeptoclaw/issues/666)
*   **Security Hardening (PRs #673 & #674):** The recent focus on fixing secret file permissions and WebSocket authentication has generated significant traction, likely driven by the maintainers' responsiveness to potential privilege escalation risks. [View PR #673](https://github.com/qhkm/zeptoclaw/pull/673) | [View PR #674](https://github.com/qhkm/zeptoclaw/pull/674)

### 5. Bugs & Stability
*   **High Severity:** **Secret File Permissions (Issue #652):** The project discovered that configuration files containing API keys and panel tokens were written with default system permissions (umask), making them readable by other local users. This is a severe security regression that has been addressed in the closed PR #673.
*   **Medium Severity:** **Dependency Vulnerabilities (Issue #651):** A dependency audit revealed 7 known vulnerabilities. While the issue is closed, it highlights a need for continuous monitoring of the RustSec advisory database to maintain zero-tolerance security policies.

### 6. Feature Requests & Roadmap Signals
*   **Transactional Memory:** The open issue #666 indicates a roadmap item for "transactional memory writes." The project is exploring how to persist state changes reliably across sessions without losing the efficiency gains of selective retrieval. This suggests a future update may introduce more robust persistence mechanisms or a hybrid memory model.

### 7. User Feedback Summary
*   **Trust & Privacy:** Feedback is heavily focused on the trustworthiness of the agent's environment. Users are concerned about where credentials are stored and how they are transmitted (e.g., via WebSocket URLs). The community is demanding "zero-tolerance" security policies and explicit permission management for local files.
*   **Performance vs. Reliability:** There is a distinct tension between the desire for high-performance retrieval and the need for durable, reliable memory persistence. Users are observing "losses" in recall/recall performance when attempting to implement complex mutation strategies.

### 8. Backlog Watch
*   **Durable Cross-Session Recall:** Issue #666 remains open and requires active discussion on the optimal strategy for balancing retrieval cost with data durability. The maintainer is currently soliciting input on whether to preserve the selective retrieval model or adopt a more complex transactional approach. [View Issue #666](https://github.com/qhkm/zeptoclaw/issues/666)

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-09-09

## 1. Today's Overview
ZeroClaw maintained a high activity rate today with 28 open issues and 50 open pull requests updated. The project is heavily focused on architectural refinement, particularly around runtime security, session management, and provider integrations. While there are no new releases, the volume of RFCs and high-severity bugs indicates active stabilization work ahead of potential versioning milestones.

## 2. Releases
**None.** No new releases were tagged in the last 24 hours.

## 3. Project Progress
*   **RFC Consolidation:** Maintenance of the RFC decision queue (#8692) remains critical as several architectural proposals (runtime sessions, WASM architecture, session history) await maintainer review.
*   **Stability Fixes:** Multiple critical bugs were addressed in the last 24 hours, including WhatsApp voice note transcription (#10688) and Reliable provider streaming errors (#10326).
*   **Cost Attribution:** A significant effort is underway to track conversation costs accurately. PR #10718 attributes ledger records to chat conversations, addressing the issue where cost records shared a daemon-lifetime session ID across all agents (#10700).

## 4. Community Hot Topics
*   **RFC: Runtime-owned conversation sessions (#9487)** - *35 comments*
    *   *Underlying Need:* The project is debating a fundamental architectural shift to decouple transport layers from conversation lifecycle, improving security and modularity.
*   **RFC: Unified file and attachment architecture (#9488)** - *28 comments*
    *   *Underlying Need:* Users need a standardized way to handle file uploads across different channels and surfaces to prevent data silos.
*   **RFC: Append-only session event history (#10526)** - *5 comments*
    *   *Underlying Need:* There is a push to make agent execution state deterministic and replayable, moving away from mutable conversation logs.
*   **Feature: Active-response steering on OpenAI Responses (#10708)** - *0 comments*
    *   *Underlying Need:* Users want to steer running AI responses in real-time via WebSocket, reducing latency for interactive applications.

## 5. Bugs & Stability
*   **[S1 - Workflow Blocked] Failed ACP turns disappear after switching sessions (#9333)**
    *   *Status:* In Progress. *Risk: High.* The agent state management in ACP (Active Code Pane) sessions is failing to persist errors correctly when users switch contexts.
*   **[S1 - Workflow Blocked] Heartbeat target rejects channel composite keys (#10670)**
    *   *Status:* Closed. *Risk: Medium.* The daemon's heartbeat mechanism was incorrectly validating channel instance keys, potentially disrupting multi-instance deployments.
*   **[S2 - Degraded Behavior] ZeroCode duplicates streamed responses (#10667)**
    *   *Status:* In Progress. *Risk: Medium.* The ZeroCode TUI is rendering assistant messages twice during streaming, indicating a client-side rendering race condition.
*   **[S2 - Degraded Behavior] WhatsApp Web voice notes never transcribed (#10688)**
    *   *Status:* Closed. *Risk: Medium.* The channel was built without the correct wiring for the agent's transcription provider, rendering voice notes useless.

## 6. Feature Requests & Roadmap Signals
*   **OpenAI Responses Enhancements:** A cluster of new features (#10704 - Async tools, #10705 - Max reasoning effort, #10706 - Opaque reasoning state) suggests the project is deeply integrating with OpenAI's newer "Responses" API paradigm, aiming to support advanced reasoning workflows and streaming state management.
*   **Passive Group Context:** PRs #10640 and Issue #10715 propose adding "passive group context" for Telegram, mirroring functionality already available for WhatsApp. This indicates a roadmap to unify cross-platform message handling.
*   **Granular Sandbox Policy:** Issue #6996 remains a high-priority architectural request to fix the drift between application-layer policies and OS-level sandboxes (Landlock/Bubblewrap).

## 7. User Feedback Summary
Users are expressing pain points regarding **cost accounting** (#10700, #10718) and **state persistence** (#9333, #10674). There is significant frustration with history trimming algorithms that defeat prompt caching (#10674) and bugs in the ZeroCode interface that obscure agent output (#10697). The community is also actively requesting better documentation for complex provider setups like Astra and Codex (#10709).

## 8. Backlog Watch
*   **RFC: Composable WASM plugin runtime (#10076)** - *11 comments*. A major architectural shift involving typed extension points and replaceable providers is proposed but awaiting consensus.
*   **Bug: Token-budget history trimming (#10702)** - *1 comment*. Related to #10674, this highlights a hysteresis gap in the trimming logic that causes continuous re-trimming.
*   **PR: Restore supervised shell approval routing (#10241)** - *Status: Blocked*. A critical security fix for channel-driven shell approvals is stalled due to pending author action.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*