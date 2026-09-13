/**
 * 阿里云百炼（DashScope）provider — OpenAI 兼容端点。
 *
 * 用途：GitTok 付费兜底压舱石 qwen3.7-flash（Batch 半价 ¥22.5 全站，2026-09-13 定）；
 * 免费矩阵额度耗尽后由编队接棒，保证全量建库不中断。
 *
 * Env vars:
 *   BAILIAN_API_KEY  - sk-ws- 前缀（WorkSpace 新式键，含点）
 *   BAILIAN_MODEL    - model name（默认: qwen3.7-flash）
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

const BAILIAN_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";

export class BailianProvider extends OpenAICompatibleProvider {
  readonly name = "bailian";

  constructor(opts?: { apiKey?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["BAILIAN_API_KEY"],
      baseURL: BAILIAN_BASE_URL,
      model: opts?.model ?? process.env["BAILIAN_MODEL"] ?? "qwen3.7-flash",
    });
  }

  override async call(prompt: string, maxTokens: number): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
      model: this.model,
      max_completion_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
      // qwen3 系默认开思考；生产 prompt 要求直出 JSON，显式关闭（与免费矩阵试产口径一致）
      enable_thinking: false,
    };
    const response = await this.client.chat.completions.create(params);
    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`Unexpected empty response from ${this.name}`);
    return text;
  }
}
