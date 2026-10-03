import pg from 'pg';
import { transferSuperAdmin } from '../server/bootstrap-admin.js';

const [currentUserId, replacementUserId, ...extra] = process.argv.slice(2);
if (!process.env.DATABASE_URL || !currentUserId || !replacementUserId || extra.length) {
  console.error('Usage: npm run recover:super-admin -- <current-clerk-user-id> <replacement-clerk-user-id>');
  process.exitCode = 1;
} else {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  try {
    await transferSuperAdmin(pool, currentUserId, replacementUserId);
    console.log('Super Admin role transferred; the previous account is suspended.');
  } catch {
    console.error('Super Admin recovery failed. Verify both account references and database access.');
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}