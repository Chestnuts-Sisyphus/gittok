# AI CLI Tools Community Digest 2026-10-16

> Generated: 2026-10-15 22:46 UTC | Tools covered: 9

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

# AI CLI Tools Ecosystem Report: October 16, 2026

## 1. Ecosystem Overview
The AI CLI development landscape is currently characterized by a definitive shift from basic chat interfaces to robust, agent-centric architectures with complex lifecycle management. Development energy is heavily concentrated on resolving "silent failures" in subagent execution, hardening sandboxing mechanisms against OS-level quirks, and optimizing context efficiency through AST-aware parsing. While Google’s Gemini CLI focuses on architectural stability and error handling, GitHub Copilot is aggressively expanding its extensibility through plugin ecosystems, and OpenCode is undergoing significant identity and structural changes (rebranding to Ember). Several major tools report data collection failures today, but the available data indicates that the industry is maturing beyond simple prompt engineering into managing distributed, autonomous coding agents.

## 2. Activity Comparison
*Note: Counts reflect only successfully reported items for the 24-hour window on 2026-10-16. "N/A" indicates summary generation failure or no reported activity.*

| Tool | Hot Issues (Top 10) | Key PRs (Active/Updated) | Release Status |
| :--- | :---: | :---: | :--- |
| **Gemini CLI** | 10 | 10 | No new releases |
| **Copilot CLI** | 10 | 0 | v1.0.99-1 / v1.0.99-0 |
| **OpenCode** (Ember) | 10 | 10 | v1.1.19.1 |
| **Claude Code** | N/A | N/A | N/A |
| **OpenAI Codex** | N/A | N/A | N/A |
| **Kimi Code CLI** | 0 | 0 | No activity |
| **Pi** | N/A | N/A | N/A |
| **Qwen Code** | N/A | N/A | N/A |
| **DeepSeek TUI** | N/A | N/A | N/A |

## 3. Shared Feature Directions
Several distinct technical requirements are converging across multiple communities, indicating industry-standard needs for next-generation CLI tools:

*   **MCP (Model Context Protocol) Robustness & Discovery:**
    *   **Gemini CLI:** Implementing timeouts for MCP `tools/list` discovery to prevent hanging (`#29767`).
    *   **Copilot CLI:** Struggling with OAuth discovery fallbacks for HTTP MCP servers and stale filesystem bindings after reboots (`#3100`, `#4998`).
    *   **OpenCode:** Managing memory exhaustion from global stdio MCP servers spawning per directory (`#51003`).
    *   *Implication:* MCP integration is no longer purely a "feature add" but a stability and performance bottleneck requiring strict lifecycle and resource management.
*   **Sandboxing & OS Compatibility:**
    *   **Gemini CLI:** Fixing Wayland compatibility for browser subagents (`#21983`) and OS-level sandboxing (`#19873`).
    *   **Copilot CLI:** Resolving macOS sandbox blocks on local daemons like Gradle (`#5105`) and credential helper restrictions in sandboxed git (`#5102`).
    *   *Implication:* Developers are moving from simple command execution to managing secure, isolated environments that must coexist with dynamic OS environments (Wayland, macOS updates, enterprise policies).
*   **Subagent Lifecycle & Control:**
    *   **Gemini CLI:** Addressing "silent hangs" in generalist agents and misleading success states in subagent recovery (`#21409`, `#22323`).
    *   **Copilot CLI:** Requesting the ability to cancel enqueued messages before execution to prevent unwanted agent actions (`#1857`).
    *   *Implication:* As agents become autonomous, user control over cancellation, interruption, and accurate status reporting is becoming a critical UX and safety requirement.
*   **Context & Token Optimization:**
    *   **Gemini CLI:** Shift towards AST-aware file reads to reduce token bloat (`#22745`).
    *   **Copilot CLI:** Handling context budget limits where static tool definitions cause pre-prompt blocking errors (`#5151`).
    *   *Implication:* Naive text-based file reading is being replaced by structured parsing to preserve context windows for actual reasoning.

## 4. Differentiation Analysis

