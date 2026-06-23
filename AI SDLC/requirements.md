# Requirements (EARS Format) — Intelligent Triage of Customer Payment Disputes

## Document Control
- **Document:** `docs/requirements.md`
- **Use case:** Intelligent Triage of Customer Payment Disputes
- **Audience:** Feature Analysts, Quality Engineers, API Designers, UI/UX Designers, Architects, Kiro/Harness Engineers
- **Format:** EARS requirements with stable requirement IDs
- **Implementation stack:** React + Vite frontend, Node.js + Express backend, SQLite via Prisma, Tailwind CSS, Vitest, Playwright, npm workspaces
- **Decisioning approach:** Transparent rules-based logic only. No AI or machine learning decisioning.

---

## 1. Purpose

This document defines testable requirements for a lightweight internal prototype that helps a banking operations user capture a customer payment dispute and receive a recommended next action based on deterministic business rules.

The prototype answers one focused question:

> Given this payment dispute, what is the most appropriate next step right now?

---

## 2. Scope

### 2.1 In Scope
- Capture customer, transaction, and dispute context using mock data.
- Support a limited set of payment types and issue categories.
- Validate required dispute input before triage.
- Apply transparent business rules using amount, age, payment type, issue category, and transaction status.
- Return exactly one recommended next action.
- Explain why the recommendation was made using fired rule IDs and plain-language rationale.
- Allow an operations user to accept or override the recommendation.
- Display captured cases in a session/demo case queue backed by SQLite mock persistence.
- Provide deterministic, testable API endpoints for frontend/backend integration.

### 2.2 Out of Scope
- Real core banking, card-processing, fraud, compliance, CRM, case-management, or notification integrations.
- Customer-facing dispute journeys.
- Authentication, role-based authorisation, and production audit controls.
- AI or machine-learning based decisioning.
- Full end-to-end dispute lifecycle management.
- Handling real customer data or real payment data.

---

## 3. Actors

- **Operations User** — captures disputes, reviews recommendations, accepts or overrides outcomes.
- **Supervisor/User with escalation authority** — represented by the `SUPERVISOR_REVIEW` routing destination only; no separate login or role model is implemented.
- **System** — validates input, persists mock cases, applies deterministic rules, and returns recommendations.

---

## 4. Canonical Values

These values are mandatory across requirements, API, UI, tests, architecture, Prisma seed data, and Kiro specs.

### PaymentType
- `CARD_PAYMENT`
- `EFT`
- `INTERNAL_TRANSFER`

### IssueCategory
- `DUPLICATE_DEBIT`
- `FAILED_TRANSFER`
- `MISSING_PAYMENT`
- `CARD_TRANSACTION_DISPUTE`

### TransactionStatus
- `POSTED`
- `PENDING`
- `FAILED`
- `REVERSED`
- `UNKNOWN`

### AgeIndicator
- `NEW`
- `AGING`
- `OVERDUE`

### CasePriority
- `LOW`
- `MEDIUM`
- `HIGH`

### RecommendedAction
- `RESOLVE_IMMEDIATELY`
- `INVESTIGATE`
- `ESCALATE`
- `REFER_TO_ANOTHER_TEAM`

### CaseStatus
- `CAPTURED`
- `IN_PROGRESS`
- `ESCALATED`
- `RESOLVED`
- `REFERRED`

### DestinationTeam
- `CARD_DISPUTES`
- `PAYMENTS_OPERATIONS`
- `INVESTIGATIONS`
- `SUPERVISOR_REVIEW`

---

## 5. Configured Thresholds

| Threshold | Value | Applies To |
|---|---:|---|
| Immediate-resolution age threshold | `ageDays <= 7` | BR-001 |
| Escalation amount threshold | `amount > 50000` ZAR | BR-005 |
| Overdue age threshold | `ageDays > 30` | BR-006 |

---

## 6. EARS Requirements

### 6.1 Application Shell and Navigation

