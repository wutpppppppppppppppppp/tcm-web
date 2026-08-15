# 2. Defer the Next.js 16 upgrade

Date: 2026-08-15

## Status

Accepted

## Context

While bringing the dependency tree up to date, five high-severity advisories remained that no non-breaking upgrade could clear. They resolve to exactly two major upgrades:

- `@sentry/nextjs` 8 → 10, which also carries `rollup`, `@sentry/node`, `@sentry/opentelemetry` and a large `@opentelemetry` subtree
- `next` 15 → 16, which carries transitive `postcss` and `sharp` advisories that were never backported to the 15 release line

A future reader auditing this repository will find those `postcss` and `sharp` advisories still open and reasonably wonder whether they were simply missed. They were not.

The dependency work was scoped as infrastructure-only, under an explicit constraint that nothing user-visible changes. That constraint exists so that if the site misbehaves after deployment, the diff can be pointed at with confidence. Next.js 16 changes caching and rendering defaults, which is precisely the kind of change that constraint was written to exclude. Bundling it with a dependency baseline that already moves `next-intl` across a major and Clerk across thirty minor versions would make any regression far harder to bisect.

The Sentry upgrade was taken, because Sentry 8 is unsupported, its migration is mechanical (configuration files move, application code does not), and it accounts for the larger share of the remaining advisories.

## Decision

Take `@sentry/nextjs` 8 → 10 now. Defer `next` 15 → 16 to its own piece of work, with its own verification.

## Consequences

The `postcss` and `sharp` advisories remain open until Next.js 16 lands. Both are build-time dependencies: `postcss` runs during the build, and `sharp` performs image optimisation server-side. Neither is reachable from untrusted input on a marketing site that serves only first-party images, which is what makes deferring acceptable rather than merely convenient.

When Next.js 16 is picked up, the e2e smoke tests in `tests/e2e/` are the regression net it should be verified against — they were written before any of this work specifically to serve that purpose. The upgrade should also revisit `next.config.ts`, since Cache Components and the caching defaults changed.

## Alternatives considered

**Take Next.js 16 in the same pass.** Rejected: it violates the "nothing visible changes" constraint and destroys bisectability at the exact moment the tree is moving most.

**Defer Sentry as well and take neither.** Rejected: Sentry 8 is unsupported, the migration touches no application code, and leaving it would strand the majority of the remaining advisories for no benefit.
