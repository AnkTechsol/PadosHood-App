import express from 'express';
import helmet from 'helmet';
import pg from 'pg';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { clerkMiddleware, getAuth } from '@clerk/express';
import { publishableKeyFromHost } from '@clerk/shared/keys';
import { CLERK_PROXY_PATH, clerkProxyMiddleware, getClerkProxyHost } from './clerk-proxy.js';
import { createApiRouter } from './api.js';
import { ApiError } from './api-helpers.js';
import { migrate } from './db.js';
import { requireSameOrigin } from './security.js';
import { appointInitialAdmin } from './bootstrap-admin.js';

const production = process.env.NODE_ENV === 'production';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const key of ['DATABASE_URL', 'CLERK_SECRET_KEY', 'CLERK_PUBLISHABLE_KEY']) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});
pool.on('error', () => console.error(JSON.stringify({ event: 'database_pool_error' })));
await migrate(pool);
const appointment = await appointInitialAdmin(pool, process.env.SOCIETY_INITIAL_ADMIN_USER_ID);
console.log(JSON.stringify({ event: 'initial_admin_setup', status: appointment.status }));
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({
  // Clerk/CAPTCHA CSP must be validated against the configured providers.
  // Preview is intentionally embeddable in Replit; production is not.
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  frameguard: production ? { action: 'sameorigin' } : false,
}));
app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());
app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use('/api', requireSameOrigin);
app.use(express.json({ limit: '32kb', strict: true }));
app.use(
  clerkMiddleware((req) => ({
    publishableKey: publishableKeyFromHost(
      getClerkProxyHost(req) ?? '',
      process.env.CLERK_PUBLISHABLE_KEY,
    ),
  })),
);
app.use('/api', createApiRouter({ pool, identity: req => getAuth(req)?.userId }));
app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found' }));

let vite;
if (!production) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true, hmr: { server: undefined } },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(root, 'dist'), {
    setHeaders(res, file) {
      res.set('Cache-Control', file.includes(`${path.sep}assets${path.sep}`)
        ? 'public, max-age=31536000, immutable' : 'no-cache');
    },
  }));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || path.extname(req.path)) return next();
    res.set('Cache-Control', 'no-cache');
    return res.sendFile(path.join(root, 'dist/index.html'));
  });
}
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));
app.use((error, _req, res, _next) => {
  if (res.headersSent) return res.end();
  const status = error instanceof ApiError ? error.status
    : error.type === 'entity.parse.failed' ? 400
      : error.type === 'entity.too.large' ? 413 : 500;
  if (status >= 500) console.error(JSON.stringify({ event: 'request_failed', status }));
  const message = error instanceof ApiError ? error.message
    : status === 400 ? 'Invalid JSON body'
      : status === 413 ? 'Request body is too large' : 'Service temporarily unavailable';
  res.status(status).json({ error: message });
});
const port = Number(process.env.PORT || 5000);
const server = app.listen(port, '0.0.0.0', () => {
  console.log(JSON.stringify({ event: 'server_listening', port, mode: production ? 'production' : 'development' }));
});
async function shutdown() {
  server.close(async () => {
    await vite?.close();
    await pool.end();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);