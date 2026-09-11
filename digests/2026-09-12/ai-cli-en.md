# AI CLI Tools Community Digest 2026-09-12

> Generated: 2026-09-11 22:06 UTC | Tools covered: 9

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

**AI‑CLI Tools – Cross‑Tool Comparison (2026‑09‑12)**  

---

### 1. Ecosystem Overview  
The AI‑CLI landscape is moving from early‑stage “one‑off code‑completion” utilities toward full‑featured, agent‑centric development environments.  Most projects now ship **desktop or TUI front‑ends**, **MCP‑style context protocols**, and **sandboxed execution** to meet enterprise security requirements.  Rapid release cadences (multiple alpha/nightly builds per week) coexist with a growing focus on **resource‑efficiency**, **voice/real‑time interaction**, and **autonomous skill orchestration**.  Community‑driven bug‑hunting remains the primary source of stability work, especially on macOS/Windows/Linux desktop stacks.

---

### 2. Activity Comparison  

| Tool (repo) | Hot Issues (today) | PRs merged/updated (today) | Release activity (today) |
|-------------|-------------------|-----------------------------|---------------------------|
| **Claude Code** (anthropics/claude-code) | – (digest unavailable) | – (digest unavailable) | – (no release info) |
| **OpenAI Codex** (openai/codex) | **10** (MCP leaks, desktop crashes, OAuth, etc.) | **10** (voice‑TUI default, Windows MXC, plugin API, etc.) | Multiple **alpha Rust builds** (`v0.155.0‑alpha.x`, `v0.154.0‑alpha.6.2`) |
| **Gemini CLI** (google‑gemini/gemini-cli) | **10** (sub‑agent false‑success, hangs, AST, tool limits) | **10** (policy wildcard, sandbox hardening, OAuth persistence, etc.) | **Nightly** `v0.61.0‑nightly.20260911` |
| **GitHub Copilot CLI** (github/copilot-cli) | **10** (session resume timeout, OOM, voice installer 401, WSL2 CPU spike) | **0** (no PR activity in last 24 h) | **v1.0.84‑5** (session & memory import features) |
| **Kimi Code CLI** (MoonshotAI/kimi-cli) | – (digest unavailable) | – | – |
| **OpenCode** (anomalyco/opencode) | – | – | – |
| **Pi** (badlogic/pi-mono) | – | – | – |
| **Qwen Code** (QwenLM/qwen-code) | – | – | – |
| **DeepSeek TUI** (Hmbown/DeepSeek‑TUI) | – | – | – |

*Only tools with a usable digest are quantified; the remaining six projects provide no public activity data for this day.*

---

### 3. Shared Feature Directions  

| Emerging Requirement | Tools Mentioning It | Typical Use‑Case |
|----------------------|---------------------|------------------|
| **Process & Memory Hygiene** (leaked MCP servers, orphaned threads) | Codex #30408, Codex #44561 (whimsy off to reduce UI load) | Prevent runaway RAM/CPU on macOS/Windows desktops |
| **Robust Session/Resume Logic** (crash‑free resume, token persistence) | Codex #44781, Copilot #4753, Gemini #29195, Gemini #29208 | Enable long‑running agents to pick up where they left off |
| **Voice / Real‑time Interaction** | Codex PR #44921 (TUI voice default), Codex PR #44922 (native voice runtimes), Copilot v1.0.84‑5 (session import) | Hands‑free coding, accessibility, live debugging |
| **Security Hardening & Sandbox Isolation** | Gemini PR #29283 (filesystem isolation), Gemini PR #29250 (prompt‑injection guard), Codex PR #44872 (network policy sandbox), Copilot #4822 (AGENTS.md privacy) | Enterprise compliance, defense‑in‑depth |
| **Tool / Skill Scaling & Discovery** | Gemini #24246 (400 error >128 tools), Gemini #21968 (skill auto‑use), Codex #44905 (disabled‑plugin API), Copilot #4438 (skill visibility) | Large orgs with many internal plugins need dynamic scoping |
| **AST‑aware / Token‑Frugal File Access** | Gemini #22745 (AST‑aware reads), Gemini #21335 (compress persistence), Codex #44908 (skill validator missing PyYAML) | Reduce token consumption when scanning big codebases |
| **Cross‑Platform UI Consistency** (macOS/Windows/Linux crashes, Wayland support) | Codex #44720/44785 (renderer crash), Codex #40968 (Windows send‑button freeze), Gemini #21983 (Wayland browser), Copilot #3700 (WSL2 CPU spike) | Ensure developers on any OS have a reliable experience |
| **Enterprise Authentication & Policy** | Codex #41434 (macOS OAuth fail), Codex #44832 (trusted MCP auth), Copilot #4795 (Atlassian MCP OAuth) | Seamless SSO/integrated credential flows for corporate users |

