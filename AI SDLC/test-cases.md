# Automated Test Suite: Intelligent Triage of Customer Payment Disputes

This document establishes an executable-ready test suite for the banking operations triage prototype. Each test case isolates a single specific behavior, enforces strict quantifiable boundaries, and maps directly to the system constraints and mock rules engine framework.

## Test Cases

### Core Business Rules (EFT & Transfers)

**TC-001: Duplicate Debit Low Amount Resolution**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-001"`, `paymentType="EFT"`, `issueCategory="DUPLICATE_DEBIT"`, `transactionStatus="POSTED"`, `amount=250.00`, and `disputeAgeDays=3`
* **THEN** the system creates a dispute record with a unique ID
* **AND** returns `recommendation="RESOLVE_NOW"`
* **AND** returns `priority="LOW"`
* **AND** returns `matchedRule="RULE-DUPLICATE-LOW-AMOUNT"`

**TC-002: Duplicate Debit High Amount Investigation**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-002"`, `paymentType="EFT"`, `issueCategory="DUPLICATE_DEBIT"`, `transactionStatus="POSTED"`, `amount=7500.00`, and `disputeAgeDays=3`
* **THEN** the system returns `recommendation="INVESTIGATE"`
* **AND** returns `priority="HIGH"`
* **AND** returns `matchedRule="RULE-DUPLICATE-HIGH-AMOUNT"`

**TC-003: Failed Transfer Processing**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-003"`, `paymentType="EFT"`, `issueCategory="FAILED_TRANSFER"`, `transactionStatus="FAILED"`, `amount=100.00`, and `disputeAgeDays=1`
* **THEN** the system returns `recommendation="RESOLVE_NOW"`
* **AND** returns `reason="Transaction status is FAILED"`

**TC-004: Pending Transfer Under SLA**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-004"`, `paymentType="EFT"`, `issueCategory="FAILED_TRANSFER"`, `transactionStatus="PENDING"`, `amount=100.00`, and `disputeAgeDays=2`
* **THEN** the system returns `recommendation="INVESTIGATE"`
* **AND** returns `priority="LOW"`

**TC-005: Pending Transfer Beyond SLA**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-005"`, `paymentType="EFT"`, `issueCategory="FAILED_TRANSFER"`, `transactionStatus="PENDING"`, `amount=100.00`, and `disputeAgeDays=8`
* **THEN** the system returns `recommendation="INVESTIGATE"`
* **AND** returns `priority="MEDIUM"`

**TC-006: Missing Payment Posted Rule**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-006"`, `paymentType="EFT"`, `issueCategory="MISSING_PAYMENT"`, `transactionStatus="POSTED"`, `amount=500.00`, and `disputeAgeDays=4`
* **THEN** the system returns `recommendation="INVESTIGATE"`
* **AND** returns `matchedRule="RULE-MISSING-PAYMENT"`

---

### Card Disputes & SLA Rules

**TC-007: Card Dispute Within SLA**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-007"`, `paymentType="CARD"`, `issueCategory="UNRECOGNIZED_CHARGE"`, `transactionStatus="POSTED"`, `amount=150.00`, and `disputeAgeDays=10`
* **THEN** the system returns `recommendation="REFER"`
* **AND** returns `reason="Forwarded to Card Disputes Team"`

**TC-008: Card Dispute Outside SLA**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-008"`, `paymentType="CARD"`, `issueCategory="UNRECOGNIZED_CHARGE"`, `transactionStatus="POSTED"`, `amount=150.00`, and `disputeAgeDays=31`
* **THEN** the system returns `recommendation="ESCALATE"`
* **AND** returns `priority="HIGH"`
* **AND** returns `matchedRule="RULE-CARD-AGED"`

---

### Internal Transfers Logic

**TC-009: Internal Transfer Discrepancy**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-009"`, `paymentType="INTERNAL_TRANSFER"`, `issueCategory="INCORRECT_AMOUNT"`, `transactionStatus="POSTED"`, `amount=1200.00`, and `disputeAgeDays=1`
* **THEN** the system returns `recommendation="INVESTIGATE"`
* **AND** returns `priority="LOW"`

