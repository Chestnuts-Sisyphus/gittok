# Hugging Face 热门模型日报 2026-09-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-09 22:06 UTC

---

# 📊 Hugging Face 热门模型日报 (2026-09-10)

---

### 1. 今日速览

今日 Hugging Face 榜单展现出极强的生态聚集效应。**Qwen 3.8** 与 **GLM-5.3** 两大国产旗舰模型家族全面霸榜，并同时推动了以 **“Flash/Next”** 为代表的高吞吐、低延迟极速多模态演进。同时，**开源视频生成**（如 MiniMax-H3、LTX-2.5）保持高度活跃；在微调与量化领域，**NVIDIA 的 NVFP4 硬件量化**以及社区主导的**无限制（Uncensored/Abliterated）微调**成为当下热点。

---

### 2. 热门模型分类精选

#### 🧠 语言模型（LLM、对话模型、指令微调）

*   [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3)
    *   **作者**: zai-org | ❤️ **点赞**: 1,788 | ⬇️ **下载**: 474,141
    *   **一句话说明**: 基于 DSA 与稀疏 MoE 架构的下一代旗舰级大语言模型，兼顾高推理性能与长文本生成。
*   [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)
    *   **作者**: openbmb | ❤️ **点赞**: 892 | ⬇️ **下载**: 2,879
    *   **一句话说明**: 面向端侧部署的 2B 极轻量高能效语言模型，端侧推理性能突出。
*   [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B)
    *   **作者**: XHToken | ❤️ **点赞**: 998 | ⬇️ **下载**: 10,661
    *   **一句话说明**: 4B 参数规模的高效文本生成模型，适合轻量级任务部署。
*   [IFM/K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B)
    *   **作者**: IFM | ❤️ **点赞**: 260 | ⬇️ **下载**: 3,205
    *   **一句话说明**: 采用 MoE 架构（总参数 36B/激活 4B）的长文本对话大模型。

#### 🎨 多模态与生成（图像、视频、语音、视觉大模型）

*   [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)
    *   **作者**: Qwen | ❤️ **点赞**: 14,515 | ⬇️ **下载**: 6,712,160
    *   **一句话说明**: 现象级开源图文多模态大模型，拥有极其强悍的跨模态理解与对话能力。
*   [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)
    *   **作者**: Qwen | ❤️ **点赞**: 5,045 | ⬇️ **下载**: 503,263
    *   **一句话说明**: 探索下一代 Qwen4 技术的实验性极速 VLM，主打低延迟与高吞吐图文交互。
*   [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)
    *   **作者**: MiniMaxAI | ❤️ **点赞**: 5,085 | ⬇️ **下载**: 4,994,268
    *   **一句话说明**: 工业级开源视频生成顶流模型，支持文本/图像到高质量动态视频的生成。
*   [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)
    *   **作者**: Lightricks | ❤️ **点赞**: 3,261 | ⬇️ **下载**: 1,644,796
    *   **一句话说明**: 全能型扩散视频生成模型，支持文生视频、图生视频及视频生视频。
*   [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)
    *   **作者**: zai-org | ❤️ **点赞**: 2,205 | ⬇️ **下载**: 826,875
    *   **一句话说明**: GLM-5.3 官方极速版，针对多模态高并发场景进行了专门优化。
*   [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp)
    *   **作者**: deepseek-ai | ❤️ **点赞**: 843 | ⬇️ **下载**: 313,547
    *   **一句话说明**: DeepSeek-V4 架构在视觉多模态领域的最新实验性极速演进版。
*   [BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2)
    *   **作者**: BreezeBlue | ❤️ **点赞**: 516 | ⬇️ **下载**: 7,243
    *   **一句话说明**: 表现力优秀的新一代文本转语音（TTS）生成模型。

#### 🔧 专用模型（时序、语音识别、向量表征）

*   [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)
    *   **作者**: google | ❤️ **点赞**: 686 | ⬇️ **下载**: 444,052
    *   **一句话说明**: 谷歌推出的时间序列预测基础模型（Foundation Model）3.0 官方 PyTorch 版本。
*   [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B)
    *   **作者**: microsoft | ❤️ **点赞**: 176 | ⬇️ **下载**: 1,449
    *   **一句话说明**: 微软开源的 7B 实时流式自动语音识别（ASR）模型。
*   [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)
    *   **作者**: sentence-transformers | ❤️ **点赞**: 5,715 | ⬇️ **下载**: 253,331,994
    *   **一句话说明**: 文本 Embedding 和向量检索领域的工业级基石模型。

#### 📦 微调与量化（社区二次开发、极极限压缩）

*   [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)
    *   **作者**: unsloth | ❤️ **点赞**: 3,777 | ⬇️ **下载**: 10,675,683
    *   **一句话说明**: Unsloth 官方打造的高性能 GGUF 量化版，千万人级下载的本地部署首选。
*   [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)
    *   **作者**: HauhauCS | ❤️ **点赞**: 1,055 | ⬇️ **下载**: 1,715,824
    *   **一句话说明**: 移除安全拒绝机制（Uncensored）并结合多标记预测（MTP）的社区爆款微调量化版。
*   [nvidia/Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4)
    *   **作者**: nvidia | ❤️ **点赞**: 178 | ⬇️ **下载**: 26,302
    *   **一句话说明**: NVIDIA 官方基于 ModelOpt 导出的 NVFP4 硬件级超低精度加速量化权重。
*   [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8)
    *   **作者**: dealignai | ❤️ **点赞**: 354 | ⬇️ **下载**: 19,433
    *   **一句话说明**: 针对网络安全攻防场景特化、移除拒绝机制（Abliterated）的 FP8 专业模型。

---

### 3. 生态信号

从今日榜单数据来看，开源 AI 生态呈现出三个极其显著的趋势：

1. **头部架构垄断与“Flash”化**：Qwen 3.8、GLM-5.3 与 DeepSeek-V4 三大头部家族占据了绝大多数热度，且官方均推出了 **Flash/Next** 极速多模态变体，表明高吞吐、低延迟的视觉-语言实时交互已成为厂商竞逐的新焦点。
2. **视频生成生态走向成熟**：MiniMax-H3（单周近 500 万下载）与 Lightricks LTX-2.5 的强劲表现，标志着开源视频模型正式迈入大规模应用阶段，围绕其展开的二创微调（如 `vdn-minimax-h3`）正在加速涌现。
3. **NVFP4 与 Uncensored 双向爆发**：硬件层面，NVIDIA 正在深度介入开源量化，推动 NVFP4 等新一代低精度格式标准化；开源社区层面，针对安全拒答进行剥离（Uncensored/Abliterated）及网络安全特化的微调版本需求极为旺盛。

---

### 4. 值得探索

*   [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)
    *   **推荐理由**: 提前预览了 Qwen4 架构迭代方向的实验性模型，极低延迟与原生多模态结合，是探索高吞吐端到端 VLM 应用的极佳标的。
*   [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)
    *   **推荐理由**: 工业级开源视频生成基础设施，性能媲美顶尖闭源服务，是搭建 AI 视频生成流水线或进行视频扩散模型研究的必备开源工具。
*   [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)
    *   **推荐理由**: 谷歌时序预测 Foundation Model 的最新迭代，为工业预测、金融量化与供应链分析提供了极其强大的预训练通用底座。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*