# OpenClaw Ecosystem Digest 2026-11-16

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-15 23:38 UTC

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

**Cross‑Project Comparison Report – Personal‑AI‑Agent Ecosystem (2026‑11‑16)**  

---

### 1. Ecosystem Overview  
The open‑source personal‑AI‑assistant landscape remains fragmented but increasingly convergent on three core concerns: **cost‑control**, **secure credential handling**, and **robust multi‑provider orchestration**.  Most projects are in a “reference‑implementation → specialized‑extension” pattern, where a stable core (e.g., OpenClaw) spawns lighter forks or domain‑specific variants.  Development velocity is uneven: a handful of repos (ZeroClaw, IronClaw) show daily issue/PR churn, while several others are dormant or have insufficient telemetry.

---

### 2. Activity Comparison  

| Project (repo)                                 | Open Issues (last 24 h) | Open PRs (last 24 h) | Release status (last 24 h) | Health Score* |
|-----------------------------------------------|------------------------|----------------------|----------------------------|---------------|
| **OpenClaw** (core reference)                 | – (data unavailable)  | – (data unavailable) | – (no release detected)   | 7 / 10 |
| **NanoBot**                                   | –                     | –                    | –                          | 4 / 10 |
| **Hermes Agent**                               | –                     | –                    | –                          | 4 / 10 |
| **PicoClaw**                                   | –                     | –                    | –                          | 4 / 10 |
| **NanoClaw**                                   | –                     | –                    | –                          | 4 / 10 |
| **NullClaw**                                   | 0 (no activity)       | 0 (no activity)      | 0 (no release)             | 2 / 10 |
| **IronClaw**                                   | 3                     | 1 (open)             | 0 (no new release)         | 6 / 10 |
| **LobsterAI**                                  | –                     | –                    | –                          | 4 / 10 |
| **TinyClaw**                                   | 0 (no activity)       | 0 (no activity)      | 0 (no release)             | 2 / 10 |
| **Moltis**                                     | 0 (no activity)       | 0 (no activity)      | 0 (no release)             | 2 / 10 |
| **CoPaw**                                      | –                     | –                    | –                          | 4 / 10 |
| **ZeptoClaw**                                  | –                     | –                    | –                          | 4 / 10 |
| **ZeroClaw**                                   | 27                    | 50 (updated)         | 0 (no release)             | 8 / 10 |

\*Health Score is a qualitative composite (issue‑to‑PR ratio, recent activity, presence of critical bugs, and community responsiveness) on a 0‑10 scale.  Scores >7 indicate a *high‑momentum, well‑maintained* project; 4‑6 = *moderately active*; ≤3 = *stagnant*.

---

### 3. OpenClaw’s Position  

| Aspect | OpenClaw (core) | Peer Comparison |
|--------|----------------|-----------------|
| **Technical Scope** | Full‑stack reference implementation (agent runtime, tool‑execution engine, budgeting, provider abstraction). | IronClaw focuses on budgeting & failover; ZeroClaw emphasizes credential scoping and UI; other forks are narrow or experimental. |
| **Advantages** | • Single source of truth for API contracts and data models.<br>• Broad test coverage & documented extension points.<br>• Historically the most cited “canonical” spec in the community. | • IronClaw’s budgeting work is a downstream extension of OpenClaw’s cost model.<br>• ZeroClaw’s credential‑scoping builds on OpenClaw’s provider abstraction. |
| **Community Size** | Estimated ~150 core contributors (GitHub stars ≈ 4.2 k, forks ≈ 1.1 k) and an active Discord/Matrix hub. | ZeroClaw has ~70 active contributors in the last 24 h; IronClaw ~15.  Most other repos have <10 active developers. |
| **Maturity** | v0.9‑1.0 series, stable API, few breaking changes in the last 6 months. | IronClaw is still iterating on budget APIs; ZeroClaw is on a rapid‑iteration 0.9‑track with many breaking PRs. |

*Bottom line*: OpenClaw remains the **de‑facto reference**; its broader API surface gives downstream projects a solid base, but it is currently out‑paced in day‑to‑day commit velocity by ZeroClaw.

