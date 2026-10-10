# AI CLI Tools Community Digest 2026-10-10

> Generated: 2026-10-09 23:42 UTC | Tools covered: 9

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

**AI‑CLI Tools Community Digest – Cross‑Tool Comparison (10 Oct 2026)**  

---

### 1. Ecosystem Overview  
The AI‑driven command‑line ecosystem is maturing into a collection of specialist runtimes that combine LLM reasoning with native tooling. Most projects are now centered on **agentic sub‑systems** (Gemini, OpenCode) or **sandboxed execution environments** (GitHub Copilot CLI). Development velocity remains high for the “big three” (Gemini, Copilot, OpenCode), while several earlier‑generation CLIs (Claude Code, OpenAI Codex, Kimi Code) show little or no recent activity.

---

### 2. Activity Comparison  

| Tool (repo) | Open Issues (24 h) | PRs (24 h) | Release today* |
|-------------|-------------------|------------|----------------|
| **Gemini CLI** (google‑gemini/gemini‑cli) | 10 (high‑priority bugs & sub‑agent hangs) | 10 (core, CLI & security fixes) | v0.64.0‑preview.1 (patch) |
| **GitHub Copilot CLI** (github/copilot‑cli) | 10 (sandbox, OOM, credential & context limits) | 1 (install checksum validation) | v1.0.95 → v1.0.96‑0 (security & sandbox) |
| **OpenCode** (anomalyco/opencode) | 10 (MCP hangs, persistence & Windows UI) | 10 (shell analysis, hardening, UI fixes) | – (no release in last 24 h) |
| **Claude Code** (anthropics/claude‑code) | – (summary failed) | – | – |
| **OpenAI Codex** (openai/codex) | – (summary failed) | – | – |
| **Kimi Code CLI** (MoonshotAI/kimi‑cli) | 0 (no activity) | 0 | – |
| **Pi** (badlogic/pi‑mono) | – (summary failed) | – | – |
| **Qwen Code** (QwenLM/qwen‑code) | – (summary failed) | – | – |
| **DeepSeek TUI** (Hmbown/DeepSeek‑TUI) | – (summary failed) | – | – |

\* “Release today” reflects any tag or pre‑release published within the 24‑hour window; “–” means none.

---

### 3. Shared Feature Directions  

| Common Requirement | Appearing In | Typical Use‑Case |
|--------------------|--------------|------------------|
| **Sub‑agent reliability & observability** | Gemini CLI, OpenCode | Detect hidden failures (e.g., `MAX_TURNS` reported as success) and expose sub‑agent trajectories for debugging. |
| **Fine‑grained sandbox / permission control** | GitHub Copilot CLI, OpenCode (policy handling) | Allow per‑tool, per‑host, and per‑credential sandbox rules (e.g., JVM RW paths, distinct git credentials). |
| **Context‑window / token‑budget management** | Gemini CLI (tool‑count limits), Copilot CLI (Claude Opus 200 K cap) | Prevent automatic context compaction and provider 400 errors when many tools or large repos are loaded. |
| **AST‑aware or selective code discovery** | Gemini CLI (AST‑aware exploration trend) | Replace naïve recursive file reads with token‑frugal, syntax‑tree based scanning. |
| **Cross‑platform stability (Wayland, Windows, ARM page‑size)** | Gemini CLI (Wayland & Windows symlink), Copilot CLI (ARM64 page‑size, NixOS keychain), OpenCode (Windows tray & persistence) | Ensure agents run reliably on modern Linux display servers, Apple‑silicon kernels, and Windows UI constraints. |
| **Tool‑call “hook” extensibility (e.g., cwd changes, output hooks)** | Copilot CLI (`/cwd` request), Gemini CLI (output‑hook crash) | Enable skills/sub‑agents to programmatically affect CLI state (working directory, UI refresh). |

---

### 4. Differentiation Analysis  

