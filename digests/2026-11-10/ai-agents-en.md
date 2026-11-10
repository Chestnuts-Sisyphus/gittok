# OpenClaw Ecosystem Digest 2026-11-10

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-10 02:27 UTC

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

# Cross-Project Ecosystem Report: Personal AI Agents & Assistants
**Date:** 2026-11-10
**Source Data:** Daily Community Digests (11 Projects)

## 1. Ecosystem Overview
The personal AI agent ecosystem is currently in a phase of **consolidation and integration refinement** rather than rapid feature expansion. With seven out of eleven projects showing low daily activity or no new releases, the sector is optimizing for stability, provider compatibility, and user experience corrections over net-new capabilities. A significant cross-project trend is the expansion of **OpenAI-compatible provider support**, with multiple projects independently integrating new compute services like Runcrate. While core agent logic remains stable, community attention has shifted toward resolving edge-case bugs in skill management, model selection UIs, and non-standard hardware environments (e.g., Termux/NVIDIA).

## 2. Activity Comparison

| Project | Issues (New/Updated) | PRs (New/Updated) | Releases | Health Score* |
| :--- | :---: | :---: | :---: | :---: |
| **PicoClaw** | 0 | 4 (1 Merged) | None | 🟢 Stable/Active |
| **Moltis** | 1 | 1 | None | 🟡 Moderate/Low |
| **OpenClaw** | N/A (Data Missing) | N/A (Data Missing) | N/A | ⚪ Data Unavailable |
| **NanoBot** | N/A (Data Missing) | N/A (Data Missing) | N/A | ⚪ Data Unavailable |
| **Hermes Agent** | N/A (Data Missing) | N/A (Data Missing) | N/A | ⚪ Data Unavailable |
| **NanoClaw** | N/A (Data Missing) | N/A (Data Missing) | N/A | ⚪ Data Unavailable |
| **LobsterAI** | N/A (Data Missing) | N/A (Data Missing) | N/A | ⚪ Data Unavailable |
| **ZeroClaw** | N/A (Data Missing) | N/A (Data Missing) | N/A | ⚪ Data Unavailable |
| **CoPaw** | N/A (Data Missing) | N/A (Data Missing) | N/A | ⚪ Data Unavailable |
| **NullClaw** | 0 | 0 | None | 🔴 Inactive |
| **IronClaw** | 0 | 0 | None | 🔴 Inactive |
| **TinyClaw** | 0 | 0 | None | 🔴 Inactive |
| **ZeptoClaw** | 0 | 0 | None | 🔴 Inactive |

*\*Health Score is qualitative based on visible activity. "Data Unavailable" indicates summary generation failure, not necessarily inactivity.*

## 3. OpenClaw's Position
*Note: Specific metrics for OpenClaw are unavailable due to summary generation failures. Analysis below is based on its designation as the "core reference" and comparative context from active peers.*

*   **Advantages vs. Peers:** As the core reference, OpenClaw likely establishes the de facto standards for the "Claw" ecosystem. Its primary advantage lies in **maturity and ecosystem dominance**; while projects like PicoClaw and Moltis are refining specific integrations, they often follow patterns established by core frameworks.
*   **Technical Approach Differences:** While peers are focusing on backend provider headers (PicoClaw) and UI deduplication (Moltis), OpenClaw’s position suggests it may be further along in abstracting these concerns. The fact that both PicoClaw and Moltis are independently adding **Runcrate** suggests OpenClaw may have either already integrated it or is the benchmark for how such providers are natively supported.
*   **Community Size Comparison:** Without explicit star/contributor counts, OpenClaw likely commands the largest contributor base. The "summary generation failure" for major active projects (NanoBot, Hermes) might indicate **scaling issues** in data pipelines or higher volume of noise in their feeds, whereas PicoClaw and Moltis have more manageable, focused activity streams.

## 4. Shared Technical Focus Areas
Despite different codebases, three distinct technical requirements are emerging across multiple active projects:

