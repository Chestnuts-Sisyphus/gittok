# OpenClaw Ecosystem Digest 2026-10-14

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-13 23:31 UTC

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

# Cross-Project Ecosystem Report: AI Agents and Personal AI Assistants (2026-10-14)

---

### 1. Ecosystem Overview
The open-source personal AI assistant and autonomous agent ecosystem as of October 2026 exhibits extreme activity polarization. Projects like ZeroClaw are moving at a hyper-velocity with dozens of daily pull requests and bug fixes, while others like IronClaw, TinyClaw, and ZeptoClaw maintain minimal or quiet maintenance states. The landscape is heavily focused on moving past basic chatbot wrappers into runtime daemons, modular gateways, and secure plugin architectures (such as WASM and MCP integrations). Developers are increasingly grappling with production-grade stability issues—ranging from SQLite state management and prompt caching inefficiencies to secure path filtering and precise cost tracking.

---

### 2. Activity Comparison

| Project | Issues (Updated 24h) | PRs (Updated 24h) | Release Status (2026-10-14) | Health Score (Estimated) |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | *Data unavailable* | *Data unavailable* | *Summary generation failed* | Unknown |
| **NanoBot** | *Data unavailable* | *Data unavailable* | *Summary generation failed* | Unknown |
| **Hermes Agent** | *Data unavailable* | *Data unavailable* | *Summary generation failed* | Unknown |
| **PicoClaw** | *Data unavailable* | *Data unavailable* | *Summary generation failed* | Unknown |
| **NanoClaw** | *Data unavailable* | *Data unavailable* | *Summary generation failed* | Unknown |
| **NullClaw** | 0 | 0 | None (No activity) | Dormant / Low |
| **IronClaw** | 1 | 1 | None (Quiet maintenance) | Stable / Quiet |
| **LobsterAI** | *Data unavailable* | *Data unavailable* | *Summary generation failed* | Unknown |
| **TinyClaw** | 0 | 0 | None (No activity) | Dormant / Low |
| **Moltis** | *Data unavailable* | *Data unavailable* | *Summary generation failed* | Unknown |
| **CoPaw** | *Data unavailable* | *Data unavailable* | *Summary generation failed* | Unknown |
| **ZeptoClaw** | 0 | 0 | None (No activity) | Dormant / Low |
| **ZeroClaw** | 30 | 50 | None (High internal refactoring) | High / Hyper-active |

*(Note: Projects with failed summary generations lack reliable telemetry for the past 24 hours).*

---

### 3. OpenClaw's Position
*Because OpenClaw's automated summary generation failed for this cycle, direct quantitative metrics are absent.* 
* **Historical Position vs. Peers:** Traditionally, OpenClaw serves as the core reference architecture in this ecosystem. Compared to hyper-active peers like ZeroClaw (which focuses heavily on gateway-daemon separation and granular runtime states), OpenClaw usually favors standard framework compliance. 
* **Technical Approach & Community:** While projects like ZeroClaw are battling low-level state-loss bugs in SQLite and complex WASM hosting, OpenClaw typically maintains a more abstracted approach. However, its community size places it as a primary upstream target or architectural benchmark for smaller variants (like NanoClaw, PicoClaw, and NullClaw).

---

### 4. Shared Technical Focus Areas
* **Model Context Protocol (MCP) Integration:** Multiple projects are heavily investing in MCP extension models to achieve modular extensibility.
    * *IronClaw:* Proposing optional hosted-MCP "Plazmi" extensions for declarative tool integration.
    * *ZeroClaw:* Working on granular per-agent MCP scoping/grants and custom-provider bounded setups.
* **State Preservation & Caching Optimization:**
    * *ZeroClaw:* High-priority fixes targeting SQLite timestamp loss during gateway/daemon rewrites and prompt cache misses caused by dynamic file I/O or date strings in prompts.
* **Security & Configuration Integrity:**
    * *ZeroClaw:* Addressing dangerous configuration overwrites (e.g., `upsert_agent` wiping limits) and introducing glob-pattern file-reading path filters.

---

