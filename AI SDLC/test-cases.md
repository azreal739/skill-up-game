# Test Cases — Intelligent Triage of Customer Payment Disputes

## 1. Document Context

This document defines acceptance criteria, unit tests, API tests, UI tests, and end-to-end tests for the Payment Dispute Triage prototype.

The tests align to:

- `docs/requirements.md`
- `docs/api-spec.md`
- `docs/ui-spec.md`
- `docs/architecture.md`

## 2. Test Conventions

- **Unit/API test runner:** Vitest
- **E2E runner:** Playwright
- **API style:** HTTP/JSON REST endpoints under `/api`
- **Response shape:** `{ success: boolean, data?: unknown, message?: string, details?: FieldError[] }`
- **Date format:** ISO 8601 strings
- **Currency:** ZAR only
- **Age derivation:** `ageDays` is computed from `disputeDate` relative to the current system date.
- **Mock data:** Seeded SQLite data via Prisma only. No real banking data.

## 3. Configured Thresholds

| Threshold | Value | Used By |
|---|---:|---|
| Immediate-resolution age | `<= 7 days` | BR-001 |
| Escalation amount | `> 50000 ZAR` | BR-005 |
| Overdue age | `> 30 days` | BR-006 |

---

## 4. Acceptance Criteria by Feature

### AC-001: Capture dispute and receive recommendation
- **GIVEN** an operations user is on the Capture Dispute screen
- **WHEN** they submit a valid dispute
- **THEN** the backend creates a dispute record
- **AND** the backend returns a triage recommendation
- **AND** the UI displays the recommended action, priority, age indicator, fired rules, and rationale.

### AC-002: Invalid disputes are rejected
- **GIVEN** an operations user submits a dispute with missing or invalid required fields
- **WHEN** the API validates the request
- **THEN** the API returns HTTP 400
- **AND** the UI displays field-level validation errors
- **AND** user-entered data is preserved.

### AC-003: User can confirm recommendation
- **GIVEN** a dispute has a generated recommendation
- **WHEN** the operations user accepts the recommendation and confirms the outcome
- **THEN** the backend updates the case status according to the selected action
- **AND** the UI displays the updated case status.

### AC-004: User can override recommendation with reason
- **GIVEN** a dispute has a generated recommendation
- **WHEN** the operations user selects a different action
- **THEN** the UI requires an override reason
- **AND** the backend records the override details.

### AC-005: User can review queue and case detail
- **GIVEN** disputes exist in the prototype database
- **WHEN** the operations user opens the Case Queue
- **THEN** disputes are shown newest first
- **AND** selecting a dispute opens the Case Detail screen.

---

## 5. Rules Engine Unit Tests

### TC-001: BR-001 duplicate debit with posted status resolves immediately
- **GIVEN** a valid normalized dispute with `paymentType="EFT"`, `issueCategory="DUPLICATE_DEBIT"`, `transactionStatus="POSTED"`, `amount=1250.00`, and `ageDays=2`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `RESOLVE_IMMEDIATELY`
- **AND** `priority` equals `LOW`
- **AND** `firedRules` contains `BR-001`.

### TC-002: BR-001 boundary does not trigger beyond 7 days
- **GIVEN** a duplicate debit with `transactionStatus="POSTED"` and `ageDays=8`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `firedRules` does not contain `BR-001`.

### TC-003: BR-002 failed transfer with pending status triggers investigation
- **GIVEN** a dispute with `issueCategory="FAILED_TRANSFER"` and `transactionStatus="PENDING"`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `INVESTIGATE`
- **AND** `priority` equals `MEDIUM`
- **AND** `firedRules` contains `BR-002`.

### TC-004: BR-003 missing payment with unknown status triggers investigation
- **GIVEN** a dispute with `issueCategory="MISSING_PAYMENT"` and `transactionStatus="UNKNOWN"`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `INVESTIGATE`
- **AND** `priority` equals `MEDIUM`
- **AND** `firedRules` contains `BR-003`.

