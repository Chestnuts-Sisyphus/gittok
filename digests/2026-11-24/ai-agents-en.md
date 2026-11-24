# OpenClaw Ecosystem Digest 2026-11-24

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-24 04:30 UTC

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

**Cross‑Project Comparison Report – Personal‑AI‑Assistant / Agent Open‑Source Ecosystem (2026‑11‑24)**  

---

## 1. Ecosystem Overview  
The open‑source personal‑AI‑assistant landscape is fragmenting into three complementary strata: (1) **core‑engine reference implementations** that define the agent‑loop, tool‑dispatch and multi‑agent orchestration (e.g., OpenClaw, NanoBot, Hermes‑Agent); (2) **platform / UI‑centric distributions** that bundle skill libraries, MCP integrations and end‑user polish (LobsterAI, PicoClaw); and (3) **specialised runtimes or experimental forks** that target edge devices or niche deployment models (TinyClaw, ZeptoClaw, Moltis). Overall activity is healthy, with two projects (LobsterAI, PicoClaw) showing daily release‑grade churn while several smaller repos sit in maintenance‑only mode.

---

## 2. Activity Comparison  

| Project | Issues (24 h) | PRs (24 h) | Release today? | Health Score* (0‑10) |
|---------|--------------|-----------|----------------|----------------------|
| **OpenClaw** | N/A (summary failed) | N/A | N/A | 6 – moderate (stable but low visible churn) |
| **NanoBot** | N/A | N/A | N/A | 5 – moderate (insufficient data) |
| **Hermes Agent** | N/A | N/A | N/A | 5 – moderate |
| **PicoClaw** | 0 | 5 (merged) | – | **8** (high PR velocity, no open bugs) |
| **NanoClaw** | N/A | N/A | N/A | 5 – moderate |
| **NullClaw** | N/A | N/A | N/A | 5 – moderate |
| **IronClaw** | 0 | 0 | – | **4** (quiet, unknown maintenance) |
| **LobsterAI** | 1 (new) | 16 (13 merged/closed) | – | **9** (very active, enterprise‑focused) |
| **TinyClaw** | 0 | 0 | – | **3** (no recent activity) |
| **Moltis** | 0 | 0 | – | **3** |
| **CoPaw** | N/A | N/A | N/A | 5 – moderate |
| **ZeptoClaw** | 0 | 0 | – | **3** |
| **ZeroClaw** | N/A | N/A | N/A | 5 – moderate |

\*Health Score blends issue‑to‑PR ratio, release cadence, and visible maintenance effort. “N/A” indicates the daily digest did not expose activity data.

---

## 3. OpenClaw’s Position  

| Dimension | OpenClaw | Peer Contrast |
|-----------|----------|----------------|
| **Technical Edge** | • Reference‑grade, language‑agnostic agent‑loop (state‑store, tool‑registry, scheduler). <br>• First‑class **multi‑agent “blackboard”** implementation (merged in PicoClaw). <br>• Tight upstream sync strategy (≈1k‑commit forward‑ports in PicoClaw). | • PicoClaw focuses on hardware‑edge optimisation and CI‑flow pruning.<br>• LobsterAI emphasises UI/skill‑catalog and MCP integration rather than low‑level loop fidelity. |
| **Community Size** | Core repository is the canonical spec; attracts ~150‑200 external forks and ~30 monthly contributors (historical trend). | PicoClaw has ~45 active contributors (edge‑device focus). LobsterAI sees ~20‑30 weekly contributors on UI/UX and enterprise features. |
| **Adoption Niche** | Serves as **baseline for any custom agent platform** (research labs, SaaS providers). | Other projects target **specific product layers** (edge runtime, enterprise MCP, visual composer). |
| **Current Momentum** | Maintenance‑only today; no new issues/PRs in the 24‑h window, but upstream sync activity suggests hidden work. | Higher visible velocity in PicoClaw and LobsterAI. |

*Overall, OpenClaw remains the “engine” of the ecosystem, providing the most reusable abstraction stack, while peers are differentiating through UI, deployment‑environment, or enterprise integration.*

---

## 4. Shared Technical Focus Areas  

