# API Specification

## Document Context

This API specification supports the **Intelligent Triage of Customer Payment Disputes** prototype.

The architecture defines the prototype as a **client-side only React SPA with no backend server**. Therefore, this document defines **frontend-to-service module contracts** rather than real HTTP endpoints. The contracts are written in an API-spec style so that Kiro, developers, testers, and UI designers can align on inputs, outputs, validation, and error behaviour.

If the team later introduces an Express or REST backend, these module contracts can be mapped directly to HTTP endpoints with minimal changes.

---

## Common Contract Conventions

**Runtime style:** In-process JavaScript / TypeScript function calls

**Data source:** Mock in-memory data only

**Persistence:** Session-scoped in-memory store; data resets on page refresh

**Date format:** ISO 8601 string, for example `2026-06-22T10:00:00.000Z`

**Currency:** ZAR only

**Error shape:**

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

**Success shape:**

```json
{
  "success": true,
  "data": {}
}
```

---

## Canonical Enum Values

### PaymentType

Use these values in UI, validation, rules, tests, and mock data:

```text
CARD_PAYMENT
EFT
INTERNAL_TRANSFER
```

### IssueCategory

Use these values in UI, validation, rules, tests, and mock data:

```text
DUPLICATE_DEBIT
FAILED_TRANSFER
MISSING_PAYMENT
CARD_TRANSACTION_DISPUTE
```

### TransactionStatus

Use these values in UI, validation, rules, tests, and mock data:

```text
POSTED
PENDING
FAILED
REVERSED
UNKNOWN
```

> Note: The architecture uses `COMPLETED` in places. For the implementation contract, use `POSTED` as the canonical value. If seed data contains `COMPLETED`, normalise it to `POSTED` before triage.

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

> Note: The architecture mentions `CRITICAL`. For this prototype contract, map critical handling to `HIGH` priority plus an `ESCALATE` recommendation, because the EARS requirements define only LOW, MEDIUM, and HIGH.

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

## Shared Data Shapes

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

**Fields:**
- customerId (string, required) — mock customer identifier
- fullName (string, required) — mock customer full name
- segment (string, required) — `retail`, `business`, or `premium`
- accountNumber (string, required) — mock account number
- accountStatus (string, required) — `active`, `restricted`, or `closed`

### Transaction

```json
{
  "transactionId": "TXN-001",
  "customerId": "CUST-001",
  "paymentType": "EFT",
  "amount": 1250.00,
  "currency": "ZAR",
  "transactionDate": "2026-06-20T08:30:00.000Z",
  "status": "POSTED",
  "merchantOrBeneficiary": "ABC Supplies",
  "reference": "INV-8871"
}
```

**Fields:**
- transactionId (string, required) — mock transaction identifier
- customerId (string, required) — linked mock customer identifier
- paymentType (PaymentType, required) — transaction payment type
- amount (number, required) — transaction amount in ZAR
- currency (string, required) — always `ZAR`
- transactionDate (string, required) — ISO timestamp
- status (TransactionStatus, required) — transaction status used by triage rules
- merchantOrBeneficiary (string, required) — mock merchant or beneficiary name
- reference (string, required) — transaction reference

### DisputeInput

```json
{
  "customerId": "CUST-001",
  "transactionId": "TXN-001",
  "paymentType": "EFT",
  "issueCategory": "DUPLICATE_DEBIT",
  "transactionStatus": "POSTED",
  "amount": 1250.00,
  "disputeDate": "2026-06-22T09:00:00.000Z",
  "transactionReference": "INV-8871",
  "notes": "Customer reports duplicate debit."
}
```

