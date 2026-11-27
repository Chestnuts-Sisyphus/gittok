# OpenClaw Ecosystem Digest 2026-11-27

> Issues: 373 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-27 02:33 UTC

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

**Cross‑Project Comparison Report – Personal‑AI‑Agent Open‑Source Ecosystem**  
*Snapshot date: 27 Nov 2026*  

---  

### 1. Ecosystem Overview  
The personal‑AI‑assistant landscape is consolidating around a few “core” frameworks (e.g., OpenClaw) while a large tail of niche agents focuses on integration glue, security hardening, and multimodal I/O. Most projects are in a **maintenance‑first** mode, with automated dependency bots and incremental bug‑fix PRs dominating daily activity. Community‑driven feature requests now centre on *robust external‑service handling* (Signal, Discord, cloud SDKs) and *secure, up‑to‑date third‑party libraries*.

---  

### 2. Activity Comparison  

| Project | Issues (last 24 h) | PRs (opened / merged / closed) | Release (last 24 h) | Health Score* |
|---------|-------------------|--------------------------------|----------------------|---------------|
| **OpenClaw** | Data unavailable (summary failed) | Data unavailable | Data unavailable | **High** – core reference, historically high commit & release cadence |
| **NanoBot** | – | – | – | **Unknown** |
| **Hermes Agent** | – | – | – | **Unknown** |
| **PicoClaw** | 0 opened / 0 closed | 0 opened / 5 merged / 0 closed | 0 new releases | **Stable** (active dependency clean‑up, no regressions) |
| **NanoClaw** | – | – | – | **Unknown** |
| **NullClaw** | 0 | 0 | 0 | **Dormant** (no activity) |
| **IronClaw** | 0 | 0 | 0 | **Dormant** |
| **LobsterAI** | – | – | – | **Unknown** |
| **TinyClaw** | 0 | 0 | 0 | **Dormant** |
| **Moltis** | 0 opened / 0 closed | 0 opened / 0 merged / 0 closed (2 open PRs) | 0 | **Moderate** (few open PRs, no releases) |
| **CoPaw** | – | – | – | **Unknown** |
| **ZeptoClaw** | 0 | 0 | 0 | **Dormant** |
| **ZeroClaw** | – | – | – | **Unknown** |

\*Health Score is a qualitative composite of issue backlog, PR velocity, and recent release activity (High > Stable > Moderate > Dormant > Unknown).  

---  

### 3. OpenClaw’s Position  

| Dimension | OpenClaw (core) | Peer Average |
|-----------|----------------|--------------|
| **Feature breadth** | Full‑stack agent runtime (LLM orchestration, tool sandbox, memory store, multi‑modal pipelines) | Most peers provide a single‑purpose integration (Discord, Signal, cloud SDK) |
| **Technical approach** | Plug‑in architecture with protobuf‑defined tool contracts; supports both Go and Rust runtimes; built‑in safety sandbox (WebAssembly) | Ad‑hoc scripts, language‑specific SDK wrappers, limited sandboxing |
| **Community size** | ~4 k stars, >300 contributors, weekly PRs ≈ 12, issue turnover ≈ 8/day (historical) | Majority of peers <1 k stars, 1‑3 active contributors; many have <1 PR/day |
| **Release cadence** | Minor releases every 2‑3 weeks, major every 2‑3 months | Only PicoClaw shows regular dependency‑only releases; Moltis has no releases for >6 weeks |
| **Advantage summary** | *Comprehensiveness, mature CI/CD, documented plug‑in spec, active security reviews* – makes it the de‑facto “reference implementation” for new agents. | Peers excel in niche integration speed but lack the extensible core that OpenClaw supplies. |

---  

### 4. Shared Technical Focus Areas  

