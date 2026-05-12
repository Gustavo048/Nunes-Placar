'use server';

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/email";
import { v4 as uuid } from "uuid";

// FORGOT PASSWORD

export async function forgotPassword(
  email: string
) {

  try {

    /* NORMALIZA EMAIL   */

    const normalizedEmail = email
      .trim()
      .toLowerCase();


    /* BUSCA USUÁRIO   */

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });


    /* SEGURANÇA - NÃO REVELA SE USUÁRIO EXISTE  */

    if (!user) {
      return {
        success: true,
      };
    }

    /* TOKEN RESET  */

    const resetToken = uuid();


    /*  EXPIRAÇÃO - 1 HORA */

    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60
    );


    /* SALVA TOKEN  */

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: expiresAt,
      },
    });

    /* URL RESET */
    const resetUrl =
      `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    /* EMAIL */

    await resend.emails.send({
      from: 'Nunes Placar <onboarding@resend.dev>',
      to: user.email,
      subject: 'Redefinição de senha',

      html: `
        <div
          style="
            font-family:sans-serif;
            padding:20px;
          "
        >

          <h2>
            Recuperação de senha
          </h2>

          <p>
            Recebemos uma solicitação para redefinir sua senha.
          </p>

          <p>
            Clique no botão abaixo para continuar:
          </p>

          <div style="margin-top:30px;">

            <a
              href="${resetUrl}"

              style="
                background:#eab308;
                color:black;
                padding:12px 20px;
                border-radius:8px;
                text-decoration:none;
                font-weight:bold;
                display:inline-block;
              "
            >
              Redefinir senha
            </a>

          </div>

          <p
            style="
              margin-top:30px;
              color:#666;
              font-size:14px;
            "
          >
            Este link expira em 1 hora.
          </p>

        </div>
      `,
    });


    return {
      success: true,
    };

  } catch (error) {

    console.error(
      "Erro forgot password:",
      error
    );

    return {
      success: false,
      message:
        "Erro ao solicitar redefinição de senha",
    };
  }
}