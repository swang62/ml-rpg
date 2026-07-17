import { describe, expect, it } from "vitest";
import { checkThrottle } from "~/utils/throttle";

describe("checkThrottle", () => {
  it("allows the first call", () => {
    const cache = new Map<string, number>();
    expect(checkThrottle(cache, "user:1", 5_000, 0)).toBe(true);
  });

  it("blocks a second call within the interval", () => {
    const cache = new Map<string, number>();
    checkThrottle(cache, "user:1", 5_000, 0);
    expect(checkThrottle(cache, "user:1", 5_000, 1_000)).toBe(false);
  });

  it("allows a call after the interval has passed", () => {
    const cache = new Map<string, number>();
    checkThrottle(cache, "user:1", 5_000, 0);
    expect(checkThrottle(cache, "user:1", 5_000, 5_001)).toBe(true);
  });

  it("tracks different keys independently", () => {
    const cache = new Map<string, number>();
    checkThrottle(cache, "user:1", 5_000, 0);
    expect(checkThrottle(cache, "user:2", 5_000, 1_000)).toBe(true);
    expect(checkThrottle(cache, "user:1", 5_000, 1_000)).toBe(false);
  });

  it("updates the timestamp on each allowed call", () => {
    const cache = new Map<string, number>();
    checkThrottle(cache, "user:1", 5_000, 0);
    checkThrottle(cache, "user:1", 5_000, 10_000);
    expect(cache.get("user:1")).toBe(10_000);
  });

  it("works with zero interval — allows every call", () => {
    const cache = new Map<string, number>();
    expect(checkThrottle(cache, "user:1", 0, 0)).toBe(true);
    expect(checkThrottle(cache, "user:1", 0, 0)).toBe(true);
  });
});
