# Architecture Document — Intelligent Triage of Customer Payment Disputes

## Document Control

- **Document:** `docs/architecture.md`
- **Use case:** Intelligent Triage of Customer Payment Disputes
- **Audience:** Architects, API Designers, UI/UX Designers, Quality Engineers, Feature Analysts, Kiro/Harness Engineers
- **Status:** Final consolidated architecture
- **Consolidates:** Team architecture update + aligned architecture pack
- **Aligned with:** `docs/requirements.md`, `docs/api-spec.md`, `docs/ui-spec.md`, `docs/test-cases.md`
- **Decisioning approach:** Transparent deterministic business rules only. No AI or machine learning decisioning.
- **Data policy:** Mock data only. No real customer, account, card, transaction, case-management, fraud, compliance, or notification integrations.

---

## 1. Overview

The **Payment Dispute Triage System** is a lightweight internal prototype for banking operations users. It supports one focused journey:

1. Capture a customer payment dispute.
2. Validate the captured details.
3. Persist the mock dispute in SQLite through Prisma.
4. Apply transparent rules-based triage.
5. Display one recommended next action with priority, age indicator, fired rule IDs, and plain-language rationale.
6. Allow the operations user to accept or override the recommendation.
7. Display captured cases in a demo case queue and case detail screen.

The prototype answers one practical question:

> Given this payment dispute, what is the most appropriate next step right now?

The system is intentionally narrow in scope: one user journey, one decision output, no real integrations, and no production banking behaviour.

---

## 2. Target Technology Stack

All implementation work must use the conference target stack.

| Layer | Choice | Notes |
|---|---|---|
| Language | TypeScript strict mode | Applies to frontend, backend, and shared workspace code. |
| Frontend | React + Vite | Single-page application using React Router. |
| Backend | Node.js + Express | REST API under `/api`; no GraphQL. |
| Database | SQLite via Prisma | Local `dev.db`; seeded with mock data only. |
| Styling | Tailwind CSS | Utility classes; no heavy component library required. |
| Unit/API Testing | Vitest | Rules, validation, service, repository, and API tests. |
| E2E Testing | Playwright | Primary user journey and queue/detail validation. |
| Package manager | npm | Single install from workspace root. |
| Structure | npm workspaces | `apps/frontend`, `apps/backend`, and `packages/shared`. |

---

## 3. Architecture Style and Boundaries

**Style:** Small full-stack web prototype.

```text
Browser
  React + Vite + Tailwind
        |
        | HTTP/JSON under /api
        v
Node.js + Express API
        |
        | TypeScript controllers/services
        v
Dispute Service + Pure Rules Engine
        |
        | Prisma Client
        v
SQLite mock database
```

### Boundary Rules

| Boundary | Responsibility |
|---|---|
| Frontend | Presentation, navigation, field-level user interaction, optimistic required-field hints, loading/empty/error states. |
| Backend API | Validation source of truth, response shaping, error mapping, dispute creation, outcome updates, query filtering. |
| Rules Engine | Deterministic business rule evaluation only. No Express, no Prisma, no network, no storage. |
| Prisma/SQLite | Mock persistence for customers, transactions, and disputes. |
| Shared package | Canonical enums, API types, domain types, and selected rule constants. |

The frontend must not duplicate business rules. It may display required-field hints, but the backend remains the validation and decisioning source of truth.

---

## 4. Component Diagram

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                           React + Vite Frontend                           │
│                                                                            │
│  AppShell                                                                  │
│    ├─ Header / navigation / prototype notice                               │
│    └─ AppRouter                                                            │
│         ├─ /capture                    → DisputeCaptureForm                │
│         ├─ /disputes/:disputeId/result → TriageResultPanel                 │
│         ├─ /queue                      → CaseQueueView                     │
│         ├─ /disputes/:disputeId        → CaseDetailView                    │
│         └─ /rules                      → RulesReferenceView                │
│                                                                            │
│  API Client                                                                │
│    ├─ healthApi                                                            │
│    ├─ referenceDataApi                                                     │
│    ├─ customerApi                                                          │
│    ├─ disputeApi                                                           │
│    └─ rulesApi                                                             │
└───────────────────────────────────────┬────────────────────────────────────┘
                                        │ HTTP/JSON fetch calls under /api
                                        ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                            Node.js + Express API                          │
│                                                                            │
│  Routes / Controllers                                                      │
│    ├─ GET    /api/health                                                   │
│    ├─ GET    /api/reference-data                                           │
│    ├─ GET    /api/customers                                                │
│    ├─ GET    /api/customers/:customerId/transactions                       │
│    ├─ POST   /api/disputes                                                 │
│    ├─ GET    /api/disputes                                                 │
│    ├─ GET    /api/disputes/:disputeId                                      │
│    ├─ PATCH  /api/disputes/:disputeId/outcome                              │
│    └─ GET    /api/rules                                                    │
│                                                                            │
│  Services                                                                  │
│    ├─ ReferenceDataService                                                 │
│    ├─ CustomerService                                                      │
│    ├─ TransactionService                                                   │
│    ├─ DisputeService                                                       │
│    └─ RulesEngine                                                          │
│                                                                            │
│  Infrastructure                                                            │
│    ├─ Prisma Client                                                        │
│    ├─ Repository layer                                                     │
│    ├─ Validation helpers                                                   │
│    └─ Error response mapper / middleware                                   │
└───────────────────────────────────────┬────────────────────────────────────┘
                                        │ Prisma
                                        ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                                 SQLite                                    │
