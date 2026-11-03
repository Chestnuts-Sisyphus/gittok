# AI CLI Tools Community Digest 2026-11-03

> Generated: 2026-11-03 01:55 UTC | Tools covered: 9

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

**AI‑CLI Tools – Cross‑Tool Comparison (2026‑11‑03)**  

---  

### 1. Ecosystem Overview  
The AI‑CLI landscape is maturing into a set of specialised “agent‑as‑a‑tool” platforms that blend LLM inference, local tooling, and orchestration primitives.  Recent releases show a strong push toward **privacy guardrails, extensible model back‑ends (BYOK), and cross‑device remote control**, while each project still wrestles with platform‑specific stability and migration pain points.  Community activity is concentrated around Claude Code, GitHub Copilot CLI, OpenCode and Pi, indicating a healthy, competitive ecosystem that is rapidly iterating on core‑agent features.

---  

### 2. Activity Comparison  

| Tool (repo) | Hot Issues (today) | PRs (today) | Release today? | Notes |
|-------------|-------------------|------------|----------------|-------|
| **Claude Code** (anthropics/claude-code) | 9 | 1 (closed) | **v2.1.317** (privacy guardrails, connector warnings) | Issues dominated by safety‑filter false‑positives, token‑spike alerts, macOS TCC prompts. |
| **GitHub Copilot CLI** (github/copilot-cli) | 10 | 10 (mix of open & merged) | **v1.0.106‑5 / ‑4 / ‑3** (ACP parity fixes, session‑picker, opt‑in session mgmt) | Heavy focus on ACP protocol, model‑switching, and cross‑platform quirks. |
| **OpenCode** (anomalyco/opencode) | 10 | 10 (open & closed) | – (no release) | Migration‑to‑V2 friction, token‑budget bugs, and project‑sidebar UX requests are top of the queue. |
| **Pi** (earendil‑works/pi) | 10 | 10 (open & merged) | **v1.5.0** (extension changelogs, performance fixes) | CPU‑spike on macOS, grepping OOM, and extension‑loader security are the most urgent topics. |
| **Kimi Code** (MoonshotAI/kimi-cli) | 0 | 0 | – | No activity in the last 24 h. |
| **OpenAI Codex** (openai/codex) | N/A | N/A | N/A | Digest generation failed – no data. |
| **Gemini CLI** (google‑gemini/gemini-cli) | N/A | N/A | N/A | Digest generation failed – no data. |
| **Qwen Code** (QwenLM/qwen-code) | N/A | N/A | N/A | Digest generation failed – no data. |
| **DeepSeek TUI** (Hmbown/DeepSeek‑TUI) | N/A | N/A | N/A | Digest generation failed – no data. |

*Counts reflect the “Hot Issues” list and the “Key PR Progress” list published in each digest.*

---  

### 3. Shared Feature Directions  

| Community‑wide Requirement | Tools Mentioning It | Typical Use‑Case |
|----------------------------|----------------------|------------------|
| **Explicit privacy / data‑egress guardrails** | Claude Code (prompt before sending emails), OpenCode (credential redaction in logs), Pi (OAuth refresh‑token loss handling), Copilot CLI (token‑rotation stability) | Prevent accidental leakage of PII or credentials when agents invoke external tools. |
| **BYOK / multi‑model switching** | Copilot CLI ( `/model` picker for local/custom providers), Pi (model‑usage visibility, OpenRouter fixes), Claude Code (Agent SDK connector config), OpenCode (model usage in settings) | Enable developers to test proprietary or on‑prem LLMs alongside hosted services. |
| **Remote / cross‑device orchestration** | Claude Code (Remote Control sync & spawning sub‑sessions), Copilot CLI (voice‑mode remote control via GitHub Mobile), Pi (namespacing for extensions, future durable‑task APIs) | Seamless hand‑off between desktop, mobile, and CI agents. |
| **Fine‑grained session / token management** | Claude Code (weekly token‑spike alerts), OpenCode (`keep.tokens` enforcement, compaction bugs), Copilot CLI (session‑picker, ACP session lifecycle), Pi (context‑window mismatches) | Keep quota consumption predictable and avoid runaway context growth. |
| **Platform‑specific reliability** | Claude Code (macOS TCC re‑prompts), Copilot CLI (WSL2 `/keep-alive`, Windows crash 0xc0000005), Pi (macOS CPU‑spike, Windows OOM in grep), OpenCode (Windows root‑path bug) | Stabilise agents on macOS, Windows, Linux/WSL for enterprise adoption. |
| **Improved diagnostics & transparency** | OpenCode (`opencode doctor`, model‑usage UI), Pi (extension changelog, storage‑replication status), Claude Code (triage of false‑positive cybersecurity filters) | Give developers actionable visibility into agent health and configuration. |

---  

### 4. Differentiation Analysis  

