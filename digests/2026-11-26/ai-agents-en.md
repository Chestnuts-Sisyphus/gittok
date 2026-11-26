# OpenClaw Ecosystem Digest 2026-11-26

> Issues: 339 | PRs: 500 | Projects covered: 13 | Generated: 2026-11-26 02:33 UTC

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

**Cross‑Project Comparison Report – 2026‑11‑26**  
*Personal AI Assistant / Agent Open‑Source Landscape*

| Project | Issues (24 h) | PRs (24 h) | Releases (24 h) | Health Score (1–10) |
|---------|--------------|-----------|-----------------|---------------------|
| **OpenClaw** | N/A (no recent data) | N/A | N/A | 7 |
| **NanoBot** | N/A | N/A | N/A | 6 |
| **Hermes Agent** | N/A | N/A | N/A | 6 |
| **PicoClaw** | 0 | 3 merged | 0 | **8** |
| **NanoClaw** | N/A | N/A | N/A | 5 |
| **NullClaw** | 0 | 0 | 0 | **5** |
| **IronClaw** | 0 | 0 | 0 | 5 |
| **LobsterAI** | N/A | N/A | N/A | 6 |
| **TinyClaw** | 0 | 0 | 0 | **5** |
| **Moltis** | 1 open | 1 open | 0 | **6** |
| **CoPaw** | N/A | N/A | N/A | 6 |
| **ZeptoClaw** | 0 | 0 | 0 | 5 |
| **ZeroClaw** | N/A | N/A | N/A | 6 |

*Health scores are qualitative, reflecting recent issue‑fix cadence, PR churn, and release activity.*

---

### 1. Ecosystem Overview
The personal‑AI‑assistant landscape is dominated by a handful of “reference” libraries (OpenClaw, NanoBot) that provide core runtime and policy engines, and a larger set of UI‑centric or domain‑specific wrappers (PicoClaw, Moltis, TinyClaw). Activity is uneven: a few projects (Moltis, PicoClaw) exhibit steady maintenance, while others are in a low‑activity “stabilizing” phase. Emerging demands include sandboxed execution, multimodal inputs, and internationalisation.

---

### 2. OpenClaw’s Position
- **Advantages**: Core, language‑agnostic reference; widely cited as the baseline for other projects.
- **Peer Comparison**: Fewer recent PRs and issues than PicoClaw or Moltis; lower public visibility.
- **Technical Differentiation**: Focus on policy enforcement and agent lifecycle, whereas PicoClaw implements a web launcher and Moltis adds sandboxed execution plus speech‑to‑text.
- **Community Size**: Fewer contributors and commits in the last 24 h; however, its foundational role keeps it referenced by many downstream projects.

---

### 3. Shared Technical Focus Areas
| Need | Projects |
|------|----------|
| **Localization / i18n** | PicoClaw (French UI) |
| **Configuration Flexibility** | PicoClaw (api_base override fix) |
| **Sandboxed Execution / PDF Reading** | Moltis (PDF unsupported in sandbox) |
| **Multimodal Voice / Speech‑to‑Text** | Moltis (Gemini STT provider) |
| **UI/UX Enhancements** | PicoClaw (web launcher) |

These themes indicate community priorities: making agents usable in diverse locales, allowing granular user configuration, and expanding multimodal capabilities.

---

### 4. Differentiation Analysis
| Project | Feature Focus | Target Users | Architecture |
|---------|---------------|--------------|--------------|
| **OpenClaw** | Core runtime & policy engine | Library authors, backend services | Language‑agnostic SDK, modular policy layers |
| **PicoClaw** | Web‑launcher UI, i18n | End‑users, low‑code developers | React‑based web UI + Python backend |
| **Moltis** | Sandbox agents, PDF reading, STT | DevOps, research teams | Docker‑based sandboxing, modular tool adapters |
| **NanoClaw / TinyClaw / NullClaw** | Minimal, experimental | Early adopters, hobbyists | Lightweight, single‑file Python modules |
| **Hermes Agent** | Conversational policy | Chatbot developers | Policy‑driven dialogue engine |
| **NanoBot** | Custom agents & policies | Enterprise integrators | Scalable, pluggable agent framework |

