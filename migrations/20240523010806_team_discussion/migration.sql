/*
  Warnings:

  - Added the required column `description` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discussionId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "discussionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
