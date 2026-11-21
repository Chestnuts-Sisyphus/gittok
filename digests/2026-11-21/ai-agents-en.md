# OpenClaw Ecosystem Digest 2026-11-21

> Issues: 324 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-21 00:59 UTC

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

# Open-Source AI Agent & Personal Assistant Ecosystem Report (2026-11-21)

---

## 1. Ecosystem Overview
The open-source personal AI assistant and agent ecosystem is undergoing a phase of architectural consolidation and governance recalibration. A significant portion of the landscape continues to be defined by the lightweight, edge-oriented "*Claw" family of runtimes, though maintainer burnout and backlog latency are prompting community-driven forks in major projects like PicoClaw. Concurrently, active development across specialized agent orchestrators (such as Moltis) is shifting toward supporting next-generation reasoning model configurations and hardening local execution tools. Overall, daily development velocity shows high polarization: mature edge runtimes face maintenance bottlenecks, while niche orchestrators execute highly targeted protocol upgrades.

---

## 2. Activity Comparison

| Project | Active/Open Issues (24h) | Merged/Closed PRs (24h) | Releases (24h) | Health & Momentum Status |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | *N/A (Data Failed)* | *N/A (Data Failed)* | None | **Core Baseline** (Ecosystem reference architecture) |
| **PicoClaw** | 3 | 7 | None | **At-Risk / Maintenance** (Community fork active) |
| **Moltis** | 1 | 1 | None | **Stable / Moderate** (Targeted feature PRs) |
| **NullClaw** | 0 | 0 | None | **Quiet / Dormant** (No 24h activity) |
| **IronClaw** | 0 | 0 | None | **Quiet / Dormant** (No 24h activity) |
| **TinyClaw** | 0 | 0 | None | **Quiet / Dormant** (No 24h activity) |
| **ZeptoClaw** | 0 | 0 | None | **Quiet / Dormant** (No 24h activity) |
| **NanoBot** | *N/A (Data Failed)* | *N/A (Data Failed)* | None | Unknown |
| **Hermes Agent** | *N/A (Data Failed)* | *N/A (Data Failed)* | None | Unknown |
| **NanoClaw** | *N/A (Data Failed)* | *N/A (Data Failed)* | None | Unknown |
| **LobsterAI** | *N/A (Data Failed)* | *N/A (Data Failed)* | None | Unknown |
| **CoPaw** | *N/A (Data Failed)* | *N/A (Data Failed)* | None | Unknown |
| **ZeroClaw** | *N/A (Data Failed)* | *N/A (Data Failed)* | None | Unknown |

---

## 3. OpenClaw's Position
OpenClaw remains the primary reference architecture and standard-bearer for the lightweight agent engine paradigm. Compared to its downstream spin-offs (PicoClaw, Micro/Nano variants), OpenClaw represents the full-featured specifications that smaller implementations strive to emulate or optimize for embedded environments. 

