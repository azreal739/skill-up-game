# API Specification — Intelligent Triage of Customer Payment Disputes

## Document Context

This API specification defines the REST contract for the **Intelligent Triage of Customer Payment Disputes** prototype.

The prototype uses the conference target stack:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** SQLite via Prisma
- **Language:** TypeScript strict mode
- **Testing:** Vitest and Playwright
- **Package manager:** npm workspaces

All data is mock data. The API must not connect to real banking, card-processing, fraud, compliance, CRM, or case-management systems.

---

## 1. API Principles

- All endpoints are served under `/api`.
- All successful responses use `{ "success": true, "data": ... }`.
- All failed responses use `{ "success": false, "message": string, "details"?: FieldError[] }`.
- All date values use ISO 8601 strings.
- Currency is always ZAR.
- The API owns validation, rules evaluation, mock persistence, and response shaping.
- The frontend must not duplicate business rules except for simple required-field hints.
- The rules engine is deterministic and must not use AI or machine learning.

---

## 2. Common Response Shapes

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

### Error Response

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

### FieldError

| Field | Type | Required | Description |
|---|---|---:|---|
| `field` | string | Yes | The invalid field path. |
| `message` | string | Yes | Human-readable validation message. |

---

## 3. HTTP Status Code Conventions

| Status | Use |
|---:|---|
| `200` | Successful read or update. |
| `201` | Dispute created successfully. |
| `400` | Validation error. |
| `404` | Mock customer, transaction, or dispute not found. |
| `500` | Unexpected prototype processing error. |

Authentication is out of scope; no `401` or `403` responses are expected for this prototype.

---

## 4. Canonical Enum Values

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

---

## 5. Shared Data Shapes

### Customer

```json
{
  "customerId": "CUST-001",
  "fullName": "Amina Dlamini",
  "segment": "retail",
  "accountNumber": "000123456789",
  "accountStatus": "active"
}
```

| Field | Type | Required | Description |
|---|---|---:|---|
| `customerId` | string | Yes | Mock customer identifier. |
| `fullName` | string | Yes | Mock customer full name. |
| `segment` | `retail \| business \| premium` | Yes | Mock customer segment. |
| `accountNumber` | string | Yes | Mock account number. |
| `accountStatus` | `active \| restricted \| closed` | Yes | Mock account status. |

### Transaction

```json
{
  "transactionId": "TXN-001",
  "customerId": "CUST-001",
  "paymentType": "EFT",
  "amount": 1250.0,
  "currency": "ZAR",
  "transactionDate": "2026-06-20T08:30:00.000Z",
  "status": "POSTED",
  "merchantOrBeneficiary": "ABC Supplies",
  "reference": "INV-8871"
}
```

| Field | Type | Required | Description |
|---|---|---:|---|
| `transactionId` | string | Yes | Mock transaction identifier. |
| `customerId` | string | Yes | Linked mock customer. |
| `paymentType` | PaymentType | Yes | Payment type. |
| `amount` | number | Yes | Transaction amount in ZAR. |
| `currency` | `ZAR` | Yes | Prototype currency. |
| `transactionDate` | ISO string | Yes | Mock transaction date. |
| `status` | TransactionStatus | Yes | Transaction status used by triage rules. |
| `merchantOrBeneficiary` | string | Yes | Mock merchant or beneficiary. |
| `reference` | string | Yes | Mock transaction reference. |

### DisputeInput

```json
{
  "customerId": "CUST-001",
  "transactionId": "TXN-001",
  "paymentType": "EFT",
  "issueCategory": "DUPLICATE_DEBIT",
  "transactionStatus": "POSTED",
  "amount": 1250.0,
  "disputeDate": "2026-06-22T09:00:00.000Z",
  "transactionReference": "INV-8871",
  "notes": "Customer reports duplicate debit."
}
```

| Field | Type | Required | Validation |
|---|---|---:|---|
| `customerId` | string | No | Must match mock customer when supplied. |
| `transactionId` | string | No | Must match selected customer's transaction when supplied. |
| `paymentType` | PaymentType | Yes | Must be canonical value. |
| `issueCategory` | IssueCategory | Yes | Must be canonical value. |
| `transactionStatus` | TransactionStatus | No | Defaults to `UNKNOWN` if omitted. |
| `amount` | number | Yes | Must be greater than 0. |
| `disputeDate` | ISO string | Yes | Must not be in the future. |
| `transactionReference` | string | Yes | Must not be blank. |
| `notes` | string | No | Optional operational notes. |

