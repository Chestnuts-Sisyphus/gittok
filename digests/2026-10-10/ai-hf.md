# Hugging Face 热门模型日报 2026-10-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-09 23:42 UTC

---

### 📈 Hugging Face 热门模型日报（2026-10-10）

#### 1. 今日速览
当前 Hugging Face 生态正处于大规模开源大模型密集迭代与社区繁荣交织的周期。**Qwen3.8 生态（含 27B 及 Flash-Next 系列）** 在榜单中占据统治地位，其官方权重及社区衍生模型（如 GGUF 量化、Uncensored 版本）引发了下载狂潮。与此同时，多模态与视频生成（如 Lightricks 的 LTX-2.5）以及嵌入模型（Google EmbeddingGemma-2）也表现亮眼。社区驱动的量化和去审查（Uncensored）微调依然是拉动下载量的主力。

---

#### 2. 热门模型

##### 🧠 语言模型（LLM、对话模型、指令微调）
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
    *   作者: Qwen | 点赞: 17,348 | 下载: 6,783,589
    *   **一句话说明**: Qwen 系列最新 27B 主力模型，凭借极高的综合性能和庞大的下载量霸榜全网。
*   **[Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1)**
    *   作者: Aleph-Alpha | 点赞: 842 | 下载: 8,474
    *   **一句话说明**: 采用 MoE（混合专家）架构并强化推理能力的欧洲新型大语言模型。
*   **[ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0)**
    *   作者: ConwayResearch | 点赞: 178 | 下载: 15,274
    *   **一句话说明**: 专注于 2-bit 量化和强大工具/函数调用能力（Tool-calling）的轻量化社区模型。

##### 🎨 多模态与生成（图像、视频、音频、文本到X）
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
    *   作者: Lightricks | 点赞: 7,063 | 下载: 1,687,531
    *   **一句话说明**: 顶尖的视频生成与编辑模型，支持图生视频、文生视频等多模态管线，备受创作者青睐。
*   **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)**
    *   作者: Qwen | 点赞: 6,059 | 下载: 1,751,752
    *   **一句话说明**: Qwen 推出的面向高吞吐、低延迟的图文多模态（Image-text-to-text）极速大模型。
*   **[Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1)**
    *   作者: Qwen | 点赞: 3,157 | 下载: 122,311
    *   **一句话说明**: 阿里通义团队推出的新一代文生图与图像编辑模型，原生支持高质量图像生成。
*   **[Cloudflare/clef](https://huggingface.co/Cloudflare/clef)**
    *   作者: Cloudflare | 点赞: 1,942 | 下载: 12,066
    *   **一句话说明**: 基于 Qwen3.5 架构深度定制的边缘端图文多模态交互模型。
*   **[Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap)**
    *   作者: Alissonerdx | 点赞: 1,338 | 下载: 245,270
    *   **一句话说明**: 结合 Qwen-Image 生态的高效换脸与图像编辑 LoRA 模型。

##### 🔧 专用模型（代码、数学、医疗、嵌入）
*   **[google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2)**
    *   作者: google | 点赞: 1,343 | 下载: 29,185
    *   **一句话说明**: Google 推出的全新 EmbeddingGemma-2 特征提取与多模态嵌入模型，树立了轻量检索新标杆。
*   **[convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya)**
    *   作者: convaiinnovations | 点赞: 5,425 | 下载: 41,468
    *   **一句话说明**: 采用 System-one 校准决策机制的文本分类与决策支持专用模型。

##### 📦 微调与量化（社区微调、GGUF、AWQ）
*   **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**
    *   作者: unsloth | 点赞: 4,978 | 下载: 6,452,782
    *   **一句话说明**: Unsloth 针对 Qwen3.8-27B 推出的高效 GGUF 量化版本，下载量巨大，是本地部署首选。
*   **[abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF)**
    *   作者: abenzerps | 点赞: 3,766 | 下载: 2,013,268
    *   **一句话说明**: 社区对 Qwen-Image-2.1 进行去审查（Uncensored）并打包为 GGUF 的高人气图像生成模型。
*   **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**
    *   作者: prism-ml | 点赞: 2,568 | 下载: 4,389,072
    *   **一句话说明**: 采用极端三进制（Ternary/2-bit）量化技术的 27B 大模型，极大降低了本地硬件运行门槛。
*   **[ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)**
    *   作者: ISTA-DASLab | 点赞: 2,097 | 下载: 1,490,741
    *   **一句话说明**: 引入 GSQ 和 RCO 混合精度量化算法的高级 Qwen3.8 社区优化版。

---

#### 3. 生态信号
当前开源生态呈现出 **“大模型官方底座定基调，社区量化/去审查生态唱主角”** 的鲜明格局。**Qwen 家族**在多模态与 LLM 双线爆发，其生态衍生能力极强，Unsloth、ISTA-DASLab 等社区团队通过 GGUF、混合精度量化（GSQ-RCO）和去审查（Abliterated/Uncensored）技术，使大模型在消费级显卡上的落地变得空前繁荣。同时，视频生成（LTX-2.5）和尖端嵌入（EmbeddingGemma-2）显示出多模态与检索技术的持续深化。

---

#### 4. 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：*理由*：视频生成领域的最新力作，适合多模态创作者和研究视频生成扩散模型的工程师深入体验。
2.  **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** 搭配 **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**：*理由*：兼顾了顶尖的学术/工业性能与消费级硬件的可用性，是目前本地私有化部署和复杂任务微调的最佳试验田。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*