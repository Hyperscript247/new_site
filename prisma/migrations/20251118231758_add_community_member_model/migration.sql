-- CreateTable
CREATE TABLE "CommunityMember" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "gender" TEXT,
    "profession" TEXT NOT NULL,
    "linkedinProfile" TEXT,
    "areasOfInterest" TEXT[],
    "supportSeeking" TEXT[],
    "preferredEvents" TEXT NOT NULL,
    "willingToVolunteer" BOOLEAN NOT NULL DEFAULT false,
    "areasToSupport" TEXT[],
    "howDidYouHear" TEXT,
    "agreeToTerms" BOOLEAN NOT NULL DEFAULT false,
    "agreeToCommunications" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);