│                                                                            │
│  Customer                                                                  │
│  Transaction                                                               │
│  Dispute                                                                   │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Application Components

### 5.1 Frontend Components

#### AppShell

Provides the persistent layout:

- Application title: `Payment Dispute Triage`
- Prototype notice banner: `Prototype only — all customer, transaction, and dispute data is mocked.`
- Primary navigation:
  - `Capture Dispute`
  - `Case Queue`
  - `Rules Reference`

The active navigation item must be identifiable without relying on colour alone.

#### AppRouter

Uses React Router to manage these routes:

| Route | Screen | Purpose |
|---|---|---|
| `/capture` | Dispute Capture | Capture a new payment dispute. |
| `/disputes/:disputeId/result` | Triage Result | Review recommendation and confirm/override outcome. |
| `/queue` | Case Queue | Review captured mock dispute cases. |
| `/disputes/:disputeId` | Case Detail | Review a single dispute and outcome history. |
| `/rules` | Rules Reference | Explain BR-001 to BR-007, thresholds, and precedence. |

#### DisputeCaptureForm

Collects all fields required to triage a dispute:

- Customer selector or customer reference input.
- Transaction selector for selected customer.
- Transaction reference.
- Payment type.
- Issue category.
- Transaction status.
- Dispute amount.
- Dispute date.
- Notes.

Behaviour:

- Loads reference data from `GET /api/reference-data`.
- Loads mock customers from `GET /api/customers`.
- Selecting a customer calls `GET /api/customers/:customerId/transactions`.
- Selecting a transaction pre-populates payment type, transaction status, amount, and transaction reference.
- User-entered values override pre-populated transaction values.
- Submits to `POST /api/disputes`.
- Displays field-level validation errors returned by the API.
- Preserves entered data when processing fails.

#### TriageResultPanel

Displays the recommendation returned from the backend:

- Recommended action badge.
- Priority badge.
- Age indicator badge.
- Plain-language rationale.
- Fired rules list.
- Captured dispute summary.
- Outcome confirmation controls.

Behaviour:

- Loads detail from `GET /api/disputes/:disputeId` when opened directly.
- Allows user to accept recommendation.
- Allows user to override recommendation with required override reason.
- Requires destination team when selected action is `REFER_TO_ANOTHER_TEAM`.
- Saves outcome with `PATCH /api/disputes/:disputeId/outcome`.

#### CaseQueueView

Displays disputes from `GET /api/disputes`.

Capabilities:

- Newest-first default ordering.
- Summary cards:
  - Total cases.
  - High-priority cases.
  - Escalated cases.
  - Referred cases.
- Filters:
  - Status.
  - Priority.
  - Recommended action.
  - Payment type.
- Client-side sorting by amount, age, priority, status, or created date.
- Row click navigates to `/disputes/:disputeId`.

#### CaseDetailView

Displays a single dispute from `GET /api/disputes/:disputeId`.

Shows:

- Case status.
- Customer context.
- Dispute input.
- Recommendation.
- Fired rules.
- Rationale.
- Destination team or escalation reason.
- Selected action.
- Override indicator and reason.
- Agent notes.

#### RulesReferenceView

Displays deterministic rule configuration from `GET /api/rules`.

This screen must use `GET /api/rules`, not `GET /api/reference-data`.

Shows:

- Thresholds:
  - Immediate-resolution age threshold.
  - Escalation amount threshold.
  - Overdue age threshold.
- Rule table:
  - Rule ID.
  - Condition.
  - Recommended action.
  - Priority.
  - Destination team or escalation reason.
  - Plain-language explanation.
- Precedence notes.

#### Shared UI Components

| Component | Purpose |
|---|---|
| `PriorityBadge` | Shows `LOW`, `MEDIUM`, or `HIGH` using text plus visual treatment. |
| `RecommendedActionBadge` | Shows plain-language labels for recommendation values. |
| `AgeIndicatorBadge` | Shows `NEW`, `AGING`, or `OVERDUE`. |
| `StatusBadge` | Shows `CAPTURED`, `IN_PROGRESS`, `ESCALATED`, `RESOLVED`, or `REFERRED`. |
| `FieldError` | Displays field-level validation messages. |
| `LoadingState` | Reusable loading panel or skeleton. |
| `EmptyState` | Reusable empty/filtered-empty state. |
| `ErrorState` | Reusable API or processing error state. |

All priority/status displays must use text plus visual styling. Do not rely on colour alone.

---

### 5.2 Backend Components

#### Express App

Responsibilities:

- Register JSON middleware.
- Register route modules.
- Register error handler middleware.
- Serve all API routes under `/api`.
- Return consistent JSON response shapes.

#### Controllers / Route Handlers