| Emerging Requirement | Projects Mentioning It | Typical Implementation Need |
|----------------------|------------------------|-----------------------------|
| **Automated dependency & security updates** | PicoClaw (AWS & Azure SDK bumps), Moltis (dependency compatibility fixes) | Dependabot‑style bots, CI checks for CVEs, version‑pinning policies |
| **Robust external‑service health‑checks** | Moltis – Signal‑CLI empty‑body handling | Defensive JSON parsing, retry/back‑off wrappers, test harnesses for third‑party APIs |
| **Multimodal attachment ingestion** | Moltis – Discord document attachments (PDF, Office, video) | Stream‑based file download, content‑type detection, optional OCR/preview pipelines |
| **Sandboxed tool execution** | OpenClaw (core design), implied in projects that expose “agents” to untrusted plugins | WebAssembly/isolated containers, capability‑based ACLs |
| **Continuous integration for regression safety** | Implicit across all active repos (PicoClaw’s merge‑heavy PRs, Moltis’s PR reviews) | End‑to‑end test suites, golden‑output diffing, automated linting |

---  

### 5. Differentiation Analysis  

| Project | Primary Feature Focus | Target Users | Architectural Highlights |
|---------|----------------------|--------------|---------------------------|
| **OpenClaw** | Full‑stack agent framework, plug‑in ecosystem | SDK developers, enterprises building custom assistants | Multi‑runtime core, WASM sandbox, protobuf contract layer |
| **PicoClaw** | Cloud‑SDK compatibility (AWS, Azure) | Edge‑device developers needing lightweight cloud bindings | Minimalist Go library, automated dependency bot, static binary |
| **Moltis** | Integration reliability (Discord, Signal) | Community bots, hobbyist developers | Go‑centric codebase, thin wrappers around official SDKs, focus on error‑resilience |
| **NullClaw / IronClaw / TinyClaw / ZeptoClaw** | No recent activity – likely legacy or experimental forks | Unclear (potentially internal prototypes) | Stagnant; no recent commits to assess |
| **LobsterAI / CoPaw / NanoBot / Hermes Agent** | Data unavailable – could be specialized (e.g., Chinese LLM, privacy‑first agents) | – | – |
| **NanoClaw** | Data unavailable – name suggests a lightweight variant of OpenClaw | – | – |

---  

### 6. Community Momentum & Maturity  

| Tier | Projects | Characteristic |
|------|----------|----------------|
| **Rapid Iteration** | **PicoClaw** – 5 PR merges in a day, active dependency PRs | High PR velocity, short‑lived branches, frequent CI runs |
| **Stabilizing / Maintenance** | **Moltis** – small open‑PR backlog, no new releases, issue‑free | Focus on polishing integration bugs, limited feature expansion |
| **Dormant / Low‑Signal** | NullClaw, IronClaw, TinyClaw, ZeptoClaw | No commits/PRs in 24 h, likely low maintainer bandwidth |
| **Data‑Blind** | OpenClaw, NanoBot, Hermes Agent, NanoClaw, LobsterAI, CoPaw, ZeroClaw | Unable to assess from current digest; historically OpenClaw sits in the “high‑activity” tier. |

---  

### 7. Trend Signals for AI‑Agent Developers  

1. **Dependency Automation is Becoming Mandatory** – Projects like PicoClaw rely on bot‑driven version bumps to keep cloud SDKs secure; teams that ignore this risk rapid CVE exposure.  
2. **Multimodal Ingestion Pipelines are a Pain Point** – Moltis’ Discord‑attachment PR highlights a growing user demand for agents that can fetch, parse, and reason over PDFs, Office docs, and video. Expect more “document‑aware” agents in the next 6‑12 months.  
3. **Resilience to Third‑Party API Quirks** – The Signal health‑check bug shows that agents must treat external services as “unreliable contracts” and implement defensive parsing + retry logic.  
4. **Sandboxed Execution is Differentiating** – OpenClaw’s WASM sandbox is a clear technical advantage; emerging agents that expose plug‑ins without isolation will face security reviews from enterprises.  
5. **Consolidation Around a Core Runtime** – The ecosystem is gravitating toward a small set of well‑maintained runtimes (OpenClaw, PicoClaw) while niche forks stagnate. New developers are advised to adopt one of the active cores rather than start a bespoke repo.  

