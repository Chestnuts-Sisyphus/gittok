# AI CLI Tools Community Digest 2026-11-07

> Generated: 2026-11-06 23:52 UTC | Tools covered: 9

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

Here is the Claude Code community digest for **November 7, 2026**.

---

### Today's Highlights

The community's primary focus today centers on critical privacy and authentication issues. A major privacy concern surfaced regarding user email addresses being broadcasted in `User-Agent` headers during automated web searches ([#107757](https://github.com/anthropics/claude-code/issues/107757)), leading Anthropic to open-source the privacy mod source code in [#107768](https://github.com/anthropics/claude-code/pull/107768). On the release side, **v2.1.319** alters how auto mode behaves behind third-party LLM gateways like Bedrock, Vertex, and Foundry when telemetry is disabled.

---

### Releases

* **v2.1.319**
  * **Auto Mode Enforcement:** When running with telemetry/feature flags disabled or behind third-party LLM gateways (Amazon Bedrock, Google Vertex, Google Foundry), auto mode no longer falls back to the built-in classifier. Unverifiable server requests will now prompt the user or be denied by default. 
  * **Bypass:** Developers can retain the previous auto-mode classifier behavior by setting `CLAUDE_CODE_AUTO_MODE_SERVER=0`.

---

### Hot Issues