*   **Gemini CLI: The "Stability-First" Architect**
    *   **Focus:** Deep internal robustness. A significant portion of PRs are `fix(core)` regarding atomic writes, credential serialization, and config load orders.
    *   **Target User:** Developers relying on long-running autonomous workflows who cannot afford silent data corruption or state loss.
    *   **Technical Approach:** Heavy investment in AST-aware exploration and defensive programming against OS edge cases (Wayland, Windows diff quotes).

*   **GitHub Copilot CLI: The "Ecosystem Integrator"**
    *   **Focus:** Extensibility and enterprise integration. Recent releases emphasize `ghapp://` install links, plugin trust folders, and MCP OAuth flows.
    *   **Target User:** Enterprise teams and developers deeply embedded in the GitHub/Microsoft ecosystem who need secure, installable skill packs.
    *   **Technical Approach:** Prioritizing policy enforcement (sandboxing, permission config) and seamless identity management (Entra ID, git credentials) over raw model capability.

*   **OpenCode (Ember): The "Platform Pivot"**
    *   **Focus:** Identity rebranding and desktop-app integration. The "Ember" rebrand and GUI plugin support signal a shift from a pure CLI to a hybrid desktop/CLI platform.
    *   **Target User:** Power users who want a unified development environment with visual feedback (GUI plugins) alongside terminal workflows.
    *   **Technical Approach:** Aggressive V2 architecture changes, including removing LSP support (controversial) and implementing cross-session referencing (`@` mentions).

*   **Other Tools (Claude Code, Codex, Kimi, etc.)**
    *   Due to data collection failures or inactivity, no comparable differentiation can be drawn for this snapshot. However, the absence of Kimi Code activity suggests a potential pause in competitive feature releases in that segment.

## 5. Community Momentum & Maturity

*   **High Activity & Friction (OpenCode, Gemini CLI):**
    *   Both tools show high PR and issue volumes, but also high "pain point" density. OpenCode is in a transitional "churn" phase (V2 migration, rebranding), leading to bugs in basic areas like port conflicts and TUI teardown. Gemini CLI is in a "hardening" phase, with many P1 issues related to agent hangs and silent failures.
*   **Moderate Activity & Specificity (Copilot CLI):**
    *   Copilot shows moderate issue volume but high specificity in enterprise-related breakages (OAuth, sandboxing). The lack of recent PRs (0 in last 24h) might suggest a release cycle pause after v1.0.99-1, with effort moving to stabilization or enterprise-specific patches.
*   **Low/No Activity:**
    *   Kimi Code CLI shows no activity, which is notable given the competitive AI coding landscape. Other major players (Claude, Codex) have data collection issues, preventing accurate momentum assessment, but this is likely a technical bug in the digest pipeline rather than actual inactivity.

## 6. Trend Signals

*   **From Prompt to Process:** The industry is moving beyond "prompting a model" to "managing a process." Features like subagent lifecycle tracking, cancellation queues, and persistent task files (Gemini CLI’s `WriteToDo` deprecation) indicate a shift toward agentic workflow management.
*   **MCP is Table Stakes, But Broken:** Almost every major tool is struggling with MCP implementation. The trend is moving from "support MCP" to "make MCP reliable," involving timeouts, memory management, and authentication fallbacks.
*   **Context Optimality is Competitive:** AST-aware parsing (Gemini) and dynamic tool scoping are emerging as key differentiators for handling large codebases without hitting context limits.
*   **Hybrid Environments:** The struggle between CLI and desktop environments is intensifying. OpenCode’s move to GUI plugins and Copilot’s focus on IDE reconnection suggest a future where the CLI is an entry point to a broader, persistent IDE-like session, rather than a standalone terminal utility.
*   **Security & Sandboxing as a Feature:** Sandbox configuration is no longer a workaround; it’s a core feature (Copilot’s `--trust-folder`, Gemini’s OS sandboxing). Developers are demanding granular control over what agents can execute, particularly in enterprise and multi-user environments.

**Recommendation for Developers:** If building or maintaining AI CLI tools, prioritize **MCP lifecycle management**, **AST-aware code exploration**, and **user-controllable subagent execution**. These are the areas where current community friction is highest and where competitive differentiation is emerging.

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

# Gemini CLI Community Digest — October 16, 2026

---

## 1. Today's Highlights
Development activity on the Gemini CLI centers around agent lifecycle stability, resilience against system timeouts, and robustness of core filesystem operations. Contributors are aggressively addressing subagent management issues, such as infinite hanging bugs and recovery state reporting, alongside hardening core persistence and environment loading sequences.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues

