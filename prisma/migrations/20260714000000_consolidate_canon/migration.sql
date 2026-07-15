CREATE TYPE "CanonStatus" AS ENUM ('draft', 'review', 'canonical', 'retconned', 'archived');
CREATE TYPE "CanonEntityKind" AS ENUM ('realm', 'location', 'faction', 'character', 'creature', 'artifact', 'event', 'collection');

ALTER TABLE "WorldEntity"
  ADD COLUMN "kind" "CanonEntityKind",
  ADD COLUMN "canonicalSlug" TEXT,
  ADD COLUMN "canonStatus" "CanonStatus" NOT NULL DEFAULT 'review';

UPDATE "WorldEntity"
SET "canonicalSlug" = "slug"
WHERE "canonicalSlug" IS NULL;

CREATE INDEX "WorldEntity_kind_canonStatus_idx" ON "WorldEntity"("kind", "canonStatus");

CREATE TABLE "CanonAlias" (
  "id" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "alias" TEXT NOT NULL,
  "locale" TEXT,
  "reason" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CanonAlias_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "CanonAlias_alias_locale_key" ON "CanonAlias"("alias", "locale");
CREATE INDEX "CanonAlias_entityId_idx" ON "CanonAlias"("entityId");
ALTER TABLE "CanonAlias" ADD CONSTRAINT "CanonAlias_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "WorldEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "EntityRole" (
  "id" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "realmSlug" TEXT,
  "context" JSONB,
  "status" "CanonStatus" NOT NULL DEFAULT 'review',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "EntityRole_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "EntityRole_entityId_role_realmSlug_key" ON "EntityRole"("entityId", "role", "realmSlug");
CREATE INDEX "EntityRole_role_status_idx" ON "EntityRole"("role", "status");
ALTER TABLE "EntityRole" ADD CONSTRAINT "EntityRole_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "WorldEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
