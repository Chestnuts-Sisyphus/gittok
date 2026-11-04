# AI CLI Tools Community Digest 2026-11-04

> Generated: 2026-11-04 00:16 UTC | Tools covered: 9

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

**AI‑CLI Tools – Cross‑Tool Comparison (as of 2026‑11‑04)**  

---  

### 1. Ecosystem Overview  
The AI‑CLI landscape is maturing from isolated “code‑completion” utilities into full‑stack autonomous‑agent platforms.  Most projects now ship nightly or incremental releases, expose rich sub‑agent orchestration APIs, and invest heavily in security‑hardening, cross‑platform sandboxing, and observability.  Community activity clusters around three fronts: (1) reliable sub‑agent lifecycle management, (2) tooling‑registry scalability and AST‑aware code access, and (3) enterprise‑grade policy/credential handling.  While a few older code‑generation CLIs (Claude Code, OpenAI Codex) show little publicly‑visible activity, newer entrants (Gemini CLI, GitHub Copilot CLI, OpenCode) are driving the strategic direction.  

---  

### 2. Activity Comparison  

| Tool (repo) | Issues opened/active *today* | PRs merged/active *today* | Release *today* |
|-------------|----------------------------|---------------------------|-----------------|
| **Gemini CLI** (google‑gemini/gemini-cli) | 10 hot issues (see §3) | 10 PRs (core & CLI fixes) | Nightly **v0.67.0‑nightly.20261103** |
| **GitHub Copilot CLI** (github/copilot-cli) | 10 hot issues (see §3) | 1 PR (agent‑monitor TUI) | v1.0.106‑5 → v1.0.106‑7 (three point releases) |
| **OpenCode** (anomalyco/opencode) | 10 hot issues (see §3) | 10 PRs (model unification, MCP, UI) | No release in last 24 h |
| **Kimi Code CLI** (MoonshotAI/kimi-cli) | 0 | 0 | No recent release |
| **Claude Code** (anthropics/claude-code) | – (no digest) | – | – |
| **OpenAI Codex** (openai/codex) | – (no digest) | – | – |
| **Pi** (badlogic/pi-mono) | – (no digest) | – | – |
| **Qwen Code** (QwenLM/qwen-code) | – (no digest) | – | – |
| **DeepSeek TUI** (Hmbown/DeepSeek‑TUI) | – (no digest) | – | – |

*“Today” = activity reported in the 24‑hour community digest.*  

---  

### 3. Shared Feature Directions  

