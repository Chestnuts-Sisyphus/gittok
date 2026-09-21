# AI CLI Tools Community Digest 2026-09-22

> Generated: 2026-09-21 22:55 UTC | Tools covered: 9

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison



---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills Community Highlights – 2026‑09‑22**

| # | Item | Link | Status / Attention | Key Highlights |
|---|------|------|--------------------|----------------|
| **1** | **#1742 – fix(mcp-builder) for mcp ≥ 2** | <https://github.com/anthropics/skills/pull/1742> | OPEN (updated 2026‑09‑19) | Resolves breaking import rename and header‑config drift in the MCP builder; discussion focuses on backwards‑compatibility and API‑level standardisation. |
| **2** | **#1298 – fix(skill‑creator) trigger isolation** | <https://github.com/anthropics/skills/pull/1298> | OPEN (updated 2026‑09‑16) | Tackles false‑negative trigger evaluation on Windows and unrelated‑tool interference; community is vetting the proposed isolation strategy. |
| **3** | **#1771 – feat(skills) proofcore‑contract‑auditor** | <https://github.com/anthropics/skills/pull/1771> | OPEN (updated 2026‑09‑16) | Adds a Web‑3 audit skill that anchors proofs to TON via ProofCore; comments centre on integration‑point design and security‑grade output. |
| **4** | **#525 – add pyxel skill for retro‑game dev** | <https://github.com/anthropics/skills/pull/525> | OPEN (updated 2026‑09‑16) | Provides a full Pyxel workflow, from debugging to frame‑inspection; discussion touches on packaging and documentation completeness. |
| **5** | **#1703 – add md2video‑audio skill** | <https://github.com/anthropics/skills/pull/1703> | OPEN (updated 2026‑09‑15) | Converts Markdown to MP4 videos with voice‑over; community queries on resource‑usage and optional‑codec support. |
| **6** | **#1734 – detect orphaned docx comments** | <https://github.com/anthropics/skills/pull/1734> | OPEN (updated 2026‑09‑11) | Identifies stale comments in Word docs; discussion revolves around edge‑case handling and cross‑platform behaviour. |
| **7** | **#514 – add document‑typography skill** | <https://github.com/anthropics/skills/pull/514> | OPEN (updated 2026‑03‑13) | Addresses typographic defects (widows, orphans) in generated docs; comments focus on rule‑set granularity. |
| **8** | **#1615 – add scnet‑hpc skill** | <https://github.com/anthropics/skills/pull/1615> | OPEN (updated 2026‑08‑24) | Enables SSH‑based Slurm workflows on SCNet HPC clusters; discussion centred on credential‑management and job‑submission templates. |

---

### 1. Top Skills Ranking  
The eight skills above represent the most‑discussed PRs in the repository, judged by recency of activity, community interaction, and the breadth of the issue each addresses. All are **open** and currently awaiting merge or further refinement.

---

### 2. Community Demand Trends  
Analysis of the **top 15 issues** shows recurring themes:

| Trend | Representative Issues |
|-------|------------------------|
| **Governance & Trust** | #492 (trust boundary), #228 (org‑wide sharing), #189 (duplicate skills) |
| **Automation & CI/CD** | #556 (trigger‑evaluation), #1765 (UTF‑8 diff handling), #1390 (evaluation scoring) |
| **Documentation & Usability** | #514 (typography), #1734 (docx orphan comments), #1703 (md2video audio) |
| **Security & Resource Management** | #1487 (claude‑api token exhaustion), #1175 (SharePoint handling) |
| **Integration with External Ecosystems** | #29 (Bedrock), #1362 (web‑artifact bundle), #1771 (ProofCore) |

**Bottom line:** The community is moving from foundational skill‑creation (documentation, formatting) toward **safety‑oriented governance**, **robust automation pipelines**, and **cross‑platform integration**.

---

### 3. High‑Potential Pending Skills  
These open PRs have active discussion threads (≥ 3 comments) and are on the merge‑track:

