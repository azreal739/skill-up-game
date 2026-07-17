# Hosted authentication security

## Current status

The hosted Engineering Academy uses Clerk for sign-in, waitlist invitations,
session lifecycle, and per-user namespacing of device-local saves. Local and
shareable builds remain accountless.

The current Angular guard and conditional shell are a **client-side experience
gate**, not a server-side authorization boundary. They prevent normal signed-out
navigation, but a determined visitor can modify browser code or download public
JavaScript assets. Local storage is also controlled by the person using that
browser; user-scoped save keys provide separation and migration behavior, not
encryption or protection from someone with device access.

## Safe deployment boundary

Until Worker-side authorization exists, the Sites access policy must remain
owner-only or otherwise restricted by the hosting platform. Do not switch the
Site to public on the assumption that the Angular guard makes the game private.

The current POC uses a Clerk development instance (`pk_test_`). Clerk documents
development instances as having a relaxed security posture and not being
suitable for production workloads. Before inviting external users, create a
Clerk production instance, configure the production domain and OAuth providers,
and replace the hosted publishable key with its `pk_live_` value.

## Required before public access

1. Decide what requires real authorization. Public client code and curriculum
   cannot be made secret by a route guard; protected APIs and private data can.
2. Add a Worker/backend authorization layer for every protected endpoint. Send
   the Clerk session token with requests and verify its signature, expiry,
   issuer, and authorized party on the server.
3. Keep the Clerk secret key server-side only. Prefer networkless verification
   with the Clerk JWT public key where supported; never put a secret key in the
   Angular bundle or runtime configuration response.
4. Add authorization tests that call protected endpoints without a token, with
   a malformed token, with an expired token, and with a token issued for another
   origin. Each request must fail closed.
5. Configure a production-appropriate Content Security Policy for Clerk and the
   Academy's voice/model origins, then test sign-in, waitlist, narration, and
   local/offline builds.
6. Only after these checks pass should Sites access be changed to public and
   Clerk's waitlist become the external admission flow.

## Current defensive controls

- No Clerk secret key is committed or exposed to Angular.
- Runtime configuration is JSON-encoded and returned with `no-store`.
- Hosted responses set anti-framing, MIME-sniffing, referrer, and permissions
  headers. The focused CSP directives intentionally avoid blocking Clerk or the
  existing client-side narration/model downloads.
- Post-auth return paths are restricted to same-origin Academy routes.
- Saves remain Zod-validated and device-local, with explicit migration from the
  legacy accountless key.

## Manual pre-beta bypass test

Run these checks while the Sites access policy is still private. The first set
checks that the Clerk UX gate behaves correctly; it does not prove server-side
authorization.

1. While signed in, copy several deep links such as `/campaigns`, `/settings`,
   and a real `/missions/<mission-id>` URL.
2. Sign out with the Clerk account menu. Confirm the Academy shell disappears
   and the browser returns to `/sign-in`.
3. Paste each copied deep link into the address bar and hard-refresh it. Every
   route must redirect to `/sign-in`; the game header and route content must not
   render first.
4. Use the browser Back and Forward buttons after sign-out. Cached screens must
   not restore an authenticated Academy shell.
5. Open a private/incognito window. While Sites is owner-only, the hosting
   platform should challenge the visitor before Clerk loads. This tests the
   current hosting boundary, not Clerk.
6. In the normal signed-out window, create or edit only Academy local-storage
   save keys. Local progress must not sign the user in or unlock protected
   routes. Do not copy or modify real Clerk session tokens.
7. Sign back in and confirm the expected account-scoped save returns. Sign out,
   sign in as a different invited test account, and confirm it receives a
   separate device-local save slot.

Expected conclusion: URL guessing, refreshes, browser history, and Academy save
tampering do not bypass the normal Clerk flow. A determined visitor can still
modify client JavaScript once the Site is public, which is why these tests do
not remove the Worker-side authorization requirement for protected APIs or
private content.
