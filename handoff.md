# Handoff

The previous handoff described a mocked React Context product and is obsolete. Owner-selected product and requirements are documented in [docs/product/SOCIETY_LAUNCH.md](docs/product/SOCIETY_LAUNCH.md); its API contract is [docs/engineering/API.md](docs/engineering/API.md).

The society client is now active through `src/main.jsx` → `src/entry/AppRouter.jsx` → `src/App.jsx`. Express/Vite development and Express production serving are wired, with a canonical Clerk proxy and optional exact-ID startup admin bootstrap. Parent-reported build/test/lint and local production-serving smoke evidence, with its limits, is summarized in [RELEASE_EVIDENCE.md](docs/engineering/RELEASE_EVIDENCE.md).

Next: complete signed-in resident/admin and mobile workflow verification; publish only after production configuration, database migration and recovery evidence; obtain society/legal/operator approvals and assign support and retention policies. The designated initial administrator must join through production Clerk and submit a request, be verified out of band, then be explicitly appointed using the documented `SOCIETY_INITIAL_ADMIN_USER_ID` startup flow (or authorized operator CLI). No production deployment or backup restore is claimed. See [the runbook](docs/engineering/RUNBOOK.md) and [documentation audit](docs/engineering/DOCUMENTATION_AUDIT.md).
