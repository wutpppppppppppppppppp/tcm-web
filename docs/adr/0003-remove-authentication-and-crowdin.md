# 3. Remove authentication and Crowdin

Date: 2026-08-15

## Status

Accepted

## Context

Two inherited subsystems were carrying cost without delivering anything.

**Clerk.** The boilerplate shipped a complete authentication surface: a `(auth)` route group containing `/dashboard`, `/sign-in`, `/sign-up` and `/user-profile`, protected by `clerkMiddleware`. None of it was reachable. No navigation, button or link anywhere in the marketing UI pointed at any of those routes, and `/dashboard` rendered nothing but a `<Hello />` component that printed `Hello {email}!` — the boilerplate's demonstration of reading the current user. `Hello` had no other consumer.

The cost was not just two packages. Clerk forced `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `NEXT_PUBLIC_CLERK_SIGN_IN_URL` to be present at build time, which is why the repository needed committed placeholder environment files at all. It also imposed a React peer range narrower than Next's, pinning specific patch lines — a live constraint that had already caused an unsupported React/Clerk combination to be masked by `legacy-peer-deps`.

**Crowdin.** Configured to sync `src/locales/th.json` and running as a CI job. It had been failing, and the cause was not transient:

```
Error from server: <Code: 402, Message: Organization is currently suspended>
```

The Crowdin organisation is suspended, so translation sync had not been functioning. The job's only observable effect was to fail checks on pull requests.

## Decision

Remove Clerk entirely: the `(auth)` route group, the `Hello` component, the Clerk middleware, the three Clerk environment variables, the `Dashboard`, `DashboardLayout`, `SignIn`, `SignUp` and `UserProfile` locale namespaces, and both `@clerk/*` packages. The middleware becomes plain `next-intl` routing.

Remove Crowdin: `crowdin.yml` and the sync job. Translations are maintained by hand in `src/locales/*.json`.

`next-intl` is unaffected. It is the actual internationalisation layer; Crowdin was only the translation-management service in front of it.

## Consequences

The site has no logged-in surface and no authenticated routes. Every route is public. Adding authentication later is a design exercise, not a restoration — the deleted pages were demo scaffolding and would not be worth reviving.

Every environment variable is now optional. The app builds with none set, each simply disabling its feature. This removes the original reason for committing placeholder environment files.

Both locale files are now maintained manually and must be kept in step. A key present in one and absent from the other surfaces as a raw key in the UI rather than falling back, so this is the main new failure mode introduced here. If translation volume grows enough to make that painful, reach for a translation service again — and unsuspend or replace the Crowdin account rather than reinstating a pipeline that points at a dead one.

## Alternatives considered

**Keep Clerk for a future customer portal.** Rejected: nothing about the deleted pages would survive designing a real portal, and in the meantime Clerk constrains React upgrades and forces build-time secrets on a site that has no users to authenticate.

**Keep Crowdin and unsuspend the account.** Not rejected on merit — it is a reasonable thing to do later. But the pipeline should not sit in CI failing while that decision is pending, and two locale files are comfortably maintainable by hand.
