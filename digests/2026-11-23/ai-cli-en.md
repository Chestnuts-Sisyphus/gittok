# AI CLI Tools Community Digest 2026-11-23

> Generated: 2026-11-23 00:31 UTC | Tools covered: 9

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

**Claude Code Skills Community Highlights – 2026‑11‑23**

---

### 1. Top Skills Ranking  
| # | Skill (PR) | Functionality | Discussion Highlights | Status |
|---|------------|---------------|------------------------|--------|
| **#1742** | *fix(mcp‑builder)* – support `mcp>=2` streamable HTTP client imports and custom headers | Adds compatibility with newer MCP releases and allows users to inject custom HTTP headers via `create_mcp_http_client`. | Developers noted that the renaming broke CI pipelines and raised a “no‑header” issue on Windows builds. | **OPEN** |
| **#1298** | *fix(skill‑creator)* – isolate trigger evals; Windows & runtime failures | Re‑implements trigger evaluation logic, fixes `select()` on Windows, and isolates unrelated tool failures from triggering the Skill. | The PR was discussed for its impact on “false‑miss” rates in the Skill‑Creator test harness. | **OPEN** |
| **#1245** | *Add notion‑spec‑to‑implementation & quantitative‑resume‑auditor* | Transforms Notion tech‑specs into concrete tasks and audits resume‑related metrics for hiring pipelines. | Community praised the “Notion‑to‑Action” pipeline and requested more template support. | **OPEN** |
| **#1980** | *webapp‑testing*: avoid `shell=True` in `with_server.py` | Removes `shell=True` from subprocess calls to mitigate command‑injection risk (CWE‑78). | Security‑focused discussion highlighted the potential for malicious agents. | **OPEN** |
| **#1792** | *fix(docx)* – report LibreOffice timeout as an error | Enhances `accept_changes.py` to return an error when LibreOffice times out and validates that the output DOCX has no revision marks. | Developers appreciated the stricter error handling for batch DOCX processing. | **OPEN** |

> All five PRs remain **OPEN** and have attracted the most comment activity (though exact counts are not displayed). They reflect a community focused on bug fixes, compatibility, and security hardening.

---

### 2. Community Demand Trends  
From the top 15 Issues (by comments):

| Trend | Evidence | Example Issues |
|-------|----------|----------------|
| **Security & Trust Boundary** | Users are concerned about community‑made skills masquerading as official Anthropic skills, and about unsafe `shell=True` usage. | #492 (namespace abuse), #1980 (shell injection), #1487 (token exhaustion). |
| **Skill Sharing & Collaboration** | Demand for easier org‑wide skill distribution and streamlined sharing mechanisms. | #228 (org‑wide sharing), #1143 (account email change to preserve workspace data). |
| **Trigger Reliability & Evaluation** | Several issues around `run_eval.py` and trigger rates. | #556, #1352 (false‑negative trigger rates). |
| **Workflow Automation & Tooling** | New Skill ideas for automating document conversion, code review, and deployment. | #1245 (Notion spec), #1615 (SCNet HPC), #1980 (webapp testing), #1771 (smart‑contract auditor). |
| **Documentation & Usability** | Need for clearer README guidance and documentation snapshots. | #2108 (snapshot status), #189 (duplicate skills). |

**Key Takeaway:** The community is pushing for **secure, shareable, and reliable tooling** that automates repetitive document & workflow tasks while maintaining trust boundaries.

---

### 3. High‑Potential Pending Skills  
These open PRs have active comment threads and are likely to merge soon:

| # | Skill | GitHub Link | Current Focus |
|---|-------|-------------|---------------|
| **#1681** | *fix(skill‑creator)* – support direct execution of `package_skill.py` | <https://github.com/anthropics/skills/pull/1681> | Simplifies CLI usage for skill authors. |
| **#1977** | *algorithmic‑art*: wrapAround() now wraps | <https://github.com/anthropics/skills/pull/1977> | Fixes a subtle math bug affecting graphics generation. |
| **#1976** | *webapp‑testing*: correct element discovery | <https://github.com/anthropics/skills/pull/1976> | Improves element detection accuracy. |
| **#1950** | *docs(claude‑api)*: update Python pause_turn runner guidance | <https://github.com/anthropics/skills/pull/1950> | Aligns docs with SDK 1.1.0 changes. |
| **#1615** | *Add scnet‑hpc skill* | <https://github.com/anthropics/skills/pull/1615> | Adds HPC cluster orchestration. |