**Fields:**
- customerId (string, optional) — mock customer identifier, required where selected from seed data
- transactionId (string, optional) — mock transaction identifier, optional because transaction matching may be incomplete
- paymentType (PaymentType, required) — payment type being disputed
- issueCategory (IssueCategory, required) — type of issue reported
- transactionStatus (TransactionStatus, optional) — status if known; use `UNKNOWN` when unavailable
- amount (number, required) — disputed amount in ZAR; must be greater than zero
- disputeDate (string, required) — ISO timestamp; must not be in the future
- transactionReference (string, required) — payment or transaction reference captured by operations user
- notes (string, optional) — free-text operational notes

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

**Fields:**
- recommendedAction (RecommendedAction, required) — final recommended next action
- priority (CasePriority, required) — LOW, MEDIUM, or HIGH
- ageIndicator (AgeIndicator, required) — NEW, AGING, or OVERDUE
- destinationTeam (DestinationTeam/null, optional) — required when recommendedAction is `REFER_TO_ANOTHER_TEAM`
- escalationReason (string/null, optional) — required when recommendedAction is `ESCALATE`
- firedRules (array, required) — rule identifiers and descriptions that produced the outcome
- rationale (string, required) — plain-language explanation suitable for operations users

### DisputeCase

```json
{
  "disputeId": "DISP-001",
  "customerId": "CUST-001",
  "transactionId": "TXN-001",
  "paymentType": "EFT",
  "issueCategory": "DUPLICATE_DEBIT",
  "amount": 1250.00,
  "disputeDate": "2026-06-22T09:00:00.000Z",
  "transactionReference": "INV-8871",
  "ageDays": 0,
  "ageIndicator": "NEW",
  "status": "CAPTURED",
  "notes": "Customer reports duplicate debit.",
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
  "agentNotes": null,
  "createdAt": "2026-06-22T09:00:01.000Z",
  "updatedAt": "2026-06-22T09:00:01.000Z"
}
```

---

## GET_REFERENCE_DATA

Returns supported dropdown and display values for the dispute capture form.

**Function signature:**

```ts
getReferenceData(): ReferenceDataResponse
```

**Request body:**
- None

**Success response:**
- success — `true`
- data.paymentTypes — supported payment types
- data.issueCategories — supported issue categories
- data.transactionStatuses — supported transaction statuses
- data.casePriorities — supported priority values
- data.recommendedActions — supported recommendation values
- data.destinationTeams — supported referral destination teams

**Error responses:**
- None expected for static mock data

**Example:**

Request:
```json
{}
```

Response:
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

---

## LIST_MOCK_CUSTOMERS

Returns mock customers available for the prototype.

**Function signature:**

```ts
listMockCustomers(): CustomersResponse
```

**Request body:**
- None

**Success response:**
- success — `true`
- data.customers — array of mock customers

**Error responses:**
- None expected for static mock data

**Example:**

Request:
```json
{}
```

Response:
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

---

## LIST_CUSTOMER_TRANSACTIONS

Returns mock transactions for a selected customer.

**Function signature:**

```ts
listCustomerTransactions(customerId: string): TransactionsResponse
```

**Request body:**
- customerId (string, required) — mock customer identifier

**Success response:**
- success — `true`
- data.transactions — array of mock transactions for the selected customer

**Error responses:**
- VALIDATION_ERROR — customerId is missing
- NOT_FOUND — customerId does not match a mock customer

**Example:**

