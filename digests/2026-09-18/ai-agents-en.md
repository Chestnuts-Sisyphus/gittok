# OpenClaw Ecosystem Digest 2026-09-18

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-09-17 22:32 UTC

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

Project DIGEST

Today’s Overview: The Hermes Agent project is on track with continuous development and integration. We have successfully completed the migration to the new version of the agent, addressing compatibility issues and enhancing stability. Additionally, we have addressed several bugs and regressions reported by users, ensuring a better experience for everyone using our platform. As always, we continue to listen to user feedback and actively address their needs.

Releases: No new releases were made today.

Project Progress: We have fixed PRs related to #11359, #114057, #114252, and #114452. These PRs addressed various issues such as broken navigation links, missing icons, and incorrect tool-call logic. They have also improved the agent's memory management and allowed for more accurate reassignment of tasks.

Community Hot Topics: The most active Issues and PRs with the most comments/reactions are related to breaking changes in the agent's UI. One notable issue is #11359, which was caused by a change in the way navigation links are displayed. Another issue, #114252, addresses the lack of a Kanban reassign/archive tool in the catalog, which was causing coordinator fence gaps.

Bugs & Stability: Today, no bugs were reported. However, it's essential to note that we have already fixed several bugs reported by users in PRs like #114057, #114252, and #114452. These fixes address common issues such as broken links, missing icons, and incorrect tool-call logic.

Feature Requests & Roadmap Signals: As of now, there are no new feature requests or roadmap signals mentioned in the community discussions. However, we are continuously monitoring user feedback and considering potential features for future versions.

User Feedback Summary: Based on user feedback, the most common pain points include broken navigation links and missing icons. Some users have also expressed frustration with the agent's memory management and task reassignment process. Overall, users seem satisfied with the current state of the agent but are looking forward to improvements in these areas.