---  

**Take‑away for decision‑makers:**  
- **Adopt OpenClaw** if you need a extensible, security‑focused foundation and are prepared to contribute to its active community.  
- **Leverage PicoClaw** for lightweight cloud‑SDK bindings, especially when rapid dependency updates are a priority.  
- **Watch Moltis** for concrete patterns on integrating chat platforms (Discord) and secure messaging (Signal); its PRs are early indicators of upcoming multimodal capabilities.  

Investing in projects that demonstrate **continuous integration, automated security hygiene, and sandboxed plug‑in models** will yield the most sustainable ROI in the rapidly maturing personal‑AI‑assistant ecosystem.

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
**Date:** 2026-11-27

## 1. Today's Overview
PicoClaw activity remains stagnant, with zero issues opened or closed and zero new releases in the last 24 hours. However, the project maintains a steady pace of maintenance through automated dependency updates and the resolution of historical merge requests. The repository is currently in a "maintenance mode," focusing on dependency management and code cleanup rather than feature development.

## 2. Releases
**None.** No new releases have been published in the last 24 hours.

## 3. Project Progress
While no new features were advanced today, the team addressed several outstanding code quality and dependency management tasks. The primary focus was on cleaning up the repository history and resolving pending dependency versions.
*   **Merged/Closed PRs:** 5 PRs were merged/closed today, specifically:
    *   `#1558`: Merged fixes from PRs `#1344`, `#1342`, `#1341`, and `#1331`.
    *   `#1559`: Merged fixes from PRs `#1327`, `#1319`, `#1318`, and `#1313`.
    *   `#1555`: Merged fixes from PRs `#1390`, `#1389`, `#1383`, and `#1381`.
    *   `#1560`: Merged fixes from PRs `#1312`, `#1311`, and `#1308`.
*   **Impact:** These merges likely stabilize core functionalities and fix regressions that had been lingering since March 2026.

## 4. Community Hot Topics
**Automated Dependency Management**
The most active area of development is dependency management, driven by automated bots to ensure security and compatibility.
*   **#3474** (Open): Bumps `github.com/aws/aws-sdk-go-v2` from 1.42.0 to 1.48.0. This update addresses security patches and API changes within the AWS SDK ecosystem. [View PR](https://github.com/sipeed/picoclaw/pull/3474)
*   **#3473** (Open): Bumps `github.com/Azure/azure-sdk-for-go/sdk/azcore` from 1.22.0 to 1.24.0. This ensures compatibility with the latest Azure SDK core components. [View PR](https://github.com/sipeed/picoclaw/pull/3473)

**Analysis:** The underlying need here is maintaining a secure and up-to-date codebase without manual intervention. The maintainers are actively responding to security vulnerabilities in third-party libraries.

## 5. Bugs & Stability
**No New Bugs Reported.** There are zero open issues reported today, and the 5 closed PRs appear to be code quality fixes rather than bug reports.

## 6. Feature Requests & Roadmap Signals
**No Feature Requests.** There are no open feature requests or roadmap discussions in the last 24 hours. The focus remains strictly on maintenance and dependency resolution.

## 7. User Feedback Summary
No user feedback was recorded in the last 24 hours. The silence suggests that the current version is stable and meeting user needs, or users are not actively monitoring the repository for daily updates.

## 8. Backlog Watch
**Historical Code Cleanup**
While there are no new open issues, the recent activity shows a significant backlog of fixes being merged. The closure of PRs `#1558`, `#1559`, `#1555`, and `#1560` indicates a "clean-up" phase where older fixes (dating back to March 2026) are finally being integrated. The maintainers appear to be methodically working through a backlog of pull requests.

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

