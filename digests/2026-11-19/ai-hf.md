# Hugging Face 热门模型日报 2026-11-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-19 01:34 UTC

---

# Hugging Face 热门模型日报 (2026-11-19)

### 1. 今日速览
本周 Hugging Face 生态呈现“轻量化与多模态”齐头并进的态势，**Qwen3.8-27B** 系列成为社区微调与量化的绝对核心，占据了大部分热门榜单。多模态领域表现抢眼，特别是视频处理（如 **LTX-2.5**）和图像交互模型受到广泛追捧。此外，量化模型（GGUF）在社区的应用极其活跃，显示出开发者对本地化运行强大模型的高需求。

---

### 2. 热门模型

#### 🧠 语言模型
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
    *   作者：Qwen | 点赞：20,559 | 下载：6,888,351
    *   说明：当前开源界最顶尖的大模型之一，凭借强大的推理能力成为众多微调项目的基石。
*   **[deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)**
    *   作者：deepseek-ai | 点赞：5,915 | 下载：492,972
    *   说明：DeepSeek 推出的高效 Flash 版本，因兼顾速度与性能而备受关注。
*   **[NousResearch/Arete-27B](https://huggingface.co/NousResearch/Arete-27B)**
    *   作者：NousResearch | 点赞：711 | 下载：12,167
    *   说明：基于 Qwen3.8 架构的精调模型，展现了 Nous 在指令微调方面的一贯高水准。

#### 🎨 多模态与生成
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
    *   作者：Lightricks | 点赞：12,562 | 下载：2,871,190
    *   说明：引领本周视频生成的顶流模型，凭借高质量的图像转视频能力，下载量激增。
*   **[facebook/sam3](https://huggingface.co/facebook/sam3)**
    *   作者：facebook | 点赞：6,968 | 下载：1,955,213
    *   说明：Meta 发布的最新分割模型，引入了强大的视频语义分割功能。
*   **[MiniMaxAI/MiniMax-H3-Image](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image)**
    *   作者：MiniMaxAI | 点赞：1,580 | 下载：759,661
    *   说明：MiniMax 推出的高性能多模态图像生成引擎，支持复杂的图像编辑任务。

#### 🔧 专用模型
*   **[higurashi-ai/Haru-4B](https://huggingface.co/higurashi-ai/Haru-4B)**
    *   作者：higurashi-ai | 点赞：687 | 下载：5,314
    *   说明：全双工语音转语音模型，为实时交互应用提供了极佳的开源选择。
*   **[briaai/RMBG-3.0](https://huggingface.co/briaai/RMBG-3.0)**
    *   作者：briaai | 点赞：101 | 下载：42
    *   说明：专注于高精度背景去除的专用模型，在图像处理管线中表现优异。

#### 📦 微调与量化
*   **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**
    *   作者：unsloth | 点赞：6,187 | 下载：6,998,076
    *   说明：通过 Unsloth 技术量化的 Qwen，使得高端模型在消费级显卡上运行成为可能。
*   **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**
    *   作者：DavidAU | 点赞：3,352 | 下载：1,773,418
    *   说明：社区驱动的“炼金术”版本，展示了极端定制化微调在开源社区的旺盛生命力。

---

### 3. 生态信号
本周数据显示 **Qwen 家族** 已稳固占据开源大模型的核心地位，几乎成为所有微调项目的“底层代码”。**GGUF 格式** 的统治力进一步增强，说明开发者对“将模型部署在本地硬件”的需求已达到顶峰，尤其是 Unsloth 提供的量化版本，极大地降低了高性能模型的使用门槛。在多模态领域，从单纯的“文生图”向“视频交互”和“全双工音频处理”转变的趋势明显。开源社区正通过快速的社区化微调（如各类 Uncensored 和 Turbo 版本）与实验室发布的基座模型形成强大的互补。

---

### 4. 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：如果你关注 AI 视频生成，这是当前最值得研究的技术栈之一，其效果已接近商业级水准。
2.  **[facebook/sam3](https://huggingface.co/facebook/sam3)**：计算机视觉领域的重要更新，对于需要进行视频分析或精细图像处理的开发者来说，这是不可错过的工具。
3.  **[higurashi-ai/Haru-4B](https://huggingface.co/higurashi-ai/Haru-4B)**：如果你在构建实时语音助手，这款全双工语音模型展示了未来交互界面的方向。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*