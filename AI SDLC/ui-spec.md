# UI Specification — Intelligent Triage of Customer Payment Disputes

## 1. Document Context

This UI specification supports the **Intelligent Triage of Customer Payment Disputes** prototype.

The frontend is a React + Vite + Tailwind CSS application used by an internal banking operations user. It calls the Express backend through REST endpoints under `/api`. All data displayed by the UI is mock data returned from the prototype API.

The main journey is:

1. Capture a payment dispute.
2. Validate the entered details.
3. Submit the dispute to the backend rules engine.
4. Display the recommended next action and rationale.
5. Allow the user to accept or override the recommendation.
6. Review captured disputes in a mock case queue.

The UI must not connect directly to live banking, customer, card-processing, fraud, compliance, or case-management systems.

---

## 2. Design Principles

- Internal operations tool, not customer-facing.
- Prioritise clarity over visual polish.
- Keep the flow narrow and demo-friendly.
- Show the recommended action, priority, age, and rationale clearly.
- Make fired rules visible and easy to explain during the demo.
- Display validation errors next to the relevant fields.
- Preserve user-entered form data when a processing error occurs.
- Do not rely on colour alone for priority, status, or active navigation.
- Use plain language suitable for operations users.
- Make it obvious that all data is mocked.

---

## 3. Canonical Display Labels

| Enum | UI Label |
|---|---|
| `CARD_PAYMENT` | Card payment |
| `EFT` | EFT |
| `INTERNAL_TRANSFER` | Internal transfer |
| `DUPLICATE_DEBIT` | Duplicate debit |
| `FAILED_TRANSFER` | Failed transfer |
| `MISSING_PAYMENT` | Missing payment |
| `CARD_TRANSACTION_DISPUTE` | Card transaction dispute |
| `POSTED` | Posted |
| `PENDING` | Pending |
| `FAILED` | Failed |
| `REVERSED` | Reversed |
| `UNKNOWN` | Unknown |
| `RESOLVE_IMMEDIATELY` | Resolve immediately |
| `INVESTIGATE` | Investigate |
| `ESCALATE` | Escalate |
| `REFER_TO_ANOTHER_TEAM` | Refer to another team |
| `LOW` | Low |
| `MEDIUM` | Medium |
| `HIGH` | High |
| `NEW` | New |
| `AGING` | Aging |
| `OVERDUE` | Overdue |

---

## 4. Primary User Flow

```text
Open app
  ↓
View prototype notice and navigation
  ↓
Open Capture Dispute screen
  ↓
Load reference data and mock customers
  ↓
Select or enter customer and transaction context
  ↓
Enter dispute details
  ↓
Submit dispute
  ↓
Backend validates input and applies deterministic rules
  ↓
Triage Result screen displays recommendation, priority, age, fired rules, and rationale
  ↓
User accepts recommendation or overrides with reason
  ↓
Outcome is saved
  ↓
Case appears in Case Queue
  ↓
User may view case detail or start a new dispute
```

---

## 5. Global Navigation and App Shell

**Purpose:** Provide consistent navigation and make the prototype boundary clear.

**Layout:**
- Header: `Payment Dispute Triage`
- Prototype notice banner: `Prototype only — all customer, transaction, and dispute data is mocked.`
- Navigation links:
  - `Capture Dispute`
  - `Case Queue`
  - `Rules Reference`

**Interactions:**
- Click `Capture Dispute` → navigate to `/capture`
- Click `Case Queue` → navigate to `/queue`
- Click `Rules Reference` → navigate to `/rules`

**States:**
- Active navigation item is shown using text, icon, or underline plus colour.
- Prototype notice is always visible or available in a compact persistent banner.

**API usage:**
- Optional: `GET /api/health` on app load for development diagnostics only.

**Requirements:** REQ-001 to REQ-004

---

## 6. Screen: Dispute Capture

**Route:** `/capture`

**Purpose:** Operations user captures the information needed to triage a payment dispute.

**Primary component:** `DisputeCaptureForm`

### Layout

