# OpenClaw Ecosystem Digest 2026-10-28

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-27 23:21 UTC

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

# Open-Source AI Agent & Personal AI Assistant Ecosystem Report
**Date:** October 28, 2026  
**Focus:** Ecosystem Activity, Architectural Trends, and Cross-Project Analysis

---

## 1. Ecosystem Overview
The open-source personal AI assistant and agent landscape in late 2026 is undergoing a distinct transition from experimental feature prototyping to operational and security hardening. The ecosystem is experiencing consolidation around production-ready concerns: identity access management (OIDC/RBAC), state replay/session persistence, container boundary isolation, and secure channel adapters. Activity across projects shows a widening gap between highly active enterprise-grade infrastructure projects (e.g., **ZeroClaw**) and specialized or dormant lightweight runtimes.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Status | Health / Activity Score |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | *Data N/A* | *Data N/A* | *Data N/A* | ⚠️ Summary Failed |
| **NanoBot** | *Data N/A* | *Data N/A* | *Data N/A* | ⚠️ Summary Failed |
| **Hermes Agent** | *Data N/A* | *Data N/A* | *Data N/A* | ⚠️ Summary Failed |
| **PicoClaw** | *Data N/A* | *Data N/A* | *Data N/A* | ⚠️ Summary Failed |
| **NanoClaw** | 0 new | 6 updated (1 merged) | None | 🟢 **Moderate** (Maintenance / Channel Expansion) |
| **NullClaw** | 0 | 0 | None | ⚪ **Inactive** (24h) |
| **IronClaw** | 0 | 0 | None | ⚪ **Inactive** (24h) |
| **LobsterAI** | *Data N/A* | *Data N/A* | *Data N/A* | ⚠️ Summary Failed |
| **TinyClaw** | 0 | 0 | None | ⚪ **Inactive** (24h) |
| **Moltis** | 0 | 0 | None | ⚪ **Inactive** (24h) |
| **CoPaw** | *Data N/A* | *Data N/A* | *Data N/A* | ⚠️ Summary Failed |
| **ZeptoClaw** | 0 | 0 | None | ⚪ **Inactive** (24h) |
| **ZeroClaw** | 17 updated | 40 updated (1 merged) | **v0.8.7** | 🔥 **High Velocity** (Rapid Hardening) |

---

## 3. OpenClaw's Position
As the foundational reference architecture for the "Claw" agent family, **OpenClaw** historically defines standard orchestration protocols, skill abstractions, and multi-channel connection models. 

