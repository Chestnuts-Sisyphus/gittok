# AI CLI Tools Community Digest 2026-11-17

> Generated: 2026-11-17 02:41 UTC | Tools covered: 9

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

# AI CLI Tools Ecosystem Comparison Report
**Date:** 2026-11-17

## 1. Ecosystem Overview
The AI CLI tool landscape is currently in a phase of **stabilization and advanced workflow orchestration**, moving beyond basic code generation to managing complex multi-agent and sub-agent architectures. Across major tools like Claude Code, Gemini (implied by missing digest but contextually relevant), and OpenCode, the primary focus has shifted to resolving reliability issues in long-running sessions, specifically regarding network timeout handling, prompt cache invalidation costs, and process management. A significant interoperability convergence is emerging, with MCP (Model Context Protocol) becoming a universal standard for tool integration, though it remains a major source of configuration and authentication friction across platforms. Additionally, the industry is grappling with the economics of AI usage, driving strong community demand for granular cost controls, extended cache TTLs, and transparent quota visibility to prevent unexpected billing spikes.

## 2. Activity Comparison

*Note: Data reflects available community digests for 2026-11-17. Tools with "Summary generation failed" or "No activity" are marked as N/A or 0 respectively.*

| Tool | Hot Issues (Count) | Active PRs (Count) | Release Status | Key Focus Area |
| :--- | :---: | :---: | :--- | :--- |
| **Claude Code** | 10 | 1 (Closed) | v2.1.326 (New) | Network stability, Agent Teams, Cost controls |
| **GitHub Copilot CLI** | 10 | 0 | v1.0.113-0 (Minor) | Sandbox fragmentation, State persistence, Auth |
| **OpenCode** | 10 | 10 | Various (pty v0.6.0) | Process management, Code Mode, Automation |
| **Pi (pi-mono)** | 10 | 10 | None | TUI performance, Provider expansion, RPC stability |
| **Kimi Code CLI** | 0 | 0 | None | Inactive |
| **Gemini CLI** | N/A | N/A | N/A | Data Unavailable |
| **Qwen Code** | N/A | N/A | N/A | Data Unavailable |
| **DeepSeek TUI** | N/A | N/A | N/A | Data Unavailable |

## 3. Shared Feature Directions

Analysis of the active digests reveals three critical areas where requirements are converging across multiple tool ecosystems:

