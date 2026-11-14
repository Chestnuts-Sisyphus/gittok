# AI CLI Tools Community Digest 2026-11-15

> Generated: 2026-11-14 23:30 UTC | Tools covered: 9

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

Here is the Claude Code community digest for **November 15, 2026**.

---

### Today's Highlights

Community discussions today are heavily focused on **agent resource governance** and **team-wide memory systems**. Developers are pushing for central management of agent-spawned sub-processes to prevent system instability on high-workload machines, alongside proposals for shared context across engineering teams. Key PR updates target background agent handling during deduplication and cross-platform reliability fixes for bundled plugins.

---

### Hot Issues

1. **[#38536: Shared Team Memory for Claude Code](https://github.com/anthropics/claude-code/issues/38536)**
   * **Why it matters:** Proposes extending Claude Code's local-only memory model into a shared team context layer so handoffs, code reviews, and architectural decisions flow between engineering team members automatically.
   * **Community Reaction:** High interest (34 comments, 11 👍), with developers emphasizing that re-indexing context across engineers is a major bottleneck in team workflows.

2. **[#91081: Resource governance for agent-spawned process trees](https://github.com/anthropics/claude-code/issues/91081)**
   * **Why it matters:** Requests built-in memory ceilings, system-pressure feedback, and teardown ordering for background tasks, subagents, and Bash processes started by Claude Code.
   * **Community Reaction:** Essential for multi-agent workflows where unthrottled agent trees risk freezing host workstations.

3. **[#98769: macOS `fseventsd` runaway on agent-heavy Macs](https://github.com/anthropics/claude-code/issues/98769)**
   * **Why it matters:** Heavy agent operations trigger an unrecoverable state where `fseventsd` consumes massive memory and pins CPU cores, blocking Claude Code at startup.

4. **[#97369: Changed MCP tool schema never updates in active sessions](https://github.com/anthropics/claude-code/issues/97369)**
   * **Why it matters:** Dynamic changes to Model Context Protocol (MCP) tool descriptions or input schemas are not re-registered in ongoing sessions even after running `/mcp reconnect` or using `--resume`.

5. **[#98725: Linux/Wayland renderer leaking `/dev/shm` file descriptors](https://github.com/anthropics/claude-code/issues/98725)**
   * **Why it matters:** Linux Desktop instances leak file descriptors until reaching the system limit of 1024 (typically after 7–25 hours of continuous runtime), freezing the UI.

6. **[#96860: `security-guidance` hook skipped on subscription sign-in](https://github.com/anthropics/claude-code/issues/96860)**
   * **Why it matters:** Highlights a security gap on Windows where automated security review hooks fail to run when signing in via subscription credentials.

7. **[#101782: Plugin API skips verification hooks for delayed `$.agent.spawn`](https://github.com/anthropics/claude-code/issues/101782)**
   * **Why it matters:** Subagent spawns initiated after an initial plugin hook returns bypass `tool.check` approvals, causing the action to be blocked in `auto` mode.

8. **[#93151: Desktop (Windows) PTY processes orphaned on idle session pause](https://github.com/anthropics/claude-code/issues/93151)**
   * **Why it matters:** Background PowerShell and `conhost.exe` instances are not cleaned up when a session enters idle pause, leading to resource accumulation over time.

9. **[#100651: Plugin Pane race condition during `ui.press` hook await](https://github.com/anthropics/claude-code/issues/100651)**
   * **Why it matters:** Asynchronous state reads during plugin UI button presses fail with UI handle mismatches if the pane redraws before execution finishes.

10. **[#92736: Request for long-session analytics metadata](https://github.com/anthropics/claude-code/issues/92736)**
    * **Why it matters:** Developers analyzing high-turn interactions (observed up to 796 turns per session) are requesting deeper programmatic telemetry alongside context compaction boundaries.

---

### Key PR Progress

1. **[#106972: Run dedupe agents in the foreground](https://github.com/anthropics/claude-code/pull/106972)**
   * Forces deduplication agents to run in the foreground by passing `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1`, preventing background tasks from being terminated mid-turn.

2. **[#95698: Fix execution path formatting for shell hooks in bundled plugins](https://github.com/anthropics/claude-code/pull/95698)**
   * Wraps hook script invocations for bundled plugins (`ralph-wiggum` and `output-style`) in explicit `bash` calls with quoted paths to resolve path-with-spaces failures.

3. **[#81672: Make `hookify` package imports path-independent](https://github.com/anthropics/claude-code/pull/81672)**
   * Adjusts `sys.path` handling in `hookify` so imports succeed regardless of the directory name assigned during marketplace installations.

4. **[#78445: Correct marketplace plugin documentation and metadata](https://github.com/anthropics/claude-code/pull/78445)**
   * Fixes documentation errors in the marketplace registry where plugin event trigger metadata diverged from actual implementation code.

---

### Feature Request Trends

* **Shared & Persistent Context:** Strong demand for cloud-synced team memory structures ([#38536](https://github.com/anthropics/claude-code/issues/38536)) to share architectural guidelines and context across multiple developers.
* **Granular Process & Resource Controls:** Requests for OS-level resource governors ([#91081](https://github.com/anthropics/claude-code/issues/91081)) to manage CPU/memory allocations for recursive agent tasks and background jobs.
* **UX & Navigation Enhancements:** Ongoing requests for terminal UI enhancements, such as jumping to previous prompts ([#63901](https://github.com/anthropics/claude-code/issues/63901)) and custom automated session naming patterns ([#83455](https://github.com/anthropics/claude-code/issues/83455)).

---

### Developer Pain Points

* **Resource Spikes & Process Leaks:** Subagent execution routinely leads to runaway OS processes (`fseventsd` on macOS, leaking `/dev/shm` descriptors on Linux Wayland, orphaned PTY processes on Windows).
* **Static MCP Schema Caching:** Active sessions fail to hot-reload updated tool definitions without a complete restart, frustrating developers actively building MCP servers.
* **Async Plugin Hook Flakiness:** Plugin developers are encountering race conditions and dropped security validations when handling asynchronous hooks or delayed subagent spawns.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — November 15, 2026

## Today's Highlights

Today’s Codex developments highlight major work around context payload optimization and platform sandbox stability. Core updates include PRs addressing context window bloat and lifecycle hooks ([#61562](https://github.com/openai/codex/pull/61562), [#61452](https://github.com/openai/codex/pull/61452)), alongside client features for realtime voice frame persistence ([#61473](https://github.com/openai/codex/pull/61473)) and multi-environment permissions ([#61494](https://github.com/openai/codex/pull/61494)). Meanwhile, community discussions center heavily on thread-poisoning issues caused by base64 image persistence and Computer Use OS artifacts.

---

## Releases

- **[rust-v0.171.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.5)**: Pre-release alpha iteration updating core Rust engine dependencies and internal app-server hooks.

---

## Hot Issues

1. **[#40060](https://github.com/openai/codex/issues/40060): Windows sandbox execpolicy false positive with PowerShell scripts**  
   *Why it matters:* Using `Start-Process` alongside HTTP URLs in PowerShell triggers execution policy blocks in the sandbox, halting automated scripts. Developers are demanding less aggressive string-matching heuristics.

2. **[#57101](https://github.com/openai/codex/issues/57101): Windows Computer Use capture border remains visible after turn completes**  
   *Why it matters:* The gold/yellow screen highlight border and display access handle stay active indefinitely post-turn, causing display clutter and potential privacy concerns.

3. **[#28316](https://github.com/openai/codex/issues/28316): Large base64 image tool outputs repeatedly resent in subsequent turn context**  
   *Why it matters:* Image payloads persist in full base64 strings across all future turn payloads, inflating wire requests unnecessarily and causing context size inflation.

4. **[#41338](https://github.com/openai/codex/issues/41338): Token vs. wire payload disparity for inline images wedges threads**  
   *Why it matters:* Inline images cost ~230 tokens internally but transfer 4.2 MB over the wire. Token-based auto-compaction fails to trigger, leaving desktop client threads wedged.

5. **[#18629](https://github.com/openai/codex/issues/18629): Base64 tool image outputs cause `400 Bad Request` on thread resume**  
   *Why it matters:* Accumulated `function_call_output` image objects permanently poison desktop session histories, rendering long-running threads unrestorable.

6. **[#53560](https://github.com/openai/codex/issues/53560): macOS desktop Work approvals immediately fail ("approval request no longer active")**  
   *Why it matters:* Desktop users on macOS cannot approve sandboxed actions, while the web app handles approvals fine, breaking local agent autonomy.

7. **[#61348](https://github.com/openai/codex/issues/61348): Request for continuous engineering workspace over disposable tasks**  
   *Why it matters:* Pro users are asking to bridge ChatGPT, ChatGPT Work, and Codex into persistent environments with retained state, context, and project history.

8. **[#20315](https://github.com/openai/codex/issues/20315): `browser-client.mjs` flagged as Trojan by Windows Defender**  
   *Why it matters:* Windows Defender false-positives block the browser-use skill on Windows environments, preventing automated web browsing tasks.

9. **[#58312](https://github.com/openai/codex/issues/58312): Plus tier 5-hour quota depleting ~5.6x faster**  
   *Why it matters:* Users report rapid rate-limit exhaustion under recent reasoning models, calling for transparent breakdown metrics on auto-compaction and subagent quota consumption.

10. **[#61547](https://github.com/openai/codex/issues/61547): Top-level streaming `error` event ignored, causing 5x retry loop in CLI 0.169.0**  
    *Why it matters:* Custom model implementations using the `responses` wire API fail to fail-fast on server errors, creating unnecessary load and delay.

---

## Key PR Progress

1. **[#61562](https://github.com/openai/codex/pull/61562): Unify model request hook lifecycles across sampling and compaction**  
   Pairs `PreModelRequest` and `PostModelRequest` hooks across sampling and compaction cycles, adding lifecycle IDs, cancellation statuses, and `thread_id` context.

2. **[#61494](https://github.com/openai/codex/pull/61494): Describe context and permissions per environment behind a feature flag**  
   Introduces `per_environment_context_description` to represent dynamic filesystem and network permissions across non-primary host environments.

3. **[#61490](https://github.com/openai/codex/pull/61490): Preserve current Cloud task state during navigation until replacement loads**  
   Prevents loss of local chat state, draft text, and pending streams if opening a distant Cloud task fails during history fetching.

4. **[#61488](https://github.com/openai/codex/pull/61488): Harden Git remote collection and cap metadata URL size**  
   Switches to NUL-delimited Git remote parsing and limits remote URL metadata to prevent exceeding the 8,096-character limit on Responses API requests.

5. **[#61486](https://github.com/openai/codex/pull/61486): TUI support for reading archived threads and unarchiving via shortcut**  
   Freezes input and displays read-only state for archived threads while allowing users to hit `U` to instantly unarchive and resume execution.

6. **[#61480](https://github.com/openai/codex/pull/61480): Snapshot pagination for persisted realtime history**  
   Adds `thread/realtime/list`

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

# OpenCode Community Digest — 2026-11-15

## 1. Today's Highlights
The OpenCode community is heavily focused on stabilizing V2 features, ironing out TUI rendering bugs, and handling infrastructure scaling for free tiers and model backends. Key discussions revolve around process management (such as zombie sub-processes under the `opencode-pty` daemon) and memory/resource overheads caused by eager MCP subprocess spawning. Meanwhile, maintainers continue to iterate on desktop SSH recovery and markdown parser optimizations.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues
1. **[#59387: [zen] Free tier issues](https://github.com/anomalyco/opencode/issues/59387)**  
   *Why it matters:* The central tracking issue for free-tier exhaustion, reset failures, and desktop version blockages.  
   *Community reaction:* Highly active with 367 comments, reflecting massive user volume hitting rate limit boundaries.
2. **[#33704: [FEATURE]: Add GUI Options to Edit Custom Providers and Manage Model Lists](https://github.com/anomalyco/opencode/issues/33704)**  
   *Why it matters:* Bridges the gap for users of local inference engines (LM Studio, Jan AI) who currently rely entirely on manual config modifications.
3. **[#63817: pty: shell commands leave zombies under opencode-pty daemon on Linux](https://github.com/anomalyco/opencode/issues/63817)**  
   *Why it matters:* A critical regression in v2.3.0 causing completed shell tasks to stay as zombie processes, draining host resources over time.
4. **[#37844: core: cached locations multiply MCP subprocesses](https://github.com/anomalyco/opencode/issues/37844)**  
   *Why it matters:* Architectural bug where V2 managed services spawn overlapping MCP subprocess trees per cached location, heavily taxing system memory.
5. **[#59794: session: all history images are re-sent on every request](https://github.com/anomalyco/opencode/issues/59794)**  
   *Why it matters:* Permanently breaks sessions on image-capped backends (like vLLM) by omitting history pruning for pasted/read images.
6. **[#63935: Prompt cache is lost when only reasoning_effort changes](https://github.com/anomalyco/opencode/issues/63935)**  
   *Why it matters:* Affects cost-efficiency and performance on deepseek variants by thrashing cache lines on minor parameter adjustments.
7. **[#53921: [FEATURE]: Add an ephemeral mode that does not persist sessions locally](https://github.com/anomalyco/opencode/issues/53921)**  
   *Why it matters:* Highly requested privacy feature allowing developers to use OpenCode without leaving local database breadcrumbs.
8. **[#53028: [FEATURE]: Spawn MCP servers on demand (first tool use)](https://github.com/anomalyco/opencode/issues/53028)**  
   *Why it matters:* Eager startup of all configured stdio MCP servers creates unnecessary latency and resource overhead at session launch.
9. **[#63971: tui: hardware cursor paints at intermediate cells while a response streams](https://github.com/anomalyco/opencode/issues/63971)**  
   *Why it matters:* Visual glitch on macOS TUI v2 where the terminal cursor darts across the transcript during high-speed text generation.
10. **[#63931: network: MAC address spoofing to bypass rate limits on free models](https://github.com/anomalyco/opencode/issues/63931)**  
    *Why it matters:* Security/compliance concern where the app allegedly rotates MAC addresses to dodge free-tier request throttling on Windows.

---

## 4. Key PR Progress
1. **[#63989: Opentui 0.9.0](https://github.com/anomalyco/opencode/pull/63989)**  
   *Summary:* Integrates OpenTUI 0.9.0, shifting plugin markdown code-block renderers to handle `OpenTUI` native objects rather than legacy marked tokens.
2. **[#63988: fix(desktop): connect to SSH and WSL servers whatever their OpenCode version](https://github.com/anomalyco/opencode/pull/63988)**  
   *Summary:* Loosens version enforcement checks for remote Electron desktop connections over SSH and WSL.
3. **[#63477: cli: port to native](https://github.com/anomalyco/opencode/pull/63477)**  
   *Summary:* Major ongoing porting effort shifting the core CLI stack toward native performance (previewing via `opencode-native-preview`).
4. **[#63986: feat(tui): show tool elapsed time in V2 clients](https://github.com/anomalyco/opencode/pull/63986)**  
   *Summary:* Restores and modernizes the tool execution duration metric for V2 TUI interfaces.
5. **[#63542: fix(ssh): recover when the remote service port is taken](https://github.com/anomalyco/opencode/pull/63542)**  
   *Summary:* Fixes reconnection logic failures following a dropped SSH session where target ports remained locked.
6. **[#55528: refactor(browser): stream proxy traffic over binary WebSockets](https://github.com/anomalyco/opencode/pull/63542)**  
   *Summary:* Drastically improves remote asset/image transfer performance (~18× speedup over high RTT links) by leveraging binary WebSockets.
7. **[#55515: fix: keep ids ascending across clock steps and never end Gemini requests on a model turn](https://github.com/anomalyco/opencode/pull/63515)**  
   *Summary:* Resolves strict Gemini API structural requirements where requests cannot terminate cleanly on a model-generated turn.
8. **[#55502: feat(cli): add pair --reset to discard a stuck OpenTunnel tunnel](https://github.com/anomalyco/opencode/pull/63502)**  
   *Summary:* Introduces a recovery flag to purge invalid OpenTunnel state data when remote certificate pairing hangs.
9. **[#55496: feat(app): add subagents side-panel tab](https://github.com/anomalyco/opencode/pull/63542)**  
   *Summary:* Ports the popular V1 subagent management interface into the modern V2 application layout.
10. **[#55450: fix(core): chunk session import message inserts under the SQLite parameter limit](https://github.com/anomalyco/opencode/pull/55450)**  
    *Summary:* Prevents SQL crashes when importing large legacy session transcripts by batching multi-row `INSERT` statements under SQLite bind limits.

---

## 5. Feature Request Trends
* **Ephemeral and Stateless Modes:** Growing demand for operating without persistent local databases (`#53921`) for privacy-conscious workflows.
* **Granular Lifecycle Management for Extensions:** Users want on-demand initialization for heavy extensions (such as lazy-loading MCP servers via `#53028` instead of eager launching).
* **UI Customization & Layout Control:** Requests for compact TUI padding (`#63965`), sidebar layout modifications (`#60241`), and unified GUI menus for local inference configuration (`#33704`).
* **Internationalization Expansion:** Continued pressure to close missing keys in localized dictionaries (e.g., zh/zht locales falling back to English strings, `#53858`).

---

## 6. Developer Pain Points
* **Process Leakage and Resource Bloat:** Unreaped shell process zombies under `opencode-pty` on Linux (`#63817`) and runaway MCP subprocess multiplication (`#37844`) continue to cause memory leaks during long developer sessions.
* **Context Bloat & Payload Limits:** Repeating full session image histories on every single request (`#5794`) leads to sudden, hard-breaking errors on strict local model backends.
* **Environment Inconsistencies & Display Glitches:** Terminal color scheme pollution upon exit (`#63977`), floating hardware cursors during stream painting (`#63971`), and platform-specific installation roadblocks (e.g., Android version flags, `#63791`).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest (2026-11-15)

## 1. Today's Highlights
The Pi ecosystem is seeing heavy developer activity around context-window optimization, auth resilience, and CLI reliability. Key issues include massive token bloat caused by redundant `searchTools` payloads and edge cases in environment variable expansion for MCP transports. Meanwhile, recent pull requests focus on refining model reasoning controls for GitHub Copilot and adding granular configuration options for tool output limits.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Hot Issues
1. **[#12165](https://earendil-works/pi/issues/12165) — `searchTools()` returns full tool descriptions (~25% of context)**
   * *Why it matters:* Measured at 36KB per call across 73 invocations, tool discovery results consumed nearly 950KB (25% of a long session's context). 
   * *Community reaction:* Highlights a major token efficiency trap in long-running coding sessions.
2. **[#11950](https://earendil-works/pi/issues/11950) — Tool calls run concurrently with bash, causing race conditions**
   * *Why it matters:* When a model triggers a bash command and a file read in the same message, the read executes immediately while bash is still writing, returning stale or missing data. Marked as `prio:p0`.
   * *Community reaction:* Frustration over models receiving build errors due to premature reads.
3. **[#12154](https://earendil-works/pi/issues/12154) — Sessions with >120k entries post-compaction crash on startup**
   * *Why it matters:* Triggers a `RangeError: Maximum call stack size exceeded` in `buildContextEntries`, rendering long sessions completely unrecoverable even with `-ne`.
   * *Community reaction:* Severe reliability concern for heavy, multi-day agent workloads.
4. **[#10654](https://earendil-works/pi/issues/10654) — Transport resolution skips environment variable expansion in `mcp.json`**
   * *Why it matters:* Direct URL definitions utilizing `${VAR}` syntax fail to resolve correctly, forcing developers to hack around schemas.
   * *Community reaction:* Blocks clean configuration management for Model Context Protocol servers.
5. **[#12164](https://earendil-works/pi/issues/12164) — `/login` misreports stored API keys as configured when dynamic `!command` fails**
   * *Why it matters:* When an external secrets-manager CLI session expires, `/login` still displays a green configured mark, leading to silent request failures downstream.
   * *Community reaction:* Highlights brittle integration points with external credential helpers.
6. **[#11006](https://earendil-works/pi/issues/11006) — GitHub Copilot Enterprise admin-enabled models remain hidden after restart**
   * *Why it matters:* OAuth credential `availableModelIds` are aggressively cached, meaning newly provisioned enterprise models do not appear in the picker without clearing auth cache.
   * *Community reaction:* Annoying friction for enterprise users adopting new models.
7. **[#12172](https://earendil-works/pi/issues/12172) — WSL installer adopts Windows install via `/mnt/c` path interop**
   * *Why it matters:* Running `install.sh` inside WSL picks up the Windows `pi` launcher via PATH interop and prompts the user to uninstall/reinstall the Windows binary.
   * *Community reaction:* Cross-platform environment confusion for Windows Subsystem for Linux users.
8. **[#12158](https://earendil-works/pi/issues/12158) — Move machine-written state out of `settings.json` into a separate state file**
   * *Why it matters:* Pi currently mixes user preferences with internal state (`lastChangelogVersion`, `deviceId`, `trackingId`) inside `settings.json`.
   * *Community reaction:* Desired cleanup for better dotfile management and version control tracking.
9. **[#12159](https://earendil-works/pi/issues/12159) — Bump or relax exact `undici` 8.12.3 pin due to security advisories**
   * *Why it matters:* The package locks `undici` at an exact version containing multiple recent security advisories (including one high severity) fixed in 8.12.4.
   * *Community reaction:* Vulnerability scanners flagging downstream dependencies.
10. **[#12101](https://earendil-works/pi/issues/12101) — Make `developer` role opt-in for OpenAI-compatible instruction messages**
   * *Why it matters:* Adapters sending the `developer` role to unclassified endpoints break certain models (like Groq Qwen configurations) with HTTP 400 errors, which resolve cleanly when forced to `system`.
   * *Community reaction:* Crucial for broader compatibility with alternative OpenAI-compatible providers.

## 4. Key PR Progress
1. **[#12163](https://earendil-works/pi/pulls/12163) — Add `toolOutput.maxBytes` and `toolOutput.maxLines` settings**
   * Introduces configurable limits (defaulting to 51,200 bytes and 2,000 lines) for bash and file-read model-facing excerpts, preventing runaway token usage.
2. **[#12110](https://earendil-works/pi/pulls/12110) — Send `reasoning_effort` and read reasoning tokens for GitHub Copilot**
   * Fixes hardcoded `supportsReasoningEffort: false` limitations for Copilot's Gemini and Kimi variants, enabling proper thinking levels.
3. **[#12162](https://earendil-works/pi/pulls/12162) — Add Docker template that clones repo for Coder workspace**
   * Standardizes workspace template sources under `coder/` to streamline remote environments with `code-server`.
4. **[#12170](https://earendil-works/pi/pulls/12170) — Expose `navigate_tree` command and fix user-message leaf rewind in RPC mode**
   * Bridges RPC clients with native session navigation and fixes an early-return bug in `AgentSession.navigateTree()`.
5. **[#12176](https://earendil-works/pi/pulls/12176) — Fix codemode batching hiding skill reads in tool UI** *(Closed)*
   * Addressed issues where batched execution swallowed direct `[skill]` activations, improving transparency.
6. **[#12175](https://earendil-works/pi/pulls/12175) — Fullscreen double-click selection adjustments** *(Closed)*
   * Refined terminal double-click behavior to preserve full URL schemes while stripping trailing sentence periods.
7. **[#12171](https://earendil-works/pi/pulls/12171) — Include built-in slash commands in command history** *(Closed)*
   * Enabled up-arrow history recall for internal commands like `/reload`.
8. **[#12174](https://earendil-works/pi/pulls/12174) — Bind Cmd+C to copy fullscreen text selection on macOS** *(Closed)*
   * Fixed terminal integration to respect standard copy shortcuts inside fullscreen mode.
9. **[#12169](https://earendil-works/pi/pulls/12169) — Preserve SSE error codes and types before retry classification** *(Closed)*
   * Fixed bug where HTTP 200 SSE responses carrying error bodies (like code 503) terminated turns prematurely without triggering retry logic.
10. **[#12167](https://earendil-works/pi/pulls/12167) — Prevent uncaught `AbortError` on codemode sibling file read cancellation** *(Closed)*
    * Handled graceful cancellation flows when file reads encounter `ENOENT` during parallel batching.

## 5. Feature Request Trends
* **Context & Token Optimization:** High demand for trimming redundant payloads (such as tool discovery descriptions) and allowing hard bounds on tool output sizes.
* **Granular CLI & State Separation:** Moving internal app-state (like telemetry and tracking IDs) out of human-editable configuration files (`settings.json`).
* **Robust Provider Interoperability:** Better handling of alternative OpenAI-compatible endpoints, specifically regarding message roles (`developer` vs. `system`) and streaming error parsing.

## 6. Developer Pain Points
* **Concurrency Race Conditions:** Models attempting to read files or logs while a parallel `bash` command is still executing, leading to false-positive failures.
* **Fragile Authentication & Caching:** OAuth caches failing to refresh enterprise-level model additions and dynamic token CLI commands failing silently behind green status indicators.
* **Context Bloat:** Tool discovery systems (`searchTools`) consuming disproportionate chunks of the active context window in extended coding agent loops.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

### **Qwen Code Community Digest | 2026-11-15**

#### **1. Today's Highlights**
Development activity has shifted heavily toward stabilizing the upcoming **1.0 Preview loop kernel** and refining the **Web Shell** experience for multi-workspace environments. Engineering focus is currently split between resolving high-priority CI flakiness and implementing robust "Managed Agent" capabilities, including better filesystem integration and session handling.

#### **2. Releases**
*   **v0.27.2-nightly.20261113.6f754be654**: Introduced feature-level support for registering client filesystems into managed sessions (via PR #16844).

#### **3. Hot Issues**
1.  **[#14724] Managed Agent CI Failure**: Persistent "No test identified" errors (367 comments) remain the project's most significant blocker.
2.  **[#11680] E2E Test Instability**: Continues to track non-deterministic CI failures in the `sandbox:docker` environment.
3.  **[#17045] 1.0 Preview Kernel Landing**: The primary tracking issue for moving the event-driven kernel to `main`.
4.  **[#17234] ACP Agent-Loop Parity**: A P1 bug regarding kernel/shared round mismatches in integration testing.
5.  **[#16824] Persistent Model Hallucination**: Users report the model incorrectly renames projects (e.g., "Luminum" to "Lulumi") even after clean reinstalls.
6.  **[#16371] Nightly Lane Fragility**: Tracking a recurring pattern where rotating timing-sensitive tests cause nightly failures.
7.  **[#17261] Child Agent Deadlock**: Managed agents fail to output progress, hitting `hosted_turn_deadline_exceeded`.
8.  **[#17222] CI Runner Misrouting**: Fork-internal PRs are incorrectly routed to internal ECS fleets, causing queue starvation.
9.  **[#17289] Custom Command Injection**: High-priority bug where typed arguments are incorrectly parsed by `String.prototype.replaceAll` patterns.
10. **[#17288] Security Reporting Gap**: A community request to enable GitHub’s private vulnerability reporting, as the current external portal is inaccessible for some regions.

#### **4. Key PR Progress**
1.  **[#17228] Web Shell Managed Worktrees**: Enables Codex-style isolated worktree sessions for Web Shell, defaulting to detached HEAD for parallel safety.
2.  **[#17219] Mac CI Stabilization**: Aligns host-dependent witnesses with GNU-date capabilities to fix nightly legs.
3.  **[#17285] Agent Loop Design Ledger**: Documents the roadmap and rollout rules for the 1.0 architecture migration.
4.  **[#16943] `/memory show` Command**: Adds the requested functionality to inspect current session memory contents directly.
5.  **[#17268] Terminal Watchdog Adjustment**: Increases wait budgets for managed runtime tests to accommodate slower CI hosts.
6.  **[#16679] ACP Error Surfacing**: Fixes `todo_write` failures to properly report to the client rather than dropping frames.
7.  **[#16439] Prelude Replay**: Persists the startup prelude to ensure consistent state on session resumption.
8.  **[#17276] Web Shell UX Fix**: Resolves UI issues with the copy menu failing when selection boundaries hit row chrome.
9.  **[#16607] URL Authority Sanitization**: Fixes provider-warning sanitization to prevent leakage of credentials.
10. **[#17198] Web Shell Local Files**: Simplifies discovery and usage of the client-files bridge.

#### **5. Feature Request Trends**
*   **Agent Parity**: Significant focus on bringing the agent loop to 1.0 parity through event-driven kernels.
*   **Multi-Workspace Management**: Increasing demand to view and manage tasks/goals across multiple workspaces within a single daemon instance.
*   **Observability**: Developers want better visibility into agent memory state (e.g., `/memory show`) and clearer debugging for managed agent crashes.

#### **6. Developer Pain Points**
*   **CI "Red Fatigue"**: The recurring failure of timing-sensitive E2E tests is creating significant noise, making it difficult for contributors to identify genuine regressions.
*   **Managed Agent Reliability**: Complexity in child-agent delegation on external workspaces is causing "dead" turns, leading to user frustration.
*   **Documentation Gap**: The lack of Chinese translations for critical design docs (as per project rules) is stalling the merge process for several features.
*   **Security Accessibility**: International contributors are struggling to report vulnerabilities via the current mandated external portals.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*