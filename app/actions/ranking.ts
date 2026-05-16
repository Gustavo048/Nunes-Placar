"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GameMode } from "@prisma/client";
import { auth } from "@/auth";

// BUSCAR RANKING
export async function getRanking(gameMode: GameMode = "CANASTRA") {
  try {
    const ranking = await prisma.ranking.findMany({
      where: {
        gameMode,
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
    console.error("Erro ao salvar ranking:", JSON.stringify(error, null, 2));

    return [];
  }
}

// REGISTRAR VITÓRIA

export async function recordVictory(
  teamName: string,
  points: number,
  gameMode: GameMode,
) {
  try {
    // VALIDA SESSÃO
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        message: "Usuário não autenticado",
      };
    }

    // VALIDA APROVAÇÃO

    if (session.user.status !== "APPROVED") {
      return {
        success: false,
        message: "Conta aguardando aprovação do administrador",
      };
    }

    const normalizedTeamName = teamName.trim().toUpperCase();

    if (!normalizedTeamName) {
      return {
        success: false,
        message: "Nome da equipe inválido",
      };
    }

    // BUSCA USUÁRIO

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

    await prisma.ranking.upsert({
      where: {
        teamName_gameMode: {
          teamName: normalizedTeamName,

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

        userId: user.id,
      },

      create: {
        teamName: normalizedTeamName,
        userId: user.id,
        gameMode,
        victories: 1,
        totalPoints: points,
      },
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Erro ao salvar ranking:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Erro interno ao salvar ranking",
    };
  }
}