### TC-005: BR-004 card transaction dispute refers to card disputes team
- **GIVEN** a dispute with `paymentType="CARD_PAYMENT"` and `issueCategory="CARD_TRANSACTION_DISPUTE"`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `REFER_TO_ANOTHER_TEAM`
- **AND** `priority` equals `MEDIUM`
- **AND** `destinationTeam` equals `CARD_DISPUTES`
- **AND** `firedRules` contains `BR-004`.

### TC-006: BR-005 high-value dispute triggers escalation
- **GIVEN** a dispute with `amount=50000.01`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `ESCALATE`
- **AND** `priority` equals `HIGH`
- **AND** `escalationReason` is populated
- **AND** `firedRules` contains `BR-005`.

### TC-007: BR-005 does not trigger at exactly threshold
- **GIVEN** a dispute with `amount=50000.00`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `firedRules` does not contain `BR-005`.

### TC-008: BR-006 overdue dispute triggers escalation
- **GIVEN** a dispute with `ageDays=31`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `ESCALATE`
- **AND** `priority` equals `HIGH`
- **AND** `ageIndicator` equals `OVERDUE`
- **AND** `firedRules` contains `BR-006`.

### TC-009: BR-006 does not trigger at exactly 30 days
- **GIVEN** a dispute with `ageDays=30`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `firedRules` does not contain `BR-006`.

### TC-010: BR-007 fallback investigation applies when no specific rule matches
- **GIVEN** a dispute with `paymentType="INTERNAL_TRANSFER"`, `issueCategory="MISSING_PAYMENT"`, `transactionStatus="POSTED"`, `amount=500.00`, and `ageDays=3`
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `INVESTIGATE`
- **AND** `priority` equals `LOW`
- **AND** `firedRules` contains `BR-007`.

### TC-011: Escalation takes precedence over investigation
- **GIVEN** a dispute satisfying BR-002 and BR-005
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `ESCALATE`
- **AND** `priority` equals `HIGH`
- **AND** `firedRules` contains both `BR-002` and `BR-005`.

### TC-012: Escalation takes precedence over referral
- **GIVEN** a dispute satisfying BR-004 and BR-005
- **WHEN** the rules engine evaluates the dispute
- **THEN** `recommendedAction` equals `ESCALATE`
- **AND** `priority` equals `HIGH`
- **AND** `firedRules` contains both `BR-004` and `BR-005`.

### TC-013: Multiple fired rules are all reported
- **GIVEN** a dispute satisfying more than one rule
- **WHEN** the rules engine evaluates the dispute
- **THEN** all matching fired rules are returned
- **AND** exactly one final recommendation is returned.

### TC-014: Age indicator is NEW for 0 to 7 days
- **GIVEN** `ageDays=7`
- **WHEN** age indicator is derived
- **THEN** the result is `NEW`.

### TC-015: Age indicator is AGING for 8 to 30 days
- **GIVEN** `ageDays=8` and `ageDays=30`
- **WHEN** age indicator is derived
- **THEN** the result is `AGING`.

### TC-016: Age indicator is OVERDUE above 30 days
- **GIVEN** `ageDays=31`
- **WHEN** age indicator is derived
- **THEN** the result is `OVERDUE`.

---

## 6. API Tests — Reference Data and Mock Data

### TC-017: GET /api/health returns ok
- **GIVEN** the backend is running
- **WHEN** `GET /api/health` is called
- **THEN** HTTP 200 is returned
- **AND** `success` equals `true`.

### TC-018: GET /api/reference-data returns canonical values
- **GIVEN** reference data is configured
- **WHEN** `GET /api/reference-data` is called
- **THEN** HTTP 200 is returned
- **AND** payment types include exactly `CARD_PAYMENT`, `EFT`, and `INTERNAL_TRANSFER`
- **AND** recommended actions include exactly the four canonical actions.

### TC-019: GET /api/customers returns seeded mock customers
- **GIVEN** mock customers are seeded
- **WHEN** `GET /api/customers` is called
- **THEN** HTTP 200 is returned
- **AND** `data.customers` contains at least one customer
- **AND** no real customer data is returned.

### TC-020: GET /api/customers/:customerId/transactions returns transactions
- **GIVEN** customer `CUST-001` exists with transactions
- **WHEN** `GET /api/customers/CUST-001/transactions` is called
- **THEN** HTTP 200 is returned
- **AND** all returned transactions have `customerId="CUST-001"`.

