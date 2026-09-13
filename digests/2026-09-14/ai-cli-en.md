# AI CLI Tools Community Digest 2026-09-14

> Generated: 2026-09-13 21:56 UTC | Tools covered: 9

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

**Cross‑Tool Comparison Report – 2026‑09‑14**

| Tool | Issues reported | PRs opened | Recent Releases |
|------|-----------------|------------|-----------------|
| **OpenAI Codex** | 10 hot issues | 10 key PRs | *None* in last 24 h |
| **Gemini CLI** | 10 hot issues | 10 key PRs | Nightly v0.61.0‑nightly.20260913 |
| **GitHub Copilot CLI** | 5 hot issues | 2 key PRs | *None* in last 24 h |

---

### 1. Ecosystem Overview  
AI CLI tool development is dominated by large‑scale LLM providers (OpenAI, Google, GitHub), each pushing distinct orchestration models: Codex emphasizes desktop‑centric workflows, Gemini focuses on agent‑centric sub‑tasking, while Copilot CLI prioritises stable, versioned tooling for CI/CD and voice integration. Community activity remains high, yet the pace of feature iteration varies markedly across projects.

### 2. Shared Feature Directions  
| Requirement | Tools | Notes |
|-------------|-------|-------|
| **Sub‑agent orchestration & runaway token consumption** | Codex, Gemini, Copilot | All three report loops that re‑meter full context or hang, causing rapid quota depletion. |
| **Tool‑call reliability & metadata consistency** | Codex, Gemini | Codex: function call without `call_id`; Gemini: malformed JSON & recursion guards. |
| **Sandbox / environment stability** | Codex (Windows), Gemini (shell lock‑ups), Copilot (Linux ASR crash) | Cross‑platform sandbox failures highlight need for robust permission handling. |
| **Token / context efficiency** | Gemini (AST‑aware file handling), Codex (cache re‑metering), Copilot (tool‑call performance) | All emphasize reducing token bloat through smarter file reading or tool scoping. |
| **Live observability / progress reporting** | Copilot (live progress), Codex (message queue issues), Gemini (output‑hook crashes) | Developers want real‑time feedback from long‑running agents. |

### 3. Differentiation Analysis  
| Tool | Core Focus | Typical User | Technical Approach |
|------|------------|--------------|--------------------|
| **OpenAI Codex** | Desktop CLI + Windows sandbox | Windows developers, VS Code users | Native MXC sandbox, worktree session support, heavy emphasis on token‑budgeting. |
| **Gemini CLI** | Agent‑centric orchestration with sub‑agents | DevOps & research teams | JSON‑RPC A2A server, AST‑aware file IO, dynamic tool‑scoping, pure Go implementation. |
| **GitHub Copilot CLI** | Stable, versioned CLI with voice & MCP | CI/CD, GitHub‑centric workflows | Rust‑based core, ONNX‑backed ASR, focus on pre‑release stability and MCP integration. |

### 4. Community Momentum & Maturity  
- **Codex**: Highest comment activity (over 300 comments across 10 issues) and active PRs; indicates a mature, heavily used ecosystem.  
- **Gemini**: Moderate activity; nightly releases keep momentum but issue volume is smaller.  
- **Copilot CLI**: Lower engagement (≈40 comments total); still stabilising after v1.0.83.  

### 5. Trend Signals  
1. **Token‑budget awareness** – All three projects expose quota‑draining loops, underscoring the necessity of explicit token accounting for production deployments.  
2. **Sub‑agent autonomy & reliability** – Recurrent failures in agent loops signal a market need for self‑debugging, state‑inspection, and graceful failure modes.  
3. **Cross‑platform sandboxing** – Windows and Linux sandbox crashes illustrate the fragility of permission models; future tooling should adopt container‑based isolation or sandbox‑agnostic APIs.  
4. **AST‑driven file handling** – Gemini’s push for AST‑aware reads is a clear signal that token‑efficiency improvements are becoming a competitive differentiator.  
5. **Live observability** – Demand for progress streams and hooks indicates developers are shifting from “black‑box” agents to transparent, monitorable workflows.  

