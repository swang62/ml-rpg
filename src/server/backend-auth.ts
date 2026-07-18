import { getEnv } from "~/utils/env";

export function getBackendAuthHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${getEnv().SESSION_SECRET}`,
  };
}
