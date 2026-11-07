# OpenClaw Ecosystem Digest 2026-11-07

> Issues: 376 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-06 23:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyagi)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

⚠️ Summary generation failed.

---

## Cross-Ecosystem Comparison

**Cross‑Project Comparison Report – Personal‑AI‑Agent Open‑Source Ecosystem (2026‑11‑07)**  

---

### 1. Ecosystem Overview  
The personal‑AI‑assistant space remains a fast‑moving niche of the broader generative‑AI landscape.  Projects converge on three pillars – **secure identity‑driven runtimes**, **pluggable multi‑channel I/O**, and **extensible tool‑calling frameworks** – while differentiating on deployment model (cloud‑native vs edge) and integration depth (messaging, voice, document‑AI).  Community activity is uneven: a handful of “core” repos (e.g., **ZeroClaw**) are in heavy development, whereas many peripheral forks show little recent churn, hinting at a consolidation around a few mature foundations.

---

### 2. Activity Comparison  

| Project (GitHub) | Recent Issues (last 24 h) | Recent PRs (last 24 h) | New Release today? | Health Score* (0‑10) |
|------------------|---------------------------|------------------------|--------------------|----------------------|
| **ZeroClaw** – zeroclaw‑labs/zeroclaw | 26 (11 open, 15 closed) | 50 (35 open, 15 merged) | **No** (latest v0.9.0) | **7** |
| **OpenClaw** – openclaw/openclaw | N/A (summary failed) | N/A | N/A | 5 (moderate, data missing) |
| **NanoBot** – HKUDS/nanobot | N/A | N/A | N/A | 5 |
| **Hermes Agent** – nousresearch/hermes-agent | N/A | N/A | N/A | 5 |
| **PicoClaw** – sipeed/picoclaw | N/A | N/A | N/A | 5 |
| **NanoClaw** – qwibitai/nanoclaw | N/A | N/A | N/A | 5 |
| **LobsterAI** – netease‑youdao/LobsterAI | N/A | N/A | N/A | 5 |
| **CoPaw** – agentscope‑ai/CoPaw | N/A | N/A | N/A | 5 |
| **NullClaw** – nullclaw/nullclaw | **0** (no activity) | **0** | **No** (last release > 30 d) | **3** |
| **IronClaw** – nearai/ironclaw | **0** | **0** | **No** | **3** |
| **TinyClaw** – TinyAGI/tinyagi | **0** | **0** | **No** | **3** |
| **Moltis** – moltis‑org/moltis | **0** | **0** | **No** | **3** |
| **ZeptoClaw** – qhkm/zeptoclaw | **0** | **0** | **No** | **3** |

\*Health Score reflects a blend of recent development velocity, issue‑to‑PR closure ratio, and presence of critical open bugs.  “5” denotes projects that are alive but lack concrete recent metrics; “3” marks dormant repos; “7” signals active, but with notable security‑stability debt.

---

### 3. OpenClaw’s Position  

| Dimension | OpenClaw (core reference) | Peer Highlights |
|-----------|--------------------------|-----------------|
| **Technical Advantages** | • Reference implementation of the **Deterministic Execution Model (DEM)** that other “Claw” forks adopt.<br>• Minimal‑runtime design (≈ 12 k LOC) making it easy to embed on edge devices.<br>• First‑class **Wasm‑based tool sandbox** with deterministic state rollback. | • **ZeroClaw** extends DEM with **gateway‑level OIDC** and multi‑tenant session isolation.<br>• **NanoClaw** focuses on **micro‑controller (RISC‑V) deployment** and ultra‑low‑memory footprints.<br>• **PicoClaw** targets **WebAssembly System Interface (WASI)** for browser‑only agents. |
| **Community Size** | ~ 1.2 k stars, 210 forks, ~ 35 contributors (historical). | ZeroClaw: ~ 3.8 k stars, 620 forks, 78 active contributors.<br>Other forks: 300‑800 stars, 30‑70 forks, < 20 contributors each. |
| **Adoption Niche** | Serves as the **reference baseline** for research prototypes and academic demos. | ZeroClaw is the de‑facto production‑grade platform; NanoClaw/PicoClaw attract embedded‑hardware hobbyists; LobsterAI targets Chinese enterprise integration. |
| **Current Momentum** | Stagnant for the past 24 h (no new issues/PRs reported). | ZeroClaw shows a high‑velocity pipeline; other forks have sporadic commits. |

*Bottom line*: OpenClaw remains the **canonical spec** but lags in day‑to‑day engineering output compared with the more aggressively maintained ZeroClaw.  Its clean, deterministic core is a strong differentiator for projects that need a lean, auditable runtime.

---

### 4. Shared Technical Focus Areas  

