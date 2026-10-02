# Angaan: Woodsville Phase 2 launch scope

## Product direction

The owner selected the society-management application for Woodsville Phase 2, has no existing backend, and wants to publish on Replit for residents. The civic demo is not the launch product.

## Initial implementation scope

This is an engineering-selected minimum launch scope, not a statement that the committee has approved operational or legal policies.

- Public landing page, email-based Clerk authentication, sign-out.
- Resident joining request: display name, block/tower, flat, Owner/Tenant.
- Pending, rejected and suspended accounts cannot read private society content.
- Only approved residents may read notices and participate in discussions.
- Committee administrators approve/reject residents, manage membership and publish/edit/delete notices.
- Residents create complaints, view only their own complaints, and edit/delete them while Raised.
- Administrators view all society complaints and update their status with a timeline note.
- Discussion authors can edit/delete their own posts; administrators can moderate.
- Account data export and deletion. Deleting an administrator must not leave the society without an administrator.
- Durable PostgreSQL storage and server-side authorization. No frontend role switch or fixed OTP.
- Empty/loading/error/retry states, validation, confirmation before deletion, mobile layout.

## Roles and trust

Clerk proves identity. PostgreSQL holds membership and permissions. Joining never creates an administrator. An operator appoints the initial administrator by exact Clerk account ID after verifying the person and their joining request: use the controlled CLI for the intended database, or the one-time `SOCIETY_INITIAL_ADMIN_USER_ID` startup configuration in the intended environment. Do not appoint an unknown resident. Development and production accounts are separate; see the runbook for production appointment.

## Acceptance criteria

1. Anonymous API calls receive 401; forged browser roles do not grant access.
2. Unapproved residents receive 403 on society content and administrative APIs.
3. Approved residents cannot read or mutate another resident's complaint.
4. Residents cannot publish notices or approve themselves.
5. Changes persist after reload and are visible to other authorized sessions.
6. All administrative writes are audited without logging message bodies or contact data.
7. Invalid inputs, missing records, conflicts and dependency failures produce explicit errors.
8. Production serves a built frontend plus the API and Clerk proxy, not a Vite development server.

## Non-goals

Payments, subscription billing, multiple societies, civic directories, health/blood-group data, proof-document uploads, SMS OTP, AI, push notifications, live emergency services, bookings and maintenance accounting are outside this initial scope. No invented emergency contacts or seeded resident records.

## Release prerequisites

Appoint and verify the initial committee administrator; get committee permission; approve resident data handling, retention, privacy/terms notices and support contact; test a real signed-in resident/administrator flow; check production database/auth environment separation and restore procedures. A passing build is not society release approval.