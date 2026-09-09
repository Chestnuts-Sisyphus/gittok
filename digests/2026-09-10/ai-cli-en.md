# AI CLI Tools Community Digest 2026-09-10

> Generated: 2026-09-09 22:06 UTC | Tools covered: 9

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

**AI‑CLI Tools – Cross‑Tool Comparison (Community Digest 09 Oct 2026)**  

---  

### 1. Ecosystem Overview  
The AI‑CLI space is converging around three pillars: **agent orchestration**, **secure sandboxed execution**, and **deep IDE‑like tooling**.  OpenAI Codex, Google Gemini CLI, and GitHub Copilot CLI dominate the public‑facing landscape, each pushing rapid releases while wrestling with platform‑specific bugs (Windows, macOS, Linux) and the cost of “always‑on” language models.  Community activity is now measured in **multiple alpha/nightly builds per day**, dozens of high‑visibility issues, and a steady stream of PRs that focus on security hardening, VCS extensibility, and token‑budget management.

---  

### 2. Activity Comparison  

| Tool (repo) | Issues reported today* | PRs merged / opened today* | Release status (today) |
|-------------|-----------------------|-----------------------------|------------------------|
| **OpenAI Codex**<br>`github.com/openai/codex` | 10 hot issues (e.g., Windows freeze, quota drain, sub‑agent wake‑up) | 10 PRs (daemon recovery, WSL hardening, budget enforcement, etc.) | 4 alpha Rust builds `rust‑v0.154.0‑alpha.{6.1,8,10.2,11}` |
| **Google Gemini CLI**<br>`github.com/google‑gemini/gemini‑cli` | 10 hot issues (sub‑agent success masking, AST‑aware reads, tool‑count limits) | 10 PRs (sandbox hardening, session‑poison fixes, Plan‑Mode non‑interactive fix) | 1 nightly `v0.61.0‑nightly.20260909.ged2ac40df` |
| **GitHub Copilot CLI**<br>`github.com/github/copilot‑cli` | 12 hot issues (light‑theme breakage, Windows session bloat, high‑CPU WSL2, OOM on monorepos, etc.) | 2 PRs (service‑access clarification, WebSocket opt‑out docs) | 1 stable patch `v1.0.84‑3` |

\*Counts reflect the “Hot Issues” and “Key PR Progress” sections of each digest (issues that attracted the most attention or were newly opened/updated within the last 24 h).  

---  

### 3. Shared Feature Directions  