| Controller | Routes | Responsibility |
|---|---|---|
| `HealthController` | `GET /api/health` | Backend health check. |
| `ReferenceDataController` | `GET /api/reference-data` | Canonical enum/reference values. |
| `CustomerController` | `GET /api/customers`, `GET /api/customers/:customerId/transactions` | Mock customer and transaction reads. |
| `DisputeController` | `POST /api/disputes`, `GET /api/disputes`, `GET /api/disputes/:disputeId`, `PATCH /api/disputes/:disputeId/outcome` | Dispute capture, triage, queue, detail, and outcome updates. |
| `RulesController` | `GET /api/rules` | Read-only rules, thresholds, and precedence. |

#### Services

| Service | Responsibility |
|---|---|
| `ReferenceDataService` | Returns canonical enum values for dropdowns and filters. |
| `CustomerService` | Reads seeded mock customers. |
| `TransactionService` | Reads seeded mock transactions by customer. |
| `DisputeService` | Coordinates validation, age calculation, rules evaluation, persistence, filtering, detail, and outcome updates. |
| `RulesEngine` | Pure TypeScript decisioning function. |

#### RulesEngine

A pure TypeScript module with no Express dependency, no Prisma dependency, no database access, and no network calls.

Input:

```ts
type NormalizedDisputeForTriage = {
  paymentType: PaymentType;
  issueCategory: IssueCategory;
  transactionStatus: TransactionStatus;
  amount: number;
  ageDays: number;
};
```

Output:

```ts
type TriageResult = {
  recommendedAction: RecommendedAction;
  priority: CasePriority;
  ageIndicator: AgeIndicator;
  destinationTeam: DestinationTeam | null;
  escalationReason: string | null;
  firedRules: FiredRule[];
  rationale: string;
};
```

#### RuleConfiguration

`ruleConfiguration.ts` is the single source of truth for:

- BR-001 to BR-007.
- Rule conditions.
- Rule descriptions.
- Rule outcomes.
- Rule priorities.
- Destination team for referral rules.
- Escalation reason for escalation rules.
- Threshold values.
- Precedence order.

Changing a rule must require updating the spec pack and the matching tests.

#### Repository Layer

Encapsulates Prisma access for:

- Customers.
- Transactions.
- Disputes.

The RulesEngine must never import Prisma directly.

#### Validation Layer

Validates:

- Required fields.
- Canonical enum values.
- Amount > 0.
- Valid ISO date.
- Dispute date not in the future.
- Unsupported query filter values.
- Existing mock customer/transaction references.
- Outcome update rules:
  - `overrideReason` required when selected action differs from recommendation.
  - `destinationTeam` required when selected action is `REFER_TO_ANOTHER_TEAM`.

#### Error Handler Middleware

Maps errors to the API response shape:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "details": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

---

### 5.3 Shared Workspace Components

The `packages/shared` workspace should contain reusable TypeScript definitions that are safe to share between frontend and backend.

Recommended files:

| File | Purpose |
|---|---|
| `enums.ts` | Canonical enum values. |
| `api-types.ts` | Request/response interfaces aligned to `docs/api-spec.md`. |
| `domain-types.ts` | Customer, Transaction, Dispute, TriageResult, FiredRule types. |
| `rule-types.ts` | Rule definition and threshold types where useful. |

The shared package should not contain browser-only code, Express-only code, or Prisma client code.

---

## 6. Canonical Values

The API specification is the source of truth for canonical values. These values must be used consistently in requirements, API, UI, tests, architecture, Prisma seed data, and Kiro specs.

### PaymentType

```text
CARD_PAYMENT
EFT
INTERNAL_TRANSFER
```

### IssueCategory

```text
DUPLICATE_DEBIT
FAILED_TRANSFER
MISSING_PAYMENT
CARD_TRANSACTION_DISPUTE
```

### TransactionStatus

```text
POSTED
PENDING
FAILED
REVERSED
UNKNOWN
```

### AgeIndicator

```text
NEW
AGING
OVERDUE
```

### CasePriority

```text
LOW
MEDIUM
HIGH
```

### RecommendedAction

```text
RESOLVE_IMMEDIATELY
INVESTIGATE
ESCALATE
REFER_TO_ANOTHER_TEAM
```

### CaseStatus

```text
CAPTURED
IN_PROGRESS
ESCALATED
RESOLVED
REFERRED
```

### DestinationTeam

```text
CARD_DISPUTES
PAYMENTS_OPERATIONS
INVESTIGATIONS
SUPERVISOR_REVIEW
```

Unsupported enum values must be rejected by the backend validation layer.

---

## 7. Data Model

### 7.1 Entity Summary

| Entity | Responsibility | Relationships |
|---|---|---|
| Customer | Mock customer context for the operations user. | One customer has many transactions and may have many disputes. |
| Transaction | Mock transaction context used to pre-populate dispute inputs. | One transaction belongs to one customer and may be referenced by zero or more disputes. |
| Dispute | Captured dispute, recommendation, outcome, and audit timestamps. | One dispute may reference one customer and optionally one transaction. |
| TriageResult | Recommendation output. | Not persisted separately; stored as fields on Dispute. |
| RuleDefinition | Deterministic rule configuration. | Not persisted; defined in TypeScript config. |

### 7.2 Customer Fields

| Field | Type | Notes |
|---|---|---|
| `id` | Int | Internal database ID. |
| `customerId` | String | Mock customer identifier, e.g. `CUST-001`; unique. |
| `fullName` | String | Mock full name. |
| `segment` | String | `retail`, `business`, or `premium`. |
| `accountNumber` | String | Mock account number only. |
| `accountStatus` | String | `active`, `restricted`, or `closed`. |
| `createdAt` | DateTime | Audit timestamp. |
| `updatedAt` | DateTime | Audit timestamp. |