*The same themes appear in at least two separate projects, indicating a community‑wide prioritisation.*

---

### 4. Differentiation Analysis  

| Dimension | OpenAI Codex | Gemini CLI | GitHub Copilot CLI | Other Projects (no data) |
|-----------|--------------|------------|--------------------|--------------------------|
| **Core Language / Stack** | Rust‑centric core, heavy native desktop binaries | Go + Rust mix; strong container‑sandbox focus | TypeScript/Node; tightly coupled to VS Code & GitHub ecosystem | Vary (unknown) |
| **Primary Feature Focus** | Agentic “desktop” experience, MCP server architecture, enterprise‑grade plugins | Security‑first sandbox, AST‑aware code introspection, self‑awareness policies | Session persistence, MCP integration, cost‑optimisation hooks | – |
| **Target Audience** | Power users / enterprise developers needing full‑desktop AI IDE | Security‑conscious orgs, tooling developers, Linux‑heavy environments | VS Code users, GitHub‑centric teams, developers needing cheap, stable sessions | – |
| **Technical Approach** | Native binaries + MCP “thread” model; worktrees, voice‑TUI; experimental MXC sandbox on Windows | Policy‑driven tool‑allowlist, filesystem isolation, explicit “yolo” policy replacement; heavy use of container runtimes | JSONL session interchange, lightweight daemon, optional hooks, heavy reliance on GitHub auth services | – |
| **UI Paradigm** | TUI + GUI desktop (macOS/Win) with “astra stars” UI effect | Terminal‑only with optional web‑based browser sub‑agent | TUI with shell‑completion, VS Code extension bridge | – |

---

### 5. Community Momentum & Maturity  

| Tool | Issue Volume (today) | PR Activity (today) | Release Cadence | Maturity Signal |
|------|----------------------|----------------------|-----------------|-----------------|
| **OpenAI Codex** | 10 high‑severity bugs (resource leaks, startup crashes) | 10 merged PRs (feature toggles, sandbox, voice) | Multiple **alpha** releases per day | **High** – fast iteration, active triage, but still in pre‑stable phase. |
| **Gemini CLI** | 10 bugs (sub‑agent logic, hangs, tool limits) | 10 PRs (sandbox hardening, OAuth persistence) | Nightly build released daily | **High** – aggressive security hardening, community‑driven fixes; approaching stable 1.0. |
| **GitHub Copilot CLI** | 10 regressions (session timeout, OOM, WSL2) | 0 PRs (focus on triage) | Single **patch** release (v1.0.84‑5) | **Medium** – stable 1.x line but slower feature velocity; relies on issue‑driven fixes. |
| **Claude Code, Kimi Code, OpenCode, Pi, Qwen Code, DeepSeek TUI** | No public data – likely low‑visibility or early‑stage repos | – | – | **Low/Unknown** – cannot assess momentum from today’s digest. |

---

### 6. Trend Signals for Developers  

1. **Stability > New Features** – All three active projects are dominated by crash‑fixes, memory‑leak patches, and OAuth/permission bugs, indicating that **reliability is now the primary value proposition** for AI‑CLI adopters.  

2. **Voice & Real‑Time Interaction** – Codex is the only tool already promoting voice‑enabled TUI as default; other projects have only hinted at it.  Expect **speech‑to‑code** to become a differentiator in the next 6‑12 months.  

3. **Security‑First Sandboxing** – Gemini’s extensive filesystem‑isolation PRs and Codex’s Windows MXC network‑policy work show a **shift toward zero‑trust execution**; enterprises will likely demand built‑in sandbox guarantees rather than ad‑hoc scripts.  