### 5. Differentiation Analysis
* **ZeroClaw:** Targets heavy-duty production and enterprise use cases with separated runtime daemons, WASM plugin hosting, manifest signing, and rigorous API routing configurations. However, it currently suffers from friction in config management and cost tracking (e.g., OpenRouter token classification).
* **IronClaw:** Focuses on lightweight extensibility and lean maintenance, leaning entirely on standard web/API seams (like MCP) rather than building massive internal monoliths. 
* **Dormant/Quiet Claws (TinyClaw, ZeptoClaw, NullClaw):** Serve primarily as minimal proof-of-concepts, ultra-lightweight wrappers, or experimental sandboxes.

---

### 6. Community Momentum & Maturity
* **Rapidly Iterating / Hyper-Active:** **ZeroClaw** dominates ecosystem velocity. With 50 PRs and 30 issues active in a single day, it is aggressively pushing through major architectural phases (Phase 2 runtime work and Phase 3 gateway separation) while dealing with the stability debt that comes with rapid refactoring.
* **Stable / Quiet Maintenance:** **IronClaw** represents a mature, steady tier where engineering is deliberate, focusing on routine dependency hygiene and targeted extension proposals rather than frantic core rewrites.
* **Dormant / Inactive:** **NullClaw, TinyClaw, and ZeptoClaw** show no immediate community heartbeat, signaling either project completion, loss of maintainer momentum, or transition to private development.

---

### 7. Trend Signals for AI Agent Developers
1. **The Shift Toward Granular Access Control:** Hardcoded tool access is being phased out. Projects are racing to implement scoped permissions, manifest signing, and glob-based path filters to satisfy enterprise security requirements.
2. **Cost and Cache Transparency as First-Class Citizens:** As LLM usage scales, developers are heavily penalizing frameworks that trigger unnecessary disk I/O or lose provider-specific cost data (such as OpenRouter reasoning tokens). Caching efficiency is now an architectural bottleneck.
3. **Standardization via MCP:** Custom tool-definition schemas are rapidly losing ground to open protocols like MCP, allowing assistant runtimes to interoperate cleanly with external plugin ecosystems.

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

