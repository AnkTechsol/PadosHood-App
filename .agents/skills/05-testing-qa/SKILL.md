---
name: testing-qa
description: Skill for ensuring testing and quality assurance. Activate when writing tests or verifying a feature's completeness.
---

# Testing & QA Skill

## 1. Purpose
Guarantees that features are thoroughly tested (unit, integration, e2e) before release.

## 2. When to use
- During implementation and before marking a feature as "Done".

## 3. Required inputs
- PRD and Acceptance Criteria.
- Implemented Code.

## 4. Required workflow
1. Define test strategy (unit, integration, E2E).
2. Write unit tests for business logic.
3. Write integration tests for API/DB boundaries.
4. Include negative tests, permission tests, and failure paths.
5. Ensure no real PII is used in test data.
6. Differentiate between tests written, executed, passing, and blocked.

## 5. Required outputs
- Test code files.
- Feature QA checklist.
- Bug reports (if testing fails).

## 6. Quality gates
- Were the tests actually executed?
- Are negative paths tested?

## 7. Common failure modes
- Writing tests but failing to run them.
- Only testing the "happy path".
- Using real user data in fixtures.

## 8. Completion checklist
- [ ] Unit tests written and run.
- [ ] Negative paths covered.
- [ ] No real PII in test data.
- [ ] Tests passing successfully.
