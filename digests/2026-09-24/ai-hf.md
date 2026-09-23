# Hugging Face 热门模型日报 2026-09-24

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-23 22:33 UTC

---

# Hugging Face 热门模型日报（2026-09-24）

## 今日速览

今日 HF 热榜由 Qwen 家族主导：[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) 以 16,135 赞和 691 万下载成为最高热度模型，[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) 与 [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) 系列同步上榜，显示其在多模态、生成与社区衍生上的强扩散能力。[deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) 与 [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) 表现突出，分别代表多模态 LLM 和视频生成的高下载热度。低比特/量化生态非常活跃：Ternary 2-bit、GGUF、MLX 和 unsloth 社区版本占据大量下载位，说明本地部署与端侧推理仍是核心需求。专用分类模型 laya 系列也进入榜单，反映校准决策/文本分类在应用侧的关注。

## 热门模型

> 以下按分类整理全部 30 个上榜模型；分类内按点赞数降序。

### 🧠 语言模型（LLM、对话模型、指令微调）

- [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) — 作者：XingChen-AGI；点赞：1,561；下载：39,009。面向文本生成与对话的开源 LLM，29B-A4B 的命名暗示可能采用 MoE 结构，热度反映社区对高可用对话模型的兴趣。
- [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) — 作者：TokenRhythm；点赞：1,013；下载：13,009。基于 Qwen3.5 文本路线的 9B 生成模型，标签强调 agentic，适合轻量代理与工具使用场景。
- [Altworld/Hemmingway-1](https://huggingface.co/Altworld/Hemmingway-1) — 作者：Altworld；点赞：574；下载：3,787。Qwen3.5/3.8 系文本生成模型，名称暗示写作/风格化生成方向，属于社区指令微调型内容模型。
- [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) — 作者：harshatheg；点赞：559；下载：0。面向 Apple Silicon 的 1B 结构生成模型，突出 MLX、并行解码与约束解码，适合端侧可控生成。
- [XiaomiMiMo/MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) — 作者：XiaomiMiMo；点赞：447；下载：4,070。小米 MiMo V2.6 Pro 强化学习版本，标签含 text-generation 与 multimodal，体现厂商 RL 微调路线。
- [XiaomiMiMo/MiMo-V2.6-Flash-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL) — 作者：XiaomiMiMo；点赞：426；下载：13,243。MiMo 轻量 Flash 强化学习版，强调快速推理与下载转化，适合低延迟对话/生成应用。
- [XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B) — 作者：XiaomiMiMo；点赞：405；下载：3,253。基于 Qwen 的 9B 蒸馏模型，任务为 image-text-to-text，展示教师-学生蒸馏在小模型上的应用。
- [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) — 作者：yandex；点赞：296；下载：2,254。Yandex 发布的 80B-A3B 基座文本模型，使用 custom_code，关注点在大规模基础模型与稀疏激活架构。

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) — 作者：Qwen；点赞：16,135；下载：6,912,469。Qwen3.8 多模态视觉-文本模型，榜单第一，说明多模态 LLM 已成为开源生态主战场。
- [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) — 作者：Qwen；点赞：5,641；下载：807,550。Qwen3.8 系列快速/实验性多模态模型，兼顾图像理解与对话能力，下载量高，体现轻量化路线受欢迎。
- [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) — 作者：MiniMaxAI；点赞：5,626；下载：3,664,216。MiniMax 文生/图生视频模型，下载量突出，代表开源视频生成进入高可用工作流阶段。
- [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) — 作者：Lightricks；点赞：4,897；下载：1,638,605。支持 image-to-video、text-to-video、video-to-video 的扩散视频模型，适合 ComfyUI 等视频生成工作流。
- [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) — 作者：deepseek-ai；点赞：3,665；下载：570,909。DeepSeek 多模态视觉文本快速模型，兼具文本生成与图像理解，热度和下载均较高。
- [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) — 作者：Qwen；点赞：2,012；下载：28,407。Qwen 文生图/图像编辑基础模型，已衍生出 GGUF、ComfyUI 与无审查版本，生态辐射能力很强。
- [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) — 作者：m-a-p；点赞：984；下载：22,415。文本到音频/音乐生成模型，标签包含 symbolic planning 与 agentic editing，面向可控音乐创作。
- [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) — 作者：TaichuAI；点赞：754；下载：6,934。9B 多模态视觉语言模型，强调 spatial-reasoning，适合视觉推理与 VLM 应用研究。
- [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) — 作者：Comfy-Org；点赞：622；下载：2,220,609。ComfyUI 单文件封装的 Qwen-Image-2.1，下载量高，代表工作流化、即插即用的社区分发方式。
- [netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) — 作者：netease-youdao；点赞：353；下载：3,708。基于 Qwen3 ASR 路线的语音识别模型，面向 R2T2 场景，显示中文 ASR 在开源社区仍有稳定需求。

