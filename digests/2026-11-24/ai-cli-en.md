# AI CLI Tools Community Digest 2026-11-24

> Generated: 2026-11-24 04:30 UTC | Tools covered: 9

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

Here is the Claude Code Community Digest for **November 24, 2026**.

---

### 1. Today's Highlights
The release of **v2.1.331** extends Code Mode terminal support to major enterprise cloud platforms, including Amazon Bedrock, Google Cloud’s Agent Platform, and Microsoft Foundry. Community discussions today are heavily focused on background agent daemon instability, quota hyper-depletion reports on Ultra plans, and critical safety concerns surrounding automated directory cleanups in `auto` permission mode.

---

### 2. Releases
*   **[v2.1.331](https://github.com/anthropics/claude-code/releases/tag/v2.1.331)**
    *   **Code Mode expansion:** Added terminal session support for Code Mode on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and Claude Platform on AWS.
    *   **Enterprise Gateway:** Introduced `oidc.groups_jsonpath` configuration to parse group memberships from matching entries within JSON array payloads.

---

### 3. Hot Issues

1. **[#96326](https://github.com/anthropics/claude-code/issues/96326): Prompt instructions ignored; model drifts into English after tool calls**
   * **Impact:** High (42 👍, 25 comments). 
   * **Details:** In long agentic sessions using Opus 5.5, the model frequently reverts to English immediately after reading English tool outputs, violating explicit Japanese language rules specified in `~/.claude/CLAUDE.md`. Manual corrections fail to hold over subsequent context turns.

2. **[#30675](https://github.com/anthropics/claude-code/issues/30675): Feature request for shared context across CLI, Web, and Cowork**
   * **Impact:** Core architectural request (26 👍, 17 comments).
   * **Details:** Developers report friction due to isolated context silos between the Claude Code CLI, Claude.ai, Cowork, and mobile apps. Users are asking for shared memory and context synchronization across the product suite.

3. **[#94393](https://github.com/anthropics/claude-code/issues/94393): `Monitor` tool ignores persistence flags & caps at ~30 minutes**
   * **Impact:** High (32 👍, 14 comments).
   * **Details:** The `Monitor` tool drops persistent flags and terminates after ~30 minutes even during active, non-idle sessions, despite schema caps defined at 3,600,000ms (1 hour).

4. **[#87891](https://github.com/anthropics/claude-code/issues/87891): Background daemon leaks stale worker processes (~7.1 GB over 6 weeks)**
   * **Impact:** System performance (6 👍, 7 comments).
   * **Details:** The background daemon fail to reap stale workers or unclaimed spare processes on macOS, re-adopting them on every daemon restart and leaking dozens of process instances over time.

5. **[#86001](https://github.com/anthropics/claude-code/issues/86001): Interrupted tool calls misclassified as `user-rejected`**
   * **Impact:** Agent loop logic (2 👍, 7 comments).
   * **Details:** Mid-execution tool interruptions send a `user-rejected` error to the model stating the tool never ran, even when partial execution occurred and an internal `interrupted` enum state exists.

6. **[#97847](https://github.com/anthropics/claude-code/issues/97847): Synced plugin updates fail open on active sessions**
   * **Impact:** Security risk (5 comments).
   * **Details:** When Session B updates a plugin synced from claude.ai, it moves Session A's active plugin folder to `.trash`. Session A's plugin hooks subsequently fail open, bypassing expected safety checks.

7. **[#106818](https://github.com/anthropics/claude-code/issues/106818) & [#111921](https://github.com/anthropics/claude-code/issues/111921): Autonomous execution causing unexpected data loss**
   * **Impact:** Critical safety & data loss.
   * **Details:** Users report that autonomous execution in `auto` mode on Windows/macOS has resulted in non-audited test executions and directory cleanup commands that deleted files outside the active git repository.

8. **[#111685](https://github.com/anthropics/claude-code/issues/111685) & [#111837](https://github.com/anthropics/claude-code/issues/111837): Rapid Ultra quota depletion via unattributed usage**
   * **Impact:** Billing transparency (4 comments).
   * **Details:** Multiple reports detail weekly Ultra account quotas being 100% depleted within 24 hours, with telemetry attributing up to 84% of usage to "Other" or phantom model calls not visible in CLI logs.

9. **[#74133](https://github.com/anthropics/claude-code/issues/74133): Orphaned background sub-agents become invisible to main loop**
   * **Impact:** Multi-agent orchestration (3 comments).
   * **Details:** Sub-agents spawned via the `Agent` tool can spawn child processes and return to the main loop without terminating those children, leaving orphaned processes executing indefinitely in the background.

10. **[#92383](https://github.com/anthropics/claude-code/issues/92383) & [#111903](https://github.com/anthropics/claude-code/issues/111903): Cross-session `send_message` silently dropped in `auto` mode**
    * **Impact:** Inter-process communication (3 comments).
    * **Details:** Cross-session IPC messages via `ccd_session_mgmt` are silently dropped when the sender is in `auto` permission mode, despite UI transcripts showing the message as delivered.

---

### 4. Key PR Progress

*   **[#11713](https://github.com/anthropics/claude-code/pull/11713) — `feat: Add developer-utilities plugin`** *(Closed)*
    *   Proposed a suite of 5 custom commands (`/list-sessions`, `/label-session`, `claude-resume`, etc.). Closed as these core session management utilities have been natively absorbed into recent CLI builds.
*   **[#45553](https://github.com/anthropics/claude-code/pull/45553) — `resolve duplicate IPs`** *(Closed)*
    *   Housekeeping PR addressing duplicate IP resolutions in backend utility networks.

---

### 5. Feature Request Trends

*   **Cross-Tool Context Synchronization:** High demand ([#30675](https://github.com/anthropics/claude-code/issues/30675)) for persistent agent memory shared seamlessly across terminal sessions, web workspace tabs, desktop apps, and Cowork instances.
*   **Native Session Lifecycle Control:** Developers are requesting native `Pause`, `Hibernate`, and `Resume` directives ([#111870](https://github.com/anthropics/claude-code/issues/111870)) for long-running single and parallel agent sessions in both VS Code and CLI interfaces.

---

### 6. Developer Pain Points

*   **Background Worker Leaks & State Corruption:** Unmanaged daemon worker spawning ([#87891](https://github.com/anthropics/claude-code/issues/87891)), backgrounding creating duplicated session IDs ([#87984](https://github.com/anthropics/claude-code/issues/87984)), and orphaned sub-agents ([#74133](https://github.com/anthropics/claude-code/issues/74133)) continue to degrade system resources during extended usage.
*   **Data Loss Risk in `auto` Mode:** Deep frustration regarding autonomous mode safety boundaries. Unsanitized test execution scripts and automated file cleanup tasks are running broad file operations outside target repositories ([#106818](https://github.com/anthropics/claude-code/issues/106818), [#111921](https://github.com/anthropics/claude-code/issues/111921)).
*   **Unclear Usage & Quotas:** Lack of granular billing/token telemetry causing unexpected limit exhaustion on Ultra plans due to background loops or non-transparent sub-agent tasks ([#111685](https://github.

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

# GitHub Copilot CLI Community Digest — 2026-11-24

## 1. Today's Highlights
The latest `v1.0.115-8` release brings meaningful lifecycle updates, grouping subagent usage by configured names and improving Assisted Permissions fallback models. Meanwhile, community discussions heavily spotlight Model Context Protocol (MCP) authentication limitations, cross-platform file locking bugs on Windows, and session stability issues in both local and cloud-hosted environments.

---

## 2. Releases
### [v1.0.115-8](https://github.com/github/copilot-cli/releases/tag/v1.0.115-8)
* **Subagent Telemetry:** `--usage-output-file` now groups subagent usage by its configured name instead of invocation IDs, while cleanly reporting individual launch counts.
* **Assisted Permissions:** The permission review model can now dynamically fall back to an alternate model if the initial review stalls or fails, cutting down on unnecessary user approval prompts.

---

## 3. Hot Issues
1. **[#4203 - Remote MCP (OAuth): expired access token forces interactive re-auth](https://github.com/github/copilot-cli/issue/4203)**
   * *Why it matters:* Forces users into manual, interactive log-ins even when a valid refresh token is cached.
   * *Reaction:* Highly active with 6 thumbs-up; developers want silent OAuth token refreshes following RFC 6749.
2. **[#2243 - Worktrees are a nightmare, should be disabled by default](https://github.com/github/copilot-cli/issue/2243)**
   * *Why it matters:* Automated worktree creation leaves users struggling to apply accumulated changes back to main repositories cleanly.
   * *Reaction:* Extremely polarizing topic, gathering 21 thumbs-up from frustrated developers.
3. **[#5255 - Windows: elevated session creates .mcp-writer.lock preventing non-elevated access](https://github.com/github/copilot-cli/issue/5255)**
   * *Why it matters:* Running an administrative session locks out standard-user sessions from initializing any MCP servers (`os_error=5`).
   * *Reaction:* Critical cross-session bug for Windows developers utilizing mixed-privilege workflows.
4. **[#4920 - Local stdio MCP server silently dropped during session-ID swap on startup](https://github.com/github/copilot-cli/issue/4920)**
   * *Why it matters:* MCP servers connected during the preliminary placeholder session get dropped when swapping to the real session ID on `--resume` or `/new`.
   * *Reaction:* Disrupts extension tooling consistency right at session initialization.
5. **[#5550 - Built-in GitHub MCP read tools unavailable to custom agents when `gh` is on `PATH`](https://github.com/github/copilot-cli/issue/5550)**
   * *Why it matters:* Intercepts custom agents from reading GitHub issues natively despite explicit scope configurations.
   * *Reaction:* Surfaced via HVE Core backlog tracking, impacting local GitHub integration workflows.
6. **[#5381 - Prompt mode: extension tool permission request hangs forever](https://github.com/github/copilot-cli/issue/5381)**
   * *Why it matters:* In `copilot -p` mode, custom extension tool permission prompts bypass hooks and block execution indefinitely until killed.
   * *Reaction:* Completely halts non-interactive automation scripts dependent on plugins.
7. **[#5557 - Interactive mode fails on invalid MCP output schema while noninteractive succeeds](https://github.com/github/copilot-cli/issue/5557)**
   * *Why it matters:* A malformed MCP tool schema (`outputSchema.anyOf: null`) completely bricks interactive turns while noninteractive mode ignores it.
   * *Reaction:* Highlights a lack of fault tolerance and insufficient error reporting regarding offending tool indexes.
8. **[#5556 - ACP mode no longer emits `agent_thought_chunk` since 1.0.110](https://github.com/github/copilot-cli/issue/5556)**
   * *Why int matters:* Strips out reasoning summaries for Agent Client Protocol (ACP) integrations, leaving clients blind during long model thinking blocks.
   * *Reaction:* Breaks UI expectations for third-party clients rendering live "thinking" indicators.
9. **[#4805 - Sessions become unrevivable due to stale `inuse.<pid>.lock` from crashed hosts](https://github.com/github/copilot-cli/issue/4805)**
   * *Why it matters:* Clean, non-corrupt session logs (`events.jsonl`) remain locked and inaccessible because stale process locks are never reclaimed.
   * *Reaction:* Prevents recovery of critical historical context after unexpected host crashes.
10. **[#4323 - Comments in `.mcp.json` not supported, causing all workspace MCP servers to be skipped](https://github.com/github/copilot-cli/issue/4323)**
    * *Why it matters:* Repository-level configurations parsed as strict JSON fail entirely if developers include standard `//` or `/* */` comments.
    * *Reaction:* Frustrates teams trying to document shared workspace tool settings.

---

## 4. Key PR Progress
1. **[#5554 - Add opt-in connection token generation to the CLI container](https://github.com/github/copilot-cli/pull/5554)**
   * *Details:* Introduces the `COPILOT_CONNECTION_TOKEN_GENERATE=true` environment variable, enabling local SDK clients to connect to headless containers instantly by printing a fresh random token at startup without pre-configured secrets.

---

## 5. Feature Request Trends
* **Flexible MCP Integration & Auth:** Strong demand for advanced remote MCP capabilities, including dynamic header generators (parity with Claude Code's `headersHelper`), tenant-aware OAuth broker fixes for Windows guest accounts, and relaxed parsing for JSON workspace configuration files.
* **Granular Enterprise & Sandbox Policies:** Requests to enforce standardized security guardrails, such as mandatory CLI sandboxing policies pushed across GitHub enterprise tiers.
* **Context & Session Portability:** Improvements to long-term memory retrieval across historical sessions to avoid redundant problem-solving, along with robust recovery mechanisms for orphaned or locked session files.

---

## 6. Developer Pain Points
* **Windows File-Locking & Permissions:** Intermittent access-denied errors (`os_error=5`) when handling plugins or shared MCP writer locks between elevated and non-elevated user contexts.
* **Non-Interactive & Extension Reliability:** Headless and prompt-mode executions (`copilot -p`) frequently stalling indefinitely due to unhandled custom tool permission prompts or unacknowledged execution events.
* **Cloud & Mobile Session Stability:** Dropouts in live connections for cloud sandbox environments and GitHub Mobile (Android) when backgrounding apps, often requiring full application restarts.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-11-24

## 1. Today's Highlights
OpenCode has released **v2.4.1** and **v2.4.0**, highlighted by a new built-in desktop browser that imports browser history/extensions into a persistent profile and crucial session-saving fixes for older macOS SQLite environments. Meanwhile, the core engineering team is actively tackling background service stability under heavy parallel workloads, adding opt-in OS-level sandboxing, and rolling out expansive UI improvements for the experimental desktop Inbox and session management.

---

## 2. Releases
- **[v2.4.1](https://github.com/anomalyco/opencode/releases/tag/v2.4.1)**
  - **macOS 12 Session Fix**: Restores assistant message saving capabilities on older SQLite versions native to macOS 12 ([#65771](https://github.com/anomalyco/opencode/pull/65771)).
  - **Config-Only Providers**: Explicitly surfaces custom models configured purely via environment files/config (such as Ollama additions).
- **[v2.4.0](https://github.com/anomalyco/opencode/releases/tag/v2.4.0)**
  - **Built-In Desktop Browser**: Introduces persistent browsing profiles allowing seamless sign-in imports from Chrome, Edge, Firefox, and Safari, alongside full support for Chromium extensions.

---

## 3. Hot Issues
1. **[#54267: Relaunch fails with "Managed service port already in use"](https://github.com/anomalyco/opencode/issue/54267)**
   - *Why it matters*: Prevents `opencode` CLI restarts when previous background services linger, creating frustrating deployment lockouts. (14 comments)
2. **[#57849: opencode-go/deepseek-v4.1-flash pre-header stalls at high context](https://github.com/anomalyco/opencode/issue/57849)**
   - *Why it matters*: Reports severe TTFT regressions (up to 178s delays) on warm-cache requests exceeding 240k context tokens. (12 comments)
3. **[#65946: Feature: Open links from messages directly into app's browser pane](https://github.com/anomalyco/opencode/issue/65946)**
   - *Why it matters*: Bridges local development workflows by allowing agents to interact natively with localhost links opened right inside the desktop client. (8 comments)
4. **[#43758: Feature: Session-scoped terminals + optional terminal context](https://github.com/anomalyco/opencode/issue/43758)**
   - *Why it matters*: Addresses workspace-scoped terminal limitations by requesting isolated terminal tabs bound directly to individual chat sessions. (8 comments)
5. **[#59052: Local copy writes clipboard natively and via OSC 52 simultaneously (macOS)](https://github.com/anomalyco/opencode/issue/59052)**
   - *Why it matters*: Causes continuous warning spam and race conditions inside terminals like Alacritty due to duplicated write calls. (6 comments)
6. **[#65424: TUI worktree location line omits branch name after move](https://github.com/anomalyco/opencode/issue/65424)**
   - *Why it matters*: Degrades navigation clarity in multi-branch environments by stripping visual branch indicators inside the workspace manager prompt. (4 comments)
7. **[#60309: Feature: Expose upstream model chosen by auto/fusion routers](https://github.com/anomalyco/opencode/issue/60309)**
   - *Why it matters*: Enhances transparency for virtual routing layers (like FreeLLMAPI) by adding concrete upstream targets to response metadata. (4 comments)
8. **[#65977: Feature: IDE-grade project tree and worktree manager modelled on IntelliJ](https://github.com/anomalyco/opencode/issue/65977)**
   - *Why it matters*: Reflects growing enterprise user demand for comprehensive multi-project management layouts within the desktop shell. (3 comments)
9. **[#64464: Plugin reloading leaves server-side tool list out of sync](https://github.com/anomalyco/opencode/issue/64464)**
   - *Why it matters*: Breaks plugin interoperability briefly during live-reloads when options are updated in `opencode.json`. (3 comments)
10. **[#65887: opencode run hangs when stdin is an open pipe](https://github.com/anomalyco/opencode/issue/65887)**
    - *Why it matters*: Blocks automated CI/CD pipeline scripting where CLI tools expect non-interactive standard inputs. (2 comments)

---

## 4. Key PR Progress
1. **[#64180: refactor(desktop): simplify deep links and open sessions by id](https://github.com/anomalyco/opencode/pull/64180)**
   - Streamlines deep-link routing mechanics in the desktop shell, introducing native `opencode://session/<id>` handlers.
2. **[#63669: feat(core): add agent instructions and use them for Plan mode](https://github.com/anomalyco/opencode/pull/63669)**
   - Closes #62628 by embedding Plan rules directly into system prompts post-compaction rather than injecting repetitive synthetic messages.
3. **[#65948: feat(server): accept machine WebSocket links on workerd](https://github.com/anomalyco/opencode/pull/65948)**
   - Enables incoming worker links on Cloudflare Durable Object (`workerd`) server profiles behind the `machines` experimental flag.
4. **[#65915: fix: keep background service stable under heavy parallel workloads](https://github.com/anomalyco/opencode/pull/65915)**
   - Resolves stability issues causing background services to continuously drop and restart under multi-workspace agent stress.
5. **[#65914: fix(app): eliminate quadratic per-tab work in tab strip](https://github.com/anomalyco/opencode/pull/65914)**
   - Fixes critical performance bottlenecks in `TitlebarTabStrip` when multiple session tabs are active simultaneously.
6. **[#65969: fix(desktop): attach browser to a session running in an unopened tab](https://github.com/anomalyco/opencode/pull/65969)**
   - Fixes a bug preventing background or resumed session tabs from binding their dedicated browser panes until focused manually.
7. **[#63599: feat(core): add opt-in OS-level shell sandbox](https://github.com/anomalyco/opencode/pull/63599)**
   - Implements native OS sandboxing for the shell tool utilizing Bubblewrap on Linux and `sandbox-exec` on macOS.
8. **[#65965: fix(core): detect Copilot Free Auto from auto flag](https://github.com/anomalyco/opencode/pull/65965)**
   - Updates response parsing to handle recent changes in GitHub Copilot's Free tier routing schemas.
9. **[#65941: feat(app): add multi-select and bulk actions to inbox](https://github.com/anomalyco/opencode/pull/65941)**
   - Enhances the experimental Inbox sidebar with UI controls for batch-selecting and managing multiple conversations.
10. **[#65945: fix(core): harden PermissionPolicy algebra and unattended hook checks](https://github.com/anomalyco/opencode/pull/65945)**
    - Addresses edge-case logic bugs found via property-based testing (`@tear/pbt`) across core permission evaluation models.

---

## 5. Feature Request Trends
- **IDE-Like Workspaces**: Users increasingly request complex multi-project layouts, advanced git graphs, persistent diff views, and IntelliJ-style project trees inside the desktop application.
- **Granular Session Controls**: Strong momentum around pinned inbox sessions, multi-select bulk operations, custom session-scoped terminals, and visible working-directory paths.
- **Enhanced Agent Autonomy & Sandboxing**: Growing demand for safer execution environments (OS-level sandboxing) coupled with better agent inspection tools (routing transparency, token metrics per session, and cross-session analytics).

---

## 6. Developer Pain Points
- **Background Service Lifecycle Management**: Frequent race conditions, port collisions (`Managed service port already in use`), and unexpected daemon restarts under high parallel agent loads.
- **Token Latency & TTFT Bottlenecks**: High-context cache stalls (`opencode-go` with DeepSeek models) causing long pre-header wait times.
- **Clipboard & Environment Conflicts**: Native clipboard write collisions on macOS (Alacritty / OSC 52) and shell hanging issues when processing piped standard input streams.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest: 2026-11-24

### 1. Today's Highlights
The developer community has been highly active in stabilizing the platform following the 1.6.0 release, with a massive push to resolve process-crashing bugs on Windows and Linux. Maintainers have prioritized hardening the agent against transient I/O errors and improving the reliability of the model catalog by auto-pruning deprecated endpoints.

### 2. Releases
*No new releases in the last 24 hours.*

### 3. Hot Issues
1. **[#10956] Cache Warming "Idle" Silence:** Users report the `cacheWarming: "idle"` feature fails to trigger, causing sessions to remain inactive. [URL](https://earendil-works/pi/issues/10956)
2. **[#12035] Virtual Model Compaction:** Threshold compaction is triggering prematurely for virtual models because the context window cannot be resolved. [URL](https://earendil-works/pi/issues/12035)
3. **[#12242] Compaction Summary Bloat:** Long-running sessions are seeing the summary grow exponentially, reaching 164k characters and causing severe latency. [URL](https://earendil-works/pi/issues/12242)
4. **[#12224] MCP SSE Stream Rescanning:** Inefficient string concatenation in stream handling is causing performance degradation during large event processing. [URL](https://earendil-works/pi/issues/12224)
5. **[#12317] Windows EIO/EPIPE Crashes:** A critical bug where transient terminal pipe errors kill the entire agent process. [URL](https://earendil-works/pi/issues/12317)
6. **[#12444] OpenAI Codex Response Clamping:** WebSocket continuation is failing for high-context models, leading to prompt cache loss. [URL](https://earendil-works/pi/issues/12444)
7. **[#12407] Gemini-4-Neon Stream Stalls:** The new Gemini-4-Neon model is frequently hanging mid-stream due to improper error normalization. [URL](https://earendil-works/pi/issues/12407)
8. **[#12383] Kimi Tool Selection:** Resumed Kimi sessions are failing to detect/load tools available in the outbound provider payload. [URL](https://earendil-works/pi/issues/12383)
9. **[#12463] Interrupted Tool Results:** Resuming a session leads to the loss of tool results from the transcript during cancellation. [URL](https://earendil-works/pi/issues/12463)
10. **[#10585] Bash Temp-file Crashes:** Previous issues with `ENOSPC` and `EACCES` on full `/tmp` drives causing total process exits. [URL](https://earendil-works/pi/issues/10585)

### 4. Key PR Progress
1. **[#12452] Fix Bash Temp-file Crashes:** Prevents `WriteStream` errors from killing the agent process. [URL](https://earendil-works/pi/pull/12452)
2. **[#12451] Linear-time Stream Processing:** Optimized MCP/Agent stream readers to stop exponential rescanning. [URL](https://earendil-works/pi/pull/12451)
3. **[#12455] Retry Error Finish Reasons:** Properly classifies `finish_reason: "error"` for Copilot/OpenRouter to allow retries. [URL](https://earendil-works/pi/pull/12455)
4. **[#12437] Pin Codex Reasoning Effort:** Ensures initial `high`/`xhigh` selections are respected rather than defaulting to `medium`. [URL](https://earendil-works/pi/pull/12437)
5. **[#12441] Gemini XHigh Support:** Adds mapping for high-reasoning Gemini models. [URL](https://earendil-works/pi/pull/12441)
6. **[#12459] Credential Resolution Fixes:** Corrects `/login` display logic for stored commands that exit with errors. [URL](https://earendil-works/pi/pull/12459)
7. **[#12446] Wayland Clipboard Fix:** Pins MIME type to `text/plain` to prevent `wl-copy` failures. [URL](https://earendil-works/pi/pull/12446)
8. **[#12449] Mistral Catalog Sync:** Prunes retired Mistral models to prevent CI failures. [URL](https://earendil-works/pi/pull/12449)
9. **[#12454] Credential Validation:** Improves detection of invalid/unresolved auth keys. [URL](https://earendil-works/pi/pull/12454)
10. **[#11370] New Provider Additions:** Adds support for DeepInfra, Nebius, and others. [URL](https://earendil-works/pi/pull/11370)

### 5. Feature Request Trends
*   **Context Visibility:** Developers strongly desire more transparency into token usage (system prompt vs. history vs. tool use) via a proposed `/context` inspector (#12377).
*   **Content Normalization:** Moving away from "opaque wire blocks" to first-class content handling for web search results (#12419).
*   **Git Modularity:** Continued interest in sub-path support for `pi install` to target specific directories in monorepos (#4530, #4851).

### 6. Developer Pain Points
*   **Fragile CLI/Installer:** High friction with installers misidentifying existing environments, particularly in WSL-to-Windows cross-mount scenarios (#12172, #12457).
*   **Terminal Stability:** Deep frustration over the agent process exiting upon encountering transient terminal errors like `EPIPE` or `EIO` (#12317).
*   **Deprecated Model "Noise":** Developers are frustrated by the catalog listing models that are already shut down by providers, necessitating manual pruning PRs (#12450, #12453).

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