- **REQ-001:** When an operations user opens the application, the system shall display the application title `Payment Dispute Triage`, primary navigation, and a prototype notice stating that only mock data is used.
- **REQ-002:** When an operations user selects `Capture Dispute`, the system shall display the dispute capture screen.
- **REQ-003:** When an operations user selects `Case Queue`, the system shall display the case queue screen.
- **REQ-004:** The system shall make the active navigation item visually identifiable without relying on colour alone.

### 6.2 Dispute Capture

- **REQ-005:** When an operations user opens the dispute capture screen, the system shall display fields for customer reference, transaction reference, payment type, issue category, transaction status, dispute amount, dispute date, and notes.
- **REQ-006:** The system shall require payment type, issue category, dispute amount, dispute date, and transaction reference before a dispute can be submitted.
- **REQ-007:** If a required field is missing, then the system shall reject the submission and identify each missing field.
- **REQ-008:** If the dispute amount is zero or less, then the system shall reject the submission and display an error indicating that the amount must be greater than zero.
- **REQ-009:** If the dispute date is in the future, then the system shall reject the submission and display an error indicating that the dispute date cannot be in the future.
- **REQ-010:** If an enum value is not supported, then the system shall reject the submission and display the supported values for that field.
- **REQ-011:** When a valid dispute is submitted, the system shall create a dispute record with a unique dispute ID.
- **REQ-012:** When a valid dispute is submitted, the system shall set the initial case status to `CAPTURED`.
- **REQ-013:** When a valid dispute is submitted, the system shall persist the dispute using SQLite mock persistence through Prisma.
- **REQ-014:** While a dispute submission is being processed, the system shall display a loading state and prevent duplicate submissions.
- **REQ-015:** If triage processing fails, then the system shall display an error state and preserve the user-entered form data.

### 6.3 Mock Reference Data

- **REQ-016:** The system shall provide reference data for supported payment types, issue categories, transaction statuses, case priorities, recommended actions, and destination teams.
- **REQ-017:** The system shall support the payment types `CARD_PAYMENT`, `EFT`, and `INTERNAL_TRANSFER`.
- **REQ-018:** The system shall support the issue categories `DUPLICATE_DEBIT`, `FAILED_TRANSFER`, `MISSING_PAYMENT`, and `CARD_TRANSACTION_DISPUTE`.
- **REQ-019:** The system shall support the transaction statuses `POSTED`, `PENDING`, `FAILED`, `REVERSED`, and `UNKNOWN`.
- **REQ-020:** When an operations user selects a mock customer, the system shall display the mock customer summary and retrieve that customer's mock transactions.
- **REQ-021:** When an operations user selects a mock transaction, the system shall pre-populate the payment type, transaction status, amount, and transaction reference where available.
- **REQ-022:** When an operations user edits a pre-populated field, the system shall use the user-entered value for the submitted dispute.

### 6.4 Case Assessment Inputs

- **REQ-023:** When a dispute is submitted, the system shall calculate `ageDays` as whole calendar days between `disputeDate` and the current system date.
- **REQ-024:** The system shall classify disputes with `ageDays` from 0 to 7 inclusive as `NEW`.
- **REQ-025:** The system shall classify disputes with `ageDays` from 8 to 30 inclusive as `AGING`.
- **REQ-026:** The system shall classify disputes with `ageDays` greater than 30 as `OVERDUE`.
- **REQ-027:** The system shall classify case priority as one of `LOW`, `MEDIUM`, or `HIGH`.
- **REQ-028:** Where transaction status is unavailable, the system shall use `UNKNOWN` as the transaction status for rules evaluation.

### 6.5 Rules-Based Recommendation Engine

- **REQ-029:** When a valid dispute is submitted, the system shall evaluate the dispute against the configured business rules BR-001 through BR-007.
- **REQ-030:** The system shall produce exactly one final recommended next action for each valid dispute.
- **REQ-031:** The system shall support the recommended next actions `RESOLVE_IMMEDIATELY`, `INVESTIGATE`, `ESCALATE`, and `REFER_TO_ANOTHER_TEAM`.
- **REQ-032:** The system shall return the rule identifiers that fired during evaluation.
- **REQ-033:** The system shall return a plain-language rationale explaining the recommended next action.
- **REQ-034:** If no specific business rule from BR-001 through BR-006 matches, then the system shall apply BR-007 and recommend `INVESTIGATE` with priority `LOW`.
- **REQ-035:** If more than one rule applies, then the system shall select the final recommendation using the configured precedence order.
- **REQ-036:** The system shall expose the configured business rules and thresholds in a read-only rules reference response or static frontend configuration.

