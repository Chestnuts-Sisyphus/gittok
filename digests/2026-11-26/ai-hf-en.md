# Hugging Face Trending Models Digest 2026-11-26

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-11-26 02:33 UTC

---

### Hugging Face Trending Models Digest (2026-11-26)

#### 1. Today's Highlights
The AI landscape is currently dominated by the massive adoption of the **Qwen3.8-27B** architecture, which has sparked a flurry of specialized fine-tunes and high-performance GGUF quantizations. Multimodal capabilities are surging, with **Inkling-2-Mini** becoming a community favorite for lightweight conversational vision tasks, while high-fidelity video generation continues to push boundaries via models like **LTX-2.5**. We are also seeing a shift toward specialized hardware-optimized models, such as Apple's **DepthPro2**, indicating a growing focus on deploying efficient, high-utility models directly to edge devices.

---

#### 2. Trending Models

**🧠 Language Models (LLMs)**
*   [**Qwen/Qwen3.8-27B**](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 21,802 likes, 6,047,011 downloads | The current gold standard for 27B-class open-weights models, serving as the base for dozens of community derivatives.
*   [**SulphurAI/Sulphur-3**](https://huggingface.co/SulphurAI/Sulphur-3) | SulphurAI | 1,089 likes, 189,735 downloads | A highly efficient fine-tune of the MiniMax-H3 architecture gaining traction for its performance-to-size ratio.
*   [**Aleph-Alpha/Kolibri-1.1**](https://huggingface.co/Aleph-Alpha/Kolibri-1.1) | Aleph-Alpha | 156 likes, 837 downloads | A specialized MoE (Mixture of Experts) model focused on reasoning capabilities.

**🎨 Multimodal & Generation**
*   [**Lightricks/LTX-2.5**](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 13,447 likes, 3,041,405 downloads | A powerhouse for video generation, currently leading the charge in open-weights image-to-video capabilities.
*   [**thinkingmachines/Inkling-2-Mini**](https://huggingface.co/thinkingmachines/Inkling-2-Mini) | thinkingmachines | 6,044 likes, 96,527 downloads | An exceptionally popular mini multimodal model for image-text-to-text conversational loops.
*   [**apple/DepthPro2**](https://huggingface.co/apple/DepthPro2) | apple | 1,254 likes, 0 downloads | A cutting-edge advancement in monocular and video depth estimation from Apple.
*   [**facebook/sam-3d-body-dinov3**](https://huggingface.co/facebook/sam-3d-body-dinov3) | facebook | 2,002 likes, 20,983 downloads | A sophisticated Meta-developed tool for human pose estimation and 3D mesh recovery.

**🔧 Specialized Models**
*   [**inworld/voice-isolator**](https://huggingface.co/inworld/voice-isolator) | inworld | 897 likes, 15,244 downloads | An essential utility for speech enhancement and audio denoising in production environments.
*   [**llamaindex/OCRia-nano-1**](https://huggingface.co/llamaindex/OCRia-nano-1) | llamaindex | 234 likes, 126 downloads | A compact, ONNX-optimized model designed for ultra-efficient OCR and PDF parsing.

**📦 Fine-tunes & Quantizations**
*   [**DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...**](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 4,376 likes, 1,873,950 downloads | A massive, community-favorite "kitchen sink" GGUF merge of the Qwen 27B base model.
*   [**unsloth/Inkling-2-Mini-GGUF**](https://huggingface.co/unsloth/Inkling-2-Mini-GGUF) | unsloth | 1,380 likes, 2,445,633 downloads | The high-performance, quantized version of Inkling-2-Mini optimized for local inference via Unsloth.
*   [**prism-ml/Ternary-Bonsai-2.5-27B-GGUF**](https://huggingface.co/prism-ml/Ternary-Bonsai-2.5-27B-GGUF) | prism-ml | 346 likes, 59,366 downloads | An aggressive 2-bit quantization experiment demonstrating the current push for extreme parameter efficiency.

---

#### 3. Ecosystem Signal
The current trend suggests a market bifurcation: massive demand for high-parameter generalist models (like the Qwen 27B family) and a simultaneous surge in "Small Language Model" (SLM) optimization. We are seeing a distinct "quantization-first" culture where the GGUF version of a model often generates significantly higher download volume than the base weights (e.g., *Inkling-2-Mini*). This indicates that the vast majority of Hugging Face users are prioritizing local inference on consumer hardware over cloud-based API solutions.

Furthermore, the "Uncensored" and "Abliterated" sub-genre of fine-tunes continues to occupy a significant footprint in the trending list, as seen with *AtomicChat* and *orcarouter*. These releases signal a strong developer appetite for models stripped of specific safety guardrails, often targeting private, local deployment for coding or creative writing. Open-weights model families like *Qwen* and *MiniMax* have effectively democratized the ability to build sophisticated RAG and conversational agents, pushing enterprise-grade performance into the hands of the open-source community.

---

#### 4. Worth Exploring
1.  [**LTX-2.5**](https://huggingface.co/Lightricks/LTX-2.5): Essential for anyone tracking the state-of-the-art in generative video; it sets a new baseline for motion quality and consistency.
2.  [**Inkling-2-Mini**](https://huggingface.co/thinkingmachines/Inkling-2-Mini): A must-study for developers looking to deploy multimodal AI on constrained devices; it is the current benchmark for how small a vision-language model can be while remaining highly functional.
3.  [**DepthPro2**](https://huggingface.co/apple/DepthPro2): A highly professional tool from Apple that represents the current peak of vision-geometry research; invaluable for developers working in AR or 3D computer vision.

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*