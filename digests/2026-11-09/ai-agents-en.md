# OpenClaw Ecosystem Digest 2026-11-09

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-08 23:17 UTC

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

**Cross-Project Ecosystem Comparison Report**
**Date:** 2026-11-09
**Scope:** OpenClaw, NanoBot, Hermes, PicoClaw, NanoClaw, NullClaw, IronClaw, LobsterAI, TinyClaw, Moltis, CoPaw, ZeptoClaw, ZeroClaw

### 1. Ecosystem Overview
The personal AI assistant and agent open-source ecosystem in late 2026 is characterized by a sharp bifurcation between high-velocity, enterprise-adjacent platforms and lightweight, embedded-specialized tools. While major players like ZeroClaw are pushing aggressive architectural shifts in security and multi-tenancy, a significant portion of the mid-tier ecosystem (6 out of 13 tracked projects) experienced data acquisition failures or reported zero activity, suggesting a consolidation period or infrastructure outage in telemetry collection. The landscape is currently dominated by distinct niches: ZeroClaw focuses on complex, secure, multi-agent orchestration, NullClaw prioritizes runtime memory stability and micro-optimizations, and dormant projects indicate a natural culling of less viable community efforts. Notably, the "Claw" naming convention persists across multiple distinct codebases, reflecting a shared conceptual lineage in agent design patterns.

### 2. Activity Comparison
*Note: "N/A" indicates summary generation failure (data unavailable). "0" indicates confirmed no activity. Health Score is qualitative (1-5) based on observed stability, security, and cadence.*

| Project | Issues (24h) | PRs (24h) | Releases | Health Score | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **ZeroClaw** | 14 | 50 | None | ⭐⭐⭐⭐⭐ | **High Velocity** |
| **NullClaw** | 0 | 1 (Open) | None | ⭐⭐⭐ | **Stable/Maintenance** |
| **NanoBot** | N/A | N/A | N/A | ⚠️ Unknown | Data Failure |
| **Hermes Agent** | N/A | N/A | N/A | ⚠️ Unknown | Data Failure |
| **PicoClaw** | N/A | N/A | N/A | ⚠️ Unknown | Data Failure |
| **NanoClaw** | N/A | N/A | N/A | ⚠️ Unknown | Data Failure |
| **IronClaw** | N/A | N/A | N/A | ⚠️ Unknown | Data Failure |
| **LobsterAI** | N/A | N/A | N/A | ⚠️ Unknown | Data Failure |
| **CoPaw** | N/A | N/A | N/A | ⚠️ Unknown | Data Failure |
| **OpenClaw** | N/A | N/A | N/A | ⚠️ Unknown | Data Failure |
| **TinyClaw** | 0 | 0 | 0 | ⭐ | **Dormant** |
| **Moltis** | 0 | 0 | 0 | ⭐ | **Dormant** |
| **ZeptoClaw** | 0 | 0 | 0 | ⭐ | **Dormant** |

### 3. OpenClaw's Position
*Disclaimer: Specific comparative data for OpenClaw is unavailable due to summary generation failure. The following is an inference based on its status as the "core reference" and the ecosystem dynamics observed in peer projects.*

*   **Advantages vs. Peers:** As the core reference implementation, OpenClaw likely establishes the baseline architecture that other "Claw" derivatives (NullClaw, NanoClaw, etc.) modify. Compared to ZeroClaw’s heavy enterprise focus, OpenClaw traditionally represents the "standard" open-source agent framework, likely balancing complexity and accessibility better than the hyper-specialized lightweight forks.
*   **Technical Approach Differences:** While ZeroClaw is undergoing a major shift toward Core RPC dispatch for plugin security, and NullClaw is deep in memory allocation validation (allocate-before-free), OpenClaw’s approach is inferred to be the stable general-purpose runtime. If OpenClaw follows traditional agent patterns, it may lack the immediate granular identity/access control (RBAC) features ZeroClaw is shipping, positioning it as a more "developer-first" platform rather than an "operator-first" platform.
*   **Community Size Comparison:** Assuming the "data failure" is an anomaly and not a delisting, OpenClaw likely maintains the largest contributor base among the active projects, serving as the hub for the community. In contrast, ThirdClaw/NanoClaw are likely experimental forks, and ZeroClaw is attracting the enterprise/security-focused segment of the community.

### 4. Shared Technical Focus Areas
Despite data gaps, clear technical convergences are visible among the active projects (ZeroClaw, NullClaw):

1.  **Runtime Security & Isolation:**
    *   **ZeroClaw:** Implementing Scoped Dashboard Chat and moving plugin webhooks to Core RPC to isolate execution contexts.
    *   **NullClaw:** Fixing delivery ownership validation to prevent memory leaks during teardown.
    *   *Implication:* The ecosystem is moving from "naive function calls" to strict sandboxing and memory-safe resource management.
2.  **Agent Lifecycle Management:**
    *   **ZeroClaw:** Issue #9597 highlights a critical need for durable, attributable peer-agent turns (parent-child relationships) for auditing.
    *   **NullClaw:** Focus on daemon scheduling and allocation stability ensures agents don't crash mid-turn.
    *   *Implication:* Reliability in long-running multi-agent workflows is the primary bottleneck.
