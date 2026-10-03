# Operations runbook (deployment/operator decisions pending)

This is guidance for the intended Express+Vite/PostgreSQL service; it does not assert that the service is deployed or monitored. Assign an operator, resident contact, alert destination, and production recovery authority before launch. Do not post secrets, database URLs, Clerk tokens, or resident text in shared incident channels.

## Runtime commands

The package declares `npm run dev` (single Express+Vite development workflow), `npm run build`, `npm start` (`NODE_ENV=production` Express serving built `dist`), `npm run db:migrate`, `npm run admin -- <clerk-user-id>`, `npm run recover:super-admin -- <current-clerk-user-id> <replacement-clerk-user-id>`, and `npm test` (`node --test tests/*.test.js`). Parent-reported development, build, lint, test, and local production-serving smoke results are in [release evidence](RELEASE_EVIDENCE.md). A local `npm start` smoke is not evidence of publication or production credentials/database. The test database fingerprint guard is documented there; never run tests against production.

API routes and their auth/response contract remain in the parent-owned [API reference](API.md). Initial Admin and Super Admin bootstraps are operator-only server-startup actions, not public API endpoints.

## First production initialization

1. Create isolated production Clerk credentials and production PostgreSQL database; configure secrets via Replit's environment/secrets flow, never in source. Keep development and production Clerk IDs separate.
2. Verify backup/restore and database access/region/retention with the selected host.
3. Run `npm run db:migrate` against the intended database. Migration 001 creates `ang_*` tables and migration 002 adds the Super Admin role and single-account index without deleting member data; check output and schema.
4. Publish the pre-launch app. Have the owner sign up through production Clerk and submit their own joining request. Verify their identity and society authorization out of band.
5. Copy the owner’s Account reference (the Clerk `user.id`) from the joining/pending screen. It is an identifier, not a password or credential. In the production workspace environment flow, set the non-secret `SOCIETY_INITIAL_SUPER_ADMIN_USER_ID` to this exact ID, then republish/restart the target server.
6. At startup, Super Admin bootstrap appoints only the existing member matching that exact ID, approves membership, and writes a one-time audit event under an advisory transaction lock. Check the startup `superAdminStatus` for `appointed`, then sign in as the owner and confirm the Super Admin role. Clear `SOCIETY_INITIAL_SUPER_ADMIN_USER_ID` after verification. If the ID has no membership, startup reports `awaiting_membership`; no ID reports `not_configured`; if another Super Admin exists, it leaves all roles unchanged and reports `super_admin_already_assigned`. No first-user-wins or default-admin behavior exists.
7. To set up a separate demonstration Admin, have that person create their own production Clerk account and submit a joining request. Verify them and approve the resident membership. The owner then uses Members → Make admin. To retire the demo Admin, the owner uses Members → Suspend and Remove admin. Never share or seed a password; the two people sign in with their own Clerk accounts.
8. The existing `npm run admin -- <clerk-user-id>` CLI is a legacy operator override for an ordinary Admin; it refuses to change a Super Admin. Use the Super Admin’s Members screen for routine role management. Use the CLI only in a separately authorized, controlled process with the intended database; never expose a production `DATABASE_URL` in shell commands or ask an agent with read-only production SQL access to perform production writes.
9. If the Super Admin account is lost or compromised, verify the replacement owner’s identity out of band and ensure their membership is Approved. In the authorized production workspace, use `npm run recover:super-admin -- <current-clerk-user-id> <replacement-clerk-user-id>`. This transfers the sole role, suspends the previous account, and records both changes in audit history. Confirm the new owner can sign in; never run this as routine admin management.
10. Verify `/api/health` and anonymous authorization behavior, then verify real signed-in Admin/Super Admin/resident capabilities before inviting residents. The reported local production-mode smoke (`/api/health` and `/` 200; forged `X-Test-Clerk-User` on `/api/me` 401) is not a production deployment or signed-in verification; see [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md).

## Common operation and failure response

- **Database health failure:** `/api/health` is expected to return 503 when database connectivity fails. Confirm database status and configured secret without exposing credentials; restore service/provider connectivity before reopening workflows.
- **Migration failure:** stop deployment; retain error output with secrets redacted; do not drop tables. Inspect migration/schema and restore only with approved, verified recovery procedures.
- **Lost/locked-out Admin:** if the Super Admin remains active, have the owner appoint a verified replacement from Members. If the Super Admin is lost or compromised, use the audited Super Admin recovery CLI after verifying a replacement owner account. Do not delete/reinitialize member data.
- **Suspected unauthorized access or data exposure:** restrict affected service through deployment controls; preserve evidence, notify assigned operator/committee, engage qualified counsel as appropriate; follow [incident response](INCIDENT_RESPONSE.md).
- **Release regression:** deploy last known-good code without reverting/dropping data; database rollback is not currently automated. Check restore procedures before any data restoration.

Monitoring, backup schedules, provider region, service-level targets, log retention, alert thresholds, contact identities, and support details are not known/approved; they are launch prerequisites rather than invented runbook values.

## Test database guard

The PostgreSQL API suite uses an isolated ephemeral schema, cleans it up, and rejects `NODE_ENV=production`. In ordinary development run `npm test`. If the imported environment incorrectly sets `REPLIT_ENVIRONMENT=production` while deployment detection says `isDeployed: false`, use `DEVELOPMENT_DB_FINGERPRINT=<verified-development-database-fingerprint> npm test` only for that environment. Obtain the fingerprint with `SELECT md5(current_database() || ':' || current_user) AS fingerprint` through the development SQL tool; never document the value, target a production DB, or override `NODE_ENV`. Full instructions and reported checks are in [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md).
