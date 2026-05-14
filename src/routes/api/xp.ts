import { getTotalXp } from "~/server/xp-store";

export async function GET() {
  const xp = await getTotalXp();
  return new Response(JSON.stringify({ xp }), {
    headers: { "content-type": "application/json" },
  });
}
