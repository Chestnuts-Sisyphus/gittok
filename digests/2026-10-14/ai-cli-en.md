# AI CLI Tools Community Digest 2026-10-14

> Generated: 2026-10-13 23:31 UTC | Tools covered: 9

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

# AI CLI Tools Ecosystem: Cross-Tool Comparison Report
**Date:** 2026-10-14

---

## 1. Ecosystem Overview
The AI CLI developer tools ecosystem is experiencing a high-velocity architectural transition, marked by major version overhauls (e.g., OpenCode V2, Gemini CLI A2A V2) and deep ecosystem integrations. While foundational tools like GitHub Copilot CLI, Gemini CLI, and OpenCode remain actively maintained, the landscape is heavily fragmented by platform-specific regressions—particularly on Windows and Linux terminal multiplexers. Developer sentiment underscores a collective pivot away from raw, token-wasteful text manipulation toward structured subagent orchestration, persistent state management, and flexible Bring-Your-Own-Key (BYOK) architectures.

---

## 2. Activity Comparison

| Tool Name | Issue Volume / Key Focus | PR / Release Status | Activity Level |
| :--- | :--- | :--- | :--- |
| **Gemini CLI** | High volume of subagent state bugs, tool thresholds (>128 tools), and OS-specific shell parsing. | Active releases (`v0.65.0-preview.0`, nightly builds); 10+ major PRs merged. | **Very High** |
| **GitHub Copilot CLI** | Focus on BYOK reasoning model limits, ACP protocol bugs, and auth/proxy robustness. | Active hotfix patches (`v1.0.98-0`, `v1.0.97`); 0 PRs logged (focus on triage/patches). | **High** |
| **OpenCode** | Stabilization of V2 architecture; heavy Windows TUI/terminal and environment inheritance regressions. | No new releases; 10+ critical PRs addressing V2 migration and subagent inheritance. | **High** |
| **Claude Code** | *Telemetry unavailable* | *Summary generation failed* | *Unknown* |
| **OpenAI Codex** | *Telemetry unavailable* | *Summary generation failed* | *Unknown* |
| **Kimi Code CLI** | *No activity recorded* | No activity in the last 24 hours. | **Dormant / Low** |
| **Pi / Qwen Code / DeepSeek** | *Telemetry unavailable* | *Summary generation failed* | *Unknown* |

---

## 3. Shared Feature Directions
- **Persistent Task Management:** Both Gemini CLI (moving away from conversational `WriteToDo` toward file-backed tracking) and OpenCode (addressing missing V1 native TODO tools in V2) are abandoning ephemeral in-context todo items in favor of robust, persistent task tracking.
- **BYOK and Model Customization:** GitHub Copilot CLI developers are strongly pushing for dynamic `/models` endpoint discovery and the removal of hardcoded sampling limits (`temperature=0`) that degrade reasoning models—reflecting broader developer desires for engine neutrality.
- **Subagent State & Environment Inheritance:** Both Gemini CLI and OpenCode face critical pain points regarding child session execution, subagent environment variable propagation, and accurate goal-success termination reporting.

---

## 4. Differentiation Analysis
- **Gemini CLI:** Targets Google ecosystem expansion (preparing for `gemini-4-argon`), containerized environments (rootless Podman support), and multi-agent coordination. Its technical approach emphasizes deep scheduler refactoring and terminal multiplexer (`tmux`) UI synchronization.
- **GitHub Copilot CLI:** Geared toward enterprise workflows and GitHub integrations (SCP-style git parsing, custom agent-scoped declarative hooks). Its technical approach centers on proxy robustness, authentication retries, and ACP (Agent Client Protocol) compatibility.
- **OpenCode:** Focuses on a decoupled server/TUI/desktop architecture (OpenCode V2). Its technical approach prioritizes cross-platform UI flexibility (GUI plugins alongside TUI) and robust configuration migration paths from legacy systems.

---

