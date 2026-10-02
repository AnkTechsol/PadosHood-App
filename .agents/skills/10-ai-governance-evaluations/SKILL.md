---
name: ai-governance-evaluations
description: Skill for governing AI products. Activate when introducing or modifying LLMs, agents, RAG, or ML features.
---

# AI Governance & Evaluations Skill

## 1. Purpose
Ensures AI features are safe, evaluated, and governed properly before reaching users.

## 2. When to use
- When using any AI model (LLM, vision, voice) in the product.

## 3. Required inputs
- AI feature specification.
- Architecture and data flow.

## 4. Required workflow
1. Document model provider, version, and intended use in the AI System Inventory.
2. Define prompt boundaries, tool permissions, and injection defenses.
3. Establish data classification and ensure sensitive data is not used for training without consent.
4. Define evaluation datasets, success metrics, and human-in-the-loop requirements.
5. Setup monitoring, incident response, and kill switches for AI features.

## 5. Required outputs
- Model Card.
- AI Risk Register.
- Evaluation Plan.
- Prompt & Data Policy.

## 6. Quality gates
- Is there a kill switch for rogue AI behavior?
- Are tool permissions strictly bounded?

## 7. Common failure modes
- Allowing LLMs unfettered access to internal APIs.
- No rollback plan for model regressions.
- Failing to validate LLM output.

## 8. Completion checklist
- [ ] Model documented.
- [ ] Prompts and permissions bounded.
- [ ] Evaluation metrics set.
- [ ] Kill switch established.
