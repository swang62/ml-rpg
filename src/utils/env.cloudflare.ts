/**
 * Cloudflare Workers environment bindings.
 *
 * In Workers, env vars come through the handler's `env` parameter, not `process.env`.
 * Vinxi/Nitro's `cloudflare_module` preset shims `process.env` for build-time vars,
 * but runtime bindings (D1, R2, KV, AI) are only available via the handler parameter.
 *
 * This module provides the Cloudflare-side env schema for type-safe access
 * when running in a Worker context.
 *
 * All persistent data comes from D1.
 */

import { z } from "zod";

const cloudflareEnvSchema = z.object({
  // D1 database binding for course/user data
  D1_CONTENT: z.any().optional(),

  // RAG API URL (external, same as Node)
  RAG_API_URL: z.string().url().min(1),

  // LLM API URL (external, same as Node)
  LLAMA_API_URL: z.string().url().min(1),

  // Session secret (same as Node — set via wrangler secrets)
  SESSION_SECRET: z.string().min(32),

  // Environment mode
  NODE_ENV: z.enum(["development", "production"]).default("production"),
});

export type CloudflareEnv = z.infer<typeof cloudflareEnvSchema>;

/**
 * Validate Cloudflare Worker env bindings.
 * Call this in your Worker handler with the bindings object.
 */
export function validateCloudflareEnv(
  bindings: Record<string, unknown>,
): CloudflareEnv {
  const result = cloudflareEnvSchema.safeParse(bindings);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Cloudflare env validation failed:\n${issues}\n\n` +
        "Check wrangler.jsonc and wrangler secrets.",
    );
  }
  return result.data;
}
