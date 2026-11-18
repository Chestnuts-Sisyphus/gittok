# AI CLI Tools Community Digest 2026-11-18

> Generated: 2026-11-18 01:57 UTC | Tools covered: 9

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

# AI CLI Tools Ecosystem Reporter: Cross-Tool Comparison (2026-11-18)

**Date:** November 18, 2026
**Analyst:** Senior Technical Analyst, AI Developer Tools Ecosystem

## 1. Ecosystem Overview
The AI CLI ecosystem has entered a phase of **intense platform-specific hardening and multi-agent orchestration refinement**. While OpenAI Codex and Gemini CLI are pushing rapid, high-frequency release cycles to tackle systemic issues like Windows environment fragility and subagent visibility, GitHub Copilot CLI is pivoting toward enterprise governance and SDK standardization. The dominant theme across all active repositories is the struggle to reconcile high-level autonomous agent capabilities with low-level OS constraints (sandboxing, file paths, security software). Notably, a significant portion of the ecosystem (including Claude Code, OpenCode, and others) is facing data visibility gaps in this digest, suggesting either a shift in development intensity or reporting infrastructure issues, but the visible activity in the "Big Three" (Codex, Gemini, Copilot) indicates a maturing market focused on reliability over raw feature expansion.

## 2. Activity Comparison

*Note: Counts based on the top 10 highlighted items per tool in the provided digest. "No Data" indicates a failed summary generation.*

| Tool | Hot Issues (Top 10) | Key PRs (Top 10) | Release Cadence | Status |
| :--- | :---: | :---: | :--- | :--- |
| **OpenAI Codex** | 10 | 10 | High (Alpha v0.170/0.171, Patch v0.169.1) | **Active / Iterating** |
| **Gemini CLI** | 10 | 10 | N/A (Focus on Core/CLI fixes) | **Active / Hardening** |
| **GitHub Copilot** | 10 | 0 | Medium (v1.0.113/1) | **Stable / Governance** |
| **Kimi Code CLI** | 0 | 0 | None | **Dormant** |
| **Claude Code** | ? | ? | ? | **Data Unavailable** |
| **OpenCode** | ? | ? | ? | **Data Unavailable** |
| **Pi** | ? | ? | ? | **Data Unavailable** |
| **Qwen Code** | ? | ? | ? | **Data Unavailable** |
| **DeepSeek TUI** | ? | ? | ? | **Data Unavailable** |

## 3. Shared Feature Directions

Several critical technical challenges are resonating across multiple tool communities, indicating systemic industry pain points:

*   **Windows Environment Fragility:**
    *   **Codex & Copilot:** Both report severe issues with Windows-specific execution. Codex struggles with `Computer Use` screenshot capture timeouts (`FrameArrayed`/`E_INVALIDARG`) and path serialization (`AbsolutePathBuf`). Copilot faces conflicts with security software (Cortex XDR flagging `git` exec as spoofing) and drive-letter-less mount points.
    *   *Implication:* Windows is the least stable platform for AI CLI agents, requiring heavy native OS integration testing.
