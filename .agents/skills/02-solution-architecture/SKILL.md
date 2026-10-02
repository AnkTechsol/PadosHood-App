---
name: solution-architecture
description: Skill to design software architecture before implementation. Activate when a feature requires new components, data flows, or API changes.
---

# Solution Architecture Skill

## 1. Purpose
Ensures technical designs are robust, scaleable, and compatible with existing systems before coding begins.

## 2. When to use
- When creating a new module or service.
- When altering data models or API contracts.

## 3. Required inputs
- Approved Product Requirements (PRD).
- Current system context (`ARCHITECTURE.md`).

## 4. Required workflow
1. Analyze existing systems.
2. Define component boundaries and responsibilities.
3. Map data flow.
4. Define API contracts and Database impacts.
5. Identify failure modes and fallbacks.
6. Outline rollback strategies.

## 5. Required outputs
- Updated architecture document.
- Architecture Decision Record (ADR) if a major decision is made.
- Mermaid diagrams for data flow and sequences.

## 6. Quality gates
- Does this reuse existing patterns?
- Are failure modes accounted for?

## 7. Common failure modes
- Over-engineering or premature optimization.
- Designing in a vacuum without considering existing stack.

## 8. Completion checklist
- [ ] Existing architecture analyzed.
- [ ] Data flows mapped.
- [ ] APIs contracted.
- [ ] ADR written (if applicable).
- [ ] Rollback strategy defined.
