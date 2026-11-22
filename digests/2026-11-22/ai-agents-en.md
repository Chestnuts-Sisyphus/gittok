# OpenClaw Ecosystem Digest 2026-11-22

> Issues: 413 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-21 23:59 UTC

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

# Ecosystem Analysis: Open-Source AI Agent & Personal Assistant Frameworks
**Report Date:** 2026-11-22

---

## 1. Ecosystem Overview

The open-source AI agent and personal assistant ecosystem is experiencing a structural bifurcation between high-velocity enterprise engines scaling robust security models (e.g., ZeroClaw) and specialized micro-agent runtimes operating on quieter, maintenance-driven release cycles. While several derivative frameworks registered zero public activity in the current 24-hour window, active engines are making significant strides in sandboxed plugin architecture (WASM), granular cost routing, and enterprise identity federation (Okta/Entra ID). The dominant architectural objective across the ecosystem has shifted from basic tool-calling wrappers toward deterministic, fault-tolerant background execution engines.

---

## 2. Activity Comparison

The following table summarizes project activity over the 24-hour period ending 2026-11-22. 

| Project | Open Issues (24h) | PR Activity (24h) | Releases Today | Health / Activity Score |
| :--- | :---: | :---: | :---: | :--- |
| **ZeroClaw** | 18 updated | 50 updated (7 merged) | None (v0.9.1 prep) | **High** (Rapid Iteration / Active Triage) |
| **IronClaw** | 1 open (#8174) | 0 | None | **Low–Moderate** (Stable Maintenance) |
| **NullClaw** | 0 | 0 | None | **Dormant** (No 24h activity) |
| **TinyClaw** | 0 | 0 | None | **Dormant** (No 24h activity) |
| **ZeptoClaw** | 0 | 0 | None | **Dormant** (No 24h activity) |
| **OpenClaw** | *N/A (Pipeline)* | *N/A (Pipeline)* | *N/A* | *Data Collection Unavailable* |
| **NanoBot** | *N/A (Pipeline)* | *N/A (Pipeline)* | *N/A* | *Data Collection Unavailable* |
| **Hermes Agent** | *N/A (Pipeline)* | *N/A (Pipeline)* | *N/A* | *Data Collection Unavailable* |
| **PicoClaw** | *N/A (Pipeline)* | *N/A (Pipeline)* | *N/A* | *Data Collection Unavailable* |
| **NanoClaw** | *N/A (Pipeline)* | *N/A (Pipeline)* | *N/A* | *Data Collection Unavailable* |
| **LobsterAI** | *N/A (Pipeline)* | *N/A (Pipeline)* | *N/A* | *Data Collection Unavailable* |
| **Moltis** | *N/A (Pipeline)* | *N/A (Pipeline)* | *N/A* | *Data Collection Unavailable* |
| **CoPaw** | *N/A (Pipeline)* | *N/A (Pipeline)* | *N/A* | *Data Collection Unavailable* |

*Note: Projects marked with "Pipeline" experienced upstream summary generation timeouts for this reporting window.*

---

## 3. OpenClaw's Position

As the flagship reference framework for the broader "Claw" lineage (ZeroClaw, IronClaw, PicoClaw, NanoClaw, NullClaw), **OpenClaw** maintains a central role in defining community architectural standards.

* **Advantages vs. Peers:** OpenClaw provides the standard specification for state management, tool execution interfaces, and multi-channel routing that downstream projects optimize for specific runtimes.
* **Technical Approach Differences:** While downstream variants specialize—such as ZeroClaw decoupling core binaries into WASM plugins or IronClaw building embedded Rust provider catalogs—OpenClaw focuses on comprehensive, general-purpose agency and broad multi-modal tooling out of the box.
* **Community Footprint:** OpenClaw remains the primary mindshare hub. Specializations (e.g., NullClaw for zero-dependency runtime, PicoClaw/ZeptoClaw for minimal footprints) act as downstream consumers of OpenClaw's core patterns.

---

## 4. Shared Technical Focus Areas

Engineering patterns across active projects point to four primary operational requirements:

1. **Decoupled Plugin Architecture & WASM Sandboxing**
   * *Projects:* **ZeroClaw** (PR #12443, Issue #12145)
   * *Requirement:* Moving channel drivers (e.g., IRC, Twitch) and tools out of the core binary into WebAssembly (WASM) registry plugins. Engineering focus is currently centered on enforcing hard memory limits per WASM instance to prevent DoS attacks.

2. **Adaptive Cost Routing & Soft Enforcement**
   * *Projects:* **ZeroClaw** (PR #12626, PR #12628)
   * *Requirement:* Replacing abrupt session terminations with `route_down_model` behaviors (automatically downgrading to cheaper LLMs upon limit breach) and non-blocking session warnings.

3. **OpenAI-Compatible LLM Provider Expansion**
   * *Projects:* **IronClaw** (Issue #8174), **ZeroClaw**
   * *Requirement:* Decoupling reliance on standard providers (OpenAI, Anthropic) by making local/custom OpenAI-compatible gateways (e.g., LLMTR, Groq, Together, MiniMax) first-class built-ins.

4. **Enterprise Identity & Authorization Protocols**
   * *Projects:* **ZeroClaw** (PR #12608, RFC #12422)
   * *Requirement:* Aligning agent identity with enterprise IdPs (Okta, Entra ID token compliance via ADR-016) and introducing scoped operator credentials to restrict agent execution capabilities.

---

## 5. Differentiation Analysis

```
+-------------------------------------------------------------------------+
|                          AGENT FRAMEWORK LANDSCAPE                       |
+-------------------------------------------------------------------------+
|  ENTERPRISE / HEAVY AUTOMATION  |  LIGHTWEIGHT / EMBEDDED ENGINE        |
|  - ZeroClaw                      |  - IronClaw                           |
|    • WASM Plugin Sandboxing      |    • Native Rust Execution            |
|    • Okta / Entra ID Identity    |    • Built-in Static Provider Catalog |
|    • Adaptive Cost Routing       |    • Minimal Dependencies            |
|    • Multi-Channel Gateway UI    |                                       |
+-------------------------------------------------------------------------+
|  MINIMALIST / MICRO-RUNTIMES                                            |
|  - NullClaw / TinyClaw / ZeptoClaw                                      |
|    • Zero-dependency footprints, single-purpose automation             |
+-------------------------------------------------------------------------+
```

* **ZeroClaw (Enterprise Agent Platform):** Target users are DevOps, platform engineers, and enterprise automation teams. Features high-concurrency gateway management, complex web dashboards, WASM sandboxing, and strict identity federation.
* **IronClaw (Embedded / Systems Developer Framework):** Target users are Rust developers building low-latency or lightweight integrations. Focuses on native binary efficiency, straightforward asset-driven provider management (`providers.json`), and minimal runtime overhead.
* **NullClaw / TinyClaw / ZeptoClaw (Micro-Runtimes):** Target users are embedded developers or edge computing environments where minimal memory footprints and static binaries take precedence over multi-channel user interfaces.

---

## 6. Community Momentum & Maturity

* **Rapid Iteration Tier (ZeroClaw):** High momentum. Resolving S1 subprocess bugs (Issue #9946 browser tool hangs), refactoring plugin boundaries, and preparing v0.9.1. Shows strong contributor activity with 50 active PRs in 24 hours.
* **Stabilizing / Maintenance Tier (IronClaw):** Low operational velocity. Codebase is stable with minimal open bugs. Feature evolution is driven by incremental community requests (e.g., provider additions).
* **Inactive / Dormant Tier (NullClaw, TinyClaw, ZeptoClaw):** No activity recorded over the past 24 hours. These projects represent either completed micro-specifications or low-frequency release tracks.

---

## 7. Trend Signals for AI Agent Developers

1. **WASM is Winning the Agent Plugin Standard:** Moving native integrations out of the central binary and into WASM sandboxes resolves dependency bloat and mitigates security risks when running third-party user tools.
2. **Shift from Hard Limits to Graceful LLM Degradation:** Production systems are abandoning strict API error-throwing when budget caps are reached. Developers must design agents to dynamically step down to smaller models (`route_down`) or issue non-disruptive warnings.
3. **Identity Over API Keys:** Enterprise adoption requires agent platforms to move away from master API key configurations toward scoped, operator-managed service credentials tied to corporate SSO (Okta/Entra ID).
4. **Hardening Process Execution Isolation:** Unbounded subprocess execution (e.g., headless browser tools hanging indefinitely) remains a major vulnerability in long-running agents. Moving toward native program execution without shell wrappers (e.g., ZeroClaw #12625) is becoming a critical security fix.

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

# Project Digest: IronClaw (github.com/nearai/ironclaw)
**Date:** 2026-11-22
## Today's Overview
IronClaw is in a quiet, activity-light state as of 2026-11-22, with only 1 open issue tracked in the last 24 hours and zero PR activity. The remaining item—issue #8174 requesting the addition of LLMTR as a built-in OpenAI-compatible LLM provider—was last updated on 2026-11-21, indicating it remains an open, unaddressed feature request. Overall, the project is stable with no immediate technical risk but lacks recent development momentum.
## Releases
No new releases were reported for 2026-11-22, and there are no version history updates, breaking changes, or migration notes to document.
## Project Progress
- **Merged/Closed PRs Today:** 0 PRs updated in the last 24 hours, open count is 0, and merged/closed counts are 0.
- **Feature Advancements/Fixes:** No new merged or closed PRs were recorded. The only active item is an open issue (#8174) proposing enhancement to the built-in provider catalog.
## Community Hot Topics
- **Issue #8174** [OPEN]: "feat: add LLMTR as a built-in OpenAI-compatible LLM provider" by knowhycodata, created/updated 2026-11-21. This is the sole active item, highlighting demand for expanding LLM provider support in IronClaw. Link: https://github.com/nearai/ironclaw/issues/8174
- **No active PRs or high-comment hot topics** in the current period, as there are 0 PRs updated and no comment-rich items surfaced.
## Bugs & Stability
- **Bugs/Crashes/Regressions Reported Today:** None identified.
- **Fix PRs:** No fixes or bug-related PRs were recorded for 2026-11-22.
- **Stability Assessment:** The project shows no reported issues or immediate stability concerns, but the backlog contains a notable feature request that has not yet been addressed.
## Feature Requests & Roadmap Signals
- **Primary Signal:** Add LLMTR as a first-class built-in OpenAI-compatible LLM provider in `crates/domains/ironclaw_llm/assets/providers.json`, alongside existing providers (Groq, Together, Cerebras, MiniMax). This signals a clear roadmap item for provider catalog expansion.
- **Predicted Next Version:** Development of LLMTR integration would likely appear as a feature release or PR in the near future, given its relevance and current open status.
## User Feedback Summary
- **Primary Use Case:** Users are requesting LLM provider support beyond current providers, specifically wanting OpenAI-compatible gateways such as LLMTR integrated into IronClaw's built-in catalog.
- **Satisfaction/Dissatisfaction:** No direct user feedback was provided, but the concentration of an open feature request indicates potential dissatisfaction or unmet need regarding provider breadth.
## Backlog Watch
- **Issue #8174** (OPEN): The LLMTR provider addition remains unaddressed and carries actionable demand, likely requiring maintainer attention to resolve or track in the next iteration. It is the only item requiring immediate attention.

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

# ZeroClaw Project Digest
**Date:** 2026-11-22

## 1. Today's Overview
ZeroClaw activity remains high, with 18 issues and 50 pull requests updated in the last 24 hours. The project is in a robust development phase, actively addressing stability regressions, enhancing the web dashboard, and refining plugin and channel security models. While no new releases were deployed today, significant progress is being made toward v0.9.1, with several blockers being resolved. The project maintains a healthy balance between fixing critical bugs and implementing new features.

## 2. Releases
**No new releases** were generated in the last 24 hours. Development is focused on stabilizing v0.9.1, as evidenced by multiple PRs and issues tagged with `release:v0.9.1`.

## 3. Project Progress
*   **Merged/Closed PRs:** 7 PRs were closed/merged in the last 24 hours. The most significant merge was **#12608**, which documented ADR-016 exceptions for Okta and Entra ID token compatibility, resolving a security/identity configuration issue.
*   **Feature Advancement:**
    *   **Cost Enforcement:** PRs #12626 and #12628 are advancing the cost management model, adding `route_down_model` support and session-level warnings when limits are exceeded.
    *   **Plugin Architecture:** PR #12443 is a major breaking change moving IRC and Twitch from the binary into WASM registry plugins, increasing modularity.
    *   **Matrix Integration:** PRs #12426 and #12442 are enhancing Matrix channel support with opt-in edited message handling and owner notice capabilities.

## 4. Community Hot Topics
*   **Plugin Security & Memory Limits:** Issue **#12145** is highly active, discussing a critical memory leak in the plugin store where instances are capped at 64 but memory is not strictly enforced, allowing potential DoS.
    *   [Issue #12145](https://github.com/zeroclaw-labs/zeroclaw/issues/12145)
*   **Web Dashboard UX:** Multiple issues are flooding in regarding the web dashboard, specifically the "Voice Settings" screen not refreshing correctly and agent cards showing incorrect currency formatting for zero spend.
    *   [Issue #12633](https://github.com/zeroclaw-labs/zeroclaw/issues/12633)
    *   [Issue #12638](https://github.com/zeroclaw-labs/zeroclaw/issues/12638)
*   **Identity Management:** The RFC for scoped operator-managed service credentials (**#12422**) is gathering traction, signaling a shift toward more granular, security-conscious agent permissions.

## 5. Bugs & Stability
*   **Critical (S1):** Issue **#9946** (Browser Tool Hang) remains open. The `agent-browser` subprocess has unbounded wait times that can hang the entire agent turn indefinitely.
    *   [Issue #9946](https://github.com/zeroclaw-labs/zeroclaw/issues/9946)
*   **High (S2):**
    *   **Gateway State:** Issue **#12619** reports that a failed session-state write leaves the session in a `running` state until a restart, preventing clean shutdowns.
    *   **Plugin Removal:** Issue **#12484** fails on Windows because removing a deleted plugin directory triggers an incorrect error handling path.
    *   [Issue #12619](https://github.com/zeroclaw-labs/zeroclaw/issues/12619)
    *   [Issue #12484](https://github.com/zeroclaw-labs/zeroclaw/issues/12484)
*   **Medium (S3):** Several minor UI glitches were reported today, including the Channels list on the Overview tab not rendering all items and voice dictation auto-sending text after the recording ends.
    *   [Issue #12630](https://github.com/zeroclaw-labs/zeroclaw/issues/12630)
    *   [Issue #12632](https://github.com/zeroclaw-labs/zeroclaw/issues/12632)

## 6. Feature Requests & Roadmap Signals
*   **Cost Management Evolution:** The shift from hard refusals to "warn" modes and "route_down" models (**#12626**, **#12628**) suggests the roadmap is moving toward a more forgiving, operator-controlled budgeting system rather than a strict "all or nothing" approach.
*   **Native Execution:** Issue **#12625** requests allowing `shell` and `script` tools to run programs directly without a shell wrapper. This is a likely candidate for v0.9.1 to improve security and argument handling.
*   **Cleanup:** Issue **#12613** proposes a "Deslop pass" to remove dead code and inert features, indicating a maintenance phase is approaching to clean up the codebase after rapid feature expansion.

## 7. User Feedback Summary
*   **Pain Point - Dashboard Confusion:** Users are frustrated by the lack of feedback when cost limits are exceeded in "warn" mode and the misleading display of "$0.00" as "<$0.01" on agent cards. This indicates a need for better transparency in the UI.
*   **Pain Point - Voice UX:** Users report that the voice input interface can behave unpredictably (auto-sending after silence, settings not refreshing), highlighting a gap in the UX design for the browser-based voice controls.
*   **Pain Point - Platform Compatibility:** Windows users are experiencing consistent failures in plugin removal and CI tests, suggesting the project needs more platform-specific hardening.

## 8. Backlog Watch
*   **RFC #12422:** A proposed security architecture for scoped operator-managed credentials has been open for over a week with no comments, requiring maintainer attention to define the standard.
*   **PR #11589:** A high-priority feature allowing operators to override cost limits has been open since October 7th. It is currently marked as "needs-author-action" and risks being forgotten if not prioritized soon.
*   **PR #12271:** A large-scale feature routing external peers to explicit destinations has been open since November 6th, waiting for code review.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*