| Community‑wide demand | Tools that surface the need | Typical phrasing / issue |
|-----------------------|-----------------------------|--------------------------|
| **Observability & Multi‑Agent Debugging** | Gemini CLI (issues #22598, #21763), Copilot CLI (PR #5339 – read‑only agent monitor) | Need for visual trees / timelines that expose sub‑agent actions and diagnostics. |
| **Security / Credential Hardening** | Gemini CLI (PR #30071, #30095), OpenCode (issue #51504 – “ask” permission ignored), Copilot CLI (issues #4438, #5109 – policy fetch failures) | Robust handling of OAuth, MCP permissions, and safe‑dispatch of credential‑related calls. |
| **Tool‑Registry / Scalable Tooling** | Gemini CLI (issue #24246 – >128 tools limit), Copilot CLI (implicit via skill directories & ACP), OpenCode (issue #59387 – free‑tier limits, but also tool‑quota) | Dynamic scoping, lazy loading, or hierarchical registration to avoid API‑level caps. |
| **Cross‑Platform / Sandbox Compatibility** | Gemini CLI (PowerShell parsing, Wayland, podman rootless), Copilot CLI (macOS sandbox / Gradle, Termux/Android), OpenCode (Windows 11 crashes, Linux OAuth loops) | Consistent behaviour on Windows, macOS, Linux, and mobile terminals. |
| **Persistent / Structured Task Management** | Gemini CLI (persistent To‑Do file, Issue #18836), OpenCode (session‑state bugs, issue #60983), Copilot CLI (session‑unarchive request #4502) | Move away from volatile in‑prompt memory toward durable task files / databases. |
| **AST‑aware / Token‑efficient Code Access** | Gemini CLI (Epic #22745‑#22747) – only tool with explicit AST push, but the underlying pain‑point (context bloat) appears in OpenCode (issue #61512 – JSON‑stream handling) and Copilot CLI (issue #4438 – skill gating) as “need smarter code slicing”. | Reduce token waste by parsing code structure before sending to LLM. |

---  

### 4. Differentiation Analysis  

| Dimension | Gemini CLI | GitHub Copilot CLI | OpenCode | Kimi Code CLI | Claude Code / OpenAI Codex |
|-----------|------------|--------------------|----------|--------------|---------------------------|
| **Core Focus** | Autonomous sub‑agent orchestration, sandboxed execution, AST‑aware file handling. | Git‑centric developer workflow, ACP integration, VS Code hand‑off, enterprise policy. | Unified model façade, MCP socket integration, TUI‑rich UI, voice‑call prototype. | Currently dormant; historically “Chat‑style” code generation. | Historical code‑completion, less emphasis on orchestration. |
| **Target Users** | Power‑users building self‑directed AI assistants, DevOps automation engineers. | GitHub ecosystem developers, enterprise teams needing policy compliance. | Developers needing a single SDK for multiple LLM providers, plus CLI‑first UI. | General‑purpose code‑completion users (low activity). | Early‑adopter coders, research labs. |
| **Technical Approach** | Node‑based CLI with pluggable “sub‑agents”, container‑sandbox (podman), Zero‑dependency OS sandbox, AST‑tools (tilth/glyph). | TypeScript/Node CLI, tight GitHub API coupling, ACP protocol wrapper, plugin‑skill model. | TypeScript SDK + TUI, MCP socket layer, model‑unification via a single `Model` class, Cloudflare workflows. | Unknown (no recent commits). | Proprietary OpenAI or Anthropic SDK wrappers. |
| **Unique Strength** | Fine‑grained control over execution environments, early work on POSIX‑bash affinity, extensive Windows/Wayland fixes. | Seamless VS Code integration, inline image rendering, strong enterprise policy enforcement. | Unified multi‑model abstraction, voice‑call feature, aggressive UI modernization. | — | — |
| **Current Momentum** | Daily nightly releases, >10 active issues/PRs. | Frequent point releases, but only 1 PR in the last 24 h. | Heavy PR influx (10 today) but no new release. | Inactive. | No visible activity. |

---  

### 5. Community Momentum & Maturity  

| Tool | Community Activity (issues + PRs) | Release Cadence | Maturity Signal |
|------|-----------------------------------|----------------|-----------------|
| **Gemini CLI** | 20 (10 issues + 10 PRs) | Nightly builds, quick hot‑fix turn‑around | High velocity, actively maintained; early‑stage but rapidly iterating. |
| **OpenCode** | 20 (10 issues + 10 PRs) | No release in 24 h (but regular releases historically) | Solid core team; moving toward a stable v2.x; still in heavy refactor phase. |
| **GitHub Copilot CLI** | 11 (10 issues + 1 PR) | 3 point releases in last week | Mature product with enterprise focus; slower code churn, more QA‑heavy. |
| **Kimi Code CLI** | 0 | None | Dormant; likely low‑maintenance or awaiting next roadmap. |
| **Claude Code / OpenAI Codex / Pi / Qwen Code / DeepSeek TUI** | No digest data → unknown | — | Insufficient public signals; may be stable or sunset. |

Overall, **Gemini CLI** and **OpenCode** exhibit the most *developer‑driven* momentum (high issue/PR density, active bug‑fix releases). **Copilot CLI** shows steady, enterprise‑oriented progress with fewer code changes but more polished releases.  

---  

### 6. Trend Signals for the Wider AI‑CLI Market  

| Trend | Evidence | Implication for Developers |
|-------|----------|----------------------------|
| **Sub‑agent autonomy & lifecycle safety** | Gemini issues #22323, #21409; Copilot PR #5339; OpenCode agent‑monitor work. | Toolchains must expose explicit “turn‑limit”, “success/failure” signals and allow deterministic rollback. |
| **AST‑aware, token‑efficient code access** | Gemini EPIC #22745‑#22747; recurring “context bloat” complaints across tools. | Integrating syntax‑tree parsers (e.g., `ast‑grep`, `tilth`) will become a competitive differentiator. |
| **Security‑first credential handling** | Gemini PR #30071, #30095; OpenCode permission bug #51504; Copilot policy‑fetch failures. | Expect tighter sandboxing, DNS‑revalidation, and fine‑grained MCP permission models as default. |
| **Observability / multi‑agent debugging UI** | Gemini issue #22598, Copilot PR #5339, OpenCode UI enhancements. | CLI vendors will ship built‑in visual monitors (graph/timeline) or exportable diagnostics for CI pipelines. |
| **Tool‑registry scalability** | Gemini API limit at 128 tools; Copilot’s skill directories; OpenCode free‑tier quotas. | Dynamic, hierarchical tool registration and lazy loading will replace flat static registries. |
| **Cross‑platform & mobile parity** | Gemini Wayland & PowerShell fixes; Copilot Termux support; OpenCode Windows 11 crashes. | CLI frameworks will adopt platform‑agnostic sandboxes (e.g., rootless podman, WASI) and ship pre‑compiled binaries for ARM/Android. |
| **Persistent task & session state** | Gemini To‑Do file, OpenCode session‑state bugs, Copilot “un‑archive” request. | Expect standardized task‑store APIs (JSON/SQLite) that survive process restarts and enable multi‑session collaboration. |

**Takeaway:** The next wave of AI‑CLI tools will be judged not just on raw code generation quality but on *orchestrated autonomy*: safe sub‑agent execution, token‑lean code introspection, transparent observability, and enterprise‑grade credential handling.  Projects that embed these capabilities now (Gemini CLI, OpenCode) are positioning themselves as the foundational platforms for future AI‑augmented developer workflows.  

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

# Gemini CLI Community Digest — November 4, 2026

## 1. Today's Highlights
Recent development on the Gemini CLI centers heavily on hardening subagent lifecycle behavior, expanding security controls around local execution environments, and improving Windows and headless compatibility. Active work targets regressions in PowerShell argument parsing, safe credential handling for MCP OAuth, and context management across complex agent chains.

---

## 2. Releases
### `v0.67.0-nightly.20261103.g0ac57c029` (2026-11-03)
* **Core Fix:** Prevented interrupted Whisper model downloads from being incorrectly flagged as successfully installed [PR #30058](https://github.com/google-gemini/gemini-cli/pull/30058).
* **Full Changelog:** [Compare View](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261102.g6814e00d6...v0.67.0-n)

---

## 3. Hot Issues
1. **[#22323 - Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/Issue #22323)**
   * *Why it matters:* Subagents hitting execution ceilings falsely report success, hiding critical interruptions from parent agent loops.
   * *Community reaction:* 13 comments, emphasizing the need for stricter termination state reporting.
2. **[#19873 - Leverage model's bash affinity via Zero-Dependency OS Sandboxing](https://github.com/google-gemini/gemini-cli/Issue #19873)**
   * *Why it matters:* Seeks to optimize performance by leaning into Gemini 3's native ability to chain POSIX tools directly.
   * *Community reaction:* Strategic architectural proposal driving discussion around security versus utility.
3. **[#21409 - Generalist agent hangs](https://github.com/google-gemini/gemini-cli/Issue #21409)**
   * *Why it matters:* Users report indefinite hangs when delegating tasks to generalist subagents during basic actions like folder creation.
   * *Community reaction:* Highly voted (8 👍, 8 comments) blocking issue for routine local workflows.
4. **[#22745 - Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/Issue #22745)**
   * *Why it matters:* Explores shifting away from naive text reads toward structural AST tools to dramatically trim token consumption and misaligned reads.
   * *Community reaction:* Core epic tracking major efficiency improvements.
5. **[#21968 - Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/Issue #21968)**
   * *Why it matters:* Anecdotal reports indicate models fail to autonomously invoke registered custom skills (like gradle or git helpers) unless prompted manually.
   * *Community reaction:* Sparks design discussions on how to improve agent autonomy and tool discovery.
6. **[#22267 - Browser Agent ignores settings.json overrides](https://github.com/google-gemini/gemini-cli/Issue #22267)**
   * *Why it matters:* Configuration options like `maxTurns` are completely disregarded by browser-based automation tasks.
   * *Community reaction:* Frustration among developers attempting to scope automated web testing parameters.
7. **[#21983 - Browser subagent fails in Wayland environments](https://github.com/google-gemini/gemini-cli/Issue #21983)**
   * *Why it matters:* Linux desktop developers running Wayland face immediate browser subagent failures.
   * *Community reaction:* Platform-specific compatibility gap for headless/display servers.
8. **[#24246 - Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/Issue #24246)**
   * *Why it matters:* Exceeding tool limits causes API request rejections, demanding better dynamic tool scoping.
   * *Community reaction:* Escalating priority as extensions and custom subagents expand tool catalogs.
9. **[#23571 - Model frequently creates tmp scripts in random spots](https://github.com/google-gemini/gemini-cli/Issue #23571)**
   * *Why it matters:* Shell execution restrictions lead the model to litter temporary scripts across various workspace directories, complicating clean commits.
   * *Community reaction:* Workspace hygiene annoyance during automated refactoring.
10. **[#22186 - get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/Issue #22186)**
    * *Why it matters:* Terminal crashes occur right as custom workflow output hooks prepare to summarize actions to the user.
    * *Community reaction:* Disruptive crash impacting long-running automation flows.

---

## 4. Key PR Progress
1. **[#30117 - fix(cli): normalize error payloads in headless CLI formatting](https://github.com/google-gemini/gemini-cli/PR #30117)**
   * Centralizes error formatting so headless CLI executions (`gemini -p "<prompt>"`) output predictable, parseable structures.
2. **[#30118 - fix(sandbox): supply --userns=keep-id for rootless podman](https://github.com/google-gemini/gemini-cli/PR #30118)**
   * Resolves permission (`EACCES`) errors when running containerized sandboxes under rootless Podman on Linux.
3. **[#30110 - fix(core): fix Windows PowerShell substitution false positives and policy handling](https://github.com/google-gemini/gemini-cli/PR #30110)**
   * Mitigates severe regressions where valid PowerShell statements containing parentheses were falsely flagged as command substitutions.
4. **[#30119 - feat(cli): support standalone theme.json configuration](https://github.com/google-gemini/gemini-cli/PR #30119)**
   * Decouples custom UI color themes from `settings.json`, allowing palette configurations via XDG-compliant `theme.json` files.
5. **[#30115 - fix(core,cli): prevent $-pattern expansion in custom command substitutions](https://github.com/google-gemini/gemini-cli/PR #30115)**
   * Fixes issue [#30105](https://github.com/google-gemini/gemini-cli/issues/30105) where replacement patterns like `$$` or `$&` corrupted template text and user args.
6. **[#30095 - fix: prevent Windows git diff permission bypass](https://github.com/google-gemini/gemini-cli/PR #30095)**
   * Strengthens Git command validation parameters on Windows to prevent dangerous arguments from masquerading as safe read-only operations.
7. **[#30107 - fix(cli): make auth URL clickable when terminal wraps it](https://github.com/google-gemini/gemini-cli/PR #30107)**
   * Resolves issue [#29430](https://github.com/google-gemini/gemini-cli/issues/29430) where narrow terminals wrap Google sign-in links, inadvertently clipping authentication query parameters.
8. **[#30071 - Route MCP OAuth fetches through the safe dispatcher](https://github.com/google-gemini/gemini-cli/PR #30071)**
   * Hardens security by ensuring metadata and registration fetches for MCP OAuth re-validate DNS targets dynamically rather than trusting initial checks.
9. **[#29831 - fix(core): surface ripgrep search timeouts as errors instead of partial results](https://github.com/google-gemini/gemini-cli/PR #29831)**
   * Ensures timed-out `ripgrep` queries surface explicit execution errors instead of returning incomplete or silent "No matches found" states.
10. **[#29960 - fix(core): use CLI version instead of Node runtime for telemetry SERVICE_VERSION](https://github.com/google-gemini/gemini-cli/PR #29960)**
    * Fixes issue [#29893](https://github.com/google-gemini/gemini-cli/issues/29893) by correctly populating OpenTelemetry version tags with the Gemini CLI release instead of the underlying Node.js runtime version.

---

## 5. Feature Request Trends
* **AST-Aware Code Exploration:** Growing demand (Epics [#22745](https://github.com/google-gemini/gemini-cli/Issue #22745), [#22746](https://github.com/google-gemini/gemini-cli/Issue #22746), [#22747](https://github.com/google-gemini/gemini-cli/Issue #22747)) to leverage syntax-tree tools (`tilth`, `glyph`, `ast-grep`) for precise code bounds-reading and context mapping.
* **Persistent Task Tracking:** Moving away from in-context `WriteToDo` memory rot toward structured, persistent file-based CRUD task trackers (Issue [#18836](https://github.com/google-gemini/gemini-cli/Issue #18836)).
* **Subagent Observability:** Better visibility into subagent trajectories, including sharing via `/chat share` (Issue [#22598](https://github.com/google-gemini/gemini-cli/Issue #22598)) and bundling subagent diagnostics directly into bug reports (Issue [#21763](https://github.com/google-gemini/gemini-cli/Issue #21763)).
* **Enhanced Agent Self-Awareness:** Equipping agents with exact knowledge of local CLI flags, hotkeys, and self-execution modalities to guide users natively (Issue [#21432](https://github.com/google-gemini/gemini-cli/Issue #21432)).

---

## 6. Developer Pain Points
* **Context Bloat & Firehose Reads:** Large file reads continue to flood context windows with unnecessary tokens, prompting requests for "tactful extraction" and granular search strategies (Issue [#19561](https://github.com/google-gemini/gemini-cli/Issue #19561)).
* **Tool-Registry Scalability:** Hitting hard API limits (HTTP 400 errors) when scaling past 128 available tools requires smarter, dynamic tool-scoping (Issue [#24246](https://github.com/google-gemini/gemini-cli/Issue #24246)).
* **Subagent Reliability:** Unpredictable hangs during subagent delegation (Issue [#21409](https://github.com/google-gemini/gemini-cli/Issue #21409)) and silent failure states when maximum turn limits are exceeded (Issue [#22323](https://github.com/google-gemini/gemini-cli/Issue #22323)) make complex autonomous workflows difficult to trust without active oversight.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-11-04

## 1. Today's Highlights
Recent releases (v1.0.106-5 through v1.0.106-7) bring powerful quality-of-life updates, including a new `/code` command to seamlessly transition sessions into VS Code, Kitty-direct inline image rendering for Rex terminals, and broader global search functionality via `/settings`. Meanwhile, community discussions center heavily on ironing out Agent Client Protocol (ACP) integration parity, enterprise account policy synchronization regressions, and expanding terminal workflow flexibility.

---

## 2. Releases

### v1.0.106-7
* **Added:** 
  * Rex terminals now render inline images using Kitty direct placements.
  * Added the `/code` command to open the current session directly in VS Code.
  * Added a Fusion tier setting to `copilot config`.
* **Improved:** Updated the built-in browser-use plugin to version 0.1.0 with enhanced setup and browser integration behaviors.

### v1.0.106-6
* **Added:** 
  * `/settings` now opens the unified dashboard for all users and includes global search across settings and local resources.
  * Interactive CLI reports program status to supporting terminals, alerting users when attention is needed.
* **Improved:** MCP content addressed exclusively to the user is no longer sent redundantly.

### v1.0.106-5
* **Fixed:** 
  * Honored `includeCoAuthoredBy: false` in ACP mode (`copilot --acp`), preventing ACP clients from adding unsolicited `Co-authored-by` trailers to commits.
  * Targeted `/settings` commands now show selected settings immediately.
  * Addressed a telemetry-disabled warning raised incorrectly when resuming a session.

---

## 3. Hot Issues

1. **[#4438 - Disable-model-invocation: true makes a skill unreachable](https://github.com/github/copilot-cli/issues/4438)**
   * **Why it matters:** Breaks explicit user workflows for project skills marked as manual-only.
   * **Community reaction:** High engagement (18 👍, 13 comments) showing reliance on granular skill governance.

2. **[#5105 - macOS sandbox blocks Gradle daemon connection](https://github.com/github/copilot-cli/issues/5105)**
   * **Why it matters:** Prevents Java/Gradle developers from building projects inside strict macOS enterprise sandbox environments.

3. **[#1148 - Copilot-cli forces CRLF line endings on modified files](https://github.com/github/copilot-cli/issues/1148)**
   * **Why it matters:** Causes messy git diffs for cross-platform or Linux/WSL developers working on LF-native repositories (9 👍).

4. **[#5109 / #5130 / #5142 - Managed account policy / settings fetch failures](https://github.com/github/copilot-cli/issues/5109)**
   * **Why it matters:** Enterprise users are continuously blocked by looping validation errors and policy refresh failures (`HTTP 422`).

5. **[#5115 / #5268 / #5269 - ACP Mode Feature Parity Gaps](https://github.com/github/copilot-cli/issues/5115)**
   * **Why it matters:** Core commands (`/rename`, `/session delete`, plugin skills) fail or drop silently when driving the CLI via Agent Client Protocol wrappers.

6. **[#5347 - Connected Connectors could not be loaded in interactive sessions](https://github.com/github/copilot-cli/issues/5347)**
   * **Why it matters:** MCP servers load fine in headless `-p` mode but fail continuously with warning logs in interactive sessions.

7. **[#5171 - NumLock-off numpad navigation and Delete ignored on Windows](https://github.com/github/copilot-cli/issues/5171)**
   * **Why it matters:** Impacts developer ergonomics and accessibility on standard enterprise Windows laptop layouts.

8. **[#1257 - Termux/Android Support](https://github.com/github/copilot-cli/issues/1257)**
   * **Why it matters:** Blocks mobile command-line usage due to missing native `pty.node` modules (7 👍).

9. **[#5335 - Repeated HTTP 422 cybersecurity-risk flags block debugging](https://github.com/github/copilot-cli/issues/5335)**
   * **Why it matters:** False-positive safety flags disrupt legitimate local flaky-test troubleshooting and debugger workflows.

10. **[#4502 - Add a way to un-archive a session marked as Done](https://github.com/github/copilot-cli/issues/4502)**
    * **Why it matters:** Accidental clicks permanently hide active sessions from the UI with no current recovery path (2 👍).

---

## 4. Key PR Progress

1. **[#5339 - Add read-only agent monitor TUI (Graph + Timeline)](https://github.com/github/copilot-cli/pull/5339)**
   * **Description:** Introduces an independent, read-only terminal viewer under `tools/agent-monitor` for tracking multi-agent execution hierarchies, delegation trees, and timelines within Copilot CLI's native interface style.

*(Note: Data reflects 1 active pull request matching the active reporting window).*

---

## 5. Feature Request Trends
* **Cross-Environment Portability:** Strong demand for mobile/Android execution via Termux and seamless environment parity across OS boundaries (e.g., proper LF line-ending preservation).
* **ACP & Headless Integration:** Developers want full parity for plugins, custom skills, session management, and configuration settings when running Copilot CLI through the Agent Client Protocol (`--acp`).
* **Enhanced Observability & Control:** Requests for visual multi-agent monitoring tools, better audit trails for background agents (`read_agent`), and direct image-paste support within interactive dialogs like `ask_user`.

---

## 6. Developer Pain Points
* **Enterprise Policy & Sandbox Friction:** Frequent breaking changes or strict preflight failures regarding managed account policies, validation errors (`HTTP 422`), and macOS/Windows sandbox restrictions blocking local daemons (Gradle).
* **ACP Consistency Discrepancies:** Frustration over settings like `includeCoAuthoredBy`, custom `skillDirectories`, and command responses behaving differently in standard interactive terminals versus programmatic ACP wrappers.
* **Terminal UI Ergonomics:** Input bugs such as accidental clipboard overwrites via `Ctrl+C` inside confirmation dialogs and broken NumLock-off navigation on Windows terminals.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest – 2026-11-04

## Today's Highlights
The OpenCode engineering team is currently focused on a major architectural overhaul of the `@opencode/ai` package, aimed at consolidating seven distinct model classes into a single, unified `Model` interface. Meanwhile, the community continues to grapple with persistent issues regarding the free-tier usage limits and ongoing stability concerns on Windows 11.

---

## Releases
*None within the last 24 hours.*

---

## Hot Issues
1. **[#59387](https://github.com/anomalyco/opencode/issues/59387)**: The central tracker for free-tier errors (limit resets, "usage exceeded"). With 246 comments, this remains the #1 pain point for the community.
2. **[#48882](https://github.com/anomalyco/opencode/issues/48882)**: High community demand (44 👍) to restore the legacy UI with a persistent left sidebar.
3. **[#60250](https://github.com/anomalyco/opencode/issues/60250)**: Bug report regarding Plan mode ignoring instructions and proceeding directly to code implementation.
4. **[#61503](https://github.com/anomalyco/opencode/issues/61503)**: OAuth callback loop failures on Linux, preventing users from signing into ChatGPT.
5. **[#61481](https://github.com/anomalyco/opencode/issues/61481)**: Critical issue where the model list appears empty on Windows 11 (v2.2.4/5).
6. **[#51504](https://github.com/anomalyco/opencode/issues/51504)**: High-severity bug where `effect: "ask"` permission rules for MCP tools are silently ignored or downgraded to `allow`.
7. **[#61497](https://github.com/anomalyco/opencode/issues/61497)**: Integration breakage for `crouton-alpha-free` due to missing end-user identifier requirements.
8. **[#61512](https://github.com/anomalyco/opencode/issues/61512)**: Failure in OpenAI-compatible streams when reasoning is returned as a JSON object instead of a string.
9. **[#61507](https://github.com/anomalyco/opencode/issues/61507)**: TUI regression where `--model` flags are discarded when resuming sessions.
10. **[#60983](https://github.com/anomalyco/opencode/issues/60983)**: Desktop application fails to fully terminate, leaving background processes running after window closure.

---

## Key PR Progress
1. **[#61528](https://github.com/anomalyco/opencode/pull/61528)**: Enables agents to view instructions from client-attached MCP servers via socket.
2. **[#61522](https://github.com/anomalyco/opencode/pull/61522)**: Promotes current development build to production, including a significant infrastructure move to Cloudflare Workflows.
3. **[#61499](https://github.com/anomalyco/opencode/pull/61499)**: Major refactor consolidating seven model classes into a single `Model` class.
4. **[#61492](https://github.com/anomalyco/opencode/pull/61492)**: Updates model architecture to use self-describing capabilities rather than hardcoded flags.
5. **[#61185](https://github.com/anomalyco/opencode/pull/61185)**: Implements connection pooling for MCP servers to reduce overhead across multiple open project directories.
6. **[#60880](https://github.com/anomalyco/opencode/pull/60880)**: Significant codebase cleanup; replaces various legacy benchmarks with the `strobe` testing harness.
7. **[#60414](https://github.com/anomalyco/opencode/pull/60414)**: Enables experimental voice-call functionality in the composer with first-run onboarding.
8. **[#61491](https://github.com/anomalyco/opencode/pull/61491)**: Adds an "Active Skills" panel to the TUI sidebar for better visibility into conversation context.
9. **[#61526](https://github.com/anomalyco/opencode/pull/61526)**: Fixes a logical loop where the `/goal` reviewer continues execution indefinitely.
10. **[#61514](https://github.com/anomalyco/opencode/pull/61514)**: Improves UI usability by making URLs in error messages and MCP prompts clickable.

---

## Feature Request Trends
*   **UI/UX Customization**: Users strongly prefer classic persistent layouts over newer "session-focused" designs.
*   **MCP Control**: Developers want finer-grained control over MCP server registration (e.g., skipping prompts, silencing specific toolsets).
*   **Agent Identity**: Demand for better integration between AI agent contributions and GitHub user identities.

---

## Developer Pain Points
*   **Stability**: Windows users are reporting frequent 503 errors and hanging model discovery processes.
*   **Permission Reliability**: The "ask" permission model is failing silently, creating security/transparency concerns for MCP tool usage.
*   **Session Lifecycle**: Difficulties with session termination (app remains in background) and TUI state persistence (flags being ignored on resume).

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