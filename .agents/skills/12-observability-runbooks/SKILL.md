---
name: observability-runbooks
description: Skill for system observability and incident response. Activate to add logs, metrics, alerts, or runbooks.
---

# Observability & Runbooks Skill

## 1. Purpose
Ensures the system is monitored effectively and operations teams have clear instructions for incidents.

## 2. When to use
- When preparing a feature for production release or establishing monitoring.

## 3. Required inputs
- Feature code and architecture.

## 4. Required workflow
1. Define structured logging with correlation IDs.
2. Specify error tracking and metrics (SLOs/SLIs).
3. Set alert conditions and dashboard recommendations.
4. Ensure telemetry is privacy-safe (no PII).
5. Write on-call incident procedures and runbooks.

## 5. Required outputs
- Logging Standard document.
- Alert Runbook template.
- Incident Response Runbook.

## 6. Quality gates
- Are alerts actionable?
- Are logs free of PII?

## 7. Common failure modes
- Alert fatigue from poorly defined thresholds.
- Logging raw request bodies containing passwords.

## 8. Completion checklist
- [ ] Logs structured and safe.
- [ ] Alerts defined.
- [ ] Runbooks drafted.
