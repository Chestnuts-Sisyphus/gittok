/**
 * Custom provider — 泛化 OpenAI 兼容源（2026-09-05 免费舰队扩容）。
 *
 * 目的：以后加任何「OpenAI 兼容 + 长期免费」的源零代码——
 * LLM_FALLBACKS 写 `custom:名字`，配三个环境变量即可：
 *   {NAME}_API_KEY   - key（可逗号分隔多 key，worker 池按序取号）
 *   {NAME}_BASE_URL  - OpenAI 兼容端点（如 https://api.example.com/v1）
 *   {NAME}_MODEL     - 默认模型名
 * 可选第四个：
 *   {NAME}_EXTRA_PARAMS - 额外请求体参数（JSON 对象字面量，如
 *     `{"enable_thinking":false}`）——部分源要求显式关思考，不写会拖慢响应/污染输出；
 *     非法 JSON 或非对象直接报错（fail-fast，不静默降级）。
 *
 * 安全（SSRF 防护，硬性）：BASE_URL 只接受 http/https，拒绝 localhost/环回/
 * 私网/链路本地/保留地址——不合法直接报错不入队。校验在构造期完成（fail-fast）。
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

/** 解析 {NAME}_EXTRA_PARAMS（JSON 对象字面量）→ 附加请求体参数；缺省空对象，非法报错。 */
export function parseExtraParams(raw: string | undefined, slug: string): Record<string, unknown> {
  if (!raw || !raw.trim()) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`custom:${slug} 的 EXTRA_PARAMS 不是合法 JSON`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error(`custom:${slug} 的 EXTRA_PARAMS 必须是 JSON 对象`);
  }
  return parsed as Record<string, unknown>;
}

/** 校验 BASE_URL 防 SSRF：仅 http/https，拒 localhost/环回/私网/保留地址。 */
export function assertSafeBaseUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`custom provider BASE_URL 非法（无法解析）: "${raw}"`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`custom provider BASE_URL 协议拒绝: ${url.protocol}（仅 http/https）`);
  }
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "::" ||
    host === "::1"
  ) {
    throw new Error(`custom provider BASE_URL 主机拒绝: ${host}`);
  }
  // IPv4 私网/环回/链路本地/CGNAT/保留
  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const [a, b] = [Number(v4[1]), Number(v4[2])];
    const bad =
      a === 127 ||
      a === 10 ||
      a === 0 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 169 && b === 254) ||
      (a === 100 && b >= 64 && b <= 127) ||
      a >= 224;
    if (bad) throw new Error(`custom provider BASE_URL 为保留/私网地址: ${host}`);
  }
  // IPv6 私网/环回/链路本地/唯一本地（fc00::/7、fe80::/10 等：按前缀判）
  if (host.includes(":")) {
    const h = host.replace(/%.*$/, "");
    if (/^f[cd]/.test(h) || /^fe[89ab]/.test(h) || /^ff/.test(h)) {
      throw new Error(`custom provider BASE_URL 为 IPv6 保留地址: ${host}`);
    }
  }
  return url;
}

export class CustomProvider extends OpenAICompatibleProvider {
  override readonly name: string;
  /** 附加请求体参数（{NAME}_EXTRA_PARAMS）；构造期解析，请求时并进 body */
  private readonly extraParams: Record<string, unknown>;

  constructor(
    slug: string,
    opts?: { apiKey?: string; model?: string; extraParams?: Record<string, unknown> },
  ) {
    const env = slug.toUpperCase().replace(/[^A-Z0-9]/g, "_");
    const baseUrl = process.env[`${env}_BASE_URL`] ?? "";
    if (!baseUrl) {
      throw new Error(`custom:${slug} 缺少 ${env}_BASE_URL，无法入队`);
    }
    assertSafeBaseUrl(baseUrl);
    const model = opts?.model ?? process.env[`${env}_MODEL`];
    if (!model) {
      throw new Error(`custom:${slug} 缺少 ${env}_MODEL，无法入队`);
    }
    super({
      apiKey: opts?.apiKey ?? process.env[`${env}_API_KEY`],
      baseURL: baseUrl,
      model,
    });
    this.name = `custom-${slug}`;
    this.extraParams = opts?.extraParams ?? parseExtraParams(process.env[`${env}_EXTRA_PARAMS`], slug);
  }

  // 泛化源按 OpenAI 经典 max_tokens 兼容面处理
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
