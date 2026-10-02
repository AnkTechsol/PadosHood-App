# Definition of Done

A feature is not done until:
- [ ] Requirements and acceptance criteria are documented.
- [ ] Code is implemented and reviewed.
- [ ] Applicable tests, lint, type checks, and build are run and evidence is recorded; never mark a command as passed unless it ran.
- [ ] Security and privacy implications are reviewed.
- [ ] Database migrations and rollback are documented, where relevant.
- [ ] API and user-facing documentation are updated.
- [ ] Observability requirements are addressed.
- [ ] Deployment, release, and rollback requirements are identified.
- [ ] Known limitations and follow-up work are recorded.

For Woodsville Phase 2, also verify server-enforced Clerk identity and membership authorization, no resident seed/demo data in production, owner-scoped complaint/export/delete behavior, preservation of official notices on account deletion, and that the last approved administrator cannot be removed. Society release additionally requires owner/committee approval, real non-production signed-in resident/admin verification, operational backup/restore, and qualified legal review. See [launch scope](../product/SOCIETY_LAUNCH.md).