These PRs address real user pain points and have seen steady discussion, indicating a high likelihood of merging in the next cycle.

---

### 4. Skills Ecosystem Insight  
> The community’s focus centers on **automating document‑centric workflows while tightening security and improving shareability of Skills**.

---

---

# Claude Code Community Digest (2026-11-23)

### 1. Today's Highlights
The Claude Code community is heavily focused on cross-platform integration friction, specifically around Windows worktree path evaluation and macOS/VSCode Model Context Protocol (MCP) elicitation bugs. Developers are also pushing back against overzealous platform safeguards—such as hard password-typing blocks and false-positive reasoning extractions—that hinder legitimate local testing and enterprise developer workflows.

---

### 2. Releases
*No new releases in the last 24 hours.*

---

### 3. Hot Issues

1. **[#78160 Hard block on typing passwords breaks legitimate dev/test workflows](https://github.com/anthropics/claude-code/issues/78160)**
   * **Why it matters:** Claude Code completely refuses to type passwords into login forms, even for documented test accounts on localhost.
   * **Community reaction:** Highly contentious (32 👍, 25 comments); devs want a permission-gated opt-in for isolated or local test environments.

2. **[#98256 MCP elicitation requests auto-declined in interactive VSCode sessions](https://github.com/anthropics/claude-code/issues/98256)**
   * **Why it matters:** MCP capabilities are declared successfully, but interactive sessions in VSCode default to "print mode," auto-declining prompts.
   * **Community reaction:** Gaining traction (28 👍) among IDE power users relying on custom MCP toolsets.

3. **[#76624 Account: allow changing email address in-place](https://github.com/anthropics/claude-code/issues/76624)**
   * **Why it matters:** Users cannot update their account email without abandoning their current account structure.
   * **Community reaction:** Popular request (18 👍) regarding basic account management flexibility.

4. **[#91618 Windows isolation-worktree safety check rejects valid worktree due to case-sensitive drive-letter comparison](https://github.com/anthropics/claude-code/issues/91618)**
   * **Why it matters:** Windows users opening projects via workspace files on NTFS drives face false-positive rejections because of capitalization discrepancies (`D:\` vs `d:\`).
   * **Community reaction:** Frustrates Windows/Cursor developers attempting safe workspace isolation.

5. **[#82700 Pro subscription blocked — "organization has disabled subscription access"](https://github.com/anthropics/claude-code/issues/82700)**
   * **Why it matters:** Pro users are locked out of Claude Code with a persistent enterprise error message despite full re-authentication.
   * **Community reaction:** High-friction blocker interrupting active development subscriptions.

6. **[#111336 False-positive reasoning_extraction safeguard blocks ordinary dev work](https://github.com/anthropics/claude-code/issues/111336)**
   * **Why it matters:** Internal extraction safeguards are incorrectly triggering on standard coding loops across multiple models (Fable 5.2, Opus 5.5, Sonnet 5.5).
   * **Community reaction:** Accumulating developer complaints over halted productivity (78 blocked requests in a single week).

7. **[#84738 Advisor turns roll up usage summed across iterations, doubling apparent context](https://github.com/anthropics/claude-code/issues/84738)**
   * **Why it matters:** The server-side `advisor` tool sums token usage across multiple iterations, causing auto-compaction to trigger 300K–500K tokens prematurely.
   * **Community reaction:** Impacts subagents hardest, severely limiting long-form context windows.

8. **[#111395 Cowork scheduled tasks: remote MCP calls fail with HTTP 400 "missing Mcp-Param-owner header"](https://github.com/anthropics/claude-code/issues/111395)**
   * **Why it matters:** Automated remote MCP calls break when executed via background Cowork scheduled tasks, while identical calls succeed interactively.
   * **Community reaction:** Blocks unattended async automation pipelines.

9. **[#109152 `--tools ""` still primes agent actions, causing fabricated Write/Bash calls](https://github.com/anthropics/claude-code/issues/109152)**
   * **Why it matters:** Passing an empty tool definition list still primes the model to hallucinate file writes or bash commands and claim they executed.
   * **Community reaction:** Raises core reliability concerns for headless or restricted-agent pipelines.

10. **[#111739 Client ignores all keyboard input after `/resume` attaches to a busy background session](https://github.com/anthropics/claude-code/issues/111739)**
    * **Why it matters:** Attaching to an active background session locks out all inputs (including `Ctrl+C` / `Ctrl+D`), forcing hard terminal kills.
    * **Community reaction:** Critical TUI navigation trap on Linux builds.

---

### 4. Key PR Progress
*No pull requests were updated or merged in the last 24 hours.*

---

### 5. Feature Request Trends
* **Granular Security and Permission Opt-ins:** Developers want escape hatches from blanket blocks (e.g., opting into test-credential typing or overriding strict automation limits).
* **Cross-Platform Parity & Stability:** Better handling of cross-drive path comparisons on Windows, robust TUI focus management on Linux, and unified session naming between mobile/web and desktop apps.
* **Predictable Headless and Scripting Outputs:** Clean separation of success/error statuses for CLI wrappers (`claude -p`) and reliable tracking for background MCP tasks.

---

### 6. Developer Pain Points
* **Aggressive Safeguards:** False-positive reasoning extractions and rigid blocklists are frequently catching legitimate software engineering tasks in the crossfire.
* **Context Budget Inflation:** Premature auto-compaction caused by double-counting server-side advisor tool iterations.
* **Authentication and Account Silos:** Inability to change account email addresses in-place and persistent enterprise subscription locking errors.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — November 23, 2026

## 1. Today's Highlights
The Codex repository saw a heavy influx of community bug reports concerning Windows platform integrations, sandbox regressions, and desktop app stability. Meanwhile, core maintainer bots (`copyberry[bot]`) pushed a massive wave of terminal UI (TUI) polish, WebSocket connection persistence, and layout fixes. Developers are increasingly pushing for continuous, workspace-oriented engineering integrations rather than isolated, disposable sandbox tasks.

---

## 2. Releases
*No new releases were published in the last 24 hours.*

---

## 3. Hot Issues
1. **[#57101 - Windows Computer Use: capture access and gold/yellow display border remain open](openai/codex Issue #57101)**
   * **Why it matters:** Windows users employing the Computer Use plugin encounter lingering system display borders and capture hooks after turns complete.
   * **Community Reaction:** Highly active thread (84 comments, 14 👍), signaling security and system resource concerns over persistent screen capture states.

2. **[#61348 - Make ChatGPT + Work + Codex a continuous engineering workspace](openai/codex Issue #61348)**
   * **Why it matters:** Highlights a major product paradigm shift—developers want persistent, continuous workspaces rather than disposable chat tasks.
   * **Community Reaction:** Heavily commented (41 comments) as developers debate how long-term memory and workspace syncing should behave.

3. **[#28094 - Codex Desktop rewrites /home project paths as C:\home on WSL](openai/codex Issue #28094)**
   * **Why it matters:** Breaks path resolution and project chat associations for Windows users utilizing Windows Subsystem for Linux (WSL).
   * **Community Reaction:** Frustrated user base unable to maintain stable cross-environment paths.

4. **[#46110 - Linux sandbox rejects valid nsfs mount roots from snapd (`mountinfo path is not absolute`)](openai/codex Issue #46110)**
   * **Why it matters:** Completely blocks bubblewrap-based sandboxing on standard Ubuntu environments utilizing snapd.
   * **Community Reaction:** Gained significant traction (21 👍, 26 comments) from enterprise Linux users facing sandbox initialization crashes.

5. **[#53560 - macOS desktop Work approvals immediately fail with “approval request is no longer active”](openai/codex Issue #53560)**
   * **Why it matters:** Prevents macOS desktop users from clearing authorization prompts during automated Work runs.
   * **Community Reaction:** Disrupts developer workflows, though web clients remain unaffected.

6. **[#62975 - Permissions selector disappears after sending first message; Work home forces Cloud/TPP](openai/codex Issue #62975)**
   * **Why it matters:** Strips control over local vs. cloud execution paradigms mid-session on Windows setups.
   * **Community Reaction:** Rapidly rising attention as users lose local sandbox enforcement.

7. **[#24704 - Forked subagents lose prompt-cache lineage for inherited parent context](openai/codex Issue #24704)**
   * **Why it matters:** Architectural bug reducing prompt caching efficiency and inflating token costs when spawning subagents.
   * **Community Reaction:** Highly rated (20 👍) by power users running deep subagent trees.

8. **[#59941 - `CreateProcessSecurityEnvironment` (0x8007000F) blocks all local commands after update](openai/codex Issue #59941)**
   * **Why it matters:** A post-update regression on Windows that halts even basic shell commands like `Get-Location` before execution.
   * **Community Reaction:** Critical stability blocker leaving desktop app installations unusable.

9. **[#53799 - Nested Linux Codex sandbox fails: masked daemon directory conflicts with inner check](openai/codex Issue #53799)**
   * **Why it matters:** Prevents running Codex CLI inside a container or outer sandbox environment due to rendezvous directory overlap.
   * **Community Reaction:** Noted by advanced infrastructure and CI/CD engineers nesting sandbox execution.

10. **[#62899 - ChatGPT iOS crashes opening Codex tab: SwiftUI metadata `EXC_BAD_ACCESS`](openai/codex Issue #62899)**
    * **Why it matters:** Complete crash-on-launch for the Codex tab within the mobile app on iOS 27 betas.
    * **Community Reaction:** Frustrating regression blocking mobile session reviews.

---

## 4. Key PR Progress
1. **[#63211 - Automatically resume disconnected cloud conversations in the TUI](openai/codex PR #63211)**
   * Automatically reattaches dropped cloud streams in the background to ensure missing terminal replies are restored.
2. **[#63208 - Add creation-time sorting to Command Center search](openai/codex PR #63208)**
   * Introduces a `Tab` toggle in the search interface to switch between `Updated` and `Created` task sorting.
3. **[#63196 - Keep streamed output visible until inline history is repainted](openai/codex PR #63196)**
   * Prevents markdown tables from briefly disappearing or misformatting during the transition from live streaming to scrollback.
4. **[#63195 - Honor tmux mouse changes while the TUI is in alternate screen](openai/codex PR #63195)**
   * Fixes mouse capture synchronization when the tmux `mouse` option is toggled inside an active alternate screen.
5. **[#63193 - Discard TUI typeahead after prompt rewind and fork](openai/codex PR #63193)**
   * Prevents buffered keystrokes or accidental `Enter` inputs from prematurely submitting a prompt immediately after a rewind action.
6. **[#63184 - Let Codex open workspace files in the terminal sidebar](openai/codex PR #63184)**
   * Adds the `open_in_codex` MCP tool, letting the terminal display target files directly alongside active conversations.
7. **[#63175 - Reuse runtime-authenticated Responses WebSockets](openai/codex PR #63175)**
   * Avoids expensive handshakes on every request by maintaining open WebSockets for runtime-authenticated streams.
8. **[#63169 - Increase Linux voice callback periods at 48 kHz](openai/codex PR #63169)**
   * Raises Linux audio capture targets from 50ms to 80ms to prevent buffer overruns and dropped samples on PipeWire/ALSA graphs.
9. **[#63146 - Show task loading progress in the docked agent command center](openai/codex PR #63146)**
10. **[#63145 - Keep task status visible and fix paging in the agent command center](openai/codex PR #63145)**
    * Enhances UI responsiveness and layout spacing for narrow screens within the docked agent command center.

---

## 5. Feature Request Trends
* **Continuous Engineering Workspaces:** Growing push away from disposable, isolated chat threads toward long-lived, multi-session engineering environments that retain deep memory and context.
* **Enhanced Navigation & Control:** Requests for streamlined keyboard shortcuts to modify reasoning efforts, default to "No Project" states on startup, and improve UI command-palette interactions.
* **Granular Sandbox & Permission Management:** Demand for more predictable local vs. cloud execution selectors and clearer usage limit visibility for paid tiers.

---

## 6. Developer Pain Points
* **Windows & WSL Path Translation:** Persistent failures where Windows Desktop clients misinterpret WSL paths (e.g., rewriting `/home` to `C:\home`), causing lost chat histories.
* **Sandbox & Permission Regressions:** Frequent post-update security environment errors (`CreateProcessSecurityEnvironment` failures on Windows and `mountinfo path is not absolute` on Linux) halting local command execution.
* **Approval Desyncs:** Issues on both macOS and Windows where interactive approval prompts immediately fail with "approval request is no longer active," blocking automated execution workflows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest: 2026-11-23

## 1. Today's Highlights
The Gemini CLI ecosystem is undergoing a significant transition toward agent-to-agent (A2A) orchestration and ACP (Agent Client Protocol) stabilization. Recent development is heavily focused on refining subagent reliability, fixing sandbox-related execution hangs, and addressing critical bugs in tool output handling.

## 2. Releases
*   **[v0.71.0-nightly.20261122](https://github.com/google-gemini/gemini-cli/compare/v0.71.0-nightly.20261121.geecccfcd5...v0.71.0-nightly.20261122.geecccfcd5)**: Latest nightly build featuring ongoing infrastructure refinements.

## 3. Hot Issues
1.  **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) - Subagent "False Success"**: Subagents report "GOAL success" after hitting `MAX_TURNS` without performing actual work.
2.  **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) - Generalist Agent Hangs**: High-priority bug where the agent hangs indefinitely when deferring tasks; highly active with 8 upvotes.
3.  **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) - Browser Agent Config Ignore**: Settings in `settings.json` are being discarded, impacting production of persistent browser sessions.
4.  **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) - Wayland Browser Failures**: Specific platform-level failure for the browser subagent in Wayland environments.
5.  **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) - Destructive Behavior**: Community call to prevent agents from executing unsafe commands like `git reset --force`.
6.  **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186) - Crash on Output Hook**: The `get-shit-done` hook is triggering crashes during summary generation.
7.  **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) - Tool Limit Overflow**: Agent returns 400 errors when the available tool count exceeds 128.
8.  **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) - Workspace Littering**: Model generates excessive temporary scripts, creating cleanup overhead.
9.  **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) - Symlink Subagent Support**: User request to fix agent recognition when the agent path is a symlink.
10. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) - Browser Session Locking**: Need for automatic takeover/recovery when a persistent session is orphaned.

## 4. Key PR Progress
1.  **[#30409](https://github.com/google-gemini/gemini-cli/pull/30409) - Agent Recursion**: Enables agents to invoke other agents, significantly increasing modularity.
2.  **[#30297](https://github.com/google-gemini/gemini-cli/pull/30297) - ACP Output Truncation**: Prevents large tool outputs from flooding the context window in ACP mode.
3.  **[#30298](https://github.com/google-gemini/gemini-cli/pull/30298) - Parallel Tool Calls**: Allows independent tools to run concurrently in ACP mode, improving latency.
4.  **[#30339](https://github.com/google-gemini/gemini-cli/pull/30339) - Hook Denial Handling**: Ensures `BeforeAgent` hook results are properly surfaced to the ACP client.
5.  **[#30405](https://github.com/google-gemini/gemini-cli/pull/30405) - Server Resilience**: Fixes a process-wide crash caused by unhandled rejections in task scheduling.
6.  **[#30404](https://github.com/google-gemini/gemini-cli/pull/30404) - Checkpoint Filename Fix**: Corrects a bug where `.json` files were incorrectly mangled during restoration.
7.  **[#30277](https://github.com/google-gemini/gemini-cli/pull/30277) - Permission Detection**: Better error handling for restricted environments/containers.
8.  **[#30353](https://github.com/google-gemini/gemini-cli/pull/30353) - Token Usage Tracking**: Standardizes how ACP consumes and reports token metadata, fixing previous loss of data.
9.  **[#30401](https://github.com/google-gemini/gemini-cli/pull/30401) - MCP Timeout Persistence**: Ensures tool refresh doesn't drop configured timeouts.
10. **[#30400](https://github.com/google-gemini/gemini-cli/pull/30400) - ACP Startup Hangs**: Fixes a race condition where stdin reads blocked the initialization process.

## 5. Feature Request Trends
*   **AST-Aware Context**: A strong push (Issues [#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#22747](https://github.com/google-gemini/gemini-cli/issues/22747)) for AST-aware code navigation to reduce token bloat.
*   **Tool Efficiency**: Strategies to limit "context rot" and optimize token usage, including "Tactful Extraction" [#19561](https://github.com/google-gemini/gemini-cli/issues/19561).
*   **Agent Self-Awareness**: Developers want agents to manage their own settings and provide guided help for their specific capabilities [#21432](https://github.com/google-gemini/gemini-cli/issues/21432).

## 6. Developer Pain Points
*   **Context/Token Management**: Repeated frustration with high token usage per turn and "firehosing" of code during large file reads.
*   **Agent Reliability**: High-frequency complaints regarding hangs during subagent transitions and "invisible" agent failures where the model halts without actionable feedback.
*   **Sandbox Friction**: Developers working in containerized or restricted environments face recurring permission and environment-detection issues.
*   **Cleanup Burden**: Models often leave behind scattered temporary files/scripts, complicating manual workspace maintenance.

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