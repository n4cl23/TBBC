CREATE TYPE "SemanticImportance" AS ENUM ('contextual', 'supporting', 'major', 'critical');

CREATE TABLE "SemanticRelation" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "source" UUID NOT NULL,
  "target" UUID NOT NULL,
  "relationType" TEXT NOT NULL,
  "weight" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  "description" TEXT NOT NULL,
  "status" "CanonStatus" NOT NULL DEFAULT 'review',
  "timelineEvent" UUID,
  "startEra" TEXT,
  "endEra" TEXT,
  "importance" "SemanticImportance" NOT NULL DEFAULT 'supporting',
  "canonical" BOOLEAN NOT NULL DEFAULT false,
  "aliases" TEXT[] NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SemanticRelation_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "SemanticRelation_no_loop" CHECK ("source" <> "target"),
  CONSTRAINT "SemanticRelation_weight_range" CHECK ("weight" >= 0 AND "weight" <= 1)
);

CREATE UNIQUE INDEX "SemanticRelation_source_target_relationType_key" ON "SemanticRelation"("source", "target", "relationType");
CREATE INDEX "SemanticRelation_source_relationType_status_idx" ON "SemanticRelation"("source", "relationType", "status");
CREATE INDEX "SemanticRelation_target_relationType_status_idx" ON "SemanticRelation"("target", "relationType", "status");
CREATE INDEX "SemanticRelation_timelineEvent_idx" ON "SemanticRelation"("timelineEvent");
CREATE INDEX "SemanticRelation_importance_canonical_idx" ON "SemanticRelation"("importance", "canonical");
