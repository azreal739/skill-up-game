# Architecture Document

## Overview

The **Payment Dispute Triage System** is a lightweight, single-page web prototype designed for banking operations staff. It enables a user to capture a customer payment dispute, apply a transparent rules engine, and receive a clear recommended next action with a stated rationale.

The system is intentionally narrow in scope: one user journey, one decision output, no real integrations. All data is mocked in-memory. Business logic is isolated from the UI so rules can be read, tested, and adjusted independently.

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (React SPA)                  │
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │  Dispute     │   │  Triage      │   │  Case          │  │
│  │  Capture     │──▶│  Result      │   │  Queue         │  │
│  │  Form        │   │  Panel       │   │  View          │  │
│  └──────────────┘   └──────────────┘   └────────────────┘  │
│           │                │                   │            │
│           └────────────────┴───────────────────┘           │
│                            │                               │
│                    ┌───────▼────────┐                      │
│                    │  Rules Engine  │                      │
│                    │  (pure JS)     │                      │
│                    └───────┬────────┘                      │
│                            │                               │
│                    ┌───────▼────────┐                      │
│                    │  Mock Data     │                      │
│                    │  Store         │                      │
│                    └────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

**Architecture style:** Client-side only React SPA. No backend server. All state held in React context / in-memory store.

---

## Components

- **DisputeCaptureForm** — Collects all fields required to triage a dispute: customer ID, payment type, issue category, transaction amount, transaction date, and any free-text notes. Performs basic field validation before submitting to the Rules Engine.

- **RulesEngine** — Pure JavaScript module (no UI). Accepts a dispute object, evaluates it against an ordered set of triage rules, and returns a `TriageResult` containing: recommended action, priority level, confidence indicator, and human-readable rationale. Completely decoupled from React.

- **TriageResultPanel** — Displays the output of the Rules Engine for the current dispute. Shows recommended action (badge), priority (colour-coded), and each rule that fired with its explanation. Includes buttons to confirm the recommendation or override it.

- **CaseQueueView** — A read-only table listing all disputes submitted in the current session. Columns: case ID, customer name, payment type, issue category, amount, age (hours), priority, status, recommended action. Supports basic sorting and filtering by status and priority.

- **MockDataStore** — In-memory JavaScript module seeded with mock customers, transactions, and historical dispute cases. Exposes simple CRUD-style functions used by the form and queue. Resets on page refresh. No persistence layer.

- **AppRouter** — Lightweight client-side router (React Router) managing navigation between the Capture form, Result panel, and Case Queue.

- **RuleConfiguration** — A static JSON/JS object defining all triage rules, their conditions, actions, and priorities. Loaded by the Rules Engine at runtime. Changing rules requires editing this file only — no UI or backend changes needed.

---

## Data Model

- **Customer** — `customerId`, `fullName`, `segment` (retail | business | premium), `accountNumber`, `accountStatus` (active | restricted | closed) — referenced by Dispute

- **Transaction** — `transactionId`, `customerId`, `paymentType` (CARD | EFT | INTERNAL_TRANSFER), `amount` (ZAR), `currency`, `transactionDate`, `status` (COMPLETED | PENDING | FAILED | REVERSED), `merchantOrBeneficiary`, `reference` — referenced by Dispute

- **Dispute** — `disputeId` (auto-generated), `customerId`, `transactionId` (optional — may not yet be matched), `paymentType`, `issueCategory` (DUPLICATE_DEBIT | FAILED_TRANSFER | MISSING_PAYMENT | UNAUTHORISED_TRANSACTION | INCORRECT_AMOUNT | OTHER), `amount`, `disputeDate` (timestamp of capture), `transactionDate`, `ageHours` (derived), `status` (NEW | IN_PROGRESS | ESCALATED | RESOLVED | REFERRED), `notes`, `recommendedAction`, `priority`, `triageRationale`, `agentOverride` (boolean), `agentNotes`

- **TriageResult** — `disputeId`, `recommendedAction` (RESOLVE_IMMEDIATELY | INVESTIGATE | ESCALATE | REFER_TO_FRAUD | REFER_TO_COMPLIANCE | REQUEST_MORE_INFO), `priority` (LOW | MEDIUM | HIGH | CRITICAL), `firedRules` (array of `{ ruleId, description, outcome }`), `rationale` (plain-English summary) — produced by RulesEngine, not persisted independently

- **RuleDefinition** — `ruleId`, `name`, `description`, `conditions` (field comparisons), `action`, `priority`, `order` (evaluation sequence) — static configuration

---

## Relationships Between Entities

```
Customer ──< Dispute >── Transaction
                │
                ▼
           TriageResult
                │
                ▼
         RuleDefinition (static, many rules may fire per dispute)
```

- One Customer may have many Disputes.
- One Transaction may be linked to at most one Dispute (disputes can exist before transaction matching is complete).
- Each Dispute produces exactly one TriageResult when submitted.
- A TriageResult references one or more RuleDefinitions that fired.

---

## Integrations

- **Core Banking System** — Not implemented — Mock customer and transaction records are seeded statically in MockDataStore. No live account data.

- **Card Processing Platform** — Not implemented — Card transaction status is a mock field in the Transaction entity.

- **Case Management System (e.g. ServiceNow / internal CRM)** — Not implemented — Case queue is held in-memory for the session only. No case creation API calls are made.

- **Fraud Detection System** — Not implemented — "REFER_TO_FRAUD" is a valid recommended action produced by the rules engine, but no actual fraud system is called.

- **Compliance / Regulatory Reporting** — Not implemented — The rules engine can flag a case for compliance referral based on amount thresholds or issue type, but no reporting system is integrated.

- **Notification / Email System** — Not implemented — No alerts or emails are sent to customers or agents.