### 6.6 Business Rules Catalogue

- **REQ-037:** When the issue category is `DUPLICATE_DEBIT`, the transaction status is `POSTED`, and `ageDays <= 7`, the system shall apply `BR-001` and recommend `RESOLVE_IMMEDIATELY` with priority `LOW`.
- **REQ-038:** When the issue category is `FAILED_TRANSFER` and the transaction status is `PENDING`, the system shall apply `BR-002` and recommend `INVESTIGATE` with priority `MEDIUM`.
- **REQ-039:** When the issue category is `MISSING_PAYMENT` and the transaction status is `UNKNOWN`, the system shall apply `BR-003` and recommend `INVESTIGATE` with priority `MEDIUM`.
- **REQ-040:** When the payment type is `CARD_PAYMENT` and the issue category is `CARD_TRANSACTION_DISPUTE`, the system shall apply `BR-004` and recommend `REFER_TO_ANOTHER_TEAM` with priority `MEDIUM` and destination team `CARD_DISPUTES`.
- **REQ-041:** When the dispute amount is greater than `50000`, the system shall apply `BR-005` and recommend `ESCALATE` with priority `HIGH`.
- **REQ-042:** When `ageDays > 30`, the system shall apply `BR-006` and recommend `ESCALATE` with priority `HIGH`.
- **REQ-043:** When no specific rule from BR-001 through BR-006 applies, the system shall apply `BR-007` and recommend `INVESTIGATE` with priority `LOW`.

### 6.7 Rule Precedence

- **REQ-044:** If an escalation rule and a non-escalation rule both apply, then the system shall use `ESCALATE` as the final recommendation.
- **REQ-045:** If BR-005 and BR-006 both apply, then the system shall include both fired rules and use `ESCALATE` as the final recommendation.
- **REQ-046:** If BR-004 applies without an escalation rule, then the system shall use `REFER_TO_ANOTHER_TEAM` as the final recommendation.
- **REQ-047:** While multiple rules fire, the system shall return all fired rules even when only one final recommendation is selected.

### 6.8 Recommendation Review and Outcome

- **REQ-048:** When a recommendation is generated, the system shall display the recommended action, priority, age indicator, fired rules, and rationale on a review screen.
- **REQ-049:** When the recommended next action is `REFER_TO_ANOTHER_TEAM`, the system shall display the destination team.
- **REQ-050:** When the recommended next action is `ESCALATE`, the system shall display the escalation reason.
- **REQ-051:** When an operations user accepts the recommendation, the system shall update the case status according to the selected action.
- **REQ-052:** If an operations user selects an action different from the recommended action, then the system shall require an override reason.
- **REQ-053:** When an operations user overrides the recommendation, the system shall record the original recommendation, selected action, override reason, and override indicator.
- **REQ-054:** If an operations user selects `REFER_TO_ANOTHER_TEAM`, then the system shall require a destination team before saving the outcome.
- **REQ-055:** When the selected action is `RESOLVE_IMMEDIATELY`, the system shall set the case status to `RESOLVED`.
- **REQ-056:** When the selected action is `INVESTIGATE`, the system shall set the case status to `IN_PROGRESS`.
- **REQ-057:** When the selected action is `ESCALATE`, the system shall set the case status to `ESCALATED`.
- **REQ-058:** When the selected action is `REFER_TO_ANOTHER_TEAM`, the system shall set the case status to `REFERRED`.

### 6.9 Case Queue and Case Detail