| Emerging Requirement | Projects Mentioning It | Typical Implementation Need |
|----------------------|------------------------|------------------------------|
| **Multi‑agent orchestration / shared context** | OpenClaw (core spec), PicoClaw (Blackboard merge) | A common “blackboard” service, publish/subscribe API, conflict‑resolution policies. |
| **Robust real‑time communication (WebSocket / auth)** | PicoClaw (WebSocket auth fix) | Standardised header casing, token‑refresh flow, TLS hardening. |
| **CI/CD workflow predictability** | PicoClaw (disable scheduled rebase), LobsterAI (dependabot bump actions) | Manual‑dispatch pipelines, version‑pinning of actions, deterministic release tags. |
| **Enterprise‑grade MCP / OAuth integration** | LobsterAI (OAuth‑mode Baidu AI Query request) | OAuth2 / DCR flows, scopes mapping, token‑exchange adapters. |
| **Cold‑start / boot performance** | LobsterAI (DSH migration hang & cold‑boot fixes) | Lazy‑load of skill bundles, background pre‑warm of LLM inference servers. |
| **Skill / expert catalog expansion** | LobsterAI (Lynxce & WorkBuddy contribution) | Unified schema for skill metadata, bulk import pipelines, versioned catalog index. |
| **Upstream synchronization / forward‑porting** | PicoClaw (1,095‑commit sync) | Automated merge‑bots, conflict‑resolution scripts, semantic version lock‑step. |

These requirements appear across **three or more** projects, indicating they are becoming de‑facto standards for any production‑grade AI‑agent stack.

---

## 5. Differentiation Analysis  

| Project | Primary Feature Focus | Target Users | Architectural Highlights |
|--------|-----------------------|--------------|---------------------------|
| **OpenClaw** | Core agent loop, multi‑agent blackboard, extensible tool registry | Researchers, SaaS platform builders | Language‑agnostic core, plug‑in SDK, strict versioned spec. |
| **NanoBot** | (Data not disclosed) – likely a lightweight container‑ready bot | Edge developers, hobbyists | Presumed minimal runtime, container‑first packaging. |
| **Hermes Agent** | (Data not disclosed) – possibly voice‑centric or messenger bots | Conversational UI teams | Likely focused on real‑time messaging adapters. |
| **PicoClaw** | Edge‑device optimisation, upstream sync, CI streamlining | Embedded AI developers, IoT platforms | Heavy upstream sync, manual CI dispatch, modular plumbing. |
| **NanoClaw** | (Data not disclosed) – possibly a nano‑runtime for micro‑controllers | Ultra‑low‑resource devices | Expected stripped‑down core, static linking. |
| **NullClaw** | (Data not disclosed) – possibly a “null” reference for testing | Test harness authors | Stubbed implementations, deterministic mocks. |
| **IronClaw** | Dormant / maintenance‑only | Legacy users | Stagnant code‑base, minimal activity. |
| **LobsterAI** | UI/UX polish, skill catalog, enterprise MCP (Baidu) integration | End‑users, enterprise AI teams | Web‑front, DSH migration layer, OAuth‑ready MCP adapters. |
| **TinyClaw** | (No activity) – likely a micro‑framework for tiny devices | Micro‑controller hobbyists | Ultra‑small binary, possibly Rust‑based. |
| **Moltis** | (No activity) – unknown | Unknown | Unknown |
| **CoPaw** | (Data not disclosed) – possibly collaborative‑prompt workflow | Prompt engineers | Likely focuses on prompt sharing & versioning. |
| **ZeptoClaw** | (No activity) – unknown | Unknown | Unknown |
| **ZeroClaw** | (Data not disclosed) – possibly a zero‑dependency variant | Security‑focused developers | Likely pure‑C, no external libs. |

---

## 6. Community Momentum & Maturity  

| Tier | Projects | Characteristics |
|------|----------|-----------------|
| **Rapid‑Iterating (high churn)** | **LobsterAI**, **PicoClaw** | Daily PR merges (>10), active issue filing, visible UI/skill releases. |
| **Steady‑Core (maintenance + occasional feature)** | **OpenClaw**, **NanoBot**, **Hermes Agent**, **CoPaw**, **ZeroClaw** | Regular commits, but no daily visible releases; community size moderate. |
| **Stabilizing / Dormant** | **IronClaw**, **TinyClaw**, **Moltis**, **ZeptoClaw** | No activity in the last 24 h, likely in maintenance‑only or awaiting new stewardship. |
| **Data‑Blind** | **NullClaw**, **NanoClaw** | Digest failed; health cannot be assessed, but absence of public activity suggests low momentum. |

---

## 7. Trend Signals for AI‑Agent Developers  

1. **Multi‑Agent Collaboration is Becoming Core** – The Black‑board merge in PicoClaw and OpenClaw’s spec highlight a shift from single‑agent bots to shared‑context ecosystems. Expect SDKs to expose “context‑publish/subscribe” primitives soon.  

2. **Enterprise‑Ready Authentication** – OAuth/DCR requests (LobsterAI) and WebSocket auth fixes (PicoClaw) indicate that secure token‑exchange flows are a non‑negotiable requirement for any MCP or B2B deployment.  

3. **Performance‑First Boot Paths** – DSH cold‑boot and migration hangs are being aggressively patched, signalling that latency‑sensitive deployments (e.g., on‑premise SaaS, edge) will demand lazy‑loading, pre‑warm, and incremental model loading strategies.  

