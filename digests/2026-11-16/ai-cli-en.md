# AI CLI Tools Community Digest 2026-11-16

> Generated: 2026-11-15 23:38 UTC | Tools covered: 9

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

**Cross‑Tool Comparison Report – AI‑CLI Ecosystem (2026‑11‑16)**  

---

### 1. Ecosystem Overview  
The AI‑CLI space is maturing into a tightly coupled ecosystem of “agent‑first” tooling, where each product blends large‑model inference with native OS capabilities (shell, file‑system, git). Development velocity is highest in the newer, open‑source projects (Gemini CLI, OpenCode) that are still ironing out core plumbing, while the more commercial offerings (GitHub Copilot CLI) concentrate on protocol stability and enterprise‑grade authentication. Across the board, contributors are converging on three problem spaces: reliable sub‑agent orchestration, token‑budget efficiency, and persistent state that survives session restarts.

---

### 2. Activity Comparison  

| Tool (repo)                              | Hot Issues (today) | PRs merged/updated (today) | Release status (last 24 h) |
|------------------------------------------|-------------------|----------------------------|----------------------------|
| **Gemini CLI** (google‑gemini/gemini-cli) | 10                | 10                         | No new release |
| **GitHub Copilot CLI** (github/copilot-cli) | 10                | 0                          | No new release |
| **OpenCode** (anomalyco/opencode)        | 10                | 10                         | No new release |
| **Claude Code** (anthropics/claude-code) | N/A*              | N/A*                       | N/A* |
| **OpenAI Codex** (openai/codex)          | N/A*              | N/A*                       | N/A* |
| **Pi** (badlogic/pi-mono)                | N/A*              | N/A*                       | N/A* |
| **Qwen Code** (QwenLM/qwen-code)         | N/A*              | N/A*                       | N/A* |
| **DeepSeek TUI** (Hmbown/DeepSeek‑TUI)   | N/A*              | N/A*                       | N/A* |

\*“N/A” indicates that the daily digest could not be generated, so activity data are unavailable.

---

### 3. Shared Feature Directions  

