# AI CLI Tools Community Digest 2026-09-13

> Generated: 2026-09-12 21:49 UTC | Tools covered: 9

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

**Cross‑Tool Comparison Report – AI CLI Ecosystem (2026‑09‑13)**  

| Tool | Hot Issues (today) | PRs (today) | Releases (today) |
|------|---------------------|-------------|------------------|
| Claude Code | 10 | 1 | **v2.1.270** (bugfix) |
| OpenAI Codex | 10 | 10 | None |
| Gemini CLI | 10 | 10 | **v0.61.0‑nightly.20260912** (security & stability fixes) |

---

### 1. Ecosystem Overview  
The AI CLI landscape is dominated by three major ecosystems—Anthropics (Claude Code), OpenAI (Codex), and Google (Gemini CLI)—each pushing rapid iteration on tooling, security, and developer ergonomics. All three maintain a mix of nightly releases, bug‑fix patches, and feature‑rich PRs, while community discussions increasingly focus on interoperability, context persistence, and multi‑account workflows.

### 2. Activity Comparison  
* **Issue Volume** – Each tool reports 10 “hot” issues, reflecting a comparable level of user‑reported friction.  
* **PR Activity** – Claude Code’s PR activity is modest (1 PR), whereas Codex and Gemini each have 10 PRs, indicating heavier feature‑development momentum in those projects today.  
* **Release Cadence** – Claude Code and Gemini issue nightly fixes; Codex has no new releases, suggesting a temporary pause in public releases but ongoing backend work.

### 3. Shared Feature Directions  
| Feature Need | Tools | Notes |
|--------------|-------|-------|
| **Multi‑account / profile switching** | Claude Code, Codex | Both ecosystems need native profile management across CLI/Desktop. |
| **Context & session persistence** | Claude Code, Codex | Session handoffs, token‑budget transparency, and automatic context clearing are top concerns. |
| **Safety & sandboxing** | Gemini CLI | Security hardening, prompt injection prevention, and file‑system sandboxing are primary. |
| **AST‑aware file navigation** | Gemini CLI, (implicit) Claude Code | Reducing token usage via structural parsing is a growing request. |
| **Custom voice vocabularies** | Claude Code | Voice‑first workflows require domain‑specific terminology. |
| **Tool‑set scaling & auto‑pruning** | Gemini CLI | Managing large tool collections without 400‑errors. |
| **Persistent task tracking** | Gemini CLI | Moving from volatile to file‑based “todo” lists. |

### 4. Differentiation Analysis  
| Aspect | Claude Code | OpenAI Codex | Gemini CLI |
|--------|-------------|--------------|------------|
| **Primary focus** | User‑friendly CLI with context‑management and multi‑account support | TUI ergonomics, token optimization, and multi‑agent orchestration | Security hardening, sandboxing, and agent reliability |
| **Target users** | Power‑developers, designers, and teams needing tight session control | DevOps/CI pipelines, large‑scale automation, and research workflows | Security‑centric teams, enterprise-grade tooling, and advanced AI research |
| **Technical approach** | Bash‑centric, JSON‑based agent config, extensive shell‑automation | Rust‑based app‑server, multi‑agent orchestration, token‑budget hooks | Rust core with sandboxed runtime, AST‑aware file parsing, strict MCP policies |
| **Key pain points** | Read‑only git permission bugs, memory leaks in design window, voice vocab | Rapid quota exhaustion on reasoning models, SSH staleness, subagent thread leaks | Agent hangs, ghost input, tool‑set scaling, insecure credential handling |

### 5. Community Momentum & Maturity  
* **Claude Code** – High engagement (thousands of thumbs‑up on key issues), strong community push for interoperability (`AGENTS.md`). Rapid iteration with nightly fixes.  
* **OpenAI Codex** – Sustained activity with 10 PRs today and active discussions on token usage and remote‑device sync. Release cycle is paused but backend work continues.  
* **Gemini CLI** – Strong focus on security, evidenced by multiple PRs on sandboxing and prompt injection. Community size appears smaller but highly engaged on stability bugs (e.g., agent hangs).  

