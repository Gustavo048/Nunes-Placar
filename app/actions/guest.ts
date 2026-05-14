'use server';

import { prisma } from "@/lib/prisma";

/* GET GUEST USAGE */

export async function getGuestUsage(
  guestId: string
) {

  try {

    const guest =
      await prisma.guestUsage.findUnique({

        where: {
          guestId,
        },
      });

    return {
      success: true,

      gamesPlayed:
        guest?.gamesPlayed || 0,
    };

  } catch (error) {

    console.error(
      "Erro ao buscar uso visitante:",
      error
    );

    return {
      success: false,
      gamesPlayed: 0,
    };
  }
}

/* INCREMENT GUEST USAGE */

export async function incrementGuestUsage(
  guestId: string
) {

  try {

    const existingGuest =
      await prisma.guestUsage.findUnique({

        where: {
          guestId,
        },
      });

    /* JÁ EXISTE */

    if (existingGuest) {

      const updatedGuest =
        await prisma.guestUsage.update({

          where: {
            guestId,
          },

          data: {
            gamesPlayed: {
              increment: 1,
            },
          },
        });

      return {
        success: true,

        gamesPlayed:
          updatedGuest.gamesPlayed,
      };
    }

    /* PRIMEIRA PARTIDA */

    const newGuest =
      await prisma.guestUsage.create({

        data: {
          guestId,
          gamesPlayed: 1,
        },
      });

    return {
      success: true,

      gamesPlayed:
        newGuest.gamesPlayed,
    };

  } catch (error) {

    console.error(
      "Erro ao incrementar visitante:",
      error
    );

    return {
      success: false,
      gamesPlayed: 0,
    };
  }
}