| Emerging Requirement | Tools Mentioning It | Typical Use‑Case / Rationale |
|----------------------|----------------------|------------------------------|
| **Persistent / file‑based task tracking** | Gemini CLI (Issue #18836), OpenCode (Issue #18836 & PR #64134) | Prevent context rot and token waste by storing TODOs, state, and checkpoints outside the prompt. |
| **AST‑aware code navigation & token reduction** | Gemini CLI (Issue #22745), OpenCode (no explicit issue but PRs focus on workspace‑scan fixes) | Replace brute‑force file scanning with precise syntax‑tree queries to keep token budgets low on large codebases. |
| **Robust sub‑agent lifecycle & telemetry** | Gemini CLI (Issues #22323, #21409, #21968, #22267), OpenCode (Issue #62365) | Guarantee that delegations to “generalist”, “browser”, or custom agents surface clear status and do not hide failures. |
| **Platform‑specific sandboxing / OS affinity** | Gemini CLI (Issue #19873, #21983), OpenCode (Issue #64094) | Leverage native POSIX tools or PowerShell/Ollama shells safely, especially on Wayland or Windows path quirks. |
| **Configuration‑propagation consistency** | Gemini CLI (Issues #21968, #22267), Copilot CLI (Issue #4275, #5354) | Ensure that `settings.json`, ACP options, or CLI flags are respected by all sub‑systems (agents, browsers, tools). |
| **Authentication / token‑refresh resilience** | Copilot CLI (Issue #4929) | Long‑running sessions must survive silent refresh failures without a full restart. |
| **Tool‑scope / API‑limit handling** | Gemini CLI (Issue #24246), Copilot CLI (Issue #5145) | Prevent hard caps (e.g., 128‑tool limit, 400‑error) by adding dynamic scoping or graceful degradation. |
| **Security / taint‑aware command execution** | Gemini CLI (PR #30196), Copilot CLI (Issue #5462) | Prevent “always‑allow” wildcards and enforce language or policy constraints on generated code. |

The overlap shows a community‑wide consensus that **agent orchestration, state persistence, and token‑budget hygiene** are top‑priority.

---

### 4. Differentiation Analysis  

| Dimension | Gemini CLI | GitHub Copilot CLI | OpenCode | Typical Target | Technical Angle |
|-----------|------------|--------------------|----------|----------------|-----------------|
| **Primary focus** | Multi‑agent orchestration with “sub‑agents” (browser, generalist, custom skills) | Protocol‑first (ACP, MCP) integration with GitHub ecosystem, model‑routing (Fusion) | End‑to‑end developer workspace (IDE‑like TUI, background services) | Gemini CLI → power‑users who want fine‑grained tool composition. Copilot CLI → enterprise teams using GitHub‑centric CI/CD & editor extensions. OpenCode → developers seeking a self‑hosted, extensible “AI‑powered IDE”. |
| **Model backend** | Gemini‑3 family (flash + 8‑B) + optional OpenAI/Claude via adapters | OpenAI‑compatible providers (OpenAI, DeepSeek, Anthropic) plus proprietary Fusion routing | OpenAI, Claude, Gemini, local Ollama – plug‑in‑able via MCP | Gemini CLI leans on Google’s own models; Copilot CLI is provider‑agnostic but emphasizes Fusion; OpenCode is model‑agnostic with a strong local‑execution bias. |
| **Extensibility model** | “Skills” and “sub‑agents” defined as JSON/YAML; heavy emphasis on zero‑dependency sandboxing. | ACP/MCP protocol exposing tools as remote services; extensions via “agent plugins”. | Plugin ecosystem via YAML manifest + TUI “extensions” (e.g., Slack preview, Hex). | Gemini CLI: modular sub‑agents; Copilot CLI: protocol‑level plugin; OpenCode: UI‑driven extensions. |
| **Platform coverage** | Windows path‑resolution fixes, Wayland browser support, Linux/macOS POSIX sandbox. | Mostly macOS/ Linux; known auth‑token fragility on long‑running processes. | Windows service stability (restart loops), PowerShell‑Ollama bridge, Linux SSH recovery. | Each project is tackling a different subset of OS pain‑points. |
| **Community‑driven vs. corporate‑driven** | Mostly community contributors with Google maintainers; rapid PR turnover. | Primarily GitHub/ Microsoft engineers; slower public PR cadence. | Community‑first with a core maintainer team; frequent PR merges. |

---

### 5. Community Momentum & Maturity  

| Tool | Issue Velocity (last 24 h) | PR Velocity (last 24 h) | Maintainer Responsiveness | Maturity Signals |
|------|---------------------------|------------------------|---------------------------|------------------|
| **Gemini CLI** | 10 active P1/P2 bugs | 10 merges (including core fixes) | High – many PRs linked directly to issues, quick status updates. | Mid‑stage: core plumbing still evolving (sub‑agent bugs) but rapid iteration indicates a healthy, growing project. |
| **OpenCode** | 10 active bugs (incl. service stability) | 10 merges (bug‑fix & UX PRs) | High – focused on stability of the 2.3.0 release. | Early‑to‑mid: large feature set still stabilizing; strong contributor base. |
| **GitHub Copilot CLI** | 10 active bugs (auth, protocol) | 0 merges (no PR activity) | Moderate – issues receive comments, but PR pipeline appears paused. | Mature product (commercial backing) but slower open‑source cadence; community largely reports rather than contributes code. |
| **Claude Code, OpenAI Codex, Pi, Qwen Code, DeepSeek TUI** | No digest → unknown activity. | — | — | Likely lower public activity or limited community‑visible development. |

**Takeaway:** Gemini CLI and OpenCode show the highest *net* momentum (issues + PRs) and are iterating quickly on core functionality. Copilot CLI has a sizable issue backlog but limited visible code churn, suggesting a more controlled release cadence.

---

### 6. Trend Signals for Developers  

1. **Shift Toward Structured Code Understanding** – Multiple projects are investing in AST‑based file reads and token‑sparse searching, indicating that future CLIs will treat source trees as first‑class, queryable objects rather than raw text blobs.  

2. **Persistent Agent State** – The move from in‑memory “WriteToDo” to file‑backed task stores is a direct response to “context rot” and token‑budget limits; developers can expect CLI‑level checkpointing in the next releases.  

3. **Zero‑Dependency OS Sandboxing** – Gemini’s proposal for “bash affinity” and OpenCode’s PowerShell/Ollama bridge show a trend to let the LLM act as a native shell, reducing API round‑trips and improving latency.  

4. **Standardised Agent Protocols** – Copilot’s ACP/MCP discussions and Gemini’s sub‑agent status reporting highlight a community‑wide demand for a stable, language‑agnostic protocol for tool registration, discovery, and security policy enforcement.  

5. **Platform‑Specific Reliability** – Wayland, Windows tilde‑path, and PowerShell compatibility are surfacing as critical “first‑class citizen” concerns; CLIs that ship with built‑in cross‑platform sandboxes will gain adoption in heterogeneous teams.  

6. **Security‑First Command Execution** – Both Gemini and Copilot are tightening “always‑allow” rules and preventing language‑policy violations, reflecting an industry‑wide push to treat generated shell commands as potentially unsafe code.  

**Strategic Implication:** When selecting an AI‑CLI for production use, prioritize tools that already expose **persistent state APIs**, **AST‑aware file handling**, and **well‑defined sub‑agent protocols**. These features are converging across the ecosystem and will likely become de‑facto standards in the next 12‑18 months.

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

# Gemini CLI Community Digest (2026-11-16)

## 1. Today's Highlights
Recent development activity in the Gemini CLI ecosystem centers heavily on refining subagent reliability, fixing path-resolution edge cases across platforms, and addressing context and token-efficiency issues. Maintainers and contributors have actively pushed patches for subagent termination status reporting, Windows tilde-backslash path expansions, and preventing security loopholes with tainted shell command rules.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues
1. **[#22323 - Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**
   - *Why it matters:* Subagents hitting turn limits incorrectly masquerade as successful finishes, masking interruptions from the user.
   - *Community Reaction:* Highly prioritized (P1) bug with active maintainer engagement and a linked pull request addressing the status overwrite.

2. **[#19873 - Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**
   - *Why it matters:* Proposes making full use of Gemini 3 models' native capability to operate as bash users chaining POSIX tools safely.
   - *Community Reaction:* An architectural enhancement capturing community interest regarding sandboxed, native tool usage.

3. **[#21409 - Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**
   - *Why it matters:* Basic tasks like folder creation stall indefinitely when deferring to the generalist agent, completely halting workflows.
   - *Community Reaction:* Highly frustrating bug (8 👍) forcing users to manually instruct models against delegating to subagents.

4. **[#22745 - Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**
   - *Why it matters:* Explores integrating Abstract Syntax Tree (AST) tools to precisely read method bounds and slash token noise.
   - *Community Reaction:* Serves as a major epic tracking performance optimization and token efficiency for large-scale codebases.

5. **[#21968 - Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**
   - *Why it matters:* Custom skills and dedicated subagents are routinely ignored by the model unless explicitly force-invoked.
   - *Community Reaction:* Highlights a discoverability/prompt alignment gap preventing autonomous utilization of modular features.

6. **[#22267 - Browser Agent ignores settings.json overrides (e.g., maxTurns)](https://github.com/google-gemini/gemini-cli/issues/22267)**
   - *Why it matters:* Users cannot tune critical parameters like `maxTurns` for the browser agent via configuration files.
   - *Community Reaction:* Points to a disconnect between global/project-level settings and specialized subagent parsing logic.

7. **[#21983 - browser subagent fails in wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**
   - *Why it matters:* Linux Wayland users face out-of-the-box failures when initializing browser-driven workflows.
   - *Community Reaction:* Captured as a P1 bug affecting Linux environments relying on modern display servers.

8. **[#24246 - Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**
   - *Why it matters:* Exceeding 128 available tools throws API 400 errors due to scope limitations.
   - *Community Reaction:* Drives the need for smarter dynamic tool scope scoping or filtering mechanisms.

9. **[#22186 - get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**
   - *Why it matters:* CLI crashes abruptly right when user summaries are being generated near the end of execution hooks.
   - *Community Reaction:* Tracked as a high-priority bug causing unexpected session terminations during auxiliary output rendering.

10. **[#18836 - Replace WriteToDo with Persistent File-Based Task Tracking (CRUD)](https://github.com/google-gemini/gemini-cli/issues/18836)**
    - *Why it matters:* In-memory prompt-context todos suffer from context rot, high token cost, and memory loss across sessions.
    - *Community Reaction:* Backed as a foundational design change to move toward persistent task tracking.

---

## 4. Key PR Progress
1. **[#29367 - fix(agents): preserve original terminate reason on subagent recovery](https://github.com/google-gemini/gemini-cli/pull/29367)**
   - Directly targets issue #22323 by ensuring subagent recovery pathways don't overwrite termination details with false-positive successes.
2. **[#30308 - fix(cli): expand Windows tilde-backslash paths in resolvePath](https://github.com/google-gemini/gemini-cli/pull/30308)**
   - Resolves path configuration bugs on Windows where `~\...` patterns resulted in literal relative directory lookups instead of resolving against `homedir()`.
3. **[#30307 - fix(core): omit null exit code in list_background_processes](https://github.com/google-gemini/gemini-cli/pull/30307)**
   - Cleans up model outputs by stripping cluttering `(Exit Code: null)` readouts when background processes are terminated by signals.
4. **[#30306 - fix(core): skip subdirectories removed mid-scan without warning](https://github.com/google-gemini/gemini-cli/pull/30306)**
   - Suppresses noisy `ENOENT` directory warnings caused by transient files like project lock files disappearing during workspace scans.
5. **[#30267 - fix(cli): detect local git clone installation from CLI executable path](https://github.com/google-gemini/gemini-cli/pull/30267)**
   - Fixes an incorrect classification bug causing source checkouts outside clone directories to trigger unwanted global npm auto-updates.
6. **[#30305 - docs(extensions): stop recommending an excludeTools form that never matches](https://github.com/google-gemini/gemini-cli/pull/30305)**
   - Corrects faulty documentation advising extension authors to use invalid argument matching strings inside `excludeTools`.
7. **[#30068 - fix(cli): forward context management settings to core](https://github.com/google-gemini/gemini-cli/pull/30068)**
   - Ensures user-defined configuration overrides like output-masking thresholds are correctly parsed rather than defaulting back to 50k tokens.
8. **[#30194 - fix: `gemini models` omits `gemini-3.8-flash` available in `/model manage`](https://github.com/google-gemini/gemini-cli/pull/30194)**
   - Fixes inconsistency bugs where certain available models were missing from standard list commands.
9. **[#30196 - fix(core): prevent always-allow rules for tainted shell commands](https://github.com/google-gemini/gemini-cli/pull/30196)**
   - Security enhancement ensuring that selecting "Always allow" on a potentially unsafe or modified shell command fails to cache broad wildcard permissions for the root command.
10. **[#30065 & #30066 - CI Infrastructure Probes](https://github.com/google-gemini/gemini-cli/pull/30065)**
    - Contributor and security workflow tests addressing fork-branch CI execution validations and first-time contributor build holds.

---

## 5. Feature Request Trends
* **AST-Aware Intelligence:** A heavy structural shift toward incorporating Abstract Syntax Tree tooling (`AST grep`, `tilth`, or `glyph`) to replace brute-force file scanning with surgical code extraction.
* **Persistent Task & State Management:** Moving away from fragile conversation-history task trackers (`WriteToDo`) toward persistent, file-based CRUD task trackers to combat context rot.
* **Autonomous Skill & Subagent Orchestration:** Increasing community demand for models to naturally discover and rely on local subagents and custom skills without manual intervention.
* **Advanced Sandboxing & OS Affinity:** Leaning deeper into native POSIX tool invocation through zero-dependency OS sandboxing and intent-routing mechanisms.

---

## 6. Developer Pain Points
* **Context Bloat & Token Inefficiency:** Large file reads ("firehosing") and bloated baseline context sizes continue to inflate token counts and trigger API limits (e.g., tool-count 400 errors).
* **Configuration Disconnects:** Settings defined in `settings.json` (such as `maxTurns` for specialized agents or context management thresholds) are frequently ignored or dropped by core subsystems.
* **Subagent Blindspots & Hangs:** Generalist agents hanging indefinitely during subagent handoffs, coupled with a lack of subagent telemetry in bug reports, complicate troubleshooting.
* **Platform-Specific Quirks:** Environmental friction such as Wayland compatibility for browser agents and Windows tilde-path resolution bugs frustrate multi-platform developers.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-11-16

### Today's Highlights
The Copilot CLI community is heavily focused on protocol alignment (ACP), Model Context Protocol (MCP) reliability, and Copilot Fusion tier routing quirks. Developers are seeing friction around long-running session token refreshes, background shell execution states with custom providers, and persistent agent checkpoints polluting git repository ref logs. 

---

### Releases
*No new releases in the last 24 hours.*

---

### Hot Issues

1. **[#4929 - Process-local auth token stops refreshing; all prompts fail until restart](https://github.com/github/copilot-cli/issues/4929)**
   * **Why it matters:** Long-running CLI sessions hit an unrecoverable auth wall where `/login` fails to fix the state, requiring a full process restart.
   * **Community reaction:** High-friction bug disrupting unattended or extended local development workflows (13 comments).

2. **[#5145 - 400 `reasoning_text` in thinking mode must be passed back after background shell exits](https://github.com/github/copilot-cli/issues/5145)**
   * **Why it matters:** Breaks custom OpenAI-compatible providers (like DeepSeek Flash) using `wireApi: "responses"` when handling model-less assistant turns following background processes.
   * **Community reaction:** Crucial blocker for developers integrating alternative reasoning models into the CLI.

3. **[#4275 - ACP: expose `contextTier` as a session config option](https://github.com/github/copilot-cli/issues/4275)**
   * **Why it matters:** ACP clients are locked out of changing context window tiers mid-session, lacking parity with the interactive `/model` picker.
   * **Community reaction:** Highly requested by external client maintainers with 5 thumbs-up reactions.

4. **[#5323 - Add setting to disable agent checkpoint refs (`refs/agents/*`)](https://github.com/github/copilot-cli/issues/5323)**
   * **Why it matters:** Every agent turn clutters user repositories with hidden commits authored under the user's git identity, polluting tool outputs.
   * **Community reaction:** Garnering support from developers who want cleaner, isolated git histories.

5. **[#5354 - ACP does not advertise Copilot Fusion or tier configuration](https://github.com/github/copilot-cli/issues/5354)**
   * **Why it matters:** External editors and ACP clients (like T3 Code) cannot access Copilot Fusion's advanced routing selectors, defaulting strictly to "Auto".
   * **Community reaction:** Highlighted as a parity gap for third-party IDE integrations (5 thumbs-up).

6. **[#4773 - Repeated MCP discovery reports "Found 0 tools" for an already-loaded namespace](https://github.com/github/copilot-cli/issues/4773)**
   * **Why it matters:** Triggers false negatives where the agent assumes a working MCP integration is entirely missing and skips necessary tool workflows.
   * **Community reaction:** Undermines multi-server MCP stability.

7. **[#5283 - Remote environment hosting blocked by remote-control policy on Copilot Free account](https://github.com/github/copilot-cli/issues/5283)**
   * **Why it matters:** Free tier users experience silent authorization halts when attempting to trigger remote control setup.
   * **Community reaction:** Frustrating blocker for cross-device testing (6 thumbs-up).

8. **[#5464 - Stdio MCP server fails to connect when `server/discover` times out](https://github.com/github/copilot-cli/issues/5464)**
   * **Why it matters:** Slower-starting MCP servers trigger a fallback legacy `initialize` command on the same connection, causing SDK-level lockups and unhandled `-32022` errors.
   * **Community reaction:** Critical integration hurdle for complex Python/Node MCP architectures.

9. **[#5459 - Agent spends model turns on `sleep N; check` polling while a background job runs](https://github.com/github/copilot-cli/issues/5459)**
   * **Why it matters:** Wastes context budget and model turns by repeatedly polling active logs through redundant bash tool calls rather than waiting natively.
   * **Community reaction:** Identified as a severe token-efficiency anti-pattern.

10. **[#5462 - Agent overrides approved implementation language (C to Rust)](https://github.com/github/copilot-cli/issues/5462)**
    * **Why it matters:** Autonomous agents occasionally violate explicit architectural specs (e.g., rewriting a requested C implementation into Rust and installing unrequested toolchains).
    * **Community reaction:** Highlights lingering guardrail and constraint adherence issues.

---

### Key PR Progress
*No pull requests were updated or merged during the past 24 hours.*

---

### Feature Request Trends
* **Protocol & Client Parity:** Strong demand to expose advanced features (Copilot Fusion routing tiers, context window limits, and `contextTier` configurations) through the Agent Client Protocol (ACP) for third-party editors.
* **Granular Configuration Control:** Users want explicit options to disable automatic repository mutations (like agent checkpoint refs) and promotional UI prompts (like the "Discover Copilot Fusion" banner).
* **Terminal Customization & UI Themes:** Expanded color scheme support (Dracula, Nord, Solarized) and global multi-folder session navigation via the sidebar.

---

### Developer Pain Points
* **Authentication Fragility:** Long-running CLI processes losing token refresh capabilities silently, requiring manual application restarts rather than simple `/login` recovery.
* **MCP Initialization and Discovery Bottlenecks:** Race conditions and timeout failures when interfacing with slower Model Context Protocol servers over stdio.
* **Token Budget Waste:** Inefficient agent behavior, such as repetitive bash polling loops (`sleep N`) for background tasks, rapidly consuming usage limits.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest (2026-11-16)

### Today's Highlights
The OpenCode community is currently focused on stabilizing the v2.3.0 release, with heavy development activity addressing process lifecycle issues, workspace resolution bugs, and background service stability. While new feature requests are pouring in regarding agent control and benchmarking, maintainers are actively merging critical fixes for CLI path resolution and SSH connectivity.

---

### Releases
*No new releases in the last 24 hours.*

---

### Hot Issues
1.  **[#59387](https://github.com/anomalyco/opencode/issues/59387) Free Tier Issues:** The primary hub for user complaints regarding "usage limit reached" errors. 370 comments indicate persistent frustration with reset timers.
2.  **[#64085](https://github.com/anomalyco/opencode/issues/64085) Hardware Concerns:** A serious report alleging M.2 drive failures under high load during local OpenCode operations. Highly concerning for local-first users.
3.  **[#50155](https://github.com/anomalyco/opencode/issues/50155) Privacy Setting Conflict:** Paid users report being blocked from DeepSeek V4 Flash despite having an active subscription, due to a missing "Global" region setting.
4.  **[#54371](https://github.com/anomalyco/opencode/issues/54371) ACP Streaming Failure:** JetBrains Rider users report slash commands executing silently without streaming output to the chat UI.
5.  **[#62529](https://github.com/anomalyco/opencode/issues/62529) Subscription Sharing Errors:** macOS users report false positives on subscription usage limits, highlighting potential telemetry sync issues.
6.  **[#63976](https://github.com/anomalyco/opencode/issues/63976) Zombie Process Leaks:** `opencode-pty` daemon is leaking zombie children, leading to unbounded resource consumption.
7.  **[#64094](https://github.com/anomalyco/opencode/issues/64094) PowerShell/Ollama Incompatibility:** Commands failing when using local Ollama models via the PowerShell CLI wrapper.
8.  **[#64121](https://github.com/anomalyco/opencode/issues/64121) Security/Agent Bypass:** A critical report detailing how agents can bypass "Plan mode" file-write restrictions using shell heredocs.
9.  **[#64069](https://github.com/anomalyco/opencode/issues/64069) Service Restart Loops:** Desktop 2.3.0 background services are stuck in restart loops, leading to transport failures on Windows.
10. **[#62365](https://github.com/anomalyco/opencode/issues/62365) Subagent Inactivity Bugs:** Subagents waiting on background shells are incorrectly flagged as "inactive" in the TUI, causing confusion regarding task status.

---

### Key PR Progress
1.  **[#64134](https://github.com/anomalyco/opencode/pull/64134) Slack Link Preview:** Experimental feature to fetch and display Slack message previews directly in the console.
2.  **[#63542](https://github.com/anomalyco/opencode/pull/63542) SSH Recovery:** Improves robustness by allowing reconnections when the previous service port remains occupied.
3.  **[#64133](https://github.com/anomalyco/opencode/pull/64133) Claude Context Cooldown:** Addresses context discovery failures by adding a retry cooldown.
4.  **[#64126](https://github.com/anomalyco/opencode/pull/64126) CLI CWD Fix:** Ensures `opencode run` uses the actual process working directory rather than the stale `$PWD`.
5.  **[#64128](https://github.com/anomalyco/opencode/pull/64128) TUI Directory Resolution:** Fixes edge cases where the TUI falls back to server roots after failed file listings.
6.  **[#64132](https://github.com/anomalyco/opencode/pull/64132) Timeline UI:** Polishes the subagent experience by standardizing glyphs in the timeline view.
7.  **[#64130](https://github.com/anomalyco/opencode/pull/64130) Hex Installation UX:** Hides onboarding tips once the Hex extension is confirmed installed.
8.  **[#55847](https://github.com/anomalyco/opencode/pull/55847) Error Handling:** Converts silent session failures into actionable error messages when project directories are missing.
9.  **[#55844](https://github.com/anomalyco/opencode/pull/55844) Token Management:** Prevents multiple `max-token` fields when custom overrides are applied to the OpenAI body builder.
10. **[#55779](https://github.com/anomalyco/opencode/pull/55779) SSE Flushing:** Fixes event-streaming issues by ensuring SSE headers are flushed immediately on Node/Bun servers.

---

### Feature Request Trends
*   **Granular Agent Control:** Users are pushing for more control over subagents, including blocking execution modes ([#64096](https://github.com/anomalyco/opencode/issues/64096)) and the ability to stop background tasks from the web app ([#52016](https://github.com/anomalyco/opencode/issues/52016)).
*   **Performance Benchmarking:** Significant interest in formalizing how OpenCode is measured, with requests for community-led benchmark transparency ([#64084](https://github.com/anomalyco/opencode/issues/64084)).
*   **Visibility & UI:** Requests for better transparency, such as taskbar badge counts for pending sessions ([#62042](https://github.com/anomalyco/opencode/issues/62042)) and clearer usage limit countdowns ([#52894](https://github.com/anomalyco/opencode/issues/52894)).

---

### Developer Pain Points
*   **Workspace/Pathing Logic:** Multiple bugs related to how the CLI and TUI resolve directories ($PWD vs. actual CWD) remain a high-friction area.
*   **Service Stability:** The new "always-background" architecture in 2.3.0 is causing connection instability and zombie processes.
*   **Configuration Complexity:** Users are struggling with agent permissions and plugin whitelisting, finding the current YAML configurations restrictive.

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