'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* TYPES */

export interface RankingOverview {

  totalMatches: number;
  totalTeams: number;
  totalPoints: number;
  mostPlayedMode: string;
}

export interface RankingTeam {

  id: string;
  teamName: string;
  gameMode: string;
  victories: number;
  totalPoints: number;
  createdAt: Date;

  user: {

    name: string;
    email: string;
  };
}

export interface MatchItem {

  id: string;

  gameMode: string;

  teamA: string;

  teamB: string;

  scoreA: number;

  scoreB: number;

  winner: string;

  createdAt: Date;
}

export interface ModeDistributionItem {

  gameMode: string;

  total: number;
}

export interface MatchesPerDayItem {

  date: string;

  total: number;
}

export interface TopScoreItem {

  teamName: string;

  totalPoints: number;
}

/* =========================================
   OVERVIEW
========================================= */

export async function getRankingOverview():
Promise<RankingOverview> {

  /* TOTAL MATCHES */

  const totalMatches =
    await prisma.match.count();

  /* TOTAL TEAMS */

  const totalTeams =
    await prisma.ranking.count();

  /* TOTAL POINTS */

  const pointsResult =
    await prisma.ranking.aggregate({

      _sum: {
        totalPoints: true,
      },
    });

  /* MOST PLAYED MODE */

  const gameModes =
    await prisma.match.groupBy({

      by: ["gameMode"],

      _count: true,

      orderBy: {
        _count: {
          gameMode: "desc",
        },
      },
    });

  return {

    totalMatches,

    totalTeams,

    totalPoints:
      pointsResult._sum
        .totalPoints || 0,

    mostPlayedMode:
      gameModes[0]?.gameMode ||
      "N/A",
  };
}

/* =========================================
   RANKING TEAMS
========================================= */

export async function getRankingTeams():
Promise<RankingTeam[]> {

  return await prisma.ranking.findMany({

    orderBy: [
      {
        victories: "desc",
      },
      {
        totalPoints: "desc",
      },
    ],

    select: {

      id: true,

      teamName: true,

      gameMode: true,

      victories: true,

      totalPoints: true,

      createdAt: true,

      user: {

        select: {

          name: true,

          email: true,
        },
      },
    },
  });
}

/* =========================================
   RECENT MATCHES
========================================= */

export async function getRecentMatches():
Promise<MatchItem[]> {

  return await prisma.match.findMany({

    take: 12,

    orderBy: {
      createdAt: "desc",
    },

    select: {

      id: true,

      gameMode: true,

      teamA: true,

      teamB: true,

      scoreA: true,

      scoreB: true,

      winner: true,

      createdAt: true,
    },
  });
}

/* =========================================
   CHART DATA
========================================= */

export async function getRankingChartData() {

  /* MODE DISTRIBUTION */

  const modeDistributionRaw =
    await prisma.match.groupBy({

      by: ["gameMode"],

      _count: {
        gameMode: true,
      },
    });

  const modeDistribution =
    modeDistributionRaw.map((item) => ({

      gameMode:
        item.gameMode,

      total:
        item._count.gameMode,
    }));

  /* MATCHES PER DAY */

  const matches =
    await prisma.match.findMany({

      select: {
        createdAt: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

  const matchesPerDayMap =
    new Map<string, number>();

  matches.forEach((match) => {

    const date =
      new Date(
        match.createdAt
      ).toLocaleDateString(
        "pt-BR"
      );

    matchesPerDayMap.set(

      date,

      (
        matchesPerDayMap.get(
          date
        ) || 0
      ) + 1
    );
  });

  const matchesPerDay =
    Array.from(
      matchesPerDayMap.entries()
    ).map(([date, total]) => ({

      date,

      total,
    }));

  /* TOP SCORES */

  const topScoresRaw =
    await prisma.ranking.findMany({

      take: 5,

      orderBy: {
        totalPoints: "desc",
      },

      select: {

        teamName: true,

        totalPoints: true,
      },
    });

  const topScores =
    topScoresRaw.map((team) => ({

      teamName:
        team.teamName,

      totalPoints:
        team.totalPoints,
    }));

  return {

    modeDistribution,

    matchesPerDay,

    topScores,
  };
}

/* =========================================
   UPDATE TEAM SCORE
========================================= */

export async function updateRankingTeam(

  rankingId: string,

  data: {

    victories: number;

    totalPoints: number;
  }
) {

  await prisma.ranking.update({

    where: {
      id: rankingId,
    },

    data: {

      victories:
        data.victories,

      totalPoints:
        data.totalPoints,
    },
  });

  /* ADMIN LOG */

  await prisma.adminLog.create({

    data: {

      adminId:
        "SYSTEM_ADMIN",

      action:
        "UPDATE_RANKING_TEAM",

      targetId:
        rankingId,

      description:
        `Ranking atualizado:
        ${data.victories} vitórias /
        ${data.totalPoints} pontos`,
    },
  });

  revalidatePath(
    "/admin/ranking"
  );

  return {
    success: true,
  };
}

/* =========================================
   RESET TEAM
========================================= */

export async function resetRankingTeam(
  rankingId: string
) {

  await prisma.ranking.update({

    where: {
      id: rankingId,
    },

    data: {

      victories: 0,

      totalPoints: 0,
    },
  });

  /* ADMIN LOG */

  await prisma.adminLog.create({

    data: {

      adminId:
        "SYSTEM_ADMIN",

      action:
        "RESET_RANKING_TEAM",

      targetId:
        rankingId,

      description:
        "Equipe resetada pelo administrador",
    },
  });

  revalidatePath(
    "/admin/ranking"
  );

  return {
    success: true,
  };
}

/* =========================================
   DELETE TEAM
========================================= */

export async function deleteRankingTeam(
  rankingId: string
) {

  /* ADMIN LOG */

  await prisma.adminLog.create({

    data: {

      adminId:
        "SYSTEM_ADMIN",

      action:
        "DELETE_RANKING_TEAM",

      targetId:
        rankingId,

      description:
        "Equipe removida do ranking",
    },
  });

  await prisma.ranking.delete({

    where: {
      id: rankingId,
    },
  });

  revalidatePath(
    "/admin/ranking"
  );

  return {
    success: true,
  };
}