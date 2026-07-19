interface Env {
  D1_CONTENT: D1Database;
}

export default {
  async scheduled(
    _controller: ScheduledController,
    env: Env,
    _ctx: ExecutionContext,
  ) {
    const cutoff = new Date(
      Date.now() - 90 * 24 * 60 * 60 * 1000,
    ).toISOString();
    try {
      const { results: oldUsers } = await env.D1_CONTENT.prepare(
        "SELECT id FROM users WHERE last_visited_at < ?",
      )
        .bind(cutoff)
        .all<{ id: number }>();

      for (const user of oldUsers) {
        await env.D1_CONTENT.prepare("DELETE FROM progress WHERE user_id = ?")
          .bind(user.id)
          .run();
        await env.D1_CONTENT.prepare("DELETE FROM users WHERE id = ?")
          .bind(user.id)
          .run();
      }

      console.log(`[cleanup] Removed ${oldUsers.length} inactive users`);
    } catch (err) {
      console.error("[cleanup] Failed:", err);
    }
  },
};
