/*
  Warnings:

  - A unique constraint covering the columns `[teamName,gameMode]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamName` to the `Ranking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ranking_userId_gameMode_key";

-- AlterTable
ALTER TABLE "Ranking" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "teamName" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Ranking_gameMode_idx" ON "Ranking"("gameMode");

-- CreateIndex
CREATE INDEX "Ranking_teamName_idx" ON "Ranking"("teamName");

-- CreateIndex
CREATE INDEX "Ranking_victories_idx" ON "Ranking"("victories");

-- CreateIndex
CREATE INDEX "Ranking_totalPoints_idx" ON "Ranking"("totalPoints");

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_teamName_gameMode_key" ON "Ranking"("teamName", "gameMode");
