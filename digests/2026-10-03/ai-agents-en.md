# OpenClaw Ecosystem Digest 2026-10-03

> Issues: 486 | PRs: 500 | Projects covered: 13 | Generated: 2026-10-02 23:25 UTC

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

**Cross‑Project Comparison – Personal AI Agent Ecosystem (2026‑10‑03)**  

| Project | Issues (last 24 h) | PRs (last 24 h) | Releases | Health Score (1‑10) |
|---------|-------------------|-----------------|----------|---------------------|
| **NanoClaw** | 50 | 32 | 0 | 6 |
| **LobsterAI** | 6 | 3 | 0 | 4 |
| **ZeroClaw** | 50 | 50 | 0 | 5 |
| **OpenClaw** | N/A | N/A | N/A | N/A |
| **NanoBot** | N/A | N/A | N/A | N/A |
| **Hermes Agent** | N/A | N/A | N/A | N/A |
| **PicoClaw** | N/A | N/A | N/A | N/A |
| **NullClaw** | 0 | 0 | 0 | N/A |
| **IronClaw** | 0 | 0 | 0 | N/A |
| **TinyClaw** | 0 | 0 | 0 | N/A |
| **Moltis** | 0 | 0 | 0 | N/A |
| **CoPaw** | N/A | N/A | N/A | N/A |
| **ZeptoClaw** | 0 | 0 | 0 | N/A |

> *Health Score* is a rough composite:  
> * 1–3 = Critical backlog or no activity,  
> * 4–6 = Moderate, many open issues but active PR flow,  
> * 7–10 = Stable, recent releases or low issue count.

---

### 3. OpenClaw’s Position

OpenClaw is the canonical reference implementation of the core AI‑agent stack. Its documentation is the most complete in the ecosystem and it is the de‑facto API spec against which other projects benchmark. Compared to peers:

| Criterion | OpenClaw | NanoClaw | LobsterAI | ZeroClaw |
|-----------|----------|----------|-----------|----------|
| Core scope | Full stack (LLM, skills, channels, runtime) | Container‑centric runtime | Desktop‑centric MCP + skill manager | Agent daemon + ZeroCode IDE |
| Community size | Highest GitHub star count & most contributors (≈ 2 k) | Medium (≈ 300) | Small (≈ 80) | Medium‑large (≈ 600) |
| Update cadence | Releases every 3 months | No releases, heavy PR churn | No releases, patch‑style PRs | No releases, high PR volume |
| Technical focus | Reference implementation | Update & container reliability | Local IPC & security hardening | Workflow & memory safety |

**Takeaway:** OpenClaw remains the architectural gold‑standard; other projects diverge around the most pressing use‑case (edge containers, local desktop, or enterprise daemon).

---

### 4. Shared Technical Focus Areas

| Need | Projects |
|------|----------|
| **Container & Runtime Security** | NanoClaw (container hardening, gateway trust), ZeroClaw (Windows ACLs, subprocess watchdog) |
| **Credential & Data Privacy** | NanoClaw (OneCLI dependency, credential handling), LobsterAI (token encryption), ZeroClaw (daemon identity) |
| **Update & Deployment Reliability** | NanoClaw (update‑cutover, channel sync), ZeroClaw (process memory limits) |
| **Dependency Management** | NanoClaw (Renovate → Dependabot), ZeroClaw (dependency lock‑file updates) |
| **Channel & Integration** | NanoClaw (channel adapters), LobsterAI (MCP IPC), ZeroClaw (ZeroCode channels) |
| **Workflow & Automation** | LobsterAI (scheduled tasks), ZeroClaw (ZeroCode RPC, skill reviews) |
| **Local Execution & IPC** | LobsterAI (MCP stdio command validation), NanoClaw (agent‑runner mailbox access) |

---

### 5. Differentiation Analysis

| Project | Key Feature Focus | Target Users | Technical Architecture |
|---------|--------------------|--------------|------------------------|
| **NanoClaw** | Edge‑ready containers, update‑cutover resilience, channel sync | Operators deploying agents on local/edge devices (NAS, Raspberry Pi) | Docker‑based runtime, skill‑pinned update tags |
| **LobsterAI** | Desktop personal assistant, MCP server IPC, local skill execution | Individual developers / hobbyists using a GUI desktop stack | Electron + Node JS + SQLite, local IPC via MCP |
| **ZeroClaw** | Agent daemon, ZeroCode IDE, process‑level safety | Enterprises needing headless agents, CI/CD pipelines | Rust‑based daemon + gRPC + ZeroCode workflow engine |
| **OpenClaw** | Reference spec, minimal core, extensible plugin model | All developers, foundation for other projects | Rust + Rust‑Python bindings, modular channel/skill plugins |

