'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Busca os top 10 do ranking
export async function getRanking() {
  return await prisma.ranking.findMany({
    orderBy: [
      { victories: 'desc' },
      { totalPoints: 'desc' }
    ],
    take: 10
  });
}

// Registra o fim de uma partida
export async function recordVictory(teamName: string, points: number) {
  try {
    await prisma.ranking.upsert({
      where: { teamName: teamName.toUpperCase() },
      update: {
        victories: { increment: 1 },
        totalPoints: { increment: points },
      },
      create: {
        teamName: teamName.toUpperCase(),
        victories: 1,
        totalPoints: points,
      },
    });
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar ranking:", error);
    return { success: false };
  }
}