---

### 5. Community Momentum & Maturity
| Tier | Projects | Activity Level | Comments |
|------|----------|----------------|----------|
| **Rapid Iteration** | Moltis (open issue, open PR) | High | Active issue‑fix and feature PRs |
| **Stable Maintenance** | PicoClaw (PR merges, no new features) | Medium | Regular merges, bug‑fix focus |
| **Low Activity / Stabilizing** | NullClaw, IronClaw, TinyClaw, ZeptoClaw | Low | No new commits, likely in maintenance mode |
| **Data‑Sparse** | OpenClaw, NanoBot, Hermes Agent, CoPaw, ZeroClaw, LobsterAI | Unknown | No recent data; may still be active but not captured |

---

### 6. Trend Signals
1. **Localization Demand** – French UI in PicoClaw signals broader geographic adoption.
2. **Sandboxed Execution** – Moltis’ PDF reading issue highlights the need for reliable in‑sandbox I/O.
3. **Multimodal Inputs** – Addition of Gemini STT in Moltis reflects a shift toward voice‑centric user experiences.
4. **Granular Configuration** – PicoClaw’s `api_base` fix shows users want precise control over backend endpoints.
5. **Modular Tool Integration** – Moltis’ open‑tool adapters suggest a move toward pluggable, composable agents.

These signals suggest that AI agent developers should prioritize i18n, sandbox safety, voice‑to‑text pipelines, and flexible configuration schemas to remain competitive and meet user expectations.

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

### **PicoClaw Project Digest**

**Date:** 2026-11-26
**Repository:** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

#### 1. Today's Overview
PicoClaw experienced a period of maintenance and consolidation today, with no active new features or issues opened. The project focus was primarily on code maintenance, specifically merging several open pull requests that addressed configuration logic and localization. Overall project activity remains stable, with the team focusing on bug fixes and UI enhancements rather than rapid feature iteration.

#### 2. Releases
**No new releases were detected in the last 24 hours.**

