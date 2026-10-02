import assert from 'node:assert/strict';
import { test } from 'node:test';
import express from 'express';
import request from 'supertest';
import { requireSameOrigin } from '../server/security.js';

function appForTest() {
  const app = express();
  app.use(requireSameOrigin);
  app.post('/api/example', (_req, res) => res.json({ ok: true }));
  app.get('/api/example', (_req, res) => res.json({ ok: true }));
  return app;
}

test('cross-origin mutation is rejected, including same-site hostile subdomain', async () => {
  const app = appForTest();
  assert.equal((await request(app).post('/api/example').set('Host', 'society.example')
    .set('Origin', 'https://attacker.example')).status, 403);
  assert.equal((await request(app).post('/api/example').set('Host', 'society.example')
    .set('Origin', 'https://evil.society.example')).status, 403);
  assert.equal((await request(app).post('/api/example')
    .set('Sec-Fetch-Site', 'cross-site')).status, 403);
});

test('same-origin and forwarded proxy hosts permit mutations', async () => {
  const app = appForTest();
  assert.equal((await request(app).post('/api/example').set('Host', 'society.example')
    .set('Origin', 'https://society.example')).status, 200);
  assert.equal((await request(app).post('/api/example').set('Host', 'internal.example')
    .set('X-Forwarded-Host', 'society.example, internal.example')
    .set('Origin', 'https://society.example')).status, 200);
});

test('opaque or malformed origins are rejected, reads are not blocked', async () => {
  const app = appForTest();
  assert.equal((await request(app).post('/api/example').set('Origin', 'null')).status, 403);
  assert.equal((await request(app).post('/api/example').set('Origin', 'file://society.example')).status, 403);
  assert.equal((await request(app).get('/api/example').set('Origin', 'https://other.example')).status, 200);
});