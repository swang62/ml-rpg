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
      COURSE_DB_PATH: "./.data/course.db",
      LANCEDB_PATH: "./.data/search",
      GROQ_API_KEY: "fake_api_key",
      VOYAGE_API_KEY: "fake_api_key",
      VITE_SITE_URL: "https://localhost",
    },
  },
});
