import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const migrationDirectory = fileURLToPath(new URL('./migrations/', import.meta.url));

export async function migrate(pool) {
  const files = (await readdir(migrationDirectory))
    .filter(file => /^\d+_[a-z0-9_-]+\.sql$/.test(file))
    .sort();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SELECT pg_advisory_xact_lock(hashtext('ang_schema_migrations'))");
    for (const file of files) {
      const sql = await readFile(new URL(`./migrations/${file}`, import.meta.url), 'utf8');
      await client.query(sql);
    }
    await client.query('COMMIT');
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch { /* retain the migration failure */ }
    throw error;
  } finally {
    client.release();
  }
}