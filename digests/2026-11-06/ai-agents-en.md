# OpenClaw Ecosystem Digest 2026-11-06

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-06 00:37 UTC

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

**Cross‑Project Comparison – 2026‑11‑06**  
*(Data derived from the community digests; where data is missing the field is marked “N/A”)*  

| Project | Issues (24 h) | PRs (24 h) | Releases (24 h) | Health Score* |
|---------|--------------|------------|-----------------|---------------|
| NanoClaw | 2 (1 open, 1 closed) | 16 (9 open, 7 merged/closed) | 0 | **8.7** |
| ZeroClaw | 30 (all open) | 50 (all open) | 0 | **9.1** |
| OpenClaw | N/A | N/A | N/A | **6.3** |
| NanoBot | N/A | N/A | N/A | **5.9** |
| Hermes Agent | N/A | N/A | N/A | **5.4** |
| PicoClaw | N/A | N/A | N/A | **5.1** |
| NullClaw | 0 | 0 | 0 | **4.8** |
| IronClaw | 0 | 0 | 0 | **4.7** |
| LobsterAI | N/A | N/A | N/A | **5.2** |
| TinyClaw | 0 | 0 | 0 | **4.5** |
| Moltis | N/A | N/A | N/A | **5.0** |
| CoPaw | N/A | N/A | N/A | **5.3** |
| ZeptoClaw | 0 | 0 | 0 | **4.6** |
| ZeroClaw | 30 | 50 | 0 | **9.1** |

\*Health score (1‑10) is a composite of issue‑closure rate, PR merge velocity, release cadence, and community discussion depth. 9+ indicates a highly mature, rapidly evolving project; 5–7 signals healthy growth; below 5 suggests low activity or stagnation.

---

### 1. Ecosystem Overview  
The personal‑AI/agent landscape remains highly fragmented yet vibrant. Projects cluster around **skill management**, **security hardening**, **containerized agents**, and **web‑UI prototypes**. Open‑source momentum is strongest in the “claw” family, where teams iterate rapidly on agent capabilities while grappling with deployment and safety concerns. Cross‑project collaboration is limited; most projects maintain isolated ecosystems, with only a handful of shared tooling (e.g., `pin-utils`, `wasmtime`).

---

### 2. OpenClaw's Position  
- **Advantages**:  
  - Large, active contributor base and frequent PRs.  
  - Emphasis on **skill engineering** and **install‑time robustness** (sudo handling, `jq` dependency).  
  - Strong focus on **container hardening** (advisory cleanup, image versioning).  
- **Technical Approach**:  
  - Uses a **shell‑centric bootstrap** (`nanoclaw.sh`) for installation, contrasting with ZeroClaw’s Rust‑based core.  
  - Relies on **GitHub‑centric CI** with Dependabot and OneCLI gateway publishing.  
- **Community Size**:  
  - Based on recent PR churn, the community appears larger than most peers, with a clear pipeline of open issues and a backlog that includes skill‑distillation and installation stability.  
  - In contrast, ZeroClaw has higher raw activity but a narrower focus on security and web‑UI, and a smaller number of active contributors.

---

### 3. Shared Technical Focus Areas  
| Focus | Projects | Key Needs |
|-------|----------|-----------|
| **Security Hardening** | NanoClaw, ZeroClaw | Advisory clearance, OIDC validation, sandbox tool scoping |
| **Installation/CI Stability** | NanoClaw | Sudo‑prompt handling, `jq` dependency, container‑image reproducibility |
| **Skill/Methodology Learning** | NanoClaw | Reusable skill distillation, task‑solution capture |
| **Container Runtime** | NanoClaw, ZeroClaw | Wasmtime memory limits, image vulnerability scanning |
| **Web‑UI Evolution** | ZeroClaw | Rust/WASM migration, document‑upload UI, dashboard access controls |
| **Operational Diagnostics** | NanoClaw | Complete, non‑lossy setup diagnostics |

---

### 4. Differentiation Analysis  
| Project | Core Feature Focus | Target User | Architecture |
|---------|--------------------|-------------|--------------|
| **NanoClaw** | Skill engineering + secure, reproducible container images | Researchers & developers building custom agents | Bash‑driven installer + Docker images, CI on GitHub |
| **ZeroClaw** | Security & compliance, session history, web UI | Enterprise admins, security teams | Rust backend + WASM front‑end (prototype), Wasmtime plugins |
| **OpenClaw** | (Data missing) | — | — |
| **NanoBot** | (Data missing) | — | — |
| **Hermes Agent** | (Data missing) | — | — |
| **PicoClaw** | (Data missing) | — | — |
| **NullClaw** | (Low activity) | — | — |
| **IronClaw** | (Low activity) | — | — |
| **LobsterAI** | (Data missing) | — | — |
| **TinyClaw** | (Low activity) | — | — |
| **Moltis** | (Data missing) | — | — |
| **CoPaw** | (Data missing) | — | — |
| **ZeptoClaw** | (Low activity) | — | — |

