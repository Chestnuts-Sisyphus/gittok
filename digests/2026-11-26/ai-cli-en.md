# AI CLI Tools Community Digest 2026-11-26

> Generated: 2026-11-26 02:33 UTC | Tools covered: 9

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

# AI CLI Tools Ecosystem Cross-Tool Comparison Report
**Date:** 2026-11-26
**Tools Analyzed:** GitHub Copilot CLI, OpenCode, Pi (Mono), Claude Code, OpenAI Codex, Gemini CLI, Qwen Code, DeepSeek TUI

## 1. Ecosystem Overview
The AI CLI landscape in late 2026 is characterized by a shift from basic chat integration to robust, multi-agent operational infrastructure. Tools like **GitHub Copilot CLI** and **OpenCode** are rapidly maturing, focusing on enterprise-grade stability, complex workspace management, and multi-provider routing. A significant convergence is observed around **ACP (Agent Context Protocol)** and **MCP (Model Context Protocol)**, with developers demanding tighter integration between CLI agents and external IDEs or background services. Critical stability issues, particularly on Windows environments and during long-running agentic sessions, remain a universal pain point, driving a wave of defensive engineering and reliability fixes across all major ecosystems.

## 2. Activity Comparison

| Tool | Issues (Active/Hot) | PRs (Key/Notable) | Release Status | Activity Level |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub Copilot CLI** | 10 Hot Issues | 2 Key PRs | v1.0.117-2 (Recent Patches) | **High** (Frequent patch releases) |
| **OpenCode** | 10 Hot Issues | 10 Key PRs | v2.4.2 (Major Feature Drop) | **Very High** (Architectural refactoring) |
| **Pi (Mono)** | 10 Hot Issues | 10 Key PRs | v1.6.1 (Model Logic Update) | **High** (Stability Focus) |
| **Kimi Code CLI** | 0 | 0 | N/A | **Inactive** (24h) |
| **Claude Code** | Data Unavailable | N/A | N/A | **Unknown** |
| **OpenAI Codex** | Data Unavailable | N/A | N/A | **Unknown** |
| **Gemini CLI** | Data Unavailable | N/A | N/A | **Unknown** |
| **Qwen Code** | Data Unavailable | N/A | N/A | **Unknown** |
| **DeepSeek TUI**| Data Unavailable | N/A | N/A | **Unknown** |

*Note: Data for Claude, Codex, Gemini, Qwen, and DeepSeek was unavailable for this digest period. Comparisons are limited to the three active reporters.*

## 3. Shared Feature Directions

*   **Enterprise Windows & Constrained Environments:**
    *   **Tools:** GitHub Copilot CLI, Pi, OpenCode.
    *   **Need:** All three face critical friction in enterprise Windows setups. Copilot struggles with `ConstrainedLanguage` mode and WDAC policies; Pi faces TUI cleanup and `SIGBREAK` lifecycle issues; OpenCode deals with subprocess `Ctrl+C` failures and shell escaping errors. There is a clear industry gap in robust Windows process management for AI CLIs.
*   **Multi-Root & Workspace Context Parity:**
    *   **Tools:** GitHub Copilot CLI, Pi.
    *   **Need:** Developers require seamless support for multi-root workspaces (`.code-workspace`) and local instruction files (`AGENTS.md`, `AGENTS.local.md`). Copilot users report failures to load secondary root folders, while Pi introduces `AGENTS.local.md` to allow granular, local-only configuration overrides.
*   **Local & Hybrid Model Routing:**
    *   **Tools:** GitHub Copilot CLI, OpenCode, Pi.
    *   **Need:** Strong demand for reliable integration of local inference engines (vLLM, LM Studio, Jan AI) alongside cloud providers. Copilot users report routing bypassing local vLLM servers; OpenCode users demand GUI controls for custom provider lists; Pi is heavily focused on model catalog synchronization and reasoning effort selection for local/hybrid models.
