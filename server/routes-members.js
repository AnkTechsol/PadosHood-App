import { ApiError, audit, memberJson, pagination, parse, schemas, transaction } from './api-helpers.js';
import { checkUuid, getMember, requireAdmin, rowOr404 } from './api-access.js';

export function registerMemberRoutes(router, { pool }) {
  router.get('/me', async (req, res) => {
    const member = await getMember(pool, req.apiUserId);
    res.json({ society: { id: 'woodsville-phase-2', name: 'Woodsville Phase 2' }, member: member ? memberJson(member) : null });
  });

  router.post('/membership', async (req, res) => {
    const body = parse(schemas.membership, req.body);
    const result = await pool.query(
      `INSERT INTO ang_members (user_id, name, block, flat, resident_type)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id) DO UPDATE SET name = EXCLUDED.name, block = EXCLUDED.block,
         flat = EXCLUDED.flat, resident_type = EXCLUDED.resident_type, role = 'Resident', status = 'Pending'
       WHERE ang_members.status = 'Rejected'
       RETURNING *`,
      [req.apiUserId, body.name, body.block, body.flat, body.residentType],
    );
    if (!result.rowCount) throw new ApiError(409, 'Membership request already exists and cannot be reapplied');
    res.status(201).json(memberJson(result.rows[0]));
  });

  router.get('/members', async (req, res) => {
    await requireAdmin(pool, req);
    const { limit, offset } = pagination(req);
    const result = await pool.query(
      'SELECT * FROM ang_members ORDER BY created_at DESC, id LIMIT $1 OFFSET $2',
      [limit + 1, offset],
    );
    res.json({ items: result.rows.slice(0, limit).map(memberJson), hasMore: result.rowCount > limit });
  });

  router.patch('/members/:id', async (req, res) => {
    await requireAdmin(pool, req);
    checkUuid(req.params.id);
    const body = parse(schemas.memberPatch, req.body);
    const updated = await transaction(pool, async (client) => {
      await client.query("SELECT pg_advisory_xact_lock(hashtext('ang_membership_admin_lock'))");
      const requesterResult = await client.query(
        "SELECT * FROM ang_members WHERE user_id = $1 AND role = 'Admin' AND status = 'Approved' FOR UPDATE",
        [req.apiUserId],
      );
      if (!requesterResult.rowCount) throw new ApiError(403, 'Administrator permission required');
      const requester = requesterResult.rows[0];
      const targetResult = await client.query('SELECT * FROM ang_members WHERE id = $1 FOR UPDATE', [req.params.id]);
      const target = rowOr404(targetResult, 'Member not found');
      if (target.id === requester.id && body.status === 'Approved' && target.status !== 'Approved') {
        throw new ApiError(403, 'Administrators cannot approve their own membership');
      }
      const nextRole = body.role ?? target.role;
      const nextStatus = body.status ?? target.status;
      if (target.role === 'Admin' && target.status === 'Approved' && (nextRole !== 'Admin' || nextStatus !== 'Approved')) {
        const count = await client.query("SELECT count(*)::int AS count FROM ang_members WHERE role = 'Admin' AND status = 'Approved'");
        if (count.rows[0].count <= 1) throw new ApiError(409, 'Cannot remove or suspend the last approved administrator');
      }
      const result = await client.query(
        'UPDATE ang_members SET role = $1, status = $2 WHERE id = $3 RETURNING *',
        [nextRole, nextStatus, target.id],
      );
      if (body.role !== undefined || body.status !== undefined) {
        await audit(client, req.apiUserId, 'member.updated', 'member', target.id);
      }
      return result.rows[0];
    });
    res.json(memberJson(updated));
  });
}