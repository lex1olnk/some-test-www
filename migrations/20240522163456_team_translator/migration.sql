-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_translatorId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "translatorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamTranslatorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_translatorId_fkey" FOREIGN KEY ("translatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamTranslatorId_fkey" FOREIGN KEY ("teamTranslatorId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
