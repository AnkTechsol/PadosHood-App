import { ApiError, SOCIETY, audit, memberJson, postJson, transaction } from './api-helpers.js';
import { getMember } from './api-access.js';

export function registerAccountRoutes(router, { pool }) {
  router.get('/account/export', async (req, res) => {
    const member = await getMember(pool, req.apiUserId);
    if (!member) {
      res.json({ society: SOCIETY, member: null, complaints: [], posts: [] });
      return;
    }
    const complaintsResult = await pool.query(
      `SELECT c.*, m.name AS resident_name FROM ang_complaints c
       JOIN ang_members m ON m.id = c.member_id WHERE c.member_id = $1
       ORDER BY c.created_at DESC`,
      [member.id],
    );
    const complaintIds = complaintsResult.rows.map((row) => row.id);
    const eventResult = complaintIds.length
      ? await pool.query(
        'SELECT complaint_id, status, note, created_at FROM ang_complaint_events WHERE complaint_id = ANY($1::uuid[]) ORDER BY created_at, id',
        [complaintIds],
      )
      : { rows: [] };
    const eventMap = new Map();
    for (const event of eventResult.rows) {
      const events = eventMap.get(event.complaint_id) ?? [];
      events.push({ status: event.status, note: event.note, createdAt: event.created_at });
      eventMap.set(event.complaint_id, events);
    }
    const posts = await pool.query(
      `SELECT p.*, m.name AS author_name FROM ang_posts p
       JOIN ang_members m ON m.id = p.member_id WHERE p.member_id = $1 ORDER BY p.created_at DESC`,
      [member.id],
    );
    res.json({
      society: SOCIETY,
      member: memberJson(member),
      complaints: complaintsResult.rows.map((row) => ({
        id: row.id, title: row.title, description: row.description, category: row.category,
        priority: row.priority, status: row.status, memberId: row.member_id,
        residentName: row.resident_name, location: row.location, createdAt: row.created_at,
        updatedAt: row.updated_at, timeline: eventMap.get(row.id) ?? [],
      })),
      posts: posts.rows.map(postJson),
    });
  });

  router.delete('/account', async (req, res) => {
    await transaction(pool, async (client) => {
      await client.query("SELECT pg_advisory_xact_lock(hashtext('ang_membership_admin_lock'))");
      const found = await client.query('SELECT * FROM ang_members WHERE user_id = $1 FOR UPDATE', [req.apiUserId]);
      if (!found.rowCount) return;
      const member = found.rows[0];
      if (member.role === 'SuperAdmin') {
        throw new ApiError(409, 'The Super Admin account cannot be deleted through this portal');
      }
      if (member.role === 'Admin' && member.status === 'Approved') {
        const count = await client.query(
          "SELECT count(*)::int AS count FROM ang_members WHERE role IN ('Admin', 'SuperAdmin') AND status = 'Approved'",
        );
        if (count.rows[0].count <= 1) throw new ApiError(409, 'Cannot delete the last approved administrator');
      }
      if (member.role === 'Admin') await audit(client, req.apiUserId, 'account.deleted', 'member', member.id);
      await client.query('DELETE FROM ang_members WHERE id = $1', [member.id]);
    });
    res.status(204).end();
  });
}