1. **[#22323: Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**
   * **Why it matters:** Misleading subagent termination statuses mask silent failures or artificial interruptions, confusing users relying on autonomous workflows.
   * **Community reaction:** Active interest with 13 comments and prioritized as `p1`.

2. **[#19873: Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**
   * **Why it matters:** Aligns tool execution with Gemini 3's native training data (POSIX tool chaining) while keeping the host system safe.
   * **Community reaction:** Viewed as a high-value architectural enhancement (`effort/large`).

3. **[#21409: Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**
   * **Why it matters:** Simple tasks (like folder creation) cause the generalist agent to lock up indefinitely, requiring user intervention.
   * **Community reaction:** Highly disruptive bug with 8 comments and 8 thumbs-up reactions.

4. **[#22745: Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**
   * **Why it matters:** Moving away from naive text reads to AST-aware parsing drastically reduces token bloat and improves precision bounds.
   * **Community reaction:** Serves as a major architectural epic tracking multiple sub-issues.

5. **[#21968: Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**
   * **Why it matters:** Custom skills and subagents go underutilized unless manually forced by prompts, diminishing their intended utility.
   * **Community reaction:** Gathered multiple user reports highlighting prompt-alignment gaps.

6. **[#22267: Browser Agent ignores settings.json overrides (e.g., maxTurns)](https://github.com/google-gemini/gemini-cli/issues/22267)**
   * **Why it matters:** Users cannot tune browser automation limits through expected configuration files.
   * **Community reaction:** Highlights discrepancies in how configuration inheritance handles specialized subagents.

7. **[#21983: browser subagent fails in wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**
   * **Why it matters:** Linux users running modern Wayland display servers experience immediate browser subagent termination.
   * **Community reaction:** Tracked as a high priority (`p1`) environment-compatibility bug.

8. **[#24246: Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**
   * **Why it matters:** Exceeding tool limits causes API request rejection due to unmanaged context payload inflation.
   * **Community reaction:** Prompts requests for intelligent tool scoping and dynamic enabling.

9. **[#22186: get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**
   * **Why it matters:** CLI crashes unexpectedly right as complex automated task summaries conclude.
   * **Community reaction:** Labeled as `priority/p1` due to crashing active user sessions.

10. **[#22672: Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)**
    * **Why it matters:** The model occasionally defaults to dangerous git commands (`git reset`, `--force`) or risky database modifications when safer alternatives exist.
    * **Community reaction:** Critical safety and customer-trust concern.

---

## 4. Key PR Progress

1. **[#29762: fix(settings): preserve disk edits when changing authentication](https://github.com/google-gemini/gemini-cli/pull/29762)**
   * Prevents `/auth signin` from accidentally overwriting unrelated settings modified while the CLI session was active.

2. **[#29767: fix(core): bound MCP tools/list discovery with a short default timeout](https://github.com/google-gemini/gemini-cli/pull/29767)**
   * Restricts Model Context Protocol (MCP) tool discovery from hanging indefinitely, applying a robust 60-second default timeout.

3. **[#29756: feat(core): make API request headers and body timeouts configurable](https://github.com/google-gemini/gemini-cli/pull/29756)**
   * Adds `general.requestHeadersTimeoutMs` and `general.requestBodyTimeoutMs` to prevent long-thinking model turns from failing with body timeout errors.

4. **[#29749: fix(core): respect read-only files and hard links in atomic writeTextFile](https://github.com/google-gemini/gemini-cli/pull/29749)**
   * Ensures atomic file writes honor `0444` read-only permissions and prevent hard-link splitting.

5. **[#29750: fix(cli): resolve settings placeholders after loading .env files](https://github.com/google-gemini/gemini-cli/pull/29750)**
   * Fixes a configuration load-order defect so environment variables from `.env` files are correctly injected before resolving settings placeholders.

6. **[#29769: fix(core): harden SKILL.md frontmatter parsing for single-line descriptions](https://github.com/google-gemini/gemini-cli/pull/29769)**
   * Fixes parsing failures on Windows platforms (BOM headers, trailing spaces) when reading custom YAML skill frontmatter.

7. **[#29765: fix(core): make file credential store writes atomic and serialized](https://github.com/google-gemini/gemini-cli/pull/29765)**
   * Eliminates credential corruption and race conditions in the fallback file-based keychain storage layer.

8. **[#29744: fix(core): let /ide enable reconnect after the IDE server restarts](https://github.com/google-gemini/gemini-cli/pull/29744)**
   * Restores IDE companion reconnection functionality after VS Code window reloads without requiring a full application restart.

9. **[#29753: fix(core): format and quote Windows diff command arguments in openDiff](https://github.com/google-gemini/gemini-cli/pull/29753)**
   * Fixes argument formatting for external Windows GUI diff tools executed through `cmd.exe`.

10. **[#29760: fix(core): disable interactive credential and SSH prompts in getSafeGitEnv](https://github.com/google-gemini/gemini-cli/pull/29760)**
    * Stops background git extension checks from accidentally hijacking `stdin` with interactive prompts and freezing the TUI.

---

## 5. Feature Request Trends
* **AST-Aware Code Exploration:** Strong momentum toward shifting file reading, code mapping, and searching from naive text parsing to AST-aware querying (`tilth`, `glyph`, `ast-grep`) to save token overhead.
* **Persistent & Local Task Tracking:** Moving away from in-context transient LLM prompts (`WriteToDo`) toward persistent file-based task tracking across sessions.
* **Enhanced Subagent Interoperability:** Requests for deeper subagent ecosystem sharing (e.g., exposing trajectories via `/chat share` and handling parallel execution models).
* **Self-Awareness & Documentation:** Empowering agents with a native understanding of tool documentation, CLI flags, and internal mechanics to better guide users.

---

## 6. Developer Pain Points
* **Silent Hangups & Timeouts:** Long model-thinking steps and unresponsive MCP discovery tools frequently stall sessions without clear recovery paths.
* **File Permission & Lock Violations:** Atomic writing features unintentionally breaking hard links or overwriting protected read-only files.
* **Environment Configuration Race Conditions:** Load-order issues where environment variables declared in `.env` fail to register in time for settings placeholder validation.
* **Background TUI Interferences:** Extension checks or git updates inadvertently stealing raw terminal input (`stdin`), freezing the user interface.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-16

## 1. Today's Highlights
Recent releases (v1.0.99-0 and v1.0.99-1) introduce powerful extensibility features, including the ability to install verified skills and plugins directly via GitHub links (`ghapp://`) and a new `--trust-folder` flag for one-off prompt-mode sessions. Meanwhile, the community is actively navigating edge cases around advanced sandbox restrictions (such as macOS Gradle daemon connectivity), OAuth discovery flows for MCP servers, and context budget limits for emerging model tiers.

---

## 2. Releases
### [v1.0.99-1](https://github.com/github/copilot-cli/releases/tag/v1.0.99-1) & [v1.0.99-0](https://github.com/github/copilot-cli/releases/tag/v1.0.99-0)
* **Added:**
  * `--trust-folder` flag for one-off prompt-mode sessions started via `-p` or piped stdin.
  * Direct installation of verified Skills and plugins from GitHub install links via `copilot plugin install "ghapp://air/install?..."`.
  * Full-screen action menu for sharing the current session by opening `/share` without arguments.
* **Improved:**
  * Enhanced `/login` for Microsoft Entra to allow choosing a cached account.
  * `/sandbox` can now maintain sandboxing enabled for the current session without global configuration.
  * Trusted repository plugins now install and update automatically before chat execution.

---

## 3. Hot Issues
1. **[CLI input should have a vi/vim input mode (#13)](https://github.com/github/copilot-cli/issues/13)**
   * **Why it matters:** Brings modal editing capabilities to the interactive CLI.
   * **Community reaction:** Highly popular request with strong engagement (76 👍, 14 comments).
2. **[Allow users to cancel or remove enqueued messages before they are executed (#1857)](https://github.com/github/copilot-cli/issues/1857)**
   * **Why it matters:** Prevents unwanted queued commands (`Ctrl+Q`/`Ctrl+Enter`) from executing automatically after an agent finishes a busy task.
   * **Community reaction:** Steady demand for execution control (30 👍, 12 comments).
3. **[Copilot CLI unusable after macOS update/reboot because `.mcp-writer.binding` persists stale filesystem device ID (#4998)](https://github.com/github/copilot-cli/issues/4998)**
   * **Why it matters:** Causes total prompt-processing failure across sessions following standard OS updates.
   * **Community reaction:** High disruption reported following recent macOS security updates (11 comments).
4. **[HTTP MCP server with Bearer token fails OAuth discovery instead of falling back to headers auth (#3100)](https://github.com/github/copilot-cli/issues/3100)**
   * **Why it matters:** Breaks custom HTTP MCP setups by forcing unwanted OAuth discovery loops.
   * **Community reaction:** Significant frustration for enterprise setups using static tokens (10 👍, 1 comment).
5. **[Add Chinese (zh-CN) UI localization for the GitHub Copilot desktop app (#4407)](https://github.com/github/copilot-cli/issues/4407)**
   * **Why it matters:** Demands foundational internationalization support for non-English developer teams.
   * **Community reaction:** Strongly backed by international developers (10 👍, 1 comment).
6. **[macOS sandbox blocks Gradle daemon connection despite local networking being allowed (#5105)](https://github.com/github/copilot-cli/issues/5105)**
   * **Why it matters:** Breaks standard offline or local build workflows within sandboxed environments.
   * **Community reaction:** Active troubleshooting by macOS developers.
7. **[Cloudflare connection fails with "Subscription limit reached" after successful OAuth (#4991)](https://github.com/github/copilot-cli/issues/4991)**
   * **Why it matters:** Blocks remote MCP server integration during authentication flows.
   * **Community reaction:** Impacts third-party cloud tool integrations.
8. **[permissions-config.json commandIdentifiers with spaces still require approval (#4150)](https://github.com/github/copilot-cli/issues/4150)**
   * **Why it matters:** Configuration rules fail to match compound commands (e.g., `"make fix"`).
   * **Community reaction:** Frustration with access policy configuration granularity (3 👍, 1 comment).
9. **[Claude models (and Gemini Argon) fail with HTTP 400 “request body is not valid JSON” (#5139)](https://github.com/github/copilot-cli/issues/5139)**
   * **Why it matters:** Interoperability regression affecting multiple prominent model families (Claude Sonnet/Opus 5.5, Gemini Argon).
   * **Community reaction:** Blocking issue for users relying on alternative model providers.
10. **[Regression: sandboxed git has no way to use a credential that differs from the Copilot/gh sign-in identity (#5102)](https://github.com/github/copilot-cli/issues/5102)**
    * **Why it matters:** Forces sandboxed git subprocesses to drop custom fine-grained PATs or alternate credentials.
    * **Community reaction:** Critical for multi-account or enterprise git workflows.

---

## 4. Key PR Progress
*Note: No active pull requests were updated within the last 24-hour reporting window (Total: 0 items).*

---

## 5. Feature Request Trends
* **Deep Tool & IDE Interoperability:** Requests to bridge tools beyond GitHub—such as adapting CLI top tabs for Azure DevOps (`#5153`), adding browser automation commands (`/browser` / `/playwright` alongside `/computer` `#5152`), and improving custom skill directory resolution (`#4401`).
* **Advanced Text & Session Management:** Greater control over history buffers (`commandHistoryMaxSize` limits `#5159`), persistent custom session names despite automated PR title overwrites (`#5158`), and modal editing experiences like Vim (`#13`).
* **Enterprise & Cloud Authentication:** Granular Tenant selection for guest accounts using MCP servers (`#5157`), and flexible authentication fallback for HTTP MCP servers using raw headers (`#3100`).

---

## 6. Developer Pain Points
* **Sandbox Friction & Regressions:** Developers frequently hit friction where local security sandboxes inadvertently block standard background daemons (like Gradle on macOS `#5105`, bubblewrap namespaces on Ubuntu `#5052`, or credential helpers in sandboxed git `#5102`).
* **MCP Integration & Policy Hurdles:** Complexities surrounding MCP server discovery, OAuth limitations, registry-only policies blocking cloud agent configs (`#5155`), and stale filesystem device IDs after reboots (`#4998`).
* **Model Context & Budget Limits:** Emerging model context tier issues, such as static tool definitions bloating to the point of triggering pre-prompt blocking errors (`#5151`), alongside model-specific reasoning-effort compatibility errors (`#4473`).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest (2026-10-16)

### 1. Today's Highlights
The OpenCode ecosystem is currently undergoing a heavy stabilization push for its V2 architecture, focusing on resolving lifecycle bugs and refining model integration. Of note is a significant rebranding PR—suggesting a shift to "Ember"—and a swift developer response to regressions in model provider configurations and CLI behavior.

### 2. Releases
*   **v1.19.1:** A clean-up release that deprecates all session-sharing functionality. Existing share links and commands are now unsupported. ([Link](https://github.com/anomalyco/opencode))

### 3. Hot Issues
1.  **[#51424] Go models showing "Insufficient funds":** High community frustration regarding billing sync errors despite active subscriptions.
2.  **[#50672] Hardcoded port 49374 conflict:** Prevents multi-user or WSL-mirrored environments from running multiple clients.
3.  **[#53756] Bedrock/Nova formatting bug:** Claude models via Bedrock application ARNs are erroneously receiving Nova-format configuration, causing 400 errors.
4.  **[#55629] "Big Pickle" THINKING tag leakage:** Users reporting raw `/think` tags bleeding into final output.
5.  **[#50650] Custom provider save failure:** The UI allows adding custom OpenAI-compatible providers, but the save handler throws an unrecoverable "unavailable" error.
6.  **[#50916] LSP support removal:** Significant pushback regarding the loss of language server diagnostics in V2.
7.  **[#55163] TUI terminal corruption:** Exiting the TUI on Windows leaves terminals in raw mode, breaking session multiplexers like `zellij`.
8.  **[#51003] MCP memory exhaustion:** Global stdio MCP servers spawn per directory, causing massive memory overhead for multi-project users.
9.  **[#55726] OpenAI-compatible `max_tokens` regression:** Conflict between `max_tokens` and `max_completion_tokens` is causing 400 errors for custom provider users.
10. **[#55861] Desktop service persistence:** The desktop app fails to honor the "disabled" service flag, leaving background daemons active after exit.

### 4. Key PR Progress
1.  **[#55876] Ember Rebranding:** An ambitious PR transitioning the project branding, electron IDs, and deep links to "Ember."
2.  **[#55246] GUI Plugin Support:** Implements `./gui` exports, allowing plugins to ship frontend interfaces alongside server/TUI components.
3.  **[#55778] Model Limit Seeding:** Fixes [#55768] by ensuring user-defined limits in `opencode.json` are seeded before model transforms occur.
4.  **[#55866] Test Stability:** Significant cleanup of the CI/test workflow to resolve flaky `AppProcess` interruption tests.
5.  **[#55865] TUI Screen Mode Fix:** Resolves terminal teardown issues on Windows by keeping the TUI on the main screen.
6.  **[#54466] Cross-Session Referencing:** Allows the composer to reference other open sessions using `@` mentions.
7.  **[#55840] UI Link Rendering:** Fixes visual bugs where link favicons wrap incorrectly in Markdown.
8.  **[#55754] Lifecycle Scheduling:** Refactors plugin setup to yield between operations, improving stability during cold boot.
9.  **[#55756] Prompt Status Reporting:** Adds ephemeral "busy" status publication to prevent UI hangs during cold location preparation.
10. **[#55817] Sandbox Tolerance:** Fixes failures when running inside restricted filesystems by gracefully handling path resolution denials.

### 5. Feature Request Trends
*   **Sticky UI Prompts:** Users consistently request an option to pin the latest user prompt to the top of the chat view ([#28035], [#53239]).
*   **Improved Desktop/Launcher Links:** Requests for standardized, clickable loopback links to re-open specific projects in Desktop ([#51430]).
*   **Plugin Ecosystem Expansion:** Desire for easier GUI integration for third-party tools ([#55246]).

### 6. Developer Pain Points
*   **V2 Migration Friction:** Developers are struggling with the loss of V1 feature parity, specifically regarding LSP diagnostics and custom provider configurations.
*   **Resource Management:** Excessive process spawning (MCP) and memory leaks during multi-directory usage are major pain points for power users.
*   **Configuration Rigidity:** Inability to override system-default limits or properly manage background services creates significant friction in custom environments.

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