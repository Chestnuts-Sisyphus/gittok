# AI CLI Tools Community Digest 2026-09-11

> Generated: 2026-09-10 22:04 UTC | Tools covered: 9

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

**AI CLI Tool Landscape – 11 Sept 2026**

---

### 1. Ecosystem Overview  
The AI‑CLI ecosystem is in a rapid‑iteration phase, with three major projects (Claude Code, OpenAI Codex, Gemini CLI) pushing new releases and a steady flow of issue and PR activity. While the core focus remains on tighter sandboxing, richer developer controls, and persistent state, there is a clear shift toward “self‑evolving” workflows and user‑driven UI/UX customisations. Smaller projects (GitHub Copilot, Kimi, OpenCode, Pi, Qwen, DeepSeek) are either behind or lack publicly visible activity for this cycle.

---

### 2. Activity Comparison  

| Tool | Hot Issues | PRs (Key Progress) | Release(s) Today |
|------|------------|--------------------|------------------|
| **Claude Code** | 10 | 4 | v2.1.268 (gateway pricing + CIDR warning) |
| **OpenAI Codex** | 10 | 10 | `python‑v0.154.0` / `openai‑codex‑cli‑bin 0.154.0`, Rust alpha releases, GPT‑6‑Astra live |
| **Gemini CLI** | 10 | 10 | v0.61.0‑nightly.20260910 (stabilisation) |
| **GitHub Copilot CLI** | – | – | – |
| **Kimi Code CLI** | – | – | – |
| **OpenCode** | – | – | – |
| **Pi** | – | – | – |
| **Qwen Code** | – | – | – |
| **DeepSeek TUI** | – | – | – |

*(“Hot Issues” = issues listed in the community digest; PRs = key progress items highlighted in the digest.)*

---

### 3. Shared Feature Directions  

| Need | Tools | Notes |
|------|-------|-------|
| **Persistent / durable state** – avoid “in‑context” bloat, enable offline continuity | Claude Code, Gemini CLI, OpenAI Codex (via `/compress`, `/learn`) | Common complaints about temporary file churn and memory usage. |
| **Granular permission / automation** – allow‑list actions, reduce prompts | Claude Code (session‑management automation), Gemini CLI (MCP policy enforcement), Codex (managed‑model enforcement) | All three emphasize tighter sandbox controls. |
| **Multi‑account / multi‑window workflows** – simultaneous sessions, independent windows | Claude Code (multiple connector accounts, desktop multi‑window) | No direct equivalent in Codex/Gemini yet, but related to session isolation. |
| **AST‑aware tooling / file‑level diff** – reduce token overhead | Gemini CLI (AST‑awareness), Claude Code (diff pane integration) | Cross‑tool trend toward parsing files rather than raw text. |
| **UI/UX toggles & “decorations”** – hide pets, sidebar, visual fluff | Codex (pets, sidebar toggle), Claude Code (desktop integration hints), Gemini CLI (none yet) | Power‑user focus on distraction‑free dev environments. |
| **Self‑evolving agents / dynamic skill updates** – `/learn`, AGENTS.md updates | Codex (RFC on self‑evolution) | No direct analog in Claude Code or Gemini yet. |

---

### 4. Differentiation Analysis  

| Aspect | Claude Code | OpenAI Codex | Gemini CLI |
|--------|-------------|--------------|------------|
| **Primary Focus** | Desktop‑centric developer experience; diff engine & extension mods | Model‑control & quota management; GPT‑6‑Astra integration | Agent‑oriented workflows; sandbox hardening & security |
| **Target Users** | VS Code/desktop users needing local‑side edits & diff visualisation | Enterprise & pro developers requiring fine‑grained usage limits & OAuth plumbing | AI‑researchers & tool builders prioritising agent reliability & safety |
| **Technical Approach** | Rust‑backed core with modular “mods”; emphasis on UI diff rendering | Multi‑language SDKs (Python, Rust), telemetry‑first model switching, OAuth‑centric auth | Agent sandbox isolation, path‑traversal hardening, AST‑based file handling |
| **Key Pain‑Points** | Windows‑specific bugs (Plan9 mounts, MSIX process locking) | Quota sync bugs, OAuth fragility, Windows sandbox regressions | Agent hangs, tool‑scope limits, browser subagent incompatibility |
| **Release Cadence** | Regular feature releases (v2.x) + nightly patches | Multiple language releases + nightly for GPT‑6‑Astra | Nightly builds with heavy security patches |