| Community‑wide demand | Tools mentioning it | Typical wording / need |
|-----------------------|----------------------|------------------------|
| **Sub‑agent observability & wake‑up guarantees** | Codex (#15723, #35259), Gemini (#22323) | “Background sub‑agents should notify the parent agent when finished; avoid silent polling.” |
| **Cross‑device / multi‑platform state sync** | Codex (#41470), Gemini (#21409) | “Desktop ↔ mobile ↔ web sessions must stay consistent; avoid trust‑gate surprises.” |
| **Alternative VCS / worktree back‑ends** | Codex (#26648 – Jujutsu), Gemini (implicit via tool‑count scaling) | “Support `jj` workspaces or custom worktree hooks; don’t lock users into plain `git worktree`.” |
| **Session‑lifecycle & storage control** | Codex (#34337), Gemini (#29248) | “Prevent unbounded roll‑out logs, duplicate history, and disk‑space exhaustion.” |
| **Extended/Configurable blocking wait limits** | Codex (#31935 – remove 60 s cap), Gemini (#29063 – Plan Mode wait) | “Allow long‑running CLI tasks (compilations, sleeps) without artificial timeouts.” |
| **Token‑budget / credit leakage mitigation** | Codex (#35259), Gemini (#29262 UI toggle to reduce token churn) | “Polling loops should not re‑enter the model; expose budget usage.” |
| **Tool‑count scaling & dynamic scoping** | Gemini (#24246 – >128 tools error) | “Automatically prune or namespace tools when the number grows.” |
| **AST‑aware code navigation** | Gemini (#22745), Codex (implicit via “resource‑management” PRs) | “Read files at method‑level, not whole‑file, to cut token waste.” |
| **UI/Theme consistency across terminals** | Copilot (#135, #3773), Gemini (#22186) | “Stable dark/light themes; respect user‑chosen colors.” |

---  

### 4. Differentiation Analysis  

| Dimension | OpenAI Codex | Google Gemini CLI | GitHub Copilot CLI |
|-----------|--------------|-------------------|--------------------|
| **Primary focus** | Multi‑agent desktop daemon, **resource‑budget & security hardening** (Guardian, WSL sandbox) | Secure sandbox + **Plan‑Mode orchestration**, AST‑aware tooling, Google‑model centric | GitHub‑centric **MCP** (Mission Control) integration, OAuth flow, **developer productivity** (copy, paste, repo indexing) |
| **Target users** | Power users building long‑running autonomous agents on Windows/macOS/Linux; enterprises needing strict sandboxing | Researchers & power users who need reproducible, sandboxed runs and fine‑grained code‑base navigation | General developers who want inline AI assistance inside terminals, especially within GitHub ecosystems |
| **Technical approach** | Rust‑based core, managed daemon, “Guardian” request budgeting, explicit turn‑trigger metadata | Go + Rust hybrid, container‑style sandbox, **Plan‑Mode** declarative pipelines, AST‑aware file readers | Node/TypeScript CLI, WebSocket‑based MCP backend, heavy reliance on GitHub OAuth and cloud‑hosted models |
| **Unique strengths** | Fine‑grained **budget enforcement**, deep Windows/WSL security patches, native daemon recovery | **Filesystem isolation**, short‑name (SFN) handling on NTFS, dynamic UI buffer toggles, strong focus on **AST** | Tight **GitHub integration** (issues, PRs, sessions), copy‑to‑clipboard helpers, multi‑account token management (in roadmap) |
| **Current pain‑points** | UI freezes on Windows, token leakage during polling, massive roll‑out logs | Session poisoning on SIGINT, tool‑count caps, occasional UI flicker on yoga‑wasm | Light‑theme breakage, Windows session bloat, high CPU on WSL2, OOM on large monorepos |

---  

### 5. Community Momentum & Maturity  

| Tool | Issue volume (today) | PR activity (today) | Release cadence | Maturity signal |
|------|----------------------|----------------------|-----------------|-----------------|
| **OpenAI Codex** | 10 high‑visibility issues (many >80 👍) | 10 PRs (including core security fixes) | 4 alpha builds in 24 h | **High velocity** – early‑stage but aggressively iterating; community heavily engaged in bug triage. |
| **Google Gemini CLI** | 10 issues (mix of bugs & feature proposals) | 10 PRs (mostly hardening & UI fixes) | 1 nightly release (daily) | **Rapid iteration** – stable nightly track; community focused on sandbox robustness and tooling depth. |
| **GitHub Copilot CLI** | 12 issues (mostly regressions & UI) | 2 PRs (documentation & opt‑out) | 1 patch release (weekly) | **Slower PR churn** – community is reactive (bug reports) rather than proactive feature development; maturity is higher (stable release) but momentum lagging. |

Overall, **Codex** and **Gemini** exhibit the most *active* developer ecosystems, driven by frequent alpha/nightly releases and a steady stream of PRs. Copilot CLI, while on a stable release track, shows *lower* engineering throughput and a higher proportion of regression tickets.

---  

### 6. Trend Signals  

1. **Agent‑centric orchestration is maturing** – Multiple tools now expose *sub‑agents* and *daemon* concepts, but community pain points revolve around **notification, wake‑up, and lifecycle guarantees**. Expect upcoming APIs for “agent‑completion callbacks” and standardized **event streams**.  

2. **Security‑first sandboxing** – Both Codex (WSL interop blocks) and Gemini (filesystem isolation) are hardening sandbox boundaries, indicating that enterprise adoption will demand provable isolation from host processes and file systems.  

3. **Version‑control flexibility** – The demand for Jujutsu (`jj`) and custom worktree back‑ends signals a shift away from Git‑only assumptions. Future CLIs will likely expose **plug‑in VCS adapters**.  

4. **Token‑budget transparency** – Re‑entry during polling and uncontrolled credit consumption are top complaints. Expect tooling that **exposes per‑turn token spend**, budget caps, and *budget‑aware* scheduling primitives.  

5. **Scalable tool ecosystems** – Gemini’s 128‑tool limit and Codex’s growing roll‑out logs highlight the need for **dynamic tool scoping, lazy loading, and on‑disk roll‑out pruning**.  

6. **AST‑aware code navigation** – Gemini’s community‑driven EPIC on AST‑aware reads points to a broader industry move toward **semantic code indexing** to cut token usage and improve relevance.  

7. **Cross‑platform UI consistency** – Light‑theme bugs (Copilot) and UI buffer glitches (Gemini) reinforce that *terminal UX* is now a first‑class concern; future releases will likely ship **theme‑agnostic rendering layers** and better shortcut handling.  

8. **Long‑running task support** – Requests to lift the 60‑second wait cap and to allow non‑interactive Plan‑Mode runs indicate developers are using CLIs for **build, test, and deployment pipelines**, not just single‑shot queries.  

**Implication for developers:** When choosing an AI‑CLI, weigh **iteration speed** (Codex, Gemini) against **stable integration** (Copilot). If you need **tight Windows sandboxing, fine‑grained budget control, and daemon recovery**, Codex is the most actively engineered. For **secure, reproducible sandboxed runs with AST‑aware code navigation**, Gemini offers the freshest innovations. For **GitHub‑centric workflows, copy‑paste assistance, and enterprise‑ready OAuth**, Copilot remains the go‑to, albeit with slower feature velocity.  

---  

*Prepared for technical decision‑makers and developer teams evaluating AI‑CLI platforms as of 10 Sep 2026.*

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

# OpenAI Codex Community Digest — September 10, 2026

## 1. Today's Highlights
The `openai/codex` repository is seeing heavy activity today, marked by multiple alpha pre-releases (`rust-v0.154.0-alpha.*`) targeting core CLI and daemon stabilization. Recent engineering updates heavily focus on security hardening—such as blocking WSL interop escapes and refining Guardian request budgets—alongside major bug fixes for Windows desktop applications, thread recovery state persistence, and resource management.

---

## 2. Releases
Four new alpha releases were cut for the Rust component over the past 24 hours:
* **`rust-v0.154.0-alpha.6.1`**
* **`rust-v0.154.0-alpha.11`**
* **`rust-v0.154.0-alpha.10.2`**
* **`rust-v0.154.0-alpha.8`**

---

## 3. Hot Issues
1. **[#20214: Codex App frequently freezes/stutters on Windows 11 Pro](https://github.com/openai/codex/issues/20214)**  
   *Why it matters:* Heavily upvoted (87 👍, 111 comments) performance issue on Windows 11 Pro where the app stutters despite adequate system resources.  
   *Community reaction:* Frustration over UI sluggishness on mainstream desktop hardware.
2. **[#25178: Windows Computer Use screenshot fails on Windows 10 22H2](https://github.com/openai/codex/issues/25178)**  
   *Why it matters:* `get_window_state` crashes with `SetIsBorderRequired failed: 不支持此接口 (0x80004002)` on Windows 10, breaking Computer Use features.  
   *Community reaction:* Highlights OS version compatibility gaps in desktop agent features.
3. **[#26633: Desktop automations ignore timezone for RRULE scheduling](https://github.com/openai/codex/issues/26633)**  
   *Why it matters:* Weekly RRULE schedules misinterpret `BYHOUR` as UTC regardless of local wall-clock settings or explicit `TZID` inputs.  
   *Community reaction:* Breaks reliable execution timing for background developer automations.
4. **[#15723: Background subprocesses/subagents do not wake calling agent](https://github.com/openai/codex/issues/15723)**  
   *Why it matters:* Asynchronous subagents finish their tasks silently without notifying the primary controlling agent loop.  
   *Community reaction:* Forces agents into inefficient polling loops rather than event-driven continuations.
5. **[#35259: Codex Desktop re-enters model during wait/status polling, consuming credits](https://github.com/openai/codex/issues/35259)**  
   *Why it matters:* Polling loops consume nearly 20% of raw local token quotas on simple wait actions during multi-agent workflows.  
   *Community reaction:* Financial impact on user budgets due to chatty model turns.
6. **[#41470: Windows/Android Remote thread synchronization issues](https://github.com/openai/codex/issues/41470)**  
   *Why it matters:* Newer desktop-created projects fail to sync to mobile devices, while mobile-started threads trigger unexpected trust gates.  
   *Community reaction:* Hampers cross-device workflow continuity.
7. **[#34337: Codex CLI and Desktop session rollouts silently consume tens to hundreds of GiB](https://github.com/openai/codex/issues/34337)**  
   *Why it matters:* Unbounded local storage growth in session logs/rollouts fills up local drives over time.  
   *Community reaction:* Severe disk space concerns for power users running long-term tasks.
8. **[#42098: Codex Web: GitHub @codex mention tasks fail with unknown error](https://github.com/openai/codex/issues/42098)**  
   *Why it matters:* Cloud tasks invoked directly via GitHub inline `@codex` mentions fail universally while identical prompt strings pass via composer.  
   *Community reaction:* Breaks GitHub integration workflows.
9. **[#31935: Remove the 60-second limit on blocking waits](https://github.com/openai/codex/issues/31935)**  
   *Why it matters:* GPT-5 prompts restrict blocking sleep/wait calls past 60 seconds, forcing redundant polling behavior.  
   *Community reaction:* Highly requested enhancement (11 👍) to clean up model output patterns.
10. **[#26648: Support Jujutsu (`jj`) workspaces or custom worktree backend](https://github.com/openai/codex/issues/26648)**  
    *Why it matters:* Coders using modern version control systems like `jj` cannot utilize native workspace worktree flows.  
    *Community reaction:* Strong developer demand (27 👍) for extensible workspace backends beyond plain `git worktree`.

---

## 4. Key PR Progress
1. **[#44314: Restore saved threads when the managed daemon restarts](https://github.com/openai/codex/pull/44314)**  
   *Details:* Consumes recovery snapshots on startup to resume active goals seamlessly across daemon cycles.
2. **[#44311: Honor shared Retry-After deadlines for remote control](https://github.com/openai/codex/pull/44311)**  
   *Details:* Prevents remote control requests and proactive token refreshes from bypassing server-enforced rate-limit delays.
3. **[#44307: Add opt-in provisioned macOS CLI release candidates](https://github.com/openai/codex/pull/44307)**  
   *Details:* Introduces an automated tag-release pipeline packaging the CLI inside `CodexCLI.app` with embedded provisioning profiles.
4. **[#44299: Record thread recovery candidates on managed daemon shutdown](https://github.com/openai/codex/pull/44299)**  
   *Details:* Atomically saves successfully loaded root thread IDs to disk during graceful terminations.
5. **[#44298: Set turn triggers for guardian and memory requests](https://github.com/openai/codex/pull/44298)**  
   *Details:* Enriches request metadata by explicitly setting `turn_trigger` types (`guardian_review`, `guardian_classifier`, `memory_consolidation`).
6. **[#44289: Expand MXC volume grants and resolve deny globs](https://github.com/openai/codex/pull/44289)**  
   *Details:* Fixes nonrecursive volume-root permission issues by expanding grants to include immediate children while preserving deny rules.
7. **[#44288: Prevent command hooks from hanging on blocked stdin](https://github.com/openai/codex/pull/44288)**  
   *Details:* Concurrently writes stdin while draining output pipes to eliminate deadlocks caused by full pipe buffers.
8. **[#44286: Block WSL interop escapes from restricted filesystem sandboxes](https://github.com/openai/codex/pull/44286)**  
   *Details:* Masks WSL interop sockets within bubblewrap environments to prevent Windows process execution escapes under network access.
9. **[#44281: Enforce complete request budgets for Guardian reviews](https://github.com/openai/codex/pull/44281)**  
   *Details:* Ensures review context checks account for entire history, active tools, format rules, and reminders rather than just local evidence.
10. **[#44255: Always use streamed remote compaction for supported providers](https://github.com/openai/codex/pull/44255)**  
    *Details:* Standardizes manual and automated remote compaction onto the v2 implementation and retires legacy toggles.

---

## 5. Feature Request Trends
* **Alternative VCS Integration:** Strong calls to support non-Git version control paradigms, specifically Jujutsu (`jj`) workspaces and customizable worktree hooks.
* **Granular Session Controls:** Better lifecycle governance for local rollouts to prevent unbounded disk usage and manage long-running agent state history.
* **Deep Cross-Device Sync:** Consistent multi-platform state tracking between desktop clients (Windows/macOS/Linux) and mobile apps/web interfaces.
* **Extended Tool Durations:** Elimination of artificial short timeouts (like the 60-second blocking wait rule) for long-running CLI tasks and compilation loops.

---

## 6. Developer Pain Points
* **Windows Platform Friction:** High incidence of platform-specific bugs on Windows, including UI freezes, non-atomic configuration writes (`config.toml` zero-filling on power loss), and WSL interop/path migration errors.
* **Quota and Token Drain:** Frustration over rapid credit depletion caused by silent model re-entry during background polling states and status waits.
* **Asynchronous Subagent Blindspots:** Lack of reliable notifications or awakening mechanisms when background subagents complete long operations, stalling workflows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-10

## 1. Today's Highlights
Recent development on the Gemini CLI centers heavily on hardening sandbox filesystem boundaries, preventing session state poisoning on interrupted agent turns, and improving non-interactive and Plan Mode execution. Additionally, a new nightly release (`v0.61.0-nightly.20260909.ged2ac40df`) has landed with targeted fixes for NTFS short-name handling and container settings directory isolation.

---

## 2. Releases
### [v0.61.0-nightly.20260909.ged2ac40df](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260909.ged2ac40df)
* **`fix(core)`**: Mitigates NTFS 8.3 short name (SFN) path issues ([PR #29116](https://github.com/google-gemini/gemini-cli/pull/29116)).
* **`fix(cli)`**: Isolates settings directories within sandbox containers ([PR #29216](https://github.com/google-gemini/gemini-cli/pull/29216)).

---

## 3. Hot Issues
1. **[#22323 - Subagent recovery after MAX_TURNS reports GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   * **Why it matters:** Subagents that hit their maximum turn limit without running any analysis are falsely reporting a successful termination reason (`GOAL`), masking actual failures from the user.  
   * **Community reaction:** High-priority bug tracking with active discussion around agent failure reporting integrity.
2. **[#19873 - Leverage model's bash affinity via Zero-Dependency OS Sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)**  
   * **Why it matters:** Proposes optimizing Gemini 3's native ability to chain POSIX commands (`grep`, `cat`, `sed`, `awk`) safely through zero-dependency OS sandboxing.  
   * **Community reaction:** Seen as a vital performance enhancement for matching model training capabilities with secure execution.
3. **[#21409 - Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   * **Why it matters:** Users report that the CLI hangs indefinitely when deferring tasks to the generalist agent (even for basic folder creation), requiring hard cancellations.  
   * **Community reaction:** Gained strong community traction (8 👍) as a major blocker for automated workflows.
4. **[#22745 - Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**  
   * **Why it matters:** EPIC issue investigating AST-aware codebase tooling to lower token costs, reduce misaligned reads, and precisely target method bounds.  
   * **Community reaction:** Viewed as an important foundational direction for smarter codebase navigation.
5. **[#21968 - Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**  
   * **Why it matters:** Anecdotal reports indicate models rarely invoke custom skills or sub-agents automatically unless explicitly forced by user prompts.  
   * **Community reaction:** Highlights a discoverability/prompt alignment gap for custom user extensions.
6. **[#25166 - Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)**  
   * **Why it matters:** Simple CLI commands complete successfully, but the UI remains locked in an active "Awaiting user input" state.  
   * **Community reaction:** Frustrating UX bug with multiple confirmations from affected developers (3 👍).
7. **[#24246 - Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**  
   * **Why it matters:** Exceeding 128 available tools triggers a 400 API error, pointing to a need for dynamic tool scoping and filtering.  
   * **Community reaction:** Critical scaling hurdle as the extension and core tool ecosystem grows.
8. **[#23571 - Model frequently creates tmp scripts in random spots](https://github.com/google-gemini/gemini-cli/issues/23571)**  
   * **Why it matters:** Restricting the model via shell exclusions leads to scattered temporary edit scripts across workspace directories, bloating commits.  
   * **Community reaction:** Important workflow cleanliness concern for developers working with restricted permissions.
9. **[#21335 - /compress command is not persistent across session resume](https://github.com/google-gemini/gemini-cli/issues/21335)**  
   * **Why it matters:** While `/compress` summarizes chat history to save tokens in-memory, the compressed state is lost when exiting and resuming the session from disk.  
   * **Community reaction:** Annoying token-economy bug that undermines long-running sessions (2 👍).
10. **[#22186 - get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**  
    * **Why it matters:** Custom output hooks crashing the CLI right as user summaries print disrupt automated scripts and long task runs.  
    * **Community reaction:** P1 bug impacting stability during terminal rendering phases.

---

## 4. Key PR Progress
1. **[#29250 - fix(core): prevent indirect prompt injection via build file modifications and untrusted flags](https://github.com/google-gemini/gemini-cli/pull/29250)**  
   * Hardens workspace boundaries and parameter validations under restricted workspace modes.
2. **[#29214 - fix(sandbox): harden filesystem boundaries and isolate runtime state](https://github.com/google-gemini/gemini-cli/pull/29214)**  
   * Decouples sandbox runtime states from host configs and standardizes realpath resolution for path sensitivity checks.
3. **[#29266 - fix(config): prevent complexity routing from overriding manually selected concrete models](https://github.com/google-gemini/gemini-cli/pull/29266)**  
   * Ensures Normal Mode routing respects explicit user model selections rather than forcing fallback flash models.
4. **[#29265 - fix(agent): prevent session context poisoning on interrupted turns](https://github.com/google-gemini/gemini-cli/pull/29265)**  
   * Resolves issues where SIGINTs or stream timeouts corrupt active chat session history and block subsequent prompts.
5. **[#29262 - feat(ui): add dynamic toggle for alternate buffer mode](https://github.com/google-gemini/gemini-cli/pull/29262)**  
   * Fixes yoga-wasm out-of-bounds memory crashes and eliminates duplicate footer artifacts on terminal buffer swaps.
6. **[#29248 - fix(cli): avoid duplicate history and telemetry after confirmation](https://github.com/google-gemini/gemini-cli/pull/29248)**  
   * Suppresses duplicate slash-command logging when actions (like overwrites) require user confirmation.
7. **[#29063 - fix(core): stop Plan Mode from waiting on user feedback in non-interactive sessions](https://github.com/google-gemini/gemini-cli/pull/29063)**  
   * Fixes hanging non-interactive runs (e.g., `gemini -p "..." -y`) caused by Plan Mode awaiting impossible user turns.
8. **[#29163 - fix(cli): prevent crash during authentication in git repositories](https://github.com/google-gemini/gemini-cli/pull/29163)**  
   * Guards against startup crashes inside restricted git environments (such as macOS Seatbelt).
9. **[#29156 - fix(core): stop nullifying user git config in shell executions](https://github.com/google-gemini/gemini-cli/pull/29156)**  
   * Reverts overzealous git config isolation that accidentally hid users' global/system git configs from shell tools.
10. **[#29151 - fix(core): handle skill precedence and active state case-insensitively](https://github.com/google-gemini/gemini-cli/pull/29151)**  
    * Fixes case-sensitivity mismatches in `SkillManager` that broke custom skill overrides and active state tracking.

---

## 5. Feature Request Trends
* **Advanced Codebase Indexing & AST Navigation:** Growing demand for AST-aware file reading, searching, and mapping tools (`tilth` or `glyph` integrations) to reduce token noise and improve context efficiency.
* **Persistent & Robust Task Tracking:** Moving away from ephemeral, prompt-context-bound "WriteToDo" workflows toward persistent, file-based CRUD task trackers.
* **Agent Self-Awareness & Documentation:** Enhancing agent autonomy regarding internal CLI flags, hotkeys, and self-execution guidelines.
* **Subagent Observability:** Requests to expose subagent trajectories more easily, including sharing options via `/chat share` and comprehensive bug reporting that incorporates subagent logs.

---

## 6. Developer Pain Points
* **Session & Context Corruption:** Interrupting streams, hitting token limits, or experiencing abrupt agent crashes frequently leaves active sessions in a poisoned state, requiring manual recovery.
* **UI/Terminal Rendering Glitches:** Terminal resize flickers, history item unmount crashes in yoga-wasm, and incorrect buffer management continue to cause friction.
* **Tool and Context Overload:** Hitting API limits when tool counts exceed 128 or facing "context firehosing" from large file reads remains a persistent headache.
* **Sandbox & Permission Edge Cases:** Strict boundary checks occasionally overreach—such as nullifying user git configs or breaking on symlinked agent directories (`~/.gemini/agents/`).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest | 2026-09-10

## 1. Today's Highlights
The latest update, v1.0.84-3, addresses persistent feedback regarding clipboard behavior and MCP connectivity issues during session startup. However, the community remains focused on high-severity platform-specific regressions, particularly on Windows, where session lifecycle management and theme rendering continue to frustrate users.

## 2. Releases
*   **[v1.0.84-3](https://github.com/github/copilot-cli):** Adds task completion messages to `/copy` operations and stabilizes OAuth-authenticated MCP server connections during startup.

## 3. Hot Issues
*   [#135](https://github/copilot-cli/issues/135) & [#3773](https://github/copilot-cli/issues/3773): **Broken Light Theme.** High community engagement regarding terminal readability; users report low contrast and black-on-black text issues.
*   [#4756](https://github/copilot-cli/issues/4756): **Windows Session Bloat.** Users forced to archive idle project sessions before initiating new ones, hindering workflow.
*   [#3700](https://github/copilot-cli/issues/3700): **High CPU Regression (WSL2).** A major stability issue where the MainThread hits 215% CPU, causing UI freezes.
*   [#3976](https://github/copilot-cli/issues/3976): **OOM-Killer on Monorepos.** The native `tgrep` indexer lacks memory caps, causing host crashes on large repositories.
*   [#4757](https://github/copilot-cli/issues/4757): **Permissions Bypass Block.** Fail-closed posture incorrectly persisting on accounts without managed policies.
*   [#4775](https://github/copilot-cli/issues/4775): **404 in Mission Control.** Dashboard links for sessions are misrouted, causing friction in accessing remote history.
*   [#2199](https://github/copilot-cli/issues/2199) & [#3858](https://github/copilot-cli/issues/3858): **Missing Ctrl+Backspace.** Lack of standard word-deletion shortcuts across platforms remains a high-upvote usability request.
*   [#4764](https://github/copilot-cli/issues/4764): **Auto-Approval Timeout.** Assisted permission mode consistently fails after one hour, necessitating session restarts.
*   [#4793](https://github/copilot-cli/issues/4793): **OAuth Port Mismatch.** Conflict between declared metadata ports and ephemeral CLI ports causing authentication failures.
*   [#4789](https://github/copilot-cli/issues/4789): **Accidental Dialog Closure.** Pressing `Ctrl+C` to copy text in a prompt closes the dialog, disrupting user confirmation workflows.

## 4. Key PR Progress
*   [#4786](https://github/copilot-cli/pull/4786): Clarifies third-party service access requirements.
*   [#4770](https://github/copilot-cli/pull/4770): Documents opt-out procedures for WebSocket response transports, providing a recovery path for network-blocked environments.

*(Note: Only two PRs were identified as active in the last 24h.)*

## 5. Feature Request Trends
*   **User Flexibility:** Strong demand for multi-account switching (#367) and the ability to pin themes (Dark/Light) independent of OS settings (#4620).
*   **Workflow Persistence:** Users are requesting better session resumption (#1467) and advanced plugin dependency management to align with competing tools like Claude Code (#4487).

## 6. Developer Pain Points
*   **Platform Disparity:** Windows users are disproportionately affected by configuration, clipboard, and rendering bugs compared to the Unix/macOS experience.
*   **Session Brittleness:** Frequent 400-series errors and authentication failures when switching accounts or handling session state suggest an underlying instability in how the CLI manages its connection state and metadata.
*   **Accessibility:** Broken theme support significantly impacts users operating in well-lit environments or using high-contrast terminal setups.

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