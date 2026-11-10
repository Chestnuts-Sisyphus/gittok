# Hugging Face 热门模型日报 2026-11-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-10 02:27 UTC

---

### 📊 Hugging Face 热门模型日报 (2026-11-10)

---

### 1. 今日速览

今日 Hugging Face 趋势榜展现出强劲的多模态、长文本与端侧优化生态，**Qwen3.5/3.8 系列**与**DeepSeek-V4/V4.1 系列**继续展现绝对的统治力，衍生出大量 GGUF 量化和去和谐（Uncensored）版本。同时，多模态与视频生成领域迎来爆发，`Lightricks/LTX-2.5` 与 Meta 的 `sam3` 凭借惊人的下载量和点赞数成为焦点。开源社区在 3D 生成、代码辅助以及多模态量化方向展现出极高的活跃度。

---

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型、指令微调）
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
    *   作者: Qwen | 点赞: 19,490 | 下载: 7,508,158
    *   **一句话说明**：Qwen 官方的旗舰级图文多模态与对话大模型，凭借数百万下载量和极高点赞稳居榜首，生态基础深厚。
*   **[moonshotai/Kimi-K3.1-Pro](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)**
    *   作者: moonshotai | 点赞: 1,800 | 下载: 27,926
    *   **一句话说明**：月之暗面推出的 Kimi K3.1 增强版，在长文本理解和复杂推理任务上表现优异，备受开发者瞩目。
