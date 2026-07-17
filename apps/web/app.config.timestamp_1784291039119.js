// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { resolve } from "node:path";
var app_config_default = defineConfig({
  ssr: true,
  middleware: "src/middleware/index.ts",
  server: {
    experimental: {
      asyncContext: true
    },
    minify: false,
    sourceMap: false,
    routeRules: {
      "/assets/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_build/assets/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  vite: {
    resolve: {
      alias: {
        "@shared": resolve(__dirname, "../../shared")
      }
    },
    build: {
      sourcemap: false
    }
  }
});
export {
  app_config_default as default
};
