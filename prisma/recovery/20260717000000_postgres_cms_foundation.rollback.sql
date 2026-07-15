-- Preview-only rollback for the audited partial execution of
-- 20260717000000_postgres_cms_foundation. Run inside one transaction.

ALTER TABLE "SemanticRelation" DROP CONSTRAINT IF EXISTS "SemanticRelation_source_fkey";
ALTER TABLE "SemanticRelation" DROP CONSTRAINT IF EXISTS "SemanticRelation_target_fkey";
ALTER TABLE "SemanticRelation" DROP CONSTRAINT IF EXISTS "SemanticRelation_timelineEvent_fkey";
ALTER TABLE "CanonSnapshot" DROP CONSTRAINT IF EXISTS "CanonSnapshot_canonVersionId_fkey";
ALTER TABLE "MediaVariant" DROP CONSTRAINT IF EXISTS "MediaVariant_mediaId_fkey";

DROP TABLE "MediaVariant";
DROP TABLE "RestoreOperation";
DROP TABLE "ChangeSet";
DROP TABLE "CanonSnapshot";
DROP TABLE "CanonVersion";

DROP INDEX "MediaAsset_checksum_key";
DROP INDEX "MediaAsset_storageKey_key";
ALTER TABLE "MediaAsset"
  DROP COLUMN "checksum",
  DROP COLUMN "durationMs",
  DROP COLUMN "provenance",
  DROP COLUMN "publicUrl",
  DROP COLUMN "storageKey";

DROP INDEX "SemanticRelation_source_relationType_status_idx";
DROP INDEX "SemanticRelation_target_relationType_status_idx";
DROP INDEX "SemanticRelation_source_target_relationType_key";
ALTER TABLE "SemanticRelation"
  ALTER COLUMN "relationType" TYPE TEXT USING "relationType"::text,
  DROP COLUMN "metadata";
CREATE UNIQUE INDEX "SemanticRelation_source_target_relationType_key" ON "SemanticRelation"("source", "target", "relationType");
CREATE INDEX "SemanticRelation_source_relationType_status_idx" ON "SemanticRelation"("source", "relationType", "status");
CREATE INDEX "SemanticRelation_target_relationType_status_idx" ON "SemanticRelation"("target", "relationType", "status");

ALTER TABLE "WorldEntity"
  DROP COLUMN "createdBy",
  DROP COLUMN "deletedAt",
  DROP COLUMN "revision",
  DROP COLUMN "updatedBy";

ALTER TABLE "AuditLog"
  DROP COLUMN "newVersion",
  DROP COLUMN "origin",
  DROP COLUMN "previousVersion",
  DROP COLUMN "relationId",
  DROP COLUMN "requestId";

DROP TYPE "SemanticRelationType";
