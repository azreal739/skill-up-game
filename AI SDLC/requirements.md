# EARS Requirements — Intelligent Triage of Customer Payment Disputes

> Consolidated EARS requirements document for the Standard Bank conference use case.
> Prepared as a clean, implementation-ready Markdown artifact aligned to the SharePoint spec-pack use case and EARS template.

## Document Control
- **Document name:** `EARS_Requirements_Dispute_Triage_Consolidated.md`
- **Use case:** Intelligent Triage of Customer Payment Disputes
- **Format:** EARS (Easy Approach to Requirements Syntax)
- **Scope:** Internal lightweight prototype using mock data and a rules-based decision approach

---

## 1. Purpose
This document defines testable functional and selected non-functional requirements for a lightweight internal prototype that helps banking operations users capture customer payment disputes, assess the dispute context, and receive a recommended next action.

The prototype supports a single focused journey:
1. Capture a payment dispute.
2. Record key dispute details.
3. Evaluate the case using transparent business rules.
4. Present the recommended next action and rationale.
5. Enable routing, escalation, or referral where applicable.

---

## 2. Scope
### In Scope
- Capture of customer payment dispute details
- Support for a limited set of payment types
- Rules-based recommendation of next action
- Display of classification outcome and reasoning
- Priority and age indicators
- Manual routing or referral to the appropriate team
- Use of mock customer, dispute, and transaction data

### Out of Scope
- Production banking integrations
- Real card processor integration
- Real core banking integration
- Machine learning or AI-driven decisioning
- Full end-to-end dispute lifecycle management
- Customer-facing channels

---

## 3. Actors
- **Operations User** — captures and reviews payment disputes
- **Supervisor/User with escalation authority** — reviews escalated cases
- **System** — validates inputs, applies rules, and recommends next actions

---

## 4. Business Objective
The system shall help operations users triage payment disputes consistently and quickly by recommending the most appropriate next step based on issue category, payment type, transaction status, dispute age, and amount.

---

## 5. Assumptions
- The solution uses mock data only.
- The prototype supports a small subset of payment types, such as card payments, EFTs, and internal transfers.
- Business rules are transparent and deterministic.
- A recommendation is advisory and may still require user confirmation depending on the action.

---

## 6. EARS Requirements

## 6.1 Dispute Capture
- **REQ-001:** When an operations user opens the dispute capture form, the system shall display fields for customer reference, payment type, issue category, transaction status, dispute amount, dispute date, transaction reference, and notes.
- **REQ-002:** The system shall require payment type, issue category, dispute amount, dispute date, and transaction reference before a dispute can be submitted.
- **REQ-003:** If a required field is missing, then the system shall reject the submission and identify each missing field.
- **REQ-004:** If the dispute amount is zero or less, then the system shall reject the submission and display an error indicating that the amount must be greater than zero.
- **REQ-005:** If the dispute date is in the future, then the system shall reject the submission and display an error indicating that the dispute date is invalid.
- **REQ-006:** When a valid dispute is submitted, the system shall create a dispute record with a unique dispute ID.
- **REQ-007:** When a valid dispute is submitted, the system shall set the initial case status to `CAPTURED`.
- **REQ-008:** The system shall store all dispute records using mock data persistence for the prototype.

## 6.2 Supported Payment Types and Categories
- **REQ-009:** The system shall support the payment types `CARD_PAYMENT`, `EFT`, and `INTERNAL_TRANSFER`.
- **REQ-010:** The system shall support the issue categories `DUPLICATE_DEBIT`, `FAILED_TRANSFER`, `MISSING_PAYMENT`, and `CARD_TRANSACTION_DISPUTE`.
- **REQ-011:** If a user selects an unsupported payment type, then the system shall reject the submission and display a supported-values message.
- **REQ-012:** If a user selects an unsupported issue category, then the system shall reject the submission and display a supported-values message.

## 6.3 Case Assessment Inputs
- **REQ-013:** When a dispute is submitted, the system shall calculate the dispute age in calendar days using the dispute date and the current system date.
- **REQ-014:** The system shall classify dispute age into `NEW`, `AGING`, or `OVERDUE`.
- **REQ-015:** The system shall classify dispute priority into `LOW`, `MEDIUM`, or `HIGH`.
- **REQ-016:** When a dispute amount exceeds the high-value threshold configured for the prototype, the system shall assign high priority unless a higher-priority rule already applies.
- **REQ-017:** Where transaction status information is available, the system shall use that status as an input to the recommendation rules.
- **REQ-018:** If transaction status information is not available, then the system shall flag the case as requiring investigation.

