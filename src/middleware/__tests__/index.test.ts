import { describe, expect, it } from "vitest";
import { isAuthEndpoint, isStaticAsset } from "../index";

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

describe("isAuthEndpoint", () => {
  it("matches login in URL", () => {
    expect(isAuthEndpoint("/login")).toBe(true);
    expect(isAuthEndpoint("/LOGIN")).toBe(true);
    expect(isAuthEndpoint("/api/login")).toBe(true);
  });

  it("matches signup in URL", () => {
    expect(isAuthEndpoint("/signup")).toBe(true);
    expect(isAuthEndpoint("/SIGNUP")).toBe(true);
    expect(isAuthEndpoint("/api/signup")).toBe(true);
  });

  it("rejects non-auth URLs", () => {
    expect(isAuthEndpoint("/")).toBe(false);
    expect(isAuthEndpoint("/courses")).toBe(false);
    expect(isAuthEndpoint("/profile")).toBe(false);
    expect(isAuthEndpoint("")).toBe(false);
    expect(isAuthEndpoint("/api/data")).toBe(false);
  });
});