Overall, Claude Code shows the most mature community pulse; Codex is in a heavier feature‑development phase; Gemini is aggressively tightening security while iterating on core runtime.

### 6. Trend Signals  
1. **Multi‑Account & Profile Management** – Across all tools, users demand seamless account switching without re‑authenticating.  
2. **Context & Session Persistence** – Users are actively seeking automated handoffs, token‑budget transparency, and clear context boundaries.  
3. **Security & Sandboxing** – Gemini’s focus on prompt‑injection hardening is echoed in Claude Code’s “safe” subagent concerns.  
4. **Voice & Accessibility** – Claude Code’s voice‑first feature requests point to growing demand for hands‑free coding.  
5. **AST‑Aware Interaction** – Gemini’s push for AST navigation suggests a broader industry move toward structure‑aware tooling to cut token usage.  
6. **Persistent Task Management** – The move from volatile “todo” lists to file‑based CRUD tracks is a clear trend in developer workflow design.  

**Bottom line for decision‑makers:**  
- If your priority is tight session control and multi‑account workflows, Claude Code is the most mature option.  
- For CI/CD‑centric, multi‑agent orchestration with token‑budget insights, OpenAI Codex offers the richest feature set today.  
- If security, sandboxing, and AST‑aware analysis are top concerns, Gemini CLI is the best fit, albeit with a smaller but highly engaged user base.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report  
**Data as of:** 2026-09-13  
**Scope:** Official `anthropics/skills` repository, based on the provided popular PR and issue activity.  
**Note:** The supplied PR extract lists the top 20 PRs by popularity/order, but explicit comment counts were not populated in the data. The ranking below therefore follows the provided “most-discussed / attention” ordering.

---

## 1. Top Skills Ranking

