'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GameMode } from "@prisma/client";

// Busca ranking
export async function getRanking(gameMode: GameMode = 'CANASTRA') {
  try {
    return await prisma.ranking.findMany({
      where: { gameMode },
      orderBy: [
        { victories: 'desc' },
        { totalPoints: 'desc' }
      ],
      take: 10
    });
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    return [];
  }
}

// Registra vitória
export async function recordVictory(
  teamName: string,
  points: number,
  gameMode: GameMode
) {
  try {
    const name = teamName.toUpperCase();

    await prisma.ranking.upsert({
      where: {
        teamName_gameMode: {
          teamName: name,
          gameMode
        }
      },
      update: {
        victories: { increment: 1 },
        totalPoints: { increment: points }
      },
      create: {
        teamName: name,
        gameMode,
        victories: 1,
        totalPoints: points
      }
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar ranking:", error);
    return { success: false };
  }
}