'use server';

import { prisma } from "@/lib/prisma";
import { auth } from "@/app/auth";
import { revalidatePath } from "next/cache";


// =============================
// LISTAR PENDENTES
// =============================

export async function getPendingUsers() {

  const session = await auth();

  if (!session?.user) {
    throw new Error("Não autenticado");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Sem permissão");
  }

  return await prisma.user.findMany({

    where: {
      status: "PENDING",
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}


// =============================
// APROVAR USUÁRIO
// =============================

export async function approveUser(userId: string) {

  const session = await auth();

  if (!session?.user) {
    throw new Error("Não autenticado");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Sem permissão");
  }

  await prisma.user.update({

    where: {
      id: userId,
    },

    data: {
      status: "APPROVED",
    },
  });

 revalidatePath("/admin");

return {
  success: true,
};
}


// =============================
// REJEITAR USUÁRIO
// =============================

export async function rejectUser(userId: string) {

  const session = await auth();

  if (!session?.user) {
    throw new Error("Não autenticado");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Sem permissão");
  }

  await prisma.user.update({

    where: {
      id: userId,
    },

    data: {
      status: "REJECTED",
    },
  });

  revalidatePath("/admin");

return {
  success: true,
};
}