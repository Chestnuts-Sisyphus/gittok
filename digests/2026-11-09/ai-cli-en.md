# AI CLI Tools Community Digest 2026-11-09

> Generated: 2026-11-08 23:17 UTC | Tools covered: 9

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

# AI CLI Tools Ecosystem Report
**Date:** 2026-11-09
**Scope:** Cross-tool analysis of Gemini CLI, GitHub Copilot CLI, and OpenCode.
*Note: Data for Claude Code, OpenAI Codex, Pi, Qwen Code, and DeepSeek TUI was unavailable due summary generation failures. Kimi Code CLI showed no activity.*

## 1. Ecosystem Overview
The AI CLI tools landscape is currently transitioning from basic code completion to complex, autonomous multi-agent orchestration, with a visible maturation in stability challenges. The ecosystem is experiencing a "reliability crunch," where the pursuit of advanced agentic capabilities (subagents, persistent memory, complex tooling) is exposing foundational gaps in state management, cross-platform security, and configuration persistence. While no major version releases occurred in the last 24 hours, the volume of critical bug reports regarding agent hangs and state desynchronization indicates a high-priority pivot toward hardening execution environments over adding new features. This period reflects a shift from "demo-able" agentic workflows to "production-ready" reliability, particularly for unattended and CI/CD scenarios.

## 2. Activity Comparison

| Tool | Active Issues (Reported) | Active PRs (Reported) | Release Status (24h) | Primary Focus Area |
| :--- | :---: | :---: | :---: | :--- |
| **Gemini CLI** | 10 High-Priority | 10 Significant | None | Agent Reliability & Windows Security |
| **GitHub Copilot CLI**| 10 High-Priority | 0 (New) | None | Plugin Lifecycle & Non-Interactive Mode |
| **OpenCode** | 10 Critical/High | 10 Significant | None | Session Integrity & Provider Routing |
| **Kimi Code CLI** | 0 | 0 | None | N/A |
| **Other Tools** | N/A | N/A | N/A | Data Unavailable |

*Note: Issue and PR counts represent the top 10 most significant items highlighted in the community digests, not necessarily the total repository count.*

## 3. Shared Feature Directions

Several critical architectural requirements and pain points are converging across the major tools, suggesting industry-wide standardization efforts:

*   **Standardized Terminal Status Protocol (OSC 7501):**
    *   **Tools:** Gemini CLI (`#29918`), GitHub Copilot CLI (`#5320`).
    *   **Need:** Both communities are actively implementing or requesting support for the OSC 7501 escape sequence. This allows third-party terminal emulators to natively display agent states (Working, Blocked, Idle, Error) without parsing stdout, enabling better integration with modern TUIs and monitoring dashboards.
*   **Non-Interactive/Headless Robustness:**
    *   **Tools:** GitHub Copilot CLI (`#5381`), Gemini CLI (`#22323`).
    *   **Need:** Significant friction in `-p` (prompt) or CI modes where permission requests hang indefinitely or subagent timeouts are not respected. There is a collective drive to make agents "fire-and-forget" reliable for automated pipelines without manual intervention.
*   **Configuration Persistence & Propagaton:**
    *   **Tools:** Gemini CLI (`#22267`, `#30068`), GitHub Copilot CLI (`#5382`, `#5383`).
    *   **Need:** Users are frustrated that settings (e.g., `maxTurns`, skill directories, default agents) do not persist across context resets (`new_context`), session restarts, or subagent spawning. The trend is moving toward strict config-state synchronization between the main CLI, core modules, and ephemeral subagents.
*   **AST-Aware Code Exploration:**
    *   **Tools:** Gemini CLI (`#22745`).
    *   **Need:** While currently highlighted by Gemini, this represents a broader architectural shift away from grep-based text search to AST-aware tools to reduce token consumption and improve precision in large codebases. Other tools are likely to follow as context window costs remain a top concern.

## 4. Differentiation Analysis

While the core problems are similar, each tool differentiates based on its target user base and technical architecture:

*   **Gemini CLI (Security-First & Model-Agnostic Optimization):**
    *   **Focus:** Heavy emphasis on **security hardening** (Windows permission bypasses, MCP OAuth safe dispatchers, CI key exposure) and leveraging specific model capabilities (Gemini 3 bash affinity).
    *   **Differentiator:** Strong focus on operating system-level sandboxing and ensuring safe execution boundaries, particularly for Windows environments.
