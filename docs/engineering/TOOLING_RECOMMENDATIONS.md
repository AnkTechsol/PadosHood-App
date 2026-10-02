# Tooling assessment

This is not an approved dependency roadmap. Current repository dependencies include React/Vite, Clerk, Express, `pg`, Zod, Helmet, `express-rate-limit`, Oxlint, and Supertest. Use the repository's actual scripts and preserve the single Express+Vite target; do not install additional tooling without a scoped need and owner approval.

The manifest and `server/index.js` now provide the intended server, migration, admin, and test commands. Parent-reported verification is recorded in [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md). No additional tooling is required by this recommendation; full-repository lint still has legacy warnings.

Optional future work such as static typing, formatting, component/E2E coverage, dependency scanning, or CI requires an explicit engineering decision and should not delay required API/security tests. No CI service or monitoring vendor is currently documented as configured.
