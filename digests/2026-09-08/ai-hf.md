# Hugging Face 热门模型日报 2026-09-08

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-07 22:23 UTC

---

### 🤖 Hugging Face 热门模型日报（2026-09-08）

---

### 1. 今日速览
2026 年 9 月上旬的 Hugging Face 趋势榜展现了极高的活跃度，以 **Qwen3.8** 和 **GLM-5.3** 系列为代表的新一代大模型成为全场焦点，特别是其多模态（`image-text-to-text`）能力的普及正在重塑开源生态。与此同时，视频生成领域由 **MiniMax-H3** 与 **LTX-2.5** 领跑，展现了极强的多媒体创作热潮。社区生态方面，围绕 Qwen3.8 的海量 GGUF 量化、去审查（Uncensored）微调版本层出不穷，推动了端侧与本地化部署的进一步繁荣。

---

### 2. 热门模型

#### 🧠 语言模型（LLM、对话模型、指令微调）
- **[zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3)**
  - 作者: zai-org | 点赞: 1,750 | 下载: 442,064
  - **说明**: 采用 MoE 与 DSA 架构的最新纯文本生成与对话模型，代表了智谱技术路线的最新进展，兼顾性能与推理效率。
- **[XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B)**
  - 作者: XHToken | 点赞: 715 | 下载: 7,216
  - **说明**: 4B 参数规模的高效轻量级文本生成大模型，凭借高性价比和极佳的端侧适配潜力受到开发者关注。

#### 🎨 多模态与生成（图像、视频、音频、文本到X）
- **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
  - 作者: Qwen | 点赞: 14,253 | 下载: 6,416,358
  - **说明**: 本期绝对的生态统治者。作为 27B 规模的旗舰图文多模态模型，其下载量与热度断层领先，成为开源多模态基座的首选。
- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**
  - 作者: MiniMaxAI | 点赞: 5,006 | 下载: 4,990,034
  - **说明**: 顶尖的开源视频生成模型，支持文本/图像到视频的复杂跨模态创作，在创意和影视生成社区引发狂热下载。
- **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
  - 作者: Lightricks | 点赞: 3,072 | 下载: 1,584,382
  - **说明**: 专注于图像到视频与视频编辑的强大扩散模型，以高画质和流畅的运动表现位居视频生成榜前列。
- **[zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)**
  - 作者: zai-org | 点赞: 2,132 | 下载: 784,005
  - **说明**: GLM-5.3 的轻量高速多模态版本，主打极速推理与多模态交互，满足高并发场景需求。
- **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)**
  - 作者: Qwen | 点赞: 4,975 | 下载: 474,693
  - **说明**: Qwen3.8 架构的闪电升级版，进一步优化了图文多模态对话的响应速度与生成质量。
- **[deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp)**
  - 作者: deepseek-ai | 点赞: 796 | 下载: 251,611
  - **说明**: DeepSeek-V4 架构下的前沿视觉实验模型，展现了其在多模态理解领域的探索性突破。

#### 🔧 专用模型（代码、数学、医疗、嵌入）
- **[google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)**
  - 作者: google | 点赞: 571 | 下载: 271,713
  - **说明**: 谷歌推出的高性能时间序列预测模型，为金融、气象等领域的时序分析提供了强大的零样本预测能力。
- **[sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)**
  - 作者: sentence-transformers | 点赞: 5,577 | 下载: 251,367,312
  - **说明**: 经典的轻量级文本嵌入模型，虽然发布时间较早，但凭借无与伦比的通用性和超高下载量依然是 RAG 系统的基石。
- **[microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B)**
  - 作者: microsoft | 点赞: 137 | 下载: 1,144
  - **说明**: 微软推出的 7B 流式语音识别（ASR）模型，标志着语音转录正向大模型时代演进。

#### 📦 微调与量化（社区微调、GGUF、AWQ）
- **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**
  - 作者: unsloth | 点赞: 3,636 | 下载: 10,479,045
  - **说明**: 由 Unsloth 提供的 Qwen3.8-27B 高效 GGUF 量化版本，下载量突破千万，是个人电脑端本地运行该旗舰模型的首选。
- **[HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)**
  - 作者: HauhauCS | 点赞: 994 | 下载: 1,629,754
  - **说明**: 针对 Qwen3.8-27B 进行激进多轮微调及去审查（Uncensored）处理的社区 GGUF 版本，备受极客推崇。
- **[unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF)**
  - 作者: unsloth | 点赞: 828 | 下载: 868,243
  - **说明**: Qwen3.8-Flash-Next 的量化版本，让轻量多模态模型也能轻松实现本地化高效推理。

---

### 3. 生态信号

- **模型家族矩阵成型**：**Qwen3.8** 与 **GLM-5.3** 构成了当前开源社区的双子星。特别是 Qwen3.8 全面转向图文多模态（`image-text-to-text`），标志着开源大模型“纯文本时代”的正式翻篇，多模态已成为标配。
- **开源权重生态的繁荣与定制化**：以 `Unsloth`、`DavidAU` 等为代表的社区力量围绕 Qwen3.8 衍生出了海量的 GGUF、去审查（Uncensored）及激进微调版本，展现了开源社区极强的生命力和对本地化部署的迫切需求。
- **生成式多媒体爆发**：MiniMax-H3 与 LTX-2.5 在视频生成赛道的持续高热，表明开源视频大模型正在加速追赶闭源商业水平，多模态内容的创作门槛进一步降低。

---

### 4. 值得探索

1. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为当之无愧的生态焦点，其多模态理解与指令遵循能力代表了当前开源界的最高水准，极具研究和生产应用价值。
2. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：开源视频生成领域的重磅之作，非常适合开发者和创意工作者探索高画质、复杂的视频内容自动生成。
3. **[google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)**：跳出常规语言和多模态范畴，谷歌的这款时间序列大模型为数据分析和预测场景提供了全新的大模型解法，值得业务开发者尝试。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*