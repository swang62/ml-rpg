import { describe, expect, it } from "vitest";
import { isStaticAsset } from "../index";

describe("isStaticAsset", () => {
  it("matches _assets/ prefix", () => {
    expect(isStaticAsset("/_assets/main.css")).toBe(true);
    expect(isStaticAsset("/_assets/")).toBe(true);
    expect(isStaticAsset("/_assets/js/app.js")).toBe(true);
  });

  it("matches assets/ prefix", () => {
    expect(isStaticAsset("/assets/logo.png")).toBe(true);
    expect(isStaticAsset("/assets/")).toBe(true);
  });

  it("matches favicon prefix", () => {
    expect(isStaticAsset("/favicon.ico")).toBe(true);
    expect(isStaticAsset("/favicon-32x32.png")).toBe(true);
  });

  it("rejects non-static URLs", () => {
    expect(isStaticAsset("/api/courses")).toBe(false);
    expect(isStaticAsset("/login")).toBe(false);
    expect(isStaticAsset("/")).toBe(false);
    expect(isStaticAsset("")).toBe(false);
    expect(isStaticAsset("/assets")).toBe(false);
  });
});
