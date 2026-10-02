---
name: privacy-by-design
description: Skill for embedding privacy into the product. Activate to track data flows, retention, and vendor subprocessing.
---

# Privacy-by-Design Skill

## 1. Purpose
Ensures that data collection, processing, and storage adhere to privacy principles. Does NOT provide legal advice.

## 2. When to use
- When introducing new data collection, storage, or third-party vendors.

## 3. Required inputs
- Feature specs and data model.

## 4. Required workflow
1. Enforce data minimization (only collect what's necessary).
2. Classify data and map its flow.
3. Define retention and deletion rules.
4. Ensure privacy-safe logging (no PII in logs).
5. Track vendors and cross-border transfers.
6. Design consent and user-data export/deletion flows.
7. Flag for legal review.

## 5. Required outputs
- Data inventory.
- Data-flow record.
- Retention schedule.
- Privacy impact assessment.

## 6. Quality gates
- Is PII scrubbed from logs?
- Is there a defined deletion path?

## 7. Common failure modes
- Collecting "just in case" data.
- Sending PII to external analytics or LLMs without explicit flow approval.

## 8. Completion checklist
- [ ] Data inventory updated.
- [ ] Retention rules defined.
- [ ] PII scrubbed from logs.
- [ ] Flagged for legal review.