- Page title: `Capture Payment Dispute`
- Helper text: explains that no live banking data is used.
- Customer section:
  - Customer selector
  - Customer ID input fallback
  - Customer summary card when selected
- Transaction section:
  - Transaction selector for selected customer
  - Transaction reference input
  - Transaction status dropdown
  - Payment type dropdown
- Dispute section:
  - Issue category dropdown
  - Dispute amount input with ZAR formatting hint
  - Dispute date input
  - Notes textarea
- Action bar:
  - Primary button: `Submit for Triage`
  - Secondary button: `Clear Form`

### Data Displayed

| Field | Source | Format |
|---|---|---|
| `customerId` | API or manual input | String |
| `customerName` | `GET /api/customers` | String |
| `accountStatus` | `GET /api/customers` | Text badge |
| `transactionId` | `GET /api/customers/:customerId/transactions` | String |
| `transactionReference` | Transaction or user input | String |
| `paymentType` | Reference data / transaction | Dropdown |
| `issueCategory` | Reference data | Dropdown |
| `transactionStatus` | Reference data / transaction | Dropdown |
| `amount` | Transaction or user input | ZAR |
| `disputeDate` | User input | Date |
| `notes` | User input | Text |

### Interactions

- Select customer → update customer summary and call `GET /api/customers/:customerId/transactions`.
- Select transaction → pre-populate payment type, transaction status, amount, and reference.
- Edit pre-populated fields → user-entered values override transaction defaults.
- Click `Submit for Triage` → client performs basic required-field checks and calls `POST /api/disputes`.
- Successful submit → navigate to `/disputes/:disputeId/result`.
- Click `Clear Form` → reset all fields and validation messages.

### Validation Behaviour

The backend is the source of truth for validation. The frontend may provide matching client-side hints for speed.

- Missing payment type → show field error.
- Missing issue category → show field error.
- Missing dispute amount → show field error.
- Amount less than or equal to zero → show `Amount must be greater than zero.`
- Missing dispute date → show field error.
- Future dispute date → show `Dispute date cannot be in the future.`
- Missing transaction reference → show field error.
- Unsupported enum value → show supported-values message returned by API.

### States

| State | UI Behaviour |
|---|---|
| Empty | Blank form with helper text. |
| Loading reference data | Disable dropdowns and show `Loading form options...`. |
| Loading transactions | Show loading indicator in transaction selector. |
| Submitting | Disable submit button and show `Calculating recommendation...`. |
| Validation error | Display field-level API errors next to relevant fields. |
| Processing error | Show `Recommendation could not be generated. Please check the details and try again.` and preserve form data. |
| Success | Navigate to Triage Result screen. |

### API Usage

- `GET /api/reference-data` — on screen load
- `GET /api/customers` — on screen load
- `GET /api/customers/:customerId/transactions` — when customer is selected
- `POST /api/disputes` — when form is submitted

**Requirements:** REQ-005 to REQ-022, REQ-067 to REQ-071

---

## 7. Screen: Triage Result

**Route:** `/disputes/:disputeId/result`

**Purpose:** Operations user reviews the recommended next action, priority, age indicator, rationale, and fired rules.

**Primary component:** `TriageResultPanel`

### Layout

- Page title: `Triage Recommendation`
- Recommendation banner:
  - Recommended action badge
  - Priority badge
  - Age indicator badge
- Rationale panel:
  - Plain-language rationale
  - Fired rules list
- Dispute summary panel:
  - Customer details
  - Payment type
  - Issue category
  - Transaction reference
  - Transaction status
  - Amount
  - Dispute date
  - Notes
- Routing decision panel:
  - `Accept Recommendation` quick action
  - Selected action dropdown
  - Destination team dropdown when selected action is `REFER_TO_ANOTHER_TEAM`
  - Override reason textarea when selected action differs from recommendation
  - Agent notes textarea
- Action bar:
  - `Confirm Outcome`
  - `Back to Capture`
  - `View Case Queue`

### Data Displayed

