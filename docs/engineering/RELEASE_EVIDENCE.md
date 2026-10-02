# Release evidence — current status

**Decision: NOT READY FOR RESIDENT RELEASE.** This record captures the latest checks reported by the parent implementation owner. It is engineering evidence, not committee approval, legal review, a published deployment, or proof of a completed signed-in resident/admin journey.

## Verified checks

- Active routing: `src/main.jsx` → `src/entry/AppRouter.jsx` → `src/App.jsx`; Express/Vite development server, built `dist` production serving, and canonical Clerk proxy are integrated.
- Final `npm run build` passed.
- Final `npm test` passed 4/4 tests with none skipped, including exact-Clerk-ID and one-time initial-admin bootstrap tests.
- Final `npm run lint` exited 0 with 89 warnings, all in legacy/dormant code. Targeted Oxlint on active auth, society UI/API, server, and test files was clean.
- The restarted development workflow on port 5000 started cleanly. Startup reported `initial_admin_setup` with status `not_configured`, as no initial-admin ID was configured.
- Development workflow API smoke: public `GET /api/health` returned `200`; anonymous `GET /api/me` returned `401`.
- Local production-serving smoke in the development workspace: `npm start` on temporary port 5001 returned `200` for `/api/health` and `/`; the root response referenced built hashed assets. `GET /api/me` with a forged `X-Test-Clerk-User` header returned `401`.
- `git diff --check` passed.
- Desktop landing and mobile full-landing/mobile Clerk sign-up screenshots rendered correctly; the expected Clerk development-mode warning was visible. These unauthenticated screenshots do not verify completed sign-up, signed-in UI, or resident/admin workflows.
- No private credentials were added to code; a Clerk publishable key being visible to the browser is expected and is not a private credential.

## Test database safety

The PostgreSQL API suite creates an isolated ephemeral schema and cleans it up. It refuses to run when `NODE_ENV=production`. In ordinary development, use `npm test`.

In this imported workspace, `REPLIT_ENVIRONMENT=production` may misleadingly be set even though deployment detection reports `isDeployed: false`. In that case the test guard requires a development database fingerprint:

```sh
DEVELOPMENT_DB_FINGERPRINT=<verified-development-database-fingerprint> npm test
```

Use this override only for the imported-workspace mismatch when `REPLIT_ENVIRONMENT=production`. Obtain the fingerprint through the development SQL tool with:

```sql
SELECT md5(current_database() || ':' || current_user) AS fingerprint;
```

Do not record the returned fingerprint in documentation or source. Never point this test suite at a production database and never override `NODE_ENV` to get around the production guard. The parent verified the development database fingerprint through the SQL tool; no raw credentials are documented here.

## Not verified / remaining release gates

- Replit autoscale configuration is saved but **not published**. The local production-mode server smoke above is not a published deployment and does not verify production secrets, database, or Clerk configuration.
- No completed signed-in resident/admin journey or mobile authentication/workflow has been verified; only unauthenticated responsive landing and Clerk sign-up views were visually checked.
- No production database migration, backup, or restore exercise is evidenced here.
- No initial administrator has yet been designated or appointed, and no resident rollout has occurred. No default administrator exists. The designated, out-of-band-verified joining member must be explicitly appointed through the one-time startup bootstrap or existing operator CLI; details and caveats are in the runbook.
- Committee authority, legal operator, resident support contact, retention/backup policy, and qualified review of privacy/terms/AUP are still required. `/privacy` is an operational product/data explanation, **not an approved legal privacy policy**.
- Confirm Clerk development/production separation and production secrets/database before inviting residents.

Passing build/tests and the local production-serving smoke do not establish a production deployment or approve launch. Update this report only with newly executed evidence and identified owners; final resident release requires the open gates above.