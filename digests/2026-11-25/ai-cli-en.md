# AI CLI Tools Community Digest 2026-11-25

> Generated: 2026-11-25 03:15 UTC | Tools covered: 9

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

# Cross-Tool AI CLI Ecosystem Analysis Report
**Date:** November 25, 2026  
**Focus:** Claude Code, GitHub Copilot CLI, OpenCode, Pi, Kimi Code CLI  
*(Note: OpenAI Codex, Gemini CLI, Qwen Code, and DeepSeek TUI summaries failed data collection for this period).*

---

## 1. Ecosystem Overview
The AI CLI developer ecosystem in late 2026 is transitioning rapidly from simple terminal interfaces into fully orchestrated, multi-surface agent execution engines. Standardized integration protocols—specifically the **Model Context Protocol (MCP)** and the **Agent Communication Protocol (ACP)**—have moved from experimental features to core platform architecture. Concurrently, major tools face severe scaling friction around context management, where prompt cache invalidation and transcript bloat directly impact developer costs and session stability. While proprietary ecosystem tools (Claude Code, GitHub Copilot CLI) are prioritizing enterprise compliance, IDE parity, and sandbox security, open platforms (OpenCode, Pi) are rapidly iterating on remote execution architectures, stream performance, and stateless proxy flexibility.

---

## 2. Activity Comparison

| Tool | Tracked Hot Issues | Key PRs Tracked | Release Status (24h) | Primary Focus Area Today |
| :--- | :---: | :---: | :--- | :--- |
| **Claude Code** | 10 | 1 | **Released v2.1.332** | MCP slash-menu integration, security hooks, VS 2026 requests |
| **GitHub Copilot CLI** | 10 | 0 | **Released v1.0.116-x / v1.0.115** | MCP conflict handling, Linux keychain fixes, enterprise OAuth |
| **OpenCode** | 10 | 10 | No Release | IDE extension demand, Cloudflare remote worker infra, stream fixes |
| **Pi** | 10 | 10 | No Release | Terminal OSC signaling, Gemini/Claude model streaming, stateless MCP |
| **Kimi Code CLI** | 0 | 0 | Inactive | *No community activity reported in the last 24 hours* |

---

## 3. Shared Feature Directions

### A. Deep Model Context Protocol (MCP) Standardisation
MCP has become the defacto extensibility layer across all active tools, but implementation focus has shifted toward governance and edge-case handling:
* **Claude Code & Copilot CLI:** Adding namespace conflict warnings (`server:skill`), warning on duplicate endpoint bindings (`/mcp`), and implementing security hooks (`PreSkillShellCommand`) to inspect inline command execution before skill invocation.
* **OpenCode & Pi:** Adding dynamic URI skill resolution (`load MCP skill via URI`) and adopting the 2026-07-28 **stateless MCP protocol revision**.

