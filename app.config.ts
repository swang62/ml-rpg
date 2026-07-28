import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: true,
  middleware: "src/middleware/index.ts",
  server: {
    preset: "cloudflare_module",
    experimental: {
      asyncContext: true,
    },
    minify: false,
    sourceMap: false,
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
