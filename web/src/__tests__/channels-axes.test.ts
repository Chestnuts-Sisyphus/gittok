/**
 * 频道/分区两轴隔离回归测试（2026-09-14）。
 * 直接锁死栗子实测发现的严重 bug：频道「乐趣」(key=fun) 与分区「创意」(key=fun) 撞车
 * → 两个入口共用 activeKey、渲染同一份内容。
 */

import { describe, it, expect } from "vitest";
import {
  DYNAMIC_SECTIONS,
  CATEGORY_SECTIONS,
  ALL_SECTIONS,
  CAT_KEY_PREFIX,
  categoryOfKey,
  sectionZoneOf,
  assertUniqueChannelKeys,
} from "../channels-axes.ts";

describe("两轴 key 隔离（防串台回归）", () => {
  it("全部入口 key 唯一（撞车直接抛错）", () => {
    expect(() => assertUniqueChannelKeys()).not.toThrow();
    const keys = ALL_SECTIONS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("乐趣频道 key 与创意分区 key 不同（历史 bug 的精确回归点）", () => {
    const funChannel = DYNAMIC_SECTIONS.find((s) => s.title === "乐趣");
    const creativeZone = CATEGORY_SECTIONS.find((s) => s.title === "创意");
    expect(funChannel?.key).toBe("fun");
    expect(creativeZone?.key).toBe(`${CAT_KEY_PREFIX}fun`);
    expect(funChannel?.key).not.toBe(creativeZone?.key);
  });

  it("构造一个撞车的列表 → 自检必须抛错（闸本身有效）", () => {
    expect(() =>
      assertUniqueChannelKeys([
        { key: "fun", icon: "x", title: "乐趣", desc: "" },
        { key: "fun", icon: "y", title: "创意", desc: "" },
      ]),
    ).toThrow(/撞车/);
  });

  it("分区 key 映射：category 与 zone 三级对应正确", () => {
    expect(categoryOfKey("cat:fun")).toBe("fun");
    expect(categoryOfKey("cat:learning")).toBe("learning");
    expect(categoryOfKey("fun")).toBeNull(); // 频道 key 不是分区 key
    expect(categoryOfKey("hot")).toBeNull();

    expect(sectionZoneOf("cat:ai")).toBe("AI");
    expect(sectionZoneOf("cat:fun")).toBe("创意");
    expect(sectionZoneOf("cat:tool")).toBe("工具");
    expect(sectionZoneOf("cat:learning")).toBe("资源");
    // 关键：乐趣频道 key 不会误命中分区映射（老 bug 的根源）
    expect(sectionZoneOf("fun")).toBeNull();
    expect(sectionZoneOf("hot")).toBeNull();
  });

  it("四个分区 tab 与 zone 词表一一对应（标签与判据词表一致）", () => {
    const zones = CATEGORY_SECTIONS.map((s) => sectionZoneOf(s.key));
    expect(zones).toEqual(["AI", "创意", "工具", "资源"]);
    const titles = CATEGORY_SECTIONS.map((s) => s.title);
    expect(titles).toEqual(["AI", "创意", "工具", "资源"]);
  });
});

describe("zone ⇄ category 翻译（配额/偏好键名语义）", () => {
  it("zoneForCategory / categoryOfZone 双向一致", async () => {
    const { zoneForCategory, categoryOfZone } = await import("../channels-axes.ts");
    expect(zoneForCategory("fun")).toBe("创意");
    expect(zoneForCategory("learning")).toBe("资源");
    expect(zoneForCategory("tool")).toBe("工具");
    expect(zoneForCategory("ai")).toBe("AI");
    expect(zoneForCategory("nope")).toBeNull();
    for (const z of ["AI", "创意", "工具", "资源"]) {
      expect(zoneForCategory(categoryOfZone(z)!)).toBe(z);
    }
    expect(categoryOfZone("不存在的区")).toBeNull();
  });

  it("偏好字段两种存量写法都能译回 category（老用户不被锁死）", async () => {
    const { categoryOfZone } = await import("../channels-axes.ts");
    // 新写法：存 zone 值
    expect(categoryOfZone("创意") ?? "创意").toBe("fun");
    // 老写法：存 category 值（转换返回 null → 调用方回退原值，仍是合法 category）
    expect(categoryOfZone("fun") ?? "fun").toBe("fun");
  });
});
