# AI CLI Tools Community Digest 2026-09-30

> Generated: 2026-09-29 23:16 UTC | Tools covered: 9

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-30

## Today's Highlights

The OpenAI Codex ecosystem is moving forward with the release of version **`rust-v0.159.1`**, which introduces **GPT-6.1 Sol** as the default model across bundled catalogs, Amazon Bedrock Mantle, and Runtime catalogs. Alongside this rollout, development efforts are heavily concentrated on squashing Windows regressions—specifically addressing persistent terminal flashing caused by background daemons—and enhancing multi-agent V2/Ultra reasoning support.

---

## Releases

### [`rust-v0.159.1`](https://github.com/openai/codex/releases/tag/rust-v0.159.1)
* **New Features:** 
  * Added **GPT-6.1 Sol** as the default model in the bundled catalog, Amazon Bedrock Mantle, and Amazon Bedrock Runtime catalogs (PRs [#49323](https://github.com/openai/codex/pull/49323), [#49342](https://github.com/openai/codex/pull/49342)).
* **Other Notable Pre-releases/Changelog Activity:**
  * **`rust-v0.159.0`**: Introduced opt-in `instant_interrupt` for steering Codex mid-response ([#48135](https://github.com/openai/codex/issues/48135)) and streamlined session welcome screens ([#48513](https://github.com/openai/codex/issues/48513)).
  * **Alpha Iterations**: Active alpha testing tracks continue on branches `0.160.0-alpha.x` and `0.161.0-alpha.x` to prepare upcoming milestone drops.

---

## Hot Issues

1. **[#48074 - Windows: terminal windows repeatedly flash during requests after installing the Codex daemon](https://github.com/openai/codex/issues/48074)**
   * **Why it matters:** Generates severe visual noise on Windows 11 as background process polling spawns transient console windows.
   * **Community reaction:** Highly active with 116 comments and 138 thumbs-up; a primary driver for the immediate 0.159.2 backport efforts.
2. **[#49264 - Windows: CLI flashes a Windows Terminal window for every spawned command](https://github.com/openai/codex/issues/49264)**
   * **Why it matters:** Directly related to #48074, this regression surfaced in `codex-cli 0.159.0` for users running agent loops inside Windows Terminal and VS Code integrations.
3. **[#48466 - Every cold startup stalls on Loading; restarting only app-server restores UI](https://github.com/openai/codex/issues/48466)**
   * **Why it matters:** Blocks desktop application usability on Windows where the renderer/app-server handshake stalls indefinitely.
4. **[#35127 - Windows: new local chat in a ChatGPT project fails to sync project context](https://github.com/openai/codex/issues/35127)**
   * **Why it matters:** Breaks workflow integration by failing to inject root project configurations into fresh local chat sessions.
5. **[#19265 - Codex Desktop background exec intermittently deletes ~/.codex/skills/.system](https://github.com/openai/codex/issues/19265)**
   * **Why it matters:** Strips critical system skills (`imagegen`, `openai-internal`) out of active loops, degrading agent capability.
6. **[#48946 - Persistent startup spinner — app_start timeout after auth/renderer ready](https://github.com/openai/codex/issues/48946)**
   * **Why it matters:** Prevents the Windows desktop client from moving past the auth/renderer mount phase, surviving standard repairs and reinstalls.
7. **[#49362 - Sol 6.1 Not Appearing in Codex](https://github.com/openai/codex/issues/49362)**
   * **Why it matters:** Pro subscribers experienced synchronization delays where the newly announced GPT-6.1 Sol model failed to populate in the desktop model picker.
8. **[#32241 - macOS Codex App repeatedly resets healthy Remote Control streams with "stream became unknown"](https://github.com/openai/codex/issues/32241)**
   * **Why it matters:** Disrupts multi-device architectures by breaking active remote control sessions between macOS clients and Linux hosts.
9. **[#49349 - Codex web weekly allowance flips 58% → 16%; usage responses differ in account_id](https://github.com/openai/codex/issues/49349)**
   * **Why it matters:** Creates billing and tier-allocation confusion for ChatGPT Pro 20x users by displaying fluctuating usage quotas.
10. **[#47735 - Short-lived `codex app-server` processes orphan marketplace clones: detached upgrade thread + un-killed git child](https://github.com/openai/codex/issues/47735)**
    * **Why it matters:** Results in resource leaks and orphaned background Git operations left behind by short-lived server instances.

---

## Key PR Progress

1. **[#49386 - [0.160] Backport remaining Windows console fix to frozen alpha.6](https://github.com/openai/codex/pull/49386)**
   * Backports console suppression patches to resolve terminal flashing on the 0.160 testing track.
2. **[#49385 - [0.159] Backport Windows console suppression for 0.159.2](https://github.com/openai/codex/pull/49385)**
   * Cherry-picks critical daemon console fixes into the `release/0.159` line.
3. **[#49342 - [0.159] Backport GPT-6.1 Sol Bedrock catalogs](https://github.com/openai/codex/pull/49342)**
   * Integrates GPT-6.1 Sol as the default provider option for Amazon Bedrock Mantle and Runtime deployments.
4. **[#49360 - Carry shell invocation metadata and report executor PATH directories](https://github.com/openai/codex/pull/49360)**
   * Standardizes unified execution by tracking selected login shells and credential brokerage explicitly rather than guessing via args.
5. **[#49353 - Allow approved filesystem escalation while preserving denied reads](https://github.com/openai/codex/pull/49353)**
   * Modifies security permission boundaries to allow write access (like updating Git metadata) on explicitly approved tasks without compromising global read-denial policies.
6. **[#49345 - Enable multi-agent V2 and Ultra reasoning on Amazon Bedrock](https://github.com/openai/codex/pull/49345)**
   * Preserves model-declared `multi_agent_version` attributes and exposes Ultra reasoning options in advanced pickers.
7. **[#49357 - Continue Markdown blockquotes when pasting multiline text](https://github.com/openai/codex/pull/49357)**
   * Enhances the TUI composer to automatically prepend `> ` prefixes across all pasted lines within a blockquote.
8. **[#49330 - Keep remote control reconnect backoff capped during sustained failures](https://github.com/openai/codex/pull/49330)**
   * Fixes an edge case where hitting the backoff cap reset retry limits, triggering tight loops during prolonged connection drops or HTTP 409 conflicts.
9. **[#49325 - Retry Windows sandbox runner logon once on error 1056](https://github.com/openai/codex/pull/49325)**
   * Prevents premature sandbox startup aborts caused by transient `ERROR_SERVICE_ALREADY_RUNNING` (1056) codes during user process logon.
10. **[#49395 - Remove randomized greetings from TUI session headers](https://github.com/openai/codex/pull/49395)**
    * Cleans up terminal headers by stripping randomized greeting messages and enforcing strict `model:` and `directory:` metadata fields.

---

## Feature Request Trends

* **Granular MCP Configuration Management:** High demand for explicit UI controls to enable or disable Model Context Protocol (MCP) servers directly, bypassing the need to hand-edit `config.toml` files checked into version control ([#11765](https://github.com/openai/codex/issues/11765)).
* **Workspace & Project Sidebar Isolation:** Users heavily request a dedicated UI segregation layer to separate global "Recents" chats from project-scoped conversations on desktop apps ([#49128](https://github.com/openai/codex/issues/49128)).
* **Enhanced Telemetry & Credential Handling:** Clear separation and auditing for secure storage backends (keychain vs. file-based fallbacks) without leaking secrets into error reporting streams ([#49392](https://github.com/openai/codex/issues/49392), [#49384](https://github.com/openai/codex/issues/49384)).

---

## Developer Pain Points

* **Windows Process Spawning Regressions:** Background polling and app-server daemon initialization frequently result in invisible command shells flashing, terminal window hijacking, and cold-start renderer timeouts on Windows 11.
* **State Synchronization Inconsistencies:** Discrepancies between local app-server caches and remote instances (e.g., WSL pairing loops, remote control stream drops, and project context sync failures) continue to frustrate multi-environment power users.
* **Quota & Quota Reporting Anomalies:** Sudden fluctuations in remaining weekly allowances and conflicting metrics across web dashboards cause confusion regarding tier limits on Pro accounts.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-30

## 1. Today's Highlights
The Gemini CLI development team and community are heavily focused on stabilizing core infrastructure, enhancing state durability, and refining subagent execution. Recent updates introduce robust atomic state persistence, critical context-bloat mitigations for bulk file reads, and significant Windows UX improvements like Windows ConPTY IME cursor forwarding. Meanwhile, maintainers continue to prioritize issue rollups around multi-turn subagent reliability and bash sandboxing optimizations.

---

## 2. Releases
Three new release variants were published over the last 24 hours, focusing on stability and connection recovery:

*   **[v0.63.0-preview.0](https://github.com/google-gemini/gemini-cli/pull/29468)**: Introduces a display retry progress indicator during connection recovery (`fix(cli): display retry progress indicator during connection recovery`).
*   **[v0.63.0-nightly.20260929.gfe6350238](https://github.com/google-gemini/gemini-cli/pull/29448)**: Resolves an infinite auth loop caused by file contention, headless keyring issues, and supervisor state drops (`fix(auth)`).
*   **[v0.62.0](https://github.com/google-gemini/gemini-cli/pull/29334)**: Adds an early return for unsupported stores in the task metadata endpoint for the A2A server (`fix(a2a-server)`).

---

## 3. Hot Issues
Here are 10 noteworthy issues actively discussed by the community:

1.  **[Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption (#22323)](https://github.com/google-gemini/gemini-cli/issues/22323)**
    *   *Why it matters:* Subagents (such as `codebase_investigator`) incorrectly flag failures as successful completions when hitting turn limits, masking errors.
    *   *Community Reaction:* High engagement (13 comments, 2 👍); maintainers marked this as a priority P1 bug needing retesting.
2.  **[Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing (#19873)](https://github.com/google-gemini/gemini-cli/issues/19873)**
    *   *Why it matters:* Aligns Gemini 3 models' native capability to chain POSIX tools (`grep`, `sed`, `awk`) with safe, zero-dependency sandboxing.
    *   *Community Reaction:* Considered a major architectural enhancement (9 comments).
3.  **[Generalist agent hangs (#21409)](https://github.com/google-gemini/gemini-cli/issues/21409)**
    *   *Why it matters:* Users report that deferring tasks to the generalist agent causes indefinite hangs (up to an hour) during simple operations like folder creation.
    *   *Community Reaction:* Highly visible regression with 8 upvotes and 8 comments.
4.  **[Assess the impact of AST-aware file reads, search, and mapping (#22745)](https://github.com/google-gemini/gemini-cli/issues/22745)**
    *   *Why it matters:* Epic tracking the integration of AST-aware tools to read method bounds more precisely and reduce token noise.
    *   *Community Reaction:* Strategic exploration (7 comments) aimed at curbing context bloat.
5.  **[Gemini does not use skills and sub-agents enough (#21968)](https://github.com/google-gemini/gemini-cli/issues/21968)**
    *   *Why it matters:* Anecdotal feedback reveals Gemini fails to invoke registered custom skills (like gradle or git) autonomously without explicit prompt hand-holding.
    *   *Community Reaction:* Prompts ongoing tuning of model tool-selection prompts (6 comments).
6.  **[Browser Agent ignores settings.json overrides (e.g., maxTurns) (#22267)](https://github.com/google-gemini/gemini-cli/issues/22267)**
    *   *Why it matters:* Configuration properties set globally or per-project are dropped by the browser agent during initialization.
    *   *Community Reaction:* Frustrates users trying to constrain long-running browser tasks (4 comments).
7.  **[Gemini CLI encounters 400 error with > 128 tools (#24246)](https://github.com/google-gemini/gemini-cli/issues/24246)**
    *   *Why it matters:* API payload limits are breached when too many tool definitions are scoped simultaneously into the model prompt.
    *   *Community Reaction:* Forces investigation into dynamic tool-scoping logic (3 comments).
8.  **[Model frequently creates tmp scripts in random spots (#23571)](https://github.com/google-gemini/gemini-cli/issues/23571)**
    *   *Why it matters:* Shell execution restrictions cause the model to scatter temporary edit scripts across subdirectories, cluttering commits.
    *   *Community Reaction:* Clean workspace management concern (3 comments).
9.  **[get-shit-done output hook causes crash (#22186)](https://github.com/google-gemini/gemini-cli/issues/22186)**
    *   *Why it matters:* Custom completion hooks crashing at the end of runs abruptly terminate active CLI instances.
    *   *Community Reaction:* High-priority P1 bug report (3 comments).
10. **[Bugreport doesn't provide context of the subagent (#21763)](https://github.com/google-gemini/gemini-cli/issues/21763)**
    *   *Why it matters:* The `/bug` telemetry utility strips out subagent execution histories, leaving maintainers blind when debugging multi-agent issues.
    *   *Community Reaction:* Crucial tooling gap for diagnostic workflows (2 comments).

---

## 4. Key PR Progress
Here are 10 important pull requests driving codebase evolution:

1.  **[fix(core): implement append-only delta patching and bounded history windowing in ChatRecordingService (#29568)](https://github.com/google-gemini/gemini-cli/pull/29568)**
    *   Replaces expensive full-history rewrites with incremental append-only deltas to optimize chat logging performance.
2.  **[fix(cli): prevent CPU hang and quote swallowing on @ within code (#29557)](https://github.com/google-gemini/gemini-cli/pull/29557)**
    *   Fixes a 100% CPU lockup in headless mode triggered by scoped packages (`@scope/pkg`) followed by quoted text.
3.  **[fix(cli): persist state atomically and recover from backup on corruption (#29558)](https://github.com/google-gemini/gemini-cli/pull/29558)**
    *   Guarantees durability for `~/.gemini/state.json` via temp files, `fsync`, atomic renames, and auto-fallback to `.bak` files.
4.  **[fix(core): replace fuzzy requestedExplicitly logic with glob matching in read-many-files (#29457)](https://github.com/google-gemini/gemini-cli/pull/29457)**
    *   Stops binary assets (images, PDFs) from accidentally being ingested as "explicitly requested" via loose substring matches, slashing context bloat.
5.  **[fix(ui): ensure Windows ConPTY forwards IME cursor position (#29560)](https://github.com/google-gemini/gemini-cli/pull/29560)**
    *   Fixes severe CJK IME candidate window misalignment on Windows by accurately forwarding ConPTY cursor locations to active input prompts.
6.  **[fix(cli,core): prevent process hang on session exit (#29435)](https://github.com/google-gemini/gemini-cli/pull/29435)**
    *   Cleans up lingering `process.stdin` data listeners and invokes `unref()` to ensure Node's event loop closes properly on session exit.
7.  **[fix(acp): bridge PromptResponse.usage and emit usage_update notifications (#29549)](https://github.com/google-gemini/gemini-cli/pull/29549)**
    *   Captures cached and thought token counts in ACP mode (`--acp`), preventing massive (~3x) billing calculation overestimations.
8.  **[fix(cli): preserve env placeholders during settings migration (#29564)](https://github.com/google-gemini/gemini-cli/pull/29564)**
    *   Ensures that settings migrations do not aggressively expand raw environment variable placeholders (`${VAR}`) in untouched sibling settings.
9.  **[fix(core): normalize CRLF before computing diff context snippets (#29559)](https://github.com/google-gemini/gemini-cli/pull/29559)**
    *   Fixes diff utilities comparing raw CRLF files against LF content so that entire files aren't falsely marked as modified.
10. **[fix(cli): propagate resolved folder trust state in headless mode (#29528)](https://github.com/google-gemini/gemini-cli/pull/29528)**
    *   Resolves a split-brain bug where headless mode incorrectly reported trusted workspace status even when folders were explicitly untrusted.

---

## 5. Feature Request Trends
*   **Advanced Codebase Context & AST Parsing:** Strong push toward AST-aware code reading, structural searching (via tools like `ast-grep`), and granular file mapping to curb soaring token costs.
*   **Persistent Task Tracking:** Growing demand to move away from fragile in-context `WriteToDo` memory structures toward robust, file-based task tracking with full CRUD support.
*   **Subagent Transparency and Collaboration:** Requests for improved visibility into subagent trajectories (e.g., via `/chat share` and bug reports) and shared memory models for parallel agent workflows.
*   **Agent Self-Awareness:** Equipping the agent with deep knowledge of its own CLI parameters, flags, hotkeys, and behavioral self-execution capabilities.

---

## 6. Developer Pain Points
*   **Context Bloat & Token Inefficiency:** Accidental ingestion of binary files (through fuzzy string matching) and firehosing large files into context continue to drive up inference expenses and degrade performance.
*   **Hangs and Deadlocks:** Unresponsive generalist agents, unkillable non-interactive CLI streams during regex evaluations, and lingering stdin event loops blocking process exits.
*   **State Fragility:** Vulnerability of local state/settings files to corruption, concurrency issues, and unintended environment variable expansion during migration tasks.
*   **Platform-Specific Quirks:** Persistent edge-case barriers on non-Linux platforms, including Windows ConPTY IME popups and Wayland browser subagent failures.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest: 2026-09-30

## 1. Today's Highlights
The GitHub Copilot CLI team has been highly active, pushing five patch releases (v1.0.90-1 through v1.0.90-5) in the last 24 hours focused heavily on stabilizing MCP (Model Context Protocol) integration and authentication. Developers are currently navigating a mix of critical environment bugs and experimental feature requests, with a notable push toward improving session management and tool-calling reliability.

## 2. Releases
*   **v1.0.90-5:** Improved model picker reliability by preventing false "No supported model available" errors and added robustness to MCP tool calls.
*   **v1.0.90-4:** Resolved a common startup error regarding model provider attribution during the sign-in flow.
*   **v1.0.90-3:** Introduced `--mcp-github-auth` for better security scoping and added session-scoped, read-only directory approvals for safer path access.
*   **v1.0.90-1 & 2:** Fixed token caching issues for MCP OAuth (e.g., Datadog) and improved state consistency for withdrawn prompts during session resumes.

## 3. Hot Issues
*   [#1274](https://github.com/github/copilot-cli/issues/1274): **400 Errors on Code Review:** Persistent server-side or payload validation failures during code reviews; high engagement (31 comments).
*   [#1285](https://github.com/github/copilot-cli/issues/1285): **Enterprise Agent Discovery:** Users are struggling to surface organizational-level Agents in the CLI.
*   [#4870](https://github.com/github/copilot-cli/issues/4870): **Figma MCP Failure:** A specific protocol error (`-32601`) caused fatal crashes during discovery; now addressed.
*   [#3281](https://github.com/github/copilot-cli/issues/3281): **MCP Native Binding:** Installation errors caused by NPM optional dependency handling; a recurring pain point for new users.
*   [#2861](https://github.com/github/copilot-cli/issues/2861): **Compaction Failures:** Empty model responses causing loops during the `/compact` command.
*   [#4807](https://github.com/github/copilot-cli/issues/4807): **FileWatch "Storms":** A critical bug where idle sessions consumed >200% CPU and generated massive (33GB) log files.
*   [#3589](https://github.com/github/copilot-cli/issues/3589): **Context Injection:** Conflicting `sessionStart` hooks resulted in only the last hook being applied, silently ignoring others.
*   [#4982](https://github.com/github/copilot-cli/issues/4982): **Tool Call Stalls:** Intermittent freezes during parallel tool execution (Read/Rg).
*   [#4995](https://github.com/github/copilot-cli/issues/4995): **Conversation Scrollback:** Request for better UI controls to manage the verbosity of long terminal sessions.
*   [#4985](https://github.com/github/copilot-cli/issues/4985): **Secret Injection:** Credential placeholders (`${secret:...}`) failing to reach spawned MCP server processes on macOS.

## 4. Key PR Progress
*   [#5000](https://github.com/github/copilot-cli/pull/5000): **NPM Publishing Automation:** Proposed shift to automated, OIDC-based publishing from GitHub releases to improve consistency.

*(Note: Only one PR is currently open and active in the provided window.)*

## 5. Feature Request Trends
*   **Enhanced MCP Interoperability:** Strong demand for "skill-like" toggling of MCP servers and more flexible input schema support (e.g., avoiding failures on empty schemas).
*   **Context Control:** Developers want more granular control over what information is injected into the context window, including better management of sub-agent and hook outputs.
*   **Platform Parity:** Requests for native PDF analysis support and "Bring Your Own Key" (BYOK) configurations to allow IDE-integrated agents to run locally or on custom LLMs.
*   **Improved UX:** Persistent requests for better session management (auto-rename/retrieval) and smarter UI elements to collapse verbose conversation turns.

## 6. Developer Pain Points
*   **Tool/MCP Stability:** Developers are experiencing significant friction with brittle MCP integration, particularly regarding schema validation (the "400 error" trap) and installation-related native binding issues.
*   **Resource Management:** High-impact "event storms" and infinite stalls during parallel processing have eroded trust in CLI stability during long-running sessions.
*   **Auth & Security:** Difficulty navigating the transition between cloud-based agents and local CLI environments, compounded by issues with environment secret propagation in subprocesses.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

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