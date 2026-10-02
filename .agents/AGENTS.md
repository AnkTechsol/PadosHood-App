# Engineering Rules and Governance

These are non-negotiable rules for all AI and human contributors.

## Planning before coding
- Do not begin significant implementation until requirements, user roles, acceptance criteria, data implications, and edge cases are understood.
- Write assumptions explicitly.
- Identify non-goals.
- For meaningful technical decisions, create an ADR or update the decision log.
- Do not invent business requirements, legal facts, security controls, vendors, or user data practices.

## Production-code rules
- Use the repository’s existing architecture and conventions.
- Prefer simple, maintainable, typed, modular code.
- Validate all external input at system boundaries.
- Use schemas/types for API inputs, outputs, environment variables, and configuration.
- Implement predictable error handling.
- Never silently swallow errors.
- Use safe database access patterns; never build queries from unsanitized user input.
- Keep secrets out of source code, logs, examples, tests, and client-side bundles.
- Do not weaken authentication, authorization, validation, rate limits, or security headers merely to make development easier.
- Enforce permissions on the server, not only in the frontend.
- Include accessible loading, empty, error, retry, unauthorized, and permission-denied states in user-facing flows.

## Testing rules
- Add or update tests for every changed behavior.
- Include success, validation failure, authorization failure, and dependency-failure paths where applicable.
- Run the existing test, type-check, lint, and build commands before declaring work complete.
- If a command cannot be run, state exactly why and what remains unverified.
- Never claim tests passed unless they were actually executed.

## Security rules
- Perform threat modeling for authentication, payments, uploads, sensitive data, admin actions, AI features, external integrations, and public APIs.
- Check for OWASP-style risks.
- Redact sensitive fields from logs and error messages.
- Add rate limits, abuse protections, and idempotency where appropriate.
- Treat all third-party and model output as untrusted.

## Privacy rules
- Collect only data required for the feature.
- Maintain an accurate data inventory.
- Do not send personal data, customer data, secrets, or proprietary documents to an external AI service, analytics platform, or logging tool unless the documented data flow explicitly permits it.
- Do not place PII in logs, analytics events, test fixtures, screenshots, or error reports by default.
- Design user-data export, correction, deletion, and consent behavior where applicable.
- Every privacy-policy or terms document is a draft and must be marked "requires qualified legal review."

## AI-product rules
- Identify the model provider, model version, prompt version, tools, data sources, and human review points.
- Define prompt-injection defenses and tool-permission boundaries.
- Validate and constrain model outputs before executing actions.
- Log AI events safely.
- Define evaluation datasets, quality metrics, failure cases, escalation paths, and rollback/kill-switch behavior.

## Definition of done
A feature is not done until:
- Requirements and acceptance criteria are documented.
- Code is implemented and reviewed.
- Tests, lint, type checks, and build are run.
- Security and privacy implications are reviewed.
- Database migrations and rollback are documented, where relevant.
- API and user-facing documentation are updated.
- Observability requirements are addressed.
- Deployment, release, and rollback requirements are identified.
- Known limitations and follow-up work are recorded.
