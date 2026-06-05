/*
  Warnings:

  - You are about to drop the column `timeCreated` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "timeCreated",
ADD COLUMN     "timeStarted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
