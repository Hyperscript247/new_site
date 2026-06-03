-- Add slug to Course: nullable first, backfill from title, then enforce NOT NULL + unique.

-- 1. Add nullable column
ALTER TABLE "Course" ADD COLUMN "slug" TEXT;

-- 2. Backfill base slug from title (lowercase, non-alphanumeric -> hyphen, trim hyphens)
UPDATE "Course"
SET "slug" = trim(both '-' from regexp_replace(lower("title"), '[^a-z0-9]+', '-', 'g'));

-- 3. Break duplicate slugs by appending a short id chunk to all but the first occurrence
WITH ranked AS (
  SELECT "id",
         "slug",
         row_number() OVER (PARTITION BY "slug" ORDER BY "createdAt", "id") AS rn
  FROM "Course"
)
UPDATE "Course" c
SET "slug" = c."slug" || '-' || left(c."id", 6)
FROM ranked
WHERE c."id" = ranked."id" AND ranked.rn > 1;

-- 4. Enforce NOT NULL + unique
ALTER TABLE "Course" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