*   **Subagent & Multi-Agent Orchestration:**
    *   **Codex:** Working on visualizing subagent status in the TUI sidebar (PR #62149) and discussing multi-computer project management.
    *   **Gemini CLI:** Addressing "silent failures" where subagents report success after hitting turn limits (Issue #22323) and generalist agent hangs (Issue #21409).
    *   *Implication:* The industry is moving from single-agent chat to complex multi-agent workflows, but observability and error handling in these sub-routines are lagging behind.
*   **Context & Token Efficiency:**
    *   **Gemini CLI:** Proposing AST-aware file reads to reduce token noise (Issue #22745) and hitting tool count limits >128 (Issue #24246).
    *   **Codex:** Focusing on prompt caching optimizations for static instructions (Issue #62109).
    *   *Implication:* Raw file dumps are unsustainable; the ecosystem is shifting toward semantic, AST-based context retrieval to manage growing repository sizes.
*   **Enterprise Security & Governance:**
    *   **Copilot:** Introducing admin controls to disable `Browser Use` (#5492) and dealing with SDK renames for enterprise adoption.
    *   **Gemini CLI:** Hardening IDE companion discovery with atomic file writes and user-isolated temp directories (PR #30340).
    *   *Implication:* As AI CLIs enter enterprise pipelines, strict sandboxing, permission isolation, and admin override capabilities are becoming non-negotiable features.

## 4. Differentiation Analysis

| Aspect | OpenAI Codex | Gemini CLI | GitHub Copilot CLI |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | **Rapid Iteration & UX Parity:** Heavy focus on desktop app stability, audio transcription, and TUI enhancements. | **Core Robustness & Safety:** Heavy focus on subprocess optimization, security hardening, and fixing "silent" core bugs. | **Enterprise Integration:** Focus on administrative controls, SDK stability, and interoperability with existing security/IT infrastructure. |
| **Technical Approach** | **Feature-Forward:** Adding audio, streaming search, and subagent UIs. Aggressive alpha release cycle. | **Defensive/Corrective:** Fixing UI freezes, PowerShell parsing, and configuration overrides. Prioritizing stability. | **Governance-Forward:** Implementing feature flags for Browser Use, fixing SDK naming, and addressing security software conflicts. |
| **Target User** | **Power Users/Developers:** Users expecting ChatGPT parity in terminal features (e.g., Read Aloud) and rapid feedback loops. | **Systems/Reliability Engineers:** Users who need deterministic behavior, correct error reporting, and safe sandboxing. | **Enterprise IT/Devs:** Users managing large organizations, needing policy enforcement, and integrating with existing CI/CD and security stacks. |
| **Key Differentiator** | Most active release cadence; leading in multi-agent TUI visualization. | Leading in context optimization (AST) and core safety mechanisms. | Leading in administrative control and enterprise-ready security posturing. |

## 5. Community Momentum & Maturity

*   **High Momentum (Rapid Iteration):** **OpenAI Codex** exhibits the highest momentum with multiple alpha releases (v0.170/0.171) and a high volume of PRs addressing both UI and backend logic. The community is highly engaged with feature parity requests (e.g., macOS hotkeys, Read Aloud), suggesting a user base that expects "consumer-grade" polish in CLI tools.
*   **Stabilizing & Maturing:** **Gemini CLI** shows signs of maturity as it shifts from feature addition to robustness fixes (UI freezes, silent config drops, subagent error handling). The focus on "AST-aware" reads suggests a deep technical understanding of long-term scalability issues.
*   **Enterprise-Ready Focus:** **GitHub Copilot CLI** is in a "hardening" phase. The lack of new PRs in the last 24 hours, combined with a focus on admin controls and SDK renaming, suggests a pause in feature exploration to ensure stability for large-scale adoption.
*   **Dormant/Unknown:** **Kimi Code CLI** shows no activity. **Claude Code, OpenCode, Pi, Qwen Code, and DeepSeek TUI** have no data in this digest. This absence is significant; if these tools are stable, their communities may be less vocal, but it could also signal a lull in development or a reporting gap. *Note: The "failed summary" status for major players like Claude Code warrants further investigation.*

## 6. Trend Signals

1.  **Windows is the "Achilles' Heel" of AI CLI Development:** Across Codex, Copilot, and Gemini, Windows-specific bugs (path handling, security software conflicts, UI latency) dominate the issue trackers. Developers should expect continued friction on Windows and prioritize cross-platform testing or consider Linux/macOS-first workflows for experimental features.
2.  **The Death of "Firehose" Context:** The community is actively moving away from dumping entire files into the context window. The push for AST-aware tools (Gemini) and prompt caching (Codex) signals that **semantic context management** is the next major technical battleground for efficiency and cost reduction.
3.  **Multi-Agent Transparency is the New "Log Output":** As agents delegate tasks to sub-agents, users are demanding TUI-level visibility into sub-agent status and errors. Tools that hide sub-agent failures (like Gemini's "GOAL success" bug) will lose trust. Expect "Sub-agent Dashboards" to become a standard UI component.
4.  **Security Software Integration is Critical:** AI CLIs are no longer just text editors; they are execution engines. Conflicts with EDR/XDR tools (Copilot/Cortex) and sandbox registration (Codex/Windows) mean that AI CLI developers must now work closely with security teams and ensure their binaries/behaviors are "clean" for corporate environments.
5.  **Feature Parity with Chat Interfaces:** The demand for "Read Aloud" (Codex), "Quick Chat" hotkeys, and audio transcription shows that developers want the AI CLI to be a full-modal interface, not just a text-only terminal. The line between "CLI" and "Desktop App" is blurring.

**Recommendation for Technical Decision-Makers:**
*   **For Standard Enterprises:** Evaluate **GitHub Copilot CLI** for its governance features and **Gemini CLI** for its stability and context management.
*   **For High-Velocity Dev Teams:** **OpenAI Codex** offers the fastest feature iteration and most advanced multi-agent UIs, but requires tolerance for occasional Windows instability.
*   **Risk Watch:** Monitor the "Data Unavailable" status of **Claude Code** and **OpenCode**. If these tools are actively developing but not reporting, they may be moving to private repositories or different update channels. Their exclusion from this digest is a significant signal in the ecosystem.

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

# OpenAI Codex Community Digest — 2026-11-18

### 1. Today's Highlights
Today's development cycle on `openai/codex` highlights an active focus on desktop application stability, particularly around Windows-specific Computer Use regressions, UI layout synchronizations, and audio-to-text integration. Core contributions also center on robust stream-recovery logic and enhanced subagent visibility inside TUI environments, alongside a heavy release cadence of alpha builds targeting the Rust engine (`v0.170.0` to `v0.171.0`).

---

### 2. Releases
A flurry of alpha releases and stable minor updates hit the repository:
*   **[rust-v0.171.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.12)** & **[rust-v0.171.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.11)**: Continuing the pre-release iteration cycle for the upcoming v0.171.0 milestone.
*   **[rust-v0.170.0-alpha.4.2](https://github.com/openai/codex/releases/tag/rust-v0.170.0-alpha.4.2)** & **[rust-v0.170.0-alpha.4.1](https://github.com/openai/codex/releases/tag/rust-v0.170.0-alpha.4.1)**: Incremental alpha iterations targeting the v0.170 Rust runtime.
*   **[rust-v0.169.1](https://github.com/openai/codex/releases/tag/rust-v0.169.1)**: Patch release containing minor bug fixes and chores over `rust-v0.169.0`.

---

### 3. Hot Issues
1.  **[#49383 - Windows Computer Use screenshot capture fails with FrameArrived timeout and E_INVALIDARG](https://github.com/openai/codex/issues/49383)**
    *   *Why it matters:* Windows users experience complete blocks on app window detection via Computer Use.
    *   *Community Reaction:* High engagement (59 comments) highlighting persistent graphical capture issues on Windows builds.
2.  **[#59855 - Windows Codex Desktop can fail to resume cloud-managed chats with AbsolutePathBuf error](https://github.com/openai/codex/issues/59855)**
    *   *Why it matters:* Breaks cloud chat continuation out-of-the-box on Windows due to serialization mismatches.
    *   *Community Reaction:* 40 comments pointing to serialization bugs when handling stored conversations.
3.  **[#31925 - Restore Option+Space Quick Chat on macOS after ChatGPT/Codex app unification](https://github.com/openai/codex/issues/31925)**
    *   *Why it matters:* Muscle memory shortcut breaks following the app unification update.
    *   *Community Reaction:* Strongly favored by the macOS community with 54 👍 reactions.
4.  **[#42950 - Public site is blocked by Cloudflare for external visitors](https://github.com/openai/codex/issues/42950)**
    *   *Why it matters:* Deployed Codex Sites are inadvertently flagged and blocked by aggressive Cloudflare rules.
    *   *Community Reaction:* Ongoing traction (16 comments) impacting web publication features.
5.  **[#20957 - Codex Desktop: add ChatGPT-style Read Aloud for responses](https://github.com/openai/codex/issues/20957)**
    *   *Why it matters:* Parity request for accessibility features natively available in ChatGPT across other form factors.
    *   *Community Reaction:* Backed by 22 👍 and 14 comments.
6.  **[#60799 - iOS Remote 1.2026.307: project/task list empty after app relaunch](https://github.com/openai/codex/issues/60799)**
    *   *Why it matters:* Cold starts on iOS completely omit the experimental API payload, leaving project dashboards blank.
    *   *Community Reaction:* 9 👍 and 12 comments detailing synchronization drops between mobile and macOS hosts.
7.  **[#60594 - HTTP 400 for repeated image inputs with zstd request compression; same inputs succeed uncompressed (Windows)](https://github.com/openai/codex/issues/60594)**
    *   *Why it matters:* Zstd compression errors out backend API calls when sending multi-turn image payloads.
    *   *Community Reaction:* Critical bug frustrating users relying on visual debugging workflows on Windows.
8.  **[#50238 - Queue requests on model capacity errors instead of interrupting long-running work](https://github.com/openai/codex/issues/50238)**
    *   *Why it matters:* Capacity limit errors instantly hard-crash long-running automated local CLI jobs.
    *   *Community Reaction:* High-value developer experience request for fault tolerance.
9.  **[#62143 - CLI @Chrome/@Browser broken since bundled plugin 26.1023: worker never gets the browser access host](https://github.com/openai/codex/issues/62143)**
    *   *Why it matters:* Breaks browser automation integration entirely across platforms.
    *   *Community Reaction:* Rapidly gaining comments as a blocking issue for browser-loop scripts.
10. **[#62109 - GPT-6.2 Sol on Codex OAuth: unchanged top-level instructions show 0 cached tokens in partially cached continuation](https://github.com/openai/codex/issues/62109)**
    *   *Why it matters:* Impacts cost-efficiency and performance metrics by failing to leverage prompt caching for static instructions.
    *   *Community Reaction:* Early developer report flagging cache optimization failures with newer models.

---

### 4. Key PR Progress
1.  **[#62149 - Show subagents and their status in the TUI sidebar chooser](https://github.com/openai/codex/pull/62149)**
    *   *Details:* Adds a dedicated `Subagents` section to the main TUI menu, letting developers track progress and jump into sub-threads.
2.  **[#62142 - Add audio transcription to the backend client](https://github.com/openai/codex/pull/62142)**
    *   *Details:* Introduces `Client::transcribe_audio` supporting authenticated multipart uploads (WAV, MP3, M4A, WebM, Ogg) capped at 64MB.
3.  **[#62150 - Cancel Cloud overview refreshes that block TUI navigation](https://github.com/openai/codex/pull/62150)**
    *   *Details:* Prevents heavy background cloud task retrieval from freezing snappy local TUI interactions like the resume picker.
4.  **[#62140 - Hold Cloud reply streams until history can be refreshed](https://github.com/openai/codex/pull/62140)**
    *   *Details:* Ensures disconnected cloud conversations do not miss turns upon reattachment by asserting sync boundaries.
5.  **[#62138 - Use the state database first for TUI analytics thread lists](https://github.com/openai/codex/pull/62138)**
    *   *Details:* Optimizes root thread pagination for analytics by querying local state DB directly instead of executing expensive filesystem scans.
6.  **[#62132 - Stream partial thread search results and support cancellation](https://github.com/openai/codex/pull/62132)**
    *   *Details:* Enables progressive rendering of `thread/search` hits, improving responsiveness when users refine active query strings.
7.  **[#62139 - Update crossterm to fix stray input when scrolling](https://github.com/openai/codex/pull/62139)**
    *   *Details:* Bumps `crossterm` dependency to clean up mouse-scroll event chunking on Unix terminals, fixing stray characters in the composer.
8.  **[#62129 - Support enterprise MCP sign-in without refresh tokens](https://github.com/openai/codex/pull/62129)**
    *   *Details:* Fixes `ema_auth` flows for strict enterprise IDPs issuing OpenID Connect ID tokens without `offline_access` refresh tokens.
9.  **[#62141 - Repair missing or stale Windows sandbox Core registration](https://github.com/openai/codex/pull/62141)**
    *   *Details:* Forces automatic setup execution when protected Windows sandbox Core registrations are missing, circumventing bad cached state.
10. **[#62153 - Reduce overhead in CLI integration tests](https://github.com/openai/codex/pull/62153)**
    *   *Details:* Shares common SSE-only mocks and mitigates parallel Tokio worker bloat to speed up continuous integration loops.

---

### 5. Feature Request Trends
*   **Accessibility & Native Parity:** Expanding macOS and Windows desktop feature parity to mirror standard web/mobile features (e.g., Read Aloud [#20957], Quick Chat hotkeys [#31925]).
*   **Advanced Multi-Agent Collaboration:** Managing sprawling projects across multiple computers and deeply visualizing subagents in local interfaces [#56801, #62149].
*   **Fault-Tolerant Workflows:** Automated request queuing during capacity spikes instead of hard-failing long-running developer jobs [#50238].

---

### 6. Developer Pain Points
*   **Windows Environment Fragility:** High incidence of platform-specific bugs covering Windows Computer Use window capture timeouts (`FrameArrived` / `E_INVALIDARG`) [#49383, #59303, #61157], path deserialization crashes (`AbsolutePathBuf`) [#59855], and sandbox access blockades [#54746].
*   **State & Sync Discrepancies:** Frustration over missing cloud chats in desktop sidebars while web views function normally, pointing to flaky state persistence and synchronization layers across clients [#59297, #58424, #61294].

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-11-18

## Today's Highlights
The Gemini CLI repository saw a heavy influx of core security hardening, subprocess optimization, and agent workflow management issues over the last 24 hours. Developers are actively resolving Windows UI latency bottlenecks, refining tool execution safety constraints, and addressing critical subagent tracking failures. Meanwhile, platform maintainers are streamlining IDE companion discovery paths and tightening authorization parsing across extensions.

---

## Hot Issues
1. **[#22323 - Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   * **Why it matters:** The `codebase_investigator` subagent falsely reports a `success` state and `"GOAL"` termination reason even after exhausting its maximum turn limit without running any analysis.  
   * **Community reaction:** Draws high engagement (13 comments) due to misleading execution feedback confusing automated workflows.

2. **[#19873 - Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**  
   * **Why it matters:** Proposes optimizing Gemini 3's native training data (which heavily relies on POSIX toolchain chaining) through sandboxed, zero-dependency execution paths.  
   * **Community reaction:** Viewed as a vital foundational shift for maximizing model utility without compromising environment safety.

3. **[#21409 - Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   * **Why it matters:** Simple directory creation tasks prompt the generalist agent to hang indefinitely (exceeding an hour), forcing users to manually bypass subagent delegation.  
   * **Community reaction:** Highly disruptive bug with 8 thumbs-up reactions, halting core functionality for users relying on automated multi-agent handoffs.

4. **[#22745 - Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**  
   * **Why it matters:** Epic tracking the incorporation of Abstract Syntax Tree (AST) aware tools to restrict method bound reading and cut down token noise.  
   * **Community reaction:** Recognized as a crucial roadmap item for addressing context bloat and reducing misaligned file reads.

5. **[#21968 - Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**  
   * **Why it matters:** Users note that custom skills and sub-agents (like gradle or git helpers) are almost entirely ignored organically unless explicitly invoked via prompt.  
   * **Community reaction:** Highlights a mismatch between user-defined configuration and the agent's autonomous task routing heuristics.

6. **[#30227 - Gemini gallery remains at October 16 snapshot; Print Ready is code-indexed and installs successfully](https://github.com/google-gemini/gemini-cli/issues/30227)**  
   * **Why it matters:** The remote extension gallery feed (`extensions.json`) is stuck serving a stale cache header from mid-October, preventing seamless third-party extension discovery.  
   * **Community reaction:** Direct blocker for developers tracking newly published community extensions.

7. **[#22267 - Browser Agent ignores settings.json overrides (e.g., maxTurns)](https://github.com/google-gemini/gemini-cli/issues/22267)**  
   * **Why it matters:** Global and project-level configurations fail to pass through to the `browser_agent`, causing settings like turn caps to be silently bypassed.  
   * **Community reaction:** Frustrates power users attempting to scope automated browser debugging loops.

8. **[#29370 - Removes comments from a file when making updates](https://github.com/google-gemini/gemini-cli/issues/29370)**  
   * **Why it matters:** Code modification routines occasionally strip unrelated documentation or comments out of edited source files.  
   * **Community reaction:** Creates trust issues regarding code integrity during automated refactoring tasks.

9. **[#24246 - Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**  
   * **Why it matters:** Surpassing 128 active tools triggers API payload errors due to scope explosion, requiring smarter tool-set limitation mechanisms.  
   * **Community reaction:** Points to scaling constraints as extension counts and built-in subagent tool pools grow.

10. **[#22186 - get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**  
    * **Why it matters:** Terminal output hooks trigger fatal application crashes right as multi-container deployment workflows finish initializing.  
    * **Community reaction:** Results in abrupt session terminations at the worst possible moment—just before user validation.

---

## Key PR Progress
1. **[#30334 - fix(core,cli): parse PowerShell commands asynchronously to prevent UI spinner freeze](https://github.com/google-gemini/gemini-cli/pull/30334)**  
   * **Description:** Fixes a multi-second Windows UI freeze by shifting synchronous PowerShell AST command parsing off the main thread.

2. **[#30340 - fix(ide): use per-user discovery directory and atomic port file writes](https://github.com/google-gemini/gemini-cli/pull/30340)**  
   * **Description:** Secures VS Code IDE companion discovery files by scoping them to POSIX user-isolated temp directories (`0700`) with atomic file writes (`0600`).

3. **[#30335 - fix(core): stop overriding core.sshCommand with an empty string](https://github.com/google-gemini/gemini-cli/pull/30335)**  
   * **Description:** Prevents sandboxed shell defaults from blanking out `core.sshCommand`, fixing silent failures during remote git operations.

4. **[#30331 - fix(cli): preserve MCP env values containing = and empty values](https://github.com/google-gemini/gemini-cli/pull/30331)**  
   * **Description:** Corrects parameter parsing for Model Context Protocol commands (`-e KEY=value`) so strings with multiple assignment tokens or empty parameters are preserved.

5. **[#30315 - fix(cli): detect local git clone from CLI path instead of cwd](https://github.com/google-gemini/gemini-cli/pull/30315)**  
   * **Description:** Ensures auto-update routines correctly identify local development checkouts regardless of the user's current working directory.

6. **[#30219 - fix(acp): record tool calls on active chat to prevent 400 on compressed session reload](https://github.com/google-gemini/gemini-cli/pull/30219)**  
   * **Description:** Routes completed or failed tool calls through active chat states during Agent Client Protocol sessions to prevent post-compression reload failures.

7. **[#30115 - fix(core,cli): prevent $-pattern expansion in custom command and prompt substitutions](https://github.com/google-gemini/gemini-cli/pull/30115)**  
   * **Description:** Eliminates accidental regex/JavaScript replacement pattern corruption (`$$`, `$&`, etc.) inside prompt templates and custom arguments.

8. **[#30289 - fix(cli): disclose canonical link path and default consent prompt to no](https://github.com/google-gemini/gemini-cli/pull/30289)**  
   * **Description:** Updates `gemini extensions link` and non-interactive flows to resolve canonical paths securely using real filesystem locations.

9. **[#30342 - ci: pre-pull triage image and clear Docker login in dedup workflows](https://github.com/google-gemini/gemini-cli/pull/30342)**  
   * **Description:** Optimizes GitHub Actions CI pipeline security by pruning persistent GHCR credentials immediately after pre-pulling triage MCP images.

10. **[#30321 - chore(deps): update workspace dependencies and sandbox runtime packages](https://github.com/google-gemini/gemini-cli/pull/30321)**  
    * **Description:** Keeps Stage 2 sandbox container runtimes, MCP SDKs, and workspace dependency overrides cleanly aligned.

---

## Feature Request Trends
* **AST Integration & Surgical Code Reads:** Growing demand to replace "firehose" raw file reads with abstract syntax tree tooling (`tilth`, `glyph`, or `ast-grep`) to optimize context windows and minimize token consumption.
* **Persistent & Shared Task Tracking:** Moving away from in-context volatile todo items (`WriteToDo`) toward persistent, file-based project tracking mechanisms.
* **Autonomous Agent Reliability:** Better self-awareness of internal CLI mechanics, flags, and hotkeys, alongside parallel subagent collaboration structures.
* **Subagent Observability:** Expanded telemetry for subagent execution paths, allowing trajectory inspection via `/chat share` and comprehensive bug reporting.

---

## Developer Pain Points
* **UI Freezes and Hanging Agents:** Windows PowerShell parsing locks and generalist agent deadlocks cause significant developer downtime, requiring hard process terminations.
* **Silent Configuration Failures:** Issues where custom subagent overrides, environment variables containing special characters (`=`), or browser settings are quietly dropped or ignored without helpful logging.
* **Context Bloat & Token Limits:** Large repository investigations quickly hit payload and tool count ceilings (exceeding 128 tools or max token thresholds), resulting in API 400 errors.
* **Code Fidelity Risks:** Unintended stripping of comments or collateral edits during file updates undermine trust when delegating refactoring tasks to the CLI.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest: 2026-11-18

## 1. Today's Highlights
The latest updates to the Copilot CLI (v1.0.113/v1.0.113-1) focus on administrative control, introducing a managed setting to disable "Browser Use" features globally. The community is currently navigating a wave of reports following the latest release, specifically regarding an abrupt SDK package rename and ongoing friction with endpoint security tools on Windows.

## 2. Releases
*   **v1.0.113 / v1.0.113-1**: Added a critical administrative control allowing administrators to disable built-in **Browser Use** via `features.browserUse`. This setting can be applied to restrict functionality even in active, running sessions.

## 3. Hot Issues
*   [#5492](https://github.com/github/copilot-cli/issues/5492): **SDK Rename Conflict.** The transition from `@github/copilot-sdk` to `@microsoft/copilot-sdk` has broken existing extensions without providing an alias or migration notice.
*   [#5478](https://github.com/github/copilot-cli/issues/5478): **Cortex XDR Conflict.** Security software (Cortex XDR) is incorrectly flagging Copilot CLI’s git execution as "parent_process_spoofing," causing immediate shell crashes on Windows.
*   [#5496](https://github.com/github/copilot-cli/issues/5496): **Drive Letter Bug.** Repo instruction files fail to load when repositories are located on volume mount points without assigned drive letters.
*   [#5495](https://github.com/github/copilot-cli/issues/5495): **Computer Use Policy.** Built-in safety policies on Windows are aggressively blocking interactions with the ChatGPT desktop app, preventing even basic accessibility tree reads.
*   [#5491](https://github.com/github/copilot-cli/issues/5491): **Marketplace Bloat.** Cloning large marketplace repositories causes significant disk overhead and performance issues; users are requesting better download efficiency.
*   [#5490](https://github.com/github/copilot-cli/issues/5490): **Tool Name Clash.** Reloading extensions causes permanent tool registration failures because the CLI fails to clean up handles from the previous connection.
*   [#5483](https://github.com/github/copilot-cli/issues/5483): **Message Concatenation.** Race conditions in `immediate` mode cause multiple inputs to merge into a single, garbled string, confusing the model.
*   [#5413](https://github.com/github/copilot-cli/issues/5413): **HydraFusion Support.** Sub-agents are unable to utilize `hydrafusion` models despite them being advertised as available in the `task` tool interface.
*   [#5494](https://github.com/github/copilot-cli/issues/5494): **Fusion Judge False-Negatives.** The Fusion judge is incorrectly rejecting valid cross-session actions due to a failure in verifying external evidence.
*   [#5489](https://github.com/github/copilot-cli/issues/5489): **Stale Documentation.** Contributing docs currently reference non-existent scripts (`script/bootstrap`), hindering community onboarding.

## 4. Key PR Progress
*   *Note: No new Pull Requests were updated in the last 24 hours.*

## 5. Feature Request Trends
*   **Enterprise Governance:** Organizations are pushing for better ways to manage sandbox environments, configuration enforcement, and security-hardened deployment models (e.g., #4446).
*   **Operational Cleanliness:** High demand for better process lifecycle management, such as a `/cleanup` command to purge orphaned MCP servers and stale subprocesses (e.g., #1790).
*   **Network Optimization:** Requests for more performant plugin handling, specifically using `sparse checkout` for marketplace repositories to save disk space and bandwidth (e.g., #2463).

## 6. Developer Pain Points
*   **Windows Environment Fragility:** Users on Windows are facing multiple blockers, from mount point issues and security software conflicts to aggressive safety policies on "Computer Use."
*   **State & Lifecycle Management:** Developers frequently report "stale state" issues—where reloads fail, MCP servers hang, or tool registrations conflict—requiring total session or application restarts.
*   **Silent Failures:** The CLI’s tendency to swallow errors (e.g., in plugin contexts or filesystem access) makes it difficult for power users to debug complex agentic workflows.

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