*   **[NousResearch/Arete-27B](https://huggingface.co/NousResearch/Arete-27B)**
    *   作者: NousResearch | 点赞: 366 | 下载: 2,407
    *   **一句话说明**：基于 Qwen 底座由 NousResearch 精心微调的监督微调模型，主打卓越的指令遵循与对话能力。
*   **[baidu/ERNIE-5.5-Flash-Base](https://huggingface.co/ERNIE-5.5-Flash-Base)**（列表中为 `baidu/ERNIE-5.5-Flash-Base`）
    *   作者: baidu | 点赞: 239 | 下载: 1,699
    *   **一句话说明**：百度推出的新一代轻量化 MoE 基础架构模型，兼顾推理速度与生成性能。
*   **[LiquidAI/LFM3-1.7B](https://huggingface.co/LiquidAI/LFM3-1.7B)**
    *   作者: LiquidAI | 点赞: 1,574 | 下载: 78,750
    *   **一句话说明**：采用全新液态神经网络架构的小参数模型，在极低资源消耗下提供出色的文本生成能力。

#### 🎨 多模态与生成（图像、视频、音频、文本到X）
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
    *   作者: Lightricks | 点赞: 11,270 | 下载: 2,720,096
    *   **一句话说明**：现象级的开源图生视频/文生视频扩散模型，凭借极高的视频质量与庞大下载量统治多模态榜单。
*   **[facebook/sam3](https://huggingface.co/facebook/sam3)**
    *   作者: facebook | 点赞: 6,183 | 下载: 2,004,798
    *   **一句话说明**：Meta 发布的 Segment Anything Model 第三代，带来更强大的视频掩码生成与特征提取能力。
*   **[speridlabs/idol](https://huggingface.co/speridlabs/idol)**
    *   作者: speridlabs | 点赞: 1,642 | 下载: 24,747
    *   **一句话说明**：结合 Gaussian Splatting 技术的尖端图生 3D 模型，正在重塑三维资产创作工作流。
*   **[black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy)**
    *   作者: black-forest-labs | 点赞: 2,826 | 下载: 1,203,472
    *   **一句话说明**：Black Forest Labs 针对 ComfyUI 优化的 Flux-3 图像生成与编辑模型，深受艺术创作者喜爱。
*   **[nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B)**
    *   作者: nvidia | 点赞: 3,125 | 下载: 69,992
    *   **一句话说明**：英伟达推出的 30B 级语音识别与语音转文本大模型，拥有企业级的转录准确率。
*   **[Pika-Labs/Pika-H3-Flex](https://huggingface.co/Pika-Labs/Pika-H3-Flex)**
    *   作者: Pika-Labs | 点赞: 528 | 下载: 1,083
    *   **一句话说明**：Pika 实验室推出的音视频联合生成扩散模型，支持灵活的创意视频拓展。
*   **[deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)**
    *   作者: deepseek-ai | 点赞: 5,436 | 下载: 312,293
    *   **一句话说明**：深度求索推出的 DeepSeek-V4.1 Flash 版本，兼顾图文理解与极速文本生成。

#### 🔧 专用模型（代码、数学、医疗、嵌入）
*   **[ccore/Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder)**
    *   作者: ccore | 点赞: 954 | 下载: 289,466
    *   **一句话说明**：基于 Qwen3.5 微调的专用 3D 编程与 Three.js 代码生成模型，在开发者群体中下载火爆。
*   **[ccore/Qwen3.5-4B-GLB-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-GLB-3D-Coder)**
    *   作者: ccore | 点赞: 288 | 下载: 38,696
    *   **一句话说明**：专注于 GLB 格式 3D 场景与代码生成的轻量级助手。

#### 📦 微调与量化（社区微调、GGUF、AWQ）
*   **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**
    *   作者: DavidAU | 点赞: 2,782 | 下载: 1,530,688
    *   **一句话说明**：社区深度整合的超级缝合去和谐版 GGUF 模型，下载量突破百万，展现了极端的个人玩乐与本地部署热情。
*   **[xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic](https://huggingface.co/xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic)**
    *   作者: xtools-at | 点赞: 1,055 | 下载: 11,755
    *   **一句话说明**：融合 DeepSeek 与 Qwen 特性的 9B 去和谐模型，适合本地硬件运行。
*   **[unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF)**
    *   作者: unsloth | 点赞: 1,554 | 下载: 1,694,090
    *   **一句话说明**：Unsloth 针对 Qwen3.8 Flash 进行了极致优化的 GGUF 量化版本，本地推理速度极快。
*   **[PrunaAI/P-H3-Image-Comfy](https://huggingface.co/PrunaAI/P-H3-Image-Comfy)**
    *   作者: PrunaAI | 点赞: 265 | 下载: 704,467
    *   **一句话说明**：PrunaAI 压缩优化的图像生成模型，完美适配 ComfyUI 工作流。
*   **[Scantist/GLM-5.3-SLIM-GGUF](https://huggingface.co/Scantist/GLM-5.3-SLIM-GGUF)**
    *   作者: Scantist | 点赞: 1,295 | 下载: 7,884
    *   **一句话说明**：基于智谱 GLM-5 架构的轻量化 MoE 量化版本。
*   **[mradermacher/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic-i1-GGUF](https://huggingface.co/mradermacher/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic-i1-GGUF)**
    *   作者: mradermacher | 点赞: 213 | 下载: 217,408
    *   **一句话说明**：mradermacher 提供的多格式兼容 i1 GGUF 量化版本。
*   **[AtomicChat/DeepSeek-V4.1-Flash-1017-Uncensored-GSQ-RCO-GGUF](https://huggingface.co/AtomicChat/DeepSeek-V4.1-Flash-1017-Uncensored-GSQ-RCO-GGUF)**
    *   作者: AtomicChat | 点赞: 405 | 下载: 137,288
    *   **一句话说明**：DeepSeek-V4.1 的去和谐化及高级量化版本，主打高吞吐与私有化聊天体验。
*   **[SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF](https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF)**
    *   作者: SC117 | 点赞: 813 | 下载: 4,215,003
    *   **一句话说明**：下载量突破 400 万的消融（abliterated）去和谐 Qwen 量化模型，社区热度极高。
*   **[abenzerps/Qwen-Image-2.1-Turbo-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Turbo-Quantized)**
    *   作者: abenzerps | 点赞: 5,751 | 下载: 89,977
    *   **一句话说明**：Qwen-Image 2.1 极速生成模型的量化版本，支持 ComfyUI 快速出图。
*   **[autotrust/Qwen3.8-Flash-Next-E384-FP4-V2](https://huggingface.co/autotrust/Qwen3.8-Flash-Next-E384-FP4-V2)**
    *   作者: autotrust | 点赞: 2,373 | 下载: 46,017
    *   **一句话说明**：针对 vLLM 优化的 FP4 低精度 MoE 部署版本，大幅降低大模型显存门槛。

---

### 3. 生态信号

当前开源大模型生态呈现出三大核心趋势：
1. **模型家族高度集中**：Qwen（3.5/3.8 系列）与 DeepSeek（V4/V4.1 系列）占据了开源社区统治地位，衍生出大量微调、混合架构与跨界组合模型。
2. **本地化与量化狂热**：GGUF、FP4 以及各类 "Abliterated（去和谐）" 量化版本（如 DavidAU、SC117 的作品）下载量惊人，反映出终端用户对本地隐私保护、免审查及消费级显卡部署的强烈需求。
3. **多模态向纵深发展**：从文本、图像拓展至视频（LTX-2.5）、3D（idol）及专业代码生成（3D-Coder），生成式 AI 正在全面进军三维与多媒体设计领域。

---

### 4. 值得探索

*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：体验目前开源界最顶尖的视频生成效果，适合探索下一代多模态 AIGC 创作。
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为当前最强图文多模态开源基座之一，非常适合进行企业级微调或复杂推理验证。
*   **[speridlabs/idol](https://huggingface.co/speridlabs/idol)**：结合 Gaussian Splatting 的前沿图像转 3D 工具，对元宇宙和游戏资产开发者具有极高的研究价值。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*