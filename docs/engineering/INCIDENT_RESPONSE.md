# Incident response — operational template

This is a runbook framework, not an established on-call service. Named operators, resident support contacts, escalation channel, response targets, monitoring, and communications authority must be assigned by the society/operator before launch. Do not invent an emergency number or promise an SLA.

## Roles to assign before launch

- Incident coordinator: [owner to assign]
- Technical operator/deployment access: [owner to assign]
- Society communications/decision authority: [committee to assign]
- Resident support contact: [owner to approve and publish]

## Triage and containment

1. Record time, observed impact, affected service, and reporter without copying resident text/PII unnecessarily.
2. Determine whether identity/session compromise, unauthorized access, data loss, or database unavailability is suspected.
3. Restrict or pause affected access through deployment controls if needed; preserve credentials and logs securely. Do not disable authorization to restore service.
4. For database outage, use the [runbook](RUNBOOK.md) health and recovery steps. Restore only from a verified backup and record the restore point.
5. If personal data exposure is suspected, preserve evidence, restrict access, involve the designated operator/committee and qualified counsel, and determine notification duties with them. This document makes no legal determination.
6. Document cause, scope, decisions, recovery, and corrective actions with no unnecessary personal data.

## Closure

The designated technical operator verifies service health and authorized flows; committee/operator approves resident communications. Add a post-incident review and update security, privacy, backup, and release documentation. Contact ownership and notification timing remain launch blockers until assigned.
