/**
 * Graceful shutdown handler.
 *
 * Registers signal handlers for SIGTERM and SIGINT that:
 * 1. Close the SQLite database connection (WAL checkpoint)
 * 2. Stop the rate limiter cleanup interval
 * 3. Exit cleanly
 *
 * Import this module as a side-effect early in the server startup
 * (e.g., from middleware/index.ts) to register handlers on boot.
 */

import { stopCleanupInterval } from "~/middleware/rate-limiter";
import { closeDb } from "~/server/storage";

const SHUTDOWN_TIMEOUT_MS = 10_000;
let shuttingDown = false;

async function handleShutdown(signal: string): Promise<void> {
  if (shuttingDown) {
    console.log(`[shutdown] ${signal} received, forced exit`);
    process.exit(1);
  }

  shuttingDown = true;
  console.log(`[shutdown] ${signal} received, shutting down gracefully...`);

  // Force exit if shutdown takes too long
  const forceExit = setTimeout(() => {
    console.error("[shutdown] Timeout reached, forcing exit");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);

  try {
    // Stop periodic cleanup tasks first
    stopCleanupInterval();
    console.log("[shutdown] Cleanup interval stopped");

    // Close database connection (flushes WAL, releases file handles)
    closeDb();

    clearTimeout(forceExit);
    console.log("[shutdown] Graceful shutdown complete");
    process.exit(0);
  } catch (error) {
    console.error("[shutdown] Error during shutdown:", error);
    clearTimeout(forceExit);
    process.exit(1);
  }
}

// Register signal handlers (once)
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));

// Prevent unhandled rejections from crashing without cleanup
process.on("unhandledRejection", (reason) => {
  console.error("[shutdown] Unhandled rejection:", reason);
});