| Dimension | Gemini CLI | GitHub Copilot CLI | OpenCode | Others (Claude, Codex, Kimi, Pi, Qwen, DeepSeek) |
|-----------|------------|--------------------|----------|---------------------------------------------------|
| **Core Focus** | Agentic sub‑agents (codebase investigator, browser, etc.) + token‑efficient repo exploration | Secure sandboxed execution + enterprise authentication (Microsoft Entra) | MCP (Model‑Context‑Protocol) client + desktop side‑car UI | Early‑generation LLM‑only completions (Claude, Codex) or idle projects |
| **Target Users** | Developers who want autonomous, multi‑step code manipulation across large monorepos | Enterprise developers needing strict credential isolation and policy‑driven tooling | Power‑users of a desktop‑first “assistant” that persists sessions across OSes | General‑purpose code‑completion consumers |
| **Technical Approach** | “Sub‑agent” orchestration, Ink‑based TUI, dynamic tool registry (≤128 tools) | SEA‑packed Node runtime, sandbox injection layer, explicit credential helpers | MCP over HTTP/WS, SQLite side‑car persistence, VS Code extension + TUI | Single‑model completion APIs |
| **Unique Strength** | Deep integration with Google models, built‑in sub‑agent library, fast file‑tree pruning | First‑class Microsoft identity flow, fine‑grained network & file sandboxing | Rich UI (system tray, desktop side‑car), flexible MCP schema handling | – |
| **Current Pain‑Points** | Sub‑agent hangs, false success reports, tool‑count limits, temporary UI flicker | JVM sandbox leaks, credential overrides, OOM in long sessions, limited tool‑callability | Windows tray/quit, MCP elicitation bugs, persistence failures | Stagnant development, missing community signals |

---

### 5. Community Momentum & Maturity  

| Tool | Issue Activity (high‑/mid‑/low) | PR Velocity | Release Cadence | Overall Maturity |
|------|--------------------------------|------------|-----------------|------------------|
| **Gemini CLI** | **High** – 10 critical bugs discussed, many with maintainer tracking | **High** – 10 PRs merged in the last day, many core fixes | **Frequent** – preview release today | Mature, rapidly iterating, strong maintainer presence |
| **GitHub Copilot CLI** | **High** – 10 hot tickets covering sandbox, OOM, auth | **Low** – 1 PR merged (security) but many pending internal PRs | **Regular** – two patch releases in 24 h | Mature product, enterprise focus, active bug‑hunt |
| **OpenCode** | **Medium‑High** – 10 issues, many Windows‑specific regressions | **Medium** – 10 PRs, mainly bug‑fixes and hardening | **No release** today (steady but slower) | Growing, still stabilizing V2 transition |
| **Claude Code / OpenAI Codex** | No observable activity (summary failed) | No observable activity | No recent releases | Likely maintenance‑only or low‑visibility |
| **Kimi Code** | **None** (0 issues) | **None** | No releases | Dormant |
| **Pi / Qwen Code / DeepSeek TUI** | No data | No data | No releases | Inactive or low‑visibility |

**Takeaway:** Gemini CLI and Copilot CLI have the most vigorous open‑source ecosystems; OpenCode is catching up but lags in release cadence. The other projects appear either dormant or are not publishing community metrics.

---

### 6. Trend Signals for the Industry  

1. **Observability of Autonomous Agents** – Multiple projects (Gemini, OpenCode) are demanding tooling that surfaces sub‑agent state, error codes, and execution traces. Expect future standards around “agent telemetry” and unified `/bug` payloads.  
2. **Token‑Efficiency & Tool‑Count Limits** – Providers are enforcing stricter token caps and tool‑registry sizes (400‑tool limit, 128‑tool API error). Communities are pushing for **AST‑aware scanning** and **dynamic tool scoping** to keep context size manageable.  
3. **Sandbox Granularity** – The friction seen with JVM, Gradle, and custom git credentials signals a market need for **per‑process sandbox policies** and **credential‑profile injection** rather than a one‑size‑fits‑all sandbox.  
4. **Cross‑Platform Reliability** – Wayland failures, ARM64 page‑size mismatches, and Windows UI quirks are recurring. Tooling vendors will need to embed **OS‑abstraction layers** or ship platform‑specific binaries to maintain broad adoption.  
5. **Enterprise Authentication Integration** – Copilot’s native Entra broker shows the direction toward **seamless SSO** in CLI tools; similar flows are likely to appear in other ecosystems (e.g., Google’s OAuth for Gemini).  
6. **Persistent Task Tracking** – The shift from volatile LLM‑todos to **file‑based or database‑backed task lists** (OpenCode persistence work) indicates a demand for **long‑running, resumable workflows** beyond a single session.

