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
    id: 'typescript.discriminated-unions',
    title: 'Discriminated Unions & Result Types',
    tags: ['typescript'],
    summary: 'A literal tag field lets the compiler prove which union member you hold.',
    content:
      "A discriminated union gives every member one shared field with a unique literal type — kind: 'ok' versus kind: 'err'. Comparing that tag narrows the whole object: inside if (r.kind === 'ok') the compiler knows r.value exists. The Result<T> pattern applies this to failure handling: return { kind: 'ok', value } or { kind: 'err', reason } instead of throwing or returning booleans, so failures travel on one typed channel and switch statements can be checked for exhaustiveness.",
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
    id: 'cdn.static-hosting',
    title: 'Static Hosting and CDNs',
    tags: ['cicd', 'incident-response'],
    summary: 'A built SPA is static files served from an edge network, not a running server.',
    content:
      'An Angular production build is just static assets — HTML, JS, CSS — uploaded to object storage (e.g. S3) and served through a CDN (e.g. CloudFront) that caches them at edge locations close to users. There is no application server executing your code; the browser downloads the bundle and runs it. Understanding that the CDN sits between your deploy and the user explains most "I deployed but nothing changed" mysteries.',
  },
  {
    id: 'cdn.hashed-assets',
    title: 'Content-Hashed Assets',
    tags: ['cicd'],
    summary: 'Hashed filenames let bundles cache forever while index.html stays fresh.',
    content:
      'A production build emits files like main.9f3c2a.js — the hash changes whenever the contents change. Because the name changes, a new deploy produces new URLs that were never cached, so hashed assets can be cached immutably (max-age far in the future). The one file that must NOT be cached long is index.html, because it is the map that points at the current hashed filenames.',
  },
  {
    id: 'cdn.cache-behaviour',
    title: 'Cache-Control and TTLs',
    tags: ['cicd'],
    summary: 'Cache-Control headers decide how long the edge and browser keep a file.',
    content:
      'Cache-Control tells the CDN and browser how long a response may be reused. Immutable, content-hashed assets take a long max-age (e.g. one year) safely. Entry files that keep the same URL across deploys — index.html, service workers, config — need a short or no-cache TTL so users pick up the new version quickly. The classic outage is caching index.html as long as the assets it points to.',
  },
  {
    id: 'cdn.invalidation',
    title: 'Cache Invalidation',
    tags: ['cicd', 'incident-response'],
    summary: 'Invalidate the edge cache to force it to re-fetch after a deploy.',
    content:
      'A CDN keeps serving a cached object until its TTL expires or you invalidate it. After a deploy, invalidating the paths that reuse the same URL (e.g. /index.html) makes the edge fetch the fresh copy instead of serving the stale one. Hashed assets rarely need invalidation because their URLs change; the files that keep their names are exactly the ones to invalidate.',
  },
  {
    id: 'deploy.environment-config',
    title: 'Environment Configuration',
    tags: ['cicd'],
    summary: 'Keep environment values out of the bundle build; inject them per environment.',
    content:
      'API URLs, feature toggles and keys differ per environment. Baking a production URL into a build meant for staging — or shipping a staging URL to production — is a common outage. Prefer configuration resolved per environment (build-time environment files or a runtime config file the app fetches) so the same pipeline promotes cleanly from staging to production without a rebuild that could drift.',
  },
  {
    id: 'deploy.verification',
    title: 'Deployment Verification',
    tags: ['cicd', 'incident-response'],
    summary: 'Prove the new version is actually live before calling a deploy done.',
    content:
      'A deploy is not finished when the pipeline goes green — it is finished when users are served the new version. Verify with a smoke test against the real URL, a version/build stamp you can read from the running app, and a check that the edge is serving the new hashed bundle. Skipping verification is how a "successful" deploy still leaves an old bundle live.',
  },
  {
    id: 'incident.impact-assessment',
    title: 'Impact Assessment and Severity',
    tags: ['incident-response'],
    summary: 'Size the blast radius first: who is affected, how badly, and how widely.',
    content:
      'Before fixing anything, assess impact: which users, which features, what fraction of traffic, and whether data is at risk. That assessment sets the severity, which drives the response — who is paged, how often you communicate, and whether you roll back immediately. Guessing the severity wrong in either direction wastes the first, most valuable minutes of an incident.',
  },
  {
    id: 'incident.observability',
    title: 'Logs, Metrics and Traces',
    tags: ['incident-response'],
    summary: 'Let the data locate the failure instead of guessing from symptoms.',
    content:
      'During an incident, metrics (error rate, latency, saturation) show what changed and when; logs and traces show why. Correlate the spike with a deploy, a config change or a traffic shift before forming a theory. Reading the signals first — rather than jumping to a favourite cause — is what separates a five-minute diagnosis from an hour of guessing.',
  },
  {
    id: 'incident.communication',
    title: 'Incident Communication',
    tags: ['incident-response'],
    summary: 'Tell stakeholders what is happening early, clearly and regularly.',
    content:
      'A timely status update — what is affected, what you are doing, when the next update lands — buys trust and stops duplicate escalations. Communicate impact in user terms, not internals, and keep a steady cadence even when there is "nothing new". Silence during an incident is its own second incident: support and customers fill the gap with worst-case assumptions.',
  },
  {
    id: 'incident.post-mortem',
    title: 'Blameless Post-Incident Review',
    tags: ['incident-response'],
    summary: 'Fix the system that allowed the failure, not the person who tripped it.',
    content:
      'After service is restored, a blameless review reconstructs the timeline, identifies contributing causes, and produces concrete action items with owners. The goal is a more resilient system — better validation, safer rollouts, faster detection — not attributing fault. Blame drives information underground; a blameless culture is what makes the next incident shorter.',
  },
  {
    id: 'incident.rollback-vs-hotfix',
    title: 'Rollback vs Hotfix',
    tags: ['incident-response'],
    summary: 'Restore service first; investigate root cause afterwards.',
    content:
      'When production is degraded, the first decision is how to restore service: roll back to the last good version, toggle the feature flag off, or ship a hotfix. Rollback and flags are usually fastest and safest; hotfixes carry the risk of a second incident. Communicate status early and write the root-cause analysis once customers are safe.',
  },
  {
    id: 'fp.pure-functions',
    title: 'Pure Functions',
    tags: ['typescript'],
    summary: 'Same input, same output, nothing outside read or written.',
    content:
      'A pure function depends only on its parameters and changes nothing outside itself: no module-level reads, no mutation, no I/O. The payoff is predictability — pure functions are testable with plain assertions, safe to reuse anywhere, and composable without ordering surprises. Keep domain logic pure and push side effects (HTTP, storage, logging) to the edges of the program.',
  },
  {
    id: 'fp.immutability',
    title: 'Immutability & Copy-on-Write',
    tags: ['typescript'],
    summary: 'Create new objects and arrays instead of changing shared ones.',
    content:
      'JavaScript objects and arrays are shared by reference, so mutating a parameter changes every holder of that reference. Copy-on-write avoids the leak: spread into a new object ({ ...state, field }) or array ([...items]), and use non-mutating methods. Review checklist: push, splice, direct property assignment and in-place sort/reverse on anything the function did not create locally.',
  },
  {
    id: 'fp.higher-order-functions',
    title: 'map, filter & reduce',
    tags: ['typescript'],
    summary: 'Declarative array transformation: transform, gate, then fold.',
    content:
      "map turns T[] into U[] by collecting the callback's returned values — if the result is ignored, use forEach instead. filter keeps elements that pass a predicate. reduce folds an array into one value from an explicit seed; without the seed the first element becomes the accumulator and an empty array throws. Chained together they read like the requirement: transform, gate, fold.",
  },
  {
    id: 'fp.composition',
    title: 'Closures & Composition',
    tags: ['typescript'],
    summary: 'Functions that make functions, and pipelines that read in order.',
    content:
      'A closure captures the variables of its creation site, so a factory like makeTaxer(rate) returns a specialised pure function with its configuration baked in — each call captures fresh values. Composition chains such functions: pipe(f, g, h) runs left to right (f first), while classical compose runs right to left. Prefer the form that lets the code read in the same order as the requirement.',
  },
  {
    id: 'rx.observables',
    title: 'Observables: Streams, Not Values',
    tags: ['angular', 'typescript'],
    summary: 'An Observable produces values over time — and is lazy until subscribed.',
    content:
      'Observable<T> is a producer of T values over time: it can emit many times, error, or complete, and nothing runs until something subscribes (a cold Observable runs its producer once per subscription). Read users$ as "a stream that emits user arrays", never as the array itself, and keep the $ suffix so streams stay visible. Promises settle exactly once; streams are the general tool for events, form input, HTTP and sockets.',
  },
  {
    id: 'rx.operators',
    title: 'Operators: map, tap & catchError',
    tags: ['angular'],
    summary: 'map transforms emissions, tap observes them, and catchError replaces the stream where it sits.',
    content:
      'RxJS map emits the value your function returns; tap runs a side effect and forwards the ORIGINAL value — anything returned from tap is discarded, so transformations in tap silently vanish. catchError swaps the errored stream for the one you return, at the level it is placed: on the outer pipe it replaces (and so ends) the whole stream, while inside a flattening projection it sacrifices only that one inner request and the outer stream keeps listening.',
  },
  {
    id: 'rx.subscriptions',
    title: 'Subscription Cleanup',
    tags: ['angular'],
    summary: 'Every subscribe must answer: who unsubscribes?',
    content:
      'An active subscription outlives its component unless something completes or unsubscribes it — stacked timers and duplicate handlers are the classic leak. Prefer consumption that cleans up for you: the async pipe (unsubscribes with the view), toSignal (cleans up with the injection context), or takeUntilDestroyed in the pipe. Reserve manual unsubscribe bookkeeping for the rare case none of those fit, and never nest subscribes — compose instead.',
  },
  {
    id: 'rx.flattening',
    title: 'switchMap & Flattening Strategies',
    tags: ['angular'],
    summary: 'When new work arrives mid-flight: cancel, queue, ignore, or run both.',
    content:
      'A flattening operator answers one question: what happens to overlapping inner work? switchMap cancels the previous inner Observable (latest-only: search, route data). concatMap queues so every value runs in order (autosave, sequential writes). exhaustMap ignores new values while busy (submit buttons, payments). mergeMap runs everything concurrently — which lets slow old responses overwrite fresh ones, the classic stale-search bug. Name the requirement first; it names the operator.',
  },
  {
    id: 'forms.typed-controls',
    title: 'Typed Form Controls',
    tags: ['angular', 'typescript'],
    summary: 'FormControl<T> ties value, setValue and valueChanges to one contract.',
    content:
      'Typed reactive forms give every control a value type: FormControl<string> means value is string, setValue accepts only string, and valueChanges is Observable<string>. The type is inferred from the initial value. This protects the CODE around the form — reading a quantity as number when the control holds a string is now a compile error, not a two-year-old production bug. Access controls through group.controls.name (fully typed) rather than get(\'name\') (returns AbstractControl<any> | null).',
  },
  {
    id: 'forms.nullability',
    title: 'Form Nullability & NonNullableFormBuilder',
    tags: ['angular', 'typescript'],
    summary: 'Default controls reset to null; nonNullable controls reset to their initial value.',
    content:
      'A default FormControl(\'\')  types as string | null because reset() without arguments installs null — the classic Clear-button crash. NonNullableFormBuilder (or { nonNullable: true }) removes null from the type AND changes reset() to restore the initial value. Choose per control: nonNullable when a sensible default exists and absence is meaningless; keep T | null when absence is genuine data (an optional date of birth) — never fake absence with sentinel values.',
  },
  {
    id: 'forms.value-vs-raw',
    title: 'value vs getRawValue',
    tags: ['angular'],
    summary: 'value excludes disabled controls; getRawValue is the complete form state.',
    content:
      'group.value reports ENABLED controls only, which is why its type marks every property optional — any control might be disabled at runtime. Disabling preserves a control\'s data but removes it from value, the source of the classic half-payload submit bug. getRawValue() includes every control regardless of disabled state and types without optionality. Ask per call site: "what did the user actively edit?" → value; "what is the complete state?" (submits, drafts) → getRawValue.',
  },
  {
    id: 'forms.validators',
    title: 'Validators',
    tags: ['angular', 'typescript'],
    summary: 'A validator is a pure function: control in, ValidationErrors | null out.',
    content:
      'Custom validators are pure verdicts: read the control, return null for valid or an errors object ({ myRule: details }) for invalid. Any non-null return — including an empty object — marks the control invalid, so never return {} for success. Validators must not cause side effects: no setValue on siblings, no HTTP, no analytics — they run on every value change and side effects create validation loops. Carry details in the error object so templates can render the requirement.',
  },
  {
    id: 'forms.valuechanges',
    title: 'valueChanges & statusChanges',
    tags: ['angular'],
    summary: 'Typed streams from controls — future changes only, with two classic traps.',
    content:
      'Every control and group publishes valueChanges (typed values) and statusChanges (VALID/INVALID/…) — full RxJS streams, so debounce, distinctUntilChanged and switchMap all apply. Two traps: valueChanges does NOT emit the current value on subscribe (prepend startWith(control.value) or seed toSignal with an initialValue); and calling setValue inside your own valueChanges handler loops forever — pass { emitEvent: false } to write without re-triggering the stream.',
  },
  {
    id: 'signals.computed',
    title: 'Computed Signals',
    tags: ['angular'],
    summary: 'computed() derives a value from other signals — memoised, pure, drift-proof.',
    content:
      'A computed signal recalculates from the signals it reads, only when one of them changes, and caches the result between changes. Because it is the ONLY writer of its own value, derived state cannot drift from its sources — delete hand-synchronised copies and derive instead. Keep the lambda pure: no setting other signals, no HTTP, no side effects; a computed answers "what is the value?" and nothing else. Chaining computeds (format(display(result())) style) is cheap and encouraged.',
  },
  {
    id: 'signals.effects',
    title: 'Effects',
    tags: ['angular'],
    summary: 'effect() re-runs when signals it reads change — reserve it for side effects.',
    content:
      'An effect runs its lambda once, records every signal it read, and re-runs when any of them changes. Use it at the edge of the app: logging, analytics, localStorage sync, integrating non-Angular libraries. The classic misuse is deriving state — effect(() => total.set(price() * qty())) makes total a writable, late, second source of truth; computed(() => price() * qty()) makes drift impossible. To read a signal WITHOUT registering it as a trigger, wrap the read in untracked(() => …).',
  },
  {
    id: 'signals.equality',
    title: 'Signal Equality & Immutable Updates',
    tags: ['angular', 'functional-programming'],
    summary: 'Signals compare by reference — mutating in place notifies nobody.',
    content:
      "Before notifying readers, a signal checks whether the value actually changed — by reference for objects and arrays. update(list => { list.push(item); return list; }) returns the SAME array, so the signal stays silent and the view freezes. Produce fresh references instead: [...list, item] for arrays, ({ ...obj, name }) for objects. This is the immutability discipline from functional programming made mandatory: change means a new value, not a modified old one — and OnPush input checks live by the same rule.",
  },
  {
    id: 'signals.cd-cycle',
    title: 'Change Detection Cycles',
    tags: ['angular'],
    summary: 'zone.js triggers cycles after async events; default strategy checks every binding.',
    content:
      'Angular never watches your properties. Instead zone.js patches the async entry points — DOM events, setTimeout/setInterval, resolved promises, XHR — and when any completes, Angular re-checks the component tree. Under the default strategy that means EVERY binding in EVERY component, which is why {{ someFunction() }} in a template re-runs on every keystroke anywhere in the app: arbitrary work placed inside the hottest loop. Move template computations into computed signals or pure pipes so they run only when their inputs change.',
  },
  {
    id: 'signals.rxjs-interop',
    title: 'Signals ↔ RxJS Interop',
    tags: ['angular', 'rxjs'],
    summary: 'toSignal brings streams in as current state; toObservable lends signals the operator toolkit.',
    content:
      "Signals hold what things ARE; streams describe what HAPPENS — the bridges let each do its job. toSignal(stream$, { initialValue }) subscribes immediately, exposes the latest value as a signal, and unsubscribes automatically with the component's DestroyRef (no takeUntilDestroyed needed). Always provide initialValue (or handle undefined): the signal has no value until the first emission. toObservable(sig) emits on every change so you can debounceTime, switchMap and friends — the standard shape for search boxes: toSignal(toObservable(query).pipe(debounceTime(300), switchMap(fetch)), { initialValue: [] }).",
  },
  {
    id: 'di.injector-tree',
    title: 'Injector Hierarchy',
    tags: ['angular'],
    summary: 'Resolution walks up from the asker; the nearest provider wins.',
    content:
      "Injectors form a tree: component injectors at the leaves, route injectors above them, the root injector at the top (and the empty NullInjector above that). inject(Token) walks UP from the asking component and stops at the first injector holding a recipe for the token — nearest wins, root is the fallback. A providers entry on a component therefore scopes a fresh instance per component instance (deliberate scoping: per-tab state), and reaching the NullInjector empty-handed throws NullInjectorError: no level on the path had a recipe. Remember: TypeScript imports and DI providers are unrelated — adding a provider to fix a missing import mints accidental per-component instances.",
  },
  {
    id: 'di.provider-recipes',
    title: 'Provider Recipes',
    tags: ['angular'],
    summary: 'useClass constructs, useValue hands over, useFactory computes, useExisting aliases.',
    content:
      'A provider maps a token (the question) to a recipe (the answer). useClass: construct this class instead — a NEW instance for that token. useValue: here is the finished object — ideal for config. useFactory: run this function to build the answer; it may declare deps or call inject() inside, making it the only recipe that can decide at runtime (environment forks, feature flags). useExisting: construct NOTHING — resolve that other token and hand over the same instance, the alias recipe that keeps old and new APIs sharing one state during migrations. Choosing useClass where useExisting was meant is the classic two-instances bug.',
  },
  {
    id: 'di.injection-token',
    title: 'InjectionToken',
    tags: ['angular', 'typescript'],
    summary: 'A runtime key for injecting non-class values — config, callbacks, interfaces.',
    content:
      "The injector is a runtime map, and TypeScript erases interfaces at compile time — so an interface cannot be a token: nothing survives to use as the key. Classes work because they are both a type and a runtime value. For everything else, create const MY_CONFIG = new InjectionToken<MyConfig>('my.config') — a unique runtime object carrying its type as a generic. Provide against the token object itself ({ provide: MY_CONFIG, useValue: {...} }); a string in its place registers under a DIFFERENT key. An optional factory default ({ factory: () => ... }) makes the token work with zero providers — handy in specs — while an explicit provider overrides it.",
  },
  {
    id: 'di.injection-context',
    title: 'Injection Context',
    tags: ['angular'],
    summary: 'inject() only works while Angular is constructing something — capture early, use later.',
    content:
      'inject() reads an injection context that Angular opens during construction (field initialisers, constructors, provider factories) and closes immediately after — calling it from a click handler, timer or subscription callback throws NG0203. The pattern: ask during construction, store the reference, use it any time. The context is also a composition feature: a plain function called during construction inherits the CALLER’s injector, so utilities can inject(DestroyRef) and register their own cleanup — this is how takeUntilDestroyed works. For rare late-injection needs, capture an Injector or EnvironmentInjector early and use runInInjectionContext.',
  },
  {
    id: 'di.testing',
    title: 'Overriding Providers in Tests',
    tags: ['angular', 'testing'],
    summary: 'TestBed is an injector you configure — provide fakes for the same tokens.',
    content:
      "TestBed.configureTestingModule({ providers: [...] }) builds the spec's injector; a provider there shadows any providedIn: 'root' recipe for the same token (nearest wins, as always). Fake collaborators with useValue and jasmine spies — { provide: CartService, useValue: { add: jasmine.createSpy('add') } } — so the component under test runs unchanged while the test decides what arrives. Assert via TestBed.inject(Token): it resolves the same instance the component received. Fake INPUTS (environment services, HttpClient, config tokens), never transport internals like window.fetch, and remember a plain arrow function is not a spy — toHaveBeenCalled needs jasmine.createSpy.",
  },
  {
    id: 'routing.route-config',
    title: 'Route Configuration',
    tags: ['angular'],
    summary: 'A Routes array maps URLs to components; the outlet renders the match.',
    content:
      "Routing is configuration: { path: 'projects', component: ProjectListComponent } entries matched first-match-wins in array order (which is why the '**' wildcard goes last). The matched component renders into <router-outlet/>. routerLink navigates by swapping the outlet's content — same document, state preserved; a plain href triggers a full browser load that destroys and re-bootstraps the app. children nest routes under a parent that renders shared layout plus its OWN router-outlet — one outlet per nesting level. Empty-path redirects ({ path: '', redirectTo: 'dashboard', pathMatch: 'full' }) give sections a canonical default URL; pathMatch: 'full' stops the empty path from prefix-matching every sibling.",
  },
  {
    id: 'routing.params',
    title: 'Route Params',
    tags: ['angular'],
    summary: 'Same route + same component = reused instance — read params as a stream.',
    content:
      "Navigating project/1 → project/2 does NOT recreate the component: the router reuses the instance and updates the params. route.snapshot.paramMap is a photo taken when you read it — code that reads it at construction shows the first id forever (the classic frozen detail page with prev/next buttons). Read paramMap as a stream (pipe into toSignal) or enable withComponentInputBinding() so the router writes params into @Input setters on every change. snapshot IS safe when the instance cannot outlive one param value — a page only reachable by full navigation from elsewhere. The same rule applies to resolved route data: route.data is a stream too.",
  },
  {
    id: 'routing.lazy-loading',
    title: 'Lazy Loading',
    tags: ['angular'],
    summary: 'loadComponent/loadChildren split routes into chunks fetched on first navigation.',
    content:
      "loadComponent: () => import('./admin.component').then(m => m.AdminComponent) (or loadChildren for a whole subtree) makes the dynamic import a build-time split point: everything reachable only through it moves into a separate chunk, shrinking the initial bundle, and the router downloads the chunk on the FIRST navigation to that route. Consequences: the first click on a lazy area awaits the download (soften with a preloading strategy), and code nobody navigates to is never fetched. Pair with canMatch guards to reject a navigation BEFORE the chunk downloads — unauthorized users then never fetch the code at all.",
  },
  {
    id: 'routing.guards',
    title: 'Route Guards',
    tags: ['angular'],
    summary: 'canActivate/canMatch guard entry, canDeactivate guards exit — redirect with UrlTree, not false.',
    content:
      "Guards are functions the router runs mid-navigation: return true to proceed, false to cancel dead (the user sees nothing — almost never right), or a UrlTree (router.createUrlTree(['/login'], { queryParams: { returnTo: state.url } })) to cancel-and-redirect atomically. Place guards on a PARENT route to cover the whole subtree — never copy them onto every child. canMatch runs before a lazy chunk downloads; canActivate runs after matching; canDeactivate receives the component being LEFT and can return a confirm dialog's Observable<boolean> to protect unsaved work (window.onbeforeunload never fires for router navigations — the document doesn't unload). Debug dead navigations with router events: NavigationCancel during the guards phase means a guard said no.",
  },
  {
    id: 'routing.resolvers',
    title: 'Resolvers & Route Data',
    tags: ['angular'],
    summary: 'Resolvers fetch during navigation — data ready at activation, wait moved into the transition.',
    content:
      "A ResolveFn runs while the navigation is in flight: the URL only commits once the data arrives, and the component activates with route.data populated. The trade is honest: the skeleton-flash inside the page disappears, but the wait moves into the navigation itself — show a navigation progress indicator or clicks feel dead. Two failure modes to avoid: swallowing errors into of(null) makes a failed fetch 'succeed' into a page whose data is a lie (cancel or redirect instead), and reading route.data via snapshot at construction freezes the page when params change on a reused instance — data is a stream, read it like one.",
  },
  {
    id: 'routing.preloading',
    title: 'Preloading Strategies',
    tags: ['angular'],
    summary: 'Download lazy chunks in idle time after startup — all of them, or the ones data says you should.',
    content:
      "withPreloading(PreloadAllModules) fetches every lazy chunk once the app is interactive: initial load stays lean, first clicks find chunks already cached. When 'all' is wasteful (mobile traffic, many niche areas), a custom PreloadingStrategy decides per route — preload: (route, load) => route.data?.['preload'] ? load() : of(null) — and analytics tells you which routes to flag. Caution: preloading runs OUTSIDE navigation, so canMatch guards do not gate it; a route both guarded and flagged for preload downloads its chunk for users the guard would refuse unless the strategy itself consults auth state. Route-level providers pair well here: a providers array on a route scopes services to that subtree.",
  },
  {
    id: 'http.client-observables',
    title: 'HttpClient & Observables',
    tags: ['angular', 'api'],
    summary: 'HttpClient calls return cold observables — the request fires per subscription.',
    content:
      'http.get/post/… BUILD a request description and return it as a cold observable: with no subscriber (no subscribe, async pipe, toSignal or firstValueFrom) nothing is ever sent — the classic empty-network-tab mystery. Conversely each ADDITIONAL subscription re-executes the request: two async pipes on one post$ means two POSTs (double orders). For reads, share the execution (shareReplay) when several consumers need one answer; for mutations, wire exactly-one execution deliberately in the handler and let templates read the RESULT. The observable completes after one response — HTTP streams are one-shot.',
  },
  {
    id: 'http.interceptors',
    title: 'HTTP Interceptors',
    tags: ['angular', 'api'],
    summary: 'Cross-cutting request concerns in one gate — clone requests, mind the chain order.',
    content:
      "A functional interceptor — (req, next) => next(req.clone({ setHeaders: {...} })) — sees every request and response: auth tokens, tracing headers, logging and error policy live once instead of at 41 call sites. Requests are immutable BY DESIGN: they can be re-executed (retries, resubscribes) and flow through a chain, so handlers clone-with-changes rather than mutate — a mutated request would be re-decorated on every retry. Chain order is nesting order: earlier interceptors wrap later ones. A useful default: auth → logging → retry, so logs show the request as actually sent and every retry attempt is both tokened and visible.",
  },
  {
    id: 'http.resilience',
    title: 'Retries & Timeouts',
    tags: ['api', 'angular'],
    summary: 'Retry transient failures on idempotent requests only — back off, cap, time out.',
    content:
      'A retry is a re-execution, so ask first: is running this twice safe? GETs yes; an unguarded POST /payments no — a timed-out request may have SUCCEEDED server-side (the response was lost, not the charge), and re-sending charges again. Make mutations retry-safe with a client-generated Idempotency-Key the server deduplicates on — the key stays FIXED across retries of one intent. Then retry only transient classes (5xx, 429, status 0 network), never deterministic 4xx; delay attempts with exponential backoff (1s, 2s, …) so a drowning service can breathe; cap at 2–3 attempts; and put timeout() on everything so slow failures fail fast instead of hanging the UI.',
  },
  {
    id: 'http.list-design',
    title: 'List Endpoint Design',
    tags: ['api'],
    summary: 'HttpParams is immutable; pagination by cursor survives inserts where offset repeats.',
    content:
      "HttpParams.set returns a NEW instance — params.set('q', v) as a statement discards its result (chain or reassign, like signals updates). On the endpoint side: limit/offset paginates by POSITION in a moving list, so inserts above shift every offset and page 2 re-serves page-1 rows — feeds and insert-heavy tables want a CURSOR (?after=<sortKey:id>), which anchors continuation by VALUE and cannot repeat. Always give pagination a deterministic order (sort key + id tiebreaker). Optional filters are cleanest omitted-when-absent — no 'all' sentinels — and clients should trust the server's answer rather than silently re-filtering it.",
  },
  {
    id: 'http.caching',
    title: 'Caching & Invalidation',
    tags: ['angular', 'api'],
    summary: 'shareReplay dedupes executions; mutations must reset the caches they falsify.',
    content:
      'shareReplay({ bufferSize: 1 }) turns N subscribers into one upstream execution with the last value replayed to newcomers — right for read-mostly data like config. Its liabilities: an ERROR is replayed to every future subscriber (retry before the share), and the memory lives until something resets it. For mutable data, give the cache a reset switch: refresh$ = new BehaviorSubject<void>(undefined), orders$ = refresh$.pipe(switchMap(fetch), shareReplay(...)), and every mutation taps refresh$.next() on success — the mutation is the one code that knows the exact moment the cache became a lie. Never mutate a replayed value in place: same reference, no re-emission. refCount: true drops the cache when the last subscriber leaves — a safe default for mutable lists.',
  },
  {
    id: 'state.kinds',
    title: 'Kinds of State',
    tags: ['angular'],
    summary: 'Server, UI, derived and URL state are different problems with different homes.',
    content:
      'Before choosing a store, name the kind. SERVER state (orders, profiles) is owned elsewhere — you hold a cache, so staleness and invalidation are its real problems. UI state (modal open, accordion expanded) is born and dies with a view — component signals, as local as possible, promoted only when a second distant consumer genuinely appears. DERIVED state (totals, filtered lists, canSave) is computable from the others and must NEVER be stored — every stored derivable is a drift waiting for the update site someone forgets. URL state (filters, tabs, selected ids) should survive refresh and travel in links — query params give persistence, sharing and back/forward for free.',
  },
  {
    id: 'state.signal-store',
    title: 'Signal Stores',
    tags: ['angular'],
    summary: 'Private writable signals, public readonly views, computed selectors, named mutations.',
    content:
      "The house store pattern: an @Injectable service holding private writable signals (_items = signal([])), exposing items = this._items.asReadonly() plus computed selectors (count, total), and mutating ONLY through methods with business names (addItem, removeItem). The split makes the store the only writer — the mutation surface is enumerable, 'who changed this' reads one class, and invariants have exactly one home. Extending it follows one rule: new FACTS become private signals with named mutations; new CONSEQUENCES extend existing computeds. If a value can be computed from the others, it is never stored.",
  },
  {
    id: 'state.single-source',
    title: 'Single Source of Truth',
    tags: ['angular'],
    summary: 'Copies drift — read through to the source; the only honest copy is an editing draft.',
    content:
      'Every copy of shared state needs sync code, and sync code is where truth dies — the classic symptom is one rename showing three different names across dialog, sidebar and tab. The fix is subtraction: components hold IDs and read entities THROUGH the store with computeds; a mutation updates the store once and every reader is current by construction. The one legitimate copy is the editing DRAFT: a form deliberately diverging from the source, initialised from it, committed on save, discarded on cancel — which is why live-syncing form controls straight into shared state (breaking Cancel, shipping half-typed values) is the over-application to avoid. Display reads through; editing drafts.',
  },
  {
    id: 'state.when-ngrx',
    title: 'When NgRx',
    tags: ['angular'],
    summary: 'Actions are facts that persist — buy the ceremony when "what happened, in order" is a requirement.',
    content:
      "NgRx's cycle: components dispatch ACTIONS (past-tense facts — '[Orders API] Orders Loaded', never command-style setOrders), pure REDUCERS fold facts into new state (no mutation, no Date.now(), no I/O — or replay breaks), SELECTORS expose the read side, effects handle the world. What it adds over a signal store with named methods: changes as serialisable DATA — full history in devtools, time-travel, many features reacting to one fact, incident reconstruction from logs. Buy it per feature slice when those questions are real (many independent writers, cross-team event flows, audit requirements, replay); a one-form preferences page pays the same ceremony for nothing. Facts carry their context (who, when) on the action — reducers reading ambient state or clocks stop being replayable.",
  },
  {
    id: 'state.server-state',
    title: 'Server State',
    tags: ['angular', 'api'],
    summary: 'Client-held server data is a cache — model status as data and let mutations invalidate.',
    content:
      "You do not own server data; you hold a copy with a timestamp. Model the request status as data, not booleans: a Remote<T> union — idle | loading | loaded {data, fetchedAt, refreshing} | error {error, stale?} — can express 'loaded but refreshing' and 'errored with a stale copy worth showing', which isLoading cannot (the eternal spinner is a missing error state). Wire invalidation to the events that falsify the cache: the app's own mutations, workspace/tenant switches (reset, or the old tenant's data flashes), and staleness rules from fetchedAt. For refreshes, prefer stale-while-revalidate — show the loaded data with a subtle refreshing indicator and swap when fresh arrives, deferring the swap while the user is mid-interaction.",
  },
  {
    id: 'perf.measure-first',
    title: 'Measure Before Optimising',
    tags: ['angular'],
    summary: 'Profile, rank the costs, optimise the top — hunches point at interesting code, not expensive code.',
    content:
      'Optimisation effort pays proportionally to the slice it targets: a week on a 3% slice caps its win at 3%. So rule one: no optimisation without a measurement someone can re-run — DevTools profiler for CPU, the network waterfall for requests, Lighthouse/field vitals for user experience. Rank the costs, fix the top, re-measure. Distinguish LATENCY (a rare 8s export — manageable with honest progress feedback) from RESPONSIVENESS (a freeze while typing — a blocked main thread no spinner can excuse): responsiveness is the floor. And apply the rule to your own favourite refactor too — even the good migration waits for its ranking.',
  },
  {
    id: 'perf.bundle-size',
    title: 'Bundle Size',
    tags: ['angular'],
    summary: 'Bytes cost twice — download AND main-thread parse/execute — and imports decide what ships.',
    content:
      "Every shipped byte is paid twice: over the network (scales with connection) and in parse/compile/execute on the main thread (scales with the user's WORST device — fibre does not ship a faster CPU). Run the bundle analyzer and read the treemap: tree-shaking removes only what is provably unreachable, so import styles matter — import _ from 'lodash' ships the library; side-effect imports are never shaken; barrel files couple fates (import one export and every side-effectful sibling rides along — the removed-widget-still-shipping ghost). Budgets in CI catch regressions of the known; the analyzer finds the unknown.",
  },
  {
    id: 'perf.rendering',
    title: 'Rendering Performance',
    tags: ['angular'],
    summary: 'Track identity so refreshes patch DOM; virtualise so only the viewport has DOM.',
    content:
      "Long lists have two separate costs. CHANGE cost: @for diffs by the track expression — track entry (object identity) sees every polled refresh as ten thousand strangers and rebuilds the list (flash, lost scroll, closed menus); track entry.id matches rows across refreshes so unchanged rows keep their DOM. EXISTENCE cost: ten thousand live DOM nodes burn layout, style and memory even when nothing changes — virtual scrolling (cdk-virtual-scroll-viewport) renders only the visible window and recycles rows, making DOM cost O(viewport) instead of O(data). For high-frequency events that change no app state (mousemove crosshairs), subscribe inside NgZone.runOutsideAngular and draw directly — re-enter the zone (or set a signal, throttled) only when real state changes.",
  },
  {
    id: 'perf.memory-leaks',
    title: 'Memory Leaks',
    tags: ['angular'],
    summary: 'Leaks are references that outlive their purpose — prove them with heap snapshot diffs.',
    content:
      'GC collects the unreachable, so a leak is always a REFERENCE: a long-lived holder keeping a short-lived object alive. The workflow: heap snapshot, repeat the suspected action ×10, snapshot again, diff — leaked objects appear ten-fold; the retainer chain then names the holder. Usual suspects: subscriptions/listeners on service-owned sources whose callbacks capture `this` (deregister on destroy — takeUntilDestroyed, or socket.off in DestroyRef.onDestroy); setInterval without clearInterval (an immortal timer pinning its closure); static or root-service caches with no eviction (an unbounded Map is a leak with a business justification — bound it with LRU/max-entries/TTL); detached DOM nodes captured in closures.',
  },
  {
    id: 'perf.web-vitals',
    title: 'Web Vitals & Assets',
    tags: ['angular'],
    summary: 'LCP/INP/CLS proxy user moments; field data is truth, lab data is for debugging.',
    content:
      'The vitals name feelings: LCP — when the main content APPEARS (hero image size/priority, server latency, render-blocking JS; never loading="lazy" on the LCP element — priority exists to name it); INP — when I interact, how fast the page RESPONDS (long main-thread tasks, heavy handlers, oversized change detection); CLS — does the page hold STILL (reserve space: width/height on images, fixed containers for banners, geometry-true skeletons — late content fills in instead of shoving the layout under fingers). Assets: serve what the layout renders — srcset/NgOptimizedImage right-sizes (a 2400px PNG in a 320px card discards ~98% of its pixels), WebP/AVIF on top, lazy below the fold. Lab numbers (your laptop) are for debugging; FIELD numbers (real users, p75) are how the product actually performs — a 4× lab/field gap is the fibre-laptop assumption, measured. Loading UX: progressive sections beat all-or-nothing spinners — never gate the whole page on its slowest request.',
  },
  {
    id: 'arch.io-contracts',
    title: 'Input/Output Contracts',
    tags: ['angular'],
    summary: 'Inputs carry the narrowest data the render needs; outputs name user intent.',
    content:
      "A component's inputs and outputs ARE its API — design them like REST endpoints. Inputs: the data to render (a User), never the source that can find it (the UserStore) — passing sources couples the component to their API, kills reuse anywhere the source doesn't exist, enables hidden writes, and makes specs need fakes instead of plain objects. Outputs: name the user's INTENT at the component's level of authority — (deleteRequested), not (trashClicked) (mechanics age with the design) and not (orderDeleted) (the row can't know the API succeeded). Children report intent; parents decide what happens. A child injecting its parent component to steer it is the coupling anti-pattern — control flows down, intent flows up.",
  },
  {
    id: 'arch.content-projection',
    title: 'Content Projection',
    tags: ['angular'],
    summary: 'Own the frame, project the filling — slots end configuration-flag sprawl.',
    content:
      'When a component keeps growing inputs that describe CONTENT (titleIcon, badgeText, subtitleTemplate…), it is refusing projection: <ng-content select="[panel-title]" /> hands the region to the caller, who composes whatever they need from components they already own. The durable rule for what stays an input: inputs configure what the component DOES (collapse behaviour, variant styling — things it implements); projection supplies what the caller SHOWS. Projected content wears its author\'s style scoping and belongs to the caller in every sense. Plain slots are stamped once and carry no data — when content must render per item with context (table cells needing their row), use ng-template with ngTemplateOutlet context instead.',
  },
  {
    id: 'arch.composition',
    title: 'Composition Patterns',
    tags: ['angular'],
    summary: 'Slots for regions, templates-with-context for data-driven holes, directives for behaviour.',
    content:
      'The composition kit has three tools beyond plain components. Named ng-content slots: caller-owned regions, stamped once (frames, panels, cards). Templates with context: the caller passes an ng-template, the component stamps it per item via *ngTemplateOutlet="tpl; context: { $implicit: row }" — projection that carries data, the answer to cell-renderer switches that grow a variant per sprint. Attribute directives: behaviour (copy-on-click, tooltips, autofocus) packaged to attach to ANY element — implemented once, composed onto spans, inputs and buttons without touching their components. Choose by the variation\'s shape: content region → slot; per-item content → template; cross-cutting behaviour → directive; behaviour the component itself owns → input.',
  },
  {
    id: 'arch.reuse-boundaries',
    title: 'Reuse Boundaries',
    tags: ['angular'],
    summary: 'Extract on evidence (rule of three) — duplication is cheaper than the wrong abstraction.',
    content:
      'Two things that LOOK identical are not yet the same thing: extracting a shared component from coincidental resemblance welds different concepts together, and every divergence afterwards becomes a boolean input (the divergence ledger — flags each used by exactly one caller). Wait for the third real usage; the copies teach you what genuinely varies together, and the eventual abstraction is shaped by evidence. Duplication is visible, mergeable debt — an afternoon to unify; a welded abstraction is invisible glue — surgery to split. When you find a shared component whose flags map one-to-one to callers, un-merge it and share only the honestly-common layer beneath. Real sameness (the design-system button) extracts beautifully — the discipline is about timing, not against sharing.',
  },
  {
    id: 'arch.encapsulation',
    title: 'Style Encapsulation',
    tags: ['angular', 'scss'],
    summary: 'Emulated encapsulation stamps attributes; customise through custom-property doors, never ::ng-deep.',
    content:
      "Emulated view encapsulation works by attribute stamping: Angular adds generated attributes (_ngcontent-xx) to a component's template elements and rewrites its CSS to .title[_ngcontent-xx] — rules only match elements wearing the stamp. (Projected content wears the CALLER's stamp — whoever writes markup styles it.) ::ng-deep drills through the wall and couples you to another component's PRIVATE markup: the internal rename that breaks four consumers. The civilised door: CSS custom properties — the component declares its themeable surface (.cell { background: var(--picker-cell-bg, #fff) }), consumers set --picker-cell-bg from outside, and internals stay renameable. Custom properties inherit through style boundaries BY DESIGN — a documented contract, not a trespass. Ban new ::ng-deep with lint; migrate old ones onto doors.",
  },
  {
    id: 'arch.testing-contracts',
    title: 'Testing Component Contracts',
    tags: ['angular', 'testing'],
    summary: 'Specs drive inputs and DOM, assert renders and outputs — refactors pass, behaviour breaks fail.',
    content:
      'The quality bar for a component spec: it FAILS when behaviour changes and PASSES when implementation changes. Achieve it by testing through the contract the parent uses — setInput() the data, dispatch real DOM events (click the rendered header, never call component.toggle() directly — the template wiring is exactly what goes untested otherwise), assert on rendered DOM and spied outputs. Assertions on private fields, method call counts or internal class names are refactoring handcuffs: a zero-behaviour refactor breaks them, teaching teams to "fix the specs to match" — a suite that mirrors the code can never catch a regression. And never enshrine observed behaviour as the expectation to make a test pass: drive the contract, expect the contract.',
  },
  {
    id: 'test.pyramid',
    title: 'The Test Pyramid',
    tags: ['testing'],
    summary: 'A cost model, not a ritual — buy each promise at the cheapest level that enforces it.',
    content:
      "A test is an executable promise: this input produces that behaviour, or the build goes red. The pyramid prices the levels: unit tests (~1ms, one promise apiece, hundreds — logic and edges against pure functions), integration tests (~100ms, dozens — seams and wiring with real collaborators), E2E journeys (seconds each, whole-system, a handful — flows whose breakage is an incident). Buy each promise at its cheapest sufficient level: nine VAT rules are nine unit promises plus ONE journey proving the wiring — never nine browser tests. A suite's value is the sum of behaviours it can catch breaking; green is only meaningful where red was possible.",
  },
  {
    id: 'test.doubles',
    title: 'Test Doubles',
    tags: ['testing'],
    summary: 'Stubs answer, spies record, fakes behave — double at the seam, keep everything inside real.',
    content:
      "Doubles have job titles. STUB: answers a question the code reads (a clock returning a fixed date, a store signal returning a value) — for state. SPY: records calls for outbound effects you cannot otherwise observe (analytics.track fired with the query) — the one place 'was called' IS the promise. FAKE: a lightweight working implementation (in-memory repo) when the interaction is too rich to script. The discipline: double only at the SEAM the test owns — what the unit itself injects. Mocking through the seam (the store's service's http client's config) re-implements three layers' interactions in mocks that then verify each other: every internal refactor breaks thirty tests for zero behaviour reasons.",
  },
  {
    id: 'test.behaviour',
    title: 'Testing Behaviour',
    tags: ['testing'],
    summary: 'One behaviour per test, literal expectations, coverage as gap-finder — never a target.',
    content:
      'Disciplines that serve the reader-at-3am: one behaviour per test (a failure names one thing — stapled assertions hide everything behind the first failure); arrange-act-assert visually separated; names shaped as does-X-when-Y so the red list reads as a bug report; literal expected values (deriving expectations from the code\'s own constants makes tests agree by construction). Edge cases earn tests where the team had to DECIDE an answer: boundaries, rule interactions, contracted rejections. Coverage counts lines EXECUTED, not promises made — as a target it manufactures theatre (was-called specs, should-create per file, not.toThrow blessings); as an instrument it maps the untested, which is real information. The only review question: what bug turns this test red?',
  },
  {
    id: 'test.integration',
    title: 'Integration Seams',
    tags: ['testing', 'angular'],
    summary: 'Keep one seam real to catch handshake bugs; HttpTestingController plays the server.',
    content:
      "Unit-green, production-wrong happens when both sides of a handshake are stubbed by the same imagination: the store passes currency as a param, the service expects it in the payload, both stubs agree with their own author. Integration tests keep ONE seam real — real store + real service — and double only at the far edge. At the wire, HttpTestingController keeps everything in-process real (HttpClient, interceptors, serialisation) while scripting responses: the outgoing REQUEST becomes the assertion (expectOne(url), check headers/params/body), then flush() the response and verify() nothing escaped. Stop realness at the process boundary: staging APIs in CI make red mean 'someone deployed' — cross-process truth belongs to a few contract tests, not the suite.",
  },
  {
    id: 'test.e2e',
    title: 'E2E Strategy',
    tags: ['testing'],
    summary: 'A hardened handful of critical journeys — volume converts inherited flakiness into noise.',
    content:
      'E2E is the only level proving "a real user can actually check out" — and each test crosses every layer, inheriting every layer\'s failure rate. Those rates COMPOUND with count: at 212 tests even 99.9% per-test reliability fails runs constantly for non-bug reasons, red stops meaning news, and re-running becomes documented policy — the suite is dead. Keep a handful: journeys whose breakage is a company incident (sign-in, checkout, the search spine). Harden each: setup through APIs, not UI tours (seed carts and sessions via requests — the test proves checkout, not the catalogue\'s clickability); selectors via data-testid (classes are styling, renamed without warning); waits via auto-waiting assertions, never wall-clock sleeps. A hardened journey fails for exactly one reason: the journey broke.',
  },
  {
    id: 'test.flaky-discipline',
    title: 'Flaky Tests',
    tags: ['testing'],
    summary: 'Four sources — time, order, shared state, network — and same-day quarantine.',
    content:
      "A handful of flaky tests taxes the credibility of thousands of good ones — teams start dismissing REAL failures as 'probably the flaky ones'. Every flake has one of four sources, each with a tell. TIME: fails at specific hours, sleeps, new Date() anywhere — inject the clock, use fakeAsync/tick (time becomes an input). ORDER: passes alone, fails in the suite — some test needs a sibling's leftovers; fresh instance per test, no test may know its siblings exist. SHARED STATE: fails only after certain tests — singletons, static caches, un-reset stores. NETWORK: fails on slow CI days — anything off-process. Policy: quarantine the day it flakes (skip + ticket), root-cause or delete within the sprint. Never auto-retry in CI: retries absorb real intermittent bugs (the 1-in-3 race) along with the flakes, and green degrades to 'passed eventually'.",
  },
  {
    id: 'a11y.keyboard',
    title: 'Keyboard Access',
    tags: ['a11y'],
    summary: 'Every interaction reachable, focus visible, nothing trapped.',
    content:
      "Everything operable by mouse must be operable by keyboard alone — the fastest audit is to unplug the mouse and use the app. Three health checks: REACHABLE (Tab visits every control in an order matching the visual flow — fix wrong order by fixing DOM order, not tabindex=\"5\"); VISIBLE (a :focus-visible indicator on everything — never `outline: none` without a replacement; :focus-visible shows the ring for keyboard focus and hides it for mouse clicks, answering the \"ugly rings\" complaint honestly); UNTRAPPED (modals trap focus WHILE open and release on close). The modal focus contract: move focus INTO the dialog on open, TRAP it within while open (CDK cdkTrapFocus / Dialog), RETURN it to the trigger on close.",
  },
  {
    id: 'a11y.aria',
    title: 'ARIA: Name, Role, State',
    tags: ['a11y'],
    summary: 'ARIA describes to the accessibility tree — prefer native, and keep it true.',
    content:
      "ARIA writes three things into the accessibility tree: NAME (what the reader calls it), ROLE (what kind of thing), STATE (expanded/checked/disabled/busy). Rule one: don't use ARIA where a native element gives it for free (a <button> beats role=\"button\"). Rule two: if you use it, keep it TRUE and bound to state — users can't see the screen, so they trust the reader completely; an aria-expanded=\"false\" hardcoded on an open menu is confident misdirection worse than silence. ARIA is essential where NO native element models the widget (a custom combobox): then implement the full WAI-ARIA authoring pattern completely, every attribute bound to real state. Common harms: role that changes announced behaviour, aria-label overriding/duplicating visible text, state attributes never bound.",
  },
  {
    id: 'a11y.forms',
    title: 'Accessible Forms',
    tags: ['a11y', 'angular'],
    summary: 'Programmatic labels, announced required/invalid state, errors tied to inputs.',
    content:
      "An accessible field needs three links. A LABEL programmatically tied (<label for> or aria-labelledby) — placeholders are NOT labels: they vanish on type, fail contrast by design, and create no association. REQUIRED and INVALID state via the required attribute and aria-invalid, so the reader announces them. And ERROR text tied to the input with aria-describedby (pointing at the error's id) so the reason is read WITH the field, plus a live announcement (role=\"alert\" / aria-live) so submitting an invalid form speaks the problem immediately. A red border and an asterisk convey none of this to a reader — which field, that it's wrong, and why must all reach the accessibility tree.",
  },
  {
    id: 'a11y.focus-management',
    title: 'Focus Management',
    tags: ['a11y', 'angular'],
    summary: 'SPAs must move focus deliberately on navigation and content changes — and never steal it.',
    content:
      "A full-page navigation resets focus to the top; a SPA outlet swap does not, leaving a reader user on a stale link hearing nothing. On each NavigationEnd, move focus into the new view — its <h1> made focusable with tabindex=\"-1\" (focusable, not a tab stop) — so the reader announces arrival; add a \"Skip to main content\" link as the first focusable element. For dynamic content, focus follows the user's INTENT: content the user requested (clicked \"load more\") may receive focus; content that arrived on its own (a poll) must NOT — stealing focus mid-task is a top complaint; announce it with a POLITE live region instead. After an element is removed, move focus somewhere sensible rather than letting it fall to the body.",
  },
  {
    id: 'a11y.color-contrast',
    title: 'Colour & Contrast',
    tags: ['a11y', 'scss'],
    summary: 'Meet WCAG ratios and never let colour be the only signal.',
    content:
      "Two rules. CONTRAST: body text ≥ 4.5:1, large text and UI components ≥ 3:1 against their background — measurable with a checker, non-negotiable; #aaa on white is 2.3:1 and fails. Hierarchy that relied on failing greys can be rebuilt with size, weight, spacing, and colours that still clear 4.5:1 (e.g. #767676) — legibility is a requirement, low-contrast-as-hierarchy a preference. NEVER COLOUR ALONE: any meaning carried by colour must ALSO be carried another way — shape, icon, text, or pattern — because ~8% of men have red-green colour blindness and colour vanishes in greyscale, bright sun and cheap projectors. Status shown by a green/red dot must add a distinct shape and a text label; the label also hands the meaning straight to the screen reader.",
  },
  {
    id: 'a11y.live-regions',
    title: 'Live Regions',
    tags: ['a11y', 'angular'],
    summary: 'Announce dynamic changes at the right politeness, without flooding.',
    content:
      "When content updates without a page load, a screen reader hears nothing unless a LIVE REGION announces it. Politeness matches urgency: aria-live=\"polite\" waits for a pause (result counts, \"Saved\" — most things); aria-live=\"assertive\" interrupts immediately (errors, session-expiry — rare, because interrupting is rude, and overuse trains users to tune the region out). The test for assertive: does the user suffer if they hear it a few seconds late? Angular's LiveAnnouncer does this imperatively (announce(msg) / announce(msg, 'assertive')). Discipline: announce SETTLED, meaningful states — a region bound to a value that changes per keystroke fires a torrent that buries the one announcement that matters. Drive it from the resolved result, not optimistic intermediate renders.",
  },
  {
    id: 'a11y.testing',
    title: 'Testing Accessibility',
    tags: ['a11y', 'testing'],
    summary: 'Automate the mechanical floor; test the usability ceiling by hand.',
    content:
      "Automated tools (axe, Lighthouse) catch roughly a third of issues — the MECHANICAL ones: missing alt/labels, low contrast, invalid ARIA. Real value: add axe assertions to CI so those regressions fail on the push that introduces them, on every rendered state. But automation cannot judge whether a label is MEANINGFUL (\"Button\" passes), alt text DESCRIBES the image, tab order is LOGICAL, focus lands SENSIBLY, ARIA is TRUE, or the widget is actually OPERABLE — a checkout can be mechanically perfect and experientially unusable. That ceiling needs humans: a keyboard-only pass (reachable, visible, untrapped) and a real screen-reader pass on new/changed flows, plus a 200% zoom pass. Automation is the continuous floor; manual testing per feature is the ceiling — layers, not rivals. Dropping either lets its class of failures reach production.",
  },
  {
    id: 'sec.trust-boundaries',
    title: 'Trust Boundaries',
    tags: ['security'],
    summary: 'Every place external data enters is a checkpoint — input is hostile until checked.',
    content:
      "Security starts with a map: every arrow where data crosses from outside your control to inside it — URL params, form input, API responses (yes, these too — your backend is a courier for data other users authored), localStorage, postMessage, uploaded files. At each crossing, input is guilty until proven innocent. Data does NOT become trusted by travelling; only by being validated (shape, via Zod-style schemas) and encoded for its destination. Encoding is contextual — the same hostile string is defused differently for HTML, a URL, or an attribute — and data written to storage is untrusted AGAIN when read back. A boundary you didn't know existed is a boundary with no guard.",
  },
  {
    id: 'sec.xss',
    title: 'Cross-Site Scripting',
    tags: ['security', 'angular'],
    summary: 'XSS runs attacker JS in your users’ sessions — Angular escapes by default; respect the sanitiser.',
    content:
      "XSS is running the attacker's JavaScript in your user's authenticated session — read cookies/tokens, act as them, rewrite the page. Angular defends by default: {{ }} interpolation escapes HTML, and [innerHTML] runs the DomSanitizer (keeps safe formatting, strips scripts AND event handlers like onerror — regex-stripping <script> misses the hundreds of other vectors). Two footguns: reaching past the framework to raw element.innerHTML bypasses the sanitiser entirely, and bypassSecurityTrustHtml turns it OFF. Bypass is legitimate ONLY for content of trusted provenance with zero user input (e.g. SVG you generated from your own config) — the moment user data flows in, it becomes an XSS vector. Document the invariant at the call site.",
  },
  {
    id: 'sec.tokens',
    title: 'Token Storage',
    tags: ['security'],
    summary: 'localStorage tokens are XSS-readable; httpOnly cookies aren’t — each has a tradeoff.',
    content:
      "Where the auth token sleeps decides the blast radius of an XSS. localStorage/sessionStorage is readable by ANY script on the origin — a single injected script steals the token and becomes a logged-in attacker (a signed JWT prevents forgery, not theft). An httpOnly + Secure cookie is invisible to JavaScript: the browser attaches it automatically but document.cookie can't read it, so XSS can't exfiltrate it — at the cost of automatic attachment, which introduces CSRF (mitigate with SameSite + anti-CSRF token). In-memory storage (a variable, gone on refresh) paired with an httpOnly refresh cookie is a strong pattern. This is defence in depth: you both reduce XSS AND shrink what one XSS can do — because you'll never prove zero XSS bugs forever, including in dependencies.",
  },
  {
    id: 'sec.csrf',
    title: 'CSRF',
    tags: ['security'],
    summary: 'Forged authenticated requests riding the victim’s ambient cookie — defend with SameSite + tokens.',
    content:
      "CSRF borrows the victim's ambient authority: if auth is a cookie the browser sends automatically, any site can make the victim's browser fire authenticated requests to your origin (a hidden <img> or auto-submitting <form>) — the user clicks nothing, nothing is stolen, and the server sees a legitimate logged-in request. (CORS doesn't stop it — CORS governs reading the RESPONSE, not sending the request; the side effect happens regardless.) Defences: SameSite=Lax/Strict on the cookie (browser withholds it cross-site — the baseline) PLUS an anti-CSRF token for state-changing endpoints (Angular HttpClient supports the cookie-to-header XSRF-TOKEN convention). Authorization-header auth is naturally CSRF-resistant (a cross-site request can't add the header) — but that reintroduces the XSS-exfiltration tradeoff of non-cookie storage.",
  },
  {
    id: 'sec.authz',
    title: 'Authorization',
    tags: ['security', 'angular'],
    summary: 'Client checks are UX; the server is the only real gate — it re-authorizes every request.',
    content:
      "The entire front end runs on the attacker's machine: they can edit your JS, un-hide buttons, ignore route guards, and replay any API call with curl. So client-side checks (hidden admin links, canActivate guards, disabled fields) are UX — they show the right things to the right people — NOT security. Every request must be independently authorized by the SERVER against the real identity derived from the verified token (never from a client-supplied role field). A hidden button in front of an open endpoint is no protection: the test is whether a non-privileged session can replay the call with curl and succeed. Keep the client checks (deleting them just gives users dead 403s), but understand their job: the client decides what to SHOW; the server decides what to ALLOW.",
  },
  {
    id: 'sec.dependencies',
    title: 'Supply Chain Security',
    tags: ['security'],
    summary: 'Most of your app is third-party code with full trust — audit, triage by reachability, minimise deps.',
    content:
      "You write a fraction of your node_modules; the rest runs with the same trust and ships to users. Three shapes of risk: KNOWN CVEs (npm audit / Dependabot flag them — triage by SEVERITY and REACHABILITY: a critical flaw in an unused dev tool can matter less than a moderate one on your user-input path; don't blanket `audit fix --force`, which pulls breaking majors); MALICIOUS packages (typosquats, or a hijacked maintainer shipping a miner in a patch — pin versions, review diffs on bump); and TRANSITIVE trust (your 40 deps pull 1,300 more). A dependency is an ongoing trust relationship, not just code — for a trivial function, writing the few lines yourself removes the trust entirely. The cheapest dependency is the one you don't take.",
  },
  {
    id: 'sec.secrets',
    title: 'Secrets & CSP',
    tags: ['security'],
    summary: 'Nothing shipped to the browser is secret; CSP contains the XSS you fail to prevent.',
    content:
      "Everything you ship to the browser is public — source, environment.ts, feature flags, any 'API key' in the bundle (minification is not encryption; not-in-git ≠ not-in-browser; a runtime config fetch just hands the secret to the network tab). Secrets that must stay secret live on a SERVER: the browser calls YOUR backend, which holds the third-party key and proxies the call (gaining rate-limiting and caching too). Where a vendor forces a browser-side key, use their origin/referrer restrictions and treat it as semi-public. Content-Security-Policy is the defence-in-depth containment layer: a strict policy (scripts from self, no inline/eval, connect-src limited to your API) means an XSS that DOES slip through can't load remote attacker code or exfiltrate to evil.com — prevention (sanitising) and containment (CSP) defend different moments, and CSP must ENFORCE, not sit permanently in report-only.",
  },
  {
    id: 'sec.threat-modeling',
    title: 'Threat Modeling',
    tags: ['security'],
    summary: 'Before shipping: what’s worth attacking, who would, and how — security designed in, not bolted on.',
    content:
      "Threat modeling is structured pessimism, fifteen minutes before you build. Walk three questions: ASSETS (what's worth stealing/breaking — user data, tokens, money, integrity), ACTORS (who attacks and why — external, malicious user, compromised account, curious insider, bots), ENTRY POINTS (each trust boundary). For every entry×asset, name what goes wrong, rank by likelihood × impact, and match a known defence (validate, encode, authorize server-side, store secrets away, contain with CSP), noting residual risk. Example: a user-uploaded avatar shown to everyone is a stored-XSS vector (a 'png' can be a scripted SVG) far more than a bandwidth concern; a share link with a sequential DB id invites enumeration and needs an unguessable token plus server-enforced read-only scope. The output is a short 'what could go wrong and what we did' list — written before the attacker writes theirs.",
  },
  {
    id: 'debug.reproduce',
    title: 'Reproduce First',
    tags: ['incident-response'],
    summary: 'A reliable repro is the primary debugging asset — without it, every fix is an unverifiable guess.',
    content:
      "The first law of debugging: reproduce before you fix. A reliable reproduction turns \"I think this helps\" into \"watch: it fails, I change this, now it passes\" — it lets you confirm the CAUSE and verify the FIX, and it becomes the regression test. Shipping a plausible fix and waiting to see if reports stop is a slow, uncontrolled experiment on users (and intermittent reports can pause by luck, falsely confirming a wrong fix). To make an intermittent bug deterministic, treat your evidence as a dataset: cross-reference tickets and session replays for the shared conditions (same data? coupon? quantity? browser? locale?), form a hypothesis, and recreate those conditions locally with production-like data until it fails on demand. \"Random\" is conditions you haven't named yet.",
  },
  {
    id: 'debug.devtools',
    title: 'DevTools',
    tags: ['incident-response'],
    summary: 'Each panel answers a question — ask the instrument instead of console.logging in the dark.',
    content:
      "DevTools are instruments; pick the panel that answers the question. \"Data isn't showing\" → Network: did the request fire, what status, what's the real response shape? (distinguishes no-request / 403 / empty / mapping-loss in one glance, before any console.log). \"Value is wrong\" → Sources with a CONDITIONAL breakpoint (break only when qty < 0) that pauses on the exact case with the full live scope and call stack — far more than a logged value, and no editing/rebuilding/removing of twenty console.logs. \"It's slow\" → Performance flame chart; \"memory grows\" → Memory heap snapshots; \"layout off\" → Elements computed styles. console.log is fine for a quick probe, but a breakpoint or the network tab usually answers faster and tells you WHICH layer to investigate next.",
  },
  {
    id: 'debug.source-maps',
    title: 'Source Maps & Prod Builds',
    tags: ['incident-response'],
    summary: 'Source maps de-minify production traces; some bugs exist only in the production build.',
    content:
      "Production errors arrive minified (\"n is not a function at a.js:1:48293\") because the build mangles names. SOURCE MAPS (.map files) translate minified positions back to your original source — upload them to your error monitor (PRIVATELY; serving them publicly hands attackers your source) so every trace reads \"PriceService.calc (price.service.ts:42)\". And prod-only bugs are real: the production BUILD differs from the dev one — it minifies/mangles names, tree-shakes \"unused\" code (breaking anything referenced only reflectively by string name), strips Angular's dev-mode checks, applies optimizer assumptions, and runs with prod config/CDN. \"Works in dev\" narrows nothing until you reproduce against a PRODUCTION build (build prod + serve the output, or use source maps on the deployed error) — the build difference is itself the clue.",
  },
  {
    id: 'debug.monitoring',
    title: 'Error Monitoring',
    tags: ['incident-response'],
    summary: 'Export unhandled errors with context and alert on spikes — find bugs before users tell you.',
    content:
      "console.error writes to the USER's console, which you never see — silent production failures can run for weeks until a social-media complaint. Observability means a global ErrorHandler (plus an unhandledrejection listener) that ships every unhandled error to a monitoring service WITH CONTEXT: the de-minified stack (via uploaded source maps), the release version (which deploy introduced it), breadcrumbs (the clicks/navigations before the crash), browser/OS, and the count of DISTINCT users affected — with alerting on error-rate spikes so a new failure pages you in minutes. Prioritise fixes by IMPACT (users × severity), not loudness: a silent null-deref hitting 6% of sessions outranks a single vocal power user's daily tickets or 4,000 benign \"ResizeObserver loop\" warnings (filter those as noise). Uptime/health checks catch server-DOWN, not client-side errors on a healthy server — you need front-end error monitoring for those.",
  },
  {
    id: 'debug.heisenbugs',
    title: 'Intermittent Bugs',
    tags: ['incident-response'],
    summary: 'Races, timing, environment — “random” is unfound conditions, not true randomness.',
    content:
      "Intermittent bugs cluster into three classes. RACE: two async operations whose ORDER varies — e.g. a slow search response landing after a fast one overwrites the display with stale results; the tell is timing-sensitivity (a breakpoint or slowdown changes the outcome), and the fix makes \"latest wins\" structural (switchMap to cancel superseded requests, or a query-match/sequence guard). TIMING: something assumed instant occasionally isn't — fails under load, on slow devices, or cold cache. ENVIRONMENT: a specific browser, locale, network, data shape, or timezone — clusters by user-agent/region/a data attribute (a date parser crashing one region is a locale format like DD/MM/YYYY). An environment bug is deterministic once you MATCH the environment: set your locale/timezone/data to theirs and it reproduces every time. Never write a bug off as \"flaky/unfixable\" — name the unfound condition.",
  },
  {
    id: 'debug.bisection',
    title: 'Systematic Isolation',
    tags: ['incident-response', 'git'],
    summary: 'Binary search over time (git bisect) and code — and change one variable per experiment.',
    content:
      "Binary search halves the unknown each step. In TIME: git bisect — mark a known-good and known-bad commit, git checks out the midpoint, you run your repro and mark good/bad, repeat; 400 commits collapse to ~9 tests and it names the EXACT introducing commit (needs only a reliable good/bad test — your repro). In CODE: disable half the suspect feature, see if the bug survives, keep halving. Underneath both: change ONE variable per experiment — flip two things (a CSS property AND a dependency version) and the result is uninterpretable (you can't say which caused it, and a \"fix\" you can't explain may be coincidental and may hide a new regression). Debugging is controlled experiments; understanding, not just green, is the goal.",
  },
  {
    id: 'debug.incident-response',
    title: 'Incident Response',
    tags: ['incident-response'],
    summary: 'In a live incident the order inverts: restore service first, understand later.',
    content:
      "Calm debugging is reproduce → diagnose → fix. A LIVE incident inverts it: MITIGATE first — restore service by the fastest safe means, almost always a ROLLBACK to the last known-good deploy (seconds, proven) rather than a hotfix (unproven, written under stress, can deepen the hole). When a blanket rollback is unsafe or too broad (it would revert an urgent security patch or a migration that already ran), a FEATURE FLAG is surgical mitigation — flip off just the broken feature in seconds with zero code risk. Then COMMUNICATE status so support/customers aren't guessing. THEN, with service restored and no clock pressure, do the real root-cause diagnosis, fix, and verify with a regression test. The outage is the emergency, not the unknown bug — every minute spent \"finding it properly\" while users fail is a minute of avoidable outage.",
  },
  {
    id: 'debug.post-mortems',
    title: 'Post-Mortems',
    tags: ['incident-response'],
    summary: 'Blameless analysis of why the SYSTEM allowed a bug through — actions that prevent the class.',
    content:
      "A post-mortem is BLAMELESS by design: humans make mistakes, so the question is never \"who was careless\" but why the SYSTEM let a mistake reach production and hurt users. Use the five whys to move from person to process (bug shipped → no test caught it → that path had no coverage → edge cases aren't in our definition of done → …). \"Be more careful\" is not an action — it's unmeasurable, changes no system, and guarantees recurrence. Strong actions are self-enforcing MECHANISMS with owners: a regression test for the exact failing case, an error-rate alert, a canary/gradual rollout that caps any bad deploy's blast radius, a one-click rollback, a validation guard at the boundary. Weak actions are awareness theatre (\"be vigilant\", a company-wide \"outages are costly\" email). Good incidents make the system stronger; the systemic hardening is the highest-value output, never skipped because the team is tired.",
  },
  {
    id: 'sysd.requirements',
    title: 'Requirements First',
    tags: ['angular'],
    summary: 'Clarify scope, users, scale and constraints before drawing any architecture.',
    content:
      "The first move in any system design is REQUIREMENTS, not boxes — the same feature name (\"news feed\") hides ten different systems until you bound it. FUNCTIONAL: what must it do (core flows, real-time?, edit?, offline?). NON-FUNCTIONAL: how well — scale (100 users vs 100M changes caching/pagination/everything), devices (desktop vs low-end mobile on 3G changes the budget), constraints (SEO/SSR, offline/PWA, accessibility, i18n, regulatory), acceptable latency. Every one flips the architecture, so gather them before choosing components, data models, or state tools. A single late constraint — \"it needs to rank on Google\" — can invert the rendering strategy from CSR to SSR/SSG; discovered late it's a rewrite, discovered early it's a design input.",
  },
  {
    id: 'sysd.rendering',
    title: 'Rendering Strategies',
    tags: ['angular'],
    summary: 'CSR/SSR/SSG/hydration trade first-paint, freshness and server cost — choose per page.',
    content:
      "Rendering strategy is WHERE and WHEN the HTML is generated, chosen PER PAGE by that page's needs. CSR (client): blank shell, JS builds it — best for private, interactive apps; poor first paint/SEO, cheap server. SSR (server per request): HTML built each request then hydrated — best for fresh + SEO-critical pages (feed, product page); server cost/complexity. SSG (build time): pre-rendered static HTML — fastest and cheapest, stale until rebuild, best for blog/docs/marketing. Most teams wrongly pick ONE for the whole app when a marketing page (SSG), a private dashboard (CSR) and a blog (SSG) want different answers. HYDRATION attaches JS to server HTML to make it interactive — it assumes the client produces the SAME DOM the server sent, so non-deterministic initial render (Date.now(), random, browser timezone/APIs) causes a hydration MISMATCH (flicker, re-render); keep initial render deterministic and defer client-only differences until after hydration.",
  },
  {
    id: 'sysd.data-layer',
    title: 'The Data Layer',
    tags: ['angular'],
    summary: 'Client caching, normalization and invalidation are architecture — coherence is designed, not hoped.',
    content:
      "At scale the client data layer is real architecture with three concerns. CACHING: hold fetched data and don't re-request what's fresh (Remote<T>, TTL, shareReplay) while knowing when it's stale. NORMALIZATION: store each entity ONCE keyed by id and have views reference it by id — so one user object serves every view and there are no denormalized copies to drift (the five-caches-of-one-user bug is a design failure, not a whack-a-mole). INVALIDATION: a mutation marks the cache it falsifies as stale (the mutation owns invalidation). Build-vs-buy the layer by data complexity: a small surface can hand-roll a Remote<T> cache; a large app with many entities, dedup, background refetch, pagination and optimistic updates is re-implementing a caching library (TanStack Query / Apollo) badly — adopt one. The design question: is \"same entity, same value, everywhere\" guaranteed by normalization or hoped for by sync code?",
  },
  {
    id: 'sysd.realtime',
    title: 'Real-Time Transports',
    tags: ['angular', 'rxjs'],
    summary: 'Polling, SSE and WebSockets trade simplicity for latency and direction — choose by frequency and direction.',
    content:
      "\"Make it real-time\" hides three systems. POLLING: client asks every N seconds — simplest, works everywhere; latency = interval, wasteful when idle; best for infrequent updates. SSE (Server-Sent Events): server pushes to client over one long-lived HTTP connection, auto-reconnects — best for ONE-WAY streams (notifications, live feeds, dashboards); server→client only. WEBSOCKETS: full bidirectional persistent connection — for genuinely TWO-WAY low-latency needs (chat, collaborative editing, live cursors, presence, games); connection-management and scaling cost. Choose by update frequency AND whether the CLIENT needs to push. Critically, ANY persistent connection drops on flaky mobile networks, so design RECONNECTION and GAP RECOVERY: on reconnect tell the server the last-seen event (SSE's Last-Event-ID / a since-cursor) so missed events are replayed — a live feature is done when it survives a flaky connection, not a stable demo.",
  },
  {
    id: 'sysd.scaling',
    title: 'Scaling the Codebase',
    tags: ['angular', 'nx'],
    summary: 'Scale architecture to teams — enforced module boundaries first, micro-frontends only for deploy independence.',
    content:
      "Codebase architecture is org architecture (Conway's law: the system mirrors the org's communication structure). When many teams tangle in one codebase, the fix is enforced MODULE BOUNDARIES: organise into feature libraries with clear public APIs and use dependency constraints (Nx tag rules) so a feature can't reach into another team's internals — teams then change in parallel safely, at a fraction of heavier options' cost. MICRO-FRONTENDS (independently built and deployed apps per team) grant deployment autonomy and stack independence but bring runtime integration, shared-dependency version drift, and coordination cost — they earn that cost only when independent DEPLOYMENT is a hard requirement (e.g. an hourly-shipping team that cannot be coupled to a quarterly regulated release) or stacks genuinely diverge, NOT merely because the team is large. Enforce boundaries in a monorepo first; reach for micro-frontends only when deployment independence is proven.",
  },
  {
    id: 'sysd.performance',
    title: 'Performance as Architecture',
    tags: ['angular'],
    summary: 'Design for speed with a budget, a minimal critical path, and edge delivery — don’t optimise it in later.',
    content:
      "At system scale, performance is designed in, not patched after. A PERFORMANCE BUDGET is a hard CI-enforced limit (initial JS ≤ X KB, LCP ≤ Y on the target device) that fails the build when exceeded — so features are shaped WITHIN it and bloat is caught at PR time as a design decision, ending the grow-then-trim quarterly-sprint cycle (which exists because nothing prevents growth between cleanups). The CRITICAL PATH — what MUST load for first meaningful paint — is deliberately minimised: route-level code splitting (ship only this route), defer non-critical/below-fold JS (e.g. a charting library), fetch only above-the-fold data in parallel, prioritise the LCP asset. DELIVERY: a CDN/edge serves static assets and cached responses close to users, because geography is latency. Speed becomes a property of the design, not a rescue mission.",
  },
  {
    id: 'sysd.resilience',
    title: 'Designing for Failure',
    tags: ['angular'],
    summary: 'Assume the network and backends fail — degrade gracefully, isolate failures, never a white screen.',
    content:
      "Production never gets the happy path, so resilience is a design property, not a bolted-on handler. GRACEFUL DEGRADATION: compose the page from INDEPENDENTLY-failing sections so one failing widget degrades to its own fallback (\"couldn't load — retry\") while the rest render — the all-or-nothing render that lets one optional service blank six working ones is the anti-pattern. OFFLINE support (service worker + local-first data + sync-on-reconnect) is a REQUIREMENT decided at design time for apps whose users are genuinely offline while needing them (field tools, transit, note-taking) — expensive to retrofit, and pure cost for an online-only marketing site, so decide per app. And ALWAYS a meaningful fallback UI, never a dead white screen. Assume every backend and the network will fail; design the fallback first.",
  },
  {
    id: 'sysd.tradeoffs',
    title: 'Articulating Tradeoffs',
    tags: ['angular'],
    summary: 'There is no best, only fit — tie each choice to a requirement and name what it sacrifices.',
    content:
      "Senior system design is not knowing the \"right\" answer — it is naming tradeoffs and defending fit. Every decision in the discipline is a tradeoff: SSR buys SEO and first paint, costs server complexity; WebSockets buy two-way low latency, cost connection management; micro-frontends buy deploy autonomy, cost coordination. State each choice as: I chose X, which OPTIMISES ___ (for requirement ___), and SACRIFICES ___ (acceptable because ___); the alternative would instead ___, worse here because ___. Red flags that mark an indefensible choice: \"best practice\", \"modern\", \"industry-standard\", \"future-proof\", \"everyone uses it\" — none name a requirement, so the choice can't be defended in review or revisited when it no longer fits. The senior artifact is a DECISION RECORD: each choice tied to a requirement with its tradeoff and rejected alternative, plus the conditions that would change it. A record that decides nothing (\"go either way in implementation\") is not a design.",
  },
  {
    id: 'ai.collaboration',
    title: 'AI Collaboration Mindset',
    tags: ['ai'],
    summary: 'AI is a fast, confident, fallible power tool — it amplifies the driver; you stay accountable.',
    content:
      "AI coding assistants are a power tool, not an oracle. They are astonishingly fast and confident — and confidence is decoupled from correctness: they HALLUCINATE plausible APIs, methods and facts that don't exist, write clean-but-subtly-buggy code, and defend wrong answers fluently, all with the same certainty as correct ones. So there is no reliability signal in the TONE. The tool amplifies whoever drives it: a skilled engineer who reviews and understands everything goes faster; someone who accepts output they cannot evaluate ships the AI's mistakes as their own. The variable that separates good and bad outcomes is accountability (review + understand), not seniority. Verify specific claims (APIs, versions, facts) against ground truth — docs, types, a quick test — and never merge code you don't understand. YOU remain accountable for every line, because the tool cannot be.",
  },
  {
    id: 'ai.prompting',
    title: 'Effective Prompting',
    tags: ['ai'],
    summary: 'Output quality tracks input quality — context, specificity, examples and constraints.',
    content:
      "A good prompt is a good specification — the clarity you'd give a junior engineer. The levers: CONTEXT (the AI can't see your codebase, conventions, versions or constraints unless you provide them — paste the relevant code, state the goal and framework), SPECIFICITY (vague requests get generic answers; \"write a validator\" vs a precise spec with the exact return shape), EXAMPLES (show the pattern to match — an existing component, the I/O shape), and CONSTRAINTS (state must/must-not: standalone, signals, our error shape, no new dependencies, keep OnPush, accessible). Garbage in, garbage out at high speed: a context-free prompt (\"fix the bug\") gets a context-free answer, and an unconstrained one produces generic code that ignores your conventions (a random UI library, NgModules, a foreign state pattern). Encode your standards into the prompt; don't salvage a mismatched output afterward.",
  },
  {
    id: 'ai.reviewing',
    title: 'Reviewing AI Code',
    tags: ['ai'],
    summary: 'Full review PLUS the AI-specific failure modes — polish is not correctness.',
    content:
      "AI-generated code gets the SAME scrutiny as any code (correctness, security, performance, tests) — plus its signature failure modes, and its clean, confident formatting DISARMS scrutiny that sloppy human code would trigger, so subtle bugs slip through a cursory glance. Watch for: HALLUCINATED APIs (does this method/option actually exist? — check docs/types); SUBTLE LOGIC BUGS hidden by polish (off-by-ones, = vs ===, wrong conditions — read the boundaries); OUTDATED PATTERNS (models trained on old code emit NgModules in a standalone app, deprecated RxJS like retryWhen, legacy idioms); MISSING EDGE CASES (the happy path is polished, null/empty/error paths absent); and SECURITY ANTI-PATTERNS stated as best practice. The rule that prevents all of it: never merge code you don't UNDERSTAND, no matter how good it looks — grade on logic, not appearance.",
  },
  {
    id: 'ai.when-to-use',
    title: 'When to Use AI',
    tags: ['ai'],
    summary: 'Match tasks to AI strengths; it has a cost, and it is weak at novel correctness-critical logic.',
    content:
      "The question isn't whether to use AI but for WHAT. It is STRONG at: boilerplate and scaffolding (to an existing pattern), translating between languages/formats, explaining unfamiliar code, generating tests for EXISTING well-understood logic, recalling syntax and API shapes, and rubber-duck exploration — high-volume, pattern-based, verifiable work. It is WEAK at: novel algorithms and genuinely new logic, tasks needing deep whole-system context it cannot see, and correctness-critical detail where a subtle error is costly (it will confidently produce plausible-but-wrong output — route these to a human, AI-assisted at most). AI also has a COST — prompting + reviewing + correcting — so for a small, tricky, well-understood function, hand-writing can be faster than specifying it precisely and verifying its subtle correctness. Knowing when NOT to reach for it, and when you're fighting the tool, is as much a skill as knowing when to.",
  },
  {
    id: 'ai.sdlc',
    title: 'AI Across the SDLC',
    tags: ['ai'],
    summary: 'AI helps in every phase in a draft-then-decide pattern — not just code generation.',
    content:
      "Most teams use AI as fancy autocomplete (the code-writing phase, ~a third of the work) and miss the leverage elsewhere. AI helps across the whole lifecycle in a DRAFT-THEN-DECIDE pattern where the human stays the decision-maker: REQUIREMENTS/DESIGN (explore options, poke holes, draft the doc — you decide), IMPLEMENTATION (generate code — you review and own), TESTING (suggest cases and edge-case ideas for your logic — you verify they test the right thing), REVIEW (a first-pass FILTER that flags obvious issues before human review — never replacing it, and its comments are triaged not blindly obeyed), DOCS (draft the tedious drafts — you correct), DEBUGGING (explain the error, hypothesise causes — you confirm the repro). An AI first-pass reviewer frees human attention for judgement and subtle correctness it misses, but cannot own accountability — human review still runs on every PR, proportionate to risk.",
  },
  {
    id: 'ai.verification',
    title: 'Verifying AI Output',
    tags: ['ai'],
    summary: 'AI output is a hypothesis until verified against ground truth — never AI-verifies-AI.',
    content:
      "The block's hazard — confident, plausible, sometimes wrong — has one antidote, and it isn't \"read it more carefully\" (polish defeats that): VERIFY. Treat AI output as a HYPOTHESIS until proven by something grounded OUTSIDE the model — EXECUTION (run it; does it produce the right result?), TESTS that assert the REAL requirement (that a human wrote or verified from the spec), and GROUND TRUTH (docs/types/reality — does this API exist? is this fact true?). Two traps: asking the AI \"is this correct?\" is circular — the model that wrote the bug is equally confident it isn't, and its self-review, a second model, or a fluent explanation are all still ungrounded. And AI-generated tests of AI-generated code can encode the SAME wrong assumption, passing in perfect agreement while both diverge from the requirement (they prove self-consistency, not correctness). Ground the key tests in the real spec via a human; verify by execution against known-correct values.",
  },
  {
    id: 'ai.risks',
    title: 'AI Risks & Responsibilities',
    tags: ['ai', 'security'],
    summary: 'Data leakage, insecure/unlicensed generated code, and skill atrophy — risks the engineer owns.',
    content:
      "AI assistance carries risks the engineer still owns. DATA LEAKAGE: whatever you paste into an AI tool may leave your control (logged, retained, trained on, breach-exposed) regardless of the AI's intent — pasting into a third party crosses a trust boundary, so never send secrets, proprietary code, customer data or PII to tools whose data policy you don't control (a disclosed live credential must be rotated; use redacted/synthetic data or enterprise tooling for sensitive work). SECURITY: AI generates insecure patterns confidently, so the security campaign applies to AI code MORE, not less. IP/LICENSING: generated code may echo licensed training data — a real legal consideration for some orgs. SKILL ATROPHY: skills you stop practising fade — and the ability to REVIEW AI output is the safeguard that keeps its use safe; a junior who outsources all reasoning loses the judgement to catch confident-but-wrong output, a spiral into shipping its mistakes. Deliberately keep practising the fundamentals so judgement grows WITH the tool.",
  },
  {
    id: 'ai.agentic',
    title: 'Agentic AI & Autonomy',
    tags: ['ai'],
    summary: 'Agents take multi-step actions — oversight must scale with autonomy; the human stays accountable.',
    content:
      "Agentic AI doesn't just answer — it ACTS: reads the codebase, edits many files, runs commands, opens PRs, in a loop with minimal input. This multiplies both leverage and BLAST RADIUS (more can go wrong per unattended step), and agents optimise the goal you give LITERALLY — told to \"make tests pass\" one may delete the assertions, then the features, and open a green PR. So the principle is OVERSIGHT SCALES WITH AUTONOMY: an autocomplete needs a glance; an agent editing files and running commands needs structural guardrails (scoped permissions, a sandbox, tests it cannot weaken, a human approving the diff before merge, clear stopping points) — a better prompt alone can't enumerate every degenerate shortcut. Grant autonomy where actions are gated and reversible (an agent that opens a reviewable PR a human approves) and keep a human in the loop where a wrong action hits production directly (never unattended prod deploys — that removes the incident-response judgement). \"The agent did it\" is not a defense; a human owns the result.",
  },
  {
    id: 'http.contract-design',
    title: 'API Contract Design',
    tags: ['api'],
    summary: 'Additive changes are safe; removals, renames and new requirements break deployed clients.',
    content:
      'An API is a promise to clients you cannot see or redeploy. ADDITIVE changes keep it: new optional request fields, new response fields, new endpoints (new enum values are additive-with-an-asterisk — announce them; clients must handle unknown values). BREAKING changes: removing or renaming any field, changing a type or meaning, making optional input required, tightening validation — each fails some deployed client, often silently (renamed response fields read as undefined). Migrate by addition: ship new alongside old, deprecate, remove in a versioned successor. Verbs carry semantics too: PUT replaces the whole resource (an omitted field means DELETE it), PATCH merges only the provided changes — sending a one-field body via PUT politely erases everything else. Status codes: use the standard channel — 200-with-{success:false} makes every generic tool (interceptors, monitors, retries) read failure as success.',
  },
  // ---- Dance Academy — Judge Path (Judge Handbook) ----
  {
    id: 'judging.criteria',
    title: 'The Six Judging Lenses',
    tags: ['dance', 'judging'],
    summary: 'Every dance is judged through timing, rhythm, motion, character, signature figures and spatial structure.',
    content:
      'A judge does not score "good dancing" as one blur — they watch through six lenses. TIMING: are the dancers on the music, in the correct time signature and count? RHYTHM: do their steps match the slow/quick pattern and accents of the style? MOTION: is the body producing movement the right way for the dance (rise and fall, Cuban action, pulse)? CHARACTER: does the energy match the dance — regal Waltz, cheeky Cha Cha, romantic Nightclub? SIGNATURE FIGURES: are the figures that define the dance present and recognisable? SPATIAL STRUCTURE: is the couple using the floor correctly — progressive travel where the dance demands it, contained geometry where it does not, with good floorcraft. Score each lens on its own; a dance can nail timing yet miss character entirely.',
  },
  {
    id: 'judging.timing',
    title: 'Timing and Time Signature',
    tags: ['dance', 'judging'],
    summary: 'Timing is whether the dance sits correctly on the music and its counts.',
    content:
      'Timing asks a single question: are the dancers where the music says they should be? Identify the time signature first (Waltz is 3/4; most others are 4/4 or 2/4), then the counting structure and the musical accents. A Waltz carries its musical accents on 1 and 4 across six counts; a Cha Cha emphasises the 4& and 8&. A couple can move beautifully and still be judged down for landing steps off the beat, or for dancing a pattern that does not fit the phrase. Distinguish MUSICAL accents (where the music is strong) from DANCE accents (where the body expresses) — good dancers align the two.',
  },
  {
    id: 'judging.rhythm',
    title: 'Rhythm: Slow, Quick and Syncopation',
    tags: ['dance', 'judging'],
    summary: 'Rhythm is the slow/quick pattern a style rides on, including syncopations.',
    content:
      'Where timing is about being on the beat, rhythm is about the PATTERN of durations a style rides on. Nightclub is slow-quick-quick; Two Step is quick-quick-slow-slow; Triple Two is slow-slow-triple-triple. Syncopation is a deliberate, temporary displacement of the expected accent that resolves back — judged as skilful when controlled and musical, and as an error when it is really just poor timing. A judge listens for whether the couple is expressing the style\'s rhythm, not merely stepping on every beat.',
  },
  {
    id: 'judging.motion',
    title: 'Motion and Body Action',
    tags: ['dance', 'judging'],
    summary: 'Motion is how the body produces movement — and whether it fits the dance and its music.',
    content:
      'Motion is the quality of movement the body generates, and it must match the dance AND the music playing. Waltz uses rise and fall with swing and sway; Nightclub draws sway from the base rather than the upper body; Cha Cha chooses Cuban motion for Latin-flavoured music and a flatter action for rolling country rhythm. The classic judging error is correct footwork with the wrong motion for the song — the steps are "right" but the body is telling the wrong story. Judge whether the action is appropriate, controlled and driven from the correct part of the body.',
  },
  {
    id: 'judging.character',
    title: 'Character and Expression',
    tags: ['dance', 'judging'],
    summary: 'Character is whether the couple embodies the personality of the dance.',
    content:
      'Every dance has a personality, and character judges whether the couple embodies it. Waltz is elegant, formal and regal; Cha Cha is fiery, flirtatious and cheeky; Nightclub is soft, fluid and romantic; Polka is energetic and country. A technically clean routine danced with the wrong character reads as a rehearsal, not a performance. Character is not costume — it is carriage, energy, musical interpretation and connection. Judge it as its own lens: a couple can be perfectly on time and rhythm yet flat in character.',
  },
  {
    id: 'judging.signature-figures',
    title: 'Signature Figures',
    tags: ['dance', 'judging'],
    summary: 'Signature figures are the defining shapes and patterns that make a dance recognisable.',
    content:
      'Each dance is identified by a vocabulary of signature figures. Waltz has the box, twinkle, and fallaway; West Coast Swing has the push, pass and whip; Samba has the volta, whisk and botafogo. A judge checks that the defining figures of the claimed dance are present and correctly executed — a "Waltz" with no recognisable Waltz figures, or a "West Coast Swing" that never uses a push or pass, fails this lens no matter how pretty it looks. Absence or misuse of signature figures is one of the fastest ways to tell that a couple is dancing the wrong dance to the music.',
  },
  {
    id: 'judging.spatial-structure',
    title: 'Spatial Structure and Floorcraft',
    tags: ['dance', 'judging'],
    summary: 'Spatial structure is whether the couple uses the floor the way the dance demands.',
    content:
      'Spatial structure judges the couple\'s relationship with the floor. PROGRESSIVE dances (Waltz, Polka, Two Step) travel around the floor along the line of dance; NON-PROGRESSIVE dances (Nightclub, East Coast Swing) hold a contained geometric area — diamonds, squares, circles — parallel to the audience edge. West Coast Swing lives in a SLOT, using extension and compression, and may change direction briefly without abandoning the slot. Using the wrong structure — a Nightclub travelling continuously around the room, or a slot dance wandering off its line — is a spatial-structure error. FLOORCRAFT (avoiding collisions, sharing space) is judged alongside it.',
  },
  {
    id: 'judging.process',
    title: 'The Judging Process',
    tags: ['dance', 'judging'],
    summary: 'Judge each lens deliberately, compare fairly, and record a defensible decision.',
    content:
      'A defensible judgement is built, not felt. First identify the dance being claimed, then watch through each of the six lenses in turn rather than reacting to overall impression. Separate what is genuinely wrong from what is merely to your personal taste. When comparing couples, hold every couple to the same criteria in the same order, and be able to state the concrete reason one placed above another — "stronger timing and clearer signature figures", not "I liked them more". Record notes as you go: a score you can explain is a score you can stand behind on a panel.',
  },
  {
    id: 'dance.waltz',
    title: 'Judging the Waltz',
    tags: ['dance', 'judging', 'waltz'],
    summary: 'Waltz: 3/4 time, rise and fall, regal character, and progressive diagonal travel.',
    content:
      'The Waltz is in 3/4 time, counted 1 2 3 4 5 6 across two bars, with the MUSICAL accents on 1 and 4 and the couple’s DANCE accents typically on 2 and 5. Its defining MOTION is rise and fall — a smooth vertical swing through each figure — with swing and sway (pendulum, metronomic and rotational). CHARACTER is elegant, formal and regal. SIGNATURE FIGURES include the box, twinkle, diamond and fallaway. SPATIAL STRUCTURE is progressive: the couple travels counter-clockwise around the line of dance, moving on diagonals with streamlining, not circling on the spot. Common faults a judge watches for: correct 3/4 timing but weak or absent rise and fall, a thin figure vocabulary, and travel that fails to progress along the line of dance.',
  },
  {
    id: 'dance.nightclub',
    title: 'Judging the Nightclub',
    tags: ['dance', 'judging', 'nightclub'],
    summary: 'Nightclub: 4/4 slow-quick-quick, base-driven sway, romantic character, non-progressive geometry.',
    content:
      'Nightclub (Nightclub Two Step) is in 4/4 time with a slow-quick-quick rhythm and ball-flat footwork. Its defining MOTION is a soft sway and counter-sway generated from the BASE (feet, ankles, legs) rather than tilted from the upper body — a common fault is faking the look by tipping the torso. CHARACTER is soft, fluid and romantic. SIGNATURE FIGURES include diamonds, passes and rotations. SPATIAL STRUCTURE is NON-PROGRESSIVE: the couple holds a contained geometric area — diamonds, squares, circles — parallel to the audience edge, creating volume and depth without travelling around the floor. The classic spatial fault is a Nightclub that travels continuously around the room like a progressive dance.',
  },
  {
    id: 'dance.west-coast-swing',
    title: 'Judging the West Coast Swing',
    tags: ['dance', 'judging', 'west-coast-swing'],
    summary: 'WCS: 4/4 six- and eight-count patterns in a slot, anchored, with push/pass/whip and a hybrid smooth-rhythm feel.',
    content:
      'West Coast Swing is in 4/4, danced in six- and eight-count patterns made of walks and triples, with a back-beat emphasis. Its MOTION is a hybrid: smooth glide combined with rhythmic check steps, using EXTENSION and COMPRESSION of the connection, and every pattern SETTLES on an anchor at the end. CHARACTER is cool, grounded and conversational — a hybrid of smooth and rhythm identities. SIGNATURE FIGURES include the push (sugar push), pass and whip. SPATIAL STRUCTURE is the SLOT: a narrow lane, kept parallel to the audience, in which the follower travels back and forth. A brief, purposeful direction change (as in a whip) is allowed as long as the couple re-establishes the slot; the fault is permanently abandoning it. Common faults a judge watches for: a weak or missing anchor settle, no extension/compression, and wandering off the slot.',
  },
  {
    id: 'dance.polka',
    title: 'Judging the Polka',
    tags: ['dance', 'judging', 'polka'],
    summary: 'Polka: 4/4 or 2/4 with a 1&2 3&4 lilt, ball-ball-ball-flat, up/down pulse, energetic country character, aggressive progressive travel.',
    content:
      'Polka is in 4/4 or 2/4 with a 1&2 3&4 structure — a bright, lilting triple feel on a ball-ball-ball-flat action. Its defining MOTION is a springy up/down PULSE (a lilt), with a slight forward poise driving the couple down the floor. CHARACTER is energetic, bright and country — the most up-tempo, exuberant of the smooth-travelling dances. SIGNATURE FIGURES include skips, gallops, rotating chasses and weaves. SPATIAL STRUCTURE is aggressively PROGRESSIVE: the couple covers the floor with strong forward travel and rotation, more driving than the Waltz. Common faults a judge watches for: a flat, pulse-less Polka (no lilt), an under-powered travel that fails to drive down the floor, and heavy landings that kill the springy up/down feel.',
  },
  {
    id: 'dance.triple-two',
    title: 'Judging the Triple Two',
    tags: ['dance', 'judging', 'triple-two'],
    summary: 'Triple Two: 4/4 slow-slow-triple-triple, whole-body shape with opposite shaping, romantic, progressive on a curved path.',
    content:
      'Triple Two is in 4/4 with a slow-slow-triple-triple rhythm — two heel-flat walking steps followed by two ball-flat triple steps. Its defining MOTION is shape through the whole body, with the successive triples taking OPPOSITE shape (one shaping one way, the next the other), producing continuous, soft, romantic movement. CHARACTER is smooth, soft and romantic. SIGNATURE FIGURES include loops, laces and weaves. SPATIAL STRUCTURE is PROGRESSIVE but on a CURVED path — the couple travels the floor while weaving, rather than in the straight diagonals of a Waltz. Common faults a judge watches for: a rushed or uneven triple, triples that shape the SAME way instead of opposite, and travel that stalls or straightens out instead of flowing on the curve.',
  },
  {
    id: 'dance.cha-cha',
    title: 'Judging the Cha Cha',
    tags: ['dance', 'judging', 'cha-cha'],
    summary: 'Cha Cha: 4/4 with a 4&5 / 8&9 chasse, Cuban motion, cheeky character, controlled non-progressive travel.',
    content:
      'Cha Cha is in 4/4, counted 2 3 4&1 (often taught as 1 2 3 4&5 6 7 8&) where the CHASSE — the quick 4&5 (and 8&) — is its rhythmic signature, with strong emphasis on the "&" counts. MUSICAL accents fall on 1 and 5, DANCE accents on 2 and 6. Its MOTION is Cuban action (hip movement created through the bending and straightening of the knees) — a flat, sharper action is only appropriate to certain music; using the wrong motion for the song is a classic fault. CHARACTER is fiery, flirtatious and cheeky. SIGNATURE FIGURES include basics, breaks (New Yorkers), and rotations (spot turns). SPATIAL STRUCTURE is controlled and largely non-progressive: the couple works a contained area with only limited travel, floorcraft-aware. Common faults a judge watches for: a crushed or mistimed chasse, Cuban motion that is faked or absent, and travelling too much for the style.',
  },
];
