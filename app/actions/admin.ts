"use server";

import { prisma } from "@/lib/prisma";

import { auth }
from "@/auth";

import {
  revalidatePath
} from "next/cache";

/* =========================================
   ADMIN LOG
========================================= */

async function createAdminLog(
  adminId: string,
  action: string,
  targetId?: string
) {

  await prisma.adminLog.create({

    data: {
      adminId,
      action,
      targetId,
    },
  });
}

/* =========================================
   VALIDATE ADMIN
========================================= */

async function validateAdmin() {

  const session =
    await auth();

  if (!session?.user) {

    throw new Error(
      "Não autenticado"
    );
  }

  if (
    session.user.role !== "ADMIN"
  ) {

    throw new Error(
      "Sem permissão"
    );
  }

  return session;
}

/* =========================================
   LIST PENDING USERS
========================================= */

export async function getPendingUsers() {

  await validateAdmin();

  return await prisma.user.findMany({

    where: {
      status: "PENDING",
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

/* =========================================
   LIST ALL USERS
========================================= */

export async function getAllUsers() {

  await validateAdmin();

  return await prisma.user.findMany({

    orderBy: {
      createdAt: "desc",
    },

    select: {

      id: true,

      name: true,
      email: true,

      city: true,
      state: true,

      role: true,
      status: true,

      blocked: true,

      isOnline: true,

      createdAt: true,
      lastLoginAt: true,
      lastSeenAt: true,
    },
  });
}

/* =========================================
   APPROVE USER
========================================= */

export async function approveUser(
  userId: string
) {

  const session =
    await validateAdmin();

  await prisma.user.update({

    where: {
      id: userId,
    },

    data: {

      status: "APPROVED",

      approvedAt:
        new Date(),

      approvedBy:
        session.user.email || "ADMIN",
    },
  });

  /* LOG */

  await createAdminLog(
    session.user.id!,
    "APPROVE_USER",
    userId
  );

  revalidatePath("/admin");
  revalidatePath("/admin/users");

  return {
    success: true,
  };
}

/* REJECT USER */

export async function rejectUser(
  userId: string
) {

  const session =
    await validateAdmin();

  await prisma.user.update({

    where: {
      id: userId,
    },

    data: {
      status: "REJECTED",
    },
  });

  /* LOG */

  await createAdminLog(
    session.user.id!,
    "REJECT_USER",
    userId
  );

  revalidatePath("/admin");
  revalidatePath("/admin/users");

  return {
    success: true,
  };
}

/* BLOCK USER */

export async function blockUser(
  userId: string
) {

  const session =
    await validateAdmin();

  await prisma.user.update({

    where: {
      id: userId,
    },

    data: {

      blocked: true,

      blockedAt:
        new Date(),

      blockedBy:
        session.user.email || "ADMIN",
    },
  });

  /* LOG */

  await createAdminLog(
    session.user.id!,
    "BLOCK_USER",
    userId
  );

  revalidatePath("/admin");
  revalidatePath("/admin/users");

  return {
    success: true,
  };
}

/* =========================================
   UNBLOCK USER
========================================= */

export async function unblockUser(
  userId: string
) {

  const session =
    await validateAdmin();

  await prisma.user.update({

    where: {
      id: userId,
    },

    data: {

      blocked: false,

      blockedAt: null,
      blockedBy: null,
    },
  });

  /* LOG */

  await createAdminLog(
    session.user.id!,
    "UNBLOCK_USER",
    userId
  );

  revalidatePath("/admin");
  revalidatePath("/admin/users");

  return {
    success: true,
  };
}

/* =========================================
   PROMOTE ADMIN
========================================= */

export async function promoteToAdmin(
  userId: string
) {

  const session =
    await validateAdmin();

  await prisma.user.update({

    where: {
      id: userId,
    },

    data: {
      role: "ADMIN",
    },
  });

  /* LOG */

  await createAdminLog(
    session.user.id!,
    "PROMOTE_ADMIN",
    userId
  );

  revalidatePath("/admin");
  revalidatePath("/admin/users");

  return {
    success: true,
  };
}




