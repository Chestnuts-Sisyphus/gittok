/**
 * OpenRouter provider — OpenAI-compatible endpoint via openrouter.ai.
 *
 * 免费层用法（2026-09-05）：免费模型（:free 后缀）单模型 50 RPD、账号 1000 RPD；
 * `源@模型` 挂多免费模型即多 worker。注意多数 ：free 是思考型（content 常为空），
 * 实测干净稳定的：google/gemma-4-31b-it:free（其余慎用，评分输出会空转）。
 *
 * EXTRA_PARAMS（2026-09-13 B 会话矩阵接入）：推理型免费模型（如
 * nvidia/nemotron-3-ultra-550b-a55b:free）实测会「思考吃爆输出预算 → JSON 截断」，
 * 须显式 `{"reasoning":{"enabled":false},"max_tokens":8192}`。用
 * OPENROUTER_EXTRA_PARAMS 环境变量注入（JSON 对象字面量），不写死模型名。
 *
 * Env vars:
 *   OPENROUTER_API_KEY  - API key
 *   OPENROUTER_MODEL    - model name (default: anthropic/claude-sonnet-4)
 *   OPENROUTER_EXTRA_PARAMS - 可选，附加请求体参数（JSON 对象）
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";
import { parseExtraParams } from "./custom.ts";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export class OpenRouterProvider extends OpenAICompatibleProvider {
  readonly name = "openrouter";
  /** 附加请求体参数；显式传入优先，否则读 OPENROUTER_EXTRA_PARAMS */
  private readonly extraParams: Record<string, unknown>;

  constructor(opts?: { apiKey?: string; model?: string; extraParams?: Record<string, unknown> }) {
    super({
      apiKey: opts?.apiKey ?? process.env["OPENROUTER_API_KEY"],
      baseURL: OPENROUTER_BASE_URL,
      model: opts?.model ?? process.env["OPENROUTER_MODEL"] ?? "anthropic/claude-sonnet-4",
    });
    this.extraParams =
      opts?.extraParams ?? parseExtraParams(process.env["OPENROUTER_EXTRA_PARAMS"], "openrouter");
  }

  // OpenRouter 兼容层认 max_tokens（基类的 max_completion_tokens 会被忽略导致输出超长）
  override async call(prompt: string, maxTokens: number): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
      model: this.model,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
      ...this.extraParams,
    };
    const response = await this.client.chat.completions.create(params);
    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`Unexpected empty response from ${this.name}`);
    return text;
  }
}
