# Preview Database Gate Report

Status: **BLOCKED at Preview runtime health check. No Production access or change.**

## Execution

- Workflow: Preview Database Gate #12.
- Scope: GitHub Environment `preview`, Neon branch metadata `preview`.
- Production: not accessed.
- Secrets and connection details: not recorded.

## Passed checks

- Prisma client generation and schema validation.
- Migration inventory, migration status, deploy, and idempotent deploy.
- Canon dry-run, import, repeat verification, and integrity verification.
- Canon counts: 142 entities and 305 semantic relations.
- Relation integrity: zero orphans and zero prohibited loops.
- Content integrity: zero duplicate typed slugs, broken media metadata, orphan/duplicate translations, and invalid taxonomies.
- Creature media file validation.
- Lint, TypeScript typecheck, unit tests, and production build.

## Blocking failure

The Preview smoke test reached the home page successfully, then `/api/health` returned HTTP 503 instead of 200. The gate stopped immediately; therefore the remaining public API checks, authenticated CMS smoke, graph smoke, and Playwright did not run.

The database-side Canon and migration gates passed in the isolated Preview environment. The remaining issue is limited to the deployed Preview runtime health path: it is either not reading the same canonical Preview state or its runtime database check is failing. The response body could not be inspected from this execution, so the exact runtime cause remains unconfirmed.

## Evidence

- Recovery passed: [run 29602704233](https://github.com/n4cl23/TBBC/actions/runs/29602704233)
- Database Gate blocked: [run 29602958097](https://github.com/n4cl23/TBBC/actions/runs/29602958097)

## Next safe action

Diagnose the Preview deployment runtime configuration and `/api/health` response only. Do not rerun Canon import or promote anything until health returns 200; then rerun the Preview Database Gate manually.
