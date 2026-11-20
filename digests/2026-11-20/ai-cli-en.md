# AI CLI Tools Community Digest 2026-11-20

> Generated: 2026-11-20 01:31 UTC | Tools covered: 9

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

# Claude Code Community Digest: 2026-11-20

## Today's Highlights
Claude Code release **v2.1.329** introduced key improvements around security transparency for folder hooks and enhanced visibility for background tasks and `/loop` wakeups. Main community discussions focus on persistent Windows performance bugs—specifically orphaned background processes and stale write data loss in Cowork—alongside false-positive cybersecurity safety blocks affecting low-level hardware and firmware development.

---

## Releases
### [v2.1.329](https://github.com/anthropics/claude-code/releases/tag/v2.1.329)
* **Hook Security & Warnings**: Added a trust dialog warning detailing where a folder's hooks are declared, plus inline conversation warnings (in Claude Desktop and non-interactive hosts) when managed setting hooks fail to load.
* **Task Visibility**: Added session tracking for scheduled tasks, `/loop` wakeups, and current session goals.

---

## Hot Issues

1. **[#93482](https://github.com/anthropics/claude-code/issues/93482): Cowork silent stale write on Windows**
   * **Problem**: `device_commit_files` reports success when overwriting files, but on-disk content lags exactly one commit behind despite updated file modification timestamps (`mtime`).
   * **Impact**: Silent data loss on Windows systems during Cowork sessions. High community engagement (27 comments).

2. **[#102132](https://github.com/anthropics/claude-code/issues/102132): Desktop Code tab next-step box cuts off responses**
   * **Problem**: When the model triggers `wrap_up` with an `ask` and `actions`, the new next-step UI box renders immediately and prematurely ends the model's turn before the text reply is completely written.
   * **Impact**: Highly upvoted bug (28 👍, 23 comments) disrupting conversational flow in Claude Desktop on Windows.

3. **[#96299](https://github.com/anthropics/claude-code/issues/96299): Windows `claude.exe` process leakage**
   * **Problem**: Background `claude.exe` processes powering Claude Desktop Code tabs fail to terminate when tabs are closed, accumulating throughout the day and causing severe RAM and disk bloat.

4. **[#110657](https://github.com/anthropics/claude-code/issues/110657): Unreadable `.claude.json` triggers silent configuration wipe**
   * **Problem**: Running Claude Code as `root` alters file permissions on `.claude.json`, making it unreadable for regular user accounts. Upon the next unprivileged run, the tool silently overwrites the unreadable file with a fresh default config, purging all user settings.

5. **[#105770](https://github.com/anthropics/claude-code/issues/105770): Android sign-in blocked on rooted/unlocked bootloader devices**
   * **Problem**: Mobile sign-in fails with HTTP 400 from `/auth/verify_google_mobile` when Play Integrity checks flag unlocked or rooted Android environments.

6. **[#94159](https://github.com/anthropics/claude-code/issues/94159) (and related #94153–#94157): Opus 4.8 safeguard false positives on firmware tasks**
   * **Problem**: Multiple reports show the safety filter halting authorized sessions when developers attempt routine embedded development tasks—such as linting firmware source files, analyzing microcontrollers, or flashing boards.

7. **[#100831](https://github.com/anthropics/claude-code/issues/100831): 100% CPU lock in Windows AppContainer sandbox**
   * **Problem**: Bundled `chokidar` file watcher enters an infinite loop re-adding the drive root whenever `realpath` fails inside sandboxed environments.

8. **[#104769](https://github.com/anthropics/claude-code/issues/104769): Remote Control drops under "Require trusted devices"**
   * **Problem**: Desktop Remote Control disconnects every few hours on macOS, throwing HTTP 403 errors during credential re-minting because the Desktop host itself fails enrollment.

9. **[#108822](https://github.com/anthropics/claude-code/issues/108822): Double-redemption bug on usage resets**
   * **Problem**: Clicking the reset button once to redeem a single account reset consumed both available usage resets simultaneously.

10. **[#111265](https://github.com/anthropics/claude-code/issues/111265): Sudden usage drain during Project mode**
    * **Problem**: Developers report unexpected, rapid depletion of quota allocations when operating within Claude Code Projects.

---

## Key PR Progress

* **[#111198](https://github.com/anthropics/claude-code/pull/111198): Restrict `@claude` mentions on fork PRs**
  * Prevents automatic trigger of `@claude` execution when comments are posted on pull requests coming from external repository forks, eliminating a potential vector for unauthorized token usage or untrusted code execution.

---

## Feature Request Trends

* **Session Hierarchy & Governance**: Requests like [#111263](https://github.com/anthropics/claude-code/issues/111263) seek the ability to retroactively nest independent standalone sessions under a parent coordinator session in Claude Desktop.
* **Granular Agent Controls**: Developers are requesting explicit toggles to permanently disable automatic edit acceptance ([#87973](https://github.com/anthropics/claude-code/issues/87973)) and manual access to the compact context button regardless of current token usage levels ([#111255](https://github.com/anthropics/claude-code/issues/111255)).
* **Desktop UI Customization & Responsiveness**: Requests for responsive UI elements, such as allowing question/permission cards to expand to full chat column width ([#102723](https://github.com/anthropics/claude-code/issues/102723)) and improving mod pane lifecycle management ([#111244](https://github.com/anthropics/claude-code/issues/111244)).

---

## Developer Pain Points

* **Windows OS Overhead & Bugs**: Windows users face compounding operational friction: silent file lag in Cowork ([#93482](https://github.com/anthropics/claude-code/issues/93482)), CPU maxing due to `chokidar` loops

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — November 20, 2026

## 1. Today's Highlights
The Codex codebase saw major advances today with the official release of `rust-v0.171.0`, introducing **GPT-6.2 Sol** as the default catalog selection alongside **GPT-6.2 Astra**, and enabling the enriched TUI workspace by default. Core backend engineering prioritized thread replay backpressure, standardizing ID allocation via `ThreadContextIds`, and optimizing thread listing performance. Additionally, critical updates landed for Guardian security policies, ensuring proper validation of client approval boundaries and automated V2 scoring.

---

## 2. Releases
* **[rust-v0.171.0](https://github.com/openai/codex/releases/tag/rust-v0.171.0)**
  * **GPT-6.2 Catalog Additions**: Added `GPT-6.2 Sol` and `GPT-6.2 Astra` to model catalogs, setting Sol as the default choice ([#62106](https://github.com/openai/codex/issues/62106)).
  * **TUI Workspace Default**: Enabled the interactive TUI workspace by default, featuring searchable document previews, image previews, and subagent transcripts inline with conversation threads ([#61352](https://github.com/openai/codex/issues/61352), [#61888](https://github.com/openai/codex/issues/61888), [#61889](https://github.com/openai/codex/issues/61889), [#61919](https://github.com/openai/codex/issues/61919)).
* **Alpha Releases**: `rust-v0.172.0-alpha.2` and `rust-v0.171.0-alpha.13.1`.

---

## 3. Hot Issues
1. **[#62212: Audio tool outputs break subsequent text turns with HTTP 400](https://github.com/openai/codex/issues/62212)**  
   * *Impact*: In Codex Desktop using GPT-6.2 Sol, invoking audio tools injects state payload formats that cause subsequent text-only turns to fail with raw HTTP 400 bad request errors.
2. **[#25737: CLI login forces SMS OTP step-up on security-key-only accounts](https://github.com/openai/codex/issues/25737)**  
   * *Impact*: OAuth flow for the CLI forces a hardware FIDO2/CTAP2 security key user into an SMS OTP fallback page, bypassing the browser's Advanced Account Security settings.
3. **[#47041: GPT-5.6 Sol and GPT-6 Astra reject harmless prompts with `invalid_prompt`](https://github.com/openai/codex/issues/47041)**  
   * *Impact*: Overly strict client-side or gateway filters reject benign code generation requests on Windows Desktop with generic invalid prompt exceptions.
4. **[#25770: Windows Store MSIX update fails due to locked package handles](https://github.com/openai/codex/issues/25770)**  
   * *Impact*: The Windows AppX/Store updater fails repeatedly when staging updates because running background processes lock previous install directories.
5. **[#38768: Windows Remote Control WebSocket times out behind system proxies](https://github.com/openai/codex/issues/38768)**  
   * *Impact*: Network error `10060` blocks Remote Control connection establishment when routed through system proxies/TUN interfaces, even when explicit `curl` requests reach the endpoint.
6. **[#30417: ChatGPT mobile incorrectly gates Codex Cloud without Remote Control](https://github.com/openai/codex/issues/30417)**  
   * *Impact*: iOS client blocks cloud workspace interactions if the mobile-remote execution toggle is disabled, ignoring active Cloud entitlements available via web/Slack.
7. **[#54691: macOS Desktop Full Access task remains locked in workspace sandbox](https://github.com/openai/codex/issues/54691)**  
   * *Impact*: Even when set to Full Access in Work Mode, the underlying execution service isolates tasks to `workspace-write`, breaking Xcode Swift macro expansion and system services.
8. **[#56601: Request to connect CLI/TUI to dots without Desktop App](https://github.com/openai/codex/issues/56601)**  
   * *Impact*: Headless Linux and macOS developers are seeking a dedicated CLI command to pair their local machine directly with remote web dots without relying on the GUI client.
9. **[#61836: Windows Dots stall commands with missing thread placement readiness errors](https://github.com/openai/codex/issues/61836)**  
   * *Impact*: Windows desktop dots show connected status but silently stall on PowerShell commands due to repeating executor thread placement failures.
10. **[#54509: WSL workspace probes accumulate trace logs leading to disk exhaustion](https://github.com/openai/codex/issues/54509)**  
    * *Impact*: Repeated probes across WSL distributions cause excessive trace logging in WSLg, consuming available C: drive space and causing OS instability.

---

## 4. Key PR Progress
1. **[#62636: Reduce rollout scanning overhead when listing threads](https://github.com/openai/codex/pull/62636)**  
   * Replaces full asynchronous rollout line-parsing with a buffered rollout reader to extract initial session metadata quickly, reducing thread listing latency.
2. **[#62633](https://github.com/openai/codex/pull/62633) & [#62635: Centralize ID handling in `ThreadContextIds`](https://github.com/openai/codex/pull/62635)**  
   * Consolidates context revision, response item, and instruction prefix UUID derivations into a unified generator to ensure stable ID tracking across history and inference.
3. **[#62609: Apply backpressure to app-server request replay on thread resume](https://github.com/openai/codex/pull/62609)**  
   * Prevents app-server connections from blowing past bounded outbound queue limits or stalling thread listeners when resuming chats with high volumes of pending requests.
4. **[#62615: Split in-memory execution policy rules into a separate crate](https://github.com/openai/codex/pull/62615)**  
   * Decouples Starlark policy parsing from core execution by moving rule definitions into `codex-execpolicy-rules`, streamlining downstream dependencies.
5. **[

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-11-20

## 1. Today's Highlights
OpenCode development continues to focus heavily on stabilizing v2 provider integrations (notably Claude Agent and Gemini), refining multi-machine session handling behind the `machines` flag, and modernizing internal code execution modules like Code Mode's migration to the `psychoscript` package. Meanwhile, users are facing severe friction around quota management, text corruption bugs, and unexpected background service behaviors.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues

1. **[#4283 Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)**
   * **Why it matters:** Users cannot copy selected text responses directly from the terminal UI.
   * **Community reaction:** Highly engaging issue (161 comments, 135 👍), reflecting fundamental usability pain in terminal copy operations.

2. **[#64869 core: edit tool hangs indefinitely on one path in the background service](https://github.com/anomalyco/opencode/issues/64869)**
   * **Why it matters:** The background service locks up completely when invoking `edit` on specific files, bypassing standalone fixes.
   * **Community reaction:** Highlights fragility in background state synchronization on macOS.

3. **[#61072 Claude Agent: 5-hour plan limit drains ~1.8x faster because the SDK labels requests sdk-ts](https://github.com/anomalyco/opencode/issues/61072)**
   * **Why it matters:** Token exhaustion happens nearly twice as fast compared to native Claude Code due to improper SDK request headers.
   * **Community reaction:** Frustration over heavy rate-limit consumption for power users.

4. **[#45924 edit and apply_patch silently corrupt non-UTF-8 files (U+FFFD replacement)](https://github.com/anomalyco/opencode/issues/45924)**
   * **Why it matters:** File edits replace non-UTF-8 byte sequences with replacement characters without warning, corrupting binary or legacy-encoded source files.
   * **Community reaction:** Marked as high severity due to silent data destruction.

5. **[#56032 server: add option to disable session auto-resume on service start](https://github.com/anomalyco/opencode/issues/56032)**
   * **Why it matters:** Background services automatically resume uncommitted or suspended sessions on restart, burning tokens unexpectedly.
   * **Community reaction:** Strong backing (4 👍) for adding granular control over background server lifecycle hooks.

6. **[#51152 auth: per-project credential activation (provider profile per folder)](https://github.com/anomalyco/opencode/issues/51152)**
   * **Why it matters:** Global credential activation causes actions in one project directory to accidentally re-bill or disrupt background agents running in separate projects.
   * **Community reaction:** Essential feature request for multi-project or agency developers.

7. **[#64746 claude-agent: model list flips between `fable` and `claude-fable-5-2`, so sessions on the dropped id fail](https://github.com/anomalyco/opencode/issues/64746)**
   * **Why it matters:** Dynamic model ID mutation causes active sessions to crash with "model not found" errors.
   * **Community reaction:** Direct driver for recent patch PRs aiming to keep aliased IDs stable.

8. **[#64117 mcp: `notifications/tools/list_changed` does not surface newly-enabled tools to the model](https://github.com/anomalyco/opencode/issues/64117)**
   * **Why it matters:** MCP server updates regarding available tools fail to propagate to active model contexts.
   * **Community reaction:** Blocks dynamic tool registration workflows in MCP integrations.

9. **[#64792 Anthropic Messages protocol doesn't normalize overlapping fragment boundaries ("reasoning start before end")](https://github.com/anomalyco/opencode/issues/64792)**
   * **Why it matters:** Gemini 3.x models routed via Vercel AI Gateway throw fatal error turns due to invalid reasoning tags.
   * **Community reaction:** Stops model sessions completely when utilizing reasoning-heavy configurations.

10. **[#65023 [FEATURE]: find sessions by session ID in the picker and `/sessions <id>`](https://github.com/anomalyco/opencode/issues/65023)**
    * **Why it matters:** Session pickers currently only match titles, rendering direct URL/log IDs unsearchable.
    * **Community reaction:** Promptly addressed by community pull requests on the same day.

---

## 4. Key PR Progress

1. **[#65035 feat(core): rotate between Claude accounts when one hits its usage limit](https://github.com/anomalyco/opencode/pull/65035)**
   * **Description:** Introduces support for a list of Claude config directories, allowing active chats to seamlessly failover to a secondary account upon hitting rate limits.

2. **[#63002 feat(desktop): signed-in browser pane with extensions, previews, prompts and agent safeguards](https://github.com/anomalyco/opencode/pull/63002)**
   * **Description:** Adds an integrated desktop browser pane capable of inheriting user profiles and session sign-ins for embedded previews.

3. **[#65011 refactor(codemode): use the psychoscript package for the language](https://github.com/anomalyco/opencode/pull/65011)**
   * **Description:** Extracts Code Mode's language infrastructure into the standalone [`psychoscript`](https://github.com/npmjs.com/package/psychoscript) npm package.

4. **[#65031 feat(core): machine keys and one-use join strings](https://github.com/anomalyco/opencode/pull/65031)**
   * **Description:** Implements core foundations for secure cross-machine linking using encrypted one-use join strings behind the `machines` flag.

5. **[#64381 feat(core): send mid-conversation tool changes in place](https://github.com/anomalyco/opencode/pull/64381)**
   * **Description:** Dynamically updates tool definitions mid-session when MCP servers connect/disconnect or permissions change.

6. **[#65024 feat(tui): find sessions by ID](https://github.com/anomalyco/opencode/pull/65024)**
   * **Description:** Resolves issue #65023 by enabling direct session ID matching inside the TUI session picker.

7. **[#65002 feat(codemode): show file diffs from a script below the execute block](https://github.com/anomalyco/opencode/pull/65002)**
   * **Description:** Enhances desktop Code Mode previews by displaying actionable file diff blocks directly beneath completed execution steps.

8. **[#65034 fix(core): use `<system-update>` for instruction updates in every prompt](https://github.com/anomalyco/opencode/pull/65034)**
   * **Description:** Standardizes system instruction updates across prompt generation layers to eliminate tagging discrepancies.

9. **[#65032 fix(core): keep every listed Claude model ID working when Claude Code renames a model](https://github.com/anomalyco/opencode/pull/65032)**
   * **Description:** Directly resolves #64746 by maintaining backward compatibility for Claude model IDs subjected to upstream renaming.

10. **[#64784 release: promote dev to production](https://github.com/anomalyco/opencode/pull/64784)**
    * **Description:** Packages current `dev` changes—including Tidepool Alpha Free docs, Gemini 4 Neon integrations, and recent core patches—for production release.

---

## 5. Feature Request Trends
* **Granular Lifecycle Controls:** Increasing demand for fine-grained toggles over background service behavior (e.g., stopping auto-resumption of suspended sessions on service restarts).
* **Multi-Account & Multi-Project Isolation:** Users managing multiple clients or workflows request directory-scoped provider profiles and automatic account rotation to bypass rate limits.
* **Interactive Tooling:** Advanced requests for native pseudoterminal (PTY) session handling to support interactive REPLs and debuggers.

---

## 6. Developer Pain Points
* **Silent Data Corruption:** Non-UTF-8 files being quietly overwritten with replacement characters (`U+FFFD`) during patch applications.
* **Token Drain & Quota Exhaustion:** Unintentional token consumption triggered by background service auto-resumptions and inaccurate SDK request markers.
* **Model Routing Fragility:** Inconsistencies and runtime crashes stemming from dynamic alias adjustments by upstream providers (like Claude Agent and Gemini tool schema limitations).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest (2026-11-20)

## 1. Today's Highlights
The Pi development community focused heavily on terminal stabilization, provider model alignment, and prompt-caching regressions. Maintainers aggressively closed critical quality-of-life bugs—such as terminal state cleanup on `SIGTSTP` and strict schema handling for GitHub Copilot endpoints—while refining core AI provider implementations across OpenAI Codex, Anthropic, and Qwen.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues
1. **[#7547](https://github.com/earendil-works/pi/issues/7547) - [Windows] [sink-thread] How do you use Pi on windows? What issues are you seeing?**
   * *Why it matters:* Windows usage fragmentation remains a massive friction point, with 99 comments discussing environment-specific quirks.
   * *Community reaction:* Developers are collaborating to map out Windows Terminal, PowerShell, and WSL edge cases to stabilize the out-of-box experience.
2. **[#9549](https://github.com/earendil-works/pi/issues/9549) - [fullscreen] Large transcripts re-render every frame; every resize re-emits the whole transcript**
   * *Why it matters:* Saturates a CPU core on Windows 11 / Windows Terminal when handling large conversation histories.
   * *Community reaction:* High concern from users running long sessions due to UI responsiveness degradation.
3. **[#11026](https://github.com/earendil-works/pi/issues/11026) - [durable] pi-durable: permanently delete a conversation from storage**
   * *Why it matters:* Requests a safe API harness method (`harness.deleteConversation`) to purge conversation entries, docs, and scheduler state.
   * *Community reaction:* Essential for privacy and state management in production setups.
4. **[#12273](https://github.com/earendil-works/pi/issues/12273) - openai-codex: GPT-6.2 Sol reports lower system prompt cache reuse than 6.1**
   * *Why it matters:* Directly impacts API latency and cost efficiency, dropping cache reuse drastically on warm turns.
   * *Community reaction:* Prompted immediate investigation into how model revisions handle prefix-matching.
5. **[#12133](https://github.com/earendil-works/pi/issues/12133) - Windows: terminal left with mouse/Kitty input reporting enabled after exit**
   * *Why it matters:* Leaves PowerShell flooded with SGR mouse escape sequences (`[<35;69;10M`) as garbage text after exiting.
   * *Community reaction:* Frustrated developers demanding robust terminal state restoration on exit.
6. **[#12184](https://github.com/earendil-works/pi/issues/12184) - Google adapters reject Gemini 4 Hydrogen's advertised xhigh level**
   * *Why it matters:* Selecting the new `xhigh` thinking level via `/thinking` throws an error before hitting the wire.
   * *Community reaction:* Users want immediate alignment with latest provider thinking capabilities.
7. **[#11006](https://github.com/earendil-works/pi/issues/11006) - GitHub Copilot models enabled by an enterprise admin stay hidden after restart**
   * *Why it matters:* OAuth token caching of `availableModelIds` prevents newly granted enterprise models from showing up.
   * *Community reaction:* Admins and enterprise users are stalled by stale local model lists.
8. **[#12318](https://github.com/earendil-works/pi/issues/12318) - Anthropic /login fails on Claude Team/Enterprise seats: "Unknown scope"`**
   * *Why it matters:* OAuth flow breaks before the consent screen for enterprise users due to scope rejection.
   * *Community reaction:* Major blocker for teams trying to authenticate with corporate accounts.
9. **[#12035](https://github.com/earendil-works/pi/issues/12035) - Threshold compaction fires far below the window when the selected model is virtual**
   * *Why it matters:* Virtual models return `undefined` for physical context windows, causing premature compaction triggers.
   * *Community reaction:* Developers working with custom model wrappers want safer window resolution logic.
10. **[#12269](https://github.com/earendil-works/pi/issues/12269) - Keep the prompt cache when changing thinking level on openai-codex provider**
    * *Why it matters:* Mid-conversation adjustments to thinking levels break context prefixes and invalidate prompt caches.
    * *Community reaction:* Highly desired optimization for cost-conscious heavy users.

---

## 4. Key PR Progress
1. **[#12339](https://github.com/earendil-works/pi/pull/12339) - fix(tui): keep the SIGTSTP listener tied to terminal ownership**
   * *Details:* Ensures standalone TUIs properly register/unregister suspend signal handlers only when owning the terminal, fixing dirty terminal states.
2. **[#12283](https://github.com/earendil-works/pi/pull/12283) - fix(coding-agent): handle external SIGTSTP like Ctrl+Z**
   * *Details:* Hooks `kill -TSTP` to safely restore terminal settings instead of leaving tracking protocols active.
3. **[#12336](https://github.com/earendil-works/pi/pull/12336) - fix(coding-agent): flush stdout before exiting after stopping a TUI**
   * *Details:* Prevents Node.js from dropping pending stdout writes that clear mouse tracking and bracketed paste modes.
4. **[#12332](https://github.com/earendil-works/pi/pull/12332) - feat(ai): send strict tools to Claude on GitHub Copilot**
   * *Details:* Extends strict mode JSON-schema constrained sampling to GitHub Copilot-hosted Claude models.
5. **[#12335](https://github.com/earendil-works/pi/pull/12335) - fix(coding-agent): send images to llama.cpp decision classifiers**
   * *Details:* Resolves bug where llama.cpp multimodal decision models (`architecture.input_modalities`) were incorrectly treated as text-only.
6. **[#12319](https://github.com/earendil-works/pi/pull/12319) - fix(ai): make Codex system prompts cacheable**
   * *Details:* Restructures how OpenAI Codex receives system prompts to bypass top-level instruction restrictions and enable prompt caching.
7. **[#12325](https://github.com/earendil-works/pi/pull/12325) - fix(ai): keep GitHub Copilot's available models up to date**
   * *Details:* Forces model catalog refreshes to respect newly assigned or admin-enabled GitHub Copilot models.
8. **[#12278](https://github.com/earendil-works/pi/pull/12278) - fix(coding-agent): refresh scoped models on interactive reload**
   * *Details:* Allows `/reload` to dynamically apply changes to `enabledModels` without requiring a full application restart.
9. **[#12312](https://github.com/earendil-works/pi/pull/12312) - fix(tui): Enter on a Tab menu for an absolute path no longer submits**
   * *Details:* Fixes autocomplete logic that accidentally treated absolute file paths starting with `/` as slash commands.
10. **[#12304](https://github.com/earendil-works/pi/pull/12304) - fix(coding-agent): smoke-test managed updates with the launcher's Node.js**
    * *Details:* Enhances update reliability on rolling-release distros experiencing shared library mismatches (e.g., simdjson version bumps).

---

## 5. Feature Request Trends
* **Unified Namespacing & Package Integration:** Growing interest in explicit package namespaces (`pi.namespace`) to handle skill and prompt template discovery cleanly (Issue [#8834](https://github.com/earendil-works/pi/issues/8834)).
* **Agent Client Protocol (ACP) & Headless Interoperability:** Expansion requests to run Pi Durable inside IDE environments like JetBrains via ACP adapters (Issue [#10389](https://github.com/earendil-works/pi/issues/10389)).
* **Granular Session Controls:** Better programmatic state management, such as permanent conversation deletion (Issue [#11026](https://github.com/earendil-works/pi/issues/11026)) and precise queue management for restored work items (Issue [#12306](https://github.com/earendil-works/pi/issues/12306)).

---

## 6. Developer Pain Points
* **Terminal State Leaks:** Developers frequently encounter broken terminal configurations (stuck mouse tracking, active kitty protocols, and un-restored ANSI states) when sessions are abruptly stopped via SIGTSTP, window resizes, or un-flushed stdout exits.
* **Prompt Caching & Cost Inefficiencies:** Subtle API changes in provider backends (such as OpenAI Codex GPT-6.2 system prompts or classifiers dropping cache rates) continue to cause unexpected token billing spikes and cache misses.
* **Enterprise Auth & OAuth Stale States:** Enterprise users face friction due to rigid OAuth scope validation (e.g., Claude Team seats rejecting unknown scopes) and cached model lists failing to sync newly provisioned admin rights.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest: 2026-11-20

## 1. Today's Highlights
The community focus today is heavily centered on "Managed Agent" stability and closing out pre-production convergence items before the upcoming 1.x freeze. While CI remains strained by environmental limits and test-flakiness, developers are actively hardening workspace artifact libraries and addressing critical bugs in tool output management.

## 2. Releases
*   **No new releases in the last 24 hours.**

## 3. Hot Issues
*   [#15486](https://github.com/QwenLM/qwen-code/issues/15486) – **Token Management Bug:** Automatic compaction is miscalculating turn size when tool results are pending, leading to token exhaustion.
*   [#17854](https://github.com/QwenLM/qwen-code/issues/17854) – **Security Vulnerability:** MCP trust bypass allows unreviewed tools from "trusted" servers to execute, creating a potential attack vector.
*   [#17039](https://github.com/QwenLM/qwen-code/issues/17039) – **CI Reliability:** The Managed Agent gate lacks a stable name, causing merge-blocking regressions that persist across the main branch.
*   [#16832](https://github.com/QwenLM/qwen-code/issues/16832) – **CI Tooling:** The manual PR re-review channel is broken due to a 404 on the deprecated `qwen-code-ci-bot` account.
*   [#17851](https://github.com/QwenLM/qwen-code/issues/17851) – **Chronic CI Failure:** The Java SDK E2E test suite has been failing daily since Nov 11, indicating a deeper environment instability.
*   [#17832](https://github.com/QwenLM/qwen-code/issues/17832) – **MCP Connectivity:** Servers in a "starting" state are incorrectly reported as failed, causing tool synchronization issues.
*   [#17188](https://github.com/QwenLM/qwen-code/issues/17188) – **Model Catalog:** DeepSeek V3.1/3.2 models are hitting incorrect 32k output limits instead of the advertised 65k.
*   [#17284](https://github.com/QwenLM/qwen-code/issues/17284) – **Roadmap:** Tracking essential tasks left over from the agent-loop consolidation to ensure they are addressed before the 1.x freeze.
*   [#17037](https://github.com/QwenLM/qwen-code/issues/17037) – **Infra:** The `hz3` CI runner is hitting inode limits, causing jobs to fail before execution.
*   [#17628](https://github.com/QwenLM/qwen-code/issues/17628) – **CLI Bug:** Migration scripts are truncating files due to a race condition between existence checks and write operations.

## 4. Key PR Progress
*   [#17890](https://github.com/QwenLM/qwen-code/pull/17890) – **Async Hooks:** Delivers pending background hook output to the default legacy round.
*   [#17862](https://github.com/QwenLM/qwen-code/pull/17862) – **Performance:** Coalesces background-turn live text chunks to improve journal efficiency.
*   [#17795](https://github.com/QwenLM/qwen-code/pull/17795) – **UX:** Adds a "Managed Capabilities" dialog for auditing daemon-only surfaces.
*   [#17871](https://github.com/QwenLM/qwen-code/pull/17871) – **Refactor:** Advances the files-on-v2 lifecycle for managed agents.
*   [#17533](https://github.com/QwenLM/qwen-code/pull/17533) – **Web Shell:** Implements worktree metadata contracts and initial snapshot retention.
*   [#17437](https://github.com/QwenLM/qwen-code/pull/17437) – **I18n:** Adds comprehensive Arabic support (RTL) for CLI and Web Shell.
*   [#17458](https://github.com/QwenLM/qwen-code/pull/17458) – **Security:** Adds visibility gates to prevent `record_artifact` from accessing ignored directories.
*   [#17892](https://github.com/QwenLM/qwen-code/pull/17892) – **UI:** Refines touch-target sizing for the mobile model picker/sheet.
*   [#17886](https://github.com/QwenLM/qwen-code/pull/17886) – **Reliability:** Improves recovery logic for durable native terminals during harness attachment.
*   [#17893](https://github.com/QwenLM/qwen-code/pull/17893) – **Test Hardening:** Scopes artifact library tests to local database catalogs to prevent cross-test interference.

## 5. Feature Request Trends
*   **Agent Parity:** High demand for unified CLI/Web Shell behavior (LSP support, worktree consistency).
*   **Managed Infrastructure:** Increased focus on auditability and status tracking for internal daemon/managed agent features.
*   **Accessibility:** Continued requests for better support for international languages (Arabic/RTL) and mobile-responsive UI.

## 6. Developer Pain Points
*   **CI Fragility:** Significant frustration regarding test flakiness, inode/disk space issues on runners, and broken automated review bots.
*   **Managed Agent Complexity:** Difficulty tracking the high volume of "deferred" review items that are now being forced into the merge cycle.
*   **Tooling Consistency:** Frustration with race conditions in CLI command migrations and inconsistent behavior between local and server-side model limits.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*