1.  **OpenAI-Compatible Provider Expansion:**
    *   *Observed in:* **PicoClaw** (PR #3448 Merged), **Moltis** (PR #1323 Open).
    *   *Specific Need:* Integration of **Runcrate** GPU services. This indicates a market shift away from direct API keys to specialized/commodity GPU compute providers that speak the OpenAI dialect.
2.  **Deduplication and State Management:**
    *   *Observed in:* **PicoClaw** (PR #3463 - Skill names), **Moltis** (Issue #1322 - Model picker).
    *   *Specific Need:* Users are encountering state conflicts where unique entities (skills or models with different reasoning efforts) are being misidentified as duplicates due to shallow metadata matching. Both projects require deeper uniqueness constraints beyond simple name matching.
3.  **API Compliance and Attribution:**
    *   *Observed in:* **PicoClaw** (PR #3466 - Perplexity headers).
    *   *Specific Need:* Ensuring bot traffic is properly identified via headers (e.g., `X-Pplx-Integration`) to maintain access to third-party search APIs. This may soon become a standard requirement for all web-tool-enabled agents.

## 5. Differentiation Analysis

| Dimension | PicoClaw | Moltis | Inactive/Unknown Peers |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | **Skill Management & Hardware Compatibility** | **Model Selection UX & Provider Breadth** | Varies |
| **Target User** | Developers running agents on edge/non-standard hardware (Termux, NVIDIA) | Users relying on Desktop/Local Daemon apps for model switching | N/A |
| **Technical Architecture** | Low-level integration with OS shells and hardware drivers | High-level UI/daemon logic for model representation | N/A |
| **Key Differentiator** | Fixes "latent" bugs in skill installation logic; deeper hardware affinity. | Fixes "UX" friction in model picking; table-driven provider expansion. | N/A |

*   **PicoClaw** is differentiating by addressing **infrastructure resilience** (Termux/NVIDIA) and strict skill identity validation.
*   **Moltis** is differentiating by polishing the **human-computer interface** (deduplicating reasoning models in the UI) to reduce cognitive load.

## 6. Community Momentum & Maturity

*   **Tier 1: Active Iteration (Refinement Phase)**
    *   **PicoClaw:** Highest visible velocity. Merging provider support and actively debugging critical skill-management logic. It is in a "Polish" phase, preparing for broader hardware adoption.
    *   **Moltis:** Steady maintenance. Addressing specific UX bugs and expanding provider tables. It is stable but not releasing new versions, suggesting a focus on bug-fixing over feature drops.
*   **Tier 2: Data Obscured (Potential High Activity)**
    *   **OpenClaw, NanoBot, Hermes Agent, etc.:** The failure to generate summaries suggests either massive activity volume or pipeline issues. Given OpenClaw's status as the "core reference," it is likely still the most powerful driver in the space, even if daily churn appears low from a summary perspective.
*   **Tier 3: Dormant/Stable**
    *   **NullClaw, IronClaw, TinyClaw, ZeptoClaw:** Zero activity for 24 hours. These projects may be in long-term maintenance, waiting for core dependencies to stabilize, or have paused development.

## 7. Trend Signals
For AI agent developers, the following trends are extracted from the community data:

1.  **The Rise of Commodity GPU Brokers:** The independent addition of **Runcrate** in both PicoClaw and Moltis signals that users are moving away from single-provider lock-in (e.g., just OpenAI or Anthropic). Agents must support a broader table of OpenAI-compatible endpoints, including specialized GPU cloud providers.
2.  **Strict Entity Resolution is Critical:** The focus on **Skill Deduplication** (PicoClaw) and **Model Picker Deduplication** (Moltis) highlights a growing user intuition that "unique function ≠ unique name." Developers must move beyond string-matching for IDs and implement hash-based or content-based unique identifiers for skills and model variants.
3.  **Web Tool Compliance:** The requirement to add **Perplexity headers** suggests that SaaS providers (like search engines) will increasingly gate access based on proper bot identification. Built-in, automatic attribution headers will be a necessary feature in the next wave of agent releases.
4.  **Edge Hardware Fragmentation:** The explicit focus on **Termux ** and **NVIDIA** models in PicoClaw indicates that the "local agent" market is expanding beyond standard x86 Linux servers to include ARM-based and mobile/desktop hybrid environments. Robust shell compatibility is becoming a non-negotiable feature for "personal" AI assistants.

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

# PicoClaw Project Digest
**Date:** 2026-11-10
**Repository:** sipeed/picoclaw

---

### 1. Today's Overview
PicoClaw is currently in a maintenance and refinement phase with low daily velocity. The project saw no new issues opened or resolved, and no new releases were published. Activity is concentrated in Pull Requests, with 4 updates, 1 merged/closed, and 3 currently open. The recent updates focus on stability improvements regarding skill management and integration headers, suggesting the project is optimizing existing capabilities rather than expanding scope.

### 2. Releases
**No new releases.** The last release occurred prior to the 24-hour reporting window.

### 3. Project Progress
**1 PR Merged/Closed (PR #3448)**
The project advanced the ecosystem by adding **Runcrate** as a first-class OpenAI-compatible provider. This integration allows users to access Runcrate's GPU pricing services via the `runcrate/` prefix, following the recent additions of Novita and NEAR AI Cloud. This change improves interoperability for users seeking alternative compute resources.

### 4. Community Hot Topics
The current focus is on **stability fixes** and **integration compliance**.
*   **[OPEN] fix(skills): deduplicate installed skills per root, not by frontmatter name** ([PR #3463](https://github.com/sipeed/picoclaw/pull/3463))
    *   **Analysis:** This PR addresses a critical logic flaw in the `picoclaw skills install` command and the agent's `install_skill` tool. Currently, the system fails to distinguish between skills with identical frontmatter names but different content/locations. This prevents users from installing multiple distinct skills that happen to share the same name.
*   **[OPEN] fix(nvidia model id termux shell)** ([PR #3455](https://github.com/sipeed/picoclaw/pull/3455))
    *   **Analysis:** This PR targets compatibility issues within the Termux environment on NVIDIA hardware. While currently marked as stale, it highlights a persistent challenge for users running PicoClaw on non-standard Linux environments (Termux).
*   **[OPEN] feat(tools): send X-Pplx-Integration header on Perplexity web search** ([PR #3466](https://github.com/sipeed/picoclaw/pull/3466))
    *   **Analysis:** This feature request aims to add specific attribution headers to Perplexity web search requests. This suggests an effort to ensure compliance with Perplexity's API terms of service and to properly identify the client source.

### 5. Bugs & Stability
*   **Skill Installation Conflicts:** The primary stability concern is the inability to install multiple skills with the same name. This is a regression or latent bug where the validation logic fails to account for distinct skills sharing metadata names. The fix is actively being developed in PR #3463.
*   **Environment Compatibility:** Users on NVIDIA devices running via Termux (PR #3455) continue to report issues, though this specific PR is currently marked as stale/stalled.

### 6. Feature Requests & Roadmap Signals
*   **Perplexity Attribution:** The request to add the `X-Pplx-Integration` header indicates a roadmap item focused on **API compliance**. It is highly likely this will be merged to ensure continued access to Perplexity's search capabilities.
*   **Provider Ecosystem:** The addition of Runcrate (merged) and the focus on provider stability suggest the roadmap is expanding to include more **OpenAI-compatible provider options** to give users flexibility in compute sourcing.

### 7. User Feedback Summary
*   **Pain Point:** Users require granular control over skill management, specifically the ability to install skills that have conflicting metadata names but serve different functions.
*   **Use Case:** The user base is expanding into specific hardware environments (Termux on NVIDIA) and requires deeper integration compliance (Perplexity headers).
*   **Sentiment:** Generally constructive; feedback is focused on "fixing" rather than complaining, indicating a healthy, engaged community working on edge cases.

### 8. Backlog Watch
*   **[OPEN] fix(nvidia model id termux shell) ([PR #3455](https://github.com/sipeed/picoclaw/pull/3455)):** This PR was created on Nov 1st and last updated on Nov 9th. It is currently marked as stale. It requires maintainer attention to determine if the issue is still relevant or if it can be closed.

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

# Moltis Project Digest — 2026-11-10
## 1. Today's Overview
Moltis maintained a low-risk activity level on 2026-11-10, with only one new issue and one open PR being updated within the past 24 hours. The project is currently active in refining its model management and provider infrastructure, with a focus on addressing model picker UI inconsistencies and extending provider support capabilities. No new releases were published, indicating stability without major versional changes.
## 2. Releases
No new releases were published on 2026-11-10.
## 3. Project Progress
- **PRs:** 1 merged/closed PR was opened and updated today.
  - **#1323 [OPEN] feat(providers): add Runcrate provider** — Adds a new OpenAI-compatible provider based on a table-driven approach, following existing patterns for known providers like DeepInfra and Fireworks. No merging was completed today.
- **Issues:** 1 active open issue updated today.
  - **#1322 [OPEN] [Bug]: Desktop app model picker lists every reasoning effort as a separate model** — Focuses on an inconsistent model picker experience where reasoning-capable models are duplicated based on effort levels in desktop and daemon builds.
## 4. Community Hot Topics
- **Open Issue:** **#1322 [OPEN] [Bug]: Desktop app model picker lists every reasoning effort as a separate model** — Caused by the model picker displaying reasoning variants per effort level (e.g., DeepSeek V4 Flash low/medium), leading to user confusion. The issue highlights a UI/UX bug in model representation and suggests an improved deduplication mechanism for reasoning models.
- **Open PR:** **#1323 [OPEN] feat(providers): add Runcrate provider** — Gains attention for adding an additional OpenAI-compatible provider, indicating an active effort to expand the provider table. Requires follow-up on integrating Runcrate and verifying compatibility with existing provider definitions.
## 5. Bugs & Stability
- **Bugs / Issues:** 1 active issue identified with high visibility but no closed resolution today.
  - **#1322 [OPEN] [Bug]: Desktop app model picker lists every reasoning effort as a separate model** — This is the primary item to track, as it represents a known user friction point in model presentation and impacts usability of the desktop application.
- **Regressions / Crashes:** None reported today.
- **Stability Assessment:** Current status indicates stability with no critical regressions. The primary focus remains resolving the model picker inconsistency identified in #1322.
## 6. Feature Requests & Roadmap Signals
- **Requested Features:** A model picker with consistent deduplication of reasoning models across different effort levels (currently duplicated per level in the desktop/daemon builds).
- **Roadmap Signals:** Indicates an upcoming need to improve the model selection UI to reduce false duplicates and align the model presentation logic across desktop and daemon ecosystems. The Runcrate provider addition signals expansion of supported OpenAI-compatible integrations.
## 7. User Feedback Summary
- **Pain Points:** Users are facing confusion from the desktop model picker displaying reasoning models redundantly per effort level. This frustrates model selection and reliability for users who may have varying reasoning levels in their scenarios.
- **Use Cases:** Users needing consistent and clear model selection across different reasoning levels, specifically in desktop and local daemon applications, where deduplication of reasoning-capable models would be beneficial.
- **Satisfaction:** Mixed based on current issue sentiment—the desktop picker bug is a clear usability friction point that requires immediate resolution.
## 8. Backlog Watch
- **Priority Issue:** **#1322 [OPEN] [Bug]: Desktop app model picker lists every reasoning effort as a separate model** — This is the most important item. It involves a core user experience issue requiring a fix in the model picker logic across desktop and daemon builds. Maintainer attention is needed to resolve the deduplication and presentation inconsistencies, as the current implementation causes user confusion.
- **Priority PR:** **#1323 [OPEN] feat(providers): add Runcrate provider** — While still open, this PR addresses a significant expansion of supported providers. It is a high-impact item that may require more development and testing before integration, warranting maintainer follow-up to ensure Runcrate compatibility with existing provider definitions.

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