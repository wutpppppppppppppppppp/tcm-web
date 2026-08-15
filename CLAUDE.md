# tcm-web

Next.js App Router marketing site for Thai Chemical Marketing Co., Ltd., deployed on Vercel. Originally generated from `ixartz/next-js-boilerplate`; much of the boilerplate's tooling has since been removed, so treat the upstream README as history rather than instruction.

## Conventions that are not obvious from the code

**Node 22 is the floor, 24 is what we build on.** `engines.node` is deliberately a floor (`>=22`) so the 22.x compatibility job in CI does not emit `EBADENGINE`, while `.node-version` pins the Vercel build and local toolchains to 24. Node 20 is end-of-life; do not reintroduce it.

**No `legacy-peer-deps`.** The tree resolves cleanly without it. The flag previously masked a real conflict — React pinned to an exact version Clerk did not support. If a peer conflict appears, fix the versions rather than restoring the flag.

**There is no authentication.** Clerk and its entire `(auth)` route group — dashboard, sign-in, sign-up, user profile — were unlinked boilerplate scaffolding and have been removed. This is a public marketing site with no logged-in surface. Adding auth back means designing it, not restoring it.

**Conventional commits are enforced** by the husky `commit-msg` hook via commitlint, and `npm run commit` walks you through one. This is kept for readability, not for releases — see [ADR 0001](docs/adr/0001-retire-semantic-release.md).

**There is no release pipeline.** Deployments are identified by commit SHA in Vercel. The version in `package.json` is inert.

## Testing

- `npm run test` — vitest unit tests, `src/**/*.test.ts(x)`
- `npm run test:e2e` — Playwright smoke tests over the marketing routes, `tests/e2e/*.spec.ts`

The e2e suite builds and starts a production server itself. In CI the build already happened, so `PLAYWRIGHT_SKIP_BUILD=1` makes it reuse that build instead of paying twice.

`tsconfig.json` **excludes** `**/*.spec.ts`, so Playwright specs are linted but not type-checked. Bear that in mind when editing them.

`tests/e2e/marketing.spec.ts` carries a `KNOWN_MISSING_ASSETS` list of assets the app references but does not ship. These are real pre-existing defects, baselined so the suite still fails on any *new* broken asset. Remove entries as the underlying paths are fixed — do not add to the list to make a failure go away.

## Internationalisation

`next-intl` with `localePrefix: 'as-needed'` and `th` as the default locale, so Thai routes are unprefixed and English routes carry `/en`. The locale is also negotiated from `Accept-Language`, which means an English browser hitting `/` is redirected to `/en`. Tests that assert on a locale must set the browser locale, not just the header.

Translations are edited directly in `src/locales/en.json` and `src/locales/th.json`. Crowdin was removed — the organisation was suspended and translation sync had not been working — so both files are now maintained by hand. Keep their key sets identical; a key present in one and missing from the other surfaces as a raw key in the UI.

## Environment

`.env.example` lists every variable the app needs, with non-secret placeholders. It is the only env file in git — copy it to `.env.local` and fill in real values to work locally.

Secrets belong in `.env.local`, which is gitignored along with everything else matching `.env*`. Real values for deployments live in Vercel's project settings. CI copies `.env.example` to `.env` purely to satisfy build-time validation.

`src/libs/Env.ts` validates variables with `@t3-oss/env-nextjs` **at build time**. Since Clerk was removed, every variable is optional and the app builds with none of them set — each just disables its feature. If you add a *required* variable, add it to `.env.example` too, or CI will break loudly at build time rather than mysteriously at runtime.
