import { z } from 'zod';

export const SOCIETY = { id: 'woodsville-phase-2', name: 'Woodsville Phase 2' };
export const uuidSchema = z.string().uuid();
const text = (min, max) => z.string().trim().min(min).max(max);
const strictObject = (shape) => z.object(shape).strict();
export const schemas = {
  membership: strictObject({
    name: text(2, 100),
    block: text(1, 40),
    flat: text(1, 40),
    residentType: z.enum(['Owner', 'Tenant']),
  }),
  memberPatch: strictObject({
    status: z.enum(['Pending', 'Approved', 'Rejected', 'Suspended']).optional(),
    role: z.enum(['Resident', 'Admin']).optional(),
  }).refine((value) => Object.keys(value).length > 0),
  notice: strictObject({
    title: text(3, 160),
    content: text(5, 5000),
    priority: z.enum(['General', 'Urgent']),
  }),
  complaintCreate: strictObject({
    title: text(3, 160),
    description: text(5, 5000),
    category: z.enum(['Plumbing', 'Electrical', 'Cleaning', 'Security', 'Common areas', 'Other']),
    priority: z.enum(['Normal', 'High']),
  }),
  complaintEdit: strictObject({
    title: text(3, 160),
    description: text(5, 5000),
    category: z.enum(['Plumbing', 'Electrical', 'Cleaning', 'Security', 'Common areas', 'Other']),
    priority: z.enum(['Normal', 'High']),
  }).partial().refine((value) => Object.keys(value).length > 0),
  complaintAdmin: strictObject({
    status: z.enum(['Raised', 'InProgress', 'Resolved', 'Closed']),
    note: text(0, 1000).optional().default(''),
  }),
  post: strictObject({ content: text(2, 3000) }),
};

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function parse(schema, input) {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new ApiError(400, `Invalid request: ${result.error.issues[0]?.message ?? 'invalid fields'}`);
  }
  return result.data;
}

export function memberJson(row) {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    block: row.block,
    flat: row.flat,
    residentType: row.resident_type,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function noticeJson(row) {
  return {
    id: row.id, title: row.title, content: row.content, priority: row.priority,
    createdAt: row.created_at, updatedAt: row.updated_at,
  };
}

export function postJson(row) {
  return {
    id: row.id, content: row.content, memberId: row.member_id, authorName: row.author_name,
    createdAt: row.created_at, updatedAt: row.updated_at,
  };
}

export function pagination(req) {
  const limit = req.query.limit === undefined ? 20 : Number(req.query.limit);
  const offset = req.query.offset === undefined ? 0 : Number(req.query.offset);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 50 || !Number.isSafeInteger(offset) || offset < 0) {
    throw new ApiError(400, 'Invalid pagination: limit must be 1–50 and offset must be non-negative');
  }
  return { limit, offset };
}

export async function audit(client, actorUserId, action, targetType, targetId) {
  await client.query(
    'INSERT INTO ang_audit (actor_user_id, action, target_type, target_id) VALUES ($1, $2, $3, $4)',
    [actorUserId, action, targetType, targetId == null ? null : String(targetId)],
  );
}

export async function transaction(pool, callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch { /* retain the original failure */ }
    throw error;
  } finally {
    client.release();
  }
}