# Project Markdown audit — Angaan / Woodsville Phase 2

**Review scope:** project-owned root Markdown, `docs/**`, and `src/archive/README.md`. Repository agent instructions and commands were read-only checked and retained. This audit does not include vendored dependency docs under `node_modules`/`.cache` or environment-provided `.local/**` skill/reference material, which are not project documentation.

**Current status:** The active society route, Express/Vite development and production serving, canonical Clerk proxy, exact-ID startup-admin bootstrap, scripts, and API suite are integrated. Parent-reported final build/test/lint and local production-mode smoke evidence is recorded in [RELEASE_EVIDENCE.md](RELEASE_EVIDENCE.md). The autoscale setup is saved but not published; a local `npm start` smoke is not a deployed production check. Mobile landing and Clerk sign-up views rendered, but no completed signed-in resident/admin or mobile authentication/workflow, production DB migration, or backup/restore is verified. Decision: **NOT READY FOR RESIDENT RELEASE**.

## Product/engineering/legal documentation disposition

| File | Disposition |
|---|---|
| `README.md` | Replaced template boilerplate with the selected product, authoritative reading links, and explicit not-ready status. |
| `architecture.md` | Corrected obsolete React-mock architecture and points to the current target design and implementation gap. |
| `brainstorm.md` | Reclassified payment, visitor, and thread ideas as deferred, not approved scope. |
| `confirmed_feature.md` | Replaced conflicting mock feature list with scope reference and explicit exclusions. |
| `developer_handoff.md` | Updated with integrated runtime, test command/fingerprint safety guard, and owner/release instructions. |
| `handoff.md` | Replaced obsolete SocietyContext next steps and records actual integration/release blockers. |
| `idea.md` | Corrected product definition to owner-selected Angaan/Woodsville Phase 2 and limited launch scope. |
| `project_manager.md` | Replaced obsolete mock-app milestone with actual implementation status and release prerequisites. |
| `scratchpad.md` | Retired role-switch/fake-attachment notes; states production identity and no-seed constraints. |
| `steps.md` | Replaced outdated mock frontend checklist with target implementation and release gates; no tasks marked complete. |
| `tech_stack.md` | Updated stack direction and explicitly distinguished modules/dependencies from wired/verified production runtime. |
| `docs/engineering/API.md` | Authoritative API contract; reviewed for alignment and clarified operator-only administrator setup. |
| `docs/engineering/ARCHITECTURE.md` | Replaced placeholders with data flow, boundaries, controls, current integration status, and operator-only exact-ID initial-admin bootstrap. |
| `docs/engineering/DATA_INVENTORY.md` | Replaced placeholders with the scoped collection/use/storage/export/deletion inventory and explicit unknowns. |
| `docs/engineering/DATA_RETENTION_SCHEDULE.md` | Replaced invented-looking template with unapproved retention status and specific owner decisions; no periods fabricated. |
| `docs/engineering/DEFINITION_OF_DONE.md` | Clarified evidence requirement and society-specific authorization/privacy release checks. |
| `docs/engineering/ENGINEERING_STANDARDS.md` | Recorded declared Node test command, coverage expectations, parent-reported results, and production database safety guard. |
| `docs/engineering/INCIDENT_RESPONSE.md` | Replaced unassigned generic plan with practical draft response steps and explicitly unassigned roles/contact. |
| `docs/engineering/RELEASE_PROCESS.md` | Added intended Replit autoscale flow, separated environment/migration/admin steps, rollback caveats, and release prerequisites. |
| `docs/engineering/RELEASE_EVIDENCE.md` | Records parent-reported final build, dev/API and local production-serving smoke, full/targeted lint results, 4/4 tests including bootstrap tests, screenshot scope, diff check, test DB safety, credential check, and explicit remaining gates. |
| `docs/engineering/DOCUMENTATION_AUDIT.md` | This file; individually accounts for project Markdown, retains parent-owned authority files, and records current doc/release status. |
| `docs/engineering/REPOSITORY_ASSESSMENT.md` | Reconciled point-in-time assessment with active society routing, integrated server, reported checks, and remaining production gates. |
| `docs/engineering/RUNBOOK.md` | Reconciled commands and health/auth checks with integrated runtime; documents exact-ID startup bootstrap, one-time audit semantics, safe production admin appointment, and production/owner caveats. |
| `docs/engineering/SECURITY_MODEL.md` | Replaced placeholders with assets, trust boundaries, threat actors, observed controls including exact-ID bootstrap, and an explicit verification checklist. |
| `docs/engineering/SUBPROCESSORS.md` | Replaced vendor placeholders with preliminary Clerk/Replit/PostgreSQL roles and unresolved account/location/terms details. |
| `docs/engineering/TOOLING_RECOMMENDATIONS.md` | Reclassified suggestions as optional; links current evidence and remaining legacy full-lint warnings. |
| `docs/product/SOCIETY_LAUNCH.md` | Authoritative launch scope and prerequisites; reconciled exact-ID administrator setup. |
| `docs/product/DECISION_LOG.md` | Kept as an explicitly labeled template, clarified it contains no recorded approvals and points to approved scope. |
| `docs/product/FEATURE_SPEC_TEMPLATE.md` | Kept as a template and clarified that template content is not product approval. |
| `docs/product/PRD_TEMPLATE.md` | Kept as a template and added boundary that metrics/analytics are not approved. |
| `docs/legal/ACCEPTABLE_USE_POLICY_DRAFT.md` | Replaced generic placeholders with scope-aware lawyer-review draft; explicitly not official policy. |
| `docs/legal/LEGAL_REVIEW_REQUIRED.md` | Replaced fictitious vendor/AI todo items with actual owner/operator/legal review blockers. |
| `docs/legal/PRIVACY_POLICY_DRAFT.md` | Replaced generic placeholder with fact-bounded plain-language draft, data handling, deletion limits, and missing-info list; not published. |
| `docs/legal/TERMS_OF_SERVICE_DRAFT.md` | Replaced generic placeholder with scoped outline and explicit lawyer/owner decisions; not official terms. |
| `docs/ai-governance/AI_INCIDENT_PROCESS.md` | Clarified no in-scope AI feature, therefore no active AI incident runbook/contact/kill switch. |
| `docs/ai-governance/AI_RISK_REGISTER.md` | Clarified no deployed/in-scope AI system; directs future proposals to new review rather than inventing entries. |
| `docs/ai-governance/AI_SYSTEM_INVENTORY.md` | Records no approved Angaan AI integration; distinguishes legacy AI code from launch product. |
| `docs/ai-governance/EVALUATION_PLAN.md` | Clarified no current AI model/dataset/metrics and prohibits resident data as a future evaluation set by default. |
| `docs/ai-governance/MODEL_CARD_TEMPLATE.md` | Retained and explicitly labeled as an unfilled future-use template, not an active model card. |
| `docs/ai-governance/PROMPT_AND_DATA_POLICY.md` | Clarified no approved model/prompt/data source and requirements before any future AI use. |
| `src/archive/README.md` | Corrected stale claim that archived civic code is active; clarifies not to import legacy/demo records or controls into launch service. |