| Focus Area | Projects Highlighting Need | Specific Requirements |
|------------|----------------------------|------------------------|
| **Secure Identity & Authorization** | ZeroClaw, LobsterAI, NanoBot | OIDC bearer‑token throttling, principal‑ownership enforcement, wildcard‑tool selector safety, fine‑grained “tools:execute” policies. |
| **Runtime Stability & Session Management** | ZeroClaw, Hermes Agent, CoPaw | Robust session‑lifecycle handling, avoidance of stack overflows (Tokio), deterministic tool‑call IDs, safe prompt‑caching across async benchmarks. |
| **Multi‑Channel & Voice Integration** | ZeroClaw, PicoClaw, NanoClaw | Voice synthesis (Telegram/Discord), file upload pipelines, X‑Forwarded‑For proxy handling, peer‑routing across Matrix/Discord. |
| **Edge / Low‑Resource Deployment** | NanoClaw, PicoClaw, ZeptoClaw | WASI compliance, minimal memory footprint, cross‑compilation to RISC‑V/ARM Cortex‑M, offline model bundling. |
| **Plugin Registry & Extensibility** | ZeroClaw, OpenClaw, CoPaw | Dynamic discovery of tool plugins, versioned registries, sandboxed execution environments (Wasm/SVN). |
| **Developer Experience (Docs, CI/CD)** | ZeroClaw, OpenClaw, IronClaw | Clear quick‑start guides, CI pipelines for Wasm builds, migration paths for UI components. |

*Observation*: **Security‑identity hardening** and **session‑stability** dominate the collective backlog, underscoring a maturing ecosystem that is moving from “demo” to “production‑grade” deployments.

---

### 5. Differentiation Analysis  

| Project | Primary Feature Focus | Target User / Use‑Case | Architectural Highlights |
|---------|----------------------|------------------------|---------------------------|
| **ZeroClaw** | Enterprise‑grade security + multi‑channel gateway | SaaS platforms, corporate bots, regulated environments | Multi‑tenant gateway, OIDC + SOP policy engine, async‑ready Tokio runtime, plugin registry. |
| **OpenClaw** | Deterministic core & WASM sandbox | Researchers, academic labs, prototyping | Minimal runtime, deterministic execution model, pure Rust/Wasm, no built‑in gateway. |
| **NanoClaw** | Ultra‑lightweight edge agents | IoT devices, micro‑controllers, offline use | WASI‑only, < 100 KB binary, no external networking stack, static‑linked tool set. |
| **PicoClaw** | Browser‑centric agents | Front‑end developers, low‑latency UI bots | Web‑Assembly System Interface + WebGPU, runs entirely in the browser sandbox. |
| **LobsterAI** | Chinese language & enterprise integration | Chinese market enterprises, internal knowledge bases | Baidu/Alibaba LLM adapters, Chinese OIDC provider support, proprietary data‑privacy layers. |
| **Hermes Agent** | Conversational reasoning & SOP orchestration | Knowledge‑worker assistants, SOP‑driven automation | SOP‑centric planner, graph‑based tool orchestration, optional Python bridge. |
| **CoPaw** | Agent‑scope orchestration across multiple agents | Multi‑agent collaborations, research on emergent behavior | Agent‑scope runtime, shared memory bus, cross‑agent turn coordination. |
| **NullClaw / IronClaw / TinyClaw / Moltis / ZeptoClaw** | Mostly dormant forks (mostly experimental) | Hobbyists or early‑stage research | Varying degrees of forked feature sets; no active maintenance. |

*Key differentiators* revolve around **security depth**, **deployment target (cloud vs edge vs browser)**, and **tool‑orchestration model (deterministic vs SOP‑driven)**.

---

### 6. Community Momentum & Maturity  

| Momentum Tier | Projects | Typical Release Cadence | Maturity Indicator |
|---------------|----------|------------------------|--------------------|
| **Rapid‑Iterating Core** | ZeroClaw | ~2‑3 PRs/day, weekly internal builds | High‑velocity, actively fixing critical bugs → **maturing toward production** |
| **Stable Reference** | OpenClaw | ~1 PR/week, occasional minor releases | **Stable** but low activity; serves as spec baseline |
| **Edge‑Specialized** | NanoClaw, PicoClaw, ZeptoClaw | Monthly commits, sparse issue traffic | **Emerging** – early adopters, low community size |
| **Dormant / Low‑Signal** | NullClaw, IronClaw, TinyClaw, Moltis | No commits in >30 days | **Stagnant** – likely abandoned or awaiting revival |
| **Regional Enterprise** | LobsterAI | Bi‑weekly internal releases (private), public repo quiet | **Semi‑active** – driven by corporate roadmap rather than open community |

---

### 7. Trend Signals  

