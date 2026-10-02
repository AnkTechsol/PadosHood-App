# Privacy notice draft — Angaan, Woodsville Phase 2

> **DRAFT ONLY — REQUIRES QUALIFIED LEGAL REVIEW AND SOCIETY/OPERATOR APPROVAL. NOT AN OFFICIAL PUBLISHED POLICY.** The legal operator, support contact, jurisdiction, lawful basis, approved retention periods, provider locations, and final terms have not been supplied. Resolve the items in [LEGAL_REVIEW_REQUIRED.md](LEGAL_REVIEW_REQUIRED.md) before showing this notice to residents.

## Plain-language summary

The Angaan service provides resident membership requests and, for approved members, society notices, text posts, and complaint submission. Sign-in uses Clerk and society records use PostgreSQL. Any signed-in applicant/member can expand Account to request their own application-data export or delete their application account, including while membership is Pending, Rejected, or Suspended. Deleting application records does not delete a Clerk account. The society has not yet approved how long different records are kept or supplied a support contact.

## Draft description of data and use

The application is designed to process a name, block/tower, flat, Owner/Tenant selection, Clerk user ID, and text a user submits in posts and complaints, including complaint timeline notes. Administrators may publish notices. These fields support membership verification, access control, notices, discussion, complaint handling, and abuse/accountability records. Administrative audit metadata records the actor ID, action, target type/ID, and time without intentionally storing message bodies.

Clerk handles authentication and account data under its own service. The intended application is hosted/published on Replit and uses PostgreSQL, but the production database provider, regions, settings, provider retention, and applicable terms must be confirmed before publication. See [the preliminary provider inventory](../engineering/SUBPROCESSORS.md). No Supabase connection, analytics service, AI/LLM processor, payment provider, SMS service, file upload service, or third-party contact data integration is approved for the launch scope.

## Access, export, and deletion (draft)

Approved society administrators can manage membership and view complaint records for society operations. Ordinary residents can access their own complaints; approved members can view notices and discussion posts. Signed-in applicants/members—including Pending, Rejected, and Suspended membership states—can use the Account area to export their own application data or delete their application account. Application deletion removes the member record and that member's complaints/timeline and posts, but not the Clerk identity, official notice records, historical audit metadata, or necessarily backup copies. Provider-side account requests and backup handling require separate procedures and an approved retention policy.

The app's `/privacy` page is an operational explanation of the current collection/use/deletion behavior only. It is not this draft's approved, final, or official legal privacy policy, and must not be presented as legal approval.

## Missing information — publication blockers

- Legal name and contact details of responsible society/operator; resident support contact.
- Applicable jurisdiction, legal bases/rights, age rules, complaint route, and legally required disclosures.
- Approved retention periods for active data, audit records, provider logs, and backups.
- Actual database host, data regions, security/backup settings, Clerk account/region, Replit plan/location, contractual terms, and any required transfer mechanism.
- Final explanation of administrator access/moderation and handling of official notice records.

This draft does not claim legal compliance or determine residents' statutory rights.
