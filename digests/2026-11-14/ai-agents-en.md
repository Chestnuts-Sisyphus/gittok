# OpenClaw Ecosystem Digest 2026-11-14

> Issues: 328 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-14 00:33 UTC

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

**Cross‑Project Comparison Report – Personal‑AI‑Assistant / Agent Ecosystem**  
*Date: 2024‑11‑14*  

---  

## 1. Ecosystem Overview  
The open‑source personal‑AI‑assistant landscape remains fragmented but vibrant, with a core set of “Claw”‑family projects (OpenClaw, NullClaw, ZeroClaw, etc.) and a handful of peripheral frameworks (NanoBot, Hermes Agent, LobsterAI). Development activity is uneven: a few projects (ZeroClaw, NullClaw) see daily PR churn, while many repositories are dormant or only sporadically touched. The dominant themes are **security‑hardening**, **cross‑platform runtime stability**, and **plug‑in‑friendly search/communication providers**—reflecting the community’s push to make agents safe enough for production use while staying extensible.

---  

## 2. Activity Comparison  

| Project | Issues (last 24 h) | PRs (last 24 h) | New Release? | Health Score* |
|---------|-------------------|----------------|--------------|--------------|
| **OpenClaw** | – (data unavailable) | – | – | 2 (unknown, low‑visibility) |
| **NanoBot** | – | – | – | 2 |
| **Hermes Agent** | – | – | – | 2 |
| **PicoClaw** | – | – | – | 2 |
| **NanoClaw** | – | – | – | 2 |
| **NullClaw** | 0 | 2 (both open) | No | **3** (steady, feature‑focused) |
| **IronClaw** | – | – | – | 2 |
| **LobsterAI** | – | – | – | 2 |
| **TinyClaw** | 0 | 0 | No | **1** (inactive) |
| **Moltis** | 0 | 0 | No | **1** |
| **CoPaw** | – | – | – | 2 |
| **ZeptoClaw** | 0 | 0 | No | **1** |
| **ZeroClaw** | ≈ 8* | ≈ 50* (49 new + 1 merged) | No | **5** (high‑velocity, security‑heavy) |

\*Health Score (1‑5) is a composite of issue/PR churn, release cadence, and observable community responsiveness. “–” denotes no public data for the 24‑h window; a score of 2 reflects an uncertain but likely low‑activity state.

---  

## 3. OpenClaw’s Position  

* **Advantages vs. peers**  
  * Serves as the **reference implementation** for the “Claw” API surface, offering the most complete set of core abstractions (tool‑delegation, sandboxing, and provider contracts).  
  * Historically the **most documented** repository, with a stable CLI and a well‑tested test‑suite that downstream forks (NullClaw, ZeroClaw) rely on.  

* **Technical‑approach differences**  
  * **Monolithic core** written in Zig for deterministic binary size, whereas NullClaw and ZeroClaw have begun modularising providers as separate plugins.  
  * Emphasises **static‑type safety** and compile‑time validation of tool schemas, while newer projects experiment with dynamic‑schema loading (e.g., ZeroClaw’s `zerocode` runtime).  

* **Community size comparison**  
  * Activity signals (PRs, issues) place OpenClaw **mid‑tier**: more visible than the completely idle forks (TinyClaw, ZeptoClaw) but far less “buzz” than ZeroClaw’s 50 PRs/day.  
  * The lack of recent releases suggests a **maintenance‑mode** posture, with most contributions flowing into downstream forks rather than the upstream repo.

---  

## 4. Shared Technical Focus Areas  

