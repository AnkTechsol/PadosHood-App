# Repository assessment (current release preparation)

## Observed stack and code

- JavaScript/JSX, React 19, Vite, npm, CSS, `lucide-react`, and Oxlint.
- Dependencies include Express, Clerk Express/React, PostgreSQL `pg`, Zod, Helmet, rate limiting, and Supertest.
- Backend route modules, `ang_*` migration, CLI scripts, an API test source file, and society UI modules are present in the working tree.
- Active routing is `src/main.jsx` → `src/entry/AppRouter.jsx` → `src/App.jsx`; the legacy civic app is not the active service.
- `server/index.js` provides Express+Vite development and production Express serving of built `dist`, with the canonical Clerk proxy.
- Optional initial-admin startup bootstrap uses the exact configured Clerk ID of an existing member; see the [operator runbook](RUNBOOK.md) for its one-time audit behavior and production procedure.
- Package declares `dev`, `build`, `lint`, `preview`, `start`, `db:migrate`, `admin`, and `test` scripts.
- `src/lib/supabase.js` and a legacy SQL file exist, but no Supabase connection is configured for the Angaan service. They are not its data source.
- No resident demo seeds are present in the new `ang_*` migration.

## Risks and readiness gaps

- Parent-reported dev/API smoke, build, 4/4 tests, lint (exit 0 with 89 legacy/dormant warnings and active-code targeted lint clean), local production-mode serving smoke, screenshots, and `git diff --check` evidence is recorded in [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md).
- Completed signed-in resident/admin and mobile authentication/workflow verification remain incomplete; only landing and Clerk sign-up views were visually checked.
- No production publication, production migration, backup/restore exercise, or monitoring/alert configuration is evidenced. Local `npm start` smoke in the development workspace does not verify a deployed production environment.
- Production database/provider location, legal operator, retention, owner-approved privacy/terms, and public support channel are unresolved.
- Existing legacy/archived civic paths contain features/data concepts outside the launch scope; avoid reusing/importing them.

## Assessment boundary

The evidence boundary is in [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md); checks there were reported by the parent implementation owner, not executed by this documentation subtask. This is still not production readiness. Owner-selected requirements and release gates are in [SOCIETY_LAUNCH.md](../product/SOCIETY_LAUNCH.md); account for Markdown disposition in [DOCUMENTATION_AUDIT.md](DOCUMENTATION_AUDIT.md).