**TC-010: Internal Transfer Unassigned Status**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `customerReference="CUST-010"`, `paymentType="INTERNAL_TRANSFER"`, `issueCategory="MISSING_PAYMENT"`, `transactionStatus="UNKNOWN"`, `amount=50.00`, and `disputeAgeDays=5`
* **THEN** the system returns `recommendation="MANUAL_REVIEW"`

---

### Boundary & Rule Precedence Logic

**TC-011: Rule Conflict Resolution (Highest Severity Wins)**
* **GIVEN** a dispute record matches both a rule evaluating to `INVESTIGATE` and a rule evaluating to `ESCALATE`
* **WHEN** the rules engine executes evaluation
* **THEN** the system sets `recommendation="ESCALATE"`

**TC-012: High-Value Threshold Exact Boundary**
* **GIVEN** the high-value rule threshold is defined as exactly `5000.00`
* **WHEN** a dispute is submitted with `amount=5000.00`
* **THEN** the system assigns `priority="HIGH"`

**TC-013: High-Value Just Below Boundary**
* **GIVEN** the high-value rule threshold is defined as exactly `5000.00`
* **WHEN** a dispute is submitted with `amount=4999.99`
* **THEN** the system assigns `priority="MEDIUM"`

**TC-014: Small Amount Goodwill Boundary**
* **GIVEN** the goodwill threshold is defined as less than `10.00`
* **WHEN** a dispute is submitted with `amount=9.99`
* **THEN** the system returns `recommendation="RESOLVE_NOW"`
* **AND** returns `reason="Goodwill Credit"`

**TC-015: Small Amount Just Above Goodwill Boundary**
* **GIVEN** the goodwill threshold is defined as less than `10.00`
* **WHEN** a dispute is submitted with `amount=10.00`
* **THEN** the system returns `recommendation="INVESTIGATE"`

**TC-016: Fallback Rule Evaluation**
* **GIVEN** a dispute payload contains values that do not trigger any defined business rule condition
* **WHEN** the rules engine executes evaluation
* **THEN** the system returns `recommendation="MANUAL_REVIEW"`
* **AND** returns `priority="MEDIUM"`

---

### Input Data Validation

**TC-017: Missing Customer Reference Validation**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit a dispute form leaving the `customerReference` field empty
* **THEN** the system returns an HTTP status code `400`
* **AND** returns the error message `"Customer reference is required"`

**TC-018: Unsupported Payment Type Validation**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `paymentType="CRYPTO"`
* **THEN** the system returns an HTTP status code `400`
* **AND** returns the error message `"Unsupported payment type"`

**TC-019: Zero Amount Validation**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `amount=0.00`
* **THEN** the system returns an HTTP status code `400`
* **AND** returns the error message `"Amount must be greater than zero"`

**TC-020: Negative Dispute Age Validation**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit `disputeAgeDays=-5`
* **THEN** the system returns an HTTP status code `400`
* **AND** returns the error message `"Dispute age cannot be negative"`

**TC-021: Missing Issue Category Validation**
* **GIVEN** an operations user is on the dispute capture screen
* **WHEN** they submit a dispute form leaving `issueCategory` empty
* **THEN** the system returns an HTTP status code `400`
* **AND** returns the error message `"Issue category is required"`

---

### Application Constraints & UI Behavior

**TC-022: Case List Sorting Logic**
* **GIVEN** three distinct dispute records exist in the system with creation times of `10:00`, `10:15`, and `10:30` respectively
* **WHEN** the operations user views the case list screen
* **THEN** the system displays the dispute from `10:30` as the first item in the list

**TC-023: Case Detail Content Completeness**
* **GIVEN** a saved dispute record exists with a generated recommendation
* **WHEN** the operations user opens the case detail view for this record
* **THEN** the UI renders the input data fields, the recommendation status, the priority value, and the matched rule identifier

**TC-024: In-Memory Isolation Constraint**
* **GIVEN** the application is executing a dispute evaluation
* **WHEN** a triage process runs
* **THEN** the system executes 0 external HTTP network calls to core banking APIs

**TC-025: Duplicate Prevention Engine**
* **GIVEN** a dispute record with `customerReference="CUST-001"` and `amount=250.00` already exists in the system
* **WHEN** an operations user attempts to submit an identical payload within 60 seconds
* **THEN** the system returns an HTTP status code `409`
* **AND** returns the error message `"Duplicate submission detected"`
