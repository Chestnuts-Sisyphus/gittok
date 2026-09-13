# Hugging Face Trending Models Digest 2026-09-14

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-13 21:56 UTC

---

# Hugging Face Trending Models Digest

### 1. Today's Highlights

The Hugging Face trending list highlights major advancements in high-throughput architectures, open video generation, and task-specific domain fine-tunes. **Qwen3.8** and **GLM-5.3** continue to dominate as primary base platforms, with specialized "Flash" variants (`DeepSeek-V4.1-Flash`, `Qwen3.8-Flash-Next`, and `GLM-5.3-Flash`) taking center stage for high-efficiency multimodal processing. Generative video is experiencing rapid ecosystem adoption, led by **MiniMax-H3** and **LTX-2.5**, which are quickly spawning community fine-tunes and workflow integrations. Beyond standard conversational AI, open weights are making aggressive inroads into specialized verticals such as autonomous driving planning (`Qwen-Drive-1.0-4B`), music synthesis (`YuE2-3B`), and time-series forecasting (`timesfm-3.0-pytorch`).

---

### 2. Trending Models

#### 🧠 Language Models
* **[deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)**  
  *Author:* deepseek-ai | *Likes:* 2,191 | *Downloads:* 244,457  
  *What it is:* A high-throughput, low-latency vision-language model tailored for fast multimodal inference.
* **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**  
  *Author:* Qwen | *Likes:* 14,960 | *Downloads:* 7,768,964  
  *What it is:* A powerhouse open multimodal language model offering near-flagship performance across reasoning and vision tasks.
* **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)**  
  *Author:* Qwen | *Likes:* 5,161 | *Downloads:* 624,390  
  *What it is:* An experimental, high-speed conversational vision-language model exploring next-generation Qwen architectures.
* **[zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)**  
  *Author:* zai-org | *Likes:* 2,302 | *Downloads:* 1,576,209  
  *What it is:* A lightweight, ultra-fast multimodal model designed for real-time visual conversation and document processing.
* **[openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)**  
  *Author:* openbmb | *Likes:* 1,334 | *Downloads:* 150,110  
  *What it is:* A highly efficient 2B-parameter text generation model optimized for on-device edge computing.
* **[TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B)**  
  *Author:* TokenRhythm | *Likes:* 1,736 | *Downloads:* 7,979  
  *What it is:* An agentic small language model fine-tuned on Qwen3.5 text architecture for autonomous tool calling.
* **[XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B)**  
  *Author:* XHToken | *Likes:* 1,151 | *Downloads:* 21,336  
  *What it is:* A compact 4B language model focused on balanced task performance and lightweight deployment.
* **[Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview)**  
  *Author:* Edge0 | *Likes:* 987 | *Downloads:* 3,552  
  *What it is:* A preview MoE model built for Apple Silicon MLX inference using dynamic parameter activation.
* **[nex-agi/Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini)**  
  *Author:* nex-agi | *Likes:* 754 | *Downloads:* 3,970  
  *What it is:* A compact MoE vision-language model based on Qwen3.5 architecture for fast multimodal tasks.
* **[nex-agi/Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro)**  
  *Author:* nex-agi | *Likes:* 623 | *Downloads:* 30,289  
  *What it is:* A higher-capacity MoE model optimized for advanced multimodal reasoning and instruction-following.
* **[Agnes-AI/Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash)**  
  *Author:* Agnes-AI | *Likes:* 138 | *Downloads:* 474  
  *What it is:* An emerging lightweight vision-text model tailored for enterprise text generation pipelines.

#### 🎨 Multimodal & Generation
* **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**  
  *Author:* MiniMaxAI | *Likes:* 5,236 | *Downloads:* 4,819,845  
  *What it is:* A state-of-the-art open-weights image-and-text-to-video generation model with high dynamic fidelity.
* **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**  
  *Author:* Lightricks | *Likes:* 3,730 | *Downloads:* 1,548,442  
  *What it is:* A single-file diffusion video model supporting image-to-video, text-to-video, and video-to-video tasks.
* **[m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B)**  
  *Author:* m-a-p | *Likes:* 396 | *Downloads:* 3,707  
  *What it is:* An advanced music generation model incorporating symbolic planning and agentic editing for structured compositions.
* **[tencent/AuK](https://huggingface.co/tencent/AuK)**  
  *Author:* tencent | *Likes:* 184 | *Downloads:* 1,202  
  *What it is:* A zero-shot text-to-speech model providing natural audio voice cloning from short audio samples.

#### 🔧 Specialized Models
* **[google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)**  
  *Author:* google | *Likes:* 774 | *Downloads:* 797,832  
  *What it is:* Google's foundational PyTorch model specifically trained for zero-shot time-series forecasting.
* **[dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8)**  
  *Author:* dealignai | *Likes:* 429 | *Downloads:* 30,310  
  *What it is:* A security-specialized, unaligned GLM-5.3 MoE variant targeting penetration testing and vulnerability analysis.
* **[Qwen/Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B)**  
  *Author:* Qwen | *Likes:* 196 | *Downloads:* 4,119  
  *What it is:* A domain-specific vision model built for end-to-end autonomous driving trajectory synthesis and motion

---
*This digest is auto-generated by [GitTok](https://github.com/Chestnuts-Sisyphus/gittok).*