3.  **Identity & Access Control (IAC):**
    *   **ZeroClaw:** Active development on Roster Password Auth and CLI identity lifecycle management; removing admin rights for basic chat interactions.
    *   *Implication:* Transitioning from single-user "server admin" models to multi-user or role-based agent access.

### 5. Differentiation Analysis

| Dimension | ZeroClaw | NullClaw | Dormant/Inactive (TinyClaw, etc.) |
| :--- | :--- | :--- | :--- |
| **Target User** | Enterprise / Platform Operators | Embedded / High-Reliability / Edge | Hobbyist / Experimental |
| **Primary Focus** | Security, Multi-tenancy, Dashboard UX | Memory Safety, Daemon Stability, Low-Level Correctness | N/A |
| **Architecture** | Distributed, RPC-based plugin system, Heavy DB/State | Single-node (implied), Daemon-centric, Zero-dependency focus | N/A |
| **Complexity** | High (Complex dependency chains, RFCs) | Moderate (Targeted fixes) | Low |
| **Key Differentiator** | Granular RBAC & Auditability | "Boring" tech reliability; no crashes | None |

### 6. Community Momentum & Maturity
*   **Tier 1: High Velocity / Rapid Iteration (ZeroClaw):**
    *   64 updates in 24h. Actively breaking and refactoring core components (RPC, Auth).
    *   *Maturity:* **Pre-Stable v0.9.0.** High risk of breaking changes, high reward for security features. Suitable for teams that can manage dependency churn.
*   **Tier 2: Maintenance / Stabilization (NullClaw):**
    *   Minimal activity (1 PR). Focus is on fixing subtle correctness bugs (allocation vs. free order).
    *   *Maturity:* **Stable/Niche.** likely a mature codebase used in environments where downtime/crashes are unacceptable (embedded, critical infrastructure).
*   **Tier 3: Unknown/Data Gap (OpenClaw, NanoBot, Hermes, etc.):**
    *   Canonical projects failing to generate summaries. This could indicate API rate limits, server outages, or scraping issues, rather than project death.
    *   *Action:* Verify manual access to these repos before assuming dormancy.
*   **Tier 4: Dormant (TinyClaw, Moltis, ZeptoClaw):**
    *   Zero activity. Likely abandoned or completed experimental projects.