| Dimension | Claude Code | GitHub Copilot CLI | OpenCode | Pi | Kimi Code |
|-----------|-------------|--------------------|----------|----|-----------|
| **Core Focus** | Safety‑first agent SDK, web/shell tool guardrails, enterprise‑grade security policies. | ACP protocol & tight integration with GitHub services; heavy emphasis on commit‑automation and model‑provider parity. | Migration from V1 → V2, project‑scoped sessions, token‑budget enforcement. | Extensible TUI with plugin ecosystem, multi‑provider adapters, UI‑centric workflow. | Currently dormant; last release unknown. |
| **Target Users** | Enterprise developers needing strict data compliance and scheduled‑task automation. | GitHub‑centric teams, CI/CD pipelines, and developers wanting seamless code‑generation inside terminals. | Power users migrating legacy setups, teams managing large multi‑repo workspaces. | Developers who prefer a full‑screen terminal UI, extension authors, and those integrating many external LLM services. |
| **Technical Approach** | Agent SDK with `onFailure` hooks, explicit “privacy guardrails”, connector‑transparent scheduling. | Agent Client Protocol (ACP) with JSON‑RPC, session‑picker UI, model‑switching via environment vars. | Core written in TypeScript/React TUI, “keep.tokens” compaction algorithm, migration scripts. | Rust‑based core, extension manager, streaming tools (ripgrep), per‑extension changelog UI. |
| **Unique Strengths** | Built‑in safety blocklists, proactive e‑mail‑transmission prompts, strong auditability. | Deep GitHub ecosystem integration (pull‑request bots, Co‑authored‑by handling). | Comprehensive migration tooling, diagnostics (`opencode doctor`). | Rich UI, extensibility, transparent update changelogs, multi‑model adapters. |
| **Current Weaknesses** | Over‑aggressive safety filters (Reddit/Naver blocks) and token‑spike mystery. | Fragile custom‑model API handling (HTTP 400/429 bugs) and Windows/WSL power‑state quirks. | V2 migration bugs (global session loss, non‑git project resolution). | High CPU on macOS, Grep OOM, extension loader security risk. |

---  

### 5. Community Momentum & Maturity  

| Tool | Issue Velocity (open → closed today) | PR Velocity | Release Cadence | Maturity Signal |
|------|--------------------------------------|------------|----------------|-----------------|
| **Claude Code** | 9 hot issues, many still open (safety‑filter & token spikes) → active discussion | 1 PR (closed) | Minor patch (v2.1.317) released today | **High activity, early‑stage safety focus** |
| **GitHub Copilot CLI** | 10 hot issues, many with multiple comments → vibrant community | 10 PRs (mix of merged & open) | Three incremental releases (v1.0.106‑5/‑4/‑3) in 24 h | **Rapid iteration, mature but still stabilising** |
| **OpenCode** | 10 hot issues (incl. free‑tier billing) → strong user‑base pressure | 10 PRs (several open) | No release today (post‑V2 rollout) | **Stable core, migration‑driven growth** |
| **Pi** | 10 hot issues (CPU, OOM, auth) → high‑priority bugs being addressed | 10 PRs (several merged) | New major release v1.5.0 | **Fast‑moving UI‑first project, gaining traction** |
| **Kimi Code** | 0 | 0 | – | **Dormant** |
| **OpenAI Codex / Gemini CLI / Qwen Code / DeepSeek TUI** | N/A | N/A | N/A | **No public data; unknown activity** |

Overall, **Claude Code, Copilot CLI, OpenCode, and Pi** demonstrate the most vibrant ecosystems. Copilot CLI shows the highest release velocity, while Pi’s major version bump signals a milestone. Kimi Code’s inactivity suggests either a stalled roadmap or a very low‑traffic user base.

---  

### 6. Trend Signals (Implications for Developers)

1. **Privacy‑first Guardrails Are Becoming a Baseline**  
   Multiple projects now require explicit user confirmation before transmitting personal data (Claude Code) or automatically redact credentials (OpenCode).  Expect future CLIs to embed privacy dialogs and audit logs as default behavior.

2. **BYOK & Multi‑Model Flexibility Is a Competitive Differentiator**  
   The demand for `/model` switching, local LLM adapters, and transparent model‑usage dashboards (Copilot CLI, Pi, OpenCode) indicates developers will increasingly run heterogeneous model stacks.  Tooling that abstracts provider differences while preserving a stable CLI contract will win adoption.

3. **Remote & Multi‑Device Orchestration Moves Beyond Text**  
   Voice‑enabled remote control (Copilot CLI), session‑spawning via Remote Control (Claude Code), and namespace‑aware extensions (Pi) point to a future where agents are managed across desktop, mobile, and CI agents as a single “session fabric”.

4. **Token & Context Budgeting Is a Top‑Tier UX Concern**  
   Sudden token‑spike reports (Claude) and unbounded `keep.tokens` walks (OpenCode) show that developers need deterministic quota accounting, auto‑compaction, and clear usage dashboards.

