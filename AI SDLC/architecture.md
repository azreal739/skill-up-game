# Architecture Document — Intelligent Triage of Customer Payment Disputes

## 1. Overview

The **Payment Dispute Triage System** is a lightweight internal prototype for banking operations users. It supports one focused journey: capture a payment dispute, apply transparent rules-based triage, display the recommended next action, and allow the user to confirm or override the outcome.

The system uses the conference target stack:

| Layer | Choice |
|---|---|
| Language | TypeScript strict mode |
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | SQLite via Prisma |
| Styling | Tailwind CSS |
| Testing | Vitest and Playwright |
| Package manager | npm |
| Structure | npm workspaces: frontend, backend, shared |

All data is mocked. The prototype must not integrate with real banking, customer, card-processing, fraud, compliance, case-management, or notification platforms.

---

## 2. Architecture Style

**Style:** Small full-stack web prototype.

**Runtime flow:**

```text
Browser
  React + Vite + Tailwind
        |
        | HTTP/JSON under /api
        v
Node.js + Express API
        |
        | TypeScript services
        v
Dispute Service + Rules Engine
        |
        | Prisma Client
        v
SQLite mock database
```

**Key boundary:** The frontend owns presentation and user interaction. The backend owns validation, persistence, business rules, and response shaping.

---

## 3. Component Diagram

```text
┌────────────────────────────────────────────────────────────────────┐
│                          React + Vite Frontend                    │
│                                                                    │
│  AppRouter                                                         │
│    ├─ DisputeCaptureForm                                           │
│    ├─ TriageResultPanel                                            │
│    ├─ CaseQueueView                                                │
│    ├─ CaseDetailView                                               │
│    └─ RulesReferenceView                                           │
│                                                                    │
│  API Client                                                        │
│    ├─ referenceDataApi                                             │
│    ├─ customerApi                                                  │
│    ├─ disputeApi                                                   │
│    └─ rulesApi                                                     │
└───────────────────────────────────────┬────────────────────────────┘
                                        │ HTTP/JSON
                                        ▼
┌────────────────────────────────────────────────────────────────────┐
│                         Express Backend API                        │
│                                                                    │
│  Routes                                                            │
│    ├─ GET    /api/health                                           │
│    ├─ GET    /api/reference-data                                   │
│    ├─ GET    /api/customers                                        │
│    ├─ GET    /api/customers/:customerId/transactions               │
│    ├─ POST   /api/disputes                                         │
│    ├─ GET    /api/disputes                                         │
│    ├─ GET    /api/disputes/:disputeId                              │
│    ├─ PATCH  /api/disputes/:disputeId/outcome                      │
│    └─ GET    /api/rules                                            │
│                                                                    │
│  Services                                                          │
│    ├─ DisputeService                                               │
│    ├─ CustomerService                                              │
│    ├─ TransactionService                                           │
│    ├─ RulesEngine                                                  │
│    └─ ReferenceDataService                                         │
│                                                                    │
│  Infrastructure                                                    │
│    ├─ Prisma Client                                                │
│    ├─ Validation helpers                                           │
│    └─ Error response mapper                                        │
└───────────────────────────────────────┬────────────────────────────┘
                                        │ Prisma
                                        ▼
┌────────────────────────────────────────────────────────────────────┐
│                              SQLite                                │
│                                                                    │
│  Customer                                                          │
│  Transaction                                                       │
│  Dispute                                                           │
└────────────────────────────────────────────────────────────────────┘
```

---

## 4. Components

### 4.1 Frontend Components

- **AppRouter** — Manages routes for capture, result, queue, detail, and rules reference screens.
- **AppShell** — Provides header, navigation, and prototype notice banner.
- **DisputeCaptureForm** — Collects dispute input, displays field validation, pre-populates transaction details, and submits to `POST /api/disputes`.
- **TriageResultPanel** — Displays recommendation, priority, age indicator, rationale, fired rules, and outcome controls.
- **CaseQueueView** — Displays captured disputes from `GET /api/disputes` with filters and summary cards.
- **CaseDetailView** — Displays complete case detail from `GET /api/disputes/:disputeId`.
- **RulesReferenceView** — Displays deterministic rules and thresholds from `GET /api/rules`.
- **PriorityBadge** — Accessible display of `LOW`, `MEDIUM`, or `HIGH` using text and visual treatment.
- **RecommendedActionBadge** — Displays plain-language recommendation labels.
- **AgeIndicatorBadge** — Displays `NEW`, `AGING`, or `OVERDUE` with accessible text.

### 4.2 Backend Components

- **Express App** — Defines middleware, JSON parsing, route registration, and error handling.
- **ReferenceDataController** — Returns canonical enum values.
- **CustomerController** — Returns mock customers and their transactions.
- **DisputeController** — Creates disputes, lists disputes, reads dispute details, and updates outcomes.
- **RulesController** — Returns configured deterministic business rules.
- **DisputeService** — Coordinates validation, age calculation, rules evaluation, Prisma persistence, and response mapping.
- **RulesEngine** — Pure TypeScript module that accepts normalized dispute input and returns `TriageResult`.
- **Prisma Repository Layer** — Encapsulates SQLite access for customers, transactions, and disputes.
- **Validation Layer** — Validates required fields, enum values, date rules, amount rules, and outcome update rules.