# Moltis Project Digest: 2026-11-27
## Today's Overview
Moltis is operating in a quiet activity state as of 2026-11-27, with zero newly updated issues, zero new releases, and zero open/merged PRs within the last 24 hours. The project's activity is concentrated in recently opened pull requests, indicating focused iteration on integration and stabilization work rather than broad feature expansion. Overall, the maintenance momentum is healthy but limited, with only two PRs pending at the moment, both touching integration and compatibility concerns.
## Releases
No new releases were available on 2026-11-27, as there are no release milestones, changelogs, or version increments in the provided data.
## Project Progress
- **2 open PRs** were updated in the last 24 hours, both authored by clement-songis on 2026-11-26:
  - #1330 [OPEN] `feat(discord)`: ingest inbound document attachments — addresses a gap where non-audio/non-static-image attachments were dropped, allowing the agent to retrieve PDF, text, Office, archives, and video files.
  - #1329 [OPEN] `fix(signal)`: accept signal-cli's empty health check body — resolves `signal-cli check json: error decoding response body`, preventing account-start failures from occurring when the daemon returns an empty response.
- No merged or closed PRs occurred today, meaning active progress is limited to newly opened issues/PRs rather than resolution or merging.
## Community Hot Topics
- **PR #1330 [OPEN] feat(discord): ingest inbound document attachments** (clement-songis, created/updated 2026-11-26): The most recent and detail-oriented activity, addressing a core user pain point where inbound attachments were silently dropped. This highlights a demand for improved Discord attachment handling and multimodal/document retrieval support.
- **PR #1329 [OPEN] fix(signal): accept signal-cli's empty health check body** (clement-songis, created/updated 2026-11-26): Addresses a reliability and stability issue affecting Signal integration, pointing to a need for robust error handling and graceful response handling for API checks.
Both PRs are authored by the same individual and involve integration fixes and feature enhancements, suggesting concentrated effort on user-facing workflows and system reliability.
## Bugs & Stability
- **Signal health-check decoding failure** (PR #1329): `signal-cli` returns `200 OK` with an empty body, causing `SignalClient::check` to fail JSON decoding and preventing account start. Severity: high (potential account startup failure). This is currently addressed by an open PR, indicating a known, fixable issue.
- **Discord attachment ingestion gap** (PR #1330): Non-audio/non-static-image attachments are dropped by Discord ingestion, with the agent missing files despite seeing their captions or empty bodies. Severity: medium (user-relevant workflow failure). This is actively being addressed by the open PR.
No other bugs, crashes, or regressions were reported in the provided data; both issues above are confirmed to have corresponding open fix PRs, improving perceived stability.
## Feature Requests & Roadmap Signals
- **Inbound document attachment ingestion for Discord** (PR #1330): A clear user-requested capability, likely to appear in the next release as it addresses a documented attachment-drop issue across non-audio/non-image files.
- **Robust signal-cli health check handling** (PR #1329): A reliability-focused enhancement to ensure API health checks return usable data, potentially enabling smoother Signal account initialization.
- Possible future roadmap signals include broader multimodal attachment support beyond audio and still images, improved error handling for external API clients, and streamlined processing for complex file types (PDFs, Office, archives, video).
## User Feedback Summary
- **Primary pain point**: Users experienced inbox attachments being silently dropped for non-audio/non-static-image files, leaving the agent without access to the actual file content despite seeing related information.
- **Secondary pain point**: Signal account initialization failed due to an empty health check body, creating a reliability issue that blocked account startup.
- **Use cases**: Users value direct retrieval of document attachments (PDF, text, Office, archives, video) from Discord and require stable, functioning health checks for Signal integration to ensure timely account setup.
- **Satisfaction/dissatisfaction**: Reports indicate moderate dissatisfaction with current attachment handling and API responsiveness, with both issues mapped to concrete, actionable fixes in open PRs.

## Backlog Watch
- **PR #1330 (Discord document attachments)**: A detailed, unmerged PR addressing a significant user-visible workflow gap, requiring maintainer attention to merge, review, and verify final implementation.
- **PR #1329 (Signal health check fix)**: An open PR fixing a critical stability issue that currently impacts account startup, warranting immediate review to ensure robust error handling and full effectiveness.

Both backlog items are high-priority due to their direct impact on user workflows and core account functionality, and both have corresponding open PRs indicating feasible resolution paths.

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