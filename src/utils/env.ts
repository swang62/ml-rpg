/**
 * Centralized environment variable validation using zod.
 * Validates all env vars at import time and provides typed access.
 *
 * In Cloudflare Workers, D1 bindings replace process.env for DB access.
 * This schema validates the non-D1 env vars shared across runtimes.
 */

import { getRequestEvent } from "solid-js/web";
import { z } from "zod";

const envSchema = z.object({
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters"),
  PORT: z.coerce.number().int().positive().default(3333),
  HOST: z.string().default("0.0.0.0"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  RAG_API_URL: z
    .string()
    .url()
    .min(1, "RAG_API_URL environment variable is required"),
});

export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

function getProcessEnv(): Record<string, unknown> {
  const maybeProcess = Reflect.get(
    globalThis as Record<string, unknown>,
    "process",
  );
  if (!maybeProcess || typeof maybeProcess !== "object") {
    return {};
  }

  const maybeEnv = Reflect.get(maybeProcess as Record<string, unknown>, "env");
  if (!maybeEnv || typeof maybeEnv !== "object") {
    return {};
  }

  return maybeEnv as Record<string, unknown>;
}

function getWorkerEnv(): Record<string, unknown> {
  try {
    const event = getRequestEvent() as {
      platform?: { env?: Record<string, unknown> };
      nativeEvent?: {
        req?: {
          runtime?: {
            cloudflare?: {
              env?: Record<string, unknown>;
            };
          };
        };
        context?: {
          cloudflare?: { env?: Record<string, unknown> };
          _platform?: {
            cloudflare?: { env?: Record<string, unknown> };
          };
        };
      };
    };

    return (
      event.platform?.env ??
      event.nativeEvent?.req?.runtime?.cloudflare?.env ??
      event.nativeEvent?.context?.cloudflare?.env ??
      event.nativeEvent?.context?._platform?.cloudflare?.env ??
      {}
    );
  } catch {
    return {};
  }
}

/** Reset the cached env (used only in tests). */
export function resetEnv(): void {
  _env = null;
}

export function getEnv(): Env {
  if (_env) return _env;

  const result = envSchema.safeParse({
    ...getProcessEnv(),
    ...getWorkerEnv(),
  });

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
