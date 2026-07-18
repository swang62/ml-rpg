/**
 * Schema migration tracking.
 *
 * sqlc generates typed queries from raw SQL but does NOT handle migrations.
 * In D1, migrations are managed through Wrangler's migration system
 * (see migrations/ directory). This module is retained as a reference
 * but migrations are applied via `wrangler d1 migrations apply`.
 */

export const MIGRATIONS_DIR = "migrations";
