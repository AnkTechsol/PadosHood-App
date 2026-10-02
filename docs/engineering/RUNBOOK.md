# Operations runbook (deployment/operator decisions pending)

This is guidance for the intended Express+Vite/PostgreSQL service; it does not assert that the service is deployed or monitored. Assign an operator, resident contact, alert destination, and production recovery authority before launch. Do not post secrets, database URLs, Clerk tokens, or resident text in shared incident channels.

## Runtime commands

The package declares `npm run dev` (single Express+Vite development workflow), `npm run build`, `npm start` (`NODE_ENV=production` Express serving built `dist`), `npm run db:migrate`, `npm run admin -- <clerk-user-id>`, and `npm test` (`node --test tests/*.test.js`). Parent-reported development, build, lint, test, and local production-serving smoke results are in [release evidence](RELEASE_EVIDENCE.md). A local `npm start` smoke is not evidence of publication or production credentials/database. The test database fingerprint guard is documented there; never run tests against production.

API routes and their auth/response contract remain in the parent-owned [API reference](API.md). Initial-admin bootstrap is an operator-only server-startup action, not a public API endpoint.

## First production initialization

1. Create isolated production Clerk credentials and production PostgreSQL database; configure secrets via Replit's environment/secrets flow, never in source. Keep development and production Clerk IDs separate.
2. Verify backup/restore and database access/region/retention with the selected host.
3. Run `npm run db:migrate` against the intended database. Migration 001 creates `ang_*` tables; check output and schema.
4. Publish the pre-launch app. Have the designated committee administrator sign up through production Clerk and submit their own joining request. Verify their identity and society authorization out of band.
5. Copy the Account reference (the Clerk `user.id`) shown on the joining/pending screen. It is an identifier, not a password or credential. In the production workspace environment flow, set the non-secret `SOCIETY_INITIAL_ADMIN_USER_ID` to this exact ID, then republish/restart the target server.
6. At startup, the bootstrap appoints only an existing member matching that exact ID: it sets the role to Admin and status to Approved, and records a one-time audit event under an advisory transaction lock. Check the startup `initial_admin_setup` status and sign in as the designated administrator to verify the role; then clear `SOCIETY_INITIAL_ADMIN_USER_ID` from the production environment. If the configured ID has no membership yet, startup reports `awaiting_membership`; unset configuration reports `not_configured`. No first-user-wins or default-admin behavior exists. After the audit event, later restarts do not re-appoint or restore that member's role/status if the member is subsequently suspended or deleted.
7. The existing `npm run admin -- <clerk-user-id>` CLI remains an optional operator-managed alternative for a verified existing member. Use it only in an authorized, controlled process with the intended database; never expose a production `DATABASE_URL` in shell commands or ask an agent with read-only production SQL access to perform production writes.
8. Verify `/api/health` and anonymous authorization behavior, then verify real signed-in admin/resident capabilities before inviting residents. The reported local production-mode smoke (`/api/health` and `/` 200; forged `X-Test-Clerk-User` on `/api/me` 401) is not a production deployment or signed-in verification; see [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md).

## Common operation and failure response

- **Database health failure:** `/api/health` is expected to return 503 when database connectivity fails. Confirm database status and configured secret without exposing credentials; restore service/provider connectivity before reopening workflows.
- **Migration failure:** stop deployment; retain error output with secrets redacted; do not drop tables. Inspect migration/schema and restore only with approved, verified recovery procedures.
- **Lost/locked-out administrator:** do not delete/reinitialize member data. Use an authorized operator with database access to verify a known existing member and use the admin CLI; log the action and audit it.
- **Suspected unauthorized access or data exposure:** restrict affected service through deployment controls; preserve evidence, notify assigned operator/committee, engage qualified counsel as appropriate; follow [incident response](INCIDENT_RESPONSE.md).
- **Release regression:** deploy last known-good code without reverting/dropping data; database rollback is not currently automated. Check restore procedures before any data restoration.

Monitoring, backup schedules, provider region, service-level targets, log retention, alert thresholds, contact identities, and support details are not known/approved; they are launch prerequisites rather than invented runbook values.

## Test database guard

The PostgreSQL API suite uses an isolated ephemeral schema, cleans it up, and rejects `NODE_ENV=production`. In ordinary development run `npm test`. If the imported environment incorrectly sets `REPLIT_ENVIRONMENT=production` while deployment detection says `isDeployed: false`, use `DEVELOPMENT_DB_FINGERPRINT=<verified-development-database-fingerprint> npm test` only for that environment. Obtain the fingerprint with `SELECT md5(current_database() || ':' || current_user) AS fingerprint` through the development SQL tool; never document the value, target a production DB, or override `NODE_ENV`. Full instructions and reported checks are in [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md).
