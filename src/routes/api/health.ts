import { getDb } from "~/server/storage";

/**
 * Health check endpoint for Docker orchestration.
 * Returns 200 if the database is reachable, 503 otherwise.
 */
export async function GET() {
  try {
    const db = getDb();
    const row = db.prepare("SELECT 1 AS ok").get() as
      | { ok: number }
      | undefined;
    if (!row || row.ok !== 1) {
      throw new Error("Database not responding");
    }
    return new Response(JSON.stringify({ status: "healthy", db: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return new Response(JSON.stringify({ status: "unhealthy", db: message }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}
