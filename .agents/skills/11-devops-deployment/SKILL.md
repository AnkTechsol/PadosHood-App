---
name: devops-deployment
description: Skill for DevOps and deployment configuration. Activate to design environments, CI/CD, and release infrastructure.
---

# DevOps & Deployment Skill

## 1. Purpose
Ensures reproducible builds, secure environments, and safe deployments.

## 2. When to use
- Setting up CI/CD pipelines, Dockerizing, or deploying features.

## 3. Required inputs
- Architecture and codebase.

## 4. Required workflow
1. Define environment separation (local, staging, prod).
2. Establish secure config management.
3. Configure CI/CD quality gates.
4. Define database migration process, pre-deploy, and post-deploy verification.
5. Detail rollback plans and feature-flag strategies.
6. Do not create configs that conflict with the existing stack without justification.

## 5. Required outputs
- Deployment strategy/infrastructure documentation.
- CI/CD workflow configurations (if requested).

## 6. Quality gates
- Is the build reproducible?
- Is there a tested rollback plan?

## 7. Common failure modes
- Hardcoding environment variables.
- Deploying without migration tests.
- Breaking the existing build system.

## 8. Completion checklist
- [ ] Environments separated.
- [ ] CI gates defined.
- [ ] Rollback plan documented.
- [ ] Configs secure.
