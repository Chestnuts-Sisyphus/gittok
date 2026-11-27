# AI CLI Tools Community Digest 2026-11-27

> Generated: 2026-11-27 02:33 UTC | Tools covered: 9

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

**AI‑CLI Tool Landscape – 27 Nov 2026**  
*Compiled from the daily community digests of the major CLI‑based development assistants.*

---  

## 1. Ecosystem Overview  
The AI‑developer‑tool ecosystem is consolidating around four mature, open‑source CLI platforms – **Claude Code**, **GitHub Copilot CLI**, **OpenCode**, and **Pi**.  All of them expose a *Model‑Context Protocol (MCP)*‑style interface for “agents” that can run sub‑processes, edit files, and call external services, but each project is diverging in its priority set: Claude Code leans heavily on autonomous agent swarms, Copilot CLI on enterprise‑grade sandboxing and permission‑juggling, OpenCode on a mixed‑cloud/desktop experience with a strong sub‑agent model, and Pi on terminal‑first durability and protocol‑level interoperability.  The overall pace is high: each project logs 10‑plus hot issues daily and multiple PRs, indicating a vibrant, problem‑driven community.

---  

## 2. Activity Comparison (today)

| Tool (repo) | Open Issues (hot) | PRs updated/merged today | Release(s) today |
|-------------|-------------------|--------------------------|------------------|
| **Claude Code**<br>`anthropics/claude-code` | 10 (issues #66010 … #112627) | 4 PRs (ex. #112436, #35761, #35684, #35683) | **None** |
| **GitHub Copilot CLI**<br>`github/copilot-cli` | 10 (issues #5323 … #5581) | 0 PRs (no PR activity in the last 24 h) | 3 releases (v1.0.117‑5, ‑4, ‑3) |
| **OpenCode**<br>`anomalyco/opencode` | 10 (issues #23153 … #66249) | 10 PRs (ex. #66705, #66688, #66696, …) | **None** |
| **Pi**<br>`earendil-works/pi` | 10 (issues #12548 … #12547) | 10 PRs (ex. #12604, #12603, #12597, …) | **None** |
| **OpenAI Codex** | *No digest* | – | – |
| **Gemini CLI** | *No digest* | – | – |
| **Qwen Code** | *No digest* | – | – |
| **DeepSeek TUI** | *No digest* | – | – |

*“Hot” issues are the ones highlighted by the daily digest; the actual open‑issue count is higher, but the table reflects today’s most‑active tickets.*

---  

## 3. Shared Feature Directions  

| Common Need | Tools Raising It | Typical Request |
|-------------|------------------|-----------------|
| **Cross‑device / cloud‑backed configuration** | Claude Code, OpenCode, Pi | Sync `~/.claude/`, `service.json`, or Pi’s settings across macOS/Windows/Linux machines; optional account‑level store. |
| **Robust sandbox / permission model** | Copilot CLI, Claude Code, OpenCode | Granular “always‑allow” or pre‑approve lists for MCP tools, ability to disable automatic safety blocks that interrupt normal development. |
| **Agent / sub‑agent autonomy & lifecycle control** | Claude Code, OpenCode, Pi | Controls for foreground vs. background execution, checkpoint pruning, avoidance of “runaway” file‑watchers or memory leaks. |
| **Privacy & telemetry opt‑out** | Claude Code (MCP URL rewriting), Pi (DO_NOT_TRACK), Copilot CLI (network‑policy CA certs) | Ability to disable URL‑tracking, suppress usage surveys, and provide transparent logging of what data is sent. |
| **Local‑model / custom provider integration** | Copilot CLI (Fusion → vLLM), Pi (OMLX token inflation), OpenCode (Ollama max‑token bug) | Simple `providers.json` or `model.yaml` hooks that let a user point the CLI at a self‑hosted LLM without losing routing or safety features. |
| **Windows‑specific ergonomics** | Copilot CLI, Claude Code (process leaks on macOS but similar Windows concerns exist) | Fixes for Credential Manager bloat, TCP sandbox allow‑lists, and stable process cleanup on Win32. |
| **Better diagnostics for safety‑guard failures** | Claude Code (`reasoning_extraction` false‑positives), Copilot CLI (silent permission loss) | Structured error codes or “why blocked?” messages that developers can script against. |

---  

## 4. Differentiation Analysis  

| Dimension | Claude Code | GitHub Copilot CLI | OpenCode | Pi |
|-----------|------------|-------------------|----------|----|
| **Primary Audience** | AI‑research/agent‑swarm developers, heavy‑automation pipelines | Enterprise teams needing secure, sandboxed assistance; GitHub‑centric users | General developers seeking a “single‑pane” AI IDE with optional cloud subscription | Terminal‑power users & polyglot developers who want a *terminal‑first* AI assistant |
| **Core Technical Focus** | **Agent orchestration** (sub‑agents, MCP, safety guardrails) + macOS file‑watch stability | **Sandbox & permission system** (MCP tool approvals, network‑policy, credential handling) | **Hybrid desktop/TUI** + **sub‑agent execution model** (foreground vs background) + **billing/subscription** | **Protocol compliance** (OSC 7577, MCP, OMLX), **terminal state durability**, **privacy signals** |
| **Unique Features** | `write` tool guardrails, automatic “stale‑bot” policy, heavy file‑watch (`fseventsd`) monitoring | `sandbox.userPolicy.network.extraCaCertificates`, assisted permission judge, Fusion routing to multiple providers | `todowrite` experimental tool, session pinning, cryptocurrency payment option, granular subscription tiers | Kitty graphics pipeline, `deleteConversations`, `DO_NOT_TRACK`, explicit session‑resume protocol |
| **Platform Strength** | macOS‑centric (deep integration with `fseventsd`), Linux support | Strong Windows support (but still friction points), GitHub ecosystem integration | Strong cross‑platform (macOS, Linux, Windows) + mobile (iOS TestFlight) | Linux/macOS terminal focus; Windows support is secondary. |
| **Release Cadence** | No releases today; issue‑driven patches via PRs | Frequent micro‑releases (3 patches in the last day) | PR‑heavy (10 merged today) but no new release; stable v2 branch | PR‑heavy (10 merged) but no releases; focus on internal fixes. |

---  

## 5. Community Momentum & Maturity  

| Tool | Issue Velocity | PR Velocity | Release Frequency | Community Signals |
|------|----------------|-------------|-------------------|-------------------|
| **Claude Code** | 10 high‑impact issues (privacy, rate‑limit, macOS leaks) | 4 PRs (policy & plugin work) | No release today; last release was a few weeks ago | Mature but currently **maintenance‑heavy**; strong safety‑guard focus. |
| **Copilot CLI** | 10 issues, many enterprise‑oriented (sandbox, Windows, token limits) | 0 PRs today (recent fixes already merged) | 3 micro‑releases in the last 24 h → **rapid iteration** | Very active release pipeline; community pushes for enterprise stability. |
| **OpenCode** | 10 issues spanning billing, sub‑agent execution, macOS network | 10 PRs (bug fixes, docs, UI) | No release today; v2 is in a “steady‑state” phase | High PR throughput → **actively maintained**; community heavily invested in feature parity (desktop ↔ TUI). |
| **Pi** | 10 issues (terminal graphics, memory leaks, protocol bugs) | 10 PRs (telemetry, session‑resume, V8 GC) | No release today; focus on internal refactors | Strong engineering focus on **core infrastructure**; community size smaller but highly technical. |

Overall, **Copilot CLI** shows the fastest release cadence, while **OpenCode** and **Pi** demonstrate the highest PR‑to‑issue ratio, indicating rapid bug‑fix turnover. **Claude Code** has a slightly slower release rhythm but a concentrated set of high‑severity issues, suggesting a more mature but currently “bug‑fix‑heavy” phase.

---  

## 6. Trend Signals for Developers  

1. **Cross‑Device State Sync** – Re‑occurring requests (Claude Code, OpenCode, Pi) reveal a market need for cloud‑backed config, credential vaults, and prompt libraries.  A unified “account settings store” could become a differentiator.  

2. **Fine‑Grained Sandbox & Permission Controls** – Enterprises demand deterministic, auditable tool approvals (Copilot CLI, Claude Code).  Future CLIs will likely expose a *policy‑as‑code* DSL to pre‑declare allowed MCP calls.  

3. **Agent Autonomy vs. Safety Guardrails** – Claude Code’s aggressive safety filters clash with developer productivity, while OpenCode and Pi aim for lighter‑weight guards.  The trend points to *context‑aware* safety that can be toggled per‑session rather than a global block list.  

4. **Local‑Model First & Provider Flexibility** – Multiple projects (Copilot CLI Fusion, Pi OMLX, OpenCode Ollama) struggle with token‑limit handling and routing to self‑hosted LLMs.  Expect a standard “local‑provider” spec to emerge, abstracting token caps, temperature, and streaming quirks.  

5. **Windows‑Specific Friction** – Credential Manager overflow, sandbox TCP denials, and process‑leak handling are top pain points for Copilot CLI and Claude Code users on Windows.  Vendors that ship a *native Windows daemon* with automatic cleanup will gain enterprise adoption.  

6. **Telemetry Transparency & Opt‑Out** – Pi’s `DO_NOT_TRACK`, Claude Code’s MCP URL‑rewriting complaints, and Copilot CLI’s network‑policy CA support indicate a growing developer appetite for privacy‑first defaults and clear telemetry logs.  

7. **Session Resilience & Durability** – Pi’s OSC 7577 work, OpenCode’s “session pinning”, and Claude Code’s remote‑control transcript loss show that developers value *recoverable* AI sessions—particularly for long‑running code‑generation pipelines.  

**Implication:** When evaluating an AI‑CLI platform for production use, prioritize tools that already provide (or roadmap) **cloud‑synced configuration**, **granular sandbox policies**, **robust Windows support**, and **transparent local‑model integration**.  Those signals are converging across the ecosystem and will likely dictate the next generation of developer‑centric AI assistants.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

Here is the Claude Code Community Digest for November 27, 2026.

---

### Today's Highlights
Developer attention today centers on severe rate-limit consumption anomalies following recent v2.1.x updates, alongside persistent background process leaks impacting macOS stability. On the maintenance front, Anthropic engineers introduced policy changes to prevent stale-bot auto-closing on reproducible or data-loss issues. Meanwhile, community discussions heavily feature privacy concerns around MCP tools and hardcoded safety guardrails interfering with standard subagent workflows.

---

### Releases
*No new releases in the last 24 hours.*

---

### Hot Issues

1. **[#66010: GMail MCP Rewriting URLs with Google Tracking Parameters](https://github.com/anthropics/claude-code/issues/66010)**
   * **Why it matters:** Privacy-conscious developers report that the GMail Model Context Protocol (MCP) server mutates URLs inside email bodies into Google tracking links.
   * **Community reaction:** Highly active (29 comments, 15 upvotes). Users are raising red flags around automated telemetry injection and data integrity when handling enterprise communications.

2. **[#22648: Account-Level Settings Sync Across Devices](https://github.com/anthropics/claude-code/issues/22648)**
   * **Why it matters:** Configuration files currently remain tied to local `~/.claude/` directories, forcing multi-machine developers (e.g., Mac + Linux setups) to manually replicate rules and settings.
   * **Community reaction:** Strong backing with 54 upvotes and 27 comments; developers are urging Anthropic to implement cloud or account-backed config synchronization.

3. **[#98769: macOS `fseventsd` Runaway on Agent-Heavy Workloads](https://github.com/anthropics/claude-code/issues/98769)**
   * **Why it matters:** Heavy Claude Code sessions cause the macOS file system daemon (`fseventsd`) to inflate memory usage (up to 24 GB) and pin CPU cores, blocking Claude Code from launching.
   * **Community reaction:** Deep technical discussion around file-watching limits when orchestrating large agent swarms on macOS.

4. **[#44657: Subagent Write Tool Blocks Files Named "report", "summary", or "findings"](https://github.com/anthropics/claude-code/issues/44657)**
   * **Why it matters:** Subagents spawned via the Agent tool fail hardcoded guardrails when trying to write `.md` files with names like `report.md` or `summary.md` without an override setting.
   * **Community reaction:** 35 upvotes. Developers find the rigid prompt/tool constraint counterproductive for documentation-focused autonomous agents.

5. **[#112477: 5-Hour Usage Limit Jumps from 0% to 100% Instantly (v2.1.332)](https://github.com/anthropics/claude-code/issues/112477)** (See also [#110773](https://github.com/anthropics/claude-code/issues/110773))
   * **Why it matters:** Recent updates appear to introduce severe accounting regressions where a single short output or token reset immediately exhausts the 5-hour window limit.
   * **Community reaction:** High urgency among active users reporting broken workflows across Opus 5.5 and Sonnet 5.5 sessions.

6. **[#111336: False-Positive `reasoning_extraction` Safeguard Blocks Ordinary Dev Work](https://github.com/anthropics/claude-code/issues/111336)**
   * **Why it matters:** Automated safety filters are flagging standard software development prompts across Fable 5.2, Opus 5.5, and Sonnet 5.5 (78 reported blocks for a single user in one week).
   * **Community reaction:** Developers are requesting higher granularity or diagnostic transparency into why benign code requests trigger system blocks.

7. **[#87891: Background Daemon Process & Memory Leaks on macOS](https://github.com/anthropics/claude-code/issues/87891)** (See also [#104888](https://github.com/anthropics/claude-code/issues/104888))
   * **Why it matters:** Claude Code daemon fails to reap idle CLI processes and unclaimed MCP server instances, accumulating 60+ leaked processes (~7+ GB swap memory) after continuous operation.
   * **Community reaction:** Users are forced to set up cron jobs or custom scripts to manually terminate orphaned background processes.

8. **[#104123: Remote Control Resume Overwrites Local Transcripts (Data Loss)](https://github.com/anthropics/claude-code/issues/104123)**
   * **Why it matters:** Resuming a session via `claude remote-control` overwrites local `.jsonl` transcript histories with compacted server snapshots, truncating past conversation logs.
   * **Community reaction:** Critical concern for developers relying on local session histories for auditing and context reconstruction.

9. **[#86649: Pre-Approve Applications for Unattended Computer-Use Sessions](https://github.com/anthropics/claude-code/issues/86649)**
   * **Why it matters:** Interactive prompts for `request_access` halt background/scheduled workflows requiring automated GUI interaction when a developer is away from the machine.
   * **Community reaction:** Key bottleneck for developers building autonomous end-to-end testing agents.

10. **[#112627: Tool Name Collision Breaks Generated MCP TypeScript Declarations](https://github.com/anthropics/claude-code/issues/112627)**
    * **Why it matters:** If an MCP server tool contains an argument explicitly named `tool`, Claude Code's internal TypeScript generator strips `e.tool` and `e.tool_use_id` from `McpToolCallInput`.
    * **Community reaction:** Reproducible edge-case bug impacting developers building complex, nested MCP extensions.

---

### Key PR Progress

* **[#112436: Exclude Reproducible and High-Impact Issues from Stale Sweep](https://github.com/anthropics/claude-code/pull/112436)** *(OPEN)*
  * **Summary:** Adjusts stale-bot policies so issues tagged with `has repro`, `reproduced`, `data-loss`, or `high-priority` are never automatically closed due to inactivity.

* **[#35761: Add `powershell-default` Plugin](https://github.com/anthropics/claude-code/pull/35761)** *(CLOSED)*
  * **Summary:** Proposed replacing the default Bash tool shell with PowerShell 7+ (`pwsh`) across platforms via a dedicated plugin.

* **[#35684: Add `bridge-fix` Plugin for Chrome Extension Bridge](https://github.com/anthropics/claude-code/pull/35684)** *(CLOSED)*
  * **Summary:** Addressed connection dropouts between Claude desktop and the Chrome browser bridge extension for Max subscribers.

* **[#35683: Add Terminal `scroll-to-top` Fix Plugin](https://github.com/anthropics/claude-code/pull/35683)** *(CLOSED)*
  * **Summary:** Mitigated terminal output rendering issues where cumulative cursor movements jumped to the top of the viewport.

---

### Feature Request Trends

1. **Cross-Device State Management:** Increasing demand for synchronized settings, custom prompts, and agent permissions via Anthropic account logins rather than local-only config files.
2. **Unattended Automation Controls:** Requests for broad app pre-approval controls in computer-use mode, enabling background tasks to complete without manual confirmation dialogs.
3. **UI Customization & Telemetry Opt-Outs:** Strong preference for hiding persistent side panels (e.g., Environment panels) and disabling inline feedback/survey popups in desktop builds.

---

### Developer Pain Points

* **Rate Limit Inconsistencies:** The latest v2.1.332 patch cycle has triggered sporadic 5-hour usage limit spikes, where a small handful of short turns instantly consumes full rate quotas.
* **Process Lifecycle Leaks:** Daemon and desktop builds leak CLI sub-processes and MCP server instances, causing severe memory bloat over multi-day sessions.
* **Overly Aggressive Safety Safeguards:** Unintended false positives on standard code refactoring tasks (e.g., `reasoning_extraction` blocks and file naming bans) hinder agent independence.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest (2026-11-27)

### 1. Today's Highlights
Recent developments for the GitHub Copilot CLI focus heavily on enterprise extensibility, robust sandbox controls, and Model Context Protocol (MCP) stability. The latest patch releases (v1.0.117-3 through v1.0.117-5) introduce support for custom CA certificates in sandboxed environments and improve permission scoping between MCP tools and built-in CLI commands. Meanwhile, community discussions highlight edge cases around heavy agent workloads, Windows platform constraints, and integration limits with external clients like ACP.

---

### 2. Releases
* **v1.0.117-5**: Added `sandbox.userPolicy.network.extraCaCertificates` setting to trust custom CA certificates for sandboxed commands via TLS-intercepting proxies.
* **v1.0.117-4**: Fixed a UI bug where Page Down would stall at a pinned prompt in a 10-row terminal with tabs enabled.
* **v1.0.117-3**: Improved Assisted Permissions to prevent unnecessary confirmation prompts when Copilot stops a process it started within the same session ID. Also fixed a permissions bug where approving an MCP server's tools no longer inadvertently auto-approves built-in Copilot requests like shell execution.

---

### 3. Hot Issues
1. **[#5323 - Add setting to disable agent checkpoint refs (`refs/agents/*`)](https://github.com/github/copilot-cli/issues/5323)**  
   *Why it matters:* Every agent turn generates local git reference commits authored with the user's personal git identity, cluttering external repository tool views.  
   *Community Reaction:* Strong engagement (7 👍, 8 comments) from developers wanting cleaner repository histories.
2. **[#3563 - Tool approvals sometimes silently lost when Copilot CLI runs in parallel sessions](https://github.com/github/copilot-cli/issues/3563)**  
   *Why it matters:* Concurrent sessions writing to `permissions-config.json` overwrite each other's "Always allow" tool selections, degrading multi-window workflows.  
   *Community Reaction:* Addressed in recent releases, but highlights the friction of concurrent CLI state management.
3. **[#5464 - Stdio MCP server connection timeout triggers legacy initialize failure (-32022)](https://github.com/github/copilot-cli/issues/5464)**  
   *Why it matters:* Slower-starting MCP servers (such as those using Python SDK 2.3.0) cause connection lockouts when initialization protocol fallbacks overlap.  
   *Community Reaction:* Critical for ecosystem compatibility with external MCP servers.
4. **[#5580 - Windows sandbox blocks direct TCP connection despite allowlist](https://github.com/github/copilot-cli/issues/5580)**  
   *Why it matters:* Windows developers attempting to query internal services (like Nexus servers) hit `SocketErrorCode: AccessDenied` (Windows error 10013) even when correctly configured.  
   *Community Reaction:* A prominent Windows platform roadblock for enterprise setups.
5. **[#5571 - Updater fails with GHE.com-only login: GitHub credential owner did not provide a token](https://github.com/github/copilot-cli/issues/5571)**  
   *Why it matters:* GitHub Enterprise Cloud users on `*.ghe.com` hosts experience automatic updater failures due to token propagation gaps.  
   *Community Reaction:* Crucial blocker for automated enterprise lifecycle updates.
6. **[#5591 - Copilot CLI floods Windows Credential Manager with chunk entries (CredWrite error 8)](https://github.com/github/copilot-cli/issues/5591)**  
   *Why it matters:* Uncleaned OAuth and keychain chunks cause the Windows credential vault to reach capacity limits, eventually breaking other tools like Azure CLI.  
   *Community Reaction:* High severity for Windows power users running long-term sessions.
7. **[#5593 - Local sandbox blocks `git submodule update` even as a no-op](https://github.com/github/copilot-cli/issues/5593)**  
   *Why it matters:* Sandboxing breaks standard build scripts in multi-module repositories by preventing submodule verification.  
   *Community Reaction:* Direct regression impacting repository build integrity under sandbox enforcement.
8. **[#5592 - `getMessages` on large sessions kills stdio transport (write EINVAL)](https://github.com/github/copilot-cli/issues/5592)**  
   *Why it matters:* Sessions bloated with artifacts or heavy image logs crash the Rust JSON-RPC transport layer when driven via SDK.  
   *Community Reaction:* Important stability hurdle for programmatic CLI orchestration.
9. **[#5047 - Expose assisted approval in ACP mode](https://github.com/github/copilot-cli/issues/5047)**  
   *Why it matters:* Third-party Agent Client Protocol (ACP) clients like T3 Code cannot leverage Copilot's built-in safety judge automatically.  
   *Community Reaction:* Vital for standardizing security policies across non-native frontends.
10. **[#5581 - Copilot Fusion never routes to local OpenAI-compatible server (`vLLM`)](https://github.com/github/copilot-cli/issues/5581)**  
    *Why it matters:* Custom local endpoints declared in `providers.json` are bypassed by Fusion orchestration in favor of cloud models.  
    *Community Reaction:* Frustrates local-first developers looking to combine custom LLMs with routing features.

---

### 4. Key PR Progress
*(Note: No new pull requests were updated in the last 24 hours.)*

---

### 5. Feature Request Trends
* **Granular Sandbox & Git Control:** Users want explicit toggles to manage background git metadata pollution (e.g., disabling agent checkpoint refs) and finer networking/certificate overrides in enterprise environments.
* **Broader Client Ecosystem Interoperability:** Strong demand for extending advanced features—like assisted permission judges and account quota lookups—natively out to ACP and external SDK clients.
* **Local Model and Provider Flexibility:** Better integration paths for custom local endpoints (vLLM, local OpenAI-compatible servers) within enterprise routing features like Copilot Fusion.

---

### 6. Developer Pain Points
* **Windows Platform Friction:** Recurring issues regarding Windows Credential Manager exhaustion (`CredWrite error 8`), strict sandbox TCP access denials, and UNC path content policy rejections.
* **State and Cache Bloat:** Unbounded accumulation of marketplace clones, unpruned credential chunks, and heavy session payloads leading to stdio transport crashes (`write EINVAL`).
* **Silent Configuration Outages:** Lack of hot-reload mechanisms for settings/hooks changes (requiring full CLI restarts) and telemetry visibility gaps for background notifications or background task handling.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-11-27

## 1. Today's Highlights
The OpenCode community is heavily focused on v2 stability, addressing background service crashes, and resolving persistent subagent execution regressions. Notable contributions include critical safety guards against `Object.prototype` key injection and fixes preventing silent config wipes when `service.json` corruption occurs. Additionally, subscription and model resolution logic for ChatGPT accounts continue to see active triage and remediation.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues
1. **[#23153: [FEATURE]: Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153)**
   - *Why it matters:* Reflects strong international demand for alternative payment rails for OpenCode Go subscriptions.
   - *Community reaction:* Highly popular feature request with 74 👍 and 40 comments, closed after prolonged community discussion.
2. **[#64073: [FEATURE]: Restore Foreground Subagent Execution](https://github.com/anomalyco/opencode/issues/64073)**
   - *Why it matters:* Reverts a recent architectural change that forced all subagents into background mode, causing excessive parent wakeups.
   - *Community reaction:* Gaining heavy traction (38 comments) as users push back against background-only execution restrictions.
3. **[#52958: OpenCode Go subscription: all payment methods declined from Italy (EU)](https://github.com/anomalyco/opencode/issues/52958)**
   - *Why it matters:* Highlights geographic payment processing roadblocks affecting European users attempting to subscribe to OpenCode Go.
   - *Community reaction:* 33 comments from users experiencing identical Stripe/Apple Pay friction in EU regions.
4. **[#58080: macOS Local Network Privacy blocks background service from LAN hosts](https://github.com/anomalyco/opencode/issues/58080)**
   - *Why it matters:* macOS 15+ privacy protections prevent the background service from opening local network TCP sockets (`EHOSTUNREACH`).
   - *Community reaction:* Active technical discussion around shipping a signed `.app` bundle as a definitive workaround.
5. **[#56862: Subagents kept failing with context compaction](https://github.com/anomalyco/opencode/issues/56862)**
   - *Why it matters:* Subagents processing large files (100KB+) crash during context compaction despite staying within theoretical token limits.
   - *Community reaction:* Frustration among power users running heavy codebases through subagents.
6. **[#55764: [FEATURE]: Session pinning in the Desktop app (TUI parity)](https://github.com/anomalyco/opencode/issues/55764)**
   - *Why it matters:* Brings parity between the terminal user interface (TUI) and the Desktop application for organizing workflow sessions.
   - *Community reaction:* Continues to accumulate support as a long-awaited UX enhancement.
7. **[#60175: How should opening a path from an agent response work in the TUI?](https://github.com/anomalyco/opencode/issues/60175)**
   - *Why it matters:* Addresses a prominent Q&A friction point where clicking or accessing file paths generated by LLMs requires cumbersome manual copy-pasting.
   - *Community reaction:* Debating native interactive link bindings within terminal emulators.
8. **[#66699: cli: opencode run exits 1 with empty stderr on server-side session failures](https://github.com/anomalyco/opencode/issues/66699)**
   - *Why it matters:* Breaks automated scripts and CI pipelines when quota limits or server errors occur because no error text is written to stderr.
   - *Community reaction:* Critical bug report affecting headless automation workflows.
9. **[#64603: [FEATURE]: More TestFlight slots for OpenCode iOS, or an unsigned .ipa](https://github.com/anomalyco/opencode/issues/64603)**
   - *Why it matters:* Apple's TestFlight beta capacity is exhausted, locking out mobile app testers.
   - *Community reaction:* Users requesting fallback options like direct `.ipa` releases on GitHub.
10. **[#66249: ollama: no effective output cap — agent turns send max_completion_tokens](https://github.com/anomalyco/opencode/issues/66249)**
    - *Why it matters:* Local Ollama instances ignore `max_completion_tokens`, leading to unconstrained generation loops.
    - *Community reaction:* Highlights compatibility hurdles when running bleeding-edge features with local model runtimes.

---

## 4. Key PR Progress
1. **[#66705: fix(core): read ChatGPT plan speeds from the account's own model list](https://github.com/anomalyco/opencode/pull/66705)**
   - Resolves model visibility and speed-tier configuration discrepancies for "Sign in with ChatGPT" accounts.
2. **[#66704: fix(app): recover failed history reads after reconnecting](https://github.com/anomalyco/opencode/pull/66704)**
   - Fixes a bug where event stream reconnections left the app UI locked in a failed error boundary state.
3. **[#65951: fix(desktop): leave Flatpak updates to Flatpak](https://github.com/anomalyco/opencode/pull/65951)**
   - Prevents embedded update prompts inside Flatpak builds from conflicting with Flathub's package manager lifecycle.
4. **[#66680: docs: document the experimental todowrite tool in v2](https://github.com/anomalyco/opencode/pull/66680)**
   - Adds missing official documentation for the `todowrite` tool shipped under `experimental.todo`.
5. **[#66695: fix(core): watch the branch ref that HEAD points at](https://github.com/anomalyco/opencode/pull/66695)**
   - Fixes stale "Branch changes" UI refreshes tied to Git HEAD state changes.
6. **[#66029: fix(tui): deduplicate slash autocomplete and preserve local command execution](https://github.com/anomalyco/opencode/pull/66029)**
   - Resolves conflicts when a slash command is registered simultaneously on the server and locally inside the TUI.
7. **[#66696: fix(core): keep Code Mode agent() children from notifying parent](https://github.com/anomalyco/opencode/pull/66696)**
   - Prevents subagent execution steps in Code Mode scripts from polluting the parent session with excessive background notifications.
8. **[#66670: fix(data): guard alias and catalog lookups against Object.prototype keys](https://github.com/anomalyco/opencode/pull/66670)**
   - Patches internal data endpoints against HTTP 500 errors caused by malicious or accidental property name collisions (`__proto__`, `constructor`).
9. **[#66687: fix(cli): refuse to overwrite an invalid service.json](https://github.com/anomalyco/opencode/pull/66687)**
   - Prevents startup syntax errors or typos in `service.json` from silently wiping out stored local server configuration.
10. **[#66688: fix(client): log client recovery kills of the background service](https://github.com/anomalyco/opencode/pull/66688)**
    - Adds audit logging when client recovery routines issue `SIGKILL` to unresponsive background servers.

---

## 5. Feature Request Trends
* **Cross-Platform Parity & Accessibility:** High demand for bringing TUI capabilities (like session pinning) to the Desktop app, alongside requests for expanded mobile distribution channels (TestFlight capacity, raw `.ipa` downloads).
* **Alternative Billing Rails:** Continued user advocacy for cryptocurrency payments and regional Stripe/EU billing fixes for OpenCode Go.
* **Advanced Subagent Controls:** Strong developer pushback against forced background subagent execution, with requests for granular scheduling, reduced context pollution, and foreground execution options.
* **Ecosystem & Skill Extensions:** Integrations for specialized plugins (such as LiteLLM skills installation and Atlassian Rovo MCP support).

---

## 6. Developer Pain Points
* **Silent Failures in CI/Headless Scripts:** CLI commands like `opencode run` exiting with status `1` and empty stderr streams during server-side quota or provider failures, leaving automation blind.
* **Config Erasure on Malformed Files:** Local environment configuration (`service.json`) being silently wiped out when parsing fails, requiring manual reconfiguration.
* **Local Network & OS Permissions:** macOS local network privacy restrictions (`EHOSTUNREACH`) blocking background communication with LAN services unless properly signed.
* **Subagent Context Bloat:** Compaction failures and token limit overflows occurring unexpectedly when subagents parse large files during deep codebase explorations.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest: 2026-11-27

### 1. Today's Highlights
The Pi ecosystem saw a surge in refinement focused on terminal robustness, session management, and AI provider compatibility. Significant progress was made on the "Program Resume" protocol (OSC 7577), ensuring terminal sessions remain recoverable after crashes or updates. Additionally, maintainers are actively addressing telemetry transparency and fixing long-standing issues with Kitty graphics rendering in terminal emulators.

### 2. Releases
*None in the last 24 hours.*

### 3. Hot Issues
1. **[#12548](https://github.com/earendil-works/pi/issues/12548) Kitty image loss:** Resolved; fixed image scrollback wipes and rendering issues in Konsole.
2. **[#12546](https://github.com/earendil-works/pi/issues/12546) Memory leaks:** Addressed issues where `AgentSession` closures prevented V8 garbage collection, causing OOMs.
3. **[#12564](https://github.com/earendil-works/pi/issues/12564) Terminal cleanup:** Fixed broken PowerShell prompts caused by Pi dying while Kitty keyboard reporting was active.
4. **[#12418](https://github.com/earendil-works/pi/issues/12418) Copilot reasoning:** Fixed a bug where `reasoning_opaque` data was lost during OpenAI completions replay.
5. **[#12512](https://github.com/earendil-works/pi/issues/12512) Durable task draining:** Tracking a request to allow pausing task dispatch during shutdown for cleaner lifecycle management.
6. **[#12509](https://github.com/earendil-works/pi/issues/12509) Kimi API streaming:** Addressed inconsistencies in function call splitting that caused duplicate ID errors.
7. **[#12565](https://github.com/earendil-works/pi/issues/12565) Transcript visibility:** Proposal to keep pre-compaction messages visible to preserve context.
8. **[#12515](https://github.com/earendil-works/pi/issues/12515) Bun binary compatibility:** Fixed diagnostic degradation in standalone Bun builds due to missing `undici.install` shims.
9. **[#12593](https://github.com/earendil-works/pi/issues/12593) OMLX prompt cache:** Investigating extreme token inflation (56k tokens) on local OMLX backends.
10. **[#12547](https://github.com/earendil-works/pi/issues/12547) System prompt stability:** High-priority issue regarding tool list reordering causing prompt cache misses.

### 4. Key PR Progress
1. **[#12604](https://github.com/earendil-works/pi/pull/12604)**: Added support for GitHub Copilot `mai-code` models by ignoring unsupported temperature parameters.
2. **[#12603](https://github.com/earendil-works/pi/pull/12603)**: Enhanced `Pi Durable` to allow hosts to control where runnable tasks start.
3. **[#12597](https://github.com/earendil-works/pi/pull/12597)**: Optimized Kitty image appending to prevent unnecessary full-screen redraws.
4. **[#12556](https://github.com/earendil-works/pi/pull/12556)**: Added support for `DO_NOT_TRACK` signals to improve telemetry privacy.
5. **[#12601](https://github.com/earendil-works/pi/pull/12601)**: Implemented proper terminal state resets for cleaner exits after a process crash.
6. **[#12592](https://github.com/earendil-works/pi/pull/12592)**: Fixed token estimation bugs caused by counting background `!!` command outputs.
7. **[#12562](https://github.com/earendil-works/pi/pull/12562)**: Added `deleteConversations` functionality to allow complete cleanup of aborted tasks and forks.
8. **[#12579](https://github.com/earendil-works/pi/pull/12579)**: Enabled runtime outbox switching for store management.
9. **[#12584](https://github.com/earendil-works/pi/pull/12584)**: Documented telemetry and network request behaviors.
10. **[#12557](https://github.com/earendil-works/pi/pull/12557)**: Implemented OSC 7577 support, enabling robust cross-restart session recovery.

### 5. Feature Request Trends
*   **Protocol Adoption:** Significant push to support standard protocols like OSC 7577 (session resume) and MCP (Model Context Protocol).
*   **Infrastructure Control:** High demand for granular control over task lifecycles, file mutation serialization, and durable store purging.
*   **Privacy & Transparency:** Growing focus on "Privacy-First" features, including `DO_NOT_TRACK` honor and detailed telemetry documentation.

### 6. Developer Pain Points
*   **Environment Drift:** Frustration with `sudo pi update` breaking user-level permissions and managed installations.
*   **Performance/Cache Sensitivity:** Developers are hitting prompt cache misses due to minor, non-functional changes in tool registration order or system prompt generation.
*   **Tooling "Blind Spots":** Errors in `codemode` or extension scripts often provide insufficient context (lack of source excerpts), forcing LLMs to guess on syntax fixes.

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