# Hugging Face Trending Models Digest 2026-11-16

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-11-15 23:38 UTC

---

# Hugging Face Trending Models Digest
**Date:** 2026-11-16

## 1. Today's Highlights
The ecosystem is currently dominated by the rapid adoption of the **Qwen3.8-27B** family, which has sparked a massive wave of community fine-tunes and quantizations, particularly focused on "uncensored" and high-performance coding variants. Simultaneously, **MiniMax-H3** has established itself as the premier open-weight multimodal generation suite, with both its image and video components seeing millions of downloads and rapid integration into ComfyUI workflows. There is a notable surge in localized, high-efficiency inference models, evidenced by the popularity of NVFP4 quantizations and GGUF formats for mid-sized models like the 9B and 27B parameter classes. Video generation capabilities are becoming increasingly multimodal, with trends shifting toward image-to-video and video-to-video workflows rather than pure text-to-video. The "uncensored" or "heretic" modification of base instruction-tuned models remains a strong sub-trend, indicating high demand for models that bypass default safety refusals for creative and technical tasks.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)
*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
    *   **Author:** Qwen | **Likes:** 20,115 | **Downloads:** 6,547,772
    *   This is the benchmark instruction-tuned large language model of the week, driving the entire current sub-ecosystem of fine-tunes due to its balanced performance in coding and general reasoning.
*   **[deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)**
    *   **Author:** deepseek-ai | **Likes:** 5,733 | **Downloads:** 460,551
    *   A highly efficient flash variant of the DeepSeek V4.1 architecture, trending for its speed in inference-heavy pipelines and strong multimodal text capabilities.
*   **[moonshotai/Kimi-K3.1-Pro](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)**
    *   **Author:** moonshotai | **Likes:** 2,105 | **Downloads:** 46,766
    *   Moonshot AI’s latest pro-tier model, notable for its compressed tensor implementation which allows for higher throughput in deployment environments.