### 4.3 Shared Workspace Components

- **Shared Types** — Canonical TypeScript types and enums used by frontend and backend.
- **API Contracts** — Request/response interfaces that align with `docs/api-spec.md`.
- **Rule Constants** — Threshold values and rule IDs where safe to share.

---

## 5. Data Model

### 5.1 Entity Summary

| Entity | Responsibility | Relationships |
|---|---|---|
| Customer | Mock customer context for the operations user. | One customer has many transactions and disputes. |
| Transaction | Mock transaction context used to pre-populate dispute inputs. | One transaction belongs to one customer and may be linked to disputes. |
| Dispute | Captured dispute, recommendation, outcome, and audit timestamps. | One dispute may reference one customer and optionally one transaction. |

### 5.2 Canonical Domain Fields

#### Customer

- `id` — internal database ID
- `customerId` — mock customer identifier, e.g. `CUST-001`
- `fullName` — mock full name
- `segment` — `retail`, `business`, or `premium`
- `accountNumber` — mock account number
- `accountStatus` — `active`, `restricted`, or `closed`
- `createdAt`, `updatedAt`

#### Transaction

- `id` — internal database ID
- `transactionId` — mock transaction identifier, e.g. `TXN-001`
- `customerId` — foreign key to Customer
- `paymentType` — `CARD_PAYMENT`, `EFT`, or `INTERNAL_TRANSFER`
- `amount` — ZAR amount
- `currency` — always `ZAR`
- `transactionDate` — ISO date/time
- `status` — `POSTED`, `PENDING`, `FAILED`, `REVERSED`, or `UNKNOWN`
- `merchantOrBeneficiary`
- `reference`
- `createdAt`, `updatedAt`

#### Dispute

- `id` — internal database ID
- `disputeId` — public mock dispute ID, e.g. `DISP-001`
- `customerId` — optional customer reference
- `customerName` — denormalized mock display name for queue display
- `transactionId` — optional transaction reference
- `paymentType`
- `issueCategory`
- `transactionStatus`
- `amount`
- `disputeDate`
- `transactionReference`
- `ageDays`
- `ageIndicator`
- `status`
- `notes`
- `recommendedAction`
- `priority`
- `destinationTeam`
- `escalationReason`
- `triageRationale`
- `firedRulesJson` — JSON string storing fired rules for SQLite simplicity
- `selectedAction`
- `agentOverride`
- `overrideReason`
- `agentNotes`
- `createdAt`, `updatedAt`

---

## 6. Prisma Schema Draft

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
  paymentType            String
  amount                 Decimal
  currency               String    @default("ZAR")
  transactionDate         DateTime
  status                 String
  merchantOrBeneficiary  String
  reference              String
  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt
}

model Dispute {
  id                   Int      @id @default(autoincrement())
  disputeId            String   @unique
  customerId           String?
  customer             Customer? @relation(fields: [customerId], references: [customerId])
  customerName         String?
  transactionId        String?
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
  agentOverride        Boolean  @default(false)
  overrideReason       String?
  agentNotes           String?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}
