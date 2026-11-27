# Hugging Face 热门模型日报 2026-11-27

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-27 02:33 UTC

---

# Hugging Face 热门模型日报 (2026-11-27)

## 今日速览
**Qwen3.8-27B** 以压倒性的下载次数和点赞数霸榜，确立其在开源多模态 LLM 领域的统治地位，其衍生的社区微调版本（如 DavidAU 的 Uncensored 版）同样表现强劲。**Lightricks/LTX-2.5** 在视频生成领域引发关注，展示了单文件扩散模型在 image-to-video 任务上的高效性。**Thinking Machines 的 Inkling-2-Mini** 系列（含官方及社区 GGUF 量化版）成为本周多模态小模型的首选，显示出 MoE 架构在端侧部署的巨大潜力。此外，AI 语音交互（Inworld, Higurashi）和 3D 感知（Apple, Meta）模型持续升温，表明多模态并未局限于图文，正快速向实时语音与空间智能扩展。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
    *   作者：Qwen | 点赞：21,870 | 下载：6,047,011
    *   说明：本周绝对顶流，基于 Qwen3.5 架构的多模态大型语言模型，兼具强大的文本生成与图像理解能力，是通用助手的首选基座。
*   **[Aleph-Alpha/Kolibri-1.1](https://huggingface.co/Aleph-Alpha/Kolibri-1.1)**
    *   作者：Aleph-Alpha | 点赞：190 | 下载：837
    *   说明：欧洲知名实验室推出的 MoE 推理模型，主打高性价比的逻辑链推理能力，适合需要深度思考但算力受限的场景。
*   **[baidu/ERNIE-5.5-Flash-Preview](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview)**
    *   作者：baidu | 点赞：352 | 下载：1,193
    *   说明：百度 ERNIE 系列的最新 MoE 预览版，旨在提升中文语境下的响应速度与准确性，反映大厂在开源稀疏化模型上的最新进展。
*   **[SulphurAI/Sulphur-3](https://huggingface.co/SulphurAI/Sulphur-3)**
    *   作者：SulphurAI | 点赞：1,217 | 下载：189,735
    *   说明：基于 MiniMax-H3 微调的模型，虽然任务标记为 N/A，但极高的下载量暗示其在特定垂直领域（可能是角色扮演或特定代码任务）具有极强的社区粘性。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
    *   作者：Lightricks | 点赞：13,598 | 下载：3,041,405
    *   说明：本周视频生成领域的明星，支持 text-to-video 和 image-to-video，采用单文件扩散架构，推理效率高，大幅降低了视频创作的硬件门槛。
*   **[thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)**
    *   作者：thinkingmachines | 点赞：6,270 | 下载：96,527
    *   说明：轻巧的多模态 MoE 模型，擅长图文对话，其“Loop”架构标签暗示了独特的上下文处理机制，是端侧多模态应用的新宠。
*   **[inworld/voice-isolator](https://huggingface.co/inworld/voice-isolator)**
    *   作者：inworld | 点赞：968 | 下载：15,244
    *   说明：专注于语音增强与去噪的专用模型，对于嘈杂环境下的语音交互和音频质检具有重要实用价值。
*   **[apple/DepthPro2](https://huggingface.co/apple/DepthPro2)**
    *   作者：apple | 点赞：1,321 | 下载：0
    *   说明：苹果发布的最新单目深度估计模型，主打 metric-depth（米制深度），虽下载量暂低（可能刚发布或受版权/合规限制），但技术信号强烈，利好 AR/VR 与自动驾驶感知。
*   **[facebook/sam-3d-body-dinov3](https://huggingface.co/facebook/sam-3d-body-dinov3)**
    *   作者：facebook | 点赞：2,097 | 下载：21,394
    *   说明：结合 SAM 与 DINOv3 视觉基础模型的 3D 人体网格恢复与姿态估计工具，为数字人驱动和交互界面提供底层视觉能力。

### 🔧 专用模型（代码、数学、医疗、嵌入）
*   **[llamaindex/OCRia-nano-1](https://huggingface.co/llamaindex/OCRia-nano-1)**
    *   作者：llamaindex | 点赞：285 | 下载：126
    *   说明：LlamaIndex 官方推出的轻量级 OCR 模型，专为 PDF 转 Markdown 优化，是构建 RAG 管道中数据处理环节的关键组件。
*   **[sensenova/SenseNova-Loop-9B](https://huggingface.co/sensenova/SenseNova-Loop-9B)**
    *   作者：sensenova | 点赞：784 | 下载：3,268
    *   说明：商汤科技的多模态模型，强调 loop 机制，可能在长上下文或多轮视觉交互任务中有独特优势。

### 📦 微调与量化（社区微调、GGUF、AWQ）
*   **[DavidAU/Qwen3.8-27B-TURBO...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**
    *   作者：DavidAU | 点赞：4,434 | 下载：1,873,950
    *   说明：基于 Qwen3.8-27B 的社区高度定制化版本，集成了 Turbo、Uncensored 及 Coding 优化，展示了社区对主流大模型进行针对性“魔改”的旺盛需求。
*   **[unsloth/Inkling-2-Mini-GGUF](https://huggingface.co/unsloth/Inkling-2-Mini-GGUF)**
    *   作者：unsloth | 点赞：1,500 | 下载：2,445,633
    *   说明：Unsloth 团队提供的 Inkling-2 量化版，极高的下载量印证了 GGUF 格式在本地部署生态中的核心地位，大幅降低了多模态模型的体验成本。
*   **[AtomicChat/Inkling-2-Mini-Uncensored-GGUF](https://huggingface.co/AtomicChat/Inkling-2-Mini-Uncensored-GGUF)**
    *   作者：AtomicChat | 点赞：939 | 下载：762,491
    *   说明：去审查版（Uncensored）的 Inkling 模型，满足特定用户对无限制对话的需求，反映了开源模型指令微调中“安全”与“自由”之间的持续博弈。
*   **[prism-ml/Ternary-Bonsai-2.5-27B-GGUF](https://huggingface.co/prism-ml/Ternary-Bonsai-2.5-27B-GGUF)**
    *   作者：prism-ml | 点赞：529 | 下载：59,366
    *   说明：采用 2-bit 三元量化技术的小数模型，探索极低精度下的性能边界，适合资源极度受限的边缘设备。

## 生态信号
本周生态呈现**“大模型瘦身，小模型多模”**的趋势。Qwen3.8-27B 的统治力表明，20-30B 参数区间已成为多模态模型的最佳性价比甜点区。MoE（混合专家）架构在 Inkling、Kolibri 和 ERNIE 中的普遍出现，说明稀疏化是降低推理成本的主流路径。量化活动极度活跃，Unsloth 等工具链的普及使得任何热门模型都能在几小时内转化为 GGUF 格式并占据榜单，意味着**本地部署的能力正在快速逼近云端体验**。同时，视频生成（LTX-2.5）和实时语音（Inworld）的火热，预示着多模态交互将从“静态生成”走向“动态实时”。

## 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：如果你正在寻找入门级但质量尚可的视频生成方案，这是目前最高效的选择，适合快速原型开发。
2.  **[thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)**：对于希望在笔记本或高端手机上运行多模态助手（看图+聊天）的开发者，该模型的 MoE 特性使其比同参数 Dense 模型更具部署优势。
3.  **[apple/DepthPro2](https://huggingface.co/apple/DepthPro2)**：尽管下载量低，但苹果在深度估计上的最新贡献对于 AR 开发者至关重要，建议尽早跟进其 API 和精度表现。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*