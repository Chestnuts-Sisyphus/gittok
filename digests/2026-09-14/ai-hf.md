# Hugging Face 热门模型日报 2026-09-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-13 21:56 UTC

---

# Hugging Face 热门模型日报 (2026-09-14)

---

### 1. 今日速览

今日 Hugging Face 趋势榜呈现出**“轻量高效化（Flash）”**与**“多模态具身化”**齐头并进的强劲势头：
1. **Flash 架构统治视觉语言模型**：DeepSeek-V4.1-Flash、GLM-5.3-Flash 与 Qwen3.8-Flash-Next 集中霸榜，高吞吐、低延迟的多模态推理正成为端侧与云端部署的新标配。
2. **开源视频生成爆发**：MiniMax-H3 与 Lightricks/LTX-2.5 形成双雄格局，社区围绕 MiniMax-H3 的 ComfyUI 插件与衍生微调极速涌现。
3. **垂直领域深度演进**：Qwen 推出针对自动驾驶与轨迹规划的专用模型 Qwen-Drive-1.0-4B，标志着通用大模型向特定工业场景的具身落地方向迈出关键一步。

---

### 2. 热门模型

#### 🧠 语言模型（LLM / 对话 / 指令）
* **[openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)**
  * **作者**: openbmb | **点赞**: 1,334 | **下载**: 150,110
  * **一句话说明**: 面向端侧极佳效能的 2B 级最新旗舰语言模型，凭借超低资源占用和强劲的推理能力广受欢迎。
* **[Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview)**
  * **作者**: Edge0 | **点赞**: 987 | **下载**: 3,552
  * **一句话说明**: 基于 Qwen3.5 MoE 架构并针对 Apple MLX 优化的边缘端混合专家模型预览版。
* **[XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B)**
  * **作者**: XHToken | **点赞**: 1,151 | **下载**: 21,336
  * **一句话说明**: 专注通用计算与 Agent 调用的 4B 轻量级开源基础语言模型。

#### 🎨 多模态与生成（图像 / 视频 / 音频）
* **[deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)**
  * **作者**: deepseek-ai | **点赞**: 2,191 | **下载**: 244,457
  * **一句话说明**: DeepSeek 最新推出的极速多模态视觉-文本模型，主打低延迟高精度的图像理解与交互。
* **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
  * **作者**: Qwen | **点赞**: 14,960 | **下载**: 7,768,964
  * **一句话说明**: 榜单的绝对顶流，开源社区目前综合表现最强的中型多模态视觉语言模型之一。
* **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**
  * **作者**: MiniMaxAI | **点赞**: 5,236 | **下载**: 4,819,845
  * **一句话说明**: 现象级开源视频生成模型，支持高动态文本/图像生成高分辨率视频。
* **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
  * **作者**: Lightricks | **点赞**: 3,730 | **下载**: 1,548,442
  * **一句话说明**: 灵活高效的全能型视频生成模型，涵盖文生视频、图生视频及视频到视频转换。
* **[m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B)**
  * **作者**: m-a-p | **点赞**: 396 | **下载**: 3,707
  * **一句话说明**: 结合符号规划与 Agent 化编辑的下一代音乐与音频生成模型。

#### 🔧 专用模型（领域应用 / 时间序列 / 具身）
* **[google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)**
  * **作者**: google | **点赞**: 774 | **下载**: 797,832
  * **一句话说明**: Google 发布的第三代时间序列预测基础模型 PyTorch 原生实现。
* **[Qwen/Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B)**
  * **作者**: Qwen | **点赞**: 196 | **下载**: 4,119
  * **一句话说明**: 阿里通义开源的自动驾驶专用视觉语言模型，专注环境理解与运动轨迹规划。
* **[dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8)**
  * **作者**: dealignai | **点赞**: 429 | **下载**: 30,310
  * **一句话说明**: 社区解除对齐限制（Ablerated）、专用于网络安全渗透测试与漏洞挖掘的 FP8 优化版。

#### 📦 微调与量化（社区生态）
* **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**
  * **作者**: unsloth | **点赞**: 4,006 | **下载**: 11,005,880
  * **一句话说明**: Unsloth 优化的 Qwen3.8 官方推荐 GGUF 量化版，单周下载超千万次。
* **[ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)**
  * **作者**: ISTA-DASLab | **点赞**: 965 | **下载**: 769,557
  * **一句话说明**: 采用 GSQ/RCO 新型混合精度量化技术的 Qwen3.8 GGUF 版本。
* **[Alissonerdx/Minimax-H3-ComfyUI](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI)**
  * **作者**: Alissonerdx | **点赞**: 139 | **下载**: 11,860
  * **一句话说明**: 为 MiniMax-H3 量身打造的 ComfyUI 工作流集成套件与 LoRA 扩展。

---

### 3. 生态信号

1. **“Flash”成为多模态演进的主旋律**：DeepSeek-V4.1-Flash、GLM-5.3-Flash 与 Qwen3.8-Flash-Next 的同台竞技表明，行业竞争重点已从单纯追求参数规模，全面转向**高吞吐、低成本的实用级 Flash 架构**。
2. **视频生成生态全面二创化**：MiniMax-H3 下载量逼近 500 万，围绕其展开的二创微调（如 `Minimax-h3_Singularity`）与工作流包装（`Minimax-H3-ComfyUI`）极其活跃，证明高质量视频大模型正快速融入内容生产工作流。
3. **MoE + 端侧量化深度结合**：Edge0 与 Nex-AGI 推出的 Qwen3.5 MoE 衍生版，结合 Unsloth 的百万级 GGUF 分发，凸显了社区将复杂 MoE 模型压缩并下沉至 Mac/PC 边缘端运行的强烈需求。

---

### 4. 值得探索

1. **[deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)**  
   * **理由**：DeepSeek 在多模态推理效率上的最新里程碑，适合需要高并发、低延迟视觉-文本处理的开发者进行部署评估。
2. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** （及其生态衍生 [Alissonerdx/Minimax-H3-ComfyUI](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI)）  
   * **理由**：目前开源视频生成领域的标杆模型，结合 ComfyUI

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*