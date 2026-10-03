# Angaan · Woodsville Phase 2

The owner selected Angaan as the resident portal for their own society and wants Replit publishing. Preserve the imported React/JavaScript/Vite/npm/vanilla-CSS structure. Do not migrate frameworks or add other societies, civic advertisements, billing, document uploads or AI without approval.

## Run and verify

- **Start application** workflow: `npm run dev` runs a single Express server with Vite middleware on `0.0.0.0:5000`.
- `npm run build`: builds the client/PWA into `dist/`.
- `npm start`: production Express serves `dist/`, API and Clerk proxy.
- `npm run db:migrate`: applies additive `ang_*` schema; startup also runs it under a transaction lock.
- `npm test`: Node API/security tests using an isolated temporary database schema, never real resident fixtures.
- `npm run lint`: full-repository check; legacy warnings remain. Targeted active-code lint is clean.

Some imported workspaces label `REPLIT_ENVIRONMENT=production` despite having no published app. In that case the API tests require `DEVELOPMENT_DB_FINGERPRINT`, independently obtained with the development SQL tool; see the runbook. Never override the test production-mode guard or point tests at a production database.

## Active implementation

`src/main.jsx` loads `src/entry/AppRouter.jsx`, then `src/App.jsx` at `/user-portal`. `server/index.js` verifies Clerk sessions and serves `/api`; PostgreSQL owns membership and permissions. Browser data/roles are never trusted. The old civic `src/core`, features, contexts, pages and archive are retained reference code, not the active app. The Supabase helper/schema are legacy, not a dependency to configure.

Launch scope: membership requests/approval, notice management, private complaints with status history, society discussions, member administration and self-service export/deletion. Pending/rejected/suspended members cannot access society content but can export/delete their application data.

## Configuration and administrator setup

Runtime requires managed `DATABASE_URL`, `CLERK_SECRET_KEY` and `CLERK_PUBLISHABLE_KEY`; client build uses Clerk's public `VITE_CLERK_PUBLISHABLE_KEY`. Private credentials remain in Replit Secrets. Canonical Clerk provider/proxy wiring is required for production; do not manually change managed keys or add bearer tokens to web requests.

No default/first-signup administrator exists. The owner signs up and submits a joining request; an operator verifies the person out of band and appoints their exact Clerk Account reference through `SOCIETY_INITIAL_SUPER_ADMIN_USER_ID` in the intended environment, followed by restart/republish. The audited bootstrap runs once for that ID; clear the variable after verifying appointment. A separate Admin uses their own Clerk account; only Super Admin can grant/revoke Admin access. The ordinary `npm run admin -- <clerk-user-id>` CLI cannot change Super Admin. Recovery of a lost/compromised Super Admin requires a separately verified account and the audited `npm run recover:super-admin -- <current-id> <replacement-id>` operator procedure. Never seed or share production passwords or copy production credentials into development.

Development and production Clerk accounts are separate; appoint the production account independently.

## Publishing and release gates

Configured Autoscale: build `npm run build`, run `npm start`. Not published yet. Do not switch to Static: the API and Clerk proxy need a server.

Verified: build, four automated API/security tests (no skips), clean targeted lint, full lint exit 0 with 89 legacy warnings, development health 200 and private API 401, local production-serving smoke, desktop/mobile public landing and mobile sign-up rendering.

**NOT READY FOR RESIDENT RELEASE:** first administrator not appointed; real signed-in UI not verified; production database/auth, backup/restore and monitoring not verified; committee/operator support, retention, privacy and legal approvals outstanding. `/privacy` is operational launch information, not an approved legal policy.

See `docs/product/SOCIETY_LAUNCH.md`, `docs/engineering/API.md`, `RUNBOOK.md`, `RELEASE_EVIDENCE.md` and `DOCUMENTATION_AUDIT.md` under `docs/engineering/`.