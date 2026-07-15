# Preview migration recovery plan

Status: **APPROVED BY EVIDENCE — NOT YET EXECUTED**

## Decision

- Scenario: **E — Migration SQL/schema incorrect**, with a partial, empty physical state.
- Target: GitHub Environment `preview`, Neon branch `preview` only.
- Root cause: persisted `WorldEntity.canonicalId` is text while semantic foreign-key columns are UUID.
- Data at risk: none in the audited state; every affected table has zero rows.
- Original failed migration and checksum remain unchanged.

## Exact order

1. Run the existing Preview pre-flight and Production guard.
2. Re-audit the migration record, object inventory, types, and zero-row preconditions.
3. Abort on any drift, populated affected table, missing expected partial object, or unexpected foreign key.
4. Execute `prisma/recovery/20260717000000_postgres_cms_foundation.rollback.sql` in one PostgreSQL transaction.
5. Verify that only the partial objects were removed and the three prior SemanticRelation indexes were restored.
6. Run `npx prisma migrate resolve --rolled-back 20260717000000_postgres_cms_foundation`.
7. Apply `20260716020000_align_world_entity_canonical_id_uuid`, then reapply the unchanged failed migration using `npx prisma migrate deploy`.
8. Run `npx prisma validate`, `npx prisma migrate status`, a second idempotent `migrate deploy`, and `prisma migrate diff`.
9. Resume Canon dry-run/import/verify/integrity and only then quality, build, API/CMS and Playwright gates.

## Rollback SQL

The reviewed SQL is stored at `prisma/recovery/20260717000000_postgres_cms_foundation.rollback.sql`. It removes the five empty new tables, added columns/indexes and enum, restores `SemanticRelation.relationType` to text, and recreates the three indexes that existed before the failed migration. It contains no Canon or Lore DML.

## Corrective migration

`20260716020000_align_world_entity_canonical_id_uuid` converts `WorldEntity.canonicalId` from text to UUID before the CMS foundation migration adds the foreign keys. The cast fails atomically if any invalid value appears. The Prisma field is aligned with `@db.Uuid`.

## Success criteria

- No failed migration record and no pending migration after deploy.
- `WorldEntity.canonicalId`, SemanticRelation source/target/timeline columns are UUID.
- All five foreign keys exist and are valid.
- No partial/duplicate objects or data loss.
- Prisma diff is empty or explicitly documented.
- Canon remains 142 entities, 305 relations, zero orphans and zero prohibited loops.
- CMS audit/version/restore smoke and Playwright pass before the Preview gate can pass.

## Abort conditions

Any non-zero affected-table count, schema drift from the audit, invalid UUID value, failed transaction, unexpected dependency, non-Preview metadata, or Production identifier immediately aborts recovery. No `db push`, `migrate dev`, `migrate reset`, Production access, or promotion is permitted.

## Operational rollback

Before `migrate resolve`, a failed SQL rollback transaction leaves the database unchanged. After a successful rollback but before deploy, the explicit forward recovery is to resolve the audited record as rolled back and deploy the versioned migrations. Any ambiguity after mutation stops the gate and requires a fresh read-only inventory; Production remains untouched.
