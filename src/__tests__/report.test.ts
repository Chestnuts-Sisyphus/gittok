import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

// saveFile 内部用 path.join 拼路径，期望值必须同源构造——写死正斜杠在 Windows 上必挂
// （反斜杠 vs 正斜杠断言，2026-09-05 根治这组「Windows 旧伤」）
const expectedDir = path.join("digests", "2026-03-09");
const expectedPath = path.join(expectedDir, "ai-cli.md");

// ---------------------------------------------------------------------------
// Mock provider — intercepts createProvider() so the module-level `provider`
// in report.ts uses our controllable mock instead of a real SDK client.
// ---------------------------------------------------------------------------

const { mockCall } = vi.hoisted(() => ({
  mockCall: vi.fn<(prompt: string, maxTokens: number) => Promise<string>>(),
}));

vi.mock("../providers/index.ts", async (importOriginal) => {
  const orig = await importOriginal<typeof import("../providers/index.ts")>();
  return {
    ...orig,
    createProvider: () => ({ name: "mock", call: mockCall }),
  };
});

import { is429, callLlm, saveFile, autoGenFooter } from "../report.ts";

// ---------------------------------------------------------------------------
// is429
// ---------------------------------------------------------------------------

describe("is429", () => {
  it("detects status 429 from error-like objects", () => {
    expect(is429({ status: 429 })).toBe(true);
  });

  it("detects 429 from string representation", () => {
    expect(is429(new Error("Request failed with 429"))).toBe(true);
  });

  it("returns false for other status codes", () => {
    expect(is429({ status: 500 })).toBe(false);
    expect(is429({ status: 200 })).toBe(false);
  });

  it("returns false for null/undefined", () => {
    expect(is429(null)).toBe(false);
    expect(is429(undefined)).toBe(false);
  });

  it("returns false for unrelated errors", () => {
    expect(is429(new Error("Something else"))).toBe(false);
  });

  it("detects OpenAI SDK RateLimitError shape (status + code)", () => {
    const openaiError = Object.assign(new Error("Rate limit reached"), {
      status: 429,
      code: "rate_limit_exceeded",
      type: "tokens",
    });
    expect(is429(openaiError)).toBe(true);
  });

  it("detects Anthropic SDK APIError shape (status + headers)", () => {
    const anthropicError = Object.assign(new Error("rate_limit_error"), {
      status: 429,
      headers: { "retry-after": "30" },
    });
    expect(is429(anthropicError)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// saveFile
// ---------------------------------------------------------------------------

describe("saveFile", () => {
  beforeEach(() => {
    vi.spyOn(fs, "mkdirSync").mockReturnValue(undefined);
    vi.spyOn(fs, "writeFileSync").mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the expected file path", () => {
    const result = saveFile("content", "2026-03-09", "ai-cli.md");
    expect(result).toBe(expectedPath);
  });

  it("creates parent directories recursively", () => {
    saveFile("content", "2026-03-09", "ai-cli.md");
    // 五轮 T7 乙B4：写盘用**已校验的绝对路径**（而非再拼一次相对路径）——
    // 边界检查判的是「规范化后的目标」，写盘就必须写**同一个字符串**；
    // 否则「检查的」与「写的」是两处拼装，中间任何改动都能把两者拆开。
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.resolve(process.cwd(), expectedDir), { recursive: true });
  });

  it("writes content as utf-8", () => {
    saveFile("hello world", "2026-03-09", "test.md");
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.resolve(process.cwd(), expectedDir, "test.md"),
      "hello world",
      "utf-8",
    );
  });

  it("路径越界一律抛错（不是静默改写）：分隔符 / `..` 都拦", () => {
    expect(() => saveFile("x", "2026-03-09", "../escape.md")).toThrow(/分隔符/);
    expect(() => saveFile("x", "2026-03-09", "sub/escape.md")).toThrow(/分隔符/);
    expect(() => saveFile("x", "2026-03-09", "..")).toThrow(/相对路径段/);
  });
});

// ---------------------------------------------------------------------------
// autoGenFooter
// ---------------------------------------------------------------------------

describe("autoGenFooter", () => {
  const originalEnv = process.env["DIGEST_REPO"];

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env["DIGEST_REPO"] = originalEnv;
    } else {
      delete process.env["DIGEST_REPO"];
    }
  });

  it("returns empty string when DIGEST_REPO is not set", () => {
    delete process.env["DIGEST_REPO"];
    expect(autoGenFooter()).toBe("");
  });

  it("returns empty string when DIGEST_REPO is empty", () => {
    process.env["DIGEST_REPO"] = "";
    expect(autoGenFooter()).toBe("");
  });

  it("returns Chinese footer when DIGEST_REPO is set", () => {
    process.env["DIGEST_REPO"] = "user/repo";
    const result = autoGenFooter("zh");
    expect(result).toContain("GitTok");
    expect(result).toContain("github.com/user/repo");
    expect(result).toContain("自动生成");
  });

  it("returns English footer when lang is en", () => {
    process.env["DIGEST_REPO"] = "user/repo";
    const result = autoGenFooter("en");
    expect(result).toContain("auto-generated");
    expect(result).toContain("GitTok");
  });
});

