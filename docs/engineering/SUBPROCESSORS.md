# Service providers and subprocessor inventory

This is a preliminary inventory from the selected architecture and dependencies, not a complete executed vendor agreement or transfer assessment. Confirm the actual production account, plan, processing terms, data locations, and required disclosures with the legal operator before launch. Do not claim an unknown location.

| Provider/service | Intended role and data flow | Location / policy state |
|---|---|---|
| Clerk | Authentication/session provider. Processes identity/account data under its service; application associates a Clerk user ID with membership. Exact authentication method and retained provider data depend on configured Clerk instance. | Production account, region/data location, DPA/terms, privacy notice, and retention require operator verification. |
| Replit | Intended app hosting/publishing platform. May process service requests and operational data; exact logs/regions depend on deployment/configuration. | Confirm actual deployment plan, locations, subprocessors, and contractual terms before release. |
| PostgreSQL hosting provider | Stores `ang_*` membership, notices, posts, complaints, timeline, and audit data; provider has infrastructure-level processing/access according to chosen service. No selected host/location is established in this repository. | Owner must name the provider and verify region, backups, access, retention, and terms. |

No Supabase connection is approved for the active society service; no analytics, payment, SMS, AI/LLM, file hosting, or other external feature processor is approved/identified. Review and update this inventory before adding any vendor or integration.