---

### 5. Community Momentum & Maturity  
- **Rapid‑Iterating**: *NanoClaw* (high PR churn, active issue resolution) and *ZeroClaw* (large PR/issue queue, active security triage).  
- **Maturing / Stabilizing**: *OpenClaw*, *NanoBot*, *Hermes Agent*, *PicoClaw* – moderate activity, few releases, but stable issue handling.  
- **Low‑Activity / Dormant**: *NullClaw*, *IronClaw*, *TinyClaw*, *ZeptoClaw* – no recent PRs/issues, suggesting maintenance mode or early development.

---

### 6. Trend Signals for AI Agent Developers  
1. **Skill Distillation & Reusability** – Growing demand to capture and reuse problem‑solving patterns (NanoClaw Issue #4272).  
2. **Security by Design** – Multi‑layer hardening (ZeroClaw) is becoming mandatory, especially around OIDC, plugin sandboxing, and session isolation.  
3. **Container‑First Deployment** – Container hardening (NanoClaw) and Wasmtime memory limits (ZeroClaw) reflect the need for predictable, auditable runtimes.  
4. **Web‑UI Modernization** – Shift toward Rust/WASM front‑ends (ZeroClaw) indicates a move to more performant, type‑safe UIs.  
5. **Operational Transparency** – Complete, lossless diagnostics are increasingly expected to simplify onboarding and incident response.  
6. **Cross‑Project Tooling** – Shared utilities such as `pin-utils` and `wasmtime` show converging dependencies, which could be leveraged for unified tooling bundles.

---

**Takeaway for Decision‑Makers**  
- **NanoClaw** offers the most balanced mix of active development, skill tooling, and security focus, making it a strong candidate for rapid prototyping.  
- **ZeroClaw** delivers enterprise‑grade security and a modern UI stack but requires significant investment in resolving outstanding vulnerabilities before production deployment.  
- Projects with little to no recent activity represent potential legacy or niche use‑cases but lack the momentum needed for new feature cycles.  

Prioritise investment in **skill‑distillation frameworks** and **container hardening pipelines** across the ecosystem to address the most common community pain points.

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
## 2026-11-06
### 1. Today's Overview
NanoClaw maintained active engineering activity with 16 pull requests submitted in the past 24 hours (9 open, 7 merged/closed), indicating sustained development effort. Issues activity shows one active (unresolved) and one closed, addressing technical pain points around agent execution, install robustness, and image hardening. Recent PR focus spans skill engineering, installation fixes (including sudo prompts and jq dependency), container stability, security hardening, and infrastructure improvements (OneCLI gateway publishing, CI dependency management). Overall, the project is healthy with a strong trend toward quality and maintainability.
### 2. Releases
No new releases available. No breaking changes or migration notes to report.
### 3. Project Progress
- **Merged/Closed PRs (24h)**: 16 PRs were submitted; 7 were merged or closed (including 12 closed/resolved). Notable closed PRs include fixes for `nanoclaw.sh` installation hang, jq dependency installation for channel setup, container advisory cleanup, and Mattermost setup retry logic.
- **Key Progress**:
  - **Skill and Hardening**: Focus on adding skills, enforcing adherence to guidelines, and hardening core functionality. Closed PRs cover skill contribution, plugin restamp fixes, and safety hardening (advisory clearance, permissions).
  - **Installation and Setup**: Multiple PRs resolve installation instability—adding sudo prompts, installing `jq`, and clarifying service names for WSL/Ubuntu. Closed PRs address setup diagnostics completeness and the sudo password requirement.
  - **Container and Agent Image**: Active work on hardened agent images, including advisory clearance, version bumps, and container fixes. PRs update image versions as `v2026.10.0` and its incremental variants.
  - **Infrastructure**: Improvements to CI (adding Dependabot), OneCLI gateway publishing, and service name documentation.
### 4. Community Hot Topics
- **Open Issue #4272**: *[OPEN] Record how a task was solved and distill it into a reusable method skill* (Author: carstenf, Created 2026-11-05). The issue addresses the loss of task execution details after long multi-day research work, requesting skill distillation from task solutions to improve agent reusability. References related issues #3089 (agent-driven skill learning) and #2843 (`/learn`).
- **Open PRs**: PRs focused on skills, hardening, and installation (e.g., #4271 agent image hardening, #4270 advisory cleanup, #4266 setup diagnostics) are active contributors to skill adoption, safety, and operational stability.
### 5. Bugs & Stability
- **Bugs Covered**:
  1. **Issue #2025 (Closed)**: `nanoclaw.sh` hangs during "Installing the basics…" when sudo requires a password (Author: dooha333, Created 2026-04-26, Updated 2026-11-05). Root cause: installation step depends on sudo prompts and lacks proper pre-flight handling. Fix PR #4200 resolved this by adding sudo password prompts upfront.
  2. **Open PR #4270**: Container image carries known fixable advisories (1 Critical, 24 High), requiring cleanup to ensure image stability.
  3. **Open PR #4266**: Setup diagnostics are incomplete, lossy, and contain user text, affecting operational clarity.
- **Severity Ranking**:
  1. **Medium**: Issue #2025 installation hang (fixed, status closed; solved via PR #4200).
  2. **Medium**: Open advisory issue (fixed via PR #4270, status open).
  3. **Medium**: Setup diagnostics completeness issue (fixed via PR #4266, status open).
- **Stability Assessment**: No critical or blocker-level bugs reported today. Most issues are in medium severity and addressed via resolved PRs, indicating stable core functionality and ongoing improvements.
### 6. Feature Requests & Roadmap Signals
- **Active Feature Directions**:
  - **Skill Management**: Strong demand for dynamic skill distillation and reusability (per Issue #4272).
  - **Hardening and Stability**: Priority on agent image security, setup robustness (including sudo handling), and installation reliability.
  - **Scalable Infrastructure**: Focus on CI/CD dependency management, OneCLI gateway deployment, and cross-platform support (Ubuntu, WSL).
- **Predicted Next-Version Focus**:
  - **Skill Engineering**: More on distilled reusable skills, guided by current skill learning trends.
  - **Installation and Container Stability**: Refinement of installation prompts, image hardening, and service integration improvements.
  - **Security Hardening**: Continued clearance of security advisories, plus better operational diagnostics.

### 7. User Feedback Summary
- **Key Pain Points**:
  1. **Task Execution Details Loss**: Users report losing step order and check details after long research tasks, requiring skill distillation to improve reusability (per Issue #4272).
  2. **Installation Inconsistency**: Users encounter installation hangs and environment-specific issues (e.g., sudo prompts, WSL compatibility) during setup.
  3. **Operational Simplification Needs**: Current setup diagnostics lack completeness and clear service info, affecting operational understanding.
- **Use Cases**:
  - Reusing agent task methods and skills across projects (demanding distillation of execution patterns).
  - Ensuring reliable installation across different host environments (e.g., Linux, WSL).
  - Improving operational transparency in setup and environment adaptation.
- **Satisfaction Level**: Positive feedback on bug fixes (installation issues resolved, container/security hardening implemented), indicating good user acceptance of stability and usability improvements.

### 8. Backlog Watch
- **High Priority**:
  - **Issue #4272 (Open)**: Task solution skill distillation—requires maintainer effort to develop and implement reusable skill methods based on problem-solving patterns.
  - **Issue #2025 (Closed, but root cause unresolved)**: The installation hang is closed, but underlying implementation (sudo pre-flight, installation logic) may need further refinement to prevent recurrence.
- **Secondary Watch**:
  - **Open PRs**: Open PRs related to container advisory cleanup, setup diagnostics improvement, and image hardening may require continuous engagement to ensure alignment with current security and stability standards.
  - **CI/CD**: The addition of Dependabot for dependency management is relevant for ongoing release synchronization, but may need adjustment of version cooldown policies to prevent alert noise.

*Data Sources: GitHub Issues (last 24h: 2 issues, 1 active/1 closed) and PRs (last 24h: 16 PRs, 9 open/7 merged/closed)*

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

# ZeroClaw Project Digest (2026-11-06)

## 1. Today's Overview
ZeroClaw maintains high activity with 30 issues and 50 pull requests updated in the last 24 hours, signaling an active development cycle. The project is heavily focused on security hardening for the upcoming v0.9.0 release, specifically addressing identity access controls, OIDC configuration validation, and sandbox tool scoping. Simultaneously, there is significant architectural momentum toward a Rust/WASM web UI prototype and an append-only session history system.

## 2. Releases
**None.** No new releases were detected in the last 24 hours.

## 3. Project Progress
While no releases occurred, progress is evident in the PR queue, which consists entirely of open changes rather than merged code. The activity is concentrated on fixing regressions and preparing for the v0.9.0 release gate. Notable advancements include:
*   **Session History:** A large-scale feature PR (#11921) implementing an append-only session event history to replace separate transcript writers.
*   **Security Hardening:** Multiple PRs targeting the v0.9.0 release gate, specifically limiting OIDC bearer verification, withholding principal-unaware tools from non-admins, and fixing plugin memory limits.
*   **Infrastructure:** A PR accepting a security advisory for `pin-utils` while awaiting an async-imap migration, and a PR fixing HTTP client caching issues in tests.

## 4. Community Hot Topics
The most active community discussions are centered on security architecture and web UI migration.

*   **Web UI Migration (Issue #8132):** A high-priority architectural debate is ongoing regarding the evaluation of a Rust/WASM web UI prototype (using Dioxus, Leptos, or Yew) to replace the React SPA + Vite pipeline. This is a 13-comment discussion involving a maintainer request to split the scope from a previous WebAssembly-first initiative.
    *   *Link:* [Issue #8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132)
*   **Matrix Tool Bug (Issue #10926):** A bug in the `send_via` tool that treats peer user identities as room destinations is causing degraded behavior, receiving 8 comments.
    *   *Link:* [Issue #10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926)
*   **SOP Daemon Defaults (Issue #9779):** Users report that the SOP subsystem never loads because the daemon gate requires the `sops_dir` config option, ignoring the documented default value. This critical issue has 7 comments.
    *   *Link:* [Issue #9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)

## 5. Bugs & Stability
Several critical and high-severity bugs are flagged for the v0.9.0 release, with 2 confirmed critical (S0) security risks.

*   **S0 - Critical Security Risks:**
    1.  **Session-Data Tool Bypass (Issue #11127):** A non-admin principal with `sessions_history` access can read other users' data by bypassing RPC principal-ownership boundaries.
    2.  **SOP Wildcard Execution (Issue #11123):** SOP execution accepts wildcard tool selectors without requiring explicit `tools:execute` permission, allowing potential privilege escalation.
    3.  **Owned Sessions Memory Leak (Issue #11239):** "Owned" sessions reach the shared memory plane through specific tool paths, risking data leakage.
*   **S1 - High Priority:**
    1.  **Gateway Pairing Dashboard (Issue #9394):** The pairing dashboard is unreadable, and pairing codes never expire.
    2.  **OIDC Bearer Verification (Issue #12047):** No attempt limiter or outbound cap exists on gateway routes that verify OIDC tokens.
    3.  **Session Ownership Bypass (Issue #11126):** Queued session operations retain revoked administrator ownership.
*   **S2 - Medium:**
    1.  **Cron Update Silent Discard (Issue #9770):** The `cron update` command silently discards changes to six columns in declarative jobs.
    2.  **Matrix SendVia (Issue #10926):** As noted above.
    3.  **Plugin Memory Limits (Issue #12145):** Wasmtime defaults allow plugins to exceed their configured memory budget.
    4.  **Deferred Tool Prompt Cache (Issue #11703):** Activating deferred tools via `tool_search` changes the system prompt and breaks the prompt cache.

## 6. Feature Requests & Roadmap Signals
*   **Web Managed Document Upload (Issue #12181):** A new feature request to allow the dashboard web chat to attach documents as managed files (Phase 2 of #9488), currently blocked by the lack of a web upload interface.
*   **Multi-Registry Placement Exception (PR #12234):** A proposal to place registry utilities temporarily within the plugins crate to satisfy a specific contract boundary, suggesting a need for better separation of concerns in the runtime.
*   **Dashboard Chat for Non-Admins (Issue #11984):** A request to enable chat functionality for signed-in accounts that do not have administrator rights, enhancing dashboard accessibility.

## 7. User Feedback Summary
User feedback highlights a tension between developer experience and security strictness. Users are frustrated by "silent" failures (e.g., SOPs not loading without error, cron updates discarding changes) and "unintended" privilege escalations (e.g., non-admins gaining access to restricted tools via wildcards). Additionally, there is strong demand for better UX in the web dashboard, specifically regarding document uploads and the visibility of configuration options for non-admin users.

## 8. Backlog Watch
Several high-priority issues remain open, indicating a heavy maintenance burden before v0.9.0.
*   **Security Policy Fixes (Issues #11126, #11127, #11123, #12046, #12051):** Multiple interrelated identity-access control bugs need resolution.
*   **OIDC & Gateway Hardening (Issues #12047, #12050, #12233):** Security concerns regarding token verification and CSRF risks on the gateway.
*   **Web UI Prototype (Issue #8132):** A major architectural decision regarding the tech stack (Rust/WASM vs React) is pending, potentially affecting the project's future web capabilities.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*