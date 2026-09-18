# Hugging Face 热门模型日报 2026-09-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-18 22:03 UTC

---

# Hugging Face 热门模型日报（2026-09-19）

## 今日速览

今日榜单的绝对中心是 Qwen3.8-27B：基础模型、GGUF 量化、Swift 微调与 uncensored 社区变体同时上榜，形成完整的开源复用链。DeepSeek-V4.1-Flash、GLM-5.3-Flash 与 MiniMax-H3 表现强势，说明“Flash/多模态/视频生成”组合正在成为高下载主线。Lightricks/LTX-2.5、MiniMax-H3 与 Comfy-Org/YuE2 表明单文件扩散、ComfyUI 工作流正在加速视频/音频生成落地。端侧与低比特部署明显升温：Edge0-35B-A3B、Ternary-Bonsai 2-bit、MLX/GGUF/FP8 量化模型密集出现。Llama-3.1-8B-Instruct 与 all-MiniLM-L6-v2 的长尾下载量仍很高，说明本地推理和 RAG 基础设施需求稳定。

## 热门模型

> 分类依据任务标签与模型用途；`image-text-to-text` 类模型归入多模态与生成。分类内按点赞数降序。

### 🧠 语言模型

| 模型 | 作者 | 点赞 | 下载 | 一句话说明 |
|---|---:|---:|---:|---|
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,718 | 5,934,139 | 经典 8B 指令模型，长尾下载量极高，仍是本地部署与二次开发的基础。 |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 3,392 | 52,519 | 35B-A3B MoE 预览版，标注 edge-inference，适合边缘/端侧低激活推理。 |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 2,366 | 22,666 | 基于 Qwen3.5-text 的 agentic 小模型，适合工具调用与轻量代理任务。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,560 | 357,166 | 2B 轻量 LLM，端侧和低成本部署场景关注度高。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,272 | 29,684 | 4B 文本生成模型，面向轻量级通用对话/生成。 |
| [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) | TokenRhythm | 887 | 10,746 | NeoHorse 系列 9B 版本，agentic 能力更强，适合需要更高上限的本地部署。 |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 424 | 3,073 | 29B-A4B 对话模型，命名暗示 MoE/低激活，新家族初版值得关注。 |
| [internlm/Atria-Dawn-Preview](https://huggingface.co/internlm/Atria-Dawn-Preview) | internlm | 163 | 711 | MoE/DSA 预览模型，带 arXiv 标签，偏研究向。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞 | 下载 | 一句话说明 |
|---|---:|---:|---:|---|
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,643 | 7,358,662 | Qwen 系列 27B 多模态对话模型，点赞/下载双高，是本周生态中心。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,452 | 4,449,605 | MiniMax 文生/图生视频模型，高下载反映视频生成需求旺盛。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,401 | 724,142 | Qwen4 实验性 Flash 多模态模型，偏轻量快速推理。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,326 | 1,590,087 | 单文件扩散视频模型，支持图生视频/文生视频，易用性高。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,164 | 429,865 | DeepSeek 新一代 Flash 多模态模型，下载高，适合快速部署与研究。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,445 | 2,669,173 | 智谱 GLM 新一代 Flash 多模态对话模型，下载量突出。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 795 | 13,668 | 3B 音乐/音频生成模型，标签涉及符号规划与 agentic editing，偏专业音频生成。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 494 | 217,900 | 基于 MiniMax-H3 的社区衍生视频模型，面向风格化视频生成。 |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 303 | 3,184 | 腾讯零样本 TTS/声音克隆模型，补齐音频生成能力。 |
| [Agnes-AI/Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 224 | 1,357 | Agnes 新家族 Flash 多模态模型，数据量较低但代表新玩家入场。 |
| [Comfy-Org/YuE2](https://huggingface.co/Comfy-Org/YuE2) | Comfy-Org | 184 | 102,247 | ComfyUI 单文件扩散版，便于工作流集成。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 181 | 1,802 | 9B 视觉语言模型，强调空间推理，属于多模态理解细分方向。 |

### 🔧 专用模型

| 模型 | 作者 | 点赞 | 下载 | 一句话说明 |
|---|---:|---:|---:|---|
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 6,059 | 255,050,544 | 经典句向量嵌入模型，下载量极高，是 RAG/相似度计算基线。 |
| [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) | harshatheg | 370 | 0 | 1B 结构化生成/受约束解码模型，下载低但技术标签清晰，适合结构化输出研究。 |

### 📦 微调与量化

| 模型 | 作者 | 点赞 | 下载 | 一句话说明 |
|---|---:|---:|---:|---|
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,314 | 7,628,907 | Qwen3.8-27B 的 GGUF 量化版，下载量最高，是社区本地部署首选。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,311 | 1,078,301 | GSQ+RCO 混合精度 GGUF，面向更高压缩效率与本地推理质量。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 894 | 1,197,378 | 基于 Qwen3.8 的 uncensored/coder/MTP 风格社区微调 GGUF，下载量高，体现个性化微调需求。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 890 | 405,609 | 27B 2-bit 三值 GGUF，面向低显存本地部署。 |
| [ukisai/Swift-Qwen3.8-27b](https://huggingface.co/ukisai/Swift-Qwen3.8-27b) | ukisai | 438 | 6,293 | Swift 社区微调，偏对话/思考效率优化。 |
| [ukisai/Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF) | ukisai | 279 | 100,177 | 上述 Swift 微调的 GGUF 版本，llama.cpp 友好。 |
| [dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) | dealignai | 279 | 33,065 | DeepSeek Flash 的 FP8 非审查版本，兼顾量化与社区去审查需求。 |
| [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 168 | 5,056 | 2-bit MLX 版本，面向 Apple 端侧推理。 |

## 生态信号

Qwen3.8 家族最旺，基模、GGUF、社区微调与量化同榜，形成完整开源复用链。DeepSeek、GLM、MiniMax 的 Flash/多模态模型说明，开源权重正从文本扩展到图像理解与视频生成，闭源 API 的独占领地继续被压缩。GGUF、2-bit、MLX 与 FP8 活跃，端侧和消费级硬件推理成为关键场景。视频与音频方向，单文件扩散和 ComfyUI 工作流也在降低落地门槛。

## 值得探索

1. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**  
   本周点赞和下载双高的多模态对话模型，适合做基准测试、Agent/多模态应用原型，也是理解社区量化与微调生态的入口。

2. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**  
   视频生成方向下载量高，适合探索文生/图生视频、视频工作流集成与社区衍生模型。

3. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**  
   2-bit 三值 GGUF 是研究低比特模型本地部署的样本，适合评估压缩后能力损失、显存占用与端侧可行性。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*