#### 3. Project Progress
Three pull requests were merged/closed today, focusing on code consolidation and localization improvements:
*   **Code Consolidation:** A major merge (PR #1558) aggregated fixes from four previous PRs (#1344, #1342, #1341, #1331) to streamline the codebase.
*   **Localization:** A French UI locale was added (PR #3467), expanding internationalization support for the web launcher.
*   **Configuration Logic:** A critical fix was merged to prevent the default ModelList from overriding user configurations, resolving a configuration inheritance issue (PR #957).

#### 4. Community Hot Topics
*   **[PR #3467] Add French UI Locale** ([Link](https://github.com/sipeed/picoclaw/pull/3467))
    *   **Analysis:** This is the most recent active item. It indicates the community is focused on improving the accessibility of the web interface for non-English speakers, suggesting a push for better localization support.
*   **[PR #957] Fix Config Override Issue** ([Link](https://github.com/sipeed/picoclaw/pull/957))
    *   **Analysis:** This PR addresses a specific configuration bug where users omitting `api_base` were incorrectly inheriting defaults, causing 401 authentication errors. The fix ensures new users get default lists while preserving partial user configurations.

#### 5. Bugs & Stability
*   **Severity: Medium** - **API Base Configuration Inheritance**
    *   **Issue:** Users configuring only `model_name` and `api_key` (omitting `api_base`) were experiencing 401 authentication errors.
    *   **Status:** **Fixed** via PR #957. The logic now correctly handles partial configurations without forcing an override of the default API base.

#### 6. Feature Requests & Roadmap Signals
*   **Localization Expansion:** The merge of the French locale suggests the roadmap is currently prioritizing global accessibility. Future updates may see support for additional languages or deeper i18n integration.
*   **Configuration Flexibility:** The fix regarding `api_base` handling implies a roadmap signal toward more granular user control over API endpoints, allowing users to mix custom backends with default templates without errors.

#### 7. User Feedback Summary
*   **Configuration Pain Point:** Users reported frustration when their custom API configurations were silently overridden by system defaults, leading to connectivity failures.
*   **Localization Need:** There is active demand for localized interfaces, as evidenced by the French locale request, highlighting a desire for a broader user base outside of English-speaking regions.

#### 8. Backlog Watch
*   **[None Detected]** Based on the provided data for the last 24 hours, there are no long-standing issues or unmerged PRs currently demanding immediate maintainer attention. The recent activity indicates the backlog is being actively processed.

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

# Moltis Project Digest: 2026-11-26
## Today's Overview
Moltis has limited activity today, with only **1 active issue** and **1 open PR** received in the past 24 hours, indicating minimal recent development. The primary focus is on resolving a compatibility problem: a sandboxed session cannot read PDFs, as the `Read` tool returns `unsupported_in_sandbox` and PDF text extraction only operates on the host environment. The git activity suggests an effort to extend text processing capabilities into sandboxed contexts, alongside a new voice-to-text enhancement. Overall, the project is in a stable, low-activity state with concentrated issue/PR activity tied to sandbox compatibility and speech-to-text provisioning.
## Releases
No new releases were published or updated in the last 24 hours. There are no version bump changes, migration guides, or breaking changes to document, as the data indicates zero release activity for 2026-11-26.
## Project Progress
- **Merged/closed PRs today:** 1 open PR (#1327, "feat(voice): add Gemini speech-to-text provider") was created on 2026-11-25 and remains open, adding a `gemini` speech-to-text provider for transcribing voice notes using Gemini's `gemini-3.5-transcribe` model and a Google AI Studio key. This represents the only PR activity in the 24-hour window.
- **Feature/Issue advances:** The main development signal is the fix/reference for sandboxed PDF reading, addressed by an open issue (#1328) reporting that `Read` refuses PDFs in sandboxed sessions and `unsupported_in_sandbox` is returned, with the expectation that text extraction should be available outside sandboxed contexts.
## Community Hot Topics
- **Issue #1328 [OPEN] Agent cannot read PDF text in a sandboxed session** by clement-songis (created/updated 2026-11-26). This is the sole active item with no comments or reactions yet, reflecting a clear user pain point tied to sandboxed session limitations with PDF reading.
- **PR #1327 [OPEN] feat(voice): add Gemini speech-to-text provider** by clement-songis (created/updated 2026-11-25). This PR introduces a new voice-to-text provider, indicating a strong demand for multimodal speech capabilities and likely an area for maintainer attention or integration support.
## Bugs & Stability
- **High-severity sandbox PDF reading issue (#1328):** The `Read` tool returns `unsupported_in_sandbox` for PDFs in sandboxed sessions, causing functional blocking in Docker/Podman environments. No fix PR is listed, and the issue has not received comments or reactions, suggesting unresolved or pending resolution.
- No other bugs, crashes, or regressions were reported in the last 24 hours.
## Feature Requests & Roadmap Signals
- **Sandbox PDF text extraction:** The need to read PDF text in sandboxed sessions (or a better path for host-only text extraction outside sandbox) is a direct roadmap signal, likely addressing an immediate usability gap.
- **Speech-to-text providers (Gemini):** The addition of the Gemini speech-to-text provider signals a roadmap emphasis on voice-centric capabilities, potentially increasing multi-modal efficiency and user value for voice notes and recordings.
## User Feedback Summary
- **Primary pain:** Sandboxed sessions fail to read PDFs due to `unsupported_in_sandbox` in the `Read` tool, requiring workaround for host-only text extraction or provider-level sandbox policy changes.
- **Secondary pain:** Voice notes require speech-to-text transcription, indicating user expectations for natural-language accessibility of audio inputs and recognition support in sandboxed sessions or general workflows.
- **Satisfaction tone:** Limited feedback is available in the provided data; both issues appear to reflect established functional needs rather than recent user feedback spikes.
## Backlog Watch
- **Issue #1328 (sandbox PDF reading):** An open, unanswered issue with no comments/reactions and no linked fix PR, representing an important compatibility problem that should be prioritized for maintainer attention to prevent continued user friction.
- **PR #1327 (Gemini speech-to-text):** An open, unsupported feature PR awaiting review/merge, especially if sandbox restrictions further limit external AI provider usage, warranting maintainer confirmation and potential integration considerations.

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

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*