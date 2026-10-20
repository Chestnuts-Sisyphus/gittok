# OpenClaw Ecosystem Digest 2026-10-21

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-20 22:49 UTC

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

⚠️ Summary generation failed.

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

# 📦 IronClaw Project Digest — 2026-10-21
## 1. Today's Overview
IronClaw (github.com/nearai/ironclaw) shows active development momentum with 3 new open issues and 9 updated pull requests in the past 24 hours. The updates center on improvements to hosted-MCP support for local/loopback environments, with two open PRs addressing endpoint enrollment and credential-account bridging. External dependency churn is ongoing, with multiple security-related and stability PRs (e.g., rustls/dompurify/dependencies updates) on the road. Overall, the project remains healthy with continuous progress in MCP/agent infrastructure and dependency maintenance.
## 2. Releases
No new releases were published on 2026-10-21.
## 3. Project Progress
- **MCP/Hosted-MCP Improvements:** Several open issues and PRs focus on fixing hosted-MCP registration failures for local endpoints, addressing network policy constraints and credential-account scenarios. Open PR #8147 explicitly targets "allow explicit trusted enrollment of an exact loopback MCP endpoint," addressing registration and credential-account challenges for local servers.
- **Dependency & Stability Updates:** Multiple PRs from dependabot bot are adjusting dependency versions to address stability and security concerns (e.g., rustls, dompurify, fast-uri, aiohttp, multidict). This reflects ongoing effort in dependency maintenance.
- **Issue Resolution:** No closed issues were updated today, indicating active but still unresolved critical issues requiring follow-up.
## 4. Community Hot Topics
- **#8146 [OPEN] Hosted MCP: explicit 127.0.0.1 endpoint enrollment and private credential-account setup bridge** — Most recently updated 2026-10-20, created by `tom9000`. Addresses a significant gap in hosted-MCP support for local endpoints, directly tied to issues #8147 and core infrastructure challenges. Key need: enable local server hosted-MCP registration with credential-account bearer access.
- **#8136 [OPEN] Proposal: optional hosted-MCP Plazmi extension using declarative auth and egress** — Created 2026-10-13 by `cairn-agent`. References existing declarative extension surfaces for auth/egress, targeting an optional Plazmi companion to reduce vendor logic. Key need: integrated optional hosted-MCP extension via existing auth/egress seams.
## 5. Bugs & Stability
- **Risk: High / Severity: Critical — Hosted-MCP Registration Failure** — Reported in issue #8146 (open) and addressed by open PR #8147 (open). Backed by issue #5998 (upstream context). Key impact: hosted-MCP registration rejects HTTP and IP-literal endpoints; local Connectors cannot use native hosted-MCP registration. Risk of agent inability to use hosted-MCP via native path.
- **Risk: Low / Severity: Moderate — MCP Discovery/Network Policy Constraints** — Open in issue #2077 (needs contract source for `market.near.ai`) and linked to MCP endpoint enrollment challenges. Key impact: dependency on infrastructure for direct on-chain market interaction, increasing agent reliance on host capabilities.
- **Current state:** No reported crashes or regressions for 24h; no fix PRs exist for the above critical issue yet.
## 6. Feature Requests & Roadmap Signals
- **Local MCP Endpoint Enrollment & Credential-Account Support** — Clearly identified by issue #8146 and PR #8147. Predicted to advance in future releases, likely becoming core support for local MCP servers with private credential-account integration.
- **Optional Plazmi Hosted-MCP Extension** — Promised by issue #8136 and proposal intent. Predicted to be integrated as an optional extension, aligned with declarative auth/egress patterns already in the codebase.
- **Market/On-Chain Integration** — Ongoing in issue #2077, awaiting a published contract source. Likely to be addressed in a future release, contingent on architecture stabilization.
## 7. User Feedback Summary
- **Pain Points:** Users face challenges with hosted-MCP integration in local environments due to endpoint enumeration and registration failures, requiring fallback to HTTP APIs (as noted in issue #2077). A core pain point is the inability to use native hosted-MCP registration for local servers without infrastructure access (as detailed in issue #8146).
- **Use Cases:** Users building sovereign agents that operate directly on-chain and interact with on-chain markets, currently reliant on HTTP APIs due to contract and registration constraints. Users requesting supported hosting, credential-account integration, and local endpoint support for direct agent functionality.
- **Satisfaction Level:** Mixed. Users expressing interest in bridging hosted-MCP capabilities for local environments are showing active need; while dependency churn suggests stability concerns, long-term functionality improvements are highlighted.

## 8. Backlog Watch
- **#8146 — Hosted MCP: explicit 127.0.0.1 endpoint enrollment and private credential-account setup bridge (OPEN)** — **Priority: High.** Directly blocks local MCP server hosting and credential-account integration. Currently no fix PR has been filed; maintainer attention needed to resolve registration and credential-account bridging to enable local hosted-MCP support.
- **#2077 — Contract source for market.near.ai (OPEN)** — **Priority: Medium.** This is a long-running request (updated 2026-10-20) awaiting a published contract source for the market.near.ai service, impacting direct on-chain market interaction for agents. Potential to block or influence on-chain agent functionality.

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

⚠️ Summary generation failed.

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
**Date:** 2026-10-21

### 1. Today's Overview
ZeroClaw is experiencing a high volume of active development and issue resolution as it prepares for the v0.8.7 release. With 50 open issues and 50 PRs updated in the last 24 hours, the project is in a "code freeze" or stabilization phase for the upcoming release. The maintainers are aggressively tackling regressions, security hardening, and CI stability, while simultaneously advancing architectural features like transport-neutral goals and Firecrawl integration. The project health appears robust, with a strong focus on closing the gap between the current runtime capabilities and the planned v0.9.0 RPC gateway architecture.

### 2. Releases
**Status:** No new releases detected in the last 24 hours.
*Note:* The project is currently in a "release-v0.8.7" gate phase. The backlog is filled with bugs and tasks specifically targeting this version (e.g., Issue #11839, #11831).

### 3. Project Progress
While no releases were tagged today, significant progress was made in fixing regressions and stabilizing the v0.8.7 build pipeline:
*   **Security Hardening:** PRs #11903 and #11910 were merged to address token validation logic and enforce strict system prompt size budgets (fail-closed behavior).
*   **Plugin Stability:** Several PRs targeted plugin registration, egress handling, and WASM runtime safety to prevent crashes and security bypasses.
*   **CI & Build Optimization:** Workflows were adjusted to handle macOS arm64 memory constraints and reduce release build timeouts.

### 4. Community Hot Topics
The community is actively debating the architectural implications of recent bugs, specifically regarding memory isolation and agent trust boundaries.
*   **RFC: Principal-Based Trust Boundaries (#11914)**
    *   *Link:* [zeroclaw-labs/zeroclaw Issue #11914](https://github.com/zeroclaw-labs/zeroclaw/issues/11914)
    *   *Analysis:* This is the most critical discussion point, arguing that recent memory and context leaks are symptoms of a missing unified access-control layer. It suggests moving toward a principal-based security model.
*   **Memory Recall Injection Leak (#11912)**
    *   *Link:* [zeroclaw-labs/zeroclaw Issue #11912](https://github.com/zeroclaw-labs/zeroclaw/issues/11912)
    *   *Analysis:* A critical bug where shared memory can be injected into unrelated agents, indicating a flaw in the `agent_scoped` recall mechanism.

### 5. Bugs & Stability
**Priority: High (P0/P1)**
*   **Plugin Egress Failures (#11813):** Plugin connections stall when the first resolved address is blackholed, failing to retry alternative addresses.
    *   *Link:* [Issue #11813](https://github.com/zeroclaw-labs/zeroclaw/issues/11813)
*   **System Prompt Budget Bypass (#11908):** Context assembly allows unbounded system prompts, bypassing intended safety limits.
    *   *Link:* [Issue #11908](https://github.com/zeroclaw-labs/zeroclaw/issues/11908) (See PR #11910 for fix)
*   **Slack Status Thread Bug (#11416):** Since v0.8.5, Slack agents no longer show "is thinking..." status in channel threads.
    *   *Link:* [Issue #11416](https://github.com/zeroclaw-labs/zeroclaw/issues/11416)

**Priority: Medium (P2)**
*   **Standalone Channel SOP Handling (#11055):** Channel start SOPs lack live channel tool handles in daemon deployments.
    *   *Link:* [Issue #11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055)
*   **Telegram Transcription Failures (#11601):** Voice transcription errors are not classified correctly, blocking updates.
    *   *Link:* [Issue #11601](https://github.com/zeroclaw-labs/zeroclaw/issues/11601)

### 6. Feature Requests & Roadmap Signals
*   **Transport-Neutral Goals (#11880):** An XL-size PR proposing "Goal V1" to abstract transport layers, signaling a major architectural shift toward multi-transport agent orchestration.
    *   *Link:* [PR #11880](https://github.com/zeroclaw-labs/zeroclaw/pull/11880)
*   **Firecrawl Web Search Provider (#11680):** Integration request for a new web search capability, expanding the tool ecosystem.
    *   *Link:* [PR #11680](https://github.com/zeroclaw-labs/zeroclaw/pull/11680)
*   **Telegram Rich Messages (#11862):** A feature to send formatted messages (tables, quotes) via the new Bot API 10.1 capabilities.
    *   *Link:* [PR #11862](https://github.com/zeroclaw-labs/zeroclaw/pull/11862)

### 7. User Feedback Summary
Users are expressing high dissatisfaction with **memory isolation** and **context management**. The feedback highlights a recurring pattern where cross-agent memory leaks and unbounded context prompts undermine the security model. Additionally, users are frustrated with **plugin reliability**; specifically, the inability to uninstall loaded plugins correctly (Issue #11357) and the lack of visibility into who is sending messages via plugins (Issue #11821). The operator UX around CLI configuration and daemon socket paths (Issue #11818) is also cited as a friction point for deep directory structures.

### 8. Backlog Watch
Several long-standing issues require maintainer attention:
*   **Configurable Memory Consolidation (#11657):** Request to allow users to specify where per-turn consolidation writes data (currently hardcoded to Core).
    *   *Link:* [Issue #11657](https://github.com/zeroclaw-labs/zeroclaw/issues/11657)
*   **Stall Watchdog Defaults (#10168):** A feature request to enable the stall timeout watchdog by default rather than leaving it disabled.
    *   *Link:* [Issue #10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168)
*   **Telegram API 10.1 Rich Messages (#8415):** An older enhancement request to implement rich messages in Telegram.
    *   *Link:* [Issue #8415](https://github.com/zeroclaw-labs/zeroclaw/issues/8415)

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*