5. **Platform‑Specific Reliability Remains the Biggest Friction**  
   macOS TCC prompts, Windows access‑violation crashes, WSL power‑state bugs, and high‑CPU regressions dominate issue counts.  Enterprises will favor tools that provide **native OS integration layers** or clear guidance for MDM/enterprise policies.

6. **Migration‑Focused Tooling Is Gaining Momentum**  
   OpenCode’s V2 migration and Claude’s triage of false‑positive cybersecurity filters illustrate a broader ecosystem shift: as CLI agents mature, they must support **backward‑compatible upgrades** and **smooth data migrations** to retain existing user bases.

---

**Takeaway for Decision‑Makers**  

- If **privacy compliance and scheduled‑task automation** are non‑negotiable, Claude Code currently offers the most explicit guardrails, albeit with aggressive safety filters that may require policy tuning.  
- For teams deeply invested in **GitHub workflows, ACP‑based automation, and commit‑level controls**, Copilot CLI delivers the richest integration and the fastest release cadence.  
- Organizations with **large, multi‑repo workspaces** and a need for **project‑scoped session isolation** should look at OpenCode, especially once the V2 migration stabilises.  
- Teams that value a **full‑screen UI, extensible plugin ecosystem, and multi‑provider model switching** will find Pi the most compelling, provided they can mitigate the current macOS CPU and Windows memory issues.  

Monitoring the evolution of privacy guardrails, BYOK support, and cross‑device remote orchestration will be essential as the AI‑CLI market converges on a common set of enterprise‑ready capabilities.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

Here is the **Claude Code Community Digest for 2026-11-03**.

---

### 1. Today's Highlights
Release **v2.1.317** introduces tighter security controls, requiring explicit user prompts before transmitting email addresses over network tools and warning about unrequested connectors in cloud scheduled tasks. Meanwhile, project triage resolved a massive batch of false-positive cybersecurity filter issues reported against routine coding tasks. Community discussions remain heavily focused on strict domain safety blocklists, unexpected weekly token usage spikes, and macOS permission prompts caused by versioned binary installation paths.

---