### FiredRule

```json
{
  "ruleId": "BR-001",
  "description": "Duplicate debit with posted transaction and recent dispute age",
  "outcome": "RESOLVE_IMMEDIATELY"
}
```

### TriageResult

```json
{
  "recommendedAction": "RESOLVE_IMMEDIATELY",
  "priority": "LOW",
  "ageIndicator": "NEW",
  "destinationTeam": null,
  "escalationReason": null,
  "firedRules": [
    {
      "ruleId": "BR-001",
      "description": "Duplicate debit with posted transaction and recent dispute age",
      "outcome": "RESOLVE_IMMEDIATELY"
    }
  ],
  "rationale": "The dispute is a recent duplicate debit with a posted transaction, so it can be resolved immediately."
}
```

### DisputeCase

```json
{
  "disputeId": "DISP-001",
  "customerId": "CUST-001",
  "customerName": "Amina Dlamini",
  "transactionId": "TXN-001",
  "paymentType": "EFT",
  "issueCategory": "DUPLICATE_DEBIT",
  "transactionStatus": "POSTED",
  "amount": 1250.0,
  "disputeDate": "2026-06-22T09:00:00.000Z",
  "transactionReference": "INV-8871",
  "ageDays": 0,
  "ageIndicator": "NEW",
  "status": "CAPTURED",
  "notes": "Customer reports duplicate debit.",
  "recommendedAction": "RESOLVE_IMMEDIATELY",
  "priority": "LOW",
  "destinationTeam": null,
  "escalationReason": null,
  "triageRationale": "The dispute is a recent duplicate debit with a posted transaction, so it can be resolved immediately.",
  "firedRules": [
    {
      "ruleId": "BR-001",
      "description": "Duplicate debit with posted transaction and recent dispute age",
      "outcome": "RESOLVE_IMMEDIATELY"
    }
  ],
  "selectedAction": null,
  "agentOverride": false,
  "overrideReason": null,
  "agentNotes": null,
  "createdAt": "2026-06-22T09:00:01.000Z",
  "updatedAt": "2026-06-22T09:00:01.000Z"
}
```

---

## 6. Endpoints

## GET /api/health

Confirms that the backend is running.

**Request body:** None

**Success response `200`:**

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "payment-dispute-triage-api"
  }
}
```

**Error responses:** None expected.

**Requirements:** REQ-067

---

## GET /api/reference-data

Returns supported dropdown and display values for the dispute capture and outcome forms.

**Request body:** None

**Success response `200`:**

```json
{
  "success": true,
  "data": {
    "paymentTypes": ["CARD_PAYMENT", "EFT", "INTERNAL_TRANSFER"],
    "issueCategories": ["DUPLICATE_DEBIT", "FAILED_TRANSFER", "MISSING_PAYMENT", "CARD_TRANSACTION_DISPUTE"],
    "transactionStatuses": ["POSTED", "PENDING", "FAILED", "REVERSED", "UNKNOWN"],
    "casePriorities": ["LOW", "MEDIUM", "HIGH"],
    "recommendedActions": ["RESOLVE_IMMEDIATELY", "INVESTIGATE", "ESCALATE", "REFER_TO_ANOTHER_TEAM"],
    "destinationTeams": ["CARD_DISPUTES", "PAYMENTS_OPERATIONS", "INVESTIGATIONS", "SUPERVISOR_REVIEW"]
  }
}
```

**Error responses:** None expected.

**Requirements:** REQ-016, REQ-017, REQ-018, REQ-019, REQ-031

---

## GET /api/customers

Returns mock customers available for the prototype.

**Request body:** None

**Success response `200`:**

```json
{
  "success": true,
  "data": {
    "customers": [
      {
        "customerId": "CUST-001",
        "fullName": "Amina Dlamini",
        "segment": "retail",
        "accountNumber": "000123456789",
        "accountStatus": "active"
      }
    ]
  }
}
```

**Error responses:** None expected for seeded mock data.

**Requirements:** REQ-020, REQ-073, REQ-080

---

## GET /api/customers/:customerId/transactions

Returns mock transactions for a selected mock customer.

**Path parameters:**
- `customerId` (string, required) — mock customer identifier.

**Success response `200`:**

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "transactionId": "TXN-001",
        "customerId": "CUST-001",
        "paymentType": "EFT",
        "amount": 1250.0,
        "currency": "ZAR",
        "transactionDate": "2026-06-20T08:30:00.000Z",
        "status": "POSTED",
        "merchantOrBeneficiary": "ABC Supplies",
        "reference": "INV-8871"
      }
    ]
  }
}
```

