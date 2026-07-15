ALTER TABLE "WorldEntity" ADD COLUMN "canonicalId" UUID;
UPDATE "WorldEntity" SET "canonicalId" = gen_random_uuid() WHERE "canonicalId" IS NULL;
ALTER TABLE "WorldEntity" ALTER COLUMN "canonicalId" SET NOT NULL;
ALTER TABLE "WorldEntity" ALTER COLUMN "canonicalId" SET DEFAULT gen_random_uuid();
CREATE UNIQUE INDEX "WorldEntity_canonicalId_key" ON "WorldEntity"("canonicalId");