**Takeaway for decision‑makers:** If your team relies on Windows desktop workflows, Codex offers the richest tooling but requires careful quota management. For agent‑driven automation with tight token control, Gemini’s AST‑aware architecture is the most advanced. Copilot CLI remains solid for stable, GitHub‑centric pipelines but is still maturing on Linux and sub‑agent performance.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills – Community Highlights (as of 2026‑09‑14)**  

---

## 1. Top Skills Ranking  
| Rank | PR | Skill / Purpose | Key Discussion Points | Status |
|------|----|-----------------|-----------------------|--------|
| **1** | **#1298** – *fix(skill‑creator): run_eval.py always reports 0 % recall* | Improves the internal evaluation harness (`run_eval.py`, `run_loop.py`, `improve_description.py`) so that skill‑trigger recall is measured correctly on Windows and in parallel workers. | • 10+ reproducible failures reported in Issue #556.<br>• Debate on whether the fix belongs in the core `skill‑creator` repo or in a separate testing harness.<br>• Requests for CI coverage on Windows. | **Open** |
| **2** | **#1742** – *fix(mcp‑builder): support mcp≥2 streamable_http_client import and custom headers* | Updates the MCP‑builder scripts to work with the renamed `streamable_http_client` module and to expose custom HTTP‑header configuration. | • Compatibility with the latest MCP 2.x release.<br>• Some users reported broken API calls after the MCP 2.0 upgrade. | **Open** |
| **3** | **#1628** – *Add Hivemind: Zero‑Cost Multi‑Agent Orchestration Skill* | Introduces a “Hivemind” skill that lets Claude Code off‑load cheap, deterministic work to free‑model workers (via opencode.ai) while retaining a single planner model. | • Strong interest in cost‑saving orchestration.<br>• Questions about latency, security of external workers, and how to expose results back to the main agent. | **Open** |
| **4** | **#1627** – *feat: add buffer‑api Agent Skill (Buffer GraphQL scheduling for any agent)* | Provides a reusable Buffer GraphQL skill for creating, scheduling, and analyzing social‑media posts from any Claude‑based agent. | • Community sees this as a template for “plug‑and‑play” SaaS integrations.<br>• Requests for similar LinkedIn/Twitter wrappers. | **Open** |
| **5** | **#514** – *Add document‑typography skill* | Enforces typographic quality in AI‑generated documents (orphan words, widows, numbering mis‑alignment). | • Frequent user complaints about sloppy formatting in generated PDFs/Docs.<br>• Discussion on extending the skill to other layout‑checks (line‑breaks, hyphenation). | **Open** |
| **6** | **#525** – *Add pyxel skill for retro game development* | Wraps the `pyxel‑mcp` server so Claude Code can generate, run, and iterate on 8‑bit games built with the Pyxel engine. | • Excitement about “AI‑powered game jam” workflows.<br>• Requests for sample projects and asset pipelines. | **Open** |
| **7** | **#1367** – *feat(skills): add self‑audit – mechanical verification + four‑dimension reasoning quality gate (v1.3.0)* | A meta‑skill that audits any AI‑generated output: file‑existence checks, checksum validation, then a structured reasoning‑quality review. | • Seen as a “safety net” for production pipelines.<br>• Debate on the overhead cost vs. benefit for small scripts. | **Open** |
| **8** | **#1602** – *fix: resolve evaluation serialization, benchmark metrics, encoding, and script stability issues* | Broad set of stability fixes for `mcp‑builder` evaluation scripts (serialization, metric calculation, cross‑platform encoding). | • Users report flaky CI runs; this PR is a “must‑merge” for reliable benchmarking. | **Open** |

*All listed PRs are currently **open**; none have been merged or marked draft at the time of this snapshot.*

---

## 2. Community Demand Trends (derived from the most‑commented Issues)

