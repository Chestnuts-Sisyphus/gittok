# Hugging Face 热门模型日报 2026-11-28

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-28 02:22 UTC

---

# Hugging Face 热门模型日报 (2026-11-28)

## 1. 今日速览
本周 Hugging Face 生态呈现出**“多模态全阵营爆发”**与**“极量化社区活跃”**的双重特征。
**Thinking Machines 推出的 Inkling-2-Mini** 成为绝对黑马，不仅原版模型备受追捧（6,474 点赞），其 GGUF、未审查版及特殊量化版在 30 强中占据了 **6 个席位**，显示出极强的衍生能力。
同时，**Qwen3.8-27B** 继续维持统治级地位，以 21,935 点赞和 575 万下载量领跑，且社区对其进行的各种微调（如 NEC-CODER-MAX、STRATA）非常活跃。
此外，**Lightricks LTX-2.5** 和 **Facebook SAM3** 在视频生成与视觉分割领域刷新了社区热度，表明视频与底层视觉基础模型依然是当前研发的重心。

## 2. 热门模型

### 🧠 语言模型 (LLM, Chat, Instruction)
*   **Qwen/Qwen3.8-27B**
    *   链接: [https://huggingface.co/Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)
    *   作者: Qwen | 点赞: 21,935 | 下载: 5,752,506
    *   说明: 本周点赞与下载量双冠王，Qwen 家族的旗舰级多模态/通用基座，生态极其成熟，是目前本地部署与微调的首选基座之一。
*   **deepseek-ai/DeepSeek-V4.1-Flash-1017**
    *   链接: [https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)
    *   作者: deepseek-ai | 点赞: 6,819 | 下载: 552,671
    *   说明: DeepSeek 最新迭代版本，主打高速推理（Flash），支持 image-text-to-text，在兼顾性能与速度上表现优异，社区关注度极高。
*   **baidu/ERNIE-5.5-Flash-Preview**
    *   链接: [https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview)
    *   作者: baidu | 点赞: 392 | 下载: 2,609
    *   说明: 百度文心 ERNIE 5.5 的预览版，采用 MoE 架构，旨在提升长文本与复杂指令遵循能力，是国产模型在开源生态中的重要一员。
*   **ai-sage/GigaChat4-708B-A41B**
    *   链接: [https://huggingface.co/ai-sage/GigaChat4-708B-A41B](https://huggingface.co/ai-sage/GigaChat4-708B-A41B)
    *   作者: ai-sage | 点赞: 116 | 下载: 287
    *   说明: 俄罗斯 Sber 银行的 GigaChat 4 超大 MoE 模型，总参数量 708B，激活 41B，虽下载量尚少，但代表了超大规模开源模型的持续探索。

### 🎨 多模态与生成 (Image, Video, Audio, T2X)
*   **thinkingmachines/Inkling-2-Mini**
    *   链接: [https://huggingface.co/thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)
    *   作者: thinkingmachines | 点赞: 6,474 | 下载: 155,741
    *   说明: 本周最大黑马，一款轻量级多模态模型（image-text-to-text），因其优异的小模型性能和丰富的社区衍生版本（见📦分类）而引发热潮。
*   **Lightricks/LTX-2.5**
    *   链接: [https://huggingface.co/Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)
    *   作者: Lightricks | 点赞: 13,731 | 下载: 3,080,701
    *   说明: 视频生成领域的顶流，支持图生视频、文生视频，以极高的生成质量和速度著称，下载量突破 300 万，是目前视频生成工作流的核心。
*   **facebook/sam3**
    *   链接: [https://huggingface.co/facebook/sam3](https://huggingface.co/facebook/sam3)
    *   作者: facebook | 点赞: 8,376 | 下载: 1,728,572
    *   说明: Meta 最新的 Segment Anything Model (SAM3)，在保留分割能力的同时增强了视频分割与特征提取能力，是视觉基础模型的基石。
*   **black-forest-labs/flux-3-image-klein-comfy**
    *   链接: [https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy)
    *   作者: black-forest-labs | 点赞: 4,778 | 下载: 842,966
    *   说明: Flux 3 系列的 ComfyUI 专用版本，针对工作流优化，是当前图像编辑与生成工作流中最标准化的模型之一。
*   **Lightricks/LTX-2.5** & **Lakonik/pi-H3** (补充视频类)
    *   说明: 除 LTX-2.5 外，Sand AI 的 MAGI-2 和 Lakonik 的 pi-H3 也进入了榜单，显示视频生成（尤其是多模态输入控制视频输出）是仅次于 LLM 的热门赛道。
*   **inworld/voice-isolator**
    *   链接: [https://huggingface.co/inworld/voice-isolator](https://huggingface.co/inworld/voice-isolator)
    *   作者: inworld | 点赞: 1,015 | 下载: 20,510
    *   说明: 专注于音频处理，主要用于语音增强与降噪，在实时语音交互（Agent）场景下具有极高应用价值。
*   **apple/DepthPro2**
    *   链接: [https://huggingface.co/apple/DepthPro2](https://huggingface.co/apple/DepthPro2)
    *   作者: apple | 点赞: 1,363 | 下载: 0
    *   说明: Apple 最新的单目深度估计模型，支持视频深度，虽然下载量为 0（可能刚发布或限制下载），但点赞数极高，预示其在 3D 重建与 AR 领域的潜力。

### 🔧 专用模型 (Code, Math, Medical, Embedding)
*   *注：本周榜单中纯代码/数学/医疗模型较少，多数被通用 LLM 或多模态模型占据。以下模型具有特定领域属性：*
*   **llamaindex/OCRia-nano-1**
    *   链接: [https://huggingface.co/llamaindex/OCRia-nano-1](https://huggingface.co/llamaindex/OCRia-nano-1)
    *   作者: llamaindex | 点赞: 358 | 下载: 626
    *   说明: 专为 RAG（检索增强生成）管道优化的轻量级 OCR 模型，支持 ONNX 格式，可从 PDF/图像高效提取 Markdown 格式文本。
*   **kandinskylab/Kandinsky-ImageSR-2.0**
    *   链接: [https://huggingface.co/kandinskylab/Kandinsky-ImageSR-2.0](https://huggingface.co/kandinskylab/Kandinsky-ImageSR-2.0)
    *   作者: kandinskylab | 点赞: 195 | 下载: 582
    *   说明: 图像超分辨率专用模型，用于提升生成图像或实拍图像的清晰度与细节，是图像后处理工作流的关键组件。

### 📦 微调与量化 (Community Fine-tunes, GGUF, AWQ)
*   *注：Inkling-2-Mini 和 Qwen3.8-27B 的社区衍生版本在此集中体现。*
*   **unsloth/Inkling-2-Mini-GGUF**
    *   链接: [https://huggingface.co/unsloth/Inkling-2-Mini-GGUF](https://huggingface.co/unsloth/Inkling-2-Mini-GGUF)
    *   作者: unsloth | 点赞: 1,615 | 下载: 3,302,340
    *   说明: Unsloth 团队发布的 Inkling-2-Mini 量化版，下载量高达 330 万，证明了该小模型在本地边缘设备上的巨大需求。
*   **DavidAU/Qwen3.8-27B-TURBO...Uncensored...NEO-CODER-MAX...GGUF**
    *   链接: [https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)
    *   作者: DavidAU | 点赞: 4,474 | 下载: 1,919,755
    *   说明: 基于 Qwen3.8 的“怪物级”社区微调，融合了 Turbo、NEO-CODER 等特性，主打编码与未审查能力，命名极具社区风格，下载量近 192 万。
*   **AtomicChat/Inkling-2-Mini-Uncensored-GGUF**
    *   链接: [https://huggingface.co/AtomicChat/Inkling-2-Mini-Uncensored-GGUF](https://huggingface.co/AtomicChat/Inkling-2-Mini-Uncensored-GGUF)
    *   作者: AtomicChat | 点赞: 1,040 | 下载: 1,059,763
    *   说明: Inkling-2-Mini 的未审查量化版，进一步印证了该模型在“去限制”社区的流行度。
*   **strata-engine/Inkling-2-Mini-Strata**
    *   链接: [https://huggingface.co/strata-engine/Inkling-2-Mini-Strata](https://huggingface.co/strata-engine/Inkling-2-Mini-Strata)
    *   作者: strata-engine | 点赞: 305 | 下载: 4,532
    *   说明: 针对特定架构或部署环境优化的 Inkling-2-Mini 变体，展示了社区对该模型架构的深入适配能力。
*   **nari-labs/Qwen3.8-27B-NariQ-GGUF**
    *   链接: [https://huggingface.co/nari-labs/Qwen3.8-27B-NariQ-GGUF](https://huggingface.co/nari-labs/Qwen3.8-27B-NariQ-GGUF)
    *   作者: nari-labs | 点赞: 254 | 下载: 30,849
    *   说明: 专为 Coding Agent 场景优化的 Qwen3.8 量化版，体现了垂直场景微调的趋势。
*   **prism-ml/Ternary-Bonsai-2.5-27B-GGUF**
    *   链接: [https://huggingface.co/prism-ml/Ternary-Bonsai-2.5-27B-GGUF](https://huggingface.co/prism-ml/Ternary-Bonsai-2.5-27B-GGUF)
    *   作者: prism-ml | 点赞: 639 | 下载: 382,546
    *   说明: 采用 2-bit 三值（Ternary）量化的 27B 模型，对于极致资源受限环境下的推理具有参考价值。

## 3. 生态信号

**1. “小模型大生态”现象明显：**
Thinking Machines 的 **Inkling-2-Mini** 是本周最显著的信号。一款 Mini 级别的模型不仅原版高赞，更在 30 强衍生出 6 个不同版本的量化/微调变体（Unsloth, AtomicChat, NariQ, Strata 等）。这表明社区对**低显存、高速度、可本地化**的多模态模型需求爆发，且基座模型的可塑性极强。

**2. Qwen 家族的“霸主”地位与挑战：**
**Qwen3.8-27B** 仍是无可争议的头牌，但其热度很大程度上依赖于极其活跃的社区微调（如 DavidAU 的 NE-CODER-MAX 版本下载量巨大）。这反映出官方基座提供通用能力，而**垂直场景（编码、未审查、特定 Agent 逻辑）的差异化体验**主要由社区通过 PEFT/LORA 和量化来实现。

**3. 视频与视觉基础模型并重：**
**LTX-2.5** (视频) 和 **SAM3** (分割) 的高下载量表明，纯文本 LLM 的增长红利可能见顶，**具身智能、视频生成和底层视觉理解**成为大厂（Lightricks, Meta, Apple）和开源社区共同追逐的新高地。

**4. 开源权重主导，但“未审查”需求旺盛：**
榜单中大量出现 "Uncensored" (未审查) 标签（AtomicChat, DavidAU, chatrlabs）。在日益严格的内容安全政策下，开源社区对**边界探索、创意写作和自由对话**的需求正在通过特定微调版本找到出口，这是一种独特的生态分层。

## 4. 值得探索

1.  **thinkingmachines/Inkling-2-Mini (UGGUF-Unsloth)**
    *   **理由**: 如果你想在单张消费级显卡（甚至 8GB 显存）上体验高质量的多模态对话，这是目前最佳选择之一。结合 Unsloth 的量化技术，它能以极低的成本提供惊艳的图像理解能力，适合快速原型开发和本地 Agent 构建。

2.  **Lightricks/LTX-2.5**
    *   **理由**: 视频生成领域的 SOTA 水平。对于从事 AIGC 视频内容创作、故事板生成或视频编辑工具开发的团队，LTX-2.5 的生成速度和一致性（Consistency）使其成为工作流中不可替代的一环。建议尝试其 ComfyUI 或 Diffusers 集成。

3.  **DavidAU/Qwen3.8-27B-...-NEO-CODER-MAX...-GGUF**
    *   **理由**: 对于专注后端编程、代码补全或构建自主 Coding Agent 的开发者，这个社区微调版本值得深入测试。它基于强大的 Qwen 基座，针对编码场景进行了“Turbo”和“Coder”特性的深度优化，可能在特定编程任务中超越官方原版。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*