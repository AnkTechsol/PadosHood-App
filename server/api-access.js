import { ApiError, memberJson } from './api-helpers.js';

export async function getMember(pool, userId) {
  const result = await pool.query('SELECT * FROM ang_members WHERE user_id = $1', [userId]);
  return result.rows[0] ?? null;
}

export async function requireMember(pool, req, { approved = true } = {}) {
  const member = await getMember(pool, req.apiUserId);
  if (!member || (approved && member.status !== 'Approved')) {
    throw new ApiError(403, 'Approved society membership required');
  }
  return member;
}

export async function requireAdmin(pool, req) {
  const member = await requireMember(pool, req);
  if (member.role !== 'Admin') throw new ApiError(403, 'Administrator permission required');
  return member;
}

export function hasUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function checkUuid(value) {
  if (!hasUuid(value)) throw new ApiError(400, 'Invalid UUID');
}

export function rowOr404(result, message = 'Record not found') {
  if (!result.rowCount) throw new ApiError(404, message);
  return result.rows[0];
}

export function memberResult(row) {
  return memberJson(row);
}