| Rank | PR | Skill / Focus | Functionality | Discussion Highlights | Status |
|---:|---|---|---|---|---|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator eval reliability** | Fixes the skill description-evaluation pipeline in `skill-creator`, including `run_eval.py`, `run_loop.py`, and `improve_description.py`. The PR aims to install the eval artifact as a real skill and fix Windows stream reading, trigger detection, and parallel worker behavior. | Addresses a critical issue where every evaluated skill reports `recall=0%`, meaning the description-optimization loop is optimizing against noise. It is linked to long-standing issue [#556](https://github.com/anthropics/skills/issues/556) and has remained open from June to September. | OPEN |
| 2 | [#1734](https://github.com/anthropics/skills/pull/1734) | **docx comment QA** | Adds detection of orphaned comments in DOCX files. | A recent DOCX robustness enhancement, likely aimed at improving generated-document review workflows and catching malformed OOXML comment structures. | OPEN |
| 3 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | New skill for typographic quality control of AI-generated documents. It targets orphan word wrap, widow paragraphs, and numbering misalignment. | Positions itself as a quality gate for document generation, addressing common visual and structural defects that users rarely ask for but that affect professional output. | OPEN |
| 4 | [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder SDK compatibility** | Updates `mcp-builder` for `mcp>=2.0.0`, supporting the renamed `streamable_http_client` import and custom headers via `create_mcp_http_client` / `http_client`. | Fixes compatibility with current MCP SDK behavior and is linked to issue [#1668](https://github.com/anthropics/skills/issues/1668). Important for anyone building or evaluating MCP-based skills. | OPEN |
| 5 | [#1615](https://github.com/anthropics/skills/pull/1615) | **scnet-hpc** | New skill for operating SCNet HPC clusters using profile-based SSH and Slurm workflows. | Adds enterprise HPC automation capabilities, including connection profiles, partition/memory/accelerator guidance, job generation, cluster discovery, and profile refresh. | OPEN |
| 6 | [#538](https://github.com/anthropics/skills/pull/538) | **pdf path correctness** | Fixes case-sensitive file references in the PDF skill’s `SKILL.md`, including `REFERENCE.md` → `reference.md` and `FORMS.md` → `forms.md`. | A low-level but important portability fix. Case-sensitive mismatches can break skill execution on Linux, CI, and other case-sensitive filesystems. | OPEN |
| 7 | [#486](https://github.com/anthropics/skills/pull/486) | **odt** | New OpenDocument skill for creating, filling, reading, and converting `.odt` / `.ods` files, including ODT-to-HTML parsing. | Expands the document-generation surface beyond DOCX/PDF into open standards, useful for LibreOffice/ODF-centric workflows. | OPEN |
| 8 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design skill clarity** | Revises the `frontend-design` skill to improve clarity, actionability, and internal coherence. | Focuses on making the skill easier for Claude to follow in a single conversation, reducing ambiguity and improving practical guidance for frontend design work. | OPEN |

**Status note:** All top PRs shown in the supplied extract are marked **OPEN**. No merged or draft statuses are present in the provided data.

---

## 2. Community Demand Trends

### A. Security, Trust, and Governance
The strongest issue-level signal is concern about trust boundaries and governance in the skills ecosystem.

- [#492 — Security: Community skills distributed under `anthropic/` namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492) is the most discussed issue in the provided set, with 43 comments. It argues that community skills impersonating official `anthropic/` skills can cause users to grant elevated permissions to non-official assets.
- [#412 — Agent Governance Skill proposal](https://github.com/anthropics/skills/issues/412) asks for governance patterns such as policy enforcement, threat detection, trust scoring, and audit trails.
- [#1175 — Security and context window concerns for SharePoint Online documents](https://github.com/anthropics/skills/issues/1175) reflects enterprise concerns about embedding access-control and permission logic inside `SKILL.md`.
- [#1385 — Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385) proposes pre-task calibration, adversarial review, and delivery verification.

**Trend:** The community is asking for stronger security, provenance, permissions, auditability, and delivery-quality controls at the skill level.

---

### B. Enterprise Skill Sharing and Lifecycle Management
There is clear demand for organization-level skill management, especially in enterprise environments.

- [#228 — Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228) requests direct organizational sharing instead of manually downloading `.skill` files and uploading them through settings.
- [#189 — `document-skills` and `example-skills` plugins install identical content](https://github.com/anthropics/skills/issues/189) highlights duplicate skill installation and context-window pollution.
- [#62 — All my skills have disappeared and now I get errors](https://github.com/anthropics/skills/issues/62) reflects instability in skill persistence, visibility, and user trust.

**Trend:** Users want skill libraries that are shareable, deduplicated, versioned, visible, and manageable across teams and organizations.

---

### C. Reliable Skill Evaluation and Tooling
A major cluster of issues concerns broken or noisy evaluation tooling, especially for `skill-creator` and `mcp-builder`.

- [#556 — `run_eval.py`: `claude -p` never triggers skills/commands](https://github.com/anthropics/skills/issues/556) reports a 0% trigger rate across all queries, making description optimization unreliable.
- [#202 — `skill-creator` should be updated to best practice](https://github.com/anthropics/skills/issues/202) criticizes the skill for being verbose, educational, and inefficient for Claude to execute.
- [#1390 — `mcp-builder: evaluation.py` scores 0/N against any real MCP server](https://github.com/anthropics/skills/issues/1390) reports a serialization bug that fabricates tool-execution errors and collapses evaluation scores.
- [#1362 — `web-artifacts-builder` bundle/init scripts fail on pnpm ≥10.1](https://github.com/anthropics/skills/issues/1362) shows that build and packaging tooling is also becoming a reliability bottleneck.

**Trend:** The community needs working, trustworthy evaluation loops, CI-like validation, and platform-compatible scripts for creating and testing skills.

---

### D. Context Efficiency and Agent State Management
Token consumption and agent-state overhead are emerging as first-order design constraints.

- [#1487 — `claude-api` skill eagerly injects ~156k tokens](https://github.com/anthropics/skills/issues/1487) reports a single tool call exhausting the context window.
- [#1329 — `compact-memory` skill proposal](https://github.com/anthropics/skills/issues/1329) proposes symbolic, compact agent state to reduce context spent on prose notes and memory.
- [#202 — `skill-creator` should be updated to best practice](https://github.com/anthropics/skills/issues/202) also touches on token efficiency, arguing that verbose skill content hurts practical execution.

**Trend:** Skills are increasingly expected to be context-aware, lazily loaded, compact, and cost-efficient.

---

### E. Platform Integration and Protocol Exposure
Users want skills to work across more providers and expose cleaner machine interfaces.

- [#29 — Usage with Bedrock](https://github.com/anthropics/skills/issues/29) asks how to use skills with AWS Bedrock.
- [#16 — Expose Skills as MCPs](https://github.com/anthropics/skills/issues/16) proposes representing skills as MCP tool APIs, giving software a standard interface to invoke skill capabilities.
- [#1390 — `mcp-builder` evaluation bug](https://github.com/anthropics/skills/issues/1390) also indicates that MCP-related skills are being actively used against real servers, not just in theory.

**Trend:** The ecosystem is moving toward multi-provider support, MCP-native skill interfaces, and more formal skill-to-software contracts.

---

### F. Document, Artifact, and Enterprise Workflow Quality
Document and artifact generation is maturing beyond “create a file” into quality, security, and portability.

- [#1175 — SharePoint Online document handling concerns](https://github.com/anthropics/skills/issues/1175) shows enterprise document workflows are becoming a real use case, with security and context concerns.
- [#1362 — `web-artifacts-builder` packaging failures](https://github.com/anthropics/skills/issues/1362) shows web artifact generation still needs reliable bundling, font inlining, and build compatibility.
- [#62 — Disappeared skills](https://github.com/anthropics/skills/issues/62) indicates that user-generated skills and artifacts need stronger persistence and recovery semantics.

**Trend:** Document and artifact skills are moving toward production-quality requirements: security, packaging, portability, and enterprise workflow fit.

---

## 3. High-Potential Pending Skills

These are active, open PRs that could land soon if accepted. They represent either new skills or high-value fixes to existing skill tooling.

| PR | Pending Skill / Change | Why It Has High Potential |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator eval repair** | Directly fixes the core description-optimization loop, which is currently broken by a 0% recall problem. High impact for anyone using `skill-creator` to improve skills. |
| [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder MCP ≥2 compatibility** | Aligns `mcp-builder` with current MCP SDK behavior. Likely important as MCP usage expands and older import paths break. |
| [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | Fills a clear quality gap in AI-generated documents. Typography controls are broadly useful for professional document output. |
| [#486](https://github.com/anthropics/skills/pull/486) | **odt / OpenDocument skill** | Expands document support into ODT/ODS, which is valuable for LibreOffice, open standards, and non-Microsoft document ecosystems. |
| [#1615](https://github.com/anthropics/skills/pull/1615) | **scnet-hpc** | Adds a specialized but credible enterprise HPC workflow: SSH profiles, Slurm jobs, cluster discovery, and compute-node guidance. |
| [#1628](https://github.com/anthropics/skills/pull/1628) | **Hivemind multi-agent orchestration** | Targets cost optimization by delegating mechanical work to cheaper headless agents while keeping Claude as planner, reviewer, and merger. |
| [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit** | Adds a pre-delivery quality gate combining mechanical file verification with reasoning-quality review. Aligns with growing demand for output verification. |
| [#83](https://github.com/anthropics/skills/pull/83) | **skill-quality-analyzer + skill-security-analyzer** | Meta-skills for analyzing skill quality and security. Directly responsive to the ecosystem’s trust and governance concerns. |

**Related but possibly superseding fixes:**  
- [#1099 — skill-creator: fix `run_eval.py` crash on Windows](https://github.com/anthropics/skills/pull/1099)  
- [#1050 — skill-creator: fix Windows subprocess + encoding bugs](https://github.com/anthropics/skills/pull/1050)  

These two are closely related to [#1298](https://github.com/anthropics/skills/pull/1298) and may be consolidated or made redundant depending on which eval fix is accepted.

---

## 4. Skills Ecosystem Insight

**The community’s most concentrated demand is trustworthy skill infrastructure: reliable skill-creator evaluation, secure naming and permission boundaries, context-efficient design, and enterprise-ready sharing or governance controls.**

---

# Claude Code Community Digest (2026-09-13)

### 1. Today's Highlights
Claude Code v2.1.270 drops a quick fix for unexpected read-only git command permissions in long-running sessions, while the community actively surfaces friction points around model context limits, multi-account handling, and aggressive content safeguards. Meanwhile, debates around standardizing codebase context files (such as `AGENTS.md`) continue to draw massive engagement.

---

### 2. Releases
- **[v2.1.270](https://github.com/anthropics/claude-code/releases/tag/v2.1.270)**: Fixes a regression from `v2.1.269` where read-only git commands in Bash incorrectly triggered permission prompts after extended session runtimes.

---

### 3. Hot Issues
1. **[#6235: Support AGENTS.md](https://github.com/anthropics/claude-code/issues/6235)**
   - *Why it matters:* Standardizing codebase context files across different coding agents (Codex, Amp, Cursor) is gaining traction. Developers want alternatives to `CLAUDE.md`.
   - *Reaction:* Massive community backing (5,141 👍, 394 comments) indicating a strong desire for cross-tool interoperability.
2. **[#18435: Multi-Account Management in Claude Desktop](https://github.com/anthropics/claude-code/issues/18435)**
   - *Why it matters:* Power users juggling personal, enterprise, and client accounts require seamless profile switching without re-authenticating.
   - *Reaction:* High demand (803 👍) for native profile management within the desktop ecosystem.
3. **[#11455: Session Handoff / Continuity Support](https://github.com/anthropics/claude-code/issues/11455)**
   - *Why it matters:* Hitting weekly or session token limits abruptly cuts off workflows without preserving context or generating an automated handoff.
   - *Reaction:* Critical pain point for heavy daily users who risk losing complex state mid-task.
4. **[#93679: Design Window Renderer Memory Leak](https://github.com/anthropics/claude-code/issues/93679)**
   - *Why it matters:* On macOS Apple Silicon, the design window renderer grows unbounded during long generations, crashing at 2–4GB.
   - *Reaction:* Direct stability concern for design-heavy workflows.
5. **[#31599: Voice Mode Custom Vocabulary & Spoken-to-Text Replacements](https://github.com/anthropics/claude-code/issues/31599)**
   - *Why it matters:* Voice-first workflows suffer from a lack of custom dictionaries for domain-specific terminology and proper nouns.
   - *Reaction:* Highly requested by accessibility-focused and voice-first developers.
6. **[#74758: `--resume` fails with ECONNRESET on large screenshots](https://github.com/anthropics/claude-code/issues/74758)**
   - *Why it matters:* Resuming sessions containing large base64-encoded image payloads results in 100% failure rates due to networking resets.
   - *Reaction:* Blocks session recovery for UI/UX-heavy debugging tasks.
7. **[#93886: Fable 5.1 Falsely Gated Behind Usage Credits](https://github.com/anthropics/claude-code/issues/93886)**
   - *Why it matters:* The 1M-context variant of Fable 5.1 incorrectly halts requests by demanding usage credits, silently withholding execution.
   - *Reaction:* Immediate friction for users attempting to leverage long-context capabilities.
8. **[#89062: CLI Hangs in 100% CPU Main-Thread Loop](https://github.com/anthropics/claude-code/issues/89062)**
   - *Why it matters:* Sessions lock up indefinitely, eating an entire CPU core and ignoring `SIGTERM`/`SIGINT`.
   - *Reaction:* Severe process management bug requiring hard-killing the terminal.
9. **[#93773: Overly Aggressive Content Filtering on MD Simulation Research](https://github.com/anthropics/claude-code/issues/93773)**
   - *Why it matters:* Opus 5 safeguards trigger false positives on legitimate scientific research (molecular dynamics simulations).
   - *Reaction:* Frustration over rigid guardrails disrupting specialized technical workloads.
10. **[#93889: Orphaned Background Bash Tasks in Subagents](https://github.com/anthropics/claude-code/issues/93889)**
    - *Why it matters:* Subagents executing background bash commands (`run_in_background: true`) leave polling loops running indefinitely after the parent task terminates.
    - *Reaction:* Resource leakage risk during complex multi-agent orchestrations.

---

### 4. Key PR Progress
1. **[#61716: Context Overflow Troubleshooting Docs](https://github.com/anthropics/claude-code/pull/61716)**
   - *Description:* Documents the root cause of false "usage limit reached" errors, clarifying that context overflows are frequently misattributed when `/compact` fails due to 1M context constraints.

---

### 5. Feature Request Trends
- **Ecosystem Interoperability:** Strong push to move beyond vendor-lock-in configuration files (`CLAUDE.md`) in favor of universal standards like `AGENTS.md`.
- **Granular Account Control:** Native multi-profile management across CLI, Desktop, and iOS apps.
- **Enhanced Voice Capabilities:** Custom vocabulary integration, domain-specific text replacement, and error reduction for voice-driven coding sessions.
- **Predictable Model Persistence:** Fixing bugs where configured default models (e.g., Opus High/Low, Opusplan) are overridden by session recency or forced back to Sonnet mediums.

---

### 6. Developer Pain Points
- **Hard Quota Cliffs:** Hitting session limits without automated state-saving or clean handover mechanisms forces developers to manually reconstruct context.
- **False-Positive Guardrails:** Overly broad content filters interrupting legitimate technical workloads (e.g., scientific research, specific build steps).
- **Desktop & CLI State Desync:** Settings like default model choices and project directories occasionally failing to persist across app restarts or sidebar switching.
- **Resource Leaks:** Orphaned subagent background processes and memory consumption spikes in desktop renderers.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — September 13, 2026

## Today's Highlights
The Codex community is heavily focused on performance, token consumption, and reliability issues surrounding newer models like GPT-6 Astra and GPT-5.6 Sol. Meanwhile, contributions are accelerating around TUI ergonomics, multi-account Rust app-server management, and context-window optimizations.

---

## Releases
*No new releases in the last 24 hours.*

---

## Hot Issues

1. **[#36040 - Regression: iOS Remote only lists projects with recent chats](https://github.com/openai/codex/issues/36040)**
   * **Why it matters:** Breaks cross-device multi-project management between macOS hosts and the iOS ChatGPT mobile app.
   * **Community reaction:** 42 comments indicate widespread friction for users relying on remote monitoring.

2. **[#42987 - GPT-6 Astra Medium depleted 100% of Plus 5-hour quota in two short turns](https://github.com/openai/codex/issues/42987)**
   * **Why it matters:** Highlights severe rate-limit predictability issues with reasoning models in local CLI workflows.
   * **Community reaction:** High engagement (14 thumbs up, 21 comments) as users demand better quota transparency.

3. **[#25820 - Codex CLI login blocked by phone verification rate limit — Pro subscriber](https://github.com/openai/codex/issues/25820)**
   * **Why it matters:** Locks legitimate Pro subscribers out of authenticating the CLI entirely.
   * **Community reaction:** Frustration over auth-flow bottlenecks blocking daily usage.

4. **[#22779 - Completed subagents continue to count against thread limit](https://github.com/openai/codex/issues/22779)**
   * **Why it matters:** Subagent orchestration leaks thread resources, leading to premature limit exhaustion.
   * **Community reaction:** Developers utilizing multi-agent setups find their sessions abruptly capped.

5. **[#31376 - `codex exec` can hang indefinitely before the SSE stream starts](https://github.com/openai/codex/issues/31376)**
   * **Why it matters:** Causes dead pooled connections to hang non-interactive scripts on Windows/Linux without timeout or retry mechanisms.
   * **Community reaction:** Critical blocker for automated CI/CD and headless execution environments.

6. **[#44781 - Editing and resending a queued message triggers "App-server queued follow-up no longer exists"](https://github.com/openai/codex/issues/44781)**
   * **Why it matters:** Disrupts chat flow and state synchronization in Codex Desktop for Windows.
   * **Community reaction:** Garnered 17 thumbs up for a frustrating daily-driver UI bug.

7. **[#41849 - [VS Code Remote-SSH] Server reconnect leaves stale app-server holding thread writer](https://github.com/openai/codex/issues/41849)**
   * **Why it matters:** Orphaned backend app-servers lock threads out with "This is open in another app" errors upon reconnecting.
   * **Community reaction:** Heavily impacts remote development container workflows.

8. **[#42937 - GPT-5.6 Sol and GPT-6 Astra: higher intelligence, lower autonomous completion](https://github.com/openai/codex/issues/42937)**
   * **Why it matters:** Sparked a major debate regarding whether increased reasoning depth correlates with decreased operational reliability.
   * **Community reaction:** Extensively discussed across multiple long-form comment threads.

9. **[#37524 - GPT-5.6 Sol leaks literal `<thinking>` tool-planning text as visible assistant messages](https://github.com/openai/codex/issues/37524)**
   * **Why it matters:** Pollutes user interfaces and command outputs with raw reasoning tags.
   * **Community reaction:** Seen as an embarrassing prompt-leak regression affecting both the CLI and Desktop app.

10. **[#42973 - Regression: headless SSH tasks lose thread messaging and delegation tools after Desktop update](https://github.com/openai/codex/issues/42973)**
    * **Why it matters:** Headless HPC and remote Linux nodes lose crucial multi-agent orchestration tools.
    * **Community reaction:** Disrupts remote infrastructure engineering teams relying on desktop-initiated SSH tasks.

---

## Key PR Progress

1. **[#45108 - Cancel pending thread title generation after manual renames](https://github.com/openai/codex/issues/45108)**
   * Eliminates hanging progress indicators when a user manually renames a thread while an auto-title request is active.

2. **[#45094 - Estimate history tokens from content instead of serialized envelopes](https://github.com/openai/codex/issues/45094)**
   * Improves token counting accuracy by ignoring JSON escaping, message IDs, and metadata overhead in serialized items.

3. **[#45090 - Preserve conversation context and separate next actions in recaps](https://github.com/openai/codex/issues/45090)**
   * Expands recap context handling within tight byte limits to clearly distinguish completed work from pending requests.

4. **[#45089 - Delay automatic recaps and compact their TUI layout](https://github.com/openai/codex/issues/45089)**
   * Reduces TUI visual clutter by pushing automatic recap intervals from 3 to 30 minutes and introducing a streamlined layout.

5. **[#31471 - Extract apps cache logic into ConnectorRuntimeManager](https://github.com/openai/codex/issues/31471)**
   * Refactors connector runtime logic to scope active contexts cleanly by account, workspace mode, and Codex home.

6. **[#25383 - Add app-server account session lifecycle](https://github.com/openai/codex/issues/25383)**
   * Implements the foundational Rust app-server routes (`accountSession/login/start`, `switch`, `logout`) for Desktop multi-account profile switching.

7. **[#44970 - Show task tokens and usage estimates in the agent command center](https://github.com/openai/codex/issues/44970)**
   * Adds live input/output token counts, credit estimations, and USD cost trackers directly into task details.

8. **[#44969 - Open tasks managed elsewhere as read-only history in the command center](https://github.com/openai/codex/issues/44969)**
   * Allows users to open and inspect history for tasks managed by external app servers instead of blocking access.

9. **[#44957 - Add model grouping to the agent command center](https://github.com/openai/codex/issues/44957)**
   * Enables task grouping by project, status, and model via `Ctrl+S` toggle within the command center footer.

10. **[#44946 - Retire Friendly and Pragmatic personality selection](https://github.com/openai/codex/issues/44946)**
    * Removes legacy personality variables in favor of standardized fallback prompts and literal model instruction templates.

---

## Feature Request Trends
* **Context State Management:** Strong demand for features that clear context prior to plan execution (similar to competing CLI tools like Claude Code).
* **Session UI Enhancements:** Requests for automatic session color-coding, distinct naming, and better model-grouped task navigation.
* **Granular Quota Transparency:** Users want better visibility into token burn rates, especially when leveraging multi-agent subtask delegations.

---

## Developer Pain Points
* **Quota Depletion on Reasoning Models:** Rapid exhaustion of Plus/Pro tier allocations when executing tasks with models like GPT-6 Astra and GPT-5.6 Sol.
* **Remote and SSH Staleness:** Orphaned app-server processes during VS Code Remote-SSH reconnections leading to locked thread states.
* **Sandbox & Safety Check Friction:** Overly aggressive local sandbox/safety egress classifiers blocking authorized engineering workflows on Windows and WSL.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest | 2026-09-13

### 1. Today's Highlights
The Gemini CLI development team is heavily focused on hardening security and resolving core runtime stability issues. Significant progress was made on filesystem sandboxing and preventing prompt injection vulnerabilities, alongside critical fixes for terminal UI performance and state management.

### 2. Releases
*   **[v0.61.0-nightly.20260912](https://github.com/google-gemini/gemini-cli/pull/29250)**: Focused on critical security patches, including preventing indirect prompt injection via build files and hardening sandbox filesystem boundaries.

### 3. Hot Issues
*   [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) – **Subagent False Positives**: `codebase_investigator` reports "success" after hitting `MAX_TURNS` without actual analysis.
*   [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) – **Agent Hangs**: Users report the generalist agent hangs indefinitely during simple tasks; high community engagement (8 comments/8 👍).
*   [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) – **Ghost Input**: Shell commands finish, but the CLI remains stuck in "Waiting input" mode.
*   [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) – **Wayland Support**: Browser subagent failures on Wayland remain a blocker for Linux users.
*   [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) – **Tool Scaling**: 400 error when exceeding 128 tools; highlights the need for smarter tool-set pruning.
*   [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) – **Skill Underutilization**: Agents fail to leverage custom skills unless explicitly instructed.
*   [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) – **Auto Memory Redaction**: Urgent need to move secret redaction *before* sending data to model context.
*   [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) – **Destructive Behavior**: Request to curb agent reliance on risky commands like `git reset --hard`.
*   [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) – **Browser Resilience**: Need for better recovery when dealing with locked persistent browser profiles.
*   [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) – **Persistence**: `/compress` command isn't saved to disk, leading to context bloat on resume.

### 4. Key PR Progress
*   [#29214](https://github.com/google-gemini/gemini-cli/pull/29214): Hardens filesystem boundaries to isolate runtime state from host configs.
*   [#29294](https://github.com/google-gemini/gemini-cli/pull/29294): Addresses terminal flicker caused by stdout contention.
*   [#29287](https://github.com/google-gemini/gemini-cli/pull/29287): Migrates `--yolo` flag to a formal wildcard policy array.
*   [#29201](https://github.com/google-gemini/gemini-cli/pull/29201): Fixes infinite loops when confirming multiple shell command injections.
*   [#29203](https://github.com/google-gemini/gemini-cli/pull/29203): Security fix to strip shell wrappers carrying malicious flags.
*   [#29282](https://github.com/google-gemini/gemini-cli/pull/29282): Ensures OAuth credentials persist across sessions.
*   [#29292](https://github.com/google-gemini/gemini-cli/pull/29292): Adds validation to prevent crashes from malformed checkpoint JSONs.
*   [#29208](https://github.com/google-gemini/gemini-cli/pull/29208): Graceful failure for corrupt `agents.json` files.
*   [#29200](https://github.com/google-gemini/gemini-cli/pull/29200): Enforces consistent MCP policy checks at runtime.
*   [#29217](https://github.com/google-gemini/gemini-cli/pull/29217): Prevents auto-upgrading specific pinned models (e.g., `gemini-2.5-flash`).

### 5. Feature Request Trends
*   **AST-Aware Mapping**: Strong desire to shift from raw text reading to AST-aware file navigation to reduce token usage and improve accuracy ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745)).
*   **Self-Aware Agents**: Increasing demand for agents to be "self-experts," capable of explaining their own flags and hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
*   **Persistent Task Tracking**: Move from in-context (volatile) todo lists to persistent file-based CRUD task trackers ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836)).

### 6. Developer Pain Points
*   **UI/UX Instability**: Terminal flickering and "hanging" states during agent operations are the most cited friction points.
*   **Agent Reliability**: Users are struggling with subagent "laziness," where models ignore custom skills or fail to use tools effectively without heavy prompting.
*   **Security/Policy Overhead**: The balance between secure sandbox operations and functional agent autonomy is creating complexity, particularly with shell command confirmations and MCP policy enforcement.

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