import { ApiError, audit, noticeJson, pagination, parse, postJson, schemas, transaction } from './api-helpers.js';
import { checkUuid, isAdminRole, requireAdmin, requireMember, rowOr404 } from './api-access.js';

export function registerNoticePostRoutes(router, { pool }) {
  router.get('/notices', async (req, res) => {
    await requireMember(pool, req);
    const { limit, offset } = pagination(req);
    const result = await pool.query(
      'SELECT * FROM ang_notices ORDER BY created_at DESC, id LIMIT $1 OFFSET $2',
      [limit + 1, offset],
    );
    res.json({ items: result.rows.slice(0, limit).map(noticeJson), hasMore: result.rowCount > limit });
  });

  router.post('/notices', async (req, res) => {
    await requireAdmin(pool, req);
    const body = parse(schemas.notice, req.body);
    const row = await transaction(pool, async (client) => {
      const result = await client.query(
        'INSERT INTO ang_notices (title, content, priority) VALUES ($1, $2, $3) RETURNING *',
        [body.title, body.content, body.priority],
      );
      await audit(client, req.apiUserId, 'notice.created', 'notice', result.rows[0].id);
      return result.rows[0];
    });
    res.status(201).json(noticeJson(row));
  });

  router.patch('/notices/:id', async (req, res) => {
    await requireAdmin(pool, req);
    checkUuid(req.params.id);
    const body = parse(schemas.notice, req.body);
    const row = await transaction(pool, async (client) => {
      const result = await client.query(
        'UPDATE ang_notices SET title = $1, content = $2, priority = $3, updated_at = now() WHERE id = $4 RETURNING *',
        [body.title, body.content, body.priority, req.params.id],
      );
      const updated = rowOr404(result, 'Notice not found');
      await audit(client, req.apiUserId, 'notice.updated', 'notice', updated.id);
      return updated;
    });
    res.json(noticeJson(row));
  });

  router.delete('/notices/:id', async (req, res) => {
    await requireAdmin(pool, req);
    checkUuid(req.params.id);
    await transaction(pool, async (client) => {
      const found = await client.query('SELECT id FROM ang_notices WHERE id = $1', [req.params.id]);
      const notice = rowOr404(found, 'Notice not found');
      await audit(client, req.apiUserId, 'notice.deleted', 'notice', notice.id);
      await client.query('DELETE FROM ang_notices WHERE id = $1', [notice.id]);
    });
    res.status(204).end();
  });

  router.get('/posts', async (req, res) => {
    await requireMember(pool, req);
    const { limit, offset } = pagination(req);
    const result = await pool.query(
      `SELECT p.*, m.name AS author_name FROM ang_posts p
       JOIN ang_members m ON m.id = p.member_id
       ORDER BY p.created_at DESC, p.id LIMIT $1 OFFSET $2`,
      [limit + 1, offset],
    );
    res.json({ items: result.rows.slice(0, limit).map(postJson), hasMore: result.rowCount > limit });
  });

  router.post('/posts', async (req, res) => {
    const member = await requireMember(pool, req);
    const body = parse(schemas.post, req.body);
    const result = await pool.query(
      'INSERT INTO ang_posts (member_id, content) VALUES ($1, $2) RETURNING *',
      [member.id, body.content],
    );
    res.status(201).json(postJson({ ...result.rows[0], author_name: member.name }));
  });

  router.patch('/posts/:id', async (req, res) => {
    const member = await requireMember(pool, req);
    checkUuid(req.params.id);
    const body = parse(schemas.post, req.body);
    const result = await pool.query(
      `UPDATE ang_posts SET content = $1, updated_at = now()
       WHERE id = $2 AND member_id = $3
       RETURNING *, (SELECT name FROM ang_members WHERE id = member_id) AS author_name`,
      [body.content, req.params.id, member.id],
    );
    if (!result.rowCount) {
      const exists = await pool.query('SELECT id FROM ang_posts WHERE id = $1', [req.params.id]);
      if (exists.rowCount) throw new ApiError(403, 'Only the post author may edit this post');
      throw new ApiError(404, 'Post not found');
    }
    res.json(postJson(result.rows[0]));
  });

  router.delete('/posts/:id', async (req, res) => {
    const member = await requireMember(pool, req);
    checkUuid(req.params.id);
    await transaction(pool, async (client) => {
      const result = await client.query('SELECT * FROM ang_posts WHERE id = $1 FOR UPDATE', [req.params.id]);
      const post = rowOr404(result, 'Post not found');
      if (post.member_id !== member.id && !isAdminRole(member.role)) {
        throw new ApiError(403, 'Only the post author or an administrator may delete this post');
      }
      if (post.member_id !== member.id) {
        await audit(client, req.apiUserId, 'post.moderated', 'post', post.id);
      }
      await client.query('DELETE FROM ang_posts WHERE id = $1', [post.id]);
    });
    res.status(204).end();
  });
}