**Error responses:**
- `400` — `customerId` is blank or invalid.
- `404` — customer does not exist in mock data.

**Requirements:** REQ-020, REQ-021, REQ-070

---

## POST /api/disputes

Creates a dispute record, evaluates it through the rules engine, persists the triage result, and returns the created case and recommendation.

**Request body:** `DisputeInput`

```json
{
  "customerId": "CUST-001",
  "transactionId": "TXN-001",
  "paymentType": "EFT",
  "issueCategory": "DUPLICATE_DEBIT",
  "transactionStatus": "POSTED",
  "amount": 1250.0,
  "disputeDate": "2026-06-22T09:00:00.000Z",
  "transactionReference": "INV-8871",
  "notes": "Customer reports duplicate debit."
}
```

**Success response `201`:**

```json
{
  "success": true,
  "data": {
    "dispute": {
      "disputeId": "DISP-001",
      "customerId": "CUST-001",
      "customerName": "Amina Dlamini",
      "transactionId": "TXN-001",
      "paymentType": "EFT",
      "issueCategory": "DUPLICATE_DEBIT",
      "transactionStatus": "POSTED",
      "amount": 1250.0,
      "disputeDate": "2026-06-22T09:00:00.000Z",
      "transactionReference": "INV-8871",
      "ageDays": 0,
      "ageIndicator": "NEW",
      "status": "CAPTURED",
      "recommendedAction": "RESOLVE_IMMEDIATELY",
      "priority": "LOW",
      "triageRationale": "The dispute is a recent duplicate debit with a posted transaction, so it can be resolved immediately.",
      "firedRules": [
        {
          "ruleId": "BR-001",
          "description": "Duplicate debit with posted transaction and recent dispute age",
          "outcome": "RESOLVE_IMMEDIATELY"
        }
      ],
      "agentOverride": false,
      "createdAt": "2026-06-22T09:00:01.000Z",
      "updatedAt": "2026-06-22T09:00:01.000Z"
    },
    "triageResult": {
      "recommendedAction": "RESOLVE_IMMEDIATELY",
      "priority": "LOW",
      "ageIndicator": "NEW",
      "destinationTeam": null,
      "escalationReason": null,
      "firedRules": [
        {
          "ruleId": "BR-001",
          "description": "Duplicate debit with posted transaction and recent dispute age",
          "outcome": "RESOLVE_IMMEDIATELY"
        }
      ],
      "rationale": "The dispute is a recent duplicate debit with a posted transaction, so it can be resolved immediately."
    }
  }
}
```

**Error responses:**
- `400` — missing required field, unsupported enum value, amount <= 0, future date, invalid ISO date.
- `404` — supplied customerId or transactionId does not exist in mock data.
- `500` — unexpected processing error.

**Requirements:** REQ-006 to REQ-015, REQ-023 to REQ-047, REQ-068 to REQ-075

---

## GET /api/disputes

Returns disputes captured in SQLite mock persistence.

**Query parameters:**
- `status` (CaseStatus, optional)
- `priority` (CasePriority, optional)
- `recommendedAction` (RecommendedAction, optional)
- `paymentType` (PaymentType, optional)

**Success response `200`:**

