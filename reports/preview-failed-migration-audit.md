# Preview failed migration audit

Audit source: GitHub Actions run `29420355824`, Neon branch `preview`. The audit was read-only and sanitized.

## Prisma record

- Migration: `20260717000000_postgres_cms_foundation`
- Started: `2026-07-15T13:20:00.338Z`
- Finished: `null`
- Rolled back: `null`
- Applied steps: `0`
- Checksum: `6fa4620e323c369746b284beea1f8c4e6a0b635d57601d3ea20df14b76e4a88e`
- Prisma state: failed
- PostgreSQL error: `42804`
- Failure: `SemanticRelation_source_fkey` could not reference `WorldEntity.canonicalId`; the source column is `uuid` and the referenced column is `text`.

`applied_steps_count=0` does not mean that no DDL took effect. PostgreSQL retained 33 of the 38 audited objects because this SQL file was not applied as one atomic transaction.

## Classification

**SCENARIO E — Migration SQL/schema incorrect.** The physical substate is a partial application without data, equivalent to the rollback mechanics of Scenario B. Scenario E is authoritative because `schema.prisma` modeled `WorldEntity.canonicalId` as text while `SemanticRelation.source`, `target`, and `timelineEvent` are UUID and the migration attempted UUID foreign keys.

## Data safety

All audited Preview tables contained zero rows:

- Existing tables: `WorldEntity`, `SemanticRelation`, `MediaAsset`, `AuditLog`.
- New tables: `CanonVersion`, `CanonSnapshot`, `ChangeSet`, `RestoreOperation`, `MediaVariant`.
- Invalid non-null canonical UUID strings: `0`.

No canonical, administrative, media, audit, snapshot, or relation row is at risk in this audited Preview state.

## Partial schema matrix

| Object group | Expected before | Expected after | Current state | Required action |
|---|---|---|---|---|
| `SemanticRelationType` enum | absent | present | present | remove during controlled rollback |
| Five new CMS tables | absent | present | present; all empty | remove during controlled rollback |
| AuditLog additions (5) | absent | present | present; empty table | remove during controlled rollback |
| MediaAsset additions (5) | absent | present | present; empty table | remove during controlled rollback |
| SemanticRelation metadata/enum conversion | absent/text | present/enum | present/enum; empty table | restore text and remove metadata |
| WorldEntity additions (4) | absent | present | present; empty table | remove during controlled rollback |
| Twelve expected indexes | mixed | present | all present | remove new indexes; restore three prior relation indexes |
| Three SemanticRelation foreign keys | absent | present | absent | fix UUID alignment, then reapply |
| CanonSnapshot foreign key | absent | present | absent | reapply |
| MediaVariant foreign key | absent | present | absent | reapply |

Objects present: **33/38**. Objects absent: **5/38**, exactly the five final foreign keys. No sequences, duplicate tables, invalid constraints, or populated partial columns were found.

## Migration SQL risk catalogue

- Non-idempotent: `CREATE TYPE`, `ADD COLUMN`, `CREATE TABLE`, `CREATE INDEX`, `ADD CONSTRAINT`.
- Data-changing: AuditLog and MediaAsset backfills; safe here only because both tables are empty.
- Destructive/replacement: three SemanticRelation indexes are dropped/recreated and `relationType` changes from text to enum.
- Dependency-sensitive: tables precede indexes; compatible types and unique referenced keys precede foreign keys.
- Incompatible operation: UUID SemanticRelation foreign keys targeted a text `WorldEntity.canonicalId`.
- No Canon or Lore inserts/updates exist in this migration.

Production was not accessed.
