# Society launch work plan

This replaces the superseded mock-React-Context plan. The approved scope and acceptance criteria are in [docs/product/SOCIETY_LAUNCH.md](docs/product/SOCIETY_LAUNCH.md); do not add features absent from that contract without owner approval. Implementation checks are recorded in [release evidence](docs/engineering/RELEASE_EVIDENCE.md).

1. [x] Integrate Express+Vite development, production serving, Clerk proxy/session flow, and active society client routing.
2. [x] Implement contracted society UI/API workflows and server-side authorization; see current source and API contract.
3. [x] Add and execute targeted API, origin, build, and lint checks. Current evidence and caveats are in the release report.
4. [ ] Verify real signed-in resident/admin flows and mobile layout/workflows in non-production.
5. [ ] Configure isolated Clerk development/production instances and PostgreSQL databases/secrets, migrate the production database, establish backup/restore, and appoint the verified initial admin out of band.
6. [ ] Obtain committee approval and qualified legal review for actual operator/contact/retention/policy details; verify publishing and rollback.

Autoscale configuration is saved but not published. The release owner must maintain evidence for each remaining gate; passing engineering checks do not approve resident launch.