## 5. Community Momentum & Maturity
- **Most Active / Rapidly Iterating:** **Gemini CLI** and **OpenCode** demonstrate the highest velocity. Gemini CLI is pushing deep architectural changes (A2A migration, model prep, scheduler cleanups), while OpenCode is rapidly addressing a massive backlog of V2 migration and Windows TUI stabilization patches.
- **Enterprise / Production Stabilizing:** **GitHub Copilot CLI** shows the characteristics of a mature enterprise product, prioritizing rapid hotfix patching (`v1.0.97` to `v1.0.98-0`) and network hardening over experimental feature pushes.
- **Dormant / Low Activity:** **Kimi Code CLI** registered zero activity for the reporting period, while several other community tools (Claude Code, Codex, Pi, Qwen Code, DeepSeek TUI) suffered telemetry outages.

---

## 6. Trend Signals
- **The Windows Shell & TUI Trap:** Cross-platform development continues to plague CLI maintainers. Raw terminal mode leaks, incorrect PowerShell substitution guards, and missing PTY paths (`opencode-pty`) indicate that terminal-based AI tools still struggle with OS-level edge cases.
- **Context Rot & Token Conservation:** The push for AST-aware file navigation (replacing blind text reads) and persistent file-based task tracking signals that context window optimization has graduated from a nice-to-have optimization to a core architectural requirement.
- **The Rise of ACP (Agent Client Protocol):** Both Gemini and Copilot ecosystems are encountering protocol-level frictions (e.g., session renaming, co-author trailer handling), signaling that standardized agent-to-client communication layers are maturing but still volatile in production.

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

# Gemini CLI Community Digest — 2026-10-14

## 1. Today's Highlights
Recent development on the Gemini CLI centers heavily on UI rendering stability across terminal multiplexers, expanding sandbox capability (such as rootless Podman support), and foundational preparation for the newly introduced `gemini-4-argon` model. Simultaneously, ongoing community scrutiny highlights critical pain points around subagent reliability, strict token-frugal mechanics, and Windows-specific shell parsing bugs.

---

