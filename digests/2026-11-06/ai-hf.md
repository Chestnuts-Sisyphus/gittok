# Hugging Face 热门模型日报 2026-11-06

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-06 00:37 UTC

---

# Hugging Face 热门模型日报 (2026-11-06)

## 1. 今日速览
当前 Hugging Face 生态呈现出多模态与高效能模型齐头并进的繁荣景象。Qwen、DeepSeek（V4.1-Flash系列）以及 Meta（SAM 3）等大模型家族持续统治热榜，其中 Qwen3.8-27B 凭借近两万的点赞和超八百万的下载量成为全场焦点。与此同时，视频生成（Lightricks/LTX-2.5）与 3D 视觉处理工具在社区中也获得了爆发式关注，量化与微调社区（如 GGUF、Unsloth）依旧活跃。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
* **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
  * 作者: Qwen | 点赞: 19,211 | 下载: 8,037,597
  * **简评**: Qwen 家族最新中量级多模态语言模型，凭借均衡的性能和极高的社区热度登顶本期榜首。
* **[deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)**
  * 作者: deepseek-ai | 点赞: 5,329 | 下载: 243,508
  * **简评**: DeepSeek 最新 V4.1 Flash 迭代版本，兼具出色的推理速度与多模态交互能力，备受开发者追捧。
* **[mistralai/Mistral-Large-4-1T-A52B](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B)**
  * 作者: mistralai | 点赞: 1,615 | 下载: 9,592
  * **简评**: 欧洲开源巨头 Mistral 的旗舰级大模型，原生支持 vLLM 和 SGLang，适合企业级高性能部署。
* **[moonshotai/Kimi-K3.1-Pro](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)**
  * 作者: moonshotai | 点赞: 920 | 下载: 11,658
  * **简评**: Moonshot AI 推出的 K3.1 增强版多模态模型，通过压缩张量技术实现了高效推理。
* **[LiquidAI/LFM3-1.7B](https://huggingface.co/LiquidAI/LFM3-1.7B)**
  * 作者: LiquidAI | 点赞: 1,508 | 下载: 60,681
  * **简评**: 采用创新流体神经网络架构的小参数模型，在边缘设备文本生成场景表现亮眼。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
* **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
  * 作者: Lightricks | 点赞: 10,727 | 下载: 2,561,845
  * **简评**: 现象级视频生成与编辑模型，支持图生视频、文生视频等多种工作流，下载量破 250 万。
* **[facebook/sam3](https://huggingface.co/facebook/sam3)**
  * 作者: facebook | 点赞: 5,945 | 下载: 1,921,413
  * **简评**: Meta 推出的 Segment Anything 模型第三代，视频掩码生成与特征提取能力迎来质的飞跃。
* **[black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/flux-3-image-klein-comfy)**
  * 作者: black-forest-labs | 点赞: 2,570 | 下载: 1,077,477
  * **简评**: Flux 图像生成系列的新优化版，完美适配 ComfyUI，提供极致的高画质与图像编辑体验。
* **[nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B)**
  * 作者: nvidia | 点赞: 3,057 | 下载: 57,297
  * **简评**: 英伟达推出的 30B 级语音识别与语音大模型，音频转录精度极高。
* **[speridlabs/idol](https://huggingface.co/speridlabs/idol)**
  * 作者: speridlabs | 点赞: 769 | 下载: 17,180
  * **简评**: 聚焦高斯溅射（Gaussian Splatting）技术的尖端图生 3D 模型，正在重塑 3D 内容创作。

### 🔧 专用模型（代码、数学、医疗、嵌入）
* **[ccore/Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder)**
  * 作者: ccore | 点赞: 701 | 下载: 157,157
  * **简评**: 基于 Qwen 架构微调的垂直领域模型，专注于 Three.js 及 3D 代码生成。
* **[xiaomi-research/Xiaomi-OCR-0](https://huggingface.co/xiaomi-research/Xiaomi-OCR-0)**
  * 作者: xiaomi-research | 点赞: 296 | 下载: 22,477
  * **简评**: 小米研究院出品的专用 OCR 模型，多模态文字识别效率与准确度表现优异。
* **[baidu/Unlimited-OCR-2](https://huggingface.co/baidu/Unlimited-OCR-2)**
  * 作者: baidu | 点赞: 620 | 下载: 269,424
  * **简评**: 百度新一代大规模商用级 OCR 模型，下载量巨大，适合复杂版面文字提取。

### 📦 微调与量化（社区微调、GGUF、AWQ）
* **[SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF](https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF)**
  * 作者: SC117 | 点赞: 709 | 下载: 3,880,611
  * **简评**: 社区针对 Qwen 打造的去审查（abliterated）量化版本，下载量接近 400 万，极受欢迎。
* **[abenzerps/Qwen-Image-2.1-Turbo-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Turbo-Quantized)**
  * 作者: abenzerps | 点赞: 5,666 | 下载: 233,059
  * **简评**: Qwen 图像生成模型的快速量化版，极大降低了消费级显卡本地跑图的门槛。
* **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**
  * 作者: DavidAU |点赞: 2,543 | 下载: 1,457,791
  * **简评**: 极具极客风格的社区深度魔改和多算法融合量化模型，展现了开源社区强大的重构能力。

---

## 3. 生态信号
本期榜单显示出 **Qwen** 与 **DeepSeek** 依然是开源生态中最强劲的两大基石模型家族，衍生出海量的量化与垂直领域微调版本。开源权重在多模态、视频生成（LTX-2.5）和计算机视觉（SAM 3）领域全面对标并部分超越了闭源商业方案。同时，针对消费级硬件的 **GGUF** 量化及去审查（Abliterated）版本热度持续高涨，表明社区用户对本地化部署和自由定制开源大模型的需求正呈指数级增长。

---

## 4. 值得探索
1. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：如果你在寻找能够媲美商业软件的开源视频生成方案，这款集成了多任务视频工作流的模型绝对不容错过。
2. **[facebook/sam3](https://huggingface.co/facebook/sam3)**：Meta 的最新分割一切大模型，在视频对象追踪与复杂掩码生成上代表了当前开源界的最高水准。
3. **[ccore/Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder)**：探索 AI 与 3D 网页端开发（Three.js）结合的新利器，轻量且极具实用价值。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*