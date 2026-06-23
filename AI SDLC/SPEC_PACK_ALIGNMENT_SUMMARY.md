# Spec Pack Alignment Summary

## What Was Fixed

The original documents were strong individually, but they had several cross-document inconsistencies that could cause Kiro to generate the wrong architecture or conflicting implementation details. This aligned version fixes those issues.

## Main Alignment Changes

1. **Architecture corrected to match the conference stack**
   - Changed from client-side-only/in-memory architecture to React + Vite frontend, Express backend, Prisma, and SQLite.

2. **API specification converted to REST endpoints**
   - Replaced in-process module contract framing with `/api` REST endpoints.
   - Added endpoint-to-requirement and endpoint-to-UI mapping.

3. **Canonical enum values standardised**
   - Removed drift such as `COMPLETED`, `CRITICAL`, `REFER_TO_FRAUD`, `REFER_TO_COMPLIANCE`, and `REQUEST_MORE_INFO`.
   - Standardised on the API enum set across all documents.

4. **Rules aligned across all artefacts**
   - Standardised BR-001 through BR-007.
   - BR-007 is now the fallback rule.
   - Rule precedence is documented separately.

5. **Traceability improved**
   - Added a requirement-to-test traceability matrix covering REQ-001 through REQ-080.
   - Added endpoint-to-requirement mapping.
   - Added UI screen-to-endpoint mapping.

6. **Kiro readiness improved**
   - Added Kiro source-of-truth references.
   - Added guardrails to prevent scope creep.
   - Added checks for steering, specs, hooks, strict TypeScript, ESLint, and Markdown artefacts.

## Recommended Use

Use these files as the new Day 1 spec pack:

```text
docs/
├── requirements.md
├── test-cases.md
├── api-spec.md
├── ui-spec.md
└── architecture.md
```

Then create `.kiro/` files from this aligned source of truth.

## Remaining Follow-Up

The `.kiro/` folder itself was not created here because this request focused on the five Day 1 spec-pack documents. The next useful step is to generate:

```text
.kiro/steering/product.md
.kiro/steering/tech.md
.kiro/steering/structure.md
.kiro/steering/conventions.md
.kiro/specs/dispute-triage/requirements.md
.kiro/specs/dispute-triage/design.md
.kiro/specs/dispute-triage/tasks.md
.kiro/hooks/lint-on-save.md
.kiro/hooks/test-on-create.md
```
