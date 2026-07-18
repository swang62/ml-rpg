import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["src/**/__tests__/*.test.ts"],
    env: {
      SESSION_SECRET: "test-secret-that-is-long-enough-for-testing",
      LANCEDB_PATH: "./.data/search",
      VITE_SITE_URL: "http://localhost:3000",
      RAG_API_URL: "http://localhost:8000",
    },
  },
});
