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
    const member = await client.query('SELECT id, role FROM ang_members WHERE user_id = $1 FOR UPDATE', [userId]);
    if (!member.rowCount) return { status: 'awaiting_membership' };
    if (member.rows[0].role === 'SuperAdmin') return { status: 'already_super_admin' };
    await client.query("UPDATE ang_members SET role = 'Admin', status = 'Approved' WHERE id = $1", [member.rows[0].id]);
    await audit(client, userId, 'bootstrap.admin.appointed', 'member', member.rows[0].id);
    return { status: 'appointed' };
  });
}

export async function appointInitialSuperAdmin(pool, userId) {
  if (!userId) return { status: 'not_configured' };
  if (!/^user_[A-Za-z0-9]{8,100}$/.test(userId)) {
    throw new Error('SOCIETY_INITIAL_SUPER_ADMIN_USER_ID must be a Clerk account ID');
  }
  return transaction(pool, async client => {
    await client.query("SELECT pg_advisory_xact_lock(hashtext('ang_membership_admin_lock'))");
    const completed = await client.query(
      "SELECT id FROM ang_audit WHERE action = 'bootstrap.super_admin.appointed' AND actor_user_id = $1 LIMIT 1",
      [userId],
    );
    if (completed.rowCount) return { status: 'already_completed' };
    const existing = await client.query(
      "SELECT user_id FROM ang_members WHERE role = 'SuperAdmin' LIMIT 1 FOR UPDATE",
    );
    if (existing.rowCount && existing.rows[0].user_id !== userId) {
      return { status: 'super_admin_already_assigned' };
    }
    const member = await client.query('SELECT id FROM ang_members WHERE user_id = $1 FOR UPDATE', [userId]);
    if (!member.rowCount) return { status: 'awaiting_membership' };
    await client.query("UPDATE ang_members SET role = 'SuperAdmin', status = 'Approved' WHERE id = $1", [member.rows[0].id]);
    await audit(client, userId, 'bootstrap.super_admin.appointed', 'member', member.rows[0].id);
    return { status: 'appointed' };
  });
}

export async function transferSuperAdmin(pool, currentUserId, replacementUserId) {
  const clerkIdPattern = /^user_[A-Za-z0-9]{8,100}$/;
  if (!clerkIdPattern.test(currentUserId || '') || !clerkIdPattern.test(replacementUserId || '')) {
    throw new Error('Both Super Admin references must be Clerk account IDs');
  }
  if (currentUserId === replacementUserId) {
    throw new Error('The replacement must be a different Clerk account');
  }
  return transaction(pool, async client => {
    await client.query("SELECT pg_advisory_xact_lock(hashtext('ang_membership_admin_lock'))");
    const current = await client.query(
      "SELECT id FROM ang_members WHERE user_id = $1 AND role = 'SuperAdmin' FOR UPDATE",
      [currentUserId],
    );
    if (!current.rowCount) throw new Error('The current Super Admin account was not found');
    const replacement = await client.query(
      "SELECT id FROM ang_members WHERE user_id = $1 AND status = 'Approved' FOR UPDATE",
      [replacementUserId],
    );
    if (!replacement.rowCount) throw new Error('The replacement must have an approved society membership');
    await client.query(
      "UPDATE ang_members SET role = 'Resident', status = 'Suspended' WHERE id = $1",
      [current.rows[0].id],
    );
    await client.query(
      "UPDATE ang_members SET role = 'SuperAdmin', status = 'Approved' WHERE id = $1",
      [replacement.rows[0].id],
    );
    await audit(client, 'operator:super-admin-recovery', 'super_admin.recovered', 'member', replacement.rows[0].id);
    await audit(client, 'operator:super-admin-recovery', 'super_admin.replaced', 'member', current.rows[0].id);
    return { status: 'transferred' };
  });
}