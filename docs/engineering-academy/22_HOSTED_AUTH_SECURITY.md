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

## Pre-beta risk acceptance and operating boundary

For controlled pre-beta testing, the project accepts the limitations of the
client-side gate and the Clerk development instance. This is an operational
admission control and deterrence measure, not cryptographic protection of the
public JavaScript or curriculum assets.

The accepted boundary is:

- Hosted use requires an internet connection.
- The app has no protected backend APIs or sensitive server-side user data.
  Academy progress remains in device-local storage.
- Only trusted testers are approved through the Clerk waitlist.
- Public Sites access is enabled only for an explicitly approved, time-boxed
  testing window. The default state remains owner-only/private.
- Clerk and Sites usage are monitored during the window. Unexpected traffic,
  authentication anomalies, or the end of the window triggers an immediate
  return to owner-only/private access.
- A Clerk session lasting a day or longer is acceptable for these trusted
  testing windows. The actual session lifetime is a Clerk Dashboard policy and
  must be reviewed there rather than assumed from the Angular implementation.

The current POC uses a Clerk development instance (`pk_test_`). Its relaxed
security posture is accepted only for this narrow pre-beta phase. A production
instance and owned production domain are deferred until the product name and
hosting environment are settled.

## Required before V1 or protected server data

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
6. Move to a Clerk production instance and a production domain before a broad
   audience or V1 release.

These controls become mandatory earlier if the Academy adds private APIs,
cloud saves, secrets, paid entitlements, or any data that must remain
inaccessible to an unauthorized visitor.

## Current defensive controls

- No Clerk secret key is committed or exposed to Angular.
- Runtime configuration is JSON-encoded and returned with `no-store`.
- Hosted responses set anti-framing, MIME-sniffing, referrer, and permissions
  headers. The focused CSP directives intentionally avoid blocking Clerk or the
  existing client-side narration/model downloads.
- Post-auth return paths are restricted to same-origin Academy routes.
- Saves remain Zod-validated and device-local, with explicit migration from the
  legacy accountless key.

## Pre-beta public-window runbook

1. Confirm Clerk waitlist mode is enabled and only the intended trusted testers
   are approved or invited.
2. Confirm the Site is owner-only/private and record the current access policy
   before opening the window.
3. Set a start and end time, then explicitly change Sites access to public at
   the start. Do not leave it public indefinitely.
4. In a signed-out incognito window, confirm the public URL reaches Clerk's
   sign-in or waitlist experience and does not render the Academy shell.
5. Approve the tester, complete sign-in, and verify that their progress uses a
   separate device-local save.
6. Monitor Clerk sign-ins/waitlist entries and Sites usage for unexpected
   activity during the test.
7. At the end of the window—or immediately after suspicious activity—restore
   owner-only/private Sites access.
8. Recheck the public URL in incognito and confirm the Sites hosting gate now
   blocks access before Clerk loads.

Changing the Sites access policy requires explicit approval for each testing
window. It is not part of a normal code deployment.

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
   platform should challenge the visitor before Clerk loads. During an
   explicitly approved public window, the same test should reach Clerk's
   sign-in or waitlist screen without rendering the Academy shell.
6. In the normal signed-out window, create or edit only Academy local-storage
   save keys. Local progress must not sign the user in or unlock protected
   routes. Do not copy or modify real Clerk session tokens.
7. Sign back in and confirm the expected account-scoped save returns. Sign out,
   sign in as a different invited test account, and confirm it receives a
   separate device-local save slot.

Expected conclusion: URL guessing, refreshes, browser history, and Academy save
tampering do not bypass the normal Clerk flow. A determined visitor can still
modify client JavaScript once the Site is public, which is why these tests do
not protect public client content. Worker-side authorization remains required
before adding protected APIs or private server data.