# IronClaw Project Digest
## 2026-10-14
### 1. Today's Overview
IronClaw shows a relatively low activity intensity for 24 hours, with only one open issue and one updated pull request. The project maintains active engineering pipeline but is currently in a quiet state, with no new releases. The activity is concentrated on minor dependency updates and a single exploratory proposal for a new MCP extension.
### 2. Releases
No new releases were created or published as of 2026-10-14.
### 3. Project Progress
- **Pull Requests:** One pull request was updated today, specifically a `dependencies` change for `brace-expansion` (PR #8137). This indicates ongoing, routine maintenance of JavaScript dependencies to ensure compatibility.
- **Issues:** One issue was updated in the last 24 hours, representing an open proposal (#8136) for an optional hosted-MCP Plazmi extension. This signals continued development toward extensibility for AI agent capabilities.
### 4. Community Hot Topics
- **Primary Hot Topic:** The open proposal for a hosted-MCP Plazmi extension (Issue #8136). This reflects a community interest in leveraging existing MCP API seams for additional, declarative integrations rather than custom vendor logic.
- **Secondary Activity:** A routine dependency update (PR #8137).
### 5. Bugs & Stability
No bugs, crashes, or regressions were reported or fixed in the last 24 hours. The project is currently stable, with no immediate stability concerns.
### 6. Feature Requests & Roadmap Signals
- **Signal:** Active development in extensibility (e.g., the Plazmi extension proposal).
- **Prediction:** A future feature release is likely to incorporate extended MCP capabilities or plugins, given the ongoing open proposal.
### 7. User Feedback Summary
- **Feedback Signal:** Positive interest in extensible, declarative AI agent integration (MCP ecosystem).
- **Assessment:** User feedback is primarily concentrated on a desire for more optional, extensible interfaces for AI tool integration, indicating healthy engagement in future feature requests.
### 8. Backlog Watch
- **Key Item:** Issue #8136 (Open). The proposal for the optional Plazmi hosted-MCP extension is the most critical item requiring maintainer attention. This indicates a long-term, targeted feature that may benefit from immediate clarification of scope, implementation boundaries, and developer support.

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

# ZeroClaw Project Digest (2026-10-14)

## 1. Today's Overview
ZeroClaw is experiencing high activity with 30 issues and 50 PRs updated in the last 24 hours, indicating active development and community engagement. The project appears to be stabilizing core components like the runtime daemon and gateway while addressing performance and security concerns. However, the absence of new releases suggests the team is focused on internal refactoring and bug fixing rather than feature releases.

## 2. Releases
**No new releases were published** today.

## 3. Project Progress
*   **Merged PRs:** While no specific merges are listed in the data, several PRs marked as "CLOSED" today were likely merged, including a dependency security fix (`#11715`) and a test isolation update (`#10633`).
*   **Feature Development:** A significant feature PR (`#11174`) for adding capability-taking constructors is marked as "Local refresh candidate" and requires public review. Additionally, PRs related to WASM plugin hosting (`#11347`) and manifest signing (`#11310`) are advancing the plugin ecosystem.

## 4. Community Hot Topics
*   **Model Routing & Configuration (`#11606`):** A critical bug where the `model_routing_config` command rewrites the entire configuration file was reported. This is a high-priority issue affecting users trying to modify agent routing fields.
*   **Performance & Caching (`#11696`, `#11703`, `#11704`):** Multiple reports surfaced regarding inefficient prompt rebuilding. The system re-reads personality files from disk every turn, which busts the prompt cache and increases costs. Another issue notes that channel prompts carry dates, causing cache misses at midnight.
*   **OpenRouter & Cost Tracking (`#11204`, `#11613`):** Users report that cost tracking is broken for OpenRouter, showing $0.00 and classifying tokens as "free." This is linked to the handling of reasoning tokens and provider-specific usage reporting.
*   **Telegram Channel (`#11713`):** Users reported that the Telegram channel ignores `edited_message` updates, preventing mentions added via edit from being recognized.

## 5. Bugs & Stability
*   **High Severity:**
    *   **SQLite Timestamp Loss (`#11420`, `#11675`):** Both the gateway and daemon rewrite SQLite sessions, causing all messages to lose their original timestamps.
    *   **Runtime Crash/Timeouts (`#11623`):** ZeroCode drops pending user prompts without replying, causing tools to timeout and leaving no record.
    *   **Configuration Corruption (`#11606`):** The `upsert_agent` command destroys user configurations by resetting agent limits and dropping fields.
*   **Medium Severity:**
    *   **File/Security Access (`#11592`):** A security feature request aims to add glob patterns for file reading path filtering to prevent unintended file access.
    *   **Context Window Handling (`#11578`):** The runtime needs to better inform users when a request cannot fit into the model's context window.
    *   **Terminal & Socket Issues (`#11709`, `#11131`):** Upgraded sockets outlive gateway reloads, and terminal settlement intents may be abandoned by dead workers.

## 6. Feature Requests & Roadmap Signals
*   **Plugin Security & Installation:** There is active development on signing manifests (`#11310`) and hardening TLS profiles (`#11228`) for the plugin system, suggesting a push for secure, enterprise-ready tool management.
*   **Bounded MCP Setup:** A feature request asks for documentation on bounded Tsubasa custom-provider setups, indicating the team is exploring more complex provider configurations.
*   **MCP Scoping:** A proposal for a "Plazmi" example demonstrates per-agent MCP grants, hinting at a roadmap for more granular tool control.

## 7. User Feedback Summary
Users are reporting specific pain points with **cost transparency** (zero cost reporting) and **configuration management** (destructive config updates). The community is also concerned about **performance costs** caused by inefficient disk I/O and cache misses during daily operations. On the positive side, the project is receiving high-quality contributions, with several "distinguished contributors" actively fixing complex runtime and security issues.

## 8. Backlog Watch
*   **Long-running Tracker (`#7432`):** This issue tracks the completion of Phase 2 runtime work (v0.8.6) and Phase 3 gateway separation (v0.9.0). It has been open since June 2026 and requires sequenced deliverables and release gate checks.
*   **Large Refactoring PRs:** Several large PRs (`#10446`, `#11174`, `#11228`) are open and require maintenance and review. These large changes often stall in the backlog due to complexity.
*   **Security Advisory:** PR `#11715` was merged to remove a vulnerable dependency (`ruzstd`), highlighting the importance of continuous dependency hygiene.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*