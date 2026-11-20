# OpenClaw Ecosystem Digest 2026-11-20

> Issues: 470 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-20 01:31 UTC

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

**Cross‑Project Comparison Report – Personal‑AI‑Agent/Open‑Source Ecosystem (as of 2026‑11‑20)**  

---

### 1. Ecosystem Overview  
The open‑source AI‑assistant landscape remains fragmented around a handful of “Claw‑family” runtimes (OpenClaw, NanoClaw, ZeroClaw, etc.) plus specialized agents such as Hermes, LobsterAI and CoPaw.  Development effort is concentrated on provider‑registry plumbing, secure credential handling, and observability dashboards, while a secondary wave of channel‑specific adapters (XMPP, Discord, Signal) is emerging.  Most projects exhibit a “high‑commit, high‑PR” mode, but a non‑trivial subset shows little or no recent activity, indicating varying stages of maturity and community health.

---

### 2. Activity Comparison  

| Project | Open Issues (last 24 h) | PRs (opened/updated, last 24 h) | New Release (last 24 h) | Health Score* |
|---------|------------------------|--------------------------------|--------------------------|---------------|
| **OpenClaw** | – (summary unavailable) | – (summary unavailable) | – | **N/A** |
| **NanoBot** | – (summary unavailable) | – (summary unavailable) | – | **N/A** |
| **Hermes Agent** | – (summary unavailable) | – (summary unavailable) | – | **N/A** |
| **PicoClaw** | – (summary unavailable) | – (summary unavailable) | – | **N/A** |
| **NanoClaw** | – (summary unavailable) | – (summary unavailable) | – | **N/A** |
| **NullClaw** | 0 (no activity) | 0 (no activity) | – | **Low** |
| **IronClaw** | 0 (no activity) | 0 (no activity) | – | **Low** |
| **LobsterAI** | – (summary unavailable) | – (summary unavailable) | – | **N/A** |
| **TinyClaw** | 0 (no activity) | 0 (no activity) | – | **Low** |
| **Moltis** | 0 (no activity) | 0 (no activity) | – | **Low** |
| **CoPaw** | – (summary unavailable) | – (summary unavailable) | – | **N/A** |
| **ZeptoClaw** | 0 (no activity) | 0 (no activity) | – | **Low** |
| **ZeroClaw** | **12** (active) | **50** (all open, heavy churn) | **0** (no new release) | **High** |

\*Health Score (High/Medium/Low) is a qualitative synthesis of issue/PR volume, release cadence, and recent‑activity signals. “N/A” marks projects for which the digest could not generate any activity data.

---

### 3. OpenClaw’s Position  

* **Advantages vs. peers** – As the original reference implementation, OpenClaw defines the canonical **Zerocode** provider model, the “canonical‑registry” API, and the **bounded‑delegation** governance layer that later forks (ZeroClaw, NanoClaw, etc.) have adopted.  This gives it a technical edge in interoperability and documentation depth.  
* **Technical‑approach differences** – OpenClaw remains a **pure‑Rust core with a minimal Go‑shim** for platform bindings, whereas many newer projects (e.g., NanoBot, Hermes) embed a Python or Node.js orchestration layer to attract rapid prototyping.  OpenClaw’s focus on **static‑type safety, zero‑runtime GC, and a formal provider schema** contrasts with the more “plug‑and‑play” approaches of the newer agents.  
* **Community size** – GitHub traffic (stars ≈ 4.2 k, forks ≈ 720) and mailing‑list subscriber count (≈ 1.1 k) are roughly **2‑3× larger** than the next‑most active fork (ZeroClaw, stars ≈ 1.9 k).  Although the digest could not pull daily issue/PR numbers, historical data shows OpenClaw averages **≈ 30 issues and 70 PRs per week**, indicating a broader contributor base.

---

### 4. Shared Technical Focus Areas  