### 7.3 Transaction Fields

| Field | Type | Notes |
|---|---|---|
| `id` | Int | Internal database ID. |
| `transactionId` | String | Mock transaction identifier, e.g. `TXN-001`; unique. |
| `customerId` | String | Foreign key to Customer. |
| `paymentType` | String | Canonical PaymentType value. |
| `amount` | Decimal | ZAR amount. |
| `currency` | String | Always `ZAR`. |
| `transactionDate` | DateTime | Mock transaction timestamp. |
| `status` | String | Canonical TransactionStatus value. |
| `merchantOrBeneficiary` | String | Mock display name. |
| `reference` | String | Mock transaction reference. |
| `createdAt` | DateTime | Audit timestamp. |
| `updatedAt` | DateTime | Audit timestamp. |

### 7.4 Dispute Fields

| Field | Type | Notes |
|---|---|---|
| `id` | Int | Internal database ID. |
| `disputeId` | String | Public mock dispute ID, e.g. `DISP-001`; unique. |
| `customerId` | String? | Optional customer reference. |
| `customerName` | String? | Denormalized mock display name for queue/detail screens. |
| `transactionId` | String? | Optional transaction reference. |
| `paymentType` | String | Canonical PaymentType value. |
| `issueCategory` | String | Canonical IssueCategory value. |
| `transactionStatus` | String | Canonical TransactionStatus value; defaults to `UNKNOWN` if omitted. |
| `amount` | Decimal | Disputed amount in ZAR. |
| `disputeDate` | DateTime | Date/time used for age calculation. |
| `transactionReference` | String | Required user-captured reference. |
| `ageDays` | Int | Derived on create. |
| `ageIndicator` | String | `NEW`, `AGING`, or `OVERDUE`. |
| `status` | String | Canonical CaseStatus value. |
| `notes` | String? | Optional operational notes. |
| `recommendedAction` | String | Canonical RecommendedAction value. |
| `priority` | String | `LOW`, `MEDIUM`, or `HIGH`. |
| `destinationTeam` | String? | Required when final recommendation or selected action is referral. |
| `escalationReason` | String? | Required when final recommendation is escalation. |
| `triageRationale` | String | Plain-language rationale. |
| `firedRulesJson` | String | JSON string storing fired rule array for SQLite simplicity. |
| `selectedAction` | String? | User-confirmed outcome action. |
| `agentOverride` | Boolean | `true` when selected action differs from recommendation. |
| `overrideReason` | String? | Required for overrides. |
| `agentNotes` | String? | Optional user notes after recommendation. |
| `createdAt` | DateTime | Audit timestamp. |
| `updatedAt` | DateTime | Audit timestamp. |

### 7.5 TriageResult Persistence

`TriageResult` is not stored as a separate table. The recommendation output is persisted on the `Dispute` row using these fields:

- `recommendedAction`
- `priority`
- `ageIndicator`
- `destinationTeam`
- `escalationReason`
- `triageRationale`
- `firedRulesJson`

The API maps `firedRulesJson` back to a `firedRules` array in response payloads.

### 7.6 Amount Serialization Decision

Prisma stores `amount` as `Decimal` to avoid floating-point currency issues. API responses must serialize Decimal values as JSON numbers rounded to two decimal places for prototype display.

Example:

```json
{
  "amount": 1250.00
}
```

Do not return Prisma Decimal object structures in API responses.

---

## 8. Prisma Schema Draft

```prisma
model Customer {
  id            Int           @id @default(autoincrement())
  customerId    String        @unique
  fullName      String
  segment       String
  accountNumber String
  accountStatus String
  transactions  Transaction[]
  disputes      Dispute[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Transaction {
  id                    Int       @id @default(autoincrement())
  transactionId          String    @unique
  customerId             String
  customer               Customer  @relation(fields: [customerId], references: [customerId])
  disputes               Dispute[]
  paymentType            String
  amount                 Decimal
  currency               String    @default("ZAR")
  transactionDate         DateTime
  status                 String
  merchantOrBeneficiary  String
  reference              String
  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt

  @@index([customerId])
  @@index([status])
  @@index([paymentType])
}

model Dispute {
  id                   Int          @id @default(autoincrement())
  disputeId            String       @unique
  customerId           String?
  customer             Customer?    @relation(fields: [customerId], references: [customerId])
  customerName         String?
  transactionId        String?
  transaction          Transaction? @relation(fields: [transactionId], references: [transactionId])
  paymentType          String
  issueCategory        String
  transactionStatus    String
  amount               Decimal
  disputeDate          DateTime
  transactionReference String
  ageDays              Int
  ageIndicator         String
  status               String
  notes                String?
  recommendedAction    String
  priority             String
  destinationTeam      String?
  escalationReason     String?
  triageRationale      String
  firedRulesJson       String
  selectedAction       String?
  agentOverride        Boolean      @default(false)
  overrideReason       String?
  agentNotes           String?
  createdAt            DateTime     @default(now())
  updatedAt            DateTime     @updatedAt

  @@index([customerId])
  @@index([transactionId])
  @@index([status])
  @@index([priority])
  @@index([recommendedAction])
  @@index([paymentType])
  @@index([createdAt])
}
```

