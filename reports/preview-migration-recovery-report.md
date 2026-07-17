# Preview Migration Recovery Report

Status: **BLOCKED — safe neutralization completed; versioned deployment blocked by a PostgreSQL advisory lock.**

## Scope and safeguards

- Target: GitHub Environment `preview`, Neon branch metadata `preview`.
- Production: not accessed or modified.
- No connection string, endpoint, account, password, or database identifier is recorded in this report.
- Canon, Lore, entities, and relations were not modified.
- No destructive database command was used (`db push`, `migrate dev`, `migrate reset`, or session termination).

## Initial audited condition

- Failed migration: `20260717000000_postgres_cms_foundation`.
- Recorded state: unfinished, not rolled back, `applied_steps_count = 0`.
- Root cause: `WorldEntity.canonicalId` was text while the new semantic foreign keys require UUID compatibility.
- Physical state: 33 of 38 expected objects existed; five final foreign keys were absent.
- Every table in the recovery blast radius was verified empty before mutation.
- Classification: **Scenario E — migration SQL/schema incompatibility with an empty partial physical state**.

## Recovery actions completed

1. Preview pre-flight passed with all required secrets present; only `SET`/safe metadata were emitted.
2. Prisma client generation passed.
3. The exact partial-state recovery script re-audited every prerequisite and ran `prisma/recovery/20260717000000_postgres_cms_foundation.rollback.sql` inside one transaction.
4. The original failed migration was marked rolled back only after that re-audit.
5. A second recovery pass confirmed the safe neutralized state: partial tables and columns are absent, affected tables remain empty, expected final foreign keys remain absent, and `WorldEntity.canonicalId` remains text pending the corrective migration.
6. The Preview `DATABASE_URL_UNPOOLED` endpoint was verified as unpooled without recording its address.

## Deployment blocker

`npx prisma migrate deploy` could reach Preview but stopped before applying migrations because it could not acquire Prisma's PostgreSQL advisory migration lock within 10 seconds (`P1002`).

The lock occurred on three isolated recovery executions, including after cancellation of the competing Preview database gate. Therefore no corrective migration or CMS foundation migration was applied by those executions.

This is an external database-session blocker, not a Canon or schema-migration-content error. The recovery workflow is intentionally stopped here; it does not bypass the lock or terminate a session.

## Final Preview state

- Partial CMS foundation objects: removed safely.
- Failed foundation record: rolled back.
- Corrective UUID migration: pending.
- CMS foundation migration: pending reapplication.
- Prisma `validate`: passed locally against the checked-in schema.
- Prisma `generate`: passed locally.
- Prisma `migrate status`: not rerun remotely after the blocked deploy; the workflow correctly stopped at the migration gate.
- Production: unchanged.

## Migration inventory

- `20260714000000_consolidate_canon`
- `20260715000000_canon_ssot`
- `20260716000000_semantic_relations`
- `20260716010000_semantic_relation_versions`
- `20260716020000_align_world_entity_canonical_id_uuid` — pending
- `20260717000000_postgres_cms_foundation` — original execution rolled back; pending reapplication

## Evidence

- Read-only failed-migration audit: [run 29420355824](https://github.com/n4cl23/TBBC/actions/runs/29420355824)
- First recovery (neutralization and resolve succeeded; deploy lock timeout): [run 29601533470](https://github.com/n4cl23/TBBC/actions/runs/29601533470)
- Isolated retry (same lock timeout): [run 29601827843](https://github.com/n4cl23/TBBC/actions/runs/29601827843)
- Unpooled-endpoint retry (same lock timeout): [run 29602022680](https://github.com/n4cl23/TBBC/actions/runs/29602022680)

## Required next authority

Authorize a Preview-only investigation/removal of the external advisory-lock holder, or have the owner of that session release it. After the lock is released, rerun the existing isolated recovery workflow; it will resume idempotently, deploy the two pending migrations, then execute `prisma validate`, `prisma generate`, `prisma migrate status`, schema diff, and the final read-only evidence report.