* **Architectural Trade-offs:** While full-stack reference engines like OpenClaw prioritize comprehensive capabilities, optimized implementations like **ZeroClaw** target high-performance native runtimes (Rust/Wasm) for enterprise gateways, and **NanoClaw** focuses on lightweight, container-isolated desktop/personal environments.
* **Ecosystem Influence:** Downstream projects are actively refactoring baseline OpenClaw concepts—such as session management and channel adapters—into domain-specific solutions (e.g., ZeroClaw's append-only event logs and strict gateway OIDC bounds).

---

## 4. Shared Technical Focus Areas

A cross-analysis of active community activity highlights four core technical imperatives:

1. **Identity, Access Control, and Security Boundaries**
   * **Projects:** *ZeroClaw*, *NanoClaw*
   * **Details:** Security is the top priority across active maintainers. ZeroClaw patched core vulnerabilities (Wasmtime runtime, Rustls certificates, command injection checks) and addressed OIDC rate limits and scope leaks (#12046, #12049). NanoClaw is addressing external security audit findings (PR #4234) regarding credential harvesting in bundled skill scripts.
2. **Session Durability and Replayability**
   * **Projects:** *ZeroClaw*, *NanoClaw*
   * **Details:** Transitioning from simple context buffers to durable state engines. ZeroClaw introduced append-only session history (#11921) and named/UUID session loading (`/load-session` #12071), addressing context loss during mid-turn reloads. NanoClaw continues work on decoupling container mounting points from local session directories.
3. **Privacy-Focused & Native Messaging Adapters**
   * **Projects:** *NanoClaw*, *ZeroClaw*
   * **Details:** Growing developer demand for native, secure messaging integration. NanoClaw is introducing a native IMAP/SMTP adapter for Proton Mail (PR #4218), while ZeroClaw is hardening channel permission scoping across Telegram and Discord bot interactions.
4. **LLM Provider Robustness & Reasoning Configurations**
   * **Projects:** *ZeroClaw*
   * **Details:** Mitigating breaking changes from upstream providers. Efforts focus on handling reasoning effort parameters for OpenAI models, resolving streaming fallback crashes in Codex pipelines (#12072), and establishing MCP (Model Context Protocol) connection recovery (#12061).

---

## 5. Differentiation Analysis

```
                    [ Enterprise Gateway / Multi-Tenant ]
                                     │
                                 ZeroClaw (Rust, OIDC, MCP, Wasm runtime)
                                     │
[ Consumer / Single-User ] ──────────┼────────── [ Specialized / Minimalist ]
                                     │
                     NanoClaw (Containerized Skills, Proton Mail, Desktop Focus)
```

* **ZeroClaw (Enterprise Gateway Agent Engine):**
  * **Target Users:** Platform engineers, enterprise systems integrators, security-sensitive deployments.
  * **Architecture:** High-throughput Rust core, sandboxed Wasm execution, robust gateway authentication (OIDC), strict multi-tenant authorization, and MCP client pooling.
* **NanoClaw (Personal & Channel-Centric Assistant):**
  * **Target Users:** End-users, privacy-focused developers, personal desktop automation.
  * **Architecture:** Container-isolated skill execution, multi-channel bridging (WhatsApp, Proton Mail), simple cron/scheduled script execution models.
* **Minimalist Claws (NullClaw, IronClaw, TinyClaw, ZeptoClaw, Moltis):**
  * **Target Users:** Embedded devices, single-purpose autonomous tasks, resource-constrained environments.
  * **Architecture:** Zero-dependency runtime variants optimized for low-footprint single-turn or simple event loops.

---

## 6. Community Momentum & Maturity

* **Tier 1: High Velocity & Systemic Hardening (ZeroClaw)**
  * **Status:** Mature runtime undergoing rapid production hardening.
  * **Indicators:** v0.8.7 released with 81 commits across 19 contributors; 40 active PRs; high issue velocity focused on security vulnerability mitigation and protocol stabilization.
* **Tier 2: Steady Maintenance & Channel Expansion (NanoClaw)**
  * **Status:** Operational maintenance phase with targeted feature additions.
  * **Indicators:** Stable baseline with focused contributions on channel coverage (Proton Mail) and technical debt cleanup (WhatsApp container session mounts).
* **Tier 3: Low Activity / Stable State (NullClaw, IronClaw, TinyClaw, Moltis, ZeptoClaw)**
  * **Status:** Zero activity recorded over the 24-hour cycle. Likely serving as static, single-purpose codebases or experiencing quiet development intervals.

---

## 7. Trend Signals for AI Agent Developers

1. **Agent Tool Execution Must Be Zero-Trust:** Security audits (Trustabl on NanoClaw) and vulnerability reports (ZeroClaw's principal-unaware tool exposure) show that skill scripts and tool invocation layers are major attack vectors. Developers should mandate container sandboxing (e.g., Wasm or isolated Docker volumes) and explicit credential scoping.
2. **Session State is Evolving from Text Logs to Replay Trees:** Simple sliding-window context buffers are insufficient for complex agent workflows. Production systems are adopting append-only event logs, transactional state replay, and explicit session resume endpoints.
3. **Gateway Security Is Essential for Multi-Channel Agents:** Connecting agents to public platforms (Telegram, Discord) exposes systems to scope-escalation and approval-bypass attacks. Authentication must occur at the gateway layer via OIDC/signed requests before prompt parsing begins.
4. **Resilience to Stream Instability is Required:** Upstream provider API changes (e.g., reasoning tokens, Codex streaming behavior) frequently cause unexpected failures. Implement robust retry fallbacks and streaming decoders at the provider interface layer.

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

# NanoClaw Project Digest
**Date:** 2026-10-28
**Repository:** nanocoai/nanoclaw

### 1. Today's Overview
The NanoClaw project maintains a stable operational status with no active releases or critical alerts. While the last 24 hours show zero new issues or releases, the project remains active with a healthy number of pull requests (6) currently in the review queue. Development is focused on expanding channel integrations and refining repository maintenance standards, suggesting the project is in a maintenance and feature expansion phase rather than a crisis mode.

### 2. Releases
**None**
*No new versions were published in the last 24 hours.*

### 3. Project Progress
*   **6 PRs Updated:** The project processed 6 pull requests, resulting in 1 merge/closure and 5 currently open.
*   **Documentation Fix:** PR #4098 was successfully merged, clarifying that scheduled task scripts ignore the `#!` shebang line, improving developer clarity for configuration.

### 4. Community Hot Topics
*   **Proton Mail Integration (PR #4218):** This is the most prominent feature request, seeking a native IMAP/SMTP adapter for Proton Mail. The PR is currently open and awaiting review. It addresses a specific integration need for users requiring secure, private email channels.
    *   *Link:* [nanocoai/nanoclaw PR #4218](https://github.com/qwibitai/nanoclaw/pull/4218)
*   **Repository Reliability (PR #4234):** Submitted by Trustabl, this PR highlights an external audit of the repository's security and reliability. It flags bundled skill scripts that read credentials, prompting a request for improved security practices within the codebase.
    *   *Link:* [nanocoai/nanoclaw PR #4234](https://github.com/qwibitai/nanoclaw/pull/4234)

### 5. Bugs & Stability
*   **WhatsApp Media Routing (PRs #2778, #2429, #1998):** This is a recurring technical debt item spanning several months. The issue involves WhatsApp inbound media (images, documents, audio) not reaching the agent because it is staged to the host file system instead of the container's session directory. While multiple PRs have been opened to fix this, they remain open, indicating a complex integration issue that requires careful testing to ensure file permissions and mounting points are handled correctly.
    *   *Link:* [nanocoai/nanoclaw PR #2778](https://github.com/qwibitai/nanoclaw/pull/2778)

### 6. Feature Requests & Roadmap Signals
*   **Native Proton Mail Adapter:** The community is actively requesting a native adapter for Proton Mail. Given the trend toward self-hosted, privacy-focused communication tools, this feature is likely a priority for the "channels" roadmap. The current implementation is split between a skill and an adapter, suggesting a move toward a more robust, first-class integration.
*   **Enhanced Security Auditing:** The introduction of automated reliability scanning (via Trustabl) signals a roadmap shift toward stricter code quality and security standards. Future releases may include automated security checks in CI/CD pipelines.

### 7. User Feedback Summary
*   **Integration Frustration:** Users are actively working to bridge gaps in the channel ecosystem. The persistence of the WhatsApp media bug suggests users are struggling with file handling and session isolation in containerized environments.
*   **Security Concerns:** Users are increasingly aware of credential management. The submission of PR #4234 indicates that the user base is attentive to security best practices and expects the framework to handle sensitive data (like credentials) securely out of the box.

### 8. Backlog Watch
*   **WhatsApp Media Bug (Open since June):** This issue has been open for over 4 months. While multiple attempts have been made, it requires urgent maintainer attention to resolve the container mounting vs. host file system conflict.
*   **Trustabl Security Recommendations:** The CI/CD recommendations from the Trustabl audit need to be addressed to ensure the repository meets modern security standards.

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

# ZeroClaw Project Digest — 2026-10-28
## 1. Today's Overview
ZeroClaw experienced elevated activity with 17 new issues opened/updated and 40 PRs created/updated, reflecting a surge in bug reporting, feature requests, and security hardening focused on gateway, OIDC/identity access, and session management. Concurrently, v0.8.7 was released, introducing security and maintenance improvements (patched Wasmtime, Rustls verification, release-driven component updates) and supporting agent identity capabilities. Overall project health is positive, with active bug fixing and prioritized growth in security and infrastructure.
## 2. Releases
A new release was published: **v0.8.7**.
- **Scope**: Security and maintenance follow-up spanning 81 commits from 19 contributors.
- **Key changes**: 
  - Patched Wasmtime; patched Rustls certificate verification; updated `tokio` and `ctutils` releases for advisories affecting v0.8.6; rebuilt container images with C-based updates.
- **Breaking changes**: None specified in the release notes.
- **Migration notes**: No explicit migration guide; users should rely on the patched component implementations and release cadence to verify stability.
## 3. Project Progress
- **Merged/closed PRs today**: 40 PRs updated (1 merged, 39 open), with significant activity around session history (PR #11921), session resume (`/load-session` PRs #12071/#12073), security fixes (PR #12068 addressing command injection), and provider/feature enhancements (OpenAI reasoning, Discord approval fixes, MCP recovery).
- **Features advanced**:
  - Added append-only session event history (PR #11921) to stabilize state replay.
  - Implemented `/load-session` slash commands for resume by name/UUID (PRs #12071/#12073).
  - Patched security issues (e.g., command injection detection, MCP recovery, OIDC verification limits) via fixes (PR #12068, #12065, #12061).
  - Enhanced OpenAI provider handling (runtime-profile thinking, stream-decode fix, reasoning effort support).
  - Improved gateway security (identity access, OIDC verification limits, scope security).
## 4. Community Hot Topics
Key active issues and PRs include:
- **#11913** (Issue, OPEN): Telegram command menu exposure via untrusted `setMyCommands` scope — **P1 priority, high risk**, core channel/security concern.
- **#12049 / #12052** (Issues, OPEN): Gateway signer-rebinding limits due to stale X-Forwarded-For handling — **P1**, gateway security loophole.
- **#12046 / #12064** (Issues, OPEN): Principal-unaware tool exposure and Discord bot approval abuse — **P1**, security/corruption.
- **#12072 / #12067 / #12066** (Issues, OPEN): OpenAI Codex streaming fallback failures and prompt guard rule misconfigurations — **P1/P2**, provider/security regressions.
- **#11961 / #12047** (Issues, OPEN): OIDC sign-in feasibility and lack of verification limiter — **P1**, identity-access gap.
- **#12069** (Issue, OPEN): `/load-session` Code session resume feature — **P2**, workspace/gateway utility.
Links: [Issue #11913](https://github.com/zeroclaw-labs/zeroclaw/issues/11913), [Issue #12049](https://github.com/zeroclaw-labs/zeroclaw/issues/12049), [Issue #12072](https://github.com/zeroclaw-labs/zeroclaw/issues/12072), [Issue #12067](https://github.com/zeroclaw-labs/zeroclaw/issues/12067), [Issue #12064](https://github.com/zeroclaw-labs/zeroclaw/issues/12064), [PR #11921](https://github.com/zeroclaw-labs/zeroclaw/pull/11921), [PR #12068](https://github.com/zeroclaw-labs/zeroclaw/pull/12068), [PR #12073](https://github.com/zeroclaw-labs/zeroclaw/pull/12073).

## 5. Bugs & Stability
- **Severity ranking (by reported impact)**:
  1. **High (P1)**: MCP connection permanent poisoning (#10807), signer/scope binding failures (#12049, #12052), OIDC verification lacking limits (#12047), principal-unaware tool leakage (#12046).
  2. **High (P1)**: Gateway login store saturation blocking sign-in (#12049), MCP client no pool/keep-alive control (#12055), Discord approval bypass via allowlisted peers (#12064).
  3. **Medium (P2)**: Prompt guard misclassifying clean payloads (#12066), OpenAI Codex stream-decode fallback failure (#12072), mcp session recovery (#12061), ChatGPT streaming rejects streaming retry (#12073).
  4. **Low (P2)**: Security rule ordering reversal in untrusted guard (#12067), session context budget trim miscalculation (#12074).
- **Status**: 17 active issues updated in the last 24h, all open (0 closed). **No fix PRs** are listed for the specific open issues, suggesting ongoing attention or pending follow-up work.

Links: [Issue #10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807), [Issue #12049](https://github.com/zeroclaw-labs/zeroclaw/issues/12049), [Issue #12052](https://github.com/zeroclaw-labs/zeroclaw/issues/12052), [Issue #12046](https://github.com/zeroclaw-labs/zeroclaw/issues/12046), [Issue #12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055), [Issue #12064](https://github.com/zeroclaw-labs/zeroclaw/issues/12064), [Issue #12072](https://github.com/zeroclaw-labs/zeroclaw/issues/12072), [Issue #12067](https://github.com/zeroclaw-labs/zeroclaw/issues/12067), [Issue #12066](https://github.com/zeroclaw-labs/zeroclaw/issues/12066).

## 6. Feature Requests & Roadmap Signals
- **Priority 1** (long-standing, active): Identity access and authorization — OIDC sign-in capability (#11961), verification limits (#12047), signer-binding scoping (#12049/#12052), principal-to-tool safety (#12046), Discord bot approval defense (#12064).
- **Priority 2** (growing, multiple PRs): Session persistence/resume (#12069), session history stability (#11921), reasoning effort configuration for OpenAI (#10705/#12059/#12093), intent/context control (#12074).
- **Priority 3**: Security rule corrections and guard calibration (#12067/#12066), MCP client robustness (#12055), OpenAI Codex streaming reliability (#12072/#12073).
- **Signal**: Multiple PRs indicate alignment with v0.9.0 target (issues tagged `release:v0.9.0`), particularly OIDC, session, and identity-access improvements.

Links: [Issue #11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961), [Issue #12047](https://github.com/zeroclaw-labs/zeroclaw/issues/12047), [Issue #12049](https://github.com/zeroclaw-labs/zeroclaw/issues/12049), [Issue #12052](https://github.com/zeroclaw-labs/zeroclaw/issues/12052), [Issue #12046](https://github.com/zeroclaw-labs/zeroclaw/issues/12046), [Issue #12064](https://github.com/zeroclaw-labs/zeroclaw/issues/12064), [Issue #12067](https://github.com/zeroclaw-labs/zeroclaw/issues/12067), [Issue #12066](https://github.com/zeroclaw-labs/zeroclaw/issues/12066), [PR #11921](https://github.com/zeroclaw-labs/zeroclaw/pull/11921), [PR #12069](https://github.com/zeroclaw-labs/zeroclaw/pull/12069).

## 7. User Feedback Summary
- **Primary pain points**: 
  - **Security and permissions**: Users report issues where authentication scoping is broken (command menus exposed, principal-to-tool leakage, signer binding failures), causing unauthorized access or operational blockage.
  - **Data integrity and session loss**: Mid-turn page reloads causing prompt/data loss (Issue #11517), and MCP connection failures leading to tool-call misattribution.
  - **Provider and pipeline instability**: OpenAI Codex streaming and reasoning handling repeatedly failing, and gateway verification/sign-in flow contention.
- **Use cases**: Users need reliable gateway and channel security, stable session management for long-running agent operations, and provider-compatible reasoning/cost control.
- **Satisfaction/dissatisfaction**: Active issue reporting and PR engagement indicates significant need for improved auth security, session reliability, and provider compatibility; however, feedback is concentrated on security and operational stability rather than feature request enthusiasm.

Links: [Issue #11517](https://github.com/zeroclaw-labs/zeroclaw/issues/11517), [Issue #10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807), [Issue #12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055), [Issue #12072](https://github.com/zeroclaw-labs/zeroclaw/issues/12072).

## 8. Backlog Watch
- **Critical (high priority)**:
  - OIDC sign-in and verification limits (Issue #11961, #12047) — gap in authentication security and access control, impacting user sign-in and data protection.
  - Signer/scope binding failures (#12049, #12052) — gateway security loophole affecting trust boundary and sign-in reliability.
  - Principal-to-tool leakage (#12046) — risk to privilege management and operational isolation.
- **High (priority)**:
  - MCP connectivity robustness (no pool control, #12055), Discord approval bypass (#12064), MCP recovery (#12061).
  - Security rule calibration (command injection detection, #12067/#12066).
- **Needs attention**:
  - OpenAI Codex streaming fallback and reasoning handling (#12072/#12073) — ongoing provider reliability issues.
  - Session resume and history stability (#12069/#11921) — needed for long-running session continuity.

Links: [Issue #11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961), [Issue #12049](https://github.com/zeroclaw-labs/zeroclaw/issues/12049), [Issue #12052](https://github.com/zeroclaw-labs/zeroclaw/issues/12052), [Issue #12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055), [Issue #12064](https://github.com/zeroclaw-labs/zeroclaw/issues/12064), [Issue #12067](https://github.com/zeroclaw-labs/zeroclaw/issues/12067), [Issue #12066](https://github.com/zeroclaw-labs/zeroclaw/issues/12066), [Issue #12072](https://github.com/zeroclaw-labs/zeroclaw/issues/12072), [Issue #12073](https://github.com/zeroclaw-labs/zeroclaw/issues/12073), [Issue #11921](https://github.com/zeroclaw-labs/zeroclaw/issues/11921).

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*