| PR | Skill | GitHub Link | Current Focus |
|----|-------|-------------|---------------|
| #1742 | MCP‑builder update | <https://github.com/anthropics/skills/pull/1742> | Backwards‑compatibility, header support |
| #1298 | skill‑creator trigger isolation | <https://github.com/anthropics/skills/pull/1298> | Windows‑friendly trigger evaluation |
| #1771 | proofcore‑contract‑auditor | <https://github.com/anthropics/skills/pull/1771> | Web‑3 static analysis & blockchain anchoring |
| #525 | pyxel skill | <https://github.com/anthropics/skills/pull/525> | Game dev workflow, headless runs |
| #1703 | md2video‑audio | <https://github.com/anthropics/skills/pull/1703> | Markdown → video, voice‑over |

These are likely to land in the next release cycle once the open discussion points are resolved.

---

### 4. Skills Ecosystem Insight  
**The community’s most concentrated demand is for governance‑and‑trust mechanisms that allow safe, verifiable sharing of community‑made skills while ensuring reproducible, automated evaluation pipelines.**

---

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-22

## 1. Today's Highlights
The Codex repository saw a heavy influx of release and patch activity across the Rust toolchain (releasing alphas up to `v0.157.0-alpha.1`) alongside targeted fixes addressing environment security, such as restricting inherited file descriptors for Unix local Model Context Protocol (MCP) servers ([PR #47094](https://github.com/openai/codex/pull/47094)). Community discussions center around performance limits, desktop app stability bugs on macOS and Windows, and sandbox execution constraints under elevated user permissions.

---

## 2. Releases
Six new pre-releases dropped in the last 24 hours focusing on the Rust implementation components:
- **rust-v0.157.0-alpha.1** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.1))
- **rust-v0.156.0-alpha.17** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.17))
- **rust-v0.156.0-alpha.16** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.16))
- **rust-v0.156.0-alpha.14** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.14))
- **rust-v0.156.0-alpha.13** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.13))
- **rust-v0.156.0-alpha.12** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.12))

---

