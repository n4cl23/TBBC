-- Align the persisted canonical identifier with SemanticRelation UUID columns.
-- Invalid legacy values fail the cast and abort the migration without data loss.
ALTER TABLE "WorldEntity" ALTER COLUMN "canonicalId" DROP DEFAULT;
ALTER TABLE "WorldEntity"
  ALTER COLUMN "canonicalId" TYPE UUID USING "canonicalId"::uuid;
ALTER TABLE "WorldEntity" ALTER COLUMN "canonicalId" SET DEFAULT gen_random_uuid();
