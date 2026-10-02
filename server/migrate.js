import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const migrationPath = new URL('./migrations/001_society.sql', import.meta.url);

export async function migrate(pool) {
  const sql = await readFile(fileURLToPath(migrationPath), 'utf8');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SELECT pg_advisory_xact_lock(hashtext('ang_schema_migrations'))");
    await client.query(sql);
    await client.query('COMMIT');
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch { /* retain the migration failure */ }
    throw error;
  } finally {
    client.release();
  }
}