### TC-021: GET /api/customers/:customerId/transactions returns not found
- **GIVEN** customer `CUST-999` does not exist
- **WHEN** `GET /api/customers/CUST-999/transactions` is called
- **THEN** HTTP 404 is returned
- **AND** `success` equals `false`.

---

## 7. API Tests — Create Dispute and Triage

### TC-022: POST /api/disputes creates valid dispute and triage result
- **GIVEN** a valid dispute request body
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 201 is returned
- **AND** `success` equals `true`
- **AND** `data.dispute.disputeId` is populated
- **AND** `data.dispute.status` equals `CAPTURED`
- **AND** `data.triageResult.recommendedAction` is populated.

### TC-023: Missing payment type returns validation error
- **GIVEN** a dispute request without `paymentType`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** `details` contains `field="paymentType"`.

### TC-024: Unsupported payment type returns validation error
- **GIVEN** a dispute request with `paymentType="CRYPTO"`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** the error message indicates supported values.

### TC-025: Missing issue category returns validation error
- **GIVEN** a dispute request without `issueCategory`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** `details` contains `field="issueCategory"`.

### TC-026: Unsupported issue category returns validation error
- **GIVEN** a dispute request with `issueCategory="CHARGEBACK"`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** the error message indicates supported values.

### TC-027: Missing amount returns validation error
- **GIVEN** a dispute request without `amount`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** `details` contains `field="amount"`.

### TC-028: Zero amount returns validation error
- **GIVEN** a dispute request with `amount=0`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** the message indicates amount must be greater than zero.

### TC-029: Negative amount returns validation error
- **GIVEN** a dispute request with `amount=-100`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** the message indicates amount must be greater than zero.

### TC-030: Missing dispute date returns validation error
- **GIVEN** a dispute request without `disputeDate`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** `details` contains `field="disputeDate"`.

### TC-031: Future dispute date returns validation error
- **GIVEN** a dispute request with `disputeDate` set to tomorrow
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** the message indicates dispute date cannot be in the future.

### TC-032: Missing transaction reference returns validation error
- **GIVEN** a dispute request without `transactionReference`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** `details` contains `field="transactionReference"`.

### TC-033: Unsupported transaction status returns validation error
- **GIVEN** a dispute request with `transactionStatus="CANCELLED"`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 400 is returned
- **AND** the error message indicates supported values.

### TC-034: Omitted transaction status defaults to UNKNOWN
- **GIVEN** a valid dispute request without `transactionStatus`
- **WHEN** `POST /api/disputes` is called
- **THEN** HTTP 201 is returned
- **AND** the stored dispute has `transactionStatus="UNKNOWN"`.

### TC-035: Dispute record receives unique IDs
- **GIVEN** two valid dispute requests
- **WHEN** each request is submitted to `POST /api/disputes`
- **THEN** each response has a different `disputeId`.

### TC-036: Dispute record includes timestamps
- **GIVEN** a valid dispute request
- **WHEN** `POST /api/disputes` is called
- **THEN** `createdAt` and `updatedAt` are valid ISO 8601 strings.

### TC-037: Recommendation response includes traceability
- **GIVEN** a valid dispute request
- **WHEN** `POST /api/disputes` is called
- **THEN** `triageResult.firedRules` contains at least one rule
- **AND** `triageResult.rationale` is non-empty plain language.

### TC-038: Recommendation returns within 2 seconds
- **GIVEN** a valid dispute request using seeded prototype data
- **WHEN** `POST /api/disputes` is called
- **THEN** the API responds within 2 seconds.

---

## 8. API Tests — Update Outcome

### TC-039: Accept resolve recommendation updates status to RESOLVED
- **GIVEN** a dispute exists with `recommendedAction="RESOLVE_IMMEDIATELY"`
- **WHEN** `PATCH /api/disputes/:disputeId/outcome` is called with `selectedAction="RESOLVE_IMMEDIATELY"`
- **THEN** HTTP 200 is returned
- **AND** `status` equals `RESOLVED`
- **AND** `agentOverride` equals `false`.