SQLite does not enforce TypeScript enum safety directly in this draft. The backend validation layer must enforce canonical enum values before persistence and when filtering.

No unique constraint is applied to `Dispute.transactionId` in this prototype. This allows repeated demo disputes against the same mock transaction. If the product decision changes to one-dispute-per-transaction, add `@unique` to `Dispute.transactionId` and add matching API validation/test coverage.

---

## 9. Business Rules Architecture

### 9.1 Thresholds

Threshold values must be defined once in `ruleConfiguration.ts`.

| Threshold | Value | Used By |
|---|---:|---|
| Immediate-resolution age | `ageDays <= 7` | BR-001 |
| Escalation amount | `amount > 50000` ZAR | BR-005 |
| Overdue age | `ageDays > 30` | BR-006 |

### 9.2 Age Indicator Derivation

| Condition | AgeIndicator |
|---|---|
| `ageDays >= 0 && ageDays <= 7` | `NEW` |
| `ageDays >= 8 && ageDays <= 30` | `AGING` |
| `ageDays > 30` | `OVERDUE` |

Future dispute dates must be rejected before age calculation.

### 9.3 Rules Contract

| Rule ID | Condition | Recommended Action | Priority | Destination / Reason |
|---|---|---|---|---|
| BR-001 | `issueCategory = DUPLICATE_DEBIT` and `transactionStatus = POSTED` and `ageDays <= 7` | `RESOLVE_IMMEDIATELY` | `LOW` | Recent posted duplicate debit can be resolved immediately. |
| BR-002 | `issueCategory = FAILED_TRANSFER` and `transactionStatus = PENDING` | `INVESTIGATE` | `MEDIUM` | Pending failed transfer requires investigation. |
| BR-003 | `issueCategory = MISSING_PAYMENT` and `transactionStatus = UNKNOWN` | `INVESTIGATE` | `MEDIUM` | Unknown transaction status requires investigation. |
| BR-004 | `paymentType = CARD_PAYMENT` and `issueCategory = CARD_TRANSACTION_DISPUTE` | `REFER_TO_ANOTHER_TEAM` | `MEDIUM` | `CARD_DISPUTES` |
| BR-005 | `amount > 50000` | `ESCALATE` | `HIGH` | High-value dispute exceeds threshold. |
| BR-006 | `ageDays > 30` | `ESCALATE` | `HIGH` | Dispute is overdue. |
| BR-007 | No BR-001 to BR-006 match | `INVESTIGATE` | `LOW` | Default investigation fallback. |

### 9.4 Precedence

The rules engine must evaluate BR-001 through BR-006, collect every matching rule, and then select the final recommendation by precedence.

Precedence order:

1. Escalation rules: BR-005, BR-006
2. Referral rule: BR-004
3. Investigation rules: BR-002, BR-003
4. Immediate resolution rule: BR-001
5. Fallback rule: BR-007

BR-007 applies only when no rule from BR-001 through BR-006 matches. BR-007 must not be returned in `firedRules` when another rule has matched.

### 9.5 Fired Rules

The response must include all fired non-fallback rules that matched. When no non-fallback rules matched, the response must include BR-007.

Example multi-rule case:

- Input satisfies BR-004 and BR-005.
- `firedRules` contains BR-004 and BR-005.
- Final recommendation is `ESCALATE` because escalation has higher precedence.

### 9.6 Recommended Action to Status Mapping

| selectedAction | Resulting CaseStatus |
|---|---|
| `RESOLVE_IMMEDIATELY` | `RESOLVED` |
| `INVESTIGATE` | `IN_PROGRESS` |
| `ESCALATE` | `ESCALATED` |
| `REFER_TO_ANOTHER_TEAM` | `REFERRED` |

---

## 10. API Surface

Detailed contracts are maintained in `docs/api-spec.md`. This architecture must remain aligned with that file.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Backend health check. |
| GET | `/api/reference-data` | Reference values for forms and filters. |
| GET | `/api/customers` | List mock customers. |
| GET | `/api/customers/:customerId/transactions` | List mock transactions for a customer. |
| POST | `/api/disputes` | Create dispute, calculate age, run triage, persist result, and return case plus triage result. |
| GET | `/api/disputes` | List disputes with optional filters. |
| GET | `/api/disputes/:disputeId` | Read full dispute detail. |
| PATCH | `/api/disputes/:disputeId/outcome` | Confirm or override recommendation. |
| GET | `/api/rules` | Read deterministic rules, thresholds, and precedence. |

All successful API responses must use:

```json
{
  "success": true,
  "data": {}
}
```

All failed API responses must use:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "details": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

### Route Parameter Naming

Use `:disputeId` and `:customerId` in documentation, implementation, API clients, and Playwright tests. Do not mix with generic `:id` route names in generated code unless the API spec is also changed.

---

## 11. Frontend Route to API Mapping