## Workspace operating instructions

| File | Disposition |
|---|---|
| `replit.md` | Replaced stale prototype instructions with the integrated application, safe test procedure, credentials boundary, administrator setup, saved Autoscale configuration and verified checks/remaining gates. |

## Agent governance and instructions checked, retained unchanged

These are contributor operating rules, not product claims. They remain unchanged by design; they are listed individually so scope is explicit.

| File | Disposition |
|---|---|
| `.agents/AGENTS.md` | Read-only checked and retained unchanged. |
| `.agents/commands/feature-build.md` | Read-only checked and retained unchanged. |
| `.agents/commands/feature-plan.md` | Read-only checked and retained unchanged. |
| `.agents/commands/feature-review.md` | Read-only checked and retained unchanged. |
| `.agents/commands/privacy-audit.md` | Read-only checked and retained unchanged. |
| `.agents/commands/release-check.md` | Read-only checked and retained unchanged. |
| `.agents/memory/MEMORY.md` | Read-only checked and retained unchanged. |
| `.agents/memory/society-rollout.md` | Updated only the owner-stated product selection, society rollout intent and absence of an existing backend service. |
| `.agents/skills/01-product-requirements/SKILL.md` | Contributor instruction retained unchanged. |
| `.agents/skills/02-solution-architecture/SKILL.md` | Contributor instruction retained unchanged. |
| `.agents/skills/03-production-coding/SKILL.md` | Contributor instruction retained unchanged. |
| `.agents/skills/04-api-database-design/SKILL.md` | Contributor instruction retained unchanged. |
| `.agents/skills/05-testing-qa/SKILL.md` | Contributor instruction retained unchanged. |
| `.agents/skills/06-security-threat-model/SKILL.md` | Relevant security instruction read before editing security docs; retained unchanged. |
| `.agents/skills/07-privacy-by-design/SKILL.md` | Relevant privacy instruction read before editing privacy/data docs; retained unchanged. |
| `.agents/skills/08-privacy-policy/SKILL.md` | Relevant policy-drafting instruction read before editing privacy draft; retained unchanged. |
| `.agents/skills/09-terms-and-acceptable-use/SKILL.md` | Relevant legal drafting instruction read before editing terms/acceptable-use drafts; retained unchanged. |
| `.agents/skills/10-ai-governance-evaluations/SKILL.md` | Relevant AI governance instruction read before editing AI docs; retained unchanged. |
| `.agents/skills/11-devops-deployment/SKILL.md` | Relevant deployment instruction read before editing release/runbook docs; retained unchanged. |
| `.agents/skills/12-observability-runbooks/SKILL.md` | Relevant observability instruction read before editing incident/runbook docs; retained unchanged. |
| `.agents/skills/13-release-readiness/SKILL.md` | Relevant release instruction read; retained unchanged. |

## Explicit release blockers / unresolved owners

- Production launch remains blocked despite the reported engineering checks: publishing has not happened, no completed signed-in resident/admin or mobile authentication/workflow has been verified, and no production migration/backup restore has been demonstrated. Parent reports a local production-mode server smoke in the development workspace only; Replit autoscale configuration remains saved, not published.
- Create and verify separate Clerk development/production instances and databases/secrets; run migrations against the correct production database. No initial administrator has yet been designated or appointed. The designated person must sign up through production Clerk, submit a joining request, and be identity-verified out of band before exact-ID startup bootstrap or the authorized operator CLI appoints them. No default/first-user administrator exists, and no resident rollout has occurred.
- Obtain society/committee authority to collect/process resident information; assign a legal operator, actual support contact, and incident owner.
- Decide and legally review privacy/terms/AUP, retention periods, audit and backup handling, provider locations/contracts, resident request process, and official notice retention. Drafts are not published policy. `/privacy` is an operational data explanation, not a legally approved privacy policy.
- Verify backup restore, production publishing, real signed-in resident/admin journeys, mobile authentication/workflow, accessibility/error states, and rollback. See [release evidence](RELEASE_EVIDENCE.md); the local production-mode smoke is not deployment evidence, and no signed-in/backup claim is asserted.

The only in-scope personal data categories are name, block/tower, flat, Owner/Tenant selection, Clerk user ID, and user-submitted text. No connected Supabase service, resident demo seeds, payments, uploads, health/contact fields, analytics vendor, or AI integration is approved for the active society launch.