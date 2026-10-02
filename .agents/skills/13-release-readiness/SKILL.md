---
name: release-readiness
description: Final quality-gate skill. Activate to determine whether a feature is genuinely ready for production release.
---

# Release Readiness Skill

## 1. Purpose
Acts as the final gatekeeper to prevent unverified, insecure, or undocumented features from reaching production.

## 2. When to use
- Immediately prior to merging or deploying a significant feature.

## 3. Required inputs
- The completed feature branch.
- PRD and Acceptance criteria.

## 4. Required workflow
1. Verify requirements and UI states are complete.
2. Verify tests were implemented AND executed.
3. Verify Code, Security, Privacy, and AI reviews are complete.
4. Verify monitoring, docs, deployment, and rollback plans are ready.
5. If anything is missing, output NOT READY FOR RELEASE.

## 5. Required outputs
- Release evidence report ending in:
  - READY FOR RELEASE
  - READY WITH DOCUMENTED RISK
  - NOT READY FOR RELEASE

## 6. Quality gates
- Were checks actually run, or just claimed?

## 7. Common failure modes
- Hallucinating that tests passed when they weren't run.
- Ignoring missing documentation.

## 8. Completion checklist
- [ ] Requirements met.
- [ ] Tests run and passed.
- [ ] Security/Privacy cleared.
- [ ] Deployment/Rollback ready.
- [ ] Final readiness decision stated.