## 6.4 Rules-Based Recommendation Engine
- **REQ-019:** When a dispute is submitted, the system shall evaluate the dispute against a predefined set of business rules.
- **REQ-020:** The system shall produce one recommended next action for each dispute.
- **REQ-021:** The system shall support the recommended next actions `RESOLVE_IMMEDIATELY`, `INVESTIGATE`, `ESCALATE`, and `REFER_TO_ANOTHER_TEAM`.
- **REQ-022:** The system shall display the rule outcome that produced the recommendation.
- **REQ-023:** The system shall display a plain-language rationale for the recommended next action.
- **REQ-024:** If no specific rule is matched, then the system shall recommend `INVESTIGATE` as the default next action.

## 6.5 Example Decision Rules
- **REQ-025:** When the issue category is `DUPLICATE_DEBIT` and the transaction status is `POSTED` and the dispute age is within the immediate-resolution threshold, the system shall recommend `RESOLVE_IMMEDIATELY`.
- **REQ-026:** When the issue category is `FAILED_TRANSFER` and the transaction status is `PENDING`, the system shall recommend `INVESTIGATE`.
- **REQ-027:** When the issue category is `MISSING_PAYMENT` and transaction status information is unavailable, the system shall recommend `INVESTIGATE`.
- **REQ-028:** When the payment type is `CARD_PAYMENT` and the issue category is `CARD_TRANSACTION_DISPUTE`, the system shall recommend `REFER_TO_ANOTHER_TEAM`.
- **REQ-029:** When the dispute amount exceeds the escalation threshold, the system shall recommend `ESCALATE`.
- **REQ-030:** When the dispute age exceeds the overdue threshold, the system shall recommend `ESCALATE`.
- **REQ-031:** While a case has priority `HIGH`, the system shall visually distinguish the case from lower-priority cases.
- **REQ-032:** If more than one rule applies, then the system shall apply the rule with the highest precedence configured for the prototype.

## 6.6 Referral and Routing
- **REQ-033:** When the recommended next action is `REFER_TO_ANOTHER_TEAM`, the system shall display the destination team.
- **REQ-034:** The system shall support referral destinations for at least card disputes, payments operations, and investigations.
- **REQ-035:** When the recommended next action is `ESCALATE`, the system shall display the escalation reason.
- **REQ-036:** When a user accepts the recommendation, the system shall update the case status to reflect the selected routing outcome.
- **REQ-037:** If a user overrides the recommendation, then the system shall require an override reason.
- **REQ-038:** When a user overrides the recommendation, the system shall record the original recommendation, the selected action, and the override reason.

## 6.7 User Interface Behaviour
- **REQ-039:** The system shall display the captured dispute details together with the recommendation result on a single review screen.
- **REQ-040:** When a recommendation is generated, the system shall display the next action, priority, dispute age, and rationale.
- **REQ-041:** The system shall display validation errors next to the relevant fields.
- **REQ-042:** While the recommendation is being calculated, the system shall show a loading state.
- **REQ-043:** If the recommendation cannot be generated due to a processing error, then the system shall display an error state and preserve the user-entered data.
- **REQ-044:** The system shall allow the user to start a new dispute after completing the current review.

## 6.8 Audit and Traceability
- **REQ-045:** The system shall record the date and time when a dispute is created.
- **REQ-046:** The system shall record the rule identifier that generated the recommendation.
- **REQ-047:** The system shall record the user action taken after the recommendation is displayed.
- **REQ-048:** When a case is routed, referred, resolved, or escalated, the system shall record the resulting case status.

## 6.9 Non-Functional Requirements
- **REQ-049:** The system shall return a recommendation within 2 seconds for a valid dispute submitted using the prototype dataset.
- **REQ-050:** The system shall use mock data only and shall not connect to live banking platforms.
- **REQ-051:** The system shall present all recommendations in clear, plain language suitable for operations users.
- **REQ-052:** The system shall ensure every recommendation can be traced to an explicit rule outcome.
- **REQ-053:** The system shall prevent submission of incomplete or invalid disputes.

---

## 7. Derived Business Rules Catalogue
- **BR-001:** Duplicate debit disputes with a posted transaction and recent dispute age may be resolved immediately.
- **BR-002:** Failed transfer disputes with pending status require investigation.
- **BR-003:** Missing payment disputes without transaction status require investigation.
- **BR-004:** Card transaction disputes are referred to the card disputes team.
- **BR-005:** High-value disputes are escalated.
- **BR-006:** Overdue disputes are escalated.
- **BR-007:** Where multiple rules apply, escalation rules take precedence over investigation rules, and referral rules take precedence where specialist handling is required.

---

## 8. Acceptance Notes
This requirements set is intended to be:
- specific
- testable
- implementation-friendly
- aligned to a lightweight prototype scope

It can be used as the basis for:
- test cases
- API specification mapping
- UI specification mapping
- rules engine implementation
- traceability to demo scenarios

---

## 9. Suggested Next Artefacts
To complete the spec pack, the following should be produced next:
1. Test cases mapped to each requirement
2. Rules engine configuration table
3. API specification for dispute capture and recommendation retrieval
4. UI screen specification for capture, review, and outcome screens
5. Architecture note showing mock data, rules engine, and persistence