---

### 5. Community Momentum & Maturity  

- **OpenAI Codex** shows the highest PR density (10 key PRs) and the most varied release set, indicating a mature, enterprise‑ready stack with active roadmap execution.  
- **Claude Code** maintains a solid issue queue (10) and a focused PR list (4), signalling steady iteration with strong desktop integration.  
- **Gemini CLI** has a comparable number of issues/PRs, but the bulk of its work is defensive (security hardening), suggesting a more cautious, stability‑first approach.  
- The remaining projects (Copilot, Kimi, OpenCode, Pi, Qwen, DeepSeek) lack visible activity for this cycle; their communities appear either dormant or still in early‑alpha stages.

---

### 6. Trend Signals – Reference for Developers  

1. **Security & Sandbox Hardening** – All three projects are investing heavily in path‑traversal defenses, environment isolation, and MFA/OAuth resilience.  
2. **State Persistence & Memory Efficiency** – Persistent storage of task state and memory is a top‑ranked request, driving moves away from purely in‑context models.  
3. **Self‑Evolving / Auto‑Learning Agents** – Codex’s `/learn` and Gemini’s meta‑awareness PRs signal an industry push toward agents that can update their own skill sets.  
4. **Customisable UI** – A strong, cross‑project desire to toggle decorative elements (pets, sidebars) reflects a growing focus on developer ergonomics.  
5. **Multi‑Account & Session Isolation** – Claude Code’s demand for multiple connector accounts and desktop window separation underlines a need for parallel, isolated workflows that are not yet mainstream in other tools.  

**Takeaway for Decision‑Makers:**  
If your priority is a ready‑to‑use, desktop‑centric tool with robust diffing, Claude Code is the most mature candidate. For enterprises demanding fine‑grained usage control and advanced model selection (including GPT‑6‑Astra), OpenAI Codex is the clear choice. If agent reliability and security hardening are paramount, Gemini CLI’s defensive posture and agent‑centric feature set makes it the most suitable. The other projects lack sufficient activity to warrant immediate adoption at this time.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights  
**Data as of 2026-09-11**  

*Note: PR comment counts were not exposed in the provided extract; the ranking below uses the supplied top-20 PR ordering as the attention signal and cross-references high-comment Issues where relevant.*

---

## 1. Top Skills Ranking

