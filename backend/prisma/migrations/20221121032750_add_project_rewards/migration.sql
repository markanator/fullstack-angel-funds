-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "deliveredByMonth" TIMESTAMP(3) NOT NULL,
    "deliveredByYear" TIMESTAMP(3) NOT NULL,
    "quantityRemaining" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