1.  **Prompt Cache Optimization & Cost Control**
    *   **Common Pain Point:** Short default cache Time-To-Live (TTL) periods (e.g., 5 minutes) are causing excessive invalidation, leading to massive token re-writes and cost spikes during normal interactive pauses.
    *   **Tools Affected:**
        *   **Claude Code:** Issues [#110403] (Subagent context re-writes) and [#105132] (Image trimming cache invalidation).
        *   **GitHub Copilot CLI:** Issue [#5220] (Explicit request for 1-hour TTL).
        *   **OpenCode:** Issue [#62554] (Auxiliary prompts breaking cached prefixes).
    *   **Implication:** Developers are demanding configurable cache strategies and specific "keep-warm" mechanisms to maintain economic viability for long-session coding.

2.  **Robust Process & Session Lifecycle Management**
    *   **Common Pain Point:** Unhandled resource leaks, zombie processes, and silent network drops are causing hard freezes or resource exhaustion.
    *   **Tools Affected:**
        *   **Claude Code:** Issues [#26224] and [#88178] (Silent network drops/freezes).
        *   **OpenCode:** Issues [#63817] (Zombie processes) and PRs [#64343] (Backgrounding slow scripts).
        *   **Pi:** Issues [#12225] (SSE lock leakage) and [#12241] (Headless hang).
    *   **Implication:** The shift from simple stateless requests to stateful, long-running agent sessions requires robust daemon management and explicit timeout/retry logic.

3.  **MCP (Model Context Protocol) Reliability**
    *   **Common Pain Point:** Fragility in MCP integration, including stale tool schemas, OAuth redirect failures, and permission mismatches.
    *   **Tools Affected:**
        *   **Claude Code:** Issue [#110270] (Stale MCP schemas on resume).
        *   **GitHub Copilot CLI:** Issues [#5359] (400 errors after tool change) and [#4901] (OAuth failures).
        *   **OpenCode:** PR [#63881] (Normalizing MCP permission actions).
    *   **Implication:** MCP is becoming the de facto standard for tool extension, but the implementation lacks resilience against server-side changes and network identity fluctuations.

## 4. Differentiation Analysis

*   **Claude Code: Enterprise-Grade Multi-Agent Orchestration**
    *   **Focus:** Deep integration of "Agent Teams" and "Code Mode."
    *   **Differentiator:** Leading the push for multi-account connector support and granular per-agent observability (`statusLine`). It targets professional/enterprise workflows where cost tracking and multi-repo context are paramount.
    *   **Technical Approach:** Heavy emphasis on server-side synchronization (e.g., Cowork cloud sessions) and strict CLI validation.

*   **GitHub Copilot CLI: Local Environment & Sandbox Integration**
    *   **Focus:** Native OS integration and permission sandboxing.
    *   **Differentiator:** Struggles more with local OS-level changes (macOS reboots, Windows OAuth) and strict sandboxing (Gradle/Network). It targets developers deeply embedded in local IDE/environments who need tight control over file system access.
    *   **Technical Approach:** Prioritizes security via sandboxing (Mach/XPC allowlists) but faces friction from over-enforcement breaking standard dev tools.

*   **OpenCode: Developer-First Workflow Flexibility & Automation**
    *   **Focus:** Granular control over execution modes (Foreground/Background subagents) and automation pipelines.
    *   **Differentiator:** Highly responsive to "developer experience" (DX) nuances, such as fixing PTY zombies and introducing scheduled automations. It appeals to power users who need to customize the agent's execution flow.
    *   **Technical Approach:** Modular architecture (`@opencode/pty`, `@opencode/ai`) allowing for rapid interchange of components and explicit memory management.

*   **Pi: Low-Level Performance & Provider Agnosticism**
    *   **Focus:** TUI performance optimization and broad model provider support.
    *   **Differentiator:** Acts as a high-performance "thin layer" over various LLMs (DeepInfra, Nebius, Ollama). It is distinct for its focus on reducing CPU overhead in TUI rendering and fixing low-level protocol issues (Websocket timeouts, SSE compression).
    *   **Technical Approach:** Optimistic concurrency and protocol-level fixes rather than high-level workflow features.

## 5. Community Momentum & Maturity

*   **High Momentum & Rapid Iteration:**
    *   **OpenCode** and **Pi** show the highest velocity. Both are closing high-priority infrastructure bugs (zombie processes, TUI lag) and shipping new architectural features (automations, new providers) within 24-hour cycles. This suggests a maturing core team that is actively stabilizing the v2.0+ architecture.
    *   **Claude Code** is mature but facing "shakeout" bugs as it scales complex features (Agent Teams) into the main release. The high volume of cost/network issues indicates a large, stressed user base.

*   **Stable but Friction-Heavy:**
    *   **GitHub Copilot CLI** appears stable in core functionality but is hampered by environment-specific edge cases (OS updates, Sandboxing). The lack of new PRs in the digest suggests a slower release cadence or a focus on internal stability fixes rather than new feature shipping.

*   **Data Gap:**
    *   **Gemini CLI**, **Qwen Code**, and **DeepSeek TUI** could not be assessed due to digest generation failures. Given the market landscape, **Gemini CLI** is likely a major competitor, and its absence from this dataset is a significant blind spot. **Kimi** shows no activity, suggesting it may not be a primary focus for the general developer community compared to the top 4.

## 6. Trend Signals

1.  **The "Cost Anxiety" Era:**
    Developers are no longer just concerned with *speed* but with *efficiency*. The prevalence of issues regarding prompt cache invalidation and silent token re-writes signals that AI coding assistants must become financially predictable. Tools that cannot offer transparent, real-time cost monitoring and cache control risks losing enterprise adoption.

2.  **From "Chat" to "Daemon":**
    AI CLIs are evolving from interactive chat commands into persistent background daemons. The rise of "zombie process" bugs, "session resume" failures, and "headless mode" hangs indicates that these tools are now managing long-lived state. Consequently, **reliability engineering** (memory management, connection keepalives, graceful shutdown) is now as important as model capability.

3.  **MCP Maturation & Standardization:**
    MCP has moved from "nice to have" to "critical infrastructure." However, the ecosystem is still fragile. The trend is moving toward **standardized error handling** for MCP failures. Tools that can gracefully degrade or clearly communicate MCP schema drift will gain a competitive edge over those that crash loops.

4.  **Multi-Agent Coordination Complexity:**
    With Claude Code pushing "Agent Teams" and OpenCode debating foreground/background subagents, the industry is entering a phase of **multi-agent orchestration**. The next generation of tools will likely introduce native primitives for defining agent relationships, dependencies, and shared memory spaces, rather than relying on simple sequential execution.

**Recommendation for Developers:**
Prioritize tools that offer **explicit control over execution context** (e.g., background vs. foreground tasks) and **robust observability** (cost/speed metrics). When selecting an enterprise solution, test specifically for **network resilience** (how it handles silent drops) and **local environment compatibility** (MCP + OS sandboxing), as these are the current vectors of most productivity losses.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

# Claude Code Community Digest (2026-11-17)

## Today's Highlights
Claude Code release **v2.1.326** brings Code Mode support when agent teams are enabled, alongside tighter CLI tool configuration validations. Meanwhile, developer community discussions are heavily focused on unhandled silent network drops causing multi-minute session freezes, cost bloat from subagent context re-writes after short idle pauses, and regressions in TUI status line visibility for agent teams.

---

## Releases

### [v2.1.326](https://github.com/anthropics/claude-code/releases/tag/v2.1.326)
* **Code Mode & Agent Teams:** Added support for activating Code Mode while agent teams are enabled; existing sessions with teams active will now automatically initiate in Code Mode.
* **CLI Validation:** Introduced a startup warning when entries passed to `--allowedTools`, `--disallowedTools`, or `--tools` do not match expected tool name patterns.

---

## Hot Issues

1. **[#27302](https://github.com/anthropics/claude-code/issues/27302) — Support multiple Connector accounts on web/claude.ai**  
   * **Why it matters:** Developers using enterprise setup need to authenticate with multiple accounts for the same connector (e.g., separate GitHub/Jira accounts for personal and work).  
   * **Community reaction:** Highly requested enhancement with over 310 comments and 476 upvotes.

2. **[#26224](https://github.com/anthropics/claude-code/issues/26224) — Claude Code hanging/freezing on prompts for 5-20+ minutes**  
   * **Why it matters:** Users report persistent freezes during interactive turns without timeouts or clear errors.  
   * **Community reaction:** Top active bug report (133 comments, 152 upvotes) causing major productivity hits.

3. **[#34255](https://github.com/anthropics/claude-code/issues/34255) — Remote Control automatic reconnection drops silently**  
   * **Why it matters:** Mobile/remote control sessions drop connections on network switches without triggering recovery mechanisms, requiring manual session restarts.

4. **[#88178](https://github.com/anthropics/claude-code/issues/88178) — Silent ~15-minute API stalls across sessions due to dead connections**  
   * **Why it matters:** Detailed root-cause analysis showing the CLI lacks TCP keepalive or FIN/RST packet detection when API connections drop silently, causing extended invisible spinners.

5. **[#109446](https://github.com/anthropics/claude-code/issues/109446) — Regression: `subagentStatusLine` removed in v2.1.323 without replacement**  
   * **Why it matters:** Removing this configuration hides per-agent context, cost, model, and effort metrics, breaking workflows for developers monitoring multi-agent runs.

6. **[#107077](https://github.com/anthropics/claude-code/issues/107077) — Cowork cloud sessions starting in "deprecated mode"**  
   * **Why it matters:** Plugin hooks and custom slash commands fail to execute deterministically depending on the server-assigned initialization mode.

7. **[#95764](https://github.com/anthropics/claude-code/issues/95764) — Opus 5 inter-tool prose returned as summarized `thinking` blocks**  
   * **Why it matters:** Interstitial code snippets and instructions written between tool calls are being server-summarized and stripped from the final user output.

8. **[#110403](https://github.com/anthropics/claude-code/issues/110403) — Subagents re-sending full history after 5-minute idle pauses**  
   * **Why it matters:** Due to the 5-minute prompt cache TTL tier, subagent follow-ups after brief delays trigger complete 180k+ token cache re-writes, spiking API spend.

9. **[#105132](https://github.com/anthropics/claude-code/issues/105132) — Repeated 0.76–0.79M token cache writes after automatic image trimming**  
   * **Why it matters:** Trimming historical images from conversation history invalidates the prompt cache on Opus 5.5, incurring massive unexpected cache write fees.

10. **[#110270](https://github.com/anthropics/claude-code/issues/110270) — Resumed sessions send stale MCP tool schemas**  
    * **Why it matters:** Running `claude --resume` reuses old tool definitions from `deferred_tools_record` instead of pulling updated schemas from the MCP server's `tools/list`.

---

## Key PR Progress

* **[#78049](https://github.com/anthropics/claude-code/pull/78049) [CLOSED] — `Set-ClaudeCodePolicy.ps1` target directory fix for 32-bit PowerShell**  
  * **Description:** Fixes MDM deployment scripts (e.g., via Microsoft Intune) by ensuring administrative policies don't resolve to `Program Files (x86)` when invoked from a 32-bit PowerShell execution host context.

*(Note: Pull request activity was minimal in the last 24-hour cycle.)*

---

## Feature Request Trends

* **Granular Observability & Cost Controls:** Strong demand for extending `--max-budget-usd` spend caps to interactive terminal sessions ([#95964](https://github.com/anthropics/claude-code/issues/95964)) and adding per-model weekly usage metrics directly into the `statusLine` payload ([#99223](https://github.com/anthropics/claude-code/issues/99223)).
* **Multi-Tenant / Multi-Workspace Contexts:** Developers are pushing for native support for multiple Slack workspaces ([#44243](https://github.com/anthropics/claude-code/issues/44243)) and multiple connector accounts per provider ([#27302](https://github.com/anthropics/claude-code/issues/27302)).
* **Cross-Session Memory & Workspace Sharing:** Requests to easily transfer rules, artifacts, and memories between separate Claude Code repositories and `claude.ai` Projects ([#110525](https://github.com/anthropics/claude-code/issues/110525), [#106011](https://github.com/anthropics/claude-code/issues/106011)).

---

## Developer Pain Points

1. **Unchecked Network Timeouts:** Silent socket drops during long-running API requests yield infinite spinners without active connection retry logic ([#26224](https://github.com/anthropics/claude-code/issues/26224), [#88178](https://github.com/anthropics/claude-code/issues/88178)).
2. **Prompt Cache Invalidation Costs:** Short 5-minute cache expirations on subagents ([#110403](https://github.com/anthropics/claude-code/issues/110403)) and automatic image trimming ([#105132](https://github.com/anthropics/claude-code/issues/105132)) frequently force full multi-hundred-thousand token re-writes.
3. **Plugin & Hook Reliability:** Issues with plugins being incorrectly flagged as inactive after 2 weeks ([#110537](https://github.com/anthropics/claude-code/issues/110537)) and cloud Cowork sessions disabling hook execution ([#107077](https://github.com/anthropics/claude-code/issues/107077)) complicate custom workflow development.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-11-17

## 1. Today's Highlights
The community is currently navigating a wave of state-management and permission-sandbox friction, notably around macOS updates invalidating filesystem device IDs for Model Context Protocol (MCP) writers and sandbox networking bugs breaking tools like Gradle. Meanwhile, recent bug reports highlight challenges with prompt caching TTLs for Claude models and race conditions in concurrent configuration file writes.

---

## 2. Releases
- **[v1.0.113-0](https://github.com/github/copilot-cli/releases/tag/v1.0.113-0)**: Minor release containing general fixes and changes.

---

## 3. Hot Issues

1. **[#4998 - Copilot CLI unusable after macOS update/reboot because `.mcp-writer.binding` persists stale filesystem device ID](https://github.com/github/copilot-cli/issues/4998)**  
   *Why it matters:* OS security updates alter filesystem device IDs, locking out all new and resumed sessions due to invalid bindings.  
   *Community reaction:* High engagement (12 comments, 11 👍) with users frustrated by sudden total CLI lockouts post-reboot.

2. **[#5145 - 400 `reasoning_text` in thinking mode must be passed back after a background shell exits](https://github.com/github/copilot-cli/issues/5145)**  
   *Why it matters:* Breaks custom OpenAI-compatible providers utilizing the `responses` API (such as DeepSeek) during model turns following background executions.  
   *Community reaction:* Active technical discussion around API payload requirements for thinking models.

3. **[#4905 - Desktop app: sessions die minutes after spawn with stale GitHub credentials](https://github.com/github/copilot-cli/issues/4905)**  
   *Why it matters:* Renders the desktop app unreliable for long-running workflows by breaking the underlying `github-mcp-server` catalog.  
   *Community reaction:* Acknowledged as a high-friction bug impacting multi-hour dev loops.

4. **[#2881 - Autopilot mode enters infinite loop, draining premium requests](https://github.com/github/copilot-cli/issues/2881)**  
   *Why it matters:* Directly drains user quotas by getting stuck printing `● Continuing autonomously` without making progress.  
   *Community reaction:* A critical failure mode causing financial/quota waste for automated workflows.

5. **[#4041 - web_fetch tool fails on all URLs (TypeError: fetch failed) in IPv4-only sandbox environments](https://github.com/github/copilot-cli/issues/4041)**  
   *Why it matters:* Completely cripples documentation-fetching and web research capabilities inside restricted or legacy network setups.  
   *Community reaction:* Troubleshot widely by enterprise users running strict sandbox configurations.

6. **[#5220 - Option for 1-hour prompt cache TTL for Claude models](https://github.com/github/copilot-cli/issues/5220)**  
   *Why it matters:* Anthropic's default 5-minute TTL expires constantly during normal interactive thinking and reading gaps, driving up token costs.  
   *Community reaction:* Strong community demand (11 👍) for cost-saving cache optimizations.

7. **[#5359 - Resumed session fails every request with 400 "Tool reference '...' not found" after MCP tools change](https://github.com/github/copilot-cli/issues/5359)**  
   *Why it matters:* Resuming a session after an MCP server updates its tool definitions results in a permanent 400-error death spiral.  
   *Community reaction:* Highlights a lack of resilience in session state when tool registries drift.

8. **[#4901 - Atlassian MCP OAuth fails: unauthorized_client: redirect_uri is not registered (v2 endpoint)](https://github.com/github/copilot-cli/issues/4901)**  
   *Why it matters:* Blocks critical enterprise integrations with Atlassian tool suites via MCP.  
   *Community reaction:* Part of an ongoing series of OAuth redirect and port-allocation issues on Windows and macOS.

9. **[#4903 - Branch-type sessions all get updated_at bumped on git checkout, flooding sidebar](https://github.com/github/copilot-cli/issues/4903)**  
   *Why it matters:* Switching git branches pushes dozens of stale, unrelated sessions to the top of the chat sidebar, destroying user navigation context.  
   *Community reaction:* Viewed as a major UI annoyance for developers who frequently switch branches.

10. **[#4900 - config.json trustedFolders lost when concurrent sessions overwrite the file on exit](https://github.com/github/copilot-cli/issues/4900)**  
    *Why it matters:* Multiple concurrent CLI sessions race to overwrite `~/.copilot/config.json`, resulting in data loss for managed settings like `trustedFolders`.  
    *Community reaction:* Raises security and stability concerns over local state file handling.

---

## 4. Key PR Progress
*No pull request data was reported active in the past 24 hours.*

---

## 5. Feature Request Trends
- **Granular Sandbox & Network Controls:** Users want explicit allowlists for Mach/XPC services on macOS (e.g., 1Password CLI) and more predictable local network routing inside sandboxed environments.
- **Context & Cache Optimization:** Better cache management tools, such as configurable TTLs for Claude prompts and 1M token context support.
- **UI & Session Management:** Requests for an archived chats view with a restore action, finer-grained control to cancel queued messages individually, and the ability to copy older assistant outputs directly.
- **Autopilot Refinements:** Options to toggle off repetitive "Task complete" summary blocks during long-running tasks.

---

## 6. Developer Pain Points
- **State Race Conditions:** Concurrent CLI sessions overwriting shared local configuration (`config.json`) and git checkouts unexpectedly mutating session timestamps.
- **MCP & OAuth Fragility:** Frequent friction with MCP authentication loops, stale server bindings after OS updates, and mismatched redirect URIs.
- **Sandbox Over-Enforcement:** Strict local sandboxing inadvertently blocking auxiliary tools like Gradle (`hostLoopback: deny`), VS Code Remote via WSL, and external CLI integrations.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-11-17

## 1. Today's Highlights
Today's updates focus heavily on stabilizing OpenCode v2.3.0, resolving critical process-daemon zombie leaks, and enhancing Code Mode execution capabilities. Key infrastructure improvements include the release of `@opencode/pty@0.6.0` to address Linux NFS database initialization and PTY cleanup bugs, alongside ongoing discussions regarding free tier quotas and subagent execution modes.

---

## 2. Releases
- **[process-daemon-v0.6.0](https://github.com/anomalyco/opencode)**: Published `@opencode/pty@0.6.0` (protocol 9) via `packages/process-daemon` to resolve process termination and reaping bugs on Linux.

---

## 3. Hot Issues
1. **[#59387 Free tier issues: read this first, then post your report here](https://github.com/anomalyco/opencode/issues/59387)**
   - *Why it matters:* Serves as the central tracking hub for free-tier users hitting persistent rate limits, quota reset failures, and desktop version mismatches.
   - *Community Reaction:* High engagement (385 comments, 28 👍) highlighting widespread friction around free-tier usage caps.
2. **[#63817 pty: shell commands leave zombies under opencode-pty daemon on Linux (2.3.0)](https://github.com/anomalyco/opencode/issues/63817)**
   - *Why it matters:* Highlights a severe resource leak introduced in v2.3.0 where completed shell commands remain as `<defunct>` zombie processes under the PTY daemon.
   - *Community Reaction:* Prompted quick debugging and subsequent upstream daemon fixes.
3. **[#64073 [FEATURE]:Restore Foreground Subagent Execution](https://github.com/anomalyco/opencode/issues/64073)**
   - *Why it matters:* Users request the ability to execute subagent calls in the foreground rather than being forced into background execution.
   - *Community Reaction:* Active feature debate over execution control and workflow blocking.
4. **[#64096 [FEATURE]: Always-background subagents (2.3.0): please keep a way to run a subagent call as a blocking call](https://github.com/anomalyco/opencode/issues/64096)**
   - *Why it matters:* Complements #64073, emphasizing the loss of synchronous/blocking subagent patterns in version 2.3.0.
   - *Community Reaction:* Strong user demand for flexible subagent concurrency policies.
5. **[#43039 [v2] add no password flag for "opencode2 serve"](https://github.com/anomalyco/opencode/issues/43039)**
   - *Why it matters:* V2 authentication defaults differ from V1, prompting requests for unauthenticated local/isolated server flags.
   - *Community Reaction:* Highly upvoted (35 👍) by developers running local dev containers.
6. **[#61899 desktop: Ctrl+C in integrated terminal does not interrupt running process](https://github.com/anomalyco/opencode/issues/61899)**
   - *Why it matters:* Core usability bug on Windows where SIGINT signals fail to propagate to child processes in the integrated desktop terminal.
   - *Community Reaction:* Frustrated developers forced to use manual PIDs to kill local dev servers.
7. **[#62554 One-off prompts (goal reminder, keep-alive, compaction prompt) take the cache breakpoint and break the cached prefix](https://github.com/anomalyco/opencode/issues/62554)**
   - *Why it matters:* Architectural performance issue where auxiliary prompts disrupt expensive prompt caching layers.
   - *Community Reaction:* Technical concern over token efficiency and inference cost.
8. **[#51796 tui: "New terminal" fails with 503 on glibc < 2.28 — embedded opencode-pty is unrunnable](https://github.com/anomalyco/opencode/issues/51796)**
   - *Why it matters:* Compatibility blocker preventing the experimental persistent PTY feature from running on older Linux distributions.
   - *Community Reaction:* Highlights friction with pre-compiled binary dependencies on enterprise environments.
9. **[#64334 free quota exhaustion only visible after new session fails with 429](https://github.com/anomalyco/opencode/issues/64334)**
   - *Why it matters:* UX gap where users have no visibility into remaining free daily quota until requests hard-fail with HTTP 429.
   - *Community Reaction:* Demands for an upfront quota indicator in the TUI/Desktop interface.
10. **[#64304 Four Free models incorrectly require training consent despite documented zero retention and no training](https://github.com/anomalyco/opencode/issues/64304)**
    - *Why it matters:* Compliance and usability bug blocking users from utilizing privacy-safe free models without toggling training consent.
    - *Community Reaction:* Points out discrepancies between model documentation and provider enforcement.

---

## 4. Key PR Progress
1. **[#64343 feat(core): background slow Code Mode scripts behind full_codemode](https://github.com/anomalyco/opencode/pull/64343)**
   - Automatically transitions Code Mode scripts taking longer than 10 seconds into background jobs when `full_codemode` is active.
2. **[#64340 fix(core): avoid WAL on Linux NFS databases](https://github.com/anomalyco/opencode/pull/64340)**
   - Fixes NFS/WAL startup failures by disabling Write-Ahead Logging specifically for SQLite databases hosted on Linux NFS.
3. **[#64335 feat(core): make shell the only Code Mode shell tool, pinned and annotated](https://github.com/anomalyco/opencode/pull/64335)**
   - Streamlines Code Mode toolsets by consolidating execution down to a single designated shell tool.
4. **[#64344 fix(codemode): drop the null result line before logs](https://github.com/anomalyco/opencode/pull/64344)**
   - Cleans up Code Mode execution outputs, removing extraneous `null` prefixes when programs return only logs or warnings.
5. **[#64251 fix(core): pin @opencode/pty 0.6.0 and use protocol 9](https://github.com/anomalyco/opencode/pull/64251)**
   - Upgrades core consumers to use `@opencode/pty@0.6.0`, resolving the zombie child process leak.
6. **[#60628 feat(app): show where automations run and which session they wake](https://github.com/anomalyco/opencode/pull/60628)**
   - Enhances the Desktop interface to surface active automations, their execution environment, and target sessions.
7. **[#63881 fix(core): normalize MCP permission actions](https://github.com/anomalyco/opencode/pull/63881)**
   - Fixes runtime permission mismatches caused by hyphenated MCP server/tool names failing to match underscore-configured rules.
8. **[#64339 fix(tui): keep older pinned sessions visible](https://github.com/anomalyco/opencode/pull/64339)**
   - Resolves a bug where older pinned sessions disappeared due to the session picker reading only the 50 most recent records.
9. **[#64166 feat(ai): add mid-conversation tool changes](https://github.com/anomalyco/opencode/pull/64166)**
   - Extends `@opencode/ai` to support adding, removing, and redefining tools dynamically partway through active conversations.
10. **[#64160 feat(core): turn experimental schedules into automations](https://github.com/anomalyco/opencode/pull/64160)**
    - Introduces a robust automation pipeline enabling timers and pushed MCP events to trigger code execution and selectively wake sessions.

---

## 5. Feature Request Trends
- **Unified Marketplace & Extensions:** Continued interest in a centralized registry/marketplace (Issue [#28696](https://github.com/anomalyco/opencode/issues/28696)) for plugins, agents, and skills.
- **Workflow Granularity:** Strong demand for configuration flexibility, such as disabling authentication for local/devcontainer servers (Issue [#43039](https://github.com/anomalyco/opencode/issues/43039)) and choosing between foreground vs. background subagent execution (Issues [#64073](https://github.com/anomalyco/opencode/issues/64073), [#64096](https://github.com/anomalyco/opencode/issues/64096)).
- **Productivity Aids:** Requests for dedicated session scratchpads or notebooks to store prompt fragments and partial agent outputs (Issue [#64327](https://github.com/anomalyco/opencode/issues/64327)).

---

## 6. Developer Pain Points
- **Process & Daemon Management:** Zombie process accumulation from shell commands (`opencode-pty`) and unmanaged background execution continue to cause resource locking and stability concerns on Linux and Windows.
- **Quota & Auth UX:** Free-tier limits lacking upfront visibility cause sudden friction (HTTP 429 errors without prior quota warnings), compounded by confusion around model training consent requirements and V1 migration compatibility regressions.
- **Environment Compatibility:** Lower GLIBC requirements and network filesystem limitations (such as Linux NFS SQLite/WAL issues) create deployment hurdles for enterprise and containerized developers.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest: 2026-11-17

This digest covers recent activity in the `earendil-works/pi` repository, highlighting a heavy focus on stability, TUI performance, and lifecycle event correctness.

## 1. Today's Highlights
The community and core team saw a high-intensity 24-hour period focused on patching session lifecycle bugs and refining the TUI experience. A significant number of issues regarding event duplication, stream handling, and resource management were resolved, culminating in several PRs addressing critical reliability in both CLI and RPC modes.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Hot Issues
1. **[#9549] Large transcript re-render (18 comments):** A performance bottleneck where resizing or re-rendering saturates a core. Community feedback emphasizes the need for a more efficient diffing strategy.
2. **[#11950] Tool calls executing concurrently (7 comments):** A critical bug where `bash` and `read` tools run simultaneously, leading to race conditions. High priority for stability.
3. **[#11527] Bedrock client churn (7 comments):** Every request currently instantiates a new `BedrockRuntimeClient`, causing unnecessary authentication overhead.
4. **[#12124] Codex 60-minute connection limit (4 comments):** Long-running thinking turns are hitting hard websocket timeouts. Resolved via PR #12229.
5. **[#12148] Mistral Large 4 hanging (4 comments):** Reports of tool-call failures with the new model.
6. **[#11226] Variable naming conflict (4 comments):** Declaring a top-level `tools` variable crashes codemode scripts.
7. **[#11172] StdinBuffer/Split mouse report (4 comments):** Input edge-case where timeout flushing causes corrupted prompts.
8. **[#12225] SSE reader lock leakage (3 comments):** Incomplete stream cleanup is preventing proper connection termination.
9. **[#12060] OpenAI-codex zstd compression (3 comments):** SSE streams returning 400 errors when compressed; likely a transport header mismatch.
10. **[#12241] Headless mode hang (2 comments):** Persistent exit issues in `pi -p` when extensions are present.

## 4. Key PR Progress
1. **[#11370] New Provider Support:** Adds DeepInfra, Nebius, Ollama Cloud, and others, significantly expanding the model ecosystem.
2. **[#11968] TUI Optimization:** Implements O(viewport) scroll frames, solving the transcript rendering lag found in #9549.
3. **[#12236] TUI/IO Fix:** Ensures `git`/`npm` output is captured rather than inherited, preventing TUI corruption during package installs.
4. **[#12229] Codex Timeout Fix:** Reconnects on 60-minute websocket limits, closing #12124.
5. **[#12230] RPC Session Fix:** Ensures `session_start` only triggers once during session replacement, resolving #10470.
6. **[#12232] Print Mode Events:** Enables JSON streaming of `session_start` events for better observability in `--mode json`.
7. **[#12235] Platform-aware Hints:** Fixes UX inconsistencies where mobile-first "tap/long-press" hints were shown on desktop.
8. **[#12198] Security Bump:** Updates `undici` to 8.12.4 to resolve multiple high-severity vulnerabilities.
9. **[#11800] Ant Ling Updates:** Unifies API compatibility for the Ant Ling model family.
10. **[#12115] Diagnostic Reporting:** Standardizes how session replacement errors are reported to the user.

## 5. Feature Request Trends
*   **Background Execution:** Growing demand for native "background bash" support that notifies the agent upon exit, rather than requiring extension-based hacks (#12223).
*   **Resilient Workflows:** Requests for better session preservation when external tools are invoked (#12216).
*   **Structured Metadata:** Desire for a unified contract for provider failure/retry metadata to aid mobile integration (#11071).

## 6. Developer Pain Points
*   **Lifecycle Event Noise:** Multiple developers are struggling with the timing and frequency of `session_start` events, which often trigger twice or during deadlocked states (#8735, #10470).
*   **TUI Collision:** Conflicts between command-line tool output and the terminal UI (TUI) are forcing developers to adopt "headless" modes, which themselves have stability issues (#11264, #12236).
*   **Resource Management:** High-memory and CPU usage in long-running sessions, specifically regarding transcript compaction (#12242) and spinner overhead (#9399).

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