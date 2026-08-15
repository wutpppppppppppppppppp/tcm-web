# 1. Retire semantic-release

Date: 2026-08-15

## Status

Accepted

## Context

This repository was created from [ixartz/next-js-boilerplate](https://github.com/ixartz/next-js-boilerplate), which ships a full npm-package release pipeline: `semantic-release` running on every push to `main`, generating version bumps, a `CHANGELOG.md`, git tags and GitHub releases.

That pipeline makes sense for a boilerplate distributed to other developers. It does not describe what this repository is. `tcm-web` is a company website deployed to Vercel. It is never published to a registry, and nothing installs it by version. The version number in `package.json` had reached `2.11.0` purely by inheriting the boilerplate's release history, and the `chore(release): [skip ci]` commits it produced carried no information that Vercel's own deployment history did not already carry more accurately.

The pipeline was not free. `semantic-release` depends on the bundled `npm` CLI, which accounted for 13 of the vulnerable dependency nodes in the audit tree — the single largest cluster in the repository, all of it dev-only tooling for a capability nobody used.

## Decision

Remove `semantic-release`, `@semantic-release/changelog` and `@semantic-release/git`, delete the `release` configuration block from `package.json`, and delete `.github/workflows/release.yml`.

Reset the version to `1.0.0` and rename the package from `next-js-boilerplate` to `tcm-web`.

Preserve the inherited changelog as `CHANGELOG.legacy.md` rather than deleting it, so the early git history does not appear to start mid-story.

Keep `commitlint`, `commitizen` and the conventional-commit convention. Those are useful independently of releases, the team already writes commits that way, and the husky `commit-msg` hook already enforces it.

## Consequences

Deployments are now identified by commit SHA through Vercel rather than by semver tag. In practice this is what you reach for during an incident anyway: Vercel's deployment list maps directly to commits and offers instant rollback.

There are no more automated GitHub releases or generated changelog entries. If a human-readable history of user-facing changes becomes valuable later, it should be written deliberately rather than derived from commit subjects.

Reversing this decision is possible but not cheap: `semantic-release` would need to reconcile a version line that has been reset, so it would likely have to start from the current version rather than resume the old one.

## Alternatives considered

**Keep semantic-release as-is.** Rejected: it carried the largest vulnerability cluster in the tree in exchange for versioning ceremony with no consumer.

**Keep the tooling but stop running it on `main`.** Rejected: a disabled pipeline still needs maintaining, still shows up in dependency audits, and invites the question of why it exists.
