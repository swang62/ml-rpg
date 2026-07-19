/**
 * Graceful shutdown handler.
 *
 * In Cloudflare Workers, shutdown is handled by the runtime.
 * This module is retained as a lightweight placeholder for compatibility.
 */

export function registerShutdownHandlers(): void {
  // No-op in Workers — shutdown is managed by the runtime.
  console.log("[shutdown] Worker runtime: no custom shutdown handlers needed");
}
