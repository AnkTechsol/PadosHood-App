# Society service architecture

## Selected target

- React/Vite client served by a same-origin Express application.
- Clerk establishes the signed-in identity; the server reads the verified Clerk user ID and never trusts browser-provided identity, role, or society ID.
- PostgreSQL holds the Woodsville Phase 2 membership and society content in `ang_*` tables. The migration uses `CREATE ... IF NOT EXISTS`; it is not a destructive reset.
- Express API modules use Zod validation, parameterized SQL, same-origin JSON mutation checks, request-size limits, rate limiting, and server-side membership/ownership checks.
- Production target is one Express process serving the built frontend, API, and Clerk proxy. Development uses the Vite development environment. Production must not expose a Vite dev server.

## Identity and data flow

1. Visitor authenticates through Clerk and receives a session cookie.
2. Same-origin client requests flow through the Express/Clerk boundary; API identity comes from verified session middleware.
3. PostgreSQL membership status and role determine access. New membership requests are Pending/Resident; no client role switch or default admin is allowed.
4. Approved members read notices and create posts/complaints. Complaint lists are owner-scoped for residents and society-wide for approved administrators.
5. Administrative writes and account deletion are audited by actor/action/target metadata; the audit table intentionally omits submitted message bodies.
6. Account export returns the requesting member's application data. Application-account deletion removes membership, own complaints/events, and own posts; it does not remove the Clerk identity. Notice records are not user-owned deletion data.
7. The single Super Admin appointment is an operator-controlled startup path, not a public API: `SOCIETY_INITIAL_SUPER_ADMIN_USER_ID` must exactly identify an existing, out-of-band-verified joining member. PostgreSQL enforces the single-role invariant; transactions/advisory locks and one-time audit events prevent repeat appointment. Only the Super Admin can manage Admin roles; see the [operator runbook](RUNBOOK.md).

Data collected for this scope is the resident's name, block/tower, flat, Owner/Tenant choice, Clerk user ID, and submitted text (notices, posts, complaints, timeline notes). No file uploads, contact fields, health details, payment data, or AI prompt flow are in the launch design. See [data inventory](DATA_INVENTORY.md), [retention decisions](DATA_RETENTION_SCHEDULE.md), and [subprocessors](SUBPROCESSORS.md).

## Current implementation boundary

The active client is wired through `src/main.jsx` → `src/entry/AppRouter.jsx` → `src/App.jsx`. `server/index.js` implements Express+Vite development and serves built `dist` through Express in production, with the canonical Clerk proxy and optional startup administrator bootstrap. Parent-reported smoke/build/test/lint evidence and boundaries are in [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md). A local production-mode smoke is not a published deployment; no production publication, completed signed-in resident/admin flow, or backup recovery is established. Mobile landing and Clerk sign-up views rendered, but the mobile workflow remains unverified.

## Trust boundaries and constraints

- Browser and user-submitted content are untrusted.
- Clerk is the identity provider; its verification must happen server-side and production/dev Clerk instances must be separate.
- The Express API is the authorization boundary. The browser never establishes committee status.
- PostgreSQL access is server-only; secrets stay in environment configuration, not source/client bundles.
- The Replit deployment, database host/region, backup policies, retention period, and legal operator remain owner/deployment decisions, not established facts.
- The legacy civic demo, archive, and `src/data/supabase_schema.sql`/Supabase helper are not the launch database and are not imported by this target.
- The active society app uses system font fallbacks and does not request Google Fonts; legacy archived styles are not part of the active UI.