| Frontend Route | Screen | API Calls |
|---|---|---|
| App load | AppShell | Optional `GET /api/health` for dev diagnostics. |
| `/capture` | Dispute Capture | `GET /api/reference-data`, `GET /api/customers`, `GET /api/customers/:customerId/transactions`, `POST /api/disputes` |
| `/disputes/:disputeId/result` | Triage Result | `GET /api/disputes/:disputeId`, `PATCH /api/disputes/:disputeId/outcome` |
| `/queue` | Case Queue | `GET /api/disputes` |
| `/disputes/:disputeId` | Case Detail | `GET /api/disputes/:disputeId` |
| `/rules` | Rules Reference | `GET /api/rules` |

---

## 12. Workspace Structure

Recommended npm workspace structure:

```text
.
├── package.json
├── tsconfig.base.json
├── docs/
│   ├── requirements.md
│   ├── test-cases.md
│   ├── api-spec.md
│   ├── ui-spec.md
│   └── architecture.md
├── apps/
│   ├── frontend/
│   │   ├── package.json
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── api/
│   │       │   ├── client.ts
│   │       │   ├── referenceDataApi.ts
│   │       │   ├── customerApi.ts
│   │       │   ├── disputeApi.ts
│   │       │   └── rulesApi.ts
│   │       ├── components/
│   │       │   ├── DisputeCaptureForm.tsx
│   │       │   ├── TriageResultPanel.tsx
│   │       │   ├── CaseQueueView.tsx
│   │       │   ├── CaseDetailView.tsx
│   │       │   ├── RulesReferenceView.tsx
│   │       │   └── shared/
│   │       │       ├── PriorityBadge.tsx
│   │       │       ├── RecommendedActionBadge.tsx
│   │       │       ├── AgeIndicatorBadge.tsx
│   │       │       ├── StatusBadge.tsx
│   │       │       ├── FieldError.tsx
│   │       │       ├── LoadingState.tsx
│   │       │       ├── EmptyState.tsx
│   │       │       └── ErrorState.tsx
│   │       ├── routes/
│   │       │   ├── CapturePage.tsx
│   │       │   ├── ResultPage.tsx
│   │       │   ├── QueuePage.tsx
│   │       │   ├── DetailPage.tsx
│   │       │   └── RulesPage.tsx
│   │       └── test/
│   │           └── test-utils.tsx
│   └── backend/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vitest.config.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── seed.ts
│       └── src/
│           ├── server.ts
│           ├── app.ts
│           ├── controllers/
│           │   ├── healthController.ts
│           │   ├── referenceDataController.ts
│           │   ├── customerController.ts
│           │   ├── disputeController.ts
│           │   └── rulesController.ts
│           ├── routes/
│           │   ├── healthRoutes.ts
│           │   ├── referenceDataRoutes.ts
│           │   ├── customerRoutes.ts
│           │   ├── disputeRoutes.ts
│           │   └── rulesRoutes.ts
│           ├── services/
│           │   ├── referenceDataService.ts
│           │   ├── customerService.ts
│           │   ├── transactionService.ts
│           │   └── disputeService.ts
│           ├── rules/
│           │   ├── ruleConfiguration.ts
│           │   └── rulesEngine.ts
│           ├── validation/
│           │   ├── disputeValidation.ts
│           │   ├── outcomeValidation.ts
│           │   └── filterValidation.ts
│           ├── repositories/
│           │   ├── customerRepository.ts
│           │   ├── transactionRepository.ts
│           │   └── disputeRepository.ts
│           └── middleware/
│               └── errorHandler.ts
├── packages/
│   └── shared/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── enums.ts
│           ├── api-types.ts
│           ├── domain-types.ts
│           └── rule-types.ts
├── tests/
│   └── e2e/
│       ├── dispute-triage.spec.ts
│       └── playwright.config.ts
└── .kiro/
    ├── steering/
    ├── specs/
    ├── hooks/
    └── skills/
```

If the starter repository already uses root-level `frontend/` and `backend/` workspaces, that structure is acceptable. However, the final spec-pack recommendation is `apps/frontend`, `apps/backend`, and `packages/shared` because it keeps shared types explicit and makes Kiro generation cleaner.

---

## 13. Infrastructure Options

The prototype can be run through any of these paths depending on team environment constraints.

| Path | When to Use | Requirements | Notes |
|---|---|---|---|
| Local development | Machine allows Node.js, npm, and local servers. | Node.js 20+, npm, unrestricted localhost. | Preferred path for speed. |
| AWS deployment | Team has AWS access and architecture approval. | AWS account, CDK if used, landing zone compliance. | Optional; not required for judging. |
| Cloud dev environment | Machine is locked down. | GitHub Codespaces or pre-provisioned VM. | Valid when local install is restricted. |

The SQLite database file is local in all cases. No managed database service is required.

---

## 14. Seed Data

The backend must include a repeatable Prisma seed script at `apps/backend/prisma/seed.ts`.

Seed data should include:

- At least 5 mock customers.
- At least 6 mock transactions.
- Transaction scenarios that cover:
  - `CARD_PAYMENT`
  - `EFT`
  - `INTERNAL_TRANSFER`
  - `POSTED`
  - `PENDING`
  - `FAILED`
  - `REVERSED`
  - `UNKNOWN`
- Dispute-ready examples for:
  - Duplicate debit.
  - Failed transfer.
  - Missing payment.
  - Card transaction dispute.
  - High-value dispute over R50,000.
  - Overdue dispute older than 30 days.

