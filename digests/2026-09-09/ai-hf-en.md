# Hugging Face Trending Models Digest 2026-09-09

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-08 22:10 UTC

---

# Hugging Face Trending Models Digest

## Today's Highlights

The open-weight ecosystem is undergoing a massive shift toward high-efficiency multimodal architectures and advanced video generation. Alibaba's **Qwen3.8** family (particularly `Qwen3.8-27B` and `Qwen3.8-Flash-Next`) dominates community activity, serving as the base for a wave of low-bit quantizations and uncensored fine-tunes. Meanwhile, experimental "Flash" vision releases from DeepSeek (`DeepSeek-V4-Flash-Vision-Exp`) and Zhipu AI (`GLM-5.3-Flash`) point to rapid optimization of vision-language processing. Finally, video generation models like `MiniMax-H3` and `LTX-2.5` continue to see surging adoption and derivative fine-tuning across the open-source community.

---

## Trending Models

### 🧠 Language Models
* **[XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B)** | XHToken | Likes: 842 | Downloads: 10,661  
  A lightweight 4B parameter text generation model offering strong efficiency for edge and local conversational deployments.
* **[openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)** | openbmb | Likes: 641 | Downloads: 2,879  
  The latest iteration of OpenBMB's compact LLM series designed to maximize reasoning capacity in ultra-small parameter scales.
* **[zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3)** | zai-org | Likes: 1,763 | Downloads: 474,141  
  A flagship open text generation model utilizing mixture architecture (`glm_moe_dsa`) for general-purpose chat and instruction following.
* **[IFM/K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B)** | IFM | Likes: 232 | Downloads: 3,205  
  A 36B total parameter MoE-style architecture with 4B active parameters optimized for low-latency instruction performance.

### 🎨 Multimodal & Generation
* **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** | Qwen | Likes: 14,383 | Downloads: 6,712,160  
  Alibaba's primary 27B vision-language foundation model, driving millions of downloads as the benchmark open multimodal model.
* **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)** | Qwen | Likes: 5,006 | Downloads: 503,263  
  An optimized, low-latency variant of Qwen3.8 tailored for rapid image-text understanding.
* **[deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp)** | deepseek-ai | Likes: 819 | Downloads: 313,547  
  An experimental vision-language release from DeepSeek emphasizing speed and visual reasoning.
* **[zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)** | zai-org | Likes: 2,169 | Downloads: 826,875  
  A fast-inference multimodal conversational model based on the GLM-5 architecture.
* **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** | Lightricks | Likes: 3,172 | Downloads: 1,644,796  
  An open video diffusion framework supporting image-to-video, text-to-video, and video-to-video pipelines.
* **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** | MiniMaxAI | Likes: 5,045 | Downloads: 4,994,268  
  A high-fidelity text-to-video and image-to-video generation model trending heavily in creative media workflows.
* **[BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2)** | BreezeBlue | Likes: 485 | Downloads: 7,243  
  A modern open-weight text-to-speech generation model built on transformer architectures.
* **[microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B)** | microsoft | Likes: 153 | Downloads: 1,449  
  A 7B streaming automatic speech recognition model from Microsoft built for low-latency transcription.

### 🔧 Specialized Models
* **[google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)** | google | Likes: 628 | Downloads: 444,052  
  Google's 3.0 foundation model for time-series forecasting, natively implemented in PyTorch.
* **[sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)** | sentence-transformers | Likes: 5,619 | Downloads: 253,331,994  
  The industry-standard compact embedding model continuing to record massive deployment traffic across production search systems.
* **[facebook/mms-300m](https://huggingface.co/facebook/mms-300m)** | facebook | Likes: 299 | Downloads: 12,388  
  Meta's Massively Multilingual Speech foundational checkpoint based on Wav2Vec2.

### 📦 Fine-tunes & Quantizations
* **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** | unsloth | Likes: 3,700 | Downloads: 10,675,683  
  Unsloth's optimized GGUF quantizations for local CPU/GPU execution of Qwen3.8-27B.
* **[unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF)** | unsloth | Likes: 836 | Downloads: 935,568  
  Quantized GGUF formats targeting the low-latency Qwen3.8-Flash-Next base model.
* **[nvidia/Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4)** | nvidia | Likes: 154 | Downloads: 26,302  
  NVIDIA's official 4-bit floating point (NVFP4) quantization utilizing ModelOpt for hardware-accelerated inference.
* **[HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)** | HauhauCS | Likes: 1,022 | Downloads: 1,715,824  
  An uncensored, abliterated multimodal fine-tune of Qwen3.8-27B packaged in GGUF format.
* **[dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8)** | dealignai | Likes: 312 |

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*