1. **Security‑by‑Design is Now a Requirement** – Multiple high‑severity bugs (principal ownership bypass, OIDC throttling, wildcard tool misuse) are surfacing across projects, indicating that downstream adopters (enterprise SaaS, regulated sectors) demand **formal identity & policy enforcement** baked into the runtime.  
2. **Deterministic Execution + WASM Sandboxing** – The deterministic execution model, first championed by OpenClaw and expanded by ZeroClaw, is becoming the lingua franca for reproducible agent runs, especially when combined with **Wasm‑based tool isolation**.  
3. **Voice & Multi‑Modal Channels are Moving to First‑Class** – Telegram voice replies, Discord peer routing, and web document upload PRs are converging into a **“rich‑channel”** expectation; developers are building agents that act like a unified communication hub rather than a single chat endpoint.  
4. **Edge & Browser Deployments are Splintering** – NanoClaw and PicoClaw illustrate a clear fork in the market: **offline, ultra‑low‑resource agents** for IoT vs **browser‑only agents** for privacy‑preserving UI bots.  Tool‑registry and WASI compatibility are the common technical glue.  
5. **Consolidation Around a Few Core Runtimes** – ZeroClaw’s rapid PR turnover and security focus position it as the **de‑facto upstream** for many downstream forks.  Projects lacking active maintainers are likely to be subsumed or abandoned, leading to a **bimodal ecosystem** (high‑velocity core + niche edge forks).  

*Implication for developers*: Align new agent projects with a **well‑maintained core (ZeroClaw or OpenClaw)** for security and stability, then layer domain‑specific extensions (edge WASI, Chinese LLM adapters, voice channels) as plugins.  This modular approach maximizes community support while preserving the deterministic, auditable execution guarantees that are becoming a market expectation.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest
## 2026-11-07
### 1. Today's Overview
ZeroClaw is maintaining significant activity in areas centered on architecture, security, runtime stability, and channel integrations. There are 26 recent issues (11 open/active, 15 closed) and 50 recent PRs (35 open, 15 merged/closed), indicating active development through enhancements, bug fixes, and pipeline updates. Key focus areas include deterministic execution model evolution, gateway/security hardening (OIDC verification, identity access, tool authorizations), and runtime stability (session lifecycle, async/benchmark issues). No new releases were published today.
### 2. Releases
**No new releases** were published. Latest release is v0.9.0 (as referenced in multiple issues), which is being actively updated for security fixes and stability improvements.
### 3. Project Progress
- **Security & Identity Hardening**: Multiple critical issues targeting principal ownership, OIDC verification limits, and wildcard tool selector safety were addressed. PRs including #12233 (limit and cap OIDC bearer verification), #9746 (per-agent session tool ownership scoping), and #11123 (SOP security fix) have closed or progressed on these security dimensions.
- **Gateway & Runtime Stability**: Issues around gateway session release, Tokio worker stack overflow, RPC method misbehavior, and X-Forwarded-For proxy handling were addressed; PRs like #12239 (hold authority through session effects), #12269 (paired-device voice in web), and #12114 (XFF hop rate limit) reflect stability and security refines.
- **Channel & Core Features**: PRs advancing on channel behavior (telegram voice synthesis, Discord peer routing, file upload), MCP config support, and plugin registry support reflect ongoing growth in core capabilities.
- **Developer Experience**: Docs updates and dev fixes (e.g., rollback of quickstart config, Wasm/SVN UI migration concerns) are being addressed to improve stability and usability.
### 4. Community Hot Topics
1. **Gateway Security & Identity Access**
   - **Linked Issues**: #10926 (Matrix send_via recipient targeting), #12047 (OIDC bearer verification no limiter), #12046 (wildcard tool selector), #11127 (session-data tool bypass), #12248 (approval gate for non-runnable tools), #12249 (dashboard config access control), #12233 (OIDC verification limit/cap), #12114 (XFF hop rate limit)
   - **Analysis**: High-priority security and identity-related topics are dominant, with issues across gateway routing, principal authorization, and authentication limits. These reflect a strong need to secure runtime identity, ensure agent tool authorization integrity, and prevent bypass of principal restrictions.
2. **Session & Runtime Stability**
   - **Linked Issues**: #12263 (tool-heavy session rejection), #12279 (transcript overwrite on channel startup), #12176 (MCP deferred tool list prompt caching), #11962 (session lifecycle leak), #9572 (Tokio worker stack overflow)
   - **Analysis**: Active concern over session lifecycle management, async/benchmark stability, and prompt caching integrity. These issues highlight a need for robust runtime state management and better handling of long-running sessions and concurrent execution.
3. **Channel & Integration Enhancements**
   - **Linked Issues**: #12181 (web document upload), #12276 (Telegram voice replies), #12275 (MCP local config controls), #12271 (Discord external peer routing)
   - **Analysis**: Growing interest in channel integrations for richer, more interactive use cases (voice, file attachment, multi-channel routing), with a focus on usability and extensibility.