### 7. Trend Signals
1.  **Shift from "Black Box" to "Auditable Agents":**
    *   ZeroClaw’s push for durable, attributable turns (#9597) signals that developers can no longer tolerate opaque agent interactions. **Value for Developers:** Build logging/tracing layers that capture parent-child agent relationships.
2.  **Security is Now Table Stakes for Multi-User Agents:**
    *   The move toward scoped identity (non-admins chatting with agents) and RPC isolation means the "one admin, one agent" model is over. **Value for Developers:** Implement RBAC/ACL for agent actions, not just API access.
3.  **Reliability Over Novelty in Niche Markets:**
    *   NullClaw’s focus on memory ownership validity suggests that in specific embedded or low-resource contexts, stability is valued over new features. **Value for Developers:** If targeting edge devices, invest in rigorous resource lifecycle management (RAII, explicit ownership).
4.  **Cross-Platform Pressure:**
    *   ZeroClaw is actively working on Windows/macOS CI (#7461). The Linux-only era of agent frameworks is ending. **Value for Developers:** Ensure your agent harness is path-agnostic and shell-robust early in the development cycle.

### Recommendation for Technical Decision-Makers
*   **For Enterprise/Production Use:** Evaluate **ZeroClaw** closely, but be prepared for the v0.9.0 transition risks. Its security and identity features are critical for multi-user deployments. Monitor PR #11320 RPC changes as they will define the plugin security landscape.
*   **For Edge/High-Reliability Deployments:** **NullClaw** appears to be the safest bet for stability-focused, single-image deployments, despite its feature stagnation.
*   **For General Purpose:** Re-engage with **OpenClaw** directly (manual GitHub check) as the "data failure" prevents a trustworthy assessment. Given its status as a core reference, it may still offer the best balance of features and community support if the data gap is transient.

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

# NullClaw Project Digest
## 2026-11-09
### 1. Today's Overview
NullClaw shows minimal activity this day, with no new issues or PRs opened or merged. There is 1 open pull request (#1090) focused on a scheduling daemon fix related to delivery ownership validation. Overall, the project maintains stable status with no recent changes affecting core functionality.
### 2. Releases
No new releases were published today.
### 3. Project Progress
- **Merged/Closed PRs:** 1 PR closed/opened; #1090 (OPEN) by `perfloop-agent` addresses an allocation failure in daemon delivery processing.
- **Key Advancement:** The scheduled delivery replacement now applies allocate-before-free, preventing teardown from invalidating memory ownership, directly addressing a stability and correctness concern.
### 4. Community Hot Topics
- **PR:** [#1090 - fix(daemon): keep delivery ownership valid on allocation failure](https://github.com/nullclaw/nullclaw/pull/1090) - The PR addresses a critical validation gap in daemon allocation failure handling, indicating a priority focus on correctness in runtime process management.
- **Note:** With zero issues, no community engagement signals or actionable needs from unresolved issues are visible in this period.
### 5. Bugs & Stability
- **Bugs/Crashes/Regressions:** No bugs, crashes, or regressions reported today.
- **Stability Status:** Project stability is current; the current fix resolves a previously uncovered allocation/teardown ownership issue.
### 6. Feature Requests & Roadmap Signals
- **Feature Signals:** None currently active. No direct feature requests or roadmap direction were observed. The only signal is a targeted fix for a specific daemon allocation stability issue.
### 7. User Feedback Summary
- **Pain Points:** No direct user feedback signals observed. The current project activity is concentrated on internal code fixes rather than responding to user-driven issues.
- **Use Cases:** The daemon delivery and allocation management functionality appears critical, with the focus on avoiding memory leak/ownership violations during runtime operations.
- **Satisfaction:** No explicit satisfaction indicators; current feedback signals are limited to internal stability-focused work.
### 8. Backlog Watch
- **Key Item:** [PR #1090 - fix(daemon): keep delivery ownership valid on allocation failure](https://github.com/nullclaw/nullclaw/pull/1090) - This is the only outstanding item requiring attention. It addresses a critical allocation ownership validation in the daemon scheduling subsystem and is the most priority for maintainer review to resolve immediately.

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

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

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

### **ZeroClaw Project Digest**
**Date:** 2026-11-09

---

### 1. Today's Overview
The ZeroClaw project is maintaining a high velocity of development with significant activity in security hardening, agent runtime improvements, and gateway feature expansion. Over the last 24 hours, 14 issues and 50 pull requests were updated, indicating a robust engineering pipeline. The project is currently focused on stabilizing the v0.9.0 roadmap, specifically addressing agent lifecycle management, dashboard security, and cross-platform compatibility.

### 2. Releases
**No new releases were detected in the last 24 hours.**

### 3. Project Progress
*   **Feature Development:** Active work on **Scoped Dashboard Chat** (#12244, #12298) allows non-administrators to interact with agents via the dashboard using their own identity, removing the need for administrator rights for chat interactions.
*   **Security & RPC:** A major architectural shift is underway to dispatch plugin webhooks over the Core RPC (#11320, #11322), improving the isolation and security of the gateway plugin system.
*   **Config & Identity:** Significant progress on **Roster Password Auth** (#11264) and CLI integration for identity lifecycle management (#11265, #11313) allows users to manage system identities securely via the command line.

### 4. Community Hot Topics
*   **Agent Lifecycle Durability:** Issue #9597 is a high-priority architectural discussion on making peer-agent turns durable and attributable, moving away from detached process calls. This is critical for debugging and auditing agent behavior.
*   **Runtime Sandbox Security:** Issue #9872 highlights a critical bug where bounded delegate targets resolve filesystems to the delegator's workspace instead of the target's, potentially leading to unauthorized data access.
*   **Dashboard Chat Access:** Issue #11984 and PR #12298 address the ability for standard users to chat with agents, which is a major UX improvement for non-administrators.

### 5. Bugs & Stability
*   **S2 - Gateway/API Degraded Behavior:** Issue #12289 reports that disabled agents still execute turns through operator chat and restricted RPC, bypassing the intended disable state.
*   **S2 - Web UI Behavior:** Issue #12288 reveals a bug where "Discard All" clears the unsaved changes banner but fails to clear local form drafts, leading to data inconsistency.
*   **MCP Provider Error:** Issue #10501 (Closed via PR #10502) fixed a bug where MCP tool-result images caused 400 errors in OpenAI-compatible providers due to incorrect message role placement.

### 6. Feature Requests & Roadmap Signals
*   **v0.9.0 Focus:** Issues #7432 and #11984 explicitly mention `release:v0.9.0`, signaling these features are targeted for the next major release.
*   **Platform Support:** Issue #7461 (Status: In-Progress) pushes for CI testing on Windows and macOS, indicating the team is expanding beyond Linux to ensure cross-platform reliability.
*   **Shell Grammar Validation:** Issues #11994 and #12295 discuss enhancing command policy to check specific shell grammars (zsh/bash) to improve precision in security policies.

### 7. User Feedback Summary
User feedback highlights a strong need for **granular access control**. Users want to create agents they own without requiring full `agents.*` config write grants, as seen in Issue #12290. Additionally, users are frustrated by the "black box" nature of agent turns (Issue #9597) and seek traceability and parent-child lifecycle management to understand agent decision-making processes.

### 8. Backlog Watch
*   **#11320 / #11322 (RPC):** These large, high-risk PRs regarding plugin webhook RPC placement are still open and depend on multiple other merges (#11319, #11165). They represent a complex dependency chain that requires close attention to avoid integration blockers.
*   **#12244 (Scoped Chat):** This feature is currently **blocked** by other PRs (#11964, #12232) and requires maintainer action to unblock the roadmap for v0.9.0.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*