- `disputeId`
- `recommendedAction`
- `priority`
- `ageIndicator`
- `destinationTeam` where applicable
- `escalationReason` where applicable
- `firedRules`: rule ID, description, outcome
- `triageRationale`
- captured dispute details
- current case status

### Interactions

- Click `Accept Recommendation` → selected action is set to the recommended action.
- Select a different action → override reason becomes required.
- Select `REFER_TO_ANOTHER_TEAM` → destination team becomes required.
- Click `Confirm Outcome` → call `PATCH /api/disputes/:disputeId/outcome`.
- Successful confirmation → display success message and updated case status.
- Click `Back to Capture` → navigate to `/capture`.
- Click `View Case Queue` → navigate to `/queue`.

### States

| State | UI Behaviour |
|---|---|
| Loading | Show skeleton recommendation card. |
| Error | Show `Unable to load triage result.` |
| Not found | Show `Dispute case not found.` |
| Awaiting confirmation | Decision controls are enabled. |
| Confirming | Disable controls and show `Saving outcome...`. |
| Validation error | Show missing override reason or destination team field errors. |
| Confirmed | Show success message and updated status. |

### API Usage

- `GET /api/disputes/:disputeId` — on screen load or refresh
- `PATCH /api/disputes/:disputeId/outcome` — when user confirms or overrides recommendation

**Requirements:** REQ-048 to REQ-058, REQ-064, REQ-065

---

## 8. Screen: Case Queue

**Route:** `/queue`

**Purpose:** Operations user reviews all dispute cases captured in the prototype database.

**Primary component:** `CaseQueueView`

### Layout

- Page title: `Case Queue`
- Summary cards:
  - Total cases
  - High-priority cases
  - Escalated cases
  - Referred cases
- Filter bar:
  - Status filter
  - Priority filter
  - Recommended action filter
  - Payment type filter
- Case table:
  - Case ID
  - Customer
  - Payment type
  - Issue category
  - Amount
  - Age
  - Priority
  - Status
  - Recommended action
  - Created date
- Action area:
  - `New Dispute` button

### Interactions

- Click `New Dispute` → navigate to `/capture`.
- Change filter → call `GET /api/disputes` with query parameters.
- Click table row → navigate to `/disputes/:disputeId`.
- Sort by amount, age, priority, status, or created date → update table order client-side.

### States

| State | UI Behaviour |
|---|---|
| Empty | Show `No disputes captured yet.` |
| Loading | Show table skeleton. |
| Error | Show `Unable to load the case queue.` |
| Filtered empty | Show `No cases match the selected filters.` |
| Success | Show newest cases first by default. |

### API Usage

- `GET /api/disputes` — on screen load and whenever filters change

**Requirements:** REQ-059 to REQ-063, REQ-066

---

## 9. Screen: Case Detail

**Route:** `/disputes/:disputeId`

**Purpose:** Operations user reviews a captured case, including original dispute details, recommendation, fired rules, and action taken.

**Primary component:** `CaseDetailView`

### Layout

- Page title: `Dispute Case Detail`
- Case summary header:
  - Dispute ID
  - Current status
  - Priority
  - Recommended action
- Customer panel:
  - Customer ID
  - Customer name
  - Account status where available
- Dispute detail panel:
  - Payment type
  - Issue category
  - Transaction reference
  - Transaction status
  - Amount
  - Dispute date
  - Age indicator
  - Notes
- Recommendation panel:
  - Rationale
  - Fired rules
  - Destination team or escalation reason where applicable
- Outcome panel:
  - Selected action
  - Agent override indicator
  - Override reason where applicable
  - Agent notes
- Action bar:
  - `Back to Queue`
  - `Capture New Dispute`

### States

| State | UI Behaviour |
|---|---|
| Loading | Show detail skeleton. |
| Error | Show `Unable to load dispute case.` |
| Not found | Show `Dispute case not found.` |
| Success | Show full detail. |

### API Usage

- `GET /api/disputes/:disputeId` — on screen load

**Requirements:** REQ-064, REQ-065

---

