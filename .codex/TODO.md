# Clerk authentication POC handoff

Status: planning approved; implementation has not started.

## Branch

- Work on `codex/clerk-auth-poc`.
- The branch was created from `origin/main` at commit `cc1bb9a`.
- Do not use the older `master` name; this repository's default branch is `main`.
- The original checkout had unrelated user changes to
  `apps/skill-up-game/public/mockServiceWorker.js` and `package-lock.json`.
  Do not copy, stash, discard, or commit those changes into this branch.

## Objective

Build a proof of concept for Clerk authentication in the hosted Engineering
Academy while preserving its local-first architecture:

- hosted Sites build requires Clerk authentication;
- local development and the shareable offline ZIP remain accountless;
- all missions, narration, scoring, settings, profiles, and progress remain on
  the user's PC;
- no cloud saves, sync engine, Supabase, MongoDB, D1, R2, or billing code;
- do not merge or deploy the POC without explicit user approval.

## Recommended design

1. Use `@clerk/clerk-js`; Angular has no dedicated Clerk integration.
2. Add an application-owned auth port with `NoAuthAdapter` and
   `ClerkAuthAdapter` implementations.
3. Add an explicit `hosted` Angular build configuration. Keep `development`
   and `shareable` auth-free.
4. Use file replacement for the shareable auth provider so the offline build
   does not reference, initialize, or request Clerk code.
5. Add hosted-only sign-in and account routes plus a conditional auth guard.
   Preserve the existing `profileGuard` as the separate local-profile check.
6. Use Clerk Restricted mode with Dashboard invitations for the closed beta.
7. Keep `playerStateSchema` local. In hosted mode, scope saves by Clerk user ID:
   `engineering-academy:save:<user-id>`. Sign-out must retain the save.
8. Do not silently attach an existing unscoped save to the first Clerk user;
   require an explicit migration choice.
9. Treat the first milestone as a client-integration POC. Document that a
   client route guard is not a hard content-security boundary.
10. Evaluate Worker-side verification as a separate second milestone. The
    current Sites build emits an unbundled Worker, so `@clerk/backend` would
    require a Worker bundling step.

## Clerk/Sites configuration

Never commit credentials. Expected configuration values are:

- `CLERK_PUBLISHABLE_KEY` for the hosted frontend/runtime configuration;
- `CLERK_JWT_KEY` for optional networkless Worker token verification;
- `CLERK_SECRET_KEY` only for future server/admin operations, never Angular.

The user will create and inspect the Clerk application. Before testing, confirm
the configured development and hosted origins and enable Restricted sign-up.

## Verification checklist

- local development starts and plays with no Clerk configuration;
- shareable ZIP builds and works offline with no Clerk network requests;
- hosted configuration redirects signed-out users to sign-in;
- invited Clerk user can sign in and reach normal Academy enrolment;
- account view and sign-out work;
- two users in the same browser receive separate local saves;
- sign-out and auth failures never delete player state;
- gameplay continues after connectivity drops following sign-in;
- build, tests, lint, route specs, and focused auth/persistence specs pass;
- report POC findings before any merge or deployment.

## Relevant existing files

- `apps/engineering-academy/src/environments/environment.ts`
- `apps/engineering-academy/src/environments/environment.shareable.ts`
- `apps/engineering-academy/project.json`
- `apps/engineering-academy/src/app/app.routes.ts`
- `apps/engineering-academy/src/app/app.config.ts`
- `apps/engineering-academy/build-sites.mjs`
- `libs/academy/data-access/src/lib/persistence.service.ts`
- `tools/package-academy-local.mjs`

Start the next session by reviewing this handoff and producing a short
implementation plan. Do not begin coding until the user explicitly says to
start the POC.