*   **GitHub Copilot CLI (Ecosystem & Enterprise Integration):**
    *   **Focus:** Deep integration with **GitHub Enterprise** (data residency, GHEC) and the **Extension/Plugin ecosystem**.
    *   **Differentiator:** Struggles more with the complexity of its plugin lifecycle (skills, hooks, extensions) persisting across sessions. Its differentiation lies in being the choice for tightly integrated enterprise dev workflows, though this introduces significant state-management complexity.
*   **OpenCode (Vendor-Neutrality & Flexibility):**
    *   **Focus:** **Multi-provider support** and local model management (Ollama, Gemini, OpenAI-compatible).
    *   **Differentiator:** High volume of issues related to **provider routing collisions** and **auth state staleness** across different LLM backends. It targets developers who need flexibility to switch models, resulting in different pain points around API spec differences (e.g., Gemini `cachedContent` conflicts) and local model inference stability.

## 5. Community Momentum & Maturity

*   **Gemini CLI:** **High Momentum, Maturing Stability.** The presence of sophisticated PRs (OSC 7501, AST assessment, safe dispatchers) indicates a team moving from feature development to architectural refinement. The community is highly engaged in reliability, with P1 bugs on agent hangs drawing significant attention.
*   **GitHub Copilot CLI:** **Active but Fragmented.** The community is large and demanding, but the tool is currently in a "state synchronization" debugging phase. The lack of new PRs in the 24h window (relative to issues) suggests a backlog of complex fixes related to the plugin/session lifecycle. Momentum is high but driven by frustration with enterprise/on-prem edge cases.
*   **OpenCode:** **Chaos of Flexibility.** The community is rapidly iterating but facing foundational stability issues. The "Free Tier Issues" hub (333 comments) indicates high user volume and significant accessibility friction. The tool is less mature in terms of state management compared to Gemini, showing more "random" crashes and provider-specific quirks.

## 6. Trend Signals

Based on the 2026-11-09 digest, the following trends offer reference value for developers and decision-makers:

1.  **The End of "Happy Path" Agentic Development:** The focus has shifted from "Can the agent do X?" to "Does the agent hang/crash/leak keys when doing X in Production?" Developers should prioritize tools with robust **timeout controls** (`tools.callTimeout`) and **sandboxed execution** for unattended tasks.
2.  **Terminal UI as a System Interface:** The adoption of **OSC 7501** signals that CLI agents are becoming first-class citizens in the desktop OS ecosystem. We expect future IDEs and terminals to have native "Agent Status" indicators, similar to Git status bars. Investing in tools that support standard TUI status protocols will yield better integration in custom dev environments.
3.  **Configuration as Code is Expected:** Users increasingly expect CLI configurations (agents, models, skills) to behave like declarative code (persistent, deterministic, version-control friendly). Tools that drift state (e.g., losing skills after `new_context`) are creating significant technical debt for users. Look for tools that explicitly guarantee **config hydration** on every session start.
4.  **Security is Now a Primary UX Feature:** With the rise of MCP and shell access, security vulnerabilities (argument injection, key leakage in CI) are top user concerns. Tools like Gemini CLI are proactively hardening these layers. Enterprises should prioritize tools with visible **security PRs** (e.g., safe HTTP dispatchers, permission bypass fixes) over those with glossy new UI features.
5.  **Context Window Management is an Architectural Concern:** The push for **AST-aware search** and **prompt caching** configurations indicates that simply "increasing context" is no longer the solution. The next wave of competitive advantage will come from **efficient context injection** tools that minimize token usage while maximizing codebase understanding.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — November 9, 2026

## 1. Today's Highlights
Activity in the `google-gemini/gemini-cli` repository centers heavily around agent reliability, security hardening for Windows environments, and improving subagent lifecycle controls. While no new releases dropped in the last 24 hours, the community and core maintainers are actively addressing critical agent execution hangs, setting overrides, and sandboxing security boundaries.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues

