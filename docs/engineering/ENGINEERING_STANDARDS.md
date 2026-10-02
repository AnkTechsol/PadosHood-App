# Engineering Standards

## Code Quality
- All JavaScript/React code must be formatted properly.
- Run Oxlint on changed/active code; report full-repository warnings rather than claiming the entire legacy tree is warning-free. Latest parent-reported `npm run lint` exited 0 with 89 legacy/dormant-code warnings; targeted active auth, society UI/API, server, and test lint was clean. See [release evidence](RELEASE_EVIDENCE.md).
- No silent error swallowing.

## Testing
- The package currently declares `npm test` using Node's built-in test runner (`node --test tests/*.test.js`), and an API test source file exists.
- Test positive, invalid-input, unauthenticated, unauthorized, record-ownership, conflict, and dependency-failure paths for API behavior.
- Do not use real resident personal data. Use isolated synthetic data only in tests and never seed production with residents.
- Latest parent-reported test evidence is 4/4 passing tests, none skipped, including exact-ID and one-time initial-admin bootstrap tests; the API suite runs in an isolated ephemeral PostgreSQL schema and refuses `NODE_ENV=production`. See [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md) for the test-environment fingerprint guard. Preserve that boundary and do not point tests at production.

## Git Workflow
- Feature branches off `main`.
- PRs require approval before merging.

Security-sensitive authorization must be server-side, SQL parameterized, and verified by tests. Keep session credentials and submitted text out of logs. New vendors/data flows need updated inventory and owner/legal review before use.