*   **[Edge0/Edge0-145B-NVFP4](https://huggingface.co/Edge0/Edge0-145B-NVFP4)**
    *   **Author:** Edge0 | **Likes:** 288 | **Downloads:** 41,606
    *   A massive 145B Mixture-of-Experts model optimized for edge inference via NVFP4 quantization, signaling a shift toward running frontier-scale architectures on localized hardware.
*   **[NousResearch/Arete-27B](https://huggingface.co/NousResearch/Arete-27B)**
    *   **Author:** NousResearch | **Likes:** 612 | **Downloads:** 7,497
    *   A specialized supervised fine-tune focused on ethical alignment and robust instruction following, representing the "aligned" counter-party to the uncensored trends.

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)
*   **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**
    *   **Author:** MiniMaxAI | **Likes:** 6,946 | **Downloads:** 6,057,372
    *   The flagship video generation model of the cycle, highly favored for its image-to-video consistency and raw output quality, serving as the base for numerous community derivatives.
*   **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
    *   **Author:** Lightricks | **Likes:** 12,057 | **Downloads:** 2,754,355
    *   A diffusion-based model specialized in rapid image-to-video transformation, trending due to its efficiency and strong performance in short-form content generation.
*   **[MiniMaxAI/MiniMax-H3-Image](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image)**
    *   **Author:** MiniMaxAI | **Likes:** 1,180 | **Downloads:** 571,067
    *   The corresponding text-to-image and image-to-image foundation model for the H3 family, gaining popularity for its coherence and detail retention.
*   **[facebook/sam3](https://huggingface.co/facebook/sam3)**
    *   **Author:** facebook | **Likes:** 6,656 | **Downloads:** 2,011,153
    *   The latest iteration of Segment Anything Model (SAM3), extended for video segmentation, which is becoming essential for video editing and asset isolation pipelines.
*   **[black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy)**
    *   **Author:** black-forest-labs | **Likes:** 3,248 | **Downloads:** 1,182,267
    *   A ComfyUI-optimized version of the Flux 3 "Klein" architecture, highlighting the market preference for plug-and-play image editing solutions.
*   **[speridlabs/idol](https://huggingface.co/speridlabs/idol)**
    *   **Author:** speridlabs | **Likes:** 2,362 | **Downloads:** 33,423
    *   A Gaussian Splatting-based model for high-quality image-to-3D reconstruction, trending in the 3D content creation and virtual reality sectors.
*   **[hieurashi-ai/Haru-4B](https://huggingface.co/hieurashi-ai/Haru-4B)**
    *   **Author:** hieurashi-ai | **Likes:** 304 | **Downloads:** 2,098
    *   A compact full-duplex speech-to-speech model, indicating an early trend toward real-time conversational AI that handles pauses and interruptions naturally.
*   **[adventists-ai/Sophon-Realtime-v1](https://huggingface.co/adventists-ai/Sophon-Realtime-v1)**
    *   **Author:** adventists-ai | **Likes:** 272 | **Downloads:** 0
    *   A new entrant in the any-to-any multimodal space with a focus on paralinguistics, designed for realistic voice agent interactions.

### 🔧 Specialized Models (code, math, medical, embeddings)
*   **[facebook/dinov3-vitl16-pretrain-lvd1689m](https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m)**
    *   **Author:** facebook | **Likes:** 2,285 | **Downloads:** 687,007
    *   A pre-trained ViT model for image feature extraction, widely used as a backbone for downstream visual tasks like classification and retrieval.
*   **[Cactus-Compute/mirage](https://huggingface.co/Cactus-Compute/mirage)**
    *   **Author:** Cactus-Compute | **Likes:** 319 | **Downloads:** 28,553**
    *   A zero-shot object detection model that processes image-text inputs, offering a streamlined alternative to complex detection pipelines.
*   **[pyannote/speaker-diarization-community-1](https://huggingface.co/pyannote/speaker-diarization-community-1)**
    *   **Author:** pyannote | **Likes:** 4,427 | **Downloads:** 4,905,484**
    *   A community-stable version of the speaker diarization pipeline, critical for transcription workflows that require identifying who spoke when in audio recordings.
*   **[thinkingmachines/Inkling-2-Small](https://huggingface.co/thinkingmachines/Inkling-2-Small)**
    *   **Author:** thinkingmachines | **Likes:** 341 | **Downloads:** 7,329**
    *   A compact image-text model likely optimized for edge deployment, reflecting the trend of making specialized multimodal capabilities available on lower-end devices.

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)
*   **[xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic](https://huggingface.co/xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic)**
    *   **Author:** xtools-at | **Likes:** 7,524 | **Downloads:** 27,037**
    *   The most "liked" fine-tune of the week, combining DeepSeek and Qwen architectures in a 9B package with safety filters removed, appealing to users seeking unconstrained local generation.
*   **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**
    *   **Author:** unsloth | **Likes:** 5,996 | **Downloads:** 6,566,295**
    *   The standard quantization for the Qwen3.8-27B model, enabling local execution on consumer hardware and serving as the base for further community modifications.
*   **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**
    *   **Author:** DavidAU | **Likes:** 3,167 | **Downloads:** 1,708,637**
    *   A highly specialized, multi-stage fine-tune focused on coding capabilities ("NEO-CODER-MAX") with uncensored behavior, targeting developers who need local, fast, and compliant-free coding assistance.
*   **[huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF)**
    *   **Author:** huihui-ai | **Likes:** 2,174 | **Downloads:** 4,202,683**
    *   A popular "abliterated" version of Qwen3.8-27B, where safety layers have been mathematically removed rather than fine-tuned out, offering a distinct personality to the base model.
*   **[Comfy-Org/MiniMax-H3-Image](https://huggingface.co/Comfy-Org/MiniMax-H3-Image)**
    *   **Author:** Comfy-Org | **Likes:** 411 | **Downloads:** 1,973,388**
    *   A ComfyUI-native implementation of the MiniMax-H3-Image model, lowering the barrier to entry for artists and designers to use this specific video/image stack.

## 3. Ecosystem Signal
The model ecosystem is currently characterized by a "Qwen3.8-27B Supercycle," where the base model acts as a foundational canvas for extensive community modification. While Qwen and DeepSeek lead in raw language modeling, the community is heavily invested in derivative work, specifically "uncensored" or "heretic" variations that strip away safety alignment to maximize utility in creative and technical domains. This suggests that while enterprises may prefer aligned versions, the open-weight community prioritizes controllability and unconstrained generation.

In parallel, multimodal generation is consolidating around the **MiniMax-H3** ecosystem. The high download counts for both the image and video components, along with the rapid appearance of ComfyUI integrations, indicate that MiniMax-H3 is becoming the de facto standard for open-source video generation. The shift from text-to-video toward image-to-video dominance highlights a user preference for controlling the starting frame of a video.

Finally, there is a clear trend toward **edge optimization**. The rise of NVFP4 quantizations (e.g., Edge0-145B) and GGUF variants for 9B–27B models indicates that users are increasingly looking to run powerful, near-frontier models locally on modern consumer hardware (GPUs with 16-24GB VRAM). This democratization of access is driving the heavy fine-tuning activity observed in the GGUF category, as users seek to optimize these local models for specific niche tasks like coding or roleplay.

## 4. Worth Exploring

*   **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**: **Reasoning:** If you are building a new product or pipeline, this is the safest and most capable base model to start with. Its massive download count means there is the most extensive documentation, community support, and quantization options available. Even if you eventually switch to a fine-tune, starting with the vanilla Qwen3.8-27B allows you to establish a performance baseline.
*   **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**: **Reasoning:** For any team involved in media production or marketing, this is the current king of open-source video generation. Its ability to handle image-to-video workflows with high fidelity makes it superior to older models for creating B-roll, product demonstrations, or dynamic social media content. The ComfyUI integration makes it accessible without deep coding knowledge.
*   **[xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic](https://huggingface.co/xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic)**: **Reasoning:** This model is worth studying to understand the current "uncensored" community dynamics. It represents the hybrid architecture trend (combining DeepSeek and Qwen traits) and is specifically optimized for 9B parameter efficiency, making it a prime candidate for understanding how to deploy capable, unconstrained LLMs on mid-range hardware without requiring high-end VRAM.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*