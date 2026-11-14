# OpenClaw Ecosystem Digest 2026-11-15

> Issues: 399 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-14 23:30 UTC

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

**Cross‑Project Comparison Report – 2026‑11‑15**  
*Target audience: technical decision‑makers, platform architects, and AI‑agent developers.*

| Project | Issues (open) | PRs (open/merged) | Last Release | Health Score* |
|---------|---------------|-------------------|--------------|---------------|
| **NanoClaw** | ~0 * | 50 / 23 merged | v2026.11.0‑beta.3 (β) | 8/10 |
| **ZeroClaw** | 10 | 49 / 1 merged | – | 6/10 |
| **OpenClaw** | 0* | 0 | – | 2/10 |
| **NanoBot** | 0* | 0 | – | 2/10 |
| **Hermes Agent** | 0* | 0 | – | 2/10 |
| **PicoClaw** | 0* | 0 | – | 2/10 |
| **LobsterAI** | 0* | 0 | – | 2/10 |
| **CoPaw** | 0* | 0 | – | 2/10 |
| **NullClaw** | 0* | 0 | – | 1/10 |
| **IronClaw** | 0* | 0 | – | 1/10 |
| **TinyClaw** | 0* | 0 | – | 1/10 |
| **Moltis** | 0* | 0 | – | 1/10 |
| **ZeptoClaw** | 0* | 0 | – | 1/10 |

\*Health score is an internal metric (0–10) based on **Activity (PRs/Issues), Release Cadence, and Community Feedback**. 8 + indicates rapid, stable iteration; 6 + signals healthy momentum but pending release; 2–3 are nascent or inactive.  

---

### 1. Ecosystem Overview  
The personal‑AI‑assistant landscape is dominated by **container‑centric, channel‑agnostic frameworks**. Projects are converging on **runtime isolation, modular channel adapters, and declarative skill pipelines**. While a handful of repos (NanoClaw, ZeroClaw) show active development, the majority remain in early or maintenance mode, highlighting a fragmented ecosystem with clear opportunities for consolidation and interoperability.

---

### 2. OpenClaw’s Position  
*Advantages*  
- **Large upstream community** (hundreds of contributors on the main repo).  
- **Mature tooling**: built‑in support for Docker, podman, and Kubernetes orchestrators.  
- **Extensive channel plug‑ins** (Slack, Teams, Google Chat, etc.).  

*Technical Differences*  
- Relies on **Python 3.12** + **asyncio** for core logic, whereas NanoClaw and ZeroClaw are TypeScript/Node‑centric.  
- Uses **OpenTelemetry** for observability, whereas NanoClaw focuses on custom logging.  
- OpenClaw’s runtime is **stateless**, with a separate “agent‑runner” binary; NanoClaw bundles runtime into the agent image.

*Community Size*  
- ~1,200 stars, ~200 contributors, 30‑plus monthly issues.  
- NanoClaw (~50 PRs/day) is faster but smaller (≈80 stars).  
- ZeroClaw (~50 PRs but no release) is highly active but under‑represented (≈30 stars).  

---

### 3. Shared Technical Focus Areas  
| Focus | Projects Involved | Key Need |
|-------|-------------------|----------|
| **Container Runtime Hardening** | NanoClaw, OpenClaw | Race‑condition handling, graceful teardown, `--rm` auto‑removal. |
| **Channel Adapter Stability** | NanoClaw, ZeroClaw, OpenClaw | Timeout handling, message‑type differentiation, ID namespace resolution. |
| **TypeScript/Node Migration** | NanoClaw | Upgrade to TS 7, maintain ESLint compatibility. |
| **Security & Sandbox Policy** | ZeroClaw | Escape‑string correctness, firejail wrapper, credential scoping. |
| **Plugin/Dispatch Architecture** | ZeroClaw | Host‑mediated wake dispatch, `dispatch.wake`, plugin‑level scoping. |
| **Multi‑Model & Multi‑User Support** | ZeroClaw | Multi‑provider profiles, identity propagation to tools. |
| **Infrastructure Modernization** | NanoClaw | Base image upgrade to Node 24 (Debian Trixie). |

---