### 🔧 专用模型（代码、数学、医疗、嵌入）

- [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) — 作者：convaiinnovations；点赞：3,075；下载：0。文本分类/校准决策模型，标签包含 system-one 与 calibrated-decisions，下载为 0 但点赞很高，可能处于发布/评测期。
- [AlexWortega/openjev](https://huggingface.co/AlexWortega/openjev) — 作者：AlexWortega；点赞：515；下载：0。基于 Qwen3.5 的 NLI/交叉编码器文本分类模型，适合语义匹配、检索与专用分类任务。
- [convaiinnovations/laya-multilingual](https://huggingface.co/convaiinnovations/laya-multilingual) — 作者：convaiinnovations；点赞：220；下载：0。multilingual 版 laya 分类模型，基于 mmbert，面向多语言文本分类与轻量嵌入式决策。
- [Cactus-Compute/needle3](https://huggingface.co/Cactus-Compute/needle3) — 作者：Cactus-Compute；点赞：205；下载：62,025。面向端侧的 tool-calling / function-calling 模型，下载量高于点赞，体现实用 agent 工具场景的需求。

### 📦 微调与量化（社区微调、GGUF、AWQ）

- [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) — 作者：unsloth；点赞：4,561；下载：7,134,167。unsloth 出品的 Qwen3.8-27B GGUF 量化包，下载量极高，是 llama.cpp/本地部署路线的重要入口。
- [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) — 作者：prism-ml；点赞：1,950；下载：2,815,979。三值/2-bit GGUF 模型，将 27B 级模型压缩到更低部署门槛，研究与端侧价值都很高。
- [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) — 作者：ISTA-DASLab；点赞：1,611；下载：1,414,991。GSQ/RCO 混合精度量化 GGUF，展示学术量化方法在热门 Qwen3.8 模型上的落地。
- [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) — 作者：abenzerps；点赞：1,423；下载：350,678。Qwen-Image-2.1 的社区“无审查”GGUF/ComfyUI 版本，反映图像生成社区对低门槛本地化的强需求。
- [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) — 作者：DavidAU；点赞：1,123；下载：1,452,915。社区深度定制、无审查的 GGUF 微调量化包，命名复杂但下载量高，说明“魔改”模型仍有稳定受众。
- [ukisai/Swift-Qwen3.8-27b](https://huggingface.co/ukisai/Swift-Qwen3.8-27b) — 作者：ukisai；点赞：559；下载：17,837。社区对 Qwen3.8-27B 的 Swift 风格微调版本，面向多模态对话/指令优化，是 Qwen 衍生链中的微调分支。
- [ukisai/Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF) — 作者：ukisai；点赞：381；下载：168,762。Swift 微调版的 GGUF 量化，便于本地部署，延续 Qwen3.8 社区微调与量化链条。
- [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) — 作者：prism-ml；点赞：357；下载：48,214。面向 Apple Silicon 的 MLX 2-bit 三值版本，体现端侧低比特推理路线的持续扩展。

## 生态信号

生态信号显示 Qwen 家族已形成基础、多模态、图像生成与社区量化完整链条，Qwen3.8 和 Qwen-Image-2.1 的衍生版本反复上榜，说明开源权重仍是当前热榜主载体。DeepSeek、MiniMax、小米 MiMo 等厂商强化 RL、Flash 与蒸馏路线。量化端非常活跃：2-bit 三值、GSQ/RCO、MLX、unsloth GGUF 与 ComfyUI 单文件包占据大量下载，本地部署和低算力推理比单纯模型发布更受关注。

## 值得探索

- [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)：榜单最高赞与下载量，多模态视觉-文本能力与社区生态覆盖最广，适合作为 VLM、Agent 或通用多模态应用基线。
- [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)：视频生成模型下载量极高，支持文生视频与图生视频，适合 ComfyUI 工作流和开源视频生成能力对比。
- [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)：2-bit 三值压缩极具研究价值，适合分析低比特推理、量化损失边界与端侧部署可行性。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*