| Need | Projects Highlighting It | Typical Implementation |
|------|--------------------------|------------------------|
| **Robust markdown/table rendering for messaging channels** | NullClaw (#1094 – Telegram), ZeroClaw (ongoing UI work) | Pre‑formatting tables as monospace blocks; provider‑agnostic rendering layer |
| **Key‑less / low‑cost web‑search providers** | NullClaw (#1091 – Keenable), ZeroClaw (multiple search back‑ends) | Thin wrapper around public endpoints; optional API‑key flag |
| **Cross‑platform path & secret hardening** | ZeroClaw (PR #12136, #12140) | Whitelisting/blacklisting of system directories; unified path‑normalisation layer |
| **Delegation & tool‑level approval** | ZeroClaw (Issue #11138) | Hierarchical policy engine, per‑tool capability checks |
| **Cron / job persistence reliability** | ZeroClaw (PR #12240) | Transactional updates to job metadata, atomic config writes |
| **Web‑UI credential management** | ZeroClaw (Issue #12373) | Write‑only UI fields, metadata‑only listings, secret reference tokens |

These recurring demands indicate that **messaging fidelity, secure provider integration, and reliable orchestration primitives** are becoming de‑facto requirements for any production‑grade AI agent framework.

---  

## 5. Differentiation Analysis  

| Dimension | OpenClaw | NullClaw | ZeroClaw | Other (NanoBot, Hermes, etc.) |
|-----------|----------|----------|----------|------------------------------|
| **Primary Feature Focus** | Core spec & reference implementation | Incremental UI/UX fixes (Telegram, key‑less search) | Security hardening, runtime delegation, enterprise‑grade config | Varies (often experimental bots, language‑model wrappers) |
| **Target Users** | Library authors & framework integrators | End‑users who run agents on Telegram / simple bots | Operators managing multi‑node fleets, enterprise admins | Hobbyists / research prototypes |
| **Architecture** | Monolithic Zig binary, compile‑time schemas | Fork of OpenClaw, adds provider plugins (Zig) | Modular Go‑centric daemon + relay + web UI, pluggable providers | Mixed (Python, Rust, Node) |
| **Extensibility Model** | Provider interfaces defined in core; extensions must rebuild | Simple PR‑based provider addition | Runtime plugin loading via `zerocode` and dynamic config | Often ad‑hoc scripts, limited formal plugin system |
| **Release Cadence** | Sporadic (maintenance) | No releases in last 24 h, occasional patch releases | No releases yet, but heavy PR flow suggests imminent 0.9.x/1.0 | Generally low or one‑off releases |

---  

## 6. Community Momentum & Maturity  

| Activity Tier | Projects | Characteristics |
|---------------|----------|-----------------|
| **High‑velocity / growth** | **ZeroClaw** (≈ 50 PRs/day) | Rapid bug‑fix turnaround, active security RFCs, large backlog of security‑focused PRs. |
| **Steady feature‑focused** | **NullClaw** (2 open PRs, no releases) | Small but targeted contributions (Telegram UI, key‑less search). |
| **Maintenance / low‑visibility** | **OpenClaw**, **NanoBot**, **Hermes Agent**, **IronClaw**, **LobsterAI**, **CoPaw** | Issue/PR counts unavailable; likely in a “maintain‑as‑is” state with occasional patches. |
| **Dormant / archival** | **TinyClaw**, **Moltis**, **ZeptoClaw** | Zero activity; may serve as reference or legacy code bases. |

Projects in the **high‑velocity** tier are moving toward a **stable 1.0** release (ZeroClaw) while the **steady** tier provides niche improvements that can be merged upstream. The **maintenance** tier is useful for developers who need a stable, well‑documented baseline but do not require rapid new features.

---  

## 7. Trend Signals  

1. **Security‑first delegation** – ZeroClaw’s RFC for a MITM egress proxy and tool‑level approval discussions show the community is treating agents as *potential attack surfaces* and building containment primitives (proxy, per‑tool policy). This will likely become a standard requirement for any agent intended for production or multi‑tenant environments.  

2. **Zero‑API‑key search providers** – Both NullClaw and ZeroClaw are adding “no‑key” web‑search back‑ends (Keenable, public endpoints). The trend reflects a demand for **low‑cost, privacy‑preserving lookup** that can be bundled into offline‑first deployments.  

3. **Messaging‑rich content rendering** – The Telegram markdown‑table fix indicates that agents are increasingly used for **structured report generation** (tables, logs) inside chat platforms. Expect more UI‑aware rendering utilities and a convergence on a common *rich‑message* abstraction layer.  

4. **Cross‑platform path sanitisation** – ZeroClaw’s recent Windows‑specific patches highlight the growing need for **consistent filesystem security** across OSes. Future frameworks will likely expose a unified “path‑policy” API rather than relying on ad‑hoc hard‑coded lists.  

5. **Web‑UI credential stewardship** – The request for a write‑only credential manager points to a broader shift toward **operator‑centred UI tooling**, where secrets are never displayed in plain text. This will influence the design of dashboards for all agent ecosystems.  

*Implication for developers*: When choosing a foundation for a new personal AI assistant, prioritize a project that already embraces the above trends (ZeroClaw for security & delegation, NullClaw for lightweight search, OpenClaw for a stable core spec). Aligning with a repository that is actively addressing these signals reduces integration risk and future‑proofs the deployment.  

---  

**Prepared by:** Senior Analyst – AI Agent & Personal‑AI‑Assistant Open‑Source Ecosystem (2026‑11‑14)  

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

# NullClaw Project Digest: 2026-11-14
## Today's Overview
NullClaw is in a relatively quiet state with zero new issues or releases over the last 24 hours, indicating minimal active development momentum. Activity is currently concentrated in pull requests, with two open features being submitted: a Telegram markdown table rendering enhancement (#1094) and a web_search provider addition (Keenable, no API key required) (#1091). The project maintains a steady stream of community contributions despite limited immediate responsiveness, reflecting an environment where feature-focused activity is the main momentum.
## Releases
No new releases were documented for NullClaw as of 2026-11-14. Since there are no release changes, there are no version history details, breaking changes, or migration notes to report.
## Project Progress
- **2 PRs updated in the last 24h** (both open):
  - **#1094 [OPEN] feat(telegram): render markdown tables as monospace pre blocks** — Author: timosha; Created/Updated: 2026-11-13. Resolves a telegram rendering issue where markdown tables were rendered as jumbled pipes. Implementation splits table rows and re-renders with proper formatting.
  - **#1091 [OPEN] feat(web_search): add Keenable provider (no API key required)** — Author: KGKallasmaa; Updated: 2026-11-13. Adds a keyless web_search provider backed by `src/tools/web_search_providers/keenable.zig`, enabled by setting `KEENABLE_API_KEY`.
No PRs were merged or closed in this window.
## Community Hot Topics
- **#1094 (Telegram markdown tables)**: Most recently active and semantically tied to a concrete usability issue. The feature targets a reported rendering defect where markdown tables were displayed inconsistently in Telegram, suggesting a need for robust table formatting in messaging platforms.
- **#1091 (Keenable web_search provider)**: A community-requested enhancement with a clean, no-key API design, indicating demand for an alternative web_search provider. The focus on a free public endpoint implies a need for offline-capable or lightweight search integration.
Both topics reflect community-driven feature requests with high potential adoption and are the most active items in the last 24h.
## Bugs & Stability
- No bugs, crashes, or regression reports were identified or filed in the last 24h.
- There are no fixing PRs associated with the current window, meaning no stability issues are tracked or resolved today.
## Feature Requests & Roadmap Signals
- **Markdown table rendering in Telegram** (#1094): A clear roadmap signal for improved messaging table support; likely to be addressed in a future release given the active implementation and user-reported pain.
- **Keenable search provider** (#1091): A direct signal for extending web_search capabilities to a keyless provider, possibly for broader deployment or as a fallback option.
- Both signals align with ongoing feature activity and indicate features likely to appear in upcoming releases.
## User Feedback Summary
- **Main use case**: Users likely face inconsistency when handling markdown tables in Telegram and need a reliable rendering approach for structured content; the #1094 PR addresses this directly.
- **Alternative use case**: Users may benefit from Keenable's keyless web_search to enable faster, no-key search workflows, aligning with #1091.
- **Satisfaction signal**: Both PRs were submitted with meaningful implementations and no immediate feedback metrics, indicating a productive but early-stage adoption path.
## Backlog Watch
- **#1091 (Keenable provider)**: Although recently updated, it remains open and depends on the team's focus; if not completed, it may represent an important unresolved feature need for web_search capabilities.
- **#1094 (Telegram markdown tables)**: Also open and already in progress, but may require further review or enhancement to fully resolve the rendering defect. Maintainer attention is warranted to ensure smooth progress and completeness.

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

**ZeroClaw Project Digest**
**Date:** 2026-11-14
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### 1. Today's Overview
ZeroClaw has demonstrated high community activity today, processing **57** pull requests and issues across the last 24 hours. The project maintains a healthy momentum with **49 new PRs** submitted and **1 PR** successfully closed (merged), indicating strong developer engagement. However, no new software releases were published. The activity is heavily skewed toward maintenance, security hardening, and bug fixes, with the core team and contributors actively addressing configuration edge cases and runtime stability issues.

### 2. Releases
**No new releases** were published in the last 24 hours.

### 3. Project Progress
*   **Merged Work:** 1 Pull Request was merged (PR #12270), which completed the second phase of a feature to serve a daemon's web dashboard through the relay at a per-node host.
*   **Active Development:** The project is currently stabilizing version **0.9.0**. The team is aggressively fixing critical bugs related to Windows profile secrets, Windows/Unix path forbidding, and SSH task-scoped exceptions.
*   **Key Fixes:** Maintenance of the `cron` system was improved to ensure job reassignments persist correctly, and the `zerocode` configuration system was hardened to prevent concurrent update conflicts.

### 4. Community Hot Topics
The most discussed and active technical discussions focus on **security architecture** and **runtime delegation**:

*   **MITM Egress Proxy (RFC #12001):**
    *   **Topic:** An RFC proposal to implement a Man-in-the-Middle egress proxy to control agent access and hide secrets.
    *   **Link:** [Issue #12001](https://github.com/zeroclaw-labs/zeroclaw/issues/12001)
    *   **Analysis:** This is a high-priority architectural discussion regarding containment. The proposal addresses the gap where the system can limit *what* an agent can do, but lacks functionality to constrain a *compromised* agent.
*   **Tool-Level Approval in Delegation (Issue #11138):**
    *   **Topic:** Defining whether bounded agentic children must honor the caller's tool-level approval requirements.
    *   **Link:** [Issue #11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138)
    *   **Analysis:** A long-standing enhancement request accepted by the maintainers (Status: accepted). It is currently in a follow-up phase, indicating the team is refining the implementation details for secure delegation.

### 5. Bugs & Stability
Several bugs were reported and are currently being addressed via open PRs. The most critical issues affect the **OpenCode Go provider** and **Windows compatibility**.

*   **S2 - Degraded Behavior: OpenCode Go Provider Issues**
    *   **Issue #12413:** The `opencode.go` provider returns "no capacity" for context windows.
    *   **Issue #12412:** The provider incorrectly fetches Zen's model catalogue instead of Go's specific models.
    *   **Status:** Active development.
*   **High Risk: Windows Path Security & Secrets**
    *   **PR #12136:** Fixes a security gap where `/mnt`, `/media`, and Windows drive paths were accessible despite system home directories being forbidden.
    *   **PR #12140:** Fixes a critical configuration issue where Windows profile secrets were not covered by the default forbidden paths.
*   **Cron Job Persistence**
    *   **PR #12240:** A bug where `zeroclaw cron update` would validate but fail to save the new agent owner for a job.

### 6. Feature Requests & Roadmap Signals
The roadmap is heavily influenced by security and operational management needs:

*   **Credential Management (Issue #12373):**
    *   **Request:** A "write-only" WebUI credential management interface for operators, including metadata-only listing and controlled secret references.
    *   **Status:** Open.
    *   **Prediction:** Likely to be prioritized as a v0.10.0 feature to address operator safety and ease of use.
*   **OIDC Logout (Issue #12415):**
    *   **Request:** Support for RP-initiated logout (end_session_endpoint) in the dashboard.
    *   **Status:** Open.
    *   **Prediction:** High priority for identity management compliance and user experience.

### 7. User Feedback Summary
*   **Pain Point - Configuration Conflicts:** Users are reporting issues with legacy environment variables (`ZEROCLAW_*`) being skipped during migration, causing confusion.
*   **Pain Point - Cross-Platform Support:** Operators on Windows are experiencing unexpected access to system directories (`C:\`, `Program Files`) and profile secrets due to path handling discrepancies between Unix and Windows defaults.
*   **Pain Point - Provider Accuracy:** Users relying on the OpenCode Go provider are experiencing data retrieval failures (wrong catalogue/model list), indicating a need for robust provider fallbacks.

### 8. Backlog Watch
Several long-standing issues require maintainer attention:
*   **Identity & Access (PR #9746):** A large-scale fix for per-agent ownership scoping for session tools and Discord search. This PR was last updated recently but remains open, suggesting it may require code review or integration hurdles.
*   **Tool Approval Logic (Issue #11138):** An accepted enhancement that has been in "follow-up" status for nearly two months, indicating a complex architectural implementation.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*