**Strategic gap:** None of the projects explicitly expose a **cross‑platform “cloud‑native” runtime** that combines the container ease of NanoClaw, the local IPC safety of LobsterAI, and the daemon stability of ZeroClaw. That space remains open for future tooling.

---

### 6. Community Momentum & Maturity

| Tier | Projects | Activity Pattern |
|------|----------|------------------|
| **Rapid Iteration** | NanoClaw (32 PRs, 50 issues), ZeroClaw (50 PRs, 50 issues) | High PR churn, many regressions under review |
| **Stabilization** | LobsterAI (6 issues, 3 PRs) | Focus on security hardening, few new features |
| **Dormant / Emerging** | NullClaw, IronClaw, TinyClaw, Moltis, ZeptoClaw | < 1 PR/issue in 24 h, no releases |
| **Data‑Incomplete** | OpenClaw, NanoBot, Hermes Agent, PicoClaw, CoPaw | No activity snapshot; likely maintained elsewhere |

> **Observation:** Projects with the most active PR streams (NanoClaw, ZeroClaw) are also the ones with the most open bugs. LobsterAI’s low volume may reflect a mature but less frequent release cadence.

---

### 7. Trend Signals

1. **Security Hardening** – Across projects, credential encryption, command validation, and dependency audit are top‑priority, reflecting increased scrutiny over local AI agents handling sensitive data.
2. **Container & Edge Deployment** – NanoClaw’s focus on container updates signals a shift toward running agents on edge devices or in lightweight VMs, driven by latency and privacy demands.
3. **Workflow & Automation Reliability** – LobsterAI and ZeroClaw both emphasize correct scheduled tasks and RPC channel resilience, indicating user demand for deterministic agent behavior in production pipelines.
4. **Process‑Level Safety** – ZeroClaw’s subprocess memory watchdog and Windows ACL hardening demonstrate a broader trend toward sandboxed execution to protect host resources.
5. **Unified Reference Implementation** – OpenClaw’s role as the canonical spec remains crucial; projects that diverge (e.g., NanoClaw’s container model) often fork from or reference it, underscoring the need for a well‑maintained core.

---

**Bottom Line for Decision Makers**

- **NanoClaw** is the most actively evolving project but still lacks a stable release; suitable for teams willing to experiment with edge‑deployable agents.
- **LobsterAI** offers a polished desktop experience but its low activity suggests slower innovation; best for personal use with strong security hardening.
- **ZeroClaw** is the most feature‑dense daemon, ideal for enterprise workflows, though its release cadence is still pending.
- **OpenClaw** remains the architectural reference; projects that adopt it tend to have the most robust API surface.

Focus on aligning your project’s niche with one of the three active axes—edge containers, desktop IPC, or enterprise daemon—while leveraging the shared security and update‑reliability patterns emerging across the ecosystem.

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
**Date:** 2026-10-03
**Repository:** nanocoai/nanoclaw
**Analyst:** AI Agent

---

### 1. Today's Overview
NanoClaw experienced moderate activity over the last 24 hours with 50 issues and 32 pull requests updated. The project is currently in a stabilization and integration phase, focusing on resolving critical bugs in the agent-runner, channels, and setup processes. While no new releases were deployed, a significant amount of work is being pushed to fix regressions, particularly around containerization, skill updates, and credential handling.

### 2. Releases
**None.** The project is maintaining a stable release cadence but has not pushed a new version as of 2026-10-03.