```

SQLite does not enforce TypeScript enum safety directly in this draft. The application validation layer must enforce canonical enum values.

---

## 7. Business Rules Architecture

### 7.1 Rules Engine Input

The rules engine receives normalized input:

```ts
type NormalizedDisputeForTriage = {
  paymentType: PaymentType;
  issueCategory: IssueCategory;
  transactionStatus: TransactionStatus;
  amount: number;
  ageDays: number;
};
```

### 7.2 Rules Engine Output

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

### 7.3 Rules Contract

| Rule ID | Condition | Action | Priority |
|---|---|---|---|
| BR-001 | `DUPLICATE_DEBIT` + `POSTED` + `ageDays <= 7` | `RESOLVE_IMMEDIATELY` | `LOW` |
| BR-002 | `FAILED_TRANSFER` + `PENDING` | `INVESTIGATE` | `MEDIUM` |
| BR-003 | `MISSING_PAYMENT` + `UNKNOWN` | `INVESTIGATE` | `MEDIUM` |
| BR-004 | `CARD_PAYMENT` + `CARD_TRANSACTION_DISPUTE` | `REFER_TO_ANOTHER_TEAM` | `MEDIUM` |
| BR-005 | `amount > 50000` | `ESCALATE` | `HIGH` |
| BR-006 | `ageDays > 30` | `ESCALATE` | `HIGH` |
| BR-007 | No BR-001 to BR-006 match | `INVESTIGATE` | `LOW` |

### 7.4 Precedence

The rules engine must collect all fired rules, then select the final recommendation by precedence:

1. Escalation: BR-005, BR-006
2. Referral: BR-004
3. Investigation: BR-002, BR-003
4. Immediate resolution: BR-001
5. Fallback: BR-007

---

## 8. API Surface

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Backend health check. |
| GET | `/api/reference-data` | Reference values for forms and filters. |
| GET | `/api/customers` | List mock customers. |
| GET | `/api/customers/:customerId/transactions` | List mock transactions for a customer. |
| POST | `/api/disputes` | Create dispute and run triage. |
| GET | `/api/disputes` | List disputes with optional filters. |
| GET | `/api/disputes/:disputeId` | Read dispute detail. |
| PATCH | `/api/disputes/:disputeId/outcome` | Confirm or override recommendation. |
| GET | `/api/rules` | Read deterministic rules and thresholds. |

Detailed endpoint contracts are maintained in `docs/api-spec.md`.

---

## 9. Frontend Routes

| Route | Screen | API Calls |
|---|---|---|
| `/capture` | Dispute Capture | `GET /api/reference-data`, `GET /api/customers`, `GET /api/customers/:customerId/transactions`, `POST /api/disputes` |
| `/disputes/:disputeId/result` | Triage Result | `GET /api/disputes/:disputeId`, `PATCH /api/disputes/:disputeId/outcome` |
| `/queue` | Case Queue | `GET /api/disputes` |
| `/disputes/:disputeId` | Case Detail | `GET /api/disputes/:disputeId` |
| `/rules` | Rules Reference | `GET /api/rules` |

---

## 10. Workspace Structure

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
│   │   ├── src/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── routes/
│   │   │   ├── types/
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── tailwind.config.ts
│   │   └── vite.config.ts
│   └── backend/
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── seed.ts
│       ├── src/
│       │   ├── controllers/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── rules/
│       │   ├── validation/
│       │   ├── repositories/
│       │   └── server.ts
│       └── vitest.config.ts
├── packages/
│   └── shared/
│       └── src/
│           ├── enums.ts
│           ├── api-types.ts
│           └── domain-types.ts
├── tests/
│   └── e2e/
│       └── dispute-triage.spec.ts
└── .kiro/
    ├── steering/
    ├── specs/
    ├── hooks/
    └── skills/
```

---

## 11. Integrations

| Integration | Status | Implementation |
|---|---|---|
| Core banking | Not implemented | Mock customers only. |
| Card processing | Not implemented | Mock transaction statuses only. |
| Case management | Not implemented | SQLite mock dispute records only. |
| Fraud systems | Not implemented | No fraud routing action in canonical scope. |
| Compliance systems | Not implemented | No compliance integration. |
| Notifications | Not implemented | No outbound messages. |

No external network calls are required for the prototype.

---

## 12. Key Decisions

- **Use full-stack architecture rather than client-only state.** The conference stack requires Express and Prisma, and this gives Kiro clear backend boundaries.
- **Keep all data mocked.** SQLite stores seed/demo records only; it is not a real banking integration.
- **Use deterministic rules.** The business problem requires explainability and consistency; AI/ML decisioning is explicitly out of scope.
- **Keep rules engine pure.** A pure TypeScript function makes rule tests fast, deterministic, and easy to reason about.
- **Use canonical enums everywhere.** The API specification is the source of truth for enum values.
- **Persist triage result fields on Dispute.** A separate triage result table is unnecessary for the prototype.
- **Use JSON string for fired rules in SQLite.** This keeps the Prisma model simple while preserving traceability.
- **Use Tailwind for styling.** This aligns with the target stack and keeps UI implementation quick.
- **Use Vitest for unit/API tests and Playwright for E2E.** This matches the conference test stack.

---

## 13. Testing Strategy

| Test Level | Tool | Scope |
|---|---|---|
| Rules unit tests | Vitest | BR-001 to BR-007, age indicators, precedence, fired rules. |
| Validation unit tests | Vitest | Required fields, enum values, amount, date, outcome validation. |
| API tests | Vitest + Supertest or fetch-compatible helper | Express endpoints and response shapes. |
| Repository tests | Vitest | Prisma CRUD and seeded mock data. |
| Component tests | Vitest + React Testing Library, if available | Screen rendering, field errors, badges. |
| E2E tests | Playwright | Capture dispute, review recommendation, confirm/override outcome, queue/detail flow. |

---

## 14. Kiro Readiness Notes

Kiro should treat the following documents as source-of-truth inputs:

- `#docs/requirements.md` — functional and non-functional behaviour
- `#docs/api-spec.md` — REST endpoints, request/response shapes, validation, business rules contract
- `#docs/ui-spec.md` — screens, flows, components, states, endpoint usage
- `#docs/architecture.md` — system design, data model, workspace structure, implementation boundaries
- `#docs/test-cases.md` — acceptance criteria and traceability

Guardrails for Kiro generation:

- Do not introduce real banking integrations.
- Do not introduce AI/ML decisioning.
- Do not add authentication unless explicitly requested later.
- Do not add unsupported enum values.
- Do not change BR-001 to BR-007 without updating all five docs.
- Prefer small, testable TypeScript modules.
- Keep the prototype demo-friendly and scoped to the single dispute triage journey.
