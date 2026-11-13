# Hugging Face 热门模型日报 2026-11-13

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-13 00:48 UTC

---

### Hugging Face 热门模型日报 (2026-11-13)

#### 1. 今日速览
今日社区焦点集中在 **Qwen3.8 系列**的爆发式增长与生态兼容，尤其是针对 GGUF 量化版本的强劲需求。**多模态模型**（如 LTX-2.5 和 Meta 的 SAM3）展现了视觉理解与生成的深度融合，视频生成与编辑工具正在从研究型向工具链（ComfyUI）化转型。同时，社区对“解除限制（Uncensored/Heretic）”模型的持续偏好，反映了开发者对模型自由度与控制力的个性化追求。

---

#### 2. 热门模型

**🧠 语言模型 (LLM)**
*   [**Qwen/Qwen3.8-27B**](https://huggingface.co/Qwen/Qwen3.8-27B) | 作者: Qwen | 点赞: 19,744 | 下载: 7,094,218
    *   *说明：作为当前最强的开源基座模型之一，其高性能与多模态能力使其成为本周最受追捧的基准。*
*   [**deepseek-ai/DeepSeek-V4.1-Flash-1017**](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | 作者: deepseek-ai | 点赞: 5,576 | 下载: 374,631
    *   *说明：DeepSeek 系列的高效闪电版，因其推理速度与性能的极致平衡而受到广泛关注。*

**🎨 多模态与生成**
*   [**Lightricks/LTX-2.5**](https://huggingface.co/Lightricks/LTX-2.5) | 作者: Lightricks | 点赞: 11,633 | 下载: 2,782,513
    *   *说明：目前最火的图像转视频（Image-to-Video）模型，以其极高的视觉保真度和流程集成度统治榜单。*
*   [**facebook/sam3**](https://huggingface.co/facebook/sam3) | 作者: facebook | 点赞: 6,451 | 下载: 2,070,504
    *   *说明：Meta 推出的新一代分割模型，在图像与视频 mask 生成领域继续保持行业标杆地位。*
*   [**MiniMaxAI/MiniMax-H3-Image**](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image) | 作者: MiniMaxAI | 点赞: 868 | 下载: 306,718
    *   *说明：高性能文本转图像模型，特别是在 ComfyUI 生态中极受欢迎。*

**🔧 专用模型**
*   [**facebook/dinov3-vitl16-pretrain-lvd1689m**](https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m) | 作者: facebook | 点赞: 2,152 | 下载: 703,532
    *   *说明：视觉特征提取的顶尖模型，适用于下游视觉理解任务的预训练特征提取。*
*   [**speridlabs/idol**](https://huggingface.co/speridlabs/idol) | 作者: speridlabs | 点赞: 2,232 | 下载: 29,904
    *   *说明：基于高斯喷溅（Gaussian Splatting）技术的图像转 3D 模型，是 3D 重建领域的创新标杆。*

**📦 微调与量化**
*   [**unsloth/Qwen3.8-27B-GGUF**](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | 作者: unsloth | 点赞: 5,807 | 下载: 6,097,719
    *   *说明：Unsloth 团队优化的 GGUF 版本，极大降低了 27B 参数模型的部署门槛，是个人硬件跑大模型的首选。*
*   [**SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF**](https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF) | 作者: SC117 | 点赞: 932 | 下载: 4,120,281
    *   *说明：典型的社区“魔改”作品，通过移除特定对齐限制（Abliterated）实现了模型行为的完全去中心化。*

---

#### 3. 生态信号
目前**Qwen 家族**呈现出绝对的生态统治力，凭借优秀的基座能力和极高的下游适配性（GGUF/Unsloth），成为了开发者构建应用的首选。开源权重模型正在快速侵蚀原本的闭源市场，特别是在量化技术普及后，27B-65B 级别的模型已能在消费级显卡上高效运行。此外，**“工具链化”**趋势明显，能够通过 ComfyUI 等插件直接调用的模型（如 Flux-3、MiniMax-H3）下载量远高于普通 API 模型，说明 AI 开发者的需求已从单纯的模型推理转向生产力流水线集成。

---

#### 4. 值得探索
1.  **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**：如果你在做视频创作或特效相关的工作，这是目前效果最好的开源图像转视频模型，不容错过。
2.  **[facebook/sam3](https://huggingface.co/facebook/sam3)**：对于从事计算机视觉或自动化标注的开发者，SAM3 代表了目前图像分割任务的最高水平，非常值得集成至工作流中。
3.  **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**：对于想在本地部署高性能大模型的用户，这是目前市面上兼容性与性能最优的路径。

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*