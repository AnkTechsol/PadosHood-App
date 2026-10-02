---
name: product-requirements
description: Skill to transform a feature idea into comprehensive product requirements (PRD). Activate when starting a new feature to define users, edge cases, and scope.
---

# Product Requirements Definition Skill

## 1. Purpose
Transforms raw feature ideas into rigorous, actionable product requirements covering functional, non-functional, security, and privacy aspects.

## 2. When to use
- Before writing any code for a new feature.
- When an idea is proposed but lacks clear acceptance criteria.

## 3. Required inputs
- Feature idea or problem statement.
- Target user personas.

## 4. Required workflow
1. Analyze the core problem.
2. Define target users and roles.
3. List user stories and functional requirements.
4. Define non-functional requirements (performance, scaling).
5. Outline edge cases and error states.
6. Explicitly declare non-goals (out of scope).
7. Flag security/privacy impacts.
8. Ask clarification questions if critical data is missing.

## 5. Required outputs
- A completed PRD using `PRD_TEMPLATE.md` or `FEATURE_SPEC_TEMPLATE.md`.
- User stories using `USER_STORY_TEMPLATE.md`.

## 6. Quality gates
- Does it clearly explain *what* we are not building?
- Are the edge cases clearly defined?

## 7. Common failure modes
- Vague acceptance criteria.
- Ignoring error states.
- Assuming requirements instead of asking.

## 8. Completion checklist
- [ ] Problem statement defined.
- [ ] Acceptance criteria written.
- [ ] Error states defined.
- [ ] Non-goals listed.
- [ ] Security/privacy questions flagged.
