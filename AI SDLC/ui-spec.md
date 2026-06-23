# UI Specification

## Document Context

This UI specification supports the **Intelligent Triage of Customer Payment Disputes** prototype.

The prototype is a client-side React SPA for banking operations users. The main journey is:

1. Capture a payment dispute.
2. Validate the entered details.
3. Apply transparent rules-based triage.
4. Display the recommended next action and rationale.
5. Allow the user to accept or override the recommendation.
6. Review captured disputes in a session-based case queue.

The UI must use mock data only and must not connect to live banking, customer, card-processing, fraud, compliance, or case-management systems.

---

## Design Principles

- Internal operations tool, not customer-facing.
- Prioritise clarity over visual polish.
- Make the recommendation and rationale easy to understand.
- Display validation errors next to the relevant fields.
- Use plain language suitable for operations users.
- Do not rely on colour alone for priority or status.
- Keep the flow narrow and demo-friendly.
- Preserve user-entered form data when a processing error occurs.

---

## Primary User Flow

```text
Open app
  ↓
View Dispute Capture Form
  ↓
Select or enter customer and transaction context
  ↓
Enter payment type, issue category, dispute amount, dispute date, transaction reference, and notes
  ↓
Submit dispute
  ↓
System validates input
  ↓
Rules engine evaluates dispute
  ↓
Triage Result Panel displays recommended action, priority, age indicator, rule outcome, and rationale
  ↓
User accepts recommendation or overrides with reason
  ↓
Case is updated and shown in Case Queue
  ↓
User may start a new dispute
```

---

## Global Navigation

**Layout:**
- App header — `Payment Dispute Triage`
- Navigation links:
  - `Capture Dispute`
  - `Case Queue`
- Prototype notice banner — states that all data is mocked and session-scoped

**Interactions:**
- Click `Capture Dispute` → opens Dispute Capture screen
- Click `Case Queue` → opens Case Queue screen

**States:**
- Active navigation item is visually indicated
- Prototype notice is always visible or available as a compact banner

---

## Screen: Dispute Capture

**Purpose:** Operations user captures the details required to triage a payment dispute.

**Route:** `/capture`

**Primary component:** `DisputeCaptureForm`

**Layout:**
- Page title — `Capture Payment Dispute`
- Helper text — explains that this is a mock prototype and no live banking data is used
- Customer section
  - Customer selector or customer ID input
  - Customer summary card when a mock customer is selected
- Transaction section
  - Transaction selector or transaction reference input
  - Transaction status dropdown
  - Payment type dropdown
- Dispute section
  - Issue category dropdown
  - Dispute amount input
  - Dispute date input
  - Notes textarea
- Action bar
  - Primary button: `Submit for Triage`
  - Secondary button: `Clear Form`

**Data displayed:**
- customerId: string from mock customer data or user input
- customerName: string from mock customer data where available
- accountStatus: active, restricted, or closed where available
- transactionId: string where available
- transactionReference: user-captured text
- paymentType: `CARD_PAYMENT`, `EFT`, or `INTERNAL_TRANSFER`
- issueCategory: `DUPLICATE_DEBIT`, `FAILED_TRANSFER`, `MISSING_PAYMENT`, or `CARD_TRANSACTION_DISPUTE`
- transactionStatus: `POSTED`, `PENDING`, `FAILED`, `REVERSED`, or `UNKNOWN`
- amount: number displayed as ZAR
- disputeDate: date
- notes: optional text

**Interactions:**
- Select customer → customer summary updates
- Select customer → available mock transactions may be filtered for that customer
- Select transaction → payment type, transaction status, amount, and reference may pre-populate if available
- Edit pre-populated fields → user-entered values override mock transaction values for the dispute
- Click `Submit for Triage` → validate fields and call `CREATE_DISPUTE_AND_TRIAGE`
- Successful submit → navigate to Triage Result screen for the created dispute
- Click `Clear Form` → reset all form fields and validation messages

**Validation behaviour:**
- Missing payment type → show field error
- Missing issue category → show field error
- Missing dispute amount → show field error
- Amount less than or equal to zero → show `Amount must be greater than zero.`
- Missing dispute date → show field error
- Future dispute date → show `Dispute date cannot be in the future.`
- Missing transaction reference → show field error
- Unsupported enum value → show supported-values message

**States:**
- Empty: blank form with helper text
- Loading reference data: skeleton or disabled form with `Loading form options...`
- Submitting: disable submit button and show `Calculating recommendation...`
- Validation error: field-level errors next to relevant fields
- Processing error: show `Recommendation could not be generated. Please check the details and try again.` and preserve entered data
- Success: created dispute is passed to Triage Result screen

