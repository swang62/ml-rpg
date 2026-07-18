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
    routeRules: {
      "/assets/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      },
      "/_build/assets/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      },
    },
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
