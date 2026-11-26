# Hugging Face 热门模型日报 2026-11-26

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-26 02:33 UTC

---

作为 AI 模型生态分析师，为您带来 **2026-11-26 Hugging Face Hub 热门模型日报**：

---

### 1. 今日速览

今日 Hugging Face 趋势榜呈现出**多模态融合与轻量化量化生态高度活跃**的态势。Qwen3.8-27B 及其衍生模型生态（如 DavidAU 的超级微调和 GGUF 版本）统治了文本与多模态下载榜，吸引了极高的社区关注度。同时，诸如 Lightricks 的 LTX-2.5 视频生成模型以及 Apple 的 DepthPro2 在视觉领域表现抢眼，显示出开源社区在视频生成和 3D/深度感知方面正迎来爆发期。此外，以 Inkling-2-Mini 和 MiniMax-H3（Sulphur-3）为代表的新架构在轻量化和特定任务微调上热度不减。

---

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型、指令微调）
*   **[SulphurAI/Sulphur-3](https://huggingface.co/SulphurAI/Sulphur-3)**
    *   作者: SulphurAI | 点赞: 1,089 | 下载: 189,735
    *   **一句话说明**: 基于 MiniMax-H3 底座构建的基础模型，凭借出色的基础能力和大规模下载量在社区迅速走红。
*   **[inclusionAI/LingSante-3.1-flash](https://huggingface.co/inclusionAI/LingSante-3.1-flash)**
    *   作者: inclusionAI | 点赞: 192 | 下载: 1,487
    *   **一句话说明**: 采用混合架构（bailing_hybrid）的轻量级对话模型，主打低延迟与高效的文本生成。
*   **[Aleph-Alpha/Kolibri-1.1](https://huggingface.co/Aleph-Alpha/Kolibri-1.1)**
    *   作者: Aleph-Alpha | 点赞: 156 | 下载: 837
    *   **一句话说明**: 欧洲厂商推出的 MoE 推理模型，针对 vLLM 进行了优化，展现了强大的长链条推理能力。
*   **[baidu/ERNIE-5.5-Flash-Preview](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview)**
    *   作者: baidu | 点赞: 307 | 下载: 1,193
    *   **一句话说明**: 百度文心大模型 5.5 的 Flash 预览版，引入 MoE 架构，代表了国内大厂在高效推理上的最新探索。

#### 🎨 多模态与生成（图像、视频、音频、文本到X）
*   **[thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)**
    *   作者: thinkingmachines | 点赞: 6,044 | 下载: 96,527
    *   **一句话说明**: 热门多模态循环架构模型，兼具对话与图像文本处理能力，是近期社区生态的核心聚焦点。
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
    *   作者: Lightricks | 点赞: 13,447 | 下载: 3,041,405
    *   **一句话说明**: 霸榜级的视频生成模型，支持单文件扩散架构，凭借惊人的下载量成为当前开源视频创作的首选。
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
    *   作者: Qwen | 点赞: 21,802 | 下载: 6,047,011
    *   **一句话说明**: 阿里云通义千问重磅多模态旗舰，凭借断层领先的点赞和下载数统治全网生态。
*   **[apple/DepthPro2](https://huggingface.co/apple/DepthPro2)**
    *   作者: apple | 点赞: 1,254 | 下载: 0
    *   **一句话说明**: 苹果推出的全新单目深度估计与度量深度模型，大幅提升了视频与图像的 3D 空间感知精度。
*   **[inworld/voice-isolator](https://huggingface.co/inworld/voice-isolator)**
    *   作者: inworld | 点赞: 897 | 下载: 15,244
    *   **一句话说明**: 专注于语音增强与降噪的音频到音频模型，满足高质量语音隔离的工业级需求。
*   **[apple/FastFrames-L](https://huggingface.co/apple/FastFrames-L)**
    *   作者: apple | 点赞: 631 | 下载: 0
    *   **一句话说明**: 基于 Wan2.1-T2V-14B 微调的高效文生视频模型，展示了苹果在生成式视频加速上的技术成果。

#### 🔧 专用模型（代码、数学、医疗、嵌入）
*   **[llamaindex/OCRia-nano-1](https://huggingface.co/llamaindex/OCRia-nano-1)**
    *   作者: llamaindex | 点赞: 234 | 下载: 126
    *   **一句话说明**: 专为 PDF 与 Markdown 解析打造的轻量级 ONNX OCR 模型，极大地赋能了 RAG（检索增强生成）数据处理。
*   **[facebook/sam-3d-body-dinov3](https://huggingface.co/facebook/sam-3d-body-dinov3)**
    *   作者: facebook | 点赞: 2,002 | 下载: 20,983
    *   **一句话说明**: Meta 结合 DINOv3 推出的 3D 人体网格恢复与姿态估计模型，推动了计算机视觉在三维重建领域的发展。

#### 📦 微调与量化（社区微调、GGUF、AWQ）
*   **[unsloth/Inkling-2-Mini-GGUF](https://huggingface.co/unsloth/Inkling-2-Mini-GGUF)**
    *   作者: unsloth | 点赞: 1,380 | 下载: 2,445,633
    *   **一句话说明**: Unsloth 高效量化的 Inkling-2-Mini，凭借极低的显存开销实现了超百万次的惊人下载量。
*   **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**
    *   作者: DavidAU | 点赞: 4,376 | 下载: 1,873,950
    *   **一句话说明**: 社区硬核整合与解限版 Qwen 巨大体量 GGUF 模型，集成了多重微调与 MTP 加速，极受本地部署极客欢迎。
*   **[prism-ml/Ternary-Bonsai-2.5-27B-GGUF](https://huggingface.co/prism-ml/Ternary-Bonsai-2.5-27B-GGUF)**
    *   作者: prism-ml | 点赞: 346 | 下载: 59,366
    *   **一句话说明**: 采用罕见且极端的 2-bit 三进制量化（Ternary）技术，大幅压缩大模型体积，探索消费级硬件运行大模型极限。

---

### 3. 生态信号

当前开源生态呈现出 **Qwen 家族与新型循环/多模态架构（如 Inkling-2）双核驱动** 的格局。Qwen3.8-27B 衍生出了庞大的下游量化、解限与对齐微调生态（如 DavidAU、Nari-labs 的贡献），证明其基座实力已可媲美主流闭源模型。同时，以 Unsloth 和 llama.cpp/GGUF 为代表的量化社区依然是推动模型走向消费级终端普及的核心引擎。多模态与生成式视频（LTX-2.5、FastFrames-L）的繁荣，标志着开源社区正全面从纯文本向复杂的多模态感知与高保真生成演进。

---

### 4. 值得探索

1.  **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：新一代开源大模型的中流砥柱，多模态与长文本能力极其全面，适合作为企业级私有化部署和复杂任务微调的首选基座。
2.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：当前最火爆的开源视频生成方案，对于从事数字人、AIGC 视频创作和多模态应用开发的开发者来说极具研究与生产价值。
3.  **[apple/DepthPro2](https://huggingface.co/apple/DepthPro2)**：苹果在计算机视觉和单目深度估计上的力作，对于探索 AR/VR、3D 空间重建以及具身智能视觉感知的研究人员不容错过。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*