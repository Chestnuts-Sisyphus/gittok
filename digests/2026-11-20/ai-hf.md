# Hugging Face 热门模型日报 2026-11-20

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-20 01:31 UTC

---

# Hugging Face 热门模型日报 (2026-11-20)

## 1. 今日速览

本日 Hugging Face 生态呈现明显的**多模态爆发**与**大模型轻量化**双主线趋势。**Apple FastFrames-L** 和 **Lightricks LTX-2.5** 在视频生成领域表现抢眼，分别侧重文本生成视频的高效推理与全能视频编辑。语言模型方面，**Qwen3.8-27B** 成为绝对核心，不仅原版模型下载量突破数百万，其衍生版本（如 Unsloth GGUF、DavidAU 微调版）也占据榜单前列，显示出强大的社区生态活力。此外，**MiniMax-H3-Image** 在图像生成领域持续火热，ComfyUI 生态的支持进一步推动了其落地应用。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
    *   作者: Qwen | 点赞: 20,682 | 下载: 6,647,301
    *   说明：本榜单绝对顶流，具备多模态能力（image-text-to-text）的基础大模型，凭借极高的下载量确立了其在通用对话领域的基准地位。
*   **[harness-hub/Qwen3.8-27B-pi-adapted](https://huggingface.co/harness-hub/Qwen3.8-27B-pi-adapted)**
    *   作者: harness-hub | 点赞: 739 | 下载: 1,320
    *   说明：基于 Qwen3.8 的指令微调版本，使用 GRPO 算法优化，针对特定指令遵循任务有显著增强。
*   **[deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)**
    *   作者: deepseek-ai | 点赞: 5,982 | 下载: 502,094
    *   说明：DeepSeek 最新的 Flash 系列模型，主打高速推理，支持多模态输入，在性价比和速度上极具竞争力。
*   **[tencent/Hy4-flash](https://huggingface.co/tencent/Hy4-flash)**
    *   作者: tencent | 点赞: 346 | 下载: 2,053
    *   说明 ：腾讯混元（Hunyuan）V4 Flash 版本，轻量化的多模态对话模型，适合低延迟场景。
*   **[maxwell-model/Maxwell-V1-Flash](https://huggingface.co/maxwell-model/Maxwell-V1-Flash)**
    *   作者: maxwell-model | 点赞: 287 | 下载: 1,703
    *   说明：新一代 MoE（混合专家）架构的文本生成模型，以 Flash 命名暗示其快速推理特性。
*   **[nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)**
    *   作者: nvidia | 点赞: 621 | 下载: 172,088
    *   说明：NVIDIA 针对边缘设备优化的 4GB 显存版本 Nemotron 模型，展示了大模型在低资源环境下的落地能力。
*   **[Edge0/Edge0-145B-NVFP4](https://huggingface.co/Edge0/Edge0-145B-NVFP4)**
    *   作者: Edge0 | 点赞: 595 | 下载: 80,481
    *   说明：145B 参数的大型 MoE 模型，采用 NVFP4 量化技术，平衡了模型规模与边缘/本地推理的可行性。
*   **[sensenova/SenseNova-Loop-9B](https://huggingface.co/sensenova/SenseNova-Loop-9B)**
    *   作者: sensenova | 点赞: 389 | 下载: 1,447
    *   说明： SenseNova 系列的 9B 多模态模型，强调循环（Loop）结构，可能旨在优化长文本或迭代推理任务。
*   **[thinkingmachines/Inkling-2-Small](https://huggingface.co/thinkingmachines/Inkling-2-Small)**
    *   作者: thinkingmachines | 点赞: 584 | 下载: 37,318
    *   说明：小型多模态模型，下载量较高，显示其在轻量级视觉-语言任务中的受欢迎程度。
*   **[HuggingFaceTB/SmolVLM2-256M-Video-Instruct](https://huggingface.co/HuggingFaceTB/SmolVLM2-256M-Video-Instruct)**
    *   作者: HuggingFaceTB | 点赞: 274 | 下载: 44,604
    *   说明：极小参数量（256M）的视频指令微调模型，面向极低资源或端侧部署场景。

### 🎨 多模态与生成（图像、视频、音频、文本到X）

*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
    *   作者: Lightricks | 点赞: 12,743 | 下载: 2,934,937
    *   说明：全能视频生成模型，支持图生视频、文生视频及视频编辑，凭借高质量的单文件 diffusion 架构成为视频生成热门选手。
*   **[apple/FastFrames-L](https://huggingface.co/apple/FastFrames-L)**
    *   作者: apple | 点赞: 332 | 下载: 0
    *   说明：Apple 发布的基于 Wan2.1 微调的文本生成视频模型，强调“FastFrames”定位，可能主打高效推理或特定风格。
*   **[MiniMaxAI/MiniMax-H3-Image](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image)**
    *   作者: MiniMaxAI | 点赞: 1,647 | 下载: 821,710
    *   说明：MiniMax 最新 H3 图像生成模型，同时支持文本生图与图像编辑，极高的下载量表明其已成为图像生成的主流选择之一。
*   **[black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy)**
    *   作者: black-forest-labs | 点赞: 3,542 | 下载: 1,000,730
    *   说明：Flux 系列新版，特别针对 ComfyUI 工作流优化的单文件 diffusion 模型，极利于集成和快速部署。
*   **[facebook/sam3](https://huggingface.co/facebook/sam3)**
    *   作者: facebook | 点赞: 7,061 | 下载: 1,924,898
    *   说明：Meta 最新的 SAM3 分割模型，支持视频分割（sam3_video），在图像/视频前景提取与抠图任务上备受关注。
*   **[speridlabs/idol](https://huggingface.co/speridlabs/idol)**
    *   作者: speridlabs | 点赞: 2,525 | 下载: 37,990
    *   说明：基于高斯泼溅（Gaussian Splatting）技术的图像转 3D 模型，在高保真 3D 资产生成领域脱颖而出。
*   **[higurashi-ai/Haru-4B](https://huggingface.co/higurashi-ai/Haru-4B)**
    *   作者: higurashi-ai | 点赞: 3,645 | 下载: 6,266
    *   说明：支持全双工（Full-Duplex）的语音转语音（Speech-to-Speech）模型，在实时交互式语音 AI 领域极具创新性和话题性。
*   **[Zyphra/ZONOS3-Mini](https://huggingface.co/Zyphra/ZONOS3-Mini)**
    *   作者: Zyphra | 点赞: 583 | 下载: 128,323
    *   说明：ZONOS 系列 Mini 版本 TTS 模型，高下载量显示其在轻量级语音合成场景下的实用性。
*   **[meituan-longcat/LongCat-Video-Avatar-1.6](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6)**
    *   作者: meituan-longcat | 点赞: 335 | 下载: 1,923
    *   说明：美团 LongCat 系列的视频头像/视频生成模型，支持音频文本转视频，可能在数字人或角色动画生成方面有优势。
*   **[inworld/voice-isolator](https://huggingface.co/inworld/voice-isolator)**
    *   作者: inworld | 点赞: 266 | 下载: 0
    *   说明：专业的语音分离与增强模型，用于从混合音频中提取特定声音，服务于高品质语音交互前置处理。
*   **[n4ze3m/tiny-voca](https://huggingface.co/n4ze3m/tiny-voca)**
    *   作者: n4ze3m | 点赞: 338 | 下载: 6,368
    *   说明：极小型 TTS 模型，提供 ONNX 和 GGUF 格式，适合资源受限设备的语音合成。
*   **[briaai/RMBG-3.0](https://huggingface.co/briaai/RMBG-3.0)**
    *   作者: briaai | 点赞: 151 | 下载: 103
    *   说明：背景移除模型，性能强劲，常用于电商或创意工作流中的素材预处理。
*   **[Cactus-Compute/mirage](https://huggingface.co/Cactus-Compute/mirage)**
    *   作者: Cactus-Compute | 点赞: 498 | 下载: 43,736
    *   说明：零样本目标检测模型，能够直接从图像中检测物体，无需特定任务微调，通用性强。

### 🔧 专用模型（代码、数学、医疗、嵌入）

*   **[Reson8/Rumble-2-Flash](https://huggingface.co/Reson8/Rumble-2-Flash)**
    *   作者: Reson8 | 点赞: 165 | 下载: 929
    *   说明：基于 Qwen3 ASR 架构的自动语音识别模型，主打快速（Flash）语音转文字，适用于实时字幕或转录场景。

*(注：本期榜单中纯粹的代码专用模型、数学模型或医疗模型较少，多数模型为通用多模态或对话模型。Rumble-2-Flash 虽为 ASR，但作为专用语音处理工具列入此类。)*

### 📦 微调与量化（社区微调、GGUF、AWQ）

*   **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**
    *   作者: unsloth | 点赞: 6,236 | 下载: 7,138,192
    *   说明：Unslodht 团队发布的 Qwen3.8-27B GGUF 量化版本，下载量甚至超过原版，显示社区对高效本地部署 Qwen 模型的巨大需求。
*   **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**
    *   作者: DavidAU | 点赞: 3,405 | 下载: 1,788,170
    *   说明：社区深度微调+量化版本，融合了多种增强技术（如 NEO-CODER, MTP），主打无审查（Uncensored）和特定能力增强，深受极客用户欢迎。
*   **[huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF)**
    *   作者: huihui-ai | 点赞: 2,440 | 下载: 4,382,996
    *   说明：著名的“去审查”（Abliterated）微调版本，移除安全限制，下载量极高，反映了用户对开放、无限制本地 AI 模型的强烈需求。
*   **[chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized](https://huggingface.co/chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized)**
    *   作者: chatrlabs | 点赞: 693 | 下载: 268,540
    *   说明：Qwen-Image 模型的无审查量化版本，支持 GGUF，降低了显存门槛并提供了更少限制的内容生成能力。
*   **[Abiray/MiniMax-H3-Image-GGUF](https://huggingface.co/Abiray/MiniMax-H3-Image-GGUF)**
    *   作者: Abiray | 点赞: 415 | 下载: 247,657
    *   说明：MiniMax-H3-Image 的 GGUF 量化版本，让本地用户能更轻松地运行该图像生成模型。
*   **[Comfy-Org/MiniMax-H3-Image](https://huggingface.co/Comfy-Org/MiniMax-H3-Image)**
    *   作者: Comfy-Org | 点赞: 646 | 下载: 3,181,055
    *   说明：官方或在 ComfyUI 生态中优化的 MiniMax-H3-Image 版本，单文件 Diffusion 格式极大提升了 ComfyUI 工作流的易用性和普及率。

## 3. 生态信号

当前模型生态呈现**“Qwen 中心化”**与**“视频/音频多模态加速”**两大特征。Qwen3.8-27B 成为事实上的开源多模态基准，其围绕它建立的庞大的**GGUF 量化**和**社区微调**生态（如 Huihui、DavidAU 版本）表明，用户正从追求顶级性能转向追求**本地化、低资源、定制化**的体验。同时，视频生成（LTX-2.5, FastFrames）和全双工语音（Haru-4B）的崛起，标志着 AI 交互正从静态文本/图像向**动态、实时、沉浸式**的多模态方向演进。开源权重模型在高性能领域（如 Lightricks、MiniMax）的持续输出，进一步巩固了开源社区在生成式 AI 核心领域的地位。

## 4. 值得探索

1.  **[higurashi-ai/Haru-4B](https://huggingface.co/higurashi-ai/Haru-4B)**：作为**全双工 Speech-to-Speech** 模型，它代表了语音 AI 的最前沿方向。对于研究实时人机对话、消除语音延迟的传统 TTS+ASR 链路的开发者来说，这是极佳的参考和实验对象。
2.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：在视频生成领域，其**单文件 Diffusion** 架构和巨大的下载量证明了其在工程化落地上的优势。探索其如何在不同硬件上高效运行，以及如何与其他 ComfyUI 节点集成，对于构建视频编辑工具链极具价值。
3.  **[Edge0/Edge0-145B-NVFP4](https://huggingface.co/Edge0/Edge0-145B-NVFP4)**或**[nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)**：代表了**边缘推理**的两个极端但互补的方向。前者探索大模型通过激进的量化（NVFP4）在边缘的极限能力，后者则展示小参数模型在极低资源（4GB）下的实用性。研究这两种技术路线，有助于理解未来 AI 硬件与软件协同优化的方向。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*