'use server';

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

// RESET PASSWORD

export async function resetPassword(
  token: string,
  password: string
) {

  try {

    /*  VALIDA TOKEN  */
    const user = await prisma.user.findUnique({

      where: {
        resetPasswordToken: token,
      },
    });

    /* TOKEN INVÁLIDO */
    if (!user) {

      return {
        success: false,
        message:
          "Token inválido ou expirado",
      };
    }


    /* TOKEN EXPIRADO  */

    if (
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt < new Date()
    ) {

      return {
        success: false,
        message:
          "Link expirado",
      };
    }


    /* HASH NOVA SENHA  */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );
    /* UPDATE USER */

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,


        /* INVALIDA TOKEN  */

        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
    });

    return {
      success: true,
    };

  } catch (error) {
    console.error(
      "Erro reset password:",
      error
    );

    return {

      success: false,
      message:
        "Erro ao redefinir senha",
    };
  }
}