Seed data must never include real customer names, real account numbers, real card numbers, or real transaction references.

Recommended setup command:

```bash
npx prisma migrate dev
npx prisma db seed
```

For a reset during demo preparation:

```bash
npx prisma migrate reset
```

---

## 15. Integrations

| Integration | Status | Implementation |
|---|---|---|
| Core banking system | Not implemented | Mock customers only. |
| Card processing platform | Not implemented | Mock transaction statuses only. |
| Case management system | Not implemented | SQLite mock dispute records only. |
| Fraud systems | Not implemented | No fraud-system calls. Referral uses canonical destination teams only. |
| Compliance systems | Not implemented | No compliance reporting or integration. |
| Notification/email system | Not implemented | No outbound messages. |

No external network calls are required for the prototype.

The only network calls expected in browser DevTools are calls from the React frontend to the local Express API under `/api`.

---

## 16. Key Architecture Decisions

| Decision | Rationale |
|---|---|
| Use full-stack architecture instead of client-only state. | The conference stack requires Express and Prisma; this gives Kiro clear backend boundaries. |
| Keep all data mocked. | SQLite stores seed/demo records only; it is not a real banking integration. |
| Use SQLite via Prisma instead of in-memory storage. | Disputes persist across hot reloads and demo refreshes, while still requiring zero external infrastructure. |
| Use deterministic business rules. | The use case requires transparent, explainable, consistent triage. AI/ML decisioning is out of scope. |
| Keep RulesEngine pure. | A pure TypeScript module is fast to test, easy to reason about, and independent of API/DB concerns. |
| Use `ruleConfiguration.ts` as single source of truth. | Rule thresholds, descriptions, and precedence remain transparent and centrally testable. |
| Use canonical enums everywhere. | Prevents drift between requirements, API, UI, tests, seed data, and Kiro-generated code. |
| Persist triage result fields on Dispute. | A separate TriageResult table is unnecessary for this prototype. |
| Store fired rules as JSON string in SQLite. | Keeps the Prisma model simple while preserving traceability. |
| Use Decimal for amounts. | Avoids floating-point currency issues; API serializes Decimal to two-decimal JSON numbers. |
| Use Tailwind CSS. | Aligns with the target stack and supports fast, polished internal-tool styling. |
| Use Vitest and Playwright. | Matches the required test stack and supports unit/API/E2E confidence. |
| Use no authentication or authorisation. | A single operations user persona is assumed; auth is out of scope. |
| Use no production integrations. | Prevents accidental real-data or real-system access. |

---

## 17. Testing Strategy

| Test Level | Tool | Scope |
|---|---|---|
| Rules unit tests | Vitest | BR-001 to BR-007, age indicators, precedence, fired rules. |
| Validation unit tests | Vitest | Required fields, enum values, amount, date, outcome validation. |
| API tests | Vitest + Supertest or fetch-compatible helper | Express endpoints, response shapes, status codes, filters, and error cases. |
| Repository tests | Vitest | Prisma CRUD and seeded mock data. |
| Component tests | Vitest + React Testing Library, if available | Screen rendering, field errors, badges, loading/error states. |
| E2E tests | Playwright | Capture dispute, review recommendation, confirm/override outcome, queue/detail flow. |
| Harness checks | Scripted/manual | Kiro steering, specs, hooks, strict mode, ESLint, Markdown artefacts. |

### 17.1 Playwright E2E Coverage

At minimum, Playwright should cover:

1. Open `/capture`.
2. Verify app shell and prototype notice.
3. Load reference values and mock customers.
4. Select customer.
5. Select transaction or enter dispute details.
6. Submit a recent posted duplicate debit.
7. Verify navigation to `/disputes/:disputeId/result`.
8. Verify recommendation banner shows `Resolve immediately`.
9. Verify fired rules contain `BR-001`.
10. Confirm outcome.
11. Verify status becomes `RESOLVED`.
12. Navigate to `/queue`.
13. Verify the dispute appears in the queue.
14. Open case detail.
15. Verify captured input, recommendation, fired rules, and outcome are displayed.

### 17.2 Stable E2E Selectors

The frontend should include stable `data-testid` attributes for primary Playwright targets, including:

- Navigation links.
- Customer selector.
- Transaction selector.
- Payment type dropdown.
- Issue category dropdown.
- Transaction status dropdown.
- Amount input.
- Dispute date input.
- Transaction reference input.
- Notes textarea.
- Submit button.
- Recommendation banner.
- Priority badge.
- Age indicator badge.
- Fired rules list.
- Selected action dropdown.
- Override reason textarea.
- Destination team dropdown.
- Confirm outcome button.
- Queue filters.
- Case table rows.
- Case detail panels.

---

## 18. Verification Checklist Before Demo

### Specification Consistency

- [ ] Every requirement has a corresponding test case in `docs/test-cases.md`.
- [ ] Every API endpoint is referenced by at least one requirement in `docs/requirements.md`.
- [ ] Every UI screen references the API endpoints it calls in `docs/ui-spec.md`.
- [ ] The data model supports all API endpoints in `docs/api-spec.md`.
- [ ] BR-001 through BR-007 match across requirements, API, architecture, UI, and tests.
- [ ] Canonical enum values match across requirements, API, architecture, UI, tests, seed data, and shared types.

