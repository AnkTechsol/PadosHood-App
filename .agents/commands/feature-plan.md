# Feature Plan Command

**Action:** Invokes requirements, architecture, API/database, security, privacy, and AI governance skills as relevant.

**Usage:** Run this command before writing code for a new feature.

## Steps:
1. Agent reads feature request.
2. Agent activates `product-requirements` skill.
3. Agent activates `solution-architecture`, `api-database-design`, `security-threat-model`, `privacy-by-design`, and `ai-governance-evaluations` if relevant based on PRD.
4. Agent stops and asks focused questions if a critical requirement is missing.
5. Produces a feature plan document.
