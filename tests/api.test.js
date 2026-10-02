import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, test } from 'node:test';
import pg from 'pg';
import request from 'supertest';
import { createApiApp } from '../server/api.js';
import { migrate } from '../server/db.js';
import { appointInitialAdmin } from '../server/bootstrap-admin.js';

const { Pool } = pg;
const dbUrl = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'production') {
  throw new Error('API integration tests are disallowed in NODE_ENV=production');
}

let pool;
let adminPool;
let schemaName;
after(async () => {
  if (pool) {
    await pool.end();
    pool = null;
  }
  if (adminPool) {
    try {
      if (schemaName && /^api_test_[a-f0-9]{32}$/.test(schemaName)) {
        await adminPool.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
      }
    } finally {
      await adminPool.end();
      adminPool = null;
    }
  }
});

test('society API authorization, CRUD, persistence, pagination and protected deletion', {
  skip: !dbUrl ? 'DATABASE_URL is not set; API integration test skipped' : false,
}, async () => {
  schemaName = `api_test_${randomUUID().replaceAll('-', '')}`;
  assert.match(schemaName, /^api_test_[a-f0-9]{32}$/);
  adminPool = new Pool({ connectionString: dbUrl });
  // Some imported Replit workspaces label the runtime "production" even
  // without a published app. Independently verify the development database
  // through Replit's development SQL tool before allowing any test writes.
  if (process.env.REPLIT_ENVIRONMENT === 'production') {
    const verified = process.env.DEVELOPMENT_DB_FINGERPRINT;
    assert.match(verified || '', /^[a-f0-9]{32}$/, 'Verify the development database fingerprint before running integration tests');
    const result = await adminPool.query("SELECT md5(current_database() || ':' || current_user) AS fingerprint");
    assert.equal(result.rows[0].fingerprint, verified, 'Refusing tests against an unverified database');
  }
  await adminPool.query(`CREATE SCHEMA "${schemaName}"`);
  pool = new Pool({ connectionString: dbUrl, options: `-c search_path=${schemaName}` });
  await migrate(pool);
  const suffix = randomUUID();
  const ids = Object.fromEntries([
    'resident', 'other', 'admin', 'admin2', 'lastAdmin', 'pending', 'joiner',
    'reapply', 'suspended', 'pendingDelete', 'rateLimit',
  ]
    .map((key) => [key, `test_${key}_${suffix}`]));
  const app = createApiApp({
    pool,
    identity: (req) => req.get('x-test-clerk-user'),
  });
  const as = (userId) => Object.fromEntries(['get', 'post', 'patch', 'delete'].map((method) => [
    method,
    (path) => request(app)[method](path)
      .set('x-test-clerk-user', userId)
      .set('Content-Type', 'application/json'),
  ]));
  const addMember = async (key, role, status) => {
    const result = await pool.query(
      `INSERT INTO ang_members (user_id, name, block, flat, resident_type, role, status)
       VALUES ($1, $2, 'T1', '101', 'Owner', $3, $4) RETURNING id`,
      [ids[key], `Fixture ${key}`, role, status],
    );
    return result.rows[0].id;
  };

  let residentId;
  let otherId;
  let lastAdminId;
  residentId = await addMember('resident', 'Resident', 'Approved');
  otherId = await addMember('other', 'Resident', 'Approved');
  await addMember('admin', 'Admin', 'Approved');
  await addMember('admin2', 'Resident', 'Approved');
  lastAdminId = await addMember('lastAdmin', 'Admin', 'Approved');
  await addMember('pending', 'Resident', 'Pending');
  await addMember('suspended', 'Resident', 'Suspended');
  await addMember('pendingDelete', 'Resident', 'Pending');
  await addMember('reapply', 'Resident', 'Rejected');
  assert.deepEqual(await appointInitialAdmin(pool, undefined), { status: 'not_configured' });
  await assert.rejects(appointInitialAdmin(pool, 'invalid-account-reference'));
  const bootstrapUser = `user_${randomUUID().replaceAll('-', '')}`;
  assert.deepEqual(await appointInitialAdmin(pool, bootstrapUser), { status: 'awaiting_membership' });
  await pool.query(
    "INSERT INTO ang_members (user_id, name, block, flat, resident_type) VALUES ($1, 'Fixture Bootstrap', 'T1', '900', 'Owner')",
    [bootstrapUser],
  );
  assert.deepEqual(await appointInitialAdmin(pool, bootstrapUser), { status: 'appointed' });
  await pool.query("UPDATE ang_members SET role='Resident', status='Suspended' WHERE user_id=$1", [bootstrapUser]);
  assert.deepEqual(await appointInitialAdmin(pool, bootstrapUser), { status: 'already_completed' });
  assert.equal((await pool.query('SELECT status FROM ang_members WHERE user_id=$1', [bootstrapUser])).rows[0].status, 'Suspended');
  await pool.query('DELETE FROM ang_members WHERE user_id=$1', [bootstrapUser]);

  assert.equal((await request(app).get('/api/me')).status, 401);
  assert.deepEqual((await request(app).get('/api/health')).body, { ok: true });
  assert.equal((await as(ids.pending).get('/api/notices')).status, 403);
  assert.equal((await as(ids.suspended).get('/api/notices')).status, 403);
  assert.equal((await as(ids.suspended).get('/api/members')).status, 403);
  assert.equal((await as(ids.resident).post('/api/notices').send({
    title: 'Fake role', content: 'User supplied admin role should not work', priority: 'General', role: 'Admin',
  })).status, 403);

  const forged = await as(ids.joiner).post('/api/membership').send({
    name: 'Fixture Joiner', block: 'T1', flat: '202', residentType: 'Tenant', role: 'Admin',
  });
  assert.equal(forged.status, 400);
  const joining = await as(ids.joiner).post('/api/membership').send({
    name: 'Fixture Joiner', block: 'T1', flat: '202', residentType: 'Tenant',
  });
  assert.equal(joining.status, 201);
  assert.equal(joining.body.status, 'Pending');
  assert.equal(joining.body.role, 'Resident');
  assert.equal((await as(ids.joiner).post('/api/membership').send({
    name: 'Fixture Joiner', block: 'T1', flat: '202', residentType: 'Tenant',
  })).status, 409);
  assert.equal((await as(ids.reapply).post('/api/membership').send({
    name: 'Fixture Reapply', block: 'T1', flat: '303', residentType: 'Owner',
  })).status, 201);
  const reapplied = await pool.query('SELECT status, role FROM ang_members WHERE user_id = $1', [ids.reapply]);
  assert.deepEqual(reapplied.rows[0], { status: 'Pending', role: 'Resident' });

  assert.equal((await request(app).post('/api/membership').set('x-test-clerk-user', ids.joiner)).status, 415);
  assert.equal((await request(app).post('/api/membership')
    .set('x-test-clerk-user', ids.joiner)
    .set('Content-Type', 'application/json')
    .send('{ invalid json')).status, 400);
  const memberPage = await as(ids.admin).get('/api/members?limit=2&offset=0');
  assert.equal(memberPage.status, 200);
  assert.equal(memberPage.body.items.length, 2);
  assert.equal(memberPage.body.hasMore, true);
  assert.equal((await as(ids.resident).get('/api/members')).status, 403);
  assert.equal((await as(ids.admin).patch(`/api/members/${joining.body.id}`).send({ status: 'Approved' })).status, 200);
  assert.equal((await as(ids.admin).patch('/api/members/not-a-uuid').send({ status: 'Approved' })).status, 400);
  assert.equal((await as(ids.admin).patch(`/api/members/${residentId}`).send({ role: 'Admin', status: 'Approved', unexpected: true })).status, 400);
  assert.equal((await as(ids.admin).patch('/api/members/00000000-0000-4000-8000-000000000000').send({ status: 'Approved' })).status, 404);

  let rateLimitResponse;
  for (let index = 0; index < 101; index += 1) {
    rateLimitResponse = await as(ids.rateLimit).post('/api/membership').send({});
  }
  assert.equal(rateLimitResponse.status, 429);

  const blocker = await pool.connect();
  let pendingPatch;
  let blockerInTransaction = false;
  try {
    await blocker.query('BEGIN');
    blockerInTransaction = true;
    await blocker.query("SELECT pg_advisory_xact_lock(hashtext('ang_membership_admin_lock'))");
    pendingPatch = as(ids.admin).patch(`/api/members/${otherId}`).send({ status: 'Rejected' }).then((response) => response);
    const deadline = Date.now() + 5000;
    let waiting = false;
    while (Date.now() < deadline) {
      const waiters = await pool.query("SELECT 1 FROM pg_locks WHERE locktype = 'advisory' AND NOT granted LIMIT 1");
      if (waiters.rowCount) {
        waiting = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.equal(waiting, true, 'PATCH should wait for the membership advisory lock after its initial authorization check');
    await pool.query("UPDATE ang_members SET role = 'Resident' WHERE user_id = $1", [ids.admin]);
    await blocker.query('COMMIT');
    blockerInTransaction = false;
    assert.equal((await pendingPatch).status, 403);
    await pool.query("UPDATE ang_members SET role = 'Admin' WHERE user_id = $1", [ids.admin]);
    assert.equal((await pool.query('SELECT status FROM ang_members WHERE id = $1', [otherId])).rows[0].status, 'Approved');
  } finally {
    if (blockerInTransaction) await blocker.query('ROLLBACK');
    if (pendingPatch) await pendingPatch.catch(() => {});
    blocker.release();
  }

  const noticeOne = await as(ids.admin).post('/api/notices').send({
    title: 'Fixture Notice One', content: 'Fixture notice content for pagination', priority: 'General',
  });
  assert.equal(noticeOne.status, 201);
  const noticeTwo = await as(ids.admin).post('/api/notices').send({
    title: 'Fixture Notice Two', content: 'Another fixture notice for pagination', priority: 'Urgent',
  });
  assert.equal(noticeTwo.status, 201);
  const noticePage = await as(ids.resident).get('/api/notices?limit=1&offset=0');
  assert.equal(noticePage.status, 200);
  assert.equal(noticePage.body.items.length, 1);
  assert.equal(noticePage.body.hasMore, true);
  const changedNotice = await as(ids.admin).patch(`/api/notices/${noticeOne.body.id}`).send({
    title: 'Updated fixture notice', content: 'Updated fixture notice content', priority: 'Urgent',
  });
  assert.equal(changedNotice.status, 200);
  assert.equal(changedNotice.body.priority, 'Urgent');
  assert.equal((await as(ids.admin).get(`/api/notices/${noticeOne.body.id}`)).status, 404);
  assert.equal((await as(ids.admin).delete(`/api/notices/${noticeTwo.body.id}`)).status, 204);
  assert.equal((await as(ids.admin).delete(`/api/notices/${noticeTwo.body.id}`)).status, 404);
  assert.equal((await as(ids.resident).post('/api/notices').send({
    title: 'Resident Notice', content: 'Must fail publishing this notice', priority: 'General',
  })).status, 403);
  assert.equal((await as(ids.resident).get('/api/notices?limit=51')).status, 400);

    const complaint = await as(ids.resident).post('/api/complaints').send({
      title: 'Fixture leak', description: 'Fixture water leak description', category: 'Plumbing', priority: 'High',
    });
    assert.equal(complaint.status, 201);
    assert.equal(complaint.body.timeline.length, 1);
    assert.equal(complaint.body.timeline[0].status, 'Raised');
    const otherComplaints = await as(ids.other).get('/api/complaints');
    assert.equal(otherComplaints.body.items.length, 0);
    assert.equal((await as(ids.other).patch(`/api/complaints/${complaint.body.id}`).send({ title: 'Stolen edit' })).status, 404);
    const editedComplaint = await as(ids.resident).patch(`/api/complaints/${complaint.body.id}`).send({ title: 'Fixture leak edited' });
    assert.equal(editedComplaint.status, 200);
    const resolved = await as(ids.admin).patch(`/api/complaints/${complaint.body.id}`).send({
      status: 'InProgress', note: 'Fixture status update',
    });
    assert.equal(resolved.status, 200);
    assert.equal(resolved.body.timeline.length, 2);
    assert.equal(resolved.body.timeline[1].note, 'Fixture status update');
    assert.equal((await as(ids.resident).patch(`/api/complaints/${complaint.body.id}`).send({ title: 'No longer raised' })).status, 403);
    assert.equal((await as(ids.resident).delete(`/api/complaints/${complaint.body.id}`)).status, 403);
    assert.equal((await as(ids.resident).get('/api/complaints')).body.items.length, 1);
    assert.equal((await as(ids.admin).get('/api/complaints')).body.items.length, 1);
    assert.equal((await as(ids.admin).patch('/api/complaints/00000000-0000-4000-8000-000000000000').send({
      status: 'Closed',
    })).status, 404);

    const removable = await as(ids.resident).post('/api/complaints').send({
      title: 'Fixture request', description: 'Fixture request with no ongoing issue', category: 'Other', priority: 'Normal',
    });
    assert.equal((await as(ids.resident).delete(`/api/complaints/${removable.body.id}`)).status, 204);
    assert.equal((await as(ids.resident).delete(`/api/complaints/${removable.body.id}`)).status, 404);

    const post = await as(ids.resident).post('/api/posts').send({ content: 'Fixture neighborhood discussion' });
    assert.equal(post.status, 201);
    assert.equal((await as(ids.other).patch(`/api/posts/${post.body.id}`).send({ content: 'Forbidden edit' })).status, 403);
    assert.equal((await as(ids.resident).patch(`/api/posts/${post.body.id}`).send({ content: 'Updated fixture discussion' })).status, 200);
    assert.equal((await as(ids.other).get('/api/posts')).status, 200);
    assert.equal((await as(ids.admin).delete(`/api/posts/${post.body.id}`)).status, 204);
    const ownPost = await as(ids.other).post('/api/posts').send({ content: 'Fixture post before account deletion' });
    assert.equal(ownPost.status, 201);

    const exportResponse = await as(ids.resident).get('/api/account/export');
    assert.equal(exportResponse.status, 200);
    assert.equal(exportResponse.body.member.userId, ids.resident);
    assert.equal(exportResponse.body.complaints.length, 1);
    assert.equal(exportResponse.body.posts.length, 0);
    await pool.query("UPDATE ang_members SET role = 'Resident' WHERE user_id = $1", [ids.admin]);
    const lastRole = await as(ids.lastAdmin).patch(`/api/members/${lastAdminId}`).send({ role: 'Resident' });
    assert.equal(lastRole.status, 409);
    assert.equal((await as(ids.lastAdmin).delete('/api/account')).status, 409);
    assert.equal((await as(ids.other).delete('/api/account')).status, 204);
    assert.equal((await pool.query('SELECT id FROM ang_posts WHERE id = $1', [ownPost.body.id])).rowCount, 0);
    assert.equal((await pool.query('SELECT id FROM ang_members WHERE id = $1', [otherId])).rowCount, 0);
    assert.equal((await as(ids.resident).delete('/api/account')).status, 204);
    assert.equal((await pool.query('SELECT id FROM ang_complaints WHERE member_id = $1', [residentId])).rowCount, 0);
    assert.equal((await pool.query('SELECT id FROM ang_posts WHERE member_id = $1', [residentId])).rowCount, 0);

  const pendingExport = await as(ids.pendingDelete).get('/api/account/export');
  assert.equal(pendingExport.status, 200);
  assert.equal(pendingExport.body.member.status, 'Pending');
  assert.equal(pendingExport.body.complaints.length, 0);
  assert.equal(pendingExport.body.posts.length, 0);
  assert.equal((await as(ids.pendingDelete).delete('/api/account')).status, 204);
  assert.equal((await pool.query('SELECT id FROM ang_members WHERE user_id = $1', [ids.pendingDelete])).rowCount, 0);

  const audits = await pool.query(
    "SELECT action FROM ang_audit WHERE actor_user_id = ANY($1::text[]) AND action LIKE 'notice.%'",
    [[ids.admin]],
  );
  assert.ok(audits.rows.some((row) => row.action === 'notice.created'));
  assert.ok(audits.rows.some((row) => row.action === 'notice.updated'));
});