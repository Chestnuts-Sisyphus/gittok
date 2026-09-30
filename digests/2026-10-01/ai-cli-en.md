# AI CLI Tools Community Digest 2026-10-01

> Generated: 2026-09-30 23:19 UTC | Tools covered: 9

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

# AI CLI Tools Ecosystem Report: 2026-10-01

## 1. Ecosystem Overview
The AI CLI tooling landscape on October 1, 2026, is defined by a shift from feature expansion to **stability and ecosystem integration**. While several major tools (Claude Code, Codex, Pi, Qwen, DeepSeek) reported no detectable activity or failed summary generation, the available data from Gemini CLI, GitHub Copilot, and Open Code reveals a collective focus on hardening core agent resilience. Developers are grappling with emerging standards in security (MCP OAuth scoping, sandboxing), resource efficiency (AST-aware context management), and cross-platform compatibility (Wayland, macOS 27+, WSL2). The industry is rapidly maturing, moving away from "prompt-only" interactions toward robust, stateful, and programmable agent infrastructures.

## 2. Activity Comparison

*Note: Activity counts are derived from the provided digests. "N/A" indicates summary failure or no reported activity.*

| Tool | Hot Issues Reported | PRs Active/Merged | Release Status | Key Focus Area |
| :--- | :---: | :---: | :--- | :--- |
| **Gemini CLI** | 10 | 10 | `v0.64.0-nightly` | Core stability, Security, AST-optimization |
| **GitHub Copilot CLI** | 10 | 0* | `v1.0.91-0` | Platform stability, MCP Auth, UI/UX |
| **OpenCode** | 10 | 10 | `v1.18.34` | GUI Architecture, Billing/Quota, SDK |
| **Claude Code** | N/A | N/A | N/A | *Summary Generation Failed* |
| **OpenAI Codex** | N/A | N/A | N/A | *Summary Generation Failed* |
| **Pi** | N/A | N/A | N/A | *Summary Generation Failed* |
| **Qwen Code** | N/A | N/A | N/A | *Summary Generation Failed* |
| **DeepSeek TUI** | N/A | N/A | N/A | *Summary Generation Failed* |
| **Kimi Code** | 0 | 0 | None | No activity reported |

*\*Copilot CLI reported no merged/updated PRs in the last 24 hours, though releases are patch-oriented.*

## 3. Shared Feature Directions

Three critical themes appear across multiple active tool communities, indicating industry-wide consensus on next-gen requirements:

1.  **Security & Least Privilege (MCP & Sandboxing)**
    *   **Tools:** Gemini CLI, GitHub Copilot CLI, OpenCode.
    *   **Specifics:** There is a move away from blanket permissions (`/allow-all`) toward granular tool whitelisting (Copilot #1973), strict OAuth scope enforcement for MCP servers (Copilot #4935), and OS-level sandboxing for bash execution (Gemini #19873). OpenCode is actively patching shell redirection bypasses (#52083).
2.  **Context Efficiency & Token Optimization**
    *   **Tools:** Gemini CLI, OpenCode.
    *   **Specifics:** Gemini is exploring AST-aware file reads to reduce noise (#22745) and fixing binary asset bloat (#29457). OpenCode is filtering redundant `AGENTS.md` copies (#52382) and compaction logic (#52385). The focus is on maximizing effective token usage in large codebases.
3.  **State Persistence & Session Resilience**
    *   **Tools:** Gemini CLI, GitHub Copilot CLI, OpenCode.
    *   **Specifics:** All three are addressing bugs where session state is corrupted or lost upon interruption. This includes fixing orphaned tool_use events (Copilot #3366), preventing data loss on quick exits (Gemini #29584), and ensuring permission prompts remain answerable after resume (Copilot #1.0.90).

## 4. Differentiation Analysis

*   **GitHub Copilot CLI: Platform Integration & Enterprise Readiness**
    *   *Target User:* Enterprise developers within the GitHub ecosystem.
    *   *Approach:* Focuses heavily on **MCP integration stability**, OAuth scoping, and cross-platform compatibility (macOS/Windows/ARM64). It prioritizes "boring" reliability and granular permission controls over raw agentic experimentation.
*   **Gemini CLI: Agentic Depth & Code Understanding**
    *   *Target User:* Power users and architects working with complex, large-scale repositories.
    *   *Approach:* Differentiates through **technical depth**, introducing AST-aware navigation, autonomous plan execution, and sophisticated subagent management. It is tackling the "context window" problem via smarter indexing rather than just larger windows.
*   **OpenCode: Extensibility & GUI Hybridity**
    *   *Target User:* Developers seeking a customizable, desktop-native experience with SDK access.
    *   *Approach:* Unique in its push for an **"Extension-first" architecture** and GUI integration. It is tackling billing transparency and SDK capabilities (session compaction/removal) that CLI-first tools do not expose, appealing to users who build custom workflows on top of the tool.

## 5. Community Momentum & Maturity

*   **High Momentum/Active Iteration:**
    *   **Gemini CLI** and **OpenCode** are the most active, with balanced Issue and PR activity. Gemini is solving deep architectural problems (AST, Concurrency), signaling a tool moving from "beta" to "production-hardened." OpenCode is undergoing a significant architectural refactor (GUI/Extensions), indicating rapid evolution.
*   **Steady State/Patch-Heavy:**
    *   **GitHub Copilot CLI** shows high release frequency but lower PR volume in this snapshot. This suggests a mature codebase receiving rapid, targeted fixes for platform-specific regressions (macOS/Windows) and enterprise auth issues, rather than new feature development.
*   **Silent/High-Risk:**
    *   The failure to generate summaries for **Claude Code**, **OpenAI Codex**, **Pi**, **Qwen**, and **DeepSeek TUI** is a significant signal. This could indicate either a lack of public GitHub activity in the specific timeframe or—more likely given these are major products—that their development has moved to private channels or non-public repositories, distancing them from open-source community feedback loops compared to Gemini/Copilot/OpenCode.

## 6. Trend Signals

1.  **The "Context Tax" is Real:** Developers are frustrated by token waste. The industry is moving toward **semantic filtering** (AST-based, binary exclusion) rather than just truncation. Tools that can "understand" the code structure to minimize context bloat will have a competitive advantage.
2.  **MCP Standardization is Straining:** The Model Context Protocol (MCP) is becoming a major pain point. Issues around OAuth discovery, scope superset requests, and registry friction indicate that while MCP is the standard, its implementation in CLI tools is still immature and a primary source of user frustration.
3.  **Autonomy vs. Control Tension:** Users are rejecting "black box" autonomy. Features like subagent cancellation (OpenCode #36423), granular tool whitelisting (Copilot #1973), and visible subagent trajectories (Gemini #21968) show that developers demand **observability and kill switches** for agent actions, particularly in production environments.
4.  **Cross-Platform Native Code is Preferred:** While TUIs remain, there is a growing preference for native desktop/hybrid interfaces (OpenCode's GUI refactor) or highly polished terminals that handle state persistence across OS updates (Copilot's macOS device ID fix). Pure terminal strings are no longer sufficient for complex session management.

**Recommendation for Decision-Makers:**
Prioritize tools that demonstrate **transparent error handling** and **granular security controls**. If your workflow relies on MCP servers, **GitHub Copilot CLI** currently leads in mitigating auth friction, while **Gemini CLI** offers the best technical foundation for large, complex codebases due to its AST-aware context management. Avoid tools with opaque billing or unstable session persistence (noted in OpenCode and Copilot) for critical production pipelines until further patches are applied.

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

# Gemini CLI Community Digest — 2026-10-01

## 1. Today's Highlights
The Gemini CLI development cycle continues to focus on hardening core agent resilience, optimizing performance on large codebases, and tightening security bounds for workspace settings. Recent nightly releases and active pull requests introduce critical fixes for file operation race conditions, memory management in chat recording, and robust handling of untrusted workspaces.

---

## 2. Releases
### `v0.64.0-nightly.20260930.g38700b4b3`
- **What's Changed:**
  - Enabled autonomous plan execution in non-interactive mode (`fix(core): enable autonomous plan execution in non-interactive mode` via PR [#29539](https://github.com/google-gemini/gemini-cli/pull/29539)).
  - Disabled truncation behavior when `maxChars <= 0` in `formatTruncatedToolOutput` (`fix(core): disable truncation when maxChars <= 0` via [@diegogodinezr](https://github.com/google-gemini/gemini-cli)).

---

## 3. Hot Issues

1. **[#22323 - Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**
   - *Why it matters:* Subagents hitting turn limits falsely report success, masking failures during deep codebase investigations.
   - *Community reaction:* Highly tracked by maintainers (Priority P1) with 13 comments and 2 thumbs-up.

2. **[#19873 - Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**
   - *Why it matters:* Proposes optimizing execution by letting Gemini natively chain POSIX tools (`grep`, `sed`, `awk`) safely via sandboxing.
   - *Community reaction:* Large-effort architecture enhancement gaining traction (9 comments, 1 👍).

3. **[#21409 - Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**
   - *Why it matters:* Users experience indefinite hangs (up to an hour) when deferring tasks to the generalist agent for basic operations like folder creation.
   - *Community reaction:* Highly disruptive bug with 8 comments and 8 thumbs-up from frustrated users.

4. **[#22745 - Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**
   - *Why it matters:* Epic exploring how AST-aware tools can reduce token noise and bound method reads precisely.
   - *Community reaction:* Core initiative for improving agent context quality (7 comments).

5. **[#21968 - Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**
   - *Why it matters:* Anecdotal feedback indicates Gemini rarely invokes custom skills (e.g., git, gradle) autonomously without explicit user prompts.
   - *Community reaction:* Active discussion (6 comments) on agent autonomy and tool discovery.

6. **[#22267 - Browser Agent ignores settings.json overrides (e.g., maxTurns)](https://github.com/google-gemini/gemini-cli/issues/22267)**
   - *Why it matters:* Configuration options defined globally or locally are bypassed by the Browser Agent's internal initialization logic.
   - *Community reaction:* Impacts custom automation workflows.

7. **[#21983 - Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**
   - *Why it matters:* Linux desktop users on Wayland protocols hit immediate crashes when launching browser-based subagents.
   - *Community reaction:* Critical environment compatibility bug.

8. **[#24246 - Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**
   - *Why it matters:* Surpassing tool limits causes LLM API BadRequest (400) errors, requiring smarter tool scope filtering.
   - *Community reaction:* Scalability blocker for feature-rich environments.

9. **[#23571 - Model frequently creates tmp scripts in random spots](https://github.com/google-gemini/gemini-cli/issues/23571)**
   - *Why it matters:* Restricting shell execution forces the model to litter multiple directories with temporary scripts, complicating clean commits.
   - *Community reaction:* Workspace hygiene complaint from developer workflows.

10. **[#22186 - get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**
    - *Why it matters:* Long-running workflows crash right at the summary generation step when printing final feedback hooks.
    - *Community reaction:* P1 high-priority bug causing unexpected session termination.

---

## 4. Key PR Progress

1. **[#29583 - fix(cli): enforce read-only workspace settings in untrusted folders](https://github.com/google-gemini/gemini-cli/pull/29583)**
   - Enforces strict read-only security boundaries on workspace configurations inside unverified directories during configuration commands.

2. **[#29520 - fix(cli): preserve scroll position and partition pending height budget](https://github.com/google-gemini/gemini-cli/pull/29520)**
   - Stabilizes the terminal viewport during active stream streaming and prompt confirmations, preventing unwanted auto-scroll jumps.

3. **[#29532 - fix(core): honor a RetryInfo delay of zero when classifying quota errors](https://github.com/google-gemini/gemini-cli/pull/29532)**
   - Fixes a bug where server-supplied zero-delay `RetryInfo` headers were misclassified as terminal quota errors instead of triggering immediate retries.

4. **[#29580 - fix(acp): resolve session by exact id and handle listener cleanup on session failure](https://github.com/google-gemini/gemini-cli/pull/29580)**
   - Resolves ACP `session/load` failures when resuming fresh sessions without prior conversation history.

5. **[#29584 - fix(core): prevent deletion of resumed session history on quick exit](https://github.com/google-gemini/gemini-cli/pull/29584)**
   - Fixes data loss where exiting a resumed session quickly (`Ctrl+C`) before sending a prompt wiped the existing session file from disk.

6. **[#29568 - fix(core): implement append-only delta patching and bounded history windowing in ChatRecordingService](https://github.com/google-gemini/gemini-cli/pull/29568)**
   - Replaces costly full-history rewriting with incremental append-only patching to scale chat logs efficiently.

7. **[#29582 - perf(core): optimize ignore filtering and enable subtree pruning](https://github.com/google-gemini/gemini-cli/pull/29582)**
   - Introduces hierarchical state memoization and directory-level pruning to resolve multi-second blocking delays on large codebases.

8. **[#29499 - fix(core): serialize file tool operations and make writes atomic](https://github.com/google-gemini/gemini-cli/pull/29499)**
   - Eliminates read-modify-write race conditions when multiple sub-agents execute concurrent edits against identical file paths.

9. **[#29557 - fix(cli): prevent CPU hang and quote swallowing on @ within code](https://github.com/google-gemini/gemini-cli/pull/29557)**
   - Fixes an uninterruptible 100% CPU lockup occurring in headless piped input modes when handling scoped package names (`@scope/pkg`).

10. **[#29457 - fix(core): replace fuzzy requestedExplicitly logic with glob matching in read-many-files](https://github.com/google-gemini/gemini-cli/pull/29457)**
    - Fixes a severe context-bloat bug where binary assets (images, PDFs) were incorrectly swept into context via fuzzy extension matching.

---

## 5. Feature Request Trends
- **AST-Aware Code Understanding:** High demand for AST-aware file navigation, grep searches, and precise method boundary reads (via tools like `tilth`, `glyph`, or `ast-grep`) to drop token consumption.
- **Persistent Task Tracking:** Moving away from in-context volatile LLM todo tracking toward durable file-based task management (`.gemini/tasks` or similar schemas).
- **Subagent Observability & Sharing:** Requests to expose subagent trajectories in `/chat share` dumps and include subagent internal steps within bug report logs (`/bug`).
- **Workspace Security & Isolation:** Better handling of workspace trust levels, policy scoping, and avoiding destructive overwrite operations in untrusted environments.

---

## 6. Developer Pain Points
- **Context Bloat & Token Inefficiencies:** Unfiltered file reads, binary asset inclusion, and excessive baseline tokens per turn remain common friction points.
- **Concurrency & File Locks:** Windows `EBUSY` extension update lock failures and parallel subagent race conditions causing lost updates.
- **CLI Terminal Stability:** Terminal resizing flicker, scroll jumps during streaming outputs, and narrow-width ghost text wrapping issues affecting interactive usage.
- **Subagent Reliability:** Hanging states during delegation to generalist agents, silent failures on turn limits, and configuration overrides being dropped by specialized agents.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-01

## 1. Today's Highlights
Recent development on the GitHub Copilot CLI centers around rapid 1.0.9x patch releases addressing critical platform stability issues, such as macOS reboot disk-ID writer-lock bugs and Windows sandbox network paths. Concurrently, the community is heavily focusing on Model Context Protocol (MCP) integrations, security authentication scoping, and terminal rendering enhancements for long-running sessions.

---

## 2. Releases
* **v1.0.91-0** ([github/copilot-cli](https://github.com/github/copilot-cli))
  * **Improved:** Complete, statically analyzable read-only shell pipelines can now enter execution-evidence review, while incomplete or unbound pipelines require explicit approval.
  * **Fixed:** Offered sandbox network bypass for Node/npm `EACCES` socket denials on Windows.
* **v1.0.90** ([github/copilot-cli](https://github.com/github/copilot-cli))
  * **Added:** Support for GPT-6.1 Sol in model selection; `--mcp-github-auth` flag to scope GitHub account auth to approved MCP server origins; session-scoped read-only directory approvals.
  * **Fixed:** Permission prompts remain answerable after resuming interrupted sessions.
* **v1.0.90-6** ([github/copilot-cli](https://github.com/github/copilot-cli))
  * **Added:** GPT-6.1 Sol support.
  * **Improved:** Click anywhere on expanded tool calls in the compact timeline to collapse them; voice mode hints when inactive or getting ready.

---

## 3. Hot Issues
1. **[#1274 - CLI constantly getting 400 errors for invalid request body](https://github.com/github/copilot-cli/issues/1274)**
   * *Why it matters:* 95% of code review prompts fail with HTTP 400 errors, rendering diff reviews unusable for many.
   * *Community reaction:* High engagement (32 comments, 13 thumbs up) pointing to potential server-side validation mismatches.
2. **[#1973 - Feature Request: Tool whitelist for Interactive Mode](https://github.com/github/copilot-cli/issues/1973)**
   * *Why it matters:* Users are forced to choose between manually approving safe read-only operations (grep, cat, git status) or using `/allow-all`, which exposes destructive actions.
   * *Community reaction:* Very popular request (29 thumbs up, 16 comments) highlighting developer friction in interactive workflows.
3. **[#2205 - Usability issue - scroll in terminal (Terminator)](https://github.com/github/copilot-cli/issues/2205)**
   * *Why it matters:* Mouse scroll behavior changed to cycle through input history rather than agent generation history, breaking navigation.
   * *Community reaction:* Frustrated terminal users looking for better scroll-back separation.
4. **[#4998 - Copilot CLI unusable after macOS update/reboot because `.mcp-writer.binding` persists stale filesystem device ID](https://github.com/github/copilot-cli/issues/4998)**
   * *Why it matters:* System updates change filesystem device identifiers, completely locking out CLI startup and sessions due to writer-lock mismatches.
   * *Community reaction:* Critical post-reboot failure mode affecting macOS users.
5. **[#3282 - Add multiple BYOK model capability in copilot CLI](https://github.com/github/copilot-cli/issues/3282)**
   * *Why it matters:* Developers are restricted to a single Bring-Your-Own-Key model via environment variables without session-level switching.
   * *Community reaction:* Strongly desired feature (31 thumbs up) for multi-model workflows.
6. **[#4438 - `disable-model-invocation: true` makes a skill unreachable](https://github.com/github/copilot-cli/issues/4438)**
   * *Why it matters:* Explicit user invocations fail with "Skill not found" when model auto-invocation is disabled.
   * *Community reaction:* Blocks fine-grained control over project-level skills.
7. **[#3534 - `/copy` fails on WSL2 (ARM64): `clip.exe` exit code 1 due to `cmd.exe` quoting](https://github.com/github/copilot-cli/issues/3534)**
   * *Why it matters:* Clipboard operations fail entirely for Windows Subsystem for Linux ARM64 environments.
   * *Community reaction:* Persistent cross-platform ecosystem friction for ARM64 developers.
8. **[#4662 - AgentHost MCP client fails OAuth metadata discovery for authorization-server issuer URLs with a path component](https://github.com/github/copilot-cli/issues/4662)**
   * *Why it matters:* Authentication fails for OAuth-protected MCP servers hosted on subpaths (e.g., `example.com/oauth`).
   * *Community reaction:* Blocks enterprise integrations utilizing path-scoped identity providers.
9. **[#4935 - Built-in Slack MCP integration requests full scope superset even when only read tools are exposed](https://github.com/github/copilot-cli/issues/4935)**
   * *Why it matters:* Overly broad OAuth scope requests violate the principle of least privilege for workplace integrations.
   * *Community reaction:* Security-conscious users hesitant to authorize full write access for read-only use cases.
10. **[#3366 - Orphan `tool_use` in `events.jsonl` wedges sessions permanently](https://github.com/github/copilot-cli/issues/3366)**
    * *Why it matters:* Missing tool completion events corrupt session history files, permanently preventing resumption.
    * *Community reaction:* Data loss / session corruption issue causing lost context.

---

## 4. Key PR Progress
*(Note: No pull requests were updated or merged in the last 24 hours according to current GitHub data.)*

---

## 5. Feature Request Trends
* **Granular Tool Security & Whitelisting:** Users are asking for ways to trust specific read-only tools without granting blanket execution permissions (`/allow-all`).
* **Multi-Model Bring-Your-Own-Key (BYOK):** Strong demand for runtime model switching instead of static environment variable restrictions.
* **Unified Workspace Rules:** Expanding context configuration to seamlessly ingest rules from alternative tooling ecosystem formats (e.g., `.claude/rules`).
* **Advanced Session Navigation:** Vim-style pagers and keyboard-accessible scroll-back modes for extensive agent execution histories.

---

## 6. Developer Pain Points
* **Post-Reboot / State Lock Failures:** Transient environment changes (like macOS storage device ID shifts after updates) leave the CLI completely bricked until internal lock files are manually cleared.
* **MCP Registry & OAuth Friction:** Difficulties connecting remote or custom MCP registries, alongside rigid OAuth discovery and over-scoped permissions (e.g., Slack integration).
* **Terminal UI Scroll Instability:** Breakages in mouse wheel behavior and automatic scroll jumps when resuming long-lived chat histories.
* **API 400 Bad Requests:** Intermittent request body validation failures during heavy diff parsing and code review tasks.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode Community Digest: 2026-10-01

### 1. Today's Highlights
OpenCode v1.18.34 has been released, focusing on critical macOS binary signing and improved session identity header management. Meanwhile, the core team is heavily refactoring the GUI architecture to use a "built-in extensions" model, aiming to decouple high-level features from the session lifecycle.

### 2. Releases
*   **v1.18.34**: Addresses critical macOS compatibility by re-signing binaries with a Developer ID to ensure compliance with macOS 27+ security policies. Also fixes a namespaced session header bug for model requests.

### 3. Hot Issues
*   [#27786](https://github.com/anomalyco/opencode/issues/27786): **XDG Spec Violation**: Community frustration over `node_modules` cluttering `~/.config`. Requires migration to `~/.local/share`.
*   [#49389](https://github.com/anomalyco/opencode/issues/49389): **Capability Gaps**: A push to bridge the gap between core session capabilities and what plugin developers can access.
*   [#36423](https://github.com/anomalyco/opencode/issues/36423): **Subagent Control**: The missing ability to cancel background subagents in v2 is a major pain point for workflow automation.
*   [#41391](https://github.com/anomalyco/opencode/issues/41391): **Quota Confusion**: Discrepancies between usage history and Go plan accounting are causing trust issues with paid credits.
*   [#52341](https://github.com/anomalyco/opencode/issues/52341): **Endpoint Instability**: Reports that the LongCat 2.5 Preview Free endpoint is returning "dead ends" without feedback.
*   [#52367](https://github.com/anomalyco/opencode/issues/52367): **Ghost Usage**: Users reporting charges for models they never explicitly invoked, suggesting potential routing or UI display bugs.
*   [#52083](https://github.com/anomalyco/opencode/issues/52083): **Security/Permissions**: Complex shell command redirection can bypass permission prompts—a critical security oversight.
*   [#52363](https://github.com/anomalyco/opencode/issues/52363): **OAuth/Provider Failure**: Despite successful login, providers are failing to register, leaving models unselectable.
*   [#50434](https://github.com/anomalyco/opencode/issues/50434): **Plugin Resolution**: Breaking changes in v2.0.12 regarding `@opencode/plugin` imports have crippled local plugin development.
*   [#52372](https://github.com/anomalyco/opencode/issues/52372): **Retry Loops**: Agents entering infinite retry loops when encountering non-rendering files, wasting precious token budgets.

### 4. Key PR Progress
*   [#52369](https://github.com/anomalyco/opencode/pull/52369): **GUI Refactor**: Moves app-level features into built-in extensions; major architectural shift for extensibility.
*   [#52387](https://github.com/anomalyco/opencode/pull/52387): **Expose Session Removal**: Exposes `session.remove` to the SDK, addressing a key request from [#49389](https://github.com/anomalyco/opencode/issues/49389).
*   [#52385](https://github.com/anomalyco/opencode/pull/52385): **Expose Session Compaction**: Provides plugin access to `session.compact`, increasing control over long-running context.
*   [#52386](https://github.com/anomalyco/opencode/pull/52386): **Process Safety**: Rollback logic for shell acquisition if interrupted, preventing orphan process accumulation.
*   [#52382](https://github.com/anomalyco/opencode/pull/52382): **Context Optimization**: Filters out automatic copying of `AGENTS.md` during file reads to avoid redundant context bloat.
*   [#52391](https://github.com/anomalyco/opencode/pull/52391): **Tool Schema Fixes**: Better handling of JSON-serialized parameter references for Nemotron/Qwen models.
*   [#52384](https://github.com/anomalyco/opencode/pull/52384): **Share API Fix**: Corrects session share links that were 404'ing due to improper URL construction.
*   [#52388](https://github.com/anomalyco/opencode/pull/52388): **Capability Future-Proofing**: Makes model capability defaults (like streaming/effort) forward-compatible with newer model versions.
*   [#52135](https://github.com/anomalyco/opencode/pull/52135): **Error Handling**: Stops infinite retries on specific Z.ai model rejection events.
*   [#52389](https://github.com/anomalyco/opencode/pull/52389): **UI Polish**: Standardizes bold markdown weight to 700 for better readability across the desktop interface.

### 5. Feature Request Trends
*   **Granular Control**: Users want more programmatic control over sessions (compaction, removal, cancellation).
*   **Desktop UX parity**: Consistent slash commands and file management across all versions.
*   **Extensibility**: The movement toward an "Extension-first" architecture is gaining momentum as the primary way to satisfy plugin-author requirements.

### 6. Developer Pain Points
*   **Quota/Billing Opacity**: High-frequency complaints about "missing" funds or confusing quota percentages indicate a need for more transparent usage logging.
*   **Shell/Tool Instability**: Bugs related to redirection, subagent loops, and process termination are causing significant disruption to autonomous workflows.
*   **Plugin Ecosystem Volatility**: Frequent breaking changes in import paths and registration registry logic are frustrating developers building on top of the OpenCode SDK.

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