/**
 * Health check endpoint for Docker orchestration.
 * Returns 200 if the database is reachable, 503 otherwise.
 */
export async function GET() {
  try {
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
