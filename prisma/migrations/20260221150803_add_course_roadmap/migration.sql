-- CreateTable
CREATE TABLE "CourseRoadmap" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseRoadmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'lesson',
    "durationWeeks" INTEGER NOT NULL DEFAULT 1,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "prerequisiteIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilestoneCompletion" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MilestoneCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseRoadmap_courseId_key" ON "CourseRoadmap"("courseId");

-- CreateIndex
CREATE INDEX "Milestone_roadmapId_sortOrder_idx" ON "Milestone"("roadmapId", "sortOrder");

-- CreateIndex
CREATE INDEX "MilestoneCompletion_registrationId_idx" ON "MilestoneCompletion"("registrationId");

-- CreateIndex
CREATE INDEX "MilestoneCompletion_milestoneId_idx" ON "MilestoneCompletion"("milestoneId");

-- CreateIndex
CREATE UNIQUE INDEX "MilestoneCompletion_registrationId_milestoneId_key" ON "MilestoneCompletion"("registrationId", "milestoneId");

-- AddForeignKey
ALTER TABLE "CourseRoadmap" ADD CONSTRAINT "CourseRoadmap_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "CourseRoadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilestoneCompletion" ADD CONSTRAINT "MilestoneCompletion_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilestoneCompletion" ADD CONSTRAINT "MilestoneCompletion_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