1. **[#107757](https://github.com/anthropics/claude-code/issues/107757) [OPEN] Privacy violation in User-Agent header**  
   * **Why it matters:** Users discovered that web searches executed by Claude Code include the logged-in user's email address inside the outbound `User-Agent` header, exposing personal identity to third-party web servers without explicit consent.
   * **Community reaction:** Highly critical with 687 👍 and 98 comments demanding immediate removal of identity tracking from HTTP headers.

2. **[#1757](https://github.com/anthropics/claude-code/issues/1757) [OPEN] Claude code requires users to constantly login**  
   * **Why it matters:** Developers report session tokens invalidating daily, forcing web-based OAuth re-authentication nearly every 24 hours and interrupting automated workflows.

3. **[#10238](https://github.com/anthropics/claude-code/issues/10238) [CLOSED] Feature: Add support for subdirectories in skills**  
   * **Why it matters:** Requests directory nesting support inside skills paths for better modularity in complex repositories. Resolved and closed.

4. **[#91495](https://github.com/anthropics/claude-code/issues/91495) [CLOSED] Site permissions ("Allow all websites") ignored in Desktop built-in browser**  
   * **Why it matters:** The built-in browser in Claude Code Desktop ignored domain whitelists, prompting permission dialogs repeatedly even when site-wide access was enabled.

5. **[#107558](https://github.com/anthropics/claude-code/issues/107558) [OPEN] Extra usage credits depleted in ~15 min under light use**  
   * **Why it matters:** Reports of a potential metering bug where $10 credit top-ups are rapidly consumed within minutes during low-activity CLI sessions.

6. **[#95539](https://github.com/anthropics/claude-code/issues/95539) [OPEN] `naver.com` domains blocked by default safety restrictions**  
   * **Why it matters:** A false-positive safety blocklist flags Naver (South Korea's major web portal) as restricted content, breaking workflows relying on Korean web sources.

7. **[#88993](https://github.com/anthropics/claude-code/issues/88993) [OPEN] Workflow subagents interrupted at ~180s during model request**  
   * **Why it matters:** Long-running agent workflows hit an unhandled 180-second timeout window, causing cold restarts that fail repeatedly on identical retry keys.

8. **[#107111](https://github.com/anthropics/claude-code/issues/107111) [OPEN] HTTP MCP fails fetching tools list despite successful connection**  
   * **Why it matters:** Streamable HTTP MCP server connections (specifically tested against Google Gmail MCP endpoints using the 2026-07-28 protocol specification) drop tool definitions despite showing a "connected" status.

9. **[#107979](https://github.com/anthropics/claude-code/issues/107979) [OPEN] Long session turns marked as `[cleared]`, stripping images/context**  
   * **Why it matters:** Long sessions silently purge pasted screenshots and rich snippet context mid-conversation, causing loss of critical context in multi-turn tasks.

10. **[#108048](https://github.com/anthropics/claude-code/issues/108048) [OPEN] Opus 5.5 `reasoning_extraction` refuses local notes file read**  
    * **Why it matters:** A context interaction between local user-scope rules and `claude-opus-5-5` triggers false safety refusals when inspecting benign Markdown notes files.

---

### Key PR Progress

1. **[#107768](https://github.com/anthropics/claude-code/pull/107768) [CLOSED] mods: add the privacy mod**  
   * **Summary:** Open-sources the manifest, README, and hook logic for the built-in `privacy` module under `mods/privacy`. The module adds guards against executing shell commands or web requests that expose signed-in account email addresses via headers.

---

### Feature Request Trends

* **Granular Agent Execution Controls:** Requests to pass control parameters like `effort` downstream when initializing sub-sessions via `claude-code-remote` ([#107292](https://github.com/anthropics/claude-code/issues/107292)).
* **Semantic Safety Moderation:** Calls to transition away from rigid keyword-matching blocklists toward context-aware semantic evaluation to prevent false positives on standard code refactoring or regional domain browsing ([#91579](https://github.com/anthropics/claude-code/issues/91579)).
* **Expanded Multi-Repository Permissions:** Support for executing compound shell commands (e.g., `cd ../repo && git push`) without triggering safety prompts when working within declared `additionalDirectories` ([#91568](https://github.com/anthropics/claude-code/issues/91568)).

---

### Developer Pain Points

* **Privacy Controls & Header Leaks:** Strong frustration over implicit sharing of developer identity details (email addresses) in out-of-band HTTP requests made by tools.
* **Authentication Overhead:** Daily authentication invalidation strains developers working in headless or remote SSH setups.
* **Aggressive Blocklists & Over-filtering:** Keyword safety heuristics repeatedly intercept standard development tasks—such as renaming methods to terms like `Authorities` ([#91564](https://github.com/anthropics/claude-code/issues/91564)) or accessing high-traffic national web portals ([#95539](https://github.com/anthropics/claude-code/issues/95539)).
* **Agent Stability & Context Retention:** Subagent execution drops mid-flight due to rigid 

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-11-07

## Today's Highlights

The **Codex `v0.167.0` release** landed major terminal UX improvements, including an agent command center (`codex agents --no-daemon`) with unread activity indicators and seamless backend switching from the session picker. On the codebase development front, a sweeping batch of PRs landed to solidify the **Guardian multi-agent reviewer architecture**, introducing model-driven channel subscriptions, bounded evidence delivery, and isolated board read views. Meanwhile, community discussions remain dominated by critical Windows update regressions (disappearing local projects and Git ACL locks) and severe memory leaks tied to un-reaped Model Context Protocol (MCP) child processes.

---

## Releases

*   [rust-v0.167.0](https://github.com/openai/codex/releases/tag/rust-v0.167.0): 
    *   **Agent Command Center**: Added `codex agents --no-daemon` command center with unread result indicators ([#58238](https://github.com/openai/codex/pull/58238), [#58239](https://github.com/openai/codex/pull/58239)).
    *   **Session Management**: Supported switching between connected backends directly from the terminal session picker while preserving input drafts ([#58280](https://github.com/openai/codex/pull/58280), [#58457](https://github.com/openai/codex/pull/58457)).
*   [rust-v0.169.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.169.0-alpha.2): Incremental alpha release.

---

## Hot Issues

1.  [#42739 - Local projects disappear from sidebar after Windows desktop update](https://github.com/openai/codex/issues/42739)  
    *Impact*: Desktop app updates reset the Windows UI sidebar to show "No projects", even though files remain intact on disk. Users are forced into manual workspace re-linking.
2.  [#51524 - Windows Computer Use stops at get_window_state](https://github.com/openai/codex/issues/51524)  
    *Impact*: Computer Use window inspection for Chrome and Edge fails abruptly on Windows, halting browser interaction loops prior to executing mouse or keyboard turns.
3.  [#30408 - MCP server processes leak: per-thread processes never cleaned up](https://github.com/openai/codex/issues/30408)  
    *Impact*: `app-server` spawns persistent MCP server instances per thread without killing them upon archiving/closing, leading to memory usage exceeding 9+ GB RSS.
4.  [#12491 - Codex.app GUI: MCP child processes not reaped after task completion](https://github.com/openai/codex/issues/12491)  
    *Impact*: A related long-standing GUI process lifecycle issue leaving 1300+ zombie child processes and consuming up to 37 GB of host memory.
5.  [#52503 - Web: Repeated approvals after Always allow and lost upload results](https://github.com/openai/codex/issues/52503)  
    *Impact*: Web coding dot workflows fail to respect "Always allow" permissions for GitHub tool calls, causing repeated approval prompts and dropped long-running tasks.
6.  [#32880 - Windows Desktop regression: Git writes stopped by workspace-write DENY ACL](https://github.com/openai/codex/issues/32880)  
    *Impact*: Windows sandbox permission updates block Git metadata writes across linked worktrees, breaking autonomous repository operations.
7.  [#55141 - macOS desktop: accumulating per-thread tool servers](https://github.com/openai/codex/issues/55141)  
    *Impact*: Restarting the desktop app under heavy local plugin usage causes orphan tool servers to accumulate, raising RAM pressure on macOS devices.
8.  [#45383 - Interrupted Codex sessions waste quota rebuilding context](https://github.com/openai/codex/issues/45383)  
    *Impact*: Interrupted multi-turn execution runs rebuild the complete context graph from scratch upon resume, quickly depleting token quota.
9.  [#59890 - Images 2.6 on Codex OAuth missing model selection and controls](https://github.com/openai/codex/issues/59890)  
    *Impact*: Third-party integrations utilizing Codex OAuth are locked out of new `gpt-image-2.6` features, animation flags, and model selection parameters.
10. [#59971 - Linux: Context compaction overweights last message over broader context](https://github.com/openai/codex/issues/59971)  
    *Impact*: The CLI context summarization pass on Linux disproportionately weighs the immediate previous turn, losing critical historical prompt boundaries.

---

## Key PR Progress

1.  [#60011 - Adapt multi-agent mode guidance for hosted tools](https://github.com/openai/codex/pull/60011)  
    Uses bundled mode policies when `multi_agent_v2.disable_native_tools` is set, ensuring models handle hosted multi-agent setups cleanly.
2.  [#60009 - Add custom gateway selection to TUI sign-in](https://github.com/openai/codex/pull/60009)  
    Adds an onboarding wizard step allowing local TUI users to select custom API gateways during initial login.
3.  [#60007 - Start cloud threads with the local GitHub project](https://github.com/openai/codex/pull/60007)  
    Passes local repository origins to cloud prewarming so remote threads automatically provision matching repo checkouts.
4.  [#60006 - Reduce SQLite write overhead for thread activity and history](https://github.com/openai/codex/pull/60006)  
    Optimizes database concurrency by performing atomic partial updates for timestamps and token counts instead of rewriting full thread metadata trees.
5.  [#60004 - Expose ChatGPT user IDs in account/read responses](https://github.com/openai/codex/pull/60004)  
    Exposes canonical `userId` fields to downstream app-server callers for ChatGPT and PAT-authenticated sessions.
6.  [#60003 - Apply runtime authentication to realtime connections](https://github.com/openai/codex/pull/60003)  
    Enforces active credential sources and transport policies across WebSockets reconnects and sideband handshakes.
7.  [#60001 - Add bounded original-evidence delivery for Guardian reviewers](https://github.com/openai/codex/pull/60001)  
    Delivers post evidence in source order while enforcing rigid model output budgets to prevent context overflow in Guardian subagent reviews.
8.  [#59991 - Preserve app invocation context across MCP tool refreshes](https://github.com/openai/codex/pull/59991)  
    Prevents metadata loss by preserving `_codex_apps.invocation_context` when connected MCP servers refresh their advertised tool definitions.
9.  [#59988 - Add inherited styling to TUI display trees](https://github.com/openai/codex/pull/59988)  
    Improves TUI rendering by supporting cascading text modifiers (bold, italic, color) and full-width row backgrounds.
10. [#59983 - Render typed prompts as Markdown in the TUI](https://github.com/openai/codex/pull/59983)  
    Renders styled Markdown syntax natively inside typed terminal prompts without dropping prompt gutters or hyperlinks.

---

## Feature Request Trends

*   **Multi-Agent Orchestration & Subagent Control**: Developers are pushing heavily for localized agent management—highlighted by demand for subagent permission persistence ([#59997](https://github.com/openai/codex/issues/59997)) and the new Guardian reviewer features landed in PRs [#59993](https://github.com/openai/codex/pull/59993)–[#60002](https://github.com/openai/codex/pull/60002).
*   **Terminal Desktop Integration**: Strong interest in native desktop notification integration, such as adding `osc777` toast triggers for Windows Terminal ([#58758](https://github.com/openai/codex/issues/58758)).
*   **Seamless Backend Switching**: Workarounds and features allowing developers to fluidly toggle between local execution, self-hosted gateways ([#60009](https://github.com/openai/codex/pull/60009)), and cloud execution environments without dropping session context ([#60007](https://github.com/openai/codex/pull/60007)).

---

## Developer Pain Points

*   **Process Leaks & High Memory Footprint**: Multiple high-traffic issues ([#30408](https://github.com/openai/codex/issues/30408), [#12491](https://github.com/openai/codex

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

# OpenCode Community Digest — 2026-11-07

## 1. Today's Highlights
OpenCode has released **v2.2.6**, introducing connection pooling for Model Context Protocol (MCP) servers to share connections across projects and cut down on active processes. Alongside the release, core maintainers have been heavily active merging critical TUI fixes—such as resolving terminal light/dark palette caching issues and restoring model-favoriting options—while laying foundational groundwork for the Code Mode VM.

---

## 2. Releases
* **[v2.2.6](https://github.com/anomalyco/opencode/releases/tag/v2.2.6)**
  * **Shared MCP Connections**: Implements connection pooling across projects for identical MCP server setups to lower resource consumption and speed up initialization.
  * **GUI Enhancements**: Added new layout slots and theme customization options for GUI plugins.

---

## 3. Hot Issues
1. **[[FEATURE]: support the Agent Plugins standard (#40993)](https://github.com/anomalyco/opencode/issues/40993)**
   * *Why it matters:* Requests adoption of the vendor-neutral `agent-plugins.org` packaging spec to bundle Agent Skills and MCP servers.
   * *Reaction:* Highly popular (21 👍, 17 comments), signaling strong developer desire for cross-platform agent component portability.
2. **[[FEATURE]: Setting to limit max number of parallel subagents (#27110)](https://github.com/anomalyco/opencode/issues/27110)**
   * *Why it matters:* Local model runners hit strict memory and context ceilings when spawning concurrent subagents.
   * *Reaction:* Continues to draw high community engagement (42 👍) as local LLM usage grows.
3. **[[BUG] V2: subagent with pending background work marked completed early (#48826)](https://github.com/anomalyco/opencode/issues/48826)**
   * *Why it matters:* Asynchronous shell or task subagents return premature replies to parents before work actually finishes.
   * *Reaction:* Active bug report tracing a core race condition in the V2 subagent lifecycle.
4. **[[FEATURE]: Collapsible tool output (code/diff/blocks) in TUI (#40096)](https://github.com/anomalyco/opencode/issues/40096)**
   * *Why it matters:* Long tool output blocks (Write, Edit, Shell) flood the TUI terminal interface, making chains of thought hard to trace.
   * *Reaction:* Triggered ongoing requests for folding mechanisms and companion slash commands.
5. **[[triaging] tui: model picker shows only subset of declared custom provider models (#62447)](https://github.com/anomalyco/opencode/issues/62447)**
   * *Why it matters:* Custom Ollama configurations via `@ai-sdk/openai-compatible` drop models in the TUI picker despite being returned by the local API endpoint.
   * *Reaction:* Highlights integration parity hurdles with local inference setups.
6. **[agents: stray CJK glyphs occasionally slip into Russian answers with multilingual models (#57844)](https://github.com/anomalyco/opencode/issues/57844)**
   * *Why it matters:* Cross-lingual token leakage occurs during localized responses with models like GLM or DeepSeek.
   * *Reaction:* Initiated debate around adding an explicit output-language guard option.
7. **[[FEATURE]: Plugin API: atomic "wake only if idle" for session.synthetic (#62324)](https://github.com/anomalyco/opencode/issues/62324)**
   * *Why it matters:* Extensibility request for plugins pushing automated notifications into user chats without interrupting active processing.
   * *Reaction:* Important architectural discussion for background plugin developers.
8. **[opencode update times out behind corporate npm mirror: installer hard-codes registry.npmjs.org (#62403)](https://github.com/anomalyco/opencode/issues/62403)**
   * *Why it matters:* Corporate environments utilizing private Artifactory/npm mirrors fail updates because the curl installer bypasses local configurations.
   * *Reaction:* Critical networking pain point for enterprise deployments.
9. **[Composer flags bare @words (e.g. Slack-style @here) as missing files (#50393)](https://github.com/anomalyco/opencode/issues/50393)**
   * *Why it matters:* Workspace path parsing assumes any `@` token refers to a local file, generating false-positive error banners.
   * *Reaction:* Addressed by recent hygiene pull requests cleaning up comment parsing.
10. **[goal: /goal stays queued and never runs after an undo (#62138)](https://github.com/anomalyco/opencode/issues/62138)**
    * *Why it matters:* Session state becomes deadlocked if an `/undo` command is executed right before kicking off a goal objective.
    * *Reaction:* Pinpoints an edge-case state machine corruption bug in goal scheduling.

---

## 4. Key PR Progress
1. **[[contributor] feat(core): enable the Code Mode VM by default in dev builds (#62444)](https://github.com/anomalyco/opencode/pull/62444)**
   * Moves `codemode_vm` directly into the official feature flag registry, deprecating hand-written switches.
2. **[fix(tui): use the terminal's light or dark mode over a cached palette (#62248)](https://github.com/anomalyco/opencode/pull/62248)**
   * Resolves issues where stale theme state files trapped the TUI in dark mode inside light terminal emulators.
3. **[feat(tui): collapse tool details behind a clickable header (#62437)](https://github.com/anomalyco/opencode/pull/62437)**
   * Introduces `session.tool_details` configuration options to fold bulky tool logs.
4. **[[contributor] feat(codemode): expose the VM's suspendable program API (#62413)](https://github.com/anomalyco/opencode/pull/62413)**
   * Exposes core bytecode VM primitives (`VmRuntime.program`, `VmRuntime.resume`, snapshots) for advanced execution logic.
5. **[fix(tui): return to MCP list after OAuth sign-in (#62245)](https://github.com/anomalyco/opencode/pull/62445)**
   * Fixes navigation drops that closed the TUI MCP dialog entirely upon finishing browser-based OAuth flows.
6. **[fix(core): keep agents whose description starts with a bracketed tag (#62250)](https://github.com/anomalyco/opencode/pull/62250)**
   * Prevents markdown agent parsers from silently dropping agent files whose frontmatter descriptions begin with square brackets (e.g., `[Tag]`).
7. **[fix(tui): allow favoriting models without a connected integration (#62244)](https://github.com/anomalyco/opencode/pull/62244)**
   * Restores model-starring mechanics for manually declared or custom config providers lacking a formal saved integration.
8. **[fix(app): only attach comment @mentions that exist (#62242)](https://github.com/anomalyco/opencode/pull/62242)**
   * Resolves false file-attachment warnings triggered by standard conversational text (like Slack-style `@here` mentions).
9. **[fix(core): keep grep results when a match is not valid UTF-8 (#62249)](https://github.com/anomalyco/opencode/pull/62249)**
   * Patches grep execution crashes occurring when encountering Latin-1 or GBK-encoded files.
10. **[release: v2.2.6 (#62450)](https://github.com/anomalyco/opencode/pull/62450)**
    * Official pull request aligning version tags and changelogs for the v2.2.6 production build.

---

## 5. Feature Request Trends
* **Ecosystem Standards**: Increasing push for multi-vendor interoperability specs, specifically adoption of the `agent-plugins.org` standard for bundling agent skills and MCP servers.
* **Local Resource Management**: Strong demand for controls limiting concurrent subagent execution and memory throttling to better accommodate local hardware footprints.
* **Interface Density Control**: Growing user need for collapsible UI components, compact tool output blocks, and better noise-reduction strategies in long TUI developer sessions.

---

## 6. Developer Pain Points
* **Environment & Proxy Friction**: CLI and update installers hard-coding official npm registries, causing timeouts for developers behind locked-down corporate mirrors (JFrog Artifactory).
* **Parser Strictness & Silence**: Silent failures when parsing agent markdown frontmatter or custom configurations containing standard characters (like brackets or `@` text flags) without warning logs.
* **State Recovery Glitches**: Intermittent desynchronization during stale-session recovery for parallel MCP calls and edge-case state locks following command rollbacks (`/undo`).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-11-07

## 1. Today's Highlights
The Pi ecosystem saw a massive wave of bug fixes and robustness improvements targeting cross-platform TUI rendering, AI provider streaming regressions, and file-handling edge cases. Core maintainers pushed out patches for Windows process management, OpenAI-compatible streaming quirks with LiteLLM/vLLM, and prompt template argument parsing bugs. Meanwhile, discussions around durable session persistence and extensible SDK agents continue to drive architectural debates.

---

## 2. Releases
*No new official releases were published in the last 24 hours.*

---

## 3. Hot Issues
1. **[#7730: High CPU usage on Mac OS with long session](https://earendil-works/pi/issues/7730)**  
   * **Why it matters:** Users experience 100%+ CPU spikes and memory bloat (600–800MB) tied to long session contexts on macOS.  
   * **Community reaction:** Highly tracked (12 👍, 30 comments) as a primary performance bottleneck for power users.
2. **[#10605: ChatGPT/OpenAI OAuth 403 issue](https://earendil-works/pi/issues/10605)**  
   * **Why it matters:** Plus-tier subscribers face 403 errors stating *"The ChatGPT user is not eligible for subscription sharing"* upon logging in.  
   * **Community reaction:** Frustrates paying users unable to authenticate via official subscription channels.
3. **[#8810: Extension-registered providers ignore defaultProvider/defaultModel](https://earendil-works/pi/issues/8810)**  
   * **Why it matters:** Fresh sessions intermittently fallback to a different provider's default model instead of honoring configuration settings.  
   * **Community reaction:** Bug impacts developers building custom ecosystems using extension-registered providers.
4. **[#9932: before_agent_start forced system prompt keeps tools that setActiveTools removed](https://earendil-works/pi/issues/9932)**  
   * **Why it matters:** Reconciling active toolsets fails when custom system prompts are forced, leading to ghost tools remaining advertised to the model.  
   * **Community reaction:** A critical hook ordering bug for advanced extension authors.
5. **[#10585: bash temp-file stream errors crash whole process on 1.0.4 (ENOSPC, EACCES)](https://earendil-works/pi/issues/10585)**  
   * **Why it matters:** Uncaught exceptions when `/tmp` runs out of space kill the entire agent process, erasing in-flight state.  
   * **Community reaction:** Demands more resilient error boundaries around stream handlers.
6. **[#11317: Allow SDK users to customize identity preamble without replacing default sections](https://earendil-works/pi/issues/11317)**  
   * **Why it matters:** Developers want to give embedded agents custom personas via `systemPromptOptions.sections.preamble` without forfeiting core rules and tools.  
   * **Community reaction:** A vital DX enhancement for embedding Pi into third-party apps.
7. **[#11676: pi-durable: Harness.close() leaves pi-ai provider session resources alive](https://earendil-works/pi/issues/11676)**  
   * **Why it matters:** Standalone Node processes leak WebSockets and idle timers because session resources aren't properly released on close.  
   * **Community reaction:** Addressed under the `pi-durable` stream of work to ensure clean resource lifecycles.
8. **[#11869: New StringEnum in Pi 1.5.0 breaks compile-time typing](https://earendil-works/pi/issues/11869)**  
   * **Why it matters:** Shifting away from TypeBox in `StringEnum` types tool parameter static typings down to `unknown`, breaking compile-time safety.  
   * **Community reaction:** Marked as a P0 blocker for TypeScript users updating to v1.5.0.
9. **[#11771: durable: per-conversation compaction policy](https://earendil-works/pi/issues/11771)**  
   * **Why it matters:** `CompactionPolicy` could previously only be configured harness-wide, restricting fine-tuning per conversation.  
   * **Community reaction:** Crucial for long-running autonomous workflows managed via `@earendil-works/pi-durable`.
10. **[#11876: edit and read tools are bypassed by shell commands](https://earendil-works/pi/issues/11876)**  
    * **Why it matters:** Models like Claude Opus/Sonnet occasionally resort to raw `sed` commands instead of using dedicated file tools, altering line endings incorrectly.  
    * **Community reaction:** Highlights prompt-adherence issues regarding native tools.

---

## 4. Key PR Progress
1. **[#11895: fix(coding-agent): match grep globs relative to path](https://earendil-works/pi/PR/11895)**  
   * Anchors ripgrep globs properly to the target search directory rather than forcing them to the process working directory.
2. **[#11896: fix(coding-agent): wait for image resize worker to terminate](https://earendil-works/pi/PR/11896)**  
   * Fixes a race condition on macOS/Node 24 where rapid image reads overlapped worker threads, causing process aborts.
3. **[#11893: fix(ai): translate sampling reasoning_effort through thinkingLevelMap](https://earendil-works/pi/PR/11893)**  
   * Ensures configuration-level reasoning effort correctly maps through `thinkingLevelMap` before hitting the wire.
4. **[#11891: fix(ai): omit empty tools array for tool history on openai-completions](https://earendil-works/pi/PR/11891)**  
   * Omits `"tools": []` payloads that cause vLLM 0.20+ and LiteLLM gateways to return 400 Bad Request errors.
5. **[#11890: fix(tui): draw fullscreen Kitty images after rows they cover on every terminal](https://earendil-works/pi/PR/11890)**  
   * Resolves rendering bugs on Orca and WezTerm where fullscreen inline images showed only their first row.
6. **[#11888: fix(coding-agent): record live thinking level on branch before each prompt](https://earendil-works/pi/PR/11888)**  
   * Fixes a bug where `/tree` navigation left the latest thinking level change on abandoned branches, restoring stale states upon resume.
7. **[#11886: fix(coding-agent): apply ctrl+o to user bash output shown while agent works](https://earendil-works/pi/PR/11886)**  
   * Corrects state bindings so that `ctrl+o` successfully expands `!` or `!!` output boxes generated while the agent is streaming.
8. **[#11882: openai-completions: split tool-call blocks when stream index and tool-call id disagree](https://earendil-works/pi/PR/11882)**  
   * Gracefully handles OpenAI-compatible providers that violate streaming specs by reusing the same index for distinct tool calls.
9. **[#11878: fix: allow local tools and console declarations in codemode](https://earendil-works/pi/PR/11878)**  
   * Removes hidden parameter bindings for `tools` and `console` in codemode to prevent `SyntaxError` redefinitions when scripts declare local variables.
10. **[#11873: fix(coding-agent): keep apostrophes in prompt template arguments](https://earendil-works/pi/PR/11873)**  
    * Prevents argument parsers from misinterpreting apostrophes as quote boundaries, fixing malformed prompts like `users cache`.

---

## 5. Feature Request Trends
* **Granular Session/SDK Controls:** High demand for configuring token compaction policies per-conversation and injecting custom identity preambles without stripping default guardrails.
* **Expanded Model Catalogs:** Frequent requests to ingest newer regional or alternative inference models (e.g., Z.AI's `glm-5.3-flashx`, Kimi's `k3.1-pro`, and QwenCloud's `deepseek-v4.1-flash-1017`).
* **Robust File Encoding & Tool Safety:** Strong community push to ensure file editing handles non-UTF-8 encodings (like GBK/UTF-16) and avoids corrupting line endings across mixed files.

---

## 6. Developer Pain Points
* **Type Safety Regression:** The breaking type-inference change introduced with `StringEnum` in v1.5.0 (`unknown` static types) has caused immediate friction for TypeScript developers.
* **Gateway & Provider Compatibility:** Streaming discrepancies with local or gateway-backed endpoints (such as vLLM and LiteLLM rejecting empty tools arrays or misaligned indices) continue to interrupt local LLM workflows.
* **Process Lifecycle Leaks:** Unreleased WebSocket resources in durable harnesses and missing Windows process tree termination (`taskkill` limitations) make clean background agent orchestration difficult.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest: 2026-11-07

## 1. Today's Highlights
Qwen Code development is currently focused on hardening the Managed Agent architecture and improving developer UX for the CLI and Web Shell. Significant progress is being made on resolving long-standing session management bugs and introducing more granular control over token management and memory services.

## 2. Releases
* **v0.26.9**: Maintenance release containing the latest patches and stability improvements for the agent framework. 
  [View Release v0.26.9](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.9)

## 3. Hot Issues
1. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724)**: Main CI failure in Managed Agent gate; tracking significant infrastructure instability (217 comments).
2. **[#13113](https://github.com/QwenLM/qwen-code/issues/13113)**: P1 bug causing session corruption due to a hardcoded 256 MiB transcript index limit.
3. **[#15597](https://github.com/QwenLM/qwen-code/issues/15597)**: Headless mode permission conflict prevents memory agents from saving state.
4. **[#16418](https://github.com/QwenLM/qwen-code/issues/16418)**: Critical security concern where auto-compaction grants unintended code implementation rights.
5. **[#15412](https://github.com/QwenLM/qwen-code/issues/15412)**: Long project paths on macOS break session recording due to directory name flattening.
6. **[#16425](https://github.com/QwenLM/qwen-code/issues/16425)**: Workflow agent approval prompts hang indefinitely in the CLI, causing deadlocked runs.
7. **[#15310](https://github.com/QwenLM/qwen-code/issues/15310)**: Model assumes POSIX/bash environments on Windows, leading to recurring command failures.
8. **[#15495](https://github.com/QwenLM/qwen-code/issues/15495)**: Undocumented threshold for image payload eviction in long chat sessions.
9. **[#16457](https://github.com/QwenLM/qwen-code/issues/16457)**: Multiple OAuth-protected MCP servers collide on port 7777, causing state invalidation.
10. **[#14629](https://github.com/QwenLM/qwen-code/issues/14629)**: Feature request to surface OpenRouter provider details in telemetry for better routing visibility.

## 4. Key PR Progress
1. **[#16432](https://github.com/QwenLM/qwen-code/pull/16432)**: Enables surface-level workflow agent approvals directly in the interactive TUI.
2. **[#16436](https://github.com/QwenLM/qwen-code/pull/16436)**: Adds an "Agent View" roster (Claude Code style) accessible via the Left arrow key.
3. **[#16438](https://github.com/QwenLM/qwen-code/pull/16438)**: Allows disabling of automatic image payload eviction via configuration settings.
4. **[#16495](https://github.com/QwenLM/qwen-code/pull/16495)**: Improves observability by recording OpenRouter backend and generation IDs.
5. **[#16493](https://github.com/QwenLM/qwen-code/pull/16493)**: Introduces repository event filters (allow/blocklists) for GitHub channel integrations.
6. **[#16488](https://github.com/QwenLM/qwen-code/pull/16488)**: Adds opt-in personal memory service integration backed by Holo.
7. **[#16475](https://github.com/QwenLM/qwen-code/pull/16475)**: Implements persistent session diagnostics (Context, Model stats, Resource usage) in the Web Shell.
8. **[#16477](https://github.com/QwenLM/qwen-code/pull/16477)**: Fixes path-length issues by bounding project directory names.
9. **[#15829](https://github.com/QwenLM/qwen-code/pull/15829)**: Prevents VS Code companion from wiping sibling model configuration settings.
10. **[#16482](https://github.com/QwenLM/qwen-code/pull/16482)**: Routes critical review/resolve permission gates to more stable ECS runner pools.

## 5. Feature Request Trends
* **Memory & Persistence**: Significant movement toward long-term memory integration (e.g., bzmem, Holo) and diagnostics.
* **Control & Visibility**: High demand for knobs to disable aggressive auto-eviction of tokens/images and better telemetry for routing providers.
* **UX/UI Parity**: Strong emphasis on bringing TUI/CLI interactions to parity with Web Shell capabilities, particularly regarding session management and approval flows.

## 6. Developer Pain Points
* **Environment Mismatches**: Windows users struggle with shell assumptions (bash vs. cmd) leading to wasted API tokens.
* **Permission Bottlenecks**: Developers are hitting "permission hangs" where agents enter deadlocks because they cannot prompt for human intervention properly in headless/background modes.
* **CI/CD Reliability**: The Managed Agent gate is currently experiencing intermittent but high-volume failure reports, impacting development velocity.
* **Session Scalability**: Long-running projects remain fragile due to filesystem naming limits on macOS and rigid index size constraints.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*