However, as seen in derivative projects like PicoClaw, maintenance lags and unmerged backlog items are causing community friction and spawning forks (e.g., PicoClaw Issue #3417). OpenClaw's key competitive advantage lies in architectural stability and ecosystem brand recognition; its challenge will be maintaining sufficient release velocity to prevent the ecosystem from fragmenting into community-maintained forks.

---

## 4. Shared Technical Focus Areas

Across the active projects in today's snapshot, several critical technical requirements are surfacing:

*   **Next-Gen Reasoning Parameter Standardization (`Moltis`):** Integration of advanced reasoning parameters (e.g., carrying `reasoning_effort` across provider clones and serializing GPT-5/Codex requests while preserving encrypted reasoning tokens) is becoming a core requirement for agent runtimes interfacing with frontier models.
*   **Upstream Provider Identifier Case-Sensitivity (`PicoClaw`):** Issues in configuration validation (Issue #3454) show a growing requirement to handle exact casing for upstream model namespaces (e.g., `ACME/gpt-4o-mini`) rather than forcing uniform lowercasing, preventing gateway routing failures.
*   **Tool Execution Accuracy vs. Schema Fidelity (`Moltis`):** Discrepancies between tool schema descriptions (e.g., `command` described as shell command) and actual execution mechanics (e.g., non-shell paired-node execution in Issue #1324) point to an ecosystem-wide need for strict execution fidelity in agent-to-environment interactions.

---

## 5. Differentiation Analysis

```
+-----------------------------------------------------------------------------+
|                            AGENT ECOSYSTEM TAXONOMY                         |
+--------------------------------------------------+--------------------------+
|  MICRO RUNTIMES / GATEWAYS                       | FULL ORCHESTRATORS       |
|  (PicoClaw, OpenClaw, ZeroClaw, ZeptoClaw)       | (Moltis, Hermes)         |
+--------------------------------------------------+--------------------------+
| • Resource-constrained / Edge deployment         | • Advanced tool execution|
| • Focus on configuration validation & routing    | • Deep provider tuning   |
| • Lightweight gateway integrations               | • Multi-node / Paired    |
| • Statically compiled / low memory footprint     |   node execution         |
+--------------------------------------------------+--------------------------+
```

*   **PicoClaw & Lightweight Runtimes:** Targeted at developers needing minimal resource footprints and embedded gateway routing. Feature focus centers on client UI validation, SDK dependency maintenance (Azure, Line, SQLite), and gateway connectivity.
*   **Moltis & Full Orchestration Runtimes:** Targeted at complex workflow automation. Feature focus centers on deep API protocol integration (Codex reasoning effort handling, stateful turn serialization) and multi-node execution contexts.

---

## 6. Community Momentum & Maturity

*   **Tier 1: High Maintenance Priority & Community Transition (PicoClaw)**
    *   *Status:* Processing backlogged PRs from early 2026 while facing governance friction. High user demand paired with maintainer latency has triggered active community forks.
*   **Tier 2: Incremental & Feature-Targeted Development (Moltis)**
    *   *Status:* Focused iteration. Demonstrates active alignment with bleeding-edge model specs (GPT-5 Codex reasoning support) while maintaining low noise in public issue trackers.
*   **Tier 3: Quiet / Dormant Phase (NullClaw, IronClaw, TinyClaw, ZeptoClaw)**
    *   *Status:* Zero 24-hour activity. Reflects either highly stable micro-codebases requiring minimal daily intervention or transient interest cycles typical of hyper-lightweight frameworks.

---

## 7. Trend Signals for AI Agent Developers

1.  **First-Class Support for Model Reasoning Controls:** Developers must design agent platforms to ingest, pass, and preserve reasoning-specific telemetry (`reasoning_effort`, encrypted reasoning state) across multi-turn provider calls.
2.  **Low Friction Maintenance Thresholds:** Open-source agent developers expect rapid PR merging and clear roadmap signals. In fast-moving sectors, maintainer inactivity quickly leads to hard community forks rather than patient waiting periods.
3.  **Strict Schema-to-Runtime Alignment:** As LLMs become more reliant on precise tool documentation, discrepancies between declared schema types (e.g., standard shell execution vs. direct binary invocation) directly degrade agent performance, making schema verification a key quality control metric.

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

**PicoClaw Project Digest: 2026-11-21**

**1. Today's Overview**
Activity on the PicoClaw repository remained steady with 3 open issues and 7 pull requests closed or merged over the last 24 hours. The project appears to be in a maintenance phase, focusing on dependency updates and bug resolution rather than major feature releases. The community is actively debating the project's future maintenance status, with a fork gaining traction.

**2. Releases**
No new releases were generated today.

**3. Project Progress**
Seven pull requests were processed, primarily consisting of dependency bumps from Dependabot. Notably, PR #1559, #1560, and #1555 were re-closed/merged after being left in a stale state since March 2026. These merges address a cluster of earlier bug fixes related to routing and merge logic, bringing those improvements back into the active codebase.

**4. Community Hot Topics**
The most significant discussion involves the project's future. User `afjcjsbx` initiated a fork (Issue #3417) due to perceived lack of maintenance, highlighting that the repository is currently "unmaintained" despite high community demand. Separately, Issue #3454 highlights a configuration validation bug where the tool incorrectly suggests lowercasing provider prefixes for upstream models (e.g., `ACME/gpt-4o-mini`), breaking case-sensitive API integrations.

*   [Issue #3417: Active Fork & Continued Maintenance](https://github.com/sipeed/picoclaw/issues/3417)
*   [Issue #3454: Model identifier validation suggests lowercasing](https://github.com/sipeed/picoclaw/issues/3454)

**5. Bugs & Stability**
*   **Gateway UI Availability (Issue #3461 - CLOSED):** A user reported that the gateway service fails to start via the web UI when configured with "no-api-key" providers, though it functions correctly from the console. This specific bug has been resolved.
*   **Model Case Sensitivity (Issue #3454 - OPEN):** The UI validation logic forces lowercase conversion on provider prefixes that are actually valid upstream namespaces. This causes "Fix" buttons to corrupt configuration for providers like `ACME` that require exact casing.

**6. Feature Requests & Roadmap Signals**
*   **Configuration Validation UX:** The validation logic in the model edit sheet (Issue #3454) needs refinement to distinguish between PicoClaw's internal providers and upstream model namespaces.
*   **Maintenance Continuity:** The community is signaling a strong need for the official maintainers to either restart active development or explicitly endorse the fork to ensure the project's longevity.

**7. User Feedback Summary**
Users are expressing concern over the project's "unmaintained" status, noting that despite the lack of activity, there is significant demand. Users appreciate the bug fixes being merged from the backlog (PR #1559-1555) but are frustrated by validation logic that breaks their setups with specific providers. The feedback indicates a desire for the core team to address the "stale" label on issues and clarify the maintenance roadmap.

**8. Backlog Watch**
*   **Stale Dependency Updates:** Several dependency bumps (Line SDK, Azure SDK, SQLite) were closed recently. While technically merged, these represent long-running maintenance tasks that should be verified for compatibility.
*   **Legacy Fixes:** The re-merging of PRs #1559, #1560, and #1555 indicates a backlog of fixes from March that were previously lost or overlooked and are now being integrated.

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest: 2026-11-21
## Today's Overview
Moltis is in a quiet, stable activity state over the past 24 hours, with only one active issue and one merged/closed pull request recorded. The dominant activity is a bug report regarding the `command` parameter in the exec tool, indicating a mismatch between the tool's schema description and the actual execution behavior for paired-node exec. No new releases were shipped, and no major features or bug fixes were initiated or addressed during this window. Overall, the project is maintaining operational stability with limited momentum, leaning heavily on issue tracking and PR closure for maintenance rather than feature development.
## Releases
No new releases were identified for 2026-11-21. There are no version-specific change details, breaking changes, or migration notes to report, as no release announcements or version updates were available in the provided data.
## Project Progress
- **Merged/closed PRs today:** 1 closed pull request (#1005, "feat(openai-codex): add reasoning effort support"). This PR was updated on 2026-11-20 and addresses carrying `reasoning_effort` through cloned Codex provider instances and serializing the configured GPT-5 Codex effort in Responses API requests, with special handling to preserve encrypted reasoning content for existing Codex follow-up turns.
- **Feature/bug advancements:** The only activity is the closed Codex reasoning effort enhancement, which appears to align with resolving a broader need for more robust handling of reasoning-related tooling in Moltis.
## Community Hot Topics
- **Issue #1324** (OPEN, active, updated 2026-11-20): A bug report highlighting that the exec tool `command` parameter is described as a "shell command" but paired-node exec does not use a shell. This indicates a user-specific configuration/behavior discrepancy affecting command execution in the Moltis platform.
- **PR #1005** (CLOSED): The Codex reasoning effort support PR has been updated recently and closed, likely reflecting community interest in enhancing Codex provider support within Moltis.
Underlying needs highlighted by these items: users face a mismatch between tool schema documentation and practical execution behavior for shell-based commands, while there is active demand for reasoning effort support across Codex providers. Both themes point to enhancement of tool schema accuracy and provider-specific reasoning handling as likely next priorities.
## Bugs & Stability
- **Issue #1324 (Bug):** The exec tool `command` parameter is incorrectly documented as a "shell command" while paired-node exec does not use a shell. Created 2026-11-20, not yet fixed. This is a functional mismatch that could lead to unexpected command execution behavior or misconfiguration, and it is the only reported issue with activity in the last 24h.
- No other bugs, crashes, or regressions were reported or noted in the provided data.
- **Stability Assessment:** Moltis is stable with no active incident coverage, but the reported bug underscores a potential doc/schema accuracy gap that may require maintainer attention to correct the description or adjust paired-node exec behavior.
## Feature Requests & Roadmap Signals
- **Reasoning effort support for Codex providers:** A closed PR (#1005) explicitly signals that adding reasoning effort support to the Codex provider is a tracked, implemented feature, indicating it may be included in future releases or at least addressed in a near-term update.
- **Shell command execution configuration:** The reported issue implies a need for clearer documentation or support for paired-node exec with shell command execution, which could be a feature or refinement for tool schema accuracy.
- **General tool schema correctness:** Given the exec tool mismatch, a possible roadmap signal is improving schema descriptions and alignment between tool documentation and actual execution behavior across Moltis tools.
## User Feedback Summary
- **Primary Pain Point:** Users are reporting confusion between how the exec tool describes its `command` parameter and how paired-node exec performs execution, indicating a usability issue around tool documentation accuracy.
- **Use Case:** This likely relates to users trying to use shell commands via the exec tool in a way they expect or have configured, and the mismatch may cause misbehavior or confusion during usage.
- **Satisfaction/Dissatisfaction:** There is no explicit satisfaction data, but the issue activity suggests active dissatisfaction or incompatibility with the current tool description, with no resolution indicated in the provided data.
## Backlog Watch
- **Issue #1324 (Exec Tool Shell Mismatch):** An open bug report about the exec tool `command` parameter description being inconsistent with paired-node exec behavior. This is a clear priority item requiring maintainer attention to correct the documentation or implementation to resolve the user experience.
- **PR #1005 (Codex Reasoning Effort):** A closed, recently updated PR representing a feature that may have implications for long-term improvement, but no ongoing backlog items requiring active maintainer attention were noted beyond this issue.

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

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*