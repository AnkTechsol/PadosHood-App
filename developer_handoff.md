# Developer handoff

The project is being prepared for the Angaan society service for Woodsville Phase 2. Read [the launch scope](docs/product/SOCIETY_LAUNCH.md), [API contract](docs/engineering/API.md), [runbook](docs/engineering/RUNBOOK.md), and [documentation audit](docs/engineering/DOCUMENTATION_AUDIT.md) before making changes. The initial-admin bootstrap is an operator-controlled startup procedure in the runbook, not a public API route.

## Commands

The intended commands are:

```sh
npm run dev
npm run build
npm start
npm run db:migrate
npm run admin -- <clerk-user-id>
npm test
```

The package manifest declares the `dev`, `build`, `lint`, `preview`, `start`, `db:migrate`, `admin`, and `test` scripts. `server/index.js` provides the Express/Vite development server and Express production server for built `dist`, with the canonical Clerk proxy and optional startup admin bootstrap. Parent-reported final evidence, including the local production-mode smoke and its limits, is in [RELEASE_EVIDENCE.md](docs/engineering/RELEASE_EVIDENCE.md).

`npm test` works directly in ordinary development. In this imported workspace, if `REPLIT_ENVIRONMENT=production` is set while the deployment detector says this is not a deployment, protect the ephemeral-PostgreSQL API tests with the verified development database fingerprint:

```sh
DEVELOPMENT_DB_FINGERPRINT=<verified-development-database-fingerprint> npm test
```

Use that only when `REPLIT_ENVIRONMENT=production`; obtain the value by running `SELECT md5(current_database() || ':' || current_user) AS fingerprint` through the development SQL tool. Never put the fingerprint value in docs or source, never point tests at production, and never override `NODE_ENV` to bypass the test guard.

Production requires correctly separated Clerk development/production instances and PostgreSQL credentials configured as secrets. Run migrations against the intended database before serving traffic. To bootstrap the first administrator, a human operator verifies a designated member out of band; that person signs up through production Clerk and submits a joining request. Use the Account reference (`user.id`) shown on the joining/pending screen to configure the non-secret `SOCIETY_INITIAL_ADMIN_USER_ID` via the production workspace environment flow, then republish/restart. Startup appoints only an existing member matching that exact ID and records a one-time audit event. Verify the role, then clear the variable. No default admin, first-user-wins, or automatic self-promotion exists. See the [runbook](docs/engineering/RUNBOOK.md) for status results, behavior after the audit, and the optional admin CLI path.

Never use real resident data in tests or screenshots. See release prerequisites in [SOCIETY_LAUNCH.md](docs/product/SOCIETY_LAUNCH.md).
