import { ApiError, audit, pagination, parse, schemas, transaction } from './api-helpers.js';
import { checkUuid, isAdminRole, requireMember, rowOr404 } from './api-access.js';

export function registerComplaintRoutes(router, { pool }) {
  router.get('/complaints', async (req, res) => {
    const member = await requireMember(pool, req);
    const { limit, offset } = pagination(req);
    const isAdmin = isAdminRole(member.role);
    const result = await pool.query(
      `SELECT c.*, m.name AS resident_name FROM ang_complaints c
       JOIN ang_members m ON m.id = c.member_id
       WHERE ($1::boolean OR c.member_id = $2)
       ORDER BY c.created_at DESC, c.id LIMIT $3 OFFSET $4`,
      [isAdmin, member.id, limit + 1, offset],
    );
    const rows = result.rows.slice(0, limit);
    const ids = rows.map((row) => row.id);
    const timelines = ids.length
      ? await pool.query(
        'SELECT complaint_id, status, note, created_at FROM ang_complaint_events WHERE complaint_id = ANY($1::uuid[]) ORDER BY created_at, id',
        [ids],
      )
      : { rows: [] };
    const byComplaint = new Map();
    for (const event of timelines.rows) {
      const list = byComplaint.get(event.complaint_id) ?? [];
      list.push({ status: event.status, note: event.note, createdAt: event.created_at });
      byComplaint.set(event.complaint_id, list);
    }
    res.json({
      items: rows.map((row) => complaintJson(row, byComplaint.get(row.id) ?? [])),
      hasMore: result.rowCount > limit,
    });
  });

  router.post('/complaints', async (req, res) => {
    const member = await requireMember(pool, req);
    const body = parse(schemas.complaintCreate, req.body);
    const complaint = await transaction(pool, async (client) => {
      const inserted = await client.query(
        `INSERT INTO ang_complaints (member_id, title, description, category, priority, location)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [member.id, body.title, body.description, body.category, body.priority, `Block ${member.block}, Flat ${member.flat}`],
      );
      const row = inserted.rows[0];
      const event = await client.query(
        "INSERT INTO ang_complaint_events (complaint_id, status, note) VALUES ($1, 'Raised', '') RETURNING status, note, created_at",
        [row.id],
      );
      return complaintJson({ ...row, resident_name: member.name }, event.rows);
    });
    res.status(201).json(complaint);
  });

  router.patch('/complaints/:id', async (req, res) => {
    const member = await requireMember(pool, req);
    checkUuid(req.params.id);
    if (isAdminRole(member.role)) {
      const body = parse(schemas.complaintAdmin, req.body);
      const complaint = await transaction(pool, async (client) => {
        const found = await client.query('SELECT * FROM ang_complaints WHERE id = $1 FOR UPDATE', [req.params.id]);
        rowOr404(found, 'Complaint not found');
        const result = await client.query(
          'UPDATE ang_complaints SET status = $1, updated_at = now() WHERE id = $2 RETURNING *',
          [body.status, req.params.id],
        );
        await client.query(
          'INSERT INTO ang_complaint_events (complaint_id, status, note) VALUES ($1, $2, $3)',
          [req.params.id, body.status, body.note],
        );
        const events = await client.query(
          'SELECT status, note, created_at FROM ang_complaint_events WHERE complaint_id = $1 ORDER BY created_at, id',
          [req.params.id],
        );
        const details = await client.query('SELECT name FROM ang_members WHERE id = $1', [result.rows[0].member_id]);
        await audit(client, req.apiUserId, 'complaint.status_updated', 'complaint', req.params.id);
        return complaintJson({ ...result.rows[0], resident_name: details.rows[0].name }, events.rows);
      });
      res.json(complaint);
      return;
    }
    const body = parse(schemas.complaintEdit, req.body);
    const complaint = await transaction(pool, async (client) => {
      const found = await client.query(
        'SELECT * FROM ang_complaints WHERE id = $1 AND member_id = $2 FOR UPDATE',
        [req.params.id, member.id],
      );
      const current = rowOr404(found, 'Complaint not found');
      if (current.status !== 'Raised') throw new ApiError(403, 'Only Raised complaints may be edited');
      const result = await client.query(
        `UPDATE ang_complaints SET title = COALESCE($1, title), description = COALESCE($2, description),
           category = COALESCE($3, category), priority = COALESCE($4, priority), updated_at = now()
         WHERE id = $5 RETURNING *`,
        [body.title ?? null, body.description ?? null, body.category ?? null, body.priority ?? null, current.id],
      );
      const events = await client.query(
        'SELECT status, note, created_at FROM ang_complaint_events WHERE complaint_id = $1 ORDER BY created_at, id',
        [current.id],
      );
      return complaintJson({ ...result.rows[0], resident_name: member.name }, events.rows);
    });
    res.json(complaint);
  });

  router.delete('/complaints/:id', async (req, res) => {
    const member = await requireMember(pool, req);
    checkUuid(req.params.id);
    const deleted = await pool.query(
      "DELETE FROM ang_complaints WHERE id = $1 AND member_id = $2 AND status = 'Raised' RETURNING id",
      [req.params.id, member.id],
    );
    if (!deleted.rowCount) {
      const own = await pool.query('SELECT status FROM ang_complaints WHERE id = $1 AND member_id = $2', [req.params.id, member.id]);
      if (!own.rowCount) throw new ApiError(404, 'Complaint not found');
      throw new ApiError(403, 'Only Raised complaints may be deleted');
    }
    res.status(204).end();
  });
}

function complaintJson(row, timeline) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    priority: row.priority,
    status: row.status,
    memberId: row.member_id,
    residentName: row.resident_name,
    location: row.location,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    timeline: timeline.map((event) => ({
      status: event.status, note: event.note, createdAt: event.created_at,
    })),
  };
}