1. **skill-creator evaluation repair** — [PR #1298](https://github.com/anthropics/skills/pull/1298)  
   **Functionality:** Fixes the `skill-creator` evaluation loop by making `run_eval.py` install the eval artifact as a real skill, and repairs Windows stream reading, trigger detection, and parallel-worker behavior.  
   **Discussion highlights:** Addresses the severe `recall=0%` problem described in [Issue #556](https://github.com/anthropics/skills/issues/556), and is closely related to Windows-specific eval fixes in [PR #1099](https://github.com/anthropics/skills/pull/1099) and [PR #1050](https://github.com/anthropics/skills/pull/1050). This is currently one of the most consequential reliability issues in the Skills ecosystem.  
   **Status:** OPEN

2. **document-typography** — [PR #514](https://github.com/anthropics/skills/pull/514)  
   **Functionality:** Adds a skill for typographic quality control in generated documents, targeting orphan word wrap, widow paragraphs, and numbering misalignment.  
   **Discussion highlights:** Positioned as a broad quality layer for AI-generated documents rather than a niche formatter; it has remained open through multiple updates since early 2026.  
   **Status:** OPEN

3. **Detect orphaned DOCX comments** — [PR #1734](https://github.com/anthropics/skills/pull/1734)  
   **Functionality:** Adds detection of orphaned comments in DOCX documents.  
   **Discussion highlights:** Very recent submission, part of the broader DOCX robustness theme also visible in [PR #541](https://github.com/anthropics/skills/pull/541) for tracked-change ID collisions.  
   **Status:** OPEN

4. **scnet-hpc** — [PR #1615](https://github.com/anthropics/skills/pull/1615)  
   **Functionality:** Adds a skill for operating SCNet HPC clusters through profile-based SSH and Slurm workflows, including job generation, cluster discovery, and compute-node guidance.  
   **Discussion highlights:** Recent addition targeting scientific/enterprise compute automation rather than general software development.  
   **Status:** OPEN

5. **pdf case-sensitive reference fix** — [PR #538](https://github.com/anthropics/skills/pull/538)  
   **Functionality:** Corrects case-sensitive file references in the `pdf` skill’s `SKILL.md`, aligning them with the actual lowercase `reference.md` and `forms.md` files.  
   **Discussion highlights:** A small but important correctness fix for cross-platform compatibility, especially on case-sensitive filesystems.  
   **Status:** OPEN

6. **ODT skill** — [PR #486](https://github.com/anthropics/skills/pull/486)  
   **Functionality:** Adds support for creating, filling, reading, and converting OpenDocument files such as `.odt` and `.ods`, including parsing ODT to HTML.  
   **Discussion highlights:** Fills an office-document gap alongside existing DOCX/PDF capabilities and emphasizes open/ISO-standard document workflows.  
   **Status:** OPEN

7. **frontend-design clarity improvements** — [PR #210](https://github.com/anthropics/skills/pull/210)  
   **Functionality:** Revises the `frontend-design` skill to improve clarity, actionability, and internal coherence, with a focus on instructions Claude can follow within a single conversation.  
   **Discussion highlights:** Represents a trend toward making skills more operational and less explanatory, improving token efficiency and behavioral steering.  
   **Status:** OPEN

8. **skill-quality-analyzer and skill-security-analyzer** — [PR #83](https://github.com/anthropics/skills/pull/83)  
   **Functionality:** Adds two meta-skills for evaluating skill quality and security, including structure, documentation, examples, and risk analysis.  
   **Discussion highlights:** Long-running proposal that aligns strongly with the security and trust concerns raised in [Issue #492](https://github.com/anthropics/skills/issues/492).  
   **Status:** OPEN

---

## 2. Community Demand Trends

- **Security, trust boundaries, and skill governance**  
  The highest-attention issue is [Issue #492](https://github.com/anthropics/skills/issues/492), with 43 comments, about community skills being distributed under an `anthropic/` namespace and enabling trust-boundary abuse. Related themes appear in [Issue #1175](https://github.com/anthropics/skills/issues/1175) on secure handling of SharePoint Online documents and [Issue #412](https://github.com/anthropics/skills/issues/412), a proposal for an `agent-governance` skill.  
  **Demand signal:** stronger provenance, permission scoping, audit trails, and security-analysis skills.

- **Reliable skill authoring, evaluation, and QA**  
  [Issue #556](https://github.com/anthropics/skills/issues/556) shows that the `skill-creator` evaluation loop is producing misleading results, while [Issue #202](https://github.com/anthropics/skills/issues/202) argues that `skill-creator` should move from documentation-style prose to more operational best practice. Additional pressure comes from [Issue #1390](https://github.com/anthropics/skills/issues/1390) on broken MCP-builder evaluation and [Issue #1487](https://github.com/anthropics/skills/issues/1487) on context-busting token injection.  
  **Demand signal:** better eval harnesses, validation tooling, and quality-gate skills.

- **Enterprise distribution and collaboration**  
  [Issue #228](https://github.com/anthropics/skills/issues/228) requests org-wide skill sharing in Claude.ai, and [Issue #189](https://github.com/anthropics/skills/issues/189) reports duplicate skills caused by overlapping plugin installs.  
  **Demand signal:** shared skill libraries, cleaner packaging, and organization-level distribution.

- **Context efficiency and agent memory**  
  [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes a `compact-memory` skill for symbolic agent state, while [Issue #1487](https://github.com/anthropics/skills/issues/1487) highlights skills that eagerly consume too many tokens.  
  **Demand signal:** lazy loading, bounded context injection, and memory-compaction capabilities.

- **Interoperability and platform portability**  
  [Issue #16](https://github.com/anthropics/skills/issues/16) proposes exposing Skills as MCPs, and [Issue #29](https://github.com/anthropics/skills/issues/29) asks how to use Skills with AWS Bedrock.  
  **Demand signal:** protocol-level portability beyond a single runtime or provider.

---

## 3. High-Potential Pending Skills

These are open PRs with recent activity or strong issue linkage that may be likely candidates to land soon:

- **[fix(mcp-builder): support mcp>=2 streamable HTTP client and custom headers — PR #1742](https://github.com/anthropics/skills/pull/1742)**  
  Recent, narrowly scoped compatibility fix for `mcp-builder`, likely to unblock MCP integration work.

- **[Detect orphaned DOCX comments — PR #1734](https://github.com/anthropics/skills/pull/1734)**  
  Very recent DOCX enhancement, extending document-intpection and repair capabilities.

- **[Add scnet-hpc skill — PR #1615](https://github.com/anthropics/skills/pull/1615)**  
  Recent, self-contained addition for HPC/Slurm workflows; a clear candidate for a new domain-specific skill.

- **[Add Hivemind: Zero-Cost Multi-Agent Orchestration — PR #1628](https://github.com/anthropics/skills/pull/1628)**  
  Proposes delegating mechanical work to headless workers while keeping Claude Code as planner/reviewer/merger; strong cost-optimization angle.

- **[Add buffer-api Agent Skill — PR #1627](https://github.com/anthropics/skills/pull/1627)**  
  Portable social-scheduling skill for the Buffer GraphQL API; recent updates suggest continued author engagement.

- **[self-audit: mechanical verification + reasoning quality gate — PR #1367](https://github.com/anthropics/skills/pull/1367)**  
  Adds pre-delivery output verification and reasoning-quality checks, closely aligned with the quality-gate proposal in [Issue #1385](https://github.com/anthropics/skills/issues/1385).

- **[mcp-builder: update evaluation.py default model to claude-sonnet-5 — PR #1724](https://github.com/anthropics/skills/pull/1724)**  
  Recent maintenance/update PR that keeps `mcp-builder` aligned with newer model defaults.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is for **trustworthy skill lifecycle tooling** — reliable authoring and evaluation, security/trust validation, and context-safe enterprise distribution, as seen in [#556](https://github.com/anthropics/skills/issues/556), [#492](https://github.com/anthropics/skills/issues/492), and [#228](https://github.com/anthropics/skills/issues/228).

---

# Claude Code Community Digest (2026-09-11)

### 1. Today's Highlights
Release `v2.1.268` introduces gateway pricing support for managed settings and startup warnings for unconstrained CIDR blocks. Meanwhile, the community is actively tracking critical Windows platform bugs—such as Plan9 mount failures and process-locking issues—alongside architectural improvements to built-in extension mods and the diff engine.

---

### 2. Releases
- **[v2.1.268](https://github.com/anthropics/claude-code)**
  - Added enterprise gateway pricing support: signed-in clients configured via `gateway.yaml` inherit managed pricing rates to ensure telemetry and `/cost` meters align.
  - Added a startup warning for gateways when `access_control.allow_cidrs` is left empty.

---

### 3. Hot Issues
1. **[#27302 - Support multiple Connector accounts](https://github.com/anthropics/claude-code/issues/27302)**
   - *Why it matters:* Allows developers to use multiple accounts for the same connector simultaneously on the web. Highly requested with 373 thumbs-up.
2. **[#92984 - Cowork (Windows): Plan9 mount failures after update KB5124008](https://github.com/anthropics/claude-code/issues/92984)**
   - *Why it matters:* Breaks local shares for Windows users following OS updates, though rolling back the patch provides a temporary workaround.
3. **[#30154 - Multi-window support in Claude Code Desktop](https://github.com/anthropics/claude-code/issues/30154)**
   - *Why it matters:* A major UX friction point (232 👍) preventing users from running multiple independent app windows within a single instance.
4. **[#8660 - Edit preview/diff not showing in VSCode extension UI](https://github.com/anthropics/claude-code/issues/8660)**
   - *Why it matters:* Disrupts the inline review workflow inside VSCode when attempting to confirm file edits.
5. **[#49917 - Windows installer fails with AddPackage HRESULT 0x80073CF6](https://github.com/anthropics/claude-code/issues/49917)**
   - *Why it matters:* Leaves previous installations in an inconsistent state, blocking smooth application upgrades on Windows.
6. **[#80015 - Task-list tools no longer exposed to the model](https://github.com/anthropics/claude-code/issues/80015)**
   - *Why it matters:* Regresses model capabilities by stripping native access to `TaskCreate`, `TaskUpdate`, and related management tools.
7. **[#91763 - Windows/MSIX: `git fsmonitor--daemon` blocks updates](https://github.com/anthropics/claude-code/issues/91763)**
   - *Why it matters:* Background git daemons inherit job containers and survive forced shutdowns, throwing error `0x80070020` during app relaunches.
8. **[#89812 - Linux Desktop: session_stale_relogin forces daily re-authentication](https://github.com/anthropics/claude-code/issues/89812)**
   - *Why it matters:* Annoying daily credential drops disrupt long-running tasks and Cowork folder-access workflows on Linux.
9. **[#89392 - Bash tool silently strips backslashes on Windows/Git Bash](https://github.com/anthropics/claude-code/issues/89392)**
   - *Why it matters:* Corrupts path strings and command payloads by collapsing `\\` pairs into a single backslash before passing to bash `argv`.
10. **[#93469 - Local ~/.claude directory silently reset on disk](https://github.com/anthropics/claude-code/issues/93469)**
    - *Why it matters:* Causes data loss by wiping local settings, custom skills, and per-project memory directories without touching the root config file.

---

### 4. Key PR Progress
1. **[#93452 - mods/diff: match the built-in /diff panel](https://github.com/anthropics/claude-code/pull/93452)**
   - Brings the modular diff pane closer to core UI behavior with engine-rendered code elements and improved narrow-terminal spacing.
2. **[#93244 - mods: API renames, telemetry fixes, and a diff backend seam](https://github.com/anthropics/claude-code/pull/93244)**
   - Refines plugin API naming conventions, hardens telemetry boundaries, and introduces a version control backend seam.
3. **[#89404 - validate-agent.sh: fix false-flagging and abort errors](https://github.com/anthropics/claude-code/pull/89404)**
   - Resolves strict `set -euo pipefail` exit behaviors in plugin validation scripts, preventing premature script abortion.
4. **[#93215 - Add mods: sec-default, diff and telemetry](https://github.com/anthropics/claude-code/pull/93215)**
   - Ships early-access source for built-in hooks modules (`sec-default`, `diff`, and telemetry).

---

### 5. Feature Request Trends
- **Multi-account & Multi-window workflows:** High demand for handling multiple connector accounts simultaneously and supporting multi-window desktop app instances.
- **Granular Permissions & Automation:** Requests to allow-list session management actions (like archiving or moving folders) without prompting for approval on every call.
- **Deep Desktop Integrations:** Better controls over automated routines, scheduled task auto-archiving, and clearer visual indicators for background agents.

---

### 6. Developer Pain Points
- **Windows Environment Headaches:** Frequent friction points around Git Bash backslash handling, MSIX app container process-locking during updates (`0x80070020`), and Plan9 share mount stability.
- **State and Credential Flakiness:** Sudden data loss in local `.claude` directories, frequent daily re-authentications on Linux (`session_stale_relogin`), and token usage anomalies upon session initialization.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — September 11, 2026

## 1. Today's Highlights
Today's updates focus heavily on expanding developer controls, hardening security policies for sandbox and offline environments, and integrating early access to **GPT-6-Astra** across the model picker and remote catalogs. Additionally, maintainers have rolled out critical hotfixes addressing rate-limit reporting bugs and OAuth/MCP authentication fallbacks.

---

## 2. Releases
* **`python-v0.154.0` / `openai-codex-cli-bin==0.154.0`**: Introduces support for `max` and `ultra` reasoning-effort values ([PR #39662](https://github.com/openai/codex/pull/39662)) and adds `ExternalMessage` to synchronous workflows.
* **`rust-v0.155.0-alpha.2` / `rust-v0.155.0-alpha.1`**: Alpha releases paving the way for upcoming core performance improvements.
* **Desktop / Core Features**: **GPT-6-Astra** is officially live in model selectors and Amazon Bedrock catalogs ([#42879, #42619](https://github.com/openai/codex)), alongside experimental `--worktree` support for isolated session checkouts ([#42652](https://github.com/openai/codex)).

---

## 3. Hot Issues
1. **[#44199](https://github.com/openai/codex/issues/44199) - Usage drops from ~73% to 0% instantly on Pro plans**
   * *Why it matters:* Pro users report catastrophic depletion of weekly quotas without running active sessions.
   * *Community reaction:* High frustration (26 comments, 16 👍); developers are seeking clarity on telemetry accuracy.
2. **[#40575](https://github.com/openai/codex/issues/40575) - [RFC] Towards Self-Evolving Agents: Interactive Instruction Distillation (`/learn`)**
   * *Why it matters:* Proposes a roadmap for continuous self-evolution via rule metabolism for `AGENTS.md`.
   * *Community reaction:* Highly anticipated architectural discussion regarding long-term project context management.
3. **[#40865](https://github.com/openai/codex/issues/40865) - Desktop Remote SSH inter-task tools stop working**
   * *Why it matters:* Breaks first-party remote coordination workflows on Linux hosts.
   * *Community reaction:* Frustration among remote developers utilizing mixed local/remote environments (17 comments, 11 👍).
4. **[#42765](https://github.com/openai/codex/issues/42765) - Weekly quota reset bug on Desktop app**
   * *Why it matters:* Similar to #44199, users see dramatic drop-offs in limits without activity.
   * *Community reaction:* Urging hotfixes for usage synchronization across the desktop client.
5. **[#41535](https://github.com/openai/codex/issues/41535) - Windows desktop pet becomes click-through**
   * *Why it matters:* Visual glitch causes mascot overlay to block UI interactions.
   * *Community reaction:* Lighthearted community engagement with persistent bug reports (8 👍).
6. **[#34349](https://github.com/openai/codex/issues/34349) - Feature Request: Completely disable Pets and sidebar entries**
   * *Why it matters:* Power users want a distraction-free IDE environment.
   * *Community reaction:* Extremely popular request (43 👍).
7. **[#43596](https://github.com/openai/codex/issues/43596) - Windows Computer Use cannot access native apps**
   * *Why it matters:* Empty app inventory and sky RPC unavailabilities break Windows native automation loops.
   * *Community reaction:* High priority for Windows automation testers.
8. **[#43347](https://github.com/openai/codex/issues/43347) - Closing the last Browser Use tab crashes desktop app**
   * *Why it matters:* Immediate application termination on Windows builds (`26.901.5280+`).
   * *Community reaction:* Disruptive crash loop reported across multiple Windows versions.
9. **[#43855](https://github.com/openai/codex/issues/43855) - Codex stops executing after context compaction**
   * *Why it matters:* Halts long-running threads on Windows using GPT-6-Astra.
   * *Community reaction:* Blocks autonomous multi-step execution flows.
10. **[#44477](https://github.com/openai/codex/issues/44477) - `gpt-5.5` returns 404 on Codex backend route**
    * *Why it matters:* Inconsistency between ChatGPT app routing and Codex CLI execution endpoints for specific models.
    * *Community reaction:* Troubleshooting connectivity boundaries for enterprise users.

---

## 4. Key PR Progress
1. **[PR #44656](https://github.com/openai/codex/pull/44656) - Attribute turn metrics to specific models used**
   * Fixes telemetry misattribution during mid-turn model switches and compaction phases.
2. **[PR #44655](https://github.com/openai/codex/pull/44655) - Honor thread-level plugin exclusions**
   * Applies `disabled_plugin_ids` consistently across runtime capabilities, skills, and MCP servers without altering shared state.
3. **[PR #44650](https://github.com/openai/codex/pull/44650) - Enforce managed model provider selection**
   * Adds strict compliance controls for `model_provider` and `model_providers` in managed environment definitions.
4. **[PR #44639](https://github.com/openai/codex/pull/44639) - Block non-loopback inbound traffic for Windows offline sandbox**
   * Closes firewall gaps by adding matching inbound blocks for the offline sandbox user.
5. **[PR #44636](https://github.com/openai/codex/pull/44636) - Recover OAuth metadata discovery from 503 responses**
   * Fallback mechanism leveraging OIDC metadata when issuer OAuth endpoints return `503`, unblocking MCP token refreshes.
6. **[PR #44629](https://github.com/openai/codex/pull/44629) - Add manual callback input to MCP OAuth login**
   * Introduces `codex mcp login <name> --no-browser` to accept redirect URLs directly when browser callbacks fail.
7. **[PR #44622](https://github.com/openai/codex/pull/44622) - Add `/voice settings` command**
   * Allows developers to configure voice parameters directly inside the TUI for upcoming conversational releases.
8. **[PR #44620](https://github.com/openai/codex/pull/44620) - Support temporary/minimal filesystem grants in MXC**
   * Resolves `Tmpdir` mappings reliably from absolute paths in filtered command policies.
9. **[PR #44617](https://github.com/openai/codex/pull/44617) - Invalidate cached Guardian approvals for permission widening**
   * Security hardening to ensure expanded `exec_command` requests cannot inherit permissions from older cached scores.
10. **[PR #44613](https://github.com/openai/codex/pull/44613) - Enable user verification for local Desktop sessions**
    * Routes elicitation verification requests locally via stdio when experimental APIs are active.

---

## 5. Feature Request Trends
* **Self-Evolving Workflows & Persistent Memory:** Increasing interest in tools like `/learn` to update `AGENTS.md` dynamically across sessions without manual prompt seeding.
* **Granular UI & Whimsy Controls:** Strong demand from power users to toggle off decorative visual effects (e.g., Astra sparkles/stars, desktop pets) by default via standard config parameters.
* **Side Conversations & Multi-Task Management:** Expanding IDE capabilities to support lightweight side-threads (`/side`, `/btw`) natively in extensions like VS Code.

---

## 6. Developer Pain Points
* **Usage Quota Discrepancies:** Sudden, unverified drops in rate limits or weekly session allowances are causing major interruptions for Pro-tier users.
* **Authentication and OAuth Fragility:** Issues with remote environment authentications, particularly when handling custom API keys alongside integrated ChatGPT tokens or falling back during MCP initializations.
* **Platform-Specific Regressions:** Windows-based developers face disproportionate friction regarding sandbox window station access (Session 0 isolation), embedded WebView2 memory growth, and process crashes upon closing in-app browser tabs.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest – 2026-09-11

### 1. Today's Highlights
The core team continues to focus on hardening security boundaries and addressing critical stability issues within the agent framework. Development today was marked by intensive efforts to mitigate path-traversal vulnerabilities and refine environment variable expansion logic.

### 2. Releases
*   **v0.61.0-nightly.20260910.ged2ac40df**: Latest nightly build incorporating ongoing stabilization patches. [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260909.ged2ac40df...v0.61.0-nightly.20260910.ged2ac40df)

### 3. Hot Issues
1.  [#22323](https://github.com/google-gemini/gemini-cli/issues/22323): Subagent reporting false "GOAL success" despite hitting turn limits; critical for reliability.
2.  [#21409](https://github.com/google-gemini/gemini-cli/issues/21409): Generalist agent hangs indefinitely during task execution (8 👍).
3.  [#25166](https://github.com/google-gemini/gemini-cli/issues/25166): Shell command execution incorrectly stalls at "Waiting input" (3 👍).
4.  [#19873](https://github.com/google-gemini/gemini-cli/issues/19873): Large-scale initiative to leverage native bash affinity for safer tool execution.
5.  [#26525](https://github.com/google-gemini/gemini-cli/issues/26525): Addressing security risks by adding deterministic redaction to Auto Memory.
6.  [#21983](https://github.com/google-gemini/gemini-cli/issues/21983): Browser subagent compatibility failures on Wayland.
7.  [#22267](https://github.com/google-gemini/gemini-cli/issues/22267): Bug where Browser Agent ignores `settings.json` overrides like `maxTurns`.
8.  [#24246](https://github.com/google-gemini/gemini-cli/issues/24246): 400 errors occurring when agent tool-scope exceeds 128 tools.
9.  [#22186](https://github.com/google-gemini/gemini-cli/issues/22186): Crash occurring during `get-shit-done` output hooks.
10. [#21335](https://github.com/google-gemini/gemini-cli/issues/21335): Persistent chat history issue where `/compress` settings are lost across restarts (2 👍).

### 4. Key PR Progress
1.  [#29214](https://github.com/google-gemini/gemini-cli/pull/29214): Hardening sandbox filesystem boundaries and isolating runtime state.
2.  [#29250](https://github.com/google-gemini/gemini-cli/pull/29250): Preventing indirect prompt injection via build files.
3.  [#29249](https://github.com/google-gemini/gemini-cli/pull/29249): Closing sibling-prefix path traversal bypass in `get_internal_docs`.
4.  [#29278](https://github.com/google-gemini/gemini-cli/pull/29278): Preventing environment variable collision with expansion keys.
5.  [#29200](https://github.com/google-gemini/gemini-cli/pull/29200): Enforcing MCP runtime policies consistently across CLI execution.
6.  [#29094](https://github.com/google-gemini/gemini-cli/pull/29094): Critical security fix for `simple-git` (CVE-2026-28292).
7.  [#29134](https://github.com/google-gemini/gemini-cli/pull/29134): Protecting the active session from accidental deletion.
8.  [#29116](https://github.com/google-gemini/gemini-cli/pull/29116): Mitigating path traversal risks on NTFS filesystems via short-name handling.
9.  [#29271](https://github.com/google-gemini/gemini-cli/pull/29271): Refactoring to simplify project structure and metadata handling.
10. [#29098](https://github.com/google-gemini/gemini-cli/pull/29098): Fixing state updater purity in `useInputHistoryStore`.

### 5. Feature Request Trends
*   **AST-Awareness**: Significant momentum towards using AST-based tools for mapping and reading files to reduce token bloat ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)).
*   **Persistence**: Moving away from volatile "in-context" task tracking to file-based, durable systems ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836)).
*   **Agent Meta-Awareness**: Requests for agents to better understand their own configuration and capabilities to improve "expert" guidance ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).

### 6. Developer Pain Points
*   **Agent Stability**: Frequent reports of agents hanging during simple tasks and failures in subagent logic/state reporting.
*   **Workspace Cleanup**: Model-driven creation of numerous temporary files and scripts across directories causing maintenance overhead.
*   **Memory/Context Bloat**: Concerns regarding high token usage during file reads and the lack of persistence for stateful CLI commands like `/compress`.

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