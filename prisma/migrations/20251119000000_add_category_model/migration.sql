-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- Insert unique categories from existing courses
INSERT INTO "Category" ("id", "name", "slug", "createdAt", "updatedAt")
SELECT
    'cat-' || LOWER(REPLACE("category", ' ', '-')) || '-' || substr(md5(random()::text), 1, 8),
    "category",
    LOWER(REPLACE("category", ' ', '-')),
    NOW(),
    NOW()
FROM (
    SELECT DISTINCT "category" FROM "Course" WHERE "category" IS NOT NULL
) AS unique_categories
ON CONFLICT DO NOTHING;

-- Add categoryId column to Course table (nullable first)
ALTER TABLE "Course" ADD COLUMN "categoryId" TEXT;

-- Update courses with the corresponding categoryId
UPDATE "Course" c
SET "categoryId" = cat.id
FROM "Category" cat
WHERE c."category" = cat.name;

-- Make categoryId NOT NULL after data migration
ALTER TABLE "Course" ALTER COLUMN "categoryId" SET NOT NULL;

-- Drop the old category column
ALTER TABLE "Course" DROP COLUMN "category";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
