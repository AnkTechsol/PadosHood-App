# Angaan — Woodsville Phase 2

This repository is being prepared for a society-management application for the owner's Woodsville Phase 2 society. The older Aaple Moshi civic demo is retained as legacy material and is not the launch service.

## Read first

- [Launch scope and release prerequisites](docs/product/SOCIETY_LAUNCH.md)
- [API contract](docs/engineering/API.md)
- [Architecture](docs/engineering/ARCHITECTURE.md)
- [Runbook](docs/engineering/RUNBOOK.md)
- [Full Markdown audit and status](docs/engineering/DOCUMENTATION_AUDIT.md)

## Current status

The society app is wired through `src/main.jsx` → `src/entry/AppRouter.jsx` → `src/App.jsx`, with Clerk, Express, Vite development proxy, built-frontend serving, and an optional exact-ID startup admin bootstrap. Latest parent-reported evidence includes passing build and 4/4 tests, full lint exit 0 with 89 legacy/dormant-code warnings (active-code targeted lint clean), and a local production-mode serving smoke in the development workspace. See [release evidence](docs/engineering/RELEASE_EVIDENCE.md) for scope and test safety instructions.

**NOT READY FOR RESIDENT RELEASE.** The autoscale configuration is saved but has not been published. The local production-mode smoke is not a production deployment. No completed signed-in resident/admin or mobile authentication/workflow, or production backup/restore, has been verified. Society/legal/operator/support/retention decisions remain open; no initial administrator is designated or appointed, and no resident rollout has occurred. The verified first administrator must be appointed through the documented operator bootstrap. `/privacy` is an operational explanation, not a legally approved privacy policy. Do not enter production resident data until release approval.