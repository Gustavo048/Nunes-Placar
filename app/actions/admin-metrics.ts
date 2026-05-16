'use server';

import { prisma }
from "@/lib/prisma";

/* TYPES */

export interface Insight {

  type:
    | "success"
    | "warning"
    | "danger"
    | "info";

  title: string;

  description: string;
}

export interface AdminLogItem {

  id: string;

  action: string;

  targetId: string | null;

  createdAt: Date;
}

/* SYSTEM INSIGHTS */

export async function getSystemInsights():
Promise<Insight[]> {

  /* PENDING USERS */

  const pendingUsers =
    await prisma.user.count({

      where: {
        status: "PENDING",
      },
    });

  /* RECENT LOGINS */

  const recentLogins =
    await prisma.user.count({

      where: {

        lastLoginAt: {

          gte: new Date(
            Date.now() -
            1000 * 60 * 60 * 24
          ),
        },
      },
    });

  /* MOST USED GAME MODE */

  const rankings =
    await prisma.ranking.groupBy({

      by: ["gameMode"],

      _count: true,

      orderBy: {
        _count: {
          gameMode: "desc",
        },
      },
    });

  const mostPlayedMode =
    rankings[0]?.gameMode ||
    "N/A";

  /* BLOCKED ONLINE */

  const blockedOnline =
    await prisma.user.count({

      where: {
        blocked: true,
        isOnline: true,
      },
    });

  return [

    {
      type: "warning",

      title:
        `${pendingUsers} usuários aguardando aprovação`,

      description:
        "Existem solicitações pendentes no sistema.",
    },

    {
      type: "success",

      title:
        `${recentLogins} logins nas últimas 24h`,

      description:
        "Atividade recente detectada no sistema.",
    },

    {
      type: "info",

      title:
        `${mostPlayedMode} lidera o ranking`,

      description:
        "Modo de jogo mais utilizado atualmente.",
    },

    {
      type:
        blockedOnline > 0
          ? "danger"
          : "success",

      title:
        blockedOnline > 0
          ? `${blockedOnline} usuários bloqueados online`
          : "Nenhum usuário bloqueado online",

      description:
        "Monitoramento de segurança em tempo real.",
    },
  ];
}

/* =========================================
   ADMIN METRICS
========================================= */

export async function getAdminMetrics() {

  try {

    /* USERS */

    const totalUsers =
      await prisma.user.count();

    const approvedUsers =
      await prisma.user.count({

        where: {
          status: "APPROVED"
        }
      });

    const pendingUsers =
      await prisma.user.count({

        where: {
          status: "PENDING"
        }
      });

    const blockedUsers =
      await prisma.user.count({

        where: {
          blocked: true
        }
      });

    const adminUsers =
      await prisma.user.count({

        where: {
          role: "ADMIN"
        }
      });

    /* ONLINE */

    const onlineUsers =
      await prisma.user.count({

        where: {
          isOnline: true
        }
      });

    /* RECENT LOGINS */

    const recentLogins =
      await prisma.user.count({

        where: {

          lastLoginAt: {

            gte: new Date(
              Date.now() -
              1000 * 60 * 60 * 24
            )
          }
        }
      });

    /* RANKINGS */

    const totalRankings =
      await prisma.ranking.count();

    const totalMatches =
      await prisma.ranking.aggregate({

        _sum: {
          victories: true
        }
      });

    return {

      success: true,

      metrics: {

        users: {

          total: totalUsers,

          approved: approvedUsers,

          pending: pendingUsers,

          blocked: blockedUsers,

          admins: adminUsers,
        },

        activity: {

          online: onlineUsers,

          recentLogins,
        },

        ranking: {

          teams: totalRankings,

          matches:
            totalMatches._sum
              .victories || 0,
        }
      }
    };

  } catch (error) {

    console.error(
      "ADMIN METRICS ERROR:",
      error
    );

    return {

      success: false,

      metrics: null,
    };
  }
}

/* =========================================
   RECENT ADMIN LOGS
========================================= */

export async function getRecentAdminLogs():
Promise<AdminLogItem[]> {

  const logs =
    await prisma.adminLog.findMany({

      orderBy: {
        createdAt: "desc",
      },

      take: 12,
    });

  return logs;
}