**Service usage:**
- `GET_REFERENCE_DATA` — on screen load
- `LIST_MOCK_CUSTOMERS` — on screen load
- `LIST_CUSTOMER_TRANSACTIONS` — when a customer is selected
- `CREATE_DISPUTE_AND_TRIAGE` — when form is submitted

---

## Screen: Triage Result

**Purpose:** Operations user reviews the recommended next action, priority, rationale, and rule outcome for the captured dispute.

**Route:** `/disputes/:disputeId/result`

**Primary component:** `TriageResultPanel`

**Layout:**
- Page title — `Triage Recommendation`
- Recommendation banner
  - Recommended action badge
  - Priority badge
  - Age indicator badge
- Rationale panel
  - Plain-language rationale
  - Fired rules list
- Dispute summary panel
  - Customer details
  - Payment type
  - Issue category
  - Transaction reference
  - Transaction status
  - Amount
  - Dispute date
  - Notes
- Routing decision panel
  - Accept recommendation button
  - Override recommendation dropdown
  - Destination team dropdown where relevant
  - Override reason textarea where relevant
- Action bar
  - `Confirm Outcome`
  - `Back to Capture`
  - `View Case Queue`

**Data displayed:**
- disputeId
- recommendedAction
- priority
- ageIndicator
- destinationTeam where applicable
- escalationReason where applicable
- firedRules: rule ID, description, outcome
- rationale
- captured dispute details
- case status

**Interactions:**
- Click `Accept Recommendation` → selected action is set to the recommended action
- Select a different action → override reason becomes required
- Select `REFER_TO_ANOTHER_TEAM` → destination team becomes required
- Click `Confirm Outcome` → call `UPDATE_DISPUTE_OUTCOME`
- Successful confirmation → display updated status and route option to Case Queue
- Click `Back to Capture` → returns to capture screen
- Click `View Case Queue` → navigates to Case Queue screen

**States:**
- Loading: show skeleton recommendation card
- Error: show `Unable to load triage result.`
- Missing case: show `Dispute case not found.`
- Awaiting confirmation: show recommendation with decision controls enabled
- Confirming: disable controls and show `Saving outcome...`
- Confirmed: show success message and updated case status

**Service usage:**
- `GET_DISPUTE_DETAIL` — when screen loads directly from a route
- `UPDATE_DISPUTE_OUTCOME` — when user confirms or overrides recommendation

---

## Screen: Case Queue

**Purpose:** Operations user reviews all dispute cases captured during the current session.

**Route:** `/queue`

**Primary component:** `CaseQueueView`

**Layout:**
- Page title — `Case Queue`
- Summary cards
  - Total cases
  - High-priority cases
  - Escalated cases
  - Referred cases
- Filter bar
  - Status filter
  - Priority filter
  - Recommended action filter
  - Payment type filter
- Case table
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
- Action area
  - `New Dispute` button

**Data displayed:**
- disputes from `LIST_DISPUTES`
- total count
- derived summary counts
- priority and status displayed using text plus badge/icon

**Interactions:**
- Click `New Dispute` → navigate to Dispute Capture screen
- Change filter → update case list
- Click table row → navigate to Case Detail screen
- Sort by amount, age, priority, status, or created date → table order updates

**States:**
- Empty: `No disputes captured in this session.`
- Loading: table skeleton
- Error: `Unable to load the case queue.`
- Filtered empty: `No cases match the selected filters.`
- Success: newest cases shown first by default

**Service usage:**
- `LIST_DISPUTES` — on screen load and whenever filters change

---

## Screen: Case Detail

**Purpose:** Operations user reviews a captured case, including original dispute details, recommendation, rationale, and action taken.

**Route:** `/disputes/:disputeId`

**Primary component:** `CaseDetailView`

**Layout:**
- Page title — `Dispute Case Detail`
- Case summary header
  - Dispute ID
  - Current status
  - Priority
  - Recommended action
- Customer panel
  - Customer ID
  - Customer name
  - Account status where available
- Dispute detail panel
  - Payment type
  - Issue category
  - Transaction reference
  - Transaction status
  - Amount
  - Dispute date
  - Age indicator
  - Notes
- Recommendation panel
  - Rationale
  - Fired rules
  - Destination team or escalation reason where applicable
- Outcome panel
  - Selected action
  - Agent override indicator
  - Override reason where applicable
  - Agent notes
- Action bar
  - `Back to Queue`
  - `Capture New Dispute`

**Data displayed:**
- full dispute case from `GET_DISPUTE_DETAIL`

**Interactions:**
- Click `Back to Queue` → navigate to Case Queue screen
- Click `Capture New Dispute` → navigate to Dispute Capture screen