Request:
```json
{
  "customerId": "CUST-001"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "transactionId": "TXN-001",
        "customerId": "CUST-001",
        "paymentType": "EFT",
        "amount": 1250.00,
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

---

## CREATE_DISPUTE_AND_TRIAGE

Creates a dispute record using mock persistence, evaluates it through the rules engine, and returns the triage result.

**Function signature:**

```ts
createDisputeAndTriage(input: DisputeInput): CreateDisputeResponse
```

**Request body:**
- customerId (string, optional) — mock customer identifier
- transactionId (string, optional) — mock transaction identifier
- paymentType (PaymentType, required) — `CARD_PAYMENT`, `EFT`, or `INTERNAL_TRANSFER`
- issueCategory (IssueCategory, required) — supported issue category
- transactionStatus (TransactionStatus, optional) — known transaction status; use `UNKNOWN` if unavailable
- amount (number, required) — disputed amount in ZAR; must be greater than zero
- disputeDate (string, required) — ISO timestamp; must not be in the future
- transactionReference (string, required) — transaction reference
- notes (string, optional) — operational notes

**Success response:**
- success — `true`
- data.dispute — created dispute case
- data.triageResult — recommendation result

**Error responses:**
- VALIDATION_ERROR — required fields missing or invalid
- PROCESSING_ERROR — recommendation could not be generated

**Example:**

Request:
```json
{
  "customerId": "CUST-001",
  "transactionId": "TXN-001",
  "paymentType": "EFT",
  "issueCategory": "DUPLICATE_DEBIT",
  "transactionStatus": "POSTED",
  "amount": 1250.00,
  "disputeDate": "2026-06-22T09:00:00.000Z",
  "transactionReference": "INV-8871",
  "notes": "Customer reports duplicate debit."
}
```

Response:
```json
{
  "success": true,
  "data": {
    "dispute": {
      "disputeId": "DISP-001",
      "customerId": "CUST-001",
      "transactionId": "TXN-001",
      "paymentType": "EFT",
      "issueCategory": "DUPLICATE_DEBIT",
      "amount": 1250.00,
      "disputeDate": "2026-06-22T09:00:00.000Z",
      "transactionReference": "INV-8871",
      "ageDays": 0,
      "ageIndicator": "NEW",
      "status": "CAPTURED",
      "recommendedAction": "RESOLVE_IMMEDIATELY",
      "priority": "LOW",
      "triageRationale": "The dispute is a recent duplicate debit with a posted transaction, so it can be resolved immediately.",
      "agentOverride": false,
      "agentNotes": null,
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

---

## LIST_DISPUTES

Returns disputes captured during the current session.

**Function signature:**

```ts
listDisputes(filters?: DisputeFilters): DisputeListResponse
```

**Request body:**
- filters.status (CaseStatus, optional) — filter by case status
- filters.priority (CasePriority, optional) — filter by priority
- filters.recommendedAction (RecommendedAction, optional) — filter by recommended action
- filters.paymentType (PaymentType, optional) — filter by payment type

**Success response:**
- success — `true`
- data.disputes — array of dispute summaries
- data.total — count of returned disputes

**Error responses:**
- VALIDATION_ERROR — unsupported filter value

**Example:**

Request:
```json
{
  "filters": {
    "priority": "HIGH"
  }
}
```

Response:
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
        "amount": 62000.00,
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

---

## GET_DISPUTE_DETAIL

Returns a single dispute case with original input, recommendation, rationale, routing decision, and override details.

**Function signature:**

```ts
getDisputeDetail(disputeId: string): DisputeDetailResponse
```

**Request body:**
- disputeId (string, required) — unique dispute ID

**Success response:**
- success — `true`
- data.dispute — full dispute case detail

**Error responses:**
- VALIDATION_ERROR — disputeId is missing
- NOT_FOUND — disputeId does not match a captured dispute

**Example:**

Request:
```json
{
  "disputeId": "DISP-001"
}
```

Response:
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
      "amount": 1250.00,
      "disputeDate": "2026-06-22T09:00:00.000Z",
      "transactionReference": "INV-8871",
      "ageDays": 0,
      "ageIndicator": "NEW",
      "status": "CAPTURED",
      "notes": "Customer reports duplicate debit.",
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
      "agentNotes": null,
      "createdAt": "2026-06-22T09:00:01.000Z",
      "updatedAt": "2026-06-22T09:00:01.000Z"
    }
  }
}
```

---

## UPDATE_DISPUTE_OUTCOME

Records the operations user action after the recommendation is displayed.

This contract supports accepting or overriding the recommendation.

**Function signature:**

```ts
updateDisputeOutcome(disputeId: string, input: UpdateDisputeOutcomeInput): UpdateDisputeOutcomeResponse
```

**Request body:**
- disputeId (string, required) — unique dispute ID
- selectedAction (RecommendedAction, required) — user-selected action
- destinationTeam (DestinationTeam, optional) — required when selectedAction is `REFER_TO_ANOTHER_TEAM`
- overrideReason (string, optional) — required when selectedAction differs from the original recommendation
- agentNotes (string, optional) — additional notes captured by the operations user

**Success response:**
- success — `true`
- data.dispute — updated dispute case

**Error responses:**
- VALIDATION_ERROR — disputeId missing, selectedAction invalid, destinationTeam missing for referral, or overrideReason missing when overriding
- NOT_FOUND — disputeId does not match a captured dispute

**Example:**

Request:
```json
{
  "disputeId": "DISP-001",
  "selectedAction": "INVESTIGATE",
  "overrideReason": "Customer provided additional information that requires manual review.",
  "agentNotes": "Route to investigations queue."
}
```

Response:
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
      "agentNotes": "Route to investigations queue.",
      "overrideReason": "Customer provided additional information that requires manual review.",
      "updatedAt": "2026-06-22T09:15:00.000Z"
    }
  }
}
```