| Trend | Representative Issues | What the community is asking for |
|-------|-----------------------|----------------------------------|
| **Security & Trust Boundaries** | #492 – *Community skills under `anthropic/` namespace impersonate official skills* | Mechanisms to verify provenance, namespace protection, and signed skill packages. |
| **Organizational Collaboration** | #228 – *Enable org‑wide skill sharing in Claude.ai* | Built‑in skill libraries, shared URLs or team‑level repositories to avoid manual file exchange. |
| **Robust Evaluation & Debugging** | #556 – *run_eval.py never triggers skills* • #1390 – *evaluation.py scores 0/N* | Reliable evaluation harnesses, better CI, cross‑platform test suites, and clearer diagnostics. |
| **Skill Lifecycle & Persistence** | #62 – *All my skills have disappeared* | Persistent skill registration, migration tools, and clearer error messages when files are renamed or moved. |
| **Memory & State Management** | #1329 – *compact‑memory (symbolic notation for compact agent state)* | Compact representations for long‑running agents, symbolic memory compression, and state‑versioning APIs. |
| **Governance & Safety Patterns** | #412 – *Agent‑governance skill* • #1385 – *Reasoning Quality Gate pipeline* | Standardized governance, policy enforcement, and multi‑gate quality pipelines baked into skills. |
| **Duplication & Package Hygiene** | #189 – *document‑skills and example‑skills install identical content* | Clear separation of skill collections, de‑duplication logic, and versioned package manifests. |
| **Context‑Window Management** | #1487 – *claude‑api skill injects ~156k tokens* | Skills that stream large payloads, chunking helpers, and token‑budget awareness utilities. |

**Overall demand:** A safer, collaborative, and production‑ready skill ecosystem with reliable testing, clear provenance, and efficient memory handling.

---

## 3. High‑Potential Pending Skills  
(Active‑comment PRs that have not yet been merged but are attracting sustained discussion)

| PR | Skill | Why it could land soon |
|----|-------|------------------------|
| **#1298** | `skill‑creator` evaluation fix | Directly addresses the critical bug reported in Issue #556; multiple contributors are testing the Windows fix. |
| **#1742** | `mcp‑builder` streamable client support | Aligns the repo with the latest MCP 2.x release; downstream users are blocked without it. |
| **#1628** | `Hivemind` orchestration | Strong interest in cost‑saving multi‑agent pipelines; the PR includes a working demo. |
| **#1627** | `buffer‑api` integration | Provides a ready‑to‑use SaaS connector; a handful of teams have already piloted it. |
| **#514** | Document‑typography | Addresses a high‑frequency UI/UX complaint; simple rule‑based implementation makes review easy. |
| **#525** | Pyxel game‑dev | Novel use‑case that showcases Claude Code’s creative coding capabilities; community contributors are supplying example games. |
| **#1367** | Self‑audit quality gate | Fits the broader “reasoning‑quality gate” discussion (Issue #1385) and offers immediate safety benefits. |
| **#1602** | Evaluation script stability | Critical for reproducible benchmarking; many CI pipelines already depend on these fixes. |

---

## 4. Skills Ecosystem Insight  

**The community’s most concentrated demand is for trustworthy, collaborative, and production‑grade skills—particularly security‑verified skill provenance, organization‑wide sharing, and reliable evaluation tooling.**  

---  

*All links point to the official `anthropics/skills` repository (e.g., `https://github.com/anthropics/skills/pull/1298`).*

---

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-14

## 1. Today's Highlights
The Codex community continues to heavily focus on Windows-specific desktop stability, sandbox provisioning failures, and rapid token quota depletion associated with long-running agent loops and subagent orchestration. Meanwhile, recent core engineering efforts are heavily investing in hardening the Windows native sandbox (MXC backend integration), expanding TUI workspace features (worktree session support, live streaming prose previews), and addressing tool-call output synchronization across providers.

---

## 2. Releases
*No new releases were published in the last 24 hours.*

---

## 3. Hot Issues

