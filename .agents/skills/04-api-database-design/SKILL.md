---
name: api-database-design
description: Skill for designing APIs and persistence layers. Activate when a feature needs to store data or expose endpoints.
---

# API & Database Design Skill

## 1. Purpose
Ensures data persistence and API contracts are well-structured, secure, and scalable.

## 2. When to use
- When creating or modifying database schemas.
- When creating or modifying API endpoints.

## 3. Required inputs
- Approved Architecture document.
- Feature specifications.

## 4. Required workflow
1. Document API endpoints (request/response schemas).
2. Define auth/authz per endpoint.
3. Design database schema (foreign keys, uniqueness, indexes).
4. Plan migration and rollback strategy.
5. Review data retention and deletion implications.
6. Address pagination, rate limiting, and error formatting.

## 5. Required outputs
- API endpoint specification.
- Database migration plan.
- Data model documentation.

## 6. Quality gates
- Are database queries safe from injection?
- Are endpoints secured?

## 7. Common failure modes
- Missing indexes causing slow queries.
- Ignoring pagination on list endpoints.

## 8. Completion checklist
- [ ] API schemas defined.
- [ ] Auth defined per endpoint.
- [ ] DB schema designed with constraints.
- [ ] Migration strategy documented.