*   **Agent Lifecycle & Session Management:**
    *   **Tools:** OpenCode, Pi, Copilot CLI.
    *   **Need:** Moving beyond single-turn agents to manageable, persistent sessions. OpenCode is building "Agent Teams" and session snoozing; Pi is working on durable operations and conversation deletion; Copilot CLI is trying to suppress automated Git checkpoint refs to clean up histories.

## 4. Differentiation Analysis

| Feature | GitHub Copilot CLI | OpenCode | Pi (Mono) |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | Enterprise Integration & ACP | Desktop/TUI UX & Multi-Agent | Terminal Stability & Model Fidelity |
| **Target User** | Enterprise Devs, GitHub Ecosystem | Power Users, Desktop-First Devs | Terminal Purists, Hybrid Model Users |
| **Technical Approach** | Tight coupling with GitHub infra (Connectors, Fusion) | Effect Runtime, Background Fibers, Remote Streaming | Focus on SSE parsing, Prompt Caching, Config Layering |
| **Unique Strength** | Native ACP support, extension manifests | GUI/TUI parity, remote browser streaming (3.3x speedup) | Granular model control (reasoning effort, local overrides) |
| **Weakness** | Windows enterprise constraints, plugin skill injection | Windows subprocess stability, state migration bugs | Provider drift, catalog mismatches |

## 5. Community Momentum & Maturity

*   **OpenCode (Rapidly Iterating/Maturing):** Exhibits the highest velocity in architectural changes. With 10 notable PRs addressing core runtime hygiene, remote streaming performance, and new multi-agent concepts ("Agent Teams"), it is moving from a tool to a platform. However, this speed introduces fragmentation (e.g., v1 to v2 session migration bugs).
*   **GitHub Copilot CLI (Stable for Enterprise):** Focus is on polishing integration points (ACP, Extensions, Fusion). The frequency of patch releases (v1.0.116 to v1.0.117-2) suggests a stabilization phase for its 1.0 line, prioritizing bug fixes for existing enterprise deployments over new features.
*   **Pi (Mono) (Niche Optimization):** Highly active in solving deep technical issues (SSE parsing, prompt caching, Windows TUI quirks). It targets a specific segment of users who value terminal fidelity and local/hybrid model control over broad GUI features.

## 6. Trend Signals

