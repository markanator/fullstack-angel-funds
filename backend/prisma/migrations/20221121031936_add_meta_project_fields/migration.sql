-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "country" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "showContributorNames" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showContributors" BOOLEAN NOT NULL DEFAULT false;