```json
{
  "success": true,
  "data": {
    "disputes": [
      {
        "disputeId": "DISP-002",
        "customerId": "CUST-002",
        "customerName": "Michael Naidoo",
        "paymentType": "CARD_PAYMENT",
        "issueCategory": "CARD_TRANSACTION_DISPUTE",
        "amount": 62000.0,
        "ageDays": 2,
        "ageIndicator": "NEW",
        "priority": "HIGH",
        "status": "ESCALATED",
        "recommendedAction": "ESCALATE",
        "createdAt": "2026-06-22T09:10:00.000Z"
      }
    ],
    "total": 1
  }
}
```

**Error responses:**
- `400` — unsupported filter value.

**Requirements:** REQ-059 to REQ-063, REQ-071

---

## GET /api/disputes/:disputeId

Returns a single dispute case with original input, recommendation, rationale, routing decision, and override details.

**Path parameters:**
- `disputeId` (string, required)

**Success response `200`:**

```json
{
  "success": true,
  "data": {
    "dispute": {
      "disputeId": "DISP-001",
      "customerId": "CUST-001",
      "customerName": "Amina Dlamini",
      "transactionId": "TXN-001",
      "paymentType": "EFT",
      "issueCategory": "DUPLICATE_DEBIT",
      "transactionStatus": "POSTED",
      "amount": 1250.0,
      "disputeDate": "2026-06-22T09:00:00.000Z",
      "transactionReference": "INV-8871",
      "ageDays": 0,
      "ageIndicator": "NEW",
      "status": "CAPTURED",
      "recommendedAction": "RESOLVE_IMMEDIATELY",
      "priority": "LOW",
      "triageRationale": "The dispute is a recent duplicate debit with a posted transaction, so it can be resolved immediately.",
      "firedRules": [
        {
          "ruleId": "BR-001",
          "description": "Duplicate debit with posted transaction and recent dispute age",
          "outcome": "RESOLVE_IMMEDIATELY"
        }
      ],
      "selectedAction": null,
      "agentOverride": false,
      "overrideReason": null,
      "agentNotes": null,
      "createdAt": "2026-06-22T09:00:01.000Z",
      "updatedAt": "2026-06-22T09:00:01.000Z"
    }
  }
}
```

**Error responses:**
- `400` — `disputeId` is blank or malformed.
- `404` — dispute does not exist.

**Requirements:** REQ-064, REQ-065, REQ-070

---

## PATCH /api/disputes/:disputeId/outcome

Updates the selected outcome after the operations user accepts or overrides the recommendation.

**Path parameters:**
- `disputeId` (string, required)

**Request body:**

```json
{
  "selectedAction": "INVESTIGATE",
  "destinationTeam": null,
  "overrideReason": "Customer provided new supporting information.",
  "agentNotes": "Asked payments operations to check settlement status."
}
```

| Field | Type | Required | Validation |
|---|---|---:|---|
| `selectedAction` | RecommendedAction | Yes | Must be canonical value. |
| `destinationTeam` | DestinationTeam | Conditional | Required when selectedAction is `REFER_TO_ANOTHER_TEAM`. |
| `overrideReason` | string | Conditional | Required when selectedAction differs from the stored recommendedAction. |
| `agentNotes` | string | No | Optional notes. |

**Success response `200`:**

```json
{
  "success": true,
  "data": {
    "dispute": {
      "disputeId": "DISP-001",
      "status": "IN_PROGRESS",
      "recommendedAction": "RESOLVE_IMMEDIATELY",
      "selectedAction": "INVESTIGATE",
      "agentOverride": true,
      "overrideReason": "Customer provided new supporting information.",
      "updatedAt": "2026-06-22T09:20:00.000Z"
    }
  }
}
```

**Status mapping:**

| selectedAction | Resulting status |
|---|---|
| `RESOLVE_IMMEDIATELY` | `RESOLVED` |
| `INVESTIGATE` | `IN_PROGRESS` |
| `ESCALATE` | `ESCALATED` |
| `REFER_TO_ANOTHER_TEAM` | `REFERRED` |

**Error responses:**
- `400` — missing selected action, unsupported selected action, missing override reason, missing destination team.
- `404` — dispute does not exist.

**Requirements:** REQ-051 to REQ-058, REQ-068 to REQ-071

---

## GET /api/rules

Returns the deterministic business rules and configured thresholds for the optional rules reference screen.

**Request body:** None

