---
name: production-coding
description: Skill for writing high-quality, production-ready code. Activate when implementing a feature after requirements and architecture are approved.
---

# Production Coding Skill

## 1. Purpose
Ensures all code written meets production standards for readability, security, and maintainability.

## 2. When to use
- During the implementation phase of any feature or bug fix.

## 3. Required inputs
- Approved PRD.
- Approved Architecture/Design.

## 4. Required workflow
1. Follow existing repository conventions.
2. Ensure input/output schema validation.
3. Validate environment variables.
4. Implement secure error handling (do not swallow errors).
5. Add structured logging where appropriate.
6. Do not include hardcoded secrets.
7. Implement real functionality, not fake/mocked code (unless explicitly requested as a prototype).

## 5. Required outputs
- Production-grade code files.
- Completed code-review checklist.

## 6. Quality gates
- Is the code typed safely?
- Are errors handled gracefully?

## 7. Common failure modes
- Silent failures.
- Lack of validation at boundaries.
- Broad refactors sneaking into feature PRs.

## 8. Completion checklist
- [ ] Adheres to existing conventions.
- [ ] Input validated.
- [ ] No hardcoded secrets.
- [ ] Logging added.
- [ ] No silent error swallowing.