### B. Context Retention & Compaction Efficiency
Managing the lifecycle of the prompt context window is a universal pain point:
* **Claude Code:** Addressing bug [#94564] where `/compact` strips active skill definitions, leaving degraded summary fragments.
* **Pi:** Resolving exponential summary bloat (17k → 164k characters) during compaction and transcript sidecar bloat (90MB+ `.jsonl` files).
* **OpenCode:** Fixing DeepSeek session routing issues where provider load-balancers switch backends mid-session, completely invalidating the prompt cache.

### C. IDE Expansion & Multi-Surface Execution
Developers are actively resisting keeping AI agents confined strictly to standalone terminal windows:
* Top open feature requests across **Claude Code** (Visual Studio 2026 integration) and **OpenCode** (Official VS Code Extension) highlight massive demand for first-class IDE embeds.
* **OpenCode** is pushing further into remote surfaces, landing PRs for mobile push notifications, Cloudflare Durable Object worker execution, and binary WebSocket browser streaming.

---

## 4. Differentiation Analysis

```
+-----------------------------------------------------------------------------------+
|                                 ENTERPRISE POLISH                                 |
|                                                                                   |
|   Claude Code                                      GitHub Copilot CLI             |
|   • Model: Claude-native                           • Model: Multi-model (BYOK push)|
|   • Focus: Desktop GUI/CLI hybrid,                 • Focus: Enterprise compliance, |
|     security shell hooks, MCP skills                 ACP host bindings, sandboxing|
+-----------------------------------------------------------------------------------+
|                                 OPEN FLEXIBILITY                                  |
|                                                                                   |
|   OpenCode                                         Pi                             |
|   • Engine: Bun runtime / Cloudflare               • Engine: Low-level TS / RPC   |
|   • Focus: Remote execution architectures,         • Focus: Terminal protocol      |
|     multi-backend routing, mobile client             resilience (OSC), proxy adapters|
+-----------------------------------------------------------------------------------+
```

* **Claude Code (Anthropic):** Positioned as a polished, enterprise-ready power tool for Claude models. It prioritizes guardrails (shell security hooks), UI refinement (context-usage indicators), and native workflow features, but suffers from platform-specific edge cases (macOS TCC prompts, Windows PowerShell BOM issues).
* **GitHub Copilot CLI (GitHub/Microsoft):** Deeply tailored for corporate environments with strict boundary controls (sandboxing, ACP protocol editor dialogs). However, it exhibits significant friction with enterprise identity systems (Entra ID OAuth loopback failures, broken Linux keychains) and auto-generated git artifacts (`refs/agents/*`).
* **OpenCode (Anomaly):** Operates as a fast-paced, provider-agnostic engine written on modern web infrastructure (Bun, WebSockets, Durable Objects). It appeals to developers building custom workflows and mobile integrations, but faces configuration stability issues across minor versions.
* **Pi (Earendil Works):** Targets terminal purists and extension builders who demand exact control over the underlying byte stream, raw OSC escape codes, and local proxy configurations. It focuses heavily on low-overhead protocol performance over graphical fluff.

---

## 5. Community Momentum & Maturity

1. **Iteration Velocity:** **OpenCode** and **Pi** demonstrate the highest developer velocity, each merging 10+ core structural PRs within 24 hours to address low-level streaming bugs, V8 memory exhaustion, and new protocol standards.
2. **Community Demand Volatility:** **Claude Code** commands the highest single-issue community engagement, with enterprise developers heavily upvoting integration requests (VS 2026 issue with 497 👍).
3. **Architectural Bottlenecks:** Across the mature codebases (Claude Code, Copilot CLI), community friction centers on **security permissions and environment isolation** (sandbox directory leaks, missing WAF headers). In newer/open codebases (Pi, OpenCode), friction centers on **stream stability, memory leaks, and model proxy compatibility**.

---

## 6. Trend Signals for Technical Decision-Makers

* **Context Efficiency is a Direct Financial Metric:** Prompt cache invalidation—caused by poor provider routing (OpenCode/DeepSeek) or turn-2 full-context re-writes (Claude Code)—is causing unexpected billing spikes. Teams must audit CLI tool caching logic.
* **Agent Git Side-Effects Require Opt-Outs:** Automated side-effects, such as Copilot CLI writing automated git references (`refs/agents/*`), are creating friction with developer workflows. Tools must provide deterministic flags for automated git mutations.
* **The Death of Local Loopback for Enterprise OAuth:** Strict web application firewall (WAF) policies and Entra ID rules are breaking standard local loopback callbacks (`127.0.0.1`). CLI agent architectures must adopt headless or device-code OAuth flows for enterprise adoption.
* **Terminal Emulators are the New App Runtime:** Low-level terminal protocols (OSC 7501 status reporting, OSC 8 hyperlinking) are being pushed to their limits by streaming AI output, requiring CLI maintainers to build precise terminal-parsing engines to avoid shell locks up.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

Here is the Claude Code community digest for **November 25, 2026**.

---

### 1. Today's Highlights
Claude Code release **v2.1.332** leads today's updates, introducing beta support for Model Context Protocol (MCP) skills directly within the `/` slash menu and adding the `PreSkillShellCommand` hook to improve control over executing inline shell commands. Community discussions are heavily dominated by calls for enterprise IDE support—most notably **Visual Studio 2026 integration**—along with demand for granular session management (`/delete`) and fix requests around context caching efficiency.

---

### 2. Releases

*   **[v2.1.332](https://github.com/anthropics/claude-code/releases/tag/v2.1.332)**
    *   **MCP Server Skills (Beta):** Skills sourced from external MCP servers now automatically surface in the command palette as `server:skill`. Native skills retain their simple names.
    *   **Security Hooks:** Added `PreSkillShellCommand` hook event, allowing scripts or plugins to inspect and reject inline shell commands invoked when loading a skill or command.

---

### 3. Hot Issues

1.  **[#15942] [Add support for Visual Studio 2026 Integration](https://github.com/anthropics/claude-code/issues/15942)** *(158 comments, 497 👍)*
    *   **Why it matters:** The top-voted open feature request. Enterprise .NET/C++ developers relying on Visual Studio 2026 are requesting first-class integration parity with VS Code.

2.  **[#79305] [Desktop app: support custom themes / accent colors](https://github.com/anthropics/claude-code/issues/79305)** *(41 comments, 107 👍)*
    *   **Why it matters:** Users working across multiple monitors find dark-mode Desktop app windows indistinguishable from other modern dark apps. Requests parity with the CLI's custom theme engine.

3.  **[#26904] [[FEATURE] Add /delete command to delete current session](https://github.com/anthropics/claude-code/issues/26904)** *(28 comments, 115 👍)*
    *   **Why it matters:** Currently, cleaning up stray or sensitive session transcripts requires manual filesystem navigation or coarse project purges. Users want a simple native `/delete` command.

4.  **[#15379] [Jupyter Notebook edits in VS Code do not auto-refresh on disk write](https://github.com/anthropics/claude-code/issues/15379)** *(25 comments, 24 👍)*
    *   **Why it matters:** Disconnect between CLI file tool writes and VS Code editor state causes data science workflows to become out-of-sync unless manually reloaded.

5.  **[#90708] [Desktop app: bring back the context-usage indicator](https://github.com/anthropics/claude-code/issues/90708)** *(21 comments, 37 👍)*
    *   **Why it matters:** Developers prefer knowing context-window fill percentages (to prepare for compaction) over the standard 5-hour usage-limit ring currently in the footer.

6.  **[#79217] [Make auto-memory MEMORY.md index size limit configurable](https://github.com/anthropics/claude-code/issues/79217)** *(14 comments, 4 👍)*
    *   **Why it matters:** Memory auto-indexing truncates after the first 200 lines / 25KB, cutting off deep project memory for large codebases.

7.  **[#105621] [Usage limits drain drastically faster since mid-October 2026](https://github.com/anthropics/claude-code/issues/105621)** *(13 comments, 4 👍)*
    *   **Why it matters:** Reports of sudden acceleration in tier usage consumption despite unchanged development patterns, raising concerns over hidden context overhead.

8.  **[#83841] [macOS 26: "claude.app would like to access data from other apps" re-prompts per session](https://github.com/anthropics/claude-code/issues/83841)** *(11 comments, 12 👍)*
    *   **Why it matters:** A helper binary pathing bug on macOS 26 causes system TCC permission dialogs on every new session launch that cannot be permanently remembered.

9.  **[#94564] [Invoked skill not re-attached after manual /compact](https://github.com/anthropics/claude-code/issues/94564)** *(8 comments, 3 👍)*
    *   **Why it matters:** Contrary to documentation, active skill definitions disappear post-compaction, leaving only paraphrased summary fragments that reduce prompt fidelity.

10. **[#90962] [Windows: Write tool emits .ps1 without BOM breaking PowerShell 5.1](https://github.com/anthropics/claude-code/issues/90962)** *(6 comments, 1 👍)*
    *   **Why it matters:** UTF-8 files lacking BOM cause legacy PowerShell 5.1 environments to treat non-ASCII characters as ANSI, leading to silent script failures during background execution.

---

### 4. Key PR Progress

*   **[#45553] [resolve duplicate IPs](https://github.com/anthropics/claude-code/pull/45553)** *(Closed)*
    *   Internal cleanup PR addressing duplicate IP resolution logic in networking components.

*(Note: Pull request activity on the public repository was lower today; most core development activity was focused on issue triage and the v2.1.332 release).*

---

### 5. Feature Request Trends

*   **Granular Session Control:** Strong push for fine-grained commands like `/delete` ([#26904](https://github.com/anthropics/claude-code/issues/26904), [#85906](https://github.com/anthropics/claude-code/issues/85906)) and session visibility for Remote Control instances ([#94369](https://github.com/anthropics/claude-code/issues/94369)).
*   **Expanded IDE Support:** High demand to bring Claude Code beyond VS Code and JetBrains into Visual Studio 2026 ([#15942](https://github.com/anthropics/claude-code/issues/15942)).
*   **Configurable Context & Memory:** Requests to open up limits on context size thresholds, including `MEMORY.md` index caps ([#79217](https://github.com/anthropics/claude-code/issues/79217)) and compaction behavior ([#89797](https://github.com/anthropics/claude-code/issues/89797)).
*   **Desktop UI Customization:** Bringing CLI-grade features—such as custom themes ([#79305](https://github.com/anthropics/claude-code/issues/79305)) and context-window indicators ([#90708](https://github.com/anthropics/claude-code/issues/90708))—to the desktop GUI.

---

### 6. Developer Pain Points

*   **Prompt Cache Inefficiencies:** Issue [#105564](https://github.com/anthropics/claude-code/issues/105564) reveals that turn 2 of new sessions needlessly re-writes ~17k tokens of initial context back into the prompt cache, incurring unexpected billing/token overhead.
*   **Windows Edge Case Failures:** Path handling bugs in Git Bash hooks ([#109103](https://github.com/anthropics/claude-code/issues/109103)), missing BOMs on generated `.ps1` files ([#90962](https://github.com/anthropics/claude-code/issues/90962)), and CPU-pinning loops when `.claude` directories are deleted ([#104402](https://github.com/anthropics/claude-code/issues/104402)).
*   **State Loss Post-Compaction:** Skills drop out of active prompt context following a manual `/compact`, forcing developers to re-invoke skills mid-session ([#94564](https://github.com/anthropics/claude-code/issues/94564)).

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

# GitHub Copilot CLI Community Digest — 2026-11-25

## 1. Today's Highlights
The latest release cycle (v1.0.116 series and v1.0.115) introduces vital Model Context Protocol (MCP) enhancements, specifically adding warnings for endpoint conflicts between plugins and standalone servers, along with improved startup summaries. Concurrently, community discussions center heavily on environment isolation and security, with new issues highlighting sandbox file-leakage edge cases and persistent authentication hurdles across Linux and enterprise OAuth setups.

---

## 2. Releases
* **v1.0.116-3 / v1.0.116-2 / v1.0.116-1 / v1.0.116-0 / v1.0.115**
  * **Added:** Warnings when a plugin and standalone MCP server connect to the same endpoint (`/mcp`), options to choose context sizes in ACP-compatible editors, global process environment variable injection, and streamlined startup summaries that wait for explicit authentication triggers (`/mcp auth <name>`).
  * **Improved/Fixed:** Fixed background session reconnection issues, resolved Unix foreground prompt cancelation bugs, and enabled Windows sandbox package queries by default with configurable Mach service lookups on macOS.

---

## 3. Hot Issues
1. **[Ubuntu keychain support is broken (#2165)](https://github.com/github/copilot-cli/issues/2165)**
   * *Why it matters:* Authentication blocks developers on Linux when standard keychains fail and documentation steps fall short.
   * *Community reaction:* Highly active with 23 thumbs up, demanding better fallback credentials storage on Ubuntu.
2. **[Files denied in a CoPilot sandbox are read and copied by the CLI into COPILOT_HOME (#5564)](https://github.com/github/copilot-cli/issues/5564)**
   * *Why it matters:* Raises security and compliance flags if restricted files are accidentally cached in plaintext backups despite sandbox policies.
   * *Community reaction:* Freshly filed, signaling immediate concern regarding sandbox isolation guarantees.
3. **[MCP OAuth: Entra rejects 127.0.0.1 callback (AADSTS50011) (#5040)](https://github.com/github/copilot-cli/issues/5040)**
   * *Why it matters:* Enterprise users relying on Microsoft Entra ID cannot authenticate remote HTTP MCP servers due to rigid loopback validation.
   * *Community reaction:* Frustration among enterprise developers using local loopback authentication ports.
4. **[MCP registry requests omit User-Agent and fail AWS WAF validation (#5568)](https://github.com/github/copilot-cli/issues/5568)**
   * *Why it matters:* Prevents IDE extensions and CLI tools from pulling essential MCP configurations behind standard AWS WAF rulesets.
   * *Community reaction:* Viewed as a critical blocker for Atlassian and enterprise-hosted MCP registries.
5. **[Add setting to disable agent checkpoint refs (refs/agents/*) (#5323)](https://github.com/github/copilot-cli/issues/5323)**
   * *Why it matters:* Agent turns pollute user git repositories with automated checkpoint branches, messing up local git workflows.
   * *Community reaction:* Strong developer desire for a clean git history without automated agent ref clutter.
6. **[Session wedges permanently when a queued-lane message lands at turn end (#4755)](https://github.com/github/copilot-cli/issues/5323 / #4755)](https://github.com/github/copilot-cli/issues/4755)**
   * *Why it matters:* Completely freezes agent sessions in a non-responsive state requiring a hard process kill.
   * *Community reaction:* High disruption to developer workflow reliability during active prompting.
7. **[BYOK: Support multiple external models/providers (#4976)](https://github.com/github/copilot-cli/issues/4976)**
   * *Why it matters:* Limits advanced users who want to switch between multiple custom model backends beyond a single provider configuration.
   * *Community reaction:* Gaining significant traction (8 👍) to achieve parity with the broader GitHub Copilot app.
8. **[Copilot CLI rg compaction corrupts filenames with multiple numeric suffixes (#5560)](https://github.com/github/copilot-cli/issues/5560)**
   * *Why it matters:* Built-in search compaction bugs mangle file paths, confusing the agent and breaking code traversal accuracy.
   * *Community reaction:* Zeroed in on internal text-parsing edge cases within built-in tools.
9. **[ACP: toolCall.title contains high-level summary instead of executable command (#4335)](https://github.com/github/copilot-cli/issues/4335)**
   * *Why it matters:* Host editors (like Zed) hiding actual shell commands behind vague natural language descriptions create security blind spots for user approvals.
   * *Community reaction:* Garnered solid support (4 👍) for transparency in ACP client approval modals.
10. **[create_session hangs indefinitely when child session host fails to register (#5565)](https://github.com/github/copilot-cli/issues/5565)**
    * *Why it matters:* Missing timeouts on child session registration cause parent agent turns to lock up indefinitely.
    * *Community reaction:* Highlights robustness gaps in subsession orchestration.

---

## 4. Key PR Progress
* *No pull requests were updated in the provided data window for this digest.*

---

## 5. Feature Request Trends
* **Multi-Provider Bring-Your-Own-Key (BYOK):** Expanding flexibility to configure and seamlessly switch between multiple external model providers.
* **Granular Agent & State Customization:** Ability to set default agents globally and selectively disable automated background side-effects like git checkpoint refs (`refs/agents/*`).
* **Environment Configuration Parity:** Demanding equal configuration options (such as `contextTier` and specific session behaviors) between interactive CLI sessions and non-interactive/ACP host environments.

---

## 6. Developer Pain Points
* **MCP Integration Friction:** Complexities surrounding OAuth loopback redirects (Entra ID), missing User-Agent headers triggering AWS WAF blocks, and expired authentications lacking clear UI pathways.
* **Terminal & Rendering Degradation:** Text truncation bugs in long terminal streams, lack of markdown support in structured `ask_user` prompts, and Gemini-specific reasoning blocks failing to respect expansion preferences.
* **Cross-Platform Environment Quirks:** Persistent edge cases with Windows CRLF file conversions, NumLock-off numpad navigation glitches, and Linux keychain management failures.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-11-25

## Today's Highlights
The OpenCode repository continues to experience heavy development velocity, focusing heavily on UI/UX stability in the desktop and TUI apps, expanding mobile capabilities (push notifications), and improving remote execution architectures (Cloudflare Durable Objects and WebSocket integration). Key core engine fixes address memory and performance bottlenecks, AI SDK V2-to-V3 model bridging, and MCP skill resolution edge cases.

---

## Releases
*(No new releases published in the last 24 hours.)*

---

## Hot Issues
1. **[#11176 - Official OpenCode VS Code extension](https://github.com/anomalyco/opencode/issues/11176)**
   * **Why it matters:** Brings OpenCode natively into Visual Studio Code.
   * **Community reaction:** Highly requested with 164 👍 and 41 comments, showing massive user demand for IDE integration outside the standalone Desktop and TUI apps.
2. **[#64073 - Restore Foreground Subagent Execution](https://github.com/anomalyco/opencode/issues/64073)**
   * **Why it matters:** Affects core execution workflows for background tasks in v2.
   * **Community reaction:** Active discussion (27 comments) around agent orchestration and visibility.
3. **[#52958 - OpenCode Go subscription: all payment methods declined from Italy (EU)](https://github.com/anomalyco/opencode/issues/52958)**
   * **Why it matters:** Blocks regional users from subscribing to paid tiers.
   * **Community reaction:** High frustration (27 comments) concerning Stripe/Apple Pay and regional card acceptance failures.
4. **[#66067 - Go: deepseek-v4.1-flash requests routed across multiple backends invalidating prompt cache](https://github.com/anomalyco/opencode/issues/66067)**
   * **Why it matters:** Causes cache misses and unnecessary prefix re-billing on high-frequency LLM usage.
   * **Community reaction:** 19 comments detailing provider session routing flaws.
5. **[#28030 - Add ability to delete projects in OpenCode Desktop](https://github.com/anomalyco/opencode/issues/28030)**
   * **Why it matters:** A missing basic CRUD feature for project management in the desktop app.
   * **Community reaction:** Closed after ongoing community backing (21 👍).
6. **[#56218 - v2: `opencode -m provider/model` no longer accepted on root command](https://github.com/anomalyco/opencode/issues/56218)**
   * **Why it matters:** Breaking CLI regression from v1 to v2 affecting automated scripts and user habits.
   * **Community reaction:** Multiple users chiming in over CLI flag parsing.
7. **[#52333 - Config hot-reload bypasses `provider.use` deny policies](https://github.com/anomalyco/opencode/issues/52333)**
   * **Why it matters:** Security flaw allowing prompt traffic to momentarily route to unauthorized/third-party free providers during hot-reloads.
   * **Community reaction:** Tracked as high severity for enterprise environments.
8. **[#51542 - `/thinking` & `/effort` do the same](https://github.com/anomalyco/opencode/issues/51542)**
   * **Why it matters:** Command behavior conflation confuses reasoning controls for advanced models.
   * **Community reaction:** Users requesting distinct separation between thought visibility and effort level.
9. **[#66110 - v2: new session sometimes defaults to `opencode/big-pickle` instead of configured model](https://github.com/anomalyco/opencode/issues/66110)**
   * **Why it matters:** Disrupts default configurations forcing users to manually re-select models per session.
   * **Community reaction:** Frustration over configuration parsing lapses in v2.4.1.
10. **[#66203 - TUI: Model variant becomes sticky after selecting `#high`](https://github.com/anomalyco/opencode/issues/66203)**
    * **Why it matters:** Locks users into specific reasoning variants without an easy way to revert via UI commands.
    * **Community reaction:** Quickly triaged and closed following user reports.

---

## Key PR Progress
1. **[#66242 - fix(core): stop Code Mode Bun.write from walking every byte of a Uint8Array](https://github.com/anomalyco/opencode/pull/66242)**
   * Fixes a severe performance freeze in Code Mode by avoiding unnecessary byte-by-byte traversal in `Bun.write`.
2. **[#66130 - feat(core): add push notifications for the mobile apps](https://github.com/anomalyco/opencode/pull/66130)**
   * Lays the foundational server architecture to support push alerts on mobile clients.
3. **[#66240 - feat(sdk,core,server): wire OpenCodeWorkerd alarm(), WorkspaceDriver Identity, and WorkerClient.fromWebSocket](https://github.com/anomalyco/opencode/pull/66240)**
   * Part of the remote execution plane stack, integrating Cloudflare Durable Object hibernation alarms and remote WebSocket workers.
4. **[#66217 - feat(browser): stream remote browser traffic over multiplexed binary WebSocket](https://github.com/anomalyco/opencode/pull/66217)**
   * Enhances remote browser interaction capabilities via binary multiplexed WebSockets.
5. **[#66164 - fix(core): bridge AI SDK V2 language models to V3](https://github.com/anomalyco/opencode/pull/66164)**
   * Closes #66153, resolving compatibility crashes for providers (like SAP AI Core) utilizing AI SDK V2 models.
6. **[#65682 - refactor(core): rename media tools to `generate_image` and `generate_video`](https://github.com/anomalyco/opencode/pull/65682)**
   * Cleans up experimental media generation tool namespaces ahead of upcoming releases.
7. **[#66220 - fix(core): load an MCP skill given only its URI](https://github.com/anomalyco/opencode/pull/66220)**
   * Implements support for resolving and loading Model Context Protocol (MCP) skills strictly from a URI reference.
8. **[#66206 - feat(core): add an opt-in workspace scope for regular file reads](https://github.com/anomalyco/opencode/pull/66206)**
   * Introduces a provider-neutral, opt-in mechanism for native Linux regular-file read permissions and workspace verification.
9. **[#66238 - fix(cli): don't kill a slow package install](https://github.com/anomalyco/opencode/pull/66238)**
   * Closes #63743 by removing the rigid five-minute global deadline on package installations during upgrades.
10. **[#59122 - fix(ai): omit reasoning defaults for versioned chat models](https://github.com/anomalyco/opencode/pull/59122)**
    * Closes #59119, preventing versioned chat endpoints (e.g., `gpt-5.2-chat`) from incorrectly inheriting reasoning parameters.

---

## Feature Request Trends
* **IDE Integrations:** Expanding beyond standalone applications, users heavily demand native extensions (specifically for VS Code).
* **Enhanced Sandboxing & Permissions:** Requests for finer-grained execution controls, easier permission toggling, and stricter workspace read scopes.
* **Localization & Accessibility:** Growing attention toward custom display currencies (e.g., CNY), non-Latin keyboard layout shortcut handling, and screen reader announcements for streaming outputs.
* **Mobile Ecosystem:** Continued expansion of mobile features, including push notifications and improved remote pairing reliability.

---

## Developer Pain Points
* **Session & Routing Inconsistencies:** Issues like backend router switching breaking provider prompt caching (DeepSeek) and intermittent fallbacks to default models (`big-pickle`).
* **Hot-Reload Vulnerabilities:** Race conditions during configuration hot-reloads that can temporarily expose sessions to denied or unintended third-party providers.
* **UI Scroll & History Lag:** Long-running sessions suffering from timeline re-rendering hiccups, aggressive history pagination limits, and focus loss during chat stream updates.
* **Platform-Specific Quirks:** Path comparison bugs on Windows environments (breaking pre-push hooks and scripts) and clipboard/mouse capture glitches inside WSL2 terminal sessions.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest: 2026-11-25

### 1. Today's Highlights
Development efforts over the last 24 hours have been heavily focused on stabilizing model integration, particularly addressing mid-turn failure modes in newer Gemini and Claude models. The community is also seeing significant backend hardening, with critical improvements in terminal signaling (OSC 7501) and streaming performance for large events.

---

### 2. Releases
*No new releases in the last 24h.*

---

### 3. Hot Issues
1. **[#10956] Cache Warming "Idle" Failure**: Users report that `cacheWarming: "idle"` stops firing once context includes custom/compaction messages. This impacts session continuity. [Link](https://github.com/earendil-works/pi/issues/10956)
2. **[#12242] Compaction Summary Bloat**: Compaction summaries are growing exponentially (17k to 164k characters), causing extreme token usage and latency. [Link](https://github.com/earendil-works/pi/issues/12242)
3. **[#12407] Gemini-4-neon Stream Stalls**: A critical bug where OpenRouter normalization of `MALFORMED_RESPONSE` causes streams to cut off mid-sentence. [Link](https://github.com/earendil-works/pi/issues/12407)
4. **[#12224] MCP SSE Stream Rescan**: Large events cause performance degradation due to inefficient string concatenation during SSE stream consumption. [Link](https://github.com/earendil-works/pi/issues/12224)
5. **[#12443] Xhigh Thinking Failures**: Users are unable to use `xhigh` thinking levels for Gemini-4-neon, despite Google’s official support. [Link](https://github.com/earendil-works/pi/issues/12443)
6. **[#12147] RPC Mode Blocking**: Extension dialogs triggered during `session_start` in RPC mode cannot be answered, leading to immediate process exit. [Link](https://github.com/earendil-works/pi/issues/12147)
7. **[#10592] Selection Clearing**: A UX quality-of-life request to automatically clear highlighted text in fullscreen mode when the user begins typing. [Link](https://github.com/earendil-works/pi/issues/10592)
8. **[#12440] Startup OSC 7501 Conflicts**: Late terminal replies are causing "blocked" status reporting to break for subsequent terminal processes. [Link](https://github.com/earendil-works/pi/issues/12440)
9. **[#12433] Developer Role Rejection**: OpenAI-compatible proxies that reject the `developer` role are currently failing because Pi forces this role by default. [Link](https://github.com/earendil-works/pi/issues/12433)
10. **[#12506] Transcript Sidecar Bloat**: High-frequency tool usage is ballooning `.jsonl` transcripts (90MB+), leading to requests for payload elision. [Link](https://github.com/earendil-works/pi/issues/12506)

---

### 4. Key PR Progress
1. **[#12451] Stream Reader Optimization**: Implements linear time complexity for large streamed lines, preventing performance bottlenecks in MCP/AI packages. [Link](https://github.com/earendil-works/pi/pull/12451)
2. **[#12489] Claude Thinking Support**: Fixes incorrect "disabled" thinking state triggers for Claude Opus/Sonnet 5.5 across all providers. [Link](https://github.com/earendil-works/pi/pull/12489)
3. **[#12502] HTTP Error Reporting**: Ensures `onResponse` fires for 4xx/5xx errors, allowing extensions to surface diagnostic info. [Link](https://github.com/earendil-works/pi/pull/12502)
4. **[#12495] Copilot Model Filtering**: Corrects the model catalog to filter out restricted models based on user account billing status. [Link](https://github.com/earendil-works/pi/pull/12495)
5. **[#12494] Git Bash Discovery**: Improves Windows path probing to locate non-standard Git installations instead of falling back to WSL. [Link](https://github.com/earendil-works/pi/pull/12494)
6. **[#12479] Stateless MCP Protocol**: Adds support for the 2026-07-28 stateless MCP revision. [Link](https://github.com/earendil-works/pi/pull/12479)
7. **[#12487] Startup Dialog Signaling**: Properly reports OSC 7501 status for startup dialogs, fixing unattended session hangs. [Link](https://github.com/earendil-works/pi/pull/12487)
8. **[#12470] OpenRouter Native Finish Reason**: Properly handles native finish reasons to prevent Gemini errors from being ignored. [Link](https://github.com/earendil-works/pi/pull/12470)
9. **[#12475] OSC 8 Link Truncation**: Prevents V8 heap exhaustion by limiting OSC 8 hyperlinks for extremely long URLs. [Link](https://github.com/earendil-works/pi/pull/12475)
10. **[#12438] Overflow Match Precision**: Fixes erroneous context overflow classification for identifiers containing "request_too_large". [Link](https://github.com/earendil-works/pi/pull/12438)

---

### 5. Feature Request Trends
*   **Local Backend Expansion**: Increased demand for Postgres integration for the Durable storage layer [#12507].
*   **Intelligent Elision**: Requests for more granular control over what is recorded in logs and transcripts to save disk space [#12506].
*   **Native Provider Support**: Continued growth in requests for built-in, pre-configured support for newer models like EXAONE 2.5 [#12481].

---

### 6. Developer Pain Points
*   **Terminal/Shell Complexity**: Significant friction remains in terminal integration, particularly with OSC reporting, path resolution on Windows, and clipboard handling in different terminal emulators.
*   **Adapter Fragmentation**: Developers are struggling to maintain extensions due to inconsistent behavior across "OpenAI-compatible" proxies and SDK-based adapters regarding error reporting and role handling.
*   **State Management**: Complexities in mid-turn compaction, output budget estimation, and Durable state are emerging as significant technical hurdles for power users.

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