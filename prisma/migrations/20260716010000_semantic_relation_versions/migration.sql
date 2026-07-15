ALTER TABLE "SemanticRelation" ADD COLUMN "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'draft';

CREATE TABLE "SemanticRelationVersion" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "relationId" UUID NOT NULL,
  "version" INTEGER NOT NULL,
  "data" JSONB NOT NULL,
  "status" "PublicationStatus" NOT NULL,
  "actor" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SemanticRelationVersion_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SemanticRelationVersion_relationId_version_key" ON "SemanticRelationVersion"("relationId", "version");
CREATE INDEX "SemanticRelationVersion_relationId_createdAt_idx" ON "SemanticRelationVersion"("relationId", "createdAt");
ALTER TABLE "SemanticRelationVersion" ADD CONSTRAINT "SemanticRelationVersion_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "SemanticRelation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
