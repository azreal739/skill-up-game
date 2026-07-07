import { HelpTopic } from '@academy/content-model';

/**
 * Help Centre reference library (10_HELP_CENTRE_AND_HINT_SYSTEM.md).
 * Every helpLink.topicId used by challenge content must exist here —
 * enforced by the content integrity tests.
 */
export const helpTopics: HelpTopic[] = [
  {
    id: 'angular.presentational-vs-container',
    title: 'Presentational vs Container Components',
    tags: ['angular'],
    summary: 'Presentational components render inputs; containers wire in data.',
    content:
      'A presentational (dumb) component takes @Inputs, emits @Outputs, and holds no service dependencies — easy to reuse and test. A container (smart) component injects services, fetches data, and passes it down to presentational children. Keeping the two separate is what makes a UI library reusable across features.',
  },
  {
    id: 'a11y.semantics',
    title: 'Accessible Markup and Semantics',
    tags: ['angular', 'a11y'],
    summary: 'Use real semantic elements and ARIA only when semantics fall short.',
    content:
      'A native <button> is focusable, keyboard-operable and announced correctly for free — a clickable <div> is none of those. Reach for semantic HTML first; add ARIA (roles, aria-label, aria-pressed) only to fill gaps semantics cannot. Every interactive control needs a keyboard path and an accessible name, and information must never be conveyed by colour alone.',
  },
  {
    id: 'scss.responsive',
    title: 'Responsive Layout with SCSS',
    tags: ['scss'],
    summary: 'Fluid layouts and a few well-chosen breakpoints beat fixed pixels.',
    content:
      'Prefer intrinsic layout — flexbox/grid with min/max and fr units — so components adapt without media queries. Where you do need breakpoints, drive them from a shared mixin so they stay consistent, and design mobile-first (base styles small, layer enhancements up). Avoid fixed pixel widths that overflow small screens.',
  },
  {
    id: 'typescript.unknown-vs-any',
    title: 'unknown vs any',
    tags: ['typescript'],
    summary: 'unknown forces a check before use; any disables the compiler.',
    content:
      'Both accept any value, but unknown will not let you use the value until you narrow it (typeof, a schema, a type guard), so the compiler stays on. any silently turns off all checking and lets bugs through. At untyped boundaries — JSON.parse, external APIs — prefer unknown and narrow deliberately.',
  },
  {
    id: 'typescript.generics',
    title: 'Generics',
    tags: ['typescript'],
    summary: 'Generics preserve type relationships instead of widening to any.',
    content:
      'A generic like function first<T>(items: T[]): T | undefined keeps the caller’s element type flowing through the function, so first([1,2]) is number | undefined — not any. Reach for generics when a function or type must work over many types while preserving the relationship between input and output.',
  },
  {
    id: 'angular.change-detection',
    title: 'OnPush Change Detection',
    tags: ['angular'],
    summary: 'OnPush re-renders only when inputs change or events fire.',
    content:
      'By default Angular checks every component on each change-detection cycle. ChangeDetectionStrategy.OnPush limits checks to when an @Input reference changes, an event fires in the component, or an observable it subscribes to (via async pipe) emits. Combined with immutable data and signals, it keeps large UIs fast — but it means mutating an object in place will not be picked up.',
  },
  {
    id: 'angular.components',
    title: 'Angular Components',
    tags: ['angular'],
    summary: 'Components pair a TypeScript class with a template and styles.',
    content:
      'A component owns a piece of the screen. The class holds state and behaviour; the template renders it; the styles are scoped to it. Standalone components declare their own imports, so each component states exactly what it depends on.',
  },
  {
    id: 'angular.templates',
    title: 'Template Binding Syntax',
    tags: ['angular'],
    summary: 'Interpolation shows values, [property] passes data in, (event) listens.',
    content:
      '{{ expression }} renders a value as text. [property]="expression" evaluates the expression in the component and passes the result into a DOM property or child @Input. (event)="handler()" runs a class method when the event fires. Plain attribute="text" passes a literal string — a common source of bugs when a binding was intended. Templates can only reference members that exist on the component class; with strictTemplates the compiler enforces this.',
  },
  {
    id: 'angular.inputs-outputs',
    title: 'Inputs and Outputs',
    tags: ['angular'],
    summary: '@Input receives data from a parent; @Output emits events back up.',
    content:
      'Data flows down through inputs and events flow up through outputs. Bind an input with [name]="expression" and listen to an output with (name)="handler($event)". Marking an input { required: true } makes the compiler reject any usage that forgets to provide it.',
  },
  {
    id: 'angular.services-di',
    title: 'Services and Dependency Injection',
    tags: ['angular'],
    summary: 'Services hold shared logic; components receive them via injection.',
    content:
      "A service is a class for state or behaviour shared across components. Provide it with @Injectable({ providedIn: 'root' }) and receive it via constructor parameters or the inject() function. Components stay presentational when services own the logic.",
  },
  {
    id: 'angular.signals',
    title: 'Signals',
    tags: ['angular'],
    summary: 'Signals are reactive values that update the view when they change.',
    content:
      'A signal wraps a value: read it by calling it (count()), update it with set or update. computed() derives values that recalculate automatically. Signals make local component and store state reactive without manual subscription management.',
  },
  {
    id: 'typescript.interfaces',
    title: 'TypeScript Interfaces',
    tags: ['typescript'],
    summary: 'Interfaces describe the shape of an object at compile time.',
    content:
      'An interface lists property names and their types. The compiler checks every assignment and access against it, catching typos and wrong types before the code runs. Remember: interfaces are erased at build time — they do not validate data arriving at runtime.',
  },
  {
    id: 'typescript.union-types',
    title: 'Union Types',
    tags: ['typescript'],
    summary: "A union type lists the exact values or types something may be.",
    content:
      "type Status = 'online' | 'degraded' | 'offline' allows precisely those three strings. Unions turn vague strings and numbers into checked vocabularies, and the compiler forces you to handle each member when you switch over them.",
  },
  {
    id: 'typescript.narrowing',
    title: 'Narrowing',
    tags: ['typescript'],
    summary: 'Check a value first; TypeScript then knows its precise type.',
    content:
      "Narrowing is using runtime checks — if (!account) return, typeof x === 'string', Array.isArray(items) — so the compiler can prove what a value is afterwards. It replaces non-null assertions (!) and casts (as) with behaviour that is defined for every input.",
  },
  {
    id: 'typescript.strict-null-checks',
    title: 'Strict Null Checks',
    tags: ['typescript'],
    summary: 'Optional values must be handled before use under strict mode.',
    content:
      'With strictNullChecks, undefined and null are part of the type system: an optional parameter account?: Account cannot have its properties accessed until you prove it exists. The ! non-null assertion silences that proof requirement — and turns into a runtime crash whenever your assumption is wrong.',
  },
  {
    id: 'scss.component-styles',
    title: 'Component-Scoped SCSS',
    tags: ['scss'],
    summary: 'Component styles stay local; design tokens keep them consistent.',
    content:
      'Angular scopes component styles so they cannot leak into other components. Share colour and spacing decisions through design tokens (CSS custom properties) declared once, and prefer shallow selectors — deep nesting couples styles to DOM structure and makes refactoring risky.',
  },
  {
    id: 'zod.runtime-validation',
    title: 'Runtime Validation with Zod',
    tags: ['zod', 'api'],
    summary: 'Zod checks real data at runtime, where interfaces cannot.',
    content:
      'A Zod schema is a runtime description of a shape: z.object({ name: z.string() }). Parsing a payload against it either returns typed data or a detailed error. Validate wherever untrusted data enters the app — API responses, localStorage, URL params — so components only ever see data that matches its type.',
  },
  {
    id: 'zod.safe-parse',
    title: 'Zod safeParse',
    tags: ['zod'],
    summary: 'safeParse validates without throwing; you branch on success.',
    content:
      'schema.safeParse(data) returns { success: true, data } or { success: false, error } instead of throwing. Use it at boundaries where bad data is expected and you want a graceful fallback. z.coerce.number() and .transform() can also normalise near-miss data (like "720") while validating it.',
  },
  {
    id: 'zod.transform',
    title: 'Transforming with Zod',
    tags: ['zod'],
    summary: 'Schemas can normalise data as they validate it.',
    content:
      'z.coerce.number() turns "720" into 720; .transform(fn) runs arbitrary reshaping after validation; .default(v) fills a missing field. Doing this at the schema boundary means the rest of the app receives clean, canonical data and never has to patch payload quirks inline.',
  },
  {
    id: 'zod.default-values',
    title: 'Defaults and Optional Fields',
    tags: ['zod'],
    summary: 'Model absent data explicitly instead of letting undefined leak in.',
    content:
      'z.string().optional() allows a field to be missing; .default(v) substitutes a value when it is absent or undefined; .nullable() permits an explicit null. Choosing deliberately at the boundary keeps undefined out of your components and makes the “no data” case a designed state, not an accident.',
  },
  {
    id: 'zod.error-handling',
    title: 'Handling Validation Errors',
    tags: ['zod'],
    summary: 'A failed parse is data — read it, do not swallow it.',
    content:
      'safeParse returns { success: false, error } on failure. The ZodError lists each issue with its path and message. Map those into a friendly UI state and a developer-facing log; never catch-and-ignore, which turns a precise validation signal into a silent blank screen.',
  },
  {
    id: 'api.error-payloads',
    title: 'Error Payloads',
    tags: ['api'],
    summary: 'Error responses have shapes too — validate them like any other data.',
    content:
      'A 4xx or 5xx response usually carries a JSON body describing what went wrong. Treat it as untrusted input: validate it with its own schema, surface the message to the user when it is safe, and log the rest. Assuming an error body’s shape is how one failure cascades into a second crash on the error path.',
  },
  {
    id: 'testing.contract-tests',
    title: 'Contract Test Thinking',
    tags: ['testing', 'api'],
    summary: 'Pin the agreement between front end and back end with a test.',
    content:
      'A contract test asserts that a real (or recorded) API payload still satisfies your schema. When the back end changes a field, the contract test fails in CI — before customers hit the runtime error. It converts silent contract drift into a loud, early, fixable signal.',
  },
  {
    id: 'api.contract-drift',
    title: 'API Contract Drift',
    tags: ['api', 'java'],
    summary: 'Front end and back end slowly disagree about the payload shape.',
    content:
      'Contract drift happens when one side changes a field name, type or optionality and the other side keeps its old assumption — a Java DTO serialising a number as a string is a classic. Because TypeScript types are erased at runtime, drift surfaces as production errors, not compile errors. Defend with runtime validation at the boundary and alignment conversations with the API team.',
  },
  {
    id: 'api.status-codes',
    title: 'HTTP Status Codes',
    tags: ['api'],
    summary: '2xx success, 4xx caller problem, 5xx server problem.',
    content:
      '200 OK and 201 Created signal success. 400 means the request was malformed, 401/403 authentication/authorisation, 404 missing resource. 5xx codes mean the server failed. Error payloads should be treated as data too — read and validate them rather than assuming a shape.',
  },
  {
    id: 'git.branches-prs',
    title: 'Branches and Pull Requests',
    tags: ['git'],
    summary: 'Branch for a change, open a PR, review, then merge.',
    content:
      'A branch isolates work in progress. A pull request packages the branch for review: teammates comment, CI runs, and the change merges only when green and approved. Small, focused branches review faster and revert cleanly when something goes wrong.',
  },
  {
    id: 'testing.unit-tests',
    title: 'Unit Tests',
    tags: ['testing'],
    summary: 'Small, fast tests that pin down one behaviour each.',
    content:
      'A unit test arranges inputs, acts on one function or component, and asserts the outcome. Pure functions (scoring, validation, evaluation) are the easiest and most valuable to test. Cover the unhappy paths — empty data, invalid payloads — because that is where production incidents live.',
  },
  {
    id: 'nx.apps-vs-libs',
    title: 'Apps vs Libraries',
    tags: ['nx'],
    summary: 'Apps stay thin; the real code lives in libraries.',
    content:
      'In an Nx workspace an application is a thin shell that wires libraries together and configures build/deploy. The features, UI, data-access and utilities live in libraries so they can be owned, tested, tagged and reused independently. A common smell is a fat app with logic that should be in a lib.',
  },
  {
    id: 'nx.affected-graph',
    title: 'Affected Builds and the Dependency Graph',
    tags: ['nx'],
    summary: 'Nx rebuilds and retests only what a change can affect.',
    content:
      'Nx models the workspace as a dependency graph. `nx affected` uses it to run build/test/lint only for the projects touched by a change and everything downstream of them — not the whole repo. Reading the graph (`nx graph`) also reveals unexpected couplings before they bite.',
  },
  {
    id: 'nx.tag-rules',
    title: 'Tags and Boundary Rules',
    tags: ['nx'],
    summary: 'Tags plus lint rules enforce who may depend on whom.',
    content:
      'Each project declares tags (e.g. type:feature, type:ui, scope:orders). The enforce-module-boundaries lint rule reads depConstraints to allow or forbid dependencies by tag — features may use ui/util, ui may not import features, one scope may not reach into another. The rule turns architecture decisions into a failing lint instead of a code-review argument.',
  },
  {
    id: 'api.dto',
    title: 'Reading a DTO',
    tags: ['api', 'java'],
    summary: 'A DTO is the wire shape the back end promises — read it precisely.',
    content:
      'A Data Transfer Object defines the exact fields, types and nullability the API sends. Front-end models should mirror the DTO you actually receive, not what you wish it were: check each field name, its type (a number vs a numeric string), and whether it can be null or absent. Misreading the DTO is the root of most contract drift.',
  },
  {
    id: 'nx.libraries-boundaries',
    title: 'Nx Libraries and Boundaries',
    tags: ['nx'],
    summary: 'Split code into tagged libraries with enforced dependency rules.',
    content:
      'In an Nx workspace, apps stay thin and code lives in focused libraries: feature, ui, data-access, util. Tags on each project declare its role, and boundary rules keep dependencies pointed the right way — UI must not import features, content must not import UI. The dependency graph makes coupling visible before it becomes chaos.',
  },
  {
    id: 'git.undoing-changes',
    title: 'Undoing Changes: revert vs reset',
    tags: ['git'],
    summary: 'revert adds a new commit that undoes; reset rewrites history.',
    content:
      'git revert creates a new commit that reverses an earlier one — safe on shared branches because history only moves forward. git reset rewrites history and needs a force push, which breaks everyone who already pulled. On anything shared (like main), revert; keep reset for local work you have not pushed.',
  },
  {
    id: 'testing.flaky-tests',
    title: 'Flaky Tests and Determinism',
    tags: ['testing', 'cicd'],
    summary: 'A test that sometimes fails erodes trust in the whole suite.',
    content:
      'Tests must be deterministic: same code, same result, every run. The usual culprits are real clocks (new Date()), randomness, network calls and shared state between tests. Fix flakiness by controlling the inputs — inject a fixed clock, seed the random source, mock the network. Deleting or endlessly re-running a flaky test hides a real signal.',
  },
  {
    id: 'delivery.feature-flags',
    title: 'Feature Flags and Gradual Rollout',
    tags: ['cicd', 'incident-response'],
    summary: 'Flags separate deploying code from releasing it to users.',
    content:
      'A feature flag lets you ship code dark, enable it for a small percentage of users, watch the dashboards, and expand — or switch it off instantly without a deploy if something breaks. Rolling out gradually turns a potential incident into a contained observation. Big-bang releases give up that safety for no benefit.',
  },
  {
    id: 'incident.rollback-vs-hotfix',
    title: 'Rollback vs Hotfix',
    tags: ['incident-response'],
    summary: 'Restore service first; investigate root cause afterwards.',
    content:
      'When production is degraded, the first decision is how to restore service: roll back to the last good version, toggle the feature flag off, or ship a hotfix. Rollback and flags are usually fastest and safest; hotfixes carry the risk of a second incident. Communicate status early and write the root-cause analysis once customers are safe.',
  },
];