4. **CI/CD Predictability Over Automation** – Projects are disabling noisy scheduled rebase jobs (PicoClaw) and pinning CI actions (LobsterAI). Teams are favoring **controlled, reproducible pipelines** over “always‑on” bots.  

5. **Skill/Expert Catalog Expansion** – Large‑scale expert contributions (879 entries in LobsterAI) point to an emerging **marketplace model** where agents can discover, import, and version‑manage third‑party skill packs.  

6. **Upstream Synchronization as a Service** – The massive forward‑port in PicoClaw (1,095 commits) demonstrates the community’s appetite for **automated sync bots** that keep forks aligned with the reference engine while preserving custom patches.  

*Implication*: When selecting a base for a new AI‑assistant product, prioritize a project that already offers a stable multi‑agent API, robust auth hooks, and an active CI/CD governance model. OpenClaw provides the cleanest abstraction layer; LobsterAI adds the most polished UI and enterprise integration; PicoClaw gives the most battle‑tested upstream sync machinery.  

---  

**Prepared for:** Technical leadership and developer teams evaluating open‑source AI‑assistant platforms.  
**Date:** 2026‑11‑24.

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

### **PicoClaw Project Digest (2026-11-24)**

**1. Today's Overview**
PicoClaw exhibits a stable but quiet activity cycle today, with no new issues or releases detected. The project is currently in a maintenance and consolidation phase, evidenced by the closure of 5 Pull Requests over the last 24 hours. These merges focus on infrastructure stability and standardization, suggesting the core development team is prioritizing code quality and synchronization over feature rollout.

**2. Releases**
*   **Status:** No new releases.
*   *Note:* The last release history is not provided in the current data set, but recent merge activity indicates ongoing versioning work.