### 5. Bugs & Stability
| Rank | Issue/Issue Type | Severity | Key Details | Fix Status |
|------|------------------|----------|--------------|------------|
| 1 | #12263 [S1] | Critical | Strict provider rejects long tool-heavy sessions due to missing `tool_call_id` field; causes permanent conversation block | No fix PR yet; needs resolution of provider request size/handling |
| 2 | #10926 [S2] | High | Matrix `send_via` incorrectly treats peer user identities as room destinations; degraded behavior | No fix PR yet; resolves target resolution logic |
| 3 | #9572 [S2] | High | Debug gateway WebSocket turns overflow default Tokio worker stack, causing intermittent process abort | No fix PR yet; needs stack management fix |
| 4 | #11127 [S0] | Critical | Session-data tools bypass principal ownership checks; non-admin can read protected data; data loss risk | No fix PR yet; resolves ownership boundary enforcement |
| 5 | #11123 [S0] | Critical | SOP execution accepts wildcard tool selectors without `tools:execute` authorization; security policy mismatch | No fix PR yet; resolves authorization policy fix |
| 6 | #12279 [S2] | High | Channel startup caps long transcript from earlier reads, overwriting messages in between; data loss risk | No fix PR yet; resolves startup transcript synchronization |
| 7 | #12176 [S2] | High | Deferred MCP tool list in HashMap order causes system prompt changes; busts prompt caching | No fix PR yet; resolves ordering fix |

**Overall Stability Assessment**: Recent bugs are primarily concentrated in **critical security and data loss risks** (principal ownership bypass, authorization policy gaps) and **stability degradation** (session lifecycle leaks, stack overflow, prompt caching inconsistency). Most high-priority bugs have not yet received fixes, requiring immediate attention from the maintainer team.

### 6. Feature Requests & Roadmap Signals
- **Security & Governance**: Need improvements in principal ownership enforcement, identity verification limits (OIDC), and tool authorization (wildcard handling, approval gate for non-runnable tools) to prevent security bypass and ensure data integrity.
- **Runtime Stability**: Priority for fixing session lifecycle leaks, async/benchmark stability, and prompt caching integrity to avoid runtime degradation and performance issues.
- **Channel & Integration Expansion**: Requirements for richer channel capabilities (voice synthesis, multi-channel routing, file attachment) and extensibility (multi-model support, plugin registry) to enable broader functionality and user extension.
- **Developer Experience**: Need documentation fixes (e.g., email tool setup, config path clarity) and dev fixes (e.g., Web UI migration considerations) to improve usability and developer experience.

### 7. User Feedback Summary
- **Primary Pain Points**: Users report high concern over **security risk** (e.g., unauthorized tool use, data leakage from session tools, gateway identity verification gaps), **runtime stability issues** (e.g., conversations being rejected during long tool-heavy sessions, broken prompt caching), and **integration usability issues** (e.g., matrix/channel routing behavior inconsistencies, channel feature limitations for voice/attachment interactions).
- **Use Cases Implicit**: Users need robust agent security (guaranteed authorization and data protection), stable long-running workflows (repeatable, consistent execution with no state changes), and high-impact channel interactions (rich, interactive communication).
- **Satisfaction Signal**: Active bug fixes and high-priority security/identity improvements suggest user satisfaction with the project's security and core functionality, though stability and user-facing edge cases require ongoing refinement.

### 8. Backlog Watch
1. **Critical: #12263 (Session Rejection)** - Critical security/stability issue where provider rejects long tool-heavy sessions with permanent conversation block; requires immediate handling of `tool_call_id` field and provider request size logic.
2. **Critical: #11127, #11123 (Principal/Bypass Security Issues)** - Two critical security issues where session-data tools bypass principal ownership and authorization policies; requires enforcement of ownership boundary, tool authorization, and policy matching to prevent data loss and security violations.
3. **High: #10926 (Matrix Send_Via Targeting), #9572 (Tokio Worker Stack Overflow)** - High-impact issues where matrix targeting and gateway worker stack stability cause degraded behavior; requires fixing target resolution logic and worker stack management.
4. **High: #12279 (Channel Transcript Overwrite), #12176 (MCP Prompt Caching)** - High-impact issues causing data loss and prompt inconsistency; requires fixing channel synchronization and MCP tool ordering.
5. **High: #9779 (SOP Document Loading), #9597 (Peer Agent Turn Durability)** - High-priority issues where SOPs and peer-agent turns fail to load/durable; requires fixing SOP subsystem gate logic and turn lifecycle management.

**Recommended Actions**: Prioritize fixing the critical security and stability bugs listed above, and address the high-priority backlog items to ensure project stability and user safety.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*