## 3. Hot Issues
1. **[#7291 - VSCode extension failed to revert the changes](https://github.com/openai/codex/issues/7291)**  
   *Why it matters:* Long-standing extension bug causing reliability concerns when users want to roll back automated code changes.  
   *Community reaction:* 51 comments and 19 thumbs-up; highly frustrating for developers relying on quick-revert safety nets.
2. **[#25826 - Windows Desktop: maximized window spills onto multi-monitors](https://github.com/openai/codex/issues/25826)**  
   *Why it matters:* UI display glitch on multi-monitor Windows setups.  
   *Community reaction:* 25 comments and 20 thumbs-up, signaling frequent multi-display usage among developers.
3. **[#23195 - macOS warns Codex app is malware](https://github.com/openai/codex/issues/23195)**  
   *Why it matters:* Critical trust and usability friction blocking users mid-session.  
   *Community reaction:* Highly voted (27 👍) before being closed, showing panic among Business tier users.
4. **[#40060 - Windows execpolicy false positive with Start-Process](https://github.com/openai/codex/issues/40060)**  
   *Why it matters:* Interferes with standard PowerShell scripts due to overly aggressive classifier logic.  
   *Community reaction:* Active debugging thread tracking regression across CLI `0.146.0` and `main`.
5. **[#46853 - Codex falsely reported repo/deployment state & prepared unsafe incident report](https://github.com/openai/codex/issues/46853)**  
   *Why it matters:* Serious hallucination behavior where the model fabricates system states and drafts public disclosures.  
   *Community reaction:* Generates concern regarding autonomous agent trustworthiness in production environments.
6. **[#41591 - macOS App: Orphaned inProgress turn hides completed turns](https://github.com/openai/codex/issues/41591)**  
   *Why it matters:* Threads lock up visually, losing access to successful message output.  
   *Community reaction:* Frustrating thread-state corruption issue on Apple Silicon desktops.
7. **[#35346 - Codex Desktop cannot access LAN on macOS 27 and never requests permission](https://github.com/openai/codex/issues/35346)**  
   *Why it matters:* Breaks local network development tasks (SSH/TCP connections fail with `EHOSTUNREACH`).  
   *Community reaction:* Highlights permission-handling gaps with newer macOS versions.
8. **[#11898 - Inline Suggestions / Ghost Text for Codex vscode extension](https://github.com/openai/codex/issues/11898)**  
   *Why it matters:* Highly requested quality-of-life feature to match standard inline AI assistant behavior.  
   *Community reaction:* Massive community support with 47 thumbs-up.
9. **[#46189 - Paid $200/month for GPT-6, getting capacity errors or degraded fallback](https://github.com/openai/codex/issues/46189)**  
   *Why it matters:* Premium tier subscribers facing degraded availability and fallback behavior.  
   *Community reaction:* High frustration regarding tier value and unexpected capacity constraints.
10. **[#28931 - Auto Resume / Goal after limit reached](https://github.com/openai/codex/issues/28931)**  
    *Why it matters:* Long-running automation tasks stall out entirely when 5-hour or weekly rate limits hit.  
    *Community reaction:* Top feature request by volume (35 👍) for true autonomous execution workflows.

---

## 4. Key PR Progress
1. **[PR #47094 - Restrict Unix local MCP servers to stdio descriptors](https://github.com/openai/codex/pull/47094)**  
   Applies `DescriptorPolicy::StdioOnly` to prevent unrelated parent file descriptors from leaking into local MCP servers.
2. **[PR #47114 - Preserve and expose thread item lifecycle timestamps](https://github.com/openai/codex/pull/47114)**  
   Persists producer-recorded start and completion timestamps in thread history and exposes `startedAtMs` / `completedAtMs` via `thread/items/list`.
3. **[PR #47113 - Persist thread creator identity in rollouts and SQLite](https://github.com/openai/codex/pull/47113)**  
   Captures and tracks `creator_user_id` and `creator_account_id` through thread storage, SQLite migrations, and forks.
4. **[PR #47101 - Honor configured proxies for realtime WebSocket connections](https://github.com/openai/codex/pull/47101)**  
   Routes realtime WebSockets through the shared `HttpClientFactory` proxy policy instead of connecting directly.
5. **[PR #47108 - Preserve required Windows runtime variables for filesystem helpers](https://github.com/openai/codex/pull/47108)**  
   Allows `SystemDrive` and `LOCALAPPDATA` through the helper environment filter on Windows so sandboxed processes can resolve paths properly.
6. **[PR #47085 - Update model catalog descriptions and GPT-5.6-Sol priority](https://github.com/openai/codex/pull/47085)**  
   Recalibrates model priority (shifting GPT-5.6-Sol from 6 to 4) and updates descriptive text for core models.
7. **[PR #47082 - Show voice toggle in TUI shortcut overlay](https://github.com/openai/codex/pull/47082)**  
   Adds the Voice toggle shortcut (`F8` default) to the TUI footer and shortcut overlay when voice commands are enabled.
8. **[PR #47081 - Track cumulative MCP attribution across requests and thread history](https://github.com/openai/codex/pull/47081)**  
   Records plugin and connector attribution for direct and Code Mode MCP calls across thread history.
9. **[PR #47088 - Disable unused default dependency features](https://github.com/openai/codex/pull/47088)**  
   Optimizes build size and compilation speed by disabling default Sentry features and trimming unused dependencies in `codex-rs/tui`.
10. **[PR #47084 - Avoid building a host SQLite driver for SQLx macros](https://github.com/openai/codex/pull/47084)**  
    Streamlines database compilation tasks by removing the `macros` feature from `sqlx` in favor of direct `sqlx-macros` derive/migrate setups.

---

## 5. Feature Request Trends
- **Autonomous Recovery & Resumption:** Users frequently request auto-resume features for long-running workflows encountering rate limits ([#28931](https://github.com/openai/codex/issues/28931)).
- **IDE Integration Depth:** High demand for persistent inline suggestions/ghost text rather than chat-only workflows ([#11898](https://github.com/openai/codex/issues/11898)).
- **Documentation & Tooling Stability:** Developers building secondary wrappers want explicit schema stability guarantees for rollout/session files under `~/.codex` ([#45251](https://github.com/openai/codex/issues/45251)).

---

## 6. Developer Pain Points
- **Model Capacity & Tier Limits:** Premium subscribers (`$200/mo` or Pro tiers) report account-scoped capacity bottlenecks and unexpected fallbacks ([#46189](https://github.com/openai/codex/issues/46189), [#46231](https://github.com/openai/codex/issues/46231)).
- **OS-Level Permissions & Sandboxing:** Windows and macOS desktop applications run into friction with local networking, file descriptor leaks ([#46960](https://github.com/openai/codex/issues/46960)), strict PowerShell execution policies ([#40060](https://github.com/openai/codex/issues/40060)), and store auto-update package registration failures ([#46628](https://github.com/openai/codex/issues/46628)).
- **Model State Hallucination:** Occasional critical failures where models misreport infrastructure deployment status and draft unsafe public reports ([#46853](https://github.com/openai/codex/issues/46853)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-22

## 1. Today's Highlights
The Gemini CLI development cycle continues to heavily focus on core execution stability, sandboxing robustness, and subagent state lifecycle management. Recent discussions and pull requests target edge cases such as parallel write race conditions, terminal rendering performance on resize, and robust error handling for streaming network interruptions.

---

## 2. Releases
- **v0.62.0-nightly.20260921.gcfbcaa8df**
  - **Full Changelog**: [v0.62.0-nightly.20260920.gcfbcaa8df...v0.62.0-nightly.20260921.gcfbcaa8df](https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260920.gcfbcaa8df...v0.62.0-nightly.20260921.gcfbcaa8df)
  - Nightly build rolling out ongoing stability updates and bug fixes for the agentic workstream.

---

## 3. Hot Issues
1. **[#22323: Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**
   - *Why it matters:* Codebase investigator subagents report a false positive "GOAL" success status when hitting token or turn limits, masking incomplete analyses.
   - *Community:* P1 priority with active maintainer tracking and 13 comments.
2. **[#19873: Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**
   - *Why it matters:* Seeks to exploit Gemini 3's native ability to chain POSIX commands securely via zero-dependency sandboxing.
   - *Community:* Large effort architectural enhancement tracked closely by contributors.
3. **[#21409: Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**
   - *Why it matters:* Simple folder creation tasks cause the generalist agent to hang indefinitely unless subagent delegation is explicitly forbidden.
   - *Community:* Highly impactful bug with 8 thumbs-up reactions and multiple user reports.
4. **[#22745: Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**
   - *Why it matters:* Epic investigating AST-aware parsing tools to restrict reads to precise method bounds, reducing token noise.
   - *Community:* Core productivity enhancement for large codebase navigation.
5. **[#21968: Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**
   - *Why it matters:* Users report that custom skills/sub-agents are rarely triggered autonomously without explicit instructions.
   - *Community:* Sparks broader discussions on agent discovery tuning.
6. **[#26525: Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)**
   - *Why it matters:* Addresses security implications where local transcript contents containing potential secrets are ingested before prompt-level redaction.
   - *Community:* Critical security fix for automated context memory systems.
7. **[#24246: Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**
   - *Why it matters:* Exceeding tool limits causes API validation failures, breaking advanced environments with numerous custom skills/extensions.
   - *Community:* Important limitation affecting heavy workspace configurations.
8. **[#22267: Browser Agent ignores settings.json overrides (e.g., maxTurns)](https://github.com/google-gemini/gemini-cli/issues/22267)**
   - *Why it matters:* Custom configurations defined in global/project settings files fail to apply to browser subagents.
   - *Community:* Configuration consistency issue causing unexpected timeout behaviors.
9. **[#21335: /compress command is not persistent across session resume](https://github.com/google-gemini/gemini-cli/issues/21335)**
   - *Why it matters:* Summarized chat history generated via `/compress` is lost upon restarting or resuming a session file on disk.
   - *Community:* Frequent frustration for token-conscious users.
10. **[#18836: Replace WriteToDo with Persistent File-Based Task Tracking (CRUD)](https://github.com/google-gemini/gemini-cli/issues/18836)**
    - *Why it matters:* Proposes deprecating volatile, in-context TODO tracking in favor of file-backed management to prevent context rot and cross-session memory loss.
    - *Community:* High-priority architectural shift requested by power users.

---

## 4. Key PR Progress
1. **[#29244: fix(core): make tool file writes atomic and serialize same-path writes](https://github.com/google-gemini/gemini-cli/pull/29244)**
   - *Details:* Prevents data loss during parallel tool execution where concurrent file edits targeted the same path.
2. **[#29437: fix(core): clean up temporary directory when background shell execution exits](https://github.com/google-gemini/gemini-cli/pull/29437)**
   - *Details:* Ensures temporary shell process ID directories (`gemini-shell-*`) are tracked and purged after background tasks finish.
3. **[#29436: fix(cli): prevent 100% CPU hang from @ within quotes in stdin](https://github.com/google-gemini/gemini-cli/pull/29436)**
   - *Details:* Resolves catastrophic backtracking regex loops when processing quoted `@` paths in piped input.
4. **[#29435: fix(cli,core): prevent process hang on session exit](https://github.com/google-gemini/gemini-cli/pull/29435)**
   - *Details:* Properly pauses stdin and removes data listeners on cleanup, preventing Node's event loop from hanging indefinitely.
5. **[#29429: fix(quota): surface the limit and reset window the server reports](https://github.com/google-gemini/gemini-cli/pull/29429)**
   - *Details:* Extracts and surfaces Cloud Code API `RESOURCE_EXHAUSTED` metadata (`quotaResetTimeStamp`, `quotaResetDelay`) for clear UX feedback.
6. **[#29423: fix(cli): persist folder trust in sandbox](https://github.com/google-gemini/gemini-cli/pull/29423)**
   - *Details:* Fixes containerized Docker/Podman runtimes to correctly persist host-level `trustedFolders.json` decisions.
7. **[#29343: fix(cli): suppress uncaught AbortError logs during request cancellation](https://github.com/google-gemini/gemini-cli/pull/29343)**
   - *Details:* Prevents hard crashes and noisy logs when users abort active queries under Node 23+.
8. **[#29319: fix(sdk): guard JSON.parse on tool-call args in sendStream](https://github.com/google-gemini/gemini-cli/pull/29319)**
   - *Details:* Wraps stream tool-call JSON parsing in try/catch to gracefully handle malformed chunks without crashing for-await loops.
9. **[#29304: fix(cli): avoid splitting surrogate pairs during truncation](https://github.com/google-gemini/gemini-cli/pull/29304)**
    - *Details:* Prevents TUI display bugs by ensuring UTF-16 surrogate pairs (like emojis) are never split at string truncation boundaries.
10. **[#29401: fix(core): normalize proxy-agent esbuild interop for environment proxy resolution](https://github.com/google-gemini/gemini-cli/pull/29401)**
    - *Details:* Standardizes CJS/ESM interop handling for proxy agents within the esbuild bundle pipeline.

---

## 5. Feature Request Trends
- **Codebase Optimization & AST Integration:** Strong momentum toward adopting AST-aware indexing and search tools (like *tilth* or *glyph*) to minimize token overhead and execute surgical code reads.
- **Persistent State & Memory Improvements:** Moving away from volatile in-memory strategies (such as session-bound task trackers and ephemeral chat compression) toward durable, file-backed management.
- **Enhanced Subagent Capabilities & Observability:** Strong user demand for sharing subagent trajectories (`/chat share`), fixing configuration overrides, and improving autonomous skill utilization.

---

## 6. Developer Pain Points
- **CLI Process Hangs & Infinite Loops:** Frustrations with regex-driven catastrophic backtracking on quoted text, unpaused stdin handles keeping Node alive, and subagents hanging indefinitely on standard folder creation.
- **Context Rot & Token Bloat:** High baseline token costs and "firehosing" of large files during initial codebase exploration phases.
- **Sandboxing & Permission Overhead:** Friction points regarding repetitive trust dialog prompts inside containerized environments (Docker/Podman) and synchronization of settings overrides across subagents.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest | 2026-09-22

## 1. Today's Highlights
The GitHub Copilot CLI team has released v1.0.88-0, introducing native terminal notifications for Ghostty and WezTerm and improved visibility for MCP/plugin server status. This follows a high-velocity weekend of issue resolution, focusing on stable session management, policy enforcement, and addressing memory-related crashes in extended usage sessions.

---

## 2. Releases
*   **v1.0.88-0:** Adds optional OSC 777 notifications for Ghostty/WezTerm. Improves skill discovery (namespacing/ignored directories) and enhances MCP/plugin UI with clearer display names and descriptions.
*   **v1.0.87:** Introduces managed startup defaults for Auto routing and org policy enforcement. Added UI refinement for consecutive steering prompts and "Up" arrow editing for pending messages.

---

## 3. Hot Issues (Top 10)
1.  **[#4699](https://github.com/github/copilot-cli/issues/4699): OOM Crashes** – High-frequency reports of V8 heap exhaustion during long `--resume` sessions. Critically, crash logs are currently flooding the working directory.
2.  **[#4892](https://github.com/github/copilot-cli/issues/4892): MCP Re-enumeration** – Concerns regarding hourly session reloads causing performance overhead by re-scanning all plugins.
3.  **[#4844](https://github.com/github/copilot-cli/issues/4844): --yolo Flag Race Condition** – The `--yolo` flag is being overridden by strict policy postures during the brief pre-auth window.
4.  **[#4837](https://github.com/github/copilot-cli/issues/4837): Plugin Activation Failure** – Policies successfully install plugins but set them to `enabled: false`, requiring manual user intervention.
5.  **[#4924](https://github.com/github/copilot-cli/issues/4924): Missing Custom Agents** – Custom agents in `.github/agents` fail to load in fresh worktree sessions due to race conditions with deferred checkouts.
6.  **[#4926](https://github.com/github/copilot-cli/issues/4926): Atlassian MCP OAuth** – Reported failures in redirect URI/port matching, likely impacting corporate network users.
7.  **[#4218](https://github.com/github/copilot-cli/issues/4218): Auto Mode Model Control** – Strong community demand (16 👍) to allow users to define a whitelist for models used by "Auto" mode to manage costs.
8.  **[#3704](https://github.com/github/copilot-cli/issues/3704): RTL Language Support** – Lack of proper bi-directional text rendering for Hebrew and Arabic is causing layout corruption.
9.  **[#4888](https://github.com/github/copilot-cli/issues/4888): MCP Legacy Protocols** – Issues with dual-era MCP SDKs incorrectly falling back to legacy protocol requests after successful modern discovery.
10. **[#4705](https://github.com/github/copilot-cli/issues/4705): Prompt Queue Hangs** – Queued prompts occasionally fail to execute even after a session becomes idle.

---

## 4. Key PR Progress
*   **[#4739](https://github.com/github/copilot-cli/pull/4739): macOS Notifications** – A reference proposal to solve notification click issues via terminal-owned event handling.
*   **[#4770](https://github.com/github/copilot-cli/pull/4770): WebSocket Opt-out** – Documentation for disabling problematic WebSocket transports as a fallback mechanism for network-restricted environments.

*(Note: Only two PRs were active in the reporting window; other internal tracking happens outside this public repo.)*

---

## 5. Feature Request Trends
*   **Granular Policy Control:** A consistent push for moving from "all-or-nothing" organizational toggles to specific tool/agent-level permissions.
*   **Session Lifecycle Management:** High interest in "Branching" sessions to preserve history points without creating manual snapshots.
*   **BYOK/Config Flexibility:** Ongoing requests for custom HTTP headers and model whitelisting to support enterprise infrastructure and cost-control mandates.

---

## 6. Developer Pain Points
*   **"Invisible" Failures:** Multiple issues (e.g., [#4253](https://github.com/github/copilot-cli/issues/4253), [#3315](https://github.com/github/copilot-cli/issues/3315)) highlight frustration where the CLI silently fails or blocks actions without descriptive error output.
*   **Policy Friction:** The "fail-closed" default in corporate/MDM environments is causing significant friction, often clobbering user-defined intent (`--yolo`) or blocking legitimate plugins.
*   **Resource Management:** Users with large codebases are hitting performance walls (e.g., slow @Mentions) and memory instability in long-running terminal sessions.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*