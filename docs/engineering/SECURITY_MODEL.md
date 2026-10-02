# Security model and review checklist

## Assets and trust boundaries

- Assets: Clerk session/identity, membership profile and roles, notice/post/complaint content, and administrative audit metadata.
- Browser and request bodies are untrusted. Same-origin is a cross-site request protection, not proof of user authorization.
- Clerk is responsible for identity proof; server middleware must verify sessions and derive the Clerk user ID. PostgreSQL membership state—not client fields—determines society status and role.
- Express is the authorization boundary; PostgreSQL and its credentials are server-side. Replit/deployment and database provider are additional infrastructure trust boundaries whose settings/location remain to be confirmed.
- Legacy civic client, archive, and Supabase code are not trusted or approved as the society service.

## Threat actors and abuse cases

Unauthenticated internet users, authenticated pending/rejected/suspended residents, malicious approved residents, compromised accounts, malicious insiders/admins, and infrastructure/credential compromise are in scope. Key risks include forged role/identity, IDOR across complaints/posts, CSRF, injection, XSS through user text, denial of service, unsafe admin bootstrap, data leakage in logs/backups, and loss of sole administrator access.

## Existing design controls (must be verified in integrated app)

- Clerk-verified identity and PostgreSQL-backed server authorization; never accept role or identity from browser.
- Route-level membership/owner/admin checks, validation/strict schemas, parameterized SQL, UUID validation, JSON size cap, same-origin JSON mutation checks, rate-limited writes, safe API error messages, audit events for admin mutations.
- Complaint list scoping to resident's own rows; administrator listing only for approved admin; account export is self-only; last approved administrator cannot be removed.
- Initial-admin bootstrap requires the operator-configured exact Clerk user ID of an existing member; it uses a transaction/advisory lock and one-time audit event rather than granting privileges to the first registrant. Bootstrap behavior is covered by the reported exact-ID/one-time tests, but this is not a completed security review or production verification.
- `ang_*` data schema separate from legacy civic/Supabase demo data; no upload flow.

These controls are visible in route modules but remain subject to integration/security testing; they are not a completed security review. Rate limiting does not replace abuse monitoring. No security certification is claimed.

## Review checklist before release

- [ ] Verify Clerk middleware/proxy and origin handling for deployed HTTPS and Replit hostname.
- [ ] Verify authentication required on every private API endpoint and public health response contains no secrets.
- [ ] Test pending/rejected/suspended, forged role, cross-member complaint/post, self-approval, last-admin, and application deletion cases.
- [ ] Check escaping/rendering of untrusted notice/post/complaint text and generic server/database failures.
- [ ] Confirm production secrets, minimum database access, patching, backups, access controls, and recovery.
- [ ] Verify logs never include request bodies, passwords, tokens, or unnecessary resident content/PII.
- [ ] Assign operator/contact, incident process, alerting, and retention with owners.

See [incident response](INCIDENT_RESPONSE.md), [runbook](RUNBOOK.md), and [launch acceptance gates](../product/SOCIETY_LAUNCH.md).