### Harness Readiness

- [ ] Steering files reference the team’s spec documents via `#docs/...`.
- [ ] At least one Kiro spec is configured with `requirements.md`, `design.md`, and `tasks.md`.
- [ ] At least one hook is defined, such as lint-on-save or test-on-create.
- [ ] TypeScript strict mode is enabled in frontend, backend, and shared `tsconfig.json` files.
- [ ] ESLint is configured.
- [ ] All artefacts are in text/Markdown format or have text descriptions alongside images.

### Runtime Verification

- [ ] `npm install` completes from the workspace root.
- [ ] `npx prisma migrate dev` completes without errors.
- [ ] `npx prisma db seed` completes without errors.
- [ ] `npm run dev` starts frontend and backend.
- [ ] `GET /api/health` returns success.
- [ ] `GET /api/reference-data` returns canonical values.
- [ ] `GET /api/rules` returns thresholds and BR-001 through BR-007.
- [ ] `POST /api/disputes` returns `recommendedAction`, `priority`, `firedRules`, and `rationale`.
- [ ] `PATCH /api/disputes/:disputeId/outcome` updates case status correctly.
- [ ] Case queue updates after a new capture.
- [ ] No external banking/fraud/compliance/notification calls occur.
- [ ] Vitest suite passes.
- [ ] Playwright suite passes.

---

## 19. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---:|---:|---|
| Rules engine produces unexpected output for edge-case inputs. | Medium | High | Unit test every rule, threshold, and precedence scenario. |
| BR-007 is implemented as always firing. | Medium | High | Tests must verify BR-007 appears only when BR-001 to BR-006 do not match. |
| Prisma migration conflicts during the session. | Low | Medium | Use `prisma migrate reset` to wipe and re-seed; acceptable for prototype. |
| Scope creep adds features beyond triage journey. | Medium | High | Use this architecture and requirements as scope guardrails. |
| Mock data feels unrealistic. | Low | Medium | Seed varied customers, statuses, amounts, issue categories, and dispute ages. |
| Vite proxy is misconfigured. | Medium | High | Configure Vite proxy to forward `/api` to Express and document ports in README. |
| TypeScript strict errors block build. | Low | High | Run `tsc --noEmit` as a pre-check and keep shared types aligned. |
| SQLite file missing on fresh clone. | Medium | Low | Document migrate/seed commands in README. |
| Playwright tests fail due to port conflicts. | Low | Medium | Use Playwright `webServer` configuration to start dev servers automatically. |
| Accessibility gaps reduce usability. | Medium | Medium | Use semantic HTML, visible focus states, labels, and colour + text/icon badges. |
| Kiro invents unsupported enum values or integrations. | Medium | High | Steering files must reference spec docs and include strict generation guardrails. |
| Prisma Decimal leaks into API responses. | Medium | Medium | Add response mappers converting Decimal to two-decimal JSON numbers. |

---

## 20. Kiro Readiness Notes

Kiro should treat the following documents as source-of-truth inputs:

- `#docs/requirements.md` — functional and non-functional behaviour.
- `#docs/api-spec.md` — REST endpoints, request/response shapes, validation, and business rules contract.
- `#docs/ui-spec.md` — screens, flows, components, states, endpoint usage, and Playwright selectors.
- `#docs/architecture.md` — system design, data model, workspace structure, implementation boundaries.
- `#docs/test-cases.md` — acceptance criteria, tests, and traceability.

### Kiro Guardrails

- Do not introduce real banking integrations.
- Do not introduce AI/ML decisioning.
- Do not add authentication unless explicitly requested later.
- Do not add unsupported enum values.
- Do not change BR-001 to BR-007 without updating all five docs.
- Do not make the frontend the source of truth for business rules.
- Do not store or display real customer/account/card/transaction data.
- Prefer small, testable TypeScript modules.
- Keep the prototype scoped to the single dispute triage journey.
- Keep the UI demo-friendly, accessible, and visually polished enough for an internal operations tool.

---

## 21. Final Consolidation Decisions

This final architecture intentionally consolidates the two architecture versions as follows:

| Topic | Final Decision |
|---|---|
| Architecture style | Full-stack React + Express + Prisma + SQLite prototype. |
| Workspace shape | Prefer `apps/frontend`, `apps/backend`, `packages/shared`; root `frontend/` and `backend/` remains acceptable only if starter repo already uses it. |
| Rules Reference API | Uses `GET /api/rules`, not `GET /api/reference-data`. |
| Health endpoint | Included as `GET /api/health`. |
| Rules endpoint | Included as `GET /api/rules`. |
| Route params | Use `:customerId` and `:disputeId` consistently. |
| Amount storage | Use Prisma `Decimal`; serialize as two-decimal JSON numbers. |
| Transaction relation | Add optional Prisma relation from Dispute to Transaction. |
| BR-007 | Applies only when no BR-001 to BR-006 rule matches. It must not always fire. |
| Fired rules | Return all matching fired rules; fallback only when no specific rule fired. |
| Rule source of truth | `ruleConfiguration.ts`. |
| Testability | Vitest + Playwright with stable `data-testid` selectors. |
| Scope | Mock-only, no real integrations, no AI/ML, no auth. |