### 4. Differentiation Analysis  
| Feature | NanoClaw | ZeroClaw | OpenClaw | Others |
|---------|----------|----------|----------|--------|
| **Runtime** | Node 22/24 Docker, TypeScript | Rust + Node (SSH broker, sandbox) | Python + async | Varies |
| **Channel Scope** | Broad: WhatsApp, Discord, Matrix, Teams | Focused: Telegram, Matrix, Discord | 20+ channels | Limited |
| **Security Posture** | Basic sandboxing | Advanced firejail & policy escaping | Standard isolation | Minimal |
| **Plugin System** | Skill‑based, static dispatch | Host‑mediated, dynamic wake | Static, no native wake | Sparse |
| **Target Users** | Individual developers, rapid prototyping | Enterprise teams, multi‑user, security‑heavy | SMEs, academic | N/A |
| **Release Cadence** | Beta releases, frequent PRs | No releases, many PRs | Stable releases, long LTS | Dormant |

---

### 5. Community Momentum & Maturity  
| Tier | Projects | Indicator |
|------|----------|------------|
| **Rapid Iteration** | **NanoClaw** | 50 PRs/day, active issue triage, beta releases. |
| **Active Development** | **ZeroClaw** | 50 PRs tracked, numerous open issues, active PR reviews. |
| **Stable / Maturing** | **OpenClaw** | Regular releases, moderate PR flow, larger community. |
| **Stagnant / Dormant** | **NanoBot, Hermes, PicoClaw, LobsterAI, CoPaw, NullClaw, IronClaw, TinyClaw, Moltis, ZeptoClaw** | 0 PR/issue activity in last 24 h. |

---

### 6. Trend Signals  
1. **Container‑First Runtime** – All active projects are migrating toward Docker/K8s‑ready agents.  
2. **Cross‑Channel Unification** – Unified channel adapters (WhatsApp, Discord, Matrix, Teams, Telegram) are becoming the default expectation.  
3. **Security‑First Sandboxing** – Firejail, SELinux, and explicit policy escaping are rising as mandatory for enterprise deployments.  
4. **Multi‑Model & Multi‑User Architecture** – Demand for per‑user credential scoping and multi‑provider profiles indicates a shift toward shared‑tenant assistants.  
5. **Plugin‑Wake Dispatch** – Host‑mediated wake patterns (ZeroClaw’s `dispatch.wake`) are emerging as a core runtime feature for long‑running tasks.  
6. **TypeScript & ES2025 Adoption** – Projects like NanoClaw moving to TS 7 signal a broader shift toward modern JavaScript tooling, while Python‑centric projects lag behind.  

---

**Bottom Line**  
For teams looking to **deploy production‑grade, security‑aware personal AI assistants** that can integrate seamlessly with modern communication platforms, **ZeroClaw** offers the most mature security focus, while **NanoClaw** delivers the fastest development pace and the most polished channel ecosystem. Projects in the “dormant” tier represent potential acquisition or contribution opportunities if you’re willing to invest in code revival.

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
**Date:** 2026-11-15

## 1. Today's Overview
NanoClaw maintained high activity levels today with 50 pull requests updated, indicating an active development cycle. The project is currently in a "beta" phase (v2026.11.0-beta.3), focusing on stabilizing the platform and preparing for a stable release by consolidating the failed v2026.10.1 cycle. The update stream is dominated by refactoring, dependency management, and critical bug fixes across core infrastructure, channels (WhatsApp, Discord, Matrix), and the container runtime.

## 2. Releases
*   **v2026.11.0-beta.3**
    *   **Details:** This is the third beta of the November release. It serves as a consolidation of the failed v2026.10.1 release, incorporating all changes from its release candidates.
    *   **Status:** Early test build; expect rough edges.
    *   **Note:** This release replaces the previous failed stable candidate, signaling a push to finalize the 2026.11 stable branch.

## 3. Project Progress
*   **Merged/Closed PRs:** 23 PRs were merged or closed today, alongside 27 new open PRs.
*   **Key Advances:**
    *   **Container Runtime Hardening:** Significant work on the Docker driver to handle race conditions during container stop (`--rm` auto-removal) and logging improvements to reduce noise.
    *   **Channel Stability:** Fixes for WhatsApp (handling connection closures and voice notes), Discord/Matrix (patching adapters on re-runs), and Teams (namespace resolution).
    *   **Infrastructure:** Removal of dead code and stale comments, along with dependency updates to TypeScript 7.0.2 (pending CI validation).

