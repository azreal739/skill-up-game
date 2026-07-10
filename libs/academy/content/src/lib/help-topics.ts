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
    id: 'http.contract-design',
    title: 'API Contract Design',
    tags: ['api'],
    summary: 'Additive changes are safe; removals, renames and new requirements break deployed clients.',
    content:
      'An API is a promise to clients you cannot see or redeploy. ADDITIVE changes keep it: new optional request fields, new response fields, new endpoints (new enum values are additive-with-an-asterisk — announce them; clients must handle unknown values). BREAKING changes: removing or renaming any field, changing a type or meaning, making optional input required, tightening validation — each fails some deployed client, often silently (renamed response fields read as undefined). Migrate by addition: ship new alongside old, deprecate, remove in a versioned successor. Verbs carry semantics too: PUT replaces the whole resource (an omitted field means DELETE it), PATCH merges only the provided changes — sending a one-field body via PUT politely erases everything else. Status codes: use the standard channel — 200-with-{success:false} makes every generic tool (interceptors, monitors, retries) read failure as success.',
  },
];