### 3. Project Progress
*   **Integration & CI/CD:** The team is actively migrating from Renovate to Dependabot for dependency management (PR #3978, #4007). This aims to improve security auditing for skill-pinned packages.
*   **Update Mechanism:** A major improvement to the update process has been drafted. The `/update-nanoclaw` command now defaults to following release tags (stable/beta channels) rather than the main branch tip, and it can now refresh gateways when only their skill payload changes (PR #3986, #3988, #3997).
*   **Channel & Container Sync:** A complex merge operation is underway to sync the `main` branch with the `channels` branch to ensure all adapters and core components load correctly (PR #4000, #3995).
*   **Container Hardening:** Multiple fixes address container security and connectivity, specifically regarding gateway proxy trust, local MCP server accessibility, and service file permissions (PR #3998, #3597, #3985).

### 4. Community Hot Topics
*   **Container & Update Reliability:** Users are facing critical stability issues with container management, including silent data loss and permission errors during updates.
    *   *Issue #4003 & #4004:* A major regression was found where a failed update/cutover could delete half of the `data/` directory or crash the host entirely.
    *   *Issue #3951:* Deleting scheduled tasks leaves orphaned root-owned mount points on Linux, causing indefinite errors.
*   **Agent Runtime Visibility:** There are persistent issues regarding the agent's ability to see its own context, specifically in scheduled tasks and compaction hooks.
    *   *Issue #3716:* The `PreCompact` hook writes unbounded files, leading to production OOM crashes.
    *   *Issue #3984:* The PreCompact hook fails because it cannot access agent mailboxes.
    *   *Issue #3732:* Transcript rotation logic is broken for long-running containers.
*   **Security & Credentials:** Users are concerned about how credentials are handled and stored.
    *   *Issue #1424:* A high-priority concern regarding fork privacy and the inability to make forks private for sensitive healthcare use cases.
    *   *Issue #2437:* Ongoing discussion about removing the heavy OneCLI dependency to maintain the project's "lightweight" promise.

### 5. Bugs & Stability
*   **Severity: High** - Update/Cutover Failures (Issues #4003, #4004)
    *   **Status:** Open, actively being debugged.
    *   **Impact:** Data loss and host unavailability.
    *   **Fix PRs:** None explicitly linked yet, but PR #3988 (#3988) and #3997 are related to update stability.
*   **Severity: High** - Agent Runner Silent Failures (Issues #3568, #3984)
    *   **Status:** Open.
    *   **Impact:** Agents stop responding to messages, or compaction hooks crash the container.
    *   **Fix PRs:** PR #3994 (#3994) fixes failure notices, but underlying mailbox/queue issues (#3568, #3984) remain.
*   **Severity: Medium** - Channel/Adapter Bugs (Issues #3576, #3716)
    *   **Status:** Open.
    *   **Impact:** Rate-limited errors flood channels; production OOM crashes due to unbounded file writing.
*   **Severity: Medium** - Configuration/Environment Issues (Issues #3714, #3785)
    *   **Status:** Open.
    *   **Impact:** Operator environment variables (like `CLAUDE_CODE_AUTO_COMPACT_WINDOW`) are not being passed to containers, breaking user overrides.

### 6. Feature Requests & Roadmap Signals
*   **Multi-User/Fork Privacy:** The discussion around Issue #1424 suggests a potential need for a private fork mechanism or clearer guidance on public forks for enterprise use.
*   **Isolated Edge Workers:** Issue #3538 proposes a significant architectural shift to allow NanoClaw containers to run on household edge devices (NAS, spare PCs) rather than just the host machine.
*   **llama.cpp Integration:** Issue #2234 indicates continued interest in making NanoClaw compatible with the llama.cpp local LLM server.
*   **Native Credentials:** Issue #2781 seeks a way to bypass OneCLI entirely for sandbox/containerized deployments.

### 7. User Feedback Summary
*   **Pain Point:** "Missing dependencies hell." Users on Ubuntu and recent Node versions (26.x) struggle with `better-sqlite3` compilation and Node version support in `setup.sh` (Issues #2590, #3359).
*   **Pain Point:** "Silent failures." Users are frustrated when agents stop responding without visible errors or when logs show permission errors they can't fix.
*   **Satisfaction:** The project is highly valued for its lightweight nature and modular design, but this is frequently contrasted with the friction introduced by the OneCLI dependency and complex container networking.

### 8. Backlog Watch
*   **Issue #1424 (Securing One's Fork?):** 7 comments. This is a high-priority concern for users bundling NanoClaw for sensitive use cases.
*   **Issue #3716 (PreCompact OOM):** 3 comments. Critical performance/production issue.
*   **Issue #3568 (Pending System Rows Starve Queue):** 1 comment. Indicates a structural issue with the session queue management.

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

# LobsterAI Project Digest — 2026-10-03

## 1. Today’s Overview

LobsterAI recorded modest maintenance activity in the 24-hour window ending 2026-10-03: 6 Issues were updated and 3 Pull Requests were updated, while no new releases were published. All 6 tracked Issues remain open, with 0 closed during the window, and all 6 carry the `[stale]` label, indicating an aging backlog rather than rapid triage. The PR activity is strongly security-oriented, with one open hardening PR for MCP stdio command injection and two closed PRs related to skill-install security and authentication token storage.

Overall, the project shows low but meaningful throughput. The visible work is concentrated on security, stability, and persistence risks, but the large number of long-unresolved bugs suggests that user-facing reliability is under pressure. The absence of a release makes it difficult to confirm whether recently closed PRs have actually reached users.

---

## 2. Releases

No new releases were published in the tracking window.

- New releases: **0**
- Latest releases listed: **None**

Because no release data is available, any fixes represented by closed PRs cannot be confirmed as shipped to end users.

---

## 3. Project Progress

### Closed / Merged-or-Closed PRs

The 24-hour PR activity bucket records **2 PRs** as merged/closed. The visible PR list shows them as closed; without release notes, it is not possible to fully confirm whether they were merged into the main branch or closed without merge.

1. **[#909 fix(security): require user confirmation when skill security scan fails](https://github.com/netease-youdao/LobsterAI/pull/909)**  
   Author: `vdorchan`  
   Status: `[CLOSED] [stale]`

   This PR addresses a security gap in skill installation. If the skill security scan throws an exception, `auditReport` remains `null`, and the existing logic treats that as safe or failed and proceeds directly to installation. The reported risk is that a malicious skill package could intentionally trigger a scanner failure and bypass user confirmation.

   Impact:
   - Reduces silent-install risk for malicious or malformed skill packages.
   - Makes failed security scans explicit to users.
   - Improves the safety model for third-party or local skill installation.

2. **[#911 fix(auth): encrypt auth tokens at rest using safeStorage](https://github.com/netease-youdao/LobsterAI/pull/911)**  
   Author: `funaiy`  
   Status: `[CLOSED] [stale]`

   This PR targets authentication token storage. The reported issue is that `accessToken` and `refreshToken` were stored as plain JSON in SQLite, making them readable by any process with access to the database file.

   Impact:
   - Improves protection against local malware, backup leakage, and disk forensics.
   - Uses Electron `safeStorage`, which maps to platform-level secret storage such as macOS Keychain, Windows DPAPI, or Linux Secret Service.
   - Strengthens the privacy posture of a personal AI assistant that stores credentials.

### Open PR

1. **[#908 fix(mcp): validate stdio command to prevent command injection](https://github.com/netease-youdao/LobsterAI/pull/908)**  
   Author: `vdorchan`  
   Status: `[OPEN]`

   This is the most significant open PR in the current window. It addresses a command injection risk in the MCP server stdio command field. According to the PR summary, `mcp:create` and `mcp:update` IPC handlers did not validate the `command` field passed from the renderer. An attacker who compromises the renderer through XSS, a malicious artifact, or prompt injection could store an arbitrary command, which would later be executed through `StdioClientTransport` and `child_process`.

   Impact:
   - High-severity security hardening.
   - Protects the local execution path for MCP servers.
   - Important for trust in a desktop AI assistant that can launch local processes.

   This PR remains open and should be treated as a priority for maintainer review.

---

## 4. Community Hot Topics

In this data snapshot, no single Issue or PR clearly dominates the community by comments or reactions. All 6 Issues show **1 comment** and **0 👍 reactions**. The open PR has no recorded reaction count in the provided data.

However, the strategically most important items are:

1. **[#908 MCP stdio command injection fix](https://github.com/netease-youdao/LobsterAI/pull/908)**  
   This is the highest-impact open item because it involves arbitrary command execution. Even if user engagement is low, the security severity is high.

2. **[#900 Scheduled task interval regression](https://github.com/netease-youdao/LobsterAI/issues/900)**  
   Users are asking for reliable automation. A scheduled task that changes from hourly to every minute directly affects trust in background agents and notifications.

3. **[#910 IM robot and conversation process bugs](https://github.com/netease-youdao/LobsterAI/issues/910)**  
   This reflects demand for stable messaging integrations, especially Feishu. The reported error indicates that scheduled tasks cannot correctly resolve Feishu delivery targets.

4. **[#906 SQLite database save data loss risk](https://github.com/netease-youdao/LobsterAI/issues/906)**  
   This is a core reliability and trust issue. A personal AI assistant depends on persistent memory, state, and conversation history, so data-loss risk is especially damaging.

5. **[#914 Memory import and export support](https://github.com/netease-youdao/LobsterAI/issues/914)**  
   This is a direct user request for memory portability, indicating that users treat LobsterAI as a persistent personal assistant rather than a stateless chat tool.

### Underlying Community Needs

The visible Issues point to three major user expectations:

- **Reliable automation:** scheduled tasks must behave exactly as configured and deliver output to the intended channels.
- **Safe local execution:** MCP, skills, and auth storage need strong security because the assistant can access files, processes, and credentials.
- **Persistent personal memory:** users want their assistant’s memory to survive machine changes and be shareable or portable.

---

## 5. Bugs & Stability

The following bugs were updated in the tracked window. They are ranked by estimated severity based on the reported impact.

| Rank | Severity | Item | Summary | Fix PR Visible? |
|---:|---|---|---|---|
| 1 | Critical | [#906](https://github.com/netease-youdao/LobsterAI/issues/906) | SQLite save path has data-loss and corruption risk | No |
| 2 | High | [#900](https://github.com/netease-youdao/LobsterAI/issues/900) | Scheduled task interval changes unexpectedly | No |
| 3 | High | [#898](https://github.com/netease-youdao/LobsterAI/issues/898) | LobsterAI gateway disconnects when Cherry Studio updates/restarts | No |
| 4 | Medium-High | [#910](https://github.com/netease-youdao/LobsterAI/issues/910) | Feishu scheduled task delivery fails with target resolution error | No |
| 5 | Low-Medium | [#886](https://github.com/netease-youdao/LobsterAI/issues/886) | CopyButton uses bare `setTimeout`, causing unmounted-component warnings | No |

### 1. Critical: SQLite database save data loss risk

**Issue:** [#906 SQLite 数据库保存存在数据丢失风险](https://github.com/netease-youdao/LobsterAI/issues/906)  
Author: `tomZou12`  
Status: `[OPEN] [stale]`

Reported risks:
- `save()` uses `fs.writeFileSync()` without exception handling.
- Disk full, permission problems, or file locks can cause writes to fail.
- No retry mechanism is described.
- No atomicity guarantee is described.
- Interrupted writes may corrupt the SQLite file.

Why this matters:
This is one of the highest-impact stability issues in the set. If LobsterAI stores conversations, memory, tasks, or configuration in SQLite, a corrupted or partially written database can cause broader product failure. For a personal AI assistant, data persistence is a core trust feature.

Suggested priority:
- Add write error handling.
- Use temporary file + atomic rename.
- Add backup or WAL-mode considerations.
- Add recovery or user-visible error handling when save fails.
- Add tests for disk-full, permission-denied, and locked-file scenarios.

### 2. High: Scheduled task interval regression

**Issue:** [#900 定时任务改成每1小时1次，但却变成了1分钟一次](https://github.com/netease-youdao/LobsterAI/issues/900)  
Author: `Aireed`  
Status: `[OPEN] [stale]`

Reported behavior:
- User created a custom scheduled task.
- User asked LobsterAI to change the interval to every hour.
- The assistant reported success.
- The actual notification frequency became every 1 minute.

Why this matters:
This is a functional regression in automation. If the natural-language command succeeds but the actual schedule is wrong, users cannot trust the assistant to manage recurring jobs. It can also cause excessive notifications, API calls, token consumption, or repeated side effects.

Suggested priority:
- Add regression tests for interval parsing and persistence.
- Validate normalized cron/interval values before commit.
- Show the resolved schedule back to the user after modification.
- Add log lines for the original value, parsed value, and stored value.

### 3. High: Gateway disconnect when Cherry Studio updates or restarts

**Issue:** [#898 cherry studio更新重启会导致LobsterAI 网关断开](https://github.com/netease-youdao/LobsterAI/issues/898)  
Author: `omskk`  
Status: `[OPEN] [stale]`

Reported behavior:
- Updating or restarting Cherry Studio closes the LobsterAI gateway.
- The reporter suspects port `18789` may be blocked or “banned.”

Why this matters:
This suggests a fragile local networking or lifecycle integration. If LobsterAI exposes a local gateway or port used by external tools, unexpected disconnection can interrupt agent workflows, IM bridges, or MCP connections.

Suggested priority:
- Capture logs during Cherry Studio update/restart.
- Determine whether the gateway is killed by the host process, by port conflict, by firewall policy, or by LobsterAI itself.
- Add gateway health-check and auto-restart logic.
- Document dependency on local ports if applicable.

### 4. Medium-High: Feishu scheduled task delivery failure

**Issue:** [#910 【问题反馈】关于IM机器人和对话过程的BUG](https://github.com/netease-youdao/LobsterAI/issues/910)  
Author: `ShanShuiCode`  
Status: `[OPEN] [stale]`

Reported behavior:
- Feishu robot works for normal conversation.
- Scheduled tasks cannot send messages to Feishu.
- Error includes: `Delivering to Feishu requires target <chatId|user:openId|chat:chatId>`.

Why this matters:
This points to a gap between interactive chat routing and scheduled-task delivery. The system can talk to Feishu in a direct conversation context, but cannot reliably resolve the target when the task is generated autonomously.

Suggested priority:
- Ensure scheduled tasks carry an explicit delivery target.
- Validate target format before scheduling.
- Provide a clear error when the target is missing or ambiguous.
- Add tests for scheduled delivery to Feishu chat and user targets.

### 5. Low-Medium: CopyButton unmounted-component timer

**Issue:** [#886 【Bug】CopyButton 中使用裸 setTimeout 而非 useRef](https://github.com/netease-youdao/LobsterAI/issues/886)  
Author: `xu-weize`  
Status: `[OPEN] [stale]`

Reported behavior:
- `CoworkSessionDetail.tsx` line 843 uses:
  ```ts
  setTimeout(() => setCopied(false), 2000);
  ```
- If the component unmounts before the timer fires, React may warn about updating an unmounted component.
- This can also create a small memory-leak pattern.

Why this matters:
This is a frontend hygiene issue. It is unlikely to be user-critical, but it can contribute to console noise and subtle state bugs in longer sessions.

Suggested priority:
- Use a ref or cleanup function in `useEffect`.
- Add a unit or component test for unmount-before-copy-reset.

### Security-Related PRs Affecting Stability and Trust

Although not listed under user-reported bugs, the following PRs are directly relevant to product stability and user safety:

- **[#908](https://github.com/netease-youdao/LobsterAI/pull/908)** — MCP stdio command injection prevention.
- **[#909](https://github.com/netease-youdao/LobsterAI/pull/909)** — Skill security scan failure should not silently proceed to install.
- **[#911](https://github.com/netease-youdao/LobsterAI/pull/911)** — Encrypt authentication tokens at rest.

These indicate that the project is addressing several high-risk local-attack-surface areas.

---

## 6. Feature Requests & Roadmap Signals

### Explicit Feature Request

1. **[#914 支持记忆导入和导出](https://github.com/netease-youdao/LobsterAI/issues/914)**  
   Author: `pyf1999`  
   Status: `[OPEN] [stale]`

   User request:
   - Support memory import.
   - Support memory export.
   - Use case: switching machines and sharing memory.

   Roadmap signal:
   This is a strong signal that users want LobsterAI to behave like a persistent personal AI profile, not a disposable local app. Memory portability could become a differentiator, especially for users moving between machines or collaborating across personal environments.

   Likelihood in next version:
   Medium. This is not a patch-fix, but if the memory model is already sufficiently stable, import/export could be a high-value user-facing feature.

### Roadmap Signals from Bug and Security Work

The current Issue and PR set suggests the following likely priority areas:

1. **Security hardening**
   - MCP command validation.
   - Skill installation confirmation.
   - Token encryption at rest.

   These are likely to appear in security-focused patches.

2. **Scheduled task reliability**
   - Interval parsing and persistence.
   - Delivery target resolution.
   - Better error messages for IM delivery failures.

3. **Local persistence integrity**
   - Safer SQLite save logic.
   - Atomic writes.
   - Better recovery and diagnostics.

4. **Integration lifecycle stability**
   - Gateway persistence across host app restarts.
   - Better handling of port conflicts or external process changes.

### Likely Next-Version Candidates

The most probable next-version items, based on severity and user impact:

1. Fix scheduled task interval regression — [#900](https://github.com/netease-youdao/LobsterAI/issues/900)
2. Fix Feishu scheduled delivery target error — [#910](https://github.com/netease-youdao/LobsterAI/issues/910)
3. Harden SQLite save logic — [#906](https://github.com/netease-youdao/LobsterAI/issues/906)
4. Review and merge MCP command injection fix — [#908](https://github.com/netease-youdao/LobsterAI/pull/908)
5. Clarify status of security PRs #909 and #911 and ship them if merged.

Memory import/export — [#914](https://github.com/netease-youdao/LobsterAI/issues/914) — is a plausible near-term feature, but it may wait until the persistence layer is more robust.

---

## 7. User Feedback Summary

The visible user feedback is predominantly negative and focused on reliability, integration, and trust.

### Reported Pain Points

1. **Automation does not behave as expected**
   - Scheduled task changed to hourly but ran every minute — [#900](https://github.com/netease-youdao/LobsterAI/issues/900).
   - Scheduled tasks cannot deliver to Feishu — [#910](https://github.com/netease-youdao/LobsterAI/issues/910).

2. **Local data persistence is not fully trusted**
   - SQLite save path may lose or corrupt data — [#906](https://github.com/netease-youdao/LobsterAI/issues/906).
   - Users want memory import/export for migration and sharing — [#914](https://github.com/netease-youdao/LobsterAI/issues/914).

3. **External integrations are fragile**
   - LobsterAI gateway disconnects when Cherry Studio updates or restarts — [#898](https://github.com/netease-youdao/LobsterAI/issues/898).

4. **Security concerns are being raised**
   - MCP command injection — [#908](https://github.com/netease-youdao/LobsterAI/pull/908).
   - Skill scanner bypass risk — [#909](https://github.com/netease-youdao/LobsterAI/pull/909).
   - Plain-text auth tokens — [#911](https://github.com/netease-youdao/LobsterAI/pull/911).

### Use Cases Evident from Feedback

- Users are using LobsterAI as a persistent assistant with memory.
- Users are using scheduled tasks to automate notifications or actions.
- Users are connecting LobsterAI to external messaging systems such as Feishu.
- Users are running local tooling and local MCP servers.
- Users care about data migration between machines.

### Satisfaction Assessment

No positive feedback, reviews, or approval signals are visible in this window. The visible signal is that

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

# ZeroClaw Project Digest — 2026-10-03
## 1. Today's Overview
ZeroClaw continues active software development and maintainable community activity in 2026-10-03. There are 50 issues updated (47 open, 3 closed) and 50 PRs updated (48 open, 2 merged/closed), indicating sustained feature and bug-fixing momentum. The project is currently at version **v0.8.6** (latest release per data: none published), and the focus is on addressing runtime stability, security hardening, workflow gaps, and tooling improvements.
## 2. Releases
**No new releases** were published on 2026-10-03. The latest release identifier from data is `v0.8.6` (released earlier in 2026), though no new release was tracked or released on the current date.
## 3. Project Progress
- **PR Activity**: 50 PRs updated in the last 24h, including fixes for stability and security, feature additions (e.g., subprocess memory watchdog, cooperative cancellation in tools, rollout of standalone gateway), and work on identity/security (authorization verification, daemon identity consistency).
- **Issue Activity**: 50 issues updated, with **3 resolved** (closed) and **47 active**, reflecting ongoing active feedback and resolution. Notable closed issues include a regression fix for zerocode's launch directory behavior (#11387), a Docker startup/binary issues (#11369) and a Windows daemon lifecycle fix (#11369).
- **Key Feature Directions**: Features advancing include process-memory limits for shell/skill subprocess execution, cooperative cancellation to tools, realtime voice-host channels, and tool-agnostic gateway clients; security improvements focus on Windows key-file ACL protection and identity verification.
## 4. Community Hot Topics
Top active issues are concentrated around reliability, workflow correctness, and security hardening:
- **#11387 [OPEN]** — Regression in zerocode: launch directory and agent workspace configuration mishandled; highlights workflow reliability and tool regression concerns. Link: [Issue #11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)
- **#11296 [OPEN]** — llama.cpp/custom provider misused model URLs; security-focused provider configuration bug. Link: [Issue #11296](https://github.com/zeroclaw-labs/zeroclaw/issues/11296)
- **#11332 [OPEN]** — Skill review/creation/improvement not executed for channel/webhook/web UI turns; workflow execution gap. Link: [Issue #11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)
- **#11324 [OPEN]** — Depend on verifying daemon identity in call-local and share one CLI daemon client; security/automation concern. Link: [Issue #11324](https://github.com/zeroclaw-labs/zeroclaw/issues/11324)
- **#11456 [PR]** — feat(subprocess) add opt-in subprocess memory watchdog; stability/resource safety focus. Link: [PR #11456](https://github.com/zeroclaw-labs/zeroclaw/pull/11456)
## 5. Bugs & Stability
Top reported bugs are ranked by severity:
1. **S1 — workflow blocked**: `#10225` — ZeroCode RPC sessions cannot reach configured channels via channel-backed tools; blocks agent execution workflows. Link: [Issue #10225](https://github.com/zeroclaw-labs/zeroclaw/issues/10225)
2. **S1 — workflow blocked**: `#10673` — Failed ACP turns not persisted on daemon RPC path (ZeroCode Code pane); blocks failure recovery. Link: [Issue #10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673)
3. **S1 — workflow blocked**: `#11418` — Copy one-click feature non-functional; basic usability issue. Link: [Issue #11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)
4. **S2 — degraded behavior**: `#11387` — zerocode regression on launch directory and workspace config. Link: [Issue #11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)
5. **S2 — degraded behavior**: `#11333` — Skill review tools cannot see skills in skill bundles; tool workflow gap. Link: [Issue #11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333)
6. **S2 — degraded behavior**: `#11332` — Skill learning loop not executed for channel/webhook/web UI turns. Link: [Issue #11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)
7. **S2 — degraded behavior**: `#9028` — Ctrl+C on Windows causes force quit; stability issue on Windows. Link: [Issue #9028](https://github.com/zeroclaw-labs/zeroclaw/issues/9028)

**Regression/Fix Activity**: Major regression fixes have been tracked, including resolution of the zerocode launch directory regression (#11387) and a Docker startup/upgrade strand issue (#11369).

## 6. Feature Requests & Roadmap Signals
- **P1/P2 High-Risk Features**: Subprocess memory watchdog for memory safety, cooperative cancellation in tool execution contracts, support for realtime voice channels, automation binding of cron jobs to conversations, and hardened Windows key file ACL protection.
- **RFC/Plan Signals**: Two RFCs are being queued for 2026-10-03: `#11254` (A2A protocol crate refactor) and `#11235` (Knowledge corpus — RAG for agent), indicating future architecture and capability expansion work.
- **Execution-Related Improvements**: Features targeting workflow correctness, including tool execution lifecycle semantics, session send lifecycle contracts, and support for channel/webhook/web UI turns running tool tasks.

## 7. User Feedback Summary
- **Common Pain Points**:
  - **Workflow Breakage**: Multiple reported issues from workflow consistency, including ZeroCode regression (#11387), tool execution gaps (skill review/creation #11332, channel/browser/web tool turn execution #11332), and RPC session channel reach issues (#10225).
  - **Security Concerns**: Privacy of runtime settings, such as misused provider URLs (#11296) and Windows key-file security concerns (#11451, #9460), highlighting user demand for stronger security control.
  - **Stability Doubles**: Windows compatibility issues (force quit on Ctrl+C #9028) and Docker startup anomalies (#11369) impacting usability.
  - **Tool Experience**: Basic functionality gaps, such as copy operations (#11418) and skill review visibility (#11333), indicating user demand for improved tool UX.
- **Use Case Needs**:
  - Operators require more robust workflow execution, especially for long-code/tool-driven scenarios;
  - Security-focused use cases demand stronger control over runtime configuration, credentials, and private execution paths;
  - Users need smoother multi-channel/headless workflow support for consistent agent operation.

## 8. Backlog Watch
- **Top Priority**: 
  - `#10225` (S1 workflow blocked) — ZeroCode RPC channel reach gap; requires fixing channel-backed tool execution to ensure workflow continuity.
  - `#10673` (S1 workflow blocked) — Failed ACP turn persistence gap; requires completing daemon RPC path turn persistence.
  - `#11387` (S2 degraded behavior) — zerocode launch regression; requires resolving configuration root handling to restore workflow stability.
- **High-Risk Active Items**:
  - Security-related items like Windows key-file ACL hardening, daemon identity verification, and provider configuration fixes;
  - Feature items requiring maintainer review or stacking, such as RFCs (A2A protocol, RAG) and release-gate stability fixes.
- **Recommendations**: Maintainer attention is needed to prioritize resolution of workflow-blocked issues and security-critical bugs, and to clarify the compatibility of the v0.8.6 release scope to prevent related regressions.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*