/**
 * Provider barrel — re-exports and factory.
 *
 * Usage:
 *   import { createProvider, type LlmProvider } from "./providers/index.ts";
 */

export type { LlmProvider, ProviderFactory } from "./types.ts";
export { OpenAICompatibleProvider } from "./openai-compatible.ts";
export { AnthropicProvider } from "./anthropic.ts";
export { OpenAIProvider } from "./openai.ts";
export { GitHubCopilotProvider } from "./github-copilot.ts";
export { OpenRouterProvider } from "./openrouter.ts";
export { DeepSeekProvider } from "./deepseek.ts";
export { AgnesProvider } from "./agnes.ts";
export { ZhipuProvider } from "./zhipu.ts";
export { GroqProvider } from "./groq.ts";
export { GeminiProvider } from "./gemini.ts";
export { CerebrasProvider } from "./cerebras.ts";
export { SiliconFlowProvider } from "./siliconflow.ts";
export { GithubModelsProvider } from "./github-models.ts";
export { MistralProvider } from "./mistral.ts";
export { HfProvider } from "./hf.ts";
export { CustomProvider, assertSafeBaseUrl } from "./custom.ts";
export { BailianProvider } from "./bailian.ts";

import type { LlmProvider, ProviderFactory } from "./types.ts";
import { AnthropicProvider } from "./anthropic.ts";
import { OpenAIProvider } from "./openai.ts";
import { GitHubCopilotProvider } from "./github-copilot.ts";
import { OpenRouterProvider } from "./openrouter.ts";
import { DeepSeekProvider } from "./deepseek.ts";
import { AgnesProvider } from "./agnes.ts";
import { ZhipuProvider } from "./zhipu.ts";
import { GroqProvider } from "./groq.ts";
import { GeminiProvider } from "./gemini.ts";
import { CerebrasProvider } from "./cerebras.ts";
import { SiliconFlowProvider } from "./siliconflow.ts";
import { GithubModelsProvider } from "./github-models.ts";
import { MistralProvider } from "./mistral.ts";
import { HfProvider } from "./hf.ts";
import { CustomProvider } from "./custom.ts";
import { BailianProvider } from "./bailian.ts";

// ---------------------------------------------------------------------------
// Single source of truth — add new providers here only.
// custom:名字 是泛化通道（{NAME}_API_KEY/BASE_URL/MODEL + SSRF 校验），不走本表。
// ---------------------------------------------------------------------------

const PROVIDERS = {
  anthropic: (model) => new AnthropicProvider(model),
  openai: (model) => new OpenAIProvider({ model }),
  "github-copilot": (model) => new GitHubCopilotProvider({ model }),
  openrouter: (model, apiKey) => new OpenRouterProvider({ model, apiKey }),
  deepseek: (model, apiKey) => new DeepSeekProvider({ model, apiKey }),
  agnes: (model, apiKey) => new AgnesProvider({ model, apiKey }),
  zhipu: (model, apiKey) => new ZhipuProvider({ model, apiKey }),
  groq: (model, apiKey) => new GroqProvider({ model, apiKey }),
  gemini: (model, apiKey) => new GeminiProvider({ model, apiKey }),
  cerebras: (model) => new CerebrasProvider({ model }),
  siliconflow: (model, apiKey) => new SiliconFlowProvider({ model, apiKey }),
  "github-models": (model, apiKey) => new GithubModelsProvider({ model, apiKey }),
  mistral: (model, apiKey) => new MistralProvider({ model, apiKey }),
  hf: (model, apiKey) => new HfProvider({ model, apiKey }),
  bailian: (model, apiKey) => new BailianProvider({ model, apiKey }),
} satisfies Record<string, ProviderFactory>;

/** Supported provider name — derived from the PROVIDERS registry. */
export type ProviderName = keyof typeof PROVIDERS;

/** All valid provider names — derived from the registry. */
export const VALID_PROVIDER_NAMES = Object.keys(PROVIDERS) as ProviderName[];

/**
 * Create an LLM provider by name.
 *
 * Reads `LLM_PROVIDER` env var when no explicit name is given.
 * `model` 覆盖该源的默认模型；`apiKey` 覆盖该源的 env key（多 key 轮转用，2026-09-05）。
 * `custom:名字` 走泛化通道（{NAME}_API_KEY/BASE_URL/MODEL + SSRF 校验），不查本表。
 * Throws a descriptive error if the provider name is invalid.
 *
 * Log safety: only the provider *name* is logged — never API keys or
 * endpoint URLs.
 */
export function createProvider(name?: string, model?: string, apiKey?: string): LlmProvider {
  const providerName = name ?? (process.env["LLM_PROVIDER"] as string) ?? "anthropic";

  // 泛化通道：custom:名字 → CustomProvider（SSRF 校验在构造期 fail-fast）
  if (providerName.startsWith("custom:")) {
    const slug = providerName.slice("custom:".length).trim();
    if (!slug) throw new Error(`Invalid custom provider: "${providerName}"（名字为空）`);
    return new CustomProvider(slug, { model, apiKey });
  }

  const factory = (PROVIDERS as Record<string, ProviderFactory | undefined>)[providerName];
  if (!factory) {
    throw new Error(
      `Invalid LLM provider: "${providerName}". ` +
        `Valid providers are: ${VALID_PROVIDER_NAMES.join(", ")}. ` +
        `Set the LLM_PROVIDER env var to one of these values.`,
    );
  }

  console.log(`[providers] Using LLM provider: ${providerName}${model ? ` (model: ${model})` : ""}`);
  return factory(model, apiKey);
}
