import { transaction, audit } from './api-helpers.js';

// Production operator setup: designate an existing Clerk account by exact ID.
// Never grant privileges to "the first person to register" or trust user input.
export async function appointInitialAdmin(pool, userId) {
  if (!userId) return { status: 'not_configured' };
  if (!/^user_[A-Za-z0-9]{8,100}$/.test(userId)) {
    throw new Error('SOCIETY_INITIAL_ADMIN_USER_ID must be a Clerk account ID');
  }
  return transaction(pool, async client => {
    await client.query("SELECT pg_advisory_xact_lock(hashtext('ang_membership_admin_lock'))");
    const completed = await client.query(
      "SELECT id FROM ang_audit WHERE action = 'bootstrap.admin.appointed' AND actor_user_id = $1 LIMIT 1",
      [userId],
    );
    if (completed.rowCount) return { status: 'already_completed' };
    const member = await client.query('SELECT id FROM ang_members WHERE user_id = $1 FOR UPDATE', [userId]);
    if (!member.rowCount) return { status: 'awaiting_membership' };
    await client.query("UPDATE ang_members SET role = 'Admin', status = 'Approved' WHERE id = $1", [member.rows[0].id]);
    await audit(client, userId, 'bootstrap.admin.appointed', 'member', member.rows[0].id);
    return { status: 'appointed' };
  });
}