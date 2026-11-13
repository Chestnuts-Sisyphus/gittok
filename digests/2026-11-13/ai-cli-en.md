# AI CLI Tools Community Digest 2026-11-13

> Generated: 2026-11-13 00:48 UTC | Tools covered: 9

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

Here is the Claude Code community digest for November 13, 2026.

---

### 1. Today's Highlights
Anthropic released **Claude Code v2.1.323**, introducing an experimental **Code Mode** where Claude writes JavaScript code to execute tool calls. On the community front, critical discussions are dominated by a massive privacy report regarding email addresses leaking in `User-Agent` search headers, as well as side effects from telemetry suppression flags breaking model feature flag updates.

---

### 2. Releases
*   **v2.1.323**: 
    *   **Code Mode (Experimental)**: Added an opt-in mode where Claude writes JavaScript to call tools directly. This can be enabled via settings or toggled off at the organizational level ([Docs](https://code.claude.com/docs/en/code-mode)).
    *   **Plugin Engine Validation**: Added `engines["claude-code"]` field to `plugin.json` to enforce compatibility rules for external plugins.

---

### 3. Hot Issues

1.  **[#107757](https://github.com/anthropics/claude-code/issues/107757): Privacy violation in User-Agent header (796 👍, 118 comments)**  
    Developers report that Claude Code includes user email addresses in `User-Agent` headers during arbitrary 3rd-party web searches without explicit permission, leading to severe privacy and spam concerns.

2.  **[#84862](https://github.com/anthropics/claude-code/issues/84862): Feature Request: Passkey (WebAuthn) sign-in (182 👍, 37 comments)**  
    High demand for standardizing WebAuthn/Passkey support across Claude accounts and CLI auth flows to streamline sign-in and replace fragile email magic links.

3.  **[#108726](https://github.com/anthropics/claude-code/issues/108726): `DISABLE_TELEMETRY=1` breaks feature flags and model availability (23 👍, 8 comments)**  
    Setting `DISABLE_TELEMETRY=1` inadvertently prevents Claude Code from checking disk/remote feature flags, causing new model targets (such as Fable 5.2) to disappear silently from the `/model` selector.

4.  **[#90471](https://github.com/anthropics/claude-code/issues/90471): VS Code Extension: `Unsupported content type: advisor_tool_result` (10 👍, 9 comments)**  
    When the internal `advisor()` tool is triggered inside VS Code, the webview fails to render the tool's result block properly despite the backend model executing it correctly.

5.  **[#92684](https://github.com/anthropics/claude-code/issues/92684): Linux sandbox ignores `denyWrite` rules containing mid-path wildcards (2 👍, 3 comments)**  
    A security bug where filesystem sandbox policy enforcement silently skips write restriction rules on Linux if a wildcard exists in the middle of a path definition.

6.  **[#94728](https://github.com/anthropics/claude-code/issues/94728): Resuming background subagents misses prompt cache (3 👍, 3 comments)**  
    Resuming background agent execution invalidates the prompt cache due to state mutation (`messages_changed`), stripping out extended thinking blocks and driving up token costs.

7.  **[#106049](https://github.com/anthropics/claude-code/issues/106049): Cloud sessions cannot attach images to PRs or issues (7 👍, 2 comments)**  
    Cloud environments route GitHub interactions through a proxy that rejects GraphQL uploads, preventing Claude from attaching visual artifacts/images directly to pull requests.

8.  **[#108777](https://github.com/anthropics/claude-code/issues/108777): Desktop `/btw` side-chat context is isolated from main session (1 👍, 1 comment)**  
    The `/btw` side-chat pane forks execution into a hidden session without notifying the main session context, causing context disconnects when users ask the primary agent about side-chat actions.

9.  **[#109420](https://github.com/anthropics/claude-code/issues/109420): Terminal output byte corruption in background sessions (0 👍, 0 comments)**  
    Attached terminal clients reading background agent output report dropped or duplicated bytes at 1024-byte buffer boundaries.

10. **[#109397](https://github.com/anthropics/claude-code/issues/109397): `bypassPermissions` auto-denies unparseable `rm` commands in unattended mode (0 👍, 1 comment)**  
    In unattended automation setups, complex `rm` bash executions that fail parser classification fall back to auto-denial despite `bypassPermissions` being explicitly enabled.

---

### 4. Key PR Progress

*   **[#81672](https://github.com/anthropics/claude-code/pull/81672): `fix(hookify)`: Path-independent package imports**  
    Fixes plugin import failures (`#69665`, `#81448`) by removing the assumption that the `hookify` directory name strictly matches the plugin root path during marketplace installations.

---

### 5. Feature Request Trends

*   **Agent SDK & External Tool Integration**: Developers are urging Anthropic to open up UI features to the Agent SDK and `stream-json` interfaces—specifically requesting access to voice dictation ([#108577](https://github.com/anthropics/claude-code/issues/108577)) and CLI session state inspection ([#102365](https://github.com/anthropics/claude-code/issues/102365)).
*   **Multi-Agent Background Management**: As users run more concurrent headless sessions (`claude --bg`), management tools like `claude stop --all` ([#109414](https://github.com/anthropics/claude-code/issues/109414)) are becoming essential for task lifecycle control.
*   **Visual & UI Parity**: Community requests emphasize small contextual cues, such as support for custom MCP server icons ([#108788](https://github.com/anthropics/claude-code/issues/108788)) and re-adding Git branch indicators in Code tab sessions ([#109412](https://github.com/anthropics/claude-code/issues/109412)).

---

### 6. Developer Pain Points

*   **Unintended Data Exposure in Telemetry/Headers**: The discovery that user email addresses are being transmitted in HTTP `User-Agent` request headers during automated searches ([#107757](https://github.com/anthropics/claude-code/issues/107757)) has sparked major privacy concerns among enterprise users.
*   **Coupling Telemetry Flags to Core Feature Toggles**: Disabling telemetry using standard environment variables (`DISABLE_TELEMETRY=1`) side-effects feature flag evaluation, breaking model selection without throwing clear errors ([#108726](https://github.com/anthropics/claude-code/issues/108726)).
*   **Subagent Resiliency & Caching Expenses**: Background sessions frequently lose context cache integrity on resume, resulting in unexpected API token costs and missing model reasoning blocks ([#94728](https://github.com/anthropics/claude-code/issues/94728)).

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

# GitHub Copilot CLI Community Digest — 2026-11-13

## 1. Today's Highlights
The latest `v1.0.110` (and `v1.0.110-3`) releases introduce experimental support for masking git, ssh, and sudo password prompts, alongside accessibility improvements for screen readers and UI wrap fixes. Meanwhile, the community is actively raising reports around Model Context Protocol (MCP) authentication limitations—specifically regarding Entra broker token caches and Google Workspace OAuth trailing-slash mismatches—as well as subagent tool permissions and context budget behaviors.

---

## 2. Releases
### [v1.0.110 & v1.0.110-3](https://github.com/github/copilot-cli/releases)
* **Experimental Agent Capabilities**: Added masked dialog support to answer git, ssh, and sudo password prompts from agent commands (enable with `/experimental on`).
* **Authentication Polish**: Prevented unnecessary error popups during Microsoft Entra sign-in when an organization account is already available.
* **Accessibility & UI**: Updated screen readers to identify the current session and announce when sessions need attention or are idle. Fixed terminal width wrapping for `/usage` model rows.

---

## 3. Hot Issues
1. **[#5236 Windows: Entra broker token cache stays 0 bytes after MCP sign-in](https://github.com/github/copilot-cli/issues/5236)**
   * *Why it matters:* Forces users to continuously re-authenticate via the account picker for HTTP MCP servers on Windows.
2. **[#4606 Google Workspace MCP OAuth fails on accounts.google.com trailing-slash issuer mismatch](https://github.com/github/copilot-cli/issues/4606)**
   * *Why it matters:* Prevents native HTTP MCP authentication from initiating for official Google Workspace endpoints due to metadata trailing slash discrepancies.
3. **[#4837 Policy-driven enabledPlugins installs plugin but persists "enabled": false](https://github.com/github/copilot-cli/issues/4837)**
   * *Why it matters:* Breaks MDM, device, and repo-level configurations where administrative plugin policies fail to self-activate.
4. **[#5151 Regression: default-context Sol models rejected before first prompt](https://github.com/github/copilot-cli/issues/5151)**
   * *Why it matters:* Bloated tool definitions (growing from 15K to ~260K tokens) cause `gpt-5.6-sol` and `gpt-6.1-sol` to breach usable context budgets immediately.
5. **[#4922 Feature request: Attach an existing chat or session to a Project](https://github.com/github/copilot-cli/issues/4922)**
   * *Why it matters:* Forces users to abandon existing general chat sessions if they later decide to organize them inside a Project framework.
6. **[#5435 Repeated out-of-memory crash during a long interactive session in 1.0.109](https://github.com/github/copilot-cli/issues/5435)**
   * *Why it matters:* Disrupts developer workflows during extended sessions, breaking active background agents upon session resumption.
7. **[#5363 ACP `session/new` reports a `model` that the session is not running](https://github.com/github/copilot-cli/issues/5363)**
   * *Why it matters:* Creates discrepancy between advertised ACP model states and actual runtime execution until explicit `session/set_config_option` calls.
8. **[#5243 Subagents started in same turn as approved `exit_plan_mode` lose built-in tools](https://github.com/github/copilot-cli/issues/5243)**
   * *Why it matters:* Cripples background task execution by stripping critical built-in utilities (`bash`, `edit`, `grep`, etc.) post-plan approval.
9. **[#4467 Long-running agent sessions exhaust event storage and appear cancelled](https://github.com/github/copilot-cli/issues/4467)**
   * *Why it matters:* Misleads developers into thinking active, healthy CLI processes have terminated due to remote session event store exhaustion.
10. **[#5447 ACP mode never attaches to the IDE: `--acp` skips `~/.copilot/ide` discovery](https://github.com/github/copilot-cli/issues/5447)**
    * *Why it matters:* Breaks "Visual Studio Connected" features and IDE integrations when running under Agent Client Protocol (`--acp`) mode.

---

## 4. Key PR Progress
*(No new Pull Requests were updated within the last 24 hours.)*

---

## 5. Feature Request Trends
* **BYOK and Configuration Schemas:** Greater demand for published JSON schemas (`providers.json`) to streamline custom model provider setups (Issue [#5287](https://github.com/github/copilot-cli/issues/5287)).
* **Workspace & Worktree Hygiene:** Requests to automatically reuse or release inactive Git worktrees to prevent disk bloat from accumulated caches and virtual environments (Issue [#5443](https://github.com/github/copilot-cli/issues/5443)).
* **Enhanced VIM & Navigation Controls:** Support for tool triggers and commands (like `:q` and `:model`) directly from normal mode within VIM integrations (Issue [#5442](https://github.com/github/copilot-cli/issues/5442)).
* **Session Management:** Better linkage between general chats, projects, and delegated coordinator structures (Issues [#4922](https://github.com/github/copilot-cli/issues/4922), [#5444](https://github.com/github/copilot-cli/issues/5444)).

---

## 6. Developer Pain Points
* **MCP & OAuth Friction:** Repeated prompts and token cache invalidations across platforms (Entra token caches staying at 0 bytes on Windows [#5236](https://github.com/github/copilot-cli/issues/5236); macOS keychain prompts re-appearing despite "Always Allow" selections [#5434](https://github.com/github/copilot-cli/issues/5434); and delegated `task` subagents failing HTTP-OAuth authentication [#5437](https://github.com/github/copilot-cli/issues/5437)).
* **Subagent Permission & Tool Disconnects:** General-purpose subagents unexpectedly refusing authorized `/tmp` writes despite parent allowances (Issue [#5441](https://github.com/github/copilot-cli/issues/5441)) and child tasks dropping native tool definitions after plan approvals (Issue [#5243](https://github.com/github/copilot-cli/issues/5443)).
* **Resource and Memory Limits:** Growing tool snapshot caches exhausting memory at startup (Issue [#5446](https://github.com/github/copilot-cli/issues/5446)) and static context bounds breaking Sol models when definitions swell (Issue [#5151](https://github.com/github/copilot-cli/issues/5151)).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest (2026-11-13)

Welcome to the daily technical digest for **MoonshotAI/kimi-cli**. Below is a summary of developer activity, pull requests, and ecosystem trends over the past 24 hours.

---

### 1. Today's Highlights
Developer activity for Kimi Code CLI over the last 24 hours has been extremely quiet, with no new releases or active issues reported. The primary development update centers around the closure of a significant architectural pull request introducing a multi-layered configuration framework, signaling ongoing maturation in how the CLI manages rules and context.

---

### 2. Releases
*No new releases were published in the last 24 hours.*

---

### 3. Hot Issues
*No active or updated issues were recorded in the last 24 hours.*

---

### 4. Key PR Progress
* **[#1777 [CLOSED] feat: three-tier rules system](https://github.com/MoonshotAI/kimi-cli/pull/1777)**
  * **Description:** Authored by Nemo4110, this pull request introduces a hierarchical "three-tier rules system" designed to give developers finer-grained control over context and prompt enforcement in the CLI. Although closed without a direct merge in this cycle, it highlights ongoing architectural efforts to structure agent behavior across global, project, and task scopes.

---

### 5. Feature Request Trends
*Based on the current 24-hour snapshot showing minimal raw issue traffic, broader recurring feature request directions derived from recent architectural trajectories include:*
* **Hierarchical Context Management:** Strong interest in structured, multi-tier rule implementations (as evidenced by PR #1777) to govern agent responses at different organizational levels (global, repository, and local).
* **Deterministic Behavior Enforcement:** Developers continue to seek better mechanisms to constrain LLM outputs and workflows via declarative configurations.

---

### 6. Developer Pain Points
* **Configuration Complexity:** As tools like Kimi Code CLI scale to support advanced governance (such as multi-tier rules), developers frequently express the need for intuitive override hierarchies to prevent rule conflicts between global defaults and local project settings.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode Community Digest: 2026-11-13

### Today's Highlights
The OpenCode ecosystem is currently focused on stabilizing the V2 architecture, with significant activity surrounding AI-agent orchestration and tool-calling reliability. Notable progress includes the introduction of an "Advisor" tool pattern and refinements to how the core engine handles model context and tool-repair logic.

---

### Hot Issues
1. **[#2242] Sandbox Agent Access:** With 115 comments and 84 reactions, this remains the definitive discussion on securing agent file system access.
2. **[#785] Streaming Mode:** Users continue to struggle with proxies that don't support streaming; this issue highlights the need for a non-streaming fallback.
3. **[#49742] CLI Timestamp Regression:** A vocal request to restore the message timestamp toggle (Ctrl+P) lost in the transition to V2 CLI.
4. **[#53756] Bedrock/Nova Inference Profile:** A critical bug where Bedrock application ARNs cause incorrect model-format inference, leading to 400 errors.
5. **[#26915] RTL Support:** The community is pushing for better accessibility in the chat panel for Arabic, Hebrew, and Persian speakers.
6. **[#63506] Stale Model Footer:** A UI bug where the TUI prompt footer fails to update when slash commands switch the active model.
7. **[#61504] Permission Timeouts:** A request to prevent sessions from hanging indefinitely when waiting for user authorization on agent tools.
8. **[#63483] Web Worktree Bug:** An issue where expanding folders in Git worktrees via the web UI pulls from the main checkout instead of the active branch.
9. **[#59806] Console MCP 403s:** Reports of silent connection failures and re-connect loops when using the `opencode_console` MCP server.
10. **[#62948] Git Polling CPU Spike:** A performance fix for large monorepos where constant Git status scanning triggers resource exhaustion.

---

### Key PR Progress
1. **[#63637] Advisor Tool:** Implements an "Advisor" pattern allowing the primary model to consult a secondary model for complex decision-making.
2. **[#63354] Auto-Balance Go Accounts:** Introduces an experimental configuration to automatically balance API usage across multiple credentials.
3. **[#63641] Structured Answer Replays:** Fixes an issue where structured tool outputs were being mislabeled as "missing," improving data integrity.
4. **[#63590] Message Metadata Persistence:** Ensures plugin-added metadata is correctly passed to session hooks, fixing context-loss bugs.
5. **[#63612] Local Model Cleanup:** New feature to automatically unload local models upon `/clear` or `/exit` to free up system memory.
6. **[#63636] Prompt Cache Standardization:** Tests now enforce strict 64-character limits and default behaviors for prompt caching across APIs.
7. **[#63633] Code Mode Tool Repair:** Allows tools to honor repair hooks during tool-name mismatches, preventing execution errors.
8. **[#63227] Subagent Concurrency Cap:** Adds a hard limit to concurrent subagent execution to prevent runaway costs and resource usage.
9. **[#63436] Streaming Fetch Bodies:** Allows Code Mode to read partial HTTP response chunks before a full download is complete.
10. **[#63634] Video Protocol Cleanup:** Prunes legacy video protocols (Gemini Veo/Runway) to align with current provider availability.

---

### Feature Request Trends
*   **Model Orchestration:** Increasing interest in multi-model architectures (e.g., Advisor tools, subagent management) to improve response quality.
*   **Enterprise Integration:** Strong demand for better account management (auto-balancing) and professional deployment tools (MSI installers).
*   **Fine-grained Control:** Users are pushing for more manual overrides, including session-specific tool availability and configurable streaming/caching behaviors.

---

### Developer Pain Points
*   **V2 Migration Friction:** Developers are encountering "lost functionality" (e.g., missing timestamps, broken UI states) when moving from v1 to v2.
*   **Tooling/Plugin Instability:** Recurring issues with tools failing to execute correctly after model/context changes, and the lack of error transparency in the CLI/TUI.
*   **Resource Management:** Performance issues in large Git repositories and memory management for local LLM inference are becoming high-priority blockers for enterprise adoption.

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