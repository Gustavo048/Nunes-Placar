-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "gameMode" "GameMode" NOT NULL,
    "teamA" TEXT NOT NULL,
    "teamB" TEXT NOT NULL,
    "scoreA" INTEGER NOT NULL,
    "scoreB" INTEGER NOT NULL,
    "winner" TEXT NOT NULL,
    "playedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_playedById_fkey" FOREIGN KEY ("playedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
