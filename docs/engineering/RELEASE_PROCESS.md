# Release Process

This describes the Replit autoscale release path. Parent-owned deployment configuration is outside this document's ownership. Product/runtime commands: build with `npm run build`, serve with `npm start`, apply migrations with `npm run db:migrate`; `npm run dev` is a single Express+Vite development workflow. Latest implementation checks are in [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md).

## Pre-release gate

1. Review [SOCIETY_LAUNCH.md](../product/SOCIETY_LAUNCH.md), API contract, and current [documentation audit](DOCUMENTATION_AUDIT.md).
2. Require actual automated test, lint, and build results; test unauthorized, authorization, ownership, error, deletion, and last-admin paths. Latest parent-reported build and 4/4 tests passed with no skips; full lint exited 0 with 89 legacy/dormant-code warnings, while targeted active-code lint was clean. Real signed-in resident/admin flows remain unverified; mobile landing and Clerk sign-up views rendered but do not verify a completed workflow.
3. Configure separate Clerk development and production instances and distinct databases/secrets; never promote development credentials or resident records.
4. Confirm production database is backed up and a restore has been exercised. Apply the non-destructive `ang_*` migrations to the intended database before serving.
5. Have an operator verify the owner’s identity and membership out of band. For the single Super Admin, have the owner join with production Clerk, copy their Account reference (`user.id`), set the non-secret `SOCIETY_INITIAL_SUPER_ADMIN_USER_ID` in the production workspace environment, and republish/restart. Startup appoints only that existing verified member, records a one-time audit event, and reports `superAdminStatus`; verify by signing in as the owner and clear the variable. The owner can then promote a separate verified Admin through Members. Never create or share a common password; both people use their individual Clerk accounts. Missing membership reports `awaiting_membership`; unset configuration reports `not_configured`; a previously assigned different Super Admin leaves the bootstrap unmodified. No default or first-user-wins administrator exists. See the [runbook](RUNBOOK.md) for safe recovery.
6. Obtain owner/committee approval, legal review, data retention and privacy/terms approval, and a resident support contact. Passing build is not release approval.
7. Verify production starts the built client and same-origin API/proxy, not Vite dev server; manually verify real signed-in resident/admin paths using authorized test accounts.

## Deploy and rollback

On Replit autoscale, configure `npm run build` at build time and `npm start` at runtime. The autoscale configuration is saved but not published. A parent-reported local `npm start` smoke on a temporary port verified built assets, public health, and rejection of a forged test identity header; this is not a published deployment or proof of production Clerk/database/secrets. The operator applies `npm run db:migrate` against the intended production database through an authorized controlled process. Do not expose a production `DATABASE_URL` in shell commands or use read-only production SQL access for writes. Verify production DB configuration, backup/restore, health checks, and rollback before publication.

If deployment fails, return to the last known-good app release without disabling auth or authorization. Database migration 001 creates only `ang_*` tables/indexes; no rollback script is currently specified. Do not drop production data to roll back code. Restore from a verified backup only under operator approval and with documented recovery point.

## Post-deploy

The assigned operator verifies public health response and real authorized user workflows, checks database connectivity and restricted access, and watches provider/service health. Alert channels and monitoring thresholds are not yet established; assign them before launch rather than promising an unimplemented monitoring window.