1. **[#22323 Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   * **Why it matters:** Misleading status returns from subagents (`codebase_investigator`) cause workflows to falsely report success when they actually hit hard turn limits without finishing analysis.  
   * **Community reaction:** High-visibility bug (13 comments, P1 priority) drawing frustration from developers relying on unattended subagent task execution.

2. **#19873 [Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**  
   * **Why it matters:** Focuses on tailoring the CLI to Gemini 3 models' native capability to run POSIX commands directly, optimizing how shells are sandboxed.  
   * **Community reaction:** Seen as a cornerstone architectural enhancement for next-gen performance.

3. **#21409 [Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   * **Why it matters:** Generalist agents indefinitely hang during simple operations like folder creation, breaking autonomous workflows entirely unless users explicitly disable subagents.  
   * **Community reaction:** Highly disruptive bug gathering strong community feedback (8 👍, 8 comments).

4. **#22745 [Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**  
   * **Why it matters:** Proposes shifting codebase exploration from text/grep matching to AST-aware querying to drastically cut token consumption and misaligned file reads.  
   * **Community reaction:** Core epic tracking a major upcoming optimization track.

5. **#21968 [Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**  
   * **Why it matters:** Anecdotal reports indicate models rarely invoke custom subagents or skills proactively without explicit hand-holding.  
   * **Community reaction:** Spotlights a major prompt-engineering and agent-routing gap.

6. **#22267 [Browser Agent ignores settings.json overrides (e.g., maxTurns)](https://github.com/google-gemini/gemini-cli/issues/22267)**  
   * **Why it matters:** Users cannot properly configure browser agents due to configuration blocks failing to propagate from `settings.json`.  
   * **Community reaction:** Important quality-of-life fix for developers running browser automation tasks.

7. **#21983 [browser subagent fails in wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**  
   * **Why it matters:** Linux developers running Wayland face immediate crashes/failures when invoking the browser subagent.  
   * **Community reaction:** Key environmental blocker for Linux desktop developers.

8. **#24246 [Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**  
   * **Why it matters:** Scaling up enabled tools results in API rejections due to tool count limits, forcing the CLI to handle tool scoping more intelligently.  
   * **Community reaction:** Technical bottleneck for heavily customized or plugin-rich setups.

9. **#23571 [Model frequently creates tmp scripts in random spots](https://github.com/google-gemini/gemini-cli/issues/23571)**  
   * **Why it matters:** Shell-restricted models litter workspaces with temporary editing scripts, making cleanup tedious before making git commits.  
   * **Community reaction:** A prominent nuisance affecting repository cleanliness.

10. **#22186 [get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**  
    * **Why it matters:** Long-running deployment summaries trigger sudden termination just as tasks approach completion.  
    * **Community reaction:** Frustrating blocker causing silent crashes at the tail end of long sessions.

---

## 4. Key PR Progress

1. **[#30095 fix: prevent Windows git diff permission bypass](https://github.com/google-gemini/gemini-cli/pull/30095)**  
   * **Details:** Extracts shared Git command safety validation into reusable helpers, enforcing consistent read-only checks on Windows to block dangerous argument injection.

2. **[#27423 feat(core): add configurable per-tool-call timeout (tools.callTimeout)](https://github.com/google-gemini/gemini-cli/pull/27423)**  
   * **Details:** Introduces a wall-clock duration limiter (`tools.callTimeout`) to prevent long-running tool invocations (such as hung shell commands) from running indefinitely.

3. **[#29918 feat(cli): report working, blocked and idle status to the terminal (OSC 7501)](https://github.com/google-gemini/gemini-cli/pull/29918)**  
   * **Details:** Adds TUI state emission via OSC 7501, allowing supported terminal tabs to natively surface status indicators (working, blocked on auth/permission, idle, error).

4. **[#29919 feat(cli): append to the system prompt with --append-system-prompt](https://github.com/google-gemini/gemini-cli/pull/29919)**  
   * **Details:** Introduces new flags (`--append-system-prompt`, `--append-system-prompt-file`, and `GEMINI_APPEND_SYSTEM_MD`) to safely extend system prompts without overriding global configurations.

5. **[#30071 Route MCP OAuth fetches through the safe dispatcher](https://github.com/google-gemini/gemini-cli/pull/30071)**  
   * **Details:** Fixes an MCP security gap where OAuth metadata and registration connections bypassed the safe HTTP dispatcher during connection time.

6. **[#30068 fix(cli): forward context management settings to core](https://github.com/google-gemini/gemini-cli/pull/30068)**  
   * **Details:** Ensures user configuration overrides for context management thresholds (like output masking token limits) are correctly forwarded to core rather than falling back to defaults.

7. **[#29912 fix(core): strip trailing punctuation and unbalanced brackets from web_fetch URLs](https://github.com/google-gemini/gemini-cli/pull/29912)**  
   * **Details:** Cleans up tokenized URL strings parsed from prompts to prevent polluted requests (such as trailing commas) from breaking `web_fetch`.

8. **[#30090 ci(chained_e2e): don't expose GEMINI_API_KEY to fork-controlled code](https://github.com/google-gemini/gemini-cli/pull/30090)**  
   * **Details:** Hardens CI workflows by gating artifact handoffs and API keys to prevent unintended exposure to fork-controlled PR code.

9. **[#30066 ci: inert canary in package.json scripts (security PoC)](https://github.com/google-gemini/gemini-cli/pull/30066)**  
   * **Details:** Adds a security proof-of-concept testing harness for self-hosted runner safety.

10. **[#30065 ci probe: second PR from the same fork account](https://github.com/google-gemini/gemini-cli/pull/30065)**  
    * **Details:** Validates contributor workflow automation states and first-time contribution validation rules.

---

## 5. Feature Request Trends
* **AST-Aware Code Exploration:** Moving away from standard text search/grepping toward AST-aware tools (`tilth`, `glyph`, `ast-grep`) to improve precision and reduce context window bloat.
* **Persistent & Workspace-Level Task Management:** Transitioning away from ephemeral conversation-based "WriteToDo" elements toward robust file-based task tracking and workspace-specific policies.
* **Enhanced Subagent Visibility & Sharing:** Requests to expose subagent trajectories in bug reports, session shares (`/chat share`), and terminal state indicators (OSC 7501).

---

## 6. Developer Pain Points
* **Infinite Agent Hangs:** Generalist agents and subagents locking up indefinitely during routine directory or file creation tasks.
* **Configuration Drift:** Settings overrides in `settings.json` (such as `maxTurns` or context management thresholds) failing to properly apply down to individual agents and core modules.
* **Workspace Littering:** Models generating unmanaged temporary scripts across random directories when executing shell-heavy workflows.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest (2026-11-09)

## 1. Today's Highlights
Recent activity in the `github/copilot-cli` repository highlights a surge in issues surrounding **plugin lifecycles, session management persistence, and non-interactive permission handling**. Developers working with advanced multi-agent orchestrations and automated pipelines are encountering state synchronization bugs—ranging from dropped extension skills after context resets to silent permission blocks in prompt mode. 

---

## 2. Releases
*No new releases were published in the last 24 hours.*

---

## 3. Hot Issues

1. **[#5320 - Support OSC 7501 agent-status reporting for Herdr app](https://github.com/github/copilot-cli/issues/5320)**
   * **Why it matters:** Requests native Program Status Protocol (OSC 7501) support so custom terminal apps like Herdr can natively track and display active Copilot sessions.
   * **Community Reaction:** Gaining strong community traction (11 👍), indicating a high demand for tighter integration with modern terminal ecosystems.

2. **[#5381 - Extension tools hang indefinitely in prompt mode (`-p`) and `--allow-tool` cannot target extension tools](https://github.com/github/copilot-cli/issues/5381)**
   * **Why it matters:** Breaks non-interactive automation. Custom tool permission requests wait forever because prompt mode's hook-resolution handler returns early for custom types.
   * **Community Reaction:** Critical for CI/CD users attempting to script workflows using extension-defined tooling.

3. **[#5380 - Extensions fail to initialize for sessions created via `create_session` until manual switch](https://github.com/github/copilot-cli/issues/5380)**
   * **Why it matters:** Subagent sessions spawned programmatically lack extension tools, hooks, and skill registries until a user manually interacts with the session.
   * **Community Reaction:** Highlights a lifecycle disconnect in programmatic multi-agent delegation architectures.

4. **[#5382 - Extension-registered `skillDirectories` vanish after `new_context` execution](https://github.com/github/copilot-cli/issues/5382)**
   * **Why it matters:** When a session clears its context, restored sessions or subsequent prompts lose access to registered skills, throwing "Skill not found" errors.
   * **Community Reaction:** Undermines long-running sessions that rely on dynamic skill loading and context resets.

5. **[#5219 - Subagent model fallback to 128k default caps causes prompt budget overflow](https://github.com/github/copilot-cli/issues/5219)**
   * **Why it matters:** When a task subagent encounters an unknown model ID, it defaults to a restrictive 128k context cap, causing entire turns to fail even when main contexts are healthy.
   * **Community Reaction:** Blocks complex hierarchical agent topologies from executing reliably.

6. **[#5384 - Project deliverables stranded in `~/.copilot/session-state/` instead of active Git worktrees](https://github.com/github/copilot-cli/issues/5384)**
   * **Why it matters:** Agents write critical test reports, audit logs, and helper scripts into global hidden storage rather than the local project directory.
   * **Community Reaction:** Frustrates developers who expect AI-generated artifacts to be tracked locally within their active Git repositories.

7. **[#5100 - Session event delivery permanently fails after 120s host-ack timeout](https://github.com/github/copilot-cli/issues/5100)**
   * **Why it matters:** A single timeout on `tool.execution_partial_result` renders the active session completely unusable until manually resumed.
   * **Community Reaction:** Disrupts long-running interactive tasks, forcing context recovery flows.

8. **[#5383 - Request for setting a configurable default Agent](https://github.com/github/copilot-cli/issues/5383)**
   * **Why it matters:** Users are forced to manually activate their preferred specialized agent on every new session launch, lacking config-level defaults similar to model/context size settings.
   * **Community Reaction:** A quality-of-life feature request aimed at reducing repetitive initialization steps.

9. **[#4378 - Cloud agent MCP registry policy fetch returns 401/403 on GHEC data residency instances](https://github.com/github/copilot-cli/issues/4378)**
   * **Why it matters:** Silently drops all user-configured Model Context Protocol (MCP) servers on GitHub Enterprise Cloud tenants with data residency enabled.
   * **Community Reaction:** Enterprise roadblock preventing customized cloud agent deployments under strict data residency constraints.

10. **[#5379 - PowerShell approval parser requires full-script review for standard Git commands](https://github.com/github/copilot-cli/issues/5379)**
    * **Why it matters:** Windows users running PowerShell face redundant prompt friction for standard Git operations despite pre-granted tool permissions.
    * **Community Reaction:** Highlights cross-platform CLI friction points in Windows development environments.

---

## 4. Key PR Progress
*No pull requests were updated or opened in the last 24 hours.* *(Note: Issue [#4977](https://github.com/github/copilot-cli/issues/4977) regarding bundled `ripgrep` jemalloc failures on 16KB-page Asahi Linux ARM64 kernels was successfully closed).*

---

## 5. Feature Request Trends
* **Deep Terminal Integration:** Growing interest in adopting standard status protocols (like OSC 7501) to surface CLI activity inside specialized terminal shells.
* **Granular Configuration Defaults:** Expanding configuration options beyond models and context limits to include persistent default agents (`#5383`).
* **Robust Non-Interactive Scripting:** Better handling of flags like `--allow-tool` and automated permissions for headless or prompt-mode environments (`#5381`).

---

## 6. Developer Pain Points
* **Plugin State & Lifecycle Desynchronization:** Developers building custom extensions face multiple hurdles where extension hooks, skill directories, and subagent processes fail to initialize, persist across context clears (`new_context`), or survive session closure workflows (`#5380`, `#5382`, `#5386`).
* **Silent Failures in Enterprise & Cloud Environments:** Configuration issues such as MCP policy fetch errors on GHEC data residency instances fail silently, leaving developers unaware that their custom tooling has been stripped away (`#4378`).
* **Artifact Fragmentation:** Storing crucial AI-generated session outputs in global hidden paths (`~/.copilot/session-state/`) rather than the active workspace worktree forces developers to manually relocate deliverables (`#5384`).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest: 2026-11-09

### 1. Today's Highlights
The OpenCode community is currently focused on stabilizing V2 agent performance, with significant effort directed toward addressing session state management and subagent orchestration bugs. Parallel to these stability efforts, developers are actively expanding ecosystem support, including new E2EE model integration and enhanced telemetry for subscription-based token usage.

### 2. Releases
*No new releases in the last 24 hours.*

### 3. Hot Issues
*   **[#59387] Free Tier Issues (333 comments):** The primary hub for user reports regarding stuck usage limits. High community frustration indicates this remains the most critical barrier to entry for free-tier users.
*   **[#48826] V2 Subagent Background Work:** A critical bug where background shell tasks/subagents terminate early, causing data loss. [Issue #48826](https://github.com/anomalyco/opencode/issues/48826)
*   **[#62213] Policy Overrides:** Bug where built-in tester policies override agent-defined permissions due to "last-match-wins" logic. [Issue #62213](https://github.com/anomalyco/opencode/issues/62213)
*   **[#62214] Session Data Growth:** A major architectural concern regarding unbounded session database growth and lack of cleanup mechanisms. [Issue #62214](https://github.com/anomalyco/opencode/issues/62214)
*   **[#62619] Google Provider Silent Retries:** A bug causing infinite, silent retry loops during content-filter triggers, leading to wasted credits. [Issue #62619](https://github.com/anomalyco/opencode/issues/62619)
*   **[#62761] Auth State Staleness:** A critical issue where deleting credentials via API does not propagate to the server's running state until restart. [Issue #62761](https://github.com/anomalyco/opencode/issues/62761)
*   **[#62708] Provider Routing Collision:** Bug causing secondary OpenAI-compatible providers to incorrectly route requests to the first initialized provider's URL. [Issue #62708](https://github.com/anomalyco/opencode/issues/62708)
*   **[#62778] Automatic Compaction Failures:** Mid-turn compaction failures on local models (Ollama) cause the entire turn to abort. [Issue #62778](https://github.com/anomalyco/opencode/issues/62778)
*   **[#62556] Gemini CachedContent Conflict:** Technical limitation preventing `cachedContent` use alongside system instructions/tools in the Gemini API. [Issue #62556](https://github.com/anomalyco/opencode/issues/62556)
*   **[#62626] CLI Agent Frontmatter:** The CLI ignores `agent:` declarations in frontmatter, defaulting to the 'build' agent. [Issue #62626](https://github.com/anomalyco/opencode/issues/62626)

### 4. Key PR Progress
*   **[#62788] Token Usage Telemetry:** Reports subscription provider token usage to the OpenCode Console. [PR #62788](https://github.com/anomalyco/opencode/pull/62788)
*   **[#62786] Venice E2EE Models:** Adds support for encrypted model requests. [PR #62786](https://github.com/anomalyco/opencode/pull/62786)
*   **[#62791] Orphaned Session Cleanup:** Fixes terminalization for child sessions left hanging after server restarts. [PR #62791](https://github.com/anomalyco/opencode/pull/62791)
*   **[#62785] Nested Repo Snapshots:** Ensures snapshotting works correctly when a nested repository status fails. [PR #62785](https://github.com/anomalyco/opencode/pull/62785)
*   **[#62784] "Watches" Documentation:** Prep work for the upcoming "Watches" feature. [PR #62784](https://github.com/anomalyco/opencode/pull/62784)
*   **[#62790] Legal History Updates:** Documentation update regarding hosted agent retention. [PR #62790](https://github.com/anomalyco/opencode/pull/62790)
*   **[#54011] Local Model Persistence:** Ensures explicitly configured local models remain available without relying on discovery services. [PR #54011](https://github.com/anomalyco/opencode/pull/54011)
*   **[#53927] Prompt Cache Rules:** Enables top-level configuration for prompt caching. [PR #53927](https://github.com/anomalyco/opencode/pull/53927)
*   **[#53932] Symlink Config Reloads:** Allows config watches to track targets outside the base directory. [PR #53932](https://github.com/anomalyco/opencode/pull/53932)
*   **[#53913] ACP Command Streaming:** Ensures command executors maintain explicit cancellation and streaming support. [PR #53913](https://github.com/anomalyco/opencode/pull/53913)

### 5. Feature Request Trends
*   **UI/UX Refinement:** High interest in compacting the TUI composer (#52339) and better session tab organization/reordering (#62646).
*   **Configuration Flexibility:** Users want the ability to split monolithic config files (like `opencode.jsonc`) into multiple files for better management (#19353).
*   **Advanced Control:** Requests for per-agent tool visibility filtering to enhance security and scope (#24953).

### 6. Developer Pain Points
*   **System Stability:** Frustration with silent crashes and undefined object errors in the TUI.
*   **Provider Friction:** Unpredictable behavior with multi-provider setups (collision/routing issues) and strict safety filter retries that burn budget.
*   **Data Integrity:** Managing state between V1 and V2 migrations and handling "hanging" background agents in persistent sessions.

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