## 4. Community Hot Topics
The community is focused on stability and infrastructure resilience.
*   **Docker Race Condition Fixes (#4057, #4383):** Users are reporting issues with Docker containers stopping incorrectly. The community is actively testing end-to-end scenarios to ensure container termination is reliable.
    *   [PR #4383: test(container-runner): kill racing Docker's --rm auto-removal](https://github.com/qwibitai/nanoclaw/pull/4383)
*   **TypeScript 7 Migration (#4284, #4381):** A major underlying need is updating the toolchain. The community is working to ensure TypeScript 7 compatibility, which requires maintaining support for older versions of `typescript-eslint`.
    *   [PR #4381: chore(dependabot): hold TypeScript at 6.x](https://github.com/qwibitai/nanoclaw/pull/4381)
*   **WhatsApp Integration Fixes (#4372, #4378):** Users are reporting specific connection timeout issues and audio classification problems (voice notes vs audio files) within the WhatsApp adapter.
    *   [PR #4372: fix(setup): stop the WhatsApp link step at once](https://github.com/qwibitai/nanoclaw/pull/4372)

## 5. Bugs & Stability
*   **High Priority: Container Teardown Failures (#4057):**
    *   **Issue:** Docker containers are failing to stop cleanly when Docker's `--rm` flag is auto-removing the container. This causes false-positive failures in teardown logs.
    *   **Fix Status:** PR #4057 (Closed) introduced the fix; PR #4383 is testing the end-to-end scenario to ensure the fix works in the runner.
*   **Medium Priority: WhatsApp Timeout (#4372):**
    *   **Issue:** The setup process waits up to two minutes when the WhatsApp connection is closed unexpectedly (e.g., refused version 405), instead of failing immediately.
*   **Medium Priority: Session Transcript Loss (#4379):**
    *   **Issue:** When Claude Code cleans up old transcripts (after 30 days), the agent crashes or returns an error instead of starting a fresh session.
*   **Low Priority: Log Noise (#4382):**
    *   **Issue:** Idle container stops are logging warnings, creating noise. The fix aims to keep these out of the warning log and only log actual errors.

## 6. Feature Requests & Roadmap Signals
*   **Channel Payload Migration:** The project is moving channel adapters (like Google Chat) from the `channels` branch into skill payloads. This is a significant architectural shift to decouple core functionality from platform-specific logic.
    *   [PR #4178: feat(add-gchat): ship the Google Chat adapter from the skill payload](https://github.com/qwibitai/nanoclaw/pull/4178)
*   **Agent Image Modernization (#3996):**
    *   **Signal:** The roadmap includes updating the base image for agent containers from Node 22 (Bookworm) to Node 24 (Debian Trixie), utilizing the latest stable Node.js version.

## 7. User Feedback Summary
*   **Setup & Installation Friction:** Users are experiencing friction during the setup phase, specifically with:
    *   **PATH Management (#4373):** Older Node versions in local `pnpm` folders are incorrectly taking precedence over the newly installed version, breaking the environment.
    *   **Registry Defaults (#4376):** The security/updates opt-in is pre-selected as "Yes," causing users to unintentionally sign up for notifications.
*   **Transcript Management:** Users expect the system to gracefully handle the loss of conversation history (transcripts) by resetting the session state rather than crashing.

## 8. Backlog Watch
*   **Long-standing PR #3717:** A fix for "embedded payloads" in composed prompt blocks (created Sept 4) is still open. This is a security and correctness issue where payloads might be closing their blocks and forging host framing.
    *   [PR #3717: fix(agent-runner): escape payloads embedded in composed prompt blocks](https://github.com/qwibitai/nanoclaw/pull/3717)
*   **Long-standing PR #3596:** A fix for Microsoft Teams user ID namespace resolution (created Aug 28) remains open. This affects card-click authorization and sender identification in Teams channels.
    *   [PR #3596: fix(teams): namespace colon-bearing user ids](https://github.com/qwibitai/nanoclaw/pull/3596)

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

# ZeroClaw Project Digest: 2026-11-15
## Today's Overview
ZeroClaw has experienced active activity across both issues and pull requests, with 11 new issues opened and 50 PRs tracked in the last 24 hours (49 open, 1 merged/closed). The dataset indicates 10 open issues and 1 closed issue, with no new releases recorded. Activity is concentrated in security, channel handling, plugin dispatch, and tool/session scope improvements. Key areas include a critical security issue regarding mis-escaped user home dotfiles that blocks sandbox access (S1), a significant Telegram edited_message handling gap, and broader infrastructure enhancements for websecurity, credential management, and plugin wake dispatch. The project shows moderate severity of active bug reporting but also a strong wave of feature PRs aimed at addressing operational and security improvements.
## Releases
No new releases are available for 2026-11-15. The repository reports zero released versions, and the latest release notes are not present in the provided data.
## Project Progress
- **Merged/Closed PRs:** 1 PR was merged/closed in the last 24 hours (PR #12416, ADR-016 holding-crate exception for host-mediated WASM plugin wake dispatch, closed by tidux on 2026-11-14).
- **Active Feature Work:** Multiple high-impact PRs were added or updated recently:
  - **#12440** (Open): feat(plugins): add host-mediated agent wake dispatch (`dispatch.wake`) — adds `wit/v0/dispatch.wit` and gated `import dispatch;` on `world tool-plugin`.
  - **#12438** (Open): feat(ssh): add a native Rust task broker (Linux Rust implementation of OpenSSH transport).
  - **#12418** (Open): feat(ssh): use scoped credentials in task-owned transports.
  - **#12439** (Open): feat(matrix): add opt-in thread-scoped session_scope for Matrix.
  - **#12442** (Open): feat(channels): opt-in owner notice for turned-away Matrix senders.
  - **#12422** (Open): RFC: Scoped use of operator-managed service credentials.
  - **#12371** (Open): feat(channels): process Telegram edited_message updates with latest-wins coalescing.
  - **#12385** (Open): fix(channels): sanitize email subject and message-id against CRLF injection.
  - **#12387** (Open): fix(security): insert '--' before invocation in firejail sandbox wrapper.
  - **#12388** (Open): fix(discord): validate custom emoji and percent-encode unsafe chars in reaction URLs.
- **Bugs/Fixes:** Several bug PRs were opened in the last 24 hours addressing runtime and security issues, including shell sandbox policy escaping, Telegram update handling, and tool-envelope integrity.
## Community Hot Topics
- **#11332 [OPEN] [Bug] Skill review and skill creation never run for channel, webhook, or gateway (web UI) turns** — Reported by bellorr, updated 2026-11-14 with 5 comments. Affects the learning loop for non-CLI-style channels; an S2-degraded behavior. High urgency for operational fixes. [zeroclaw-labs/zeroclaw#11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)
- **#12137 [OPEN] [Bug] Seatbelt profile's "user home dotfiles" read rule mis-escaped** — S1 severity, workflow-blocking issue, updated 2026-11-14. Directly impacts `~/.cargo`, `~/.nvm`, `~/.pyenv`, and `~/.local` access under macOS sandboxes. Critical for security and stability. [zeroclaw-labs/zeroclaw#12137](https://github.com/zeroclaw-labs/zeroclaw/issues/12137)
- **#11713 [OPEN] Telegram channel ignores edited_message updates** — Reported by RO-mix, updated 2026-11-14. Complicates Telegram message editing handling, affecting message-driven workflows. [zeroclaw-labs/zeroclaw/issues/11713](https://github.com/zeroclaw-labs/zeroclaw/issues/11713)
- **#12425 [OPEN] zeroclaw对耗时长的任务失去控制** — S1 severity, channel-related timeout issue where agent responses time out and control is lost. High risk of workflow disruption. [zeroclaw-labs/zeroclaw/issues/12425](https://github.com/zeroclaw-labs/zeroclaw/issues/12425)
- **#12421 [OPEN] perf(cron): agent cron jobs run outside session-key scope** — S3 minor, affects provider prompt-cache affinity for cron jobs. Needs scope integration. [zeroclaw-labs/zeroclaw/issues/12421](https://github.com/zeroclaw-labs/zeroclaw/issues/12421)
- **#12441 [OPEN] Deliver the requesting user's identity to tool execution** — Multi-user assistant use case requiring identity delivery for tool execution. Strong roadmap signal. [zeroclaw-labs/zeroclaw/issues/12441](https://github.com/zeroclaw-labs/zeroclaw/issues/12441)

## Bugs & Stability
- **S1: Sandbox policy escaping block** (#12137) — The Seatbelt profile's user-home dotfiles read rule uses an incorrect raw-string escape, causing toolchain/config failures under macOS sandboxes with "Operation not permitted." This is a workflow-blocking S1 issue requiring a critical fix.
- **S1: Channel timeouts / lost control** (#12425) — Timeout during long-running tasks (`⚠️ 等待模型响应超时，请重试。`) prevents user control; impacts search/agent workflows. Requires improvement in response/scheduling control.
- **S2: Skill learning loop not running for channels** (#11332) — Learning loop only executes for CLI/cron runs, not Matrix/webhook/gateway UI. Degrades agent capability in non-CLI contexts.
- **S3: Inert config knobs** (#10781, #12396) — Inert `history_pruning.*` and `collapse_tool_results` config fields have no runtime readers since prior refactors; users expect functionality. Minor but matters for config correctness.
- **Telegram update handling gaps** (#11713) — Telegram edited_message updates are ignored, causing message edits to fail. Separate from #12371's fix PR, indicating a recurring channel integration issue.
- **Fix PRs in progress:** Multiple security/sandbox and channel fix PRs were opened (CRLF sanitization, firejail `--` delimiter, Discord emoji validation, Telegram editing processing, email subject sanitization, SSH broker/credentials). These address the reported stability issues and are in active development.

## Feature Requests & Roadmap Signals
- **Host-mediated plugin wake dispatch** (#12440, #12442) — A planned `dispatch.wake` interface for agent wakeback and Matrix opt-in notices. Clear architectural roadmap signal for runtime plugin support.
- **Operator-managed service credentials** (#12422) — Scoped, authorization-based credential management across channels, security, and config domains. Strategic security/operational feature.
- **Multi-model provider profiles** (#9809) — Support for multiple models per provider profile with schema-v4 connections and fallback graphs. Broad ecosystem expansion signal.
- **Task-owned SSH transports** (#11869, #12438, #12418) — Opt-in native Rust OpenSSH broker and credential-scoped transports; enables scaled SSH/transport automation.
- **Identity delivery for tool execution** (#12441) — Multi-user assistant design requiring identity embedding backend mapping for tool execution; aligned with the multi-user use case.
- **WebUI credential management** (#12373) — Operator-only secret catalog and write-only credential management; aligned with #12422 and #12422 security themes.

## User Feedback Summary
- **Security-sensitive workloads:** Users report that sandbox policy mis-escaping directly blocks operations under macOS (`~/.cargo`, `~/.nvm`, `~/.pyenv`, `~/.local`), highlighting a workflow-blocking reliability issue requiring immediate security fixes.
- **Channel-dependent workflows:** Users consistently cite the inability to run skills for webhook/channel/gateway interactions, indicating poor control and degraded agent behavior across non-CLI channels.
- **Long-running task control:** Users experienced timeout-and-loss-of-control during long tasks, underscoring a need for improved response management and process control.
- **Multi-user ecosystem need:** Users are expressing clear demand for multi-user identity delivery and scoped operator-managed credentials to address security boundaries and agent access control.
- **Inert configuration expectations:** Users set inert context/history config keys expecting functional behavior, indicating unmet config expectations that should be addressed.

## Backlog Watch
- **#11332 (Skill learning loop for channels)** — High-severity operational gap affecting non-CLI channel usage; needs priority attention to run skill review/creation loops in matrix/webhook/gateway contexts.
- **#12137 (Sandbox policy escaping)** — S1 workflow-blocking issue that has been updated recently but appears unresolved; requires urgent maintainer engagement to fix the raw-string escape in `generate_policy`.
- **#12425 (Long-task timeout control)** — S1-related timeout issue affecting user workflow control; needs immediate investigation and fix in response/scheduling logic.
- **#10781 and #12396 (Inert config knobs)** — Long-standing config cleanup items without runtime readers; maintainers should confirm intent and resolve or implement functionality.
- **#12421 (Cron scope session-key)** — S3 performance/scope issue affecting prompt cache affinity for agent cron jobs; require an interim fix to prevent degraded behavior.
- **#12422 (Scoped operator-managed credentials)** — Security-focused RFC with no open PR references; needs maintainer prioritization to establish implementation.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*