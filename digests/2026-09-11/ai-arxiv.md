# ArXiv AI 研究日报 2026-09-11

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-10 22:04 UTC

---

以下是为您整理的 **2026年9月11日 ArXiv AI 学术前沿日报**。今日论文涵盖了智能体记忆生命周期管理、系统级部署评测、具身智能控制以及长上下文与推理效率优化等热门方向。

---

### 1. 今日速览

今日 ArXiv 研究呈现出**从纯模型能力演进向系统级真实落地与智能体长效认知演进**的鲜明趋势：
1. **智能体记忆精细化管理**：研究者开始将智能体记忆拆分为“持久存储”与“当下使用”，提出动态遗忘与生命周期管理机制，解决长剧本/长任务中的认知干扰问题；
2. **系统级与路由级评估突破**：评估视角从“单一 Checkpoint 性能”转向“服务路由与基础设施整合系统”（如评估真实部署环境下的精度、时延与 KV-Cache 复用）；
3. **具身智能与多设备协作**：VLM Agent 正在从单设备 GUI 操作扩展到跨设备交互，并以语义接口形式直接赋能机器人控制。

---

### 2. 重点论文分类速览

#### 🧠 大语言模型（架构、训练、对齐、评估）

*   **ConvMem: Convolutional Memory for Long-Context Reasoning**
    *   **链接**: http://arxiv.org/abs/2609.10441v1
    *   **作者**: Hongming Zhang, Zhaozhen Gu, Fengshuo Bai et al.
    *   **一句话说明**: 引入卷积记忆（Convolutional Memory）机制，通过分段读取与动态卷积状态更新，突破了传统 LLM 的固定上下文窗口限制，提升长文本推理能力。
*   **Building Multilingual Bridges: Data Mixing as the Pillar of Generalization for In-Language Reasoning**
    *   **链接**: http://arxiv.org/abs/2609.10445v1
    *   **作者**: Mehrnaz Mofakhami, Ananya Sahu, Alejandro R. Salamanca et al.
    *   **一句话说明**: 揭示了当前推理模型过度依赖英文思考的弊端，提出通过精细的数据混合策略，实现非英语语种的原生“目标语言思考与推理”。
*   **Forgetting Only What Matters: Layer-Selective Unlearning toward Robust LLMs**
    *   **链接**: http://arxiv.org/abs/2609.10439v1
    *   **作者**: Ravi Ranjan, Olivera Kotevska, Agoritsa Polyzou
    *   **一句话说明**: 提出层选择性机器遗忘（Unlearning）方法，仅精准消除存储敏感/版权数据的特定网络层偏置，避免整体模型泛化能力损伤。
*   **RiLM: Parameter-Efficient Language Modeling via Geodesic Decoding**
    *   **链接**: http://arxiv.org/abs/2609.10305v1
    *   **作者**: Fang Li
    *   **一句话说明**: 针对 1M 参数量级边缘端超小模型，利用黎曼几何流形解码替代传统的庞大输出矩阵 $W_{out}$，极大地节省了参数量与内存开销。

#### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

*   **JarvisGUI: Towards Cross-Device GUI Agents with Dynamic Task Composition**
    *   **链接**: http://arxiv.org/abs/2609.10451v1
    *   **作者**: Zixiang Chen, Yuheng Lu, Zihao Cheng et al.
    *   **一句话说明**: 突破单设备 GUI 智能体局限，提出首个支持动态任务合成与跨设备（PC/手机/云端）状态同步的 GUI Agent 框架。
*   **TRACE: Training Reasoning Agents for Causal Exploration with Synthesized Rewards**
    *   **链接**: http://arxiv.org/abs/2609.10315v1
    *   **作者**: Rui Sun, Zhan Shi, Bing He
    *   **一句话说明**: 将可验证奖励强化学习（RLVR）拓展至复杂因果诊断领域，利用合成奖励训练智能体进行主动干预与归因推理。
*   **What Should an Agent Forget? Separating What Is Stored from What Is Used**
    *   **链接**: http://arxiv.org/abs/2609.10263v1
    *   **作者**: Yuhang Li, Yuchen Li
    *   **一句话说明**: 提出 RD-Forget 框架，解耦智能体的“长效事实存储”与“特定问题检索使用”，无需微调即可防止陈旧信息干扰当前推理。
*   **Show-Harness: Just a VLM Agent Can Play Robots**
    *   **链接**: http://arxiv.org/abs/2609.10522v1
    *   **作者**: Yanzhe Chen, Zechen Bai, Zhijun Cao et al.
    *   **一句话说明**: 搭建紧凑的语义接口，直接将视觉语言模型（VLM）的意图转换为机器人控制动作，降低具身智能控制门槛。

#### 🔧 方法与框架（新技术、基准测试、效率优化）

*   **IBIB: A Protocol for Measuring Enterprise AI Systems by Serving Route, Not Model Identifier**
    *   **链接**: http://arxiv.org/abs/2609.10494v1
    *   **作者**: Blake Stenstrom, Charangan Vasantharajan, Brian Sathianathan
    *   **一句话说明**: 指出仅针对模型 Checkpoint 评估的局限性，提出了首个按照“服务路由（包含权重、量化精度、输出契约与 Harness）”进行企业级 AI 部署测评的新协议。
*   **KVShareArena: KV-Cache Reuse Across Contexts and Model Checkpoints**
    *   **链接**: http://arxiv.org/abs/2609.10266v1
    *   **作者**: Xi Shi, Qian Lou
    

---
*本日报由 [GitTok](https://github.com/Chestnuts-Sisyphus/gittok) 自动生成。*