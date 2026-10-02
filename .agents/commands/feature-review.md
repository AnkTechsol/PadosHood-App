# Feature Review Command

**Action:** Reviews changed files against requirements and quality standards.

**Usage:** Run this command when a feature implementation is ready for review.

## Steps:
1. Agent reviews changed files.
2. Agent checks implementation against PRD and Acceptance Criteria.
3. Agent runs quality checks (lint, type-check, tests) if available.
4. Agent produces findings grouped by: Critical, High, Medium, Low.
5. Agent provides concrete, actionable fixes (not generic advice).
