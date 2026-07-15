CREATE TYPE "SemanticRelationType" AS ENUM ('RULES','PROTECTS','FORGED','CREATED','DESTROYED','PARTICIPATED','DEFEATED','SEALED','AWAKENED','ALLY','ENEMY','MENTOR','APPRENTICE','TRADES_WITH','LOCATED_IN','BORN_IN','DIED_IN','OWNS','USES','LEADS','SERVES','FOLLOWS','RELATED_TO','DISCOVERED','HUNTS','GUARDS','SEEKS','BETRAYED','SACRIFICED_FOR','BOUND_TO','MEMBER_OF','HABITAT_IN','FEATURED_IN','PRECEDES','CAUSED');

ALTER TABLE "AuditLog" ADD COLUMN "newVersion" INTEGER, ADD COLUMN "origin" TEXT, ADD COLUMN "previousVersion" INTEGER, ADD COLUMN "relationId" UUID, ADD COLUMN "requestId" TEXT;
UPDATE "AuditLog" SET "requestId" = gen_random_uuid()::text WHERE "requestId" IS NULL;
ALTER TABLE "AuditLog" ALTER COLUMN "requestId" SET NOT NULL;

ALTER TABLE "MediaAsset" ADD COLUMN "checksum" TEXT, ADD COLUMN "durationMs" INTEGER, ADD COLUMN "provenance" TEXT, ADD COLUMN "publicUrl" TEXT, ADD COLUMN "storageKey" TEXT;
UPDATE "MediaAsset" SET "checksum"=md5("id"||"src"), "publicUrl"="src", "storageKey"=COALESCE(NULLIF("src",''),'legacy/'||"id") WHERE "checksum" IS NULL;
ALTER TABLE "MediaAsset" ALTER COLUMN "checksum" SET NOT NULL, ALTER COLUMN "publicUrl" SET NOT NULL, ALTER COLUMN "storageKey" SET NOT NULL;

DROP INDEX IF EXISTS "SemanticRelation_source_relationType_status_idx";
DROP INDEX IF EXISTS "SemanticRelation_target_relationType_status_idx";
DROP INDEX IF EXISTS "SemanticRelation_source_target_relationType_key";
ALTER TABLE "SemanticRelation" ADD COLUMN "metadata" JSONB;
ALTER TABLE "SemanticRelation" ALTER COLUMN "relationType" TYPE "SemanticRelationType" USING "relationType"::"SemanticRelationType";

ALTER TABLE "WorldEntity" ADD COLUMN "createdBy" TEXT, ADD COLUMN "deletedAt" TIMESTAMP(3), ADD COLUMN "revision" INTEGER NOT NULL DEFAULT 1, ADD COLUMN "updatedBy" TEXT;

CREATE TABLE "CanonVersion" ("id" UUID NOT NULL DEFAULT gen_random_uuid(),"version" TEXT NOT NULL,"entityCount" INTEGER NOT NULL,"relationCount" INTEGER NOT NULL,"checksum" TEXT NOT NULL,"importedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,"importedBy" TEXT NOT NULL,CONSTRAINT "CanonVersion_pkey" PRIMARY KEY ("id"));
CREATE TABLE "CanonSnapshot" ("id" UUID NOT NULL DEFAULT gen_random_uuid(),"canonVersionId" UUID NOT NULL,"payload" JSONB NOT NULL,"checksum" TEXT NOT NULL,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "CanonSnapshot_pkey" PRIMARY KEY ("id"));
CREATE TABLE "ChangeSet" ("id" UUID NOT NULL DEFAULT gen_random_uuid(),"actor" TEXT NOT NULL,"entityType" TEXT NOT NULL,"entityId" TEXT NOT NULL,"fromVersion" INTEGER,"toVersion" INTEGER NOT NULL,"changedFields" JSONB NOT NULL,"requestId" TEXT NOT NULL,"reason" TEXT,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "ChangeSet_pkey" PRIMARY KEY ("id"));
CREATE TABLE "RestoreOperation" ("id" UUID NOT NULL DEFAULT gen_random_uuid(),"entityType" TEXT NOT NULL,"entityId" TEXT NOT NULL,"sourceVersion" INTEGER NOT NULL,"newVersion" INTEGER NOT NULL,"actor" TEXT NOT NULL,"reason" TEXT NOT NULL,"requestId" TEXT NOT NULL,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "RestoreOperation_pkey" PRIMARY KEY ("id"));
CREATE TABLE "MediaVariant" ("id" UUID NOT NULL DEFAULT gen_random_uuid(),"mediaId" TEXT NOT NULL,"kind" TEXT NOT NULL,"storageKey" TEXT NOT NULL,"publicUrl" TEXT NOT NULL,"mimeType" TEXT NOT NULL,"size" INTEGER NOT NULL,"width" INTEGER,"height" INTEGER,"checksum" TEXT NOT NULL,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "MediaVariant_pkey" PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "CanonVersion_version_key" ON "CanonVersion"("version");
CREATE INDEX "CanonSnapshot_canonVersionId_createdAt_idx" ON "CanonSnapshot"("canonVersionId","createdAt");
CREATE INDEX "ChangeSet_entityType_entityId_createdAt_idx" ON "ChangeSet"("entityType","entityId","createdAt");
CREATE INDEX "ChangeSet_requestId_idx" ON "ChangeSet"("requestId");
CREATE INDEX "RestoreOperation_entityType_entityId_createdAt_idx" ON "RestoreOperation"("entityType","entityId","createdAt");
CREATE UNIQUE INDEX "MediaVariant_storageKey_key" ON "MediaVariant"("storageKey");
CREATE UNIQUE INDEX "MediaVariant_mediaId_kind_key" ON "MediaVariant"("mediaId","kind");
CREATE UNIQUE INDEX "MediaAsset_checksum_key" ON "MediaAsset"("checksum");
CREATE UNIQUE INDEX "MediaAsset_storageKey_key" ON "MediaAsset"("storageKey");
CREATE INDEX "SemanticRelation_source_relationType_status_idx" ON "SemanticRelation"("source","relationType","status");
CREATE INDEX "SemanticRelation_target_relationType_status_idx" ON "SemanticRelation"("target","relationType","status");
CREATE UNIQUE INDEX "SemanticRelation_source_target_relationType_key" ON "SemanticRelation"("source","target","relationType");

ALTER TABLE "SemanticRelation" ADD CONSTRAINT "SemanticRelation_source_fkey" FOREIGN KEY ("source") REFERENCES "WorldEntity"("canonicalId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SemanticRelation" ADD CONSTRAINT "SemanticRelation_target_fkey" FOREIGN KEY ("target") REFERENCES "WorldEntity"("canonicalId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SemanticRelation" ADD CONSTRAINT "SemanticRelation_timelineEvent_fkey" FOREIGN KEY ("timelineEvent") REFERENCES "WorldEntity"("canonicalId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CanonSnapshot" ADD CONSTRAINT "CanonSnapshot_canonVersionId_fkey" FOREIGN KEY ("canonVersionId") REFERENCES "CanonVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "MediaVariant" ADD CONSTRAINT "MediaVariant_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
