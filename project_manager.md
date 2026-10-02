# Project status

## Product

The selected product is Angaan for Woodsville Phase 2. Scope, permissions, non-goals, and release gates are authoritative in [docs/product/SOCIETY_LAUNCH.md](docs/product/SOCIETY_LAUNCH.md), with API details in [docs/engineering/API.md](docs/engineering/API.md).

## Implementation status (documentation audit)

The active society UI is wired through `src/main.jsx` → `src/entry/AppRouter.jsx` → `src/App.jsx`; Clerk, Express/Vite dev, Express production serving, and canonical Clerk proxy are integrated. The latest parent-reported automated checks are recorded in [release evidence](docs/engineering/RELEASE_EVIDENCE.md). Do not describe this as resident-release-ready: real signed-in/mobile journeys, production publishing, and backup restore remain unverified, and society/legal/operator approvals are outstanding.

## Current release blockers

- Verify real signed-in resident/admin and mobile flows in correctly separated Clerk environments.
- Verify migrations and backup/restore against the eventual production database.
- Configure production secrets/database and document/test backup restore and migration rollback.
- Owner/committee must authorize launch, designate an operator and initial administrator, approve data handling/retention and legal notices, and provide a support contact.
- Complete qualified legal review. No launch is approved by this status page.