### TC-040: Accept investigate recommendation updates status to IN_PROGRESS
- **GIVEN** a dispute exists with `recommendedAction="INVESTIGATE"`
- **WHEN** the outcome is confirmed with `selectedAction="INVESTIGATE"`
- **THEN** `status` equals `IN_PROGRESS`.

### TC-041: Accept escalate recommendation updates status to ESCALATED
- **GIVEN** a dispute exists with `recommendedAction="ESCALATE"`
- **WHEN** the outcome is confirmed with `selectedAction="ESCALATE"`
- **THEN** `status` equals `ESCALATED`.

### TC-042: Accept referral recommendation updates status to REFERRED
- **GIVEN** a dispute exists with `recommendedAction="REFER_TO_ANOTHER_TEAM"`
- **WHEN** the outcome is confirmed with `selectedAction="REFER_TO_ANOTHER_TEAM"` and `destinationTeam="CARD_DISPUTES"`
- **THEN** `status` equals `REFERRED`.

### TC-043: Override requires override reason
- **GIVEN** a dispute exists with `recommendedAction="RESOLVE_IMMEDIATELY"`
- **WHEN** the outcome is submitted with `selectedAction="INVESTIGATE"` and no `overrideReason`
- **THEN** HTTP 400 is returned
- **AND** `details` contains `field="overrideReason"`.

### TC-044: Override records override details
- **GIVEN** a dispute exists with `recommendedAction="RESOLVE_IMMEDIATELY"`
- **WHEN** the outcome is submitted with `selectedAction="INVESTIGATE"` and `overrideReason="Customer provided new evidence."`
- **THEN** `agentOverride` equals `true`
- **AND** `overrideReason` is stored
- **AND** `selectedAction` equals `INVESTIGATE`.

### TC-045: Referral requires destination team
- **GIVEN** a dispute exists
- **WHEN** the outcome is submitted with `selectedAction="REFER_TO_ANOTHER_TEAM"` and no `destinationTeam`
- **THEN** HTTP 400 is returned
- **AND** `details` contains `field="destinationTeam"`.

### TC-046: Unsupported selected action returns validation error
- **GIVEN** a dispute exists
- **WHEN** the outcome is submitted with `selectedAction="CLOSE_CASE"`
- **THEN** HTTP 400 is returned.

### TC-047: Updating non-existent dispute returns 404
- **GIVEN** no dispute exists with `DISP-999`
- **WHEN** `PATCH /api/disputes/DISP-999/outcome` is called
- **THEN** HTTP 404 is returned
- **AND** `success` equals `false`.

---

## 9. API Tests — List and Detail

### TC-048: GET /api/disputes returns all disputes newest first
- **GIVEN** three disputes exist with different creation times
- **WHEN** `GET /api/disputes` is called
- **THEN** HTTP 200 is returned
- **AND** the newest dispute is first.

### TC-049: GET /api/disputes filters by priority
- **GIVEN** disputes exist with priorities `LOW`, `MEDIUM`, and `HIGH`
- **WHEN** `GET /api/disputes?priority=HIGH` is called
- **THEN** all returned disputes have `priority="HIGH"`.

### TC-050: GET /api/disputes filters by status
- **GIVEN** disputes exist with statuses `CAPTURED` and `RESOLVED`
- **WHEN** `GET /api/disputes?status=CAPTURED` is called
- **THEN** all returned disputes have `status="CAPTURED"`.

### TC-051: GET /api/disputes filters by recommended action
- **GIVEN** disputes exist with different recommended actions
- **WHEN** `GET /api/disputes?recommendedAction=ESCALATE` is called
- **THEN** all returned disputes have `recommendedAction="ESCALATE"`.

### TC-052: GET /api/disputes filters by payment type
- **GIVEN** disputes exist with different payment types
- **WHEN** `GET /api/disputes?paymentType=EFT` is called
- **THEN** all returned disputes have `paymentType="EFT"`.

### TC-053: GET /api/disputes rejects unsupported filter value
- **GIVEN** an unsupported filter value `priority=URGENT`
- **WHEN** `GET /api/disputes?priority=URGENT` is called
- **THEN** HTTP 400 is returned.