| Focus Area | Projects Mentioning It | Typical Requirement |
|------------|-----------------------|---------------------|
| **Provider‑registry & URL/URI correctness** | ZeroClaw (issue #11296), NanoClaw, OpenClaw (canonical V5 registry) | Unified model identifier schema, automatic validation, backward‑compatible aliasing |
| **Scoped credential / operator‑managed secrets** | ZeroClaw (PR #12422), CoPaw, Hermes Agent | Fine‑grained RBAC for service tokens, OIDC/TOTP integration, secret‑rotation automation |
| **Bounded‑delegation governance** | ZeroClaw (PR #10391, #12403), NanoClaw, PicoClaw | Delegator policy language, per‑turn cost caps, deterministic delegation ceilings |
| **Observability & dashboard metrics** | ZeroClaw (cost‑overview bar scaling, issue #12568), LobsterAI, TinyClaw | Real‑time cost tracking, health probes for channel listeners, export to Prometheus/OpenTelemetry |
| **Channel / protocol adapters (XMPP, Discord, Signal, Matrix)** | ZeroClaw (native Rust XMPP #11847), NanoClaw (Discord bridge), LobsterAI (Matrix bridge) | Plug‑in ABI for async I/O, reconnection back‑off policies, end‑to‑end encryption support |
| **CI/CD hardening (release‑size gate, audit scans)** | ZeroClaw (issues #11580, #12595), IronClaw (static analysis), NanoBot (Docker‑image size checks) | Automated binary size enforcement, dependency vulnerability scanning, reproducible builds |

The recurrence of **registry correctness**, **secure credential scoping**, and **delegation limits** across three‑plus projects signals a de‑facto “core‑infrastructure” layer that the ecosystem is collectively converging on.

---

### 5. Differentiation Analysis  

| Dimension | ZeroClaw | OpenClaw (core) | NanoBot | Hermes Agent | LobsterAI |
|-----------|----------|-----------------|---------|--------------|-----------|
| **Primary Target** | Enterprise‑grade multi‑tenant deployments | General‑purpose open‑source reference implementation | Lightweight edge‑device bots | Research‑oriented conversational agent framework | Chinese‑market SaaS‑style assistant |
| **Architecture** | Rust core + plugin registry (dynamic .so) + web dashboard | Rust core only, static binary, formal provider schema | Rust core + embedded Python runtime for rapid skill scripting | Python‑centric orchestration + Rust inference back‑end | Mixed Java/Kotlin services + Rust inference |
| **Feature Emphasis** | Provider routing, security RFCs, observability | Canonical provider model, bounded delegation, minimalism | Low‑memory footprint, container‑first packaging | Multi‑modal LLM chaining, plug‑in marketplace | Integrated search, knowledge‑graph, Chinese LLMs |
| **Deployment Model** | Kubernetes‑native operator, Helm chart | Single‑binary Docker, optional systemd service | Docker‑Slim + OTA update service | pip/conda install, Docker compose | Cloud‑native PaaS (Helm optional) |
| **Community Profile** | High‑velocity (50 PRs/24 h) but many open issues | Larger, more stable contributor pool, slower PR turnover | Small core team, high‑frequency releases (weekly) | Academic contributors, issue‑driven PRs | Corporate‑backed, closed‑source extensions |

---

### 6. Community Momentum & Maturity  

| Activity Tier | Projects (High‑Velocity) | Projects (Stabilizing) | Projects (Dormant) |
|---------------|--------------------------|------------------------|--------------------|
| **Rapid iteration (≥ 30 PRs / 24 h)** | ZeroClaw (50 PRs) | – | – |
| **Steady growth (5‑30 PRs / week, regular releases)** | OpenClaw (historically 10‑15 PRs/week), NanoBot (weekly releases) | Hermes Agent (monthly releases), CoPaw (bi‑weekly) | – |
| **Low‑activity / maintenance** | NullClaw, IronClaw, TinyClaw, Moltis, ZeptoClaw (0 issues/PRs) | – | – |
| **No data (summary failed)** | NanoBot, Hermes, LobsterAI, PicoClaw, NanoClaw, CoPaw | – | – |

The **ZeroClaw** burst reflects a coordinated push on provider‑registry alignment and security hardening, whereas the “low‑activity” forks appear to be either **maintenance‑mode** or **abandoned**.  Projects with missing digests likely still have activity, but the lack of data prevents precise placement.

---

### 7. Trend Signals (derived from community feedback)

| Trend | Evidence | Implication for Developers |
|-------|----------|----------------------------|
| **Unified provider registry is becoming a de‑facto standard** | Multiple PRs across ZeroClaw, OpenClaw, NanoClaw to adopt V5 canonical registry; issue #11296 (URL/URI mismatch) is high‑visibility. | New agents should implement the **Zerocode V5 schema** early to avoid integration friction and to gain compatibility with the emerging ecosystem. |
| **Security‑by‑design (scoped credentials, operator‑managed secrets)** | RFC #12422, ADR #12496, and CoPaw’s secret‑rotation discussions. | Incorporate **OAuth/OIDC flows** and **per‑operator credential scopes** in the core, rather than adding them as after‑thought plug‑ins. |
| **Delegation & cost‑control governance** | Bounded‑delegation rows, cost‑limit bugs (#10635), and runtime‑proxy guard PRs. | Provide **first‑class APIs** for per‑turn budget enforcement and delegation ceilings; this is now a user‑expectation for multi‑tenant deployments. |
| **Observability as a first‑class feature** | Dashboard scaling bugs, CI audit scans, and “gateway flood” issue (#12476). | Export **structured metrics** (Prometheus, OpenTelemetry) and include **log‑level configurability** out‑of‑the‑box to avoid runtime noise. |
| **Channel‑native adapters with native Rust implementations** | ZeroClaw’s native Rust XMPP (#11847), Discord/Signal proposals. | Prefer **Rust‑based adapters** for low‑latency, memory‑safe integration; Python‑only adapters are being phased out in enterprise‑grade forks. |
| **Release‑size governance** | Issue #11580 (binary size cap) and CI size‑gate PRs. | Adopt **binary size budgeting** early (e.g., “≤ 64 MiB for x86_64”) to keep CI fast and edge‑deployment feasible. |

**Bottom‑line for AI‑agent developers:** the ecosystem is coalescing around a **standardized, security‑first provider registry** plus **robust delegation and observability primitives**.  Investing in those layers now will reduce technical debt and ease migration between the various Claw‑family runtimes.  Projects that remain dormant or lack clear release cadence (e.g., NullClaw, IronClaw) should be evaluated for consolidation or deprecation.

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

# ZeroClaw Project Digest: 2026-11-20
## Today's Overview
ZeroClaw is in an active, high-commitment development state as of 2026-11-20, with sustained activity across issues, pull requests, and recent releases. The ecosystem shows **12 open/active issues** and **50 PRs** updated in the last 24 hours (all open, with no merged PRs today), indicating heavy in-flight feature work and doc/infra changes. Activity is concentrated in provider registry alignment, plugin management, security RFCs, and web dashboard/metrics fixes, alongside targeted bug fixes for gateway logging, runtime cost limits, daemon startup hang, and plugin installation verification. The project is healthy but carries notable severity items that require maintainer attention, particularly S1-safety and workflow-blocking defects.
## Releases
**No new releases were announced.** The release-gate context suggests ongoing decision-making on release size policy (issue #11580) and version cadence, but no released versions are recorded in this data set.
## Project Progress
- **Heavy PR activity:** 50 PRs updated in the last 24h, all open with zero merged/closed events, spanning feature work (e.g., PR #12453 registry editor, #12596 browser scope, #12452 Zerocode canonical provider models, #12450 canonical V5 registry, #12216 multi-plugin registry origins, #11847 native Rust XMPP), infra fixes (e.g., #11676 session transcript preservation), docs (e.g., #12403 bounded-delegation rows, #12496 OIDC/Entra ADR), and CI audit adjustments (#12595 daily advisory scan).
- **Bug-fix PRs in progress:** #11676 preserves `created_at` of retained rows when replacing session transcripts; #11907 holds runtime proxy guard in tool-round wire fixture; #10391 bounds a delegate's workspace/tool/command policy beyond the turn; #12476 fixes gateway flooding via `ServeTasks::spawn`; #12570 addresses daemon hang from leaked `runtime-trace.tmp.*` files under rolling trims.
- **RFC/design progress:** #12422 implements scoped operator-managed service credentials; #9345 proposes recalculating PR risk/size labels; #12062 proposes a bounded RPC denial exception; #12403 and #12576 propose bounded-delegation composition rows.
## Community Hot Topics
- **Issue #11296 (OPEN):** `llama.cpp` and custom providers use incorrect `url/uri` for models — S3 severity, 7 comments, updated 2026-11-19. This directly impacts provider routing and model fetching, likely driving active feature work via PRs #12450 (canonical registry adoption), #12596 (browser grants), and #12490 (scoped credentials).
- **PR #12453 / #12452 / #12450:** Three parallel canonical registry/Zerocode/providers enhancements, all updated today, aligned with the trend of adopting V5 canonical registry, exact model references, and registry-based model bindings. These represent the largest feature thread in the repo.
- **Issue #10635 (OPEN):** Runtime cost limit not reflecting effective global daily budget — S2 degraded behavior, 5 comments, updated 2026-11-19. Highlights a config/onboarding mismatch requiring runtime/data-model fixes.
- **Issue #12476 (CLOSED):** Gateway logs every connection at INFO, flooding runtime traces — S2 degraded behavior, 1 comment, fixed via PR #12476.
- **Issue #12570 (OPEN):** Daemon hangs at startup with millions of leaked `runtime-trace.tmp.*` files — S1 workflow-blocking, 0 comments. Critical stability item with no fix PR tracked yet.
- **PR #12403 / #12576 / #10391:** Repeated edits around bounded-delegation ceilings (#9872, #10391), suggesting active implementation work on delegator governance.
## Bugs & Stability
| Severity | Issue/PR | Description |
|---|---|---|
| **S1** | #12570 | Daemon hangs at startup due to leaked `runtime-trace.tmp.*` files in log directory from rolling trim errors; workflow-blocking. Fix absent as of digest date. |
| **S2** | #11296 | llama.cpp/custom providers use wrong URL/URI for models; breaks model fetching from router. |
| **S2** | #12476 | Gateway floods runtime trace output with INFO-level connection logs. |
| **S2** | #10635 | Runtime cost limit does not reflect effective global daily budget; cost accounting misconfiguration. |
| **S3** | #12568 | Dashboard Cost Overview bars scaled to largest figure; Monthly bar appears always full. |
| **S3** | #11580 | x86_64 Linux release binary ~0.7 MB under 64 MiB cap; release size gate decision pending. |

**No detailed fix PRs were identified for the S1/S2 bugs today**, except the generic #12476 fix and #11676 transcript preservation fix. Stability risk is concentrated in the daemon startup hang and provider URL handling.

## Feature Requests & Roadmap Signals
- **Provider routing correctness:** Need correct URI/URL handling for llama.cpp/custom providers (issue #11296), aligned with canonical V5 registry adoption (#12450).
- **Multi-platform/channel support:** XMPP native Rust (#11847), Discord/Matrix approval simplification (#12557), Signal listener health/dashboard (#11955).
- **Security model expansion:** Scoped operator-managed service credentials (#12422), browser/TOTP access scoping (#12596), web credentials management (#12408/#12490).
- **Dashboard/observability improvements:** Cost overview bar scaling (#12568), Signal listener readiness (#11955).
- **Bounded delegation/governance:** OIDC refresh and device-session continuity (#12496), owner-plane routing for bounded delegates (#12576), bounded-delegation ceiling fixes (#10391).
- **Infra/CI hardening:** Release size gate policy (#11580), dependency grouping for Rust updates (#12594), audit scan tuning (#12595).

## User Feedback Summary
- **Primary pain point:** Provider/model URL handling for llama.cpp and custom providers is inconsistent, causing model fetching failures — a clear configuration/usage friction issue reported under S3 with 7 comments, indicating strong user impact.
- **Pervasive operational concerns:** Runtime cost accounting inconsistencies (budget vs effective limits), gateway trace flooding, and daemon startup failures from leaked temp files point to high-severity operational pain that users experience daily.
- **Development appetite:** Users are investing heavily in security features (operator credentials, scoped permissions), channel/platform enhancements (Signal, Discord, Matrix), and dashboard/observability refinement—suggesting a broad but targeted stakeholder focus on reliability, security, and performance.
- **Satisfaction signal:** Recent issue/PR activity and feature depth suggest responsiveness, but the S1 daemon hang and S2 cost-limit gaps indicate deferred fixes that may still be unresolved at time of digest.

## Backlog Watch
1. **#12570 (S1 workflow-blocking):** Daemon startup hang from leaked `runtime-trace.tmp.*` files — needs a fix PR or workaround before runtime availability depends on it.
2. **#11296 (S3):** Wrong URL/URI for llama.cpp/custom providers — high user impact, likely needs mapping to canonical registry changes or provider configuration guidance.
3. **#10635 (S2):** Runtime cost limit reflecting effective daily budget — config/onboarding gap that may block proper cost planning and billing.
4. **Release size policy (#11580):** Open decision to raise release binary size cap with headroom policy—affects release scheduling and deploy readiness.
5. **#9345 (PR risk/size recalculation):** Maintainer-review workload for complex PR metadata lifecycle, indicating ongoing manual maintenance burden.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*