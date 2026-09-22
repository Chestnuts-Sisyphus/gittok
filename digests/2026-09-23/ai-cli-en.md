# AI CLI Tools Community Digest 2026-09-23

> Generated: 2026-09-22 22:31 UTC | Tools covered: 9

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

# Claude Code Skills Community Highlights — 2026-09-23

**Note:** The supplied PR feed did not expose numeric comment counts. The ranking below therefore uses the provided top-attention ordering, recency, cross-referenced Issues, and impact on core Skills tooling.

---

## 1. Top Skills Ranking

| Rank | Skill / PR | Functionality | Discussion Highlights | Status |
|---:|---|---|---|---|
| 1 | **`skill-creator` — trigger evaluation reliability** [PR #1298](https://github.com/anthropics/skills/pull/1298) | Fixes `skill-creator` trigger evaluation: isolates eval workers, handles Windows subprocess failures, and prevents unrelated tool failures from producing false-negative trigger results. | One of the highest-visibility maintenance items. It targets a core trust/quality surface: if trigger evals are unreliable, Skill descriptions and optimization loops can be tuned against misleading evidence. | **Open** |
| 2 | **`proofcore-contract-auditor`** [PR #1771](https://github.com/anthropics/skills/pull/1771) | Adds a Web3 Skill for automated static analysis of Solidity and Rust smart contracts, anchoring audit proofs to the TON Blockchain via ProofCore’s Merkle protocol. | Represents a newer third-party / protocol-sponsored Skill direction: security audit, cryptographic proofing, and blockchain-specific verification. | **Open** |
| 3 | **`mcp-builder` — MCP SDK compatibility** [PR #1742](https://github.com/anthropics/skills/pull/1742) | Updates `mcp-builder` for `mcp>=2.0.0`, handling the rename from `streamablehttp_client` to `streamable_http_client` and custom-header configuration. | Fixes [#1668](https://github.com/anthropics/skills/issues/1668). Important because MCP tooling is central to extending Claude Code with external capabilities. | **Open** |
| 4 | **`md2video-audio`** [PR #1703](https://github.com/anthropics/skills/pull/1703) | Adds a zero-cost Markdown-to-video Skill that compiles Markdown documents into MP4 presentations with realistic voiceovers via Marp. | Signals demand for content-generation Skills beyond plain text: slides, narration, and media packaging. | **Open** |
| 5 | **`docx` — orphaned comment detection / Office hardening** [PR #1734](https://github.com/anthropics/skills/pull/1734) | Improves DOCX comment handling by detecting orphaned comments. | Part of a broader cluster of Office-document reliability fixes, including [PR #1790](https://github.com/anthropics/skills/pull/1790), [PR #541](https://github.com/anthropics/skills/pull/541), and [PR #1765](https://github.com/anthropics/skills/pull/1765). | **Open** |
| 6 | **`pyxel` — retro game development** [PR #525](https://github.com/anthropics/skills/pull/525) | Adds a Pyxel Skill for creating, debugging, and verifying retro Python games, including headless runs and frame/state inspection. | Long-lived open PR, updated recently. Shows sustained community interest in creative/interactive development Skills. | **Open** |
| 7 | **`awt` — AI Watch Tester E2E testing** [PR #822](https://github.com/anthropics/skills/pull/822) | Adds AWT, an AI-powered E2E testing Skill that gives Claude browser control and vision-based test execution. | Highlights demand for autonomous QA: zero-code test generation, browser automation, and UI validation. | **Open** |
| 8 | **`testing-patterns`** [PR #723](https://github.com/anthropics/skills/pull/723) | Adds a comprehensive testing Skill covering testing philosophy, unit tests, edge cases, and React component testing. | Broad QA-direction Skill, updated recently. Fits the trend of turning best practices into reusable Claude behavior. | **Open** |

---

## 2. Community Demand Trends

The top Issues show that community demand is not only for more vertical Skills, but also for **better trust, reliability, packaging, and distribution** around the Skills system itself.

| Demand Trend | What the Community Is Asking For | Anticipated Skill / Ecosystem Direction | Key Links |
|---|---|---|---|
| **Security, trust, and governance** | Community Skills under the `anthropic/` namespace create a trust-boundary risk; users want safer permissioning and governance for agent systems. | Security scanner / trust-verifier Skills; agent-governance Skills; least-privilege patterns; audit trails; supply-chain verification. | [Issue #492](https://github.com/anthropics/skills/issues/492), [Issue #412](https://github.com/anthropics/skills/issues/412), [Issue #1175](https://github.com/anthropics/skills/issues/1175) |
| **Skill quality, evaluation, and context efficiency** | `skill-creator` eval failures, 0% trigger recall, verbose Skills, context-window exhaustion, and duplicate plugin content are recurring pain points. | Better eval harnesses, Skill quality analyzers, description optimizers, context-budget guards, deduplication tooling, and validation Skills. | [Issue #556](https://github.com/anthropics/skills/issues/556), [Issue #202](https://github.com/anthropics/skills/issues/202), [Issue #1487](https://github.com/anthropics/skills/issues/1487), [Issue #189](https://github.com/anthropics/skills/issues/189) |
| **Enterprise sharing and distribution** | Teams want org-wide Skill sharing, easier installation, and cross-platform / cross-provider support. | Org skill libraries, shared Skill registries, Bedrock/Vertex-compatible packaging, and smoother `.skill` distribution workflows. | [Issue #228](https://github.com/anthropics/skills/issues/228), [Issue #29](https://github.com/anthropics/skills/issues/29) |
| **MCP interoperability** | Users want Skills and MCPs to work as complementary interfaces, and they need MCP tooling to stay current with SDK changes. | Skills that package MCP APIs, MCP-to-Skill adapters, and compatibility validation for new MCP versions. | [Issue #16](https://github.com/anthropics/skills/issues/16), [PR #1742](https://github.com/anthropics/skills/pull/1742), [Issue #1390](https://github.com/anthropics/skills/issues/1390) |
| **Robust office-document automation** | DOCX, PDF, ODT, and SharePoint document workflows generate many bug reports and quality concerns. | Hardened document-generation Skills: comment handling, redlining, encoding, typographic quality, SharePoint-safe processing, and file-format validation. | [Issue #1175](https://github.com/anthropics/skills/issues/1175), [PR #1734](https://github.com/anthropics/skills/pull/1734), [PR #1765](https://github.com/anthropics/skills/pull/1765) |
| **Testing, code review, and delivery verification** | Community proposals and PRs target E2E testing, test patterns, contract auditing, and reasoning-quality gates. | Test-generation Skills, code-review Skills, smart-contract audit Skills, adversarial review pipelines, and delivery verification workflows. | [PR #822](https://github.com/anthropics/skills/pull/822), [PR #723](https://github.com/anthropics/skills/pull/723), [PR #1771](https://github.com/anthropics/skills/pull/1771), [Issue #1385](https://github.com/anthropics/skills/issues/1385) |
| **Developer infrastructure and niche verticals** | HPC, media generation, retro game development, and document typography are active examples of specialized Skills. | HPC/Slurm Skills, Markdown-to-video Skills, game-engine Skills, and typographic QC Skills for generated documents. | [PR #1615](https://github.com/anthropics/skills/pull/1615), [PR #1703](https://github.com/anthropics/skills/pull/1703), [PR #525](https://github.com/anthropics/skills/pull/525), [PR #514](https://github.com/anthropics/skills/pull/514) |

---

## 3. High-Potential Pending Skills

These open PRs are not yet merged but appear high-value because they affect core tooling, recent MCP/document workflows, or new safety/testing capabilities.

| Pending Skill Change | Why It May Land Soon | Link |
|---|---|---|
| **`skill-creator`: isolate trigger evals and handle runtime failures** | Directly improves the reliability of the official Skill-creation workflow; likely important for future Skill quality features. | [PR #1298](https://github.com/anthropics/skills/pull/1298) |
| **`skill-creator`: fix 0% recall trigger reporting** | Fixes a severe correctness bug in trigger evaluation, where every skill appears to have failed recall and optimisation becomes misleading. | [PR #1769](https://github.com/anthropics/skills/pull/1769) |
| **`mcp-builder`: support `mcp>=2` streamable HTTP client and custom headers** | Compatibility fix for current MCP SDK versions; likely to be prioritised as MCP usage grows. | [PR #1742](https://github.com/anthropics/skills/pull/1742) |
| **Office redlining: decode diffs as UTF-8** | Fixes non-ASCII / Windows locale issues across DOCX, PPTX, and XLSX redlining validators. | [PR #1765](https://github.com/anthropics/skills/pull/1765) |
| **`docx`: create missing `document.xml.rels`** | Recent hardening fix for DOCX comment relationships, reducing document-corruption edge cases. | [PR #1790](https://github.com/anthropics/skills/pull/1790) |
| **`blast-radius`: pre-destructive operation checklist** | New safety Skill for risky bulk operations; aligns with growing demand for governance and guardrail Skills. | [PR #1776](https://github.com/anthropics/skills/pull/1776) |
| **`proofcore-contract-auditor`: smart-contract notarization** | A concrete vertical audit Skill for Web3 developers; if accepted, it could expand the security-review Skill category. | [PR #1771](https://github.com/anthropics/skills/pull/1771) |

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is for **trustworthy, production-grade Skills infrastructure**: reliable `skill-creator` evaluation, secure namespace/permission handling, efficient context use, and hardened document/MCP workflows that can be shared safely across teams.

---

# Claude Code Community Digest (2026-09-23)

## 1. Today's Highlights
Release **v2.1.280** drops today, officially introducing **Claude Opus 5.5** (`claude-opus-5-5`) as the new default Opus model with a massive 1M context window and competitive pricing ($4/$20 per Mtok). Alongside the model upgrade, the release introduces targeted UX improvements like expanded mouse support for fullscreen lists. Meanwhile, the community continues to track regressions in WSL/VS Code dictation workflows and UI/Cowork bugs following recent merges.

---

## 2. Releases
### [v2.1.280](https://github.com/anthropics/claude-code/releases/tag/v2.1.280)
- **New Default Model**: Added Claude Opus 5.5 (`claude-opus-5-5`) featuring a 1M context window, priced at $4/$20 per Mtoken with $0.20/Mtoken cache reads.
- **Fullscreen UI/UX**: Expanded mouse wheel scrolling support to the `/skills` list, alongside clickable state options in `/plugin`.

---

## 3. Hot Issues
1. **[#76694 - Cowork: new projects lost "Choose a folder"](https://github.com/anthropics/claude-code/issues/76694)**
   - *Why it matters:* Context menus were replaced by chat-style upload-only menus following a Chat/Cowork merge, impacting project organization.
   - *Community reaction:* Highly active (32 comments, 27 👍), with developers frustrated by the loss of local folder selection.
2. **[#93782 - Regression: dictation-tool paste broken in VS Code integrated terminal (WSL2)](https://github.com/anthropics/claude-code/issues/93782)**
   - *Why it matters:* Voice dictation tools (like Wispr Flow) utilizing clipboard and simulated Ctrl+V fail to insert text in v2.1.269+.
   - *Community reaction:* Frustrating regression for accessibility and voice-driven workflows on remote setups.
3. **[#95566 - Native binary hangs at 100% CPU on kvm64 VMs (no SSE4/POPCNT)](https://github.com/anthropics/claude-code/issues/95566)**
   - *Why it matters:* The native linux binary completely hangs on legacy or restricted KVM processor models lacking AVX2/SSE4 instructions.
   - *Community reaction:* Urges an explicit CPU feature pre-flight check to prevent silent, resource-draining hangs.
4. **[#69802 - ExitWorktree orphans worktrees and corrupts parent core.bare](https://github.com/anthropics/claude-code/issues/69802)**
   - *Why it matters:* Git worktree cleanup tools occasionally report false success while leaving orphaned directories, admin entries, and branches.
   - *Community reaction:* Critical concern for repository integrity among power users utilizing automated worktree hooks.
5. **[#95524 - Stop hook git check silently passes on unpushed commits / false positives after merge](https://github.com/anthropics/claude-code/issues/95524)**
   - *Why it matters:* Git safety checks fail to catch unpushed work under certain remote-ref configurations.
   - *Community reaction:* Highlights reliability gaps in automated safety guardrails.
6. **[#90152 - Feature: Let individual subscribers gift or pool unused usage limits](https://github.com/anthropics/claude-code/issues/90152)**
   - *Why it matters:* Requests flexibility to move already-purchased capacity between existing individual accounts.
   - *Community reaction:* Continues the conversation on plan tier sharing alongside family/household request threads.
7. **[#76389 - Hanging find.exe on Windows sandboxed bash environments](https://github.com/anthropics/claude-code/issues/76389)**
   - *Why it matters:* Windows users experience system freezes due to underlying tool execution locking up.
   - *Community reaction:* Highlights ongoing cross-platform parity hurdles, particularly regarding Windows CLI tool behavior.
8. **[#90665 - Feature: Auto-enable "Auto-fix CI and address comments" globally](https://github.com/anthropics/claude-code/issues/90665)**
   - *Why it matters:* Eliminates repetitive manual per-PR toggling by adding a configuration file default (`settings.json`).
   - *Community reaction:* Strong desire for hands-off, automated PR management workflows.
9. **[#96157 - /code-review apply-findings step occupies user turn unlabeled](https://github.com/anthropics/claude-code/issues/96157)**
   - *Why it matters:* Automated code review feedback injection mimics human typing without machine-generated XML tags (`<system-reminder>`).
   - *Community reaction:* Raises important security and prompt hierarchy questions about context boundaries.
10. **[#84371 - CLAUDE_CODE_LOCAL_BINARY override remains dead code in Desktop](https://github.com/anthropics/claude-code/issues/84371)**
    - *Why it matters:* The environment variable is read by Claude Desktop but discarded without an active initialization call site.
    - *Community reaction:* Annoying block for developers attempting to override bundled binaries with custom local builds.

---

## 4. Key PR Progress
*(Note: No active Pull Requests were updated within the last 24-hour reporting window.)*

---

## 5. Feature Request Trends
- **Usage Flexibility & Pooling:** Users increasingly desire granular control over plan quotas, including cross-account usage sharing and resource pooling.
- **Workflow Automation Defaults:** High demand for global configurations (via `settings.json`) that persist features like automated PR watchdogs and CI fixes.
- **Advanced Subagent & Fleet Controls:** Requests to promote/demote subagents dynamically into main sessions and better handle named multi-agent fleets.
- **Cloud vs. Local Parity:** Persistent calls to bring desktop/extension capabilities (such as browser tooling and file management) fully up to speed with native CLI features.

---

## 6. Developer Pain Points
- **Cross-Platform & Environment Edge Cases:** WSL2 clipboard integration regressions, Windows binary/tool hanging, and legacy KVM CPU instruction panics are causing friction.
- **UX & Layout Disruptions:** Recent interface merges have introduced unexpected navigation hurdles, such as stripped local folder selection in Cowork and broken context tracking indicators.
- **Git & Worktree Safety:** Residual file locking, silent branch or worktree orchestration failures, and flaky hook behaviors continue to disrupt multi-branch workflows.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — September 23, 2026

## Today's Highlights
OpenAI has expanded its flagship lineup with the introduction of **GPT-6 Sol and Luna** across native and Amazon Bedrock model catalogs, alongside major improvements to terminal UX in the `rust-v0.156.0` release. Concurrently, community discourse is heavily focused on Windows-specific desktop setup blockers, sandbox permissions, and history projection stalls.

---

## Releases
- **rust-v0.156.0** ([View on GitHub](https://github.com/openai/codex))
  - **New TUI (`/tui`):** Introduces an optional fullscreen user interface featuring transcript search, mouse selection, and right-click copying.
  - **Voice Integration:** Voice conversations are now enabled by default with an F8 toggle, `/voice settings` picker, and bundled audio assets.
- **rust-v0.157.0-alpha.2 through alpha.10** ([View on GitHub](https://github.com/openai/codex))
  - Rapid sequence of unstable pre-releases laying the groundwork for upcoming engine changes.

---

## Hot Issues
1. **[#8648 - Codex replies to earlier messages instead of latest one](https://github.com/openai/codex/issues/8648)**
   - *Why it matters:* Core conversational tracking breaks down when the model loses track of chronological context.
   - *Community reaction:* Highly popular (64 👍, 88 comments); indicates deep-seated routing issues in multi-turn threads.
2. **[#41079 - Windows Desktop paginated thread history stalls on duplicate ordinal](https://github.com/openai/codex/issues/41079)**
   - *Why it matters:* Users lose visibility into complete tasks because local history-projection hits an ordering snag.
   - *Community reaction:* Frustrates Windows desktop power users dealing with long-running sessions (36 comments).
3. **[#42215 - Windows ChatGPT Work local chat filesystem sync fails](https://github.com/openai/codex/issues/42215)**
   - *Why it matters:* Completely blocks users from bootstrapping local chats inside existing ChatGPT Projects.
   - *Community reaction:* High friction for enterprise and work tier users on Windows (36 comments).
4. **[#42739 - Local projects disappear from sidebar after Windows update](https://github.com/openai/codex/issues/42739)**
   - *Why it matters:* Gives the alarming impression that project files or threads have vanished entirely.
   - *Community reaction:* Generates unnecessary panic, though files remain intact on disk (26 comments).
5. **[#45019 - App-server queued follow-up no longer exists](https://github.com/openai/codex/issues/45019)**
   - *Why it matters:* Breaks automated workflows and queued message handling in the app server architecture.
   - *Community reaction:* Backed by strong community sentiment (60 👍, 24 comments).
6. **[#41622 - Add a setting to disable automatic conversation recaps in CLI](https://github.com/openai/codex/issues/41622)**
   - *Why it matters:* Unwanted automatic summaries consume tokens and clutter the terminal for experienced users.
   - *Community reaction:* Heavily endorsed as a quality-of-life config toggle (86 👍, 21 comments).
7. **[#32492 - Windows app stuck on "Finish Windows setup" (UAC/Sandbox)](https://github.com/openai/codex/issues/32492)**
   - *Why it matters:* Completely locks new users out of launching the Windows application due to unhandled UAC prompts.
   - *Community reaction:* Recurrent onboarding blocker across multiple versions.
8. **[#44363 - Context compaction permanently destroys conversation transcript](https://github.com/openai/codex/issues/44363)**
   - *Why it matters:* Destructive in-place rollouts overwrite raw historical logs during compaction routines.
   - *Community reaction:* Serious data integrity concern for Pro users relying on verbatim histories.
9. **[#45867 - Codex Luna quota consumption ~4-5x higher](https://github.com/openai/codex/issues/45867)**
   - *Why it matters:* Sudden, unexplained quota depletion makes high-tier models economically unviable for ongoing tasks.
   - *Community reaction:* Sparks active telemetry comparisons among Plus subscribers.
10. **[#46110 - Linux sandbox rejects valid nsfs mount roots from snapd](https://github.com/openai/codex/issues/46110)**
    - *Why it matters:* Prevents sandbox execution on standard Ubuntu hosts utilizing snap packages.
    - *Community reaction:* Halts command execution out-of-the-box for Linux developers.

---

## Key PR Progress
1. **[#47332 - Add GPT-6 Sol and Luna to the model catalog](https://github.com/openai/codex/pull/47332)**
   - Introduces next-generation model definitions and establishes automatic migration paths from legacy `gpt-5` variants.
2. **[#47347 - Add GPT-6 Sol and Luna to Amazon Bedrock catalogs](https://github.com/openai/codex/pull/47347)**
   - Expands cloud deployment horizons by integrating `openai.gpt-6-sol` and `openai.gpt-6-luna` into Bedrock Runtime.
3. **[#47365 - Resume model context from the latest compaction boundary](https://github.com/openai/codex/pull/47365)**
   - Optimizes thread restoration by scanning only from the most recent compaction boundary instead of processing stale early turns.
4. **[#47375 - Add an opt-in preference for the local MXC sandbox](https://github.com/openai/codex/pull/47375)**
   - Introduces the default-off `features.prefer_mxc` flag to improve native Windows local execution routing.
5. **[#47361 - Restrict Windows sandbox default object access to the logon session](https://github.com/openai/codex/pull/47361)**
   - Hardens security isolation by preventing cross-session process and IPC snooping in the Windows sandbox environment.
6. **[#47377 - Add opt-in reasoning status for realtime V3 delegations](https://github.com/openai/codex/pull/47377)**
   - Implements `backend_reasoning_status` to stream public summaries during server-managed realtime V3 operations.
7. **[#47362 - Bound inbound exec-server requests across client transports](https://github.com/openai/codex/pull/47362)**
   - Implements an 8 KiB message size constraint to protect exec-server endpoints from malformed inputs and relay congestion.
8. **[#47350 - Reuse cloud skill catalogs across turns until invalidated](https://github.com/openai/codex/pull/47350)**
   - Avoids redundant cloud skill discovery overhead by caching valid catalogs across adjacent conversational turns.
9. **[#47358 - Color paths and URLs in `codex doctor` by check status](https://github.com/openai/codex/pull/47358)**
   - Enhances diagnostic visibility by dynamically color-coding file paths and URLs based on check health.
10. **[#47340 - Add conditional turn interruption that preserves pending input](https://github.com/openai/codex/pull/47340)**
    - Allows callers to cancel active processing cycles without wiping out queued prompt text or user inputs.

---

## Feature Request Trends
- **Configurable UI/UX Behaviors:** Strong push for granular configuration options to disable automatic features (e.g., conversation recaps, sidebar project hiding, layout padding).
- **Cross-Platform Parity:** Better handling of native OS constraints—specifically bridging gaps between Linux container primitives (`snapd`, bubblewrap) and Windows desktop packaging environments (MSIX, UAC sandboxing).
- **Transparent Diagnostics:** High demand for tooling like `codex doctor` to explicitly diagnose corrupted SQLite state indices, missing path links, and broken extension pipelines.

---

## Developer Pain Points
- **Windows Onboarding & Setup Loops:** Recurring UAC failures, `helper_failed` states, and silent crashes on launch continue to frustrate Windows users.
- **State Desynchronization:** Disconnects between raw JSONL files on disk and what the desktop UI renders (missing threads, lost project groupings, history projection stalls).
- **Quota & Telemetry Opacity:** Sudden, unannounced spikes in token and model resource consumption (e.g., Luna tier) leave developers struggling to budget tasks effectively.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest | 2026-09-23

### 1. Today's Highlights
The Gemini CLI ecosystem is currently focused on hardening core infrastructure, specifically targeting state persistence and MCP (Model Context Protocol) configuration robustness. Development activity is shifting toward improving sub-agent reliability and refining how models interact with file systems and local environments to reduce "context rot."

### 2. Releases
*   **v0.62.0-nightly.20260922.gd5b3e3acc**: Includes critical core patches to resolve esbuild interop issues for proxy-agent environment resolution and ensures tool call updates are correctly emitted prior to permission requests in ACP mode. [See Release](https://github.com/google-gemini/gemini-cli/pull/29401)

### 3. Hot Issues
1.  [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) **Subagent Recovery**: False "GOAL" success reports when hitting `MAX_TURNS` are masking interruptions.
2.  [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) **Generalist Agent Hangs**: High-priority reports of hangs during folder creation; users currently forced to disable sub-agents to regain functionality.
3.  [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) **Bash Affinity**: Exploring native POSIX tool integration to allow models to perform codebase operations without heavy dependencies.
4.  [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) **AST-Aware Mapping**: Investigation into using AST-aware tools to improve code navigation and reduce token noise from misaligned file reads.
5.  [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) **Skill Discovery**: Users report the model fails to trigger custom skills/sub-agents unless explicitly instructed.
6.  [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) **Browser Agent Config**: Regression where `settings.json` overrides (like `maxTurns`) are ignored by the browser sub-agent.
7.  [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) **Wayland Compatibility**: Browser sub-agent failures specifically occurring within Wayland display environments.
8.  [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) **Auto Memory Loops**: Bug causing low-signal sessions to be retried indefinitely, wasting resources.
9.  [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) **400 Error with >128 tools**: Agent fails when tool counts exceed internal limits; requires better scope management.
10. [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) **Destructive Behavior**: Agent occasionally favors dangerous git commands (e.g., `reset --hard`) over safer alternatives.

### 4. Key PR Progress
*   [#29443](https://github.com/google-gemini/gemini-cli/pull/29443) **Model Update**: Adds support for `gemini-3.8-flash` and `gemini-3.5-flash-lite`.
*   [#29448](https://github.com/google-gemini/gemini-cli/pull/29448) **Auth Loop Fix**: Addresses infinite authentication loops in headless and file-contention-heavy environments.
*   [#29449](https://github.com/google-gemini/gemini-cli/pull/29449) **PkgDiet Integration**: Introduces a dependency guardrail to check package health before `npm install`.
*   [#29445](https://github.com/google-gemini/gemini-cli/pull/29445) **MCP Robustness**: Fixes "fail-open" vulnerability where corrupt MCP configurations default to enabling all blocked servers.
*   [#29446](https://github.com/google-gemini/gemini-cli/pull/29446) **Config Validation**: Differentiates between missing vs. malformed JSON to prevent accidental configuration wipes.
*   [#29402](https://github.com/google-gemini/gemini-cli/pull/29402) **Atomic Saves**: Migrates state persistence to a temp-file/atomic-rename pattern to prevent data loss on crash.
*   [#29447](https://github.com/google-gemini/gemini-cli/pull/29447) **SDK Shell Improvements**: Plumbs environment variables and timeouts into `SdkAgentShell`.
*   [#29336](https://github.com/google-gemini/gemini-cli/pull/29336) **Security Hardening**: Enforces secure write permissions on policy directories.
*   [#29323](https://github.com/google-gemini/gemini-cli/pull/29323) **Gitignore Fix**: Corrects matching logic for trailing-slash patterns in nested `.gitignore` files.
*   [#29242](https://github.com/google-gemini/gemini-cli/pull/29242) **Auth Error Logic**: Prevents `401` substring matching from triggering false re-auth flows on non-auth errors.

### 5. Feature Request Trends
*   **Persistent Task Tracking**: Moving away from ephemeral "in-context" task lists to disk-based CRUD tracking ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836)).
*   **Sub-Agent Observability**: High demand for sharing agent trajectories via `/chat share` for evaluation and debugging ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)).
*   **Self-Correction**: Improving agent "self-awareness" to provide users with accurate documentation on CLI flags and current state ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).

### 6. Developer Pain Points
*   **Configuration Fragility**: Frequent reports of settings/configs being accidentally reset or ignored by agents.
*   **Agent Reliability**: High frustration regarding "zombie" sub-agents or models failing to use specialized skills without heavy manual prompting.
*   **Tool Overhead**: The limit of 128 tools causing HTTP 400 errors, suggesting the need for more efficient tool pruning or dynamic loading.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

⚠️ Summary generation failed.

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