# AI CLI Tools Community Digest 2026-11-21

> Generated: 2026-11-21 00:59 UTC | Tools covered: 9

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

⚠️ Skills summary generation failed.

---

Here is the Claude Code community digest for **November 21, 2026**.

---

### 1. Today's Highlights
Release **v2.1.330** brings enterprise auth integration via the Enterprise Admin Console alongside `easel`, a built-in mod for inline metrics charting. Primary community discussions revolve around Remote Control session reliability during background updates, UI rendering disparities between CLI and Desktop/Mobile views, and workflow handoffs.

---

### 2. Releases
* **[v2.1.330](https://github.com/anthropics/claude-code/releases/tag/v2.1.330)**
  * **Enterprise Auth:** `claude auth login` now integrates directly with Anthropic’s Enterprise Admin Console, inheriting organization policies, cloud providers, and custom gateways.
  * **Built-in Mod (`easel`):** Adds built-in charting capabilities triggered by user prompts or incoming Model Context Protocol (MCP) metrics payloads.

---

### 3. Hot Issues

1. **[#51828](https://github.com/anthropics/claude-code/issues/51828) - Scrollback duplication on terminal resize in VS Code (macOS)**  
   * **Why it matters:** Resizing the integrated VS Code terminal causes line duplication in the TUI, degrading readability over long coding sessions.  
   * **Community reaction:** Highly upvoted (38 👍); remains a persistent TUI regression across minor releases.

2. **[#95364](https://github.com/anthropics/claude-code/issues/95364) - Desktop auto-updates terminate active Remote Control sessions**  
   * **Why it matters:** Background "stealth updates" quit and restart the desktop app when idle, unexpectedly severing remote sessions established via `claude.ai/code`.  
   * **Community reaction:** Strong feedback (24 👍, 22 comments) requesting configurable update windows or session persistence across restarts.

3. **[#79808](https://github.com/anthropics/claude-code/issues/79808) - Blocked CLI login due to suppressed verification emails**  
   * **Why it matters:** Authentication fails when system emails are suppressed, and automated support lacks an escalation path for identity verification.  
   * **Community reaction:** 31 comments highlighting frustration with strict security controls blocking developer onboarding.

4. **[#99217](https://github.com/anthropics/claude-code/issues/99217) - Mod `ui.render` components missing in Remote Control Desktop/iOS views**  
   * **Why it matters:** Custom mod visual elements (e.g., `AbovePrompt` bands, action buttons) render fine in native TUI but fail to display over Remote Control on mobile or desktop apps.  
   * **Community reaction:** High impact for team tool builders targeting remote workflows.

5. **[#110673](https://github.com/anthropics/claude-code/issues/110673) - Feature: Bring Code Mode into Desktop App's Code Tab**  
   * **Why it matters:** Developers want experimental Code Mode (`CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1`) made accessible outside the interactive CLI terminal interface.

6. **[#85654](https://github.com/anthropics/claude-code/issues/85654) - Slash commands inside collapsed pastes fail to trigger**  
   * **Why it matters:** Commands wrapped in `[Pasted text #N]` blocks bypass command routing and send as plain text prompts instead.

7. **[#92434](https://github.com/anthropics/claude-code/issues/92434) - Token compacting timing causes instruction context overflows**  
   * **Why it matters:** Auto-compact checks token counts against the *previous* turn rather than evaluating the current payload, causing newly re-injected project context files to exceed context windows.

8. **[#98937](https://github.com/anthropics/claude-code/issues/98937) - Feature: Single-command CLI session handoff to teammates**  
   * **Why it matters:** Proposes a seamless handoff command to pass context and session state directly to another developer's environment.

9. **[#109419](https://github.com/anthropics/claude-code/issues/109419) - Windows Desktop Remote Control toggles off automatically when idle**  
   * **Why it matters:** Even with "Enable remote control by default" active, sessions turn off remote access within an hour of user inactivity.

10. **[#79223](https://github.com/anthropics/claude-code/issues/79223) - Undocumented `CLAUDE_SECURESTORAGE_CONFIG_DIR` environment variable**  
    * **Why it matters:** Ecosystem tools rely on overriding the credential store location, but the variable lacks official documentation.

---

### 4. Key PR Progress

* **[#111198](https://github.com/anthropics/claude-code/pull/111198) - Prevent `@claude` mentions from executing on PRs from forks**  
  * **Summary:** Restricts bot execution triggered by `@claude` comments on pull requests originating from external repository forks to prevent untrusted workflow execution and resource abuse.

---

### 5. Feature Request Trends

* **Cross-Environment Feature Parity:** Users are pressing for parity between the CLI TUI, Desktop app tabs, and Web/iOS Remote Control interfaces—specifically requesting features like experimental Code Mode ([#110673](https://github.com/anthropics/claude-code/issues/110673)) and full mod rendering ([#99217](https://github.com/anthropics/claude-code/issues/99217)) across all platforms.
* **Team & Multi-Device Collaboration:** Enhanced collaboration tools, such as direct CLI session handoffs ([#98937](https://github.com/anthropics/claude-code/issues/98937)) and better multi-account configuration handling ([#98526](https://github.com/anthropics/claude-code/issues/98526)), are gaining traction.

---

### 6. Developer Pain Points

* **Remote Control Disconnection:** Unannounced background app restarts ([#95364](https://github.com/anthropics/claude-code/issues/95364)) and aggressive idle timeouts ([#109419](https://github.com/anthropics/claude-code/issues/109419)) frequently break remote sessions while developers are away from primary workstations.
* **Rendering & Output Truncation:** UI glitches in terminal multiplexers ([#108098](https://github.com/anthropics/claude-code/issues/108098)) and line duplication on terminal resize ([#51828](https://github.com/anthropics/claude-code/issues/51828)) degrade long-running interactive debugging sessions.
* **Safety Filter False Positives in Embedded/Firmware Systems:** Standard low-level debugging (e.g., investigating microcontroller buffer overflows or flashing firmware) triggers aggressive safety filter blocks ([#94161](https://github.com/anthropics/claude-code/issues/94161)–[#94167](https://github.com/anthropics/claude-code/issues/94167)), requiring manual intervention.

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

# GitHub Copilot CLI Community Digest — 2026-11-21

## 1. Today's Highlights
The latest updates to the GitHub Copilot CLI focus on security sandboxing improvements for Windows and macOS environments, alongside vital UI fixes for the `@` mention picker and model configuration shortcuts (`Ctrl+X` then `A` in `/model`). Meanwhile, the community is actively tracking critical interoperability bottlenecks, including Windows security software false positives (`Cortex XDR`), remote MCP OAuth token refresh failures, and session lifecycle resilience.

---

## 2. Releases
Two rapid-fire release iterations rolled out, bringing crucial security controls and UI polish:

*   **v1.0.115-3**
    *   **Fixed:** Kept the `@` mention picker visible until empty searches conclude, ensuring `Ctrl+Y` and `Tab` retain normal behaviors upon close.
*   **v1.0.115-2**
    *   **Added:** Enabled Windows sandbox package queries by default (opt-out available via `sandbox.userPolicy.capabilities` set to `[]`).
    *   **Added:** Allowed specific macOS Mach service lookups in sandboxed commands via `sandbox.userPolicy.seatbelt.extraMachLookups` without exposing Keychain access.
    *   **Added:** Implemented `Ctrl+X` then `A` shortcut sequence within `/model`.

---

## 3. Hot Issues
Here are 10 noteworthy issues currently being discussed by the community:

1.  **[#5478 - Cortex XDR "parent_process_spoofing" kills the launching shell when Copilot CLI spawns `git`](https://github.com/github/copilot-cli/issues/5478)**
    *   *Why it matters:* Enterprise Windows environments using Palo Alto Cortex XDR suffer immediate shell crashes (`cmd`/`powershell`) when Copilot CLI triggers background `git` operations, rendering the CLI unusable on secured corporate machines.
    *   *Community reaction:* High priority for enterprise developers; active discussion on process invocation hardening.
2.  **[#4203 - Remote MCP (OAuth): expired access token forces interactive re-auth instead of silent `refresh_token` grant](https://github.com/github/copilot-cli/issues/4203)**
    *   *Why it matters:* Drops all MCP tools silently at session start if cached access tokens expire, bypassing valid refresh tokens and breaking headless or automated workflows.
    *   *Community reaction:* Frustrates users relying on OAuth-protected remote Model Context Protocol (MCP) servers.
3.  **[#4805 - Sessions become unrevivable: a stale `inuse.<pid>.lock` from a crashed host is never reclaimed on open](https://github.com/github/copilot-cli/issues/4805)**
    *   *Why it matters:* When a host process crashes, leftover lock files permanently trap valid JSONL session histories, locking users out of important work.
    *   *Community reaction:* Highlights a session lifecycle resilience gap that needs automated stale-lock cleanup.
4.  **[#5220 - Option for 1-hour prompt cache TTL for Claude models (5-minute cache expires during normal interactive use)](https://github.com/github/copilot-cli/issues/5220)**
    *   *Why it matters:* Anthropic's default 5-minute cache TTL frequently expires during thoughtful interactive development cycles, unnecessarily wasting tokens and re-caching conversation histories.
    *   *Community reaction:* Highly popular request (17 👍) among Claude model users looking to optimize cost and performance.
5.  **[#5468 - Remote control fails on GitHub Mobile and github.com: relay connect failed — "sealed value must bind this connection's challenge"](https://github.com/github/copilot-cli/issues/5468)**
    *   *Why it matters:* Cross-platform remote session control via GitHub Mobile (Android) or `github.com` breaks during relay connection validation.
    *   *Community reaction:* Limits on-the-go workflow inspection and mobile oversight.
6.  **[#5440 - Agent Plugins 1.0: `.instructions.md` files and `applyTo` frontmatter in `com.github.copilot/rules/` are silently ignored](https://github.com/github/copilot-cli/issues/5440)**
    *   *Why it matters:* Custom rules and instructions defined in Agent Plugins 1.0 packages are dropped without warnings, undermining modular prompt engineering setups.
    *   *Community reaction:* Developer friction regarding modern plugin specification compliance.
7.  **[#5071 - Windows: `/upgrade` on a winget install replaces the WinGet\Links alias and leaves winget/Add-Remove Programs on the old version](https://github.com/github/copilot-cli/issues/5071)**
    *   *Why it matters:* Self-updates executed via `/upgrade` clash with Windows Package Manager (`winget`) installations by overwriting shims directly, disconnecting future package tracking.
    *   *Community reaction:* Frustrating deployment quirk for Windows desktop users.
8.  **[#5541 - Agent ran `rsync -a --delete <dir>/ /` in WSL (empty variable after quoting failure) and irrecoverably wiped a user drive](https://github.com/github/copilot-cli/issues/5541)**
    *   *Why it matters:* A severe evaluation/execution bug where variable expansion failures in multi-line PowerShell-to-WSL heredocs constructed a catastrophic file-system wipe command.
    *   *Community reaction:* Extreme concern over safety boundaries and shell-string sanitization during complex cross-environment execution.
9.  **[#3064 - Stricter exit code when MCP servers fail to start (CI / agent use)](https://github.com/github/copilot-cli/issues/3064)**
    *   *Why it matters:* CI environments receive a misleading exit code `0` even when agents launch with zero tools because underlying MCP servers failed to start.
    *   *Community reaction:* Crucial for automation engineers building robust agentic GitHub Actions pipelines.
10. **[#5533 - Scrolled-up timeline jumps forward as output arrives](https://github.com/github/copilot-cli/issues/5533)**
    *   *Why it matters:* Reading past messages or expanding reasoning logs (`Ctrl+T`) is disrupted when incoming token generation auto-scrolls the terminal viewport.
    *   *Community reaction:* An annoying terminal rendering UX flaw interrupting reading flow.

---

## 4. Key PR Progress
*No pull requests were indexed in the last 24 hours.* (Active development is primarily visible through direct commit releases and issue triage cycles).

---

## 5. Feature Request Trends
*   **Granular Permission Scoping:** Developers want persistent, high-level directory read permissions (e.g., permanent access to specific home folders) without complex regex rules or repetitive prompts.
*   **Token & Credit Transparency:** Requests include tracking AI credits consumed directly inside session lists (e.g., a new AIC-used column) to audit session expenditures efficiently.
*   **Enhanced Claude Optimization:** High demand for controllable, extended prompt caching options to align with slower, human-paced interactive coding cadences.
*   **MCP Protocol Maturity:** Better error handling, case-insensitive server mapping (`/mcp <server>`), and strict task augmentation support for tools declaring `taskSupport: "required"`.

---

## 6. Developer Pain Points
*   **Cross-Platform Environment Friction:** Running Copilot CLI inside WSL2 or Windows causes distinct ecosystem hurdles, from authentication callback failures (e.g., WorkIQ OAuth returning 404s) to file lockups and installer desynchronization.
*   **Intermittent Security Software Clashes:** Aggressive EDR/XDR toolsets (like Cortex XDR) treating standard process spawning patterns as process spoofing attacks, abruptly killing terminal sessions.
*   **UI/UX Disruption During Prompts:** Nested terminal interfaces frequently reset or drop current inputs/dialogs when background permission prompts trigger unexpectedly.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-11-21

## 1. Today's Highlights
OpenCode development is heavily focused on refining multi-machine capabilities, strengthening Code Mode safety boundaries, and resolving cross-platform reliability bugs (particularly on Windows). Core contributors are actively addressing state management quirks like session tracking and expanding MCP protocol support, while users surface critical edge cases around filesystem snapshots and authorization tokens.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues
1. **[#64073 - Restore Foreground Subagent Execution](https://github.com/anomalyco/opencode/issues/64073)**  
   * **Why it matters:** Users are pushing to bring back foreground execution for subagents to improve observability during nested tasks.  
   * **Community reaction:** Highly active with 23 comments and 7 thumbs-up, signaling a strong user preference for more transparent subagent workflows.
2. **[#50979 - Project session move re-points global worktree](https://github.com/anomalyco/opencode/issues/50979)**  
   * **Why it matters:** Moving a session into an empty git repository inadvertently hijacks the `global` project's worktree.  
   * **Community reaction:** Considered a dangerous state-corruption bug that risks pointing global directories to unintended paths.
3. **[#52067 - Edit tool intermittently reports "Could not find oldString"](https://github.com/anomalyco/opencode/issues/52067)**  
   * **Why it matters:** Core file-editing capabilities break when the tool fails to match text due to whitespace or parsing quirks.  
   * **Community reaction:** Frustrating intermittent bug that breaks autonomous agent loops, drawing multiple reports and upvotes.
4. **[#65127 - Snapshots capture ignored and >2 MiB files](https://github.com/anomalyco/opencode/issues/65127)**  
   * **Why it matters:** The `/undo` filesystem snapshot feature ignores gitignore rules and packs massive data directories, bloating stores up to 90 GB.  
   * **Community reaction:** Severe disk space leak that requires immediate filtering fixes for large repository structures.
5. **[#64573 - Shell tool escapes double quotes on Windows/cmd](https://github.com/anomalyco/opencode/issues/64573)**  
   * **Why it matters:** Using `cmd` as the shell provider on Windows double-escapes quotes, causing commands to fail with literal `\"` arguments.  
   * **Community reaction:** Blocker for Windows developers relying on command-prompt automation.
6. **[#65253 - CLI upgrade via curl fails](https://github.com/anomalyco/opencode/issues/65253)**  
   * **Why it matters:** The built-in `opencode upgrade` command fails on standard installs when using the curl fallback method.  
   * **Community reaction:** Directly blocks seamless self-updates for users on Linux and restricted networks.
7. **[#58989 - Go proxy drops Anthropic-beta headers](https://github.com/anomalyco/opencode/issues/58989)**  
   * **Why it matters:** Requests routed through the Go proxy strip critical `anthropic-beta` and `anthropic-version` headers, silently disabling beta features.  
   * **Community reaction:** Breaks advanced feature parity when utilizing proxy infrastructure.
8. **[#65231 - Status line shows default model instead of --agent model](https://github.com/anomalyco/opencode/issues/65231)**  
   * **Why it matters:** The TUI composer status line displays the global default model rather than the model specified via the `--agent` flag.  
   * **Community reaction:** Causes confusion regarding which model is actively billing and responding during targeted runs.
9. **[#62085 - Cross-session/model image leakage](https://github.com/anomalyco/opencode/issues/62085)**  
   * **Why it matters:** Switching a session's model can cause images returned by tools earlier in the session to unexpectedly attach to subsequent prompts.  
   * **Community reaction:** Raises data hygiene and prompt-context pollution concerns.
10. **[#65220 - In-process plugin interrupts leave no trace](https://github.com/anomalyco/opencode/issues/65220)**  
    * **Why it matters:** Observability gap where host API session interrupts executed by plugins produce no logging or actionable reason metadata.  
    * **Community reaction:** Debugging nightmare for plugin authors tracking interrupted turn outcomes.

---

## 4. Key PR Progress
1. **[#65295 - Machine review fixes](https://github.com/anomalyco/opencode/pull/65295)**  
   * Fixes critical authorization inheritance bugs where approving file actions on one machine accidentally granted permissions across all connected nodes under the `machines` flag.
2. **[#65291 - Bound code mode tool call traces](https://github.com/anomalyco/opencode/pull/65291)**  
   * Limits nested tool call tracing in Code Mode to the 128 most recent finished calls, preventing memory bloat during deep execution loops.
3. **[#65261 - Agent widgets](https://github.com/anomalyco/opencode/pull/65261)**  
   * Introduces support for interactive agent widgets using PsychoScript templates and JSON data rendered natively across clients.
4. **[#65293 - Enable automations by default](https://github.com/anomalyco/opencode/pull/65293)**  
   * Switches automations to default-on across all distribution channels via an internal flag list.
5. **[#65271 - MCP Events push delivery beta](https://github.com/anomalyco/opencode/pull/65271)**  
   * Updates the experimental Model Context Protocol (MCP) push delivery client to match the SEP-3415 beta specification.
6. **[#65289 - ChatGPT refresh token handling](https://github.com/anomalyco/opencode/pull/65289)**  
   * Prompts users to reconnect their ChatGPT sessions when token endpoints reject expired or revoked refresh tokens with a 400 error.
7. **[#63637 - Advisor tool integration](https://github.com/anomalyco/opencode/pull/63637)**  
   * Adds an optional secondary model "advisor" tool inspired by Claude Code, allowing the primary session model to consult another model during execution.
8. **[#65282 - Negotiate newest MCP protocol by default](https://github.com/anomalyco/opencode/pull/65282)**  
   * Updates MCP servers without explicit protocol configuration to bypass legacy handshakes and negotiate the newer 2026-07-28 standard.
9. **[#65284 - Slower curl upgrades](https://github.com/anomalyco/opencode/pull/65284)**  
   * Extends the curl installer timeout to accommodate slower networks, fixing upgrade failures on constrained links.
10. **[#65268 - Machine management CLI commands](https://github.com/anomalyco/opencode/pull/65268)**  
    * Implements the server-side pairing and management routes (`opencode machine add`, `list`, `remove`) behind the `machines` feature flag.

---

## 5. Feature Request Trends
* **Cross-Machine Collaboration:** Growing emphasis on multi-device coordination, pairing strings, and remote command delegation.
* **Enhanced Agent Visibility & Interactivity:** Requests for UI components like interactive widgets, persistent thought-process toggles, and advisor sub-models.
* **Granular Lifecycle Control:** Better public APIs and boundary definitions for stopping, interrupting, and managing automated workflows programmatically.

---

## 6. Developer Pain Points
* **Windows-Specific Shell & CLI Quirks:** Issues with command escaping under `cmd.exe`, empty outputs for path arguments, and NumPad control anomalies in the TUI.
* **Filesystem & Snapshot Bloat:** Unintentional indexing of git-ignored paths and large binaries causing massive disk consumption via `/undo` snapshots.
* **Proxy and Routing Header Stripping:** Middleware proxies dropping specialized transport headers (like Anthropic beta keys), leading to silent capability downgrades.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest: 2026-11-21

## Today's Highlights
Pi v1.6.0 has arrived, bringing support for the GPT-6.2 model family, with "Sol" set as the new default across major providers. The community focus remains heavy on stability, with a surge of patches addressing Windows-specific shell issues, memory-related crashes in long sessions, and refined compatibility for Google Gemini's latest thinking levels.

## Releases
*   **[v1.6.0](https://github.com/earendil-works/pi/releases/tag/v1.6.0)**: Introduced **GPT-6.2 Astra** and **GPT-6.2 Sol** models across `openai`, `azure`, and `openai-codex` providers. GPT-6.2 Sol is now the default selection.

## Hot Issues
1.  **[#12367](https://github.com/earendil-works/pi/issues/12367)**: OpenAI models throwing `prefix_mismatch` errors, leading to dropped reasoning items in v1.6.0. High priority (p0).
2.  **[#12184](https://github.com/earendil-works/pi/issues/12184)**: Google adapters failing to recognize Gemini 4 Hydrogen's "xhigh" thinking level, despite it being exposed by the API.
3.  **[#12361](https://github.com/earendil-works/pi/issues/12361)**: GPT-6 models in 1.6.0 are defaulting to "medium" reasoning effort, ignoring user-selected "high/xhigh" flags.
4.  **[#12318](https://github.com/earendil-works/pi/issues/12318)**: Anthropic `/login` failures for Claude Team/Enterprise users due to scope issues.
5.  **[#12340](https://github.com/earendil-works/pi/issues/12340)**: Windows Git Bash silently truncating long RPC commands, causing hidden execution failures.
6.  **[#11127](https://github.com/earendil-works/pi/issues/11127)**: Request to allow configurable idle cache-warming horizons beyond the current 30-minute default.
7.  **[#12166](https://github.com/earendil-works/pi/issues/12166)**: Installer conflicts with existing `pi` packages on Ubuntu (APT).
8.  **[#12265](https://github.com/earendil-works/pi/issues/12265)**: Compaction model overrides failing to apply when routing to virtual models.
9.  **[#11383](https://github.com/earendil-works/pi/issues/11383)**: Terminal ANSI escape sequences breaking the TUI editor; unterminated pastes can lock up the interface.
10. **[#12150](https://github.com/earendil-works/pi/issues/12150)**: Malformed `codemode` tool calls (e.g., missing keys) are "poisoning" sessions and causing subsequent logic failures.

## Key PR Progress
1.  **[#12371](https://github.com/earendil-works/pi/pull/12371)**: Fixed Gemini 3+ detection for prefixed model IDs to enable strict tool use.
2.  **[#12360](https://github.com/earendil-works/pi/pull/12360)**: Resolved `RangeError` stack overflows occurring when loading sessions with >120k entries.
3.  **[#12366](https://github.com/earendil-works/pi/pull/12366)**: Optimized `createProvider` model merging, moving from quadratic to linear complexity.
4.  **[#12352](https://github.com/earendil-works/pi/pull/12352)**: Added retry logic for gateway-level "provider unavailable" and partial-response errors.
5.  **[#12369](https://github.com/earendil-works/pi/pull/12369)**: Remediation for Windows bash command truncation by using environment variables instead of command-line args.
6.  **[#12358](https://github.com/earendil-works/pi/pull/12358)**: Correctly reporting OpenAI Decisions cache read/write tokens in usage analytics.
7.  **[#12370](https://github.com/earendil-works/pi/pull/12370)**: Fixed chat history duplication issues caused by tree navigation.
8.  **[#12363](https://github.com/earendil-works/pi/pull/12363)**: Limited tool preview namespaces in code-mode to only those reachable by the agent.
9.  **[#12356](https://github.com/earendil-works/pi/pull/12356)**: Improved JSON mode error reporting, ensuring non-zero exit codes on failed responses.
10. **[#12349](https://github.com/earendil-works/pi/pull/12349)**: Forced UI repaints after programmatic text updates, ensuring extensions stay visible.

## Feature Request Trends
*   **Granular Cache Control**: Users want more control over prompt-caching TTL and warming cycles to optimize latency vs. cost.
*   **Expanded Provider Support**: Community interest in adding more specialized providers like Sarvam AI (#12258).
*   **Advanced Thinking Levels**: Increasing demand for better integration and native support for "xhigh" reasoning levels across all model families.

## Developer Pain Points
*   **Windows Environment Fragility**: Recurring issues with shell integration (Git Bash, Proxy handling) and installer name collisions on Linux.
*   **Context Management**: Handling "very long" sessions remains a struggle, with multiple bugs surfaced around stack limits and session loading.
*   **Tooling UI/UX**: Difficulties in inspecting tool calls during batch operations and managing editor state when content is pasted or manipulated by scripts.

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