> **All integrations are mocked or not implemented.** This prototype uses only in-memory mock data. No network calls are made to any external system.

---

## Key Decisions

- **Client-side only (no backend server)** — Rationale: eliminates infrastructure setup time during the practical. The rules engine is pure logic with no data persistence requirement for demo purposes. Deployable as a static site.

- **Rules engine isolated as a pure JavaScript module** — Rationale: keeps business logic testable without rendering any UI. Rules can be unit-tested directly. Makes the decision logic auditable and easy to adjust independently of the React component tree.

- **Rules defined as a static configuration object, not hardcoded in conditionals** — Rationale: rules are data, not code. Adding or changing a rule means editing one JSON-like structure. This mirrors how a real rules engine would be configured and makes the logic transparent to non-developers.

- **React with plain CSS (no heavy UI framework)** — Rationale: keeps the bundle simple and avoids configuration overhead. Tailwind utility classes are acceptable if the team prefers; no component library dependency needed for a focused prototype.

- **In-memory MockDataStore with seed data** — Rationale: provides realistic-looking customer, transaction, and historical case data without a database. Sufficient for demo and testing. Reset on refresh is acceptable for a prototype.

- **No authentication or authorisation** — Rationale: out of scope for this prototype. A single operations user persona is assumed. Adding auth would add setup time with no demo value.

- **TriageResult is ephemeral (not separately persisted)** — Rationale: the result is stored as fields on the Dispute record after the agent confirms or overrides. No separate result table is needed.

- **Amount in ZAR (South African Rand)** — Rationale: aligns with the banking context for this prototype. Currency handling is single-currency only.

---

## Triage Rules

The rules engine evaluates disputes in priority order. The first matching critical or high-priority rule short-circuits escalation. Lower rules continue to accumulate rationale.

| Rule ID | Condition | Action | Priority |
|---------|-----------|--------|----------|
| R01 | issueCategory = UNAUTHORISED_TRANSACTION | REFER_TO_FRAUD | CRITICAL |
| R02 | amount > 50,000 AND issueCategory ≠ OTHER | ESCALATE | CRITICAL |
| R03 | ageHours > 720 (30 days) | REFER_TO_COMPLIANCE | HIGH |
| R04 | transactionStatus = FAILED AND issueCategory = FAILED_TRANSFER | RESOLVE_IMMEDIATELY | HIGH |
| R05 | issueCategory = DUPLICATE_DEBIT AND transactionStatus = COMPLETED | INVESTIGATE | HIGH |
| R06 | issueCategory = MISSING_PAYMENT AND ageHours > 48 | INVESTIGATE | MEDIUM |
| R07 | issueCategory = INCORRECT_AMOUNT AND amount < 500 | RESOLVE_IMMEDIATELY | MEDIUM |
| R08 | accountStatus = RESTRICTED OR accountStatus = CLOSED | ESCALATE | HIGH |
| R09 | paymentType = INTERNAL_TRANSFER AND issueCategory = MISSING_PAYMENT | INVESTIGATE | MEDIUM |
| R10 | No other rule matched | REQUEST_MORE_INFO | LOW |

---

## API Contracts

The prototype has no HTTP API. All function calls are in-process JavaScript. The contracts below describe the module interfaces that correspond to `docs/api-spec.md`.

```
// RulesEngine
triageDispute(dispute: Dispute): TriageResult

// MockDataStore
getCustomer(customerId: string): Customer | null
getTransaction(transactionId: string): Transaction | null
createDispute(dispute: Partial<Dispute>): Dispute
updateDispute(disputeId: string, updates: Partial<Dispute>): Dispute
listDisputes(filters?: DisputeFilters): Dispute[]
```

---

## Testing and Verification Approach

- **Unit tests for RulesEngine** — Jest test suite covering each of the 10 rules with a dispute fixture designed to trigger only that rule. Also covers multi-rule scenarios (e.g. unauthorised + high amount should yield CRITICAL with REFER_TO_FRAUD). Target: 100% rule coverage.

- **MockDataStore tests** — Verify CRUD functions return correct shapes, that filters work, and that seed data is valid against the schema.

- **Component smoke tests** — React Testing Library renders each component with mock props and verifies key text and elements are present. Not exhaustive UI testing.

- **Manual triage walkthrough** — QA checklist of 5 representative dispute scenarios (one per payment type, one per priority level) verified against expected outcomes before demo.

- **Verification checklist before finalising:**
  - [ ] All 10 rules produce correct output for crafted fixtures
  - [ ] CaseQueueView renders all disputes in MockDataStore seed
  - [ ] DisputeCaptureForm validates required fields before submission
  - [ ] TriageResultPanel displays rationale for each fired rule
  - [ ] Agent override is recorded on the Dispute record
  - [ ] No network calls are made (verified via browser DevTools)

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Rules engine produces unexpected output for edge-case inputs | Medium | High | Unit test every rule with boundary values; add a catch-all R10 rule |
| In-memory store loses data on accidental refresh | High | Low | Acceptable for prototype; note limitation clearly in demo; seed data always restores |
| Scope creep (team adds features beyond triage journey) | Medium | High | Architecture is bounded to the single journey; Architect reviews any additions against this document |
| Mock data feels unrealistic, weakening demo credibility | Low | Medium | Seed data includes varied amounts, statuses, and ages representing real operational variety |
| Amount thresholds in rules don't reflect realistic banking values | Low | Medium | Thresholds reviewed against common retail banking dispute patterns before demo |
| React state management becomes complex if queue grows | Low | Low | Queue is read-only and session-scoped; React context is sufficient, no Redux needed |
| Accessibility gaps reduce usability for operations staff | Medium | Medium | Use semantic HTML, visible focus states, and colour + icon combinations for priority badges (not colour alone) |