Backlog Watch: There are several long-unanswered important Issues (#11359, #114057, #114252, and #114452) and PRs (#11359, #114057, #114252, and #114452) that require maintainer attention. These issues range from navigation link issues to memory management problems and need urgent resolution to ensure smooth user experience.

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



# IronClaw Project Digest — 2026-09-18

## 1. Today's Overview

IronClaw activity on 2026-09-18 remains minimal, with only one issue updated in the past 24 hours and no new pull requests or releases. The project's sole daily activity centers on Issue #8101, a recurring failure taxonomy report tracking non-passing tasks from the officeqa benchmark suite. No merged or closed PRs were recorded today, and no new releases were published. Overall, the project appears to be in a low-velocity maintenance phase, with automated benchmark reporting serving as the primary contributor workflow.

---

## 2. Releases

No new releases were published in the last 24 hours.

---

## 3. Project Progress

- **Merged PRs today:** 0
- **Closed PRs today:** 0

No features or fixes were advanced today. The absence of merged pull requests suggests the current development cycle is either between milestones or waiting on review cycles.

---

## 4. Community Hot Topics

**#8101 — Daily ironclaw failure taxonomy — 2026-09-17**
- Author: [@pranavraja99](https://github.com/pranavraja99)
- [View on GitHub](https://github.com/nearai/ironclaw/issues/8101)
- Comments: 0 | 👍: 0

This is the only issue from the last 24 hours. It continues the daily automated failure taxonomy for the officeqa benchmark suite, reporting **35 non-pass tasks** from a DeepSeek-V4-Flash run. While currently low-engagement, this recurring issue reflects an active benchmarking and quality-assurance workflow. The underlying need it serves is **systematic model-evaluation tracking** — helping the team identify regression patterns across benchmark runs.

---

## 5. Bugs & Stability

No bug reports, crashes, or regressions were filed today.

- The officeqa suite's 35 non-pass tasks in Issue #8101 are characterized as **genuine model-quality errors** rather than IronClaw framework defects, suggesting the issues reside in the evaluated model (DeepSeek-V4-Flash) rather than in IronClaw itself.
- No fix PRs are associated with today's issues.

---

## 6. Feature Requests & Roadmap Signals

No explicit feature requests were submitted today. The recurring daily failure taxonomy reports indicate an ongoing commitment to **automated benchmark reporting and model-evaluation infrastructure**, which may signal a roadmap direction toward more granular, automated QA pipelines.

---

## 7. User Feedback Summary

- **Primary feedback channel today:** Automated benchmark reporting (Issue #8101).
- **User sentiment:** No direct user complaints or praise reported today. The benchmark data indicates that DeepSeek-V4-Flash's performance on officeqa tasks contains meaningful failure patterns warranting attention.
- **Use cases surfaced:** Agent benchmarking and evaluation via the officeqa suite remain central to the project's operational focus.

---

## 8. Backlog Watch

No long-unanswered issues were identified in the 24-hour window. However, the **recurring nature** of the daily failure taxonomy suggests a sustained backlog of benchmark-driven issues that may accumulate over time. Maintainers should monitor whether these daily reports transition into actionable fix PRs or remain as observational tracking items.

---

**Project Health Assessment:** Low activity day. Benchmarking pipeline is operational; no regressions or release activity to flag. The team's focus appears to be on evaluation and monitoring rather than feature development at this time.

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

# Moltis Project Digest: 2026-09-18

## 1. Today's Overview
Activity on the Moltis project remains stable but low, with no new releases detected today. The project saw a total of 4 updates across Issues and Pull Requests, indicating standard maintenance cycles. While the volume of work is modest, the focus appears to be on refining sandboxing capabilities and correcting configuration parsing logic to ensure robust agent execution.

## 2. Releases
**None.** No new versions were released within the last 24 hours.

## 3. Project Progress
No Pull Requests were merged or closed today. The active development focus is currently on two open Pull Requests that are advancing infrastructure and reliability:

*   **Agent Sandbox Hardening (PR #1272):** This feature PR is moving forward to enhance security and isolation by introducing per-agent configuration knobs. It introduces `sandbox.mounts` for extra host bind mounts, `sandbox.run_as` to define specific `uid:gid` execution contexts, and `sandbox.force` to enforce strict sandboxing for specific agents.
*   **Cron Logic Correction (PR #1262):** A bug fix PR is addressing a critical parsing issue in the cron active hours logic. It corrects the handling of the `end="24:00` edge case, which was failing due to a parsing order conflict, ensuring agents respect their configured time windows accurately.

## 4. Community Hot Topics
The community is currently focused on specific technical hurdles regarding build environments and security features.

*   **Nix Build System Failure (Issue #1273):** Users are reporting a failure to build the project using the Nix flake system at the latest tag (`20260913.02`). The primary blocker is a mismatch in vendored crate hashes (`wacore`, `zvec-rust`) and a lack of complete `cargoLock` entries.
    *   *Link:* [Issue #1273](https://github.com/moltis-org/moltis/issues/1273)
*   **WASM Web Search Enhancement (Issue #1274):** A feature request is open regarding the preflight search hop for the Moltis wasm-web-search module. This suggests a need to optimize or secure the search workflow within the WebAssembly module.
    *   *Link:* [Issue #1274](https://github.com/moltis-org/moltis/issues/1274)

## 5. Bugs & Stability
**Severity: Medium**
*   **Cron Time Window Parsing (Issue #1262 context):** While not a new report today, the underlying bug causing cron active hours to fail at `end="24:00"` is a stability concern for agents relying on scheduled execution. The fix is currently in review (PR #1262).

**Severity: High**
*   **Nix Flake Build Breakage (Issue #1273):** The inability to build the latest published tag prevents users from reproducing the environment reliably. This is a significant stability blockage for users relying on the Nix package manager.

## 6. Feature Requests & Roadmap Signals
*   **Sandbox Isolation:** The community is actively pushing for more granular sandbox controls. The request for `sandbox.force` (enforcing sandboxing) and per-agent mounts indicates a roadmap trend toward **zero-trust execution** and strict resource isolation.
*   **WASM Search Optimization:** The request for a "prepaid search hop" in wasm-web-search suggests the project is looking to optimize external API calls or data retrieval strategies within the WebAssembly runtime.

## 7. User Feedback Summary
Users are expressing frustration with **environment reproducibility**. The inability to build the latest release via Nix flake highlights a gap between development (tags) and deployment (buildability). Additionally, users are asking for more control over execution contexts, specifically the ability to force sandboxing and define user contexts (`uid:gid`) to align with security policies.

## 8. Backlog Watch
*   **Nix Flake Maintenance:** Issue #1273 has been open for a day. Maintainers need to update `flake.nix` to include the missing vendored crate hashes (`wacore-0.6.0`, `zvec-rust-0.6.0`) to restore build stability.
*   **WASM Search Architecture:** Issue #1274 is a new enhancement request that will likely require architectural changes to the web search module.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest
**Date:** 2026-09-18
**Project:** ZeptoClaw (github.com/qhkm/zeptoclaw)

### 1. Today's Overview
Activity on the ZeptoClaw repository has been **moderate and focused on maintenance and security**. The project handled 5 issues and 6 pull requests in the last 24 hours, with a high volume of dependencies being updated and critical security patches being applied. While there are no new feature releases, the team is actively stabilizing the codebase by removing legacy CI infrastructure and hardening tool schemas against security vulnerabilities.

### 2. Releases
**None.** There are no new releases available as of 2026-09-18.

### 3. Project Progress
*   **Security & Dependency Hygiene:** The primary focus of the merged PRs was dependency management. Three dependency updates were merged successfully, including a critical upgrade of **Rustls to version 0.23.45** to address the security advisory **RUSTSEC-2026-0285**, unblocking cargo deny and security audits.
*   **Infrastructure Simplification:** In response to user feedback, the project removed all GitHub Actions CI checks. This change simplifies the maintenance burden by disabling CI, E2E, and PR hygiene workflows, shifting validation responsibility to local environments.
*   **Tooling Hardening:** Work began on sanitizing tool JSON schemas to improve robustness for strict and local AI backends.

### 4. Community Hot Topics
*   **Security Patch (Rustls):** Issue #697 and PR #692 are the most critical topics. The project is currently blocked on security audits due to a vulnerable Rustls dependency. The maintainer has successfully patched this to version 0.23.45.
    *   [Issue #697](https://github.com/qhkm/zeptoclaw/issues/697)
    *   [PR #692](https://github.com/qhkm/zeptoclaw/pull/692)
*   **Tool Schema Sanitization:** Issue #698 and PR #701 introduce a new feature to sanitize tool JSON schemas. This addresses a gap in handling weak local models and strict backends.
    *   [Issue #698](https://github.com/qhkm/zeptoclaw/issues/698)
    *   [PR #701](https://github.com/qhkm/zeptoclaw/pull/701)

### 5. Bugs & Stability
*   **Severity: High (Security)**
    *   **Rustls Vulnerability:** All 18 current Dependabot PRs were failing due to Rustls 0.23.39 being affected by RUSTSEC-2026-0285. A fix has been applied via PR #692 (Closed).
*   **Severity: High (Infrastructure)**
    *   **CI Removal:** The project is undergoing a significant structural change where GitHub Actions CI workflows are being removed entirely. This is a breaking change for contributors who rely on automated testing but is being accepted by the user base.

### 6. Feature Requests & Roadmap Signals
*   **Tool Schema Coercion:** There is a clear roadmap signal to improve the robustness of "Tool Calling" (function calling) features. Specifically, the project aims to sanitize schemas and coerce arguments for "local" providers (like Ollama) and "strict" backends to prevent crashes or invalid responses when models are weak or non-compliant.
*   **Binary Size Optimization:** While not a new request, Issue #629 highlights the strategic goal of keeping the binary size under 7MB for ARM64 targets (robots/embedded), though current reality sits closer to 10.5MB for x86_64.

### 7. User Feedback Summary
The user base is requesting a **shift from automated CI to manual/local validation**. By explicitly requesting the removal of GitHub Actions CI checks, users are signaling a preference for a leaner project that relies on the user's local environment for validation rather than repository automation. This suggests a desire for simplicity and reduced overhead in contribution.

### 8. Backlog Watch
*   **Binary Size Gate (Issue #629):** This is a long-standing issue (last updated June 2026) regarding the binary size gate for aarch64. While the motivation is valid, the issue remains unresolved, indicating a potential long-term technical debt regarding optimization for embedded targets.
*   **Integration Feature Compilation (Issue #545):** This issue (from April 2026) identified that optional integration features are not compiled during normal PR CI. This may still be a source of silent bugs or drift in feature parity.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*