1.  **Standardization of Agent Protocols:** The rise of **ACP (Agent Context Protocol)** in Copilot discussions and **MCP** in OpenCode/Pi indicates that AI CLIs are standardizing how they communicate with external tools and IDEs. Expect stricter schema enforcement and handshaking in 2027.
2.  **The "Windows Tax":** All active tools report significant friction with Windows environments (PowerShell constraints, process lifecycle, TUI rendering). This is a major barrier to enterprise adoption. Tools that solve Windows subprocess and TUI stability will gain a significant competitive advantage in corporate sectors.
3.  **Shift to Agentic Orchestration:** The focus is moving from "Chat" to "Teams" and "Fibers." OpenCode's work on parallel, communicating multi-agent swarms and background fibers signals that CLIs are becoming orchestrators for complex, long-running tasks rather than just code completion assistants.
4.  **Local-First Hybrid Architectures:** Developers are increasingly demanding control over *where* and *how* models run. The struggle to route to local vLLM servers or manage local config files (`AGENTS.local.md`) highlights a trend toward hybrid architectures where sensitive or low-latency tasks run locally, while complex reasoning uses cloud endpoints.
5.  **Transparency and Control:** Users are rejecting "black box" behaviors. Requests for token transparency, disabling automated Git refs, and explicit error reporting (e.g., Pi's `models.json` error reporting) show a demand for auditable, controllable AI workflows, particularly in regulated environments.

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-11-26

## 1. Today's Highlights
Recent patches (v1.0.116 to v1.0.117-2) focus heavily on refining Agent Context Protocol (ACP) integrations, fixing strict parameter-matching rules in PowerShell environments, and improving extension manifest enforcement via build-time JSON Schemas. Meanwhile, community discussions center on edge cases surrounding Copilot Fusion routing, MCP protocol version compatibility, and enterprise policy configurations.

---

## 2. Releases
*Recent updates spanning versions `v1.0.116` through `v1.0.117-2`:*
- **v1.0.117-2:** Fixed `copilot help extensions` messaging around extension launch approvals and resolved issues where built-in searches failed when Copilot passed line-specific flags.
- **v1.0.117-1:** Improved the `/model` picker to display service notices and retiring model warnings, while preventing silent provider switching when a repo specifies an unavailable provider.
- **v1.0.117-0:** Added explicit tool exposure options for custom agents and fixed session resumption bugs for background agents and connected Copilot Connectors.
- **v1.0.116 / v1.0.116-3:** Introduced a build-time JSON Schema for extension manifests, a fullscreen timeline "Jump to latest" feature, and context size selection for ACP-compatible editors.
- **v1.0.116-4 & v1.0.116-5:** Fixed PowerShell parameter parsing errors (e.g., `-n1` or `-ExpectedSha256`), corrected ACP client approval prompt behaviors, and stripped obsolete autopilot prompt references from help documentation.

---

## 3. Hot Issues
1. **[#5323: Add setting to disable agent checkpoint refs (`refs/agents/*`)](https://github.com/github/copilot-cli/issues/5323)**  
   *Why it matters:* Every agent turn automatically commits repository checkpoints using the user's local Git identity, cluttering tool outputs and git histories for developers who prefer clean commit logs.  
   *Community reaction:* Gaining traction (6 thumbs-up, 8 comments) from developers requesting a configuration switch to suppress these automated refs.
2. **[#1826: Support multi-root workspaces via `.code-workspace` file](https://github.com/github/copilot-cli/issues/1826)**  
   *Why it matters:* When connected via `/ide`, the CLI fails to discover secondary root folders or load local instruction files (e.g., `AGENTS.md`) defined in multi-root setups.  
   *Community reaction:* Highly popular request (22 thumbs-up) for enhanced workspace context parity.
3. **[#2073: Request failed due to a transient API error](https://github.com/github/copilot-cli/issues/2073)**  
   *Why it matters:* Users report frequent loops of transient API failure retries, interrupting extended CLI workflows.  
   *Community reaction:* A persistent discussion hub (13 thumbs-up) regarding backend stability and error management.
4. **[#4755: Session wedges permanently when a queued-lane message lands at turn end](https://github.com/github/copilot-cli/issues/4755)**  
   *Why it matters:* Finalization suppression leaves the session permanently unresponsive without crashing, forcing users to manually kill the process.  
   *Community reaction:* High priority reliability bug impacting headless or automated execution layers.
5. **[#2753: Plugin skills not included in `available_skills` for main agent](https://github.com/github/copilot-cli/issues/2753)**  
   *Why it matters:* Marketplace plugin skills show up in the `/skills` UI but fail to inject into the primary agent's system prompt block, rendering them practically invisible to the model.  
   *Community reaction:* Frustrates extension authors attempting to distribute custom capabilities.
6. **[#4683: PowerShell ConstrainedLanguage mode emits spurious exit-status errors](https://github.com/github/copilot-cli/issues/4683)**  
   *Why it matters:* In enterprise Windows environments utilizing WDAC/AppLocker, the exit-status epilogue injected by the CLI calls `$host.SetShouldExit()`, triggering constant error blocks.  
   *Community reaction:* Critical blocker for corporate Windows deployments.
7. **[#5354: ACP does not advertise Copilot Fusion or tier configuration](https://github.com/github/copilot-cli/issues/5354)**  
   *Why it matters:* Prevents external ACP clients (like T3 Code) from exposing Copilot Fusion's routing tier selectors.  
   *Community reaction:* Gaining developer traction (11 thumbs-up) as multi-client usage grows.
8. **[#5440: Agent Plugins 1.0 `.instructions.md` files silently ignored](https://github.com/github/copilot-cli/issues/5440)**  
   *Why it matters:* Custom rules and instructions packaged via standard plugin formats are dropped during initialization.  
   *Community reaction:* Blocks standardized plugin authoring workflows.
9. **[#5581: Copilot Fusion never routes to local OpenAI-compatible vLLM server](https://github.com/github/copilot-cli/issues/5581)**  
   *Why it matters:* Local models added to `providers.json` work when selected directly, but Copilot Fusion's routing logic bypasses them entirely in favor of cloud endpoints.  
   *Community reaction:* Newly reported issue impacting local-first AI architectures.
10. **[#5578: Plugin skill slash command fails with "Unknown command" when arguments are given](https://github.com/github/copilot-cli/issues/5578)**  
    *Why it matters:* Passing arguments to bare plugin skill commands fails with an error unless the fully-qualified `/<plugin>:<skill>` syntax is explicitly used.  
    *Community reaction:* Impacts CLI ergonomics for modular community tools.

---

## 4. Key PR Progress
*Note: Due to the current data snapshot, active PR activity is focused on environment scaffolding:*
1. **[#4316: Create devcontainer.json](https://github.com/github/copilot-cli/pull/4316)**  
   *Description:* Establishes a standard development container configuration to streamline contributor onboarding.
2. **[#4428: Add initial devcontainer configuration](https://github.com/github/copilot-cli/pull/4428)**  
   *Description:* Finalizes and merges core devcontainer parameters for consistent multi-platform testing environments.

---

## 5. Feature Request Trends
- **Granular Control Over Session Footprints:** Developers increasingly want options to disable automated artifacts, such as git checkpoint references (`refs/agents/*`) and persistent prompt histories across unrelated sessions.
- **Advanced Environment & Workspace Parity:** Strong demand for seamless multi-root workspace handling (`.code-workspace`), full plugin rule interpretation, and tighter integration with custom local providers (vLLM/OpenAI-compatible endpoints).
- **Enterprise Policy & Autonomy Controls:** Requests to allow managed policies to pre-approve built-in plugin extensions and expose runtime flags (like `--max-autopilot-continues`) natively via configuration settings.

---

## 6. Developer Pain Points
- **Enterprise Windows Constraints:** Running the CLI under locked-down enterprise environments—such as PowerShell ConstrainedLanguage mode or restricted TCP/sandbox rules—frequently triggers false-positive error spam or network access denials.
- **MCP Protocol & Initialization Friction:** Stdio-based Model Context Protocol (MCP) servers suffer from version-handshake race conditions and timeout fallbacks (e.g., unexpected fallback to legacy `initialize` after `server/discover` probes), leading to dropped connections.
- **UX Inconsistencies Across Clients:** Discrepancies between the interactive CLI and ACP mode (such as hidden command strings in approval modals or missing tier selectors for Copilot Fusion) create confusing development loops when using alternate editors.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-11-26

## 1. Today's Highlights
OpenCode has officially released version `v2.4.2`, packing critical system prompt updates for GPT-6.2 models and resolving OpenCode Go model picker synchronization issues. Meanwhile, core architectural refactoring is underway to better isolate background fibers and secure host-local environments, alongside major performance improvements for remote browser streaming.

---

## 2. Releases
### [v2.4.2](https://github.com/anomalyco/opencode/releases/tag/v2.4.2)
- **GPT-6.2 System Prompt Integration**: Added tailored system prompts for GPT-6.2 Sol and Astra, as well as `gpt-latest` aliases ([#66297](https://github.com/anomalyco/opencode/pull/66297)).
- **OpenCode Go Onboarding Fix**: Resolved model picker listing issues immediately following OpenCode Go connections.

---

## 3. Hot Issues
1. **[#64073 - Restore Foreground Subagent Execution](https://github.com/anomalyco/opencode/issues/64073)**  
   *Why it matters:* Users are actively seeking the reintroduction of foreground subagent execution paths to streamline agentic workflows. (30 comments, 👍 13)
2. **[#12711 - Agent Teams (Flat teams with named messaging and TUI integration)](https://github.com/anomalyco/opencode/issues/12711)**  
   *Why it matters:* A foundational proposal moving beyond sequential subagents to enable parallel, communicating multi-agent swarms. (17 comments, 👍 24)
3. **[#33704 - GUI Options to Edit Custom Providers and Manage Model Lists](https://github.com/anomalyco/opencode/issues/33704)**  
   *Why it matters:* Highlights the friction of configuring local inference engines (like LM Studio or Jan AI) without native UI management tools. (13 comments, 👍 4)
4. **[#66299 - Session prompt hook silently stops firing after plugin re-boot](https://github.com/anomalyco/opencode/issues/66299)**  
   *Why it matters:* Breaks long-lived secret-redaction and prompt-transforming plugins during background service reboots. (9 comments)
5. **[#61899 - Desktop: Ctrl+C in integrated terminal does not interrupt running process](https://github.com/anomalyco/opencode/issues/61899)**  
   *Why it matters:* Windows developers face dangling Python and Node dev servers that require manual process kills. (7 comments)
6. **[#59293 - Subagent sessionID continuation always fails ('Subagent session not found: ses')](https://github.com/anomalyco/opencode/issues/59293)**  
   *Why it matters:* Completely blocks multi-turn continuation with existing subagents, forcing fresh initializations. (7 comments, 👍 1)
7. **[#60702 - Copilot models fail to sync in shared background service](https://github.com/anomalyco/opencode/issues/60702)**  
   *Why it matters:* Breaks GitHub Copilot integrations for the desktop and shared TUI background services (`serve --service`). (6 comments)
8. **[#66449 - Windows bash tool executes `rd /s /q` incorrectly, destroying entire drive roots](https://github.com/anomalyco/opencode/issues/66449)**  
   *Why it matters:* A critical, high-severity data-loss bug where PowerShell escaping anomalies caused recursive deletion of drive roots (e.g., D:). (6 comments)
9. **[#66389 - v1→v2 session migration marks client tools executed, wedging OpenAI Chat](https://github.com/anomalyco/opencode/issues/66389)**  
   *Why it matters:* Causes unrecoverable schema errors (`OpenAI Chat assistant messages only support text...`) across session histories on v2.3.2. (6 comments)
10. **[#61221 - Chat markdown ignores theme `--markdown-*` color tokens](https://github.com/anomalyco/opencode/issues/61221)**  
    *Why it matters:* Causes web and desktop chat renderers to output monochrome text while the TUI correctly displays themed markdown styles. (5 comments, 👍 2)

---

## 4. Key PR Progress
1. **[#66501 - Add opt-in "Install updates on quit" setting](https://github.com/anomalyco/opencode/pull/66501)** — Introduces a clean user toggle under desktop general settings to manage background update behaviors.
2. **[#66502 - Scope background fibers and derive InternalPlugin services](https://github.com/anomalyco/opencode/pull/66502)** — Enhances core Effect runtime hygiene by ensuring background shell and watcher fibers tear down safely.
3. **[#66498 - Gate VCS, Snapshot, Worktree, and Project on Environment](https://github.com/anomalyco/opencode/pull/66498)** — Securely segregates host-local operations to prevent remote workspaces from probing host disks.
4. **[#66497 - Add opt-in read_terminal tool](https://github.com/anomalyco/opencode/pull/66497)** — Exposes a read-only view of persistent terminals, letting agents inspect screen output without command side-effects.
5. **[#66499 - Desktop: First-quit background notice and setting](https://github.com/anomalyco/opencode/pull/66499)** — Addresses user surprise regarding background services (terminals and MCP servers) persisting after app closure.
6. **[#66495 - Type Bus commit errors and settle OAuth Deferreds synchronously](https://github.com/anomalyco/opencode/pull/66495)** — Refines Effect Bus error handling for cleaner rollback management.
7. **[#66217 - Stream remote browser traffic over multiplexed binary WebSocket](https://github.com/anomalyco/opencode/pull/66217)** — Yields massive speedups (e.g., loading complex web apps 3.3x faster) for remote browser instances.
8. **[#66377 - Preserve hosted tool history in Chat replay](https://github.com/anomalyco/opencode/pull/66377)** — Fixes API rejections when replaying assistant history containing provider-executed tools.
9. **[#66469 - Expose resolved feature flags at `/api/experimental/flag`](https://github.com/anomalyco/opencode/pull/66469)** — Location-scoped API endpoint additions for modern feature flag management.
10. **[#66486 - Honor terminal cursor shape escapes](https://github.com/anomalyco/opencode/pull/66486)** — Fixes terminal integrations (like Neovim mode transitions) failing to update cursor styles properly via `DECSCUSR`.

---

## 5. Feature Request Trends
- **Session Management & Organization:** Strong community demand for advanced controls, including bulk deletion by date/project ([#66468](https://github.com/anomalyco/opencode/issues/66468)), session archiving subcommands ([#63518](https://github.com/anomalyco/opencode/issues/63518)), and session "snoozing/pausing" with clock indicators ([#64249](https://github.com/anomalyco/opencode/issues/64249)).
- **UI/UX Customization & Navigation:** Requests for persistent file preview trees outside of active chats ([#60379](https://github.com/anomalyco/opencode/issues/60379)), project sidebar enhancements with context menus ([#66491](https://github.com/anomalyco/opencode/issues/66491)), and GUI controls for custom provider model lists ([#33704](https://github.com/anomalyco/opencode/issues/33704)).
- **Granular Token Transparency:** Developers want deeper visibility into token economy breakdowns inside execution steps—separating system prompts, schemas, tool results, and reasoning tokens ([#58716](https://github.com/anomalyco/opencode/issues/58716)).

---

## 6. Developer Pain Points
- **Windows Terminal & Subprocess Instability:** Developers face persistent headaches with child processes ignoring `Ctrl+C` interruptions ([#61899](https://github.com/anomalyco/opencode/issues/61899)) and edge cases where model-generated path escapes cause severe file deletion bugs via Windows cmd/PowerShell mismatches ([#66449](https://github.com/anomalyco/opencode/issues/66449)).
- **Remote & Shared Service Sync Failures:** Maintaining remote SSH connections across patch updates ([#60665](https://github.com/anomalyco/opencode/issues/60665)) and syncing provider models (like GitHub Copilot) in shared background daemon modes ([#60702](https://github.com/anomalyco/opencode/issues/60702)) continue to interrupt daily developer workflows.
- **State and Migration Gremlins:** Database and session transitions (such as v1 to v2 session upgrades or SQLite concurrency limits under `opencode run` parallelizations) frequently bubble up into abrupt schema errors and transaction failures ([#66389](https://github.com/anomalyco/opencode/issues/66389), [#65020](https://github.com/anomalyco/opencode/issues/65020)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest: 2026-11-26

### 1. Today's Highlights
The Pi ecosystem saw a high-intensity focus on terminal stability and AI model provider reliability over the last 24 hours. A significant wave of fixes addressed persistent TUI issues on Windows and improved model configuration logic for Bedrock and GitHub Copilot, ensuring smoother integration for developers using enterprise AI features.

### 2. Releases
*   **v1.6.1:** Introduces decision model support in `codemode` via `models.classify()`, allowing developers to integrate GitHub Copilot’s `gpt-6-luna-decisions` and Radius models directly into their workflows. [View Release](https://github.com/earendil-works/pi/blob/v1.6.1/packages/coding-agent)

### 3. Hot Issues
*   **[#12133](https://github.com/earendil-works/pi/issues/12133):** Windows terminal echoes garbage input due to un-toggled mouse reporting. High-impact TUI usability issue.
*   **[#10390](https://github.com/earendil-works/pi/issues/10390):** Anthropic SSE parser fails on split CRLF chunks, causing intermittent JSON parse errors.
*   **[#12464](https://github.com/earendil-works/pi/issues/12464):** OpenAI API-key auth incorrectly suppresses reasoning on tool turns; critical for power users.
*   **[#12318](https://github.com/earendil-works/pi/issues/12318):** `/login` failure for Claude Team/Enterprise users due to scope rejection.
*   **[#11383](https://github.com/earendil-works/pi/issues/11383):** ANSI escape sequences leaking into prompt text during paste operations.
*   **[#12548](https://github.com/earendil-works/pi/issues/12548):** Kitty image rendering issues leading to wiped scrollback buffers.
*   **[#11127](https://github.com/earendil-works/pi/issues/11127):** Request for configurable idle cache-warming horizons beyond the default 30 minutes.
*   **[#12546](https://github.com/earendil-works/pi/issues/12546):** Memory leaks in `AgentSession` due to retained closures, risking OOM in long-running processes.
*   **[#12466](https://github.com/earendil-works/pi/issues/12466):** OpenAI model catalog mismatch between OAuth and API-key authentication modes.
*   **[#12483](https://github.com/earendil-works/pi/issues/12483):** Infinite loop on failed auto-compaction; requires logic to halt after N attempts.

### 4. Key PR Progress
*   **[#12562](https://github.com/earendil-works/pi/pull/12562):** Adds `deleteConversations` for permanent removal of persistent task/chat data.
*   **[#12557](https://github.com/earendil-works/pi/pull/12557):** Implements OSC 7577 for program resume after terminal restarts.
*   **[#12553](https://github.com/earendil-works/pi/pull/12553):** Adds `SIGBREAK` handling for graceful Windows shutdown.
*   **[#12556](https://github.com/earendil-works/pi/pull/12556):** Implements `DO_NOT_TRACK` header compliance to improve privacy audit ratings.
*   **[#12539](https://github.com/earendil-works/pi/pull/12539):** Preserves prompt cache across effort and tool changes for GitHub Copilot.
*   **[#12551](https://github.com/earendil-works/pi/pull/12551):** Fixes Bedrock Kimi K3.1 reasoning effort selection by correctly passing fields.
*   **[#12505](https://github.com/earendil-works/pi/pull/12505):** Fixes reasoning replay for GitHub Copilot `reasoning_opaque` deltas.
*   **[#12555](https://github.com/earendil-works/pi/pull/12555):** Optimizes Bedrock Kimi requests to avoid prohibited reasoning context.
*   **[#12523](https://github.com/earendil-works/pi/pull/12523):** Ensures `models.json` errors are explicitly reported in all runtime modes.
*   **[#12543](https://github.com/earendil-works/pi/pull/12543):** Adds support for `AGENTS.local.md` as an additional configuration layer.

### 5. Feature Request Trends
*   **Durable Operations:** A strong push for more robust "Durable" agent capabilities, including better batching for tool calls and conversation management (#12471, #10852).
*   **Unified Configuration:** Developers are requesting more granular control over resource resolution, such as namespace management and local file overrides (#8834).
*   **Transparency:** High demand for clearer diagnostic reporting regarding model availability and internal configuration errors.

### 6. Developer Pain Points
*   **Windows Environment:** Frequent issues with TUI cleanup, terminal control sequences, and process lifecycle management (Ctrl+C/Ctrl+Break).
*   **Reliability vs. Features:** Recurrent bugs in SSE stream parsing and auto-compaction loops are causing frustration with long-running agent sessions.
*   **Provider Drift:** Rapid updates to AI models (like Kimi or GPT-6) are creating friction as the static catalog in Pi falls behind real-world API changes.

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