**Success response `200`:**

```json
{
  "success": true,
  "data": {
    "thresholds": {
      "immediateResolutionAgeDays": 7,
      "escalationAmountZar": 50000,
      "overdueAgeDays": 30
    },
    "precedence": ["BR-005", "BR-006", "BR-004", "BR-002", "BR-003", "BR-001", "BR-007"],
    "rules": [
      {
        "ruleId": "BR-001",
        "condition": "DUPLICATE_DEBIT + POSTED + ageDays <= 7",
        "recommendedAction": "RESOLVE_IMMEDIATELY",
        "priority": "LOW",
        "description": "Recent posted duplicate debit can be resolved immediately."
      }
    ]
  }
}
```

**Error responses:** None expected for static rule configuration.

**Requirements:** REQ-032, REQ-036, REQ-074, REQ-075

---

## 7. Business Rules Contract

| Rule ID | Condition | Action | Priority | Additional Output |
|---|---|---|---|---|
| BR-001 | `issueCategory = DUPLICATE_DEBIT` and `transactionStatus = POSTED` and `ageDays <= 7` | `RESOLVE_IMMEDIATELY` | `LOW` | `destinationTeam = null` |
| BR-002 | `issueCategory = FAILED_TRANSFER` and `transactionStatus = PENDING` | `INVESTIGATE` | `MEDIUM` | `destinationTeam = null` |
| BR-003 | `issueCategory = MISSING_PAYMENT` and `transactionStatus = UNKNOWN` | `INVESTIGATE` | `MEDIUM` | `destinationTeam = null` |
| BR-004 | `paymentType = CARD_PAYMENT` and `issueCategory = CARD_TRANSACTION_DISPUTE` | `REFER_TO_ANOTHER_TEAM` | `MEDIUM` | `destinationTeam = CARD_DISPUTES` |
| BR-005 | `amount > 50000` | `ESCALATE` | `HIGH` | `escalationReason = High-value dispute exceeds threshold.` |
| BR-006 | `ageDays > 30` | `ESCALATE` | `HIGH` | `escalationReason = Dispute is overdue.` |
| BR-007 | No BR-001 to BR-006 match | `INVESTIGATE` | `LOW` | Default fallback. |

### Rule Precedence

Final recommendation must be selected in this order:

1. `ESCALATE` rules: BR-005, BR-006
2. `REFER_TO_ANOTHER_TEAM`: BR-004
3. `INVESTIGATE`: BR-002, BR-003
4. `RESOLVE_IMMEDIATELY`: BR-001
5. Fallback: BR-007

All matching rules must still be returned in `firedRules`.

---

## 8. Endpoint-to-UI Mapping

| UI Screen | Endpoint(s) |
|---|---|
| Global app load | `GET /api/health` optional health check |
| Dispute Capture | `GET /api/reference-data`, `GET /api/customers`, `GET /api/customers/:customerId/transactions`, `POST /api/disputes` |
| Triage Result | `GET /api/disputes/:disputeId`, `PATCH /api/disputes/:disputeId/outcome` |
| Case Queue | `GET /api/disputes` |
| Case Detail | `GET /api/disputes/:disputeId` |
| Rules Reference | `GET /api/rules` |

---

## 9. Endpoint-to-Requirement Mapping

| Endpoint | Requirement IDs |
|---|---|
| `GET /api/health` | REQ-067 |
| `GET /api/reference-data` | REQ-016, REQ-017, REQ-018, REQ-019, REQ-031 |
| `GET /api/customers` | REQ-020, REQ-073, REQ-080 |
| `GET /api/customers/:customerId/transactions` | REQ-020, REQ-021, REQ-070 |
| `POST /api/disputes` | REQ-006 to REQ-015, REQ-023 to REQ-047, REQ-068 to REQ-075 |
| `GET /api/disputes` | REQ-059 to REQ-063, REQ-071 |
| `GET /api/disputes/:disputeId` | REQ-064, REQ-065, REQ-070 |
| `PATCH /api/disputes/:disputeId/outcome` | REQ-051 to REQ-058, REQ-068 to REQ-071 |
| `GET /api/rules` | REQ-032, REQ-036, REQ-074, REQ-075 |
