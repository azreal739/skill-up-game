# 14 — Sample Missions

## Sample Mission 1 — Welcome to the Academy

Campaign:
Foundations of the Platform

Difficulty:
Intro

Learning Objectives:
- Understand the mission format.
- Identify the role of Angular in the platform.
- Recognise TypeScript as a safety tool.

Briefing:
> Welcome to Engineering Academy. You have joined the platform team responsible for maintaining a customer-facing Angular application. Your first simulation is simple: inspect a dashboard card and confirm that it displays safe, typed data.

Challenge:
Multiple choice.

Prompt:
A component receives the following data:

```ts
const customer = {
  name: 'Avery',
  score: 720
};
```

Which TypeScript interface best describes this data?

Options:
A.
```ts
interface Customer {
  name: string;
  score: number;
}
```

B.
```ts
interface Customer {
  name: number;
  score: string;
}
```

C.
```ts
interface Customer {
  id: string;
}
```

Correct:
A

Feedback:
> Correct. The interface matches the expected shape and gives the component compile-time safety.

---

## Sample Mission 2 — Runtime Boundary

Campaign:
Zod Gate

Difficulty:
Medium

Learning Objectives:
- Understand that TypeScript does not validate runtime data.
- Use Zod at the API boundary.
- Handle invalid data gracefully.

Briefing:
> The Java API has returned a customer score payload. The Angular app compiles, but production logs show runtime errors. Mission Control suspects the payload does not match the TypeScript interface.

Artefact:
```json
{
  "customerName": "Avery",
  "creditScore": "720"
}
```

Existing TypeScript:
```ts
interface CreditScoreResponse {
  customerName: string;
  creditScore: number;
}
```

Challenge:
Contract comparison.

Question:
What is the issue?

Correct Answer:
`creditScore` is returned as a string but the front end expects a number.

Best Fix:
Validate and transform the response at the API boundary using Zod or align the API contract.

Example:
```ts
const CreditScoreResponseSchema = z.object({
  customerName: z.string(),
  creditScore: z.coerce.number()
});
```

Feedback:
> Correct. This is a runtime contract mismatch. TypeScript cannot protect the app once data crosses the network boundary. Zod can validate or transform the payload before it reaches the component.

---

## Sample Mission 3 — CloudFront Cache Mystery

Campaign:
CloudFront Outage

Difficulty:
Hard

Learning Objectives:
- Understand CDN caching.
- Know why hashed assets matter.
- Recognise when invalidation is needed.

Briefing:
> A deployment completed successfully, but some customers still see the old dashboard. The S3 bucket has the new files. CloudFront is still serving cached content in some regions.

Challenge:
Deployment decision.

Options:
A. Rebuild Angular only.
B. Invalidate CloudFront cache for affected paths.
C. Change a component selector.
D. Restart the Java API.

Correct:
B

Feedback:
> Correct. If S3 has the new assets but CloudFront serves stale content, the edge cache is the likely source. Invalidation or proper cache-busting strategy is needed.

---

## Sample Mission 4 — Nx Boundary Violation

Campaign:
Nx Monorepo Maze

Difficulty:
Medium

Briefing:
> A feature library imports directly from another feature library. The dependency graph shows cross-feature coupling.

Challenge:
Architecture decision.

Question:
What is the best fix?

Good Answer:
Move shared logic into a shared util/data-access/ui library and enforce dependency boundaries with Nx tags.

Feedback:
> Correct. Feature libraries should not become tangled. Shared behaviour belongs in an appropriate shared library with clear ownership.

---

## Sample Mission 5 — Save Production Boss

Campaign:
Save Production

Difficulty:
Boss

Scenario:
A newly released Angular dashboard fails for a subset of users.

Clues:
- Java API release changed a field name.
- Zod schema was not updated.
- Feature flag enabled the new dashboard for all users.
- CloudFront still served one old bundle in one region.
- Unit tests covered happy path only.

Stages:
1. Identify customer impact.
2. Find the API mismatch.
3. Decide feature flag rollback.
4. Validate CloudFront behaviour.
5. Add test coverage.
6. Write incident summary.

Victory:
Production restored with explanation and prevention actions.
