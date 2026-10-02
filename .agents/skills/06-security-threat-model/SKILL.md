---
name: security-threat-model
description: Skill for identifying and mitigating security risks. Activate for authentication, payments, uploads, or any sensitive data flows.
---

# Security & Threat Modeling Skill

## 1. Purpose
Proactively identifies security vulnerabilities and ensures appropriate mitigations are implemented.

## 2. When to use
- When handling auth, payments, sensitive data, file uploads, or third-party integrations.

## 3. Required inputs
- Architecture and Data flow diagrams.

## 4. Required workflow
1. Identify assets and trust boundaries.
2. Identify threat actors and attack surfaces.
3. Review against OWASP Top 10 (Injection, Broken Access Control, XSS, SSRF, etc.).
4. Ensure secrets are handled securely.
5. Define rate limiting and abuse protections.
6. Verify audit logs for sensitive actions.

## 5. Required outputs
- Threat-model document.
- Secure code-review checklist.
- Security incident template.

## 6. Quality gates
- Are trust boundaries clearly defined?
- Are mitigations actionable?

## 7. Common failure modes
- Assuming internal APIs don't need auth.
- Hardcoding secrets.
- Overlooking rate limits on public endpoints.

## 8. Completion checklist
- [ ] Threat actors identified.
- [ ] OWASP risks reviewed.
- [ ] Mitigations documented.
- [ ] Secure code review completed.
