'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GameMode } from "@prisma/client";

import { auth } from "@/app/auth";


// =============================
// BUSCAR RANKING
// =============================

export async function getRanking(
  gameMode: GameMode = "CANASTRA"
) {

  try {

    const ranking = await prisma.ranking.findMany({
      where: {
        gameMode,
      },

      include: {
        user: true,
      },

      orderBy: [
        {
          victories: "desc",
        },
        {
          totalPoints: "desc",
        },
      ],

      take: 10,
    });

    return ranking;

  } catch (error) {

    console.error("Erro ao buscar ranking:", error);

    return [];
  }
}


// =============================
// REGISTRAR VITÓRIA
// =============================

export async function recordVictory(
  points: number,
  gameMode: GameMode
) {

  try {

    // =============================
    // VALIDA SESSÃO
    // =============================

    const session = await auth();

    if (!session?.user) {

      return {
        success: false,
        message: "Usuário não autenticado",
      };
    }


    // =============================
    // VALIDA APROVAÇÃO
    // =============================

    if (session.user.status !== "APPROVED") {

      return {
        success: false,
        message: "Conta aguardando aprovação do administrador",
      };
    }


    // =============================
    // BUSCA USUÁRIO
    // =============================

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    });

    if (!user) {

      return {
        success: false,
        message: "Usuário não encontrado",
      };
    }


    // =============================
    // UPSERT RANKING
    // =============================

    await prisma.ranking.upsert({

      where: {
        userId_gameMode: {
          userId: user.id,
          gameMode,
        },
      },

      update: {
        victories: {
          increment: 1,
        },

        totalPoints: {
          increment: points,
        },
      },

      create: {
        userId: user.id,
        gameMode,
        victories: 1,
        totalPoints: points,
      },
    });


    // =============================
    // REVALIDATE
    // =============================

    revalidatePath("/");


    return {
      success: true,
    };

  } catch (error) {

    console.error("Erro ao salvar ranking:", error);

    return {
      success: false,
      message: "Erro interno ao salvar ranking",
    };
  }
}