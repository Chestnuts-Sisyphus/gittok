# Hugging Face 热门模型日报 2026-09-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-20 22:02 UTC

---

### 2026-09-21 Hugging Face 热门模型日报

#### 1. 今日速览
今日 Hugging Face 生态呈现出“Qwen3.8 生态极速扩张”与“多模态视频模型并进”的双主线趋势。Qwen3.8 系列模型凭借其极高的性能与易用性，占据了榜单近半壁江山，尤其在 GGUF 量化部署方面表现亮眼。与此同时，以 MiniMax-H3 和 LTX-2.5 为代表的视频生成模型持续引发社区热议，展现了端侧与云端多模态应用的深度渗透。

---

#### 2. 热门模型

**🧠 语言模型（LLM、对话模型）**
*   **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)** | 作者: Qwen | 点赞: 5,489 | 下载: 761,112
    *   *说明：作为 Qwen 家族最新一代演进版，Flash-Next 在对话与推理效率上树立了新标杆。*
*   **[meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct)** | 作者: meta-llama | 点赞: 7,767 | 下载: 5,910,102
    *   *说明：虽然发布时间较久，但其在 8B 规模下的指令遵循能力依然是社区基准测试的“硬通货”。*
*   **[openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)** | 作者: openbmb | 点赞: 1,624 | 下载: 420,622
    *   *说明：极致轻量化且性能强悍的 LLM，非常适合端侧部署与即时推理。*

**🎨 多模态与生成（图像、视频、音频）**
*   **[MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** | 作者: MiniMaxAI | 点赞: 5,524 | 下载: 4,057,444
    *   *说明：当下最火的图像到视频生成模型，凭借极高的视觉一致性领跑视频创作生态。*
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** | 作者: Lightricks | 点赞: 4,544 | 下载: 1,609,559
    *   *说明：专注高质量视频合成，支持多种转换模式，是目前视频生成领域的关键工具。*
*   **[m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B)** | 作者: m-a-p | 点赞: 912 | 下载: 17,403
    *   *说明：YuE2 系列在符号音乐规划与音频生成领域展现了极高的灵活性。*

**🔧 专用模型（代码、推理）**
*   **[Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview)** | 作者: Edge0 | 点赞: 3,548 | 下载: 76,669
    *   *说明：高性能 MoE 模型预览版，专为边缘推理优化，平衡了参数规模与运行速度。*

**📦 微调与量化（GGUF、MLX）**
*   **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** | 作者: unsloth | 点赞: 4,427 | 下载: 6,941,478
    *   *说明：通过 Unsloth 极速框架量化的版本，让 27B 参数的 Qwen3.8 在消费级显卡上运行成为可能。*
*   **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** | 作者: prism-ml | 点赞: 1,473 | 下载: 1,908,396
    *   *说明：实验性的三元（Ternary）2-bit 量化，极大地压缩了内存占用，是端侧极致优化的代表。*

---

#### 3. 生态信号
*   **家族势力**：Qwen（通义千问）系列模型已成为社区事实上的“开源基石”，从 3.8B 到 27B 的各版本适配方案（尤其是 Flash 和 GGUF 变体）极其活跃。
*   **量化范式迁移**：社区已不再满足于标准的 INT4 量化，向更低位（2-bit/三元）和特定硬件（MLX、GGUF）适配的趋势显著，说明开发者正集体向“更小、更快、更随处可见”的目标演进。
*   **多模态融合**：单纯的 Text-to-Text 模型关注度趋稳，具备 Image-to-Video 或复杂视觉理解能力的模型权重正成为开发者最渴望的“生产力武器”。

---

#### 4. 值得探索
1.  **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)**：如果你在追求推理延迟与效果的极致平衡，这是目前最先进的基底模型。
2.  **[MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：视频生成能力的标杆，非常适合测试模型在复杂动态场景下的稳定性和逻辑理解能力。
3.  **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**：适合研究如何通过极端压缩技术，在显存受限的个人设备上运行中大型模型。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*