## 2. Releases
- **[v0.65.0-preview.0](https://github.com/google-gemini/gemini-cli/releases)**
  - Enforces read-only workspace settings when operating inside untrusted folders.
  - Fixes duplicate tool response turns when resuming previous sessions.
- **[v0.65.0-nightly.20261013.g51617c1bc](https://github.com/google-gemini/gemini-cli/releases)**
  - Ensures extension loading continues robustly even if a single extension fails its allowlist check.
- **[v0.64.0](https://github.com/google-gemini/gemini-cli/releases)**
  - Implements A2A-server V1 to V2 settings migration logic and bridges `PromptResponse.usage` for ACP to emit `usage_update` notifications.

---

## 3. Hot Issues
1. **[Subagent recovery after MAX_TURNS is reported as GOAL success (#22323)](https://github.com/google-gemini/gemini-cli/issue/22323)**
   - *Why it matters:* Subagents hit their maximum turn limits during deep codebase investigations yet incorrectly report `status: "success"` with a `"GOAL"` termination reason, masking incomplete analysis.
   - *Community reaction:* Highly tracked bug with 13 comments and active maintainer rollup labels.
2. **[Generalist agent hangs (#21409)](https://github.com/google-gemini/gemini-cli/issue/21409)**
   - *Why it matters:* Whenever the CLI defers tasks (such as simple folder creation) to the generalist agent, it can hang indefinitely, requiring manual cancellation.
   - *Community reaction:* Frustrated developer feedback with 8 upvotes and 8 comments; explicitly traced back to subagent delegation triggers.
3. **[Gemini CLI encounters 400 error with > 128 tools (#24246)](https://github.com/google-gemini/gemini-cli/issue/24246)**
   - *Why it matters:* Loading complex plugin ecosystems results in surpassing tool threshold boundaries, returning API 400 errors.
   - *Community reaction:* Points to a critical architectural need for dynamic scope-limiting of available toolsets.
4. **[browser subagent fails in wayland (#21983)](https://github.com/google-gemini/gemini-cli/issue/21983)**
   - *Why it matters:* Linux Wayland display server environments cause the browser automation subagent to fail upon initialization.
   - *Community reaction:* Highlights Linux desktop environment compatibility hurdles for browser workflows.
5. **[Model frequently creates tmp scripts in random spots (#23571)](https://github.com/google-gemini/gemini-cli/issue/23571)**
   - *Why it matters:* When restricted from direct shell execution, models generate ephemeral script files scattered across arbitrary subdirectories, creating git workspace pollution.
   - *Community reaction:* Focuses on clean workspace hygiene during iterative agent edits.
6. **[bug(windows): detectPowerShellSubstitution false positives (#29738)](https://github.com/google-gemini/gemini-cli/issue/29738)**
   - *Why it matters:* Hardcoded PowerShell substitution detection blocks common git commands (`git log`, `git diff`) on Windows machines.
   - *Community reaction:* Urgent cross-platform friction reported immediately following v0.63.0.
7. **[Agent should stop/discourage destructive behavior (#22672)](https://github.com/google-gemini/gemini-cli/issue/22672)**
   - *Why it matters:* The model occasionally employs destructive Git commands (`git reset`, `--force`) or risky database updates when safer workflows exist.
   - *Community reaction:* Core safety concern around automated command-line execution parameters.
8. **[Gemini does not use skills and sub-agents enough (#21968)](https://github.com/google-gemini/gemini-cli/issue/21968)**
   - *Why it matters:* Custom user-defined skills (like `gradle` or `git`) are frequently ignored by Gemini unless explicitly prompted.
   - *Community reaction:* Indicates contextual routing prompt engineering gaps.
9. **[Replace WriteToDo with Persistent File-Based Task Tracking (#18836)](https://github.com/google-gemini/gemini-cli/issue/18836)**
   - *Why it matters:* In-context todo management suffers from context rot, inflated token counts, and complete memory loss across sessions.
   - *Community reaction:* Strong architectural backing for persistent CRUD-based task tracking.
10. **[Feat: Subagent trajectory should be visible via `/chat share` (#22598)](https://github.com/google-gemini/gemini-cli/issue/22598)**
    - *Why it matters:* Subagent execution steps are captured internally but remain unexposed when exporting or sharing session trajectories.
    - *Community reaction:* Essential for evaluating and debugging complex multi-agent workflows.

---

## 4. Key PR Progress
1. **[feat(models): add Gemini 4 Argon model support (#29737)](https://github.com/google-gemini/gemini-cli/pull/29737)**
   - Registers `gemini-4-argon` natively into `VALID_GEMINI_MODELS` and provides appropriate configuration presets.
2. **[fix(cli): prevent session poisoning on rapid Ctrl-C interruption (#29728)](https://github.com/google-gemini/gemini-cli/pull/29728)**
   - Fixes a race condition where double-pressing `Ctrl+C` during tool execution prematurely invoked `/quit` and corrupted the active session state.
3. **[fix(ui): implement synchronized output and isolate spinner rendering (#29725)](https://github.com/google-gemini/gemini-cli/pull/29725)**
   - Adopts terminal synchronized output streams and isolates spinner states to eliminate visual flickering in terminal multiplexers like `tmux`.
4. **[fix(cli): use --userns=keep-id for rootless podman sandboxes (#29718)](https://github.com/google-gemini/gemini-cli/pull/29718)**
   - Resolves `EACCES` permission errors for rootless Podman users by correctly mapping container user namespaces.
5. **[fix(security): prevent command-line option injection in grep (#29536)](https://github.com/google-gemini/gemini-cli/pull/29536)**
   - Hardens local grep execution against argument/option injection by enforcing strict `-e` parameter separation.
6. **[refactor(core,cli): emit tool call groups from scheduler and drop UI lookahead (#29736)](https://github.com/google-gemini/gemini-cli/pull/29736)**
   - Cleans up streaming architecture by shifting subagent and tool-group aggregation responsibilities away from view layers down to the scheduler.
7. **[fix(cli): load environment variables before resolving settings placeholders (#29678)](https://github.com/google-gemini/gemini-cli/pull/29678)**
   - Fixes a load-order bug where configuration placeholder expansions evaluated prior to `.env` files being properly loaded into `process.env`.
8. **[fix(core): treat whitespace-only UTF-16 and UTF-32 files as empty (#29722)](https://github.com/google-gemini/gemini-cli/pull/29722)**
   - Corrects `isEmpty()` logic when evaluating non-UTF-8 files, preventing decoding glitches that left trailing NUL characters.
9. **[fix(cli): correct reverse search highlight index for expanding unicode characters (#29699)](https://github.com/google-gemini/gemini-cli/pull/29699)**
   - Fixes off-by-one UTF-16 substring offset bugs in `Ctrl+R` history search when inputs contain expanding unicode characters (like `İ`).
10. **[fix(cli): handle response and write stream errors in extension downloadFile (#29735)](https://github.com/google-gemini/gemini-cli/pull/29735)**
    - Prevents unhandled stream rejections during extension downloads by cleanly tearing down HTTP responses and write streams on failure.

---

## 5. Feature Request Trends
- **AST-Aware Code Exploration:** Growing developer pressure to shift from raw string reads to AST-aware file navigation (`tilth`, `glyph`, or `ast-grep`) to optimize token consumption and reduce tool turns.
- **Persistent Task Management:** Moving away from conversational context task trackers (`WriteToDo`) toward robust, persistent file-backed CRUD task management.
- **Enhanced Subagent Visibility & Observability:** Demands for unified bug reports, session sharing integrations, and explicit telemetry tracing for inner subagent trajectories.

---

## 6. Developer Pain Points
- **Cross-Platform Shell Friction:** Regular regressions involving PowerShell substitution guards blocking standard Git commands on Windows, alongside Wayland-specific sandbox failures for browser agents.
- **Terminal Rendering Artifacts:** Persistent challenges around multiplexer (`tmux`) flickering, side-border text overflow on scrollable components, and terminal resize stability.
- **Token Inflation & Tool Limiting:** Bloated context consumption caused by firehose file reads and API 400 rejections when active tooling registers exceed 128 elements.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-14

## 1. Today's Highlights
Recent development on the GitHub Copilot CLI centers on rapid patch releases (`v1.0.97` through `v1.0.98-0`) addressing critical robustness items, including TLS-intercepting proxy edge cases and robust remote plugin marketplace authentication retries. Meanwhile, community discussions highlight friction around Bring Your Own Key (BYOK) provider strict sampling defaults, ACP mode protocol bugs, and enterprise deployment constraints on Windows.

---

## 2. Releases
* **[v1.0.98-0](https://github.com/github/copilot-cli/releases/tag/v1.0.98-0)** / **[v1.0.97](https://github.com/github/copilot-cli/releases/tag/v1.0.97)** / **[v1.0.97-3](https://github.com/github/copilot-cli/releases/tag/v1.0.97-3)** / **[v1.0.97-2](https://github.com/github/copilot-cli/releases/tag/v1.0.97-2)**
  * **Custom Agents & Hooks:** Added agent-scoped declarative hooks for custom agents and fixed deep repository nesting/scaling limits (>100 agents) for discovery.
  * **Authentication & Networking:** Remote plugin marketplace and plugin fetches now automatically retry once using the signed-in GitHub token upon initial HTTPS auth failure. Streamed responses behind TLS-intercepting proxies now safely complete when `close_notify` is missing.
  * **Git Parsing:** Fixed parsing bugs concerning GitHub SCP-style remotes with absolute paths to correctly resolve repository owners and names.

---

## 3. Hot Issues
1. **[#5115 - ACP: /rename reports success but doesn't rename the session](https://github.com/github/copilot-cli/issues/5115)**
   * *Why it matters:* Breaks programmatic session management workflows relying on ACP (`--acp --stdio`) mode.
2. **[#4950 - BYOK custom providers: CLI forces greedy sampling (temperature=0) causing reasoning-model degeneration](https://github.com/github/copilot-cli/issues/4950)**
   * *Why it matters:* Renders thinking models (e.g., Qwen served via vLLM) unusable by forcing hardcoded zero temperature and sampling constraints.
3. **[#4082 - Cross-app session sync between Copilot CLI and Copilot Desktop App](https://github.com/github/copilot-cli/issues/4082)**
   * *Why it matters:* Highly upvoted (+13 👍) feature request addressing fragmented user experience between CLI and desktop environments.
4. **[#5133 - includeCoAuthoredBy: false is ignored in ACP mode](https://github.com/github/copilot-cli/issues/5133)**
   * *Why it matters:* Forces unwanted commit trailers contrary to explicit user configuration when operating via ACP.
5. **[#4358 - BYOK: populate the /model picker from the provider's /models endpoint](https://github.com/github/copilot-cli/issues/4358)**
   * *Why it matters:* Severely limits custom provider usability by locking developers into a single manually configured model name.
6. **[#5127 - SDK with BYOK providers: short model names aren't matched to custom agents](https://github.com/github/copilot-cli/issues/5127)**
   * *Why it matters:* Causes custom agents and shorthand provider references to fail silently or throw misleading OAuth errors.
7. **[#5126 - BYOK: built-in agents (explore, task, research) never use default models and silently run on session model](https://github.com/github/copilot-cli/issues/5126)**
   * *Why it matters:* Degrades specialized agent reasoning performance when operating under custom model configurations.
8. **[#5124 - --agent <name> selection is dropped ~1s after startup due to race condition](https://github.com/github/copilot-cli/issues/5124)**
   * *Why it matters:* Prevents reliable invocation of custom agents from the command line due to MCP initialization race conditions.
9. **[#5122 - userPromptSubmitted: only the last plugin's additionalContext reaches the model](https://github.com/github/copilot-cli/issues/5122)**
   * *Why it matters:* Silently drops context injection from multiple active plugins, undermining ecosystem plugin composition.
10. **[#5120 - Terminal left with mouse-tracking/focus-reporting enabled after CLI crashes](https://github.com/github/copilot-cli/issues/5120)**
    * *Why it matters:* Leaves parent shells flooded with raw terminal escape sequences and unusable if the CLI exits abruptly.

---

## 4. Key PR Progress
* *No open or updated pull requests were reported in the telemetry window for the last 24 hours.* Engineering focus appears centered entirely on hotfix releases and triage backlogs.

---

## 5. Feature Request Trends
* **Flexible Bring-Your-Own-Key (BYOK) Integration:** Strong demand for dynamic model discovery via standard `/models` endpoints, support for shorthand model identifiers, and removal of hardcoded sampling limits (`temperature=0`) that break reasoning models.
* **Ecosystem & Interoperability:** Cross-application session synchronization between the CLI and Copilot Desktop app, alongside robust multi-plugin context aggregation.
* **Enterprise Deployment:** Enterprise-grade Windows installers capable of system-wide deployment rather than writing to user profile paths blocked by corporate security rules.
* **Enhanced Observability:** Built-in tracking for prompt execution times and response processing durations to monitor AI performance.

---

## 6. Developer Pain Points
* **ACP Protocol Discrepancies:** Inconsistencies between standard CLI behavior and ACP mode (such as ignored co-author settings and unresponsive `/rename` commands).
* **Startup and Lifecycle Races:** Race conditions during initialization—such as custom agent selection being overwritten by MCP reloading, and runaway browser OAuth initialization loops on Windows.
* **State Recovery Friction:** Issues around session nesting (`/exit` requiring multiple inputs after resuming) and terminal safety denials turning basic recovery workflows into dead ends.
* **Terminal Environment Leakage:** Failure to gracefully reset terminal modes upon unexpected application crashes, rendering host shells unusable.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest: 2026-10-14

### 1. Today's Highlights
The OpenCode community is currently focused on stabilizing the V2 architecture, with a significant wave of reports surfacing regarding Windows compatibility, sub-agent environment inheritance, and session persistence after network disruptions. Developers are actively addressing these regressions, particularly around the integrated terminal and cross-session configuration migration.

### 2. Releases
*No new releases in the last 24 hours.*

### 3. Hot Issues
*   **[#55163](https://github.com/anomalyco/opencode/issues/55163) Windows TUI Raw Mode:** Exiting the TUI on Windows leaves the terminal in raw mode, potentially breaking shells and multiplexers. A critical UX issue for Windows users.
*   **[#55189](https://github.com/anomalyco/opencode/issues/55189) Desktop Terminal Failure:** A 503 error caused by `opencode-pty` missing from `$PATH` is preventing terminal usage on Windows.
*   **[#42421](https://github.com/anomalyco/opencode/issues/42421) Missing TODO Support:** Users are frustrated that V1 native TODO tools are missing in V2, limiting task management capabilities.
*   **[#51949](https://github.com/anomalyco/opencode/issues/51949) Compaction Bugs:** Context compaction is causing agents to "forget" their top-level tools, forcing them into unreliable code-mode fallback.
*   **[#55228](https://github.com/anomalyco/opencode/issues/55228) Sub-agent Environment:** Environment variables set via API are not propagating to child sessions, breaking complex automation workflows.
*   **[#50672](https://github.com/anomalyco/opencode/issues/50672) Port Conflicts:** The hardcoded port `49374` prevents multiple clients from running on shared loopbacks (WSL/multi-user), a major blocker for local development environments.
*   **[#55216](https://github.com/anomalyco/opencode/issues/55216) File Drag-and-Drop:** A regression in the Desktop app prevents attaching more than one file via drag-and-drop.
*   **[#55250](https://github.com/anomalyco/opencode/issues/55250) Network Reconnect:** A false "Session location unavailable" prompt is appearing after network blips, interrupting user workflow.
*   **[#55214](https://github.com/anomalyco/opencode/issues/55214) Zombie Agents:** Agents continue running after the Desktop app is closed, causing concerns regarding resource usage and unexpected behavior.
*   **[#54185](https://github.com/anomalyco/opencode/issues/54185) Title Agent:** The V2 title generator is hallucinating conversational replies instead of summarizing sessions.

### 4. Key PR Progress
*   **[#55257](https://github.com/anomalyco/opencode/pull/55257) Sub-agent Inheritance:** Fixes the environment propagation issue identified in #55228.
*   **[#55258](https://github.com/anomalyco/opencode/pull/55258) Reconnect Sync:** Improves robustness during network reconnection to prevent false location errors.
*   **[#48968](https://github.com/anomalyco/opencode/pull/48968) Windows Shell Path:** Resolves issues where shells installed via App Execution Aliases (like `pwsh`) were not detected.
*   **[#55252](https://github.com/anomalyco/opencode/pull/55252) Figma Plugin:** Switches to the public Figma app endpoint, improving connectivity for the MCP integration.
*   **[#53785](https://github.com/anomalyco/opencode/pull/53785) Cost Tracking:** Adds visibility for session tokens and costs directly in the session view.
*   **[#55246](https://github.com/anomalyco/opencode/pull/55246) GUI Plugins:** Allows plugins to ship dedicated GUI components alongside TUI/server logic.
*   **[#54251](https://github.com/anomalyco/opencode/pull/54251) Interruption Handling:** Ensures results from completed execute calls are retained even if a parent task is interrupted.
*   **[#55018](https://github.com/anomalyco/opencode/pull/55018) Media Handling:** Increases the binary preview threshold to 256 MiB to support larger project media.
*   **[#55247](https://github.com/anomalyco/opencode/pull/55247) Notification Fixes:** Improves window activation when clicking on desktop notifications.
*   **[#55254](https://github.com/anomalyco/opencode/pull/55254) V1 Config Migration:** Fixes a migration bug that incorrectly interpreted built-in provider routes as external NPM packages.

### 5. Feature Request Trends
*   **Ecosystem Expansion:** Heavy demand for more MCP integrations (e.g., Figma #54805) and improved provider account management.
*   **V2 Configuration:** High interest in more granular control over prompt-caching TTLs (#51109) and retry strategies (#41709).
*   **Observability:** Users want better visibility into session costs (#53785) and more reliable session titles/summarization (#54185).

### 6. Developer Pain Points
*   **Migration Turbulence:** Significant friction in the V1 to V2 transition, particularly regarding session history visibility in non-git projects (#49827, #50551).
*   **Windows Reliability:** Multiple high-impact issues regarding terminal/shell integration (PATH issues, raw mode, port locks) are making OpenCode difficult to use on Windows.
*   **Interruption Recovery:** Instability when recovering from network drops or interrupted agent runs, which currently triggers state-loss or duplicated message injection (#55204).

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