'use server';

import { prisma }
from "@/lib/prisma";

/* =========================================
   TYPES
========================================= */

export interface AdminLogItem {

  id: string;

  action: string;

  description: string | null;

  targetId: string | null;

  createdAt: Date;
}

/* =========================================
   GET ADMIN LOGS
========================================= */

export async function getAdminLogs():
Promise<AdminLogItem[]> {

  return await prisma.adminLog.findMany({

    orderBy: {
      createdAt: "desc",
    },

    take: 50,

    select: {

      id: true,

      action: true,

      description: true,

      targetId: true,

      createdAt: true,
    },
  });
}