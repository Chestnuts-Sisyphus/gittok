# Hugging Face 热门模型日报 2026-09-09

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-08 22:10 UTC

---

# Hugging Face 热门模型日报（2026-09-09）

---

### 1. 今日速览

今日 Hugging Face 趋势榜展现出三大核心焦点：**多模态标配化**、**开源视频生成爆发**以及**极致端侧量化**。通义千问（Qwen3.8 家族）、智谱（GLM-5.3 家族）与 DeepSeek（DeepSeek-V4 Vision 实验版）持续巩固在视觉-文本多模态大模型领域的统治地位；MiniMax-H3 与 LTX-2.5 的热度高涨，标志着高质量开源图像/文本到视频生成已进入大规模应用阶段；此外，Unsloth、NVIDIA 等团队带来的 GGUF 与 NVFP4 量化生态极大地降低了端侧运行高阶多模态模型的门槛。

---

### 2. 热门模型分类精选

#### 🧠 语言模型（LLM、对话模型、指令微调）

*   [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3)
    *   **作者**: zai-org | **点赞**: 1,763 | **下载**: 474,141
    *   **一句话说明**: 智谱最新发布的旗舰级混合专家（MoE）文本大模型，因卓越的复杂推理与长文本生成能力而备受瞩目。
*   [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B)
    *   **作者**: XHToken | **点赞**: 842 | **下载**: 10,661
    *   **一句话说明**: 轻量级端侧语言模型，以极低的资源占用实现了出色的对话与指令遵循能力。
*   [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)
    *   **作者**: openbmb | **点赞**: 641 | **下载**: 2,879
    *   **一句话说明**: 面向端侧设备的 2B 超小体量模型，凭借极高的能效比和强劲的基准测试表现登榜。
*   [IFM/K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B)
    *   **作者**: IFM | **点赞**: 232 | **下载**: 3,205
    *   **一句话说明**: 基于 MoE 架构（总重 36B，激活仅 4B）的文本生成模型，兼顾计算效率与高性能表现。

#### 🎨 多模态与生成（图像、视频、音频、文本到X）

*   [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)
    *   **作者**: Qwen | **点赞**: 14,383 | **下载**: 6,712,160
    *   **一句话说明**: 阿里通义千问新一代 27B 视觉-文本旗舰模型，综合多模态能力出众，成为本周社区绝对顶流。
*   [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)
    *   **作者**: MiniMaxAI | **点赞**: 5,045 | **下载**: 4,994,268
    *   **一句话说明**: MiniMax 开源的顶尖图文转视频生成模型，在时空一致性和生成画质上达到行业领先水平。
*   [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)
    *   **作者**: Qwen | **点赞**: 5,006 | **下载**: 503,263
    *   **一句话说明**: Qwen3.8 架构的高吞吐、低延迟实验版本，极大地提升了视觉理解与对话的推理速度。
*   [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)
    *   **作者**: Lightricks | **点赞**: 3,172 | **下载**: 1,644,796
    *   **一句话说明**: 支持图生视频、文生视频及视频到视频的全能单文件扩散生成模型。
*   [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)
    *   **作者**: zai-org | **点赞**: 2,169 | **下载**: 826,875
    *   **一句话说明**: 智谱官方推出的多模态轻量化高响应模型，主打实时多模态交互体验。
*   [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp)
    *   **作者**: deepseek-ai | **点赞**: 819 | **下载**: 313,547
    *   **一句话说明**: DeepSeek-V4 视觉多模态预览版，展示了其在图文理解与极速推理上的突破性探索。

#### 🔧 专用模型（时间序列、语音、嵌入、经典基座）

*   [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)
    *   **作者**: google | **点赞**: 628 | **下载**: 444,052
    *   **一句话说明**: 谷歌最新时间序列预测基础模型，为工业级预测与时序分析提供强力支持。
*   [BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2)
    *   **作者**: BreezeBlue | **点赞**: 485 | **下载**: 7,243
    *   **一句话说明**: 新一代高质量语音合成模型，表现出自然的情感表达与高度流畅的文本转语音效果。
*   [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B)
    *   **作者**: microsoft | **点赞**: 153 | **下载**: 1,449
    *   **一句话说明**: 微软发布的 7B 参数流式语音识别模型，适用于低延迟实时转录场景。
*   [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)
    *   **作者**: sentence-transformers | **点赞**: 5,619 | **下载**: 253,331,994
    *   **一句话说明**: 向量检索与文本嵌入领域的绝对基石，月下载量超 2.5 亿次。
*   [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32)
    *   **作者**: openai | **点赞**: 1,251 | **下载**: 20,702,763
    *   **一句话说明**: 经典跨模态表征模型，持续在图文检索与零样本分类任务中担任重要基准。

#### 📦 微调与量化（社区衍生、GGUF、AWQ、无限制版）

*   [unsloth/Qwen3.8-27B

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*