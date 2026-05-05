-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('CANASTRA', 'TRUCO', 'DOMINO');

-- CreateTable
CREATE TABLE "Ranking" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "gameMode" "GameMode" NOT NULL,
    "victories" INTEGER NOT NULL DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_teamName_gameMode_key" ON "Ranking"("teamName", "gameMode");