// ---------------------------------------------------------------------------
// callLlm
// ---------------------------------------------------------------------------

describe("callLlm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockCall.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("passes prompt and maxTokens to provider.call()", async () => {
    mockCall.mockResolvedValueOnce("response text");

    const result = await callLlm("hello", 2048);

    expect(result).toBe("response text");
    expect(mockCall).toHaveBeenCalledOnce();
    expect(mockCall).toHaveBeenCalledWith("hello", 2048);
  });

  it("uses default maxTokens of 4096", async () => {
    mockCall.mockResolvedValueOnce("ok");

    await callLlm("prompt");

    expect(mockCall).toHaveBeenCalledWith("prompt", 4096);
  });

  it("retries on 429 with exponential backoff", async () => {
    const err429 = Object.assign(new Error("rate limited"), { status: 429 });
    mockCall.mockRejectedValueOnce(err429);
    mockCall.mockResolvedValueOnce("success after retry");

    const promise = callLlm("prompt", 1024);

    // First call rejects with 429 — advance past the 30 s backoff
    await vi.advanceTimersByTimeAsync(30_000);

    const result = await promise;
    expect(result).toBe("success after retry");
    expect(mockCall).toHaveBeenCalledTimes(2);
  });

  it("retries up to MAX_RETRIES times then throws", async () => {
    const err429 = Object.assign(new Error("rate limited"), { status: 429 });
    mockCall
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429);

    const promise = callLlm("prompt", 1024);
    // Attach a no-op catch immediately so Node doesn't flag unhandled rejection
    // before the expect() below gets a chance to inspect the rejection.
    promise.catch(() => {});

    // Advance through all 3 retry backoffs: 30s, 60s, 120s
    await vi.advanceTimersByTimeAsync(30_000);
    await vi.advanceTimersByTimeAsync(60_000);
    await vi.advanceTimersByTimeAsync(120_000);

    await expect(promise).rejects.toThrow("rate limited");
    // 1 initial + 3 retries = 4 total calls
    expect(mockCall).toHaveBeenCalledTimes(4);
  });

  it("throws immediately on non-429 errors", async () => {
    mockCall.mockRejectedValueOnce(new Error("server error"));

    await expect(callLlm("prompt")).rejects.toThrow("server error");
    expect(mockCall).toHaveBeenCalledOnce();
  });

  it("does not leak concurrency slots on 429 retries", async () => {
    const err429 = Object.assign(new Error("429"), { status: 429 });
    mockCall.mockRejectedValueOnce(err429);
    mockCall.mockResolvedValueOnce("ok");

    const promise = callLlm("prompt");
    await vi.advanceTimersByTimeAsync(30_000);
    await promise;

    // If slots leaked, subsequent calls would hang. Fire LLM_CONCURRENCY (1)
    // call to prove all slots are available.
    mockCall.mockResolvedValue("ok");
    const batch = Array.from({ length: 1 }, (_, i) => callLlm(`p${i}`));
    const results = await Promise.all(batch);
    expect(results).toEqual(["ok"]);
  });
});
