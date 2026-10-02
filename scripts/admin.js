import pg from 'pg';

const { Pool } = pg;
const userId = process.argv[2]?.trim();
if (!process.env.DATABASE_URL || !userId) {
  console.error('Usage: npm run admin -- <clerk-user-id>');
  process.exitCode = 1;
} else {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  let client;
  let transactionStarted = false;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    transactionStarted = true;
    await client.query("SELECT pg_advisory_xact_lock(hashtext('ang_membership_admin_lock'))");
    const member = await client.query(
      'SELECT id FROM ang_members WHERE user_id = $1 FOR UPDATE',
      [userId],
    );
    if (!member.rowCount) throw new Error('User must have an existing membership');
    await client.query("UPDATE ang_members SET role = 'Admin', status = 'Approved' WHERE id = $1", [member.rows[0].id]);
    await client.query(
      "INSERT INTO ang_audit (actor_user_id, action, target_type, target_id) VALUES ($1, 'admin.promoted', 'member', $2)",
      [userId, member.rows[0].id],
    );
    await client.query('COMMIT');
    transactionStarted = false;
    console.log('Member promoted to administrator (pending membership approved if applicable)');
  } catch {
    if (client && transactionStarted) {
      try { await client.query('ROLLBACK'); } catch { /* report only the safe generic failure */ }
    }
    console.error('Administrator promotion failed. Check the member ID and database availability.');
    process.exitCode = 1;
  } finally {
    client?.release();
    await pool.end();
  }
}