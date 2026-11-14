# AI CLI Tools Community Digest 2026-11-14

> Generated: 2026-11-14 00:33 UTC | Tools covered: 9

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-11-14

## Today's Highlights
The Gemini CLI repository continues its heavy focus on stabilizing autonomous subagent workflows, improving OS-level sandboxing, and hardening tool execution limits. Recent community discussions and bug reports target critical pain points around subagent interruptions, context management, and CLI process reliability. Meanwhile, core maintainers are actively merging hardening patches for MCP server permissions and Node 26 fetch timeouts.

---

## Releases
*No new releases in the last 24 hours.*

---

## Hot Issues
1. **[#22323: Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**
   - *Why it matters:* Codebase investigator subagents report a false-positive `"success"` and `"GOAL"` termination reason after hitting maximum turn limits without actually performing analysis.
   - *Community reaction:* High priority (P1) tracking; indicates risk of silent subagent failures hiding incomplete workflows.

2. **[#21409: Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**
   - *Why it matters:* Simple file/folder operations deferring to the generalist agent cause indefinite hangs, requiring manual cancellation or explicit instructions to avoid subagents.
   - *Community reaction:* Highly voted (+8) and commented (8), pointing to a core execution block in default task routing.

3. **[#22745: Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**
   - *Why it matters:* Epic tracking the integration of AST-aware tools to dramatically reduce token bloat and misaligned method reads.
   - *Community reaction:* Core initiative to make codebase navigation more surgical and token-efficient.

4. **[#21968: Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**
   - *Why it matters:* Despite registering custom skills (e.g., Gradle, Git) and subagents, the model rarely invokes them organically without strict explicit prompts.
   - *Community reaction:* Reflects gaps in the model's autonomous tool discovery and routing capabilities.

5. **[#22267: Browser Agent ignores settings.json overrides (e.g., maxTurns)](https://github.com/google-gemini/gemini-cli/issues/22267)**
   - *Why it matters:* Configuration flexibility is broken for specialized agents when global or project `settings.json` limits are ignored by the browser manager.
   - *Community reaction:* Highlights configuration regressions in subagent subsystems.

6. **[#24246: Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**
   - *Why it matters:* Scaling up extensions or registered tools pushes the payload past API thresholds, resulting in a 400 Bad Request error.
   - *Community reaction:* Signals an urgent need for dynamic tool scope limiting/pruning.

7. **[#21983: browser subagent fails in wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**
   - *Why it matters:* Linux desktop developers running Wayland face immediate execution failures when triggering browser automation workflows.
   - *Community reaction:* Important platform compatibility bug for Linux environments.

8. **[#22672: Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)**
   - *Why it matters:* Models occasionally reach for destructive commands like `git reset --force` or unsafe database mutations instead of safer alternatives.
   - *Community reaction:* Focuses on guardrails and safety guidelines for automated shell/git execution.

9. **[#20079: ~/.gemini/agents/filename.md is not recognized as an agent if filename.md is a symlink](https://github.com/google-gemini/gemini-cli/issues/20079)**
   - *Why it matters:* Prevents modular or dotfile-managed subagent setups where users rely on symlinks.
   - *Community reaction:* Friction point for advanced developers customizing their global agent directories.

10. **[#22186: get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**
    - *Why it matters:* Custom output hooks crash the CLI entirely right as tasks are concluding their user summaries.
    - *Community reaction:* P1 bug causing hard crashes during standard output serialization.

---

## Key PR Progress
1. **[#30283: fix(cli): skip system MCP servers with insecure command permissions](https://github.com/google-gemini/gemini-cli/pull/30283)**
   - Enforces strict ownership and write-permission checks on local MCP server scripts specified in system configurations.
2. **[#30289: fix(cli): disclose canonical link path and default consent prompt to no](https://github.com/google-gemini/gemini-cli/pull/30289)**
   - Resolves target extension paths to canonical filesystem locations and defaults non-interactive consent prompts safely.
3. **[#30282: refactor(core): use re2js for linear-time policy argsPattern evaluation](https://github.com/google-gemini/gemini-cli/pull/30282)**
   - Replaces standard regex engines with `re2js` via a `SafeRegExp` wrapper to guarantee linear-time evaluation for security policies and prevent ReDoS vulnerabilities.
4. **[#30281: fix(core): honor configured fetch timeouts on Node 26](https://github.com/google-gemini/gemini-cli/pull/30281)**
   - Upgrades Undici to align global dispatchers with Node 26's native fetch implementation.
5. **[#30279: fix(core): preserve trimmed function-call name in history to prevent 400 INVALID_ARGUMENT](https://github.com/google-gemini/gemini-cli/pull/30279)**
   - Prevents API 400 errors caused by models generating function calls with accidental leading or trailing whitespace.
6. **[#30277: fix(sandbox): improve permission denial detection and unsupported environment handling](https://github.com/google-gemini/gemini-cli/pull/30277)**
   - Hardens POSIX sandbox permission detection and fallback behaviors across containerized environments.
7. **[#30266: fix(core,cli): scope foreground retry status to active main prompt and current model policy](https://github.com/google-gemini/gemini-cli/pull/30266)**
   - Eliminates UI clutter by ensuring loading indicators and retries ignore background utility/subagent loops.
8. **[#30273: fix(core): unify exit codes mapping and fatal error hierarchy](https://github.com/google-gemini/gemini-cli/pull/30273)**
   - Centralizes CLI process exit codes and unifies fatal error classifications across the core package.
9. **[#30210: fix(core): stop WebFetch fallback work after cancellation](https://github.com/google-gemini/gemini-cli/pull/30210)**
   - Improves cancellation token handling to abort redundant fallback URL fetching if an operation is aborted.
10. **[#30259: fix(cli): restore workspace directories only after resumeChat succeeds](https://github.com/google-gemini/gemini-cli/pull/30259)**
    - Defers workspace context modifications until session resumption successfully verifies, preventing broken session states.

---

## Feature Request Trends
- **AST-Aware Code Exploration:** Strong demand for replacing line-based code reads with AST-aware tools (like `ast-grep` or custom parsers) to optimize token windows and precision.
- **Persistent & Structured Task Tracking:** Moving away from in-context volatile memory (`WriteToDo`) toward persistent file-based tracking.
- **Subagent Transparency & Collaboration:** Requests to expose subagent trajectories via `/chat share`, allow parallel subagent execution, and improve bug reporting to include subagent execution contexts.
- **Dynamic Tool Scope Control:** Smarter management of enabled tool definitions to prevent hitting API token limits or `400 Bad Request` constraints when large toolsets are active.

---

## Developer Pain Points
- **Silent Subagent Failures:** Frustration when subagents hit turn limits or encounter environment errors (e.g., Wayland display issues or hanging loops) but report false-positive successes.
- **Configuration Disconnects:** Issues where global or project-level `settings.json` overrides (such as `maxTurns`) are dropped by specific execution managers like the Browser Agent.
- **Unintended Destructive Actions:** Managing the model's tendency to execute dangerous shell operations (`git reset --force`, random temp scripts) without localized workspace restrictions or strict policy guards.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-11-14

## 1. Today's Highlights
Recent development on `github/copilot-cli` centers heavily on refining enterprise permission rules, stabilizing cross-platform sandboxing (macOS/Windows), and addressing authentication token cache issues with MCP servers. Versions `v1.0.111` through `v1.0.112-0` introduce powerful enterprise controls like regex permission matching and session-creation flags for remote clients. Meanwhile, community discussions highlight ongoing friction points around system-level sandboxing regressions, clipboard/paste blocks in native credential brokers, and strict path-parsing logic.

---

## 2. Releases
Releases `v1.0.111` to `v1.0.112-0` bring crucial policy enhancements and stability fixes:

*   **[v1.0.112](https://github.com/github/copilot-cli/releases/tag/v1.0.112)**: Cleans up `/compact` error presentation by stripping internal host-rethrow prefixes and preserves pasted prompt text if submitted while account policies are still loading.
*   **[v1.0.112-0](https://github.com/github/copilot-cli/releases/tag/v1.0.112-0)**: Improves best-effort startup compatibility on macOS Ventura (13.5+), defaults to each model's recommended context window, and updates `/chronicle cost-tips` to cover Copilot App sessions.
*   **[v1.0.111](https://github.com/github/copilot-cli/releases/tag/v1.0.111) & [v1.0.111-0](https://github.com/github/copilot-cli/releases/tag/v1.0.111-0)**: Adds regular expression support to enterprise-managed Shell, Bash, and PowerShell permission rules; introduces `--host-allow-session-creation` for remote client session spawning; and refreshes `/usage` premium request tracking.

---

## 3. Hot Issues
The following 10 noteworthy issues highlight major community concerns, platform bugs, and behavioral regressions:

1.  **[Issue #4802: PRU Quota Wiped Out, likely related to Assisted Permissions](https://github.com/github/copilot-cli/issues/4802)**  
    *Why it matters:* Users report unexpected exhaustion of legacy Request-based PRU allowances tied to assisted permissions mode.  
    *Reaction:* High concern among Pro subscribers tracking fixed quota limits.
2.  **[Issue #5236: Windows: Entra broker token cache stays 0 bytes after MCP sign-in](https://github.com/github/copilot-cli/issues/5236)**  
    *Why it matters:* Microsoft Entra account broker token caches fail to persist properly on Windows, forcing repetitive sign-in prompts across fresh processes.  
    *Reaction:* Frustrating UX blocker for enterprise Windows users leveraging HTTP MCP servers.
3.  **[Issue #2374: Autopilot enters an infinite loop](https://github.com/github/copilot-cli/issues/2374)**  
    *Why it matters:* Autonomous task execution (`/plan` transitioning into Autopilot) occasionally gets trapped in recursive loops, burning tokens and compute.  
    *Reaction:* Underscores safety and control limits needed during hands-off agent execution.
4.  **[Issue #5323: Add setting to disable agent checkpoint refs (refs/agents/*)](https://github.com/github/copilot-cli/issues/5323)**  
    *Why it matters:* Every agent turn clutters user repositories with hidden git commits authored under the user's personal identity.  
    *Reaction:* Active requests for a configuration toggle to suppress workspace git pollution.
5.  **[Issue #5066: Assisted permissions regression](https://github.com/github/copilot-cli/issues/5066)**  
    *Why it matters:* Safe, read-only shell queries (like finding files) suddenly trigger excessive manual approval prompts.  
    *Reaction:* Disrupts developer flow by degrading the "assisted" intelligence level.
6.  **[Issue #3339: Quoted strings starting with / misinterpreted as paths](https://github.com/github/copilot-cli/issues/3339)**  
    *Why it matters:* The path-access scanner misclassifies literal argument strings as intended file reads/writes, triggering false-positive security checks.  
    *Reaction:* Highlights overly aggressive regex/path heuristics in tool-call validation.
7.  **[Issue #5404: Windows: launching copilot in git repo from interactive pwsh kills parent pwsh.exe](https://github.com/github/copilot-cli/issues/5404)**  
    *Why it matters:* A critical crash terminates the parent PowerShell session entirely (along with connected background processes like `ssh-agent`) when starting Copilot inside a repository.  
    *Reaction:* Severe terminal stability issue on Windows platforms.
8.  **[Issue #5390: macOS sandbox allowLocalNetwork: true generates hostLoopback: deny in proxy mode](https://github.com/github/copilot-cli/issues/5390)**  
    *Why it matters:* Blocks local development tools (like Gradle) from communicating with their local daemon inside macOS sandboxes.  
    *Reaction:* Stalls local builds when strict network sandboxing is enabled.
9.  **[Issue #5085: Rust rewrite regression on macOS: all native HTTPS requests fail with "bad certificate format"](https://github.com/github/copilot-cli/issues/5085)**  
    *Why it matters:* Advanced sandboxing setups (e.g., `nono`) blocking `com.apple.SecurityServer` break API connectivity entirely due to Keychain reliance.  
    *Reaction:* Impacts developers hardening their local environments against credential leaks.
10. **[Issue #5452: MCP OAuth for Entra servers forces native broker window that blocks paste](https://github.com/github/copilot-cli/issues/5452)**  
    *Why it matters:* The OneAuth native broker window prevents users from pasting complex passwords or tokens, with no fallback browser option.  
    *Reaction:* Hard blocker for authentication workflows requiring credential managers.

---

## 4. Key PR Progress
*(Note: Active developer code contributions over the last 24 hours focused heavily on container hygiene and dependency maintenance rather than core architectural features).*

1.  **[PR #5454: bump debian from `f6b08b0` to `a72b443` in /container](https://github.com/github/copilot-cli/pull/5454)**  
    *Description:* Automated dependency update by Dependabot keeping the container base image up to date for security patches.
2.  **[PR #5453: bump docker/login-action from 4.7.0 to 4.8.0](https://github.com/github/copilot-cli/pull/5453)**  
    *Description:* Upgrades GitHub Actions workflow dependencies for Docker logins to leverage recent upstream improvements.

---

## 5. Feature Request Trends
The community's requests point toward three distinct architectural directions:
*   **Granular Sandboxing & Permission Policies:** Enterprise administrators and power users want precise controls (e.g., scopes for YOLO mode, exact Mach/XPC lookup allowlists on macOS, and fine-grained Git credential overrides inside sandboxes).
*   **Repository Cleanliness:** Developers are pushing back against automated metadata pollution (such as forced agent checkpoint git refs and unsuppressed instruction file duplication).
*   **Alternative Authentication Paths:** Strong demand for browser-based or paste-friendly authentication fallbacks when native desktop account brokers fail or block input interactions in headless/sandboxed environments.

---

## 6. Developer Pain Points
*   **Platform-Specific Stability:** Windows terminal crashes (`pwsh.exe` termination) and macOS sandbox communication blockages (Gradle daemons, SecurityServer Mach lookups) severely disrupt daily workflows.
*   **Overzealous Security & Parsing:** False positives in path scanners (misinterpreting quoted text as filesystem edits) and over-prompting in assisted permissions slow down routine development tasks.
*   **Authentication & Credential Friction:** Issues surrounding empty token caches, rigid OAuth flows, and inability to paste credentials into native modal brokers create major friction points for enterprise identity integrations (Entra/Azure DevOps).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest: 2026-11-14

## 1. Today's Highlights
OpenCode v2.3.0 has officially dropped, introducing asynchronous subagents that now run in the background, allowing users to maintain productivity in the parent session while concurrent tasks execute. The ecosystem is currently seeing a surge in stabilization efforts, with significant community focus on resolving free-tier access issues and addressing stability bugs introduced in the v2.3.0 transition.

## 2. Releases
*   **[v2.3.0](https://github.com/anomalyco/opencode/pull/63382):** Key architectural update enabling **background subagents**. Subagents now operate concurrently, returning control to the parent session immediately and reporting status upon becoming idle.

## 3. Hot Issues
1.  **[#59387](https://github.com/anomalyco/opencode/issues/59387) Free Tier Issues:** The central hub for all free-tier usage reporting. With 366 comments, it is the primary pain point for users hitting false-positive limits.
2.  **[#52941](https://github.com/anomalyco/opencode/issues/52941) Stale File Contents:** Desktop app fails to reflect file tree updates after agent edits. Critical for developer trust in UI/UX.
3.  **[#63216](https://github.com/anomalyco/opencode/issues/63216) Rogue Actions:** High-severity report of an agent ignoring explicit "STOP" commands. Under active triaging.
4.  **[#52154](https://github.com/anomalyco/opencode/issues/52154) Session History Isolation:** Users are frustrated by the shared history buffer across multiple sessions when using keyboard navigation.
5.  **[#63778](https://github.com/anomalyco/opencode/issues/63778) Subagent Function Call Failures:** A critical regression in v2.3.0 where subagents fail on first model call due to account-level function lookup errors.
6.  **[#63817](https://github.com/anomalyco/opencode/issues/63817) Zombie Shell Processes:** Shell commands on Linux now leave orphan processes under the `opencode-pty` daemon, a performance regression in v2.3.0.
7.  **[#63218](https://github.com/anomalyco/opencode/issues/63218) Database Wipe:** A catastrophic issue where authentication failures trigger a database rebuild, resulting in total loss of local session history.
8.  **[#63847](https://github.com/anomalyco/opencode/issues/63847) MCP Process Leaks:** Reloading config triggers new MCP processes without killing old ones, leading to memory/resource exhaustion in WSL environments.
9.  **[#63857](https://github.com/anomalyco/opencode/issues/63857) Bedrock/GPT-6 Error:** "Invalid encrypted view" errors are causing session failures, with retry logic currently exacerbating the problem.
10. **[#63113](https://github.com/anomalyco/opencode/issues/63113) Compaction Loops:** A critical bug causing the client to enter an infinite compaction loop, even on blank sessions.

## 4. Key PR Progress
1.  **[#63872](https://github.com/anomalyco/opencode/pull/63872):** Increases image budget for `claude-agent` to improve handling of image-heavy tasks.
2.  **[#57731](https://github.com/anomalyco/opencode/pull/57731):** Adds European Portuguese (pt-PT) localization.
3.  **[#58846](https://github.com/anomalyco/opencode/pull/58846):** Fixes lingering legacy V1 sessions for users who completed the V2 migration.
4.  **[#63873](https://github.com/anomalyco/opencode/pull/63873):** Optimization for Anthropic cache lookups by merging catch-up text into unified blocks.
5.  **[#63866](https://github.com/anomalyco/opencode/pull/63866):** Adds accessibility "skip-to-content" link to the shell.
6.  **[#63865](https://github.com/anomalyco/opencode/pull/63865):** Hides decorative UI elements from screen readers to improve accessibility.
7.  **[#63852](https://github.com/anomalyco/opencode/pull/63852):** Forces renderer accessibility tree enablement to improve screen reader reliability.
8.  **[#58542](https://github.com/anomalyco/opencode/pull/58542):** Adds `Cmd+X` (Cut) functionality for prompts in the TUI.
9.  **[#63851](https://github.com/anomalyco/opencode/pull/63851):** Continues accessibility improvements by adding ARIA names to previously unnamed UI controls.
10. **[#55208](https://github.com/anomalyco/opencode/pull/55208):** Fixes compaction regression to prevent checkpoint text loss during request hooks.

## 5. Feature Request Trends
*   **Control/Lifecycle Management:** High demand for granular control over agent execution, specifically requested **Suspend/Resume** ([#27511](https://github.com/anomalyco/opencode/issues/27511)) and explicit **Rate-limit awareness** to pause/resume tasks ([#43126](https://github.com/anomalyco/opencode/issues/43126)).
*   **Infrastructure Flexibility:** Continued interest in **Custom Proxy configuration** ([#24981](https://github.com/anomalyco/opencode/issues/24981)) and UI customizability such as **resizable content width** ([#53382](https://github.com/anomalyco/opencode/issues/53382)).

## 6. Developer Pain Points
*   **Version Regression:** Users are experiencing significant stability drops moving from v2.2.x to v2.3.0, specifically regarding background service orphans and process management.
*   **Data Integrity:** Fear of data loss due to local database schema migrations and migration failures is surfacing as a top concern for power users.
*   **Plugin Management:** Difficulties with cache invalidation (plugins not updating to `@latest` versions) are forcing developers into manual version pinning.

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