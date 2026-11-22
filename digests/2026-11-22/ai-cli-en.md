# AI CLI Tools Community Digest 2026-11-22

> Generated: 2026-11-21 23:59 UTC | Tools covered: 9

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

# AI CLI Tools Ecosystem Analysis: Weekly Cross-Tool Comparison
**Date:** 2026-11-22
**Scope:** Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code CLI, OpenCode, Pi, Qwen Code, DeepSeek TUI

## 1. Ecosystem Overview
The AI CLI tool ecosystem in late 2026 is characterized by a critical shift from basic code generation to **autonomous agent orchestration and reliability engineering**. The landscape is bifurcated: Google’s Gemini CLI and GitHub’s Copilot CLI are aggressively tackling the complexities of sub-agent architectures, security sandboxing, and enterprise-grade stability, while independent projects like OpenCode are refining developer experience (TUI) and provider flexibility. A defining theme across all active communities is the struggle to manage "silent failures" in long-running agent sessions, with specific attention to memory leaks, hanging sub-agents, and strict API limit constraints. Furthermore, there is a visible industry move toward **AST-aware code processing** to optimize token efficiency and **structured state persistence** to overcome the limitations of in-context memory.

## 2. Activity Comparison

| Tool | Status | Issues / Activity Level | Key PRs / Changes | Release Status |
| :--- | :--- | :--- | :--- | :--- |
| **Gemini CLI** | High Activity | 10 Hot Issues (High P1 focus) | 10 Key PRs (Security, Windows fixes, AST) | `v0.71.0-nightly.20261121` |
| **GitHub Copilot CLI** | High Activity | 10 Hot Issues (UX & Security) | 3 Key PRs (Install, Docs, Permissions) | `v1.0.115-4` to `v1.0.115-6` |
| **OpenCode** | High Activity | 10 Hot Issues (Stability & TUI) | 10 Key PRs (MCP Events, Widgets, Provider) | No new release (Last 24h) |
| **Claude Code** | N/A | ⚠️ Data Unavailable | N/A | N/A |
| **OpenAI Codex** | N/A | ⚠️ Data Unavailable | N/A | N/A |
| **Kimi Code CLI**| Low Activity | No activity (24h) | N/A | N/A |
| **Others** | N/A | N/A | N/A | N/A |

*Note: Claude Code, OpenAI Codex, Pi, Qwen, and DeepSeek TUI data was unavailable for this digest cycle. Kimi Code showed no activity.*

## 3. Shared Feature Directions

The following requirements appear across multiple tool communities, indicating industry-wide convergence:

