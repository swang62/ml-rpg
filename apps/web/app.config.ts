import { defineConfig } from "@solidjs/start/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  ssr: true,
  middleware: "src/middleware/index.ts",
  server: {
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
    resolve: {
      alias: {
        "@shared": resolve(__dirname, "../../shared"),
      },
    },
    build: {
      sourcemap: false,
    },
  },
});
