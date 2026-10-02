# Data retention — owner decision required

No retention periods have been approved. This page deliberately does not invent one. The application schema and available deletion paths do not themselves establish legal/operational retention authority. Before any real resident data is collected, the society/operator must choose periods, legal basis, handling of backups, and process for requests, with qualified legal review.

| Category | Current technical behavior (not a retention promise) | Owner decision required |
|---|---|---|
| Membership profile and Clerk ID | Stored until application account deletion or authorized member changes; database backup copies may persist according to host settings | Approve retention after leaving/rejection/suspension; confirm treatment of linked Clerk identity and backups |
| Notices | Admin can edit/delete; not removed by resident account deletion; no expiry/archive schedule implemented | Decide whether official notices must be retained, archived, or removed and who can do so |
| Discussion posts | Author can edit/delete; account deletion cascades own posts | Decide handling of moderation records and backups, if any |
| Complaints and timeline | Application account deletion cascades complaints and timeline; approved admins can change status and add notes | Decide operational/legal record retention, closed complaint retention, and backup expiry |
| Audit metadata | Administrative audit metadata may persist after account deletion; no automated expiry | Define retention/access and whether/how actor identifiers are minimized |
| Clerk account data and provider logs | Not controlled by application deletion endpoint | Establish separate provider-side request and provider retention process with Clerk/operator |

Do not represent backups as immediately erased by row deletion. Confirm database provider backup behavior and document a verified restore/deletion process before launch.