### 2. Releases
* **[v2.1.317](https://github.com/anthropics/claude-code/releases/tag/v2.1.317)**
  * **Privacy Guardrails**: Prompt confirmation added before web or shell tools transmit account email addresses across the network.
  * **Task Connector Transparency**: `/schedule` now warns users if new cloud-scheduled tasks automatically receive unrequested connectors, providing instructions for removal.
  * **Agent SDK**: Added `onFailure: "block"` configuration support for Agent SDK hooks.

---

### 3. Hot Issues

1. **[#95326](https://github.com/anthropics/claude-code/issues/95326): `reddit.com` and `redd.it` blocked in Claude in Chrome** *(29 comments, 👍 35)*
   * **Summary**: Chrome extension users report that all tools on Reddit domains fail with "not allowed due to safety restrictions."
   * **Why it matters**: Severe workflow blocker for developers relying on web-browsing capabilities to search technical support forums and developer communities.

2. **[#105240](https://github.com/anthropics/claude-code/issues/105240): Sudden weekly usage spikes reaching 94% in <48 hours** *(15 comments, 👍 4)*
   * **Summary**: WSL and desktop users report an abrupt increase in backend token usage despite unchanged local activity.
   * **Why it matters**: Paying tier allocations (Max 5x) are being depleted rapidly, pointing to potential context-looping bugs or altered token accounting.

3. **[#63671](https://github.com/anthropics/claude-code/issues/63671): Versioned install path triggers macOS TCC re-prompts on every update** *(13 comments, 👍 27)*
   * **Summary**: Installing raw executables to `~/.local/share/claude/versions/<version>/` breaks macOS TCC tracking, requiring users to re-grant system permissions after every CLI update.
   * **Why it matters**: Frustrates enterprise users managed by MDM PPPC profiles and disrupts background scheduled actions.

4. **[#105477](https://github.com/anthropics/claude-code/issues/105477): Model performance regression with Opus 5.5 in Claude Code** *(3 comments, 👍 14)*
   * **Summary**: Heavy daily users report Opus 5.5 in Claude Code ignoring loaded project rules/skills and stalling during long-running tasks.
   * **Why it matters**: Highlights concerns among high-tier subscribers regarding model consistency and feedback channels.

5. **[#95539](https://github.com/anthropics/claude-code/issues/95539): `naver.com` domains blocked by default safety filters** *(5 comments, 👍 7)*
   * **Summary**: Korean developers report false-positive safety blocks on Naver, South Korea's primary web platform.
   * **Why it matters**: Domain-wide default blocklists impact international developers working on regional API integrations.

6. **[#102265](https://github.com/anthropics/claude-code/issues/102265): Short-lived subcommands exit mid-OAuth refresh and invalidate credentials** *(5 comments)*
   * **Summary**: Executing short CLI commands (e.g., `claude plugin validate`) while a token rotation is in progress causes rotated tokens to be lost, logging the user out.
   * **Why it matters**: Unreliable token state management breaks CI/CD pipelines and automated CLI scripts.

7. **[#90833](https://github.com/anthropics/claude-code/issues/90833) (and related cyber issue wave)**: Safety safeguard false-positives halting routine code edits *(4 comments)*
   * **Summary**: A batch of reports logged false positives where cybersecurity classifiers blocked basic developer actions like unit test refactoring, accent color edits, and documentation generation. (Most items in this batch have now been triaged and closed).

8. **[#104749](https://github.com/anthropics/claude-code/issues/104749): Remote Control `/rename` fails to sync to iOS app** *(4 comments)*
   * **Summary**: Modifying session names via `/rename` or `/remote-control <name>` doesn't update session titles in the mobile Claude app.
   * **Why it matters**: Impairs session tracking when managing multi-device workflows.

9. **[#104219](https://github.com/anthropics/claude-code/issues/104219): Feature Request: Spawning child sessions via Remote Control** *(3 comments, 👍 2)*
   * **Summary**: Proposes allowing active desktop sessions to programmatically trigger and start new sessions upon receiving Remote Control messages.

---

### 4. Key PR Progress

1. **[#106583](https://github.com/anthropics/claude-code/pull/106583) (CLOSED)**: *Move issue triage and dedupe workflows to Claude Sonnet 5.5*
   * **Summary**: Upgrades repository maintenance actions (`claude-issue-triage.yml`, `claude-dedupe-issues.yml`, and `@claude` bot handlers) to use `claude-sonnet-5-5`.
   * **Impact**: Improves automated issue categorization accuracy and duplicate detection across the repo.

---

### 5. Feature Request Trends
* **Cross-Device Remote Orchestration**: Developers want deeper remote session control, including sync features between desktop/mobile environments and the ability to spawn multi-agent sub-sessions via Remote Control messages ([#104219](https://github.com/anthropics/claude-code/issues/104219), [#104749](https://github.com/anthropics/claude-code/issues/104749)).
* **Granular Task & Privacy Controls**: Increased demand for explicit controls over implicit tools, such as connector permissions on scheduled tasks and tighter data-egress guardrails (reflected in release [v2.1.317](https://github.com/anthropics/claude-code/releases/tag/v2.1.317)).

---

### 6. Developer Pain Points
* **Overzealous Safety Filters**: False positives block developer browsing (Reddit, Naver) and halt routine local coding tasks (refactoring, API documentation writing).
* **Unexpected Token Consumption**: Sudden usage surges draining tier quotas prematurely without explicit changes in developer activity.
* **macOS TCC Fatigue**: Re-authorization prompts after every version update due to unbundled binary installation structures.
* **CLI OAuth Instability**: Token rotation failures during short CLI invocations causing unexpected logouts.

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

# GitHub Copilot CLI Community Digest — 2026-11-03

## 1. Today's Highlights
The latest release cycle (`v1.0.106-3` through `v1.0.106-5`) aggressively addresses ACP (Agent Client Protocol) parity issues, fixing bugs where settings like `includeCoAuthoredBy: false` were ignored. Meanwhile, community discussions center heavily on expanding custom model provider support (BYOK), refining terminal and keyboard interactions across platforms, and managing complex multi-agent or session states.

---

## 2. Releases
* **v1.0.106-5** ([GitHub Release](https://github.com/github/copilot-cli))
  - **Fixed:** Honors `includeCoAuthoredBy: false` in ACP mode (`copilot --acp`), preventing unintended `Co-authored-by` commit trailers. Targeted `/settings` commands now instantly reflect selected changes, and telemetry-disabled warnings upon session resumption have been resolved.
* **v1.0.106-4** ([GitHub Release](https://github.com/github/copilot-cli))
  - **Fixed:** Eliminated empty session flashes in the session picker. `@file` mentions enclosed within brackets, quotes, or backticks now properly attach and expand in `!` shell commands.
* **v1.0.106-3** ([GitHub Release](https://github.com/github/copilot-cli))
  - **Added:** Introduced opt-in session management tools and `@mentions` for opted-in local sessions.
  - **Improved:** Managed-account policy refresh warnings now feature Policy Helper findings and clear automatically upon resolution.
  - **Fixed:** Reused valid saved MCP OAuth credentials for anonymous connections.

---

## 3. Hot Issues
1. **[#1857 - Allow users to cancel or remove enqueued messages before execution](https://github.com/github/copilot-cli/issues/1857)**
   - *Why it matters:* Prevents runaway queued prompts/slash commands executed via `Ctrl+Q`/`Ctrl+Enter` while the agent is busy. 
   - *Community reaction:* High engagement (33 👍, 15 comments), signaling a strong user demand for better execution flow control.
2. **[#3709 - Allow /model to switch between multiple models, including BYOK/local providers](https://github.com/github/copilot-cli/issues/3709)**
   - *Why it matters:* BYOK users are currently restricted to a single model via environment variables; the `/model` picker fails to surface local model alternatives.
   - *Community reaction:* Highly requested (34 👍) by developers looking to fluidly test local weights alongside cloud models.
3. **[#5112 - Support OSC 7501 program status in the interactive CLI](https://github.com/github/copilot-cli/issues/5112)**
   - *Why it matters:* Enables reporting agent execution state (working, blocked, etc.) natively to supporting terminal emulators.
   - *Community reaction:* Gaining traction (11 👍) among power users looking for deeper terminal integration.
4. **[#3015 - Authorization header dropped on JSON-RPC tools/call after successful MCP initialize](https://github.com/github/copilot-cli/issues/3015)**
   - *Why it matters:* Breaks MCP servers relying on OAuth 2.1 / DCR and Streamable HTTP after the initial handshake.
   - *Community reaction:* Critical blocker for secure remote Model Context Protocol integrations.
5. **[#5145 - 400 reasoning_text in thinking mode must be passed back after background shell exits](https://github.com/github/copilot-cli/issues/5145)**
   - *Why it matters:* Custom OpenAI-compatible providers (like DeepSeek) throw HTTP 400 errors during model calls following background shell turns.
   - *Community reaction:* Stifles custom provider stability during multi-turn coding loops.
6. **[#4646 - Compaction fails with "CAPIError: 400 Tool choice must be auto" on custom models](https://github.com/github/copilot-cli/issues/4646)**
   - *Why it matters:* Manual (`/compact`) and automatic session compaction crash when running custom OpenRouter or local endpoints.
   - *Community reaction:* A major friction point for developers stepping outside GitHub-hosted models.
7. **[#5304 - /keep-alive in WSL2 does not prevent the Windows host from sleeping](https://github.com/github/copilot-cli/issues/5304)**
   - *Why it matters:* WSL2 instances misidentify as standard Linux, attempting to invoke `systemd-inhibit` instead of creating Windows power requests via `powercfg`.
   - *Community reaction:* Frustrates long-running workflows for Windows developers utilizing WSL.
8. **[#5250 - macOS: Entra-broker MCP servers fail at startup due to concurrent sign-ins](https://github.com/github/copilot-cli/issues/5250)**
   - *Why it matters:* Enterprise macOS setups running multiple Entra-protected remote MCP servers crash due to race conditions in the account broker.
   - *Community reaction:* Blocks enterprise adoption involving Azure DevOps and WorkIQ integrations.
9. **[#4891 - copilot.exe hard-crashes on Windows (0xc0000005) losing in-flight turns](https://github.com/github/copilot-cli/issues/4891)**
   - *Why it matters:* Unhandled access violations terminate the CLI abruptly, dropping active context and corrupting terminal states.
   - *Community reaction:* High anxiety regarding reliability and state loss on Windows platforms.
10. **[#5315 - Remote Control: voice mode from GitHub Mobile](https://github.com/github/copilot-cli/issues/5315)**
    - *Why it matters:* Extends `/remote on` capabilities to support speech-to-text and text-to-speech interactions via the GitHub Mobile app.
    - *Community reaction:* Exciting proposed paradigm shift for hands-free session steering while away from keyboards.

---

## 4. Key PR Progress
1. **[#5339 - Add read-only agent monitor TUI (Graph + Timeline)](https://github.com/github/copilot-cli/pull/5339)**
   - *Description:* Implements a dedicated terminal interface (`tools/agent-monitor`) to visually inspect active local sessions, subagent hierarchies, and execution timelines.
2. **[#5321 - Add ADJU PHONE CAMERA Windows app](https://github.com/github/copilot-cli/pull/5321)**
   - *Description:* Integrates a local Wi-Fi WebRTC video streaming tool enabling mobile devices to supply live camera feeds directly to Windows environments.
3. **[#5133 - Fix includeCoAuthoredBy: false ignored in ACP mode](https://github.com/github/copilot-cli/issues/5133)** *(Resolved via release)*
   - *Description:* Ensured ACP clients adhere to commit trailer configurations identically to standard prompt modes.
4. **[#5228 - Fix copilot --resume session picker regressions](https://github.com/github/copilot-cli/issues/5228)** *(Resolved)*
   - *Description:* Restored proper interactive session picking when executing `copilot --resume` without a direct ID.
5. **[#4789 - Fix Ctrl+C behavior during confirmation dialogs](https://github.com/github/copilot-cli/issues/4789)** *(Resolved)*
   - *Description:* Stopped text-copying operations via `Ctrl+C` from inadvertently closing active script confirmation prompts.
6. **[#5268 - Fix ACP /session delete, cleanup, and prune failures](https://github.com/github/copilot-cli/issues/5268)** *(Resolved)*
   - *Description:* Addressed issues where session management subcommands failed over ACP due to unavailable session APIs.
7. **[#5269 - Enable plugin skills in ACP sessions](https://github.com/github/copilot-cli/issues/5269)** *(Resolved)*
   - *Description:* Exposed plugin-contributed skills correctly within ACP `available_commands_update` payloads.
8. **[#4700 - Honor skillDirectories setting in ACP mode](https://github.com/github/copilot-cli/issues/4700)** *(Resolved)*
   - *Description:* Fixed custom skill directory discovery from `settings.json` when running under `copilot --acp`.
9. **[#4106 - Fix ACP subagent source identity flattening](https://github.com/github/copilot-cli/issues/4106)** *(Resolved)*
   - *Description:* Preserved subagent source boundaries when running synchronous parallel tasks in ACP streams.
10. **[#5166 - Restrict model selection to exact repository allowlists in prompt mode](https://github.com/github/copilot-cli/issues/5166)** *(Resolved)*
    - *Description:* Hardened security enforcement to prevent unapproved model spins during non-interactive prompt runs.

---

## 5. Feature Request Trends
* **Flexible Model Ecosystems (BYOK / Local):** High demand for native `/model` switching across custom endpoints, local LLM providers, and OpenRouter without hardcoded limitations.
* **Advanced Remote & Mobile Interactivity:** Expanding beyond text-only remote setups toward voice-driven workflows and dedicated monitoring tools.
* **Queue & Flow Management:** Greater control over user input queuing (e.g., cancelling or editing enqueued prompts mid-flight) to match asynchronous agent pacing.
* **Deep Platform Integrations:** Better native hooks for OS-level capabilities, such as Windows power-state management (`/keep-alive` via WSL) and hardware terminal features (OSC 7501).

---

## 6. Developer Pain Points
* **Custom Provider Fragility:** Running models with custom wire APIs (like DeepSeek thinking tokens or local endpoints) frequently triggers downstream validation failures (e.g., HTTP 400 errors on compaction or post-shell turns).
* **Cross-Platform OS Discrepancies:** Headaches involving Windows/WSL interoperability—specifically power management (`/keep-alive`) and input/keyboard regressions (NumLock-off behavior).
* **Enterprise Authentication Quirks:** Concurrent sign-in locks and dropped authorization headers on OAuth/DCR-secured remote MCP servers (especially Entra ID on macOS).
* **Session State & Recovery Failures:** Sudden crashes (like Windows access violations) resulting in lost in-flight turns, alongside confusion surrounding session resumption defaults.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-11-03

## 1. Today's Highlights
The OpenCode community is heavily focused on ironed-out stability and migration friction following the recent V2 architectural rollouts. Significant conversation surrounds billing anomalies, region routing limits, and state tracking bugs in the new session-handling layers. Meanwhile, contributions are pushing forward with diagnostics tools like `opencode doctor` and refined configuration options.

---

## 2. Releases
*No new releases in the last 24 hours.*

---

## 3. Hot Issues
1. **[#59387 [OPEN] [zen] Free tier issues: read this first, then post your report here](https://github.com/anomalyco/opencode/issues/59387)**
   - *Why it matters:* Serves as the central tracking hub for free-tier limits, account-linked billing errors, and desktop reset failures.
   - *Community reaction:* Highly active with 213 comments, indicating widespread frustration among free users regarding reset timers.

2. **[#49827 [OPEN] [reproduced] migrate-v1: non-git sessions in "global" project hidden after V1→V2 upgrade](https://github.com/anomalyco/opencode/issues/49827)**
   - *Why it matters:* Upgrading from V1 to V2 breaks visibility for historical non-git sessions because V2 enforces per-directory project scoping.
   - *Community reaction:* Gaining developer urgency as early adopters migrate their setups.

3. **[#55446 [OPEN] desktop/web: group sidebar sessions by project like Codex Projects view](https://github.com/anomalyco/opencode/issues/55446)**
   - *Why it matters:* Requests a structural UX update to group sidebar sessions by project headers, abandoning the flat recent list.
   - *Community reaction:* Backed by 13 thumbs-up for improving multi-repo navigation.

4. **[#52958 [CLOSED] [Billing] OpenCode Go subscription: all payment methods declined from Italy (EU)](https://github.com/anomalyco/opencode/issues/52958)**
   - *Why it matters:* Exposes regional payment processing failures impacting EU subscribers.
   - *Community reaction:* Closed after investigating payment gateway hurdles for specific European regions.

5. **[#43250 [OPEN] [2.0, reproduced] keep.tokens is not honoured: the compaction split walk-back is unbounded and skips synthetic messages](https://github.com/anomalyco/opencode/issues/43250)**
   - *Why it matters:* Context management bug where agent-driven sessions vastly exceed the configured `keep.tokens` ceiling.
   - *Community reaction:* Core performance concern for developers managing token burn and context limits.

6. **[#52154 [OPEN] message history isolation per session](https://github.com/anomalyco/opencode/issues/52154)**
   - *Why it matters:* Up-arrow prompt history currently leaks globally across sessions instead of remaining scoped locally.
   - *Community reaction:* Strongly desired feature to prevent cross-session input pollution.

7. **[#61303 [OPEN] projects: new project in folder without git repo resolves to C:\ root](https://github.com/anomalyco/opencode/issues/50827 / #61303)](https://github.com/anomalyco/opencode/issues/61303)**
   - *Why it matters:* Windows-specific bug causing non-git directories to resolve to the root path `C:\` during project initialization.
   - *Community reaction:* High priority for Windows developer ergonomics.

8. **[#60753 [CLOSED] [triaging] provider: opencode-go gateway returns invalid-JSON upstream response, bricking sessions until rewind](https://github.com/anomalyco/opencode/issues/60753)**
   - *Why it matters:* Upstream malformed JSON errors crash conversation loops permanently until the user manually triggers a rewind.
   - *Community reaction:* Critical reliability issue causing session lock-ups.

9. **[#61072 [CLOSED] Claude Agent: 5-hour plan limit drains ~1.8x faster because the SDK labels requests sdk-ts](https://github.com/anomalyco/opencode/issues/61072)**
   - *Why it matters:* The Claude Agent SDK flags requests with `sdk-ts`, resulting in significantly faster quota exhaustion compared to native TUI usage.
   - *Community reaction:* Frustrated developers tracking unexpected rate-limit penalties.

10. **[#60316 [OPEN] [reproduced] ACP: set_config_option can answer with the previous selection when the switch echo lands late](https://github.com/anomalyco/opencode/issues/60316)**
    - *Why it matters:* Race condition in the Agent Client Protocol (ACP) where rapid model switches return outdated configuration states.
    - *Community reaction:* Key bug affecting programmatic and multi-client ACP integrations.

---

## 4. Key PR Progress
1. **[#61311 [OPEN] feat(app): show model usage in settings](https://github.com/anomalyco/opencode/pull/61311)**
   - Adds tracking visibility directly to the Models settings page to show which configured models have active usage.
2. **[#58061 [OPEN] fix(tui): allow configuring tab title marquee speed](https://github.com/anomalyco/opencode/pull/58061)**
   - Introduces a `cli.json` configuration entry (`tabs.marquee`) to customize session tab title marquee speeds.
3. **[#55261 [OPEN] feat(tui): add prompt history scope setting](https://github.com/anomalyco/opencode/pull/55261)**
   - Addresses prompt leakage by implementing an opt-in `prompt.history_scope` configuration (`global` vs `session`).
4. **[#59803 [OPEN] fix(core): price Copilot long-context tiers and cache writes](https://github.com/anomalyco/opencode/pull/59803)**
   - Fixes severe undercounting of GitHub Copilot costs during long-duration sessions.
5. **[#60750 [CLOSED] feat(cli): add opencode doctor](https://github.com/anomalyco/opencode/pull/60750)**
   - Adds a read-only diagnostic reporting command (`opencode doctor`) to surface hidden schema issues, corruption, and state directory anomalies.
6. **[#60748 [CLOSED] fix(util): redact credentials in structured log output](https://github.com/anomalyco/opencode/pull/60748)**
   - Secures structured logging by filtering out plaintext API keys and sensitive `Authorization` headers.
7. **[#61299 [OPEN] feat(tui): support @-mentioning files outside the project directory](https://github.com/anomalyco/opencode/pull/61299)**
   - Ports V1 file-mentioning capabilities to V2, allowing developers to target files outside the immediate working directory.
8. **[#61306 [OPEN] fix(core): compact once after payload size rejections](https://github.com/anomalyco/opencode/pull/61306)**
   - Fixes HTTP 413 loops by ensuring long sessions trigger context compaction properly after payload size rejections.
9. **[#58846 [OPEN] fix(core): repair V1 global sessions left by completed imports](https://github.com/anomalyco/opencode/pull/58846)**
   - Fixes historical migration bugs for users whose V1 global sessions were stranded after upgrading to V2.
10. **[#52855 [CLOSED] [automated-pr-cleanup] fix(core): respect MCP endpoint cooldowns after HTTP 429](https://github.com/anomalyco/opencode/pull/52855)**
   - Implements proper local request throttling when remote Model Context Protocol (MCP) endpoints return HTTP 429 rate limit codes.

---

## 5. Feature Request Trends
- **Enhanced Project Organization:** Strong demand for hierarchical project grouping in the UI sidebar to prevent multi-repository clutter (e.g., #55446, #39284).
- **Granular Session Controls:** Requests for isolated prompt history scopes (#52154) and targeted model whitelisting/blacklisting configurations (#61110).
- **Improved Diagnostics & Transparency:** Growing appetite for internal system health insight (e.g., usage visibility in settings #61311 and diagnostic reporting via `opencode doctor` #60750).

---

## 6. Developer Pain Points
- **Migration Friction:** Upgrading from V1 to V2 continues to introduce regressions regarding non-git directory indexing, orphan files, and hidden global session histories.
- **Context & Token Control Failures:** Unbounded walk-back mechanisms causing `keep.tokens` limits to be bypassed, alongside high memory consumption in the TUI client JS heap for large transcript logs.
- **Integration Stability:** Frustrations with sticky upstream gateway failures (invalid JSON errors requiring session rewinds) and race conditions when executing quick model switches over ACP.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest: 2026-11-03

### 1. Today's Highlights
Pi v1.5.0 has officially landed, introducing a more transparent update process that now includes automated extension changelogs. The community is currently focused on stabilizing high-CPU performance regressions on macOS and resolving critical bugs within the Anthropic and Bedrock integration layers.

### 2. Releases
*   **v1.5.0**: Introduces [Extension update changelogs](https://github.com/earendil-works/pi/bl), allowing users to review changes in installed packages post-update. Features a `collapseChangelog` utility to keep the UI clean during multi-package updates.

### 3. Hot Issues
1.  **[#7730](https://github.com/earendil-works/pi/issues/7730)**: High CPU usage (up to 110%) on macOS. A major performance blocker linked to long-running sessions.
2.  **[#9549](https://github.com/earendil-works/pi/issues/9549)**: Large transcript re-rendering saturation. UI thread blocks on Windows 11 during resizing/re-renders.
3.  **[#9134](https://github.com/earendil-works/pi/issues/9134)**: Anthropic adapter silently drops `anyOf` from tool schemas, causing silent failures in argument validation.
4.  **[#11527](https://github.com/earendil-works/pi/issues/11527)**: Bedrock performance issue where a new client is instantiated per request, leading to credential overhead.
5.  **[#9276](https://github.com/earendil-works/pi/issues/9276)**: Grep tool OOM crashes. Reading files into memory for context leads to heap exhaustion on large logs.
6.  **[#11021](https://github.com/earendil-works/pi/issues/11021)**: Context window mismatch for `gpt-6.1-sol`; users report being capped at 272K despite 500K availability.
7.  **[#11177](https://github.com/earendil-works/pi/issues/11177)**: Alacritty IME incompatibility. Multi-character commits break command autocomplete.
8.  **[#11692](https://github.com/earendil-works/pi/issues/11692)**: OAuth refresh token loss during startup catalog refreshes, leading to persistent `invalid_grant` errors.
9.  **[#11691](https://github.com/earendil-works/pi/issues/11691)**: Extension loader auto-import risk. Importing `*.test.ts` files in extensions can execute host-killing code.
10. **[#11687](https://github.com/earendil-works/pi/issues/11687)**: Regression in v1.5.0 causing `basispoints_tool_arguments_stalled` errors on Windows.

### 4. Key PR Progress
1.  **[#11712](https://github.com/earendil-works/pi/pull/11712)**: Fixes OpenRouter 400 errors by compensating for tokenizer discrepancies.
2.  **[#11705](https://github.com/earendil-works/pi/pull/11705)**: Optimizes grep tool by streaming context via ripgrep instead of loading full files.
3.  **[#11707](https://github.com/earendil-works/pi/pull/11707)**: Enhances `pi update` output to show specific version changes per package.
4.  **[#11679](https://github.com/earendil-works/pi/pull/11679)**: Adds `microsoft-decision-1` classifier support to GitHub Copilot.
5.  **[#11629](https://github.com/earendil-works/pi/pull/11629)**: Adds `PI_SELF_UPDATE_COMMAND` to better support Nix, mise, and pnpm wrappers.
6.  **[#11680](https://github.com/earendil-works/pi/pull/11680)**: Fixes branch summarization to respect `context_edit` and ignore failed model retries.
7.  **[#11545](https://github.com/earendil-works/pi/pull/11545)**: Implements Anthropic message thread beta to optimize context usage.
8.  **[#11704](https://github.com/earendil-works/pi/pull/11704)**: Formalizes backward compatibility requirements in `AGENTS.md`.
9.  **[#11696](https://github.com/earendil-works/pi/pull/11696)**: Ongoing work on storage replication features.
10. **[#11690](https://github.com/earendil-works/pi/pull/11690)**: Updates catalog protocols to stop problematic version redirects.

### 5. Feature Request Trends
*   **Unified Namespacing**: Demand for an opt-in `pi.namespace` to prevent resource collisions between extensions.
*   **Internationalization**: Growing requests for RTL (Right-to-Left) text rendering support in the TUI (e.g., Arabic/Persian).
*   **Infrastructure Reliability**: Requests for transaction-safe APIs for "durable" tasks and better management of extension lifecycles.

### 6. Developer Pain Points
*   **Silent Failures**: Users are frustrated when core logic (like Anthropic tool schemas or Auth refreshes) fails silently or provides unhelpful error codes.
*   **Opaque Updates**: The lack of transparency in what actually changed after an update has been a significant point of friction until the v1.5.0 changelog feature.
*   **Tooling Conflicts**: Heavy memory usage in the Grep tool and extension loader vulnerabilities are currently the primary hurdles for professional integration into headless environments.

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