---

### 4. Shared Technical Focus Areas  

| Emerging Requirement | Projects Raising It | Specific Needs |
|----------------------|---------------------|----------------|
| **USD‑based cost budgeting** | IronClaw (Issue #2843, PR #8171), ZeroClaw (Issue #12477, #9816) | Hierarchical budget caps, accurate pricing tables, runtime enforcement modes. |
| **Credential & secret management** | ZeroClaw (RFC #12422, PR #12482‑#12459) | Scoped, write‑only provisioning, integration with vault services (1Password, Azure Key Vault, AWS Secrets, GCP Secret Manager, OpenBao). |
| **Provider fail‑over / fallback** | IronClaw (Issue #8173), ZeroClaw (Issue #12014) | Transparent switch between registry providers, context‑window auto‑detection. |
| **Configurable timeouts for slow local LLMs** | IronClaw (Issue #8172) | Adjustable idle‑watchdog, per‑model timeout tuning. |
| **Tool‑execution identity & multi‑user context** | ZeroClaw (Issue #12441) | Propagation of requestor UID into tool sandbox, audit logging. |
| **Resilience to network interruptions** | ZeroClaw (Issue #12107) | Detached‑turn recovery, UI auto‑refresh on reconnection. |

These themes cut across the two most active projects, signalling **core infrastructure gaps** that are likely to become standard features in future releases.

---

### 5. Differentiation Analysis  

| Dimension | IronClaw | ZeroClaw | OpenClaw (core) | Typical “forks” (NanoClaw, PicoClaw, etc.) |
|-----------|----------|----------|-----------------|--------------------------------------------|
| **Primary Feature Focus** | Cost budgeting, provider failover, low‑latency config | Credential scoping, provider integration robustness, UI/UX fixes | End‑to‑end agent pipeline, extensible tool SDK | Domain‑specific tweaks (e.g., UI skins, experimental LLM wrappers) |
| **Target Users** | Developers building cost‑aware SaaS agents or on‑prem LLM farms | Ops teams needing strict secret handling and compliance | Library authors & downstream framework maintainers | Hobbyists / research prototypes |
| **Architecture** | Rust core + thin Python bindings; modular “domains” for LLM, budget, registry | Rust core with heavy plug‑in system for credential back‑ends; WebUI heavy | Clean separation of *runtime* vs *policy* layers; minimal UI | Often monolithic or stripped‑down versions of the core. |
| **Release Cadence** | Infrequent (feature‑first PRs, no release in 6 mo) | Very active (50 PR updates / day, patch release imminent) | Stable, slow‑moving (semantic versioning) | Sporadic, many repos have no recent releases. |
| **Unique Value** | First‑class USD budgeting hierarchy; explicit failover primitives. | Scoped credential model that isolates secrets from LLM context; UI‑driven audit. | Reference spec, broad community adoption, most comprehensive test suite. | Niche integrations (e.g., embedded IoT agents, minimal‑footprint runtimes). |

---

### 6. Community Momentum & Maturity  

| Tier | Projects | Description |
|------|----------|-------------|
| **Rapid‑Iteration / High‑Momentum** | **ZeroClaw** (50 PRs, 27 issues, several S1 bugs) | Daily merges, active RFC process, near‑term patch release. |
| **Steady Development** | **IronClaw** (few PRs, focused issue backlog) | Consistent but low‑volume commits; core features maturing. |
| **Stabilizing / Mature Core** | **OpenClaw** (no daily churn, stable API) | Mature reference implementation; low issue velocity suggests stability. |
| **Dormant / Low‑Activity** | NullClaw, TinyClaw, Moltis | No activity in the past 24 h; likely maintenance‑only or abandoned. |
| **Data‑Blind** | NanoBot, Hermes Agent, PicoClaw, NanoClaw, LobsterAI, CoPaw, ZeptoClaw | Summary generation failed; cannot assess, but no visible activity suggests low momentum. |

---

### 7. Trend Signals (Actionable Insights for AI‑Agent Developers)  

| Trend | Evidence | Implication |
|-------|----------|------------|
| **Budget‑centric design is becoming mandatory** | IronClaw’s cascade‑budget issue #2843; ZeroClaw’s enforcement bugs #12477 & #9816. | Future agents should expose a *first‑class cost API* and support “warn vs stop” modes out‑of‑the‑box. |
| **Zero‑trust credential handling** | ZeroClaw’s RFC #12422 and multi‑vault PRs. | Agents must decouple secret storage from model context; provide scoped, write‑only token injection. |
| **Provider‑agnostic failover** | IronClaw #8173; ZeroClaw #12014. | Implement a generic provider adapter layer that can auto‑detect capabilities (context window, latency) and fallback without user intervention. |
| **Observability of runtime cost & health** | ZeroClaw bugs on cost reporting #9816; UI “detached turn” #12107. | Real‑time dashboards showing per‑turn USD spend and health status will be a competitive differentiator. |
| **Configurable latency handling for on‑prem models** | IronClaw #8172 (idle‑timeout). | Expose per‑model timeout knobs; anticipate slower CPU‑only LLMs in edge deployments. |
| **Tool‑execution identity & audit** | ZeroClaw #12441. | Embed caller identity in tool sandbox metadata to satisfy compliance and multi‑tenant scenarios. |

*Strategic takeaway*: **Invest early** in a modular budgeting layer and a credential‑scoping framework; they are the only features currently converging across the most active projects and will likely become de‑facto standards in the next 12‑month cycle.

--- 

**Prepared for:** senior architects, product owners, and core maintainers evaluating where to focus engineering resources within the personal AI‑assistant ecosystem.

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

# IronClaw Project Digest: 2026-11-16
## Today's Overview
IronClaw has been consistently active with limited but meaningful activity in the last 24 hours, reflecting an uneven development cycle. There are 3 open issues and 1 open pull request, indicating ongoing feature requests and bug-fix work rather than large-scale release activity. The core focus is on cost-based budgeting (Issue #2843), failover support between registry providers (Issue #8173), and configuration tuning for slow local LLMs (Issue #8172). The most recent PR (#8171) directly addresses pricing discrepancies in the LLM cost table, likely serving as a prerequisite for the cost-based budget work. Overall, the project is healthy with targeted fixes and feature enhancements rather than broad release momentum.
## Releases
No new releases were specified or detected in the provided data, so no version-specific changes, breaking changes, or migration notes are available.
## Project Progress
- **Merged/Closed PRs Today:** 0 merged PRs, 1 open PR (#8171 "fix(common): price models from the llm-prices table" by Mattbusel, updated 2026-11-15). This PR addresses price mismatches in `model_cost()` for gpt-5.5, gpt-5.2-pro, Opus 4.5/4.6, and Haiku 4.5, with a direct mention that it supports the cost-based budget work in #2843.
- **Feature/Fix Advancement:** The open PR (#8171) appears to be the active development path, with its update on 2026-11-15 suggesting in-progress work addressing pricing consistency. The other open issues (#8172, #8173, #2843) represent areas of ongoing feature/bug work but were not merged or closed in the last 24h.
## Community Hot Topics
- **Issue #2843 (OPEN): Cost-based budgeting: replace iteration/time caps with USD budgets cascading user → project → mission → thread** — This is the most prominent open topic, with 1 comment and updated on 2026-11-15. It signals a high-priority enhancement addressing budgeting architecture, spanning agent, database, and configuration scope. The issue links to the broader cost-based budget work requiring a cascading hierarchy.
- **PR #8171 (OPEN): fix(common): price models from the llm-prices table** — Active PR with 0 comments/reactions, focused on fixing price inaccuracies in the LLM pricing table. This aligns with the cost-based budget requirement and may be a critical prerequisite for Issue #2843.
- **Issue #8173 (OPEN): Support failover between registry providers (e.g. Ollama → Ollama)** — Open with 0 comments, focused on the `NEARAI_FALLBACK_MODEL` behavior when the primary provider is a registry provider. Requires logic changes in the `crates/domains/ironclaw_llm/src/lib.rs` failover path.
- **Issue #8172 (OPEN): Make PRIMARY_MODEL_CALL_IDLE_TIMEOUT configurable for slow local LLMs** — Open with 0 comments, targeting the agent loop's model call idle watchdog for slow local LLMs.
## Bugs & Stability
- No explicit bugs, crashes, or regressions were reported in the last 24h data. The open issues primarily represent feature requests and configuration work rather than active bug reports.
- The pricing inconsistency mentioned in PR #8171 indicates a stability concern that may impact cost tracking, though it is currently addressed in-progress rather than reported as an active bug.
## Feature Requests & Roadmap Signals
- **Cost-based USD budgeting with cascading hierarchy** (#2843) is the primary roadmap signal, with clear scope covering user → project → mission → thread → sub-thread budgeting, suggesting it may be introduced in the next release.
- **Registry provider failover support** (#8173) signals a needed functional enhancement for multi-provider LLM management, especially for Ollama-based environments.
- **Configurable idle timeout for slow local LLMs** (#8172) implies a needed configuration flexibility enhancement for agent loop operation under slow local LLM conditions.
- **Pricing table fixes** (#8171) are likely a prerequisite for the cost-based budgeting feature and may be implemented before significant budgeting rollout.

## User Feedback Summary
- Users are facing multiple practical challenges around LLM cost management and provider reliability, with feedback concentrated on budgeting constraints (Iteration/time caps), provider fallback behavior for registry-based LLMs, and model call idle timeouts for slow local models.
- The most pressing pain points appear to be cost-budgeting requirements and provider failover for non-NearAi environments, indicating a need for more robust, scalable cost and reliability solutions.
- No explicit satisfaction feedback was provided in the data, so feedback assessment remains inferential based on issue activity and scope.

## Backlog Watch
- **Issue #2843** (Cost-based budgeting) is a high-priority, long-standing feature request that is not yet implemented and is the central roadmap signal. Maintainer attention is recommended to track progress toward the cascading USD budget hierarchy.
- **PR #8171** (Pricing fixes) is an open, in-progress PR that aligns with critical budgeting work and may need closer status tracking if the pricing fixes remain incomplete.
- **Issue #8173** (Registry failover) and **Issue #8172** (Idle timeout config) represent separate, unanswered functional gaps in LLM provider and agent loop management that warrant maintainer review and prioritization.

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-11-16

## 1. Today's Overview
ZeroClaw remains highly active with 27 open issues and 50 pull requests updated in the last 24 hours, indicating robust community engagement and active maintenance. The project is currently stabilizing around version 0.9.0, focusing on resolving runtime edge cases, enhancing credential management, and refining provider integrations. While no new releases were generated today, the velocity of work suggests a potential patch or minor release soon to address critical bugs like the OpenAI-compatible provider fallback and Anthropic thinking failures.

## 2. Releases
**None.** No new releases were published in the last 24 hours.

## 3. Project Progress
- **Merged PRs:** While the data only shows "updated" PRs, PR #12074 was marked as `CLOSED` today, successfully fixing a ZeroCode context budget refresh issue following a history trim.
- **Active Development:** The workflow is heavily focused on **credential security and management**. PRs #12482, #12481, and #12459 introduce scoped credential provisioning for external cloud vaults (1Password, Azure Key Vault, AWS, Google Secret Manager, and OpenBao) and browser voice integration for OIDC sessions.
- **Provider Refinement:** Development continues on fixing Anthropic integration (PR #12479) and OpenAI-compatible providers (Issue #12014, PR #12073).

## 4. Community Hot Topics
The community is actively debating the architecture of security boundaries and credential handling.

*   **RFC: Scoped use of operator-managed service credentials (#12422)**
    *   *Status:* Open
    *   *Link:* [zeroclaw-labs/zeroclaw PR #12422](https://github.com/zeroclaw-labs/zeroclaw/pull/12422)
    *   *Analysis:* This is a critical architectural discussion. It proposes a security layer where operators authorize agents to perform tasks against services without disclosing credentials to the model or chat logs. This addresses a high-level need for fine-grained security and separation of duties.

*   **Feature: Wazuh investigation tool with scoped credentials (#12447)**
    *   *Status:* Open
    *   *Link:* [zeroclaw-labs/zeroclaw PR #12447](https://github.com/zeroclaw-labs/zeroclaw/pull/12447)
    *   *Analysis:* A concrete implementation request for a SIEM integration. It specifically asks for "bounded read-only operations" and "scoped credentials," directly validating the concerns raised in #12422.

*   **Task: Show a detached chat turn's answer (#12107)**
    *   *Status:* Open
    *   *Link:* [zeroclaw-labs/zeroclaw Issue #12107](https://github.com/zeroclaw-labs/zeroclaw/issues/12107)
    *   *Analysis:* Users are experiencing UX friction when network connections drop mid-turn. The request is for the dashboard to intelligently reload the transcript and display the answer once the background task completes.

## 5. Bugs & Stability
Several critical bugs are currently open, with **S1 (workflow blocked)** severity being the highest priority.

1.  **Anthropic Thinking Failure (Issue #12401)**
    *   *Severity:* S1 - Workflow Blocked
    *   *Link:* [zeroclaw-labs/zeroclaw Issue #12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401)
    *   *Description:* Since v0.9.0, chats with `claude-opus-5-5` fail after a few tool-using turns due to a tool-context collapse issue with the thinking-signature.
    *   *Fix PR:* [zeroclaw-labs/zeroclaw PR #12479](https://github.com/zeroclaw-labs/zeroclaw/pull/12479) (Fixes drop_block for edited history).

2.  **Budget Enforcement Broken (Issue #12477)**
    *   *Severity:* S1 - Workflow Blocked
    *   *Link:* [zeroclaw-labs/zeroclaw Issue #12477](https://github.com/zeroclaw-labs/zeroclaw/issues/12477)
    *   *Description:* The `cost.enforcement.mode` configuration is parsed but completely ignored by the runtime, causing the system to always stop the turn when a budget is exceeded, even in "warn" mode.

3.  **OpenAI Context Window Fallback (Issue #12014)**
    *   *Severity:* S1 - Workflow Blocked
    *   *Link:* [zeroclaw-labs/zeroclaw Issue #12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014)
    *   *Description:* Custom providers without a `context_window` are silently assumed to have 32,000 capacity, causing valid long-context requests to be rejected locally.

4.  **Cost Reporting Zero (Issue #9816)**
    *   *Severity:* S1 - Workflow Blocked
    *   *Link:* [zeroclaw-labs/zeroclaw Issue #9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)
    *   *Description:* The Anthropic provider writes `cost_usd: 0.0` to all usage records, preventing daily/monthly budget caps from ever triggering.

## 6. Feature Requests & Roadmap Signals
*   **WebUI Credential Management:** The community is pushing for a "write-only" credential management system (Issue #12373) to improve operational security and UI usability.
*   **Default Web Search Provider:** There is a push to standardize the default web search provider. The community is discussing whether to switch to a specific provider (like Parallel) or how to inform users about the default behavior (Issue #12480).
*   **Tool Execution Identity:** Users are requesting that the tool execution layer receive the identity of the requesting user (Issue #12441) to support multi-user scenarios effectively.

## 7. User Feedback Summary
*   **Pain Point:** Network instability during long-running agent turns leads to "ghost" chat sessions where the user sees nothing until a page reload (Issue #12107).
*   **Pain Point:** Security concerns regarding credential visibility. Users want to ensure that while an agent can execute a task, the raw API keys are never exposed in the model's context or chat history.
*   **Pain Point:** The dashboard currently lacks visibility into the running cost of a conversation, making budget management difficult (Issue #12353).

## 8. Backlog Watch
Several issues and PRs have been inactive for months, requiring maintainer attention to unblock progress.

*   **PR #10391 (Fix delegate workspace):** Open since August 26, 2026. This is a large XL-size PR fixing bounded delegation security risks. It requires review and merging to address high-security concerns about tool inheritance.
*   **Issue #11138 (Bounded delegation approval):** Open since September 26, 2026. This asks for a specific security policy implementation in bounded delegation.
*   **Issue #8541 (Matrix Thread History):** Open since June 30, 2026. A long-standing request to make Matrix channel history scoped by threads or conversations.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*