### TC-054: GET /api/disputes/:disputeId returns full detail
- **GIVEN** a dispute exists
- **WHEN** `GET /api/disputes/:disputeId` is called
- **THEN** HTTP 200 is returned
- **AND** the response includes original input, recommendation, fired rules, rationale, and outcome fields.

### TC-055: GET /api/disputes/:disputeId returns 404 for missing dispute
- **GIVEN** no dispute exists with `DISP-999`
- **WHEN** `GET /api/disputes/DISP-999` is called
- **THEN** HTTP 404 is returned.

### TC-056: GET /api/rules returns thresholds and BR-001 to BR-007
- **GIVEN** rules are configured
- **WHEN** `GET /api/rules` is called
- **THEN** HTTP 200 is returned
- **AND** the response includes all seven business rules
- **AND** the response includes configured thresholds.

---

## 10. UI and E2E Tests

### TC-057: Capture screen displays required fields
- **GIVEN** the user opens `/capture`
- **WHEN** the screen loads
- **THEN** fields for payment type, issue category, transaction status, amount, dispute date, transaction reference, and notes are visible.

### TC-058: Capture screen loads reference data and customers
- **GIVEN** the user opens `/capture`
- **WHEN** reference data and customers load
- **THEN** dropdowns contain canonical values
- **AND** mock customers are selectable.

### TC-059: Selecting a customer loads transactions
- **GIVEN** the user is on `/capture`
- **WHEN** they select a mock customer
- **THEN** the UI loads transactions for that customer.

### TC-060: Selecting a transaction pre-populates dispute fields
- **GIVEN** a customer transaction is available
- **WHEN** the user selects the transaction
- **THEN** payment type, transaction status, amount, and transaction reference are pre-populated.

### TC-061: Submit valid duplicate debit shows resolve recommendation
- **GIVEN** the user enters a valid recent duplicate debit with posted status
- **WHEN** they click `Submit for Triage`
- **THEN** the UI navigates to the result screen
- **AND** the recommendation banner shows `Resolve immediately`
- **AND** the fired rules list contains `BR-001`.

### TC-062: Submit invalid dispute shows field errors and preserves data
- **GIVEN** the user has entered notes and a transaction reference but omitted payment type
- **WHEN** they click `Submit for Triage`
- **THEN** the payment type error is shown
- **AND** the notes and transaction reference remain populated.

### TC-063: Recommendation screen requires override reason
- **GIVEN** the user is viewing a recommendation
- **WHEN** they select a different action and click `Confirm Outcome` without an override reason
- **THEN** the UI shows an override reason validation error.

### TC-064: Confirm recommendation updates case status
- **GIVEN** the user is viewing a recommendation
- **WHEN** they accept the recommendation and confirm outcome
- **THEN** a success message is shown
- **AND** the updated case status is displayed.

### TC-065: Case queue displays captured dispute
- **GIVEN** a dispute has been created
- **WHEN** the user opens `/queue`
- **THEN** the dispute appears in the case table.

### TC-066: Case queue filters high-priority cases
- **GIVEN** low and high priority disputes exist
- **WHEN** the user filters priority by `HIGH`
- **THEN** only high priority disputes are displayed.

### TC-067: Case detail displays full recommendation trace
- **GIVEN** the user opens a case detail screen
- **WHEN** the case loads
- **THEN** the original dispute details, recommended action, rationale, fired rules, and outcome fields are displayed.

### TC-068: Rules reference displays deterministic rules
- **GIVEN** the user opens `/rules`
- **WHEN** rules load
- **THEN** BR-001 through BR-007 are displayed
- **AND** the page explains that rules are deterministic.

### TC-069: High priority is not represented by colour alone
- **GIVEN** a high-priority case is shown in the result, queue, or detail screen
- **WHEN** the priority badge is rendered
- **THEN** it contains visible text `High` or `High priority`
- **AND** it uses an additional visual treatment such as icon, weight, or badge shape.

---

## 11. Non-Functional and Harness Readiness Tests

### TC-070: TypeScript strict mode is enabled
- **GIVEN** workspace TypeScript configuration exists
- **WHEN** `tsconfig` files are inspected
- **THEN** `strict` is enabled.