---

## Validation Rules

- paymentType is required.
- paymentType must be `CARD_PAYMENT`, `EFT`, or `INTERNAL_TRANSFER`.
- issueCategory is required.
- issueCategory must be `DUPLICATE_DEBIT`, `FAILED_TRANSFER`, `MISSING_PAYMENT`, or `CARD_TRANSACTION_DISPUTE`.
- dispute amount is required.
- dispute amount must be greater than zero.
- dispute date is required.
- dispute date must not be in the future.
- transaction reference is required.
- transactionStatus must be one of the supported values when supplied.
- If transaction status is not available, use `UNKNOWN`.
- If selectedAction differs from recommendedAction, overrideReason is required.
- If selectedAction is `REFER_TO_ANOTHER_TEAM`, destinationTeam is required.

---

## Rules Contract

The rules engine shall return one final recommended action for each dispute.

The following business rules must be represented:

| Rule ID | Condition | Recommended Action | Priority |
|---|---|---|---|
| BR-001 | issueCategory = DUPLICATE_DEBIT and transactionStatus = POSTED and dispute age is within immediate-resolution threshold | RESOLVE_IMMEDIATELY | LOW |
| BR-002 | issueCategory = FAILED_TRANSFER and transactionStatus = PENDING | INVESTIGATE | MEDIUM |
| BR-003 | issueCategory = MISSING_PAYMENT and transactionStatus = UNKNOWN | INVESTIGATE | MEDIUM |
| BR-004 | paymentType = CARD_PAYMENT and issueCategory = CARD_TRANSACTION_DISPUTE | REFER_TO_ANOTHER_TEAM | MEDIUM |
| BR-005 | dispute amount exceeds escalation threshold | ESCALATE | HIGH |
| BR-006 | dispute age exceeds overdue threshold | ESCALATE | HIGH |
| BR-007 | no specific rule is matched | INVESTIGATE | LOW |

If more than one rule applies, the configured highest-precedence rule determines the final recommendation. Escalation rules take precedence over investigation and referral rules.

---

## Open Alignment Notes

These items should be confirmed by the team if time allows:

1. The architecture says no HTTP API. This document therefore specifies module contracts. If the team decides to add a backend, convert these contracts into REST endpoints.
2. The architecture uses `COMPLETED`; the requirements use `POSTED`. This spec uses `POSTED` as canonical.
3. The architecture mentions `CRITICAL`; the requirements use only LOW, MEDIUM, and HIGH. This spec maps critical cases to HIGH.
4. The architecture includes extra issue categories. This spec limits the MVP to the issue categories in the requirements.
