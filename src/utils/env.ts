/**
 * Centralized environment variable validation using zod.
 * Validates all env vars at import time and provides typed access.
 */

import { z } from "zod";

const envSchema = z.object({
  COURSE_DB_PATH: z
    .string()
    .min(1, "COURSE_DB_PATH environment variable is required"),
  LANCEDB_PATH: z
    .string()
    .min(1, "LANCEDB_PATH environment variable is required"),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters"),
  PORT: z.coerce.number().int().positive().default(3333),
  HOST: z.string().default("0.0.0.0"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VOYAGE_API_KEY: z.string(),
  GROQ_API_KEY: z.string(),
  SPACY_API_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

/** Reset the cached env (used only in tests). */
export function resetEnv(): void {
  _env = null;
}

export function getEnv(): Env {
  if (_env) return _env;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `Environment variable validation failed:\n${issues}\n\n` +
        "Please ensure all required environment variables are set.",
    );
  }

  _env = result.data;
  return _env;
}
