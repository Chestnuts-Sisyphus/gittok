# Hugging Face 热门模型日报 2026-11-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-21 00:59 UTC

---

你好！我是 AI 模型生态分析师。以下是为您整理的 2026-11-21 《Hugging Face 热门模型日报》：

### 1. 今日速览
今日 Hugging Face 趋势榜呈现出“多模态爆发”与“高性能模型量化普及”的双重特征。以 **Qwen3.8-27B** 为核心的模型矩阵占据了开源微调领域的绝对统治地位，而 **LTX-2.5** 等视频生成模型则进一步推高了多模态创作的上限。同时，GGUF 格式已成为社区落地部署的行业标准，极大地降低了高性能模型在消费级硬件上的准入门槛。

---

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型）
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
    *   作者：Qwen | 点赞：20,803 | 下载：6,454,419
    *   简述：目前开源界的最强基座模型，凭借极高的泛化能力成为所有下游微调模型的首选来源。
*   **[deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)**
    *   作者：deepseek-ai | 点赞：6,036 | 下载：505,387
    *   简述：DeepSeek 系列的高效版本，以极快的推理速度和卓越的文本生成能力备受开发者青睐。
*   **[nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)**
    *   作者：nvidia | 点赞：683 | 下载：183,617
    *   简述：英伟达推出的轻量化高效模型，针对边缘端部署进行了深度优化，性能强劲且体积友好。

#### 🎨 多模态与生成
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
    *   作者：Lightricks | 点赞：12,896 | 下载：2,964,523
    *   简述：目前的顶级图像到视频生成模型，在动态捕捉与一致性处理上达到工业级表现。
*   **[higurashi-ai/Haru-4B](https://huggingface.co/higurashi-ai/Haru-4B)**
    *   作者：higurashi-ai | 点赞：5,435 | 下载：7,323
    *   简述：创新的全双工语音交互模型，支持实时对话，是实时语音处理领域的新星。
*   **[black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/flux-3-image-klein-comfy)**
    *   作者：black-forest-labs | 点赞：3,631 | 下载：981,223
    *   简述：针对 ComfyUI 优化的 Flux-3 变体，大幅提升了图像生成与编辑的社区响应速度。

#### 📦 微调与量化
*   **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**
    *   作者：unsloth | 点赞：6,298 | 下载：7,383,193
    *   简述：Qwen3.8 的官方量化版，让 27B 参数规模的模型能在个人电脑上顺畅运行。
*   **[huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF)**
    *   作者：huihui-ai | 点赞：2,507 | 下载：4,448,225
    *   简述：通过“去消解”（abliterated）技术处理后的非审查版本，深受社区开发者和内容创作者追捧。

---

### 3. 生态信号
当前模型生态呈现**“Qwen3.8 中心化”**现象，该模型凭借优秀的架构设计，已取代早期的 Llama 系列成为社区二次开发的核心。与此同时，**量化技术（GGUF）**已成为开源模型的“基础设施”，甚至在某些模型上，量化版本的热度直接超越了原始 FP16 版本。闭源厂商（如 Tencent、Apple、Meta）依然积极发布专用模型（如 SAM3、Hy4），表明开源与闭源的边界正在模糊，企业正在利用开源社区进行更广泛的技术验证与生态占位。

---

### 4. 值得探索
1.  **[facebook/sam3](https://huggingface.co/facebook/sam3)**：Meta 的最新分割模型，其对 3D 视频的支持标志着分割技术正从静态向动态迁移，值得学术界与工业界关注。
2.  **[apple/FastFrames-L](https://huggingface.co/apple/FastFrames-L)**：Apple 在视频生成领域的重要动作，结合了 Wan2.1 的强大底座，是研究 Apple 端侧高性能生成逻辑的最佳切入点。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*