### TC-071: ESLint is configured
- **GIVEN** the repository has package configuration
- **WHEN** lint configuration is inspected
- **THEN** ESLint is configured for TypeScript frontend and backend code.

### TC-072: npm workspaces are configured
- **GIVEN** the root `package.json` exists
- **WHEN** it is inspected
- **THEN** workspaces include frontend, backend, and shared packages or apps.

### TC-073: Prisma schema supports API data model
- **GIVEN** `schema.prisma` exists
- **WHEN** it is inspected
- **THEN** it contains Customer, Transaction, and Dispute models with fields required by the API spec.

### TC-074: No real integrations are configured
- **GIVEN** environment and source code are inspected
- **WHEN** the project is searched for live banking integration configuration
- **THEN** no real core banking, card-processing, fraud, compliance, CRM, or case-management integration is present.

### TC-075: Kiro steering files reference spec documents
- **GIVEN** `.kiro/steering` exists
- **WHEN** steering files are inspected
- **THEN** they reference `#docs/requirements.md`, `#docs/api-spec.md`, `#docs/ui-spec.md`, `#docs/architecture.md`, and `#docs/test-cases.md`.

### TC-076: At least one Kiro spec is configured
- **GIVEN** `.kiro/specs` exists
- **WHEN** specs are inspected
- **THEN** at least one feature folder contains `requirements.md`, `design.md`, and `tasks.md`.

### TC-077: At least one Kiro hook is defined
- **GIVEN** `.kiro/hooks` exists
- **WHEN** hooks are inspected
- **THEN** at least one hook is defined for linting, testing, or file creation.

---

## 12. Requirement Traceability Matrix

| Requirement(s) | Covered By |
|---|---|
| REQ-001 to REQ-004 | TC-057, TC-069 |
| REQ-005 to REQ-015 | TC-022 to TC-038, TC-057, TC-062 |
| REQ-016 to REQ-022 | TC-018 to TC-021, TC-058 to TC-060 |
| REQ-023 to REQ-028 | TC-014 to TC-016, TC-034 |
| REQ-029 to REQ-036 | TC-001 to TC-013, TC-037, TC-056, TC-068 |
| REQ-037 to REQ-043 | TC-001 to TC-010 |
| REQ-044 to REQ-047 | TC-011 to TC-013 |
| REQ-048 to REQ-058 | TC-039 to TC-047, TC-061, TC-063, TC-064 |
| REQ-059 to REQ-066 | TC-048 to TC-055, TC-065 to TC-067, TC-069 |
| REQ-067 to REQ-071 | TC-017 to TC-056 |
| REQ-072 | TC-038 |
| REQ-073 | TC-019, TC-074 |
| REQ-074 to REQ-075 | TC-037, TC-056, TC-067, TC-068 |
| REQ-076 | TC-070 |
| REQ-077 | TC-057, TC-069 |
| REQ-078 | TC-001 to TC-056, TC-070 to TC-074 |
| REQ-079 | TC-057 to TC-069 |
| REQ-080 | TC-019, TC-074 |

---

## 13. Specification Consistency Checklist

| Check | Status | Evidence |
|---|---|---|
| Every requirement has a corresponding test case | Complete | Traceability matrix above. |
| Every API endpoint is referenced by at least one requirement | Complete | Endpoint-to-requirement mapping in `docs/api-spec.md`. |
| Every UI screen references the API endpoints it calls | Complete | Screen API usage sections in `docs/ui-spec.md`. |
| The data model supports all API endpoints | Complete | Prisma draft in `docs/architecture.md`. |
| Steering files reference spec docs via `#...` | To be completed in `.kiro/steering` | TC-075 defines expected check. |
| At least one Kiro spec is configured | To be completed in `.kiro/specs` | TC-076 defines expected check. |
| At least one hook is defined | To be completed in `.kiro/hooks` | TC-077 defines expected check. |
| TypeScript strict mode is enabled | To be verified in repo | TC-070 defines expected check. |
| ESLint is configured | To be verified in repo | TC-071 defines expected check. |
| All artefacts are Markdown/text | Complete | This spec pack is Markdown. |