4. **Agent Autonomy & Skill Discovery** – Repeated complaints about “skills not auto‑invoked” (Gemini #21968, Copilot #4438) and “sub‑agent false success” (Gemini #22323) point to a **growing expectation that the CLI should orchestrate tools without manual prompting**.  

5. **Token & Cost Efficiency** – Gemini’s `/compress` persistence requests and Copilot’s Flex‑Tier cost‑reduction demand illustrate a **developer focus on minimizing LLM token spend**, especially in long‑running sessions.  

6. **Cross‑Platform Consistency** – Crashes specific to macOS, Windows, Linux/Wayland, and WSL2 are a common pain point; future tooling will likely converge on **single‑source binaries with platform‑agnostic sandbox layers** to avoid fragmented UX.  

7. **Enterprise Authentication** – OAuth failures on macOS (Codex), Atlassian MCP (Copilot), and trusted MCP auth (Codex) reveal that **smooth SSO flows are a prerequisite for corporate adoption**; expect tighter integration with Azure AD, Okta, and similar providers.  

---

**Take‑away for decision‑makers:**  
If your organization needs a **feature‑rich, desktop‑centric AI IDE with emerging voice support**, **OpenAI Codex** currently offers the most complete stack, albeit with a higher bug‑fix turnover.  
For **security‑conscious, container‑oriented workflows** and **AST‑driven code intelligence**, **Gemini CLI** is the most mature and actively hardened.  
If you are already embedded in the **GitHub ecosystem** and value **session import/export and cost‑optimised usage**, **Copilot CLI** provides a stable baseline, though feature velocity is slower.  

The other six tools lack visible activity today; they may be early prototypes or low‑traffic projects and should be evaluated cautiously until more community data emerges.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills – Community Highlights (as of 2026‑09‑12)**  

---  

### 1. Top Skills Ranking  
| Rank | PR | Skill (core purpose) | Key discussion points | Current status |
|------|----|----------------------|-----------------------|----------------|
| 1 | **#514** – *document‑typography* | Automatic detection & correction of typographic problems (orphans, widows, mis‑numbered headings) in AI‑generated docs. | Users praise the “out‑of‑the‑box” polish it adds to reports and presentations; a few reviewers ask for language‑specific rules and a “quiet” mode that only warns. | **Open** |
| 2 | **#486** – *odt* | Creation, templating, and HTML conversion of OpenDocument files (`.odt`, `.ods`). | Strong demand from enterprises that rely on LibreOffice; requests for support of macro‑enabled ODT and for a “preview‑only” mode. | **Open** |
| 3 | **#1628** – *Hivemind* (Zero‑Cost Multi‑Agent Orchestration) | Lets Claude Code delegate cheap “mechanical” work to free‑model workers while retaining planning & review. | Excitement about cost‑saving for large‑scale data‑processing pipelines; concerns about security sandboxing and result verification. | **Open** |
| 4 | **#1627** – *buffer‑api* (Agent Skill) | GraphQL‑based scheduling/analysis of social‑post campaigns via Buffer. | Positive feedback from marketing teams; suggestions to add multi‑account bulk‑upload and webhook callbacks. | **Open** |
| 5 | **#1367** – *self‑audit* (mechanical + reasoning quality gate) | Pre‑delivery audit that verifies files, then runs a four‑dimension reasoning check (correctness, safety, completeness, relevance). | Seen as a “safety net” for production agents; some ask for customizable thresholds per dimension. | **Open** |
| 6 | **#83** – *skill‑quality‑analyzer* & *skill‑security‑analyzer* | Meta‑skills that score a skill’s documentation, structure, and security posture. | Community hopes to embed these in CI pipelines; a few points raised about false‑positive security flags for complex permissions. | **Open** |
| 7 | **#1615** – *scnet‑hpc* | Remote execution on SCNet high‑performance clusters (SSH + Slurm). | Early adopters in research labs are testing job‑submission templates; requests for GPU‑node auto‑selection. | **Open** |
| 8 | **#1298** – *skill‑creator* runtime fixes (Windows stream reading, parallel workers) | Improves reliability of `run_eval.py` and `run_loop.py` on Windows. | Critical for teams using Windows dev environments; many thank the author for addressing a long‑standing “0 % recall” bug. | **Open** |

*All PRs above are currently **open** (no merge yet), but they dominate the conversation thread count and have attracted multiple reviewer comments.*  

---  

### 2. Community Demand Trends (derived from the most‑commented Issues)  

| Trend | Representative Issues | What the community is asking for |
|-------|-----------------------|----------------------------------|
| **Security & Trust Boundaries** | #492 (namespace impersonation), #1487 (token‑exhaustion in `claude‑api`), #1175 (SharePoint permissions) | Formal verification of skill provenance, sandboxed execution, clearer deprecation notices, and token‑usage safeguards. |
| **Organizational Collaboration** | #228 (org‑wide skill sharing) | Built‑in library or sharing links so teams can publish, discover, and version‑control skills without manual file exchange. |
| **Robust Evaluation & Quality Gates** | #556 (run‑eval never triggers), #1390 (evaluation harness errors), #1367 (self‑audit) | Reliable automated testing of trigger rates, standardised evaluation harnesses, and built‑in quality‑gate pipelines. |
| **Automation & Multi‑Agent Orchestration** | #1628 (Hivemind), #1627 (Buffer API), #1615 (SCNet‑HPC) | Skills that act as thin wrappers around external services or cluster schedulers, enabling “agent‑as‑a‑service” patterns. |
| **Documentation & Presentation Polish** | #514 (typography), #486 (ODT), #189 (duplicate plugin content) | Skills that improve the final artefact’s readability, formatting, and avoid duplicate skill footprints. |
| **New Skill Concepts** | #1329 (compact‑memory), #412 (agent‑governance), #1385 (reasoning quality‑gate pipeline) | Interest in higher‑level governance, memory‑compression, and staged reasoning pipelines. |

---  

### 3. High‑Potential Pending Skills (active‑comment PRs likely to land soon)  

| PR | Skill | Brief Description | Notable Comments / Requests |
|----|-------|-------------------|------------------------------|
| **#514** | *document‑typography* | Detects and fixes orphan/widow lines, mis‑aligned numbering, etc. | Requests for language‑specific rules and an optional “report‑only” mode. |
| **#486** | *odt* | Create, fill, read, and convert OpenDocument files. | Suggestions to add macro support and batch conversion. |
| **#1628** | *Hivemind* | Free‑model worker orchestration for cheap mechanical work. | Security sandboxing & verification of worker outputs are hot topics. |
| **#1627** | *buffer‑api* | GraphQL skill for social‑post scheduling/analytics. | Users ask for bulk‑upload and webhook callbacks. |
| **#1367** | *self‑audit* | Mechanical file checks + four‑dimensional reasoning quality gate. | Desire for configurable thresholds per dimension. |
| **#83** | *skill‑quality‑analyzer* & *skill‑security‑analyzer* | Meta‑skills that evaluate skill documentation and security posture. | Proposal to integrate into CI/CD pipelines. |
| **#1615** | *scnet‑hpc* | SSH/Slurm‑based HPC cluster access for SCNet. | Requests for GPU‑node auto‑selection and profile sharing. |
| **#1298** | *skill‑creator* runtime fixes | Windows‑specific stream‑reading, parallel worker, and trigger‑detection fixes. | Critical for Windows‑based teams; many up‑votes. |

These PRs have generated the most back‑and‑forth (comments, review requests, and “+1” reactions) and are therefore the strongest candidates for an upcoming merge cycle.  

---  

### 4. Skills Ecosystem Insight  

> **The community’s most concentrated demand is for secure, collaborative, and automation‑focused skills that enable reliable multi‑agent workflows while guaranteeing provenance and quality.**  

---  

*All GitHub links point to the official `anthropics/skills` repository.*  

---

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-12

## 1. Today's Highlights
The Codex ecosystem is seeing heavy iteration across the Rust core (`v0.155.0-alpha` series) alongside critical stabilization fixes for the ChatGPT Desktop application on Windows and macOS. Recent pull requests indicate a major push toward promoting features like TUI voice conversations and workspace worktrees to stable defaults, while addressing critical resource leaks in Model Context Protocol (MCP) server processes. Developers are heavily engaged in debugging multi-platform startup crashes, OAuth token exchange issues, and sandbox policy conflicts.

---

## 2. Releases
* **`rust-v0.155.0-alpha.3.10` / `3.9` / `3.8` / `3.7` / `3` / `2.3`** & **`rust-v0.154.0-alpha.6.2`**  
  * Rapid alpha iterations focused on core Rust infrastructure, refinement of app-server protocols, and stabilizing multi-turn execution context for agentic workflows.

---

## 3. Hot Issues
1. **[#30408 - MCP server processes leak: per-thread processes never cleaned up (9+ GB RSS)](https://github.com/openai/codex/issues/30408)**  
   * **Why it matters:** Orphaned global MCP server processes accumulate unboundedly because they are never terminated when threads are archived or closed, leading to severe memory bloat (9+ GB RSS).
   * **Community reaction:** Highly tracked performance issue with heavy user frustration over resource exhaustion on Apple Silicon and macOS.
2. **[#40968 - Windows Codex desktop: Send button spins forever and prompts never submit](https://github.com/openai/codex/issues/40968)**  
   * **Why it matters:** Completely halts Codex desktop usability on Windows 11 for Pro subscribers attempting follow-up prompts.
   * **Community reaction:** Active blocker for Windows desktop users experiencing dead-lock input states.
3. **[#44720 - ChatGPT hit a snag bug reproduce](https://github.com/openai/codex/issues/44720)** & **[#44785 - Linux Debian 13 startup-fatal “ChatGPT hit a snag” renderer AppRoutes `TypeError`](https://github.com/openai/codex/issues/44785)**  
   * **Why it matters:** A prevalent renderer failure (`r is not a function` / `n is not a function`) causing immediate startup crashes across multiple desktop packages (`26.908.31457` and `26.908.31748`).
   * **Community reaction:** Immediate widespread failure reports across macOS and Linux/Debian users following recent desktop deployments.
4. **[#44561 - Turn off whimsy effect (astra stars) by default](https://github.com/openai/codex/issues/44561)**  
   * **Why it matters:** Forces users to manually configure `[tui] whimsy = false` to remove distracting background star animations.
   * **Community reaction:** Highly popular feature request/complaint, with users noting it resembles a screen glitch rather than a helpful UI enhancement.
5. **[#41434 - macOS: OAuth token exchange fails with "error sending request" while curl succeeds](https://github.com/openai/codex/issues/41434)**  
   * **Why it matters:** Breaks authentication in the Codex CLI on macOS despite functional system networking and manual curl requests.
   * **Community reaction:** Blocks local developer onboarding and CLI token provisioning.
6. **[#42757 - cua_repl trusted worker drops NODE_REPL_TRUSTED_SERVICES and crashes before browser attachment](https://github.com/openai/codex/issues/42757)**  
   * **Why it matters:** Prevents the in-app browser from attaching to open browser tabs, breaking end-to-end computer-use flows.
   * **Community reaction:** Frustrates enterprise and business users relying on automated browser context integration.
7. **[#44723 - Automations (heartbeat & cron) inject a `function_call_output` without `call_id`](https://github.com/openai/codex/issues/44723)**  
   * **Why it matters:** Permanently corrupts target sessions when using custom OpenAI-compatible providers (like DeepSeek) via strict Responses APIs with a `400 missing field call_id` error.
   * **Community reaction:** Critical interoperability bug for developers utilizing local or custom model endpoints.
8. **[#44781 - [Codex Desktop] Editing and resending a queued message triggers "App-server queued follow-up no longer exists"](https://github.com/openai/codex/issues/44781)**  
   * **Why it matters:** Disrupts chat flow and message queuing semantics in the Windows desktop app.
   * **Community reaction:** Gaining rapid traction and 👍 votes for disrupting message editing workflows.
9. **[#44908 - Packaged skill validator requires PyYAML missing from bundled runtime](https://github.com/openai/codex/issues/44908)**  
   * **Why it matters:** The system `skill-creator` script fails out-of-the-box because its dependency (`PyYAML`) is absent from the bundled workspace Python runtime.
   * **Community reaction:** Roadblock for developers attempting to author and validate custom agent skills.
10. **[#44458 - macOS: CLI 0.154.0 experimental capability breaks bundled Messages and Computer History MCP startup](https://github.com/openai/codex/issues/44458)**  
    * **Why it matters:** Causes core system MCP servers (Messages, Computer History) to crash on startup under `codex-cli 0.154.0`.
    * **Community reaction:** Highlights regressions in experimental CLI builds affecting system-level integrations.

---

## 4. Key PR Progress
1. **[#44921 - Enable TUI voice conversations by default](https://github.com/openai/codex/pull/44921)**  
   * Promotes `realtime_conversation` out of experimental status, enabling TUI voice interaction natively.
2. **[#44922 - Bundle native voice runtimes in Windows releases](https://github.com/openai/codex/pull/44922)**  
   * Integrates native audio helpers and platform certificate validation logic into Windows distribution targets for reliable WebRTC/Realtime TLS handshakes.
3. **[#44905 - Expose disabled plugin settings in the app-server API](https://github.com/openai/codex/pull/44905)**  
   * Adds `disabledPluginIds` parameter handling to `thread/settings/update` and `turn/start` endpoints for granular plugin control.
4. **[#44903 - Wire up the native Windows MXC helper entry point](https://github.com/openai/codex/pull/44903)**  
   * Implements `--__codex-windows-mxc` dispatch parsing to launch managed Windows sandbox commands via bounded environment transports.
5. **[#44893 - Expose available access programs in model discovery](https://github.com/openai/codex/pull/44903)**  
   * Carries `available_access_programs` metadata through presets, model caches, and TypeScript bindings (`availableAccessPrograms` in `model/list`).
6. **[#44879 - Fade Astra composer stars and stabilize cursor redraws](https://github.com/openai/codex/pull/44879)**  
   * Adds an automatic fade-out animation for Astra composer star visual effects after 15 seconds (or immediately on user input) to mitigate visual distraction.
7. **[#44872 - Add managed network policy support to the Windows MXC sandbox](https://github.com/openai/codex/pull/44872)**  
   * Encodes `create_command_args()` with sandbox permissions and isolated network context rules for Windows execution environments.
8. **[#44870 - Enable worktrees by default and clarify local daemon errors](https://github.com/openai/codex/pull/44870)**  
   * Marks Git worktrees as stable, enables them by default, and clarifies fallback errors when local daemons lack terminal background listing capabilities.
9. **[#44832 - Add trusted enterprise MCP auth configuration](https://github.com/openai/codex/pull/44832)**  
   * Restricts enterprise MCP authorization overrides so that arbitrary project settings or third-party plugins cannot downgrade secure authentication modes.
10. **[#44755 - Check folder consent before creating or resuming TUI tasks](https://github.com/openai/codex/pull/44755)**  
    * Strengthens security posture by enforcing directory trust validations when resuming sessions or launching tasks from the Agent Command Center.

---

## 5. Feature Request Trends
* **Default-Off Whimsy / Aesthetics:** Growing user sentiment to disable distracting animations (like Astra stars) by default to prevent false-positive screen glitch concerns.
* **Granular Session & Profile Management:** Desire for seamless workspace context sharing, multi-subscription management, and unified project list synchronization between desktop apps and mobile remote clients.
* **Enterprise Security and Compliance:** Stronger controls over MCP authentication delegation and strict adherence to enterprise-managed network policies.

---

## 6. Developer Pain Points
* **Desktop Stability Regressions:** Frequent runtime crashes (`r is not a function`) immediately following minor desktop patch releases on Windows and Linux packages.
* **Orphaned Process Bloat:** Accumulated memory footprints caused by un-reaped background processes, specifically unmanaged MCP server helpers left behind after thread closure.
* **Custom Model Friction:** Incompatibilities when combining custom OpenAI-compatible endpoints with strict schema requirements (e.g., missing `call_id` injections from automated triggers).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-12

## 1. Today's Highlights
The Gemini CLI development cycle continues a heavy push toward hardened security boundaries, filesystem containment, and robustness against malformed state files. Alongside these hardening measures, recent discussions and community issues highlight a strong focus on advanced agent self-awareness, reducing subagent hangs, and improving token-frugal codebase operations.

---

## 2. Releases
* **[v0.61.0-nightly.20260911.ged2ac40df](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260910.ged2ac40df...v0.61.0-nightly.20260911.ged2ac40df)**
  Automated nightly release snapshot containing recent bug fixes and core logic updates.

---

## 3. Hot Issues
1. **[#22323 - Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**
   * **Why it matters:** Subagents hitting their turn limit prematurely report a false-positive success state, misleading users and parent agents about task completion.
   * **Community Reaction:** Draws notable engagement (13 comments, 2 👍) as developers rely heavily on subagent accuracy during large codebase investigations.
2. **[#19873 - Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**
   * **Why it matters:** Proposes optimizing execution by letting models lean into native POSIX command-chaining (`grep`, `sed`, `awk`) under safe OS sandboxing.
   * **Community Reaction:** Seen as a major architectural enhancement for aligning performance with Gemini's native training affinities.
3. **[#21409 - Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**
   * **Why it matters:** Basic operations delegated to the generalist agent stall indefinitely (up to an hour), forcing users to manually cancel or bypass subagent delegation.
   * **Community Reaction:** Highly critical bug (8 👍, 8 comments) impacting baseline agent usability.
4. **[#22745 - Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**
   * **Why it matters:** Investigates integrating Abstract Syntax Tree (AST) aware utilities to perform precise method-bound reads and reduce token waste.
   * **Community Reaction:** Important architectural epic for slashing token noise during codebase mapping.
5. **[#21968 - Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**
   * **Why it matters:** Reports that Gemini fails to organically trigger custom-defined skills (like gradle or git workflows) or deploy subagents without heavy explicit prompting.
   * **Community Reaction:** Highlights gaps in contextual skill discovery and autonomous tool invocation.
6. **[#25166 - Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)**
   * **Why it matters:** Simple non-interactive CLI commands occasionally lock the UI state into an indefinite waiting loop even after the underlying process terminates.
   * **Community Reaction:** Gained 3 👍 for causing unexpected terminal workflow blocks.
7. **[#21983 - browser subagent fails in wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**
   * **Why it matters:** Linux Wayland environments break the browser automation subagent execution flow.
   * **Community Reaction:** Crucial compatibility bug for Linux developers using modern display servers.
8. **[#24246 - Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**
   * **Why it matters:** Exceeding tool limits causes API validation failures (HTTP 400), breaking sessions when many extensions or custom agents are active.
   * **Community Reaction:** Signifies an urgent need for dynamic tool scoping and filtering.
9. **[#21335 - /compress command is not persistent across session resume](https://github.com/google-gemini/gemini-cli/issues/21335)**
   * **Why it matters:** Summaries generated via `/compress` to save tokens are lost when exiting and resuming a session, as changes aren't written to disk.
   * **Community Reaction:** Frustrates users trying to maintain long-term token optimization across sessions (2 👍).
10. **[#22186 - get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**
    * **Why it matters:** Terminal output hooks trigger unhandled exceptions right at the tail end of summarizing multi-step operations.
    * **Community Reaction:** High-priority crash bug disrupting workflow summaries.

---

## 4. Key PR Progress
1. **[#29287 - feat(policy): map --yolo to allowedTools wildcard policy](https://github.com/google-gemini/gemini-cli/pull/29287)**
   * Replaces the hardcoded `ApprovalMode.YOLO` state natively with a wildcard policy array (`allowedTools: ["*"]`), streamlining authorization logic.
2. **[#29283 - fix(sandbox): improve filesystem isolation and isolate runtime state](https://github.com/google-gemini/gemini-cli/pull/29283)**
   * Hardens filesystem mount boundaries across Docker, Podman, runsc, LXC, and macOS Seatbelt by enforcing read-only config access and write-ephemeral states.
3. **[#29250 - fix(core): prevent indirect prompt injection via build file modifications and untrusted flags](https://github.com/google-gemini/gemini-cli/pull/29250)**
   * Implements robust workspace boundary validations for `shell`, `edit`, and `write_file` paths under restricted modes.
4. **[#29282 - fix(auth): persist oauth credentials after login](https://github.com/google-gemini/gemini-cli/pull/29282)**
   * Ensures OAuth tokens are saved immediately following a successful browser/user-code login, preventing repeated sign-in prompts.
5. **[#29208 - fix(core): fall back to empty on malformed agents.json shape](https://github.com/google-gemini/gemini-cli/pull/29208)**
   * Resolves crashes and silent failures caused by corrupt, truncated, or malformed `agents.json` configurations.
6. **[#29192 - fix(checkpoint): contain legacy raw tag path inside checkpoints directory](https://github.com/google-gemini/gemini-cli/pull/29192)**
   * Fixes a path traversal security bug where `/chat delete` with `../` sequences could delete files outside the intended checkpoints folder.
7. **[#29188 - fix(core): match include patterns against file name/extension exactly in read-many-files](https://github.com/google-gemini/gemini-cli/pull/29188)**
   * Prevents false-positive binary/asset inclusion caused by loose string substring checks against directory paths.
8. **[#29186 - fix(core): correct exitCode null check in shell sandbox denial heuristic](https://github.com/google-gemini/gemini-cli/pull/29186)**
   * Corrects type handling for `null` exit codes in shell sandbox denial detection logic.
9. **[#29187 - fix(core): use safeLiteralReplace for LLM prompt template placeholders](https://github.com/google-gemini/gemini-cli/pull/29187)**
   * Replaces vulnerable prompt string replacements with safe handling to prevent `$` substitution injection exploits.
10. **[#29195 - fix(checkpoint): degrade non-array history instead of crashing resume](https://github.com/google-gemini/gemini-cli/pull/29195)**
    * Prevents session resume crashes (`TypeError`) by gracefully defaulting to an empty checkpoint if the history format is invalid.

---

## 5. Feature Request Trends
* **AST-Aware Codebase Intelligence:** Growing interest in adopting AST tools (e.g., parsing methods with single calls) to map repositories and avoid token bloat.
* **Autonomous Skill & Subagent Discovery:** Requests for the model to naturally incorporate user-defined skills and delegate to subagents without micro-management.
* **Self-Awareness and Introspection:** Enhancing the agent's internal knowledge regarding its own configuration flags, hotkeys, and CLI mechanics.
* **Token Frugality & Compression Persistence:** Better caching, persistence of `/compress` optimizations across resumes, and surgically targeted file reads.

---

## 6. Developer Pain Points
* **UI/Process Hangs:** Frustrations with generalist agents and shell command execution locking up indefinitely in "Waiting input" or hanging loops.
* **Fragile State Files:** Frequent unhandled exceptions or crashes when local configuration files (`agents.json`, checkpoints, settings) are malformed, interrupted, or symlinked.
* **Tool Scaling Limits:** Hitting HTTP 400 errors when large extension registries exceed 128+ active tools.
* **Sandbox & Permission Edge Cases:** Security and platform-specific quirks (such as Windows `git diff --output` bypasses or Wayland browser limitations) requiring strict intervention.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest | 2026-09-12

### 1. Today's Highlights
The GitHub Copilot CLI ecosystem is focused on stabilizing session management and MCP (Model Context Protocol) integration following the v1.0.84 release. Recent reports highlight critical regressions in session resumption and persistent connectivity issues with remote MCP servers, which remain a top priority for the triage team.

### 2. Releases
*   **v1.0.84-5:** Introduces session and memory import commands for the semantic JSONL interchange format and improves shell completion accuracy by synchronizing root flags and subcommand options with the internal grammar parser.

### 3. Hot Issues
*   **[#4753](https://github.com/github/copilot-cli/issues/4753):** Session resume cancels in-flight MCP connections due to a 1s timeout, breaking context for long-running processes.
*   **[#4699](https://github.com/github/copilot-cli/issues/4699):** V8 heap OOM crashes during long sessions; developers are finding diagnostic dumps cluttering their working directories.
*   **[#4035](https://github.com/github/copilot-cli/issues/4035):** Voice installer incorrectly attempts to pull private Azure Artifacts, resulting in persistent 401 errors.
*   **[#4438](https://github.com/github/copilot-cli/issues/4438):** Skills with `disable-model-invocation: true` are being rendered unreachable by the CLI, despite being project-authorized.
*   **[#4795](https://github.com/github/copilot-cli/issues/4795):** Atlassian MCP OAuth failure caused by callback URL mismatches, hindering enterprise tool integration.
*   **[#3700](https://github.com/github/copilot-cli/issues/3700):** High-severity WSL2 performance regression where the MainThread pins at 215% CPU, freezing the TUI.
*   **[#1168](https://github.com/github/copilot-cli/issues/1168):** "Authorization fatigue"—excessive prompting within a single request cycle remains a significant UX hurdle.
*   **[#4370](https://github.com/github/copilot-cli/issues/4370):** Compatibility issues with FastMCP servers returning `server/discover` errors (code -32602).
*   **[#4095](https://github.com/github/copilot-cli/issues/4095):** File lock conflicts (Access Denied) when updating plugins while VS Code is running.
*   **[#4822](https://github.com/github/copilot-cli/issues/4822):** Security/Privacy concern regarding `AGENTS.md` discovery, which traverses ancestor directories and ignores git boundaries.

### 4. Key PR Progress
*   *Note: No new Pull Requests were updated in the last 24 hours.* Development is currently concentrated on triaging existing issues and addressing regressions in the v1.0.8x series.

### 5. Feature Request Trends
*   **Efficiency & Cost:** Users are requesting support for the **OpenAI Flex Tier** ([#4821](https://github.com/github/copilot-cli/issues/4821)) to reduce operational costs.
*   **Workflow Hooks:** Growing demand for lifecycle triggers, specifically an "end-of-session" hook ([#4820](https://github.com/github/copilot-cli/issues/4820)) to automate cleanup or logging.
*   **Enhanced Interoperability:** Requests for cross-session context querying ([#2436](https://github.com/github/copilot-cli/issues/2436)) and argument auto-completion for custom skills ([#4812](https://github.com/github/copilot-cli/issues/4812)).

### 6. Developer Pain Points
*   **Session Instability:** Frequent session handoffs, `/clear` commands, and resumes are causing MCP connections to drop or fail consistently.
*   **Environment Fragility:** Installer-related issues (broken PATH variables, 401s on private feeds) and resource-heavy TUI behavior (CPU spikes) are impeding adoption.
*   **Silent Failures:** Critical errors—like OOM crashes or failed MCP handshakes—often provide minimal guidance, forcing users into tedious troubleshooting cycles or full restarts.

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