- **REQ-059:** When an operations user opens the case queue, the system shall display disputes captured in the prototype database.
- **REQ-060:** The system shall sort the case queue by newest created date first by default.
- **REQ-061:** The system shall allow the case queue to be filtered by status, priority, recommended action, and payment type.
- **REQ-062:** If no disputes have been captured, then the system shall display an empty queue message.
- **REQ-063:** If filters return no results, then the system shall display a filtered empty state.
- **REQ-064:** When an operations user selects a case from the queue, the system shall display the case detail screen for that dispute.
- **REQ-065:** When a dispute case does not exist, the system shall return and display a not-found state.
- **REQ-066:** The system shall visually distinguish `HIGH` priority cases using text plus visual treatment, not colour alone.

### 6.10 API and Error Behaviour

- **REQ-067:** The system shall expose REST endpoints under `/api` for reference data, mock customers, mock transactions, disputes, dispute detail, and dispute outcome updates.
- **REQ-068:** The system shall return successful API responses using the shape `{ success: true, data: ... }`.
- **REQ-069:** The system shall return failed API responses using the shape `{ success: false, message: string, details?: FieldError[] }`.
- **REQ-070:** If a requested mock customer, transaction, or dispute does not exist, then the system shall return a not-found error.
- **REQ-071:** If a request body or query filter contains an unsupported value, then the system shall return a validation error.

### 6.11 Non-Functional Requirements

- **REQ-072:** The system shall return a recommendation within 2 seconds for a valid dispute using the prototype dataset.
- **REQ-073:** The system shall use mock data only and shall not connect to live banking platforms.
- **REQ-074:** The system shall present all recommendations in clear, plain language suitable for operations users.
- **REQ-075:** The system shall ensure every recommendation can be traced to at least one explicit rule outcome.
- **REQ-076:** The system shall use TypeScript strict mode across frontend, backend, and shared workspace code.
- **REQ-077:** The system shall use Tailwind CSS for prototype styling.
- **REQ-078:** The system shall include Vitest unit and API tests for validation, rules, and service behaviour.
- **REQ-079:** The system shall include Playwright end-to-end tests for the capture, triage, outcome, and queue journey.
- **REQ-080:** The system shall avoid storing or displaying real customer, account, card, or transaction data.

---

## 7. Business Rules Contract

| Rule ID | Condition | Recommended Action | Priority | Destination / Reason |
|---|---|---|---|---|
| BR-001 | `issueCategory = DUPLICATE_DEBIT` and `transactionStatus = POSTED` and `ageDays <= 7` | `RESOLVE_IMMEDIATELY` | `LOW` | Recent posted duplicate debit can be resolved immediately. |
| BR-002 | `issueCategory = FAILED_TRANSFER` and `transactionStatus = PENDING` | `INVESTIGATE` | `MEDIUM` | Pending failed transfer requires investigation. |
| BR-003 | `issueCategory = MISSING_PAYMENT` and `transactionStatus = UNKNOWN` | `INVESTIGATE` | `MEDIUM` | Unknown transaction status requires investigation. |
| BR-004 | `paymentType = CARD_PAYMENT` and `issueCategory = CARD_TRANSACTION_DISPUTE` | `REFER_TO_ANOTHER_TEAM` | `MEDIUM` | `CARD_DISPUTES` |
| BR-005 | `amount > 50000` | `ESCALATE` | `HIGH` | High-value dispute exceeds threshold. |
| BR-006 | `ageDays > 30` | `ESCALATE` | `HIGH` | Dispute is overdue. |
| BR-007 | No BR-001 to BR-006 match | `INVESTIGATE` | `LOW` | Default investigation fallback. |

### Precedence Order

1. Escalation rules: BR-005, BR-006
2. Referral rule: BR-004
3. Investigation rules: BR-002, BR-003
4. Immediate resolution rule: BR-001
5. Fallback rule: BR-007

All matching rules must be returned in `firedRules`. The final recommendation must follow the precedence order above.

---

## 8. Traceability Summary

Detailed requirement-to-test traceability is maintained in `docs/test-cases.md`. Every requirement above has at least one corresponding acceptance criterion, API test, unit test, UI test, or E2E test.