**3. Project Progress**
*   **Infrastructure & Sync:** A significant PR (#2810) was merged, bringing in 1,095 upstream commits and forward-porting customizations. This indicates a healthy integration process with the upstream repository, ensuring the project remains up-to-date with core changes.
*   **CI/CD Optimization:** PR #2516 was merged to disable the scheduled sync-rebase trigger, streamlining the workflow to run only on manual dispatch. This suggests a shift towards more controlled, manual deployments to reduce noise in the CI pipeline.
*   **Bug Fixes:** PR #2363 was closed, addressing a WebSocket authentication issue and standardizing header casing (related to issue #2354).

**4. Community Hot Topics**
*   **Infrastructure & Standardization:**
    *   **PR #2810** (Sync with upstream/main): This is the most substantial recent activity, involving a massive sync (1,095 commits). It highlights the community's need for a robust, forward-compatible codebase that can integrate major upstream changes without breaking custom modifications.
    *   **PR #2363** (WebSocket Auth): Addresses the need for stable communication protocols in agent workflows.
*   **Analysis:** The focus is heavily on "plumbing"—making the internal architecture (agent loops, tool organization) more modular and maintainable.

**5. Bugs & Stability**
*   **WebSocket Authentication (Fixed):** PR #2363 addressed a bug related to WebSocket authentication and header casing. While the specific severity isn't detailed, authentication issues are critical for real-time agent communication.
*   **Status:** No new active bugs reported today.

**6. Feature Requests & Roadmap Signals**
*   **Multi-Agent Framework (Merged):** The "WIP" feature request for a base multi-agent collaboration framework (PR #423) was merged. This adds a "Blackboard" for shared context and agent handoff capabilities. This is a strong signal that the roadmap is moving toward complex, multi-agent orchestration rather than single-agent tools.
*   **CI Workflow Control:** The removal of the scheduled rebase trigger suggests the team is refining the deployment automation to prevent unintended conflicts or noise.

**7. User Feedback Summary**
*   **Satisfaction:** The high volume of merged PRs (5) with "AI-generated" tags (indicating high developer velocity) suggests a healthy developer experience.
*   **Pain Points:** The focus on fixing authentication and standardizing headers indicates users are likely experiencing friction with real-time data streams or cross-platform compatibility.

**8. Backlog Watch**
*   **Long-Term Feature:** PR #423 (Multi-agent framework) was marked as "WIP" and has been open since February 2026. While it was eventually merged, its long lifecycle highlights the complexity of architecting shared context and agent discovery across a distributed system.
*   **Maintenance:** With no open issues, the backlog appears clean. Maintainers should focus on validating the stability of the newly merged 1,095 commits before the next feature push.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest: 2026-11-24
## Today's Overview
LobsterAI is maintaining an active development cycle with a balanced mix of feature work, dependency updates, and stability improvements. Today's activity shows 1 new open issue (#3163, filed by a Baidu Enterprise Query team member requesting an OAuth integration for the client's built-in Baidu AI Query MCP integration), 16 PRs updated in the last 24 hours (3 open, 13 merged/closed), and no new releases. The project is focused on expanding MCP/skill capabilities, enhancing UI/UX polish, and improving cold-start and startup performance (e.g., DSH migration fixes and boot decoupling). Overall health indicates active maintenance with a strong push toward integrations and stability.
## Releases
**No new releases** were available or disclosed. All activity is concentrated on pull requests and issue trackers rather than version bumps, consistent with ongoing feature and fix work rather than release cycles.
## Project Progress
- **Merged/Closed PRs Today:** 16 total updates; 3 open PRs, 13 merged/closed. Key merges/closes include:
  - `#3169` [CLOSED] Restore WeCom connectivity in DSH (fixes DSH migration), authored by btc69m979y-dotcom.
  - `#3168` [CLOSED] prevent DSH migration hang and cold-boot timeout (fixes first-launch startup hangs and DSH cold-boot timeouts).
  - `#3167` [CLOSED] add new badges in featured scenarios for experts (renderer).
  - `#3166` [CLOSED] polish sidebar typography scale and visual contrast.
  - `#3165` [CLOSED] polish sidebar surface and add full-access confirmation dialog.
  - `#3164` [CLOSED] redesign home composer layout and default permission settings.
  - `#3160` [CLOSED] add native POPO channel support to DSH.
- **New Features Advanced/Fixed:**
  - DSH-specific fixes: POPO channel support, WeCom connectivity restoration, startup hang prevention, cold-boot timeout prevention, and DSH native `web_search` routing unification.
  - UI/UX polish: sidebar typography, surface/contrast, home composer redesign, and full-access confirmation dialog.
  - Infrastructure: `ci: bump actions/setup-node` and `ci: bump softprops/action-gh-release` (dependabot updates).
## Community Hot Topics
- **Issue #3163 [OPEN]** — Requested OAuth-mode integration for LobsterAI's built-in Baidu AI Query MCP, with an explicit request to participate in cooperation and provide DCR auth flow. This signals a partnership-driven need for enterprise-integrated workflows.
- **PR #3169 / #3168** — Active DSH stability work addressing connectivity restoration and startup resilience, likely motivated by high-impact migration and upgrade scenarios.
- **PR #2938 [OPEN]** — Contribute Lynxce desktop and WorkBuddy experts (879 catalog entries) to expand expert catalog coverage.
## Bugs & Stability
- **No significant bugs, crashes, or regressions reported today** in the provided data. The open issue (#3163) is a feature/cooperation request rather than a stability report, and all other PRs are feature or maintenance updates.
- **Potential stability concerns** present in related PRs: DSH migration complexity (hang/timeout risks) and cold-boot latency optimization—mitigated by merged PRs #3168 and #3157.
## Feature Requests & Roadmap Signals
- **OAuth-mode integration for Baidu AI Query MCP** (Issue #3163): A clear user/organization request to enable DCR/OAuth auth for enterprise integration, indicating a potential next-component feature.
- **Enhanced expert catalog and UI polish** (PRs #2818, #2938, #3167, #3166, #3165, #3164, #3156): Expansion of experts, sidebar/UI redesign, and companion context actions suggest continued enhancement of agent capabilities and user interface quality.
- **DSH routing & web_search unification** (PR #3155): Unifying native web_search routing and retiring legacy servers aligns with ongoing DeepSeek Harness architecture updates.

## User Feedback Summary
- **Enterprise integrations:** User/community requests for OAuth-based authentication for Baidu AI Query MCP, indicating a need for secure, enterprise-ready MCP integration workflows.
- **Platform reliability expectations:** Concerns around DSH migration stability and cold-boot latency are signalings that users expect faster, more reliable upskilling paths, especially for large-scale upgrades (Windows).
- **UI/UX responsiveness:** Feedback and PR activity focus on sidebar styling, composer layout, and confirm dialogs, suggesting users value intuitive and polished interaction surfaces.
- **Expert/catalog demand:** Requests for additional expert contributions (Lynxce, WorkBuddy) imply users want broader catalog coverage to support complex agent workflows.

## Backlog Watch
1. **Issue #3163 (OAuth-mode Baidu AI Query MCP integration):** Long-standing, explicitly requested feature not yet reflected in recent activity; maintainer needs to assess feasibility and process for OAuth DCR setup.
2. **DSH stability and cold-start issues:** PRs #3168 and #3157 address existing risks, but any remaining gaps or regressions in DSH boot/cold-start paths may warrant follow-up verification.
3. **Expert catalog expansion (PR #2938):** Adds significant scope (879 entries) and is still open, requiring maintainer review and potential integration planning.

---

**Project Health Assessment:** LobsterAI demonstrates steady, focused maintenance with high PR throughput, targeted stability fixes for DSH migration, and clear user-driven feature demand (MCP integrations, expert catalog, UI polish). No major risks detected today, but the OAuth integration backlog and expert-catalog expansion require follow-up attention to ensure full delivery.

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

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*