*   **Sub-Agent Reliability & Lifecycle Management:**
    *   **Gemini CLI:** Issues with sub-agents hanging (#21409) or falsely reporting success after hitting turn limits (#22323).
    *   **Copilot CLI:** Nested sub-agents failing multi-turn constraints (#5543).
    *   **OpenCode:** Inconsistent sub-agent behavior and plan mode safety issues (#53955).
    *   *Consensus:* There is a collective need for robust state management, clear termination signals, and safe interruption mechanisms for delegated tasks.
*   **Security Sandboxing & Destructive Command Prevention:**
    *   **Gemini CLI:** Enhancing shell heuristics to catch distributed flags (e.g., `rm -r -f`) (#30171) and respecting YOLO mode taint checks (#30268).
    *   **Copilot CLI:** Critical data loss from empty variable substitution in `rsync` (#5541) and complex permission UX (#5539).
    *   **OpenCode:** Security vulnerability in escalation wildcards allowing overly broad "Always allow" permissions (#65467) and permission bypass in TUI (#65248).
    *   *Consensus:* Simple string matching for safety is insufficient; tools are moving toward intent-based detection, stricter sandboxing, and clearer user-level permission whitelisting.
*   **Token Efficiency & AST-Aware Processing:**
    *   **Gemini CLI:** Strong push for AST-aware file reads to reduce token consumption and misaligned reads (#22745).
    *   **Copilot CLI:** (Implicit) Focus on routing and profile management to optimize cost.
    *   *Consensus:* Naive text reading is being replaced by structural parsing to handle large codebases efficiently without exceeding context windows.

## 4. Differentiation Analysis

| Tool | Primary Focus | Target User | Technical Approach & Differentiation |
| :--- | :--- | :--- | :--- |
| **Gemini CLI** | **Core Agent Reliability & Security** | Power Users / Enterprise Devs | Heavily focused on **Windows compatibility** (path resolution, IME) and **AST-integrated tools**. Emphasizes "Zero-Dependency OS Sandboxing" to align with model training data. |
| **GitHub Copilot CLI** | **Enterprise Integration & UX Polish** | Enterprise / GitHub Native Users | Focus on **multi-model switching**, corporate network compatibility (TLS/Schannel fixes), and seamless **MCP interoperability**. Strong focus on disk optimization for long sessions. |
| **OpenCode** | **TUI Experience & Provider Flexibility** | General Developers / Open Source Advocates | Leading in **interactive TUI features** (widgets, persistent tabs) and **provider agnosticism** (Antigravity, dynamic voice models). Focuses on local stability (OOM fixes) and granular tool configuration. |
| **Kimi Code CLI** | N/A | N/A | Inactive in current window. |

*   **Gemini** is differentiating by making the CLI "smarter" about code structure (AST) and OS-level safety.
*   **Copilot** is differentiating by ensuring it works reliably in **corporate environments** (proxy fixes, mobile remote control) and integrating deeply with the GitHub/MCP ecosystem.
*   **OpenCode** is differentiating by providing a **richer, more inspectable interface** (TUI widgets, credit visibility) for developers who want control over provider and tool selection.

## 5. Community Momentum & Maturity

*   **High Momentum / Rapid Iteration:**
    *   **Gemini CLI:** Very high velocity. Nightly builds are frequent, with a mix of core architectural changes (AST, Exit Codes) and granular bugs (Windows paths, IME). The community is actively shaping the direction of sub-agent reliability.
    *   **OpenCode:** High engagement on stability and TUI. The shift to v2 architecture is ongoing, with a large volume of issues related to migration and memory management, indicating a maturing but still unstable core.
*   **Steady / Enterprise-Focused:**
    *   **Copilot CLI:** Activity is focused on "hardening" rather than new features. The rapid patch releases (v1.0.115-4/5/6) suggest a focus on fixing regressions and ensuring enterprise-grade stability. The community is pragmatic, focusing on usability within existing workflows.
*   **Low/No Momentum:**
    *   **Kimi Code CLI:** No activity observed.
    *   **Claude Code / OpenAI Codex:** Data unavailable, but historically these are often centralized efforts rather than highly open community-driven loops, so "community digest" metrics may not reflect their internal development pace.

## 6. Trend Signals

1.  **The End of "Naive" Code Reading:** The Gemini CLI’s emphasis on AST-aware tools signals that **token-cost optimization** is becoming a primary driver for CLI development. Developers are no longer satisfied with dumping entire files into context; they expect structural awareness.
2.  **Security as a First-Class UI Feature:** The shift from simple `allow/deny` prompts to **intent-based safety** (detecting distributed `rm` flags, taint checks in YOLO mode) and **user-level persistent permissions** indicates that security is becoming a major UX differentiator. Users are frustrated by both false positives (blocking legitimate work) and false negatives (wiping disks).
3.  **MCP as the Standard Interoperability Layer:** Copilot CLI and OpenCode are both actively improving **MCP compliance** (task augmentations, event push delivery). This confirms that **Model Context Protocol** is consolidating as the standard for connecting CLIs to external tools and data sources.
4.  **Long-Session Stability is Critical:** Issues across all three active tools regarding **memory leaks (OOM)**, **disk space**, and **silent hangs** highlight that current LLM-based CLIs are not yet resilient for long-running autonomous tasks. The industry is moving toward **stateless session archives** and **persistent task tracking** (outside of context) to mitigate this.
5.  **Cross-Platform Parity is a Bottleneck:** Significant effort (especially in Gemini and Copilot) is being spent on **Windows-specific fixes** (path resolution, TLS Schannel, orphan processes). This suggests that while the core logic is often Unix-centered, **Windows enterprise adoption** is creating a substantial debt burden for CLI developers.

### **Recommendation for Developers**
*   **If you prioritize speed and raw model intelligence:** Look at **Gemini CLI**, as it is aggressively optimizing for the latest models (Gemini 3) and integrating deep code understanding (AST).
*   **If you are in an enterprise environment:** **Copilot CLI** offers the most robust path forward, with specific fixes for corporate networks, TLS filtering, and mobile remote access.
*   **If you value transparency and customization:** **OpenCode** provides the best interface for monitoring session costs, managing providers, and inspecting agent actions via TUI widgets.
*   **Action Item:** Regardless of tool choice, implement **external state management** (e.g., file-based task lists) and **strict sandboxing rules** to mitigate the common risks of hanging sub-agents and destructive command execution.

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

# Gemini CLI Community Digest — 2026-11-22

## 1. Today's Highlights
The Gemini CLI development cycle continues to heavily focus on core agent reliability, subagent execution flow, and security guardrails around automated file and shell operations. Recent nightly builds address edge cases in Windows path resolution and session resumption, while community discussions place a heavy emphasis on refining AST-aware code mapping and optimizing tool scopes to prevent API limits.

---

## 2. Releases
### `v0.71.0-nightly.20261121.geecccfcd5`
- **What's Changed:**
  - Expanded Windows home-relative paths using tildes and backslashes (`~\...`) in `resolvePath` (PR [#30376](https://github.com/google-gemini/gemini-cli/pull/30376)).
  - Updated session resumption to target the most recently active session rather than the most recently started one.

---

## 3. Hot Issues
1. **[Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption (#22323)](https://github.com/google-gemini/gemini-cli/issue/22323)**
   - *Why it matters:* Subagents hitting turn limits falsely report success, masking incomplete analysis.
   - *Community reaction:* High priority (P1) tracking issue with 14 comments and active maintainer attention.
2. **[Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing (#19873)](https://github.com/google-gemini/gemini-cli/issue/19873)**
   - *Why it matters:* Aligns agent workflows with Gemini 3's native training data for POSIX tools (`grep`, `cat`, `sed`, `awk`).
   - *Community reaction:* Broad architectural discussion around safety vs. native execution speed.
3. **[Generalist agent hangs (#21409)](https://github.com/google-gemini/gemini-cli/issue/21409)**
   - *Why it matters:* Delegating basic tasks like folder creation to the generalist subagent can lock the CLI indefinitely.
   - *Community reaction:* Frustrated users (8 👍) report having to manually disable subagent handoffs as a workaround.
4. **[Assess the impact of AST-aware file reads, search, and mapping (#22745)](https://github.com/google-gemini/gemini-cli/issue/22745)**
   - *Why it matters:* Seeks to reduce token consumption and misaligned reads by introducing structure-aware parsing tools.
   - *Community reaction:* Core epic tracking major efficiency improvements for large codebases.
5. **[Gemini does not use skills and sub-agents enough (#21968)](https://github.com/google-gemini/gemini-cli/issue/21968)**
   - *Why it matters:* Custom skills (like gradle or git helpers) are frequently ignored unless explicitly invoked by the prompt.
   - *Community reaction:* Highlights prompt engineering hurdles in autonomous subagent invocation.
6. **[Browser Agent ignores settings.json overrides (e.g., maxTurns) (#22267)](https://github.com/google-gemini/gemini-cli/issue/22267)**
   - *Why it matters:* Configuration boundaries set by developers are silently dropped by browser automation modules.
   - *Community reaction:* Points to inconsistencies in global/project-level config merging across agent types.
7. **[Gemini CLI encounters 400 error with > 128 tools (#24246)](https://github.com/google-gemini/gemini-cli/issue/24246)**
   - *Why it matters:* Exceeding provider tool limits causes hard API failures.
   - *Community reaction:* Amplifies the need for dynamic tool scoping and filtering per context.
8. **[Model frequently creates tmp scripts in random spots (#23571)](https://github.com/google-gemini/gemini-cli/issue/23571)**
   - *Why it matters:* Clutters repositories with temporary files during complex refactoring tasks.
   - *Community reaction:* Drives requests for cleaner sandboxed workspaces or designated temp directories.
9. **[Agent should stop/discourage destructive behavior (#22672)](https://github.com/google-gemini/gemini-cli/issue/22672)**
   - *Why it matters:* Models occasionally invoke destructive git commands (`git reset --force`) instead of safer recovery alternatives.
   - *Community reaction:* Critical safety concern for automated repository workflows.
10. **[Get-shit-done output hook causes crash (#22186)](https://github.com/google-gemini/gemini-cli/issue/22186)**
    - *Why it matters:* Terminating execution hooks crash the entire CLI process right as summaries are printed.
    - *Community reaction:* High-priority bug impacting end-of-run UX.

---

## 4. Key PR Progress
1. **[fix(sandbox): improve permission denial detection and unsupported environment handling (#30277)](https://github.com/google-gemini/gemini-cli/pull/30277)** — Refines sandbox error detection across restricted environments.
2. **[fix(core): unify exit codes mapping and fatal error hierarchy (#30273)](https://github.com/google-gemini/gemini-cli/pull/30273)** — Centralizes CLI process exit codes to eliminate hardcoded numeric literals.
3. **[fix(core): honor configured fetch timeouts on Node 26 (#30281)](https://github.com/google-gemini/gemini-cli/pull/30281)** — Upgrades Undici to fix dispatcher symbol mapping under Node 26 built-in fetch.
4. **[fix(cli): expand Windows tilde-backslash paths in resolvePath (#30308)](https://github.com/google-gemini/gemini-cli/pull/30308)** — Fixes home-relative path resolution for policies and extensions on Windows.
5. **[fix(core): stop body timeouts from killing and replaying long model turns (#30174)](https://github.com/google-gemini/gemini-cli/pull/30174)** — Prevents Undici timeouts during extended thinking periods or large file generation.
6. **[fix(cli): submit full text when IME commit and Enter arrive in the same tick (#30178)](https://github.com/google-gemini/gemini-cli/pull/30178)** — Resolves dropped syllables in Hangul/IME text inputs.
7. **[fix(core): flag recursive and forced rm regardless of flag position (#30171)](https://github.com/google-gemini/gemini-cli/pull/30171)** — Enhances shell security heuristics to catch distributed flags like `rm -r -f`.
8. **[fix(cli): keep pasted @ text and fuzzy @ matches from attaching secrets (#30169)](https://github.com/google-gemini/gemini-cli/pull/30169)** — Default `escapePastedAtSymbols` to true to prevent accidental secret leakage via pasted terminal output.
9. **[fix(core): apply local subagents' generateContentConfig for every model (#30175)](https://github.com/google-gemini/gemini-cli/pull/30175)** — Ensures custom temperatures and thinking configurations apply uniformly across all model aliases.
10. **[fix(core): respect active YOLO mode in taint and build file checks (#30268)](https://github.com/google-gemini/gemini-cli/pull/30268)** — Prevents unwanted confirmation prompts and policy violations during headless/YOLO execution runs.

---

## 5. Feature Request Trends
- **AST-Aware Code Discovery:** Strong push toward integrating structural tools (`tilth`, `glyph`, `ast-grep`) to optimize token usage and code boundaries over traditional naive text reads.
- **Persistent Task Tracking:** Moving away from in-context "WriteToDo" workflows toward structured, file-based CRUD task trackers to avoid context rot and memory loss between sessions.
- **Enhanced Subagent Interoperability:** Requests for shared memory, parallel subagent coordination, and improved cross-agent debugging via telemetry and shared chat transcripts.
- **Self-Aware Agents:** Equipping the CLI with precise self-knowledge regarding its own configuration flags, hotkeys, and diagnostic mechanics to improve troubleshooting efficiency.

---

## 6. Developer Pain Points
- **Hanging Subagents:** Developers frequently hit issues where generalist or browser subagents hang indefinitely without throwing clear exceptions, forcing manual cancellations.
- **Workspace Pollution:** Models writing temporary scripts across random subdirectories during multi-step tasks, creating friction for clean git commits.
- **Tool Count Constraints:** Hitting strict API limits (HTTP 400 errors) when too many tools or extensions are loaded into scope concurrently.
- **Aggressive Shell Defaults:** Overly restrictive or misclassified shell heuristics (such as sandbox or path policies) interrupting legitimate development workflows outside trusted directories.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-11-22

## 1. Today's Highlights
Recent updates to the GitHub Copilot CLI focus on stability improvements across multi-model switching, disk optimization for long-running local sessions, and refined Unix/Windows process handling. Meanwhile, community discussions center around critical edge cases, including networking anomalies under DNS fake-IP configurations, permission prompt resets interrupting active user prompts, and multi-turn subagent execution constraints.

---

## 2. Releases
The `github/copilot-cli` repository saw three rapid patch iterations (`v1.0.115-4`, `v1.0.115-5`, and `v1.0.115-6`):
- **Performance & Storage:** Local sessions now take up less disk space and resume faster (`v1.0.115-5`).
- **Routing & Profile Management:** Queuing a switch to Copilot Fusion correctly acknowledges the requested profile instead of echoing the old one (`v1.0.115-5`).
- **Plugins & UX Fixes:** Organization-required plugins install faster on temporary policy interruptions without waiting out long retry delays, and `/delegate` now prompts for login instead of failing silently (`v1.0.115-6`). 
- **ACP & Process Cleanups:** Enabled structured clarification questions for supporting ACP editors (`v1.0.115-4`) and cleaned up orphaned child processes from Git and language servers on Windows (`v1.0.115-4`).

---

## 3. Hot Issues
1. **[Issue #5541](https://github.com/github/copilot-cli/issues/5541)** — *Agent irrecoverably wiped a user drive via empty `rsync` variable.* 
   - **Why it matters:** Highlights a severe safety risk where shell command quoting failures in WSL caused an empty variable substitution (`/`), resulting in accidental data loss.
   - **Community Reaction:** High concern over guardrails for destructive file system operations.
2. **[Issue #5544](https://github.com/github/copilot-cli/issues/5544)** — *`web_fetch` still rejects public URLs resolved to Surge Fake-IP on CLI 1.0.114.*
   - **Why it matters:** Developers using proxy tools or enhanced proxy modes (like Surge on macOS) are blocked from fetching documentation via built-in tools due to IP range validation failures.
   - **Community Reaction:** Ongoing friction following previous fixes for similar proxy environment quirks.
3. **[Issue #5550](https://github.com/github/copilot-cli/issues/5550)** — *Built-in GitHub MCP read tools are unavailable to custom agents when `gh` is on `PATH`.*
   - **Why it matters:** Integrations break unexpectedly depending on whether the GitHub CLI executable is globally exposed, impacting custom multi-agent workflows.
   - **Community Reaction:** Highlights setup-dependent environment bugs.
4. **[Issue #5536](https://github.com/github/copilot-cli/issues/5536)** — *Permission prompts reset question dialogs in the CLI.*
   - **Why it matters:** If a background agent triggers a permission request while a user is typing in an interactive dialog box, the input state completely wipes out, forcing users to start over.
   - **Community Reaction:** Frustrating UX bug for multitasking workflows.
5. **[Issue #5468](https://github.com/github/copilot-cli/issues/5468)** — *Remote control fails on GitHub Mobile and github.com (relay connect failed).*
   - **Why it matters:** Prevents developers from interacting with active local Copilot sessions remotely via mobile clients.
   - **Community Reaction:** Limits cross-device continuity.
6. **[Issue #5543](https://github.com/github/copilot-cli/issues/5543)** — *Subagents started by other subagents can't be multi-turn.*
   - **Why it matters:** Background or nested task delegation fails to handle recursive back-and-forth messaging properly, limiting complex autonomous workflows.
   - **Community Reaction:** Points to architectural limitations in multi-agent nesting.
7. **[Issue #5540](https://github.com/github/copilot-cli/issues/5540)** — *Copilot CLI does not send MCP Tasks augmentation for task-required tools.*
   - **Why it matters:** External Model Context Protocol (MCP) servers enforcing mandatory task structures reject tool calls outright because the CLI fails to pass the required payload.
   - **Community Reaction:** Stalls interoperability with strict MCP specs.
8. **[Issue #5546](https://github.com/github/copilot-cli/issues/5546)** — *TLS handshake failure (`api.individual.githubcopilot.com`) on corporate filtered networks.*
   - **Why it matters:** Windows Schannel surfaces fatal TLS alerts (`SEC_E_ILLEGAL_MESSAGE`) behind corporate interception proxies or security filters, locking out enterprise users.
   - **Community Reaction:** Major blocker for enterprise adoption.
9. **[Issue #5539](https://github.com/github/copilot-cli/issues/5539)** — *Complex permission UX for persistent user-level read access.*
   - **Why it matters:** Users want straightforward, global file-read whitelists (e.g., across specific directories) without managing messy, per-repository permission rules.
   - **Community Reaction:** High demand for simplified security overhead.
10. **[Issue #5537](https://github.com/github/copilot-cli/issues/5537)** — *Show AI credits used in the session list.*
    - **Why it matters:** Users have no easy visibility into token/credit consumption without manually opening individual sessions.
    - **Community Reaction:** Popular feature request for cost and usage tracking.

---

## 4. Key PR Progress
1. **[PR #5548](https://github/copilot-cli/pull/5548)** — *install: sort stable releases after their prereleases.* Fixes install script logic where git's version sorting mistakenly treated old prerelease tags as newer than the stable release.
2. **[PR #5310](https://github/copilot-cli/pull/5310)** — *Fix container smoke-test workspace permissions.* Corrects permissions on temporary workspaces created with mode `0700` that blocked runtime user execution (UID 10001).
3. **[PR #1512](https://github/copilot-cli/pull/1512)** — *Updated Copilot CLI default model in readme.* Refreshes core documentation to reflect the updated default model configuration (Sonnet 4.6).

*(Note: Data indicates 3 primary tracked pull requests active around these updates, spanning installation logic fixes, test environment configurations, and documentation alignments.)*

---

## 5. Feature Request Trends
- **Granular Session & Resource Controls:** Developers want deeper session management primitives exposed directly to agents (e.g., `resume_session`, `suspend_session`) alongside sidebar actions and visibility into AIC (AI Credits) consumption.
- **Simplified Global Permissions:** Moving away from repetitive per-repository prompts toward broader, persistent user-level directory whitelisting.
- **Advanced MCP and Agent Capabilities:** Deeper compliance with MCP standards (like task-required augmentations) and robust multi-turn support for nested subagents.

---

## 6. Developer Pain Points
- **UI/UX Disruption:** Interactive prompts crashing or wiping user text input states when interrupted asynchronously by background permission dialogs.
- **Network and Proxy Quirks:** Strict corporate TLS filters on Windows (Schannel) and local fake-IP routing configurations (like Surge DNS) causing hard blocks on standard API connections and web fetches.
- **Environment Conflicts:** Global executable states (such as having `gh` on the system `PATH`) inadvertently breaking internal MCP server routing and tool execution.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest (2026-11-22)

### 1. Today's Highlights
The OpenCode community is currently focused on stabilizing the v2 architecture, with significant activity surrounding memory management, provider connectivity, and TUI refinement. Developers are actively addressing issues related to server crashes under high load and inconsistent subagent behavior, while simultaneously pushing new features like native Google Antigravity support and interactive agent widgets.

---

### 2. Releases
*No new releases in the last 24 hours.*

---

### 3. Hot Issues
1. **[#59387] Free tier issues:** The primary tracking issue for usage limit errors. With 405 comments, it remains the community's top concern regarding platform access.
2. **[#53955] Agent editing in Plan mode:** Users report agents performing unauthorized destructive edits, challenging the "safety-first" promise of the planner.
3. **[#65371] Server OOM (SIGABRT):** High-priority stability bug where session warming causes V8 heap exhaustion on Linux servers.
4. **[#65400] V1→V2 migration/caching:** A critical regression where prompt caching is silently dropped when migrating Claude/OpenAI configurations.
5. **[#62319] Provider silent stalls:** Sessions hanging indefinitely due to silent retries on stalled provider endpoints, causing poor UX.
6. **[#65457] TUI persistent session tabs:** A bug causing disabled sessions to reappear after restart, frustrating users who value clean workspaces.
7. **[#65456] TUI Escape key failure:** A regression in v2.3.2 preventing the Escape key from dismissing modals, breaking standard navigation.
8. **[#65248] Interactive TUI permission bypass:** Security/logic concern where `ask` permissions are silently treated as `allow` in the terminal interface.
9. **[#59189] SQLite "disk I/O error" on sleep:** Desktop service hangs on Windows after system resume, requiring manual process restarts.
10. **[#63743] CLI npm upgrade `--force`:** The updater is downloading ~2GB of optional dependencies, causing inefficient resource consumption.

---

### 4. Key PR Progress
1. **[#65261] Agent widgets:** Introduces native JSON-driven interactive widgets for agent sessions.
2. **[#65489] Google Antigravity provider:** Enables formal support for Antigravity CLI connectors and OAuth providers.
3. **[#65494] Code Mode & execute rename:** Refactors internal tool naming to consolidate the execution workflow.
4. **[#65271] MCP Events beta:** Implements push delivery for the MCP protocol, improving real-time communication.
5. **[#65491] Voice model listing:** Dynamically fetches voice models from `models.dev` instead of hardcoding, easing future deployments.
6. **[#63982] Configurable editing tools:** Adds flexibility to choose between `patch` and `write` tools based on model preferences.
7. **[#65467] Escalation wildcard fix:** Patches a security vulnerability where "Always allow" could inadvertently whitelist broader command patterns.
8. **[#65492] Copilot PDF disable:** Fixes HTTP 400 errors by disabling unsupported PDF inputs for Copilot-routed models.
9. **[#65460] TUI path display:** Improves usability by showing the specific directory context for tool operations.
10. **[#65430/65489] Antigravity implementation:** Multiple PRs (one closed/replaced) demonstrating an active focus on bringing the Google ecosystem into the platform.

---

### 5. Feature Request Trends
*   **Workspace Persistence:** Strong desire for "first-class" work contexts (#35318, #42396) and cross-project utility persistence (#65486).
*   **Granular Control:** Requests for better sandboxing/permission management (#48411) and manual configuration of core tools (#63981).
*   **Lifecycle Management:** Users want "Skill" installation management with version pinning and rollback capabilities (#65485, #65484).

---

### 6. Developer Pain Points
*   **Environment Instability:** Frequent reports of crashes after system sleep or during session warming are damaging trust in the v2 stability.
*   **Opaque Failure Modes:** Recurring themes of "silent" failures—whether it's stalled provider connections, suppressed errors, or ignored permission `ask` requests.
*   **Resource Management:** Significant frustration with the platform’s memory footprint ("RAM usage through the roof") and unnecessary bandwidth consumption during updates.

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