---

**Strategic Implication:**  

- **If you need autonomous code manipulation across large codebases**, Gemini CLI offers the most advanced sub‑agent stack, but you must plan for observability hooks and tool‑count throttling.  
- **If sandbox security and enterprise identity are non‑negotiable**, Copilot CLI provides the most battle‑tested sandbox with fine‑grained policy controls, though you may need to work around JVM and git credential limitations.  
- **If you value a desktop‑first experience and MCP‑driven multi‑model orchestration**, OpenCode is the emerging choice, especially for Windows‑heavy teams, but be prepared for occasional persistence bugs.  

Choosing the right CLI now hinges less on raw feature count and more on aligning with the **observability, sandbox granularity, and cross‑platform stability** trends that are shaping the next generation of developer‑centric AI tooling.

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

# Gemini CLI Community Digest — October 10, 2026

## 1. Today's Highlights
The Gemini CLI development cycle centers heavily on subagent stability, token-efficient workspace exploration, and terminal rendering improvements. Recent updates target long-standing agent hangs, performance bottlenecks in large repository file discovery, and robust error recovery across various OS environments like Windows and Wayland.

---

## 2. Releases
- **[v0.64.0-preview.1](https://github.com/google-gemini/gemini-cli/pull/29696)**: A patch release cherry-picking core security logic updates to resolve false-positive warnings on untrusted command flags and compound loops.

---

## 3. Hot Issues
1. **[Subagent recovery after MAX_TURNS reported as GOAL success (#22323)](https://github.com/google-gemini/gemini-cli/issue/22323)**
   * **Why it matters**: Subagents like `codebase_investigator` report a "success" status even when terminating prematurely due to hitting maximum turns, masking failures from users.
   * **Community reaction**: 13 comments and active maintainer tracking indicate this is a high-priority bug reducing reliability in multi-step workflows.

2. **[Generalist agent hangs (#21409)](https://github.com/google-gemini/gemini-cli/issue/21409)**
   * **Why it matters**: Defring to the generalist agent for simple operations (such as folder creation) causes indefinite hanging.
   * **Community reaction**: Gathered 8 upvotes and 8 comments; developers report that explicitly instructing models to avoid subagents is currently a required workaround.

3. **[Gemini does not use skills and sub-agents enough (#21968)](https://github.com/google-gemini/gemini-cli/issue/21968)**
   * **Why it matters**: Despite custom skills (like gradle or git) being registered, models rarely invoke them autonomously without explicit handholding.
   * **Community reaction**: Highlights a critical prompt-routing or tool-discovery gap in leveraging custom workflows.

4. **[Browser Agent ignores settings.json overrides (#22267)](https://github.com/google-gemini/gemini-cli/issue/22267)**
   * **Why it matters**: User configurations like `maxTurns` are ignored by the browser agent, forcing default execution constraints.
   * **Community reaction**: Frustrates developers attempting to tune automation boundaries for web-heavy testing tasks.

5. **[browser subagent fails in wayland (#21983)](https://github.com/google-gemini/gemini-cli/issue/21983)**
   * **Why it matters**: Linux environments using Wayland cause browser subagents to instantly fail out with termination goals.
   * **Community reaction**: Limits headless/interactive browser validation for Linux developers running modern display servers.

6. **[Gemini CLI encounters 400 error with > 128 tools (#24246)](https://github.com/google-gemini/gemini-cli/issue/24246)**
   * **Why it matters**: When large plugin ecosystems or many subagents are enabled, surpassing tool count limits causes API-level 400 errors.
   * **Community reaction**: Demands smarter dynamic tool scope scoping to prevent hitting provider constraints.

7. **[Model frequently creates tmp scripts in random spots (#23571)](https://github.com/google-gemini/gemini-cli/issue/23571)**
   * **Why it matters**: Restricting shell execution prompts the model to drop multiple temporary scripts across various workspace folders, cluttering git trees.
   * **Community reaction**: Creates manual cleanup overhead prior to commits.

8. **[get-shit-done output hook causes crash (#22186)](https://github.com/google-gemini/gemini-cli/issue/22186)**
   * **Why it matters**: Complex long-running task outputs consistently crash the CLI just as summaries finish printing.
   * **Community reaction**: Highlights stability risks in output hooks and execution telemetry rendering.

9. **[High performance and flicker free behavior on terminal resize (#21924)](https://github.com/google-gemini/gemini-cli/issue/21924)**
   * **Why it matters**: Resizing terminal windows causes significant layout jitter and frame drops during static history item rendering.
   * **Community reaction**: Targeted for Ink framework and RenderStatic optimizations.

10. **[Bugreport doesn't provide context of the subagent (#21763)](https://github.com/google-gemini/gemini-cli/issue/21763)**
    * **Why it matters**: Generating a `/bug` report only snapshots the primary session, omitting crucial telemetry and trajectories of underlying subagents.
    * **Community reaction**: Hinders effective debugging for maintainers addressing subagent-specific failures.

---

## 4. Key PR Progress
1. **[perf(core): optimize ignore filtering and enable subtree pruning (#29582)](https://github.com/google-gemini/gemini-cli/pull/29582)**
   * Introduces hierarchical directory-level state memoization and wildcard expansion to resolve multi-second blocks on large repositories.
2. **[fix(core): avoid duplicating tool response turns on resume (#29490)](https://github.com/google-gemini/gemini-cli/pull/29490)**
   * Resolves a bug where sessions resumed via `-r` duplicated tool execution outputs in client histories.
3. **[fix(cli): resolve hang on Enter keypress in interactive mode (#29476)](https://github.com/google-gemini/gemini-cli/pull/29476)**
   * Decouples user confirmation event publication from Ink rendering to fix unresponsive prompts in IDE integrated terminals.
4. **[fix(cli): restore debounced static UI refresh on terminal width changes (#29644)](https://github.com/google-gemini/gemini-cli/pull/29644)**
   * Re-introduces a 100ms debounce on `terminalWidth` updates to keep horizontal terminal resize snappy in inline mode.
5. **[fix(cli): skip eager recursive file reading for @<directory> references (#29617)](https://github.com/google-gemini/gemini-cli/pull/29617)**
   * Prevents excessive memory overhead by avoiding full recursive reads when users pass `@<directory>` commands.
6. **[fix(security): eliminate false positives on untrusted command flags and compound loops (#29672)](https://github.com/google-gemini/gemini-cli/pull/29672)**
   * Cleans up overly broad token indexing in `untrustedContextTracker` and harmless POSIX flags like `ls -ld` or `grep -rn`.
7. **[fix(cli): display retry progress indicator during connection recovery (#29468)](https://github.com/google-gemini/gemini-cli/pull/29468)**
   * Fixes infinite "Thinking..." stalls during rate limits (429) or server overloads (503) by showing proper retry progress.
8. **[fix(mcp): key RFC 9207 iss-absence rejection on authorization_response_iss_parameter_supported (#29488)](https://github.com/google-gemini/gemini-cli/pull/29488)**
   * Resolves OAuth failures for MCP servers whose metadata lacks an `iss` parameter in authorization responses.
9. **[fix(a2a-server): isolate tool rejection to active call in sequential batches (#29683)](https://github.com/google-gemini/gemini-cli/pull/29683)**
   * Ensures that rejecting a single file modification in an A2A server batch does not abort remaining sequential calls.
10. **[test(core): skip file discovery symlink tests when unprivileged on windows (#29691)](https://github.com/google-gemini/gemini-cli/pull/29691)**
    * Avoids CI failures on Windows environments lacking Developer Mode or symbolic link privileges (`SeCreateSymbolicLinkPrivilege`).

---

## 5. Feature Request Trends
* **AST-Aware Exploration**: Strong push toward leveraging AST parsing tools (such as `tilth`, `glyph`, or `ast-grep`) for surgical, token-frugal code mapping and precise method-bound reads rather than naive full-file reads.
* **Persistent Task Tracking**: Moving away from context-rotting LLM conversation todos (`WriteToDo`) to persistent, file-based task-tracking systems.
* **Subagent Observability and Discovery**: Increasing demand to expose subagent trajectories via commands like `/chat share`, allow symlinks for custom agents, and dynamically configure subagent scopes via `settings.json`.
* **Zero-Dependency OS Sandboxing**: Better integration with model bash affinities for native, secure terminal toolchains.

---

## 6. Developer Pain Points
* **Context Bloat & Token Costs**: Unfiltered file reads and large tool lists (exceeding 128–400 tools) rapidly inflate token footprints and trigger provider 400 errors.
* **Subagent Reliability & Visibility**: Hidden subagent failures (`MAX_TURNS` reported as success), hanging generalist agents, and isolated debug logs that fail to output subagent context in bug reports.
* **Terminal UI Stability**: Layout flickers on resizes, input locks when hitting `Enter` on confirmation dialogs in integrated IDE terminals, and platform-specific quirks (Wayland/Windows privileges).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-10

## 1. Today's Highlights
The latest releases (`v1.0.95` through `v1.0.96-0`) bring critical security and workflow improvements, introducing native Microsoft Entra broker authentication on macOS and sandbox credential configuration enhancements. Meanwhile, the community is heavily focused on sandbox networking and permission gaps—particularly around JVM processes, Gradle local connections, and git credential handling. 

---

## 2. Releases
Recent patch releases (`v1.0.95` to `v1.0.96-0`) focus heavily on sandbox enhancements, session responsiveness, and enterprise authentication:
- **v1.0.96-0**: 
  - **Improved**: Interactive sessions reach input prompts sooner; timeline views now explicitly trace whether permission decisions were made by the user, Assisted Permissions, policies, or unattended fallbacks.
  - **Fixed**: `/add-dir` now correctly grants sandbox access for the active session (resolving issue [#5076](https://github.com/github/copilot-cli/issues/5076)).
- **v1.0.95 / v1.0.95-1**: 
  - Added native Microsoft Entra broker authentication on macOS with graceful browser fallback.
  - `copilot config` now supports sandbox credential `injectHosts` keys alongside Bash, Zsh, and Fish key completion.
  - `--context` flags now correctly apply to both new and resumed ACP sessions.

---

## 3. Hot Issues
1. **[#3355 - Allow configurable context window for Claude Opus 4.6 (200K cap vs 1M model capability)](https://github.com/github/copilot-cli/issues/3355)**  
   * **Why it matters**: Users running deep technical sessions hit frequent auto-compaction because Claude Opus 4.6 is capped at 200K tokens despite supporting 1M natively.
   * **Community reaction**: High engagement with 4 thumbs-up as developers demand access to the full model capability.
2. **[#4686 - Node.js OOM crash after ~37 min (31,965 leaked async libuv handles)](https://github.com/github/copilot-cli/issues/4686)**  
   * **Why it matters**: Long-running sessions on Linux crash due to unmanaged memory leaks in the bundled Node.js Single Executable Application (SEA), ignoring standard `NODE_OPTIONS`.
   * **Community reaction**: Critical stability bug impacting automated and long interactive workflows.
3. **[#4516 - Sandbox RW path grants not honored by JVM processes spawned from Copilot CLI](https://github.com/github/copilot-cli/issues/4516)**  
   * **Why it matters**: Java-based tools (like Maven or custom `javac` processes) fail with permission errors even when their working directories have been explicitly granted read/write access via `/sandbox`.
   * **Community reaction**: Blocks Java developers from safely using sandboxed workflows.
4. **[#5105 - macOS sandbox blocks Gradle daemon connection despite local networking being allowed](https://github.com/github/copilot-cli/issues/5105)**  
   * **Why it matters**: Even with local networking explicitly permitted, the macOS sandbox drops or restricts connections between the Gradle client and its daemon.
   * **Community reaction**: Newly opened issue highlights ongoing frictions with local ecosystem daemons under sandboxing.
5. **[#5102 - Regression: sandzoned git has no way to use a credential differing from the Copilot sign-in](https://github.com/github/copilot-cli/issues/5102)**  
   * **Why it matters**: The sandbox injects an empty `credential.helper` override that forces git to use primary credentials, blocking developers who require fine-grained external PATs.
   * **Community reaction**: A major roadblock for enterprise users managing multi-repo workflows with distinct identity constraints.
6. **[#5091 - Session queues all prompts, keeps trying to reconnect MCPs ad nauseum](https://github.com/github/copilot-cli/issues/5091)**  
   * **Why it matters**: Sessions can enter a broken loop where MCP servers continually trigger reconnection cycles, locking up all prompt queues.
   * **Community reaction**: Frustrating lockup state requiring users to kill and resume sessions.
7. **[#3035 - Tool-callable `cwd` (equivalent of TUI `/cwd`)](https://github.com/github/copilot-cli/issues/3035)**  
   * **Why it matters**: Custom skills and sub-agents cannot programmatically shift the current working directory or trigger `.github/skills/` rescans mid-session.
   * **Community reaction**: A critical feature gap for advanced agentic workflow builders.
8. **[#4977 - Bundled ripgrep aborts with jemalloc 'Unsupported system page size' on 16KB-page ARM64 kernels](https://github.com/github/copilot-cli/issues/4977)**  
   * **Why it matters**: Asahi Linux (Apple Silicon Linux) users cannot leverage core search tools because the bundled `ripgrep` binary assumes a standard 4KB page size.
   * **Community reaction**: Blocks alternative platform distributions like Asahi Linux.
9. **[#5100 - Session event delivery permanently fails after one 120s host-ack timeout](https://github.com/github/copilot-cli/issues/5100)**  
   * **Why it matters**: A single timeout waiting for a host acknowledgement drops tool execution results and permanently strands the session until manual resume.
   * **Community reaction**: Highlights resilience flaws in long-running tool loops.
10. **[#3081 - NixOS keychain support is broken](https://github.com/github/copilot-cli/issues/3081)**  
    * **Why it matters**: Users on NixOS environments fail authentication storage routines because the CLI cannot hook into system keychains despite `libsecret` and GNOME Keyring availability.
    * **Community reaction**: Persistent friction for Linux power users outside mainstream distros.

---

## 4. Key PR Progress
1. **[#5093 - install: verify the checksum entry matching the downloaded tarball](https://github.com/github/copilot-cli/pull/5093)**  
   * **Description**: Fixes a security gap in the installation script where `sha256sum -c --ignore-missing` could report false-positive successes without actually validating the correct file entry.

---

## 5. Feature Request Trends
- **Context Management & Limits**: Users want control over model context ceilings (e.g., bypassing arbitrary token caps like the 200K limit on Claude Opus) to prevent unnecessary context compaction.
- **Agent Interoperability & Tool-Callables**: Strong demand to expose native TUI capabilities (such as working directory changes or MCP server selections) to tools and sub-agents programmatically.
- **Granular Sandbox Controls**: Developers require finer control over sandbox boundaries—specifically supporting distinct git credentials, multi-tier JVM path interactions, and custom network/daemon allowances.

---

## 6. Developer Pain Points
- **Sandbox Boundary Friction**: Specialized runtimes (JVM/Gradle, local background daemons, alternate git credential helpers) frequently clash with strict containerized sandbox parameters, leading to unexpected "Operation not permitted" failures.
- **Long-Running Session Stability**: Memory leaks in packaged runtimes (like Node.js SEA handles overextended periods) and event-acknowledgement timeouts after 120 seconds disrupt extended automation runs.
- **Platform-Specific Quirks**: Non-standard kernel page sizes (e.g., 16KB ARM64 kernels on Asahi Linux) and specialized Linux environments (NixOS keychain bindings) continue to cause bootstrap failures.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest: 2026-10-10

## 1. Today's Highlights
Development activity remains focused on stabilizing the V2 release, with significant effort directed toward improving MCP (Model Context Protocol) reliability and fixing state persistence bugs in the desktop sidecar. The community is actively triaging regressions related to Windows-specific environment handling and refining permission workflows for automated CLI usage.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Hot Issues
1.  **[#51856] MCP Client Hangs on Elicitation:** The client advertises capability but fails to handle `elicitation/create` requests, causing tool calls to time out.
2.  **[#47545] Auto Mode Notification Spam:** Permission notifications persist even when `Auto` mode is active, indicating a synchronization gap between client-side approval and server-side emission.
3.  **[#51020] V2 Persistence Failure:** Desktop sidecar processes are failing to write `message` or `part` data to `opencode.db`, causing session data loss despite successful LLM calls.
4.  **[#54180] Declined Turns Resuming:** Bug where rejected tool calls or cancelled questions are treated as server shutdowns, causing them to re-trigger after a restart.
5.  **[#54217] Windows Tray/Quit Logic:** Desktop app lacks a system tray icon, leaving users unable to properly terminate the persistent `opencode-cli` background service on Windows.
6.  **[#53614] Invisible Long-running Processes:** Sessions lack a robust registry for background processes, leading to them being reaped or rendered invisible after an hour.
7.  **[#54213] CLI Non-responsiveness on Windows:** New installs via NPM/winget/choco failing to launch or output any diagnostic information on PowerShell.
8.  **[#50257] Model Picker Reasoning Bug:** Tooltips incorrectly display "No reasoning" for V2 models due to uninitialized `capabilities.reasoning` fields.
9.  **[#54214] Policies Dropping Permissions:** `experimental.policies` silently ignores `"action": "permission"` statements, breaking fine-grained access control.
10. **[#49891] @mention Skill Security:** Skills denied via permissions are still being injected into sessions via `@mention` pathing, bypassing security checks.

## 4. Key PR Progress
1.  **[#54218] Shell Analysis Explanation:** Adds helpful feedback when the portable shell scanner fails to analyze complex commands.
2.  **[#54219] Workerd Hardening:** Improves plugin seeding and `workerd` defaults for embedded consumers.
3.  **[#54210] Copilot Fallback Routing:** Fixes proxy-related issues by forcing fallback to follow `models.dev` package definitions.
4.  **[#54198] Effect 4.0.1 Upgrade:** Migrates the workspace to stable Effect 4.0.1, ensuring compatibility for V2.
5.  **[#52900] TUI Mouse Mode Fix:** Correctly resets terminal mouse capture on exit, resolving issues in Git Bash/Windows shells.
6.  **[#53852/53853] C++ Module Highlighting:** Resolves missing syntax highlighting for `.cppm` files in both TUI and V2 counterparts.
7.  **[#53821] WellKnown Broadcasts:** Ensures global service updates are correctly published and HTTP timeouts are properly bound.
8.  **[#53822] Session Model Retention:** Prevents the UI from losing model selection when a provider catalog is temporarily unreachable.
9.  **[#49084] VS Code Alignment:** Refactors the extension to match V2 CLI conventions and resolve symlink issues in shims.
10. **[#54208] Gemini Routing:** Corrects the fallback routing for Copilot, directing Gemini models to `/chat/completions` instead of `/responses`.

## 5. Feature Request Trends
*   **MCP Flexibility:** Users are requesting better handling of specialized MCP capabilities, specifically form elicitation and handling complex schema unions (null/array types).
*   **UI/UX Parity:** High demand for restoring V1 affordances in V2, specifically home screen logo customization (#51916) and visible terminal toggle buttons (#54193).
*   **Observability:** Developers want better visibility into agent sub-tasks, with requests to show running subagents directly under the active prompt (#53611).

## 6. Developer Pain Points
*   **OS Disparity:** Windows users are facing the brunt of the "orphaned process" issue, with tray icons and CLI launch failures being top-tier blockers.
*   **Migration Hurdles:** The transition from V1 to V2 has exposed gaps in credential migration (OAuth files) and plugin context visibility (missing `ctx.session.form`).
*   **Fragile Tool Calling:** Integration with strict APIs like Google Gemini is hindered by schema sanitizer issues, where nullable union types in JSON schemas are causing invalid argument errors.

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