**States:**
- Loading: detail skeleton
- Error: `Unable to load dispute case.`
- Not found: `Dispute case not found.`
- Success: full detail displayed

**Service usage:**
- `GET_DISPUTE_DETAIL` — on screen load

---

## Screen: Rules Reference

**Purpose:** Operations user or demo audience can understand how the rules-based decisioning works.

This screen is optional but useful for the conference demo because it reinforces that the prototype uses transparent rules rather than AI or ML.

**Route:** `/rules`

**Layout:**
- Page title — `Rules Reference`
- Intro text — explains that rules are deterministic and based on configured prototype thresholds
- Rules table
  - Rule ID
  - Condition
  - Recommended action
  - Priority
  - Plain-language explanation
- Notes panel
  - Explains precedence when multiple rules apply

**Data displayed:**
- BR-001 to BR-007 from the rules contract
- Escalation threshold
- Overdue threshold
- Immediate-resolution threshold

**Interactions:**
- Click `Back to Capture` → navigate to Dispute Capture screen
- Click `View Queue` → navigate to Case Queue screen

**States:**
- Empty: not expected if rules configuration exists
- Loading: only needed if rules are loaded asynchronously
- Error: `Unable to load rules reference.`

**Service usage:**
- May read static `RuleConfiguration` directly
- No network or external service calls

---

## Component Specifications

## Component: PriorityBadge

**Purpose:** Show priority in a clear and accessible way.

**Inputs:**
- priority: `LOW`, `MEDIUM`, or `HIGH`

**Behaviour:**
- Displays priority text.
- Uses visual styling plus text or icon.
- Does not rely on colour alone.

---

## Component: RecommendedActionBadge

**Purpose:** Show the recommended action.

**Inputs:**
- recommendedAction: `RESOLVE_IMMEDIATELY`, `INVESTIGATE`, `ESCALATE`, or `REFER_TO_ANOTHER_TEAM`

**Behaviour:**
- Displays plain-language label:
  - `RESOLVE_IMMEDIATELY` → `Resolve immediately`
  - `INVESTIGATE` → `Investigate`
  - `ESCALATE` → `Escalate`
  - `REFER_TO_ANOTHER_TEAM` → `Refer to another team`

---

## Component: FiredRulesList

**Purpose:** Explain why the recommendation was produced.

**Inputs:**
- firedRules: array of rule outputs

**Behaviour:**
- Displays each rule ID.
- Displays each rule description.
- Displays each rule outcome.
- Shows a fallback message if no rule data is available.

---

## Component: FieldError

**Purpose:** Display validation feedback next to the relevant field.

**Inputs:**
- message: string

**Behaviour:**
- Renders only when a validation message exists.
- Uses accessible error text associated with the relevant input.

---

## Accessibility Notes

- Use semantic HTML form controls.
- Associate labels with inputs.
- Ensure validation errors are readable by screen readers.
- Ensure all buttons are keyboard reachable.
- Do not rely on colour alone to show priority, status, or errors.
- Use clear focus indicators.

---

## Demo Scenarios

Use these scenarios to verify the UI before demo:

## Scenario 1: Successful immediate resolution
- Payment type: `EFT`
- Issue category: `DUPLICATE_DEBIT`
- Transaction status: `POSTED`
- Dispute date: today or recent date
- Expected recommendation: `RESOLVE_IMMEDIATELY`

## Scenario 2: Pending failed transfer investigation
- Payment type: `EFT`
- Issue category: `FAILED_TRANSFER`
- Transaction status: `PENDING`
- Expected recommendation: `INVESTIGATE`

## Scenario 3: Missing payment with unknown status
- Payment type: `INTERNAL_TRANSFER`
- Issue category: `MISSING_PAYMENT`
- Transaction status: `UNKNOWN`
- Expected recommendation: `INVESTIGATE`

## Scenario 4: Card dispute referral
- Payment type: `CARD_PAYMENT`
- Issue category: `CARD_TRANSACTION_DISPUTE`
- Expected recommendation: `REFER_TO_ANOTHER_TEAM`
- Expected destination team: `CARD_DISPUTES`

## Scenario 5: High-value escalation
- Amount above escalation threshold
- Expected recommendation: `ESCALATE`
- Expected priority: `HIGH`

---

## Open Alignment Notes

These items should be confirmed by the team if time allows:

1. Should the optional Rules Reference screen be included, or should the prototype stay with four screens only?
2. Should the user select a mock customer from seeded data or manually type a customer reference?
3. Should transaction details pre-populate from mock transactions, or should the form be fully manual?
4. Should sorting and filtering in Case Queue be required for the MVP or treated as polish?
5. Should override be mandatory in the Day 1 scope, or only shown if time allows?
