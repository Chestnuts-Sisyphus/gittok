# Hugging Face Trending Models Digest 2026-11-14

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-11-14 00:33 UTC

---

### 1. Today's Highlights

The Hugging Face ecosystem is currently dominated by massive interest in Qwen3.8-27B and its various community iterations, alongside cutting-edge video and spatial generation suites like MiniMax-H3 and Lightricks' LTX-2.5. Large open-weight multimodal foundation models are seeing rapid community optimization, with GGUF quantizations and "abliterated" uncensored variations driving massive download volumes. Meanwhile, Meta's release of the SAM 3 and DINOv3 families highlights a strong concurrent push in advanced computer vision and mask generation.

---

### 2. Trending Models

#### 🧠 Language Models
* **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**
  * **Author:** Qwen | **Likes:** 19,875 | **Downloads:** 6,960,395
  * A powerful new open-weight base conversational model driving massive mainstream adoption and ecosystem expansion.
* **[moonshotai/Kimi-K3.1-Pro](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)**
  * **Author:** moonshotai | **Likes:** 2,031 | **Downloads:** 40,953
  * An advanced text and multimodal reasoning model from Moonshot AI utilizing compressed tensors for efficient deployment.
* **[NousResearch/Arete-27B](https://huggingface.co/NousResearch/Arete-27B)**
  * **Author:** NousResearch | **Likes:** 548 | **Downloads:** 5,545
  * A community-favourite supervised fine-tune built on the Qwen architecture, optimized for complex reasoning tasks.

#### 🎨 Multimodal & Generation
* **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**
  * **Author:** Lightricks | **Likes:** 11,780 | **Downloads:** 2,778,909
  * A state-of-the-art video generation and editing pipeline driving millions of downloads for high-fidelity motion graphics.
* **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**
  * **Author:** MiniMaxAI | **Likes:** 6,894 | **Downloads:** 6,536,038
  * A powerhouse image-text-to-video diffusion model serving as the backbone for several trending downstream video workflows.
* **[black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy)**
  * **Author:** black-forest-labs | **Likes:** 3,093 | **Downloads:** 1,330,289
  * A ComfyUI-native integration of Black Forest Labs' latest Flux image generation engine for rapid iterative editing.

#### 🔧 Specialized Models
* **[facebook/sam3](https://huggingface.co/facebook/sam3)**
  * **Author:** facebook | **Likes:** 6,532 | **Downloads:** 2,092,498
  * Meta's next-generation Segment Anything model tailored for advanced mask generation and video feature extraction.
* **[facebook/dinov3-vitl16-pretrain-lvd1689m](https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m)**
  * **Author:** facebook | **Likes:** 2,197 | **Downloads:** 698,339
  * A foundational vision transformer pretrained for dense image feature extraction across massive visual datasets.
* **[speridlabs/idol](https://huggingface.co/speridlabs/idol)**
  * **Author:** speridlabs | **Likes:** 2,295 | **Downloads:** 31,367
  * An innovative open-source model converting 2D imagery into 3D Gaussian splats.

#### 📦 Fine-tunes & Quantizations
* **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)**
  * **Author:** unsloth | **Likes:** 5,877 | **Downloads:** 6,253,865
  * Highly optimized GGUF quantizations of the Qwen 27B model for local hardware acceleration.
* **[huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF)**
  * **Author:** huihui-ai | **Likes:** 2,080 | **Downloads:** 4,051,917
  * An abliterated, uncensored variant of Qwen3.8-27B engineered to remove restrictive guardrails while maintaining core capability.
* **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**
  * **Author:** DavidAU | **Likes:** 3,052 | **Downloads:*** 1,639,400
  * An aggressively customized, multi-merged GGUF build targeting maximum coding prowess and creative expression.

---

### 3. Ecosystem Signal

The current Hugging Face trending landscape illustrates a mature open-weight ecosystem deeply anchored around the **Qwen3.5/3.8** and **MiniMax-H3** core model families. Rather than waiting for proprietary APIs, developers and community tinkerers are immediately adopting foundational releases and aggressively branching them out via GGUF quantizations, abliterations, and specialized creative fine-tunes (e.g., "Heretic" or coding-focused derivatives). 

Concurrently, multimodal and generative media—spanning text-to-video (LTX-2.5, MiniMax-H3), 3D spatial reconstruction (idol, sam-3d-body), and advanced segmentation (SAM 3)—are capturing massive engagement alongside traditional LLMs. This reflects a broader industry shift where open-weight multimodal models are no longer lagging behind closed counterparts, sparking intense local-deployment activity and developer-driven optimization.

---

### 4. Worth Exploring

1. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** — Essential for anyone benchmarking state-of-the-art open-weight reasoning and conversational capabilities; serves as the baseline for the current generation of community fine-tunes.
2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** — A must-try for video generation enthusiasts looking to experiment with state-of-the-art cinematic motion and video-to-video editing workflows locally or in cloud pipelines.
3. **[facebook/sam3](https://huggingface.co/facebook/sam3)** — Highly recommended for computer vision engineers wanting to leverage Meta's latest object segmentation and video feature extraction advances in production architectures.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*