## 10. Screen: Rules Reference

**Route:** `/rules`

**Purpose:** Operations user or demo audience can understand how the deterministic rules engine works.

This screen reinforces that the prototype uses transparent rules rather than AI or ML.

### Layout

- Page title: `Rules Reference`
- Intro text explaining deterministic rules and configured thresholds
- Threshold cards:
  - Immediate-resolution age threshold
  - Escalation amount threshold
  - Overdue age threshold
- Rules table:
  - Rule ID
  - Condition
  - Recommended action
  - Priority
  - Plain-language explanation
- Precedence notes panel

### States

| State | UI Behaviour |
|---|---|
| Loading | Show table skeleton. |
| Error | Show `Unable to load rules reference.` |
| Success | Show rules and thresholds. |

### API Usage

- `GET /api/rules` — on screen load

**Requirements:** REQ-036, REQ-074, REQ-075

---

## 11. Component Specifications

### Component: PriorityBadge

**Purpose:** Show priority clearly and accessibly.

**Inputs:**
- `priority`: `LOW`, `MEDIUM`, or `HIGH`

**Behaviour:**
- Displays priority text.
- Uses visual styling plus text or icon.
- Does not rely on colour alone.
- For `HIGH`, includes clear text such as `High priority`.

### Component: RecommendedActionBadge

**Purpose:** Show the recommended or selected action.

**Inputs:**
- `recommendedAction`: `RESOLVE_IMMEDIATELY`, `INVESTIGATE`, `ESCALATE`, or `REFER_TO_ANOTHER_TEAM`

**Behaviour:**
- Displays plain-language labels.
- Uses consistent styling across result, queue, and detail screens.

### Component: AgeIndicatorBadge

**Purpose:** Show whether a dispute is new, aging, or overdue.

**Inputs:**
- `ageIndicator`: `NEW`, `AGING`, or `OVERDUE`
- `ageDays`: number

**Behaviour:**
- Displays text such as `New · 3 days old`.
- Does not rely on colour alone.

### Component: FiredRulesList

**Purpose:** Explain which deterministic rules fired.

**Inputs:**
- `firedRules`: array of rule ID, description, and outcome

**Behaviour:**
- Displays each rule ID and explanation.
- Shows at least one rule for every recommendation.

### Component: FieldErrorMessage

**Purpose:** Display API validation errors next to fields.

**Inputs:**
- `field`
- `message`

**Behaviour:**
- Links error text to the field where practical.
- Uses accessible error text and not colour alone.

---

## 12. Accessibility and Usability Requirements

- Form controls must have visible labels.
- Validation errors must be associated with relevant fields.
- Buttons must have clear action text.
- Loading states must not remove already-entered user data.
- Priority and status badges must include text, not only colour.
- Tables must have meaningful column headings.
- Keyboard users must be able to complete the capture and outcome flow.

---

## 13. UI Test Hooks

Use stable selectors for Playwright tests:

| Element | Suggested selector |
|---|---|
| Capture form | `data-testid="dispute-capture-form"` |
| Submit button | `data-testid="submit-for-triage"` |
| Recommendation banner | `data-testid="recommendation-banner"` |
| Fired rules list | `data-testid="fired-rules-list"` |
| Confirm outcome button | `data-testid="confirm-outcome"` |
| Case queue table | `data-testid="case-queue-table"` |
| Case detail view | `data-testid="case-detail-view"` |
| Rules reference table | `data-testid="rules-reference-table"` |

---

## 14. Screen-to-API Mapping

| Screen | Endpoint(s) |
|---|---|
| App shell | Optional `GET /api/health` |
| Dispute Capture | `GET /api/reference-data`, `GET /api/customers`, `GET /api/customers/:customerId/transactions`, `POST /api/disputes` |
| Triage Result | `GET /api/disputes/:disputeId`, `PATCH /api/disputes/:disputeId/outcome` |
| Case Queue | `GET /api/disputes` |
| Case Detail | `GET /api/disputes/:disputeId` |
| Rules Reference | `GET /api/rules` |
