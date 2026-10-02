import express from 'express';
import rateLimit from 'express-rate-limit';
import { ApiError } from './api-helpers.js';
import { registerAccountRoutes } from './routes-account.js';
import { registerComplaintRoutes } from './routes-complaints.js';
import { registerMemberRoutes } from './routes-members.js';
import { registerNoticePostRoutes } from './routes-notices-posts.js';

const mutations = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);

export function clerkIdentity(getAuth) {
  return (req) => getAuth(req).userId;
}

export function createApiRouter({ pool, identity }) {
  if (!pool || typeof identity !== 'function') throw new TypeError('createApiRouter requires pool and identity(req)');
  const router = express.Router();
  router.get('/health', async (_req, res) => {
    try {
      await pool.query('SELECT 1');
      res.json({ ok: true });
    } catch {
      res.status(503).json({ error: 'Service temporarily unavailable' });
    }
  });

  router.use(async (req, _res, next) => {
    try {
      const userId = await identity(req);
      if (typeof userId !== 'string' || userId.length === 0) throw new ApiError(401, 'Authentication required');
      req.apiUserId = userId;
      next();
    } catch (error) {
      if (error instanceof ApiError) next(error);
      else next(new ApiError(401, 'Authentication required'));
    }
  });

  const writeLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.apiUserId,
    message: { error: 'Too many requests; try again later' },
  });
  router.use((req, _res, next) => {
    if (!mutations.has(req.method)) return next();
    if (req.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
      return next(new ApiError(415, 'Content-Type must be application/json'));
    }
    if (req.get('sec-fetch-site')?.toLowerCase() === 'cross-site') {
      return next(new ApiError(403, 'Same-origin request required'));
    }
    return writeLimit(req, _res, next);
  });

  registerMemberRoutes(router, { pool });
  registerNoticePostRoutes(router, { pool });
  registerComplaintRoutes(router, { pool });
  registerAccountRoutes(router, { pool });

  router.use((_req, _res, next) => next(new ApiError(404, 'Endpoint not found')));
  return router;
}

export function createApiApp(options) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb', strict: true }));
  app.use('/api', createApiRouter(options));
  app.use((req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Endpoint not found' });
    return res.status(404).json({ error: 'Not found' });
  });
  app.use((error, _req, res, _next) => {
    if (res.headersSent) return;
    const status = error instanceof ApiError ? error.status
      : Number.isInteger(error.status) && error.status >= 400 && error.status < 500 ? error.status : 500;
    let message = error instanceof ApiError ? error.message : 'Internal server error';
    if (error.type === 'entity.parse.failed') {
      message = 'Invalid JSON body';
    } else if (error.type === 'entity.too.large') {
      message = 'Request body is too large';
    }
    res.status(status).json({ error: message });
  });
  return app;
}