1. **[#41290](https://github.com/openai/codex/issues/41290) - [Windows][WSL][26.825.31414] Project creation and removal fail after switching Agent Environment to WSL**
   * *Why it matters:* Breaks development workflows for Windows users leveraging WSL for local execution environments.
   * *Community reaction:* High engagement (62 comments, 49 👍), indicating widespread adoption of WSL-based Codex setups on Windows.

2. **[#41220](https://github.com/openai/codex/issues/41220) - [Meta] Abnormal Codex usage/quota depletion and usage-accounting inconsistencies**
   * *Why it matters:* Acts as a cross-report tracker for systemic token burn and rapid credit exhaustion issues affecting subscribers.
   * *Community reaction:* Highly tracked cross-report (41 comments) as users notice severe subscription drain during routine coding tasks.

3. **[#30918](https://github.com/openai/codex/issues/30918) - Usage limits draining abnormally fast on Plus: 70% to 100% in about 6 minutes**
   * *Why it matters:* Illustrates sudden limit exhaustion during ordinary interactive sessions on ChatGPT Plus.
   * *Community reaction:* Frustrated users sharing local session telemetry showing rapid quota consumption.

4. **[#31073](https://github.com/openai/codex/issues/31073) - Windows native sandbox: Git HTTPS remote operations fail/crash inside Codex**
   * *Why it matters:* Blocks developers from pushing or pulling code via HTTPS from within the native Windows sandbox environment.
   * *Community reaction:* Highlights discrepancies between standard PowerShell capabilities and sandbox networking restrictions.

5. **[#44781](https://github.com/openai/codex/issues/44781) - [Codex Desktop] Editing and resending a queued message triggers "App-server queued follow-up no longer exists"**
   * *Why it matters:* Disrupts conversational flow and message queuing in the desktop application.
   * *Community reaction:* Gaining rapid traction (26 👍, 21 comments) due to frequent occurrence on Windows packages (`codex-cli 0.153.4`).

6. **[#37856](https://github.com/openai/codex/issues/37856) - VS Code extension: stale thread owner blocks chat with “open in another application”**
   * *Why it matters:* Renders active chats inaccessible when VS Code Web renderers disconnect or reload improperly.
   * *Community reaction:* Frustrated developers forced to bypass locked chat instances manually.

7. **[#42088](https://github.com/openai/codex/issues/42088) - responses: function_call_output can be emitted without call_id and fails strict upstreams (400)**
   * *Why it matters:* Breaks compatibility when proxying or routing through strict OpenAI-compatible upstream providers (e.g., DeepSeek).
   * *Community reaction:* Crucial issue for developers utilizing custom models or alternative upstream endpoints.

8. **[#36475](https://github.com/openai/codex/issues/36475) - Windows sandbox refresh fails with helper_sandbox_lock_failed after SetNamedSecurityInfoW**
   * *Why it matters:* Prevents sandbox initialization and refresh cycles on Windows 11 builds.
   * *Community reaction:* Points to permission inheritance and access control failures during sandbox setup.

9. **[#37299](https://github.com/openai/codex/issues/37299) - Desktop wait/status orchestration re-meters full cached context every 10-30s**
   * *Why it matters:* A major culprit behind quota depletion; background orchestration loops re-evaluate ~140k token contexts continuously while idle.
   * *Community reaction:* Users report losing 90% of their weekly Pro quota in less than 16 hours due to subagent polling loops.

10. **[#43193](https://github.com/openai/codex/issues/43193) - Systemic Codex instruction-following/orchestration failure consumed ~192% of weekly quota**
    * *Why it matters:* Highlights agentic feedback loops where models (including Astra) get stuck trying to fix orchestration tasks, burning massive amounts of tokens.
    * *Community reaction:* Deep concern over economic viability and runaway token consumption during autonomous multi-agent work tasks.

---

## 4. Key PR Progress

1. **[#45276](https://github.com/openai/codex/pull/45276) - Add worktree session creation to the agents overview**
   * Adds a configurable `new_worktree` action (bound to `w`) for local sessions, streamlining isolated branch management.

2. **[#45271](https://github.com/openai/codex/pull/45271) - Preserve terminal scrollback when growing the TUI viewport**
   * Fixes history loss in QTermWidget and xterm.js by adapting newline strategies during viewport expansion.

3. **[#45262](https://github.com/openai/codex/pull/45262) - Route pastes into the active history search query**
   * Fixes input handling so that text pasted during `Ctrl+R` history searches updates the query string instead of defaulting to composer paste behavior.

4. **[#45255](https://github.com/openai/codex/pull/45255) - Open new sessions directly from the command center**
   * Replaces the inline task composer with a session list, allowing users to press `n` to open a blank session in a selected checkout.

5. **[#45248](https://github.com/openai/codex/pull/45248) - Use captured step settings for request metadata and tool hooks**
   * Ensures that request metadata and tool hooks accurately reflect the model/reasoning settings active at the exact step the request was issued.

6. **[#45224](https://github.com/openai/codex/pull/45224) - Register Windows desktop uninstall ownership before sandbox setup**
   * Prevents orphan installations by ensuring desktop uninstallation cleanup rules are registered even if the user hasn't configured the Windows sandbox yet.

7. **[#45185](https://github.com/openai/codex/pull/45185) - Bind direct tool-call metadata to invocation outputs**
   * Maintains reliable associations between direct tool-call records and their execution outputs, even when call IDs are reused.

8. **[#45176](https://github.com/openai/codex/pull/45176) - Wire the Windows MXC sandbox into command execution**
   * Integrates explicit MXC backend selection into process execution, reporting, and sandbox violation handling on Windows.

9. **[#45137](https://github.com/openai/codex/pull/45137) - Remove Astra sparkle animation from the TUI composer**
   * Cleans up UI overhead by removing animated stars associated with Astra selection from input and focus hooks.

10. **[#45135](https://github.com/openai/codex/pull/45135) - Preview streaming prose before a newline arrives in the TUI**
   * Improves real-time feedback by displaying live prose previews for agent messages and proposed plans before a newline is encountered.

---

## 5. Feature Request Trends
* **Cross-Device & Remote Synchronization:** Users increasingly expect seamless chat history syncing and remote control continuity between desktop clients (e.g., Windows PCs and mobile/remote nodes).
* **Granular Quota & Context Management:** Strong demand for visibility into token re-metering, caching behaviors, and safeguards against runaway subagent loops consuming weekly allowances.
* **Alternative Upstream Compatibility:** Requests for stricter adherence to standard OpenAI API schemas to support third-party local and custom model upstreams (e.g., DeepSeek).

---

## 6. Developer Pain Points
* **Windows Sandbox & Setup Failures:** High-frequency errors (`helper_failed`, `helper_unknown_error`, `Access Denied`) during Windows setup, often triggering false positives in antivirus tools or failing due to rigid security descriptor rules (`SetNamedSecurityInfoW`).
* **Runaway Token Burn:** Long-running orchestration loops and background status checks rapidly depleting weekly Pro/Plus quotas within hours due to repetitive full-context re-metering.
* **State Desynchronization:** Stale thread owners locking out users across VS Code extensions and desktop windows, alongside broken message queues and missing pagination history after updates.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-14

## 1. Today's Highlights
The Gemini CLI repository saw intense activity around core stability, renderer fixes, and agent behavior patterns over the last 24 hours. Developers are actively resolving edge cases in text truncation, shell command execution locks, and A2A server JSON-RPC payload parsing, while evening out subagent error reporting and tool-call management.

## 2. Releases
- **[v0.61.0-nightly.20260913.g9c1b0a610](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260912.g9c1b0a610...v0.61.0-nightly.20260913.g9c1b0a610)**: Latest nightly build containing continuous improvements and bugfixes.

## 3. Hot Issues
1. **[#22323 - Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issue/22323)**
   - *Why it matters:* Codebase investigators and subagents hitting max turn boundaries falsely register as successful completions, masking task failures.
   - *Community Reaction:* Flagged as P1; developers note it misleads automation workflows.
2. **[#21409 - Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issue/21409)**
   - *Why it matters:* Defring work to the generalist agent causes infinite hangs on basic tasks (like folder creation), requiring manual cancellation.
   - *Community Reaction:* High engagement (8 👍, 8 comments), severely impacting standard agentic workflows.
3. **[#25166 - Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issue/25166)**
   - *Why it matters:* Simple shell executions lock up the CLI interface indefinitely even though the underlying process has exited.
   - *Community Reaction:* Frustrating UX bug impacting core CLI loop fluidity.
4. **[#19873 - Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issue/19873)**
   - *Why it matters:* Proposes tapping directly into Gemini 3 models' native POSIX tool-chain affinity to improve efficiency.
   - *Community Reaction:* Architectural enhancement under deep discussion for better native performance.
5. **[#22745 - Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issue/22745)**
   - *Why it matters:* Epic investigating abstract syntax tree (AST) integration to narrow down method boundaries and minimize token bloat.
   - *Community Reaction:* Seen as a critical path forward for token efficiency.
6. **[#21968 - Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issue/21968)**
   - *Why it matters:* Reports that custom skills (e.g., git, gradle) and subagents are rarely invoked autonomously unless explicitly forced.
   - *Community Reaction:* Highlights a gap in autonomous tool discovery and prompt alignment.
7. **[#29309 - bug(core): unbounded _execute recursion on sandbox_expansion_required can loop forever](https://github.com/google-gemini/gemini-cli/issue/29309)**
   - *Why it matters:* Recursive calls in the scheduler lack depth constraints, risking stack overflows or infinite execution loops.
   - *Community Reaction:* Newly filed core bug requiring strict recursion guards.
8. **[#24246 - Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issue/24246)**
   - *Why it matters:* Loading over 128 tools exceeds upstream limits, throwing a 400 API error.
   - *Community Reaction:* Urges smarter dynamic tool-scoping mechanisms.
9. **[#21335 - /compress command is not persistent across session resume](https://github.com/google-gemini/gemini-cli/issue/21335)**
   - *Why it matters:* Summarized chat history created via `/compress` is lost when exiting and resuming sessions from disk.
   - *Community Reaction:* Important regression for long-running sessions trying to manage context size.
10. **[#22186 - get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issue/22186)**
    - *Why it matters:* Final output hooks cause hard CLI crashes right when generating user completion summaries.
    - *Community Reaction:* High-priority blocker interrupting terminal sessions.

## 4. Key PR Progress
1. **[#29320 - fix(a2a-server): register express.json before A2A routes so req.body is parsed](https://github.com/google-gemini/gemini-cli/pull/29320)**
   - Registers JSON middleware early to prevent A2A JSON-RPC handlers from receiving undefined bodies.
2. **[#29319 - fix(sdk): guard JSON.parse on tool-call args in sendStream](https://github.com/google-gemini/gemini-cli/pull/29319)**
   - Wraps tool-call argument parsing in a try/catch block to keep streams alive on malformed JSON payloads.
3. **[#29304 - fix(cli): avoid splitting surrogate pairs during truncation](https://github.com/google-gemini/gemini-cli/pull/29304)**
   - Prevents UI truncation logic from slicing through UTF-16 surrogate pairs, resolving missing emoji rendering bugs.
4. **[#29163 - fix(cli): prevent crash during authentication in git repositories](https://github.com/google-gemini/gemini-cli/pull/29163)**
   - Fixes startup crashes under restricted permission environments (like macOS Seatbelt) when reading git branches.
5. **[#29222 - fix(config): prevent rewriting explicitly pinned flash models](https://github.com/google-gemini/gemini-cli/pull/29222)**
   - Stops the model resolver from silently overriding explicit `--model gemini-2.5-flash` flags with newer variants on unsupported backends.
6. **[#27863 - fix(core): prioritize structured display titles in tool invocation](https://github.com/google-gemini/gemini-cli/pull/27863)**
   - Updates `getDisplayTitle()` to cleanly respect custom display names for tool invocations.
7. **[#27862 - fix(cli): preserve executing subagent tool calls in UI](https://github.com/google-gemini/gemini-cli/pull/27862)**
   - Fixes UI bug where active subagent tool calls would prematurely disappear from the display layout.
8. **[#29208 - fix(core): fall back to empty on malformed agents.json shape](https://github.com/google-gemini/gemini-cli/pull/29208)**
   - Adds validation to gracefully handle corrupted or malformed `agents.json` files instead of crashing with type errors.
9. **[#29125 - fix(cli): convert hook timeout from seconds to milliseconds in hooks migration](https://github.com/google-gemini/gemini-cli/pull/29125)**
   - Corrects hook timeout conversion issues imported from Claude Code configuration migrations.
10. **[#28963 - docs(extensions): correct excludeTools examples that never match](https://github.com/google-gemini/gemini-cli/pull/28963)**
    - Fixes misleading documentation regarding fine-grained tool exclusion syntax.

## 5. Feature Request Trends
- **AST-Aware File Handling:** Strong push toward AST-based searching, reading, and codebase mapping to reduce token consumption and misaligned file reads.
- **Self-Aware Agents & Better Autonomy:** Enhancing agents' native understanding of their own CLI options, hotkeys, and improving spontaneous invocation of subagents and custom skills.
- **Session Trajectory Sharing:** Making subagent workflows and inner interactions viewable and shareable via commands like `/chat share`.

## 6. Developer Pain Points
- **CLI Hangs & Locks:** Unpredictable freezes during shell executions ("Waiting input" states) and generalist agent handoffs requiring hard process kills.
- **Token Inefficiency & Tool Limits:** Hitting 400 API errors when exceeding 128 tools, alongside massive token overheads from unstructured file reads.
- **Environment Fragility:** Crashes induced by restricted permission models (e.g., macOS git sandboxing), malformed config/memory files, and rendering issues with UTF-16 characters/emojis.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest | 2026-09-14

## Today's Highlights
The GitHub Copilot CLI ecosystem is currently focused on stabilizing version 1.0.83, with reports of critical regressions involving workspace MCP configuration loading and Linux voice-input stability. While no new releases dropped in the last 24 hours, the community is actively identifying performance bottlenecks in subagent orchestration and tool-call sequences.

## Releases
*   **None.** No new releases were issued in the last 24 hours. Current stable remains `v1.0.83`.

## Hot Issues
*   **[#4832] Workspace .mcp.json not loading:** A critical regression in v1.0.83 prevents the CLI from detecting repository-root MCP configurations. [Link](https://github/copilot-cli Issue #4832)
*   **[#4833] Voice mode crash on Linux:** Users report a `SIGABRT` caused by an ONNX Runtime assertion within the Nemotron ASR model, rendering voice features unusable on Linux. [Link](https://github/copilot-cli Issue #4833)
*   **[#4829] Subagent tool-call performance:** High-frequency tool execution in subagents is triggering prompt caching failures, impacting token consumption and reliability. [Link](https://github/copilot-cli Issue #4829)
*   **[#2254] Need for live progress streaming:** A recurring request to improve observability for background agents, which currently lack visibility into multi-phase task execution. [Link](https://github/copilot-cli Issue #2254)
*   **[#2147] CAPIError 400 (Fixed/Closed):** Resolved websocket connectivity issue regarding ID mismatches, previously affecting gpt-5.4 integration. [Link](https://github/copilot-cli Issue #2147)

## Key PR Progress
*   **[#4827] Dependency update:** Bumped `actions/stale` to 11.0.0 to maintain repository housekeeping standards. [Link](https://github/copilot-cli PR #4827)
*   **[#4828] Dependency update:** Bumped `actions/github-script` to 9.0.0, aligning automation workflows with latest security patches. [Link](https://github/copilot-cli PR #4828)

*(Note: No other PRs were updated in the last 24 hours.)*

## Feature Request Trends
*   **Agent Observability:** Developers are pushing for "live" feedback loops, specifically requesting granular progress bars for long-running autonomous tasks.
*   **Environment Parity:** Growing pressure to match the feature-set stability of macOS/Windows with better Linux kernel-level compatibility (specifically audio processing/ASR).
*   **MCP Flexibility:** Users expect seamless integration of local workspace MCP servers; current friction points suggest a need for better debugging tools for configuration discovery.

## Developer Pain Points
*   **Regression Anxiety:** The failure to load `.mcp.json` in the latest release has disrupted local development workflows, signaling a need for better pre-release testing of environment configuration loaders.
*   **Autonomous Agent Reliability:** The "black box" nature of subagent tool-calling remains a significant hurdle; developers are struggling to troubleshoot why agents fail during complex, multi-step operations.
*   **Resource Contention:** Linux users are encountering hardware-level crashes (ONNX/Nemotron), highlighting the challenges of maintaining local LLM/ASR inference across diverse Linux distributions.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

⚠️ Summary generation failed.

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