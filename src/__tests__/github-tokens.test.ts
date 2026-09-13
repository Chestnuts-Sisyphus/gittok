/**
 * GitHub token 池测试（2026-09-06 多 PAT 轮转）：
 * 池构建（主+追加、去重去空）与轮换取号语义。
 */

import { describe, it, expect, vi, afterEach } from "vitest";

const savedEnv = { ...process.env };

function setEnv(githubToken: string | undefined, extra: string | undefined): void {
  if (githubToken === undefined) delete process.env["GITHUB_TOKEN"];
  else process.env["GITHUB_TOKEN"] = githubToken;
  if (extra === undefined) delete process.env["EXTRA_GITHUB_PATS"];
  else process.env["EXTRA_GITHUB_PATS"] = extra;
}

afterEach(() => {
  process.env["GITHUB_TOKEN"] = savedEnv["GITHUB_TOKEN"];
  process.env["EXTRA_GITHUB_PATS"] = savedEnv["EXTRA_GITHUB_PATS"];
  vi.resetModules();
});

describe("github token 池（多 PAT 轮转）", () => {
  it("池 = 主 token + 追加逗号分隔，去空去重", async () => {
    setEnv("tok-main", "tok-a, tok-b ,tok-a,");
    const mod = await import("../github-tokens.ts");
    expect(mod.getApiTokens()).toEqual(["tok-main", "tok-a", "tok-b"]);
  });

  it("nextApiToken 按调用序号轮转循环", async () => {
    setEnv("t1", "t2,t3");
    const mod = await import("../github-tokens.ts");
    const seq = [mod.nextApiToken(), mod.nextApiToken(), mod.nextApiToken(), mod.nextApiToken()];
    expect(seq).toEqual(["t1", "t2", "t3", "t1"]);
  });

  it("只有主 token 时轮转恒返回它；完全无 token 返回空串", async () => {
    setEnv("only", undefined);
    const mod = await import("../github-tokens.ts");
    expect(mod.nextApiToken()).toBe("only");
    expect(mod.nextApiToken()).toBe("only");

    setEnv(undefined, undefined);
    const mod2 = await import("../github-tokens.ts");
    expect(mod2.getApiTokens()).toEqual([]);
    expect(mod2.nextApiToken()).toBe("");
  });

  it("角色分账：README 固定首 token；轮转跳过它（池 ≥2）", async () => {
    setEnv("readme-tok", "rot-a,rot-b");
    const mod = await import("../github-tokens.ts");
    // README 恒用首个（不被轮转挤占）
    expect(mod.nextReadmeToken()).toBe("readme-tok");
    expect(mod.nextReadmeToken()).toBe("readme-tok");
    // 轮转在其余 token 间循环，不碰 README 专用
    const seq = [mod.nextRotationToken(), mod.nextRotationToken(), mod.nextRotationToken()];
    expect(seq).toEqual(["rot-a", "rot-b", "rot-a"]);
    expect(seq).not.toContain("readme-tok");
  });

  it("角色分账：池只有一个 token 时两边共用（靠 REFRESH_BATCH 让位）", async () => {
    setEnv("solo", undefined);
    const mod = await import("../github-tokens.ts");
    expect(mod.nextReadmeToken()).toBe("solo");
    expect(mod.nextRotationToken()).toBe("solo");
  });
});
